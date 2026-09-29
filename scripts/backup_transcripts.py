#!/usr/bin/env python3
"""Snapshot Claude Code session transcripts into this branch, with policy redactions.

Copies the main session JSONL, all subagent JSONLs (+ .meta.json), every
Workflow agent transcript and journal under subagents/workflows/<run>/, and the
persisted Workflow scripts under workflows/scripts/*.js from
~/.claude/projects/<project>/ into projects/<project>/ inside this worktree,
applying exactly two redactions mandated by the repo's standing rules:

  1. Copyrighted PDF deck pages (research/decks policy): inline base64 image
     blocks in the user record(s) that immediately follow a "PDF pages
     extracted" tool_result are replaced by text stubs.
  2. HANDOVER.md contents ("stays uncommitted" rule): tool_result blocks
     paired with a Read tool_use whose file_path mentions HANDOVER are
     replaced by a text stub. Disable with KEEP_HANDOVER=1 in the env.

Everything else is byte-for-byte: records that don't need redaction are
written out verbatim (the original line, not re-serialized JSON), so
snapshots diff as clean appends and stay faithful for later analysis.
Redacted records are re-serialized with json.dumps (sort_keys=False,
compact separators) and remain schema-valid JSONL: an image block becomes a
{"type":"text","text":"[transcript-backup redaction: ...]"} block that
states what was removed and why; a redacted tool_result keeps its
tool_use_id and type.

Both redactions are made in one pass over each transcript: a tool_use comes
before its tool_result, so the HANDOVER ids are collected as the pass goes. If
a file ever breaks that order (a HANDOVER tool_result before its tool_use),
the file is redone the way the script did it until 2026-09-29: every id
collected first, then the redaction pass, over the same bytes. The output is
the same either way.

The pass works on bytes: a line is decoded only to be parsed, and a line left
as it is goes out as the bytes read. A file with a line that is not valid
UTF-8 (Claude Code writes none) is instead read the way the script always read
every file, decoded with bad bytes replaced, so its output is unchanged too.

The tool-results/ sidecar directory is intentionally NOT copied: the main
JSONL already stubs oversized outputs with a path + 2KB preview
("<persisted-output>"), and the sidecar otherwise holds only cached page
images of the redacted decks.

A transcript larger than PART_LIMIT (64 MiB) is written as
<session-id>.jsonl.parts/000.jsonl, 001.jsonl, ... cut at line boundaries;
GitHub rejects any single blob over 100 MiB, which silently stopped every
push from 2026-09-14 to 2026-09-17. Reassemble with
`cat <session-id>.jsonl.parts/*.jsonl`.

A possibly-incomplete final line (the session appends live) is dropped if it
fails to parse AND has no trailing newline; the next snapshot picks it up.

Incremental (2026-09-29): <dest>/.backup.state, never committed (the branch's
.gitignore ignores /.backup.*, and backup.sh stages only projects/), records
for each source its size and modification time as they were before it was
last read, and the name, size and modification time of every file written for
it. A source whose record matches, and whose snapshot files are on disk
exactly as recorded (no other plain or parts file beside them), is skipped
without being read: processing it again would change nothing. The record is
void when this script, the projects dir, KEEP_HANDOVER or the Python version
changes. A source that grows while it is being read no longer matches its
record, so it is read again next time. A run that dies keeps the record of the
last run that finished; files the dying run rewrote no longer match it, so
they are redone. The state file is rewritten only when a record changed.

Usage: backup_transcripts.py [--projects-dir DIR] [--dest DIR]
Defaults match this container: projects dir /root/.claude/projects,
dest = the worktree containing this script.
"""
import argparse
import hashlib
import json
import os
import sys
from pathlib import Path

REDACT_IMG = ("[transcript-backup redaction: {media} image, {n} base64 chars "
              "- page image of copyrighted PDF deck (research/decks policy: "
              "never committed)]")
REDACT_HANDOVER = ("[transcript-backup redaction: HANDOVER.md contents "
                   "({n} chars) - standing rule: HANDOVER.md stays "
                   "uncommitted. Set KEEP_HANDOVER=1 to retain.]")
PDF_MARKER = "PDF pages extracted"
PDF_MARKER_B = PDF_MARKER.encode()
# GitHub refuses any blob over 100 MiB, so a transcript past this size is
# written as <name>.jsonl.parts/NNN.jsonl (see write_snapshot).
PART_LIMIT = 64 * 1024 * 1024
STATE_NAME = ".backup.state"


class NotUTF8(Exception):
    """A line of the transcript is not valid UTF-8 (see process_file)."""


def iter_lines(data):
    """Yield (start, end, parsed_or_None) for each line data[start:end] of the
    bytes `data` (end is the index of its b"\\n"); drop an unparseable
    unterminated tail. Raise NotUTF8 at a line that is not valid UTF-8, unless
    it is an unterminated tail cut inside a character, which decoding with
    errors="replace" makes unparseable, so that it is dropped either way."""
    view = memoryview(data)
    start, n = 0, len(data)
    while start < n:
        end = data.find(b"\n", start)
        tail = end < 0
        if tail:
            end = n
        try:
            text = str(view[start:end], "utf-8")
        except UnicodeDecodeError as e:
            if tail and e.end == end - start and e.reason == "unexpected end of data":
                return  # live-append artifact; next snapshot gets it whole
            raise NotUTF8 from e
        try:
            rec = json.loads(text)
        except json.JSONDecodeError:
            if tail:
                return  # live-append artifact; next snapshot gets it whole
            rec = None  # unparseable but complete line: keep verbatim
        yield start, end, rec
        start = end + 1


def add_handover_tool_ids(content, ids):
    """Add to `ids` the id of every tool_use in `content` reading a HANDOVER path."""
    for block in content:
        if (isinstance(block, dict) and block.get("type") == "tool_use"
                and "HANDOVER" in json.dumps(
                    block.get("input", {}).get("file_path", ""))):
            ids.add(block.get("id"))


def collect_handover_tool_ids(data):
    ids = set()
    for _start, _end, rec in iter_lines(data):
        if not isinstance(rec, dict):
            continue
        msg = rec.get("message")
        if not isinstance(msg, dict):
            continue
        content = msg.get("content")
        if not isinstance(content, list):
            continue
        add_handover_tool_ids(content, ids)
    return ids


def redact_images(content):
    changed = False
    out = []
    for block in content:
        if isinstance(block, dict) and block.get("type") == "image":
            src = block.get("source", {})
            out.append({"type": "text", "text": REDACT_IMG.format(
                media=src.get("media_type", "unknown"),
                n=len(src.get("data", "")))})
            changed = True
        else:
            out.append(block)
    return out, changed


def redact(data, handover_ids, collect):
    """One pass over the transcript bytes `data`: its snapshot, with both
    redactions made. A line left as it is goes out as the very bytes read (and
    when no line is redacted or dropped, the snapshot is `data` itself), so no
    transcript is ever held as one Python string: one emoji makes a 160 MiB
    transcript a 640 MB str, and allocating that twice per file was most of
    the script's run time until 2026-09-29.

    With `collect`, HANDOVER tool_use ids are added to `handover_ids` as the
    pass meets them (a record's own tool_uses before its tool_results), and the
    second value returned is the set of ids that turned out to be HANDOVER
    reads only after a tool_result of theirs had been passed unredacted; empty
    means the output is what a pass with every id known up front gives."""
    view = memoryview(data)
    pieces = []  # the snapshot, in order: verbatim spans and redacted records
    copied = 0  # data[:copied] is accounted for in `pieces`
    kept_end = None  # end of the last line kept
    pdf_flag = False  # previous record announced extracted PDF pages
    passed = set()  # ids of tool_results left unredacted
    for start, end, rec in iter_lines(data):
        kept_end = end
        if not isinstance(rec, dict):
            continue
        changed = False
        msg = rec.get("message")
        content = msg.get("content") if isinstance(msg, dict) else None
        if isinstance(content, list):
            if collect:
                add_handover_tool_ids(content, handover_ids)
            if pdf_flag and any(isinstance(b, dict) and b.get("type") == "image"
                                for b in content):
                content, changed = redact_images(content)
                msg["content"] = content
            for block in content:
                if (isinstance(block, dict)
                        and block.get("type") == "tool_result"):
                    if block.get("tool_use_id") in handover_ids:
                        c = block.get("content")
                        n = len(c if isinstance(c, str) else json.dumps(c))
                        block["content"] = REDACT_HANDOVER.format(n=n)
                        changed = True
                    elif collect:
                        passed.add(block.get("tool_use_id"))
        pdf_flag = data.find(PDF_MARKER_B, start, end) >= 0
        if changed:
            pieces.append(view[copied:start])
            pieces.append(json.dumps(rec, ensure_ascii=False,
                                     separators=(",", ":")).encode("utf-8"))
            copied = end
    late = passed & handover_ids if collect else set()
    if kept_end is None:
        return b"", late
    if kept_end < len(data):  # data[kept_end] is that line's b"\n"
        if not pieces and kept_end + 1 == len(data):
            return data, late
        pieces.append(view[copied:kept_end + 1])
    else:  # a last line with no b"\n" of its own gets one
        pieces += [view[copied:kept_end], b"\n"]
    return b"".join(pieces), late


def snapshot_bytes(data, keep_handover):
    if keep_handover:
        return redact(data, set(), collect=False)[0]
    new, late = redact(data, set(), collect=True)
    if late:  # a HANDOVER tool_result came before its tool_use
        new, _ = redact(data, collect_handover_tool_ids(data), collect=False)
    return new


def process_file(src, dst, keep_handover):
    data = src.read_bytes()
    try:
        new = snapshot_bytes(data, keep_handover)
    except NotUTF8:
        # The script has always read transcripts as UTF-8 with bad bytes
        # replaced; do exactly that to a file that has any.
        new = snapshot_bytes(data.decode("utf-8", errors="replace")
                             .encode("utf-8"), keep_handover)
    return write_snapshot(dst, new)


def part_spans(data, limit):
    """Cut bytes at newline boundaries into spans (start, end) of at most
    `limit` bytes.

    Cut points depend only on the bytes before them, so as the transcript
    grows by appends every part but the last is byte-identical to the previous
    snapshot's and git stores it once."""
    spans, start = [], 0
    while len(data) - start > limit:
        cut = data.rfind(b"\n", start, start + limit)
        cut = start + limit if cut < start else cut + 1  # one giant line: hard cut
        spans.append((start, cut))
        start = cut
    spans.append((start, len(data)))
    return spans


def holds(path, data, start, end):
    """Whether the file `path` holds exactly data[start:end] (read in 1 MiB
    chunks, so that comparing never allocates a whole file)."""
    try:
        f = open(path, "rb")
    except FileNotFoundError:
        return False
    with f:
        if os.fstat(f.fileno()).st_size != end - start:
            return False
        buf = bytearray(1 << 20)
        chunk = memoryview(buf)
        pos = start
        while pos < end:
            n = f.readinto(buf)
            if not n or not data.startswith(chunk[:n], pos):
                return False
            pos += n
        return not f.read(1)


def write_snapshot(dst, data):
    """Write `data` as `dst`, or as `dst.parts/NNN.jsonl` when it exceeds
    PART_LIMIT. Returns (whether anything on disk changed, the paths that now
    hold `data`). Reassemble with `cat <name>.jsonl.parts/*.jsonl`."""
    parts_dir = dst.with_name(dst.name + ".parts")
    if len(data) <= PART_LIMIT:
        targets = {dst: (0, len(data))}
    else:
        targets = {parts_dir / f"{i:03d}.jsonl": span
                   for i, span in enumerate(part_spans(data, PART_LIMIT))}
    changed = False
    for stale in ([dst] if len(data) > PART_LIMIT else []) + \
            (sorted(parts_dir.glob("*.jsonl")) if parts_dir.is_dir() else []):
        if stale not in targets and stale.exists():
            stale.unlink()
            changed = True
    if parts_dir.is_dir() and not any(parts_dir.iterdir()):
        parts_dir.rmdir()
    view = memoryview(data)
    for path, (start, end) in targets.items():
        if holds(path, data, start, end):
            continue
        path.parent.mkdir(parents=True, exist_ok=True)
        with open(path, "wb") as f:
            f.write(view[start:end])
        changed = True
    return changed, list(targets)


def copy_file(src, d):
    """Copy `src` to `d` verbatim. Returns (whether `d` changed, [d])."""
    d.parent.mkdir(parents=True, exist_ok=True)
    data = src.read_bytes()
    if not d.exists() or d.read_bytes() != data:
        d.write_bytes(data)
        return True, [d]
    return False, [d]


def snapshot_files(dst):
    """The files that now make up the JSONL snapshot at `dst` (the plain file
    and any parts), or None when an empty parts directory stands beside it,
    which write_snapshot would remove."""
    parts_dir = dst.with_name(dst.name + ".parts")
    found = [dst] if dst.exists() else []
    if parts_dir.is_dir():
        parts = sorted(parts_dir.glob("*.jsonl"))
        if not parts and not any(parts_dir.iterdir()):
            return None
        found += parts
    return found


def stat_sig(path):
    st = os.stat(path)
    return [st.st_size, st.st_mtime_ns]


def load_state(path, header):
    """The per-source records of the last finished run, or None when there is
    no state made under `header`."""
    try:
        state = json.loads(path.read_text())
        if state.get("header") == header and isinstance(state.get("files"), dict):
            return state["files"]
    except (OSError, ValueError, AttributeError):
        pass
    return None


def save_state(path, header, files):
    tmp = path.with_name(path.name + ".tmp")
    tmp.write_text(json.dumps({"header": header, "files": files},
                              separators=(",", ":")))
    os.replace(tmp, path)


def unchanged(entry, sig, dest, on_disk):
    """True when the source still has `sig` and the files written for it, as
    `on_disk()` lists them now, are exactly the recorded ones, unmodified."""
    if not isinstance(entry, dict) or entry.get("src") != sig:
        return False
    try:
        out = {rel: [size, mtime] for rel, size, mtime in entry["out"]}
        found = on_disk()
        if not out or found is None or \
                set(out) != {str(p.relative_to(dest)) for p in found}:
            return False
        return all(stat_sig(dest / rel) == sm for rel, sm in out.items())
    except (OSError, KeyError, TypeError, ValueError):
        return False


def main():
    here = Path(__file__).resolve().parent.parent
    ap = argparse.ArgumentParser()
    ap.add_argument("--projects-dir", default="/root/.claude/projects")
    ap.add_argument("--dest", default=str(here))
    args = ap.parse_args()
    keep_handover = os.environ.get("KEEP_HANDOVER") == "1"

    projects = Path(args.projects_dir)
    dest = Path(args.dest)
    state_path = dest / STATE_NAME
    header = {"script": hashlib.sha256(Path(__file__).read_bytes()).hexdigest(),
              "python": sys.version,
              "projects_dir": str(projects.resolve()),
              "keep_handover": keep_handover}
    old_files = load_state(state_path, header)
    new_files = {}
    jsonl = sorted(projects.glob("*/*.jsonl")) + \
        sorted(projects.glob("*/*/subagents/*.jsonl")) + \
        sorted(projects.glob("*/*/subagents/workflows/*/*.jsonl"))
    verbatim = sorted(projects.glob("*/*/subagents/*.meta.json")) + \
        sorted(projects.glob("*/*/subagents/workflows/*/*.meta.json")) + \
        sorted(projects.glob("*/*/workflows/scripts/*.js"))
    wrote = []
    try:
        for is_jsonl, sources in ((True, jsonl), (False, verbatim)):
            for src in sources:
                rel = src.relative_to(projects)
                key = str(rel)
                d = dest / "projects" / rel
                sig = stat_sig(src)  # before the read: a later append must not match
                entry = (old_files or {}).get(key)
                if unchanged(entry, sig, dest,
                             (lambda: snapshot_files(d)) if is_jsonl else
                             (lambda: [d] if d.exists() else [])):
                    new_files[key] = entry
                    continue
                if is_jsonl:
                    changed, outs = process_file(src, d, keep_handover)
                else:
                    changed, outs = copy_file(src, d)
                if changed:
                    wrote.append(key)
                new_files[key] = {"src": sig, "out": [
                    [str(o.relative_to(dest))] + stat_sig(o) for o in outs]}
    finally:
        # Records of what this run finished; a source it did not reach has
        # none, and so is read next time.
        if new_files != old_files:
            try:
                save_state(state_path, header, new_files)
            except OSError:
                pass
    print(f"updated {len(wrote)} file(s)" if wrote else "no changes")
    return 0


if __name__ == "__main__":
    sys.exit(main())

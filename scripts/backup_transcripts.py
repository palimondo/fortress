#!/usr/bin/env python3
"""Snapshot Claude Code session transcripts into this branch, with policy redactions.

Copies the main session JSONL and all subagent JSONLs (+ .meta.json) from
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

The tool-results/ sidecar directory is intentionally NOT copied: the main
JSONL already stubs oversized outputs with a path + 2KB preview
("<persisted-output>"), and the sidecar otherwise holds only cached page
images of the redacted decks.

A possibly-incomplete final line (the session appends live) is dropped if it
fails to parse AND has no trailing newline; the next snapshot picks it up.

Usage: backup_transcripts.py [--projects-dir DIR] [--dest DIR]
Defaults match this container: projects dir /root/.claude/projects,
dest = the worktree containing this script.
"""
import argparse
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


def iter_lines(path):
    """Yield (raw_line, parsed_or_None); drop an unparseable unterminated tail."""
    data = path.read_bytes().decode("utf-8", errors="replace")
    lines = data.split("\n")
    tail_incomplete = not data.endswith("\n")
    if lines and lines[-1] == "":
        lines.pop()
    for i, raw in enumerate(lines):
        try:
            rec = json.loads(raw)
        except json.JSONDecodeError:
            if tail_incomplete and i == len(lines) - 1:
                return  # live-append artifact; next snapshot gets it whole
            yield raw, None  # unparseable but complete line: keep verbatim
            continue
        yield raw, rec


def collect_handover_tool_ids(path):
    ids = set()
    for _raw, rec in iter_lines(path):
        if not isinstance(rec, dict):
            continue
        msg = rec.get("message")
        if not isinstance(msg, dict):
            continue
        content = msg.get("content")
        if not isinstance(content, list):
            continue
        for block in content:
            if (isinstance(block, dict) and block.get("type") == "tool_use"
                    and "HANDOVER" in json.dumps(
                        block.get("input", {}).get("file_path", ""))):
                ids.add(block.get("id"))
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


def process_file(src, dst, keep_handover):
    handover_ids = set() if keep_handover else collect_handover_tool_ids(src)
    out_lines = []
    pdf_flag = False  # previous record announced extracted PDF pages
    for raw, rec in iter_lines(src):
        if not isinstance(rec, dict):
            out_lines.append(raw)
            continue
        changed = False
        msg = rec.get("message")
        content = msg.get("content") if isinstance(msg, dict) else None
        if isinstance(content, list):
            if pdf_flag and any(isinstance(b, dict) and b.get("type") == "image"
                                for b in content):
                content, changed = redact_images(content)
                msg["content"] = content
            for block in content:
                if (isinstance(block, dict)
                        and block.get("type") == "tool_result"
                        and block.get("tool_use_id") in handover_ids):
                    c = block.get("content")
                    n = len(c if isinstance(c, str) else json.dumps(c))
                    block["content"] = REDACT_HANDOVER.format(n=n)
                    changed = True
        pdf_flag = PDF_MARKER in raw
        out_lines.append(json.dumps(rec, ensure_ascii=False,
                                    separators=(",", ":"))
                         if changed else raw)
    new = ("\n".join(out_lines) + "\n") if out_lines else ""
    dst.parent.mkdir(parents=True, exist_ok=True)
    if dst.exists() and dst.read_text(encoding="utf-8") == new:
        return False
    dst.write_text(new, encoding="utf-8")
    return True


def main():
    here = Path(__file__).resolve().parent.parent
    ap = argparse.ArgumentParser()
    ap.add_argument("--projects-dir", default="/root/.claude/projects")
    ap.add_argument("--dest", default=str(here))
    args = ap.parse_args()
    keep_handover = os.environ.get("KEEP_HANDOVER") == "1"

    projects = Path(args.projects_dir)
    dest = Path(args.dest)
    wrote = []
    for src in sorted(projects.glob("*/*.jsonl")) + \
               sorted(projects.glob("*/*/subagents/*.jsonl")):
        rel = src.relative_to(projects)
        if process_file(src, dest / "projects" / rel, keep_handover):
            wrote.append(str(rel))
    for src in sorted(projects.glob("*/*/subagents/*.meta.json")):
        rel = src.relative_to(projects)
        d = dest / "projects" / rel
        d.parent.mkdir(parents=True, exist_ok=True)
        data = src.read_bytes()
        if not d.exists() or d.read_bytes() != data:
            d.write_bytes(data)
            wrote.append(str(rel))
    print(f"updated {len(wrote)} file(s)" if wrote else "no changes")
    return 0


if __name__ == "__main__":
    sys.exit(main())

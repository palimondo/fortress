#!/usr/bin/env python3
"""Build the CORRECT analysis segment: deduplicate the whole transcript by
each record's 'uuid' (the file contains byte-identical replays of earlier
chunks of history, re-inserted at later line positions on resume), then
keep only records whose timestamp falls in [START, END] inclusive.

Writes segment2.jsonl in the same row shape as segment_extract.py's
segment.jsonl, built from the deduplicated, timestamp-filtered set, sorted
by timestamp (falling back to original line number for exact ties).
"""
import json

PATH = "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"
START = "2026-09-27T08:40:07.483Z"   # the seed isCompactSummary of the 08:40:07 compaction
END = "2026-09-27T12:11:24.920Z"     # the latest (auto) compaction's boundary record

def block_text_len(block):
    if not isinstance(block, dict):
        return 0
    t = block.get("type")
    if t == "text":
        return len(block.get("text", ""))
    if t == "tool_result":
        c = block.get("content")
        if isinstance(c, str):
            return len(c)
        if isinstance(c, list):
            tot = 0
            for x in c:
                if isinstance(x, dict) and x.get("type") == "text":
                    tot += len(x.get("text", ""))
                elif isinstance(x, dict) and x.get("type") == "image":
                    tot += 2000
            return tot
    if t == "thinking":
        return len(block.get("thinking", ""))
    if t == "tool_use":
        try:
            return len(json.dumps(block.get("input", {})))
        except Exception:
            return 0
    return 0

def main():
    seen_uuids = set()
    kept = []  # (ts, lineno, rec)
    with open(PATH, "r", encoding="utf-8", errors="replace") as f:
        for lineno, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                continue
            uid = rec.get("uuid")
            ts = rec.get("timestamp")
            if not ts:
                continue  # skip the no-timestamp "latest state" meta records entirely
            if uid:
                if uid in seen_uuids:
                    continue  # duplicate replay of an already-seen record: skip
                seen_uuids.add(uid)
            if ts < START or ts > END:
                continue
            kept.append((ts, lineno, rec))

    kept.sort(key=lambda x: (x[0], x[1]))
    print(f"Kept {len(kept)} deduplicated, in-range records (from first-seen uuids).")

    # Build a GLOBAL tool_use index from the WHOLE file (dedup by uuid already
    # done above only for in-range records; tool_use calls that produced an
    # in-range tool_result might themselves be out-of-range in rare edge
    # cases, so index from the full first pass instead).
    tool_use_index = {}
    seen_uuids2 = set()
    with open(PATH, "r", encoding="utf-8", errors="replace") as f:
        for lineno, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                continue
            uid = rec.get("uuid")
            if uid:
                if uid in seen_uuids2:
                    continue
                seen_uuids2.add(uid)
            if rec.get("type") != "assistant":
                continue
            msg = rec.get("message", {})
            content = msg.get("content", [])
            if not isinstance(content, list):
                continue
            for b in content:
                if isinstance(b, dict) and b.get("type") == "tool_use":
                    tool_use_index[b.get("id")] = {"name": b.get("name"), "input": b.get("input", {})}

    out = []
    for ts, lineno, rec in kept:
        rtype = rec.get("type")
        row = {"line": lineno, "ts": ts, "type": rtype}

        if rtype == "assistant":
            msg = rec.get("message", {})
            usage = msg.get("usage", {})
            row["usage"] = {
                "input": usage.get("input_tokens", 0),
                "cache_read": usage.get("cache_read_input_tokens", 0),
                "cache_creation": usage.get("cache_creation_input_tokens", 0),
                "output": usage.get("output_tokens", 0),
                "thinking_tokens": (usage.get("output_tokens_details") or {}).get("thinking_tokens", 0),
            }
            content = msg.get("content", [])
            blocks = []
            for b in content if isinstance(content, list) else []:
                if not isinstance(b, dict):
                    continue
                bt = b.get("type")
                blen = block_text_len(b)
                binfo = {"btype": bt, "len": blen}
                if bt == "tool_use":
                    binfo["name"] = b.get("name")
                    inp = b.get("input", {}) if isinstance(b.get("input"), dict) else {}
                    label = inp.get("description") or inp.get("file_path") or inp.get("path") or inp.get("pattern") or inp.get("prompt")
                    if isinstance(label, str):
                        binfo["label"] = label[:150]
                blocks.append(binfo)
            row["blocks"] = blocks

        elif rtype == "user":
            msg = rec.get("message", {})
            content = msg.get("content")
            is_meta = rec.get("isMeta", False)
            is_compact_summary = rec.get("isCompactSummary", False)
            row["isMeta"] = is_meta
            row["isCompactSummary"] = is_compact_summary
            blocks = []
            if isinstance(content, str):
                blocks.append({"btype": "text", "len": len(content), "snippet": content[:80]})
            elif isinstance(content, list):
                for b in content:
                    if not isinstance(b, dict):
                        continue
                    bt = b.get("type")
                    blen = block_text_len(b)
                    binfo = {"btype": bt, "len": blen}
                    if bt == "tool_result":
                        tuid = b.get("tool_use_id")
                        tinfo = tool_use_index.get(tuid)
                        if tinfo:
                            binfo["tool_name"] = tinfo["name"]
                            inp = tinfo["input"] if isinstance(tinfo["input"], dict) else {}
                            label = inp.get("description") or inp.get("file_path") or inp.get("path") or inp.get("pattern") or inp.get("prompt") or inp.get("command")
                            if isinstance(label, str):
                                binfo["label"] = label[:150]
                    if bt == "text":
                        binfo["snippet"] = b.get("text", "")[:80]
                    blocks.append(binfo)
            row["blocks"] = blocks

        elif rtype == "system":
            subtype = rec.get("subtype")
            c = rec.get("content")
            row["subtype"] = subtype
            if isinstance(c, str):
                row["len"] = len(c)
                row["snippet"] = c[:100]
            if subtype == "compact_boundary":
                row["compactMetadata"] = rec.get("compactMetadata")

        elif rtype == "attachment":
            att = rec.get("attachment")
            try:
                s = json.dumps(att)
                row["len"] = len(s)
            except Exception:
                row["len"] = 0
            if isinstance(att, dict):
                row["att_type"] = att.get("type")

        out.append(row)

    with open("segment2.jsonl", "w") as f:
        for row in out:
            f.write(json.dumps(row) + "\n")
    print(f"Wrote {len(out)} rows to segment2.jsonl")

if __name__ == "__main__":
    main()

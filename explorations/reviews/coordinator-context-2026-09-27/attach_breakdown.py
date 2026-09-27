#!/usr/bin/env python3
"""Break down 'attachment' records within the segment by their inner type,
and list any file-content attachments (path + size), since these are a
context channel that bypasses the Read tool."""
import json
from collections import defaultdict

PATH = "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"
LO, HI = 32220, 34387

def content_len(c):
    if isinstance(c, str):
        return len(c)
    if isinstance(c, dict):
        # e.g. {"type": "text", "text": "..."} or similar
        tot = 0
        for v in c.values():
            if isinstance(v, str):
                tot += len(v)
            elif isinstance(v, (list, dict)):
                tot += len(json.dumps(v))
        return tot
    if isinstance(c, list):
        return sum(content_len(x) for x in c)
    return 0

def main():
    by_type_chars = defaultdict(int)
    by_type_count = defaultdict(int)
    file_attachments = []  # (chars, path, ts, line)
    delta_items = []  # (chars, type, ts, line, names)

    with open(PATH, encoding="utf-8", errors="replace") as f:
        for lineno, line in enumerate(f, 1):
            if lineno < LO or lineno > HI:
                continue
            rec = json.loads(line)
            if rec.get("type") != "attachment":
                continue
            att = rec.get("attachment")
            if not isinstance(att, dict):
                continue
            atype = att.get("type", "(none)")
            s = json.dumps(att)
            slen = len(s)
            by_type_chars[atype] += slen
            by_type_count[atype] += 1
            ts = rec.get("timestamp")
            if atype == "file":
                fname = att.get("filename") or att.get("displayPath")
                clen = content_len(att.get("content"))
                file_attachments.append((clen, fname, ts, lineno))
            elif atype in ("deferred_tools_delta", "mcp_instructions_delta", "instructions"):
                names = att.get("addedNames") or []
                if atype == "instructions":
                    names = [f.get("path") if isinstance(f, dict) else f for f in att.get("files", [])]
                delta_items.append((slen, atype, ts, lineno, names[:5]))

    print("=== attachment record types (raw JSON length, count) ===")
    for k in sorted(by_type_chars, key=lambda k: -by_type_chars[k]):
        print(f"  {k:30s} chars={by_type_chars[k]:>9d} ~tok={by_type_chars[k]//4:>8d}  n={by_type_count[k]}")

    print("\n=== file-type attachments (content length, path) ===")
    file_attachments.sort(key=lambda x: -x[0])
    for clen, fname, ts, ln in file_attachments[:20]:
        print(f"  chars={clen:>8d} ~tok={clen//4:>7d}  ts={ts}  line={ln}  {fname}")
    print(f"  TOTAL file attachments: {len(file_attachments)}, sum chars={sum(x[0] for x in file_attachments)}")

    print("\n=== deferred_tools_delta / mcp_instructions_delta / instructions items (top 15 by size) ===")
    delta_items.sort(key=lambda x: -x[0])
    for slen, atype, ts, ln, names in delta_items[:15]:
        print(f"  chars={slen:>7d} ~tok={slen//4:>6d}  ts={ts}  line={ln}  {atype}  names={names}")

if __name__ == "__main__":
    main()

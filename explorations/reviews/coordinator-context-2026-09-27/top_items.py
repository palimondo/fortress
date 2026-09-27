#!/usr/bin/env python3
"""Merge item-level candidates from message content (segment.jsonl) and
raw attachment records (re-scanned from the source transcript) into one
top-N list by estimated size."""
import json

PATH = "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"
LO, HI = 32220, 34387

def content_len(c):
    if isinstance(c, str):
        return len(c)
    if isinstance(c, dict):
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
    items = []

    # from segment.jsonl (message-level blocks)
    with open("segment.jsonl") as f:
        for line in f:
            r = json.loads(line)
            ts = r.get("ts")
            ln = r.get("line")
            if r["type"] == "assistant":
                for b in r.get("blocks", []):
                    if b.get("btype") == "text" and b.get("len", 0) > 300:
                        items.append((b["len"], "coordinator text", ts, ln))
                    elif b.get("btype") == "thinking" and b.get("len", 0) > 300:
                        items.append((b["len"], "coordinator thinking (text)", ts, ln))
            elif r["type"] == "user":
                is_compact = r.get("isCompactSummary")
                for b in r.get("blocks", []):
                    if b.get("btype") != "tool_result":
                        if is_compact and b.get("len",0) > 300:
                            items.append((b["len"], "compaction summary (boundary)", ts, ln))
                        elif r.get("isMeta") and b.get("len", 0) > 300:
                            items.append((b["len"], "system-reminder/hook injected into conversation", ts, ln))
                        elif not r.get("isMeta") and not is_compact and b.get("len", 0) > 300:
                            items.append((b["len"], "Pavol message", ts, ln))
                        continue
                    if b.get("len", 0) > 1000:
                        name = b.get("tool_name", "?")
                        label = b.get("label")
                        desc = f"tool_result: {name}" + (f" [{label}]" if label else "")
                        items.append((b["len"], desc, ts, ln))

    # from raw attachment records
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
            ts = rec.get("timestamp")
            if atype == "prompt_snapshot":
                slen = len(json.dumps(att))
                items.append((slen, "attachment: prompt_snapshot (harness prompt-construction record)", ts, lineno))
            elif atype == "task_reminder":
                slen = content_len(att.get("content") or att)
                items.append((slen, "attachment: task_reminder (scheduled background-task check-in)", ts, lineno))
            elif atype == "queued_command":
                slen = content_len(att.get("content") or att)
                items.append((slen, "attachment: queued_command", ts, lineno))
            elif atype == "skill_listing":
                slen = len(json.dumps(att))
                items.append((slen, "attachment: skill_listing", ts, lineno))
            elif atype == "file":
                clen = content_len(att.get("content"))
                items.append((clen, f"attachment: file [{att.get('filename')}]", ts, lineno))
            elif atype in ("deferred_tools_delta", "mcp_instructions_delta", "instructions", "deferred_tools_record"):
                slen = len(json.dumps(att))
                if slen > 1000:
                    items.append((slen, f"attachment: {atype}", ts, lineno))

    items.sort(key=lambda x: -x[0])
    print("=== Merged top 20 items across all channels ===")
    for blen, desc, ts, ln in items[:20]:
        print(f"  chars={blen:>8d} ~tok={blen//4:>7d}  ts={ts}  line={ln}  {desc}")

if __name__ == "__main__":
    main()

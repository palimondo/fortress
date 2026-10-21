#!/usr/bin/env python3
"""Print transcript lines verbatim, as the session saw them: show.py LINE [LAST] [TRANSCRIPT].
Each entry's timestamp, type and model, then its text, tool calls (input whole)
and tool results (cut at 4,000 characters; pass FULL=1 in the environment for all)."""
import json, os, sys
a = int(sys.argv[1]); b = int(sys.argv[2]) if len(sys.argv) > 2 else a
T = sys.argv[3] if len(sys.argv) > 3 else \
    "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"
cut = None if os.environ.get("FULL") else 4000
with open(T) as f:
    for i, l in enumerate(f, 1):
        if i < a: continue
        if i > b: break
        d = json.loads(l); m = d.get("message") or {}; c = m.get("content")
        print(f"=== line {i} {d.get('timestamp')} {d.get('type')} {m.get('model') or ''}")
        if isinstance(c, str): print(c[:cut])
        elif isinstance(c, list):
            for x in c:
                k = x.get("type")
                if k == "text": print(x["text"])
                elif k == "tool_use": print("[tool_use]", x["name"], json.dumps(x.get("input"), ensure_ascii=False))
                elif k == "tool_result":
                    r = x.get("content"); r = r if isinstance(r, str) else json.dumps(r, ensure_ascii=False)
                    print("[tool_result]", r[:cut])

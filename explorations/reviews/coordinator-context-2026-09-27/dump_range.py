#!/usr/bin/env python3
"""Print a compact summary line for each record in a line-number range.
Never prints raw message content beyond a short safe snippet (first 100 chars,
with any run of what looks like an api key/token/email redacted... we just cap length).
"""
import json
import sys

PATH = "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"

def main():
    lo = int(sys.argv[1])
    hi = int(sys.argv[2])
    with open(PATH, "r", encoding="utf-8", errors="replace") as f:
        for lineno, line in enumerate(f, 1):
            if lineno < lo:
                continue
            if lineno > hi:
                break
            line = line.strip()
            if not line:
                continue
            try:
                rec = json.loads(line)
            except json.JSONDecodeError:
                print(lineno, "PARSE_ERROR")
                continue
            rtype = rec.get("type")
            ts = rec.get("timestamp")
            subtype = rec.get("subtype")
            extra = ""
            if rtype == "system":
                c = rec.get("content")
                if isinstance(c, str):
                    extra = c[:120].replace("\n", " ")
            elif rtype == "user":
                msg = rec.get("message", {})
                content = msg.get("content") if isinstance(msg, dict) else None
                if isinstance(content, str):
                    extra = content[:80].replace("\n", " ")
                elif isinstance(content, list):
                    kinds = [b.get("type") if isinstance(b, dict) else str(type(b)) for b in content]
                    extra = "blocks=" + ",".join(kinds)
            elif rtype == "assistant":
                msg = rec.get("message", {})
                content = msg.get("content") if isinstance(msg, dict) else None
                if isinstance(content, list):
                    kinds = [b.get("type") if isinstance(b, dict) else str(type(b)) for b in content]
                    extra = "blocks=" + ",".join(kinds)
                usage = msg.get("usage") if isinstance(msg, dict) else None
                if usage:
                    extra += f" usage={usage}"
            keys = list(rec.keys())
            print(f"{lineno}\t{ts}\t{rtype}\t{subtype}\t{extra}\tkeys={keys}")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Index of the coordinating session's Haiku window (2026-10-16 20:09:30 UTC to
2026-10-19 21:04:25 UTC) in the main transcript: one line per event, with the
transcript's line number, so that show.py prints the event verbatim.

Usage: python3 -I timeline.py [TRANSCRIPT] > timeline.txt
Kinds: CURATOR (his typed message), SAY (the coordinator's text to him, its
length and first words), LAUNCH (Agent or Workflow, tier, description, prompt
length), COMMIT (the commit message as the command gave it, and the paths it added), WRITE (Edit or Write of a
file), PAGE (Artifact or ArtifactComments action), CMD (a /command he ran)."""
import json, re, sys
T = sys.argv[1] if len(sys.argv) > 1 else \
    "/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl"
LO, HI = "2026-10-16T20:09:30", "2026-10-19T21:04:26"
pending = {}
def one(s, n=160):
    return " ".join(s.split())[:n]
with open(T) as f:
    for i, l in enumerate(f, 1):
        try: d = json.loads(l)
        except ValueError: continue
        ts = d.get("timestamp", "")
        if not (LO <= ts < HI): continue
        t = ts[:19].replace("T", " ")
        m = d.get("message") or {}
        c = m.get("content")
        if d.get("type") == "user" and isinstance(c, str):
            if "<command-name>" in c:
                print(f"{i}\t{t}\tCMD\t{one(c.replace('<command-name>','').split('</command-name>')[0])} {one(c.split('<command-args>')[-1].split('</command-args>')[0]) if '<command-args>' in c else ''}")
            elif d.get("userType") == "external" and not c.startswith("<"):
                print(f"{i}\t{t}\tCURATOR\t{len(c)} ch\t{one(c, 240)}")
        elif d.get("type") == "user" and isinstance(c, list):
            for x in c:
                if x.get("type") == "tool_result" and x.get("tool_use_id") in pending:
                    out = x.get("content")
                    out = out if isinstance(out, str) else " ".join(y.get("text", "") for y in out if isinstance(y, dict))
                    for ln in out.splitlines():
                        if ln.startswith("[") and "]" in ln:
                            print(f"{pending[x['tool_use_id']]}\t{t}\tCOMMIT\t{one(ln, 200)}")
                    pending.pop(x["tool_use_id"])
        elif d.get("type") == "assistant":
            for x in m.get("content", []):
                if x.get("type") == "text" and x.get("text", "").strip():
                    print(f"{i}\t{t}\tSAY\t{len(x['text'])} ch\t{one(x['text'])}")
                elif x.get("type") == "tool_use":
                    n, inp = x["name"], x.get("input") or {}
                    if n in ("Agent", "Workflow"):
                        print(f"{i}\t{t}\tLAUNCH\t{n} {inp.get('model') or '(script tiers)'}\t{one(inp.get('description') or inp.get('scriptPath') or '')}\tprompt {len(str(inp.get('prompt') or inp.get('args') or ''))} ch")
                    elif n in ("Edit", "Write"):
                        print(f"{i}\t{t}\tWRITE\t{n} {inp.get('file_path')}")
                    elif n in ("Artifact", "ArtifactComments"):
                        print(f"{i}\t{t}\tPAGE\t{n} {inp.get('action','publish')} {inp.get('url') or inp.get('file_path') or ''}")
                    elif n == "SendMessage":
                        print(f"{i}\t{t}\tLAUNCH\tSendMessage to {inp.get('to')}\t{one(str(inp.get('message','')), 120)}")
                    elif n == "Bash" and "git commit" in inp.get("command", ""):
                        cmd = inp["command"]
                        msg = re.search(r"git commit[^\n]*?-m\s+([\"'])(.*?)\1", cmd, re.S)
                        files = re.findall(r"git add ([^&;\n]+)", cmd)
                        print(f"{i}\t{t}\tCOMMIT\t{one(msg.group(2) if msg else '(message not parsed)', 200)}\tadds: {one(' '.join(files), 200)}")

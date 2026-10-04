#!/usr/bin/env python3
# spend.py <since-epoch> <file-or-dir>...: tokens written (input + cache creation) and read, per transcript, deduplicated by message id
# the coordinating session's own transcript (fe616d40) is left out; agents: <session-dir>/subagents/*.jsonl or a task output file; claude -p runs: the project directory
import json, os, sys, glob
since=float(sys.argv[1]); files=[]
for a in sys.argv[2:]:
    files += [a] if os.path.isfile(a) else glob.glob(os.path.join(a,'*.jsonl'))
tw=tr=0; n=0
for f in sorted(set(files)):
    if os.path.getmtime(f) < since or os.path.basename(f).startswith("fe616d40"): continue
    seen={}; 
    for line in open(f, errors='replace'):
        try: r=json.loads(line)
        except Exception: continue
        m=r.get('message') if isinstance(r.get('message'),dict) else None
        if not m or 'usage' not in m: continue
        seen[m.get('id') or id(m)]=m['usage']
    w=sum(u.get('input_tokens',0)+u.get('cache_creation_input_tokens',0) for u in seen.values())
    rd=sum(u.get('cache_read_input_tokens',0) for u in seen.values())
    if seen: n+=1; tw+=w; tr+=rd; print(f"{os.path.basename(f)[:40]:40} calls={len(seen):4} written={w/1e3:8.1f}K read={rd/1e6:6.2f}M")
print(f"TOTAL files={n} written={tw/1e6:.2f}M read={tr/1e6:.2f}M")

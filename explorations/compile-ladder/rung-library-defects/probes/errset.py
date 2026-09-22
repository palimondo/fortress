#!/usr/bin/env python3
"""errset.py <run.txt>: print the checker's distinct errors from a checker-count or WorldFlip run
output, one per line as '<file basename>:<line> | <message joined>', every absolute path in the
message reduced to its basename, so that runs over library copies compare with runs in the tree."""
import re, sys
lines = open(sys.argv[1], encoding="utf-8").read().splitlines()
loc = re.compile(r"^/\S*/([^/\s]+\.fs[si]):(\d+):\S*:$")
absp = re.compile(r"/\S*/([^/\s]+\.fs[si])")
out, cur, msg = set(), [], []
def flush():
    if cur and msg:
        for c in cur:
            out.add(c + " | " + absp.sub(r"\1", " ".join(m.strip() for m in msg)))
for l in lines:
    m = loc.match(l)
    if m:
        if msg: flush(); cur.clear(); msg.clear()
        cur.append(m.group(1) + ":" + m.group(2))
    elif cur and l.startswith(" ") or (cur and l.startswith("the return type")):
        msg.append(l)
    elif l.startswith("@@PROBE") or l.startswith("File ") or l.startswith("###"):
        flush(); cur.clear(); msg.clear()
flush()
for e in sorted(out): print(e)

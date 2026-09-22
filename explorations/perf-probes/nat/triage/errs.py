#!/usr/bin/env python3
"""errs.py <run.out> : one line per error the whole-unit run printed, paths normalised.
kind | name | where | first | second   (kind = OVL overloading, RET return type, other: the message)"""
import re, sys
LOC = re.compile(r"^(/\S+|Library/\S+|ProjectFortress/\S+):\d+:\d+(-\d+)?(:\d+)?:$")
def norm(s):
    s = re.sub(r"/tmp/\S*?/lib/[A-Za-z0-9]+/", "Library/", s)
    s = s.replace("/home/user/fortress/", "")
    return s
errs, cur, inmsg = [], None, False
for raw in open(sys.argv[1], encoding="utf-8", errors="replace"):
    line = raw.rstrip("\n")
    if line.startswith(("@@", "###", "exit=", "ELAPSED", "File ", "	at ")):
        continue
    if LOC.match(line):
        if cur is None or inmsg:
            cur = {"locs": [], "msg": []}; errs.append(cur); inmsg = False
        cur["locs"].append(norm(line[:-1]))
    elif cur is not None:
        inmsg = True; cur["msg"].append(norm(line.strip()))
out = []
for e in errs:
    m = " ".join(e["msg"])
    r = re.match(r"Invalid overloading of (\S+) in (.*?):\s+(.*?) and (.*)$", m)
    if r:
        out.append(f"OVL | {r.group(1)} | {r.group(2)} | {r.group(3)} | {r.group(4)}"); continue
    r = re.match(r"For (\S+), the return type of (.*?) should be a subtype of the return type of (.*)$", m)
    if r:
        out.append(f"RET | {r.group(1)} | - | {r.group(2)} | {r.group(3)}"); continue
    r = re.match(r"There are multiple declarations of (\S+) with the same parameter type: (.*)$", m)
    if r:
        out.append(f"DUP | {r.group(1)} | - | {' '.join(e['locs'])} | {r.group(2)}"); continue
    out.append(f"OTHER | {' '.join(e['locs'])} | {m}")
for o in sorted(out): print(o)

#!/usr/bin/env python3
# Rung C: rewrite every Library/FortressLibrary.fss or .fsi position (file:L:C, file:L:C-C,
# file:L:C-L:C) in a text to the numbering of <base-commit>, given that the edit since then only
# inserts lines; a position on an inserted line prints as INSERTED<n>.  See REPORT.md.
# usage: remap-lines.py <base-commit> <text-file>   (writes the rewritten text to stdout)
import re, subprocess, sys
base, path = sys.argv[1:3]
maps = {}
for ext in ("fss", "fsi"):
    diff = subprocess.run(["git", "diff", "-U0", base, "--", "Library/FortressLibrary." + ext],
                          capture_output=True, text=True, check=True).stdout
    ins = []
    for l in diff.splitlines():
        if l.startswith("@@"):
            old, new = l.split()[1], l.split()[2]
            if not old.endswith(",0"):
                sys.exit("the edit is not insert-only: " + l)
            start, _, count = new[1:].partition(",")
            ins += range(int(start), int(start) + int(count or 1))
    maps[ext] = ins
def old(ext, n):
    ins = maps[ext]
    return "INSERTED%d" % n if n in ins else str(n - sum(1 for k in ins if k < n))
POS = re.compile(r'(FortressLibrary\.(fs[si])):(\d+):(\d+)(?:-(\d+)(?::(\d+))?)?')
def sub(m):
    f, ext, l1, c1, x, c2 = m.groups()
    s = "%s:%s:%s" % (f, old(ext, int(l1)), c1)
    if x is not None:
        s += "-" + ("%s:%s" % (old(ext, int(x)), c2) if c2 is not None else x)
    return s
sys.stdout.write(POS.sub(sub, open(path, encoding="utf-8").read()))

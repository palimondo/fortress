#!/usr/bin/env python3
# Skeptic's own remap for rung C: rewrite every FortressLibrary.fss/.fsi line number in a text
# from this branch's numbering back to the base numbering, computing the inserted lines
# from git diff -U0 rather than from the worker's table.  usage: sk-remap.py <base> < in > out
import re, subprocess, sys
base = sys.argv[1]
ins = {}
for ext in ('fss', 'fsi'):
    d = subprocess.run(['git', 'diff', '-U0', base, '--', f'Library/FortressLibrary.{ext}'],
                       capture_output=True, text=True, check=True).stdout
    s = set()
    for m in re.finditer(r'^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@', d, re.M):
        a, c = int(m.group(1)), int(m.group(2) or 1)
        s.update(range(a, a + c))
    ins[ext] = sorted(s)
def back(ext, n):
    n = int(n)
    return str(n - sum(1 for x in ins[ext] if x < n))
def fix(m):
    ext, rest = m.group(1), m.group(2)
    # rest is L:C, L:C-C2, L:C-L2:C2 or L:C~L2:C2
    rest = re.sub(r'^(\d+)', lambda k: back(ext, k.group(1)), rest)
    rest = re.sub(r'([-~])(\d+):(\d+)', lambda k: k.group(1) + back(ext, k.group(2)) + ':' + k.group(3), rest)
    return f'FortressLibrary.{ext}:{rest}'
for line in sys.stdin:
    sys.stdout.write(re.sub(r'FortressLibrary\.(fss|fsi):(\d+:\d+(?:[-~]\d+(?::\d+)?)?)', fix, line))

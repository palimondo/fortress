#!/usr/bin/env python3
"""sites-compare.py <base-commit> <landed-sites.tsv> <after-sites.tsv>: the distance stage's per-site lists, the
last landed gate's (taken on the base) against this rung's after, site by site. Every position FILE:N (and
FILE:N.C, and both lines of FILE:L:C-L2:C2) in any field of the after list that falls in a file the edit changed (git diff -U0 <base>) is mapped
back to its line at the base; a position on an inserted line becomes INSERTED<n>. Then the two lists are
compared as multisets of whole rows: prints each row only in the landed list (gone) and only in the after
list (new), with its class, and the totals."""
import re, subprocess, sys
from collections import Counter
base, landed, after = sys.argv[1:4]
files = subprocess.run(['git', 'diff', '--name-only', base, '--', 'Library/*.fss', 'Library/*.fsi', 'ProjectFortress/LibraryBuiltin/*.fss', 'ProjectFortress/LibraryBuiltin/*.fsi'], capture_output=True, text=True, check=True).stdout.split()
maps = {}
for p in files:
    d = subprocess.run(['git', 'diff', '-U0', base, '--', p], capture_output=True, text=True, check=True).stdout
    hunks = [tuple(int(x or 1) for x in m.groups()) for m in re.finditer(r'^@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@', d, re.M)]
    maps[p.split('/')[-1]] = hunks
def back(f, n):
    off = 0
    for a, b, c, dd in maps[f]:
        if b == 0 and c <= n < c + dd: return 'INSERTED%d' % n
        if n >= c + dd: off += dd - (b if b else 0)
    return str(n - off)
NAMES = '|'.join(re.escape(k) for k in maps)
pos = re.compile(r'(' + NAMES + r'):(\d+)(?::(\d+)-(\d+):(\d+))?')   # FILE:L, or FILE:L:C-L2:C2 with both lines mapped
def norm(row):
    def one(m):
        f, l1, c1, l2, c2 = m.groups()
        r = '%s:%s' % (f, back(f, int(l1)))
        if l2 is not None: r += ':%s-%s:%s' % (c1, back(f, int(l2)), c2)
        return r
    return pos.sub(one, row)
def rows(p): return [l.rstrip('\n') for l in open(p) if l.strip() and not l.startswith('#')]
L = Counter(rows(landed)); A = Counter(norm(r) for r in rows(after))
gone, new = L - A, A - L
print('# base %s; positions mapped back in %s' % (base, ', '.join(sorted(maps))))
for r, n in sorted(gone.items()):
    f = r.split('\t'); print('GONE x%d\t%s\t%s\t%s\t%s' % (n, f[0], f[2], f[5], f[6][:260]))
for r, n in sorted(new.items()):
    f = r.split('\t'); print('NEW  x%d\t%s\t%s\t%s\t%s' % (n, f[0], f[2], f[5], f[6][:260]))
print('landed %d rows, after %d rows; gone %d, new %d, the same %d' % (sum(L.values()), sum(A.values()), sum(gone.values()), sum(new.values()), sum((L & A).values())))

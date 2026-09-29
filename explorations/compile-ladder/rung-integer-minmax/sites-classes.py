#!/usr/bin/env python3
"""sites-classes.py <base-commit> <landed-sites.tsv> <after-sites.tsv>: the distance stage's class counts
recomputed from the per-site lists with the stage's own classify.py (explorations/coordinator/tools/distance/),
three ways: the landed list; the after list as it is; and the after list with every position in the four
library files the edit changed mapped back to its line at the base (sites-compare.py's mapping). classify.py
names a few classes by hard-coded line ranges of FortressLibrary.fss, so an edit that inserts lines above them
moves sites across those ranges; the third column is the count with that shift undone, and the fourth the
difference from the landed count that is left."""
import collections, os, sys
sys.dont_write_bytecode = True     # no __pycache__ beside the stage's tools
sys.path.insert(0, 'explorations/coordinator/tools/distance')
import classify as C
here = os.path.dirname(os.path.abspath(__file__))
ns = {}
src = open(os.path.join(here, 'sites-compare.py')).read()
base, landed, after = sys.argv[1:4]
sys.argv = ['sites-compare.py', base, landed, after]
exec(src.split("def rows(p)")[0], ns)          # maps, back() and norm() without the comparison
def rows(p, mapped):
    out = []
    for l in open(p):
        if not l.strip() or l.startswith('#'): continue
        c = l.rstrip('\n').split('\t')
        kind, fam, sub, loc, msg = c[0], c[1], c[2], c[5], c[6]
        if mapped: loc, msg = ns['norm'](loc), ns['norm'](msg)
        if kind == 'overloading': fam = fam + '|' + sub
        out.append((kind, fam if kind in ('overloading', 'return-type', 'abstract-method') else '-', loc, msg))
    return out
L = collections.Counter(C.with_cascades(rows(landed, False)))
A = collections.Counter(C.with_cascades(rows(after, False)))
M = collections.Counter(C.with_cascades(rows(after, True)))
print('# class\tlanded\tafter\tafter, positions mapped to the base\tleft after mapping')
for code in [c for c, _, _ in C.RULES] + ['GF', 'OT']:
    if L[code] or A[code] or M[code]:
        print('%s\t%d\t%d\t%d\t%+d\t%s' % (code, L[code], A[code], M[code], M[code] - L[code], C.NAMES[code]))
print('total\t%d\t%d\t%d\t%+d' % (sum(L.values()), sum(A.values()), sum(M.values()), sum(M.values()) - sum(L.values())))

#!/usr/bin/env python3
"""sites-vs.py <control.full.tsv> <variant.full.tsv> : the distance sites that differ between two runs of
distance-copy.sh, each error keyed by its root-cause class (classify.py) and its location, so that a message
whose wording varies between runs (the order of an AND(...), a long candidate list) is not counted as a change.
Prints the sites gone and the sites new, one per line: class, kind, location, the message's first 240 characters."""
import collections, os, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../coordinator/tools/distance'))
import classify as C

def keyed(path):
    rows = C.load(path); cls = C.with_cascades(rows)
    out = collections.Counter(); msg = {}
    for (kind, fam, loc, m), c in zip(rows, cls):
        k = (c, kind, loc); out[k] += 1; msg.setdefault(k, ' '.join(m.split())[:240])
    return out, msg

a, am = keyed(sys.argv[1]); b, bm = keyed(sys.argv[2])
gone = a - b; new = b - a
print('# %s: %d errors; %s: %d errors; %d sites gone, %d new (keyed by class and location)'
      % (os.path.basename(sys.argv[1]), sum(a.values()), os.path.basename(sys.argv[2]), sum(b.values()),
         sum(gone.values()), sum(new.values())))
for title, d, m in (('gone', gone, am), ('new', new, bm)):
    print('## %s' % title)
    for k in sorted(d):
        for _ in range(d[k]): print('%s\t%s\t%s\t%s' % (k[0], k[1], k[2], m[k]))

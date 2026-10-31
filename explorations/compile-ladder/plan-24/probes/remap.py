#!/usr/bin/env python3
"""Climb batch 24's planner: before classify.py runs, give each binding whose string already names a helper
(the 21 that climb batch 23 moved) the glue class it named on climb batch 23's base, so that the natives probe's
classifier sorts it as it did there, and list it as moved. The old glue comes from climb batch 23's table of that
base (plan-23/probes/classified-base.tsv, a1f8c4b8b), matched by file, owner and header, which the move left
unchanged. Usage, in the run folder after match.py: remap.py <plan-23 classified-base.tsv> matched.tsv moved.tsv"""
import csv, sys
old = list(csv.DictReader(open(sys.argv[1]), delimiter='\t'))
key = {}
for r in old:
    key.setdefault((r['file'], r['owner'], ' '.join(r['header'].split())), []).append(r['glue'])
rows = list(csv.DictReader(open(sys.argv[2]), delimiter='\t'))
fields = list(rows[0].keys())
moved = []
for r in rows:
    g = r['glue']
    if g.startswith('com.sun.fortress.nativeHelpers.'):
        k = (r['file'], r['owner'], ' '.join(r['header'].split()))
        hits = key.get(k, [])
        assert len(set(hits)) == 1, ('no single old glue for', k, hits)
        moved.append((r['file'], r['line'], r['owner'], r['header'], hits[0], g.replace('com.sun.fortress.nativeHelpers.', '')))
        r['glue'] = hits[0]
with open(sys.argv[2], 'w') as fh:
    w = csv.DictWriter(fh, fieldnames=fields, delimiter='\t', lineterminator='\n')
    w.writeheader(); w.writerows(rows)
with open(sys.argv[3], 'w') as fh:
    fh.write('file\tline\towner\theader\tglue_before\thelper_now\n')
    for m in moved: fh.write('\t'.join(m) + '\n')
sys.stderr.write('moved bindings remapped to their old glue: %d\n' % len(moved))

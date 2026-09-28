#!/usr/bin/env python3
"""pair-by-site.py <distance-diff.txt>: distance-diff.py's lists of errors that go and errors that appear, paired by
kind, unit and site (the message aside), a site on a line the edit rewrote mapped to its base line by hand below:
a pair is one error whose message changed; what stays unpaired went or came."""
import collections, sys
REWRITTEN = {'FortressLibrary.fss:EDITED4504': 'FortressLibrary.fss:4497', 'FortressLibrary.fss:EDITED4506': 'FortressLibrary.fss:4499'}
sec = None; gone = []; app = []
for l in open(sys.argv[1], encoding='utf-8').read().split('\n'):
    if l.startswith('## gone'): sec = 'g'; continue
    if l.startswith('## appear'): sec = 'a'; continue
    if l.startswith('#') or not l.strip(): continue
    r = l.split('\t')
    (gone if sec == 'g' else app).extend([tuple(r[1:6])] * int(r[0]))
site = lambda r: (r[0], r[2], REWRITTEN.get(r[3], r[3]))
gs = collections.Counter(site(r) for r in gone); as_ = collections.Counter(site(r) for r in app)
paired = gs & as_
print('# paired by site (one error, its message changed): %d' % sum(paired.values()))
for k, n in sorted(paired.items()): print('P\t%d\t%s' % (n, '\t'.join(k)))
print('# went, unpaired: %d' % sum((gs - as_).values()))
fam = collections.Counter()
for r in gone:
    if (gs - as_)[site(r)] > 0: fam[(r[0], r[1])] += 1
for k, n in sorted(fam.items()): print('G\t%d\t%s' % (n, '\t'.join(k)))
print('# came, unpaired: %d' % sum((as_ - gs).values()))
for r in app:
    if (as_ - gs)[site(r)] > 0: print('A\t%s' % '\t'.join((r[0], r[2], r[3], r[4][:200])))

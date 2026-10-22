#!/usr/bin/env python3
"""Open rows by what guards them: the kind of their reproducer, crossed with the era of the row's number.

Kinds: xxx (an XXX test under the test folders: the gate reports it red when the defect is fixed),
plain (a plain test under the test folders: it pins today's behaviour or asserts a fixed half),
probe (a path under explorations/: no gate runs it), other-path (a file of the tree that is no test),
none. Eras by row number: A 1-310 (to 2026-09-16), B 311-639 (to the rework, 2026-10-08),
C 640-794 (since the rework). Writes guards.tsv (row, status, era, kind, reproducer) and prints the table."""
import collections, os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'explorations', 'coordinator', 'tools'))
import ledger as L
led = L.Ledger(os.path.join(ROOT, L.LEDGER_REL))
lin = L.Linter(ROOT)
OPEN = ('NEGATIVE-VERIFIED', 'NEGATIVE-BOUNDED', 'CONTESTED')
def era(n):
    return 'A' if n <= 310 else 'B' if n <= 639 else 'C'
def kind(r):
    c = r.reproducer.strip().strip('`')
    if c in ('none', ''):
        return 'none', c
    c = re.sub(r':\d[\d,-]*$', '', c)
    p = c if os.path.exists(os.path.join(ROOT, c)) else None
    if p is None and '/' not in c:
        try:
            p = lin.test_path(c)
        except L.LedgerError:
            p = None
    if p is None:
        return 'missing', c
    if p.startswith('explorations/'):
        return 'probe', p
    seg = p.split('/')
    if seg[0] == 'ProjectFortress' and len(seg) > 1 and (seg[1] == 'tests' or seg[1].endswith('_tests') or seg[1] in L.TEST_FOLDERS_EXTRA):
        x = 'XXX' in os.path.basename(p)
        if not x and p.endswith('.test'):
            x = any(l.startswith('tests=') and 'XXX' in l for l in open(os.path.join(ROOT, p), errors='replace'))
        if not x and p.endswith('.fss'):
            # a Link pair: XXX<Name>.test beside it
            d, b = os.path.split(p)
            x = os.path.exists(os.path.join(ROOT, d, 'XXX' + b[:-4] + '.test'))
        return ('xxx' if x else 'plain'), p
    return 'other-path', p
tab = collections.Counter()
with open(os.path.join(HERE, '..', 'guards.tsv'), 'w') as f:
    f.write('row\tstatus\tera\tkind\tspec_silent\treproducer\n')
    for r in led.rows:
        if r.status_word not in OPEN:
            continue
        k, p = kind(r)
        tab[(era(r.num), k)] += 1
        tab[('all', k)] += 1
        f.write('%d\t%s\t%s\t%s\t%s\t%s\n' % (r.num, r.status_word, era(r.num), k, r.spec.strip() == 'silent', p))
kinds = ['xxx', 'plain', 'probe', 'other-path', 'none', 'missing']
print('era\t' + '\t'.join(kinds) + '\ttotal')
for e in ('A', 'B', 'C', 'all'):
    row = [tab[(e, k)] for k in kinds]
    print(e + '\t' + '\t'.join(map(str, row)) + '\t%d' % sum(row))

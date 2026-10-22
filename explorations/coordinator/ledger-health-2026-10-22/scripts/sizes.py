#!/usr/bin/env python3
"""Sizes of the gap ledger's rows against ledger.py's limits, and growth since a base commit.
usage: sizes.py [BASE]   (default ae4f8e38a, the rework)"""
import collections, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'explorations', 'coordinator', 'tools'))
import ledger as L
BASE = sys.argv[1] if len(sys.argv) > 1 else 'ae4f8e38a'
now = L.Ledger(os.path.join(ROOT, L.LEDGER_REL))
then = L.Ledger('x', subprocess.run(['git', '-C', ROOT, 'show', '%s:%s' % (BASE, L.LEDGER_REL)], capture_output=True, text=True).stdout)
OPEN = ('NEGATIVE-VERIFIED', 'NEGATIVE-BOUNDED', 'CONTESTED')
groups = {'open': [r for r in now.rows if r.status_word in OPEN],
          'positive': [r for r in now.rows if r.status_word == 'POSITIVE-VERIFIED'],
          'closed': [r for r in now.rows if r.status_word in L.CLOSED]}
def band(vals, cuts):
    return [sum(1 for v in vals if v >= c) for c in cuts]
rc = (1190, 1150, 1100, 1000, 800)
nc = (690, 650, 600, 500)
print('== row length (limit 1,200) and notes length (limit 700), rows at or above each mark')
print('group\trows\t' + '\t'.join('row>=%d' % c for c in rc) + '\t' + '\t'.join('notes>=%d' % c for c in nc) + '\tmedian_row\tmedian_notes')
for g, rs in groups.items():
    lens = sorted(len(r.line) for r in rs); ns = sorted(len(r.notes) for r in rs)
    print('%s\t%d\t%s\t%s\t%d\t%d' % (g, len(rs), '\t'.join(map(str, band(lens, rc))), '\t'.join(map(str, band(ns, nc))), lens[len(lens)//2], ns[len(ns)//2]))
# room for a note of 100 characters: notes+102 <= 700 and row+102 <= 1200
op = groups['open']
no_room = [r for r in op if len(r.notes) + 102 > 700 or len(r.line) + 102 > 1200]
print('\nopen rows with no room for a 100-character note: %d of %d' % (len(no_room), len(op)))
by_notes = sum(1 for r in no_room if len(r.notes) + 102 > 700)
by_row = sum(1 for r in no_room if len(r.line) + 102 > 1200)
print('  of them limited by the notes cell: %d; by the row: %d (some by both)' % (by_notes, by_row))
print('  claim at or above 280 of 300: %d' % sum(1 for r in op if len(r.claim) >= 280))
# growth
tn = {r.num: r for r in then.rows}
new = [r for r in now.rows if r.num not in tn]
old = [r for r in now.rows if r.num in tn]
grew = [r for r in old if len(r.line) > len(tn[r.num].line)]
shrank = [r for r in old if len(r.line) < len(tn[r.num].line)]
changed = [r for r in old if r.line != tn[r.num].line]
print('\n== growth since %s' % BASE)
print('file: %d -> %d characters (%+d, %+.1f%%)' % (len(then.text()), len(now.text()), len(now.text()) - len(then.text()), 100.0 * (len(now.text()) - len(then.text())) / len(then.text())))
print('rows: %d -> %d (%d new, rows %d to %d)' % (len(then.rows), len(now.rows), len(new), min(r.num for r in new), max(r.num for r in new)))
print('new rows: %d characters; by status now: %s' % (sum(len(r.line) for r in new), dict(collections.Counter(r.status_word for r in new))))
print('old rows changed: %d (grew %d by %d characters, shrank %d by %d characters, mostly closes)' % (
    len(changed), len(grew), sum(len(r.line) - len(tn[r.num].line) for r in grew), len(shrank), sum(len(tn[r.num].line) - len(r.line) for r in shrank)))
old_open = [r for r in old if r.status_word in OPEN]
print('old rows still open: %d; of them changed since: %d' % (len(old_open), sum(1 for r in old_open if r.line != tn[r.num].line)))
print('rows closed since (FIXED or DUPLICATE now, open then): %d' % sum(1 for r in old if r.status_word in ('FIXED', 'DUPLICATE') and tn[r.num].status_word not in L.CLOSED))
new_open = [r for r in new if r.status_word in OPEN]
print('new rows still open: %d; of them at row>=1100 or notes>=600: %d' % (len(new_open), sum(1 for r in new_open if len(r.line) >= 1100 or len(r.notes) >= 600)))
lens = sorted(len(r.line) for r in new_open)
print('new open rows: median length %d, at the time of entry vs now not measured' % lens[len(lens)//2])

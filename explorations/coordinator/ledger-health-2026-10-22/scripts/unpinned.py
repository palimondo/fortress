#!/usr/bin/env python3
"""Open rows (NEGATIVE-VERIFIED, NEGATIVE-BOUNDED, CONTESTED) that cite a line of a file of the
original tree (outside explorations/) with no commit hash anywhere in the row, so a reader cannot
tell which tree the line was read at. Prints row, the count of such citations, the first three."""
import os, re, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..'))
sys.path.insert(0, os.path.join(ROOT, 'explorations', 'coordinator', 'tools'))
import ledger as L
led = L.Ledger(os.path.join(ROOT, L.LEDGER_REL))
OPEN = ('NEGATIVE-VERIFIED', 'NEGATIVE-BOUNDED', 'CONTESTED')
n_open = n_cite = n_unpinned = 0
print('row\tstatus\tline_cites\tfirst')
for r in led.rows:
    if r.status_word not in OPEN:
        continue
    n_open += 1
    cites = [(p, l) for p, l in L.path_tokens(r.line.replace('\\|', ' ')) if l and not p.startswith('explorations/') and not p.endswith('.tex')]
    if not cites:
        continue
    n_cite += 1
    if L.HASH.search(re.sub(r'`[^`]*`', lambda m: m.group(0) if re.fullmatch(r'`[0-9a-f]{7,40}`', m.group(0)) else '', r.line)) or re.search(r'\bat [0-9a-f]{7,40}\b', r.line):
        continue
    n_unpinned += 1
    print('%d\t%s\t%d\t%s' % (r.num, r.status_word, len(cites), '; '.join('%s:%s' % c for c in cites[:3])))
sys.stderr.write('open rows %d; citing a tree file:line %d; with no commit hash in the row %d\n' % (n_open, n_cite, n_unpinned))

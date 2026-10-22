#!/usr/bin/env python3
"""Growth of the gap ledger between commits: rows, characters of row text, by status, open rows' length bands.
usage: growth.py COMMIT... (reads the ledger at each commit with git show; 'WORK' is the working tree)"""
import os, subprocess, sys, collections
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', 'tools'))
import ledger as L
ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '..'))
def text_at(c):
    if c == 'WORK':
        return open(os.path.join(ROOT, L.LEDGER_REL), encoding='utf-8').read()
    return subprocess.run(['git', '-C', ROOT, 'show', '%s:%s' % (c, L.LEDGER_REL)], capture_output=True, text=True, check=True).stdout
print('commit\tfile_chars\trows\trow_chars\topen_rows\topen_chars\tclosed_rows\tclosed_chars\topen_ge_1100\topen_notes_ge_600\tmax_row')
for c in sys.argv[1:]:
    t = text_at(c)
    led = L.Ledger('x', t)
    rows = led.rows
    op = [r for r in rows if r.status_word not in L.CLOSED]
    cl = [r for r in rows if r.status_word in L.CLOSED]
    print('\t'.join(map(str, [c, len(t), len(rows), sum(len(r.line) for r in rows), len(op), sum(len(r.line) for r in op),
        len(cl), sum(len(r.line) for r in cl), sum(1 for r in op if len(r.line) >= 1100), sum(1 for r in op if len(r.notes) >= 600),
        max(r.num for r in rows)])))

#!/usr/bin/env python3
"""mg-values.py <probe-k mg.txt> <log-dir> : each microGPT check's printed lines under the switch
against the stock lines probe K recorded on 2026-09-28 (captures/mg.txt of plan-n/probe-k, "every
line it printed"), with each step's wall time "(N ms)" and the last line's total masked.  The stock
run is on file, not repeated: rungs K, I, T and M, which landed since, changed no microGPT value
(FACTS, rung K's and rung M's entries).  Prints, per check, the lines that differ and the verdicts."""
import os, re, sys

rec, logdir = sys.argv[1], sys.argv[2]
text = open(rec, encoding='utf-8').read().splitlines()


def section(title):
    out, on = [], False
    for l in text:
        if l.startswith('== '):
            on = (l.strip() == title)
            continue
        if on and l.strip():
            out.append(l)
    return out


def norm(lines):
    res = []
    for l in lines:
        l = re.sub(r'\(\d+ ms\)', '(N ms)', l)
        l = re.sub(r'^total \d+ s$', 'total N s', l)
        res.append(l.rstrip())
    return res


for chk in ('MicroGptFlatCheck', 'MicroGptAplCheck'):
    stock = norm(section('== %s, stock: every line it printed, the parser generator\'s dropped' % chk))
    p = os.path.join(logdir, chk + '.txt')
    if not os.path.exists(p):
        print('== %s: no log' % chk)
        continue
    raw = open(p, encoding='utf-8', errors='replace').read().splitlines()
    start = next((i for i, l in enumerate(raw) if l.startswith('MicroGpt')), 0)
    mine = norm([l for l in raw[start:] if l.strip() and not l.startswith('rc=')])
    rc = next((l for l in raw if l.startswith('rc=')), 'rc=?')
    diffs = [(i + 1, a, b) for i, (a, b) in enumerate(zip(stock, mine)) if a != b]
    print('== %s: stock (on file) %d lines, switch %d lines, %s; %d lines differ once masked'
          % (chk, len(stock), len(mine), rc, len(diffs) + abs(len(stock) - len(mine))))
    for i, a, b in diffs[:10]:
        print('   line %d\n     stock:  %s\n     switch: %s' % (i, a[:200], b[:200]))
    for l in mine:
        if l.startswith('VERDICT'):
            print('   switch ' + l)

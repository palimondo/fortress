#!/usr/bin/env python3
"""plan-moves.py --root WT --base AT: check that every line taken out of PLAN.md went to PLAN-history.md word for word.

A line taken out is a line of PLAN.md at AT, the commit that the worktree WT was made at, that the working
PLAN.md no longer holds, as a whole line: a line moved, cut to a pointer, or changed. Each must stand among
the lines that the working PLAN-history.md gained since AT, as many times as it went. PLAN-history.md only
gains: a line that it lost is a failure too. Blank lines are not counted. Prints the counts, the headings
that PLAN-history.md gained, and each failure; exit 1 on any.
"""
import argparse
import collections
import os
import subprocess
import sys

ap = argparse.ArgumentParser()
ap.add_argument('--root', required=True)
ap.add_argument('--base', required=True)
a = ap.parse_args()
D = 'explorations/coordinator/'


def at(rel):
    r = subprocess.run(['git', '-C', a.root, 'show', '%s:%s' % (a.base, D + rel)], capture_output=True, text=True)
    if r.returncode:
        sys.exit('plan-moves.py: no %s at %s' % (rel, a.base))
    return r.stdout.split('\n')


def now(rel):
    with open(os.path.join(a.root, D + rel), encoding='utf-8') as f:
        return f.read().split('\n')


plan0, plan1 = at('PLAN.md'), now('PLAN.md')
hist0, hist1 = collections.Counter(at('PLAN-history.md')), collections.Counter(now('PLAN-history.md'))
out = [l for l in (collections.Counter(plan0) - collections.Counter(plan1)).elements() if l.strip()]
gained = hist1 - hist0
lost = [l for l in (hist0 - hist1).elements() if l.strip()]
first = {}
for i, l in enumerate(plan0, 1):
    first.setdefault(l, i)
missing = []
for l in out:
    if gained[l] > 0:
        gained[l] -= 1
    else:
        missing.append(l)
heads = [l for l in (hist1 - hist0).elements() if l.startswith('#')]
print('plan-moves: %d lines taken out of PLAN.md; PLAN-history.md gained %d lines, under %d headings' % (
    len(out), sum(1 for l in (hist1 - hist0).elements() if l.strip()), len(heads)))
for h in heads:
    print('  gained heading: %s' % h)
for l in missing:
    print('FAIL not in PLAN-history.md word for word: PLAN.md:%d at %s: %s' % (first.get(l, 0), a.base, l[:160]))
for l in lost:
    print('FAIL PLAN-history.md lost a line: %s' % l[:160])
print('plan-moves: %s' % ('pass' if not missing and not lost else '%d failures' % (len(missing) + len(lost))))
sys.exit(1 if missing or lost else 0)

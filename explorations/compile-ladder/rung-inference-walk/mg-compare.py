#!/usr/bin/env python3
"""mg-compare.py <base-dir> <edit-dir>: probe K's mg-compare.py (explorations/compile-ladder/plan-n/probe-k/) for
the two microGPT checks, the base against the rung's edit. From each log: the lines the check prints, the Rats!
parser generator's lines dropped and each step's wall time "(NNN ms)" masked (it varies from run to run); then
every line that differs, the PASS count, the verdict line, the exit and the wall time of each run."""
import os
import re
import sys

NOISE = re.compile(r'^(Rats! Parser Generator|Processing |Note: |\s*$)')


def values(d, t):
    lines = open(os.path.join(d, 'log', t + '.txt'), encoding='utf-8', errors='replace').read().splitlines()
    out = [re.sub(r'\(\d+ ms\)', '(N ms)', l) for l in lines if not NOISE.match(l)]
    return [l for l in out if not l.startswith('rc=')], next((l for l in lines if l.startswith('rc=')), 'rc=?')


def main():
    db, de = sys.argv[1:3]
    for t in ('MicroGptFlatCheck', 'MicroGptAplCheck'):
        s, rs = values(db, t)
        a, ra = values(de, t)
        diff = [(i + 1, x, y) for i, (x, y) in enumerate(zip(s, a)) if x != y]
        print('== %s: base %d lines, %d PASS, %s; edit %d lines, %d PASS, %s; %d lines differ%s'
              % (t, len(s), sum(' PASS' in l for l in s), rs, len(a), sum(' PASS' in l for l in a),
                 ra, len(diff) + abs(len(s) - len(a)), '' if len(s) == len(a) else ' (lengths differ)'))
        for i, x, y in diff:
            print('   line %d\n     base: %s\n     edit: %s' % (i, x, y))
        for l in s:
            if l.startswith('VERDICT'):
                print('   base ' + l)
        for l in a:
            if l.startswith('VERDICT'):
                print('   edit ' + l)


if __name__ == '__main__':
    main()

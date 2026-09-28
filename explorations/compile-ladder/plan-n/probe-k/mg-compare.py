#!/usr/bin/env python3
"""mg-compare.py <stock-dir> <apply-dir>: the two microGPT checks' printed values, stock against the shadow
in apply mode.  From each log: the lines the check prints, the Rats! parser generator's lines dropped and
each step's wall time "(NNN ms)" masked (it varies from run to run); then every line that differs, the
PASS count, the verdict line and the exit, and the shadow's difference lines for the check."""
import os
import re
import sys

NOISE = re.compile(r'^(Rats! Parser Generator|Processing |Note: |\s*$)')


def values(d, t):
    lines = open(os.path.join(d, 'log', t + '.txt'), encoding='utf-8', errors='replace').read().splitlines()
    out = [re.sub(r'\(\d+ ms\)', '(N ms)', l) for l in lines if not NOISE.match(l)]
    return [l for l in out if not l.startswith('rc=')], next((l for l in lines if l.startswith('rc=')), 'rc=?')


def main():
    ds, da = sys.argv[1:3]
    for t in ('MicroGptFlatCheck', 'MicroGptAplCheck'):
        s, rs = values(ds, t)
        a, ra = values(da, t)
        diff = [(i + 1, x, y) for i, (x, y) in enumerate(zip(s, a)) if x != y]
        print('== %s: stock %d lines, %d PASS, %s; apply %d lines, %d PASS, %s; %d lines differ%s'
              % (t, len(s), sum(' PASS' in l for l in s), rs.split()[0], len(a), sum(' PASS' in l for l in a),
                 ra.split()[0], len(diff) + abs(len(s) - len(a)),
                 '' if len(s) == len(a) else ' (lengths differ)'))
        for i, x, y in diff:
            print('   line %d\n     stock: %s\n     apply: %s' % (i, x, y))
        for l in s:
            if l.startswith('VERDICT'):
                print('   stock ' + l)
        for l in a:
            if l.startswith('VERDICT'):
                print('   apply ' + l)
        p = os.path.join(da, 'probe', t + '.txt')
        n = sum(1 for _ in open(p)) if os.path.exists(p) else 0
        print('   the shadow\'s difference lines in apply mode: %d' % n)


if __name__ == '__main__':
    main()

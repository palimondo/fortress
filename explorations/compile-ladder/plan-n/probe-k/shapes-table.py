#!/usr/bin/env python3
"""shapes-table.py <stock-dir> <log-dir> <apply-dir> <shapes-dir>: the shape programs' results (make-shapes.py)
under the stock build, the shadow in log mode and the shadow in apply mode: each program's call, its
first output line (or the first line of its error) and exit in each, and the shadow's difference lines
in apply mode, the private home's path replaced by H."""
import glob
import os
import re
import sys

HOME = '/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/pk/home'


def first(d, t):
    p = os.path.join(d, 'log', t + '.txt')
    s = open(p, encoding='utf-8', errors='replace').read().replace(HOME, 'H')
    lines = [l for l in s.splitlines() if l.strip()]
    rc = next((l for l in reversed(lines) if l.startswith('rc=')), 'rc=?').split()[0]
    body = [l for l in lines if not l.startswith('rc=')]
    head = body[0] if body else ''
    if head.startswith('com.sun.fortress.exceptions') and len(body) > 1:
        head = body[1]
    return '%s  [%s]' % (head[:200], rc)


def main():
    ds, dl, da, sd = sys.argv[1:5]
    for f in sorted(glob.glob(os.path.join(sd, 'PK*.fss'))):
        t = os.path.basename(f)[:-4]
        call = re.search(r'println\("(.*?): " \(', open(f).read()).group(1)
        print('== %s: %s' % (t, call))
        print('   stock: %s' % first(ds, t))
        print('   log:   %s' % first(dl, t))
        print('   apply: %s' % first(da, t))
        p = os.path.join(da, 'probe', t + '.txt')
        if os.path.exists(p):
            for l in open(p, encoding='utf-8', errors='replace'):
                print('   ' + l.rstrip('\n').replace(HOME, 'H'))


if __name__ == '__main__':
    main()

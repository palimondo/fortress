#!/usr/bin/env python3
"""count-compare.py <list-file> <baseA-dir> <baseB-dir> <edit-dir>: compares the logs count-run.sh wrote.

For each test of the list, the output of the base run A, of a second base run B and of the run with the
edited natives, each with its work directory's path replaced by W and the trailer's secs= dropped.
A test is STABLE when A equals B; a stable test is CHANGED when the edited run differs from A.
A test whose A and B differ is UNSTABLE, and is listed with both first differing lines so it can be
judged by hand. Prints one line per test that is CHANGED or UNSTABLE, then the totals."""
import os
import re
import sys


def load(d, t):
    p = os.path.join(d, 'log', t + '.txt')
    try:
        s = open(p, encoding='utf-8', errors='replace').read()
    except FileNotFoundError:
        return None
    s = s.replace(os.path.abspath(d), 'W')
    s = re.sub(r'^(rc=\S+) secs=\d+$', r'\1', s, flags=re.M)
    return s.splitlines()


def first_diff(a, b):
    for i in range(max(len(a), len(b))):
        x = a[i] if i < len(a) else '<end of output>'
        y = b[i] if i < len(b) else '<end of output>'
        if x != y:
            return i + 1, x, y
    return None


def rc(lines):
    for l in reversed(lines or []):
        if l.startswith('rc='):
            return l[3:]
    return '?'


def main():
    lst, da, db, de = sys.argv[1:5]
    tests = [os.path.basename(l.strip())[:-4] for l in open(lst) if l.strip()]
    stable = changed = unstable = missing = 0
    for t in tests:
        a, b, e = load(da, t), load(db, t), load(de, t)
        if a is None or b is None or e is None:
            missing += 1
            print('MISSING  %s' % t)
            continue
        if a == b:
            stable += 1
            d = first_diff(a, e)
            if d:
                changed += 1
                print('CHANGED  %s  rc %s -> %s  line %d\n    base: %s\n    edit: %s'
                      % (t, rc(a), rc(e), d[0], d[1][:200], d[2][:200]))
        else:
            unstable += 1
            dab = first_diff(a, b)
            dae = first_diff(a, e)
            print('UNSTABLE %s  rc A %s B %s edit %s  A/B line %d%s\n    A:    %s\n    B:    %s'
                  % (t, rc(a), rc(b), rc(e), dab[0],
                     ('  A/edit line %d' % dae[0]) if dae else '  A/edit identical',
                     dab[1][:200], dab[2][:200]))
            if dae:
                print('    edit: %s' % dae[2][:200])
    print('tests %d  stable %d  changed %d  unstable %d  missing %d'
          % (len(tests), stable, changed, unstable, missing))


if __name__ == '__main__':
    main()

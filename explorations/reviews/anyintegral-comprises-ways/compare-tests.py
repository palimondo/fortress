#!/usr/bin/env python3
"""compare-tests.py <base-dir> <variant-dir> [base2-dir]: compares two runs of tests.sh test by test.
Each log is normalised before comparing: the trailer's secs= dropped, a Java stack frame's line number
masked, an identity hash (@ and hex digits) masked, every position in a FortressLibrary or FortressBuiltin
file (the copies differ in line numbers between variants) masked, and every library copy's directory
replaced by LIB. A test is same, changed (its normalised output or exit code differs) or unstable (its
two base runs differ, when a second base run is given). Prints a summary line and every changed test's
first differing lines."""
import os
import re
import sys

def norm(path):
    try:
        s = open(path, encoding='utf-8', errors='replace').read()
    except FileNotFoundError:
        return None
    s = re.sub(r'secs=\d+', 'secs=S', s)
    s = re.sub(r'\((\w+\.java):\d+\)', r'(\1:N)', s)
    s = re.sub(r'@[0-9a-f]{4,}', '@HASH', s)
    s = re.sub(r'/[^\s:]*/lib/[A-Za-z0-9]+/', 'LIB/', s)
    s = re.sub(r'/home/user/fortress/(Library|ProjectFortress/LibraryBuiltin)/', 'LIB/', s)
    s = re.sub(r'(Fortress(Library|Builtin)\.fs[is]):\d+(:\d+)?(-\d+(:\d+)?)?', r'\1:POS', s)
    s = re.sub(r'(Fortress(Library|Builtin)\.fs[is]):\d+\.\d+', r'\1:POS', s)
    return s

a, b = sys.argv[1], sys.argv[2]
c = sys.argv[3] if len(sys.argv) > 3 else None
names = sorted(f for f in os.listdir(os.path.join(a, 'log')) if f.endswith('.txt'))
same, changed, unstable, missing = [], [], [], []
for n in names:
    x, y = norm(os.path.join(a, 'log', n)), norm(os.path.join(b, 'log', n))
    if y is None:
        missing.append(n); continue
    if c:
        z = norm(os.path.join(c, 'log', n))
        if z is not None and z != x:
            unstable.append(n); continue
    (same if x == y else changed).append(n)
print('tests %d same %d changed %d unstable %d missing %d' % (len(names), len(same), len(changed), len(unstable), len(missing)))
for n in unstable:
    print('UNSTABLE', n)
for n in changed:
    x, y = norm(os.path.join(a, 'log', n)).splitlines(), norm(os.path.join(b, 'log', n)).splitlines()
    rx = [l for l in x if l.startswith('rc=')]; ry = [l for l in y if l.startswith('rc=')]
    print('CHANGED', n, rx, ry)
    k = 0
    for i in range(max(len(x), len(y))):
        lx = x[i] if i < len(x) else '<none>'; ly = y[i] if i < len(y) else '<none>'
        if lx != ly:
            print('   base: ' + lx[:200]); print('   vari: ' + ly[:200]); k += 1
            if k >= 3:
                break

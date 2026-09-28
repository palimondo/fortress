#!/usr/bin/env python3
"""assertion-check.py BASE : for every file of ProjectFortress/tests/, compiler_tests/ and library_tests/ that the
working tree changes against BASE and that BASE has, pair the changed lines (the same line count is required) and
check that each pair differs only in whole runs of digits, each inside a string literal or after a (*) or (* comment marker
on that line. Prints one line per changed line and a summary; exit 1 if any pair fails."""
import re, subprocess, sys, difflib
BASE = sys.argv[1]
def git(*a): return subprocess.run(['git'] + list(a), capture_output=True, text=True).stdout
files = [f for f in git('diff', '--name-only', BASE, '--', 'ProjectFortress/tests', 'ProjectFortress/compiler_tests',
                        'ProjectFortress/library_tests').split() if git('cat-file', '-t', f'{BASE}:{f}').strip() == 'blob']
bad = n = 0
def protected(line):
    """positions inside a string literal or at/after a comment opener"""
    prot = set(); ins = False; i = 0
    while i < len(line):
        if not ins and line.startswith('(*', i):
            prot.update(range(i, len(line))); break
        if line[i] == '"': ins = not ins; prot.add(i)
        elif ins: prot.add(i)
        i += 1
    return prot
def pair_ok(a, b):
    ta = [(m.start(), m.group()) for m in re.finditer(r'\d+|\D+', a)]
    tb = [(m.start(), m.group()) for m in re.finditer(r'\d+|\D+', b)]
    pa = protected(a)
    ok = len(ta) == len(tb)
    if ok:
        for (ia, xa), (ib, xb) in zip(ta, tb):
            if xa == xb: continue
            if not (xa.isdigit() and xb.isdigit()): ok = False; return False
            if not all(k in pa for k in range(ia, ia + len(xa))): ok = False; return False
    return ok
if '--selftest' in sys.argv:
    cases = [('    assert(x, 25, "row 1, basic-integers.tex:684-688")', '    assert(x, 25, "row 1, basic-integers.tex:720-724")', True),
             ('    assert(x, 25, "row 1, basic-integers.tex:684-688")', '    assert(x, 26, "row 1, basic-integers.tex:720-724")', False),
             ('    assert(x, 25, "row 1, basic-integers.tex:684-688")', '    assert(x, 25, "row 1, basic-integers.tex:684 688")', False),
             ('  (*) basic-integers.tex:531, which with', '  (*) basic-integers.tex:560, which with', True),
             ('  z = 3 (* basic-integers.tex:531 *)', '  z = 4 (* basic-integers.tex:560 *)', False)]
    for a, b, want in cases:
        got = pair_ok(a, b); print(('ok   ' if got == want else 'WRONG ') + f'expected {want}, got {got}: {b.strip()}')
    sys.exit(0)
for f in files:
    old = git('show', f'{BASE}:{f}').split('\n'); new = open(f).read().split('\n')
    if len(old) != len(new):
        print(f'FAIL {f}: line count {len(old)} -> {len(new)}'); bad += 1; continue
    for ln, (a, b) in enumerate(zip(old, new), 1):
        if a == b: continue
        n += 1
        ok = pair_ok(a, b)
        if not ok: bad += 1
        print(('ok   ' if ok else 'FAIL ') + f'{f}:{ln}')
print(f'# {n} changed lines in {len(files)} files; {bad} fail' )
sys.exit(1 if bad else 0)

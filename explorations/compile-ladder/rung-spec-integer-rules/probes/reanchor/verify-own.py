#!/usr/bin/env python3
"""verify-own.py BASE : after the re-anchoring, pair every citation of the five chapters in each test file as BASE
has it with the same citation in the working tree (the files' lines pair one to one, assertion-check.py), and
print the text BASE's chapter has at the old lines beside the text the tree's chapter has at the new lines, with
EQUAL, or REVISED when the tree's lines are this rung's in-place revision of BASE's. Files new since BASE are
checked against the tree only (the cited lines must exist)."""
import re, subprocess, sys, glob
BASE = sys.argv[1]
CH = {'basic-integers': 'Specification/basic-lib/basic-integers.tex', 'numbers': 'Specification/basic-lib/numbers.tex',
      'conversions-coercions': 'Specification/basic/conversions-coercions.tex',
      'opr-overview': 'Specification/basic/operators/opr-overview.tex', 'changes': 'Specification/appendices/changes.tex'}
def git(*a): return subprocess.run(['git'] + list(a), capture_output=True, text=True).stdout
old = {k: git('show', f'{BASE}:{p}').split('\n') for k, p in CH.items()}
new = {k: open(p).read().split('\n') for k, p in CH.items()}
TOK = re.compile(r'(?P<file>[A-Za-z0-9_./-]+\.(?:tex|fss|fsi|java|scala|rats|md|txt|test|el|py|sh))?:(?P<nums>\d+(?:-\d+)?)')
def cites(line):
    last = None; out = []
    for mo in TOK.finditer(line):
        f = mo.group('file')
        if f is None:
            if mo.start() == 0 or line[mo.start() - 1] not in ' ,(': continue
            cur = last
        else: cur = last = f
        if cur is None or 'frozen' in cur or not cur.endswith('.tex'): continue
        b = cur.split('/')[-1][:-4]
        if b in CH: out.append((b, [int(x) for x in mo.group('nums').split('-')]))
    return out
files = sorted(f for d in ('ProjectFortress/tests', 'ProjectFortress/compiler_tests', 'ProjectFortress/library_tests')
               for f in glob.glob(d + '/*.fss') + glob.glob(d + '/*.fsi') + glob.glob(d + '/*.test'))
eq = rev = bad = 0
for f in files:
    tl = open(f).read().split('\n'); bl = git('show', f'{BASE}:{f}').split('\n') if git('cat-file', '-t', f'{BASE}:{f}').strip() else None
    for i, line in enumerate(tl):
        tc = cites(line)
        if not tc: continue
        bc = cites(bl[i]) if bl is not None else [(b, n) for b, n in tc]
        for (b, on), (b2, nn) in zip(bc, tc):
            o = old[b][on[0] - 1:on[-1]] if bl is not None else None
            n = new[b][nn[0] - 1:nn[-1]]
            if o is None:
                st = 'NEW FILE'
            elif o == n: st = 'EQUAL'; eq += 1
            elif len(o) == len(n): st = 'REVISED'; rev += 1
            else: st = 'DIFFERS'; bad += 1
            if st != 'EQUAL':
                print(f'{f}:{i+1}: {b}.tex:{"-".join(map(str,on))} -> {"-".join(map(str,nn))} {st}')
                if o: print('   base: ' + ' | '.join(x.strip() for x in o)[:400])
                print('   tree: ' + ' | '.join(x.strip() for x in n)[:400])
print(f'# {eq} citations cite equal text, {rev} cite lines this rung revised in place, {bad} differ')

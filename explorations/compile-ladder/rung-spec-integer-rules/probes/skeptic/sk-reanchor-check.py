#!/usr/bin/env python3
"""sk-reanchor-check.py BASE : the skeptic's own check of rung P's re-anchoring, independent of the rung's scripts.
Line map from `git diff -U0 BASE -- <chapter>` hunk headers (not difflib). For every test file of the three
directories that exists at BASE, every line is compared at BASE and in the tree: each number that changed must
sit inside a citation of one of the five chapters (by the last '<name>.tex' named before it on the line), and
its new value must equal the hunk-header map of the old one; a changed line whose non-digit text changed is
reported. Then every citation of the five chapters in the tree's three directories is checked to point at a
line that existed at BASE (not at a line the rung added), unless the citing line is new."""
import re, subprocess, sys, glob, os
BASE = sys.argv[1]
CH = {'basic-integers.tex': 'Specification/basic-lib/basic-integers.tex',
      'numbers.tex': 'Specification/basic-lib/numbers.tex',
      'conversions-coercions.tex': 'Specification/basic/conversions-coercions.tex',
      'opr-overview.tex': 'Specification/basic/operators/opr-overview.tex',
      'changes.tex': 'Specification/appendices/changes.tex'}
def git(*a): return subprocess.run(['git'] + list(a), capture_output=True, text=True).stdout
def hunkmap(path):
    hunks = []
    for l in git('diff', '-U0', BASE, '--', path).split('\n'):
        m = re.match(r'@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@', l)
        if m:
            a, b, c, d = int(m.group(1)), int(m.group(2) or 1), int(m.group(3)), int(m.group(4) or 1)
            hunks.append((a, b, c, d))
    def f(x):
        off = 0
        for a, b, c, d in hunks:
            s = a if b > 0 else a + 1   # first old line of the hunk (for b==0 the insertion is after a)
            if b == 0:
                if x > a: off = c + d - 1 - a if d else off
                continue
            if x < a: break
            if a <= x < a + b:
                return ('changed', c + (x - a) if b == d else None)
            off = (c + d) - (a + b)
        return ('same', x + off)
    added = set()
    for a, b, c, d in hunks:
        for y in range(c, c + d): added.add(y)
    return f, added
maps = {k: hunkmap(v) for k, v in CH.items()}
NUM = re.compile(r'\d+')
NAME = re.compile(r'([A-Za-z0-9_-]+\.(?:tex|fss|fsi|java|scala|md|txt|test|py|sh))')
bad = ok = 0; revised_pos = 0
files = sorted(f for d in ('ProjectFortress/tests', 'ProjectFortress/compiler_tests', 'ProjectFortress/library_tests')
               for f in glob.glob(d + '/*') if os.path.isfile(f))
for f in files:
    old = git('show', f'{BASE}:{f}')
    if not old: continue
    new = open(f, encoding='utf-8', errors='replace').read()
    if old == new: continue
    ol, nl = old.split('\n'), new.split('\n')
    if len(ol) != len(nl):
        print(f'LINECOUNT {f} {len(ol)} -> {len(nl)}'); bad += 1; continue
    for i, (a, b) in enumerate(zip(ol, nl), 1):
        if a == b: continue
        if NUM.sub('#', a) != NUM.sub('#', b):
            print(f'NONDIGIT {f}:{i}\n  base: {a.strip()}\n  tree: {b.strip()}'); bad += 1; continue
        na, nb = list(NUM.finditer(a)), list(NUM.finditer(b))
        for ma, mb in zip(na, nb):
            if ma.group() == mb.group(): continue
            names = [m.group(1) for m in NAME.finditer(a[:ma.start()])]
            last = names[-1] if names else None
            if last not in CH or 'frozen' in a[:ma.start()].split(last)[-2][-40:]:
                print(f'NOTCHAPTER {f}:{i} number {ma.group()}->{mb.group()} last name {last}'); bad += 1; continue
            fmap, added = maps[last]
            kind, val = fmap(int(ma.group()))
            if val != int(mb.group()):
                print(f'MISMAP {f}:{i} {last}:{ma.group()} -> {mb.group()}, hunk map says {kind} {val}'); bad += 1
            else:
                ok += 1
                if kind == 'changed': revised_pos += 1
print(f'# {ok} changed numbers map by the hunk-header map ({revised_pos} of them by position inside a same-size changed hunk); {bad} problems')
# second pass: tree citations pointing into added lines
CIT = re.compile(r'((?:[A-Za-z0-9_./-]+/)?([a-z-]+\.tex)):(\d+)(?:-(\d+))?')
into = 0
for f in files:
    new = open(f, encoding='utf-8', errors='replace').read().split('\n')
    old = git('show', f'{BASE}:{f}').split('\n')
    for i, l in enumerate(new, 1):
        for m in CIT.finditer(l):
            if 'frozen' in m.group(1) or m.group(2) not in CH: continue
            fmap, added = maps[m.group(2)]
            lo = int(m.group(3)); hi = int(m.group(4) or lo)
            hits = [y for y in range(lo, hi + 1) if y in added]
            if hits:
                newline = (i > len(old)) or (old[i-1] != l)
                print(f'INTO-ADDED {f}:{i} {m.group(0)} touches rung-added/changed lines {hits[0]}..{hits[-1]}' + ('' if newline else ' (citing line unchanged)'))
                into += 1
print(f'# {into} tree citations touch lines the rung added or changed')
# third pass: misses. Every citation of the five chapters in each BASE test file (a '<chapter>.tex:N[-M]' or a bare
# ':N[-M]' continuing it after ' ', ',' or '('), mapped by the hunk-header map; the tree's line must carry the mapped numbers.
TOK = re.compile(r'([A-Za-z0-9_./-]+\.(?:tex|fss|fsi|java|scala|md|txt|test|py|sh))?:(\d+)(?:-(\d+))?')
miss = seen = 0
for f in files:
    old = git('show', f'{BASE}:{f}')
    if not old: continue
    ol = old.split('\n'); nl = open(f, encoding='utf-8', errors='replace').read().split('\n')
    for i, a in enumerate(ol, 1):
        last = None; want = []
        for m in TOK.finditer(a):
            if m.group(1):
                last = m.group(1)
            else:
                if m.start() == 0 or a[m.start() - 1] not in ' ,(': continue
            if not last or 'frozen' in last: continue
            short = last.split('/')[-1]
            if short not in CH: continue
            fmap, added = maps[short]
            nums = [int(m.group(2))] + ([int(m.group(3))] if m.group(3) else [])
            mapped = [fmap(x)[1] for x in nums]
            want.append((m.group(0), '-'.join(str(x) for x in mapped)))
            seen += 1
        for orig, mp in want:
            if (':' + mp) not in nl[i - 1] and not nl[i-1].endswith(mp):
                print(f'MISS {f}:{i} {orig} should map to :{mp}; tree line: {nl[i-1].strip()[:160]}'); miss += 1
print(f'# {seen} citations of the five chapters at BASE in the three directories; {miss} not found re-anchored in the tree')

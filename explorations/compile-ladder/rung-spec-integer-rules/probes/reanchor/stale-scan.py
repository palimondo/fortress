#!/usr/bin/env python3
"""stale-scan.py BASE : for every citation '<dir>/<chapter>.tex:N[-M]' (with its ', :K' continuations) of a chapter
under Specification/ in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/,
find the commit that introduced that citation into the file (the oldest commit whose diff adds or removes the
string '<chapter>.tex:<first number>', git log -S --reverse up to BASE), take the chapter as it stood at that
commit, map the cited lines through difflib's equal blocks to BASE's chapter, and print every citation
whose lines BASE numbers differently, i.e. a citation some later edit of the chapter moved and nobody re-anchored.
A chapter name that matches several files under Specification/ is resolved by the directory written before it,
else reported as ambiguous. Read-only."""
import difflib, re, subprocess, sys, glob, os
BASE = sys.argv[1]
def git(*a): return subprocess.run(['git'] + list(a), capture_output=True, text=True).stdout
chapters = {}
for p in git('ls-tree', '-r', '--name-only', BASE, 'Specification').split('\n'):
    if p.endswith('.tex') and '/library/apis/' not in p:
        chapters.setdefault(os.path.basename(p)[:-4], []).append(p)
CIT = re.compile(r'(?P<pre>[A-Za-z0-9_./-]*?)(?P<ch>[A-Za-z0-9_-]+)\.tex:(?P<rest>\d+(?:-\d+)?(?:, ?:\d+(?:-\d+)?)*)')
cache = {}
def text(rev, path):
    k = (rev, path)
    if k not in cache: cache[k] = git('show', f'{rev}:{path}').split('\n')
    return cache[k]
def emap(rev, path):
    k = ('map', rev, path)
    if k not in cache:
        old, new = text(rev, path), text(BASE, path); m = {}
        for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, old, new, autojunk=False).get_opcodes():
            if tag == 'equal':
                for d in range(i2 - i1): m[i1 + d + 1] = j1 + d + 1
        cache[k] = m
    return cache[k]
files = sorted(f for d in ('ProjectFortress/tests', 'ProjectFortress/compiler_tests', 'ProjectFortress/library_tests')
               for f in glob.glob(d + '/*.fss') + glob.glob(d + '/*.fsi'))
n = stale = 0
for f in files:
    lines = text(BASE, f)
    for ln, line in enumerate(lines, 1):
        for mo in CIT.finditer(line):
            cands = chapters.get(mo.group('ch'), [])
            pre = mo.group('pre')
            if len(cands) > 1: cands = [c for c in cands if pre and c.endswith(pre.split('Specification/')[-1] + mo.group('ch') + '.tex')] or cands
            if len(cands) != 1: continue
            path = cands[0]; n += 1
            first = mo.group('rest').split(',')[0]
            rev = git('log', '--format=%H', '--reverse', '-S', mo.group('ch') + '.tex:' + first, BASE, '--', f).split('\n')[0]
            if git('rev-parse', f'{rev}:{path}') == git('rev-parse', f'{BASE}:{path}'): continue
            m = emap(rev, path)
            for tok in re.split(r', ?:', mo.group('rest')):
                a = [int(x) for x in tok.split('-')]
                new = [m.get(x) for x in a]
                if new != a:
                    stale += 1
                    print(f'{f}:{ln}: {path}:{tok} written at {rev[:9]}; at {BASE[:9]} those lines are '
                          + ('-'.join(str(x) for x in new) if None not in new else 'inside a changed block'))
print(f'# {n} citations of Specification chapters scanned; {stale} moved since the commit that wrote them')

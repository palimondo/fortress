#!/usr/bin/env python3
"""reanchor-own.py BASE [--apply] : re-anchor the citations of lines of the chapters rung P of climb batch 6.5
edits, in the messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/, by the map of
unchanged lines from `git show BASE:<chapter>` to the working tree (difflib's equal blocks), as batch 6's repair
re-anchored 177 (compile-ladder/climb-batch-6/JUDGE-review.md, finding 1). The stale scan on BASE finds no citation
of these chapters written against older text (stale-scan-base.txt), so BASE's text is the text each was written
against. A citation is '<chapter>.tex:N' or ':N-M'; a bare ':N' or ':N-M' preceded by white space, a comma or an
opening parenthesis is a continuation of the last file named before it on the line (any file name, so that a
continuation of another chapter or of a source file is left alone). A citation of the frozen copy
(Specification-1.0-frozen/) is left alone. Each citation is printed with its old and new numbers and whether the
text at the new lines equals the text at the old ones; a cited range whose inside differs (a revised passage) is
reported as such; a line this rung replaced by one line in place (a replaced block of equal size) is mapped by
position and reported as revised; an end inside any other changed block is reported UNMAPPED and left. Only the
digits change."""
import difflib, re, subprocess, sys, glob
BASE = sys.argv[1]; APPLY = '--apply' in sys.argv
CHAPTERS = {'basic-integers': 'Specification/basic-lib/basic-integers.tex',
            'numbers': 'Specification/basic-lib/numbers.tex',
            'conversions-coercions': 'Specification/basic/conversions-coercions.tex',
            'opr-overview': 'Specification/basic/operators/opr-overview.tex',
            'changes': 'Specification/appendices/changes.tex'}
def git(*a): return subprocess.run(['git'] + list(a), capture_output=True, text=True).stdout
maps = {}; revisedlines = set()
for short, path in CHAPTERS.items():
    old = git('show', f'{BASE}:{path}').split('\n'); new = open(path).read().split('\n'); m = {}
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, old, new, autojunk=False).get_opcodes():
        if tag == 'equal':
            for d in range(i2 - i1): m[i1 + d + 1] = j1 + d + 1
        elif tag == 'replace' and i2 - i1 == j2 - j1:
            for d in range(i2 - i1): m[i1 + d + 1] = j1 + d + 1; revisedlines.add((short, i1 + d + 1))
    maps[short] = (m, old, new)
TOK = re.compile(r'(?P<file>[A-Za-z0-9_./-]+\.(?:tex|fss|fsi|java|scala|rats|md|txt|test|el|py|sh))?'
                 r'(?P<colon>:)(?P<nums>\d+(?:-\d+)?)')
files = sorted(f for d in ('ProjectFortress/tests', 'ProjectFortress/compiler_tests', 'ProjectFortress/library_tests')
               for f in glob.glob(d + '/*.fss') + glob.glob(d + '/*.fsi') + glob.glob(d + '/*.test'))
n = moved = revised = unmapped = 0
for f in files:
    lines = open(f).read().split('\n'); out = []
    for ln, line in enumerate(lines, 1):
        last = None; pieces = []; pos = 0
        for mo in TOK.finditer(line):
            fname = mo.group('file')
            if fname is None:
                before = line[mo.start() - 1] if mo.start() > 0 else ''
                if before not in ' ,(': continue
                cur = last
            else:
                cur = fname; last = fname
            if cur is None or 'Specification-1.0-frozen' in cur: continue
            base = cur.split('/')[-1][:-4] if cur.endswith('.tex') else None
            if base not in CHAPTERS: continue
            if '/' in cur and not CHAPTERS[base].endswith(cur.split('Specification/')[-1]): continue
            m, old, new = maps[base]
            nums = [int(x) for x in mo.group('nums').split('-')]
            mapped = [m.get(x) for x in nums]
            n += 1
            if None in mapped:
                unmapped += 1
                print(f'  UNMAPPED {f}:{ln} {base}.tex:{mo.group("nums")} (an end inside a changed block)'); continue
            a, b = nums[0], nums[-1]; c, d = mapped[0], mapped[-1]
            same = old[a - 1:b] == new[c - 1:d]
            res = '-'.join(str(x) for x in mapped)
            if res != mo.group('nums'): moved += 1
            if not same: revised += 1
            pos = any((base, x) in revisedlines for x in range(a, b + 1))
            print(f'{f}:{ln}: {base}.tex:{mo.group("nums")} -> {res}  '
                  + ('text equal' if same else ('cites a line this rung revised in place, mapped by position'
                                                if pos else 'RANGE SPANS REVISED TEXT')))
            pieces.append((mo.start('nums'), mo.end('nums'), res))
        if pieces:
            s = line
            for st, en, res in reversed(pieces): s = s[:st] + res + s[en:]
            out.append(s)
        else:
            out.append(line)
    if APPLY and out != lines:
        open(f, 'w').write('\n'.join(out))
print(f'# {n} citations of the five chapters in the three test directories; {moved} moved; '
      f'{revised} span revised text; {unmapped} unmapped' + (' (applied)' if APPLY else ' (dry run)'))

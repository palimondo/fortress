#!/usr/bin/env python3
"""reanchor.py BASE [--apply] (rung U's script, climb batch 7R, with this rung's four chapters and no skipped file) : re-anchor the citations of lines of the chapters this rung edits,
in the assert messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/,
by the map of unchanged lines from `git show BASE:<chapter>` to the working tree (difflib's equal
blocks). A citation is
'<chapter>.tex:N', ':N-M' or 'N,' and every following ', :K' continuation that belongs to it.
Each cited line is mapped; a line inside a changed block is reported and left. Prints one line per
citation: file:line, old -> new, and whether the text at the new line equals the text at the old."""
import difflib, re, subprocess, sys, glob, os
BASE = sys.argv[1]; APPLY = '--apply' in sys.argv
CHAPTERS = {'ranges': 'Specification/basic/expressions/ranges.tex',
            'basic-integers': 'Specification/basic-lib/basic-integers.tex',
            'inference': 'Specification/basic/inference.tex',
            'changes': 'Specification/appendices/changes.tex'}
SKIP = set()
maps, old_text, new_text = {}, {}, {}
for short, path in CHAPTERS.items():
    old = subprocess.run(['git', 'show', f'{BASE}:{path}'], capture_output=True, text=True).stdout.split('\n')
    new = open(path).read().split('\n')
    m = {}
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, old, new, autojunk=False).get_opcodes():
        if tag == 'equal':
            for k in range(i2 - i1): m[i1 + k + 1] = j1 + k + 1
    maps[short], old_text[short], new_text[short] = m, old, new
CIT = re.compile(r'(?P<ch>ranges|basic-integers|inference|changes)\.tex:(?P<rest>\d+(?:-\d+)?(?:, ?:?\d+(?:-\d+)?)*)')
def mapnum(ch, n, where):
    if n not in maps[ch]:
        print(f'  UNMAPPED {where} {ch}:{n} (inside a changed block)'); return None
    return maps[ch][n]
files = [f for d in ('ProjectFortress/tests', 'ProjectFortress/compiler_tests', 'ProjectFortress/library_tests')
         for f in sorted(glob.glob(d + '/*.fss'))]
changed = 0
for f in files:
    if f in SKIP: continue
    src = open(f).read(); lines = src.split('\n'); out = []
    for ln, line in enumerate(lines, 1):
        def repl(mo):
            global changed
            ch = mo.group('ch'); rest = mo.group('rest')
            def one(tok):
                a = tok.split('-'); nums = [int(x) for x in a]
                new = [mapnum(ch, x, f'{f}:{ln}') for x in nums]
                if None in new: return tok
                ok = all(old_text[ch][x - 1] == new_text[ch][y - 1] for x, y in zip(range(nums[0], nums[-1] + 1),
                         range(new[0], new[0] + nums[-1] - nums[0] + 1)))
                res = '-'.join(str(x) for x in new)
                print(f'{f}:{ln}: {ch}:{tok} -> {ch}:{res}  text {"equal" if ok else "DIFFERS"}')
                return res
            parts = re.split(r'(, ?:?)', rest)
            newrest = ''.join(p if i % 2 else one(p) for i, p in enumerate(parts))
            if newrest != rest: changed += 1
            return f'{ch}.tex:{newrest}'
        out.append(CIT.sub(repl, line))
    if APPLY and out != lines:
        open(f, 'w').write('\n'.join(out))
print(f'# {changed} citation groups changed' + (' (applied)' if APPLY else ' (dry run)'))

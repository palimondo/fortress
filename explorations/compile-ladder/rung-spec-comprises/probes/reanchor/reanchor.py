#!/usr/bin/env python3
"""reanchor.py BASE [--apply] : re-anchor the citations of lines of the chapters this rung edits,
in the assert messages and comments of ProjectFortress/tests/, compiler_tests/ and library_tests/.
Rung X of climb batch 7C; rung U's script (rung-spec-ranges/probes/reanchor/reanchor.py) with its chapters
and skip list replaced and one change: each citation is mapped from the chapter as it stood at the commit
that wrote the citation (the oldest commit up to BASE whose diff adds the string '<chapter>.tex:<first
number>' to that file, git log -S --reverse), not from BASE, through difflib's equal blocks, to the
working tree. For a citation written against BASE's text the two are the same; for one written before a
later edit of the chapter moved its lines, BASE's numbers point at other text, and mapping from BASE would
carry the error along. A citation is '<chapter>.tex:N', ':N-M' or 'N,' and every following ', :K'
continuation that belongs to it. A line inside a changed block is reported and left. Prints one line per
citation: file:line, the commit that wrote it, old -> new, and whether the text at the new line equals the
text the citation was written against."""
import difflib, re, subprocess, sys, glob
BASE = sys.argv[1]; APPLY = '--apply' in sys.argv
CHAPTERS = {'traits': 'Specification/basic/traits.tex',
            'changes': 'Specification/appendices/changes.tex'}
def git(*a): return subprocess.run(['git'] + list(a), capture_output=True, text=True).stdout
cache = {}
def chapter_at(rev, short):
    k = (rev, short)
    if k not in cache:
        old = git('show', f'{rev}:{CHAPTERS[short]}').split('\n')
        new = open(CHAPTERS[short]).read().split('\n')
        m = {}
        for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, old, new, autojunk=False).get_opcodes():
            if tag == 'equal':
                for d in range(i2 - i1): m[i1 + d + 1] = j1 + d + 1
        cache[k] = (m, old, new)
    return cache[k]
CIT = re.compile(r'(?P<ch>traits|changes)\.tex:(?P<rest>\d+(?:-\d+)?(?:, ?:?\d+(?:-\d+)?)*)')
files = [f for d in ('ProjectFortress/tests', 'ProjectFortress/compiler_tests', 'ProjectFortress/library_tests')
         for f in sorted(glob.glob(d + '/*.fss'))]
changed = 0
for f in files:
    src = open(f).read(); lines = src.split('\n'); out = []
    for ln, line in enumerate(lines, 1):
        def repl(mo):
            global changed
            ch = mo.group('ch'); rest = mo.group('rest')
            first = re.split(r'[-,]', rest)[0]
            rev = git('log', '--format=%h', '--reverse', '-S', f'{ch}.tex:{first}', BASE, '--', f).split('\n')[0] or BASE
            m, old, new = chapter_at(rev, ch)
            def one(tok):
                nums = [int(x) for x in tok.split('-')]
                mapped = [m.get(x) for x in nums]
                if None in mapped:
                    print(f'  UNMAPPED {f}:{ln} {ch}:{tok} written at {rev} (inside a changed block)'); return tok
                ok = all(old[x - 1] == new[y - 1] for x, y in zip(range(nums[0], nums[-1] + 1),
                         range(mapped[0], mapped[0] + nums[-1] - nums[0] + 1)))
                res = '-'.join(str(x) for x in mapped)
                print(f'{f}:{ln}: written at {rev}: {ch}:{tok} -> {ch}:{res}  text {"equal" if ok else "DIFFERS"}')
                return res
            parts = re.split(r'(, ?:?)', rest)
            newrest = ''.join(p if i % 2 else one(p) for i, p in enumerate(parts))
            if newrest != rest: changed += 1
            return f'{ch}.tex:{newrest}'
        out.append(CIT.sub(repl, line))
    if APPLY and out != lines:
        open(f, 'w').write('\n'.join(out))
print(f'# {changed} citation groups changed' + (' (applied)' if APPLY else ' (dry run)'))

#!/usr/bin/env python3
"""remap-fsi.py <base.fsi> <edited.fsi> <errs.txt>: stage-errors.py's list with every FortressLibrary.fsi line
mapped back to the base file through the edit's line map (difflib); a line the edit inserted or rewrote
prints as EDITED<n>, so that an error at a changed declaration never compares equal to a base one."""
import difflib, re, sys
A = open(sys.argv[1], encoding='utf-8').read().split('\n'); B = open(sys.argv[2], encoding='utf-8').read().split('\n')
M = {}
for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, A, B, autojunk=False).get_opcodes():
    for k in range(j2 - j1):
        M[j1 + k + 1] = str(i1 + k + 1) if tag == 'equal' else 'EDITED%d' % (j1 + k + 1)
for l in sorted(re.sub(r'FortressLibrary\.fsi:(\d+)', lambda m: 'FortressLibrary.fsi:' + M.get(int(m.group(1)), '?'), x)
                for x in open(sys.argv[3], encoding='utf-8').read().split('\n') if x):
    print(l)

#!/usr/bin/env python3
"""offsets.py BASE : for each chapter this rung edits, the base's line ranges and where the tree has them
(difflib's equal blocks, the map reanchor-own.py applies), and the base's lines the tree replaced or deleted."""
import difflib, subprocess, sys
BASE = sys.argv[1]
for path in ('Specification/basic-lib/basic-integers.tex', 'Specification/basic-lib/numbers.tex',
             'Specification/basic/conversions-coercions.tex', 'Specification/basic/operators/opr-overview.tex',
             'Specification/appendices/changes.tex'):
    old = subprocess.run(['git', 'show', f'{BASE}:{path}'], capture_output=True, text=True).stdout.split('\n')
    new = open(path).read().split('\n')
    print(f'== {path}')
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, old, new, autojunk=False).get_opcodes():
        if tag == 'equal':
            print(f'  base {i1+1}-{i2} -> tree {j1+1}-{j2}  ({j1-i1:+d})')
        elif tag == 'insert':
            print(f'  inserted: tree {j1+1}-{j2}')
        else:
            print(f'  {tag}: base {i1+1}-{i2} -> tree {j1+1}-{j2}')

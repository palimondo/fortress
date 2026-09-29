#!/usr/bin/env python3
"""local-fix-503.py: the deliberate local fix of row 503's six tuple shifts, for showing
ProjectFortress/tests/XXXRangeTupleShiftWalk.fss red only; each site's whole-tuple amount replaced by its own
component, as each body's other components are written. Applied, then reverted with --revert by the rung (git diff on
Library/RangeInternals.fss shows only the rung's own edit afterwards); the six bodies are not the rung's."""
import os, sys
rev = sys.argv[1:] == ['--revert']
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../..'))
p = 'Library/RangeInternals.fss'
s = open(p).read()
for old, new in [
    ('LeftRange3D(l_i-shift_i, l_j-shift_j, l_k-amount, str_i, str_j, str_k)', 'LeftRange3D(l_i-shift_i, l_j-shift_j, l_k-shift_k, str_i, str_j, str_k)'),
    ('LeftRange3D(l_i+shift_i, l_j+shift_j, l_k+amount, str_i, str_j, str_k)', 'LeftRange3D(l_i+shift_i, l_j+shift_j, l_k+shift_k, str_i, str_j, str_k)'),
    ('RightRange3D(r_i-shift_i, r_j-shift_j, r_k-amount, str_i, str_j, str_k)', 'RightRange3D(r_i-shift_i, r_j-shift_j, r_k-shift_k, str_i, str_j, str_k)'),
    ('RightRange3D(r_i+shift_i, r_j+shift_j, r_k+amount, str_i, str_j, str_k)', 'RightRange3D(r_i+shift_i, r_j+shift_j, r_k+shift_k, str_i, str_j, str_k)'),
    ('StridedFullRange2D(l_i-shift_i, l_j-shift_j, r_i-amount, r_j-amount, str_i, str_j)', 'StridedFullRange2D(l_i-shift_i, l_j-shift_j, r_i-shift_i, r_j-shift_j, str_i, str_j)'),
    ('StridedFullRange2D(l_i+shift_i, l_j+shift_j, r_i+amount, r_j+amount, str_i, str_j)', 'StridedFullRange2D(l_i+shift_i, l_j+shift_j, r_i+shift_i, r_j+shift_j, str_i, str_j)'),
]:
    if rev:
        old, new = new, old
    assert s.count(old) == 1, old
    s = s.replace(old, new)
open(p, 'w').write(s)
print('reverted' if rev else 'applied', 'the local fix of row 503')

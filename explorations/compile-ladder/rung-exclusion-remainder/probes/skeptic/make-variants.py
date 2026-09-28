#!/usr/bin/env python3
"""make-variants.py <out-root>: the skeptic's library copies for rung H, each from the worktree's
Library/FortressLibrary.{fsi,fss}, every substitution matching exactly once.
  way2008        Integral[\\I\\] also 'comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }' (the team's 2008 clause, FACTS.md,
                 "The tower closure of 02d09a39f has no spelling the compiler's checker accepts")
  cleared        Integral[\\I\\] without AnyIntegral (the keep-the-rule sketch's shape), to clear the api's hierarchy pass
  minmax         TotalComparison extends { Comparison, StandardMinMax[\\TotalComparison\\] }
  minmax-cleared both of the last two"""
import os, sys
root = sys.argv[1]
here = os.path.dirname(os.path.abspath(__file__))
home = os.path.abspath(os.path.join(here, '../../../../..'))
INTEGRAL = 'trait Integral[\\I extends Integral[\\I\\]\\] extends { StandardTotalOrder[\\I\\], MultiplicativeRing[\\I\\], AnyIntegral }'
TC = 'trait TotalComparison\n        extends { Comparison }\n'
def sub(s, old, new):
    assert s.count(old) == 1, old
    return s.replace(old, new)
def mk(name, way2008=False, sketch=False, minmax=False):
    d = os.path.join(root, name); os.makedirs(d, exist_ok=True)
    for ext in ('fsi', 'fss'):
        s = open(os.path.join(home, 'Library', 'FortressLibrary.' + ext)).read()
        if way2008: s = sub(s, INTEGRAL, INTEGRAL + '\n        comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }')
        if sketch: s = sub(s, INTEGRAL, INTEGRAL.replace(', AnyIntegral }', ' }'))
        if minmax: s = sub(s, TC, 'trait TotalComparison\n        extends { Comparison, StandardMinMax[\\TotalComparison\\] }\n')
        open(os.path.join(d, 'FortressLibrary.' + ext), 'w').write(s)
mk('way2008', way2008=True); mk('cleared', sketch=True); mk('minmax', minmax=True); mk('minmax-cleared', sketch=True, minmax=True)

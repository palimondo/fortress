#!/usr/bin/env python3
"""cond-param.py <dir>: one way to repair the two declarations probe P1 found refused by the
return-type rule over every instance: NoReductionPair's and SomeReductionPair's cond declare their
function parameter at the trait's own element type, SomeReductionPair[\\R\\] -> G, as Condition's
cond[\\G\\](t: E -> G, e: () -> G) declares it for E = SomeReductionPair[\\R\\], where they now widen it
to PossibleReductionPair[\\R\\] -> G.  In place, in FortressLibrary.fsi and .fss of <dir>, each
occurrence as counted (two in each file)."""
import os
import sys

D = sys.argv[1]
OLD = "cond[\\G\\](t:PossibleReductionPair[\\R\\]->G, e:()->G): G"
NEW = "cond[\\G\\](t:SomeReductionPair[\\R\\]->G, e:()->G): G"
for f in ("FortressLibrary.fsi", "FortressLibrary.fss"):
    p = os.path.join(D, f)
    s = open(p, encoding="utf-8").read()
    assert s.count(OLD) == 2, (f, s.count(OLD))
    open(p, "w", encoding="utf-8").write(s.replace(OLD, NEW))
print("cond's parameter at SomeReductionPair[\\R\\] ->", D)

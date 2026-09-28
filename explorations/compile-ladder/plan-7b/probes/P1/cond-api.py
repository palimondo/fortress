#!/usr/bin/env python3
"""cond-api.py <dir>: the second way to repair the two declarations probe P1 found refused by the
return-type rule over every instance, in place in FortressLibrary.fsi of <dir>.  The api declares
PossibleReductionPair[\\R\\] extends Condition[\\SomeReductionPair[\\R\\]\\] (Library/FortressLibrary.fsi:1815),
the component extends Condition[\\PossibleReductionPair[\\R\\]\\] (Library/FortressLibrary.fss:2998); under
the component's parent the two cond declarations' PossibleReductionPair[\\R\\] -> G is exactly
Condition's E -> G.  The api is made to say what the component says (one line).  The first way,
cond-param.py, narrows the parameter in both files and breaks the component (P1.md, section 4)."""
import os
import sys

p = os.path.join(sys.argv[1], "FortressLibrary.fsi")
s = open(p, encoding="utf-8").read()
old = "trait PossibleReductionPair[\\R\\] extends Condition[\\SomeReductionPair[\\R\\]\\]\n"
new = "trait PossibleReductionPair[\\R\\] extends Condition[\\PossibleReductionPair[\\R\\]\\]\n"
assert s.count(old) == 1, s.count(old)
open(p, "w", encoding="utf-8").write(s.replace(old, new))
print("PossibleReductionPair's api parent as the component's ->", p)

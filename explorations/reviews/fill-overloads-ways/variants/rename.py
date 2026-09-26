# Variant: diamond declarations + the value form of fill and of the array1/array2
# factories under a second name. The name "fillValue" is a placeholder for the probe,
# not a proposal.
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from edits import *
s = meet(load())
for v in VALUE_FILLS:
    s = replace_once(s, v, v.replace("fill(v:", "fillValue(v:"))
s = replace_once(s, SIAT_VALUE, "    fill(f:I->E):T\n    fillValue(v:E):T\n    abstract copy():T\n")
s = replace_once(s, "    fill(v:E):T\nend", "    fillValue(v:E):T\nend")                       # the one meet() added to SMAT
s = replace_once(s, "    fill(v:T):ImmutableArray1[\\T,b0,s0\\]\n", "    fillValue(v:T):ImmutableArray1[\\T,b0,s0\\]\n")
for f in FACTORIES_V:
    s = replace_once(s, f, f.replace("array1[", "array1Value[", 1).replace("array2[", "array2Value[", 1))
save(s)

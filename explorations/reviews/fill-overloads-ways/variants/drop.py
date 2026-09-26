# Variant: diamond declarations + only the function form of fill; the value form of
# fill and of the array1/array2 factories removed.
import os, sys
sys.path.insert(0, os.path.dirname(__file__))
from edits import *
s = meet(load())
for v in VALUE_FILLS:
    s = replace_once(s, v, "")
s = replace_once(s, SIAT_VALUE, "    fill(f:I->E):T\n    abstract copy():T\n")
s = replace_once(s, "    fill(v:E):T\nend", "end")
s = replace_once(s, "    fill(v:T):ImmutableArray1[\\T,b0,s0\\]\n", "")
for f in FACTORIES_V:
    s = replace_once(s, f, "")
save(s)

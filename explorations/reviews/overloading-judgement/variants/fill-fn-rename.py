# Variant: the diamond declarations (the fill worker's way 0, its meet()) plus the
# FUNCTION form of fill and of the array1/array2 factories under a second name, the
# way the clean list did not measure (its 3a renamed the value form). The name
# "fillFn" is a placeholder for the measurement, not a proposal.
import os, sys
sys.path.insert(0, os.path.join(os.environ["FORTRESS_HOME"], "explorations", "reviews", "fill-overloads-ways", "variants"))
from edits import *

s = meet(load())
FN_FILLS = [
    "    abstract fill(f:I->E):ReadableArray[\\E,I\\]\n",
    "    abstract fill(f:I->E):ImmutableArray[\\E,I\\]\n",
    "    abstract fill(f:I->E):Array[\\E,I\\]\n",
]
for v in FN_FILLS:
    s = replace_once(s, v, v.replace("fill(f:", "fillFn(f:"))
s = replace_once(s, SIAT_VALUE, "    fillFn(f:I->E):T\n    fill(v:E):T\n    abstract copy():T\n")
s = replace_once(s, "    fill(f:I->E):T\n    fill(v:E):T\nend", "    fillFn(f:I->E):T\n    fill(v:E):T\nend")   # the one meet() added to SMAT
s = replace_once(s, "    fill(f:ZZ32->T):ImmutableArray1[\\T,b0,s0\\]\n", "    fillFn(f:ZZ32->T):ImmutableArray1[\\T,b0,s0\\]\n")
FACTORIES_F = [
    "array1[\\T, nat s0\\](f:ZZ32->T):Array1[\\T,0,s0\\]\n",
    "array2[\\T, nat s0, nat s1\\](f:(ZZ32,ZZ32)->T):Array2[\\T,0,s0,0,s1\\]\n",
]
for f in FACTORIES_F:
    s = replace_once(s, f, f.replace("array1[", "array1Fn[", 1).replace("array2[", "array2Fn[", 1))
save(s)

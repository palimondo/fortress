# Variant "maxn": today's nested tower with the SUM/PROD replacement of answer 7
# (../sum-replacement-judgement/variants/sumlib.py, bound T extends Number, which on today's
# tower is the bound its walk probe used) and the "keep them" shape of BIG MAXN, BIG MINN
# and BIG MINMAXN (maxnlib.py, the same bound): one generic reduction per operator, the
# least or greatest element of T from the static argument.  For the interpreter probe
# MaxNWalk.  (The keep note's FLAT copy does not run on walk: FlatMaxWalk.flat.walk.txt.)
import os, sys
here = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, here)
sys.path.insert(0, os.path.join(here, "..", "..", "sum-replacement-judgement", "variants"))
import sumlib, maxnlib
sumlib.apply(sys.argv[1], "Number", "Number")
maxnlib.apply(sys.argv[1], "Number")

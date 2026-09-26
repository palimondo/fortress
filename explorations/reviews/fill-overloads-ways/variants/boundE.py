# Variant: the library's own way for Vector and Matrix (T extends Number), applied to
# the whole array family: the element parameter of every array trait, array object
# and array factory is written "extends Object", so that it excludes every arrow type
# (TypeAnalyzer.scala:480-482). Plus the diamond declarations of meet.py. The global
# implicit-Object switch stays off, so every other parameter keeps the bound Any.
import os, re, sys
sys.path.insert(0, os.path.dirname(__file__))
from edits import *
s = meet(load())
lines = s.split("\n")
out = []
for l in lines:
    if re.match(r"^(trait (ReadableArray|ImmutableArray|Array)\[\\E,I\\\]"
                r"|(array|immutableArray|primitiveArray|primitiveImmutableArray)\[\\E\\\])", l):
        l = l.replace("[\\E", "[\\E extends Object", 1)
    elif re.match(r"^trait Standard(Immutable|Mutable)ArrayType\[", l):
        l = l.replace(",E,I\\]\n", ",E,I\\]").replace("\\],E,I\\]", "\\],E extends Object,I\\]", 1)
    elif re.match(r"^(trait (ReadableArray1|ImmutableArray1|Array1|Array2|Array3)"
                  r"|__builtinFactory[123]|__immutableFactory1|array[123]|immutableArray1)\[\\T", l):
        l = l.replace("[\\T", "[\\T extends Object", 1)
    out.append(l)
save("\n".join(out))
p = os.path.join(ROOT, "LibraryBuiltin", "NativeArray.fsi")
n = open(p, encoding="utf-8").read()
n = n.replace("PrimitiveArray[\\T, nat s0\\]", "PrimitiveArray[\\T extends Object, nat s0\\]")
n = n.replace("PrimImmutableArray[\\T, nat s0\\]", "PrimImmutableArray[\\T extends Object, nat s0\\]")
open(p, "w", encoding="utf-8").write(n)

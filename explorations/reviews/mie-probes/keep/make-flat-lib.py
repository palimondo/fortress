#!/usr/bin/env python3
"""Library copies for price-keep-the-rule.md, item 5.  usage: make-flat-lib.py <dir>
(run from $FORTRESS_HOME; the tracked files are only read)

L0    the tree's FortressLibrary.{fsi,fss} and FortressBuiltin.{fsi,fss}, unchanged (the control)
FLAT  flat-tower-sketch.fsi's 14 headers applied (the 10 objects that only inherit an
      instantiation, and Maybe, are untouched): the numeric tower as siblings
      under a Number without algebra, widening declared by coerce, TotalComparison and
      AnyMaybe without their second Equality, the reductions without DistributesOver.
FLATN FLAT, except that Number keeps its non-generic operator and function declarations
      (only its extends clause changes): isolates what dropping the catch-alls costs.
Every edit asserts its match count, so a drifted source fails loudly."""
import io, os, re, shutil, sys

S = sys.argv[1]
SRC = {"FortressLibrary.fsi": "Library/FortressLibrary.fsi",
       "FortressLibrary.fss": "Library/FortressLibrary.fss",
       "FortressBuiltin.fsi": "ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi",
       "FortressBuiltin.fss": "ProjectFortress/LibraryBuiltin/FortressBuiltin.fss"}

def rd(p): return io.open(p, encoding="utf-8").read()
def wr(p, s): io.open(p, "w", encoding="utf-8").write(s)
def sub(s, a, b, n=1):
    assert s.count(a) == n, (a[:80], s.count(a), n)
    return s.replace(a, b)

def number_block(s, first_line_after):
    """The text from 'trait Number\\n' through the 'end\\n' before `first_line_after`."""
    i = s.index("trait Number\n")
    j = s.index(first_line_after, i)
    return s[i:j]

INTS = ["ZZ", "ZZ64", "ZZ32", "NN64", "NN32"]

def api(s, keep_number_methods):
    s = sub(s, "        extends { Comparison, StandardTotalOrder[\\TotalComparison\\] }\n",
               "        extends { Comparison }\n")
    blk = number_block(s, "trait RR64 extends")
    head = ("trait Number\n        extends { StandardPartialOrder[\\Number\\], StandardMinMax[\\Number\\],\n"
            "                  AdditiveGroup[\\Number\\], MultiplicativeRing[\\Number\\] }\n"
            "        comprises { RR64 }\n")
    assert blk.startswith(head)
    newhead = "trait Number\n        extends { AnyAdditiveGroup, AnyMultiplicativeRing }\n"
    s = s.replace(blk, newhead + (blk[len(head):] if keep_number_methods else "end\n\n"))
    s = sub(s, "trait RR64 extends Number comprises { Float, FloatLiteral, RR32, QQ }\n",
            "trait RR64 extends { Number, StandardPartialOrder[\\RR64\\], StandardMinMax[\\RR64\\],\n"
            "                     AdditiveGroup[\\RR64\\], MultiplicativeRing[\\RR64\\] }\n"
            "        excludes { QQ, AnyIntegral }\n"
            "        comprises { Float, FloatLiteral, RR32 }\n"
            + "".join("    coerce(x: %s)\n" % t for t in ["QQ"] + INTS))
    s = sub(s, "trait QQ extends { RR64, StandardPartialOrder[\\QQ\\] } comprises { AnyIntegral, ... }\n",
            "trait QQ extends { Number, StandardPartialOrder[\\QQ\\], StandardMinMax[\\QQ\\],\n"
            "                   AdditiveGroup[\\QQ\\], MultiplicativeRing[\\QQ\\] }\n"
            "        excludes { AnyIntegral }\n"
            "        comprises { ... }\n"
            + "".join("    coerce(x: %s)\n" % t for t in INTS))
    s = sub(s, "trait AnyIntegral extends { QQ } comprises { ZZ } end\n",
            "trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end\n")
    s = sub(s, "trait Integral[\\I extends Integral[\\I\\]\\] extends { StandardTotalOrder[\\I\\], AnyIntegral }\n",
            "trait Integral[\\I extends Integral[\\I\\]\\] extends { StandardTotalOrder[\\I\\], AdditiveGroup[\\I\\] }\n")
    s = sub(s, "trait NN64 extends { ZZ, Integral[\\NN64\\] } comprises { UnsignedLong, NN32 }\n",
            "trait NN64 extends { AnyIntegral, Integral[\\NN64\\] } excludes { ZZ, NN32 } comprises { UnsignedLong }\n"
            "    coerce(x: NN32)\n")
    s = sub(s, "trait ZZ32 extends { ZZ64, Integral[\\ZZ32\\] } comprises { Int, IntLiteral }\n",
            "trait ZZ32 extends { AnyIntegral, Integral[\\ZZ32\\] } excludes { ZZ64, ZZ, NN64, NN32 } comprises { Int, IntLiteral }\n")
    s = sub(s, "trait ZZ64 extends { ZZ, Integral[\\ZZ64\\] } comprises { Long, ZZ32 }\n",
            "trait ZZ64 extends { AnyIntegral, Integral[\\ZZ64\\] } excludes { ZZ, NN64, NN32 } comprises { Long }\n"
            "    coerce(x: ZZ32)\n")
    s = sub(s, "trait ZZ extends { Integral[\\ZZ\\] } comprises { BigNum, ZZ64, NN64 }\n",
            "trait ZZ extends { AnyIntegral, Integral[\\ZZ\\] } excludes { NN64, NN32 } comprises { BigNum }\n"
            + "".join("    coerce(x: %s)\n" % t for t in ["ZZ32", "ZZ64", "NN32", "NN64"]))
    s = sub(s, "value trait AnyMaybe extends { Equality[\\AnyMaybe\\], AnyUniqueItem } excludes Number\n",
            "value trait AnyMaybe extends { AnyUniqueItem } excludes Number\n")
    s = sub(s, "object SumReduction extends {\nCommutativeMonoidReduction[\\Number\\] ,\n"
               "DistributesOver[\\MaxReductionN\\],\nDistributesOver[\\MinReductionN\\] }\n",
            "object SumReduction extends { CommutativeMonoidReduction[\\Number\\] }\n")
    s = sub(s, "object ProdReduction extends {CommutativeMonoidReduction[\\Number\\],\n"
               "DistributesOver[\\SumReduction\\],\n"
               "DistributesOver[\\MinReductionN\\],  (* actually, we need to limit elements positive *)\n"
               "DistributesOver[\\MaxReductionN\\]\n }\n",
            "object ProdReduction extends { CommutativeMonoidReduction[\\Number\\] }\n")
    return s

def component(s, keep_number_methods):
    s = sub(s, "        extends { Comparison, StandardTotalOrder[\\TotalComparison\\] }\n",
               "        extends { Comparison }\n")
    blk = number_block(s, "trait RR64 extends")
    head = ("trait Number\n        extends { StandardPartialOrder[\\Number\\], StandardMinMax[\\Number\\],\n"
            "                  AdditiveGroup[\\Number\\], MultiplicativeRing[\\Number\\] }\n"
            "        comprises { RR64 }\n")
    assert blk.startswith(head)
    newhead = "trait Number\n        extends { AnyAdditiveGroup, AnyMultiplicativeRing }\n"
    s = s.replace(blk, newhead + (blk[len(head):] if keep_number_methods else "    asFloat(self): RR64\nend\n\n"))
    s = sub(s, "trait RR64 extends Number comprises { Float, FloatLiteral, RR32, QQ }\n",
            "trait RR64 extends { Number, StandardPartialOrder[\\RR64\\], StandardMinMax[\\RR64\\],\n"
            "                     AdditiveGroup[\\RR64\\], MultiplicativeRing[\\RR64\\] }\n"
            "        excludes { QQ, AnyIntegral }\n"
            "        comprises { Float, FloatLiteral, RR32 }\n"
            + "".join("    coerce(x: %s) = asFloat(x)\n" % t for t in ["QQ"] + INTS))
    s = sub(s, "trait QQ extends { RR64, StandardPartialOrder[\\QQ\\] } comprises { Ratio, AnyIntegral }\n",
            "trait QQ extends { Number, StandardPartialOrder[\\QQ\\], StandardMinMax[\\QQ\\],\n"
            "                   AdditiveGroup[\\QQ\\], MultiplicativeRing[\\QQ\\] }\n"
            "        excludes { AnyIntegral }\n"
            "        comprises { Ratio }\n"
            "    coerce(x: ZZ) = Ratio(x, x.one)\n"
            "    coerce(x: ZZ64) = Ratio(big(x), big(x.one))\n"
            "    coerce(x: ZZ32) = Ratio(big(widen(x)), big(widen(x.one)))\n"
            "    coerce(x: NN64) = Ratio(big(signed(x)), big(signed(x.one)))\n"
            "    coerce(x: NN32) = Ratio(big(widen(signed(x))), big(widen(signed(x.one))))\n")
    s = sub(s, "trait AnyIntegral extends { QQ } comprises { ZZ } end\n",
            "trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 } end\n")
    s = sub(s, "trait Integral[\\I extends Integral[\\I\\]\\] extends { StandardTotalOrder[\\I\\], AnyIntegral }\n",
            "trait Integral[\\I extends Integral[\\I\\]\\] extends { StandardTotalOrder[\\I\\], AdditiveGroup[\\I\\] }\n")
    s = sub(s, "trait ZZ32 extends { ZZ64, Integral[\\ZZ32\\] } comprises { Int, IntLiteral }\n",
            "trait ZZ32 extends { AnyIntegral, Integral[\\ZZ32\\] } excludes { ZZ64, ZZ, NN64, NN32 } comprises { Int, IntLiteral }\n")
    s = sub(s, "trait ZZ64 extends { ZZ, Integral[\\ZZ64\\] } comprises { Long, ZZ32 }\n",
            "trait ZZ64 extends { AnyIntegral, Integral[\\ZZ64\\] } excludes { ZZ, NN64, NN32 } comprises { Long }\n"
            "    coerce(x: ZZ32) = widen(x)\n")
    s = sub(s, "trait NN64 extends { ZZ, Integral[\\NN64\\] } comprises { UnsignedLong, NN32 }\n",
            "trait NN64 extends { AnyIntegral, Integral[\\NN64\\] } excludes { ZZ, NN32 } comprises { UnsignedLong }\n"
            "    coerce(x: NN32) = widen(x)\n")
    s = sub(s, "trait ZZ extends Integral[\\ZZ\\]\n        comprises { BigNum, ZZ64, NN64 }\n",
            "trait ZZ extends { AnyIntegral, Integral[\\ZZ\\] } excludes { NN64, NN32 }\n        comprises { BigNum }\n"
            "    coerce(x: ZZ32) = big(widen(x))\n"
            "    coerce(x: ZZ64) = big(x)\n"
            "    coerce(x: NN32) = big(widen(signed(x)))\n"
            "    coerce(x: NN64) = big(signed(x))\n")
    s = sub(s, "value trait AnyMaybe extends { Equality[\\AnyMaybe\\], AnyUniqueItem } excludes Number\n",
            "value trait AnyMaybe extends { AnyUniqueItem } excludes Number\n")
    s = sub(s, "object SumReduction extends {\n  CommutativeMonoidReduction[\\Number\\],\n"
               "  DistributesOver[\\MaxReductionN\\],\n  DistributesOver[\\MinReductionN\\],\n"
               "  DistributesOver[\\MaxReduction[\\Number\\]\\],\n  DistributesOver[\\MaxReduction[\\Number\\]\\]\n   }\n",
            "object SumReduction extends { CommutativeMonoidReduction[\\Number\\] }\n")
    s = sub(s, "object ProdReduction extends {\n  CommutativeMonoidReduction[\\Number\\],\n"
               "  DistributesOver[\\SumReduction\\]\n }\n",
            "object ProdReduction extends { CommutativeMonoidReduction[\\Number\\] }\n")
    return s

def builtin(s):
    return sub(s, "value object NN32 extends { StandardTotalOrder[\\NN32\\], NN64 }\n",
               "value object NN32 extends { AnyIntegral, Integral[\\NN32\\] }\n")

for v in ("L0", "FLAT", "FLATN"):
    d = os.path.join(S, v)
    os.makedirs(d, exist_ok=True)
    for name, src in SRC.items():
        shutil.copy(src, os.path.join(d, name))
    if v == "L0":
        continue
    keep = (v == "FLATN")
    p = os.path.join(d, "FortressLibrary.fsi"); wr(p, api(rd(p), keep))
    p = os.path.join(d, "FortressLibrary.fss"); wr(p, component(rd(p), keep))
    for n in ("FortressBuiltin.fsi", "FortressBuiltin.fss"):
        p = os.path.join(d, n); wr(p, builtin(rd(p)))
print("variants in", S)

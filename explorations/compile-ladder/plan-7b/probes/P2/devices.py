#!/usr/bin/env python3
"""devices.py <dir>: probe P2's library devices for the Meet Rule class (climb batch 7's record,
section 6, P2), applied in place to FortressLibrary.fsi in <dir>, a copy of the api (the triage's
method, perf-probes/nat/triage/make-fixes.py: the checker reads the api, so only the api is edited
and no body or caller is; the count stage then reads the api's overloading check).  Each edit must
match exactly once.  Marker names are placeholders for the measurement, not proposals.

  K  the five range kinds exclude one another through plain marker traits (the device of Rank1/2/3,
     FortressLibrary.fsi "Potemkin exclusion traits", and of AnyMaybe), where the triage's generic
     `excludes` among OpenRange[\\I\\] ... FullRange[\\I\\] removed nothing (triage.md section 4)
  G  a range is never a Condition, and a partial range is never a Generator: plain markers
     AnyRange (on Range) and AnyPartialRange (on PartialRange), excluded by Condition and Generator
  F  FullRange, a Range and a Generator (through Indexed), declares IN on the meet
  M  map and ivmap declared on Maybe, the meet of Condition and Indexed (the triage's T3 lines)
  Q  SQCAP declared on Just at (Just, Maybe), the meet of Maybe's and Just's own
  C  copy redeclared on StandardMutableArrayType, the array diamond's meet (the triage's T2 line,
     as climb batch 7's rung A redeclared tabulate and fill there)
  S  two one-line declared-type slips the triage listed: AssociativeReduction.lift(r:R) and
     LexicographicReduction.isLeftZero(_:TotalComparison)
Usage: devices.py <dir> [letters], default all."""
import os
import sys

D = sys.argv[1]
WHICH = sys.argv[2] if len(sys.argv) > 2 else "KGFMQCS"
P = os.path.join(D, "FortressLibrary.fsi")
s = open(P, encoding="utf-8").read()


def sub(old, new):
    global s
    n = s.count(old)
    assert n == 1, (old[:80], n)
    s = s.replace(old, new)


if "K" in WHICH or "G" in WHICH:
    markers = ""
    if "G" in WHICH:
        markers += "trait AnyRange end\ntrait AnyPartialRange end\n"
    if "K" in WHICH:
        markers += ("trait AnyOpenRange excludes { AnyExtentRange, AnyLeftRange, AnyRightRange, AnyFullRange } end\n"
                    "trait AnyExtentRange excludes { AnyLeftRange, AnyRightRange, AnyFullRange } end\n"
                    "trait AnyLeftRange excludes { AnyRightRange, AnyFullRange } end\n"
                    "trait AnyRightRange excludes { AnyFullRange } end\n"
                    "trait AnyFullRange end\n")
    sub("trait Range[\\I\\] extends { StandardPartialOrder[\\Range[\\I\\]\\], Contains[\\I\\] }\n",
        markers + "\ntrait Range[\\I\\] extends { StandardPartialOrder[\\Range[\\I\\]\\], Contains[\\I\\]"
        + (", AnyRange" if "G" in WHICH else "") + " }\n")
if "G" in WHICH:
    sub("trait PartialRange[\\I\\] extends Range[\\I\\] end\n",
        "trait PartialRange[\\I\\] extends { Range[\\I\\], AnyPartialRange } end\n")
    sub("trait Generator[\\E\\] extends { Contains[\\E\\] }\n        excludes { Number }\n",
        "trait Generator[\\E\\] extends { Contains[\\E\\] }\n        excludes { Number, AnyPartialRange }\n")
    sub("trait Condition[\\E\\] extends SequentialGenerator[\\E\\]\n",
        "trait Condition[\\E\\] extends SequentialGenerator[\\E\\]\n        excludes { AnyRange }\n")
if "K" in WHICH:
    sub("trait OpenRange[\\I\\] extends PartialRange[\\I\\]\n",
        "trait OpenRange[\\I\\] extends { PartialRange[\\I\\], AnyOpenRange }\n")
    sub("trait ExtentRange[\\I\\] extends { RangeWithExtent[\\I\\], PartialRange[\\I\\] }\n",
        "trait ExtentRange[\\I\\] extends { RangeWithExtent[\\I\\], PartialRange[\\I\\], AnyExtentRange }\n")
    sub("trait LeftRange[\\I\\] extends { RangeWithLeft[\\I\\], PartialRange[\\I\\] }\n",
        "trait LeftRange[\\I\\] extends { RangeWithLeft[\\I\\], PartialRange[\\I\\], AnyLeftRange }\n")
    sub("trait RightRange[\\I\\] extends { RangeWithRight[\\I\\], PartialRange[\\I\\] }\n",
        "trait RightRange[\\I\\] extends { RangeWithRight[\\I\\], PartialRange[\\I\\], AnyRightRange }\n")
    sub("trait FullRange[\\I\\] extends { RangeWithLeft[\\I\\], RangeWithRight[\\I\\], RangeWithExtent[\\I\\], Indexed[\\I, I\\] }\n",
        "trait FullRange[\\I\\] extends { RangeWithLeft[\\I\\], RangeWithRight[\\I\\], RangeWithExtent[\\I\\], Indexed[\\I, I\\], AnyFullRange }\n"
        + ("    opr IN(n: I, self): Boolean\n" if "F" in WHICH else ""))
elif "F" in WHICH:
    sub("trait FullRange[\\I\\] extends { RangeWithLeft[\\I\\], RangeWithRight[\\I\\], RangeWithExtent[\\I\\], Indexed[\\I, I\\] }\n",
        "trait FullRange[\\I\\] extends { RangeWithLeft[\\I\\], RangeWithRight[\\I\\], RangeWithExtent[\\I\\], Indexed[\\I, I\\] }\n"
        "    opr IN(n: I, self): Boolean\n")
if "M" in WHICH:
    sub("        extends { AnyMaybe, Condition[\\T\\], ZeroIndexed[\\T\\], UniqueItem[\\T\\] }\n        comprises { Nothing[\\T\\], Just[\\T\\] }\n",
        "        extends { AnyMaybe, Condition[\\T\\], ZeroIndexed[\\T\\], UniqueItem[\\T\\] }\n        comprises { Nothing[\\T\\], Just[\\T\\] }\n"
        "    map[\\G\\](f: T->G): Maybe[\\G\\]\n    ivmap[\\G\\](f: (ZZ32,T)->G): Maybe[\\G\\]\n")
if "Q" in WHICH:
    sub("    opr SQCAP(self, o:UniqueItem[\\T\\]): Maybe[\\T\\]\n",
        "    opr SQCAP(self, o:UniqueItem[\\T\\]): Maybe[\\T\\]\n    opr SQCAP(self, o:Maybe[\\T\\]): Maybe[\\T\\]\n")
if "C" in WHICH:
    sub("        extends { StandardImmutableArrayType[\\T,E,I\\], Array[\\E,I\\] }\n    assign(v:T):T\n",
        "        extends { StandardImmutableArrayType[\\T,E,I\\], Array[\\E,I\\] }\n    abstract copy():T\n    assign(v:T):T\n")
if "S" in WHICH:
    sub("    lift(r:Any): AnyMaybe\n    unlift(r:AnyMaybe): R\n", "    lift(r:R): AnyMaybe\n    unlift(r:AnyMaybe): R\n")
    sub("    isLeftZero(_:EqualTo): Boolean\n    isLeftZero(_:Comparison): Boolean\n",
        "    isLeftZero(_:EqualTo): Boolean\n    isLeftZero(_:TotalComparison): Boolean\n")
open(P, "w", encoding="utf-8").write(s)
print("devices", WHICH, "->", P)

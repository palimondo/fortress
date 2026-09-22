#!/usr/bin/env python3
"""Api-level fix variants for the triage, built on make-lib.py's ZALL3 copy.
usage: make-fixes.py <lib-dir>   (the directory make-lib.py wrote; ZALL3 must exist)

T1  ZALL3 + the (d) library defects: StandardMinMax MIN/MAX return T, LessThan/GreaterThan
    CMP return TotalComparison, MinMaxReductionN.empty returns (Number,Number), Array3.shift's
    2-tuple, LeftScalarRange/RightScalarRange every/atMost narrowed to what their bodies return,
    AssociativeReduction.lift(r:R), LexicographicReduction.isLeftZero(_:TotalComparison)
T2  T1 + fill: the function-taking fill renamed fillWith (the four traits and the array1/array2
    factories), and the two fills redeclared on the diamond's meets (StandardMutableArrayType,
    ImmutableArray1), and copy redeclared on StandardMutableArrayType
T3  T2 + the missing disambiguators that are one clause or one line: map and ivmap on Maybe, pairwise
    excludes among the five range kinds, and PossibleReductionPair's family's R renamed Q (the
    capture probe)
Only the apis change: the component is never reached while an api has errors, so the .fss
bodies and callers the renames would need are NOT edited and the interpreter is not run."""
import os, re, shutil, sys, io
S = sys.argv[1]
def edit(path, subs):
    s = io.open(path, encoding="utf-8").read()
    for a, b, n in subs:
        assert s.count(a) == n, (path, a[:70], s.count(a), n)
        s = s.replace(a, b)
    io.open(path, "w", encoding="utf-8").write(s)
T1_FL = [
 ("    opr MIN(self, other:T): (T,T)\n    opr MAX(self, other:T): (T,T)\n",
  "    opr MIN(self, other:T): T\n    opr MAX(self, other:T): T\n", 1),
 ("    opr CMP(self, other:LessThan): Comparison\n", "    opr CMP(self, other:LessThan): TotalComparison\n", 1),
 ("    opr CMP(self, other:GreaterThan): Comparison\n", "    opr CMP(self, other:GreaterThan): TotalComparison\n", 1),
 ("    getter asString(): String\n    empty(): Number\n", "    getter asString(): String\n    empty(): (Number,Number)\n", 1),
 ("    shift(t:(ZZ32,ZZ32,ZZ32)): Array[\\T,(ZZ32,ZZ32)\\]\n", "    shift(t:(ZZ32,ZZ32,ZZ32)): Array[\\T,(ZZ32,ZZ32,ZZ32)\\]\n", 1),
 ("    lift(r:Any): AnyMaybe\n", "    lift(r:R): AnyMaybe\n", 1),
 ("    isLeftZero(_:Comparison): Boolean\n", "    isLeftZero(_:TotalComparison): Boolean\n", 1)]
T1_RI = [
 ("    every(s: I): ScalarRange[\\I\\]\n    imposeStride(s: I): LeftScalarRange[\\I\\]\n    atMost(n: I): ScalarRange[\\I\\]\n",
  "    every(s: I): BoundedScalarRange[\\I\\]\n    imposeStride(s: I): LeftScalarRange[\\I\\]\n    atMost(n: I): FullScalarRange[\\I\\]\n", 1),
 ("    imposeStride(s: I): RightScalarRange[\\I\\]\n    atMost(n: I): ScalarRange[\\I\\]\n",
  "    imposeStride(s: I): RightScalarRange[\\I\\]\n    atMost(n: I): FullScalarRange[\\I\\]\n", 1)]
T2_FL = [
 ("    abstract fill(f:I->E):ReadableArray[\\E,I\\]\n", "    abstract fillWith(f:I->E):ReadableArray[\\E,I\\]\n", 1),
 ("    abstract fill(f:I->E):ImmutableArray[\\E,I\\]\n", "    abstract fillWith(f:I->E):ImmutableArray[\\E,I\\]\n", 1),
 ("    abstract fill(f:I->E):Array[\\E,I\\]\n", "    abstract fillWith(f:I->E):Array[\\E,I\\]\n", 1),
 ("    fill(f:I->E):T\n    fill(v:E):T\n", "    fillWith(f:I->E):T\n    fill(v:E):T\n", 1),
 ("array1[\\T, nat s0\\](f:ZZ32->T):Array1[\\T,0,s0\\]", "array1With[\\T, nat s0\\](f:ZZ32->T):Array1[\\T,0,s0\\]", 1),
 ("array2[\\T, nat s0, nat s1\\](f:(ZZ32,ZZ32)->T):Array2[\\T,0,s0,0,s1\\]", "array2With[\\T, nat s0, nat s1\\](f:(ZZ32,ZZ32)->T):Array2[\\T,0,s0,0,s1\\]", 1),
 ("        extends { StandardImmutableArrayType[\\T,E,I\\], Array[\\E,I\\] }\n",
  "        extends { StandardImmutableArrayType[\\T,E,I\\], Array[\\E,I\\] }\n    fillWith(f:I->E):T\n    fill(v:E):T\n    abstract copy():T\n", 1),
 ("              ImmutableArray[\\T,ZZ32\\], ReadableArray1[\\T,b0,s0\\] }\n    getter mutability():String\n",
  "              ImmutableArray[\\T,ZZ32\\], ReadableArray1[\\T,b0,s0\\] }\n    getter mutability():String\n    fillWith(f:ZZ32->T):ImmutableArray1[\\T,b0,s0\\]\n    fill(v:T):ImmutableArray1[\\T,b0,s0\\]\n", 1)]
T3_FL = [
 ("        extends { AnyMaybe, Condition[\\T\\], ZeroIndexed[\\T\\], UniqueItem[\\T\\] }\n        comprises { Nothing[\\T\\], Just[\\T\\] }\n",
  "        extends { AnyMaybe, Condition[\\T\\], ZeroIndexed[\\T\\], UniqueItem[\\T\\] }\n        comprises { Nothing[\\T\\], Just[\\T\\] }\n    map[\\G\\](f: T->G): Maybe[\\G\\]\n    ivmap[\\G\\](f: (ZZ32,T)->G): Maybe[\\G\\]\n", 1),
 ("trait OpenRange[\\I\\] extends PartialRange[\\I\\]\n",
  "trait OpenRange[\\I\\] extends PartialRange[\\I\\]\n    excludes { ExtentRange[\\I\\], LeftRange[\\I\\], RightRange[\\I\\], FullRange[\\I\\] }\n", 1),
 ("trait ExtentRange[\\I\\] extends { RangeWithExtent[\\I\\], PartialRange[\\I\\] }\n",
  "trait ExtentRange[\\I\\] extends { RangeWithExtent[\\I\\], PartialRange[\\I\\] }\n    excludes { LeftRange[\\I\\], RightRange[\\I\\], FullRange[\\I\\] }\n", 1),
 ("trait LeftRange[\\I\\] extends { RangeWithLeft[\\I\\], PartialRange[\\I\\] }\n",
  "trait LeftRange[\\I\\] extends { RangeWithLeft[\\I\\], PartialRange[\\I\\] }\n    excludes { RightRange[\\I\\], FullRange[\\I\\] }\n", 1),
 ("trait RightRange[\\I\\] extends { RangeWithRight[\\I\\], PartialRange[\\I\\] }\n",
  "trait RightRange[\\I\\] extends { RangeWithRight[\\I\\], PartialRange[\\I\\] }\n    excludes { FullRange[\\I\\] }\n", 1)]
def rename_pair_block(path):
    s = io.open(path, encoding="utf-8").read()
    a = s.index("trait PossibleReductionPair[\\R\\]"); b = s.index("(** The usual lifting to Maybe for identity-less operators **)")
    blk = re.sub(r"\bR\b", "Q", s[a:b])
    io.open(path, "w", encoding="utf-8").write(s[:a] + blk + s[b:])
for v, prev in (("T1", "ZALL3"), ("T2", "T1"), ("T3", "T2")):
    if os.path.exists(f"{S}/{v}"): shutil.rmtree(f"{S}/{v}")
    shutil.copytree(f"{S}/{prev}", f"{S}/{v}")
    fsi, ri = f"{S}/{v}/FortressLibrary.fsi", f"{S}/{v}/RangeInternals.fsi"
    if v == "T1": edit(fsi, T1_FL); edit(ri, T1_RI)
    if v == "T2": edit(fsi, T2_FL)
    if v == "T3": edit(fsi, T3_FL); rename_pair_block(fsi)
print("T1 T2 T3 in", S)

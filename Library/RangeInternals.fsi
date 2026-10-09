(*******************************************************************************
    Copyright 2008,2009, Oracle and/or its affiliates.
    All rights reserved.


    Use is subject to license terms.

    This distribution may include materials developed by third parties.

 ******************************************************************************)

api RangeInternals

roundToStride(amt: ZZ32, stride: ZZ32): ZZ32

atOrAboveGoingUp(start: ZZ32, bound: ZZ32, stride: ZZ32): ZZ32

atOrBelowGoingUp(start: ZZ32, bound: ZZ32, stride: ZZ32): ZZ32

atOrBelowGoingDown(start: ZZ32, bound: ZZ32, stride: ZZ32): ZZ32

atOrAboveGoingDown(start: ZZ32, bound: ZZ32, stride: ZZ32): ZZ32

atOrBelow(start: ZZ32, bound: ZZ32, stride: ZZ32): ZZ32

atOrAbove(start: ZZ32, bound: ZZ32, stride: ZZ32): ZZ32

meetingPoint(init0: ZZ32, stride0: ZZ32, init1: ZZ32, stride1: ZZ32, stride: ZZ32): Maybe[\ZZ32\]

opr SCMP(a: ZZ32, b: ZZ32): Comparison

opr SCMP(a: (ZZ32, ZZ32), b: (ZZ32, ZZ32)): Comparison

opr SCMP(a: (ZZ32, ZZ32, ZZ32), b: (ZZ32, ZZ32, ZZ32)): Comparison

opr PCMP(a: ZZ32, b: ZZ32): Comparison

opr PCMP(a: (ZZ32, ZZ32), b: (ZZ32, ZZ32)): Comparison

opr PCMP(a: (ZZ32, ZZ32, ZZ32), b: (ZZ32, ZZ32, ZZ32)): Comparison

checkSelection[\R extends Range[\ZZ32\]\](this: Range[\ZZ32\], other: Range[\ZZ32\], r: R): R

checkSelection2D[\R extends Range[\(ZZ32, ZZ32)\]\](this: Range[\(ZZ32, ZZ32)\], other: Range[\(ZZ32, ZZ32)\], r: R): R

checkSelection3D[\R extends Range[\(ZZ32, ZZ32, ZZ32)\]\](this: Range[\(ZZ32, ZZ32, ZZ32)\], other: Range[\(ZZ32, ZZ32, ZZ32)\], r: R): R

trait ScalarRange extends Range[\ZZ32\]
    abstract truncL(l: ZZ32): BoundedScalarRange
    truncR(r: ZZ32): BoundedScalarRange
    abstract flip(): ScalarRange
    abstract every(s: ZZ32): ScalarRange
    abstract imposeStride(s: ZZ32): ScalarRange
    abstract atMost(n: ZZ32): ScalarRange
    opr CAP(self, other: Range[\ZZ32\]): ScalarRange
    opr CMP(self, other: Range[\ZZ32\]): Comparison
    narrowToRange(other: Range[\ZZ32\]): Range[\ZZ32\]
    narrowToRange(other: OpenRange[\ZZ32\]): Range[\ZZ32\]
    abstract intersectWithExtent(e: ExtentScalarRange): ScalarRangeWithExtent
    check(): ScalarRange
    indexOf(n: ZZ32): Maybe[\ZZ32\]
end

combine2D(i: ScalarRange, j: ScalarRange): Range2D

trait Range2D
    extends Range[\(ZZ32, ZZ32)\]
    abstract getter range1(): ScalarRange
    abstract getter range2(): ScalarRange
    getter stride(): (ZZ32, ZZ32)

    abstract every(s_i: ZZ32, s_j: ZZ32): Range2D
    atMost(n_i: ZZ32, n_j: ZZ32): Range2D
    truncL(l_i: ZZ32, l_j: ZZ32): BoundedRange2D
    truncR(r_i: ZZ32, r_j: ZZ32): BoundedRange2D
    opr CAP(self, other: Range[\(ZZ32, ZZ32)\]): Range[\(ZZ32, ZZ32)\]
    opr CAP(self, other: Range2D): Range[\(ZZ32, ZZ32)\]
    opr IN(n: (ZZ32, ZZ32), self): Boolean
    opr =(self, other: Range2D): Boolean
    opr CMP(self, other: Range[\(ZZ32, ZZ32)\]): Comparison
    narrowToRange(other: Range[\(ZZ32, ZZ32)\]): Range[\(ZZ32, ZZ32)\]
    narrowToRange(other: OpenRange[\(ZZ32, ZZ32)\]): Range[\(ZZ32, ZZ32)\]
    check(): Range2D
end

trait ActualRange2D[\T extends ActualRange2D[\T, Scalar1, Scalar2\], Scalar1 extends ScalarRange, Scalar2 extends ScalarRange\]
    extends Range2D
    abstract getter range1(): Scalar1
    abstract getter range2(): Scalar2

    every(s_i: ZZ32, s_j: ZZ32): Range2D
    imposeStride(s_i: ZZ32, s_j: ZZ32): Range2D
    abstract recombine(a: Scalar1, b: Scalar2): T
end

combine3D(i: ScalarRange, j: ScalarRange, k: ScalarRange): Range3D

trait Range3D
    extends Range[\(ZZ32, ZZ32, ZZ32)\]
    abstract getter range1(): ScalarRange
    abstract getter range2(): ScalarRange
    abstract getter range3(): ScalarRange
    getter stride(): (ZZ32, ZZ32, ZZ32)
    getter isEmpty(): Boolean

    abstract every(s_i: ZZ32, s_j: ZZ32, s_k: ZZ32): Range3D
    atMost(n_i: ZZ32, n_j: ZZ32, n_k: ZZ32): Range3D
    truncL(l_i: ZZ32, l_j: ZZ32, l_k: ZZ32): BoundedRange3D
    truncR(r_i: ZZ32, r_j: ZZ32, r_k: ZZ32): BoundedRange3D
    opr CAP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): Range[\(ZZ32, ZZ32, ZZ32)\]
    opr CAP(self, other: Range3D): Range[\(ZZ32, ZZ32, ZZ32)\]
    opr IN(n: (ZZ32, ZZ32, ZZ32), self): Boolean
    opr =(self, other: Range3D): Boolean
    opr CMP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): Comparison
    narrowToRange(other: Range[\(ZZ32, ZZ32, ZZ32)\]): Range[\(ZZ32, ZZ32, ZZ32)\]
    narrowToRange(other: OpenRange[\(ZZ32, ZZ32, ZZ32)\]): Range[\(ZZ32, ZZ32, ZZ32)\]
    check(): Range3D
end

trait ActualRange3D[\T extends ActualRange3D[\T, Scalar1, Scalar2, Scalar3\], Scalar1 extends ScalarRange, Scalar2 extends ScalarRange, Scalar3 extends ScalarRange\]
    extends Range3D
    abstract getter range1(): Scalar1
    abstract getter range2(): Scalar2
    abstract getter range3(): Scalar3

    every(s_i: ZZ32, s_j: ZZ32, s_k: ZZ32): Range3D
    imposeStride(s_i: ZZ32, s_j: ZZ32, s_k: ZZ32): Range3D
    abstract recombine(a: Scalar1, b: Scalar2, c: Scalar3): T
end

trait PartialScalarRange
    extends { ScalarRange, PartialRange[\ZZ32\] }
end

object OpenScalarRange(str: ZZ32)
    extends { PartialScalarRange, OpenRange[\ZZ32\] }
    getter stride(): ZZ32

    truncL(l: ZZ32): LeftScalarRange
    flip(): OpenScalarRange
    forward(): OpenScalarRange
    every(s: ZZ32): OpenScalarRange
    imposeStride(s: ZZ32): OpenScalarRange
    atMost(n: ZZ32): ScalarRangeWithExtent
    opr =(self, b: OpenRange[\ZZ32\]): Boolean
    opr CAP(self, other: ScalarRange): ScalarRange
    narrowToRange(other: OpenRange[\ZZ32\]): Range[\ZZ32\]
    intersectWithExtent(e: ExtentScalarRange): ScalarRangeWithExtent
    openEveryParam(r: ScalarRange): ZZ32
end

combine2D(i: OpenScalarRange, j: OpenScalarRange): OpenRange2D

object OpenRange2D(str_i: ZZ32, str_j: ZZ32)
    extends { OpenRange[\(ZZ32, ZZ32)\], ActualRange2D[\OpenRange2D, OpenScalarRange, OpenScalarRange\] }
    getter stride(): (ZZ32, ZZ32)
    getter range1(): OpenScalarRange
    getter range2(): OpenScalarRange

    flip(): OpenRange2D
    forward(): OpenRange2D
    recombine(i: OpenScalarRange, j: OpenScalarRange): OpenRange2D
    opr IN(n: (ZZ32, ZZ32), self): Boolean
    narrowToRange(other: OpenRange[\(ZZ32, ZZ32)\]): Range[\(ZZ32, ZZ32)\]
end

combine3D(i: OpenScalarRange, j: OpenScalarRange, k: OpenScalarRange): OpenRange3D

object OpenRange3D(str_i: ZZ32, str_j: ZZ32, str_k: ZZ32)
    extends { OpenRange[\(ZZ32, ZZ32, ZZ32)\], ActualRange3D[\OpenRange3D, OpenScalarRange, OpenScalarRange, OpenScalarRange\] }
    getter stride(): (ZZ32, ZZ32, ZZ32)
    getter range1(): OpenScalarRange
    getter range2(): OpenScalarRange
    getter range3(): OpenScalarRange

    flip(): OpenRange3D
    forward(): OpenRange3D
    recombine(i: OpenScalarRange, j: OpenScalarRange, k: OpenScalarRange): OpenRange3D
    opr IN(n: (ZZ32, ZZ32, ZZ32), self): Boolean
    narrowToRange(other: OpenRange[\(ZZ32, ZZ32, ZZ32)\]): Range[\(ZZ32, ZZ32, ZZ32)\]
end

open(): OpenScalarRange

trait ScalarRangeWithExtent
    extends { ScalarRange, RangeWithExtent[\ZZ32\] }
end

object ExtentScalarRange(ex: ZZ32, str: ZZ32)
    extends { ScalarRangeWithExtent, PartialScalarRange,
        ExtentRange[\ZZ32\] }
    getter stride(): ZZ32
    getter extent(): Just[\ZZ32\]
    getter fromLeft(): Boolean

    truncL(s: ZZ32): FullScalarRange
    flip(): ExtentScalarRange
    forward(): ExtentScalarRange
    every(s: ZZ32): ExtentScalarRange
    imposeStride(s: ZZ32): ExtentScalarRange
    atMost(n: ZZ32): ScalarRange
    opr CAP(self, other: ScalarRange): ScalarRangeWithExtent
    intersectWithExtent(e: ExtentScalarRange): ScalarRangeWithExtent
    opr =(self, b: ExtentScalarRange): Boolean
    opr FORWARD_CMP(self, other: Range[\ZZ32\]): Comparison
    shiftLeft(amount: ZZ32): ExtentScalarRange
    shiftRight(amount: ZZ32): ExtentScalarRange
end

extentScalarRange(ex: ZZ32, str: ZZ32): ScalarRangeWithExtent

combine2D(i: ExtentScalarRange, j: ExtentScalarRange): ExtentRange2D

object ExtentRange2D(ex_i: ZZ32, ex_j: ZZ32, str_i: ZZ32, str_j: ZZ32)
    extends { ExtentRange[\(ZZ32, ZZ32)\], ActualRange2D[\ExtentRange2D, ExtentScalarRange, ExtentScalarRange\] }
    getter stride(): (ZZ32, ZZ32)
    getter extent(): Just[\(ZZ32, ZZ32)\]
    getter range1(): ExtentScalarRange
    getter range2(): ExtentScalarRange

    flip(): ExtentRange2D
    forward(): ExtentRange2D
    recombine(i: ExtentScalarRange, j: ExtentScalarRange): ExtentRange2D
    opr IN(n: (ZZ32, ZZ32), self): Boolean
    opr FORWARD_CMP(self, other: Range[\(ZZ32, ZZ32)\]): Comparison
end

combine3D(i: ExtentScalarRange, j: ExtentScalarRange,
        k: ExtentScalarRange): ExtentRange3D

object ExtentRange3D(ex_i: ZZ32, ex_j: ZZ32, ex_k: ZZ32, str_i: ZZ32, str_j: ZZ32, str_k: ZZ32)
    extends { ExtentRange[\(ZZ32, ZZ32, ZZ32)\], ActualRange3D[\ExtentRange3D, ExtentScalarRange, ExtentScalarRange, ExtentScalarRange\] }
    getter stride(): (ZZ32, ZZ32, ZZ32)
    getter extent(): Just[\(ZZ32, ZZ32, ZZ32)\]
    getter range1(): ExtentScalarRange
    getter range2(): ExtentScalarRange
    getter range3(): ExtentScalarRange

    flip(): ExtentRange3D
    forward(): ExtentRange3D
    recombine(i: ExtentScalarRange, j: ExtentScalarRange,
            k: ExtentScalarRange): ExtentRange3D
    opr IN(n: (ZZ32, ZZ32, ZZ32), self): Boolean
    opr FORWARD_CMP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): Comparison
end

trait BoundedScalarRange
    extends { ScalarRange, BoundedRange[\ZZ32\] }
    truncL(l: ZZ32): BoundedScalarRange
    abstract flip(): BoundedScalarRange
    abstract every(s: ZZ32): BoundedScalarRange
    abstract atMost(n: ZZ32): FullScalarRange
    opr CAP(self, other: Range[\ZZ32\]): BoundedScalarRange
    opr CAP(self, other: ScalarRange): BoundedScalarRange
    narrowToRange(other: Range[\ZZ32\]): BoundedRange[\ZZ32\]
    narrowToRange(other: OpenRange[\ZZ32\]): BoundedRange[\ZZ32\]
    intersectWithExtent(e: ExtentScalarRange): FullScalarRange
    forwardIntersection(other: BoundedScalarRange): BoundedScalarRange
    nonemptyUpwardIntersection(other: BoundedScalarRange, resultStride: ZZ32): BoundedScalarRange
    abstract nonemptyUpwardIntersectionWithPoint(other: BoundedScalarRange, resultStride: ZZ32, p: ZZ32): BoundedScalarRange
end

combine2D(i: BoundedScalarRange, j: BoundedScalarRange): BoundedRange2D

trait BoundedRange2D
    extends { Range2D, BoundedRange[\(ZZ32, ZZ32)\] }
    opr CAP(self, other: Range[\(ZZ32, ZZ32)\]): BoundedRange2D
    opr CAP(self, other: Range2D): BoundedRange2D
    narrowToRange(other: Range[\(ZZ32, ZZ32)\]): BoundedRange[\(ZZ32, ZZ32)\]
    narrowToRange(other: OpenRange[\(ZZ32, ZZ32)\]): BoundedRange[\(ZZ32, ZZ32)\]
end

combine3D(i: BoundedScalarRange, j: BoundedScalarRange, k: BoundedScalarRange): BoundedRange3D

trait BoundedRange3D
    extends { Range3D, BoundedRange[\(ZZ32, ZZ32, ZZ32)\] }
    opr CAP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): BoundedRange3D
    opr CAP(self, other: Range3D): BoundedRange3D
    narrowToRange(other: Range[\(ZZ32, ZZ32, ZZ32)\]): BoundedRange[\(ZZ32, ZZ32, ZZ32)\]
    narrowToRange(other: OpenRange[\(ZZ32, ZZ32, ZZ32)\]): BoundedRange[\(ZZ32, ZZ32, ZZ32)\]
end

trait ScalarRangeWithLeft
    extends { BoundedScalarRange, RangeWithLeft[\ZZ32\] }
    maxLeft(other: ScalarRange): ZZ32
end

object LeftScalarRange(l: ZZ32, str: ZZ32)
    extends { ScalarRangeWithLeft, PartialScalarRange,
        LeftRange[\ZZ32\] }
    getter stride(): ZZ32
    getter left(): Just[\ZZ32\]

    flip(): RightScalarRange
    forward(): BoundedScalarRange
    every(s: ZZ32): BoundedScalarRange
    imposeStride(s: ZZ32): LeftScalarRange
    atMost(n: ZZ32): FullScalarRange
    opr =(self, b: LeftScalarRange): Boolean
    opr IN(n: ZZ32, self): Boolean
    opr FORWARD_CMP(self, other: Range[\ZZ32\]): Comparison
    nonemptyUpwardIntersectionWithPoint(other: BoundedScalarRange, resultStride: ZZ32, p: ZZ32): ScalarRangeWithLeft
    shiftLeft(amount: ZZ32): LeftScalarRange
    shiftRight(amount: ZZ32): LeftScalarRange
end

leftScalarRange(l: ZZ32, str: ZZ32): LeftScalarRange

leftScalarRangeInter(l: ZZ32, str: ZZ32, p: ZZ32): LeftScalarRange

combine2D(i: LeftScalarRange, j: LeftScalarRange): LeftRange2D

object LeftRange2D(l_i: ZZ32, l_j: ZZ32, str_i: ZZ32, str_j: ZZ32)
    extends { LeftRange[\(ZZ32, ZZ32)\], BoundedRange2D, ActualRange2D[\LeftRange2D, LeftScalarRange, LeftScalarRange\] }
    getter stride(): (ZZ32, ZZ32)
    getter left(): Just[\(ZZ32, ZZ32)\]
    getter range1(): LeftScalarRange
    getter range2(): LeftScalarRange

    flip(): RightRange2D
    forward(): BoundedRange2D
    recombine(i: LeftScalarRange, j: LeftScalarRange): LeftRange2D
    opr CAP(self, other: Range[\(ZZ32, ZZ32)\]): BoundedRange2D
    opr CAP(self, other: Range2D): BoundedRange2D
    opr FORWARD_CMP(self, other: Range[\(ZZ32, ZZ32)\]): Comparison
end

combine3D(i: LeftScalarRange, j: LeftScalarRange, k: LeftScalarRange): LeftRange3D

object LeftRange3D(l_i: ZZ32, l_j: ZZ32, l_k: ZZ32, str_i: ZZ32, str_j: ZZ32, str_k: ZZ32)
    extends { LeftRange[\(ZZ32, ZZ32, ZZ32)\], BoundedRange3D, ActualRange3D[\LeftRange3D, LeftScalarRange, LeftScalarRange, LeftScalarRange\] }
    getter stride(): (ZZ32, ZZ32, ZZ32)
    getter left(): Just[\(ZZ32, ZZ32, ZZ32)\]
    getter range1(): LeftScalarRange
    getter range2(): LeftScalarRange
    getter range3(): LeftScalarRange

    flip(): RightRange3D
    forward(): BoundedRange3D
    recombine(i: LeftScalarRange, j: LeftScalarRange, k: LeftScalarRange): LeftRange3D
    opr CAP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): BoundedRange3D
    opr CAP(self, other: Range3D): BoundedRange3D
    opr FORWARD_CMP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): Comparison
end

trait ScalarRangeWithRight
    extends { BoundedScalarRange, RangeWithRight[\ZZ32\] }
    minRight(other: ScalarRange): ZZ32
end

object RightScalarRange(r: ZZ32, str: ZZ32)
    extends { ScalarRangeWithRight, PartialScalarRange,
        RightRange[\ZZ32\] }
    getter stride(): ZZ32
    getter right(): Just[\ZZ32\]

    flip(): LeftScalarRange
    forward(): BoundedScalarRange
    every(s: ZZ32): BoundedScalarRange
    imposeStride(s: ZZ32): RightScalarRange
    atMost(n: ZZ32): FullScalarRange
    opr =(self, b: RightScalarRange): Boolean
    opr IN(n: ZZ32, self): Boolean
    opr FORWARD_CMP(self, other: Range[\ZZ32\]): Comparison
    nonemptyUpwardIntersectionWithPoint(other: BoundedScalarRange, resultStride: ZZ32, p: ZZ32): ScalarRangeWithRight
    shiftLeft(amount: ZZ32): RightScalarRange
    shiftRight(amount: ZZ32): RightScalarRange
end

rightScalarRange(r: ZZ32, str: ZZ32): RightScalarRange

rightScalarRangeInter(r: ZZ32, str: ZZ32, p: ZZ32): RightScalarRange

combine2D(i: RightScalarRange, j: RightScalarRange): RightRange2D

object RightRange2D(r_i: ZZ32, r_j: ZZ32, str_i: ZZ32, str_j: ZZ32)
    extends { RightRange[\(ZZ32, ZZ32)\], BoundedRange2D, ActualRange2D[\RightRange2D, RightScalarRange, RightScalarRange\] }
    getter stride(): (ZZ32, ZZ32)
    getter right(): Just[\(ZZ32, ZZ32)\]
    getter range1(): RightScalarRange
    getter range2(): RightScalarRange

    flip(): LeftRange2D
    forward(): BoundedRange2D
    recombine(i: RightScalarRange, j: RightScalarRange): RightRange2D
    opr CAP(self, other: Range[\(ZZ32, ZZ32)\]): BoundedRange2D
    opr CAP(self, other: Range2D): BoundedRange2D
    opr FORWARD_CMP(self, other: Range[\(ZZ32, ZZ32)\]): Comparison
end

combine3D(i: RightScalarRange, j: RightScalarRange,
        k: RightScalarRange): RightRange3D

object RightRange3D(r_i: ZZ32, r_j: ZZ32, r_k: ZZ32, str_i: ZZ32, str_j: ZZ32, str_k: ZZ32)
    extends { RightRange[\(ZZ32, ZZ32, ZZ32)\], BoundedRange3D, ActualRange3D[\RightRange3D, RightScalarRange, RightScalarRange, RightScalarRange\] }
    getter stride(): (ZZ32, ZZ32, ZZ32)
    getter right(): Just[\(ZZ32, ZZ32, ZZ32)\]
    getter range1(): RightScalarRange
    getter range2(): RightScalarRange
    getter range3(): RightScalarRange

    flip(): LeftRange3D
    forward(): BoundedRange3D
    recombine(i: RightScalarRange, j: RightScalarRange,
            k: RightScalarRange): RightRange3D
    opr CAP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): BoundedRange3D
    opr CAP(self, other: Range3D): BoundedRange3D
    opr FORWARD_CMP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): Comparison
end

trait FullScalarRange
    extends { ScalarRangeWithLeft, ScalarRangeWithRight,
        ScalarRangeWithExtent,
        FullRange[\ZZ32\] }
    getter extent(): Just[\ZZ32\]
    getter bounds(): CompactFullScalarRange

    flip(): FullScalarRange
    abstract forward(): FullScalarRange
    every(s: ZZ32): FullScalarRange
    imposeStride(s: ZZ32): FullScalarRange
    atMost(n: ZZ32): FullScalarRange
    opr =(self, b: FullScalarRange): Boolean
    opr FORWARD_CMP(self, other: FullRange[\ZZ32\]): Comparison
    narrowToRange(other: Range[\ZZ32\]): FullRange[\ZZ32\]
    narrowToRange(other: OpenRange[\ZZ32\]): FullRange[\ZZ32\]
    forwardIntersection(other: BoundedScalarRange): BoundedScalarRange
    nonemptyUpwardIntersection(other: BoundedScalarRange, resultStride: ZZ32): FullScalarRange
    nonemptyUpwardIntersectionWithPoint(other: BoundedScalarRange, resultStride: ZZ32, p: ZZ32): FullScalarRange
    opr [ r: Range[\ZZ32\] ]: FullScalarRange
    opr[i: ZZ32]: ZZ32
    indexOf(i: ZZ32): Maybe[\ZZ32\]
end

trait FullRange2D
    extends { FullRange[\(ZZ32, ZZ32)\], BoundedRange2D, DelegatedIndexed[\(ZZ32, ZZ32), (ZZ32, ZZ32)\],
        ActualRange2D[\FullRange2D, FullScalarRange, FullScalarRange\] }
    getter extent(): Just[\(ZZ32, ZZ32)\]
    getter generator(): Generator[\(ZZ32, ZZ32)\]
    getter indices(): Generator[\(ZZ32, ZZ32)\]

    opr | self |: ZZ32
    flip(): FullRange2D
    opr [ ij: (ZZ32, ZZ32) ]: (ZZ32, ZZ32)
    opr [ r: Range[\(ZZ32, ZZ32)\] ]: FullRange2D
    indexOf(n: (ZZ32,ZZ32)): Maybe[\(ZZ32,ZZ32)\]
    opr CAP(self, other: Range[\(ZZ32, ZZ32)\]): BoundedRange2D
    opr CAP(self, other: Range2D): BoundedRange2D
    opr IN(n: (ZZ32, ZZ32), self): Boolean
    opr FORWARD_CMP(self, other: FullRange[\(ZZ32, ZZ32)\]): Comparison
    narrowToRange(other: Range[\(ZZ32, ZZ32)\]): FullRange[\(ZZ32, ZZ32)\]
    narrowToRange(other: OpenRange[\(ZZ32, ZZ32)\]): FullRange[\(ZZ32, ZZ32)\]
end

tupleFlatten[\I, J, K\](t: (I, J), k: K): (I, J, K)

trait FullRange3D
    extends { FullRange[\(ZZ32, ZZ32, ZZ32)\], BoundedRange3D, DelegatedIndexed[\(ZZ32, ZZ32, ZZ32), (ZZ32, ZZ32, ZZ32)\],
        ActualRange3D[\FullRange3D, FullScalarRange, FullScalarRange, FullScalarRange\] }
    getter extent(): Just[\(ZZ32, ZZ32, ZZ32)\]
    getter generator(): Generator[\(ZZ32, ZZ32, ZZ32)\]
    getter indices(): Generator[\(ZZ32, ZZ32, ZZ32)\]

    opr | self |: ZZ32
    flip(): FullRange3D
    opr [ ij: (ZZ32, ZZ32, ZZ32) ]: (ZZ32, ZZ32, ZZ32)
    opr [ r: Range[\(ZZ32, ZZ32, ZZ32)\] ]: FullRange3D
    indexOf(n: (ZZ32,ZZ32,ZZ32)): Maybe[\(ZZ32,ZZ32,ZZ32)\]
    opr CAP(self, other: Range[\(ZZ32, ZZ32, ZZ32)\]): BoundedRange3D
    opr CAP(self, other: Range3D): BoundedRange3D
    opr IN(n: (ZZ32, ZZ32, ZZ32), self): Boolean
    opr FORWARD_CMP(self, other: FullRange[\(ZZ32, ZZ32, ZZ32)\]): Comparison
    narrowToRange(other: Range[\(ZZ32, ZZ32, ZZ32)\]): FullRange[\(ZZ32, ZZ32, ZZ32)\]
    narrowToRange(other: OpenRange[\(ZZ32, ZZ32, ZZ32)\]): FullRange[\(ZZ32, ZZ32, ZZ32)\]
end

trait CompactFullScalarRange
    extends { FullScalarRange, CompactFullRange[\ZZ32\] }
    getter stride(): ZZ32
    getter size(): ZZ32
    getter isEmpty(): Boolean
    getter indexValuePairs(): Indexed[\(ZZ32, ZZ32), ZZ32\]
    getter indices(): Indexed[\ZZ32, ZZ32\]

    opr | self |: ZZ32
    opr [ i: ZZ32 ]: ZZ32
    opr IN(n: ZZ32, self): Boolean
    indexOf(n: ZZ32): Maybe[\ZZ32\]
    forward(): CompactFullScalarRange
    shiftLeft(amount: ZZ32): CompactFullScalarRange
    shiftRight(amount: ZZ32): CompactFullScalarRange
end

object CompactFullParScalarRange(l: ZZ32, r: ZZ32)
    extends CompactFullScalarRange
    getter lower(): ZZ32
    getter upper(): ZZ32
    getter left(): Just[\ZZ32\]
    getter right(): Just[\ZZ32\]

    seq(self): CompactFullSeqScalarRange
    generate[\T\](red: Reduction[\T\], body: (ZZ32 -> T)): T
    loop(body: (ZZ32 -> ())): ()
end

object CompactFullSeqScalarRange(l: ZZ32, r: ZZ32)
    extends { CompactFullScalarRange, SequentialGenerator[\ZZ32\] }
    getter lower(): ZZ32
    getter upper(): ZZ32
    getter left(): Just[\ZZ32\]
    getter right(): Just[\ZZ32\]

    generate[\T\](red: Reduction[\T\], body: (ZZ32 -> T)): T
    loop(body: (ZZ32 -> ())): ()
    map[\G\](f: ZZ32 -> G): SimpleMappedSeqIndexed[\ZZ32, G, ZZ32\]
end

combine2D(i: CompactFullScalarRange, j: CompactFullScalarRange): CompactFullRange2D

object CompactFullRange2D(l_i: ZZ32, l_j: ZZ32, r_i: ZZ32, r_j: ZZ32)
    extends { CompactFullRange[\(ZZ32, ZZ32)\], FullRange2D }
    getter lower(): (ZZ32, ZZ32)
    getter upper(): (ZZ32, ZZ32)
    getter bounds(): CompactFullRange2D
    getter indices(): Generator[\(ZZ32, ZZ32)\]
    getter indexValuePairs(): Generator[\((ZZ32, ZZ32), (ZZ32, ZZ32))\]
    getter stride(): (ZZ32, ZZ32)
    getter left(): Just[\(ZZ32, ZZ32)\]
    getter right(): Just[\(ZZ32, ZZ32)\]
    getter range1(): CompactFullScalarRange
    getter range2(): CompactFullScalarRange

    opr | self |: ZZ32
    recombine(i: FullScalarRange, j: FullScalarRange): FullRange2D
end

combine3D(i: CompactFullScalarRange, j: CompactFullScalarRange,
        k: CompactFullScalarRange): CompactFullRange3D

object CompactFullRange3D(l_i: ZZ32, l_j: ZZ32, l_k: ZZ32, r_i: ZZ32, r_j: ZZ32, r_k: ZZ32)
    extends { CompactFullRange[\(ZZ32, ZZ32, ZZ32)\], FullRange3D }
    getter lower(): (ZZ32, ZZ32, ZZ32)
    getter upper(): (ZZ32, ZZ32, ZZ32)
    getter bounds(): CompactFullRange3D
    getter indices(): Generator[\(ZZ32, ZZ32, ZZ32)\]
    getter indexValuePairs(): Generator[\((ZZ32, ZZ32, ZZ32), (ZZ32, ZZ32, ZZ32))\]
    getter stride(): (ZZ32, ZZ32, ZZ32)
    getter left(): Just[\(ZZ32, ZZ32, ZZ32)\]
    getter right(): Just[\(ZZ32, ZZ32, ZZ32)\]
    getter range1(): CompactFullScalarRange
    getter range2(): CompactFullScalarRange
    getter range3(): CompactFullScalarRange

    opr | self |: ZZ32
    recombine(i: FullScalarRange, j: FullScalarRange, k: FullScalarRange): FullRange3D
end

trait StridedFullScalarRange
    extends { FullScalarRange, StridedFullRange[\ZZ32\] }
    getter size(): ZZ32
    getter isEmpty(): Boolean
    getter indexValuePairs(): Indexed[\(ZZ32, ZZ32), ZZ32\]
    getter indices(): Indexed[\ZZ32, ZZ32\]

    opr | self |: ZZ32
    opr [ i: ZZ32 ]: ZZ32
    opr IN(n: ZZ32, self): Boolean
    indexOf(n: ZZ32): Maybe[\ZZ32\]
    forward(): FullScalarRange
end

object StridedFullParScalarRange(l: ZZ32, r: ZZ32, str: ZZ32)
    extends StridedFullScalarRange
    getter stride(): ZZ32
    getter left(): Just[\ZZ32\]
    getter right(): Just[\ZZ32\]

    seq(self): StridedFullSeqScalarRange
    generate[\T\](red: Reduction[\T\], body: (ZZ32 -> T)): T
    loop(body: (ZZ32 -> ())): ()
end

object StridedFullSeqScalarRange(l: ZZ32, r: ZZ32, str: ZZ32)
    extends { StridedFullScalarRange, SequentialGenerator[\ZZ32\] }
    getter stride(): ZZ32
    getter left(): Just[\ZZ32\]
    getter right(): Just[\ZZ32\]

    seq(self): StridedFullSeqScalarRange
    generate[\T\](red: Reduction[\T\], body: (ZZ32 -> T)): T
    loop(body: (ZZ32 -> ())): ()
    map[\G\](f: ZZ32 -> G): SimpleMappedSeqIndexed[\ZZ32, G, ZZ32\]
end

combine2D(i: FullScalarRange, j: FullScalarRange): FullRange2D

object StridedFullRange2D(l_i: ZZ32, l_j: ZZ32, r_i: ZZ32, r_j: ZZ32, str_i: ZZ32, str_j: ZZ32)
    extends { StridedFullRange[\(ZZ32, ZZ32)\], FullRange2D }
    getter bounds(): CompactFullRange2D
    getter indices(): Generator[\(ZZ32, ZZ32)\]
    getter indexValuePairs(): Generator[\((ZZ32, ZZ32), (ZZ32, ZZ32))\]
    getter stride(): (ZZ32, ZZ32)
    getter left(): Just[\(ZZ32, ZZ32)\]
    getter right(): Just[\(ZZ32, ZZ32)\]
    getter range1(): FullScalarRange
    getter range2(): FullScalarRange

    forward(): FullRange2D
    recombine(i: FullScalarRange, j: FullScalarRange): FullRange2D
end

combine3D(i: FullScalarRange, j: FullScalarRange, k: FullScalarRange): FullRange3D

object StridedFullRange3D(l_i: ZZ32, l_j: ZZ32, l_k: ZZ32, r_i: ZZ32, r_j: ZZ32, r_k: ZZ32, str_i: ZZ32,
        str_j: ZZ32,
        str_k: ZZ32)
    extends { StridedFullRange[\(ZZ32, ZZ32, ZZ32)\], FullRange3D }
    getter bounds(): CompactFullRange3D
    getter indices(): Generator[\(ZZ32, ZZ32, ZZ32)\]
    getter indexValuePairs(): Generator[\((ZZ32, ZZ32, ZZ32), (ZZ32, ZZ32, ZZ32))\]
    getter stride(): (ZZ32, ZZ32, ZZ32)
    getter left(): Just[\(ZZ32, ZZ32, ZZ32)\]
    getter right(): Just[\(ZZ32, ZZ32, ZZ32)\]
    getter range1(): FullScalarRange
    getter range2(): FullScalarRange
    getter range3(): FullScalarRange

    forward(): FullRange3D
    recombine(i: FullScalarRange, j: FullScalarRange, k: FullScalarRange): FullRange3D
end

fullScalarRange(l: ZZ32, r: ZZ32, str: ZZ32): FullScalarRange

fullScalarRangeInter(l: ZZ32, r: ZZ32, str: ZZ32, p: ZZ32): FullScalarRange

fullRange2D(l_i: ZZ32, l_j: ZZ32, r_i: ZZ32, r_j: ZZ32, str_i: ZZ32, str_j: ZZ32): FullRange2D

fullRange3D(l_i:ZZ32, l_j:ZZ32, l_k:ZZ32, r_i:ZZ32, r_j:ZZ32, r_k:ZZ32, str_i:ZZ32, str_j:ZZ32, str_k:ZZ32): FullRange3D
emptyScalarRange(): FullScalarRange

sized1Range(lo: ZZ32, ex: ZZ32): CompactFullParScalarRange

sized2Range(l1: ZZ32, l2: ZZ32, ex1: ZZ32, ex2: ZZ32): CompactFullRange2D

sized3Range(l1: ZZ32, l2: ZZ32, l3: ZZ32, ex1: ZZ32, ex2: ZZ32,
        ex3: ZZ32): CompactFullRange3D

bounded1Range(lo: ZZ32, hi: ZZ32): CompactFullParScalarRange

bounded2Range(l1: ZZ32, l2: ZZ32, hi1: ZZ32, hi2: ZZ32): CompactFullRange2D

bounded3Range(l1: ZZ32, l2: ZZ32, l3: ZZ32, hi1: ZZ32, hi2: ZZ32,
        hi3: ZZ32): CompactFullRange3D

left1Range(x: ZZ32): LeftRange[\ZZ32\]

left2Range(x: ZZ32, y: ZZ32): LeftRange[\(ZZ32, ZZ32)\]

left3Range(x: ZZ32, y: ZZ32, z: ZZ32): LeftRange[\(ZZ32, ZZ32, ZZ32)\]

extent1Range(x: ZZ32): RangeWithExtent[\ZZ32\]

extent2Range(x: ZZ32, y: ZZ32): RangeWithExtent[\(ZZ32, ZZ32)\]

extent3Range(x: ZZ32, y: ZZ32, z: ZZ32): RangeWithExtent[\(ZZ32, ZZ32, ZZ32)\]

right1Range(x: ZZ32): RightRange[\ZZ32\]

right2Range(x: ZZ32, y: ZZ32): RightRange[\(ZZ32, ZZ32)\]

right3Range(x: ZZ32, y: ZZ32, z: ZZ32): RightRange[\(ZZ32, ZZ32, ZZ32)\]

open1Range(x: ZZ32): OpenRange[\ZZ32\]

open2Range(x: ZZ32, y: ZZ32): OpenRange[\(ZZ32, ZZ32)\]

open3Range(x: ZZ32, y: ZZ32, z: ZZ32): OpenRange[\(ZZ32, ZZ32, ZZ32)\]

end

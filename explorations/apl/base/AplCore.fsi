(* AplCore -- the library half of the APL sub-language: the redesign of v1/base,
   promoted to the base on 2026-09-13.  APL's values are Fortress's
   own arrays: a scalar is an RR64, a vector an Array[\RR64,ZZ32\], a matrix an
   Array[\RR64,(ZZ32,ZZ32)\] (merged ledger row 57).  There is NO wrapper type
   and no runtime rank field: every primitive is an overload family whose
   PARAMETERS are RR64 / Vector[\RR64,s\] / Matrix[\RR64,r,c\] -- the only
   spelling on which Fortress will overload by rank, because Vector and Matrix
   reach the mutually excluding Rank1 and Rank2 while two instantiations of
   Array[\E,I\] do not exclude each other (r01_native.out, r02a_rankover.out).
   Results are the honest runtime-sized Array[\...\] types.

   Operators, not names, wherever the glyph is in the host operator table
   (Specification/appendices/operators.tex) -- and a top-level opr DOES cross
   an api boundary (r03_apiopr.out), which sharpens merged ledger row 30.
   Index origin 0. *)
api AplCore

(* numbers and formatting *)
aplInt(v: RR64): ZZ32
aplNegS(v: RR64): RR64
aplFmt(v: RR64): String
aplPad(s: String, w: ZZ32): String

(* constructors; aplCons builds a strand right to left *)
aplVec(n: ZZ32, f: ZZ32 -> RR64): Array[\RR64,ZZ32\]
aplMat(r: ZZ32, c: ZZ32, f: (ZZ32,ZZ32) -> RR64): Array[\RR64,(ZZ32,ZZ32)\]
aplZilde(): Array[\RR64,ZZ32\]
aplCons(x: RR64, y: RR64): Array[\RR64,ZZ32\]
aplCons[\nat s\](x: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]

(** The APL display, one overload per rank: a matrix is one line per row with
    every column padded to its own width. **)
aplShow(x: RR64): String
aplShow[\nat s\](v: Vector[\RR64,s\]): String
aplShow[\nat r, nat c\](m: Matrix[\RR64,r,c\]): String

(* ⍳ and ⍴ *)
aplIota(n: RR64): Array[\RR64,ZZ32\]
aplShapeOf(x: RR64): Array[\RR64,ZZ32\]
aplShapeOf[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplShapeOf[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]

(** Dyadic ⍴.  The rank of the result is the LENGTH of the left argument, so
    the grammar -- not the run time -- chooses between these: `n⍴x` expands to
    aplReshapeV and `r c⍴x` to aplReshapeM. **)
aplReshapeV(n: RR64, x: RR64): Array[\RR64,ZZ32\]
aplReshapeV[\nat s\](n: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplReshapeM(rw: RR64, cl: RR64, x: RR64): Array[\RR64,(ZZ32,ZZ32)\]
aplReshapeM[\nat s\](rw: RR64, cl: RR64, v: Vector[\RR64,s\]): Array[\RR64,(ZZ32,ZZ32)\]
aplReshapeM[\nat r, nat c\](rw: RR64, cl: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(* × dyadic elementwise and scalar-extended, monadic signum *)
opr ×[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr ×[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ×[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr ×(x: RR64): RR64
opr ×[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]

(* ÷ dyadic and monadic reciprocal *)
opr ÷(a: RR64, b: RR64): RR64
opr ÷[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr ÷[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ÷[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr ÷(x: RR64): RR64
opr ÷[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]

(* + and - : only the scalar extension, the equal-rank cases being the
   library's own Vector.+ / Matrix.+ *)
opr +[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr +[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr +[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr -[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr -[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]

(* APL's * is power *)
opr *(a: RR64, b: RR64): RR64
opr *[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr *[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]

(** The stand-ins for ⌈ and ⌊, which are ENCLOSERS in the host table and cannot
    be declared in either arity (r05b_ceil.out). **)
opr MAX[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr MAX[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr MIN[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr MIN[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplCeil(x: RR64): RR64
aplCeil[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplFloor(x: RR64): RR64
aplFloor[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]

(* ≡ match (shape first, hence the cross-rank overloads) and ≢ tally *)
opr ≡(a: RR64, b: RR64): RR64
opr ≡[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): RR64
opr ≡[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]): RR64
opr ≡[\nat s, nat r, nat c\](a: Vector[\RR64,s\], b: Matrix[\RR64,r,c\]): RR64
opr ≡[\nat s, nat r, nat c\](a: Matrix[\RR64,r,c\], b: Vector[\RR64,s\]): RR64
opr ≡[\nat s\](a: RR64, b: Vector[\RR64,s\]): RR64
opr ≡[\nat s\](a: Vector[\RR64,s\], b: RR64): RR64
opr ≢(x: RR64): RR64
opr ≢[\nat s\](v: Vector[\RR64,s\]): RR64
opr ≢[\nat r, nat c\](m: Matrix[\RR64,r,c\]): RR64

(* ⊃ first *)
opr ⊃(x: RR64): RR64
opr ⊃[\nat s\](v: Vector[\RR64,s\]): RR64
opr ⊃[\nat r, nat c\](m: Matrix[\RR64,r,c\]): RR64

(* ⌽ reverse (not in the host table, so named), ⊖ reverse-first (OMINUS, an
   operator), ⍉ transpose (not in the table; the matrix case is m.t()) *)
aplRev(x: RR64): RR64
aplRev[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplRev[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ⊖(x: RR64): RR64
opr ⊖[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ⊖[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
aplTrans(x: RR64): RR64
aplTrans[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplTrans[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(* , cannot be an operator in either arity (r05a_comma.out) *)
aplCat(a: RR64, b: RR64): Array[\RR64,ZZ32\]
aplCat[\nat s\](a: RR64, b: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplCat[\nat s\](a: Vector[\RR64,s\], b: RR64): Array[\RR64,ZZ32\]
aplCat[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplRavel(x: RR64): Array[\RR64,ZZ32\]
aplRavel[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplRavel[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]

(** APL's comparisons yield a 0/1 array, not a Boolean; the glyph can be
    redeclared with that result type (r06_hostops.out). **)
opr =[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr ≤[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]

(** Reductions.  f/ is the last axis, f⌿ the first; the bodies are the shipped
    SUM, PROD and BIG MAX, except aplDifLast, which folds by hand because -/ is
    not associative and has no big operator. **)
aplSumLast(x: RR64): RR64
aplSumLast[\nat s\](v: Vector[\RR64,s\]): RR64
aplSumLast[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
aplSumFirst(x: RR64): RR64
aplSumFirst[\nat s\](v: Vector[\RR64,s\]): RR64
aplSumFirst[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
aplProdLast(x: RR64): RR64
aplProdLast[\nat s\](v: Vector[\RR64,s\]): RR64
aplProdLast[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
aplMaxLast(x: RR64): RR64
aplMaxLast[\nat s\](v: Vector[\RR64,s\]): RR64
aplMaxLast[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
aplDifLast(x: RR64): RR64
aplDifLast[\nat s\](v: Vector[\RR64,s\]): RR64
aplDifLast[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]

(** Character arrays.  They cannot share the numeric overload family
    (r07_edge.out), so they carry their own names. **)
aplChars(s: String): Array[\Char,ZZ32\]
aplShowC[\nat s\](v: Array1[\Char,0,s\]): String
aplTallyC[\nat s\](v: Array1[\Char,0,s\]): RR64


(* ======================================================== rung 2: indexing ==
   Index origin 0 throughout.  The rule that decides every signature below is
   APL's own: the shape of an indexed result is the shapes of the indices
   catenated, so indexing by a SCALAR lowers the rank and indexing by a VECTOR
   keeps it -- and because RR64 excludes Array1 (FortressLibrary.fsi:1435,
   `excludes {Number, String}`), that is ordinary overloading on the index's
   rank, not a run-time shape test (s01_ix.out (b)).

   Two things the library gives for nothing, both measured in s01_ix.out:
   a whole row or column is a 6-line VIEW object that extends Vector and so
   carries the whole vector algebra (merged ledger row 55) while the library's
   own m[1,:] does not (row 54, re-confirmed over a runtime-sized matrix); and
   an APL array is MUTABLE through a Vector/Matrix parameter, so v[3] ← ¯1 is
   an in-place put -- no cell, no copy, and no rebinding, which the host would
   refuse anyway (apl gap row 29). **)

(** v[2] and v[1 3]: a scalar index gives a scalar, a vector index a vector.
    The contracts are APL's INDEX ERROR. **)
aplIx1[\nat s\](v: Vector[\RR64,s\], i: RR64): RR64
aplIx1[\nat s, nat t\](v: Vector[\RR64,s\], i: Vector[\RR64,t\]): Array[\RR64,ZZ32\]

(** m[1;2], m[1;1 2], m[1 2;0], m[;1 2]: all four index-rank combinations. **)
aplIx2[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: RR64, j: RR64): RR64
aplIx2[\nat r, nat c, nat t\](m: Matrix[\RR64,r,c\], i: RR64, j: Vector[\RR64,t\]):
        Array[\RR64,ZZ32\]
aplIx2[\nat r, nat c, nat s\](m: Matrix[\RR64,r,c\], i: Vector[\RR64,s\], j: RR64):
        Array[\RR64,ZZ32\]
aplIx2[\nat r, nat c, nat s, nat t\](m: Matrix[\RR64,r,c\], i: Vector[\RR64,s\],
        j: Vector[\RR64,t\]): Array[\RR64,(ZZ32,ZZ32)\]

(** An elided axis is all of that axis: m[1;] is a row, m[;1] a column.  With a
    scalar index the result is a zero-copy VIEW that is a Vector; with a vector
    index it is a fresh matrix. **)
aplIxRow[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: RR64): Vector[\RR64,c\]
aplIxRow[\nat r, nat c, nat s\](m: Matrix[\RR64,r,c\], i: Vector[\RR64,s\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplIxCol[\nat r, nat c\](m: Matrix[\RR64,r,c\], j: RR64): Vector[\RR64,r\]
aplIxCol[\nat r, nat c, nat t\](m: Matrix[\RR64,r,c\], j: Vector[\RR64,t\]):
        Array[\RR64,(ZZ32,ZZ32)\]

(** m[⊂1 1] -- one cell named by a coordinate vector -- and m[(0 0)(1 1)(2 2)],
    scatter indexing, whose coordinate list the grammar folds into a k×rank
    matrix with aplIdxOne/aplIdxCons.  No enclosure is ever a value. **)
aplPick[\nat s, nat t\](v: Vector[\RR64,s\], i: Vector[\RR64,t\]): RR64
aplPick[\nat r, nat c, nat t\](m: Matrix[\RR64,r,c\], i: Vector[\RR64,t\]): RR64
aplIdxOne[\nat s\](c: Vector[\RR64,s\]): Array[\RR64,(ZZ32,ZZ32)\]
aplIdxCons[\nat s, nat p, nat q\](c: Vector[\RR64,s\], rest: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplScatter[\nat r, nat c, nat p, nat q\](m: Matrix[\RR64,r,c\], cs: Matrix[\RR64,p,q\]):
        Array[\RR64,ZZ32\]

(** Squad ⌷.  The left argument's LENGTH decides the result's rank, exactly as
    dyadic ⍴'s does, so the grammar again reads it off the source: `1 1⌷m` fires
    aplSquad2 and `1⌷m` aplSquad1 (apl gap row 47).  (⊂1 2)⌷m selects leading-axis
    cells and keeps the rank. **)
aplSquad1[\nat s\](i: RR64, v: Vector[\RR64,s\]): RR64
aplSquad1[\nat r, nat c\](i: RR64, m: Matrix[\RR64,r,c\]): Vector[\RR64,c\]
aplSquad2[\nat r, nat c\](i: RR64, j: RR64, m: Matrix[\RR64,r,c\]): RR64
aplSquadEncl[\nat s, nat r, nat c\](i: Vector[\RR64,s\], m: Matrix[\RR64,r,c\]):
        Array[\RR64,(ZZ32,ZZ32)\]

(** ⍸ Where: the indices at which a Boolean vector is 1. **)
aplWhere[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]

(** Compress and Replicate.  sel/d is the last axis, sel⌿m the first; a count
    above 1 repeats, 0 drops, and a scalar count extends. **)
aplCompress[\nat s, nat t\](sel: Vector[\RR64,s\], d: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplCompress[\nat t\](sel: RR64, d: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplCompress[\nat s, nat r, nat c\](sel: Vector[\RR64,s\], m: Matrix[\RR64,r,c\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplCompressFirst[\nat s, nat t\](sel: Vector[\RR64,s\], d: Vector[\RR64,t\]):
        Array[\RR64,ZZ32\]
aplCompressFirst[\nat s, nat r, nat c\](sel: Vector[\RR64,s\], m: Matrix[\RR64,r,c\]):
        Array[\RR64,(ZZ32,ZZ32)\]

(** Indexed and selective assignment, in place.  Every one of these returns ()
    and mutates, which is why an APL variable can be an ordinary lambda
    parameter: the name keeps its binding and the array under it changes. **)
aplIxPut1[\nat s\](v: Vector[\RR64,s\], i: RR64, x: RR64): ()
aplIxPut1[\nat s, nat t\](v: Vector[\RR64,s\], i: Vector[\RR64,t\], x: RR64): ()
aplIxPut1[\nat s, nat t, nat u\](v: Vector[\RR64,s\], i: Vector[\RR64,t\],
        x: Vector[\RR64,u\]): ()
aplIxPut2[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: RR64, j: RR64, x: RR64): ()
aplIxPutRow[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: RR64, x: RR64): ()
aplIxPutRow[\nat r, nat c, nat s\](m: Matrix[\RR64,r,c\], i: RR64, x: Vector[\RR64,s\]): ()
aplIxPutCol[\nat r, nat c\](m: Matrix[\RR64,r,c\], j: RR64, x: RR64): ()
aplIxPutCol[\nat r, nat c, nat s\](m: Matrix[\RR64,r,c\], j: RR64, x: Vector[\RR64,s\]): ()
aplSelPut[\nat s, nat t, nat u\](d: Vector[\RR64,s\], sel: Vector[\RR64,t\],
        x: Vector[\RR64,u\]): ()
aplSelPut[\nat s, nat t\](d: Vector[\RR64,s\], sel: Vector[\RR64,t\], x: RR64): ()
aplDiagPut[\nat r, nat c, nat s\](m: Matrix[\RR64,r,c\], x: Vector[\RR64,s\]): ()

(* ======================================================= rung 3: glyphiary ==
   The chapter's primitives.  What decided the shapes: every glyph that is not a
   host ENCLOSER can be an opr in both arities -- ≠ < > ≥ ∧ ∨, a dyadic ⊖, and a
   prefix * (../rung-3/t01_ops.out) -- while ⌈ ⌊ | , stay named as in rung 1;
   the library already owns matrix + and matrix - (FortressLibrary.fsi:1581), so
   they are not redeclared here; and a (s,s) comparison is deliberately absent,
   leaving `2<3` the host's Boolean (gap row 41).

   Scalar extension is written once, in the six private zips of AplCore.fss, so
   each line below is a signature and a one-line body. **)

(** ⍸ Where is now COUNTS, not just 0/1: index k appears v[k] times. **)

(** ↑ Take and ↓ Drop.  A negative count works from the back, an overtake pads
    with 0, and the result keeps the argument's RANK -- 1↑m is a one-row matrix.
    The two-numeral forms `a b↑m` and `a b↓m` are chosen by the grammar, exactly
    as `r c⍴x` is (gap row 47). **)
aplTake(n: RR64, x: RR64): Array[\RR64,ZZ32\]
aplTake[\nat s\](n: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplTake[\nat r, nat c\](n: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
aplTake[\nat r, nat c\](rw: RR64, cl: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
aplDrop[\nat s\](n: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplDrop[\nat r, nat c\](n: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
aplDrop[\nat r, nat c\](rw: RR64, cl: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(** ⌽ rotates the last axis, ⊖ the first; a VECTOR left argument of ⊖ rotates
    each column by its own count. **)
aplRotate[\nat s\](n: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplRotate[\nat r, nat c\](n: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ⊖[\nat s\](n: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ⊖[\nat r, nat c\](n: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ⊖[\nat s, nat r, nat c\](ks: Vector[\RR64,s\], m: Matrix[\RR64,r,c\]):
        Array[\RR64,(ZZ32,ZZ32)\]

(** ⍳ Index of (not found is ≢⍺, here |v|) and ⍸ Interval index (a boundary goes
    to the higher bin, below the first bin is ¯1). **)
aplIndexOf[\nat s\](v: Vector[\RR64,s\], x: RR64): RR64
aplIndexOf[\nat s, nat t\](v: Vector[\RR64,s\], w: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplBin[\nat s\](v: Vector[\RR64,s\], x: RR64): RR64
aplBin[\nat s, nat t\](v: Vector[\RR64,s\], w: Vector[\RR64,t\]): Array[\RR64,ZZ32\]

(** | is a host encloser and cannot be an opr in either arity, so residue and
    magnitude are named; a|b is b modulo a and takes the sign of a. **)
aplResidue(a: RR64, b: RR64): RR64
aplResidue[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplResidue[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
aplResidue[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplResidue[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
aplResidue[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
aplAbs(x: RR64): RR64
aplAbs[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplAbs[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(** ∊ ∪ ∩ ~ .  Dyalog's Union keeps the left argument's duplicates. **)
aplIn[\nat s\](x: RR64, v: Vector[\RR64,s\]): RR64
aplIn[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplIn[\nat r, nat c\](x: RR64, m: Matrix[\RR64,r,c\]): RR64
aplEnlist(x: RR64): Array[\RR64,ZZ32\]
aplEnlist[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplEnlist[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
aplUnion[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplUnique[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplIntersect[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplWithout[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplWithout[\nat s\](a: Vector[\RR64,s\], x: RR64): Array[\RR64,ZZ32\]
aplNot(x: RR64): RR64
aplNot[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplNot[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(** , Catenate-last and ⍪ Catenate-first over the rank pairs the chapter uses;
    monadic ⍪ is Table. **)
aplCat[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplCat[\nat r, nat c, nat s\](m: Matrix[\RR64,r,c\], v: Vector[\RR64,s\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplCat[\nat r, nat c, nat s\](v: Vector[\RR64,s\], m: Matrix[\RR64,r,c\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplCat[\nat r, nat c\](m: Matrix[\RR64,r,c\], x: RR64): Array[\RR64,(ZZ32,ZZ32)\]
aplCatFirst[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
aplCatFirst[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplCatFirst[\nat r, nat c, nat s\](v: Vector[\RR64,s\], m: Matrix[\RR64,r,c\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplCatFirst[\nat r, nat c, nat s\](m: Matrix[\RR64,r,c\], v: Vector[\RR64,s\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplTable(x: RR64): Array[\RR64,(ZZ32,ZZ32)\]
aplTable[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,(ZZ32,ZZ32)\]
aplTable[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(** The six comparisons and the two connectives, each over the five array
    shapes.  (s,s) is absent on purpose. **)
opr =[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr =[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr =[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr =[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr =[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr ≠[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr ≠[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ≠[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr ≠[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr ≠[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ≠[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr <[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr <[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr <[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr <[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr <[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr <[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr ≤[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ≤[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr ≤[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr ≤[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ≤[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr >[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr >[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr >[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr >[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr >[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr >[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr ≥[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr ≥[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ≥[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr ≥[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr ≥[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ≥[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr ∧[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr ∧[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ∧[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr ∧[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr ∧[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ∧[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr ∨[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr ∨[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ∨[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr ∨[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr ∨[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ∨[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]

(** ⌈ ⌊ over the shapes rung 1 did not need, and the monadic pair on a matrix. **)
opr MAX[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr MAX[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr MAX[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr MAX[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr MIN[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr MIN[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr MIN[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr MIN[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
aplCeil[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
aplFloor[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(** Arithmetic over matrices: × ÷ * elementwise and scalar-extended, - and + in
    the one direction the library does not already give. **)
opr ×[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr ×[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ×[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr ×[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ÷[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr ÷[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr ÷[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr ÷[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr -[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr -[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr +[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr *[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]):
        Array[\RR64,(ZZ32,ZZ32)\]
opr *[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr *[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]

(** Monadic * is APL's exp and ⍟ is log, dyadic ⍟ log to a base. **)
opr *(x: RR64): RR64
opr *[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr *[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
aplLog(x: RR64): RR64
aplLog[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplLog[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
aplLog(b: RR64, x: RR64): RR64
aplLog[\nat s\](b: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplLog[\nat r, nat c\](b: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(** ⍋ ⍒ : the grades, stable, as a vector of indices. **)
aplGradeUp[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
aplGradeDown[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]

(** The reductions rung 1 left out: ⌊/ ⌊⌿ ⌈⌿ ×⌿ . **)
aplMinLast(x: RR64): RR64
aplMinLast[\nat s\](v: Vector[\RR64,s\]): RR64
aplMinLast[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
aplMinFirst(x: RR64): RR64
aplMinFirst[\nat s\](v: Vector[\RR64,s\]): RR64
aplMinFirst[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
aplMaxFirst(x: RR64): RR64
aplMaxFirst[\nat s\](v: Vector[\RR64,s\]): RR64
aplMaxFirst[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
aplProdFirst(x: RR64): RR64
aplProdFirst[\nat s\](v: Vector[\RR64,s\]): RR64
aplProdFirst[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]


(* ============================================ rung 4: dfns and operators ==
   A dfn is a ZERO-parameter lambda over a frame stack: the host refuses every
   nested re-declaration of a name (../rung-4/u01-u03), so ⍺ and ⍵ cannot be
   parameters once dfns nest.  aplCall pushes (f, ⍺, ⍵), calls f(), pops.
   Every APL function value has that shape, the glyph tables of AplSyntax
   included.  Rank 3 joins the dispatch family as Array3[\RR64,0,a,0,b,0,c\]
   (u07), a plane and a 1 0 2 axis order are views (u08), and the rank operator
   ⍤ decides its result's rank from the FIRST cell's result (u09).
   FORTRESS_THREADS=1 is assumed: the frame stack is one mutable object. **)

(** The frame stack.  aplAlpha's contract is APL's VALUE ERROR: reading ⍺ in a
    monadic call is a caller violation.  aplDefaultAlpha sets ⍺ only when it is
    absent, so a second `⍺ ←` has no effect, as in APL. **)
aplCall(f: Any, l: Any, r: Any): Any
aplCall1(f: Any, r: Any): Any
aplAlpha(): Any
aplOmega(): Any
aplSelf(): Any
aplHasAlpha(): Boolean
aplDefaultAlpha(e: Any): ()
aplDepth(): ZZ32
aplTruthy(c: Any): Boolean
aplBindLeft(f: Any, a: Any): ()->Any
aplPickAt[\nat s\](i: RR64, v: Vector[\RR64,s\]): RR64

(** APL's × between two scalars: the host library declares no `opr ×` at all. **)
opr ×(a: RR64, b: RR64): RR64

(** Rank 3.  The parameter type is Array3 itself -- there is no rank-3
    Vector/Matrix analogue -- and the result type the runtime-sized array. **)
aplArr3(d0: ZZ32, d1: ZZ32, d2: ZZ32, f: (ZZ32,ZZ32,ZZ32) -> RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
aplD0[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): ZZ32
aplD1[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): ZZ32
aplD2[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): ZZ32
aplShow[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): String
opr ≢[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): RR64
opr ⊃[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): RR64
aplShapeOf[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): Array[\RR64,ZZ32\]
aplRavel[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): Array[\RR64,ZZ32\]
aplReshape3(d0: RR64, d1: RR64, d2: RR64, x: RR64): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
aplReshape3[\nat s\](d0: RR64, d1: RR64, d2: RR64, v: Vector[\RR64,s\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
aplReshape3[\nat r, nat c\](d0: RR64, d1: RR64, d2: RR64, m: Matrix[\RR64,r,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
aplReshape3[\nat a, nat b, nat c\](d0: RR64, d1: RR64, d2: RR64,
        t: Array3[\RR64,0,a,0,b,0,c\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
aplReshapeM[\nat a, nat b, nat c\](rw: RR64, cl: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32)\]
aplReshapeV[\nat a, nat b, nat c\](nn: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,ZZ32\]

(** 1 0 2⍉t as a VIEW; every other permutation is out of scope and the contract
    says so. **)
aplPerm[\nat a, nat b, nat c\](x: RR64, y: RR64, z: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array3[\RR64,0,b,0,a,0,c\]

(** Elementwise arithmetic and comparison over rank 3, the three shapes each. **)
opr ×[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ×[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ×[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ÷[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ÷[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ÷[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr +[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr +[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr +[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr -[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr -[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr -[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr *[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr *[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr *[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr MAX[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr MAX[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr MAX[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr MIN[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr MIN[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr MIN[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr =[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr =[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr =[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≠[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≠[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≠[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr <[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr <[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr <[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≤[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≤[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≤[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr >[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr >[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr >[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≥[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a1,0,b1,0,c1\],
        y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≥[\nat a, nat b, nat c\](s: RR64, t: Array3[\RR64,0,a,0,b,0,c\]):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ≥[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], s: RR64):
        Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr *[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr ÷[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
aplLog[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

(** The rank operator ⍤, both valences.  The result's rank is decided by the
    FIRST cell's result (u09); a later cell of a different shape is APL's
    LENGTH ERROR, a contract violation.  The result type is Any because the
    rank is a run-time fact -- the caller's aplShow dispatches on it. **)
aplRank1(f: Any, x: RR64): Any
aplRank1[\nat s\](f: Any, v: Vector[\RR64,s\]): Any
aplRank1[\nat r, nat c\](f: Any, m: Matrix[\RR64,r,c\]): Any
aplRank1[\nat a, nat b, nat c\](f: Any, t: Array3[\RR64,0,a,0,b,0,c\]): Any
aplRank2[\nat r, nat c\](f: Any, m: Matrix[\RR64,r,c\]): Any
aplRank2[\nat a, nat b, nat c\](f: Any, t: Array3[\RR64,0,a,0,b,0,c\]): Any
aplRank1[\nat s, nat t\](f: Any, l: Vector[\RR64,s\], r: Vector[\RR64,t\]): Any
aplRank1[\nat s\](f: Any, l: RR64, r: Vector[\RR64,s\]): Any
aplRank1[\nat s, nat r2, nat c2\](f: Any, l: Vector[\RR64,s\], m: Matrix[\RR64,r2,c2\]): Any
aplRank1[\nat r2, nat c2\](f: Any, l: RR64, m: Matrix[\RR64,r2,c2\]): Any
aplRank1[\nat p, nat q, nat r2, nat c2\](f: Any, a: Matrix[\RR64,p,q\],
        b: Matrix[\RR64,r2,c2\]): Any
aplRank1[\nat s, nat a, nat b, nat c\](f: Any, l: Vector[\RR64,s\],
        t: Array3[\RR64,0,a,0,b,0,c\]): Any
aplRank1[\nat a, nat b, nat c\](f: Any, l: RR64, t: Array3[\RR64,0,a,0,b,0,c\]): Any
aplRank2[\nat p, nat q, nat r2, nat c2\](f: Any, a: Matrix[\RR64,p,q\],
        b: Matrix[\RR64,r2,c2\]): Any
aplRank2[\nat p, nat q, nat a, nat b, nat c\](f: Any, l: Matrix[\RR64,p,q\],
        t: Array3[\RR64,0,a,0,b,0,c\]): Any
aplRank2[\nat a, nat b, nat c\](f: Any, l: RR64, t: Array3[\RR64,0,a,0,b,0,c\]): Any
aplRank2[\nat a1, nat b1, nat c1, nat a2, nat b2, nat c2\](f: Any,
        x: Array3[\RR64,0,a1,0,b1,0,c1\], y: Array3[\RR64,0,a2,0,b2,0,c2\]): Any

end

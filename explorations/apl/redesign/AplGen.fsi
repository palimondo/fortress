(* AplGen -- the library half of the APL redesign.  APL's values are Fortress's
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
api AplGen

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

end

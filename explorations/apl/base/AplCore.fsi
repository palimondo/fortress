(* AplCore -- the library half of APL in Fortress: one array type and the
   primitives of chapter 1 of "Learning APL", as plain functions so that they
   cross the api boundary (a top-level opr does not -- merged ledger row 30).
   Grown from explorations/apl-probes/d20_apl.fss.

   Index origin is 0, as the chapter sets it with its first line, ⎕IO ← 0. *)
api AplCore

import List.{...}

(** A simple numeric APL array: a shape vector and the elements in row-major
    order.  Rank 0 is a scalar (empty shape, one element); rank 1 a vector.
    %asString% is the APL display: one line per row, columns right-aligned. **)
value object AplArr(shape: List[\ZZ32\], data: List[\RR64\])
    getter rank(): ZZ32
    getter asString(): String
end

(** The index origin this library counts from: 0, as the chapter sets it. **)
aplOrigin(): ZZ32

(** %aplFmt% prints an integral value without a fractional part, so that an
    array of RR64 displays as APL's integers. **)
aplFmt(v: RR64): String
aplShow(a: AplArr): String

aplScalar(v: RR64): AplArr
aplZilde(): AplArr
aplVec(d: List[\RR64\]): AplArr

(* the primitives, each also reachable by name from ordinary Fortress *)
aplIota(a: AplArr): AplArr
aplShapeOf(a: AplArr): AplArr
aplReshape(s: AplArr, a: AplArr): AplArr
aplTally(a: AplArr): AplArr
aplMatch(a: AplArr, b: AplArr): AplArr
aplFirst(a: AplArr): AplArr
aplRavel(a: AplArr): AplArr
aplCat(a: AplArr, b: AplArr): AplArr
aplReverse(a: AplArr): AplArr
aplReverseFirst(a: AplArr): AplArr
aplTranspose(a: AplArr): AplArr
aplNegate(a: AplArr): AplArr

(* what the grammar's transformers call: a glyph name and its arguments *)
aplMon(f: String, a: AplArr): AplArr
aplDy(f: String, a: AplArr, b: AplArr): AplArr
aplRed(f: String, axis: String, a: AplArr): AplArr

(* ------------------------------------------------- rung 2: indexing ----- *)

(** The index vector of a whole axis of length %n%: 0 1 … n-1, which is what an
    elided axis in v[…;…] means. **)
aplAxisIx(n: ZZ32): AplArr

(** Bracket indexing on the right of an expression.  The shape of the result is
    the shapes of the index expressions concatenated, so m[1;1] is a scalar,
    m[1;] and m[;1] are vectors, and v[5 2] is a vector: APL's own rule. **)
aplIx1(a: AplArr, i: AplArr): AplArr
aplIx2(a: AplArr, i: AplArr, j: AplArr): AplArr
aplIxRow(a: AplArr, i: AplArr): AplArr
aplIxCol(a: AplArr, j: AplArr): AplArr

(** Indexed assignment.  AplArr is a value object, so these return an updated
    copy which the caller stores back into the workspace. **)
aplIxSet1(a: AplArr, i: AplArr, v: AplArr): AplArr
aplIxSet2(a: AplArr, i: AplArr, j: AplArr, v: AplArr): AplArr
aplIxSetRow(a: AplArr, i: AplArr, v: AplArr): AplArr
aplIxSetCol(a: AplArr, j: AplArr, v: AplArr): AplArr

(** Selective assignment, one function per invertible expression: the compress
    form (select/data) ← … and the main-diagonal form (0 0⍉m) ← … . **)
aplSelSet(a: AplArr, sel: AplArr, v: AplArr): AplArr
aplDiagSet(a: AplArr, v: AplArr): AplArr

(** Scatter indexing.  m[⊂1 1] picks one cell by a coordinate vector; the
    coordinates of m[(0 0)(1 1)] are collected into a k×rank matrix by
    aplIdxOne/aplIdxCons, so no boxed element type is needed. **)
aplPick(a: AplArr, c: AplArr): AplArr
aplIdxOne(v: AplArr): AplArr
aplIdxCons(v: AplArr, rest: AplArr): AplArr
aplScatter(a: AplArr, cs: AplArr): AplArr

(** Squad ⌷: leading-axis indexing.  aplSquadEncl is the (⊂1 2)⌷m form, whose
    enclosure the grammar absorbs. **)
aplSquad(i: AplArr, a: AplArr): AplArr
aplSquadEncl(i: AplArr, a: AplArr): AplArr

(** ⍸ Where: the indices at which a boolean vector is 1. **)
aplWhere(a: AplArr): AplArr

(** Compress and Replicate, sel/a and sel⌿a. **)
aplCompress(sel: AplArr, a: AplArr): AplArr
aplCompressFirst(sel: AplArr, a: AplArr): AplArr

(** The high-minus literal ¯1. **)
aplScalarNeg(v: RR64): AplArr

(** The workspace: APL's own variables, since a template can expand to a call
    but not to a binding (gap row 8).  aplSet returns the value it stored, so
    that v ← 1 2 3 is an expression as it is in APL. **)
aplSet(n: String, v: AplArr): AplArr
aplGet(n: String): AplArr
aplWsClear(): ()

end

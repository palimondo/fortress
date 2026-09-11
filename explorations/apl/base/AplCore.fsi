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

end

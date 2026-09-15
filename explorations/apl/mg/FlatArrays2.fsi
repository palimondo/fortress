(* FlatArrays2 -- the array vocabulary of the focused base.  It is the sketch of
   the vocabulary review (explorations/run-c4/probes/vocabulary/REPORT.md,
   FlatArrays2.fsi there) with the sizes put back into the types: every product
   and every lift whose mathematics requires two shapes to agree says so with
   SHARED nat names, which is how the shipped library says it
   (opr DOT[\T, nat n, nat m, nat p\](a: Matrix[\T,n,m\], b: Matrix[\T,m,p\])).
   A nat that constrains nothing is not written, as the review found: a lone
   array parameter carries its shape at run time and the view objects take it
   from reflect.  The element type is generic by its bound wherever nothing
   forces RR64 (review probe v04, ledger row 287) and the index type is generic
   wherever nothing dispatches on rank (row 161).
   Against C4's FlatArrays (explorations/run-c4/src/FlatArrays.fsi): the 13
   elementwise operators are element-generic, the nats that dispatched nothing
   are gone from view, gather, onehot and the rank-3 spellings, the exported
   row and row3 are gone (the row view is private here), and the monadic row
   lift is one index-generic declaration with a typecase instead of two.
   Kept from C4 and not from the sketch: the four constructors, because
   FlatData2, AplMg, the model and the check call them; the matrix transpose,
   because the grammar's ⍉ rule writes a call and a postfix ^T may not follow
   one (rows 144, 158, 293); and the Diag product operator, because the
   diagonal as a Matrix view costs 13-54x on its line (row 291).
   35 declarations against C4's 38 and the sketch's 28. *)
api FlatArrays2

(* ------------------------------------------------------- constructors ----
   the library's own array calls under a name; kept because FlatData2's
   loaders, AplMg's glue, the model and the check call them *)
vec(n: ZZ32, f: ZZ32 -> RR64): Array[\RR64,ZZ32\]
zeros(n: ZZ32): Array[\RR64,ZZ32\]
keys(n: ZZ32, f: ZZ32 -> ZZ32): Array[\ZZ32,ZZ32\]
mat(r: ZZ32, c: ZZ32, f: (ZZ32,ZZ32) -> RR64): Array[\RR64,(ZZ32,ZZ32)\]

(* ------------------------------------------- the elementwise algebra -----
   One declaration per operator, generic in the element type by its bound and
   in the index type: a vector (I = ZZ32), a matrix ((ZZ32,ZZ32)) and a rank-3
   array ((ZZ32,ZZ32,ZZ32)) of any element type of the numeric tower share it.
   No nat here: the shared I asserts what a shared index type can assert, that
   the two arrays are of one rank and one element type; the SIZES are not in
   the index type, and stating them would mean one declaration per rank, which
   the Meet Rule refuses beside the generic one (ledger row 159, NOTES-swap.md).
   + and - between two arrays of one shape stay the library's (AdditiveGroup),
   and a scalar times an array stays the library's juxtaposition. *)
opr +[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]
opr +[\T extends Number, I\](s: T, a: Array[\T,I\]): Array[\T,I\]
opr -[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]
opr -[\T extends Number, I\](s: T, a: Array[\T,I\]): Array[\T,I\]
opr ×[\T extends Number, I\](a: Array[\T,I\], b: Array[\T,I\]): Array[\T,I\]
opr /[\T extends Number, I\](a: Array[\T,I\], b: Array[\T,I\]): Array[\T,I\]
opr /[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]
opr MAX[\T extends Number, I\](s: T, a: Array[\T,I\]): Array[\T,I\]
opr MAX[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]
(* a comparison on an array is a 0/1 array, the APL convention *)
opr >[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\RR64,I\]
opr SQRT[\T extends Number, I\](a: Array[\T,I\]): Array[\RR64,I\]
exp[\T extends Number, I\](a: Array[\T,I\]): Array[\RR64,I\]
log[\T extends Number, I\](a: Array[\T,I\]): Array[\RR64,I\]

(* ----------------------------------------------------- the diagonal ------
   diag(v) m scales the rows of m: the Dyalog's v ×⍤0 1 m.  The s of the
   diagonal IS the row count of the matrix: the two nats of the product are
   [\s, c\] and not C4's [\s, r, c\], so a diagonal of another length is not a
   candidate at all.  The diagonal stays its own object and the product stays
   an operator: as a Matrix view it needs no operator and costs 13x at n = 16
   and 54x at n = 64 (review probe v07, ledger row 291). *)
object Diag[\nat s\](d: Vector[\RR64,s\]) end
diag[\nat s\](v: Vector[\RR64,s\]): Diag[\s\]
opr juxtaposition[\nat s, nat c\](dg: Diag[\s\], m: Matrix[\RR64,s,c\]): Array[\RR64,(ZZ32,ZZ32)\]

(* ------------------------------------------------------- transposes ------
   Functions, because an api cannot declare a postfix operator (row 133) and
   ^T may not follow a call (rows 144, 158); the model declares ^T over these.
   The nats spell the result's shape (c x r from r x c), and the Array3
   spelling of the rank-3 member is forced by the family: Array[\RR64,
   (ZZ32,ZZ32,ZZ32)\] beside Matrix[\RR64,r,c\] has no excluding pair and is
   rejected at declaration (review probe v18, row 289), while Rank3 excludes
   Rank2.  Neither asserts an agreement -- one array argument each -- they
   assert the shape of the result. *)
transpose[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Matrix[\RR64,c,r\]
transpose[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): Array3[\RR64,0,a,0,c,0,b\]

(* ------------------------------------------------------------ views -----
   zero-copy, readable and writable.  No nat on any of these: the shapes are
   run-time arguments or come from the array itself through reflect, and there
   is nothing for a nat to agree with.  What each one is: the (nr x nc) matrix
   at off in a flat vector; a (positions x heads dim) activation as heads
   planes and back; a plane of a rank-3 array. *)
view(p: Array[\RR64,ZZ32\], off: ZZ32, nr: ZZ32, nc: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
heads(base: Array[\RR64,(ZZ32,ZZ32)\], p: ZZ32, nh: ZZ32, k: ZZ32): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
unheads(t: Array[\RR64,(ZZ32,ZZ32,ZZ32)\], nh: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
plane(t: Array[\RR64,(ZZ32,ZZ32,ZZ32)\], p: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]

(* ------------------------------------------------- rank-3 algebra --------
   +.×⍤2 : the library's product on every pair of planes.  The nats assert the
   whole of what the mathematics requires: the SAME plane count p on both
   arguments, and the inner size d shared, x's columns against y's rows.  Only
   the free sizes n and m are not shared.  C4 writes this with six independent
   nats, which assert nothing. *)
opr juxtaposition[\nat p, nat n, nat d, nat m\](x: Array3[\RR64,0,p,0,n,0,d\], y: Array3[\RR64,0,p,0,d,0,m\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
(* m +⍤2 t : a matrix added to every plane.  The nats assert that the matrix's
   shape IS the shape of a plane, n x d against p planes of n x d; C4 writes
   five independent nats. *)
opr +[\nat p, nat n, nat d\](m: Matrix[\RR64,n,d\], t: Array3[\RR64,0,p,0,n,0,d\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

(* -------------------------------------------------- the row lift ---------
   f⍤1 : f on every row, the results stacked; over a rank-3 array the rows are
   those of every plane.  The MONADIC form has one array argument and nothing
   to agree with, so it carries no nat and tells the two ranks apart at run
   time with one typecase (review probe v05).  The DYADIC form pairs the rows
   of two arrays, so their shapes must agree: that is what the shared nats say,
   and it takes the rank pair back, because a shape can only be named inside a
   rank.  C4 writes the dyadic pair with four and six independent nats. *)
rows[\I\](f: Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\], a: Array[\RR64,I\]): Array[\RR64,I\]
rows[\nat n, nat d\](f: (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\]) -> Array[\RR64,ZZ32\], x: Matrix[\RR64,n,d\], y: Matrix[\RR64,n,d\]): Array[\RR64,(ZZ32,ZZ32)\]
rows[\nat p, nat n, nat d\](f: (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\]) -> Array[\RR64,ZZ32\], x: Array3[\RR64,0,p,0,n,0,d\], y: Array3[\RR64,0,p,0,n,0,d\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

(* ----------------------------------------------------------- keys -------
   m[ks;] : the rows of m at the keys.  No agreement: the keys index the rows,
   their count is free, so no nat.  Generic in the element type, because the
   corpus's keys are ZZ32 and the embedding rows are RR64. *)
gather[\T extends Number\](m: Array[\T,(ZZ32,ZZ32)\], ks: Array[\ZZ32,ZZ32\]): Array[\T,(ZZ32,ZZ32)\]
(* ks ∘.= ⍳width, as 0/1: one row per key, width free; no agreement, no nat *)
onehot(ks: Array[\ZZ32,ZZ32\], width: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
(* ks ⌷⍤0 1 m : element ks[i] of row i, so there is one key PER ROW of m --
   the shared k asserts it; C4 writes three independent nats *)
pick[\nat k, nat c\](m: Matrix[\RR64,k,c\], ks: Vector[\ZZ32,k\]): Array[\RR64,ZZ32\]
(* ⊃,/,¨ : the matrices ravelled and catenated into one vector, in order *)
flat(ms: Array[\RR64,(ZZ32,ZZ32)\]...): Array[\RR64,ZZ32\]

end

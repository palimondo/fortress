(* FlatArrays2 -- the vocabulary of Run C4 with every habit removed that the
   probes beside this file (REPORT.md) could replace by a library mechanism or
   a more general declaration.  The element type is generic by its bound where
   nothing forces RR64, the index type generic where nothing forces a rank,
   nat parameters appear only where a view object needs them, and the rank
   dispatch of the row lift is one typecase.  What stays hand-written is what
   the shipped library does not have: reshape (view, heads, unheads), planes
   and plane transposes of a rank-3 array, a batched product, a plane-wise
   sum, a row lift, gather, outer-product equality, pick and ravel-catenate. *)
api FlatArrays2

(* the elementwise algebra, one declaration per operator, for every element
   type in the numeric tower and every rank; + and - between two arrays of one
   shape are the library's (AdditiveGroup) at rank 1 and 2 and no rank-3 form
   is used *)
opr +[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]
opr +[\T extends Number, I\](s: T, a: Array[\T,I\]): Array[\T,I\]
opr -[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]
opr -[\T extends Number, I\](s: T, a: Array[\T,I\]): Array[\T,I\]
opr ×[\T extends Number, I\](a: Array[\T,I\], b: Array[\T,I\]): Array[\T,I\]
opr /[\T extends Number, I\](a: Array[\T,I\], b: Array[\T,I\]): Array[\T,I\]
opr /[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]
opr MAX[\T extends Number, I\](s: T, a: Array[\T,I\]): Array[\T,I\]
opr MAX[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]
(* a comparison on an array is a 0/1 array *)
opr >[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\RR64,I\]
opr SQRT[\T extends Number, I\](a: Array[\T,I\]): Array[\RR64,I\]
exp[\T extends Number, I\](a: Array[\T,I\]): Array[\RR64,I\]
log[\T extends Number, I\](a: Array[\T,I\]): Array[\RR64,I\]
(* the inner product of any two rank-1 arrays, so the library's own row view
   m[i,:] carries the vector functions *)
opr DOT(a: Array[\RR64,ZZ32\], b: Array[\RR64,ZZ32\]): RR64

(* diag(v) m: a diagonal is a Matrix view, so its product is the library's *)
object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\] end
diag[\nat s\](v: Vector[\RR64,s\]): Diag[\s\]

(* views, zero-copy, readable and writable: the (nr x nc) matrix at off in a
   flat vector; a (docs.positions x heads.dim) activation as docs.heads planes
   and back; a plane of a rank-3 array; every plane transposed *)
view(p: Array[\RR64,ZZ32\], off: ZZ32, nr: ZZ32, nc: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
heads(base: Array[\RR64,(ZZ32,ZZ32)\], p: ZZ32, nh: ZZ32, k: ZZ32): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
unheads(t: Array[\RR64,(ZZ32,ZZ32,ZZ32)\], nh: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
plane(t: Array[\RR64,(ZZ32,ZZ32,ZZ32)\], p: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
transpose(t: Array[\RR64,(ZZ32,ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

(* the batched product and the plane-wise sum *)
opr juxtaposition(x: Array[\RR64,(ZZ32,ZZ32,ZZ32)\], y: Array[\RR64,(ZZ32,ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr +[\nat r, nat c\](m: Matrix[\RR64,r,c\], t: Array[\RR64,(ZZ32,ZZ32,ZZ32)\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

(* the row lift, monadic and dyadic, over a matrix or over every plane of a
   rank-3 array: the rank is told apart at run time *)
rows[\I\](f: Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\], a: Array[\RR64,I\]): Array[\RR64,I\]
rows[\I\](f: (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\]) -> Array[\RR64,ZZ32\], x: Array[\RR64,I\], y: Array[\RR64,I\]): Array[\RR64,I\]

(* keys *)
gather[\T\](m: Array[\T,(ZZ32,ZZ32)\], ks: Array[\ZZ32,ZZ32\]): Array[\T,(ZZ32,ZZ32)\]
onehot(ks: Array[\ZZ32,ZZ32\], width: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
pick(m: Array[\RR64,(ZZ32,ZZ32)\], ks: Array[\ZZ32,ZZ32\]): Array[\RR64,ZZ32\]
flat(ms: Array[\RR64,(ZZ32,ZZ32)\]...): Array[\RR64,ZZ32\]

end

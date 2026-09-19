(* FlatArrays -- the array vocabulary of Run C4: the elementwise algebra
   with scalar extension as operators over the library's own arrays, views (a
   matrix over a slice of a flat vector, a row, the per-head planes of an
   activation and back), the row lift, a batched product, and the key
   operations.  See explorations/run-c4/design.md. *)
api FlatArrays

(* constructors *)
vec(n: ZZ32, f: ZZ32 -> RR64): Array[\RR64,ZZ32\]
zeros(n: ZZ32): Array[\RR64,ZZ32\]
keys(n: ZZ32, f: ZZ32 -> ZZ32): Array[\ZZ32,ZZ32\]
mat(r: ZZ32, c: ZZ32, f: (ZZ32,ZZ32) -> RR64): Array[\RR64,(ZZ32,ZZ32)\]

(* the elementwise algebra beyond the library's + - MIN MAX scalar extension, one declaration per operator for every rank *)
opr ×[\I\](a: Array[\RR64,I\], b: Array[\RR64,I\]): Array[\RR64,I\]
opr /[\I\](a: Array[\RR64,I\], b: Array[\RR64,I\]): Array[\RR64,I\]
opr /[\I\](a: Array[\RR64,I\], s: RR64): Array[\RR64,I\]
opr >[\I\](a: Array[\RR64,I\], s: RR64): Array[\RR64,I\]
opr SQRT[\I\](a: Array[\RR64,I\]): Array[\RR64,I\]
exp[\I\](a: Array[\RR64,I\]): Array[\RR64,I\]
log[\I\](a: Array[\RR64,I\]): Array[\RR64,I\]
(* diag(v) m scales the rows of m: a read-only Matrix view, the product the library's *)
object Diag[\nat s\](d: Vector[\RR64,s\]) extends Matrix[\RR64,s,s\] end
diag[\nat s\](v: Vector[\RR64,s\]): Diag[\s\]

(* transposes, as views: of a matrix, and of every plane of a rank-3 array.
   Functions, because an API cannot declare a postfix operator (ledger row 133);
   the model declares ^T over them *)
transpose[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Matrix[\RR64,c,r\]
transpose[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\]): Array3[\RR64,0,a,0,c,0,b\]

(* views, all zero-copy, readable and writable *)
view[\nat s\](p: Vector[\RR64,s\], off: ZZ32, nr: ZZ32, nc: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
row[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: ZZ32): Array[\RR64,ZZ32\]
row3[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], p: ZZ32, i: ZZ32): Array[\RR64,ZZ32\]
heads[\nat br, nat bc\](base: Matrix[\RR64,br,bc\], p: ZZ32, nh: ZZ32, k: ZZ32): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
unheads[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], nh: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
plane[\nat a, nat b, nat c\](t: Array3[\RR64,0,a,0,b,0,c\], p: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]

(* the batched product and the plane-wise sum *)
opr juxtaposition[\nat a, nat b, nat c, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a,0,b,0,c\], y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr +[\nat r, nat c, nat a, nat b, nat d\](m: Matrix[\RR64,r,c\], t: Array3[\RR64,0,a,0,b,0,d\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

(* the row lift, monadic and dyadic, over a matrix and over a rank-3 array *)
rows[\nat r, nat c\](f: Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\], m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
rows[\nat r, nat c, nat r2, nat c2\](f: (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\]) -> Array[\RR64,ZZ32\], x: Matrix[\RR64,r,c\], y: Matrix[\RR64,r2,c2\]): Array[\RR64,(ZZ32,ZZ32)\]
rows[\nat a, nat b, nat c\](f: Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\], t: Array3[\RR64,0,a,0,b,0,c\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
rows[\nat a, nat b, nat c, nat a2, nat b2, nat c2\](f: (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\]) -> Array[\RR64,ZZ32\], x: Array3[\RR64,0,a,0,b,0,c\], y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

(* keys *)
gather[\T extends Number, nat r, nat c, nat k\](m: Matrix[\T,r,c\], ks: Vector[\ZZ32,k\]): Array[\T,(ZZ32,ZZ32)\]
onehot[\nat k\](ks: Vector[\ZZ32,k\], width: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
pick[\nat r, nat c, nat k\](m: Matrix[\RR64,r,c\], ks: Vector[\ZZ32,k\]): Array[\RR64,ZZ32\]
flat(ms: Array[\RR64,(ZZ32,ZZ32)\]...): Array[\RR64,ZZ32\]

end

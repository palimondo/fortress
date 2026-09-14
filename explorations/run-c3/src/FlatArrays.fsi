(* FlatArrays -- the array vocabulary for MicroGptFlat (Run C3): views, the
   elementwise algebra with scalars, the row lift, keys, transpose. *)
api FlatArrays

vec(n: ZZ32, f: ZZ32 -> RR64): Array[\RR64,ZZ32\]
zeros(n: ZZ32): Array[\RR64,ZZ32\]
keys(n: ZZ32, f: ZZ32 -> ZZ32): Array[\ZZ32,ZZ32\]
mat(r: ZZ32, c: ZZ32, f: (ZZ32,ZZ32) -> RR64): Array[\RR64,(ZZ32,ZZ32)\]
zerosM(r: ZZ32, c: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]

view[\nat s\](p: Vector[\RR64,s\], off: ZZ32, nr: ZZ32, nc: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
block[\nat br, nat bc\](base: Matrix[\RR64,br,bc\], r0: ZZ32, c0: ZZ32, nr: ZZ32, nc: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
row[\nat r, nat c\](m: Matrix[\RR64,r,c\], i: ZZ32): Vector[\RR64,c\]

opr ×[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr ×[\nat r, nat c, nat p, nat q\](a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]): Array[\RR64,(ZZ32,ZZ32)\]
opr /[\nat s, nat t\](a: Vector[\RR64,s\], b: Vector[\RR64,t\]): Array[\RR64,ZZ32\]
opr /[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr /[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]
opr +[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr +[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr -[\nat s\](v: Vector[\RR64,s\], a: RR64): Array[\RR64,ZZ32\]
opr SQRT[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
exp[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
log[\nat s\](v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr MAX[\nat r, nat c\](a: RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr >[\nat r, nat c\](m: Matrix[\RR64,r,c\], a: RR64): Array[\RR64,(ZZ32,ZZ32)\]

rows[\nat r, nat c\](f: Array[\RR64,ZZ32\] -> Array[\RR64,ZZ32\], m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
rows[\nat r, nat c\](f: Array[\RR64,ZZ32\] -> RR64, m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]
rows[\nat r, nat c, nat p, nat q\](f: (Array[\RR64,ZZ32\], Array[\RR64,ZZ32\]) -> Array[\RR64,ZZ32\],
        a: Matrix[\RR64,r,c\], b: Matrix[\RR64,p,q\]): Array[\RR64,(ZZ32,ZZ32)\]
rows[\nat n, nat r, nat c\](f: (RR64, Array[\RR64,ZZ32\]) -> Array[\RR64,ZZ32\],
        v: Vector[\RR64,n\], m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]

cells(f: (Array[\RR64,(ZZ32,ZZ32)\], Array[\RR64,(ZZ32,ZZ32)\]) -> Array[\RR64,(ZZ32,ZZ32)\],
      a: Array[\RR64,(ZZ32,ZZ32)\], b: Array[\RR64,(ZZ32,ZZ32)\], cr: ZZ32, nc: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
cells(f: (Array[\RR64,(ZZ32,ZZ32)\], Array[\RR64,(ZZ32,ZZ32)\], Array[\RR64,(ZZ32,ZZ32)\]) -> Array[\RR64,(ZZ32,ZZ32)\],
      a: Array[\RR64,(ZZ32,ZZ32)\], b: Array[\RR64,(ZZ32,ZZ32)\], c: Array[\RR64,(ZZ32,ZZ32)\], cr: ZZ32, nc: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]

gather[\nat r, nat c, nat k\](m: Matrix[\RR64,r,c\], ks: Vector[\ZZ32,k\]): Array[\RR64,(ZZ32,ZZ32)\]
onehot[\nat k\](ks: Vector[\ZZ32,k\], width: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
pick[\nat r, nat c, nat k\](m: Matrix[\RR64,r,c\], ks: Vector[\ZZ32,k\]): Array[\RR64,ZZ32\]
end

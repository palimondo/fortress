(* AplMg -- the glue of the focused base: the typed host entries the glyph
   patterns of AplMgSyntax expand to that Run C4's FlatArrays does not already
   spell.  Ten declarations, nothing more; FlatArrays is imported unchanged and
   supplies everything else (transpose, rows, gather over a matrix, onehot,
   pick, diag, flat, heads, unheads, view, the elementwise algebra, the batched
   product).  See DESIGN.md and AplMgSyntax.fsi beside this file. *)
api AplMg

(* ≢v on the batch key vector -- Dyalog L13, |b| at MicroGptFlat.fss:52 *)
tally[\nat s\](v: Vector[\ZZ32,s\]): ZZ32

(* ⍳n as a ZZ32 index vector -- L7, L13, L20, L27 *)
iota(n: ZZ32): Array[\ZZ32,ZZ32\]

(* ,m over the corpus slice (ZZ32) and over the validity mask (RR64) -- L13 *)
ravel[\nat r, nat c\](m: Matrix[\ZZ32,r,c\]): Array[\ZZ32,ZZ32\]
ravel[\nat r, nat c\](m: Matrix[\RR64,r,c\]): Array[\RR64,ZZ32\]

(* m[;ks] -- a column slice by a ZZ32 index vector -- L13 *)
cols[\nat r, nat c, nat k\](m: Matrix[\ZZ32,r,c\], ks: Vector[\ZZ32,k\]): Array[\ZZ32,(ZZ32,ZZ32)\]

(* v[ks] -- FlatArrays' gather takes a matrix, so the vector form is here.  The
   name differs from FlatArrays' by one letter on purpose: two imported apis
   declaring one name is not worth the risk. *)
gatherV[\nat s, nat k\](v: Vector[\ZZ32,s\], ks: Vector[\ZZ32,k\]): Array[\ZZ32,ZZ32\]

(* the outer comparisons of two ZZ32 vectors, as an RR64 0/1 matrix.
   outerGt is L13's validity mask (FlatData.fss:116); outerLt is L7's causal
   mask with the negation folded in (MicroGptFlat.fss:29); outerGe is the
   un-negated form, declared for completeness. *)
outerGt[\nat s, nat k\](l: Vector[\ZZ32,s\], r: Vector[\ZZ32,k\]): Array[\RR64,(ZZ32,ZZ32)\]
outerGe[\nat s, nat k\](l: Vector[\ZZ32,s\], r: Vector[\ZZ32,k\]): Array[\RR64,(ZZ32,ZZ32)\]
outerLt[\nat s, nat k\](l: Vector[\ZZ32,s\], r: Vector[\ZZ32,k\]): Array[\RR64,(ZZ32,ZZ32)\]

(* n⍴v -- the cyclic fill, L13's position vector (FlatData.fss:114) *)
cycle[\nat s\](n: ZZ32, v: Vector[\ZZ32,s\]): Array[\ZZ32,ZZ32\]

(* 1+⍳n -- an integer scalar added to an integer array, L13 *)
opr +[\I\](s: ZZ32, a: Array[\ZZ32,I\]): Array[\ZZ32,I\]

end

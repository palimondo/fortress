(* r03 -- does a top-level opr cross the api boundary?  Merged ledger row 30
   says a top-level opr is component-scoped; row 132 says functional methods in
   an .fsi do cross.  The library's own arrays are not ours to add methods to,
   so if the glyphs are to be operators at all they must be top-level oprs
   exported from an api.  This is the probe. *)
api AplT
opr ⊕[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ×[\nat s\](a: RR64, v: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
opr ×[\nat s\](v: Vector[\RR64,s\], w: Vector[\RR64,s\]): Array[\RR64,ZZ32\]
iota(n: RR64): Array[\RR64,ZZ32\]
end

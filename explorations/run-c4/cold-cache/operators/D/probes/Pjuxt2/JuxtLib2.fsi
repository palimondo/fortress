api JuxtLib2
object Diag[\nat s\](d: Vector[\RR64,s\]) end
diag[\nat s\](v: Vector[\RR64,s\]): Diag[\s\]
opr juxtaposition[\nat s, nat r, nat c\](dg: Diag[\s\], m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32)\]
opr juxtaposition[\nat a, nat b, nat c, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a,0,b,0,c\], y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
zerosM(r: ZZ32, c: ZZ32): Array[\RR64,(ZZ32,ZZ32)\]
end

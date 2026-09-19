api ArrayOperatorVocabulary

opr MINMAX(x: Array[\RR64,ZZ32\], y: RR64): Array[\RR64,ZZ32\]
opr MINMAX(y: RR64, x: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\]

opr +[\nat r, nat c, nat a, nat b, nat d\](m: Matrix[\RR64,r,c\], t: Array3[\RR64,0,a,0,b,0,d\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr +[\nat r, nat c, nat a, nat b, nat d\](t: Array3[\RR64,0,a,0,b,0,d\], m: Matrix[\RR64,r,c\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

opr juxtaposition[\nat a, nat b, nat c, nat a2, nat b2, nat c2\](x: Array3[\RR64,0,a,0,b,0,c\], y: Array3[\RR64,0,a2,0,b2,0,c2\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]
opr juxtaposition[\nat a, nat b, nat c, nat r, nat cc\](t: Array3[\RR64,0,a,0,b,0,c\], m: Matrix[\RR64,r,cc\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\]

end

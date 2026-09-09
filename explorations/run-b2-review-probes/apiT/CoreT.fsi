api CoreT
object Mat(a: Array[\RR64,(ZZ32,ZZ32)\])
  opr +(self, B: Mat): Mat
  opr[i: ZZ32, j: ZZ32]: RR64
end
mat(n: ZZ32, m: ZZ32, f: (ZZ32, ZZ32) -> RR64): Mat
transpose(A: Mat): Mat
end

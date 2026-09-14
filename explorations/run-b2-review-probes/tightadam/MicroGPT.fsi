api MicroGPT
import List.{...}
import Map.{...}
value object Mat(a: Array[\RR64,(ZZ32,ZZ32)\])
  getter dims(): (ZZ32, ZZ32)
  getter rows(): ZZ32
  getter cols(): ZZ32
  opr +(self, B: Mat): Mat
  opr -(self, B: Mat): Mat
  opr -(self): Mat
  opr juxtaposition(self, B: Mat): Mat
  opr /(self, s: RR64): Mat
  opr +(self, s: RR64): Mat
  opr ODOT(self, B: Mat): Mat
  opr /(self, B: Mat): Mat
  opr[i: ZZ32, j: ZZ32]: RR64
  map(f: RR64 -> RR64): Mat
  ivmap(f: ((ZZ32,ZZ32), RR64) -> RR64): Mat
end
transpose(A: Mat): Mat
opr juxtaposition(s: RR64, A: Mat): Mat
opr SQRT(A: Mat): Mat
mat(n: ZZ32, m: ZZ32, f: (ZZ32, ZZ32) -> RR64): Mat
zeros(n: ZZ32, m: ZZ32): Mat
value object Params(m: Map[\String, Mat\])
  opr[k: String]: Mat
  opr +(self, o: Params): Params
  opr -(self, o: Params): Params
  opr ODOT(self, o: Params): Params
  opr /(self, o: Params): Params
  opr /(self, s: RR64): Params
  opr +(self, s: RR64): Params
  map(f: Mat -> Mat): Params
  zipWith(f: (Mat, Mat) -> Mat, o: Params): Params
end
opr juxtaposition(s: RR64, P: Params): Params
opr SQRT(P: Params): Params
params(entries: List[\(String, Mat)\]): Params
zerosLike(P: Params): Params
value object Node(data: Mat, pullback: Mat -> Params)
  getter rows(): ZZ32
  getter cols(): ZZ32
  pull(C_bar: Mat): Params
  opr[ts: List[\ZZ32\]]: Node
end
param(name: String, W: Mat): Node
opr +(A: Node, B: Node): Node
opr +(A: Node, M: Mat): Node
opr juxtaposition(A: Node, B: Node): Node
opr /(A: Node, s: RR64): Node
relu(A: Node): Node
rmsnorm(X: Node): Node
softmax(S: Node): Node
concat(hs: List[\Node\]): Node
nll(P: Node, ys: List[\ZZ32\]): (RR64, Params)
causal(T: ZZ32): Mat
object Transformer(theta: Params, nh: ZZ32)
  embed(tokens: List[\ZZ32\]): Node
  attention(Q: Node, K: Node, V: Node): Node
  head(X: Node, h: ZZ32): Node
  mha(X: Node): Node
  ffn(X: Node): Node
  block(X: Node): Node
  logits(tokens: List[\ZZ32\]): Node
  loss(tokens: List[\ZZ32\], targets: List[\ZZ32\]): (RR64, Params)
end
adam(theta: Params, g: Params, m: Params, v: Params, t: ZZ32, lr: RR64): (Params, Params, Params)
tokenize(doc: String, uchars: String, bos: ZZ32): List[\ZZ32\]
trainStep(theta: Params, nh: ZZ32, toks: List[\ZZ32\], block: ZZ32, m: Params, v: Params, t: ZZ32, lr: RR64): (RR64, Params, Params, Params)
choose(p: List[\RR64\], u: RR64): ZZ32
sample(model: Transformer, bos: ZZ32, block: ZZ32, temperature: RR64, u: ZZ32 -> RR64): List[\ZZ32\]
end

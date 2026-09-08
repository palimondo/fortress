(* Eager finite vectors retain shared scalar graph nodes. Independent cells may
   be constructed in parallel; cache positions are visited in sequence. *)
object Vec(n:ZZ32, f:ZZ32->V)
  data:Array[\V,ZZ32\] = do
    a = array[\V\](n)
    for i <- 0#n do a[i] := f(i) end
    a
  end
  opr[i:ZZ32]:V = data[i]
end
object Mat(m:ZZ32,n:ZZ32,f:(ZZ32,ZZ32)->V)
  rows:Array[\Vec,ZZ32\] = do
    a = array[\Vec\](m)
    for i <- 0#m do a[i] := Vec(n,fn j => f(i,j)) end
    a
  end
  opr[i:ZZ32,j:ZZ32]:V = do row = rows[i]; row[j] end
  opr[i:ZZ32]:Vec = rows[i]
end
opr juxtaposition(A:Mat,x:Vec):Vec = Vec(A.m,fn i => SUM[j <- 0#A.n] A[i,j] x[j])
opr DOT(x:Vec,y:Vec):V = SUM[i <- 0#x.n] x[i] y[i]
opr  + (x:Vec,y:Vec):Vec = Vec(x.n,fn i => x[i] + y[i])
opr /(x:Vec,s:V):Vec = Vec(x.n,fn i => x[i]/s)
opr /(x:Vec,s:RR64):Vec = Vec(x.n,fn i => x[i]/s)
opr -(x:Vec,s:RR64):Vec = Vec(x.n,fn i => x[i]-s)
exp(x:Vec):Vec = Vec(x.n,fn i => exp(x[i]))
relu(x:Vec):Vec = Vec(x.n,fn i => relu(x[i]))
maximum(x:Vec):RR64 = BIG MAXNUM[i <- 0#x.n] (x[i]).primal
softmax(x:Vec):Vec = do
  e = exp(x-maximum(x))
  e/(SUM[i <- 0#x.n] e[i])
end
rmsnorm(x:Vec):Vec = x/(SQRT((x DOT x)/x.n + 0.00001))
head(x:Vec,h:ZZ32,s:ZZ32):Vec = Vec(s,fn j => x[h s  +  j])
attention(q:Vec,K:Mat,W:Mat):(Vec,Vec) = do
  a = softmax((K q)/(SQRT(q.n)))
  (a,Vec(W.n,fn j => SUM[t <- 0#W.m] a[t] W[t,j]))
end
object Block(W_q:Mat,W_k:Mat,W_v:Mat,W_o:Mat,W_in:Mat,W_out:Mat) end
object Cache(context:ZZ32,H:ZZ32)
  keys:Array[\Vec,ZZ32\] = array[\Vec\](context)
  values:Array[\Vec,ZZ32\] = array[\Vec\](context)
  weights:Array[\Vec,ZZ32\] = array[\Vec\](context H)
end
transformer(x:Vec,B:Block,C:Cache,t:ZZ32,H:ZZ32):Vec = do
  z = rmsnorm(x)
  q = B.W_q z
  C.keys[t] := B.W_k z
  C.values[t] := B.W_v z
  s = x.n DIV H
  heads = do
    a = array[\Vec\](H)
    for h <- 0#H do
      K = Mat(t + 1,s,fn (u,j) => (head(C.keys[u],h,s))[j])
      W = Mat(t + 1,s,fn (u,j) => (head(C.values[u],h,s))[j])
      (weights,output) = attention(head(q,h,s),K,W)
      C.weights[t H + h] := weights
      a[h] := output
    end
    a
  end
  y = x  +  B.W_o Vec(x.n,fn j => do v = heads[j DIV s]; v[j MOD s] end)
  y  +  B.W_out relu(B.W_in rmsnorm(y))
end
object Model(E:Mat,P:Mat,U:Mat,B:Block,H:ZZ32) end
gpt(M:Model,token:ZZ32,t:ZZ32,C:Cache):Vec =
  M.U transformer(rmsnorm(M.E[token] + M.P[t]),M.B,C,t,M.H)

(* Each parameter identity is its global row-major index, independently of
   evaluation order. This constructor fixes the inspectable one-block fixture. *)
matrixAt(p:Array[\RR64,ZZ32\],m:ZZ32,n:ZZ32,offset:ZZ32):Mat =
  Mat(m,n,fn (i,j) => variable(offset + i n + j,p[offset + i n + j]))
model(p:Array[\RR64,ZZ32\]):Model = Model(
  matrixAt(p,3,4,0),matrixAt(p,3,4,12),matrixAt(p,3,4,24),
  Block(matrixAt(p,4,4,36),matrixAt(p,4,4,52),matrixAt(p,4,4,68),
        matrixAt(p,4,4,84),matrixAt(p,16,4,100),matrixAt(p,4,16,164)),2)

adam(p:Array[\RR64,ZZ32\],g:Array[\RR64,ZZ32\],
     m:Array[\RR64,ZZ32\],v:Array[\RR64,ZZ32\],n:ZZ32,step:ZZ32,total:ZZ32):() = do
  beta_m = 0.85; beta_v = 0.99
  alpha = 0.01 (1.0-(step-1)/(1.0 total))
  for i <- 0#n do
    m[i] := beta_m m[i] + (1.0-beta_m) g[i]
    v[i] := beta_v v[i] + (1.0-beta_v) (g[i])^2.0
    m_hat = m[i]/(1.0-beta_m^(1.0 step))
    v_hat = v[i]/(1.0-beta_v^(1.0 step))
    p[i] := p[i] - alpha m_hat/(SQRT(v_hat) + 0.00000001)
  end
end
categorical(p:Vec,u:RR64):ZZ32 = do
  cumulative:RR64 := 0.0
  choice:ZZ32 := p.n-1
  found:Boolean := false
  for i <- sequential(0#p.n) do
    cumulative += (p[i]).primal
    if NOT found AND u<cumulative then choice := i; found := true end
  end
  choice
end

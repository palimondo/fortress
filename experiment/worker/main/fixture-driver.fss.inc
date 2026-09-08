emitMatrix(kind:String,name:String,p:Array[\RR64,ZZ32\],m:ZZ32,n:ZZ32,offset:ZZ32):() =
  for i <- sequential(0#m), j <- sequential(0#n) do
    println(kind "\t" name "\t" i "\t" j "\t" p[offset + i n + j])
  end
emitParameters(kind:String,p:Array[\RR64,ZZ32\]):() = do
  emitMatrix(kind,"wte",p,3,4,0)
  emitMatrix(kind,"wpe",p,3,4,12)
  emitMatrix(kind,"lm_head",p,3,4,24)
  emitMatrix(kind,"layer0.attn_wq",p,4,4,36)
  emitMatrix(kind,"layer0.attn_wk",p,4,4,52)
  emitMatrix(kind,"layer0.attn_wv",p,4,4,68)
  emitMatrix(kind,"layer0.attn_wo",p,4,4,84)
  emitMatrix(kind,"layer0.mlp_fc1",p,16,4,100)
  emitMatrix(kind,"layer0.mlp_fc2",p,4,16,164)
end
emitVector(kind:String,t:ZZ32,x:Vec):() =
  for j <- sequential(0#x.n) do println(kind "\t" t "\t" j "\t" (x[j]).primal) end
run():() = do
  p = array[\RR64\](228)
  for i <- 0#228 do p[i] := 1.0 ((i MOD 29)-14)/100.0 end
  emitParameters("initial",p)
  M = model(p)
  C = Cache(3,2)
  tokens = array[\ZZ32\](4)
  tokens[0] := 2; tokens[1] := 0; tokens[2] := 1; tokens[3] := 2
  losses = array[\V\](3)
  for t <- sequential(0#3) do
    logits = gpt(M,tokens[t],t,C)
    probabilities = softmax(logits)
    losses[t] := -log(probabilities[tokens[t + 1]])
    emitVector("logits",t,logits)
    emitVector("probability",t,probabilities)
    for h <- sequential(0#2) do
      a = C.weights[t 2 + h]
      for u <- sequential(0#(t + 1)) do
        println("attention\t" t "\t" h "\t" u "\t" (a[u]).primal)
      end
    end
  end
  loss = (SUM[t <- 0#3] losses[t])/3.0
  println("loss\t" loss.primal)
  g = gradient(loss,228)
  emitParameters("gradient",g)
  m = array[\RR64\](228).fill(0.0)
  v = array[\RR64\](228).fill(0.0)
  adam(p,g,m,v,228,1,1)
  emitParameters("updated",p)
  updatedModel = model(p)
  freshCache = Cache(3,2)
  uniforms = array[\RR64\](3)
  uniforms[0] := 0.1; uniforms[1] := 0.5; uniforms[2] := 0.9
  token:ZZ32 := 2
  finished:Boolean := false
  for t <- sequential(0#3) do
    if NOT finished then
      logits = gpt(updatedModel,token,t,freshCache)
      probabilities = softmax(logits/0.5)
      token := categorical(probabilities,uniforms[t])
      println("uniform\t" t "\t" uniforms[t])
      emitVector("genlogits",t,logits)
      emitVector("genprobability",t,probabilities)
      println("gentoken\t" t "\t" token)
      finished := token=2
    end
  end
end

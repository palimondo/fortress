# Run C3: the guided tour

One row per line of `explorations/apl/reference/hsu-flat/microgpt_concise.dyalog`, in the order of the program, the helper dfns included. Each row gives the formula, the Dyalog line, the Fortress line or lines from `src/MicroGptFlat.fss` (or the vocabulary where the Dyalog line is a primitive that Fortress lacks), and a note where they differ. The Fortress lines are judged against the formula first and the Dyalog second; `tour.html` shows the same rows with the formula and the Fortress rendered by LaTeX and Fortify.

Conventions in the formulas: matrices have one row per (document, position) pair, N = B·16 rows; `sm` and `rmsn` on a matrix act row by row; `⊙` is the elementwise product; `[A_h]_h` places the per-head results side by side; `Y_k` is the one-hot matrix of a key vector `k`.

---

## 1. Hyperparameters

Formula: $n_e=16,\ T=16,\ n_h=4,\ d=4,\ V=27,\ \mathrm{bos}=26;\ \varepsilon=10^{-5},\ \eta_0=0.01,\ \beta_1=0.85,\ \beta_2=0.99,\ \varepsilon_A=10^{-8}$

Dyalog: `⎕IO←0 ⋄ NE BLK NH HD VS BOS←16 16 4 4 27 26 ⋄ EPS LR0 B1 B2 EPSA←1E¯5 0.01 0.85 0.99 1E¯8`

Fortress:
```
nEmbd: ZZ32 = 16
blockSize: ZZ32 = 16
epsRms: RR64 = 10.0^(-5)
beta1: RR64 = 0.85
```

Note: one declaration per line, fourteen in all (the four above and ten more of the same shape); a strand assignment has no Fortress form, and the interpreter binds a top-level array literal as a tuple (ledger row 142).

## 2. RMS normalisation of a vector

Formula: $\mathrm{rmsn}(x) = \dfrac{x}{\sqrt{\varepsilon + \|x\|^2 / n}}$

Dyalog: `rmsn←{⍵÷(EPS+(+/⍵*2)÷≢⍵)*0.5}`

Fortress:
```
rmsn(x: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = x / SQRT (epsRms + (x DOT x) / |x|)
```

Note: `x DOT x` is the library's dot product, which is the formula's $\|x\|^2$; `|x|` is the length.

## 3. Softmax of a vector

Formula: $\mathrm{sm}(z)_i = \dfrac{e^{z_i - \max z}}{\sum_j e^{z_j - \max z}}$

Dyalog: `sm←{e÷+/e←*⍵-⌈/⍵}`

Fortress:
```
sm(z: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = do e = exp(z - (BIG MAX[t <- z] t)); e / (SUM e) end
```

Note: `SUM e` is the library's reduction over an array; `BIG MAX` has no prefix form over an array (ledger row 102), so its generator is written.

## 4. The causal mask

Formula: $M_{ij} = -10^{10}\,[\,j > i\,]$

Dyalog: `MK←¯1E10×~(⍳BLK)∘.≥⍳BLK`

Fortress:
```
causalMask: Array[\RR64,(ZZ32,ZZ32)\] = mat(blockSize, blockSize, fn (i, j) => if j > i then -(10.0^10) else 0.0 end)
```

Note: a fill by index instead of an outer product; the indicator is the `if`.

## 5. Backward of the RMS normalisation

Formula: $r = \sqrt{\varepsilon + \|x\|^2/n},\quad y = x/r,\quad \bar x = \dfrac{\bar y - y\,\langle y, \bar y\rangle / n}{r}$

Dyalog: `rmsn_b←{r←(EPS+(+/⍵*2)÷≢⍵)*0.5 ⋄ y←⍵÷r ⋄ (⍺-y×(+/y×⍺)÷≢y)÷r}`

Fortress:
```
rmsnB(dy: Array[\RR64,ZZ32\], x: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = do
    r = SQRT (epsRms + (x DOT x) / |x|); y = x / r
    (dy - y ((y DOT dy) / |y|)) / r
  end
```

Note: the Dyalog's three statements are three Fortress statements; `y ((y DOT dy) / |y|)` is the scalar multiple of the vector `y`.

## 6. Backward of the softmax

Formula: $\bar z = p \odot (\bar p - \langle p, \bar p\rangle)$

Dyalog: `sm_b←{⍺×⍵-+/⍺×⍵}`

Fortress:
```
smB(p: Array[\RR64,ZZ32\], dy: Array[\RR64,ZZ32\]): Array[\RR64,ZZ32\] = p × (dy - (p DOT dy))
```

Note: `×` is the elementwise product declared in the vocabulary; `p DOT dy` is the library's.

## 7. The layout: shapes, counts, offsets

Formula: $\mathrm{SHP} = ((V,n_e),(T,n_e),(V,n_e),(n_e,n_e)^{\times 4},(4n_e,n_e),(n_e,4n_e)),\ \mathrm{OFF}_i = \sum_{j<i} r_j c_j$

Dyalog: `SHP←(VS NE)(BLK NE)(VS NE)(NE NE)(NE NE)(NE NE)(NE NE)((4×NE)NE)(NE(4×NE)) ⋄ CNT←×/¨SHP ⋄ OFF←+\0,¯1↓CNT`

Fortress:
```
matRows(i: ZZ32): ZZ32 = if (i = 0) OR (i = 2) then vocabSize elif i = 7 then 4 nEmbd else nEmbd end
matCols(i: ZZ32): ZZ32 = if i = 8 then 4 nEmbd else nEmbd end
matOffset(i: ZZ32): ZZ32 = SUM[j <- 0#i] matRows(j) matCols(j)
nParams(): ZZ32 = matOffset(9)
```

Note: the shape table is two functions of the index instead of a nested vector (Hsu's lesson 1: the layout is visible code); the prefix sum is the `SUM` with a generator; `matName` (three lines) names the nine files.

## 8. The flat parameter vector and the Adam state

Formula: $P \in \mathbb{R}^{4192},\ M = V = 0$

Dyalog: `P←⊃,/,¨{(⍵⊃SHP)⍴⎕NREAD ⍵}¨⍳9 ⋄ M←V←P×0`

Fortress:
```
p: Array[\RR64,ZZ32\] := loadParams(weightsDir, matName, 9, nParams())
m: Array[\RR64,ZZ32\] := zeros(nParams())
v: Array[\RR64,ZZ32\] := zeros(nParams())
```

Note: the loader (`FlatData`) reads the nine files' lines straight into the vector in layout order; there is no reshape and no catenation because the vector is the only container.

## 9. Matrix i as a view of P

Formula: $W_i = \mathrm{reshape}(P[\mathrm{OFF}_i .. \mathrm{OFF}_i + r_i c_i), r_i, c_i)$

Dyalog: `v←{(⍵⊃SHP)⍴P[(⍵⊃OFF)+⍳⍵⊃CNT]}`

Fortress:
```
view(p: Array[\RR64,ZZ32\], i: ZZ32): Array[\RR64,(ZZ32,ZZ32)\] = view(p, matOffset(i), matRows(i), matCols(i))
```

Note: the Dyalog reshapes a copy; the Fortress `view` (the vocabulary's `PView`, six lines) is a zero-copy `Matrix` over the vector, readable and writable (Hsu's tactic 8).

## 10. The corpus

Formula: $\mathrm{TOKM}_{d} = (\mathrm{bos}, c_1, \dots, c_{\ell_d}, \mathrm{bos}, \dots) \in \mathbb{Z}^{T+1},\ \mathrm{LEN}_d = 1 + \ell_d$

Dyalog: `TOKM←↑{(BLK+1)↑BOS,(⎕A⍳⍵),BOS}¨docs ⋄ LEN←1+≢¨docs`

Fortress:
```
corpus: Corpus = loadCorpus(corpusPath, blockSize, bosId)
```

Note: `loadCorpus` (`FlatData`, five lines) fills a (documents × 17) integer matrix with BOS and interns the characters; the `Corpus` object carries the matrix, the lengths and the key functions of row 11.

## 11. The keys of a batch

Formula: $\mathrm{ids} = \mathrm{TOKM}[b, 0..T),\ \mathrm{tg} = \mathrm{TOKM}[b, 1..T],\ \mathrm{vm}_{(d,t)} = [\,t < \mathrm{LEN}_{b_d}\,],\ n_v = \sum \mathrm{vm},\ \mathrm{pos}_{(d,t)} = t$

Dyalog: `b←⍵ ⋄ B←≢b ⋄ N←B×BLK ⋄ R←TOKM[b;] ⋄ ids←,R[;⍳BLK] ⋄ tg←,R[;1+⍳BLK] ⋄ vm←,LEN[b]∘.>⍳BLK ⋄ nv←+/vm ⋄ pos←N⍴⍳BLK`

Fortress:
```
ids = corpus.tokens(b, 0); tg = corpus.tokens(b, 1); vm = corpus.valid(b); nv = SUM vm; pos = corpus.positions(b)
```

Note: the three key functions are the corpus object's (`FlatData`), one line each with the subscripts inside; the model line names the five keys as the formula does.

## 12. The nine weight matrices

Formula: $W_{te}, W_{pe}, W_{lm}, W_q, W_k, W_v, W_o, F_1, F_2 = W_0 \dots W_8$

Dyalog: `wte wpe lm wq wk wv wo f1 f2←v¨⍳9`

Fortress:
```
(wte, wpe, lm, wq, wk, wv, wo, f1, f2) = views(p)
```

Note: a nine-tuple binding; `views(p)` is the one-line tuple of the nine views.

## 13. Embedding

Formula: $X = W_{te}[\mathrm{ids}] + W_{pe}[\mathrm{pos}]$

Dyalog: `X←wte[ids;]+wpe[pos;]`

Fortress:
```
x = gather(wte, ids) + gather(wpe, pos)
```

Note: `gather` is the vocabulary's row selection by keys (Hsu's tactic 10); `+` is the library's.

## 14. Two normalisations

Formula: $X_p = \mathrm{rmsn}(X),\quad X_1 = \mathrm{rmsn}(X_p)$

Dyalog: `Xp←rmsn⍤1⊢X ⋄ X1←rmsn⍤1⊢Xp`

Fortress:
```
xp = rows(rmsn, x); x1 = rows(rmsn, xp)
```

Note: `rows(f, m)` is the vocabulary's `⍤1`: `f` on every row, stacked; `rmsn` is the vector function of row 2, written once.

## 15. Queries, keys, values

Formula: $Q = X_1 W_q^\top,\quad K = X_1 W_k^\top,\quad V = X_1 W_v^\top$

Dyalog: `Q K Vv←X1∘(+.×⍉)¨wq wk wv`

Fortress:
```
q = x1 (wq^T); k = x1 (wk^T); v = x1 (wv^T)
```

Note: juxtaposition is the library's matrix product; `^T` is `m.t()`, the library's transpose view.

## 16. Splitting into heads

Formula: $Q_h = Q[\,:, hd..(h+1)d\,)$ per document, and likewise $K_h, V_h$

Dyalog: `h←{0 2 1 3⍉(B,BLK,NH,HD)⍴⍵} ⋄ Qh Kh Vh←h¨Q K Vv`

Fortress:
```
heads(f, a, b) = cells(f, a, b, blockSize, nHead)
```

Note: no data moves. The Dyalog's rank-4 array with axes permuted is, in the flat layout, a matrix whose per-head cells are 16 × 4 blocks; `heads` (`cells` in the vocabulary, seven lines) applies a function to the (document, head) cells of its arguments and lays the results out the same way, so `Qh Kh Vh` never exist as values and the `u` of row 25 is the identity.

## 17. Attention weights

Formula: $A_h = \mathrm{sm}\!\left(\dfrac{Q_h K_h^\top}{\sqrt d} + M\right)$

Dyalog: `A←sm⍤1⊢MK+⍤2⊢(Qh+.×⍤2⊢⍉⍤2⊢Kh)÷HD*0.5`

Fortress:
```
att = heads(fn (qc, kc) => rows(sm, (qc (kc^T)) / SQRT (1.0 headDim) + causalMask), q, k)
```

Note: the lambda is the per-head cell; `rows(sm, …)` is the `sm⍤1`; the `/` on a matrix by a scalar is the vocabulary's. `att` holds the B·4 cells side by side as an N × 64 matrix.

## 18. Heads applied to values, concatenated

Formula: $H = [\,A_h V_h\,]_h$

Dyalog: `Hc←(N,NE)⍴0 2 1 3⍉A+.×⍤2⊢Vh`

Fortress:
```
hc = heads(fn (ac, vc) => ac vc, att, v)
```

Note: the reshape and permutation are the layout of `heads`'s result.

## 19. Output projection, normalisation, the MLP

Formula: $X_2 = X_p + H W_o^\top,\ X_3 = \mathrm{rmsn}(X_2),\ M_0 = X_3 F_1^\top,\ M_r = \max(0, M_0),\ X_4 = X_2 + M_r F_2^\top$

Dyalog: `X2←Xp+Hc+.×⍉wo ⋄ X3←rmsn⍤1⊢X2 ⋄ M0←X3+.×⍉f1 ⋄ Mr←0⌈M0 ⋄ X4←X2+Mr+.×⍉f2`

Fortress:
```
x2 = xp + hc (wo^T); x3 = rows(rmsn, x2); m0 = x3 (f1^T); mr = 0.0 MAX m0; x4 = x2 + mr (f2^T)
```

Note: `0.0 MAX m0` is the vocabulary's `MAX` between a scalar and a matrix.

## 20. Probabilities and loss

Formula: $P = \mathrm{sm}(X_4 W_{lm}^\top),\qquad L = -\dfrac{\langle \mathrm{vm}, \log P[\cdot, \mathrm{tg}]\rangle}{n_v}$

Dyalog: `Pr←sm⍤1⊢X4+.×⍉lm ⋄ loss←-(+/vm×⍟tg⌷⍤0 1⊢Pr)÷nv`

Fortress:
```
pr = rows(sm, x4 (lm^T)); loss = -(vm DOT log(pick(pr, tg))) / nv
```

Note: `pick(m, ks)` is the vocabulary's `⌷⍤0 1`, one element per row at its key; `log` is elementwise on a vector; the masked sum is the dot product with `vm`.

## 21. Backward: the loss and the output head

Formula: $\bar L = \mathrm{diag}(\mathrm{vm}/n_v)\,(P - Y_{\mathrm{tg}}),\quad \bar W_{lm} = \bar L^\top X_4,\quad \bar X_4 = \bar L\, W_{lm}$

Dyalog: `dL←(vm÷nv)×⍤0 1⊢Pr-tg∘.=⍳VS ⋄ gLM←(⍉dL)+.×X4 ⋄ dX4←dL+.×lm`

Fortress:
```
dL = rows(fn (w, r) => w r, vm / nv, pr - onehot(tg, vocabSize)); gLM = (dL^T) x4; dX4 = dL lm
```

Note: the `×⍤0 1` is the rank-0-1 form of `rows`: each row scaled by its element of the vector, the lambda being the scalar product because an operator cannot be passed as a function value (ledger row 165); `onehot` is the vocabulary's `∘.=⍳`.

## 22. Backward: the MLP

Formula: $\bar F_2 = \bar X_4^\top M_r,\quad \bar M_0 = (\bar X_4 F_2) \odot [M_0 > 0],\quad \bar F_1 = \bar M_0^\top X_3,\quad \bar X_3 = \bar M_0 F_1$

Dyalog: `gF2←(⍉dX4)+.×Mr ⋄ dM0←(dX4+.×f2)×M0>0 ⋄ gF1←(⍉dM0)+.×X3 ⋄ dX3←dM0+.×f1`

Fortress:
```
gF2 = (dX4^T) mr; dM0 = (dX4 f2) × (m0 > 0.0); gF1 = (dM0^T) x3; dX3 = dM0 f1
```

Note: `m0 > 0.0` is a 0/1 matrix and `×` the elementwise product, both from the vocabulary.

## 23. Backward: the residual and the output projection

Formula: $\bar X_2 = \bar X_4 + \mathrm{rmsn\_b}(\bar X_3, X_2),\quad \bar W_o = \bar X_2^\top H,\quad \bar H = \bar X_2 W_o$

Dyalog: `dX2←dX4+dX3(rmsn_b⍤1)X2 ⋄ gWO←(⍉dX2)+.×Hc ⋄ dH←h dX2+.×wo`

Fortress:
```
dX2 = dX4 + rows(rmsnB, dX3, x2); gWO = (dX2^T) hc; dH = dX2 wo
```

Note: the dyadic `rows` is the `rmsn_b⍤1`; the Dyalog re-heads `dH` with `h`, the Fortress does not need to (row 16).

## 24. Backward: attention, values and scores

Formula: $\bar V_h = A_h^\top \bar H_h,\qquad \bar S_h = \dfrac{\mathrm{sm\_b}(A_h, \bar H_h V_h^\top)}{\sqrt d}$

Dyalog: `dVh←(⍉⍤2⊢A)+.×⍤2⊢dH ⋄ dS←(A(sm_b⍤1)dH+.×⍤2⊢⍉⍤2⊢Vh)÷HD*0.5`

Fortress:
```
dV = heads(fn (ac, dc) => (ac^T) dc, att, dH)
dS = heads(fn (ac, dc, vc) => rows(smB, ac, dc (vc^T)), att, dH, v) / SQRT (1.0 headDim)
```

Note: the three-argument `heads` takes the cells of `att`, `dH` and `v` together; `dV` lands directly in the (N × 16) layout the Dyalog reaches with `u`.

## 25. Backward: queries and keys, un-heading

Formula: $\bar Q_h = \bar S_h K_h,\qquad \bar K_h = \bar S_h^\top Q_h$

Dyalog: `dQh←dS+.×⍤2⊢Kh ⋄ dKh←(⍉⍤2⊢dS)+.×⍤2⊢Qh ⋄ u←{(N,NE)⍴0 2 1 3⍉⍵} ⋄ dQ dK dV←u¨dQh dKh dVh`

Fortress:
```
dQ = heads(fn (sc, kc) => sc kc, dS, k); dK = heads(fn (sc, qc) => (sc^T) qc, dS, q)
```

Note: `u` has no Fortress line: the results of `heads` are already N × 16.

## 26. Backward: the projections

Formula: $\bar W_q = \bar Q^\top X_1,\ \bar W_k = \bar K^\top X_1,\ \bar W_v = \bar V^\top X_1,\qquad \bar X_1 = \bar Q W_q + \bar K W_k + \bar V W_v$

Dyalog: `gWQ gWK gWV←{(⍉⍵)+.×X1}¨dQ dK dV ⋄ dX1←(dQ+.×wq)+(dK+.×wk)+dV+.×wv`

Fortress:
```
gWQ = (dQ^T) x1; gWK = (dK^T) x1; gWV = (dV^T) x1; dX1 = dQ wq + dK wk + dV wv
```

Note: the `¨` over three names is three bindings.

## 27. Backward: the two normalisations

Formula: $\bar X_p = \bar X_2 + \mathrm{rmsn\_b}(\bar X_1, X_p),\qquad \bar X = \mathrm{rmsn\_b}(\bar X_p, X)$

Dyalog: `dXp←dX2+dX1(rmsn_b⍤1)Xp ⋄ dX←dXp(rmsn_b⍤1)X`

Fortress:
```
dXp = dX2 + rows(rmsnB, dX1, xp); dX = rows(rmsnB, dXp, x)
```

Note: none.

## 28. Backward: the embeddings as scatter-adds

Formula: $\bar W_{te} = Y_{\mathrm{ids}}^\top \bar X,\qquad \bar W_{pe} = Y_{\mathrm{pos}}^\top \bar X$

Dyalog: `gWTE←(⍉ids∘.=⍳VS)+.×dX ⋄ gWPE←(⍉pos∘.=⍳BLK)+.×dX`

Fortress:
```
yi = onehot(ids, vocabSize); yp = onehot(pos, blockSize); gWTE = (yi^T) dX; gWPE = (yp^T) dX
```

Note: the one-hots are bound first because a call cannot be followed by a postfix operator, even in parentheses (ledger rows 4 and 144, sharpened in ledger row 158).

## 29. The step's result

Formula: $(L,\ \bar P)$ with $\bar P$ the nine gradients in the layout of $P$

Dyalog: `loss(⊃,/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2)`

Fortress:
```
(loss, flat(gWTE, gWPE, gLM, gWQ, gWK, gWV, gWO, gF1, gF2))
```

Note: `flat` (the layout section, five lines) writes each matrix through its view of a fresh vector; the Dyalog ravels and catenates copies.

## 30. Adam

Formula: $m \leftarrow \beta_1 m + (1-\beta_1) g,\quad v \leftarrow \beta_2 v + (1-\beta_2) g^{\odot 2},\quad P \leftarrow P - \eta\,\dfrac{m/(1-\beta_1^t)}{\sqrt{v/(1-\beta_2^t)} + \varepsilon_A}$

Dyalog: `ADAM←{(t lr g)←⍵ ⋄ M∘←(B1×M)+(1-B1)×g ⋄ V∘←(B2×V)+(1-B2)×g*2 ⋄ P∘←P-lr×(M÷1-B1*t)÷EPSA+(V÷1-B2*t)*0.5}`

Fortress:
```
m' = beta1 m + (1 - beta1) g; v' = beta2 v + (1 - beta2) (g × g)
(p - lr (m' / (1 - beta1^t)) / (SQRT (v' / (1 - beta2^t)) + epsAdam), m', v')
```

Note: the state is returned, not assigned in place (Hsu's lesson 8); juxtaposition binds tighter than the loose `/`, so the third line parses as the formula (precedence.tex:181).

## 31. The training loop

Formula: $L_s = \mathrm{step}(P, b_s),\quad (P, m, v) \leftarrow \mathrm{adam}(\dots, s+1, \eta_0 (1 - s/1000))$

Dyalog: `losses←{l g←STEP(≢docs)|(⍵×BSZ)+⍳BSZ ⋄ ADAM(1+⍵)(LR0×1-⍵÷NSTEPS)g ⋄ l}¨⍳RUN`

Fortress:
```
for s <- seq(0#5) do
    (l, g) = step(p, keys(1, fn (i: ZZ32): ZZ32 => s MOD corpus.size()))
    (p, m, v) := adam(p, m, v, g, s + 1, learningRate(s))
end
```

Note: a sequential `for` with a tuple assignment of the three state variables, the only mutable state of the program.

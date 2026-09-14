⍝ microgpt_flat.apl — microgpt with the data designed the way Hsu teaches ("Designing Your Data", FnConf 2025).
⍝ Same algorithm as microgpt.apl; different data layout:
⍝
⍝   Tactic 2/8  parameters: ONE flat vector PS.P. The nine matrices are views (reshaped slices), never stored.
⍝               gradient, Adam m and v: three more flat vectors of the same length. Adam is one expression.
⍝   Tactic 3/5  corpus: ONE integer matrix TOKM (docs × 17), interned characters, padded with BOS; LEN per doc.
⍝               No strings after load time. A batch is a row selection.
⍝   Tactic 1    batch axis: the batch is the leading axis. Rows of every activation are (doc,pos) pairs, so
⍝               all linear algebra is one matrix product over B×16 rows; only attention splits per doc (¨ = the
⍝               leading-axis view an interpreter without ⍤ gives you).
⍝   Tactic 9    validity: a Boolean mask over (doc,pos), used arithmetically. Padded positions run through the
⍝               forward pass and are multiplied out of the loss; the causal mask keeps them from being attended to.
⍝   Tactic 10   keys: token ids and position ids are integer keys; scatter-add into wte and wpe is the same one-hot product.
⍝   Lesson 7/8  lifetimes: STEP is one pure function (docs → loss, gradient); no activation cache; the only
⍝               persistent state is PS = {P, M, V}, replaced each step.
⍝
⍝ Usage:  nsteps.txt holds  "<steps to run> <schedule length> <batch size>"   e.g.  5 1000 1   (check vs oracle)

⎕IO←0
NE←16 ⋄ BLK←16 ⋄ NH←4 ⋄ HD←4 ⋄ VS←27 ⋄ BOS←26
EPS←1E¯5 ⋄ LR0←0.01 ⋄ B1←0.85 ⋄ B2←0.99 ⋄ EPSA←1E¯8

⍝ ───────────── array vocabulary (as in microgpt.apl) ─────────────
mm     ← {↑(↓⍺)∘.{+/⍺×⍵}↓⍉⍵}          ⍝ matrix product
rmsn   ← {⍵÷(EPS+(+/⍵*2)÷≢⍵)*0.5}
sm     ← {e÷+/e←*⍵-⌈/⍵}
rmsrows← {↑rmsn¨↓⍵} ⋄ smrows←{↑sm¨↓⍵}
gather ← {↑(↓⍺)[⍵]}                  ⍝ rows of ⍺ at keys ⍵
cols   ← {⍉↑(↓⍉⍺)[⍵]}
hcat   ← {{⍺,⍵}/⍵}
vcat   ← {1=≢⍵:←⊃⍵ ⋄ {⍺⍪⍵}/⍵}
mask   ← {¯1E10×~(⍳⍵)∘.≥⍳⍵}
onehot ← {⍵∘.=⍳VS}
scalerows←{↑⍺{⍺×⍵}¨↓⍵}               ⍝ row i of ⍵ times scalar ⍺[i]
rmsn_b ← {dy←⍺ ⋄ x←⍵ ⋄ r←(EPS+(+/x*2)÷≢x)*0.5 ⋄ y←x÷r ⋄ (dy-y×(+/y×dy)÷≢y)÷r}
sm_b   ← {p←⍺ ⋄ dy←⍵ ⋄ p×dy-+/p×dy}
rmsrows_b←{↑(↓⍺)rmsn_b¨↓⍵} ⋄ smrows_b←{↑(↓⍺)sm_b¨↓⍵}

⍝ ───────────── Tactic 2/8: one flat parameter vector, matrices as views ─────────────
NAMES←'wte' 'wpe' 'lm_head' 'attn_wq' 'attn_wk' 'attn_wv' 'attn_wo' 'mlp_fc1' 'mlp_fc2'
SHP←(VS NE)(BLK NE)(VS NE)(NE NE)(NE NE)(NE NE)(NE NE)((4×NE) NE)(NE (4×NE))
CNT←×/¨SHP ⋄ OFF←+\0,¯1↓CNT ⋄ NP←+/CNT
PS←⎕NS ⍬                                                   ⍝ the only persistent state: three flat vectors
PS.P←{⍺,⍵}/{,↑⍎¨⎕LNS 'w/',⍵,'.txt'}¨NAMES                  ⍝ loaded once from the text export, then raveled into P
PS.M←NP⍴0 ⋄ PS.V←NP⍴0
view←{(⍵⊃SHP)⍴(⍵⊃CNT)↑(⍵⊃OFF)↓PS.P}                        ⍝ matrix i as a view of P: reshape a slice
⎕←'parameters' NP 'offsets' OFF

⍝ ───────────── Tactic 3/5: the corpus as one padded integer matrix ─────────────
docs←⎕LNS 'docs.txt'
TOKM←↑{(BOS,(⎕LA⍳⍵),BOS),(15-≢⍵)⍴BOS}¨docs                ⍝ docs × 17: BOS chars BOS, padded with BOS
LEN←1+≢¨docs                                                ⍝ (input,target) pairs per doc = chars+1
ND←≢docs
⎕←'corpus' (⍴TOKM) 'ints, mean length' ((+/LEN)÷ND)

⍝ ───────────── the step: docs → (loss, flat gradient). Pure. ─────────────
STEP←{b←⍵ ⋄ B←≢b
  R←↑(↓TOKM)[b] ⋄ INP←R cols ⍳BLK ⋄ TGT←R cols 1+⍳BLK        ⍝ batch = row selection of the corpus relation
  VALID←({⍵⊃LEN}¨b)∘.>⍳BLK                                    ⍝ Tactic 9: Boolean overlay over (doc,pos)
  ids←,INP ⋄ tg←,TGT ⋄ vm←,VALID ⋄ nv←+/vm                    ⍝ flatten: rows are (doc,pos) pairs
  pos←(B×BLK)⍴⍳BLK
  wte←view 0 ⋄ wpe←view 1 ⋄ lm←view 2 ⋄ wq←view 3 ⋄ wk←view 4 ⋄ wv←view 5 ⋄ wo←view 6 ⋄ f1←view 7 ⋄ f2←view 8
  ⍝ ── forward, all rows at once ──
  X←(wte gather ids)+wpe gather pos                          ⍝ (B·16 × 16)
  Xp←rmsrows X ⋄ X1←rmsrows Xp
  Q←X1 mm ⍉wq ⋄ K←X1 mm ⍉wk ⋄ Vv←X1 mm ⍉wv
  ⍝ ── attention: per doc (leading axis via ¨), per head ──
  docrows←{(⍵×BLK)+⍳BLK}
  heads←{m←⍵ ⋄ {m cols (⍵×HD)+⍳HD}¨⍳NH}
  Qh←{heads Q gather docrows ⍵}¨⍳B ⋄ Kh←{heads K gather docrows ⍵}¨⍳B ⋄ Vh←{heads Vv gather docrows ⍵}¨⍳B
  MK←mask BLK
  S←Qh{⍺{MK+(⍺ mm ⍉⍵)÷HD*0.5}¨⍵}¨Kh                          ⍝ B lists of NH (16×16) score matrices
  A←{smrows¨⍵}¨S
  H←A{⍺ mm¨⍵}¨Vh
  Hc←vcat hcat¨H                                             ⍝ back to (B·16 × 16)
  X2←Xp+Hc mm ⍉wo
  X3←rmsrows X2 ⋄ M0←X3 mm ⍉f1 ⋄ Mr←0⌈M0
  X4←X2+Mr mm ⍉f2
  L←X4 mm ⍉lm ⋄ Pr←smrows L ⋄ OH←onehot tg
  loss←-(÷nv)×+/vm×⍟+/Pr×OH                                  ⍝ masked mean over valid rows
  ⍝ ── backward ──
  dL←(vm÷nv)scalerows Pr-OH                                  ⍝ invalid rows scaled to zero: nothing flows from padding
  gLM←(⍉dL)mm X4 ⋄ dX4←dL mm lm
  gF2←(⍉dX4)mm Mr ⋄ dMr←dX4 mm f2 ⋄ dM0←dMr×M0>0
  gF1←(⍉dM0)mm X3 ⋄ dX3←dM0 mm f1
  dX2←dX4+dX3 rmsrows_b X2
  gWO←(⍉dX2)mm Hc ⋄ dHc←dX2 mm wo
  dH←{heads dHc gather docrows ⍵}¨⍳B
  dVh←A{(⍉¨⍺)mm¨⍵}¨dH
  dA←dH{⍺ mm¨⍉¨⍵}¨Vh
  dS←A{(⍺ smrows_b¨⍵)÷HD*0.5}¨dA
  dQh←dS{⍺ mm¨⍵}¨Kh ⋄ dKh←dS{(⍉¨⍺)mm¨⍵}¨Qh
  dQ←vcat hcat¨dQh ⋄ dK←vcat hcat¨dKh ⋄ dV←vcat hcat¨dVh
  gWQ←(⍉dQ)mm X1 ⋄ gWK←(⍉dK)mm X1 ⋄ gWV←(⍉dV)mm X1
  dX1←(dQ mm wq)+(dK mm wk)+dV mm wv
  dXp←dX2+dX1 rmsrows_b Xp ⋄ dX←dXp rmsrows_b X
  gWTE←(⍉onehot ids)mm dX                                    ⍝ Tactic 10: keys → one-hot → scatter-add (sums repeats and docs)
  gWPE←(⍉pos∘.=⍳BLK)mm dX                                    ⍝ positions are keys too
  G←{⍺,⍵}/,¨gWTE gWPE gLM gWQ gWK gWV gWO gF1 gF2             ⍝ flat gradient, same layout as P
  loss G}

⍝ ───────────── Adam: one expression over flat vectors ─────────────
ADAM←{t←1+⊃⍵ ⋄ lr←1⊃⍵ ⋄ g←2⊃⍵
  PS.M←(B1×PS.M)+(1-B1)×g ⋄ PS.V←(B2×PS.V)+(1-B2)×g*2
  PS.P←PS.P-lr×(PS.M÷1-B1*t)÷EPSA+(PS.V÷1-B2*t)*0.5
  ⍬}


⍝ ═══ lemma 4: batched loss/gradient == token-weighted mean of per-doc loss/gradient
b←0 1 2 3
lb gb←STEP b
ls←{⊃STEP ,⍵}¨b ⋄ gs←{1⊃STEP ,⍵}¨b ⋄ ns←{⍵⊃LEN}¨b
lw←(+/ls×ns)÷+/ns ⋄ gw←(+/gs×ns)÷+/ns
⎕←'batched loss' lb 'weighted mean of 4 docs' lw '|Δ|' (|lb-lw)
⎕←'max |Δ gradient| over all 4192 entries' (⌈/|gb-gw)
⍝ ═══ finite differences on the flat vector: perturb P[i] by a branchless mask (Tactic 9), any i
eps←1E¯6 ⋄ P0←PS.P
fd←{i←⍵ ⋄ PS.P←P0+eps×i=⍳NP ⋄ lp←⊃STEP b ⋄ PS.P←P0-eps×i=⍳NP ⋄ lm←⊃STEP b ⋄ PS.P←P0 ⋄ (lp-lm)÷2×eps}
idx←17 500 1000 1300 1500 1700 2000 2500 3000 4000 4191
⎕←'index' 'backprop' 'finite-diff' '|Δ|'
_←{i←⍵ ⋄ g←fd i ⋄ ⎕←i (i⊃gb) g (|g-i⊃gb) ⋄ ⍬}¨idx
⎕←'parameters with zero gradient in this batch' (+/0=gb) 'of' NP '(unseen letters: rows of wte and lm_head never touched)'

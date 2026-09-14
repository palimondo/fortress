⍝ microgpt.apl — Karpathy's microgpt as arrays.  Runs in dzaima/APL (open source, Java).
⍝
⍝ Structure follows Nydhal's array-native Dyalog port, rewritten for an interpreter without
⍝ the rank operator (⍤) and without matrix inner product (+.×):
⍝   f⍤1 over rows      →  {↑f¨↓⍵}          "split into rows, apply, stack"
⍝   +.×⍤2 over heads   →  Qh f¨ Kh          heads kept as a LIST of matrices; ¨ pairs them up
⍝   A +.× B            →  A mm B            "each row of A dotted with each column of B"
⍝ Everything is fp64.  No autograd: every gradient is a line of matrix math, mirroring the forward line.

⎕IO←0
NE←16 ⋄ BLK←16 ⋄ NH←4 ⋄ HD←4 ⋄ VS←27 ⋄ BOS←26
EPS←1E¯5 ⋄ LR0←0.01 ⋄ B1←0.85 ⋄ B2←0.99 ⋄ EPSA←1E¯8

⍝ ───────────────────────────── array vocabulary ─────────────────────────────
mm     ← {↑(↓⍺)∘.{+/⍺×⍵}↓⍉⍵}          ⍝ matrix product      = Karpathy's linear(x, w) for every x at once
rmsn   ← {⍵÷(EPS+(+/⍵*2)÷≢⍵)*0.5}    ⍝ rmsnorm of one row
sm     ← {e÷+/e←*⍵-⌈/⍵}              ⍝ softmax of one row, max-subtracted
rmsrows← {↑rmsn¨↓⍵}
smrows ← {↑sm¨↓⍵}
gather ← {↑(↓⍺)[⍵]}                  ⍝ rows of ⍺ at indices ⍵     = wte[token_id]
cols   ← {⍉↑(↓⍉⍺)[⍵]}                ⍝ columns of ⍺               = q[hs:hs+head_dim]
hcat   ← {{⍺,⍵}/⍵}                   ⍝ side-by-side catenation    = x_attn.extend(head_out)
mask   ← {¯1E10×~(⍳⍵)∘.≥⍳⍵}          ⍝ 0 on/below the diagonal, ¯1E10 above: the causal mask as an addend
onehot ← {⍵∘.=⍳VS}
⍝ backward pieces, one row each:  y=x/rms → dx=(dy−y·mean(y·dy))/rms ;  p=softmax(s) → ds=p·(dp−⟨p,dp⟩)
rmsn_b ← {dy←⍺ ⋄ x←⍵ ⋄ r←(EPS+(+/x*2)÷≢x)*0.5 ⋄ y←x÷r ⋄ (dy-y×(+/y×dy)÷≢y)÷r}
sm_b   ← {p←⍺ ⋄ dy←⍵ ⋄ p×dy-+/p×dy}
rmsrows_b ← {↑(↓⍺)rmsn_b¨↓⍵}
smrows_b  ← {↑(↓⍺)sm_b¨↓⍵}

⍝ ───────────────────────────── weights ─────────────────────────────
NAMES←'wte' 'wpe' 'lm_head' 'attn_wq' 'attn_wk' 'attn_wv' 'attn_wo' 'mlp_fc1' 'mlp_fc2'
W←⎕NS ⍬ ⋄ G←⎕NS ⍬ ⋄ M←⎕NS ⍬ ⋄ V←⎕NS ⍬
load←{↑⍎¨⎕LNS 'w/',⍵,'.txt'}
_←{⍵(W⌸)load ⍵ ⋄ ⍵(M⌸)0×load ⍵ ⋄ ⍵(V⌸)0×load ⍵ ⋄ ⍬}¨NAMES

⍝ ───────────────────────────── forward + backward for one document ─────────────────────────────
⍝ ⍵: token ids (n+1, starting with BOS). Returns the mean loss; leaves gradients in G.
⍝ Read the forward block against gpt() in microgpt.py; each backward line undoes the forward line above it.
STEP←{toks←⍵
  n←BLK⌊¯1+≢toks ⋄ ids←n↑toks ⋄ tg←n↑1↓toks
  ⍝ ── forward ──
  X ←(W.wte gather ids)+W.wpe gather ⍳n          ⍝ x = wte[tok] + wpe[pos]            (n×NE)
  Xp←rmsrows X                                    ⍝ x = rmsnorm(x)
  X1←rmsrows Xp                                   ⍝ pre-attention norm
  Q←X1 mm ⍉W.attn_wq ⋄ K←X1 mm ⍉W.attn_wk ⋄ Vv←X1 mm ⍉W.attn_wv
  Qh←{Q cols (⍵×HD)+⍳HD}¨⍳NH                     ⍝ split heads: list of NH matrices (n×HD)
  Kh←{K cols (⍵×HD)+⍳HD}¨⍳NH
  Vh←{Vv cols (⍵×HD)+⍳HD}¨⍳NH
  S ←Qh{(mask n)+(⍺ mm ⍉⍵)÷HD*0.5}¨Kh            ⍝ scores per head, masked           (n×n each)
  A ←smrows¨S                                     ⍝ attention weights per head
  H ←A mm¨Vh                                      ⍝ head outputs                       (n×HD each)
  Hc←hcat H                                       ⍝ concat heads                       (n×NE)
  X2←Xp+Hc mm ⍉W.attn_wo                          ⍝ residual
  X3←rmsrows X2
  M0←X3 mm ⍉W.mlp_fc1 ⋄ Mr←0⌈M0                   ⍝ fc1, relu
  X4←X2+Mr mm ⍉W.mlp_fc2                          ⍝ residual
  L ←X4 mm ⍉W.lm_head                             ⍝ logits                             (n×VS)
  P ←smrows L
  loss←-(÷n)×+/⍟+/P×onehot tg                     ⍝ mean −log p(target)
  ⍝ ── backward (chain rule, one line per forward line, bottom-up) ──
  dL←(P-onehot tg)÷n                              ⍝ softmax+cross-entropy: (p − onehot)/n
  'lm_head'(G⌸)(⍉dL)mm X4 ⋄ dX4←dL mm W.lm_head
  'mlp_fc2'(G⌸)(⍉dX4)mm Mr ⋄ dMr←dX4 mm W.mlp_fc2
  dM0←dMr×M0>0                                    ⍝ relu backward
  'mlp_fc1'(G⌸)(⍉dM0)mm X3 ⋄ dX3←dM0 mm W.mlp_fc1
  dX2←dX4+dX3 rmsrows_b X2                        ⍝ residual: gradient adds
  'attn_wo'(G⌸)(⍉dX2)mm Hc ⋄ dHc←dX2 mm W.attn_wo
  dH ←{dHc cols (⍵×HD)+⍳HD}¨⍳NH                   ⍝ un-concat heads
  dVh←(⍉¨A)mm¨dH                                  ⍝ H = A·Vh  →  dVh = Aᵀ·dH
  dA ←dH mm¨⍉¨Vh                                  ⍝              dA  = dH·Vhᵀ
  dS ←(A smrows_b¨dA)÷HD*0.5                      ⍝ softmax backward, then the 1/√HD scale
  dQh←dS mm¨Kh                                    ⍝ S = Qh·Khᵀ →  dQh = dS·Kh
  dKh←(⍉¨dS)mm¨Qh                                 ⍝              dKh = dSᵀ·Qh
  dQ←hcat dQh ⋄ dK←hcat dKh ⋄ dV←hcat dVh
  'attn_wq'(G⌸)(⍉dQ)mm X1 ⋄ 'attn_wk'(G⌸)(⍉dK)mm X1 ⋄ 'attn_wv'(G⌸)(⍉dV)mm X1
  dX1←(dQ mm W.attn_wq)+(dK mm W.attn_wk)+dV mm W.attn_wv
  dXp←dX2+dX1 rmsrows_b Xp                        ⍝ residual + norm backward
  dX ←dXp rmsrows_b X
  'wte'(G⌸)(⍉onehot ids)mm dX                     ⍝ scatter-add: rows of dX summed into the token's row
  'wpe'(G⌸)dX⍪((BLK-n),NE)⍴0                      ⍝ positions are unique: rows 0..n-1, zeros below
  loss
}

⍝ ───────────────────────────── Adam, one step over all matrices ─────────────────────────────
ADAM←{t←1+⊃⍵ ⋄ lr←1⊃⍵
  _←{k←⍵ ⋄ g←k⊃G
     m←(B1×k⊃M)+(1-B1)×g ⋄ v←(B2×k⊃V)+(1-B2)×g*2
     k(M⌸)m ⋄ k(V⌸)v
     k(W⌸)(k⊃W)-lr×(m÷1-B1*t)÷EPSA+((v÷1-B2*t)*0.5)
     ⍬}¨NAMES
  ⍬}

⍝ ───────────────────────────── data + training ─────────────────────────────
docs←⎕LNS 'docs.txt'                              ⍝ the same shuffled order as microgpt.py, seed 42
uchars←⎕LA                                        ⍝ a..z  (dzaima: lowercase alphabet)
encode←{uchars⍳⍵}
tokens←{BOS,(encode ⍵),BOS}
RUN NSTEPS←⍎⊃⎕LNS 'nsteps.txt'                  ⍝ steps to run, schedule length (lr decays to 0 at NSTEPS)
losses←{step←⍵
  l←STEP tokens (step|⍨≢docs)⊃docs
  _←ADAM step (LR0×1-step÷NSTEPS)
  l}¨⍳RUN
⎕←'loss per step:'
⎕←losses

⍝ ───────────────────────────── sampling ─────────────────────────────
⍝ Forward only, re-run on the growing sequence (no KV cache: BLK is small).
LOGITS←{ids←⍵ ⋄ n←≢ids
  X←(W.wte gather ids)+W.wpe gather ⍳n ⋄ X1←rmsrows rmsrows X
  Q←X1 mm ⍉W.attn_wq ⋄ K←X1 mm ⍉W.attn_wk ⋄ Vv←X1 mm ⍉W.attn_wv
  Qh←{Q cols (⍵×HD)+⍳HD}¨⍳NH ⋄ Kh←{K cols (⍵×HD)+⍳HD}¨⍳NH ⋄ Vh←{Vv cols (⍵×HD)+⍳HD}¨⍳NH
  H←(smrows¨Qh{(mask n)+(⍺ mm ⍉⍵)÷HD*0.5}¨Kh)mm¨Vh
  X2←(rmsrows X)+(hcat H)mm ⍉W.attn_wo
  X4←X2+(0⌈(rmsrows X2)mm ⍉W.mlp_fc1)mm ⍉W.mlp_fc2
  X4 mm ⍉W.lm_head}
sample←{temp←⍵
  next←{p←sm (⊃⌽↓LOGITS ⍵)÷temp ⋄ ⍵,⊃⍸(+\p)≥?0}     ⍝ inverse-CDF draw from the last row's softmax
  grow←{(BOS=⊃⌽⍵)∧1<≢⍵:←⍵ ⋄ BLK≤≢⍵:←⍵ ⋄ ∇ next ⍵}     ⍝ dzaima: A:←B returns early; A:B does not
  ids←1↓grow ,BOS
  ⎕LA[(ids⍳BOS)↑ids]}
⎕←'samples at temperature 0.5:'
_←{⎕←sample 0.5 ⋄ ⍬}¨⍳10

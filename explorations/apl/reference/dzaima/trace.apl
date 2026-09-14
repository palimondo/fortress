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


⍝ ═══ trace: the document "ab"  →  tokens BOS a b BOS  →  3 inputs, 3 targets
toks←BOS,(⎕LA⍳'ab'),BOS
n←BLK⌊¯1+≢toks ⋄ ids←n↑toks ⋄ tg←n↑1↓toks
show←{⎕←⍺ ⋄ ⎕←'  shape' (⍴⍵) ⋄ ⎕←⍵ ⋄ ⍬}
_←'ids (inputs)' show ids
_←'tg  (targets)' show tg
X←(W.wte gather ids)+W.wpe gather ⍳n
_←'X ← wte[ids] + wpe[0..n-1]   one row per position' show 4↑[1]X
_←'rmsn of row 0 of X   (each row scaled to unit RMS)' show 4↑rmsn ⊃↓X
_←'+/ (rmsn row)*2 ÷ 16  → RMS² of the normalized row ≈ 1' show (+/(rmsn ⊃↓X)*2)÷16
X1←rmsrows rmsrows X
Q←X1 mm ⍉W.attn_wq
_←'Q ← X1 mm ⍉wq   (n × NE): each row is that position''s query' show 4↑[1]Q
Qh←{Q cols (⍵×HD)+⍳HD}¨⍳NH
_←'Qh ← columns 0..3 / 4..7 / 8..11 / 12..15 of Q: a list of 4 matrices; head 0 =' show ⊃Qh
_←'mask n   (0 keep, ¯1E10 forbid: position i may see j ≤ i)' show mask n
K←X1 mm ⍉W.attn_wk ⋄ Kh←{K cols (⍵×HD)+⍳HD}¨⍳NH
S←Qh{(mask n)+(⍺ mm ⍉⍵)÷HD*0.5}¨Kh
_←'S, head 0 ← (mask n) + (Qh mm ⍉Kh) ÷ √HD   (n × n scores)' show ⊃S
A←smrows¨S
_←'A, head 0 ← softmax of each row of S   (rows sum to 1; upper triangle → 0)' show ⊃A
_←'row sums of A head 0' show +/⊃A
_←'A, head 1  (a different pattern from the same input)' show 1⊃A

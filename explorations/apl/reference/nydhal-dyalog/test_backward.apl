⍝ test_backward.apl — gradient parity for microgpt.apln BWD
⍝ Runs FWD + BWD on the first training doc, compares every weight's
⍝ gradient against the Python reference dump in weights/grad_*.bin.
⍝ Also verifies the loss returned by BWD against weights/loss.bin.

⎕IO←0 ⋄ ⎕CT←0 ⋄ ⎕PP←17

M ← ⎕FIX 'file://microgpt.apln'
M.LOAD 'weights'

INPUTS  ← 26 24 20 7 4 13 6                      ⍝ input_tokens from manifest
TARGETS ← 24 20 7 4 13 6 26                      ⍝ target_tokens from manifest
N       ← 7
NE      ← M.NE ⋄ VS ← M.VS ⋄ BLK ← M.BLK
TOL     ← 1E¯10

logits ← M.FWD INPUTS
loss   ← M.BWD TARGETS

⍝ Loss check
py_loss ← ⊃(,1) M.loadmat 'weights/loss.bin'
d_loss  ← |loss - py_loss
⎕ ← 'loss: apl=',(⍕loss),' py=',(⍕py_loss),' diff=',⍕d_loss

⍝ Gradient checks — every weight
checks ← ⍬
checks ,← ⊂'grad_wte'      (VS NE)       M.G.wte
checks ,← ⊂'grad_wpe'      (BLK NE)      M.G.wpe
checks ,← ⊂'grad_lm_head'  (VS NE)       M.G.lm_head
checks ,← ⊂'grad_attn_wq'  (NE NE)       M.G.attn_wq
checks ,← ⊂'grad_attn_wk'  (NE NE)       M.G.attn_wk
checks ,← ⊂'grad_attn_wv'  (NE NE)       M.G.attn_wv
checks ,← ⊂'grad_attn_wo'  (NE NE)       M.G.attn_wo
checks ,← ⊂'grad_mlp_fc1'  ((4×NE) NE)   M.G.mlp_fc1
checks ,← ⊂'grad_mlp_fc2'  (NE (4×NE))   M.G.mlp_fc2

worst ← 0
pass  ← d_loss<TOL
:For c :In checks
    name shp apl ← c
    py ← shp M.loadmat 'weights/',name,'.bin'
    d  ← ⌈/,|apl-py
    worst ⌈← d
    ok ← d<TOL
    pass ∧← ok
    ⎕ ← (ok⊃'✗' '✓'),' ',name,(18⍴' ')↓⍨≢name,' diff ',⍕d
:EndFor

⎕ ← ''
⎕ ← 'worst grad diff: ',⍕worst
⎕ ← pass⊃'FAIL' 'PASS'
⎕OFF (~pass)

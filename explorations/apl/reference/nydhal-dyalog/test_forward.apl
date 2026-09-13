⍝ test_forward.apl — full-sequence forward parity for microgpt.apln
⍝ Compares each cached ACT intermediate against the corresponding
⍝ Python reference dump in weights/*.bin. All layers should agree
⍝ within the tolerance below.

⎕IO←0 ⋄ ⎕CT←0 ⋄ ⎕PP←17

M ← ⎕FIX 'file://microgpt.apln'
M.LOAD 'weights'

IDS ← 26 24 20 7 4 13 6                         ⍝ input_tokens from manifest (n=7)
N   ← 7
NE  ← M.NE ⋄ NH ← M.NH ⋄ HD ← M.HD ⋄ VS ← M.VS
TOL ← 1E¯12

logits ← M.FWD IDS

⍝ Expected shapes for each intermediate, matching the Python dumps.
checks ← ⍬
checks ,← ⊂'X_emb'       (N NE)       M.ACT.X
checks ,← ⊂'X_prime'     (N NE)       M.ACT.Xp
checks ,← ⊂'X1'          (N NE)       M.ACT.X1
checks ,← ⊂'Q'           (N NE)       M.ACT.Q
checks ,← ⊂'K'           (N NE)       M.ACT.K
checks ,← ⊂'V'           (N NE)       M.ACT.V
checks ,← ⊂'Qh'          (NH N HD)    M.ACT.Qh
checks ,← ⊂'Kh'          (NH N HD)    M.ACT.Kh
checks ,← ⊂'Vh'          (NH N HD)    M.ACT.Vh
checks ,← ⊂'scores'      (NH N N)     M.ACT.S
checks ,← ⊂'attn'        (NH N N)     M.ACT.A
checks ,← ⊂'head_out'    (NH N HD)    M.ACT.H
checks ,← ⊂'head_concat' (N NE)       M.ACT.Hc
checks ,← ⊂'X2'          (N NE)       M.ACT.X2
checks ,← ⊂'X3'          (N NE)       M.ACT.X3
checks ,← ⊂'mlp_fc1_out' (N (4×NE))   M.ACT.M0
checks ,← ⊂'X_relu'      (N (4×NE))   M.ACT.Mr
checks ,← ⊂'X4'          (N NE)       M.ACT.X4
checks ,← ⊂'logits'      (N VS)       logits

worst ← 0
pass  ← 1
:For c :In checks
    name shp apl ← c
    py ← shp M.loadmat 'weights/',name,'.bin'
    d  ← ⌈/,|apl-py
    worst ⌈← d
    ok ← d<TOL
    pass ∧← ok
    ⎕ ← (ok⊃'✗' '✓'),' ',name,(20⍴' ')↓⍨≢name,' diff ',⍕d
:EndFor

⎕ ← ''
⎕ ← 'worst diff: ',⍕worst
⎕ ← pass⊃'FAIL' 'PASS'
⎕OFF (~pass)

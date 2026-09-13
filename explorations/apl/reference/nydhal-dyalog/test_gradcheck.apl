⍝ test_gradcheck.apl — finite-difference check on BWD
⍝ Independent verification that BWD's analytical gradients match the
⍝ numerical derivative of the loss. Perturbs 5 random scalars in each
⍝ weight matrix by ±ε and compares the central difference against BWD's
⍝ analytical gradient.
⍝ Target: relative error < 1E¯5 for every sampled scalar.

⎕IO←0 ⋄ ⎕CT←0 ⋄ ⎕PP←17 ⋄ ⎕RL ← 17

M ← ⎕FIX 'file://microgpt.apln'
M.LOAD 'weights'

INPUTS  ← 26 24 20 7 4 13 6
TARGETS ← 24 20 7 4 13 6 26
EPS     ← 1E¯5
NSAMPLE ← 5
TOL     ← 1E¯5

⍝ Compute loss for the current weights without touching gradients
losslfn ← {
    _ ← M.FWD INPUTS
    P   ← M.softmax⍤1⊢M.ACT.logits
    oh  ← TARGETS∘.=⍳M.VS
    -(÷≢TARGETS)×+/⍟+/P×oh
}

⍝ Analytical gradients from BWD
_ ← M.FWD INPUTS
_ ← M.BWD TARGETS

names ← 'wte' 'wpe' 'lm_head' 'attn_wq' 'attn_wk' 'attn_wv' 'attn_wo' 'mlp_fc1' 'mlp_fc2'

worst ← 0
pass  ← 1

:For name :In names
    shp  ← ⍴M.W⍎name                                 ⍝ weight shape
    Gmat ← M.G⍎name                                  ⍝ analytical grad (copy ok — read only)
    nelem ← ×/shp
    idxs ← (NSAMPLE⌊nelem)?nelem
    row_worst ← 0
    :For i :In idxs
        ij ← shp⊤i                                   ⍝ (row, col)
        path ← 'M.W.',name
        orig ← ⍎path,'[⊂ij]'
        ⍎path,'[⊂ij] ← orig+EPS'
        l_plus ← losslfn ⍬
        ⍎path,'[⊂ij] ← orig-EPS'
        l_minus ← losslfn ⍬
        ⍎path,'[⊂ij] ← orig'
        numerical ← (l_plus-l_minus)÷2×EPS
        analytical ← Gmat[⊂ij]
        rel ← (|numerical-analytical)÷(|analytical)⌈(|numerical)⌈1E¯8
        row_worst ⌈← rel
    :EndFor
    worst ⌈← row_worst
    ok ← row_worst<TOL
    pass ∧← ok
    ⎕ ← (ok⊃'✗' '✓'),' ',name,(12⍴' ')↓⍨≢name,' worst rel err ',⍕row_worst
:EndFor

⎕ ← ''
⎕ ← 'overall worst relative error: ',⍕worst
⎕ ← pass⊃'FAIL' 'PASS'
⎕OFF (~pass)

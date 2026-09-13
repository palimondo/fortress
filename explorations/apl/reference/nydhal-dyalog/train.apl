⍝ train.apl — top-level training demo
⍝ Loads the tokenizer, initializes random weights (loaded from python dumps
⍝ for reproducibility), trains for 1000 steps on shuffled names.txt, then
⍝ samples 20 names.
⍝
⍝ Run:  dyalog +s -script train.apl

⎕IO←0 ⋄ ⎕CT←0 ⋄ ⎕PP←6 ⋄ ⎕RL←42

M ← ⎕FIX 'file://microgpt.apln'
_ ← M.INIT_DATA 'names.txt'
⎕ ← 'docs: ',⍕≢M.DATA.docs
⎕ ← 'vocab: ',⍕M.DATA.VS,' chars (',M.DATA.uchars,' + BOS)'

⍝ Initial weights from the python reference (so both implementations
⍝ start from the same point and the initial loss matches)
M.LOAD 'weights'

⎕ ← ''
⎕ ← 'training 1000 steps...'
losses ← M.TRAIN 1000
⎕ ← 'initial loss: ',⍕2⍕⊃losses
⎕ ← '   100 loss: ',⍕2⍕losses[99]
⎕ ← '   500 loss: ',⍕2⍕losses[499]
⎕ ← '   999 loss: ',⍕2⍕⊃⌽losses

⎕ ← ''
⎕ ← 'generated names (temp=0.8):'
⎕RL ← 123
:For i :In ⍳20
    name ← M.GEN 0.8
    ⎕ ← '  ',(2⍕i),'  ',name
:EndFor
⎕OFF 0

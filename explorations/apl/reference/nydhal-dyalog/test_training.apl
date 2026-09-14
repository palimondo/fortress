⍝ test_training.apl — 10-step training trajectory parity
⍝ Reloads initial weights, runs TRAIN_STEP on the first 10 documents (in the
⍝ shuffled order captured by export_training.py), and verifies:
⍝   1. Each step's loss against losses_10.bin
⍝   2. Final weights against *_trained10.bin
⍝ Target: per-step loss diff < 1e-10, final weight diff < 1e-10.

⎕IO←0 ⋄ ⎕CT←0 ⋄ ⎕PP←17

M ← ⎕FIX 'file://microgpt.apln'
M.LOAD 'weights'
_ ← M.INIT_OPT ⍬

⍝ Load the 10-step training manifest (json) to get doc token sequences
manifest_src ← ⊃⎕NGET 'weights/train10_manifest.json'
manifest ← ⎕JSON manifest_src
NSTEPS ← manifest.nsteps
step_docs ← manifest.step_docs                  ⍝ array of namespaces, each with .tokens and .n

⍝ Python's reference losses
py_losses ← (,NSTEPS) M.loadmat 'weights/losses_10.bin'

TOL_LOSS    ← 1E¯10
TOL_WEIGHT  ← 1E¯10

apl_losses ← ⍬
:For step :In ⍳NSTEPS
    sd ← step⊃step_docs
    tokens ← sd.tokens
    n ← sd.n
    inputs  ← tokens[⍳n]
    targets ← tokens[1+⍳n]
    l ← M.TRAIN_STEP inputs targets step
    apl_losses ,← l
:EndFor

⎕ ← ''
⎕ ← 'step  apl_loss              py_loss               diff'
:For i :In ⍳NSTEPS
    al ← apl_losses[i]
    pl ← py_losses[i]
    d  ← |al-pl
    ⎕ ← (2⍕i),'  ',(⍕al),'  ',(⍕pl),'  ',⍕d
:EndFor

worst_loss ← ⌈/|apl_losses-py_losses
⎕ ← 'worst loss diff: ',⍕worst_loss

⍝ Final weights check
names ← 'wte' 'wpe' 'lm_head' 'attn_wq' 'attn_wk' 'attn_wv' 'attn_wo' 'mlp_fc1' 'mlp_fc2'
NE ← M.NE ⋄ VS ← M.VS ⋄ BLK ← M.BLK
shapes ← (VS NE)(BLK NE)(VS NE)(NE NE)(NE NE)(NE NE)(NE NE)((4×NE) NE)(NE (4×NE))

worst_w ← 0
wpass ← 1
⎕ ← ''
:For i :In ⍳≢names
    name ← i⊃names
    shp  ← i⊃shapes
    apl_w ← M.W⍎name
    py_w  ← shp M.loadmat 'weights/',name,'_trained10.bin'
    d ← ⌈/,|apl_w-py_w
    worst_w ⌈← d
    ok ← d<TOL_WEIGHT
    wpass ∧← ok
    ⎕ ← (ok⊃'✗' '✓'),' ',name,(12⍴' ')↓⍨≢name,' diff ',⍕d
:EndFor

⎕ ← ''
⎕ ← 'worst weight diff: ',⍕worst_w

pass ← (worst_loss<TOL_LOSS)∧wpass
⎕ ← pass⊃'FAIL' 'PASS'
⎕OFF (~pass)

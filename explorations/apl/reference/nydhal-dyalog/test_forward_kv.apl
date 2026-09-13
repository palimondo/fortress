⍝ test_forward_kv.apl — forward parity check for microgpt_kv.apln
⍝ Runs the KV forward pass token-by-token on the first training document,
⍝ stacks per-position logits into an (n × VS) matrix, and compares to
⍝ weights/logits.bin (from export_weights.py). Target: < 1e-12 max abs diff.
⍝ Run via: run_tests.sh forward_kv  (cwd must be the project root)

⎕IO←0 ⋄ ⎕CT←0 ⋄ ⎕PP←17

M ← ⎕FIX 'file://microgpt_kv.apln'
M.LOAD 'weights'
_ ← M.RESET ⍬

IDS ← 26 24 20 7 4 13 6 26                     ⍝ first_doc_tokens from weights/manifest.json
N   ← 7

rows ← ⍬
pos  ← 0
:While pos<N
    rows ,← ⊂ M.GPT_STEP (IDS[pos]) pos
    pos +← 1
:EndWhile
apl_logits ← ↑rows

py_logits ← (N 27) M.loadmat 'weights/logits.bin'
d_logits  ← ⌈/,|apl_logits - py_logits
⎕ ← 'logits max abs diff: ',⍕d_logits

losses ← ⍬
pos    ← 0
:While pos<N
    p       ← M.softmax apl_logits[pos;]
    losses ,← -⍟p[IDS[pos+1]]
    pos    +← 1
:EndWhile
apl_loss ← (÷N)×+/losses
py_loss  ← ⊃(,1) M.loadmat 'weights/loss.bin'
d_loss   ← |apl_loss - py_loss
⎕ ← 'loss: apl=',(⍕apl_loss),' py=',(⍕py_loss),' diff=',⍕d_loss

pass ← (d_logits<1E¯12) ∧ (d_loss<1E¯12)
⎕ ← pass⊃'FAIL' 'PASS'
⎕OFF (~pass)

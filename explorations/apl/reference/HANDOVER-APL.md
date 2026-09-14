# Handover — microgpt in APL

For a Claude Code session. Purpose: carry the knowledge of Karpathy's microgpt as written in APL, in two forms, with an interpreter that runs one of them today.

## The three programs

| folder | file | form | dialect | runs here? |
|---|---|---|---|---|
| `nydhal-dyalog/` | `microgpt_kv.apln` | **transliteration**: mirrors `microgpt.py` token by token, KV cache, one position per call | Dyalog APL | no (Dyalog is proprietary; free non-commercial licence, not installable in a sandbox) |
| `nydhal-dyalog/` | `microgpt.apln` | **native array form**: whole sequence per pass, causal mask, heads via the rank operator `⍤2`, explicit matrix gradients | Dyalog APL | no |
| `dzaima/` | `microgpt.apl` | **native array form**, rewritten for an open-source interpreter without `⍤`, matrix `+.×`, `A[i;j]`, padding `↑`, or Dyalog guards | dzaima/APL (Java) | **yes** — verified |

Nydhal Selmi's repository (github.com/Nydhal/microgpt.apl, MIT, April 2026) is the reference: the README explains the design, and his test files check forward, backward, a gradient check, and training against weights exported from the Python by `export_weights.py`. He reports bit-for-bit agreement with the original at every layer. Our `dzaima/microgpt.apl` follows the structure of his native file line for line, with each missing primitive replaced by the older idiom (documented in `dzaima/README.md`).

The oracle for all of them is Karpathy's `microgpt.py` (gist 8627fe00…); `microgpt_oracle.py` here is that file with a 200-step limit and full-precision loss prints, used for the differential tests.

## What "native" versus "transliterated" means, in one paragraph

The transliteration keeps Python's control flow: a loop over positions, a KV cache that grows by one row per token, a loop over heads. It proves the notation can express the same steps. The native form removes both loops: positions become the rows of one matrix, the causal mask (−10¹⁰ above the diagonal, added to the scores) replaces the KV loop, and heads become cells of a rank-3 array (Dyalog, `⍤2`) or a list of matrices paired with `¨` (dzaima). Same numbers, no iteration. Reading the two side by side is the shortest route to seeing what "vectorized" means — it is the same difference as between `microgpt.py` and our numpy rung, expressed in a notation that makes the difference visible.

## Verification status of `dzaima/microgpt.apl`

- Loss on the first document from seed-42 weights: `3.36596694758485` = oracle `3.3659669475848504`.
- Five training steps in the oracle's document order: all five losses equal the oracle to 15 printed digits.
- Finite differences on the second document (repeated letter, 8 positions): `wte` rows for the repeated letter and BOS, `wpe` row 7, agree with backprop to 1e-10. **Not yet done: the full check over all nine matrices** — the backward pass is 22 hand-derived lines with no autograd behind them; this test is the first task.
- 1000 steps in ~13 s on one vCPU; samples at temperature 0.5 look like names.
- A differential-test failure caught a real bug: with the schedule length set to the number of steps run, steps 1–2 matched and step 3 did not. `nsteps.txt` now holds `<steps to run> <schedule length>`.

## Running the dzaima version

```
# interpreter: needs a JDK (javac); Java 21 works
git clone --depth 1 https://github.com/dzaima/APL.git && (cd APL && ./build)
cd dzaima
python3 export_weights.py            # writes w/*.txt and docs.txt from Karpathy's seed-42 init (already included)
echo "5 1000" > nsteps.txt           # check against the oracle …
export LANG=C.UTF-8 LC_ALL=C.UTF-8
java -Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 -jar ../APL/APL.jar -f microgpt.apl
echo "1000 1000" > nsteps.txt        # … or train and sample
java -Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 -jar ../APL/APL.jar -f microgpt.apl
java -Dfile.encoding=UTF-8 -Dstdout.encoding=UTF-8 -jar ../APL/APL.jar -f trace.apl   # every array of the forward pass for the document "ab"
```

Oracle losses for `5 1000`: `3.3659669475848504 3.4242727838717717 3.177802125458052 3.066355684224198 3.220883089750623`.

Running the Dyalog files needs Dyalog APL (dyalog.com, free for non-commercial use); Nydhal's `run_tests.sh` shows the invocation.

## Next steps

1. Finite-difference check over all nine matrices in `dzaima/microgpt.apl` (there is a partial one in the session history: perturb via a mask matrix, since dzaima has no `A[i;j]←`).
2. Port `microgpt_kv.apln` (86 lines) to dzaima, so both forms run side by side; then state lemma 1 of RUNGS.md — masked matrix == position loop — as an APL test: same weights, same document, same logits from both files.
3. Multi-layer: `¨` over a list of per-layer weight namespaces, caching intermediates per layer; then the first architecture ablation in APL.
4. Keep the dialect gaps visible in the README rather than smoothing them over: each one (`⍤`, matrix `+.×`, guards) is a lesson in what the modern primitive abbreviates.

## dzaima/APL dialect notes (from the session)

- `f⍤1` → `{↑f¨↓⍵}`; `+.×⍤2` over heads → list of matrices + `¨`.
- Matrix product: `mm←{↑(↓⍺)∘.{+/⍺×⍵}↓⍉⍵}` ("each row of A dotted with each column of B").
- Rows `↑(↓A)[i]`; columns `⍉↑(↓⍉A)[j]`; element `j⊃i⊃↓A`; `A[i;j]` is not implemented.
- `(m,n)↑A` does not pad → `A⍪((m-≢A),n)⍴0`.
- Guards: `A:←B` returns early; `A:B` executes and continues.
- Namespaces: `⎕NS ⍬`; set `'k'(NS⌸)v`; get `'k'⊃NS`; `NS.k` also works for fixed names.
- A dfn local may not share a name with a global function.
- `⎕LNS 'file'` reads lines; `⍎` parses numbers (negatives must use `¯`); `⎕LA` is the lowercase alphabet; `?0` uniform random.
- Run with UTF-8 forced on the JVM or every glyph becomes `?`.

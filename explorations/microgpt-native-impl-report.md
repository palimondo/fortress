# microgpt_native.fss — implementation report

Worker report for the canonical-form transformer rewrite
(`explorations/microgpt_native.fss`, 378 lines, component `microgpt_native`).
Built and run in the worktree
`/home/user/fortress/.claude/worktrees/agent-ab7f3fe2e8f7a5a94`
(JDK 25, `ant compileAll` BUILD SUCCESSFUL, 2 min 29 s).
Only the one new file was created; `git status` shows nothing else touched.
Smoke test `FORTRESS_THREADS=1 ./bin/fortress explorations/mgnative_a.fss`:
PASS (golden gradient checks + XOR final loss 5.5178095183714354E-11,
28.1 s loop).

## Gate 1 — goldenCheck at 1e-9: **PASS, first attempt**

`golden transformer forward/backward vs Python reference: PASS` — all 15
logits over 3 positions, the mean loss (1.228662661701597) and the 5
parameter gradients, all within 1e-9 of v1's hardcoded Python-reference
values, reproduced in every one of the five runs below.

No bisection against v1 was needed, so `explorations/microgpt.fss` was
never modified (no temporary prints added or reverted).

Structural confirmation of decision 2 (heads are structure, not offsets):
the flat parameter list built from the head-partitioned `wq/wk/wv` plus the
flat matrices totals **1264 parameters — identical to v1's count**, i.e.
the row-block partition covers exactly the same weights.

## Gate 2 — nano training run: **PASS**

Nano config identical to v1 (vocab 27, n_embd 8, 2 heads, block 8, 2000
docs, Adam lr 1e-2 with linear decay). `FORTRESS_THREADS=1`.

Loss at the very first steps (temporary print-cadence change, reverted):

| step | 1 | 2 | 3 | 10 |
|---|---|---|---|---|
| loss | 3.3001 | 3.3294 | 3.2115 | 3.2639 |

Starting loss 3.300 ≈ ln 27 = 3.2958, i.e. the uniform-distribution
entropy, matching the expected ~3.29.

Decline over 30 steps (paired run, file as delivered):

| step | 10 | 20 | 30 |
|---|---|---|---|
| loss | 3.1859 | 2.8684 | **2.3364** |

Already inside v1's documented ~2.3 band by step 30. (Per-step loss is
per-document and noisy; the trend is the signal. Each run has a different
Gaussian init, so absolute values differ between runs below.)

### Full 250-step run (beyond the gate)

Launched after the gates with the file exactly as delivered,
`FORTRESS_THREADS=1`: **250 steps in 1,224.4 s = 20.4 min, 4.90 s/step**,
against v1's published 45.4 min / 10.9 s/step for the same config.

| step | 10 | 30 | 50 | 80 | 100 | 150 | 200 | 250 |
|---|---|---|---|---|---|---|---|---|
| loss | 3.218 | 2.468 | 2.573 | 2.062 | 2.214 | 2.188 | 1.498 | 2.339 |

Per-document loss is noisy (each step is one name); the band settles around
~2.0–2.5, matching v1's documented ~2.3 band. Temperature-0.5 samples from
the trained model: *atalenn, arane, maema, jocsane, raria, iaale, ariyly,
sara, lanlia, sonna* — name-like, as in v1.

## Gate 3 — timings

30 training steps, nano config, 4-CPU container. **Indicative only**: other
workers' Fortress JVMs were active on the same box throughout, and the
spread between the two measurements of each configuration is the size of
that noise.

| program | threads | 30 steps | s/step |
|---|---|---|---|
| `microgpt_native` | `FORTRESS_THREADS=1` | 144.2 s | **4.81** |
| `microgpt_native` | `FORTRESS_THREADS=1` (busier box) | 201.0 s | 6.70 |
| `microgpt_native` | 2 workers (= container default) | 251.7 s | **8.39** |
| `microgpt_native` | 2 workers (earlier run) | 231.6 s | 7.72 |
| `microgpt` (v1) | `FORTRESS_THREADS=1` | 170.7 s | **5.69** |
| `microgpt` (v1) | default, as published in microgpt-port.md | — | 10.9 |
| `microgpt_native` | `FORTRESS_THREADS=1`, full 250-step run | 1224.4 s / 250 | 4.90 |

Two readings:

- **The interpreter's performance law reproduces on this program.** Default
  (2 workers, unsaturated) is ~1.5–1.7× *slower* than a single worker —
  the micro-forking churn documented in the design journal, now visible in
  the transformer itself. Parallelism decision 8 (coarse grains only, after
  correctness) is unaffected: nothing here was made explicitly parallel.
- **The native version is not slower than v1** despite `List` indexing
  being O(log n) where v1 used O(1) flat `Array`s: 4.81 vs 5.69 s/step in
  the paired `FORTRESS_THREADS=1` measurement (~15% faster). The n-ary
  `BIG OPLUS` sum nodes replace v1's left-fold chains, so the graph has
  fewer nodes and less depth per reduction, which more than pays for the
  list indexing.

## Syntax traps hit, and the fixes

Found with three throwaway probe files in the scratchpad (never in the
repo), before writing the deliverable.

1. **Chained subscripts on nested lists are a parse trap.** `m[i][j]` where
   `m: List[\List[\RR64\]\]` fails with
   `Failed to find any matching overload, args = (), overload = {_[_]...}`
   — the second bracket group does not become a second subscript. Fix:
   parenthesize the receiver, `(m[i])[j]`. (v1 already had this workaround
   in `(kc.get(t))[hs + j]`, without recording why.) Applied throughout;
   three-level `((gwq[0])[0])[0]` likewise.
2. **A comprehension body ending in a subscript swallows the `|`.**
   `<|[\V\] m[i] | i <- 0#n|>` mis-parses; the fix is to wrap the whole
   body in parens: `<|[\V\] (m[i]) | i <- 0#n|>`. Adopted as a blanket
   convention for every list comprehension in the file.
3. **`^` after a call still needs parens** (known trap, hit again):
   `konst(9.0)^0.5` gives "the argument should not be immediately followed
   by a non-expression element"; `(ms + konst(0.00001))^0.5` is fine.
4. **List-literal type ascriptions are load-bearing** (the journal's
   Rendering-pass lesson, applied pre-emptively): every `<|[\T\] ...|>`
   carries its ascription, including the `gold0/1/2` reference vectors —
   without it numeric literals stay `FloatLiteral` and the list is
   `ArrayList[\FloatLiteral\]`, not `List[\RR64\]`.

Idioms probed and confirmed working (all new to this file):

- multi-generator list comprehension: `<|[\V\] e | h <- 0#nH, m <- 0#hs|>`
  (this is what replaces the flat-offset concatenation of head outputs);
- dependent generators: `<|[\RR64\] x | row <- m, x <- row|>`;
- `zip` inside a *list* comprehension with tuple destructuring:
  `<|[\V\] (p + q) | (p, q) <- a.zip[\V\](b)|>` (P7 had only covered `SUM`);
- `BIG MAX[u <- seq(a)] u.data` over a user type's field;
- **tuple return from a method** plus destructuring binding inside a `for`
  body — `(logits, kh2, vh2) = g.forward(...)` — which is what lets the
  key/value histories be threaded functionally instead of via a mutable
  cache object;
- **top-level `opr juxtaposition(List[\List[\V\]\], List[\V\]): List[\V\]`**
  — so the matrix-vector product is written `W x`, exactly as the papers
  write it;
- `a (u[m])` with `a: V` resolves to the juxtaposition operator, not to
  function application.

Two environment notes (not language issues): the JVM's stdout is
block-buffered when redirected, so progress output only appears at exit —
runs were driven under `script -q -f -c` to get a pty; and `pkill -f
<file>.fss` kills the tool's own wrapper shell (its command line contains
the pattern), so runs must be stopped by PID.

## Deviations from the spec: none forced

All eight decisions of "Architecture of the transformer-scale rewrite" are
implemented as written. Three choices worth recording explicitly, all
inside the decisions rather than against them:

- **`(W x)` is a top-level `opr juxtaposition`** on
  `(List[\List[\V\]\], List[\V\])`, its body the scalar-level comprehension
  decision 1 prescribes: `<|[\V\] (BIG OPLUS[m <- 0#d] (w[r])[m] x[m]) | r
  <- 0#nr|>`. Decision 1 writes the formula as `(W x)_r`, so the operator
  is what makes the source say that.
- **A top-level `opr +(List[\V\], List[\V\])`** was added for the two
  residual connections (`x4 = (wo xa) + x1`), written as a `zip`
  comprehension. Nothing in the spec forbids it and vectors are the
  decision-1 carrier; the alternative was an index loop.
- **Only `wq/wk/wv` are head-indexed** (the three matrices decision 2
  names). `wo/fc1/fc2/wte/wpe/lmHead` stay flat. The per-head outputs are
  reassembled by the two-generator comprehension
  `xa = <|[\V\] ((heads[h])[m]) | h <- 0#nHead, m <- 0#headSize|>`, so no
  `h headDim + m` offset arithmetic survives anywhere in the program; the
  only place the global row index appears is the *init* formula
  (`goldRows(mi, h hs, hs, cols)`), which is exactly the golden-preservation
  constraint decision 2 imposes.

Division (decision 4) is used in all four places the formulas divide:
`opr /(V,V)` with ∂ = (1/b, −a/b²) and `opr /(V,RR64)` with ∂ = 1/c;
RMSNorm as `x / (…)^0.5` (v1: `x · (…)^(−0.5)`), softmax as `e / z`
(v1: `e · z^(−1)`), the attention scale as `/ SQRT(d_k)` (v1: `· attScale`),
and the loss/temperature normalizations as `/ n`, `/ temp`. Each swap moves
the last bits of the result by ~1e-16 relative; the golden check passes at
1e-9 with room to spare.

## Files

- deliverable: `explorations/microgpt_native.fss` (in the worktree), copy at
  `.../scratchpad/microgpt_native.fss`
- run logs in the scratchpad: `nat_ft1.log` / `nat_ft1b.log` (single
  worker), `nat_def.log` / `nat_def2.log` (2 workers), `nat_s1.log`
  (step-1 loss), `v1_ft1.log` (v1 re-baseline), `nat_full.log` (250-step
  run), `mgnprobe.fss` / `p2.fss` / `p3.fss` (syntax probes)

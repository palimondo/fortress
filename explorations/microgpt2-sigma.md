<!-- Produced by the delegated Sigma-adoption build worker, 2026-08-30; integrated
     after an independent golden-gate run in the main checkout. Basis:
     explorations/sum-experiment-report.md (clean-room result) on Pavol's
     standing order that the notation use Sigma where the literature does.
     Probes: explorations/sigma-probes/. Design journal:
     explorations/microgpt-native.md. -->

# Σ adoption in `explorations/microgpt2.fss` — build worker report

Worktree `/home/user/fortress/.claude/worktrees/agent-a70fb43e2a8469d40`; build outputs copied from the main checkout (no `ant`); every run `FORTRESS_THREADS=1`, JDK 25. No commits, no pushes, nothing touched in the main checkout.

**Deliverables (worktree):** `explorations/microgpt2.fss`; `explorations/fortify/{block-sigma,block-softmax,sheet-engine,sheet-notation,sheet-rowlike}.{tic,-light.svg,-dark.svg}` (`block-sigma` is new); `explorations/sigma-probes/{s1_shapes.fss,t_sigma.tic,mg2_nodes_*.fss}`. Everything mirrored, with logs, diffs, instruments and rasterized PNGs, in `scratchpad/sigma-adoption/`.

## Headline

The except-route works in situ, first try. **Every place the ML literature writes Σ, the file now writes `SUM`, and Fortify typesets it as a real Σ with the generator clause as its subscript.** The named function `sum(...)` and the n-ary sum node are gone; the engine has no summation of its own any more.

| | before | after |
|---|---|---|
| goldenCheck @ 1e-9 | PASS | **PASS** |
| goldenCheck @ 1e-15 | PASS | **PASS** (both fail at 1e-16) |
| stripped core lines | 215 | **221** (+6; Python 152 → 1.45×) |
| tape nodes, golden config | 1384 | **1802** (+418, +30.2%) |
| s/step, same box, same hour | 4.14 | **5.17** (+25%) |

## A. The reduction, and the critical correctness question

```fortress
import FortressLibrary.{...} except { opr BIG + }        (* line 2 *)

opr +(z: ZZ32, v: Value): Value = v + (z 1.0)
opr +(v: Value, z: ZZ32): Value = v + (z 1.0)

object PlusReduction extends CommutativeMonoidReduction[\Any\]
  empty(): Any = 0
  join(a: Any, b: Any): Any = a + b
end

opr SUM[\T\](): BigReduction[\Any,Any\] = BigReduction[\Any,Any\](PlusReduction)
```

Six code lines plus the import. The sugar overload `opr SUM[\T\](g: Generator[\T\])` from p15 is **not** declared — the file uses no bare `SUM g`, and the comprehension form desugars to the nullary only. In-situ confirmation that it is unnecessary.

**The chain passes.** A monoid reduction builds a chain of binary `+` nodes instead of one n-ary node, and the golden check passes unchanged at 1e-9. I then tightened the tolerance to find out how far the reassociation actually moves anything: **both the chained and the n-ary versions pass at 1e-15 and both fail at 1e-16** — i.e. the difference is below the resolution of `RR64` at magnitude 1. Instrument: `scratchpad/sigma-adoption/mktol.py` + `tolladder.sh`; probe files were regenerated and archived.

I also ran the chained version at `FORTRESS_THREADS=4` at 1e-15: still PASS. So the fold order is not observable here, and I dropped the old `seq(addends)` — the reproducibility contract it protected costs nothing to give up at this scale. (`seq` survives only where it already was: `backward`, the step loop, and `sample`'s prefix sum.) Probe `s1_shapes.fss` Q1c shows a `seq`-ed and a non-`seq`-ed dot product bit-identical.

**Decision: the n-ary `sum` machinery is retired**, not kept as an internal detail. Justification: (a) it has no callers left; (b) the chain is what Karpathy's own `sum()` over `Value` objects builds, so the Fortress tape and the reference tape now have the *same shape*, which strengthens the golden check rather than weakening it; (c) keeping a private `sum` beside a public Σ would mean two summation stories in one file, and the engine sheet's old caption ("the how-autodiff-sees-Σ lesson") would then be a lie in both directions. The honest cost is the +30% nodes and +25% s/step, stated in the file itself and on the engine sheet.

**Why `empty()` needs the two identity overloads, and why the model never touches them.** Counted in the probe (`s1_shapes.fss` Q3): an *unfiltered* reduction over n elements performs exactly n−1 joins and never calls `empty()`. A *filtered* one calls `empty()` once and joins the numeric `0` in — that is the only path that reaches `opr +(ZZ32, Value)`. microgpt2 has no filtered and no empty Σ, so the two lines are never executed; they exist so that Σ over `Value` is total rather than a landmine.

**Where an empty Σ could arise and why it can't** (asked explicitly): the five Σ sites are `DOT` and `p M` over a carrier's `indices` (dimensions are 4, 8, 27, 32 — never 0); softmax's `Z` over `e`, with `|e| = |a| ≥ 1`; the mean loss over `losses`, with `n = blockSize MIN (|toks| - 1) ≥ 1` because `tokenize` always emits `BOS … BOS` so `|toks| ≥ 2`; and `sample`'s `0#(j+1)` with `j ≥ 0`. All five are stated in the file's comment.

## B. Where Σ went

| site | literature | Fortress |
|---|---|---|
| dot product | x·y = Σⱼ xⱼyⱼ | `opr DOT(u: Vec, w: Vec): Value = SUM[m <- u.indices] u[m] w[m]` |
| left-multiplication | (pM)_c = Σⱼ pⱼ M_{jc} | `Vec(<| SUM[j <- p.indices] p[j] (m[j])[c] | c <- (m[0]).indices |>)` |
| softmax denominator | Z = Σⱼ e^{zⱼ} | `Z = SUM[u <- e] u` |
| mean loss | L = (1/T) Σₜ ℓₜ | `loss = (SUM[l <- losses] l) / n` |
| inverse-CDF | j = #{ j : Σ_{i≤j} pᵢ < r } | unchanged (already a genuine numeric Σ) |

`W x` stays `Vec(<| r DOT x | r <- w |>)` — it renders as `Vec(⟨ r · x | r ← w ⟩)`, which *is* (Wx)_r = W_r·x, and writing the index form there would duplicate `DOT`'s own formula. **Not** touched: `backward`, `params()`, the Adam sweep, the harness loops — the paper writes no Σ there. `nll` is character-identical. `attend(q: Vec, K: Mat, V: Mat): Vec = softmax(q K^T / SQRT d_k) V` is **verbatim** (`block-attention.*` not regenerated, confirmed by `git status`); its meaning is now strictly richer, because the `q K^T` on that line resolves through a `Σ` and `softmax(…) V` through the same one.

## C. Interplay traps — all probed, all clear

`s1_shapes.fss` (worktree, transcript in `scratchpad/sigma-adoption/s1-transcript.txt`) is a miniature of the real design — ring-valued `Value`, `RowLike`/`Vec`/`ProbDist`/`Mat`, both juxtaposition directions — under the `except` import. 29 checks, all pass:

- **Parsing.** `SUM[m <- u.indices] u[m] w[m]` parses with a juxtaposed body and no parens. `<| SUM[…] … | c <- … |>` parses — the reduction body does not swallow the comprehension's bar.
- **`except` coexistence.** `import List.{...}` and `import File.{...}` are unaffected; `BIG MAX`, `BIG AND`, `MIN`, `DIV`, `REM`, `#`, `zip`, `array`, `random`, `nanoTime`, `char`, `cos`, `log`, `exp`, `SQRT`, `emptyList`, `FileReadStream` all still resolve — the full 30-step run plus inference exercises every one of them.
- **Carrier `=`.** `u = u` is `true`, `m = m` is `true` (the `HasRank` reflexive-false landmine stays fixed); `u = w` is `false`.
- **Generator integration.** `|u|`, `u[i]`, `u.indices`, `zip`, `BIG MAX[x <- u] x`, nested Σ and two-generator Σ over `Value` all work.
- **Both juxtaposition directions** with a `ProbDist` on the left of one of them.
- **Numeric Σ in the same component**, over `ZZ32` and `RR64`, including the empty case.

## Deviations from the paper form, classified

1. **The `except` import line** (+1 line the paper has no analogue for). *Design limit, made visible.* A reduction desugars to a **nullary** operator call (`PreTypeCheckDesugaringVisitor.java:358-373`) and Fortress overloading is decided on value parameter lists alone (`basic/overloading.tex:99-105`), so a big operator's name admits exactly one declaration. Σ is not extensible by **addition**, only by **replacement**. This is exhibit content, not an embarrassment: it is the sharpest "grow the language / but only this far" datum in the whole file.
2. **Spelled `opr BIG +`, not `opr SUM`.** *Implementation wart* — the import grammar's `SimpleName` has no `SUM` alias, though `Parameter.rats:129` provides one for declarations. Inherited from the sum experiment (p20), not introduced here.
3. **The two `opr +(ZZ32, Value)` identity overloads.** *Design limit.* A single polymorphic reduction cannot know a user type's zero: the identity comes from `empty()`, which sees no element and no static type. Never executed by the model.
4. **An empty Σ over `Value` returns numeric `0`, not `Value(0.0)`.** *Design limit,* unreachable here (enumerated above).
5. **`Z` bound rather than an inline denominator.** *Grammar limit + deliberate-with-reason.* A reduction is a `FlowExpr` in the spec's own grammar (`appendices/grammars/concrete-syntax.tex:971-974`, the same production as `throw` and `spawn`), confirmed by `Expression.rats:699-707` and by the error (`microgpt2.fss:295:20: Syntax Error`), so `e / SUM[u <- e] u` is illegal and `e / (SUM[u <- e] u)` is required. I built and rendered both. The inline form typesets as three nested auto-scaled parens; the bound form typesets as `Z = Σ_{u←e} u` / `ProbDist((e/Z).xs)` and is *also* Karpathy's own structure (`total = sum(exps)`) and the partition function's own name. Side-by-side render: `scratchpad/sigma-adoption/fortify/softmax-inline-vs-bound-Z.png`. Cost: +1 line.
6. **The subscript is `m ← u.indices`, not a bare `j`.** *Deliberate.* Fortress reductions are generator-driven; that is exactly what lets one Σ serve a carrier and a range.
7. **U+2211 `∑` still does not lex as an accumulator** (spec `reductions.tex:19` says it should). *Implementation gap,* pre-existing (sum-experiment p13). Moot for the fitness function: Fortify typesets the ASCII `SUM` as Σ, so the **rendered** form is the paper's.
8. **The retired n-ary node** — see A. *Deliberate-with-reason*, priced.

## Gates

Final file, `FORTRESS_THREADS=1`, JDK 25 (`scratchpad/sigma-adoption/gate-final.log`):

- **goldenCheck at 1e-9: PASS** — 15 logits over 3 positions, mean loss 1.228662661701597, 5 gradients. Also PASS at 1e-15; also PASS at 1e-15 with 4 threads.
- **30-step training:** 1264 params; step 1 loss 3.3816 → step 30 2.7465, min 2.3651; first-10 mean 3.2289, last-10 mean 2.9956 (ln 27 = 3.296; unseeded Box–Muller weights, so trajectories differ per run). Baseline run of the unmodified file the same hour: 3.1894 → 2.9039, min 2.3985.
- **s/step 5.17** (three runs: 5.174, 5.167, 5.184) vs **4.14** for the unmodified file measured on the same box in the same hour. Node count explains it: 1384 → 1802 (+30%) tape nodes on the golden config, measured with `mg2_nodes_narysum.fss` / `mg2_nodes_sigma.fss`.
- 10 samples emitted, BOS-terminated, all lowercase a–z. No stack-depth problem from the deeper chained graph.
- **Stripped core 221 lines** (`strip.py`, the diet report's rule, unchanged).

## Segment table (`segments3.py`, same instrument and rules; no unassigned lines)

| segment | Python | before | after | delta |
|---|---|---|---|---|
| boilerplate / imports | 1 | 7 | 8 | **+1** |
| data + tokenizer | 15 | 12 | 12 | ±0 |
| autodiff engine | 38 | 49 | **46** | **−3** |
| notation layer | 2 | 42 | **49** | **+7** |
| model blocks | 42 | 36 | 37 | **+1** |
| config + weight init | 16 | 21 | 21 | ±0 |
| optimizer (Adam) + training loop | 24 | 29 | 29 | ±0 |
| sampling + inference | 14 | 19 | 19 | ±0 |
| **total** | **152** | **215** | **221** | **+6** |

math half 127 → **132**; harness half 88 → **89**. The +1 in "boilerplate" is the `except` import; the +1 in "model blocks" is softmax's `Z`; the −3 in the engine is the retired `sum`; the +7 in the notation layer is the Σ machinery. The layer that *states* the notation grew; every layer that *uses* it is unchanged or shorter.

## Fortify

| figure | regenerated? | why |
|---|---|---|
| `block-sigma` | **new** | the whole Σ bill on one sheet: the `except` import, the identity overloads, `PlusReduction`, `opr Σ⟦T⟧()`, and the five use sites — including the numeric one, to show one Σ serving both worlds |
| `block-softmax` | **yes** | `Z = SUM[u <- e] u`; `e / Z` |
| `sheet-notation` | **yes** | `DOT` and `p M` restated with Σ; the Σ machinery added as exhibit content |
| `sheet-engine` | **yes** | `sum()` deleted; caption rewritten to the chain-of-binary-+ lesson with its measured price |
| `sheet-rowlike` | **yes** | its copy of the `p M` body carried the old `sum(…)` |
| `block-attention`, `block-forward`, `block-loss`, `block-rmsnorm`, `block-embedding`, `block-ffn`, `sig-forward`, `sig-softmax` | **no** | rendered text byte-identical to the current source (each checked against the file) |

**Σ verified by eye, rasterized, light and dark.** `SUM[m <- u.indices] u[m] w[m]` typesets as `Σ` with `m←u.indices` beneath it; `opr DOT` typesets as `opr ·`, so the dot-product line renders as **`opr ·(u: Vec, w: Vec): Value = Σ_{m←u.indices} uₘ wₘ`** — the literature's line with a type signature attached. `import FortressLibrary.{…} except { opr BIG + }` and `opr Σ⟦T⟧(): BigReduction⟦Any, Any⟧` both typeset cleanly. Rasterizer note: no chromium in this container; I used `rsvg-convert -z 2` on the same SVGs, which is sufficient for the eye check. The `.tic` headers keep the chromium recipe unchanged.

## Traps and findings worth carrying

1. **A reduction expression is a `FlowExpr`** — it cannot be an operand of an infix operator without parentheses. Spec grammar + implementation grammar + the error message, three independent confirmations. This is the single most useful new syntactic fact for anyone writing Σ in Fortress.
2. **An unfiltered reduction never calls `empty()`**; only filtering (or an empty generator) introduces the identity. Counted, not assumed.
3. **The sugar overload `opr SUM[\T\](g: Generator[\T\])` is optional** — needed only for the bare `SUM g` form, not for `SUM[x <- g] …`.
4. **Reassociation is unobservable at this scale.** The golden numbers are stable to 1e-15 across n-ary-vs-chain and across 1-vs-4 threads. Do not spend `seq` on reduction determinism here.
5. **Cost a chained Σ by node count, not intuition.** +30% nodes, +25% wall — the two track, so the overhead is the graph, not the reduction dispatch.
6. `bin/fortick` leaves a `.tex` beside the `.tic`; `regen.sh` moves it into the scratchpad, so `git status` stays clean (verified).

**Worktree state:** 13 modified files (`explorations/microgpt2.fss` + the twelve `explorations/fortify/{block-softmax,sheet-engine,sheet-notation,sheet-rowlike}` artifacts) and two untracked additions (`explorations/fortify/block-sigma.*`, `explorations/sigma-probes/`). Nothing else, no strays, no commits.
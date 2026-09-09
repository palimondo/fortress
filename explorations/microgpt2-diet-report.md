<!-- Produced by the delegated harness-diet worker, 2026-08-27; integrated after an
     independent golden-gate run in the main checkout. Companion-split evidence and
     probes lived in the producing worktree; findings recorded below.
     Design journal: explorations/microgpt-native.md. -->

# microgpt2 — the harness diet

Worker report, 2026-08-27. Worktree
`/home/user/fortress/.claude/worktrees/agent-a91904019b2d58f03`; `ant
compileAll` exit 0 (JDK 25); every run `FORTRESS_THREADS=1`. No commits, no
pushes, **no tracked file modified** — all deliverables are in this directory.

## Headline

| | Python (`microgpt.py`) | microgpt2 before | microgpt2 after |
|---|---|---|---|
| code lines (comments, blanks, verification stripped) | **152** | **241** | **206** |
| ratio to Python | 1.00× | 1.59× | **1.36×** |
| harness half | 70 | 119 | **88** (1.26×) |
| math half (engine + notation + model) | 82 | 122 | 118 |

−35 lines, of which **−31 are in the harness half** and −4 in the math half
(two dead engine overloads, two dead carrier slices — see change list). The
diet did what it was asked to do and left the verified math alone.

Note on the baseline number: the brief quotes 235. Applying **one** stripping
rule to both files (see *Counting method*) gives 241 for the shipped file.
The old 235 came from a rule that kept `initW` (verification-only) and
dropped `gauss` (real weight init); the new rule excludes both `initW` and
`goldRow*`/`goldenCheck` and keeps `gauss`. 241 → 206 is the apples-to-apples
pair; both files re-stripped here with the same script.

## Segment table

| segment | Python | before | after | delta |
|---|---|---|---|---|
| boilerplate / imports | 1 | 7 | 7 | ±0 |
| data + tokenizer | 15 | 13 | 12 | −1 |
| autodiff engine | 38 | 51 | 49 | −2 |
| notation layer (`linear` in Python) | 2 | 36 | 32 | −4 |
| model blocks | 42 | 35 | 37 | +2 |
| config + weight init | 16 | 35 | 21 | −14 |
| optimizer (Adam) + training loop | 24 | 34 | 29 | −5 |
| sampling + inference | 14 | 30 | 19 | −11 |
| **total** | **152** | **241** | **206** | **−35** |

"model blocks" gains +2 because the flat-parameter comprehension moved *into*
`Model` as `params()` (3 lines) where it belongs — the same move is the bulk
of the −14 in "config + weight init". Fortress is now *below* Python in
"model blocks + notation" only if you count Python's `linear` (2 lines) as a
notation layer, which is the honest comparison: Python's 2-line `linear` is
the whole of its notation, and it buys nothing else; Fortress's 32 lines buy
`|x|`, `x[i]`, generators, `zip`, both juxtaposition directions, `^T`,
inherited `+`/`−`/`zero`, and elementwise `=`.

Where Fortress is still structurally longer, it is for reasons the exhibit
should state rather than hide: `end` keywords close every block (roughly
+18 lines across the file), explicit `List[\T\]`/`ZZ32` annotations on `var`
declarations, and an autodiff engine that must spell out per-operator local
gradients that Python gets from `__dunder__` fallthroughs.

## Gates (green after every substantive change)

Final file, one run, `FORTRESS_THREADS=1` (`gate-final2.log`):

- **goldenCheck at 1e-9: PASS** — `golden transformer forward/backward vs
  Python reference: PASS` (15 logits over 3 positions, mean loss
  1.228662661701597, 5 gradients).
- **30-step training declining from ~3.3**: step 1 loss 3.3089 → step 30
  2.8122, min 2.2771; first-10 mean 3.184, last-10 mean 3.024. (ln 27 =
  3.296; weights are unseeded Box–Muller, so trajectories differ per run.)
- s/step 6.19 (shared box, slower today than the memo's 4.02 — the
  unchanged original measured 6.75 s/step on the same box in the same hour;
  see *Timing ablation*).
- 10 samples emitted, BOS-terminated, all lowercase a–z.

An earlier full gate on the intermediate version (`gate-final.log`) was also
green: PASS, 3.4272 → 2.9540, min 2.5652, s/step 5.95.

## Changes, one by one

### 1. Adam per-parameter loop de-`seq`ed (mandated)

`for i <- seq(0#nP)` → `for i <- 0#nP`. The updates are independent
(distinct array slots, distinct `Value` objects, no cross-element reads), so
the sweep is genuinely unordered and now says so. The step loop stays `seq`
— it is a real recurrence. Comment in the file states the distinction.

To make that honest, the loop had to stop touching engine state: the old
body ended with `p.visited := false`, an engine scratch flag leaking into
the optimizer. `backward` now clears its own marks
(`for v <- t.items do v.visited := false end`, +1 engine line) and the
optimizer body is exactly Python's six statements. Cost measured below.

Also collapsed in the same loop: `g1`/`g2` temporaries removed (`(p.grad)`
inline — the parens are load-bearing, `^` after a dotted field needs them),
and the repeated `(step 1.0) + 1.0` hoisted to `st`. 12 body lines → 8.

### 2. Data loading and tokenizer condensed

- `readDocs(path, k)` — a named 5-line function replacing 7 inline lines in
  `run()`; drops the `if |l| > 0` guard (verified: names.txt has no empty
  lines — a `lines()` comprehension over the file yields 32033 strings with
  and without the guard).
- `tokenize(doc, bos)` — 2 lines, one comprehension:
  `<|[\ZZ32\] bos|> || <| c.codePoint() - 97 | c <- doc |> || <|[\ZZ32\] bos|>`,
  the direct analogue of Karpathy's
  `[BOS] + [uchars.index(ch) for ch in doc] + [BOS]`. `String` extends
  `ZeroIndexed[\Char\]`/`DelegatedIndexed`, so `c <- doc` just works. This
  replaces a 2-line `array(...).fill(fn (i) => if i = 0 OR i = len+1 …)`
  and lets `n = blockSize MIN (|toks| - 1)` be Python's own line.

**The `lines()` comprehension was tried and rejected — with a measurement.**
`docs = <| l | l <- seq(FileReadStream(path).lines()), |l| > 0 |>[0#maxDocs]`
parses and is correct, but on names.txt (32033 lines) it dies under the
launcher's default `-Xss32m`:

    Exception in thread "main" java.lang.BootstrapMethodError
    …
    Caused by: java.lang.StackOverflowError
      at java.base/java.lang.invoke.InvokerBytecodeGenerator.emitPushArguments

It runs with `-Xss64m`. The overflow is the **comprehension size, not the
file**: `<| i | i <- seq(0#32033) |>` overflows identically
(`probes/pd5.fss`), while a plain `for l <- seq(fr.lines())` over the same
32033 lines is fine (`probes/pd3.fss`). `File.fsi`'s `lines(n)` is a
read-ahead chunk size, not a count (`Library/File.fsi:56–80`), and the
library has no `take`/`limit` generator combinator, so a bounded read is a
loop. A `label`/`exit` version works (`probes/pd6.fss`, sanctioned by
`File.fsi`'s own note that the sequential file generators may be escaped by
`label`/`exit`) but costs 9 lines to the `while`-loop's 5. The `while` form
shipped; the finding is recorded in the file's comment.

Second-order finding worth carrying: on JDK 25 the interpreter's error
*formatter* itself blows up on a deep error (`ErrorMsgMaker` →
`StringConcatException: Generator failed` → `StackOverflowError`), so the
real message is buried 3000 stack lines down under a `BootstrapMethodError`.
`JAVA_FLAGS="… -Djava.lang.invoke.stringConcat=BC_SB"` did **not** fix it;
raising `-Xss` did. Any worker chasing a `BootstrapMethodError` from
`bin/fortress` should suspect stack depth first.

### 3. Sampling extracted and restated

The 12-line inline cumulative scan (`cum`/`pick`/`done` flag, `if NOT done`
guard) became a 5-line named function stated as its own formula:

    sample(p: Vec): ZZ32 = do
      r = random(1.0)
      short = <| j | j <- p.indices, (SUM[i <- seq(0#(j + 1))] (p[i]).data) < r |>
      |short| MIN (|p| - 1)
    end

— the inverse-CDF rule as a *count*: the index is the number of prefix sums
that fall short of the draw. `MIN (|p| - 1)` is exactly v1's floating-point
fallback (`var pick := vocab - 1`). O(n²) in the vocabulary (27), invisible.

The inference loop lost its `stop` flag too: `if pos = 0 OR tid =/= bos`
*is* the stop condition once past position 0, since `tid` only becomes BOS
by being sampled. 28 lines → 15.

### 4. Dead code removed (each verified unused by grep first)

| removed | why it was dead |
|---|---|
| `Value` `opr -(self, c: RR64)` | every subtraction in the file is `Vec − Value`, unary `−`, or `RR64 − RR64` |
| `Value` `opr ^ (self, n: AnyIntegral)` | every `^` in the program has an `RR64` base or an `RR64` exponent |
| `Value` `getter asString` | nothing prints a `Value` (`loss.data` is printed) |
| `Vec` / `Mat` `getter asString` | nothing prints a `Vec` or a `Mat` |
| `Vec` / `Mat` `opr [r: Range[\ZZ32\]]` | heads are structural (separate matrices), so no slice survives |
| `Model` fields `vocab`, `nEmbd` | never read; `nHead` and `d_k` are |
| `gaussRow` | folded into `gaussMat`'s nested comprehension |
| `gauss`'s `std` parameter, `r`/`theta` temporaries | replaced by the top-level `wStd: RR64 = 0.08` |
| `psL` + `array(nP).fill(…)` | `params` is a `List`; `params[i]` indexes it directly |
| `secPerStep` temporary | inlined into its one `println` |

**Kept although unused**: `Vec`/`Mat` `opr =` (judgment decision 9 — the
`HasRank` reflexive-false landmine; `Mat`'s is reachable only through the
`Vec` one, and `Vec`'s only through `Mat`'s, but they are the mandated
cleanup, not convenience overloads) and `Vec`'s unary `−` (an
`AdditiveGroup` requirement, and the thing that buys the inherited binary
minus — the exhibit's own point).

### 5. Keyword-parameter defaults: a new implementation gap

The prettier form of the weight init is Karpathy's own —
`matrix = lambda nout, nin, std=0.08`. The spec sanctions it:
`Specification/basic/functions.tex:155–172` ("a keyword parameter must be
declared with a *default* expression … specified after an `=` sign"). It
parses in Fortress and then dies in the interpreter (`probes/pd7.fss`):

    scale(x: RR64, std: RR64 = 0.08): RR64 = x std
    …
    com.sun.fortress.exceptions.InterpreterBug: pd7.fss:7:23-31:
    ** bug! The number of parameters (2) does not match with the number of
    arguments (1).

**Classification: implementation gap (revival worklist)** — spec-sanctioned,
front-end accepts it, evaluator does not. The workaround shipped is the
top-level `wStd: RR64 = 0.08` constant, which is why `gauss()` is nullary.

### 6. Tuple `var` declarations (verified, `probes/pd8.fss`)

    var (kh, vh): (List[\Mat\], List[\Mat\]) := (emptyHist(nHead), emptyHist(nHead))
    var (tid, out): (ZZ32, String) := (bos, "")

Karpathy's `keys, values = [[] …], [[] …]` and `token_id, sample = BOS, []`
made available; −3 counted lines across the two loops (and the same form in
`goldenCheck`, uncounted). This was found late and re-gated (`gate-final2.log`).

### 7. Nothing reverted

No diet change broke a gate. Both full gate runs were green first try. The
only change *rejected* was the `lines()` comprehension for data loading, and
it was rejected on the measurement above (default-launcher stack overflow),
not on a failed gate.

## Timing ablation (5 steps each, same box, same hour, `FORTRESS_THREADS=1`)

| variant | s/step |
|---|---|
| v0 — shipped original, untouched | 6.75 |
| v1 — diet, `seq` Adam, `visited` reset in Adam | 6.16 |
| v2 — diet, unordered Adam, `visited` reset in Adam | 6.29 |
| v3 — diet as delivered (unordered Adam + engine-side `visited` sweep) | 6.61 |

The whole spread is ~7% and inside shared-box noise; the diet is not a
performance regression. The two deliberate costs are visible and small:
unordered Adam ≈ +2% (fork overhead at one worker — the known
`FORTRESS_THREADS=1` micro-forking law), engine-side `visited` clearing
≈ +5% (it sweeps the whole tape, not just the 1264 parameters). Both were
notation decisions, not speed decisions, per the plan's standing rule.
Files: `ab/ab_v{0,1,2,3}.fss`, `ab/v{0,1,2,3}.log`.

## The companion-component split: it works

**Answer: yes, under the walk interpreter, with two conditions.** Working
trio in `split/`:

- `split/microgpt2.fsi` — `api microgpt2` (63 lines) declaring `Value`,
  `Vec`, `Mat`, `Model`, `konst`, `sum`, `backward`, `nll`, `emptyHist`
- `split/microgpt2.fss` — `component microgpt2`, now
  `export { Executable, microgpt2 }`, golden section removed
- `split/microgpt2check.fss` — `component microgpt2check`,
  `import microgpt2.{...}`, `run() = goldenCheck()`

Verified: `microgpt2check.fss` prints
`golden transformer forward/backward vs Python reference: PASS`, and
`microgpt2.fss` still trains and samples (5-step smoke, 5.97 s/step).

Two things had to be discovered, both recorded:

1. **The api's name must be the component's filename.** A first attempt with
   `api microgpt2api` in `microgpt2api.fsi` failed with

       microgpt2check.fss:3:8-19:
           Could not find an implementation for API microgpt2api on path …

   `GraphRepository.findFile` (line 401) looks for `<apiname>.fss`, so an
   api named `microgpt2api` demands a *component* file `microgpt2api.fss`.
   Naming the api `microgpt2` (matching the component and its filename, the
   `test_library/TestImports1` pattern) resolves it. `Linker`'s
   `RepoState` spec/default maps could in principle redirect this, but
   nothing populates them in the interpreter path.

2. **An api may not declare `var` fields.**

       microgpt2.fsi:4:18-20: var cannot modify an object parameter, data
       microgpt2.fsi:7:3-8:4: var cannot modify fields in an API.

   `Value`'s `data`, `grad`, `visited` are declared without `var` in the
   api; the component keeps them mutable. The interpreter accepts the
   asymmetry, and `goldenCheck` only *reads* them. (An importer that needed
   to *write* a field would be stuck — a real limit worth stating on the
   page.)

Deployment wart: `explorations/` is not on `fortress.source.path` (which is
`;.;…/LibraryBuiltin;…/Library;…/test_library`, cwd first). Running the
split from the repo root needs `FORTRESS_SOURCE_PATH` extended (verified
working) or a `local_repository/configuration` entry; running from
`explorations/` finds the api but breaks the `"explorations/names.txt"`
relative path.

**Recommendation, for Pavol to decide.** The single-file `microgpt2.fss` is
delivered as the primary artifact, because the split's price is a 63-line
`.fsi` of declarations plus an environment variable to buy the removal of a
54-line section that the line count already excludes. The split is real,
green, and shipped in `split/` if the exhibit file's focus is worth that
price. The counted core is 206 lines either way.

## Renders

Seven block `.tic` files were checked line-by-line against the new source
(`block-attention`, `-embedding`, `-ffn`, `-forward`, `-loss`, `-rmsnorm`,
`-softmax`): **every rendered line is still present verbatim** — the math
half was not touched, so none were regenerated.

Two sheets changed and were regenerated into `fortify/` (fortick → latex →
dvisvgm, dark via the `sed` fill, per each `.tic` header; rasterized with
`rsvg-convert` and inspected by eye):

- `sheet-engine` — `backward` gained `for v <- t.items do v.visited := false end`
- `sheet-notation` — the two `opr [r: Range[\ZZ32\]]` slice lines removed

(The sheets already elided `asString` and the RR64 convenience overloads, so
those deletions cost no render churn.) The tracked
`explorations/fortify/*.tic` files were **not** modified; the updated `.tic`
sources and both `-light.svg`/`-dark.svg` pairs are in `fortify/`.

## Counting method (reproducible)

`strip.py <file.fss>` removes `(* … *)` comments (nested-aware), removes
blank lines, and drops the verification-only top-level definitions
`initW`, `goldRow`, `goldRows`, `goldMat`, `goldHeads`, `goldenCheck` plus
the bare `goldenCheck()` call. Python is counted the same way (comments and
blanks out) on `../microgpt.py`. `segments.py` prints the tables above from
explicit line ranges; it reports any unassigned line, and there are none, so
the segment columns sum to the totals by construction.

    python3 strip.py microgpt2.fss > microgpt2-core.fss    # 206
    python3 strip.py <repo>/explorations/microgpt2.fss     # 241
    python3 segments.py

## Files here

| file | what |
|---|---|
| `microgpt2.fss` | the dieted file — drop-in replacement for `explorations/microgpt2.fss` |
| `microgpt2-core.fss` | stripped core, 206 lines |
| `before-core.fss` | stripped core of the shipped file, 241 lines |
| `full.diff`, `core.diff` | before → after, full and stripped |
| `gate-final.log`, `gate-final2.log` | the two full 30-step gate runs |
| `strip.py`, `segments.py` | the counting instruments |
| `split/` | the working api-split trio (`.fsi` + two components) |
| `fortify/` | the two regenerated sheets (`.tic`, light/dark SVG, PNG) |
| `ab/` | timing-ablation variants and logs |
| `probes/` | `pd1`–`pd8`, `pdiet` — every probe cited above |
| `rd.sh`, `rl.sh`, `rs.sh`, `render.sh` | run helpers (env per CLAUDE.md) |

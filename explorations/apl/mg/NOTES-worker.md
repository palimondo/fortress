<!-- Worker notes for the focused base (rung 4b), 2026-09-15. Plain record of what was built, what was measured, and what the design got wrong. The report is REPORT.md beside this; the probes are ../probes-4b/PROBES.md. -->

# Worker notes: the focused base

> These notes describe the base as it stood on C4's `FlatArrays`/`FlatData`.
> The base was swapped onto its own vocabulary, `FlatArrays2`/`FlatData2` in
> this directory, later the same day; what changed and what it was measured
> against is `NOTES-swap.md` beside this file.  The numbers below were all
> reproduced after the swap.

## State of the component

`MicroGptApl.fss` runs. The five losses (`checks/model_run.out`, FORTRESS_THREADS=1,
JDK 25):

```
step 1 loss 3.3659669475848513  (4308 ms)
step 2 loss 3.424272783871772   (4001 ms)
step 3 loss 3.177802125458053   (3856 ms)
step 4 loss 3.066355684224198   (4223 ms)
step 5 loss 3.2208830897506235  (4134 ms)
```

The goldens are `3.365966947584851 3.424272783871772 3.177802125458053
3.066355684224198 3.2208830897506235`. Steps 2 to 5 are identical to the last
digit; step 1 differs by 4.44e-16, which is exactly C4's own difference on this
host. The run was made twice, green both times.

The whole forward pass was compared intermediate by intermediate against C4's
hand-written lines inside one component (`diag_fwd.fss`, `checks/diag_fwd.out`):
mask, ids, tg, vm, pos, X, Xp, X1, Q, K, Vv, Qh, A, Hc, X2, M0, Mr, X4, Pr all
have **maxdiff 0.0**, and the loss differs by **0.0**.

## The check smoke

`MicroGptAplCheck.fss` is `../microgpt/MicroGptAplCheck.fss` copied unchanged but
for two lines of its header comment; the check body is byte-identical. Run once at
`FORTRESS_THREADS=1` from this directory, output `checks/check_smoke_threads1_complete_40of40.out`.
It **finished inside the 12-minute mark**, in 454 s, with

```
VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS
```

**There is no FAIL line.** The step-0 gradient diff is 1.1102230246251565E-16 and
P after Adam 8.326672684688674E-17, both exactly C4's own numbers in
`../../run-c4/checks/rerun-post-restart/threads1.txt`. For scale only, and not as
a cost row: C4's recorded threads-1 check on this host was 528 s and the
universal base's rung was 973 s. The two recorded full runs are the
coordinator's.

## Departures from the design, with evidence

1. **`ravel` is one generic declaration, not two.** The design asks for `ravel`
   over a `ZZ32` and an `RR64` matrix. Two declarations differing only in the
   element type are refused at load time (`checks/model_run.out.0`): "ravel …
   Matrix[\RR64,r,c\] … and ravel … Matrix[\ZZ32,r,c\] … have parameters with
   generic type, at least one pair of parameters must have excluding types". The
   fix is FlatArrays' own idiom, one declaration generic in
   `T extends Number`.
2. **The vector gather is `gatherV`, not `gather`.** FlatArrays already exports
   `gather` over a matrix. Two apis exporting one name into one component was a
   risk not worth taking for a one-letter difference.
3. **`s*t` expands to `pow(1.0 (l), (r))`, not to the host's caret.** A template
   that writes the host caret silently drops its right operand:
   `<[ (1.0 (l)) ^ (r) ]>` expands to `1.0 (l)`. No diagnostic of any kind.
   Measured: `apl⦇ 10*10 ⦈` was `10.0`, `apl⦇ 2*3 ⦈` was `2.0`, and the causal
   mask came out `-10` instead of `-1E10` (`Mk[0,1] = -10.0`, the mask sum
   `-1200.0` where C4's is `-1.2E12`), which made every loss wrong from the
   seventh digit -- step 1 `3.3659665281147144` against the golden
   `3.365966947584851` (`checks/model_run.out.1`). With a one-line glue
   `pow(b: RR64, e: ZZ32): RR64 = b^e` the same rule gives `1.0E10` and `8.0`
   and the model is exact. This is a candidate gap-ledger row.

Two mechanical facts found in the probes and recorded there:

4. **A macro bracket used bare as a juxtaposed argument does not match its rule.**
   `println "…" s6⦇ +/vv ⦈` fails with "Variable s6 is not defined";
   `println "…" (s6⦇ +/vv ⦈)` works. Four grammar shapes were tried against this
   before the cause was found, and every one of those failures was a false
   diagnosis of the grammar. `../probes-4b/y06_fold.out.0`.
5. **Rule order decides only inside an ordinary nonterminal.** Two alternatives of
   one macro bracket name backtrack over the closing bracket, so the shorter one
   above the longer still reaches the longer. Inside a nonterminal PEG commits,
   so the fold `+/l×r` must stand above `+/v`, which is where it is in
   `AplMgSyntax.fsi`.

## Counts

- `AplMgSyntax.fsi`: **446 lines**, **197 rule alternatives**, of which **124 are
  name lines** (7 function names, 35 strand names, 82 readable names) and **73
  are rules**. `AplE` alone has **37 alternatives**. The universal base's
  `AplSyntax.fsi` is 899 lines.
- `AplMg.fsi` 51 lines, `AplMg.fss` 39 lines, **11 declarations**: `tally`,
  `iota`, `ravel`, `cols`, `gatherV`, `outerGt`, `outerGe`, `outerLt`, `cycle`,
  `opr +` (integer scalar plus integer array) and `pow`. The universal base's
  library is `AplCore.fss` 2343 + `AplCore.fsi` 850. `outerGe` is unused: the
  causal mask folds the negation into `outerLt`, as the design says.
- `MicroGptApl.fss`: 117 lines, **70 code lines**; 19 of the Dyalog's 25 lines
  are APL text.

## Per-step times

4308, 4001, 3856, 4223, 4134 ms; mean 4104 ms; whole run 35 s wall including
parser generation and the corpus load. The universal base's rung was 9541, 8996,
9146, 8969, 9171 ms on the same host, so a step is 2.2x faster here. The
comparison that matters, against C4 at both pool sizes, is the coordinator's.

## What the design got wrong

- **The caret.** The design's line-by-line table writes `s*t` as `s^t`, straight
  from C4:79. It cannot be written that way from a template. Nothing in the
  ladder had ever put a host infix operator other than `+ - × ÷` inside a
  template, so nothing had caught it. Everything else in the table is writable as
  the design writes it.
- **`ravel` over two element types.** The design asks for two declarations; the
  host takes one generic declaration or none.
- **`learningRate`.** The design says it twice, and differently: the component
  paragraph gives it "one APL block", the line-by-line table's L30 row says
  "host, C4:82, 85-97". It is an APL block here, as the previous rung had it,
  with the step number widened once in host code (`sf = 1.0 s`), because
  `s÷Nsteps` between two `ZZ32` would be integer division.
- **The probe numbering.** The design's deliverable list calls the two new probes
  y03 and y04; y01-y04 were already out, so they are y05 and y06.
- **`≢b`.** The design's table expands it to `|b|`. A template writing the
  enclosing bars was not attempted; the glue entry `tally` is the nearest thing
  and is what the rule names.

Nothing else in the design had to be bent. In particular the two mechanisms it
rests on -- a named host function reached through a template, and a derived
function whose whole body one rule writes -- both work exactly as probes y01, y02
and y05 say, and no rule needed a function value it could not type.

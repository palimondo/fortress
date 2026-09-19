<!-- Test discipline across the three autonomous campaigns: what each rung added to the gate, what it
     only probed, and the three nets that do not exist.  Produced 2026-09-19 by a delegated process-audit
     worker, read-only: nothing under /home/user/fortress was created or edited, no `ant` and no test was
     run, and the four in-flight branches were read only through `git show` / `git ls-tree`.

     Pavol's question, in his words: "I'm interested in the test discipline.  I know that they are writing
     tests.  Skeptics are instructed to create their own tests.  What I want to know is how many of these
     end up as permanent test fixtures in the test suite that gate our future progress.  Are we growing
     the safety net as we progress through these ladders?"

     Pavol's standing rule (2026-09-17): the worker writes the test first, verifies that it actually
     fails, makes the fix, proves it passes, and the test stays in the corpus from then on; what the rule
     forbids is the one-off validation script.  One line per paragraph. -->

# Test discipline: what the three campaigns left in the gate

## The answer in one paragraph

Sixteen test programs were added to the gated corpora across the three campaigns — twelve landed on `main`,
four sitting on the four in-flight branches — and every one of the twelve on `main` is demonstrably run by
`ant testFast`: `testFast` went 1,377 → 1,401, and 1,401 − 1,377 = 24 = 12 tests × 2 JUnit cases each
(`link` and `run`). The test-first rule held in fifteen of sixteen cases: every rung captured its test
failing before the edit existed. The one exception is `compiler_tests/AtomicTopLevelVar`, which **passes on
the unrepaired tree** at one thread, which is the only thread count this project's gate runs at. What did
*not* grow is the interpreter corpus — `ant testSystem` was 382 before the campaigns and 382 after every
rung — and what did not grow at all is the coverage of what the skeptics found: of the twenty-two defects
the skeptics measured, **one** is covered by a gated assertion today.

## 1. Per rung

### 1a. The eight-rung climb of 2026-09-17 (`explorations/compile-ladder/rung0/`…`rung8/`)

There was no skeptic in this campaign. The role was designed after it: `3f3f766a2` "Design the batched
climb" (2026-09-17 16:09), `e93b20efb` "Attack the batched climb design" (16:25), `54cfc4d9e` "Require the
skeptic's differential" (17:25) all postdate the eight rung commits. So the skeptic columns are zero by
construction, not by omission.

| rung | gated test added | check line | real or inert | JUnit before → after, as the report quotes it | test shown failing before the edit | worker probes | skeptic probes | skeptic defects |
|---|---|---|---|---|---|---|---|---|
| 0 | **none** | — | — | baseline `testFast` 1,377 / `testSystem` 382 (`rung0/REPORT.md` "The gate") | n/a — the rung is two one-line runtime edits measured by a benchmark, not by a test | 0 (`before.out`, `after.out` are benchmark captures) | 0 | 0 |
| 1 | `library_tests/EqualityRung1.{fss,test}` | `run_out_WIcontains=PASS` | **inert** | `LibraryJUTest` 57 (before not quoted; `testFast` total not quoted — 1,379 by arithmetic) | **yes**: `test-before.out`, "`EqualityRung1.fss:30:21-27: Equality is undefined.`", 2 errors, then `ClassNotFoundException` on the run step | 0 committed `.fss` | 0 | 0 |
| 2 | `library_tests/HasRankRung2.{fss,test}` | `run_out_WIcontains=PASS` | **inert** | `LibraryJUTest` 57 → 59; `testFast` 1,381 | **yes**: "`HasRank is undefined.`" ×3, `Tests run: 2, Failures: 2, Errors: 0` | 0 | 0 | 0 |
| 3 | `compiler_tests/MutableTopLevelVar.{fss,test}` | `run_out_WIcontains=PASS` | **inert** | report says "the compiler-test suite goes 57 to 59" — a mis-transcription: this file is in `compiler_tests`, so the suite that moves is `CompilerJUTest` 642 → 644; `testFast` total not quoted (1,383 by arithmetic) | **yes**: `VarDecl (var counter:ZZ32) … mutable bindings not yet handled.` from `CodeGen.forVarDeclPrePass(CodeGen.java:5891)`, `Tests run: 2, Failures: 2, Errors: 0` | 0 — the report cites a differential directory `interp/` for eight files that **is not in the tree and never was** (`git ls-files explorations/compile-ladder | grep interp` is empty) | 0 | 0 |
| 4 | `library_tests/AssertRung4.{fss,test}` | `run_out_WIcontains=PASS` | **inert** | library suite 59 → 61; `testFast` 1,385 | **yes**: ten `Could not check call to function assert/deny`, `Tests run: 2, Failures: 2, Errors: 0` | 2 (`probes/AssertMessage.fss`, `VarArgCoerce.fss`) — plus an `interp/` differential over eight files, again **not committed** | 0 | 0 |
| 5 | `library_tests/LineConcatRung5.{fss,test}` | `run_out_WIcontains=PASS` | **inert** | `LibraryJUTest` 61 → 63; `testFast` 1,387 | **yes**: `probes/junit-before.out`, "`Operator // is not defined.`" at both sites, `Tests run: 2, Failures: 2, Errors: 0` | 0 `.fss` (the `probes/` dir holds only the before/after JUnit captures) | 0 | 0 |
| 6 | `library_tests/IntLiteralRung6.{fss,test}` | `run_out_WIcontains=PASS` | **inert** | +2 for this rung's link and run; `testFast` 1,389 | **yes**: `probes/junit-before.out`, dies at `CompilerBuiltin$IntLiteral$DefaultTraitMethods` (`CompilerBuiltin.fss:832`), "Failed to satisfy default check run_out_contains=PASS", `Tests run: 2, Failures: 1, Errors: 0` | 1 `.fss` (`BigLit.fss`) + differential captures for 5 programs (`testParen`, `chain2`, `tupleTest1`, `p37`, `p37a`) | 0 | 0 |
| 7 | `library_tests/IntLiteralArithRung7.{fss,test}` | `run_out_WIcontains=PASS` | **inert** | +2; `testFast` 1,391 | **yes**: `probes/junit-before.out`, dies at `CompilerBuiltin$IntLiteral$DefaultTraitMethods.+` (`:820`), `Tests run: 2, Failures: 1, Errors: 0` | 2 `.fss` (`p38.fss`, `p39.fss`) + 4 differential pairs | 0 | 0 |
| 8 | `library_tests/BigSumRung8.{fss,test}` | `run_out_WIcontains=PASS` | **inert** | `LibraryJUTest` 67 → 69; `testFast` 1,393 | **yes**: `probes/junit-before.out`, "`Operator BIG + is not defined.`" at all five sites, `Tests run: 2, Failures: 2, Errors: 0` | 0 `.fss` (the probes are a re-run of the whole ladder) | 0 | 0 |

**Defects the workers themselves found and left ungated.** Four ledger rows were opened by this campaign and
none of them is covered by a gated test: **313** (a singleton object's field initializer runs lazily
compiled and eagerly interpreted — rung 3), **315** (`ZipException: duplicate entry` for two closure classes
at one source position, `tests/ConditionalOpTruncation.fss` — rung 4), **317** (an integer literal of
`bitLength` exactly 32 or 64 wrapped negative by the code generator — rung 6; later repaired by R2, which
*did* gate it), **318** (the stubbed `IntLiteral` arithmetic family — rung 7, closed by rung 7 itself).

### 1b. The repair batch of 2026-09-18/19 (R1, R2)

| rung | gated tests added | check line | real or inert | JUnit before → after | test shown failing before the edit | worker probes | skeptic probes | skeptic-found defects |
|---|---|---|---|---|---|---|---|---|
| R1 | `compiler_tests/AtomicTopLevelVar`, `AtomicTopLevelObjectVar`, `MutableTopLevelVarInLoop` (3 `.fss` + 3 `.test`) | `run_out_contains=PASS` **and** `run_out_does_not_contain=FAIL` | **real** (`FileTests.java:147`, `:155`) | not quoted per rung — the batch gate ran once after the merge: `testFast` 1,401 | **two of three yes, one no**. `MutableTopLevelVarInLoop`: `FAIL: inLoop = 0 (expected 10), inArmA = 7 (expected 7), inArmB = 0 (expected 9)` on the base tree at 1, default and 4 threads. `AtomicTopLevelVar`: `FAIL: counter = 37826 expected 40000` at the unset default — but **`BASE run AtomicTopLevelVar THREADS=1 :: PASS`** (`probes/skeptic/skeptic-basetree.txt`), and one thread is what the gate runs. `AtomicTopLevelObjectVar`: fails at one thread on the *pre-guard landed tree*, not on the base tree; the claim that its local half fails on the base tree is an inference, not a measurement (skeptic's second-round correction 2) | 19 `.fss`/`.fsi` under `probes/` | 32 `.fss` under `probes/skeptic/` (`SK1`–`SK29`, `SQ1`–`SQ7`), each run under `walk` and compiled at 1 and 4 threads | **9**, listed below |
| R2 | `compiler_tests/IntLiteralWrapRepairR2.{fss,test}` | `run_out_WIcontains=PASS` | **inert** — the seventeenth such file, added by this rung | same batch gate, `testFast` 1,401 | **yes**: `probes/junit-before.out`, "`FAIL: ZZ from the 32-bit numeral: -1 should be 4294967295`", `Tests run: 2, Failures: 1` | 9 `.fss` (`r2a`–`r2i`) | 10 `.fss` (`s1`–`s10`) plus a re-run of `p37`/`p37a` | **4**, listed below |

**R1's skeptic findings, and where each ended up.**

| finding | gated after the rung? |
|---|---|
| **1 (the refusal)**: the landed tree turned a working twelve-line single-threaded program into a `StackOverflowError`, because the transaction runtime built 22 of its 23 disabled `debug` arguments eagerly and the new cell routed every top-level mutable access through them (`probes/skeptic/SK25ObjNoAtomicVsAtomic.fss`, `SK18Trait.fss`) | **YES** — repaired in the repair round and gated by `compiler_tests/AtomicTopLevelObjectVar`, "whose object type deliberately declares no `asString`" (`record.md`) |
| **2**: `atomic` as the trailing expression of a `do … also` arm does not verify at all — `VerifyError: Inconsistent stackmap frames` — before the repair and after (`SK12ArmAtomic`, `SK13LocalArmAtomic`, `SK7TaskNest`, `SK14LocalTaskNest`) | no — ledger row **322**, open, probe-only |
| **3**: the gate's thread count comes from the ambient shell and `experiment/env.sh:6` pins it to 1, so a concurrent test in `compiler_tests` cannot fail there | no — this is a fact about the gate; the decision goes to Pavol |
| `SK2Closure`: a top-level mutable variable assigned from inside an `fn` expression body was silently lost (base `g = 0`, landed `g = 7`) | **repaired, not gated** — recorded in a FACTS line only |
| `SK16LocalString`: a *local* mutable `String` assigned inside `atomic` failed the verifier (base `VerifyError: Bad type on operand stack`, landed `st = a b`) | **repaired, not gated** |
| `SK8Swap`: a two-location invariant inside one transaction (base at 4 threads `x = 9692 y = -8877 sum = 815` against an invariant of 1000, landed PASS) | **repaired, not gated** — and could not be gated as the gate stands, since it discriminates only above one thread |
| `SK27DefaultAsString` / `SK3Throw` / `SK20LocalTrait`: an object or trait value with no `asString` of its own recurses until the stack overflows on the compiled path, where `walk` prints the object's name | no — ledger row **321**, open; three candidate fixes, explicitly Pavol's decision |
| `SK5InitFwd`: `walk` rejects a singleton object's field initializer that reads a later top-level *mutable* variable, which the compiled path runs correctly | no — ledger row **323**, open (a defect of the interpreter) |
| `SK28ThrowAsString` / `SK29ThrowLocal` / `SQ6OrphanTx` / `SQ7ObjThrow`: a Fortress exception thrown out of an `atomic` block leaves the block's writes visible (`walk` 100, compiled 7) | no — ledger row **324**, open |

**R2's skeptic findings.**

| finding | gated after the rung? |
|---|---|
| Finding 7: the record's claim that `p37` now agrees with `walk` is false — `IntLiteral` comparison is performed at `ZZ64`, so a numeral outside `ZZ64` now raises `Not in range for ZZ64` where `walk` prints `false` | no — ledger row **328**, open |
| Finding 8 / correction 4: `FIntLiteral.asNN64` went from throwing to returning a value that renders as `-1`, because `FNN64.toString` is signed | no — ledger row **326**, open |
| `s6`/`s8`/`s9`/`s10`: `CHOOSE` for `k > m ≥ 0` answers `1` under `walk` and `0` compiled; the specification's own property at `basic-lib/basic-integers.tex:571-573` settles it **against the interpreter** (`interpreter/glue/prim/Int.java:287-290` has no `k > n` guard) | no — a row is owed against the interpreter; ungated |
| `s7`: the interpreter refuses `d: ZZ32 = -2147483648`, which the compiled path accepts | no — a row is owed; ungated |
| Correction 1 (process, not code): `.gitignore:46` is `*.out`, and `git ls-files` listed **zero** of the eight `.out` captures the whole recorded-failure discipline rests on | closed at commit time (`63db7a691` "Preserve the three scratch drivers the rung reports cite"; the `.out` files are tracked on `main`) |

The skeptic's own remark on R2's gated test, not required: "The gate test locks in the non-negative half of
'exact for both signs' and not the negative half; two more assertions in `IntLiteralWrapRepairR2.fss` would
gate it."

### 1c. Climb batch 1, as the four branch tips stand

Read-only, through `git`, at these tips. No gate has been run for any of the four: the batch is gated once
by the coordinator after the merge.

| rung | branch tip | gated test added | check line | real or inert | JUnit before → after | test shown failing before the edit | worker probes | skeptic probes | skeptic-found defects | state at the tip |
|---|---|---|---|---|---|---|---|---|---|---|
| **F** RR64 functions | `899c0536d` (09:35:19) | `library_tests/RR64FunctionsRungF.{fss,test}`, 42 assertions | `run_out_contains=PASS` | **real** | **not shown** — "The JUnit suite was not run" (`REPORT.md` §9); the recorded pass is the `link`/`run`/PASS sequence by hand | **yes**, by hand not by JUnit: `probes/failure-before-edit.txt`, `File RR64FunctionsRungF.fss has 45 errors.`, exit 255, all 45 `Variable <name> is not defined` over exactly the thirteen names; the skeptic confirmed the capture's commit `2dbd37935` predates the edit commit `632d7cf22` | 2 | 10 | **3**: `round(0.5)` walk `1` vs compiled `0` and `round(-1.5)` walk `-1` vs compiled `-2`, two divergent ties beyond the two the rung recorded (`SkZeroWalk`/`SkZeroComp`); `round`/`truncate` saturate to ±2^63 for NaN, ±∞ and any magnitude past 2^63, identically on both paths, where a named compile-time error used to stand; a pre-existing overload-clash message that the thirteen new names can now trigger (`SkOverB`, control `SkOverC`) | skeptic **approved**, four required corrections, none to the code |
| **M** Maybe | `89d4e1249` (09:37:52) | `library_tests/MaybeRungM.{fss,test}` | `run_out_contains=PASS` + `run_out_does_not_contain=FAIL` | **real** | **not shown** — the gate was not run; the harness was run over the one `.test`: `OK (2 tests)` | **yes**: `probes/MaybeRungM-before.txt`, "`Maybe is undefined.`", `compile-rc=255`, and through the harness `Tests run: 2, Failures: 2, Errors: 0` | 6 | 13 | **5**: `Just(7).isNothing` fails under `walk` and works compiled (spec against the interpreter); `println(Nothing)` now compiles and dies with `StackOverflowError` where it was a compile-time error — row 321's reach extended to a name the spec and 22 corpus files write, **and the report has no failure-mode section at all**; `filter` on the new `Maybe` dies with `AbstractMethodError`, narrowed by `SkArrowSubtype` to *any* closure whose declared return type is a supertype of its body's type — a codegen defect the skeptic believes is new; `Just(7) = Just(7)` and `|Just(7)|` work under `walk` and are static errors compiled, neither in the deviation list; `SUM[x <- Just(7)]` is a pre-existing compiler-world limit | skeptic **approved**, six required corrections, all to the record |
| **N** integral ops | `37106becf` (10:12:36) | `library_tests/IntegralOpsRungN.{fss,test}` | `run_out_contains=PASS` | **real** | **not shown** — the gate was not run; the harness over the one `.test` went `Tests run: 2, Failures: 2` → `OK (2 tests)` | **yes, twice.** First round: `raw/IntegralOpsRungN.compile.before`, 84 errors (`REM` 21, `MOD` 21, `GCD` 15, `LCM` 14, `RSHIFT` 7, `LSHIFT` 6), `raw/IntegralOpsRungN.junit.before` `Tests run: 2, Failures: 2, Errors: 0`. Repair round: `raw/IntegralOpsRungN.junit.before-repair`, `Tests run: 2, Failures: 1` with the new assertions in place and the fix not yet made | 11 | 7 | **4**: **`0 MOD -1`, `0 REM -1`, `0 GCD -1` and the same three at the type minimum throw `IntegerOverflow`** on both types where the spec gives `0`, `0`, `1` (`SkepZeroNegOne`, `SkepBoundary`, `SkepZZ64Neg`, `SkepRaise`); the interpreter's `LCM` overflows silently (`MAX LCM 2` → `-2` under walk, `THROWS` compiled); `8 REM 0` under `walk` escapes `catch Exception` as a bare `java.lang.ArithmeticException` from `Int.java:120`; `LSHIFT`/`RSHIFT` at negative and out-of-range shift counts diverge between the paths | skeptic **REFUSED**; judge ruled **repair**; repair landed at the tip — **and the repair is the one case in the whole campaign where a skeptic-found defect became a gated assertion**: `5d4bd370d` added `mOne`, `maxValue`, `minValue` bindings, `shouldOverflow`, and eleven assertions pinning `REM`/`MOD`/`GCD` at divisor `-1` and at the type minimum, *before* `37106becf` added the one-line guard to `REM` |
| **T** timing | `9f508c9e3` (09:49:11) | `library_tests/TimingRungT.{fss,test}` | `run_out_contains=PASS` | **real** | **not shown** — the gate was not run; the harness went `Tests run: 2, Failures: 2` → `OK (2 tests)` | **yes**: `probes/junit-before.txt`, seven `Variable recordTime/printTime is not defined.`, `File TimingRungT.fss has 7 errors.`, `Failed to satisfy run_out_contains; expected PASS`, `Tests run: 2, Failures: 2, Errors: 0`; the skeptic checked the capture's line numbers against `HEAD`'s test text and confirmed the before-run used the same text as the pass | 1 | 5 | **2**: `printTime` with no preceding `recordTime` prints the machine's `nanoTime` origin with no indication that nothing was recorded (`1.0174680816587E7ms` compiled, `10147559ms` walk); `Double.toString` renders scientifically at ≥ 1.0e7 and at non-zero < 1.0e-3, so `printTime` prints scientific notation for any interval at or above 2.78 hours or below 1000 ns — and the worker's own test already measured a 1982 ns interval, 2× above that lower boundary | skeptic **approved**, four required corrections, all to the record |

## 2. Whole-campaign counts

| quantity | count | how it is counted |
|---|---|---|
| **Gated test programs added** | **16** (12 on `main`, 4 on the in-flight branches) | one `.fss` + one `.test` each; 32 JUnit cases |
| — of them in `library_tests/` | 11 | 7 from the climb, 4 from batch 1 |
| — of them in `compiler_tests/` | 5 | 1 from the climb (rung 3), 3 from R1, 1 from R2 |
| — of them in `ProjectFortress/tests/` (the interpreter corpus) | **0** | `git log 75cca6683..main -- ProjectFortress/tests` is empty; `testSystem` is 382 before and after every rung |
| **Probe programs written by workers** | **53** | climb 5 (`rung4` 2, `rung6` 1, `rung7` 2); R1 19; R2 9; F 2, M 6, N 11, T 1 |
| **Probe programs written by skeptics** | **77** | R1 32, R2 10, F 10, M 13, N 7, T 5 |
| **Probe programs, total** | **130** | none of them is run by any suite |
| **Defects the skeptics found** | **22** | R1 9, R2 4, F 3, M 5, N 4, T 2 — counted as the reports name them, and excluding pure record corrections |
| — **covered by a gated assertion afterwards** | **2** | R1's finding 1 (gated by `compiler_tests/AtomicTopLevelObjectVar`) and N's `0 MOD -1` family (gated by eleven assertions added to `library_tests/IntegralOpsRungN.fss` in the repair round) |
| — **repaired but not gated** | **3** | R1's `SK2Closure` (assignment from an `fn` body lost), `SK16LocalString` (local `String` in `atomic` failed the verifier), `SK8Swap` (two-location invariant under contention). All three were fixed by R1's payload-widening edit and are recorded only in a FACTS line |
| — **recorded as an open ledger row or an owed row, ungated** | **17** | rows 321, 322, 323, 324, 326, 328 and the two owed against the interpreter (R2's `CHOOSE`, `d: ZZ32 = -2147483648`), plus batch 1's provisional 329/330 (F), 329 (M), 329/330/331/332 (N) and the un-rowed M findings (`isNothing`, `filter`/`AbstractMethodError`, `println(Nothing)`) and T's two |
| **Ledger rows opened by the campaigns** | **14 landed + 7 provisional** | climb 313, 315, 317, 318; R1 319–324; R2 325–328; batch 1 provisional F 2, M 1, N 4 |

Two qualifications on the "22 defects" line. R1's finding 3 (the gate's thread count) is a fact about the
gate rather than a defect in the tree, and is counted because it changes what the gate can catch. F's third
finding and M's fifth are pre-existing limits the skeptic established are *not* the rung's doing; they are
counted because they were found by a skeptic probe and are ungated either way.

## 3. What each gated test actually asserts

The mechanics, from the harness. A `.test` with `link` and `run` produces two JUnit cases
(`FileTests.standardCompilerTests`, `FileTests.java:1025-1065`): a `CommandTest` for `link` and a `TestTest`
for `run`.

- **The `link` case fails** if `bin/fortress link <name>` does not exit 0 — a parse, disambiguation,
  typecheck, codegen or jar-writing error. This is the case that fails for every rung whose name is simply
  missing from the prelude (rungs 1, 2, 4, 5, 8, F, M, N, T) and for rung 3, whose codegen refused.
- **The `run` case fails** on a non-zero exit code, or on any `run_out_*` / `run_err_*` / `run_exception_*`
  check that does not hold (`FileTests.java:505-528` with `testFailed` at `:583-586`). Note that in
  `TestTest` the FAIL-in-output checks are **explicitly disabled in the source**: `FileTests.java:514-515`
  reads `boolean fail_out = false && s_out.contains("FAIL");`. So for the compiler corpora, "FAIL appeared in
  stdout" does not by itself fail a test — only the exit code and the declared checks do. (The interpreter
  suite is the opposite: `SourceFileTest` computes `anyFails` from `fail`/`FAIL` in the output,
  `FileTests.java:367-371`.)
- **`run_out_WIcontains=PASS` is inert.** `generalTestFailed` implements six checks — `_contains` (`:147`),
  `_does_not_contain` (`:155`), `_matches` (`:163`), `_WImatches` (`:171`), `_WCIequals` (`:180`), `_equals`
  (`:190`) — and no `_WIcontains`. With no check matching, the default fires: stdout must contain `pass` or
  `PASS` (`:266-272`). Established by R1 (`repair-r1-atomic-static/REPORT.md:122-124`, `record.md:21`) and
  re-verified here: `grep -rn "WIcontains" ProjectFortress --include=*.test` returns exactly **17** files.
  Eight are the climb's own tests, because the rung briefs named `library_tests/Boolean.test` as the format
  to copy and that file carries the inert line; the ninth campaign file with it is R2's
  `compiler_tests/IntLiteralWrapRepairR2.test`, added after R1 measured sixteen. The other eight are
  pre-existing (`Boolean`, `Comparison`, `Integer`, `MaybeGetter`, `Compiled12.mini`, `Afm`, `Go`, `Gt`).

| test | what a failure looks like | would it still pass with the rung's edit reverted? |
|---|---|---|
| `library_tests/EqualityRung1` | link error, `Equality is undefined.`, then `ClassNotFoundException` on run | **no** — `test-before.out` |
| `library_tests/HasRankRung2` | link error, `HasRank is undefined.` ×3 | **no** — `Tests run: 2, Failures: 2` |
| `compiler_tests/MutableTopLevelVar` | link error from `CodeGen.forVarDeclPrePass:5891` | **no** — `Tests run: 2, Failures: 2` |
| `library_tests/AssertRung4` | link error, ten `Could not check call to function assert/deny` | **no** — `Tests run: 2, Failures: 2` |
| `library_tests/LineConcatRung5` | link error, `Operator // is not defined.` | **no** — `probes/junit-before.out` |
| `library_tests/IntLiteralRung6` | links clean, then run dies in `IntLiteral$DefaultTraitMethods`; exit != 0 **and** the default PASS check fails | **no** — `Tests run: 2, Failures: 1` |
| `library_tests/IntLiteralArithRung7` | same shape, at `:820` | **no** — `Tests run: 2, Failures: 1` |
| `library_tests/BigSumRung8` | link error, `Operator BIG + is not defined.` at five sites | **no** — `probes/junit-before.out` |
| `compiler_tests/MutableTopLevelVarInLoop` | run prints `FAIL: inLoop = 0 …`; caught by exit code and by `run_out_contains=PASS` failing (the `FAIL` text alone would not, see above) | **no** — fails at 1, default and 4 threads on the base tree |
| `compiler_tests/AtomicTopLevelObjectVar` | run dies with `StackOverflowError`, exit != 0 | **no on the tree it guards** (the pre-guard landed tree); **not shown** on the batch base — the report calls that an inference |
| `compiler_tests/AtomicTopLevelVar` | run prints `FAIL: counter = 37826 expected 40000` above one thread | **YES at one thread**, which is the only count the gate runs at (`experiment/env.sh:6`, `build.xml:927-953` sets no thread count and no `newenvironment`, `FortressExecutable.getNumThreads:37-44`). `BASE run AtomicTopLevelVar THREADS=1 :: PASS`. **This test is vacuous in the gate as the project runs it**, and R1's record says so |
| `compiler_tests/IntLiteralWrapRepairR2` | run prints `FAIL: ZZ from the 32-bit numeral: -1 should be 4294967295`; exit != 0 | **no** — `Tests run: 2, Failures: 1` |
| `library_tests/RR64FunctionsRungF` | link error, 45 `Variable <name> is not defined` | **no** — captured by hand, `exit 255`, commit order verified by the skeptic |
| `library_tests/MaybeRungM` | link error, `Maybe is undefined.` | **no** — `Tests run: 2, Failures: 2` |
| `library_tests/IntegralOpsRungN` | link error (84 names) in the first round; in the repair round the compile is clean and the **run** raises `IntegerOverflow` from `simpleIntArith.intOverflowingDiv:80` | **no** in both rounds — `Tests run: 2, Failures: 2` then `Tests run: 2, Failures: 1` |
| `library_tests/TimingRungT` | link error, seven `Variable recordTime/printTime is not defined.` | **no** — `probes/junit-before.txt` |

One structural remark. Every one of these sixteen `.fss` programs ends in `println("PASS")` and reaches it
only if no `assert` failed, because `fail` at `Library/CompilerLibrary.fss:73-76` prints `FAIL: …` and then
`throw FailCalled(s)`, which aborts `run()` and gives a non-zero exit. So the difference the inert check
line makes is narrow: a program that printed `FAIL: …`, caught its own exception and went on to print `PASS`
would be caught by `run_out_does_not_contain=FAIL` (R1's and M's form) and not by the other fourteen. The
inert line costs record accuracy and a brief that propagates it; it does not leave these particular tests
unchecked.

## 4. The three nets that do not exist

### (a) No differential test between the two paths

`explorations/coordinator/map/test-coverage.md` records it: `tests/` and `compiler_tests/` share no file
name; `tests/` and `other_compiler_tests/` share eleven names and **every one of the eleven pairs differs**,
`atomic0.fss` down to the success token the harness looks for (`SUCCESS` against `PASS`). Nothing in either
suite runs one program both ways.

**How many one-off differential probes the campaigns wrote.** Counting a probe as differential when the
record shows the same program run under `walk` and under `fortress compile` + `run`:

| campaign | differential probes |
|---|---|
| eight-rung climb | ~26 — rung 3 eight files, rung 4 eight files (both sets' captures **were never committed**), rung 6 five (`testParen`, `chain2`, `tupleTest1`, `p37`, `p37a`), rung 7 four, rung 8 one (`BigSumRung8.fss` under the interpreter) |
| R1 | 3 by the worker (`walk-differential.txt`), 21 + 7 by the skeptic, each at one thread and at four |
| R2 | 9 by the worker (`r2a`–`r2i`), 10 by the skeptic (`s1`–`s10`) |
| batch 1 | F 1 + 3, M 6 + 13, N 11 + 7, T 1 + 5 |
| **total** | **≈ 123 differential runs, 0 of them permanent** |

That is exactly the shape Pavol's rule names as forbidden: proving once by hand that the two paths agree and
going ahead without leaving a check in the gate.

**What a harness mechanism would take, three options.**

1. **A stored expected output, today, no code change.** `run_out_equals` is implemented (`FileTests.java:190`)
   and a `.test` can carry the expected text. Cost: zero harness work, a text edit per test, one gate run
   (739 s) to confirm. **But it does not compare the two paths** — it pins the compiled output against a
   string. And a string captured from `walk` would fail immediately: ledger row 76 (string juxtaposition
   inserting a space on the compiled path) makes the two outputs differ by whitespace in a large fraction of
   the programs the campaigns measured — rungs 3, 4 and 6 each recorded a file whose only divergence was
   that space.
2. **A new `.test` key that runs both paths and diffs them**, e.g. a `walk` command beside `link`/`run` plus
   a `run_out_equals_walk_out` check. That is a new `BaseTest` subclass in `FileTests.java` and one clause in
   `standardCompilerTests` (`:1025-1065`) — the file already runs `bin/fortress` as a subprocess for both
   `CommandTest` and `TestTest`, so the machinery exists. It is a `.java` change: `ant compileAll` 45 s, plus
   the gate 739 s, plus the per-test run cost of a second execution. The blocker is not the harness: it is
   that a `compiler_tests`/`library_tests` program links the `Compiler*` prelude, and only some of them run
   under `walk` at all. Two that demonstrably do: `library_tests/BigSumRung8.fss` (rung 8's report: "the same
   source file also prints `PASS` under the interpreter, so the rung's own test carries its differential
   check") and `compiler_tests/AtomicTopLevelObjectVar` (R1: "prints `PASS` under `walk` as well").
3. **A driver outside JUnit**, in the ladder's shape, run in CI rather than in the gate. Same cost profile as
   (b) below.

A caution the record already carries, and which any of the three must respect: `CLIMB.md`'s "Not verified"
section, added by the repair batch's review, says "output byte-identical to `walk` is evidence of agreement
and not this ladder's criterion" — the specification decides a divergence, and it has decided against the
interpreter (ledger row 323) as readily as against the compiled path (row 322).

### (b) The ladder's 81 passing files are not protected

The ladder is a measurement, not a gate: `explorations/compile-ladder/run-ladder.sh` pushes 410 files
through `fortress compile` + `run` and records the phase reached in `ladder.tsv`; `classify.py:115-124`
calls a file `pass` when the run exits 0 with no `fail`/`FAIL`. Each rung's worker re-runs it on the subset
its own name blocked. A rung that moved one of the other 81 down would be caught only if the next worker's
subset happened to overlap.

**What it would cost.** From the committed re-run at `explorations/compile-ladder/after/`:

| scope | per-file wall time summed from the committed run | note |
|---|---|---|
| all 410 files | **735 s** of `compile` + `run` (`after/results.tsv`, columns 6 and 7) — the record's "11.5 minutes" | plus the driver's private library build from nothing |
| the **81 passing** files only | **192 s** (`after/ladder.tsv` phase column joined to `after/results.tsv`) | the natural regression subset: a file that passes must not stop passing |

So the options are: (i) run the whole ladder as a gate — 735 s of program time on top of the 739 s gate,
roughly doubling it; (ii) run only the 81 — 192 s, a 26 % addition to the gate, and it catches exactly the
regression the ladder cannot catch today; (iii) run either in CI, off the critical path, which is where
`modernization-plan.md` puts CI anyway. Any of the three needs the driver's private-cache library build,
which the repair batch's gate measured at **144 s**; the driver already does it (`run-ladder.sh`'s
`build_library` plus a sanity check that `library_tests/Integer1` prints PASS).

### (c) The seventeen inert `.test` lines

Verified by grep: 17 files carry `run_out_WIcontains=PASS`, nine of them added by the campaigns (the climb's
eight plus R2's). Options:

1. **Implement the key** — one clause in `generalTestFailed` beside `_contains` at `FileTests.java:147`,
   about eight lines. It is a `.java` change: `ant compileAll` 45 s + gate 739 s. It would make all 17 lines
   mean what they say, and it changes no test's outcome today (the default check already demands PASS).
2. **Rewrite the 17 lines** to `run_out_contains=PASS`, the form fifteen `.test` files already used before
   the campaigns. No Java change, so no `compileAll`; the `.test` files are read at suite construction, so
   `testFast` 377 s is enough to confirm, or the full gate 739 s to be safe. Fifteen of the seventeen are
   files the revival did not write.
3. **Leave them and fix only the brief.** This has already happened for batch 1: `CLIMB-BATCH-1.md:67` tells
   the four rungs to write `run_out_contains=PASS`, and all four do. Cost: zero. The seventeen stay as a
   record defect in the corpus.

A fourth thing worth listing beside these three, because it is the same kind of gap and the record names it:
**121 `.fss` files sit inside green test directories and no `.test` names them** (`test-coverage.md:110-117`:
`compiler_tests` 47, `other_compiler_tests` 62, `library_tests` 6, `compiler_regressions` 6). R2 hit one of
them directly — `library_tests/ChooseTest3.fss:125` carries the same out-of-range numeral R2 repaired in
`IntegerChoose2.fss`, and R2 left it because "it is in no `.test` file … so it is not gated and is left for
the record rather than edited unverified". The campaigns added **no** new dark files: all 16 new `.fss`
programs are named by a `.test`.

## 5. How a file becomes a test, and whether each campaign test is actually run

**The compiler corpora (`compiler_tests/`, `library_tests/`, `other_compiler_tests/`, `parser_tests/`).**
`FileTests.compilerSuite` (`FileTests.java:855-874`) lists the directory with `dir.list()`
(`shuffledFileList`, `:1113`) and hands every name to `suiteFromListOfFiles` (`:887-1010`). There:

- a name ending in `.fss` or `.fsi` is **skipped** — `:920-922`, "do nothing";
- a name ending in `.test` is read as a property file; its `tests=` line is tokenised and each token becomes
  a test name (`:936-963`); with no `tests=` line, the `.test` file's own basename is used;
- `standardCompilerTests` (`:1025`) then adds one `CommandTest` per command key present (`compile`,
  `link`, `typecheck`, …) and one `TestTest` if `run` is present.

So **the `.test` file is the whole enumeration**: there is no fileset in `build.xml` naming individual
programs and no list file. `LibraryJUTest.java:36-41` sweeps `ProjectFortress/library_tests` and
`CompilerJUTest.java:36-44` sweeps `compiler_tests` and `parser_tests`; `build.xml:875-890` and `:955-993`
include those classes in `testFast`. A `.fss` with no `.test` naming it is invisible — that is the 121 dark
files of §4(c).

Each `.test` with `link` and `run` therefore yields exactly **2** JUnit cases. The `runOpt` duplicate and the
`BytecodeOptimizeEverything` shell test that `:995-1006` would add are switched off by
`default_repository/configuration:51` (`fortress.unittests.noopt=true`).

**The interpreter corpus (`tests/`).** `SystemJUTest.suite` calls `FileTests.interpreterSuite`, which
enumerates by extension: **every** `.fss` in the directory becomes an `InterpreterTest` (`:812-818`), with
four hard-coded exclusions (`*Syntax.fss`, `*DynamicSemantics.fss`, `*Satisfiability.fss`, `*GenomeUtil*`)
and a four-way shard split (`:790-796`, `build.xml:1178-1193`). An interpreter test passes on no exception,
exit 0 and no `fail`/`FAIL` in the output (`:367-371`). No `.test` file is involved, which is why the two
sides of the tree behave so differently: dropping a `.fss` into `tests/` gates it; dropping one into
`library_tests/` does not.

**Every campaign test checked against that mechanism.**

| test | `.test` present in the swept directory | `tests=` token | matching `.fss` with a matching `component` | run by the gate |
|---|---|---|---|---|
| `library_tests/EqualityRung1` | yes | `EqualityRung1` | yes | **yes** |
| `library_tests/HasRankRung2` | yes | `HasRankRung2` | yes | **yes** |
| `compiler_tests/MutableTopLevelVar` | yes | `MutableTopLevelVar` | yes | **yes** |
| `library_tests/AssertRung4` | yes | `AssertRung4` | yes | **yes** |
| `library_tests/LineConcatRung5` | yes | `LineConcatRung5` | yes | **yes** |
| `library_tests/IntLiteralRung6` | yes | `IntLiteralRung6` | yes | **yes** |
| `library_tests/IntLiteralArithRung7` | yes | `IntLiteralArithRung7` | yes | **yes** |
| `library_tests/BigSumRung8` | yes | `BigSumRung8` | yes | **yes** |
| `compiler_tests/AtomicTopLevelVar` | yes | `AtomicTopLevelVar` | yes | **yes** (but vacuous at one thread — §3) |
| `compiler_tests/AtomicTopLevelObjectVar` | yes | `AtomicTopLevelObjectVar` | yes | **yes** |
| `compiler_tests/MutableTopLevelVarInLoop` | yes | `MutableTopLevelVarInLoop` | yes | **yes** |
| `compiler_tests/IntLiteralWrapRepairR2` | yes | `IntLiteralWrapRepairR2` | yes | **yes** |
| `library_tests/RR64FunctionsRungF` (branch) | yes | `RR64FunctionsRungF` | yes | **yes once merged** — the skeptic checked this directly against `LibraryJUTest.java:36-41` and `build.xml:968` |
| `library_tests/MaybeRungM` (branch) | yes | `MaybeRungM` | yes | **yes once merged** |
| `library_tests/IntegralOpsRungN` (branch) | yes | `IntegralOpsRungN` | yes | **yes once merged** |
| `library_tests/TimingRungT` (branch) | yes | `TimingRungT` | yes | **yes once merged** |

**The arithmetic cross-check.** `testFast` was **1,377** before the climb (`rung0/REPORT.md`) and **1,401**
after the repair batch (`repair-batch/gate/`, and the review's 739 s gate line). 1,401 − 1,377 = **24** =
12 tests × 2 cases. Rung by rung the quoted totals are 1,381 (rung 2), 1,385 (rung 4), 1,387 (rung 5), 1,389
(rung 6), 1,391 (rung 7), 1,393 (rung 8), each +2 over the last, with rungs 1 and 3 not quoting a total
(1,379 and 1,383 by the same arithmetic). `LibraryJUTest` 57 → 69 across rungs 2-8 is 6 library tests × 2.
So every test the campaigns added to `main` is run by the gate, and none of them is a phantom.

**One record defect found in passing**, not acted on: `rung3/REPORT.md` reports its two new cases as "the
compiler-test suite goes 57 to 59". 57 → 59 is the `LibraryJUTest` range rung 2 had just left; rung 3's test
is in `compiler_tests`, so the suite that moved is `CompilerJUTest`, 642 → 644. The total is unaffected.

## Corrections, 2026-09-19, from `process-decisions-review-1.md`

Section 4(c)'s "fifteen of the seventeen" pre-existing `run_out_WIcontains` files is eight (`Boolean`, `Comparison`, `Integer`, `MaybeGetter`, `Compiled12.mini`, `Afm`, `Go`, `Gt`) plus nine campaign files; all seventeen expected strings are `PASS`, so the inert line and the default assert the same thing. N's repair round added 19 assertion lines in 51, not eleven. The 85 pass count is four subset claims on a measured 81, not a measured set.

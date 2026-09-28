# Climb batch 6.5, the judge's repair of the merged-diff review

Carried out on `main` after `930811df4` (the ruling, `JUDGE-review.md`), 2026-09-28, 21:01 to about 21:30 UTC, in
`/home/user/fortress`, after the gate's run had finished (no `ant` or `java` process of it alive; its last output,
`tmp/gate-batch-6.5/diag-compiler.txt`, ends at 20:18 UTC). Nothing was built: no source changed since the gate's
`ant compileAll` (`git diff --name-only 581356f32..930811df4` names only files under `explorations/`), and the gate's
library cache was in place. Every capture is under `judge-repair/` and opens with its machine line: nproc 4, Intel(R)
Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, the load at its start (0.13 to 1.71), openjdk 25.0.4, `FORTRESS_THREADS=1`.
Each capture's script sits beside it.

## 1. What was done, by the ruling's steps

| step | done | capture |
|---|---|---|
| 2 | The `testFast` run's jar is gone. The gate's diagnostic rerun of `CompilerJUTest` (same seed, private cache) failed the same way and its jar survives: `zeroOf`'s `FZZ64` branch calls `coerce_NN32`, then `widen(FNN32): FNN64`; `oneOf` and `run` the same. The judge's elimination is now a measurement on that rerun (deviation 1) | `judge-repair/witness-suite-javap.txt` |
| 3 | `WitnessIdentityRungG.fss`: the two `ZZ64` branches widen `v: ZZ32`; `run` binds `seven` and `eight` and widens them. Messages, comment line and `.test` unchanged; `Library/FortressLibrary.fss` not edited | — |
| 4 | Three junit runs, each a fresh JVM with the test's cache entries removed, each `OK (2 tests)` and `PASS`; `javap` of the jar: every `widen` takes `aload`, none follows a `coerce_*`; walk prints `PASS` | `judge-repair/witness-identity-after.txt` |
| 5 | `rung-generic-runtime/REPORT.md:166` rewritten; row 391's note; the `FACTS.md` sentence; `PLAN.md:67` | — |
| 6 | `ProjectFortress/tests/XXXDispatchRenamedArmWalkRungG.fss` and `XXXDispatchSwappedArmWalkRungG.fss`. Under `harness-one.sh` each is `OK Saw expected exception`, walk's "at least one pair of parameters must have excluding types"; each control (one parameter name) prints `REACHED`, `PASS` under walk and makes the harness say `Missing expected failure`, `Failures: 1` | `judge-repair/walk-dispatch-xxx.txt` |
| 7 | `compiler_tests/XXXTryInArmRungG.fss`, `XXXTryInArmRungG.test`, `TryInArmRungGLink.test`. Link `OK`; run prints `REACHED`, then `VerifyError: Inconsistent stackmap frames at branch target 43`, `Saw expected failure`. The control (the `try` before the `do … also`) links, runs `REACHED`, `PASS`, and the run test says `Did not see expected failure`, `Failures: 1`. Walk prints `PASS` | `judge-repair/try-in-arm-xxx.txt` |
| 8 | The split: both probes as they are crash (`Error trying to close method scope`); with `else => g(y)` and `else => g(Wrap(0))` both compile and print walk's `7 7` and `7`. So `XXXClauseTaskOpsRungG` was not written, and row 340's skeptic note and `RECORD.md:37` were corrected. `XXXTypecaseBodyCoerceRungG` (cause `Index 1 out of bounds for length 1`, row 340's own) and `XXXTupleClauseSpreadRungG` (`Index -1 out of bounds for length 0`) each say `OK Saw expected exception`; each control compiles, runs `PASS`, and turns its test red (`Saw wrong failure`, `Failures: 1`); walk prints `PASS` for both | `judge-repair/task-ops-split.txt`, `judge-repair/codegen-crash-xxx.txt`, `judge-repair/codegen-crash-oneline.txt` |
| 9 | `XXXNNShiftRungP`, `XXXNNGcdLcmRungP`, `XXXZZNarrowRungP`, each `compile` with `compile_err_contains` set to the message measured first ("Could not check call to operator LSHIFT", "… operator GCD", "Could not check call to function narrow"); each `Saw expected failure`. Controls (`<<` and `>>`; `unsigned(twelve GCD eighteen)`; a `ZZ64`'s `narrow`) compile, run `PASS`, and turn the test red. Walk prints `REACHED`, `PASS` for each unmodified file, so no walk row is owed | `judge-repair/prelude-integer-xxx.txt` |
| 10 | One comment line each; citations only in messages; each component name only in its own `.fss` and `.test`; no conversion applied directly to a numeral in any compiled or library test (the ruling's count, four sites before, now none) | `judge-repair/new-tests-check.txt` |
| 11 | Row 159 and its copies in `rung-generic-runtime/record.md:71` and `REPORT.md:118`; `PLAN.md`'s walk line and the handover's line 25; rows 322 and 497; row 340 (corrected and appended); rows 442 and 349 and `rung-spec-integer-rules/REPORT.md:88`; `PLAN.md`'s P.worker.2 line; `PLAN.md`'s new parked line for judge-review.1 | — |
| 12 | `RECORD.md`, "The judge's repair" | — |

## 2. Deviations from the ruling

1. **Step 2 measured the gate's diagnostic rerun, since the `testFast` jar is gone.** `default_repository/caches/bytecode_cache/`
   was recreated at 20:05:25 UTC, after `testFast`, and holds only the `atomic` stage's jars
   (`judge-repair/witness-suite-javap.txt` section 1). The ruling asks for one line in that case. The gate's diagnostic rerun
   (`tmp/gate-batch-6.5/diag-compiler/run.sh`: `CompilerJUTest`, `FORTRESS_UNITTESTS_SEED=1a0e991f3b4_16`, `FORTRESS_THREADS=1`,
   a private cache) failed on the same test in the same way (`tmp/gate-batch-6.5/diag-compiler.txt:983-989`, `:2308`), and its
   jar survives. So the capture gives the one line and then that jar's `javap` (sections 2-5). It measures the pick the
   judge derived by elimination: `coerce_NN32` then `CompilerBuiltin.widen(FNN32): FNN64`, in `zeroOf`, `oneOf` and all four
   `widen` calls of `run`.
2. **Step 8's `typecase` is written with each clause on its own line.** The parser refuses the one-line spelling
   `typecase o of A => 1 else => 0 end`: "Syntax Error" at the `else` (`judge-repair/codegen-crash-oneline.txt`, the first run).
   Its grammar puts a line break before each further clause and before `else`: `a2s:(br TypecaseClause)*` and
   `a4:(br CaseElse)?` (`ProjectFortress/src/com/sun/fortress/parser/DelimitedExpr.rats:234`, `:123`). The one-line form is the
   row's prose shorthand. The test's `f` is otherwise the row's own shape. The control wraps the same lines in `do … end`.
3. **The correction of row 340's skeptic note is also made in `rung-generic-runtime/record.md:153`.** The ruling names the
   ledger note and `RECORD.md:37`. That record line is the note's source, and the gather keeps the two in agreement
   (`RECORD.md:34`, "so that it and the ledger agree").
4. **Step 12's count uses a stated regular expression.** The gather's expression is not recorded (`RECORD.md:64` gives
   only its results, 515 at the base and 541 after the rungs). Counting lines that are exactly one of `FileTests`'s command
   words (`compile`, `desugar`, `link`, `api`, `parse`, `disambiguate`, `grammar`, `typecheck`, `unparse`, `compare`, `build`,
   `run`; `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:1044-1046`, `run` at `:1063`) gives 517 at the
   base, 543 at `930811df4` and 550 in this commit. The difference, +7, is one command line in each of the seven new `.test`
   files, so it is the same under both expressions: `CompilerJUTest` 815 + 7 = 822.
5. **Step 9's messages also name the ledger row** (442 for the `NN` tests, 349 for `narrow`), beside the specification lines
   the ruling names. The prefix puts a test's citation in its message, "the ledger row number or the specification line".

## 3. The homes of what this repair measured

- **The varying pick of `widen(0)` over the compiled prelude** (row 391): home 3 by the ruling. No test is stable over a pick
  that varies. The one test that had the shape no longer has it (home 1 for the test's own defect: `WitnessIdentityRungG`
  passes three times from a fresh cache, `judge-repair/witness-identity-after.txt`).
- **Walk's refusal of the α-renamed and swapped pairs** (row 159): home 2, `XXXDispatchRenamedArmWalkRungG`,
  `XXXDispatchSwappedArmWalkRungG`.
- **`try … catch` in a `do … also` arm** (rows 322 and 497): home 2, `XXXTryInArmRungG` with its two `.test` files.
- **The code generator's crash on a `typecase` body coerced from a numeral** (row 340's own shape) and **on a named tuple
  clause spread** (row 340's skeptic note): home 2, `XXXTypecaseBodyCoerceRungG`, `XXXTupleClauseSpreadRungG`. The
  task-operand shape is row 340's own shape, by the split, and has no test of its own.
- **`LSHIFT`, `RSHIFT`, `GCD` and `LCM` on `NN32` and `NN64`, and `narrow` on `ZZ`, refused by the compiled prelude** (rows
  442 and 349): home 2, `XXXNNShiftRungP`, `XXXNNGcdLcmRungP`, `XXXZZNarrowRungP`, promoted at the switch-over, as
  `XXXShiftDeclRungI` is.

## 4. Stops

None met. The repair edits no checker, walk, library or api line and no Java; it changes the verdict of no test but
`WitnessIdentityRungG`, the one it repairs; it changes no assertion of a re-anchored test; it edits no file under
`Specification/`. It did not touch `explorations/coordinator/CLIMB-BATCH-N.md`.

## 5. The tracked-path check

Run over `RECORD.md`, `JUDGE-review.md`, this file, `rung-generic-runtime/REPORT.md` and `record.md`,
`rung-spec-integer-rules/REPORT.md`, `PLAN.md`, `FACTS.md`, the ledger and the handover, for both the
`explorations/compile-ladder/…` and the short `compile-ladder/…` spellings, after staging. Every path this repair cites
exists and is tracked. The check prints three lines, all older text this repair does not add or change: a glob,
`climb-batch-*`, at `PLAN.md:254` and `FACTS.md:71`; the brace pattern `rung-wrap-operators/probes/count/XXXInheritedOverload.{baseA,edit,baseB}.txt` in row 430;
and `rung3/interp/immutableTopLevel.out` in row 313. The gate's logs under `tmp/gate-batch-6.5/` are untracked, as for the
review (`merged-review/witness-identity-gate.txt`): the lines deviation 1 uses are copied into
`judge-repair/witness-suite-javap.txt`, section 2, with the rerun's settings.

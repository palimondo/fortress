# Climb batch N: the gather's record

Written at the gather stage of climb batch N's first run (2026-09-29), the first run of `explorations/coordinator/CLIMB-BATCH-N.md` (rungs I, K, T and M), on `main` from the base `bce66f1fa`. `main` was at `b6d13732b` when the gather began, two coordinator commits above the base (`d674b45e3` and `b6d13732b`, the boot note in `explorations/coordinator/postmortem-2026-09-19/held-list.md` only). Neither touches a rung's file or anything outside `explorations/`, and the ledger, `FACTS.md`, the handover and `PLAN.md` are as the base has them. All four rungs were approved, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`.

**Preconditions.** `bce66f1fa` is an ancestor of `HEAD`. `git status --porcelain` was not empty: it printed one untracked directory, `explorations/compile-ladder/plan-n/manifest/__pycache__/`, Python's byte-code cache of the manifest generator `genn.py`, which the coordinator ran when splicing the batch. It is no rung's file and no tracked path; the gather left it in place and staged every commit by an explicit list, so it is in none of them.

## The order the rungs were applied in

I, then K, then T, then M. No path is shared by two branches (`git diff --name-only bce66f1fa...<branch>` for the four, compared: no path in two lists), so the rule of the lowest edited line in a shared file does not order them, and the batch record's own order stands (`coordinator/CLIMB-BATCH-N.md` section 4, "The order the gather applies them": "no file is shared, so the order matters only for the folds and T's check: I, then K, then T, then M"). T must follow I, since it lands only with I and the gather checks T's chapter against I's landed tests; the new ledger rows are numbered in the same order.

Where one rung's records cite lines of a file another rung edits, the order decides which citations move after they land:
- K's records cite `CoercionOracle.scala:193-196`, which I's edit moves; T's cite `Functionals.scala` and `STypesUtil.scala` lines, which I's edit moves, and `EvaluatorBase.java`, which K's moves. Each is re-anchored by symbol at its rung's fold, since I and K land first.
- I's records cite `Library/FortressLibrary.fss:4600` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:488`, which M's sixteen and four inserted lines move, and `Specification/basic/inference.tex:15-26` and `:24-25`, the base's chapter, which T rewrites. Those citations are in I's landed files before M and T land; the gather re-anchors the ones folded into `FACTS.md`, the ledger and `PLAN.md` in the later rung's commit, and names in that rung's section the ones left in the rung's own files as base citations.

## Final row numbers

From 504, the first free row (`LEDGER_FROM`), in manifest order, each commit appending its rows after the last row of section 10 of the ledger (row 503 before this batch):
- I: its provisional rows 504 to 507 keep their numbers; its second skeptic's row, the expected type leaving out a generic that fits, is 508.
- K: its provisional rows 504 to 507 are 509 to 512 (the instance split, the expected type at a generic result under walk, varargs and tuple parameters over mixed widths, the compiled union of three types); its second skeptic's row, a generic trait's coercion with its own static parameter, is 513. The provisional numbers are corrected in its `record.md`, `REPORT.md` and `probes/for-pavol.txt`; `SKEPTIC.md` and `JUDGE.md` gain one note line under their titles mapping them (two lines, so their sections sit two lines lower than written; nothing cites them by line).

## Rung I (`rung-inference-checker`)

**Inherited from the branch.** Twelve commits, `4dc6f90c4` to `36548e6e4`: the first pass's failing tests and base captures, its edit, its measurements and its lists (`4dc6f90c4`, `8de87af6c`, `5a949ad17`, `3e3a8adbf`); the first skeptic's refusal with its probes (`13ba3f3f0`); the judge's ruling, repair (`e16135bb1`); the repair round's tests on the first pass's build, its edit, its measurements and `record.md` (`d85223560`, `4a51a0ef4`, `f4dff7926`, `2348ea6b1`); the second skeptic's judgement with its probes (`1411b4a92`, `36548e6e4`). `record.md`, `SKEPTIC.md` (both judgements, the second first) and `JUDGE.md` were on the branch and stand as they are, with the gather's edits below. `REPORT.md` was not on the branch, because the harness refused its writes in both passes.

**Written at the gather.** `explorations/compile-ladder/rung-inference-checker/REPORT.md` from the repair round's `reportText` (82,309 bytes, ending with a newline as the text does): the JSON string literal copied to a scratch file and decoded by Python's `json.load`, so that no escape was undone by hand. Then the gather's edits below.

**Applied.** `git apply --3way --index` of `git diff --binary bce66f1fa...wip/rung-inference-checker` applied without a conflict; its only warnings were whitespace in captures (72 lines). The index was then compared with the branch on every path of the patch, and all 310 paths match, the two renames and the two deleted `.test` files among them.

**Corrections.** The first skeptic's twelve, which the repair round made, each checked in the file it names:
1. Σ′ ranked whole: `ProjectFortress/compiler_tests/InferSigmaWhole.fss:28` asserts `g(W1, T)`, and `XXXInferSigmaTie.test` pins "Ambiguous coercion in call to function f".
2. The numeral tie over every candidate: `InferNumeralTie.fss:27` asserts `pickb(3000000000)` is `ZZ64` (the correction's `pickn`, renamed in the test).
3. `InferCoercionShapes.fss` holds no `"ZZ,ZZ"`; `XXXInferPromoteNN32.fss` asserts `ZZ64,ZZ64` (run, `REACHED`, with `InferPromoteNN32Link.test`); row 442's note names it.
4. `XXXInferFallbackMessage.test` pins "Right-hand side has type ZZ64, but declared type is String.".
5. `XXXInferLambdaArg.test` and `XXXInferComboCap.test`, and row 401's note names both (rows 507 and 506).
6. Row 391 stays open, its note saying the call-site half is fixed.
7. The FACTS and handover lines state what is built (and, after the second skeptic's correction 1, below, what the first attempt leaves out).
8. `REPORT.md` section 6.6 names `c3`'s changed message under `TestsD` and the phase-order reading, and the stale capture behind it.
9. `REPORT.md` section 3.1 reads `:838` and `:1024` for the first pass's tree.
10. The solver stop's evidence and rows 447 and 505 carry `SkBottomRun`'s `VerifyError`.
11. Row 455's note names the method, prefix, infix and parenthesised faces now accepted and the loose juxtaposition still dropped.
12. The repair round's captures on the repaired tree: `REPORT.md` section 6 (the compiler tests' diagnostics, the count 75, the distance 626 site for site, the ladder).

The second skeptic's three, made at the gather:
1. **The stop it meets.** `probes/stops-met.txt` gains entry 6 and `probes/for-pavol.txt` entry 10, "a ranking that lets a declaration needing a conversion win over one that fits the call as it is", with `probes/skeptic/S2CtxConvWinsW.diff.txt:6` against `:14` and `:19` (opened: 99 on the rung's build, 1 on the base's and under walk) and `S2CtxConvWins.diff.txt:8`, `:17` (opened: `O.km(NOf(1))` 99 on both builds), lifted by POSITIONS 2026-09-27, on the stops a batch record reserves for him. `REPORT.md` section 3.3 item 3, section 9 (a new "Met" bullet, and the "Not met" bullet narrowed to what holds within one attempt) and section 11, and `record.md`'s FACTS line and handover line, now say that the first attempt is by subtyping under the expected type, that a declaration fitting the arguments but whose result the expected type refuses is not among its candidates, so that a declaration reached by coercion whose result fits can win, new at a call written `f(x)` and the base's behaviour at a method invocation. The cited code was opened on the landed tree: the attempts at `Functionals.scala:652-656`, `inferStaticParams`'s range constraint at `STypesUtil.scala:938-940`.
2. **The owed expected failure.** `ProjectFortress/compiler_tests/XXXInferContextKeepsFit.fss`, `XXXInferContextKeepsFit.test` (`run`, `run_out_contains=REACHED`) and `InferContextKeepsFitLink.test` (`link`), copied byte for byte from `probes/skeptic/draft/`, where the skeptic captured it: `REACHED` then "FAIL:  99 =/= 1" on the rung's build (`draft/XXXInferContextKeepsFit.rung.txt`), `PASS` on the base's (`draft/XXXInferContextKeepsFit.base.txt`). The two names are appended to `suite-list.txt`, and `record.md`'s count for the manifest reads 42 command lines, not 40.
3. **The row.** Row 508, the skeptic's recommended row in its words, citing the test and the two probes; `record.md` carries it in the ledger's columns.

**Recommended rows.**
- The 64-combination cap: row 506, the rung's own provisional row, gated by `XXXInferComboCap` (opened).
- The untyped lambda argument: row 507, likewise, gated by `XXXInferLambdaArg` (opened).
- The expected type leaving out a generic that fits: row 508 (opened, correction 3).
- The `VerifyError` of a generic's instance beside a plain declaration with a wider result: a note on row 496, as the skeptic words it (`probes/skeptic/S2CtxConvWinsZ.diff.txt:7-8`, `:32-33`, `:58`, opened: the `VerifyError` on both builds, walk's refusal at load).

**Folded.**
- `FACTS.md`: the record's entry after the last entry of "The checker and the one library" (rung Y's `comprises` entry), its sub-bullets joined into its one line, with correction 1's wording; the two appends, to "Static arguments are inferred from the arguments alone …" and "Keeping the expected type at a call written `f(x)` …"; "The ledger"'s two citations re-anchored to `:836` and `:696` (they read `:830` and `:690`, one line stale already at the base, since row 503 was added after batch 6.5's gather).
- The ledger: rows 401, 455 and 391 gain their status appends and notes; notes on rows 388, 447, 485, 484, 390 and 442 and the skeptic's on 496, and one sentence on row 455 naming row 508; rows 504 to 508 after row 503. Every pipe inside an appended note is escaped (row 388's `||`).
- The handover: one paragraph after rung P's of batch 6.5.
- `PLAN.md`: items 33 and 34 in two new groups and a sentence on item 18 (below), and six parked lines.

**Items for Pavol, as `PLAN.md` holds them** (the ids are the workflow's):
- **I.worker.6, I.skeptic.1 and I.judge.3**, the solver stop's two shapes and their run-time failures: item 18 (row 447), which holds the question; a sentence added with the two shapes and the alternative on record.
- **I.skeptic2.1**, the order of the attempts under an expected type (row 508): item 34, before the switch-over; no default beyond the landed order.
- **I.worker.8**, `z CMP 0` on the switch copy, for rung Q: item 33, before batch N's second run, default decision 2's device inside rung Q.
- **I.worker.1, I.worker.2, I.skeptic.2 and I.judge.2**, Q1's default as built and a numeral too large for every declaration: one parked line.
- **I.worker.3 and I.judge.1**, the ranking of a generic in Σ′: one parked line.
- **I.worker.4**, the fallback's departure from the judge: one parked line.
- **I.worker.5**, answer 8's `ZZ` and `ZZ64` by library and `XXXInferPromoteNN32`: one parked line.
- **I.worker.7 and I.judge.4**, rows 391 and 455 left open: one parked line.
- **I.worker.9**, the stock crash gone since rung G: one parked line.

**Stops.** Met and lifted, each reversible under POSITIONS 2026-09-27, the stops: the worker's five (`probes/stops-met.txt`, entries 1 to 5, the solver stop among them) and the second skeptic's (entry 6, row 508). None holds the push.

**For the gate.** The compiler track gains 42 command lines (`record.md`, "For the manifest and the gate"). The checker count stays 75 and the distance 626 (`probes/checker-count-repair.txt`, `probes/distance-repair.txt`). Rung I's Scala edits need `ant compileAll`.

## Rung K (`rung-inference-walk`)

**Inherited from the branch.** Thirteen commits, `0dc881cb9` to `4dc01b453`: the first pass's failing tests and base capture, its edit, its comparisons and `record.md` (`0dc881cb9`, `a686b4504`, `3218bed4b`, `34235e4b2`, `b9d21288f`, `7f8399e45`); the first skeptic's refusal with its probes (`7a483c856`, `48c5d3f05`); the judge's ruling, refusal ruled with repair instructions (`f2f3c5e27`); the repair round's reset, tests, captures and amended `record.md` (`7d92018b8`, `b04c56b62`, `4b2bc9fb2`); the second skeptic's judgement with its probes (`4dc01b453`). `record.md`, `SKEPTIC.md` (both judgements, the second first) and `JUDGE.md` were on the branch and stand as they are, with the gather's edits below. `REPORT.md` was not, the harness having refused both passes' writes.

**Written at the gather.** `explorations/compile-ladder/rung-inference-walk/REPORT.md` from the repair round's `reportText` (46,819 bytes, ending with a newline as the text does), decoded by `json.load` from the literal as for rung I.

**Applied.** `git apply --3way --index` of `git diff --binary bce66f1fa...wip/rung-inference-walk`, on top of I's commit, applied without a conflict; its only warnings were whitespace in captures (151 lines). All 174 paths of the patch match the branch in the index, the two renames among them. No path is shared with I's commit.

**Corrections.** The first skeptic's five, which the repair round made, each checked:
1. The cache that outlived a run: `Coercions.reset()` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:166-168`) called from `Init.initializeEverything` (`Init.java:44`, its import `:17`), and the heap re-measured flat (`probes/repair/heap-summary.txt`; the second skeptic's `probes/skeptic/round2/heap-summary.txt`, the whole suite in one JVM tracking the base).
2. Row 388's container shapes: nine assertions at `ProjectFortress/tests/InferCoercionRungK.fss:59-67`, each message citing row 388; named in the row 388 note and the FACTS entry.
3. The varargs shape: `ProjectFortress/tests/XXXInferVarargsRungK.fss`, failing at `:20`, and its row (511), which also names the tuple shape.
4. Decision B and the FACTS entry state the reach to a user coercion; `record.md`'s "For the gather" asks for `SkK17` on rung I's build (below).
5. The FACTS entry's "Not reached" names varargs and tuple positions.

The second skeptic's three, made at the gather:
1. **Row 389's sibling, home 2.** `ProjectFortress/tests/XXXCoercionOwnStaticRungK.fss`, a byte-for-byte copy of `probes/skeptic/round2/draft/XXXCoercionOwnStaticRungK.fss`. `record.md`'s `testSystem` line says rung K adds five files and that run 1's sum is the comparand's plus six with M's test (the run's total with the gather's later additions is under "For the gate", below).
2. **Row 389's closure scoped.** `record.md`'s closing note on row 389, its FACTS entry's clause on a generic trait's coercion, the sentence appended to "Under `walk`, the interpreter converts by coercion at its three kinds of type check …" and the handover line say that the fix covers a coercion whose static parameters are the trait's own, and that a coercion with its own static parameter is still refused, row 513, gated by the new test. The row's status reads "FIXED (…), for a coercion whose static parameters are the trait's own; a coercion with its own static parameter is row 513". The cause was opened: `CoercionLifter.scala:151-153` (the trait's static parameters followed by the coercion's), `Coercions.java:117` (the count test that skips it).
3. **The varargs binding.** Row 511's notes (`record.md`), `REPORT.md` decision K and section 9 now give the measured fact: the binding stores each element through the array's `init` method, whose declared parameter converts (`ProjectFortress/src/com/sun/fortress/interpreter/glue/IndexedArrayWrapper.java:43`, `:67-71`, `WellKnownNames.java:54`, opened), so `varR[\ZZ64\](z, w)` prints `[3:ZZ64,4:ZZ64]` at the base and after (`probes/skeptic/round2/walk-base.txt:27`, `walk-edit.txt:24`, opened), and the repair is the first pass's varargs branch alone (`EvaluatorBase.java:151-156`, opened), inside rung K's file.

**Re-anchored.** Rung I's edit moved the checker's lifted-coercion lines that K's report cites as its precedent: `CoercionOracle.scala:193-196` at the base is `:217-220` on the landed tree ("the lifted args are given in U", found by symbol), in `REPORT.md`'s provenance block and sections 2 and 4 and in row 513. `SKEPTIC.md`'s two citations of the base's lines stand, and its gather note says so. `record.md`'s placeholder `<landing commit>` is written `<short hash>`, the commit stage's.

**Recommended rows.**
- The compiled three-type union: row 512, the rung's own provisional 507, gated by `XXXUnionOfThreeRungK` (opened).
- Walk's varargs and tuple positions: row 511, the rung's own provisional 506 (opened).
- The user coercion on row 504, now 509: in the row's text as the repair round wrote it, and the measurement the recommendation asks the gather for appended as a note (below).
- A generic trait's coercion with its own static parameter: row 513 (opened, correction 2).
- Tuple values for a lone parameter: a note on row 511, in the skeptic's words (`probes/skeptic/round2/walk-edit.txt:19-21`, `compiled.txt:31-41`, opened).
- A dotted generic method's own static arguments over mixed widths: a note on row 21 (`probes/skeptic/round2/walk-base.txt:10-14`, `walk-edit.txt:10-14`, `compiled.txt:15-19`, opened).

**The gather's measurements on the merged tree** (rung I's commit with rung K's patch, built by `ant compileAll` in the main tree, 42 s, and the five library components compiled in library order by rung I's checker, AnyType 14 s, CompilerBuiltin 60 s, CompilerLibrary 23 s, CompilerAlgebra 2 s, CompilerSystem 2 s; `tmp/gather-N/`, not committed):
- `SkK17`, as `record.md` asks (`explorations/compile-ladder/climb-batch-N/merged-tests/both-SkK17-SkExpRun.txt`): walk prints `Aaa Aaa`, and compiled with rung I's checker it prints `Aaa   Aaa` (row 76's spaces). Rung I's promotion takes the union bound for `AaaOf` and `CccOf` to `Aaa`, a coercion target of `CccOf`, as walk does, so the two paths agree; rung T's chapter names the same candidates (the arguments' types and the types they coerce to). The batch record's narrower statement for the checker ("the narrowest of its arguments' types and its bound", `coordinator/CLIMB-BATCH-N.md:245`) is not what either path does. A note on row 509 records it.
- `XXXUnionOfThreeRungK` with its link test (`merged-tests/junit-IK.txt`): the link test is `OK`, and the run prints `REACHED`, the `NoSuchMethodError`, "Saw expected failure". Rung I's build does not make it pass, so row 512 stays open and the pair keeps its names. The same run shows rung I's `XXXInferContextKeepsFit` failing as expected on the merged tree.
- Rung K's six walk tests and the new `XXXCoercionOwnStaticRungK` through the `testSystem` harness (`merged-tests/walk-K-IK.txt`, the rung's `harness-one.sh`): three `PASS`, four "OK Saw expected exception", "OK (7 tests)".

**Folded.**
- `FACTS.md`: the record's new entry after the last entry of "Landed semantics" (the record asks for the place after "Under `walk`, the interpreter converts by coercion …"; the gather's rule puts it after the section's last entry, rung J's ranges entry), and its three appends; "The ledger"'s citations re-anchored to `:841` and `:701`.
- The ledger: row 389 closed with its note; row 388 closed, both halves having landed (`FIXED`, rung I at `8dc1a74d9`, rung K at `<short hash>`), with K's note and the closing sentence; notes on rows 486, 432, 430 and 364; rows 509 to 513 after row 508, row 512's `||` escaped; the skeptic's notes on rows 511 and 21; the gather's note on row 509.
- The handover: one paragraph after rung I's.
- `PLAN.md`: five parked lines, and the parked line on the conversion judgement's defaults names row 509 as the row "batch N's gather opens".

**Items for Pavol, as `PLAN.md` holds them:**
- **K.worker.1, K.skeptic.1, K.skeptic2.1 and K.judge.1**, the promotion's reach to user coercions: one parked line, with the gather's measurement that rung I's checker gives the same answer; default as landed.
- **K.worker.2 and K.judge.2**, `Init.java` outside the rung's list: one parked line; default as landed.
- **K.worker.3 and K.judge.3**, the compiled union test's home 2 in K's repair: one parked line; default as landed.
- **K.worker.4**, walk's expected type at a generic result (row 510): one parked line on walk's static-argument inference against the specification, which rung T's items extend; default walk as it is, the gap gated.
- **K.worker.5**, `Coercions.addSource`: one parked line; default left.

**Stops.** One listed by the worker and both skeptics, the edit to `bestMatchInternal`, reported whole and read as the re-instantiation the record permits; reversible and lifted by POSITIONS 2026-09-27, the stops (`probes/stops-met.txt`). The repair round's and the gather's additions meet none: `Init.java` and the new test files are no other rung's.

**For the gate.** `testSystem` gains five files for K (`InferCoercionRungK`, `XXXNatValueNN32RungK`, `XXXInferExpectedTypeRungK`, `XXXInferVarargsRungK`, `XXXCoercionOwnStaticRungK`); the two renamed files keep their count. The compiler track gains 2 command lines (`UnionOfThreeRungKLink.test`, `XXXUnionOfThreeRungK.test`). The checker count stays 75. Rung K's Java edits need `ant compileAll`.

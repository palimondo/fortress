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

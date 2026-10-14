# Climb batch 14: the gather's record

Written at the gather stage of climb batch 14 (2026-10-14), the run of `explorations/coordinator/CLIMB-BATCH-14.md` (rungs S, A, L, P and W), on `main` from the base `5bf8a7c84f313b1ee292de26081238a02b9a8d50`. `main` was at `2ac499dea` when the gather began, one coordinator commit above the base (`explorations/coordinator/BOOT.md`), which touches no file a rung touches. All five rungs were approved, none after a judge's ruling and none with a repair round, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`, and each branch stays as it is.

**Preconditions.** `git status --porcelain` was empty, and `5bf8a7c84` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0).

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff 5bf8a7c84...<branch>`. One tree was seeded outside the main tree from the batch's base build, with `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base14 /home/user/fortress-gather14 - 5bf8a7c84f313b1ee292de26081238a02b9a8d50` ("seeded from /home/user/fortress-base14 (5bf8a7c84) in 3 s"); nothing was built or run in the main tree or in the base build. In `/home/user/fortress-gather14` the five patches were applied in the order below with `git apply --3way --index` (no conflict), then `ant compileAll` ("BUILD SUCCESSFUL", "Total time: 47 seconds", "Caches /home/user/fortress-gather14/default_repository/caches started again, empty") and the library order (five compiles, each `rc=0`, five jars). The closing tests ran there. After the last rung's commit, `git diff --cached --stat 1c32ccffd -- ProjectFortress Library build.xml` in that tree printed nothing, so the code and tests the tests ran on are `1c32ccffd`'s; in `Specification/` the two trees differ only by the row numbers the gather put in place of the placeholders.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | L, `rung-library-followups` | `wip/rung-library-followups` at `c0b42d2b3` | `604d0e23c` |
| 2 | A, `rung-argument-context` | `wip/rung-argument-context` at `0e6ba214b` | `0856f3e6a` |
| 3 | P, `rung-popl-examples` | `wip/rung-popl-examples` at `37340ad9e` | `3ba2d005f` |
| 4 | W, `rung-walk-coverage` | `wip/rung-walk-coverage` at `ed43e44e4` | `f9fe5c874` |
| 5 | S, `rung-self-type` | `wip/rung-self-type` at `190ef18f0` | `1c32ccffd` |
| | the rows' closes | | `b2b68d7fc` |

## The order the rungs were applied in

L, then A, then P, then W, then S, read from `git diff -U0 5bf8a7c84...<branch>`.
- The shared files are two: `Specification/appendices/changes.tex` (A, P, W and S) and `Specification/basic/traits.tex` (S and W). L shares no file with any rung.
- The lowest edited line of each rung in those files, on the base: S `traits.tex:285` (`changes.tex:3296`); W `traits.tex:581` (`changes.tex:2619`); A `changes.tex:1056`; P `changes.tex:2306` (its last hunk at `:3280`).
- Taken as one number per rung, the rule gives S, W, A, P. Read file by file, as batch 12's and 13's gathers read it, `changes.tex` gives A, P, W, S and `traits.tex` gives S before W: the two disagree on S and W, so no order keeps both files ascending.
- The gather took `changes.tex`'s order, the file four rungs share, so S went last: A (`:1056`), P (`:2306`), W (`:2619`), S (`:3296`). The reason is the rule's purpose, that a later hunk not shift what a landed record cites. Under the one-number order, A's 92 net lines (`:1056` to `:2188`) and P's 42 (`:2305` to `:2430`) would land after S's and W's and move every line of their `changes.tex` entries. Under `changes.tex`'s order the one file whose order is broken is `traits.tex`, where S's 48 lines land above W's revised sentence; no folded record (FACTS, ledger, `PLAN.md`) cites a line of `traits.tex` that S's hunks move, and W's revival change, which does, is re-anchored below. P and W interleave in `changes.tex` (P's last hunk, `:3280`, lies below W's `:2619-2776`), so W's hunks move P's lines there whichever goes first; no folded record cites them.
- L, which shares no file, went first; it moves no other rung's line of a shared file, and no other rung edits its files.
- Every patch applied with `git apply --3way --index` and no conflict (every file "Applied patch ... cleanly", after git's fallback to direct application). Each rung's own files on `main` matched its branch byte for byte before the gather's edits (`git diff --cached --stat <branch> -- <the rung's paths>` printed only the earlier rungs' files and the shared files), and in each shared file `git diff --cached <branch>` showed only the earlier rungs' hunks (`changes.tex` 110 lines for A against P's branch, 160 for A and P against W's, 225 for A, P and W against S's; `traits.tex` 21, W's, against S's).

Lines that an earlier rung's hunk moved, re-anchored by symbol:
- In L's commit, item 53 of `PLAN.md` cited the compiled checker's untyped function expression at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1141-1147`, true at L's commit; A's hunks add 109 lines above it, so A's commit re-anchors it to `:1250-1256` (`case SFnExpr`).
- L's three lines above `Library/FortressLibrary.fss:2182` move S's revival change's `:2182-2194` to `:2185-2197` on `main` (`assign` to `fill`); its `:226-293`, `:360`, `:363` and `:691-724` lie above L's first added line (`:812`) and stand.
- S's 48 lines above `Specification/basic/traits.tex:581` move W's revival change's `:579-600` to `:627-648` on `main`.
- P's `changes.tex` lines in its points, `:2405-2414` and `:3322-3324` on P's tree, are `:2497-2506` and `:3475-3477` on `main` (A's and W's hunks above them).
- Rung files (`REPORT.md`, `SKEPTIC.md`, S's `decision-record.md`) cite their own rung's tree and are not re-anchored; the revival changes below are copied word for word, with the lines on `main` given after each where they differ.

## The tests on the merged tree

From `/home/user/fortress-gather14` (the five patches on `5bf8a7c84`, whose code and tests are `1c32ccffd`'s):
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1` with every interpreter test file the five rungs add or change, 27 programs with their 12 `.test` files:
  `# harness-one 2026-10-14T04:43:36Z; tree 5bf8a7c84; nproc=4; load 0.21 0.83 1.42; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache filled`
  `OK (27 tests)`
  (A first run of the same 27 programs without their `.test` files, at 04:39:52Z, read 12 failures, each a test whose `.test` key the run lacked; it is not a result.)
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh merged14 ProjectFortress/compiler_tests` with the 37 compiled `.test` files S, A, P and W add:
  `# junit.sh merged14 2026-10-14T04:40:19Z; nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 1.98 1.29 1.67; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; ...`
  `. run ProjectFortress/compiler_tests/InferCallArgumentContext (472ms) takesBox64(wrapT(3)) -> BoxT[ZZ64]`
  `OK (57 tests)`
- Each closing test among them: `InferCallArgumentContext` (compile, link and run, "Passed"); `XXXNoDuplicatesRule.test` ("There are multiple declarations of dup with the same parameter type: Box[\T\]", " Saw expected failure"); `NatArithPowerWalk`, `IntMapSymdiffSingleton`, `Array2SubscriptInBounds`, `SeededRandomGenAbstractMethods` and `AnyGenPerturbOtherType` ("PASS", " OK"); `AbstractMethodPartlyDefinedWalk` (" OK Saw expected refusal at load").

`python3 explorations/coordinator/tools/ledger.py check` after the closes: "709 rows, 10 fail the template; rows (or places) failing each rule: spec-path 8, reproducer-path 2, spec-section 1". Against the base's nine (eight `spec-path`, row 642's `reproducer-path`, one `spec-section`), the one new failure is row 535's reproducer, which rung A renamed (below, and gather.2). `python3 explorations/coordinator/tools/record.py check --base HEAD` before each commit: "0 failures".

The specification's PDF was not built here; the commit stage builds it once, `Specification/` having changed.

## Rows opened

Numbered by `ledger.py add` in the order the rungs were applied, each rung's rows in the order of their placeholders. Each placeholder was replaced by its number in the rung's `REPORT.md`, `SKEPTIC.md` and in `Specification/appendices/changes.tex` (A's `row~NEW-A-1`, now `row~705`; P's `row~NEW-P-2`, now `row~707`; and W's two departures, which the Effect of `revival-covering` named "a row of the revival's gap ledger", now `row~708` and `row~709`, W's skeptic's `leftForGather`), before the rung's commit; no test cited a placeholder. Every row was accepted as its record wrote it.

| Row | Placeholder | Rung | Section | Claim, in short |
|---|---|---|---|---|
| 703 | NEW-L-1 | L | 8 | under walk, `__bigOperator`'s local `body` cannot take its parameter's type `I`, as the compiled checker asks of the untyped `body(i)`: an unwritten list or map comprehension instantiates `I` at `BottomType` or a pair holding it |
| 704 | NEW-L-2 | L (its skeptic) | 10 | the library's `IntMap` `UPLUS` of a many-entry map and a one-entry map on a shared key throws no `KeyOverlap` and keeps the many-entry map's value, while the reverse order throws |
| 705 | NEW-A-1 | A | 2 | under walk, a call written as another call's argument gets no expected type, so a static argument only its result mentions takes its bound |
| 706 | NEW-P-1 | P | 4 | under walk, a generic declaration reached by dispatch whose type parameter only its return type mentions runs at its bound, not at the call's static type |
| 707 | NEW-P-2 | P (its skeptic) | 5 | the compiled checker refuses two functional methods of one name whose parameter types are each a subtype of the other only when their `self` parameters stand at one position |
| 708 | NEW-W-1 | W (its skeptic) | 3 | under walk, the abstract-method load check does not refuse an object whose coverage search does not settle |
| 709 | NEW-W-2 | W (its skeptic) | 3 | the compiled checker refuses an object whose concrete methods cover an inherited abstract method of two parameters only through combinations of the types a `comprises` clause lists |
| 710 | NEW-S-1 | S | 3 | the team demo `ProjectFortress/demos/trips.fss:97-98` declares `object generator(...) extends StandardTotalOrder[\trip\]`, which the self-type rule refuses |

## Rows closed

Each by `ledger.py close N --commit <the rung's commit on main> --test <the test>`, after its test passed on the merged tree as the rung last ran it, in `b2b68d7fc`, with the record's note in the close:
- Rung L, `604d0e23c`: 671 (`IntMapSymdiffSingleton`); 679 (`Array2SubscriptInBounds`, the distance stage's site `FortressLibrary.fss:2525` gone).
- Rung A, `0856f3e6a`: 455 (`InferCallArgumentContext`; walk's side is row 705).
- Rung P, `3ba2d005f`: 676 (`ProjectFortress/tests/NatArithPowerWalk.fss`); 696 (`ProjectFortress/compiler_tests/XXXNoDuplicatesRule.test`; the defect was the text's, the test green on the base).
- Rung W, `f9fe5c874`: 666 (`AbstractMethodPartlyDefinedWalk`, promoted from `XXXAbstractMethodPartlyDefinedWalk`; `ledger.py` took its `.test` file as the reproducer); 668 (`SeededRandomGenAbstractMethods`); 669 (`AnyGenPerturbOtherType`). The records' close notes name the branch's commits (`fb6ce967e`, `8673192c2`, `e26f13335`); the closes name `f9fe5c874`, the rung's commit on `main`.
- Rung S: none. Rows that stay open with a note, as the batch record lists them: 695 (S's note refused, below), 680 (L), 697, 698 and 699 (P; 697 has no room), 693 (P), 665 (W's note refused, below).

## Each rung

### L (`rung-library-followups`), landed first as `604d0e23c`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `9b377a5a1` wrote the worker's `REPORT.md` and `record.md` from the journal, the harness having refused the worker's write; no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections, none contested: `9b377a5a1` (`REPORT.md` and `record.md` from the journal); `79fb25581` (`ProjectFortress/tests/IntMapSymdiffManyEntry.fss`: the repair also reaches two many-entry maps); `6f3b9db5f` (row 704, `NodeIM`'s `UPLUS` with a singleton, and `ProjectFortress/tests/IntMapUplusSingleton.fss` pinning today's value); `2f32617db` (the record's and the report's texts on the many-entry maps; row 703's claim, "`BottomType` or a pair holding it"). No ruling.

**Folded.** F-220 ("Under walk, `__bigOperator`'s local `body` cannot be typed `I` ...") at the end of "The checker and the one library". Rows 703 and 704. Notes on rows 680, 678 and 639; those on 577 and 488 refused (below). Rows 671 and 679 closed in `b2b68d7fc`. Its items for the curator in `PLAN.md` (below).

**Corrections.** None owed: the skeptic left none, and the report lists no sentence of the specification made false (`REPORT.md` section 10).

### A (`rung-argument-context`), landed second as `0856f3e6a`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. No repair round; the gather wrote no file from the journal.

**Skeptic's fixes**, none contested: `273f8e5b3` (defect: a call that writes its static arguments was left out of a generic enclosing declaration's instantiation; `writesStaticArgs`, `Functionals.scala:910-924`, used at `:867`); `641ccf235` (correction: `InferCallArgumentKeepsFit.test:5` pinned row 412's `Object` bound; `InferCallArgumentMultifix` added for the multifix choice the retry changes); `07f8b31bc` (correction: the "never passed over" guarantee and the context's scope in `Specification/basic/inference.tex`, the row-425 boxes in `inference.tex`, `Specification/basic/expressions/reductions.tex:38-44` and `Specification/appendices/changes.tex:1056-1060`, and the entry's dates and lines); `1ef4ad330` (correction: `record.md`'s FACTS hand-over, row 705's notes, the handover, citations). No ruling.

**Folded.** F-221 ("The compiled checker gives a call written as another call's argument the parameter type of each declaration ...") at the end of "The checker and the one library"; F-55, F-56 and F-87 rewritten in place (the retry at another call's argument is built; F-87's title and its gate list), earlier texts in `FACTS-history.md`, as the skeptic's `leftForGather` asks. Row 705. The note on row 510; those on 535, 425, 642 and 577 refused (below). Row 455 closed with its note. Its items for the curator in `PLAN.md`.

**Corrections.** The skeptic's three `leftForGather` items: `changes.tex`'s `row~NEW-A-1` is `row~705`; the ledger writes as above; F-87, F-55 and F-56 rewritten. The three sentences `REPORT.md` section 7 lists as made false were corrected on the branch by `07f8b31bc`, and read so on `main` (`inference.tex:345-352`, `reductions.tex:38-44`, `changes.tex:1056-1060`).

### P (`rung-popl-examples`), landed third as `3ba2d005f`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. No repair round; the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections, none contested: `a5c12ab57` (the Effect of "Overloading with static parameters" said the checker refuses every pair whose parameter types are each a subtype of the other, which it does only at one self position; row 707 and `compiler_tests/XXXNoDuplicatesRuleSelfPositions`; and `REPORT.md`'s citations of P-25, the way-back sentence, two line numbers and FACTS F-146 and F-176); `1f9942c85` (`Specification/appendices/future.tex:259-261`, a sibling of row 696 in the same commit `576b4c287`, restated, and the entry's Change naming the box). No ruling.

**Folded.** F-222 ("Walk computes a power in a size exactly, and refuses a negative exponent.") at the end of "Landed semantics" and F-223 ("The specification's No Duplicates Rule is the type group's non-strict rule ...") at the end of "The specification and the repository's lineage"; F-146 and F-176 rewritten in place (walk no longer stops on a power), as the skeptic's `leftForGather` asks. Rows 706 and 707. Notes on rows 373, 537, 675, 693, 698, 699 and 549, all written; rows 444 and 697 have no room (P.worker.1's entry). Rows 676 and 696 closed. Its items for the curator in `PLAN.md`.

**Corrections.** The skeptic's two `leftForGather` items: row 707 numbered and `changes.tex`'s `row~NEW-P-2` made `row~707`; F-146 and F-176 rewritten. Its third part, the skill's `references/revival-changes.md:114`, "Walk computes a sum, a difference and a product, and stops on a power (ledger row 676).", is skill text, which the batch does not write: it is listed for the skill writer under P's revival change below. `REPORT.md` section 7's specification sentences, `constant.tex:15-17` and the Effect of "When two sizes are the same", were corrected by the rung (`98e8ff979`).

### W (`rung-walk-coverage`), landed fourth as `f9fe5c874`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. No repair round; the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections, none contested: `9897bcd53` (the citation of the checker's reading of a `comprises` clause, `TypeAnalyzer.scala:159-164`); `dcf284277` (walk's unsettled search, a departure without a row: `tests/XXXAbstractMethodCoverUnsettledWalk`, row 708, the FACTS line and the Effect's sentence; behaviour unchanged); `323a852af` (the checker's refusal of a two-parameter cover: `compiler_tests/XXXAbstractMethodCoveredPairs`, row 709, the FACTS line and the Effect's sentence; the checker not repaired). No ruling.

**Folded.** F-224 ("Walk counts an inherited abstract method as defined when the object's bodies of its name ... together cover the abstract parameter types ...") at the end of "Landed semantics", its sub-bullets joined into one line; F-145 rewritten in place (the narrower-body allowance replaced by coverage, rows 668 and 669 fixed), its source note gaining W's report. Rows 708 and 709. The notes on rows 665 and 670 refused (below). Rows 666, 668 and 669 closed. Its items for the curator in `PLAN.md`.

**Corrections.** The skeptic's `leftForGather`: rows 708 and 709 numbered and written into the Effect of `revival-covering` in place of "a row of the revival's gap ledger" (`Specification/appendices/changes.tex:2879-2887` on `main`). `REPORT.md` section 9 lists no specification sentence left false; its skill sentences (`references/interpreter.md`, "What walk checks"; `references/revival-changes.md`, "An abstract method without a body, and an `override` that overrides nothing, under walk") are listed for the skill writer below.

### S (`rung-self-type`), landed last as `1c32ccffd`

**From the branch.** `REPORT.md`, `SKEPTIC.md` and the decision record `decision-record.md` land; `record.md` was folded and does not. No repair round; the gather wrote no file from the journal.

**Skeptic's fixes**, none contested: `9a2cc93af` (correction: rule (a) for a trait whose clause lists only `...`, and rule (b) on a trait's self type, in `Specification/basic/expressions/var-ref.tex:70`, `Specification/basic/traits.tex:285-286`, `:298-300`, `changes.tex` and the decision record); `207eb7f06` (correction: row 695's note, the `VerifyError` only at an object type; rule (b)'s line on a trait as its self type); `63e507ba4` (correction: the api shape, `SelfTypeMixinApi`, `SelfTypeMixinImported`, `XXXSelfTypeMixinImportedWrong`); `37f02419d` (defect: `SelfParamDisambiguator.selfIndexOf` resolved another api's raw trait header in the importing unit's environment; `homeOf`, and `Disambiguator.java:145`, `:300` pass the global environment); `302aee6d6` (correction: the Appendix I entry's Effect and the record's FACTS entry and revival change on verification, and the record's test lists). No ruling.

**Folded.** F-225 ("The compiled checker reads a self-typed trait's `self` as the implementing type, from its F-bound, ...") at the end of "The checker and the one library". Row 710. The notes on rows 695, 407, 488 and 355 refused (below). No row closed. Its items for the curator in `PLAN.md`.

**Corrections.** None owed: the skeptic left none, and `REPORT.md` section 8 lists no sentence of the specification made false.

### Text mismatches

None found between one rung's specification text and another rung's code: S's and W's passages in `traits.tex` speak of the self type and of coverage, A's of the argument context, P's of duplicates and sizes, and each rung's compiled and walk tests passed together on the merged tree (above).

## Files written from the journal

None by the gather: every branch carried its `REPORT.md`, `record.md` and `SKEPTIC.md`, no `SKEPTIC.md` was only the word "committed", and no rung had a repair round. On the branches, L's skeptic wrote L's `REPORT.md` and `record.md` from the journal (`9b377a5a1`).

## The rungs that did not land

None: every rung of the batch was approved.

## Ledger notes not written

`ledger.py note` refuses a note that would take a row past 700 characters of notes or 1,200 of line, a row whose reproducer path is gone, and a closed row (`explorations/coordinator/tools/ledger.py:115`, `:778-793`). It refused 12 of the records' 23 notes (gather.2); the texts, in the records' words with the rows' numbers put in:

- Row 577 (L): "Batch 14 L, by row: the 3 classes moved are its 3 sites gone." Refused: notes 759 of 700.
- Row 488 (L): "Batch 14 L: BIG LEXICO(g) at :130 gone, untouched." Refused: notes 735 of 700.
- Row 535 (A), closed (`FIXED`): "climb batch 14 rung A's argument retry repairs the refusal its `XXX` test pinned: the test is now the plain `InferLoneUnionClosedTrait`, `k(pk0(Tri, Sq))` at `pk0[\Fig\]`, printing `BoxT[Fig]`." Its reproducer cell names `ProjectFortress/compiler_tests/XXXInferLoneUnionClosedTrait.fss`, which A renamed to `InferLoneUnionClosedTrait.fss`.
- Row 425 (A): "climb batch 14 rung A: with an expected type the big operator, a call written as `__bigOperator`'s argument, takes it where its bound's result does not fit: with the bound `Number`, `s: ZZ32 = BIG LAST[j <- lo#n] (3 j)` runs (`InferBigOperatorExpectedType`); an F-bounded one is still refused." Refused: row 1,489 of 1,200.
- Row 642 (A), `CONTESTED`: "beside it, item 48's other half: climb batch 14 rung A gives an argument of a call the parameter type (P-51); the chapter's list of contexts names both." Refused: its reproducer `XXXInferResultOnlyLabelBody.test` gone (batch 12's gather.2), row 1,207.
- Row 577 (A): "climb batch 14 rung A edits no library file; its distance per-site list equals the landed one by location and message, 85 to 85". Refused: notes 825 of 700.
- Row 665 (W): "Climb batch 14 rung W: rows 667 and 668 are fixed. So by reading, a check of each instance would no longer meet `IntMap`'s `genComb` or the distributed generator's `seedSize` and `reseed`. The check that such an instance would get now asks for coverage (fb6ce967e). Not measured at instances." (`fb6ce967e` is the branch's commit; on `main`, `f9fe5c874`.) Refused: row 1,382.
- Row 670 (W): "Under the coverage rule (fb6ce967e) the three objects are refused as before, each with no body of the method's name. Measured by a logging build over the 62 demos (climb batch 14 rung W, REPORT.md section 6)." Refused: row 1,290.

- Row 695 (S): Reproducer since climb batch 14 rung S: `compiler_tests/SelfTypeReturnSelfRunLink.test` (link, green) and `XXXSelfTypeReturnSelfRun.test` (run, expected failure: `REACHED`, then `VerifyError: Bad return type` in `XXXSelfTypeReturnSelfRun$\=Shape?XXXSelfTypeReturnSelfRun\%Pt?$DefaultTraitMethods.twin?0`). The checker accepts such a body since P-146 (rung S), so any compiled program that runs one meets the row, when the self parameter is instantiated at an object type: at a trait type the same body runs (rung S's skeptic: `trait Animal extends Shape[\Animal\]`, `object Cat extends { Animal, Shape[\Animal\] }`, `twin(Cat).tag` prints `cat`), since the JVM's verifier does not check a return of an interface type. Refused at the 700- and 1,200-character limits.
- Row 407 (S): Under P-146 (climb batch 14 rung S) the compiled checker reads a self type from an F-bound with no clause, so the self-typed traits need no `comprises T`; walk is untouched and this row stays open. Refused at the 700- and 1,200-character limits.
- Row 488 (S): On climb batch 14 rung S's tree the distance's `FortressLibrary.fss:130` site (`BIG LEXICO`'s body) is absent again (55 sites), read as this row's variation. Refused at the 700- and 1,200-character limits.
- Row 355 (S): Since climb batch 14 rung S the checker also refuses `:41` by the self-type rule: "PureList.fsi:41:27-38: PureList.List[\E\] extends Equality[\E\], whose self parameter is E, but PureList.List[\E\] is not a subtype of E." (the distance driver over `Library/PureList.fss`, `compile-ladder/rung-self-type/REPORT.md` section 6). Refused at the 700- and 1,200-character limits.

Three of these refusals left a row saying what the batch made untrue: row 425's claim says the checker refuses `BIG LAST[j <- lo#n] (3 j)` at the bound `Number`, which runs since rung A; row 665's notes say a check of each instance would refuse the distributed generator, whose row 668 is fixed; row 695's notes say the stock checker refuses such a body, which it accepts since rung S, and its claim does not bound the failure to an object-typed self parameter. The batch's merged-diff review wrote the short notes that fit: on row 695, "Reached since F-225, at an object-typed `S` only: `XXXSelfTypeReturnSelfRun`." (1,092 characters), and on row 665, "Rows 667 and 668 are fixed (668 by f9fe5c874): by reading, neither object meets such a check now." (1,187 characters). Row 425 is at 1,195 of 1,200 characters and no command edits an open row's claim, so its claim stands half false; F-221 holds the correction (review.1, in the entry gather.2 of `coordinator/PLAN.md`).

## Handover lines

The gather's brief asks for each rung's handover line in the first section of `explorations/microgpt-run-c-handover.md`, which was retired into `coordinator/PLAN.md` on 2026-10-12 (`explorations/microgpt-run-c-handover.md:7`, `cc3e59618`). The gather did not write there (gather.1); the lines, as each record gives them, with the rows' numbers put in. The hashes in them are the branches'; each rung's commit on `main` is in the table above.

**L.**

Climb batch 14 rung L repaired three library sites. Array2's offset (row 679) and each integer type's own numerator (P-146's thirtieth site) leave the distance, and IntMap's node SYMDIFF a singleton is right in both orders (row 671). It held `__bigOperator`'s `body(i)`, because walk refuses `body(i: I)` on an unwritten list or map comprehension, `I` being `BottomType` (row 703, review-queue item 17). On the rung's tree the count stays 1 at `body(i)` (`:1314`, 303 s), and the distance goes 85 to 82: two sites the rung's own, one row 488's variation (`:130`). `ant testSystem` is green with 582 tests.

**A.**

Rung A (rung-argument-context) landed P-51's argument retry in `impls/Functionals.scala` (`778ab8db1`). Row 455 closes with `InferCallArgumentContext`, and row 535's pin is now the plain `InferLoneUnionClosedTrait`. The retry also gives a reduction's big operator its expected type, half of row 425, gated by `InferBigOperatorExpectedType`; the three boxes on row 425 that REPORT.md's section 7 lists are corrected (SKEPTIC.md). A call that writes its static arguments instantiates a generic enclosing call (`InferCallArgumentWrittenStaticArgs`), and a multifix declaration that only operands typed again make applicable is now taken over the binary one (`InferCallArgumentMultifix`). The count stays at 1 and the distance at 85, with no site moved; walk's side is 705.

**P.**

Climb batch 14's rung P (`rung-popl-examples`, branch `wip/rung-popl-examples`):
- The POPL 2019 examples are tests on both paths: 15 walk and 12 compiled test programs. Green: A1, A3, A4 and A6's refusals; A5's and A10's dispatch; A-B2 under walk; B4 compiled. Expected failures gate rows 444, 697, 373, 693, 698, 699, 537 and the new row 706.
- Walk computes a power in a size and refuses a negative exponent (row 676 fixed, `NatArithPowerWalk`).
- The No Duplicates Rule is restated on the non-strict relation with its Appendix I entry (row 696 closed, `XXXNoDuplicatesRule.test`).
- testSystem: 594 tests, 0 failures. testQuick: compiler 1132, library 86, othercompiler 263, 0 failures.
- No count or distance was run: every changed path is exempt.

**W.**

Climb batch 14 rung W (`wip/rung-walk-coverage`; c8f43ea7e, 8673192c2, e26f13335, fb6ce967e, 068a183e6, b00f75310):
- Rows 668 and 669 are repaired in the library's way:
  - `Random`'s distributed generator delegates `seedSize` and `reseed`;
  - `MersenneTwisterInit`'s `perturbed` takes `Generator[\ZZ32\]`;
  - `AnyGen`'s `perturb` has `Gen`'s default.
- Walk's abstract-method check asks for coverage, with `comprises` clauses read (P-147). Row 666 is closed, with `XXXAbstractMethodPartlyDefinedWalk` promoted.
- The traits chapter's sentence is revised with a box, and Appendix I's coverage entry is amended.
- `ant testSystem` is green (584). The count stays 1 and the distance 85; no site moved.
- Nothing that the base loads is refused.

**S.**

Rung S landed the checker's self type (P-146, way 6, with the coordinator's mixin default on the review list): the 29 sites gone and `:130`, the distance 85 to 55 on its own tree, the count 1, no stall (FortressLibrary 847 s); the trips demo and `PureList` refused by the extender rule (row 710, row 355), the `Containment` mixins accepted; row 695's reproducer is in place for a code-generator rung.

## Points to report

None holds the push: every point below is reversible, and no step taken cannot be undone or acts against a decision on record. Where the worker and the skeptic listed one point twice, it is listed once, in the later wording. Lines are on the rung's tree, with `main`'s where a later hunk moved them.

Rung L:
- A walk test or a team test whose verdict changes, above all a reduction or comprehension refused at `body`'s parameter: with `body(i: I)` written, walk refuses `<| 2 k | k <- 0#3 |>` with '(i:BOTTOM)', and an unwritten map comprehension with '(i:(ZZ64,BOTTOM))'; the line was held, and no gated test's verdict changed (`ant testSystem`: 582 tests, 0 failures) (`explorations/compile-ladder/rung-library-followups/REPORT.md:44`, `:56`).
- The count's table after the edit: byte-equal to `explorations/compile-ladder/climb-batch-13b/gate/checker-count.txt`, `#total 1`, its error `Library/FortressLibrary.fss:1314:10` 'Missing parameter type for i', 303 s against the 900 s limit (13b's 387 s); `body` brings no site, being held (`REPORT.md:114-121`).
- The distance moved one site more than by reading: 'DISTANCE DOWN   85 -> 82 (-3)'; the third site gone is `FortressLibrary.fss:130` (`BIG LEXICO(g)`, class BR), untouched, row 488's variation (`REPORT.md:128-142`).
- Each repair's precedent line, and no api declaration beyond the four numerator lines: `Library/FortressLibrary.fss:2241-2245` (Array1's offset) and `:2933-2940` (Array3's), `Library/FortressLibrary.fsi:675` (`ZZ`'s numerator), `Library/IntMap.fss:361-363` (`SingletonIM`'s `SYMDIFF`); the api lines `Library/FortressLibrary.fsi:527`, `:580`, `:638` and `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:170`.
- The pins changed in the revival's `ProjectFortress/tests/IntMapSymdiffSingleton.fss` (`9ba86f7da`): `:12` from `{2 |-> 2, 5 |-> 5}` ("today's value") to `{0,1,2,5}`; `:13` from `|three SYMDIFF one| = 0` to `three SYMDIFF one = {0 |-> 0, 2 |-> 2}`.
- A site whose only repair is a checker or walk edit: `body(i)` at `Library/FortressLibrary.fss:1314`, whose typed form waits on walk's instance of `I` (`explorations/coordinator/review-queue.md:131-136`, item 17); no checker or walk edit was made.

Rung A:
- Normative text changed beyond the list of contexts, its item and the Appendix I entry: the new paragraph after the instance's rule, `Specification/basic/inference.tex:191-222`, the worker's, its guarantee sentence and scope wording rewritten by the skeptic.
- The probe's forks 2, 4 and 5 as built: fork 2, a generic enclosing declaration instantiated from the arguments not retried and the call's expected type; fork 4, a tie refused with today's not-applicable message; fork 5, an argument that writes its static arguments retried to the same type, and, after the skeptic's fix, instantiating the enclosing declaration (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:863-874`, `:892-895`, `:879`, `:903-924`; `ProjectFortress/compiler_tests/XXXInferCallArgumentControls.fss:17`).
- A departure from the probe's patch: the skeptic's `writesStaticArgs` counts a call that writes its static arguments among the arguments that instantiate a generic enclosing declaration, since P-51 retries only calls with inferred static arguments and fork 5 is "to no effect" (`Functionals.scala:867`, `:910-924`; `ProjectFortress/compiler_tests/InferCallArgumentWrittenStaticArgs.fss:14-15`).
- A call whose chosen declaration changes: a reduction's big operator takes the reduction's expected type where the instance at its bound does not fit, `s: ZZ32 = BIG LAST[j <- lo#n] (3 j)` refused on the old code and running now (`ProjectFortress/compiler_tests/InferBigOperatorExpectedType.fss:30`; `old-fortress.sh ... junit .../InferBigOperatorExpectedType.test` -> 'Tests run: 3,  Failures: 3').
- A call whose chosen declaration changes: a program accepted before now runs a multifix declaration in place of the binary one, the multifix declaration accepting operands only typed again (`ProjectFortress/compiler_tests/InferCallArgumentMultifix.fss:11`; old code 'mk() OPLUS mk() OPLUS mk() -> binary'; `junit.sh skfix` -> 'OK (31 tests)').
- A path the section does not give the rung: the skeptic corrected the row-425 box in `Specification/basic/expressions/reductions.tex:38-44` and the Rationale of the entry "Reductions whose element type nothing fixes", `Specification/appendices/changes.tex:1056-1060`.

Rung P:
- Each row filed and each note written, and row R4: R4 filed as row 706; notes on rows 373, 537, 675, 693, 698 and 699, and the skeptic's on row 549, all written; rows 676 and 696 closed; rows 444 and 697 have no room for a note; the skeptic added row 707 (`ledger.py check --rows ...` "0 fail the template").
- A power in a size whose value or refusal differs between walk and the compiled path: the class loader makes `2^32` (row 675) and stops on `2^e` at `e = -1` or `e = 5000` with `NumberFormatException`, where walk refuses each with a message; and, the skeptic's, `IBox[\2^31\]` from static parameters ('Not in range for ZZ32: 2147483648' compiled, refused at binding under walk), `1^(0 - 1)` (refused under walk, `NumberFormatException` at class load) and `Box[\(0 - 2)^3\]` (refused on both paths with different messages); every computed value agrees.
- Normative text changed beyond the No Duplicates Rule and its entry, and each sentence on walk's power in a size corrected: `Specification/basic/expressions/constant.tex:15-17` and the Effect of "When two sizes are the same" (P's `changes.tex:3322-3324`, `:3475-3477` on `main`), the worker's; the Effect of "Overloading with static parameters" (P's `:2405-2414`, `:2497-2506` on `main`) and the box at `Specification/appendices/future.tex:259-261`, a file outside the section's list, the skeptic's.

Rung W:
- Each library repair's precedent line, and each team declaration changed with its api line: `SeededRandomGenWithDistribution`'s `seedSize`, `Library/Random.fss:179`, api `Library/Random.fsi:163`, precedent the proxy's getters `Library/Random.fss:175-178`; its `reseed`, `:181-182`, api `:165`, precedents `:186-187` and `:236`, comment `:92-97`; `MersenneTwisterInit`'s `perturbed`, `:345`, api `Library/Random.fsi:242`, precedents `Library/Random.fss:241`, `:315`; `AnyGen`'s `perturb`, `Library/QuickCheck.fss:82` (no longer abstract), api `Library/QuickCheck.fsi:60`, precedent `Gen`'s default `Library/QuickCheck.fss:119`.
- What the coverage check does where its search does not settle, each type it could not decide, and a walk value that changes in a test importing `Random` or `QuickCheck`: it does not refuse (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:501-503`, `:514`, `:517`); the logging build over the suite, the 62 demos and 32 specification examples met no unsettled search; the skeptic measured one, `(D, D, D, D, D)` with `D` comprising six objects, 7,776 combinations past `OVERLAP_PARTS` (`ProjectFortress/tests/XXXAbstractMethodCoverUnsettledWalk.fss`, row 708); no walk value changed in the seven importers (`ant testSystem`, 584, "BUILD SUCCESSFUL").
- A path outside the rung's section, touched by a skeptic's correction: the compiled expected failure `ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairs.fss` and `.test` (`323a852af`), row 709.

Rung S:
- A site gone beyond the 29: `FortressLibrary.fss:130` (per-site list row 76, class BR, row 488's site); no site came; `:688` respelled under OT ('class BR 4 -> 3 (-1)', 'class OT 16 -> 17 (+1)'; by row, 31 gone and 1 come against `explorations/compile-ladder/gate/distance-sites.tsv`).
- The distance stage's `FortressLibrary` time against 13b's 1,318 s: 847 s, the stage 1,552 s against 2,246 s, no stall ('#seconds 1552 FortressLibrary 847'; `explorations/compile-ladder/climb-batch-13b/gate/distance.txt:30`).
- An extender that rule (b) refuses: the trips demo's object (`ProjectFortress/demos/trips.fss:97-98`, row 710) and `PureList`'s `List` (`Library/PureList.fsi:41`, row 355), which the widened reading accepts neither; the `Containment` mixins and their extenders accepted ('Containment errors=0', `Library/Containment.fss:42`, `:57`, `:66`; `Library/Relation.fsi:17`).
- The patch changed from the judgement's, with the reason: `selfParam` widened by the coordinator's default, reading the bound's trait through the name environment, its own-name test accepting an api-qualified name; after the skeptic's fix the pass takes the global environment, so a raw trait of another api is resolved in that api's own names; `FunctionalMethod.java` unchanged from the patch (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:109-212`; `ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java:145`, `:300`).
- A library, walk or code-generator edit, or a walk test whose verdict changes: the disambiguation phase, which walk shares, edited by the worker and again by the skeptic's fix; no walk verdict moved (`ant testSystem` on `302aee6d6`'s code: 'Tests run: 146', '149', '141', '144', each 'Failures: 0, Errors: 0', 'BUILD SUCCESSFUL').

## Items for the curator, and where each is in `PLAN.md`

Under "Pavol's answers, in the order they are needed", in the new group "Before `__bigOperator`'s `body(i)` is typed, raised by climb batch 14":
- L.worker.1, L.skeptic.1: item 53, new ("L.worker.1 and L.skeptic.1 of climb batch 14's rung L: typing `__bigOperator`'s local `body(i)` ...").

Under "Off the path, parked", in the new subsection "Climb batch 14, listed for his review", one entry each, opening with the ids it holds:
- L.worker.2, L.skeptic.2: "L.worker.2 and L.skeptic.2 of climb batch 14's rung L: row 703 records walk's refusal ...".
- L.skeptic.3: "L.skeptic.3 of climb batch 14's rung L: should a later rung repair row 704? ...".
- A.worker.1, A.skeptic.1: "A.worker.1 and A.skeptic.1 of climb batch 14's rung A: P-51's retry reaches a reduction's big operator ...".
- A.worker.2, A.skeptic.2: "A.worker.2 and A.skeptic.2 of climb batch 14's rung A: the argument retry's forks 2, 4 and 5 ...".
- A.worker.3, A.skeptic.4: "A.worker.3 and A.skeptic.4 of climb batch 14's rung A: walk gives a call written as another call's argument no expected type (row 705) ...".
- A.skeptic.3: "A.skeptic.3 of climb batch 14's rung A: should the argument context reach a call without static arguments? ...".
- P.worker.1, P.skeptic.1: "P.worker.1 and P.skeptic.1 of climb batch 14's rung P, beside climb batch 11's gather.1 and climb batch 12's gather.2 above ...".
- P.worker.2, P.skeptic.2: "P.worker.2 and P.skeptic.2 of climb batch 14's rung P, for his sight only: is a power in a size at a negative exponent refused ...".
- W.skeptic.1: "W.skeptic.1 of climb batch 14's rung W: should walk's abstract-method check refuse where its coverage search does not settle ...".
- W.worker.1, W.skeptic.2: "W.worker.1 and W.skeptic.2 of climb batch 14's rung W: measure and record the element-type slip of `Random`'s two proxies? ...".
- S.worker.1, S.skeptic.1: "S.worker.1 and S.skeptic.1 of climb batch 14's rung S: the coordinator's default under P-146 ...".
- gather.1 (the handover's retired first section, `climb-batch-workflow.js:1211`, `:1215`): "gather.1, from climb batch 14's gather: the gather's brief still asks for each rung's handover line ...".

Under "Off the path, parked", "Climb batch 12, listed for his review":
- gather.2 (the notes `ledger.py` refused, and row 535's renamed reproducer): the existing entry "gather.2, from climb batch 12's gather, beside climb batch 11's gather.1 above (the gap ledger's tool has no route for some writes) ...", a sentence added.

The decisions on record built here and the coordinator's default are the batch record's (`coordinator/CLIMB-BATCH-14.md` section 2); item 51 (P-147), item 47's local refusal and item 48 (b) (P-51) keep their entries under "Pavol's answers" as they stand, for the coordinator's routing.

## Revival changes, for the skill writer

Each landed rung's "Revival change" section, both its parts word for word, in the order the rungs landed. Where a line it cites moved on `main`, the line on `main` follows the copy; then the skill sentences the rung's report lists as made false, which the batch does not edit.

### L (`rung-library-followups`, `604d0e23c`)

#### The change

The team's library: `NodeIM`'s `opr SYMDIFF(self, other: SingletonIM[\Val\]): IntMap[\Val\] = self.seek(other.key) SYMDIFF other` (`Library/IntMap.fss:544-545` at a874948ac) kept of the many-entry map only the entry `seek` finds. So under walk `{0,1,2} SYMDIFF {5}` was `{2,5}` and `{0,1,2} SYMDIFF {1}` was empty, while the reverse orders gave `{0,1,2,5}` and `{0,2}`. A `SYMDIFF` of two many-entry maps whose `nodeNode` split reached a many-entry and a one-entry map lost entries the same way: keys 2 to 7 `SYMDIFF` keys 0, 3, ..., 15 held 4 entries, the reverse order the right 8.

The tree now: the many-entry map is updated at the one-entry map's key (`Library/IntMap.fss:570-572`). The key is dropped if the many-entry map holds it, and given the one-entry map's value if not. Both orders give `{0,1,2,5}` and `{0,2}`, and `ProjectFortress/tests/IntMapSymdiffSingleton.fss` asserts both orders; both orders of the two many-entry maps give 8 entries, which `ProjectFortress/tests/IntMapSymdiffManyEntry.fss` asserts.

The reason: the library's own comment on the operator, "%SYMDIFF% returns the key/value mappings contained in exactly one input map." (`Library/IntMap.fss:568`, as at `:93` and `:360`). The one-entry map's own `SYMDIFF` (`:361-363`) already answers so in the other order. The replaced line had the shape of `INTERSECTION`'s (`:542`), where keeping one entry is right.

The tree's other two edits change no value. Array2's `offset` answers the same pair or fails the same way, and each integer type's `numerator` gives the same `ZZ` (`ProjectFortress/tests/NumeratorPerType.fss`).

#### Provenance

Row 671, repaired in the library's own spelling (P-27, "The library's own practice is the standard"); no question or item; climb batch 14.

### A (`rung-argument-context`, `0856f3e6a`)

**The change.** The team's compiled checker typed every argument of a call without an expected type before it tried the call's declarations (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:95-96` and `:437` at `a874948ac`, `partitionArgs` through `checkExprIfCheckable`). So a static argument of a call written as an argument took its bound when only its result mentions it, and the numeral's type when only a numeral fixes it, and the enclosing call was refused. For example, `takesBox64(mk())` with `mk[\T\](): BoxT[\T\]` and `takesBox64(b: BoxT[\ZZ64\])` gave "BoxT[\ZZ64\]->String is not applicable to an argument of type BoxT[\Object\]." Now, where the enclosing call is not accepted with its arguments so typed, the checker types each argument that is itself a call with static arguments again, once per declaration, with that declaration's parameter type as the expected type. It then invokes the most specific declaration so made applicable, and a declaration that accepts the call as written is never passed over (`Functionals.scala:739-742`, `:850-924`; tests `ProjectFortress/compiler_tests/InferCallArgumentContext`, `InferCallArgumentOverloaded`, `InferCallArgumentGeneric`, `InferCallArgumentForms`, `InferCallArgumentKeepsFit`, `InferCallArgumentWrittenStaticArgs`, `InferCallArgumentMultifix`). The inference chapter lists the context (`Specification/basic/inference.tex:148-154`, `:191-215`). A reduction's big operator, a call the desugaring writes as an argument, therefore takes the reduction's expected type where its instance at the bound does not fit it (`ProjectFortress/compiler_tests/InferBigOperatorExpectedType`). Walk is unchanged and gives the argument no expected type (`ProjectFortress/tests/XXXInferCallArgumentWalk.fss`). The reason is the specification: an identifier reference's static arguments "are statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:38-40`), and the context of a call written as an argument is the parameter it is passed to. The checker's refusal above is the measured failure.

**Provenance.** Item 48 (b), answered wide (P-51), with the order of the checker's attempts (P-49); measured first by the probe `explorations/reviews/argument-context-probe.md`; built in climb batch 14, rung A.

### P (`rung-popl-examples`, `3ba2d005f`)

**The change.**
- **What the team's source does.** The team's walk computed a sum, a difference and a product in a size, in wrapping longs, and stopped on any other operator with an internal error, "EvalType: ... is not yet implemented." (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:457-464` at `a874948ac`). So `Box[\2^3\]` stopped the program.
- **What the tree now does.** Walk computes a power in a size exactly (`EvalType.java:475-484`), as the compiled path does (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1212-1222`):
  - `Box[\2^3\]` is `Box[\8\]`, an exponent of 0 gives 1, and a power of 0, 1 or -1 is computed at any exponent (`ProjectFortress/tests/NatArithPowerWalk.fss`);
  - a power at a negative exponent, which only a static parameter can give, is refused: "Static argument 2^e has the negative exponent -1, and a power in a size takes an exponent of 0 or above" (`ProjectFortress/tests/NatPowerNegativeExponentWalk.fss`);
  - a power beyond its parameter's kind is refused as a sum is, at binding or when it overflows a long (`NatPowerOutOfRangeWalk.fss`, `NatPowerOverflowWalk.fss`).
- **The reason.**
  - The grammar gives a power of a size, `IntExpr ^ IntVal` (`Specification/appendices/grammars/concrete-syntax.tex:546`).
  - The text says "Given instantiations of all static parameters ... in scope of a static expression, the value of the static expression can be determined statically" (`Specification/basic/expressions/constant.tex:26-29`).
  - A `nat` or `int` parameter takes an `NN32` or a `ZZ32` value (`Specification/basic/trait-parameters.tex:98-105`), which a power at a negative exponent of a base other than 1 and -1 is not.
  - The compiled path computes the same powers, and no negative one (`Naming.java:1216`).

The restated No Duplicates Rule makes no such difference. It brings the revival's own text into agreement with the type group's papers (`Papers/Types/rules.tick:158-162`; POPL 2019, Fig. 5) and with the compiled checker (`OverloadingChecker.scala:439-446`); the Working Draft had no such rule.

**Provenance.** Ledger row 676, "under walk, a power in a size stops the program", whose fix the row names: "a fourth case, an exact power with the same out-of-range refusal". The refusal of every negative exponent is the rung's choice where the specification is silent, following the compiled path's `sizeOp`, and is put to the curator. Climb batch 14, rung P.

*For the skill writer.* Skill sentence made false (`compile-ladder/rung-popl-examples/REPORT.md` section 7; P's skeptic's `leftForGather`): `.claude/skills/fortress-repo/references/revival-changes.md:114`, "Arithmetic in a size": "Walk computes a sum, a difference and a product, and stops on a power (ledger row 676)."

### W (`rung-walk-coverage`, `f9fe5c874`)

**The change.**
- **The team's sources.**
  - The traits chapter of the Working Draft asks that "any object inheriting an abstract method must define a body expression for the method" (`Specification-1.0-frozen/basic/traits.tex:510-512`). To the letter, that is a body at the abstract method's own parameter type.
  - The team's walk made no such check: `checkForDef` returned for every declaration (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:399-404` at `a874948ac`).
  - The team's compiled checker refuses an object unless each inherited abstract method's parameter type is a subtype of the union of those of the concrete methods below it, reading `comprises` clauses (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:96-118`; `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:159-164`).
  - The team's library left three abstract methods uncovered:
    - `Random`'s `SeededRandomGenWithDistribution` had no `seedSize` or `reseed`;
    - `MersenneTwisterInit` defined `perturbed` only at `Indexed[\ZZ32,ZZ32\]`, under the abstract one at `Generator[\ZZ32\]`;
    - `QuickCheck`'s `AnyGen` declared `perturb(obj: Any, g)` abstract, while every generator defines it only at its element type.
- **What the tree now does.**
  - The traits chapter says that the object defines the method by a definition at its parameter type, or by definitions at narrower parameter types that together cover it (`Specification/basic/traits.tex:579-600`).
  - Walk refuses at load an object without static parameters whose narrower bodies do not cover an inherited abstract method. `tests/AbstractMethodPartlyDefinedWalk` and `tests/AbstractMethodNotCoveredWalk` show it.
  - Walk loads an object whose bodies cover the method through a `comprises` clause, as `tests/AbstractMethodCoveredWalk`, `tests/PairsRunRangesWalk` and the team's `tests/FileConversion` show.
  - Where its search through the clauses does not settle, it does not refuse.
  - Each of the three library sites defines its method:
    - the distributed generator delegates `seedSize` and `reseed`, returning itself;
    - `MersenneTwisterInit`'s `perturbed` takes `Generator[\ZZ32\]`;
    - `AnyGen`'s `perturb` returns the generator it is given, as `Gen`'s default does.

    `tests/SeededRandomGenAbstractMethods` and `tests/AnyGenPerturbOtherType` show it.
  - Walk still checks no object with static parameters.
- **The reason.**
  - It is the type group's rule of 2012: the compiled checker above, and Welterweight Fortress's Covered rule. Welterweight says that "the same rules are used to check methods as well as functions", and that the domain of an abstract function "must be a subtype of the union of the domains of the concrete definitions" (`Papers/Welterweight/static.tick:27-47`).
  - The chapter's own sentence on functional methods points to abstract function declarations, which ask that the concrete declarations "together cover" the abstract one's type (`Specification/basic/functions.tex:386-395`, `:431-434`).
  - The team's `Pairs` (`Library/Pairs.fss:78-99`) and `FileConversion` (`ProjectFortress/tests/FileConversion.fss:65-82`) define abstract methods by such covering bodies, and the letter would refuse them.
  - Under the earlier allowance of any one narrower body, a call outside that body stopped walk at run time with "has neither body nor def". This was measured on the base at the three library sites: `seedSize` of a distributed generator, `perturbed` by a filtered range, and `perturb` of a `String` through `genZZ32`.

**Provenance.**
- Item 51, decided as P-147 (coverage defines an inherited abstract method), the curator's answer of 13 October 2026.
- Climb batch 14, rung W. It closes rows 666, 668 and 669.
- It amends the part's entry "An abstract method without a body, and an `override` that overrides nothing, under walk":
  - Its Resolution's allowance, "A declaration with a body of the method's name, whose parameter types are the abstract declaration's or below them, counts as defining the abstract method (ledger row 666). This allowance departs from the chapter ...", gives way to the coverage rule.
  - Its Reason's sentences on `Pairs`, `QuickCheck` and `MersenneTwisterInit` give way to the reason above.
- The skill's `references/interpreter.md`, "What walk checks", needs the same change in its abstract-method bullet, and in "leaves an inherited abstract method without a body at or below its parameter types".

*Lines on `main`.* On `main`: `Specification/basic/traits.tex:579-600` is `:627-648` (S's lines above it).

*For the skill writer.* Skill sentences made false (`compile-ladder/rung-walk-coverage/REPORT.md` section 9): `.claude/skills/fortress-repo/references/interpreter.md`, "What walk checks": "an object or object expression without static parameters that inherits an abstract method and provides no declaration with a body of its name at or below its parameter types", and "leaves an inherited abstract method without a body at or below its parameter types"; `.claude/skills/fortress-repo/references/revival-changes.md`, the entry "An abstract method without a body, and an `override` that overrides nothing, under walk": its Resolution's sentences from "A declaration with a body of the method's name ..." to "(ledger rows 668 and 669)", and its Reason's sentences on `Pairs`, `QuickCheck` and `MersenneTwisterInit`.

### S (`rung-self-type`, `1c32ccffd`)

#### The change

- The team's sources: the specification typed `self` as the type of the enclosing trait, and as its intersection with the listed types only under a `comprises` clause (`Specification-1.0-frozen/basic/expressions/var-ref.tex:53-54`, `:63-69`); the team's compiled checker built the self type the same way (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:68-71` before this change), so it refused the library's default bodies that return or pass `self` where the trait's own parameter is declared, as `floor(self):I = self` in `trait Integral[\I extends Integral[\I\]\]` (`Library/FortressLibrary.fss:691`), "Function body has type Integral[\I\], but declared return type is I."; walk ran them, having no static types. Nothing checked that a type extending such a trait is an instance of its argument: `object Bad extends Shape[\Pt\]` compiled.
- What the tree now does: in a trait with no `comprises` clause whose type parameter `X` is bounded by the trait itself at its own parameters, or by a self-typed trait that it extends at `X`, the compiled checker types `self` in the method bodies as `C[\X\] & X`, keeps `C[\X\]` in the signatures, and refuses a trait or object declaration or an object expression that extends `C[\A\]` without being an `A`, a trait standing as the type of `self` in its bodies ("D extends C[\A\], whose self parameter is A, but D is not a subtype of A."); an object never has such a parameter. Tests: `ProjectFortress/compiler_tests/SelfTypeFromBound`, `SelfTypeMixinBound`, `SelfTypeExtenderThroughOwn`, `XXXSelfTypeExtenderWrong`, `XXXSelfTypeObjectExprWrong`, `XXXSelfTypeMixinExtenderWrong`, `XXXSelfTypeMixinObject`, and through an api `SelfTypeMixinApi`, `SelfTypeMixinImported`, `XXXSelfTypeMixinImportedWrong`. The specification says so (`Specification/basic/expressions/var-ref.tex:70-90`, `Specification/basic/traits.tex:285-326`, `:599-603`, Appendix I `revival-self-type`). Walk is unchanged; a compiled body returning `self` still fails verification at class load when the parameter is instantiated at an object type.
- The reason, as evidence: the checker's refusal of 29 of the library's bodies, the team's minimal complete definitions of its orders, algebra and arrays (`Library/FortressLibrary.fss:226-293`, `:360`, `:363`, `:691-724`, `:2182-2194`), all accepted after with no new refusal in the library; Scala's rule that a class's self type must conform to the self types of the classes it inherits (*Scala Language Specification 2.13*, section 5.1); Naden's "a separate construct which cannot be used as a first class type, but instead only in bounds" (`Papers/Types/journal/justificationOfRTR.tex:626-630`). The signatures stay plain because the 2019 account of overloading (Park, Hong, Steele and Ryu) assumes declared types with no type parameter inside an intersection (pp. 11:21-22) and compares declared domains in its Return Type Rule (p. 11:13): with the intersection in the signatures the checker reported 18 errors of the Return Type Rule between the `CMP` declarations of `StandardPartialOrder` and `StandardTotalOrder` that the declarations do not make. The second form of the parameter keeps the team's 2009 mixins `ContainmentBySubset` and `ContainmentByComparison` (`Library/Containment.fsi:22-30`) valid as written.

#### Provenance

Batch 14's question QS, answered by P-146 ("The checker reads `self` in a self-typed trait's method bodies as the implementing type (way 6)."), from `explorations/reviews/self-typed-bodies-judgement.md`, section 4; the second form of the self parameter is the coordinator's default under P-146, on the review list (`explorations/coordinator/CLIMB-BATCH-14.md:86`); built by climb batch 14's rung S.

*Lines on `main`.* On `main`: `Library/FortressLibrary.fss:2182-2194` is `:2185-2197` (L's lines above it); its other lines stand.

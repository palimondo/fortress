# Climb batch 15: the gather's record

Written at the gather stage of climb batch 15 (2026-10-14), the run of `explorations/coordinator/CLIMB-BATCH-15.md` (rungs B, C, L and O), on `main` from the base `ee1aa1a95524ad9c3952462f665632deff844bbb`. `main` was at `6a3e20783` when the gather began, sixteen coordinator commits above the base, which touch only `.claude/skills/coordinator/`, `explorations/coordinator/` (`BOOT.md`, `FACTS.md`, `FACTS-history.md`, `HELD.md`, `INDEX.md`, `process-engineering/plan-map.md`) and `explorations/reviews/astra-record-keeping-review.md`, no file a rung touches (`git diff --stat ee1aa1a95 6a3e20783`). All four rungs were approved, none after a judge's ruling and none with a repair round, and each landed as one commit composed from its branch's net change; no branch is a parent of anything on `main`, and each branch stays as it is.

**Preconditions.** `git status --porcelain` was empty, and `ee1aa1a95` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0).

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff ee1aa1a95...<branch>`. One tree was seeded outside the main tree from the batch's base build, with `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base15 /home/user/fortress-gather15 - ee1aa1a95524ad9c3952462f665632deff844bbb` ("seeded from /home/user/fortress-base15 (ee1aa1a95) in 3 s"); nothing was built or run in the main tree or in the base build. In `/home/user/fortress-gather15` the four patches were applied in the order below with `git apply --3way --index` (no conflict), then `ant compileAll` ("Caches /home/user/fortress-gather15/default_repository/caches started again, empty", "BUILD SUCCESSFUL", "Total time: 51 seconds") and the library order (five compiles, each `rc=0`, five jars). The closing tests ran there. After the closes, `git diff --cached --stat 59b1d0a4d -- ProjectFortress Library build.xml` in that tree printed only `Library/FortressLibrary.fss | 4 ++--`, the gather's respelling of `additiveIdentity`'s doc comment on the same lines (rung L, below); so the code and tests the tests ran on are `59b1d0a4d`'s but for a comment. In `Specification/` the two trees differ only by the row numbers the gather put in place of the placeholders.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | C, `rung-checker-bounds` | `wip/rung-checker-bounds` at `7d388760b` | `f237148ac` |
| 2 | B, `rung-walk-elements` | `wip/rung-walk-elements` at `193199afe` | `20474c144` |
| 3 | L, `rung-library-factories` | `wip/rung-library-factories` at `496ba5615` | `a0f839ad7` |
| 4 | O, `rung-duplicates-coverage` | `wip/rung-duplicates-coverage` at `93f579495` | `59b1d0a4d` |
| | the rows' closes | | `32af87b18` |

## The order the rungs were applied in

C, then B, then L, then O, read from `git diff -U0 ee1aa1a95...<branch>`.
- The shared files are three: `Library/FortressLibrary.fss` (B and L), `Library/IntMap.fss` (B and L) and `Specification/appendices/changes.tex` (B, L and O). C shares no file with any rung: its checker file, `TypeAnalyzer.scala`, and its tests are its own.
- The lowest edited line of each rung in those files, on the base: B `FortressLibrary.fss:1314`, `IntMap.fss:732`, `changes.tex:1032`; L `FortressLibrary.fss:2451`, `IntMap.fss:520`, `changes.tex:2401`; O `changes.tex:2500`.
- File by file, `FortressLibrary.fss` gives B before L, `changes.tex` gives B, L, O, and `IntMap.fss` gives L before B. Taken as one number per rung, the rule gives L (`:520`), B (`:732`), O (`:2500`).
- The gather took B, L, O, the order of the two files that both B and L shift. The rule's purpose is that a later hunk not shift what a landed record cites. B's 121 net lines at `FortressLibrary.fss:1318` and its 112 net lines in `changes.tex` from `:1033` would move every line of L's array factories and of L's and O's `changes.tex` entries if they landed later; under the order taken no hunk lands above an earlier rung's line in those two files but one: O's Effect sentences on row 707, 5 net lines at O's `changes.tex:2500`, land above L's Original text in the same entry, `:2567-2571` on L's tree, `:2684-2688` on `main` (the merged-diff review). In `IntMap.fss` both rungs replace one line by one line (`:520` and `:732`), so neither moves the other's lines whichever goes first.
- C, which shares no file, went first, as batch 14's gather placed its rung with no shared file; it moves no other rung's line, and no other rung edits its files.
- Every patch applied with `git apply --3way --index` and no conflict (every file "Applied patch ... cleanly", after git's fallback to direct application; O's patch carries four lines of its own with a space before a tab, as on its branch). Each rung's own files on `main` matched its branch byte for byte before the gather's edits (`git diff --cached --stat <branch> -- <the rung's paths>` printed only the earlier rungs' files), and in each shared file the difference from the rung's branch was the earlier rungs' hunks only (changed lines counted with `git diff --cached <branch> -- FILE` against `git diff ee1aa1a95 HEAD -- FILE`: `FortressLibrary.fss` 114 and 114, `IntMap.fss` 2 and 2, `changes.tex` 142 and 142 against L's branch; `changes.tex` 154 and 154 against O's).

Lines that an earlier rung's hunk moved, re-anchored by symbol (B's 121 net lines in `FortressLibrary.fss` after `:1317`, L's 9 between `:2453` and `:2825` and 16 after it; B's 112 net lines in `changes.tex` above L's and O's entries, L's 8 at `:2401` and 2 at `:2561`):
- The folded records cite lines on `main`: F-229 cites `array1` and `array2` at `Library/FortressLibrary.fss:2572-2586` and `:2953-2965` (L's tree `:2451-2465`, `:2832-2844`); F-230 cites `IntMap.fss:520` and `:727-730`, which no hunk moved.
- C's records cite the base: the norm's `squaredNorm(me)`, `FortressLibrary.fss:2493` on the base, is `:2623` on `main`; the crash row `TraitDecl FortressLibrary.fss:2886:1-2999:2` is `:3023-3136`, and its `FnExpr` at `:2922.13` is at `:3059`.
- B's `REPORT.md` cites the worker's head (`ef52b7b11`) for `FortressLibrary.fss` (B's skeptic's `leftForGather`): the skeptic's fix added 65 lines at `:1360-1434`, so the crash the count reports, `:2978` in `REPORT.md`, is `:3043` on B's tree and `:3059` on `main` (L's 16 lines above it). B's other library lines (`:1314`, `:1318-1438`) lie above L's hunks and stand.
- L's lines on L's tree, on `main`: `FortressLibrary.fss:2455` and `:2834` (the witness) are `:2576` and `:2955`; `additiveIdentity`, `:3245-3260`, is `:3366-3381`, and its doc comment, `:3242-3243`, is `:3363-3365`; `openRange`, `:4075-4080`, is `:4196-4201`; `changes.tex:2402-2409` and `:2567-2571` are `:2514-2521` and `:2684-2688` (the second moved by B's 112 lines and O's 5).
- O's `changes.tex` lines on O's tree, on `main`: `:2502-2507` is `:2622-2627`, `:2886-2890` is `:3008-3012`, `:2896-2899` is `:3018-3021`. Its checker and walk lines stand: no other rung edits those files. Its revival change's `TypeAnalyzer.scala:159-166`, the base's lines, which C's 16 lines at `:165` split, are `:159-164` and `:181-182` on `main` (the merged-diff review).
- Rung files (`REPORT.md`, `SKEPTIC.md`) cite their own rung's tree and are not re-anchored; the revival changes below are copied word for word, with the lines on `main` given after each where they differ.

## The tests on the merged tree

From `/home/user/fortress-gather15` (the four patches on `ee1aa1a95`, whose code and tests are `59b1d0a4d`'s but for a comment):
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1` with every interpreter test file the rungs B, L and O add or change, 22 programs and the one `.test` file among them (`AbstractMethodCoverUnsettledWalk.test`):
  `# harness-one 2026-10-14T14:59:16Z; tree ee1aa1a95; nproc=4; load 0.29 0.74 0.80; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty`
  `. interpret tmp/h1/tests/AbstractMethodCoverUnsettledWalk` / ` OK Saw expected refusal at load`
  `OK (22 tests)`
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh merged15 ProjectFortress/compiler_tests` with the 25 compiled `.test` files C and O add or change:
  `# junit.sh merged15 2026-10-14T14:59:52Z; nproc 4; Intel(R) Xeon(R) Processor @ 2.10GHz; 2100.000 MHz; load at start 1.79 1.07 0.91; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; ...`
  `    There are multiple declarations of f with the same parameter type: (S, T)` / ` Saw expected failure` (`XXXNoDuplicatesRuleSelfPositions`)
  `OK (45 tests)`
- Each closing test among them: `InferCallerTwoBoundsClosedTrait`, `CoerceTwoBoundsClosedTrait`, `CallerParamTwoBoundsClosedTrait`, `ReturnRuleTwoBoundsClosedTrait`, `CallerParamTwoGroundBoundsClosedTrait` and `AbstractMethodCoveredPairs` (compile and link "OK", run "PASS"); `XXXNoDuplicatesRuleSelfPositions.test` (" Saw expected failure", the message above); `UnwrittenListMapComprehensionWalk`, `ComprehensionTypedBindingWalk`, `UnwrittenSetBigOperatorsWalk`, `UnwrittenEmptyFloatSumWalk`, `IntMapComprehensionTypedWalk`, `ArrayFactoryAbstractNumber` and `IntMapUplusSingleton` ("PASS", " OK"); `AbstractMethodCoverUnsettledWalk` (" OK Saw expected refusal at load"). Every expected failure the rungs add saw its failure.

`python3 explorations/coordinator/tools/ledger.py check` after the closes: "727 rows, 10 fail the template; rows (or places) failing each rule: spec-path 8, reproducer-path 2, spec-section 1", the base's ten (eight `spec-path`, rows 535 and 642's `reproducer-path`, row 316's `spec-section`). `python3 explorations/coordinator/tools/record.py check --base HEAD` before each commit: "0 failures".

The specification's PDF was not built here; the commit stage builds it once, `Specification/` having changed. No suite, count or distance was run: the gate measures the merged tree.

## Rows opened

Numbered by `ledger.py add` in the order the rungs were applied, each rung's rows in the order of their placeholders. Each placeholder was replaced by its number in the rung's `REPORT.md` and `SKEPTIC.md`, and in the specification where a rung cited it (B: `Specification/basic/inference.tex`, `Specification/basic/expressions/reductions.tex` and `Specification/appendices/changes.tex`, now `row~716`, `row~717`, `row~718`; O: `changes.tex`, now `row~725`, `rows~726 and~727`, `row~727`, `row~728`), before the rung's commit; no test cited a placeholder. Every row was accepted as its record wrote it.

| Row | Placeholder | Rung | Section | Claim, in short |
|---|---|---|---|---|
| 711 | NEW-C-1 | C | 2 | the compiled checker crashes on a call through a type parameter bounded by a closed trait and a bound naming no type parameter that excludes one of its listed types (added and closed at once) |
| 712 | NEW-C-2 | C (its skeptic) | 2 | the compiled checker refuses a call whose argument's type carries the caller's type parameter, bounded by a closed trait and a ground bound excluding a listed type |
| 713 | NEW-C-3 | C (its skeptic) | 5 | `CONTESTED`: the compiled checker refuses, as an invalid overloading, `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)`, which the base accepted through the expansion over a variable |
| 714 | NEW-C-4 | C (its skeptic) | 2 | the compiled checker refuses a call of a generic function whose type parameter has a bound naming the parameter and that no argument fixes |
| 715 | NEW-B-1 | B | 10 | the library's `IntMap` declares its comprehension operator `IntMap[\Val\]` while its body is a `Comprehension` (added and closed) |
| 716 | NEW-B-2 | B | 8 | under walk, an empty reduction or comprehension with no static argument, whose value no declared type directs, is instantiated at its big operator's bound |
| 717 | NEW-B-3 | B | 2 | under walk, a comprehension with no static argument that is the body of another clause form whose instance a declared type fixes is built at its elements' run-time class |
| 718 | NEW-B-4 | B (its skeptic) | 8 | under walk, a reduction with no static argument over a user big operator whose declared result is its own trait is instantiated at its bound |
| 719 | NEW-B-5 | B (its skeptic) | 8 | under walk, a comprehension over a long sequential generator overflows the stack at the suites' 32 MB (reproducer `none`) |
| 720 | NEW-L-1 | L | 2 | the compiled checker reports a call's static argument that fails the callee's bound at the callee's declared type, not at the call |
| 721 | NEW-L-2 | L (its skeptic) | 2 | under walk, `array[\T\]`, `array1` and `array2` at a `T` that walk instantiates at a value's run-time class give a plain array where the specification gives a vector |
| 722 | NEW-L-3 | L (its skeptic) | 2 | under walk, `openRange[\I\]()` at an `I` that walk instantiates at `Int` from a `ZZ32` value throws `CastError` at its container `cast` |
| 723 | NEW-O-1 | O | 4 | under walk, an object that overloads a functional method with a static parameter of its own beside a plain one of the same name stops at load |
| 724 | NEW-O-2 | O | 5 | the code generator stops on such an object: `ClassCastException` in `OverloadSet.getFunctionToCall` |
| 725 | NEW-O-3 | O | 3 | the compiled checker splits no tuple of parameter types through `comprises` clauses where the abstract method or a concrete method below it has its own static parameters |
| 726 | NEW-O-4 | O (its skeptic) | 5 | the code generator stops on two functional methods of a symbolic operator with the same parameter types at two `self` positions, which the checker does not check |
| 727 | NEW-O-5 | O (its skeptic) | 5 | the compiled checker reads no abstract functional method of a trait the component declares, so a duplicate beside a concrete one stops the code generator |
| 728 | NEW-O-6 | O (its skeptic) | 3 | under walk, an object whose one definition of an inherited abstract method has a static parameter of its own and covers it is refused at load |

Row 729 was added by the batch's merged-diff review, in section 9, for a departure rung L's `REPORT.md` section 7 lists and no row recorded: `CONTESTED`, `array1` and `array2` at an element type that is not one of the eight number types, `Number` and `AnyIntegral` among them, give a plain array where "Array Expressions" makes an array of `Number` elements a vector or a matrix (`Specification/basic/expressions/aggregate.tex:152-155`, `:165-166`), the library's bound on `Vector` refusing that instance (F-151); reproducer `ProjectFortress/tests/ArrayFactoryAbstractNumber.fss`, which pins today's plain array; the question is L.worker.1's.

## Rows closed

Each by `ledger.py close N --commit <the rung's commit on main> --test <the test>`, after its test passed on the merged tree as the rung last ran it, in `32af87b18`, with the record's note in the close:
- Rung C, `f237148ac`: 686 (`InferCallerTwoBoundsClosedTrait`, its claim narrowed to a bound that names the parameter, the record's 297 characters; its ground face is row 712); 687 (`CoerceTwoBoundsClosedTrait`); 689 (`CallerParamTwoBoundsClosedTrait`); 690 (`ReturnRuleTwoBoundsClosedTrait`); 711 (`CallerParamTwoGroundBoundsClosedTrait`). The record's commit, `4356454a2`, is the branch's.
- Rung B, `20474c144`: 703 (`UnwrittenListMapComprehensionWalk`); 646 (`ComprehensionTypedBindingWalk`, promoted from `XXXComprehensionTypedBindingWalk`); 662 (`UnwrittenSetBigOperatorsWalk`, promoted); 645 (`UnwrittenEmptyFloatSumWalk`, promoted, its claim corrected to the declared case; the remainder is row 716); 715 (`IntMapComprehensionTypedWalk`). The notes name the branch's commit `5dad832f3`.
- Rung L, `a0f839ad7`: 685 (`ArrayFactoryAbstractNumber`, its claim and class corrected to the library line, `library bug (library)`, the error's location row 720; the four `wellformed` sites gone in the distance stage on the rung's tree, 54 to 50); 704 (`IntMapUplusSingleton`, with `IntMapUplusManyEntry` and `IntMapComprehensionRepeatedKey`).
- Rung O, `59b1d0a4d`: 707 (`XXXNoDuplicatesRuleSelfPositions`, beside `XXXNoDuplicatesRuleSelfPositionsPlain`); 708 (`AbstractMethodCoverUnsettledWalk`); 709 (`AbstractMethodCoveredPairs`). The notes name the branch's `f537abed8` for the message; the record's `317fc0ef5` is the branch's.
- Rows that stay open: 680 (C held its line; its claim and note are false, below), 712, 713, 714 and 716 to 729.

## Each rung

### C (`rung-checker-bounds`), landed first as `f237148ac`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `1ae7e4255` wrote the worker's `REPORT.md` and `record.md` from the journal, the harness having refused the worker's write; no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections, none contested, no ruling: `1ae7e4255` (`REPORT.md` and `record.md` from the journal); `c5570ada6` (four faces of `TypeAnalyzer.scala:165-180`, `:708-735` given gated tests: `CoerceTwoGroundBoundsClosedTrait`, `ReturnRuleTwoGroundBoundsClosedTrait`, `InferCallerTwoGroundBoundsToClosedTrait`, `XXXCallOutsideTwoBoundsClosedTrait`); `dd32cebd9` (row 686's ground face still refused, row 712, `XXXInferCallerTwoGroundBoundsClosedTrait`); `cc64195ca` (the exclusion oracle's verdict that moves, row 713, `XXXOverloadTwoBoundsClosedTraitExclusion`, `CONTESTED`); `30af07104` (the comment of `XXXLocalFunctionRecursiveUntypedReturn.fss:1`); `95a6ac9de` (row 714, `XXXInferUnfixedSelfBoundedParam`); `7841ea0c8` (the record's FACTS hand-over, row 686's narrowed claim, row 680's corrected claim, the new rows, the handover, the revival change and two citations of `REPORT.md`).

**Folded.** F-227 ("The compiled checker keeps an intersection that names a type or inference variable as written, ...") at the end of "The checker and the one library"; F-94 rewritten in place (its title's last clause and its sentences on rows 686, 687, 689 and 690 no longer hold; its sentence on row 688's memo kept), as the record asks. Rows 711 to 714. The notes on rows 518 and 688 refused (closed rows) and on 680, 695 and 577 refused (limits), below. Rows 686, 687, 689, 690 and 711 closed. Its items for the curator in `PLAN.md` (below). F-53 and F-54, which the record also corrects with run 2's figures, are left to the coordinator's consolidation after the gate (`coordinator/CLIMB-BATCH-15.md`, section 5, "After the landing"), since the gate's count reads the merged tree.

**Corrections.** None owed: the skeptic left none, and `REPORT.md` section 7 lists no sentence of the specification made false.

### B (`rung-walk-elements`), landed second as `20474c144`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `1f3d00c18` wrote the worker's `REPORT.md` and `record.md` from the journal, the harness having refused the worker's write; no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes**, none contested, no ruling: `2a4f38219` (defect: `__replay` recursed one Fortress call per collected join, so a chain a sequential generator builds overflowed the suites' 32 MB stack where the base computed `149997`; the spine is now walked by a loop, `__replayLeft` and `__replayRight`, `Library/FortressLibrary.fss:1379-1434` on B's tree, `UnwrittenSequentialReductionWalk`); `7ece286a8` (correction: rows 718 and 719, row 716's comprehension face, and the record's FACTS lines, placeholders, handover and revival change); `4bc402a6b` (correction: `Specification/basic/inference.tex:265-269` and `:374-376`, `Specification/basic/expressions/reductions.tex:33-35` and both `changes.tex` entries said walk instantiates by the declared type of "the variable or the function"; it reaches a local variable and a top-level or local function only; and a citation of `REPORT.md`); `1f3d00c18` (correction: `REPORT.md` and `record.md` from the journal).

**Folded.** F-228 ("Under walk, a reduction or a comprehension that writes no static argument instantiates its big operator ...") at the end of "Landed semantics"; F-141 (its D2 departure), F-143 (its open rows 645, 646 and 662) and F-220 (the typed `body(i: I)`) rewritten in place with the record's texts. Rows 715 to 719. The note on row 510 written; the record names rows 424 (closed), 20 and 577 (no room) with no note to write. Rows 703, 646, 662, 645 and 715 closed. Its items for the curator in `PLAN.md`. F-53, which the record says changes "once the gate measures it", is left to the coordinator's consolidation.

**Corrections.** The skeptic's two `leftForGather` items: rows 718 and 719 added, and row 716 with its widened claim, each placeholder replaced at the lines the record lists (`inference.tex`, `reductions.tex`, `changes.tex`); `REPORT.md`'s `FortressLibrary.fss` lines are the worker's head's, and the crash the count reports is re-anchored above (`:3043` on B's tree, `:3059` on `main`). `REPORT.md` section 8 lists no sentence of the specification left false: the rung corrected each revival box and Appendix I passage it made false. Its FACTS sentences are folded above; its skill sentences are listed for the skill writer below.

### L (`rung-library-factories`), landed third as `a0f839ad7`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `22cb62296` wrote the worker's `REPORT.md` and `record.md` from the journal, the harness having refused the worker's write; no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections, none contested, no ruling: `22cb62296` (`REPORT.md` and `record.md` from the journal); `9d91a922d` (in-body comments removed from `ProjectFortress/tests/IntMapComprehensionRepeatedKey.fss` and `IntMapUplusManyEntry.fss`, no assertion changed, and `REPORT.md:157`'s citations follow); `0e383f368` (the record's notes on rows 364 and 678, which `ledger.py` refuses, replaced by rows 721 and 722 for row 364's two consequences in the library; row 678's line move needs no note).

**Folded.** F-229 ("`array1` and `array2` give a vector and a matrix only at the eight number types ...") at the end of "The library's arrays and algebra" and F-230 ("`IntMap`'s `UPLUS` throws `KeyOverlap` on any shared key in either order ...") at the end of "Landed semantics", the file having no section on maps; F-151's sentence "The checker still refuses the first factories' results (row 685) and the norm's call (row 686)." rewritten, both rows being fixed by L and C. Rows 720 to 722. Rows 364 and 678 take no note, as the record says. Rows 685 and 704 closed. Its items for the curator in `PLAN.md`.

**Corrections.** The skeptic's `leftForGather` item: `additiveIdentity`'s doc comment said "the typecase over a %() -> T% witness that %array1% uses", false now that `array1` takes a witness of its result type; it is respelled on the same three lines, "the typecase over a %() -> T% witness, the witness of its result type, as %array1% takes one of its own." (`Library/FortressLibrary.fss:3363-3365` on `main`), in L's commit, a comment of the team's file. `REPORT.md` section 7's other sentences made false: the vector and matrix sentences of `Specification/basic/expressions/aggregate.tex:152-155` and `:165-166` are normative text, not a box or an Effect, so the gather does not correct them; they are L.worker.1's question (below). F-151 is folded above.

### O (`rung-duplicates-coverage`), landed last as `59b1d0a4d`

**From the branch.** `REPORT.md` and `SKEPTIC.md` land; `record.md` was folded and does not. The skeptic's `19dbaa604` wrote the worker's `REPORT.md` and `record.md` from the journal, the harness having refused the worker's write; no repair round, and the gather wrote no file from the journal.

**Skeptic's fixes**, all corrections, none contested, no ruling: `19dbaa604` (`REPORT.md` and `record.md` from the journal); `e5456a7e9` (rows 726, 727 and 728 for three defects with no home, the worker's rows 723 to 725 widened to what the code and the programs show, and the F-145 and F-223 texts in the record); `224f85017` (`changes.tex`: the Effect of "Overloading with static parameters" and that of the coverage entry name rows 584, 726, 727 and 728; no normative text changed).

**Folded.** No new FACTS entry, as the record says; F-145 and F-223 set to the record's texts. Rows 723 to 728. The notes on rows 584 and 577 refused (limits); row 665 takes none. Rows 707, 708 and 709 closed. O.skeptic.1 added to an existing entry of `PLAN.md` (below).

**Corrections.** The skeptic's three `leftForGather` items: F-145 and F-223 set, rows 723 to 728 numbered and their placeholders replaced in `changes.tex` (now `:2624`, `:2627`, `:3012`, `:3021`); row 584's note did not fit (below). The first item, the skill's sentences made false (`.claude/skills/fortress-repo/references/interpreter.md:42`, "If walk's search for a cover does not settle, it does not refuse."; `references/revival-changes.md:66`, rows 708 and 709 as departures, and row 728 to be named), is skill text, which this batch does not write (the gather's brief: "Write nothing under .claude/"); it is listed for the skill writer under O's revival change below. `REPORT.md` section 7's specification sentences were corrected by the rung.

### Text mismatches

None found between one rung's specification text and another rung's code. B's passages speak of walk's instance of an unwritten clause form's big operator, L's box of Jan's pair and the factory, O's Effects of duplicates and coverage, and C wrote no text; C's normal form leaves the coverage that O's Effect states as it is, and each rung's compiled and walk tests passed together on the merged tree (above).

## Files written from the journal

None by the gather: every branch carried its `REPORT.md`, `record.md` and `SKEPTIC.md`, no `SKEPTIC.md` was only the word "committed", and no rung had a repair round. On the branches, each skeptic wrote its worker's `REPORT.md` and `record.md` from the journal with `journal-text.py` (C `1ae7e4255`, B `1f3d00c18`, L `22cb62296`, O `19dbaa604`).

## The rungs that did not land

None: every rung of the batch was approved.

## Ledger notes not written

`ledger.py note` refuses a note that would take a row past 700 characters of notes or 1,200 of line (`explorations/coordinator/tools/ledger.py:115`), and a closed row (`:786`). It refused 7 of the records' 8 notes (gather.1); row 510's went in. The texts, in the records' words with the rows' numbers put in:
- Row 518 (C), `FIXED`: "climb batch 15 rung C (`4356454a2`): before the union rule, an inference variable below a union takes the union as one upper bound, and a type variable below a union is also tried through its bound (`TypeAnalyzer.scala:165-180`); `InferUnionInstanceArg` keeps its verdict".
- Row 688 (C), `FIXED`: "count stage at climb batch 15 rung C: 378 s; with body(i) typed and row 680's line, the whole component in 809 s".
- Row 680 (C): "climb batch 15 rung C: cause `impls/Decls.scala:414`, the thunks primed without the group; the fix `makeTryChecker(newChecker)` is held, the whole-component count took 809 s > 690 s; tests XXXLocalFunctionSiblingInLoop, XXXLocalFunctionSiblingCall, XXXLocalFunctionRecursiveUntypedReturn (re-key to 'reference cycle' at the fix)". Refused: row 1,450, notes 1,018.
- Row 695 (C): "at a trait-typed S the body runs: SelfTypeReturnSelfAtTraitRun (climb batch 15 rung C)". Refused: notes 785.
- Row 577 (C): "climb batch 15 rung C edits no library line; its per-site list equals the landed one but for :2493". Refused: notes 796.
- Row 584 (O): "climb batch 15 rung O: a symbolic operator's duplicate pair at two self positions, `FlatString`'s `||` among them (`Library/FlatString.fsi:17`, `:20`), stops the code generator, 726". Refused: row 1,365, notes 875.
- Row 577 (O): "climb batch 15 rung O edits no library file; its distance per-site list equals the landed one by location and message, 54 to 54". Refused: notes 825.

Rung B's record names rows 424 (closed), 20 (692 of 700 characters of notes) and 577 (697 of 700) with no note to write, and rung L's rows 364 and 678, whose consequences rows 721 and 722 hold. One of the refusals leaves a row saying what is untrue: row 680 stays open, and rung C's record measured its claim and its note "A compiler-world program of the same shape typechecks" false (`compile-ladder/rung-checker-bounds/REPORT.md:172`); its corrected claim, for its close, is "a local function with no written return type whose body calls a member of its group, itself included, stops the compiled checker, the thunks primed without the group: 'TryChecker returned an untyped expr' in a loop body (Array3's asString at `plane(k)`), 'intermediate nodes' elsewhere", and its reproducer, now `ProjectFortress/compiler_tests/XXXLocalFunctionSiblingInLoop.test`, cannot be set by `ledger.py` (gather.1).

## Handover lines

Each rung's handover line, as its record gives it, with the rows' numbers put in. The hashes in them are the branches'; each rung's commit on `main` is in the table above.

**C.**

Rung C (rung-checker-bounds) landed the checker probe's normal-form and union-case patches in `TypeAnalyzer.scala` (`4356454a2`).

- Rows 686, 687, 689 and 690 close with their promoted tests, row 686 with its claim narrowed to a bound that names the parameter, and the ground sibling 711 closes with `CallerParamTwoGroundBoundsClosedTrait`. The ground faces of rows 687 and 690, a callee bounded by the closed trait alone, and the refusal of a call outside the bounds, which stopped the checker before, have their tests too.
- 712, the ground face of row 686, stays open: `XXXInferCallerTwoGroundBoundsClosedTrait`.
- 714: a type parameter whose bound names it and that no argument fixes makes a call not applicable, on the base too; with a closed trait in the bound the base crashed and the head refuses: `XXXInferUnfixedSelfBoundedParam`.
- 713: an overloading the base accepted through the expansion over a variable is now refused, on a question Appendix I lists as not settled: `XXXOverloadTwoBoundsClosedTraitExclusion`.
- The distance goes from 54 to 53 (`:2493`). The count stays 1, in 378 s.
- Row 680's line was measured and held. With `body(i)` typed for one run, the count over the whole component printed 43 errors in 809 s, past 690 s. Its tests stand as expected failures keyed on today's crashes.
- While the line is held, a landed `body(i)` alone leaves the gate's count at 1, stopped at the crash in `Array3`.
- Review-routed.1's test of row 695's bound at a trait type is `SelfTypeReturnSelfAtTraitRun`, green.

**B.**

Climb batch 15 rung B (`wip/rung-walk-elements`; 92b0a45fe, 5dad832f3, 81fde35ea, 169048c14, ef52b7b11; the skeptic's commits after them, `SKEPTIC.md`):
- Walk instantiates an unwritten clause form's big operator by the declared type of its value, by its elements' join or at its bound. D2 is lifted, building P-48 by the coordinator's call (the walk probe's way 6 + 7).
- The hint travels as an argument to the operator's own instantiation, outside the per-argument caches.
- `body(i: I)` is typed, and `IntMap`'s comprehension operator is declared as `Map`'s.
- Rows 703, 646, 662, 645 (its claim corrected) and 715 are closed. 716, 717 and 718 are opened, each with an expected failure, and 719 with none.
- The skeptic's fix replays a chain of joins by a loop over its spine, so a reduction over a long sequential generator runs at the suites' stack again (`tests/UnwrittenSequentialReductionWalk`).
- `ant testSystem` is green (611) and `ant testSpecData` is green (130). microGPT's quick pair passes 7 of 7 each.
- The count is 1, row 680's crash, after 493 s. The distance is 54, and no site moved.

**L.**

Climb batch 15, rung L (the array factories and `IntMap`'s disjoint union) on `wip/rung-library-factories`: `array1` and `array2` build a vector and a matrix per number type by a witness of the result type and `cast` (row 685's four sites gone, the distance 54 to 50, the count 1 unchanged), a plain array at any other element type, `Number` and walk's `Int` among them; `NodeIM`'s `UPLUS` by `addNew`, so a shared key throws in both orders and a repeated key in every `IntMap` comprehension (row 704); the revival box on Jan's pair and its Appendix I entry revised; `testSystem` 609 green; the probe's patch not applied as written, since its witness of `T` threw `CastError` at walk's `Int`.

**O.**

Rung O (rung-duplicates-coverage) landed three repairs:
- the No Duplicates Rule at two self positions on the compiled checker (row 707), its message naming the first-written declaration's domain;
- coverage through comprises clauses on the checker, within walk's bounds (row 709);
- walk's refusal where its search for a cover does not settle (row 708).

The code is `317fc0ef5` and `f537abed8`. Rows 707, 708 and 709 close with `XXXNoDuplicatesRuleSelfPositions`, `AbstractMethodCoverUnsettledWalk` and `AbstractMethodCoveredPairs`. The count stays at 1 and the distance at 54; no site moved.

New rows:
- 723 and 724: a generic functional method beside a plain one in an object stops walk at load and stops the code generator.
- 725: the checker's split skips methods with static parameters of their own.
- 726 and 727 (the skeptic's): a duplicate pair of a symbolic operator, and a component's own abstract functional method beside a concrete one, pass the checker and stop the code generator.
- 728 (the skeptic's): walk refuses an object whose one covering definition has a static parameter of its own.

F-145, F-223 and the skill's `references/interpreter.md:42` and `references/revival-changes.md:66` need their sentences on rows 707 to 709 rewritten.

## Points to report

None holds the push: every point below is reversible, and no step taken cannot be undone or acts against a decision on record. Where the worker and the skeptic listed one point twice, it is listed once, in the later wording. Lines are on the rung's tree, with `main`'s where a later hunk moved them.

Rung C:
- Both count tables with their times, and whether row 680's line landed: run 1 (all three patches) 379 s, count 1; run 2 (`body(i: I)` for that run only, row 680's line in) `#total 43` / `#locations 40` / `#crash none` / 809 s, every api 0, about 263 s for the apis, the component's 44 sites less `:2493`, none in `Array3`; run 3 (final code) `#total 1` / `# seconds 378`, the table equal to climb batch 14's. Row 680's line did not land, held by the 690 s rule: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:414` is `makeTryChecker(this)` (hold commit `e75bb538b`; `compile-ladder/rung-checker-bounds/REPORT.md` section 6).
- A patch changed from the probe's, and `InferUnionInstanceArg`'s verdict: no patch changed; `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:165-180` and `:708-735` equal `explorations/perf-probes/checker-bound-defects/patches/`; row 680's patch was applied unchanged and then held. `InferUnionInstanceArg` keeps `PASS` (`junit.sh skfinal`: 'OK (43 tests)').
- A site that comes or goes beyond `:2493` and the crash row: none. `compare.sh`: 'DISTANCE DOWN   54 -> 53 (-1)' / 'kind typecheck 41 -> 40 (-1)'; the per-site diff against `explorations/compile-ladder/gate/distance-sites.tsv:15` is that one row; the crash row `TraitDecl FortressLibrary.fss:2886:1-2999:2` stays (`:3023-3136` on `main`).
- A checker file edited beyond `TypeAnalyzer.scala` and `impls/Decls.scala`, or any library or walk edit: none. `git diff --stat ee1aa1a95...HEAD -- ProjectFortress/src` lists only `types/TypeAnalyzer.scala`; `Decls.scala` was edited in `3216343f6` and restored in `e75bb538b`; `Library/FortressLibrary.fss:1314` was written `body(i: I): L` for run 2 only and restored, never committed.
- A verdict that moves in a reader of the normal form, the exclusion oracle (the skeptic's): `f[\T extends { K, R[\T\] }\](x: T)` beside `f(x: Z)` gives 'PASS' on the old compiled path and 'Invalid overloading of f' on the new (`ProjectFortress/compiler_tests/XXXOverloadTwoBoundsClosedTraitExclusion.fss:12-13`; row 713); Appendix I lists the question as not settled ("Passages not yet revised").
- Verdicts that move in the inference's solution beyond the rows' tests (the skeptic's): the callee-`K` `Box` face from refused to accepted (`ProjectFortress/compiler_tests/InferCallerTwoGroundBoundsToClosedTrait.fss:12-13`); a call outside the bounds from a crash to 'is not applicable to an argument of type C.' (`XXXCallOutsideTwoBoundsClosedTrait.fss:16-17`); a ground `mk` with `T` fixed by nothing from a crash to running 'box'; `mk` at `{ K, R[\T\] }` from a crash to a refusal (row 714).

Rung B:
- The count's table, its error, the stage's time against its 900 s limit, whether `body(i)` landed, and any site that `__bigOperator`'s body or the collector brings: on the worker's head `ef52b7b11`, `#total 1`, 'FnExpr at .../Library/FortressLibrary.fss:2978.13', 493 s; `body(i: I)` landed at `Library/FortressLibrary.fss:1314`; the distance 54, no site moved. After the skeptic's fix the crash is at `:3043` on B's tree (`:3059` on `main`), not measured (`compile-ladder/rung-walk-elements/REPORT.md` section 6).
- The hint's design, the caches, and why no other task reads it; the reach of the collection step and of way 7's contexts; the suite's time: the hint is an argument to the operator's own instantiation, `choosing` set only around `bestMatch` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:239-247`); the collection step runs for every generic big operator unless a declared type decides first (`Evaluator.java:744-804`); way 7 reaches a local variable and a top-level or local function only (`Specification/basic/inference.tex:265-269` as corrected); `ant testSystem` 'Total time: 3 minutes 30 seconds' against batch 14's 4 min 6 s.
- Each library declaration added or changed, its types and its precedent line: the collector (`REPORT.md` section 5.4), the skeptic's `__replay` dispatch `Library/FortressLibrary.fss:1360-1377` and `__replayLeft` and `__replayRight` `:1379-1434`, precedent `Library/RangeInternals.fss:1357-1367`; `body(i: I): L` (`:1314`); `IntMap`'s api lines `Library/IntMap.fsi:13` (`import CovariantCollection.{AnyCovColl}`, from `Library/PrefixSet.fsi:33`) and `:83` with `Library/IntMap.fss:732` (`Comprehension[\(ZZ64,Val),IntMap[\Val\],AnyCovColl,AnyCovColl\]`, from `Library/Map.fsi:104`).
- Normative text changed, and every revival sentence made false and corrected, the skill's among them: no normative text changed; revival boxes and Appendix I entries corrected at `Specification/basic/inference.tex:265-269`, `:372-398`, `Specification/basic/expressions/reductions.tex:30-42` and `Specification/appendices/changes.tex` (the Change, Rationale and Effect of "Reductions whose element type nothing fixes" and of "The inference of a call's static arguments"); the skill's sentences (`SKILL.md:126`, `references/revival-changes.md:108-109`, `:124`, `:219`, `references/library.md:25`) are listed for the skill writer under B's revival change.
- A walk test, a team test or a specification example whose verdict changes other than the three promotions: none (`ant testSystem` 611, `ant testSpecData` 130, 0 failures each). An ill-typed program's refusal moves into the library: `xs: List[\String\] = <| k | k <- 0#3 |>` was refused at the binding ('RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\String\]') and is refused inside `__bigOperator` ('Unification error: Closure/Constructor for body param 1 (i:String) got arg 2: ZZ32 of type Int') (`REPORT.md` section 7, `EDeclaredMismatch`); and a quiet wrong value becomes a refusal, the skeptic's `SWritten`: 'bad return <|a, a|> : ArrayList[\FlatString\]' before, 'Unification error: Closure/Constructor for body param 1 (i:ZZ32) got arg "a"' now.

Rung L:
- A walk value that changes: `array1` or `array2` at an abstract number type (`Number`, `AnyIntegral`), at a user type that extends `Number`, and at a `T` that walk instantiates at a value's run-time class (from `ZZ32`, `ZZ64` or `RR64` values) gives a plain array where it gave a `Vector` or `Matrix`, whose `+` and unary `-` no longer run (`ProjectFortress/tests/ArrayFactoryAbstractNumber.fss:6-9`; `ProjectFortress/tests/XXXArrayInferredElementVectorWalk.fss:10`, row 721; `Library/FortressLibrary.fss:2455`, `:2834`, `:2576` and `:2955` on `main`).
- Each `IntMap` test whose value or throw changes, a comprehension with a repeated key among them: `IntMapUplusSingleton`'s pins; the new `IntMapUplusManyEntry` and `IntMapComprehensionRepeatedKey`, red on the base. With no test: a map expression with a same-value repeated key throws, and `BIG UPLUS` over maps that share a key throws `KeyOverlap` where it kept a value (`ProjectFortress/tests/IntMapUplusSingleton.fss:24-25`; `ProjectFortress/tests/IntMapUplusManyEntry.fss:23-24`; `ProjectFortress/tests/IntMapComprehensionRepeatedKey.fss:17-26`; `Library/IntMap.fss:520`, `:744-748`).
- Each repair's precedent line: `additiveIdentity`'s typecase over a witness of its result type with `cast` (`Library/FortressLibrary.fss:3245-3260` on L's tree, `:3366-3381` on `main`), and `NodeIM`'s `addNew` with `SingletonIM`'s `UPLUS` by `addNew` (`Library/IntMap.fss:488-490`, `:339-340`).
- Each team line changed: `array1`'s and `array2`'s typecase on `__thrower[\T\]` against `() -> Number` and the team's comment "TODO: fix when Number is covariant" (base `:2451-2456`, `:2823-2828`; L's tree `:2451-2465`, `:2832-2844`; `main` `:2572-2586`, `:2953-2965`); `NodeIM`'s `UPLUS` `self.add(other)` becomes `self.addNew(other)` (`Library/IntMap.fss:520`).
- The pins changed in `IntMapUplusSingleton.fss`: `:24` was 'no exception' and is 'IntMap.KeyOverlap: 1 |-> 1 and |-> 9'; `:25` was `assert(three UPLUS one, three, ...)` and now asserts that both orders throw alike; `:1`, the header comment, is rewritten (`ProjectFortress/tests/IntMapUplusSingleton.fss:1`, `:24-25`).
- Normative text changed, and each sentence made false: the revival box on Jan's pair (`Specification/appendices/future.tex:257-268`) and its Appendix I entry's Change and Original text (L's `changes.tex:2402-2409`, `:2567-2571`, on `main` `:2514-2521`, `:2684-2688`) revised; made false and not edited: `aggregate.tex`'s vector and matrix sentences at `Number` (`Specification/basic/expressions/aggregate.tex:152-155`, `:165-166`, L.worker.1), F-151's row 685 sentence (rewritten by the gather), and `additiveIdentity`'s doc comment (`Library/FortressLibrary.fss:3242-3243` on L's tree, respelled by the gather, `:3363-3365` on `main`).
- Of the same kind as "each repair's precedent line": the repair departs from the probe's patch, a witness of the result type in place of a witness of `T`, because the probe's patch threw `CastError` at walk's `Int` (`Library/FortressLibrary.fss:2455`, `:2834` on L's tree).
- Of the same kind as "a site that comes or goes": a defect outside the rung's files gets an expected failure: `openRange`'s container `cast` throws `CastError` at walk's inferred `Int`, present on the base (row 722; `ProjectFortress/tests/XXXOpenRangeInferredIndexWalk.fss:10`; `Library/FortressLibrary.fss:4075-4080` on L's tree, `:4196-4201` on `main`).

Rung O:
- The message row 707's refusal prints, and the bound row 709's split takes: both declarations' spans, then "There are multiple declarations of f with the same parameter type: " and the domain of the declaration written first, without `self` in a trait's or object's check and whole in the top-level set: `(S, T)` and `(T)` for the generic pair, `(S, S)` and `(S)` for the plain one; `XXXNoDuplicatesRule` prints `Box[\T\]` where it printed `Box[\U\]`, its verdict unchanged (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:444-451`, `:755-762`). The split's bound is 10,000 steps and 4,096 combinations, walk's `OVERLAP_STEPS` and `OVERLAP_PARTS`; past it the object is refused, and row 708's shape of 7,776 combinations is refused by both paths (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:125-126`, `:170-173`; `OverloadedFunction.java:865`, `:868`).
- Normative text changed beyond the three Appendix I sentences, and every sentence made false, the skill's among them: no normative text changed. Added Effect sentences: the worker's on row 725 (O's `changes.tex:2896-2899`, `:3018-3021` on `main`) and the skeptic's (O's `:2502-2507` and `:2886-2890`, `:2622-2627` and `:3008-3012` on `main`). Made false: FACTS F-145 and F-223 (set by the gather), and the skill's `references/interpreter.md:42` and `references/revival-changes.md:66` (listed for the skill writer under O's revival change).

## Items for the curator, and where each is in `PLAN.md`

Under "Pavol's answers, in the order they are needed", in the new group "Before row 680's line lands, raised by climb batch 15":
- C.worker.1, C.skeptic.3, C.worker.2, C.skeptic.4: item 54, new ("C.worker.1, C.skeptic.3, C.worker.2 and C.skeptic.4 of climb batch 15's rung C: row 680's repair, ..."). The four are one point: the line held on one measure under load, and F-53's rise waiting on it.

Under "Off the path, parked", in the new subsection "Climb batch 15, listed for his review", one entry each, opening with the ids it holds:
- C.skeptic.1: "C.skeptic.1 of climb batch 15's rung C: should a meet over a type parameter be excluded through a closed trait's `comprises` clause (row 713)? ...".
- C.skeptic.2: "C.skeptic.2 of climb batch 15's rung C: may the analyzer's normal form change so that a type variable met with a ground bound's expansion ... (row 712)? ...".
- B.worker.1, B.skeptic.1: "B.worker.1 and B.skeptic.1 of climb batch 15's rung B: an empty reduction or comprehension with no static argument that no declared type directs (row 716) ...".
- B.worker.2, B.skeptic.2: "B.worker.2 and B.skeptic.2 of climb batch 15's rung B: the team disabled the fusion of nested reductions ...".
- L.worker.1: "L.worker.1 of climb batch 15's rung L: the specification's "Array Expressions" says ...".
- L.worker.2: "L.worker.2 of climb batch 15's rung L: a key repeated with the same value in a map comprehension ...".

Under "Off the path, parked", in entries already there:
- O.skeptic.1, in "Climb batch 14, listed for his review", the entry "W.skeptic.1 of climb batch 14's rung W: should walk's abstract-method check refuse where its coverage search does not settle ...", whose call rung O built: a sentence added, "O.skeptic.1 of climb batch 15's rung O, evidence for this review: the call ... also refuses a covered object ...".
- gather.1 (the notes `ledger.py` refused, and row 680's false claim and note, which no command corrects on an open row): in "Climb batch 12, listed for his review", the entry "gather.2, from climb batch 12's gather, beside climb batch 11's gather.1 above (the gap ledger's tool has no route for some writes) ...", a sentence added, "Climb batch 15's gather met the same limits (its gather.1) ...".

Item 53 ("L.worker.1 and L.skeptic.1 of climb batch 14's rung L: typing `__bigOperator`'s local `body(i)` ...") is built by rung B, by the coordinator's call 6 (`coordinator/CLIMB-BATCH-15.md` section 2); its entry stands as it was, for the coordinator's routing, as do the coordinator's calls 1 to 5 and 7 to 9 of the batch record, which the batch record's "After the landing" gives to the coordinator. So does climb batch 14's review-routed.1 ("Climb batch 14, listed for his review"), the test owed for row 695's bound at a trait type, which rung C wrote, `ProjectFortress/compiler_tests/SelfTypeReturnSelfAtTraitRun.test`; the merged-diff review added a sentence saying so to that entry.

## FACTS left for the coordinator

The rungs' records also correct F-53 (B and C: the count's error at row 680's crash in `Array3`; C's run 2, 43 errors in 809 s) and F-54 (C: nothing hidden behind row 680's crash). Both describe the count and the distance "at the last landed gate", which the gate measures on the merged tree, and the batch record gives them to the coordinator's consolidation after the landing (`coordinator/CLIMB-BATCH-15.md` section 5, "After the landing"); the gather did not write them. Their texts are in the rungs' records on the branches (`git show wip/rung-walk-elements:explorations/compile-ladder/rung-walk-elements/record.md`, section "FACTS"; `git show wip/rung-checker-bounds:explorations/compile-ladder/rung-checker-bounds/record.md`, "Corrections of entries that are now wrong").

## Revival changes, for the skill writer

Each landed rung's "Revival change" section, both its parts word for word, in the order the rungs landed, with the rows' numbers in place of the placeholders. Where a line it cites moved on `main`, the line on `main` follows the copy; then the skill sentences the rung's report lists as made false, which the batch does not edit.

### C (`rung-checker-bounds`, `f237148ac`)

**The change.**

- **What the team's checker did.** It normalised an intersection holding a closed trait by replacing the trait with its listed types that another conjunct excludes, whatever the conjuncts held (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:632-641` at `a874948ac`). It tried a union on the right of a subtype question before its inference-variable and type-variable cases (`:158-159`, before `:164-166` and `:177`).
- **What followed from it.** Take `T extends { K, R[\T\] }` with `K comprises { A, B, C }` and `C` outside `R`. The bound became a union of intersections holding `T`, and the union was split before `T`'s bound was read. A call through such a parameter was refused ('is not applicable to an argument of type Box[\T\]') or stopped the checker ('Applied a substitution to an And and got an Or'). A valid overloading beside it was refused under the Return Type Rule.
- **What the tree does now.** The trait is expanded only against a conjunct that names no type or inference variable (`TypeAnalyzer.scala:708-735`). An inference variable below a union takes the union as one upper bound, and a type variable below a union is also tried through its bound (`:165-180`). The five programs compile and run: `ProjectFortress/compiler_tests/InferCallerTwoBoundsClosedTrait`, `CoerceTwoBoundsClosedTrait`, `CallerParamTwoBoundsClosedTrait`, `ReturnRuleTwoBoundsClosedTrait` and `CallerParamTwoGroundBoundsClosedTrait`; so do `CoerceTwoGroundBoundsClosedTrait`, `ReturnRuleTwoGroundBoundsClosedTrait` and `InferCallerTwoGroundBoundsToClosedTrait`, and a call outside the bounds is refused as not applicable (`XXXCallOutsideTwoBoundsClosedTrait`). A call whose argument's type carries the parameter under a ground second bound is still refused (`XXXInferCallerTwoGroundBoundsClosedTrait`), and a meet over a variable no longer excludes a type through the expansion (`compile-ladder/rung-checker-bounds/SKEPTIC.md`).
- **The reason.**
  - The specification makes such a call applicable at an instance within the bounds (`Specification/basic/inference.tex:56-58`).
  - The type group's subtyping algorithm reads no `comprises` clause, and its inference-variable rule applies as the first match finds it (`Papers/Types/fig-subtype.tick`).
  - The POPL 2019 paper proves matching complete only where no union holds a type parameter (`research/extracts/ParkPOPL2019-extract.md`, section 6).
  - The checker's refusals and crash above are the measured failures.

**Provenance.** The checker probe `explorations/perf-probes/checker-bound-defects/` (rows 686, 687, 689 and 690). The ground sibling's patch was placed in this rung by the coordinator's call under the curator's rule for forks. It follows P-26 and P-48, and was built in climb batch 15, rung C. Row 680's repair is not part of this change: it was held.

*For the skill writer.* `REPORT.md` section 7 lists no sentence of the specification or of the skill made false. The lines it cites stand on `main`: no other rung edits `TypeAnalyzer.scala`.

### B (`rung-walk-elements`, `20474c144`)

**The change.**
- **The team's sources.**
  - The specification desugars a reduction or a comprehension with the type `N` of the expression: `<| e | gs |>` of type `List[\E\]` uses `BIG <|[\E\]|>`, and `SUM[gs] e` of type `N` uses `SUM[\N\]` (`Specification/advanced/parallelism-locality/defining-generators.tex:154-197`).
  - The team's walk gave every static parameter that the arguments did not fix the type `BottomType` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:242-246` at `a874948ac`, `if (t == null) t = BottomType.ONLY;`). A big operator's parameter in a clause form that writes none is such a parameter.
  - The team's library left `__bigOperator`'s local `body(i)` untyped (`Library/FortressLibrary.fss:1120` at `a874948ac`). It also declared `IntMap`'s comprehension operator `IntMap[\Val\]` while its body is a `Comprehension` (`Library/IntMap.fsi:82`, `Library/IntMap.fss:689` at `a874948ac`).
- **What the tree now does.**
  - Under walk, the big operator of a reduction or a comprehension that writes no static argument is instantiated in this order:
    - by the declared type of the local variable, or the declared return type of the top-level or local function, whose value it is, also as a block's last expression and after local declarations;
    - otherwise by the join of its elements' run-time types, the elements being collected before they are reduced;
    - otherwise at the bound of each static parameter, or open where the bound mentions the parameter.

    `tests/UnwrittenComprehensionDeclaredTypeWalk`, `UnwrittenComprehensionElementsWalk`, `ComprehensionTypedBindingWalk`, `UnwrittenSetBigOperatorsWalk`, `UnwrittenEmptyFloatSumWalk` and `UnwrittenListMapComprehensionWalk` show it.
  - `body(i: I): L` (`Library/FortressLibrary.fss:1314` on rung B's tree). `IntMap`'s operator is declared `Comprehension[\(ZZ64,Val),IntMap[\Val\],AnyCovColl,AnyCovColl\]` (`tests/IntMapComprehensionTypedWalk`).
  - These cases still differ from the specification's answer: an empty reduction or comprehension that no declared type directs (`tests/XXXUnwrittenEmptyFloatSumUntypedWalk`, row 716), a comprehension that no declared type reaches (`tests/XXXNestedComprehensionDeclaredTypeWalk`, rows 20 and 717), and a user big operator whose declared result is its own trait (`tests/XXXUserBigOperatorResultTraitWalk`, row 718).
  - The compiled path is unchanged: its checker takes the bound, or the expected type (row 425).
- **The reason.**
  - P-48: a type parameter that the arguments do not fix takes its bound, never `Bottom`, constrained by the call's static return type, which here is the declared type of the value.
  - The desugaring fixes the parameter by `N`. Walk has no static types, so it reads its elements' run-time types for `N`, as the record already read them for the open parameter (F-143; `Specification/basic/inference.tex:367-369` before this change).
  - Measured:
    - with the bound alone, 7 interpreter tests and 1 specification example went red at comprehensions built at `Any` (`explorations/perf-probes/walk-plain-bound/REPORT.md` section 5);
    - with `BottomType`, rows 645, 646, 662 and 703 stood, and with the line typed the base's walk stopped at `body param 1 (i:BOTTOM) got arg 4: ZZ32 of type Int`.

**Provenance.**
- Review-queue item 17 and PLAN item 53. The coordinator settled them under the curator's rule for forks: the walk probe's way 6 + 7 (`explorations/perf-probes/walk-plain-bound/REPORT.md`), under P-48, reading P-59 as covering the elements' run-time types. Both calls are on the curator's review list.
- Climb batch 15, rung B. It closes rows 703, 646, 662, 645 (its claim corrected) and 715, and opens 716, 717, 718 and 719.
- The skill's entries that change:
  - `SKILL.md:126`, "Static parameters";
  - `references/revival-changes.md`, "A type parameter that a call does not fix" (`:108-109`, its first bullet), "A type parameter whose bound names itself, under walk" (`:121-125`) and "The lifted type of a reduction without an identity" (`:219`);
  - `references/library.md:25`, the `SUM` and `PROD` item.

*Lines on `main`.* `Library/FortressLibrary.fss:1314` stands on `main` (L's hunks lie below it).

*For the skill writer.* Skill sentences made false (`compile-ladder/rung-walk-elements/REPORT.md` section 8, and the provenance above): `.claude/skills/fortress-repo/SKILL.md:126`, "Static parameters": "Under walk, one whose bound names the parameter itself, such as `SUM`'s, stays open"; `references/revival-changes.md:108-109`: "Walk still gives `Bottom` to these: a big operator's static parameters with a plain bound (ledger row 424)"; `references/revival-changes.md:124`, "A type parameter whose bound names itself, under walk": "An empty reduction gives `ZZ32`'s identity, whatever the type of its elements (ledger row 645). ... So `Set`'s `BIG UNION` and `BIG INTERSECTION` still stop at their first element ... (ledger row 662)", and its Reason; `references/revival-changes.md:219`: "With a plain bound, it still gives `Bottom`, so `BIG SQCAP`, `BIG SQCUP` and `List`'s `BIG CONCAT` without static arguments stop at their first element (ledger row 424)"; `references/library.md:25`: "Walk runs such a call, but an empty one gives `ZZ32`'s identity (ledger row 645), and `Set`'s `BIG UNION` and `BIG INTERSECTION` stop (ledger row 662)".

### L (`rung-library-factories`, `a0f839ad7`)

#### The change

**Arrays at an element type that is not one of the eight number types.**
- The team's library: `array1[\T, nat s0\]()` was `typecase __thrower[\T\] of () -> Number => vector[\T,s0\]() else => PrimitiveArray[\T,s0\]() end`, and `array2` the same with `matrix` (`Library/FortressLibrary.fss:2239-2244`, `:2599-2604` at a874948ac, under the team's comment "TODO: fix when Number is covariant"). So every element type below `Number` gave a `Vector` or a `Matrix`: `Number` and `AnyIntegral` themselves, and under walk the class `Int` at which walk instantiates a `T` inferred from a `ZZ32` value. The specification says the same: "A one-dimensional array whose elements are a subtype of \TYP{Number} is a vector." (`Specification/basic/expressions/aggregate.tex:165-166`, and `:152-155` for a matrix).
- The tree now: the factories give a `Vector` or a `Matrix` only where the element type is one of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64`, chosen by a `typecase` over a witness of the result type, and a plain array at every other element type (`Library/FortressLibrary.fss:2451-2465`, `:2832-2844`). `array1[\Number,2\]()` and `array[\Number\](3)` are plain (`ProjectFortress/tests/ArrayFactoryAbstractNumber.fss`); the eight types keep their vectors and matrices (`ProjectFortress/tests/ArrayFactoryNumberTypes.fss`); an array built at walk's inferred `Int` is plain, where the specification, instantiating `ZZ32`, gives a vector (`ProjectFortress/tests/XXXArrayInferredElementVectorWalk.fss`).
- The reason: the library bounds a vector's element type by `{ Number, MultiplicativeRing[\T\] }` (`Library/FortressLibrary.fsi:1613`), which `Number`, `AnyIntegral` and `Int` do not meet, so `Vector[\Number,n\]` is not a well-formed type (`Specification/basic/inference.tex:56-58`), and the compiled checker, run over the interpreter's library, refused the team's call four times: "Ill-formed type: Vector[\T,s0\] The static argument T does not satisfy the corresponding bound Number.", the same against `MultiplicativeRing[\T\]`, and both again for `Matrix[\T,s0,s1\]`. A witness of the element type would match a type below a number type and throw `CastError` at the `cast` (measured at `Int`: "CastError" at `Library/FortressLibrary.fss:36:13-27`); the witness of the result type matches exactly.

**`UPLUS` of `IntMap`s on a shared key.**
- The team's library: `NodeIM`'s `opr UPLUS(self, other: SingletonIM[\Val\]): NodeIM[\Val\] = self.add(other)` (`Library/IntMap.fss:494` at a874948ac) kept the many-entry map's value on a shared key, while the reverse order threw `KeyOverlap`. So `{0 |-> 0, 1 |-> 1, 2 |-> 2} UPLUS {1 |-> 9}` was the left map, and an `IntMap` comprehension or map expression with a repeated key kept one value or threw according to the order of its entries: `{k MOD 3 |-> k | k <- 0#4}` kept a value, `{k MOD 2 |-> k | k <- 0#4}` threw.
- The tree now: `self.addNew(other)` (`Library/IntMap.fss:520`); a shared key throws `KeyOverlap` in both orders, for two many-entry maps too, and every `IntMap` comprehension or map expression with a repeated key throws (`ProjectFortress/tests/IntMapUplusSingleton.fss`, `ProjectFortress/tests/IntMapUplusManyEntry.fss`, `ProjectFortress/tests/IntMapComprehensionRepeatedKey.fss`).
- The reason: the library's own comment, "%UPLUS% (disjoint union) throws the %KeyOverlap% exception when a key occurs in both maps." (`Library/IntMap.fss:517-518`), and the one-entry map's `UPLUS`, which already threw (`:339-340`). The specification throws `KeyOverlap` for a map comprehension whose key repeats with a different value (`Specification/basic/expressions/comprehensions.tex:78-80`), and `Map`'s comprehension throws on any repeated key (`Library/Map.fss:161-168`).

#### Provenance

Row 685: the checker probe's trace (`explorations/perf-probes/checker-bound-defects/REPORT.md`, section 3) and the coordinator's call 3 of climb batch 15 under the curator's rule for forks (the probe's section 11, way (a)), the repair in the library's own way (P-27, "The library's own practice is the standard"); the witness of the result type in place of the probe's witness of `T` is this rung's, measured. Row 704: the coordinator's call on L.skeptic.3 of climb batch 14 (PLAN, "Climb batch 14, listed for his review"), by the library's own `addNew`. Climb batch 15, rung L.

*Lines on `main`.* `Library/FortressLibrary.fss:2451-2465` and `:2832-2844` are `:2572-2586` and `:2953-2965` (B's lines above them); `:36:13-27` and `Library/IntMap.fss:517-518`, `:520`, `:339-340` stand.

*For the skill writer.* `REPORT.md` section 7 finds no skill sentence made false: `references/revival-changes.md` speaks of `IntMap`'s `SYMDIFF` only, and `references/library.md:26` of `fill` and `tabulate`.

### O (`rung-duplicates-coverage`, `59b1d0a4d`)

**The change.**

1. **The No Duplicates Rule at two self positions.**
   - The team's checker: it counted two declarations as duplicates only where their parameter types were equivalent and their self parameters stood at one position (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:368` at `a874948ac`). So `f(self, y: S)` beside `f(x: S, self)` in one trait passed it, and the code generator stopped: "Likely bug in static analysis, apparently malformed overload set not rejected" (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411`).
   - The tree now: the checker refuses two functional methods with equivalent parameter types wherever their self parameters stand, "There are multiple declarations of f with the same parameter type", naming the domain of the declaration written first (`OverloadingChecker.scala:441-451`). Tests: `ProjectFortress/compiler_tests/XXXNoDuplicatesRuleSelfPositions`, `XXXNoDuplicatesRuleSelfPositionsPlain`.
   - The reason: the No Duplicates Rule refuses two declarations each applicable to every call to which the other is (`Specification/advanced/overloading.tex:548-549`). The type group's paper of 2011 states "if $d_1 \ms d_2$ and $d_2 \ms d_1$ then $d_1 = d_2$" (`Papers/Types/rules.tick:158-161`). A functional method can be viewed as a top-level function (`Specification/basic/traits.tex`, "Method Declarations"). The code generator's stop above is the measured failure.

2. **Coverage through comprises clauses in the checker.**
   - The team's checker (Steele, May 2012): it defined an inherited abstract method only where the method's parameter type was a subtype of the union of the covering definitions' parameter types (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:103` at `a874948ac`). Its subtype relation splits one trait type through its comprises clause below a union, but compares a tuple with each member alone (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:159-166`). So definitions at `(Ping, Ping)`, `(Ping, Pong)` and `(Pong, Side)` under `g(self, x: Side, y: Side)`, with `Side comprises { Ping, Pong }`, were refused: "Domain (Side, Side) is not a subtype of OR((Ping, Pong),(Pong, Side),(Ping, Ping))".
   - The tree now: the checker splits each position of the parameter types through comprises clauses and asks that every combination of parts lie inside one definition's parameter types, within 10,000 steps and 4,096 combinations, as walk does (`AbstractMethodChecker.scala:124-181`). Test: `ProjectFortress/compiler_tests/AbstractMethodCoveredPairs`. It does not split where a method has static parameters of its own (`ProjectFortress/compiler_tests/XXXAbstractMethodCoveredPairsGeneric`).
   - The reason: the traits chapter defines the method by "definitions whose parameter types are subtypes of it and together cover it" (`Specification/basic/traits.tex:627-648`). Welterweight Fortress's Covered rule counts an abstract declaration covered when it is implemented for all the types comprised (`Papers/Welterweight/fig-covered.tick`). The checker's refusal above is the measured failure.

3. **Walk refuses where its search for a cover does not settle.**
   - The team's walk: it counted any declaration with a body as defining an abstract method (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:404` at `a874948ac`). The revival's first coverage check accepted an object wherever its search did not settle.
   - The tree now: walk refuses there, at a cycle, a symbolic or unreadable type in the split, more than 10,000 steps or more than 4,096 combinations. It counts a definition whose parameter types it cannot read as no cover (`Constructor.java:462-518`). Test: `ProjectFortress/tests/AbstractMethodCoverUnsettledWalk.fss`.
   - The reason: the compiled checker refuses such an object: "Domain (D, D, D, D, D) is not a subtype of (P1, P1, P1, P1, P1)" (`ProjectFortress/compiler_tests/XXXAbstractMethodCoverUnsettled`). Walk's own Meet Rule check refuses where its search does not settle (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:890`, `:894`). The measured failure: walk loaded that object and printed `1`.

**Provenance.** Each change and the decision it follows:
- Row 707: PLAN's line for row 707, listed under "Climb batch 14, listed for his review". It follows the No Duplicates Rule as climb batch 14's rung P restated it (row 696) and the type group's late word (P-26).
- Row 709: PLAN's line for row 709, under P-147 (item 51) and P-60.
- Row 708: the coordinator's call on W.skeptic.1, listed for the curator's review, under P-147.

All three were built in climb batch 15, rung O.

*Lines on `main`.* Its lines stand: no other rung edits `OverloadingChecker.scala`, `AbstractMethodChecker.scala`, `Constructor.java` or `Specification/basic/traits.tex`. `TypeAnalyzer.scala:159-166`, cited for the team's checker, are the base's lines: rung C edits that file, and on `main` the trait case is `:159-164` and the union case that compares a tuple with each member alone is `:181-182`.

*For the skill writer.* Skill sentences made false (`compile-ladder/rung-duplicates-coverage/REPORT.md` section 7; O's skeptic's `leftForGather`, which asked the gather to edit them, and which this batch, writing no skill text, leaves to the skill writer): `.claude/skills/fortress-repo/references/interpreter.md:42`, "If walk's search for a cover does not settle, it does not refuse."; `references/revival-changes.md:66`, "If walk's search for a cover does not settle, walk does not refuse the object (ledger row 708). The compiled checker misses a cover that needs the listed types of two parameters together (ledger row 709)." The new text should also name row 728: walk refuses an object whose one covering definition has a static parameter of its own.

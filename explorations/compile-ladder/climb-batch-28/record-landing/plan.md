<!-- The record-landing workflow's evidence of PLAN.md at d3cd65a81: its headings, the lines that the batch added (157323e51..f56d6516c) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

# PLAN.md

Print a section with `facts-extract.sh 'doc:explorations/coordinator/PLAN.md#HEADING'`, from the worktree.

## Its headings, with their lines

- 7: Where we stand (7 lines)
- 14: The principle for the batches (6 lines)
- 20: The phases (2 lines)
  - 22: Phase 1. Batch 5: what is decided and shares nothing (4 lines)
  - 26: Phase 2. Batch 6: the tower flips, the specification with it (4 lines)
  - 30: Phase 2b. The repair batch from the conformance reviews (4 lines)
  - 34: Phase 3. The checker at a true zero (6 lines)
  - 40: Phase 4. The switch-over (48 lines)
  - 88: Phase 5. microGPT compiles (19 lines)
  - 107: Phase 6. microGPT fast (9 lines)
- 116: Pavol's answers, in the order they are needed (66 lines)
- 182: Work that can start now, with no decision (23 lines)
- 205: Off the path, parked (40 lines)
  - 245: Phase 3's candidates at its end (22 lines)
  - 267: Climb batch N's first run, listed for his review (11 lines)
  - 278: Climb batch 6.5b, listed for his review (10 lines)
  - 288: Climb batch 7b, listed for his review (23 lines)
  - 311: Climb batch 8, listed for his review (19 lines)
  - 330: Climb batch 9, listed for his review (27 lines)
  - 357: Climb batch 10, listed for his review (16 lines)
  - 373: Climb batch 11, listed for his review (13 lines)
  - 386: Climb batch 12, listed for his review (15 lines)
  - 401: Climb batch 13, listed for his review (21 lines)
  - 422: Climb batch 14, listed for his review (17 lines)
  - 439: Climb batch 15, listed for his review (20 lines)
  - 459: Climb batch 15b, listed for his review (4 lines)
  - 463: Climb batch 16, listed for his review (10 lines)
  - 473: Climb batch 17, listed for his review (14 lines)
  - 487: Climb batch 18, listed for his review (15 lines)
  - 502: Climb batch 19, listed for his review (20 lines)
  - 522: Climb batch 20, listed for his review (16 lines)
  - 538: Climb batch 21, listed for his review (18 lines)
  - 556: Climb batch 21b, listed for his review (12 lines)
  - 568: Climb batch 22, listed for his review (14 lines)
  - 582: Climb batch 22c, listed for his review (22 lines)
  - 604: Climb batch 23, listed for his review (12 lines)
  - 616: Climb batch 24, listed for his review (16 lines)
  - 632: Climb batch 25, listed for his review (16 lines)
  - 648: Climb batch 26, listed for his review (17 lines)
  - 665: Climb batch 27, listed for his review (22 lines)
  - 687: Climb batch 28, listed for his review (25 lines)
  - 712: Not classified, to check (13 lines)
- 725: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 742: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 754: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, 157323e51..f56d6516c

- PLAN.md:138, under "Pavol's answers, in the order they are needed":

Before the switch-over, raised by climb batch 28's rung A (`compile-ladder/climb-batch-28/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"):

- PLAN.md:140, under "Pavol's answers, in the order they are needed":

74. A.worker.1 and A.skeptic.4 of climb batch 28's rung A (row 933), a reserved point: the compiled transaction livelocks when an `atomic` block reads a variable it wrote, then commits a nested `atomic` block and reads again, since its read of its own write enters the read set and the next read validates it against the committed value; the compiled array store shares the path once arrays run compiled. Its repair is a change of the compiled transaction beyond shape (ii): which rung takes it, and does it hold any switch-over step? No default on record. Evidence: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:212-228`; row 933's program, exit 124 under `timeout 30` at the base and on the rung.

- PLAN.md:687, under "Off the path, parked > Climb batch 28, listed for his review":

### Climb batch 28, listed for his review

- PLAN.md:689, under "Off the path, parked > Climb batch 28, listed for his review":

The items for him that climb batch 28 (`coordinator/CLIMB-BATCH-28.md`, rungs V, R, A, K, H, S and T landed of seven, phase 4's sixth batch: the integer conversions, the reader side, the arrays' store, the checker's partial order, the run time's threads, `System`'s natives and `args`, and the code generator's api trait) left (`compile-ladder/climb-batch-28/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`").

- PLAN.md:691, under "Off the path, parked > Climb batch 28, listed for his review":

- V.worker.1 and V.skeptic.1 of climb batch 28's rung V: should QuickCheck's `genZZ.perturb` keep the low 64 bits of a `ZZ` beyond `ZZ64` (`signed((obj BITAND 18446744073709551615).asNN64)`) until row 431's right-shift fix, as P-161's "with their values unchanged" reads, instead of raising `IntegerOverflow` on `.asZZ64`, which the review's option 6 names for this line? Default: `.asZZ64`, as landed; no gated run reaches such a value under walk (row 387). Evidence: `Library/QuickCheck.fss:322`; row 431; old 'perturb 2^70+7: 1001751898', new 'perturb 2^70+7: IntegerOverflow' (`compile-ladder/rung-integer-conversions/SKEPTIC.md`).

- PLAN.md:692, under "Off the path, parked > Climb batch 28, listed for his review":

- V.worker.2 and V.skeptic.2 of climb batch 28's rung V: `ZZ`'s `asZZ64` and `asNN64` bind two new helpers, departing from fork V1's default of no Java beyond its three pairs, since `ZZ` has no low-bits form to wrap after its `narrow` and `widen` went; P-162 supports new helpers for carried types. Default: as landed. Evidence: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleArbitraryPrecisionArith.java:146-157`; `coordinator/CLIMB-BATCH-28.md:396`.

- PLAN.md:693, under "Off the path, parked > Climb batch 28, listed for his review":

- R.worker.1, R.skeptic.1 and H.skeptic.1 of climb batch 28's rungs R and H (row 930), a reserved point: on the compiled path no `catch` saw a helper's raise of `IOFailure` or `FileNotFoundException`, since `Utility.makeFortressException(name, msg)` sought a constructor at `java.lang.String`, which the prelude's exception lacks. Rung R, whose brief reserved an edit of a run-time class, asked which change takes the repair, a run-time rung before N5 or N5; rung H, whose brief named neither, repaired it, since its own `FailCalled` test needs it and `basic/expressions/try.tex`, "Try Expressions", settles it, so the 13 compiled raises with a message reach a `catch`. Default: keep H's repair, as landed; the gather promoted R's pair to `FileOpsRaiseCaughtCompiled` and closed row 930 by H's commit. Way not taken: revert it and build `FailCalled` by reflection in `runtime.java`, which leaves those raises uncatchable. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:28-31`; `ProjectFortress/compiler_tests/FileOpsRaiseCaughtCompiled.fss`; `ProjectFortress/compiler_tests/HelperRaiseMessageCompiled.fss`; `coordinator/CLIMB-BATCH-28.md:544`, `:546`, `:673-675`.

- PLAN.md:694, under "Off the path, parked > Climb batch 28, listed for his review":

- R.judge.1 of climb batch 28's rung R: `FileWriteStream`'s write of a string that is not flat makes one write and no flush, where `Writer`'s flushes after it and fork R2 says "as Writer's are". Option 1, as landed: no flush, which keeps the file stream's buffering, so its other writes behave as before. Option 2: a flush after it, as `Writer` and the team's `Writer` did, one line, so a rope's write would flush where a flat string's does not. Lines stay whole either way. Default: option 1, as landed. Evidence: `Library/File.fss:57`; `Library/Writer.fss:32-35`; `coordinator/CLIMB-BATCH-28.md:406`; `compile-ladder/rung-io-reader/JUDGE.md`.

- PLAN.md:695, under "Off the path, parked > Climb batch 28, listed for his review":

- A.skeptic.1 of climb batch 28's rung A (row 934): on the compiled path the outer handler of an `atomic` block nested in another in one body takes the inner block's abort, since `CodeGen.forAtomicBlock` writes its exception-table entry before it visits its body, so updates are lost at four threads, at the base and on the rung alike, and the compiled array store will share the path; it is row 888's mechanism for `atomic`. Which rung of the code generator takes it, with row 888's `forTry`? No default on record. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1774-1786`; row 934; `compile-ladder/rung-array-store/SKEPTIC.md`.

- PLAN.md:696, under "Off the path, parked > Climb batch 28, listed for his review":

- A.worker.2 and A.skeptic.5 of climb batch 28's rung A (row 466): under walk an immutable array's second initialisation now keeps the first value, where the base's glue overwrote it, since both arrays share one store; fork A7 ("the store keeps today's rule that a second initialisation of an element is ignored") reads as settling it. Accept row 466's one rule for both arrays, or keep the overwrite for immutable arrays? Default: one rule, as landed. Evidence: `ProjectFortress/tests/ArrayInitOnceWalk.fss`; `coordinator/CLIMB-BATCH-28.md:421`; the base's `interpreter/glue/prim/PrimImmutableArray.java:73-82`.

- PLAN.md:697, under "Off the path, parked > Climb batch 28, listed for his review":

- A.worker.3 and A.skeptic.6 of climb batch 28's rung A: the old glue classes `PrimitiveArray.java`, `PrimImmutableArray.java` and `PrimImmutableRR64Array.java` under `interpreter/glue/prim/` are left unused, as fork R3 leaves the reader's. Does their removal belong to the names batch's clean-up? Default: left, as landed. Evidence: `coordinator/CLIMB-BATCH-28.md:407`; `ProjectFortress/LibraryBuiltin/NativeArray.fss:12-45`.

- PLAN.md:698, under "Off the path, parked > Climb batch 28, listed for his review":

- A.worker.4 and A.skeptic.7 of climb batch 28's rung A, told, not asked: rungs A and S both edit `StringPrim.java`, A in `grindProgramArgs`, S in `registerProgramArgs`; the hunks differ and applied cleanly in the gather, and S's Fortress `args` leaves `GetProgramArgs` unused after the merge. Default: as landed. Evidence: `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/StringPrim.java:122-151`.

- PLAN.md:699, under "Off the path, parked > Climb batch 28, listed for his review":

- A.worker.5 and A.skeptic.2 of climb batch 28's rung A (row 932): under walk a `PrimitiveArray`'s or `PrimImmutableArray`'s subscript out of bounds ends the run with a raw `ArrayIndexOutOfBoundsException` and no Fortress location, since `opr [ ]` calls the unchecked `get` and `put`, not `offset`; an immutable array lost the base glue's located error 'Array index 7 out of bounds, length=3', and the uninitialised-read message now names `JavaArrayStoreObject`. Subscript through `offset(i)` in a later rung, or restore a located error in `ArrayOps` now? Default: as landed, the brief kept `opr [ ]` as written. Evidence: `ProjectFortress/LibraryBuiltin/NativeArray.fss:17`, `:19`, `:29`; `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ArrayOps.java:31-41`.

- PLAN.md:700, under "Off the path, parked > Climb batch 28, listed for his review":

- A.skeptic.3 of climb batch 28's rung A, by reading, not measured: inside a compiled transaction `FortressArrayStore.init`'s read of an empty element is not in the read set, so two transactions that initialise one element at once both answer true and the later commit's value stays, where walk's `AtomicArray.init` reads through its transactional cell. Record the empty read with a sentinel, or leave the case under row 466, since a second initialisation is the program's error? Default: left under row 466, the worker's decision 4. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java:60-66`; `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:212-228`.

- PLAN.md:701, under "Off the path, parked > Climb batch 28, listed for his review":

- K.worker.1 and K.skeptic.1 of climb batch 28's rung K (row 935): should a later rung make the order of a call's overloadings a property of the program, for instance by declaration position? It now decides only a tie among the most specific candidates and the order of the rest, yet it follows the hash order of the overloadings, so two builds of one commit at two tree paths, and one build by a direct compile and through the harness, give two orders. Such a change would move tie choices and message orders once. No default on record. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:870-874`; row 935; `compile-ladder/rung-checker-partial-order/REPORT.md`, section 3.

- PLAN.md:702, under "Off the path, parked > Climb batch 28, listed for his review":

- K.worker.2 of climb batch 28's rung K, noticed by reading, not measured: `Common.scala`'s two `min(Ordering.fromLessThan(smaller))` over subtyping of self types are also a partial order, whose answer follows the list's order where two getters' self types are unrelated. Should they move onto `PartialOrder.minimal`? No default on record. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Common.scala:69`, `:82`; `ProjectFortress/src/com/sun/fortress/scala_src/useful/PartialOrder.scala`.

- PLAN.md:703, under "Off the path, parked > Climb batch 28, listed for his review":

- H.worker.1 and H.skeptic.2 of climb batch 28's rung H: `printTaskTrace` reads `runtimeSystem.BaseTask`'s package-private `parent` by reflection, since the brief kept `runtimeSystem/` out of the rung. Way not taken: a one-line public `parent()` on `BaseTask`, used by `runtime.java`, when a later rung edits `runtimeSystem/`. Default: as landed. Evidence: `ProjectFortress/src/com/sun/fortress/nativeHelpers/runtime.java:71-90`; `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:46`.

- PLAN.md:704, under "Off the path, parked > Climb batch 28, listed for his review":

- T.worker.1 and T.skeptic.1 of climb batch 28's rung T (row 941): may a type assumption choose an abstract declaration, and what does the call run then? The compiled path runs the object's body ('d'), while walk stops with an `InterpreterBug`, 'has neither body nor def instanceof Method'; the section does not say. No default on record. Evidence: `Specification/basic/expressions/type-annotation.tex:45-48`; row 941; `compile-ladder/rung-codegen-trait-table/REPORT.md`, section 11.

- PLAN.md:705, under "Off the path, parked > Climb batch 28, listed for his review":

- T.worker.2 and T.skeptic.2 of climb batch 28's rung T (rows 940 and 942): fix row 940 in `CodeGen.methodsNamed`, as this rung did in `dumpMethodChaining`, or once in `STypesUtil.gatherMethods`, which would cover every code-generator site but is also the checker's code (`OverloadingChecker.scala:394`, `AbstractMethodChecker.scala:90`) and so takes P-148's measure? Row 942 meets the same api-header name at the dispatch generator. No default on record. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6502`; `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1651`; `compile-ladder/rung-codegen-trait-table/REPORT.md`, sections 4 and 11.

- PLAN.md:706, under "Off the path, parked > Climb batch 28, listed for his review":

- gather.1 of climb batch 28, told, not asked: the order rule gave the manifest's order, V, R, A, K, H, S, T. Every pair of rungs that two shared files ordered both ways (V and A, R and A, A and H, R and H) kept the manifest's order, and every pair one file ordered agreed with it; A's lines that V's and R's hunks shifted were re-anchored by symbol where the gather folded them, and the landed REPORT.md files cite their branches' lines. Default: as landed. Evidence: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:53-60` (A's hunk, above V's, H's and R's) against `Library/FortressLibrary.fss:2438-2453` (A's store traits, below V's and R's); `compile-ladder/climb-batch-28/RECORD.md`, "The rungs applied: the order and why".

- PLAN.md:707, under "Off the path, parked > Climb batch 28, listed for his review":

- gather.2 of climb batch 28 (rows 934 and 937): rung A's skeptic and rung H's skeptic each recorded the compiled `atomic` block nested in another whose abort the outer handler takes, A's through a conflict's abort and lost updates, H's through `abort` and a rerun outer block, both at the exception-table entry that `CodeGen.forAtomicBlock` writes before its body. Two rows, or one a duplicate of the other? Default: two rows, as landed, row 937 naming row 934 among its siblings (row 934's notes are full). Evidence: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1774-1786`; rows 934 and 937; `ProjectFortress/compiler_tests/XXXNestedAtomicAbortCompiled.fss`.

- PLAN.md:708, under "Off the path, parked > Climb batch 28, listed for his review":

- gather.3 of climb batch 28 (rows 932 and 939): rung S's skeptic's row of a subscript outside a primitive array, `System`'s `args` among them, measured on the base's glue ('Array index 4 out of bounds, length=4' in an `InterpreterBug`), is rung A's row 932 on the merged tree, where A's store answers it with a raw `ArrayIndexOutOfBoundsException`: one defect, `opr [ ]` calling `get` and not `offset`. The gather added it as row 939 and made it a duplicate of row 932, whose notes have no room for S's `args`. Default: as landed. Evidence: `ProjectFortress/LibraryBuiltin/NativeArray.fss:17`, `:19`, `:29`; `Library/System.fss:29-33`; rows 932 and 939.

- PLAN.md:709, under "Off the path, parked > Climb batch 28, listed for his review":

- gather.4 of climb batch 28, told, not asked: the entries and lines the landing makes false that the gather does not write, left for the coordinator's routing: F-32 and F-299, at the merged count of 372 of 424 bindings on helpers and 52 on glue, the 52 being `IntLiteral`'s 21, `FloatLiteral`'s 3 and `Reflect`'s 28; F-34, F-53, F-54, F-172, F-281, F-288, F-327, F-328 and F-330; P-164; PLAN's "Where we stand" and phase 4's lines on the natives, N4's reader rung, D2, `System`, P-161, row 929 and the code generator's kinds, and item 69; the skill's `interpreter.md`, "Natives", its carriers, and `compiler.md:76`; and the javadoc of `OWN_OPERATIONS`. Evidence: `explorations/coordinator/FACTS.md:30`, `:134`; `explorations/coordinator/PLAN.md:10`, `:47`, `:130`; `ProjectFortress/src/com/sun/fortress/interpreter/glue/NativeApp.java:42-46`; `Specification/appendices/changes.tex:4627`, `:4672-4674`.

- PLAN.md:710, under "Off the path, parked > Climb batch 28, listed for his review":

- review.1 of climb batch 28's merged-diff review, told, not asked: beyond gather.4's list, 22 FACTS entries and about 90 open ledger rows that the batch did not write cite, without the commit they were true at, lines of a file the batch edited that the landing moved (each cited line read at `157323e51` and at `HEAD`): F-35, F-44, F-63, F-78, F-85, F-175, F-180, F-255, F-268, F-276, F-279, F-285, F-286, F-302, F-303, F-304, F-305, F-306, F-307, F-310, F-312 and F-315, and rows such as 147 and 315. The review re-anchored only the batch's own lines (F-321; rows 324 and 928; this list's entries A.skeptic.1 and gather.2). No default on record; the record landing can re-anchor the FACTS entries as it brings them in line. Evidence: `explorations/coordinator/FACTS.md:137` (F-307's `LibraryBuiltin/FortressBuiltin.fss:380`, now `:388`); `explorations/fortress-gap-ledger.md:65` (row 147's `Library/FortressLibrary.fsi:590`).


## The lines added after the landing, f56d6516c..d3cd65a81

None.

## The other lines that name a changed entry or row

- PLAN.md:10, under "Where we stand", 1746 characters, names F-53, F-321 and rows 895, 929: At the last landed gate, climb batch 27's (`29e52a3dc`, pushed at `209192b67`), the distance is 0 and the checker count 0 over the fourteen components (F-53; | Neither stage reads `System`'s two helper strings, and against the interpreter's prelude the checker cannot read their class (F-321; | row 929). | row 895).
- PLAN.md:36, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:51, under "The phases > Phase 4. The switch-over", 202 characters, names row 927: - The families that wait on a known obstacle, each with its home: rows 872, 915 and 927, a `Char` past U+FFFF;
- PLAN.md:54, under "The phases > Phase 4. The switch-over", 1087 characters, names row 926: `FileReadStream` and `Reader` become plain Fortress objects over a field, and their glue bindings go, with `FileWriteStream` and its 5 bindings, which the writer rung left on glue while `File` stays native (row 926;
- PLAN.md:58, under "The phases > Phase 4. The switch-over", 1076 characters, names row 733: climb batch 27's merged tree is not measured), each kind in its ledger row: rows 624, 733, 818, 819 and 822, row 818 narrowed by climb batch 27's rung G to a call with an assumption at some of its dispatched arguments (F-325);
- PLAN.md:63, under "The phases > Phase 4. The switch-over", 455 characters, names row 929: - Row 929, from climb batch 27's gate: the compiled checker crashes, 'Comparison method violates its general contract!', at a call with 32 or more applicable candidates, since it sorts them by a partial order;
- PLAN.md:66, under "The phases > Phase 4. The switch-over", 691 characters, names rows 895, 896: review-queue item 355): at 05:07 UTC on 2026-11-06 he took option 1, so a rung of the next batch moves `getEnvironment` and `getProperty` from `nativeHelpers/systemOps` into `stringOps`, with their two binding strings (`Library/System.fss:41`, `:51`) and a compiled guard, and row 895 closes when it lands. | Beside it, row 896, `getProperty` at an empty name, `""` or an `EmptyString`, raises Java's `IllegalArgumentException`, which no `catch` sees, under walk: at `""` on climb batch 26's base already, and at an `EmptyString` since its rung T (`reviews/batch-26-review.md`, Part 1, split 7, and finding C).
- PLAN.md:75, under "The phases > Phase 4. The switch-over", 936 characters, names rows 349, 502, 858, 859: `narrow`, `widen`, `unsigned`, `signed` and `big` kept as the low-bits forms and declared on every type where they apply (rows 858 and 859); | `ZZ`'s `narrow` and `widen` deleted, their callers in `Library/Format.fss`, `Library/QuickCheck.fss`, the demo `sudoku.fss` and `XXXZZNarrowRungP` moved onto the getters (rows 502 and 349);
- PLAN.md:130, under "Pavol's answers, in the order they are needed", 259 characters, names row 926: Does `FileWriteStream`, left on its glue with its 5 bindings while `File` stays native (row 926), move with the reader rung, which ends `File`'s nativeness? No default on record for fork W5;
- PLAN.md:229, under "Off the path, parked", 196 characters, names row 349: - Climb batch 6.5's rung P stated `narrow` on `ZZ` (rows 349 and 442) and reworded `MaybeRungM`'s comment;
- PLAN.md:284, under "Off the path, parked > Climb batch 6.5b, listed for his review", 218 characters, names row 527: - Under walk an array of a static size from 2^31 to 2^32−1 dies with a raw `NegativeArraySizeException` (row 527);
- PLAN.md:675, under "Off the path, parked > Climb batch 27, listed for his review", 202 characters, names row 928: - W.skeptic.4 of climb batch 27's rung W (row 928): a program's object below `JavaBufferedWriter` stops at its first inherited native.
- PLAN.md:685, under "Off the path, parked > Climb batch 27, listed for his review", 276 characters, names row 929: - Finding A of the post-batch review, the distance's two crash rows in `Char` (row 929): for later gates, the distance report-only, as P-39 has it, or a crash that no rung declared red in the distance as in the count? Default: report-only, the record's.

## The lines that look stale at d3cd65a81

From `plan-moves.py --stale-at d3cd65a81`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:79, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, the walk half of the numeral switch (P-76; `reviews/numeral-switch-judgement.md` section 4.4), in the batch whose step gives walk the checker's static

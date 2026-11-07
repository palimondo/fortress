<!-- The record-landing workflow's evidence of PLAN.md at 38887293f: its headings, the lines that the batch added (ed8652dc0..a2f0b5cf2) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

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
  - 40: Phase 4. The switch-over (50 lines)
  - 90: Phase 5. microGPT compiles (19 lines)
  - 109: Phase 6. microGPT fast (9 lines)
- 118: Pavol's answers, in the order they are needed (72 lines)
- 190: Work that can start now, with no decision (23 lines)
- 213: Off the path, parked (40 lines)
  - 253: Phase 3's candidates at its end (22 lines)
  - 275: Climb batch N's first run, listed for his review (11 lines)
  - 286: Climb batch 6.5b, listed for his review (10 lines)
  - 296: Climb batch 7b, listed for his review (23 lines)
  - 319: Climb batch 8, listed for his review (19 lines)
  - 338: Climb batch 9, listed for his review (27 lines)
  - 365: Climb batch 10, listed for his review (16 lines)
  - 381: Climb batch 11, listed for his review (13 lines)
  - 394: Climb batch 12, listed for his review (15 lines)
  - 409: Climb batch 13, listed for his review (21 lines)
  - 430: Climb batch 14, listed for his review (17 lines)
  - 447: Climb batch 15, listed for his review (20 lines)
  - 467: Climb batch 15b, listed for his review (4 lines)
  - 471: Climb batch 16, listed for his review (10 lines)
  - 481: Climb batch 17, listed for his review (14 lines)
  - 495: Climb batch 18, listed for his review (15 lines)
  - 510: Climb batch 19, listed for his review (20 lines)
  - 530: Climb batch 20, listed for his review (16 lines)
  - 546: Climb batch 21, listed for his review (18 lines)
  - 564: Climb batch 21b, listed for his review (12 lines)
  - 576: Climb batch 22, listed for his review (14 lines)
  - 590: Climb batch 22c, listed for his review (22 lines)
  - 612: Climb batch 23, listed for his review (12 lines)
  - 624: Climb batch 24, listed for his review (19 lines)
  - 643: Climb batch 25, listed for his review (17 lines)
  - 660: Climb batch 26, listed for his review (19 lines)
  - 679: Climb batch 27, listed for his review (19 lines)
  - 698: Not classified, to check (13 lines)
- 711: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 728: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 740: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, ed8652dc0..a2f0b5cf2

- PLAN.md:9, under "Where we stand":

- **Runs.** microGPT runs under walk: its quick walk check gave both programs 7 of 7 at every landing from climb batch 11 to climb batch 26 (each gate's `summary.txt`, its `# microgpt-walk` line; `reviews/batch-26-review.md`, section 5), and the 52 team demos reach their end, on climb batch 27's tree after its repair of row 921 too (F-283; item 73). Walk is not timed (`coordinator/PLAN-history.md`, "The timed pairs of the walk check dropped, 2026-10-23"). On the compiled path microGPT's 18 components stop at name resolution until the switch-over (F-97).

- PLAN.md:134, under "Pavol's answers, in the order they are needed":

Before the next batch, raised by climb batch 27 (`compile-ladder/climb-batch-27/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"):

- PLAN.md:136, under "Pavol's answers, in the order they are needed":

68. N.skeptic.1, N.judge.1, C.worker.2, C.skeptic.1, S.worker.1, S.skeptic.1, S.judge.1, S.judge.2, A.worker.1, A.skeptic.1, T.worker.1, T.skeptic.1, T.judge.1, T.judge.2 and gather.2 of climb batch 27: the container's disk allowance was spent through the batch (31 MB to 443 MB free), so rungs S and T never started, rung N's skeptic never ran, rung C ran neither stage nor `ant testQuick`, and the gather's first build of the specification died 'No space left on device'. Who frees it, by the `cloud-container` skill's rules, and are S and T relaunched from the start of their briefs (S's judge ruled a repair round; T's judge gave (a) relaunch before this batch's gate or (b) carry T unchanged to climb batch 28, which no conflict prevents) or moved to climb batch 28? No default on record for the disk; for T, (b) costs nothing in conflicts. Evidence: `compile-ladder/rung-system-string-ops/SKEPTIC.md:1`, `compile-ladder/rung-codegen-trait-table/SKEPTIC.md:1`, `compile-ladder/rung-number-open/JUDGE.md`, `compile-ladder/climb-batch-27/RECORD.md`, "Not landed".

- PLAN.md:138, under "Pavol's answers, in the order they are needed":

73. Answered: gather.5 of climb batch 27 (row 921; P-79), `turnersParaffins0` stopped on the merged tree at `Library/Map.fss:165`, 'Unexpected method value ... given receiver (0: ZZ32 asif ZZ32)'. The judge's ruling on the merged-diff review took way (b), walk fixed first: row 921 fixed in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:96-97`, `:119-138`, the demo kept as the team wrote it, and 52 of 52 demos reach their end (F-283). Row 919 stays open. Evidence: `compile-ladder/climb-batch-27/JUDGE-review.md`; `compile-ladder/climb-batch-27/REPAIR-review.md`, sections 1 and 2.

- PLAN.md:140, under "Pavol's answers, in the order they are needed":

Before the batch that moves N4's reader side, raised by climb batch 27's rung W:

- PLAN.md:142, under "Pavol's answers, in the order they are needed":

69. W.worker.1 and W.skeptic.1 of climb batch 27's rung W (row 926): does `FileWriteStream`, left on its glue with its 5 bindings because walk builds every object of a native component through a glue class and evaluates its fields once without the object, move to the reader rung, which ends `File`'s nativeness? Default: as landed, it moves with the reader rung (fork W5 not taken). Evidence: `compile-ladder/rung-io-writer/REPORT.md:138`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/NativeConstructor.java:71-93`.

- PLAN.md:144, under "Pavol's answers, in the order they are needed":

Before the switch-over, raised by climb batch 27's rungs N and G:

- PLAN.md:146, under "Pavol's answers, in the order they are needed":

70. N.worker.2 of climb batch 27's rung N (row 918): the checker over the one library accepts a program trait's functional `+` beside the library's imported array `+`, a pair it refuses inside one component and walk refuses at load; is that a gap to fix at the switch-over, or is overloading across an import outside the rules? No default on record. Evidence: `ProjectFortress/tests/NumberOpenTraitPlusBesideArrayWalk.fss`; `compile-ladder/rung-number-open/REPORT.md:147`.

- PLAN.md:147, under "Pavol's answers, in the order they are needed":

71. G.worker.1 and G.skeptic.1 of climb batch 27's rung G (row 818): should the code generator compile a call with an assumption at some dispatched arguments as the resolved declaration where no other overload applies at the assumed positions? It would compile the library's `concatAndBalanceIfNecessary(s1 asif String, s2)`. Default: refused, fork G2, as landed. Evidence: `Library/String.fss:67`, `:69`; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6420`, `:6566`.

- PLAN.md:148, under "Pavol's answers, in the order they are needed":

72. G.skeptic.2 of climb batch 27's rung G: should the generic forms be built, a generic method on an assumed receiver and an overloaded generic function under an assumption? Building them needs a static-body form of generic closures; the library's `csa(reflect(n), t asif T)` is such a call. Default: refused, each with its message, as landed. Evidence: `Library/ChunkedSparseArray.fss:124`; `ProjectFortress/compiler_tests/XXXAsIfGenericMethodCompiled.test:3`, `XXXAsIfGenericFunctionCompiled.test:3`.

- PLAN.md:679, under "Off the path, parked > Climb batch 27, listed for his review":

### Climb batch 27, listed for his review

- PLAN.md:681, under "Off the path, parked > Climb batch 27, listed for his review":

The items for him that climb batch 27 (`coordinator/CLIMB-BATCH-27.md`, rungs F, N, G, E, I, A, C and W landed of ten, phase 4's fifth batch: `Number` opened, the integers' and the floats' hard-set natives, `Char`'s `asExprString`, the writer side, the carrier and the meaning of `SEQV`, and the code generator's `asif`) left (`compile-ladder/climb-batch-27/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"); the questions that wait on him are items 68 to 73 above. Each is reversible, and the default is what landed.

- PLAN.md:683, under "Off the path, parked > Climb batch 27, listed for his review":

- N.judge.2 of climb batch 27's rung N, a reserved point: the revival test `CoercionOverloadRungC` loaded on the base and is refused at load once `Number` opens, failing the Meet Rule against the library's array `+`, so its `Wide` now excludes `Number`; the checker's half is row 918 (item 70). Default: as landed. Evidence: `ProjectFortress/tests/CoercionOverloadRungC.fss:6`.

- PLAN.md:684, under "Off the path, parked > Climb batch 27, listed for his review":

- I.worker.1 and I.worker.2 of climb batch 27's rung I, told, not asked: the integers' rung wrote ten new helpers, not the plan's nine, since `ZZ`'s right shift needs its own at the count `Integer.MIN_VALUE`; Appendix I's natives effect is corrected by the gather to the merged tree, 341 of 443 bindings naming a helper and 102 a glue class. Default: as landed. Evidence: `compile-ladder/rung-natives-shift-power/REPORT.md:34`; `Specification/appendices/changes.tex:4625`.

- PLAN.md:685, under "Off the path, parked > Climb batch 27, listed for his review":

- C.worker.1 of climb batch 27's rung C: the parser's two hexadecimal gaps were already row 898, which the rung closed with `CharExprStringReadBack`; the brief's new row went to the measured defect of a character past U+FFFF written as itself (row 924, `XXXCharLiteralSupplementary`). Is that the intended use? Default: as landed. Evidence: `compile-ladder/rung-char-expr-string/REPORT.md:115`.

- PLAN.md:686, under "Off the path, parked > Climb batch 27, listed for his review":

- C.skeptic.2 of climb batch 27's rung C (row 925): eleven of the parser's own short names, as `BETA` and `delta`, are refused as character literals, since `UnicodeHexChar`'s error production commits on two hexadecimal digits; should a later rung give it a check on the closing mark? Default: gated by `XXXCharLiteralShortName`, which the gather wrote, and not repaired. Evidence: `ProjectFortress/src/com/sun/fortress/parser/Literal.rats:473-477`; `ProjectFortress/tests/XXXCharLiteralShortName.fss`.

- PLAN.md:687, under "Off the path, parked > Climb batch 27, listed for his review":

- W.worker.2 and W.skeptic.2 of climb batch 27's rung W: `BufferedWriter` now passes every write through and keeps no buffer, while its api still takes a size; buffering by size would need `atomic` around I/O. Default: as landed. Evidence: `Library/Writer.fss:38`; `Library/Writer.fsi:24`.

- PLAN.md:688, under "Off the path, parked > Climb batch 27, listed for his review":

- W.skeptic.3 of climb batch 27's rung W: an uncaught missing file under walk now prints `FileNotFoundException` at `Library/Writer.fss:21` and no longer names the file, and the same holds for `IOFailure` after a close; should the library's exceptions carry the helper's message? Default: as landed. Evidence: `compile-ladder/rung-io-writer/SKEPTIC.md`, "My programs".

- PLAN.md:689, under "Off the path, parked > Climb batch 27, listed for his review":

- W.skeptic.4 of climb batch 27's rung W (row 928): a program's object below `JavaBufferedWriter` loads and stops at its first inherited native, since the trait cannot list its private native object in a `comprises` clause. Default: gated as a design limit, as landed. Evidence: `Library/FortressLibrary.fss:1948`; `Library/FortressLibrary.fsi:553`.

- PLAN.md:690, under "Off the path, parked > Climb batch 27, listed for his review":

- A.worker.2 and A.skeptic.2 of climb batch 27's rung A: should row 321's class become `implementation gap (prelude)` now that its claim narrows to the prelude's `Object`? Default: kept `implementation gap (runtime)`, as landed. Evidence: row 321; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355`.

- PLAN.md:691, under "Off the path, parked > Climb batch 27, listed for his review":

- E.worker.2 of climb batch 27's rung E, told, not asked: a second long tuple holding the string `"(immutable)"` in the revival test `TransposedMatrixAndFreeze` was respelled beyond the one line the brief named, in the same form. Default: as landed. Evidence: `ProjectFortress/tests/TransposedMatrixAndFreeze.fss:23-24`.

- PLAN.md:692, under "Off the path, parked > Climb batch 27, listed for his review":

- E.worker.3 of climb batch 27's rung E, told, not asked: the objects chapter's note "Value objects and properties are not yet supported." was false for value objects once both paths compare them field by field; the gather revised it to say that properties are not supported and that of value objects only strict equivalence is. Default: as landed. Evidence: `Specification/basic/objects.tex:15-17`.

- PLAN.md:693, under "Off the path, parked > Climb batch 27, listed for his review":

- The relayed user request of the batch's run, "A session in this cloud container cannot delete a branch on GitHub" — not "this" but "a", which N.worker.1, N.skeptic.2, N.judge.3, W.worker.3, S.worker.2, S.judge.3, E.worker.1, E.skeptic.1, G.worker.2, G.skeptic.3 and gather.4 met: the "this" before "cloud container" becomes "a", so that the branch-deletion rule is stated for a session in any cloud container, not this one; N.judge.3's and gather.4's reading, "A session" for "This session", is not it, since the quoted sentence already opens with "A". The skills and the boot note already say "a cloud container" (`.claude/skills/cloud-container/SKILL.md:40`, `.claude/skills/fortress-repo/references/committing.md:41`, `.claude/skills/coordinator/SKILL.md:235`, `explorations/coordinator/BOOT.md:50`); the merged-diff review applied it to the held list (`explorations/coordinator/HELD.md:43`, `:132`). One copy stays under `.claude/`, which no agent of the batch edits, for the skill writer: `.claude/skills/fortress-repo/references/sources.md:1072`, 'since the harness refuses it from this container'. Default: as applied.

- PLAN.md:694, under "Off the path, parked > Climb batch 27, listed for his review":

- judge.1 of climb batch 27's merged-diff review, told, not asked: the repair fixed row 921 in walk, way (b), not row 919, and nothing on record settles that choice. By the specification an assumption holds only at its immediately enclosing invocation (`Specification/basic/expressions/type-annotation.tex:42-53`), so a fix of row 919 alone would also make `turnersParaffins0` run; (b) had a ready test and one site (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:96-97`, `:119-138`) and is owed by the specification in its own right, while row 919's fix must drop the wrapper inside tuple and varargs elements and at bindings and `if` branches (`NonPrimitive.java:117-126`; `Evaluator.java:109-116`; the library binds assumptions at `Library/ReflectiveQuickCheck.fss:78`, `:94`, `:256`, `:313`). Default: as repaired, row 919 open for a later batch. Evidence: `compile-ladder/climb-batch-27/JUDGE-review.md`, "What each side got right".

- PLAN.md:695, under "Off the path, parked > Climb batch 27, listed for his review":

- gather.1 of climb batch 27, told, not asked: the order rule met a cycle (A before E by the manifest, E before I by the shared files, I before A by the manifest; and A before C before W by the shared files against W before A by the manifest), so the gather applied F, N, G, E, I, A, C, W, keeping every order that the shared files give one way and breaking the manifest's A before E and W before A, and re-anchored rung A's cited lines by symbol. No hunk conflicted. Default: as landed. Evidence: `compile-ladder/climb-batch-27/RECORD.md`, "The rungs applied".

- PLAN.md:696, under "Off the path, parked > Climb batch 27, listed for his review":

- gather.3 of climb batch 27, told, not asked: FACTS that the landing made stale, F-32, F-299, F-57, F-34, F-308, F-131, F-151, F-311, F-318 and F-321 among them, and PLAN's phase 4 lines of the batch's own rungs, are left to the coordinator's routing after the landing, as the batch record plans; the gather's count of the merged tree is 341 of 443 live bindings naming a helper and 102 a glue class, the 5 of `FileWriteStream` among them. Evidence: `coordinator/CLIMB-BATCH-27.md:1412`; `compile-ladder/climb-batch-27/RECORD.md`, "The count of the bindings".


## The lines added after the landing, a2f0b5cf2..38887293f

None.

## The other lines that name a changed entry or row

- PLAN.md:10, under "Where we stand", 1421 characters, names F-53: At the last landed gate, climb batch 26's (`a12ab5c60`), the distance is 0 and the checker count 0 over the fourteen components (F-53;
- PLAN.md:12, under "Where we stand", 1254 characters, names row 818: and the next code-generator rungs, `asif` (row 818) and the 2-D and 3-D ranges (row 733).
- PLAN.md:36, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:50, under "The phases > Phase 4. The switch-over", 1256 characters, names row 113: Today walk says that every two are equal (row 113) and the compiled path that no two are (the review, section 2.4, point 12).
- PLAN.md:51, under "The phases > Phase 4. The switch-over", 459 characters, names rows 441, 442: about 9 new helpers, the shifts of `NN32` and `NN64` (row 442) and the five powers (row 441), the values held by P-69 and P-153.
- PLAN.md:53, under "The phases > Phase 4. The switch-over", 752 characters, names row 861: row 861 closes with `--settled` at its landing (review-queue item 354, now in (a)).
- PLAN.md:54, under "The phases > Phase 4. The switch-over", 166 characters, names row 872: - The families that wait on a known obstacle, each with its home: row 872;
- PLAN.md:62, under "The phases > Phase 4. The switch-over", 912 characters, names row 818: - The code generator over the one library (F-34): under the switch-over's setting it refuses 38 declarations of the fourteen components in 10 kinds (climb batch 26's rung L tree), each kind in its ledger row: rows 624, 733, 818, 819 and 822;
- PLAN.md:67, under "The phases > Phase 4. The switch-over", 842 characters, names row 321: - Row 321: once the compiled path reads the one library, every object inherits the `getter toString` of its `trait Object`, so printing an object with no `asString` overflows the stack (row 321);
- PLAN.md:74, under "The phases > Phase 4. The switch-over", 286 characters, names row 442: row 442 holds the same for `NN32` and `NN64` only, and no row holds `ZZ`'s.
- PLAN.md:128, under "Pavol's answers, in the order they are needed", 360 characters, names row 861: Answered: which form `Char`'s `asExprString` writes for a character outside ASCII (row 861).
- PLAN.md:207, under "Work that can start now, with no decision", 680 characters, names F-283: - Climb batch 21b's review, finding 7, the review's proposal: the manual's gather step runs the 52 team demos on the merged tree whenever a landed rung edits walk, `Library/` or `ProjectFortress/LibraryBuiltin/` (F-283, by P-79), with the demo driver of `compile-ladder/rung-team-demos/REPORT.md`, section 13, in the background while it folds;
- PLAN.md:237, under "Off the path, parked", 196 characters, names row 442: - Climb batch 6.5's rung P stated `narrow` on `ZZ` (rows 349 and 442) and reworded `MaybeRungM`'s comment;
- PLAN.md:240, under "Off the path, parked", 323 characters, names row 442: walk does on `NN32` and `NN64`, the compiled half comes at the switch-over (row 442);
- PLAN.md:258, under "Off the path, parked > Phase 3's candidates at its end", 347 characters, names row 364: P-154): it waits until walk runs the checker (P-12) or row 364 is fixed;
- PLAN.md:265, under "Off the path, parked > Phase 3's candidates at its end", 288 characters, names row 364: - The other candidates of item 18, each with what it waits on, are in `coordinator/CLIMB-BATCH-20.md`, section 4: open among them, rows 364, 444, 665, 691, 695, 697, 700, 714, 716, 717, 719, 721 to 723, 725, 728, 731, 746, 755 to 758, 760 to 764, 768, 770, 776 to 781, 785 and 787 to 790.
- PLAN.md:284, under "Off the path, parked > Climb batch N's first run, listed for his review", 301 characters, names row 442: - Rung M's list, on file (`compile-ladder/rung-integer-minmax/probes/for-pavol.txt`): its one point with no line, the home-2 pair `XXXMaxNN32IntoZZ64RungM` outside its record's files, for row 442's face;
- PLAN.md:543, under "Off the path, parked > Climb batch 20, listed for his review", 716 characters, names row 441: - The record's twenty forks, taken at their defaults (`coordinator/CLIMB-BATCH-20.md`, section 2), among them fork 13, row 441 kept open, which the review's finding 7 would close beside a new row for its compiled half;
- PLAN.md:557, under "Off the path, parked > Climb batch 21, listed for his review", 561 characters, names row 364: walk's half waits until walk runs the checker, P-12, or row 364 is fixed).
- PLAN.md:645, under "Off the path, parked > Climb batch 25, listed for his review", 828 characters, names row 861: then, from its post-batch review (`reviews/batch-25-review.md`, finding 3 and Part 4), the record's forks, its points for his sight and row 861's form. | Nothing on the path waits on them but row 861's form, before `Char`'s `asExprString` moves.
- PLAN.md:658, under "Off the path, parked > Climb batch 25, listed for his review", 285 characters, names row 861: - Row 861 (`CONTESTED`), from the record's "After the landing": which form does `Char`'s `asExprString` write for a character outside ASCII, the form of walk's glue or that of its helper? No default on record.

## The lines that look stale at 38887293f

From `plan-moves.py --stale-at 38887293f`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 354. The line: - **Next.** Climb batch 26 landed (phase 4's fourth line), and its post-batch review is committed. Its record-landing routes the review's list, and then the ori
LOOK PLAN.md:49, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 331, 332, 361. The line: - The 109 that cannot name their helper as a bare string: the 76 and the 5 moved are in F-308, F-313 and F-311. The 30 left that no bare helper reaches take P-1
LOOK PLAN.md:82, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, the walk half of the numeral switch (P-76; `reviews/numeral-switch-judgement.md` section 4.4), in the batch whose step gives walk the checker's static
LOOK PLAN.md:211, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280c "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
LOOK PLAN.md:630, under "Climb batch 24, listed for his review": settled: its own review-queue item is in (a): 338. The line: - Z.worker.1 and Z.skeptic.1 of climb batch 24's rung Z: is `unsigned` of a negative `ZZ64` (and `ZZ32`) specified? Default: none on record; today's values, the
LOOK PLAN.md:637, under "Climb batch 24, listed for his review": settled: its own review-queue item is in (a): 331. The line: - The hard-set probe's Q2 (`compile-ladder/plan-24/probes/hard-set.md`, section 8): the way for the 25 of the 109 that no way of climb batches 24 and 25 reaches
LOOK PLAN.md:638, under "Climb batch 24, listed for his review": settled: its own review-queue item is in (a): 332. The line: - The hard-set probe's Q3 (the same, section 8): does P-58's bare form admit a converting declaration, a public declaration whose body converts around a private
LOOK PLAN.md:658, under "Climb batch 25, listed for his review": settled: its own review-queue item is in (a): 354. The line: - Row 861 (`CONTESTED`), from the record's "After the landing": which form does `Char`'s `asExprString` write for a character outside ASCII, the form of walk's 
LOOK PLAN.md:669, under "Climb batch 26, listed for his review": settled: its own review-queue item is in (a): 361. The line: - T.worker.3 and T.skeptic.3 of climb batch 26's rung T (fork 19): does review-queue item 332 cover the pair, a public bare native over `FlatString` beside a pu

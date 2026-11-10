<!-- The record-landing workflow's evidence of PLAN.md at f629cd2dd: its headings, the lines that the batch added (b5b0f82c1..a2be3e9e1) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

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
  - 40: Phase 4. The switch-over (53 lines)
  - 93: Phase 5. microGPT compiles (19 lines)
  - 112: Phase 6. microGPT fast (10 lines)
- 122: Pavol's answers, in the order they are needed (66 lines)
- 188: Work that can start now, with no decision (23 lines)
- 211: Off the path, parked (37 lines)
  - 248: Phase 3's candidates at its end (24 lines)
  - 272: Climb batch N's first run, listed for his review (9 lines)
  - 281: Climb batch 6.5b, listed for his review (10 lines)
  - 291: Climb batch 7b, listed for his review (23 lines)
  - 314: Climb batch 8, listed for his review (18 lines)
  - 332: Climb batch 9, listed for his review (27 lines)
  - 359: Climb batch 10, listed for his review (16 lines)
  - 375: Climb batch 11, listed for his review (13 lines)
  - 388: Climb batch 12, listed for his review (15 lines)
  - 403: Climb batch 13, listed for his review (21 lines)
  - 424: Climb batch 14, listed for his review (17 lines)
  - 441: Climb batch 15, listed for his review (20 lines)
  - 461: Climb batch 15b, listed for his review (4 lines)
  - 465: Climb batch 16, listed for his review (10 lines)
  - 475: Climb batch 17, listed for his review (14 lines)
  - 489: Climb batch 18, listed for his review (15 lines)
  - 504: Climb batch 19, listed for his review (20 lines)
  - 524: Climb batch 20, listed for his review (16 lines)
  - 540: Climb batch 21, listed for his review (18 lines)
  - 558: Climb batch 21b, listed for his review (12 lines)
  - 570: Climb batch 22, listed for his review (14 lines)
  - 584: Climb batch 22c, listed for his review (22 lines)
  - 606: Climb batch 23, listed for his review (12 lines)
  - 618: Climb batch 24, listed for his review (16 lines)
  - 634: Climb batch 25, listed for his review (16 lines)
  - 650: Climb batch 26, listed for his review (17 lines)
  - 667: Climb batch 27, listed for his review (22 lines)
  - 689: Climb batch 28, listed for his review (26 lines)
  - 715: Climb batch 29, listed for his review (37 lines)
  - 752: Climb batch 29b, listed for his review (14 lines)
  - 766: Not classified, to check (13 lines)
- 779: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 796: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 808: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, b5b0f82c1..a2be3e9e1

- PLAN.md:144, under "Pavol's answers, in the order they are needed":

Before the switch-over, raised by climb batch 29b's rungs (`compile-ladder/climb-batch-29b/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"):

- PLAN.md:146, under "Pavol's answers, in the order they are needed":

77. A.worker.1 and A.skeptic.1 of climb batch 29b's rung A, with T.worker.1 and T.skeptic.1 of its rung T, the static numerals probe's question 1 (rows 973, CONTESTED, and 966): with the field numerals' `=` pairs gone, `u = 0`, `0 = u` and `f = 0` for a zero `u` of `NN32` or `NN64` and `f` of `RR32` are `false` under walk, since the numeral's default `ZZ32` fits the library's `=` over `Any` as it is and walk keeps a declaration that fits as it is, while the compiled path answers `true`, its prelude having no `=` over `Any`; and, with review.2 of the batch's merged-diff review, `h = 0.5` and `0.5 = h` are `false` under walk for `h: QQ = 1/2`, `QQ` declaring no `=` with `RR64`, the default of `0.5` (a walk program on the merged tree, 'h = 0.5: false'; row 973; no test pins it, review-routed.2 below). Ways: (a) a numeral reaches a more specific declaration by its conversion first, (b) `false`, (c) the pairs kept. Default: the probe's state, as landed, walk's answer pinned by `ProjectFortress/tests/XXXNumeralEqualsNumberWalk.fss:9-13`, and the specification writing no rule, each path's answer in `revival-numerals`' Effect (`Specification/appendices/changes.tex:5278-5290`). Evidence: `explorations/compile-ladder/plan-30/probes/draft-numerals.md:211-216`.

- PLAN.md:752, under "Off the path, parked > Climb batch 29b, listed for his review":

### Climb batch 29b, listed for his review

- PLAN.md:754, under "Off the path, parked > Climb batch 29b, listed for his review":

The items for him that climb batch 29b (`coordinator/CLIMB-BATCH-29b.md`, rungs A and T landed of two: the static numerals on both paths and in the specification) left (`compile-ladder/climb-batch-29b/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"); its question 1, `u = 0`, is item 77 above. One line for each point, opening with the ids it holds.

- PLAN.md:756, under "Off the path, parked > Climb batch 29b, listed for his review":

- gather.1 of climb batch 29b's gather (row 581): under the compiled checker over the one library, `(3).minimum` and `(3).maximum` check at the base `b5b0f82c13` and on the merged tree (`WorldFlip -stop check`, the count stage's driver, rc 0, where `(3).noSuchGetterHere` is refused), so the row's claim does not reproduce; close it, and by which commit? Default: open, its notes stating the measurement (`explorations/fortress-gap-ledger.md:570`).

- PLAN.md:757, under "Off the path, parked > Climb batch 29b, listed for his review":

- T.worker.2 and T.skeptic.2 of climb batch 29b's rung T, the static numerals probe's question 4: the numeral types' hierarchy. The text states the probe's five traits, `Numeral` without static parameters above `AnyNaturalNumeral` and `AnyRadixPointNumeral`, which exclude each other, and the two generic numeral types below them (fork A4's default; `Specification/basic/expressions/literals.tex:117-122`), and gives the probe's reason for a `Numeral` without static parameters, the exclusion rule beside the two generic numeral types (`Specification/appendices/changes.tex:5144-5149`). Ways: (a) the five traits, (b) the Working Draft's six types, (c) (a) with `comprises` clauses. Default: (a), as landed.

- PLAN.md:758, under "Off the path, parked > Climb batch 29b, listed for his review":

- T.skeptic.3 of climb batch 29b's rung T, told: the text dates the four numbers as naturals of any size, read as `ZZ`, and the static-parameter form to 9 November 2026 (`Specification/basic/trait-parameters.tex:115`, `Specification/basic/expressions/literals.tex:154`, `Specification/appendices/changes.tex:5110`), the confirmation of 16:02 UTC on 11-09, where P-174's history dates the first to his decision of 21:38 to 21:57 UTC on 11-08 and the snapshot shows the static-parameter form asked for at 21:34 and 21:55 on 11-08 (`explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md:72-93`). Default: the worker's dates, as landed.

- PLAN.md:759, under "Off the path, parked > Climb batch 29b, listed for his review":

- gather.2 of climb batch 29b's gather, a text mismatch the decisions do not settle (row 974): the text writes a numeral type only as a parameter's type, "nor as a static argument, nor as a type that a trait or an object extends" (`Specification/basic/expressions/literals.tex:263-267`), and the compiled checker refuses both, but walk loads and runs `object O extends NaturalNumeral[\1, 10, 3\]` and `Wrap[\NaturalNumeral[\1, 10, 3\]\](3)`. The text stands; walk's departure has its row, the expected failure `ProjectFortress/tests/XXXNumeralTypeWrittenWalk.fss`, and its clause in `revival-numerals`' Effect (`Specification/appendices/changes.tex:5294`). Default: as landed; walk refuses them with its checker after the switch-over (P-12).

- PLAN.md:760, under "Off the path, parked > Climb batch 29b, listed for his review":

- gather.3 of climb batch 29b's gather, told (row 694): at `ZZ32`, the numerals' default, `B.f(3, 4)` no longer reproduces the row, at the base `b5b0f82c13` or on the merged tree: it checks and the override is chosen; the row is rewritten to an `NN32` case that still refuses the call as an ambiguous coercion (`explorations/fortress-gap-ledger.md:492`). Default: as landed.

- PLAN.md:761, under "Off the path, parked > Climb batch 29b, listed for his review":

- review.1 of climb batch 29b's merged-diff review, told: leftovers of the field numerals that change no behaviour. Walk's `Numerals.object` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:301-316`) builds the library's `NaturalNumeral` object by a constructor that no longer exists, reached only through `Coercions.withNumeralObjects` (`Coercions.java:415-431`), which marks no argument since `Numerals.numeralType` answers null (`Numerals.java:289-293`); `isNumeralObject` and `sameValue` (`Numerals.java:597-638`), called at `FOrdinaryObject.java:49`, test for objects no program makes; and the comments at `Library/CompilerLibrary.fsi:38-44` and `Library/CompilerLibrary.fss:91-96` give as the reason for the prelude's typed `assert` that an `Any` parameter suppresses the `IntLiteral` coercion, which is gone (row 314's notes). Default: left; the next batch that edits walk's numerals or the prelude's `assert` removes them.

- PLAN.md:762, under "Off the path, parked > Climb batch 29b, listed for his review":

- review.3 of climb batch 29b's merged-diff review, told: about 58 line citations in 26 FACTS entries (F-301, F-302, F-307, F-312, F-334 and others) cite, without their commit, lines of files rung A edited (`Library/FortressLibrary.fsi` and `.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and `.fss`, `compiler/codegen/CodeGen.java`, `Functionals.scala`, `CoercionOracle.scala`, `NamingCzar.java`, `compiler/runtimeValues/FZZ32.java`), and now point elsewhere: F-301's `FZZ32.java:22-24`, `make` at the base, is now `:32-34`. Default: left for the record's full pass, as climb batch 21's review.1 left the ledger's.

- PLAN.md:763, under "Off the path, parked > Climb batch 29b, listed for his review":

- review-routed.1 of climb batch 29b's merged-diff review, a test file to change, not a question, for the next batch that edits walk's load checks or row 974: `ProjectFortress/tests/XXXNumeralTypeWrittenWalk.fss:5-9` holds both forms of row 974 in one program, so a walk that refused only `object O extends NaturalNumeral[\1, 10, 3\]` at load would turn it red and close the row while `Wrap[\NaturalNumeral[\1, 10, 3\]\](3)` still runs; split it into one expected failure for each form.

- PLAN.md:764, under "Off the path, parked > Climb batch 29b, listed for his review":

- review-routed.2 of climb batch 29b's merged-diff review, a test owed, not a question, for the batch that answers item 77 or edits walk's dispatch of a numeral: row 973's `QQ` case has no test, `ProjectFortress/tests/XXXNumeralEqualsNumberWalk.fss:9-13` asserting only the `NN32`, `NN64` and `RR32` zeros; add `h: QQ = 1/2` with `h = 0.5` and `0.5 = h` asserted `true`, the snapshot's answer that the file asserts.


## The lines added after the landing, a2be3e9e1..f629cd2dd

None.

## The other lines that name a changed entry or row

- PLAN.md:10, under "Where we stand", 2124 characters, names F-53: At the last landed gate, climb batch 29's (`7daf51fe8`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53;
- PLAN.md:36, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:64, under "The phases > Phase 4. The switch-over", 363 characters, names row 82: - Rows 82 and 938, `spawn`'s threads: `spawn` is not compiled, so on the compiled path `Thread`'s four helpers raise `FailCalled` until it is (row 82;
- PLAN.md:78, under "The phases > Phase 4. The switch-over", 286 characters, names row 442: row 442 holds the same for `NN32` and `NN64` only, and no row holds `ZZ`'s.
- PLAN.md:79, under "The phases > Phase 4. The switch-over", 466 characters, names F-79: the row's other half, `IntLiteral` stating its own, names a type that the one library no longer has (F-79;
- PLAN.md:85, under "The phases > Phase 4. The switch-over", 1583 characters, names row 962: walk's `ZZ64` for a size of 2^31 or more read as a value is row 962 (review-queue item 461);
- PLAN.md:138, under "Pavol's answers, in the order they are needed", 641 characters, names rows 961, 968: C.skeptic.3 of climb batch 29's rung C (row 961), with review.1 of its merged-diff review (row 968): fork C6's default, a negative numeral at a program's own number type as prefix minus on its coercion of the natural numeral, is not built, so under walk `t: Tally = -3` passes the coercion `NaturalNumeral(1, 10, -3)`, a numeral that no program wrote, against repair 3, which he took.
- PLAN.md:236, under "Off the path, parked", 323 characters, names row 442: walk does on `NN32` and `NN64`, the compiled half comes at the switch-over (row 442);
- PLAN.md:245, under "Off the path, parked", 259 characters, names row 514: - The compiled path has no strided range (row 514), and against the one library `seq(a:b:c)` is refused too, its strided `:` answering a range that is no generator (row 661), so the switch-over closes row 514 only with row 661's repair.
- PLAN.md:259, under "Off the path, parked > Phase 3's candidates at its end", 321 characters, names row 959: - Row 959, opened by climb batch 29's rung N: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value;
- PLAN.md:262, under "Off the path, parked > Phase 3's candidates at its end", 276 characters, names row 691: - The other candidates of item 18, each with what it waits on, are in `coordinator/CLIMB-BATCH-20.md`, section 4: open among them, rows 444, 665, 691, 695, 697, 700, 714, 716, 717, 719, 723, 725, 728, 731, 746, 755 to 758, 760 to 764, 768, 770, 776 to 781, 785 and 787 to 790.
- PLAN.md:269, under "Off the path, parked > Phase 3's candidates at its end", 107 characters, names row 652: - Keyword parameters on both paths, parked beside `where` clauses as a language feature not built: row 652.
- PLAN.md:279, under "Off the path, parked > Climb batch N's first run, listed for his review", 301 characters, names row 442: - Rung M's list, on file (`compile-ladder/rung-integer-minmax/probes/for-pavol.txt`): its one point with no line, the home-2 pair `XXXMaxNN32IntoZZ64RungM` outside its record's files, for row 442's face;
- PLAN.md:381, under "Off the path, parked > Climb batch 11, listed for his review", 247 characters, names row 694: - Should the code generator accept the modifier `override` (row 650), and what must compiled dispatch then do with a declaration a type no longer provides (row 694)? No default.
- PLAN.md:487, under "Off the path, parked > Climb batch 17, listed for his review", 670 characters, names row 769: Nothing observes this while the export check refuses such sets (row 769). | Should the rule follow satisfaction when row 769 is repaired? No default on record.
- PLAN.md:599, under "Off the path, parked > Climb batch 22c, listed for his review", 1889 characters, names row 769: row 769 holds this for a top-level function only.
- PLAN.md:655, under "Off the path, parked > Climb batch 26, listed for his review", 365 characters, names row 893: - W.skeptic.2 of climb batch 26's rung W (row 893): should walk's load check apply P-146's extender rule, now that its overloading check reads `self` of a self-typed trait as `C[\X\] & X`? Default: P-146's "walk is unchanged", the gap gated;
- PLAN.md:721, under "Off the path, parked > Climb batch 29, listed for his review", 333 characters, names row 957: - F.worker.1 and F.skeptic.1 of climb batch 29's rung F (row 957): is P-174's "once per class, when the class loads" the component's class, and is a site at a program's own generic type one object per site, or one per instantiation? Default: the component's class, as landed;
- PLAN.md:732, under "Off the path, parked > Climb batch 29, listed for his review", 355 characters, names row 962: - C.worker.2 and C.skeptic.2 of climb batch 29's rung C, with review.2 of its merged-diff review (row 962, CONTESTED): a `nat` or `int` size of 2^31 or more read as a value raises `java.lang.Error` on the compiled path and is a `ZZ64` under walk;
- PLAN.md:733, under "Off the path, parked > Climb batch 29, listed for his review", 256 characters, names row 963: - C.skeptic.4 of climb batch 29's rung C (rows 963 and 964): a numeral as a `typecase`'s selector keeps `IntLiteral` on the compiled path;
- PLAN.md:741, under "Off the path, parked > Climb batch 29, listed for his review", 424 characters, names row 966: - T.worker.1, T.skeptic.1 and T.judge.2 of climb batch 29's rung T (row 966): the library's `=/=` over `Any` answers `true` for `u =/= 0` with a zero `u` of `NN32`, `NN64` or `RR32`, where `u = 0` is `true`;
- PLAN.md:743, under "Off the path, parked > Climb batch 29, listed for his review", 286 characters, names row 966: - T.judge.1 and T.judge.3 of climb batch 29's rung T, told, not asked: the gather filed row 966 and put its number into Appendix I, and the skeptic's fix added `tests/XXXNotEqualNumeral.fss`, a file outside the section's "Specification/ only".
- PLAN.md:745, under "Off the path, parked > Climb batch 29, listed for his review", 245 characters, names row 960: - gather.5 of climb batch 29's gather (row 960): rung T's text folds the Working Draft's `Literal[\v\]` into the digit count, where P-174 folds it into the radix field;
- PLAN.md:746, under "Off the path, parked > Climb batch 29, listed for his review", 761 characters, names row 968: ...- review-routed.1 of climb batch 29's merged-diff review, for the next batch that edits walk's numerals or the numeral fold: row 968 (under walk a negative constant at a program's own number type reaches its `coerce(x: NaturalNumeral)` as `NaturalNumeral(1, 10, -3)`, where `Specification/basic/expressions/literals.tex`, "Literals", make... | Evidence: row 968's notes;

## The lines that look stale at f629cd2dd

From `plan-moves.py --stale-at f629cd2dd`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 448. The line: - **Next.** Climb batch 29 landed (phase 4's seventh line), and its post-batch review is committed (`bedcfc4a1b`). Its record-landing routes the review's list, 
LOOK PLAN.md:72, under "Phase 4. The switch-over": settled: its own review-queue item is in (a): 482. The line: - Fork F5 of climb batch 29, for the names batch: on the compiled path a program's coercion from a numeral type receives the prelude's numeral value, an `IntLit
LOOK PLAN.md:73, under "Phase 4. The switch-over": settled: its own review-queue item is in (a): 482. The line: - Fork F6 of climb batch 29, for the names batch: on the compiled path the `=` pairs' conversion of a numeral is not folded at a call, since the prelude declare
LOOK PLAN.md:74, under "Phase 4. The switch-over": settled: its own review-queue item is in (a): 482. The line: - Fork F7 of climb batch 29, for the names batch: on the compiled path a numeral at a `QQ` place is not folded, since the prelude has no `QQ`, and the compiled 
LOOK PLAN.md:85, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:89, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 448. The line: - His answers needed before the switch-over: review-queue items 2, 21, 30, 35, 36, 39, 108, 212, 229, 230, 281, 295, 319, 339, 360, 371, 372, 374 to 376, 408, 4
LOOK PLAN.md:209, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
LOOK PLAN.md:719, under "Climb batch 29, listed for his review": settled: its own review-queue item is in (a): 443. The line: - A value of a numeral type inside a coercion's body bound by inference, `t = x`, the half of review-queue item 443 that had no default on record when he took i
LOOK PLAN.md:727, under "Climb batch 29, listed for his review": settled: its own review-queue item is in (a): 456. The line: - N.worker.2 of climb batch 29's rung N, a departure from fork N7's default: walk converts a numeral into the eight number types by the library's own coercion f
LOOK PLAN.md:729, under "Climb batch 29, listed for his review": settled: its own review-queue item is in (a): 458. The line: - N.skeptic.1 of climb batch 29's rung N: P-168's one exception, two numeral values strictly equivalent by their reduced value, is built across both numeral typ
LOOK PLAN.md:749, under "Climb batch 29, listed for his review": settled: its own review-queue item is in (a): 478. The line: - Fork N4 of climb batch 29, the record's point 3: `RadixPointNumeral` declares `asFloat` with one rounding, as `NaturalNumeral` does; keep it, with `RadixPoint

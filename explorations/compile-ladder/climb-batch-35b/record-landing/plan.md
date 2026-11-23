<!-- The record-landing workflow's evidence of PLAN.md at 9d5d21bf5: its headings, the lines that the batch added (5a5955155..1caac80b3) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

# PLAN.md

Print a section with `facts-extract.sh 'doc:explorations/coordinator/PLAN.md#HEADING'`, from the worktree.

## Its headings, with their lines

- 7: Where we stand (8 lines)
- 15: The principle for the batches (6 lines)
- 21: The phases (2 lines)
  - 23: Phase 1. Batch 5: what is decided and shares nothing (4 lines)
  - 27: Phase 2. Batch 6: the tower flips, the specification with it (4 lines)
  - 31: Phase 2b. The repair batch from the conformance reviews (4 lines)
  - 35: Phase 3. The checker at a true zero (6 lines)
  - 41: Phase 4. The switch-over (64 lines)
  - 105: Phase 5. microGPT compiles (20 lines)
  - 125: Phase 6. microGPT fast (13 lines)
- 138: Pavol's answers, in the order they are needed (82 lines)
- 220: Work that can start now, with no decision (23 lines)
- 243: Off the path, parked (46 lines)
  - 289: Phase 3's candidates at its end (23 lines)
  - 312: Climb batch N's first run, listed for his review (9 lines)
  - 321: Climb batch 6.5b, listed for his review (10 lines)
  - 331: Climb batch 7b, listed for his review (20 lines)
  - 351: Climb batch 8, listed for his review (17 lines)
  - 368: Climb batch 9, listed for his review (24 lines)
  - 392: Climb batch 10, listed for his review (16 lines)
  - 408: Climb batch 11, listed for his review (12 lines)
  - 420: Climb batch 12, listed for his review (13 lines)
  - 433: Climb batch 13, listed for his review (20 lines)
  - 453: Climb batch 14, listed for his review (16 lines)
  - 469: Climb batch 15, listed for his review (20 lines)
  - 489: Climb batch 15b, listed for his review (4 lines)
  - 493: Climb batch 16, listed for his review (10 lines)
  - 503: Climb batch 17, listed for his review (14 lines)
  - 517: Climb batch 18, listed for his review (14 lines)
  - 531: Climb batch 19, listed for his review (18 lines)
  - 549: Climb batch 20, listed for his review (16 lines)
  - 565: Climb batch 21, listed for his review (18 lines)
  - 583: Climb batch 21b, listed for his review (12 lines)
  - 595: Climb batch 22, listed for his review (13 lines)
  - 608: Climb batch 22c, listed for his review (21 lines)
  - 629: Climb batch 23, listed for his review (12 lines)
  - 641: Climb batch 24, listed for his review (15 lines)
  - 656: Climb batch 25, listed for his review (16 lines)
  - 672: Climb batch 26, listed for his review (9 lines)
  - 681: Climb batch 27, listed for his review (7 lines)
  - 688: Climb batch 28, listed for his review (8 lines)
  - 696: Climb batch 29, listed for his review (16 lines)
  - 712: Climb batch 29b, listed for his review (7 lines)
  - 719: Climb batch 30, listed for his review (10 lines)
  - 729: Climb batch 32, listed for his review (10 lines)
  - 739: Climb batch 31, listed for his review (11 lines)
  - 750: Climb batch 31b, listed for his review (7 lines)
  - 757: Climb batch 33, listed for his review (8 lines)
  - 765: Climb batch 33b, listed for his review (7 lines)
  - 772: Climb batch 34, listed for his review (6 lines)
  - 778: Climb batch 34b, listed for his review (6 lines)
  - 784: Climb batch 35, listed for his review (14 lines)
  - 798: Climb batch 35b, listed for his review (14 lines)
  - 812: Not classified, to check (13 lines)
- 825: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 842: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 854: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, 5a5955155..1caac80b3

- PLAN.md:798, under "Off the path, parked > Climb batch 35b, listed for his review":

### Climb batch 35b, listed for his review

- PLAN.md:800, under "Off the path, parked > Climb batch 35b, listed for his review":

The items for him that climb batch 35b, run 2 of `coordinator/CLIMB-BATCH-35.md` (rungs E, L and M, all three landed), left (`compile-ladder/climb-batch-35b/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"), and the reserved points its rungs reached, each landed at its default. None holds a launch.

- PLAN.md:801, under "Off the path, parked > Climb batch 35b, listed for his review":

- E.worker.1 and E.skeptic.4 (its first question) of climb batch 35b's rung E (row 184, closed by the rung): a one-library run test of `EQV` and `NEQV` can pass now, since the section's reason for none, rows 994 and 1098 (`=` and `println` of booleans, compiled), does not reach a program that calls no `=` and prints no boolean; `OneLibraryBooleanEquivalence` compiled under the one library and run by hand against the onelibrary track's jars prints `PASS`. Add a run test? Default: as landed, the compile test only, as the section asked. Evidence: `explorations/compile-ladder/rung-boolean-equivalence/REPORT.md:93`, `:193`; `explorations/compile-ladder/rung-boolean-equivalence/SKEPTIC.md:56`; `Library/FortressLibrary.fss:4923-4924`.

- PLAN.md:802, under "Off the path, parked > Climb batch 35b, listed for his review":

- E.worker.2 and E.skeptic.4 (its second question) of climb batch 35b's rung E: `seed-worktree.sh` copies `ProjectFortress/build` but not `ProjectFortress/build-one`, which the implementation's stamp covers, so a seeded worktree's first `ant` target rebuilds the Scala and empties both seeded caches, and a compiled one-library run before it stops, 'java.lang.Error: The type ZZ of the library that the compiled path reads is not compiled over ... FZZ' (F-404). The skill's "Without the warning, `ant compileAll` keeps the seeded caches" (`.claude/skills/fortress-repo/references/worktrees.md:45`) does not hold. Fix the tool to copy `build-one`? No default on record; the tool is unchanged, a coordinator tool and not the batch's. Evidence: `explorations/coordinator/tools/seed-worktree.sh:86-93`; `build.xml:400-402`, `:469-470`; `explorations/compile-ladder/rung-boolean-equivalence/REPORT.md:189`, `:194`; `SKEPTIC.md:56`.

- PLAN.md:803, under "Off the path, parked > Climb batch 35b, listed for his review":

- E.skeptic.1 of climb batch 35b's rung E (row 1121): fork E1 covers `EQV` and `NEQV` only. Should the one library declare `Boolean`'s `⊕` (`OPLUS`), `⊼` (`NAND`) and `⊽` (`NOR`) in the same top-level form, before the switch-over drops the prelude's three, and `majority`, which neither library declares? Default: as landed, row 1121 open with its expected failure, its repair a later rung's by P-180. Evidence: `explorations/compile-ladder/rung-boolean-equivalence/SKEPTIC.md:58`; `ProjectFortress/tests/XXXBooleanOplusNandNorMajorityWalk.fss`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:464`, `:469-470`; `Specification/basic-lib/booleans.tex:306`.

- PLAN.md:804, under "Off the path, parked > Climb batch 35b, listed for his review":

- E.skeptic.2 of climb batch 35b's rung E (row 1120, `CONTESTED`): should the parser read the overview's ASCII shorthands `NOTEQUIV`, `NOTSUBSET` and `NOTSUBSETEQ` (`Specification/preliminaries/overview.tex:401-405`), or only the operators appendix's `NEQV`, `NSUBSET` and `NSUBSETEQ` (`Specification/appendices/operators.tex:452`, `:643`, `:645`), as it does now (`ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/Operators.java:1584-1585`, `:2108`)? No default on record; as landed, both paths refuse `t NOTEQUIV f`, 'Operator NOTEQUIV is not defined.', and the row's plain test asserts it. Evidence: `explorations/compile-ladder/rung-boolean-equivalence/SKEPTIC.md:59`; `ProjectFortress/tests/NotEquivShorthandWalk.fss`.

- PLAN.md:805, under "Off the path, parked > Climb batch 35b, listed for his review":

- E.skeptic.3 of climb batch 35b's rung E: the typeset `NOR` entry, "returns false if both arguments are false; otherwise it returns true" (`Specification/basic-lib/booleans.tex:293-294`), describes `OR`, against its own "(not or)" and the trait's property `(a NOR b) = NOT (a OR b)` (`:76`). Correct the text in the revision form? No default on record; the text stands as it is, and row 1121's test follows the property. Evidence: `explorations/compile-ladder/rung-boolean-equivalence/SKEPTIC.md:60`.

- PLAN.md:806, under "Off the path, parked > Climb batch 35b, listed for his review":

- Rung E of climb batch 35b, its reserved point, landed at its default (as landed). E.reserved.1: the one library's `EQV` and `NEQV` join, in one overload set, the APL experiments' seven infix `≡` and four prefix `≢` (`explorations/apl/base/AplCore.fss:207-224`, `:226-228`, `:1265`). A program over AplCore prints AplCore's values as on the base ('1.0', '1.0', '0.0'), and `t ≡ f` and `t ≢ f` of two booleans in it now print `false` and `true`, where the base stopped, 'Failed to find any matching overload, args = (true,false)'. No gated program imports AplCore. Evidence: `Library/FortressLibrary.fss:4923-4924`; `explorations/compile-ladder/rung-boolean-equivalence/SKEPTIC.md:31`; `explorations/compile-ladder/rung-boolean-equivalence/REPORT.md:115-126`.

- PLAN.md:807, under "Off the path, parked > Climb batch 35b, listed for his review":

- L.worker.1 and L.skeptic.1 of climb batch 35b's rung L (row 744, narrowed by the rung): under walk, should a dotted call that writes static arguments to a name its receiver overloads by a plain and a generic method run the generic instance, or the plain overload, as the compiled path does? No decision covers it. Default: as landed, the call still stops, 'Don't actually resolve overloading of generic methods yet.', row 744 open with its claim narrowed to that case. Evidence: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:157`; `explorations/fortress-gap-ledger.md:447`; `explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md:218`.

- PLAN.md:808, under "Off the path, parked > Climb batch 35b, listed for his review":

- L.worker.2, L.skeptic.2, L.worker.3 and L.skeptic.3 of climb batch 35b's rung L (row 981, closed by the rung; row 1124, opened by it), one point: P-174's sentence "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause." is false now that walk refuses that form, and so is the "too" of the sentence after it. Row 981's three other written forms, a variable's, a field's or a return type of a numeral type, which walk loads and refuses only where a numeral meets them, have a row of their own, 1124, since review-queue item 503 says row 981 holds them. Should they keep that row, and should P-174's sentence name it? Default: as landed, row 1124 open with its expected failure; P-174's two sentences are the record-landing's to bring in line, with the words the rung proposes, "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it. The tree departs too, with no row, where ...". Evidence: `explorations/coordinator/POSITIONS.md:106`; `explorations/compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md:202`, `:224`; `explorations/coordinator/review-queue.md:900`; `ProjectFortress/tests/XXXNumeralTypeReturnTypeWalk.fss:5`.

- PLAN.md:809, under "Off the path, parked > Climb batch 35b, listed for his review":

- gather.1 of climb batch 35b's gather (row 1125, opened by rung L's skeptic), told: rung L turns a loud failure of the base into a quiet wrong value for one shape. Two generic dotted methods of one name, one number of parameters and static parameters of the same kinds that differ only in their bounds, as `tk[\U extends Number\](y: U)` beside the more specific `tk[\U extends ZZ32\](y: U)` in an object, stopped on the base, 'Cannot find definition for method tk given receiver Two' (the skeptic's program `SkBoundsNested`); now they share one symbolic instantiation, the first met is kept, and a call over a `ZZ32` answers 2 where the more specific declaration answers 3. The skeptic named it as a point (failure mode), not as reserved. Default: as landed, row 1125 open with its expected failure, its repair a later rung's by P-180. Evidence: `explorations/compile-ladder/rung-walk-load-check-generic-numeral/SKEPTIC.md:21`, `:33`, `:36`; `ProjectFortress/tests/XXXGenericMethodBoundsDifferWalk.fss`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:896-906`, `genericKey`.

- PLAN.md:810, under "Off the path, parked > Climb batch 35b, listed for his review":

- review.1 of climb batch 35b's merged-diff review, told: two departures that rung L recorded are named in no Appendix I effect, where the gather named rows 1122, 1125 and 1126 in theirs. Row 1123, two generic functional methods of one name and number of parameters in an object, excluding at a plain parameter, of which walk never chooses the second, is a set that the entry "Overloading with static parameters" allows, and its effect's list after "Neither implementation runs every set these rules allow." does not name it; row 1124, walk loading a numeral type written as a return type, a variable's or a field's type, is named nowhere in the entry "The numeral types, their conversion and their default", whose sentence on walk's refusals at load names the `extends` clause and static arguments but not the `comprises` clause that walk now refuses. No sentence claims more than holds; the skill asks the effect to name each departure with its row. No default on record; recommendation: the next batch that edits either entry names rows 1123 and 1124 and the `comprises` clause, a change of text with no test. Evidence: `Specification/appendices/changes.tex:3105-3137`, `:5447-5448`, `:5494-5496`; `explorations/fortress-gap-ledger.md:479`, `:732`; `.claude/skills/fortress-repo/references/specification.md:22`.


## The lines added after the landing, 1caac80b3..9d5d21bf5

None.

## The other lines that name a changed entry or row

- PLAN.md:10, under "Where we stand", 7234 characters, names F-53, F-375, F-377: At the last landed gate, climb batch 35's (`0a83a70498`, run 1 of `coordinator/CLIMB-BATCH-35.md`, its gate on `b7b5b0c02b`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53; | Climb batch 31's run 1 built, on the compiled path, each inherited method written once and a body inherited through an api's trait (F-372), `label` and `exit` (F-373), `atomic` as an expression and an object's `var` field in a cell (F-374), the cast of `self` (F-377, F-225), and the Return Type Rule at an object type with the dispatcher's cast (F-75, F-376); | and, under walk, its two repairs that come before the merge (F-375). | on the compiled path it built a generic body's kind environment and a clause's tuple names (F-384), `self` at a conditional's arm and in a closure, with the class-file read of a call's owner (F-377, F-385), a method call on a receiver typed by an intersection (F-386) and the subscript forms (F-387).
- PLAN.md:37, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:75, under "The phases > Phase 4. The switch-over", 1480 characters, names F-377: F-372 to F-377).
- PLAN.md:119, under "The phases > Phase 5. microGPT compiles", 607 characters, names row 770: review-queue item 158 (closed at the cleanup of 2026-11-05: settled)), 564, 565, 594, 643, 724 (walk's side, row 723) and 815 (its checker sibling, row 770), which climb batch 35b's rung M takes.
- PLAN.md:302, under "Off the path, parked > Phase 3's candidates at its end", 461 characters, names row 770: - The other candidates of item 18, each with what it waits on, are in `coordinator/CLIMB-BATCH-20.md`, section 4: open among them, rows 444, 665, 691, 697, 700, 714, 716, 717, 719, 723, 725, 728, 746, 755 to 757, 760 to 764, 768, 770, 776 to 781, 785 and 787 to 790.
- PLAN.md:741, under "Off the path, parked > Climb batch 31, listed for his review", 874 characters, names row 1053: then, from its post-batch review (`reviews/batch-31-review.md`, Part 4), the lines that the group lacked: rows 1043, 1050, 1052 and 1053, fork V4, fork H2 and the record's forks.
- PLAN.md:752, under "Off the path, parked > Climb batch 31b, listed for his review", 1234 characters, names rows 1057, 1058: then, from its post-batch review (`reviews/batch-31b-review.md`, Part 4), the lines that the group lacked: rows 1054 to 1060, the record's forks of run 2, and the reserved points that rung O reached.

## The lines that look stale at 9d5d21bf5

From `plan-moves.py --stale-at 9d5d21bf5`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 512, 513, 515, 577. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:97, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:241, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on

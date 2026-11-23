<!-- The record-landing checker's verdict on climb batch 35b's first round: each change of owed.md, pass or each failure with its class, passage, source and correction, then the mechanical checks of mech-1.md. -->

# The check of climb batch 35b's record-landing, round 1

Read: `owed.md`, the evidence of this folder, `record.apply`, both reports, `mech-1.md`, and `git -C /home/user/fortress-landing-35b diff 9d5d21bf5 -- explorations/ ':!explorations/coordinator/PLAN-history.md'`; the entries as they stand through `facts-extract.sh`; report sections through its `doc:` queries.

Result: 51 pass, 1 fail (C7: two fidelity failures). Coverage 0, fidelity 2, form 0, routing 0.

## FACTS, POSITIONS and the ledger

**C1** (F-53, weight none, writer none): pass. F-53 is not in the diff; the gate's figures are unchanged.

**C2** (F-240, weight none, writer none): pass. F-240 is not in the diff.

**C3** (F-257), **C4** (F-341), **C6** (F-377), weight none: pass. None is in the diff.

**C5** (F-375): pass.
- Old: "by one of three readings that the report gives, a tuple result read element by element, as tuple types are covariant (row 1058, fixed), and is refused"; new: "by one of three readings that the report gives, and is refused, ... (`OverloadedFunction.returnRuleAtObjectArguments`; row 998, fixed). The reading at object arguments compares a tuple result element by element, as tuple types are covariant (row 1058, fixed)." The sentence on row 1122 is gone.
- Fidelity: [S9] says `returnRuleAtObjectArguments` now calls `belowAtObjectArguments`, which "reads a tuple result element by element, recursively, as tuple types are covariant". That is one reading, the one at object arguments, and row 1122's notes use the same words. So the writer's departure from `owed.md`'s "the readings read" holds by the source.
- Form: 2,206 at the base to 2,494. It grows only by the tuple sentence, its test and its pointer.

**C7** (F-403): fail, two fidelity failures.
1. Fidelity. Passage: "the one library keeps its own form for the boolean operators, within P-37, a default of the batch's plan that the curator has not decided."
   - The appositive follows "P-37", so the sentence can read as calling P-37, his decision, an undecided default of the plan.
   - Source: `owed.md` C7 (1). Fork E1, the form, is the planner's default. P-37 is the curator's decision (POSITIONS).
   - Correction: "the one library keeps its own form for the boolean operators, within P-37; that form is a default of the batch's plan, which the curator has not decided."
2. Fidelity, a lost condition (the path). Passage: "A program that imports the APL experiments' `AplCore` gets its infix `≡` and prefix `≢` over `RR64` and arrays in one overload set with the library's two: its own calls give the values that they gave without the library's two, and `t ≡ f` and `t ≢ f` of two booleans print `false` and `true`."
   - The entry's title claims both paths, but this program ran under walk only.
   - Sources: `rung-boolean-equivalence/SKEPTIC.md:31`, "Old walk: ... New walk: `1.0`, `1.0`, `0.0`, `t EQV f false`, `t NEQV f true`"; RECORD:159; the rung's report, "Row 184's own program, and the other programs".
   - Correction: begin the sentence "Under walk, a program that imports ...". The cold cache's refusal of AplCore's `<` (row 342) needs no clause, since it is the base's as much as the rung's (SKEPTIC.md:31).
- What passes:
  - The AplCore default is grounded (`PLAN.md:806`; the review, section 2, E.reserved.1; "over `RR64` and arrays", `AplCore.fss:207-228`). "This also is the plan's default, not decided by the curator" matches CB35's reserved point for rung E, which landed at its default.
  - "Where the base stopped" and the cut line numbers are in the history, and the line numbers are also in [S14].
  - The growth (1,454 to 1,816) is the clauses owed.

**C8** (F-404): pass. The clause on `references/worktrees.md:45` is cut, and the tool's fact, its command and its meaning for a seeded worker's first build stay. The clause goes to the skill writer's list (entries report). 1,284 to 1,169.

**C9** (F-405): pass.
- Old: "one is dropped (row 1125)"; new: "share that instantiation, and the first met is kept (read in the code). So a call can run the less specific one with no error: `Nested.tk(n)` for a `ZZ32` answers 2 with `tk[\U extends Number\](y: U)` beside `tk[\U extends ZZ32\](y: U)`, whose answer is 3 (row 1125, observed)."
- Grounds: the review, section 3; row 1125's notes ("the first met is kept"); `XXXGenericMethodBoundsDifferWalk`. "Can" fits row 1125's other shape, where a call over a `String` stops.
- The evidence kinds are stated. The source paths are cut to class and method names, and the report holds the paths.
- Growth +176, offset in part by those cuts. The example is the observed evidence of the owed clause, and the report names question 1 for it.

**C10** (F-406): pass.
- "Before, the set was split ..." moves to the history; the provenance note holds it.
- New: "The written method is a default of the batch's plan, and the forwarder a worker's choice beyond the plan; the other way was to make each call through the trait. The curator has decided neither."
- The departure from `owed.md` ("the forwarder is fork M2's default") holds by the review: section 1, "That forwarder is the worker's device: fork M2 named 'the overload method written or the call made through the trait'"; section 2, "The overload method is written, M2's first way"; Part 1, finding 7.
- 1,609 to 1,708.

**C11** (F-253): pass.
- The clause owed is added, word for word as the shape `owed.md` gives: "except for two generic dotted methods of one name, one number of parameters and static parameters of the same kinds that differ only in their bounds, of which the first met is kept (row 1125, F-405)". Its evidence kind is in F-405.
- +200, that clause only.

**C12** (F-26): pass. "except two that differ only in their bounds, of which the first met is kept (row 1125)" is at the pointer to F-253, as owed. The headline stays, as `owed.md` gives. +88, that clause only.

**C13** (P-174): pass.
- The changed sentence:
  - Before: "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause. The tree departs too, with no row, where ..."
  - After: "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it. The tree departs too, with no row, where ..."
- Decision, before and after, the same words: "A numeral's type exists only at compile time: the Working Draft's `NaturalNumeral` or, with a radix point, `RadixPointNumeral`, below `Numeral`, with its four numbers as static parameters; every number type, the library's too, takes a numeral through a coercion generic over the four numbers."
- Where it applies, before and after: "every number type, the library's too"; a numeral type "is written only as a coercion's or an operator's parameter type".
- What it requires, before and after: "A coercion's body is a computation at compile time, with no method invocation ... The coercion's body calls the type's constructor on values computed from the four numbers, ... and the compiler instantiates it for the numeral and folds it (P-176)."
- The diff changes only the departure sentence. The new words are rung L's ("P-174's sentences on row 981"), and row 1124's claim holds them.
- The rule of 2026-10-31, fewest words: the cut alone ("The tree departs, with no row, where ...") would drop the pointer to a departure that stands (row 1124, NEGATIVE-VERIFIED), which the record read as row 981's (review-queue item 503). So the swap of the row and its few words is the smallest change that keeps the sentence true and its pointer.
- +74. The history block names the rule.

**C14** (weight none): pass; none of those entries is in the diff.

**C15, C16, C17** (rows 994, 1100 and the batch's rows, weight none): pass. `ledger.py check` passes with 1,126 rows; no row changed.

## PLAN, PLAN-history, the queue, INDEX

**C18** (`PLAN.md:9`, "Runs."): pass. 7 of 7 now through "both runs ... of climb batch 35", with `reviews/batch-35b-review.md`, section 6, and `gate/summary.txt`; 52 of 52 "on the merged trees of both runs of climb batch 35", with 35b's RECORD; all match the ground.

**C19** (`:10`, "The live thread."): pass.
- The last landed gate is now 35b's (`1caac80b3b`, run 2, gate on `f23f91938d`), distance and count 0, with `climb-batch-35b/gate/`. `update.py`'s patterns parse it: '35b', '1caac80b3b', 0, 0.
- The built sentence names F-403, F-405, F-375, F-341, F-406 and F-377. The closed rows 184, 390, 815, 981, 1053, 1057 and 1058 match `rows.md`.
- The pointer gains section 5, "Each closed row, path by path" (review :110).
- The extra edit of run 1's clause, to "landed for row 1100 ... which stays open", is grounded: `ledger:1100` is NEGATIVE-VERIFIED (the review, Part 5).

**C20** (`:11`, "Landed."): pass. "both runs of climb batch 35 (phase 4's first eighteen lines), the last at `1caac80b3b` on 2026-11-23"; the commit date is 2026-11-23.

**C21** (`:12`, weight none): pass; unchanged, with `owed.md`'s reason (plan-moves LOOK `:12`).

**C22** (`:13`, "Next."): pass. It holds:
- run 2 landed with all three rungs at the planner's defaults on his go of 08:4x, and its review `9d5d21bf57`;
- the review's "steps due": the base build and F-34's measure, `seed-worktree.sh` copying `build-one`, the two checks, the script and the manual;
- the list on 35b's line, with item 616 before row 1098;
- item 608 "held in its first three batches, climb batches 34b, 35 and 35b";
- the older findings, unchanged.

**C23** (`:58`): pass. Row 1100 "has climb batch 35's gate repair (`b7b5b0c02b`) and stays open, in the list beside row 935's order" (the review, Part 5).

**C24** (`:59`): pass. "without row 1100" is gone, and the line points to the next line for the list.

**C25** (the new line): pass.
- Its head is in `update.py`'s form; the pattern parses phase 4, 2026-11-23 and `1caac80b3b`.
- Its list is the review's Part 5 in order: 34b's list with row 994's new site and item 616 before row 1098; run 1's additions with row 1100 open beside row 935's order; the rungs of P-174 and P-165; this run's rows 1125 with 1122, 1121, 1123 and 1126, 1118, 1127 with 1112, rows 744 and 1120 once settled, row 1124's route, review.1's clauses.
- Rows 1118, 1122, 1126 and 1127 are homed. Row 1119 stays with the prelude.

**C26** (`:72`), **C27** (`:74`): pass. "row 1100, open, with climb batch 35's gate repair"; "row 1100 stays open with its gate repair". In C27, the extra pointer to "climb batch 35b's line" for row 996 follows C25.

**C28** (`:97`, plan-moves LOOK `:98`), **C30**, **C31** (`:241`, LOOK `:242`), weight none: pass; unchanged, each with `owed.md`'s reason.

**C29** (`:119`): pass. Row 815 has left the open list: "Climb batch 35b's rung M closed row 815 (`08860c527f`; F-406), and its checker sibling, row 770, stays open". `rows.md` has 815 closed and 770 noted, open.

**C32, C33** (`:801`, `:802`): pass. Both are moved whole to PLAN-history (plan-moves: 15 lines out, the same 15 in). The routing report gives the reason: the coordinator's, not his, by the review, Part 1, finding 3, and Part 4.
- E.worker.2's tool fix stands in "Next".
- E.worker.1's choice of a test is `owed.md`'s "For the coordinator".

**C34, C35, C37, C38** (weight none): pass; the lines at `:803`, `:804`, `:806` and `:807` are unchanged.

**C36** (`:805`): pass. The line keeps "No default on record; the text stands as it is" and gains its route, with the next batch that edits `booleans.tex`, cited to the review, section 2, as owed.

**C39** (`:808`): pass. It says that P-174 now names row 1124 in the rung's words, which holds with C13 applied, and keeps the question "Should they keep that row?" with "Default: as landed, row 1124 open with its expected failure."

**C40** (`:809`): pass. Its default gains "first among this run's rows in the list for the batch after".

**C41** (`:810`): pass. "No default on record; recommendation" becomes the route that `owed.md` names, by the skill's rule (`references/specification.md:22`, its evidence) and the review's finding 5. It informs him, and it invents no default.

**C42** (PLAN-history): pass. `plan-moves.py` passes. The routing report gives the reason for each of the 15 lines: C32 and C33 moved, the other 13 changed.

**C43, C44** (items 503, 493): pass. "row 1124 holds them"; "(row 1124)"; item 493's Home keeps rows 974 and 981.

**C45, C49, C50** (weight none): pass. There is no new item and no move to (a); `queue-check.py` gives 605 items and 0 new.

**C46** (item 608): pass. The head line says "first three batches", and "Landed" gains the third batch, cited to the review, section 4 ("the form holds in its third batch"). The item stays open.

**C47** (item 616), **C48** (the head's group): pass. Both point to climb batch 35b's line and `reviews/batch-35b-review.md`, Part 5. The group's name and its count of 1 hold.

**C51, C52** (weight none): pass. `check-index.sh` lists no note without its line.

## The mechanical checks of mech-1.md

No check fails.
- `words-subset.py` on the POSITIONS line, exit 1: information only. P-174 adds rung L's words (C13), as `owed.md` C13 asks, and `cut-only.txt` is empty because no change is a pure cut.
- `lengths.py`: six entries past 600 grew, reported but not failing. Each grew by the clause its change owes:
  - F-26 +88 (C12), F-253 +200 (C11), F-406 +99 (C10) and P-174 +74 (C13);
  - F-403 +362 (C7) and F-405 +176 (C9), each after cutting line numbers or paths.
  - C7's correction adds about 11 characters.
- `record.py check`: its two "from" reports, `FACTS-history.md:9618` and `POSITIONS-history.md:3666`, were there at 9d5d21bf5 before any change (`checks.md`). This run appended only after `:9714` and `:4270`.
- `plan-moves.py`, LOOK `:12`, `:98` and `:242`: these are `:12`, `:97` and `:241` at AT, shifted by C25's line. They are C21, C28 and C31, each kept with `owed.md`'s reason.

## Outside owed.md

The routing report notes that phase 4's closing paragraph (`PLAN.md:103` at AT) names neither run of climb batch 35. It was stale before this landing and is not in `owed.md`, so it is left to the coordinator. It is no failure of this round.

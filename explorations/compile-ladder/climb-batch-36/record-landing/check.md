<!-- The record-landing checker's verdict on climb batch 36's first round: for each change of owed.md, pass or each failure with its class, the passage, its source and the correction, then mech-1.md's checks. -->

# The check of round 1, climb batch 36

Read: `owed.md`; `entries-report.md`, `routing-report.md`; `mech-1.md`; `git -C /home/user/fortress-landing-36 diff 99035e231 -- explorations/ ':!explorations/coordinator/PLAN-history.md'` (PLAN-history's lead read for the moves' reasons); the entries through `facts-extract.sh`, rows through `ledger.py show` and `rows.md`; [S6] and [S8] of `entries.md`; `Specification/appendices/changes.tex:3714-3717`; the review (`explorations/reviews/batch-36-review.md`) at Part 1, section 3 and Part 5; CB36's sections 4 and "What the batch leaves out".

Counts: 78 changes pass, 15 fail, with 16 failures: fidelity 6, form 5, routing 5, coverage 0.

## The entries (writer: entries)

**C1, F-26.** Pass. "save two generic ones one inside the other, which stop at an extending object's first instance (F-405)" holds against row 780 ("stop at an extending object's first instance"); F-405 states row 780's case. +58 net, under the clause.

**C2.** Pass (weight none).

**C3.** Pass (weight none). F-53 is not in the diff.

**C4, F-76.** Pass. The writer's boundary, "where the tied declarations, and every declaration more specific than one of them that the call may run, have no static parameters", is the text's (`changes.tex:3715-3717`: "whose most specific declarations, and every declaration more specific than them that the call may run, have no static parameters") and rung K's (`tieType`: "where the tied declarations have no static parameters and no declaration with static parameters that is more specific than one of them ... may run"); the gather's clause left out the tied declarations' own condition. "F-408 gives how it decides, refuses or keeps any other tie" carries the tie kept by place.

**C5.** Pass (weight none).

**C6, F-225.** Pass. "P-146 names the self-typed traits only; this reading of a `comprises` trait is a default of a batch's plan, which the curator has not decided." gives the status that owed asked, in F-377's words; +84, under the owed +92.

**C7.** Pass (weight none). F-240 is not in the diff.

**C8, F-253.** Pass (kept; the exception names row 1134's shape).

**C9, F-257.** Pass. "(row 780)" placed under "two functional methods of generic traits"; row 1133's pair, neither domain inside the other, is not read by `methodPairValid` and falls under "of none of the kinds above".

**C10, F-334.** Pass. "F-408 gives how a tie among the most specific is decided, refused or kept by place."

**C11, F-341.** Pass. "a field's or an object's value parameter's type" resolves the two readings to rung G's; "one written as a static parameter's bound or a `typecase` arm's type loads (row 1135)" is row 1135's claim. Note: the glob `NumeralType*Walk.fss` also matches `NumeralTypesWalk.fss`, which the list already names; harmless.

**C12, F-342.** Pass. "P-174's four numbers save at a call and across components (F-407)".

**C13, F-345.** Pass (kept).

**C14, F-347.** Pass.

**C15.** Pass (weight none).

**C16, F-377.** Pass. `VarFieldAssignedSubtypeRun` stays in the Tests list.

**C17.** Pass (weight none).

**C18, F-396.** Pass. "a failing `assert` with a message, which dies with an `AbstractMethodError` in place of its `FAIL` line (row 1140)" is the review's finding 3 and row 1140's claim.

**C19.** Pass (weight none).

**C20, F-405.** Pass. "An object that inherits two such methods of one name from two traits, neither more specific, with no declaration at their meet, loads and runs, where the Meet Rule refuses the set (row 1139)" and "`GenericMethodBoundsDifferWalk.fss`, whose object `Both` pins row 1139's set as valid" meet the review's finding 2.

**C21.** Pass (weight none).

**C22, F-407.** Pass. "It builds P-174's rule for a coercion's body, with P-173's conversion."; the two departures match rows 1131 and 1132.

**C23, F-408.** Fail, 1.
- Points (2) and (3) pass: "It builds P-45, the choice by declared parameter types, and P-60's tie, with `self` in the signatures as F-225 gives." Point (1) passes for the order: "that order is a default of a batch's plan, which the curator has not decided." The writer's choice to state the tie kept by place as row 1136's departure, not as a default, passes: row 1136 is now `NEGATIVE-VERIFIED` by his words (C47), and the report names the choice under "Decisions not taken".
- fidelity: the title, "...and refuses a tie that the rules leave.", claims more than the entry's own text and its source: "There a tie that no rule decides among the unit's own declarations, in a set that the overloading check accepts, is kept by place with no error (row 1136)"; row 1136's claim, "keeps with no error the first by place of a tie that no rule decides among the unit's own declarations". Correction: end the title "and refuses a tie that the rules leave, save one among a unit's own declarations (row 1136)."

**C24, F-409.** Pass.

**C25, F-405, past 600.** Pass. The key's mechanism, the `map` example and the source names moved out; the kept departures are named under question 1.

**C26, F-341, past 600.** Fail, 1.
- form: the entry stays at 2,699 characters, and `entries-report.md` names no question for the text it keeps past 600 ("Size 2,941 to about 2,691." only). Source: the brief's form rule ("A sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`"); owed C26. Correction: name in the report the question that keeps each sentence past 600 (the conversion places, the refusals, the dispatch rule, the load check), or move a sentence that no question keeps to its report.

**C27, F-377, past 600.** Pass (question 1 named for the kept casts and exceptions).

**C28, F-396, past 600.** Fail, 1.
- form: at 2,363, the report names only what moved out ("the rows' mechanisms are their rows' (question 5), a line number moved out (question 4)"), not the question that keeps the rest. Correction: name it in the report for each kept sentence past 600, or move the sentence out.

**C29, F-347, past 600.** Fail, 1.
- form: at 1,735, the report gives "(question 4; F-407's report holds the names)" for the cut only. Correction: as C28.

**C30, F-257, past 600.** Pass ("each is the evidence of a message (question 1)").

**C31, F-407, past 600.** Pass ("each path's rule is question 1").

**C32, F-408, past 600.** Fail, 1.
- form: at 1,578, the report gives "+53: the decisions and the status; the restated rule went out first", and no question for the kept sentences (the decider, P-60's boundary, the refusal and its exception, the cast, the tests). Correction: as C28.

**C33, F-409, past 600.** Fail, 1.
- form: at 1,076, the report gives "(question 4)" for the cut source names only. Correction: as C28.

**C34, F-366.** Pass. "the checker refuses `u =/= 0` at `RR32` and `RR64` (row 1059) and `u = 0` at `RR32`, an ambiguous coercion (row 528)" is row 528's claim ("`c = 0` is refused, 'Ambiguous coercion in call to operator ='"); +3.

**C35, F-174.** Pass. "in a trait with static parameters it stops at an extending object's first instance".

**C36, F-139.** Pass. "`=` at the prelude's `RR32` overflows the stack, save `c = 0`, refused statically (row 528)": the writer rightly keeps "`=` at `RR32`", since row 528 has `a = 1.5` overflow too.

**C37, F-232.** Pass. "their order" is the identity-hash order of `DeclaredFunction`s; row 996 is the code generator's byte order, not a choice among a call's declarations.

**C38, F-277.** Fail, 2.
- fidelity: "It reads `self` in a trait whose `comprises` clause lists types as the trait met with those types too (F-225)." reads, for two listed types, as the meet with each of them. Source: F-225, "the trait met with the union of those types"; review-queue item 621, "the bodies and the exclusion test keep `T ∩ (U1 ∪ ... ∪ Un)`". Correction: "as the trait met with the union of those types".
- fidelity: the sentence follows "It builds P-157." with no status, so a reader takes P-157 to cover a `comprises` trait, the same misreading that owed C6 corrects in F-225. Source: P-157 ("the exclusion test reads a self-typed trait's `self` as `C[\X\] & X`"); CB36, "For the record-landing workflow" (K1 is the planner's default past P-146's words); item 621. Correction: give the clause its status in a few words, as "..., by F-225's reading, a default of a batch's plan that the curator has not decided (F-225)."

**C39, F-376.** Pass. "of which the second is the more specific by its declared parameter type and so, by reading, the checker's choice (F-408)" states the kind of its evidence; `compiler_tests/OverloadReturnObjectDomain.fss:10`, `:16` hold `Box`'s `keep(self)` and `keep[\T\](x: T)`.

**C40 and C41, P-174.** Pass.
- Changed, before: "Row 1124 holds where the tree departs: walk loading a numeral type written as a return type, a variable's or a field's type, which it refuses only where a numeral meets it. The tree departs too, with no row, where the numeral coercions of the one library and of many tests call a getter on the four numbers, as `v.asZZ32`, and where the checker and the literals chapter read each of the four as a `ZZ` value wherever it stands (F-342, F-345)." After: "Row 1135 holds where the tree departs: walk loading a numeral type written as a static parameter's bound or a `typecase` arm's type. The tree departs too on the compiled path, where a number at a call in a coercion's body runs the declaration that takes it as a `ZZ`, not a more specific one that its conversion reaches (row 1132), and where a numeral at another component's type, whose coercion converts a number that does not fit, is not refused statically (row 1131)." Each clause is its row's claim; the second sentence is N's proposed words (`rung-numeral-coercion-body/REPORT.md:117`) without the row's mechanism. The first takes row 1135 in place of G's proposed words; the sentence's job is to name where the tree departs, and row 1135 is that departure.
- Decided, before and after alike: "A numeral's type exists only at compile time ... every number type, the library's too, takes a numeral through a coercion generic over the four numbers." Where, alike: "every number type, the library's too". Requires, alike: "A coercion's body is a computation at compile time, with no method invocation"; "No numeral value exists when a program runs ... and is written only as a coercion's or an operator's parameter type."

**C42, P-60.** Pass.
- Changed, before: "Rows 543 and 551: the compiled checker gives no call an intersection type where any declaration of the family has static parameters, and walk checks no `comprises` clause declared outside the main component." After: "Row 551: walk checks no `comprises` clause declared outside the main component." The text that owed asked for; row 543 is closed (`da5f70777`). Not in `cut-only.txt`, since "Rows" to "Row" is an added word for `words-subset.py`; the report says so.
- Decided, alike: "The specification reads a `comprises` clause at the level of values." Where, alike: "sound for ground declarations, at calls that need no coercion"; "The typing by the intersection is not extended to it". Requires, alike: "The compiled checker uses coverage only in its overloading rules ... and not in its general subtype test"; "the specification states that boundary".

**C43, P-45.** Pass.
- Changed, before: "and fails at a call on such a pair in a generic trait (rows 779 and 780)"; after: "and stops at an extending object's first instance on such a pair in a generic trait (rows 779 and 780)", row 780's claim, owed's words.
- Decided, alike: "Overloaded declarations may differ in their static parameters." Where, alike: the checker's three rules and "Walk chooses among overloads by the parameter types that each declaration declares". Requires, alike: "Walk and the checker must accept the same pairs. The library repairs, by declarations of its own, the overload sets that the checker refused, and no line of microGPT's two programs changes."

**C44, C45, C46.** Pass (weight none; P-146 and P-45's list unchanged in the diff).

**C47, row 1136.** Pass. `CONTESTED` to `NEGATIVE-VERIFIED`; his words quoted with their dates; "Repair: keep the first only where the check refuses the set, or for duplicates." is the review's finding 1 ("keeps the first only where the overloading check refuses the set or the declarations are duplicates"); the anchor moved to `Functionals.scala:1212-1213` at `61b50cd34`.

**C48, row 879.** Pass. "a new row opens if his answer is the intersection" for owed's "reopens" is right: `ledger.py:954`, "a closed row stays ...: a new issue gets a new row". Status stays `FIXED`.

**C49, row 1139.** Pass. Section 4, the Meet Rule's section (`overloading.tex:259`), the plain test as reproducer, siblings 1133, 1134, 780.

**C50, row 1140.** Pass. Section 12, reproducer `none` with the command and step 7's verdict line; the class `codegen` is named as a choice in the report.

**C51, row 779.** Pass. "in a trait with static parameters the pair stops at an extending object's first instance (780)".

**C52.** Pass (weight none).

## The routing (writer: routing)

**C53, "Runs."** Pass.

**C54, "The live thread."** Pass. `b99b95517d` is the commit the gate ran on (`gate/summary.txt:167`); the review's section 1 added first.

**C55, "Landed."** Pass.

**C56, "Next."** Pass.

**C57, climb batch 36's line.** Fail, 1. The line parses (`revival-page/update.py`, `LANDED`, `RUN_2`); the list is the review's Part 5 in its order, then CB36's later list.
- routing: "the `Both` set refused at load with its row" and "the `assert` crash's row if run 2's rung Y does not take it" name two filed rows by subject. Source: `mech-1.md`, "row 1139, in '4. Operators and overloading under walk'" and "row 1140, in '12. ...'"; the routing report's own last line. Correction: name them rows 1139 and 1140.

**C58, climb batch 35b's line.** Fail, 1.
- fidelity: "The rest is in climb batch 36's list, the next line." Part of the rest is run 2's, which the next line names only by its rungs: rows 1101 to 1103 (CB36, rung Y), 1110 and 1111 (rung T), 1121 (rung B) and P-165's getter `asRR64` (rung F); and review-routed.1's test is held by its own line under "Climb batch 35, listed for his review" (`PLAN.md:796`), on neither list. Correction: "The rest is run 2's, climb batch 36b (rows 1101 to 1103, 1110, 1111 and 1121, and P-165's getter), or in climb batch 36's list, the next line; review-routed.1's test stays with its own line."

**C59, F-34's line.** Pass.

**C60, varargs.** Pass.

**C61, the rehearsal's walls.** Pass.

**C62, phase 5.** Pass.

**C63, item 101.** Pass. Question and default unchanged.

**C64, C65.** Pass (weight none; `mech-1.md`'s LOOK lines `PLAN.md:99` and `:243`, each with owed's reason to stay).

**C66, climb batch 28's K.worker.1.** Pass. The line keeps "No default on record" beside "As landed, the declarations' places", where owed said the former gives way; the routing report gives the reason (his words reject the landed order, so no default stands), and no default is invented.

**C67, judge-gate.3.** Pass.

**C68, L.worker.2 to L.skeptic.3, moved.** Fail, 1.
- routing: a move as built names no commit: "Row 1124 closed by rung G." (routing report), "since rung G closed row 1124" (PLAN-history's lead). Source: the brief ("built, by a named commit"); `rows.md`, row 1124, "fixed `df5948e7b`". Correction: name `df5948e7b` in both.

**C69, gather.1, moved.** Fail, 1.
- routing: as C68, "Row 1125 closed by rung G."; row 1125 is closed by `df5948e7b` (`rows.md`). Correction: name `df5948e7b`.

**C70, review.1 of climb batch 35b, moved.** Fail, 1.
- routing: "Its clauses written by rung G and the judge's repair (`6a0f7ffc62`)" names the judge's commit but not rung G's. Correction: "rung G (`df5948e7b`) and the judge's repair (`6a0f7ffc62`)".

**C71.** Pass (weight none).

**C72, the group's lead.** Pass.

**C73, C74, C75.** Pass. Moved as settled by decisions: P-174 and P-46; P-180; P-174 and P-180.

**C76, K.worker.1 and K.skeptic.1, moved.** Fail, 1. The move's reason passes: his words of 23:30 UTC on 2026-11-23 and 07:0x UTC on 2026-11-24, cited with their times.
- routing: owed C76 hands the reading to the coordinator ("the coordinator confirms the reading"), and the report's "To confirm: the three 'Needed by' lines above, and C79's kind." leaves it out. Correction: add to "Changes for the coordinator" the reading to confirm: his words of those two times answer the item, the error standing in the unit too.

**C77, C78.** Pass. Told items, not consequential, closed as landed and named for the landing's one line.

**C79, item 419.** Pass. What is asked, "No default on record" with its reason, "Landed" at fork K4 since `da5f70777`, "The other way", "Its cost: Not sized", "Home" with F-408, row 1136, CB36's fork K4 and both PLAN lines, "Needed by ... (set by the landing workflow)"; its head line moved from "No planned work" (51 to 50); the item stays open, as a consequential question must.

**C80, K.skeptic.2.** Fail, 1.
- fidelity: the new line "row 879 reopens if he takes the other way" contradicts row 879 as C48 wrote it, "a new row opens if his answer is the intersection", and `ledger.py:954` ("a closed row stays ...: a new issue gets a new row"). Correction: "a new row opens if he takes the other way".

**C81, review.1, moved.** Pass.

**C82, item 621.** Fail, 1. "Landed", "Its cost", "Needed by" and the head line pass.
- fidelity: "Home" reads "879 (closed by the default; it reopens if he takes the other way)". Source: as C80. Correction: "879 (closed by the default; a new row opens if he takes the other way)".

**C83, "of 2012".** Pass. `review-queue.md` head and item 621 (twice), and CB36's six lines; no "2012" left in either for this sentence.

**C84, the queue's head.** Pass. "The batch after climb batch 36: 3", "No planned work: 50", 93 open (`queue-check.py`); item 616's "Needed by" set by the workflow.

**C85, judge-review.1, moved.** Pass.

**C86, item 586.** Pass. Premise brought in line, with K8's tie to item 621; question and default unchanged.

**C87, C88, C89, C90.** Pass.

**C91, C92, C93.** Pass (weight none).

## mech-1.md

Every check passes; no failure to trace. Its lines to read:
- `words-subset.py`, exit 1, information: P-45 (C43), P-60 (C42: "row" from "Rows" to "Row") and P-174 (C40, C41) add words; none is a cut-only change, and no `cut-only.txt` was written.
- `plan-moves.py` LOOK `PLAN.md:99` (item 91, Q-walk): C64, owed's reason to stay.
- `plan-moves.py` LOOK `PLAN.md:243` (climb batch 23's finding 2): C65, owed's reason to stay.
- `lengths.py`, 11 entries over 600 that grew: each by the clause that its change owes (C1, C4, C6, C37, C38, C12, C34, C39, C23, C43, C40 and C41); C38's correction adds about 13 characters to F-277.
- `record.py check`, "reported, not failing": `FACTS-history.md:9618` (F-366) and `POSITIONS-history.md:708`, `:3666` predate this run (at `99035e231`); no change of this run.

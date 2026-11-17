<!-- The checker's report on the first round of climb batch 31b's record-landing: for each change of owed.md, pass, or each failure by class (coverage, fidelity, form, routing) with its passage, its source and its correction, then the causes of mech-1.md's non-passing outputs. -->

# The check of climb batch 31b's record-landing, round 1

Read against `owed.md`, the worktree's diff from AT `257cae950` (PLAN-history's gained lines left out), `entries-report.md`, `routing-report.md`, `record.apply` and `mech-1.md`. Library lines were checked in the worktree, whose `Library/` and `ProjectFortress/` equal `00dd16a89`.

A rule that most failures below apply: an entry over 600 characters keeps each sentence past the 600 only with the question of "What an entry is" that keeps it, named in `entries-report.md` (record.md, "The pass", 5; the entries brief, "Your files", `entries-report.md`). Where a block says "form: no past-600 question", the report gives the entry's size and no such question. The correction is the same each time. For each sentence past 600, add a line to the change's block in `entries-report.md` with the question that keeps it, or move the sentence to the report that the entry cites (question 4), with the entry's text unchanged otherwise. The POSITIONS changes are exempt: under the curator's rule of 2026-10-31 only the named sentence may change.

## FACTS and POSITIONS: the pass

- **C1, F-24.** Fail.
  - form: no past-600 question (951). The report says only "no sentence is new".
- **C2, F-34.** Pass (with C71). The clause added on `7858d0e97b` matches the review, section 3. Its "range operators 4" is the review's 'Error trying to close method scope' 4: `switch-rehearsal.md`, section 3, gives that kind as "the four range operators over pairs and triples" (row 819). The moved detail stands in `plan-31/PROBES.md` section 3 ('refused declarations 11 ... kinds 6') and in `switch-rehearsal.md` section 3 ("varargs in a trait"). The Detail gains the review, section 3. The entry grew by 62, less than the clause. The past-600 questions are named.
- **C3 to C6.** Pass. Weight none.
- **C7, F-74.** Fail.
  - form: no past-600 question (808).
- **C8.** Pass. Weight none.
- **C9, F-79.** Fail.
  - form: no past-600 question (1360).
- **C10, C11.** Pass. Weight none.
- **C12, F-122.** Fail.
  - form: no past-600 question (934). The cited lines hold: `RR32.java:326` and `simpleDoubleArith.java:149` hold `(long) Math.rint`.
- **C13 to C16.** Pass. Weight none.
- **C17, F-229.** Pass. "failed ... matched ... threw" is supported. The way was measured: `rung-library-factories/REPORT.md`, section 4, "the `CastError` runs", and decision 1, "(section 4, measured)". The past-600 question is named.
- **C18 to C21.** Pass. Weight none. F-240's figures are unchanged in the diff, and F-53 is not in the diff.
- **C22, F-262.** Fail.
  - form: no past-600 question (1329).
- **C23 to C27.** Pass. Weight none.
- **C28, F-291.** Fail.
  - form: no past-600 question (1322).
- **C29, F-296.** Fail.
  - form: no past-600 question (1151).
- **C30, F-299.** Fail.
  - fidelity: the passages are the title's "373 of the one library's 401 live bindings" and the new clause "`NN64` 31 (its 32nd binding, `signed`, counted with the small rest)". Both figures are of this landing. Their sources are `compile-ladder/rung-number-objects/REPORT.md:45` ("The library's bindings: 401, of which ... 373") and `climb-batch-31b/RECORD.md:101`. Neither is in the Detail, whose newest source is climb batch 28's record. F-299 owns this count (record.md: "A count that each landing changes has one entry"), so its Detail must hold the count's source.
  - Correction: the Detail gains `compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" (its subsection on the library's text gives the 401 and the 373).
- **C31.** Pass. Weight none.
- **C32, F-303.** Pass. `StaticNativeApp.java:64` was checked, and the past-600 question is named.
- **C33, F-305.** Fail.
  - form: no past-600 question (1468).
- **C34, F-306.** Fail.
  - form: no past-600 question (1307).
- **C35, F-307.** Fail.
  - form: no past-600 question (1106).
- **C36, F-308.** Fail.
  - fidelity: the passages are "`NN32`'s 30, `NN64`'s 30 and `Char`'s 40 bindings name their helpers" and "All 100 bindings over these types name helpers".
    - F-299 now says that the object `NN64` holds 32 bindings: 31 counted with `NN64`, and `signed` with the small rest.
    - Read beside F-299, F-308's 30 reads as all of `NN64`'s bindings. It is a count of one fewer, which `owed.md` C36 asks the pass to make "readable as what it counts".
    - The report leaves it ("the sources do not say which two"). That reason does not block a clause that states the scope.
  - Correction: one clause, with no other growth. For example: "`NN64`'s 30 (by this entry's count; F-299 counts 31 of the object's 32)". Keep "All 100" read as this count's.
  - form: no past-600 question (2038).
- **C37, F-310.** Fail.
  - form: no past-600 question (935).
- **C38, F-311.** Fail.
  - form: no past-600 question (681).
- **C39.** Pass. Weight none.
- **C40, F-313.** Fail.
  - form: no past-600 question (1132).
- **C41, F-314.** Fail.
  - form: no past-600 question (1066).
- **C42.** Pass. Weight none.
- **C43, F-323.** Fail.
  - form: no past-600 question (1115).
- **C44, F-327.** Fail.
  - form: no past-600 question (1232).
- **C45, F-328.** Fail.
  - form: no past-600 question (1004).
- **C46, C47.** Pass. Weight none.
- **C48, F-344.** Fail.
  - form: no past-600 question (850).
- **C49, C50.** Pass. Weight none.
- **C51, F-352.** Fail.
  - form: no past-600 question (2104). Its "nothing landed" still holds, since the switch has not landed.
- **C52 to C54.** Pass. Weight none.
- **C55, F-361.** Pass. "Measured once on `832f7d0d91`, in a scratch tree that landed nothing" is the owed clause. It grew by 19 for that clause, and the question is named.
- **C56, F-366.** Fail.
  - form: no past-600 question (2941). The report says only "the entry grows by nothing".
- **C57.** Pass. Weight none.
- **C58, F-369.** Fail.
  - form: no past-600 question (1769).
- **C59 to C61.** Pass. Weight none.
- **C62, F-375.** Fail.
  - fidelity: the passage is "The reports run each pair whose verdict changed, old against new."
    - It claims completeness for both reports. The old words were "the report runs each old against new", said of the pairs where the reading and the shortcut differ.
    - Rung O's cited section, "Every pair that walk refuses at load after the change and loaded before", runs no pair old against new. It reports that none was refused among the library and the plain tests, and the skeptic's run of the 163 `XXX` tests.
    - The pairs that rung O ran old against new are those that it found: `pick` (row 1044) in "Programs run old against new", and `pickFirst` (row 550) and the skeptic's `SkOvSubRet` (row 697) in "What a program sees differently".
  - Correction: "The reports run the pairs found to change, old against new". In the Detail, rung O's report also names "Programs run old against new".
- **C63, C64.** Pass. Weight none.
- **C65, F-378.** Fail.
  - form: the passage is the Detail's "`compile-ladder/rung-tuple-parameter/REPORT.md`, "The convention as built", which names the bridges' members and lines".
    - That section names `tupleElementsBridge`, `Instantiater.visitMethod` and `callTakesTupleBoxed`, but no line.
    - The cut `Instantiater.java:119-165` stands at `REPORT.md:5`, in the header, and at `:69`, in "Where the fix belongs, and the precedent search". The CodeGen lines stand at `:127`.
    - So the pointer's words claim more than its section holds.
  - Correction: "which names the bridges' members". If the lines are wanted, add "and "Where the fix belongs, and the precedent search", which gives the class loader's lines".
- **C66, F-379.** Fail.
  - fidelity: the new claim is "and so do two kinds of invalid pair: ... two plain lists against the Subtype Rule, such as `f(x: Number): ZZ32` beside `f(x: ZZ64): String` (row 697)".
    - It is this batch's observation, the skeptic's `SkOvSubRet`.
    - Its source is `rung-number-objects/REPORT.md`, "What a program sees differently" (`:160`), and `SKEPTIC.md`, "Programs". The same section also holds rows 550 and 1044 at the five types and 'Attempt to extend object type ZZ32'.
    - The Detail names only "What changed and why", which does not mention row 697 (grep: no "697" in `REPORT.md` outside `:160`). The source is in `record.apply`'s note only.
  - Correction: the Detail reads "`compile-ladder/rung-number-objects/REPORT.md`, "What changed and why" and "What a program sees differently"".
  - The rest passes. The table clause, the cut of the split's history (in the history block) and the move of walk's native rule (`REPORT.md:52`, `:137` name `BuildNativeEnvironment`) hold, and the past-600 questions are named.
- **C67, F-380.** Pass. The Detail's report section names `numeralResult` and `joinInto`, and the skeptic's "Findings and fixes" names `outOfRangeAt`.

## FACTS and POSITIONS: the other changes

- **C68, F-378 past 600.** Pass. It went from 1360 to 1296, with the question named. The pointer's words are failed at C65.
- **C69, F-379 past 600.** Pass. It went from 1602 to 1445, with the questions named.
- **C70, F-380 past 600.** Pass. It went from 1237 to 1107, with the question named.
- **C71, F-34.** Pass. See C2. The entry keeps 24 on `832f7d0d91`, gains 21 on `7858d0e97b` measured once, and says "No count is taken on later code".
- **C72, F-257.** Fail. "rows 539, 779 and 1058" is right: row 1058 is a valid pair refused 'fails the Return Type Rule' (rows.md).
  - form: no past-600 question (2036). The report gives "Size: 2035, the same"; `lengths.py` gives 2036, +1, the owed "1058".
- **C73, F-240.** Fail. The clause is cut and every figure is the commit stage's, as `owed.md` allows.
  - form: no past-600 question (2202).
- **C74, F-285.** Fail. The seven lines were checked by content at `:1670`, `:2804`, `:2824`, `:3190`, `:3195`, `:4849` and `:4866`.
  - form: no past-600 question (1683).
- **C75, F-75.** Fail. The new clause rests on F-379 and F-53, the owner of the distance (record.md: other entries give the count's number).
  - form: no past-600 question (1999).
- **C76, F-32.** Fail. The 401 and the 373 follow F-299.
  - form: no past-600 question (1897).
- **C77, F-327.** Pass. "F-299's 373". The size failure is at C44.
- **C78, F-139.** Pass. "`=` at the prelude's `RR32` overflows the stack (row 528)" is row 528's claim (rows.md). It is 549 characters.
- **C79, F-140.** Fail. 'got type ZZ64' is row 527's message.
  - form: no past-600 question (1727).
- **C80, P-68.** Pass, cut only (`words-subset`: 0 added words).
  - Before: "today `truncate` is `ZZ64` on both paths, the brackets are `ZZ64` under walk and `RR64` compiled, and `round` is `ZZ64`, but `ZZ` in the `FortressLibrary` component's `trait RR64`."
  - After: "... and `round` is `ZZ64`."
  - Unchanged before and after:
    - the decision: "On the float types, `floor` and `ceiling` return the same float type, while the brackets ⌊x⌋ and ⌈x⌉, `round` and `truncate` return `ZZ`";
    - where it applies: "in each of the library's declarations of them";
    - what it requires: "one library rung after the switch-over, which first counts the interpreter tests whose output changes".
  - The tree holds one `round(self):ZZ64` (`Library/FortressLibrary.fss:548`), and no `trait RR64`.
- **C81, P-166.** Pass.
  - Before: "The library declares `value object BigNum extends ZZ` (`LibraryBuiltin/FortressBuiltin.fss:544`, `.fsi:196`), ... `Ratio` (`Library/FortressLibrary.fss:649`)".
  - After: "The library declares `value object ZZ` (`Library/FortressLibrary.fss:1170`), ... `Ratio` (`Library/FortressLibrary.fss:719`)". Both lines were checked.
  - Unchanged before and after:
    - the decision: "`ZZ`'s and `QQ`'s values are value objects, and the specification's list of reference objects stops naming arbitrary-precision numbers";
    - where it applies: two `ZZ` values or rationals built apart, and `Specification/basic/objects.tex`;
    - what it requires: "in the revision form (P-96) with one Appendix I entry".
  - This is the sorter's fewest-words change. The report's question 1 rightly holds the "Why" for him. Its ground was the team's declaration, and the "Why" now reads against the revival's own. No change of `owed.md` files that question as an item. It needs a home in the landing report (the coordinator's).
- **C82, P-162.** Pass.
  - Before: "`Float`'s power", "`Float`'s floor and ceiling brackets, the mixed powers of `Float` and `RR32`".
  - After: "`RR64`'s ...".
  - The same declarations, now the object `RR64`'s (F-303, F-323). The decision, its reach (the 30 bindings in their three groups) and its requirement are unchanged.
- **C83, P-165.** Pass.
  - Before: "`Float`'s `^` at a `Number` exponent".
  - After: "`RR64`'s `^` at a `Number` exponent".
  - The decision, "`asFloat` and the `=` built on it leave `trait Number`", is unchanged, and so are its reach and requirement.
- **C84, P-163.** Pass.
  - Before: `FortressBuiltin.fss:594`. After: `:409`, which holds `builtinPrimitive("com.sun.fortress.nativeHelpers.simpleChar.charToExprString")`.
  - The decision is unchanged.
- **C85 to C91.** Pass. Weight none.

## PLAN and PLAN-history

- **C92, PLAN.md:9, "Runs".** Fail.
  - fidelity: the passage is "52 of 52 on the merged trees of climb batch 32 and of both runs of climb batch 31 at their gathers ... (F-283; row 986; `compile-ladder/climb-batch-31b/RECORD.md`, "The tests on the merged tree")".
    - The citation was swapped from `climb-batch-31/RECORD.md` to `climb-batch-31b/RECORD.md`.
    - 31b's section holds only run 2's demos ('demos: 52 run, 52 reached their end'), so run 1's 52 of 52 lost its source.
  - Correction: cite both: "`compile-ladder/climb-batch-31/RECORD.md` and `compile-ladder/climb-batch-31b/RECORD.md`, "The tests on the merged tree"".
- **C93, PLAN.md:10, "The live thread".** Fail.
  - fidelity: the passage is "no stage has taken the count after run 2, where 17 is expected". It drops the condition.
    - The review: "Expected 17 if T's four pass their next wall" ("The steps due before the batch after", 4, and Part 5, item 512).
    - Section 3: "the record's 17 is within reach; whether each declaration then compiles is not shown" and "By reading, O may" move the number.
    - The routing writer keeps the condition at `PLAN.md:67` and in item 512.
  - Correction: "where 17 is expected if rung T's four pass their next wall".
  - The rest passes: the gate in `update.py`'s form, and F-378 to F-380 and 373 of 401.
- **C94, PLAN.md:11.** Pass.
- **C95, PLAN.md:12.** Pass. The one library's half is built at `f6e24650e7`, and 516, 518 and 519 stay open for his review. Its items 371, 372 and 515 remain answered, which is `plan-moves`' LOOK line.
- **C96, PLAN.md:13, "Next".** Fail.
  - fidelity: the passage is "the code generator's count on the landed tree, where 17 is expected (the same steps, 4)". Step 4 reads "Expected 17 if T's four pass their next wall".
  - Correction: "where 17 is expected if rung T's four pass their next wall".
  - The rest passes. The order is 512, 577, 572. Finding 1 holds nothing. Row 1049's test and the trace are still owed. Items 528, 530 and 533 stay in (a), which is the LOOK line.
- **C97, PLAN.md:53 and the new line 54.** Pass.
- **C98, PLAN.md:55, natives.** Pass.
- **C99, PLAN.md:67, F-34's line.** Pass. It gives 21 in 6 kinds on `7858d0e97b`, "17 is expected if rung T's four pass their next wall", rows 819, 992 and 832 closed by `06cd094706`, and "whether each then compiles is not shown".
- **C100, PLAN.md:69.** Pass.
- **C101, PLAN.md:70.** Pass.
- **C102, PLAN.md:83.** Pass.
- **C103.** Pass. Weight none. The LOOK line at `:92` is owed's `:91`, shifted by the new line 54.
- **C104, PLAN.md:96.** Pass.
- **C105, PLAN.md:98.** Pass.
- **C106, PLAN.md:146, heading.** Pass.
- **C107, PLAN.md:148, item 97.** Pass. It gives both ways, the default as landed, and item 518.
- **C108, PLAN.md:149, item 98.** Fail.
  - routing: the passage is "98. Finding 4, fork O4 of run 2: the merge did not wait for row 959, so a `typecase` arm ... takes every value, and ... were respelled ... Default: as landed, the record's fork O4; ... Review-queue item 519."
    - The line says what landed and gives no ask. Its old question, "Does the merge wait for row 959?", was cut and no question replaces it.
    - A PLAN line whose text stands in another home is "what is asked, its default, and a pointer" (`climb-batch-workflow.md`, "After the landing", step 2).
    - Queue item 519 holds the question.
  - Correction: open with the ask, as item 519 does. For example: "Is a `typecase` arm at a removed name acceptable until row 959 is repaired, with the two respelled arms kept? The other way: row 959 first, and the two arms deleted."
- **C109, PLAN.md:153, item 99.** Pass.
- **C110, PLAN.md:155-158, item 101.** Pass. It gives the ask (keep P-37 or add a third exception), the default as landed, and item 586.
- **C111.** Pass. Weight none. The LOOK line at `:248` is owed's `:243`.
- **C112, PLAN.md:289.** Pass. Built by `d3095ca77f`, named in the report.
- **C113, PLAN.md:305.** Pass.
- **C114, PLAN.md:308.** Pass.
- **C115, PLAN.md:348 moved.** Pass. Built, `f6e24650e`.
- **C116, PLAN.md:663.** Pass.
- **C117, PLAN.md:824 moved.** Fail.
  - routing: the passage is the report's "C117 | PLAN.md:824, climb batch 32's review-routed.2 | moved to PLAN-history (built) | `RECORD.md:264`".
    - A move for "built" names its commit.
    - `RECORD.md:264` says "done by rung E" and gives no hash. PLAN-history's opening names `d3095ca77f`, but the report, where the move's reason is checked, does not.
  - Correction: "built by rung E, `d3095ca77f` (`RECORD.md:264`)".
- **C118, PLAN.md:843.** Pass.
- **C119, PLAN.md:850.** Pass.
- **C120, PLAN.md:857.** Pass.
- **C121, PLAN.md:869, the group's opening.** Pass.
- **C122, C123.** Pass. Weight none.

## The review queue: new items

Each new item gives its ask or its "told", its default from the review or the PLAN line, and its "Needed by" as `owed.md` gives it.

- **C124, item 579, (b).** Pass.
- **C125, item 580, (c).** Pass.
- **C126, item 581, (c).** Pass.
- **C127, item 582, (c).** Pass.
- **C128, item 583, (c).** Pass.
- **C129, item 584, (c).** Pass.
- **C130, item 585, (c).** Pass.
- **C131, item 586, (b).** Pass. It holds both options and costs, the default 1a as landed, and "Needed by: before the switch-over".
- **C132, item 587, (c).** Pass.
- **C133, item 588, (c).** Pass. It says that his go "put no question to him".
- **C134, item 589, (c).** Pass.
- **C135.** Pass. Weight none. None of the six `skill-touched` items is filed.

## The review queue: existing items

- **C136, item 516.** Pass. It is still open in (b), the batch's default is not taken as his word, and it has a new "Needed by".
- **C137, item 518.** Pass.
- **C138, item 519.** Pass.
- **C139, the head and "When each item is needed".** Pass. The counts are 247 open, 92 consequential and 155 routine. That is 11 new items, 2 of them in (b), and agrees with `queue-check.py`. The new group holds 14 items, 4 consequential.
- **C140, item 577.** Pass. Its question and default are unchanged.
- **C141, item 578.** Pass.
- **C142, item 572.** Pass.
- **C143, item 512.** Pass. It keeps "17 if rung T's four pass their next wall".
- **C144, item 563.** Pass.
- **C145, item 564.** Pass.
- **C146, item 568.** Pass.
- **C147, item 570.** Pass.
- **C148, item 544.** Pass.
- **C149, item 513.** Pass.
- **C150, item 515, (a).** Pass.
- **C151, item 371, (a).** Pass.
- **C152, item 372, (a).** Pass.
- **C153, item 79, (a).** Pass.

## INDEX and other notes

- **C154, CLIMB-BATCH-31.md, list item 4.** Pass.
- **C155, CLIMB-BATCH-31.md, list item 6.** Pass.
- **C156, CLIMB-BATCH-31.md, list item 7.** Pass.
- **C157.** Pass. Weight none.

## For the coordinator

- **C158 to C182.** Pass. Each has writer none. The routing report names C178, C179 and C180 for the coordinator. It also names item 574's stale "Needed by", which no change of `owed.md` holds.

## The outputs of mech-1.md that are not a plain pass

Every check passes. Each other output, with its cause and its change:
- `words-subset.py`, every POSITIONS line, exit 1 (information): the added words of P-166, P-162, P-165 and P-163 are the owed replacements of C81, C82, C83 and C84. No failure.
- `record.py check`, "FACTS-history.md:8504: from: F-139: Equality is no file": C78's provenance note names `` `Equality` `` in backticks, which the check reads as a path. Reported, not failing. Drop the backticks if the note is rewritten.
- `record.py check`, "POSITIONS-history.md:4162: from: P-166: FortressBuiltin ... :649 is no file": the same cause, in C81's note (`` `FortressBuiltin` ``, `` `:649` ``). Reported, not failing.
- `record.py check`, "POSITIONS-history.md:4180: from: P-163: :594 is no file": the same cause, in C84's note (`` `:594` ``). Reported, not failing.
- `record.py check`, "POSITIONS-history.md:3666: from: P-169 ... HELD.md": older than the base. It is C180's, and owes nothing.
- `lengths.py`, "already over 600, and grew":
  - F-34 +62 is C71's owed clause;
  - F-257 +1 is C72's "1058" for "550";
  - F-299 +58 is C30's owed clause;
  - F-361 +19 is C55's owed clause.
  - None grew beyond its owed clause.
- `plan-moves.py` LOOK lines:
  - `PLAN.md:12` is C95, with 371, 372 and 515 answered in the line;
  - `:13` is C96, with 528, 530 and 533 in (a);
  - `:92` is C103;
  - `:248` is C111.
  - Each has its reason in `owed.md`, so none fails coverage.
- `check-index.sh`, "paths named in a line's prose that resolve nowhere (2)": `library-scalar-extension-review-probes/run-all.sh` and `tests/ComprisesOwnTypeParameter.fss` are older than this run. `INDEX.md` is not in this run's diff, so they belong to C157 (weight none) and owe nothing here.

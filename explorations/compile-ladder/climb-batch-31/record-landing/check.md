<!-- The record-landing workflow's check of climb batch 31's first round, run 1, against owed.md and its grounds: for each change, pass, or each failure with its class, its passage, its source and its correction, then the mechanical checks of mech-1.md. -->

# The check of the first round, climb batch 31, run 1

Read: `owed.md`; both writers' reports; `mech-1.md`; `git diff abb18ec0a -- explorations/ ':!explorations/coordinator/PLAN-history.md'` in the worktree; rows.md for rows 112, 1037, 1038, 1044 and 1050 to 1053; `ledger:1000` and `ledger:1041`; F-75, P-45 and P-50 by `facts-extract.sh`; the review's section 2, sections 3 and 4, Part 1, Part 4, Part 5 and "What I did not do" by `doc:` queries; `CLIMB-BATCH-31.md`, "The measure"; `compile-ladder/plan-31/PROBES.md`, section 3; and, for C8, C17 and C19, the cited code in the worktree and at the base `c1ce2a35e`.

Totals: 79 changes, 66 pass, 13 fail, with 17 failures: fidelity 16, form 1, coverage 0, routing 0.

## FACTS: the pass on the batch's entries

### C1, F-53
Pass. Weight none; F-53 is unchanged.

### C2, F-75
Fail, one failure.

- **fidelity.** Passage: "At a tuple of object types the rule still compares the instances that cannot meet, and refuses `ident[\T\](x: T): T` beside `ident(x: (Circle, Circle)): (Circle, Circle)` (row 1048). By reading, not by a run, it brings no refusal to such pairs over the built-in number types once they are merged with their objects (P-178)." The clause now follows row 1048's sentence, so "such pairs" names the tuple pairs that the rule refuses, and it contradicts the sentence before it. Its ground is also narrower than "such pairs over the built-in number types". The review's "What I did not do" says, by reading, "that rung X's rule brings no refusal to the one library after the merge". Part 5 says "the count and the distance stages of O's step 7 should bring no refusal to pairs over the five types". Correction: put the clause back after the sentence on `Circle`, or name its pairs: "By reading, not by a run, the rule brings no refusal to the one library's pairs of a generic and a plain declaration over the built-in number types once they are merged with their objects (P-178)."

The rest passes: the rule's width is given as a worker's choice that the curator has not decided (fork X1; the review, section 2, X1). The union `T ∪ C` has moved out. The glob `XXXOverloadReturn*` matches exactly the three tests that the old line named (`compiler_tests/`: `XXXOverloadReturnEveryInstance`, `XXXOverloadReturnObjectDomainOtherType`, `XXXOverloadReturnTupleDomain`).

### C3, F-225
Fail, one failure.

- **fidelity.** Passage: "among them a conditional that returns `self` in one arm, the shape of `StandardTotalOrder`'s `MIN` and `MAX` (row 1051)". The rewrite lost a condition. Row 1051's claim is "a compiled conditional with `self` in one arm and a value of the listed type in the other", and its notes say "With `self` in both arms it runs". The line at AT had "returns `self` in one arm of a conditional and another value in the other". Correction: "among them a conditional that returns `self` in one arm and another value in the other, the shape of `StandardTotalOrder`'s `MIN` and `MAX` (row 1051)".

The pointer to F-377 and the keeping of row 1052 pass, as owed asks.

### C4, F-240
Pass. One clause was added: "which do not span what rung runs of that night timed as the whole stage, so no fall since climb batch 32's gate is shown". Its source is the review, section 4: "a fall of the stage is not shown; the two figures are not of the same span". The clause gives no figure. `reviews/batch-31-review.md`, section 4, heads the Detail. The gate's figures are unchanged: about 75 s, 143 s, `FortressLibrary` 86 s, 0.08, and 165 s (102 s) at 0.31. No other sentence changed.

### C5, F-372
Fail, two failures.

- **fidelity.** The rewrite cut the sentence "The gatherings for the dispatch methods still use the schema comparison of `removeIdenticallyCoveredMethods`". The entries report moved it to the report as detail (question 4). It is a limit of the entry's rule, not a detail of the work: the relation between two declarations holds for a class's methods, but a dispatch method's gathering still compares schemas over each trait's own bounds. Owed C5 names as [S5]'s detail only `STypesUtil.allMethodsNotReplaced` and the comparison at the instance. Queue item 560 (C54, M.worker.2: "the gatherings for the dispatch methods still compare domains as schemas over each trait's own bounds") names F-372 as its entry, and F-372 now says nothing of them. Correction: keep the limit as one sentence without the member's name: "A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance."
- **fidelity.** Passage: "with an own `mark(x: K, self)` beside an inherited `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573)". The passage leaves out the condition of row 1038's claim, "where the receiver itself has the own declaration's parameter type". Its notes give the case as `object Pq extends { K, P }`. Without the condition a reader cannot tell when a call answers wrongly. Correction: "with `object Pq extends { K, P }` declaring `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573)".

The rest passes: row 1038's wrong answer with no error, forks M1 and M2 given as a worker's choices, the traits chapter's reading, and row 1037 at the self-typed generic form (row 1037's notes; the review, section 2, M1).

### C6, F-373
Pass. The three answers are given as chosen and not decided by him, with walk's answer to each (the review, finding 2). Row 340's case names P-50. P-50 gives the body and each exit value the label's expected type. `FreeVariables.java:98`, `Misc.scala:704` and the members' place in `CodeGen.java` have moved out as owed.

### C7, F-374
Pass. The cell is given as a worker's choice (fork A1). The equivalence is given as it is now, `V(1) === V(1)` `false`, since `SEQV` compares the cells by identity (row 112's notes), with `Lazy` (`Library/Lazy.fss:18`). `VarCodeGen.MutableFieldVar` and the change ("where before ...") have moved out.

### C8, F-375
Fail, two failures.

- **fidelity.** Passage: "A declaration that writes no return type is not judged there (row 1044), ... The coordinator chose to read no `comprises` clause, and a worker chose the rest; the curator has not decided them." "The rest" takes in the guard for a declaration that writes no return type, and that guard is the coordinator's decision. The review, Part 4, "The coordinator's decisions between the go and the launch", 2, reads: "The guard of the check's point B2, a plain declaration with no written return type beside a generic one". Owed C58 reads: "the guard of the check's point B2 is the coordinator's decision". Queue item 564 states it so, and the entry states otherwise. Correction: "The coordinator chose to read no `comprises` clause and to leave unjudged a declaration that writes no return type; a worker chose the three readings and the check of value types; the curator has decided none of them."
- **fidelity.** Passage: "the pair loads where the plain result lies below the generic's by one of three readings that the report gives, and is refused in the rule's name where a reading shows that it breaks the rule". The three readings are ways to show that the result lies below. The line at AT ("its result must lie below ... or ... or ...") and the code refuse the pair where none of the three holds. In `interpreter/evaluator/values/OverloadedFunction.java:518-524` the pair is refused where the reading is not `VALID` or `NOT_READ` and the declaration writes a return type. As written, a reader asks what happens to a pair that no reading accepts and none refutes. Correction: "and is refused, in the rule's name, where none of them holds".

The merge clause passes: it is bounded by Part 5, "To add, 1", and F-361's probe. The sentence on the four kinds now says the difference in the present and points to "Programs run old against new". The conditions of `returnRuleAtObjectArguments` have moved out.

### C9, F-376
Pass. The added clause states the uncertainty of the test's evidence (judge-gate.3; row 499). "Where before ... failed" now reads "where without the cast ... fails". The report gives its reason for leaving the cast's file out of the entry: it is a fact of how the fix came about, and item 569 names F-376.

### C10, F-377
Fail, one failure.

- **fidelity.** Passage: "An assignment from outside an object to its `var` field fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053)." This drops the condition of row 1053's claim, "of a value whose static type is a strict subtype of the field's type". The row's notes say "A value of the field's own type runs". As written, every such assignment fails. The review's line, Part 4, has the condition too: "of a value of a strict subtype". Correction: "An assignment from outside an object to its `var` field, of a value whose static type is a strict subtype of the field's type, fails at run time, `NoSuchMethodError`, also for `c.r := self` at a listed type (row 1053)."

The cast at a trait type strictly below self's trait passes: it is given as it is now and as a worker's choice (fork K1; the review, section 2, K1). The later cast site has moved out.

## FACTS: other sentences that the landing made false or stale

### C11, F-34
Fail, one failure.

- **fidelity.** Passage: "On the tree as it stands, the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes (row 874), and the other eleven components give 11 refused declarations in 6 kinds." The pass bound the 24 to `832f7d0d91` and left this count of the same measure in the present. It was taken on that code without the patch: `compile-ladder/plan-31/PROBES.md`, section 3, "On the tree unchanged", reads "refused declarations 11 | ... kinds 6". Two of the eleven components hold walls that run 1 fixed: `String`, with a `label` declaration (row 81), and `OneShotFlag`, with an atomic expression (row 875). The same section's table reads "Can't compile Label [FortressLibrary 3, String 1]" and "Can't compile AtomicExpr [OneShotFlag 1]". No run has taken the count on the landed tree (the review, section 3). Correction, in the fewest words and with no new figure: "On that code without the patch, the code generator stops ... and the other eleven components give 11 refused declarations in 6 kinds."

The rest passes: the title is bound to `832f7d0d91`, rows 81, 875, 990, 991 and 732 are marked fixed since, and the count on the landed tree is said to be not taken.

### C12, F-352
Pass. The rehearsal stays as measured, rows 81, 990, 991 and 732 are marked fixed since, and rows 624, 315 and 992 stand.

### C13, F-354
Pass. The example goes, which owed allows. The report gives its reason for not putting row 996's `CMP` order in its place.

### C14, F-361
Pass. The three gaps are said to have been open on that code and to be fixed since, and "On `main` the five traits are not merged" stays. A note, with no correction owed: in the title, "on that code" has no antecedent before the entry's last sentence; "on `832f7d0d91`'s code" would read on its own.

### C15, F-174
Pass. The sentence names row 1048's pair in the fewest words. It matches F-75 and the review, section 2, X1.

### C16, F-87
Pass. The reason clause goes; the test runs `typecheck` only, as the report checked.

### C17, F-252
Pass. One clause with a pointer to F-375. It matches `OverloadedFunction.java:510-527` (`differAtObjects`, `plainInsideGeneric`, `validOnDeclaredDomains`). The new sentence has 276 characters.

### C18, F-257
Pass. One clause with a pointer to F-375. Rows 539, 550 and 779 stand, and the grown sentence has 438 characters.

### C19, the moved line citations
Fail, two failures.

- **form.** Passage, F-258: "(`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:367`,`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala:444`)". The repoint lost the space after the comma. At AT the text reads "`...OverloadingOracle.scala:327`, `ProjectFortress/...`", and `lengths.py` gives F-258 2830 to 2829. Correction: restore the space.
- **fidelity.** Passage, F-268: "(`CodeGen.java:6451-6455`)". The base's range, `:6318-6323`, moved by 133 is `:6451-6456`. Line `:6455` ends inside the `generateTypeReference` call, whose last line, `Collections.<StaticArg>emptyList(), spns);`, is `:6456`. Line `:6451` is the blank line before the branch, as `:6318` was. Correction: `CodeGen.java:6451-6456`, or the branch alone, `:6452-6456`.

The other repoints pass. Each was checked at its member: F-302 `:5728-5735`, F-351 `:1942-1974` and `:2284-2288`, F-315 `:3206-3208`, F-369 `:6661`, F-258's Oracle `:367` twice, F-349 `:2545` and `:2608-2628`, F-366 `:2422-2525`, F-367 `:3067`, F-173 `:285-347` and `:448-512`, and F-175 `:3474-3670` and `:3740-3747`. F-258's two citations of `OverloadedFunction.java` stay as written, since each is bound to its commit, and the report gives that reason.

### C20, F-19
Pass. Weight none.

### C21
Pass. Weight none.

## POSITIONS

### C22
Pass. Weight none; no entry changed, and there is no `cut-only.txt`.

## The gap ledger

### C23, row 112
Fail, one failure.

- **fidelity.** Passage: "The compiled path compiles it too: with a `var` field kept in a cell, `V(1) === V(1)` is `false`: ...". The rewrite also cut "`value object V(var n: ZZ32)` runs;", and the entries report does not name that cut among its cuts. So `V` is now declared nowhere in the row, and the row no longer says that the compiled program runs. The source is rows.md, row 112, "Notes now". Correction: keep both in a few more characters, as "Compiled, `value object V(var n: ZZ32)` runs with its field in a cell, and `V(1) === V(1)` is `false`: ...". That is 5 characters more, 699 of the 700 by my count; check it with `ledger.py note 112 ... --check`. Name the cut in the report.

`Lazy` (`Library/Lazy.fss:18`) is named, as owed.

### C24, row 340
Pass. The label case names P-50 and its kin, rows 1014, 1030 and 1043. The cut of "The coercion desugarer's `typecase` binds a pattern name." is named in the report, and the row's history holds it.

### C25, row 996
Pass. The false sentence goes.

### C26, row 1003
Pass. The row states both halves undone on `main` and the three rows fixed, with no plan or status.

### C27
Pass. Weight none.

## PLAN: "Where we stand" and the phases

### C28, `PLAN.md:9`
Pass. It gives 7 of 7 at climb batch 31's run 1, with its `gate/summary.txt`, and 52 of 52 on run 1's merged tree, with RECORD.md cited.

### C29, `PLAN.md:10`
Fail, two failures.

- **fidelity.** Passage: "The code generator refused 24 declarations of the fourteen components in 8 kinds on `832f7d0d91`, before climb batch 31's run 1, measured on a patched scratch tree, and the count after run 1 is not taken yet, since on the tree as it stands it stops three components whole at row 874". At AT the "since" clause gave the reason for the patch. Now it gives the reason that the count after run 1 is not taken, and that reason is false. The measure patches past row 874, and its patch still applies: the review, section 3, says "`git apply --check ... measure-hacks.patch` prints nothing on `main`". The count is not taken because no stage ran it: "No agent of the run ran `compile-ladder/plan-31/probes/planner/codegen-measure.sh` ... The coordinating session did not run it after the launch". Correction: "... measured on a patched scratch tree, since on the tree as it stands it stops three components whole at row 874; no stage has taken the count after run 1 (`reviews/batch-31-review.md`, section 3)".
- **fidelity.** Passage: "on both paths, the Return Type Rule at an object type, with the dispatcher's cast (F-75, F-376); and walk's two repairs that come before the merge (F-375)". F-75 and F-376 are the compiled checker's rule and the compiled dispatcher's cast, both rung X's. Walk's reading at an object type is F-375, and the line lists it apart. Correction: "... and the cast of `self` (F-377, F-225), and the Return Type Rule at an object type with the dispatcher's cast (F-75, F-376); and, under walk, its two repairs that come before the merge (F-375)".

The rest passes: the last landed gate is run 1's, with the distance 0, the count 0 and no crash row; the pointer goes to `reviews/batch-31-review.md`, section 1, whose heading the line names as it stands (`:49`).

### C30, `PLAN.md:11`
Pass.

### C31, `PLAN.md:12`
Pass. Only the merge's clauses changed, and the clause on 371, 372 and 515 stands, as owed gives for the line that `plan-moves.py` lists.

### C32, `PLAN.md:13`
Pass. The landing and the go are stated, findings 3 and 4 come before run 2 at the record's defaults, findings 1 and 2 hold no launch, and the coordinator's steps 2, 5 and 6 are listed. No go and no answer is invented. The line keeps its sentences on items 86 and 88, 528, 530 and 533, 80 to 82, 513, 512, 265 and 267. The post-mortem sentence goes, since that update landed before the launch.

### C33, `PLAN.md:53`
Fail, one failure.

- **fidelity.** Passage: "the list for the batch after is the record's (`coordinator/CLIMB-BATCH-31.md`, "For the batch after, in this order")". Owed C33 gives the line as the record's list, "where finding 1 would put rows 1051, 1050 and 1052 first at his word (C66)". The review, finding 1, says that the record's list does not hold that rung, and its option 1a would put the rung first. As written, the list reads as settled. Correction: append "; his word on finding 1 (item 99 under "Pavol's answers") can put rows 1051, 1050 and 1052 first in it".

The rest passes: one line, with run 1's commit and review, and run 2 not launched.

### C34, `PLAN.md:66`
Fail, one failure.

- **fidelity.** Passage: "Run 1 closed rows 81 and 875, and its record expects 5 fewer (`coordinator/CLIMB-BATCH-31.md`, "The measure")". The record says: "After run 1: 19 to 21. L takes off the 4 of `label`. A takes off the 1 of the `atomic` expression. Two of the four declarations with `label` have a second wall behind the first. So the number is 19 if both pass that wall, and 21 if neither does" (`CLIMB-BATCH-31.md:516`). The review, section 3, also gives "19 to 21 expected". "5 fewer" is the upper end alone. Correction: "its record expects 19 to 21".

The rest passes: the 24 are bound to `832f7d0d91` before run 1, the count after run 1 is due before run 2 and not taken, rung T's 4 are from the record, and rows 990, 991 and 732 are closed and 992 is rung T's.

### C35, `PLAN.md:67`
Pass. The line cites fork H1.

### C36, `PLAN.md:68`
Pass. Rows 990, 991 and 81 are closed with their commits, row 992 is rung T's, and rows 624 and 315 stand. The line also says that the library's classes passing the verifier is not measured (row 1051), and that the merge's open items are 516, 518 and 519.

### C37, `PLAN.md:69`
Pass. It names the halves, the two repairs done (`b6fb208e23`), and row 542 closed before the merge (`1ce04203c5`). It gives forks O2 and O5 as defaults taken, which item 578 puts to him, and 516, 518 and 519 as his, not taken. "No batch holds it" goes.

### C38, `PLAN.md:91`
Pass. Weight none; owed gives the reason that the line stays.

### C39, `PLAN.md:95`
Pass. The line adds item 558, items 518 and 519 before run 2, and item 572 before the batch after is planned.

### C40, `PLAN.md:97`
Pass.

### C41, `PLAN.md:233` (`:243` after the routing)
Pass. Weight none; owed gives the reason that the line stays.

### C42, `PLAN.md:293`
Pass. Row 695 is taken out of the open list.

### C43, `PLAN.md:326`
Pass. The line moved to PLAN-history as built, by `1ce04203c5` (routing report).

### C44
Pass. Weight none.

## PLAN: "Pavol's answers"

### C45, items 97 to 100
Pass. Each item has what is asked, the record's default given as not his, the review's recommendation and its queue item, as items 86 and 88 are written. They stand under the two headings that owed gives, "Before run 2 of climb batch 31, or at its record's defaults" and "Holding no launch". Item 99 has its "Needed by".

## The review queue: the items that stand

### C46, item 517
Pass. The item moved to (a), "Answered by a landed fix or a closed row", as moot by `b6fb208e23` and rows 997 and 998. It says that the order taken is fork O2's default and not his word, and item 578 keeps that default open for him.

### C47, item 520
Pass. The same as C46, by `1ce04203c5` and row 542, with fork O5 in item 578.

### C48, items 518 and 519
Pass. Both stay open, 518 in (b) and 519 in (c). Each has the record's default (forks O3 and O4) given as the record's, the review's recommendation, and "Needed by: before run 2 ... is launched". Their head lines moved to "The next batch and the natives' batches".

### C49, item 516
Pass. The item is open with fork O1's default. Its "Needed by" is marked as set by the landing workflow.

### C50, item 522
Fail, one failure.

- **fidelity.** Passage: the reworded item keeps "and a wrong forwarder can come and go with the order (F-354)" in its text, and "The other way: A sixth rung in climb batch 31's first run, which would edit the loop that rung M repairs." The landing made both false, as the item's new "Landed" line states. Rung M chooses between two bodies by a relation between the two declarations, not by the order (F-372; C13 cut F-354's example for that reason). Run 1 has landed, so no rung can join it. The routing report leaves "The other way" because "owed.md asks only for its 'Landed' line"; that is no reason that the line stands. Correction: in the body, "and a result that depends on the order can come and go between builds (F-354)", F-354's present words. For "The other way", give the question's other answer, "no rung for the order before the switch-over's work starts", or mark the record's way not taken as past with run 1's landing.

### C51, the queue's head
Pass. The counts are 236 open, 90 consequential and 146 routine (`queue-check.py`). Each group's count follows its items. There is a new group for the batch's items, and the probes group's text is reworded for 516 to 520.

## PLAN: "Climb batch 31, listed for his review", with the queue's new items

### C52, item 558
Pass. The item is in (c), "Code generation and the run time", with its head line in "Before the switch-over". Its "Needed by" is from RECORD.md, and PLAN's item 96 is cut to its pointer.

### C53, item 559
Pass.

### C54, item 560
Pass. It names F-372; C5's first failure is about that entry.

### C55, item 561
Pass.

### C56, item 562
Fail, one failure.

- **fidelity.** Passage: the group's head line, "Default: as landed, the specification's reading on the compiled path.", and the item's "Landed: The specification's reading on the compiled path: each evaluation of a label block has its own identity (fork L1), and an exit is no exception that a `catch` clause takes." Of the three answers that the item asks, the third is not the specification's. Row 1041 reads: "The specification ... says nothing of a label block that is no longer being evaluated". On the compiled path such an exit "ends a compiled program with an uncaught `LabelExit`", and the review's 2a has the compiled path "throwing the library's `LabelException`" for it, "in place of ending the program". So the head line overstates the default. Correction: head line, "Default: as landed: on rows 1042 and 1040 the compiled path takes the specification's reading, and an exit after its block ends the program (row 1041)". In the item's "Landed" line, add the third answer.

It passes as filed in (b), consequential by the review, with its "Needed by" from the review's step 8.

### C57, item 563 and the line for row 1043
Pass. The review's home for the three tests, rung E of run 2, is given as the review's proposal for run 2's planner and not as a default. The "Needed by" is from Part 5.

### C58, item 564
Pass. It says that the guard of point B2 is the coordinator's decision.

### C59 to C65, items 565 to 571 and the line for fork V4
Pass. Each item has what is asked or told, a default from the old PLAN line or the record, and "Needed by: no planned work (set by the landing workflow)", as owed sets.

### C66, item 572 and the line for rows 1050 and 1052
Pass. It is in (b), consequential, marked as set by the workflow. Its default, parked, is from gather.1's line at AT ("Default: the row open; `forIf` is one line for a later rung, by rung K's handover"). The review's recommendation, 1a, is given as the review's.

### C67 to C69, items 573 to 575
Pass.

### C70, item 576 and the line for row 1053
Pass. A note, with no correction owed: its Home names F-374. Since C10, F-377 is the entry that names row 1053.

### C71, item 577 and the line for fork H2
Pass. It is in (b), consequential, with "Needed by: before the batch after climb batch 31", from the record's list, item 1.

### C72, item 578 and the line for the record's forks
Pass. It holds B1, B2, B3, H1, M2, A1, V1, V2, O2 and O5, and points to the items that hold the other forks.

### C73, `PLAN.md:824`
Pass. The paragraph takes the pointer form, lists the lines that the group lacked, and gives findings 1 to 4 as items 97 to 100.

### C74, `PLAN.md:841`
Pass. Its home is the rung of item 99.

### C75, `PLAN.md:842`
Pass. Its home is the batch after, or run 2's gather.

### C76, `PLAN.md:843`
Pass. Weight none; the line stands.

## INDEX and other notes

### C77
Pass. Weight none; INDEX is unchanged.

### C78
Pass. Weight none.

### C79
Pass. Weight none.

## The failures of mech-1.md

- No check of round 1 fails, so there is no cause to name.
- `plan-moves.py` lists four PLAN lines to look at, and each has its reason in owed.md: `:12` (C31), `:13` (C32), `:91` (C38) and `:243` (C41, which owed gives as `:233`, before the routing added ten lines above it).
- `lengths.py` lists 11 entries already over 600 that grew: F-34, F-174, F-240, F-252, F-257, F-352, F-361, F-372, F-374, F-375 and F-376. Each grew by its owed clauses (C11, C15, C4, C17, C18, C12, C14, C5, C7, C8 and C9). No new or changed sentence is over 600 characters.
- These checks do not see the two defects of C19 (F-258's lost space and F-268's range) or C23's undeclared cut.

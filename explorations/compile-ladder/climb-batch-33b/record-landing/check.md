<!-- The record-landing workflow's check of climb batch 33b's first round: each change of owed.md, pass or each failure with its class, its passage, the source that shows it and its correction, then the mechanical checks of mech-1.md. -->

# The check of climb batch 33b's record-landing, round 1

Read at the worktree `/home/user/fortress-landing-33b`, against AT `8c13a52ec` (`git diff 8c13a52ec -- explorations/ ':!explorations/coordinator/PLAN-history.md'`). Line numbers are those of the worktree now. F-53 and F-240 are unchanged (no line of either in the diff).

## FACTS and POSITIONS: the pass on each entry of the range

**C1** (F-38) pass: weight none, writer none.

**C2** (F-53) pass: weight none, writer none; the entry is unchanged.

**C3** (F-86) pass. "The compiler's prelude declares no `ImmutableArray`, so under it the checker refuses each use of such a parameter (row 604), and the code generator refuses a varargs declaration, naming the missing type; under the selection of the one library the code generator compiles it (F-390)." Row 604's claim is the compiled checker's refusal; row 624's notes give the code generator's refusal of a varargs declaration. "`compiler_tests/XXXVarargs*`" matches the six tests: row 604's four and the code generator's two.

**C4** (F-128) pass. The message and the tests left for `rung-closure-name-once/SKEPTIC.md`, "3. My programs" (the message and the compiled results, lines 12-14), row 1083 and F-389, which names `ArrowCoercionFnExprCompiled.test`.

**C5** (F-180) pass: weight none, writer none.

**C6** (F-240) pass: weight none, writer none; the entry is unchanged.

**C7** (F-268) pass: weight none, writer none.

**C8** (F-301) pass. "When the prelude declared its number types as traits, a functional method ... reached the wrapper" and "Observed once, while the prelude declared them as traits, and not since they are value objects" keep the bound of the one-time observation. "`make` now calls the `make` of the prelude's value object through a method handle" holds by `FZZ32.java:40-48`. The sentence on C1's profiling code is in `perf-probes/helper-calls/REPORT.md:104`, section 3, within the Detail's "sections 2 to 5".

**C9** (F-302) pass. The clause on the one library's seven left for F-388, which states it ("for the prelude only: the one library's seven are not yet compiled over payload classes"); the entry still names F-388.

**C10** (F-307) pass: weight none, writer none.

**C11** (F-315) pass. "is emitted in F-34's measure": `measure-ba3c7c876d.txt:37` lists `stringifyChars` as "emitted, rung G", and F-34 bounds the measure to `ba3c7c876d`.

**C12** (F-320) pass. The test left for F-390, which keeps "the five `one_library_tests/OneLibraryVarargs*.test`". C30 has its own failure.

**C13** (F-321) pass: weight none, writer none.

**C14** (F-330) pass: weight none, writer none.

**C15** (F-338) pass. "this renaming changes no entry" says what "the rename gives each entry the name it already has" said.

**C16** (F-351) pass: weight none, writer none.

**C17** (F-369) pass: weight none, writer none.

**C18** (F-379) pass. Kept as written: "the compiler's prelude declares the same seven as value objects (F-388)".

**C19** (F-388) pass. Row 1081 is `CONTESTED`, and the entry states the refusal only: "a `typecase` clause at such a trait over a number is refused as unreachable (row 1081)". "the names of generic instances" is the report's "stamped instance (`Box⟦...FZZ32⟧`)" (`rung-number-payload-objects/REPORT.md`, "The design as built"). C23 has its own failure.

**C20** (F-389) fail.
- Class fidelity. Passage (`FACTS.md:287`): "Closures share a span in three forms: the thunk that a conditional operator makes of its right operand, ...; the thunk that a binding `if` makes of its else part, ...; and the function expression that an arrow coercion wraps around a function expression argument." Source: the entry at AT lists the forms that the rung and its skeptic found ("The thunk ... takes the operand's span ... So does the thunk that a binding `if` makes ... and the function expression that an arrow coercion wraps"). It does not say that these are the only forms, and `rung-closure-name-once/REPORT.md`, sections 3 and 4, show no search for all of them. "in three forms" tells the reader that no other form shares a span. Correction: "Closures share a span in these forms:", the rest as written.
- The other words pass: `measure-ba3c7c876d.txt:40` lists `LexicographicOrder` as "emitted, rung W", and section 4 holds `...#2⟦⟧`.

**C21** (F-390) pass for the title and the array's sentence: "The array is made at the call, or in a dispatch method's branch where another declaration of the name takes as many arguments" keeps the condition of the dispatch method. C25 and C39 have their own failures.

**C22** (F-391) fail.
- Class fidelity. Passage (`FACTS.md:178`): "A call at an assumption runs the assumed trait's body, also where the object overrides it (`CodeGen.hasBodyInItsTrait`). The code generator stops where the trait is generic and the method's parameter has the trait's type parameter (row 1088)." Source: row 1088's claim, "the code generator stops at a call at an assumption of a generic trait of a method whose parameter has the trait's type parameter" (rows.md, row 1088); the entry at AT made it an exception of that call: "except a method of a generic trait whose parameter has the trait's type parameter, where the code generator stops". The split sentence drops the condition "at a call at an assumption", so it reads as a stop at every method of a generic trait whose parameter has the type parameter. Correction: "The code generator stops at such a call where the trait is generic and the method's parameter has the trait's type parameter (row 1088)."

## FACTS and POSITIONS: the other changes

**C23** (F-388, past 600) fail.
- Class form. Passage (`FACTS.md:286`): "Detail: `compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)"." The report says that the sentence "a dotted call casts its receiver to the object's class" moved "to the report's section (question 4)", and its history line names "What changed and why". Source: the section "The design as built" holds no cast; the cast is in "What changed and why" (`REPORT.md:28`) and "Each place that names a payload object's type (a point to report)" (`:58`). A sentence left in the report needs its section named in the entry. Correction: the Detail reads "`compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)" and "Each place that names a payload object's type (a point to report)"."
- The sizes and the questions named in the report (question 2 for the naming by the payload class, question 1 for the four consequences) pass.

**C24** (F-389, past 600) fail.
- Class form. Passage: `entries-report.md`, "C20 and C24, F-389 (1303 to 1213)": the block names what moved out, and no question for the sentences that keep the new entry at 1213 characters. Source: the brief's form rule, "A sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`"; `record.md`, "What an entry is", question list. Correction: name, in the report, the question that keeps each sentence past 600 (for example, the three forms that share a span by question 2, the hash modes by question 1), or move the sentence to its report section and name it.

**C25** (F-390, past 600) fail.
- Class form. Passage (`FACTS.md:177`): "Detail: `compile-ladder/rung-varargs/REPORT.md`, "The convention as built"." The report says that the descriptor of `init` moved out "to the review's G.worker.1 (question 4)", and the entry's new reading ("By reading, a run under the selection would fail at the array") has its source there too. Source: the history line of F-390 names `reviews/batch-33b-review.md`, "2. The decisions that landed at a default"; the entry's Detail does not. Correction: the Detail adds "; `reviews/batch-33b-review.md`, section 2, G.worker.1".
- The size (+32 over AT, the clause that C39 owes) and question 1 for the two stops pass.

**C26** (F-391, past 600) fail.
- Class form. Passage: `entries-report.md`, "C22 and C26, F-391 (1248 to 1243)": no question is named for the sentences that keep the new entry at 1243 characters. Source: the brief's form rule, as in C24. Correction: name the question that keeps each sentence past 600, or move the sentence to the report section that the Detail names.

**C27** (F-128, past 600) pass: 1200 to 1139; question 1 named for the list of what is not converted.

**C28** (F-315, past 600) pass: 1452 to 1321; the growth over the base, 111 characters, is the clause that C11 and C38 owe, named in the report.

**C29** (F-301, past 600) pass: 1715 to 1668; questions 1 and 2 named.

**C30** (F-320, past 600) fail.
- Class form. Passage: `entries-report.md`, "C12 and C30, F-320 (1608 to 1570)": the block gives the meaning and names no question, and does not say that the entry, 118 characters over its base of 1452, grows only by the varargs clause that C12 owes. Source: the brief's form rule ("an entry already past 600 grows only by the clause that its change owes", and the question named in `entries-report.md`); owed.md C30. Correction: the report names the varargs clause as the clause that C12 owes, with the question that keeps it (question 1: a worker who writes a varargs local function against the prelude would do otherwise), as the F-315 block does.

**C31** (F-86, past 600) pass: 912 to 891; question 1 named.

**C32** pass: weight none, writer none.

**C33** (F-34) pass. "Then: 1 refused, 753 emitted, no component failure. The one refused declaration is `FortressLibrary`'s `__bigOperator2`, a generic method called on a receiver typed by a type variable (row 1076)." Source: `measure-ba3c7c876d.txt:1` and `:16-18`. "the other 12 stopped at varargs (row 624) or at a closure class written twice (row 315)": the file's list, 10 by rung G and 2 by rung W. The caveats stay (the patch for row 874, the first wall, the dispatch methods, no emitted class run), "Measured once on each code" keeps the bound, and the Detail names the new file first. The count's history (18, F-384, F-386) is in FACTS-history.

**C34** (F-352) fail.
- Class fidelity. Passage (`FACTS.md:170`): "Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874 and 995; for the seven number types it is built and row 866 is fixed, F-388)". Source: F-388, "for the prelude only: the one library's seven are not yet compiled over payload classes"; `LibraryNames.java:25-28` (null "where that library's number objects are not written over their payload classes. The one library's are not yet"); `measure-ba3c7c876d.txt:23`, "Rung N's payloadObjects table has rows for the compiler's prelude only ..., so the patch's carried types of the one library are still needed"; owed.md C34 gives row 866 fixed and row 995 narrowed, no more. In a tree switched onto the one library, which is this wall's setting, the seven are not built. "it is built" is also a status word, which an entry does not hold (`record.md`, "What an entry is"). Correction: "(rows 874 and 995, row 995 now for the carried types other than the seven number types; row 866 is fixed; the one library's seven are not yet compiled over the payload classes, F-388)".
- The other changes pass: "rows 81, 315, 990, 991, 732 and 992 are fixed since, and row 624 under the selection of the one library (F-390)"; "row 942, fixed since; the search stays, and no compiled test reaches it, F-391"; the timing moved to `model-closure-check.md`, section 4 (`:64-66`), which the Detail names.

**C35** (F-136) pass. "(row 496), still die with `ClassCastException`, on an arm's static parameter left unrewritten. At `ZZ32` the second form runs, since the run time and static code now name the type alike, by its payload class (F-388; `compiler_tests/GenericBesidePlainZZ32.test`)." Source: row 496 rewritten (claim at a program's object `Red`; notes "At `ZZ32`, ... runs the generic declaration (`GenericBesidePlainZZ32`)", and "The dispatcher is not a template, so its arms are not called at the template's parameters"); row 995's notes, "its RTTI named by the payload class".

**C36** (F-353) fail.
- Class fidelity. Passage (`FACTS.md:171`): "`main` has its own selector (F-381) and one set of run-time classes; its seven number types need no second set, since their run-time classes are payload classes over `FValue`, under the object classes that the code generator writes (F-388)." Source: owed.md C36, "their payload classes serving under either library, the object's class found by `LibraryNames` (F-388; `LibraryNames.java:30-32` answers null under the selection, the one library's seven not yet written so, fork N4)"; F-388, "for the prelude only". The new clause drops that condition: a reader concludes that the code generator writes the one library's number objects over the payload classes, so that the one library's numbers run today. Correction: "...under the object classes that the code generator writes for the prelude; the one library's seven are not yet compiled over them (F-388)."
- The other changes pass: "There the second set's sources equal the first's ..., since the classes then differed only ..." bounds the sentence to the scratch tree; the compile times moved to `probe-y.md`, section 5 (`:116-117`), which the Detail names.

**C37** (F-181) pass: "except in the forms that F-320 names", the fewest words owed.

**C38** (F-315) pass: the sentence cites F-34's measure on the landed code in place of the rung's scratch copy (see C11).

**C39** (F-390) fail.
- Class fidelity. Passage (`FACTS.md:177`): "By reading, a run under the selection would fail at the array: each index is made by `FZZ32.make`, which raises an `Error` there (F-388). So under the selection varargs compiles on a program's path (`println`, `assert`), and no run shows it, since no program runs on the one library yet (row 1062)." Source: owed.md C39, "the entry's 'under the selection varargs no longer stands on a program's path' holds for the compile only"; "nothing shows it [the failure at the array], since no program runs under the selection". The new sentence now stands between the stops and their "So", so "So" draws the compile from the run's failure, and "no run shows it" reads as said of the compile. Correction, the same words in the ground's order: "So under the selection varargs compiles on a program's path (`println`, `assert`). By reading, a run there would fail at the array, since each index is made by `FZZ32.make`, which raises `LibraryNames`' `Error` under the selection (F-388); no run shows it, since no program runs on the one library yet (row 1062)."

**C40** (P-33) pass. Old: "the compile command selects the one library beside the prelude, one build serving both by a second set of the run time's value classes (F-353), so that each wall that only a tree switched onto the one library shows is met as one rung with its own test on `main`". New: "the compile command selects the one library beside the prelude, one build serving both (F-381), so that each wall ...". What he decided (the rest of the switch-over takes microGPT's slice first), where it applies (the rest of phase 4) and what it requires (one build serving both, each such wall one rung with its own test on `main`, the move of the compiled tests and the prelude's deletion last) are the same before and after. Only the means that the tree made false left, by the fewest words under his rule of 2026-10-31; F-381 holds one build with one set of run-time classes. Not pointing to item 521 is right: an entry holds no review-queue item (`record.md`, "What an entry is"). The writer's question to him on the review's longer words goes with the coordinator's message (C114).

**C41** (P-178) pass. Old: "and the compiler prelude's open trait lets a program's object extend `ZZ32`, which a bare `int` cannot hold (row 866, such a program compiles and dies when it runs)." New: "... let ... (row 866, such a program compiled and died when it ran)." His decision (each built-in number type one `value object` under its own name, walk's native number objects go), its reach (both paths before the switch-over, the prelude by an exception to P-37) and what it requires are unchanged; only the tense of one reason, which held when he decided.

**C42** pass: weight none, writer none.

**C43** pass: weight none, writer none.

## The gap ledger

**C44** (row 1089, new) pass. Section 12, `NEGATIVE-VERIFIED`, class `implementation gap (prelude)`, reproducer `none` with the program described at `rung-api-method-index/SKEPTIC.md:26` (point 4) and its output in the notes, as rows 1, 4 and 6 have `none`; the specification orders strings lexicographically (`Specification/basic/operators/opr-overview.tex:302-305`); the six placeholder bodies are at `CompilerBuiltin.fss:393-398`; "Until the switch-over (P-38)".

**C45** (row 546) pass: "The same family as functional methods runs (`ComprisesMeetGenericTrait.test`; row 566)"; the function form's claim stands.

**C46** (row 604) pass: "Codegen: F-390."

**C47** (row 1017) pass: "(compiled: F-390; under the selection it does not run, row 1062)"; F-390 holds the refusal against the prelude.

**C48** pass: weight none, writer none.

**C49** pass: weight none, writer none.

## PLAN and PLAN-history

**C50** (`PLAN.md:9`) pass: both runs of climb batch 33 at 7 of 7 and at 52 of 52 demos, with the 33b review and record cited.

**C51** (`PLAN.md:10`) pass: the last gate is 33b's (`ba3c7c876d`, its gate on `f9acd7f6c2`); the four entries and nine rows; "the one library's seven are not yet written over payload classes (fork N4; F-379, F-388)"; "refuses 1 declaration ... `__bigOperator2` (row 1076), against 13 in 4 kinds".

**C52** (`PLAN.md:11`) pass.

**C53** (`PLAN.md:12`) pass: the prelude's half built by rung N, "the one library's seven take that form at fork N4"; P-33's clause as P-33 reads now; items 371, 372, 512, 515 and 577, which plan-moves flags, are marked answered in the line, as owed.md gives.

**C54** (`PLAN.md:13`) pass: the landing, the go for both runs, the review `8c13a52ec6`, the measure `3fbce96856`, the batch after waiting for its plan with item 597; the done steps of run 2 left, their old text in PLAN-history.

**C55** (`PLAN.md:55` and the new `:56`) pass: `:55` now points to the next line; the new line is in the form of `:54` and holds Part 5's changes to the list.

**C56** (`PLAN.md:69`) pass: 1 in 1 kind on `ba3c7c876d`, 753 emitted, against 13 in 4 and 17 in 5; the kinds closed by their rungs; rows 940 and 942 closed by R, the search kept and reached by no test.

**C57** (`PLAN.md:70`) pass: built under the selection (`e9bc2ed3e`; F-390), refused against the prelude (fork G4), the run test and row 1086 waiting with item 3; the old text in PLAN-history.

**C58** (`PLAN.md:71`) pass: the five number traits and row 866 left, row 995 narrowed, rows 624 and 315 closed, the payload classes and `LibraryNames`' `Error` until fork N4 in place of the `IncompatibleClassChangeError` sentence. "which goes with the prelude" is the review's ("It goes with the prelude", `reviews/batch-33b-review.md:481`). Item 577, which plan-moves flags, is marked answered.

**C59** (`PLAN.md:72`) pass: the prelude's half built, what is left of P-178 fork N4 with item 1; item 577 marked answered.

**C60** (`PLAN.md:85`) fail.
- Class coverage. Passage: "and the row of the prelude `String`'s placeholder comparisons, which answer `false` at a type assumption (`LibraryBuiltin/CompilerBuiltin.fss:393-398`)." Source: owed.md C60 gives "C44's new row"; `mech-1.md`, "ledger.py add": that row is row 1089. The routing report names this as a doubt: the row had no number when the line was written. A ledger row is found by its number. Correction: "and row 1089, the prelude `String`'s placeholder comparisons, which answer `false` at a type assumption; it has no test yet (C111's compiled `XXX` test)". The line opens "each gated (P-38)", which row 1089 is not yet.

**C61** pass: weight none, writer none.

**C62** (`PLAN.md:94`) pass: row 1083 on Q-walk's line, its compiled half row 1084 with item 5, the review's words ("the compiled half with item 5").

**C63** (`PLAN.md:100`) pass.

**C64** (`PLAN.md:116`) pass: rows 566 and 624 left the list, varargs refused against the prelude (F-390).

**C65** pass: weight none, writer none.

**C66** (`PLAN.md:310`) pass.

**C67** (`PLAN.md:370`) pass: in the past, until rung N closed row 566; still item 6's home.

**C68** (`PLAN.md:748`) pass: "Default: as landed, open for his review"; the rung's way is not his answer.

**C69** (`PLAN.md:878`) pass.

**C70** (`PLAN.md:883`) pass.

**C71** (`PLAN.md:898`) pass: the groups' form, the two lines the review adds, and the pointer to PLAN-history's "Climb batch 33b's landing, 2026-11-18".

**C72** (`PLAN.md:900`) pass: the third question beside items 592 and 593; item 598.

**C73** (`PLAN.md:901`) pass: item 599.

**C74** (`PLAN.md:902`) pass: fork N6; item 600.

**C75** (`PLAN.md:903`) pass: told, the placement the review's and the planner's, not his answer; `:4708`; item 601.

**C76** (`PLAN.md:904`) pass: fork G3; the repair with item 5; item 602.

**C77** (`PLAN.md:905`) fail.
- Class coverage. Passage: "R.reserved.2: ... prints false after, from the prelude's placeholder body (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:393`; the row of the prelude `String`'s placeholder comparisons, which goes with the prelude)." Source: owed.md C77, "finding 1: R.reserved.2's changed answer, now C44's row"; `mech-1.md`: row 1089. Correction: "...(`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:393`; row 1089, which goes with the prelude)."
- The told line of finding 2 (row 1088, with item 5 beside row 818) and item 603 pass.

**C78** (`PLAN.md:906`, new) pass: in the form of `:893`; N4, N6 and G3 with items 601, 600 and 602; B1 to B3 item 595's; item 604.

**C79** (PLAN-history, "## Climb batch 33b's landing, 2026-11-18") pass: an opening, then the 26 old lines under their headings; plan-moves finds 26 lines out of PLAN and 40 gained, under 10 headings; no line moved whole, each built line keeping what stays.

**C80** pass: weight none, writer none.

**C81** pass: weight none, writer none.

## The review queue: new items

**C82** (item 598, (b), "The specification's text") pass: what is asked, "Default: as landed", the other way, its cost, its home and "Needed by: no planned work (set by the landing workflow)"; the peers' practice is the review's (`batch-33b-review.md:60`).

**C83** (item 599, (b), "Numbers and numerals") pass: "Default: (c), as landed", with "a status the judge took", not his word; the ways (a) and (b); `basic-integers.tex:106` is the review's (`:65`).

**C84** (item 600, (c)) pass: told, as landed.

**C85** (item 601, (c)) pass: the review's placement, the other way the review's consequence ("For the curator"), "Needed by: with fork N4's rung, item 1 ... (set by the landing workflow)".

**C86** (item 602, (c)) pass: as landed until item 5, the other way from Part 4; `count(1, ys...)` gives 1 is the review's (`:451`).

**C87** (item 603, (c)) fail.
- Class fidelity. Passage (`review-queue.md:1752`): "The other way: None asked; each call now follows the specification and walk, and the prelude's placeholder goes at the switch-over (P-37)." Source: the review, "For the curator": "Three calls now reach another declaration ... Each now does what walk does, except the prelude's `String`, which gives its placeholder's false" (`batch-33b-review.md:490`); row 1089, `NEGATIVE-VERIFIED`: the specification orders strings lexicographically, and the call answers `false`. R.reserved.2's call follows neither the specification nor walk. Correction: "The other way: None asked; R.reserved.1 and R.reserved.3 now do what the specification and walk do, and R.reserved.2 gives the prelude's placeholder `false` (row 1089), which goes with the prelude (P-38)."
- Class coverage. Passage (`review-queue.md:1750`): "the row of the prelude `String`'s placeholder comparisons holds it", and the Home (`:1754`) "rows 1088 and 818". Source: owed.md C87, "with rows 1088 and C44's row"; `mech-1.md`: row 1089. Correction: "row 1089 holds it", and the Home ends "rows 1088, 1089 and 818".

**C88** (item 604, (c)) pass: each fork's default as landed, his go named as no answer of his on the item, "as items 588 and 595".

**C89** pass: weight none, writer none.

## The review queue: existing items

**C90** (the head) pass: 258 open, 93 consequential, 165 routine (251 + 7, 91 + 2, 160 + 5); the group 15 (3, 12); its lead names both runs' go and 598, 601 and 602; climb batch 28's lead "420 to 422", 423 open as landed. queue-check passes.

**C91** (item 423) pass: open in (c), "Landed: Rows 940 and 942 fixed once in `STypesUtil.gatherMethods` by climb batch 33b's rung R (`90ee716db`; F-391). Default: as landed."; P-148's measure; "Needed by: no planned work (set by the landing workflow)". Not moved to (a): the rung's way is not his word.

**C92** (item 6) pass: the functional-method form runs; its cost and "Needed by" name the function form (row 546); the question stays his.

**C93** (item 323) pass.

**C94** (item 513) pass: the prelude's seven as value objects over payload classes (row 1003 closed; F-388); the builder's work is item 1 with rung N's machinery.

**C95** (item 514) pass: the reason in the past, as P-178 reads now.

**C96** (item 521) pass: by owed.md C96's ground; still open.

**C97** (item 561) pass: row 315 closed by rung W; its question, row 1039, stays.

**C98** pass: weight none, writer none.

## INDEX and other notes

**C99** (`INDEX.md:651`) pass: run 2 names N, W, G and R; both runs landed on his go, run 1 at `d3747846c1` and run 2 at `ba3c7c876d`. The batch file's own header comment (`CLIMB-BATCH-33.md:1`) is the coordinator's, as the routing report says.

**C100** pass: weight none, writer none.

**C101** pass: weight none, writer none.

## For the coordinator

**C102** to **C125** pass: writer none; each is the coordinator's, the skill writer's, the orientation update's or a code worker's, outside this run's writers. The routing report lists C115, C116 and C125 for the coordinator.

## The checks of mech-1.md

No check fails. The lines it reports:

- words-subset.py, the POSITIONS lines, exit 1 (information): P-33 adds `f-381`, P-178 adds `compiled`, `let`, `died`, `ran`. Cause: C40 and C41 change words, not only cut, by his rule of 2026-10-31; both pass above.
- ledger.py add: row 1089 in section 12. Cause: C44. Its number is owed at C60, C77 and C87.
- plan-moves.py, 5 LOOK lines: `PLAN.md:12` (C53), `:71` (C58), `:72` (C59), `:94` (C61), `:249` (C65). Each stays with its reason in owed.md: the items are marked answered or closed in the line, and `40302280cd` built another thing.
- lengths.py, 4 entries already over 600 grew: F-136 +46 (C35), F-352 +32 (C34), F-353 +61 (C36), F-390 +32 (C39). Cause: each by the clause that its change owes. The corrections of C34, C36 and C39 add a few words to the same clauses.
- record.py check, reported, not failing: P-169's history names "Held in chat (2026-11-07)", which `HELD.md` lacks, from before the base (C125).
- check-index.sh, 2 paths in prose that resolve nowhere: `INDEX.md:81` and `:593`, unchanged since AT, not this run's.

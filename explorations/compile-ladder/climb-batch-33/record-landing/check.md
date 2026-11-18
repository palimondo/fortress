<!-- The record-landing workflow's check of climb batch 33's first round (worktree at a6e73b8d6, landing d3747846c1): each change of owed.md, pass or each failure with its class, the passage, its source and the correction, then the findings of mech-1.md. -->

# The check of the first round, climb batch 33, run 1

Read: `owed.md`; `entries-report.md`; `routing-report.md`; `mech-1.md`; `git diff a6e73b8d6 -- explorations/ ':!explorations/coordinator/PLAN-history.md'`, entry by entry and line by line; `rows.md` for rows 812, 959, 1028, 1029, 1052, 1060, 1064, 1065 and 1069; the review (`reviews/batch-33-review.md`, sections 2 and 3, Part 1, Part 4, Part 5 and the steps due); `coordinator/CLIMB-BATCH-33.md`, forks B2 and S1 to I1, its list for the batch after and its section 6; review-queue item 521 at `a6e73b8d6`; `FileTests.java:455-520` and `:869-878`; `Functionals.scala:1402-1406` and `:1955-1959`; `ExportChecker.scala` at the re-anchored lines; the test files that F-369 and F-382 name. The gate's figures in F-53 and F-240 are untouched: `record.apply` rewrites neither.

## FACTS and POSITIONS: the pass

- **C1** (F-9) pass. "which follows the selection (F-381); under it, `f(i: Index)` passes the check (row 69)" keeps the merged-diff review's clause; questions 1 and 2 named for 694 characters.
- **C2** pass (weight none, writer none).
- **C3** (F-76) pass. F-386 names `CoverageReturnMethodCall.test` and holds the rule.
- **C4** pass (weight none, writer none).
- **C5** pass (weight none, writer none).
- **C6** (F-175) pass, kept as it stands: "four places" with rows 487, 543, 546 and 547.
- **C7** (F-181) pass. F-384 names `ComprisesWhereMemberCompiled.test`.
- **C8** (F-225)
  - form. The passage: the sentence "The compiler's prelude writes the self type instead as `comprises T` on `StandardTotalOrder` and `Equality` (... `655e65d53`, 2012-06-05, and `59fdeff62`, 2012-06-06, ...), and that spelling does not bind the one library, ... which this rule reads from the F-bound." is 615 characters. The source: `entries-report.md`, C8's block names question 2 for the pointer's clause only, and "Decisions not taken" gives a reason for the dates but names no question that keeps the sentence past 600. The correction: name the question that keeps it in the report (question 1, if the dates are the evidence of the team's spelling), or move the two dates to the history so that the sentence falls under 600. The rest passes: "F-385 gives how, and the generic object for which it may not hold" is the consistency that C56 owes, and the net growth is 9 characters.
- **C9** pass (weight none, writer none).
- **C10** pass (weight none, writer none); F-240 is not in `record.apply`.
- **C11** pass (weight none, writer none).
- **C12** (F-281) pass.
- **C13** (F-282) pass. The cut list of restated members stands in `rung-export-align/REPORT.md` and `rung-export-last/REPORT.md` (grep: `TotalComparison`, `Condition`, `ActualReduction`, `DelegatedIndexed`, `SQCAP`, `OpenRange`, `zeroIndices`); `rung-checker-small-gaps/REPORT.md`, "What changed and why", item 4 is row 1028.
- **C14** to **C17** pass (weight none, writer none).
- **C18** (F-293) pass.
- **C19** to **C24** pass (weight none, writer none).
- **C25** (F-352) pass.
- **C26** (F-353)
  - fidelity. The passage: "On `main` the compile command has its own selector (F-381) and one set of run-time classes." The source: F-353 before, "`main` has the selector (F-381), one set of run-time classes, and no second set"; F-381, "the two class path scripts follow the variable": the selector also sets the run's class path, and the run-time classes are the build's, which `fortress run` loads, not the compile command's. The subject change says less of the selector and gives the classes to the wrong owner. The correction: "`main` has its own selector (F-381) and one set of run-time classes." It keeps "its own", which holds the two selectors apart as C26 asks.
- **C27** (F-361) pass.
- **C28** (F-363) pass.
- **C29** (F-369) pass. `compiler_tests/XXXLocalTupleBindingMixedRefused.test` is in the tree beside `LocalTupleBindingMixedRefused.fss`.
- **C30** to **C32** pass (weight none, writer none).
- **C33** (F-377) pass for the pass: the member names went to the two reports, and the test list keeps seven names. The cast sentence is C57's.
- **C34** (F-379) pass, kept as it stands.
- **C35** (F-380) pass.
- **C36** (F-381) pass. The Detail's new heading, "The tests: the failing run on the base, the passing run", is in `rung-library-selector/REPORT.md:59`.
- **C37** (F-382)
  - fidelity, scope. The passage: "An element of a tuple of names, as `(x, y) =>`, is the team's binding form and binds, so an undefined name there takes a value of every type (row 1064)." The source: `rows.md`, row 1064: its claim is "under walk `(NoSuchTypeHere, ZZ32) =>` takes `("s", 3)` and `(2.5, 3)`", its reproducer is a walk test, and its notes say "Compiled, with an `Any` selector, the checker refuses the arm: 'The typecase clause, Pattern at ..., is unreachable.'" The entry's title is of both paths, so the added clause lets a reader conclude that the compiled path takes every value there too. The correction: "so under walk an undefined name there takes a value of every type (row 1064)."
- **C38** (F-383)
  - fidelity, a condition lost. The passage: "so a walk `.test` whose `load_` keys expect a refusal at load passes on such an error." The source: `FileTests.java:475-476`, "A test succeeds when the program is refused at load and the refusal satisfies its keys", and `:491-493`, `refused = atLoad && unmet == null`, where `unmet` is `generalTestFailed("load_", ...)`; an error that fails a key ends "Refused at load, but did not satisfy ...". The correction: "passes on such an error that its keys match."
- **C39** (F-384) pass. F-34 now holds rung V's own measure, and F-386 holds the receiver's cast.
- **C40** (F-385) pass, with C56.
- **C41** (F-386) pass, with C58.
- **C42** (F-387) pass. `rung-checker-small-gaps/REPORT.md`, "What changed and why", item 2 is row 1005.
- **C43** pass (weight none, writer none).

## FACTS and POSITIONS: the other changes

- **C44** (F-9, 694) pass: questions 1 and 2 named.
- **C45** (F-293, 640) pass: question 2 named.
- **C46** (F-381, 942) pass: question 1 named.
- **C47** (F-382, 1033)
  - fidelity, evidence. The passage: "Tests: `tests/TypecaseUndefinedArmWalk.fss`, `TypecaseUndefinedNameInArmTypeWalk.fss` and `TypecaseTypeParamArmWalk.fss`, each with a compiled test of the same form in `compiler_tests/`." The source: the entry before named `compiler_tests/XXXTypecaseUndefinedArmCompiled.test`, `XXXTypecaseUndefinedNameInArmTypeCompiled.test` and `TypecaseTypeParamArmCompiled.test`, and the tree holds those files. Their names differ from walk's in stem and in prefix, and two of them are `XXX` refusal tests. The entry claims the refusal on both paths, so the compiled tests are its gate, not question 4's detail; "of the same form" names no file a reader can find and hides the `XXX`. The correction: "Tests: `tests/TypecaseUndefinedArmWalk.fss`, `TypecaseUndefinedNameInArmTypeWalk.fss`, `TypecaseTypeParamArmWalk.fss`; `compiler_tests/XXXTypecaseUndefinedArmCompiled`, `XXXTypecaseUndefinedNameInArmTypeCompiled`, `TypecaseTypeParamArmCompiled`." The entry stays under its 1136 characters at the base.
- **C48** (F-384, 1322)
  - coverage. The passage: `entries-report.md`, "C39 and C48, F-384 (1487 to 1322)", has no "Past 600" line, where each other block of C44 to C53 names its question. The source: `owed.md`, C48 (past 600 characters); `mech-1.md`, lengths.py, "F-384: 1487 to 1322 characters (-165), over 600". The correction: name in the report the question that keeps each sentence past 600, or cut the entry nearer 600.
- **C49** (F-385, 1278) pass: question 1 named; C56's detail is in the review's section 2, which the Detail names.
- **C50** (F-386, 1431) pass: question 1 named.
- **C51** (F-387, 750) pass: question 1 named.
- **C52** (F-377, 2469) pass: questions 1 and 2 named; the entry shrank by 343.
- **C53** (F-282, 2455) pass: questions 1 and 2 named; the entry shrank by 346.
- **C54** (F-34)
  - fidelity. The passage: "Each of the two repairs of those walls, measured on its own code alone, gave 15 refused in 5 kinds (`18d5b51578`, the kind environment, F-384) and 16 in 4 kinds (`e0a5274db2`, the intersection receiver, F-386)." The source: the review, section 3, "Rung I on its code (`e0a5274db2`): 'refused declarations 17 | emitted (OK lines) 743', 4 kinds ... Its worktree's counter is the base's, which counts `ArrayList` twice ...; counted once, 16"; `owed.md`, C54, "rung I on `e0a5274db2`: 17, 16 counted once". The run gave 17; 16 is the count with `ArrayList` once. The correction: "and, counted once, 16 in 4 kinds (`e0a5274db2`, ...)". The rest passes: the title's clause and the by-reading sentence are the review's, the figures behind them and the review's section 3 are in the entry, and the earlier measures are in the history block.
- **C55** (F-302) pass: "since nothing runs against the one library yet", the fewest words.
- **C56** (F-385) pass. The two limits are the review's section 2, Q2, with "by reading, neither measured nor held by a test"; the report names Part 5's item 1 as left, a plan for the batch after.
- **C57** (F-377)
  - fidelity. The passage: "and at an arm that is `self` where the conditional's type is a trait type, as `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`, a worker's choice beyond the plan." The source: the review, section 2, Q1, "The rung casts each arm at the conditional's own type ... so a `self` arm gains a cast where the context is a trait type and the verifier needs none"; review-queue item 571 as this round wrote it, "also where the conditional stands at a trait type". In `atQ` the conditional's own type is `R`, the cast's target, and the entry's own list says "at each arm of a conditional ..., at the conditional's type" in that sense; the trait type is the context, `Q`. The correction: "where the conditional's type is a trait type" to "where the conditional stands at a trait type". The rest passes: "a planner's default" for rung K's cast follows item 571's fork K1, as C57 asks, and "The curator has decided neither" keeps the open line.
- **C58** (F-386) pass. The review's section 2, V.worker.2, by reading, with P-43 for the exclusion rule.
- **C59** (P-12) pass. Before and after: he decided that after the switch-over walk runs the compiled checker on its programs and uses the static coercions that it inserts; it applies to walk's programs after the switch-over, walk unchanged before it; it requires walk to gain the checker's static types and use its coercions in place of its run-time choice (P-59). All three are unchanged. The made-false clause changed by the fewest words that the sort gives, under his rule of 2026-10-31.
- **C60** pass (writer none in this run; C170).
- **C61** (row 1052) pass. The note is the review's Q2, "by reading, not run", with "no test holds it".
- **C62** pass (weight none, writer none).

## PLAN and PLAN-history

- **C63** (`PLAN.md:9`) pass.
- **C64** (`PLAN.md:10`)
  - fidelity. The passage: "after climb batch 33's run 1 it is not measured, and the rungs' own runs give 12 to 14 (F-34; ...)". The source: the review, section 3: the rungs' runs gave 15 and 17 (16 counted once), and "by its rungs' own runs, 12 to 14 expected" is a reading of them; `owed.md`, C64, "not measured after run 1, 12 to 14 expected"; this round's own `PLAN.md:68`, "By the rungs' own runs 12 to 14 are expected". The correction: "and by the rungs' own runs 12 to 14 are expected".
- **C65** (`PLAN.md:11`) pass.
- **C66** (`PLAN.md:12`)
  - routing, with C133. The passage: "item 521, the form of that second set, is answered by climb batch 33's planner's probe, which found no fork: ... (...; item 521, in the queue's part (a)), and the planner's reading is on his review list for that batch." The source: C133 below. The correction: "item 521, the form of that second set, has the planner's default from climb batch 33's probe, which found no fork: one set for the seven number types, and files of their own for the other carried types (...); it is open for his review (review-queue item 521)". The rest of the line passes, and plan-moves' LOOK on it (371, 372, 512, 515 and 577) has its reason in `owed.md`: each is marked answered in the line.
- **C67** (`PLAN.md:13`) pass.
- **C68** (`PLAN.md:53`)
  - fidelity. The passage: "and climb batch 33 took its pieces (fork B2):". The source: `CLIMB-BATCH-33.md:540`, fork B2, "The rest wait ...: the ones left need a test first (rows 1007, 1009, 1010, 1012, 1015) or sit in members that N edits (rows 818, 1054 to 1056)"; `owed.md`, C68, whose ground is rung Q's build of rows 1051, 1050 and 1052 alone. "its pieces" reads as the whole list. The correction: "and climb batch 33 took part of it (fork B2):".
- **C69** (`PLAN.md:55`) pass.
- **C70** (`PLAN.md:68`)
  - fidelity, a sentence that the landing made false left in the line. The passage: "behind a first wall can stand a second, as row 812's crash behind `ArrayList`'s, which rung T's `CodeGen.genericMethodTakesOneParameter` now reaches." The source: `rows.md`, row 812, closed as FIXED; the review, section 3, "`ArrayList` and `APPCOV` are emitted"; `owed.md`, C70, "rows 822, 812 and 540, its kinds' rows, are closed"; this round's F-34 moved out the same example because it is fixed. The correction: "as row 812's crash stood behind `ArrayList`'s until climb batch 33's rung V closed it", or cut the example. The rest of the line passes.
- **C71** (`PLAN.md:70`) pass. plan-moves' LOOK on 577 has its reason in `owed.md`.
- **C72** (`PLAN.md:71`) pass. The LOOK on 577 has its reason in `owed.md`.
- **C73** (`PLAN.md:73`) pass.
- **C74** (`PLAN.md:88`) pass. The writer's anchor is right where the sort's was not: `Functionals.scala:1404-1405` holds `defaultNumeral`'s use, and `:1957` is `if (WellKnownNames.areCompilerLibraries())` in the `case` rule's `isContainsSubtype`, read in the tree.
- **C75** pass (weight none, writer none); its reason answers the LOOK on `PLAN.md:93`.
- **C76** (`PLAN.md:96`) pass; `:254` reads `coverOverloading`, `:611` opens `uncoveredDeclarations`' comment.
- **C77** (`PLAN.md:97`) pass.
- **C78** (`PLAN.md:99`) pass.
- **C79** (`PLAN.md:114`) pass.
- **C80** pass (weight none, writer none).
- **C81** (item 99 and its heading, moved)
  - routing. The passage: `routing-report.md`, C81, "moved to PLAN-history ... | rows 1051, 1050 and 1052 fixed." The source: the brief's rule, a move for "built" names its commit. The report's C81 line names none (its C96 line has it). The correction: "built by climb batch 33's rung Q (`1f6c166b0d`)". Item 572 stays open, as the sort asks.
- **C82** (item 102 and its heading) pass: what is asked, the three ways, "Default: 1a, as landed; the review recommends 1b", review-queue item 592 with its "Needed by".
- **C83** and **C84** pass (weight none, writer none); C84's reason answers the LOOK on `PLAN.md:248`.
- **C85** (`PLAN.md:289`) pass.
- **C86** and **C87** pass (weight none, writer none).
- **C88** (row 959's line, moved) pass: `18240c9d85`, F-382.
- **C89** (`PLAN.md:314`) pass.
- **C90** pass (weight none, writer none).
- **C91** (`PLAN.md:640`) pass, with the three anchors beyond the sort, each read in the tree (`:528`, `:362-363`, `:778`).
- **C92** pass (weight none, writer none).
- **C93** (`PLAN.md:824`) pass.
- **C94** (`PLAN.md:836`) pass.
- **C95** (`PLAN.md:853`) pass.
- **C96** (`PLAN.md:854`) pass: built at 1a by `1f6c166b0d`, open for his review as landed, item 572.
- **C97** (rows 1050 and 1052's line, moved)
  - routing. The passage: `routing-report.md`, C97, "moved to PLAN-history | both fixed by rung Q." The source: the brief's rule, "built, by a named commit". The correction: "both fixed by climb batch 33's rung Q (`1f6c166b0d`)".
- **C98** (review-routed.1, moved) pass: `0e6e0402b9`, `compiler_tests/SelfTypeArmRun`.
- **C99** (`PLAN.md:856`) pass.
- **C100** (`PLAN.md:873`) pass.
- **C101** (row 1060's line, moved) pass: `8979406af2`.
- **C102** (fork O4, moved, and the group's opening) pass: `18240c9d85`.
- **C103** (`PLAN.md:882`)
  - routing, with C133. The passage: "also names item 521, answered by the planner's probe (review-queue item 521, in part (a))". The source: C133 below. The correction: "also names item 521, at the planner's default from its probe (review-queue item 521)". The rest of the opening passes.
- **C104** (`PLAN.md:886`) pass.
- **C105** (`PLAN.md:888`) pass.
- **C106** (`PLAN.md:889`) pass.
- **C107** pass (weight none, writer none).
- **C108** (`PLAN.md:891`) pass: the review's line word for word, item 596.
- **C109** (`PLAN.md:892`) pass.
- **C110** (`PLAN.md:893`) pass.
- **C111** (`PLAN.md:293`) pass: row 1069's claim and notes.
- **C112** (`PLAN.md:129`, under "Phase 6. microGPT fast") pass.
- **C113** (`PLAN.md:910-911`, `:929`) pass; `:583-585` at `:912` is named as left, with its reason.

## The review queue: new items

- **C114** (item 590) pass.
- **C115** (item 591) pass.
- **C116** (item 592) pass: (b), consequential, default 1a as landed, "Needed by" set by the landing workflow.
- **C117** (item 593) pass: "No default on record; as landed, the test kept."
- **C118** (item 594) pass; its other way is fork I1's way not taken (`CLIMB-BATCH-33.md:561`).
- **C119** (item 595) pass; the report names Part 4's fifteen against the step's sixteen.
- **C120** (item 596) pass.
- **C121** (item 597) pass: routine, set by the workflow, the record's default.
- **C122** and **C123** pass (weight none, writer none).

## The review queue: existing items

- **C124** (the head and the groups) pass. 245 + 8 - 3 = 250 open; 90 + 1 = 91 consequential; queue-check passes. The counts change with C133's correction.
- **C125** (item 572) pass: open for his review as landed.
- **C126** (item 519, to (a)) 
  - coverage. The passage: `PLAN.md:877`, "Forks O1, O3 and O4 are review-queue items 516, 518 and 519", which `mech-1.md`'s plan-moves lists to look at ("it names items in (a) among open ones: 519"). The source: `owed.md` has no line for it, since its plan-moves ran before 519 moved; `routing-report.md` names it nowhere. The correction: give in the routing report the reason that the line stays (the sentence maps forks to items and stays true; the line is item 588's), or write "519, in (a)" in it. The move itself passes: stale by `18240c9d85`, with fork O4 named as a default, not his word.
- **C127** (item 540) pass: open on (1) and (2).
- **C128** (item 587, to (a)) pass: `8979406af2`, told.
- **C129** (item 584) pass; B2's reason, "sit in members that N edits", is `CLIMB-BATCH-33.md:540`.
- **C130** (item 571) pass.
- **C131** (item 58)
  - fidelity. The passage: "Needed by: before microGPT compiles; with row 540 closed, the text's boundary no longer sends the intersection into a crash of the code generator." The source: `owed.md`, C131, "that crash is gone", row 540's; F-386; item 323 as this round left it, where rows 543, 546, 547, 559 and 566 stay for phase 5. That no other crash of the code generator meets the widened boundary is not shown. The correction: "no longer sends the intersection into row 540's crash".
- **C132** (item 323) pass.
- **C133** (item 521, to (a))
  - routing. The passage: `review-queue.md:2561`, "Moot by its own "Needed by" line, which sent it to him only if the planner's probe of way (b) of fork H2 showed a real fork. Climb batch 33's planner's probe found none: ... `Boolean`, `Char`, the flat string and the Java-backed types take files of their own ...; rung S built the selector with one set (`c7ba100d14`; fork S5; F-381)." The source: item 521 at `a6e73b8d6` asks "a map of names over the first set, or files of its own?", with "No default on record" and "The other way: Files of its own". For the other carried types the probe's "files of their own" is that other way, chosen by the planner, and still to be built ("the other carried types come with their own rung", fork S5, `CLIMB-BATCH-33.md:547`; "their hand-written classes as the second set under the selector", `:492`). One set for the numbers is fork S5's default, a batch's. The "reaches him only if" clause was the coordinator's (`30572fbfaa`, routing his words of 15:13 UTC on fork H2, which do not name item 521), and his go of about 17:13 UTC is no answer on the item (`owed.md`, C119). So the move rests on a batch's defaults and the coordinator's condition: no word of his, no landed fix of the item's question, no closed row. The item stays open. The correction: keep 521 in (c), "Code generation and the run time", with "Landed: one set for the seven number types (`c7ba100d14`; fork S5; F-381). Default: files of their own for `Boolean`, `Char`, the flat string and the Java-backed types, the planner's from its probe (`coordinator/CLIMB-BATCH-33.md`, section 2, "Item 521, answered by the probe"), which run 2 builds" and "Needed by: no planned work; on his review list for climb batch 33 (set by the landing workflow)"; its short line back in the probes' group, and that group's sentence on 521 rewritten; the counts (251 open, 160 routine; the probes' group 8, 3 routine; "Code generation and the run time" 22; part (a) 55); and C66 and C103.
- **C134** (item 513) pass.
- **C135** and **C136** pass (weight none, writer none).

## INDEX, other notes, and for the coordinator

- **C137** to **C139** pass (weight none, writer none).
- **C140** to **C156** pass (writer none: the skill writer).
- **C157** and **C158** pass (writer none: the orientation update).
- **C159** to **C172** pass (writer none).

## The findings of mech-1.md

- No check fails: `mech-1.md` reads "Every check passes."
- words-subset.py, exit 1 (information): P-12 adds "unless", "`FORTRESS_LIBRARY=one`", "selects", "one", "library", "by", "default". These are C59's words, a sentence that the tree made false, changed under his rule of 2026-10-31.
- record.py check, "reported: from 1": P-169's history (`POSITIONS-history.md:3666`) names a heading "Held in chat (2026-11-07)" that `HELD.md` lacks. It predates the base (C172) and is no change of this round.
- plan-moves.py, six LOOK lines: `PLAN.md:12` (C66), `:70` (C71), `:71` (C72), `:93` (C75) and `:248` (C84) have their reasons in `owed.md`; `:877` has none, the coverage failure under C126.
- lengths.py, eleven entries already over 600 grew: F-34 (C54), F-225 (C8), F-352 (C25), F-353 (C26), F-361 (C27), F-363 (C28), F-369 (C29), F-380 (C35), F-385 (C56), F-386 (C58) and P-12 (C59). Each grew by its change's clause, as checked above. F-384 shrank, but its block names no question (C48).
- check-index.sh: two prose paths that resolve nowhere and 85 lines outside the note set, both informational; INDEX is unchanged by this round (C137).

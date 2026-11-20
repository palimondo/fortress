<!-- The entries writer's report for climb batch 34's landing, run 1: for each change C1 to C24 of owed.md, what was written or kept, and why. -->

# The entries writer's report, climb batch 34, run 1

Files: `record.apply` (seven entry lines, two noted blocks), `clean.txt` (the seven new lines), `cut-only.txt` (empty: no POSITIONS entry changes), no `rows.rewrite` (no change has a row as its home). The landing commit in each provenance line: `285efad8021dce9f3fa685ddc19a04660e0b69d5`.

Where this report says "old line", the line stands in full in `entries.md`, under the entry's heading, after "Now:" (the line at AT); F-225's old line is `FACTS.md:102` at AT. The new line is in `clean.txt`, in the order F-34, F-325, F-392, F-393, F-394, F-395, F-225. Sizes are the tool's measure, about: the line without its "- ". The sections C1 to C24 give round 1. The section "The fix round" at the end gives each change of round 2 and the sizes after it; where the two differ, that section holds.

## C1, C2, C3: F-34

- Old line: 3015 characters, its title "measured apart" on rung T's code and rung P's code.
- New line: about 2310 characters. The title states the count on the landed code, `285efad802`: none refused. The body gives the script's figures (0 refused, 754 emitted, no component failure), and `String`'s real compile under the selector on the same tree without the patch, both calls to the `(String, String)` body. It gives the count on `ba3c7c876d`: the script counted 1, the real compile 2. It keeps the caveats: the patch for row 874, the script's skip of the dispatch methods, no emitted class run, no test of the count. It adds that the patch is needed while the payload-objects table has no rows for the one library's seven number types (`NamingCzar.java:606-614`), and that the script's edit of `NN32`'s getters changes nothing now. The detail cites `measure-285efad802.txt`.
- Moved out (C3): the counts of `d3747846c1` and `c3b16ef2d1`, their measure files, and the sentence on why the sums differed, to the history note. The landed code's count supersedes them. The citations of rung T's and rung P's report sections give way to `measure-285efad802.txt`, which cites both.
- Meaning: changed, from the measure on the landed tree (`measure-285efad802.txt`, `8f7604e42c`; the review, section 4). The count is now on one code, the landed one, where it was on two codes measured apart.
- Past 600: question 1 keeps the setting, the patch and why it is needed, the count and the `String` compile, the earlier count, and the caveats. A reader who did not have them would trust the count beyond its scope. Question 2 keeps "a declaration counts at its first wall". The command and the detail stay, as in every measured entry.

## C4: F-53

Keep. The commit stage's rewrite changed only the title's batch (33b to 34). Its figures come from the gate's tables. No sentence was named false.

## C5: F-240

Keep. The commit stage's figures and its comparison against climb batch 33b stand. No sentence was named false.

## C6: F-240's history

A noted block. It records the machine of this gate: the VM restart of 17:06 UTC gave an Intel Xeon at 2.10 GHz, where it was 2.30 GHz before. `testFast` took 11 min 45 s against 7 min 53 s. So no stage time of this gate compares with climb batch 33b's. F-240's text is unchanged. Meaning: unchanged.

## C7, C8, C9, C13: F-268, F-302, F-315, F-369

Keep each. The merged-diff review only moved each one's citation of `CodeGen.java` to the landed lines. The text is the base's.

## C10, C11: F-325

- Old line: 2580 characters.
- New line: about 2380 characters. The title names every compiled form: the receiver, the call whose every dispatched argument is an assumption, the call of an overloaded function or operator of the component where only some are, and the value. It ends "the other partial calls stay refused", in place of "a partial one at a functional method or a dotted call stays refused", which left out the generic forms and the dispatch that holds a functional method. The long sentence on the partial call is now two sentences. The refused forms are in two sentences, by message. The test list keeps the compiled tests and the walk test. A pointer, "Row 818's notes name each refused form's `XXX` test", replaces the seven `XXX` names. Each name is in row 818's notes or reproducer (checked: `XXXAsIfPartialMethodCompiled` is its reproducer; the six others are in its notes).
- Meaning: unchanged. The title's new last clause states the body's refused forms. It does not add any.
- Past 600: question 1 keeps each compiled form and each refused form with its message, since a worker who writes such a call needs to know which compiles. Question 2 keeps the dispatch's three cases. The walk sentences keep the paths apart (question 2). What moved out first: the seven `XXX` test names, to row 818's pointer (question 5).

## C12: F-352

Keep. The gather's "(row 993, fixed since)" is in the entry's own form. The review finds none of its sentences false after run 1.

## C14, C15: F-392

- Old line: 675 characters.
- New line: about 655 characters. The title names the code generator. The skeptic's fix is now plain: the bounds include those of a `where` clause on a method that has no static parameters of its own and bounds its trait's or object's parameter. "Reads ... and casts it there" is now "casts the receiver to". The second detail section, "The owner as found, and the cast", is cut. The first section holds the mechanism.
- Meaning: unchanged.
- Past 600: question 1 keeps the `where` clause case and the bound that is a type variable (row 1093), which tell a worker which calls compile.

## C16, C17: F-393

- Old line: 1135 characters.
- New line: about 1140 characters. The verifier's figure is bounded to one run of the planner's rehearsal tree, which holds the rehearsal's hacks. It gives the whole result: none of `FortressLibrary`'s 4,694 methods refused, 2 methods refused in all, both in `RangeInternals` (row 1054), and 1,092 template classes skipped (rung L's `REPORT.md:115`). "Before" is shorter: "a later closure or task" for "a later local function, function expression or forked call", and the site `simplestRationalBetween` is left to row 1078.
- Meaning: changed in scope, from the review's section 1, L, and `REPORT.md:115`. The old clause could be read as a property of the tree. It was one scratch run that skipped the template classes and refused 2 methods elsewhere.
- Past 600: question 1 keeps the mechanism, the old failure (its message, which a worker can meet in an old build), and the bounded verifier result. The entry grew by about 5 characters, the clause that its change owes. What moved out first: the list of closure forms and the site of row 1078.

## C18, C19, C20: F-394

- Old line: 1376 characters.
- New line: about 1460 characters. The title is bounded to a getter declared in a trait or an object, "but not in an object expression (row 1097)". A body sentence says that the code generator then stops at 'Can't compile ObjectExpr' (row 375), so no compiled program reaches the gap. The library's half of rung G is in one sentence: `NN32`'s `zero` and `one` and thirteen more getter declarations answer their inherited types, so the count and the distance stay 0. The inferred return type is kept, as "also where its return type is inferred".
- Moved out first, to the history note: the sentence on what the code did before the change (the code generator's stop, the verifier's failure, the others compiled), by question 3; and the walk effect of the library's getters (a rank-2 or rank-3 range's `indexValuePairs` takes a subscript; `ArrayList`'s `extractLeft` makes a `Just`), which owed.md's C18 allowed in the history.
- Meaning: changed, from row 1097. The old title claimed the check for every getter. It holds for declarations only.
- Past 600: question 1 keeps the rule and its receiver, the narrowing and widening cases, the self-typed method's gap (row 1094), the object expression's gap (row 1097), and the library's state. The entry grew by about 85 characters, the two clauses that C18 and C19 owe, after the move of about 330.

## C21, C22: F-395

- Old line: 1249 characters.
- New line: about 1240 characters. The detail path is `compile-ladder/rung-flatstring-name/REPORT.md`, without `explorations/`, as the other entries cite. The long sentence on the two `forObjectDecl1` methods is two sentences.
- Meaning: unchanged.
- Past 600: question 1 keeps the two methods and their lists of singletons, which tell a worker which native objects need no line. Question 2 keeps why it is ready in time, and the `Reflect` exception.

## C23: F-225

- Old line: 2685 characters, `FACTS.md:102` at AT.
- New line: about 2795 characters. The title's "save in the overloading check's exclusion test (F-277)" gains "and in the Return Type check of a dotted method redeclared below the trait (row 1094)". A body sentence says what that check does: it reads `self` as `C[\X\] & X` in the trait's signature where an object's dotted method redeclares the trait's method at the same parameter types, so it refuses a narrower return type; a getter so redeclared reads the plain type and compiles (F-394).
- Moved out first, to the history note, by question 3: the dates of the prelude's spelling ("on `StandardTotalOrder` since Steele's `655e65d53`, 2012-06-05, and `59fdeff62`, 2012-06-06, which took its F-bound away"), and the repair of the demo `trips.fss` (row 710).
- Meaning: changed, from row 1094 and `OverloadingChecker.scala:214`, `:733-734` (the review, Part 1, finding 4). The old title claimed the plain signatures in every check but one.
- Past 600: the entry was past 600 before. It grew by about 110 characters, the clause that its change owes, after the move of about 190. Each sentence that it kept was kept as it stood.

## C24: P-102's history

A noted block with his words of 15:49:11 UTC on 2026-11-18, as the review's section 3 and "The finding for the curator" quote them, and his question whether the skeptic can check the statement. The source is also `HELD.md`, "Held in chat (2026-11-18)". P-102's text is kept. Meaning: unchanged.

- Decision before and after: the same. Every edit of source code in the original tree starts from a failing test that stays in the test suite.
- Reach before and after: the same, every edit of source code in the original tree.
- Requirement before and after: the same, P-102's text word for word. The form of the stated failure is C61's question, for the routing writer.

## Decisions not taken

- F-34's title: I kept "the measure's script can take the count only on a patched tree". The alternative is to cut it, since `String`'s real compile ran without the patch. I kept it because the script's count is the entry's count.
- F-394: the walk effect of the library's getters went to the history. The alternative is a clause in the entry, about 110 characters. I chose the history because the entry is past 600 and the walk test gates the behaviour.
- F-225: I added the new case to the title, as the false sentence stands there. The alternative is to keep the title and add the case only in the body. That would leave the title false.

## The fix round

`check.md` found four fidelity failures in my homes: F-325 (two), F-225 and P-102's note. `mech-1.md` found no failure. I made each correction as `check.md` gives it. I also fixed the passages that the cold reader (`cold-read.md`) read two ways or could not resolve, where a source settles them.

- **F-325, title** (`check.md`): it now ends "the other partial calls stay refused, and so does such a call where a declaration at or below the resolved one is generic or its own dispatch would hold a functional method." The round 1 title let a reader conclude that every partial call of a component's overloaded function compiles. Meaning: changed back to the body's, from `CodeGen.java:7310-7311`, `:7351-7352`, which refuse both forms inside `partiallyAssumedCall`.
- **F-325, pointer** (`check.md`): "Row 818 names each refused form's `XXX` test, in its reproducer and its notes." Meaning: unchanged.
- **F-325, cold read**: the list of forms refused with the old message is now four items with semicolons, which reads as one form per item: a partial call of a functional method; one of an overloaded method whose receiver is an assumption too; a dotted method call with an assumption at an argument; one whose own dispatch would hold a functional method (the review, section 1, P2). "Take each assumed argument at its assumed type" is now "whose parameter at each assumed argument accepts the assumed type" (`TypeAnalyzer.lteq`, rung P's report). "Of the component" is now "declared in the call's own component" (row 818 refuses another component's overloaded function with its own message). Meaning: unchanged.
- **F-225** (`check.md`): one sentence added after the new case: "That reading of a dotted method departs from P-146 and P-157, which keep the plain signatures for the Return Type Rule (row 1094)." This also settles the cold reader's question of whether the reading is meant. Meaning: changed. The round 1 text set the departure beside the decided exception, so it could be read as decided. It is now a departure (the review, Part 1, "Corrections owed").
- **P-102's note** (`check.md`): "the batch manual's skeptic check 2 also accepts the failure that the section names, a fallback that his words do not have (climb-batch-workflow.md:128)". P-102's text is unchanged. Its decision, reach and requirement are as in C24.
- **F-394, cold read**: "is refused where it narrows, a departure from P-146 and P-157 (row 1094)", in line with F-225.
- **F-34, cold read**: "payload objects" is now "the code generator's table of the classes that carry built-in types (`payloadObjects`, ...)". The `NN32` edit now says why it changes nothing: "since the library declares them so (F-394)". "Under the selector" is now "with `FORTRESS_LIBRARY=one`". The real compile's 2 is now named: "that one, and `String`'s `concatAndBalanceIfNecessary`, which holds the two calls" (`rehearsal.md`, section 3, 1: rows 1076 and 818; `String.fss:61`). "The measure sees no class ..." is now "cannot see", a limit. Meaning: unchanged.
- **F-392, cold read**: the `where` clause is now "that of the calling method where it has no static parameters of its own", so it does not read as the generic method called (rung T's report, the skeptic's fix). Meaning: unchanged.
- **F-393, cold read**: "the planner's rehearsal tree, which holds the rehearsal's hacks" is now "a scratch copy with the switch-over rehearsal's patch (`compile-ladder/plan-34/probes/rehearsal-34.patch`) less its stand-in for row 1078" (rung L's `REPORT.md:87`). "The verifier" is now "the JVM's verifier", and the ASM count is said to cover "that copy's compiled components". Meaning: unchanged.
- **F-395, cold read**: the title says "no library needs a line that names a native object as a value for walk", not that none does. Meaning: unchanged.

Kept as they stand, since no source in my reach settles them: F-34's setting, "the checker's failures caught per declaration, and the bound `Any`", which is F-53's text and which F-53 defines; and "the code generator still stands between the library and bytecode". The other cold-read points ask for concepts that belong to the `fortress-repo` skill, not to the entries. For the skill writer: "dispatched argument", "native singleton" and "native component", the payload classes, and "the coordinator" as the author of a default. F-34, F-392 and F-395 are the entries that use these terms.

Sizes after the fix round, about: F-34 2467 (from 3015); F-325 2631 (from 2580, +51); F-392 683 (from 675, +8); F-393 1250 (from 1135, +115); F-394 1495 (from 1376, +119); F-395 1250 (from 1249, +1); F-225 2927 (from 2685, +242). F-325, F-392 and F-395 grew past their old text only by the fidelity correction and the cold-read fixes. F-225 grew by the owed clause and the correction. F-393 grew by the owed bound and by naming its tree, which the cold reader could not identify. F-394 grew by its owed clauses and its departure clause. Question 1 keeps each added clause: without it, a reader acts on a wider or an unclear claim.

## Questions for the curator

None. No change needs his word: no POSITIONS sentence changes, and each FACTS change rests on the review, the measure or a row.

## For the skill writer

Nothing new from these entries. The skill's sentences that the batch made false are in owed.md, "For the coordinator".

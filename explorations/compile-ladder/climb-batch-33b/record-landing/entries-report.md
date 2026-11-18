<!-- The entries writer's report for climb batch 33b's record-landing: for each change of owed.md that is the entries writer's, what changed in its entry or row, its meaning, its size, and the questions for the curator. -->

# The entries writer's report, climb batch 33b

Files in the run's folder: `record.apply` (18 entries), `rows.rewrite` (rows 546, 604 and 1017), `rows.add` (one new row in section 12), `clean.txt` (the 18 new entries). No `cut-only.txt`: no POSITIONS change only deletes words (P-33 adds a pointer, P-178 changes tenses).

Each whole new line is in `record.apply` and `clean.txt`. Each old line is the entry at AT, `8c13a52ec`. Below, each change gives the sentences that changed, old and new. Sizes are in characters, at AT and new.

## FACTS: the pass on the batch's entries

**C3 and C31, F-86** (912 to 891).
- Old: "The compiled library declares no `ImmutableArray`, so under it each use of such a parameter is refused (row 604). Against the compiler's library the code generator refuses varargs, naming the missing type; under the selection it compiles them (F-390). Gated by `compiler_tests/Varargs*`, and the refusals by the `XXXVarargs*` tests of row 604 and of the code generator against the prelude."
- New: "The compiler's prelude declares no `ImmutableArray`, so under it the checker refuses each use of such a parameter (row 604), and the code generator refuses a varargs declaration, naming the missing type; under the selection of the one library the code generator compiles it (F-390). Gated by `compiler_tests/Varargs*`, and the refusals by `compiler_tests/XXXVarargs*`."
- Meaning: unchanged. "The compiled library" and "the compiler's library" are one thing, the prelude, so they now have one name.
- Past 600: the sentences on the prelude's refusals keep their place by question 1 (a worker against the prelude does otherwise without them). It shrank, so nothing moved out.

**C4 and C27, F-128** (1200 to 1139).
- Old: "and a function argument by the arrow coercion, where the call fails, 'Unification error: Closure/Constructor for callWide param 1 (f:ZZ32->ZZ64) got arg ...' (row 1083, `tests/XXXArrowCoercionFnArgument.fss`); the compiled path converts that one (`compiler_tests/ArrowCoercionFnExprCompiled.test`), but not to a function type of no parameters (row 1084)."
- New: "and a function argument by the arrow coercion, where the call fails with a 'Unification error' (row 1083); the compiled path converts that one, but not to a function type of no parameters (row 1084)." The Detail gains "for the arrow coercion, `compile-ladder/rung-closure-name-once/SKEPTIC.md`, "3. My programs"".
- Meaning: unchanged. The full message and the two tests stand in the skeptic's section and in row 1083 (question 4).
- Past 600: the list of what is not converted keeps each item by question 1.

**C8 and C29, F-301** (1715 to 1668).
- Old: "where `make` reaches the class of the prelude's value object through a method handle, F-388). On the trait form of the prelude's number types, a functional method ... reaches the wrapper"; "the box's constructor chain; only C1's profiling code refuses the helper and the chain's deep frames."; "Observed once, on that form and not on the number types' object form (F-388), on one small program,".
- New: "where `make` now calls the `make` of the prelude's value object through a method handle, F-388). When the prelude declared its number types as traits, a functional method ... reached the wrapper"; "the box's constructor chain."; "Observed once, while the prelude declared them as traits, and not since they are value objects, on one small program,".
- Meaning: unchanged. "The trait form" was a handle; it is now written out.
- Moved out first: the sentence on C1's profiling code, to the report's sections 2 to 5 (question 4).
- Past 600: the chain of frames and the bytes per iteration keep their place by question 1; the bounds of the observation by question 2.

**C9, F-302** (1331 to 1278).
- Old: "On the trait form of the prelude's number types, their `+` reaches `Object.<init>`"; "The chains measured are those of that form, whose box extended"; "...entries; the one library's seven are not yet written so (fork N4), and the depth on the object form is not measured."
- New: "When the prelude declared its number types as traits, their `+` reached `Object.<init>`"; "The chains measured are of that form, where the box extended"; "...entries. The depth of the value-object form is not measured."
- Meaning: unchanged. The clause on the one library's seven is F-388's, which states it (question 5). "Fork N4" was a batch handle.

**C11, C28 and C38, F-315** (1452 to 1321).
- Old: "The library's `test stringifyChars`, which a varargs call stopped, is emitted by the measure of F-34's setting on rung G's code of climb batch 33b, since the code generator compiles varargs against the one library (F-390; `compile-ladder/rung-varargs/REPORT.md`, "The measure (on a scratch copy of the rung's code)")."
- New: "The library's `test stringifyChars`, which a varargs call stopped, is emitted in F-34's measure, since the code generator compiles varargs under the selection of the one library (F-390)."
- Meaning: unchanged in substance. The ground moves from rung G's scratch copy to the landed code, whose measure emits `stringifyChars` too (`measure-ba3c7c876d.txt` lists it as emitted).
- Past 600: as at the base; the sentence grew by 111 characters over the base, the clause that the change owes.

**C12 and C30, F-320** (1608 to 1570).
- Old: "and compiles under the selection (F-390; `one_library_tests/OneLibraryVarargsLocalFunction.test`)."
- New: "and compiles under the selection of the one library (F-390)."
- Meaning: unchanged. The test is among F-390's (question 5).
- Past 600: the entry is 118 characters over its base of 1452, and it grew only by the varargs clause that C12 owes. Question 1 keeps that clause: a worker who writes a varargs local function against the prelude would do otherwise without it. The other sentences are as at the base.

**C15, F-338** (592 to 585).
- Old: "which names the trait of the supertrait's own declarations as the extends clause names it; `STypesUtil.allMethods` gives them that name itself (F-391), so the rename gives each entry the name it already has."
- New: "which gives each of the supertrait's own declarations the trait's name as the extends clause writes it; `STypesUtil.allMethods` already gives them that name (F-391), so this renaming changes no entry."
- Meaning: unchanged. "The rename" had no referent.

**C18, F-379**: keep. Its new clause, "the compiler's prelude declares the same seven as value objects (F-388)", is plain and right: the prelude declares the seven, and no `QQ`. It grew by 16 characters. No line.

**C19 and C23, F-388** (1334 to 1298).
- Changed: "each object's class extends the abstract payload class `compiler/runtimeValues/F<T>`" now reads "Each object's class extends the abstract payload class `compiler/runtimeValues/F<T>`, such as `FZZ32`"; "Descriptors, stamped instances and ..." now reads "Descriptors, the names of generic instances and ..."; "while the RTTI's class stays the object's" now reads "; the RTTI's class stays the object's"; the sentence "a dotted call casts its receiver to the object's class" is removed; "`F<T>.make` reaches the object's class's `make` by the name that `LibraryNames` gives, for the prelude only (the one library's seven have no rows yet, fork N4)" now reads "`F<T>.make` makes a value by the object's class's `make`, found by the name that `LibraryNames` gives, for the prelude only: the one library's seven are not yet compiled over payload classes"; the tests are named once with their folder.
- Meaning: unchanged. Row 1081 is `CONTESTED`: the entry states today's refusal and names no reading of the specification, as before.
- Moved out first: the receiver's cast, to the report's section (question 4).
- Past 600: the naming by the payload class keeps its place by question 2 (without it a reader misreads the refusals that follow); the four consequences by question 1.

**C20 and C24, F-389** (1303 to 1213).
- The title: "A function expression's class, and a local function's, is named by its component and source span; ..." now reads "The code generator names the class of a function expression or a local function by its component and its source span, and ...".
- The body now lists the three forms that share a span, then says that the thunk or the wrapper is met first and keeps the plain name. "On the one library this lets `LexicographicOrder` be emitted" now reads "So F-34's measure emits the one library's `LexicographicOrder`".
- Meaning: unchanged.
- Moved out first: "three at one span take `#2` and `#3`" and the generic class file's name `...#k⟦⟧`, to the report's section (question 4).
- Past 600: question 2 keeps the forms that share a span (without them a reader cannot tell when `#2` appears). Question 1 keeps the sentence on compiles and hash modes (a worker who compares class names across compiles would do otherwise). Question 1 also keeps the `LexicographicOrder` sentence and the tests.

**C21, C25 and C39, F-390** (1488 to 1520).
- Changed for form: the array's place ("made at the call or in a dispatch method's branch") moves to its own sentence, with the condition; "a call goes to the dispatch method of its arity ..." now reads "A call reaches the declaration by the specification's expansion rule"; "the selection" now reads "the selection of the one library (F-381)".
- Changed for C39. Old: "So under the selection varargs no longer stands on a program's path (`println`, `assert`); no program runs on the one library yet (row 1062)." New: "By reading, a run under the selection would fail at the array: each index is made by `FZZ32.make`, which raises an `Error` there (F-388). So under the selection varargs compiles on a program's path (`println`, `assert`), and no run shows it, since no program runs on the one library yet (row 1062)."
- Meaning: changed by C39, from its ground (the review, section 2, G.worker.1; `CodeGen.java:7900-7905` and `LibraryNames.java:30-45`, both read): the old sentence held for the compile only.
- Moved out first: the factory `__immutableFactory1` and the five tests' names, to the report's section; the descriptor of `init`, to the review's G.worker.1 (question 4).
- Past 600: grown by 32 over AT, the clause that C39 owes. The two stops under the selection keep their place by question 1.

**C22 and C26, F-391** (1248 to 1243).
- The title: "...so a method of an imported api's trait is found by its api, and no compiled test reaches the trait table's search by the prelude's names." now reads "...so a method of an imported api's trait is found by its api." The search's clause moves to the body: "The trait table's search by the prelude's names stays, and no compiled test reaches it."
- "...a call at an assumption runs the trait's body, also over an object's override (`CodeGen.hasBodyInItsTrait`), except a method of a generic trait whose parameter has the trait's type parameter, where the code generator stops (row 1088)" now reads "A call at an assumption runs the assumed trait's body, also where the object overrides it (`CodeGen.hasBodyInItsTrait`). The code generator stops where the trait is generic and the method's parameter has the trait's type parameter (row 1088)."
- Tests are named without `.test`, as F-338 names its test.
- Meaning: unchanged. The title held two facts.
- Past 600: question 2 keeps the two mechanisms (`gatherMethods`, `nameBySelfType`), since the forms that compile follow from them. Question 1 keeps the forms that compile, the body that a call at an assumption runs, the stop of row 1088 and the untested search. The test list stays, as each fact entry names its tests.

## FACTS: made false or stale by the landing

**C33, F-34** (2215 to 1957).
- The title: "on the code of `d3747846c1`, the code generator refuses 13 declarations ..., in 4 kinds, all of them declarations that the checker passes" now reads "on the code of `ba3c7c876d`, the code generator refuses 1 declaration ..., a declaration that the checker passes".
- The body. Old: "Then: 13 refused, 745 emitted, no component failure. By kind: 'Can't compile VarArgs yet' 9 (row 624); a closure class written twice 2 (row 315); `Stream`'s `WriteStream`, ... 1 (row 624); and a generic method called on a receiver typed by a type variable 1, `FortressLibrary`'s `__bigOperator2` (row 1076). On the code of `c3b16ef2d1` the count was 17 in 5 kinds, with 742 emitted (its file prints 18, ...). Since then the kind environment's repair (F-384) has let ... ; `__bigOperator2` passed the kind environment and stops at row 1076." New: "Then: 1 refused, 753 emitted, no component failure. The one refused declaration is `FortressLibrary`'s `__bigOperator2`, a generic method called on a receiver typed by a type variable (row 1076). On the code of `d3747846c1` the count was 13 in 4 kinds, with 745 emitted; the other 12 stopped at varargs (row 624) or at a closure class written twice (row 315), and both rows are fixed since (F-390, F-389). On the code of `c3b16ef2d1` the count was 17 in 5 kinds, with 742 emitted."
- "Measured once." now reads "Measured once on each code." The Detail gains `compile-ladder/plan-33/probes/measure-ba3c7c876d.txt` first.
- Meaning: changed by its ground (the measure on the landed code, `measure-ba3c7c876d.txt:1`, committed `3fbce96856`; the review, section 3). The caveats stay: the patch for row 874, a declaration counted at its first wall, the dispatch methods skipped, no emitted class run.
- Moved out first: the file's 18 and how the count went from 17 to 13 (F-384, F-386), to the history (question 3).
- Past 600: F-34 owns this count, so the setting, the patch and the caveats keep their place by questions 1 and 2.

**C34, F-352** (2184 to 2216).
- Old: "rows 81, 990, 991, 732 and 992 are fixed since, and rows 624 and 315 stand." New: "rows 81, 315, 990, 991, 732 and 992 are fixed since, and row 624 under the selection of the one library (F-390)."
- Old: "(rows 874, 995 and 866); the trait table's search by the prelude's api names (row 942);" New: "(rows 874 and 995; for the seven number types it is built and row 866 is fixed, F-388); the trait table's search by the prelude's api names (row 942, fixed since; the search stays, and no compiled test reaches it, F-391);".
- Meaning: changed by its ground (rows 315, 624, 866 and 942 closed; row 995 narrowed; the batch file, "For the record-landing workflow").
- Moved out first: the checker's timing for one program, to `model-closure-check.md` section 4, which the Detail names (question 4).
- Past 600: grown by 32 over AT, the clauses owed.

**C35, F-136** (1642 to 1688).
- Old: "Generic dotted methods (row 495), and a generic declaration beside a plain one reached through an argument of static type `Any` (row 496), still die with `ClassCastException`. They die on an arm's static parameter left unrewritten, or on `ZZ32`, which the run time spells `…runtimeValues|FZZ32` and static code `fortress|CompilerBuiltin%ZZ32`."
- New: "Generic dotted methods (row 495), and a generic declaration beside a plain one reached through an argument of static type `Any` at a program's object (row 496), still die with `ClassCastException`, on an arm's static parameter left unrewritten. At `ZZ32` the second form runs, since the run time and static code now name the type alike, by its payload class (F-388; `compiler_tests/GenericBesidePlainZZ32.test`)."
- Meaning: changed by its ground (the review, "Corrections owed"; row 496 rewritten).
- Moved out first: "two expected failures" of row 499, which the row names (question 5).

**C36, F-353** (1625 to 1686).
- Old: "The second set's sources equal the first's under a map of eight names, since the classes differ only in the generated classes that they extend." New: "There the second set's sources equal the first's under a map of eight names, since the classes then differed only in the generated classes that they extend."
- Old: "`main` has its own selector (F-381) and one set of run-time classes." New: "`main` has its own selector (F-381) and one set of run-time classes; its seven number types need no second set, since their run-time classes are payload classes over `FValue`, under the object classes that the code generator writes (F-388)."
- Meaning: changed by its ground (the batch file and the review: "the second set, which the numbers no longer need"; `FZZ32.java:22`).
- Moved out first: the build's compile times, to `probe-y.md` section 5, which the Detail names (question 4).

**C37, F-181** (1641 to 1636). Old: "except in the four forms that F-320 names." New: "except in the forms that F-320 names." Meaning: unchanged in reach; F-320 now names three refused forms and a fourth that compiles under the selection.

## POSITIONS

**C40, P-33** (1910 to 1862). Not cut only.
- Old words: "one build serving both by a second set of the run time's value classes (F-353),". New words: "one build serving both (F-381),".
- The decision, before and after: the rest of phase 4 takes microGPT's slice first. Its reach, before and after: the rest of phase 4, the switch-over. Its requirement, before and after: the compile command selects the one library beside the prelude, one build serving both, so that each wall that only the one library shows is met as one rung with its own test on `main`; the move of the compiled tests and the prelude's deletion come last. Only the means that the tree made false is gone: the second set of value classes. F-381 shows one build serving both, with one set of run-time classes.

**C41, P-178** (1544 to 1542). Not cut only.
- Old words: "and the compiler prelude's open trait lets a program's object extend `ZZ32`, which a bare `int` cannot hold (row 866, such a program compiles and dies when it runs)." New words: "and the compiler prelude's open trait let a program's object extend `ZZ32`, which a bare `int` cannot hold (row 866, such a program compiled and died when it ran)."
- The decision, before and after: each built-in number type is one `value object` under its own name, and walk's native number objects go. Its reach, before and after: both paths, before the switch-over, the prelude by an exception to P-37. Its requirement, before and after: the same. Only the tense of one reason changed: the reason held when he decided, and row 866 is fixed.

## The gap ledger

**C44, a new row** (`rows.add`, section 12, number given by `ledger.py add`).
- Claim: "on the compiled path under the compiler's prelude, a comparison of two strings at an assumption of `String` answers `false`: `("ab" asif String) < ("cd" asif String)` runs the prelude's placeholder `opr <(self, b: String): Boolean = false`".
- Status `NEGATIVE-VERIFIED`: the specification orders strings lexicographically (`basic/operators/opr-overview.tex`, "Comparisons Operators", read at `:302-305`), and the skeptic's run confirms the answer. Class `implementation gap (prelude)`. Reproducer `none`, with the program and its output in the notes, until the compiled `XXX` test is written (C111). Found by: climb batch 33b rung R's skeptic.
- Notes: the six placeholders at `CompilerBuiltin.fss:393-398` (read), the call's path since rung R (F-391), the old and the new output, and "Until the switch-over (P-38)".

**C45, row 546.** Old: "The same family as functional methods passes the checker and its run dies (row 566); walk runs it, `tag(s) = 3`." New: "The same family as functional methods runs (`ComprisesMeetGenericTrait.test`; row 566); walk runs it, `tag(s) = 3`." Meaning: changed by its ground (row 566 fixed `75f9f2fbf`); the row's claim on the function form stands. Notes 684 characters.

**C46, row 604.** Old: "Codegen: row 624." New: "Codegen: F-390." Meaning: changed by its ground (row 624 fixed under the selection; F-390 holds both the compile under the selection and the refusal against the prelude). Notes 693 characters, so the pointer is the shortest form.

**C47, row 1017.** Old: "(compiled: row 624)". New: "(compiled: F-390; under the selection it does not run, row 1062)". Meaning: changed by its ground (F-390; row 1062). Notes 671 characters.

## Decisions not taken

- P-33: the review proposed longer words, "one build serving both (F-381): the seven number types by the run time's payload classes, over which the code generator writes each library's number objects (F-388), and each other carried type by its own rung (review-queue item 521)". I did not take them. The alternatives: (a) my fewest words, landed here; (b) the review's words. Against (b): an entry holds no review-queue item (`record.md`, "What an entry is"); "each library's number objects" says more than the tree holds, since the one library's seven are not yet compiled over payload classes (F-388); and "each other carried type by its own rung" adds a requirement that he has not given.
- F-34: I kept `c3b16ef2d1`'s 17 in 5 kinds as an earlier figure, as the review asks. The alternative was to move it to the history with how the count fell to 13.
- F-391 and the new row: the assumption's call now runs the prelude `String`'s placeholder (C44). F-391 does not name it, since `owed.md` routes it to the row alone. The alternative is a clause in F-391 that points to the new row once it has a number.

## Questions for the curator

- P-33: do you want its sentence to name how the one build serves both libraries, as the review proposed, or only that it does, as it now reads?

## What I could not follow

- I could not run `python3` or `record.py` in this session: each needs an approval that a headless session cannot give. So I checked the copied text by a word diff of each entry against the record. `checks.sh` applies the files and runs the checks.
- `rows.add` is not named in my brief, but `checks.sh` reads it for a new row. I wrote C44's row there.

## The fix round

Each failure of `check.md` in my homes is fixed with the correction that `check.md` gives, unless said otherwise. The sizes are new, in characters, against AT.

- **C20, F-389** (fidelity): "Closures share a span in three forms" now reads "Closures share a span in these forms". Meaning: back to the source's, which lists the forms found and claims no others. From the cold read: the conditional operator gets an example, `OR:` (`Specification/basic/operators/opr-overview.tex`, "Conditional Operators"); the binding `if` gets its form, `if x <- m then ... else ... end` (the skeptic's section, "3. My programs"); "another hash mode" now reads "another identity-hash mode, such as `-XX:hashCode=0`" (the report's section 4). 1300 characters.
- **C22, F-391** (fidelity): "The code generator stops where the trait is generic" now reads "The code generator stops at such a call where the trait is generic". Meaning: back to row 1088's condition. 1258 characters, 10 over AT, the correction's words.
- **C23, F-388** (form): the Detail now also names "Each place that names a payload object's type (a point to report)", which holds the receiver's cast that moved out. From the cold read: the rows 1081 and 1082 are no longer listed under "So". They now follow in their own sentence: "Two forms do not compile: a `typecase` clause at such a trait over a number, refused as unreachable (row 1081), and a number type named as a value, such as `x: Object = ZZ32` (row 1082)". The example is row 1082's own. The tests lose their `.test`. 1394 characters, 60 over AT: the Detail's section and the example. Meaning: unchanged.
- **C24, F-389, and C26, F-391** (form): the report now names the questions that keep each sentence (above, in each entry's block).
- **C25 and C39, F-390** (form and fidelity): the Detail adds "`reviews/batch-33b-review.md`, section 2, G.worker.1". The sentences are in the ground's order: "So under the selection the library's varargs declarations that a program reaches, such as `println` and `assert`, compile. By reading, a run there would fail at the array, since the index of each element is made by `FZZ32.make`, which raises `LibraryNames`' `Error` under the selection (F-388); no run shows it, since no program runs on the one library yet (row 1062)." From the cold read: "a program's path" is now the library's declarations that a program reaches, and the spread argument gets its form and "without a message" (row 1085's claim and the review's finding 3). 1678 characters, 190 over AT: the clause that C39 owes, the Detail and the cold reader's two clarifications. Meaning: as in round 1.
- **C30, F-320** (form): the report names the clause and its question (above). From the cold read: "Under the switch-over's setting, measured once on `dbf4825e0`'s code, ... by the probe of F-34 on that code" now reads "By F-34's measure on `dbf4825e0`'s code, taken once, ...", since the setting is F-34's. 1518 characters. Meaning: unchanged.
- **C34, F-352** (fidelity): "(rows 874 and 995; for the seven number types it is built and row 866 is fixed, F-388)" now reads "(rows 874 and 995, row 995 now for the carried types other than the seven number types; row 866 is fixed; the one library's seven are not yet compiled over the payload classes, F-388)". Meaning: in a tree switched onto the one library, the seven number types are not built; the status word is gone. 2313 characters, 129 over AT, the clauses owed.
- **C36, F-353** (fidelity): "under the object classes that the code generator writes (F-388)" now reads "under the object classes that the code generator writes for the prelude; the one library's seven are not yet compiled over them (F-388)". Meaning: the prelude's condition is back. 1758 characters, 133 over AT, the clause owed.

From the cold read, in entries that passed the check:

- **F-34**: the reader counted three kinds where the entry says 4. Now "the other 12 stopped at varargs, in two kinds (row 624), or at a closure class written twice (row 315)" (varargs 9 and `WriteStream` 1, two kinds). The reader asked why the sums differ. A new sentence says: "The sums differ from code to code, since the earlier files also counted as emitted an object that its pre-pass refused" (the review, section 3: "the four objects refused in the object pre-pass were already counted as emitted by the earlier file"). 2092 characters, under AT's 2215.
- **F-86**: the reader could not tell whether F-86's refusal and F-320's 'Can't compile VarArgs yet' are one message. Now "refuses a varargs declaration with 'Can't compile VarArgs yet', naming the missing type" (row 624's notes quote the message). The tests' sentence is shorter to keep the size. 911 characters.
- **F-136**: "At `ZZ32` the second form runs" now reads "Where the argument is a `ZZ32`, the second form runs". 1710 characters, 68 over AT, the clause owed.

The cold reader's other passages keep their wording. They are in text that this landing did not change, or the source is not in this run's evidence:

- F-34's "the bound `Any`", F-128's "a tuple-typed field", F-301's "the library's form and the prelude's", F-302's depths, F-315's `test` method and "the library's own constructor", F-320's "before the body runs", F-352's "sixteen walls", F-136's "as before the change" and "For template dispatchers both are fixed", F-353's "thirteen" classes and "eight names", F-181's "opens its value to the size", and P-33's and P-178's open words. P-33 and P-178 change only by the curator's rule.
- These are concepts that the skill does not define, for the skill writer: the arrow coercion, the tuple coercion with varargs or keyword elements, a spread argument, a template dispatcher and its arms, the springboard and a trait's static body, the RTTI and `className()`, the trait table and its search by the prelude's names, the special arrow of a functional method, `dumpMethodChaining`, a conditional operator, a binding `if`, and the hash modes.

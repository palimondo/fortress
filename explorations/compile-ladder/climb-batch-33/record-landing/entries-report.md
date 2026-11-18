<!-- The entries writer's report for climb batch 33's record-landing, run 1: each change of owed.md with writer "entries", its old and new words, its meaning, its size, and the questions for the curator. -->

# The entries writer's report, climb batch 33, run 1

The whole old line of each entry is its "Now" line in `entries.md`, or the `facts-extract.sh` output for F-34 and P-12. The whole new line is in `record.apply`, and alone in `clean.txt`. Below, each change gives the sentences that changed, old and new. Sizes are in characters.

## The pass and the size changes

**C1 and C44, F-9 (745 to 694).**
- Old: "`Shell.java` calls `useCompilerLibraries()` for the command, which reads the one library where `FORTRESS_LIBRARY=one` selects it (F-381), so that under the selection `f(i: Index)` passes it (row 69)."
- New: "`Shell.java` calls `useCompilerLibraries()` for the command, which follows the selection (F-381); under it, `f(i: Index)` passes the check (row 69)."
- Meaning: unchanged. The title already names the selection, so the body names it once by a pointer.
- Past 600: question 1 keeps P-12's sentence and the three reasons that walk cannot run the checker; question 2 keeps the selection's clause in the title.

**C2, C4, C5, C9, C10, C11, C14 to C17, C19 to C24, C30 to C32, C43.** Writer "none". No line.

**C3, F-76 (1672 to 1631).**
- Old: "runs on the conjunct that has the checker's chosen declaration (`compiler_tests/CoverageReturnMethodCall.test`)".
- New: "runs on the conjunct that has the checker's chosen declaration (F-386)".
- Meaning: unchanged. F-386 holds the rule and both tests.
- Past 600: no growth; the entry stays as the batch left it otherwise.

**C6, F-175: keep.** "Appendix I names four places" matches `changes.tex`: the Effect's three ways at `:3740-3746` (rows 543, 546, 547) and row 487 at `:1674-1677`. Row 540's sentence is gone. Every check passes.

**C7, F-181 (1695 to 1641).**
- Old: "the code generator compiles it (row 812, fixed; F-384; `compiler_tests/ComprisesWhereMemberCompiled`)."
- New: "the member compiles too (row 812, fixed; F-384)."
- Meaning: unchanged. F-384 names the test.

**C8, F-225 (2676 to 2687).**
- Old: "F-377 gives the cast that does it, also at a conditional's arm, the shape of `StandardTotalOrder`'s `MIN` and `MAX`, and at a closure's result (rows 1051 and 1050, fixed). A default body that calls a method on a value of the self-type parameter runs, also where the object lists the trait first (row 1052, fixed; F-385)."
- New: "F-377 gives the cast that does it, also at a conditional's arm (`StandardTotalOrder`'s `MIN` and `MAX`) and at a closure's result (rows 1051 and 1050, fixed). A default body that calls a method on a value of the self-type parameter runs, also where the object lists the trait first (row 1052, fixed); F-385 gives how, and the generic object for which it may not hold."
- Meaning: narrowed in scope by consistency with C56. The old sentence let a reader conclude that every object that lists the trait first runs. The review's section 2, Q2, finds by reading that a generic object may not.
- Past 600: it grew by the pointer's clause, which question 2 keeps. Question 1 keeps the sentence on the prelude's spelling, `comprises T`, past 600 characters. Its dates and commits of Steele's are the evidence that the team changed the spelling, and so the reason why that spelling does not bind the one library. Without it, a worker could take the prelude's spelling as the self type's rule. To make room, I moved out the demo's line `ProjectFortress/demos/trips.fss:96` (question 4; row 710 holds it) and the words "the shape of".

**C12, F-281 (1547 to 1529).**
- Old: "the code generator compiles such a program where a listed generic type gives a member's body too (row 812, fixed; F-384)."
- New: "such a program also compiles where a listed generic type gives a member's body (row 812, fixed; F-384)."
- Meaning: unchanged.

**C13 and C53, F-282 (2801 to 2455).**
- Old (rung C's sentence): "It matches a top-level variable by its type, its modifiers other than `var`, and its mutability, which `var` or `:=` gives (`ExportChecker.scala:232-236`; `compiler_tests/TopLevelVarByAssignExport`)."
- New: "It matches a top-level variable by its type, its mutability, which `var` or `:=` gives, and its other modifiers (row 1028, fixed; `compiler_tests/TopLevelVarByAssignExport`)."
- Moved out first (question 4, a list of sites): the list of the api's restated members (`Array2`'s subscripts, `TotalComparison`'s `=`, `RR64`'s `^`, `Condition`, `Maybe`, `Just`, `ActualReduction`, `BigReduction`, `Comprehension`, `DelegatedIndexed`, `Array3`'s `bounds`) and the left-out subscripts' names. The rung-export-align and rung-export-last reports that the Detail names hold them. One example stays, `RR64`'s `truncate` at `ZZ64`. The Detail gains rung C's report, item 4.
- Meaning: unchanged.
- Past 600: questions 1 and 2 keep the matching rules and the test list, which is the gate.

**C18 and C45, F-293 (661 to 640).**
- Old: "and the one library's where `FORTRESS_LIBRARY=one` selects it (F-381)."
- New: "or the one library's under its selection (F-381)."
- Meaning: unchanged. `Shell.java:377-388` calls `WellKnownNames.useFortressLibraries()` under the selection, read at `d3747846c`.
- Past 600: question 2. Without the clause, a reader takes the prelude's imports as the only default. It is shorter than the batch's clause.

**C25, F-352 (2160 to 2184).**
- Old title end: "on `main` the compile command selects the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381)."
- New: "on `main` the compile command reads the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381)."
- Old: "Measured once; nothing landed, and no test holds it." New: "Measured once; nothing of the scratch tree landed, and no test holds its runs."
- Meaning: unchanged. Since the selector landed, "nothing landed" could be read as false of `main`.
- Past 600: question 2 keeps the bound on "nothing landed".

**C26, F-353 (1611 to 1648).**
- Old: "`main` has the selector (F-381), one set of run-time classes, and no second set. Nothing landed, and no test holds it."
- New: "`main` has its own selector (F-381) and one set of run-time classes. Nothing of the scratch tree landed, and no test holds its runs."
- Meaning: unchanged. The `main` selector and the scratch tree's selector are kept apart, as `owed.md` asks.
- Past 600: question 2.

**C27, F-361 (1526 to 1539).**
- Old: "and rows 998, 997, 542, 550 and 959 are fixed: such an arm is refused (F-382)."
- New: "and rows 998, 997, 542, 550 and 959 are fixed; an arm at a removed name is refused (F-382)."
- Meaning: unchanged. The colon tied the refusal to all five rows.

**C28, F-363 (1874 to 1881).**
- Old: "so a subscript, a parenthesised item or a tight identifier after a dotted method call parses too, which no test asserts but `compiler_tests/SubscriptThenSuperscriptCompiled`, for the subscript, compiled (`Maker.f()[5]^2`); the one node kind it builds ..."
- New: "so a subscript, a parenthesised item or a tight identifier after a dotted method call parses too; of these, one test compiles a subscript, `Maker.f()[5]^2` (`compiler_tests/SubscriptThenSuperscriptCompiled`). The one node kind that the parser builds ..."
- Old: "`x[5]^2` or `B.f()[5]^2`, compiles and fails under walk (row 1)". New: "... compiles (F-387) and fails under walk (row 1)".
- Meaning: unchanged.

**C29, F-369 (1869 to 1875).**
- Old: "A local tuple binding's declared name beside untyped names is checked in the same way (`Decls.scala:431-443`; `compiler_tests/LocalTupleBindingMixedTypes`, `LocalTupleBindingMixedRefused`)".
- New: "The checker checks a local tuple binding's declared names beside untyped names in the same way (row 1029, fixed; `compiler_tests/LocalTupleBindingMixedTypes`, `XXXLocalTupleBindingMixedRefused`)".
- Meaning: unchanged. The refusal test is the `XXX` `.test` beside `LocalTupleBindingMixedRefused.fss`. The line numbers go to rung C's report (question 4).

**C33, C52 and C57, F-377 (2812 to 2469).**
- Moved out (question 4): the cast sites' member names, `evalArg`, `forExprsSerial`, `generateActualMethodCode`, `forIf`, `forFnExpr`, `localFunctionClosure`; both Detail reports hold them. The test list keeps its seven names without the repeated folder.
- Old (two sentences): "A conditional with no arm of self's type compiles as before; an arm that is `self` is cast at the conditional's own type, also where the conditional stands at the trait's type, which the verifier does not check (`atQ(...)` gains `checkcast R`)." and "One is added at a declared trait type strictly below self's trait, where the verifier, which checks no interface type, needs none; a worker chose it, and the curator has not decided it."
- New (one passage): "Two casts are added where the verifier, which checks no interface type, needs none: at a declared trait type strictly below self's trait, a planner's default; and at an arm that is `self` where the conditional stands at a trait type, as `atQ(c: Boolean): Q = if c then self else R(0, 0) end` gains `checkcast R`, a worker's choice beyond the plan. The curator has decided neither."
- Meaning: changed in one point, from C57's ground. The old line said "a worker chose it" of the trait-type cast. Review-queue item 571 names that cast fork K1 of climb batch 31's record, a planner's default. The arm's cast at the conditional's own type is the rung's, beyond fork Q1's words "the declared type" (the review, section 2, Q1). The choice stays open in item 571.
- Past 600: questions 1 and 2 keep the sites, the examples, the open shapes (rows 1070, 307, 1053) and the two casts.

**C34, F-379: keep.** "a typecase arm at one of those names is refused on both paths, 'Int is undefined.' (row 959, fixed; F-382)" states the landed refusal with its message and its owner. Every check passes.

**C35, F-380 (1339 to 1355).**
- Old: "a numeral that ends a block after a local declaration or a local function takes its default, a tuple's elements theirs (`Functionals.scala:1290-1294`, `:1332-1333`); a `try` that ends in numerals keeps a numeral type and is refused (row 1074), and a `case` or a `try` whose branches are numeral tuples, at an untyped tuple binding, is refused (row 1075)."
- New: "a numeral that ends a block after a local declaration or a local function takes a numeral's default type, and so does each numeral element of a tuple there (row 1060, fixed). A `try` that ends in numerals keeps the numeral's own type there and is refused (row 1074), and so is a `case` or a `try` whose branches are numeral tuples at an untyped tuple binding (row 1075)."
- Meaning: unchanged. The line numbers go to rung C's report (question 4).

**C36 and C46, F-381 (1034 to 942).**
- Moved out (question 4): `WellKnownNames.compiledPathUsesOneLibrary`, the compiler's copy of the flag, and the two tests' failing messages on the base. The Detail gains the rung's section on its tests.
- Meaning: unchanged.
- Past 600: question 1 keeps the run's failure (row 1062), the class path scripts' rule and the test track.

**C37 and C47, F-382 (1136 to 1103).**
- Old title: "is refused when names are bound, on both paths: 'X is undefined.'". New: "is a static error on both paths, 'X is undefined.'".
- Old: "is the team's binding form and binds (row 1064)". New: "is the team's binding form and binds, so under walk an undefined name there takes a value of every type (row 1064)". The added words are row 1064's claim, which is of walk; compiled, the checker refuses such an arm as unreachable.
- Moved out (question 4): the members `forTypecaseClause` and `handleTypeName`. The six tests stay, walk's three and the three compiled ones by their file names, two of them `XXX`: they gate the refusal on both paths.
- Meaning: unchanged. The tuple sentence stays a fact and names no reading of the specification.
- Past 600: question 1 keeps `x: Any =>` and the tuple form.

**C38, F-383 (526 to 567).**
- Old title: "Walk's harness counts a static error of the phases as a refusal at load, so a `.test` with `load_` keys names a refusal of the disambiguator as one of walk's load check."
- New: "Walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load, so a walk `.test` whose `load_` keys expect a refusal at load passes on such an error that its keys match."
- Meaning: unchanged. The condition "that its keys match" is `FileTests.java:491-493`, `refused = atLoad && unmet == null`. `FileTests.java:869-878` read at `d3747846c`.

**C39 and C48, F-384 (1487 to 1322).**
- Moved out: the three `CodeGen.java` line ranges (question 4), and rung V's own measure, 15 refused in 5 kinds, to F-34 (question 5).
- Old: "since row 540's repair such a call compiles (F-386), and no test calls one on a tuple pattern's name, the form of `app`'s arms 2 and 3. On rung V's own code F-34's measure finds no refusal at the kind environment (...); it is not taken on the merged tree."
- New: "A method call on a name typed by an intersection compiles by F-386's cast; no test calls one on a tuple pattern's name, the form of `app`'s arms 2 and 3. F-34 gives the code generator's measure on the one library since this repair."
- Meaning: unchanged. F-34 now holds "not measured on the landed tree".
- Past 600: question 1 keeps the three repairs, the forms that now compile, the open form of `app`'s arms 2 and 3, and row 1067's failure; question 5 keeps the pointers to F-386 and F-34 in place of their text; the three test names are the gate.

**C40, C49 and C56, F-385 (868 to 1278).**
- Moved out first (question 4): `MethodInstantiater.java:268-272`, `:304`, and the clause "it loads the class only where it finds no class file", which the new sentence on generated classes says.
- Added: "Two limits, by reading, neither measured nor held by a test. The read keeps no cache, unlike the loader's lookup of generic expansions beside it, so each such call site of each expansion reads a class file. A class that the loader generates, such as a generic object's, has no class file, so the loader loads it as before, and a generic object that lists a self-typed trait first may still fail as row 1052 did."
- Meaning: extended, from the review's section 2, Q2, and "Corrections owed in the record".
- Past 600: question 1. The speed phase needs the first limit; a worker who writes a generic object of this shape needs the second.
- Left out: the review's Part 5, item 1, that the read first meets generated classes at the first run on the one library. It is a plan for the batch after, not a fact of the entry.

**C41, C50 and C58, F-386 (1163 to 1433).**
- Old title: "an intersection that none of its conjuncts lies below". New: "an intersection in which no conjunct lies below the others".
- Moved out (question 4): "whose call has no arrow" and `Library/FortressLibrary.fss:1489`.
- Added: "Where the conjuncts are two instances of one generic trait, as `List[\E\] ∩ List[\T\]` in the one library's `app`, the choice changes no answer, by reading: no type extends two instances of one generic trait (P-43, the exclusion rule), so such a value exists only where `E` and `T` are one type; no test calls such a method."
- Meaning: extended, from the review's section 2, V.worker.2. The review names P-43 and P-97; P-43 is the rule, P-97 the specification's examples, so the entry names P-43.
- Past 600: question 1. Without the reading, a reader takes the "first in order" fallback as a hazard at `app`.

**C42 and C51, F-387 (762 to 750).**
- Moved out (question 4): `Operators.scala:313-321`, `:360-362`. The Detail names item 2.
- Meaning: unchanged.
- Past 600: question 1 keeps the three forms and walk's workaround.

## The other changes

**C54, F-34 (2360 to 2645).**
- Old title end: "...in 5 kinds, all of them declarations that the checker passes; the count can be taken only on a patched tree."
- New title end: "...in 5 kinds, all of them declarations that the checker passes; on the code of `d3747846c1` the count is not measured, and 12 to 14 are expected; the count can be taken only on a patched tree."
- New in the body: rows 822, 812 and 540 are "fixed since"; the counter now counts each declaration once; each repair's own run, 15 in 5 kinds on `18d5b51578` and, counted once, 16 in 4 kinds on `e0a5274db2` (the run printed 17, with `ArrayList` counted twice); by reading, on the landed code, the 12 that stand, the three emitted, and `app` and `__bigOperator2` past both walls with what stands behind them not known. The Detail gains the review's section 3.
- Moved out first: the patch's changes (rows 942 and 993) to `PROBES.md`, which the Detail names (question 4); row 819's sentence and the second wall behind `ArrayList`, which is fixed, to the measure's file (question 4); the earlier measures on `7858d0e97b` and `832f7d0d91` to the history block (question 3).
- Meaning: extended to the landed code, from the review's section 3. The 17 on `c3b16ef2d1` stands. The figure after the landing waits for the measure (C159).
- Past 600: question 1 for the patch's need, the kinds, the expected range and the limits of the measure.

**C55, F-302.** Old: "not measured, since nothing compiles against the one library yet". New: "not measured, since nothing on `main` runs against the one library yet". Meaning: unchanged; the reason now matches the tree (F-381, row 1062). "on `main`" keeps it apart from F-352's scratch tree, where three programs ran.

**C59, P-12 (736 to 780).**
- Old: "Today `fortress typecheck` checks a program only against the compiler's prelude, so it is no check of walk's programs (F-9 holds this fact)."
- New: "Today `fortress typecheck` checks a program against the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library, so by default it is no check of walk's programs (F-9 holds this fact)."
- Not cut only: it drops "only" and adds the selection's clause and "by default".
- The decision, before and after: after the switch-over, walk runs the compiled type checker on its programs, and then uses the static coercions that the checker inserts. Unchanged.
- Its reach, before and after: walk's programs, after the switch-over; walk is not changed for this before it. Unchanged.
- Its requirement, before and after: walk gains the checker's static types and uses its coercions, in place of its choice on the run-time value (P-59). Unchanged.
- It lands under the curator's rule of 2026-10-31, as a sentence that the tree made false.

**C61, row 1052 (`rows.rewrite`).** The notes gain, before "full text": "by reading, not run: a class that the loader generates, such as a generic object's, has no class file, so the loader loads it as before, and a generic object that lists a self-typed trait first may still meet the circularity; no test holds it (F-385)". The status stays FIXED.

## The fix round

From `check.md`:
- C8, F-225: the question that keeps the sentence on the prelude's spelling is named (question 1). The text is unchanged.
- C26, F-353: "On `main` the compile command has its own selector" became "`main` has its own selector", as the check gives it. The selector also sets the run's class path, and the run-time classes are the build's.
- C37, F-382: "so under walk an undefined name there takes a value of every type", since row 1064 is of walk.
- C38, F-383: "passes on such an error that its keys match".
- C47, F-382: the three compiled tests are named by their files again.
- C48, F-384: its "Past 600" line is added.
- C54, F-34: "and, counted once, 16 in 4 kinds".
- C57, F-377: "where the conditional stands at a trait type". In `atQ` the conditional's own type is `R`; the trait type `Q` is its context.

From `cold-read.md`, in the sentences that this run wrote:
- F-9: "under it" read two ways; now "under the selection".
- F-302: "nothing runs against the one library" clashed with F-352's scratch tree; now "nothing on `main` runs".
- F-380: "there" read two ways; now "At such a place, a `try` that ends in numerals ...".
- F-282: "the other members that the Detail's first two reports list" did not say which members; now "the other members that the api restates at the component's headers, which ...".

The cold reader's other passages are in text that the batch or earlier passes wrote, and no source of this run settles them. Each keeps its wording:
- "the bound `Any`" (F-34);
- "That narrower scope" and "a default" (F-76);
- "opens its value to the size" (F-181);
- "Containment", "bind" and "a default of the coordinator's" (F-225);
- F-245's full check (F-281);
- "contract" (F-282);
- "sixteen walls" (F-352);
- "the prelude's five" (F-353);
- "the compiler's library" against "the compiler's prelude" (F-9 and P-12).

Three are terms for the skill writer: "springboard" (F-302, F-385), "kind environment" (F-384) and "math items" (F-363, F-387).

## For the skill writer

- The selection's property alone, `-Dfortress.library=one`, breaks the run's pairing: the compile writes to `caches-one` and the run's class path reads `caches` (the review, section 2, S1). F-381 states only that the class path scripts follow the variable. The `fortress-repo` skill's build-and-caches part is the place for the warning (C149).

## Decisions not taken

- F-225: I kept the commit dates of Steele's `655e65d53` and `59fdeff62`. They are evidence of the team's spelling, not history of the record. Moving them out would shorten the entry; keeping them keeps the evidence in place.
- F-34: I kept "12 to 14 expected" in the title, as the review gives it. The other way: keep the title on `c3b16ef2d1` alone and put the expected range in the body only.

## Questions for the curator

- None of this run's changes needs his word. The cast choices in F-377 stay open in review-queue item 571.

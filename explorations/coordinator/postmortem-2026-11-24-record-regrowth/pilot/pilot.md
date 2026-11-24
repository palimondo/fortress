<!-- The pilot of the second FACTS consolidation: four entries (F-252, F-53, F-396, F-63) rewritten by the method of 2026-10-13, each with its old text, what was cut and where it lives now, its lengths, and the claims of the old text found unsupported or stale; for the curator's judgement of the form before the rest of FACTS is rewritten. Written 2026-11-24 by a worker of the coordinator. Nothing here is applied: `FACTS.md` and `FACTS-history.md` are unchanged. -->

# FACTS pilot: four entries rewritten

## The method and the measure

- The method is the one of 2026-10-13 (`../evidence/consolidation-of-october.md`), with its writer's brief: cut by default; the history and the reports already keep everything.
- Each sentence was asked the six questions of "What an entry is" (`.claude/skills/coordinator/references/record.md`), after the five worked examples (`process-engineering/record-rule-draft.md`, "Worked examples"). Below, "question N" is the N-th of those six.
- Each cut names where its text lives now, and a bounded grep checked that the place holds it. No cut text was left without a place, so no new history block is needed beyond the old line, which `record.py apply` copies word for word.
- The measure: the four new entries together under 2,400 characters (600 times four), and only one entry over 600, for a named question. The result: 2,388 together; F-252 alone passes 600 (its reason is under its lengths).
- Lengths are characters of the entry's line, as in October. "Without the evidence sentence" drops the one sentence that names the test or the source; it is marked in each new text with `<mark>`.
- Every test and file that a new text names was checked to exist (`ls`, `grep`).

| | old | new | new without the evidence sentence |
|---|---|---|---|
| F-252 | 4,330 | 769 | 689 |
| F-53 | 1,376 | 485 | 375 |
| F-396 | 2,363 | 538 | 450 |
| F-63 | 1,265 | 596 | 465 |
| together | 9,334 | 2,388 | 1,979 |

## F-252, walk's load check of two generic declarations

### New text

> - F-252 **Under walk, where the parameter-by-parameter check refuses two generic declarations (F-26 defines them), the load check judges them on their declared domains by the No Duplicates (F-274), Return Type (F-275) and Meet Rules.** Where the check finds them excluding only at one shared `T`, as parameter types `P[\T\]` and `Q[\T\]` do under `P[\T\] excludes { Q[\T\] }`, walk withdraws the exclusion, since one type can extend `P[\ZZ32\]` and `Q[\String\]`: that pair fails the Meet Rule. Walk's departures are in `fortress-repo`'s interpreter part, "What walk checks". <mark>Gated by `tests/GenericOverloadInstancesApartWalk` and `GenericBoundsMeetWalk`.</mark> Detail: section 1 of `compile-ladder/rung-walk-generic-pairs/REPORT.md` and of `rung-walk-overload-if/REPORT.md`.

### Old text

> - F-252 **Under walk, where the parameter-by-parameter check refuses two declarations with static parameters of their own, or one beside a generic trait's functional method that declares none of its own, the load check reads the pair again on its declared domains, by the No Duplicates, Return Type and Meet Rules.** A declaration with static parameters of its own is a generic function, a generic object's constructor, or a functional method that declares static parameters in a trait or object that has none. Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads, except a plain declaration inside an own generic's declared domain where the two lists differ only at object types, which it reads on the declared domains (F-375). It reads two generic functions of one name and one list of static parameters at one shared symbolic instantiation, and two instances of one generic object as two object types that cannot be extended, so they exclude. So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])`, with `trait P[\T\] excludes { Q[\T\] }`, excludes at one `T`, though a type that extends `P[\ZZ32\]` and `Q[\String\]` has both. Walk then reads such an exclusion again over the instances of each, and withdraws it where their instances do not exclude. Instances of one generic type exclude only where their static arguments cannot be equal. Any other exclusion stands where the two still exclude with their static parameters renamed apart. Or, read at the shared instantiation, it stands where every generic type that both extend forces their static arguments to be equal, since no type extends two instances of one generic trait: so `Array` and `ImmutableArray` exclude at every pair of instances through `ReadableArray`. A pair whose exclusion is withdrawn is read on its declared domains as a refused pair is. It reads a refused pair of two such declarations again, each over all its own instances, and loads the pair if it meets the three rules. An own generic beside such a functional method is read as two own generics, the trait's static parameters standing for the method's (F-318). A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274). F-275 holds the Return Type Rule. The parameter check does not find two instances of one generic type at different ground static arguments excluding, such as `Tg[\3\]` and `Tg[\4\]`, so two plain declarations so typed are refused (row 416). Two declarations with static parameters of their own so typed load where the reading of the whole parameter type finds the instances apart, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` loads and runs (F-155, F-258). For the Meet Rule, walk looks for a third declaration that covers the overlap only where, at each position, the two parameter types are equal, or one of them is a static parameter, or both are instances of one generic type whose static arguments match in the same way (row 539). This search reads a bound that names its own parameter from the declarations, so two such bounds meet, and unifies a symbolic size with a size parameter. A pair whose domains exclude when read whole also loads, where neither declaration has a `where` clause of its own (F-258; row 787). A pair with a varargs parameter is not read again and keeps the parameter check's refusal (F-257). At a call, walk compares a functional method of a generic trait or object on the instance that the call makes. F-253 gives the case of a generic dotted method, where one of the two declared domains can lie inside the other. Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk` and `GenericPairNestedBoundsWalk` (load and dispatch), and the expected failure `XXXOverloadExistentialMeetWalk` (row 539); for the withdrawal, as refusals at load, by `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk` and `GenericOverloadInstancesApartWalk`, and as programs that load, by `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest` and `GenericPairExcludesTogetherWalk`. Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5; `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", and section 9.

### What was cut, and where it lives now

- The title's second case, "or one beside a generic trait's functional method that declares none of its own", and the sentence "An own generic beside such a functional method is read as two own generics ... (F-318)": F-318, whose title states that reading. Question 5.
- The definition of a declaration with static parameters of its own: F-26, which gives the same definition ("A declaration has static parameters of its own if ..."). The new title points there. Question 5.
- "Walk's load check first compares two overloads parameter by parameter, and a pair that it finds excluding loads": `fortress-repo`'s interpreter part, "What walk checks", its first bullet. The exception for a plain declaration inside an own generic: F-375, whose title states it. Question 5.
- The two ways in which the check reads both declarations at one shared instance (one list of static parameters; two instances of one generic object read as object types that cannot be extended): `compile-ladder/rung-walk-overload-if/REPORT.md` section 1, "Row 373", its first two bullets. Question 4. The new text keeps the outcome and the example.
- The rules of the withdrawal (instances of one generic type exclude only where their static arguments cannot be equal; static parameters renamed apart; an exclusion that stands where a shared generic supertype forces the arguments equal, with the `Array` and `ImmutableArray` example): the same section, the first bullet after "Now, for two own generics" (`mayBeEqual`, `Apart`, `oneInstance`). Question 4. That no type extends two instances of one generic trait: `fortress-repo`'s `SKILL.md`, "Fortress as a language", and its revival part, "Dispatch and overloading". Question 5.
- "A pair that the parameter check orders is read again only for the No Duplicates Rule (F-274)" and "F-275 holds the Return Type Rule": F-274 and F-275, whose titles state them. The new title keeps both numbers beside the rules' names. Question 5.
- Row 416's sentence (`Tg[\3\]` beside `Tg[\4\]`): row 416, and the interpreter part's list of departures, which names it. Question 5.
- The `h` pair that loads and runs: F-155, which states it; the whole-type reading: F-258. Question 5. See finding 1.
- The narrow search of the Meet Rule (row 539): row 539's notes (`matchApart`), and the interpreter part's list of departures. Question 5.
- That the search reads a bound that names its own parameter from the declarations: `rung-walk-overload-if/REPORT.md` section 1, "Row 373", its last bullet (`meetParams`). That it unifies a symbolic size with a size parameter: `rung-walk-overload-if/SKEPTIC.md` section 2, "The defect of the change, and the fix" (commit `aa4b46d6e`). Question 4. See finding 2.
- The pair whose domains exclude when read whole, and the `where` clause that stops that reading (row 787): F-258, row 787, and the interpreter part's list of departures. Question 5.
- The varargs pair that keeps the parameter check's refusal: F-257, and the interpreter part ("Walk keeps the team's check and messages for the pairs below: a pair with a varargs parameter"). Question 5.
- "At a call, walk compares a functional method of a generic trait or object on the instance that the call makes", a second subject, of dispatch and not of the load check: F-26 ("So a functional method of a generic trait or object is compared on its instance"). Question 5.
- "F-253 gives the case of a generic dotted method ...": F-253, whose title states it, and F-26, which points to it. Question 5.
- Twelve of the fourteen test names: `rung-walk-generic-pairs/REPORT.md` section 2, which lists all fourteen, and `rung-walk-overload-if/REPORT.md` section 2. Question 4. The two kept are the withdrawal's test and a pair that loads under the Meet Rule.
- The detail pointers to `rung-walk-generic-pairs/REPORT.md` section 5 and `rung-walk-overload-if/REPORT.md` section 9: the reports keep them, and the history keeps the old pointer. Question 4.

### Lengths

Old 4,330; new 769; new without the evidence sentence 689.

Over 600: the second sentence, the withdrawal with its example, by question 1. Without it a worker who writes `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])` under `P[\T\] excludes { Q[\T\] }` expects the pair to load, as the parameter check alone would let it; walk refuses it, "fails the Meet Rule" (`tests/GenericOverloadInstancesApartWalk.test`). The pointer to the interpreter part's departures is kept by question 2: without it a reader takes the title for the whole of walk's rule.

### Findings

1. **The `h` pair has no test.** The old text says that `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` "loads and runs (F-155, F-258)". One walk run observed it, at `6f93de5d4` (`explorations/coordinator/coordinator-work-2026-11-05.md`, item 260). No file under `ProjectFortress/tests/` or `compiler_tests/` writes the pair (`grep -rln 'ZZ32,J\\]'`, nothing). F-155 and F-252 cite each other for it, and neither says that it was observed once. The section that the old text cites, `rung-walk-generic-pairs/REPORT.md` section 5, shows the same pair "refused, the same (row 416)": it predates the whole-type reading. F-155 now owns the claim, and should state its kind of evidence, or gain a test.
2. **A claim outside its cited sections.** "Unifies a symbolic size with a size parameter" is in none of the sections that the old text cites. Its source is the skeptic's fix of climb batch 16 (`rung-walk-overload-if/SKEPTIC.md` section 2, commit `aa4b46d6e`), gated by `tests/GenericSizePairNestedWalk.fss`.
3. **Pointers to repoint when this text is applied.** F-253 says "otherwise it compares them on the instance that the call makes (F-252)": that sentence moves to F-26, so the pointer should name F-26. F-155 cites F-252 twice: for the refusal of `Tg[\3\]` beside `Tg[\4\]` (now row 416 and the interpreter part) and for the whole-type reading (now F-258). F-27's and F-257's pointers to F-252 stay right.

## F-53, the distance to the switch-over and the checker count

### New text

> - F-53 **At the last landed gate, climb batch 36's, the distance to the switch-over and the checker count are both 0.** They count the compiled checker's errors in the interpreter's library: the distance over fourteen components, the count over `FortressLibrary` and its imported apis. A rise in either is reported and does not turn the gate red (P-39); F-66 gives what does. <mark>Source: `compile-ladder/climb-batch-36/gate/distance.txt` and `checker-count.txt`, '#total 0', '#crash none'.</mark>

### Old text

> - F-53 **At the last landed gate, climb batch 36's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

### What was cut, and where it lives now

- "distinct" and "and their apis", and the fourteen by name (twelve, and `List`'s two imports `CovariantCollection` and `OneShotFlag`): F-288, whose title and second sentence state them, and `explorations/coordinator/tools/distance/run.sh` (its header, "#total distinct errors", and its component list). Questions 5 and 4.
- "It runs every checker stage of each component whatever the earlier stages reported": `fortress-repo`'s compiler part, its glossary entry "distance stage". Question 5.
- "and classes the errors by root cause (F-54)": F-54, whose title states it and which cites F-53. At a distance of 0 there is no class to read. Question 5.
- "At that gate it checks `value object Char` to its end, with no crash (F-334)": F-54 ("That gate's `distance.txt` reads '#crash none': the checker checks `value object Char` to its end (F-334)") and F-334. The evidence sentence keeps '#crash none'. Question 5.
- "each unit stops at its first failing checker stage": `fortress-repo`'s compiler part, "The checker's time" ("In each api or component, it stops at the first of its stages that finds errors"), and P-39. Question 5.
- "the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`)": `fortress-repo`'s `SKILL.md`, "The phases" ("the count stage shows this as a total of 0"), and the compiler part's glossary entry "count stage", which names the script. Question 5.
- "and nothing crashes (F-233)": the evidence sentence ('#crash none'), and F-54. See finding 1.
- "such as a crash that no rung listed": F-66 and P-39, which the new text names. Question 5.
- "A rung measured by either takes the last landed gate's tables as its starting values: ...": the `coordinator` skill's `references/batch.md`, "The checker count and the distance", its first bullet; the tables' paths are in every rung's brief (`climb-batch-workflow.js:553`, `LANDED_TABLES`). Question 5.
- "the per-site list ... which holds the last landed gate's sites, none now": F-53's history (the blocks of 17 and 18 November: "the per-site list holds no site"), and the file itself, which holds its header only. Question 3.

The commit stage of the batch workflow rewrites this entry at each landing: "every figure it gives of the last landed gate, the lines of `distance.txt` it cites and the batch number in its title and in the paths it cites" (`climb-batch-workflow.js:1622`). The new text keeps that form, so the workflow needs no change. 34 of the entry's 46 history blocks are such rewrites.

### Lengths

Old 1,376; new 485; new without the evidence sentence 375.

### Findings

1. **A pointer that does not hold its claim.** "and nothing crashes (F-233)": F-233 is about a block's local functions, typed with their group in scope. It says nothing of a crash. The support is `checker-count.txt`'s '#crash none' line; F-54 cites F-233 only for the component checked to its end.
2. **Stale pointers to F-53 in other entries.** F-90 says "(F-53, which lists the five)": F-53 lists no five, in its old text or its new. F-42 cites F-53 for the count's early return ("which sees only the errors before each unit's early return (F-53)"): after this rewrite it should cite the compiler part, "The checker's time", or P-39.

## F-396, a program compiled against the one library

### New text

> - F-396 **A program compiled against the one library can print a string, call a varargs declaration, reduce over a range and compare strings.** Besides the cases in `fortress-repo`'s compiler part, it fails at: a reduction over a zip of two lists, or `=` of two empty lists (row 1137); a `Vector`'s `+`, `-` (row 643) and `copy` (row 1138); a failing `assert` with a message (row 1140). <mark>Tests: `one_library_tests/OneLibraryRun*`, `OneLibraryVarargs*` and `OneLibraryRange*`.</mark> Detail: `compile-ladder/rung-one-library-run-walls/SKEPTIC.md`.

### Old text

> - F-396 **The one library compiles to jars over a second set of run-time classes, and a program compiled against them can run on the compiled path, as one that prints a line, calls a varargs declaration, reduces over a range or compares two strings does.** Under `FORTRESS_LIBRARY=one` the onelibrary track compiles the one library's fourteen components first, in one `.test` (`OneLibraryJUTest.java:44`), and a program compiled against them runs with the JVM's verifier on, as `Hello` does. The run time's classes that name a library's types come in two sets under one set of names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one` by `ant compileAll`, for the one library, which the class path puts first under the selection. The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes the code generator writes over payload classes (`NamingCzar.java`), all value objects but `FlatString`, a reference object (`Library/FlatString.fss:32`), and a helper's raise names its exception by its simple name, which each set's `LibraryNames` maps to its library's class. Against the one library the compiled path still departs from walk, each at a row: `println` of a number or a boolean, which the export check's rule decides as much as the code generator (row 1098); `u.asString` in a generic body at `U extends ZZ32` (row 1101); the report of an uncaught exception (row 1102); a caught exception that a helper raises, which is not its object (row 1103); a reduction over a zip of two lists, or `=` of two lists (row 1137); a `Vector`'s `+` and `-` (row 643) and its `copy` (row 1138); a failing `assert` with a message, which dies with an `AbstractMethodError` in place of its `FAIL` line (row 1140). The track compiles the fourteen first since its programs use them. A call on `self` in `QQ comprises { Ratio }` takes `Ratio`'s declaration in every JVM (F-408). Tests: `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`, `OneLibraryRunStringEquality.test`, `OneLibraryVarargsArguments.test`, `OneLibraryRangeReduction.test`, `OneLibraryArr.test`. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)"; `compile-ladder/rung-one-library-run-walls/REPORT.md`.

### What was cut, and where it lives now

- The title's "over a second set of run-time classes", and the sentence on the two sets (`ProjectFortress/build` and `build-one`, `src-one`, the class path): `fortress-repo`'s compiler part, "The compiler's prelude, until the switch-over", which says all of it and adds that an edit of a class in both sets goes to both. Question 5.
- "the onelibrary track compiles the one library's fourteen components first, in one `.test` (`OneLibraryJUTest.java:44`)" and "The track compiles the fourteen first since its programs use them": `fortress-repo`'s tests-running part, "Compiled tests", and its library part, which names `OneLibraryComponents.test`; the line is the code's. Questions 5 and 4.
- "runs with the JVM's verifier on, as `Hello` does": `compile-ladder/rung-first-run-one-library/REPORT.md`, "The tests: the failing runs on the base, the passing run" ("The JVM's verifier was on (no flag turns it off in the track)"). The verifier is on by default, so the words change no reader's act. Question 4.
- The payload classes of the seven number types, `Boolean`, `Char` and `FlatString`: the compiler part, "What the two paths share". That `FlatString` is a reference object: the library's code (`Library/FlatString.fss:32`, `object FlatString` without `value`) and F-396's history (block of 21 November, 00:49). Questions 5 and 3.
- A helper's raise by the exception's simple name, which `LibraryNames` maps: the compiler part, "The compiler's prelude, until the switch-over", and the interpreter part, "Natives". Question 5.
- Rows 1098, 1101 and 1102: the compiler part, "What the compiled path cannot compile yet", which lists all three against the one library. Row 1098's "which the export check's rule decides as much as the code generator": row 1098's notes. Question 5.
- Row 1103: the compiler part, "Traps of the compiled path", which states it "against either library". Question 5. See finding 2.
- "A call on `self` in `QQ comprises { Ratio }` takes `Ratio`'s declaration in every JVM (F-408)": F-408, which states it. It is what is left of row 1100's repair. Questions 5 and 3.
- "which dies with an `AbstractMethodError` in place of its `FAIL` line": row 1140. Question 5.
- Four of the seven test names: `OneLibraryComponents` (the library and tests-running parts), `OneLibraryCatchHelperRaises` (`rung-first-run-one-library/REPORT.md`, "The tests: ..."), `OneLibraryArr` (`rung-one-library-run-walls/REPORT.md`, "The tests: the failing runs and the passing runs", and "Defects and their homes"). The other three are kept as the patterns `OneLibraryRun*`, `OneLibraryVarargs*` and `OneLibraryRange*`, which match only tests that pass. Question 4.
- The detail pointer to `rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)": the report keeps the section, and the compiler part now states that design. The new pointer is the skeptic's table of programs, which shows rows 1137, 643 and 1138 on the list and vector programs. Question 4.

### Lengths

Old 2,363; new 538; new without the evidence sentence 450.

### Findings

1. **"`=` of two lists" claims more than its evidence.** The old text puts "`=` of two lists" at row 1137. The skeptic's program compared two empty lists (`rung-one-library-run-walls/SKEPTIC.md`, "My programs, old against new", `SkOneList`). The worker's program on two lists built by `addRight` died first on a size known only at run time, 'NoClassDefFoundError: n#90$RTTIc' (rows 25 and 307; `rung-one-library-run-walls/REPORT.md`, "Programs run on the old code and on the new"). The new text says "two empty lists".
2. **Row 1103 is not the one library's.** The old text lists it among the departures "against the one library"; the row and the skill's trap say "against either library".
3. **Row 643 does not name the vector.** That a `Vector`'s `+` and `-` die at row 643 was observed by the skeptic (`SkOneVecOps`, 'NoSuchMethodError ... Vector⟦FRR64,3⟧.\=ivmap...'), but row 643's text names no vector: the tie is the skeptic's reading. A note on row 643 would let `ledger-find` reach it.
4. **Row 1140 has no reproducer.** Its reproducer cell reads "none". The failure was observed once, in the gate's run of `tests/NumeralCoercionNumberAtCallWalk.fss` under the one library (`reviews/batch-36-review.md`, finding 3).
5. **Seven entries cite F-396 for what moves to the skill.** F-34, F-336, F-352, F-353, F-381, F-390 and F-388 cite F-396 for the second set of run-time classes, the payload classes, `LibraryNames` or the track's order (`FACTS.md` lines 39, 166, 171, 172, 177, 178 and 294). When this text is applied, each should cite the compiler part instead, or F-396 keeps one clause on the second set (about 90 characters). The skill's sources part cites F-396 for the two sets too (`.claude/skills/fortress-repo/references/sources.md:1518`); that line should then cite the first-run report's "The design as built".

## F-63, four forms of the one library's api

### New text

> - F-63 **The one library's api has `String`'s `split` and `splitWithOffsets` once, abstract; no `zip` in `List` (`ZeroIndexed.zip` serves); `Condition.map` returning `Condition[\G\]`; and `QQ` as `comprises { ... }`.** The first three follow the export rules (`fortress-repo`'s library part). `QQ`'s clause lists no type: its one value type `Ratio` is private, and an api omits it only by `...`. <mark>The count stage refused the pair declared twice and `List`'s own `zip`; `Condition.map`'s form is read in the export check's code.</mark> Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Decisions".

### Old text

> - F-63 **The one library's api declares `String`'s `split` and `splitWithOffsets` once, abstract; redeclares no `zip` in `List`, where the inherited `ZeroIndexed.zip` serves; has `Condition.map` return `Condition[\G\]`, the component's type; and closes `QQ` by `comprises { ... }`.** `Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:1008`. In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured). The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count; the forms kept follow the specification's export rules (the report's Decisions). The `Condition.map` error was seen only under a checker change that did not land; otherwise it is read from the export check's comparison of return types, and no test gates that edit. `QQ`'s clause lists no type, since its one value type `Ratio` is private to the component, and an api may leave out a private type only by `...` (`Library/FortressLibrary.fsi:397`). No api-declared type extends `QQ`, so F-64's refusal, which falls on such a type, does not arise. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Summary", "Decisions" and "Defects and their homes".

### What was cut, and where it lives now

- "`Condition` is the sequential generator trait at `Library/FortressLibrary.fsi:1008`": the api's code at that line. Question 4. The line number moved eight times: eight of the entry's eleven history blocks only re-anchor its two line numbers.
- "In their earlier forms, the pair declared twice and `List`'s `zip[\F\](other: List[\F\])`, the checker refused the api (measured)": kept, short, as the evidence sentence.
- "The other repairs tried, the plain pair kept once and a `zip` narrowed to `ZeroIndexed`, read the same count": `compile-ladder/rung-library-defects/REPORT.md`, "Decisions", its second and third items. Question 4. "the forms kept follow the specification's export rules": kept, as "The first three follow the export rules", which `fortress-repo`'s library part states ("declare each ... member at the header that the component gives it"; "write `abstract` on each member that the component leaves without a body").
- "The `Condition.map` error was seen only under a checker change that did not land": the same report, "Defects and their homes" (Family F, "which only P's relaxation makes visible"), and F-63's history (block of 22 October). Questions 4 and 3. "otherwise it is read from the export check's comparison of return types": kept, in the evidence sentence. "and no test gates that edit": see finding 2.
- `QQ`'s line, `Library/FortressLibrary.fsi:397`: the api's code. Question 4.
- "No api-declared type extends `QQ`, so F-64's refusal, which falls on such a type, does not arise": F-63's history (block of 22 October, "Nothing extends `QQ`, so F-64's refusal misses it"), and F-64, which states its refusal and when it falls. Question 1: no reader acts on it, since the distance stage reads 0 over this api (F-288).
- The title's "the component's type" and "redeclares": the export rules of the library part, which the new text names.
- The detail pointers to "Summary" and "Defects and their homes": the report keeps them; "Decisions" holds the reasons. Question 4.

### Lengths

Old 1,265; new 596; new without the evidence sentence 465.

### Findings

1. **The cited reason for the abstract pair is stale; the form still holds.** The report's "Decisions" says that the component's `String` defines neither `split` method. Since `cc47b637d8` the component declares both without a body (`Library/FortressLibrary.fss:4651-4652`), and `FlatString` gives them bodies (`Library/FlatString.fss:149-150`). The api's abstract form still follows the rule "write `abstract` on each member that the component leaves without a body" (`fortress-repo`'s library part).
2. **"No test gates that edit" is stale in part.** The count stage now runs `FortressLibrary`'s check to its end, through the export check (F-240; `fortress-repo`'s compiler part, "The checker's time"), and reads 0 (F-53). So it passes the current `Condition.map` form. That it would refuse the earlier `SequentialGenerator[\G\]` is read from the export check's code, not measured.
3. Known, and in the history already: the report's "What changed" gives `QQ`'s clause as `comprises { AnyIntegral, ... }`; the tree has `comprises { ... }` since `d846e3644c`.

## The open point: an entry's test

The curator leans to fewer test names. Each new text puts its evidence in one sentence, marked above, that can be cut whole. With it the four come to 2,388 characters; without it, to 1,979. Without it, F-53 loses the path to the gate's tables, and F-63 loses the only words that say which of its forms were measured and which were read in the code.

## What the pilot shows about the line between FACTS and its history

1. **FACTS says what holds now and what a worker does about it. The history says how it came to hold.** An earlier form of the code, a fixed row, a repair, a "no longer", or a value read at a past gate goes to the history (F-396's `QQ` tie, left from row 1100's repair; F-53's "none now" for the per-site list). The history already holds every old line word for word, so such a sentence needs no other home.
2. **A line number never goes in FACTS.** It moves whenever its file moves, and each move writes a history block: eight of F-63's eleven blocks only re-anchor two line numbers. The code, or the report, holds the line.
3. **What a skill part or another entry already says leaves FACTS.** The entry names the part, or the entry's number with a few words. Most of F-252's departures, F-396's two sets of run-time classes and four of its rows, and F-53's definitions of the two stages were already in the `fortress-repo` skill.
4. **How the code does it, and every list, goes to the report.** The steps of a check, the method names, the test lists and the program lists stay in the report's section. The entry keeps the outcome, one example where the outcome is hard to see, and at most a few test names or patterns.
5. **A number that each landing rewrites stays only in its count entry, with few words around it.** 34 of F-53's 46 history blocks are the commit stage's rewrites of its figures and its batch number, and other entries give its number, not its value.
6. **A gap stays in FACTS only as "row N" with a few words, and only where no skill part lists it.** F-396 keeps rows 1137, 643, 1138 and 1140 for that reason, and leaves rows 1098, 1101, 1102 and 1103 to the skill.

# Rung O of climb batch 22c: the export check reads top-level operators, and the 9 headers match

problem: with the operators admitted, the export check lists the 157 top-level operator declarations of the twelve apis as missing, through the span key that the index also files each one under, and behind them 9 headers differ between api and component (`explorations/reviews/phase3-exit/zero-audit.md:88-116`); the planner's check alone lists exactly the 9 (`explorations/coordinator/CLIMB-BATCH-22c.md:334-336`)
spec: a component provides declarations "that \emph{satisfies} every top-level declaration in any API that it exports" (`Specification/basic/components/source-code.tex:312-314`), with no exception for operators (no line of "Export Statements", `:288-434`, names one); a top-level function declaration is satisfied by declarations "the union of whose parameter types is the parameter type of the exported declaration, and each of whose return types is a subtype of the return type of the exported declaration" (`:355-360`)
precedent: the overloading check's admission of every operator, `isCheckedName` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:770-773`, read at `:270`, `:396`, `:405`); for the headers, the component's `getter bounds():CompactFullRange[\ZZ32\] = sized1Range(b0,s0)` (`Library/FortressLibrary.fss:2355`), the team's api `opr BIG //[\T\](g: Generator[\T\]): String` (`Library/FortressLibrary.fsi:2142`) and `import CovariantCollection.{AnyCovColl}` (`Library/IntMap.fsi:13`, `Library/PrefixSet.fsi:33`)
deviation: an operator is matched at its api declaration's own header, as every named function already was, where the text accepts a component declaration whose return type is a subtype (`Specification/basic/components/source-code.tex:355-360`; the check's `existsMatching`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:431-437`; NEW-O-1)
deviation: the speed pass restates `coverOverloading`'s cover test in the export check, since the brief leaves `OverloadingChecker.scala` untouched (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:608-621` against `OverloadingChecker.scala:843-867`)
deviation: the index's second key stays for its other readers, and the check reads past it (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/IndexBuilder.scala:444-446`)
historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala` (first edit `:275`), `Library/FortressLibrary.fsi` (`:2128`), `Library/FortressLibrary.fss` (`:4164`), `Library/List.fsi` (`:14`)

The branch is `wip/rung-export-operators`: the change with its two tests at `5046b1619`, the speed pass at `95f31de40`. The text of the change is the planner's `rung-O.patch` byte for byte (section 9, decision 1); the speed pass is mine. The harness refused the worker's write of this file and of `record.md`; their text is the run's journal.

## 1. What changed and why

**The export check.** Its loop over an api's functions admitted a name only by `isDeclaredName` (`ExportChecker.scala:274-275` at `c3c22817c`, the team's, 2012). That function takes an operator only when its name is a word of capitals, so no symbolic operator's header was ever compared (row 782). Admitting every operator is not enough on its own. `IndexBuilder.buildFunction` files each function twice: under its name, and under an unambiguous name made from its span (`IndexBuilder.scala:444-446`, the team's). An operator's span key is an `Op` that `isCheckedName` admits, and no component holds it, so every operator would be listed missing (the zero audit's shadow (a): 157 such entries). The loop now reads

    if overloadingChecker.isCheckedName(f) && isDeclarationName(fnsInAPI, f) ) {

(`ExportChecker.scala:275`). It admits every operator and every name that `isDeclaredName` admits, but only a key under which a declared function is filed by its own name (`isDeclarationName`, `:597-606`). For identifiers it compares exactly what `isDeclaredName`'s admission compared, though it admits fewer keys, for two reasons. An identifier's span key, `_|...`, is no valid identifier. A key that holds no declared function gave nothing to compare before either: `coverOverloading` keeps only declared functions (`OverloadingChecker.scala:848-852`), and the other branch lists only declared functions (`ExportChecker.scala:315-323`).

**The library's 9 headers**, each stated once on both sides by the library's rule (the `fortress-repo` skill's `library.md`, "Designing a change"):
- **`#` ×3 and `:` ×3.** The component's operators answer the api's `CompactFullRange[\ZZ32\]`, `CompactFullRange[\(ZZ32,ZZ32)\]` and `CompactFullRange[\(ZZ32,ZZ32,ZZ32)\]` (`Library/FortressLibrary.fss:4164-4178`). They answered `RangeInternals`' `CompactFullParScalarRange`, `CompactFullRange2D` and `CompactFullRange3D`, which the api cannot name, because `RangeInternals` imports the core api. The bodies are unchanged: `CompactFullParScalarRange` extends `CompactFullScalarRange`, and `CompactFullRange2D` extends `CompactFullRange[\(ZZ32, ZZ32)\]` (`Library/RangeInternals.fsi:494-495`, `:520-521`).
- **`BIG ||` and `BIG |||` over a generator.** The api takes the component's generic header, `[\T\](g: Generator[\T\]): String` (`Library/FortressLibrary.fsi:2128`, `:2135`). The component's declarations (`Library/FortressLibrary.fss:3689`, `:3699`) have been generic since the team's tree (`a874948ac:Library/FortressLibrary.fss:3323`, `:3333`), and the team's api already states `BIG //` this way (`fsi:2142`).
- **`List`'s comprehension.** `List`'s api imports `CovariantCollection.{AnyCovColl}` and states its component's comprehension type, `Comprehension[\T,List[\T\],AnyCovColl,AnyCovColl\]` (`Library/List.fsi:14`, `:116`; the component's `Library/List.fss:178`). It named `List[\T\]` twice, the team's own mismatch since `a874948ac` (`List.fsi:110` against `List.fss:177` there).

**The speed pass** (section 5.2). With the operators read, the loop spent about 7.6 s of the count stage in `coverOverloading`. Almost all of that went on testing the functional methods that the index files under an operator's name, which the answer then drops. `uncoveredDeclarations` (`ExportChecker.scala:608-621`) gives the same answer and makes the cover test only for the declared functions. The loop's two calls use it (`:278-282`).

## 2. The tests: their failure on the base and their pass

Two compiled tests in `ProjectFortress/compiler_tests/`, each an api with its component:
- **`XXXExportOperatorHeader`.** The api declares `trait A`, `object B extends A` and `opr #(a: String, b: String): A`. The component declares the same types and `opr #(a: String, b: String): B = B`. The `.test` file: `compile`, `compile_err_contains=does not define all declarations`. The test asserts the text's answer, that a narrower return satisfies (`source-code.tex:355-360`), and it records the check's refusal at the api's header (NEW-O-1). Before the change, the check never compared it.
- **`ExportOperatorMatch`**, a guard of the double key. The api declares `opr #(a: String, b: String): String`. The component declares the same, `= a || b`, and its `run()` asserts that `"x" # "y"` is `"xy"`. The `.test` file: `link`, `run`, `run_out_contains=PASS`.

The failing run, on the base's code (the worktree seeded from the base build, before my edit was built; 2026-10-29T23:11:46Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests XXXExportOperatorHeader.test ExportOperatorMatch.test
    . compile ProjectFortress/compiler_tests/XXXExportOperatorHeader
     Saw failure, but did not satisfy compile_err_contains; expected
    . run ProjectFortress/compiler_tests/ExportOperatorMatch (301ms) PASS
    1) ProjectFortress/compiler_tests/XXXExportOperatorHeader(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 3,  Failures: 1,  Errors: 0

The last run, after the last change of code (`95f31de40`, built, after the library order; 2026-10-29T23:42:31Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests XXXExportOperatorHeader.test ExportOperatorMatch.test
        Missing declarations: {#(a:String,b:String):XXXExportOperatorHeader.A at ProjectFortress/compiler_tests/XXXExportOperatorHeader.fsi:7:1-9:1}
     Saw expected failure
    . run ProjectFortress/compiler_tests/ExportOperatorMatch (313ms) PASS
    OK (3 tests)

The verdict was the same on `5046b1619`, before the pass (`junit.sh new`, 23:15:39Z: 'Saw expected failure', 'OK (3 tests)').

**The first `XXX` test shown red on a deliberate fix**, through the harness. For one run, the component's `#` was changed to answer `A` (`opr #(a: String, b: String): A = B`), then restored (23:15:52Z):

    ONE_JVM=1 .../junit.sh deliberate ProjectFortress/compiler_tests XXXExportOperatorHeader.test
     Saw failure, but did not satisfy compile_err_contains; expected
    1) ProjectFortress/compiler_tests/XXXExportOperatorHeader(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

**The guard red under a check that reads the span keys.** The shadow check is `ExportChecker.scala` with `isCheckedName` alone at `:275`, compiled into a scratch folder ahead of the build (the skill's quick loop, `compiler.md`, "Testing an edit here"). It was run through the harness's `fortress junit`:

    java ... -cp "<scratch>/classes:$CP" com.sun.fortress.Shell junit compiler_tests/ExportOperatorMatch.test
        Missing declarations: {#(a:String,b:String):String at .../ExportOperatorMatch.fsi:4:1-6:1}
    2) compiler_tests/ExportOperatorMatch(...TestTest)junit.framework.AssertionFailedError: TestTest compiler_tests/ExportOperatorMatch
    Tests run: 2,  Failures: 2,  Errors: 0

The library's text has no test of its own. Its test is the distance stage (section 5.3), and the suites gate walk's values (section 6).

## 3. Where the fix belongs, and the precedent search

The export check is the static checker's third stage and runs on a component only (`compiler/StaticChecker.java`, `checkCompilationUnit`; the skill's `compiler.md`, "The checker's time"). Its loop over the api's functions is the one place that reads an api function's header against the component's (`ExportChecker.scala:272-325`). The skip lives there, at `:275`, the file's only reader of `isDeclaredName`.

The precedent that repaired the same skip is the overloading check's (F-281). Its three loops read `isCheckedName` (`OverloadingChecker.scala:270`, `:396`, `:405`), 3 sites in its file; the export check's loop is the one site in `ExportChecker.scala`. The overloading check reads past the double key without a filter of its own: its loops read the component's own relation, where a span key holds one declaration and so overloads nothing. The export check looks a key up in the other unit's relation, where a span key can never be.

The ways for the double key:
- **(a), taken.** The check reads a key only when a declared function is filed under it by its own name (`isDeclarationName`, the planner's `opr782`).
- **(b), not taken.** `IndexBuilder.buildFunction` stops filing the second key; its team comment asks "TODO: Don't double-add the indices?" (`IndexBuilder.scala:446`). Every other reader of the relation sees that key, and the brief's fork 5 keeps it.
- **(c), not taken.** The check skips a name by its text, such as a span key's `_|` prefix or its `:` and `-`. This depends on `NodeFactory.uaName`'s format (`nodes_util/NodeFactory.java:442-446`).
- **(d), not taken.** The check skips a key that is some declaration's `getUnambiguousName`. On the index as built this is equivalent to (a), but (a) states the positive condition that the loop needs.

The ways for each header (the library's own way, `library.md`, "Designing a change"):
- **`#` and `:`.**
  - (1), taken: the component takes the api's `CompactFullRange` types, as `ReadableArray1`'s `bounds` does (`fss:2355`).
  - (2), impossible: the api names the component's types, but `RangeInternals`, which declares them, imports the core api.
  - (3), not this rung's: the check accepts a narrower return, question 4's other way.
- **`BIG ||` and `BIG |||`.**
  - (1), taken: the api takes the component's generic header, as the team's `BIG //` beside them does (`fsi:2142`).
  - (2), not taken: the component takes the api's `Generator[\Any\]`. Generators are invariant, so the checker would refuse `BIG ||` over a `Generator[\ZZ32\]`.
- **`BIG <|[\T\]|>`.**
  - (1), taken: the api imports `AnyCovColl` and states the component's type, as `IntMap.fsi:13` and `PrefixSet.fsi:33` import it.
  - (2), not taken: the component takes `Comprehension[\T,List[\T\],List[\T\],List[\T\]\]`. Its body's `covariantCompr` builds a comprehension over `AnyCovColl` (`List.fss:178-179`), so the body would change.

The ways for the speed pass are in section 5.2.

## 4. What the specification settles

The text asks that every top-level declaration of an exported api be satisfied (`source-code.tex:312-314`), and "Export Statements" names no exception for operators anywhere (`:288-434`). So reading them is the text's rule, and P-155, read to cover the export check (the batch record's question 2, answered option 1), decides it.

On the return type, the text and the check disagree. A top-level function declaration "is satisfied by a set of ... declarations ... each of whose return types is a subtype of the return type of the exported declaration" (`:355-360`), and a method likewise (`:399-404`). The check asks for the api's own header, return type included (`existsMatching`, `ExportChecker.scala:431-437`, the team's). It has done so for every named function, and now does so for operators too. No decision says which side holds: this is question 4, whose default is the check's rule, with NEW-O-1 `CONTESTED`. The 9 lines satisfy both rules, so the library depends on neither. There is no edit of the text in this batch.

## 5. The stages

Machine for every run: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`. Up to two other agents of the batch ran beside me.

### 5.1 The count stage, and the checker's time

Each run used the command of the skill's `compiler.md`, "The checker's time", step 2, in the background, with nothing else of mine beside it:

    time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N

| run | tree | load at start | real | user |
|---|---|---|---|---|
| `base` | `/home/user/fortress-base23` (the base's code) | 0.52 | 163.0 s | 228.3 s |
| `change` | `5046b1619`, built | 1.21 | 170.1 s | 229.1 s |
| `pass` | `95f31de40`'s code, built | 6.78 | 168.7 s | 213.3 s |

**The tables.** `base`'s table equals climb batch 22's landed `checker-count.txt`. `change`'s table gains one row (`diff base.txt change.txt`):

    2a3
    > CovariantCollection	0

It reads, as before, `#total 0`, `#locations 0` and `#crash none`. `List`'s api now imports `CovariantCollection`, so the checker checks that api too.

**The outputs.** The two `run.txt` files, with each tree's path replaced by `TREE`, differ in the order of the apis' checks and in `CovariantCollection`'s two lines. Sorted, only those two lines differ (`diff <(sort base-run.norm) <(sort change-run.norm)`):

    4a5,6
    > @@PROBE checkApi CovariantCollection
    > @@PROBE checkApi CovariantCollection -> errors=0

The order moved because the set of apis changed, and the change itself does that (the skill's `compiler.md`: such a move is a difference to report).

**`pass` against `change`.** The tables are equal, and so are the normalised `run.txt` files: `diff change.txt pass.txt` and `diff change-run.norm pass-run.norm` print nothing. The `pass` run is the post-edit count on the final code: the speed pass is the last edit of code, and `pass` ran on its build.

The times are a smoke test, one run each, and they show no slowdown of several times. The loop's own cost is in 5.2.

### 5.2 The speed pass

**The profile.** I ran the count stage once on `5046b1619` under JFR (`-XX:FlightRecorderOptions:stackdepth=2048 -XX:StartFlightRecording=...,settings=profile`). An instrumented copy of `ExportChecker.scala` sat ahead of the build and timed the loop and each name in it; this was a profiled run, neither timed nor compared. I read the recording with a small `jdk.jfr.consumer` program (section 13):

    samples 12719, under ExportChecker 696
    692  com.sun.fortress.scala_src.typechecker.ExportChecker$.$anonfun$checkExports$12 -> com.sun.fortress.scala_src.typechecker.OverloadingChecker.coverOverloading
    @@EXPORT checkExports FortressLibrary total_ms=8989.868582 fnloops_ms=8952.170205 keys=943 admitted=144 operators=67

So the export check is about 5 % of the stage's samples, and nearly all of it is `coverOverloading` under the loop. The top frames of the whole run are the checker's as before:

| frame | samples |
|---|---|
| `scala.runtime.BoxesRunTime.equals2` | 658 |
| `scala.runtime.Statics.anyHash` | 656 |
| `Walker.walkCases7$` | 632 |
| `ASTGenHelper$.scalaify` | 526 |
| `Walker.walkCases0` | 433 |

A second instrumented run timed each name. The 67 operators took 7,638 ms. The 77 identifiers, which are the base's whole loop, took 152 ms. The costliest operators:

| operator | ms | functions under the name, declared functions among them |
|---|---|---|
| `juxtaposition` | 3,265 | 19, 11 |
| `-` | 1,175 | 12, 2 |
| `=` | 654 | 29 and 31, 3 |
| `MAX` | 639 | |
| `MIN` | 563 | |
| `CMP` | 500 | |
| `+` | 355 | |

The sets hold the functional methods of the api's and the component's traits, filed under the same name. `coverOverloading` tests each member against every other (`OverloadingChecker.scala:843-867`), then keeps only the declared functions.

**The gain taken.** `uncoveredDeclarations` (`ExportChecker.scala:608-621`) makes the same test, `lteq(f, g) && !lteq(g, f) && satisfiesReturnTypeRule(f, g)` against every other member, but only for the declared functions. The cost goes from n·n tests to d·n, and no answer is reused. The ways:
- **(a), taken:** this, in the export check.
- **(b), not taken:** the same reordering inside `coverOverloading`, whose only caller is the export check (`grep -rn coverOverloading` finds `ExportChecker.scala` alone). It would keep the cover rule in one place, but the brief names `OverloadingChecker.scala` among the files not to edit.
- **(c), not taken:** a memo of `lteq` across the api's and the component's sets. Their members are different declarations, so nothing repeats.

**The audit**, on one full count-stage run with an instrumented copy that computed both answers at every name:

    @@AUDIT ... 144 names, 144 with apiSame=true and compSame=true
    @@AUDIT op new_ms 3806.81 old_ms 4046.55
    @@AUDIT id new_ms 145.081 old_ms 25.6292

`old_ms` ran second, after `new_ms` had warmed the analyzer, so only the first column measures a cost. The operators' loop went from about 7.6 s to about 3.8 s, of which `juxtaposition` alone takes 2.5 s. With the pass, reading the operators costs the stage about 3.7 s over the base's loop. What remains is the generic `juxtaposition` declarations' own tests, and I found no further exact gain worth its text.

### 5.3 The distance

I ran it once on the final code (`95f31de40`, built), in the background:

    explorations/coordinator/tools/distance/run.sh tmp/rung-export-operators/distance-postedit.txt tmp/rung-export-operators/dist-post
    #distance	setting any; ...; 12 components in one JVM (DistanceMulti -order check)
    #total	0
    #kind	export	0
    #crash	none
    #seconds	209	FortressLibrary 153
    #shadow	every shadow edit matched the tracked sources

Its table equals climb batch 22's landed `distance.txt`, except for the `#seconds` and `#machine` rows: a `diff` of the two without those rows prints nothing. The comparison tools:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-22/gate/distance.txt <this table>
    DISTANCE SAME   0
    python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv <run>/errors.tsv
    landed 0 now 0
    export 'does not define all declarations': landed 0 entries, now 0
    export 'are not matched by the declarations': landed 0 entries, now 0

No site moved, and none came in any component: `errors.tsv` holds only its header.
- All 12 targets ended '### done ... rc=0'.
- All 173 '@@SC STAGE' lines read 'errors=0'. Among them is the export stage of each of the twelve components, including `List`'s and `RangeInternals`', whose 5 and 6 top-level operators the check now reads.
- All 14 '@@TC API' lines read 'errors=0', `CovariantCollection`'s and `OneShotFlag`'s among them.

The export error's entries: none before and none after. Without the 9 lines, the planner measured the check alone at 2 export errors listing exactly the 9 (`CLIMB-BATCH-22c.md:335`).

## 6. The suites and the ladder subset

I ran each suite once on `95f31de40`, since the checker's Scala changed and so did the component that walk reads:

    ant testQuick
    fast-compiler       Tests run: 1318, Failures: 0, Errors: 0, Skipped: 0
    fast-library        Tests run: 86, Failures: 0, Errors: 0, Skipped: 0
    fast-othercompiler  Tests run: 263, Failures: 0, Errors: 0, Skipped: 0
    BUILD SUCCESSFUL / Total time: 5 minutes 50 seconds

The compiler track is the landed 1,315 plus my 3 cases. No compiled test's verdict changed, and no operator of a compiled test is refused.

    ant testSystem
    Tests run: 162, 173, 168, 180, Failures: 0, Errors: 0   (683, the landed sum)
    BUILD SUCCESSFUL / Total time: 4 minutes 5 seconds
    ant testSpecData
    Tests run: 130, Failures: 0, Errors: 0, Skipped: 0
    BUILD SUCCESSFUL / Total time: 1 minute 15 seconds
    ant testOnly -DtestPattern=MethodSizeJUTest
    Tests run: 2, Failures: 0, Errors: 0, Skipped: 0

The library order ran on each build: all five compiles rc 0, with the five jars in place. `Library/CompilerLibrary.fsi` declares 14 top-level operators (`grep -c '^opr '`), and its component now matches them under the check. The other four prelude apis declare none.

**The ladder subset**, after the edit only. I copied the drivers of the skill's `gate.md`, "The ladder regression", under my scratch, pointed them there, and copied the library's caches in. The subset holds each file of the baseline's `ladder.tsv` whose first error names something the change touched:
- the export check: `tests/testTest1.fss`, 'Component testTest1 exports API Executable';
- `BIG ||`: `tests/sequivTest.fss`;
- a comprehension through an import of `List`: `tests/IntMapTest.fss`;
- the 20 files whose first error is in `List.fsi` itself ('LexicographicOrder is undefined.' in the baseline).

None of the 23 is among the gate's 85, so I ran the same compiles on the old code (`old-fortress.sh`) to compare:

    phase counts: tests (23 files)      old: disambiguate 22, typecheck 1     new: disambiguate 22, typecheck 1
    MOVED  ListTest.fss  disambiguate | ZeroIndexed is undefined.  ->  disambiguate | ImmutableArray is undefined.
    same   sequivTest.fss  disambiguate | Operator BIG || is not defined.
    same   testTest1.fss   typecheck | Component testTest1 exports API Executable
    same   IntMapTest.fss  disambiguate | ImmutableArray is undefined.

No phase moved. The 20 files that import `List` keep their phase but change their first error. `List`'s api now imports `CovariantCollection`, whose api names `ImmutableArray`, `Array`, `MonoidReduction` and `Comprehension`, all of which the compiler's prelude lacks. So `ListTest` reports 11 errors where it reported 6 (row 71's mechanism; its rewrite is in `record.md`). The other three files are unchanged.

The demos: the brief gives them to the gather, on the merged tree. MicroGPT: not asked.

## 7. Old against new

| program | old code | new code |
|---|---|---|
| `compiler_tests/XXXExportOperatorHeader` (compile) | compiles: 'Saw wrong failure' | refused, 'Missing declarations: {#(a:String,b:String):XXXExportOperatorHeader.A ...}' |
| `compiler_tests/ExportOperatorMatch` (link, run) | PASS | PASS |
| the 23 files of the ladder subset (compile) | 22 disambiguate, 1 typecheck | the same phases; 20 first errors moved (section 6) |
| the count stage over `FortressLibrary` | `#total 0` | `#total 0`, one more api row |

## 8. Sentences made false

In the specification: none. `grep -rn -i 'export check\|skips.*operator' Specification/ --include=*.tex` finds nothing. Appendix I has no sentence on the export check's reading of operators; its sentences on symbolic operators (`Specification/appendices/changes.tex:2922`, `:4055`, `:4183`) are about the overloading checks.

In Part IV, which renders the apis, the following change:
- `FortressLibrary`'s `BIG ||` and `BIG |||` over a generator become generic (`Library/FortressLibrary.fsi:2128`, `:2135`).
- `List`'s comprehension type and imports change (`Library/List.fsi:14`, `:116`).

No sentence of the text states the old headers (`grep -rn 'BIG ||\|CompactFull' Specification/ --include=*.tex` finds none).

In the record and the code, for the gather:
- F-287: "and the export check reads none of them" and "The check skips every symbolic name" (`explorations/coordinator/FACTS.md:122`). Its "9 differ" holds of the base only.
- F-282: "it skips every top-level operator (F-287)" (`FACTS.md:119`).
- F-281: "the export check still reads `isDeclaredName`, so it skips every top-level operator and hides 9 differences between the api and its component (row 782; F-287)" (`FACTS.md:118`).
- P-155 (`explorations/coordinator/POSITIONS.md:66`): "The team's overloading check, and its export check, ... read an operator only if its name is a word of capitals" describes the team's checks and stays true of them. Its "Both checks must read them" is now built for both.
- Rows 782 and 827, which close.
- Row 71's notes, "The refusals (six errors ...) are raised inside `Library/List.fsi` itself: `ZeroIndexed` first (`:67`) ...". These are now false in their count, their first error and their lines (the rewrite is in `record.md`).
- The comment in `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:768-769`, "the export check reads isDeclaredName itself", in a file the brief leaves untouched.

## 9. Decisions

1. **The planner's `rung-O.patch` taken as it is** for the change (`edits22c.py opr782 hdrRange hdrBig hdrList`; `git diff` equals the patch except for its `index` lines). The ways not taken: improve `isDeclarationName`'s test, or put the filter elsewhere (section 3's (b) to (d)). The evidence:
   - its admission equals `isDeclaredName`'s on identifiers (section 1);
   - the guard and the `XXX` test pin both halves (section 2);
   - the planner's o0 and o1 runs already measured its text (`CLIMB-BATCH-22c.md:334-336`).

   The brief's fork 5 covers the place.
2. **The 9 headers by the library's rule**, each with its ways in section 3. The brief's fork 6 covers them.
3. **The speed pass inside the export check** (section 5.2: (a) taken; (b), `coverOverloading` itself, and (c), a memo, not taken). No decision of the curator covers where it goes. The brief names `OverloadingChecker.scala` among the files not to edit, so I acted on that and list the edit beyond the named lines of `ExportChecker.scala` as a point to report.
4. **`testQuick` once, on the final code**, after the pass, and not also on `5046b1619`. The skill's `tests-running.md` asks for one run after the last edit of code. The pass changed which tests the cover test runs but no answer (the audit), and the change's own tests ran on both code states (section 2).
5. **The `pass` run as the post-edit count**, with no second run of the count stage on the same code (the skill: no repeat without a change of code).
6. **The ladder subset compared with the old code**, run beside it. None of its files is in the landed `ladder.tsv`, and the baseline's `ladder.tsv` dates from 2026-09-19, with landings since: its first errors ('LexicographicOrder is undefined.') already differ from the base's ('ZeroIndexed is undefined.').
7. **Row 71 rewritten whole** rather than given a note: its notes' error count, first error and lines are false after the change.
8. **NEW-O-1's "found by"** is "climb batch 22c's planner", who raised question 4. Its reproducer is this rung's `XXXExportOperatorHeader`, as the brief gives it.

## 10. Defects, each with its home

- **Row 782, the skip and the double key.** Home 1: my change repairs it. `XXXExportOperatorHeader` shows that an operator's header is now compared, and `ExportOperatorMatch` that it is compared only under its declared name. The gather closes the row with `5046b1619`, its test `XXXExportOperatorHeader`.
- **Row 827, the 9 headers.** Home 1: the library lines. Its test is the distance stage (section 5.3). The gather closes it with `5046b1619`.
- **NEW-O-1, the check's header against the text's subtype rule.** Home 3: the conflict is open (question 4). `XXXExportOperatorHeader` asserts today's refusal and turns red when a narrower return is accepted. The row is in `record.md`.
- **Row 71's errors moved.** Not a new defect: this is its gap as it stands now, written as the row's rewrite in `record.md`.

## 11. Points to report

- **rung-O.patch taken as it is**: the change is the patch byte for byte (decision 1). The speed pass was added after it (`ExportChecker.scala:278-282`, `:608-621`).
- **The distance and the export error's entries before and after**: 0 before and 0 after, the export error with no entries both times, and no site came in any component (section 5.3).
- **The count stage's table**: `#total 0`, with its new row `CovariantCollection 0` (section 5.1).
- **The count stage's seconds**: base 163.0 s, change 170.1 s, pass 168.7 s. In the profile, the export check took 696 of 12,719 samples, and its loop took 7.6 s before the pass and 3.8 s after. The audit found 144 of 144 answers equal (sections 5.1, 5.2).
- **Operators of the compiler's prelude or of a compiled test now refused**: none. The library order compiles with `CompilerLibrary.fsi`'s 14 top-level operators read, and `ant testQuick` has no failure (section 6).
- **The declarations that change in the api, and so Part IV**:
  - `Library/FortressLibrary.fsi:2128` and `:2135`: `opr BIG ||[\T\](g: Generator[\T\]): String` and `opr BIG |||[\T\](g: Generator[\T\]): String`, where they took `Generator[\Any\]`;
  - `Library/List.fsi:14`: `import CovariantCollection.{AnyCovColl}`, new;
  - `Library/List.fsi:116`: `opr BIG <|[\T\]|>:Comprehension[\T,List[\T\],AnyCovColl,AnyCovColl\]`, where it named `List[\T\]` twice.

  Part IV renders both apis (`Specification/library/default-libraries.tex:27`, `optional-libraries.tex:24`); no sentence needs an edit.
- **Walk values that move, and test verdicts that change**: no walk test's verdict changed (683 and 130, no failure). No compiled test's verdict changed beyond my two new tests (1,318, 86 and 263, no failure). I did not compare walk's outputs run by run, since the brief does not ask it.
- **The new row NEW-O-1, and rows 782's and 827's closes**: in `record.md`.
- **Every sentence made false**: section 8.
- **A file edited beyond those named**: the speed pass edits `ExportChecker.scala` beyond the loop's admission and `isDeclarationName`, in the loop's two calls (`:278-282`) and the new `uncoveredDeclarations` (`:608-621`). No other file is edited beyond those named, and `IndexBuilder.scala` is not edited.
- **The ladder subset**: no phase moved, and 20 first errors moved through `List`'s new import (section 6).

## 12. Greps for competing declarations

    grep -rn 'isDeclarationName\|uncoveredDeclarations' ProjectFortress/src/com/sun/fortress/    # ExportChecker.scala only
    grep -rln 'ExportOperatorHeader\|ExportOperatorMatch' ProjectFortress/ Library/               # my six files only (and the suite's result file)

No other test file, api or component declares the two test names, in `ProjectFortress/tests/`, in the compiled test folders or in `test_library/`.

## 13. Commands worked out

- **The guard and the `XXX` test under a shadow check.** Edit `ExportChecker.scala` in scratch and compile it with `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d <dir> -encoding UTF-8 ExportChecker.scala` (5 s). Then, from `ProjectFortress/`, run `java $JAVA_FLAGS -Dfortress.caches=<copy> -cp "<dir>:$CP" com.sun.fortress.Shell junit compiler_tests/X.test`, with `FORTRESS_CACHES` set to the same copy.
- **The count stage profiled or instrumented.** Make a copy of `tools/checker-count/run.sh` whose `java` line adds the JFR options and puts `<dir>` first on `-cp`, and run it as the stage itself.
- **JFR read by frames.** A single-file Java program over `jdk.jfr.consumer.RecordingFile` counts the `jdk.ExecutionSample` events whose stack holds a given class: by top frame, by inclusive frame, and by the callee of the innermost such frame. Run it as `java Agg.java <file.jfr> ExportChecker`.
- **The ladder subset on the old code.** Compile each file with `old-fortress.sh /home/user/fortress-base23 <caches> compile tests/X.fss` from the worktree's `ProjectFortress/`, write a `results.tsv` in the driver's form, and run the baseline's `classify.py` beside it.

## 14. For FACTS

- **F-287, rewritten.**
  - The fact: the export check reads every top-level operator of an api by the rules it applies to any function, under the operator's declared name only. The 157 top-level operator declarations of the twelve apis match their components, and the 9 that differed are stated once on both sides.
  - What it means: the export zero covers the operators (F-53, F-282), and a compiled call through an api operator's header finds its method.
  - The number: 157 declarations, 146 of them in `FortressLibrary.fsi`, 5 in `List.fsi` and 6 in `RangeInternals.fsi` (the zero audit's count); 67 operator names in `FortressLibrary.fsi` (the instrumented count).
  - The tests: `compiler_tests/XXXExportOperatorHeader`, `ExportOperatorMatch`, and the distance stage's per-site list.
  - Detail: sections 1, 2 and 5.3.
- **The export check's cost of reading the operators.**
  - The fact: the export check's loop over `FortressLibrary`'s api takes about 3.8 s of the count stage with the operators read, against 0.15 s for its identifiers. Most of it is `juxtaposition`'s 19 functions.
  - What it means: a later reading of the trait members' operators can expect a cost of the same order.
  - The command and its output, and the detail: section 5.2.

## 15. Questions for the curator

None new. Question 4 (a narrower return type in the component) stays open as NEW-O-1, built at its default, the check's rule.

# Rung O of climb batch 22c: the skeptic's verdict

The rung: `wip/rung-export-operators`, judged at the worker's head `95f31de40` (the change `5046b1619`, its speed pass `95f31de40`). The worker's `REPORT.md` and `record.md` were written onto the branch from the run's journal (`a39ea1e8e`). My commits: `2f67e57aa` (a correction of one sentence in each), `9756d5017` (two defects my programs measured, each in its home), and this file.

**Verdict: approved.** The change does what the section asks and no more: the export check admits every top-level operator by the overloading check's `isCheckedName`, reads each only under its declared name, and the library's 9 headers are stated once on both sides by the library's rule. The speed pass gives the same answers. The tests were seen failing on the base's code before the edit was built, and passing after the last change of code. I made no fix of the change itself; my two commits are corrections, and none is contested.

The count and distance tables in `REPORT.md` are those of the worker's head; I ran no stage after my commits, which change no code of the checker.

Machine for my runs: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for direct runs (the harness forces 4); up to two other agents of the batch beside me.

## 1. The tables, and the count stage run again

The worker's tables, read from its files: `base` equals climb batch 22's landed `checker-count.txt`; `change` adds one row, `CovariantCollection	0`; `pass` equals `change`. The distance table on the head equals climb batch 22's landed `distance.txt` but for its `#seconds` and `#machine` rows: '#total 0', '#kind export 0', '#crash none'. Its run's lines: 12 '### done' lines, all rc=0; 173 '@@SC STAGE' lines, all 'errors=0', 12 of them export stages; 14 '@@TC API' lines, all 'errors=0'.

I ran the count stage myself, once on the base build and once on the worker's head, each in the background with the command of the skill's `compiler.md`, "The checker's time", step 2 (`time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`), the base in a call set up for `/home/user/fortress-base23` and the head in one set up for this worktree:

| run | real | user | table |
|---|---|---|---|
| base build (`e0ec620a9`, the base's code; `git diff e0ec620a9 c3c22817c -- ProjectFortress Library build.xml bin` prints nothing) | 162.96 s | 218.8 s | equal to the worker's `base` |
| the worker's head, `95f31de40`'s build | 154.98 s | 214.7 s | equal to the worker's `change` and `pass` |

The worker's runs: base 163.0 s, change 170.1 s, pass 168.7 s. Same order of size; no slowdown shows.

The outputs: with each tree's path replaced by `TREE`, my head's `run.txt` equals the worker's `change` and `pass` `run.txt` files, and my base's equals the worker's `base`. Base against head, sorted, differs only in `CovariantCollection`'s two lines:

    diff <(sort base.norm) <(sort head.norm)
    4a5,6
    > @@PROBE checkApi CovariantCollection
    > @@PROBE checkApi CovariantCollection -> errors=0

So the commit's results and the head's results are the same.

## 2. Test first, read in the worker's transcript

- The failing run, call `…phYMc7`, 23:11:45 to 23:11:50 UTC: `git status --short` printed only the six new test files untracked, so no source was edited yet; `junit.sh base ... XXXExportOperatorHeader.test ExportOperatorMatch.test` printed 'Saw failure, but did not satisfy compile_err_contains', 'run ... ExportOperatorMatch (301ms) PASS', 'Saw wrong failure. compile', 'Tests run: 3,  Failures: 1'. The first build of the edit started at 23:13:06 (`…n4MGL3`).
- The last change of code: the speed pass's two edits at 23:33:25 and 23:33:29, built at 23:33:57 (`…Bdxmme`; 'Caches ... started again, empty'), then the count stage `pass`, the library order (`…dckaGX`, five rc=0, five jars), and the passing run `…byi4cY`, 23:42:31: 'Missing declarations: {#(a:String,b:String):XXXExportOperatorHeader.A ...}', 'Saw expected failure', 'run ... ExportOperatorMatch (313ms) PASS', 'OK (3 tests)'.
- The deliberate red run of the first `XXX` test and the guard's red run under a span-key shadow are in `REPORT.md` section 2, as the transcript shows them.

## 3. The diff against the section and the decisions

- `ExportChecker.scala:275`: `isCheckedName(f) && isDeclarationName(fnsInAPI, f)`, the planner's `opr782`, byte for byte. `isDeclarationName` (`:597-606`) is true of a key under which a declared function is filed by its own name. The relation's keys are `NU.getName(ast)` and `ast.getUnambiguousName` (`IndexBuilder.scala:444-445`), and `NodeFactory` makes the second from the span (`nodes_util/NodeFactory.java:442-446`, `:470-472`), so only span keys and keys holding functional methods alone are left out. Before, an identifier key with no declared function gave nothing: both branches keep only `SDeclaredFunction`s (`OverloadingChecker.scala:848-852`; `ExportChecker.scala:315-323`). So P-155's rule, the rules applied to any function, is stated neither narrower nor broader.
- The speed pass, `uncoveredDeclarations` (`:608-621`), is `coverOverloading`'s rule (`OverloadingChecker.scala:843-867`) with the cover test made only for declared functions: the same `lteq`, `!lteq`, `satisfiesReturnTypeRule` against every other member, the same oracle (`checker.globalOracle`, `OverloadingChecker.scala:76`), the same `Set[FnDecl]` answer. The worker's audit found 144 of 144 answers equal; my count run on the head has the same results as the change. The rule now has two copies, because the brief leaves `OverloadingChecker.scala` untouched, and the third reader, the abstract-function branch (`ExportChecker.scala:251`), still calls `coverOverloading`. The worker lists the edit beyond the named lines as a point to report; I agree with its placement.
- The library: the six `#` and `:` (`FortressLibrary.fss:4164-4176`) now answer the api's `CompactFullRange` types; the bodies are unchanged and their values are those types (`RangeInternals.fsi:494-495`, `:520-521`, `:540-541`; `RangeInternals.fss:1268`, `CompactFullScalarRange extends { FullScalarRange, CompactFullRange[\ZZ32\] }`). The api's `BIG ||` and `BIG |||` over a generator take the component's generic header (`FortressLibrary.fsi:2128`, `:2135`), as the team's `BIG //` (`a874948ac`, `fsi:2000`). `List.fsi` imports `CovariantCollection.{AnyCovColl}` and states the component's comprehension type (`:14`, `:116`). That is the library's practice: every other collection's api already states `AnyCovColl` there (`Set.fsi`, `Map.fsi`, `PureList.fsi`, `IntMap.fsi`, `PrefixSet.fsi`, each `opr BIG ...: Comprehension[\...,AnyCovColl,AnyCovColl\]`, as their components do). Only the files and lines the section names are edited, beyond the speed pass; no edit of `IndexBuilder.scala` or `OverloadingChecker.scala`.

## 4. My programs, the differential

Each a two-file api and component, under the compiler's prelude, compiled and run on the old code (`old-fortress.sh /home/user/fortress-base23 <tree>/tmp/old-caches compile P.fss`, then `run P`) and on the head (`bin/fortress compile P.fss`, then `run P`, with `FORTRESS_CACHES` set to a private copy of the tree's caches, so the rung's build and caches stay as they were). The operator `<->` is one the compiler's prelude does not declare.

| program (api / component) | old code | head |
|---|---|---|
| `SkOpMissing`: api `opr <->(a: String, b: String): String`; component without it | rc 0 | rc 255, 'Missing declarations: {<->(a:String,b:String):String ...}' |
| `SkOpParam`: the same api; component `opr <->(a: String, b: ZZ32): String = a` | rc 0 | rc 255, the same entry |
| `SkOpFix`: `object B`; prefix `-`, infix `-` and postfix `!` over `B` on both sides | PASS | PASS |
| `SkOpFixMiss`: the api's prefix and infix `-`; the component's infix `-` and a postfix `!` | rc 0 | rc 255, 'Missing declarations: {prefix -(a:SkOpFixMiss.B):ZZ32 ...}' |
| `SkOpGeneric`: `opr <->[\T\](a: T, b: T): T` on both sides | PASS | PASS |
| `SkOpMethod`: `object T` with `opr <->(self, o: T): ZZ32` on both sides, beside a top-level `<->` over two strings | PASS | PASS |
| `SkOpCovered`: api `<->(a: Sq, b: Sq)`; component that and `<->(a: Sh, b: Sh)`, `Sq extends Sh` | PASS | rc 255, 'Missing declarations: {<->(a:SkOpCovered.Sq,b:SkOpCovered.Sq):ZZ32 ...}' |
| `SkFnCovered`: the same with a named `pick` | rc 255, the same entry for `pick` | rc 255 |
| `SkOpByMethod`: api `object T end`, `opr <->(a: T, b: T): ZZ32`; component's `T` with `opr <->(self, o: T): ZZ32 = 5` | rc 0; a client's `T <-> T` through the api: 'REACHED', 'PASS' | rc 255, 'Missing declarations: {<->(a:SkOpByMethod.T,b:SkOpByMethod.T):ZZ32 ...}' |
| `SkFnByMethod`: the same with a named `pick(self)` | rc 255, 'Missing declarations: {pick(a:SkFnByMethod.T):ZZ32 ...}' | rc 255 |
| `SkOpGenericRen`: api `opr <->[\T\](a: T, b: T): T`; component `opr <->[\U\](a: U, b: U): U = b` | rc 0; a client's `"x" <-> "y"`: 'REACHED', then 'java.lang.Error: Unable to read serialized data for SkOpGenericRen…Arrow…Tuple…T,T…' | rc 255, 'Missing declarations: {<->[\T extends Object\](a:T,b:T):T ...}' |
| `SkFnGenericRen`: the same with a named `pick[\U\]` | rc 255, 'Missing declarations: {pick[\T extends Object\](a:T):T ...}' | rc 255 |

The same client of `SkOpGeneric`, whose names agree, prints 'REACHED', 'PASS' on the old code. Walk runs `SkOpByMethod` and `SkOpGenericRen` to 'PASS' on the head.

So the check reads every fixity, and on the head an operator is refused exactly where a named function was refused on the base. `SkOpCovered` is refused by the text's own rule, "Given a set of overloaded declarations, it is not permitted to export some of them and not others" (`Specification/basic/components/source-code.tex:424-425`): not a defect. The other two are findings 1 and 2.

The library, under walk (`SkRangeWalk`, a component that imports `List.{...}`): sizes of `2#3`, `1:4`, `(0,0)#(2,3)`, `(0,0,0)#(2,2,2)`, `(0,0):(1,2)` and `(0,0,0):(1,1,1)`; `SUM` over the first two; their bounds; `BIG ||` and `BIG |||` over a range, over 2D and 3D ranges and over lists; a `typecase` of `2#3` against `CompactFullRange[\ZZ32\]`; three `List` comprehensions. Old code and head print the same, `diff` empty:

    sizes 3 4 6 8 6 8
    bigcat 012 bigsp 0 1 2
    r is a CompactFullRange
    list <|0, 2, 4|> 3 2 <|2, 3, 4, 4, 5, 6|> 6
    PASS

The diff writes no mutable variable, field, atomic block or library state, so the programs ran at one thread only (the harness runs at four).

## 5. Findings, each with its home

1. **The export check never lets a component's functional method satisfy an api's top-level function or operator.** The text: a top-level function declaration "is satisfied by a set of top-level function and functional method declarations" (`source-code.tex:355-360`). The check keeps only declared functions (`ExportChecker.scala:618-620`; `OverloadingChecker.scala:848-852`). It was the case for named functions on the base (`SkFnByMethod`); the rung's reading carries it to operators (`SkOpByMethod`), and the compiled path supports the text's answer (the client's 'PASS' on the base). Home 2: `ProjectFortress/compiler_tests/XXXExportOperatorFunctionalMethod.test`, row 835 in `record.md`. The twelve apis hold no such pair (the distance is 0).
2. **The export check compares static parameters by name.** `equalStaticParams` asks equal names (`ExportChecker.scala:654-662`). The text names no static parameter in "Export Statements", so it is silent, and the rule is load-bearing today: the code generator names a generic template by its static parameters, so a client's call dies at the component's other name (`SkOpGenericRen` on the base). Home 3: `ProjectFortress/compiler_tests/XXXExportOperatorStaticParamName.test` asserts today's refusal, row 836, `CONTESTED`, in `record.md`. The library writes one name on both sides.
3. **One sentence of each file was not true as written.** `REPORT.md` section 1 and `record.md`'s first finding said that for identifiers the new admission "admits exactly what `isDeclaredName` admitted". It admits fewer keys, those that hold only functional methods, and compares exactly what the old admission compared. Corrected in `2f67e57aa`.

Both new tests, through the harness on the base's code (the old code tool, 2026-10-30T00:58:06Z):

    old-fortress.sh /home/user/fortress-base23 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/XXXExportOperatorFunctionalMethod.test <tree>/ProjectFortress/compiler_tests/XXXExportOperatorStaticParamName.test
     Saw failure, but did not satisfy compile_err_contains; expected
    1) .../XXXExportOperatorFunctionalMethod(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    2) .../XXXExportOperatorStaticParamName(...CommandTest)junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 2,  Failures: 2,  Errors: 0

On the old code each program compiles and its `run()` prints 'PASS'. On the head, with the rung's own two tests, in one JVM (2026-10-30T00:58:28Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests XXXExportOperatorFunctionalMethod.test XXXExportOperatorStaticParamName.test XXXExportOperatorHeader.test ExportOperatorMatch.test
        Missing declarations: {<->(a:XXXExportOperatorFunctionalMethod.T,b:XXXExportOperatorFunctionalMethod.T):ZZ32 at ...}
        Missing declarations: {<->[\T extends Object\](a:T,b:T):T at ...}
     Saw expected failure
    OK (5 tests)

The first `XXX` test red with its defect removed, for one run (the functional method replaced by a top-level `<->`, then restored; 00:58:43Z): 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1'.

## 6. The rest of the checks

- **The three homes.** Rows 782 and 827: home 1, their tests `XXXExportOperatorHeader` and the distance stage. row 834: home 3, `XXXExportOperatorHeader`, as the section gives it. Row 71's rewrite: true of the head, by the worker's ladder subset (`ListTest.fss`: 6 errors on the old code, the first `List.fsi:67`'s `ZeroIndexed`; 11 on the head, the first `CovariantCollection.fsi:23`'s `ImmutableArray`), and its cited lines (`List.fsi:69`, `:70`, `:116`; `CompilerLibrary.fsi:272`, `:221`) are the head's. My findings 1 and 2 above.
- **The ledger and sibling sites.** `ledger.py find` on 'export check', 'export operator', 'static parameter name', 'export functional method', 'serialized': rows 768, 769, 784, 802, 816 bear on the check, none on findings 1 and 2. In `ExportChecker.scala` the loop at `:274-275` was the one reader of `isDeclaredName`; trait and object members are compared by `equalListMembers` with no name filter (`:815-840`), so their operators were read already. Walk has no export check.
- **The report.** Its five provenance lines: each cited line opened, and each says what its line claims (`zero-audit.md:88-116`, `CLIMB-BATCH-22c.md:334-336`, `source-code.tex:312-314`, `:355-360`, `OverloadingChecker.scala:770-773`, `:270`, `:396`, `:405`, `FortressLibrary.fss:2355`, `fsi:2142`, `IntMap.fsi:13`, `PrefixSet.fsi:33`, `ExportChecker.scala:431-437`, `:608-621`, `IndexBuilder.scala:444-446`; the team's `a874948ac` lines `fss:3323`, `:3333`, `List.fsi:110`, `List.fss:177`). The suites ran once on `95f31de40`'s code, the head's: `ant testQuick` 1318, 86, 263, no failure, 'BUILD SUCCESSFUL'; `ant testSystem` 162, 173, 168, 180, no failure; `ant testSpecData` 130, no failure; `MethodSizeJUTest` 2, no failure. The landed compiler track is 1,315 (`climb-batch-22/gate/summary.txt`), so 1,318 is it with the rung's 3 cases.
- **Sentences made false.** None in `Specification/` (`grep -rn -i export Specification/appendices/changes.tex` finds two entries, neither on operators); none in the skill's references. In the record: F-287's "and the export check reads none of them", F-282's "it skips every top-level operator (F-287)", F-281's "the export check still reads `isDeclaredName` ...", rows 782 and 827, row 71's notes, and the comment at `OverloadingChecker.scala:768-769`, as the report lists.
- **Competing declarations.** `isDeclarationName` and `uncoveredDeclarations` occur only in `ExportChecker.scala`; the four test names (the worker's two and my two) only in their own files, in `compiler_tests/`.
- **The failure-mode question.** The rung turns quiet acceptances into refusals; it turns no loud failure into a quiet value.

## 7. Where I differ from the worker's account

- The sentence of finding 3, corrected.
- I add two defects to its account, findings 1 and 2.
- For the gather, not a correction I could make on the branch: two ledger rows cite lines of `ExportChecker.scala` without a commit, and the rung's two new functions move them by 26 lines. Row 829 cites `:658-663` (`equalParams`), now `:684-689`; rung L edits and closes it. Row 603 cites `:692-693` for the comparison of extends clauses, which is `:701` at the base and `:727` after the rung.
- My first commit's footer was not the skill's; I amended that commit, mine alone and pushed a minute before, and pushed it again with `--force-with-lease` (`277a45d3c` became `a39ea1e8e`, the same tree).

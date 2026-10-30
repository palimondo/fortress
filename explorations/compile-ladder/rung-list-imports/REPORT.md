# Climb batch 22c, rung L (`rung-list-imports`): List's two imports in the distance stage, and cleared

- problem: List imports `CovariantCollection` and `OneShotFlag` (`Library/List.fss:13`, `:15`), which the distance did not check; the planner's run of the stock stage with the two added gave '#total 13', 'export 2', 'return-type 2', 'typecheck 9' and two crashes, all in the two components (`explorations/coordinator/CLIMB-BATCH-22c.md:310`; F-288; rows 828 and 829)
- spec: `Specification/basic/components/source-code.tex:393-397`, "A field declaration is satisfied by a (possibly implicit) getter and/or setter declaration, depending on whether the field is declared to be hidden and/or settable by the exported declaration"; `Specification/basic/traits.tex:759-761`, "the var modifier without settable only affects implementations"; `Specification/basic/objects.tex:243-244`, a field may be written `BindIdOrBindIdTuple = Expr`
- precedent: the export check's field comparison less `var`, `modsL.remove(Modifiers.Var).equals(modsR.remove(Modifiers.Var))` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:852`, from `031c38bbc`; F-282); in the library, the team's devices in this file, an arm that fails for a case no narrower arm takes (upward's `NonEmpty` arm, `Library/CovariantCollection.fss:20-22`, the team's at the base's `:17-19`) and the cast (`Library/FortressLibrary.fss:33-37`; F-264); the api at the component's header (`fortress-repo` skill, `library.md`, "Designing a change")
- deviation: equalParams' comment cites `objects.tex`, "Field Declarations", where the planner's patch cited `apis.tex`; both hold the production `ApiFldMod` (`Specification/basic/components/apis.tex:121`, `Specification/basic/objects.tex:256`) (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:657-663`)
- deviation: `run.sh`'s header also gains a line on the new `none:` reason, beyond the three places that said twelve (`explorations/coordinator/tools/distance/run.sh:60-62`)
- historical: `Library/CovariantCollection.fsi`, `Library/CovariantCollection.fss`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`

Branch `wip/rung-list-imports`, cut from `c3c22817c`; commits `cf827148a` (the tests), `720285d7c` (the fix), `681dd8605` (`XXXObjectFieldWithoutType`). The harness refused this report's write to the branch; its text travels in the result. Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for the stages; rung A's worker ran its stages beside mine.

## 1. What changed and why

I took `explorations/compile-ladder/plan-22c/probes/rung-L.patch` as it is (`git apply`; it passed `git apply --check` on the base), and changed two things in it: equalParams' comment (the deviation above, which the brief asked for) and `run.sh`'s header, which the patch left saying twelve.

**`Library/CovariantCollection.fsi`** (the team's lines unchanged but these):
- `:19` `abstract dirtyIAF[\R\](a:ImmutableArray[\R,ZZ32\], i:ZZ32): ()` in `AnyCovColl` (new; the component's bodyless member, `Library/CovariantCollection.fss:81`, the team's).
- `:24` `abstract opr | self |: ZZ32` in `CovariantCollection` (new).
- `:31` `trait AnyEmpty extends AnyCovColl end` (new; the component's `:104`, the team's).
- `:33` `object Empty[\T\] extends { AnyEmpty, CovariantCollection[\T\] }` (rewritten; the team's line read `extends CovariantCollection[\T\]`).
- `:44-46` `trait AnySingleton extends AnyCovColl`, `abstract getter x(): Any`, `end` (new; the component's `:118-120`, the team's, whose getter is bodyless).
- `:48` `object Singleton[\T\](x: T) extends { AnySingleton, NonEmpty[\T\] }` (rewritten; the team's read `extends NonEmpty[\T\]`).

**`Library/CovariantCollection.fss`**:
- `:15-17` (new): `private upward[\R\](_: Empty[\R\], s: AnyCovColl): CovariantCollection[\R\] = cast[\CovariantCollection[\R\]\](s)`.
- `:18-28` (rewritten, the team's four arms): each arm's static parameters lose `I extends R`, and its first parameter is `Empty[\R\]` in place of `Empty[\I\]`; the `NonEmpty` arm answers `NonEmpty[\R\]` in place of `Singleton[\R\]` and writes `fail[\NonEmpty[\R\]\]` in place of `fail`. The bodies of the other three arms are the team's.
- `:53-55` and `:70-72` (new): `private iaf[\R, T extends R\](a: ReadableArray[\R,ZZ32\], i:ZZ32, c: CovariantCollection[\T\]): () = fail[\()\]("initArrayFrom: NonEmpty but not Singleton/Append")`, and `aaf` the same over `Array[\R,ZZ32\]` with "assignArrayFrom".
- `:87` (new): `opr |self|: ZZ32` in `trait CovariantCollection`, bodyless; `Empty`, `Singleton` and `Append` define it (`:108`, `:123`, `:136`, the team's).
- `:125` (rewritten): `Singleton`'s `dirtyIAF` writes `a.init(i,cast[\R\](x))` (the team's `a.init(i,x)`).
- `:135` (rewritten): `sz: ZZ32 = |a| + |b|` (the team's `sz = |a| + |b|`).

Why each, by the planner's table (`explorations/coordinator/CLIMB-BATCH-22c.md:312-321`): the api did not declare `dirtyIAF`, `AnyEmpty` and `AnySingleton`, so the export check refused the component (export 1); `upward`'s `R` was fixed by no argument, so the Return Type Rule over every instance (F-75) refused its arms, and the `NonEmpty` arm answered `Singleton[\R\]`, which `Append[\R,A,B\]` is not (return-type 2); no arm took a `CovariantCollection[\B\]` or an `AnyCovColl` (now `:35`, `:156`; typecheck 2); `iaf` and `aaf` took only an `Append`, and the `typecase`'s `else` passes a `CovariantCollection[\T\]` (typecheck 2); `|self|` was declared only on the objects (typecheck 4); `Singleton`'s `dirtyIAF` initialised an array of `R` with its `T` (typecheck 1); `Append`'s untyped field crashed the checker, and the object went unchecked (2 crashes; row 837). Every call of `upward` already passes the target type in its first argument (`:35`, `:37`, `:156`, `upward(Empty[\T\], ...)`), so taking `R` from `Empty[\R\]` changes no call.

**The export check** (`ExportChecker.scala:657-669`): `equalParams` compares a parameter's modifiers less `var`, as `equalLValue` compares a field's (`:852`). It is called by `equalListParams` (`:679-681`), for function headers (`:618`) and for object value parameters (`:372-374` and `:709`, both through `equalOptListParams`). A function's parameter has no modifiers: `f(var x: ZZ32): ZZ32 = x` is a syntax error at the `var` (`bin/fortress compile VarFnParam.fss`: 'VarFnParam.fss:3:6: Syntax Error'), since only the object's `Param` takes `Mods` (`ProjectFortress/src/com/sun/fortress/parser/TraitObject.rats:202-204`, against `Parameter.rats:96-101`). So the change reaches only an object's value parameters.

**The distance stage** (`explorations/coordinator/tools/distance/run.sh`): its list gains `Library/CovariantCollection.fss Library/OneShotFlag.fss` after the twelve (`:87-90`); its header says fourteen (`:3-5`, `:59`, `:118-121`) and names the new `none:` reason (`:60-62`). **`table.py`** reads the `@@TC API` lines: an api whose largest `errors=` is above 0 and which printed no `@@SC` line of its own (only a later target checked it, by the tracked method, under `probe.componentOnly`) turns `#total` into `none:`, naming it with its count; an `@@TC API-CRASH` line becomes a `#crash` row of kind `api` (`table.py:12-20`, `:54`, `:61-67`, `:94-104`). `test_classify.py`'s `Readings` gains the canned run `LATER_API` and three cases (`test_classify.py:262-310`).

## 2. The tests, failing and passing

Written first, and committed in `cf827148a` before the fix's first build (22:29 UTC).

**`ProjectFortress/compiler_tests/ExportVarObjectParameter`** (`.fsi`, `.fss`, `.test`: `compile`): api `object O(x: ZZ32) end`, component `object O(var x: ZZ32) end`. On the base's code, before the edit was built (2026-10-29T22:24:08Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh before ProjectFortress/compiler_tests ExportVarObjectParameter.test
    . compile ProjectFortress/compiler_tests/ExportVarObjectParameter ProjectFortress/compiler_tests/ExportVarObjectParameter.fss:2:11-34:
        (ObjectDecl O at ProjectFortress/compiler_tests/ExportVarObjectParameter.fsi:4.1,
         due to different parameters, different parameters for object constructors)
    Tests run: 1,  Failures: 1,  Errors: 0

After the build (2026-10-29T22:31:09Z), with seven sibling export tests in one JVM:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh after ProjectFortress/compiler_tests ExportVarObjectParameter.test ExportVarFieldMatchesField.test XXXExportFieldName.test ExportAbstractMemberDefined.test ExportAbstractMemberAbsent.test ExportComprisesEllipsisAbstract.test XXXExportMemberName.test ExportVarRungX.test
    . compile ProjectFortress/compiler_tests/ExportVarObjectParameter  OK (time = 1399ms)
    OK (10 tests)

It also passed in `ant testQuick` on the final code (below): compiler track 'Tests run: 1316, Failures: 0'.

**`ProjectFortress/tests/CovariantCollectionArmsWalk.fss`**, a walk guard: `APPCOV` of empty and non-empty collections at `ZZ32` and `Number`, each arm's result type by `typecase`, `toArray`, `toImmutableArray` and `dirtyIAF` at the wider type, and three list comprehensions (of `ZZ32`, of `Number` over `ZZ32` and `RR64` elements, and an empty one). On the base, before any library edit (2026-10-29T22:25:18Z):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-list-imports/h1 ProjectFortress/tests/CovariantCollectionArmsWalk.fss
    . interpret tmp/rung-list-imports/h1/tests/CovariantCollectionArmsWalk
    PASS
    OK (1 test)

(Two earlier runs that evening failed on my own test text, before it was right: a helper named `at`, a keyword, 'Unmatched delimiter "at"', and a subscript of a call, `r1.toArray()[0]`, 'Syntax Error'. Neither was a run of the library.) After the edit, with the planner's twelve walk tests in one harness call:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-list-imports/h13 ProjectFortress/tests/{CovariantCollectionArmsWalk,CovCollTest,CovariantTest,AnyListElementTypeWalk,ComprehensionTypedBindingWalk,ListTest,MapTest,IntMapTest,NestedListComprehensionWalk,OpenParameterListComprehensionWalk,ArrayListQuick,ListEqualityElementwise,HeapTest}.fss
    . interpret tmp/rung-list-imports/h13/tests/OpenParameterListComprehensionWalk
     OK (time = 621ms)
    OK (13 tests)

**`table.py`'s canned case**, `explorations/coordinator/tools/distance/test_classify.py`, class `Readings`: `test_an_api_error_that_prints_no_line_of_its_own_leaves_no_total` and `test_an_api_crash_is_a_crash_row`, with the guard `test_api_errors_with_lines_of_their_own_keep_the_total`. On the unchanged `table.py` (2026-10-29T22:20:10Z):

    python3 -B explorations/coordinator/tools/distance/test_classify.py Readings -v
    FAIL: test_an_api_crash_is_a_crash_row (__main__.Readings.test_an_api_crash_is_a_crash_row)
    FAIL: test_an_api_error_that_prints_no_line_of_its_own_leaves_no_total (__main__.Readings.test_an_api_error_that_prints_no_line_of_its_own_leaves_no_total)
    AssertionError: False is not true : #total	1
    FAILED (failures=2)

After (2026-10-29T22:28:49Z), the whole file:

    python3 -B explorations/coordinator/tools/distance/test_classify.py -v
    Ran 13 tests in 0.999s
    OK

The rows the canned case makes: '#total	none: 1 api(s) with errors that print no line the stage counts, checked only by a later target: OneShotFlag errors=1', and '#crash	api	CovariantCollection	NullPointerException	no type here'.

**`ProjectFortress/compiler_tests/XXXObjectFieldWithoutType`** (row 837; `compile`, `compile_err_contains=Must provide type for initializer`) is the first `XXX` test this rung adds. It is shown both ways through the harness:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx1 ProjectFortress/compiler_tests XXXObjectFieldWithoutType.test
        Must provide type for initializer List(sz)
     Saw expected failure
    OK (1 test)

and, with `sz: ZZ32 = a + b` written for one run and then restored:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx2 ProjectFortress/compiler_tests XXXObjectFieldWithoutType.test
     Saw failure, but did not satisfy compile_err_contains; expected
    junit.framework.AssertionFailedError: Saw wrong failure. compile
    Tests run: 1,  Failures: 1,  Errors: 0

Under walk the same program prints `PASS` (`bin/fortress walk XXXObjectFieldWithoutType.fss`, rc 0), so only the compiled checker shows the defect.

**The distance stage over the fourteen** is the test of the library text. It ran on the final code, starting at 22:40 UTC after the last build:

    explorations/coordinator/tools/distance/run.sh tmp/rung-list-imports/distance-postedit.txt tmp/rung-list-imports/dist-post
    #distance	setting any; -Dprobe.tolerant=true -Dprobe.all=true -Dfortress.analyzer.overload.cache=false; 14 components in one JVM (DistanceMulti -order check)
    #total	0
    #kind	export	0
    #crash	none
    #seconds	313	FortressLibrary 227

All 14 '### done' lines are rc=0. The 186 '@@SC STAGE' lines (12 apis with 5 stages, 14 components with 9) all read 'errors=0'. The 14 '@@TC API' lines all read 'errors=0', `CovariantCollection`'s and `OneShotFlag`'s among them; on this tree only the `List` target checks those two apis.

## 3. The tables

**The distance**, before and after. Before: the planner's run b14 on the base with the two components added (`CLIMB-BATCH-22c.md:310`; not run again here): '#total 13', 'export 2', 'return-type 2', 'typecheck 9', '#unit component CovariantCollection 12', '#unit component OneShotFlag 1', and two crashes ('Cannot handle (LValue ...' on `Append`, 'Must provide type for initializer List(sz)'). After: the table above, '#total 0', every kind 0, '#crash none'. So the 13 sites and the two crashes go, and nothing comes. Against the last landed gate's table, which checked the twelve:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-22/gate/distance.txt tmp/rung-list-imports/distance-postedit.txt
    DISTANCE SAME   0

    python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv tmp/rung-list-imports/dist-post/errors.tsv
    landed 0 now 0
    export 'does not define all declarations': landed 0 entries, now 0

`errors.tsv` holds only its header line, as the landed per-site list does: compared row by row, no site moved.

**The count**, on the final code (the `change` run below): its table equals the landed one; `diff explorations/compile-ladder/climb-batch-22/gate/checker-count.txt tmp/count/change.txt` prints nothing. It has twelve `#api` rows at 0, '#total 0', '#locations 0', '#crash none'. On this rung alone the count's `FortressLibrary` does not import `CovariantCollection`; rung O's `List.fsi` import adds its api row.

## 4. The checker's time and the speed pass

Timed as `compiler.md`, "The checker's time", says, with this rung's change committed (`720285d7c`):

    export W=<tree> N=base|change ; time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N

- `base`: 179 s (`real 2m59.245s`), load at start 1.37 0.93 0.62. It started at 22:20 UTC in my worktree, before any source of the checker or the library was edited, so it ran the base's code (decision 12).
- `change`: 221 s (`real 3m40.598s`), load at start 2.92 2.52 1.67, beside rung A's distance stage and an ant suite.
- The tables: `diff tmp/count/base.txt tmp/count/change.txt` prints nothing. The two `run.txt` files, with each tree's path replaced by `TREE`: `diff` prints nothing (0 lines). So the results are the same. The times differ by no more than the noise of a loaded machine, nowhere near a slowdown of several times.

**The profile** (JFR on the count stage's checker, run on `change` through a copy of `checker-count/run.sh` with `-XX:StartFlightRecording=filename=...,settings=profile`): 12,981 execution samples. Hot methods (`jfr view hot-methods`): `scala.runtime.BoxesRunTime.equals2` 5.20 %, `Walker.walkCases7$` 5.04 %, `scala.runtime.Statics.anyHash` 4.70 %, `ASTGenHelper$.scalaify` 4.37 %, `Walker.walkCases0` 3.32 %, `Walker.walkCases4` 3.10 %. Inclusive, by stack: `TypeAnalyzer` 70.6 %, `Formula` 18.9 %, `OverloadingChecker` 15.9 %, `STypeChecker` 4.4 %, the whole `ExportChecker` 62 samples (0.5 %), and `equalParams` 1 sample. Of the export check's 62 samples, 57 are in its loop over the api's functions, in `coverOverloading` at `ExportChecker.scala:279` (37) and `:282` (20). That loop is rung O's, not this rung's function.

**The pass has no gain to take.** `equalParams`, the one function this rung may change, holds 1 sample in 12,981, and its `remove(Modifiers.Var)` is a bit-mask operation. So the pass changes nothing. No `pass` run was made, since the code did not change after `change`, and no reuse needs an audit. `ant testOnly -DtestPattern=MethodSizeJUTest`: 'Tests run: 2, Failures: 0'.

## 5. Whole suites, once each on the final code

Each ran on the code of `720285d7c`, which is the head's code: `681dd8605` adds test files only. The commands: `ant testQuick`, `ant testSystem`, `ant testSpecData`, from the tree's root.

- `ant testQuick` (the checker changed): library 'Tests run: 86, Failures: 0, Errors: 0', othercompiler 'Tests run: 263, Failures: 0, Errors: 0', compiler 'Tests run: 1316, Failures: 0, Errors: 0' (1315 landed, and `ExportVarObjectParameter`); 'BUILD SUCCESSFUL', 'Total time: 12 minutes 0 seconds'.
- `ant testSystem` (the library changed, P-124): shards 'Tests run: 174', '162', '170', '178', 'Failures: 0, Errors: 0', 684 in all (683 landed, and `CovariantCollectionArmsWalk`); 'BUILD SUCCESSFUL', 'Total time: 5 minutes 50 seconds'.
- `ant testSpecData`: 'Tests run: 130, Failures: 0, Errors: 0'; 'BUILD SUCCESSFUL'.
- `XXXObjectFieldWithoutType` was added after `testQuick`. It is a test file only; its harness runs are in section 2.
- The 52 team demos were not run: the brief gives them to the gather, on the merged tree.

## 6. Where the fix belongs, and the precedent

- The export check is the component stage of `StaticChecker.checkCompilationUnit` (`explorations/coordinator/map/modules-and-phases.md`, B.6), and `equalParams` is where an object's value parameters are compared (`ExportChecker.scala:372-374`, `:709`). `CovariantCollection`'s errors are in its own text, and the library is fixed in the library (`library.md`, "Designing a change").
- The precedent is `equalLValue`'s `remove(Modifiers.Var)` (`:852`), the revival's (`031c38bbc`), on the same reasoning (traits.tex, "Abstract Field Declarations"). The file has five comparisons of modifiers (`:232`, `:615-616`, `:668`, `:703`, `:852`), and two of them can meet a `var`. One is the top-level variable's at `:232`, which the specification's rule compares whole ("the modifiers including the mutability of a variable must be the same", quoted at `:217-219`). The other is the parameter's, this rung's. Function and trait headers carry no `var`.
- In the library, I followed the team's devices in this file: the failing arm (upward's `NonEmpty` arm) for `iaf` and `aaf`; the cast (F-264, and `List.fss:179`'s own `cast[\CovariantCollection[\T\]\](cc)`) for `upward`'s general arm and `Singleton`'s `dirtyIAF`; and the api at the component's header for the api's lines.

## 7. What the specification settles

- The field rule (`source-code.tex:393-397`) lets a getter satisfy a field, and `var` without `settable` only affects implementations (`traits.tex:759-761`). An object's value parameter is a field (`objects.tex`, "Object Declarations": only a `transient` parameter is not one, `:211-213`). So `OneShot(var canTryIt: Boolean)` satisfies the api's `OneShot(canTryIt: Boolean)`.
- A field may leave out its type (`objects.tex:243-244`, `FldDecl ::= ... | BindIdOrBindIdTuple = Expr`). So row 837 is a checker gap that the specification settles: home 2.
- Found by reading, and not settled: the api grammar's `AbsObjectDecl` takes the component's `ObjectHeader` (`Specification/basic/components/apis.tex:87-88`), whose `ObjectParam` admits `var` (`Specification/basic/objects.tex:104-109`). The Working Draft has the same text (`Specification-1.0-frozen/basic/components/apis.tex:87-88`, `objects.tex:104-109`). The parser's syntax check allows an api object's parameter only `ApiFldMod` (`ProjectFortress/src/com/sun/fortress/parser_util/SyntaxChecker.java:154-157`), and traits.tex says that abstract field declarations do not include `var`. So "an api cannot write `var` on an object's parameter" is the rule of the syntax check and of the prose, not of the grammar (row 838, `CONTESTED`; for the curator). The rung's check holds under either answer, since it compares a parameter less `var` on both sides.
- No sentence of `Specification/` speaks of an api object's parameter modifiers, or of `CovariantCollection` or `OneShotFlag`: `grep -rln 'CovariantCollection\|OneShot\|row~82[89]' Specification/` prints nothing, and `grep -n -i 'object parameter\|value parameter' Specification/basic/components/*.tex` prints nothing.

## 8. Old against new

- **The open-type comprehension** (`OpenParameterListComprehensionWalk`'s `copyOf`, as a program of its own run with `-debug stacktrace`): both trees end in `CastError`. The old code raises it at `Library/List.fss:179:65-98`, the unwrap's cast, called from `CovariantCollection.fss:146`. The edit raises it at `Library/CovariantCollection.fss:17:5-38`, upward's general arm, called from `:156`. So the test's verdict does not change, and the place the exception is raised does (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <caches> walk -debug stacktrace CastProbe.fss`, and `bin/fortress walk -debug stacktrace CastProbe.fss`).
- **The ladder subset** (section 9): 46 programs compiled on the old code and on the edit; the first error is the same in all 46.
- No walk value moves: `CovariantCollectionArmsWalk` asserts the same values on the base and after; `testSystem` ran 684 tests with no failure; the planner's twelve walk tests pass.

## 9. The ladder subset

No ladder program has a recorded first error that names `OneShot`, `CovariantCollection` or an object constructor's parameters (`grep` over `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`). I ran the 46 ladder programs that import `CovariantCollection` or a component that imports it, since their first errors can sit in its api. The drivers `run-subset.sh` and `classify.py` were copied under `tmp/rung-list-imports/ladder/` (`gate.md`, "The ladder regression") and ran with the tree's caches after the library order. All 46 stay at `disambiguate`, and none is in the gate's pass list. Against the baseline's `ladder.tsv`, 26 keep their first error and 20 changed it: 19 went from `LexicographicOrder is undefined.` to `ZeroIndexed is undefined.`, and `IntMapTest` went from `Comprehension` to `ImmutableArray`. The same 46 compiled on the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 <caches> compile X.fss`) give the same first error as the edit in all 46, so those 20 changes came before this rung. The rung moves one thing: in 24 of the programs the first error, 'ImmutableArray is undefined.', is in `CovariantCollection.fsi`. It sits at `:23:25-37` on the old code and at `:19:30-42` on the edit, because the new `dirtyIAF` line is now the api's first mention of `ImmutableArray`. That is a position in a library file the change moved, with the same message and the same phase.

## 10. Sentences made false

In `Specification/`, by the skeptic's reading: two sentences that ask a satisfying object declaration for the api's header, which holds the value parameters with their modifiers, `source-code.tex:372-379` ("has the same header") and `apis.tex:256` ("The header and type of $d'$ must be the same"), made false for a parameter written `var` in the component only; quoted in `record.md`, "Sentences of the specification made false". The field rule, `source-code.tex:393-397`, still holds.

In the record, for the gather:
- F-288: "`List` imports `CovariantCollection` and `OneShotFlag`, which the compiled checker refuses" and "The distance checks only their apis, during its `List` run". The checker now accepts both, and the distance checks both components.
- F-53: "its twelve apis and their twelve components". The stage now runs fourteen components: twelve apis with every stage, and two apis by the tracked method.
- F-290: "Outside the twelve ... 30 of the library's 40 other components". `CovariantCollection` and `OneShotFlag` were among them, with 12 errors and 1.
- Rows 828 and 829: their claims (both closed by this rung).
- `explorations/reviews/phase3-exit/zero-audit.md:72`, "`table.py` reads no `@@TC API ... errors=N`, `API-CRASH` ... line": it reads both now. It still does not read `COMPONENT-CRASH`.
- F-282, "a field by its name, its modifiers other than `var` and its type", and the `fortress-repo` skill's `library.md`, "It matches a field by its name, its type and its modifiers other than `var`": not false, but an object's value parameter is now matched the same way.
- `CLIMB-BATCH-22c.md`'s and the brief's "An api cannot write var on an object's parameter (the api grammar's ApiFldMod ...)": the grammar admits it, and the syntax check refuses it (section 7).

## 11. Points to report

- **rung-L.patch was taken as it is**, with two changes: equalParams' comment now cites `objects.tex`, "Field Declarations" (`ExportChecker.scala:657-663`), and `run.sh`'s header says fourteen (`run.sh:3-5`, `:59`, `:118-121`). Section 1 gives each line of `CovariantCollection` I wrote, with the team's lines marked.
- **The distance over the fourteen**: before, 13 errors and two crashes (the planner's run); after, 0 and `#crash none`. No site comes (section 3). **The count**: 0, equal to the landed table.
- **The count's seconds**: base 179, change 221; the profile's top frames, and no gain to take (section 4).
- **Walk**: no value moves and no test's verdict changes. `OpenParameterListComprehensionWalk` passes; its `CastError` is now raised at `Library/CovariantCollection.fss:17` instead of `Library/List.fss:179` (section 8).
- **row 837**, with its gated `XXX` test `compiler_tests/XXXObjectFieldWithoutType`. **Rows 828 and 829** are the gather's to close: 828 by the distance stage, 829 by `ExportVarObjectParameter`. Also **row 838** (section 7).
- **table.py's change and its canned case**: sections 1 and 2.
- **Sentences made false**: section 10.
- **Files beyond those named**: `ProjectFortress/compiler_tests/XXXObjectFieldWithoutType.fss` and `.test`, in a folder the brief gives me for tests; and `run.sh:60-62`, the `#total` row's description, beyond the header's three places.

## 12. Decisions

1. **rung-L.patch as it is** for the library, the stage's list and the check. Not taken: my own devices for `CovariantCollection`. The brief's defaults (forks 7 to 10) and the planner's measurement of this text ('#total 0', '#crash none', run l3) argue against them.
2. **`OneShot`'s parameter matched by the check less `var`** (fork 8). Not taken:
   - the api writing `var`, which the parser refuses before the checker ('var cannot modify an object parameter, canTryIt', the planner's l1; `SyntaxChecker.java:154-157`);
   - `OneShotFlag`'s component keeping its flag in a `var` field of its own beside a plain parameter: `OneShotFlag`'s files are not mine, and it changes the team's object;
   - the syntax check admitting `var` in an api: the parser is not mine (row 838);
   - dropping `var` only for object parameters, in `equalOptListParams`: the same effect, since a function's parameter carries no modifiers, and the brief names `equalParams`.
3. **The export entry**: the api states the component's members and headers. Not taken: removing `AnyEmpty`, `AnySingleton` or `AnyCovColl`'s bodyless `dirtyIAF` from the component. `Append`'s `dirtyIAF` calls `dirtyIAF` through `NonEmpty` (`:140`, `:142`), and the traits are the team's design.
4. **`upward`'s return types**: the first argument `Empty[\R\]` carries `R`, and the `NonEmpty` arm answers `NonEmpty[\R\]`. Not taken: explicit static arguments at the three calls, which already pass `Empty[\T\]`; and one `upward` with a `typecase`, which replaces the team's arms.
5. **No arm over `AnyCovColl`**: one more arm, which casts. Not taken: an arm that fails (the planner's l2, which turned `OpenParameterListComprehensionWalk` red: 'FAIL: upward: not a covariant collection'); and a cast at each of the three calls.
6. **`iaf` and `aaf`**: one arm each that fails, the team's device. Not taken: a cast of `c` to `Append`, whose `A` and `B` the `else` branch cannot name.
7. **`|self|`**: declared bodyless on the trait. Not taken: declaring it on `NonEmpty` only, which leaves the trait's own `toImmutableArray` and `toArray` (`:89`, `:94`) without it.
8. **`Singleton`'s `dirtyIAF`**: the cast. Not taken: a bound `T extends R`, which `AnyCovColl`'s `dirtyIAF[\R\]` cannot state, since `T` is the object's.
9. **`Append`'s field**: its type written. Not taken: fixing the checker's refusal (row 837), which is not this rung's.
10. **`table.py`'s reading** (fork 10): `none:` when an api's errors print no line. Not taken: adding the api's `errors=` into `#total`, which would put a number with no sites and no class into the table; and a `#check` row beside an unchanged total, which would leave a total that misses errors. `API-CRASH` becomes a `#crash` row of kind `api`. `COMPONENT-CRASH` is left unread, since the brief names the api lines only.
11. **row 837 as a gated `XXX` compile test** (home 2), not a row with reproducer `none`: the grammar settles it.
12. **The base timing in my worktree, before my edit**, not in `/home/user/fortress-base23`. The brief lets nobody run anything in the base build but the old code through `old-fortress.sh`, and the skill's setup for a call there would write its `tmp/`. My worktree was seeded from the base build, and no source but my tests had been edited when the timing ran.
13. **The speed pass changes nothing**: `equalParams` is 1 sample of 12,981. The export check's hot loop is rung O's, and the brief keeps me to `equalParams`.
14. **The ladder subset**: the 46 programs that import `CovariantCollection` or an importer of it. I compared them with the baseline's `ladder.tsv` and with the old code, since the gate runs none of them.
15. **The demos left to the gather**, as the brief says, over `tests-running.md`, "Outside the gate".
16. **The walk guard** asserts each arm's result type by `typecase` on its instance, and calls `dirtyIAF` directly, since nothing outside the component calls it.

No decision of the curator covers 10 to 16 beyond the brief's defaults.

## 13. Defects and their homes

- Row 828, `CovariantCollection`'s 12 errors and 2 crashes: home 1, repaired. Its test is the distance stage over the fourteen ('#total 0', '#crash none'), and `CovariantCollectionArmsWalk` guards walk's values.
- Row 829, `OneShotFlag`'s export error: home 1, repaired; tested by `compiler_tests/ExportVarObjectParameter`.
- row 837, the checker's refusal of an object's field without a type: home 2; gated by `compiler_tests/XXXObjectFieldWithoutType`.
- row 838, the syntax check's refusal of `var` on an api object's parameter, where the api grammar admits it: home 3 (a conflict, `CONTESTED`). Its reproducer is `none`: no plain gated test can pin a compile refusal, and an `XXX` test would assert one side's answer.
- The distance stage's unread api lines (the zero audit's A.3, gap 1, its api half): home 1, tested by `test_classify.py`'s `Readings`. Its `COMPONENT-CRASH` half is not repaired; it is a tool's gap with no ledger row, and the gather has it in the notes.

## 14. For FACTS

- **The fourteen components of the distance pass the compiled checker, and the stage counts every api's own errors.** With `CovariantCollection` and `OneShotFlag` added after the twelve (`tools/distance/run.sh:87-90`), the distance stage reads '#total 0' and '#crash none' over the fourteen, at setting `any`. The two import nothing, so the fourteen hold every component the twelve import. `CovariantCollection`'s api states its component's members and headers, and its `upward` takes the target type from its first argument. The export check matches an object's value parameter by its modifiers other than `var`, as it matches a field (`ExportChecker.scala:668`). `table.py` turns `#total` into `none:` for an api whose `@@TC API` count is above 0 with no `@@SC` line of its own, and turns an `API-CRASH` into a `#crash` row. Tests: the distance stage; `compiler_tests/ExportVarObjectParameter`; `tools/distance/test_classify.py`, `Readings`; and `tests/CovariantCollectionArmsWalk.fss` for walk's values. Detail: `compile-ladder/rung-list-imports/REPORT.md`, sections 1 to 3. It replaces F-288 and corrects F-53's "twelve".

## 15. Commands worked out

- The export check's share of a profile: run `jfr print --events jdk.ExecutionSample --stack-depth 400 rec.jfr`, split the output at 'jdk.ExecutionSample {', and count each sample whose stack holds the class's name.
- First errors on the old code beside the edit, for programs the gate does not run: compile each file from a scratch folder with `old-fortress.sh <base-build> <caches> compile X.fss`, and compare the first message and first location with the subset driver's `raw/tests/X.fss.compile`.

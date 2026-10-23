# Rung E of climb batch 21b: the api aligned with its component, and the export check brought to its rule

- problem: the export error of the last landed gate, one site whose message names 43 traits and objects of `FortressLibrary` (`explorations/compile-ladder/gate/distance-sites.tsv:2`), and the export probe that sorted them into 115 differences and found the check's three defects, rows 800 to 802 (`explorations/perf-probes/export-check-full/REPORT.md:5-25`, `:304-329`).
- spec: `Specification/basic/components/apis.tex:250-257` ("A matching definition of a declaration $d$ is a definition $d'$ with the same name as $d$ that includes definitions for all declarations other than the methods or fields declared abstract in $d$"), with `Specification/basic/components/source-code.tex:372-385`.
- precedent: the check's own `equalIdOrOps` for names (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:560-568`); the probe's shadow for 4i (`explorations/perf-probes/export-check-full/export-check-shadow.patch`, its `isAbstractMember` and count rule); the api's own `abstract` members for the 4h lines (`Library/FortressLibrary.fsi:1578`); `close` and `whenUnconsumed` beside `consume` for the prelude's line (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1168-1169`).
- deviation: the message of a field names it, "different field x @", where the check said "different field @" (`ExportChecker.scala:799-803`); a field needs no definition only when every name it declares is abstract, where the shadow took any (`ExportChecker.scala:775-779`); one line of the compiler's prelude, outside the files the brief names (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1170`).
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`, `Library/FortressLibrary.fsi`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`.

## 1. What changed and why

Two commits on `wip/rung-export-align`, from the base `aa5c67d48`, both pushed:

- `687c4dcfa`: five compiled tests, each an api and its component, seen failing on the base (section 2).
- `18179f051`: the check, the api, one prelude line, one test respelled and one expected failure added.

**The check** (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala`):

- Row 800: `equalFnHeaders` compares the two declarations' names, through a new `equalNames` that hands two `IdOrOp`s to the check's own `equalIdOrOps` (api, text, fixity, enclosing) (`:597-604`, called at `:612`). `equalMember` and `existsMatching` both go through it, so a trait's member is matched by its name and its header; a top-level function's two sides already share the name, from `matchFirst`.
- Row 801: `equalLValue`'s comparison of names and modifiers is joined to its type match in one expression (`:841-845`). Before, Scala ended the statement at the newline before `(`, and the type match alone was the result.
- Row 802: `allAbstractsMadePublic` calls `equalMember(r, d)`, the api's member first, as `equalMember` takes them (`:761`).
- 4i: `isAbstractMember` (`:775-779`); `equalListMembers` counts the api's members that are not abstract against the component's (`:791`), and an api member written `abstract` needs no matching member (`:796`). The method's comment quotes `apis.tex` (`:783-787`).
- The field's message names the field (`:799-803`), as a method's names the method.

**The api** (`Library/FortressLibrary.fsi`): the planner's `explorations/compile-ladder/plan-21/probes/run2-api.patch`, applied with `git apply` as it is: 88 declaration lines, 87 insertions and 64 deletions (section 6 lists them).

**The prelude** (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1170`): `consume(): () throws IOException`, as its api declares it (`CompilerBuiltin.fsi:600`) and as its siblings `close` and `whenUnconsumed` write it on both sides (`CompilerBuiltin.fss:1168-1169`); the native it calls throws as theirs do (`ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java:65-75`). The name check refused the prelude without it (section 3); by reading, the stock check had matched the api's `consume` through `close` or `whenUnconsumed`, whose header `(): () throws IOException` is the same. Nothing calls `consume` in the compiled path (grep of `CompilerBuiltin.fss`, `Library/Compiler*.fss` and the three compiled test folders).

**The tests** (`ProjectFortress/compiler_tests/`):

| Test | Shape | Base | Now |
|---|---|---|---|
| `XXXExportMemberName` | api `trait T f(): ZZ32 end`, component `trait T g(): ZZ32 = 1 end` | compiles (rc 0) | refused, `compile_err_contains=different method f` |
| `XXXExportFieldName` | api `object O x: ZZ32 end`, component `object O var y: ZZ32 := 1 end` | compiles (rc 0) | refused, `different field x` |
| `ExportComprisesEllipsisAbstract` | api `trait Q comprises { ... } abstract num(self): ZZ32 end`, component `trait Q comprises { R }` with the same member and `object R extends Q` defining it; `num(q)` with `q: Q = R` | refused, 'Asbtract method num ... is not declared in the API' | links, runs, `PASS` |
| `ExportAbstractMemberDefined` | api `abstract f(): ZZ32`, component `f(): ZZ32 = 1` | refused, 'different method f' | compiles |
| `ExportAbstractMemberAbsent` | api `abstract f(): ZZ32` and `g(): ZZ32`, component `g(): ZZ32 = 2` only | refused, 'missing members of the trait/object in the component' | compiles |
| `XXXFunctionalMethodComprisedObject`, with `FunctionalMethodComprisedObjectLink` | `num(R)` on the object itself, the same trait and object without an api | links; the run dies, `NoSuchMethodError` | the same, an expected failure (section 8, NEW-E-1) |

`ExportComprisesEllipsisAbstract` first called `num(R)`, which the compiled path cannot run whatever the export check does (section 8). It now calls `num(q)` through a `Q`-typed value, as `AbstractFunctionalMethodImplementedByComprised` does, and keeps its subject; the respelled test was seen failing on the old code (section 2).

No edit of the component's bodies: `Library/FortressLibrary.fss` is unchanged (`git diff --name-only aa5c67d48` lists `Library/FortressLibrary.fsi`, `ExportChecker.scala`, `CompilerBuiltin.fss` and the test files).

## 2. The failing runs and the passing runs

On the base's code, before the edit was first built (the run ended 20:13:27Z; the build of the edit started 20:15:28Z):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests \
        XXXExportMemberName.test XXXExportFieldName.test ExportComprisesEllipsisAbstract.test \
        ExportAbstractMemberDefined.test ExportAbstractMemberAbsent.test

    # junit.sh base 2026-10-23T20:13:20Z; nproc 4; ... tree aa5c67d48; ...
    . compile ProjectFortress/compiler_tests/XXXExportMemberName
     Saw failure, but did not satisfy compile_err_contains; expected
    different method f
    Tests run: 6,  Failures: 6,  Errors: 0

The two refusal tests' programs compile on the base: `bin/fortress compile compiler_tests/XXXExportMemberName.fss` and `compiler_tests/XXXExportFieldName.fss` print `rc=0` each (a direct compile in a scratch copy of the caches, the same code).

The respelled test and the expected failure, on the old code (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base21b <tree>/tmp/old-caches junit .../ExportComprisesEllipsisAbstract.test .../FunctionalMethodComprisedObjectLink.test .../XXXFunctionalMethodComprisedObject.test`, 20:24:00Z):

    (TraitDecl Q at .../ExportComprisesEllipsisAbstract.fsi:4.1,
     due to Asbtract method num @ .../ExportComprisesEllipsisAbstract.fss:6:5-7:1 is not declared in the API)
    . run .../XXXFunctionalMethodComprisedObject (412ms) REACHED
    Saw expected failure (Exit code != 0)
    Tests run: 4,  Failures: 2,  Errors: 0

On the edit (`junit.sh fix2` on the seven new files, 20:24:16Z): `OK (8 tests)`. The last run after the last change of code is `ant testQuick` (section 5): the compiler track 'Tests run: 1301, Failures: 0, Errors: 0'.

The first `XXX` test, `XXXExportMemberName`, shown red on a deliberate fix: with `g` renamed `f` in its component for one run (`junit.sh red ... XXXExportMemberName.test`): 'Saw failure, but did not satisfy compile_err_contains; expected different method f', 'Tests run: 1,  Failures: 1'; the file restored (`git diff` empty). The run-time pair, with its failing `assert(num(R), ...)` line removed for one run: 'REACHED', 'PASS', 'Did not see expected failure', 'Tests run: 2,  Failures: 1'; restored (`cmp`).

## 3. The prelude's line: how the name check found it

After the build, the library order's second compile stopped:

    ../bin/fortress compile LibraryBuiltin/CompilerBuiltin.fss
    (TraitDecl JavaBufferedReader at .../CompilerBuiltin.fsi:592.1,
     due to different method consume @ .../CompilerBuiltin.fsi:600:3-601:1)
    File CompilerBuiltin.fss has 1 error.
    ## LibraryBuiltin/CompilerBuiltin.fss rc=255

Through the harness, with the new checker and before the line's repair (`junit.sh nocb`, 20:19:08Z), `ExportComprisesEllipsisAbstract`'s link stopped on the same refusal, 'File ExportComprisesEllipsisAbstract.fss has 1 error.'. With the line, the compile gives `rc=0` and the five library jars are in `bytecode_cache/`. Every compiled test links against this compile, so the suites guard it.

The team wrote the component's line without `throws` (`git show a874948ac:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, line 1076). The other way, `throws IOException` out of the api's line, would make `consume` the one member of `JavaBufferedReader` whose api hides the exception that its native throws.

## 4. Where the fix belongs, and the precedent search

- Place: `spec-to-implementation.md` gives the component and api check as `ExportChecker.scala` (`explorations/coordinator/map/spec-to-implementation.md:153`); `modules-and-phases.md` B.6 runs export checking after the component's type check (`explorations/coordinator/map/modules-and-phases.md:351-363`).
- In the file, every other named thing is compared by name: top-level variables and types by key, static parameters by `equalIdOrOps` (`ExportChecker.scala:623`), keyword types by `equalIds` (`:548`). `equalFnHeaders` and `equalLValue` were its two comparisons of a named thing that dropped the name: one site each, so no other sites to count.
- 4i follows the probe's shadow, which applied it to the whole library and measured 20 to 15 entries (probe, section 3.2).
- The api's way: the library's api already writes `abstract` on a member whose component has no body (`Library/FortressLibrary.fsi:1578`, `abstract getter mutability():String`; `Range`'s `abstract opr IN`, `:2215`); 4h writes it on the 57 others, P-27's own practice.
- Every way the language offers for a member the component leaves without a body: written `abstract` in the api (taken, the planner's text); left out of the api (removes team declarations from Part IV); a body given in the component (an edit of the component's bodies, which the brief excludes).

## 5. Suites and stages

- `ant testQuick`, once, on `18179f051`: 'Tests run: 86, Failures: 0' (library), 'Tests run: 263, Failures: 0' (other-compiler), 'Tests run: 1301, Failures: 0, Errors: 0' (compiler), 'BUILD SUCCESSFUL', 'Total time: 6 minutes 11 seconds'. The landed gate's compiler track is 1,293 (`explorations/compile-ladder/climb-batch-21/gate/summary.txt:2`); 1,301 is 1,293 and this rung's eight cases. No other compiled test's verdict changed.
- `ant testSpecData`, once (the api changed, P-124): 'Tests run: 130, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL'.
- Walk, which runs the component: `explorations/compile-ladder/rung-inference-walk/harness-one.sh` on 21 interpreter tests in one JVM: the probe's nine (`IntSemanticsRungI`, `PowChooseLcmRungE`, `RangePrototype`, `RangeTest`, `RangeDeclarations`, `Brackets`, `ComparisonLazyLexico`, `ExclusionRemainderRungH`, `UnsignedTest`) and twelve that reach the follow-on lines and `Array2`'s subscripts (`Array2SliceAtNonzeroBase`, `Array2SubscriptInBounds`, `VectorMatrixCastsWalk`, `XXXArray2ShiftedSlice`, `subArray`, `BigNum`, `objectZZ`, `RangeTupleShiftWalk`, `StridedRange3DShiftWalk`, `wrapZZ`, `rshiftbug`, `NestedReductionFusion`): 'OK (21 tests)'. `explorations/coordinator/tools/mg-run.sh <tmp> rungE 1`: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' for `MicroGptFlatQuick` (rc=0, 54 s) and `MicroGptAplQuick` (rc=0, 64 s). `ant testSystem` was not run: no Java or Scala of walk changed (`tests-running.md`, "When to run a whole suite").

**The count stage.** Its after is the timed run of `18179f051` (section 7, `change`), the final code: nothing changed since. Its table equals the landed one (`diff` against `explorations/compile-ladder/climb-batch-21/gate/checker-count.txt` prints nothing): '#total 3', '#locations 3', '#crash none', every api 0. The stage never reaches the export check: its run stops at the `FortressLibrary` component's three type errors ('File FortressLibrary.fss has 3 errors.'), and its output holds no export message, on the base and on the edit alike.

**The distance stage**, `explorations/coordinator/tools/distance/run.sh` on `18179f051`, once:

    #total	5
    #kind	export	1
    #crash	none
    #seconds	185	FortressLibrary 130

`explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-21/gate/distance.txt <table>` prints 'DISTANCE SAME   5'; no `#kind` or `#class` row moved. `python3 -I explorations/perf-probes/array-sites/compare-sites.py explorations/compile-ladder/gate/distance-sites.tsv <scratch>/errors.tsv`:

    landed 5 now 5
    export 'does not define all declarations': landed 0 entries, now 0
    export 'are not matched by the declarations': landed 43 entries, now 15

Read by row against the per-site list: the four other sites (the two `BIG MIN` sites at `FortressLibrary.fss:4395` and `:4401`, the fused arm at `:1466`, `List.fss:146`) are the landed ones; no site came, in `FortressLibrary` or in any other component.

**The export error, entry by entry.** Gone, 29 traits and objects (by 4h and its follow-on, by 4i, or by row 802's fix): `Comparison`, `AnyUniqueItem`, `Indexed1`, `Indexed2`, `Indexed3`, `Indexed`, `ZeroIndexed`, `ReadableArray`, `ReadableArray1`, `EqualTo`, `Reduction`, `ReductionPair`, `StandardMin`, `StandardMax`, `FilterGenerator`, `Range`, `OpenRange`, `RangeWithExtent`, `BoundedRange`, `RangeWithLeft`, `RangeWithRight`, `FullRange`, `Generator2`, `RelationalPredicateCondition`, `Number`, `QQ`, `Integral`, `Equality`, `AnyMaybe`. With the 14 that stay, that is 43; `compare-sites.py` counts 34 'entry GONE' and 6 'entry COME', since 5 entries that stay changed their text and one entry came.

The 15 now, each with its cause and its home:

| Entry | Now | At the landed gate | Home |
|---|---|---|---|
| `Just` | different method `_[_]` | the same | P-90 |
| `Nothing` | different method `_[_]` | the same | P-90 |
| `Maybe` | different extends clauses | the same | P-90 |
| `String` | different method `size`; `Asbtract method size`; different excludes clauses | missing members; the same | P-155's later work |
| `RR64` | different method `^` | different method `\|\_/\|` | the probe's question 1 (rounding, and `^` beside it) |
| `Condition` | different extends clauses; different method `indices` | extends; different method `indexValuePairs` | the probe's question 2 |
| `TotalComparison` | different method `=` | not named | the probe's section 3.3: the api to write the component's two `=` forms |
| `DelegatedIndexed` | missing members | the same | the probe's section 3.3 |
| `ImmutableArray1`, `Array1` | missing members | the same | the probe's section 3.3 |
| `Array2` | different method `bounds` | `bounds`, and `Asbtract method put` | the probe's section 3.3 |
| `Array3` | different method `bounds` | the same | the probe's section 3.3 |
| `ActualReduction` | different method `leftDistribute` | missing members | the probe's section 3.3 |
| `BigReduction`, `Comprehension` | missing members | the same | the probe's section 3.3 |

`TotalComparison` is the one entry that comes: the stock check accepted its api's `=(self, other:Comparison)` through `>=`, of the same header (probe, section 2, "Accepted by the name gap"); with names compared it is refused. `RR64` and `Condition` now name the members that the name gap hid (`^` and `indices`), since the members the stock check named first are now matched or skipped. This is the probe's arithmetic: 43 to 20 by the api's lines, 15 with 4i, `QQ` out by row 802's fix, `TotalComparison` in by row 800's.

**The ladder subset**, after the edit, with the drivers copied under `tmp/rung-export-align/ladder/` as `gate.md` says: one file whose recorded first error is the export check's, `tests/testTest1.fss` ('Component testTest1 exports API Executable' in `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`): 'typecheck', the same first error ('Missing declarations: {run():() at .../Library/Executable.fsi:16:3-17:1}'). No recorded first error names a member of `JavaBufferedReader`. The eighteen microGPT components: `diff <(mg_phases explorations/compile-ladder/climb-batch-21/gate/ladder/microgpt-phase.md) <(mg_phases <subset>/microgpt-phase.md)` prints nothing, each `disambiguate`, as landed and as the baseline.

## 6. The declarations that join or change in the api, and so in Part IV

Part IV renders the api (`Specification/library/default-libraries.tex:27`), so these 88 lines change it; line numbers are `Library/FortressLibrary.fsi` on the edit.

- **Written `abstract`, 57:** `StandardMin`'s `MIN` (:195); `StandardMax`'s `MAX` (:207); `Number`'s `asFloat` (:290); `QQ`'s `isNaN`, `isInfinite`, `numerator`, `denominator` (:408-413); `Integral`'s 28: `zero`, `one`, prefix `-`, prefix `DOTMINUS`, `=`, `+`, `DOTPLUS`, `-`, `DOTMINUS`, `DOT`, `TIMES`, `juxtaposition`, `DOTTIMES`, `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `BITAND`, `BITOR`, `BITXOR`, `LSHIFT`, `RSHIFT`, `BITNOT`, `^`, `/`, `numerator` (:449-477); `AnyUniqueItem`'s `holds` (:1054); `ReadableArray1`'s `subarray` (:1581); `Array2`'s `put` and `get` (:1746-1747); `Reduction`'s `empty` and `join` (:1890-1891); `FilterGenerator`'s `g` and `p` (:2177-2178); `Range`'s `check`, `shiftLeft`, `shiftRight` (:2218-2220); `RangeWithExtent`'s `extent` (:2251); `BoundedRange`'s `leftOrRight`, `every`, `atMost(n: I): FullRange[\I\] where { I extends Index }` and `INTERSECTION` (:2263-2267); `RangeWithLeft`'s `left` (:2273); `RangeWithRight`'s `right` (:2285); `FullRange`'s `extent` (:2297); `Generator2`'s `seed` (:2688); `RelationalPredicateCondition`'s `relation` and `target` (:2705-2706).
- **Joined, the component's bodyless members, 3:** `Comparison`'s `abstract getter asString(): String` (:103); `ZeroIndexed`'s `abstract opr[r:Range[\ZZ32\]] : ZeroIndexed[\E\]` (:1361); `OpenRange`'s `abstract forward(): OpenRange[\I\]` (:2232).
- **Changed, 6:** `EqualTo`'s `opr <(self, other:GreaterThan)`, where it read `LessThan` (:164); `Indexed1`, `Indexed2`, `Indexed3` `extends HasRank` (:1257-1261); `ZeroIndexed`'s `getter bounds()` (:1360); `ReductionPair[\R,L\] extends SomeReductionPair[\L\]` (:1930).
- **Gone, 1:** `Range`'s `asDebugStriing(): String`.
- **Joined, the follow-on, 19:** `ZZ32`'s `opr ^(self, b:AnyIntegral):ZZ32` (:581); `ZZ64`'s `opr ^(self, b:AnyIntegral):ZZ64` (:640); `ZZ`'s `getter zero()` and `getter one()` (:658-659), `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `BITAND`, `BITOR`, `BITXOR`, `LSHIFT`, `RSHIFT`, `BITNOT`, `^(self, b:AnyIntegral)` (:682-694); `OpenRange`'s `shiftLeft(amount: I): OpenRange[\I\]` and `shiftRight` (:2237-2238).
- **Joined, `Array2`'s subscripts, 2:** `opr[_:TrivialOpenRange, i1:ZZ32]: Array[\T,ZZ32\]` and `opr[i0:ZZ32, _:TrivialOpenRange]: Array[\T,ZZ32\]` (:1730-1731), as the component has them (`Library/FortressLibrary.fss:2716`, `:2720`).

Every line below `FortressLibrary.fsi:102` moves by 1 to 23 lines, so the record's line citations of the api move with it (section 9).

## 7. The checker's time (P-148)

The machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, 2100 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`, other agents of the batch beside. One run of each, the skill's command (`time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`), in one session:

| Run | Tree | Load at start | `real` |
|---|---|---|---|
| `base` | `/home/user/fortress-base21b` (`24919e97d`, the base's code) | 2.01 | 111.8 s (1m51.750s) |
| `change` | `18179f051` | 3.48 | 95.6 s (1m35.642s) |
| `pass` | none: the pass changed no code | | |

`diff` of the two tables prints nothing. The two runs' full outputs, each tree's path replaced by `TREE`, are equal (`diff`: rc 0, 38 lines each). So the results are the same; the difference in seconds is within the noise.

**The second pass.** A JFR profile of the count stage on the edit (a copy of `run.sh` with `-XX:StartFlightRecording=...,settings=profile` on its `java` line; neither timed nor compared): 6,241 samples, none in `ExportChecker`, since the stage never reaches the export check (section 5). Its top frames: `Walker.walkCases7$` 5.21 %, `Walker.walkCases0` 3.94 %, `scala.runtime.Statics.anyHash` 3.88 %, `BoxesRunTime.equals2` 3.62 %, `Walker.walkCases4` 3.57 %, `Walker.walkCases2` 3.51 %. A JFR profile of the distance stage, which does run the check (the same kind of copy): 14,101 samples, 7 with an `ExportChecker` frame on the stack (0.05 %), 4 of them its own frame (`checkExports`' closures, `equalListKeywordTypes`); one passes through `equalFnHeaders`. The new code adds a name comparison, which ends a failing match before its parameters are compared, and a count over each trait's api members. No gain to take, so no pass edit and no `pass` run: the code state is `change`'s. No memo, so no audit. No generated code changed, so `MethodSizeJUTest` was not needed.

## 8. Defects and their homes

- **Row 800** (members matched without their names): repaired, home 1, `XXXExportMemberName`.
- **Row 801** (a field compared by its type only): repaired, home 1, `XXXExportFieldName`.
- **Row 802** (the component-to-api half with its arguments swapped): repaired, home 1, `ExportComprisesEllipsisAbstract`.
- **4i** (an api member written `abstract` required a matching member, and counted in the missing-members test): repaired, home 1, `ExportAbstractMemberDefined` and `ExportAbstractMemberAbsent`. No row held it.
- **`JavaBufferedReader`'s `consume` without `throws IOException`** in the compiler's prelude, hidden by row 800: repaired, home 1; every compiled test's library compile guards it (section 3). No row held it.
- **NEW-E-1, a comprised object's functional method called on the object, compiled:** deferred, home 2: `XXXFunctionalMethodComprisedObject` (`run`, `run_out_contains=REACHED`) with `FunctionalMethodComprisedObjectLink` (`link`). The specification settles it: the call runs `R`'s declaration (`Specification/basic/traits.tex`, "Method Declarations"), and walk prints `PASS`. Measured on a scratch program `FmV1` (`trait Q comprises { R } abstract num(self): ZZ32 end`, `object R extends Q num(self): ZZ32 = 1 end`, `assert(num(R), 1, ...)`), compiled: 'java.lang.NoSuchMethodError: ... FmV1.\=num{...FmV1\,fss\!4\!5-5\!1,...FmV1\,fss\!7\!5-23}(FmV1$Q)', also on the old code (once `(FmV1$R)`, then `(FmV1$Q)` three times); the same with `num(self): ZZ32` not written `abstract`; it runs with no `comprises` clause (`PASS`), with a dotted `num()` (`PASS`), and through a `Q`-typed value (`AbstractFunctionalMethodImplementedByComprised`). Row in `record.md`.
- **The export error's 15 entries**: not this rung's (the brief's "Not yours"); homes on record, the table of section 5.
- **By reading, not measured, no row:** `source-code.tex` says that an api's field is satisfied by a getter or setter (`Specification/basic/components/source-code.tex:393-396`) and an api's method by a set of methods (`:399-403`); the check compares a field with fields and a method with one method of the same header (`ExportChecker.scala:816-830`), before and after this change. Row 769 holds the set rule for top-level functions only.

Row 782: by reading, its measurement does not move. `existsMatching` compares an api function with the component's declarations of the same key from `matchFirst`, so the name comparison that `equalFnHeaders` now makes holds there by construction; not re-measured, so no note.

## 9. Sentences made false

- **In `Specification/`:** none. Appendix I has no entry on the export check (grep of `changes.tex` for `export`: its lines 1698 and 3232 speak of `comprises` clauses and of a draft note), and the components chapter's rule is what the check now does: `apis.tex:250-257`, and `source-code.tex:381-385` ("for each field declaration and non-abstract method declaration in the exported declaration, a satisfying declaration ... When a trait has an abstract method declared, a satisfying trait declaration is allowed to provide a concrete declaration."). Part IV changes as section 6 lists, generated from the api.
- **Still saying otherwise than the check, not made false by this change:** `source-code.tex:393-396` and `:399-403` (section 8).
- **In the record:** the claims of rows 800, 801 and 802 (`explorations/fortress-gap-ledger.md:307-309`), closed by the gather; the export probe's '43 entries' and '115 differences' read as the library's present (`explorations/perf-probes/export-check-full/REPORT.md:7`, `:21-23`), true of the base. F-53's description of the export error stays true (one site, class X1). Line citations moved: F-63's `Library/FortressLibrary.fsi:915` (`Condition`, now `:933`) and `:398` (`QQ`'s `comprises { ... }`, now `:399`); F-35's `:1225` (`Rank1`, now `:1243`); and the open ledger rows that cite the api below line 102 (`ledger.py find --cites Library/FortressLibrary.fsi`).

## 10. Points to report

- **run2-api.patch and the check's edits:** the patch taken as it is (`git apply`, 88 lines), since it applied to the base and the planner measured it on the first run's landed tree (43 to 20 entries, nothing come). The check's four edits as the brief names them, with one addition: the field's message names the field. Beyond them, one prelude line (below) and the respelled test.
- **The export error's entries:** 43 to 15, entry by entry in section 5; no site came in any component.
- **The count stage's seconds:** base 111.8 s, change 95.6 s, no pass run (no pass edit); tables equal, full outputs equal after masking (section 7).
- **The declarations that join or change in the api, and so Part IV:** section 6, 88 lines.
- **Compiled tests whose verdict changes:** none of the existing ones; eight new cases, all green.
- **Sentences made false:** none in `Specification/`; in the record, section 9.
- **A file edited beyond those named:** `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1170`, the compiler's prelude, `consume`'s `throws IOException`; no declaration added. No edit of `Library/FortressLibrary.fss`.

## 11. Decisions

1. **The planner's api text as it is.** Not taken: improving it (nothing measured asked for a change), or writing it again by hand (the same lines).
2. **The name comparison inside `equalFnHeaders`, through `equalIdOrOps`.** Not taken: names compared in `equalMember` only, which leaves `existsMatching` as it was (it compares declarations of one key, so the two read alike there); comparison by text alone, ignoring fixity and the api qualifier, looser than the check's other name comparisons.
3. **4i with the count rule, both in `equalListMembers`.** Not taken: 4i without the count rule, which cannot clear an entry whose api has more members than its component (probe, section 3.2); a header check of an abstract api member against a same-named component member, which the text does not ask.
4. **A field needs no definition only if every name it declares is abstract.** Not taken: any name abstract, the shadow's (`exists`). No library field is abstract, so neither moves a measurement; the stricter reading asks a definition wherever the api declares a field that is not abstract.
5. **The field's message names the field.** Not taken: the team's 'different field @ span', which names only the span, so a test would pin a span. No `.test` file pins 'different field' (grep of the test folders).
6. **The prelude's `consume` takes `throws IOException`.** Not taken: the api's `throws` out (`CompilerBuiltin.fsi:600`), which would hide the native's exception; a check that ignores `throws` clauses, against `apis.tex`'s "The header ... must be the same". The prelude is deleted at the switch-over, and the line adds no declaration.
7. **`ExportComprisesEllipsisAbstract` calls through a `Q`-typed value.** Not taken: a compile-only test, which would not run the program; keeping `num(R)`, which would make an export test hold a code-generator defect.
8. **NEW-E-1 filed with an expected-failure pair, not repaired.** Not taken: a repair in the code generator, outside this rung's files.
9. **The count stage's after is the `change` timing run**, on the final code. Not taken: a second run of the same code state (`SKILL.md`, "Reuse each result").
10. **No pass edit.** The profiles show the export check at 0.05 % of the stage that runs it. Not taken: removing the team's unused `eq2` recomputation in `handleOne` (`ExportChecker.scala:805`), which runs only for a failing member, once per trait.

No decision of the curator covers 2 to 10; each follows the brief's defaults where it names one (forks 19, 20 and 22).

## 12. Commands

- `jfr print --events jdk.ExecutionSample <rec.jfr>`, then a count of the events whose stack holds `ExportChecker`, gave the export check's share; `jfr view hot-methods <rec.jfr>` the top frames. The profiled runs were copies of the stages' `run.sh` with the JFR flag added to their `java` line by `sed`, under `tmp/`.

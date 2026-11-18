<!-- Climb batch 33b, rung R (rung-api-method-index): a method of an imported api's trait found by its api on the compiled path; rows 942, 940 and 1061. -->

# Rung R: a method of an imported api's trait found by its api on the compiled path

- problem: the code generator's 'Not in the trait table' on an api's trait: rows 942, 940 and 1061 (`explorations/fortress-gap-ledger.md:1048`, `:1046`, `:1070`), measured by climb batch 28's rung T and climb batch 33's planner (`explorations/compile-ladder/plan-33/PROBES.md:69-82`).
- spec: `Specification/basic/traits.tex:584-593` (a trait declares and inherits method declarations), `Specification/basic/expressions/type-annotation.tex:45-54` (a type assumption fixes the static and dynamic type for the enclosing call), `Specification/basic/components/apis.tex:250-255` (a component defines every declaration of its api not declared `abstract`).
- precedent: row 733's repair, `CodeGen.firstSupertraitMethods`, which names the trait of a supertrait's own declarations as the extends clause names it (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1154-1189`, `d839b7421`); and `CodeGen.hasBodyInItsTrait`, which reads an api's declaration without `abstract` as having its body in its component (`CodeGen.java:1141-1152`, `74f53ec886`).
- deviation: the repair is at the root, `STypesUtil`'s gathering and its special arrow (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:145-163`, `:1666`), not a rename at one caller as the precedent's.
- deviation: `CodeGen.java` is edited in `emitBodyGivenBy` and `assumedReceiverCall` (`CodeGen.java:7126`, `:7167`), not in `methodsNamed`, the one member the batch record names for this rung.
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:148`, `:1666` (both lines the team's, `a874948ac` `:148` and `:1566`); `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7126`, `:7167` (the file the team's; the two lines the revival's, `8caa399e85`).

Two launches worked this rung. The first made the tests, the edit, its build, `ant testFast`, the count stage with its timing and profile, the distance stage, the shadow patch's check and the ladder subset, and committed `838c729304`; a restart of the machine ended it while the run that looks for the trait table's search was starting, its log empty. The second, from that head, read the first's logs and transcript, ran nothing again whose log was whole, ran the search's run again with a positive control, added the test `AsIfApiTraitOverrideCompiled` (`0f7cc2729e`) for a defect the first had met, ran the programs of the reserved point old against new, and wrote this report.

## What changed and why

The code generator asks the trait table, made over the component it compiles, for every trait that an entry of a trait's methods names. A trait of an imported api is in that table only under its api's name (`TraitTable.scala:68-110`). Two places of `STypesUtil` made entries that name such a trait without its api:

1. **`STypesUtil.gatherMethods(tt_name, ...)`** (private), which `allMethods`, `allMethodsNotIdenticallyCovered` and `properlyInheritedMethods` share: it gave the trait's own declarations the type `declaredMethods(ti.ast.getHeader.getName, ...)`, the name of the declaration's header, which in an api's declaration has no api (`STypesUtil.scala:1652` at the base). It now gives them `tt_name`, the name by which the trait table found the trait (`:1666`). `removeIdenticallyCoveredMethods` compares the traits of two methods of one name, `analyzer.lteq(tt2, tt)` (`:1602`), and stopped on the bare name: rows 940 and 1061, and the intersection's owner search that rung I added (`CodeGen.intersectionMethodOwner`, `:7538`).
2. **`STypesUtil.makeSpecialArrowFromFunctionalMethod`**: the special arrow of a functional method, which `OverloadingOracle.lteq` compares (`OverloadingOracle.scala:58-59`), named `f.declaringTrait`, which the index of an api's trait gives without the api, while the declaration's self type names the trait with it. A debug run of the first launch printed, for row 942's program: `DBG special arrow tag declaringTrait api=() text=B selfType=self(ApiTraitOverloadApi.B) ...`. The arrow now names the trait by `nameBySelfType`, the header's name with the api of the self type where the self type names a trait of that text in an api (`STypesUtil.scala:148`, `:150-163`): row 942, whose stack is `OverloadSet.fLessSpecThanG` ← `split` ← `CodeGen.generateTopLevelOverloads` ← `forObjectDeclPrePass`.

Each change alone, in a scratch class folder ahead of the build (`tmp/`, the base's `STypesUtil.scala` with one change put in), linking the three compiled tests and compiling row 1061's under the selection:

    gather ApiTraitOverloadCompiled link: Exception in thread "main" java.lang.RuntimeException: Not in the trait table: B
    gather AsIfApiTraitCompiled link: Exception in thread "main" java.lang.RuntimeException: Not in the trait table: S
    gather IntersectionApiTraitCompiled link: clean
    gather OneLibraryArray1 compile (one): clean
    arrow ApiTraitOverloadCompiled link: clean
    arrow AsIfApiTraitCompiled link: Exception in thread "main" java.lang.RuntimeException: Not in the trait table: S
    arrow IntersectionApiTraitCompiled link: Exception in thread "main" java.lang.RuntimeException: Not in the trait table: LeftResult
    arrow OneLibraryArray1 compile (one): Exception in thread "main" java.lang.RuntimeException: Not in the trait table: Array1

So row 942 needs the arrow, rows 1061 and the intersection need the gathering, and row 940's test needs both: its call needs the gathering, and its object `P`, which declares its own `tag` beside the api trait's two, meets row 942's arrow (with the gathering alone it stops in `OverloadSet.fLessSpecThanG` from `forObjectDeclPrePass`).

3. **The body at an assumption** (`CodeGen.java:7126`, `:7167`). Once the gathering finds an api trait's methods, a call at a type assumption of that trait meets the api's declaration, which has no body there. `emitBodyGivenBy` and `assumedReceiverCall` asked `m._1().body().isSome()` and, finding none, emitted the ordinary dispatched call: on an object that overrides the method, the object's body ran. The specification's type assumption fixes the dynamic type for the enclosing call (`type-annotation.tex:45-54`), and walk runs the trait's body. The two tests now ask `hasBodyInItsTrait(m._1(), m._3())`, which the code generator already uses for the forwarders of an api's trait (`CodeGen.java:1086`): an api's declaration without `abstract` has its body in its component, as `apis.tex:250-255` and the checker's `AbstractMethodChecker.isAbstractFnDecl` (`AbstractMethodChecker.scala:270-275`) read it. The checker refuses a component that leaves such a method without a body ('Asbtract method tag ... is not declared in the API', below), so the static call finds the body.

## The tests: the failing runs on the base, the passing runs

The `XXX` tests of rows 942 and 940 were promoted before the edit (`git mv`): `XXXApiTraitOverloadCompiled` to `ApiTraitOverloadCompiled`, `XXXAsIfApiTraitCompiled` to `AsIfApiTraitCompiled`; each `.test` had `compile` and `compile_exception_contains=Not in the trait table: B` (or `S`), and now has `compile`, `link`, `run` and `run_out_contains=PASS`; each api's comment line names the plain test. `AsIfApiTraitCompiled` gained the object `P`, which overrides `tag` and `m`, and four assertions. New: `IntersectionApiTraitCompiled` (the guard of rung I's `sameTraitName` that the batch record asks for: a method call on a call typed by an intersection one of whose conjuncts, `LeftResult`, is an imported api's trait that declares `get` twice), `one_library_tests/OneLibraryArray1` (row 1061: `a = array1[\ZZ32, 8\]()`, its writes and a read, `compile` under the selection), and `AsIfApiTraitOverrideCompiled` (the body at an assumption of an api trait whose methods are declared once, on an object that overrides them).

The failing run of the three compiled tests on the base's code, through the harness, before the edit was first built (2026-11-18T03:15:02Z; the scratch build of the edit came at 03:17:54Z), `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests ApiTraitOverloadCompiled.test AsIfApiTraitCompiled.test IntersectionApiTraitCompiled.test`:

    java.lang.RuntimeException: Not in the trait table: B
    java.lang.RuntimeException: Not in the trait table: S
    java.lang.RuntimeException: Not in the trait table: LeftResult
    Tests run: 9,  Failures: 9,  Errors: 0

`AsIfApiTraitCompiled`'s object `P` was added after that run; the same three tests in their committed text on the base's code, `cd ProjectFortress && explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 <tree>/tmp/.../old-caches junit <tree>/ProjectFortress/compiler_tests/{ApiTraitOverloadCompiled,AsIfApiTraitCompiled,IntersectionApiTraitCompiled}.test` (03:31:14Z):

    java.lang.RuntimeException: Not in the trait table: B
    java.lang.RuntimeException: Not in the trait table: S
    java.lang.RuntimeException: Not in the trait table: LeftResult
    Tests run: 9,  Failures: 9,  Errors: 0

Row 1061's test on the base's code, before the edit (03:15:25Z), `cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES=<private> ../bin/fortress junit one_library_tests/OneLibraryArray1.test`:

    java.lang.RuntimeException: Not in the trait table: Array1
    Array1 @ /home/user/fortress-api-method-index/Library/FortressLibrary.fsi:1750:7-11
    Tests run: 1,  Failures: 1,  Errors: 0

`AsIfApiTraitOverrideCompiled`, written after the fix, on the old code through the harness (04:15:54Z), `cd ProjectFortress && explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base38 <private> junit <tree>/ProjectFortress/compiler_tests/AsIfApiTraitOverrideCompiled.test`:

    . run ProjectFortress/compiler_tests/AsIfApiTraitOverrideCompiled (515ms) FAIL:  qd =/= rd; stamp(Q asif R, d asif String)
    Tests run: 3,  Failures: 1,  Errors: 0

The passing runs, after the last change of code (built at 03:31:33Z; no code changed after): `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests ApiTraitOverloadCompiled.test AsIfApiTraitCompiled.test AsIfApiTraitOverrideCompiled.test IntersectionApiTraitCompiled.test TraitTableApiTraitCompiled.test ApiTraitMethodNotFirstCompiled.test AsIfCallsCompiled.test CoverageReturnMethodCall.test` (04:16:09Z, with row 733's, row 732's, row 818's and rung I's neighbours): `OK (23 tests)`. Under the selection, `cd ProjectFortress && FORTRESS_LIBRARY=one FORTRESS_CACHES=<private> ../bin/fortress junit one_library_tests/OneLibraryArray1.test one_library_tests/OneLibraryHalf.test one_library_tests/OneLibraryPrintBig.test one_library_tests/XXXOneLibraryRunHalf.test` (03:37:17Z): `. compile one_library_tests/OneLibraryArray1  OK (time = 18657ms)`, `OK (4 tests)`.

The whole compiled suite once, on `838c729304`, whose code is the final code, `ant testFast` (03:42:15Z): `BUILD SUCCESSFUL`, `Total time: 8 minutes 29 seconds`. The tracks: compiler 1743 (the last gate's 1736, with 4 from the two promotions and 3 from `IntersectionApiTraitCompiled`; `AsIfApiTraitOverrideCompiled` adds 3 more at the gate), library 86, othercompiler 263, onelibrary 4 (3, with `OneLibraryArray1`), misc unchanged; no failure, no error. The edit changes the checker's Scala (`STypesUtil` is read by `OverloadingChecker.scala:394`, `AbstractMethodChecker.scala:90` and `OverloadingOracle.scala:58-59`), and walk reaches none of the three changed functions, so `ant testSystem` was not run (`tests-running.md`, "When to run a whole suite").

No `XXX` test was added, so no deliberate fix was shown red.

## Where the fix belongs, and the precedent

`explorations/coordinator/map/spec-to-implementation.md` and `modules-and-phases.md` put a trait's methods in the checker's utilities (`scala_src/useful/STypesUtil.scala`), which the checker and the code generator share, and the trait table in `scala_src/typechecker/TraitTable.scala`. Row 733 repaired the same defect at one caller: `CodeGen.firstSupertraitMethods` renames the trait of a supertrait's own declarations to the extends clause's name (`CodeGen.java:1154-1189`, F-338). The other callers of the gathering in its file are four, each served by the root repair and none by that rename: the constructor's `properlyInheritedMethodsNotIdenticallyCovered` (`:502`), `allMethodsNotReplaced` (`:1076`), `dumpMethodChaining`'s `properlyInheritedMethodsNotIdenticallyCovered` (`:1267`) and `methodsNamed` (`:7081`); the checker has two more (`OverloadingChecker.scala:394`, `AbstractMethodChecker.scala:90`). After the repair `firstSupertraitMethods` renames each entry to the name it already has; it is left as it is (decision 5).

## What the specification settles

A trait provides the method declarations it declares and those it inherits (`traits.tex:584-593`), so an object's overload beside an inherited one is two declarations of the object, and the overloading rules choose between them (row 942). A type assumption makes the assumed type the static and the dynamic type for the enclosing call (`type-annotation.tex:45-54`), so the assumed trait's body runs, over an object's override too (row 940 and `AsIfApiTraitOverrideCompiled`). A component defines each declaration of its api that is not declared `abstract` (`apis.tex:250-255`), so the body of such a method is in the component's trait. Nothing in the specification names the trait table or its search.

## Programs run old against new

- The three compiled tests and row 1061's: above.
- The reserved point, a call at an assumption of an api trait whose methods are declared once, on an object `P` that overrides them (`tmp/` probe `OneTagProbe.fss` over an api `OneTagApi`, `link` then `run`): on the base's code, `old-fortress.sh /home/user/fortress-base38 <private> link OneTagProbe.fss` then `run OneTagProbe`:

      functional at P asif S: pd
      dotted at P asif S: pd
      functional at P: pd

  on the rung's code, `bin/fortress link` then `run`, and under walk, `bin/fortress OneTagProbe.fss`, both:

      functional at P asif S: sd
      dotted at P asif S: sd
      functional at P: pd

  The gated form of this case is `AsIfApiTraitOverrideCompiled`.
- An api trait that declares a method without `abstract` whose component gives it no body (`AbsTagProbe`): the base and the rung refuse it alike at the checker's export check, `link` exit 255: 'Asbtract method tag @ .../AbsTagApi.fss:6:5-32 is not declared in the API', so the static call of item 3 never meets a method without a body.
- The trait table's search, a positive control (`SearchControl.fss`: an object that declares `=` at `String` beside the `=` it inherits from the prelude's `Equality`), compiled with an instrumented `TraitTable` that prints each answer of the search: with the base's `STypesUtil` ahead of the build, `1 @@TRAITTABLE-SEARCH codegen CompilerAlgebra Equality in SearchControl`; with the rung's, no line, and the run prints `PASS`.

## The trait table's search by the prelude's names

The team's search (`TraitTable.scala:79-100`) answers a bare name that the component does not declare from `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra` or `GeneratorLibrary`. Fork R1 keeps it. With the instrumented `TraitTable` (each answer printed with its caller, checker or code generator) first on the class path, every compiled test on `838c729304`'s code in one JVM, `java ... -cp "<hack classes>:$CP" com.sun.fortress.Shell junit compiler_tests/*.test other_compiler_tests/*.test library_tests/*.test parser_tests/*.test`, then the one-library folder under `FORTRESS_LIBRARY=one`:

    start 2026-11-18T04:07:58Z head 838c729304
    OK (2092 tests)
    one-library start 2026-11-18T04:15:24Z
    OK (4 tests)

and no `@@TRAITTABLE-SEARCH` line. No test reaches the search after the repair, from the checker or the code generator; the positive control above shows the instrumentation answering where the base's gathering reaches it.

## The stages

Both ran once, on `838c729304`, whose code is the final tree's (`0f7cc2729e` adds a test only).

- The count stage, `explorations/coordinator/tools/checker-count/run.sh` (03:38:30Z): `#total 0`, `#locations 0`, `#crash none`; `diff` with the comparand `explorations/compile-ladder/climb-batch-33/gate/checker-count.txt` prints nothing.
- The distance stage, `explorations/coordinator/tools/distance/run.sh` (03:51:08Z, 114 s): `#total 0`, `#crash none`, `#shadow every shadow edit matched the tracked sources`. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-33/gate/distance.txt <table>` prints `DISTANCE SAME   0`. Its `errors.tsv` and the per-site list `explorations/compile-ladder/gate/distance-sites.tsv` hold their header only: no site moved.
- The shadow patch on the edited `CodeGen.java`: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>` exit 0, `add-patch.py` exit 0; it still applies.

## The checker's time (P-148)

The machine: nproc 4, Intel Xeon Processor at 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`. The command, for each with its own `N`: `time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`.

- `base`, from the base build `/home/user/fortress-base38`, 03:29:33Z, load at start 10.15: `real 1m28.673s`. It ran after the edit was written and before it was built.
- `change`, on `838c729304`, 03:38:30Z, load at start 0.85: `real 1m15.581s`.
- The tables are equal (`diff` prints nothing), and the two `run.txt` files are equal after each tree's path is replaced by `TREE` (`diff` exit 0, 33 lines each).
- The second pass: a JFR profile of the count stage on the change (`JAVA_TOOL_OPTIONS=-XX:StartFlightRecording=...,settings=profile`), 4,495 execution samples: 0 with `makeSpecialArrowFromFunctionalMethod` on the stack, 0 with `nameBySelfType`, 7 with `gatherMethods`, 0 with `removeIdenticallyCoveredMethods`; the top self frames are the generated walker's, `Walker.walkCases7$` 7.3%, `walkCases4` 4.0%, `walkCases2` 3.6%, then `List.prependedAll` 3.4%. The changed code takes no measurable time, so the pass changed nothing, and `change`'s results stand for `pass`'s. No memo was added, so there is no audit.

## The ladder subset

The files whose recorded first error in the baseline names what the change touched, `tests/wrongOverload.fss` ('Not in the trait table: CompilerLibrary.Array2'), `tests/XXXInheritedOverload.fss` and `tests/XXXUnimplementedMethod.fss` ('No such method O.b.'), run after the edit with the gate's drivers copied under `tmp/`: each keeps the phase (`typecheck`) and the first error of `explorations/compile-ladder/ladder.tsv`. None moved.

## Sentences of the specification made false

None. No sentence of `Specification/` names the trait table, these rows or what the compiled path does at an api trait's method; `type-annotation.tex`'s "Type Assumption" has no revision or note box; Appendix I's sentence on a call through a trait (`Specification/appendices/changes.tex:4689-4693`) still holds, since a call at an assumption calls the trait's body statically and an ordinary call stays an interface call.

## Points to report

- **The root as found.** `STypesUtil.gatherMethods` (private, `STypesUtil.scala:1655-1673`) named the trait of a type's own declarations by its declaration's header, without the api; `tt_name`, the name the trait table found it by, now carries it (`:1666`). `STypesUtil.makeSpecialArrowFromFunctionalMethod` (`:146-149`) named a functional method's trait by `FunctionalMethod.declaringTrait`, without the api; the declaration's self type now carries it, through `nameBySelfType` (`:150-163`).
- **Rows 942 and 940**: `XXXApiTraitOverloadCompiled` promoted to `ApiTraitOverloadCompiled`, `XXXAsIfApiTraitCompiled` to `AsIfApiTraitCompiled`; row 1061's test is `one_library_tests/OneLibraryArray1`, under the selector. Each failed on the base and passes after (above).
- **The trait table's search by the prelude's names**: no compiled test, of the 2,092 of the four prelude folders and the 4 of the one-library folder, reaches it after the repair; it stays (fork R1).
- **The shadow patch** still applies to the edited `CodeGen.java` (exit 0; the distance stage's `#shadow every shadow edit matched the tracked sources`).
- **The stages' tables** on the final code equal the comparand's: count `#total 0`, distance `DISTANCE SAME 0`, no site moved. The checker's time: 88.7 s base, 75.6 s change, results the same, no second pass to make.
- **A file edited beyond those named**: none beyond the named files, but `CodeGen.java` is edited in two members beyond `methodsNamed`, the one the record names: `emitBodyGivenBy` (`CodeGen.java:7126`) and `assumedReceiverCall` (`:7167`). Neither is a member that N or G names, and neither rung's branch has a hunk there.
- **Reserved point, a change of which declaration a call reaches**: a compiled call at a type assumption of an imported api's trait whose method has a body there, on an object that overrides it, ran the object's body on the base ('pd') and runs the trait's after ('sd'), as walk does and as the specification gives; gated by `AsIfApiTraitOverrideCompiled`. In `testFast`, the ladder subset and the stages no dispatch method moved otherwise. A dispatch method of a program the base compiled does change where the component declares a trait of the api trait's simple name: the special arrow's bare name read the local trait, and the call died, `StackOverflowError`, where it now runs the api trait's body (the skeptic's `compiler_tests/ApiTraitShadowedNameCompiled`, `SKEPTIC.md`). A reversible step, taken by the specification, against no decision on record.
- **A model line**: none.

## Decisions

1. **The root, in `STypesUtil`'s gathering, by the name the trait table was asked for.** Ways not taken: a rename at each caller, as row 733's precedent (four more sites in `CodeGen.java` and two in the checker); the trait table's search extended to the one library's apis, as the planner's measure did (`explorations/compile-ladder/plan-31/probes/switch-rehearsal.md`, W3), which hides the defect; the commented-out search of every api (`TraitTable.scala:97-100`), which can find a name in the wrong api; and the header's name with the self type's api in the gathering, which the first launch tried first and which made the checker refuse the one library, `There are multiple declarations of tabulate with the same parameter type: (I->E)` at `Library/FortressLibrary.fsi:1676` and `:1686` (a compile of `OneLibraryArray1.fss` under the selection with that scratch build). Fork R1 asks for the root.
2. **The special arrow named by its declaration's self type.** Ways not taken: giving `FunctionalMethod.declaringTrait` its api where the index is built (`scala_src/typechecker/IndexBuilder.scala`), which every reader of `declaringTrait` would see (the checker, `OverloadSet.java`, `NodeUtil.getDeclaringTrait`) and which the record names for no rung; normalizing the name inside `OverloadingOracle.lteq`. Evidence: the debug line above, `declaringTrait api=() text=B selfType=self(ApiTraitOverloadApi.B)`.
3. **The body at an assumption read by `hasBodyInItsTrait`, in `emitBodyGivenBy` and `assumedReceiverCall`.** Ways not taken: `body().isSome()` kept, which after the root repair runs the object's override (`FAIL:  pd =/= sd; tag(P asif S, d asif String)`, the first launch's run of the functional calls of `AsIfApiTraitCompiled` with both `STypesUtil` changes in a scratch class folder and `CodeGen.java` unchanged; and 'pd' for the base's `OneTagProbe` above); a body filter inside `methodsNamed`, the named member, which would also drop the abstract declarations that `intersectionMethodOwner` (rung I) needs. Evidence: `type-annotation.tex:45-54`, `apis.tex:250-255`, walk's answer, and the export check's refusal of a component that leaves such a method bodiless.
4. **The trait table's search stays** (fork R1's default): no test reaches it now, and it goes with the prelude.
5. **`CodeGen.firstSupertraitMethods` left as it is**, though its rename now gives each entry the name it has. Way not taken: removing it, in a member the record does not give this rung.
6. **`AsIfApiTraitOverrideCompiled` a test of its own.** Way not taken: its case added to `AsIfApiTraitCompiled`, whose base failure, 'Not in the trait table: S', comes first and hides it; this one fails on the base for its own reason.
7. **The defect of `tests/wrongOverload.fss` given a ledger row (NEW-R-1)**, not repaired: its name carries its api, so it is not this rung's root, and the prelude lacks the type (until the switch-over).
8. **No second pass of the checker**, as the profile shows none of its time in the changed code.

## Defects and their homes

- Row 942, an object's overload beside a method inherited from an imported api's trait: home 1, `ApiTraitOverloadCompiled`.
- Row 940, a call at an assumption of an imported api's trait that declares the method twice: home 1, `AsIfApiTraitCompiled`.
- Row 1061, the one library's `Array1` under the selection: home 1, `one_library_tests/OneLibraryArray1`.
- A method call on an intersection whose conjunct is an imported api's trait that declares the method twice stopped, 'Not in the trait table: LeftResult': home 1, `IntersectionApiTraitCompiled`.
- A compiled call at an assumption of an imported api's trait ran an object's override, not the trait's body: home 1, `AsIfApiTraitOverrideCompiled`; no row held it.
- Under the prelude, `RR64[n,n]` at a declared return type crashes the checker, 'Not in the trait table: CompilerLibrary.Array2' (`tests/wrongOverload.fss:45`): home 3, a ledger row only (NEW-R-1), since its program is the team's walk test, green under walk, and a compiled test could only pin an internal exception; the compile ladder records it as that file's first error since its baseline (`explorations/compile-ladder/REPORT.md:860`). Under `FORTRESS_LIBRARY=one` the checker reaches the program and reports its static errors, 'Ill-formed type: Matrix[\N,n,m\]' first.

## For FACTS

F-338 is wrong after this change: it says that `STypesUtil.allMethods` names an api's trait without the api and that the same root still stops `methodsNamed` at an assumption (row 940). The new entry, in record.md, states the present.

## Commands worked out

- The instrumented search run: `TraitTable.scala` copied under `tmp/` with a `System.err.println` at each `return candidate` of the search, compiled by `java -cp "$CP" scala.tools.nsc.Main -classpath "$CP" -d <hack>/classes`, then `java $JAVA_FLAGS -Dfortress.caches=<copy of the caches> -Dfortress.junit.reset=false -cp "<hack>/classes:$CP" com.sun.fortress.Shell junit <folders>/*.test 2>&1 | grep -aE "@@TRAITTABLE|^OK \(|^FAILURES|^Tests run"`.
- A one-change variant: the base's `STypesUtil.scala` from `git show c799851472:...`, one change put in by script, compiled the same way into its own class folder, and each program linked with that folder first.

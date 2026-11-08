# Rung T: an object whose first supertrait is an imported api's trait (row 733)

- problem: the code generator stops, 'Not in the trait table: OpenRange', at 8 declarations of RangeInternals under the switch-over's setting (F-34; `explorations/perf-probes/codegen-distance/REPORT.md`, section 3), and on the base at row 733's form, in `dumpMethodChaining` (`explorations/compile-ladder/plan-28/PROBES.md:115-124`, probe 4); row 733, `explorations/fortress-gap-ledger.md:892`
- spec: `Specification/basic/traits.tex`, "Method Declarations", row 733's citation: an object has the methods that its supertraits provide; the explicit import of a functional method's name, `Specification/basic/components/source-code.tex:172-200`
- precedent: `STypesUtil.gatherMethods` names the trait of each supertrait's declarations as an extends clause names it (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1647`, through `mapOverAllSupertraits`, `:1299`); the team's commented-out form beside the edited line, `inheritedMethods` over the extends entry, names each entry so too (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:940`, `STypesUtil.scala:1387-1527`)
- deviation: the first supertrait's own declarations are found by the identity of the index's method objects, not by a name, since a name's `equals` compares its span (`ProjectFortress/src/com/sun/fortress/nodes/Id.java:54-72`); the entry keeps the static arguments and the replacer that `allMethods` gives it, and only its trait's name changes (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1024-1059`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:941`

## 1. What changed, and why

`dumpMethodChaining` (`CodeGen.java:916-1022`) gives an object a forwarder for each method body that it inherits from a supertrait other than the first, unless the first supertrait already brings that method through the class hierarchy. To know that, it compares the trait of each same-named method of the first supertrait with the trait of the body (`typeAnalyzer.equiv`, `:1010`). It took the first supertrait's methods from `STypesUtil.allMethods` (`:941` on the base).

`allMethods` makes its tuples in `gatherMethods` (`STypesUtil.scala:1640-1658`). A supertrait's declarations get the trait as an extends clause names it (`:1647`, the key that `mapOverAllSupertraits` puts at `:1299`). The trait's own declarations get the name that the trait's declaration gives itself (`:1651`, `ti.ast.getHeader.getName`, made into a type at `:1748-1750`). For a trait of an imported api, that is the name in the api's file, with no api name: the probe's message gives the span of the api's header, `C @ ProjectFortress/compiler_tests/TraitTableApiTraitApi.fsi:4:7`.

The code generator's trait table is made over the component and the api environment (`ProjectFortress/src/com/sun/fortress/compiler/phases/CodeGenerationPhase.java:179`, `:206-210`). It finds a name without an api in the component, else in four prelude apis only, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra` and `GeneratorLibrary` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TraitTable.scala:72-101`, "A terrible search hack"). So `equiv` asks `typeCons` for `C`, which throws (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:884`).

The edit (`CodeGen.java:941`, `:1024-1059`): `dumpMethodChaining` reads the first supertrait's methods through a new private method, `firstSupertraitMethods`. It takes `allMethods`' relation, finds the first supertrait's index in the table by the extends clause's name, and gives each tuple whose method is one of that index's own declarations (dotted, functional, getters and setters, by identity) the trait as the extends clause names it, with the tuple's own static arguments. Every other tuple stays as `allMethods` gives it. For a local first supertrait both names find the same index, so the comparison's answer does not change for a program that compiled before.

## 2. Where the fix is, the type that the comparison read, and why the table did not find it

- Where: `CodeGen.java:941` and the new `firstSupertraitMethods`, `:1024-1059`, both inside the code generator; no checker code changes (fork T1).
- The type read: `alreadyType = str.replaceIn(tupAlready._3())` (`CodeGen.java:1009`), the trait of a tuple of the first supertrait's own declarations, `TraitType` `C` without its api, made at `STypesUtil.scala:1748-1750` from the api's header name (`:1651`).
- Why the table did not find it: the table over the component looks up a name without an api in the component and in the four prelude apis only (`TraitTable.scala:72-101`), and the trait is declared in the program's own api.

## 3. The tests

New tests, each named by its topic:

- `ProjectFortress/compiler_tests/TraitTableApiTraitCompiled.fss` and `.test` (`tests=`, `compile`, `link`, `run`, `run_out_contains=PASS`), with its api `TraitTableApiTraitApi.fsi` and its component `TraitTableApiTraitApi.fss`, in the form of `RecursiveApiTest3.test`. The api's `trait C abstract tag(self, n: ZZ32): String end` and the generic `trait G[\T\] abstract gtag(self, n: ZZ32): String end`; the program's `trait D tag(self, s: String): String = s end`, `object O extends { C, D } tag(self, n: ZZ32): String = "c" end`, `trait E gtag(self, s: String): String = s end` and `object P extends { G[\(ZZ32, ZZ32)\], E } gtag(self, n: ZZ32): String = "g" end`, with eight assertions: each body through the object and through a value of each supertrait's type. The skeptic added a trait whose first supertrait is the api's trait to both tests, as RangeInternals' `FullRange2D` and `FullRange3D` are (section 6): `trait T extends { C, D } end` and `object Q extends T tag(self, n: ZZ32): String = "q" end`, with four assertions more, through `Q` and through `t: T` (SKEPTIC.md).
- `ProjectFortress/tests/TraitTableApiTraitWalk.fss`, with its api and component `ProjectFortress/test_library/TraitTableApiTraitWalkApi.fsi` and `.fss`: the same program under walk, a guard.

The tests import the functional methods by name, `import TraitTableApiTraitApi.{ C, G, tag, gtag }`. My first run on the base imported `{ C, G }` only, and the checker refused `tag(c, 2)` at `c: C`, '(D, String)->String is not applicable to an argument of type (TraitTableApiTraitApi.C, IntLiteral).': the explicit import makes usable only the names it lists (`source-code.tex:172-200`), so that refusal is the rule's answer, and the import names `tag` and `gtag`.

The failing run, on the base's code, before the edit was first built (the edit's first compile, into a scratch folder, came after it):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests TraitTableApiTraitCompiled.test
    # junit.sh base 2026-11-08T04:53:06Z; ... tree 157323e
    . compile ProjectFortress/compiler_tests/TraitTableApiTraitCompiled
     UNEXPECTED exception
    java.lang.RuntimeException: Not in the trait table: C
    Tests run: 3,  Failures: 3,  Errors: 0

The walk guard on the base:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-codegen-trait-table/h1 ProjectFortress/tests/TraitTableApiTraitWalk.fss
    # harness-one 2026-11-08T04:53:17Z; tree 157323e5; ...
    OK (1 test)

The passing runs, after the last change of code (commit `c91942e5`; the XXX test files of section 11 were on disk and were committed after, in `12375111`, with no change of code):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests TraitTableApiTraitCompiled.test XXXAsIfApiTraitCompiled.test
    . run ProjectFortress/compiler_tests/TraitTableApiTraitCompiled (681ms) PASS
    OK (4 tests)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-codegen-trait-table/h1 ProjectFortress/tests/TraitTableApiTraitWalk.fss
    # harness-one 2026-11-08T05:16:51Z; tree c91942e5; ...
    OK (1 test)

Both keep the compiler track's verdicts: no `XXX` name, so the compiled test is a plain pass and the walk test a plain pass.

## 4. Where the fix belongs, and the precedent search

The place: the code generator, `CodeGen.java` (`explorations/coordinator/map/modules-and-phases.md`, B.9; `map/spec-to-implementation.md`, "trait declarations, multiple inheritance": `CodeGen.forTraitDecl`), the only phase that stops; the checker passes the program.

The ways, and the one taken:

1. Taken: in `dumpMethodChaining`, give the first supertrait's own tuples the trait as the extends clause names it, where the relation is made (`CodeGen.java:941`, `:1024-1059`).
2. In `STypesUtil.gatherMethods`, name the own declarations by the name passed in, not the header's (`STypesUtil.scala:1651`). It is the root, and it would reach `methodsNamed` too (section 11, NEW-T-1). But `allMethods` is also the checker's (`scala_src/typechecker/OverloadingChecker.scala:394`, `scala_src/typechecker/AbstractMethodChecker.scala:90`), so it is a change of checking code, with P-148's measure (fork T1), and the comparison can be fixed without it.
3. In the trait table, look up a name without an api in every api (the commented-out loop, `TraitTable.scala:97-100`). It is the checker's trait table (fork T1), and a simple name can be declared by several apis.
4. `inheritedMethods` over the first extends entry, the team's commented-out line (`CodeGen.java:940`): it names entries by the extends clause, but it drops overridden declarations (`STypesUtil.scala:1462-1482`), so the relation, and the forwarders of other objects, would change.
5. Catch the exception at the comparison and read "not equivalent": it hides every other failure there, and where the component declares a trait of the api trait's simple name, the table finds that one and the answer is wrong without an exception.
6. Compare the names' texts: wrong in the same case.

The precedent search: no earlier change repaired this root. The ledger's other 'trait table' rows are the checker's, of other causes (rows 476 and 626, `explorations/coordinator/tools/facts-extract.sh 'ledger-find:trait table'`). The shape followed is `gatherMethods`' own for a supertrait's declarations (`STypesUtil.scala:1647`). Sites in `CodeGen.java` that gather a trait's methods: three on the base, `:941` (this fix), `:959` (the current object's methods; its supertraits are named by its own extends clause, and its own declarations are the component's) and `:6469` (`methodsNamed`, which gathers an assumed trait's methods; it stops on an api's trait, NEW-T-1, section 11, and is in the call visitors, which this rung does not edit).

## 5. What the specification settles

`traits.tex`, "Method Declarations" (row 733's citation): an object has the methods its supertraits provide, so `O` has `D`'s `tag(self, s: String)` beside its own `tag(self, n: ZZ32)`; the two exclude each other (`ZZ32` and `String`), so the overloading is valid, and walk runs it. `source-code.tex`, "Import Statements" (`:172-200`): an explicit import makes usable only the names it lists, the functional methods among them. `type-annotation.tex`, "Type Assumption" (`:33-53`): settles NEW-T-1's answer, and does not say what NEW-T-2's call runs.

## 6. Programs run old against new

The old code by `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base28 <tree>/tmp/rung-codegen-trait-table/old-caches`, the new by the tree's `bin/fortress` with a private caches folder, each program in its own scratch folder with its api's component compiled first.

- Row 733's form, under the quick loop of `compiler.md` before the build: `compile` exit 0, `run` printed `PASS`.
- Row 732's form (the ledger row's probe: api `Q1ApiB` with `trait B pick(self): String end`, its component's body `"b"`; `object O extends { C, B } end`, `println(pick(O))`): old and new alike, 'java.lang.AbstractMethodError: Receiver class Row732P$O does not define or inherit an implementation of the resolved method 'abstract fortress.CompilerBuiltin$String pick?0()' of interface Q1ApiB$B.' The fix does not reach row 732 (fork T2).
- An api trait whose method comes from its api supertrait (`trait B abstract btag(self, n: ZZ32): String end`, `trait Cb extends B end` in one api; `object O extends { Cb, D } btag(self, n: ZZ32): String = "b" end` with `D`'s `btag(self, s: String)`): old and new alike, 'b d'.
- A component trait with the api trait's simple name, `object O extends { SameApi.C, C }`: not writable; the parser refuses the qualified name there, 'SameNameP.fss:7:27: Syntax Error', and the compiled path refuses `import api`: "Not yet implemented: 'import api APIName'".
- NEW-T-1's and NEW-T-2's programs, section 11.

The code generator over the distance stage's fourteen components (`explorations/compile-ladder/plan-25/probes/codegen.sh`), on this tree only, after the build, with the planner's one-line `sed` putting each helper string on a glue string for the run (`explorations/coordinator/CLIMB-BATCH-26.md:337-343`; it changed 340 strings in four files, `git diff -- Library ProjectFortress/LibraryBuiltin | grep -c '^+.*interpreter.glue.prim.Control\$'`), then `git checkout -- Library ProjectFortress/LibraryBuiltin`:

    explorations/compile-ladder/plan-25/probes/codegen.sh tmp/rung-codegen-trait-table/cg-glue
    refused declarations 23 | emitted (OK lines) 720 | component failures 0
      RangeInternals       refused   0  emitted 102
    kinds 9
      1  Not in the trait table: <api trait>  [String 1]

Its before is the record's latest table, on climb batch 26's rung L tree (`explorations/compile-ladder/rung-codegen-local-functions/REPORT.md:72-84`): 'refused declarations 38 | emitted (OK lines) 703', 'kinds 10', '8  Not in the trait table: <api trait>  [RangeInternals 8]', RangeInternals refused 9, emitted 102. Climb batch 27 landed between that tree and this base, its type assumptions among it (F-325; the before's 7 'Can't compile AsIfExpr' are gone), so only the trait-table kind is this change's to read:

- RangeInternals' eight declarations whose first supertrait is an api's range trait each have an `@@CG OK` line: `OpenRange2D` (`Library/RangeInternals.fss:380`), `OpenRange3D` (`:398`), `ExtentRange2D` (`:524`), `ExtentRange3D` (`:555`), the traits `FullRange2D` (`:1127`) and `FullRange3D` (`:1193`), `CompactFullRange2D` (`:1384`) and `CompactFullRange3D` (`:1420`). RangeInternals refuses none. No emitted class was run.
- The one refusal of the kind left is `SubString` (`Library/String.fss:353`), at the pre-pass, 'Not in the trait table: String String @ .../Library/FortressLibrary.fsi:2523:7-11'. A copy of the probe that prints 80 frames, over FortressLibrary and String only, gives `CodeGen.methodsNamed` ← `emitBodyGivenBy` ← `assumedArgumentsCall` ← `forFunctionalRef`: `(self asif String) CMP (other asif String)` at `String.fss:397`, NEW-T-1, which the base has (section 11).
- FlatString is not measured: it stops before CodeGen, in the wrapper generator, 'Can't generate header for method compareTo with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String' (row 874), since its `natLineSeparator` string spans two lines (`Library/FlatString.fss:25-26`), which the one-line `sed` does not change, so `stringOps` is still wrapped. Without the `sed` (the probe's first run on this tree), FortressLibrary, FortressBuiltin and FlatString all stop there: '### done Library/FortressLibrary.fss rc=-1', 'java.lang.RuntimeException: Can't generate header for method parse with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String', and the table 'refused declarations 11 | emitted (OK lines) 186', RangeInternals 'refused 0 emitted 102'.

## 7. Stages, suites, the ladder subset

- Stages: neither (fork 3). Every path the rung changes: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and tests under `ProjectFortress/compiler_tests/`, `ProjectFortress/tests/` and `ProjectFortress/test_library/`, and this folder. Both stages stop after the type checker, so neither reaches the code generator: `explorations/coordinator/tools/checker-count/run.sh:23-25` ("The run stops after the type checker (WorldFlip -stop check)"), `explorations/coordinator/tools/distance/run.sh:128` (`DistanceMulti -order check`). `test_library/` is read by neither (their components are the library's).
- Suites: none; the edit is of the code generator only, so its own tests, and the tracks to the gate (`tests-running.md`, "When to run a whole suite"; fork 2). Not near transactions, top-level state or the class loader, so no four-thread atomic runs; no walk, parser, shared phase or library edit, so no demo driver.
- The ladder subset (`gate.md`, "The ladder regression"), the drivers copied under `tmp/rung-codegen-trait-table/ladder/`: the one file whose recorded first error in the baseline names the trait table, `tests/wrongOverload.fss` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`: `typecheck`, 'Not in the trait table: CompilerLibrary.Array2'; no file's first error names `dumpMethodChaining`). The newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-27/gate/ladder/ladder.tsv`) does not hold it, so the baseline's row is the before. After: `tests	wrongOverload.fss		typecheck	2	...	Not in the trait table: CompilerLibrary.Array2`, unchanged; it stops in the checker, before the code generator.

## 8. Sentences made false

- `explorations/coordinator/FACTS.md:31`, F-34: "Each kind left has a ledger row or a plan line, among them ... "Not in the trait table" (row 733)": the kind's sites in RangeInternals emit; its one site left is `SubString`'s, row NEW-T-1. Its count, "refuses 38 declarations ... in 10 kinds", was measured on an earlier tree; on this rung's tree the probe gives 23 in 9 kinds (section 6).
- `explorations/fortress-gap-ledger.md:892`, row 733's claim: the code generator no longer crashes on that form; the gather closes the row.
- `explorations/coordinator/PLAN.md:58`: "each kind in its ledger row: rows 624, 733, 818, ...": row 733 holds no kind now; NEW-T-1 holds the trait-table kind.
- The specification: none (`grep -rn -i 'trait table\|first supertrait' Specification/appendices/changes.tex` prints nothing). The skill's `compiler.md`: no sentence lists this refusal (`grep -n -i "api's trait\|imported api\|supertrait" .claude/skills/fortress-repo/references/compiler.md` prints nothing).

## 9. Points to report

- Where the fix is, the type the comparison read, and why the table did not find it: section 2; `CodeGen.java:941`, `:1024-1059`; `STypesUtil.scala:1651`, `:1748-1750`; `TraitTable.scala:72-101`.
- The tests before and after through `junit.sh` and the harness: section 3.
- Row 732: not reached. Its form dies alike on the old and the new code with `AbstractMethodError` (section 6).
- Every sentence made false: section 8.
- A file edited beyond those named, or the checker's Scala: not reached. The only source edit is `CodeGen.java`'s `dumpMethodChaining` and the helper it reads; the tests are in the named folders; NEW-T-1's XXX test and its api are in `ProjectFortress/compiler_tests/`.

## 10. Decisions

1. **The fix's place: the relation that `dumpMethodChaining` compares against, made in the code generator** (`CodeGen.java:941`, `:1024-1059`). Not taken: `STypesUtil.gatherMethods` (the checker's too, `OverloadingChecker.scala:394`, `AbstractMethodChecker.scala:90`: checking code, fork T1); the trait table's lookup (`TraitTable.scala:72-101`, the checker's, fork T1); the team's `inheritedMethods` (`CodeGen.java:940`; it drops overridden declarations, `STypesUtil.scala:1462-1482`); a catch at the comparison; a comparison of names' texts (section 4). Follows fork T1's default.
2. **The first supertrait's own declarations found by the identity of the index's method objects.** Not taken: by name equality, since `Id.equals` compares the node's info, its span with it (`nodes/Id.java:54-72`), and the tuple's name and the extends clause's are distinct nodes; by `declaringTrait`, which holds the header's name too (`compiler/index/DeclaredMethod.java:41`, `FunctionalMethod.java:64`). `declaredMethods` takes its method objects straight from the index's relations (`STypesUtil.scala:1774-1777`), so identity finds exactly the own entries.
3. **Only the trait's name changes; the static arguments and the replacer stay as `allMethods` gives them.** Not taken: the extends clause's type whole, `first`, in place of `str.replaceIn(...)`. That would also change the generic case's substitution, which the comparison reads today for local traits; the smaller edit leaves every program that compiled before with the same answer (both names find the same index).
4. **The tests name the functional methods in the import**, `{ C, G, tag, gtag }`, by `source-code.tex:172-200`; not `{ C, G }`, which the checker refuses at `tag(c, 2)` by that rule (section 3); not `{...}`, which also reaches the wall but imports more than the program uses.
5. **Neither stage** (fork 3): both stop at the checker (section 7).
6. **The codegen probe on this tree only, like for like with the planner's `sed`**, compared with the record's latest table; not on the base (POSITIONS.md, "No re-measuring what the record holds."). The record's before is on an earlier tree, so only the trait-table kind is read as this change's.
7. **NEW-T-1's XXX test with bodies in the api's trait**, so that the specification's answer is plain; not the abstract form, whose answer it does not give (NEW-T-2). Its concatenation is `||`, since the compiler's prelude juxtaposes strings with a space (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:406`, row 76).
8. **Row 732 untouched** (fork T2): no test and no change of its row; its home stays the row it has.
9. **The ladder subset is `tests/wrongOverload.fss` alone**, the one baseline file whose first error names the trait table, though it stops before the code generator.

## 11. Defects and their homes

- **Row 733** (the code generator's crash at an object whose first supertrait is an imported api's trait): home 1, repaired; `TraitTableApiTraitCompiled` asserts each body.
- **NEW-T-1**, new: the code generator stops, 'Not in the trait table: S', at a call whose every argument is a type assumption, of a functional method that an imported api's trait declares more than once. Home 2: `type-annotation.tex`, "Type Assumption", settles the answer, so `ProjectFortress/compiler_tests/XXXAsIfApiTraitCompiled.test` (`compile`, `compile_exception_contains=Not in the trait table: S`) asserts it, with its api `AsIfApiTraitApi.fsi` and `.fss`. The program: api `trait S tag(self, n: ZZ32): String; tag(self, s: String): String end`, bodies `"n"` and `"s" || s` in its component; `object O extends S end`; `tag(O asif S, "d" asif String)` asserted `"sd"`, `tag(O asif S, k asif ZZ32)` asserted `"n"`. Measured: old code, 'java.lang.RuntimeException: Not in the trait table: S' at `CodeGen.methodsNamed(CodeGen.java:6469)` ← `emitBodyGivenBy(CodeGen.java:6513)`; new code the same at `:6506`; the trait local, old and new compile and print `sd`; walk prints `sd` with the trait in the api and local. Shown through the harness, as it is and red: The skeptic found the dotted form of the same stop, `(O asif S).m("d" asif String)`, at `methodsNamed` ← `assumedReceiverCall` (`CodeGen.java:6554` at the base), and added it to the test with two dotted `m` in the api's `S` (SKEPTIC.md); the runs below are the worker's, before that addition.

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx1 ProjectFortress/compiler_tests XXXAsIfApiTraitCompiled.test
      . compile ProjectFortress/compiler_tests/XXXAsIfApiTraitCompiled java.lang.RuntimeException: Not in the trait table: S
       OK Saw expected exception
      OK (1 test)

  and, with the two calls' assumptions removed for one run (`tag(O, "d")`, `tag(O, k)`), then restored:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx2 ProjectFortress/compiler_tests XXXAsIfApiTraitCompiled.test
       Saw failure, but did not satisfy compile_exception_contains; expected
      Not in the trait table: S
      Tests run: 1,  Failures: 1,  Errors: 0

- **NEW-T-2**, new: under walk, a call whose arguments are type assumptions stops with an internal error where the assumed types choose an abstract functional method. Home 3, a ledger row only: the specification does not say what such a call runs (`type-annotation.tex:45-48` makes the dynamic type the assumed one, and `S`'s chosen declaration has no body), and walk crashes on the program, so no gated test can pass while it shows. The program: a local `trait S abstract tag(self, n: ZZ32): String; abstract tag(self, s: String): String end`, `object O extends S` with both bodies, `println(tag(O asif S, "d" asif String))`; `bin/fortress AsIfLocalP.fss` at the rung's tree, whose walk is the base's: 'com.sun.fortress.exceptions.InterpreterBug: ...AsIfLocalP.fss:12:13-41: ** bug! MethodClosure tag(self:S,s:FortressLibrary.String):FortressLibrary.String ... has neither body nor def instanceof Method'; the same with `S` in an imported api; the compiled path, with the trait local, prints `d`.
- **Row 732** (measured, section 6): its home stays its row (fork T2).
- **Row 874** (FlatString's stop in the probe): known; section 6.
- **Row 76** (the prelude's string juxtaposition with a space, seen as 's d' in NEW-T-1's local probe on the old code): known.

## 12. Questions for the curator

- NEW-T-2: may a type assumption choose an abstract declaration, and what does the call run then? The compiled path runs the object's body; walk stops with an internal error. Evidence: `Specification/basic/expressions/type-annotation.tex:45-48`; section 11.
- NEW-T-1's repair: in `methodsNamed`, as this rung did in `dumpMethodChaining`, or once in `STypesUtil.gatherMethods` (`STypesUtil.scala:1651`), which would cover every code-generator site but is the checker's code too (`OverloadingChecker.scala:394`, `AbstractMethodChecker.scala:90`) and takes P-148's measure. Evidence: `CodeGen.java:6469` on the base; section 4.

## 13. Commands worked out

- The full stack of a declaration that the codegen probe refuses: copy `codegen.sh` under `tmp/`, set its `COMPONENTS` to the components needed, and before its first `javac` add `sed -i "s/Math.min(10, __st.length)/Math.min(80, __st.length)/g" "$O/shadow-src/com/sun/fortress/compiler/codegen/CodeGen.java"`; the `@@CG PREAT` lines then give 80 frames.
- A probe program with its own api on the compiled path: compile the api's component first (`bin/fortress compile Api.fss`), then the program; a plain `compile` of the program alone links no api class ('NoClassDefFoundError: Q1ApiB$B'), where a `.test` file's `link` compiles both.

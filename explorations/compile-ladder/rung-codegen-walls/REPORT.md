# Rung C (`rung-codegen-walls`): the code generator's three walls: `Any` in an `extends` clause, `forbid`, and `test`

problem: under the switch-over's setting the code generator refused 50 declarations of the one library's fourteen components in 14 kinds, three of them in one method each of `CodeGen.java`: 'Only handling some static args of generic types in extends clause' (`MIMapReduceReduction`, `TrivialOpenRange`; row 820), 'NYI: Forbid clauses are not yet implemented' (`shouldRaise`; row 821) and 'Don't know how to compile this kind of FnDecl.' (`test stringifyChars`; row 823) (explorations/coordinator/CLIMB-BATCH-25.md:375-385; ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5795-5796, :2029-2030, :2897-2899 at 97a416b18)
spec: a forbid clause throws "a new ForbiddenException ... with the thrown exception as its argument", the catch clause first (Specification/basic/expressions/try.tex:56-81), the same as a catch clause that throws ForbiddenException(e) (Specification/basic/exceptions.tex:177-210); an extends clause names any instance of a generic trait, Any among the static arguments (Specification/basic/traits.tex, "Trait Declarations"); the test modifier on a top-level function (Specification/basic/tests.tex:36-55, its note)
precedent: the IntArg branch of the same `generateTypeReference`, which repaired the same message for a size (row 411, e893a3e00; ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5863-5873); `forTry`'s own catch-clause loop and `forThrow` (:2047-2063, :2006-2017); the source call of a library constructor (`functionalRefToPackageClassAndMethod`, `resolveMethodAndSignature`, :3841-3857, :1492-1515); the trait guard that already holds `test` (ProjectFortress/src/com/sun/fortress/nodes_util/Modifiers.java:148-149)
deviation: the AnyType branch builds Any's name (`AnyType.Any`) and calls `generateTypeReference`, where the TraitType branch passes the trait type's own name (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5845-5851); the ForbiddenException call is emitted by a new private helper, `throwForbiddenException`, which finds the constructor in the library's api index, as no source call names it (:2089-2122); the guard admits `test` on methods as well as on top-level functions, where the specification's note speaks of top-level functions (:2947-2949); nothing else departs from the specification's spelling (none)
historical: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java (the team's sites at a874948ac: `forTry`'s throw :2013-2014, the guard :2866-2868, the AnyType branch :5753-5754)

## 1. What changed, and why

Three changes in `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and one helper that the second needs, nothing else of the original tree:

- `generateTypeReference`, its `AnyType` branch (base `:5795-5796`, now `:5845-5851`): it was empty and fell through to the throw 'Only handling some static args of generic types in extends clause' (base `:5802`). It now calls `generateTypeReference` with Any's own name, `NodeFactory.makeId(span, WellKnownNames.anyTypeLibrary(), WellKnownNames.anyTypeName)`, and no static arguments, and continues, as the `TraitType` branch does for a trait (`:5835-5837`). For a name without static arguments the method emits `GETSTATIC <its RTTI class>.ONLY` (`:5759-5767`), here `fortress/AnyType$Any$RTTIc.ONLY`, the field that the bootstrap class declares (`ProjectFortress/src/fortress/AnyType.java`, `RTTIc.ONLY`). The `BottomType`, `SelfType` and `AbbreviatedType` branches stay empty, each still ending in the throw (`:5833-5834`, `:5843-5844`, `:5852-5853`, throw `:5857`).
- `forTry` (base `:2019-2073`, now `:2019-2087`): the throw 'NYI: Forbid clauses are not yet implemented' (base `:2029-2030`) is gone. After the catch clauses, which are unchanged, each type of the forbid clause is tested in turn, as a catch clause tests its type (`DUP`, `FException.getValue`, `InstantiatingClassloader.generalizedInstanceOf`, `IFEQ`); on a match the exception's value is passed to `throwForbiddenException`. The rethrow (`ATHROW`) and the label `done` move out of the `if (catchClauses.isSome())` block (`:2041`, `:2078-2081`) and are emitted when the try has a catch clause or a forbid clause, so a try with neither emits what it emitted before.
- `throwForbiddenException` (new, `:2089-2122`): with the exception's value on the stack, it finds `ForbiddenException`'s constructor in the api index of `WellKnownNames.fortressLibrary()` (the component's own index when it is that library), takes its parameter type and its result, casts the value to the parameter's class, calls the constructor's static method through `idToPackageClassAndName` and `NamingCzar.jvmMethodDesc`, as a source call of `ForbiddenException(e)` is emitted, wraps the result in an `FException` as `forThrow` does (`NEW`, `DUP_X1`, `SWAP`, `INVOKESPECIAL`) and throws it. The api's own types are named unqualified in its index, so the descriptor is made with the library's api as the default: with the program's api the first run asked for `ForbidClauseCompiled$ForbiddenException.class`, 'Resource not found'. The emitted call is the source call's, `invokestatic fortress/CompilerLibrary.ForbiddenException:(Lfortress/CompilerBuiltin$Exception;)Lfortress/CompilerLibrary$ForbiddenException;` (by `javap -c -p` on the test's jar, the same instruction as a probe's source `throw ForbiddenException(e)` compiled on the base).
- `fnDeclCompilableModifiers` (base `:2897-2899`, now `:2947-2949`): `.combine(Modifiers.Test)`, so `forFnDecl`'s guard (`:3021`) passes a function declared `test`, which then compiles as the function it is. What `fortress test` runs is not changed.

Why: these are rows 820, 821 and 823, three of the code generator's 14 kinds over the library, each in one method (CLIMB-BATCH-25.md, fork 14; P-33); the specification gives each construct's meaning (the provenance lines), and walk runs all three (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1401-1436`, `interpreter/evaluator/CollectTests.java:51`).

## 2. The tests, failing then passing

Three compiled run tests, each with its `.test` (`link`, `run`, `run_out_contains=PASS`), and their walk guards, the same programs:

- `ProjectFortress/compiler_tests/ExtendsGenericAtAnyCompiled.fss`, `tests/ExtendsGenericAtAnyWalk.fss`: `trait Holder[\T extends Any\]` with `keep(x: T): T = x` and an abstract `describe()`, `object AnyHolder extends Holder[\Any\]`; asserts `describe()`, and that `keep` at `Any` keeps a `ZZ32` as a `ZZ32` and a `String` as a `String`.
- `ProjectFortress/compiler_tests/ForbidClauseCompiled.fss`, `tests/ForbidClauseWalk.fss`: a body throwing `Boom` under `forbid Boom` reaches the caller as a `ForbiddenException` whose `chain` is `Boom`; `forbid { CheckedException, UncheckedException }` turns `Bang` into one; a catch clause that takes `Boom` takes it before `forbid Boom`; a catch clause of another type leaves `Boom` to `forbid Boom`; `Fizz`, of no listed type, passes on as `Fizz`; a body that completes normally ignores the clause. Each `try` with a forbid clause is in a function of its own and the caller catches (section 9, D7).
- `ProjectFortress/compiler_tests/TestModifierCompiled.fss`, `tests/TestModifierWalk.fss`: `test twiceOfTwo(): () = assert(twice(2), 4, ...)` beside a `run` that asserts `twice(3)` and does not call the test (tests.tex's note: a non-test must not refer to a test).

The failing run, through the harness, on the base's build in this tree before the edit was built (`ProjectFortress/build/.../CodeGen.class` byte-equal to the base build's, `cmp`):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base2 ProjectFortress/compiler_tests ExtendsGenericAtAnyCompiled.test ForbidClauseCompiled.test TestModifierCompiled.test     # 2026-11-03T00:57:10Z
    com.sun.fortress.exceptions.CompilerError: Only handling some static args of generic types in extends clause
    java.lang.RuntimeException: NYI: Forbid clauses are not yet implemented
        Don't know how to compile this kind of FnDecl. node = twiceOfTwo():()
    Tests run: 6,  Failures: 6,  Errors: 0

The forbid test's text was then rewritten (D7) and seen failing again on the base's build at 2026-11-03T01:04:53Z ('java.lang.RuntimeException: NYI: Forbid clauses are not yet implemented', 'Tests run: 2,  Failures: 2,  Errors: 0'); `ant compileAll` ran after that run ended ('BUILD SUCCESSFUL', 'Total time: 50 seconds', 'Caches /home/user/fortress-codegen-walls/default_repository/caches started again, empty'), then the library order (five compiles, exit 0, five jars). The final texts on the old code, after one more rename in the forbid test (`outcome` to `thrownBy`, away from the contracts' name):

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base25 <tree>/tmp/rung-codegen-walls/old-caches junit <tree>/ProjectFortress/compiler_tests/ExtendsGenericAtAnyCompiled.test <tree>/ProjectFortress/compiler_tests/ForbidClauseCompiled.test <tree>/ProjectFortress/compiler_tests/TestModifierCompiled.test     # 2026-11-03T01:08:48Z
    com.sun.fortress.exceptions.CompilerError: Only handling some static args of generic types in extends clause
    java.lang.RuntimeException: NYI: Forbid clauses are not yet implemented
        Don't know how to compile this kind of FnDecl. node = twiceOfTwo():()
    Tests run: 6,  Failures: 6,  Errors: 0

The passing run, the last after the last change of code (the commit `bc72d9dec`), with the two `XXX` tests of section 10:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests ExtendsGenericAtAnyCompiled.test ForbidClauseCompiled.test TestModifierCompiled.test NestedTryInnerCatchLink.test XXXNestedTryInnerCatch.test XXXExtendsGenericAtTupleOfAny.test     # 2026-11-03T01:24:45Z
    . run ProjectFortress/compiler_tests/ExtendsGenericAtAnyCompiled (283ms) PASS
    . run ProjectFortress/compiler_tests/ForbidClauseCompiled (410ms) PASS
    . run ProjectFortress/compiler_tests/TestModifierCompiled (295ms) PASS
    OK (9 tests)

The walk guards, through the harness: on the base's build before the edit was built, `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-codegen-walls/h1 ProjectFortress/tests/ExtendsGenericAtAnyWalk.fss ProjectFortress/tests/ForbidClauseWalk.fss ProjectFortress/tests/TestModifierWalk.fss` at 2026-11-03T00:57:21Z, 'OK (3 tests)', and `ForbidClauseWalk` again on its rewritten text at 01:05, 'OK (1 test)'; after, with `NestedTryInnerCatchWalk.fss`, at 01:25:04Z, 'OK (4 tests)'. The rung changes no code that walk runs (`CodeGen` is the compiled path's), so walk's run after the build runs the base's walk; the run of the four guards on the base build's own harness was refused by the automatic permission check (section 8).

The first `XXX` test, `XXXNestedTryInnerCatch`, shown through the harness: as it is, green ('. run ProjectFortress/compiler_tests/XXXNestedTryInnerCatch (862ms) REACHED', 'Saw expected failure (Exit code != 0)', in `junit.sh after1` at 01:07:48Z); with `bothTake`'s expected value set to `outer` and the `innerTakes` assertion removed for one run, red ('Did not see expected failure', 'Tests run: 2,  Failures: 1,  Errors: 0', `junit.sh xxxred ... NestedTryInnerCatchLink.test XXXNestedTryInnerCatch.test`), then restored byte for byte (`cmp`).

Kept verdicts: the try and exception tests of the compiler track, the `where`-clause run tests of climb batch 24 and the modifier guard's siblings, 23 `.test` files in one JVM (`XXX9aa`, `XXX9ad`, `XXX9ae`, `XXX9af`, `XXX9ag`, `TryInArmRungGLink`, `TryOperandRungELink`, `XXXTryAtomicCodegenRungB`, `XXXTryCompareCoerceRungE`, `XXXTryInArmRungG`, `XXXTryOperandRungE`, `WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`, `WhereVariableCallCompiledLink`, `XXXWhereVariableCallCompiled`, `XXXOverrideModifierCodeGeneration`, `XXXFunctionContractCodeGeneration`, `NativeHelperFamilyIntegersCompiled`, `ExtendsAnyIsObject`, `CastBindRungG`): `junit.sh spot ...`, 'OK (36 tests)'; `Compiled9.ag.fss`'s forbid clause is still its static error ('All types in 'forbids' clause must be subtypes of Exception type, but Something is not.', 'Saw expected failure').

## 3. Where the fix belongs, and the precedent search

The map gives `try`'s code-generator site as `CodeGen.forTry` and the code generator as the compiled path's tail after the shared phases (`explorations/coordinator/map/spec-to-implementation.md:250`; `map/modules-and-phases.md`, "B.9 The compiler tail"); walk evaluates `forbid` itself (`Evaluator.java:1424`) and collects `test` functions itself (`CollectTests.java:51`), so a shared desugaring would change walk's path for nothing. Each wall is one throw or one guard in `CodeGen.java`, which the brief names.

Ways the language and the tree offer, and the one taken:
- Any's reference: a direct `GETSTATIC` of `Naming.stemClassToRTTIclass(NamingCzar.fortressAny)`; an `AnyType` turned into a `TraitType` for `generateTraitTypeReference`; Any's `Id` passed to `generateTypeReference` (taken: the TraitType branch's path, one node less, the naming rule in one place).
- The forbid clause: a desugaring before the checker into a catch clause that throws `ForbiddenException(e)`, the equivalence that `exceptions.tex:177-210` gives; a desugaring inside `CodeGen` into a synthesized `Throw` of a call; emission in `forTry` beside the catch clauses (taken, D2).
- The constructor's call: a hard-coded `fortress/CompilerLibrary.ForbiddenException` and its descriptor; a Java run-time helper that builds the object; the api index and the source call's naming (taken, D3).
- The guard: `Modifiers.Test` added (taken, D6); a check that admits `test` on top-level functions only; skipping a `test` function at code generation.

The precedent for the same defect: row 411's repair of the same message for a size added its branch in this method with a `continue` (e893a3e00, `CodeGen.java:5863-5873` now). In `generateTypeReference` the message is thrown at one site (`:5857`), for a type argument; a static argument of another kind that no branch takes throws 'Only emitting RTTI for types right now' (`:5881`); inside the tuple and arrow branches two more calls pass a null name for an element that is neither a trait type nor a type variable (`:5797`, `:5824`), which is NEW-C-2's crash. Of the type-argument branches, `SelfType`, `BottomType` and `AbbreviatedType` still fall to the throw. In `forTry` the forbid clause had one site, the throw; `fnDeclCompilableModifiers` has one use (`:3021`).

## 4. What the specification settles

- The forbid clause (`try.tex:56-81`): an exception the catch clause does not match, "a subtype of the exception type listed in a forbid clause", becomes "a new ForbiddenException ... with the thrown exception as its argument"; matched by both, "the exception is caught by the catch clause"; matched by neither, "the try expression completes abruptly"; a normal completion ignores the clause (`:47-53`). The tests assert each.
- An `extends` clause at `Any`: the checker accepts it, and walk runs it; the specification's grammar admits any type as a static argument (`traits.tex`, "Trait Declarations").
- `test` (`tests.tex:36-55`, the note): the modifier on a top-level function of type `() -> ()`; a non-test must not refer to a test. Running the tests is `fortress test`'s, which the rung leaves.

## 5. Programs run old against new, and the probes

- `NestedTryProbe` (scratch, the body of `XXXNestedTryInnerCatch`), compiled and run on the old code: 'REACHED', 'outer', then 'FortressException: class NestedTryProbe$Boom with string Boom'; under walk on the old code: 'inner', 'inner'. The defect is the base's (NEW-C-1).
- `AnyInTupleProbe` (`object PairHolder extends Holder[\(Any, ZZ32)\]`): on the old code and after the edit, 'java.lang.NullPointerException: Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null', at `NamingCzar.repairedApiName(NamingCzar.java:1720)` from `CodeGen.generateTypeReference` (NEW-C-2).
- `FbProbe`, a source `throw ForbiddenException(e)` in a catch clause, compiled on the base: its `javap -c -p` gives the instruction that `throwForbiddenException` now emits (section 1).
- The code generator over the library: the planner's `explorations/compile-ladder/plan-25/probes/codegen.sh` with its control (the 173 helper strings of `plan-25/probes/moved-base.tsv` put back on their glue classes, all 173 found), in one session, in a scratch worktree seeded detached at the base inside this tree's `tmp/` (removed after), once with the base's `CodeGen.java` and once with this rung's, the library sources edited only there:

      explorations/compile-ladder/plan-25/probes/codegen.sh <out>      # base CodeGen
      refused declarations 50 | emitted (OK lines) 696 | component failures 0
      kinds 14
      explorations/compile-ladder/plan-25/probes/codegen.sh <out>      # this rung's CodeGen
      refused declarations 47 | emitted (OK lines) 697 | component failures 0
      kinds 11
      rc=0 seconds=230

  The base run reproduces the planner's control (50, 696, 14 kinds). The declaration verdicts, diffed: `shouldRaise` from `FAIL` to `OK` (`Library/FortressLibrary.fss:339`), and the pre-pass failures of `MIMapReduceReduction` (`:3728`) and `TrivialOpenRange` (`:4070`) gone, their `OK` lines kept; `test stringifyChars` (`Library/String.fss:337`) passes the guard and stops at its next wall, 'Can't compile VarArgs yet', from `CodeGen.resolveMethodAndSignature` at its call of the varargs `assert` (row 624's kind; `String` now 3 of the 7). The kinds 'Only handling some static args of generic types in extends clause', 'NYI: Forbid clauses are not yet implemented' and 'Don't know how to compile this kind of FnDecl.' no longer occur. The probe's shadows of `CodeGen.java` (the distance stage's `shadow-patch.py`) built from the edited file.

## 6. Suites, stages, ladder, demos

- Suites: none whole. The edit is of the code generator: its own tests and the spot check of section 2; the tracks are the gate's (`tests-running.md`, "When to run a whole suite"; fork 12). No four-thread atomic runs: nothing near transactions or the class loader changed.
- The stages: neither run. The count stage and the distance stage run the checker, not the code generator (fork 13); no checker code changed, so no speed pass (fork 15). The paths changed are under `ProjectFortress/compiler_tests/`, `ProjectFortress/tests/` and `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`.
- The ladder subset: `tests/NatReflectTest.fss`, the one file whose recorded first error names a wall this rung touched ('Only handling some static args of generic types', `explorations/compile-ladder/ladder.tsv`, the snapshot of 2026-09-17; the baseline's `raw/` holds only the 85 passing programs, none naming these walls). The drivers copied under `tmp/rung-codegen-walls/ladder/` as `gate.md` says: phase `link`, 'Unable to read serialized data for NatReflect$N??, recommend you delete the Fortress bytecode cache and relink'; the old code's compile and run of it give the same output (`diff` empty after masking the times), so the move from that snapshot's `codegen` is earlier work's (row 411, e893a3e00), not this rung's. It is not among the 85 of the newest landed `climb-batch-24/gate/ladder/ladder.tsv`.
- The demos: not run; the gather's (fork 11), and the rung edits neither walk nor a shared phase.

## 7. Sentences made false

None of the specification's: no sentence of `Specification/` describes the code generator's refusals of these constructs (`grep -n -i "code generator\|forbid" Specification/appendices/changes.tex` names none of rows 820, 821, 823). The notes 'Chained exceptions are not yet supported.' (`Specification/basic/expressions/try.tex:15`) and 'Methods and fields of exceptions, chained exceptions, ... are not yet supported.' (`Specification/basic/exceptions.tex:15-16`) speak of every exception's `message` and `chain` fields (`exceptions.tex:108-137`), which neither library declares; both stay true.

Of the record and the skill:
- `explorations/coordinator/FACTS.md:116`, F-268: "The code generator throws on `Any` as a static argument in an `extends` clause, after the checker has accepted the program." False now, but for a tuple that holds `Any` (NEW-C-2).
- `explorations/coordinator/FACTS.md:31`, F-34: its count of refusals and kinds is of climb batch 22's code; on this rung's tree with the control, 47 in 11 kinds (section 5).
- Rows 820, 821 and 823, their claims (`explorations/fortress-gap-ledger.md:864`, `:865`, `:867`): each construct compiles.
- Row 650's notes (`explorations/fortress-gap-ledger.md:849`): "holds the getter, setter, `io`, `private` and `abstract` modifiers only"; its new line is in `record.md`.
- `.claude/skills/fortress-repo/references/compiler.md:44`: "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private` and `abstract`, such as `override` (ledger row 650)." It now passes `test` too.
- `explorations/coordinator/CLIMB-BATCH-25.md:375-385`, the planner's 14 kinds: three of them no longer occur (a dated measurement, not to be edited).
- `explorations/perf-probes/codegen-distance/REPORT.md`, section 3, the rows of these three messages: a dated probe report, likewise.

## 8. Points to report

- Each method changed, and what else the emission needed: `forTry` (`CodeGen.java:2019-2087`), `generateTypeReference`'s `AnyType` branch (`:5845-5851`), `fnDeclCompilableModifiers` (`:2947-2949`); the emission needed one more method, the new private `throwForbiddenException` (`:2089-2122`). No other line of `CodeGen.java` changed (`git diff 97a416b18 -- ProjectFortress/src`).
- The tests before and after through `junit.sh`, and the walk guards through the harness: section 2. One step not taken: the run of the four walk guards with the base build's own `harness-one.sh` (`FORTRESS_HOME=/home/user/fortress-base25`) was refused by the automatic permission check ('[Modify Shared Resources]'); not retried by another route. The three named guards were seen passing on the base's build in this tree before the edit was built; `NestedTryInnerCatchWalk` was seen passing after the build only, on the base's walk code, and its body's walk answer on the old code through `old-fortress.sh` ('inner', 'inner').
- Each compiled test whose verdict changes in the compiler track: the track was not run (fork 12); of the 23 `.test` files run beside the new ones, none changed (section 2). The new files are new.
- Every sentence made false: section 7.
- A file edited beyond those named, or an edit of the checker's Scala: none. Beyond the three tests and guards, the rung adds `XXXNestedTryInnerCatch` (`.fss`, `.test`), `NestedTryInnerCatchLink.test`, `tests/NestedTryInnerCatchWalk.fss` and `XXXExtendsGenericAtTupleOfAny` (`.fss`, `.test`), in the named test folders, for the two defects it met.

## 9. Decisions

- D1. Any's type reference by `generateTypeReference` on Any's own name (`AnyType.Any`), `continue` after, as the IntArg branch does. Not taken: a direct `GETSTATIC` of `Naming.stemClassToRTTIclass(NamingCzar.fortressAny)` (the same bytes, a second spelling of the naming rule); a `TraitType` built for `generateTraitTypeReference` (the same path through one more node). Evidence: the non-generic path emits `GETSTATIC <RTTIc>.ONLY` (`CodeGen.java:5759-5767`), and `fortress/AnyType$Any$RTTIc.ONLY` exists (`ProjectFortress/src/fortress/AnyType.java`); `ExtendsGenericAtAnyCompiled` passes.
- D2. The forbid clause emitted in `forTry`, after the catch clauses. Not taken: a desugaring into a catch clause in a phase both paths run (walk evaluates `forbid` itself, `Evaluator.java:1424`, and the brief keeps the edit in `CodeGen.java`); a synthesized `Throw` of a call inside `CodeGen` (the code generator reads the checker's types off a call, which a synthesized node lacks). No decision of the curator covers it beyond the brief's file list.
- D3. The constructor found in the api index of `WellKnownNames.fortressLibrary()` and named as a source call is. Not taken: `fortress/CompilerLibrary` and its descriptor written in (wrong after the switch-over, where `Exception` and `ForbiddenException` are both `FortressLibrary`'s, `Library/FortressLibrary.fss:1776`, `:1824`, while today `Exception` is `CompilerBuiltin`'s, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:739`); a Java run-time helper. Evidence: the emitted instruction equals the source call's (section 1).
- D4. The order: catch clauses first, then the forbid clause's types in their order, else the rethrow, as walk's `handleException` (`Evaluator.java:1401-1436`) and `try.tex:56-81`.
- D5. A `try` with neither a catch nor a forbid clause emits what it emitted before; only programs with a forbid clause change. Not taken: reworking that path (its handler leaves the exception on the stack, by reading; not measured, no row).
- D6. `Modifiers.Test` added to the guard, so `test` passes on methods too, as `Modifiers.TraitMod` admits it for traits and objects (`Modifiers.java:146-147`). Not taken: a check for top-level functions only (the parser's `MdMod` admits `test` on methods, `Modifiers.java:151-154`); leaving test functions out of the jar (the specification's tests run by `fortress test`, which a compiled path would call).
- D7. The forbid tests put each `try` with a forbid clause in a function of its own, its caller catching, since a `try` nested in another in one body is matched against the outer one first (NEW-C-1, measured on the base). Not taken: fixing that order in `forTry` (the exception-table entry written after the body), which changes every nested `try` and needs the compiler track; it is not this rung's row. Recorded as an `XXX` pair instead.
- D8. NEW-C-2, the tuple holding `Any`, recorded by an `XXX` compile test, not fixed: the brief limits the change of `generateTypeReference` to its `AnyType` branch.
- D9. The code generator over the library measured as a pair in one session in a scratch worktree, the control's library edits only there. Not taken: no measurement (the four declarations' later walls unknown); the control in this tree (edits of `Library/`, which the brief keeps out of the rung).

## 10. Defects, and their homes

- Row 820, `Any` in an `extends` clause: home 1, `ExtendsGenericAtAnyCompiled`.
- Row 821, the forbid clause: home 1, `ForbidClauseCompiled`.
- Row 823, the `test` modifier: home 1, `TestModifierCompiled`.
- NEW-C-1, a `try` nested in another in one body is matched against the outer `try` first, on the compiled path: home 2 (the specification settles it, `try.tex:56-81`; the run fails, the link passes), `XXXNestedTryInnerCatch` with `NestedTryInnerCatchLink.test`, and `tests/NestedTryInnerCatchWalk.fss` for walk's answer.
- NEW-C-2, a tuple static argument that holds `Any` in an `extends` clause crashes the code generator: home 2 (a code-generator wall after the checker accepts; `traits.tex`), `XXXExtendsGenericAtTupleOfAny` (`compile_exception_contains=NullPointerException`), green ('OK Saw expected exception').
- `test stringifyChars`'s next wall, a call of a varargs function: row 624's kind, already recorded (the planner's probe report, section 3, note (a)); its new line in `record.md` adds the caller's case.

## 11. For FACTS

In `record.md`: a new entry (the three constructs compile; the library's refusals 50 to 47 under the control), F-268 false and its replacement, and F-34's count.

## 12. Commands worked out

- The planner's code-generator probe with its control, as a pair: a detached worktree seeded at the base inside `tmp/` (`seed-worktree.sh /home/user/fortress-base25 <tree>/tmp/rung-codegen-walls/cgtree - 97a416b18...`), the 173 strings of `moved-base.tsv` replaced, each searched from its line through three lines after, by a short Python script; `codegen.sh <out>` with `FORTRESS_HOME` at that worktree, once with the edited `CodeGen.java` copied in and once with it checked out; `diff` of the `@@CG OK|FAIL|PREFAIL|CTORFAIL` lines, cut to their first three fields; `git worktree remove --force` after.
- Compiled tests on the old code in one JVM: `old-fortress.sh <base-build> <tree>/tmp/<caches> junit <tree>/ProjectFortress/compiler_tests/X.test ...`, run from the tree's root.

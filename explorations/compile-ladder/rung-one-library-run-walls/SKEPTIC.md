# Climb batch 36, rung C (`rung-one-library-run-walls`): the skeptic's review

Head judged: `b5a3c0ad88` (the worker's last commit; code commit `7c7b040927`), from the base `b5a758846d`. One launch of the skeptic's role worked the rung. The worker's `REPORT.md` and `record.md` were already on the branch (`e2d187f543` to `b5a3c0ad88`), so the journal step wrote nothing and made no commit.

Verdict: **approved**. The change is right and its record honest, with one trim and three corrections of mine below; none is contested.

## What I checked

1. **Stages.** The report says neither stage ran. `git diff --name-only b5a758846d...HEAD` lists three paths outside the stage-blind folders: `compiler/OverloadSet.java`, `compiler/codegen/CodeGen.java` and `compiler/codegen/CodeGenClassWriter.java`. All three are code generation, which neither stage runs; the section has the rung run no stage and list its files (STAGE_BLIND), and the report lists them. No checker or Scala file changed, so I ran no count stage.
2. **Test first**, from the worker's transcript. The base run (call `SAx3pn`, 03:13:59) echoed its `Expected failure:` line before the harness command, ran the tests through `old-fortress.sh ... junit` on the base's code with private caches copied from `caches-one`, and ended at 03:14:11, before the first build of the edit (03:25:41). Its log holds the lines that `recordedFailure` quotes: '. run .../OneLibraryStringEquality (738ms) REACHED', 'Caused by: java.lang.NoClassDefFoundError: FortressLibrary', 'F. run .../OneLibraryArr (681ms) java.lang.ClassFormatError: Duplicate method name "-?0"', 'Tests run: 15,  Failures: 6,  Errors: 0'. `OneLibraryRangeReduction` was written after the edit was built and was run on the old code (call `xWU9PF`, ended 03:38:21, its own `Expected failure:` line): 'Duplicate method name "narrowToRange"', 'Tests run: 2,  Failures: 1'. The last change of code was at 03:30:30 (call `GHpwB6`); `ant testOneLibrary` started at 03:40:02 (`XnSqTG`) and printed 'Tests run: 50, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 175.754 sec' and 'BUILD SUCCESSFUL'. The worker's new `XXX` test was shown green and then red on a deliberate fix (`jjmYvS`, `mDSGYS`).
3. **The diff.** `OverloadSet`'s four names now ask `NamingCzar.javaPackageClassForApi(f.tagA)` (fork C1), which equals `Naming.dotToSep` for an api outside the default library (`NamingCzar.java:933-940`, `runtimeSystem/Naming.java:1004-1007`), so only a default library's names change. `CodeGenClassWriter` holds the methods written between `startBridges` and `endBridges` and writes each at `visitEnd` only where its name and descriptor are free (fork C2). The key `name + desc` is the team's own form (`CodeGen.java:3302`, `:7395`, `OverloadSet.java:2533`). A held bridge is replayed into the inner `ClassWriter` (`cv`), already mangled, and `COMPUTE_FRAMES` recomputes its frames. One CodeGenClassWriter serves one class, so the record does not leak between classes. One trim, below.
4. **Precedent.** The worker found the rehearsal's W11 (`plan-31/probes/switch-rehearsal.md:120-127`) and the four calls of `javaPackageClassForApi` already in `OverloadSet.java`; no bare api name is left there (`grep -rn 'dotToSep(' compiler runtimeSystem` shows only payload and loader names). For the methods written twice, `74f53ec88`'s gathering and `overrideBridges`' `bridged` set stay; the team has no record of written methods in the class writer, and the worker's device takes the team's key form.
5. **The tests.** Each has one comment line and no line number of the specification. `OneLibraryArr.fss` repeated `OneLibraryArray1.fss` line for line (correction 1).
6. **My programs**, below.
7. **Homes.** The worker's homes hold (`XXXGenericMethodClosureSelfThroughTrait` fails the same way on the base's code, so row 1137 is the base's). The defects my programs measured get theirs below.
8. **Ledger and siblings.** `ledger-find` for the walls my programs met: row 643 holds a vector's `+` and `-`; no row holds the bridge target of 1138 (`ledger-find` on 'tabulate', 'bridge', 'substituted', 'narrowing bridge', 'forwarder' and 'same name static parameter'); none holds 1137's closure ('VerifyError closure', 'closure self', 'Bad type operand').
9. **The report.** Its provenance lines hold: `XXXOneLibraryRunStringEquality.test:1` at the base says what it claims; `traits.tex:581-592` says a trait inherits the declarations of its supertraits except those whose parameter type, self apart, equals one that occurs in it; `CodeGen.java:1094` holds `allMethodsNotReplaced` and `:1234` the `bridged` set; `CodeGenClassWriter.java:40-54` the record; all four historical files are in `a874948ac`. The two clauses of `changes.tex` are true as rewritten (`OneLibraryVarargsArguments` runs; row 1098 stops a varargs program that prints a number), and `grep -n 'against \\library\|compiled against' Specification/appendices/changes.tex` shows no other clause on these walls. A code-generator edit asks no whole suite (the skill's `tests-running.md`).
10. **Competing names.** `OneLibraryDot`, `OneLibraryVarargsArguments`, `OneLibraryRangeReduction`, `GenericMethodClosureSelfThroughTrait`, and my `TraitBridgesWrittenOnce` and `NarrowingBridgeTargetParameterName`, are each declared once in the test folders and named nowhere in `ProjectFortress/src`; `startBridges`, `endBridges` and `bridging` occur only in `CodeGenClassWriter.java` and `CodeGen.java`.
11. **Failure mode**, at the end.

## My programs, old against new

Each compiled on the base's code (`/home/user/fortress-wsuite/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-wsuite <private caches> compile P.fss`, then `run P`) and on the rung's (`FORTRESS_HOME=<worktree> FORTRESS_CACHES=<private copy of the worktree's caches> bin/fortress compile P.fss`, then `run P`), at four threads, and under walk on the old code where marked; the driver is `tmp/rung-one-library-run-walls/skeptic/dr.sh`. Walk's code is unchanged by the rung.

| program | library | base compiled | rung compiled | walk |
|---|---|---|---|---|
| `SkOwnOverDispatch` (a trait's own `-` and prefix `-` over its self-typed parent's, plain and generic) | prelude | PASS | PASS | PASS |
| `SkRealOverload` (an inherited narrower `pick(ZZ32)` beside the trait's own `pick(Any)`) | prelude | PASS | PASS | PASS |
| `SkSelfNarrow` (a generic trait's own `m()` at its type over its parent's `m(): T`) | prelude | PASS | PASS | PASS |
| `SkTwoParents` (a trait narrows `f` that two generic parents declare) | prelude | 'Duplicate method name "f" ... C$DefaultTraitMethods' | PASS | PASS |
| `SkNatSelfType` (Vector's shape: `Vn[\E, nat s0\]` over `Grp`, and `copy` over a self-typed parent) | prelude | 'Duplicate method name "prefix -?0"' | PASS | PASS |
| `SkNatOverload` (the same with an inherited narrower `pick`) | prelude | 'Duplicate method name "-?0"' | PASS | not run |
| `SkBridgeTargetCapture`, `SkCapSmall` (the library's `tabulate` chain) | prelude | 'Duplicate method name "mk"'; `SkCapSmall`: 'NoSuchMethodError ... Vc⟦Ar⟦ZZ32⟧⟧ Vc⟦ZZ32⟧.tab' | 'NoSuchMethodError' (both) | PASS (`SkBridgeTargetCapture`) |
| `SkCapRenamed` (`SkCapSmall` with Vc's parameter named `U`) | prelude | PASS | PASS | not run |
| `SkOneVarargs` (`SUM` over a varargs array, `String...`, a plain parameter before one) | one | 'Duplicate method name "copy"' | PASS | not run |
| `SkOneRanges` (`BIG MAX` over `1#n`, `PROD` over `1:n`, a double `SUM`, `BIG OR`) | one | 'Duplicate method name "narrowToRange"' | PASS | not run |
| `SkOneStrings` (`<=`, `>`, `>=`, `=/=` of strings, `=/=` and `=` of booleans) | one | 'NoClassDefFoundError: FortressLibrary' | PASS | not run |
| `SkOneVecOps` (`+`, `-`, prefix `-` of two `vector[\RR64,3\]`) | one | 'Duplicate method name "-?0"' | 'NoSuchMethodError ... Vector⟦FRR64,3⟧.\=ivmap...' (row 643) | not run |
| `SkOneVecCopy` (`copy` of a `vector[\RR64,3\]`) | one | 'Duplicate method name "-?0"' | 'NoSuchMethodError ... Vector⟦Array1⟦FRR64,0,3⟧,3⟧ Vector⟦FRR64,3⟧.tabulate(...)' (1138) | not run |
| `SkOneList` (`emptyList[\ZZ32\]() = emptyList[\ZZ32\]()`) | one | 'Duplicate method name "=?0" ... List⟦FZZ32⟧$DefaultTraitMethods' | 'VerifyError: Bad type on operand stack' in `fn@4056` (1137) | PASS |
| `XXXGenericMethodClosureSelfThroughTrait` (the worker's) | prelude | 'VerifyError: Bad type on operand stack' | the same | PASS |

`OneLibraryDot`, `SkOneRanges` and `SkOneVarargs` compiled by the rung's code print `PASS` at `FORTRESS_THREADS=1` and at 4. The diff writes no run-time state; its fields are the class writer's, at compile time.

Where every program that the base could not load now runs, its values are walk's, and each asserted value is the type's own declaration's: in `SkOwnOverDispatch` and `SkNatSelfType` the parent's `-` would give 8 and its prefix `-` 10, against the asserted 2 and -5.

A comparison of the method sets: for each of the 2183 class files in the one library's jars on the base (the base build's `caches-one`) and as the rung's code compiled them (the worktree's `caches-one`), the set of (name, descriptor) pairs (`python3 -I tmp/.../skeptic/setdiff.py jars-old jars-new`):

    GAINED fortress.FortressLibrary.jar fortress/FortressLibrary.class \=denominator{_|Library|FortressLibrary\,fss\!643\!5-52,_|Library|FortressLibrary\,fss\!729\!5-30} (Lfortress/FortressLibrary$Ratio;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;
    setdiff: 2183 classes old, 2183 new, 1 method pairs on one side only

No pair is lost: the record drops only a second method of a pair. The one gained pair is a top-level dispatch between `QQ`'s and `Ratio`'s `denominator`, which neither edit writes: the record only drops methods, and the four names of `OverloadSet` are call sites. It is the checker's tie order of rows 935 and 1100, which rung K takes up, and the two compiles ran apart.

## Findings and what I did

1. **`OneLibraryArr.fss` repeated `OneLibraryArray1.fss`**, the compile test of row 1061, line for line; the skill's `tests-writing.md`, "Names, comments, citations", asserts a case in one test only. Correction `c66ae0c47c`: `OneLibraryArr.test` compiles and runs `OneLibraryArray1`, as `OneLibraryRunStringEquality.test` runs `OneLibraryStringEquality`, and `OneLibraryArr.fss` goes. The brief's `OneLibraryArr` stays, a compile test and a run test asserting `a[5] = 25`. On the base's code:

        Expected failure: on the base's code, through fortress junit in one JVM against the one library (old-fortress.sh, private caches copied from the base build's caches-one), OneLibraryArr.test, now over OneLibraryArray1's program, compiles and its run fails with 'ClassFormatError: Duplicate method name "-?0"' in Vector's class: 'Tests run: 2,  Failures: 1'.
        FORTRESS_LIBRARY=one old-fortress.sh /home/user/fortress-wsuite <worktree>/tmp/.../skeptic/old-one junit one_library_tests/OneLibraryArr.test
        . run .../one_library_tests/OneLibraryArray1 (1264ms) java.lang.ClassFormatError: Duplicate method name "-?0" with signature "(Lfortress.FortressLibrary$\=Vector?...FZZ32,8?;)...
        Tests run: 2,  Failures: 1,  Errors: 0

   On the head (`ant testOneLibrary`, below): '[junit]  run ProjectFortress/one_library_tests/OneLibraryArray1 (832ms) Passed'.

2. **The methods written twice were not the library's alone.** Under the compiler's prelude a program's own traits met the same shapes on the base (`SkTwoParents`, `SkNatSelfType` above), where the record says the prelude's 476 classes held none: true of the library's classes, not of a program's. Home 1 for these, correction `319eb91d1b`: `compiler_tests/TraitBridgesWrittenOnce.test`, which runs in the compiler track and needs no one library.

        Expected failure: on the base's code, through fortress junit in one JVM against the compiler's prelude (old-fortress.sh, private caches), TraitBridgesWrittenOnce links and its run fails with 'ClassFormatError: Duplicate method name' (Vn's - in its class of default methods, or C's f), NarrowingBridgeTargetParameterNameLink links, and XXXNarrowingBridgeTargetParameterName's run fails after REACHED with 'NoSuchMethodError' on Vc's tab, which the harness counts as expected: 'Tests run: 4,  Failures: 1'.
        old-fortress.sh /home/user/fortress-wsuite <worktree>/tmp/.../skeptic/old-pre junit compiler_tests/TraitBridgesWrittenOnce.test compiler_tests/NarrowingBridgeTargetParameterNameLink.test compiler_tests/XXXNarrowingBridgeTargetParameterName.test
        . run .../compiler_tests/TraitBridgesWrittenOnce (429ms) java.lang.ClassFormatError: Duplicate method name "prefix -?0" with signature "()LTraitBridgesWrittenOnce$\=Vn?FZZ32,3?;"
        Tests run: 4,  Failures: 1,  Errors: 0

   On the head:

        ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skhead ProjectFortress/compiler_tests TraitBridgesWrittenOnce.test NarrowingBridgeTargetParameterNameLink.test XXXNarrowingBridgeTargetParameterName.test GenericMethodClosureSelfThroughTraitLink.test XXXGenericMethodClosureSelfThroughTrait.test OverrideBridgesCompiledLink.test OverrideBridgesCompiled.test
        . run ProjectFortress/compiler_tests/TraitBridgesWrittenOnce (618ms) PASS
        . run ProjectFortress/compiler_tests/OverrideBridgesCompiled (563ms) PASS
        OK (9 tests)

3. **New defect, row 1138: a narrowing bridge's target names a parent's binding of a same-named static parameter.** In the class of default methods of `Vc[\T\] extends Ar[\T\]`, where `Ar[\T\] extends Par[\Ar[\T\], T\]` and `Vc` narrows `Par`'s `tab`, the bridge at `Par`'s signature calls `Vc⟦ZZ32⟧.tab(Arrow⟦ZZ32,Ar⟦ZZ32⟧⟧)` answering `Vc⟦Ar⟦ZZ32⟧⟧`: `Par`'s `T ↦ Ar[\T\]` is applied to `Vc`'s own `T`. It is the base's (`SkCapSmall` dies so on both codes; `SkCapRenamed`, with `Vc`'s parameter named `U`, runs on both) and the classification the worker's report leaves as it is ("What it does not change"). Against the one library `Vector`'s bridge for `StandardMutableArrayType`'s `tabulate` does the same, so a vector's `copy` dies now that its class loads. The specification settles the answer (`basic/traits.tex`, "Method Declarations"; walk prints `PASS`), so home 2, correction `97d9487abc`: `compiler_tests/XXXNarrowingBridgeTargetParameterName.test` with `NarrowingBridgeTargetParameterNameLink.test`, and the row in `record.md`. Green on the base's code and on the head ('Saw expected failure (Exit code != 0)', in the two runs above), and red for one run with `Vc`'s parameter renamed `U`:

        Expected: with Vc's parameter renamed U for this run only, the defect does not show; XXXNarrowingBridgeTargetParameterName's run prints PASS and the harness reports it red: 'Tests run: 2,  Failures: 1'.
        ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skred ProjectFortress/compiler_tests NarrowingBridgeTargetParameterNameLink.test XXXNarrowingBridgeTargetParameterName.test
        . run ProjectFortress/compiler_tests/XXXNarrowingBridgeTargetParameterName (566ms) REACHED
        PASS
        Tests run: 2,  Failures: 1,  Errors: 0

   Repairing it is not this rung's: the section asks each method written once, and the bridge's descriptor is computed in `dumpOverloadedMethodChaining` (`CodeGen.java:1321-1700`), outside the members it names.

4. **What still stops the programs that now load**, added to `record.md` (findings 2, 3, 7 and 8, F-396's text): a vector's `+` and `-` call the inherited generic `ivmap` by name, row 643; its `copy` meets 1138; `=` of two lists meets 1137.

5. **Trim, `b61662765d`.** `overrideBridges`, `forObjectDeclPrePass` and `forTraitDecl` held the class writer in a local alias, `CodeGenClassWriter bridgesTo = cw;`, before `startBridges`; no code between the two marks reassigns the field (`grep -n '\bcw = \|\.cw = ' CodeGen.java`), so each now calls `cw.startBridges()` (`newcg.cw` in `forTraitDecl`), as `dumpMethodChaining` already did (`CodeGen.java:1162`). Built as one code state (`ant compileAll`, 'BUILD SUCCESSFUL', both caches started again), then the library order and:

        ant testOneLibrary      (on b61662765d's code; the test files as committed)
        [junit] Tests run: 50, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 182.207 sec
        BUILD SUCCESSFUL

   and the compiler tests above, 'OK (9 tests)'. A code-generator edit asks no whole suite.

## Where I differ from the worker's report

- Its table row for `OneLibraryArr.test` says "new, from `plan-34/probes/programs/Arr.fss`": after correction 1 the test runs `OneLibraryArray1.fss`, the same program.
- "the prelude's 476 classes held none" (REPORT.md, "What changed and why") is true of the prelude library's classes only; a program's own classes under the prelude held methods twice (finding 2).
- Its points to report name `CodeGenClassWriter.java` as the file beyond those named, but not `CodeGen.java`'s members beyond the section's lines `:974-1240`: `forObjectDeclPrePass` (`:5334-5343`) and `forTraitDecl` (`:6112-6122`). Both are the writing of a class's bridges and dispatch methods, rung C's subject, and neither is a member of rung K or rung N.
- The FACTS entry's tests gain `compiler_tests/TraitBridgesWrittenOnce.test`.

## The failure-mode question

The rung turns a loud failure, a class that does not load ('ClassFormatError: Duplicate method name'), into a class that loads. Where two methods of one name and descriptor meet, the class now keeps the class's own method over a held one, and the first held method over a later one, without a message. In every shape measured (the scan's 25 in the library, and my programs above) the kept method is the one the specification gives, as `traits.tex`, "Method Declarations", has a type's own declaration replace an inherited one at the same parameter types: each value matches walk's. In a shape not measured, a wrong pick would give a quiet wrong value where the base stopped at load. Two held methods whose descriptors differ in a template and agree only at an instance are still not seen (the worker's own limit).

## Fixes and corrections

| commit | kind | what |
|---|---|---|
| `b61662765d` | trim | the class writer's marks name `cw` itself in three members |
| `c66ae0c47c` | correction (test) | `OneLibraryArr.test` over `OneLibraryArray1`'s program |
| `319eb91d1b` | correction (test) | `compiler_tests/TraitBridgesWrittenOnce`, home 1 of the prelude's shapes |
| `97d9487abc` | correction (test, row, record) | `compiler_tests/XXXNarrowingBridgeTargetParameterName` with its link test, row 1138, and `record.md`'s walls after the rung |

Contested: none. The count and distance tables: none, as the section has it.

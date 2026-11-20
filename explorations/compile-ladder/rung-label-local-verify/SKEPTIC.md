<!-- Climb batch 34, rung L (rung-label-local-verify): the skeptic's check of the worker's change, its corrections, and its verdict. -->

# Rung L: the skeptic's check

Head judged: `3527ba2c0e` (the worker's last commit; its code is `08c8d57777`'s, the later two commits prose only). One launch of the skeptic's role worked the rung. The branch already carried `REPORT.md` and `record.md`; the run journal's texts of both (`journal-text.py ... reportText`, `recordText`) differ from them only by a final newline, so nothing was written from the journal. Machine: 4 CPUs, Intel Xeon @ 2.30GHz, OpenJDK 25.0.4.1; every run under `nice -n 19`, beside another rung's agent.

**Verdict: approved.** The change is right and as small as its test needs; my commits are corrections of the test's reach and of the report, none contested.

## What I checked

1. **The stages.** The section sets none for L, and the report says neither ran. `git diff --name-only 639eef1806...HEAD` lists `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` beside the test's two files and this folder: a code-generator file, outside the list of paths that no stage can see; the batch record gives L no stage (CLIMB-BATCH-34.md, the rung's section, "The stages. None."), and the edit changes no refusal of the code generator, only the environment it reads. The gate's tables on the merged tree are the record. The shadow patch ran at 15:01:50 on the edited `CodeGen.java` (edit at 14:59:38), 'shadow patch exit=0', and wrote `compiler/codegen/CodeGen.java` into its shadow folder.
2. **Test first**, from the worker's transcript, the run's one transcript of `rung:L`: the test written at 14:58:28, its first run through the harness at 14:58:44 on the base's code (call `z1NnBu`, `ONE_JVM=1 ... junit.sh base ProjectFortress/compiler_tests BlockBindingScopeCompiled.test`), the only edit of code at 14:59:38 (call `YXjQD4`), its build at 15:03:33 (`build1.txt`, 'BUILD SUCCESSFUL'), the pass at 15:05:21 (call `VsFYLj`, '. run ... PASS', 'OK (2 tests)'), `ant testFast` at 15:11:33 on `08c8d57777` ('BUILD SUCCESSFUL', 'Total time: 12 minutes 8 seconds'). The failure seen is the one the section names, the verifier's message on the base: '. run ... java.lang.VerifyError: Bad local variable type', 'BlockBindingScopeCompiled.localFunctionAfterArm(...) @99: aload_2', 'Tests run: 2,  Failures: 1'. The transcript holds no `Expected failure:` line written before that run (its reasoning is not in the transcript); REPORT.md said "stated before the first run", corrected (below).
3. **The diff**: `forLocalVarDecl` (`CodeGen.java:4822-4828`) binds the declaration's variables into the nested code generator of its body, after the initializer, in place of the visiting one. `new CodeGen(this)` copies the environment (`CodeGen.java:398`), a `BATree` whose copy shares the root (`useful/BATree.java:112-113`) and whose `put` sets its own root to a new tree (`:216-222`; `BATreeNode.add` builds new nodes, `useful/BATreeNode.java:181-193`), so the nested binding never reaches the visiting environment; a `LocalVar` uses its code generator only for `mv` and `thisApi()` (`VarCodeGen.java:125-131`), which the two share. The binding is still out of scope in its own initializer (row 983's repair, `76b21f4981`). Six lines, one moved: no smaller form.
4. **The precedent**: `forLabel` (`:1959-1961`), `forLetFn` (`:4025`, `:4035`), a `typecase` binder (`:2590-2592`, `:2623`) bind into a nested code generator. Of the 8 `addLocalVar` calls, the other three bind parameters and `self` at a method's level (`:733`, `:742`, `:3344`). `addStaticVar` binds fields and statics, whose scope is the object or the component. The task environments (`delegate`, `:5661-5674`) put back the caller's own environment (`restoreFromTaskLexEnv` returns its second argument, `:5621-5623`). No other site leaks. Every desugarer that makes a `LocalVarDecl` nests the rest in its body (`ExprFactory.java:1733`, `TempVarDecl.scala:37-41`, `AssignmentAndSubscriptDesugarer.scala:111-113`, `CaseExprDesugarer.java:99`, `DesugaringVisitor.java:468-471`), so no program's later statement reads a binding outside its body; `ant testFast` agrees.
5. **The test** reaches the defect in four forms; its one comment line cites the specification by file and section; its name is its topic; no other declaration of its names in the test folders, `Library/` or `ProjectFortress/src/com/sun/fortress/`. It did not reach a binding of another block form whose slot a later local takes, where the base fails otherwise: corrected (below).
6. **My programs** (below), under walk and compiled, old code against new.
7. **Homes**: row 1078's cause, home 1 (`BlockBindingScopeCompiled`); row 815's `(Ratio)` overload method in the one library, a note on row 815, whose `XXXFunctionalMethodComprisedObject` holds the form (`trait QQ ... comprises { Ratio }`, `Library/FortressLibrary.fss:625-628`); `Arr`'s 'Duplicate method name', row 1091. The two forms my programs measured are row 1078's cause, repaired by the change: home 1, two cases added to the test.
8. **The ledger**: `ledger-find` on 'Bad local variable type', 'captures', 'shadow*', 'scope local variable compiled' gives rows 1054, 983, 1078 and the disambiguator's rows on names (92, 147, 262); rows 81 and 322 (the record's siblings) are other causes (322: the operand stack at a handler). Row 1078 closes; row 983 stays as written.
9. **The report**: its five provenance lines open as cited, but for the binder's lines, `:2589-2591` for `:2590-2592` (corrected); `declarations.tex:462-465` is "the reach of a local variable declaration is the smallest block in which that declaration occurs", `:536-552` the scope's exclusions, `blocks.tex:57-58` "Each expression block introduces a new scope"; `grep -rn '~1078' Specification --include=*.tex` prints nothing, and no sentence of the specification says how the compiled path scopes a local, so none is made false. The scratch copy's saved runs bear out its numbers: after the repair, `java -cp tmp/vj:<asm jars> VerifyJars default_repository/caches-one ProjectFortress/build` printed 'JAR fortress.FortressLibrary.jar methods 4694 refused 0', 'TOTAL classes 1092 methods 9477 refused 2 templates skipped 1092', two `REFUSED` lines, both `RangeInternals`; before it, `runprog.sh <copy> Hello` printed 'Hello run, verifier on, rc=1', '... simplestRationalBetween(...) @1297: aload', 'Type top (current frame, locals[8])'. The scratch copy's `CodeGen.java` is `08c8d57777`'s (a `diff` prints nothing), which the rehearsal patch does not touch, and its `FortressLibrary.fss` holds only the patch's row 1076 stand-in. `ant testFast` by track: compiler 1768, library 86, misc 471, onelibrary 14, othercompiler 263, 0 failures. record.md: row 815's note fits, but the row with it is 1,196 characters, not 1,197 (`ledger.py note 815 ... --check`: 'with it the notes have 11 characters left of 700 and the row 4 of 1200'): corrected.
10. **Names**: none competes (item 5).
11. **The failure mode**: the change turns a `VerifyError` at the class's load, or a `ClassCastException` at run time (below), into the value that walk gives and the specification's scope rule asks; no loud failure becomes a quiet wrong value, since a closure never reads the spuriously captured name.

## My programs, old code against new

Each a program of my own, not kept, run from the rung's tree: new code `bin/fortress compile P.fss`, `FORTRESS_THREADS=N bin/fortress run P`, and walk `bin/fortress P.fss`; old code the same through `old-fortress.sh /home/user/fortress-base40 /home/user/fortress-label-local-verify/tmp/old-caches`. Walk is the same code on both and gives the same answer on both.

| program | the form | walk | new, 1 thread | old, 1 thread |
|---|---|---|---|---|
| `SkShadowOuter` | a local shadowed in both arms | 'Variable x is already declared.' | the same | the same |
| `SkFieldLocal` | a method's local of a field's name | 'Variable r is already declared.' | the same | the same |
| `SkElseNumeralSum` | `n` bound in an `else` arm, then `SUM[i <- 0#3] (i + 1)` | `7`, `3` | `7`, `3` | 'VerifyError: Bad local variable type ... pick(...) @132: aload_2' |
| `SkWhileBody` | `v` bound in a `while` body, then `fn (x) => x + 1` | `10`, `1` | `10`, `1` | 'VerifyError ... @287: aload_3' |
| `SkTypecaseElse` | `v` bound in a `typecase`'s `else` block, then a local function | `7`, `11` | `7`, `11` | 'VerifyError ... @131: aload_3' |
| `SkTryArm` | `n` bound in a `try` block in an arm, then a function expression | `15`, `3` | `15`, `3` | 'VerifyError ... @157: aload_2' |
| `SkTupleArm` | `(r, v)` bound in an arm, then `add(up(a), up(a + 2))` | `17`, `0` | `17`, `0` | 'VerifyError ... @141: aload_2' |
| `SkNestedDoReuse` | `r` bound in a `do` block, its slot then a `String`'s, then a function expression | `later`, `12`, `later`, `2` | the same | 'java.lang.ClassCastException' at run time |
| `SkInitBlockReuse` | `r` bound in an initializer's block, its slot then a `String`'s, then a local function | `mid`, `13`, `mid`, `-2` | the same | 'java.lang.ClassCastException' at run time |
| `SkInnerCapture` | a local function and a function expression inside the arm that capture its binding | `14`, `0` | `14`, `0` | `14`, `0` |
| `SkMutableArm` | `var r` in an arm, then a parallel `for` with `atomic` | `14`, `10` | `14`, `10` | `14`, `10` |

At four threads (the compiled path, `FORTRESS_THREADS=4` on both runs): `SkMutableArm` `14`, `10` on both; `SkTupleArm` and `SkElseNumeralSum` the new code's answers above, the old code's `VerifyError`. No program that ran on the old code gives another answer on the new: the reserved point is not reached. The disambiguator refuses every shadowing of a local (`SkShadowOuter`, `SkFieldLocal`; `declarations.tex:533`, "No other shadowing is permitted in a Fortress program"), so no stale entry can stand for a name in scope.

## Corrections

1. **`ca10e0129e`, the test** (`ProjectFortress/compiler_tests/BlockBindingScopeCompiled.fss`): two cases of row 1078's cause that the test did not reach, `doBlockSlotReused` (a binding of a nested `do` block) and `initializerBlockSlotReused` (a binding in a declaration's initializer block), each whose slot a later `String` local takes before a closure whose numeral names `r`; on the base each fails at run time, not in the verifier. The comment line names the three block forms. Seen failing through the harness on the old code, each alone in a cut copy of the test (16:53:35Z and 16:53:56Z, `old-fortress.sh ... junit <cut>/BlockBindingScopeCompiled.test`):

   ```
   . run .../skeptic/cut/BlockBindingScopeCompiled (412ms) java.lang.ClassCastException
   Caused by: java.lang.ClassCastException: class com.sun.fortress.compiler.runtimeValues.FJavaString cannot be cast to class com.sun.fortress.compiler.runtimeValues.FZZ32 ...
   	at BlockBindingScopeCompiled.doBlockSlotReused(.../cut/BlockBindingScopeCompiled.fss:11)
   Tests run: 2,  Failures: 1,  Errors: 0
   ```
   ```
   . run .../skeptic/cut2/BlockBindingScopeCompiled (432ms) java.lang.ClassCastException
   	at BlockBindingScopeCompiled.initializerBlockSlotReused(.../cut2/BlockBindingScopeCompiled.fss:10)
   Tests run: 2,  Failures: 1,  Errors: 0
   ```
   The whole test on the old code (16:54:22Z, `cd ProjectFortress && old-fortress.sh ... junit .../compiler_tests/BlockBindingScopeCompiled.test`): '. run ... java.lang.VerifyError: Bad local variable type', 'BlockBindingScopeCompiled.localFunctionAfterArm(...) @99: aload_2', 'Tests run: 2,  Failures: 1'. On the head, four threads (16:54:26Z, `ONE_JVM=1 nice -n 19 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skeptic ProjectFortress/compiler_tests BlockBindingScopeCompiled.test`): '. run ProjectFortress/compiler_tests/BlockBindingScopeCompiled (486ms) PASS', 'OK (2 tests)'; one thread by hand (`cd ProjectFortress; ../bin/fortress compile compiler_tests/BlockBindingScopeCompiled.fss; FORTRESS_THREADS=1 ../bin/fortress run BlockBindingScopeCompiled`): 'run rc=0', `PASS`; walk (`../bin/fortress compiler_tests/BlockBindingScopeCompiled.fss`): `PASS`. Settled by the rung's section ("a compiled test against the prelude ... that dies with the verifier's message on the base and runs after") and `tests-writing.md`, "How a defect is recorded", home 1: the defect that my programs measured is the one the change repairs, so its home is an assertion in the rung's plain test.
2. **`58cb62a2c2`, the report and the record**: REPORT.md's expected failure is the one the section names, the transcript holding no `Expected failure:` line before the first run; the binder's lines `:2590-2592`; a sentence on the two added cases. record.md: row 815 with its note is 1,196 characters.

No code changed after the worker's: the head's code is `08c8d57777`'s, and the worker's `ant testFast` on it is the suite of this code state; my commits change a test and prose, so no suite and no stage ran again. The test's whole run on the merged tree is the gate's.

## Where I differ from the worker's account

- Decision 4, "one test of four cases": six now, the two of review in the same test, by its topic.
- The report's "Expected failure, stated before the first run": not shown by the transcript; the failure seen is the section's, so test first holds.

## Points to report

- The cause as found: slot 8, the arm's `r = ceiling(n0/d0)` (`Library/FortressLibrary.fss:603`), the path `d1 =/= 0`, the closure of `simplest` loading it at `@1297`; `CodeGen.java:4815` on the base (REPORT.md, "The cause, by the bytecode").
- The test against the prelude, red on the base and green after at one thread and at four: `ProjectFortress/compiler_tests/BlockBindingScopeCompiled.test` (above).
- `simplestRationalBetween` after the repair verifies in the scratch copy; the planner's count, 0 of 4,694 of `fortress.FortressLibrary.jar`, 2 in all (row 1054's form).
- The shadow patch applies: exit 0.
- Files for STAGE_BLIND: `CodeGen.java`, the test's `.fss` and `.test`, this folder; none beyond those named.
- Reserved: no model line; no program that ran gives another answer.
- For the gather's order: L's lowest edited line of `CodeGen.java` is `:4812`, P's members begin at `forFunctionalRef`'s `:4468`, and P's members include the call of `assumedArgumentsCall` in `forFunctionalRef` at `:4468` (CLIMB-BATCH-34.md:441), so the rule of CLIMB-BATCH-34.md:574 ("the one whose lowest edited line is lower goes first") may not give L, P, T.

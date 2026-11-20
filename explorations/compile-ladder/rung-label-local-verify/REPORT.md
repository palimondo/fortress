<!-- Climb batch 34, rung L (rung-label-local-verify): the cause of row 1078 traced in a scratch copy of the planner's rehearsal, a binding of an if arm that stayed in the code generator's environment after the arm and was captured by a later closure; a test against the prelude, and the repair in CodeGen.forLocalVarDecl. -->

# Rung L: a label body's local and the JVM's verifier in `simplestRationalBetween` (row 1078)

- problem: the rehearsal's wall 2, 'VerifyError: Bad local variable type ... fortress/FortressLibrary.simplestRationalBetween(...) @1297: aload ... Type top (current frame, locals[8])' (`explorations/compile-ladder/plan-34/probes/rehearsal.md:38`)
- spec: the reach of a local variable declaration is the smallest block in which it occurs (`Specification/basic/declarations.tex:462-465`, section "Reach and Scope of Declarations"); "Each expression block introduces a new scope" (`Specification/basic/expressions/blocks.tex:57-58`)
- precedent: `forLabel` puts the label's name into a nested code generator for its body only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1959-1961`), as `forLetFn` does for a block's local functions (`:4025`, `:4035`) and a `typecase` clause for its binder (`:2589-2591`)
- deviation: none
- historical: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` (the team's `forLocalVarDecl` added each binding to its own code generator, `a874948ac:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3930`)

Worktree `/home/user/fortress-label-local-verify`, branch `wip/rung-label-local-verify`, cut from `639eef1806`; one launch of this role worked the rung. The fix and its test are commit `08c8d57777`. Machine: 4 CPUs, Intel Xeon @ 2.30GHz, OpenJDK 25.0.4.1, every build and run under `nice -n 19`, another rung's agent working beside this one.

## What changed and why

`CodeGen.forLocalVarDecl` (`CodeGen.java:4735`) added each variable that a declaration binds to the environment (`lexEnv`) of the code generator that visited the declaration, then made a nested code generator for the declaration's body, the rest of the block. The variable's scope is that body, but the entry stayed in the visiting code generator's environment after the body ended. Where the declaration is the first element of an `if` arm, the visiting code generator is the one of the enclosing block: `forIf` visits its arms on itself (`CodeGen.java:4554-4599`), and so does every block form whose elements `doStatements` visits on the current code generator (`forBlockHelper`, `CodeGen.java:2045-2051`). So after the arm, the arm's variable stayed in the environment, with the slot that `outOfScope` had already given back.

A closure (a local function or a function expression) or a task captures each variable of its environment whose name its body holds: `getFreeVars` looks up in the environment every name that `FreeVariables` collects from the body, its own bindings and the static parameters of the arrow types it calls among them (`CodeGen.java:5471-5487`; row 983 for the second kind). So a closure after the arm whose body names a variable of the arm's variable's name captured the stale entry, and loaded the slot at the closure's construction; on the path that skipped the arm the slot holds no value, and the class fails verification as it loads.

The edit (`CodeGen.java:4812-4818`) adds the bindings to the nested code generator of the declaration's body instead, still after the initializer, so the row 983 repair stays (a variable is not in scope in its own initializer). Nothing else changes: 6 lines of `CodeGen.java`, 1 moved and its comment rewritten.

## The cause, by the bytecode

In the scratch copy (below), `javap -c -p fortress/FortressLibrary.class`, from the copy's `caches-one/bytecode_cache/fortress.FortressLibrary.jar` on the base's code, shows the refused instruction and the local:

```
      1225: invokestatic  #1442               // Method ceiling:(Lfortress/FortressLibrary$QQ;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;
      1228: astore        8
      ...
      1293: new           #1451               // class "FortressLibrary$\\=fn@607\\!5-620\\!8"
      1296: dup
      1297: aload         8
      1299: checkcast     #176                // class com/sun/fortress/compiler/runtimeValues/FZZ
      1302: invokespecial #1454               // Method "FortressLibrary$\\=fn@607\\!5-620\\!8"."<init>":(Lcom/sun/fortress/compiler/runtimeValues/FZZ;)V
      1305: astore        8
```

- The local: slot 8 at 1228 is `r = ceiling(n0/d0)`, the first binding of the arm `if d1 = 0 then ... exit done with q end` (`Library/FortressLibrary.fss:601-606`). The arm ends in its exit (`athrow` at 1285).
- The path: the one that skips the arm, `d1 =/= 0`, the only one that reaches 1293. Slot 8 there holds a value only where an earlier arm's tuple assignment used it as a temporary (`astore 8` at 290 and 718, the `GreaterThan` arm and the `if n1 < 0` arm); on the path through neither it is unset, so the frame's merge is `top`.
- The construct: the local function `simplest` (`Library/FortressLibrary.fss:607-620`), whose closure class `\=fn@607!5-620!8` takes one `FZZ` in its constructor: the stale `r`. Its body names `r` twice over: its own binding `r = nl MOD dl` (`:609`) and the numerals `1` of `(q,1)` and `(q+1,1)`, whose coercion's static parameters are `n`, `r` and `v` (row 983). Slot 8 at 1305 is then the closure itself, which took the slot that `r` gave back.

Two controls in the copy, each `FortressLibrary` compiled again alone (`FORTRESS_LIBRARY=one ../bin/fortress compile ../Library/FortressLibrary.fss`) and `runprog.sh <copy> Hello`:

- `simplest`'s own `r` renamed `rm`: the same refusal at `@1297`, the closure still `<init>(FZZ)`, since its numerals still name `r`.
- the arm's `r` renamed `rc` (`:603-604`): `simplestRationalBetween` passes the verifier; the load stops at another class (row 815's kind, below).

The label block and the exit are not part of the cause: the label only makes the arm's exit leave the function. The two prelude copies of the shape (`plan-34/probes/programs/LabelLocals3.fss`, `LabelLocals4.fss`) left out the local function, so nothing after the arm named `r`. Against the prelude, each of these four one-construct programs fails the same way on the base (probe programs, not kept; each `../bin/fortress compile P.fss`, then `../bin/fortress run P`):

```
ArmLocalFn run rc=1    ... ArmLocalFn.pick(...) @99: aload_2      Type top (current frame, locals[2]) is not assignable to reference type
ArmFnExpr run rc=1     ... ArmFnExpr.pick(...) @92: aload_2       Type top (current frame, locals[2]) ...
ArmLabel run rc=1      ... ArmLabel.pick(...) @51: aload_2        Type top (current frame, locals[2]) ...
ArmTask run rc=1       ... ArmTask.pick(...) @122: aload_2        Type top (current frame, locals[2]) ...
```

and the control `ArmLocalFnOther`, whose local function binds `w` in place of `r`, runs (`12`, `-4`). In `ArmLocalFn`, `javap -c -p` shows the same form: `60: astore_2` (the arm's `r`), `95: new ...fn@9...`, `99: aload_2`, `103: invokespecial ...<init>:(FZZ32)V`, `106: astore_2`.

## The test (fork L1: a test against the prelude)

`ProjectFortress/compiler_tests/BlockBindingScopeCompiled.fss` and `.test` (`link`, `run`, `run_out_contains=PASS`): four functions, each with a binding first in an `if` arm and, after the arm, a local function that binds the same name, a function expression that does, a label block whose arm exits before a local function that does (the library's form), and a forked call `add(up(k), up(k + 1))` whose numeral names `r`; each asserted on the path through the arm and on the path that skips it.

Expected failure, stated before the first run: the link case passes and the run case fails, the class failing the JVM's verification as it loads, 'java.lang.VerifyError: Bad local variable type ... Type top (current frame, locals[2]) is not assignable to reference type', one failure of two tests.

The failing run, on the base's code, before the edit was first built (2026-11-20T14:58:44Z, four threads): `ONE_JVM=1 nice -n 19 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests BlockBindingScopeCompiled.test`

```
. link ProjectFortress/compiler_tests/BlockBindingScopeCompiled  OK (time = 3615ms)
. run ProjectFortress/compiler_tests/BlockBindingScopeCompiled (234ms) Exception in thread "main" java.lang.VerifyError: Bad local variable type
    BlockBindingScopeCompiled.localFunctionAfterArm(Lcom/sun/fortress/compiler/runtimeValues/FZZ32;)Lcom/sun/fortress/compiler/runtimeValues/FZZ32; @99: aload_2
    Type top (current frame, locals[2]) is not assignable to reference type
Tests run: 2,  Failures: 1,  Errors: 0
```

At one thread on the base, by hand (`cd ProjectFortress; ../bin/fortress compile compiler_tests/BlockBindingScopeCompiled.fss; FORTRESS_THREADS=1 ../bin/fortress run BlockBindingScopeCompiled`): `run rc=1`, 'java.lang.VerifyError: Bad local variable type', the same location.

The passing run, on `08c8d57777`'s code, after the last change of code (2026-11-20T15:05:21Z, four threads), the same command with the label `fix`:

```
. link ProjectFortress/compiler_tests/BlockBindingScopeCompiled  OK (time = 4719ms)
. run ProjectFortress/compiler_tests/BlockBindingScopeCompiled (434ms) PASS
OK (2 tests)
```

At one thread by hand, the same two commands: `run rc=0`, `PASS`. In `ant testFast` on the same code: `[junit]  run .../compiler_tests/BlockBindingScopeCompiled (914ms) Passed`. Under walk the program runs too (`../bin/fortress BlockBindingScopeCompiled.fss`: `PASS`), so the defect is the compiled path's only.

## The repair in the scratch copy

The scratch copy is a worktree beside the rung's, `/home/user/fortress-label-local-verify-scratch`, seeded detached at `639eef1806` from the base build `/home/user/fortress-base40`, with `explorations/compile-ladder/plan-34/probes/rehearsal-34.patch` applied less its two hunks of row 1078's stand-in (`Library/FortressLibrary.fss` at `:575` and `:622` of the patch's base, lines 18-36 of the patch file), then `ant compileAll` (41 s), `lib14.sh` (FortressLibrary 92 s, the fourteen exit 0) and `runprog.sh <copy> Hello`. On the base's code:

```
Hello run, verifier on, rc=1
Exception in thread "main" java.lang.VerifyError: Bad local variable type
    fortress/FortressLibrary.simplestRationalBetween(Lfortress/FortressLibrary$QQ;Lfortress/FortressLibrary$QQ;)Lfortress/FortressLibrary$QQ; @1297: aload
    Type top (current frame, locals[8]) is not assignable to reference type
Hello run, verifier off, rc=0
```

With the repair copied in (`CodeGen.java` of `08c8d57777`) and the library's text restored, `ant compileAll` (37 s), `lib14.sh` (FortressLibrary 95 s, the fourteen exit 0), `runprog.sh <copy> Hello`:

```
Hello compile rc=0
Hello run, verifier on, rc=0
Hello, one library
Hello run, verifier off, rc=0
Hello, one library
```

The closure is now made with nothing captured (`javap -c -p fortress/FortressLibrary.class`): `1293: new ...fn@607...`, `1296: dup`, `1297: invokespecial ...<init>:()V`, `1300: astore 8`.

The planner's verifier count on the copy's caches (`javac -d tmp/vj -cp <asm 9.10.1, asm-tree, asm-analysis> verify/VerifyJars.java`, then `java -cp tmp/vj:<the same jars> VerifyJars default_repository/caches-one ProjectFortress/build`):

```
JAR fortress.FortressLibrary.jar methods 4694 refused 0
REFUSED RangeInternals.jar RangeInternals$FullRange2D$DefaultTraitMethods.\=_\{_\}(Lfortress/AnyType$Any;)Lfortress/AnyType$Any; : Error at instruction 18: Expected an object reference, but found .
REFUSED RangeInternals.jar RangeInternals$FullRange3D$DefaultTraitMethods.\=_\{_\}(Lfortress/AnyType$Any;)Lfortress/AnyType$Any; : Error at instruction 21: Expected an object reference, but found .
TOTAL classes 1092 methods 9477 refused 2 templates skipped 1092
```

Before the repair the rehearsal's count refused three, `simplestRationalBetween` and these two (rehearsal.md, section 4, its before); after it, these two of row 1054's form, as after the rehearsal's stand-in. No method of `fortress/FortressLibrary` is refused, so no new row for a second cause. `runprog.sh <copy> Arr` meets the next wall that the rehearsal names, row 1091, with the verifier on ('java.lang.ClassFormatError: Duplicate method name "-☞0"'), and with it off prints `a[5] = 25`.

## Where the fix belongs, and the precedent search

- Place: `compiler/codegen/CodeGen.java`, the member that binds a local (`forLocalVarDecl`), a member of this rung's list ("the binding of a local"). The defect is the code generator's environment, which only the code generator keeps; the checker and walk scope the variable rightly (walk runs the test). Neither `forLabel` nor `forExit` holds the cause, and no member that rung P or rung T names does.
- Precedent: every other block form of the file that binds a name binds it in a nested code generator for the scope alone: `forLabel` (`:1959-1961`), `forLetFn` (`:4025`, `:4035`), a `typecase` clause's binder (`:2589-2591`) and its second form (`:2623`). Of the file's 8 calls of `addLocalVar`, these 4 bind into a nested code generator, 3 bind a method's parameters and `self` at the method's own level (`:733`, `:742`, `:3344`), whose scope is the whole method, and the eighth was `forLocalVarDecl`'s. So no other site leaks.
- The row 983 repair (`76b21f4981`) moved the same line after the initializer, and kept it on the visiting code generator; the edit keeps its order.

## What the specification settles

A local variable's reach is the smallest block in which its declaration occurs, and its scope leaves out the points before the declaration (`Specification/basic/declarations.tex:462-465`, `:536-552`); every expression block is a new scope (`Specification/basic/expressions/blocks.tex:57-58`). So the arm's `r` and `simplest`'s `r` have reaches that do not overlap, the library's function is valid, and after the arm no name `r` is in scope. The disambiguator agrees: a local that would shadow a top-level variable is refused, 'Variable r is already declared.' (a probe `ArmShadowTop`, compiled on this code). `grep -rn '~1078' Specification --include=*.tex` prints nothing.

## Programs run old against new

- `ArmBothLocalFn` (probe, not kept): both arms of an `if` bind `r`, then a local function binds its own `r`. The old code (`old-fortress.sh /home/user/fortress-base40 <tree>/tmp/rung-label-local-verify/old-caches compile ArmBothLocalFn.fss`, then `run ArmBothLocalFn`) and the new (`bin/fortress compile`, `run`) both print `10` and `995`. Its closure's constructor is `<init>:(FZZ32)V` on the old code (the stale `r` captured, never read: the slot is set on both paths, so it verified) and `<init>:()V` on the new. So a program that verified before gives the same answer.
- `disp2` and `XXXtypecaseTest` (ladder subset, below) on the old code: `f PASS`, `g PASS`; and 'The typecase clause, ZZ32, is unreachable.', as on the new.

## Suites

`ant testFast`, once, on `08c8d57777`'s code, 12 minutes 8 seconds beside another agent's work:

```
BUILD SUCCESSFUL
Total time: 12 minutes 8 seconds
```

By track (`ProjectFortress/TEST-RESULTS/fast-*`): compiler 1768, library 86, misc 471, onelibrary 14, othercompiler 263; 0 failures, 0 errors. `compiler_tests/LocalBindingForkedNumeralCompiled`, row 983's test of the same lines, passes in it. The four-thread atomic runs are not asked for: the edit is not near transactions, top-level mutable state or the class loader.

## The stages, the shadow patch and STAGE_BLIND

The rung's section asks for no stage: neither the count stage nor the distance stage was run. The files of the change, for STAGE_BLIND: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/compiler_tests/BlockBindingScopeCompiled.fss`, `ProjectFortress/compiler_tests/BlockBindingScopeCompiled.test`, and this folder. No file beyond those that the section names.

The distance stage's shadow patch applies to the edited `CodeGen.java`: `python3 explorations/coordinator/tools/distance/shadow-patch.py ProjectFortress/src/com/sun/fortress <scratch>/shadow-src && python3 explorations/coordinator/tools/distance/add-patch.py <scratch>/shadow-src` exit 0.

## The ladder subset

By gate.md's rule the subset is the files whose recorded first error names what the change touched: no file of the baseline's `ladder.tsv` or `raw/` names a `VerifyError` or a local variable's slot (`grep -i 'verif\|Bad local' explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` prints only `LocalVar.fss`, 'Missing parameter type for x', a checker error), and the newest landed `ladder.tsv` (`climb-batch-33b/gate/ladder/ladder.tsv`) holds only the 85 passing programs, which the gate runs. So the subset ran the five programs that the baseline records as compiling and running without passing, which the code generator compiles whole, with copies of the drivers and a private root under the rung's `tmp/`: `XXXGenericOverload`, `XXXcaseTest` and `XXXtypeParamShadowing` at `run` with the baseline's first errors; `disp2` at `pass` (baseline `run`, 'f FAIL'), and `XXXtypecaseTest` at `typecheck` (baseline `run`), 'The typecase clause, String, is unreachable.'. Both moves are the base's: the old code gives `f PASS`, `g PASS` for `disp2` and refuses `XXXtypecaseTest` with the checker's unreachable clause.

## Sentences of the specification made false

None. No passage of `Specification/` says how the compiled path scopes a local variable; `grep -rn '~1078' Specification --include=*.tex` prints nothing; the notes on the compiled path near the features (`grep -rn -i 'verif\|compiled path\|code generator'` over `label.tex`, `blocks.tex`, `variables.tex`, `declarations.tex`, `functions.tex`) are `functions.tex:192-199` on varargs only.

## Points to report reached

- The cause as found: slot 8, the arm's `r = ceiling(n0/d0)` (`Library/FortressLibrary.fss:603`); the path `d1 =/= 0` that skips the arm; the local function `simplest` (`:607-620`), whose closure loads the slot at `@1297` ("The cause, by the bytecode"); in the code generator, `CodeGen.forLocalVarDecl` (`CodeGen.java:4815` on the base).
- The test against the prelude: `compiler_tests/BlockBindingScopeCompiled`, red on the base at four threads (the harness) and at one (by hand), green after at both.
- The one library's `simplestRationalBetween` after the repair: its class passes the verifier in the scratch copy, `Hello` runs with the verifier on, and `VerifyJars` refuses 0 of `fortress.FortressLibrary.jar`'s 4,694 methods (2 in all, row 1054's form in `RangeInternals`).
- The distance stage's shadow patch still applies to the edited `CodeGen.java`: exit 0.
- The files edited, for STAGE_BLIND: `CodeGen.java` and the test's two files; none beyond those named.
- Reserved: a model line, none; a program that ran and now gives another answer, none found (`ArmBothLocalFn`, above).
- For the gather's order: this rung's lowest edited line of `CodeGen.java` is `:4812`, in `forLocalVarDecl`, not `forLabel`'s `:1942`, which the record's expected order L, P, T took for it (CLIMB-BATCH-34.md, "The rule the rungs keep").

## Decisions

1. **The repair in `forLocalVarDecl`, the binding added to the body's code generator.** Ways not taken: (a) visit each arm and block in a nested code generator in `forIf`, `forBlock`, `forWhile`, `forTry` and the other block forms (`cgWithNestedScope`, `CodeGen.java:715-718`), many sites for one cause, and a block form missed keeps the leak; (b) remove the entry, or restore the shadowed one, at `outOfScope`, which `VarCodeGen` cannot reach since it holds no environment; (c) make `FreeVariables` subtract a body's own bindings, which leaves the numerals' `r` (row 983) and so the library's method still refused, as the first control shows; (d) rename the library's `r` (`Library/FortressLibrary.fss:603`), which the section excludes and which leaves the defect for programs. Evidence: the declaration's body is the specification's scope; the file's other binding forms do so (precedent search).
2. **A plain test against the prelude, not L1's fallback.** The cause reproduces against the prelude in four forms, so `one_library_tests/XXXOneLibraryRunHello` is not written here.
3. **The cut in the copy as two renames, not deletions of the function's constructs one by one.** Each compile of `FortressLibrary` costs about 95 s; one rename of each `r` decides which binding is captured, and the four prelude programs are the one-construct cuts. Way not taken: cutting the label body down in the copy.
4. **One test of four cases, named by its topic, `BlockBindingScopeCompiled`.** Ways not taken: a test per construct; a test named after the library's function.
5. **The rename control's second refusal as a note on row 815, not a new row.** The `(Ratio)` overload method is row 815's form, which its notes record as "once `(R)` on a first compile"; after the repair, with the fourteen compiled in order, the method is `(QQ)` and nothing of `FortressLibrary` is refused, so the section's condition for a new row is not met.
6. **Row 983 unchanged.** Its claim, captures of variables in scope, holds after the change; its notes have 6 characters left, and the change adds no fact about the in-scope captures that it states.
7. **The ladder subset as the five compiling, running, non-passing programs**, since gate.md's rule selects none; way not taken: no subset run.

## Defects and their homes

- Row 1078's cause, a local binding of a nested block left in the code generator's environment and captured by a later closure or task: home 1, repaired by `08c8d57777`, asserted in `compiler_tests/BlockBindingScopeCompiled`; row 1078 closes with it.
- `QQ$DefaultTraitMethods.isFinite` failing verification, 'Bad type on operand stack ... Type 'fortress/FortressLibrary$QQ' (current frame, stack[0]) is not assignable to 'fortress/FortressLibrary$Ratio'', where `\=denominator{FortressLibrary.fss:643, :729}` was emitted at `(Ratio)`, seen once, after `FortressLibrary` alone was compiled again into the copy's caches (the second control): home 2, row 815, whose `XXXFunctionalMethodComprisedObject` holds the form; a note added (record.md). With the fourteen compiled in order the overload method is `(QQ)` (`javap` of `QQ$DefaultTraitMethods`: `invokestatic ...\=denominator{...}:(Lfortress/FortressLibrary$QQ;)...`).
- `Arr`'s `ClassFormatError` with the verifier on: row 1091, met as the rehearsal met it.

## For FACTS

See record.md, "FACTS".

## Commands worked out

- The scratch copy's patch without the stand-in: `awk 'NR<18 || NR>36' explorations/compile-ladder/plan-34/probes/rehearsal-34.patch > <file>`, then `git apply <file>` in the copy.
- One component of the one library compiled again: `cd ProjectFortress && rm -f ../default_repository/caches-one/bytecode_cache/fortress.FortressLibrary.jar && FORTRESS_LIBRARY=one ../bin/fortress compile ../Library/FortressLibrary.fss`.
- A template-free class of a library jar read: `unzip -o -q <jar> 'fortress/FortressLibrary.class'` then `javap -c -p`; a whole unzip fails on names past the file system's limit.
- Row 815's line with the note added, for the lint: `Ledger(...).one(815)` with `insert_note` of `explorations/coordinator/tools/ledger.py`, then `ledger.py check --rows FILE`.

## Questions for the curator

None.

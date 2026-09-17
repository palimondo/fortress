<!-- Rung 3 of coordinator/PLAN.md: top-level mutable variable bindings in the code generator, test-first.  Written 2026-09-17 by the worker that landed it. -->

# Rung 3: top-level mutable variable bindings in the code generator

Landed. Two Java edits in two files, no library, checker or Scala change; `ant testFast` and `ant testSystem` both at zero failures and zero errors; all eight files of the subset go from the refusal to a clean compile and a clean run. This is the first rung of the climb to move the ladder's pass count, from 59 to 67.

## Why this name, with the ranking re-derived

The baseline ranking in `compile-ladder/summary.txt` is pre-rung-1 and its head is twice spent. Re-derived from the two landed rungs' own after-tables (`rung1/REPORT.md`, `rung2/REPORT.md`), the first-error ranking over `ProjectFortress/tests` is now `ImmutableArray` 26, `LexicographicOrder` 20, `Array1` 7, `Char` 6, `Thread` 6, `Array` 5, `builtinPrimitive` 5, then fours and threes.

Every name above 7 is behind a fork the plan reserves. `ImmutableArray` and `Array` are named together in the one api the 20 files import (`Library/CovariantCollection.fsi:23-25`) and both reach `ReadableArray` then `Indexed` then `Generator` with a real backing store, which is the array-representation fork rung 2 already refused. `LexicographicOrder` (`Library/FortressLibrary.fsi:1196`) extends `StandardTotalOrder` (present at `Library/CompilerAlgebra.fsi:16`) and `ZeroIndexed` (absent), and `ZeroIndexed` reaches the same generic generator tower; the compiler world's generator layer is monomorphic (`GeneratorZZ32`, `SeqGeneratorZZ32`, `Range` at `Library/CompilerLibrary.fsi:89-121`), so declaring it means adopting `Library/GeneratorLibrary.fss` wholesale, which is the library-route fork. `Array1`, `array1`, `array`, `Array2`, `matrix` and `vector` are the array fork again.

The biggest non-first-error block was costed and left: 24 files stop at typecheck on `Could not check call to function assert`, because the compiler world has only `assert(Boolean)` and `assert(Boolean, String)` (`Library/CompilerLibrary.fsi:35-36`) while the calls are `assert(ZZ32, IntLiteral, String)`. The missing overload's body needs value equality on `Any`: the interpreter's form at `Library/CompilerLibrary.fss:90-96` is commented out, and the `SEQV` route at `:261` calls `jSEQV`, which `CompilerBuiltin` declares nowhere. Rung 1 already parked a generic `opr =` / `=/=` over `Any` as its own name, its own test and its own measurement, because it enters every `=` overload resolution in every compiled program. That is a substantive equality decision, not a small edit.

What is left is the largest clean block, and uniquely among the candidates its files are already past disambiguate and past typecheck: eight programs stop in `CodeGen` with `VarDecl ... mutable bindings not yet handled.`

## The defect

`CodeGen.forVarDeclPrePass` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5879-5903`) refused at `:5891` when the single `LValue` was `isMutable()`. The immutable path below it compiles each top-level variable to its own inner class holding one `ACC_PUBLIC+ACC_STATIC+ACC_FINAL` singleton field, written from that class's `<clinit>` (`generateVarDeclInnerClass` at `:5857-5876`), and registers a `VarCodeGen.StaticBinding`, whose `assignValue` throws `Invalid assignment to static binding` (`VarCodeGen.java:279-282`).

The hole is exactly the top-level form. Local mutable variables have worked all along: `forLocalVarDecl` (`CodeGen.java:3910-3930`) builds a `VarCodeGen.LocalMutableVar` for `v.isMutable()`.

Both spellings the blocked programs use reach the same refusal, because the parser marks both `LValue`s mutable: `var v: T = e` (`tests/overloadTest1.fss:18`) and `v: T := e` (`tests/overloadTest7.fss:31`).

## The test

`ProjectFortress/compiler_tests/MutableTopLevelVar.fss` and `MutableTopLevelVar.test`, in the shape of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`).

It declares `var counter: ZZ32 = 0` and `other: ZZ32 := 10` at top level, assigns to both from a function and from `run`, and prints `PASS` only when both reads come back right. A local mutable variable is deliberately not exercised; the code generator already handles those.

On the tree as committed it failed at the link step with `CompilerError` at `MutableTopLevelVar.fss:24:1-22`, `VarDecl (var counter:ZZ32)=_RewriteFnApp ... mutable bindings not yet handled.`, raised from `CodeGen.forVarDeclPrePass(CodeGen.java:5891)` under `CodeGenerationPhase.execute`; the run step then failed with `ClassNotFoundException` because nothing was emitted. `Tests run: 2, Failures: 2, Errors: 0`. It now passes, `OK (2 tests)`.

## The edit

Two files, both Java.

`VarCodeGen.java` gains one class beside `StaticBinding`: `MutableStaticBinding extends NeedsType`, with `pushValue` emitting `GETSTATIC` and `assignValue` emitting `PUTSTATIC` on the same owner, name and descriptor. A new class rather than a flag on `StaticBinding`, so that assignment to an immutable top-level variable keeps throwing.

`CodeGen.java`: the refusal at `:5891` is dropped; the mutability is passed down to `generateVarDeclInnerClass`, which emits the singleton field `ACC_PUBLIC+ACC_STATIC` without `ACC_FINAL` when the variable is mutable; and `MutableStaticBinding` is registered in place of `StaticBinding`. Dropping `ACC_FINAL` is not cosmetic: the JVM permits a `PUTSTATIC` to a final field only from the declaring class's own `<clinit>`, so the write from the assigning method would otherwise be an `IllegalAccessError`.

Nothing on the assignment path needed changing. `forAssignment` (`CodeGen.java:1676-1702`) already resolves the left-hand side with `getLocalVarOrNull` and calls `assignValue`, and the pre-pass has put the binding in scope through `addStaticVar`. Compound assignment needed nothing either: `tests/unicodeTest.fss` is `류: ZZ32 ≔ 3` followed by `류 += 5`, and it compiles and prints `8`.

Initialization order needed no new mechanism. One inner class per top-level variable means the JVM's demand-driven `<clinit>` already gives dependency order, which is what `tests/InitOrderWithMutable.fss` tests: it reads `bvar = cvar` before `var cvar: String = avar` is declared, and it prints `PASS`.

The edit was shadowed before `ant compileAll`, the recipe of `perf-probes/template-check/run-all.sh`: the two classes compiled with `javac` against `ProjectFortress/build` into a scratch directory and put first on the classpath for one `com.sun.fortress.Shell compile` of the new test, which compiled and ran `PASS` there before any tracked build was touched.

## The check

`ant compileAll` (Java changed), then the compiler-world library jars rebuilt in the repo-internals order -- `AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem` -- before anything was run.

`ant testFast`: 48 `Tests run:` lines, every one `Failures: 0, Errors: 0`; the compiler-test suite goes 57 to 59 for this rung's link and run. `ant testSystem`: four shards, 97 + 95 + 95 + 95 = 382, all `Failures: 0, Errors: 0`. Both grepped, not read off `BUILD SUCCESSFUL`, which means nothing here: `build.xml:781-934` sets `haltonfailure="off"` on every `junit` task.

`compiler_tests/Compiled5.p.fss` (`var x: ZZ32 = 3`) is the cheap corroboration named in the brief: it now compiles by hand and runs, printing `OK`. It and `Compiled9.b.fss` stay parked in the typecheck-only list at `compiler_tests/AfterTypeChecking.test:14`; promoting them is a separate move.

## The subset, before and after

The eight files whose first error was this refusal, run before and after with the baseline driver's private cache and private `java.io.tmpdir` (`run-subset.sh`, a copy of `rung1/run-subset.sh` with the run step going through `bin/run`). Raw outputs in `raw-before/` and `raw/`, exit codes in `results-before.tsv` and `results.tsv`.

| file | before | after | compiled output |
|---|---|---|---|
| `tests/InitOrderWithMutable.fss` | codegen refusal | pass | `PASS` |
| `tests/OverloadWithSuperExcludes.fss` | codegen refusal | pass | `PASS` |
| `tests/immutableTopLevel.fss` | codegen refusal | pass | `Sideeffect count =  7 ,  PASS` |
| `tests/overloadTest1.fss` | codegen refusal | pass | `pass` |
| `tests/overloadTest2.fss` | codegen refusal | pass | `pass` |
| `tests/overloadTest7.fss` | codegen refusal | pass | `PASS` |
| `tests/overloadTest8.fss` | codegen refusal | pass | `x= 21` then `PASS` |
| `tests/unicodeTest.fss` | codegen refusal | pass | `8` |

Nothing moved down; every one of the eight went from compile exit 1 to compile exit 0 and run exit 0, with no `fail`/`FAIL` in any output, which is the ladder's own definition of `pass` (`classify.py:123`). The ladder's pass count therefore goes from 59 to 67. That is measured on this subset, not extrapolated: a fresh whole-ladder run is what would confirm it corpus-wide, and it is not part of this rung.

## Differential check against the interpreter

Each of the eight was also run under `walk` and the output diffed against the compiled run (`interp/`). Six are byte-identical. Two differ, and neither difference is this rung's:

`tests/overloadTest8.fss` prints `x= 21` compiled against `x=21` interpreted -- ledger row 76, string juxtaposition inserting a space on the compiled path.

`tests/immutableTopLevel.fss` differs by those spaces and by the position of one line. `object P ff:ZZ32 = do O.p(1); 17 end end` prints its side effect first under `walk` and only at the first read of `P.ff` under `fortress compile`, because a compiled top-level object is a class whose `<clinit>` the JVM runs on demand. The side-effect count is 7 either way, so the program still says `PASS`. This is newly observable -- the file could not be code-generated at all before -- and it is recorded as ledger row 313. The same demand-driven `<clinit>` is what makes a variable's initialization order come out right with no new mechanism, so this is the one place the two orders part.

## What is next to this rung and is not in it

Three further codegen refusals sit beside this one, each its own name, its own test and its own rung: `VarDecl ... tupled lhs not handled` (`tests/TupleBinding.fss`), `Can't compile LetFn` (`tests/funny.fss`, `simplify1.fss`; ledger row 304), `Can't compile ObjectExpr` (`tests/objectTest7.fss`, `scopeSharing.fss`), and the `OptionUnwrapException` trio (`tests/Mutable.fss`, `immutable.fss`, `XXXimmutable1.fss`, `XXXimmutable2.fss`).

One thing this rung did not touch and a later one will have to: a mutable top-level variable imported from another component still resolves through the fallback in `forVarRef` (`CodeGen.java:5909-5926`), which builds a plain `StaticBinding` from the singleton class and so would refuse the assignment. Nothing in the subset or in the corpus asks for it, and no test was written for it here.

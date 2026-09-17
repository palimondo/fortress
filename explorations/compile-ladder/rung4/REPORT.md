<!-- Rung 4 of coordinator/PLAN.md: the comparing forms of assert and deny in the compiler-world prelude, test-first.  Written 2026-09-17 by the worker that landed it. -->

# Rung 4: the comparing forms of `assert` and `deny`

Landed. Two library edits in two files, no Java, no Scala, no `ant compileAll`; `ant testFast` and `ant testSystem` both at zero failures and zero errors; eight of the twenty-four files in the subset go from a typecheck error to a clean compile and a clean run, twelve more clear the name and stop further on, four are unchanged, and nothing moved down. The ladder's pass count goes from 67 to 75.

## Why this name

The baseline's missing-name ranking in `compile-ladder/summary.txt` is pre-rung-1 and its head is three times spent. Re-derived after rungs 1 to 3, the head is `ImmutableArray` 26 and `LexicographicOrder` 20, and both are behind forks the plan reserves: the array representation, which rung 2 refused, and adopting `Library/GeneratorLibrary.fss` wholesale, which rung 3 refused. The largest block that is not behind a fork is the one rung 3 costed and left.

Twenty-four of the 381 files in `ProjectFortress/tests/` stop at typecheck with `Could not check call to function assert`, because the compiler world declares only `assert(Boolean)` and `assert(Boolean, String)` (`Library/CompilerLibrary.fsi:35-36`) while the programs write `assert(x, y)` and `assert(x, y, msg)`. Counted from `explorations/compile-ladder/ladder.tsv` this is the single largest first-error class at typecheck, ahead of `head of empty list` (10) and every remaining codegen refusal (`OptionUnwrapException` 4, `ObjectExpr` and `LetFn` 2 each, tupled lhs 1, `VarArgs` 1, `emitDesc` 2). In twenty-two of the twenty-four files every reported error is this one.

## Why the overload is monomorphic and not generic

Rung 3 parked the name on the reading that the missing overload needs value equality on `Any`. That reading is refuted by measurement.

The compiler world's `opr ===(a:Any, b:Any)` (`Library/CompilerLibrary.fss:63`) is `jSEQUIV`, which is `return a == b` in `ProjectFortress/src/com/sun/fortress/nativeHelpers/equality.java`, that is, Java reference identity. The monomorphic `===` overloads beside it (`:64-65`, `a=b` on `ZZ64` and `ZZ32`) are not reached from a body whose parameters are typed `Any`, so a generic body written over `Any` would compare boxes, not values.

An `Any` parameter also suppresses the `IntLiteral`-to-`ZZ32` coercion that these call sites need. A declaration at `(Any, Any, String)` would be preferred over a correct one at every call site that writes a literal, and would then compare boxes.

So the shape is the monomorphic one, in the types the corpus actually calls, read off `explorations/compile-ladder/raw/tests/`: `(ZZ32, ZZ32)`, `(ZZ32, ZZ32, String)`, `(String, String)`, `(String, String, String)`, `(Character, Character, String)`, and `deny` at the three-argument shapes. A generic `opr =` or `=/=` over `Any` is still the separate name rung 1 parked, and this rung does not touch it.

## The test

`ProjectFortress/library_tests/AssertRung4.fss` and `AssertRung4.test`, in the shape of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`).

It exercises all ten call shapes the rung declares, with the literal on either side of the `ZZ32` comparison. Every `assert` is given equal arguments and every `deny` unequal ones, so a run that prints `PASS` shows the comparison was made and came out right; the values are freshly computed rather than written twice, so an identity comparison on boxed values would not pass.

On the tree as it stood, `../bin/fortress compile library_tests/AssertRung4.fss` reported exactly ten errors, every one `Could not check call to function assert` or `... to function deny`, and `../bin/fortress junit library_tests/AssertRung4.test` gave `Tests run: 2, Failures: 2, Errors: 0`. It now gives `OK (2 tests)`.

## The edit

Eight declarations in `Library/CompilerLibrary.fsi`, beside the Boolean forms, and eight bodies in `Library/CompilerLibrary.fss`, where the commented-out generic forms sat (`:89-95` and `:102-108`).

Each body is the obvious one: `if x =/= y then fail(...)` for `assert`, `if x = y then fail(...)` for `deny`, on the concrete type, so the comparison goes through `CompilerBuiltin`'s own `opr =` and `opr =/=` for `ZZ32`, `String` and `Character` rather than through reference identity.

The message is built with `||` and not with juxtaposition, which inserts a space on the compiled path (ledger row 76), and the two values are rendered with the component's own `debugString`, which is the compiler world's stand-in for the interpreter's `x.asDebugString`.

A failing comparing `assert` prints the values and not the `"<function or long tuple>"` fallback: `probes/AssertMessage.fss` gives `FAIL:  3 =/= 4; n is not 4` (`probes/AssertMessage.out`). The doubled space after `FAIL:` is `fail`'s own juxtaposition at `CompilerLibrary.fss:73`, row 76 again, and is left alone.

All five compiler-world library components build clean with the eight declarations added. There is no overloading complaint against the existing `assert(Boolean, String)`, although `String`, `Boolean` and `ZZ32` declare no mutual `excludes` in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`.

## What is deliberately not in the rung

The vararg form `assert(x, y, failMsg: Any...)` is not declared. A vararg parameter does not typecheck against a call whose arguments need a coercion: probed directly in `probes/VarArgCoerce.fss`, `chk(x: ZZ32, y: ZZ32, failMsg: String...)` called as `chk(n, 3, "a ", "b")` is reported `(ZZ32, ZZ32, (String...))->() is not applicable to an argument of type (ZZ32, IntLiteral, String, String)` (`probes/VarArgCoerce.out`). The four programs that write `assert(3, o.foo(), "msg ", o.foo(), " instead of 3.")` therefore stay blocked and are their own later rung.

## The check

No `ant compileAll`: nothing outside `Library/` changed. The compiler-world library jars were rebuilt in the repo-internals order, `AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`, before anything was run.

`ant testFast`: 47 `Tests run:` lines, 1,385 tests, every line `Failures: 0, Errors: 0`; the library suite goes 59 to 61 for this rung's link and run. `ant testSystem`: four shards, 97 + 95 + 95 + 95 = 382, all `Failures: 0, Errors: 0`. Both grepped, not read off `BUILD SUCCESSFUL`, which means nothing here: `build.xml:781-934` sets `haltonfailure="off"` on every `junit` task.

`testSystem` is untouched by construction: `CompilerLibrary` is compiler-world only, and the interpreter reads `Library/FortressLibrary.fss`.

## The subset, before and after

The twenty-four files whose first error was this name, run before and after with the baseline driver's private cache and private `java.io.tmpdir` (`run-subset.sh`, a copy of `rung3/run-subset.sh`). Raw outputs in `raw-before/` and `raw/`, exit codes in `results-before.tsv` and `results.tsv`.

| file | before | after | where it stops now |
|---|---|---|---|
| `tests/AliasedGetterTest.fss` | typecheck | pass | — |
| `tests/ObjectFieldShadowing.fss` | typecheck | pass | — |
| `tests/emptySubscripting.fss` | typecheck | pass | — |
| `tests/fib.fss` | typecheck | pass | — |
| `tests/infixBars.fss` | typecheck | pass | — |
| `tests/operatorSynonym.fss` | typecheck | pass | — |
| `tests/postfixTest.fss` | typecheck | pass | — |
| `tests/testCharLiteral.fss` | typecheck | pass | — |
| `tests/TupleBinding2.fss` | typecheck | codegen | `VarDecl ... tupled lhs not handled` |
| `tests/Variable.VarWTypes.fss` | typecheck | codegen | `VarDecl ... tupled lhs not handled` |
| `tests/objectCC.fss` | typecheck | codegen | `Can't compile ObjectExpr` |
| `tests/objectCC_immutable.fss` | typecheck | codegen | `Can't compile ObjectExpr` |
| `tests/objectCC_mutable.fss` | typecheck | codegen | `Can't compile ObjectExpr` |
| `tests/objectCC_label.fss` | typecheck | codegen | `Can't compile Label` |
| `tests/ConditionalOpTruncation.fss` | typecheck | link | `ZipException: duplicate entry` writing the jar |
| `tests/ampersand.fss` | typecheck | run | `CompilerFailureDetectedAtRunTime` on `IntLiteral` juxtaposition |
| `tests/ImportNonparamObject.fss` | typecheck | run | its imported `test_library/TestImports1.fss` does not compile |
| `tests/Exception.fss` | typecheck | typecheck | `Function body has type OR((),ZZ32)` |
| `tests/testRecImport.fss` | typecheck | typecheck | `No such method RecA.Odd.anEven` |
| `tests/testTest1.fss` | typecheck | typecheck | `does not define all declarations in Executable` |
| `tests/objectCC_mutVar1.fss` | typecheck | typecheck | the vararg shape, unchanged |
| `tests/objectCC_mutVar2.fss` | typecheck | typecheck | the vararg shape, unchanged |
| `tests/objectCC_multi_objExpr_mutVar1.fss` | typecheck | typecheck | the vararg shape, unchanged |
| `tests/objectCC_multi_objExpr_mutVar2.fss` | typecheck | typecheck | the vararg shape, unchanged |

The eight in the first block went from compile exit 255 to compile exit 0 and run exit 0, with no `fail` or `FAIL` in any output, which is the ladder's own definition of `pass` (`classify.py:123`). The ladder's pass count therefore goes from 67 to 75. That is measured on this subset, not extrapolated; a fresh whole-ladder run is what would confirm it corpus-wide, and it is not part of this rung.

Nothing moved down. The twelve that clear the name now stop later in the pipeline, and the four that do not clear it report the same error text they reported before, now listing the new declarations among the candidates it tried.

## Differential check against the interpreter

Each of the eight passing files was also run under `walk` and the output diffed against the compiled run (`interp/`). Seven are byte-identical.

`tests/testCharLiteral.fss` prints `Now I know my  a b c s` compiled against `Now I know my abcs` interpreted: ledger row 76, string juxtaposition inserting a space on the compiled path, once per juxtaposed character. Not this rung's.

## The new defect this rung uncovered

`tests/ConditionalOpTruncation.fss` now reaches the link step and dies writing the jar: `java.util.zip.ZipException: duplicate entry: ConditionalOpTruncation$\=fn@20\!15.class`, from `ByteCodeWriter.writeJarredFile` (`ByteCodeWriter.java:40`) under `CodeGen.forFnExpr` (`CodeGen.java:3486`) under `CodeGen.forOpExpr`. The program declares three overloads of `opr OP` and writes `5 :OP: 6`; the two `()->ZZ32` thunks the coercion inserts are two distinct `FnExpr` nodes at one source position, and the generated class name is derived from that position, so the second dump collides with the first. Newly observable, because the file could not be code-generated at all before. Ledger row 315.

## What is next to this rung and is not in it

The vararg form, above: four files, a checker question about coercion under varargs rather than a library one.

A generic `opr =` and `=/=` over `Any` in the compiler world, which rung 1 parked and which would let the comparing `assert` be written once.

The three codegen refusals the subset now sits on (tupled lhs, `ObjectExpr`, `Label`) and the duplicate-jar-entry defect, each its own name and its own rung.

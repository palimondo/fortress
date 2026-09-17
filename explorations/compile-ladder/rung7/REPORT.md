<!-- Rung 7 of coordinator/PLAN.md: four arithmetic operators of the compiler-world IntLiteral, test-first.  Written 2026-09-17 by the worker that landed it. -->

# Rung 7: the arithmetic operators of `IntLiteral`

Landed. Four bodies in the library, one new native helper, one clause in `NamingCzar`, nothing in the api; `ant compileAll` was needed because Java changed, and the five compiler-world library jars were rebuilt after it. `ant testFast` and `ant testSystem` are both at zero failures and zero errors; the three files rung 6 left behind go from a run-time throw to a clean run whose output is byte-identical to the interpreter's, which moves the ladder's pass count from 78 to 81.

This is the first rung to touch Java, and it is the first to reach into the generated world rather than only writing Fortress.

## Why this name

The missing-name ranking re-derived after rungs 1 to 6 heads `ImmutableArray` 26, `LexicographicOrder` 20, `head of empty list` 11, `Array1` 7, `Char` 6, `Thread` 6, `Array` 5, `builtinPrimitive` 5, `Missing parameter type` 5, `Can't compile ObjectExpr` 5, `BIG +` 4, `big` 3, and rungs 5 and 6 checked each of them one by one.

Everything above is behind the array-representation fork, behind adopting `Library/GeneratorLibrary.fss` wholesale, behind type aliases (ledger row 18), behind a `Spawn` visitor and a thread runtime, behind real parameter-type inference, or behind an `ObjectExpr` visitor `CodeGen.java` does not have. None of those candidates' files could reach a run even if the name were supplied.

The `IntLiteral` arithmetic cluster appears in no missing-name ranking, because no name is missing. Its three files are already past disambiguation, past the checker, past codegen and past the link, and it is on the microGPT path.

## The defect

A binding written without a declared type from an integer literal keeps the static type `IntLiteral` on the compile path. The compiler world declares the whole operator family on `trait IntLiteral` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:378-410`), so an applicable `IntLiteral` overload is always found, coercion to `ZZ32` or `ZZ64` never runs, and the program reaches the body. Rung 6 gave the six comparisons plus `MIN` and `MAX` real bodies; the arithmetic family at `.fss:816-848` was still `throw CompilerFailureDetectedAtRunTime`. That is ledger row 318.

Rung 6 could not take it. Each of these operators returns a **new** `IntLiteral`, and the compiler world has getters out of `IntLiteral` and no way into it. `MIN` and `MAX` were writable exactly because each returns one of its two operands.

## The way in, measured before any tracked file was touched

The route is the foreign-Java one `ZZ32Vector` already uses. `NamingCzar.fortressTypeForForeignJavaType(Type, String, boolean)` (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:328-350`) accepts any class extending `fortress.AnyType.Any` and translates the Java descriptor back to a Fortress type through a chain of else-ifs whose fallthrough is a thrown `Error`. One clause per type is the whole cost.

The mechanism was shadowed first, the recipe of `perf-probes/template-check/run-all.sh`, with the patched `NamingCzar` and the new helper compiled into `probes/shadow-classes/` and put first on the classpath. `probes/p38.fss` imports the four helpers and prints `7, -1, 12, -3, 4, 7` for `3+4`, `3-4`, `3 times 4`, `-3`, `(3+4)-3` and the sum again through `println`, which goes by `IntLiteral`'s `asString`. Every command is in `probes/run-probe.sh`; the outputs are `probes/01-compile.out` and `probes/02-run.out`.

Two findings the shadow produced, both of which the landing depended on.

The helper must be declared over the **generated interface** `fortress.CompilerBuiltin.IntLiteral` and not over the implementation class `FIntLiteral`. Declared over `FIntLiteral` it compiles clean and then dies at run time with `NoSuchMethodError: 'fortress.CompilerBuiltin$IntLiteral native.com.sun.fortress.nativeHelpers.simpleIntLiteralArith.add(fortress.CompilerBuiltin$IntLiteral, fortress.CompilerBuiltin$IntLiteral)'`: the generated wrapper in `nativewrapper_cache` mirrors the Java signature, while the emitted call site uses the interface descriptor, because `IntLiteral` is not in `NamingCzar`'s `specialFortressDescriptors` table (`:508-532`, where `ZZ32`, `Character`, `ZZ` and `ZZ32Vector` are). Adding `IntLiteral` to that table is the other route and is much wider: it would change the descriptor of every `IntLiteral`-typed slot in the generated world and would have to be mirrored in `runtimeSystem/Naming.java`. Declaring the helper over the interface avoids all of it.

A `fortress compile` whose source file has not changed writes nothing and exits 0, so the probe script touches `p38.fss` first; and a change to the helper's signature leaves a stale class in `default_repository/caches/nativewrapper_cache`, which must be deleted or the old signature is what the run links against.

## The edit, four files

`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntLiteralArith.java`, new: static `add`, `sub`, `mul` and `neg` over `fortress.CompilerBuiltin.IntLiteral`, computing in `BigInteger` through the value's own `toString` and returning `FIntLiteral.make(long)` when the result's `bitLength` is under 64 and `FIntLiteral.make(String)` otherwise.

`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:341-343`: one else-if beside the `FZZ` one, mapping `Lfortress/CompilerBuiltin$IntLiteral;` to the Fortress type `IntLiteral`. Without it the import of the helper dies in the `Error` two lines below.

`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`: one `import java` block for the four helpers beside the existing ones, and four bodies replacing four throws in `trait IntLiteral`.

    opr -(self): IntLiteral = jIntLiteralNeg(self)
    opr +(self, other:IntLiteral): IntLiteral = jIntLiteralAdd(self, other)
    opr -(self, other:IntLiteral): IntLiteral = jIntLiteralSub(self, other)
    opr juxtaposition(self, other:IntLiteral): IntLiteral = jIntLiteralMul(self, other)

Nothing in `CompilerBuiltin.fsi`. All four declarations were already in the api, so no call site changes type and nothing can move down in the checker; this is the same property rung 6 relied on.

`juxtaposition` is multiplication, which is not an inference: the published api puts it at `library/apis/CompilerBuiltin.tex:390` among the multiplication synonyms `\cdot`, `\boxdot` and `\times`, and the compiler world's own `ZZ32` and `ZZ64` juxtapositions are `jIntOverflowingMul` and `jLongOverflowingMul` (`CompilerBuiltin.fss:652` and `:590`).

`BigInteger` and not `long`, so that a literal too wide for `ZZ64` still computes, and so that the result of a wide multiplication is not silently truncated. The spelling follows `simpleArbitraryPrecisionArith.java`, which is the compiler world's own arbitrary-precision helper.

## Scope: four operators and no more

The three blocked files reach `juxtaposition`, unary `-` and binary `-`. `+` is written with them because it is the same helper and the same one-line body, and a rung that gives binary `-` a body while leaving its additive partner throwing is a worse state than either end.

Everything else in the family stays stubbed and is named here as not in the rung: `DOT`, `BOXDOT`, `CROSS`, `BOXCROSS`, `DOTCROSS` (multiplication synonyms, one line each once the helper exists, but no test would cover them), `BOXPLUS`, `DOTPLUS`, `BOXMINUS`, `DOTMINUS`, `DIV`, `|self|`, `BITAND`, `BITOR`, `BITXOR`, `BITNOT`, `MINMAX`, `CHOOSE`, `even`, `odd`.

## The test

`ProjectFortress/library_tests/IntLiteralArithRung7.fss` and `.test`, in the shape of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`).

Both operands come from `pick(b: Boolean): IntLiteral` at run time rather than being written twice as literals, and every expected value is computed on the `ZZ32` side by `pickZZ32` and `ZZ32`'s own arithmetic, which has had real bodies all along. A body returning a constant, or returning one of its operands, would not pass. One chained assertion, `((four + nine) - four)`, pins that what a body returns is a usable `IntLiteral` and not merely something that prints.

Before the edit, `../bin/fortress junit library_tests/IntLiteralArithRung7.test` links OK and then dies at `fortress.CompilerBuiltin$IntLiteral$DefaultTraitMethods.+` (`CompilerBuiltin.fss:820`) from `IntLiteralArithRung7.fss:58`, "Failed to satisfy default check run_out_contains=PASS", `Tests run: 2, Failures: 1, Errors: 0` (`probes/junit-before.out`). After it, `OK (2 tests)` (`probes/junit-after.out`).

## The gate

`ant compileAll`, because Java changed: `BUILD SUCCESSFUL`. Then the five compiler-world library jars rebuilt in the repo-internals order -- `AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem` -- because `compileAll` clears `bytecode_cache`, and the stale `nativewrapper_cache` entry for the helper removed before the first run.

`ant testFast`: 47 `Tests run:` lines, 1,391 tests, every line `Failures: 0, Errors: 0`; the two added are this rung's link and run. `ant testSystem`: four shards, 97 + 95 + 95 + 95 = 382, all `Failures: 0, Errors: 0`. Both grepped rather than read off `BUILD SUCCESSFUL`, which means nothing here: `build.xml:781-934` sets `haltonfailure="off"` on every `junit` task.

`testSystem` is untouched by construction: `CompilerBuiltin` is compiler-world only, and the interpreter reads `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, which is not edited. The `NamingCzar` clause adds a branch that is reached only by a descriptor no existing helper produces.

The edit adds no name to the library, so unlike rungs 1 and 5 it cannot collide with a private declaration in a test.

## The subset, before and after

The three files that stop in `IntLiteral$DefaultTraitMethods` at `CompilerBuiltin.fss:838`, run before and after with the ladder driver's private cache and private `java.io.tmpdir` (`run-subset.sh`, a copy of `rung6/run-subset.sh`). Raw outputs in `raw-before/` and `raw/`, exit codes in `results-before.tsv` and `results.tsv`.

| file | operator it stopped on | before | after | compiled output |
|---|---|---|---|---|
| `tests/precedence.fss` | `juxtaposition` (:838) | run | **pass** | `-15` |
| `tests/forFnDecl.fss` | `juxtaposition` (:838) | run | **pass** | `7` |
| `tests/ampersand.fss` | `juxtaposition` (:838) | run | **pass** | `OK &` |

All three pass by the ladder's own criterion (`classify.py:123`: exit 0 and no `fail`/`FAIL` in the output), so the ladder's pass count goes 78 to 81. All three were also run under `walk` and the compiled output is byte-identical (`probes/precedence.walk` and `.compiled`, and the same pair for the other two).

The four files rung 6 cleared were re-run on the same private cache and are unchanged: `testParen` prints `false`, `chain2` prints `PASS` twice, `tupleTest1` is silent at exit 0, and the negative test `XXXcaseTest` still reaches its own intended `CompilerLibrary$MatchFailure`. Nothing moved down.

## What this rung opened, recorded and not repaired

Ledger row 317, the code generator wrapping an integer literal of `bitLength` exactly 32 or exactly 64 negative, now reaches arithmetic as well as comparison. `probes/p39.fss` is `a = 4294967295`, `b = 1`, `println (a + b)`: walk answers `4294967296`, the compiled program answers `0`, because the body this rung wrote adds to a value that is already `-1` when it runs (`probes/p39.walk`, `probes/p39.compiled`).

No library edit repairs it, and the helper cannot: the wrap has happened before the helper is called, and `FIntLiteral.toString` faithfully reports the wrapped value. The fix is in `CodeGen.forIntLiteralExpr`, whose decimal-string branch does not wrap and whose two narrow branches need to test the signed range rather than `bitLength`. That is a codegen rung of its own, with its own test. Row 317 gets one sentence; it is not a new row.

## The rows

Ledger row 318 is new and is this rung's: the stubbed compiler-world arithmetic family, in the shape of row 316. Row 80 is already closed and covers only the comparisons.

Ledger row 19 is the interpreter's side of the same arithmetic and is **not** closed here. There the family is dormant, commented out under the note "Do not enable these until coercion is implemented" (`FortressBuiltin.fss:483-525`, `map/dormant-code.md` section 1.1), precisely so that coercion runs. The compiler world is the opposite situation: the declarations exist and suppress coercion, so bodies are the only way out. Closing one says nothing about the other.

Ledger row 79, the `typecase` reading of the same `IntLiteral` typing, keeps its state. The typing is unchanged; only the bodies reached through it are.

<!-- Rung 5 of coordinator/PLAN.md: the operator `//` on `String` in the compiler-world prelude, test-first.  Written 2026-09-17 by the worker that landed it. -->

# Rung 5: the operator `//` on `String`

Landed. Two library edits in two files, one declaration each, no Java, no Scala, no `ant compileAll`; `ant testFast` and `ant testSystem` both at zero failures and zero errors; all four blocked files clear the name and none of them reaches a run, so the ladder's pass count stays at 75.

The honest result is the movement and not a number: the rung was expected to put two of the four files at a clean compile and a clean run, and it puts none there. Every one of the four turns out to carry a second blocker behind the name, and the second blockers are three different ones.

## Why this name

The baseline's missing-name ranking in `compile-ladder/summary.txt` is pre-rung-1 and its top four entries are spent. Re-derived over `ProjectFortress/tests/` with the names rungs 1, 2 and 4 supplied removed from every file's error set and the 28 files rungs 3 and 4 already moved excluded, the head is `ImmutableArray` 26, `LexicographicOrder` 20, `head of empty list` 10, `Array1` 7, `Char` 6, `Thread` 6, `Array` 5, `builtinPrimitive` 5, `Missing parameter type for x` 5, `Can't compile ObjectExpr` 5, then `//` 4.

Everything above `//` is behind a fork the plan reserves or behind a substantial feature, and each was checked rather than assumed.

`ImmutableArray`, `Array`, `Array1`, `Array2`, `array1`, `array` and `matrix` are the array-representation fork rungs 2 and 3 refused.

`LexicographicOrder` (`Library/FortressLibrary.fsi:1196`) extends `ZeroIndexed[\E\]`, hence the generic generator tower, hence adopting `Library/GeneratorLibrary.fss` wholesale, which is the library-route fork rung 3 refused; clearing it would walk the 20 blocked files from `Library/List.fsi:67` to `:71` and then to `Generator`.

`head of empty list` is 10 files crashing at one site, `impls/Misc.scala:876`, where `val first = dims.head` is taken from an empty list after every element of an `ArrayElements` literal failed to check; a diagnostics defect, and all ten are array-literal programs that would still stop for want of the array type.

`Thread` is 6 files (`Spawn1`-`Spawn6`) whose only error is `Thread is undefined.`, but `CodeGen.java` has no `Spawn` visitor, so the rung is a runtime and codegen feature.

`builtinPrimitive` is ledger row 309, the interpreter's native convention with no compiled-path counterpart, and three of its five files are `XXX` negative tests.

`Missing parameter type for x` is 5 files raised at `staticenv/STypeEnv.scala:191` for a `Param` with no declared type; the rung is real parameter-type inference.

`Can't compile ObjectExpr` is 5 files, and `CodeGen.java` has no `ObjectExpr` visitor and there is no object-expression lifting desugarer under `compiler/desugarer/`.

`BIG +` is 4 files and would be the same size of edit, `opr SUM(): ReductionZZ32 = ZZ32Addition` beside the live `opr BIG MAX` at `Library/CompilerLibrary.fss:477-478`, with `ZZ32Addition` at `:463` already declared and used by nothing; it was passed over for this rung only because none of its four files can pass (three apply `SUM` to a vararg parameter, which rung 4 measured as a separate checker question and which codegen also refuses, and the fourth carries 15 errors). It is the strongest candidate for rung 6 and it is on the microGPT path.

## The test

`ProjectFortress/library_tests/LineConcatRung5.fss` and `LineConcatRung5.test`, in the shape of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`).

It pins the separator four ways, so that a body concatenating with the wrong character would not pass: the joined string is exactly one character longer than its two halves, each half comes back out of a `substring`, the whole equals its halves joined by the character with code point 10, and both the space and the empty separator are denied.

The newline is built with `makeCharacter(10).asString` (`CompilerBuiltin.fsi:481`) rather than written as a string escape, so the test pins the operator and not the lexer.

The right operand is exercised at `Object` as well as at `String`, because the four blocked programs put a `ZZ32` there. The left operand is written with `||` and not with juxtaposition, although the blocked programs write `"z = " z.n // "w = " w.n`: juxtaposition inserts a space on the compiled path (ledger row 76) and that difference is not this rung's.

Only the infix form is exercised. The interpreter also carries the prefix and postfix forms (`opr //(self)` at `Library/FortressLibrary.fss:4057`, the top-level `opr (x:Any)//` at `:4206`) and the doubled `///`; no blocked program reaches them, so they are not in the rung.

On the tree as it stood, `../bin/fortress junit library_tests/LineConcatRung5.test` gave `Tests run: 2, Failures: 2, Errors: 0`, the link step reporting `Operator // is not defined.` at both of the file's `//` sites (`probes/junit-before.out`; the file's comment header was one line shorter then, so the coordinates in that artifact are `:50:26` and `:65:37` against `:51` and `:66` in the committed file). It now gives `OK (2 tests)`.

## The edit

One declaration in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`, in `trait String` beside `abstract opr ||| (self, b:Object): String`:

    opr //(self, b:Object): String

and one body in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`, in `trait String` beside the existing default `opr juxtaposition(self, b:Object): String = self ||| b`:

    opr //(self, b:Object): String = self || makeCharacter(10).asString || b

`CompilerBuiltin` is the right home rather than `CompilerLibrary`: `String` lives there (`.fsi:25-49`, `.fss:367-395`), and the interpreter likewise declares `//` as a functional method of `String` (`Library/FortressLibrary.fsi:2358-2362`, bodies at `.fss:4057-4060`). The spec agrees, `library/apis/FortressLibrary.tex:3302-3310`.

One declaration, not the interpreter's four. The interpreter separates `(self, a:String)` from `(self, a:Any)`; the compiler world's `String` already collapses that pair for `||`, `|||` and `juxtaposition` into a single `(self, b:Object)`, and `String` is an `Object`, so the single declaration covers both call shapes. No overloading complaint appeared, and all five compiler-world library components build clean.

The api declaration is written without `abstract`, which is the spelling `CompilerBuiltin.fsi` uses for every other `String` method that has a default body in the component (`opr <`, `opr =`, `opr CMP` and the rest); `abstract opr juxtaposition` is the one exception in the file and is not the model followed.

The body uses `||` and not `|||`. `|||` is the "smart" concatenation that inserts a space, which is ledger row 76; `//` must insert exactly the newline, which is what the test's length assertion catches.

`makeCharacter(10).asString` rather than a `"\n"` literal, so the rung is independent of how a string escape survives into a constant pool. The interpreter's own `newline` is `lineSeparator` (`Library/String.fss:557`), a system property, which the compiler world has no counterpart for and which this rung deliberately does not import.

## The check

No `ant compileAll`: nothing outside `LibraryBuiltin/` changed, and `fortress compile` reads the `.fss` directly. The compiler-world library jars were rebuilt in the repo-internals order, `AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`, before anything was run.

`ant testFast`: 47 `Tests run:` lines, 1,387 tests, every line `Failures: 0, Errors: 0`; `LibraryJUTest` goes 61 to 63 for this rung's link and run. `ant testSystem`: four shards, 97 + 95 + 95 + 95 = 382, all `Failures: 0, Errors: 0`. Both grepped, not read off `BUILD SUCCESSFUL`, which means nothing here: `build.xml:781-934` sets `haltonfailure="off"` on every `junit` task.

`testSystem` is untouched by construction: `CompilerBuiltin` is compiler-world only, and the interpreter reads `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, which is not edited.

Nothing under `compiler_tests/`, `other_compiler_tests/`, `library_tests/` or `not_working_library_tests/` declares `//`, and no compiler-world library file declares it, so the new prelude name collides with nothing in the gated corpora. That was the failure mode rung 1 hit with `library_tests/MaybeTest9.fss`; it does not recur.

## The subset, before and after

The four files whose first error was this name, run before and after with the baseline driver's private cache and private `java.io.tmpdir` (`run-subset.sh`, a copy of `rung4/run-subset.sh`). Raw outputs in `raw-before/` and `raw/`, exit codes in `results-before.tsv` and `results.tsv`, phases by the ladder's own `classify.py`.

| file | before | after | where it stops now |
|---|---|---|---|
| `tests/wrapZZ.fss` | disambiguate | typecheck | `Cannot infer type for functional method WrapZZ.+ … reference cycle` (2), then `Could not check call to operator /` |
| `tests/overloadGenericNon.fss` | disambiguate | typecheck | `Cannot infer type for function +(s:WrapZZ, o:WrapZZ) … reference cycle` (2) |
| `tests/OverloadBuiltinParam.fss` | disambiguate | typecheck | `java.lang.Error: Not yet implemented`, `STypesUtil.makeInferenceArg` (ledger row 307) |
| `tests/compoundArray.fss` | disambiguate | typecheck | `NoSuchElementException: head of empty list`, `impls/Misc.scala:876` |

All four clear the name: `Operator // is not defined.` appears in none of the four after-outputs. Nothing moved down; none of the four passed before and none passes now, so the ladder's pass count stays at 75. No file reaches a run, so there is no differential check against `walk` for this rung.

The two crashes are exit code 1 against 255 before, which is an uncaught exception where a reported error stood. That is the phase advancing, not a regression: before the edit the compilation stopped in disambiguation and the type checker never ran on these files at all.

## What the four second blockers are

Two of them are one defect. `wrapZZ.fss` and `overloadGenericNon.fss` both declare an operator with no declared return type over the object it constructs — `opr +(self, o:WrapZZ) = WrapZZ(n + o.n)` — and the compile path's return-type inference reports a self-reference as a cycle, `Cannot infer type for functional method WrapZZ.+(self:WrapZZ, o:WrapZZ) because it has reference cycle: WrapZZ.+(self:WrapZZ, o:WrapZZ), WrapZZ.+(self:WrapZZ, o:WrapZZ)`, the same declaration named twice. The interpreter runs both programs. Newly observable: neither file could be type-checked at all before this rung. It is the wider of the two names left here and is a candidate rung of its own.

`wrapZZ.fss` carries a third error past that, `Could not check call to operator /` with `(RR64, RR64)->RR64 is not applicable to an argument of type (IntLiteral, IntLiteral)`, from its `1 / 0` deliberate failure path: the compiler world declares `/` only on `RR64`. A small library name, and its own rung.

`OverloadBuiltinParam.fss` declares `opr +[\T extends Number, nat n, nat m\]` and crashes in `STypesUtil.makeInferenceArg` (`STypesUtil.scala:557`) with `java.lang.Error: Not yet implemented`. That is exactly ledger row 307, the checker's total absence of `nat`-kinded static parameters, which until now had been measured only from the prelude probe's own six-line program; this rung is the first time the interpreter test corpus reaches it. It is step 4 of the plan (`reviews/nat-checking-plan.md`) and not a library rung.

`compoundArray.fss` writes `a : RR64[2,2] = [ … ]` and crashes at `impls/Misc.scala:876`, `val first = dims.head` on an empty list after every element of the `ArrayElements` literal failed to check. It is the `head of empty list` class, 10 files in the re-derived ranking, and behind it is the array-representation fork. Predicted before the run and confirmed.

## What is deliberately not in the rung

The prefix `opr //(self)`, the top-level postfix `opr (x:Any)//` and the doubled `///`, which the interpreter and the spec both carry: no failing program in the gated corpora or in `ProjectFortress/tests/` reaches them, so no test would cover them.

A `newline` binding in the compiler world. The interpreter's is `lineSeparator`, a system property; giving the compiler world one is a separate question about `CompilerSystem`, and the rung does not need it.

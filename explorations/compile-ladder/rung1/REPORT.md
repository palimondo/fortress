<!-- Rung 1 of coordinator/PLAN.md: the ladder's top first-error name, `Equality`, test-first.  First written 2026-09-17 by the worker that measured the refused route; rewritten the same day by the worker that landed the rung under the widened boundary. -->

# Rung 1: `Equality`, the top first-error name

Landed. Four edits in four files, one of them the checker; `ant testFast` and `ant testSystem` both green; the 23-file subset reproduces the measured route with nothing moving down.

## The test

`ProjectFortress/library_tests/EqualityRung1.fss` and `EqualityRung1.test`, in the shape of `library_tests/Boolean.test` (`tests=`, `link`, `run`, `run_out_WIcontains=PASS`); the `.test` was parked in `not_working_library_tests/` by the refused run and is moved back with `git mv`, which is what puts it inside `LibraryJUTest`.

Two objects extend `Equality` and answer their own `opr =` with a constant, one `true` and one `false`, so a run that prints `PASS` shows the declared operator was called and not identity: `Other` is not equal to itself. This is the shape of the blocked interpreter tests `tests/GS3.fss` and `tests/EqualityOverloadBug.fss`.

It failed on the tree as committed with the ladder's own first error for the 23 files of the subset, `EqualityRung1.fss:30:21-27: Equality is undefined.` and `:34:22-28` the same, then `File EqualityRung1.fss has 2 errors.` and a `ClassNotFoundException` on the run step because nothing was emitted (`test-before.out`).

No compiler test is added. The checker half of the rung is guarded by a test that already existed and passed, `compiler_tests/Compiled9.ai` inside `Compiled9.test`: it is the one test the library half breaks, and keeping it green is the checker edit's acceptance condition.

## The four edits

`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:124`, the commented `compilerAlgebra()` uncommented, so `_defaultLibrary` is `{CompilerLibrary, CompilerBuiltin, CompilerAlgebra, AnyType}`; that makes the api a root of every compilation through `GraphRepository.roots()` and puts it in `TypeNameEnv.implicitlyImportedApis()`.

`ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TopLevelEnv.java:967-976`, one branch added to the filter that decides which unimported api a compilation unit can still see, keeping `CompilerAlgebra` when `WellKnownNames.areCompilerLibraries()`; the implicit set is written down twice and only this copy decides what a program sees, so the first edit alone changes nothing.

`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala`, the `FunctionalRef` case narrowed to walk only the static arguments written at the reference site, dropping the walk of `interpOverloadings`, `newOverloadings` and `overloadingType`.

`ProjectFortress/library_tests/MaybeTest9.fss:15-17`, the component's own `trait Equality[\T\] comprises T` deleted; it was a workaround for the prelude not carrying the trait, and with `CompilerAlgebra` implicit the two collide instead of shadowing. Its body was `self SEQV other` and `CompilerAlgebra`'s is `self === other`, the same operator, so the file asserts exactly what it asserted before.

## The checker defect, diagnosed against the hypothesis on record

The hypothesis this rung was handed is refuted. The site is not `TypeAnalyzer.comprisedTypes` and not the subtype rule for a trait type against a union type; a guard there would not have been reached.

The trace, taken in the shadow loop with `staticParam` printing its stack before the `bug(...)` at `TypeAnalyzer.scala:764-766` (`shadow/` is not kept; the two Java edits and an instrumented `TypeAnalyzer` were compiled against `ProjectFortress/build` and put first on the classpath), runs `TypeWellFormedChecker.walk` on a `FunctionalRef` for `=`, then `walk` of its `newOverloadings`, then the `Overloading`'s arrow type, then the arrow's domain tuple, then a `TraitType` element of it, then `wfStaticArgs` at `:106`, then `TypeAnalyzer.subtype`, then `pSubInner:183`, then `staticParam`.

The instrumented checker printed what that reference carries: `= newOverloadings=14`, one per declaration of `=` in the environment, and among them `_|Library|CompilerAlgebra.fsi:25:3-26:1 :: (((CompilerAlgebra.Equality[\T\] & {T}), T)->Boolean)`. The overloading lists are the declared types of every functional of that name, not types written at the reference; a generic declaration contributes its own static parameters free.

The trait type checked is `CompilerAlgebra.Equality[\T\]` with static argument `T` and bound `CompilerAlgebra.Equality[\T\]`, the bound that `PreDisambiguationDesugarPhase` adds to a naked static parameter that also appears naked in the comprises clause, in an empty kind environment. `Equality[\T\] comprises T` is the only declaration under `Library/` and `LibraryBuiltin/` whose comprises clause is a bare type variable, which is why nothing in the compiler world had hit this before.

Dropping the walk of the two overloading lists is not enough: `overloadingType` is the intersection of the same arrows and reaches the same place. Dropping all three settles it, and `../bin/fortress typecheck compiler_tests/Compiled9.ai.fss` then exits 0.

Removing the bound from `Equality` in the library would not have settled it either: the arrow's second domain element is a bare `T`, and the checker's own `VarType` case reports an unbound type for a variable not in the kind environment, so the same walk would have produced a spurious error instead of a crash. The defect is that synthesized overloading types are walked in the kind environment of the reference site at all; each of them is checked where it is declared.

The edit removes checking and cannot add an error, which is why its acceptance condition is the gate rather than a new test.

The neighbouring `MethodInvocation` case still walks its own `overloadingType` and can reach the same place; no test in either corpus does, so it is left alone and named here rather than changed on speculation.

## The gate

`../bin/fortress junit library_tests/EqualityRung1.test`: `link ... OK`, `run ... PASS`, `OK (2 tests)`.

`../bin/fortress junit compiler_tests/Compiled9.test`: `OK (6 tests)`.

`ant testFast`: 47 suites, every one `Failures: 0, Errors: 0`; `LibraryJUTest` 57 tests, `CompilerJUTest` 642, the compiler file tests 263.

`ant testSystem`: four shards, 97 + 95 + 95 + 95 tests, every one `Failures: 0, Errors: 0`.

## The subset, re-run

`run-subset.sh` over `subset.txt`, the 23 files whose first error was `Equality`, with the private cache and private `java.io.tmpdir` of the baseline driver; `results.tsv` is byte-identical to the one the refused run committed and every file's first two lines of compiler output are unchanged, so the landed tree reproduces the route that was measured.

| file | before | after |
|---|---|---|
| `EqualityOverloadBug.fss` | disambiguate, `Equality is undefined.` | typecheck, `Function body has type String, but declared return type is Bar.` |
| `FileConversion.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `GS3.fss` | disambiguate, `Equality is undefined.` | typecheck, `Could not check call to operator =` |
| `GeneratorNullPointer.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `IntMapTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `Maybe is undefined.` |
| `MapTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `NumeralTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `QuickCheckTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `ReflectTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `ReflectiveQuickCheckTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `SetMapImport.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `SetTest.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `StringTests.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `TestCompiledImports.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `TypeImportBug.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `WordCountSmall.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `atomicsets.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `caseWithSemicolons.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `explicitStaticArgsToAggregates.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `mapCombine.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `parametricListCompr.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `parametricManiaCompr.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |
| `setSum.fss` | disambiguate, `Equality is undefined.` | disambiguate, `ImmutableArray is undefined.` |

## What moved, honestly

No baseline file goes from fail to pass, so the ladder's pass count stays at 59. The corpus gains one passing test, `library_tests/EqualityRung1`, which is what the rung is measured by.

All 23 subset files clear the name `Equality` and none moves down. Two advance a phase, `tests/EqualityOverloadBug.fss` and `tests/GS3.fss`, both from disambiguate to typecheck, and both then stop on their own contents rather than on a library name. The other 21 stop on the next name inside disambiguate, `ImmutableArray` in 20 of them and `Maybe` in one.

So `ImmutableArray` is not a separate queue from `Equality`; it is the same file set one name further on, and the ranking's head after this rung should be re-derived from a fresh ladder run rather than read off the baseline's table.

## The fallback, refuted, kept for the record

Declaring `Equality` in `Library/CompilerLibrary.fss` and `.fsi` instead does not build: `CompilerAlgebra` already declares it and `Library/CompilerLibrary.fsi:15`, `.fss:18` and `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:14` import it, so every use becomes ambiguous and each of the five compiler-world library components takes fourteen errors. Two gated tests, `other_compiler_tests/MaybeTest15a.fss` and `MaybeTest16.fss`, would meet the same ambiguity.

## Out of scope, recorded for a later rung

`=/=` on a user type. The compiler world declares `=/=` per builtin type only (`CompilerBuiltin.fsi`: `String`, `ZZ`, `ZZ64`, `ZZ32`, `NN32`, `NN64`, `IntLiteral`, `Character`) and has no `opr =(Any,Any)` or `opr =/=(Any,Any)`, so a user type meets `Could not check call to operator NE`. The interpreter has the generic pair at `Library/FortressLibrary.fss:95-97`; supplying `=/=` in the compiler world needs the generic `=` beside it, which enters every `=` overload resolution in every compiled program. That is its own name, its own test and its own measurement; `EqualityRung1.fss` states it in a comment and does not exercise it.

## Files

`ProjectFortress/library_tests/EqualityRung1.fss` and `EqualityRung1.test` (the `.test` moved back from `not_working_library_tests/`), the four edits, this directory (`REPORT.md`, `run-subset.sh`, `subset.txt`, `results.tsv`, `raw/`, `test-before.out`, `test-after.out`), one line in `explorations/coordinator/FACTS.md`, one sentence in `explorations/microgpt-run-c-handover.md`, and ledger row 311.

No existing ledger row is closed: the compiler prelude's missing `Equality` has no row of its own, and row 71 is about `Maybe`, `HasRank` and `LexicographicOrder` in `List.fsi`, which this does not touch.

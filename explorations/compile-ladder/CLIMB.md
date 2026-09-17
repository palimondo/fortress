<!-- The record of the eight rungs climbed under coordinator/PLAN.md, with the ladder re-run end to end on the tree they produced.  Written 2026-09-17 by the worker that ran it. -->

# The climb: eight rungs, and the ladder re-run

The baseline of `REPORT.md` was measured on the sealed tree at `75cca6683`. Eight rungs landed on top of it. This file records what they were, and what the same ladder says when it is run again, unchanged, on the tree at their head.

Nothing moved down. Of the 410 files, 39 reach a later phase than they did in the baseline, 371 reach the same phase, and none reaches an earlier one.

The re-run is in `after/`: `after/run-ladder.sh`, `after/classify.py` and `after/report.py` are copies of the three scripts beside this file with their output directory pointed at `after/`, and `after/REPORT.md`, `after/ladder.tsv`, `after/summary.txt`, `after/results.tsv` and `after/raw/` are what they wrote.

## The rungs landed

| rung | name | commit | what landed |
|---|---|---|---|
| 1 | rung1-equality | `1bd8d3ad1` | `Equality` into the compiler prelude: the duplicated prelude list at `WellKnownNames.java:124` and the implicit-api branch at `disambiguator/TopLevelEnv.java:967-976`, the private `trait Equality` deleted from `library_tests/MaybeTest9.fss`, and the checker's `FunctionalRef` case in `TypeWellFormedChecker.scala` narrowed to the static arguments written at the reference site |
| 2 | rung2-hasrank | `cee79d3f1` | `trait HasRank extends Equality[\HasRank\] excludes { Number }` declared in `Library/CompilerLibrary.fsi` and `.fss` |
| 3 | rung3-mutable-toplevel-var | `4d419c9e8` | top-level mutable variables in the code generator: the singleton field emitted without `ACC_FINAL`, and a new `VarCodeGen.MutableStaticBinding` on `GETSTATIC`/`PUTSTATIC` |
| 4 | rung4-assert-comparison | `b52a32ac2` | eight monomorphic comparing forms of `assert` and `deny` in `Library/CompilerLibrary.fsi` and `.fss` |
| 5 | rung5-line-concat | `9373985b4` | `opr //(self, b:Object): String` in `trait String` of `LibraryBuiltin/CompilerBuiltin` |
| 6 | rung6-intliteral-comparisons | `54861b62a` | eight bodies replacing throwing stubs in `trait IntLiteral` of `CompilerBuiltin.fss`, the six comparisons over `asZZ64` and `MIN`/`MAX` over this trait's own `<=` |
| 7 | rung7-intliteral-arithmetic | `2027f519b` | `nativeHelpers/simpleIntLiteralArith.java`, one clause in `NamingCzar.java`, and four arithmetic bodies in `trait IntLiteral` |
| 8 | rung8-big-sum | `40216550c` | `opr BIG +` in its nullary and generator forms in `Library/CompilerLibrary.fsi` and `.fss` |

Each rung's own report is in `rung<N>/REPORT.md`, with the files it measured in `rung<N>/subset.txt` and the raw output before and after the edit in `rung<N>/raw-before/` and `rung<N>/raw/`.

The files each rung's report records as moved, in the rung's own words:

Rung 1, 23 ladder files plus the rung's own new test `ProjectFortress/library_tests/EqualityRung1.fss`: `tests/EqualityOverloadBug.fss`, `GS3.fss`, `FileConversion.fss`, `GeneratorNullPointer.fss`, `IntMapTest.fss`, `MapTest.fss`, `NumeralTest.fss`, `QuickCheckTest.fss`, `ReflectTest.fss`, `ReflectiveQuickCheckTest.fss`, `SetMapImport.fss`, `SetTest.fss`, `StringTests.fss`, `TestCompiledImports.fss`, `TypeImportBug.fss`, `WordCountSmall.fss`, `atomicsets.fss`, `caseWithSemicolons.fss`, `explicitStaticArgsToAggregates.fss`, `mapCombine.fss`, `parametricListCompr.fss`, `parametricManiaCompr.fss`, `setSum.fss`.

Rung 2, 21 files: `ArrayListQuick.fss`, `CovariantTest.fss`, `FunctionalMethodAsUnifyParam.fss`, `ListTest.fss`, `RandomTest.fss`, `RangePrototype.fss`, `RangeTest.fss`, `Reversals.fss`, `ShuffleTest.fss`, `asifTest.fss`, `bigEncloserCall.fss`, `booleanGuard.fss`, `errIN.fss`, `importBig.fss`, `mixedTypeAnnotation.fss`, `newASCIIshorthands.fss`, `oddJuxt.fss`, `quicksortTest.fss`, `simpleBig.fss`, `singleArgInference.fss`, `whereTest.fss`.

Rung 3, 8 files: `InitOrderWithMutable.fss`, `OverloadWithSuperExcludes.fss`, `immutableTopLevel.fss`, `overloadTest1.fss`, `overloadTest2.fss`, `overloadTest7.fss`, `overloadTest8.fss`, `unicodeTest.fss`.

Rung 4, 20 files: `AliasedGetterTest.fss`, `ObjectFieldShadowing.fss`, `emptySubscripting.fss`, `fib.fss`, `infixBars.fss`, `operatorSynonym.fss`, `postfixTest.fss`, `testCharLiteral.fss`, `ConditionalOpTruncation.fss`, `TupleBinding2.fss`, `Variable.VarWTypes.fss`, `ampersand.fss`, `objectCC.fss`, `objectCC_immutable.fss`, `objectCC_label.fss`, `objectCC_mutable.fss`, `Exception.fss`, `ImportNonparamObject.fss`, `testRecImport.fss`, `testTest1.fss`.

Rung 5, 4 files: `OverloadBuiltinParam.fss`, `overloadGenericNon.fss`, `wrapZZ.fss`, `compoundArray.fss`.

Rung 6, 4 files: `testParen.fss`, `chain2.fss`, `tupleTest1.fss`, `XXXcaseTest.fss`.

Rung 7, 3 files: `precedence.fss`, `forFnDecl.fss`, `ampersand.fss`.

Rung 8, 3 files: `restTest.fss`, `restTest2.fss`, `restTest2a.fss`.

## The pass count

The baseline was 59: 56 of the 381 interpreter tests and 3 of the 29 compiler-side library tests.

The re-run is 81: 78 of the 381 and the same 3.

The 22 new passes are the incremental claims of rungs 3, 4, 6 and 7 added up, and the re-run reproduces them exactly, file for file, on a cache built from scratch.

## The counts per phase

| phase | tests before | nwlt before | tests after | nwlt after |
|---|---|---|---|---|
| parse | 1 | 14 | 1 | 14 |
| disambiguate | 148 | 9 | 139 | 9 |
| typecheck | 141 | 2 | 133 | 2 |
| codegen | 21 | 0 | 20 | 0 |
| link | 4 | 1 | 5 | 1 |
| run | 10 | 0 | 5 | 0 |
| pass | 56 | 3 | 78 | 3 |

The `not_working_library_tests` corpus did not move at all: its wall is the parser, at `trait ... comprises Self`, and no rung went near it.

## Every file that moved up

Thirty-nine files, all in `tests/`.

| file | before | after |
|---|---|---|
| `AliasedGetterTest.fss` | typecheck | pass |
| `ConditionalOpTruncation.fss` | typecheck | codegen |
| `EqualityOverloadBug.fss` | disambiguate | typecheck |
| `GS3.fss` | disambiguate | typecheck |
| `ImportNonparamObject.fss` | typecheck | link |
| `InitOrderWithMutable.fss` | codegen | pass |
| `ObjectFieldShadowing.fss` | typecheck | pass |
| `OverloadBuiltinParam.fss` | disambiguate | typecheck |
| `OverloadWithSuperExcludes.fss` | codegen | pass |
| `TupleBinding2.fss` | typecheck | codegen |
| `Variable.VarWTypes.fss` | typecheck | codegen |
| `ampersand.fss` | typecheck | pass |
| `chain2.fss` | run | pass |
| `compoundArray.fss` | disambiguate | typecheck |
| `emptySubscripting.fss` | typecheck | pass |
| `fib.fss` | typecheck | pass |
| `forFnDecl.fss` | run | pass |
| `immutableTopLevel.fss` | codegen | pass |
| `infixBars.fss` | typecheck | pass |
| `objectCC.fss` | typecheck | codegen |
| `objectCC_immutable.fss` | typecheck | codegen |
| `objectCC_label.fss` | typecheck | codegen |
| `objectCC_mutable.fss` | typecheck | codegen |
| `operatorSynonym.fss` | typecheck | pass |
| `overloadGenericNon.fss` | disambiguate | typecheck |
| `overloadTest1.fss` | codegen | pass |
| `overloadTest2.fss` | codegen | pass |
| `overloadTest7.fss` | codegen | pass |
| `overloadTest8.fss` | codegen | pass |
| `postfixTest.fss` | typecheck | pass |
| `precedence.fss` | run | pass |
| `restTest.fss` | disambiguate | typecheck |
| `restTest2.fss` | disambiguate | typecheck |
| `restTest2a.fss` | disambiguate | typecheck |
| `testCharLiteral.fss` | typecheck | pass |
| `testParen.fss` | run | pass |
| `tupleTest1.fss` | run | pass |
| `unicodeTest.fss` | codegen | pass |
| `wrapZZ.fss` | disambiguate | typecheck |

The eight `codegen` to `pass` moves are rung 3, the eight `typecheck` to `pass` moves are rung 4, and the five `run` to `pass` moves are rungs 6 and 7. The four `disambiguate` to `typecheck` moves of `OverloadBuiltinParam`, `compoundArray`, `overloadGenericNon` and `wrapZZ` are rung 5, the three of the `restTest` family are rung 8, and `EqualityOverloadBug` and `GS3` are rung 1.

## Every file that moved down

None.

## Files that kept their phase and changed their first error

Forty-eight, and this is where rungs 1, 2, 5 and 8 mostly show: the name they added is gone from the file's output and the next one behind it is reported instead.

The twenty-one files of rung 1's subset that did not change phase now stop on `ImmutableArray`, twenty of them, and on `Maybe`, one, instead of on `Equality`; the twenty of rung 2's now stop on `LexicographicOrder` at `Library/List.fsi:67` instead of `HasRank`; `simpleSum.fss` now stops on `MOD` instead of `BIG +`; `Exception.fss`, `testRecImport.fss` and `testTest1.fss` are past `assert` and stop on a declaration error of their own.

One file changed its first error for a reason that is not a name: `simpleExp.fss` reported `Right-hand side has type NN64, but declared type is RR64` and now reports `ZZ32` in that position, which is the `IntLiteral` work of rungs 6 and 7 changing what a literal's type is inferred to be. It fails in the checker either way.

`XXXcaseTest.fss` is an expected-failure test that still stops at run, now on its own intended `MatchFailure` rather than on the compiler's stub.

## The new ranking of missing names

The name each file stops on, counted once per file, `tests` only. Forty-five names over 137 files, against 48 names over 146 files in the baseline.

| files | name | baseline |
|---|---|---|
| 26 | `ImmutableArray` | 6 |
| 20 | `LexicographicOrder` | — |
| 7 | `Array1` | 7 |
| 6 | `Char` | 6 |
| 6 | `Thread` | 6 |
| 5 | `Array` | 5 |
| 5 | `builtinPrimitive` | 5 |
| 4 | `Nothing` | 3 |
| 4 | `array1` | 4 |
| 3 | `big` | 3 |
| 3 | `Array2` | 3 |
| 3 | `TryAtomicFailure` | 3 |
| 3 | `matrix` | 3 |
| 3 | `recordTime` | 3 |
| 2 | `||_||` | 2 |
| 2 | `Maybe` | 1 |
| 2 | `unsigned` | 2 |
| 2 | `printThreadInfo` | 2 |
| 2 | `MOD` | 1 |
| 2 | `array` | 2 |
| 2 | `sin` | 2 |
| 2 | `printTaskTrace` | 2 |

The twenty-three names below these have one file each: `sequential`, `Integral`, `ActualReduction`, `ThisShouldBeANonExistingAPI`, `inc2`, `f`, `ceiling`, `SumReduction`, `VoidReduction`, `REM`, `widen`, `partition`, `Rank`, `PLUS_UP`, `round`, `RSHIFT`, `vector`, `BIG ||`, `Indexed`, `IndexOutOfBounds`, `narrow`, `AnyIntegral`, `ReadableArray`.

`Equality` 23, `HasRank` 21 and `//` 4 are gone from the ranking; `BIG +` is gone from it as a first stop and appears instead among the calls the checker cannot resolve.

The cascade cut, names reported inside an imported api rather than in the test, is unchanged at the top and is still the larger signal: `Maybe` 50, `Comprehension` 48, `BigReduction` 48, `MonoidReduction` 48, `LexicographicOrder` 37, `ImmutableArray` 29, `Array` 29, `ZeroIndexed` 23, `CommutativeMonoidReduction` 21, `Char` 10. `HasRank` 41 and `Equality` 24 have left it.

The calls the checker could not resolve: `juxtaposition` 4, `assert` 4, `=` 3, `BIG +` 3, `/` 2, `^` 2, then seven with one file each. `assert` led the baseline at 24 and is now four.

The codegen refusals: `Can't compile ObjectExpr` 5, `OptionUnwrapException` 4, `emitDesc of type <T> failed` 2, `Can't compile LetFn` 2, then seven with one file each, among them `Can't compile Label`, two more shapes of the tupled left-hand side, and a `ZipException: duplicate entry` on `ConditionalOpTruncation.fss`. `VarDecl mutable bindings not yet handled`, the head of the baseline's list at 8 files, is gone: that was rung 3.

## What this says about the next rung

The two names at the head, `ImmutableArray` at 26 files and `LexicographicOrder` at 20, are both behind decisions `PLAN.md` reserves. `ImmutableArray` cannot be written without choosing the array representation. `LexicographicOrder` is `Library/List.fsi:67` and pulls in the generic generator tower, which is the library-route fork.

Below them the ranking is the same shape it had in the baseline, and no name in it clears more than seven files.

## How the re-run was done

The driver, the corpora, the timeouts and the phase vocabulary are the baseline's, unchanged; only the output directory and the private cache root differ.

```
bash explorations/compile-ladder/after/run-ladder.sh   # writes after/results.tsv and after/raw/
python3 explorations/compile-ladder/after/classify.py  # writes after/ladder.tsv and after/summary.txt
python3 explorations/compile-ladder/after/report.py    # writes after/REPORT.md
```

The compiler-world library was rebuilt from nothing in the `repo-internals.md` order into a private cache tree, `library_tests/Integer1` compiled and printed `PASS` before the ladder started, and no file of either corpus and nothing under `default_repository/caches` was touched. 410 files, `120 s` compile and `60 s` run timeouts per file, one run.

`after/report.py` differs from `report.py` in five places: the title, a pointer to this file, the three counting sentences of the narrative section, which are computed from the data rather than written out, and the "Not verified" bullet that named three files of the baseline this run did not re-derive.

## Not verified

The re-run is a single run on a busy host; the wall times in `after/ladder.tsv` are not a benchmark.

Nothing here says whether a file that passes on the compiler path computes the same answer as on the interpreter. Rungs 6 and 7 checked that by hand for the five files they moved to `pass`; the other seventeen are `pass` by the interpreter suite's criterion, which is exit 0 with no `fail` in the output.

The new codegen refusal on `ConditionalOpTruncation.fss`, a `ZipException: duplicate entry` for a generated lambda class, is recorded here and not investigated. The file moved up, from the checker into codegen, so it is not a regression against the baseline, but the message is not one the baseline ever produced.

# Compile-path ladder baseline

Every interpreter test program and every file of the 2012 team's compiler-side
library tests, pushed through the compiler path unchanged, with the phase each
one reaches recorded.

Corpora: `ProjectFortress/tests/` (381 `.fss`; `concurrentPrinting.sh` and the
four data files are not programs and are skipped) and
`ProjectFortress/not_working_library_tests/` (29 files, 24 `.fss` and 5 `.fsi`).

No file was modified. The run used a private cache tree and a private
`java.io.tmpdir`; `default_repository/caches` was not touched.

## Reproducing

```
bash explorations/compile-ladder/run-ladder.sh   # writes results.tsv and raw/
python3 explorations/compile-ladder/classify.py  # writes ladder.tsv and summary.txt
python3 explorations/compile-ladder/report.py    # writes REPORT.md
```

The driver sources `experiment/env.sh`, then redirects the cache tree with the
`fortress.caches` system property and the `FORTRESS_CACHES` environment variable.
`bin/fortress` and `bin/run` pass `$JAVA_FLAGS` straight to the JVM and set
nothing cache-related themselves, and `ProjectProperties.java:283` reads
`fortress.caches` through `searchDef`, which consults the system property first,
the environment variable second and the repository `configuration` files last
(`ProjectProperties.java:261-269`); this is the same mechanism the parallel test
tracks use at `build.xml:941-943`.

Before the ladder the driver compiles the compiler-world library in the order
`explorations/repo-internals.md` gives (`LibraryBuiltin/AnyType.fss`,
`LibraryBuiltin/CompilerBuiltin.fss`, `Library/CompilerLibrary.fss`,
`Library/CompilerAlgebra.fss`, `Library/CompilerSystem.fss`) and then requires
`library_tests/Integer1.fss` to compile and print `PASS`. It refuses to start
otherwise.

Per file: `fortress compile <path>` with a 120 s timeout, then, when that exits 0
and the file is a `.fss`, `fortress run <component>` with a 60 s timeout. Raw
stdout+stderr of both are under `raw/<corpus>/<file>.{compile,run}`.

## How the phase is decided

| phase | decided from |
|---|---|
| parse | a Rats! `Syntax Error`, or the precedence resolver's `Resolution of operator ... failed` |
| disambiguate | `X is undefined.` (`TypeDisambiguator.java:363,380`), `Variable/Function/Operator X is not defined.` (`ExprDisambiguator.scala:450,475,500`), `Type name may refer to: ...`, or `Could not find an implementation for API X` (`GraphRepository.java:417`) |
| typecheck | `Unbound type: X` / `Unknown type: X` (`TypeWellFormedChecker.scala:95,119`), `Could not check call to ...`, `Ill-formed type`, and every other located error the phases past disambiguation report |
| codegen | `Can't compile <Node>` from `CodeGen.sayWhat` (`CodeGen.java:1550-1562`, reached through `CodeGen.defaultCase`, `CodeGen.java:1668-1670`), or any other `CompilerError` raised from the codegen packages |
| link | `fortress run` fails to load or link the compiled component (`NoClassDefFoundError`, `Unable to read serialized data ...`) |
| run | `fortress run` throws, or exits non-zero, or prints `fail`/`FAIL` |
| pass | exit 0, no `fail`/`FAIL` in the output, no exception |

`pass` is the interpreter suite's own success criterion (`FileTests.java:367-371`);
an `.fsi` has nothing to run, so it is `pass` when it compiles.

Agreement with the interpreter is **not** the criterion, and "output
byte-identical to `walk`" must not be read as one.  The interpreter is evidence,
not an oracle: `coordinator/REPAIR-BATCH.md:65` counts 55 rows of
`explorations/fortress-gap-ledger.md` that concern the interpreter, and records
that the static checker never runs on that path.  Where a compiled run and
`walk` disagree, the specification settles it, and it can settle it in either
direction -- ledger row 322 against the compiled run, ledger row 323 against
the interpreter.  Where the specification is silent the divergence is a question
rather than a verdict.  This qualification was ordered by `REPAIR-BATCH.md:65`
and written here by the review stage of the repair batch, 2026-09-19.

A compile that dies with an exception is attributed by its stack: every compiler
phase runs through `compiler/phases/<Name>Phase.execute` (`Phase.java:52`), so the
topmost such frame names the phase. `DesugarPhase` and `PreTypeCheckDesugarPhase`
are folded into `typecheck`, `OverloadRewritingPhase` into `codegen`.

Files whose name starts with `XXX` are expected-failure tests on the interpreter
(`FileTests.java:336`). They were run unchanged and are marked in the table; their
phase is what the compiler path does with them, not a pass/fail verdict.

## Counts per phase

| phase | tests | not_working_library_tests |
|---|---|---|
| parse | 1 | 14 |
| disambiguate | 148 | 9 |
| typecheck | 141 | 2 |
| codegen | 21 | 0 |
| link | 4 | 1 |
| run | 10 | 0 |
| pass | 56 | 3 |
| **total** | **381** | **29** |

Of the 381 interpreter tests, 55 are `XXX` expected-failure files. Their phases:

parse 1, disambiguate 8, typecheck 36, codegen 2, link 1, run 4, pass 3.

## What the baseline says

Fifty-six of the 381 interpreter tests compile, link and run clean on the
compiler path today, and three of the 29 compiler-side library tests do.

Two hundred and eighty-nine of the 381 stop before codegen is reached: 148 on a
name the compiler world does not bind, 141 in the checker. Twenty-one reach
codegen and are refused there, fourteen stop at run or link.

So the gap measured here is a library and checker gap, not a codegen gap, which
is the same reading `compiled-path-gaps.md` reached from a different corpus.

The `not_working_library_tests` corpus is unlike the interpreter corpus: it
stops at parse, not at names. Thirteen of its fourteen parse failures are a
Rats! `Syntax Error`, and ten of those point at a `trait ... comprises Self`
declaration (for example `not_working_library_tests/MaybeTest1.fss:15`).

## Missing names, ranked

This is the ranking the baseline exists for: it says which library names to add
first. Three cuts of the same data.

### The name the file stops on (first error)

Counted once per file. A name reported inside an imported api counts here too,
because that is what stops the file.

| files | name |
|---|---|
| 23 | `Equality` |
| 21 | `HasRank` |
| 7 | `Array1` |
| 6 | `Char` |
| 6 | `ImmutableArray` |
| 6 | `Thread` |
| 5 | `Array` |
| 5 | `builtinPrimitive` |
| 4 | `//` |
| 4 | `array1` |
| 4 | `BIG +` |
| 3 | `big` |
| 3 | `Array2` |
| 3 | `Nothing` |
| 3 | `TryAtomicFailure` |
| 3 | `matrix` |
| 3 | `recordTime` |
| 2 | `\|\|_\|\|` |
| 2 | `unsigned` |
| 2 | `printThreadInfo` |
| 2 | `array` |
| 2 | `sin` |
| 2 | `printTaskTrace` |
| 1 | `sequential` |
| 1 | `Integral` |
| 1 | `ActualReduction` |
| 1 | `Maybe` |
| 1 | `ThisShouldBeANonExistingAPI` |
| 1 | `inc2` |
| 1 | `f` |
| 1 | `ceiling` |
| 1 | `MOD` |
| 1 | `SumReduction` |
| 1 | `VoidReduction` |
| 1 | `REM` |
| 1 | `widen` |
| 1 | `partition` |
| 1 | `Rank` |
| 1 | `PLUS_UP` |
| 1 | `round` |
| 1 | `RSHIFT` |
| 1 | `vector` |
| 1 | `BIG \|\|` |
| 1 | `Indexed` |
| 1 | `IndexOutOfBounds` |
| 1 | `narrow` |
| 1 | `AnyIntegral` |
| 1 | `ReadableArray` |

`not_working_library_tests` contributes no rows here: its nine disambiguate
failures are all the ambiguity `Type name may refer to: ...`, not a missing name.

### Names reported inside the test file itself

Counted once per file, over every error the compile reported, restricted to
errors located in the test file. This is what the programs themselves ask for.

| files | name |
|---|---|
| 7 | `Nothing` |
| 6 | `Just` |
| 6 | `Thread` |
| 5 | `MOD` |
| 5 | `builtinPrimitive` |
| 5 | `BIG +` |
| 4 | `Array1` |
| 4 | `Array2` |
| 4 | `LSHIFT` |
| 4 | `//` |
| 4 | `floor` |
| 4 | `ceiling` |
| 4 | `array1` |
| 4 | `Array` |
| 4 | `RSHIFT` |
| 4 | `GCD` |
| 4 | `LCM` |
| 3 | `big` |
| 3 | `widen` |
| 3 | `unsigned` |
| 3 | `narrow` |
| 3 | `truncate` |
| 3 | `REM` |
| 3 | `TryAtomicFailure` |
| 3 | `?` |
| 3 | `sin` |
| 3 | `log` |
| 3 | `matrix` |
| 3 | `vector` |
| 3 | `recordTime` |
| 3 | `printTime` |
| 2 | `\|\|_\|\|` |
| 2 | `Char` |
| 2 | `Equality` |
| 2 | `round` |
| 2 | `printThreadInfo` |
| 2 | `array` |
| 2 | `NOTIN` |
| 2 | `atan` |
| 2 | `PLUS_UP` |
| 2 | `MINUS_UP` |
| 2 | `DOT_UP` |
| 2 | `SLASH_UP` |
| 2 | `prefix SQRT_UP` |
| 2 | `PLUS_DOWN` |
| 2 | `MINUS_DOWN` |
| 2 | `DOT_DOWN` |
| 2 | `SLASH_DOWN` |
| 2 | `prefix SQRT_DOWN` |
| 2 | `printTaskTrace` |
| 1 | `sequential` |
| 1 | `Integral` |
| 1 | `numerator` |
| 1 | `denominator` |
| 1 | `simplestRationalBetween` |
| 1 | `region` |
| 1 | `Global` |
| 1 | `isShared` |
| 1 | `localize` |
| 1 | `here` |
| 1 | `Array3` |
| 1 | `partitionL` |
| 1 | `signed` |
| 1 | `ThisShouldBeANonExistingAPI` |
| 1 | `inc2` |
| 1 | `f` |
| 1 | `abort` |
| 1 | `SumReduction` |
| 1 | `VoidReduction` |
| 1 | `array2` |
| 1 | `partition` |
| 1 | `Rank` |
| 1 | `cos` |
| 1 | `tan` |
| 1 | `asin` |
| 1 | `acos` |
| 1 | `atan2` |
| 1 | `exp` |
| 1 | `BIG \|\|` |
| 1 | `BIG juxtaposition` |
| 1 | `BIG MIN` |
| 1 | `Indexed` |
| 1 | `HasRank` |
| 1 | `ReadableArray1` |
| 1 | `DelegatedIndexed` |
| 1 | `IndexOutOfBounds` |
| 1 | `AnyIntegral` |
| 1 | `pmul` |
| 1 | `ReadableArray` |
| 1 | `Maybe` |

### Names reported inside an imported api (cascade)

Counted once per file, over errors located in `Library/`, `LibraryBuiltin/` or
`test_library/` rather than in the test. Top 40.

| files | name |
|---|---|
| 50 | `Maybe` |
| 48 | `Comprehension` |
| 48 | `BigReduction` |
| 48 | `MonoidReduction` |
| 41 | `HasRank` |
| 37 | `LexicographicOrder` |
| 29 | `ImmutableArray` |
| 29 | `Array` |
| 24 | `Equality` |
| 23 | `ZeroIndexed` |
| 22 | `StandardTotalOrder` |
| 21 | `CommutativeMonoidReduction` |
| 10 | `Char` |
| 5 | `Just` |
| 4 | `Indexed` |
| 4 | `Integral` |
| 4 | `Vector` |
| 4 | `RangeWithLeft` |
| 4 | `RangeWithRight` |
| 4 | `PartialRange` |
| 4 | `OpenRange` |
| 4 | `RangeWithExtent` |
| 4 | `ExtentRange` |
| 4 | `BoundedRange` |
| 4 | `LeftRange` |
| 4 | `RightRange` |
| 4 | `FullRange` |
| 4 | `DelegatedIndexed` |
| 4 | `CompactFullRange` |
| 4 | `StridedFullRange` |
| 4 | `AnyIntegral` |
| 4 | `Array1` |
| 3 | `ReadableArray` |
| 2 | `QQ` |
| 2 | `Nothing` |
| 2 | `AnyMatrix` |
| 2 | `AnyVector` |
| 2 | `AnyMultiplicativeRing` |
| 2 | `ImmutableArray1` |
| 1 | `ActualReduction` |

The cascade cut is the larger signal. An interpreter test that writes
`import List.{...}` drags `Library/List.fsi` into the compiler world, and that
file alone fails on `HasRank`, `LexicographicOrder`, `ZeroIndexed`,
`StandardTotalOrder` and the reduction traits. Adding the names the test files
themselves use would not move most of these files; making the interpreter's own
api files typecheck against the compiler prelude would.

## Calls the checker could not resolve

Not missing names — the name exists, no overload applies. Ranked by files.

| files | call |
|---|---|
| 24 | `assert` |
| 4 | `juxtaposition` |
| 2 | `/` |
| 2 | `=` |
| 2 | `^` |
| 1 | `<` |
| 1 | `takesFour` |
| 1 | `End` |
| 1 | `->` |
| 1 | `f` |
| 1 | `NE` |
| 1 | `foo` |
| 1 | `a` |
| 1 | `print` |

`assert` leads because the interpreter's `assert` lives in `FortressLibrary`
with signatures the compiler prelude does not carry.

## Codegen refusals, ranked

| files | refusal |
|---|---|
| 8 | `VarDecl mutable bindings not yet handled` |
| 4 | `Exception in thread "main" edu.rice.cs.plt.tuple.OptionUnwrapException` |
| 2 | `emitDesc of type <T> failed` |
| 2 | `Can't compile LetFn` |
| 2 | `Can't compile ObjectExpr` |
| 1 | `Can't compile VarArgs` |
| 1 | `Only handling some static args of generic types` |
| 1 | `VarDecl (key:String,val:ZZ32)=TupleExpr at tupled lhs not handled.` |

Twenty-one files reach codegen and are refused there. `Can't compile <Node>` is
the `defaultCase` refusal; the others are explicit `CompilerError`s raised inside
`CodeGen`, `OverloadSet` and `NamingCzar`.

## Files that pass unchanged

`tests` — 56 files:

```
AsExprSimple.fss
BadEncloser.fss
BuiltinBound.fss
GS0.fss
GS1.fss
InheritedMethod.fss
InheritedOverload2.fss
LineTerminatingComments.fss
OverloadConstructor1.fss
TestCompiledEnvironments.fss
TestCompiledNestedImports.fss
ToTheEOLComment.fss
UnderscoreId.fss
XXXgenericMethod1.fss  (XXX)
XXXgenericMethod2.fss  (XXX)
XXXgenericMethod3.fss  (XXX)
atomic0.fss
atomic2.fss
atomic3.fss
atomic4.fss
atomicTest.fss
controlZ.fss
deepHierarchy.fss
doubleSelf.fss
doubledOverloading.fss
doubledOverloading3.fss
emptyLoop.fss
executable_component.fss
extendObject.fss
fmTest1.fss
fmTest2.fss
fmTest3.fss
fmTest4.fss
fmTest5.fss
forTest.fss
forTest2.fss
genericMethod4.fss
genericTest5.fss
han.fss
ifGetter.fss
ifTest.fss
initOrder.fss
matchingCharacterMarks.fss
matchingStringMarks.fss
nestedInst.fss
nullaryOverload.fss
objectTest1.fss
objectTest2.fss
objectTest3.fss
primeCharacter.fss
returnAndMutateTuple.fss
testerTest.fss
traitTest1.fss
tupleTest2.fss
typecaseSelf.fss
varTest.fss
```

`not_working_library_tests` — 3 files:

```
Comparison1.fss
Comparison2.fss
VarRefTest.fss
```

`XXXgenericMethod1-3` are expected-failure tests on the interpreter that compile
and run clean on the compiler path. The compiler world does not reproduce the
generic-method defect the interpreter has.

## The ladder table

One row per file. `secs` is the wall time of the compile step. The first error
line is verbatim, with the absolute source spans stripped (they are in the raw
outputs) and `|` escaped.

| corpus | file | XXX | phase | secs | missing name | first error |
|---|---|---|---|---|---|---|
| nwlt | Comparison.fss |  | parse | 1 |  | Resolution of operator property failed for: |
| nwlt | Comparison1.fss |  | pass | 6 |  |  |
| nwlt | Comparison1a.fss |  | disambiguate | 1 |  | Type name may refer to: ComparisonLibrary.Comparison, CompilerBuiltin.Comparison |
| nwlt | Comparison1d.fss |  | parse | 1 |  | Syntax Error |
| nwlt | Comparison2.fss |  | pass | 5 |  |  |
| nwlt | Comparison3.fss |  | disambiguate | 1 |  | Type name may refer to: ComparisonLibrary.Comparison, CompilerBuiltin.Comparison |
| nwlt | ComparisonLibrary.fsi |  | disambiguate | 1 |  | Type name may refer to: ComparisonLibrary.Comparison, CompilerBuiltin.Comparison |
| nwlt | ComparisonLibrary.fss |  | disambiguate | 1 |  | Type name may refer to: ComparisonLibrary.Comparison, CompilerBuiltin.Comparison |
| nwlt | EqualityBug2.fss |  | parse | 1 |  | Syntax Error |
| nwlt | EqualityBug3.fss |  | parse | 1 |  | Syntax Error |
| nwlt | FailInference2.fss |  | typecheck | 1 |  | Could not check call to function testFail |
| nwlt | GenTest3.fss |  | disambiguate | 1 |  | Type name may refer to: Generator, CompilerBuiltin.Generator |
| nwlt | GenTest4.fss |  | disambiguate | 2 |  | Type name may refer to: Generator, CompilerBuiltin.Generator |
| nwlt | GenTest5.fss |  | typecheck | 6 |  | Ill-formed type: TestReduction[\()\] |
| nwlt | GenTest8.fss |  | link | 43 |  | java.lang.Error: java.lang.Error: Unable to read serialized data for GeneratorLibrary$CommutativeMonoidReduction??, recommend you delete the Fortress bytecode cache and relink |
| nwlt | HelperTest1.fss |  | disambiguate | 1 |  | Type name may refer to: Generator, CompilerBuiltin.Generator |
| nwlt | HelperTest2.fss |  | disambiguate | 2 |  | Type name may refer to: Generator, CompilerBuiltin.Generator |
| nwlt | HelperTest3.fss |  | disambiguate | 2 |  | Type name may refer to: Generator, CompilerBuiltin.Generator |
| nwlt | MatchErrorBug.fsi |  | parse | 1 |  | Syntax Error |
| nwlt | MatchErrorBug.fss |  | parse | 1 |  | Syntax Error |
| nwlt | MatchErrorBug1.fsi |  | parse | 1 |  | Syntax Error |
| nwlt | MatchErrorBug1.fss |  | parse | 2 |  | Syntax Error |
| nwlt | MatchErrorBug2.fsi |  | parse | 1 |  | Syntax Error |
| nwlt | MatchErrorBug2.fss |  | parse | 1 |  | Syntax Error |
| nwlt | MaybeTest1.fss |  | parse | 1 |  | Syntax Error |
| nwlt | MaybeTest10.fss |  | parse | 1 |  | Syntax Error |
| nwlt | MaybeTest2.fss |  | parse | 1 |  | Syntax Error |
| nwlt | MaybeTest5.fss |  | parse | 2 |  | Syntax Error |
| nwlt | VarRefTest.fss |  | pass | 2 |  |  |
| tests | AfterTypeChecking.fss |  | typecheck | 2 | `Array1` | Unbound type: CompilerLibrary.Array1 |
| tests | AliasedGetterTest.fss |  | typecheck | 3 |  | Could not check call to function assert |
| tests | AlsoDo.fss |  | typecheck | 2 |  | Missing parameter type for x |
| tests | ArrayListQuick.fss |  | disambiguate | 2 | `HasRank` | HasRank is undefined. |
| tests | AsExprSimple.fss |  | pass | 2 |  |  |
| tests | BadBounds.fss |  | disambiguate | 2 | `sequential` | Variable sequential is not defined. |
| tests | BadEncloser.fss |  | pass | 2 |  |  |
| tests | BigNum.fss |  | disambiguate | 2 | `big` | Variable big is not defined. |
| tests | BitTwiddle.fss |  | disambiguate | 1 | `Integral` | Integral is undefined. |
| tests | BoolMethodParamBug.fss |  | typecheck | 2 |  | class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.BoolExpr (com.sun.fortress.nodes.VarType and com.sun.fortress.nodes.BoolExpr are in unnamed module of loader 'app') |
| tests | BooleanOps.fss |  | typecheck | 4 |  | Could not check call to operator < |
| tests | Brackets.fss |  | disambiguate | 2 | `\|\|_\|\|` | Operator \|\|_\|\| is not defined. |
| tests | BuiltinBound.fss |  | pass | 3 |  |  |
| tests | CharacterTest.fss |  | disambiguate | 3 | `Char` | Char is undefined. |
| tests | ColonOperator.fss |  | typecheck | 2 | `Array2` | Unbound type: CompilerLibrary.Array2 |
| tests | ConditionalOpTruncation.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | CovCollTest.fss |  | disambiguate | 2 | `ImmutableArray` | ImmutableArray is undefined. |
| tests | CovariantTest.fss |  | disambiguate | 2 | `HasRank` | HasRank is undefined. |
| tests | DivPrecedence.fss |  | typecheck | 2 |  | Could not check call to operator / |
| tests | EqualityOverloadBug.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | Exception.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | ExceptionScoping.fss |  | disambiguate | 2 | `Nothing` | Function Nothing is not defined. |
| tests | FileConversion.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | FileReadWrite.fss |  | disambiguate | 1 | `Char` | Char is undefined. |
| tests | FuncOfFuncTest.fss |  | typecheck | 2 |  | No such method Left[\A,B\].unLeft. |
| tests | FunctionalMethodAsUnifyParam.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | GS0.fss |  | pass | 2 |  |  |
| tests | GS1.fss |  | pass | 2 |  |  |
| tests | GS2.fss |  | typecheck | 1 |  | Must provide type for initializer List(n) |
| tests | GS3.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | Generator2Test.fss |  | disambiguate | 2 | `ActualReduction` | ActualReduction is undefined. |
| tests | GeneratorNullPointer.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | GenericFnWithExcludes.fss |  | typecheck | 1 |  | non-type where clause bindings: Not yet implemented |
| tests | HeapTest.fss |  | disambiguate | 1 | `Maybe` | Maybe is undefined. |
| tests | ImplicitBlocks.fss |  | typecheck | 2 |  | Could not check call to operator juxtaposition |
| tests | ImportNonparamObject.fss |  | typecheck | 1 |  | Could not check call to function assert |
| tests | InferTest.fss |  | typecheck | 2 |  | Could not check call to operator juxtaposition |
| tests | InheritedMethod.fss |  | pass | 2 |  |  |
| tests | InheritedOverload2.fss |  | pass | 2 |  |  |
| tests | InitOrderWithMutable.fss |  | codegen | 1 |  | VarDecl (var cvar:String)=avar mutable bindings not yet handled. |
| tests | IntMapTest.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | LabelTest.fss |  | typecheck | 1 |  | Function body has type OR((),T), but declared return type is T. |
| tests | LineTerminatingComments.fss |  | pass | 2 |  |  |
| tests | ListNullPointer.fss |  | disambiguate | 1 | `ImmutableArray` | ImmutableArray is undefined. |
| tests | ListTest.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | LocalVar.fss |  | typecheck | 1 |  | Missing parameter type for x |
| tests | LongStringTests.fss |  | disambiguate | 1 | `Char` | Char is undefined. |
| tests | MapExprTest.fss |  | codegen | 2 |  | Can't compile VarArgs yet |
| tests | MapTest.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | Mutable.fss |  | codegen | 1 |  | Exception in thread "main" edu.rice.cs.plt.tuple.OptionUnwrapException |
| tests | NatParamOverloading.fss |  | typecheck | 1 |  | head of empty list |
| tests | NatReflectTest.fss |  | codegen | 2 |  | Only handling some static args of generic types |
| tests | NumberPrintTest.fss |  | disambiguate | 1 | `big` | Variable big is not defined. |
| tests | NumeralTest.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | ObjectDefVars.fss |  | typecheck | 1 |  | Must provide type for initializer List(z) |
| tests | ObjectExprWithFunctionalMethod.fss |  | codegen | 2 |  | emitDesc of type t failed |
| tests | ObjectFieldShadowing.fss |  | typecheck | 1 |  | Could not check call to function assert |
| tests | ObjectParams.fss |  | typecheck | 1 |  | Must provide type for initializer List(y) |
| tests | ObjectToStringTest.fss |  | codegen | 2 |  | emitDesc of type Object failed |
| tests | OpenRangeCase.fss |  | typecheck | 1 |  | Incorrect number of static arguments for type 'CompilerLibrary.Range': provided 1, expected 0 |
| tests | OverloadBuiltinParam.fss |  | disambiguate | 1 | `//` | Operator // is not defined. |
| tests | OverloadConstructor1.fss |  | pass | 2 |  |  |
| tests | OverloadConstructor2.fss |  | typecheck | 2 |  | Could not check call to operator = |
| tests | OverloadConstructor3.fss |  | typecheck | 1 |  | Could not check call to operator = |
| tests | OverloadWithSuperExcludes.fss |  | codegen | 3 |  | VarDecl (x:ZZ32)=_RewriteFnApp at mutable bindings not yet handled. |
| tests | ParamRef.fss |  | disambiguate | 0 | `ImmutableArray` | ImmutableArray is undefined. |
| tests | PureListQuick.fss |  | disambiguate | 1 | `ImmutableArray` | ImmutableArray is undefined. |
| tests | QuickCheckTest.fss |  | disambiguate | 3 | `Equality` | Equality is undefined. |
| tests | RandomTest.fss |  | disambiguate | 2 | `HasRank` | HasRank is undefined. |
| tests | RangePrototype.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | RangeTest.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | RationalTest.fss |  | disambiguate | 5 | `big` | Variable big is not defined. |
| tests | ReflectTest.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | ReflectiveQuickCheckTest.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | Region.fss |  | disambiguate | 1 | `array1` | Function array1 is not defined. |
| tests | ReplicaTest.fss |  | disambiguate | 1 | `Array1` | Array1 is undefined. |
| tests | Reversals.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | SetMapImport.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | SetTest.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | ShuffleTest.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | SkipListTest.fss |  | disambiguate | 1 | `ImmutableArray` | ImmutableArray is undefined. |
| tests | Spawn1.fss |  | disambiguate | 1 | `Thread` | Thread is undefined. |
| tests | Spawn2.fss |  | disambiguate | 1 | `Thread` | Thread is undefined. |
| tests | Spawn3.fss |  | disambiguate | 0 | `Thread` | Thread is undefined. |
| tests | Spawn4.fss |  | disambiguate | 1 | `Thread` | Thread is undefined. |
| tests | Spawn5.fss |  | disambiguate | 1 | `Thread` | Thread is undefined. |
| tests | Spawn6.fss |  | disambiguate | 1 | `Thread` | Thread is undefined. |
| tests | StringTests.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | SubscriptedExpr.fss |  | disambiguate | 2 | `array1` | Function array1 is not defined. |
| tests | TestCompiledEnvironments.fss |  | pass | 3 |  |  |
| tests | TestCompiledImports.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | TestCompiledNestedImports.fss |  | pass | 2 |  |  |
| tests | TimingTests.fss |  | typecheck | 2 |  | Missing parameter type for x |
| tests | ToTheEOLComment.fss |  | pass | 2 |  |  |
| tests | TransactionalArrayShakedown.fss |  | disambiguate | 2 | `Array` | Array is undefined. |
| tests | TransitiveImportMethodLookup.fss |  | disambiguate | 1 | `Char` | Char is undefined. |
| tests | TreapTest.fss |  | link | 3 |  | Treap$Treap |
| tests | TupleBinding.fss |  | codegen | 1 |  | VarDecl (key:String,val:ZZ32)=TupleExpr at tupled lhs not handled. |
| tests | TupleBinding2.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | TypeImportBug.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | UnderscoreId.fss |  | pass | 1 |  |  |
| tests | UnnamedParam.fss |  | typecheck | 2 |  | Function body has type (), but declared return type is ZZ64. |
| tests | UnsignedTest.fss |  | disambiguate | 2 | `unsigned` | Variable unsigned is not defined. |
| tests | Variable.VarWTypes.fss |  | typecheck | 1 |  | Could not check call to function assert |
| tests | Wildcards.fss |  | typecheck | 1 |  | Must provide type for initializer List(tmp2) |
| tests | WordCountSmall.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | XXXAlsoEE.fss | yes | typecheck | 1 |  | Unmatched delimiter "component". |
| tests | XXXAsExpr.fss | yes | typecheck | 1 |  | Expression has type IntLiteral, but ascripted type is String. |
| tests | XXXExitWithoutEnclosingLabel.fss | yes | typecheck | 1 |  | Could not find 'label' with name: quit |
| tests | XXXExportsEE.fss | yes | parse | 0 |  | Syntax Error |
| tests | XXXGenericOverload.fss | yes | run | 2 |  | FAIL: should have failed in generic overloading of f |
| tests | XXXGenericOverload2.fss | yes | link | 1 |  | java.lang.Error: java.lang.Error: Unable to read serialized data for XXXGenericOverload2?$\=f{_\|ProjectFortress\|tests\|XXXGenericOverload2\,fss\!24\!1-32,_\|ProjectFortress\|tests\|XXXGenericOverload2\,fss\!25\!1-33}???$\=?Intersection?Arrow?Tuple?U,V,XXXGenericOverload2\%B?,fortress\\|CompilerBuiltin\%IntLiteral?,Arrow?Tuple?V,U,XXXGenericOverload2\%A?,fortress\\|CompilerBuiltin\%IntLiteral??, recommend you delete the Fortress bytecode cache and relink |
| tests | XXXGenericOverload3.fss | yes | typecheck | 2 |  |  |
| tests | XXXHashtable.fss | yes | typecheck | 1 |  | The return type of put is required. |
| tests | XXXImportImportCollision.fss | yes | disambiguate | 1 |  | Type name may refer to: U, TestImports2.U, TestImports1.U |
| tests | XXXImportImportCollision2.fss | yes | typecheck | 0 |  | Component/API names must match their enclosing file names. |
| tests | XXXImportLocalCollision.fss | yes | typecheck | 1 |  | Component/API names must match their enclosing file names. |
| tests | XXXImportNonExistingAPI.fss | yes | disambiguate | 0 | `ThisShouldBeANonExistingAPI` | Could not find an implementation for API ThisShouldBeANonExistingAPI on path |
| tests | XXXInheritedOverload.fss | yes | typecheck | 2 |  | No such method O.b. |
| tests | XXXLabelShadowing.fss | yes | typecheck | 1 |  | Label blah is already declared. |
| tests | XXXLetRecTest.fss | yes | disambiguate | 1 | `inc2` | Variable inc2 is not defined. |
| tests | XXXNonValueOfValue.fss | yes | disambiguate | 1 | `f` | Variable f is not defined. |
| tests | XXXTypeError.fss | yes | typecheck | 1 |  | Right-hand side has type String, but declared type is ZZ32. |
| tests | XXXUnimplementedMethod.fss | yes | typecheck | 1 |  | No such method O.b. |
| tests | XXXWildcardField.fss | yes | typecheck | 1 |  | Fields or top-level declarations in APIs cannot be named '_'. |
| tests | XXXarityTestFn.fss | yes | disambiguate | 1 | `builtinPrimitive` | Variable builtinPrimitive is not defined. |
| tests | XXXbroken.fss | yes | typecheck | 1 |  | Function body has type ZZ32, but declared return type is (). |
| tests | XXXcaseTest.fss | yes | run | 2 |  | FortressException: class fortress.CompilerBuiltin$CompilerFailureDetectedAtRunTime with string Compiler failure detected at runtime |
| tests | XXXextendBoolean.fss | yes | typecheck | 2 |  | The inherited abstract method abstract getter isEmpty:Boolean from the trait Condition[\()\] |
| tests | XXXextendFloatLiteral.fss | yes | typecheck | 1 |  | The inherited abstract method abstract getter asRR32:RR32 from the trait FloatLiteral |
| tests | XXXextendIntLiteral.fss | yes | typecheck | 2 |  | The inherited abstract method abstract getter asNN32:NN32 from the trait IntLiteral |
| tests | XXXextendObject.fss | yes | typecheck | 1 |  | Invalid type in extends clause: Foo |
| tests | XXXextendOprParam2.fss | yes | typecheck | 1 |  | The inherited abstract method OPLUS(self:Altoid[\T,OPLUS\],other:T):T from the trait Altoid[\Chicken,EGG\] |
| tests | XXXfailTestFn.fss | yes | disambiguate | 1 | `builtinPrimitive` | Variable builtinPrimitive is not defined. |
| tests | XXXflatTest.fss | yes | typecheck | 2 |  | Could not check call to function takesFour |
| tests | XXXgenericMethod1.fss | yes | pass | 2 |  |  |
| tests | XXXgenericMethod2.fss | yes | pass | 1 |  |  |
| tests | XXXgenericMethod3.fss | yes | pass | 1 |  |  |
| tests | XXXgenericTest6.fss | yes | typecheck | 2 |  | Could not check call to function End |
| tests | XXXimmutable0.fss | yes | typecheck | 1 |  | Variable x is already declared. |
| tests | XXXimmutable1.fss | yes | codegen | 1 |  | Exception in thread "main" edu.rice.cs.plt.tuple.OptionUnwrapException |
| tests | XXXimmutable2.fss | yes | codegen | 2 |  | Exception in thread "main" edu.rice.cs.plt.tuple.OptionUnwrapException |
| tests | XXXimmutableTopLevel.fss | yes | typecheck | 1 |  | Cannot infer type for variable e because it has reference cycle: e, w, e |
| tests | XXXlabelExit.fss | yes | typecheck | 1 |  | Could not find 'label' with name: wilma |
| tests | XXXlabelExit2.fss | yes | typecheck | 1 |  | Exit occurs outside of a label. |
| tests | XXXlabelExit3.fss | yes | typecheck | 1 |  | Could not find 'label' with name: wilma |
| tests | XXXloopError.fss | yes | typecheck | 2 |  | O has no getter called nonexistentfield |
| tests | XXXmutableTopVarWithoutType.fss | yes | typecheck | 1 |  | The type of x is required. |
| tests | XXXmutableWithoutType.fss | yes | typecheck | 1 |  | The type of x is required. |
| tests | XXXmutation1.fss | yes | typecheck | 1 |  | Could not assign an expression of type String to variable n of type ZZ32. |
| tests | XXXmutation2.fss | yes | typecheck | 1 |  | Could not assign an expression of type String to variable field of type ZZ32. |
| tests | XXXnoclassNativeFn.fss | yes | disambiguate | 1 | `builtinPrimitive` | Variable builtinPrimitive is not defined. |
| tests | XXXnonBooleanCond.fss | yes | disambiguate | 1 | `Char` | Char is undefined. |
| tests | XXXoutcome.fss | yes | typecheck | 1 |  | Invalid variable name: 'outcome' is a reserved word. |
| tests | XXXoverloadTest5.fss | yes | typecheck | 1 |  |  |
| tests | XXXseqLoopError.fss | yes | typecheck | 2 |  | O has no getter called nonexistentfield |
| tests | XXXsubtypeRuleResultFail.fss | yes | typecheck | 2 |  |  |
| tests | XXXtupleTypeParam3.fss | yes | typecheck | 1 |  | Ill-formed type: A[\(ZZ32, ZZ32)\] |
| tests | XXXtypeParamShadowing.fss | yes | run | 2 |  | This program should be failed with a shadowing bug. |
| tests | XXXtypecaseTest.fss | yes | run | 1 |  | FortressException: class fortress.CompilerLibrary$MatchFailure with string Match failure |
| tests | XXXvarargsObject.fss | yes | typecheck | 0 |  | Varargs parameters of objects are not allowed. |
| tests | abortBlock.fss |  | disambiguate | 1 | `printThreadInfo` | Variable printThreadInfo is not defined. |
| tests | abortTest.fss |  | disambiguate | 1 | `TryAtomicFailure` | TryAtomicFailure is undefined. |
| tests | ampersand.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | anyLenArray.fss |  | disambiguate | 1 | `Array` | Array is undefined. |
| tests | array3test.fss |  | typecheck | 1 |  | head of empty list |
| tests | arrayBig.fss |  | typecheck | 2 |  | head of empty list |
| tests | arrayTest0.fss |  | disambiguate | 1 | `Array1` | Array1 is undefined. |
| tests | arrayTest1.fss |  | typecheck | 1 |  | head of empty list |
| tests | arrayTest2.fss |  | typecheck | 1 |  | head of empty list |
| tests | arrayTest3.fss |  | typecheck | 1 |  | head of empty list |
| tests | arrayWithTrailingSpaces.fss |  | typecheck | 1 |  | head of empty list |
| tests | asifTest.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | atomic0.fss |  | pass | 1 |  |  |
| tests | atomic1.fss |  | typecheck | 2 |  | Could not check method invocation Range.loop |
| tests | atomic2.fss |  | pass | 2 |  |  |
| tests | atomic3.fss |  | pass | 2 |  |  |
| tests | atomic4.fss |  | pass | 2 |  |  |
| tests | atomic5.fss |  | disambiguate | 1 | `printThreadInfo` | Variable printThreadInfo is not defined. |
| tests | atomicArrayOps.fss |  | disambiguate | 1 | `Array` | Array is undefined. |
| tests | atomicExpr.fss |  | typecheck | 2 |  | Non-last expression in a block has type ((), ()), but it must have () type. |
| tests | atomicList.fss |  | typecheck | 2 |  | Invalid comprises clause: CompilerBuiltin.Exception has a comprises clause |
| tests | atomicTest.fss |  | pass | 2 |  |  |
| tests | atomicsets.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | bigEncloserCall.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | bogusNatParams.fss |  | typecheck | 1 |  | head of empty list |
| tests | booleanGuard.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | buffons.fss |  | disambiguate | 1 | `ceiling` | Variable ceiling is not defined. |
| tests | caseTest.fss |  | typecheck | 2 |  | Not yet implemented |
| tests | caseWithSemicolons.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | chain0.fss |  | disambiguate | 1 | `MOD` | Operator MOD is not defined. |
| tests | chain2.fss |  | run | 3 |  | FortressException: class fortress.CompilerBuiltin$CompilerFailureDetectedAtRunTime with string Compiler failure detected at runtime |
| tests | commonSuper.fss |  | typecheck | 2 |  | You should be able to call methods on this type,OR(B,C)but this is not yet implemented.: Not yet implemented |
| tests | compoundArray.fss |  | disambiguate | 1 | `//` | Operator // is not defined. |
| tests | conditionalExtension.fss |  | typecheck | 1 |  | Cyclic type hierarchy: Type RationalQuantity transitively extends itself. |
| tests | conditionalGenerator.fss |  | disambiguate | 1 | `array` | Function array is not defined. |
| tests | conditionalOp.fss |  | typecheck | 1 |  | Could not check call to operator -> |
| tests | contracts1.fss |  | typecheck | 2 |  | Missing parameter type for n |
| tests | controlZ.fss |  | pass | 1 |  |  |
| tests | deepHierarchy.fss |  | pass | 2 |  |  |
| tests | dimensionUnitDecl.fss |  | typecheck | 1 |  | Not yet implemented: class com.sun.fortress.nodes.DimDecl |
| tests | disp0.fss |  | typecheck | 2 |  |  |
| tests | disp1.fss |  | typecheck | 1 |  |  |
| tests | disp2.fss |  | run | 2 |  | f FAIL |
| tests | doubleSelf.fss |  | pass | 1 |  |  |
| tests | doubledOverloading.fss |  | pass | 2 |  |  |
| tests | doubledOverloading2.fss |  | typecheck | 1 |  | Non-last expression in a block has type Boolean, but it must have () type. |
| tests | doubledOverloading3.fss |  | pass | 2 |  |  |
| tests | emptyLoop.fss |  | pass | 2 |  |  |
| tests | emptySubscripting.fss |  | typecheck | 1 |  | Could not check call to function assert |
| tests | errIN.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | executable_component.fss |  | pass | 1 |  |  |
| tests | exitType.fss |  | typecheck | 1 |  | Function body has type ZZ32, but declared return type is (). |
| tests | expTest.fss |  | typecheck | 2 |  | Could not check call to operator ^ |
| tests | explicitStaticArgsToAggregates.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | extendAny.fss |  | disambiguate | 1 |  | Type name may refer to: Infinity, CompilerBuiltin.Infinity |
| tests | extendException.fss |  | disambiguate | 1 |  | Type name may refer to: Infinity, CompilerBuiltin.Infinity |
| tests | extendNumber.fss |  | disambiguate | 1 |  | Type name may refer to: Infinity, CompilerBuiltin.Infinity |
| tests | extendObject.fss |  | pass | 1 |  |  |
| tests | fib.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | fib13.fss |  | disambiguate | 1 | `unsigned` | Variable unsigned is not defined. |
| tests | fmTest1.fss |  | pass | 2 |  |  |
| tests | fmTest2.fss |  | pass | 2 |  |  |
| tests | fmTest3.fss |  | pass | 3 |  |  |
| tests | fmTest4.fss |  | pass | 1 |  |  |
| tests | fmTest5.fss |  | pass | 2 |  |  |
| tests | forFnDecl.fss |  | run | 2 |  | FortressException: class fortress.CompilerBuiltin$CompilerFailureDetectedAtRunTime with string Compiler failure detected at runtime |
| tests | forTest.fss |  | pass | 1 |  |  |
| tests | forTest2.fss |  | pass | 2 |  |  |
| tests | formatTest.fss |  | disambiguate | 1 | `Char` | Char is undefined. |
| tests | funny.fss |  | codegen | 3 |  | Can't compile LetFn at /home/user/fortress/ProjectFortress/tests/funny.fss:29.3 |
| tests | generatedExpr.fss |  | disambiguate | 1 | `array` | Function array is not defined. |
| tests | generatorTest.fss |  | disambiguate | 1 | `SumReduction` | Variable SumReduction is not defined. |
| tests | genericMethod0.fss |  | disambiguate | 1 | `VoidReduction` | Variable VoidReduction is not defined. |
| tests | genericMethod1.fss |  | typecheck | 1 |  | head of empty list |
| tests | genericMethod4.fss |  | pass | 1 |  |  |
| tests | genericTest1.fss |  | link | 2 |  | java.lang.NoClassDefFoundError |
| tests | genericTest2.fss |  | link | 2 |  | java.lang.NoClassDefFoundError |
| tests | genericTest3.fss |  | typecheck | 2 |  | Could not check call to operator juxtaposition |
| tests | genericTest4.fss |  | typecheck | 1 |  | Could not check call to function f |
| tests | genericTest5.fss |  | pass | 2 |  |  |
| tests | han.fss |  | pass | 1 |  |  |
| tests | ho.fss |  | typecheck | 1 |  | Right-hand side has type IntLiteral, but declared type is Matrix[\ZZ32,n,1\]. |
| tests | ifGetter.fss |  | pass | 1 |  |  |
| tests | ifTest.fss |  | pass | 1 |  |  |
| tests | immutable.fss |  | codegen | 2 |  | Exception in thread "main" edu.rice.cs.plt.tuple.OptionUnwrapException |
| tests | immutableTopLevel.fss |  | codegen | 2 |  | VarDecl (var effects:ZZ32)=_RewriteFnApp at mutable bindings not yet handled. |
| tests | importBig.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | infixBars.fss |  | typecheck | 1 |  | Could not check call to function assert |
| tests | initOrder.fss |  | pass | 2 |  |  |
| tests | instantiateNatParam.fss |  | typecheck | 2 |  | class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.IntExpr (com.sun.fortress.nodes.VarType and com.sun.fortress.nodes.IntExpr are in unnamed module of loader 'app') |
| tests | intDivisionTest.fss |  | typecheck | 1 |  | Could not check call to operator / |
| tests | intPrim.fss |  | disambiguate | 1 | `REM` | Operator REM is not defined. |
| tests | juxtTwice.fss |  | disambiguate | 2 | `sin` | Variable sin is not defined. |
| tests | labelExit.fss |  | disambiguate | 1 | `array1` | Function array1 is not defined. |
| tests | letRecTest.fss |  | typecheck | 1 |  | Missing parameter type for x |
| tests | litCoercion.fss |  | typecheck | 2 |  | Function body has type ZZ64, but declared return type is (). |
| tests | longPrim.fss |  | disambiguate | 1 | `widen` | Variable widen is not defined. |
| tests | mapCombine.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | matchingCharacterMarks.fss |  | pass | 1 |  |  |
| tests | matchingStringMarks.fss |  | pass | 2 |  |  |
| tests | matrixOps.fss |  | disambiguate | 1 | `matrix` | Function matrix is not defined. |
| tests | maybeTest.fss |  | disambiguate | 1 | `Nothing` | Function Nothing is not defined. |
| tests | mixedTypeAnnotation.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | multiGenFor.fss |  | disambiguate | 1 | `matrix` | Function matrix is not defined. |
| tests | naiveSeq.fss |  | disambiguate | 1 | `partition` | Variable partition is not defined. |
| tests | natInference0.fss |  | typecheck | 2 |  | class com.sun.fortress.nodes.TraitType cannot be cast to class com.sun.fortress.nodes.IntExpr (com.sun.fortress.nodes.TraitType and com.sun.fortress.nodes.IntExpr are in unnamed module of loader 'app') |
| tests | nativeArrayTest.fss |  | disambiguate | 1 | `Array1` | Array1 is undefined. |
| tests | nativeImmutableArrayTest.fss |  | disambiguate | 1 | `Array1` | Array1 is undefined. |
| tests | nativeTestFn.fss |  | disambiguate | 1 | `builtinPrimitive` | Variable builtinPrimitive is not defined. |
| tests | naturalsTest.fss |  | disambiguate | 1 | `Nothing` | Function Nothing is not defined. |
| tests | neOperator.fss |  | typecheck | 2 |  | Could not check call to operator NE |
| tests | nestedInst.fss |  | pass | 2 |  |  |
| tests | nestedOutcome.fss |  | typecheck | 1 |  | Variable 'outcome' not found. |
| tests | nestedTransactions1.fss |  | disambiguate | 1 | `recordTime` | Variable recordTime is not defined. |
| tests | nestedTransactions2.fss |  | disambiguate | 1 | `recordTime` | Variable recordTime is not defined. |
| tests | nestedTransactions3.fss |  | disambiguate | 1 | `TryAtomicFailure` | TryAtomicFailure is undefined. |
| tests | nestedTransactions4.fss |  | disambiguate | 1 | `recordTime` | Variable recordTime is not defined. |
| tests | newASCIIshorthands.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | newlineTest.fss |  | typecheck | 1 |  | The typecase clause, (ZZ32, RR64), is unreachable. |
| tests | nullaryOverload.fss |  | pass | 2 |  |  |
| tests | objectCC.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | objectCC_immutable.fss |  | typecheck | 3 |  | Could not check call to function assert |
| tests | objectCC_label.fss |  | typecheck | 4 |  | Could not check call to function assert |
| tests | objectCC_multi_objExpr_mutVar1.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | objectCC_multi_objExpr_mutVar2.fss |  | typecheck | 3 |  | Could not check call to function assert |
| tests | objectCC_mutVar1.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | objectCC_mutVar2.fss |  | typecheck | 1 |  | Could not check call to function assert |
| tests | objectCC_mutable.fss |  | typecheck | 4 |  | Could not check call to function assert |
| tests | objectCC_shadowTest.fss |  | typecheck | 2 |  | Could not check call to function foo |
| tests | objectCC_staticParams.fss |  | typecheck | 1 |  | class com.sun.fortress.nodes.TraitType cannot be cast to class com.sun.fortress.nodes.BoolExpr (com.sun.fortress.nodes.TraitType and com.sun.fortress.nodes.BoolExpr are in unnamed module of loader 'app') |
| tests | objectExprMystery.fss |  | disambiguate | 1 | `Array2` | Array2 is undefined. |
| tests | objectTest1.fss |  | pass | 2 |  |  |
| tests | objectTest2.fss |  | pass | 2 |  |  |
| tests | objectTest3.fss |  | pass | 2 |  |  |
| tests | objectTest4.fss |  | typecheck | 1 |  | Missing parameter type for g' |
| tests | objectTest7.fss |  | codegen | 2 |  | Can't compile ObjectExpr at /home/user/fortress/ProjectFortress/tests/objectTest7.fss:26.17 |
| tests | objectTest8.fss |  | typecheck | 2 |  | Right-hand side has type T, but declared type is U. |
| tests | objectZZ.fss |  | disambiguate | 1 | `Rank` | Rank is undefined. |
| tests | oddJuxt.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | operatorSynonym.fss |  | typecheck | 1 |  | Could not check call to function assert |
| tests | oprTests.fss |  | disambiguate | 1 | `sin` | Variable sin is not defined. |
| tests | overloadGenericNon.fss |  | disambiguate | 1 | `//` | Operator // is not defined. |
| tests | overloadTest1.fss |  | codegen | 3 |  | VarDecl (var a1c:ZZ32)=_RewriteFnApp at mutable bindings not yet handled. |
| tests | overloadTest2.fss |  | codegen | 2 |  | VarDecl (var a1c:ZZ32)=_RewriteFnApp at mutable bindings not yet handled. |
| tests | overloadTest3.fss |  | typecheck | 1 |  | Missing parameter type for x |
| tests | overloadTest6.fss |  | typecheck | 2 |  | Could not check call to function a |
| tests | overloadTest7.fss |  | codegen | 3 |  | VarDecl (x:ZZ32)=_RewriteFnApp at mutable bindings not yet handled. |
| tests | overloadTest8.fss |  | codegen | 2 |  | VarDecl (x:ZZ32)=_RewriteFnApp at mutable bindings not yet handled. |
| tests | parametricListCompr.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | parametricManiaCompr.fss |  | disambiguate | 2 | `Equality` | Equality is undefined. |
| tests | postfixTest.fss |  | typecheck | 1 |  | Could not check call to function assert |
| tests | precedence.fss |  | run | 2 |  | FortressException: class fortress.CompilerBuiltin$CompilerFailureDetectedAtRunTime with string Compiler failure detected at runtime |
| tests | primOverloadTest.fss |  | disambiguate | 1 | `Array1` | Array1 is undefined. |
| tests | primeCharacter.fss |  | pass | 1 |  |  |
| tests | printTests.fss |  | typecheck | 1 |  | Could not check call to function print |
| tests | quicksortTest.fss |  | disambiguate | 2 | `HasRank` | HasRank is undefined. |
| tests | rangeOperators.fss |  | typecheck | 3 |  | Could not check call to operator juxtaposition |
| tests | realArith.fss |  | disambiguate | 2 | `PLUS_UP` | Operator PLUS_UP is not defined. |
| tests | restTest.fss |  | disambiguate | 1 | `BIG +` | Operator BIG + is not defined. |
| tests | restTest2.fss |  | disambiguate | 1 | `BIG +` | Operator BIG + is not defined. |
| tests | restTest2a.fss |  | disambiguate | 1 | `BIG +` | Operator BIG + is not defined. |
| tests | returnAndMutateTuple.fss |  | pass | 2 |  |  |
| tests | rightOverload.fss |  | disambiguate | 1 | `Array2` | Array2 is undefined. |
| tests | roundBug.fss |  | disambiguate | 1 | `round` | Variable round is not defined. |
| tests | rshiftbug.fss |  | disambiguate | 1 | `RSHIFT` | Operator RSHIFT is not defined. |
| tests | scopeSharing.fss |  | codegen | 2 |  | Can't compile ObjectExpr at /home/user/fortress/ProjectFortress/tests/scopeSharing.fss:27.6 |
| tests | seqLoop.fss |  | disambiguate | 2 | `vector` | Function vector is not defined. |
| tests | sequivTest.fss |  | disambiguate | 1 | `BIG \|\|` | Operator BIG \|\| is not defined. |
| tests | setMakerTest0.fss |  | disambiguate | 1 | `ImmutableArray` | ImmutableArray is undefined. |
| tests | setSum.fss |  | disambiguate | 1 | `Equality` | Equality is undefined. |
| tests | setterTest.fss |  | disambiguate | 1 | `array1` | Function array1 is not defined. |
| tests | sideEffUpdate.fss |  | typecheck | 1 |  | head of empty list |
| tests | simpleBig.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | simpleExp.fss |  | typecheck | 2 |  | Right-hand side has type NN64, but declared type is RR64. |
| tests | simpleSum.fss |  | disambiguate | 2 | `BIG +` | Operator BIG + is not defined. |
| tests | simplify1.fss |  | codegen | 2 |  | Can't compile LetFn at /home/user/fortress/ProjectFortress/tests/simplify1.fss:29.3 |
| tests | singleArgInference.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | sparseMatrix.fss |  | disambiguate | 1 | `Array` | Array is undefined. |
| tests | spuriousSelf.fss |  | disambiguate | 1 | `Indexed` | Indexed is undefined. |
| tests | stringJuxt.fss |  | disambiguate | 1 | `IndexOutOfBounds` | IndexOutOfBounds is undefined. |
| tests | subArray.fss |  | disambiguate | 1 | `Array` | Array is undefined. |
| tests | taskTrace2.fss |  | disambiguate | 1 | `printTaskTrace` | Variable printTaskTrace is not defined. |
| tests | taskTrace3.fss |  | disambiguate | 1 | `printTaskTrace` | Variable printTaskTrace is not defined. |
| tests | testCharLiteral.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | testParen.fss |  | run | 1 |  | FortressException: class fortress.CompilerBuiltin$CompilerFailureDetectedAtRunTime with string Compiler failure detected at runtime |
| tests | testPrim.fss |  | disambiguate | 2 | `builtinPrimitive` | Variable builtinPrimitive is not defined. |
| tests | testRR32.fss |  | disambiguate | 1 | `narrow` | Variable narrow is not defined. |
| tests | testRecImport.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | testTest1.fss |  | typecheck | 2 |  | Could not check call to function assert |
| tests | testTest2.fss |  | typecheck | 2 |  | Cannot infer type for function fact(x:ZZ32) because it has reference cycle: fact(x:ZZ32), fact(x:ZZ32) |
| tests | testTransient.fss |  | typecheck | 1 |  | Must provide type for initializer List(x) |
| tests | testerTest.fss |  | pass | 1 |  |  |
| tests | tparams0.fss |  | typecheck | 2 |  | class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.IntExpr (com.sun.fortress.nodes.VarType and com.sun.fortress.nodes.IntExpr are in unnamed module of loader 'app') |
| tests | tparams1.fss |  | typecheck | 1 |  | class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.IntExpr (com.sun.fortress.nodes.VarType and com.sun.fortress.nodes.IntExpr are in unnamed module of loader 'app') |
| tests | tparams2.fss |  | typecheck | 1 |  | class com.sun.fortress.nodes.TraitType cannot be cast to class com.sun.fortress.nodes.IntExpr (com.sun.fortress.nodes.TraitType and com.sun.fortress.nodes.IntExpr are in unnamed module of loader 'app') |
| tests | trailingSemicolon.fss |  | typecheck | 1 |  | Must provide type for initializer List(x) |
| tests | traitTest1.fss |  | pass | 2 |  |  |
| tests | transactionalFork.fss |  | disambiguate | 1 | `matrix` | Function matrix is not defined. |
| tests | transposition.fss |  | typecheck | 1 |  | Could not check call to operator ^ |
| tests | treeTest.fss |  | typecheck | 5 |  | No such method Tree.minimum. |
| tests | tryatomicTest.fss |  | disambiguate | 1 | `TryAtomicFailure` | TryAtomicFailure is undefined. |
| tests | tupleInfer.fss |  | disambiguate | 1 | `AnyIntegral` | AnyIntegral is undefined. |
| tests | tupleTest1.fss |  | run | 2 |  | FortressException: class fortress.CompilerBuiltin$CompilerFailureDetectedAtRunTime with string Compiler failure detected at runtime |
| tests | tupleTest2.fss |  | pass | 2 |  |  |
| tests | tupleTest3.fss |  | typecheck | 1 |  | Cannot infer type for function fib(x:ZZ32) because it has reference cycle: fib(x:ZZ32), fib(x:ZZ32) |
| tests | tupleTypeParam.fss |  | typecheck | 1 |  | Ill-formed type: Obj[\(ZZ32, ZZ32)\] |
| tests | tupleTypeParam2.fss |  | typecheck | 2 |  | Ill-formed type: A[\(ZZ32, ZZ32)\] |
| tests | typeTests.fss |  | typecheck | 1 |  | Desugaring MatrixType at /home/user/fortress/ProjectFortress/tests/typeTests.fss:58.7 to TraitType is not yet supported. |
| tests | typecaseBlockTest.fss |  | typecheck | 1 |  | The typecase clause, ZZ32, is unreachable. |
| tests | typecaseSelf.fss |  | pass | 2 |  |  |
| tests | typecaseTest.fss |  | typecheck | 2 |  | The typecase clause, ZZ32, is unreachable. |
| tests | typecaseVarTest.fss |  | typecheck | 1 |  | The typecase clause, ZZ32, is unreachable. |
| tests | unicodeTest.fss |  | codegen | 2 |  | VarDecl (??:ZZ32)=_RewriteFnApp at mutable bindings not yet handled. |
| tests | varTest.fss |  | pass | 1 |  |  |
| tests | vectorOps.fss |  | disambiguate | 1 | `\|\|_\|\|` | Operator \|\|_\|\| is not defined. |
| tests | whereTest.fss |  | disambiguate | 1 | `HasRank` | HasRank is undefined. |
| tests | whileTest.fss |  | disambiguate | 1 | `ReadableArray` | ReadableArray is undefined. |
| tests | wrapZZ.fss |  | disambiguate | 1 | `//` | Operator // is not defined. |
| tests | wrongOverload.fss |  | typecheck | 2 |  | Not in the trait table: CompilerLibrary.Array2 |
| tests | zeno.fss |  | disambiguate | 1 | `Array1` | Array1 is undefined. |

## Not verified

- The phase attribution is read off the error text and, for crashes, off the
  `compiler/phases/*Phase.execute` stack frame. The compiler was not instrumented
  to report its phase, so a message whose wording does not match the table above
  is attributed by the fallback rule (any located error past disambiguation is
  `typecheck`). Three files exercised that fallback: `typeTests.fss`,
  `typecaseBlockTest.fss`, `typecaseVarTest.fss`.
- Only the first error of each file is ranked in the primary table. A file that
  stops on one name may need several.
- `fortress link` was not run between compile and run. The harness's own
  `.test` files do run it (`library_tests/Integer.test`), so a file recorded here
  as `link` or `run` might behave differently under the harness's sequence.
- The four `link` failures were not investigated for cache staleness. The cache
  was pruned back to the library's own entries every 25 files, which is not the
  same as a fresh cache per file.
- Nothing here says whether a file that passes on the compiler path computes the
  same answer as on the interpreter. No test in the tree compares the two paths
  (`test-coverage.md` B).
- Wall times are from a single run on a busy host and are not a benchmark.

## Decisions not made

- Whether the prelude grows (route b) or the interpreter library becomes the
  prelude (route a) — `map/README.md` step 2. The cascade ranking above is
  evidence for route (a) but does not settle it.
- Which of the ranked names to add first, and in what grouping.
- Whether `comprises Self` should parse. Fourteen of the 29
  `not_working_library_tests` stop at parse; thirteen of those are a Rats!
  `Syntax Error`, and in ten of the thirteen the line the parser points at is a
  `trait ... comprises Self` declaration.
- Whether this ladder becomes a checked-in target or stays a script under
  `explorations/`.

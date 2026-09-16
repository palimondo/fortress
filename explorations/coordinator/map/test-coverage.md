<!-- Third part of the territory map, written 2026-09-16 before the historical source tree is opened for modification. The question: when we change a given layer, does the green suite catch a regression there, and how long is the loop. Counts were measured against the working tree at the branch tip and against the JUnit output of the 2026-09-16 20:35-20:45 run left in ProjectFortress/TEST-RESULTS/ (gitignored). Nothing here was taken from an old README. -->

# Test coverage: what the green suite catches

The green gate is two ant targets and nothing else: `ant testFast` (build.xml:956, 1,377 tests) and `ant testSystem` (build.xml:1197, 382 tests), each run after `ant compileAll` (build.xml:539).

Neither target declares `depends`, so neither compiles anything; a stale `build/` silently tests the previous revision.

The file holds twenty test targets in all; the other eighteen are outside the gate, and one of them, `ant testsyntax` (build.xml:1260), is red as shipped.

## A. Census

### A.1 The corpora on disk

Counts are of files at the top level of each directory in `ProjectFortress/`; "green" means the directory contributes tests to `testFast` or `testSystem`.

| directory | contents | driven by | ant target (line) | green | layer |
|---|---|---|---|---|---|
| `tests/` | 381 `.fss`, 1 `.sh` | `FileTests.InterpreterTest` (FileTests.java:698) via `SystemJUTest.suite` (SystemJUTest.java:29-42) | `testSystem` (build.xml:1197) | testSystem | parser, desugarer, interpreter evaluator, interpreter prelude, task runtime |
| `compiler_tests/` | 456 `.fss`, 35 `.fsi`, 281 `.test` | `FileTests.compilerSuite` (FileTests.java:855) via `CompilerJUTest.suite` (CompilerJUTest.java:36-43) | testFast | parser, disambiguator, type checker, desugarer, codegen, runtime |
| `parser_tests/` | 112 `.fss`, 16 `.fsi`, 40 `.test` | `ParserJUTest` (ParserJUTest.java:41-43) **and** `CompilerJUTest` (CompilerJUTest.java:37) | testFast (both) | parser; static error messages |
| `other_compiler_tests/` | 178 `.fss`, 5 `.fsi`, 39 `.test` | `FileTests.compilerSuite` via `OtherCompilerJUTest.suite` (OtherCompilerJUTest.java:31-35) | testFast | codegen, runtime, native interop |
| `library_tests/` | 26 `.fss`, 6 `.test` | `FileTests.compilerSuite` via `LibraryJUTest.suite` (LibraryJUTest.java:36-41) | testFast | compiler prelude (`CompilerBuiltin`/`CompilerLibrary`/`CompilerAlgebra`) |
| `not_passing_yet/` | 58 `.fss`, 2 `.fsi`, 1 `.sh` | `ParserJUTest` (ParserJUTest.java:35) for the parse only; `NotPassingYet` (NotPassingYet.java:27-30) for the run | testFast (parse only) | parser |
| `syntax_abstraction_tests/` | 43 `.fss`, 19 `.fsi`, 3 subdirs | `SyntaxAbstractionJUTest` runs exactly one file, `ForUse.fss` (SyntaxAbstractionJUTest.java:29-33); `SyntaxAbstractionJUTestAll` runs all 17 `*Use.fss` (SyntaxAbstractionJUTestAll.java:33-38) | `testsyntax` (build.xml:1260) for both | 1 of 17 green | syntax abstraction (interpreter path) |
| `demos/` | 62 `.fss`, 9 `.fsi` | `DemoTests` (DemoTests.java:43-50) | `testDemos` (build.xml:1286) | no | interpreter evaluator |
| `shelltests/` | 2 `.sh` | `FileTests.ShellTest` (FileTests.java:592), reachable only from `FileTests.main` (FileTests.java:757) | none | no | `bin/fortress` CLI |
| `compiler_regressions/` | 6 `.fss`, 1 `.fsi`, 3 `.test` | nothing | none | no | codegen |
| `linker_tests/` | 9 `.fss`, 2 `.fsi` | nothing; the linker's own shell is `bin/comp/tlink:39` → `LinkShell.java:21` | none | no | component aliasing / linker |
| `test_library/` | 11 `.fss`, 20 `.fsi` | not a corpus: it is the fourth entry on `fortress.source.path` (`default_repository/configuration:44`), the apis the other corpora import | — | support | — |
| `not_working_compiler_tests/` | 6 `.fss`, 3 `.test` | nothing | none | no | codegen |
| `not_working_library_tests/` | 25 `.fss`, 4 `.fsi` | nothing | none | no | compiler prelude |
| `not_working_static_tests/` | 41 `.fss`, 1 `.test` | nothing | none | no | static checker |
| `long_term_not_working/` | 17 `.fss` in 6 subdirs | nothing | none | no | inheritance, overriding, fields, closures |
| `obsolete_interpreter_tests/` | 3 `.fss` | nothing | none | no | interpreter evaluator |
| `BirdyLib/` | 31 `.fss`, 15 `.fsi` | nothing; no source file or build file names it | none | no | — |
| `c/` | 2 `.c` (`blas.c`, `sunperf_blas.c`) | `ant blas` (build.xml:684), then `testblas` (build.xml:1237) | none | no | BLAS JNI |
| `SpecData/examples/` (repo root) | 133 `.fss` in 3 subdirs | `SpecDataJUTest` (SpecDataJUTest.java:30-38) | `testSpecData` (build.xml:1135) | no | interpreter evaluator |

There is no `static_tests/` directory, although `compiler/StaticTestSuite.java` and `parser_util/instrumentation/Coverage.java:72` both still name one.

### A.2 The JUnit classes under `ProjectFortress/src`

Fifty-two classes compile to a name matching `**/*JUTest.class` or `**/*JUTests.class`; forty-seven of them run in `testFast`, five are excluded, and a further seven test-shaped classes match no green fileset at all.

| class | tests | package under test | green target |
|---|---|---|---|
| `tests/unit_tests/CompilerJUTest` | 642 | `compiler/`, `parser/`, `scala_src/`, `runtimeSystem/` | testFast track `compiler` |
| `tests/unit_tests/OtherCompilerJUTest` | 263 | `compiler/codegen`, `runtimeSystem/`, `nativeHelpers/` | testFast track `othercompiler` |
| `tests/unit_tests/LibraryJUTest` | 55 | compiler prelude | testFast track `library` |
| `tests/unit_tests/ParserJUTest` | 188 | `parser/` | testFast track `misc` |
| `useful/*` (15 classes) | 100 | `useful/` (BATree, BASet, BA2, GHashMap, TrieMap, Bits, Path, …) | testFast `misc` |
| `scala_src/*` (8 classes) | 22 | `scala_src/typechecker`, `types`, `overloading`, `useful` | testFast `misc` |
| `runtimeSystem/*` (3 classes) | 18 | `Naming`, `InstantiationMap`, `BAlongTree` | testFast `misc` |
| `syntax_abstractions/*` (3 classes) | 19 | template rewriting (7), Fortress→Java types (11), one whole program (1) | testFast `misc` |
| `parser_util/*` (2 classes) | 25 | identifier lexing, precedence map | testFast `misc` |
| `interpreter/evaluator/*` (3 classes) | 14 | overload resolution, `IntNat`, `TypeRange` | testFast `misc` |
| `tests/unit_tests/ASTJUTest` | 13 | `nodes_util` printer/unprinter primitives | testFast `misc` |
| `tests/unit_tests/ConstructorsJUTest` | 8 | `nodes_util` node factories | testFast `misc` |
| `nodes_util/*` (2 classes) | 4 | `Modifiers`, `NodeFactory` | testFast `misc` |
| `compiler/NamingCzarJUTest`, `compiler/typechecker/StaticTypeReplacerJUTest` | 3 | `compiler/` | testFast `misc` |
| `tests/unit_tests/ObjectUID_JUTest` | 1 | `nodes_util` UID map | testFast `misc` |
| `tests/unit_tests/TransactionJUTest` | 1 | `interpreter/evaluator/transactions` | testFast `misc` |
| `unit_tests/EmptyCompilerInvocationJUTest` | 1 | `Shell` entry point | testFast `misc` |
| `tests/unit_tests/SystemJUTest` | 382 | interpreter, whole stack | testSystem, 4 shards |
| **excluded** `compiler/environments/TopLevelEnvGenJUTest` | — | top-level environment code generation | none (build.xml:982, 1019, 1056, 1098) |
| **excluded** `tools/AstJUTest` | — | `tools/FortressAstToConcrete`, the unparser | none (build.xml:989, 1025, 1060, 1102) |
| **excluded** `syntax_abstractions/SyntaxAbstractionJUTestAll` | 17 run, 14 fail | syntax abstraction | `testsyntax` only (build.xml:1260, include at 1278) |
| **excluded** `tests/unit_tests/NightlyCompilerJUTest` | = CompilerJUTest | — | `testCruiseControl` (build.xml:1069) |
| **excluded** `tests/unit_tests/SpecDataJUTest` | 133 files | interpreter | `testSpecData` (build.xml:1135) |
| no matching fileset: `numerics/BlasJxTest` | — | BLAS JNI | `testblas` (build.xml:1237) only |
| no matching fileset: `numerics/DirectedRoundingTest` | — | directed-rounding IEEE support | none |
| no matching fileset: `useful/BASetDetailedTest` | — | `useful/BASet` | none |
| no matching fileset: `interpreter/evaluator/CollectTests` | — | in-language `test` collector | none (it is library code for `fortress test`) |
| no matching fileset: `fib_tests/FibTests` | — | benchmark harness | none |
| no matching fileset: `tests/unit_tests/DemoTests` | 71 files | interpreter | `testDemos` (build.xml:1286) |
| no matching fileset: `tests/unit_tests/NotPassingYet` | 59 files | interpreter | `testNotPassing` (build.xml:1110) |

The five `testFast` exclusions live at build.xml:982-989, inside the `misc` track's fileset; the same five appear again in `testUntil` (build.xml:1019-1025), `testParser` (build.xml:1056-1060) and `testCruiseControl` (build.xml:1098-1102).

`SyntaxAbstractionJUTestAll` would not have matched `**/*JUTest.class` in any case, so the exclusion at build.xml:987 is belt-and-braces; the class is red as shipped (17 run, 14 failures, FACTS.md).

### A.3 Reconciling 1,377 and 382

`testSystem` = 382 = the 381 `.fss` plus the 1 `.sh` at the top level of `tests/`, one JUnit test each (FileTests.java:806-827); the four shards of the 2026-09-16 run reported 95 + 95 + 97 + 95.

`testFast` = 1,377 = 642 + 263 + 55 + 417, the last being the sum over the 44 suites of the `misc` track.

The three big numbers come out of `FileTests.standardCompilerTests` (FileTests.java:1025), which turns one `.test` property file into one `CommandTest` per command key present (`compile`, `desugar`, `link`, `api`, `parse`, `disambiguate`, `grammar`, `typecheck`, `unparse`, `compare`, `build` — FileTests.java:1034-1037) times the number of names in `tests=`, plus one `TestTest` (a `bin/fortress run` subprocess, FileTests.java:438) when `run` is present.

Reproducing that expansion over the corpora gives exactly the observed counts:

| suite | `.test` files | names in `tests=` | CommandTests | TestTests | total |
|---|---|---|---|---|---|
| CompilerJUTest, `compiler_tests` | 281 | 432 | 510 | 92 | 602 |
| CompilerJUTest, `parser_tests` | 40 | 40 | 40 | 0 | 40 |
| OtherCompilerJUTest | 39 | 111 | 152 | 111 | 263 |
| LibraryJUTest | 6 | 20 | 35 | 20 | 55 |

The command mix is lopsided: across all four, `compile` 402, `link` 222, `typecheck` 106, `disambiguate` 4, `api` 1, `parse` 1, `build` 1, and `grammar`, `desugar`, `unparse`, `compare` **zero**.

`ParserJUTest`'s 188 = 128 files in `parser_tests` plus 60 in `not_passing_yet` (ParserJUTest.java:34-35, 67-79).

The arithmetic only closes because `default_repository/configuration:51` sets `fortress.unittests.noopt=true`; that property gates FileTests.java:997, which would otherwise add one `BytecodeOptimizeEverything` shell test plus a `runOpt` re-run of every `run` test — 226 further tests, and the only exercise the bytecode optimizer would get.

### A.4 Corpus that no target reads

Files that sit in a green directory but that no `.test` names and no sibling imports:

| directory | `.fss` present | executed or checked | dark |
|---|---|---|---|
| `compiler_tests` | 456 | 409 | 47 (`Compiled9.aa`…`Compiled9.z`, `Compiled110`…`Compiled280`, `IntegerLiteralsFolding`, …) |
| `other_compiler_tests` | 178 | 116 | 62, including all 14 `InliningTest*` and all 4 `TupleOverload*`, `VectorTest1-3`, `StaticGenericOverloading*` |
| `library_tests` | 26 | 20 | 6 (`NN32`, `NN64`, `ZZ`, `Bug`, `ChooseTest3`, `FailInference1`) |
| `compiler_regressions` | 6 | 0 | 6 (the whole directory) |

That is 121 dark programs inside directories the gate does read, plus the wholly orphaned directories in A.1 (`linker_tests` 9, `not_working_*` 72, `long_term_not_working` 17, `obsolete_interpreter_tests` 3, `BirdyLib` 31).

`parser_tests` is different: the 75 `.fss` that no `.test` names are still all parsed by `ParserJUTest`, which is what that corpus is for.

## B. Interpreter versus compiler

They are two separate corpora, hand-ported, not one corpus run twice.

`tests/` and `compiler_tests/` share **no** file name at all; `tests/` and `other_compiler_tests/` share 11 names (`Exception`, `atomic0`-`atomic5`, `nestedTransactions1`-`3`, `typecaseBlockTest`) and every one of the 11 pairs differs — `atomic0.fss` differs in the declaration form (`=` against `:=`) and in the success token the harness looks for (`SUCCESS` against `PASS`).

Compiler-only: `compiler_tests`, `other_compiler_tests`, `library_tests`, `compiler_regressions`, `linker_tests`, `not_working_compiler_tests`, `not_working_library_tests` — recognisable because they use `import java …` (30 files) rather than `builtinPrimitive` and because they link the `Compiler*` prelude.

Interpreter-only: `tests/`, `demos/`, `not_passing_yet/`, `SpecData/examples/`, `syntax_abstraction_tests/`, `obsolete_interpreter_tests/`, `long_term_not_working/`.

Shared by both: `parser_tests/` only, and only because parsing precedes the split — `ParserJUTest` parses each file, `CompilerJUTest` compiles it expecting a specific error message.

**No test compares interpreter output against compiler output for the same program.** The `compare` command exists (Shell.java:629-666) but it evaluates *both* files with the interpreter (`eval` at Shell.java:661-662) and compares the two `FValue`s, so it compares two programs on one path; and no `.test` file in the tree uses it.

How expected outputs are recorded — three mechanisms, no golden files:

1. Interpreter tests (`FileTests.SourceFileTest.testFile`, FileTests.java:295) have **no expected output**. A test passes if it throws nothing and its captured stdout/stderr contains neither `fail` nor `FAIL` and the return code is 0 (FileTests.java:367-371). A file whose name starts with `XXX` inverts that (FileTests.java:336, 922). So an interpreter test can only catch a crash or a self-reported failure; a wrong number that the program does not check is invisible.
2. Compiler `CommandTest`s (FileTests.java:659) compare against strings written into the `.test` property file: `<command>_{out,err,exception}_{contains,does_not_contain,matches,WImatches,WCIequals,equals}` (FileTests.java:140-271). `compile_err_equals` is the workhorse (222 of 281 `compiler_tests` files) and holds the expected diagnostic verbatim, with `${STATIC_TESTS_DIR}` interpolated for the path — which is why a change to any error message is a visible, localized test failure.
3. Compiler `TestTest`s (FileTests.java:438) run `bin/fortress run <name>` as a subprocess and take **the exit code as definitive** (FileTests.java:515); `run_out_*` keys add a content check, and when none is given the harness demands the output contain `pass` or `PASS` (FileTests.java:262-271). So the 222 executed programs are self-checking: they print PASS themselves.

Test order is reshuffled on every run from a seed printed at startup (`fortress.unittests.seed`, FileTests.java:1117-1127), so the suites are order-independent by construction.

## C. Blind spots

### C.1 Module against tests

"Direct" = JUnit tests whose subject is that package. "Corpus" = exercised indirectly by the `.fss` suites.

| module (`src/com/sun/fortress/`) | files | direct tests | corpus | green verdict |
|---|---|---|---|---|
| `nodes/` | 1,071 java | 0 | everything | generated; no test asserts the generator's output, only mtimes (build.xml:450) |
| `interpreter/` | 246 java | 14 (Overload 2, IntNat 6, TypeRange 6) | 382 system tests | well covered as a whole, thinly as parts |
| `interpreter/evaluator/transactions/` | — | 1 (`TransactionJUTest`) | 38 `tests/*.fss` using `atomic`/`spawn` | **thin**: see C.2 |
| `compiler/` (less the optimizer) | 154 java + 10 scala | 3 | 960 corpus tests | covered |
| `compiler/asmbytecodeoptimizer/` | 43 java | 0 | 0 | **no coverage at all** (`fortress.unittests.noopt=true`, `default_repository/configuration:51`; the 14 `InliningTest*.fss` are dark) |
| `compiler/environments/` | — | `TopLevelEnvGenJUTest`, excluded | — | **no coverage** (build.xml:982) |
| `useful/` | 131 java | 100 | all | the best-covered module in the tree |
| `parser_util/` | 89 java | 25 | all | covered |
| `parser_util/instrumentation/` | — | 0 | 0 | only `ant grammarCoverage` (build.xml:1511), which names a directory that does not exist (Coverage.java:72) |
| `parser/` | 5 java + 62 generated | 188 (ParserJUTest) | all | covered |
| `scala_src/` (the real type checker) | 59 scala | 22 | 106 `typecheck` units + every `compile` | covered at the whole-program level, 22 unit tests for 59 files |
| `syntax_abstractions/` | 30 java | 19, of which **one** is a whole program | 1 of 43 files | **thin**: see C.2 |
| `nodes_util/` | 29 java + 1 scala | 26 (AST 13, Constructors 8, Modifiers 3, NodeFactory 1, ObjectUID 1) | all | covered, except serialization: see C.2 |
| `exceptions/` | 26 java + 1 scala | 0 | every `XXX` test | covered by consequence |
| `runtimeSystem/` | 25 java | 18 | 222 executed programs | covered |
| `nativeHelpers/` | 24 java | 0 | 23 executed programs use `import java` | covered by consequence, untested directly |
| `astgen/` | 16 java | 0 | 0 | run during `compileAll`; output committed and compared by mtime |
| `repository/` | 16 java | 0 | every suite | covered by consequence; the cache round trip is not asserted (C.2) |
| `tests/` | 16 java | — | — | the harnesses themselves |
| `numerics/` | 6 java | 2 classes, neither in a green fileset | 0 | **no coverage** |
| `ant_tasks/` | 6 java | 0 | 0 | **no coverage** |
| `linker/` | 5 java | 0 | reached from `GraphRepository` on every compile | the aliasing feature itself: **no coverage**; `linker_tests/` orphaned |
| `unicode/` | 4 java | 0 | 0 | run at build time (build.xml:387) |
| `tools/` | 2 java | `AstJUTest`, excluded | 0 | **no coverage** (build.xml:989) |
| `Shell.java` (loose) | 1,288 lines | 1 (`EmptyCompilerInvocationJUTest`) | every CommandTest and every `run` subprocess | covered by consequence |

### C.2 The specific questions asked

| subject | covered by the green suite? | evidence |
|---|---|---|
| `nat` type parameters in the compiler | **No.** Five corpus files use `nat`/`int`/`bool` static parameters. Three (`Compiled1.ah`, `Compiled1.av`, `Compiled6.af`) are named only by `AfterTypeChecking.test`, which runs the `typecheck` command and stops there; the other two (`Compiled1.p`, `Compiled5.z`) are `XXX` tests asserting unrelated error messages. No `nat`-parameterized program is compiled, linked or run. | `compiler_tests/AfterTypeChecking.test`, `XXX1p.test`, `XXX5z.test` |
| grammar extensions on the compiler path | **No, and not anywhere else either.** No `.test` file in any corpus uses the `grammar` command, and the only files declaring a `grammar` are the 18 in `syntax_abstraction_tests/`, all of which run (when they run) through `StaticTestSuite.compile`, which forces `PhaseOrder.interpreterPhaseOrder` (StaticTestSuite.java:334). The one green syntax-abstraction program is `ForUse.fss`, run with type checking off (SyntaxAbstractionJUTest.java:29-33, `StaticTestCase(f, false)`). | matches the standing finding that the compile path needs a compiler-world `FortressAst`/`FortressSyntax` (FACTS.md) |
| the api/component cache round trip | **Not asserted.** `CacheBasedRepository` writes and reads `.tfi`/`.tfs` trees through `ASTIO` (CacheBasedRepository.java:74, 93, 112, 135; suffix at ProjectProperties.java:323), and the suites do exercise the write-then-read path because each track builds one cache and reuses it. But no test compares a tree against its reloaded copy: `ASTJUTest`'s 13 tests cover the `Lex`/`Printer`/`Unprinter` primitives (spans, lists, quoting, whitespace), and its whole-file round trip is commented out at ASTJUTest.java:654. This is the gap the `NodeReflection.getPrintableFields` defect sat in (FACTS.md). | |
| runtime code generation by the instantiating class loader | **Yes, indirectly and broadly.** 222 programs are compiled, linked and executed as `bin/fortress run` subprocesses; 89 of them instantiate a generic (38 in `compiler_tests`, 50 in `other_compiler_tests`, 1 in `library_tests`), which is what drives `InstantiatingClassloader`. Direct unit tests cover the naming scheme only: `NamingJUTest` 8, `InstantiationMapJUTest` 3, `BAlongTreeJUTest` 7. | |
| the fork-join task runtime | **Barely.** Since the sharding change, every `testSystem` shard runs with `FORTRESS_THREADS=1` (build.xml:1184), which `Driver.getNumThreads` (Driver.java:518-528) turns into a one-worker pool; the default outside the suite is `availableProcessors/2`. So the 38 interpreter programs that use `atomic`/`spawn` now run without real concurrency. Nothing in `testFast` runs the interpreter at all. | |
| transactions | **Effectively no.** `TransactionJUTest` is one test (TransactionJUTest.java:27-32); it builds a `FortressTaskRunnerGroup` and invokes `TestTask`, whose only live assertion is that a `ReadSet` deduplicates (TestTask.java:25-30). The multi-threaded half — eight tasks × 256 transactions against a shared read set — is commented out at TestTask.java:43-44. | |
| native helpers | **Indirectly.** No unit test targets `nativeHelpers/`; 23 of the 222 executed compiler programs reach it through `import java` (20 in `other_compiler_tests`, 2 in `library_tests`, 1 in `compiler_tests`). The BLAS side (`numerics/`, `c/blas.c`) has two test classes that match no green fileset. | |
| the numeric tower, interpreter path | **Yes, broadly.** Across `tests/`: 248 programs mention `ZZ32`, 43 `RR64`, 18 `ZZ64`, 3 `RR32`, 3 each `NN32`/`NN64`, 2 `QQ`, plus `BigNum`, `NumeralTest`, `RationalTest`, `realArith`. | |
| the numeric tower, compiler prelude | **Narrow.** `library_tests` is the dedicated suite: 6 `.test` files over 20 programs, covering booleans, comparison, `ZZ32`/`ZZ64` arithmetic, shifts, choose, average, `Maybe`/getters, patterns. Among the 222 executed compiler programs, only 6 mention `RR64` and 2 `RR32`; `NN32`/`NN64` appear only in `library_tests` files that are dark (C.1), and nothing mentions `QQ` or the literal types. | |

### C.3 The shape of it

The gate is strong where the 2012 team spent its last two years — codegen, the compiler front end, error messages — and weak everywhere the team stopped: the bytecode optimizer (zero), syntax abstraction (one file), the linker (nothing), the unparser (excluded), the parallel runtime (one worker, one assertion).

A regression in `useful/`, `parser/`, `runtimeSystem/naming`, the type checker, or any compiler diagnostic will be caught.

A regression in the bytecode optimizer, the top-level environment generator, `FortressAstToConcrete`, the `.tfi` serializer's fidelity, the transaction implementation, or anything that only shows up above one thread will not.

## D. The loop

### D.1 The three commands

| command | wall clock | what dominates |
|---|---|---|
| `ant compileAll` (build.xml:539) | ~80 s (CLAUDE.md) | one forked `scala.tools.nsc.Main` over all 1,700+ `.java` plus 60 `.scala` sources (build.xml:545-571), then a forked `javac` over the same `.java` (build.xml:570-586); it also wipes the interpreter cache, because `compileCommon` depends on `cleanCache` (build.xml:715, 356) |
| `ant testFast` (build.xml:956) | 5 min 23 s measured when the parallel form landed (`test-suite-speedup.md`); the four tracks of the 2026-09-16 run reported 456.1 s (`othercompiler`), 428.0 s (`compiler`), 356.2 s (`library`) and 45.5 s (`misc`, summed over 44 suites) on a busier host | the wall is the longest single track, not the sum; inside the big tracks it is the cold-cache library link plus 222 child JVMs |
| `ant testSystem` (build.xml:1197) | 2 min 8 s measured when the sharded form landed (`test-suite-speedup.md`); the four shards of the 2026-09-16 run reported 115.6 / 146.8 / 114.9 / 152.2 s over 95 / 95 / 97 / 95 tests | flat distribution, no subprocesses, one worker per shard |

Neither test target compiles, so the real gate is `ant compileAll && ant testFast && ant testSystem`, and the two test targets share `ProjectFortress/test-caches` and must not overlap.

### D.2 Running less than everything

| goal | invocation |
|---|---|
| one JUnit class | `ant testOnly -DtestPattern=BitsJUTest` (build.xml:777; documented at build.xml:206-209). Measured today: 1 min 26 s wall for a test that takes 0.97 s — the cost is ant's scan of `build/` with the `**/*<pattern>*/**` selector at build.xml:799, not the test |
| the three big compiler suites, serially | `ant testQuick` (build.xml:894) |
| codegen only | `ant testCodegen` (build.xml:1212) — `CompilerJUTest` alone |
| `other_compiler_tests` only | `ant testOtherCompiler` (build.xml:844) |
| compiler prelude only | `ant testLibrary` (build.xml:869) |
| one interpreter directory | `SystemJUTest` honours `-Dtests=<dir>` (SystemJUTest.java:33) |
| one shard of the interpreter suite | `-Dfortress.suite.shard=i/n` (FileTests.java:782-795) |
| first N tests only, reproducibly | `-Dfortress.unittests.count=N` (FileTests.java:1093) and `-Dfortress.unittests.seed=<hex>_16` (FileTests.java:1117); the seed of each run is printed as `FORTRESS_UNITTESTS_SEED=…` |
| see the passing tests' output too | `-Dfortress.junit.verbose=true` (CompilerJUTest.java:38) or `FORTRESS_JUNIT_VERBOSE=1` (SystemJUTest.java:34) |
| one interpreter program, with the real diagnostic | `cd ProjectFortress && ../bin/fortress tests/<Name>.fss` |
| one compiler `.test` file | `../bin/fortress junit <dir>/<Name>.test` (Shell.java:1086 → `FileTests.suiteFromListOfFiles`) |
| one compiled program by hand | the library chain then the program, in order (`repo-internals.md`) |

`ant testNotPassing` (build.xml:1110) runs the 59 expected-failing interpreter programs and **fails if they pass**; `ant testsyntax` (build.xml:1260), `ant testDemos` (build.xml:1286), `ant testSpecData` (build.xml:1135) and `ant testblas` (build.xml:1237) are the other live targets outside the gate.

### D.3 Where the speedups landed, and what is left

The whole of the speedup work is recorded in `explorations/test-suite-speedup.md`; the shape is: one up-front cache wipe instead of one per suite (`fortress.junit.reset`, CompilerJUTest.java:32, LibraryJUTest.java:32), then four parallel `testFast` tracks and four `testSystem` shards, each with a private cache tree (`fortress.caches` sysproperty plus `FORTRESS_CACHES` env, build.xml:941-943 and 1182-1184), plus `FORTRESS_THREADS=1` per shard (build.xml:1184).

Measured effect, from that document: `testFast` 11 min → 8 min 53 s → 5 min 23 s; `testSystem` wall-neutral, because the interpreter's own pool already saturated four CPUs — sharding bought isolation, not speed.

The isolation is the durable win: neither target touches `default_repository/caches` any more, so a suite run can no longer invalidate a warm developer cache or dirty the tracked `caches/global.map`.

What remains slow, and why:

- `OtherCompilerJUTest` is one indivisible track and sets the `testFast` wall; splitting it is the only remaining structural gain.
- Each track pays its own cold-cache library link, because the tracks are isolated from each other (the warm-cache handoff of the first intervention was given up for the parallel one).
- 222 child JVMs at roughly 200 ms fixed overhead each are not removable: `InstantiatingClassloader` refuses a second instance per JVM.
- `ant compileAll` still wipes the interpreter cache through `cleanCache` (build.xml:715 → 356), so a rebuild costs the next interpreter run a cold start.
- Ant's fileset scan over `build/` is a fixed ~80 s tax on `testOnly`, measured above.
- Every grammar-importing run leaves a 5.8 MB Rats! temp directory behind (`RatsUtil.getTempDir`, RatsUtil.java:138-144); `experiment/env.sh` removes them at shell start after 723 of them filled the disk allowance on 2026-09-15. Inside the suite this is contained: every forked JUnit JVM gets `-Djava.io.tmpdir=${PF}/test-tmp` and the target deletes that directory afterwards (build.xml:959, 992).

### D.4 CI

There is no CI. `explorations/ci/gate.yml` is a complete workflow (clean build, `testSystem`, `testFast`) parked outside `.github/`; `explorations/modernization-plan.md:195-196` says to activate it by moving it and bumping its JDK.

Two things would need adjusting on activation: it pins JDK 8 while the current rung is JDK 25, and its failure reporter reads `ProjectFortress/TEST-RESULTS/TEST-*.txt`, where the parallel tracks no longer write — their output is in `TEST-RESULTS/fast-*/` and `TEST-RESULTS/system-*/`.

## Not verified

The split of `ant compileAll`'s ~80 s between the scalac pass and the javac pass was not measured; `compileAll` wipes the interpreter cache, and running it would have destroyed the working tree's warm state for no gain here.

Neither `ant testFast` nor `ant testSystem` was run for this document; the per-suite counts and times are read from the JUnit output of the 2026-09-16 20:35-20:45 run left in `ProjectFortress/TEST-RESULTS/`, and the 1,377 and 382 totals were re-derived independently from the corpora and match exactly.

`ant testOnly -DtestPattern=BitsJUTest` was run once (2 tests, 0 failures, 1 min 26 s) to confirm the invocation in D.2; no other target was invoked, and `git status` was clean afterwards.

The claim that `SyntaxAbstractionJUTestAll` is red (17 run, 14 failures) is taken from `explorations/coordinator/FACTS.md`, not re-measured.

The "dark corpus" counts in A.4 treat a file as reachable if a `.test` names it or a sibling in the same directory imports it; a file imported from another directory via `fortress.source.path` would be miscounted as dark, and the classification was not checked file by file.

Whether the `misc` track's exclusion of `**/ObjectExpressionVisitorJUTest.class` (build.xml:988) ever had a class behind it was not traced through the history; no such file exists in the tree today.

Whether `ant grammarCoverage` (build.xml:1511) still runs at all was not tested; `Coverage.java:72` names a `static_tests` directory that does not exist.

## Decisions not made

Whether the bytecode optimizer should be brought into the gate — turning off `fortress.unittests.noopt` adds 226 tests and re-runs every executed program through the optimizer, which is both the largest single coverage gain available and an unknown quantity of new red.

Whether `testSystem` should keep `FORTRESS_THREADS=1` — it was set for shard isolation, and the cost is that the parallel runtime and the transaction tests no longer see concurrency; a fifth, single-shard, multi-threaded pass would restore that.

Whether the four excluded-but-existing suites (`TopLevelEnvGenJUTest`, `tools/AstJUTest`, `SyntaxAbstractionJUTestAll`, and the two `numerics` classes) should be repaired, deleted, or left excluded with the reason written down.

Whether the orphaned corpora (`linker_tests`, `compiler_regressions`, `BirdyLib`, `obsolete_interpreter_tests`, `long_term_not_working`, the three `not_working_*` directories, and the 121 dark files inside live directories) should be wired up, moved, or left as the historical record they are.

Whether an interpreter-against-compiler differential test should exist at all — today nothing compares the two paths on one program, and the two corpora have diverged by hand.

Whether `explorations/ci/gate.yml` should be activated now, and at which JDK.

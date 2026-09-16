<!-- Part one of the territory map, written 2026-09-16 by a delegated survey worker before the historical source tree is opened for modification. Audience: Pavol and the coordinator. Everything here was read out of the tree at branch claude/handover-reading-vn8zgr; nothing was inferred from the old READMEs. It extends and corrects the partial module table in explorations/repo-internals.md rather than repeating it. -->

# Modules and phases

## How to read this

`explorations/repo-internals.md:8-94` already holds a module map and `:123-129` a one-paragraph pipeline sketch; this file does not restate them, it cites them and adds what they leave out: per-language line counts, the actual import graph, which module is exercised on which path, and a phase-by-phase trace with entry points.

Every count below was taken on 2026-09-16 with `find`/`wc` over the working tree; every behavioural claim cites `file:line`.

Neither pipeline was executed for this survey; the conclusions are read out of the source, the build file and the shell scripts (see "Not verified").

---

# Part A — the modules

## A.1 Scale, and how much of it is generated

Under `ProjectFortress/src/com/sun/fortress/` there are 1,946 Java files (681,425 lines), 72 Scala files (21,723 lines) and 61 Rats! grammar files (9,064 lines).

Of the Java, 533,353 lines are machine-generated and checked in: `nodes/` 353,318, the four generated parsers 176,732 (`parser/Fortress.java` 70,477, `parser/templateparser/TemplateParser.java` 73,203, `parser/preparser/PreFortress.java` 21,006, `parser/import_collector/ImportCollector.java` 12,046), and `parser_util/precedence_resolver/Operators.java` 3,303.

That leaves about 148,072 hand-written Java lines and, after subtracting the generated `scala_src/nodes/FortressAst.scala` (2,016), about 19,707 hand-written Scala lines — the compiler and interpreter you would actually edit are roughly a seventh of what `wc` reports for the tree.

## A.2 Packages under `ProjectFortress/src/com/sun/fortress/`

Sizes are files/lines. "Path" is interpreter (I), compiler (C), both (B), build-time only (T), or neither (—); the basis for each verdict is in A.5 and Part B.

| Package | java | scala | rats | other | Path | Role |
|---|---|---|---|---|---|---|
| (root) `Shell.java` | 1/1,288 | | | | B | The CLI dispatcher: one `subMain` switch (`Shell.java:395-516`) that picks the library world, the phase order and the driver for every subcommand. |
| `ant_tasks/` | 6/243 | | | | T | Ant task wrappers (`fortress`, `fortify`, `fortex`, `foreg`, `fortick`); used by `Fortify/build.xml:26-36` and `Documentation/Specification/Root/build.xml:47-59`, not by the root `build.xml`. |
| `astgen/` | 16/3,412 | | | | T | Fortress's generators plugged into Rice's ASTGen; run by `ant makeAST` (`build.xml:473-505`) to emit `nodes/`, `FortressAst.scala` and `Library/FortressAst.fss`/`.fsi`. |
| `compiler/` | 197/35,029 | 10/1,977 | | | B | The shared front end plus the JVM back end; despite the name, every phase the interpreter runs also lives here. |
| `exceptions/` | 26/1,728 | 1/248 | | | B | The error hierarchy (`StaticError`, `ProgramError`, `CompilerBug`, `InterpreterBug`, `MacroError`) plus `exceptions/shell/` and `exceptions/transactions/`. |
| `fib_tests/` | 1/990 | | | | — | A standalone ForkJoin micro-benchmark of fib shapes with its own `main` (`fib_tests/FibTests.java:979`); nothing references it. |
| `interpreter/` | 246/35,513 | | | | I | The tree-walking evaluator, its environments, its value and type representations, its native glue, and its own task and transaction runtime. |
| `linker/` | 5/1,031 | | 1/60 (README) | B | Tristan's 2012 component-aliasing linker; called only from `GraphRepository` (`linker/README:28`), persisted in `default_repository/caches/global.map` (`linker/RepoState.java:176`). |
| `nativeHelpers/` | 24/2,377 | | | | C | 24 classes of plain static Java methods that the compiler-world library binds with `import java` (`LibraryBuiltin/CompilerBuiltin.fss:13-301`, 16 such imports). |
| `nodes/` | 1,071/353,318 | | | | B | The generated AST classes and visitors; the only intermediate representation in either pipeline. |
| `nodes_util/` | 29/11,878 | 1/26 | | 3/63 (shell) | B | Hand-written AST factories and utilities: `NodeFactory`, `ExprFactory`, `NodeUtil`, `Span`, and the cache serialiser `ASTIO`/`NodeReflection`/`Unprinter`. |
| `numerics/` | 6/6,051 | | | 1/871 (C) | I | BLAS JNI binding and directed-rounding IEEE support; reached only from `interpreter/glue/prim/Float.java` and `RR32.java`. |
| `parser/` | 5/176,992 | 61/9,064 | | 1/98 | B | Four Rats! packrat grammars and their generated parsers: the main `Fortress`, the `preparser`, the `import_collector`, and the `templateparser`. |
| `parser_util/` | 89/13,003 | | | 3/1,700 | B | Hand-written parser support the grammars call into: juxtaposition/precedence resolution (`precedence_resolver/` 13 files, 6,519 lines; `precedence_opexpr/` 53 files, 3,939 lines), layout, identifier rules, and a grammar-coverage instrumentation kit (`instrumentation/`, 8 files, 1,220 lines). |
| `repository/` | 16/3,558 | | | | B | The component graph, the caches, foreign-Java import, and `ProjectProperties` — the path and cache resolver everything routes through. |
| `runtimeSystem/` | 25/7,895 | | | | C(+I) | The runtime a compiled program links against: the instantiating class loader, the name mangling, the fork/join task pool and the transaction machinery. Two of its classes are also used by the interpreter (A.5). |
| `scala_src/` | | 59/19,419 | | | C | The Scala static type checker and its supporting analyses, plus `IndexBuilder`, which both paths call. |
| `syntax_abstractions/` | 30/5,271 | | | 2/135 | B | User-defined grammars: composing a PEG, generating and compiling a parser at run time, and expanding template bodies back into ordinary AST. |
| `tests/` | 16/2,710 | | | | T | `tests/unit_tests/`: the JUnit harnesses (`SystemJUTest`, `CompilerJUTest`, `OtherCompilerJUTest`, `FileTests`) that drive the `.fss`/`.test` corpora. |
| `tools/` | 2/3,007 | | | | B | `FortressAstToConcrete`, the AST→source unparser behind `fortress unparse`. |
| `unicode/` | 4/791 | | | | T | `OperatorStuffGenerator`, run by `ant operatorsGen` (`build.xml:387-391`) to generate `parser_util/precedence_resolver/Operators.java` from Unicode data. |
| `unit_tests/` | | 1/53 | | | T | One Scala JUnit case; note its `package` line says `com.sun.fortress.compiler`, not `unit_tests`, so it does run under `testFast`'s `**/*JUTest.class` pattern. |
| `useful/` | 131/15,340 | | | | B | The utility layer: hand-rolled persistent balanced trees (`BATree`, `BASet`, `BATreeEC`), `Path`, `Debug`, `Useful`, with their JUnit tests interleaved. |

### A.2.1 Subpackages of `compiler/`

| Subpackage | java | scala | Path | Role |
|---|---|---|---|---|
| (top level) | 23/8,099 | 2/770 | B | The phase drivers as static classes: `Parser`, `Disambiguator`, `PreDisambiguationDesugarer`, `PreTypeCheckDesugarer`, `StaticChecker`, `Desugarer`, `IntegerLiteralfolder`, `OverloadRewriter`, plus `NamingCzar`, `OverloadSet`, `WellKnownNames`, `Types`, `GlobalEnvironment`. |
| `phases/` | 14/1,134 | | B | `PhaseOrder` and one `Phase` subclass per phase; the two paths are two arrays in this file (`phases/PhaseOrder.java:125,137`). |
| `index/` | 34/2,555 | | B | `ApiIndex`/`ComponentIndex` and the per-declaration index objects every later phase queries. The most-imported subpackage inside `compiler/` (33 imports from the top level, 16 from `codegen/`). |
| `disambiguator/` | 13/2,805 | | B | The name environments (`TopLevelEnv`, `LocalVarEnv`, …) and `TypeDisambiguator`, `NonterminalDisambiguator`. |
| `desugarer/` | 9/2,321 | 7/1,140 | B | The desugaring visitors; which of them run is decided by `Shell` flags, not by the path (B.5). |
| `typechecker/` | 6/962 | | B | What remains of the Java type checker: `TypeNormalizer`, `StaticTypeReplacer`, `SelfTypeBoundsInserter`, `TypeCheckerResult`. The checker itself is gone (`StaticChecker.java:229`). |
| `codegen/` | 14/8,942 | 1/67 | C | `CodeGen` (6,750 lines), the ASM class writers, `ParallelismAnalyzer`, `FreeVariables`, `VarCodeGen`. |
| `runtimeValues/` | 30/1,428 | | C | The boxed value classes a compiled program manipulates: `FRR64`, `FZZ32`, `FJavaString`, the RTTI classes, `MutableFValue`. |
| `nativeInterface/` | 4/737 | | C | `FortressTransformer` and the ASM adapters that wrap a Java class into a Fortress-callable wrapper in `nativewrapper_cache`. |
| `environments/` | 6/1,231 | | — | `TopLevelEnvGen` and `SimpleClassLoader`: the ENVGEN phase, which is in no live phase order (A.5). |
| `asmbytecodeoptimizer/` | 43/4,565 | | — | A separate post-pass bytecode optimizer with its own `main` (`asmbytecodeoptimizer/ByteCodeOptimizer.java:146`), invoked only by `bin/BytecodeOptimize:35`. Its `Opcodes` class shadows ASM's inside that package. |
| `optimization/` | 1/250 | | — | `Unbox.java`, an unfinished sketch of an unboxed representation (`compiler/optimization/Unbox.java:18-30` lists the four cases it was meant to cover). Referenced by nothing. |

### A.2.2 Subpackages of `interpreter/`

| Subpackage | java | Path | Role |
|---|---|---|---|
| (top level) | 1/607 | I | `Driver`: builds the component graph into environments and runs `run` inside a task. |
| `evaluator/` | 27/6,960 | I | `Evaluator` and `EvaluatorBase`, the tree walk; `BuildTopLevelEnvironments`, `Init`, `CollectTests`. |
| `evaluator/values/` | 64/7,832 | I | The interpreter's value representation: `FRR64` has no counterpart here, the class is `FFloat`; `OverloadedFunction` holds run-time dispatch. |
| `evaluator/types/` | 44/4,545 | I | The interpreter's run-time type objects and their subtype tests. |
| `evaluator/tasks/` | 6/654 | I | The interpreter's own `BaseTask`/`FortressTaskRunner`/`FortressTaskRunnerGroup` on `java.util.concurrent` ForkJoin — a parallel implementation of, not shared with, `runtimeSystem/`. |
| `evaluator/transactions/` (+`manager/`, `util/`) | 21/2,252 | I | A software-transactional-memory implementation with its own contention manager, behind `atomic`/`tryatomic` (`evaluator/Evaluator.java:183,204`). |
| `evaluator/scopes/` | 7/173 | I | Small scope marker classes. |
| `env/` | 15/2,318 | I | The linker-substitute: `ComponentWrapper`, `APIWrapper`, `CUWrapper`, `ForeignComponentWrapper`, the environment cells. |
| `glue/` + `glue/prim/` + `glue/test/` | 53/7,821 | I | The native primitives: `builtinPrimitive("…")` in a `.fss` body is matched and reflectively loaded here (`glue/NativeApp.java:164,188`). |
| `rewrite/` | 7/1,960 | I | The interpreter-only rewrite that annotates every name with its lexical nesting depth before evaluation. |
| `reader/` | 1/391 | B | `Lex`, the lexer for the `.tfi`/`.tfs` cache format; it is used from `nodes_util/ASTIO.java:31` and `nodes_util/Unprinter.java:29`, so it belongs to the cache, not to the interpreter. |

### A.2.3 Subpackages of `scala_src/`

| Subpackage | scala | Role |
|---|---|---|
| `typechecker/` | 18/6,373 | `STypeChecker` and the checks around it: `TypeHierarchyChecker`, `TypeWellFormedChecker`, `OverloadingChecker`, `ExportChecker`, `Thunker`, `CoercionOracle`, `ConstraintFormula`, and `IndexBuilder` (which both paths call, e.g. `compiler/phases/DisambiguatePhase.java:22`). |
| `typechecker/impls/` | 6/3,086 | The checker's cases split by kind: `Decls`, `Functionals`, `Operators`, `Dispatch`, `Misc`, `Common`. |
| `typechecker/staticenv/` | 3/682 | `STypeEnv` and friends. |
| `types/` | 7/1,688 | `TypeAnalyzer`, `TypeSchemaAnalyzer`, the subtype lattice. |
| `useful/` | 15/3,438 | `STypesUtil`, `SExprUtil`, `Lists`, the Java↔Scala bridges; the most-imported subpackage inside `scala_src` (103 imports from `typechecker/`). |
| `overloading/` | 3/540 | `OverloadingOracle`, `OverloadingChecker` (the spec's overloading rules). |
| `disambiguator/` | 2/1,102 | `ExprDisambiguator` and `SelfParamDisambiguator`, called from `compiler/Disambiguator.java:145,185,300,362`. |
| `linker/` | 4/494 | `ApiLinker`, `CompoundApiChecker`, `ExportExpander`, `HygienicRenamer` — api-level linking done inside the checker (`compiler/StaticChecker.java:180-183`). |
| `nodes/` | 1/2,016 | Generated `FortressAst.scala`: the Scala case-class view of the same AST. |

`scala_src` has no top-level files; all 59 Scala sources are in these nine subpackages.

### A.2.4 Subpackages of `parser/`, `syntax_abstractions/`, `repository/`

| Subpackage | files | Role |
|---|---|---|
| `parser/` top level | 27 rats/6,766 + `Fortress.java` | The full Fortress grammar, one `.rats` module per syntactic area (`Expression.rats`, `Declaration.rats`, `Type.rats`, …) plus `Fortress.rats` as the root module. |
| `parser/preparser/` | 3 rats/466 + 2 java | A cut-down grammar that only finds the compilation-unit header and import statements, used to produce better syntax errors (`compiler/Parser.java:415`). |
| `parser/import_collector/` | 3 rats/727 + 1 java | An even smaller grammar that returns a compilation unit containing only the imports, so the system can discover imported grammars before parsing for real (`compiler/Parser.java:156`). |
| `parser/templateparser/` | 28 rats/1,105 + 1 java | The full grammar again, with `Gaps.rats` added, so that a template body can contain holes; every user-grammar parser is generated as an extension of this one (`syntax_abstractions/rats/RatsParserGenerator.java:32-37`). |
| `syntax_abstractions/` top level | 5 java/807 | `ParserMaker`, `GrammarComposer`, `PEG`. |
| `syntax_abstractions/phases/` | 13 java/3,333 | `GrammarRewriter` and the steps it runs, plus `Transform` (988 lines), the macro expander. |
| `syntax_abstractions/rats/` | 4 java/481 | `RatsUtil`, `RatsParserGenerator`, `FortressRatsGrammar`, `JavaC`. |
| `syntax_abstractions/environments/` | 4 java/382 | Nonterminal and gap environments. |
| `repository/` top level | 11 java/3,149 | `GraphRepository` (1,038), `ForeignJava` (812), `ProjectProperties` (444), `CacheBasedRepository` (210), `JavaDBRepository` (246, unreferenced). |
| `repository/graph/` | 5 java/409 | The api/component graph nodes and visitor. |

## A.3 The dependency table

Edges are `import com.sun.fortress.X…` statements only (comments and generated strings excluded), counted per importing file. Read "→" as "imports", "←" as "is imported by".

| Module | → imports (count) | ← imported by (count) |
|---|---|---|
| `useful` | — | nodes(1068) interpreter(159) compiler(113) parser_util(31) nodes_util(29) runtimeSystem(28) syntax_abstractions(24) scala_src(23) parser(18) repository(18) exceptions(16) tests(13) Shell(4) linker(3) unit_tests(3) nativeHelpers(2) unicode(1) |
| `nodes` | parser_util(2136) nodes_util(1068) useful(1068) | compiler(430) interpreter(180) scala_src(70) parser_util(69) nodes_util(33) syntax_abstractions(31) repository(13) parser(7) exceptions(6) Shell(5) tests(4) tools(2) linker(1) |
| `parser_util` | nodes(69) nodes_util(34) useful(31) exceptions(7) | nodes(2136) parser(13) nodes_util(6) scala_src(4) syntax_abstractions(1) compiler(1) |
| `nodes_util` | nodes(33) useful(29) exceptions(20) compiler(15) parser_util(6) repository(3) interpreter(2) runtimeSystem(2) tools(1) scala_src(1) parser(1) | nodes(1068) compiler(185) scala_src(93) interpreter(77) parser_util(34) syntax_abstractions(23) repository(12) exceptions(11) parser(7) tests(6) Shell(4) unit_tests(3) tools(3) linker(1) |
| `exceptions` | useful(16) nodes_util(11) interpreter(11) nodes(6) scala_src(5) compiler(2) | interpreter(203) compiler(95) scala_src(63) syntax_abstractions(23) nodes_util(20) parser(14) Shell(11) repository(11) parser_util(7) tests(4) unit_tests(4) tools(1) |
| `compiler` | nodes(430) nodes_util(185) useful(113) scala_src(110) exceptions(95) runtimeSystem(35) repository(23) interpreter(18) syntax_abstractions(5) parser(3) tools(1) parser_util(1) nativeHelpers(1) | scala_src(200) syntax_abstractions(27) interpreter(26) repository(23) nativeHelpers(19) nodes_util(15) runtimeSystem(13) Shell(5) tests(5) exceptions(2) unit_tests(2) tools(1) |
| `scala_src` | compiler(200) nodes_util(93) nodes(70) exceptions(63) useful(23) repository(10) parser_util(4) syntax_abstractions(1) | compiler(110) exceptions(5) repository(4) syntax_abstractions(1) nodes_util(1) |
| `interpreter` | exceptions(203) nodes(180) useful(159) nodes_util(77) compiler(26) repository(12) numerics(2) runtimeSystem(1) | compiler(18) tests(12) exceptions(11) Shell(3) nodes_util(2) |
| `repository` | compiler(23) useful(18) nodes(13) nodes_util(12) exceptions(11) scala_src(4) runtimeSystem(2) linker(1) | compiler(23) interpreter(12) scala_src(10) tests(10) syntax_abstractions(6) Shell(4) linker(3) nodes_util(3) parser(2) nativeHelpers(2) unicode(1) runtimeSystem(1) unit_tests(1) tools(1) |
| `parser` | useful(18) exceptions(14) parser_util(13) nodes(7) nodes_util(7) repository(2) | compiler(3) syntax_abstractions(1) nodes_util(1) |
| `syntax_abstractions` | nodes(31) compiler(27) useful(24) exceptions(23) nodes_util(23) repository(6) tests(1) parser(1) parser_util(1) scala_src(1) | compiler(5) scala_src(1) |
| `runtimeSystem` | useful(28) compiler(13) nativeHelpers(1) repository(1) | compiler(35) nativeHelpers(6) repository(2) linker(2) nodes_util(2) interpreter(1) |
| `nativeHelpers` | compiler(19) runtimeSystem(6) repository(2) useful(2) | runtimeSystem(1) compiler(1) |
| `linker` | repository(3) useful(3) runtimeSystem(2) nodes(1) nodes_util(1) | repository(1) |
| `tools` | nodes_util(3) nodes(2) exceptions(1) compiler(1) repository(1) | Shell(1) nodes_util(1) compiler(1) |
| `tests` | useful(13) interpreter(12) repository(10) nodes_util(6) compiler(5) nodes(4) exceptions(4) | Shell(1) syntax_abstractions(1) |
| `numerics` | — | interpreter(2) |
| `unicode` | repository(1) useful(1) | — |
| `astgen` | — (uses `edu.rice.cs.astgen`) | — |
| `ant_tasks` | — | — (used from other build files by class name) |
| `fib_tests` | — | — |
| `unit_tests` | exceptions(4) nodes_util(3) useful(3) compiler(2) repository(1) | — |
| `Shell.java` | exceptions(11) compiler(5) nodes(5) repository(4) nodes_util(4) useful(4) interpreter(3) tests(1) tools(1) | — |

Cycles worth knowing about: `compiler ↔ scala_src` (200/110), `compiler ↔ interpreter` (18/26), `compiler ↔ repository` (23/23), `nodes ↔ nodes_util`, `exceptions ↔ interpreter`.

The `compiler ↔ interpreter` cycle is not accidental: `Driver` and `WellKnownNames` need each other, and `compiler/codegen/Common.java` and `compiler/environments/*` reach into interpreter classes.

### A.3.1 Inside `scala_src`

| Subpackage | → | ← |
|---|---|---|
| `useful` | typechecker(8) nodes(5) types(5) overloading(1) | typechecker(103) types(24) overloading(17) linker(9) disambiguator(8) nodes(2) |
| `typechecker` | useful(103) nodes(22) types(18) overloading(3) linker(2) | types(9) useful(8) overloading(5) linker(2) |
| `types` | useful(24) typechecker(9) nodes(5) | typechecker(18) overloading(5) useful(5) |
| `overloading` | useful(17) typechecker(5) types(5) nodes(3) | typechecker(3) useful(1) |
| `linker` | useful(9) nodes(4) typechecker(2) | typechecker(2) |
| `disambiguator` | useful(8) nodes(2) | — |
| `nodes` | useful(2) | typechecker(22) types(5) useful(5) linker(4) overloading(3) disambiguator(2) |

Outward, `scala_src/typechecker` imports `compiler` 131 times, `nodes_util` 55, `exceptions` 49, `nodes` 48 — the Scala checker is heavily coupled to the Java index and factory layer, which is the practical obstacle to treating it as a separable component.

## A.4 Leaves and hubs

Leaves (import no other Fortress module): `useful`, `numerics`, `astgen`, `ant_tasks`, `fib_tests`.

`useful` is the only leaf that matters: 17 modules import it, 1,068 of those imports from `nodes` alone, so it is the one module that can be changed without touching anything upstream and the one whose change touches everything downstream.

Hubs by in-degree: `useful` (17 importers), `nodes_util` (14), `repository` (14), `nodes` (13), `exceptions` (12), `compiler` (12).

Hubs by out-degree: `compiler` (13 modules), `nodes_util` (11), `syntax_abstractions` (10), `Shell.java` (9), `scala_src` (8), `interpreter` (8), `repository` (8).

`compiler` is both, and it is the module a modernization step is most likely to disturb: it is on both paths, it imports 13 of the other 22 modules, and 12 import it.

`repository` is the quiet hub: nothing about it is Fortress-specific except the graph, yet every path resolution, every cache decision and every foreign-Java lookup goes through it, so a change to `ProjectProperties` is a change to both pipelines.

## A.5 Dead modules

"Dead" here means: not reachable from `Shell.java`, not named in either phase order, not invoked by any `<target>` in the root `build.xml`, and not invoked by any script in `bin/`.

| Module | Size | Why it is dead | Reachable at all? |
|---|---|---|---|
| `fib_tests/` | 1/990 | no reference anywhere | own `main` (`FibTests.java:979`) |
| `compiler/optimization/` | 1/250 | no reference anywhere | no |
| `repository/JavaDBRepository.java` | 246 | no reference anywhere; `third_party/javadb/` still ships | no |
| `compiler/environments/` | 6/1,231 | ENVGEN is commented out of `interpreterPhaseOrder` (`phases/PhaseOrder.java:132-133`) and absent from `compilerPhaseOrder`; the interpreter loads generated environments only if `fortress.test.compiled.environments` is set, default false (`interpreter/env/CUWrapper.java:41-42`); its test is excluded from `testFast` (`build.xml:982`) and from CruiseControl with the comment "TopLevelEnvGen tests are broken" (`build.xml:1097-1098`) | only `SimpleClassLoader`, which `interpreter/env/ClosureMaker.java:49` and `repository/CacheBasedRepository.java:148` still call |
| `compiler/asmbytecodeoptimizer/` | 43/4,565 | not in any phase; `fortress.unittests.noopt=true` in `default_repository/configuration:51` disables its testing | `bin/BytecodeOptimize:35` |
| `parser_util/instrumentation/` | 8/1,220 | only from the `instrumentedparser`, `optimizeParser` and `grammarCoverage` targets (`build.xml:1452-1520`), none of which any test target depends on; the file it generates, `parser/FortressInstrumented.java`, is not in the tree | those three ant targets |
| `syntax_abstractions/SyntaxAbstractionJUTestAll` | 84 | excluded from `testFast` (`build.xml:987`) and from CruiseControl (`build.xml:1100`); it is red as shipped (FACTS, template-checking section) | by hand |
| Top-level `CompilerLibrary/` | 10 `.fsi`, 3,206 lines | the directory is not on `fortress.source.path` (`default_repository/configuration:44`) and is named in no build file, no script and no source file — only in prose, at root `README.md:155`; the compiler's actual `CompilerLibrary` is `Library/CompilerLibrary.fss`, and the `fortress.CompilerLibrary.jar` on `bin/runOptCollect:32` is built from that one | no |
| `PRESYNTAX_CACHE_DIR`, `SYNTAX_CACHE_DIR` | — | declared at `repository/ProjectProperties.java:288,292` and created at `:305,310`, read or written by nothing | no |
| `fortress typecheck-old` | — | sets typechecking on with the Scala checker off (`Shell.java:463-470`), which reaches `throw new Error("The Java version of the type checker is gone now.")` (`compiler/StaticChecker.java:229`) | it runs, and fails |

Half-dead, worth flagging separately: `linker/` (1,031 lines, 2012) is called on both paths from `GraphRepository` (`GraphRepository.java:204,347,404,514`), but everything it does is in terms of jars in `bytecode_cache`, so on the interpreter path it is exercised without doing anything.

## A.6 Top-level repository directories

| Directory | Size | Role | Path |
|---|---|---|---|
| `ProjectFortress/` | 293 MB, 9,640 files (1,951 java, 72 scala, 1,511 fss, 151 fsi, 61 rats) | The whole toolchain: `src/`, `build/`, the test corpora, `LibraryBuiltin/`, `test_library/`, `third_party/`. Its own `build.xml` is an 18-line deprecation stub. | B |
| `Library/` | 1.6 MB, 53 `.fss` + 53 `.fsi` at top level (28,567 lines), 52 matched pairs, plus `Library/incomplete/` (11 `.fss`, 11 `.fsi`) | Both preludes live here side by side: `FortressLibrary.fss` (4,518 lines, interpreter) and `CompilerLibrary.fss` (592), `CompilerAlgebra.fss` (29), `CompilerSystem.fss` (22), `GeneratorLibrary.fss` (469). | B |
| `ProjectFortress/LibraryBuiltin/` | 5 `.fss` + 5 `.fsi`, 3,417 lines | The two builtin libraries and the shared root: `FortressBuiltin.fss` (701 lines, 231 `builtinPrimitive` bindings), `CompilerBuiltin.fss` (1,547, 16 `import java` lines), `AnyType.fss` (17), `NativeArray.fss` (54), `NatReflect.fss`. First entry on the source path after `.` (`default_repository/configuration:44`). | B |
| `CompilerLibrary/` | 144 KB, 10 `.fsi` | 2010 api-only stubs, not on the source path; dead (A.5). | — |
| `lib/` | 24 KB, 3 `.fss` + 2 `.fsi` | `List`, `Queue`, `Test` in Fortress; not on the source path, not referenced by the build. | — |
| `bin/` | 34 scripts | `fortress` (dispatches `run` to `bin/run`, everything else to `com.sun.fortress.Shell`, `bin/fortress:15-32`), `run` (`com.sun.fortress.runtimeSystem.MainWrapper`, `bin/run:41`), the two classpath builders, `fortify`, `BytecodeOptimize`, and SVN-era metric scripts. | B |
| `SpecData/` | 596 KB, 133 `.fss` | Examples extracted from the specification, run by `ant testSpecData` (`build.xml:1135`). | I |
| `Fortify/` | 1004 KB | Emacs-batch LaTeX renderer (`fortify.el`, `fortify.sty`) that typesets Fortress source as mathematics; its own `build.xml` uses `ant_tasks` (`Fortify/build.xml:26-36`). | T |
| `contrib/` | 96 KB | Editor modes: Atom, Emacs, GtkSourceView, Vim. | — |
| `Specification/` | 369 MB, 368 `.tex`, 23 `.rats` | The later specification draft with implementers' notes; built by `ant specification`, which delegates to `Specification/fortress/build.xml` (`build.xml:768-771`). | — |
| `Specification-1.0-frozen/` | 3.5 MB, 172 `.tex`, 23 `.rats` | The frozen 1.0 specification. | — |
| `Documentation/` | 1.2 MB, 10 `.fss`, 5 `.tex` | `Documentation/Specification/Root/`, a second spec build that also uses `ant_tasks`. | — |
| `Papers/` | 3.4 MB, 7 `.tex` | Five paper directories: `Dispatch`, `Implementation`, `RuntimeInstantiation`, `Types`, `Welterweight`. | — |
| `default_repository/` | 13 MB | `configuration` (the source path and cache locations) and `caches/` (gitignored except the tracked `global.map`, which is the linker's `RepoState` file, `linker/RepoState.java:176`). | B |
| `explorations/` | 125 MB, 4,275 files | Revival-era work (ours). | — |
| `research/` | 1.1 MB | The Steele corpus index and extracts; `research/decks/` gitignored. | — |
| `experiment/` | 400 KB | Revival-era run briefs and `env.sh`. | — |
| `BasicCoreFortress/` | 80 KB, 3 scala | A core-calculus experiment with its own parser (`CFParser.scala`). | — |
| `Sandbox/`, `CommunityMetrics/`, `NeedBetterErrorMessages/`, `DOT_idea/`, `ECLIPSE/`, `PFC_DOT_iml` | small | Sun-era scratch, SVN metrics, a one-file TODO bucket, IDE configuration. | — |
| `latex-common/`, `ant`, `antrc_suggested`, `junit-results/` | small | LaTeX macros, an ant launcher script, a suggested antrc, an empty results directory. | T |
| `dyn4000-42.log`, `testFile.txt` | small | Untracked run residue in the working tree, not part of the repository. | — |

---

# Part B — the two pipelines

## B.0 Entry points

`bin/fortress` splits on its first argument: `run` goes to `bin/run` and never touches the Java front end, everything else goes to `com.sun.fortress.Shell` (`bin/fortress:15-32`).

`bin/run` launches `com.sun.fortress.runtimeSystem.MainWrapper` with a classpath that puts `bytecode_cache`, `bytecode_cache/*` and `nativewrapper_cache` ahead of the tool classpath (`bin/run:41`, `bin/run_classpath:24-26`).

That is the first structural fact about the compiler path: `fortress compile` and `fortress run` are two different JVMs with two different classpaths, and nothing in `Shell.java` knows about `run`.

`Shell.subMain` is a single `if`-chain over the subcommand (`Shell.java:395-516`); each arm sets three things before dispatching — the library world (`useCompilerLibraries` at `:371-377` or `useInterpreterLibraries` at `:379-386`), the Scala-checker flag, and the phase order.

| Subcommand | library world | typecheck | phase order | driver |
|---|---|---|---|---|
| `<file>.fss`, `walk` | interpreter | off (`setScala(false)`) | `interpreterPhaseOrder` | `Shell.walk` → `Shell.eval` (`:607-623`) |
| `test` | interpreter | off | `interpreterPhaseOrder` | `Shell.walkTests` (`:1191`) |
| `compile` | compiler | on | `compilerPhaseOrder` | `Shell.compilerPhases` (`:843`) |
| `link`, `build` | compiler | on | `compilerPhaseOrder` | `Shell.link` (`:1044`) |
| `typecheck`, `test-coercion` | compiler | on | `typecheckPhaseOrder` | `Shell.compilerPhases` |
| `desugar` | compiler | on | `desugarPhaseOrder` | `Shell.compilerPhases` |
| `disambiguate`, `grammar` | compiler | off | `disambiguatePhaseOrder` / `grammarPhaseOrder` | `Shell.compilerPhases` |
| `parse`, `unparse`, `api`, `compare` | compiler | off | none | direct calls |
| `junit` | — | — | — | `tests/unit_tests/FileTests` (`:1086`) |
| `typecheck-old` | interpreter | on, Scala off | `typecheckPhaseOrder` | fails at `StaticChecker.java:229` |

The interpreter's type checking is off not because `walk` omits the TYPECHECK phase — it is in `interpreterPhaseOrder` (`phases/PhaseOrder.java:130`) — but because `fortress.compile.typecheck` defaults to false (`Shell.java:1275`) and `StaticChecker.checkCompilationUnit` returns the tree untouched when the flag is off (`compiler/StaticChecker.java:166,288-290`).

## B.1 The phase list

Both paths build a chain of `Phase` objects from an array of enum values (`phases/PhaseOrder.java:153-179`); the arrays are the whole difference.

| # | Phase | interpreter | compiler | Module and entry | Input → output |
|---|---|---|---|---|---|
| 1 | PREDISAMBIGUATEDESUGAR | yes | yes | `compiler/PreDisambiguationDesugarer.java:71,93` → `desugarer/PreDisambiguationDesugaringVisitor` | parsed AST → AST with explicit `extends Object`, conditional operators thunked, reductions made explicit (`PreDisambiguationDesugaringVisitor.java:39-52`) |
| 2 | DISAMBIGUATE | yes | yes | `compiler/Disambiguator.java:121,257` → `TypeDisambiguator`, `scala_src/disambiguator/ExprDisambiguator` | AST → AST with every name fully qualified and every `VarRef` that names a function turned into an `FnRef` carrying its candidate set (`ExprDisambiguator.scala:437-439`) |
| 3 | GRAMMAR | yes | yes | `phases/GrammarPhase.java:40` → `syntax_abstractions/phases/GrammarRewriter.java:54` | **apis only**: grammar declarations rewritten and their templates parsed (B.3) |
| 4 | PRETYPECHECKDESUGAR | yes | yes | `compiler/PreTypeCheckDesugarer.java:106` → `desugarer/PreTypeCheckDesugaringVisitor` | AST → AST with compound/tuple assignment, subscripting, comprehensions, big operators, generalized `if`/`while` turned into `__generate`/`__cond`/`__bigOperator` calls (`PreTypeCheckDesugaringVisitor.java:39-41,142-165,245,301,333-335`) |
| 5 | INTEGERLITERALFOLDING | no | yes | `phases/IntegerLiteralFoldingPhase.java:35` → `compiler/IntegerLiteralfolder` | AST → AST with integer-literal expressions folded to atoms |
| 6 | TYPECHECK | present, inert | yes | `phases/TypeCheckPhase.java:32` → `compiler/StaticChecker.java:163` → `scala_src/typechecker/STypeChecker` | AST → same AST with a static type on every expression; no new representation |
| 7 | DESUGAR | yes (partly) | yes | `compiler/Desugarer.java:114` | AST → AST with coercions, getters/setters, and (compiler only) case expressions and type ascriptions rewritten (B.5) |
| 8 | OVERLOADREWRITE | no | yes | `phases/OverloadRewritingPhase.java:32` → `compiler/OverloadRewriter.java:66` with `forInterpreter=false` | AST → AST where each multi-candidate reference names one synthetic overload and a `_RewriteFnOverloadDecl` is appended (`OverloadRewriter.java:74-83`) |
| 8' | OVERLOADREWRITE_FOR_INTERPRETER | yes | no | same class, `forInterpreter=true` (`OverloadRewritingForInterpreterPhase.java:33`) | the same rewrite, but reading the disambiguator's candidate list instead of the checker's (`OverloadRewriteVisitor.java:107,159`) |
| 9 | ENVGEN | commented out | absent | `phases/EnvGenerationPhase.java` | — |
| 10 | CODEGEN | no | yes | `phases/CodeGenerationPhase.java:195` → `compiler/codegen/CodeGen.java:385` | AST → one jar per component in `bytecode_cache` |

The AST (`nodes/`) is the only representation from parse to bytecode; there is no lower IR and no optimizing middle.

Parsing is not in this list: it happens in the repository, before the chain is built (B.2), and the phase chain is invoked once per api group and once per component from `GraphRepository` (`repository/GraphRepository.java:735,805`, both calling `Shell.analyze` at `Shell.java:1258-1266`).

## B.2 Rats! parsing

There are four grammars, and the build generates four parsers from them with the Rats! generator inside `third_party/xtc/xtc.jar`.

`build.xml` invokes `xtc.parser.Rats` as a forked Java process, once per grammar, through the `buildparser` macro (`build.xml:1400-1424`); the targets are `fortressparser`, `preparser`, `importcollector`, `templateparser` (`build.xml:1427-1450`), all four driven by `parser` (`build.xml:1480-1487`), which `compileAll` depends on.

The generated `.java` files are checked in, and the up-to-date test is mtime-based over the `.rats` sources (`build.xml:1331-1351`), so a fresh checkout looks current — the same trap as the AST nodes.

The macro rewrites the generation date out of the generated header afterwards so regeneration is byte-identical (`build.xml:1416-1423`); that normalization is revival-era.

At run time the four parsers are used as follows.

`ImportCollector` runs first on every component, returning a compilation unit that contains only the imports, so the system can see which grammars a component imports before it can parse it (`compiler/Parser.java:156-176`, called from `macroParse` at `:114`).

`PreFortress` runs on every file whose parse is about to be attempted, purely to produce readable syntax errors: its errors are collected from a log file and reported instead of the packrat parser's (`compiler/Parser.java:415-428`, used at `:323-327`).

`Fortress` is the real parser; after it succeeds, `parser_util/SyntaxChecker` walks the tree for the rules the grammar cannot express (`compiler/Parser.java:346-366`).

`TemplateParser` is never used directly; it is the base that every generated user-grammar parser extends (B.3).

The grammars call into `parser_util/` for everything context-sensitive: juxtaposition and operator precedence are resolved by `precedence_resolver/` from the table in `Operators.java`, which `ant operatorsGen` generates from Unicode data (`build.xml:387-391`).

## B.3 Grammar extension expansion

A user grammar is compiled in two places, at two different times, and the distinction matters.

First, when the **api** that declares the grammar is analysed, the GRAMMAR phase runs `GrammarRewriter.rewriteApis` (`phases/GrammarPhase.java:40`), which does six rewrites on the grammar declarations (item disambiguation, whitespace elimination, escape rewriting, extension desugaring, transformer naming; `GrammarRewriter.java:72-107`) and then parses the templates (`:116-125`).

Parsing a template means: generate a parser for *this grammar* (`TemplateParser.java:97` → `ParserMaker.parserForGrammar`, `ParserMaker.java:79`), then run the template body text through it at the nonterminal the rule declares, by reflection on the Rats! method name (`TemplateParser.java:101-125,160-166`).

The result is an ordinary AST fragment containing `TemplateGap` nodes where the rule's variables appear; that fragment replaces the unparsed transformer text (`TemplateParser.java:50-58`). This is the moment a template body stops being a string.

Second, when a **component** that imports such a grammar is read, `Parser.macroParse` notices the imported grammars (`compiler/Parser.java:111-135`, `getImportedGrammars` at `:212`), composes them into a PEG and generates a parser for the component (`parseWithGrammars`, `:259-275`).

That generation is a full Rats! run plus a `javac` run, at program-compile time, in a fresh temporary directory: `RatsParserGenerator.generateParser` clones the base and template grammars into `/tmp/fortress…rats` (`RatsUtil.getTempDir`, `RatsUtil.java:138-146`), calls `xtc.parser.Rats.main` (`RatsParserGenerator.java:53`), compiles the emitted parser with `com.sun.tools.javac.Main.compile` (`rats/JavaC.java:39`), and loads it with a one-off class loader (`RatsParserGenerator.java:61-66`).

The temporary directory is never deleted; that is the disk-filling behaviour already on record in FACTS ("The container").

The component is then parsed with that generated parser, and the resulting tree — which contains `_SyntaxTransformation` nodes where user syntax was used — is expanded by `Transform.transform` (`compiler/Parser.java:281`, `syntax_abstractions/phases/Transform.java:61`).

`Transform` is the macro expander: for each `_SyntaxTransformation` it looks up the named transformer from the api (`Transform.java:72-83`), evaluates its argument nodes, and runs the transformer's template through `TransformerEvaluator` (`:613-679,706`); a `TemplateGap` is replaced by the bound value (`:541-555`); hygiene renames binders written literally in a template (`:110-117`).

Where this sits in the pipeline: expansion happens **before** any phase runs on the component, because `GraphRepository.refreshGraph` calls `syntaxExpand(node)` and passes its result into `parseComponent` (`GraphRepository.java:511`), and `parseComponent` is what calls `Shell.analyze` (`:805`). So the GRAMMAR phase position in the phase array applies to apis only; a program's user syntax is already gone by phase 1.

This machinery is on both paths: `syntaxExpand` is in the shared repository, GRAMMAR is in `compilerPhaseOrder` (`phases/PhaseOrder.java:140`), and the only thing that stops a grammar-importing program from compiling is the prelude collision recorded in FACTS ("A user grammar on the compile path").

`Shell.withMacro()` (`Shell.java:244`, property `fortress.compile.macro`, default true at `:1274`) is the switch that bypasses the whole mechanism.

## B.4 Disambiguation

`Disambiguator.disambiguateApis`/`disambiguateComponents` (`compiler/Disambiguator.java:121,257`) run, in order, `SelfParamDisambiguator`, `TypeDisambiguator`, `NonterminalDisambiguator` (apis only) and `ExprDisambiguator` (`:90,145,153,185,300,308,362`).

`ExprDisambiguator` is Scala (`scala_src/disambiguator/ExprDisambiguator.scala`, 1,102 lines with its sibling) and it is where a bare name becomes either a `VarRef` or an `FnRef` carrying every function of that name in scope (`:432-440`).

What it writes into the `FnRef` matters for both paths: the *interpreter* candidate list is the full set of matching names, the *new* list is the unambiguous names; the type checker later narrows the second, and the interpreter uses the first (`OverloadRewriteVisitor.java:107`).

Output is the same AST with names bound; nothing downstream re-resolves names, and the `.tfi`/`.tfs` cache is written after this and later phases, which is why a cache from one library world poisons the other.

## B.5 Desugaring

There are three desugaring phases and they are split by what has to be known, not by which path is running.

PREDISAMBIGUATEDESUGAR must precede name binding because it introduces calls to names (`PreDisambiguationDesugaringVisitor.java:39-52`).

PRETYPECHECKDESUGAR produces code that must itself be type-checked: comprehensions and big operators become `__generate`/`__bigOperator`/`__bigOperator2` calls against the library's reduction objects, generator lists become `exp.loop(fn x => body, gs)` chains, and generalized `if`/`while` become `__cond`/`__whileCond` (`PreTypeCheckDesugaringVisitor.java:142-165,245,301,333-335`).

DESUGAR runs after type checking because getter/setter and coercion rewriting need types (`compiler/Desugarer.java:36-45`).

Which visitors run is controlled by `Shell` flags, and this is where the two paths quietly differ: `useInterpreterLibraries` sets `compiled_expr_desugaring` false (`Shell.java:379-386`), so on `walk` the case-expression desugarer (`Desugarer.java:124-127`), the type-ascription desugarer (`:140-144`), the typecase desugarer and the abstract-marking pass (`PreTypeCheckDesugarer.java:117-126`) are all skipped, while coercion and getter/setter desugaring run on both (defaults at `Shell.java:1277,1283`).

`Desugarer.desugarApi` is a no-op — it returns the api unchanged (`compiler/Desugarer.java:82-85`).

After the phase chain, the interpreter runs one more rewrite of its own that the compiler has no counterpart for: `RewriteInPresenceOfTypeInfoVisitor` then `DesugarerVisitor`, which annotate every variable, function and operator reference with its lexical nesting depth (`interpreter/env/ComponentWrapper.java:109-111`, `interpreter/rewrite/DesugarerVisitor.java:30,61-85`). The result is cached in `interpreter_cache` (`ComponentWrapper.java:96,112-114`).

## B.6 Type checking

`TypeCheckPhase` builds indexes for the apis and components, checks the apis, then the components (`phases/TypeCheckPhase.java:32-58`); the work is in `StaticChecker.checkCompilationUnit` (`compiler/StaticChecker.java:163`).

For an api: compound-api check, api linking, type-hierarchy acyclicity, well-formedness (`:174-220`).

For a component: `ApiTypeExtractor`, `TypeNormalizer`, a `TraitTable` and a `TypeAnalyzer`, then `Thunker` to give elided return types thunks, then `STypeChecker.typeCheck` (`:196-247`), then well-formedness again, overloading rules, export checking and the variance checker (`:268-290`).

The checker writes a type onto each expression node and produces no new representation, which is why the same `nodes/` tree continues into DESUGAR.

The variance checker is skipped when `compiled_expr_desugaring` is off, with the comment "Hack: don't run the variance checker if running the interpreter" (`StaticChecker.java:289-290`) — one of the few places in the checker that names the interpreter at all.

`Shell.getScala()` selects between the Scala checker and a Java one that no longer exists (`StaticChecker.java:228-230`); `setScala(false)` is set by `walk` (`Shell.java:422`), `typecheck-old` (`:467`), `test` (`:475`), the bare-filename arm (`:481`) and the `-typecheck-java` flag (`:865`).

## B.7 Overloading

Resolution is split between a shared rewrite and two completely different dispatch mechanisms.

The shared part: `OverloadRewriter` replaces a reference that has several candidates with a reference to a single synthetic name spelled `f{f1,f2,…}` and appends a `_RewriteFnOverloadDecl` declaring it (`compiler/OverloadRewriter.java:74-92`, `OverloadRewriteVisitor.java:110-142`).

On the interpreter path, `BuildTopLevelEnvironments.for_RewriteFnOverloadDecl` (`interpreter/evaluator/BuildTopLevelEnvironments.java:128`) turns that declaration into an `OverloadedFunction`, and the actual selection happens per call, on run-time values, in `OverloadedFunction.bestMatch` (`interpreter/evaluator/values/OverloadedFunction.java:787`); failure is the familiar "Failed to find any matching overload" (`:795`).

On the compiler path, `CodeGen.for_RewriteFnOverloadDecl` (`compiler/codegen/CodeGen.java:6409`) hands the declaration to `OverloadSet`, which emits one dispatch method per overloaded name, testing argument types from most to least specific (`compiler/OverloadSet.java:1944,1964`).

So the same phase feeds a run-time search in one world and a generated decision tree in the other, and the candidate lists they start from are different (`OverloadRewriteVisitor.java:107`): the interpreter's comes from the disambiguator, the compiler's from the type checker.

## B.8 The interpreter tail

`Shell.eval` asks the repository for a *linked* component (`Shell.java:620`, `GraphRepository.getLinkedComponent:883`), which is what pulls the library components — not just their apis — into the graph (`GraphRepository.java:891-902`).

`Driver.evalComponent` (`interpreter/Driver.java:78`) then does the linking by hand: it builds a `ComponentWrapper` per component, installs the primitives into `AnyType`'s environment, forces `FortressLibrary` and `FortressBuiltin` to be present (`:140-162`), closes over the import graph, then runs `preloadTopLevel`, a fixed-point pass over trait information, and environment population.

`Driver.runProgram` creates the ForkJoin pool (`FortressTaskRunnerGroup`, sized by `FORTRESS_THREADS`, `:521-532,556`), registers the program arguments, and invokes an `EvaluatorTask` (`:554-570`), which calls back into `Driver.runProgramTask` (`interpreter/evaluator/tasks/EvaluatorTask.java:46`) to look up the `run` closure and invoke it (`Driver.java:501-513`).

From there it is `interpreter/evaluator/Evaluator`, a `NodeAbstractVisitor` over the rewritten AST, with values from `evaluator/values/` and types from `evaluator/types/`.

Implicit parallelism and transactions are the interpreter's own: tuple elements and operator operands become `TupleTask`s (`Evaluator.java:267`), and `atomic`/`tryatomic` enter the STM in `evaluator/transactions/` (`Evaluator.java:183,204,210`).

## B.9 The compiler tail

`CodeGenerationPhase` runs, per component, a `FreeVariables` pass, a `FreeVarTypes` pass and a `ParallelismAnalyzer`, then `CodeGen` (`phases/CodeGenerationPhase.java:183-196`).

`CodeGen`'s constructor opens the output jar immediately — `NamingCzar.cache + <dotted component name> + ".jar"` in `bytecode_cache` (`codegen/CodeGen.java:391-393`, `compiler/NamingCzar.java:132`) — which is why a failed compile leaves a truncated jar behind.

Classes are written with ASM `COMPUTE_FRAMES` through `CodeGenClassWriter`/`ManglingClassWriter` (`CodeGen.java:406`); generic declarations are emitted once as templates, to be stamped out at load time (B.11).

For apis that were synthesized from `import java`, the same phase asks `ForeignJava` to generate wrappers (`CodeGenerationPhase.java:94`, `repository/ForeignJava.java:757,807` → `compiler/nativeInterface/FortressTransformer.java:37`), which writes them into `nativewrapper_cache` (`FortressTransformer.java:33`).

There is no link step that produces a single artifact: `fortress compile` leaves jars, and `fortress run` finds them by classpath.

`fortress link` and `fortress build` differ from `compile` only in passing `doLink=true` (`Shell.java:1063`), which makes the repository add the library *components* to the graph (`GraphRepository.java:883-902`) — that is, in principle, the single command that compiles the world in the right order, as opposed to the hand-ordered recipe in `repo-internals.md:170-180`.

## B.10 The repository, the cache, and `.tfi`/`.tfs`

`GraphRepository` is the compilation manager for both paths: it builds a graph of api and component nodes over the source path, decides what is stale, and drives parsing and analysis in dependency order (`repository/GraphRepository.java:479-524`).

Apis are parsed all at once (`:713-745`); components must be done one at a time and in order, because syntax expansion may need other components to have been parsed already (`:503-512`).

The default library is seeded as graph roots from `WellKnownNames.defaultLibrary()` (`GraphRepository.java:125-128,133-165`), which is the single switch between the two worlds: `useFortressLibraries` makes it `FortressLibrary`, `FortressBuiltin`, `AnyType`; `useCompilerLibraries` makes it `CompilerLibrary`, `CompilerBuiltin`, `AnyType` (`compiler/WellKnownNames.java:113-137`).

Analysis results are serialized as text: `ASTIO.writeJavaAst` writes a parenthesized dump of the node tree (`nodes_util/ASTIO.java:92-120`) and `FortressNodeReader`/`Unprinter`/`interpreter/reader/Lex` read it back (`ASTIO.java:142-160`).

The file name is the api name plus a hex hash — and the hash is of the **source directory path**, not of the content (`compiler/NamingCzar.java:244-254`): `AnyType-6d4f5273.tfi`. Two files of the same api name on different path entries therefore get different cache files, and moving the tree invalidates everything.

`.tfi` is an api tree, `.tfs` a component tree (`repository/ProjectProperties.java:319,323`).

The cache directories and who writes them: `analyzed_cache` (shared front-end results, `Shell.java:74-75`), `interpreter_parsed_cache` (the interpreter's own analysis cache, `Shell.java:76-77,619`), `interpreter_cache` (the lexically-annotated component, `interpreter/env/ComponentWrapper.java:96`), `environment_cache` (ENVGEN, dead), `bytecode_cache` (jars, `NamingCzar.java:132`), `nativewrapper_cache` (`NamingCzar.java:134`), `optimizedbytecode_cache` (the standalone optimizer), `presyntax_cache` and `syntax_cache` (declared, never used).

Staleness is decided by file dates alone (`GraphRepository.java:359-398,526-661`), which is why an edit that does not change a date, or a cache written under a different library world, silently wins.

## B.11 The runtime

`MainWrapper.main` loads the named class through `InstantiatingClassloader.ONLY` and invokes its no-argument `main` (`runtimeSystem/MainWrapper.java:19,60-67`); program arguments are stashed in a static field rather than passed (`:65`).

`InstantiatingClassloader.loadClass` (`runtimeSystem/InstantiatingClassloader.java:178`) is where compiled Fortress stops being ordinary bytecode: a class name is examined for markers, and depending on what it finds the loader *generates* the class rather than reading it.

It generates: tuple and arrow RTTI classes, closure classes, arrow interfaces and their abstract and wrapped forms, tuple types, union types, and — the general case — an instantiation of a generic template, by reading the template's bytes and rewriting them with ASM through `Instantiater` and an `InstantiationMap` (`:210-290,376-406`, `runtimeSystem/Instantiater.java:17-54`).

Instantiation renames; it does not change representation. `Instantiater.visit` substitutes type names in the class name, superclass and interfaces (`Instantiater.java:40-54`).

The names it matches on are the oxford-bracket and mangled forms defined in `runtimeSystem/Naming.java` (1,203 lines).

Tasks: a compiled program's entry class extends `FortressExecutable`, whose static initializer creates one `FortressTaskRunnerGroup` sized by `FORTRESS_THREADS`, with a spawn threshold and loop chunk read from the environment (`runtimeSystem/FortressExecutable.java:22-56`).

Transactions: `BaseTask` carries a transaction and exposes `startTransaction`/`endTransaction`/`inATransaction` as static methods the generated code calls (`runtimeSystem/BaseTask.java:180-260`); `inATransaction` builds its debug string eagerly on every call (`:246-249`), the one-line defect already on record in FACTS.

This whole subsystem is duplicated, not shared: `interpreter/evaluator/tasks/` and `interpreter/evaluator/transactions/` are a second, independent implementation of the same two ideas.

Two `runtimeSystem` classes are used by the interpreter as well: `ByteCodeWriter` and (indirectly) `SimpleClassLoader`, both from `interpreter/env/ClosureMaker.java:47-50`.

## B.12 Native code and Java interop

The two worlds bind native code by two mechanisms that share nothing but the word "native".

Interpreter: a function whose body is literally `builtinPrimitive("some.java.Class")` is pattern-matched in `NativeApp.checkAndLoadNative` (`interpreter/glue/NativeApp.java:164-215`), and that class — a subclass of `NativeFn0..3`/`NativeMeth0..3` in `interpreter/glue/` — is loaded reflectively and takes the evaluator's boxed `FValue`s directly.

There are 231 such bindings in `LibraryBuiltin/FortressBuiltin.fss`, 108 in `Library/FortressLibrary.fss` and 7 in `LibraryBuiltin/NativeArray.fss`.

Compiler: a `.fss` writes `import java com.sun.fortress.nativeHelpers.{class.method => name, …}` (16 such lines in `LibraryBuiltin/CompilerBuiltin.fss`, 3 in `Library/CompilerLibrary.fss`); `ForeignJava` reads the Java class with ASM to synthesize an api for it (`repository/ForeignJava.java:132-136,565-575`), and `FortressTransformer` rewrites the class into a wrapper whose methods take and return the compiled world's boxed values (`compiler/nativeInterface/FortressTransformer.java:37`, wrapper written to `nativewrapper_cache` at `:33`).

`import java` also works on the interpreter path, by a third route that is easy to miss: `ForeignComponentWrapper` populates an environment from `ForeignJava`'s synthesized declarations (`interpreter/env/ForeignComponentWrapper.java:59`), and `ClosureMaker` generates, at run time, a `NativeFn<n>` subclass that calls the Java method and writes it into `bytecode_cache` (`interpreter/env/ClosureMaker.java:44-50,52`).

No test under `ProjectFortress/tests/` uses `import java` (0 files), while 2 under `compiler_tests/` do, so the interpreter's foreign-Java route is present but not exercised by the gated suite.

There is no way for a Fortress program to be called *from* Java other than by loading the generated classes through `InstantiatingClassloader`, which is what `MainWrapper` does.

## B.13 Where each library enters

Interpreter: `default_library` is `AnyType`, `FortressLibrary`, `FortressBuiltin` (`compiler/WellKnownNames.java:48-49,128-137`); the sources are found on `fortress.source.path`, which is `.` then `ProjectFortress/LibraryBuiltin` then `Library` then `ProjectFortress/test_library` (`default_repository/configuration:44`); they enter as graph roots (`GraphRepository.java:125-165`) and are analysed through the same phase chain as the user program, then linked by `Driver.evalComponent` (`interpreter/Driver.java:140-162`).

Compiler: the same source path and the same roots, but `useCompilerLibraries` repoints the names to `CompilerLibrary`, `CompilerBuiltin`, `AnyType` (`WellKnownNames.java:113-126`), and `Types.useCompilerLibraries` repoints the checker's well-known types (`Shell.java:376`).

At `fortress run` time the library is not sources at all but jars: `bytecode_cache/fortress.CompilerBuiltin.jar` and friends, found through `bin/run_classpath:26`; if they are absent the class loader falls back to the frozen stubs compiled from `ProjectFortress/src/fortress/*.java` into `ProjectFortress/build/fortress/`, which is the misleading-`NoSuchMethodError` trap already on record (`repo-internals.md:165-182`).

`LibraryBuiltin` is shared by both worlds in the sense that the directory holds both builtins and `AnyType.fss`, which both use.

## B.14 Where the paths diverge, in one table

| Concern | Interpreter | Compiler |
|---|---|---|
| Entry | `Shell.walk` → `Shell.eval` → `Driver` | `Shell.compilerPhases` → `GraphRepository` → `CodeGen`; then a second JVM, `MainWrapper` |
| Phases 1-4 | identical | identical |
| Integer-literal folding | absent | present (`PhaseOrder.java:141`) |
| Type checking | phase present, flag off (`Shell.java:1275`) | on (`Shell.java:405`) |
| Desugaring | coercion + getter/setter only | also case, typecase, type ascription, abstract marking |
| Overload rewrite | candidates from the disambiguator | candidates from the checker |
| Extra phase before execution | lexical-depth rewrite (`interpreter/rewrite/`) | codegen (`compiler/codegen/`) |
| Linking | by hand in `Driver.evalComponent` | classpath, plus `linker/` aliases |
| Values | `interpreter/evaluator/values/` (`FFloat`, `FInt`, …) | `compiler/runtimeValues/` (`FRR64`, `FZZ32`, …) |
| Generics | run-time type objects in `evaluator/types/` | bytecode stamped out at class load by `InstantiatingClassloader` |
| Tasks | `interpreter/evaluator/tasks/` | `runtimeSystem/` |
| Transactions | `interpreter/evaluator/transactions/` | `runtimeSystem/Transaction.java` |
| Natives | `builtinPrimitive` + `interpreter/glue/` | `import java` + `nativeHelpers/` + `nativeInterface/` |
| Prelude | `FortressLibrary` (4,518 lines) + `FortressBuiltin` (701) | `CompilerLibrary` (592) + `CompilerBuiltin` (1,547) |

Modules on neither path at all: `fib_tests`, `compiler/optimization`, `compiler/environments`, `compiler/asmbytecodeoptimizer`, `parser_util/instrumentation`, `repository/JavaDBRepository` (A.5).

---

## Not verified

Neither pipeline was executed for this survey; the phase order, the divergences and the cache behaviour are read from `PhaseOrder.java`, `Shell.java`, `GraphRepository.java` and the scripts, not observed. An attempt to run `fortress -debug fortress 1` on a one-line component from a fresh directory was abandoned when it exceeded the time budget with an empty `interpreter_parsed_cache`, and the disk allowance (2.1 GB free) did not justify a second attempt.

That `fortress build` compiles the library components in the right order, which `GraphRepository.getLinkedComponent:883-902` implies, is not verified by running it; the hand-ordered recipe in `repo-internals.md:170-180` is the only route on record that is known to work.

The claim that `compiler/environments/` is dead rests on `fortress.test.compiled.environments` defaulting to false and on the two test exclusions; whether any other property file in the tree sets it true was not checked exhaustively.

The interpreter's `import java` route (`ClosureMaker`) was read but not exercised; no interpreter test uses it, so whether it still works on this toolchain is unknown.

Line counts for `Library/` and the test corpora are `find`-based and therefore include subdirectories; `repo-internals.md:70-78` counted top-level files only, which is why its `tests` 381 and `syntax_abstraction_tests` 43 differ from the 385 and 75 measured here — both are right, for different questions.

`ant_tasks/` is used by `Fortify/build.xml` and `Documentation/Specification/Root/build.xml`; whether `Specification/fortress/build.xml` also uses it was not checked.

Whether the four generated parsers currently in the tree are byte-identical to what a regeneration would produce was not tested.

## Decisions not made

Whether the dead modules in A.5 should be removed, left in place, or documented as historical artifact is Pavol's call; this file only lists them. `compiler/optimization/Unbox.java` in particular is an unfinished unboxing design from the original team and bears directly on the recorded priority (FACTS, execution model), so deleting it and using it are both live options.

Whether the top-level `CompilerLibrary/` directory, which is on no path and in no build file, should stay is not decided here; it is easy to confuse with `Library/CompilerLibrary.fss`, which is the one that is used.

Whether `fortress build` should replace the hand-ordered compile recipe in `repo-internals.md` is not decided here; it needs a run first.

Whether the two duplicated task-and-transaction runtimes (`interpreter/evaluator/tasks`+`transactions` and `runtimeSystem/`) should ever be unified is not decided here; they are independent implementations of the same two ideas and unifying them would be a change to the sealed tree on both paths.

Whether the `.tfi`/`.tfs` cache key should be content-based rather than source-directory-path-based (`NamingCzar.java:244-254`) is not decided here; it is the mechanism behind several of the cache traps on record.

Whether the GRAMMAR phase's position in the phase arrays should be corrected to reflect that it only processes apis is not decided here; the current arrangement is not a bug, but it reads as one.

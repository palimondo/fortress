<!-- Territory map, part two: the specification chapter by chapter, and where each feature it defines is implemented on each of the five paths (parser, static checker, interpreter, code generator, compiler prelude). Written before the historical source tree is opened for modification. Every checkable claim cites file:line in this tree; ledger rows are cited by number from explorations/fortress-gap-ledger.md. Read with explorations/coordinator/FACTS.md, which this document extends and, in two places marked below, corrects. -->

# Specification to implementation

Part one of the map, `explorations/coordinator/map/modules-and-phases.md`, covers the modules and the two pipelines; this part covers the specification and where each feature it defines is implemented. Where the two overlap (the dead top-level `CompilerLibrary/`, the prelude switch in `WellKnownNames`, the phase order) they were written independently and agree.

## 1. The specification that counts

The latest committed specification is `Specification/`; its root is `Specification/fortress/fortress.tex`, a `book` whose seven `\part` files are `\input` at `fortress.tex:149-155`.

The title block reads "Working Draft … July 19, 2012" (`Specification/fortress/fortress.tex:110-116`) and the macro header carries `\def\svnrevision{$Revision: 4267 $}` (`fortress.tex:14`).

The document is 53 numbered chapters plus ten appendices; the built table of contents is `Specification/fortress/fortress.toc` (untracked build residue, from the revival's own LaTeX run, commit `414b790e3`), whose last entry is page 596.

### 1.1 Chapter list, with the file that holds each chapter

Part I, Preliminaries (`Specification/preliminaries/preliminaries.tex`):

| # | chapter | file |
|---|---|---|
| 1 | Introduction | `preliminaries/intro/intro.tex` (+ `philosophy`, `nutshell`, `acknowledgments`, `organization`) |
| 2 | Overview | `preliminaries/overview.tex` |

Part II, Fortress for Application Programmers (`Specification/basic/basic.tex`):

| # | chapter | file |
|---|---|---|
| 3 | Programs | `basic/programs.tex` |
| 4 | Lexical Structure | `basic/lexical-structure.tex` |
| 5 | Evaluation | `basic/evaluation/evaluation.tex` (7 section files) |
| 6 | Types | `basic/types-vals-vars.tex` |
| 7 | Names and Declarations | `basic/declarations.tex` |
| 8 | Variables | `basic/variables.tex` (+ `basic/matrix-unpasting.tex`, `variables.tex:226`) |
| 9 | Functions | `basic/functions.tex` |
| 10 | Traits | `basic/traits.tex` |
| 11 | Objects | `basic/objects.tex` |
| 12 | Static Parameters | `basic/trait-parameters.tex` |
| 13 | Expressions | `basic/expressions/expressions.tex` (30 section files) |
| 14 | Exceptions | `basic/exceptions.tex` |
| 15 | Overloading and Multiple Dispatch | `basic/overloading.tex` |
| 16 | Operators | `basic/operators/operators.tex` (9 section files) |
| 17 | Conversions and Coercions | `basic/conversions-coercions.tex` |
| 18 | Dimensions and Units | `basic/dimensions.tex` |
| 19 | Tests and Properties | `basic/tests.tex` |
| 20 | Type Inference | `basic/inference.tex` (27 lines) |
| 21 | Memory Model | `basic/memory-model.tex` |
| 22 | Components and APIs | `basic/components/components.tex` (8 section files) |

Part III, Fortress for Library Writers (`Specification/advanced/advanced.tex`):

| # | chapter | file |
|---|---|---|
| 23 | Parallelism and Locality | `advanced/parallelism-locality/parallelism-locality.tex` (9 section files) |
| 24 | Overloaded Functional Declarations | `advanced/overloading.tex` |
| 25 | Operator Declarations | `advanced/operator-definitions.tex` + `advanced/subscripting.tex` (the latter has no `\chapter{}` of its own; its four sections continue chapter 25) |
| 26 | Dimension and Unit Declarations | `advanced/defining-dimensions.tex` |
| 27 | Support for Domain-Specific Languages | `advanced/domain-specific-languages.tex` (16 lines, one `\note`) |

Part IV, Fortress Interpreter Library APIs and Documentation (`Specification/library/library.tex`; its own `\note` at `library.tex:15-16` says these APIs do not work with the compiler):

| # | chapter | file |
|---|---|---|
| 28 | Structure of the Fortress Libraries | `library/structure.tex` |
| 29 | Default Libraries | `library/default-libraries.tex` |
| 30 | Additional Libraries Available to Fortress Programmers | `library/optional-libraries.tex` |

Part V, Fortress APIs and Documentation for Application Programmers (`Specification/basic-lib/basic-lib.tex`; `\note` at `:15`: "The APIs in this part may not be correct; they are not tested"):

| # | chapter | file |
|---|---|---|
| 31 | Objects | `basic-lib/objects.tex` |
| 32 | Booleans and Boolean Intervals | `basic-lib/booleans.tex` |
| 33 | Numbers | `basic-lib/numbers.tex` (+ `basic-lib/basic-integers.tex`, no chapter of its own) |
| 34 | Negated Relational Operators | `basic-lib/Fortress.NegatedOperators.tex` |
| 35 | Exceptions | `basic-lib/exception.tex` |
| 36 | Threads | `basic-lib/thread.tex` |
| 37 | Dimensions and Units | `basic-lib/dimensions.tex` |
| 38 | Tests | `basic-lib/tests.tex` |
| 39 | Convenience Functions and Types | `basic-lib/convenience.tex` |

Part VI, Fortress APIs and Documentation for Library Writers (`Specification/advanced-lib/advanced-lib.tex`; same `\note`):

| # | chapter | file |
|---|---|---|
| 40 | Algebraic Constraints | `advanced-lib/algebraic-constraints.tex` (1,894 lines) |
| 41 | Numbers | `advanced-lib/numbers-advanced.tex` |
| 42 | Components and APIs | `advanced-lib/components.tex` |
| 43 | Memory Sequences and Binary Words | `advanced-lib/binary.tex` |

Part VII, Appendices (`Specification/appendices/appendices.tex`):

| # | appendix | file |
|---|---|---|
| A | Fortress Calculi | `appendices/calculi/calculi.tex` (four calculi: `basic`, `where`, `overloading`, `acffd`) |
| B | Overloaded Functional Declarations | `appendices/overloading.tex` |
| C | Components and APIs | `appendices/components.tex` |
| D | Rendering of Fortress Code | `appendices/rendering.tex` |
| E | Support for Unicode Input in ASCII | `appendices/ascii-to-unicode.tex` |
| F | Operator Precedence, Associativity, Chaining, and Enclosure | `appendices/operators.tex` |
| G | Simplified Grammar for Application Programmers and Library Writers | `appendices/grammars/concrete-syntax.tex` |
| H | Full Grammar for Fortress Implementors | `appendices/grammars/appendix-cst.tex` |
| I | Changes Since Fortress 1.0 Specifications | `appendices/changes.tex` (16 lines; the whole chapter is one `\note` pointing at a dead changeset URL) |
| J | Internal Document | `appendices/internal-document.tex`, built only when `\release` is false |

### 1.2 How it differs in scope from `Specification-1.0-frozen/`

At chapter level it does not differ at all: both trees `\input` the same seven parts, the same chapter files, and the same section files, and the set of `\chapter{}` titles in the two trees is identical.

Both trees carry 208 tracked files; 202 are byte-identical, five differ, and one is present only in the frozen tree (`Specification-1.0-frozen/fortress.1.0.pdf`).

The five differences are: `fortress/fortress.tex` (the revival restyled the authors' `\note`/`\marginnote` macros, commit `4672b71cd`, and fixed the title's date line); the three `fortress/*.pl` table generators (the same commit changed `>>` to `>` so the reserved-word tables are not doubled); and `basic-lib/objects.tex`, where the draft tree carries a stray `\tracingcommands=1\tracingmacros=1` at `Specification/basic-lib/objects.tex:17`, historical, not a revival edit.

Both roots carry the same `\def\svnrevision{$Revision: 4267 $}` and the same `\ifrelease` block, and in both the release switch is commented out (`Specification/fortress/fortress.tex:33`, `Specification-1.0-frozen/fortress/fortress.tex:33`), so both build in draft mode with the 230 `\note{}` implementers' annotations rendered.

So the difference in scope is between the *frozen PDF* and the sources, not between the two source trees: `Specification-1.0-frozen/fortress.1.0.pdf` is a 262-page committed artefact of the 1.0 release, while the sources in both trees build to about 596 pages.

This sharpens, and in one respect corrects, `FACTS.md`'s line "The in-repo `Specification/` is the later draft with the implementers' notes; `Specification-1.0-frozen/` is 1.0": the *sources* under `Specification-1.0-frozen/` are not the 1.0 sources, only the PDF beside them is.

The practical consequence for the ledger's convention ("the chapters cited are byte-identical in `Specification-1.0-frozen`", ledger header) is that the convention holds for 171 of the 173 tracked `.tex` files and fails only for `basic-lib/objects.tex` (by one line) and the root `fortress.tex`.

## 2. How to read the implementation columns

Five paths carry a feature, and a feature can exist on some and not others.

**parser** — the Rats! grammar under `ProjectFortress/src/com/sun/fortress/parser/`; the root module is `Fortress.rats` (179 lines, module assembly only), and the rules live in the 25 modules it instantiates; `templateparser/`, `preparser/` and `import_collector/` are three further grammars serving syntax abstraction, import discovery and dependency collection.

**checker** — `ProjectFortress/src/com/sun/fortress/scala_src/`; `typechecker/STypeChecker.scala` plus the four mixins the dispatcher in `typechecker/impls/Dispatch.scala:59-99` routes to (`Decls.scala`, `Functionals.scala`, `Operators.scala`, `Misc.scala`), the standalone checkers beside them, and `overloading/`.

**interpreter** — `ProjectFortress/src/com/sun/fortress/interpreter/`; declarations are bound by `evaluator/BuildEnvironments.java`, expressions are walked by `evaluator/Evaluator.java`, and `rewrite/DesugarerVisitor.java` runs an interpreter-only desugaring before evaluation; the library it stands on is `Library/*.fss` plus `ProjectFortress/LibraryBuiltin/`.

**codegen** — `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` (6,750 lines), with `compiler/OverloadSet.java` for dispatch methods, `compiler/NamingCzar.java` for type lowering, and `runtimeSystem/InstantiatingClassloader.java` + `Naming.java` for generic instantiation at class-load time; `CodeGen.defaultCase` (`CodeGen.java:1668-1670`) throws `Can't compile <node>` (`sayWhat`, `CodeGen.java:1550-1552`) for every AST node with no `forX` method, so "no visitor" means "absent on this path".

**prelude** — the compiler's own library, selected by `compiler/WellKnownNames.java:113-126` (`useCompilerLibraries()`), is exactly three apis: `CompilerLibrary` (`Library/CompilerLibrary.fss` 592 lines, `.fsi` 307), `CompilerBuiltin` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` 1,547 lines, `.fsi` 754) and `AnyType` (`ProjectFortress/LibraryBuiltin/AnyType.fss` 17 lines); `CompilerAlgebra` (`Library/CompilerAlgebra.fss` 29 lines) is commented out of that list at `WellKnownNames.java:118` but reached transitively (`CompilerBuiltin.fsi:14`), and `Library/CompilerSystem.fss` (22 lines) must be imported by name.

Two compiler-world files ship and are wired to nothing: `Library/GeneratorLibrary.fss` (469 lines: the whole generator/reduction protocol in compiler-world spelling) is imported by no prelude file and is named only by a fallback search in `scala_src/typechecker/TraitTable.scala:56-58`; and the top-level `CompilerLibrary/` directory (10 `.fsi` stubs, 3,206 lines, including a 2,523-line `FortressLibrary.fsi`) is not on `fortress.source.path` (`default_repository/configuration`, `fortress.source.path=;.;${_fr}/LibraryBuiltin;${FORTRESS_AUTOHOME}/Library;${_fr}/test_library`) and is referenced by no build file, script or source; the single `bin/` hit for the name, `bin/runOptCollect:32`, is the bytecode-cache jar `fortress.CompilerLibrary.jar`, which is the compiled form of `Library/CompilerLibrary.fss` and a different thing. The revival-era root `README.md:155` nevertheless describes the directory as "API stubs for the compiler path", which reads as though it were live.

The interpreter's prelude is the other three: `FortressLibrary` (`Library/FortressLibrary.fss` 4,518 lines), `FortressBuiltin` and `AnyType` (`WellKnownNames.java:47-48`, `useFortressLibraries()` at `:128-137`).

Two structural facts govern the whole table.

Both paths share one phase list up to DESUGAR and differ only after it (`compiler/phases/PhaseOrder.java:124-145`: `interpreterPhaseOrder` ends in `OVERLOADREWRITE_FOR_INTERPRETER`, `compilerPhaseOrder` in `OVERLOADREWRITE, CODEGEN`), so a feature desugared before that point exists identically on both paths.

`walk` calls `setScala(false)` (`Shell.java:422`) and never `setTypeChecking(true)`, so on the interpreter path the checker is a no-op *and* three desugarings are switched off, each gated on `use_scala`: coercion (`Shell.java:280-282`), chained comparison (`Shell.java:284-286`) and compound/tuple assignment with subscript rewriting (`Shell.java:268-270`).

Status words: **interp** and **comp** each read `works` / `partial` / `absent`, and "absent" on the compiler path most often means the code generator has no visitor or the prelude has no declaration, not that codegen is wrong.

## 3. Feature by feature, chapter by chapter

### Chapter 3, Programs; Chapter 22, Components and APIs; Appendix C

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| component / api declaration | `basic/components/source-code.tex`, `apis.tex` | `Compilation.rats:101` `Component`, `:147` `Api` | `Decls.scala` (`Component` case, `Dispatch.scala:62`), `ExportChecker.scala`, `ApiTypeExtractor.scala` | `evaluator/BuildTopLevelEnvironments.java`, `BuildApiEnvironment.java` | `CodeGen.forComponent:1843` | n/a | interp works / comp works | 68 (file name must equal component name), 151, 173 |
| import, `import … except`, `import *` | `basic/components/source-code.tex:93` | `Compilation.rats:206` `Import`, `:226` `ImportedNames` | `disambiguator/ExprDisambiguator.scala`, `compiler/Disambiguator.java` | `BuildEnvironments.forImportNames:1014` (stub, returns false; binding is done by the repository) | `CodeGen.forImportNames:3855`, `forImportStar:1672` (both no-ops) | — | interp works / comp works | 41, 42, 101 |
| import aliasing (`as`, `=>`) | `basic/components/source-code.tex:93` | `Compilation.rats:308` `AliasedSimpleName` | — | — | — | — | absent on both | 13 |
| export, linking | `basic/components/overview.tex`, `appendices/components.tex` | `Compilation.rats:401` `Export` | `linker/ApiLinker.scala`, `CompoundApiChecker.scala`, `ExportExpander.scala`, `HygienicRenamer.scala` | `repository/GraphRepository.java` | `linker/Linker.java:150` | `Executable` api | interp works / comp works | 151 |
| foreign import (`import java …`) | not specified | `Compilation.rats:216` `ForeignLang` | — | absent (interpreter uses `builtinPrimitive` instead) | `compiler/nativeInterface/`, `repository/ForeignJava.java` | the mechanism the compiler prelude's natives use | interp absent / comp works | 309 |

### Chapter 4, Lexical Structure; Appendices E, F

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| identifiers, reserved words | `basic/lexical-structure.tex:773`, `1390`; `fortress/fortress-keywords.tex` | `Identifier.rats:48` `reserved`, `:52` `Id`; `Keyword.rats` (157 lines) | — | — | — | — | works (both) | 7, 8, 15, 93, 193, 257, 262 |
| operator tokens, fixity, precedence | `basic/lexical-structure.tex:1156`; `basic/operators/precedence.tex`, `opr-fixity.tex`; appendix F | `Symbol.rats:117` `OpName`, `:120` `Op`, `:28-43` enclosers, `:37` `ExponentOp` | `parser_util/precedence_resolver/Resolver.java` (pre-AST), `Operators.scala` | — | — | — | works (both) | 5, 9, 86, 88, 89, 90, 216, 233, 278, 280 |
| the operator/precedence tables themselves | appendix F | generated: `parser_util/precedence_resolver/Operators.java` from `unicode/OperatorStuffGenerator.java` | — | — | — | — | works (both) | — |
| numerals, radix, character and string literals | `basic/lexical-structure.tex:797`, `925`, `1053` | `Literal.rats:53` `NumericLiteralExpr`, `:125` `CharLiteralExpr`, `:148` `StringLiteralExpr` | `Misc.scala:460-481` | `Evaluator.forIntLiteralExpr:1506`, `forFloatLiteralExpr:1502`, `forStringLiteralExpr:889`, `forCharLiteralExpr:1498` | `CodeGen.forIntLiteralExpr:3859`, `forFloatLiteralExpr:1979`, `forStringLiteralExpr:4896`, `forCharLiteralExpr:4885` | `CompilerBuiltin.fsi:369` `IntLiteral`, `:447` `FloatLiteral` | works (both) | 14, 15, 16, 200 |
| ASCII conversion of Unicode names | appendix E | the ASCII spellings of operator names (`SUM`, `DOT`, `TIMES`) are in `Symbol.rats` | — | — | — | — | partial (both) — **the appendix says so itself**: `\note{Only \secref{preprocessing-unicode-names} is supported.}` at `appendices/ascii-to-unicode.tex:15`; the other three sections are unimplemented | 5 |
| comments (nesting) | `basic/lexical-structure.tex:700` | `Spacing.rats` | — | — | — | — | works (both) | 217 |

### Chapter 5, Evaluation; Chapter 21, Memory Model; Chapter 23, Parallelism and Locality

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| implicit parallelism of tuples and operands | `basic/evaluation/parallelism.tex`; `basic/expressions/tuple-expr.tex:23-24`; `basic/expressions/operator-app.tex:59` | — | — | `Evaluator.forTupleExpr:1335`, `evaluator/tasks/TupleTask.java` | `CodeGen.genParallelExprs:1588-1665`, `forExprsParallel:4807`, `codegen/ParallelismAnalyzer.java`, `WorthParallelizing.java` | — | interp works / comp works | 60, 70, 155, 265 |
| `also do` (parallel do-fronts) | `basic/expressions/blocks.tex` | `DelimitedExpr.rats:150` `Do` | `Misc.scala:507` | `Evaluator.forDo:238-279` | `CodeGen.forDoParallel:1947`, `forDo:1952` | — | works (both) | — |
| `atomic` / `tryatomic` | `basic/expressions/atomic.tex`; `advanced/parallelism-locality/transactions.tex` | block form `DelimitedExpr.rats:157` (`atomic` flag on `DoFront`); expression form `Expression.rats:723`, `:725` | `Misc.scala:450-458` | `Evaluator.forAtomicExpr:183`, `forTryAtomicExpr:204`, `evaluator/transactions/` (11 classes) | block form only: `CodeGen.forAtomicBlock:1729` via `forBlock:1760-1766`; **no `forAtomicExpr`**, so `atomic <expr>` reaches `defaultCase` | `runtimeSystem/BaseTask.java` transactions | interp works / comp partial | 59, 70 |
| `spawn`, thread handles | `basic/expressions/spawn.tex`; `basic-lib/thread.tex` | `Expression.rats:727` | `Misc.scala:441-448`, and `AtomicChecker` (`Misc.scala:936-962`) forbids `spawn` inside `atomic` | `rewrite/DesugarerVisitor.forSpawn:1004`, `evaluator/tasks/SpawnTask.java`, `glue/prim/Thread.java` | **no `forSpawn`** | `Thread[\T\]` is declared only in the interpreter builtin | interp works / comp absent | 61, 82 |
| regions, `at` placement | `advanced/parallelism-locality/regions-threads.tex`, `primitives-distributions.tex` | `DelimitedExpr.rats:157` (`at w Expr`) | — | the region expression is evaluated and its value discarded (`Evaluator.java:246-249`, `:263-266`); the library is degenerate — `region(a) = Global`, `here() = Global`, `isLocalTo` always `false` except on `Global` (`Library/FortressLibrary.fss:74-89`) | ignored (no `getLoc()` use in `CodeGen.java`) | — | interp partial (parsed, evaluated for effect, no placement) / comp absent | — |
| shared vs local data | `advanced/parallelism-locality/shared-local.tex` | — | — | `shared(x) = x`, `isShared(x) = true`, `localize(x) = x` (`Library/FortressLibrary.fss:65-69`) — stubs, with the comment "At the moment all Fortress objects are immediately shared by default" (`:63`) | — | — | interp stub / comp absent | — |
| distributions, distributed arrays | `advanced/parallelism-locality/distributions.tex`, `arrays-distributed.tex` | — | — | no `Distribution` trait anywhere in `Library/` or `LibraryBuiltin/` | — | — | absent on both | — |
| early termination of threads | `advanced/parallelism-locality/early-termination.tex` | — | — | `evaluator/tasks/` | — | — | unverified | — |
| memory model, read/write atomicity | `basic/memory-model.tex` (454 lines) | — | — | `evaluator/transactions/AtomicArray.java`, `ReadSet.java`, `WriteRecord.java` | `runtimeSystem/Transaction.java`, `TransactionRecord.java` | — | unverified (the chapter states ordering rules; no probe exists) | — |

### Chapter 6, Types; Chapter 20, Type Inference

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| trait types, object-expression types | `basic/types-vals-vars.tex:192`, `:226` | `Type.rats:377` `TraitType`, `:29` `Type` | `types/TypeAnalyzer.scala`, `TypeSchemaAnalyzer.scala`, `TypeHierarchyChecker.scala` | `evaluator/EvalType.java`, `types/FTypeTrait.java` | `NamingCzar.java` (trait → JVM interface) | `AnyType.fsi` | works (both) | — |
| tuple types | `basic/types-vals-vars.tex:245` | `Type.rats:181` `TupleType` | `Misc.scala:482-506` | `types/FTypeTuple.java`, `values/FTuple.java` | `CodeGen.forTupleExpr:3401` | `CompilerBuiltin` tuple RTTI (`runtimeSystem/RttiTupleMap.java`) | works (both) | 252, 258, 260 |
| arrow / function types | `basic/types-vals-vars.tex:286`, `:408` | `Type.rats:29` (`->` in `OpType`) | `types/TypeAnalyzer.scala` | `types/FTypeArrow.java` | `codegen/` closure classes, `Naming.java` arrow encoding | — | works (both) | 164, 165, 171 |
| intersection and union types | `basic/types-vals-vars.tex:534` | — (internal types only) | `types/BoundedLattice.scala`, `Lattice.scala`, `TypeAnalyzer.scala` | — | — | checker-internal only | partial: the checker has them, no surface syntax | — |
| type aliases (`type X = T`) | `basic/types-vals-vars.tex:597` | `OtherDecl.rats:103` `TypeAlias` | **`IndexBuilder.scala:187` `bug("Not yet implemented: " + d)`** | `BuildEnvironments.forTypeAlias:987` — a stub returning `false` | no `forTypeAlias` | — | absent on both | 18 |
| type inference | `basic/inference.tex` (27 lines, a stub chapter) | — | `ConstraintFormula.scala`, `Formula.scala`, `types/TypeAnalyzer.scala`; inference for static args in `STypesUtil.scala` | the interpreter infers nothing statically; static args are matched at dispatch | consumes the checker's results | — | interp n/a / comp partial | 21, 23, 25, 83, 156 |
| `comprises`, `excludes` | `basic/traits.tex:31`; `basic/types-vals-vars.tex:111` | `NoNewlineHeader.rats:82` `Excludes`, `:99` `Comprises` | `TypeHierarchyChecker.scala`, `ExclusionOracle.scala` | `types/FTypeTrait.java:40-80` holds `comprises` but never enforces it | `CodeGen.java:4977-4979` notes these clauses do not affect codegen after checking | — | interp absent (unchecked) / comp works | 22, 77, 78, 97, 99 |

### Chapter 7, Names and Declarations; Chapter 8, Variables

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| top-level variable declarations | `basic/variables.tex:18` | `Variable.rats:34` `VarDecl`, `:101` `AbsVarDecl` | `Decls.scala` (`VarDecl`, `Dispatch.scala:66`) | `BuildEnvironments.forVarDecl:640`, `EvalVarsEnvironment.java` | `CodeGen.forVarDecl:5850` | — | works (both) | 152, 175, 177 |
| local variable and function declarations | `basic/variables.tex:148`; `basic/functions.tex:548` | `LocalDecl.rats:158` `LocalVarDecl`, `:76` `LocalFnDecl`, `:67` `LocalVarFnDecl` | `Decls.scala:405-418` (`LetFn`), `LocalVarDecl` | `evaluator/BuildLetEnvironments.java` | `CodeGen.forLocalVarDecl:3910`; **no `forLetFn`**, and `CodeGen.java:2943` refuses any `FnDecl` `inABlock` | — | interp works / comp absent for local functions | 304 |
| tuple binding, wildcard `_` | `basic/expressions/bindings.tex`; `basic/expressions/blocks.tex:53` | `LocalDecl.rats:207-247`; `Identifier.rats:62-65` | `Misc.scala:265-280` (patterns) | `evaluator/LHSToLValue.java` | — | — | interp works for binding, absent for assignment | 143, 242, 251 |
| shadowing rules | `basic/declarations.tex:476-533` | — | `compiler/Disambiguator.java`, `disambiguator/ExprDisambiguator.scala` | `rewrite/DesugarerVisitor.java` (rejects nested re-declaration) | — | — | works (both), stricter than users expect | 92, 147, 167, 168, 262 |
| unpasting (`[a b] = m`) | `basic/matrix-unpasting.tex` | `LocalDecl.rats:269-294` `Unpasting` (parses to `void`) | — | — | — | — | absent on both | 108 |

### Chapter 9, Functions; Chapter 15, Overloading; Chapter 24

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| function declarations, abstract declarations | `basic/functions.tex:42`, `:353` | `Function.rats:32` `TopLevelFnDecl`, `:52` `FnDecl`, `:64` `AbsFnDecl` | `Decls.scala`, `AbstractMethodChecker.scala` | `BuildEnvironments.forFnDecl:291` | `CodeGen.forFnDecl:2871` | — | works (both) | 176, 178 |
| function application | `basic/functions.tex:192` | `Expression.rats:464` `MathPrimary`, `:559` `ParenthesisDelimited` | `Functionals.scala` | `Evaluator.forMathPrimary:1108`, `evaluator/values/FunctionClosure.java` | `CodeGen.forFunctionalRef:3620`, `forFnRef:3545` | — | works (both) | 4, 144, 158 |
| varargs and keyword parameters | `basic/overloading.tex:211`; `basic/objects.tex:66` | `Parameter.rats:88` `VarargsParam`, `:93` `Keyword` | `Functionals.scala` | `evaluator/values/Parameter.java` | — | — | interp works for functions, refused for objects / comp unverified | 11, 130 |
| function contracts (`requires`/`ensures`/`invariant`) | `basic/functions.tex:417`; `basic/traits.tex:723` | `MayNewlineHeader.rats:424` `Requires`, `:428` `Ensures`, `:444` `Invariant` | `Misc.scala:183-197` | desugared to `if`/`throw` by `rewrite/DesugarerVisitor.java:805-834`, `translateRequires:1533`, `translateEnsures:1546` | **`CodeGen.java:2941`, `:4078`, `:4985` all require `header.getContract().isNone()`**, otherwise `sayWhat` | `FailCalled`, `CallerViolation`, `CalleeViolation` in `CompilerLibrary.fsi:46-58` | interp works / comp absent | 118, 119, 220, 231 |
| multiple dispatch, overload resolution | `basic/overloading.tex:55-256`; `advanced/overloading.tex`; appendix B | overloads are ordinary declarations | `overloading/OverloadingChecker.scala`, `OverloadingOracle.scala`, `typechecker/OverloadingChecker.scala` | `values/OverloadedFunction.java:787` `bestMatch` (run-time types); failure message `Failed to find any matching overload` at `:795` | `compiler/OverloadSet.java:1944` generates one dispatch method per overloaded name; `compiler/OverloadRewriter.java` | — | interp works / comp works | 29, 83, 97-99, 159, 161, 171, 214, 225, 240, 296, 297 |
| multifix dispatch | `basic/operators/chained-multifix.tex` | `Expression.rats:806` (`AmbiguousMultifixOpExpr`) | `Operators.scala` | the interpreter reassociates to binary and never looks for an *n*-ary definition | — | — | absent on both | 29 |

### Chapter 10, Traits; Chapter 11, Objects

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| trait declarations, multiple inheritance | `basic/traits.tex:31` | `TraitObject.rats:31` `TraitDecl`, `:229` `AbsTraitDecl`; `NoNewlineHeader.rats:31` `ExtendsWhere`, `:57` `Extends` | `Decls.scala`, `TypeHierarchyChecker.scala`, `VarianceChecker.scala` | `BuildEnvironments.forTraitDecl:797`, `evaluator/BuildTraitEnvironment.java`, `types/FTypeTrait.java` | `CodeGen.forTraitDecl:4967` (trait → JVM interface) | `CompilerBuiltin`, `CompilerAlgebra` use it | works (both) | 36, 43, 53 |
| method declarations, abstract fields | `basic/traits.tex:301`, `:551` | `Method.rats:34` `MdDecl`, `:43` `MdDef` | `Decls.scala`, `AbstractMethodChecker.scala` | `Evaluator.forMethodInvocation:549`, `values/MethodClosure.java` | `CodeGen.forMethodInvocation:5988` | — | works (both) | 124, 126, 133 |
| object declarations | `basic/objects.tex:63` | `TraitObject.rats:142` `ObjectDecl`, `:291` `AbsObjectDecl`; `:81` `TraitParam` | `Decls.scala` | `BuildEnvironments.forObjectDecl:431`, `evaluator/BuildObjectEnvironment.java` | `CodeGen.forObjectDecl:4002`, `forObjectDeclPrePass:4068` | — | works (both) | 11, 92, 124, 129 |
| object expressions | `basic/expressions/object.tex` | `DelimitedExpr.rats:50` | `Misc.scala:359-403` | `rewrite/DesugarerVisitor.forObjectExpr:901`; `compiler/desugarer/DesugaringVisitor.forObjectExpr:532` | **no `forObjectExpr`** (the desugaring is gated on `Shell.getObjExprDesugaring()`, default `false`, `Shell.java:1276`) | — | interp works / comp absent | 127, 128 |
| value traits and value objects | `basic/traits.tex:801`; `basic/objects.tex:347`, `:424` | `TraitObject.rats` (`value` modifier, `NoNewlineHeader.rats:252` `Mod`) | `Decls.scala` | the trait rule is enforced; the field rules are not | the `value` modifier has no representation meaning in codegen | `CompilerBuiltin.fsi:648-660` `value trait Option` | interp partial / comp partial | 112-117 |
| getters and setters | `basic/objects.tex:238` | `NoNewlineHeader.rats:252` (`getter`/`setter` modifiers) | `Decls.scala` | `compiler/desugarer/DesugaringVisitor.java` (shared, `Shell.getGetterSetterDesugaring()` default `true`) | same desugaring, then ordinary methods | — | works (both) | 124, 126, 128, 129 |

### Chapter 12, Static Parameters

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| type parameters (generics) | `basic/trait-parameters.tex:36` | `NoNewlineHeader.rats:269` `StaticParams`, `:286` `StaticParam`; `MayNewlineHeader.rats:449` `StaticArgs` | `types/TypeSchemaAnalyzer.scala`, `STypesUtil.scala` | `types/FTypeGeneric.java`, `GenericTypeInstance.java`, `values/FGenericFunction.java` | template bytecode + `runtimeSystem/InstantiatingClassloader.java`, `Instantiater.java`, `Naming.java` | `CompilerLibrary`/`CompilerBuiltin` use them freely | works (both) | 20, 21, 96, 156, 157 |
| `nat` and `int` parameters | `basic/trait-parameters.tex:68` | `NoNewlineHeader.rats:286`; `MayNewlineHeader.rats:241` `IntExpr` | **`STypesUtil.scala:550-557`: `KindInt`, `KindBool`, `KindDim`, `KindUnit`, `KindNat` all `NI.nyi()`** | `types/IntNat.java`, `SymbolicNat.java`, `FTypeNat.java`; matched at dispatch; `LibraryBuiltin/NatReflect.fss` is the reflection escape | encoded: `NamingCzar.java:1827-1831` `forKindNat`, `:1906-1910` `forIntArg` (`Naming.XL_INTNAT`) | one declaration only: `trait Matrix[\T, nat s0, nat s1\] extends Object end`, `Library/CompilerLibrary.fss:512` | interp works / comp absent — **the wall is the checker, not codegen** | 23, 25, 28, 83, 99, 149, 166, 167, 214, 226, 307 |
| `bool` parameters | `basic/trait-parameters.tex:101` | `MayNewlineHeader.rats:307` `BoolExpr` | `STypesUtil.scala:551` `NI.nyi()` | `types/Bool.java`, `SymbolicBool.java` | `NamingCzar` bool kind | none | interp works / comp absent | 307 |
| dimension and unit parameters | `basic/trait-parameters.tex:122` | `MayNewlineHeader.rats:191` `UnitConstraint`, `:381` `UnitExpr` | `STypesUtil.scala:552`, `:556` `NI.nyi()` | `EvalType` has no case: `Can't EvalType this node type … TaggedDimType` | — | none | absent on both | 26, 27 |
| operator parameters | `basic/trait-parameters.tex:156` | `NoNewlineHeader.rats:286` | `NamingCzar` `forKindOp` | `types/FTypeOpr.java`, `SymbolicOprType.java` | `NamingCzar.java:1834-1836` `forKindOp`, `:1913-1916` `forOpArg` | none | interp works / comp unverified | 39, 40, 41, 103 |
| where clauses | `basic/trait-parameters.tex:284`; appendix A (`calculi/where/`) | `NoNewlineHeader.rats:152` `Where`, `:176` `WhereBinding`; `MayNewlineHeader.rats:136` `WhereConstraintList`, `:151` `WhereConstraint` | `staticenv/KindEnv.scala:126` `NI.nyi("non-type where clause bindings")`; type bindings handled in `TypeAnalyzer.extendJ` | `BuildEnvironments.processWhereClauses:908`, called at `:880` and `:980` | **refused**: `CodeGen.java:2937`, `:4076`, `:4983` each require `header.getWhereClause().isNone()`, otherwise `sayWhat` | none used | interp partial / comp absent | 17 |

### Chapter 13, Expressions

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| `do` blocks | `basic/expressions/blocks.tex` | `DelimitedExpr.rats:150` `Do`, `:156` `DoFront` | `Misc.scala:410-424`, `:507` | `Evaluator.forDo:238`, `forBlock:283` | `CodeGen.forBlock:1760`, `forDo:1952` | — | works (both) | — |
| `if` / `elif` / `else` | `basic/expressions/if.tex` | `DelimitedExpr.rats:76`, `:83`, `:91`; `:213` `Elifs` | `Misc.scala:525`, `:581` | `Evaluator.forIf:581` | `CodeGen.forIf:3814` | `Boolean` in `CompilerBuiltin.fsi:453` | works (both) | — |
| `while` loops | `basic/expressions/while.tex` | `DelimitedExpr.rats:72` | `Misc.scala:598` | `Evaluator.forWhile:1471` | `CodeGen.forWhile:5945` | — | works (both) | — |
| `for` loops and generators | `basic/expressions/for.tex`, `generators.tex`; `advanced/parallelism-locality/defining-generators.tex` | `DelimitedExpr.rats:74`; `Expression.rats:743` `GeneratorClauseList`, `:748` `GeneratorBinding`, `:758` `GeneratorClause` | `Misc.scala:611`, then the desugared form | desugared to `g.loop(fn x => body)` by `PreTypeCheckDesugaringVisitor.forFor:323`, `visitLoop:337-347` (shared by both paths) | inherits the desugaring; the `loop` method is an ordinary call | **only `GeneratorZZ32`**: `CompilerLibrary.fsi:89-119`, `loop` at `:92`, `seqloop` at `:95`; `Library/CompilerLibrary.fss:326-348` `parloop`/`countedseqloop` | interp works over any `Generator[\E\]` / comp works over `ZZ32` ranges only | 47, 48, 59, 111, 155, 221 |
| `label` / `exit` | `basic/expressions/label.tex` | `DelimitedExpr.rats:57`; `Expression.rats:694` | `Misc.scala:678` (label), `:705` (exit) | `Evaluator.forLabel:615`, `forExit:499` | **no `forLabel`, no `forExit`** | `LabelException` in `CompilerLibrary.fsi:54` | interp works / comp absent | 8, 81 |
| `case` expressions, `case most` | `basic/expressions/case.tex` | `DelimitedExpr.rats:99`, `:112`; `:226` `CaseClauses` | `Functionals.scala` (`CaseExpr`, `Dispatch.scala:85`) | desugared by `compiler/desugarer/CaseExprDesugarer.java:89` (shared; `Shell.getCompiledExprDesugaring()` hardcoded `true`, `Shell.java:1285`) | the commented-out `forCaseExpr` at `CodeGen.java:1769-1780` shows the abandoned direct route | — | interp works / comp partial | 80 |
| `typecase` | `basic/expressions/typecase.tex` | `DelimitedExpr.rats:122`; `:233` `TypecaseClauses` | `Misc.scala:644` | `Evaluator.forTypecase:1382` | `CodeGen.forTypecase:2100`, plus `desugarer/TypecaseExprDesugarer.java` (`PreTypeCheckDesugarer.java:118`) | — | interp works / comp wrong answer, silently | 79 |
| `try` / `catch` / `finally` / `forbid` | `basic/expressions/try.tex` | `DelimitedExpr.rats:141`; `:255` `Catch` | `Misc.scala:749-800` | `Evaluator.forTry:1311` | `CodeGen.forTry:2004` | `CompilerBuiltin.fsi:707-734` exception hierarchy | works (both) | 162 |
| `throw` | `basic/expressions/throw.tex` | `Expression.rats:729` | `Misc.scala:735` | `Evaluator.forThrow:1490` | `CodeGen.forThrow:1991` | — | works (both) | — |
| tuple expressions | `basic/expressions/tuple-expr.tex` | `DelimitedExpr.rats:195` `TupleExpr`, `:202` `KeywordExpr` | `Misc.scala:482` | `Evaluator.forTupleExpr:1335` | `CodeGen.forTupleExpr:3401` (parallel) | tuple RTTI in `runtimeSystem/RttiTupleMap.java` | works (both) | 252, 258, 260 |
| aggregate expressions (array, matrix, set, map literals; pasting) | `basic/expressions/aggregate.tex` | `NoSpaceLiteral.rats:25` `ArrayExpr`; `Expression.rats:517`, `:633` (`[ … ]`, `{ … }`); `DelimitedExpr.rats:269` `MapExpr` | `Misc.scala:804` `ArrayElement`, `:837` `ArrayElements` | `Evaluator.forArrayElement:709`, `forArrayElements:725`, `values/IUOTuple.java`, `IndexedShape.java` | **no `forArrayElements`** | no array types at all | interp works / comp absent | 12, 49, 104-108, 142 |
| comprehensions (list, set, map) | `basic/expressions/comprehensions.tex` | `DelimitedExpr.rats:290` `Comprehension` — parses to an `Accumulator`, not a node of its own | `Operators.scala` (after desugaring) | desugared by `PreDisambiguationDesugaringVisitor.forAccumulator:387` and `PreTypeCheckDesugaringVisitor.forAccumulator:351` (shared) | inherits the desugaring | `__generate`/`__bigOperator` exist only for `ReductionString` and `ReductionZZ32` over `GeneratorZZ32` (`Library/CompilerLibrary.fss:297-310`) | interp works / comp absent for user types | 10, 20, 48, 96, 136 |
| array comprehensions | `basic/expressions/comprehensions.tex` | `DelimitedExpr.rats:291` (the `[ … ]` alternative); `Symbol.rats:271` `ArrayComprehensionClause` | — | `Evaluator.forArrayComprehension:885`, `forArrayCompClause:881` | **no `forArrayComprehension`** | — | interp works / comp absent | 50 |
| reductions and big operators (`SUM`, `BIG ⋃`, …) | `basic/expressions/reductions.tex`; `basic/operators/big-opr.tex`; `advanced/subscripting.tex:114` | `Expression.rats:700` (`Accumulator`), `:709`, `:716` (`BIG` enclosers); `Symbol.rats:252` `SUM`, `:254` `PROD`, `:260` `Accumulator` | `Operators.scala` | desugared to `__bigOperator`/`__generate` calls with reduction objects; the reduction tower is `Library/FortressLibrary.fsi:1707-2025` | inherits the desugaring | `CompilerLibrary.fsi:126-159`: two reduction traits, `BIG \|\|` and `BIG MAX` only | interp works / comp absent for anything but those two | 5, 6, 39-46, 74, 101-103, 137, 160 |
| ranges | `basic/expressions/ranges.tex` | `Type.rats:252` `ExtentRange`; `Symbol.rats` `:` and `#` | `Misc.scala` | `Library/FortressLibrary.fsi:2046-2160` (13 range traits), `Library/RangeInternals.fss`, `types/FTypeRange.java`, `values/FRange.java` | — | `trait Range extends GeneratorZZ32` (`Library/CompilerLibrary.fss:388`), `opr :` and `opr #` at `CompilerLibrary.fsi:151-152` | interp works / comp partial (`ZZ32` only) | 54, 56, 110 |
| function expressions (`fn x => e`) | `basic/expressions/function.tex` | `Expression.rats` (`FnExpr`) | `Functionals.scala` (`FnExpr`, `Dispatch.scala:86`) | `Evaluator.forFnExpr:565` | `CodeGen.forFnExpr:3424` | — | works (both) | 131, 164, 171, 234, 285 |
| type ascription (`as`, `asif`) | `basic/expressions/type-annotation.tex` | `Expression.rats:78` `As`, `:87` `AsIf` | `Misc.scala:668`, `:673` | `Evaluator.forAsExpr:99`, `forAsIfExpr:108` | desugared away by `desugarer/TypeAscriptionDesugarer.java:21` (shared) | — | works (both) | — |
| assignment, compound assignment | `basic/expressions/bindings.tex` | `Expression.rats:97` `AssignExpr`, `:106` `AssignLefts`, `:138` `SubscriptAssign`, `:153` `FieldSelectionAssign` | `Operators.scala` (`Assignment`, `Dispatch.scala:93`) | `Evaluator.forAssignment:120`, `evaluator/LHSEvaluator.java`, `ALHSEvaluator.java` | `desugarer/AssignmentAndSubscriptDesugarer.scala` (**compile path only** — `Shell.java:268-270` requires `use_scala`), then `CodeGen.forAssignment:1676` | — | works (both), by different routes | 59, 143, 169, 170 |
| static expressions | `basic/expressions/constant.tex` | — | — | — | `desugarer/IntegerLiteralFoldingVisitor.java`, phase `INTEGERLITERALFOLDING` (compile path only, `PhaseOrder.java:139`) | — | interp absent / comp partial | — |
| naked method invocation, dotted access | `basic/expressions/function-calls.tex`, `field-access.tex`, `method-invocation.tex` | `Expression.rats:450` `DottedIdChain`, `:571` `Selector`, `:576` `MethodInvocationSelector`, `:592` `FieldSelectionSelector` | `Functionals.scala` | `Evaluator.forFieldRef:525`, `forMethodInvocation:549`, `rewrite/DottedMethodRewriteVisitor.java` | `CodeGen.forMethodInvocation:5988` | — | works (both) | 84, 91, 301 |

### Chapter 14, Exceptions

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| checked / unchecked exception hierarchy | `basic/exceptions.tex:56`; `basic-lib/exception.tex` | — | `exceptions/` (26 java + 1 scala) | `Library/FortressLibrary.fsi:954-1053` (36 exception objects) | — | `CompilerBuiltin.fsi:707-734` (a much smaller set) + `CompilerLibrary.fsi:46-83` | interp works / comp partial | 162, 220, 231 |
| `throws` clauses | `basic/functions.tex` | `NoNewlineHeader.rats:237` `Throws` | `Decls.scala` | ignored | accepted since 2011 (`CodeGen.java:2938-2940` comment) for functions; **refused** for traits and objects (`CodeGen.java:4077`, `:4984`) | — | interp ignores / comp partial | — |

### Chapter 16, Operators; Chapter 25, Operator Declarations (which absorbs `advanced/subscripting.tex`)

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| operator application, precedence, associativity | `basic/operators/operator-app.tex`, `precedence.tex` | `Expression.rats:169` `OpExpr`, `:187` `OpExprNoEnc`, `:210`-`:368` (the fixity ladder) | `Operators.scala`; `parser_util/precedence_resolver/Resolver.java` runs before the AST | `Evaluator.forOpExpr:819` | `CodeGen.forOpExpr:4844`, `forOpRef:4881` | — | works (both) | 6, 85, 86, 88, 89 |
| operator declarations (infix, prefix, postfix, nofix, multifix, bracketing) | `advanced/operator-definitions.tex:86-225` | `Parameter.rats:118` `LeftOp`, `:125` `SingleOp`, `:132` `OpHeaderFront`, `:162` `AbsOpHeaderFront` | `Operators.scala` (`Op`, `Dispatch.scala:70`) | ordinary functions under an operator name; `values/OverloadedFunction.java` dispatches | `OverloadSet.java`, `NamingCzar.jvmClassForSymbol` | the prelude declares its own | interp works / comp works | 30-38, 63, 90, 133, 149, 159, 161, 165, 172, 215, 216, 218, 233, 237, 249, 279, 280 |
| juxtaposition as a declarable operator | `basic/operators/juxtameaning.tex` | `Expression.rats:464` `MathPrimary`, `:612` `MathItem`, `:369` `Primary` | `Operators.scala:76-196` (`Juxt`), `:197` (`MathPrimary`); routed by `Dispatch.scala:95-96` | `Evaluator.forJuxt:648`, `forJuxtCommon:655`, `forMathPrimary:1108` | inherits from the resolver; `WellKnownNames.java:75` names the operator `juxtaposition` | declared flat on each numeric trait (`CompilerBuiltin.fsi:124`, `:168`, `:223`, `:284`, `:342`, `:393`, `:425`, and on `String` at `:39`) | works (both) | 1-4, 33, 76, 84, 85, 87, 88, 239, 296 |
| chained comparison (`a < b < c`) | `basic/operators/chained-multifix.tex` | `Expression.rats` (`ChainExpr` via the resolver) | `Operators.scala:388` | `Evaluator.forChainExpr:436` (the interpreter keeps the node) | `desugarer/ChainExprDesugarer.scala` via `PreDisambiguationDesugarer.java:96-99` — **compile path only** (`Shell.java:284-286`); `CodeGen.forChainExpr:1815-1816` is a `sayWhat` safety net | — | works (both), by different routes | — |
| conditional operators (`AND:`, `OR:`) | `basic/operators/conditionalops.tex`; `advanced/subscripting.tex:84` | `Symbol.rats:145` `condOp` | — | `PreDisambiguationDesugaringVisitor` replaces operands with thunks (`PhaseOrder.java:24`) | same desugaring | `CompilerBuiltin.fsi:453` `Boolean` | works (both) | 145 |
| enclosing operators | `basic/operators/enclosingops.tex` | `Symbol.rats:28` `Encloser`, `:31` `LeftEncloser`, `:34` `RightEncloser`, `:43` `EncloserPair` | `Operators.scala` | — | — | — | works (both) | 87, 88, 280 |
| subscripting operator methods (`opr[i]`, `opr[i] :=`) | `advanced/subscripting.tex:12`, `:42` | `Expression.rats:516` `SubscriptingLeft`, `:632` `Subscripting` | `Functionals.scala` (`SubscriptExpr`, `Dispatch.scala:90`) | `Evaluator.forSubscriptExpr:899` | `CodeGen.forSubscriptExpr:4907`, with `canCompile` at `:4922` requiring no static args, an operator, and the object a plain `VarRef` | — | interp works / comp partial | 1-3, 54, 56, 110, 169, 263 |
| big operator declarations | `advanced/subscripting.tex:114` | `Expression.rats:709`, `:716` | — | the single-declaration form emits a nullary operator reference and does not work | — | — | interp partial / comp absent | 39-46, 103 |

### Chapter 17, Conversions and Coercions

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| coercion declarations and invocations | `basic/conversions-coercions.tex` (8 sections, 800 lines) | `Method.rats:92` `Coercion` | `CoercionOracle.scala`, `CoercionTest.scala`, `compiler/index/Coercion.java` | **nothing**: no occurrence of `Coercion` or `coerce` anywhere under `interpreter/`; the desugaring is gated on `use_scala` (`Shell.java:280-282`), which `walk` turns off | `desugarer/CoercionDesugarer.scala` rewrites every `CoercionInvocation` to a function application before codegen (`Desugarer.java:129-133`); no coercion node reaches `CodeGen` | `coerce(x: FloatLiteral)` on `RR64`, `RR32` etc. (`CompilerBuiltin.fsi:413`, `:444`) | interp absent / comp works | 19 |
| automatic widening | `basic/conversions-coercions.tex:761` | — | `CoercionOracle.scala` | — | `asmbytecodeoptimizer/RemoveLiteralCoercions.java` | — | interp absent / comp partial | 146, 174, 283 |

### Chapter 18, Dimensions and Units; Chapter 26, Dimension and Unit Declarations

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| `dim` / `unit` declarations | `basic/dimensions.tex`; `advanced/defining-dimensions.tex:32`, `:94` | `OtherDecl.rats:35` `DimUnitDecl` | `IndexBuilder.scala:184-185` builds them, then `STypesUtil.scala:552`, `:556` `NI.nyi()` on the kinds | `BuildEnvironments.forDimUnitDecl:996` — a stub returning `false`; `EvalType` has no `TaggedDimType` case | no `forDimDecl`/`forUnitDecl` | none | absent on both | 26, 27 |
| dimension-typed values, unit arithmetic | `basic/dimensions.tex`; `basic-lib/dimensions.tex` | `Type.rats:359` `DimInfixOp`, `:364` `DimPrefixOp`, `:369` `DimPostfixOp`; `MayNewlineHeader.rats:369-423` `UnitVal`/`UnitExpr` | — | nothing evaluates | — | none | absent on both | 26 |
| absorbing units | `advanced/defining-dimensions.tex:364` | — | — | — | — | — | absent on both | 26 |

### Chapter 19, Tests and Properties

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| `test` declarations | `basic/tests.tex:87` | `OtherDecl.rats:118` `TestDecl` | **`IndexBuilder.scala:188` `bug("Not yet implemented: " + d)`** | `evaluator/CollectTests.java`, run by `fortress test` (`Shell.java:472-476`) | no `forTestDecl` | — | interp works / comp absent | 120, 121 |
| the generator form `test Id[gens] = Expr` | `basic/tests.tex:87` | `OtherDecl.rats:118` | as above | unimplemented and fatal | — | — | absent on both | 121 |
| `property` declarations | `basic/tests.tex:232` | `OtherDecl.rats:135` `PropertyDecl` | `IndexBuilder.scala:189`, `:301`, `:349` (`bug` / `NI.nyi`); `ApiTypeExtractor.scala:31` "PropertyDecl is not yet handled" | unimplemented | no `forPropertyDecl` | — | absent on both | 122, 125 |
| `TestSuite` | `basic/tests.tex:200`; `basic-lib/tests.tex` | — | — | does not ship (`Library/Testable.fss`, `QuickCheck.fss` are the nearest things) | — | — | absent on both | 123 |

### Chapter 27, Support for Domain-Specific Languages

| feature | spec | parser | checker | interpreter | codegen | prelude | status | ledger |
|---|---|---|---|---|---|---|---|---|
| the spec's `syntax OpenExpander Id CloseExpander = Expr` | `advanced/domain-specific-languages.tex` is 16 lines, entirely a `\note` deferring to the FOOL 2009 paper | — | — | — | — | — | absent on both — the only normative DSL form in the spec | 267 |
| `grammar … end` in an api, nonterminals, `<[ … ]>` templates | specified nowhere but in the grammar itself | `Syntax.rats:51` `GrammarDef`, `:86` `NonterminalDef`, `:149` `SyntaxDef`, `:190` `PreTransformer`; `templateparser/` (23 modules) | **no `TemplateGap` or `_SyntaxTransformation` case anywhere under `scala_src/typechecker/`** | `syntax_abstractions/` (30 java: `GrammarRewriter.java`, `Transform.java`, `ParserMaker.java`, `rats/RatsParserGenerator.java`); `BuildEnvironments.forGrammarDecl:1030` is a deliberate no-op; phase `GRAMMAR` (`PhaseOrder.java:40`) | the phase is in `compilerPhaseOrder` and the expander is world-neutral, but every grammar api reaches the interpreter prelude and the unit dies at DISAMBIGUATE | no compiler-world `FortressAst`/`FortressSyntax` | interp works / comp absent | 179-213, 222-244, 250, 253, 256, 261, 266-287, 288-291 |

### Parts IV–VI, the library chapters

The interpreter's library is `Library/` (53 `.fss`/`.fsi` pairs) plus `ProjectFortress/LibraryBuiltin/`; `Library/FortressLibrary.fss` is the 4,518-line prelude, of which 211 lines (4.7%) are the 108 `builtinPrimitive` native bindings (FACTS, "the interpreter's library fed to the compiler").

| feature | spec | library | compiler prelude | status | ledger |
|---|---|---|---|---|---|
| `Any`, `Object` | `basic-lib/objects.tex` | `LibraryBuiltin/AnyType.fss` | `AnyType.fss` (shared) + `CompilerBuiltin.fsi:17` `trait Object` | works (both) | — |
| `Boolean`, boolean intervals | `basic-lib/booleans.tex` | `Library/FortressLibrary.fsi` | `CompilerBuiltin.fsi:453` (no intervals) | interp partial / comp partial | 145 |
| the numeric tower | `basic-lib/numbers.tex`; `advanced-lib/numbers-advanced.tex` | see §4.2 | see §4.3 | interp works / comp flat and much smaller | 36, 37, 44, 45, 52, 53, 295 |
| negated relational operators | `basic-lib/Fortress.NegatedOperators.tex` | `Library/FortressLibrary.fss` | — | unverified | — |
| threads (`Thread[\T\]`) | `basic-lib/thread.tex` | `LibraryBuiltin/FortressBuiltin.fss`, `glue/prim/Thread.java` | absent | interp works / comp absent | 82 |
| algebraic constraints (`Monoid`, `Group`, `Ring`, `Field`, `Lattice`, …) | `advanced-lib/algebraic-constraints.tex`, 1,894 lines | **does not ship**; `Ring` and `Field` are in the published spec (`advanced-lib/algebraic-constraints.tex:1547-1556`; the `%` lines before them are the ASCII source of the display, see `dormant-code.md` §4.1); the fullest implementation-side statement is `Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE`, 1,329 lines, off the source path | absent | absent on both | 37 |
| comparison traits | `advanced-lib/comparison.tex` | `Library/FortressLibrary.fss:100-327` | `Library/CompilerAlgebra.fsi:14-27` (`StandardTotalOrder`, `Equality`, and nothing else) | interp works / comp partial | — |
| memory sequences and binary words | `advanced-lib/binary.tex` | unverified | absent | unverified | — |
| arrays, vectors, matrices | `library/default-libraries.tex`; `basic/expressions/aggregate.tex:152-170` | `Library/FortressLibrary.fsi:1247-1706`, `LibraryBuiltin/NativeArray.fss` | **absent**: `trait Matrix[\T, nat s0, nat s1\] extends Object end` (`Library/CompilerLibrary.fss:512`), declared empty; no `Array`, no `Vector`, no `Array1`/`2`/`3` | interp works / comp absent | 49-58, 72, 104-110, 246, 247, 292-299, 305 |
| `String` | `library/default-libraries.tex` | `Library/FortressLibrary.fss:3955` `trait String`, `Library/FlatString.fss`, `Library/String.fss`, `glue/prim/FlatString.java` | `CompilerBuiltin.fsi:25` `trait String`, `:51` `JavaString`, `:550` `StringVector` | interp works / comp partial — juxtaposition inserts spaces | 76, 138, 140, 141, 192 |
| `List`, `Map`, `Set` | `library/optional-libraries.tex` | `Library/List.fss`, `Map.fss`, `Set.fss`, `PureList.fss` | absent (`CompilerLibrary` lacks `HasRank`, `LexicographicOrder`, `Maybe`) | interp works / comp absent | 20, 71, 101, 134-137 |
| `Maybe` | `library/default-libraries.tex` | `Library/FortressLibrary.fsi:813-880` | present at `CompilerLibrary.fsi:194-204` but **wholly commented out**; `CompilerBuiltin.fsi:648-660` ships `Option`/`Some`/`NoneObject` instead | interp works / comp partial | 71, 138 |
| generators and reductions | `library/default-libraries.tex`; `advanced/parallelism-locality/defining-generators.tex` | `Library/FortressLibrary.fsi:598-812`, `1707-2025` | `GeneratorZZ32` only, plus the unwired `Library/GeneratorLibrary.fss` (469 lines) | interp works / comp absent | 46, 47, 74, 102, 221 |

### Appendices A, D, G, H

| feature | spec | implementation | status |
|---|---|---|---|
| the four calculi | `appendices/calculi/{basic,where,overloading,acffd}/calculus.tex` | `BasicCoreFortress/` (`BasicCoreFortress.scala`, `CFParser.scala`, `CFTest.scala`, two `.bcf` programs) — a separate core-calculus experiment, not part of the toolchain | separate artefact, unverified against the appendix |
| rendering of Fortress code | `appendices/rendering.tex` | `Fortify/fortify.el` + `fortify.sty`, driven by `bin/fortify` and `ant_tasks/FortifyTask` | works, with known defects | 62-66 |
| the two grammars | `appendices/grammars/concrete-syntax.tex`, `appendix-cst.tex` | the 61 `.rats` files under `parser/` are the implementation's grammar; the appendices are hand-maintained prose and the ledger's rows 1-13, 84-93 are all places where they diverge | partial | 1-13, 84-93, 143, 144, 166, 251 |

## 4. Enabling blocks versus things built on them

This section answers the question by name: which mechanisms the library's numeric tower stands on, what the tower itself is, and what the compiler prelude has of it.

### 4.1 The mechanism layer

These are the eight mechanisms the tower is built out of; for each, the module that implements it on each path, and whether the compiler path has it.

| mechanism | parser | checker | interpreter | codegen | compiler path has it? |
|---|---|---|---|---|---|
| traits with multiple inheritance | `TraitObject.rats:31`; `NoNewlineHeader.rats:31` `ExtendsWhere`, `:57` `Extends` | `TypeHierarchyChecker.scala`, `VarianceChecker.scala`, `types/TypeAnalyzer.scala` | `BuildEnvironments.forTraitDecl:797`, `BuildTraitEnvironment.java`, `types/FTypeTrait.java` | `CodeGen.forTraitDecl:4967`; traits become JVM interfaces (`NamingCzar.java`) | **yes** — but only for declarations with no where clause, no throws clause and no contract (`CodeGen.java:4980-4989`) |
| generic types (type parameters, static args) | `NoNewlineHeader.rats:269`, `:286`; `MayNewlineHeader.rats:449` | `types/TypeSchemaAnalyzer.scala`, `STypesUtil.scala` | `types/FTypeGeneric.java`, `GenericTypeInstance.java`, `values/FGenericFunction.java` | template bytecode stamped at class-load by `runtimeSystem/InstantiatingClassloader.java` + `Naming.java` | **yes** |
| `nat` (and `int`, `bool`) parameters | `NoNewlineHeader.rats:286`; `MayNewlineHeader.rats:241`, `:307` | **no**: `STypesUtil.scala:550-557` `NI.nyi()` for `KindNat`, `KindInt`, `KindBool`, `KindDim`, `KindUnit` | `types/IntNat.java`, `SymbolicNat.java`, `FTypeNat.java`; matched at dispatch | encoded by `NamingCzar.java:1827-1831`, `:1906-1910` | **no** — and the wall is the checker, which the code generator sits behind; ledger row 307 |
| operator declaration, including `opr` declared inside a trait | `Parameter.rats:118-180` `OpHeaderFront`; `Method.rats:34` `MdDecl` | `Operators.scala` (`Op`, `Dispatch.scala:70`) | ordinary functional methods; `values/FunctionalMethod.java` | `OverloadSet.java`, `NamingCzar.jvmClassForSymbol` | **yes** — the compiler prelude declares its own operators this way (`CompilerBuiltin.fsi:412-441`) |
| multiple dispatch on run-time argument types | — | `overloading/OverloadingChecker.scala`, `OverloadingOracle.scala`, `ExclusionOracle.scala` | `values/OverloadedFunction.java:787` `bestMatch` | `compiler/OverloadSet.java:1944` generates a dispatch method testing types most- to least-specific | **yes**, with two holes over `comprises` unions (rows 77, 78) |
| juxtaposition as a declarable operator | `Expression.rats:464` `MathPrimary`, `:612` `MathItem` | `Operators.scala:108-170` | `Evaluator.forJuxt:648`, `forMathPrimary:1108` | inherited from the pre-AST resolver `parser_util/precedence_resolver/Resolver.java` | **yes** — but flat: each compiler-prelude numeric trait declares its own `opr juxtaposition` (`CompilerBuiltin.fsi:124`, `:168`, `:223`, `:284`, `:342`, `:393`, `:425`) rather than inheriting one from a ring |
| coercion | `Method.rats:92` `Coercion` | `CoercionOracle.scala`, `compiler/index/Coercion.java` | **no** — no `Coercion` or `coerce` anywhere under `interpreter/`; `Shell.java:280-282` gates the desugaring on `use_scala`, which `walk` turns off (`Shell.java:422`) | `desugarer/CoercionDesugarer.scala` via `Desugarer.java:129-133`, before codegen | **yes** — this is the one mechanism in this table the compiler path has and the interpreter does not; ledger row 19 |
| where clauses | `NoNewlineHeader.rats:152` `Where`, `:176` `WhereBinding`; `MayNewlineHeader.rats:136`, `:151` | type bindings via `TypeAnalyzer.extendJ`; **non-type bindings `NI.nyi`** (`staticenv/KindEnv.scala:126`) | `BuildEnvironments.processWhereClauses:908` | **refused outright**: `CodeGen.java:2937` (functions), `:4076` (objects), `:4983` (traits) | **no** |

The shipped tower uses six of the eight: multiple inheritance, generics, `nat` parameters, operators declared in traits, multiple dispatch and juxtaposition; it does not use where clauses (the spec's covariance idiom is rejected, row 17) and does not use coercion declarations of its own.

### 4.2 The tower in `Library/FortressLibrary.fss`

The line numbers are in the component; the api repeats each declaration in `Library/FortressLibrary.fsi` at the line given in parentheses.

| trait | declaration | line |
|---|---|---|
| `Equality[\T extends Equality[\T\]\]` | root of the comparison side | `FortressLibrary.fss:100` (`.fsi:73`) |
| `StandardPartialOrder[\T\]` | `<`, `>`, `<=`, `>=`, `CMP` | `:213` (`.fsi:167`) |
| `StandardMin` / `StandardMax` / `StandardMinMax` | `MIN`, `MAX`, `MINMAX` | `:235`, `:246`, `:257` (`.fsi:184`, `:195`, `:206`) |
| `StandardTotalOrder[\T\]` | extends the partial order | `:270` (`.fsi:219`) |
| **`AdditiveGroup[\T extends AdditiveGroup[\T\]\]`** | `getter zero()`, `opr +`, binary `opr -`, unary `opr -` | `:328-334` (`.fsi:252`) |
| `AnyMultiplicativeRing` | the exclusion marker, empty | `:336` (`.fsi:260`) |
| **`MultiplicativeRing[\T\] extends { AdditiveGroup[\T\], AnyMultiplicativeRing }`** | `getter one()`, `opr TIMES`, **`opr juxtaposition(self, other:T) = self TIMES other`**, `opr ^` | `:340-348` (`.fsi:264`) |
| `Number extends { StandardPartialOrder[\Number\], StandardMinMax[\Number\], AdditiveGroup[\Number\], MultiplicativeRing[\Number\] } comprises { RR64 }` | the meeting point of the order side and the algebra side | `:349-352` (`.fsi:273`) |
| **`RR64 extends Number comprises { Float, FloatLiteral, RR32, QQ }`** | | `:422` (`.fsi:335`) |
| `QQ extends { RR64, StandardPartialOrder[\QQ\] }` | | `:521` (`.fsi:370`) |
| `AnyIntegral extends { QQ }` | | `:609` (`.fsi:406`) |
| `Integral[\I\] extends { StandardTotalOrder[\I\], AnyIntegral }` | | `:611` (`.fsi:408`) |
| **`ZZ32 extends { ZZ64, Integral[\ZZ32\] } comprises { Int, IntLiteral }`** | | `:642` (`.fsi:461`) |
| `ZZ64 extends { ZZ, Integral[\ZZ64\] } comprises { Long, ZZ32 }` | | `:700` (`.fsi:495`) |
| `NN64 extends { ZZ, Integral[\NN64\] }` | | `:770` (`.fsi:434`) |
| `ZZ extends Integral[\ZZ\]` | | `:822` (`.fsi:533`) |

So the two chains Pavol asked for, top down:

`Equality` → `StandardPartialOrder` → `AdditiveGroup` → `MultiplicativeRing` → `Number` → **`RR64`** (`FortressLibrary.fss:100, 213, 328, 340, 349, 422`).

`Equality` → `StandardPartialOrder` → `StandardTotalOrder` → (`AdditiveGroup` → `MultiplicativeRing` → `Number` → `RR64` → `QQ`) → `AnyIntegral` → `Integral` → `ZZ` → `ZZ64` → **`ZZ32`** (`:100, 213, 270, 328, 340, 349, 422, 521, 609, 611, 822, 700, 642`).

The two spec names Pavol has asked about, `Ring` and `Field`, are **not** in this tower: the shipped names are `AdditiveGroup`, `AnyMultiplicativeRing` and `MultiplicativeRing`, and `Ring`/`Field` are specified (`Specification/advanced-lib/algebraic-constraints.tex:1547-1556`, `:1767` onward; the `%` lines are the ASCII source of the display, corrected 2026-09-16 per `dormant-code.md` §4.1) but not shipped (ledger row 37).

The array layer sits beside the tower, not inside it: `HasRank` (`:1584`), `Rank[\nat n\]` (`:1592`), `Indexed[\E,I\]` (`:1636`), `ReadableArray[\E,I\]` (`:1802`), `Array[\E,I\]` (`:1886`), and then the two sized traits that carry algebra, `Vector[\T extends Number, nat s0\]` (`:2189`) and `Matrix[\T extends Number, nat s0, nat s1\]` (`:2497`), which inherit `+`, `-`, unary `-` and `zero` from `AdditiveGroup` and are declared `excludes { AnyMultiplicativeRing }` so that juxtaposition stays the inner product (ledger rows 292, 293, 295).

`Vector` and `Matrix` are where all six mechanisms meet at once: multiple inheritance (they extend an array trait and an algebraic trait), generics and `nat` parameters in one parameter list, operators declared in a trait, multiple dispatch on rank, juxtaposition redefined as the inner product, and the `T extends Number` bound which is the one that works for every element type and rank (row 295).

### 4.3 What the compiler prelude has of the tower

Nothing above `Number`, and `Number` itself is an empty marker.

| tower name | compiler prelude |
|---|---|
| `Equality[\T\]` | present, minimal: `Library/CompilerAlgebra.fsi:24-26` (`opr =` only) |
| `StandardTotalOrder[\T\]` | present, minimal: `CompilerAlgebra.fsi:16-22` (five abstract comparison operators, no algebra) |
| `StandardPartialOrder`, `StandardMin`, `StandardMax`, `StandardMinMax` | **absent** |
| `AdditiveGroup` | **absent** |
| `AnyMultiplicativeRing`, `MultiplicativeRing` | **absent** |
| `Number` | present but empty: `trait Number excludes { String } end`, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:95-96` |
| `RR64` | present, **flat**: `trait RR64 extends { Number, Equality[\RR64\] } excludes ZZ64`, with `+`, `-`, `/`, `juxtaposition`, `DOT`, `^`, `MIN`, `MAX`, `SQRT` and the comparisons all declared on the trait itself (`CompilerBuiltin.fsi:412-441`) |
| `QQ`, `AnyIntegral`, `Integral[\I\]` | **absent** |
| `ZZ32` | present, flat: `CompilerBuiltin.fsi:201-255` |
| `ZZ64`, `ZZ`, `NN32`, `NN64`, `IntLiteral`, `FloatLiteral`, `RR32` | present, flat: `CompilerBuiltin.fsi:102`, `:146`, `:256`, `:313`, `:369`, `:412`, `:443`, `:447` |
| `Vector`, `Array`, `Array1`/`2`/`3` | **absent** |
| `Matrix` | present as an empty stub: `trait Matrix[\T, nat s0, nat s1\] extends Object end`, `Library/CompilerLibrary.fss:512` (`.fsi:230`) — and it is the only `nat`-parameterised declaration in the whole compiler prelude |

The shape of this is worth naming plainly: the compiler prelude is not a smaller version of the interpreter's tower, it is a different design — a flat list of numeric traits each carrying its own operators, with no algebraic abstraction between them.

That is what one would write if the checker could not handle `nat` parameters and codegen refused where clauses, which is exactly the situation (§4.1); FACTS already records the same conclusion from the other direction ("the compiler's library is written to stay inside what the checker can do", ledger row 307).

### 4.4 The user code

The user code that matters is `explorations/apl/mg/` (the focused APL base: six components and five apis, 1,292 lines, beside five probe files) and `explorations/run-c4/src/` (the hand-written C4 program, 621 lines), with `explorations/apl/microgpt/` the earlier universal base.

What it stands on, from the layers below it:

The array vocabulary `explorations/apl/mg/FlatArrays2.fsi` is built entirely out of §4.1's mechanisms: one operator declaration generic in the element type by its bound and in the index type serves every rank — `opr +[\T extends Number, I\](a: Array[\T,I\], s: T): Array[\T,I\]` (`FlatArrays2.fsi:53`) — while the shape-checking declarations carry shared `nat`s — `opr ×[\T extends Number, nat n, nat d\](a: Matrix[\T,n,d\], b: Matrix[\T,n,d\])` (`:60`) and `opr juxtaposition[\nat p, nat n, nat d, nat m\](x: Array3[\RR64,0,p,0,n,0,d\], y: Array3[\RR64,0,p,0,d,0,m\])` (`:119`).

It stands on the library tower through the `T extends Number` bound, on `Vector`/`Matrix`/`Array3` for rank dispatch, on `array[\T\](n).fill` and `map` from `Array` (`FlatArrays2.fss:12-15`), and on `NatReflect` for views whose shapes are run-time values (`FlatArrays2.fss:9`, and the comment at `:1-6` naming `FortressLibrary.fss:1922-1934` as the idiom it follows).

The APL layer adds one more mechanism the tower does not use: user grammars with templates (`explorations/apl/mg/AplMgSyntax.fsi`, 446 lines), which the compiler path does not have at all (§3, chapter 27).

So the layering, bottom to top: the eight mechanisms of §4.1, of which the compiler path has five and a half; the tower and array layer of §4.2, of which the compiler path has the numeric leaves only; and this user code, none of which compiles today — the nearest measured statement is that the three kernels it is made of fail with `Array is undefined`, `Vector is undefined`, `Array3 is undefined` (FACTS, execution model; ledger rows 303, 305).

## Not verified

The memory model (chapter 21, 454 lines of ordering rules) is not checked against `runtimeSystem/Transaction.java` or `evaluator/transactions/`; no probe exists and none was written here.

Early termination of threads (`advanced/parallelism-locality/early-termination.tex`) is not traced past the existence of `evaluator/tasks/`.

`advanced-lib/binary.tex` (chapter 43, Memory Sequences and Binary Words) is not traced to any library file.

`basic-lib/Fortress.NegatedOperators.tex` (chapter 34) is not traced to a library declaration.

Varargs and keyword parameters are verified only for the interpreter (ledger rows 11, 130); the compiler path's handling of them was not read.

The operator-parameter kind (`basic/trait-parameters.tex:156`) is verified in the parser, in `NamingCzar` and in the interpreter's `FTypeOpr`, but no probe shows it working on the compile path.

The four calculi in appendix A are not compared against `BasicCoreFortress/`; that directory's relationship to the appendix is asserted by its `README.txt` only, which was not read here.

Every "absent" attributed to the code generator rests on reading `CodeGen.java` for a `forX` method and on `defaultCase` throwing (`CodeGen.java:1668-1670`); the cases marked so were not each run through `fortress compile`. The ones that *have* been run are the ones carrying a ledger row (71-82, 288-291, 302-310).

The claim that `atomic <expr>` does not compile while `atomic do … end` does is a code reading (`CodeGen.forBlock:1760-1766` handles the flagged block; there is no `forAtomicExpr`), not a run.

The claim that the top-level `CompilerLibrary/` directory is dead rests on `git grep` over `bin/`, `build.xml`, `ProjectFortress/src` and `default_repository/` finding no reference and on its absence from `fortress.source.path`; a runtime path built from an environment variable would not show up in that search.

The 262-page figure for `Specification-1.0-frozen/fortress.1.0.pdf` is read from the PDF's page-tree `/Count`; the 596-page figure for the draft is the last page number in `Specification/fortress/fortress.toc`, not a page count of `Specification/fortress.pdf` (that file uses object streams and was not decompressed).

## Decisions not made

Whether to correct `FACTS.md`'s line about `Specification-1.0-frozen/`: the sources in that directory are not the 1.0 sources but a byte-identical copy of the draft's (§1.2), and only the PDF beside them is the 1.0 artefact. The entry as written can mislead a future search into thinking there are two versions of the prose to compare. Whether it is amended, superseded in place per the knowledge base's own rule, or left alone is the owner's call.

Whether the ledger's standing convention "the chapters cited are byte-identical in `Specification-1.0-frozen`" should be narrowed to name the two files where it fails (`basic-lib/objects.tex`, `fortress/fortress.tex`).

Whether `Library/GeneratorLibrary.fss` (469 lines of compiler-world generator and reduction protocol, imported by nothing) is a starting point for closing ledger row 74 or dead weight to be left alone. It is the largest piece of finished compiler-world library code in the tree that nothing uses, and deciding what it is changes the shape of worklist item 2.

Whether the top-level `CompilerLibrary/` directory is kept, documented as dead, or removed — part one already lists it under dead modules; what this part adds is that it contains a 2,523-line `FortressLibrary.fsi` whose relationship to `Library/FortressLibrary.fsi` was not established here and would need its own pass, and that our own root `README.md:155` presents the directory as live, so whatever is decided the README line needs to change with it.

Whether the three interpreter-path stubs in `Library/FortressLibrary.fss:63-89` — `shared`, `isShared`, `localize` returning their arguments, and `region`/`here` returning `Global` — count as "implemented" for the purposes of the map. They are named here as stubs; the map's status column calls them partial, and whether that is the right word for chapter 23 is a judgement the owner may want to set.

Whether the where-clause refusal in codegen (`CodeGen.java:2937`, `:4076`, `:4983`) belongs in the ledger as a row of its own. It is not recorded anywhere in the 309 rows, and it is the reason a large class of spec-legal declarations cannot be compiled — including anything written to the spec's covariance idiom (row 17). Recording it would be a new row, which is the owner's to authorise.

<!-- The distillation audit of the fortress-repo skill, 2026-10-08, by a read-only reader agent: what daily work needs from the territory map and repo-internals that the skill lacks, the pre-training quiz graded against the record, triggers for four bare pointers, and a draft "Fortress as a language" section with two placements; nothing in the skill was changed. -->

# The `fortress-repo` skill: a distillation audit

## How to read this

This note audits the `fortress-repo` skill (`.claude/skills/fortress-repo/SKILL.md` and its parts under `references/`). It has four sections. Section A lists knowledge that daily work needs and the skill lacks. Section B grades the pre-training quiz (`explorations/reviews/fortress-pretraining-quiz.md`). Section C proposes triggers for four pointers. Section D drafts a section on Fortress as a language. Nothing in the skill was edited. The skill's writer applies what the curator approves.

Terms used below:

- **Walk** is the interpreter: `bin/fortress P.fss`.
- **The compiled path** is `bin/fortress compile P.fss`, then `bin/fortress run P`.
- **The one library** is the interpreter's library: `Library/FortressLibrary.fss` and `.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, and the other files of `Library/` and `LibraryBuiltin/` that are not the compiler's. The curator decided that both paths will use it (POSITIONS, "The library route").
- **The prelude** is the compiler's own library: `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`.
- **The switch-over** is the step at which the compiled path moves onto the one library and the prelude is deleted (SKILL.md, opening).
- **FACTS** is `explorations/coordinator/FACTS.md`, what is established. **POSITIONS** is `explorations/coordinator/POSITIONS.md`, the curator's decisions. **The ledger** is `explorations/fortress-gap-ledger.md`, one row per known gap. A FACTS or POSITIONS entry is cited by its bold title, a ledger row by its number.
- **`T`** below is `explorations/coordinator/tools/facts-extract.sh`, the tool that prints one slice of the record (`references/records.md`, "Reading the record").

Read for this audit: every part of the skill except `sources.md`; the quiz; the seven notes of `explorations/coordinator/map/` and `explorations/repo-internals.md` (headings first, then the sections on daily work); slices of FACTS, POSITIONS and the ledger; the specification at the passages cited; the code at the lines cited. `explorations/reviews/decisions-review/judgement.md` §1, a primer on the designers' aims, was read for section D.

One warning applies to the whole map. Its five surveys were written on 2026-09-16 and the walkthrough on 2026-09-20, before the climb batches. Some of their statuses are now false. For example, `compile-path-walkthrough.md` §4 says walk has no coercion at all, and `spec-to-implementation.md` §3 says the checker cannot check `nat` parameters. Both changed (FACTS, "Under `walk`, the interpreter converts by coercion at its three kinds of type check"; "The compiled type checker checks `nat` and `int` static parameters"). Section C turns this into a rule for the triggers.

## A. What daily work needs that the skill lacks

Sixteen items, most important first. Each gives the text as it would stand in the skill, its place, its source, and why an agent needs it at that moment.

### A1. Which desugarings run on which path

- **Text.** Walk and the compiled path run the same phases with different switches. Walk turns off these desugarings: coercion, chained comparison, compound and tuple assignment with subscripts, case expressions, type ascription, typecase, and the marking of bodiless declarations as abstract. Walk evaluates those nodes itself (`Evaluator.forChainExpr`, `forCaseExpr`, `forTypecase`, `forAsExpr`, `forAssignment`), and it converts by coercion at dispatch (`OverloadedFunction.bestMatchWithCoercion`). So if you fix one of those desugarers, only the compiled path changes. If walk is wrong there, fix the evaluator. The compiled path also gives every unbounded static parameter the bound `Object`; walk does not.
- **Place.** `references/compiler.md`, after the paragraph on the phases (line 10), as a short table "Which desugarings run on each path". One line in `references/interpreter.md`, "After an edit here", points to it.
- **Source.** `map/modules-and-phases.md` B.5 and B.14; `map/compile-path-walkthrough.md` §4, "The switches, which are what make the two paths differ". Checked in the code: `Shell.java:268-290` (the getters, three of them gated on `use_scala`), `:371-386` (`useCompilerLibraries`, `useInterpreterLibraries`), `:420-423` (walk sets `setScala(false)`); the reads at `Desugarer.java:124`, `:130`, `:141`, `PreTypeCheckDesugarer.java:111`, `:117`, `:123`, `PreDisambiguationDesugarer.java:96`, `PreDisambiguationDesugaringVisitor.java:136`; walk's own sites at `Evaluator.java:99`, `:108`, `:120`, `:391`, `:436`, `:1382`; walk's coercion at `OverloadedFunction.java:1446`, `:1477` (FACTS, "Under `walk`, the interpreter converts by coercion at its three kinds of type check").
- **Why then.** The agent meets this when it chooses which file to edit for a defect seen on one path. `compiler.md:10` says only that a switch of `Shell.java` decides which desugarings run. It does not say which, so a fix can land in a desugarer that the failing path never runs.

### A2. The two paths share almost no run-time code

- **Text.** After the shared phases, walk and the compiled path share almost no code. Values: walk's `interpreter/evaluator/values/` (`FInt`, `FFloat`), the compiled `compiler/runtimeValues/` (`FZZ32`, `FRR64`). Number natives: walk's `interpreter/glue/prim/Int.java`, `Long.java`, `NN32.java`, `UnsignedLong.java`; the compiled `nativeHelpers/simpleIntArith.java` and its siblings. Tasks and transactions: walk's `interpreter/evaluator/tasks/` and `transactions/`; the compiled `runtimeSystem/`. Dispatch: walk's `OverloadedFunction.bestMatch`, a search at run time; the compiled path's dispatch method, which `OverloadSet` generates. A fix of a rule on one path is not a fix on the other. Say in your report which path you fixed, and whether the other has the same defect.
- **Place.** `references/compiler.md`, a short section "What the two paths share" near the top. One line in `references/interpreter.md`.
- **Source.** `map/modules-and-phases.md` B.7, B.11 (the two `runtimeSystem/` classes that walk also uses: `ByteCodeWriter` and `SimpleClassLoader`), B.12, B.14; `map/README.md` §2 ("Tasks and transactions exist twice ... a fix in one is not a fix in the other"); the directories listed with `ls`. The overflow rule is an example of one rule built twice: FACTS, "Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow` when the result does not fit".
- **Why then.** The agent needs this when it scopes a fix and its tests, above all when a brief says "fix X" and does not name a path.

### A3. What the compiled path cannot compile yet

- **Text.** The code generator has no visitor for `label` and `exit`, `spawn`, a local function declaration, an object expression, an array literal such as `[1 2 3]`, or `atomic` used as an expression. It refuses any declaration with a `where` clause or a contract (`requires`, `ensures`, `invariant`). The prelude has no array types: only `ZZ32Vector` and `StringVector`. Its `for` loops, comprehensions and reductions work over `ZZ32` ranges only, with reductions over `ZZ32` and `String`. Until the switch-over, a compiled test uses none of these, or it names the wall in an `XXX` test (`tests-writing.md`).
- **Place.** `references/compiler.md`, "What the code generator does", after line 21, or a new subsection "What the compiled path cannot compile yet".
- **Source.** `grep -c 'public void for\(Label\|Exit\|Spawn\|LetFn\|ObjectExpr\|ArrayElements\|AtomicExpr\)' ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java` prints `0`. The guards on `where` clauses and contracts are at `CodeGen.java:2967-2971`, `:4107-4109`, `:5027-5029`. `map/spec-to-implementation.md` §3, the rows of chapters 5, 7, 9, 10, 12 and 13. The prelude: `Library/CompilerLibrary.fsi:111-168` (`GeneratorZZ32`, `Range extends GeneratorZZ32`, `ReductionString`, `ReductionZZ32`) and `:281` (an empty `Matrix`). FACTS, "The compiled path's only array-like types are `ZZ32Vector` and `StringVector` ...".
- **Why then.** The agent needs this when it writes a compiled test or chooses its test folder. Without it, the agent finds the wall only after a build and a failed compile.

### A4. Library decisions that the skill does not list

- **Text** (bullets added to the list of the curator's decisions):
  - Scalar ranges are over `ZZ32` only. A range over another integer type is a static error, and walk stops at its construction. Write a wider counter as a `ZZ32` loop that widens its index.
  - Fixed-width integer arithmetic raises `IntegerOverflow` on both paths. Code that means to wrap uses the wrapping operators `DOTPLUS`, `DOTMINUS` and `DOTTIMES` (∔ ∸ ⨰). Parenthesise every such expression fully, because their precedence is stated only among themselves.
  - `SUM` and `PROD` are generic over `AdditiveGroup` and `MultiplicativeRing`. If nothing at the call fixes the element type, write it: `SUM[\ZZ32\][j <- 0#n] f(j)`. Under walk, an unwritten one binds `Bottom`, and the reduction dies at its first element.
  - A `nat` static parameter is an `NN32` value and an `int` parameter a `ZZ32` value. A larger size is refused.
  - `ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`.
- **Place.** `references/library.md`, "The curator's decisions on the library", after line 19.
- **Source.** POSITIONS, "Scalar ranges are over `ZZ32` only"; "Fixed-width overflow raises `IntegerOverflow` under `walk`"; "`SUM` and `PROD` without the `Number` catch-all (answer 7)."; "Sizes."; "Mixed widths convert by declared coercions (answer 8)." FACTS, "The one library's scalar ranges are over `ZZ32` alone"; "The one library's number tower is flat". Ledger row 424 (the unwritten static argument; its F-bounded half is still open).
- **Why then.** The agent needs these when it designs a library change, or writes a test that uses ranges, integers or reductions. `library.md:15-19` lists five decisions; these five others change what a correct program is.

### A5. The first test program, and its traps

- **Text.** A test program is `component Name`, `export Executable`, its declarations, `run(): () = do ... end`, and a last `end`. `(*)` starts a comment to the end of the line; `(* ... *)` comments nest. Under walk, `assert(x, y, msg)` checks that `x` equals `y`, for any types. The prelude declares `assert(x, y)` only at `ZZ32`, `String` and `Character`. Do not name a variable or a parameter after a functional method of the library, such as `even`, `numerator` or `shift`: the disambiguator refuses it with "Variable even is already declared." A numeral does not bind to `NN32`, `NN64` or `RR32` on either path: `a: NN32 = 3` is refused, and `a: NN32 = unsigned(5)` checks.
- **Place.** `references/tests-writing.md`, a short section "A test program" before "Where a test goes, and how it passes".
- **Source.** `ProjectFortress/tests/RangeZZ32RungJ.fss:3-9` and its last line; `ProjectFortress/compiler_tests/CastBindRungG.fss`; `ProjectFortress/src/com/sun/fortress/parser/Spacing.rats:53-54` (the `(*)` comment); `Specification/basic/lexical-structure.tex`, section "Comments"; `Library/FortressLibrary.fsi:235-249`; `Library/CompilerLibrary.fsi:35-50`; FACTS, "Every functional-method name of the library is reserved in every program that imports it"; ledger row 454.
- **Why then.** Every source edit starts with a test (SKILL.md, "Rules for every task"), so every agent writes one. Each trap above costs a failed harness run of 15 to 25 s (`tests-running.md:66`) and a diagnosis.

### A6. Compiler tests pin the text of diagnostics

- **Text.** 224 of the 549 `.test` files in `compiler_tests/` pin a whole diagnostic with `compile_err_equals`, its `file:line:column` span included. Before you change the text of a diagnostic, grep the `.test` files for it, and update every one in the same commit. If you add or remove a line above a pinned span in a compiler test program, the span moves.
- **Place.** `references/tests-writing.md`, "Names, comments, citations"; or `references/compiler.md`, "Testing an edit here".
- **Source.** `map/test-coverage.md` B, item 2 ("which is why a change to any error message is a visible, localized test failure"). Counted today: `grep -l compile_err_equals ProjectFortress/compiler_tests/*.test | wc -l` prints 224; `ls ProjectFortress/compiler_tests/*.test | wc -l` prints 549. Example: `compiler_tests/XXX0a.test`.
- **Why then.** The agent needs this before it edits a message of the disambiguator, the checker or the code generator, or a line of an existing compiled test program.

### A7. A grammar rule lives in two copies

- **Text.** The template parser, `parser/templateparser/`, holds its own copy of every module of the main grammar, and `Gaps.rats` besides. If you change a rule in `parser/*.rats`, make the same change in its copy. The suites check the copy through one green program only. Juxtaposition and operator precedence are not in the grammar: `parser_util/precedence_resolver/` resolves them, from the generated `Operators.java`.
- **Place.** `references/toolchain.md`, beside "The generated sources are committed" (line 8); or `references/compiler.md`, "Before an edit".
- **Source.** `map/README.md` §7, the rows `parser/*.rats` and `parser_util/precedence_resolver/`; `map/modules-and-phases.md` B.2; `ls ProjectFortress/src/com/sun/fortress/parser/templateparser/`; `templateparser/TemplateParser.rats:15-57`, which instantiates its own copies.
- **Why then.** The agent needs this at any parser edit. A fix to the main grammar alone leaves the templates of user grammars on the old syntax.

### A8. Walk checks overload sets at load

- **Text.** Walk has no type checker, but it checks overload sets while it loads a program. It refuses: two declarations that its parameter-by-parameter check cannot order, unless a generic declaration beside a plain one is ordered by their declared domains or the overlap is covered through `comprises` clauses; two functional methods that break the Meet Rule for their providing type; an overloaded function whose single parameter is written bounded by `Any`. It also checks the main component's `comprises` clauses. Test such a refusal with `load_exception_contains` (`tests-writing.md`).
- **Place.** `references/interpreter.md`: rewrite the first bullet of "What walk does not do" ("Walk does no static checking", line 7), and widen "Checks at load" (line 25).
- **Source.** FACTS, "Walk's load check reads a generic declaration beside a plain one on declared domains, and covers an overlap through `comprises` clauses, where its parameter-by-parameter check refuses"; "Walk applies at load the Meet Rule for Functional Methods per providing type ..."; "Walk checks at load the `comprises` clauses of the program's main component ...". Code: `OverloadedFunction.java:497-500`, `:693-778`.
- **Why then.** The agent needs this when a library edit adds an overload, or when a walk test stops at load with an ambiguity message. The present line suggests that walk accepts any overload set.

### A9. The gate's two report-only stages

- **Text.** The gate has two more stages, which report and are never red on their own: the checker count (`explorations/coordinator/tools/checker-count/run.sh`) and the distance (`explorations/coordinator/tools/distance/run.sh`). Both run the compiled checker over the one library. Their tables are `checker-count.txt` and `distance.txt` beside `summary.txt` in the landed gate's folder, and `explorations/compile-ladder/gate/distance-sites.tsv`. If your edit is only under the test corpora, the texts, `explorations/`, `interpreter/evaluator/`, `interpreter/glue/` or the test harness, it cannot move them: do not run them. Take your "before" from the last landed tables. The checker count runs a copy of `compiler/StaticChecker.java` ahead of the real one. After you edit that file, the table's `#shadow` line reads `STALE`, and the count measures the old copy until the copy and its checksum in `run.sh` are refreshed.
- **Place.** `references/gate.md`: "What it runs" (two more steps) and "What it writes".
- **Source.** POSITIONS, "The checker count is measured, never red."; FACTS, "The checker-count and distance stages read only the compiler's phases, so an edit to the test corpora, the texts or walk's evaluator and natives cannot move them"; `checker-count/run.sh:22-33`, `:44`, `:96-98`; `explorations/coordinator/climb-batch-workflow.js:677` (the "before" is the landed table) and `:1098`; `ls explorations/compile-ladder/climb-batch-9/gate/`; `map/README.md` §0 ("Gate") and §7 (row `scala_src/typechecker/`).
- **Why then.** The agent needs this when it runs a gate, or when its brief asks for the count before and after a checker or library edit. `gate.md` lists seven steps and names neither stage.

### A10. Loops and reductions are library code

- **Text.** A `for` loop, a comprehension and a big operator are calls into the library. The shared desugarer turns `for x <- g do b end` into `g.loop(fn x => b)`, and a comprehension or a `SUM` into `__generate` and `__bigOperator` calls on the library's reduction objects (`trait Generator` and `trait Reduction` in `Library/FortressLibrary.fsi`; `Library/RangeInternals.fss` for ranges). So a failure inside a loop or a reduction is most often in the library's generator or reduction code, and its fix is a library edit.
- **Place.** `references/library.md`, its opening; or `references/interpreter.md`, "Running a program".
- **Source.** `map/modules-and-phases.md` B.5 (PRETYPECHECKDESUGAR); `map/spec-to-implementation.md` §3, chapter 13, the rows "`for` loops and generators", "comprehensions", "reductions and big operators"; `Library/FortressLibrary.fsi:731`, `:753`, `:834`, `:1856-1924`; ledger row 424, whose failure is reported in the range's `generate` (`Library/RangeInternals.fss:1032`).
- **Why then.** The agent needs this when it debugs a loop or a reduction under walk, before it looks in the evaluator.

### A11. Library files that no program can reach

- **Text.** `Library/incomplete/` and the two `*.INCOMPLETE` files are not on the source path. No program can import what they declare: among others the specified algebraic traits (`Monoid`, `Ring`, `Field`), the SI units and the negated operators. `Library/GeneratorLibrary.fss` is a compiler-world generator protocol that nothing that runs imports. Before you cite a library declaration as the library's way, check that a running program can reach it.
- **Place.** `references/library.md`, the opening list.
- **Source.** `map/dormant-code.md` §1.2, §1.3; `default_repository/configuration:44` (the source path); `map/spec-to-implementation.md` §2, "prelude".
- **Why then.** `library.md` tells the agent to study how the library already does a thing. A search then finds declarations under `Library/incomplete/` that look live.

### A12. What the suites do not guard

- **Text.** The suites do not guard: the bytecode optimizer (no test), syntax abstraction (one green program), the linker's aliasing of apis, `fortress unparse`, the round trip of the `.tfi` and `.tfs` caches, and any behaviour above one thread except the gate's atomic runs. If your edit is in one of these, your own tests are its only check. Say so in your report.
- **Place.** `references/tests-running.md`, "When to run a whole suite".
- **Source.** `map/test-coverage.md` C.1 and C.3; `map/README.md` §2 (the fact on what the gate is blind to) and §7, column "Blind".
- **Why then.** The agent needs this when it decides what to test after an edit in those modules. Dated 2026-09-16: check the count of a module's tests before quoting it.

### A13. The specification's own notes say what was never built

- **Text.** The draft build prints the team's 229 `\note{}` boxes; a release build hides them. Many say that a feature is not implemented, for example "Reduction variables are not yet supported." Before you record a missing feature as a gap, grep the notes of its chapter: `grep -n '\\note{' Specification/<file>.tex`. The team's written rationale is in the Internal Document appendix: `Specification/appendices/FAQ.tex` and `future.tex`.
- **Place.** `references/specification.md`, after "The specification exists in three copies".
- **Source.** `map/design-intent-sources.md`, header and §4; `map/dormant-code.md` §4.2; `grep -rn '\\note{' Specification --include=*.tex | wc -l` prints 229; `Specification/fortress/fortress.tex:24-31` (the release switch); `Specification/basic/expressions/for.tex:15`.
- **Why then.** The agent needs this when it explores whether a missing feature is a gap or was never built (`exploring.md`, step 5).

### A14. The compiled dispatch ignores contravariance

- **Text.** The compiled dispatch ignores the contravariance of arrow-typed parameters. The property `fortress.disable.contravariance` defaults to true, and `OverloadSet` then passes `0` for the variance. This is the team's retreat of 2012 (commit `c35aac139`).
- **Place.** `references/compiler.md`, "Known shapes".
- **Source.** `map/README.md` §2; `map/dormant-code.md` §2.2; `ProjectProperties.java:327-328`; `OverloadSet.java:1188`.
- **Why then.** The agent needs this when a compiled dispatch over function-typed arguments picks another declaration than walk does.

### A15. Dotted or functional: how the library chooses

- **Text.** When you add a method to the library, choose its form as the library does in the same family. The team's proposed rule: an updater, a getter or a setter, indexing included, is a dotted method; every other method is a functional method. One type may not declare a dotted and a functional method of the same name. A dotted method shadows a top-level function of the same name. A new functional method's name is reserved in every program that imports the library.
- **Place.** `references/library.md`, "Designing a change".
- **Source.** `Library/incomplete/Collection.fss:5-8` ("Proposed convention for dotted vs functional methods"; a proposal in an unfinished file, so the family's own practice comes first); `Specification/basic/overloading.tex`, section "Principles of Overloading"; FACTS, "Every functional-method name of the library is reserved in every program that imports it".
- **Why then.** The agent needs this when it adds a declaration to the library. A new functional method can break every program that uses its name for a variable.

### A16. Switches that show what the compiled path does (read from the code, not run)

- **Text.** To see what the code generator and the loader do, add a property to `JAVA_FLAGS`. `-Dfortress.bytecode.verify=true` runs ASM's verifier on each class that the code generator writes and the loader stamps. `-Dfortress.bytecode.list=true` prints each generated method as text. `-Dfortress.log.classloads=true` logs class loads. `-Dfortress.debug.overloaded.methods=true` prints the code generator's chaining of overloaded methods.
- **Place.** `references/compiler.md`, "Testing an edit here".
- **Source.** `map/dormant-code.md` §2.2 (row "diagnostics only"); `CodeGenClassWriter.java:72`; `InstantiatingClassloader.java:415`; `ManglingClassWriter.java:30`, `:108`; `NamingCzar.java:103`; `CodeGen.java:205-206`; `ProjectProperties.java:237-249`; `bin/fortress:28-31` and `bin/run:33-41` pass `JAVA_FLAGS`. Not run for this audit: run each switch once before it enters the skill.
- **Why then.** The agent needs this when a compiled run dies with a `VerifyError`, or a dispatch picks the wrong arm.

## B. The quiz, graded

The quiz is a fresh session's account of Fortress from pre-training alone (`explorations/reviews/fortress-pretraining-quiz.md`). Each claim below is graded:

- **correct**: true of the language as specified and of this tree;
- **wrong**: false;
- **outdated**: true of the 2012 tree, changed on purpose by the revival;
- **missing**: something an agent needs that the quiz does not know (listed at the end).

Where the specification and this tree differ, the cell says which. Claims that matter for nothing an agent does here are skipped: the people, the funding history, Fortify's rendering rules, the digit separator, the string representation.

### B.1 Purpose and history (quiz §1)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| A growable language: numbers, arrays, many operators and reductions live in libraries written in Fortress | correct | So a change to numbers, ranges, loops or reductions is a library edit, with natives under it. The team's own FAQ calls the core library "fictitious". | `Specification/preliminaries/intro/philosophy.tex:12-40`; `Specification/appendices/FAQ.tex:121-131`; A10 |
| Implicit parallelism by default | correct | See B.4. | FACTS, the entry opening "Implicit parallelism: `for` is parallel unless every generator is `seq`" |
| Specification 1.0 appeared around 2008 | correct | 1.0 is the PDF of 2008-03-31. The sources under `Specification-1.0-frozen/` are the Working Draft of 2011-02-02, not 1.0. The standard is `Specification/`, as the revival revises it. | FACTS, "`Specification-1.0-frozen/` is byte for byte the working draft of 2011-02-02 ..."; `references/specification.md` |
| The project stopped because generic multiple dispatch with reified types was too hard to implement | correct | The team's own word: generic methods under symmetric dispatch need "nontrivial run-time constraint solving". That unfinished part, the instance of a dispatched generic, is what the revival settles: a type parameter that a call does not fix takes its bound. | `explorations/reviews/decisions-review/judgement.md` §1, "Generics and their specialisation"; POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom` (the paper's instance rule)." |

### B.2 Types (quiz §2)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| Traits are the unit of inheritance, with multiple inheritance; objects are leaves; distinct objects exclude each other | correct | | `Specification/basic/traits.tex`; `Specification/basic/types-vals-vars.tex:212-224` |
| Fields are immutable unless `var` or `settable` | correct | A `value` object's fields are immutable. The `value` modifier changes nothing in the generated code. | `Specification/basic/objects.tex:115`, `:357`; `references/compiler.md:21` |
| Static parameters `[\ \]`, of kinds type, `nat`, `int`, `bool`, `opr`, `dim`, `unit`, with `where` clauses | correct (specified) | Implemented unevenly. Type parameters: both paths. `nat` and `int`: walk, and the compiled checker and run time since the revival. `bool`: walk only. `dim` and `unit`: neither path. `where` clauses: partly under walk; the code generator refuses every declaration with one. | `map/README.md` §2 (the fact on the eight mechanisms); `map/spec-to-implementation.md` §3, chapter 12; A3 |
| `opr ⊕` parameters serve algebraic traits such as `Monoid[\T, ⊕\]` | wrong (for the library) | The library's algebra is self-typed traits with fixed operator names: `AdditiveGroup[\T extends AdditiveGroup[\T\]\]` with `+`, `MultiplicativeRing[\T\]` with `TIMES`. The operator-parameterised hierarchy is only in the specification's chapter and in `Library/incomplete/`, which no program reaches. | `Library/FortressLibrary.fsi:257-279`; `Specification/advanced-lib/algebraic-constraints.tex`; `map/spec-to-implementation.md` §3, library row "algebraic constraints"; A11 |
| Generics are invariant; no `+T` or `-T` | correct | "Static parameters are invariant." The library widens by a function with a bounded parameter. The `covariant` modifier of the team's 2012 Types chapter is future work here; the compiled checker accepts it and neither path carries it to run time (ledger row 404). | `Specification/basic/trait-parameters.tex:379-400`; POSITIONS, "The `covariant` keyword is future work" |
| `excludes` and `comprises`; `comprises { ... }` with an ellipsis | correct | The revival reads `comprises` at the level of values: every value of the trait is a value of a listed type. Walk checks only the main component's clauses at load. The compiled checker refuses an api trait that extends a trait whose `comprises` has `...`. | POSITIONS, "The `comprises` passages read at the level of values (PLAN item 26, row 491)."; FACTS, "Walk checks at load the `comprises` clauses of the program's main component ..."; FACTS, "The compiled checker refuses every api-declared trait that extends a trait whose `comprises` clause has `...` ..." |
| Exclusion exists so that the overloading checker can prove two declarations never both apply | correct | The team called the apparatus a tax paid to keep overloading safe. | `map/design-intent-sources.md` §6, row "Type system, traits, multiple inheritance" |
| `Any` does not include tuples (guess) | wrong | `Any` comprises the tuple types, the arrow types, `()` and `Object`. Tuples are not `Object`s. The revival makes `Any` the implicit bound of a type parameter; the compiled path still uses `Object` until the switch-over, so it refuses instantiations at tuples. | `Specification/basic/types-vals-vars.tex:136`, `:297`; `Specification/basic/trait-parameters.tex:49-62`; POSITIONS, "The implicit bound of an unbounded type parameter is `Any`"; ledger row 412 |
| Contracts (`requires`, `ensures`, `invariant`), `property`, `test` | correct (specified) | Contracts run under walk; the code generator refuses them. `test` declarations run under walk through `fortress test`. `property` runs on neither path. | `map/spec-to-implementation.md` §3, chapters 9 and 19; `CodeGen.java:2971` |

### B.3 Dispatch and overloading (quiz §3)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| Symmetric multiple dispatch on the run-time types of all arguments | correct | Walk searches at each call (`OverloadedFunction.bestMatch`). The compiled path generates one dispatch method per overloaded name, which tests the argument types from the most specific declaration to the least. | `map/modules-and-phases.md` B.7; `references/compiler.md:17` |
| At compile time, the checker assigns the call a static type from the most specific statically applicable declaration | correct (compiled path) | Walk has no static types. So a call that the checker refuses (a function on a sized subtype applied to a value of the unsized supertype) runs under walk. | `map/compile-path-walkthrough.md` §3, "How it differs from the interpreter's run-time dispatch"; FACTS, the entry opening "The static type checker (Scala, `scala_src/typechecker/`) runs only on the compile path" |
| Overload sets are checked statically, pair by pair (exclusion, more specific, meet), so no ambiguity occurs at run time | outdated | The three rules hold on the compiled path. Two things changed. The 2009 draft forbade overloads that differ in their static parameters; the revival drops that sentence for the team's 2011 model, where a generic declaration is read over its instances. And walk checks part of the rules at load (A8) and can still report an ambiguity. | FACTS, "The specification states the type group's 2011 overloading model ..."; POSITIONS, "The static-parameter sentence goes (answer 9)."; `references/interpreter.md:10` |
| The meet rule | correct | | `Specification/basic/overloading.tex`; FACTS, "The compiled checker accepts the Meet Rule's `comprises` example ..." |
| The return-type rule | correct | The compiled checker checks it over every instance of a generic declaration. | FACTS, "The compiled checker checks the Return Type Rule over every instance and answer 9's positional rule" |
| Generic overloads need reasoning over all instantiations | correct | A generic declaration is applicable when some instance within its bounds is, compared on its declared parameter types. | FACTS, "The specification states the type group's 2011 overloading model ..." (`basic/overloading.tex:149-159`) |
| Functional methods: `self` in a parameter position, called `f(x, y)`, overloading with top-level functions; most operators declared so | correct | Two consequences the quiz misses: a functional method's name is reserved in every program that imports it, and one type may not have a dotted and a functional method of the same name. | `Specification/basic/traits.tex`, functional methods; `Library/FortressLibrary.fsi:262-265`; FACTS, "Every functional-method name of the library is reserved ..."; `Specification/basic/overloading.tex`, "Principles of Overloading" |
| Dotted methods dispatch on the receiver, then overload on the other arguments | correct | Dotted methods overload only with dotted methods, and shadow top-level functions of the same name. | `Specification/basic/overloading.tex`, "Principles of Overloading" |
| Dispatch on type arguments needs reified types, and erasure was a pain | correct | The compiled path keeps types: it compiles a generic once as a template and stamps each instantiation at class load. Stamping renames; it does not change the representation. | `references/compiler.md:18`; `map/README.md` §2 |

### B.4 Parallelism (quiz §4)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| Tuple elements, call arguments and operator operands are evaluated in parallel | correct | On both paths: walk's `TupleTask`, the code generator's `genParallelExprs`. | FACTS, the entry opening "Implicit parallelism"; `Specification/basic/expressions/tuple-expr.tex:23-24`; `map/spec-to-implementation.md` §3, chapter 5 |
| `for` loops are parallel by default; a sequential loop wraps its generator, `seq(1:n)` | correct | `seq(self)` is a functional method of the generators, and `sequential(g)` is a function. The suites run at one thread, so an ordering defect does not show in them. | `Specification/basic/expressions/for.tex`, "For Loops"; `Library/FortressLibrary.fsi:764`, `:937`; FACTS, "The gate's thread count is pinned in the build file, not in the calling shell" |
| Comprehensions and reductions are parallel by default, through the library | correct | | `map/design-intent-sources.md` §6, row "Generators, reducers, comprehensions, parallel `for`" |
| A generator implements `generate[\R\](r: Reduction[\R\], body: T -> R): R` (guess) | correct | Exactly this signature. `for` itself desugars to the generator's `loop`. | `Library/FortressLibrary.fsi:753`; `map/modules-and-phases.md` B.5 |
| `also` blocks | correct | Both paths. | `map/spec-to-implementation.md` §3, chapter 5 |
| `spawn`, read with `val()` and `wait()` | correct (specified) | Walk only: the code generator has no visitor for `spawn`. | `Specification/basic-lib/thread.tex`; A3 |
| `atomic` and `tryatomic` as transactions | correct | Two implementations: walk's in `interpreter/evaluator/transactions/`, the compiled path's in `runtimeSystem/`. The compiled path takes the block form only. | `map/modules-and-phases.md` B.11; `map/spec-to-implementation.md` §3, chapter 5 |
| Regions, distributions and `at` are mostly stubs | correct | `region(a) = Global`; no `Distribution` trait anywhere. | `Library/FortressLibrary.fss:74-89`; `map/spec-to-implementation.md` §3, chapter 5 |
| Work stealing on a pool derived from jsr166y | outdated | Both pools now extend `java.util.concurrent.ForkJoinPool`. `FORTRESS_THREADS` sets the size. | `interpreter/evaluator/tasks/FortressTaskRunnerGroup.java:14-16`, `runtimeSystem/FortressTaskRunnerGroup.java:15`; `explorations/modernization-plan.md`, "State snapshot" ("stdlib ForkJoin"); `references/interpreter.md:33` |
| Reduction variables: a variable assigned with `+=` in a loop is a reduction (guess) | correct (specified) | Not implemented: "Reduction variables are not yet supported." Write a reduction, `seq` or `atomic` instead. | `Specification/basic/expressions/for.tex:15`, `:34` |

### B.5 Syntax and notation (quiz §5)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| Source is ASCII or Unicode; Fortify typesets it | correct | Fortify is presentation only: nothing on either path depends on it, and the curator wants no work on it. Agents write ASCII: `ZZ32`, `[\T\]`, `<-`, `SUM`. | `map/README.md` §3; POSITIONS, "The 2D notation is a gimmick." |
| Keyword delimiters: `do ... end`, `if ... then ... end`, `case`, `typecase`, `label` with `exit` | correct | The compiled path has no `label` or `exit`; its `typecase` gives a wrong answer for an integer literal (ledger row 79). | A3; ledger row 79 |
| Comments are `(* ... *)` and nest | correct | Missing: `(*)` starts a comment to the end of the line. | `parser/Spacing.rats:53-54`; `Specification/basic/lexical-structure.tex`, "Comments" |
| `x = 3` binds immutably; `var x: T = e` and `x: T := e` declare a mutable variable; `x := e` assigns | correct | | `Specification/basic/variables.tex`, "Top-Level Variable Declarations" |
| Juxtaposition: application when the left side is a function, otherwise an overloadable operator; multiplication on numbers, concatenation on strings | correct | How three or more juxtaposed items group needs their types. A functional method's name used as a variable is a static error for this reason. | `Specification/basic/operators/juxtameaning.tex`, "Juxtaposition"; `Library/FortressLibrary.fsi:2508-2511` |
| Whitespace is significant; infix operators need symmetric whitespace | correct | A lopsided infix operator is a static error. | `Specification/basic/operators/opr-fixity.tex` (the rule on loose, tight and lopsided operators) |
| Precedence is not a total order | correct | `a + b ∪ c` needs parentheses. The claim on `a ∧ b ∨ c` was not checked. | `Specification/basic/operators/precedence.tex`, "Operator Precedence and Associativity" |
| Chained comparisons are conjunctions | correct | The compiled path desugars them; walk evaluates the node itself (A1). | `map/spec-to-implementation.md` §3, chapter 16 |
| Libraries add syntax through grammar declarations | correct | Under walk only; on the compiled path a unit that imports a grammar dies at disambiguation. | `map/spec-to-implementation.md` §3, chapter 27 |
| The sketch `component Hello export Executable run() = println "Hello, World!" end` | correct | The tests write `run(): () = do ... end`. | `ProjectFortress/tests/RangeZZ32RungJ.fss` |

### B.6 Numbers (quiz §6)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| `ZZ32`, `ZZ64` fixed width; `ZZ` arbitrary; `NN32`, `NN64` naturals; `RR32`, `RR64` floats; `QQ` rationals | correct | Their order is in the next row. `QQ` is exact. | FACTS, "The one library's number tower is flat" |
| How the number types relate (the quiz names them, not their order; Haskell's classes and Java's widening suggest a nested tower) | missing | In 2012 walk's library nested `ZZ32 <: ZZ64 <: ZZ <: QQ <: RR64`. Here the tower is flat: siblings under `Number`, each with its own algebra, each wider type declaring `coerce` from each narrower one. The reason is the exclusion rule (B.11). | `judgement.md` §1, "Numbers and the tower"; POSITIONS, "The exclusion rule stays and the tower is flat (route A)." |
| Integer literals have type `IntLiteral` and coerce from the context | correct (compiled path) | The compiled checker types every integer numeral `IntLiteral`. Walk makes a numeral an `Int`, `Long` or `BigNum` by its size; walk moves to `IntLiteral` after the switch-over. A numeral does not bind to `NN32`, `NN64` or `RR32` on either path. `x: RR64 = 3` works on both. | FACTS, "A numeral's type depends on the path and on the library in scope ..."; POSITIONS, "The numeral switch, split by where the static types are."; ledger row 454 |
| Fixed-width overflow throws an exception instead of wrapping | correct | As specified, and on both paths here. In 2012 walk wrapped silently; the revival made it raise `IntegerOverflow`. | `Specification/basic/operators/opr-overview.tex:154-155`; FACTS, "Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow` ..." |
| Wrapping or modular types may exist (guess) | wrong | Wrapping is by operators on the same types: ∔ `DOTPLUS`, ∸ `DOTMINUS`, ⨰ `DOTTIMES`. | `Specification/basic/operators/opr-overview.tex:172-176`; FACTS, "The specification's wrapping operators ∔, ∸ and ⨰ are declared in the interpreter's library ..." |
| Coercion: `coerce` declarations in the target type; prefer no coercion | correct | A conversion makes a call possible and never changes which declaration runs when one already fits. | `Specification/basic/conversions-coercions.tex:454-462`; POSITIONS, "Conversions never change which declaration runs." |
| The interpreter implemented a subset of the coercion rules (guess) | outdated | In 2012 walk had no coercion at all. Here walk converts at its three kinds of type check, and it chooses the coercion on the run-time value; the compiled path chooses statically. | `map/compile-path-walkthrough.md` §4 (the 2012 state); FACTS, "Under `walk`, the interpreter converts by coercion at its three kinds of type check"; POSITIONS, "Walk chooses coercions on the value, for now." |
| `CC` (complex) is in the specification, partly in the library | wrong | No complex type is in the library; only the rationals of the planned tower shipped. | `grep` of `Library/*.fsi` and `LibraryBuiltin/*.fsi` finds no `CC`; `judgement.md` §1, "The libraries" |
| Dimensions and units, largely omitted | correct | Absent on both paths; the SI units sit in `Library/incomplete/`, off the source path. | `map/spec-to-implementation.md` §3, chapter 18; `map/dormant-code.md` §1.2 |

### B.7 The library (quiz §7)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| The main files are `FortressLibrary` and `FortressBuiltin` | correct (walk) | Until the switch-over the compiled path links its own prelude instead: `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`. | SKILL.md, opening; `references/compiler.md`, "The compiler's prelude, until the switch-over" |
| Primitives bottom out in Java | correct | Two mechanisms: `builtinPrimitive("...")` strings for walk, `import java` for the compiled path. | `references/interpreter.md`, "Natives"; `references/compiler.md`, "Natives" |
| Ranges `a:b`, `a#n`, strided and open forms; ranges are generators | correct | Outdated in one point: scalar ranges are over `ZZ32` only, a revival decision. | POSITIONS, "Scalar ranges are over `ZZ32` only"; FACTS, "The one library's scalar ranges are over `ZZ32` alone" |
| `Array[\T, E\]`; `Array1` to `Array3` with static bounds and sizes; `Vector` and `Matrix` with sizes; 0-based by default; literals `[1 2 3]` | correct | `Array[\E, I\]` takes element and index types; `Array1[\T, nat b0, nat s0\]` a lower bound and a size. All of this is walk's only: the prelude has no array type. | `Library/FortressLibrary.fsi:1459`, `:1577`, `:1602`, `:1679`, `:1720`, `:1794`; `Specification/basic/expressions/aggregate.tex:146`; A3 |
| `SUM`, `PROD`, `BIG op` reductions | correct | Outdated in one point: `SUM` and `PROD` are generic over `AdditiveGroup` and `MultiplicativeRing`, and a clause form whose element type nothing fixes must write it. | POSITIONS, "`SUM` and `PROD` without the `Number` catch-all (answer 7)."; `Library/FortressLibrary.fsi:1965-1992` |
| A `Reduction` with an empty element, `join`, `lift`, `unlift`, shared by all generators | correct | | `Library/FortressLibrary.fsi:1856-1924` |
| An algebraic hierarchy `Associative[\T, ⊕\]`, `Monoid`, `Group`, `Ring`, `Field`, with laws in `property` declarations | wrong (for the library) | See B.2: the library's algebra is `AdditiveGroup` and `MultiplicativeRing`, self-typed, and `property` runs on neither path. | `Library/FortressLibrary.fsi:257-279`; `map/spec-to-implementation.md` §3, chapter 19 |

### B.8 Components and apis (quiz §8)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| An api is a `.fsi`, a component a `.fss`; components `import` and `export` apis | correct | The file name must be the component's name. An api and the component that implements it must have the same name. Imports resolve along a source path that searches `.` first. Import aliasing (`as`) works on neither path. | `references/build-and-caches.md`, "Name resolution"; `references/compiler.md`, "Known shapes"; ledger row 13 |
| Compound components, `upgrade`, a persistent store | correct | Not implemented. The code that would merge the constituents of a compound component is unwired, and its tests have no target; `linker/` only binds an api to its component. | `map/dormant-code.md` §2.5 (`HygienicRenamer.scala`); `map/test-coverage.md` C.1 (row `linker/`); `Specification/basic/components/intro.tex:12` ("This chapter including various syntax is out of date.") |
| The main program exports `Executable` and defines `run()` | correct | | `ProjectFortress/tests/*.fss` |

### B.9 The implementation (quiz §9)

| Claim | Grade | What holds here | Source |
|---|---|---|---|
| Written in Java for the JVM; parts in Scala later, the type checker among them (guess) | correct | The checker is Scala, started in February 2009. | `explorations/repo-internals.md`, module table row `scala_src/` |
| Rats! parser; AST classes from ASTGen | correct | | `references/toolchain.md` |
| Static phases: disambiguation, precedence, desugaring into `generate` calls, type checking | correct | The type checker runs only on the compiled path. Walk's phase is inert, and no switch turns it on. | FACTS, the entry opening "The static type checker (Scala, `scala_src/typechecker/`) runs only on the compile path" |
| Run with something like `fortress run Foo.fss` | wrong | `bin/fortress Foo.fss` runs walk. `fortress run Foo` runs a component that `fortress compile` built. | SKILL.md, opening |
| A later compiler to JVM bytecode with ASM, covering a subset, specialising generics by instantiation (guess) | correct | | `references/compiler.md`; A3 |
| A directory of `.fss` programs with expected output as the regression suite | wrong | No test has an expected-output file. A walk test passes when it throws nothing, exits 0 and prints no `fail`. A compiled `.test` file pins strings in its keys. The revival asserts every value inside the test. | `map/test-coverage.md` B; `references/tests-writing.md`; SKILL.md, "Rules for every task" |

### B.10 The traps (quiz §10)

The fourteen traps restate claims graded above. Graded on their own:

- Traps 1 to 4, 6, 9, 10 and 14 are correct.
- Trap 5 (overloading is dynamic, statically checked) is correct for the compiled path and outdated for walk (B.3).
- Trap 7 ("objects are final and traits have no fields") is correct; traits may declare abstract fields (`Specification/basic/objects.tex:278`).
- Trap 8 (invariant generics, `[\T\]` not `[T]`) is correct.
- Trap 11 is correct on overflow and correct for the compiled path on literals; walk's numerals are `Int`, `Long` or `BigNum` (B.6).
- Trap 12 ("check the tests and library source before trusting the spec") is correct as a fact and needs the revival's rule beside it. The specification stays the standard. Where an implementation and the text disagree, a decision of the curator settles it, or it is a conflict to explore (`references/specification.md`, "When the text and an implementation disagree").
- Trap 13 (the interpreter is more permissive) is correct (FACTS, the entry opening "The static type checker ... runs only on the compile path").

### B.11 What the quiz does not know (missing)

| What an agent needs | Source |
|---|---|
| Two paths, two libraries until the switch-over, one type checker on the compiled path only. | SKILL.md, opening; FACTS, § Execution model, its first two entries |
| The exclusion rule: no type is a subtype of two different instantiations of one generic trait. The compiled checker keeps it, and it is why the number tower is flat. | POSITIONS, "The exclusion rule stays and the tower is flat (route A)."; FACTS, "The compiled checker's exclusion rule is the designers' \"multiple instantiation exclusion\" ..."; `Papers/Types/exclusion.tick:141-152` (quoted in `judgement.md` §1) |
| The implicit bound of a type parameter is `Any`, not `Object`; a type parameter that a call does not fix takes its bound, never `Bottom`. | POSITIONS, "The implicit bound of an unbounded type parameter is `Any`"; POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom` ..." |
| Mixed widths convert by declared coercions: `ZZ32` and numerals into `RR64` implicitly, `ZZ64` into `RR64` only explicitly. | POSITIONS, "Mixed widths convert by declared coercions (answer 8)." |
| A `nat` parameter is an `NN32` value, an `int` parameter a `ZZ32` value. | POSITIONS, "Sizes."; `Specification/basic/trait-parameters.tex:82-90` |
| A functional method's name is reserved in every importing program. | FACTS, "Every functional-method name of the library is reserved in every program that imports it" |
| The compiled path disables contravariance in dispatch. | A14 |
| The compiled path cannot yet compile a list of constructs, and its prelude has no arrays. | A3 |
| Walk and the compiled path share almost no run-time code. | A2 |

## C. Pointers without a trigger

Each pointer names a large note with no condition for opening it and no way to read part of it. The map's dates matter here: the surveys predate the climb batches, so a status or a line number in them may be stale (see "How to read this").

### C1. `references/specification.md:25` → `map/design-intent-sources.md` (36 KB)

Keep the pointer, with a trigger and a narrow read. Proposed text:

> When you explore a conflict, or write a decision not taken, and you need the designers' reason for a rule (not the rule itself), read the row of its design area in the map's table:
>
>     T 'map:design-intent-sources.md#The map, by design area@WORD'
>
> WORD is a word of the area, such as `coercion`, `juxtaposition`, `dispatch` or `Arrays`. A row is about 1 to 2 KB. Then open the sources that the row names.

Also move one sentence of the note into `specification.md` (it is A13's last sentence): the team's rationale is in the draft-only `\note{}` boxes and in the Internal Document appendix, `appendices/FAQ.tex` and `future.tex` (`design-intent-sources.md` §4).

Checked: `T --check 'map:design-intent-sources.md#The map, by design area@Coercion'` finds two rows, 1,653 bytes, against 12,054 bytes for the whole table.

### C2. `references/toolchain.md:3` → `explorations/modernization-plan.md` (21 KB)

Move the knowledge in and drop the pointer. The plan is cited for "the versions and the classfile level", which fit in one line:

> JDK 25 is the current JDK: javac compiles at source and target 25 (`build.xml:133`). Scala 2.13.18 and ASM 9.10.1 are vendored in `ProjectFortress/third_party/`. Emitted Fortress classfiles stay at version 1.6 (`compiler.md`).

Checked: `build.xml:133`; `ls ProjectFortress/third_party/scala ProjectFortress/third_party/asm`; the plan's "State snapshot" section.

Keep one trigger for the history, which matters only to an upgrade:

> Before you change the version of a tool, read its rung in the plan: `T 'doc:explorations/modernization-plan.md#The ladder@TOOL'` (TOOL is `ASM`, `Scala` or `JDK`; about 4 KB).

### C3. `references/compiler.md:66` → `map/spec-to-implementation.md` (70 KB)

Keep the pointer, with a trigger, a narrow read and a warning on dates. Proposed text:

> Before you add or fix a language feature, find its row: `T 'map:spec-to-implementation.md#Feature by feature@WORD'`, where WORD names the feature (`spawn`, `coercion`, `typecase`). A row is 0.5 to 1 KB. It names the feature's specification section, parser rule, checker class, walk site, code-generator site, prelude declaration and ledger rows. Its status column and its line numbers are of 2026-09-16, before the revival's batches. Before you rely on a status, read the ledger rows that it cites (`T 'ledger:N'`). Before you rely on a line, grep the method's name.

Checked: `@spawn` prints one row of 554 bytes; `@coercion` one row of 809 bytes. Two statuses that changed since: coercion under walk (FACTS, "Under `walk`, the interpreter converts by coercion ...") and `nat` in the checker (FACTS, "The compiled type checker checks `nat` and `int` static parameters"). A line that moved: the guard on `where` clauses, `CodeGen.java:2937` in the note, now `:2967`.

### C4. `references/compiler.md:67` → `map/modules-and-phases.md` (60 KB)

Move the most-used part in, and keep the pointer with a trigger for the rest.

Move in: the one-table divergence of the two paths (B.14), shortened to the rows the skill lacks. A1 and A2 carry most of it: which desugarings run, the values, the natives, the tasks and transactions, the dispatch. Add the two rows on the tail of each path: walk annotates every reference with its lexical depth (`interpreter/rewrite/`) and caches the result in `interpreter_cache`; the compiled path writes one jar per component, and `fortress run` is a second JVM that never enters `Shell.java` (B.0, B.8, B.9).

Trigger for the rest:

> When your edit is in one phase or package, and you need what runs before and after it on each path, read the section of that phase: `T 'map:modules-and-phases.md#B.N'`. B.1 is the phase list, B.4 disambiguation, B.5 desugaring, B.6 type checking, B.7 overloading, B.10 the cache, B.11 the run time, B.12 natives. A section is 1 to 3 KB. The note was written on 2026-09-16: walk's coercion has since moved into `OverloadedFunction`, outside the desugarers.

Checked: `T --check 'map:modules-and-phases.md#B.14'` 1,674 bytes; `#B.5` 1,841 bytes.

## D. A "Fortress as a language" section

### What the section must say

Section B shows a pattern. The fresh session is right, and sure, about the core: multiple dispatch, functional methods, juxtaposition, whitespace, implicit parallelism, traits and objects, invariant generics. It is wrong, often while sure or likely, in three places:

1. **The revival's deliberate changes**, which no training can know: the flat tower, scalar ranges over `ZZ32`, the implicit bound `Any`, walk's coercion, overflow on both paths, overloads that differ in static parameters, the written static argument of `SUM` (B.2, B.3, B.6, B.7).
2. **This tree's library, against the specification**: an operator-parameterised algebra, complex numbers and reduction variables are in the text and not in the code (B.2, B.4, B.6, B.7).
3. **The split between two implementations**: which of them checks types, runs a construct, or has a library (B.3, B.9, B.11).

So the section states the core briefly, as a correction to the nearest language each reader knows, and gives most of its lines to the three places above. Facts that change with each batch (the numeral's type under walk, the list of code-generator walls) stay in their parts (A3, A4), so that the section does not go stale.

### Draft

> **Fortress as a language.** Fortress is not in your training in any depth. Each point below corrects an assumption from a language you know.
>
> - **Two implementations, one type checker.** Walk runs a program with no static types; only the compiled path type-checks. So a program that runs under walk can be ill-typed. (Not Java or Scala.)
> - **Dispatch is on every argument, at run time.** A call chooses among overloads by the run-time types of all its arguments, as in Julia, not by static types as in Java. The compiled checker accepts two overloads only if their parameter types exclude each other, one is more specific, or a third covers their meet; the more specific one's return type must fit the other's. Walk checks part of this at load.
> - **Functional methods.** A method with `self` among its parameters is called `f(x)`, not `x.f()`, and overloads with top-level functions; operators are declared so (`opr +(self, other: T): T`). Its name is reserved: do not name a variable after it. One type may not have a dotted and a functional method of one name.
> - **Traits and objects, no classes.** A trait has methods and abstract fields and extends several traits; an object is a leaf. `excludes {A, B}`: no value has both types. `comprises {A, B}`: every value has a listed type (near Scala's `sealed`). No type may extend two instantiations of one generic trait: this exclusion rule is why the number tower is flat.
> - **Static parameters.** Written `[\T\]`; `[i]` indexes. Kinds: types, sizes (`nat` is an `NN32` value, `int` a `ZZ32`), `bool`, `opr`. Generics are reified, not erased as in Java, and invariant: no `+T` or `-T`. An unbounded type parameter is bounded by `Any`, which holds tuples, functions and `()`, as `Object` does not. A type parameter that a call does not fix takes its bound.
> - **Numbers are library traits, side by side.** `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64` are siblings under `Number`, none a subtype of another (not Haskell's classes, not Java's widening). A wider type declares `coerce` from each narrower one; a conversion never changes which declaration runs when one fits. Overflow raises `IntegerOverflow`; to wrap, use `DOTPLUS`, `DOTMINUS`, `DOTTIMES`. Scalar ranges are over `ZZ32` only. The algebra is self-typed traits (`AdditiveGroup[\T\]` with `+`), not monoids over an operator parameter.
> - **Evaluation is parallel by default.** Tuple elements, arguments, operands and `for` iterations may run at once (not Java's left-to-right order). A loop is sequential only if every generator is `seq(...)`. A shared `var` updated in a loop is a race: use a reduction, `seq` or `atomic`. The suites run at one thread and do not show races.
> - **Loops and reductions are library code.** `for`, comprehensions and `SUM` are calls of the library's generators and reduction objects. If nothing fixes a reduction's element type, write it: `SUM[\ZZ32\][j <- 0#n] f(j)`.
> - **Juxtaposition is an operator, and whitespace counts.** `f x` applies a function; otherwise juxtaposition is an overloadable operator: `2 x` multiplies, `"a" "b"` concatenates, and grouping depends on types (not Haskell). An infix operator has whitespace on both sides or on neither: `a -b` is not `a - b`. Precedence is partial: `a + b ∪ c` needs parentheses.
> - **Declarations.** `x = e` binds a fixed name; `var x: T = e` and `x: T := e` declare a variable; `x := e` assigns. `(* *)` comments nest; `(*)` comments to the end of the line. A program: `component Name`, `export Executable`, declarations, `run(): () = do ... end`, `end`.
> - **Specified, not built:** dimensions and units, `property` declarations, regions, reduction variables, complex numbers. Some constructs still run under walk only (`compiler.md`).

The draft is about 3,700 characters: 43 lines when wrapped at 100 characters. Every line is taken from a row of section B, where its sources are.

### Two placements

| | The opening of `SKILL.md` | A part with a trigger, `references/language.md` |
|---|---|---|
| Who reads it | Every agent that loads the skill: every worker, gate runner and reviewer. | Each agent that loads the part. A one-line trigger in SKILL.md, "Load before you read or write a `.fss` or `.fsi` file, a test program among them". |
| Cost per agent | About 950 tokens (3,700 characters at about 4 characters a token). SKILL.md grows from about 2,600 tokens to about 3,550. A task that loads the five parts of the skill's own example (an interpreter fix) reads about 10,500 tokens of the skill today; this adds about 9%. | About 950 tokens for each agent that loads the part, and about 40 tokens for the trigger line, which every agent reads. |
| What it risks | Every agent pays, also one that never reads Fortress (a gate runner, an editor of records). SKILL.md, the file every agent reads, then holds facts about the language next to the rules of work, and a stale line there misleads every agent. | An agent forms its model from training before it loads the part, or never loads it. The quiz shows that the model it would form is sure and wrong on exactly the revival's changes. The skill's list of parts already has sixteen entries, and the trigger competes with them. |

**Recommendation: the opening of `SKILL.md`.** The rule "write the test before the fix" makes nearly every agent write Fortress, so the trigger of a part would fire for nearly every agent anyway, and the model must be right before the first `.fss` file is read. The cost is small against what one wrong assumption costs in a failed build and a re-run. To keep the risk of staleness low, the section keeps only facts that the curator has decided, and the facts that move with each batch stay in `library.md` and `compiler.md` (A3, A4). The curator decides.

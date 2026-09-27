<!-- The territory map, assembled 2026-09-16 by the coordinating session from the survey reports in this directory, before the historical source tree was opened for modification. The surveys are the evidence of that day; sections 0, 2 and 7 describe the tree as it stands, section 6 the development loop, and the order of work and the open decisions are in coordinator/PLAN.md, to which sections 4 and 5 point. Every claim cites a survey section, a file:line, a commit, or a FACTS or POSITIONS entry. Read after FACTS.md and POSITIONS.md; it does not repeat them. -->

# The territory map

## 0. Terms used here

Path: one of the two execution routes, the interpreter (`fortress <file>.fss`, "walk") or the compiler (`fortress compile` then `fortress run`); "both paths" means the shared front end.

World: which prelude a run links against; the interpreter world is `FortressLibrary` + `FortressBuiltin` + `AnyType`, the compiler world is `CompilerLibrary` + `CompilerBuiltin` + `CompilerAlgebra` + `AnyType` (`compiler/WellKnownNames.java:114-139`, `CompilerAlgebra` since `1bd8d3ad1`; `modules-and-phases.md` B.13).

Prelude: the library a world loads without an import; the compiler world's four components are 2,405 lines against the interpreter world's 5,314 (`wc -l` of the `.fss`; `spec-to-implementation.md` §2 names the files).

Switch-over: phase 4 of `coordinator/PLAN.md`, where the compiled path starts reading the interpreter's library and the compiler's own three prelude files are deleted, their tests kept (POSITIONS 2026-09-21, the library route); until then each path links its own world.

Gate: what a change must pass to land: on a clean build, `ant testFast` and `ant testSystem` at zero failures, thirteen compiled `atomic` programs three times at four threads, the ladder regression (85 files compiled and run against their baseline, the eighteen microGPT components compiled only) and the checker count, the compiled checker's errors over the interpreter's library, reported and never red on its own (protocol, hard rules; `coordinator/climb-batch-workflow.md`). Counts here are from climb batch 5's follow-up D gate (`compile-ladder/climb-batch-5/followup-D/gate/summary.txt`); the current ones are in the last landed `climb-batch-*/gate/summary.txt`.

Shadow: a prototype of an edit to the original tree, made by compiling edited copies of the files and putting their class files ahead of the real ones on the classpath; no tracked file changes, and the gate cannot see it (`perf-probes/template-check/run-all.sh`; FACTS "The `nat` plan's minimal design works as a shadow").

Sealed tree: the original tree, everything outside `explorations/` and `research/`; sealed through `75cca6683` (POSITIONS 2026-09-17), editable since, each edit test first and flagged at commit (protocol, hard rules).

## 1. The five surveys, and the walkthrough beside them

`modules-and-phases.md`: the 22 packages with sizes, the import graph, the dead modules, the two pipelines phase by phase, the cache, the runtime, native interop, and the one-table divergence of the paths (B.14).

`spec-to-implementation.md`: the 53 chapters of the July 2012 draft, a table of about 110 features with the parser rule, checker class, interpreter, codegen and prelude location of each, and the layered picture of the numeric tower (§4).

`test-coverage.md`: the census of every test corpus and JUnit class, what the 1,377 and 382 are made of, the two corpora that never meet, the blind spots by module, and the loop timings.

`dormant-code.md` (part five, added at Pavol's request): the census of what is present, carries a design, and does not run: commented-out library declarations and `Library/incomplete/`, commented-out visitors and off-by-default flags in the source, commented-out test halves and the aspirational directories, the spec's genuinely dormant text and its 62 "not yet supported" notes, the papers; each item judged finished-unwired, sketch, superseded or unknown, and tied to a path step.

`design-intent-sources.md`: the five places rationale is written (in-repo papers, the Steele corpus, our extracts, the spec's draft-only notes and Internal Document, source comments and commits), and a table by design area of what intent the spec leaves unstated.

`compile-path-walkthrough.md` (part six, written 2026-09-20 for the checker decisions): the compile path followed end to end, one section per stage — parsing, name resolution and grammar expansion, the checker (what it walks, what it writes, its counts on the library before climb batch 4), the desugaring switches that make the paths differ, code generation, the second JVM and the stamping class loader, native bindings in both worlds, `nat`, and a glossary.

## 2. The shape of the system, in thirteen facts

The editable surface is about 149,000 hand-written Java lines and 19,900 Scala lines; the other 535,000 Java lines are generated and checked in (counted as in `modules-and-phases.md` A.1).

The AST in `nodes/` is the only intermediate representation from parse to bytecode; there is no lower IR and no optimizing middle (B.1).

The two paths run the same first four phases (pre-disambiguation desugaring, disambiguation, grammar rewriting of apis, pre-typecheck desugaring) under different switches: the compiler world bounds every unbounded static parameter by `Object` in phase 1 and walk turns off the three desugarings gated on `use_scala` (`Shell.java:268-286`, `:371-386`, `:422`); the compiler adds integer-literal folding and codegen; the interpreter's type-check phase is present but inert because the flag defaults off (B.1, `Shell.java:1275`).

`fortress compile` and `fortress run` are two JVMs with two classpaths; `run` never enters `Shell.java` (B.0).

A user grammar is expanded before phase 1 runs on the component, by a Rats! run plus a javac run in a temp directory per compile; the GRAMMAR phase in the phase array touches apis only (B.3).

Generics are compiled once as template bytecode and stamped out by name rewriting in `InstantiatingClassloader` at class-load time, a size stamped into the class name and, where it is read as a value, substituted as its numeral; instantiation renames, it does not change representation (B.11; FACTS "A size is carried at run time as a descriptor from `RTTIsize.of`").

The api cache key is a hash of the source directory path, not of content; staleness is decided by file dates alone (B.10).

Tasks and transactions exist twice, once in `interpreter/evaluator/` and once in `runtimeSystem/`, independent implementations of the same two ideas (B.11); a fix in one is not a fix in the other.

The number tower is flat in both worlds. In the one library, since climb batch 6 rung F (`d846e3644`), `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ` and `RR64` are siblings under `Number`, each carrying its own algebra, each wider type converting from each narrower one by `coerce` (into `RR64` from `ZZ32` alone), and `Number` declares only `asFloat` and one numeric `=` (`Library/FortressLibrary.fsi:276-606`; FACTS "The one library's number tower is flat"); the compiler prelude has been flat since 2009 (`6896886fb`), its `Number` empty and no algebraic trait above it (`CompilerBuiltin.fsi:96`).

Of the eight mechanisms of `spec-to-implementation.md` §4.1, the compiled path has `nat` and `int` static parameters (the checker since climb batch 4 rung N, `3f297441c`; the run time since batch 5 rung Z, `e893a3e00`), inferring a `bool`, `dim` or `unit` one refused by name; walk has coercion since batch 4 rung C (`b628871a2`); where clauses remain the gap: a where-clause variable in an `extends` clause is undefined on both paths, and codegen refuses any declaration carrying a where clause (`CodeGen.java:2953, :4093, :5004`) (FACTS § Execution model, § The checker and the one library, § Landed semantics).

The gate is strong where the 2012 team spent its last two years (codegen, the compiler front end, diagnostics) and blind where the team stopped: the bytecode optimizer (zero tests), syntax abstraction (one file), the cache round trip (not asserted), the linker, the unparser (`test-coverage.md` C.3); concurrency is seen only by the thirteen compiled `atomic` programs at four threads, since every suite runs one thread (`build.xml:947`, `:1188`).

Contravariance in overloaded dispatch is switched off on every compiled program by a property that defaults true (`fortress.disable.contravariance`, `ProjectProperties.java:327-328`), the 2012 retreat of commit `c35aac139` still in force (`dormant-code.md` §2.2).

The team's rationale in the specification exists only in the draft build (230 `\note{}` boxes and the Internal Document appendix, suppressed by `\ifrelease`), and its deepest layer, 27 named email threads, is not in the repository (`design-intent-sources.md` header, §4); the revival's own changes print in every build (§7, `Specification/`).

## 3. Answers to the questions Pavol asked on 2026-09-16

Is there a small core? The spec's own answer is no: the Internal Document's FAQ calls the core library "fictitious" and defines the language by Core versus Standard library, a split the tree does not have (`design-intent-sources.md` §4, `appendices/FAQ.tex:121-131`). What functions as the core is the mechanism layer of `spec-to-implementation.md` §4.1: traits with multiple inheritance, generics, static parameters of five kinds, operator declarations in traits, multiple dispatch, juxtaposition, coercion, where clauses. Everything numeric is library on top of that.

Is the test suite shared between interpreter and compiler? No. Two hand-ported corpora: `tests/` shares no file name with `compiler_tests/`, and the 11 names it shares with `other_compiler_tests/` are different programs; only `parser_tests/` is read by both suites, and the gate's ladder stage also compiles and runs 82 files of `tests/`, each compared with its own earlier compiled output; nothing compares the two paths on one program (`test-coverage.md` B; FACTS § The harness and the gate).

Where is bytecode generated? `compiler/codegen/CodeGen.java` (6,857 lines) writes one jar per component into `bytecode_cache` with ASM; `OverloadSet` generates dispatch methods; `NamingCzar` lowers types; generic instantiation happens later, at load time (`modules-and-phases.md` B.9, B.11).

Where does the grammar extension happen? `syntax_abstractions/`, in two moments: template bodies of a grammar api are parsed when the api is analysed (GRAMMAR phase), and a component that imports the grammar gets a generated parser and is expanded by `Transform` before any phase runs on it (B.3).

Is there Java interop? Yes, two mechanisms that share nothing: `builtinPrimitive("class")` in the interpreter world (368 bindings) and `import java …` in the compiler world (20 lines, `nativeHelpers/` + `nativeInterface/`); `import java` is also wired on the interpreter path by a third route, which does not work and which no test exercises (FACTS § The territory map); Java cannot call Fortress except through `MainWrapper` (B.12).

Where are Fortify and Fortick, and when would we touch them? `Fortify/fortify.el` (8,024 lines) plus `fortify.sty`, driven by `bin/fortify` and an Ant task; `bin/fortick` wraps it for backtick-delimited snippets in a document; `contrib/Emacs/fortress-mode.el` is an ordinary editing mode. They are presentation only; nothing on either path depends on them (A.6, `design-intent-sources.md` §6, the notation row). The Unicode operators and juxtaposition are the language itself; Fortify only typesets them.

Which spec counts? `Specification/`, "Working Draft, July 19, 2012", revision 4267. The sources under `Specification-1.0-frozen/` are byte for byte the team's Working Draft of February 2011, the text `Specification/` held until the revival's revisions, and only the PDF beside them is the 1.0 artefact (FACTS "`Specification-1.0-frozen/` is byte for byte the working draft of 2011-02-02"; `spec-to-implementation.md` §1.2). This corrects the FACTS entry that called the frozen tree "1.0".

## 4. Decisions the surveys put on the table

Every open decision, the surveys' among them, is held in `coordinator/PLAN.md`, in the order it needs deciding ("Pavol's answers, in the order they are needed") or parked ("Off the path, parked"), and each survey's own "Decisions not made" section keeps its original list.

## 5. The gaps on the path, in dependency order

The path in order is `coordinator/PLAN.md`: its six phases run from the climb batches through the checker at a true zero and the switch-over to microGPT compiled and then fast, and its last section says what that order replaced, this section among it.

## 6. The development loop

Measured (`test-coverage.md` D): `ant compileAll` about 80 s and it wipes the interpreter cache through `cleanCache`; `ant testFast` 5 min 23 s with the wall set by the indivisible `othercompiler` track; `ant testSystem` about 2 min in four shards; `ant testOnly -DtestPattern=X` 1 min 26 s for a one-second test, the cost being ant's fileset scan of `build/`; the 280 child JVMs of the `run` tests, at about 200 ms each, are not removable; every grammar-importing run leaves a 5.8 MB Rats! temp directory (`RatsUtil.java:138-144`), swept by `experiment/env.sh`.

The two suites are therefore about nine minutes after a rebuild, before the gate's other stages, and neither test target compiles, so a stale `build/` silently tests the previous revision.

Three loops, fastest first, are what the path needs.

The shadow loop: compile one edited file with scalac or javac against the build classpath and put it first on the classpath; seconds instead of 80 s, no rebuild, no cache wipe, no tracked change. The template prototype ran its whole matrix this way; the recipe is in `perf-probes/template-check/run-all.sh` and `matrix.sh`. This is the loop for checker and code-generator edits.

The program loop: a differential check that runs the three kernels and C4 on both paths and compares output, from `explorations/`; minutes. It is not built, since nothing microGPT-shaped compiles before the switch-over; it is the loop for phases 5 and 6 of `coordinator/PLAN.md`, and the only check that would say whether the target program still works.

The gate loop: the gate of §0, run once on a batch's merged tree before any commit under the sealed tree lands on `main` (`coordinator/climb-batch-workflow.md`). Running one JUnit class directly with `junit.textui.TestRunner` and the `fastTrack` macro's properties avoids the 86 s ant tax (the template worker's recipe, `perf-probes/template-check/`).

Costs worth removing, in order of payoff: split the `othercompiler` track (the only structural gain left in `testFast`); decouple `compileAll` from `cleanCache` so a rebuild does not cold-start the next interpreter run; delete the Rats! temp directory at source (`RatsUtil`, already on the worklist as a one-liner); a direct-JUnit target in `build.xml` that skips the fileset scan. All four are `build.xml` or one-file edits, gated by the suite itself.

Not a loop cost but a trap: the api cache key is the source directory path and staleness is by file date (`modules-and-phases.md` B.10), so a moved tree or a same-date edit gives a silent stale result; the shadow technique sidesteps it, editing under the sealed tree does not.

## 7. Touch this, and that moves

Read as: change here → which path sees it → which tests guard it → where the gate is blind.

| Change | Paths | Guarded by | Blind |
|---|---|---|---|
| `useful/` (persistent trees, `Path`, `Debug`) | both, and every module (17 importers, 1,072 imports from `nodes` alone) | 100 direct unit tests, then everything | — |
| `astgen/Fortress.ast` (the AST) | both; regenerates 354,550 lines of `nodes/`, `FortressAst.scala`, `Library/FortressAst.fss`; changes the `.tfi` cache format | everything, by consequence | the cache round trip is not asserted; the generator's output is compared by mtime only |
| `parser/*.rats` | both; the same rule must change in the main grammar and in `templateparser/` (the full grammar again plus `Gaps.rats`); regenerates checked-in parsers | `ParserJUTest` 188, then everything | the template parser's copy has one green program |
| `parser_util/precedence_resolver/` (juxtaposition, precedence) | both, before the AST exists | 25 direct, then everything | — |
| `compiler/` phases 1-4 (desugarers, disambiguator, `OverloadRewriter`) | both; which desugarers run is a `Shell` switch set per command, not the phase list (`Shell.java:268-286`, `:371-386`) | the compiler track 768 (`compiler_tests` with `parser_tests`); `testSystem` 408 for the interpreter | a desugaring gated on `use_scala`, or the compiler world's `extends Object` bound, changes one path only |
| `scala_src/typechecker/` (`STypeChecker`, `STypesUtil`, `KindEnv`) | compiler only in effect; `IndexBuilder` runs on both and refuses type aliases, `test`, `property` on both; an edit to `compiler/StaticChecker.java` stales its copy in `coordinator/tools/checker-count/`, which turns the gate red | 106 `typecheck` units + every `compile`, 41 `Nat*` files among them; 22 unit tests for 59 files; the checker count | `bool`, `dim` and `unit` parameters; template ASTs (row 291); the checker count stops at the `FortressLibrary` api's first errors and never checks its component (`PLAN.md`, phase 3) |
| `nodes_util/ASTIO`, `NodeReflection`, `Unprinter` (the cache serializer) | both; every api and component passes through it | 13 primitive tests | the whole-file round trip is commented out (`ASTJUTest.java:654`) |
| `repository/` (`GraphRepository`, `ProjectProperties`, `ForeignJava`) and `compiler/WellKnownNames` (the world switch) | both | every suite, by consequence | the linker's aliasing (no test; an api whose component has another name links on neither path, FACTS "An exported function fails exactly as an exported variable does"); the cache key and staleness rules |
| `compiler/codegen/`, `OverloadSet`, `NamingCzar` | compiler | the compiler track 768, `other_compiler_tests` 263, `library_tests` 83; 280 programs run; the ladder's 85 files | the optimizer (zero tests); where clauses and contracts refused, so never generated |
| `runtimeSystem/` (`InstantiatingClassloader`, `Naming`, `BaseTask`, transactions) | compiled programs at run time; `ByteCodeWriter` and `SimpleClassLoader` also from the interpreter's `ClosureMaker` | 18 direct (naming), 280 executed programs, 119 with generics; the thirteen `atomic` programs at four threads | concurrency beyond those thirteen, the loader's first-load race among it (row 417); transactions (one JUnit assertion) |
| `interpreter/` (evaluator, values, types, its own tasks and transactions) | interpreter | `testSystem` 408 (pass = no exception and no `fail` in output) | a wrong number the program does not check itself; concurrency (`FORTRESS_THREADS=1` per shard) |
| `Library/FortressLibrary.fss` and the other interpreter-world `.fss` | interpreter; the compiled checker, in the checker count; the compiled path from the switch-over; the specification's Part IV, generated from its `.fsi` (`Specification/library/default-libraries.tex:27,39`) | `testSystem` 408; the checker count; `SpecData` 133 and `demos` 62 outside the gate | the compiled path does not link it before the switch-over |
| `Library/CompilerLibrary.fss`, `Library/CompilerAlgebra.fss`, `LibraryBuiltin/CompilerBuiltin.fss` | compiler, every compiled program, until the switch-over deletes them; nothing is added to them (POSITIONS 2026-09-21) | `library_tests` 83 directly; 280 programs by consequence | `RR64` in 12 executed programs, `NN32` in 7, `NN64` in 5 |
| `LibraryBuiltin/AnyType.fss` | both | everything | — |
| `nativeHelpers/`, `compiler/nativeInterface/` | compiler (`import java`); the wrapper generator wraps every method of a named class, private ones too, and fails the import on an unmappable type (FACTS "Two constraints of the test and native machinery") | 25 executed programs import one, no direct test | the interpreter's `import java` route does not work and has no test (FACTS § The territory map) |
| `syntax_abstractions/` | both, before phase 1 | 19 unit tests, one green program | 16 of 17 whole-program tests red as shipped, not re-checked since; nothing on the compile path |
| `Shell.java` flags and phase orders | both; which desugarings and which checks run per path | every CommandTest and every `run` subprocess | `typecheck-old` fails by design |
| `build.xml`, `default_repository/configuration` | the suites and the source path; `fortress.unittests.noopt` hides 283 tests; `compileAll` deletes the tracked `default_repository/caches/global.map` (FACTS "`ant compileAll` deletes a tracked file") | the suite, by running it | a stale `build/` is tested silently |
| `bin/fortress`, `bin/run`, `bin/run_classpath` | the two JVMs and their classpaths; `JAVA_FLAGS`, whose absence gives `bin/fortress` a 256 MB heap, not the harness's 768 MB (FACTS "Three heaps run the interpreter") | `shelltests` (2, reachable only by hand) | — |
| `Specification/` (the standard) | neither path; the PDF (`./ant genSource`, `./ant tex` in `Specification/fortress/`); each change a `\revision` callout plus an Appendix I entry quoting the original (POSITIONS 2026-09-26, S1) | the build | the text against the library, except at a gather whose brief asks (POSITIONS 2026-09-26, the number chapters) |
| `explorations/apl/mg/`, `run-c4/src/` (the target program) | interpreter; compiled, its eighteen components stop at name resolution until the switch-over | the 40 checks, by hand, never in the gate (POSITIONS 2026-09-19); the ladder holds the eighteen at their phase | no four-thread run since rung F changed two model lines (`run-c4/cold-cache/ROWS.md`; `compile-ladder/rung-flat-tower/REPORT.md` § 10) |

Two cycles to keep in mind when ordering edits: `compiler ↔ scala_src` (200/111 imports) and `compiler ↔ interpreter` (18/28; `Driver` and `WellKnownNames` need each other), so a change in the checker's Java index layer is a change on both paths (`modules-and-phases.md` A.3).

## 8. What this map does not settle

Every open decision, which `coordinator/PLAN.md` holds in the order it needs deciding. Those are Pavol's.

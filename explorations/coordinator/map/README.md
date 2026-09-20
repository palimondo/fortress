<!-- The territory map, assembled 2026-09-16 by the coordinating session from four survey reports in this directory, before the historical source tree is opened for modification. Parts 1-4 are the surveys (read them for the evidence); parts 5-7 are written here: the gaps on the path to a fast compiled microGPT in dependency order, the development loop, and what touching one module does to the rest. Every claim cites a survey section or a file:line. Read after FACTS.md and POSITIONS.md; it does not repeat them. -->

# The territory map

## 0. Terms used here

Path: one of the two execution routes, the interpreter (`fortress <file>.fss`, "walk") or the compiler (`fortress compile` then `fortress run`); "both paths" means the shared front end.

World: which prelude a run links against; the interpreter world is `FortressLibrary` + `FortressBuiltin` + `AnyType`, the compiler world is `CompilerLibrary` + `CompilerBuiltin` + `AnyType` (`modules-and-phases.md` B.13).

Prelude: the library a world loads without an import; "the compiler prelude" is the three compiler-world apis, 2,156 lines against the interpreter's 5,219 (`spec-to-implementation.md` §2).

Gate: the check a change must pass before it is accepted; today `ant compileAll && ant testFast && ant testSystem`, 1,377 + 382 tests, and nothing else (`test-coverage.md` D.1).

Shadow: a prototype of a sealed-tree edit made by compiling edited copies of the files and putting the class files ahead of the real ones on the classpath; no tracked file changes (FACTS, template-checking section).

Sealed tree: everything outside `explorations/` and `research/`, unchanged by the revival except the build ladder; opening it is the phase boundary Pavol has deferred.

## 1. The five surveys, and the walkthrough beside them

`modules-and-phases.md`: the 22 packages with sizes, the import graph, the dead modules, the two pipelines phase by phase, the cache, the runtime, native interop, and the one-table divergence of the paths (B.14).

`spec-to-implementation.md`: the 53 chapters of the July 2012 draft, a table of about 110 features with the parser rule, checker class, interpreter, codegen and prelude location of each, and the layered picture of the numeric tower (§4).

`test-coverage.md`: the census of every test corpus and JUnit class, what the 1,377 and 382 are made of, the two corpora that never meet, the blind spots by module, and the loop timings.

`dormant-code.md` (part five, added at Pavol's request): the census of what is present, carries a design, and does not run: commented-out library declarations and `Library/incomplete/`, commented-out visitors and off-by-default flags in the source, commented-out test halves and the aspirational directories, the spec's genuinely dormant text and its 62 "not yet supported" notes, the papers; each item judged finished-unwired, sketch, superseded or unknown, and tied to a path step.

`design-intent-sources.md`: the five places rationale is written (in-repo papers, the Steele corpus, our extracts, the spec's draft-only notes and Internal Document, source comments and commits), and a table by design area of what intent the spec leaves unstated.

`compile-path-walkthrough.md` (part six, written 2026-09-20 for the checker decisions): the compile path followed end to end, one section per stage — parsing, name resolution and grammar expansion, the checker (what it walks, what it writes, today's counts on the library), the desugaring switches that make the paths differ, code generation, the second JVM and the stamping class loader, native bindings in both worlds, `nat`, and a glossary.

## 2. The shape of the system, in twelve facts

The editable surface is about 148,000 hand-written Java lines and 19,700 Scala lines; the other 533,000 Java lines are generated and checked in (`modules-and-phases.md` A.1).

The AST in `nodes/` is the only intermediate representation from parse to bytecode; there is no lower IR and no optimizing middle (B.1).

The two paths share phases 1-4 exactly (pre-disambiguation desugaring, disambiguation, grammar rewriting of apis, pre-typecheck desugaring); the compiler adds integer-literal folding and codegen; the interpreter's type-check phase is present but inert because the flag defaults off (B.1, `Shell.java:1275`).

`fortress compile` and `fortress run` are two JVMs with two classpaths; `run` never enters `Shell.java` (B.0).

A user grammar is expanded before phase 1 runs on the component, by a Rats! run plus a javac run in a temp directory per compile; the GRAMMAR phase in the phase array touches apis only (B.3).

Generics are compiled once as template bytecode and stamped out by name rewriting in `InstantiatingClassloader` at class-load time; instantiation renames, it does not change representation (B.11).

The api cache key is a hash of the source directory path, not of content; staleness is decided by file dates alone (B.10).

Tasks and transactions exist twice, once in `interpreter/evaluator/` and once in `runtimeSystem/`, independent implementations of the same two ideas (B.11); a fix in one is not a fix in the other.

The interpreter's tower is `Equality` → `StandardPartialOrder` → `AdditiveGroup` → `MultiplicativeRing` → `Number` → `RR64`, and the compiler prelude has nothing above `Number`, which is itself empty; the prelude is a flat list of numeric traits, a different design, written to stay inside what the checker can do (`spec-to-implementation.md` §4.2-4.3).

Of the eight mechanisms the tower stands on, the compiler path lacks `nat`/`int`/`bool` parameters (checker, `STypesUtil.scala:550-557`) and where clauses (checker partial, codegen refuses at `CodeGen.java:2937, :4076, :4983`), and it alone has coercion (§4.1).

The gate is strong where the 2012 team spent its last two years (codegen, the compiler front end, diagnostics) and blind where the team stopped: the bytecode optimizer (zero tests), syntax abstraction (one file), the cache round trip (not asserted), concurrency (every shard runs one thread), the linker, the unparser (`test-coverage.md` C.3).

Contravariance in overloaded dispatch is switched off on every compiled program by a property that defaults true (`fortress.disable.contravariance`, `ProjectProperties.java:327-328`), the 2012 retreat of commit `c35aac139` still in force (`dormant-code.md` §2.2).

The spec's rationale exists only in the draft build (230 `\note{}` boxes and the Internal Document appendix, suppressed by `\ifrelease`), and its deepest layer, 27 named email threads, is not in the repository (`design-intent-sources.md` header, §4).

## 3. Answers to the questions Pavol asked on 2026-09-16

Is there a small core? The spec's own answer is no: the Internal Document's FAQ calls the core library "fictitious" and defines the language by Core versus Standard library, a split the tree does not have (`design-intent-sources.md` §4, `appendices/FAQ.tex:121-131`). What functions as the core is the mechanism layer of `spec-to-implementation.md` §4.1: traits with multiple inheritance, generics, static parameters of five kinds, operator declarations in traits, multiple dispatch, juxtaposition, coercion, where clauses. Everything numeric is library on top of that.

Is the test suite shared between interpreter and compiler? No. Two hand-ported corpora that share no file name; only `parser_tests/` is read by both; nothing compares the two paths on one program (`test-coverage.md` B).

Where is bytecode generated? `compiler/codegen/CodeGen.java` (6,750 lines) writes one jar per component into `bytecode_cache` with ASM; `OverloadSet` generates dispatch methods; `NamingCzar` lowers types; generic instantiation happens later, at load time (`modules-and-phases.md` B.9, B.11).

Where does the grammar extension happen? `syntax_abstractions/`, in two moments: template bodies of a grammar api are parsed when the api is analysed (GRAMMAR phase), and a component that imports the grammar gets a generated parser and is expanded by `Transform` before any phase runs on it (B.3).

Is there Java interop? Yes, two mechanisms that share nothing: `builtinPrimitive("class")` in the interpreter world (346 bindings) and `import java …` in the compiler world (19 lines, `nativeHelpers/` + `nativeInterface/`); `import java` also works on the interpreter path by a third route no test exercises; Java cannot call Fortress except through `MainWrapper` (B.12).

Where are Fortify and Fortick, and when would we touch them? `Fortify/fortify.el` (8,024 lines) plus `fortify.sty`, driven by `bin/fortify` and an Ant task; `bin/fortick` wraps it for backtick-delimited snippets in a document; `contrib/Emacs/fortress-mode.el` is an ordinary editing mode. They are presentation only; nothing on either path depends on them (A.6, `design-intent-sources.md` §6, the notation row). The Unicode operators and juxtaposition are the language itself; Fortify only typesets them.

Which spec counts? `Specification/`, "Working Draft, July 19, 2012", revision 4267. The sources under `Specification-1.0-frozen/` are a byte-identical copy of the same draft in 202 of 208 files; only the PDF beside them is the 1.0 artefact (`spec-to-implementation.md` §1.2). This corrects the FACTS entry that called the frozen tree "1.0".

## 4. Decisions the surveys put on the table

These are the workers' "Decisions not made" sections, grouped; none is taken here.

Gate: bring the bytecode optimizer into the gate by turning off `fortress.unittests.noopt` (226 tests, unknown red); restore concurrency to `testSystem` (a fifth, multi-threaded pass); repair, delete or document the four excluded suites; wire up or leave the orphaned corpora and the 121 dark files; add an interpreter-against-compiler differential test; activate `explorations/ci/gate.yml` and at which JDK (`test-coverage.md`).

Dead code: remove, keep or document `fib_tests/`, `compiler/optimization/Unbox.java` (an unfinished unboxing design, an intent source for step 4 below), `JavaDBRepository`, `compiler/environments/`, the optimizer, `parser_util/instrumentation/`, the top-level `CompilerLibrary/` (our `README.md:155` presents it as live), the unused cache directories (`modules-and-phases.md` A.5).

Library: whether `Library/GeneratorLibrary.fss` (469 lines of compiler-world generator protocol, imported by nothing) is the seed for generic reductions on the compile path or dead weight; whether the where-clause refusal in codegen becomes a ledger row (`spec-to-implementation.md`).

Mechanisms: whether `fortress build` replaces the hand-ordered compile recipe (needs a run); a content-based cache key; unifying the two runtimes; the GRAMMAR phase's position in the arrays (`modules-and-phases.md`).

Record: surface the spec's draft-only notes and Internal Document as a revival document; make `Papers/Implementation` buildable (its `FortressEncodings.tex` was never committed); pursue the lost email threads; read the not-working test directories as an intent source (`design-intent-sources.md`).

Dormant code (`dormant-code.md`): uncomment `CompilerAlgebra` into the compiler prelude (`WellKnownNames.java:124`) and see what the 1,377 say; read `Fortress.Operators.fsi.INCOMPLETE` (1,329 lines) as the design document for step 2's algebra; put `Library/incomplete/`'s unit libraries on the source path to see what the interpreter says; turn ENVGEN on with the repair its comment proposes; set `fortress.disable.contravariance` false to see what fails; restore `ASTJUTest.testFile` with a committed data file; rewrite `TestTask`'s multi-threaded half against `java.util.concurrent`; keep, wire or remove the six unwired library apis and `BirdyLib/`.

Ledger: the FACTS line on the frozen spec (corrected in this commit, see FACTS); the ledger's byte-identical convention narrowed to name its two exceptions; the wording "partial" for the locality stubs; the where-clause row.

## 5. The gaps on the path, in dependency order

The target is one program: microGPT compiled to bytecode and running fast, measured against a pure-Java baseline. The user code is `explorations/apl/mg/` (the focused base, 1,292 lines, `FlatArrays2` with shared `nat` dimensions) and `explorations/run-c4/src/` (the hand-written program, 621 lines, no grammar). Both run on the interpreter (40 of 40 checks); neither compiles today, and the first failure is `Array is undefined` (FACTS, execution model; ledger 303, 305).

The path has a trunk and one optional branch. Each step names what it needs from the steps before it, what it unblocks, the ledger rows, the plan on record, the gate that guards it, and what is lost by skipping it.

### Step 0. Make the gate see the path (no sealed-tree edit)

Needs: nothing. Unblocks: every later step, because each of them touches a layer the gate is blind to.

Dormant pieces that belong here (`dormant-code.md` §3.1): `ASTJUTest.testFile` is the round-trip test, off only because its data file is missing; `TestTask`'s multi-threaded half calls a method commented out with the jsr166y retirement and needs a rewrite, not a restore.

What: a compile-and-run test for a `nat`-parameterised program on the compiler path (none exists; the five `nat` files in the corpus stop at `typecheck` or assert unrelated errors, `test-coverage.md` C.2); the api-cache round-trip assertion (`ASTJUTest.java:654`, commented out; the site where the `NodeReflection` defect hid); a differential check that runs the three kernels and the C4 program on both paths and compares output (nothing like it exists, `test-coverage.md` B). The last one is the inner loop of the whole project and can live in `explorations/` as a script until Pavol adds a target.

Skip it and: the checker and prelude edits of steps 1-2 land with no regression guard on the layer they change, as the template prototype showed for the cache.

### Step 1. The checker learns `nat`, `int` and `bool` static parameters

Needs: step 0's `nat` test. Unblocks: any array type with dimensions in its type on the compiler path; the interpreter library as a prelude; `FlatArrays2` as written.

Rows: 307 (the wall), 23, 156, 214 (the interpreter-side symptoms of the same design). Plan: `reviews/nat-checking-plan.md` (nats as symbols and literals unified by equality, arithmetic left to run time; about 24 functions in five Scala files; flips no catalogued test; five compiler tests must stay green). Route: shadow first, as the template fix was done, then the sealed tree on Pavol's word.

Where the intent is written: sizes live in types on purpose (`preliminaries/intro/nutshell.tex:85-86`; `design-intent-sources.md` §6, generics row); the spec says `nat` parameters check shapes and optimize nothing (FACTS, the specification).

Skip it and: arrays on the compiler path carry no static shape; the vocabulary's thirteen wrong-shape refusals become run-time checks; the design intent is abandoned at the first step.

### Step 2. A prelude with arrays and the algebra above `Number`

Needs: step 1 (the array traits carry `nat` dimensions; `Matrix[\T, nat s0, nat s1\]` is the compiler prelude's only `nat` declaration today, `Library/CompilerLibrary.fss:512`). Unblocks: the kernels compile at all (303, 305); every later measurement.

Two routes, Pavol's deferred decision ("fleshing out the standard library", POSITIONS): (a) the interpreter's library becomes the prelude: it disambiguates cleanly, then raises 92 checker errors in the tower under the exclusion rules and needs its 108 `builtinPrimitive` bindings redone as `import java` (rows 308, 309; `perf-probes/prelude/REPORT.md`); (b) the compiler library grows `AdditiveGroup`/`MultiplicativeRing` above `Number`, then `Array`/`Vector`/`Matrix`/`Array3` and generic reductions (rows 71-82, 305; worklist item 2, about 4,000 lines by the earlier estimate of `compiled-path-gaps.md:454-458`; `GeneratorLibrary.fss` is the candidate seed for reductions).

Dormant pieces that belong here (`dormant-code.md` §1): `CompilerAlgebra` is one commented line out of the prelude and is what `GeneratorLibrary` (a finished generator and reduction protocol, not a stub) imports first; the `Maybe`/`Condition`/`Nothing` protocol sits commented in `CompilerLibrary.fsi:168-204`; `Fortress.Operators.fsi.INCOMPLETE` (1,329 lines) and `Fortress.Number` under `Library/incomplete/` are the original team's own draft of the algebra layer above `Number`, with `Field`; the 19 `IntLiteral` operators in `FortressBuiltin.fss:483-525` wait on coercion. Route (b) starts from these, not from a blank file.

The representation decision belongs here, not later: whether an `Array[\RR64,...\]` is backed by `double[]` or by boxed values is fixed by the type's declaration and its natives (rows 303, 306; `performance-roadmap.md` A1/A2; the order on record is "G2 with unboxing designed in", FACTS). Doing step 2 boxed and step 4 unboxed is the same library written twice.

Where the intent is written: the algebraic traits license reducers to split and reorder, which is why the laws are `property` clauses (`design-intent-sources.md` §6, tower row); the intended aggregate was the tensor with arrays and matrices as special cases (arrays row); nothing from the project's own era argues for a separate compiler world at all (prelude row, "none found").

Skip it and: no array-shaped program compiles; every interpreter-verified program stays interpreter-only, at the measured 6.8-8.9× and 156× costs (FACTS).

### Step 3. The codegen holes the program actually hits

Needs: step 2, because compilation stops at the missing types before it reaches these. Unblocks: C4 and the focused base through `fortress compile`.

Known: local function declarations (`CodeGen.java:2943` refuses `FnDecl` in a block; row 304), `label`/`exit` (no visitor; row 81), the `|||` token, `IntLiteral` comparisons, `typecase` literal typing (item 2), array literals and comprehensions if used (rows 12, 49, 50), object expressions if used (127, 128), contracts and where clauses on any declaration (refused, `spec-to-implementation.md` chapter 9 and 12 rows).

Not yet known: which of the "absent" constructs the two programs use. That is one probe, independent of steps 1-2 and doable now: walk the AST of C4 and the focused base, count node types, intersect with the set of `forX` methods `CodeGen` has (`CodeGen.defaultCase`, `:1668-1670`, throws for the rest). It turns "absent" into a list with counts.

Skip it and: step 2 lands and the program still does not compile, for reasons that were countable in advance.

### Step 4. The runtime cost, in measured order

Needs: step 2's representation decision for the third item; nothing for the first two. Unblocks: a compiled microGPT that is faster than the interpreter by more than the JIT alone.

Rows: 302 (`BaseTask.inATransaction()` builds a debug string before reading its flag, `BaseTask.java:246-249`, 88.9% of samples in the compiled loop; one line), 303 (`FFloatLiteral` keeps its value as a `String` and re-parses it per iteration, 35%), 306 (unbox by static type, back arrays with `double[]`; the remaining ~6× on array code). The bytecode optimizer (43 files, zero tests, `RemoveLiteralCoercions` among them) is an untested lever, not a plan; `compiler/optimization/Unbox.java` is the original team's unfinished sketch of the same idea (`modules-and-phases.md` A.5).

Dormant pieces that belong here (`dormant-code.md` §2): the 226 tests behind `fortress.unittests.noopt` are the optimizer's only exercise; `fortress.disable.contravariance` decides which overload a compiled call reaches and has been true since 2012; `Unbox.java` is a taxonomy with no analysis behind it, a sketch.

Note on the duplicate runtimes: row 302 is in `runtimeSystem/`, the compiled world's runtime; the interpreter's `evaluator/tasks/` has its own `BaseTask` and is untouched by that fix.

Skip 302 and: nothing else is measurable, the string dominates every profile. Skip 306 and: array code stays boxed at the 6.3-6.5× the Java models measured.

### Step 5. Parallelism on the compiled path

Needs: steps 2-4. Unblocks: the "parallel by default" half of the design on the path where speed comes from.

State: `ParallelismAnalyzer` and `genParallelExprs` exist in codegen; `FortressExecutable` sizes its pool from `FORTRESS_THREADS`; the gate runs every interpreter shard single-threaded and no compiled test is multi-threaded; the transaction test's multi-threaded half is commented out (`test-coverage.md` C.2). The interpreter's microGPT at four threads was measured (263 s against 420 s, FACTS); the compiled path has no such number.

Skip it and: the compiled program is a sequential JVM program with the runtime's overhead and none of its benefit.

### Step 6. The baseline

Needs: nothing; can be written any time. What: Karpathy's microGPT in plain Java, same PRNG and data, to know the floor the compiled Fortress is measured against (Pavol's stated plan). The interpreter's reference values (40 checks) are the correctness oracle for both.

### The optional branch: user grammars on the compiler path

Needs: step 2's route (a), or a compiler-world `FortressAst`/`FortressSyntax` plus the six names `List.fsi` needs (row 288), then the four validated template-checking edits and the fifth for the cache (rows 290, 291, 270; `perf-probes/template-check/REPORT.md`). Unblocks: the APL syntax layer of the focused base. Not needed for C4. It is off the trunk; it is validated; it waits on the unsealing decision.

### What is not on the path

Coercion on the interpreter path (19), dimensions and units (26, 27), tests and properties (120-125), type aliases (18), multifix (29), object-expression scoping (127, 128), the Fortify defects (62-66), the syntax-extension mechanism's dozen small defects (item 1): all real, none between the tree and a fast compiled microGPT. Pavol's verdict on the notation puts Fortify and the 2D rendering off the path by decision (POSITIONS).

## 6. The development loop

Measured (`test-coverage.md` D): `ant compileAll` about 80 s and it wipes the interpreter cache through `cleanCache`; `ant testFast` 5 min 23 s with the wall set by the indivisible `othercompiler` track; `ant testSystem` about 2 min in four shards; `ant testOnly -DtestPattern=X` 1 min 26 s for a one-second test, the cost being ant's fileset scan of `build/`; 222 child JVMs at about 200 ms each are not removable; every grammar-importing run leaves a 5.8 MB Rats! temp directory (`RatsUtil.java:138-144`), swept by `experiment/env.sh`.

The full gate is therefore about nine minutes after a rebuild, and neither test target compiles, so a stale `build/` silently tests the previous revision.

Three loops, fastest first, are what the path needs.

The shadow loop: compile one edited file with scalac or javac against the build classpath and put it first on the classpath; seconds instead of 80 s, no rebuild, no cache wipe, no tracked change. The template prototype ran its whole matrix this way; the recipe is in `perf-probes/template-check/run-all.sh` and `matrix.sh`. This is the loop for steps 1 and 3.

The program loop: the differential check of step 0 (three kernels plus C4 on both paths, output compared) run from `explorations/`; minutes. This is the loop for steps 2 and 4, and the only check that says whether the target program still works.

The gate loop: `compileAll && testFast && testSystem`, about nine minutes, before any commit under the sealed tree; plus the five compiler tests the nat plan names, run directly. Running one JUnit class directly with `junit.textui.TestRunner` and the `fastTrack` macro's properties avoids the 86 s ant tax (the template worker's recipe, `perf-probes/template-check/`).

Costs worth removing, in order of payoff: split the `othercompiler` track (the only structural gain left in `testFast`); decouple `compileAll` from `cleanCache` so a rebuild does not cold-start the next interpreter run; delete the Rats! temp directory at source (`RatsUtil`, already on the worklist as a one-liner); a direct-JUnit target in `build.xml` that skips the fileset scan. All four are `build.xml` or one-file edits, gated by the suite itself.

Not a loop cost but a trap: the api cache key is the source directory path and staleness is by file date (`modules-and-phases.md` B.10), so a moved tree or a same-date edit gives a silent stale result; the shadow technique sidesteps it, editing under the sealed tree does not.

## 7. Touch this, and that moves

Read as: change here → which path sees it → which tests guard it → where the gate is blind.

| Change | Paths | Guarded by | Blind |
|---|---|---|---|
| `useful/` (persistent trees, `Path`, `Debug`) | both, and every module (17 importers, 1,068 imports from `nodes` alone) | 100 direct unit tests, then everything | — |
| `astgen/Fortress.ast` (the AST) | both; regenerates 353,318 lines of `nodes/`, `FortressAst.scala`, `Library/FortressAst.fss`; changes the `.tfi` cache format | everything, by consequence | the cache round trip is not asserted; the generator's output is compared by mtime only |
| `parser/*.rats` | both; the same rule must change in the main grammar and in `templateparser/` (the full grammar again plus `Gaps.rats`); regenerates checked-in parsers | `ParserJUTest` 188, then everything | the template parser's copy has one green program |
| `parser_util/precedence_resolver/` (juxtaposition, precedence) | both, before the AST exists | 25 direct, then everything | — |
| `compiler/` phases 1-4 (desugarers, disambiguator, `OverloadRewriter`) | both; which desugarers run is a `Shell` flag, not the path | `compiler_tests` 642 for the compiler; `testSystem` 382 for the interpreter | a desugaring gated on `use_scala` changes one path only |
| `scala_src/typechecker/` (`STypeChecker`, `STypesUtil`, `KindEnv`) | compiler only in effect; `IndexBuilder` runs on both and refuses type aliases, `test`, `property` on both | 106 `typecheck` units + every `compile`; 22 unit tests for 59 files | `nat` programs are never compiled or run; template ASTs have no checker case |
| `nodes_util/ASTIO`, `NodeReflection`, `Unprinter` (the cache serializer) | both; every api and component passes through it | 13 primitive tests | the whole-file round trip is commented out (`ASTJUTest.java:654`) |
| `repository/` (`GraphRepository`, `ProjectProperties`, `ForeignJava`) and `compiler/WellKnownNames` (the world switch) | both | every suite, by consequence | the linker's aliasing; the cache key and staleness rules |
| `compiler/codegen/`, `OverloadSet`, `NamingCzar` | compiler | `compiler_tests` 642, `other_compiler_tests` 263, `library_tests` 55; 222 programs run | the optimizer (zero tests); where clauses and contracts refused, so never generated |
| `runtimeSystem/` (`InstantiatingClassloader`, `Naming`, `BaseTask`, transactions) | compiled programs at run time; `ByteCodeWriter` and `SimpleClassLoader` also from the interpreter's `ClosureMaker` | 18 direct (naming), 222 executed programs, 89 with generics | concurrency (no multi-threaded compiled test); transactions (one assertion) |
| `interpreter/` (evaluator, values, types, its own tasks and transactions) | interpreter | `testSystem` 382 (pass = no exception and no `fail` in output) | a wrong number the program does not check itself; concurrency (`FORTRESS_THREADS=1` per shard) |
| `Library/FortressLibrary.fss` and the other interpreter-world `.fss` | interpreter; also the compiler if route (a) of step 2 is taken | `testSystem` 382, `SpecData` 133 and `demos` 62 outside the gate | the compiler world never links it |
| `Library/CompilerLibrary.fss`, `LibraryBuiltin/CompilerBuiltin.fss` | compiler; every compiled program links them | `library_tests` 55 directly; 222 programs by consequence | `RR64` in 6 programs, `NN32`/`NN64` only in dark files |
| `LibraryBuiltin/AnyType.fss` | both | everything | — |
| `nativeHelpers/`, `compiler/nativeInterface/` | compiler (`import java`) | 23 programs, no direct test | the interpreter's `import java` route has no test at all |
| `syntax_abstractions/` | both, before phase 1 | 19 unit tests, one green program | 16 of 17 whole-program tests red as shipped; nothing on the compile path |
| `Shell.java` flags and phase orders | both; which desugarings and which checks run per path | every CommandTest and every `run` subprocess | `typecheck-old` fails by design |
| `build.xml`, `default_repository/configuration` | the gate itself and the source path; `fortress.unittests.noopt` hides 226 tests | the suite, by running it | a stale `build/` is tested silently |
| `bin/fortress`, `bin/run`, `bin/run_classpath` | the two JVMs and their classpaths; `JAVA_FLAGS` | `shelltests` (2, reachable only by hand) | — |
| `explorations/apl/mg/`, `run-c4/src/` (the target program) | interpreter today | the 40 checks at two pool sizes | pool 4 not re-run after the last vocabulary change |

Two cycles to keep in mind when ordering edits: `compiler ↔ scala_src` (200/110 imports) and `compiler ↔ interpreter` (18/26; `Driver` and `WellKnownNames` need each other), so a change in the checker's Java index layer is a change on both paths (`modules-and-phases.md` A.3).

## 8. What this map does not settle

The route for step 2, the unsealing itself and its tag, the gate decisions of §4, and which of the "not on the path" rows are still wanted for the language's own sake. Those are Pavol's.

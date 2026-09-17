<!-- The proposal for the next compile-ladder climb, written 2026-09-17 by an Opus worker at Pavol's request, answering his four questions in his order: what is in the next climb, whether it can be done in parallel, what design work must come first, where design intent came from, and what gate the climb runs under. It carries the conclusions of the three surveys in `next-climb/` (`candidates.md`, `provenance.md`, `worlds.md`) rather than restating them, and it takes none of the forks reserved for Pavol. Nothing in the tree was edited to write it and nothing was run. One line per paragraph. -->

# The next climb: proposal

## 0. The one thing to decide first

The next climb's content is small whichever way it is drawn, and the reason is measured: **104 of the 303 non-passing `tests/` files are gated on the array representation, on `nat` static parameters, or on the generator and reduction tower** (`next-climb/candidates.md` §0, §6, recomputed from `compile-ladder/after/raw/`), while **all fourteen rungs that are free of both reserved forks together move 38 files, mostly by one phase** (`candidates.md` §5).

So the decision in front of the climb is not which name to add next. It is whether the next unit of work is another set of small library rungs, or the design sketch that lets the array-representation fork be decided. §3 says what that sketch would contain and does not decide it.

## 1. What the next climb contains

### 1a. Free of both reserved forks, ranked by what they unblock

The ranking below is by value to the path, not by file count, and every file count is from `candidates.md` §2, which recounted the **whole** set of undefined names each file reports rather than the first one — the disambiguator reports all of them in one pass, so the head of `after/REPORT.md`'s ranking is a good description of the wall and a bad predictor of what a rung clears.

**1. `Maybe` / `Just` / `Nothing` over the existing `Option` machinery.** Clears two files alone (`ExceptionScoping.fss`, `oddJuxt.fss`), and appears in **59 of the 139** files at the disambiguate wall, more than any other single name. The compiler world already implements the protocol under other names — `value trait Option[\E19\]` with `Some`, `NoneObject` and a marker `None`, `CompilerBuiltin.fsi:649-661`, `.fss:1309-1367` — and no Java or Scala file mentions those names, so it is a pure library rung. It is the one rung that makes every later collection rung smaller. It carries its own naming fork; see §3c.

**2. `recordTime` / `printTime`.** Clears `nestedTransactions1`, `2` and `4`, and these are the best pass candidates in the whole candidate set: the rest of those three files is `atomic`, a `for` generator, a comparing `assert` (rung 4) and `println`, all supported. The native is already there (`nanoTime(): RR64`, `CompilerBuiltin.fsi:23`, `.fss:335`) and the top-level mutable variable the body needs is exactly what rung 3 landed.

**3. The named integral operators** `MOD`, `REM`, `GCD`, `LCM`, `LSHIFT`, `RSHIFT` on `ZZ32` and `ZZ64`. Clears `chain0.fss` and `rshiftbug.fss`; writable in pure Fortress over the `DIV`, `<<`, `>>` the compiler prelude already has, no native, no mention of `Integral`, so it does not touch the tower.

**4. `ceiling` / `floor` on `RR64`.** Clears `buffons.fss`; the cheapest rung available — two signatures uncommented at `CompilerBuiltin.fsi:439-440`, two bodies over natives already bound at `.fss:212-213`, with `opr SQRT` at `:900` as the model.

**5. `TryAtomicFailure`.** Clears `abortTest`, `nestedTransactions3`, `tryatomicTest` at the disambiguate wall by uncommenting one exception object at `CompilerLibrary.fss:283-285`. They then stop in codegen: there is no `forTryAtomicExpr` visitor.

**6. `printThreadInfo` / `printTaskTrace`.** Clears `taskTrace2`, `taskTrace3`, `atomic5`. Rung 7's shape exactly: a new `nativeHelpers/*.java`, one `NamingCzar.java` clause, two prelude declarations. The only candidate in the first batch that touches `.java`, which matters for the gate; see §5.

**7. `round` / `truncate` on `RR64`** (clears `roundBug.fss`), **the transcendentals** `sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `atan2`, `log`, `exp` (clears `juxtTwice.fss`, `oprTests.fss`; needs a new native file, since `simpleDoubleArith.java` has none of them), and **`widen`/`narrow`/`unsigned`/`signed`** (clears `fib13.fss`, `naiveSeq.fss`).

**8. `Char`.** Six files; the type exists in the compiler world under the name `Character` with all 40 methods, so this is a renaming question and not a missing declaration, and it is wired into `.java` by name at `NamingCzar.java:198,460,542`. It carries its own fork; see §3c.

Two candidates that look free and are not, kept here so they are not picked up by mistake. **`Thread`**, six `Spawn*.fss` files: a declaration clears their disambiguate wall and then they stop, because `CodeGen.java` has no `forSpawn` and the node falls to `defaultCase` at `:1668-1670`; a real `Thread` rung is a library declaration plus a codegen visitor plus a binding to `runtimeSystem/`'s tasks, which is step 5 of `map/README.md` §5, not a rung. **`builtinPrimitive`**, five files: the mechanism is resolved inside the interpreter's evaluator and has no occurrence anywhere under `compiler/`, so these five are permanently outside the compiler path as written; that is a fact about the ladder's denominator, not a rung.

### 1b. Behind the array-representation fork or the library route

`ImmutableArray` 26 files, `LexicographicOrder` 20, `Array1` 7, `Array` 5, `array1` 4, `Array2` 3, `matrix` 3, `array` 2, plus `vector`, `Vector`, `ReadableArray`, `Indexed`, `Rank`, `big`, `Integral`, `AnyIntegral`, `SumReduction`, `VoidReduction`, `ActualReduction`, `sequential` (`candidates.md` §2).

The eleven-file `typecheck` crash — `java.util.NoSuchElementException: head of empty list` at `scala_src/typechecker/impls/Misc.scala:876`, `dims.head` on a list left empty because an array literal's sub-expressions failed to type — is in the same block, and all eleven files are array tests. Fixing the crash turns it into a message; it does not make a file compile.

Two of these are behind the **library route** rather than the representation: `ImmutableArray`'s 26 files mostly name `Maybe`, `Comprehension`, `BigReduction`, `MonoidReduction` as well, reported inside `Library/List.fsi` and `Library/Set.fsi`, so what those files wait on is the interpreter's collection apis compiling against the compiler prelude. `LexicographicOrder`'s 20 files are the same wall seen from `List.fsi:67`, and two of them additionally need a `Range` with a static parameter — the compiler prelude's `trait Range` (`CompilerLibrary.fsi:141`) takes none where the interpreter's `Range[\I\]` takes one, which is also why `IndexOutOfBounds` sits commented out at `CompilerLibrary.fss:192-196`.

### 1c. Two corpus facts that change the target, not the work

**55 of the 381 `tests/` files are `XXX`-prefixed negative tests** written to fail with a stated message, and the ladder's pass criterion is exit 0 with no `fail` in the output, so a correctly behaving negative test cannot score a pass. The reachable ceiling on `tests/` is about 326, not 381 (`candidates.md` §1). Three `XXX` files currently score a pass, which is itself a question (§6).

The 29 `not_working_library_tests` did not move at all in the last climb and split into two causes, neither a missing name: **fourteen at `parse`** on an unbraced `comprises Self` clause, which is a `parser/*.rats` rung shared by both paths and off the microGPT path; and **eight at `disambiguate` on ambiguity rather than absence** — `Type name may refer to: Generator, CompilerBuiltin.Generator` — which is the class of problem rung 1 worked around by deleting a private `trait Equality` from `library_tests/MaybeTest9.fss`. Those eight are free of both forks and are gated on a spec question instead: `Specification/basic/declarations.tex:476-533` enumerates the permitted shadowings and ends "No other shadowing is permitted in a Fortress program", and a top-level declaration shadowing an implicitly imported library name is not among them. That is a semantics question against the spec and therefore reserved.

## 2. Whether parallelism fits

Straight from `candidates.md` §6: **batching fits this set mechanically, and the batch machinery is oversized for what remains.**

It fits mechanically. The candidates add disjoint declarations in two files, at most one of them touches `.java`, none needs another's names, and the review's replay of the eight real rungs off a common base gave **0 conflicts in 21 source-file pairs**, including three rungs that all edit `CompilerLibrary.fss` (`batched-climb-review.md` finding 3). A batch of four costs one gate instead of four, and the measured saving against an honest one-gate-per-rung baseline is **58.2 minutes over eight rungs** (`batched-climb-plan.md` §9).

It is oversized because the reason they fit is the reason they are worth little: they are independent because they are small. The rungs that would move the ladder are coupled by construction — `ImmutableArray` needs the representation and `nat` parameters and the generator tower, `LexicographicOrder` needs `Maybe` and the reductions and a parameterised `Range`, the array-literal crash needs the array types to exist before its error can even be reported — so they cannot be four parallel rungs under rule 2 no matter how the batch is drawn.

The last climb's own record settles what a name rung at the disambiguate wall buys: **none of its 22 new passes came from a name rung**. The eight `codegen`→`pass` moves were rung 3, the eight `typecheck`→`pass` moves were rung 4, the five `run`→`pass` moves were rungs 6 and 7; rungs 1, 2, 5 and 8, the name rungs, moved files one phase and changed 48 files' first error without moving them (`compile-ladder/CLIMB.md`).

What that implies: run **one** batch, not a climb of batches. One batch is the cheapest honest way to exercise the batched machinery end to end on real rungs, close the fork-free tail, and get three files that may actually pass. A second and third batch of the same kind would not be worth their gates.

### The first batch

`candidates.md` §4, checked against `batched-climb-plan.md` §5 (rule 1 disjoint declarations, rule 2 no content dependency, rule 3 at most one rung touching `.java` or `.scala`, rule 4 k = 4).

| rung | edit | clears at `disambiguate` | next stop |
|---|---|---|---|
| **A** `recordTime` / `printTime` | `CompilerLibrary.fss`/`.fsi`: two functions and one top-level mutable variable over the existing `nanoTime()` | `nestedTransactions1`, `2`, `4` | plausibly `pass` |
| **B** `TryAtomicFailure` | uncomment `CompilerLibrary.fss:283-285` + `.fsi` | `abortTest`, `nestedTransactions3`, `tryatomicTest` | `codegen`, no `forTryAtomicExpr` |
| **C** `ceiling` / `floor` on `RR64` | uncomment `CompilerBuiltin.fsi:439-440`, two bodies near `.fss:900` | `buffons` | `typecheck` |
| **D** `printThreadInfo` / `printTaskTrace` | new `nativeHelpers/*.java`, one `NamingCzar.java` clause, two prelude declarations | `taskTrace2`, `taskTrace3`, `atomic5` | `typecheck` |

Ten files leave the wall and three of them are the best chance at a pass anywhere in the candidate set.

Two substitutions are on the table and both change what the gate must be. Replacing **D** with the named integral operators (rung 3 of §1a, clears `chain0` and `rshiftbug`) or with `Maybe`/`Just`/`Nothing` makes the batch **library-only**, which is what lets the gate drop to `testFast` alone under §5's rule; keeping **D** keeps the full pair. That is a real trade and it is named in §5, not decided here.

## 3. What design work must come first

### 3a. The sequential piece: the array-representation fork

This is Pavol's and it gates the largest block of value, so what follows is what a sketch would have to contain for him to decide it, not a recommendation.

**What it decides.** Whether an `Array[\RR64,…\]` on the compiled path is backed by boxed elements or by a primitive `double[]`. It is decided by the type's declaration and its natives (`map/README.md` §5 step 2), which is why it cannot be postponed past the declaration: doing step 2 boxed and step 4 unboxed is the same library written twice.

**What is already measured, and is not in dispute.** Over the runtime's own box shape, boxing costs **6.3× on a 4192-element dot product, 6.5× on a 16×16 matrix product and 2.6× on the `rmsn` row lift** against primitive `double[]`, and the generic array object — `Object[]` behind an interface with a `checkcast` per read — adds only **9 %, 1.6 % and 4.8 %** on top (ledger 306). So the cost is the element boxes, not the genericity of the container; that distinction is the useful one for this fork and it is already paid for.

**Three concrete shapes, with what each costs.**

*Shape 1, generic and boxed:* `Array[\T, nat n\]` over `Object[]`, the interpreter's `ImmutableArray` design ported. It reuses the interpreter's library text, it is the only shape that makes the library route (the interpreter's collections as prelude) coherent, and it is the shape the 104 blocked files are written against. It needs `nat` checking (PLAN step 4) before it can be declared. It keeps the 6.3–6.5× measured above and defers unboxing to a rewrite.

*Shape 2, monomorphic and unboxed:* one non-generic trait per element type, which is **what the 2012 team actually shipped in this world**. `trait ZZ32Vector` (`CompilerBuiltin.fsi:532-549`) is backed by `int[]` in `compiler/runtimeValues/FZZ32Vector.java`, with natives in `nativeHelpers/simpleIntVector.java`, an elementwise operator vocabulary in `CompilerLibrary.fss:484-535` (`PREFIX_SUM`, `+`, `-`, `MIN`, `MAX`, `makeZZ32Vector` over `Range`), a `NamingCzar` binding at `:203,337,382,461,553`, and two live tests, `other_compiler_tests/VectorTest2.fss` and `VectorTest3.fss`. An `RR64Vector` by analogy needs no `nat` checking at all — `ZZ32Vector` carries no static parameters — and would be unboxed from the first line. Its cost is that it is a type per element type with no generic code above it, and that **the target program is not written that way**: `explorations/apl/mg/FlatArrays2.fsi` declares its whole vocabulary over `Vector[\T,s\]`, `Matrix[\T,n,d\]`, `Array3[\T,0,p,0,n,0,d\]` with shared `nat` dimensions (`:58-146`), so shape 2 means either rewriting the target program's api or accepting a second spelling beside it.

*Shape 3, generic type with a specialized representation:* `Array[\T, nat n\]` whose class-load instantiation picks a `double[]` backing, which is `performance-roadmap.md` A2. The obstacle is stated in the map's twelve facts: generics are stamped out by **name rewriting** in `InstantiatingClassloader` at class-load time, and "instantiation renames, it does not change representation" (`map/README.md` §2, `modules-and-phases.md` B.11). Whether the loader can be made to select a different backing per instantiation, and what that costs, is the single largest missing piece of evidence in this fork.

**What evidence is missing, and it is little.** One: whether `InstantiatingClassloader` can select a representation per instantiation at all, which decides whether shape 3 exists. Two: what an `RR64Vector` built on the `ZZ32Vector` precedent actually costs to write and whether the three kernels of `perf-probes/kernels/` run on it — that is a measurement, not an argument, and it would put a real number beside shape 2. Three: whether `nat` checking (PLAN step 4) lands cleanly, because shapes 1 and 3 both wait on it and shape 2 does not. §6 gives each of these as one experiment.

**What is not missing.** The performance numbers (ledger 306), the target program's spelling (`FlatArrays2.fsi`), the team's own precedent (`ZZ32Vector` and its five wiring sites), the design intent that sizes live in types on purpose (`preliminaries/intro/nutshell.tex:85-86`, cited in `map/README.md` §5 step 1). A sketch that assembled these four beside the three shapes would be enough to decide on, and it is a worker-sized piece of writing with one probe attached.

**The fork stays open here.** Naming three shapes is not choosing one, and the second reserved fork — the library route, the interpreter's collections as prelude against growing the compiler library — is entangled with it: shape 1 makes the library route coherent and shape 2 does not, so whoever decides the representation is also constraining that.

### 3b. The one piece that can start before the fork

`nat` static parameters in the checker, PLAN step 4. `reviews/nat-checking-plan.md` exists, the symptom is ledger 307 (`STypesUtil.makeInferenceArg` calls `NI.nyi()` for `KindNat`; a written-out `nat` is a `ClassCastException: VarType cannot be cast to IntExpr`), the visible cost today is the three-file `VarType` crash plus `Matrix[\T, nat s0, nat s1\]` being the compiler prelude's only `nat` declaration (`CompilerLibrary.fsi:267`), and **nothing in it depends on whether an array is boxed**.

If one piece of work larger than a batch is wanted that is not blocked on a fork, that is it. The route on record is shadow first (`perf-probes/template-check/run-all.sh`), then the sealed tree.

### 3c. Design a rung can carry on its own

Four decisions belong inside their rung and do not need to precede the climb, provided the rung states them under the provenance block of §4 and the skeptic checks them.

**The `Maybe` spelling.** The 2012 team's own compiler-world draft, commented at `CompilerLibrary.fsi:217-229` and mirrored in `Specification/library/apis/CompilerLibrary.tex:196-206`, spells the empty case `NothingObject[\T\]` with a separate unparameterised `object Nothing` for `coerce`; the interpreter, the spec's `FortressLibrary` and every test in the corpus write `Nothing[\T\]`. Both spellings cannot coexist. Following the team's draft or the corpus is a choice the rung must argue.

**The `Char` naming.** Rename `Character` to `Char` through the prelude and the three `NamingCzar` sites, which is the spec's spelling (`Specification/library/apis/FortressBuiltin.tex:204`) and costs a `.java` edit; or declare `trait Char` with `Character extends Char`, which is library-only but leaves `opr =(self, other:Char)` undeclared so the comparison half of `CharacterTest.fss` still fails; or record the divergence and mark the six files out of reach.

**The diagnostics semantics.** The interpreter's `printThreadInfo` prints the interpreter evaluator's own task state; the compiled world's tasks are the independent implementation in `runtimeSystem/`. Whether the compiler-side function prints the `runtimeSystem` task or merely the JVM thread is small and real, and the three tests only check that it does not fail.

**The failure-mode question**, already standing in `batched-climb-plan.md` §3: where a rung replaces a throwing stub with a computed value, the skeptic establishes what that value is and runs it against the spec.

What does **not** belong inside a rung, and should not be allowed to be decided there: the `Range` static parameter (it changes a declared type the prelude already has and cascades into `IndexOutOfBounds`), and the eight shadowing files of §1c (a semantics question against `declarations.tex`).

## 4. Where design intent came from, and what to require next time

Honestly: **the specification was rarely opened, and where it was opened it was mostly the generated listing of the library rather than the prose.**

The numbers are `next-climb/provenance.md` §4, from a scan of all 1,638 tool calls in the 36 agent transcripts. **32 calls touched anything under `Specification/`, 2.0 per cent.** Eighteen of those opened `Specification/library/apis/*.tex`, which is the library source typeset, not an independent authority. Seven opened a prose chapter and all seven belong to one line of work, rung 6's repair after review, about a defect the rung recorded and did not fix. Six were greps establishing an absence. Against that, **77 calls touched the interpreter's own library.** Rungs 1, 3 and 8 opened no `Specification/` file at all. **Zero** calls touched `Papers/`, `research/`, `appendices/FAQ.tex`, `appendices/future.tex` or any `\note{}` passage — that is, none of the five places `map/design-intent-sources.md` says the rationale lives, and that map part was opened by zero of the 36 agents.

Where the solutions did come from, rung by rung (`provenance.md` §2): the interpreter's library for rungs 2, 4, 5 and 6; an existing shape in the same file copied by analogy for rungs 3, 7 and 8; the team's own dormant draft for rung 1's prelude half; and **one invention with no cited precedent**, rung 1's narrowing of the `SFunctionalRef` case of `TypeWellFormedChecker.scala:134-141`, which deleted three of four walks on a principle the worker stated itself and left the checker asymmetric against `SMethodInvocation` — an area with four bodies of written argument (`Papers/Types`, `Papers/Dispatch`, `basic/overloading.tex`, `appendices/overloading-function.tex`), none of them opened.

Deviations were argued, which is the system working: every deviation found was argued in its rung's report, and rungs 2 and 4 put the argument beside the code. Rungs 5, 6, 7 and 8 did not, so a later reader of `CompilerBuiltin.fss` sees `asZZ64` bodies interleaved with throwing stubs and no note about where the line falls.

Citations were not checked: **three ledger spec-citations were written without the file being opened and all three were wrong**; two were corrected inside the session, row 312's `concrete-syntax.tex:1125-1128` (the `LocalVarDecl` production, where the rung was about the top-level `VarDecl` at `:346`) is still in the ledger.

The cause is the brief, not the worker (`provenance.md` §7). The rung planner's brief handed each worker a ranking whose `where` field was the interpreter's declaration site, named the interpreter's library first, `dormant-code.md` second, `spec-to-implementation.md` third as a pointer, and the specification **only once, as a prohibition**. The workers did exactly that, item for item.

**What to require next time**, taken from `provenance.md` §8 and endorsed here.

A four-line **provenance block** under the title of every rung report, each line ending in a `file:line` or the literal `none`: `problem:` the measurement that made this a rung; `spec:` the governing location, found from the feature's row in `map/spec-to-implementation.md`, with a citation under `library/apis/` labelled `(api listing)` and not sufficient on its own; `precedent:` the interpreter's declaration, the team's dormant draft, or the in-file shape copied, or `none` with why; `deviation:` one line per way the edit differs from precedent and from the spec's spelling, with semantic deviations also copied into the source as a comment beside the edit.

The **skeptic opens every `file:line` the block cites** — four `sed -n` calls — and refuses the rung if a line is missing or does not say what the block says. The same four lines are what goes into the ledger's spec-citation column, so the ledger stops carrying citations nobody opened.

The **planner pastes the row** from `map/spec-to-implementation.md` for the feature the rung touches into the brief, and the `map/design-intent-sources.md` §6 row for the design area when the rung changes a behaviour rather than adding a declaration. Both are table lookups. A brief that names a file the worker must go and find is what produced zero opens across 36 agents.

Keep the interpreter's library as the **default precedent** — it is the team's own working code for the same concept, it compiles, and it is pinned by the 382 interpreter tests — but not as an authority on semantics: its own `IntLiteral` arithmetic is commented out under a note about coercion, which is why rung 7 had no precedent to copy, and the compiler world's constraints (no `cmp`, no `builtinPrimitive`, no `Maybe`, reference-identity `===`) force a deviation in most rungs anyway. What is worth demanding is not fidelity but a named, checked deviation.

## 5. The gate for the next climb

`next-climb/worlds.md` answers `batched-climb-plan.md` §10 by reading the code: the two worlds are **separable with two named exceptions**, and no route was found by which an edit confined to the eight compiler-world library files can change the result of any test `ant testSystem` runs.

**The mechanical rule**, all four clauses checkable from `git diff --name-only` plus one grep. A batch may drop `ant testSystem` if and only if: (1) every changed, added or deleted path is one of `Library/CompilerLibrary.fss`/`.fsi`, `LibraryBuiltin/CompilerBuiltin.fss`/`.fsi`, `Library/CompilerAlgebra.fss`/`.fsi`, `Library/CompilerSystem.fss`/`.fsi` — no `.java`, no `.scala`, no `build.xml`, no `default_repository/configuration`, no `bin/`; (2) no file is added to or removed from `Library/` or `ProjectFortress/LibraryBuiltin/`, and no top-level declaration is renamed in a way that changes an api or component name; (3) `AnyType.fss`/`.fsi` are untouched; (4) `grep -rl 'CompilerLibrary\|CompilerBuiltin\|CompilerAlgebra\|CompilerSystem\|GeneratorLibrary' ProjectFortress/tests/` is still empty, which it is today. Any batch that fails one clause runs the full pair. Tests added under `library_tests/`, which every rung of the last climb added, do not break the rule: that directory is read only by `LibraryJUTest`, inside `testFast`.

Clarified 2026-09-17, during the first trial of the batched design, which found clause 1 unsatisfiable as written: documentation paths do not break it either, on the same mechanical ground as the `library_tests/` carve-out. `explorations/`, `research/` and `Specification/` are on no source path (`default_repository/configuration:44`), are compiled by nothing, and are read by neither corpus, so no change under them can reach a test. The clarification is not cosmetic: §6 of `batched-climb-plan.md` routes every rung's record through `explorations/compile-ladder/<name>/record.md` and the gather folds it into `explorations/coordinator/FACTS.md`, so **every** batch changes paths under `explorations/` by construction, and clause 1 read as a literal allowlist over every changed path could never be satisfied by any batch at all. Clause 1 ranges over paths that are compiled or executed; a batch that touches only the eight named library files plus documentation still qualifies.

The two exceptions are why clauses 2 and 3 exist: both library directories are on the interpreter's source path and resolution is by file name (`useful/Path.java:107-122`, `default_repository/configuration:44`), so **adding** a file in either directory makes the name visible to every interpreter program; and `AnyType` is in both worlds' root lists (`WellKnownNames.java:48-49,121-126`) and is global by construction.

**The recommendation for this climb: the full pair.** Not because the finding is weak, but because the first batch as drawn in §2 contains rung D, which touches `NamingCzar.java` and a new `nativeHelpers/` file and therefore fails clause 1 outright. The choice is real and it is Pavol's: keep D and run the full pair, or substitute the integral operators or `Maybe` for D, making the batch library-only and the gate `testFast` alone, worth the 147.6 s median that `iteration-cost.md:68` measured. Note the interaction — `batched-climb-plan.md` rule 3 permits **one** `.java` rung per batch, and the worlds rule permits **none** for the drop, so a batch cannot both use its `.java` allowance and take the saving.

Three further things the worlds survey established that the climb should carry. Of the last eight rungs, **five could have dropped `testSystem` (2, 4, 5, 6, 8) and three could not (1, 3, 7)**, which is the opposite grouping from the one `iteration-cost.md:124` implies. That file's number is defensible and **its stated mechanism is wrong**: its phrase is "`Library/` and `LibraryBuiltin/` sources the interpreter also loads", and not one of those six rungs edited a source the interpreter loads — all six edited `CompilerLibrary` or `CompilerBuiltin`, and the interpreter loads neither. Where the two documents disagree, `worlds.md` is the stronger evidence: it enumerates the eight commits file by file, where `iteration-cost.md` asserts the mechanism without one.

And the near miss worth watching: `Library/GeneratorLibrary.fss`/`.fsi` is a compiler-world file sitting unmarked in a directory the interpreter reads, importing `CompilerAlgebra` at line 13. The interpreter's import closure never reaches it today. If `Library/` gains files — which it will if the library route is taken — clause 2 is the clause that stops being free.

## 6. What is still unknown, and the one experiment each needs

**Can `InstantiatingClassloader` select a representation, not just a name, per instantiation?** This decides whether shape 3 of §3a exists and it is the largest missing piece. Experiment: a shadow prototype that instantiates one generic class two ways with different backing fields and loads both in one JVM, read against `InstantiatingClassloader.java:178` and the `if (false) { // Here will go all the magic expando-stuff. }` at `:168-172`.

**What does an unboxed `RR64Vector` on the `ZZ32Vector` precedent actually cost, and do the kernels run on it?** Experiment: one rung-sized prototype — `FRR64Vector.java` beside `FZZ32Vector.java`, `simpleDoubleVector.java` beside `simpleIntVector.java`, one `NamingCzar` binding, the trait and its operators — then `perf-probes/kernels/kdot.fss` and `kmat.fss` compiled and timed against the Java baseline already in `perf-probes/kernels/java/`.

**Does `nat` checking land cleanly?** Experiment: the shadow prototype of `reviews/nat-checking-plan.md`, its five compiler tests run directly, before any sealed-tree edit.

**Does any of the 38 files that would leave the disambiguate wall reach `pass`?** Experiment: run batch A–D and re-run the ladder subset; nothing short of running it answers this, and `candidates.md` §2 records the next visible wall for each candidate.

**Why does `comprises Self` fail to parse**, given that the grammar does admit an unbraced `comprises` clause (`NoNewlineHeader.rats:99-110`, `ComprisingTypes` at `:127-132`)? Experiment: one probe file narrowing the refusal, which would tell whether the fourteen `not_working_library_tests` at `parse` are a small grammar fix or a real one.

**Are the three `XXX` files that currently score a ladder `pass` scoring it correctly?** Experiment: read their `.compile`/`.run` outputs in `compile-ladder/after/raw/` against their expected failure messages.

**What is the agent concurrency cap in practice?** `batched-climb-plan.md` §2 assumes two, from the harness's documented rule, and still owes the measurement. Experiment: a throwaway workflow of four trivial agents with start timestamps parsed from `journal.jsonl`, the same parse `iteration-cost.md` used.

**Does the `ZipException: duplicate entry` that `ConditionalOpTruncation.fss` now produces in codegen interact with anything in the batch?** (`after/REPORT.md`, "Not verified".) Experiment: recompile that one file at head and read the jar the failure leaves in `bytecode_cache/`.

**Is the interpreter's collection api block tractable at all?** The library route's price is ledger 308: with the interpreter's prelude made the compiler's, disambiguation passes with zero errors and the checker then reports **92 errors at 95 locations in the library's own apis**. Experiment: classify those 92 by cause — the survey has them as 36 `excludes`-versus-`extends`, 26 mutual-exclusion, 26 ill-formed or bound violations, three singletons — and count how many are one shared defect, which turns an unknown into a number before the route is chosen.

## 7. Where the surveys disagree

They largely do not, and where they meet they reinforce: `candidates.md` §7 says the map was right on every point it leaned on, with one correction — `map/dormant-code.md` §1.4 says `WellKnownNames.java:124` reads `// compilerAlgebra(),` and is commented out, where on the current tree it reads `compilerAlgebra(),` and is live, which is rung 1's own work.

One tension is worth naming because it decides a choice: `candidates.md` §4 proposes a first batch containing a `.java` rung, and `worlds.md`'s rule then forces the full gate on that batch. That is an interaction, not a contradiction, and §5 puts it as a fork rather than resolving it.

One outright disagreement, and it is with a document outside the three surveys: `iteration-cost.md:124` on which rungs needed `testSystem` and why. `worlds.md` wins it on evidence, as §5 says.

One methodological tension: `provenance.md` concludes that the brief encoded the interpreter's library as the source of truth and that this is the lever to change, while `candidates.md` itself leans on the interpreter's library for almost every candidate it traces. Both are right and they do not collide — the interpreter's library is the right default for shape and spelling, and the thing being added is one cheap fixed spec lookup per rung, not a replacement.

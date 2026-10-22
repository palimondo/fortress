<!-- The FACTS clarity pass, chunk f1, 2026-10-22: F-7, F-12, F-18, F-19, F-20, F-21 and F-22 rewritten from the chunk's assessment, each with its change of meaning, the source of each sentence and its questions. -->

# FACTS chunk f1: the rewrite

The base is `main` as `assessment.md` read it. The assessment keeps F-9, F-11, F-17, F-23 and F-24, so this file holds the other seven. Each sentence's source was read again for this pass. A section number is that of the report named. Concepts that the entries use and that every worker needs are in `concepts.md`.

The seven entries hold 3,516 bytes in the record and 5,973 here. The growth is the conditions that the old text left out (F-7, F-19, F-20, F-21), the definitions of `bench1t` and of the repository, and the words that say what each pointer holds.

## F-7

> - F-7 **Walk and the compiled path share the parser and the phases, and only the compiled path runs the static type checker.** Walk switches the checker off, and no switch turns it on. So walk checks no static types of expressions: an ill-typed expression shows only at run time, most often as a failed dispatch. At load, walk refuses some ill-formed declarations: the `fortress-repo` skill's `interpreter.md`, "What walk checks", lists them (F-29, F-142, F-145). The phases and where the two paths part: the skill's "How a program runs". Detail: `repo-internals.md`, "The two worlds".

Meaning: one correction of scope. "Walk shows a type error only as a failed dispatch at run time" was too wide. Walk refuses some ill-formed declarations at load (F-29, F-142, F-145), and some type errors at run time are not dispatch failures, such as an `if` on a value that is not a `Boolean` (F-239). The claim is now about expressions, "most often" a failed dispatch.

Sources:
- Title and the switch: the old entry; `Shell.java:420-424`; the assessment's reading of `StaticChecker.java:228-229`.
- The refusals at load: `interpreter.md`, "What walk checks"; F-29, F-142, F-145.
- The rest: the old entry.

Questions for the curator: none.

## F-12

> - F-12 **On the compiled path, the scalar `RR64` loop `bench1t` ran in 0.74 s in one session's measurement; its remaining costs are the loop's generator, boxing and the transaction checks.** `bench1t` is 20 M iterations of `acc := acc a + b` over `RR64`, with both float literals written inside the loop. The time is the median of three loop-only runs at one thread (`compile-ladder/rung0/REPORT.md`, "The four timings"). Times taken in different sessions differ on this machine, so compare only times from one session. What remains: the `for` becomes the compiler prelude's `countedseqloop`, a recursive split over boxed indices with a closure call per element; each value is boxed (F-11); and each read and write of the mutable accumulator asks `BaseTask.inATransaction` (F-40). The boxing probe also names the volatile cell that holds the accumulator, four allocations per iteration, a call through an interface to the native wrapper, and the casts (`perf-probes/boxing/REPORT.md` section 5).

Meaning: the current claim kept; the repair's chronology moved out; one remaining cost added from the sources.
- Out, to the history: the before figure, 13.06 s without the fixes of rows 302 and 303, and the note that the reports' 9.34 s is another session's unfixed tree. Row 302 was the debug string that `BaseTask.inATransaction` built at each call. Row 303 was a float literal parsed again at each use. Both are fixed. The caution that only times of one session compare stays, since it governs any reading of 0.74 s.
- Added: the transaction check on the mutable accumulator. The fix of row 302 removed the debug string, not the call. The boxing report's section 5 counts two calls per iteration on the accumulator, and F-40 counts the check among a sized loop's costs. The old entry named only the generator and boxing.
- The boxing report's section 5 is cited again: the text of 2026-10-13 19:03Z cited it, and the cut dropped it. It also names the volatile cell, the four allocations, the interface call and the casts.

Sources:
- `bench1t`, the time, one thread, medians of three: rung0/REPORT.md, "The four timings".
- Sessions differ: the same section, "Two cautions on the numbers".
- `countedseqloop`: the old entry; boxing REPORT section 5, "About 7% ... the generator".
- Boxing: F-11.
- The transaction check: boxing REPORT section 5, "`BaseTask.inATransaction()`, called twice per iteration"; F-40; `perf-probes/nat/size-cost.md:89`.
- The representational rest: boxing REPORT section 5.

Questions for the curator: none.

## F-18

> - F-18 **On the compiled path, the class loader makes the class of a generic instantiation at its first use, by rewriting the template's bytecode with ASM.** The class is `InstantiatingClassloader`; the `fortress-repo` skill's "The compiled run time" gives the mechanism. A size is part of the made class's name, as in `pNatMeth$Box⟦3⟧`. Inside the class, the size's descriptor is `RTTIsize.of("<n>")` (F-129). Walk instantiates generics in its own evaluator, not by classes. Detail: `perf-probes/nat/java.md` section 1.

Meaning: unchanged, with the path named. The entry sat in "Execution model", which covers both paths, and named neither. The last sentence says that the rest holds for the compiled path only.

Sources:
- Title and the class: `runtimeSystem/InstantiatingClassloader.java:29-38` (ASM), `:178` (`loadClass`); the skill's "The compiled run time".
- The class name: `perf-probes/nat/java.md` section 1.
- The descriptor: F-129.
- Walk: the assessment, "Walk instantiates generics another way"; walk's `FTypeGeneric` (the text of F-39 of 2026-10-13).

Questions for the curator: none. Merging F-18's size sentence into F-129, so that F-18 holds only the mechanism or goes, was not done: F-18 is short and the class name helps a reader of error messages.

## F-19

> - F-19 **By the specification, the iterations of a `for` loop, the elements of a tuple and the operands of an operator may run in parallel, and a program must assume that they do.** A `for` loop is sequential only if every generator is, as `seq(g)` or `sequential(g)` makes it. Both paths start a task only where they judge it worth it: walk by `TupleTask.worthSpawning`, the code generator by `ParallelismAnalyzer`. So a program cannot count on parallel runs either. `FORTRESS_THREADS` sizes the pool of worker threads (the `fortress-repo` skill, "Parallelism and mutable state"). By grep, no program under `explorations/` writes `spawn` or `also`, so all parallelism in the project's own programs is of this implicit kind. Source: `Specification/basic/expressions/for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:59`.

Meaning: scoped to the specification, with one limit added. The old entry stated the rule as what the tree does. The specification says that a program "must assume" parallel iterations (`for.tex`) and that tuple elements and operands are evaluated "in parallel". Both paths spawn only when they judge it worth it. The survey of `spawn` and `also` now says what it means.

Sources:
- The rule: `for.tex:28-32`, "the programmer must assume that each loop iteration will occur independently in parallel unless every generator is explicitly sequential"; `tuple-expr.tex:23-24`; `operator-app.tex:59`.
- `seq` and `sequential`: `Library/FortressLibrary.fsi:771` (`seq(self)`), `:949` (`sequential[\T\]`).
- When a task is started: `TupleTask.java:119-121` (fewer than four surplus queued tasks), used at `Evaluator.java:342`; `CodeGen.java:4906` and `ParallelismAnalyzer.worthParallelizing`.
- The pool: the old entry; the skill's part.
- The survey: `git grep -w` over `explorations/*.fss` and `*.fsi`: four hits, each a comment or a string.

Questions for the curator: none.

## F-20

> - F-20 **Sizes, the `nat` and `int` static parameters, are values at run time; they check shapes, and no optimization uses them (F-40).** The compiled checker checks them (F-67), and a sized program loads and runs compiled (F-129). Under walk, a sized array type takes its size from an array built at run time: `f[\nat s\](v: Vector[\RR64,s\])` takes `s` from `array[\RR64\](3)`, and overloads on `Vector` and `Matrix` dispatch by rank (row 214). Only the array-type syntax `T[n]` with a `nat` parameter fails to unify with such an array, where `T[3]` with a literal size unifies (row 23). Walk matches sizes at dispatch. A mismatch, such as a `DOT` of two arrays of different lengths, is a `ProgramError`, "Failed to find any matching overload", that no `catch` takes (row 254). Source: `Specification/basic/trait-parameters.tex:97`.

Meaning: one correction. "Under walk, a `nat` parameter does not unify with an array built at run time" held for the `T[n]` syntax only (row 23). Row 214, which sharpens row 23, shows `Vector[\RR64,s\]` taking its size from such an array, and the model program relies on it. "A literal size" is now `T[3]`. F-40 is named for "no optimization".

Sources:
- Values at run time: `trait-parameters.tex:97`.
- No optimization: F-40.
- Checker and compiled run: F-67, F-129.
- `Vector` and rank dispatch: gap-ledger row 214 (POSITIVE-VERIFIED).
- `T[n]`: gap-ledger row 23.
- The mismatch: gap-ledger row 254.

Questions for the curator: none.

## F-21

> - F-21 **The February 2011 Working Draft's bare `Nothing`, one object for every `T`, compiles on neither path: the grammar refuses its `excludes` clause, and without that clause `T` is undefined.** The declaration is `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}` (`Specification-1.0-frozen/basic-lib/convenience.tex:40`). Both paths stop at a syntax error at `excludes`, since an object has no `excludes` clause (measured: `reviews/spec-refused-examples.md`, E4). Without that clause, both report `T is undefined` at the `T` of the `extends` clause: a `where` clause on an object binds no type variable of its `extends` clause, as row 17 holds for a trait. Today's specification refuses the form in any case, by instantiation exclusion, and marks it "Not allowed" beside the parametric `Nothing[\T\]` that the library writes (F-167). P-90 still calls the bare `Nothing` future work that waits for such `where` clauses; review-queue item 224 holds that conflict for the curator. Detail: `compile-ladder/rung-maybe/REPORT.md` section 5.

Meaning: two corrections of scope, one claim dropped, one pointer added.
- The title named "the specification's own declaration". Today's specification declares `value object Nothing[\T\]` (`Specification/basic-lib/convenience.tex:50`) and marks the bare form "Not allowed" (`:58-66`). The bare form is the Working Draft's.
- The title gave one cause, name resolution. The declaration stops first at the grammar, at `excludes`; `T is undefined` comes only without that clause. Both are now given.
- "The reason is name resolution, not code generation" is dropped. It suggested that a fix of name resolution would let the form compile. The specification refuses the form by instantiation exclusion whatever name resolution does (F-167, `convenience.tex:58-66`).
- P-90 still calls the form future work, against today's specification. The entry states that conflict and points to review-queue item 224, which holds it for the curator. The facts do not wait for his answer.
- The source of the stop at `excludes` is E4 of `reviews/spec-refused-examples.md`, measured on `SpecNothing`. The text of 2026-10-13 19:03Z cited it; the cut dropped it.

Sources:
- The declaration: `Specification-1.0-frozen/basic-lib/convenience.tex:40`.
- The stop at `excludes`: E4, "[measured, `SpecNothing`]".
- `T is undefined`: rung-maybe REPORT section 5, `probes/WhereClauseNothing.fss`; gap-ledger row 17.
- Today's specification: `convenience.tex:50-66`; F-167.
- P-90 and the conflict: P-90; review-queue item 224.

Questions for the curator: none. Merging F-21 into F-47, whose "where-clause examples stop ... at `T is undefined`" covers this case, was not done; it is an option for the coordinator.

## F-22

> - F-22 **When a component's name differs from the api that it exports, neither path finds the component, for an exported function or variable alike.** The specification resolves an imported api to any component that exports it (`Specification/basic/components/overview.tex`). The tree looks only under the api's name. The linker's component repository (`Linker.whoIsImplementingMyAPI`) does so, so `fortress link` and walk print "Could not find an implementation for API … on path". The code generator names a reference to an exported declaration after the api too, so files compiled one by one die with `NoClassDefFoundError`. A fix can go on either side: the repository could search the source path for the exporting component, or the code generator could emit the api-named forwarders that the team reserved in `CodeGen.java`. Workaround: name the api after its component. Gated by the expected failure `compiler_tests/XXXExportVarRungXLinked.test` (row 320). Detail: `compile-ladder/rung-export-var/REPORT.md`, "The measurement that separates them".

Meaning: one claim dropped, the rest unchanged.
- The old title compared functions with variables. That comparison corrected a batch record, which had said that functions link. The current property is the lookup by the api's name, which the title now states.
- "The repository" meant the linker's component repository, not the git repository; it is now named.
- "Not codegen's" is dropped. The code generator also resolves a reference to the api's name (row 320's notes: `functionalRefToPackageClassAndMethod`, `NamingCzar.jvmClassForToplevelDecl`). The report names two fixes, one in the repository and one in the code generator. Row 320's class, "implementation gap (codegen)", now agrees with the entry.

Sources:
- The specification: report, "the references of a component to an imported api are resolved to a component that exports that api" (`overview.tex:24-35`).
- The repository: report, `Linker.whoIsImplementingMyAPI` (`linker/Linker.java:62-89`), `GraphRepository.nodeDependsOnApi`.
- The two messages: report's probes; gap-ledger row 320.
- The two fixes: report, last paragraph of the section.
- Workaround and test: row 320; `XXXExportVarRungXLinked.test`.

Questions for the curator: none.

## For the coordinator

- `record.py apply` and `record.py check` were not run on `proposals.apply`, since this session's permissions refuse `record.py`. The file follows `f0/proposals.apply`'s form.
- F-21 and F-47 hold the same stop, `T is undefined`, for the specification's `where`-clause examples. One could own it.

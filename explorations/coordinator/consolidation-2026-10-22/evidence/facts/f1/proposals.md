<!-- The FACTS clarity pass, chunk f1, 2026-10-22: F-7, F-12, F-18, F-19, F-20, F-21 and F-22 rewritten from the chunk's assessment and fixed from its cold read and check, each with its change of meaning, the source of each sentence and its questions. -->

# FACTS chunk f1: the rewrite

The base is `main` as `assessment.md` read it. The assessment keeps F-9, F-11, F-17, F-23 and F-24, so this file holds the other seven. Each sentence's source was read again for this pass. A section number is that of the report named. Concepts that the entries use and that every worker needs are in `concepts.md`.

The second round follows `check.md` and `cold-read.md`. Each entry's "Second round" line says what changed.

The seven entries hold 3,516 bytes in the record and 7,848 here. The growth is the conditions that the old text left out (F-7, F-19, F-20, F-21, F-22), the definitions of `bench1t` and of the repository, and the words that say what each pointer holds.

## F-7

> - F-7 **Walk and the compiled path share the parser and the phases, and only the compiled path runs the static type checker.** Walk switches the checker off, and no switch turns it on. So walk checks no static types of expressions: an ill-typed expression shows only when it runs, as a failed dispatch or as another run-time error, such as F-239's refusal of an `if` on a value that is not a `Boolean`. At load, walk refuses some ill-formed declarations: the `fortress-repo` skill's `interpreter.md`, "What walk checks", lists them, with their evidence in F-29 (`comprises` clauses), F-142 (the Meet Rule for Functional Methods) and F-145 (uncovered abstract methods and `override`). The phases and where the two paths part: the skill's "How a program runs". Detail: `explorations/repo-internals.md`, "The two worlds".

Meaning: one correction of scope. "Walk shows a type error only as a failed dispatch at run time" was too wide. Walk refuses some ill-formed declarations at load (F-29, F-142, F-145), and some type errors at run time are not dispatch failures, such as an `if` on a value that is not a `Boolean` (F-239). The claim is now about expressions.

Second round:
- "Most often as a failed dispatch" was a frequency that nothing measured. The entry now names both kinds of run-time error, with no frequency.
- The three facts are glossed as the evidence of the list.
- `repo-internals.md` has its folder.

Sources:
- Title and the switch: the old entry; `Shell.java:420-424`; `StaticChecker.java:228-229`, "The Java version of the type checker is gone now."
- The run-time errors: F-239.
- The refusals at load: `interpreter.md`, "What walk checks"; F-29, F-142, F-145.
- The rest: the old entry.

Questions for the curator: none.

## F-12

> - F-12 **On the compiled path, the scalar `RR64` loop `bench1t` ran in 0.74 s in one session's measurement; the loop still pays for its generator, for boxing and for a transaction check at each use of its accumulator.** `bench1t` is `for i <- seq(1#20000000) do acc := acc 0.9999999 + 0.0000001 end` on a `var acc: RR64`, with both literals written in the loop. The time is the median of three loop-only runs at one thread (`compile-ladder/rung0/REPORT.md`, "The four timings"). Times taken in different sessions differ on this machine, so compare only times from one session. What the loop does, read in its bytecode (`perf-probes/boxing/REPORT.md` sections 4 and 5): the `seq` loop becomes the compiler prelude's `countedseqloop`, which runs the iterations in order by a recursive split over boxed indices, with a closure call per element; each value is boxed (F-11); and the accumulator is a volatile cell whose read and write each first call `BaseTask.inATransaction`, as for every mutable local (F-40, what a size costs at run time, whose sized loop pays the same check). Within the boxing and the cell, the report counts four allocations per iteration, an interface call to the native wrapper and the casts, the part that unboxed doubles and `double[]` would attack. No share of the 0.74 s is measured.

Meaning: the current claim kept; the repair's chronology moved out; the transaction check added from the sources, with no measured cost.
- Out, to the history: the before figure, 13.06 s without the fixes of rows 302 and 303, and the note that the reports' 9.34 s is another session's unfixed tree. Row 302 was the debug string that `BaseTask.inATransaction` built at each call. Row 303 was a float literal parsed again at each use. Both are fixed. The caution that only times of one session compare stays, since it governs any reading of 0.74 s.
- Added: the transaction check on the accumulator. The fix of row 302 wrapped only the debug message and kept the call (rung0/REPORT.md, "What changed"). The old entry named only the generator and boxing.

Second round:
- The first round cited the check to F-40, whose loop is another program, and the title's "remaining costs" suggested a measured share. The check on `bench1t` is now cited to the boxing report's section 4. The entry says that no share of the 0.74 s is measured.
- The title no longer closes a list that the body reopens. The report's four items are placed as its breakdown of boxing and the accumulator's cell.
- `bench1t` is given as its program, so `a` and `b` are the two literals.
- `countedseqloop` is said to run in order: its recursive split calls the two halves one after the other.
- The pointer to F-40 says what F-40 holds.

Sources:
- `bench1t`, the time, one thread, medians of three: rung0/REPORT.md, "The four timings"; the program, `git show fc89ee7a5^:explorations/perf-probes/boxing/bench1t.fss`.
- Sessions differ: the same section, "Two cautions on the numbers".
- `countedseqloop`: boxing REPORT sections 4 and 5; `Library/CompilerLibrary.fss:373-381`.
- Boxing: F-11.
- The transaction check: boxing REPORT section 4, "Offsets 0-26 and 59-91 of the same method guard the read and the write with `BaseTask.inATransaction()`"; rung0/REPORT.md, "What changed"; F-40, "boxing and a transaction check per local variable".
- The four items and what would attack them: boxing REPORT section 5, "What remains, roughly 2.8 s, is the genuinely representational part ... and *that* is what unboxed doubles and `double[]` would attack".

Questions for the curator: none.

## F-18

> - F-18 **On the compiled path, the class loader makes the class of a generic instantiation at its first use, by rewriting the template's bytecode with ASM.** The class is `InstantiatingClassloader`; the `fortress-repo` skill's "The compiled run time" gives the mechanism. A size is part of the made class's name, as in `pNatMeth$Box⟦3⟧`, the object `Box` at size 3 in the probe component `pNatMeth`. Inside the class, the size's descriptor is `RTTIsize.of("<n>")` (F-129). Walk instantiates generics in its own evaluator, not by classes. Detail: `perf-probes/nat/java.md` section 1.

Meaning: unchanged, with the path named. The entry sat in "Execution model", which covers both paths, and named neither. The last sentence says that the rest holds for the compiled path only.

Second round: the example class name is read in place, as the check suggests.

Sources:
- Title and the class: `runtimeSystem/InstantiatingClassloader.java:29-38` (ASM), `:178` (`loadClass`); the skill's "The compiled run time".
- The class name and `pNatMeth`: `perf-probes/nat/java.md` section 1 and `:16`.
- The descriptor: F-129.
- Walk: `interpreter/evaluator/types/FTypeGeneric.java:156-199`, `:298-301`.

Questions for the curator: none. Merging F-18's size sentence into F-129, so that F-18 holds only the mechanism or goes, was not done: F-18 is short and the class name helps a reader of error messages.

## F-19

> - F-19 **By the specification, the iterations of a `for` loop, the elements of a tuple, and the arguments of a call or an operator may run in parallel, and a program must assume that they do.** A `for` loop is sequential only if every generator is, as `seq(g)` or `sequential(g)` makes it. An implementation may also run them one after another (`evaluation/parallelism.tex:88-90`), so a program cannot count on parallel runs either. For the elements of a tuple and the operands of an operator, each path starts a task only where it judges it worth it: walk by `TupleTask.worthSpawning`, which also governs a call's arguments, and the code generator by `ParallelismAnalyzer`. Compiled, a function call's arguments run in order (`CodeGen.evalArg`). A `for` loop over a range without `seq` runs by splitting the range into `do … also do … end` blocks, and both paths run every such block as a task: walk's library splits down to single elements (`Library/RangeInternals.fss`), and the compiler prelude's `parloop` stops at `FORTRESS_LOOP_CHUNK` elements. `FORTRESS_THREADS` sizes the pool of worker threads (the `fortress-repo` skill, "Parallelism and mutable state"). By grep, no program under `explorations/`, the model programs and the probes, writes `spawn`, which starts an explicit thread, or an `also do` block, so their parallelism comes only from loops, tuples and arguments. The revival's tests under `ProjectFortress/` write both. Source: `Specification/basic/expressions/for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:58-59`, `evaluation/parallelism.tex:50-80`.

Meaning: scoped to the specification, with two limits settled from the code. The old entry stated the rule as what the tree does. The specification says that a program "must assume" parallel iterations (`for.tex`), that tuple elements, arguments and operands are evaluated "in parallel", and that an implementation may serialize them. The list now holds a call's arguments, which the record's text had left out; that is a closing of the list, not a change of the rule.

Second round:
- The first round said that both paths start a task only where they judge it worth it, after the sentence on loops. That holds for tuples, operands and arguments only. Loops split by `also do`, which both paths run as tasks with no such test. The entry now gives each mechanism. The specification's licence to serialize is now the reason that no program may count on parallel runs.
- The first round said that all parallelism in "the project's own programs" is implicit, since none writes `spawn` or `also`. The grep covers `explorations/` only, and the revival's tests write both. By the specification an `also do` block is itself implicit parallelism. The entry now bounds the grep and keeps `also do` with the implicit forms.
- Call arguments are restored to the title.

Sources:
- The rule: `for.tex:28-32`, "the programmer must assume that each loop iteration will occur independently in parallel unless every generator is explicitly sequential"; `tuple-expr.tex:23-24`; `operator-app.tex:58-59`, "Like function calls, argument expressions are evaluated *in parallel*"; `evaluation/parallelism.tex:50-80`, the list of implicitly parallel constructs.
- Serializing: `parallelism.tex:88-90`, "a Fortress implementation may choose to serialize portions of any group of implicit threads".
- `seq` and `sequential`: `Library/FortressLibrary.fsi:771` (`seq(self)`), `:949` (`sequential[\T\]`).
- Walk's tasks: `TupleTask.java:119-121`, read only in `Evaluator.evalExprListParallel` (`:337-342`); `Evaluator.forDo` (`:239-281`), a task for every `also do` block; `Library/RangeInternals.fss:1324-1342`.
- The code generator's tasks: `ParallelismAnalyzer.worthParallelizing` at `CodeGen.java:3431-3434`, `:4013`, `:4577`, `:4906`; `evalArg` (`:6385`), under the team's comment "Why isn't this parallel???"; `forDo` to `forDoParallel` (`:1962-1977`); `Library/CompilerLibrary.fss:359-371`.
- The pool: the old entry; the skill's part.
- `spawn` and `also do`: `parallelism.tex:24-27`, `:57-59`.
- The survey: `git grep -n -w -e spawn -e also -- 'explorations/*.fss' 'explorations/*.fsi'`, five hits, each a comment or a string; in the tests, `compiler_tests/NatRtTask.fss:11`, `XXXTaskArmLocalSlot.fss:12`, `AtomicTopLevelVar.fss:46`, `XXXSpawnInAtomicExitValue.fss:7`.

Questions for the curator: none.

## F-20

> - F-20 **Sizes, the `nat` and `int` static parameters, are values at run time; they check shapes, and no optimization uses them (F-40, what a size costs at run time).** The compiled checker checks them (F-67), and a sized program loads and runs compiled (F-129). Under walk, `Vector` and `Matrix` take their sizes from an array built at run time: `f[\nat s\](v: Vector[\RR64,s\])` takes `s` from `array[\RR64\](3)`, and overloads on `Vector` and `Matrix` dispatch by rank (row 214). The array-type syntax `T[n]` with a `nat` parameter does not unify with such an array, "Cannot unify … with ArrayType", where `T[3]` with a literal size does (row 23). Walk matches sizes at dispatch. A mismatch, such as a `DOT`, the library's inner product, of a 2×3 matrix by a 2×3 matrix, whose inner sizes differ, is a `ProgramError`, "Failed to find any matching overload", that no `catch` takes (row 254). Source: `Specification/basic/trait-parameters.tex:97`.

Meaning: one correction. "Under walk, a `nat` parameter does not unify with an array built at run time" held for the `T[n]` syntax only (row 23). Row 214, which sharpens row 23, shows `Vector[\RR64,s\]` and `Matrix` taking their sizes from such an array. "A literal size" is now `T[3]`. F-40 is named for "no optimization".

Second round:
- The first round widened the two rows to every sized array type, and said that "only" `T[n]` fails. No source tries another sized type. The entry now names `Vector` and `Matrix`, and says that `T[n]` fails, with its message.
- The mismatch example was "two arrays of different lengths". Row 254's case is a 2×3 by 2×3 matrix product: the shapes are equal, and the inner sizes differ.
- `DOT` and the pointer to F-40 are glossed.

Sources:
- Values at run time: `trait-parameters.tex:97`, "These parameters are instantiated at runtime with numeric values."
- No optimization: F-40, "No optimisation uses a size".
- Checker and compiled run: F-67, F-129.
- `Vector` and rank dispatch: gap-ledger row 214 (POSITIVE-VERIFIED).
- `T[n]` and its message: gap-ledger row 23.
- The mismatch: gap-ledger row 254; its reproducer, `explorations/apl/rung-6/w01_dot.fss` at `1ee3b0bc5^`, case (f).
- `DOT`: `FortressLibrary.fsi:1650-1651`, `:1754-1773`.

Questions for the curator: none.

## F-21

> - F-21 **The February 2011 Working Draft's bare `Nothing`, one object for every `T`, is accepted on neither path: the grammar refuses its `excludes` clause, and without that clause `T` is undefined.** The declaration is `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}` (`Specification-1.0-frozen/basic-lib/convenience.tex:40`). Both paths stop at a syntax error at `excludes`, since an object has no `excludes` clause (measured: `reviews/spec-refused-examples.md`, E4). Without that clause, both report `T is undefined` at the `T` of the `extends` clause: a `where` clause on an object binds no type variable of its `extends` clause, as row 17 holds for a trait. Today's specification refuses the form in any case, by instantiation exclusion, and marks it "Not allowed" beside the parametric `Nothing[\T\]` that the interpreter's library writes (F-167). P-90 still calls the bare `Nothing` future work that waits for such `where` clauses, not tried before then; review-queue item 224 holds that conflict for the curator. Detail: `compile-ladder/rung-maybe/REPORT.md` section 5.

Meaning: two corrections of scope, one claim dropped, one pointer added.
- The title named "the specification's own declaration". Today's specification declares `value object Nothing[\T\]` (`Specification/basic-lib/convenience.tex:50`) and marks the bare form "Not allowed" (`:58-70`). The bare form is the Working Draft's.
- The title gave one cause, name resolution. The declaration stops first at the grammar, at `excludes`; `T is undefined` comes only without that clause. Both are now given.
- "The reason is name resolution, not code generation" is dropped. It suggested that a fix of name resolution would let the form compile. The specification refuses the form by instantiation exclusion whatever name resolution does (F-167, `convenience.tex:58-70`).
- P-90 still calls the form future work, against today's specification. The entry states that conflict and points to review-queue item 224, which holds it for the curator.
- The source of the stop at `excludes` is E4 of `reviews/spec-refused-examples.md`, measured on `SpecNothing`. The text of 2026-10-13 19:03Z cited it; the cut dropped it.

Second round:
- "Compiles on neither path" is now "is accepted on neither path", since walk does not compile.
- The library is named as the interpreter's. The compiler's prelude writes a bare `value object Nothing end`, which the detail's section 5 describes.
- The P-90 sentence says, from P-90's own text, that the form is not tried before such `where` clauses exist.

Sources:
- The declaration: `Specification-1.0-frozen/basic-lib/convenience.tex:40`.
- The stop at `excludes`: E4, "[measured, `SpecNothing`]".
- `T is undefined`: rung-maybe REPORT section 5, `probes/WhereClauseNothing.fss`; gap-ledger row 17.
- Today's specification: `convenience.tex:50-70`; F-167.
- The two libraries: `Library/FortressLibrary.fsi:1008`; `Library/CompilerLibrary.fsi:224-236`.
- P-90 and the conflict: P-90, "it is not tried before then"; review-queue item 224.

Questions for the curator: none. Merging F-21 into F-47, whose "where-clause examples stop ... at `T is undefined`" covers this case, was not done; it is an option for the coordinator.

## F-22

> - F-22 **When a component's name differs from the api that it exports, neither path finds the component, for an exported function or variable alike.** The specification resolves an imported api to any component that exports it (`Specification/basic/components/overview.tex`). The tree looks only under the api's name, unless a user maps the api to its component by hand with `LinkShell`'s `alink` or `clink`. The linker's component repository looks this way (`Linker.whoIsImplementingMyAPI`), so `fortress link` and walk print "Could not find an implementation for API … on path" before any code is generated. The code generator names a reference to an exported declaration after the api, and the declaring class after the component. The link step rewrites such a reference to the component only when the repository names it, so files compiled one by one, without `fortress link`, die with `NoClassDefFoundError`. The missing step is the repository's: finding the component that exports the api. The report names two repairs, neither built: the repository could search the source path for that component, or the code generator could emit api-named forwarders, for which three comments in `CodeGen.java` leave a place. Walk and `fortress link` need the first. Workaround: name the api after its component. Gated by the expected failure `compiler_tests/XXXExportVarRungXLinked.test` (row 320). Detail: `compile-ladder/rung-export-var/REPORT.md`, "The measurement that separates them".

Meaning: unchanged from the record; the first round's drop of "not codegen's" is undone in substance.
- The old title compared functions with variables. That comparison corrected a batch record, which had said that functions link. The current property is the lookup by the api's name, which the title now states.
- "The repository" meant the linker's component repository, not the git repository; it is now named.
- The by-hand mapping is restored. The text of 2026-10-13 had it ("only `LinkShell`'s `alink`/`clink` register another"); the cut of that day dropped it.

Second round:
- The first round dropped "not codegen's" and said that a fix can go on either side. The code says otherwise. Naming a reference after the api is the team's design, which the link step completes. `whoIsImplementingMyAPI` returns the api's name only when its maps hold nothing (`Linker.java:70-76`), and otherwise records a rewrite from the api to the implementer (`:79-88`). `linkMyComponent` applies the rewrites (`:222-250`), and `GraphRepository.getComponent` calls `Linker.linkAll()` (`GraphRepository.java:204`). So the missing step is the repository's, as the report says: "The name coincidence is the *repository's* assumption, not codegen's".
- The forwarder stays as the report's second repair, but walk and `fortress link` refuse before any code is generated, so they need the repository's repair.
- The `NoClassDefFoundError` now has its cause: the declaring class is named after the component (`CodeGen.java:394`), and the reference after the api (`NamingCzar.repairedApiName`, `NamingCzar.java:1673-1679`).
- "Reserved" is now "three comments leave a place", one of them `/* Need wrappers for the API, too. */`.

Sources:
- The specification: report, "the references of a component to an imported api are resolved to a component that exports that api" (`overview.tex:24-35`).
- The lookup and the by-hand mapping: report, "Nothing populates that map except the user, by hand, through `LinkShell.main`'s `alink` and `clink` verbs"; `linker/LinkShell.java:41-70`; `Linker.whoIsImplementingMyAPI` (`linker/Linker.java:62-89`); `GraphRepository.nodeDependsOnApi` (`:337-350`).
- The two messages and the stop before code generation: the report's probes (`link-and-walk-preedit.txt:4-9`, `:45-60`); gap-ledger row 320.
- The link step: `Linker.linkMyComponent`, `:222-250`; `GraphRepository.java:204`; `linker/README`.
- The two repairs: report, last paragraph of the section.
- Workaround and test: row 320; `XXXExportVarRungXLinked.test`, `link_err_contains=Could not find an implementation for API ExportVarRungXLibApi`.

Questions for the curator: none. A ledger point is under "For the coordinator".

## For the coordinator

- `record.py apply` and `record.py check` were not run on `proposals.apply`, since this session's permissions refuse `record.py`. The file follows `f0/proposals.apply`'s form.
- F-21 and F-47 hold the same stop, `T is undefined`, for the specification's `where`-clause examples. One could own it.
- Row 320's class, "implementation gap (codegen)", disagrees with the report's "the repository's assumption, not codegen's" and with the linker's code. The first round said that the class agrees with the entry; it does not. That is a ledger correction, outside this chunk.
- F-7's old narrowing, "a type error only ... as a failed dispatch", also stands in the `fortress-repo` core. The entry no longer holds it.

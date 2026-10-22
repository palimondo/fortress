<!-- The clarity workflow's check of FACTS chunk f1 (F-7, F-12, F-18, F-19, F-20, F-21, F-22): each rewritten entry against the record's text and its sources, the cold reader's answers against the source meaning, and each failure classed with a proposed fix. -->

# FACTS chunk f1: the check

The writer's base is `main` at `4caa90c81`, as `assessment.md` read it. I read at `ef0bbbf17`. `git diff --stat 4caa90c81 HEAD` over `Library/`, `ProjectFortress/`, `Specification/`, the gap ledger, `compile-ladder/`, `perf-probes/`, `reviews/spec-refused-examples.md`, FACTS, POSITIONS and the `fortress-repo` skill is empty except for `review-queue.md`, whose item 224 still holds the conflict that F-21 names. So every line cited below holds at both. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`, then the sections, rows, code and chapters that each sentence cites. I ran only reads and greps.

| Entry | Fidelity | Comprehension | Failures |
|---|---|---|---|
| F-7 | holds; one added frequency word | two passages unresolved | wording 2, concept 1 |
| F-12 | one pointer holds another loop's fact; title's list closed, body's open | five passages unresolved | uncertain fidelity 1 (settled), wording 3, concept 1 |
| F-18 | holds | two minor passages | pass (one optional wording) |
| F-19 | two claims broader than their sources, settled; one list narrower than its source | four passages unresolved | uncertain fidelity 2 (settled), wording 2, concept 1 |
| F-20 | one rule broader than its two rows; one example that misdescribes its measurement | five passages unresolved | uncertain fidelity 1 (settled), wording 3, concept 1 |
| F-21 | holds | four passages unresolved | wording 3, concept 1 |
| F-22 | one dropped claim that the code supports, settled against the rewrite; one dropped condition | three passages unresolved | uncertain fidelity 1 (settled), wording 3 |

## F-7

### Fidelity

**1. "most often" is a frequency that nothing measured (wording).** Quoted: "So walk checks no static types of expressions: an ill-typed expression shows only at run time, most often as a failed dispatch." The record's text: "so walk shows a type error only as a failed dispatch at run time." The assessment's correction is that some run-time type errors are not dispatch failures, F-239's "If clause did not return boolean" for one. No source counts how often each kind occurs, so "most often" adds a claim. The skill's core says "walk finds a type error only at run time, as a failed dispatch", so the skill has the record's old narrowing too. That is not this entry's fault, but the entry should not add a frequency to fix it.

**2. The rest holds.**
- "Walk switches the checker off": `Shell.java:420-424`, `setScala(false)` for `walk`.
- "no switch turns it on": with `use_scala` false, `StaticChecker.checkCompilationUnit` throws "The Java version of the type checker is gone now." (`compiler/StaticChecker.java:228-229`). So setting the type-checking property under walk gives an error, not a check.
- The refusals at load: `interpreter.md`, "What walk checks", lists `comprises` extenders (F-29), the Meet Rule for Functional Methods (F-142), uncovered abstract methods and `override` that overrides nothing (F-145).
- The title is the record's. Note: `typecheck`, `link` and `build` run the checker too (`Shell.java:410-419`, `:453-456`). The skill defines the compiled path by `compile` and `run`, so the cold reader wrote "Only `fortress compile` runs the checker". The reader's own consequence then names `fortress typecheck`, so no misreading follows. F-9 owns `typecheck`.

### Comprehension

- The reader's "Established" matches the source, apart from the frequency above.
- `repo-internals.md`: the reader looked for it in the skill's `references/` and could not place it. It is `explorations/repo-internals.md`. Entries give a note's path from `explorations/`, a test's path from `ProjectFortress/` (`compiler_tests/...`) and the specification's from the repository's root. No part of the skill says so. The same applies to every pointer of F-12, F-18, F-21 and F-22.
- "(F-29, F-142, F-145)": the reader could not tell whether the three facts support the list or add to it. They support it: each is the evidence of some lines of the list.
- The reader adds that `interpreter.md` lists desugarings that walk switches off inside the shared phases. That is a correct reading of the skill. The entry, like the skill's core, says "share the phases" in the sense of one phase list. Not a failure.

### Class

- **Wording.** In place of the second and third sentences:

  > So walk checks no static types of expressions: an ill-typed expression shows only when it runs, as a failed dispatch or as another run-time error, such as F-239's refusal of an `if` on a value that is not a `Boolean`. At load, walk refuses some ill-formed declarations: the `fortress-repo` skill's `interpreter.md`, "What walk checks", lists them, with their evidence in F-29 (`comprises` clauses), F-142 (the Meet Rule for Functional Methods) and F-145 (uncovered abstract methods and `override`).

- **Wording.** "Detail: `explorations/repo-internals.md`, "The two worlds"", unless the concept below is defined.
- **Concept: how a record entry abbreviates a path.** A note is named from `explorations/`, a test from `ProjectFortress/`, the specification and the library from the repository's root. Define it for every worker in the `fortress-repo` core, "The record", beside the list of the record's files. It is not this entry's alone.

## F-12

### Fidelity

**1. The transaction check: present, cost not measured, and cited to another loop's fact (uncertain fidelity, settled).** Quoted: "and each read and write of the mutable accumulator asks `BaseTask.inATransaction` (F-40)". The writer added this cost from F-40 and `perf-probes/nat/size-cost.md:89`. Both hold a different program: `SizedSum`, a `while` loop over a `ZZ32Vector`, with "six times per iteration". F-40 says "boxing and a transaction check per local variable cost about 31 ns per element" for that sized loop.
- For `bench1t` itself, the check is in the boxing report's section 4: "Offsets 0-26 and 59-91 of the same method guard the read and the write with `BaseTask.inATransaction()`", and section 5's "called twice per iteration".
- That the call remains after the fix of row 302 is settled by rung 0's diff (`compile-ladder/rung0/REPORT.md`, "What changed"): the fix wraps only the debug message, `if (debug) debug(...)`, and keeps the call.
- What the call costs now is measured nowhere. Section 5's 34 % was the debug string, and rung 0 says "The transaction check is what `bench1h`'s own 8.0872 s drop measures", meaning the string's removal.

So the entry may say that the loop still makes the check, cited to the boxing report's section 4, with F-40 as the general fact on mutable locals. It should not suggest a measured share. The title's "remaining costs" invites that reading.

**2. The title closes a list that the body reopens (wording).** Quoted, title: "its remaining costs are the loop's generator, boxing and the transaction checks." Body: "The boxing probe also names the volatile cell that holds the accumulator, four allocations per iteration, a call through an interface to the native wrapper, and the casts". Section 5 gives what remains after the cheap fixes as two things: "About 7% (0.63 s) is the generator" and "What remains, roughly 2.8 s, is the genuinely representational part: the volatile transacted cell, the four allocations, the interface hop from `CompilerBuiltin.juxtaposition` to the native wrapper, and the `checkcast`s — and *that* is what unboxed doubles and `double[]` would attack." So the four items are section 5's breakdown of boxing and the accumulator's cell, not costs beyond the three. The cold reader could not tell which: "these could be extra costs beyond the three, or a finer split of "boxing" and the accumulator cell."

**3. The rest holds.**
- 0.74 s: the median 0.7384 s, of 0.7384, 0.7261 and 0.7423 ("The four timings").
- "the median of three loop-only runs at one thread": the same section, `FORTRESS_THREADS=1`, "Medians of three, loop only".
- "20 M iterations of `acc := acc a + b` over `RR64`, with both float literals written inside the loop": the same section. The program, from `git show fc89ee7a5^:explorations/perf-probes/boxing/bench1t.fss`, is `for i <- seq(1#20000000) do acc := acc 0.9999999 + 0.0000001 end` with `var acc: RR64 := 0.0`.
- "Times taken in different sessions differ on this machine": "Two cautions on the numbers", "only a before/after pair taken in one session compares".
- `countedseqloop`: section 4 and section 5, now `Library/CompilerLibrary.fss:373-381`.
- Moving the 13.06 s and the reports' 9.34 s to the history follows the writer's brief, step 9. The 0.74 s stays stated as one session's measurement.

### Comprehension

- "remaining" and "What remains": the reader asked "remaining after what?" The fixes of rows 302 and 303 left the entry, so nothing in it says what came before. The fix is to say what the loop still does, not what remains.
- "with both float literals written inside the loop": the reader could not tell that `a` and `b` are the literals, or why it matters. The program's own text answers both. What matters is that `bench1t` keeps the literals in the loop, where `bench1h` hoists them.
- `countedseqloop`, "a recursive split over boxed indices": the reader took "recursive split" for parallel work and asked whether the loop runs in parallel at more than one thread. It does not. `bench1t`'s generator is `seq(...)`, and `countedseqloop` calls its two halves one after the other (`CompilerLibrary.fss:373-381`). A `for` without `seq` becomes `parloop` instead, which forks its halves by `also do` (`:359-371`). This is a concept the skill lacks (below).
- "F-40" here and in F-20: the reader suspected a wrong citation, since F-40 is cited for a transaction check here and for "no optimization" there. F-40 holds both: it is the fact on what a size costs at run time, and its sized loop shows both costs. The pointer needs words.
- "the native wrapper": the reader's reading, the generated wrapper of a native arithmetic method, is right. Section 2 says the arithmetic is "written in the shape of the generated native wrapper".

### Class

- **Uncertain fidelity, settled** (1): the check is present (boxing report section 4; rung 0's diff), its cost unmeasured. The wording below follows from that.
- **Wording.** Title and body, in place of the entry from its title to its end:

  > - F-12 **On the compiled path, the scalar `RR64` loop `bench1t` ran in 0.74 s in one session's measurement; the loop still pays for its generator, for boxing and for a transaction check at each use of its accumulator.** `bench1t` is `for i <- seq(1#20000000) do acc := acc 0.9999999 + 0.0000001 end` on a `var acc: RR64`, both literals written in the loop. The time is the median of three loop-only runs at one thread (`compile-ladder/rung0/REPORT.md`, "The four timings"). Times taken in different sessions differ on this machine, so compare only times from one session. What the loop does, read in its bytecode (`perf-probes/boxing/REPORT.md` sections 4 and 5): the `seq` loop becomes the compiler prelude's `countedseqloop`, which runs the iterations in order by a recursive split over boxed indices, with a closure call per element; each value is boxed (F-11); and the accumulator is a volatile cell whose read and write each first call `BaseTask.inATransaction`, as every mutable local does (F-40, a sized loop's costs). The report counts four allocations per iteration, an interface call to the native wrapper and the casts in the boxing and the cell, which unboxed doubles would remove. No share of the 0.74 s is measured.

- **Wording** (2): the clause "The boxing probe also names ..." becomes the report's own breakdown, as above.
- **Wording**: the pointer "(F-40)" carries its words, as above.
- **Concept: how the compiled path runs a `for` loop.** The compiler prelude turns a `seq` generator over a range into `countedseqloop`, which runs in order, and any other range into `parloop`, which forks its halves by `also do` until `FORTRESS_LOOP_CHUNK` elements remain (`Library/CompilerLibrary.fss:359-381`, `runtimeSystem/FortressExecutable.java:54-55`). F-19 needs it too. Define it in `references/compiler.md`, the compiled area part, beside the compiler's prelude.

## F-18

### Fidelity

The rewrite adds the path, as the assessment asked, and changes nothing else.
- The class loader and ASM: `runtimeSystem/InstantiatingClassloader.java:29-38` imports ASM, and `:178` overrides `loadClass`.
- The class name `pNatMeth$Box⟦3⟧`: `perf-probes/nat/java.md` section 1, "the instantiated class name already uses (`pNatMeth$Box⟦3⟧`)".
- The descriptor `RTTIsize.of("<n>")`: F-129 and the skill's "The compiled run time".
- "Walk instantiates generics in its own evaluator, not by classes": walk's `FTypeGeneric` makes and memoizes its instances in the evaluator (`interpreter/evaluator/types/FTypeGeneric.java:156-199`, `:298-301`). This is a reading, and it holds.

### Comprehension

The reader's account matches the source. `pNatMeth` is a probe component of `perf-probes/nat/` (`java.md:16`), as the reader guessed. "the size's descriptor" is the skill's word for the `RTTIsize` object, as the reader found.

### Class

Pass. Optional wording: "as in `pNatMeth$Box⟦3⟧`, the object `Box` at size 3 in the probe component `pNatMeth`".

## F-19

### Fidelity

**1. "Both paths start a task only where they judge it worth it" holds for tuples and arguments, not for loops or `also` blocks (uncertain fidelity, settled against the entry).** Quoted: "Both paths start a task only where they judge it worth it: walk by `TupleTask.worthSpawning`, the code generator by `ParallelismAnalyzer`. So a program cannot count on parallel runs either." The sentence follows the one on `for` loops, so it reads as covering all three constructs. The writer's sources cover only lists of expressions:
- Walk: `worthSpawning` (`TupleTask.java:119-121`, "`getSurplusQueuedTaskCount() <= 3`") is read only in `evalExprListParallel` (`Evaluator.java:337-342`), which evaluates tuple elements and arguments. Walk's `also do` (`Evaluator.forDo`, `:239-281`) makes a `TupleTask` for every block without that test. Walk's library splits a range's `for` loop by `also do` down to single elements (`Library/RangeInternals.fss:1324-1342`).
- Compiled: `ParallelismAnalyzer.worthParallelizing` guards tuples (`CodeGen.java:3431-3434`), an operator's operands (`forOpExpr`, `:4888-4907`), a binding's right-hand sides (`:4013`) and field initializers (`:4577`). A function call's arguments are never parallel: `evalArg` evaluates them in order, under the team's comment "Why isn't this parallel???" (`for_RewriteFnApp`, `:6501-6527`). `forDo` sends every `also do` of two or more blocks to `forDoParallel` with no test (`:1967-1977`). A `for` without `seq` becomes the prelude's `parloop`, which forks by `also do` until `FORTRESS_LOOP_CHUNK` elements remain (`CompilerLibrary.fss:359-371`).

The conclusion "a program cannot count on parallel runs" holds, and the specification gives it outright: "a Fortress implementation may choose to serialize portions of any group of implicit threads" (`Specification/basic/evaluation/parallelism.tex:88-90`). That is the better source.

**2. "all parallelism in the project's own programs is of this implicit kind" is broader than the grep, and puts `also` on the wrong side (uncertain fidelity, settled against the entry).** Quoted: "By grep, no program under `explorations/` writes `spawn` or `also`, so all parallelism in the project's own programs is of this implicit kind."
- The grep: `git grep -n -w -e spawn -e also -- 'explorations/*.fss' 'explorations/*.fsi'` gives five hits today, each a comment or a string (`AplCore.fss:1127`, `AplSyntax.fsi:350`, `:697`, `rung-2/Rung2.fss:118`, `microgpt2.fss:303`). The writer counted four. The claim holds for `explorations/`.
- "the project's own programs" is wider. The revival's tests write both: `compiler_tests/NatRtTask.fss:11` (`do accAdd(k) also do accAdd(k) end`, added 2026-09-28), `XXXTaskArmLocalSlot.fss:12`, `AtomicTopLevelVar.fss:46`, and `XXXSpawnInAtomicExitValue.fss:7` (`spawn 3`, added 2026-10-09).
- By the specification, an `also do` block is itself an implicitly parallel construct: "each sub-block separated by an `also` clause is evaluated in a separate implicit thread" (`parallelism.tex:57-59`). Only `spawn` makes an explicit thread (`:24-27`). So "spawn or also ..., so ... implicit" sets `also` against implicit parallelism, which the specification does not.

**3. The list leaves out call arguments, which its own source names (wording).** The entry's title and the record's say "the operands of an operator". The cited line says "Like function calls, argument expressions are evaluated *in parallel* in separate implicit threads" (`operator-app.tex:58-59`). `parallelism.tex:60-64` lists "Method invocations and function calls: The receiver or the function and each of the arguments". The skill's "Parallelism and mutable state" names "the arguments and operands of a call". The cold reader asked whether the entry leaves calls out on purpose. It does not. The record's text was already this narrow, so this is no change of meaning, but the rewrite is the place to close it.

**4. The rest holds.** "the programmer must assume that each loop iteration will occur independently in parallel unless every generator is explicitly sequential" (`for.tex:28-32`). Tuples: `tuple-expr.tex:23-24`. `seq(self)`: `FortressLibrary.fsi:771`. `sequential[\T\]`: `:949`. `FORTRESS_THREADS`: the skill's part.

### Comprehension

- `also`: the reader took it for a keyword of explicit parallelism, "from its pairing with `spawn`". The entry's pairing caused that reading, and the specification says the opposite (above). The skill does not define `also` or `spawn`.
- "the operands of an operator": see Fidelity 3.
- "the project's own programs": see Fidelity 2.
- Whether a compiled `for` ever runs in parallel: yes, through `parloop`, unless every generator is `seq`. The entry's naming of `ParallelismAnalyzer` led the reader to think the analyzer decides it. It does not.
- The reader's consequence, write every body as if it may run at once, use a reduction or `atomic`, and take no proof from a passing run, matches the source.

### Class

- **Uncertain fidelity, settled** (1, 2), and **wording** for both. In place of the body from "Both paths start a task" to "implicit kind.":

  > An implementation may also run them one after another (`evaluation/parallelism.tex:88-90`), so a program cannot count on parallel runs either. For tuple elements and operands, each path starts a task only where it judges it worth it: walk by `TupleTask.worthSpawning`, which also governs a call's arguments, and the code generator by `ParallelismAnalyzer`; compiled, a function call's arguments run in order (`CodeGen.evalArg`). A `for` loop's tasks come from the library's generator, which splits a range by `also do` blocks; both paths run every `also do` as tasks, and the compiler prelude stops splitting at `FORTRESS_LOOP_CHUNK` elements. `FORTRESS_THREADS` sizes the pool of worker threads (the `fortress-repo` skill, "Parallelism and mutable state"). By grep, no program under `explorations/`, the model programs and the probes, writes `spawn` or an `also do` block, so their parallelism comes only from loops, tuples and arguments. The revival's tests under `ProjectFortress/` write both.

- **Wording** (3). Title: "By the specification, the iterations of a `for` loop, the elements of a tuple, and the arguments of a call or an operator may run in parallel, and a program must assume that they do." Source line: add `evaluation/parallelism.tex:50-80`, which lists every implicitly parallel construct.
- **Concept: `spawn` and `also do`.** `spawn e` starts an explicit thread, an object with `val` and `wait`. `do ... also do ... end` runs its blocks as implicit threads, like a tuple's elements (`evaluation/parallelism.tex:24-27`, `:57-59`; `expressions/also.tex:17-21`). Define both for every worker in the `fortress-repo` core, "Parallelism and mutable state", which lists the implicit forms without them.

## F-20

### Fidelity

**1. Two rows become a rule over every sized array type (uncertain fidelity, settled against the entry).** Quoted: "Under walk, a sized array type takes its size from an array built at run time" and "Only the array-type syntax `T[n]` with a `nat` parameter fails to unify with such an array". Row 214 shows that `Vector[\RR64,s\]` and `Matrix[\RR64,r,c\]` take their sizes from `array[\RR64\](3)` and `array[\RR64\](2,4)`. Its note: "Sharpens row 23: the `T[n]` array-type syntax does not unify with a runtime-built array, but `Vector[\RR64,s\]` does." Row 23 shows only that `T[n]` fails. No source tries any other sized type (`Array1`, `ReadableArray1`, a sized type of the program's own) against a run-time array. So "a sized array type" and "Only" claim more than the two rows show. The assessment's disposition said "only the `T[n]` array-type syntax fails" too, which may be where the "only" came from. But the rows support "`T[n]` fails where `Vector` and `Matrix` succeed", not "nothing else fails".

**2. The mismatch example misdescribes its measurement (wording).** Quoted: "A mismatch, such as a `DOT` of two arrays of different lengths, is a `ProgramError`". Row 254's reproducer, `explorations/apl/rung-6/w01_dot.fss` (read at `1ee3b0bc5^`), case (f): "a MISMATCHED matrix product, 2x3 by 2x3 ... `Failed to find any matching overload, args = (__DefaultMatrix[\RR64,2,3\],__DefaultMatrix[\RR64,2,3\])`". The two arrays have the same shape. What differs is the inner size: 3 columns against 2 rows.

**3. The rest holds.**
- `trait-parameters.tex:97`: "These parameters are instantiated at runtime with numeric values."
- F-40: "No optimisation uses a size", and a shape is checked once per arm and per type test.
- F-67 and F-129, as cited.
- Row 254: "a `ProgramError` no `catch` clause takes", and "The shared `nat` does catch the mismatch, at the dispatch".
- Not a failure: row 214 also names a compiled twin, `compiler_tests/NatRtDisp.test`, "which prints as walk does at one and four threads". The entry's "Under walk" is narrower than the row. F-129's "dispatches ... compiled" covers the compiled side.

### Comprehension

- "row 214", "row 23", "row 254": the reader took them for gap-ledger rows, correctly. `concepts.md` already lists "gap-ledger row".
- "(F-40)": see F-12. The pointer needs words.
- `DOT`: the reader read it as the dot product, rightly. The skill names only the wrapping `DOTPLUS`, `DOTMINUS` and `DOTTIMES`. The library's `opr DOT` is the inner product of a vector or matrix pair (`FortressLibrary.fsi:1650-1651`, `:1754-1773`, row 254).
- `ProgramError`: the reader guessed walk's Java error class, rightly, from `interpreter.md`'s "A `catch` sees no other Java exception".
- "fails to unify": the reader asked what the program then sees. Row 23 gives the message, `Cannot unify __DefaultVector[\RR64,3\] with ArrayType`. Whether `T[n]` fails compiled too is not recorded: row 23's class is "implementation gap (walk)". The entry is right to say "Under walk".

### Class

- **Uncertain fidelity, settled** (1), with **wording**. In place of the third and fourth sentences:

  > Under walk, `Vector` and `Matrix` take their sizes from an array built at run time: `f[\nat s\](v: Vector[\RR64,s\])` takes `s` from `array[\RR64\](3)`, and overloads on `Vector` and `Matrix` dispatch by rank (row 214). The array-type syntax `T[n]` with a `nat` parameter does not unify with such an array, "Cannot unify ... with ArrayType", where `T[3]` with a literal size does (row 23).

- **Wording** (2): "A mismatch, such as a `DOT`, the library's inner product, of a 2×3 matrix by a 2×3 matrix, whose inner sizes differ, is a `ProgramError` ...".
- **Wording**: "(F-40, what a size costs at run time)".
- **Concept: `ProgramError`.** Walk's Java error that ends a run, for a failed dispatch among others, and that no Fortress `catch` takes. It is beside `FortressError` in `references/interpreter.md`, "Natives", which says only that a `catch` sees no other Java exception. F-24 uses it too. Define it there.

## F-21

### Fidelity

The rewrite's corrections are supported, and nothing in it goes past its sources.
- The declaration: `Specification-1.0-frozen/basic-lib/convenience.tex:40`, `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}`.
- The stop at `excludes`: `reviews/spec-refused-examples.md`, E4, "both paths stop at a syntax error there **[measured, `SpecNothing`]**".
- `T is undefined`: `compile-ladder/rung-maybe/REPORT.md` section 5, `probes/WhereClauseNothing.fss`, "the same single error from `fortress compile` and from `fortress walk`, both rc=255: `T is undefined`, at the `T` inside the extends clause". Row 17 holds the trait's case.
- Today's specification: `Specification/basic-lib/convenience.tex:50` declares `value object Nothing[\T\] extends Maybe[\T\]`. Lines `:58-70` mark the bare form "Not allowed!" because "instantiation exclusion forbids" it and an object has no `excludes` clause.
- Dropping "the reason is name resolution, not code generation" follows from F-167 and that callout.
- P-90's text and review-queue item 224 ("Does the bare `Nothing` wait for `where` clauses, or is it never tried (P-90)?") are as the entry says.

### Comprehension

- "compiles on neither path": the reader noted that walk does not compile and read it as "is accepted on neither path". The record's title had the same word.
- "the parametric `Nothing[\T\]` that the library writes": the entry does not say which library. The interpreter's library writes `value object Nothing[\T\] extends Maybe[\T\]` (`Library/FortressLibrary.fsi:1008`). The compiler's prelude writes a bare `value object Nothing end` that extends no `Maybe`, with a `coerce(_: Nothing)` into `NothingObject[\T\]` (`Library/CompilerLibrary.fsi:224-236`; the rung-maybe report's section 5, the very section the entry cites as its detail). A reader who follows the detail meets a bare `Nothing` that compiles. The entry should name the library.
- "instantiation exclusion": `concepts.md` lists it. The skill's core states the rule, "No type may extend two instantiations of one generic trait", but not its name. The reader found it there.
- "a `where` clause ... binds no type variable": the reader lacked the concept that a `where` clause can declare a type variable (`Specification/basic/trait-parameters.tex`, "Where Clauses"). Row 17, F-47, P-90 and P-151 all lean on it.
- What a worker follows while item 224 is open: P-90 says "it is not tried before then", and both answers to item 224 leave the bare form untried. The entry can say so in a clause, from P-90's own text.

### Class

- **Wording.** Title: "... is accepted on neither path: ..." in place of "compiles on neither path".
- **Wording.** "beside the parametric `Nothing[\T\]` that the interpreter's library writes (F-167)".
- **Wording.** End the P-90 sentence: "...; review-queue item 224 holds that conflict for the curator, and until he answers no work tries the bare form (P-90)."
- **Concept: a `where` clause that declares type variables.** For example, `trait C[\S\] extends C[\T\] where {S extends T}` introduces `T`, and neither path binds it in the `extends` clause (row 17). Define it for every worker in the `fortress-repo` core, "Fortress as a language", in the point on static parameters, and name instantiation exclusion at the rule that point already states.

## F-22

### Fidelity

**1. "Not codegen's" was dropped, but the code and the report support it (uncertain fidelity, settled against the rewrite).** The writer's change: "'Not codegen's' is dropped. The code generator also resolves a reference to the api's name". The rewrite then says "A fix can go on either side". The report says, in the section the entry cites: "The name coincidence is the *repository's* assumption, not codegen's: `Linker.whoIsImplementingMyAPI` ... consults a persisted map and, finding nothing, returns the api's own name". The tree shows that naming a reference after the api is the team's design, which the link step completes:
- `Linker.whoIsImplementingMyAPI` (`linker/Linker.java:62-89`) returns the api's name only when its maps hold nothing (`:70-76`). When they name an implementer, it records a rewrite from the api to that component (`:79-88`).
- `Linker.linkMyComponent` (`:222-250`) applies the rewrites by substituting names in the component's jar (`substituteJarFile`). `GraphRepository.getComponent` calls `Linker.linkAll()` on every component it is asked for (`repository/GraphRepository.java:204`).
- `linker/README` describes this flow. `GraphRepository.nodeDependsOnApi` asks the linker for the implementer only on the link path (`:337-350`, `if (link && !b)`).
- So the api-named reference (`NamingCzar.repairedApiName`, `NamingCzar.java:1673-1679`) is what the link step rewrites. The missing step is the repository's discovery of which component exports the api, as the report and the record's entry said.

The report also names the code generator's forwarder as a second repair, and that stays true as an alternative. But neither repair was built or measured. The report's probes show that walk and `fortress link` refuse in the repository before any code is generated (`link-and-walk-preedit.txt:4-9`, `:45-60`). So a forwarder alone would not fix them. That answers the cold reader's question: "I cannot tell whether either fix alone is enough for both paths." Row 320's class, "implementation gap (codegen)", disagrees with the report and the code. That is a ledger matter for the coordinator, not a reason to change the fact.

**2. "looks only under the api's name" drops the by-hand mapping (wording).** Quoted: "The tree looks only under the api's name." The report: "Nothing populates that map except the user, by hand, through `LinkShell.main`'s `alink` and `clink` verbs" (`linker/LinkShell.java:41-70`). The record's text of 2026-10-13 kept this ("only `LinkShell`'s `alink`/`clink` register another"), and the cut of that day dropped it.

**3. Why the one-by-one compile dies: the declaring class is named after the component (wording).** Quoted: "The code generator names a reference to an exported declaration after the api too, so files compiled one by one die with `NoClassDefFoundError`." The cause is the mismatch: `packageAndClassName` is the component's name (`CodeGen.java:394`), while references resolve to the api's. Without the first half, "after the api too" does not explain the error.

**4. The rest holds.**
- `overview.tex:24-35`: "the references of a component to an imported api are resolved to a component that exports that api".
- The two messages: row 320 and the report's probes.
- The test: `XXXExportVarRungXLinked.test` holds `link` and `link_err_contains=Could not find an implementation for API ExportVarRungXLibApi`.
- The workaround: row 320.
- The title's "for an exported function or variable alike" is what the probes measured. The report says the step is shared "by every kind of declaration", which the title does not claim, rightly.

### Comprehension

- "A fix can go on either side": the reader saw the gap the evidence leaves. See Fidelity 1.
- "reserved": the reader could not tell a stub from a comment. The report: "the api-named forwarder the team reserved in three comments in `CodeGen.java`", one of them `/* Need wrappers for the API, too. */`.
- "files compiled one by one": the reader's reading, each file compiled by its own `fortress compile` and run without `fortress link`, is right. Row 320: "reachable only by hand-compiling each file with `fortress compile`".
- "The linker's component repository" was understood. `concepts.md` lists it.

### Class

- **Uncertain fidelity, settled** (1), with **wording** (1, 2, 3). In place of the body from "The tree looks only" to "in `CodeGen.java`.":

  > The tree looks only under the api's name, unless a user maps the api to its component by hand with `LinkShell`'s `alink` or `clink`. The linker's component repository does so (`Linker.whoIsImplementingMyAPI`), so `fortress link` and walk print "Could not find an implementation for API … on path" before any code is generated. The code generator names a reference to an exported declaration after the api, and the declaring class after the component; the link step would rewrite the reference to the component once the repository names it, so files compiled one by one, unlinked, die with `NoClassDefFoundError`. The missing step is the repository's: finding the component that exports the api. The report names two repairs, neither built: the repository could search the source path for it, or the code generator could emit the api-named forwarders for which three comments in `CodeGen.java` leave a place; walk and `fortress link` need the first.

  The proposal's "Meaning" should then read: the title's comparison of functions and variables replaced by the lookup by the api's name; "the repository" named; the by-hand mapping restored; "not codegen's" kept in substance, as "the missing step is the repository's", by `Linker.java:62-89`, `:222-250` and `GraphRepository.java:204`.
- For the coordinator: row 320's class "implementation gap (codegen)" disagrees with the report's "the repository's assumption, not codegen's" and with the linker's code. That is a ledger correction, outside this entry.

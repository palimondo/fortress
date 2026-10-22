# Cold read 2: facts f1 (F-7, F-12, F-18, F-19, F-20, F-21, F-22)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and these parts of its `references/`: `interpreter.md` ("What walk checks"), `compiler.md`, `library.md`, `records.md` and `tests-writing.md`. I looked terms up in them. I did not open the record, the cited reports or the code.

One point applies to several entries. Paths to reports have no root. F-7 writes `explorations/repo-internals.md`, but F-12, F-18, F-21 and F-22 write `compile-ladder/...`, `perf-probes/...` and `reviews/...` without `explorations/`. I took them to be under `explorations/`, but the entries do not say so. Likewise, "row N" with no table named (F-20, F-21, F-22) I read as a gap-ledger row, because `records.md` says reports cite ledger rows by number.

---

## F-7: Walk and the compiled path share the parser and the phases; only the compiled path runs the static type checker

**Established:** Both ways of running a program use the same parser and the same front-end phases. The static type checker (phase 4) runs only on the compiled path. Walk turns the checker off, and no option or switch turns it back on. So walk never checks the static types of expressions. A type error in an expression shows up only when that expression runs: as a failed dispatch, or as some other run-time error, such as an `if` whose condition is not a `Boolean` (F-239). Walk does reject some ill-formed declarations when it loads a program. `interpreter.md`, "What walk checks", lists them: overload sets, `comprises` clauses, the Meet Rule for Functional Methods, inherited abstract methods left undefined, and an `override` that overrides nothing. F-29, F-142 and F-145 hold the evidence for those checks.

**Conditions:** This holds for every program run under walk, which is the default command of `bin/fortress`. The checks at load are limited to the list in `interpreter.md`. The entry says the paths share "the phases", but the skill says they differ slightly: the compiled path folds integer literals before the checker, and walk turns off some desugarings (`compiler.md`). The entry sends the reader to the skill's "How a program runs" for where the paths part, so this is not a contradiction. It is a simplification in the title.

**Consequence:** A program that runs under walk may still be ill-typed. A clean walk run is no evidence that the compiled checker will accept the program. To check static types, compile the program. `fortress typecheck` uses the compiler's prelude, so it does not check a walk program (`interpreter.md`). An ill-typed expression on a path that a walk run never takes goes unnoticed.

**Evidence:** The entry names no test or command for the main claim, that walk turns the checker off with no switch to turn it on. It points to the skill and to `explorations/repo-internals.md`, "The two worlds". The checks at load rest on F-29 (`comprises`), F-142 (Meet Rule for Functional Methods) and F-145 (uncovered abstract methods, `override`).

**Could not resolve:**
- "share ... the phases": unclear wording, minor. Read literally, it says the phase lists are identical, which the skill qualifies (see Conditions). The entry's own pointer settles it.

---

## F-12: On the compiled path, the scalar `RR64` loop `bench1t` ran in 0.74 s; the loop still pays for its generator, boxing and a transaction check

**Established:** `bench1t` is a sequential loop of 20,000,000 iterations (`1#20000000`; I read `a#n` as n elements starting at a, from `SUM[i <- 1#100] i = 5050` in `interpreter.md`). Each iteration computes `acc := acc × 0.9999999 + 0.0000001` (juxtaposition multiplies) on a mutable `RR64` local, with both constants written as literals in the loop body. Compiled, at one thread, the median of three loop-only runs was 0.74 s in one session. The compiled bytecode shows these costs:
- The `seq` loop becomes the compiler prelude's `countedseqloop`. It runs the iterations in order, but by a recursive split over boxed indices, with one closure call per element.
- Every value is boxed (F-11).
- The accumulator lives in a volatile cell. Every read and every write of it first calls `BaseTask.inATransaction`, as for any mutable local (F-40 found the same check in a sized loop).

Of the boxing and cell costs, the boxing report counts four allocations per iteration, an interface call to the native wrapper, and the casts. These are the costs that unboxed doubles and `double[]` would remove. No one measured how the 0.74 s divides among these costs.

**Conditions:** The time is from the compiled path, at one thread, loop-only, in one session. Times from different sessions on this machine are not comparable. The cost breakdown is a reading of the bytecode, not a measurement.

**Consequence:** Compare a new time with 0.74 s only if both were taken in the same session. Otherwise, re-measure the baseline alongside it. The listed costs are where speed-ups should aim: unboxing doubles, the cell's transaction check and the generator's closure-per-element. Do not claim that any one of them accounts for a given share of the time, because no share has been measured.

**Evidence:** The timing is from `compile-ladder/rung0/REPORT.md`, "The four timings". The bytecode reading is from `perf-probes/boxing/REPORT.md`, sections 4 and 5. Related entries are F-11 (boxing) and F-40 (the transaction check in a sized loop). No test checks the fact, since it is a measurement.

**Could not resolve:**
- "loop-only runs": unclear wording. It could mean a timer around the loop alone, excluding JVM start-up and class loading. It could also mean runs of a program that holds only the loop. I lean to the first reading.
- "with both literals written in the loop": unclear why this is stated. I guess it matters because each literal is boxed or built on every iteration, but the entry does not say so.
- "the loop still pays": "still" suggests that some earlier change removed other costs. The entry does not say what changed.
- "Within the boxing and the cell, the report counts ...": an awkward phrase. I read it as "among the costs of boxing and of the cell". "the report" is the boxing report, by position.
- "an interface call to the native wrapper": partly a concept I lack. `compiler.md` ("Natives") says the wrapper generator wraps Java helper methods, so I take it to be the generated wrapper around the native `RR64` arithmetic. The skill does not say this is an interface call.
- "the part that unboxed doubles and `double[]` would attack": unclear wording. `bench1t` is scalar and uses no array, so it is unclear what `double[]` would change in this loop. It may refer to the general plan for representing doubles and not to this loop.

---

## F-18: On the compiled path, the class loader makes the class of a generic instantiation at its first use, by rewriting the template's bytecode with ASM

**Established:** On the compiled path, the class for each instantiation of a generic (such as `Box` at size 3) is made the first time the program uses it. `InstantiatingClassloader` makes it by rewriting the generic template's bytecode with ASM. A size argument becomes part of the made class's name: `pNatMeth$Box⟦3⟧` is object `Box` at size 3, in a probe component named `pNatMeth`. Inside that class, the size appears as the descriptor `RTTIsize.of("<n>")` (F-129). Walk does not make classes. Its evaluator instantiates generics itself.

**Conditions:** This holds on the compiled path only, and only at run time. These classes are never on disk (`SKILL.md`, "The compiled run time").

**Consequence:** When debugging a compiled generic or sized declaration, look for the instantiated class by its name with the size in `⟦ ⟧`. Do not look for it in the jar. A failure while such a class loads can be a defect of the class loader, which the revival changed (`compiler.md`: read ledger rows 408, 417 and 559 first). A fix to this mechanism does not affect walk.

**Evidence:** `perf-probes/nat/java.md`, section 1, the probe component `pNatMeth`, and F-129 for the descriptor. The skill's "The compiled run time" describes the mechanism. The entry names no test.

**Could not resolve:**
- "The class is `InstantiatingClassloader`": unclear wording, minor. It comes right after "the class loader makes the class of a generic instantiation", so "The class" could at first be read as the class that is made. Context makes it the loader's class.

---

## F-19: By the specification, loop iterations, tuple elements and call or operator arguments may run in parallel, and a program must assume that they do

**Established:** The specification allows these to run in parallel, and it requires programs to be correct as if they do: the iterations of a `for` loop, the elements of a tuple, and the arguments of a call or an operator. A `for` loop is sequential only if every one of its generators is sequential, which `seq(g)` or `sequential(g)` makes them. An implementation may also run these parts one after another, so a program cannot rely on their running in parallel either. Here is what each path does today:

| | Walk | Compiled |
|---|---|---|
| Tuple elements, operator operands | Tasks only where `TupleTask.worthSpawning` judges it worth it | Tasks only where `ParallelismAnalyzer` judges it worth it |
| Function-call arguments | Also governed by `TupleTask.worthSpawning` | Always run in order (`CodeGen.evalArg`) |
| `for` over a range without `seq` | Split into `do … also do … end` blocks, each run as a task. The library splits down to single elements (`Library/RangeInternals.fss`). | The same, but the prelude's `parloop` stops splitting at `FORTRESS_LOOP_CHUNK` elements |

`FORTRESS_THREADS` sets the number of worker threads. According to a grep, no program under `explorations/` (the model programs and the probes) writes `spawn` (an explicit thread) or `also do`. So their only parallelism comes from loops, tuples and arguments. The tests under `ProjectFortress/` do use both.

**Conditions:** "May run in parallel" is the specification's rule. Whether something actually runs in parallel depends on the path and on the heuristics above. Under walk, every element of an unsequenced range loop is its own task. Compiled, tasks are chunks. The grep result covers `explorations/` only, at the time of the grep.

**Consequence:** Write and review code as if all such parts run at once. Shared mutable state needs `atomic` or a reduction (`SKILL.md`, "Parallelism and mutable state"). Use `seq(...)` wherever order matters. Do not rely on parallel execution for correctness either. A defect that depends on the thread count needs checks at one thread and at four. Since the model programs use no `spawn` or `also do`, work on parallelism for them concerns loops, tuples and arguments only.

**Evidence:** The specification: `Specification/basic/expressions/for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:58-59`, and `evaluation/parallelism.tex:50-80` and `:88-90` (the last for sequential execution being allowed). The code sites named: `TupleTask.worthSpawning`, `ParallelismAnalyzer`, `CodeGen.evalArg`, `Library/RangeInternals.fss`, and the prelude's `parloop`. The statement about `explorations/` rests on an unshown grep. The entry names no test.

**Could not resolve:**
- "no program under `explorations/`, the model programs and the probes,": unclear wording, read two ways. It could be an apposition ("under `explorations/`, that is, the model programs and the probes"). It could also be a list of three places. The skill places the model programs under `explorations/`, so I read it as an apposition.
- "The revival's tests under `ProjectFortress/`": unclear wording. It could mean every test in the suites the revival runs, or only the tests the revival added. The skill counts `ProjectFortress/` as the original tree.
- `FORTRESS_LOOP_CHUNK`: I lack this, and it is not in the skill. The entry does not say whether it is an environment variable, like `FORTRESS_THREADS`, or a constant, or what its value is.
- `sequential(g)`: not in the skill, but the entry's own gloss is enough.
- `tuple-expr.tex`, `operator-app.tex`, `evaluation/parallelism.tex`: the directory is left out. I took it to be `Specification/basic/expressions/` for the first two and `Specification/basic/` for the third, as in the skill.

---

## F-20: Sizes, the `nat` and `int` static parameters, are values at run time; they check shapes, and no optimization uses them

**Established:** A size, meaning a static parameter of kind `nat` or `int`, exists as a value at run time. It is used to check that shapes match, and no optimization uses it (F-40, "what a size costs at run time").
- On the compiled path, the checker checks sizes (F-67), and a sized program loads and runs (F-129).
- Under walk, `Vector` and `Matrix` get their sizes from the array actually passed at run time. For example, `f[\nat s\](v: Vector[\RR64,s\])` called with `array[\RR64\](3)` gets `s = 3`. Overloads on `Vector` versus `Matrix` are chosen by the array's rank (row 214).
- The array-type syntax `T[n]` with a `nat` parameter `n` does not match such a run-time array; it fails with "Cannot unify … with ArrayType". With a literal size, as in `T[3]`, it matches (row 23).
- Walk matches sizes during dispatch. A mismatch is a `ProgramError`, "Failed to find any matching overload", which no Fortress `catch` can handle, so the run ends (row 254). The example is `DOT`, the library's inner product, applied to two 2×3 matrices, whose inner sizes (3 and 2) differ.

**Conditions:** The run-time value and the shape check hold on both paths. The details about `Vector`, `Matrix`, `T[n]` and the uncatchable mismatch are stated for walk. `compiler.md` says the compiled prelude has no array types, so these do not yet arise compiled. "No optimization uses them" is a statement about today's code.

**Consequence:** Do not expect sizes to make code faster. Under walk, write a sized parameter as `Vector[\RR64,s\]` (or `Matrix`), not as `RR64[s]` with a `nat s`. A shape mismatch under walk ends the run and cannot be caught. A test of one must expect the run to fail, not catch the error.

**Evidence:** Rows 214, 23 and 254, which I read as gap-ledger rows, and entries F-40, F-67 and F-129. The source given is `Specification/basic/trait-parameters.tex:97`. The entry does not say which claim that line supports, probably the definition of sizes as static parameters. No test is named in the entry.

**Could not resolve:**
- "row 214", "row 23", "row 254": unclear wording. The table is not named. Using `records.md`, I read them as gap-ledger rows.
- "they check shapes": unclear wording, minor. The phrase does not say who does the checking or when. The rest of the entry answers it: the compiled checker statically, and walk at dispatch.
- "The array-type syntax `T[n]` ... does not unify": unclear which path. It sits in the walk sentences, and "Cannot unify" reads like walk's inference at dispatch, but the entry does not say.
- "Source: `Specification/basic/trait-parameters.tex:97`": unclear which claim it supports.

---

## F-21: The February 2011 Working Draft's bare `Nothing`, one object for every `T`, is accepted on neither path

**Established:** The Working Draft (`Specification-1.0-frozen/basic-lib/convenience.tex:40`) declares a single object `Nothing` that stands for every type `T`: `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}`. Neither path accepts it.
- As written, both paths stop with a syntax error at `excludes`, because an object cannot have an `excludes` clause.
- With the `excludes` clause removed, both paths report `T is undefined` at the `T` in `extends Maybe[\T\]`. A `where` clause on an object does not bind a type variable used in its `extends` clause. Row 17 records the same for a trait.

The current specification forbids this form anyway, by the rule that no type may extend two instantiations of one generic trait. It marks the bare form "Not allowed", next to the parametric `Nothing[\T\]` that the interpreter's library actually uses (F-167). The curator's position P-90 still treats the bare `Nothing` as future work that waits until such `where` clauses work, and is not to be tried before then. That disagreement with the current specification is review-queue item 224, awaiting the curator.

**Conditions:** This holds on both paths, for the Working Draft's form with or without its `excludes` clause. The disagreement between P-90 and the current specification is open.

**Consequence:** Do not implement or use the bare `Nothing`. Use the parametric `Nothing[\T\]`, as the library does. Do not try the bare form yourself, since P-90 defers it. Do not settle the P-90 conflict either; that is for the curator, through item 224. The `T is undefined` error is not a defect in the `Nothing` code. It follows from how `where` binds on an object or trait (row 17).

**Evidence:** Measured: `reviews/spec-refused-examples.md`, E4. Detail: `compile-ladder/rung-maybe/REPORT.md`, section 5. Also cited: row 17, F-167, P-90, review-queue item 224, and the Working Draft line. The entry names no test.

**Could not resolve:**
- "instantiation exclusion": a language concept, resolved from the skill. `SKILL.md`, "Traits and objects", says "No type may extend two instantiations of one generic trait. This exclusion rule ...". I took the term to mean that rule.
- "waits for such `where` clauses": unclear wording, minor. I read "such" as "a `where` clause that binds a type variable of the `extends` clause".
- "not tried before then": the subject is left out. I read it as the revival not attempting it.
- "row 17": as in F-20, I read it as a gap-ledger row.

---

## F-22: When a component's name differs from the api that it exports, neither path finds the component

**Established:** The specification says an imported api resolves to any component that exports it. This tree finds an api's implementation only by looking for a component with the api's own name, unless someone maps the api to its component by hand with `LinkShell`'s `alink` or `clink`. The linker's component repository looks up components this way (`Linker.whoIsImplementingMyAPI`). So when the names differ, `fortress link` and walk fail with "Could not find an implementation for API … on path". This happens for an exported function and for an exported variable alike.

Compiled, there is a second effect. The code generator names a reference to an exported declaration after the api, but names the class that declares it after the component. The link step rewrites such a reference to the component's name only when the repository names that component. So files compiled one at a time, without `fortress link`, fail at run time with `NoClassDefFoundError`.

The missing piece is in the repository: finding which component exports an api. The report proposes two fixes, neither built:
1. The repository searches the source path for the component that exports the api. Walk and `fortress link` need this one.
2. The code generator emits forwarders named after the api. Three comments in `CodeGen.java` mark where these would go.

**Conditions:** This holds whenever a component's name differs from an api it exports, on both paths, unless the mapping is made by hand with `alink` or `clink`.

**Consequence:** For now, name every api after the component that implements it (`compiler.md` states the same rule). A "Could not find an implementation for API" error or a `NoClassDefFoundError` in this situation is this known gap, not a new defect. A fix for walk and `fortress link` must be the repository search, because forwarders alone do not help them. When the gap is fixed, the `XXX` test turns red and must be promoted.

**Evidence:** The gated expected failure `compiler_tests/XXXExportVarRungXLinked.test` (row 320). The code sites `Linker.whoIsImplementingMyAPI` and `CodeGen.java`. The specification is `Specification/basic/components/overview.tex`. Detail: `compile-ladder/rung-export-var/REPORT.md`, "The measurement that separates them".

**Could not resolve:**
- `LinkShell`, `alink`, `clink`: I lack these; they are not in the skill. The entry says only that they map an api to a component by hand. It does not say how to call them or whether a worker may use them.
- "`fortress link` and walk print ... before any code is generated": unclear wording. Walk never generates code, and `fortress link` runs after `fortress compile` has already written bytecode. I could not tell which code generation "before" refers to. My guess is that the failure comes before any linking or run, but the phrase can be read more than one way.
- "The report names two repairs": unclear wording, minor. "The report" is mentioned before any report is named; I read it as the Detail report at the end of the entry.
- "Gated by the expected failure ...Linked.test": the test name suggests it covers the `fortress link` case. The entry does not say whether any test covers walk's failure or the unlinked `NoClassDefFoundError` case.

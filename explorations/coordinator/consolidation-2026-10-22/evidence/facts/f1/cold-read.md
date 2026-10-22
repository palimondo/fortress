# Cold read: facts f1 (F-7, F-12, F-18, F-19, F-20, F-21, F-22)

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and from its `references/`: `interpreter.md`, `compiler.md`, `library.md`, `records.md` (sections on POSITIONS, FACTS, the ledger and reading the record), and greps of the other allowed references for the terms below. Nothing else.

## F-7, "Walk and the compiled path share the parser and the phases"

**Established:** Both ways of running a program go through the same parser and the same list of phases. The static type checker is one of those phases, but walk always has it off, and no option turns it on for walk. So under walk nothing checks the types of expressions before the program runs. A type error appears only when the faulty code runs, usually as a call for which no overload matches. Walk does check some declarations when it loads a program (overload sets, some `comprises` clauses, abstract methods that are inherited but never defined, `override`), and refuses the ones that break those checks. Only `fortress compile` runs the checker.

**Conditions:** "Share the phases" means the same phase list. The skill's `interpreter.md` adds that walk switches off some desugarings inside those phases (coercion, chained comparisons, case and typecase, and others). The entry does not repeat that limit. What walk refuses at load is only what `interpreter.md`, "What walk checks", lists.

**Consequence:** A program that runs under walk is not shown to be well-typed. To get a static type check, compile it. An ill-typed line that never runs goes unnoticed under walk. `fortress typecheck` does not check a walk program either, since it uses the compiler's prelude (`interpreter.md`).

**Evidence:** The entry points to the skill's "How a program runs" and `interpreter.md`, "What walk checks", to F-29, F-142 and F-145, and to `repo-internals.md`, "The two worlds". It names no test and no command.

**Could not resolve:**
- `repo-internals.md`, "The two worlds": the entry gives no directory. There is no such file in the skill's `references/`, so I cannot tell where this file is. Unclear wording (a path without a folder).
- "(F-29, F-142, F-145)": I take these as the facts behind the refusals at load, but the entry does not say whether they support the list or add to it. Minor.

## F-12, "On the compiled path, the scalar `RR64` loop `bench1t` ran in 0.74 s"

**Established:** One benchmark, `bench1t`, runs 20 million iterations of `acc := acc a + b` on `RR64` values, compiled. One session measured it at 0.74 s: the median of three runs, timing only the loop, at one thread. The entry names three costs: the generator the `for` loop becomes (the prelude's `countedseqloop`, which splits the range recursively over boxed indices and makes one closure call per element); boxing every value (F-11); and a call to `BaseTask.inATransaction` on each read and write of the mutable accumulator (F-40). A boxing probe adds more items: the volatile cell that holds `acc`, four allocations per iteration, a call through an interface to the native wrapper, and casts.

**Conditions:** Compiled path only, one thread, this loop shape (scalar, with both literals written inside the loop). The 0.74 s comes from one session. Timings differ between sessions on this machine, so the number cannot be compared with a time taken in another session.

**Consequence:** To measure a speed-up, time the baseline and the change in the same session. Do not compare against 0.74 s. The items named are where an optimisation of this loop could start.

**Evidence:** `compile-ladder/rung0/REPORT.md`, "The four timings" (the timing); `perf-probes/boxing/REPORT.md` section 5 (the finer list); F-11 and F-40. This is a measurement, not a test.

**Could not resolve:**
- "remaining costs" / "What remains": remaining after what? I cannot tell whether the list explains all of the 0.74 s or only names the costs not yet removed by some earlier work. Unclear wording.
- "The boxing probe also names ...": these could be extra costs beyond the three, or a finer split of "boxing" and the accumulator cell. Unclear wording.
- "with both float literals written inside the loop": I read `a` and `b` as stand-ins for two float literals, so the body is something like `acc := acc 0.5 + 1.0`. It could also mean that `a` and `b` are variables whose values are written as literals in the loop body. The entry does not say why this matters, perhaps because each literal is boxed again on every iteration. Unclear wording.
- `countedseqloop`, "a recursive split over boxed indices": the name says sequential but "recursive split" sounds like divide and conquer for parallel work. This is a concept I lack; it is not in the skill. With F-19 (`ParallelismAnalyzer`), I cannot tell whether this loop runs in parallel when there is more than one thread.
- "the native wrapper": I take it as the generated wrapper of a native arithmetic method (`compiler.md`, "Natives"). Minor.

## F-18, "On the compiled path, the class loader makes the class of a generic instantiation at its first use"

**Established:** In compiled code, a generic declaration exists as a template. The first time the program uses a particular instantiation, `InstantiatingClassloader` builds that instantiation's class: it rewrites the template's bytecode with ASM and loads it. When a static argument is a size, the size goes into the new class's name (for example `pNatMeth$Box⟦3⟧`, which I read as `Box` at size 3 inside `pNatMeth`). Inside the class, the size is a run-time object from `RTTIsize.of("3")`. Walk handles generics in its own evaluator and builds no classes.

**Conditions:** Compiled path only, at the first use of each instantiation. The classes exist only in memory (SKILL.md: never on disk).

**Consequence:** A failure while a generic instantiation loads can be a defect of the class loader (SKILL.md and `compiler.md` say to read ledger rows 408 and 559 first). Do not look on disk for an instantiated class. A size shows up in the class name and as an `RTTIsize` descriptor.

**Evidence:** The skill's "The compiled run time"; F-129; `perf-probes/nat/java.md` section 1. No test named.

**Could not resolve:**
- `pNatMeth`: not explained. I take it as the component or test that the example comes from. Minor.
- "the size's descriptor": this could mean a JVM type descriptor string or a Fortress run-time type object. The skill ("a size as a descriptor from `RTTIsize.of`") points to the object. Minor.

## F-19, "By the specification, the iterations of a `for` loop, the elements of a tuple and the operands of an operator may run in parallel"

**Established:** The specification lets three things run at the same time: the iterations of a `for`, the elements of a tuple expression, and an operator's operands. A program must be correct as if they do. A `for` is sequential only when every one of its generators is wrapped in `seq(...)` or `sequential(...)`. Neither implementation is required to run them in parallel, and both decide case by case: walk with `TupleTask.worthSpawning`, the code generator with `ParallelismAnalyzer`. So a program must not depend on things running in parallel either. `FORTRESS_THREADS` sets the size of the thread pool. A grep found no `spawn` or `also` in any program under `explorations/`, so the project's programs have no explicit parallelism, only these implicit forms.

**Conditions:** It holds on both paths, for the three constructs named. The grep claim was true when the grep ran and covers only `explorations/`.

**Consequence:** Write each loop body, tuple and operand as if it may run at the same time as the others. That means no unguarded writes to shared mutable state: use a reduction or an `atomic` block (SKILL.md, "Parallelism and mutable state"), or make the generator sequential. Do not count on things running in parallel for correctness or progress. A run that passes at one thread proves nothing about races.

**Evidence:** `Specification/basic/expressions/for.tex:28-32`, `tuple-expr.tex:23-24`, `operator-app.tex:59`; the two class names; a grep (pattern not given).

**Could not resolve:**
- `also`: a Fortress keyword for explicit parallelism, as I read it from its pairing with `spawn`. The skill does not explain it. It is a language concept I lack.
- "the operands of an operator": SKILL.md also names "the arguments ... of a call". I cannot tell whether the entry leaves function-call arguments out on purpose (the spec covers operators only) or for short. Unclear wording.
- "the project's own programs": this could mean only programs under `explorations/`, or every program the revival wrote, including tests in the original tree's test folders. The grep covered only `explorations/`. Unclear wording.
- What `ParallelismAnalyzer` judges (tuples, loops, call arguments) is not said. Given F-12's `countedseqloop`, I cannot tell whether a compiled `for` loop ever runs in parallel.

## F-20, "Sizes, the `nat` and `int` static parameters, are values at run time"

**Established:** A static parameter of kind `nat` or `int` (a size) exists as a value when the program runs. It is used to check shapes, such as an array's length, and no optimisation uses it. The compiled checker checks sizes (F-67), and a program with sizes compiles, loads and runs (F-129). Under walk, a function such as `f[\nat s\](v: Vector[\RR64,s\])` gets `s` from the array actually passed (one built by `array[\RR64\](3)` gives `s = 3`). Overloads on `Vector` and `Matrix` are chosen by the array's rank (number of dimensions). One form does not work under walk: the type syntax `T[n]` with `n` a `nat` parameter fails to match such an array, while `T[3]` with a literal size matches. Walk compares sizes when it dispatches. A mismatch, such as `DOT` on two arrays of different lengths, ends the run with a `ProgramError`, "Failed to find any matching overload", which no Fortress `catch` can catch.

**Conditions:** The walk part (inferring sizes, matching at dispatch, the `T[n]` failure, the uncatchable error) is walk only. For the compiled path the entry says only that the checker checks sizes and that sized programs run.

**Consequence:** Under walk, write sized parameters as `Vector[\RR64,s\]` (or the equivalent generic form), not `RR64[n]`. A wrong size is fatal, not catchable, so a test of a size mismatch must expect the run to end. Making sizes drive an optimisation would be new work.

**Evidence:** `Specification/basic/trait-parameters.tex:97`; rows 214, 23 and 254; F-40, F-67, F-129.

**Could not resolve:**
- "row 214", "row 23", "row 254": these are bare "row" numbers. I take them as gap-ledger rows (`records.md`: "Reports cite a row by its number"), but the entry does not say "ledger". Minor wording.
- "no optimization uses them (F-40)": F-12 cites F-40 for the `BaseTask.inATransaction` check, a different subject. I cannot tell whether F-40 is a broader fact on compiled-code cost or whether one of the two citations is wrong. Unclear wording, or a wrong citation.
- `DOT`: I read it as the dot-product operator. The skill names only `DOTPLUS`, `DOTMINUS` and `DOTTIMES` (wrapping operators). This is a library concept I could not confirm.
- `ProgramError`: not in the skill. I take it as walk's Java error class. `interpreter.md` says a `catch` sees only a `FortressError`, which fits "no `catch` takes".
- "fails to unify": what the program then sees (a failed dispatch? an error at load?) is not said. I also cannot tell whether `T[n]` fails on the compiled path too.

## F-21, "The February 2011 Working Draft's bare `Nothing` ... compiles on neither path"

**Established:** The February 2011 Working Draft declares `Nothing` as one object that is a `Maybe[\T\]` for every `T`: `object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}`. Neither path accepts it. Both stop with a syntax error at `excludes`, because the grammar allows no `excludes` clause on an object. With that clause removed, both report `T is undefined` at the `T` in the `extends` clause: a `where` clause on an object does not bind a type variable used in its `extends` clause (row 17 says the same for traits). The current specification rejects this form in any case, by instantiation exclusion. It marks the form "Not allowed" beside the generic `Nothing[\T\]`, which is what the library uses (F-167). Position P-90 still calls the bare `Nothing` future work, waiting for such `where` clauses. Review-queue item 224 holds this disagreement for the curator.

**Conditions:** Both paths. It holds for the Working Draft's exact declaration and for that declaration without `excludes`.

**Consequence:** Do not try to build or use the bare `Nothing`. Use the library's `Nothing[\T\]`. The conflict between P-90 and today's specification is the curator's to settle (item 224). A worker should not settle it.

**Evidence:** `Specification-1.0-frozen/basic-lib/convenience.tex:40`; measured in `reviews/spec-refused-examples.md`, E4; row 17; F-167; `compile-ladder/rung-maybe/REPORT.md` section 5.

**Could not resolve:**
- "instantiation exclusion": not defined in the skill. The skill's "No type may extend two instantiations of one generic trait" seems to be the rule, since one object extending `Maybe[\T\]` for every `T` extends many instantiations. This is a language concept, only partly found.
- "a `where` clause ... binds no type variable": this assumes a `where` clause can introduce a type variable. The skill does not cover that. Language concept I lack, inferred from context.
- The entry does not say what a worker follows while item 224 is open: P-90 (SKILL.md: "Carry out the curator's decisions as the record states them") or today's specification. In practice no work should depend on the bare form, but the entry does not say so.
- "compiles on neither path": walk does not compile. I read it as "is accepted on neither path". Minor wording.

## F-22, "When a component's name differs from the api that it exports, neither path finds the component"

**Established:** The specification lets any component that exports an api supply it, whatever the component's name. The implementation finds a component only by the api's name. The linker's component repository (`Linker.whoIsImplementingMyAPI`) searches that way, so `fortress link` and walk both fail with "Could not find an implementation for API … on path". The code generator also names references to exported declarations after the api, so files compiled separately without that match die at run time with `NoClassDefFoundError`. This holds for exported functions and exported variables. Two fixes are possible: have the repository search the source path for whichever component exports the api, or have the code generator emit the api-named forwarders that the team left room for in `CodeGen.java`. Until then, give the api the same name as its component.

**Conditions:** Only when the component's name and the api's name differ. Both paths.

**Consequence:** Name each api after the component that implements it (as `compiler.md`'s traps also say). Whoever fixes this promotes the expected-failure test `compiler_tests/XXXExportVarRungXLinked.test` (it turns red when the fix lands) and closes row 320.

**Evidence:** `Specification/basic/components/overview.tex`; the expected-failure test above; row 320; `compile-ladder/rung-export-var/REPORT.md`, "The measurement that separates them".

**Could not resolve:**
- "A fix can go on either side": walk fails in the repository and the separately compiled run fails in the code generator's naming. A code-generator fix alone would seem to leave walk failing, and a repository fix alone might not fix the separately compiled run. I cannot tell whether either fix alone is enough for both paths. Unclear wording.
- "the api-named forwarders that the team reserved": "reserved" could mean a stub, a comment or a reserved name. Unclear wording.
- "files compiled one by one": I read it as each file compiled with its own `fortress compile` and run without `fortress link`. Minor.

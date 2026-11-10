<!-- A review of the revival's remaining plan (PLAN phases 4 to 6) against the goal, written 2026-11-10 for the curator, who asked whether the plan is correct and solid and whether the work is on the right problem: where the tree stands, every route from it to a compiled, fast microGPT, the plan judged against those routes, the evidence that decides between them, and the findings sorted by what each needs. Sections 1 and 2 were written from the tree, FACTS and the gap ledger before the reviewer read the plan or its grounds. -->

# The remaining plan against the goal: a review

Paths are under `explorations/` unless they start with `Library/`, `ProjectFortress/`, `Specification/` or `.claude/`. C4 is the flat model program, `run-c4/src/MicroGptFlat.fss`, with its vocabulary `FlatArrays` and its loaders `FlatData` beside it. The APL program is `apl/mg/MicroGptApl.fss`. "The one library" is the interpreter's library, which both paths are to share. "The prelude" is the compiler's own library of three files, which the switch-over deletes.

## 0. What was read and run, and in what order

1. First, with the plan unread: FACTS whole; the model program and its vocabulary; the ledger rows that the model's lines meet (305, 307, 310, 624, 641, 874 and the rows they cite); the kernels report (`perf-probes/kernels/REPORT.md`, sections 2 and 4); the code generator's distance report (`perf-probes/codegen-distance/REPORT.md`, section 0); the goal (P-7) with its history. Sections 1 and 2 below were written at that point.
2. One probe of the reviewer's own, before the plan was read, in a worktree seeded from the base build `/home/user/fortress-base32` (`832f7d0d91`) and removed after: the compiled checker, by the distance stage's own driver, over microGPT's own import closure against today's one library. Its note is `compile-ladder/plan-31/probes/model-closure-check.md`.
3. Then the plan and its grounds: section 3 says what was read.
4. After that, three small programs that pin what the first probe met, a timing of the checker on one program, and a Java model of the library's matrix product (`compile-ladder/plan-31/probes/mul-shape-model.md`).
5. The rehearsal of the switch-over that ran beside this review writes `compile-ladder/plan-31/probes/switch-rehearsal.md`. Section 5 says what of it this review could use.

Machine for the probes: 4 CPUs, Intel Xeon 2.30 GHz, OpenJDK 25, `FORTRESS_THREADS=1`, loads from 0.5 to 2.8, with another worker's runs beside them. A timing here is a measurement only as a ratio of two times taken in one run.

## 1. Where the tree stands

### 1.1 What runs

- **Walk runs microGPT.** Both programs and their quick checks pass the gate's walk check, 7 of 7, in 33 to 39 s (`compile-ladder/climb-batch-30/gate/summary.txt:148-151`).
- **The compiled path runs no array program.** Its prelude has no array type (row 305). `fortress compile` of C4's vocabulary stops at name resolution. No kernel of microGPT's shape has ever run compiled (`perf-probes/kernels/REPORT.md`, section 2).
- **The compiled checker accepts the one library.** Over the fourteen components that the default imports reach, it finds 0 errors and no crash (F-53, F-288). That is the first half of the plan, done.
- **The natives are bound for both paths.** 374 of the one library's 402 native bindings name a Java helper that both paths can call. The other 28 are `Reflect`'s, which microGPT does not import (F-299, F-32).

### 1.2 What stands between the checker's zero and a compiled program on the one library

Each line is a thing that the record holds as open, with how well it is known.

- **The code generator has never emitted the one library as it stands.** In the one library's world it refuses `FortressLibrary` and `FortressBuiltin` whole, at the wrappers of the helper classes that their native bindings name (row 874). The reviewer's probe met the same stop on today's tree: "Can't generate header for method loopChunk with jvm desc =I stripped = FortressLibrary$ZZ32". The count of 38 refused declarations in 10 kinds (F-34) was taken once, on older code, with 288 helper strings put back on walk's glue classes to get past that stop. It is not measured on today's code.
- **No emitted class of the one library has ever been loaded or run** (F-34: "no emitted class was run"). So nothing is known about the class loader on the library's deep generic hierarchy, the run time's built-in value classes (`FZZ32`, `FRR64`, the strings, tuples and arrows) under the one library's names, or the time that a compile and a run take against a library four times the prelude's size (9.4K lines in thirteen components against 2.3K in three).
- **The compiled tests are written against the prelude.** 1,558 compiler tests, 263 other compiler tests and 86 library tests pass against it (`compile-ladder/climb-batch-30/gate/summary.txt:2-3`, `:59`). How many fail against the one library is not measured.
- **microGPT's own files do not check.** Section 5.1 gives today's count: 42 distinct sites in C4's three files, 54 in the APL program's four and one crash in its syntax api, and 25 in two library components that only microGPT's loaders import (`FileSupport`, `File`). Each is a floor, because the checker stops a block at its first failing statement (row 474).
- **Three things that C4's lines need have no compiled form at all.** A size known only at run time, which C4's `view`, `heads` and `unheads` take from `reflect`: a compiled call fails the JVM's verification (row 307). Varargs, which C4's `flat` declares: "Can't compile VarArgs yet" (row 624). An array design: three questions are open with no default (F-270 cites P-85).

### 1.3 What is known about speed

- Under walk, C4's three kernels run 2,500 to 14,000 times slower than Java over `double[]` (`perf-probes/kernels/REPORT.md`, section 2). Walk's time goes to walking the tree, not to how numbers are stored.
- A Java model that boxes each number as the compiled run time does, behind a generic array object, runs 2.7 to 6.8 times slower than Java over `double[]` (the same section; F-11). That is the best that today's representation can reach, before anything else that compiled Fortress pays.
- What else it pays is measured only on scalar loops against the prelude: about 31 ns per element, in a transaction check on every read and write of a mutable local, boxing, and a method call per element (F-40, row 641); a generator and a closure call per iteration (F-12).
- Nothing is measured on the one library's own loops, reductions and array methods, because none compiles. The one library's `ZZ32` operator chain is two classes deeper than the prelude's, which leaves a margin of two frames before HotSpot stops removing temporary boxes (F-302, by reading).
- The `double[]` store exists on both paths (`JavaRR64ArrayStore`, F-333), but no factory chooses it. A class loader that gives an `RR64` instance a `double[]` field does not exist (F-18).

So the distance from "compiles" to "fast" is the least known part of the road. Its lower bound is a factor of 3 to 7 over Java from boxing alone. Its upper bound is not known.

## 2. The routes from today's tree to the goal

The goal has two parts that pull apart: finish what the designers intended, and one program compiled and fast. Each route below is judged on both. None is the plan's by name here: section 4 places the plan among them.

### Route 1. The whole switch-over first

Move every compiled program onto the one library, delete the prelude, then make microGPT compile, then make it fast.

- **Needs, in order:** the wrapper generator and the run time's value classes under the one library's names (row 874); the code generator's remaining walls over the fourteen components; the library's classes loading and running; every compiled test passing against the one library, or respelled; the prelude deleted; then microGPT's own sites, the run-time size, varargs and the array design; then speed.
- **Known:** the checker's side (0 errors) and the natives' bindings.
- **Unknown:** everything after the first emitted class: what the loader and the run time do with the library, how many of about 1,900 compiled tests fail and why, how long the gate takes when every compiled test checks against the one library, and all of speed.
- **Gives up:** an early compiled microGPT and an early number for its speed. The work is ordered by the library and the test corpora, not by the model program. If speed needs a change of the arrays' design, that is learned last, after the design questions were answered without it.

### Route 2. The model program's slice of the one library first

Same end as route 1: one library, the prelude deleted. Another order. First get one array program, then C4, compiled and run against the one library, beside the prelude, behind a setting of the compile command. Fix only what that program reaches. Measure its speed. Then finish the switch-over for the tests and delete the prelude.

- **Needs, in order:** the same first step as route 1 (row 874's names work); the walls that the model's reach meets, in the code generator and at run time; C4's own sites; a timing against Java; then the speed work that the timing names; then the rest of route 1 (the tests, the deletion).
- **Known:** as route 1. The distance stage's driver already selects the one library for the checker (`coordinator/tools/distance/DistanceMulti.java`), so a setting exists in probe form.
- **Unknown:** whether the run time can serve both libraries during the transition, or needs the names moved at once; how much of the library a compiled C4 reaches (the library's components are compiled whole, so "only what it reaches" holds at run time, not at compile time).
- **Gives up:** the single clean cut. Two libraries stay for longer, and some walls are met twice: once for the model, once for the tests. It gains the two numbers that the plan has never had: whether the one library runs compiled at all, and how far from Java it is.

### Route 3. Arrays in the prelude

Keep two libraries. Give the prelude an array family, and port C4 to it.

- **Needs:** `NativeArray` and about 1,000 lines of the library's array hierarchy rewritten in the prelude's dialect (F-61, row 305), with the prelude's own generators and reductions.
- **Known:** the prelude compiles and runs today.
- **Unknown:** whether the array hierarchy passes the same code generator walls (sizes, varargs, generic methods): they are the code generator's, not the library's.
- **Gives up:** one library. The compiled program would not run the designers' library, and the first half of the plan, the checker's zero on the one library, would buy nothing. Walk and the compiled path would keep two meanings for the same program.

### Route 4. The model program written down to what compiles

Keep the tree as it is. Write microGPT's kernels in Java helpers over `double[]` and call them from a short compiled Fortress program through native bindings.

- **Needs:** a few helpers and bindings, which compile today (F-298).
- **Known:** almost all of it. It would be fast in days.
- **Gives up:** the measure's meaning. The program would time Java, not Fortress. Nothing of the designers' arrays, sizes, generators or parallel loops would be finished or measured.

### Route 5. Another back end

Replace the team's code generator, by a new one or by partial evaluation of walk.

- **Gives up:** the designers' compiled path, which the goal names, and all the work on it. Not costed here.

### What the routes show before the plan is read

- Routes 3, 4 and 5 each give up one half of the goal. They are listed so that the choice is explicit, not because they compete.
- Routes 1 and 2 reach the same end and differ only in order. The question between them is what the order should minimise: the count of library and test defects still open, or the time until the two unknown numbers are known.
- Every route but 4 passes through the same first step: the run time's and the wrapper generator's names under the one library (row 874). Nothing after it can be measured before it is done.

## 3. What was read of the plan and its grounds

After sections 1 and 2 were written: PLAN's first section and phases 4 to 6; POSITIONS whole; the histories of the phase order (P-33), the one library (P-37), the open array questions (P-85), the unboxed stores with the sizes (P-84), the unboxed doubles (P-17), walk running the checker (P-12) and walk's speed (P-29); `coordinator/library-route-judgement.md`; `reviews/phase3-exit/judgement.md`, sections 1, 2, 4, 5.2, 6 and its last; the INDEX lines on the array design; `reviews/arrays-reminder-2026-11-10.md`; `reviews/parallelism-foundations-2026-11-08.md`, sections 3.3, 6 and 8; `reviews/batch-30-review.md`, its cost, its Part 5 and its last section; the header and the cost lines of each batch review from 21b to 30; `coordinator/CLIMB-BATCH-30.md`, its scope and rung Y; the boot note. FACTS and POSITIONS were read before the record-landing workflow of climb batch 30 landed. Its commits were read after: `f78da2650a` rewrote F-19, F-57, F-134, F-341, F-347 to F-351 and five entries' cited lines, and reworded P-174, P-175 and P-176 with each decision unchanged; `8e0100cf7a` brought PLAN's first section and its lists up to climb batch 30, with phases 4 to 6 as they were read. Nothing in either changes a finding here.

## 4. The plan against the routes

### 4.1 Where the plan sits

The plan is route 1. Three decisions of the curator's fix it:

- One library, the interpreter's, and the prelude deleted (P-37). His ground, in his words of 2026-10-26: the point of the switch-over is to avoid porting walk's library into the compiler's.
- The order: the checker's zero, then the switch-over with the natives first, then microGPT compiles, then microGPT fast (P-33). He approved it on 2026-09-26, after he asked for all open issues in the best order to reach the running compiler.
- The array questions return after the switch-over, and the whole preparation for them is done before it (P-85, his words of 2026-09-22).

What the judgement of 2026-09-20 judged was which library, not this order. Its alternatives were: grow the prelude (route 3), one text with two binding components, or both at once (`coordinator/library-route-judgement.md`, section 4). An order that brings one compiled array program before the tests' move, route 2, is in neither that judgement nor the plan of 2026-09-26. So route 1 against route 2 was never put to him.

### 4.2 The destination is sound

- Route 3 would write the array layer and the algebra a second time, and keep two meanings for one program. The first half of the plan made it unnecessary: the checker accepts the one library. Nothing found here speaks for it.
- Route 4 would time Java. The curator's own word excludes it: the goal is to finish what the designers intended (P-7), and a high-performance language cannot box its numbers (P-17), which is a statement about Fortress code.
- The first half is real. The reviewer's probe reproduced the zero over `FortressLibrary` and its apis, and found `System` at 0 (section 5.1).

So the one library stands, and this review recommends no change to it.

### 4.3 The order is not the shortest road, for three reasons

**1. The plan tests its two weakest assumptions last.** The assumptions: that the one library, once emitted, loads and runs on the compiled run time; and that a compiled array program on it can come near Java. By the plan's order the first is tested in the names batch, which also deletes the prelude and moves about 1,900 tests, and the second in phase 6. Until today nothing tested either. The judgement of 2026-09-20 asked for the first test as its step 4, "one worker session: the prelude through DESUGAR and CODEGEN once. No run has ever reached them with this library; the size is not on record." It was done for emission, declaration by declaration, and never for a load or a run (F-34). The phase 3 exit judgement asked that phase 4's record name its batches before the names batch is briefed (its section 4, J0929 item 5); PLAN still says that the rest of phase 4 "is not yet designed as briefs". The rehearsal that started beside this review is that step.

**2. The plan's sizes for the second half are not on record, and its sizes for the first half were low by a factor of six.** The judgement of 2026-09-20 put "the point where the prelude is one and the checker passes it" at "about four to five gated batches". The record shows 21 batch lines for phase 3 and nine landed batches of phase 4, and the prelude is not yet one. For what is left the record gives only lower bounds: the code generator "several rungs"; the names "at least two gated batches"; the arrays "at least three gated batches"; unboxed arithmetic "the largest codegen work in the plan, unmeasured" (`library-route-judgement.md`, steps 5 and 7; PLAN, phase 4). Added up: at least four batches before any array program can run compiled (climb batch 30b, one for the code generator's rungs, two for the names), and at least seven before microGPT does (three more for the arrays). At the record's 5M to 14M tokens a batch with its landing, that is 20M to 56M before the first array program and 35M to 100M before the first timing of microGPT, if the lower bounds hold this time. By these bounds route 2 would gain only one or two batches. What the bounds leave out is what separates the routes: the size of the tests' move, and of the code generator's work on declarations that no array program reaches. Nobody has measured either.

**3. Speed is where the goal is decided, and the plan's list for it misses the largest factor that this review could measure.** Phase 6 lists the compiled code's costs: boxing, the transaction checks, the casts, the instance rule. It does not list the library's own algorithms. The one library's matrix product halves its work down to one element product (`Library/FortressLibrary.fss:3044-3102`). In a Java model of that shape at the model's three matrix shapes, with every number unboxed, it costs 8 to 13 times a plain loop; with boxed numbers and tuple indices, 17 to 24 times; stopped at blocks of 16, nothing (section 5.2). So decisions A and B, built in full, would leave the model's matrix products about ten times from Java. The curator has already decided the rule for the parallel range, "the right forking constants" (P-175); `mul` does not have it. This is a model in Java, not a measurement of Fortress, which is the point: no measurement of Fortress is possible until an array program compiles, and the order puts that last.

### 4.4 The steps that rest on something untested, and what each costs if it fails

| step of the plan | rests on | tested? | if it fails |
|---|---|---|---|
| the names batch | the run time's value classes and the wrapper generator can take the one library's names (row 874); the emitted library loads and runs | no; the rehearsal is the first test, and its first load met a method written twice into 27 classes (section 5.3) | each wall is a rung of the code generator, the class loader or the run time; the batch that also deletes the prelude cannot land until all are found, so they are found inside the largest batch of the plan |
| "the code generator's zero" before the names | the count of 38 refusals in 10 kinds | taken once on older code, with 288 helper strings put back on glue; on today's tree the generator stops at row 874 before any declaration of `FortressLibrary` (section 5.1) | the count cannot be taken again until the names work is done, so the plan's order of these two steps is circular |
| "the prelude deleted, its tests kept" (P-37) | about 1,900 compiled tests pass against the one library, "at least 48" respelled | no; never run | every failing test is a defect of the library, the checker or the generator, or a respelling; the count is unknown. One part is tested here: a program's check takes about a second under either library once the apis are cached (section 5.1), so the gate's check time does not grow |
| phase 5, the model's static types | decision D's diff, written on 2026-09-29's library | stale: C4 has 42 sites of its own today against 26 then; 23 are the index bound | the diff is rewritten; small |
| phase 5, a size known only at run time | C4's `view`, `heads` and `unheads` make their sizes with `reflect`; a compiled call fails the JVM's verification (row 307); the third array question is open (P-85) | no | the vocabulary's views are redesigned without sizes in their types, which bends the sizes that P-84 calls central; a decision for him, with a diff |
| phase 5, the array decision A | a factory's `typecase` can put a `double[]` under the generic traits (F-159, in probes on the prelude), or the class loader must give each instance its field (way A4, unbuilt, unmeasured, F-18) | in part | if only A4 serves, it is new work in the class loader of unknown size |
| phase 6, unboxed arithmetic (decision B) | unboxing by static type in generated code brings a compiled kernel near Java | no; "unmeasured" | the 3 to 7 times of boxing stays (F-11) |
| phase 6, the rest | the library's loops, reductions and `mul` cost little once compiled | no; the Java model says `mul` alone is about 10 times | library work that the plan does not list |
| the measure itself | a pure-Java microGPT | not written | none; it is one worker's session, and every route needs it |

### 4.5 What the last ten batches bought toward the goal

The ten are climb batches 22c to 30. Their runs wrote about 48M tokens (4.61M, 3.2M, 5.7M, 6.03M, 2.6M, 5.2M, 6.65M, 7.54M, 3.25M, 2.92M, each from its review). The reviews that count the work around a run add 8M to 30M each: 16.3M before climb batch 26; 29.5M before 27, 17.5M of it the ledger pass; 12.4M around 29; 12.1M around 29b; 7.9M around 30.

By the record's own measures:

- **The distance and the checker count:** 0 before, 0 after. They could not move.
- **The natives:** 0 of 449 bound for both paths before climb batch 23; 374 of 402 after climb batch 29. This is the switch-over's precondition, and it is done. Its use starts only with the names work: until then the same bindings make the code generator refuse the library whole (row 874).
- **The code generator's refusals over the library:** 58, then 47, then 38 at climb batch 26; 24 on today's tree by the rehearsal, with the names hacked (section 5.3).
- **The model on the compiled path:** it stopped at name resolution on 2026-09-19, and it stops there today (F-97).
- **The model's own sites under the checker:** 26 on an earlier library; 42 today (section 5.1).
- **Speed:** no measure exists, so none moved.

By content, about half of the ten batches' rungs are on the road to the switch-over: the natives (23 to 28), the array store, the reader and `System` (28), the code generator's walls (25, 26, 27, 28), the forked arguments and the grain (30). The other half finishes the design, which is the goal's first half, not its measure: the numerals (29, 29b and a rung of 30, with a post-mortem), strict equivalence, string literals, the integer conversions, the opened `Number`, and the compiled transaction (30). The model opens no transaction (`reviews/parallelism-foundations-2026-11-08.md`, section 6).

The next batch on the boot note, climb batch 30b, continues that second half: `tryatomic` on both paths, the numerals' leftovers in the parser, the checker and the code generator, and a number `=` a numeral under walk. Two of its steps are on the switch-over's road: the `atomic` expression and a mutable field inside a transaction (rows 875 and 319), because `OneShotFlag` writes both in one line (`Library/OneShotFlag.fss:18`) and `List` does not compile without it (F-288). The rest is not.

### 4.6 What microGPT needs, against what the plan makes whole

**What C4 needs, by its import closure and its lines.**

- The fourteen components that the default imports reach: checked (0). They must emit, load and run. A component is compiled whole, so "only what the model reaches" holds at run time, not at compile time.
- Three more components: `System` (0), `File` (1 site) and `FileSupport` (24 sites).
- Its own 42 sites: the index bound (23, no model line changes), the sizes (decision D), and three one-off lines.
- Compiler gaps on its own lines: top-level tuple bindings, the form of its hyperparameters (lines 17 to 19; section 5.1 and a new row); varargs, for `flat` (row 624); a size made at run time (row 307); the numeral product on line 82 (a new row).
- The array decisions, and then speed.

**What the plan makes whole beyond that.** Every refused declaration of the fourteen components, test functions and `label` among them. All compiled tests moved, the prelude deleted and its defects retired. Walk running the checker (P-12) with its numeral and coercion work, 1.5M to 2.5M tokens by PLAN's own figure. The float and rational rounding rungs. The compiled transaction in all its forms. The numerals' last rows. Each is part of finishing the design. None is on the model's road, and the plan puts most of them before the model compiles.

**The APL program** adds 54 sites and a crash in its grammar's api under the checker. PLAN's phase 5 does not say which program "microGPT compiles" means first. The record leans to C4: it is the target form (P-9), and the APL side quest is closed (P-10).

## 5. The evidence, and what still waits

### 5.1 The reviewer's first probe: the model's closure under the checker

`compile-ladder/plan-31/probes/model-closure-check.md`, with its driver and three small programs under `model-closure/`. In short:

- Distinct sites, each a floor: C4's three files 42; the APL program's four 54, and a crash of its grammar's api; `FileSupport` 24; `File` 1; `System` 0; `FortressLibrary` 0.
- The checker refuses the model's line 82, `lr0 (1 - (1.0 s) / nSteps)`, against the one library: a float numeral times a `ZZ32` variable is an ambiguous coercion between `RR64`'s and `QQ`'s product. The prelude has no `QQ`, so no compiled test meets it. The numeral rule that the curator gave this morning, the default as the last resort (`coordinator/HELD.md`, the line of 11:3x), is not yet built in the checker; this line is its test.
- The model's hyperparameter lines 17 to 19, top-level tuple bindings, stop the compile under either library, and the code generator has no case for them. P-9 keeps that form for the model. No row and no line of PLAN held it.
- A program's check takes 1.1 s against the one library and 1.3 s against the prelude on warm caches; 17 s against the one library on cold caches.
- Code generation of `FortressLibrary` stops at row 874's wall on today's tree.

### 5.2 The reviewer's second probe: the shape of the library's matrix product, in Java

`compile-ladder/plan-31/probes/mul-shape-model.md`, with `mul-shape/MulShape.java`. Ratios to a plain loop over `double[]`, each pair in one JVM, at 16×16 by 16×16, 16×16 by 16×64 and 16×64 by 64×16:

- the library's recursion with unboxed elements: 9.3 to 10.4;
- with the right operand a transposed view of a flat vector, as C4's `wq^T`: 9.6 to 12.9;
- with boxed elements and a tuple object for each index: 20.7 to 23.6;
- the recursion stopped at blocks of 16: 0.8.

### 5.3 The rehearsal

`compile-ladder/plan-31/probes/switch-rehearsal.md` existed as a first version when this review was finished (14:04 UTC on 2026-11-10): its sections 1 to 3 and its walls W1 to W6 written, its sections on linking, loading and running, on timing, and on the walls against PLAN still marked open. What it has, and what it means here:

- **The switch itself is two lines** of `Shell.useCompilerLibraries()`, and a one-line program then passes the checker and the code generator against the one library in 16 s. That agrees with section 5.1's 17 s.
- **The names work (row 874) is a design, not a table** (its W2). Which run-time class carries each built-in type of the one library is not on record. Five of those types are objects in the one library where the prelude has traits (`Boolean`, `RR32`, `NN32`, `Char`, `FlatString`), and a hand-written run-time class cannot be an object's class today. No compiled value carries the arrays' two stores. The helpers hold 99 raise strings, not 55. Its size: a design first, then about three rungs. PLAN has it as one rung inside the names batch.
- **The run time's classes are tied to one library in their Java source** (`FZZ32 extends fortress.CompilerBuiltin.ZZ32.DefaultTraitMethods`); the rehearsal re-parented thirteen of them. So one build serves one library. This bears on route 2: a setting beside the prelude needs a second set of those classes, or cannot land.
- **The code generator's count on today's tree is 24 refused declarations in 8 kinds, 749 emitted**, against F-34's 38 in 10; it could be taken only after the names were hacked (its section 3). So line 1 of 6.2 holds.
- **The first load found a wall that no count could see** (its W6): the code generator writes one method twice into 27 classes of the library, 244 methods, and each class fails as it loads. Two more walls stood before it: the team's search by the prelude's names in the trait table (rows 940 and 942), and a library defect that the checker passes (`NN32`'s `zero` and `one`).
- **Nothing had loaded whole or run** when this review was finished. So its report says nothing yet on the two unknowns that this review turns on: a run, and a timing.

So the rehearsal's first version confirms section 4.3's first reason in its own terms: the first test of a load found walls of a kind that the plan's counts do not hold. The judgements that wait for its end are in section 6.4.

### 5.4 What evidence would decide between route 1 and route 2

Three results decide it, and all three come from the rehearsal's line of work, not from more reading:

1. **Can the compiled path select the one library beside the prelude?** If the run time's value classes can serve both sets of names, or the names can be chosen as a class loads, route 2 can land as a setting and the tests keep running on the prelude meanwhile. If the names can only be moved at once, route 2 does not exist as landed work, and only its probe form is left (option 3 of finding A).
2. **Does one kernel on the library's own `Vector` and `Matrix` run compiled?** A kernel with sizes written in its types needs neither decision D nor a size made at run time. The walls between today's tree and that run are the true list for phase 4.
3. **How far from the same kernel in Java is it?** With the Java model's 10 and the boxing's 3 to 7 as the expectation, a first measured ratio says whether phase 6 is a few rungs or a compiler project. That sets how much of the plan's breadth can come before it.

## 6. The findings, sorted by what each needs

### 6.1 Findings that would change a decision of the curator's

**A. The order of what is left.** It touches the approved order of the phases (P-33) and his word that the array work comes after the switch-over (P-85). Finding: section 4.3. The one library (P-37) is not in question.

1. **Keep the approved order.** The whole switch-over, then the model compiles, then speed. By the record's lower bounds, at least 4 batches before any array program runs compiled and at least 7 before microGPT does: 20M to 56M tokens, and 35M to 100M. Those bounds were low by six times in the plan's first half. It gives up knowing early whether the one library runs compiled and how far from Java it lands; if speed needs a change in the arrays' design, that is learned after the array questions were answered.
2. **The model's slice first, as landed work.** The next batches make the compile command able to select the one library beside the prelude, and bring one kernel on the library's own `Vector` and `Matrix` to a run and a timing against Java. The tests' move and the prelude's deletion follow. About 2 to 3 batches to the first compiled array program and its timing: 10M to 40M tokens. The whole road is not shorter, and some walls are met twice. It gives up the single cut and keeps the prelude longer. It changes the approved order and brings the first array measurement before the switch-over ends. It exists only if both libraries can be served at once (section 5.4, point 1); by the rehearsal's first version one build serves one library, so this option needs a second set of the run time's value classes, about thirteen of them, or it cannot land.
3. **Keep the approved order for landed work, and buy the two numbers by probes first.** The rehearsal goes on in its scratch tree, in worker sessions, until one kernel runs compiled on the one library and is timed against the same kernel in Java. One more session writes the pure-Java microGPT, which every route needs. No batch, and nothing lands. About 2 to 5 sessions: 2M to 5M tokens. Then options 1 and 2 are chosen with the numbers. It gives up the scratch work, which is built again as rungs, and it can stall on a wall that needs a designed rung.

Recommendation: 3 now. Then 1, with the names work for the run time cut out of the batch that deletes the prelude and done first (6.2, line 1), unless the numbers make a second set of the run time's classes worth its cost; then 2.

**B. The next batch.** It touches his go of 2026-11-10 for climb batch 30b. Finding: section 4.5.

1. **Run it as planned:** `tryatomic` on both paths, the `atomic` expression, a field inside a transaction, the numerals' leftovers in the parser, the checker and the code generator, and a number `=` a numeral. One batch with its landing, 5M to 14M tokens. Two of its steps are on the switch-over's road. It gives up a batch of the road.
2. **Cut it to the road.** Keep the `atomic` expression and the field inside a transaction, which `OneShotFlag` writes and `List` needs. Keep the numeral rule in the checker, with the model's line 82 as its test. Add the top-level tuple binding of the model's lines 17 to 19. Move `tryatomic`, row 322's argument case and the numerals' parser leftovers behind the first compiled kernel. The same cost; every rung then faces the switch-over or the model. It gives up the compiled transaction's other forms for now, and the batch's record is planned again, which the review of climb batch 30 already asks for at four places.
3. **Hold it** until the probes of finding A's option 3 end, and cut the next batch from the walls that they list. No batch now. It gives up nothing of the road; the numerals' and the `atomic` leftovers wait.

Recommendation: 2, launched after the probes of finding A, since the boot note says that the week's budget covers only one of the two.

**C. The matrix product's grain.** It extends his rule for the parallel range, the right forking constants (P-175), to the library's `mul`, and it touches the model's speed. Finding: section 5.2.

1. **Extend the rule now.** `mul` stops its split at a grain and runs a block in sequence, as the range does since climb batch 30. One library rung, about 1M tokens, tested under walk by equal products. Its gain can be measured only once a kernel compiles. It gives up the measurement before the change.
2. **Put it on phase 6's list, and build it in the first batch that has a compiled kernel to measure it on.** No cost now. The first compiled timing then carries this factor of about ten, and is read with it.

Recommendation: 2. It follows his rule that no performance decision rests on anything but a compiled timing (P-29).

### 6.2 Findings that correct the record's ground, one line each

1. PLAN, phase 4: the code generator's count over the library cannot be taken before the names work, since the generator stops at row 874 first; within the phase, the wrapper generator's and the run time's names come first, as a step of their own, not inside the batch that deletes the prelude. By the rehearsal that step is a design of the carriers and about three rungs, where PLAN has one rung.
2. PLAN, phase 5: add the top-level tuple binding, the form of the model's lines 17 to 19, which stops the compile under either library (the row drafted in `model-closure-check.md`; row 474 is its checker half).
3. PLAN, phase 5: add the model's line 82, a float numeral times a `ZZ32` variable, refused against the one library (the second row drafted there); it is the test of the numeral rule of 2026-11-10, and if that rule as recorded does not pass it, the line is his (P-87).
4. PLAN, phase 5: C4's own count is 42 sites today, not 26; `File` 1, `FileSupport` 24, `System` 0; decision D's diff of 2026-09-29 is stale against it.
5. PLAN, phase 5: say which program the phase's exit means; the record leans to C4 (P-9, P-10), and the APL program adds 54 sites and a crash of its grammar's api.
6. PLAN, phase 6: add the library's own splits; `mul` and the strided ranges still split to one element (`reviews/arrays-reminder-2026-11-10.md`, section 4), and the Java model puts `mul`'s at about ten times.
7. PLAN, phase 6: the pure-Java microGPT waits on nothing and every route needs it; it need not stand on the last line of the last phase.
8. PLAN gives phases 4 to 6 no size; its one earlier sizing, of 2026-09-20, was low by about six times. A size for each phase, in batches, belongs in PLAN before the next go.
9. The `fortress-repo` skill advises `(1.0 s) / n` for a float quotient (`references/revival-changes.md`, "Numbers"); against the one library the checker refuses it today. For the skill writer, once the numeral rule lands.

### 6.3 Findings that confirm the plan, one line each

1. One library is the right destination (P-37): each other route gives up half the goal.
2. The checker's zero is real: reproduced over `FortressLibrary` and its apis on today's tree, with `System` at 0.
3. The natives came first for a reason that the model shares: the arrays' store, the file reader and `System`'s `args` are on C4's path (P-169, P-170).
4. A program's check does not get slower under the one library: 1.1 s against 1.3 s on warm caches.
5. The index bound's 23 sites in C4's vocabulary are PLAN's item 61, at its default, with no model line changed.
6. The model's numeral powers pass the checker against the one library, as PLAN's phase 5 expected of row 533.
7. Climb batch 30's forked arguments, joins and grain are on the model's road: its parallelism is its reductions (P-175).
8. The `atomic` expression and a field inside a transaction are on the switch-over's road, through `OneShotFlag`.

### 6.4 What waits for the rehearsal's end

The rehearsal's first version settles two points: one build serves one library, and the names work is a step of its own (section 5.3). These wait for its last sections:

- Whether the library loads whole and a program runs on it, and so how many walls stand behind the duplicate methods.
- Whether an array program runs, and so whether option 3's timing is one more session or several.
- Its grouping of the walls against PLAN's lines, which gives options 1 and 2 of finding A their sizes.

## Decisions

- The probe used the distance stage's driver, not `fortress compile`, so that it measured the checker on the model's files without repeating the rehearsal. The alternative, a patched compile command, is the rehearsal's.
- The cost of `mul`'s shape was modelled in Java, since no Fortress array program compiles. The alternative, no number, would have left finding C as a reading.
- No decision of the curator covers the order of route 1 against route 2. This review acted on neither: it recommends the probes that decide.

## Defects

Two, each with a drafted row in `compile-ladder/plan-31/probes/model-closure-check.md`, "Defects": a top-level tuple binding stops the compile; a float numeral times a `ZZ32` variable is an ambiguous coercion against the one library. Both paths were run for the first (walk runs it; the compiled path stops); the second is the checker's alone (walk runs it).

## Sentences of the specification made false

None: nothing in the original tree was edited.

## For FACTS

The two notes' own "For FACTS" sections: the model's closure's counts and the check's time (`model-closure-check.md`); the Java model's ratios (`mul-shape-model.md`).

## Commands

- `explorations/compile-ladder/plan-31/probes/model-closure/run.sh <check|full> <out-dir> <dir> <targets...>`: the distance stage's driver over any list of components, run from the directory that holds them.
- `javac MulShape.java; java -Xmx1g MulShape <n> <m> <p> <reps>`: the Java model.

## Questions for the curator

Findings A, B and C of section 6.1, each with its options and the option that keeps the present course: A's option 1, B's option 1 and C's option 2.

## For the curator

**The question.** Is the remaining plan correct and solid, and is the work on the right problem for the goal?

**The answer in two lines.** The destination is right: one library for both ways of running a program. The order of what is left is the weak part: the plan tests its two riskiest points last, and the next batch is mostly off the road to a compiled microGPT.

**What I found.**

- The first half of the plan did its job. The compiler's type checker accepts the interpreter's library with no error. I ran it again today and got the same zero.
- The plan's order from here: first move every compiled test onto that library and delete the compiler's own small library. Then make microGPT compile. Then measure speed.
- Two things were never tested, and this order tests them last. First: does the library run at all once it is compiled? Nobody has loaded one compiled class of it. Second: how far from Java is a compiled array program? No program with an array has ever run compiled.
- The rehearsal that runs now is the first test of the first point. The rehearsal is a worker that tries the switch-over in a scratch copy and lands nothing. An earlier judgement asked for such a test on 2026-09-20. It was done only halfway. Its first report is in: the switch itself is two lines, but the first load of the compiled library failed, on a fault that no count of the plan could see. Nothing has run yet.
- The plan was sized once, on 2026-09-20: four to five batches to reach one library. The work has taken 30 batches so far, and the switch-over itself has not started. A batch is a set of tasks that agents build at once and land together. The remaining phases have no size on record. By the record's own lower bounds, an array program first runs compiled after at least 4 more batches, and microGPT after at least 7, which is 35M to 100M tokens.
- The last ten batches wrote about 48M tokens in their runs, and 8M to 30M more around each. The measures that face microGPT did not move: on the compiled path it stops at the same step as in September. The groundwork moved: 374 of the library's 402 calls into Java now work on both paths, and the code generator refuses fewer of the library's declarations, 38 where it refused 58.
- About half of that work was on the road to the switch-over. The other half finished parts of the design that microGPT does not use: the numerals, equality, string literals and transactions. That is part of your goal, but it is not what the goal is measured by.
- The next batch on the list, 30b, is mostly of that second kind. Two of its steps are on the road.
- Speed has a factor that the plan does not list. The library multiplies two matrices by cutting the work in halves until one multiplication of two numbers is left. I modelled that shape in Java, at microGPT's matrix sizes. With plain numbers it runs about 10 times slower than a simple loop. With boxed numbers, numbers kept as objects, about 20 times. Stopped at blocks of 16, it costs nothing. You gave this rule for parallel loops: the right forking constants. The matrix product does not have it. This is a Java model, not a timing of Fortress.
- Two lines of the flat microGPT program do not compile, and no line of the plan held them. Its first lines bind the hyperparameters as one tuple, `(nEmbd, blockSize, …) = (16, 16, …)`. The compiler stops on that form today. And `1.0 s`, a float numeral times an integer variable, is refused against the interpreter's library, because that library also has rationals and the checker cannot choose. Your numeral rule of this morning should make it pass once it is built. Both are compiler work. No model line needs to change.

**What needs your decision.**

A. The order of what is left. This touches the order of the phases that you approved (P-33), and your word that the array work comes after the switch-over (P-85). It does not touch the one library (P-37).

1. Keep the order. The whole switch-over, then microGPT compiles, then speed. At least 4 batches before any array program runs compiled, and at least 7 before microGPT does: 35M to 100M tokens. The plan's earlier sizes were low by six times. It gives up knowing early.
2. microGPT's slice first. The compile command learns to pick the interpreter's library, beside the compiler's own. One small array program is compiled on it and timed against Java. The tests move after. About 2 to 3 batches to that first timing, 10M to 40M tokens. It gives up the single clean cut, and it changes your order. The rehearsal's first report makes it harder: the run-time classes for numbers and strings are tied to one library, so this needs a second set of them.
3. Keep the order for landed work, and get the two numbers by probes first. A probe is a small trial that lands nothing. The rehearsal goes on in its scratch copy until one small array program runs compiled and is timed against Java. One worker writes the pure-Java microGPT now. No batch, about 2M to 5M tokens. Then you choose 1 or 2 with the numbers. It gives up the scratch work, which is built again properly later.

B. The next batch, 30b, which has your go.

1. Run it as planned. One batch, 5M to 14M tokens with its landing.
2. Cut it to the road: keep the two steps that the interpreter's library needs in order to compile, keep your numeral rule with the `1.0 s` line as its test, add the tuple line, and move the rest behind the first compiled array program. The same cost.
3. Hold it until the probes of A end, and cut the next batch from what they find.

C. The matrix product's blocks.

1. Give the matrix product a block size now, as the parallel loop has since batch 30. One task, about 1M tokens. Its gain cannot be measured yet.
2. Put it on the speed phase's list, and build it in the first batch that has a compiled array program to measure it on. No cost now.

**What waits.** The rehearsal's report was a first version when this review was committed. Its last part, on loading, running and timing, decides the sizes in A1 and A2, and how many more sessions A3 needs.

**My recommendation.** A3 now. After it, A1 with the naming work done first as a step of its own, unless the numbers say that a second set of run-time classes is worth its cost; then A2. B2, launched after A's probes. C2.

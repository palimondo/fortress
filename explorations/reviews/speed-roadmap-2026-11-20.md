<!-- The roadmap from today's compiled path to a fast compiled microGPT, trained in batches on several cores with SIMD kernels and `float` on JDK 25 and then on Valhalla, written on 2026-11-20 at the curator's request. -->

# Making compiled microGPT fast: the roadmap

## 1. For the curator

Speeds are against the Java baseline: 0.1 ms a step, batch 1, one thread, `double`, without Adam, measured once. Targets are this roadmap's goals from their stated ground; estimates are unmeasured. References: this section's end; short names: section 2.

**Before stage 1.** PLAN phases 4 and 5 make microGPT run compiled; phase 5 brings decision A and the unboxed store, a Java `double[]` under each array. Estimate 100 to 500 times the baseline, from Java models of the library's parallel split (19 to 80 times) and of boxes (6 to 7).

**The stages.**

1. Unboxed and lean: unboxed arithmetic; no test for an open transaction at each use of a plain local; a grain, the size below which a split runs in sequence, for the product. Target 2 times: a Java model of the library's shape costs 1.4.
2. GEMM, the general matrix product, as a Java kernel, a routine for a whole operation, behind a native binding, a library body that names a Java method. Target 1.35 times: the products, 65 % of the step, reach Java's speed; the rest stays at 2.
3. SIMD, one instruction on several numbers, each in its lane: vector kernels for products, sums and rows, sums in a fixed order. Target 75 µs: Java's step with vector products, if row kernels bring the rest to Java's speed.
4. Batches across cores: each core runs whole steps on its slice of documents; the gradients are summed once. Target and estimate about 25 µs a document, 3 times stage 3 on 4 cores: tasks over 100 µs, small serial parts.
5. `float` data, the sum across slices in `double`. Target: Java's own gain from `float`, applied to stage 4. Estimate about 17 µs: twice the lanes on 65 % of the step give at most 1.5 times.
6. After JDK 25: HotSpot's gains in JDK 26 and 27, then Valhalla's value classes, objects without identity, held unboxed; preview in JDK 28. No speed target.
- Stage M, memory reuse: only if fresh arrays cost over a fifth of a step.

**His decisions, in the order needed.** All are consequential: each touches microGPT's speed.

1. Decision A, Q320: how generic arrays get the unboxed store. Phase 5's. The proposal bends his lean.
2. Q509: the store and transactions.
3. Q524, the target. Targets below the scalar program read anew P-7's "the optimal result, the one to aim at".
4. Decision B: where unboxed arithmetic happens.
5. The transaction checks, after PLAN's explanation for him.
6. The grains: Q523, Q500.
7. The parallelism analyzer's repair: row 987, Q501.
8. New: Java kernels for the product, dot product and array `exp`.
9. New: walk loads each kernel itself, or P-169's bend for the run time's own operations extends to them.
10. New: FMA, one rounding for a multiply and an add, if it pays.
11. New: the Vector API, Java's SIMD library, is an incubator module, not final: a flag in every build and run.
12. New: sums keep a fixed tree of partial sums and a fixed lane count, so results don't change with threads or machine.
13. New: model lines 81, 82 and 88, for batch and slices, as a diff.
14. The width, Q37 fork 4: at least 15 model lines and the vocabulary to `RR32`, with new goldens, the checks' reference results. With it, P-9: the APL program moves too, or P-9 bends.
15. New: JDK 25 through stage 5; Valhalla after JDK 28's release.
16. Memory reuse, only if measured.

**Left out, and why.**

- External BLAS, the standard native matrix library: his word.
- Graal, Oracle's other Java compiler: the roadmap's own choice, as P-7 allows it; it left Java's release train, and its vector support is called partial. Truffle, LLVM, a GPU: outside P-7.
- Half precision: 4.2K parameters fit in the first-level cache.
- Agrona and off-heap memory: Agrona rests on the JDK's internal `Unsafe`, the public one's memory access is deprecated, and arrays beat it. The Disruptor is for messaging; its discipline stays: allocate once, one writer per region.
- A redesign of transactional memory: microGPT opens no transaction.
- Timings on Apple Silicon: parked for his machine.

**References.**

1. Opening, before stage 1: F-355; P-33, PLAN.md:110; F-356; F-11.
2. Stages 1 to 6 and M: F-356; JB §5, P-58; JB §5; C §6 S2, JB §6; AW §6, C §3; C §4 S1, C §1 S5; M2.
3. Decisions: 1, P-85, Q320; 2, P-169; 3, P-7; 4, P-85; 5, PLAN phase 6, item 2; 6, P-175; 9, P-58; 12, C4P §4; 13, P-87; 14, AW §6, P-9; 15, C §4.
4. Left out: C §10 S1, C §5 S2; C §3; C §9 S1, S4 to S6, S9; PF §6; M8.

## 2. Short names

Paths are under `explorations/` unless they start with `Library/`, `ProjectFortress/` or `Specification/`. F- and P- are entries; "row" is a gap-ledger row; Q is a review-queue item.

- JB: `java-baseline/REPORT.md`. PC: `java-baseline/python-comparison.md`.
- AW: `reviews/array-design-ways.md`. AD: `coordinator/array-design.md`.
- TW: `reviews/transaction-checks-ways-2026-11-17.md`. PF: `reviews/parallelism-foundations-2026-11-08.md`. PR: `reviews/plan-review-2026-11-10.md`.
- HC: `perf-probes/helper-calls/REPORT.md`. C4P: `c4-parallelism.md`.
- M: `run-c4/src/MicroGptFlat.fss`, the flat program. FA: `run-c4/src/FlatArrays.fss`, its vocabulary.
- B Qn: answer n of `B-questions.md`, read in the tree at `a62e1e30e6`. C §n Sm: source m of section n of `C-jvm-state.md`, the survey of the JVM of 2026-11-20. Both are in `reviews/speed-roadmap-2026-11-20/evidence/`, with his handover (`handover.md`) and the check of this roadmap (`roadmap-check.md`).
- His words in quotation marks are from his message in chat at 15:3x UTC on 2026-11-20, cleaned up, quoted word for word.

## 3. Before stage 1: microGPT runs compiled

- **For.** Every later timing needs a compiled step. It must bring C4's step, compiled against the one library, through its quick check.
- **Builds.** PLAN phases 4 and 5, not this roadmap's work: the switch-over, then phase 5 in P-33's order, microGPT's static types (decision D), the array design and the code generator's gaps (PLAN.md:104-120). The array design brings P-85's three questions, decision A and the unboxed store (PLAN.md:110). Stage 1 stands on that store.
- **The store.** A `double[]` store with a `put`: today's `FortressRR64ArrayStore` has none, and no factory picks it (F-333; P-169). It reads in plain or opaque mode, an ordering weaker than volatile. PF §5 finds opaque mode enough, and warns that plain mode may tear a `double` (JLS 17.7).
- **Measures.** The first compiled step, at one thread and at four, against 101 µs (F-355), with a profile that splits boxes, checks, forks and closures. No target.
- **Risk.** At four threads the product forks down to single elements, 80 times the plain step in Java (F-356). Time one thread too.

**Phase 5's decisions that stage 1 stands on.**
- **A, how an array made through the library's generic traits gets its unboxed store. Consequential: it bends his lean (Q320).** Q320 is needed before microGPT compiles. Ways (AW §3): A1, the library's `typecase` on the element type with `cast`, checked and run on both paths on a probe's own trait, not the library's arrays (F-159), one cast for each array made; A2, a plain factory beside the generic one, which walk refuses; A3, a factory name per type, a model line each; A4, the class loader stamps a `double[]` class, the team's direction (`Unbox.java`, the loader's stub), unbuilt (F-18); A5, a type outside the specification. P-84 fixes `double[]`, P-85 leaves the way open, and Q320 holds his lean to A4. Proposal (this roadmap's): A1 now, A4 kept for stage 6, where Valhalla changes the loader anyway.
- **The store and transactions (Q509). Consequential: his open question.** Ways (PF, "Questions"): (a) outside, which repeats row 953 under `atomic`; (b) a slot API for doubles; (c) one check per bulk operation. P-169's reason leans to (b). Proposal: (b) for one element, (c) for a kernel call, so a kernel asks once.

## 4. Stage 1: unboxed and lean

**For.** P-17 and P-84: high-performance computing (HPC) code runs unboxed. It must bring the compiled step at one thread in `double` within 2 times of the baseline.

**Builds.**
- Code generator: unboxed arithmetic by static type, decision B: `double` local slots, `dadd`, the helpers' `(DD)D` signatures called directly (HC §6; AD §4(b)). An accumulator in a JVM local, not in a cell (TW, Way 2b).
- Code generator: no transaction check on a local that no closure captures (TW, Way 2). It clears the 64 % of the probe's array loop (row 641).
- Library: a grain for `mul` (Q523) and for strided ranges (PR §6.2).
- Run time: a cache for the class-file read of each call site (F-385). Measure F-264's casts and the instance rule (PLAN phase 6).
- Specification, checker and model: no change.

**Measures.** The step against 101 µs; each operation against JB §5's plain column (`java-baseline/run.sh kernels`). Target 0.2 ms.

**Waits on.** Phases 4 and 5, with decision A and the store; decision B (P-85); the primer on transactional memory (PLAN phase 6, item 2).

**Decisions.**
- **B, where unboxed arithmetic happens. Consequential: P-85 returns it to him.** P-17 requires it; the way is open. The ways on record: the code generator by static type (AD §4(b)); the team's unboxing pass, commented out (HC §6); Valhalla's scalarization (stage 6). Proposal: the code generator now.
- **The grains (Q523, Q500). Consequential: P-175 asks for the right forking constants.** For `mul`'s grain the plan review recommends the first compiled kernel, and nothing is landed (Q523); the range's grain stays 16 by Q500's default until a compiled measurement. This stage is that point.

**Size.** 6 to 8 rungs in 2 batches: decision B 3 to 5, Way 2 1, grains 1, the cache 1.

**Risks.** Generic library code still boxes: `map`, `ivmap` and `tabulate` read the store through a generic `get` and call a closure (FA:15-17, :25-32), and a read through a generic trait returns a box unless decision B reaches it (AW §3, A4). Only escape analysis, C2's removal of objects that never leave inlined code, takes such boxes away, within its inline depth (F-301, F-302, each seen once, while the number types were traits). Early sign: Java Flight Recorder (JFR), the JVM's profiler, counts bytes per element in `rows(sm)` above zero; then A4 or stage 3's kernels carry the elementwise operations.

## 5. Stage 2: GEMM, the matrix product as a kernel

**For.** His words: "We need fast GEMM (but no external BLAS)". GEMM is the general matrix product, C = A·B. The products are 65 % of the step (JB §5), and HotSpot vectorises none of them on JDK 25 (F-355). It must bring the step to 1.35 times the baseline, 0.135 ms. That follows if the products reach Java's scalar speed and the other 35 % stays at stage 1's 2 times (65 + 2 × 35 = 135 µs, an inference). Parity needs the rest near Java's speed too, which stage 3's row kernels bring.

**Builds.**
- Run time: a kernel class in `nativeHelpers/` over the unboxed store, with offsets and strides. Its helpers take the store object, as `arrayOps.getRR64` does (`ProjectFortress/src/com/sun/fortress/nativeHelpers/arrayOps.java:35`), since a helper can't take a Java array (F-106, F-183). It covers the model's three forms: X·Wᵀ forward, dY·W for the inputs' gradient, dYᵀ·X for the weights' gradient (M:52-66). It holds a block of C in registers: register tiling. One element of A is broadcast, that is copied to every lane, against a row of B, so each output element adds its terms in the library's order. Transposed operands are copied first: packing. A copy measured the same time in Java, within noise, in one fork (JB §3, decision 4). Shapes are general, with a scalar tail.
- Library: `Matrix.mul` (`Library/FortressLibrary.fss:3129-3187`) calls the kernel through a `builtinPrimitive` binding (P-58) when both operands are unboxed stores or views that it can read flat. The Fortress recursion stays for every other element type. A view such as `m.t()` (FA:47-50) answers its store, offset and strides. A kernel for the rank-3 products of the attention heads (FA:127) follows the same form.
- Walk: runs each kernel by one of the two ways below.
- No model line changes: the model's product is the library's juxtaposition, which forwards to `mul` (`Library/FortressLibrary.fss:3271-3273`; P-27). Specification and checker: no change.

**Measures.** Each product against JB §5's plain and Vector API columns; the step against 101 µs. A test asserts the kernel's product against the Fortress recursion at the checks' tolerance.

**Waits on.** Phase 5's store and its answer on transactions.

**Decisions.**
- **A Java kernel in place of Fortress loops. Consequential: microGPT's speed, and the principles split.** The team's precedent is Fortress loops over the store (`ZZ32Vector`'s operators, `Library/CompilerLibrary.fss:482-518`; AD §4(b): whole-array natives are "not the team's precedent"). Its native interface and P-58's form allow a static helper. An APL implementation runs each primitive as a native loop (AD §4(b)). Generated code can't reach this: C2 doesn't vectorise the two-offset shape on JDK 25 (JB §5; C §2 S2). The record settles the form (P-58) and the place (P-27), not the choice. Proposal: the kernel, with the Fortress `mul` kept as reference and fallback.
- **Walk and the kernels. Consequential: it reads P-58 and P-169 anew.** P-58 has walk load the named helper itself; P-169 bends that for the run time's own operations only, and a kernel is a call into a Java helper. Ways: (a) walk loads the helper as P-58 says, with walk's `double[]` store object holding the helper's store class (F-333); (b) walk answers each kernel's name with its own operation, extending P-169's bend to the kernels of stages 2, 3 and 5. Proposal: (a), inside P-58.
- **FMA. Consequential: it changes the bits.** FMA computes a·b+c with one rounding. Java never fuses by itself (C §2 S4). The specification rounds each `+` and each multiplication (`Specification/basic/operators/opr-overview.tex:179`, `:212`) and says nothing of a matrix product's rounding. The baseline uses none (JB §3). Proposal: no FMA unless rung (c) of the probe shows a gain; then FMA in library kernels only, never in a written `a b + c`. Without FMA the broadcast form keeps each product bit-equal to the library's.

**Size.** 3 or 4 rungs, 1 batch: the kernel with its JUnit test, the library's binding and the views, walk's side, the heads.

**Risks.** The model's operands are mostly views: transposes, rows and planes. A view the kernel can't read falls back to the recursion. Early sign: a count of fallback calls in the quick check above zero. A 16 by 16 product is about 4K multiply-adds, so a call's fixed cost counts: measure it at 16.

## 6. Stage 3: SIMD kernels and sums in lanes

**Terms.** SIMD is one instruction on several numbers held in one vector register; each number's place is a lane. A 512-bit register (AVX-512) holds 8 `double` or 16 `float`; Apple's 128-bit NEON holds 2 or 4 (C §1 S3, S8, S10). The Vector API, `jdk.incubator.vector`, is Java's library of vector operations that C2 compiles to such instructions; it's in its tenth incubation in JDK 25 (C §1 S1). A reduction combines many values with one operator, as `SUM` does with `+`. Floating-point `+` isn't associative, so the order of a sum changes its last bits.

**For.** His words: "vectorized operation (SIMD multiplications)". It must bring the batch-1 step in `double` to 75 µs or below. JB §5 measured 75 µs with vectors in the products and the rest at Java's scalar speed, so the target follows if this stage's sum and row kernels bring the rest there.

**What Fortress as designed reaches.** The language has no vector type. The specification lets a generator group a reduction "in any way it likes consistent with its natural order" (`Specification/advanced/parallelism-locality/defining-generators.tex:61-66`) and adapt its traversal to a commutative monoid (`:384-388`), and it calls a float's `+` approximately associative (`advanced-lib/algebraic-constraints.tex:586-590`; unbuilt, row 37). So lanes in a sum need no new rule (B Q4). The JVM can't be told this: it never reorders a float sum (C §2 S6; C §11, item 13). So:
- Sums and products need Java kernels behind P-58 bindings.
- Elementwise loops over one index can be vectorised by C2 itself, as Adam's loop was in Java, 8 lanes (JB §5), if stage 1 gives counted loops over primitive arrays. Measured at this stage.

**Builds.**
- Build and launcher: `--add-modules jdk.incubator.vector` for the helpers' `javac` (the tree compiles at level 25, `build.xml:138`) and in `bin/fortress`'s `JAVA_FLAGS` (`bin/fortress:28-32`). The incubator warning prints at every run (C §1 S6); keep it out of the tests' compared output.
- Run time: the GEMM kernel in vectors. The register tile holds several output rows of one or two vectors each; A's element is broadcast; B's row is a vector. The species, the vector shape, is a `static final` field; vectors stay in locals; loops end with a scalar tail, not a mask (C §1 S11, S15, S16). With a lane per output element, the order stays the library's, as JB §5's variant did for `mul` and `tMul`.
- Run time: sum kernels for the dot product, `SUM` and `BIG MAX` over unboxed stores. Each keeps a fixed number of accumulators and folds them in a fixed tree, never `reduceLanes`, whose order "may even vary over time" (C §1 S17, S18).
- Run time: a row kernel for `exp` over an array, by the Vector API's intrinsic (C §1 S1).
- Library: the sum kernels are called where both arrays are known, not from the range's leaf, which sees only a range and a body (`Library/RangeInternals.fss:1365`). For `DOT`, that is `Vector.dot` (`Library/FortressLibrary.fss:2803-2804`, which `DOT` reaches at :2873-2874). For `∑ e` and `BIG MAX z` over one array (M:23), it is the array's own `generate` (`:2337-2338`), which today hands the work to its index range. The vocabulary's `exp`, `log`, `×`, `/` and `SQRT` over arrays (FA:25-32) move into the library (P-27, P-9), each with a kernel where C2 doesn't vectorise it.
- Specification, checker, code generator and model: no change.

**Relaxed order, item by item.** His words: "with relaxed numerical precision like when LLMs are trained on GPU clusters". Here that means:
- The products: nothing relaxed. A lane per output element keeps each sum's order (JB §5, `mul` and `tMul`), so without FMA the products stay bit-equal to the library's.
- The sums of 16 to 27 terms in `rmsn`, `sm` and their backward lines (M:22-29), and the loss's `DOT` over 16 terms a document (M:56): split over a fixed number of accumulators. JB §5's Vector API variant reordered the forward products' sums, and JB §6's variant at grain 4 split every sum of 16; both passed every check at 1e-12, and the Vector API variant's largest difference on a loss was 8.9e-16.
- `exp` in vectors: last bits differ from `Math.exp` (estimate; M1 measures it).
- FMA, if taken: one rounding in place of two in each multiply-add.
- The batch's gradient sum across slices: stage 4, in a fixed tree.
- Not relaxed: NaN and infinity stay IEEE, since the JVM has no fast-math mode (C §2) and P-159 stands. The checks stay at 1e-12 in `double`.
- The peers: GPU libraries promise no order across platforms or releases (C §8 S3, S4), and `DoubleStream.sum`'s order is "intentionally not defined" (C §8 S1).

**Measures.** Each kernel against JB §5's Vector API column; packed instructions counted by `run.sh asm`'s method; JFR allocation zero in every kernel, since a vector box is the main hazard (C §1 S15). The step against 75.5 µs and the probe's rung (b).

**Waits on.** Stage 2; decisions 11 and 12 of section 1.

**Decisions.**
- **The incubator module. Consequential: every run and every test.** Ways: (a) the module in the build and at every run now; (b) wait until the API leaves incubation, which waits for Valhalla's preview (C §1 S1 to S3). Nothing in the record covers it. Proposal: (a), with all vector code in one class per kernel family, since the package is renamed on promotion (C §1 S6).
- **What stays reproducible. Consequential: it sets what the checks can assert, and the principles are silent.** Today a sum's tree depends only on its range, so it is the same at one and four threads (C4P §4). Ways: (a) bit-equal across thread counts and machines: a fixed tree and a fixed logical lane count, say 16, mapped onto 2 to 16 hardware lanes; (b) bit-equal across thread counts on one machine: the lane count of the machine's preferred species, which differs between his Mac and the cloud (C §1 S3); (c) no promise, as PyTorch makes none across platforms (C §8 S3); cuBLAS repeats runs only on one GPU type (C §8 S4). Proposal: (a). It costs registers, not arithmetic, on a narrow machine (estimate).

**Size.** 4 to 6 rungs in 1 or 2 batches: the build 1, the vector GEMM 1 or 2, the sums 1, the array functions in the library 1 or 2.

**Risks.**
- At 16 numbers a row is two vectors of `double`, so the gain is below the lane count (JB §5: 1.8 to 3 times for 8 lanes).
- An operation C2 doesn't intrinsify runs in Java, slowly (C §1 S3). Vector `fma` on a CPU without FMA was 135 to 940 times slower (C §1 S11).
- Early sign: a kernel slower than JB §5's Vector API column by a fifth, or any allocation in it.

## 7. Stage 4: batches across cores

**For.** His words: "Our toy is still microGPT, but trained in batches, on multiple cores". One step on one core is not expected to fall far below 75 µs (estimate: JB §5 put vectors in the products only, and M1's rung (b) measures the rest), so per-document cost falls mainly by using the cores. It must bring B documents a step on T threads, with the batch's mean loss and gradient. The check is `MicroGptFlatCheck`'s batch-4 goldens at 1e-12 in `double`.

**Target and its ground.** 3 times stage 3's speed a document on 4 threads, about 25 µs; the estimate is the same. Ground: 4 cores' tasks of over 100 µs each (C §6 S2), less the serial parts, one Adam step of about 11 µs (JB §5), under 1 µs a document at B of 16, and a few joins of 4.2K numbers: about 3.5 times (estimate). 3 leaves room for the shared machine, whose 4-thread runs had less than four CPUs (JB §6), so it's judged against M1's rung (e) on the same machine.

**What the evidence says about the shape.**
- Forks inside each operation lose at these sizes. With the product's grain at 16, a step costs 1.4, 2.5 and 4.8 times the plain step at 1, 2 and 4 threads (F-356). Threads gain only on products from about 128 by 128 (JB §6).
- A fork/join task should do 100 to 10K basic steps (C §6 S1). A parallel stream pays above roughly 100 µs, within a factor of ten (C §6 S2). llama2.java forks per matrix product; at 8 threads its gap to llama2.c is largest on its smallest model, 0.35 times, with no cause given (C §5 S1).
- So the unit of parallel work is a slice of documents that runs the whole step, then one sum of gradients (C §6, its inference).
- The model already batches: `step(p, b)` takes a vector of documents as stacked rows (M:46-51). `run` sets `bsz = 1` (M:82); the banner says "batch 1" (M:81). In scalar Java a batch of 4 costs the same per document as a batch of 1 (JB §5: 407 µs). Batching alone adds rows, not speed.

**What Fortress as designed reaches.** All of it, with no Java kernel. The step is pure; the slices share only `p`, read-only. The gradient sum is a reduction with array `+` as its operator, the generator and reducer pattern of the team (P-175). The arms of a `do … also do` always fork, and a call's arguments fork where the analyzer marks them (F-350). One gap: the range stops its split at 16 elements (`Library/RangeInternals.fss:20`), so a loop over 4 slices runs in sequence (F-350). The split over slices must be written as the library writes its own: halves joined as one call's arguments (`RangeInternals.fss:1326`), or a generator with its own grain (Q500).

**How a step runs under this stage's proposal.**
1. The driver draws B keys, as today (M:88).
2. A library function cuts them into S slices of B/S documents. S follows B, never T, the thread count.
3. It halves the slices recursively, the two halves forked. A leaf runs the model's `step` on its keys.
4. Each join adds two results: the losses, and the 4.2K-number gradients by the library's array `+`, at `RR64`. Each slice's step divides by its own token count, so each result is weighted by its slice's share of the batch's tokens (B Q7).
5. After the last join, one Adam step runs over 4.2K numbers.
- Each slice allocates its own activations. The slices share only `p`, which nothing writes until Adam, so no slice waits on another.
- The tree of joins is fixed by S, so the result doesn't change with T (decision 12 of section 1).
- Size of a slice: at stage 3's 75 µs a document, two documents make a task of about 150 µs, above the rough 100 µs where a parallel stream pays (C §6 S2). So B of 16 gives 8 slices for 4 threads (estimate).

**Builds.**
- Library: the function of steps 2 to 4, in the library's own pattern (P-27).
- Code generator: the analyzer's repair, if its forks are to come from a call's arguments. Today it judges a call by where its function is declared (row 987).
- Model, after his yes: lines 81, 82 and 88 (M:81-88).
- Specification, checker and run time: no change. The fork/join pool and `FORTRESS_THREADS` exist.

**Measures.** µs a document at B of 4, 16 and 64 and T of 1, 2 and 4, against the probe's rungs (e) and (f). NumPy's 83 µs a document at batch 32 (PC §1) is a reference point.

**Waits on.** Stages 1 to 3, since a faster step needs bigger slices to reach 100 µs; the diff (P-87); decision 12 of section 1; the analyzer's answer.

**Decisions.**
- **The shape and the diff. Consequential: model lines (P-87).** Ways: (a) only raise `bsz` (lines 81 and 82) and let the library fork inside each operation at a coarse grain. It changes two lines, but F-356 says it loses until the batch is large; estimate B of 64 or more. (b) Slices that each run the whole step, and a weighted sum. It changes line 88 too. The record has neither; P-29's bar is passed once microGPT runs compiled. Proposal: (b). The probe's rungs (e) and (f) measure both shapes first.
- **The analyzer's repair (row 987, Q501). His, by the row.** Row 987 leaves to him whether the analyzer is repaired before the switch-over; PLAN puts the repair in the first batch after it (PLAN.md:132). Q501 asks whether rung P's three readings stand; its ways are (a) as landed, (b) a group that cancels its arms on a JVM error, (c) the repair before the switch-over. Proposal: (a) now, with the repair in the first batch after the switch-over, as PLAN has it. Stage 4 needs it only for forks by call arguments; written with `do … also do` arms, the slices fork without it.
- **B and T.** B sets the result; T doesn't, under (b) with fixed slices. Proposal: B of 16 in `run`, T from `FORTRESS_THREADS`. The check stays at batch 4.

**Size.** 3 or 4 rungs, 1 batch: the library function 1, the analyzer 1 (row 987), the model diff 1.

**Risks.**
- Forks inside a slice compete with the slices: `rows` splits 64 rows into 4 forks (FA:140-165; JB §6: 7.4 to 14 µs at 4 threads). Early sign: T of 4 below 3 times T of 1 at B of 16.
- The cloud machine's 4 CPUs are shared (JB §6). Time his Mac too (M8).
- Fresh arrays on 4 cores at once may hit memory bandwidth: stage M.

## 8. Stage 5: `float`

**For.** His words: "We can go to lower precision floating point numbers as well: float instead of double as last performance gain." A `float` vector has twice the lanes (C §1 S3, S8), and the parameters take 17 KB, not 33 KB (AW §6). It must bring training in `RR32` storage whose loss curve over 1K steps stays within a measured tolerance of the `double` run.

**Target and its ground.** Java's own gain from `float`, rung (g) against rung (e), applied to stage 4's time: the kernels are the same Java in both. Estimate about 17 µs a document: if the products stay 65 % of the step and run twice as fast, the step is at most 1.5 times faster (1 / (0.35 + 0.65 / 2)).

**Evidence.**
- Scalar `float` gave no gain in two runs (AW §6); the gain is in the lanes (estimate, C §3).
- A 4.2K-term sum can lose up to about 2.5e-4 relative in `RR32`, by the standard worst-case bound (AW §6). The one `float` dot product measured differed by 4e-6 (AW §6). The mixed-precision recipe keeps data narrow and sums wide (C §3 S5).
- The checks' 1e-12 fits only `RR64` (`run-c4/src/MicroGptFlatCheck.fss:16-18`). The reference script makes `float` goldens with `dtype=fp32`, but it is in git history only (AW §6; PC §2).

**What Fortress as designed reaches.** `RR32` is a value object (P-178), a sibling that `RR64` converts from (F-139). P-84 puts its arrays in `float[]`. A numeral rounds once into `RR32` where it stands (P-173, P-172). `SUM[\RR64\]` over `RR32` elements converts each one (B Q4, by reading), and the specification's `Extended[\F\]`, a type wide enough for sums, is future work (`Specification/appendices/future.tex:77-86`). So the width is plain Fortress; only the `float` kernels need Java behind P-58 bindings, as in stage 3.

**Gaps.** No `float[]` store (B Q1). `RR32` has `SQRT` but no `exp` or `log` in the one library (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:41-121`, against `Library/FortressLibrary.fsi:373-374` for `RR64`); row 1092 holds this, filed on 2026-11-20 from B's "Defects".

**Builds.**
- Run time and library: `FortressRR32ArrayStore` and its four helpers, a trait, one line of `NamingCzar`'s table and walk's side, by the `RR64` pattern (B Q6).
- Library: `RR32`'s `exp`, `log` and the rest of `RR64`'s functions (P-27's plainest case).
- Run time: the kernels in `float`. Every sum inside a step stays in `RR32`, in lanes in stage 3's fixed order.
- Library: stage 4's function sums the slices' gradients at `RR64`, written in Fortress, and narrows the result once to `RR32` by `RR64`'s `narrow` (`Library/FortressLibrary.fsi:386`). No model line sees the wide sum, and every rounding is the specification's.
- Checks: `float` goldens from the restored script; tolerances from M4.
- Model, after his yes: the C4 lines that name `RR64` (15 in M) and the vocabulary (77 in FA, 8 in `FlatData.fss`), counted by grep. By reading, lines whose untyped float numerals or `RR64` values meet `RR32` change too, such as the hyperparameters at M:18 and `SQRT (1.0 headDim)` at M:54 and M:61.
- Specification and checker: no change; the checker already converts a numeral into `RR32` (P-173).

**Measures.** M4's loss curve sets the tolerance. Speed against stage 4 and the probe's rung (g).

**Waits on.** Stages 3 and 4; Q37 fork 4; the goldens.

**Decisions.**
- **The width. Consequential: model lines (P-87) and his open fork (Q37).** Ways (AW §6): 5a `RR64` as now; 5b `RR32` throughout; 5c the model generic in its width, every constant a call; 5d a type alias that names the width once, but row 18 and the 2012 restart, which comments aliases out (AW §6), weigh against it (P-26); 5e `RR32` storage with `RR64` sums. A sixth way, `RR64` in the model and `float` inside the kernels, changes no line, but it breaks the specification's rounding of each `RR64` operation (`Specification/basic/operators/opr-overview.tex:179`, `:212`): not proposed. His premise is that language models train at 32 bits at most (AW §6). PyTorch defaults to `float32` (AW §6). The library's own float is `RR64` (`asFloat`). Proposal: 5b in the model and the vocabulary, with no 5e inside a step.
- **5e, read two ways. Consequential either way.** (i) Kernels that sum `RR32` data in `double` and round once depart from the specification's rounding of each `RR32` `+` (`opr-overview.tex:212`). (ii) Library declarations, such as a dot product of two `RR32` vectors that answers `RR64` (AW §6), are seen by the model's types, under P-87: the `DOT` lines M:22, M:25-27, M:29 and M:56, and the sums at M:23 and M:47. The roadmap proposes neither: the only wide sum is the one across slices, in stage 4's own function.
- **P-9 and the APL program. Consequential: it bends P-9.** P-9 has each line of the APL program expand into the line that C4 writes by hand. With C4 at `RR32` and the APL program at `RR64` under walk, they no longer match; P-10 says nothing of the width. Ways: (a) both programs move to `RR32`, in one diff; (b) P-9 bends, and the APL program stays at `RR64`. Proposal: (a), so that P-9 holds.
- **A `double` copy of the parameters.** The recipe for 16-bit training keeps one (C §3 S5). At 32 bits, Adam's steps are of the order of the learning rate, 0.01 (M:18), far above `float`'s unit roundoff, 6e-8 (AW §6), so few of them round away (estimate). Proposal: none, unless M4 shows drift.

**Size.** 6 or 7 rungs in 1 or 2 batches: the store 1, the functions 1, the kernels 1 or 2, the goldens and checks 1, the model diffs 1 or 2.

**Risks.** Softmax over 27 logits, the norms and the weights' gradients, which sum B·16 rows in `float`, lose digits. At B of 64 that's 1K terms, a worst-case bound of about 6e-5 relative by AW §6's method (estimate). Early sign: M4's `float` curve leaves the `double` curve by more than 1e-3 relative in the first 100 steps. The mask's `-(10.0^10)` and Adam's `10.0^(-8)` fit `float`'s range.

## 9. Stage 6: after JDK 25, and Valhalla

**For.** His words: "We should try to go as far as possible on JVM 25, but after that we should also consider if we can go to Valhalla for values, vectors and all that could help us make this a real HPC contender." It must bring what later JDKs give for free, and the tree ready for value classes.

**What later JDKs add.**
- JDK 26 (March 2026): run-time alias checks let C2 vectorise `c[ci+j] += a*b[bi+j]`, the shape it refused in JB §5 (C §2 S2, S10). Loops over `MemorySegment` got much faster (C §9 S9, S10). Float sums still keep their order (C §2 S6).
- JDK 27 (September 2026): the Vector API's twelfth incubation, no API change (C §1 S3).
- JDK 28 (March 2027): value objects in preview, JEP 401 (C §4 S1), and `Float16Vector`, by inference, since it was merged after JDK 27's fork (C §1 S7).
- Later, no date: null-restricted types and loose flat arrays (C §4 S3); generic specialisation (C §4 S2); the Vector API as value classes, then out of incubation (C §1 S3).

**What Valhalla gives this design.**
- A value class has no identity. The JVM may keep its objects in registers, in locals, arguments and returns, with no size limit: scalarization (C §4 S1). If the number boxes, the payload classes of F-388, become value classes, the boxes that decision B misses in generic code and across calls C2 doesn't inline go away (F-301, F-302). That does part of what the team's unboxing plan listed (`Unbox.java`, F-18), done by the JVM.
- Flat arrays of value objects stay limited: a mutable element must fit 64 bits with its null flag, the bit that marks null (C §4 S1). An `RR32` box may flatten; an `RR64` box probably doesn't until null-restricted types (estimate from C §4 S1, S3). So P-84's primitive arrays stay.
- The vectors stop being boxes at risk (C §1 S3).
- Half precision: `Float16Vector` in JDK 28 (C §1 S7). A trial build ran 40 times slower than `float` (C §3 S3). At 4.2K parameters it buys nothing; re-measure only for a larger model.

**What Fortress as designed reaches.** A `value object` is a primitive value with immutable fields (`Specification/basic/objects.tex:370-378`), which is what a value class is. So no language change: the compiler and the class loader emit value classes for value objects. No Java kernel is needed for this stage.

**An open question in the tree.** Generated and stamped classes are class-file version 1.6 (`ProjectFortress/src/com/sun/fortress/runtimeSystem/InstantiatingClassloader.java:78`), and why is open. B and `fortress-repo`'s `compiler.md:72` say that the loader's rewriting keeps no stack-map frames, the type tables that the JVM's verifier reads, but the loader writes with ASM's `COMPUTE_FRAMES` (`:479`, and its other writers). Value classes need the current version with preview, which would also give generated code `invokedynamic` (TW, Way 5). M9 answers the question first. F-388's shape, an object class over an abstract payload class, fits JEP 401 if the payload class is an abstract value class (C §4 S1).

**Builds.** The class loader and the code generator emit a current class-file version, with whatever M9 shows missing. The payload classes and the number objects become value classes under `--enable-preview`. The vector code moves to the promoted package when there is one.

**Measures.** M7 first: JB §5's shapes on JDK 26 and 27, to see which kernels C2 now makes needless. On JDK 28's early-access builds: JFR allocation in a generic loop over `RR64` with and without value classes. No speed target; the measure is fewer boxes and fewer Java kernels.

**Waits on.** M9; JDK 28's release, 2027-03-09 (C §1 S5).

**Decisions.**
- **The JDK. Consequential: the toolchain, and preview features tie class files to one release.** Ways: (a) stay on JDK 25, the long-term release, and probe later ones; (b) move to 26 or 27 for C2's gains; (c) build on JDK 28's preview. Proposal: (a) through stage 5 with M7's probe, then (c) on a branch, landed only if a probe shows boxes gone. One secondary source doubts that value classes leave preview by JDK 29 (C §4 S5, unverified).

**Size.** 4 to 8 rungs in 2 or 3 batches: the class-file version 1 to 4, by M9; value classes 2 or 3; the package 1.

**Risks.** Preview features change between releases. Flattening and scalarization are the JVM's choice (C §4 S1). Early sign: on JDK 28 early access, no drop in allocation.

## 10. Stage M: memory reuse, only if measured

**For.** His words: "I am also willing to go the way of LMAX Disruptor and Agrona with custom memory management if that will prove to be a performance bottleneck." It's built only if M2 shows fresh arrays and GC over a fifth of a step at stage 4.

**Evidence.** The model is pure: every operation returns a new array, and `adam` three new vectors (C4P §1). The Java baseline reuses its arrays; the saving isn't measured (JB §3, decision 3). Estimate: a step makes about 100 arrays, some hundreds of KB a document. At 25 µs a document on 4 cores that is over 10 GB/s of fresh memory, near a machine's bandwidth.

**Ways.**
- (a) The garbage collector as it is, tuned; no code.
- (b) The library's own temporaries, made and dropped inside one library function, come from a pool per thread. It's safe because the library knows they die.
- (c) The compiler reuses an array in place where its last use makes the next one. Large; nothing in the tree knows lifetimes.
- (d) Off-heap memory: Agrona's buffers go through the JDK's internal `Unsafe`, with `java.base` opened at every run (C §9 S4); the public `Unsafe`'s memory access is deprecated for removal (C §9 S5, S6). FFM's `MemorySegment` is supported but loops on it were slower than arrays on JDK 25 (C §9 S8, S9).
- From the Disruptor, its discipline only: allocate once, one writer per region, pad each thread's buffers apart (C §9).

Proposal: (a), then (b), then (c); not (d). **Consequential if built: microGPT's speed.** Size: none, 2 to 4 rungs for (b), more for (c).

## 11. The measurements that come first

The batch holds the machine now. Each runs after it lands, one at a time, at low load, with configurations interleaved in each fork, as JB §4 does. A worker writes each program; nothing here is written yet unless named. Each is a probe, which the coordinator launches without a go (coordinator skill, "The curator's role and decisions").

- **M1, the ceiling ladder.** The JVM's own best on this model. Program: a new variant, `java-baseline/variants/ceiling/`, the baseline's model with switches. Command: a new case, `java-baseline/run.sh ceiling 5`, with `--add-modules jdk.incubator.vector`. Rungs: (a) the scalar baseline (F-355); (b) the Vector API in every kernel, the products, sums, softmax with vector `exp`, the norms and Adam, `double`, batch 1, one thread; (c) (b) with FMA; (d) batch 16, one thread; (e) batch 16 on 4 threads in slices; (f) the same with forks inside each operation; (g) (b) and (e) in `float`, with the sum across slices in `double`. It decides each stage's target, whether FMA is worth its decision, and whether `float` pays.
- **M1 and Q524. Consequential: it reads P-7 anew.** Q524 asks whether P-7's baseline is the scalar program or the fastest Java that keeps the checks. P-7 calls the baseline "the optimal result, the one to aim at". Rungs (a) and (b) keep the checks in `double`, as JB §5's variant did, and (c) is expected to (estimate): (b) or (c) is Q524's other way, measured. Rungs (d) to (g) change the arithmetic, so they lie beyond Q524: the HPC ceiling. His request of 15:3x asks for SIMD, batches and `float`, and no entry holds it. Any target below the scalar program changes P-7's last sentence, whichever way Q524 goes. Proposal: the scalar program stays the ratio's base, and P-7's last sentence names the ladder as the result to aim at: rung (b) for stage 3, rungs (e) to (g) for stages 4 and 5. It goes to him with Q524, in P-7's words.
- **M2, allocation.** Program: a variant that makes a new array for each operation, as the Fortress does, against the baseline's reuse (JB §3, decision 3); batches 1 and 16, threads 1 and 4. Command: a new case of `java-baseline/run.sh`, run as `steps` runs, with `-Xlog:gc` and a JFR recording of bytes allocated a step. It decides whether stage M is needed.
- **M3, the parallel shape.** Rungs (e) against (f) at batches 4, 16 and 64. It decides stage 4's way, and the model diff.
- **M4, `float` numerics.** Program: the reference script restored from git, run with `dtype=fp32` and with `fp64` for 1K steps, beside M1's `float` variant. It decides stage 5's goldens and tolerance.
- **M5, the profile of the first compiled loop.** PR §7.4's profile in F-352's scratch tree, which is gone and is rebuilt from its patch (`compile-ladder/plan-31/probes/switch-rehearsal.patch`, against `832f7d0d91`), by JFR: the store's checks, the cast, the range's closure and the accumulator. It needs a build. It decides stage 1's order.
- **M6, the checks' ways.** `perf-probes/transactions/run.sh` for Way 3, Way 2b and four threads, which TW §5 says can run now on the prelude. It decides stage 1's check rungs.
- **M7, later JDKs.** `java-baseline/run.sh asm` and `axpy` on JDK 26 and 27. If their hosts are blocked, it's parked. It decides how many kernels stay in Java.
- **M8, his Mac.** `run.sh bench`, `kernels`, `variants` and M1 on Apple Silicon. Parked for his machine (`.claude/skills/coordinator/references/road.md`): NEON's lanes and `float`'s gain there.
- **M9, the class-file version.** Program: a scratch tree with `JVM_BYTECODE_VERSION` (`InstantiatingClassloader.java:78`) raised to JDK 25's version, and `javap -v` on stamped classes to see their frames. Command: the compiled tests of `compiler_tests/` through the harness, with the JVM's verifier on. It needs a build. It decides why the version stays at 1.6, the size of stage 6's first part, and whether `compiler.md:72` needs a fix.

## 12. Against PLAN and the review queue

PLAN numbers its items per section; the file line follows in parentheses.

**PLAN phase 6, item by item.**
- Item 1 (PLAN.md:124), decision B: stage 1. Item 2 (:125), the checks and the primer: stage 1, M6. Items 3 and 4 (:126, :127), the casts and the instance rule: measured in stage 1.
- Item 5 (:128), the timing against the baseline, Q524, then compiled parallelism: M1 and stage 4. It would change: the targets become the ladder's rungs, and the parallelism becomes slices of documents.
- Item 6 (:129), the first compiled timing's profile: M5. Item 7 (:130), the class-file read: stage 1.
- Item 8 (:131), the library's splits and Q523: stage 1. It would change: for unboxed stores the kernel replaces the split, so the product's grain matters for other element types only.
- Item 9 (:132), parallel reductions, Q500, rows 982 and 987, Q501: stage 1 for the grain, stage 4 for the analyzer.
- Item 10 (:133), the answers needed: it would add Q500, Q501, row 987, Q509, Q523, Q524 and the new asks of section 1.

**Phase 5 and the rest.**
- Phase 5, item 2 (:110), the array design: P-85's three questions, decision A with the unboxed store, and the element width. Decision A and the store stay there, by P-33's order, and stage 1 stands on them. Only the width would move, to stage 5, by his words; the store's design still plans `float[]` (P-84).
- Phase 6 gains stages 2 to 6 and M, an item each, and M1 to M9 ahead of them. "Off the path, parked" gains M8 and stage 6's preview work.

**Open items and rows it touches.**
- Q22 and Q205 (stage 1; every probe here is shaped like microGPT's kernels, as Q205 asks); Q37 and Q320 (phase 5, stage 5); Q229 and Q230 (before the switch-over, by P-85); Q362 (stage 1's closures); Q500, Q501, Q509 and Q523 (phase 5, stages 1 and 4); Q524 (M1, with P-7). Q510, strong atomicity, isn't needed by microGPT.
- Rows 18, 37, 305, 306, 641, 948, 953, 982, 987 and 1092. One row to file: `mul` has no grain (B, "Defects").

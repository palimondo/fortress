<!-- A reminder for the curator, 2026-11-10, of what is on file about arrays, matrix computation and parallel splitting; read only, nothing run. -->

# Arrays, matrix products and parallel splitting: what is on file

Paths are under `explorations/` unless they start with `Library/`, `Specification/`, `ProjectFortress/` or `research/`. `FL.fss` is `Library/FortressLibrary.fss`. `RI.fss` is `Library/RangeInternals.fss`.

## 1. What the sizes in the types buy

A `nat` is a size that a type carries. A case (`FL.fss:3192-3193`):

    opr DOT[\T extends { Number, MultiplicativeRing[\T\] }, nat n, nat m\]
           (me: Matrix[\T,n,m\], v: Vector[\T,m\]): Vector[\T,n\] = me.rmul(v)

The one `m` ties the matrix's columns to the vector's length. A 27 by 16 matrix times a 16-vector checks. Times a 27-vector, the compile stops.

**Measured** (`perf-probes/nat/size-cost.md`, "The answers" and section 5):

- The checker refuses a wrong size once, at the call site, at compile time. A call that the checker resolved tests no size when it runs.
- A call chosen at run time by size costs 4 to 20 ns more than a resolved one.
- Inside a class made for size 8, the size is the constant 8 in the bytecode. A loop bounded by that constant was not measurably faster than a loop bounded by the store's length read at run time.
- "Nothing today builds an optimisation on a size."
- The measured cost is boxing, a number kept as an object: in Java models of microGPT's kernels, 6.3 times (dot product), 6.5 times (matrix product) and 2.6 times (row lift) over a `double[]` (F-11). That gain comes from the store, not from the sizes.

**Only expected:**

- That the JIT drops bounds checks because the size is a constant. No JIT log was taken (`size-cost.md`, section 6).
- That a class made for one size picks its own loop. Nothing on file; my reading.

- Decided: sizes are checked (P-40), and compared by their written form (P-55).
- Open: any speed-up built on a size.
- Written: F-67, F-129, F-146; `perf-probes/nat/size-cost.md`.

## 2. The array design

**Decided:**

- Unboxed doubles and arrays of them are required (P-17). Every number type's array is stored in a Java array of its primitive type, `RR64` in a `double[]` first, and the arrays keep the `nat` sizes in their types. Store and sizes are one design. "Store first, sizes later" was rejected (P-84).
- The model's text is the notation; a change of a model line is shown as a diff first (P-87).
- The model's diagonal matrix keeps its own product, and a read-only matrix trait is wanted (P-88).
- A compiled `double[]` store class exists; no factory chooses it yet (P-169, F-333).
- The array design's three questions are open, with no default, and return after the switch-over with decisions A, B and D. The preparation is done before (P-85).

**Open:**

- The three questions (P-85): how the factory chooses the store of each element type; whether the store keeps the size as a field too; whether a factory for a size known only at run time returns the unsized `Array[\E,I\]`.
- Decision A, what puts the `double[]` under the generic traits. Five ways are on file (`reviews/array-design-ways.md`, section 3; "item" below is a review-queue item). A1, a `typecase` in the factory, ran on both paths in probes (F-159). A4, the class loader gives an `RR64` instance a `double[]` field, is the team's direction. It is unbuilt and unmeasured (F-18). You leaned to it on 2026-09-20; no entry holds that (item 320).
- Decision B, where unboxed arithmetic happens (PLAN, phase 6).
- Decision D, the sizes in the model's own types. The diff is written and parked: 21 model lines out, 29 in (`reviews/decision-d-diff.md`).
- The element width, `RR64` or `RR32` (item 37).
- The bound of `Vector` and `Matrix` (item 31) and a size known only at run time (item 30), both built at their defaults (F-151, F-270).
- What "the whole preparation" covers (item 230).

**The order** (PLAN, phases 4 to 6, and item 13):

1. The switch-over. All array work itself waits for it.
2. Phase 5, microGPT compiles: the model's sized types (D), the array design (the three questions, the width, A), the code generator's gaps.
3. Phase 6, microGPT fast: unboxed arithmetic (B), the transaction checks, timing against a pure-Java microGPT, compiled parallelism.

Also waiting: your stress test of `CC64` in `Vector` and `Matrix`, and the grain's measured value (section 4).

- Written: `coordinator/PLAN.md:93-121`, `:179-184`; `coordinator/review-queue.md`.

## 3. How the library multiplies today

**A matrix times a vector.** On 2 by 2: `[1 2; 3 4]` times `(5, 6)` is `(1·5 + 2·6, 3·5 + 4·6) = (17, 39)`. Each result element is one row's dot product. The library (`FL.fss:3103-3107`):

    rmul(v: Vector[\T,s1\]): Vector[\T,s0\] = do
        row(i:ZZ32):T =
            SUM[\T\][(j,v_j)<-v.indexValuePairs] get(i,j) v_j
        vector[\T,s0\]().tabulate(row)
      end

`tabulate` is a parallel `for` over the rows (`FL.fss:2706-2709`). Each row is a `SUM`, a reduction: it joins partial sums. Both run on the parallel range (`RI.fss:1757`).

**How that range forks** (`RI.fss:1313-1345`). It halves at a power-of-two boundary. A `for` runs the halves as `do … also do … end`, two blocks that may run at once. A reduction joins them as two arguments:

    red.join(loop'(lo,mid-1),loop'(mid,hi))

Since climb batch 30, a piece of at most 16 elements runs in sequence. A matrix's index range is two such ranges crossed (`RI.fss:1135`).

**A matrix times a matrix.** `mul` (`FL.fss:3044-3102`) is recursive. Its local `mm(a,i,b,j,c,k)` handles a block of `i` rows, `j` inner indices and `k` columns. It halves the largest of the three (`partition`, `FL.fss:2507`). Halving rows or columns forks with `do … also do`. Halving the inner index runs in sequence, because both halves add into the same result elements. The team's comment: "If this were atomic, we could parallelize j-partition" (`FL.fss:3050`; also `:3178-3180`). It goes down to one product of two elements. It calls no range, so the grain of 16 does not reach it (my reading).

**What forks.** Under walk each `also` block is a task. Compiled, the first block runs in place, and each other forks only where the pool judges it worth it (F-19). A call's arguments fork on the compiled path too, so a reduction's halves run in parallel (P-175).

**Subarrays.** The library has them: `subarray[\nat b, nat s, nat o\](m)` gives a view of the same store (`FL.fss:2573`, `:2631`, `:2911`), and `a[i, :]` a row view (F-264). It splits no work with them, only index ranges.

**The specification** names two devices. Neither is built.

- Matrix unpasting: `[lefttop; leftbottom] = left` binds the parts of a matrix. Its motivating example is this same product: "break the input apart on its largest dimension, and recursively attack the resulting smaller and more compact problems" (`Specification/basic/matrix-unpasting.tex:52-56`). Not built on either path (ledger row 108). The library's `mul` is that plan written with indices.
- Distributions: a `Distribution` "organizes its indices into the leaves of a tree whose inner nodes correspond to potential levels of parallelism and locality" (`Specification/advanced/parallelism-locality/distributions.tex:37-41`). The list holds `Par` (chunks of 1) and `Blocked(n)` (n chunks) (`:72-83`). The library declares none.

**The papers** are on types and dispatch; none treats parallel matrix computation (grep).

**Research on multiplication algorithms: none on file.** INDEX has no line that holds "Strassen", "cache-oblivious", "multiplication" or "distribution". The one note near it is `c4-parallelism.md`, on where the flat program splits into tasks.

- Decided: forked arguments and a grain (P-175); the diagonal's own product (P-88).
- Open: algorithms, unpasting and distributions. No decision exists.
- Written: `reviews/parallelism-foundations-2026-11-08.md`, sections 1.8 and 6.

## 4. The grain size

The grain size is the number of elements at which a parallel range stops splitting and runs the rest in sequence.

**What the team's texts say.**

- The specification's own example carries the number as a parameter `b` of the generator (`SpecData/examples/advanced/Generators.GeneratorDefn.fss:19-39`):

      object BlockedRange(lo: ZZ32, hi: ZZ32, b: ZZ32) extends Generator[\ZZ32\]
        ...
          if size <= (b MAX 1) then
            (* Blocks smaller than b run sequentially *)

  Its text: "the library programmer is free to choose the amount of parallelism that is actually exposed" (`Specification/advanced/parallelism-locality/defining-generators.tex:70-88`). It gives no value.
- An array's default distribution "depends on the size of the array, and on the size and locality characteristics of the machine" (`arrays-distributed.tex:23-26`).
- Steele, slide "The Fully Engineered Story": "use sequential techniques near the leaves; arrays at the leaves; decide dynamically whether to process sequentially or by parallel subdivision" (`research/extracts/SteeleFourSolutions2015-code-extract.md:259-264`; `SteeleICFP2009-extract.md:961-963`).
- The papers: nothing (grep).

**The ways to choose the number.** MicroGPT's cases are by reading the split, not run.

1. **Fixed in the library.** Built: `private grainSize: ZZ32 = 16` (`RI.fss:20`). Needs nothing. A 16-vector's dot product runs as one piece. 16 rows: one piece. 27 rows: two, of 16 and 11. 64 rows: four of 16. The 4192 parameters: 262 pieces.
2. **A setting read at start,** as the compiler's prelude reads `FORTRESS_LOOP_CHUNK`, 1 by default (`Library/CompilerLibrary.fss:357-359`). Needs one native binding in the one library; the helper exists (`nativeHelpers/runtime.java:26`). Same pieces as way 1, and the measurement can vary the value without a rebuild.
3. **A parameter of the generator,** as `BlockedRange`'s `b`. Needs a new generator in the library and a model line that names it, so a diff for you (P-87).
4. **Computed when the loop starts,** from the size and the thread count. Needs a binding of the thread count; the helper exists (`runtime.java:27`). A 16-vector at four threads would get pieces of 1 to 4, so it needs a floor. Float sums then differ in their last bits between thread counts; today the join order depends only on the range.
5. **Computed from the size in the type.** Needs the model's sized types (decision D). Nothing on file; my reading.
6. **Adapted while the loop runs.** The compiled pool already does this for forks: a block forks only while the thread's surplus of queued tasks is at most 5 (`runtimeSystem/BaseTask.java:133-162`). This chooses "fork or run in place". The range still splits, and each split builds a task object (the review, section 6). To stop the split itself needs a binding of the surplus count. The sums keep their join order.

**The peers, as context, from general knowledge and not from this repository.** Java's parallel streams compute the piece from the size and the thread count at start (way 4). Java's fork/join documentation advises tasks of about 100 to 10K basic steps and offers the surplus count (way 6). A 16-element dot product is about 16 multiply-adds: every peer runs it in sequence.

- Decided: the parallel range stops at a grain size, not at single elements; "you need the right forking constants" (P-175). The coordinator took 16, built now, as a default to name to you. It can be undone (`coordinator/CLIMB-BATCH-30.md`, fork G).
- Measured, under walk: both microGPT quick checks stay 7 of 7; the losses move by at most 4.4e-16 against a tolerance of 1e-12 (`compile-ladder/plan-30/PROBES.md`, section 2).
- Open: the value, measured on compiled reductions at one and four threads after the switch-over; which way; the ranges with a stride (`RI.fss:1498-1585`) and `mul`, which still split to single elements.
- Written: `compile-ladder/rung-forked-arguments/REPORT.md`; F-19. P-175's text still says "splits down to single elements": stale since batch 30 (that report, `:143`).

# What the record holds on making compiled microGPT fast

Read only, at `main` `a62e1e30e6` (2026-11-20). This file reports evidence and makes no recommendation. Paths are under `explorations/` unless they start with `Library/` or `ProjectFortress/`; Java is under `ProjectFortress/src/com/sun/fortress/`. Short names: **JB** `java-baseline/REPORT.md`, **PC** `java-baseline/python-comparison.md`, **K** `perf-probes/kernels/REPORT.md`, **HC** `perf-probes/helper-calls/REPORT.md`, **TX** `perf-probes/transactions/REPORT.md`, **NC** `perf-probes/nan-check-cost/REPORT.md`, **BX** `perf-probes/boxing/REPORT.md`, **C4P** `c4-parallelism.md`, **AUD** `c4-parallelism/audit.md`, **PF** `reviews/parallelism-foundations-2026-11-08.md`, **TW** `reviews/transaction-checks-ways-2026-11-17.md`, **AD** `coordinator/array-design.md`, **AW** `reviews/array-design-ways.md`, **AR** `reviews/arrays-reminder-2026-11-10.md`, **PR** `reviews/plan-review-2026-11-10.md`, **RM** `performance-roadmap.md`, **BO** `backend-options.md`. "Q n" is review-queue item n; "row n" is a gap-ledger row. All timings come from the shared 4-CPU cloud Xeon (AVX-512, 2.1 to 2.3 GHz) on OpenJDK 25, unless a line says otherwise.

**The headline state.** No microGPT kernel runs compiled. microGPT's 18 components stop at name resolution until the switch-over (F-97). The only compiled array program ran in a scratch tree with 12 hacks (F-352). Climb batch 34, planned and not launched, aims at the first program run against the one library (`coordinator/CLIMB-BATCH-34.md`, header).

## 1. Boxing and unboxed storage

**Measured**
- Java models of microGPT's kernels at its sizes: boxing costs 6.3× on a 4,192-element dot product, 6.5× on a 16×16 product and 2.6× on the `rmsn` row lift, against `double[]`. The generic array object (`Object[]` behind an interface, a `checkcast` per read) adds 9 %, 1.6 % and 4.8 %. Medians of 3 fresh JVMs, 2026-09-15 (K §2; row 306; F-11).
- In a scalar loop, boxing is at most 4.5 % of a 156× gap, because escape analysis removes the boxes. The fair loop `bench1r` runs compiled at 9.7× primitive Java, 0.4207 s against 0.0434 s, median of 3 (K §1, §4; BX §1: 2 % of the gap).
- An unboxed store read through a boxing accessor buys nothing. The dot product is 8.9× primitive with it, against 6.4× for boxed storage; the matrix product is 6.6× against 6.2× (AW §3, citing `reviews/array-design-review.md`, Serious 4).
- A native helper is called through a wrapper that C2 inlines whole. One box per assignment to a mutable variable per iteration remains: 16 B for a `ZZ32`, 24 B for an `RR64`. Seen once, by JFR bytes and not by timing, while the number types were still traits (F-301; HC §3-4). C2 inlines to depth 12 of 16. With the limit lowered to 8, a loop rose from 33 to 96 B an iteration. The depth of the value-object form is not measured (F-302).
- The first compiled array loop is about 100× slower than Java, and boxing explains 6 to 7× of that. One run each, in different sessions (F-358).

**Decided**
- P-17: unboxed doubles and arrays of them are required. P-84: every number type's array is unboxed, in its Java primitive array, `double[]` first, with the `nat` sizes kept in the types. On 2026-11-08 he said: "All numerical code in HPC settings must eventually run unboxed in the compiled path" (`coordinator/POSITIONS-history.md:3682`).
- P-178: each built-in number type is one `value object`, so that compiled code can hold a bare `int`, `long` or `double`. This is built in both libraries (F-379, F-388).
- Q205, at its default: boxing is measured on kernels shaped like microGPT's. He was never asked about that rule.

**Open**
- Decision B, unboxed arithmetic chosen by static type (PLAN.md:124). I found no note given to it. Its fragments: AD §4(b) (`daload`, `D` slots, `dadd`), and HC §6, which finds that the helpers' signatures `(DD)D` are already unboxed, so the generator could call them directly.
- The team's three traces, all unbuilt: `compiler/optimization/Unbox.java:21-27`, unreferenced; the loader's stub `runtimeSystem/InstantiatingClassloader.java:168-172`; an unboxing pass commented out in `asmbytecodeoptimizer`, which no phase runs (HC §6).
- A mutable cell holds a boxed `Any` (F-117). So an unboxed accumulator needs a JVM local slot (TW, Way 2b).

## 2. The arrays' store and its design

**Measured and read in the tree**
- The compiled store `FortressArrayStore` is an `Object[]`. Every `get` and `put` reads the current thread and its transaction, uses a volatile `VarHandle` access, and null-checks on a read (`compiler/runtimeValues/FortressArrayStore.java:35-57`; F-333).
- `FortressRR64ArrayStore` is a `double[]` with `get` and `init` only, and no `put`, so it can back only an immutable array. No factory chooses it (`FortressRR64ArrayStore.java:9-29`; P-169).
- Decision A's probes, on the probes' own one-method trait, not the library's arrays (F-159; AW §3):
  - A1, the witness `typecase` with `cast`, checks and runs on both paths, also with sizes.
  - A2, a plain factory beside the generic one, compiles and dispatches; walk refuses the pair.
  - A4, the loader stamping a `double[]` class, the team's direction, is unbuilt and unmeasured (F-18).
- Sizes cost nothing in a hot loop. A loop bounded by a constant size was no faster than one bounded by the length read at run time. A call dispatched on a size costs 4 to 20 ns more. The loop measured about 31 ns an element (F-40; `perf-probes/nat/size-cost.md`). That the JIT drops bounds checks because of a size is expected; no JIT log was taken (AR §1).
- A native helper cannot take a Java array: the wrapper generator skips such methods (F-106, F-183). The store pattern of P-169 gets around this by holding a Java class in a field.

**Decided**
- P-84 (above); P-85 (the three questions open with no default, back after the switch-over with A, B and D, the preparation done before); P-169 (the `Object[]` store, tracked by array and index); P-40 (a JVM array over 2^31-1 refused at run time); P-88 (`Diag` keeps its product; a read-only matrix trait wanted); P-27.

**Open**
- Q37, forks 4 to 6: the element width, decision D, and decision A with its ways A1 to A5 (AW §8; PLAN items 13.4-13.6).
- Q320: whether his words of 2026-09-20 ("specializing in the class loader is the team's direction ... I would try to pursue the team's direction") decide decision A.
- Q229 and Q230: what "the whole prep" covers.
- Q509 (D1): does an unboxed store take part in a transaction? The ways are (a) stay outside, (b) a `TXReadDouble` slot API compared by raw bits, or (c) one check per bulk operation (PF, "Questions"; row 953).
- PF §5, by reading: the store's volatile access is stronger than the specification needs, and opaque mode would do. This "matters for P-84's `double[]` store".
- AD §4(b) records a second route: whole-array Java natives, the APL shape. The note marks it "not the team's precedent".

## 3. The transaction checks around mutable variables

**Measured**
- Row 641 (NEGATIVE-BOUNDED), from TX §1: medians of 15 pairs, third loop, one thread, at `8f0bc7389`, agreeing with two earlier sessions.
  - TxArray: 23.17 ns against 8.39 ns an element. That is 64 %, at 7 checks an element.
  - TxScalar: 20.42 ns against 18.67 ns, 9 % (9 to 15 % across three sessions). TxCell: 16 %.
  - About 1 to 2 ns per check.
  - Not measured: four threads, code inside `atomic`, a `var` field, microGPT, and removing the checks at compile time (TX §5).
- Before row 302's fix, the eagerly built debug string was 88.9 % of `bench1h` (K §3). The row is fixed (`53362cb88`).
- The compiled STM: an uncontended block costs about 210 ns, against 15 ns for a plain update. A contended counter is slower at four threads than at one. Private work speeds up 2.0 to 2.7× on four workers (PF §3.3).
- Neither model program writes `atomic`, `spawn` or `also`, and no run opens a transaction (AUD §0; PF §6).
- By reading (TW §3), the library's sequential leaf `generate` has two uncaptured mutable locals. They cost 6 checks an element, and 4 in `loop`'s leaf, before the store's own check on each element read.

**Decided**
- No decision covers the checks.
- The curator has said he has no knowledge of software transactional memory and finds its decisions hard to judge, so the role of STM is to be described to him before the checks change (PLAN.md:125; `coordinator/curator-profile/evidence.md:293`).
- P-125: the suites run at four threads. P-7: the revival does not redesign the language, so TW's Way 9 is out.

**Open**
- PLAN phase 6, line 2: what the specification's `atomic` requires of a variable that no transaction can reach.
- TW §6, the reviewer's order, not a decision: Way 2 (no check on uncaptured locals, one rung, clears TxArray's); Way 2b with decision B; D2 before Way 3 (one check per call); Ways 4 to 6 held (two versions of each method, a `SwitchPoint`, whole-program analysis). TW §5: Way 3, Way 2b and four threads can be measured now on the prelude, and are not.
- Q510 (D2, row 948): the compiled path is weakly atomic. Row 984 is the same question for a nested block.
- Three library blocks exist: `FileSupport.fss:152`, `Lazy.fss:60` and `OneShotFlag.fss:18` (TW, Way 5). Whether microGPT reaches any of them is not traced.

## 4. Dispatch, casts and helper calls

**Measured**
- In the `bench1h` profile, closure and trait dispatch is 0.8 %, integer index boxing 2.3 % and the generator 6.3 % (K §3).
- The dispatcher, the interface call and the springboard are free once inlined, but they spend 4 to 5 of the 16 inline frames (HC §6).
- A diagonal pushed through the general product costs 13 to 54× a row scaling (row 299).

**Decided**
- P-58: every native binding is a `builtinPrimitive` naming a static helper. HC §6 finds that the form needs no change for phase 6.
- P-48: the compiled dispatcher is to receive the static return type (phase 5).

**Open**
- PLAN phase 6, unmeasured: F-264's casts (a type test per operation), the instance rule's cost, F-385's uncached class-file read per call site.
- Q22: `Number`'s catch-all `=` takes a compiled `i = 0`. Its "fast shape" is phase 6's question.
- Q362: a local function compiled as a closure or as a static method.
- Generated code has no `invokedynamic` (TW, Way 5). RM's A3 (static resolution) and A4 (inline caches) were never taken up as decisions.

## 5. The parallel shape, grains and fork/join

**Measured**
- F-356 and JB §6: a Java model of the step in the library's fork/join shape, 5 forks per configuration, load 2.1 to 4.5.
  - At the library's grains (16 for a range, 1 for the product), a step costs 19 to 32× the plain step at one thread, 55× at two and 80× at four.
  - With the product's grain at 16, it costs 1.4×, 2.5× and 4.8×.
  - Threads begin to gain on a product of about 128×128 with blocks of 64: 1.9× at 256 and 2.6× at 512 on four threads. A dot product gains only from about 262,000 elements with a grain of 1,024.
  - Adam's 4,192 elements at grain 16 are 262 pieces: 2.3× the plain loop at one thread, since the pieces are too short for the vector loop.
- Under walk at four threads (orientation only, P-29): steady state 2.58× faster; splitting the model's tuples 9.6 % faster (C4P §7, "Measured").
- The model's widths are 16, 16, 4 and 4, so a reduction over one of its vectors forks nothing (F-350, by reading; Q500).

**Decided**
- P-175: a call's arguments fork where `ParallelismAnalyzer` judges them worth a task, and the range stops its split at a grain. Built: `grainSize = 16` (`Library/RangeInternals.fss:20`).
- F-350: every forked arm joins before a group completes abruptly.

**Open**
- Q500: the grain's value, to be measured on compiled reductions at one and four threads.
- Q523: whether `mul` gets a grain now or with the first compiled kernel. The plan review recommends the second (PR §6.1 C).
- Q501, and row 987 (CONTESTED): the analyzer counts a call by its function's declaration order. Row 982: the prelude's reductions run in sequence until the switch-over.
- Strided ranges still split down to one element (AR §4).
- `mul`'s contraction axis runs in sequence by the team's choice: "If this were atomic, we could parallelize j-partition" (`Library/FortressLibrary.fss:3135`). C4P §9 notes that a reduction would parallelize it; this is not measured.
- Regions and locality are all `Global` (C4P §9).

## 6. SIMD and vectorization

**Measured** (JB §5: machine code read as hex through `objdump`, without hsdis; timings with superword on and off)
- C2 vectorises none of the matrix products. `out[ro+j] += s*w[rw+j]`, two offsets into one array, stays scalar: C2 does not prove the ranges disjoint. Over two arrays at one index it vectorises, but pays only on long rows (0.42 against 0.71 ns an element at 16; 0.13 against 0.39 at 256). The dot product is half vectorised (packed multiplies, scalar adds) and faster with superword off. Adam's loop is vectorised, 8 doubles (zmm): 10.8 against 20.7 µs.
- The Vector API in the four products takes the step from 101.4 to 75.5 µs. A product alone runs 1.8 to 3× faster; a row of 16 is only two vectors. The variant passes every check.
- The products are about 65 % of the step and the softmaxes about 10 %. No fused multiply-add is used anywhere: that was a choice (JB §3).
- A NaN test costs 15 to 20 % on unboxed `double[]`, and about 40 % on arrays held in cache. C2 vectorised none of the compare-and-count loops (NC, "unboxed doubles").
- That integer overflow checks block SuperWord is read off HotSpot's documentation, not measured (RM, "Corrections").

**Decided**
- P-159: no NaN test in the comparisons. Its own text leaves open whether a test would stop vectorisation.
- Nothing is decided on the Vector API, SIMD or FMA.

**Open**
- Q524: is the baseline the scalar program, or "the fastest Java that keeps the checks"? The second "moves the target by a quarter or more".
- JB §5 leaves unmeasured: vectors in the other loops, `exp` in vectors, skipping masked entries, and a batch larger than 1.
- NC's open probe: does a throwing check remove the vector form of a loop that HotSpot does vectorise?
- Nothing shows whether Fortress-generated code vectorises, since none runs.

## 7. Float width (`RR32` against `RR64`)

**Measured**
- `double[]` against `float[]` dot and matrix kernels, interleaved in one JVM, two runs at loads 9 and 1.3: no difference beyond noise. The `float` dot product's running sum differs by 4e-6 relative (AW §6). These were scalar loops; no vectors were tried.
- The parameters take 33 KB as `double[]` and 17 KB as `float[]` (AW §6).
- A NumPy fp32 run was timed only outside the repository, with no fp64 pair (PC §2, row 4).

**Decided**
- Nothing on the width.
- F-139: `RR32` is a sibling of `RR64`, and nothing converts into `RR32`.
- P-172 and P-76: a numeral rounds once into `RR32`. P-84 names `double[]` as the first case.

**Open**
- Q37 fork 4, ways 5a to 5e (AW §6). 5b needs float32 goldens; the reference script's `dtype=fp32` is in git history only (PC §2). 5e, `RR32` storage with `RR64` sums, is the specification's unbuilt `Extended[\F\]` (`Specification/appendices/future.tex:77-86`). 5d needs type aliases (row 18).
- Q37: his question "why `RR64` and not `RR32`" is owed an answer; his premise is that language models train at 32 bits at most (AW §6).
- The check's tolerances, 1e-12 on losses and gradients, fit only `RR64` (`run-c4/src/MicroGptFlatCheck.fss:16-18`; AW §6).
- Against the prelude, rows 528 and 529: an `RR32` `=` overflows the stack, and `RR32 + RR32` gives an `RR64`.

## 8. Numerics: reduction order, NaN, associativity

**Measured**
- The join tree depends only on `(lo, hi)`. A parallel `SUM` of 4,096 terms gives the same double at one and four threads, and differs from the sequential sum in its last digits (C4P §4; AUD, Probe 2).
- The Java baseline matches the Fortress everywhere except in sums of more than 16 terms: the softmax over 27 adds as 16 + 11. Quick-check differences are at most 8.9e-16. The Vector API variant and the fork/join variants reorder sums and still pass at the same tolerances (JB §2, §5, §6).
- Grain 16 under walk moved the losses by at most 4.4e-16 (AR §4).
- `FlatData.parseFloat` is not correctly rounded: 699 of the 4,192 parameters differ from their nearest double by up to 2 ulp (F-357).

**Decided**
- P-159: NaN comparisons answer `false` and `CMP` gives `Unordered`; `FloatingComparisonError` is never raised. P-67: round half to even.
- The library declares `RR64` an `AdditiveGroup` and a `MultiplicativeRing` (`Library/FortressLibrary.fsi:292-293`), and `SUM` is a `CommutativeMonoidReduction` (`:2122`).
- Associativity is a contract in comments only: "group reductions in any way desired". The `Monoid` trait is commented out, and nothing checks associativity (C4P §4).

**Open**
- Bit-reproducibility across thread counts is a property of the fixed split, not a decision. AR §4's way 4, a grain computed from the thread count, would break it.
- Q524's other way "reorders some sums".
- Mixed precision: §7's 5e.

## 9. The Java baseline and the ceilings measured on the JVM

**Measured**
- F-355; JB §4 (10 forks of 30 samples; cold runs ×30):
  - One step at batch 1: 101.6 µs median (range 100.8 to 104.0).
  - With Adam: 113.2 µs a step. At batch 4: 101.8 µs a document.
  - As cold processes: the run takes 72 ms and the quick check 77 ms.
  - Scalar products run at about 0.33 to 0.36 ns a multiply-add.
- PC §1, one step with Adam, one session at loads 1.6 to 5.4: Java 0.113 ms, NumPy 0.201 ms, dzaima/APL (flat) 13 ms, pure Python 132 ms. NumPy passes Java somewhere above batch 4 (83 µs a document at batch 32); the crossing is not measured.
- The first compiled array loop is about 100× Java (F-358). A scalar compiled loop is 9.7× Java (K §1).

**Decided**
- P-7: a pure-Java microGPT is the baseline, "the optimal result, the one to aim at".
- P-29: no performance judgement rests on walk.

**Open**
- Q524 (above).
- A profile of F-358's loop, splitting the store check, the cast, the range's closure and the accumulator, is proposed and has not run (PR §7.4).
- Not measured in Java: storage reused across steps (JB §3, decision 3), and any batch above 4.

## 10. The back-end options

**Measured**
- Nothing. BO, a digest of 2026-08-23 "not verified against current releases", ranks Truffle first, gives Native Image only the tool's start, calls LLVM a second implementation, suggests an MLIR-like algebraic layer, and notes Graal's partial Vector API coverage.
- RM is a proposal, "not an approved plan": Route B rebuilds walk on Truffle; A4 is `invokedynamic` dispatch.

**Decided**
- P-7 sets the target: JVM bytecode, finishing the designers' own compiled path.
- PR's Route 5, another back end, "gives up the designers' compiled path, which the goal names".
- No decision exists on Graal, Truffle, Valhalla or LLVM.

**Open**
- No queue item. His profile shows he asked about Valhalla and did not know the Vector API or Truffle in August (`coordinator/curator-profile/evidence.md:361-366`).

## 11. The model program's own constraints

**Decided**
- P-9: C4 is the target form, and polishing happens in the vocabulary, `FlatArrays.fss`. P-27: what the vocabulary builds generally belongs in the library.
- P-29: C4 is not edited for speed before microGPT runs compiled.
- P-87: the model's text is the notation, and no operator is swapped for a function call. Any change to a model line is shown to him as a diff first. Decision D's diff (21 lines out, 29 in) is parked and stale (PLAN phase 5).
- P-88; P-10: the APL side quest is closed, but its program stays in the walk check.
- PLAN item 61: `[\I extends Index\]` in the vocabulary only, shown as a diff.

**Measured or read in the tree**
- One parameter vector of 4,192 numbers, with nine views as the matrices (C4P §1).
- `step(p, b)` takes a batch of documents and computes "all (doc, pos) rows at once" (`run-c4/src/MicroGptFlat.fss:46-51`). `run` uses `bsz = 1` for 5 steps (`:82`, `:86`); the check runs batch 4 (`MicroGptFlatCheck.fss:61-64`).
- The contraction over positions and documents is written as matrix products, such as `gLM = dL^T x4`, not as an accumulation (C4P §2).
- All 16 positions are computed, the masked ones too (JB §3, decision 2). `adam` returns three new arrays each step (C4P §1). The model lines' only mutable variables are `p`, `m` and `v` (TW §3).

**Open**
- Q248: the shape of `ReadableArray2`.
- Which program phase 5's exit means; the record leans to C4.
- The tuple split, which measured faster under walk, is "Pavol's call" (C4P, "Measured").
- The queue's "Before microGPT compiles" list (PLAN phase 5).

## 12. Where the notes disagree with each other or with the tree

- **RM and BO against later measurements.**
  - They say compiled code is "7-9x faster than walk" and "roughly a thousand times slower than plain Java on a scalar loop". The later measurements are 45× faster than walk (F-358) and 106× on `bench1r`, and 9.7× of Java on a scalar loop after the two cheap fixes (K §1; rows 302 and 303, FIXED).
  - RM's success target, "within 2x of CPython", is replaced by P-7's Java baseline. PC §2 notes that the target was derived, not measured.
- **RM's stages that later work overtook:** A6 (4,000 lines of reductions in the compiler's library), since P-37 deletes that library; 0.1 (the checker on walk now), which P-12 puts after the switch-over; A2, which became decision A's five open ways; 0.4's value audit, for the number types, by P-178. K's order ("first an `RR64` array type in the compiler library") is overtaken the same way; its two cheap defects are fixed.
- **C4P §8**, "only mutable variables are transactional ... no per-element cell", is overtaken by batch 28's slot API. The compiled store now checks the transaction on every element access and accesses it volatile (F-333; P-169; the tree).
- **PF §1.8 and §6** ("no grain size", "reductions will run in sequence") are overtaken by climb batch 30 (F-350, P-175). AR §4 notes that P-175's text was stale on single-element splits.
- **TX does not cover a `var` field.** Since row 319 closed, a field pays the check too (F-374).
- **F-301 and F-302 were seen when the number types were traits.** P-178 and F-388 changed the box's constructor chain, and neither entry has been measured again.
- **Two different "baselines" for unboxing.** PR §1.3 calls 3 to 7× "the best that today's representation can reach". F-358 shows that most of the first compiled loop's 100× is not boxing.
- **The existing `double[]` store.** AR §2 and PR §1.3 say it "exists ... no factory chooses it". The tree shows it is immutable only, with no `put` (`FortressRR64ArrayStore.java`), so it cannot serve the mutable arrays that `fill` writes.
- **Line drift.** Notes cite `MicroGptFlat.fss:91` and `:51-72`; the tree has `:86` and `:46-71`. `Matrix.mul` is cited at `:2506-2548` (C4P) and `:3044-3102` (JB); it is now at about `:3131`.
- **PLAN's own order.** Phase 6 lists "compiled parallelism" last, but P-175 built parallel reductions ahead of it, as PLAN notes.

## 13. The handover against the record

**What the handover proposes that the record already measured or decided**
- **"Keep STM off the hot path."** microGPT opens no transaction (AUD §0). But compiled code checks for one at every mutable access and every element access, outside `atomic` too (row 641; the store). On the "strong-atomicity caveat": the compiled path is weak, so it never takes the lock (row 948), yet it still pays the check. Walk is strong and pays a cell monitor for each element (AUD §0).
- **"Arrays box?"** Yes today (F-333). Unboxing is decided (P-84) but unbuilt; how is open (decision A, Q37).
- **"Write-once flat arrays."** C4 already has the flat layout, views and fresh activations (C4P §1), with no shared write (AUD §0, §4).
- **"Threading inside one tiny multiply loses."** Measured: threads gain only from about 128×128 (F-356).
- **"i-k-j vectorises."** Measured: only with one index over two separate arrays, and only for long rows. With two offsets in one flat array, it does not (JB §5).
- **"Declaring `+` associative licenses lanes."** `SUM` is already a commutative monoid over `AdditiveGroup`, unchecked (§8). The reordered Vector API variant passes the 1e-12 checks (JB §5).
- **NaN** is decided (P-159) and priced (NC).
- **"float over double"** is Q37 fork 4; scalar `float[]` showed no gain (AW §6). **"Higher precision for long sums"** is AW's 5e, unbuilt.
- **Native Java types.** P-58 and P-169 give the store pattern; helpers cannot take arrays (F-106).
- **"One document per step?"** C4's `run` uses one, but `step` takes a batch as stacked rows, and the check runs batch 4.
- **The fallback "Java tensor type"** is AD §4(b)'s whole-array natives, or AW's A5, a special type outside the specification.

**What the record has never looked at**
- Data parallelism across documents: map over the batch, then reduce the gradients. The fork/join model forks inside the operations, and no Java batch above 4 exists.
- Blocked or packed GEMM, register tiling, and FMA.
- Vector API kernels in `float` (twice the lanes).
- ARM, NEON or Apple Silicon: every timing is on Intel AVX-512.
- Allocation and GC per compiled step; arenas or reuse (JB §3, decision 3, not measured); Agrona, the Disruptor, off-heap `MemorySegment`.
- Valhalla early-access builds, any JDK after 25, and Graal, Truffle or LLVM by probe.
- The cost of opaque against volatile access (PF §5, read only).
- Whether a throwing check blocks a vectorisable loop (NC).
- Integer overflow checks against SuperWord.
- The JIT's bounds-check removal by size.
- Compiled code at four threads, except PF's STM probes.
- Any shape of microGPT compiled.

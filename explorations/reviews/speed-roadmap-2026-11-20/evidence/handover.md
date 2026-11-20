# Fortress microgpt: concurrency and memory handover

As of 2026-11-18 · Pavol

## Purpose

This is context for a Claude Code session working in the Fortress revival repo (github.com/palimondo/fortress). The goal is to make Karpathy's microgpt run fast in Fortress on a multi-core machine (Apple Silicon).

The conclusion of the discussion: keep STM (`atomic`) off the hot path entirely. A GPT training step is dense numeric work with no shared symbolic state. The fitting design is write-once flat arrays in a per-step arena, disjoint-write parallel loops, and a monoid reduction of gradients across the batch.

The discussion was conceptual. Nobody read the Fortress source during it. Every statement about what the Fortress implementation does is an assumption to check, listed under Open questions.

## STM background

STM gives atomicity and isolation for a block of code without locks. It never went mainstream; it works where mutation is already controlled.

**Mechanism (optimistic design).** Each shared variable has a version. A transaction logs its reads (variable + version) and buffers its writes privately. At commit it locks the written variables, checks that no read version changed, then publishes or discards and retries. The alternative writes in place and keeps an undo log. It is the database technique of optimistic concurrency control, without durability.

**Where it works**

- Haskell: the type system bans I/O inside transactions. Idiomatic and used in production.
- Clojure: multiversion STM over explicit `ref` cells that hold immutable values. Only ref operations are instrumented, and writing a ref outside a transaction throws. Rarely used in practice; atoms (one cell, CAS retry) cover most code.

**Why it failed elsewhere** (Microsoft STM.NET cancelled 2010, C++ TM never standardised, PyPy-STM abandoned, Intel TSX disabled)

- I/O cannot roll back, and unrestricted languages cannot forbid it inside a transaction.
- Instrumenting every read and write costs 2–10× single-threaded.
- Weak vs. strong atomicity: code outside transactions touching the same data breaks isolation; fixing it means instrumenting all code.
- Privatisation: removing an object from a shared structure in a transaction, then using it unsynchronised, was unsafe under the fast implementations.
- Joe Duffy's conclusion: the root problem is unrestricted shared mutable state. Get isolation and immutability first; transactions then serve the small remainder.

The selling point was composability (two atomic blocks nest into one; two lock-based components do not compose), not raw speed against hand-tuned locking.

## Fortress specifics

Fortress supports an immutable, reduction-based style in which `atomic` is rarely needed. All of this is from general knowledge of the language, not from the repo.

**STM in Fortress.** The original interpreter implemented `atomic` on a Java STM library derived from DSTM2 (Sun's Scalable Synchronization group), with threads on Doug Lea's fork/join pool. It ran, but no published result shows a multicore gain from it. The bet was on hardware TM in Sun's Rock processor, cancelled in 2009.

**Immutable by default**

- `x = e` is an immutable binding; mutable needs `var` or `:=`.
- Object fields are immutable unless declared `var` or `settable`.
- `value object` gives immutable value types.
- Arrays are mutable.

**Why `atomic` appears.** Fortress is implicitly parallel: `for` bodies, tuple elements and function arguments may run in parallel. A shared accumulator therefore needs it:

```
for i <- 1:n do atomic sum += a[i] end
```

**The intended replacement** is a reduction over a generator, which splits the range, reduces the pieces in parallel and combines them with no shared variable:

```
sum = SUM[i <- 1:n] a[i]
```

**Other escapes**

- `seq(1:n)` forces a sequential loop, where a local `var` accumulator is safe.
- Disjoint array writes (each iteration writes its own `a[i]`) need no `atomic`.

**Strong-atomicity caveat.** The spec makes `atomic` atomic with respect to all other threads. An implementation may therefore route every mutable variable access through the STM, not only accesses inside `atomic` blocks. If this one does, the cost follows `var`, and removing `atomic` blocks alone will not remove it.

## Ideas considered and set aside

These are sound techniques for shared symbolic state. microgpt has none, so none of them is on the path.

| Idea | What it is | Why not here |
| --- | --- | --- |
| Persistent collections (Clojure) | Immutable wide trees; an update copies one root-to-leaf path and shares the rest; one mutable root pointer updated by CAS | Pointer chasing and allocation; nobody does dense linear algebra on persistent vectors |
| Swift-style copy-on-write | In-place mutation when the buffer is uniquely referenced, full copy otherwise | Needs a reference count; the JVM has none. JVM substitutes: ownership tokens (Clojure transients), static uniqueness proof, compiler-inserted counting, or a sticky one-bit "shared" flag |
| Concurrent tries (Ctrie) | Per-node CAS with O(1) snapshots | For write-heavy shared maps, not tensors |
| Off-heap memory (Agrona, `Unsafe`) | Byte-oriented buffers outside the GC heap | `double[]`/`float[]` are already flat and unscanned by the GC, and HotSpot optimises them better than `Unsafe` access |
| LMAX Disruptor | Preallocated ring buffer, single writer, cache-line padding | A messaging structure; only its discipline transfers |

**What does transfer** from the Disruptor school: allocate once, keep data flat, one writer per region, no garbage on the hot path.

**Copy-on-write is unnecessary** because ownership is statically obvious in a training step. Activations are write-once. Only parameters and optimizer state outlive the step, and after the update nobody needs the old values, so they are updated in place.

## Design direction for microgpt

Treat the training step as a pure function over write-once flat arrays, and parallelise across training examples.

**Memory**

- Replace the scalar autograd graph (one heap object per scalar, linked by pointers) with a tape in flat parallel arrays: values, gradients, opcodes, operand indices.
- Allocate the tape once. Reset it each step by resetting an index. This is arena allocation.
- Parameters and optimizer state live in one uniquely owned block, updated in place between steps.

**Parallelism**

- Split loops so each task writes its own slice. Disjoint writes need no `atomic`.
- The hazard is the backward pass, where several consumers add into the same gradient cell. At scalar granularity that is a shared accumulator. At tensor granularity (matmul backward as one operation) it is disjoint-write loops again.
- The matrices are tiny, so threading inside one multiply will lose to scheduling overhead.
- Parallelism pays across examples: map over the batch, reduce per-example gradients with vector addition as the monoid. This is the generator/reducer pattern. The original is believed to train on one document per step, so this adds batching, a benign change to the algorithm.

**GEMM**

- Across cores, each output row or row block is independent, so associativity is not involved.
- Inside a core, the inner dot product is a reduction; strict IEEE ordering blocks SIMD. Declaring `+` associative licenses multiple accumulators and vector lanes.
- Loop order i-k-j makes the inner loop `C[i,:] += A[i,k] * B[k,:]`, which is elementwise and vectorises under strict IEEE.

**Numerics**

- Relaxed reduction order is normal in LLM training: GPU kernels reduce nondeterministically and runs are not bit-reproducible.
- Relax associativity only. Do not assume away NaN and infinity; that hides divergence.
- Keep long accumulations (loss sums, gradient sums over many examples) in higher precision.
- Prefer `float` over `double` where possible: on 128-bit NEON it doubles the lane count.

## JVM tooling status

On JDK 25, primitive arrays plus the incubating Vector API are what is available; value classes are not.

| Tool | Status | Note |
| --- | --- | --- |
| Primitive arrays (`double[]`, `float[]`) | Stable | Flat, unboxed, not scanned by the GC. The default choice |
| Vector API (`jdk.incubator.vector`) | Tenth incubator in JDK 25 ([JEP 508](https://openjdk.org/jeps/508)) | Needs `--add-modules jdk.incubator.vector` at compile and run time. Package will be renamed on leaving incubation |
| Foreign Function & Memory API (`MemorySegment`, `Arena`) | Final | Supported replacement for `Unsafe` memory access. Worth it only to hand memory to native BLAS |
| Value classes ([Project Valhalla](https://openjdk.org/projects/valhalla/), JEP 401) | Preview in JDK 28, due March 2027; early-access builds exist | Not in JDK 25. Needs `--enable-preview`. Expected to stay in preview through JDK 29 |

**Vector API discipline.** A vector is an ordinary heap object today. Speed depends on the C2 compiler proving it never escapes. Keep vectors as local variables inside the hot loop, load from and store to primitive arrays, and never put a vector in a field or collection. Otherwise each operation allocates.

**Why the Vector API waits for Valhalla.** Value classes let the VM keep vectors in registers as a property of the type instead of an optimisation that may fail. Finalising the API before that would freeze a shape that then has to break.

**Where Valhalla would matter here.** Only if a Fortress value object (a dual number for autograd, say) should live flat inside an array.

Not verified: the JEP 401 page returned a stale copy when fetched, so the Valhalla status rests on the project page and August 2026 press coverage.

## Open questions to check in the source

These decide whether the design above is reachable in pure Fortress or needs a Java-side native type.

- [ ] Does an array of `RR64` (or `RR32`) compile to a flat primitive array, or to boxed objects?
- [ ] Does mutable variable access outside `atomic` go through the STM (strong atomicity), or only access inside `atomic` blocks?
- [ ] Which standard library paths (array and aggregate internals, generators, reducers) use `atomic` or transactional cells internally?
- [ ] Does the big-operator machinery treat `+` on floats as associative, and how are the `Associative` and `Commutative` traits consulted by reducers?
- [ ] Does a disjoint-write parallel `for` over array indices run without any transactional overhead?
- [ ] How are native Java-implemented types exposed to Fortress in this tree, and can a thin wrapper over `float[]` be added that way?
- [ ] Does microgpt as ported train on one document per step, and where would batching go?
- [ ] Does HotSpot auto-vectorise the i-k-j GEMM inner loop as emitted by the Fortress compiler, or is an explicit Vector API kernel needed?

If arrays box or `var` access is transactional, the fallback is a Java-implemented tensor type (flat array, arena, GEMM kernel) exposed to Fortress, with Fortress supplying the batch-level map and reduce.

## References

**Steele, "Organizing Functional Code for Parallel Execution; or, foldl and foldr Considered Slightly Harmful" (ICFP 2009)** — the design rationale for generators and reducers.

- Video: https://vimeo.com/6624203 (live)
- Slides, MIT version, April 2009, 65 slides: http://groups.csail.mit.edu/mac/users/gjs/6.945/readings/MITApril2009Steele.pdf (live)
- Slides, ICFP version: `research.sun.com/projects/plrg/Publications/ICFPAugust2009Steele.pdf` (dead host; try the Wayback Machine)
- Proceedings abstract, 2 pages, no full paper: DOI 10.1145/1596550.1596551
- Maessen's follow-up talk, Portland State, January 2010: `research.sun.com/projects/plrg/Publications/PSUJan2010-Maessen.pdf` (dead host)

**Pages opened during the discussion**

- JEP 508: Vector API (Tenth Incubator): https://openjdk.org/jeps/508
- Project Valhalla: https://openjdk.org/projects/valhalla/

**Cited from general knowledge, not opened**

- Joe Duffy, "A (brief) retrospective on transactional memory" (2010)
- Dan Grossman, "The Transactional Memory / Garbage Collection Analogy" (2007)
- Harris, Marlow, Peyton Jones, Herlihy, "Composable Memory Transactions" (2005)
- Okasaki, *Purely Functional Data Structures* (1998)
- Bagwell, hash array mapped tries (2001); Steindorfer and Vinju, CHAMP (2015)
- Prokopec et al., concurrent tries with snapshots (2012)
- Tofte and Talpin, region-based memory management

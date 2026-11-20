# JVM state of the art for fast small-GPT training (checked 2026-11-20)

Marks: **[S n]** a numbered source of that section states it; **[§k-n]** source n of section k; **[I]** my inference. Dates are the sources' own. Web pages were read on 2026-11-20 unless marked "not opened".

## 1. Vector API (JEP 508, then 529, 537)

- **Releases.** JDK 25 (GA 2025-09-16): JEP 508, tenth incubator. It added VectorShuffle to and from MemorySegment, FFM-linked math libraries and Float16 auto-vectorization on x64 [S1]. JDK 26 (GA 2026-03-17): JEP 529, "without substantial change" [S2, S4]. JDK 27 (GA 2026-09-15): JEP 537, "no change to the API", with SLEEF updated from 3.6.1 to 3.9.0 [S3, S4]. No Vector API JEP is listed for JDK 28 yet (page of 2026-11-11) [S5]. All three JEPs: incubate "until necessary features of Project Valhalla become available as preview features", then move to preview [S1–S3]. Incubator rules: class-path code needs `--add-modules`, a warning prints at run time, and packages are renamed on promotion [S6].
- **Next.** `Float16Vector` (64- to 512-bit species; add/sub/mul/div/min/max/sqrt/fma intrinsified) was integrated in mainline on 2026-06-11 [S7]. That is after JDK 27's fork (2026-06-04), so it ships first in JDK 28 [I].
- **Species.** Shapes are 64/128/256/512 bits and max; SVE allows any multiple of 128 up to 2048 [S3]. AArch64: `-XX:UseSVE=0/1/2` selects NEON/SVE/SVE2. NEON has no predicate registers, so a masked add becomes an add plus a BSL blend. SVE predicates have been used since JDK 18 [S8]. Apple M4 has SME2 and streaming-mode SVE but no ordinary SVE [S9]; M1–M3 are NEON-only and HotSpot does not use SME, so `SPECIES_PREFERRED` on Apple Silicon is 128 bits: 4 float or 2 double lanes [I]. x86: AVX2 gives 256 bits (8 floats) and AVX-512 gives 512 (16), though HotSpot defaults to 256 bits on Skylake-SP [S10].
- **Measured speed.**
  - JVBench (CC'23), ten benchmarks against scalar Java: mean 2.98× on AVX-512, 2.39× on AVX2, 0.77× on a 128-bit AVX machine without FMA, best case about 12× [S11].
  - GEMM in 2021: a Vector API dgemm reached about 15 GFLOP/s against OpenBLAS's 25 on the same machine (60%), held back by register spilling (3×3 tile against OpenBLAS's 3×4) [S12].
  - sgemm 1024³ on 1 core (JDK 21, i7-9750H AVX2): scalar 1.1, naive Vector API 14.1, tiled 23.0 GFLOP/s (undated page) [S13].
  - JDK 25 on an AVX-512 cloud VM, 1 thread, n=256: naive 2.0, i-k-j 5.4, i-k-j with Vector API and fma 21.6 GFLOP/s (secondary blog) [S14].
  - I found no published Vector API GEMM measurement on Apple Silicon [I].
- **Pitfalls.**
  - *Boxing.* C2 handles vectors specially "to overcome limitations in escape analysis and avoid boxing" [S3]. A box still appears at a heap store, a call C2 did not inline, or a deopt; until a 2020 patch, also at a loop phi [S15]. A badly built zero vector cost about 7× (2021) [S16]. Keep species `static final` and vectors in locals [I].
  - *Fallback.* Operations C2 does not intrinsify run in Java, "functional but not optimal" [S3], in the interpreter and C1 too. Vector `fma` on a CPU without FMA was 135–940× slower than mul+add [S11].
  - *Tails and masks.* A `loopBound` loop with a scalar tail beat `indexInRange` masks (mean speedup 2.67× against 1.33×) [S11], and NEON emulates masks [S8]. Pick a species that divides the row length (16) [I].
  - *Reductions.* `reduceLanes(ADD)` order is arbitrary and "may even vary over time" [S17]. Accumulate lane-wise and reduce once after the loop [S18].

Sources: 1 https://openjdk.org/jeps/508 (JDK 25; updated 2025-10-01) · 2 https://openjdk.org/jeps/529 (updated 2026-04-06) · 3 https://openjdk.org/jeps/537 (updated 2026-11-19) · 4 https://openjdk.org/projects/jdk/26/ and /27/ (GA dates) · 5 https://openjdk.org/projects/jdk/28/ (2026-11-11) · 6 https://openjdk.org/jeps/11 · 7 https://github.com/openjdk/jdk/pull/28002 (JDK-8370691, 2026-06-11) · 8 https://developer.arm.com/community/arm-community-blogs/b/servers-and-cloud-computing-blog/posts/java-vector-api-on-aarch64 (2023-06-07) · 9 https://raw.githubusercontent.com/tzakharko/m4-sme-exploration/main/reports/01-sme-overview.md (community report, undated) · 10 https://mail.openjdk.org/pipermail/jdk-changes/2019-October/006511.html (2019-10-04) · 11 https://sonar.ch/documents/325667/files/Basso_2023_ACM.pdf (CC'23, 2023-02) · 12 https://mail.openjdk.org/pipermail/panama-dev/2021-February/012000.html (2021-01-27) · 13 https://skainet-developers.github.io/SKaiNET/skainet/contributing/matmul-kernels.html (undated) · 14 https://ankurm.com/tornadovm-7-java-gpu-vs-vector-api-matrix-multiply/ (2026-10-14) · 15 https://mail.openjdk.org/pipermail/panama-dev/2020-December/011651.html · 16 https://mail.openjdk.org/pipermail/panama-dev/2021-March/012375.html · 17 FloatVector.reduceLanes, https://docs.oracle.com/en/java/javase/25/docs/api/jdk.incubator.vector/jdk/incubator/vector/FloatVector.html (JDK 25) · 18 https://eme64.github.io/blog/2026/01/13/Reductions.html (2026-01-13)

## 2. C2 auto-vectorization (SuperWord)

- **What it vectorizes.** It applies SLP to innermost loop bodies after unrolling, and only to bodies with no control flow [S1]. Addresses must be linear in the loop counter, over arrays or (since JDK 26) MemorySegments [S2]. `Math.fma` loops compile to `vfmadd231ps` [S3]. Java may not fuse `a*b+c` [S4], and floating point has been strict everywhere since JDK 17 [S5]. No fast-math switch exists [I].
- **Float reductions (a dot product).**
  - JDK 9 vectorized reductions, with float/double add/mul reduced lane by lane in order; "simple" reductions were then disabled after regressions [S6].
  - JDK 21 (JDK-8302652) moved the reduction after the loop into a vector accumulator, only for reorderable operations (int/long, min/max) [S6].
  - JDK 26's cost model (JDK-8340093, merged 2025-11-10) vectorizes simple reductions when profitable [S6, S7], but "for float and double we cannot make add and mul faster than the scalar performance, because we cannot reorder the reduction" [S6].
  - On NEON (Apple Silicon included), strict-order float/double add/mul reductions are not auto-vectorized at all [S7, S8, S9]. A PR adding sequential NEON versions (JDK-8370677), open since 2026-05-07, reports 13–24% gains at n=256 and about 1% at n=4096 [S8].
  - So a scalar float dot product stays scalar in effect on JDK 25–27; the Vector API or hand-written accumulators are the way out [I].
- **Aliasing.** A loop whose load and store use different invariant offsets (`c[ci+j] += a*b[bi+j]`, c possibly b) needs a no-alias proof. JDK 26 adds speculative runtime alias checks with a multiversioned scalar fallback (JDK-8324751, integrated 2025-08-28) [S2, S10]. In 2017 C2 "choked on the array offsets" of a flat i-k-j matmul and emitted scalar code [S3].
- **Short loops.** Loops around 10 bytes regress slightly [S2], and JDK-8307084 (the vectorized drain loop is skipped for some small trip counts) was still in review in January 2026 [S11, not opened]. A 16-float row is short for C2 [I].

Sources: 1 https://eme64.github.io/blog/2023/02/23/SuperWord-Introduction.html (2023-02-23) · 2 https://eme64.github.io/blog/2026/01/14/Aliasing.html (2026-01-14) · 3 https://richardstartin.github.io/posts/multiplying-matrices-fast-and-slow (2017-12-31) · 4 §1-12 · 5 https://openjdk.org/jeps/306 (JDK 17; not opened) · 6 §1-18 · 7 https://github.com/openjdk/jdk/pull/27803 (2025-11-10) · 8 https://github.com/openjdk/jdk/pull/31082 (open; last activity 2026-08-25) · 9 https://developer.arm.com/community/arm-community-blogs/b/tools-software-ides-blog/posts/vector-related-improvements-in-jdk-21-and-jdk-25-compared-with-jdk-17-on-aarch64 (2026-08-05) · 10 https://github.com/openjdk/jdk/pull/24278 (2025-08-28) · 11 https://mail.openjdk.org/pipermail/hotspot-compiler-dev/2026-January/102155.html

## 3. Half and reduced precision

- `Float.floatToFloat16`/`float16ToFloat` are in `java.base` since JDK 20 [S1]; the value-based binary16 class `jdk.incubator.vector.Float16` since JDK 24 [S2]. JDK 25 auto-vectorizes Float16 arithmetic on x64 [§1-1]; `Float16Vector` arrives in JDK 28 [§1-7, I].
- A Lucene trial of a pre-integration `Float16Vector` build ran about 40× slower than float32 (2026-01-15) [S3]; re-measure [I].
- **bfloat16.** No JDK type; a `Bfloat16` "for testing purposes" lives only on Valhalla branches (2026-01) [S4, not opened]. On the JVM it means `short` storage and bit conversion with round-to-nearest-even [I].
- **Mixed precision.** The standard recipe keeps an fp32 master copy of the weights, scales the loss so small fp16 gradients survive, and accumulates fp16 products in fp32 [S5]. bf16 keeps fp32's exponent range and matched fp32 results without hyperparameter changes [S6].
- **For this model.** About 4K parameters (16 KB of float) sit in L1, so half precision saves bandwidth that is not the bottleneck. `float` in place of `double` is the step that pays: twice the lanes [I].

Sources: 1 https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Float.html (JDK 25) · 2 https://docs.oracle.com/en/java/javase/25/docs/api/jdk.incubator.vector/jdk/incubator/vector/Float16.html ("Since: 24") · 3 https://mail-archive.com/issues@lucene.apache.org/msg92214.html (2026-01-15) · 4 https://mail.openjdk.org/pipermail/valhalla-dev/2026-January/017418.html (JDK-8356104) · 5 Micikevicius et al., "Mixed Precision Training", ICLR 2018, https://arxiv.org/abs/1710.03740 · 6 Kalamkar et al., https://arxiv.org/abs/1905.12322 (2019-05/06)

## 4. Project Valhalla

- **JEP 401**, now "Value Objects (Preview)": Integrated, Release 28, page updated 2026-08-07 [S1]; JDK 28 GA is scheduled for 2027-03-09 [§1-5]. JEP 401 and JEP 539 are integrated, with EA builds at jdk.java.net/28 [S2]. It needs `--enable-preview`, under which the wrappers and `LocalDate` become value classes [S1].
- **Flattening.** The JVM may flatten references in fields and array elements, and scalarize them in locals, arguments and returns. Both are optimizations at the JVM's discretion [S1]. A flattened reference must be read and written atomically, which "on common hardware" limits mutable fields (and array elements) to 64 bits including a null flag. Fields of value classes are exempt [S1]. An array of a value class holding two floats (64 bits plus the null flag) or two doubles is therefore not flattened in JDK 28 [I from S1]. Scalarization has no size limit [S1].
- **Null-restricted types.** The draft JEP "Null-Restricted Value Class Types" adds null-free storage and an opt-in to non-atomic flat arrays (`LooselyConsistentValue`). It is still a draft (updated 2026-05-28) with no target [S3]. Nullness markers are a separate draft (updated 2025-07-24) [S4].
- **Generic specialization.** "Parametric JVM" is one of five planned feature sets, with no JEP [S2].
- **Vector API.** The plan is to declare vector classes as value classes (the lworld+vector branch) and to use generic specialization, after which `IntVector`-style subclasses "might not be required" [§1-3].
- **How long in preview.** A secondary article (2026-11-10) reports that the language architect called a JDK 29 exit from preview "optimistic" [S5, not verified].

Sources: 1 https://openjdk.org/jeps/401 (updated 2026-08-07) · 2 https://openjdk.org/projects/valhalla/ (August 2026 entry) · 3 https://openjdk.org/jeps/8316779 (draft, 2026-05-28) · 4 https://openjdk.org/jeps/8303099 (draft, 2025-07-24) · 5 https://www.javacodegeeks.com/2026/11/why-the-java-vector-api-is-on-its-12th-incubation-jep-537-and-what-it-is-really-waiting-for.html (2026-11-10)

## 5. Pure-Java LLM projects

- **llama2.java** (a port of llama2.c). Its matmul is Vector API (`SPECIES_256`, 4 fma accumulators, weights in a MemorySegment) inside `IntStream.parallel()` over rows [S1]. On a Ryzen 3950X with JDK 20.0.2, against `gcc -Ofast -march=native` [S1]:

  | Model | 1 thread | 8 threads (OpenMP for C) |
  |---|---|---|
  | 15M | 0.65× | 0.35× |
  | 110M | 0.81× | 0.88× |
  | 7B | 0.95× | 0.98× |

  The smallest model, multi-threaded, shows the largest gap. That fits a per-matmul fork/join dispatch cost, though the README gives no cause [I].
- **llama3.java.** One file; Q4_0/Q8_0; Vector API matrix-vector kernels; GGUF mmapped through `MemorySegment`; Native Image with AOT preloading. It recommends GraalVM 25+ ("partial but good" Vector API support). Its llama.cpp comparison is an unreadable image; it notes inference is memory-bandwidth bound [S2]. Siblings: gptoss.java, gemma4.java, qwen35.java [S2, S3].
- **Jlama**: Panama Vector backend by default, optional native SIMD, Q8/Q4 [S4]. **gpt-oss.java** (Amazon): Java 23+, Vector API, parallel and fused operations [S5]. No tokens/s comparisons found.
- **Training.** All of these are inference (matrix-vector, bandwidth-bound). I found no pure-Java CPU transformer training project with published speeds [I, negative search].

Sources: 1 https://github.com/mukel/llama2.java (README; numbers on JDK 20.0.2) · 2 https://github.com/mukel/llama3.java (README) · 3 https://github.com/mukel/gptoss.java · 4 https://github.com/tjake/Jlama · 5 https://github.com/amzn/gpt-oss.java (all READMEs read 2026-11-20)

## 6. Parallelism for small dense work

- **ForkJoinTask.** "As a very rough rule of thumb, a task should perform more than 100 and less than 10000 basic computational steps"; tasks that are too small let overhead "overwhelm processing" [S1].
- **Parallel streams.** They pay only when the sequential version takes more than "roughly (within a factor of ten of) 100 microseconds", that is N×Q ≥ 10000. Misuse "might cost you around 100 microseconds", partly from waking idle cores [S2].
- **Virtual threads** "are not faster threads … They exist to provide scale (higher throughput), not speed (lower latency)". More threads than cores does not help CPU-bound work [S3].
- **For this model.** A whole step is about 100 µs, the threshold itself; one 16×16 matmul (about 4K FMAs) is two or three orders below it, so splitting inside a matmul loses [I from S1, S2]. Split across examples: one long-lived thread per core, each with a batch slice above 100 µs, a barrier, then one fixed-order gradient reduction [I]. The llama2.java data (§5) fits this.

Sources: 1 https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/concurrent/ForkJoinTask.html (JDK 25) · 2 https://gee.cs.oswego.edu/dl/html/StreamParallelGuidance.html (draft, 2014-09-01) · 3 https://openjdk.org/jeps/444 (JDK 21)

## 7. GEMM on the CPU without BLAS

- **The method.** Layer loops for the caches, pack panels so the inner kernel streams from L1/L2, hold a block of C in registers [S1]; thread the outer loops around a small micro-kernel [S2]; for small shapes, JIT one kernel per shape [S3].
- **At 16×16 to 64×16.** Each float matrix is at most 4 KB, so all operands sit in L1 and packing and cache blocking are moot. What matters is register tiling (several C row-vectors held in registers, a broadcast A[i,k], fma with B row-vectors), full unrolling for the fixed shapes, and a layout per pass that avoids transposes (forward X·W; backward dX = dY·Wᵀ, dW = Xᵀ·dY) [I from S1, S3].
- **Java against peak.**
  - 2017–18, Skylake (32 SP flops/cycle per core): Java i-k-j with `Math.fma` on JDK 10 barely passed 4 flops/cycle; GCC auto-vectorized C held about 7; hand-written AVX2 intrinsics reached about 23–26 (about 80%) [S4, S5].
  - The Vector API dgemm reached 60% of OpenBLAS (2021) [§1-12].
  - Tiled Vector API: 23 GFLOP/s on one AVX2 core [§1-13], which I put at roughly 20–30% of peak [I].
  - For reference, an M1 P-core's NEON peak is 102.4 GFLOP/s fp32 and 51.2 fp64, estimated at 3.2 GHz [S6].
  - I found no Java measurement at 16–64 sizes [I].

Sources: 1 Goto & van de Geijn, ACM TOMS 34(3), 2008, https://cs.utexas.edu/~flame/pubs/GotoTOMS_final.pdf · 2 https://www.cs.utexas.edu/~flame/pubs/blis3_ipdps14.pdf (IPDPS 2014; not opened) · 3 LIBXSMM, SC16, https://sc16.supercomputing.org/presentation/index-id=pap364&sess=sess153.html (not opened) · 4 §2-3 · 5 https://richardstartin.github.io/posts/mmm-revisited (2018-01-15) · 6 https://scalable.uni-jena.de/opt/sme/intro.html (© 2024)

## 8. Relaxed reduction order in training

- **Java.** Scalar floating point is strictly ordered, so a JVM never reorders a sum; the program or code generator has to (multiple accumulators, Vector API, a tree) [§2, I]. The JDK already relaxes order where an API allows it. `DoubleStream.sum` leaves its order "intentionally not defined", may use compensated summation, and its "output … may vary on the same input elements" [S1]. Likewise `reduceLanes` [§1-17].
- **Error bounds.** Worst case grows as O(εn) for recursive summation, O(ε log n) for pairwise, and O(ε) independent of n for Kahan, at several times the arithmetic. NumPy and Julia sum pairwise by default [S2, after Higham 1993].
- **What frameworks guarantee.**
  - PyTorch: no reproducibility across releases, platforms or CPU and GPU; `use_deterministic_algorithms` makes nondeterministic operations raise [S3].
  - cuBLAS: bitwise reproducible run to run "on GPUs with the same architecture and the same number of SMs", barring multi-stream and atomics modes; not across versions [S4].
  - LLM inference: the forward pass is "run-to-run deterministic"; variance comes from batch-size-dependent reduction order; atomics appear in FlashAttention backward; batch-invariant kernels cost about 20% [S5].
- **On a CPU,** a reduction tree fixed in shape (independent of thread count) gives bit-reproducible batches at almost no cost [I].

Sources: 1 https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/util/stream/DoubleStream.html (JDK 25) · 2 https://en.wikipedia.org/wiki/Pairwise_summation (cites Higham, SIAM J. Sci. Comput. 14(4), 1993) · 3 https://docs.pytorch.org/docs/2.15/notes/randomness.html (2026-05-14) · 4 https://docs.nvidia.com/cuda/cublas/index.html §2.1.4 (current) · 5 https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/ (2025-09-10)

## 9. LMAX Disruptor, Agrona, FFM off-heap memory

- **Disruptor** is "A High Performance Inter-Thread Messaging Library" (4.0.0 requires Java 11) [S1, S2]. It offers nothing for arithmetic. Its discipline still applies: preallocate, one writer per region, and pad per-thread gradient buffers against false sharing [I].
- **Agrona** has "buffers for working with on and off heap memory with memory ordering semantics", primitive collections, queues, ring buffers and agents [S3]. Its buffers go through a generated `UnsafeApi` over `jdk.internal.misc.Unsafe`, and its build opens `java.base/jdk.internal.misc` [S4]. That gives typed, byte-addressed access, not vector math [I].
- **Unsafe memory access** was deprecated for removal in JDK 23 (JEP 471) and warns by default from JDK 24 (JEP 498). Phase 3, deny by default, is planned "in JDK 26 or later" [S5, S6]. No JEP for it appears in the JDK 26 or 27 feature lists, nor in JDK 28's as of 2026-11-11 [§1-4, §1-5].
- **FFM** (`MemorySegment`, `Arena`) is final since JDK 22 [S7]. It gives off-heap memory, more than 2 GB, mmap (llama3.java uses it), explicit alignment and deterministic freeing [S7, §5-2].
- **Speed against arrays.** On AArch64 (2025-06), a Vector API dot product took 61 ns on arrays against 95–99 ns on segments, whose loop bound was not hoisted [S8]. A scalar add loop (2025-09-29) took 167 ns on arrays, 549 on segments and 600–777 with Unsafe on JDK 25; on JDK 26 arrays took 210, segments 136, Unsafe much as before. The JDK 26 gain is credited mainly to JDK-8324751 [S9, S10].
- **For this model,** one owned `float[]` block is simplest and fastest on JDK 25; segments become competitive on JDK 26+ [I].

Sources: 1 https://github.com/LMAX-Exchange/disruptor (README) · 2 https://raw.githubusercontent.com/LMAX-Exchange/disruptor/master/src/docs/asciidoc/en/changelog.adoc · 3 https://github.com/aeron-io/agrona (README, © 2014–2025) · 4 Agrona `build.gradle` and `UnsafeBuffer.java` on master (2026-11-20) · 5 https://openjdk.org/jeps/471 (JDK 23) · 6 https://openjdk.org/jeps/498 (JDK 24) · 7 https://openjdk.org/jeps/454 (JDK 22; not opened) · 8 https://mail.openjdk.org/pipermail/panama-dev/2025-June/021066.html · 9 https://mail.openjdk.org/pipermail/panama-dev/2025-September/021142.html (2025-09-29) · 10 https://mail.openjdk.org/pipermail/panama-dev/2025-September/021143.html

## 10. GraalVM and Truffle (briefly)

- In September 2025 Oracle detached GraalVM from the Java release train to focus on non-Java languages; GraalVM for JDK 24 was the last "licensed and supported as part of Oracle Java SE Products" [S1].
- GraalVM 25.x (on JDK 25) continues: 25.2.4 (2026-07-28) turns Vector API support on by default in Native Image [S2]; 25.3.4.1 (2026-08-25) adds default-on loop vectorization for "eligible array-arithmetic loops" [S3]. llama3.java calls Graal 25+'s Vector API support "partial but good" [§5-2]; in 2023 it had none [§5-1].
- I found no 2026 Graal-against-C2 numeric benchmark. Truffle serves AST interpreters; a bytecode compiler gains nothing from it [I].

Sources: 1 https://www.infoq.com/news/2025/09/java-news-roundup-sep15-2025 (2025-09-23) · 2 https://www.graalvm.org/release-notes/25.2/ (2026-07-28) · 3 https://www.graalvm.org/release-notes/25.3/ (2026-08-25)

## 11. The handover's JVM claims

**JVM tooling status**

1. *"On JDK 25 … primitive arrays plus the incubating Vector API … value classes are not."* **Holds**; FFM is final too, but its loops vectorize poorly on JDK 25 (§9).
2. *Primitive arrays "flat, unboxed, not scanned by the GC".* **Holds**; copying collectors still move them [I].
3. *Vector API "tenth incubator in JDK 25 (JEP 508)".* **Holds**; twelfth in JDK 27, no API change since (§1).
4. *`--add-modules` at compile and run time; package renamed on leaving incubation.* **Both hold** (JEP 11); a module can `requires` it instead.
5. *FFM: "Final"; "supported replacement for Unsafe memory access".* **Holds.** *"Worth it only to hand memory to native BLAS".* **Wrong** in general: it is also how to mmap weights, pass 2 GB, align and free deterministically, and on JDK 26 its loops beat arrays in one benchmark (§9). For this model, `float[]` remains the choice on JDK 25.
6. *Value classes: "Preview in JDK 28, due March 2027; early-access builds exist"; not in JDK 25; needs `--enable-preview`.* **Holds**: JEP 401, retitled "Value Objects (Preview)", is Integrated for Release 28, GA 2027-03-09, EA builds exist (§4). *"Expected to stay in preview through JDK 29".* **Not verified** (one secondary source, §4-5).
7. *JEP 401 page stale, status unverified.* **Now verified**: Integrated, Release 28, updated 2026-08-07.
8. *"A vector is an ordinary heap object … speed depends on C2 proving it never escapes … otherwise each operation allocates".* **Holds in substance**: C2 uses vector-specific box elimination, not plain escape analysis; boxes appear where a vector escapes, and the Java fallback allocates (§1). The advice is right.
9. *"Why the Vector API waits for Valhalla".* **Holds** as the JEPs state it (incubate until Valhalla preview, then preview); they also name generic specialization as a reason the shape may change (§1-3).
10. *"Valhalla matters only if a value object (a dual number) should live flat inside an array".* **Partly wrong.** In JDK 28 a dual of two floats or two doubles exceeds the 64-bit atomic limit with its null flag, so its arrays stay unflattened until the null-restricted/non-atomic draft, which has no target (§4). Scalarization helps duals in locals, and Valhalla matters for the Vector API's own types.

**Design direction**

11. *"Threading inside one multiply will lose to scheduling overhead".* **Holds** (§6: about a 100 µs threshold; a 16×16 matmul is far below it).
12. *"Parallelism pays across examples … reduce per-example gradients".* **Holds** [I], provided each worker's slice exceeds about 100 µs and the reduction tree is fixed (§6, §8).
13. *"Strict IEEE ordering blocks SIMD" for the inner dot product.* **Holds** for C2; on NEON it does not vectorize float add reductions at all in JDK 25–27 (§2). *"Declaring `+` associative licenses multiple accumulators and vector lanes".* **Holds only at source level**: the JVM takes no such declaration, so the code generator must emit the reordered code (accumulators or Vector API).
14. *"i-k-j … elementwise and vectorises under strict IEEE".* **Holds in principle; conditional on JDK 25**: flat arrays with different invariant offsets may not vectorize before JDK 26's alias checks, 16-element rows are short loops for C2, and `a*b+c` is never fused (emit `Math.fma`) (§2). Measure, or write the kernel in the Vector API.
15. *"GPU kernels reduce nondeterministically and runs are not bit-reproducible".* **Partly.** Reproducibility is not guaranteed across platforms or releases, and atomics kernels are nondeterministic, but cuBLAS is bitwise reproducible run to run on one GPU type, forward passes are mostly deterministic, and deterministic modes exist (§8).
16. *"Relax associativity only; keep NaN and infinity".* **Consistent with the JVM**, which has no fast-math mode (§2, §8).
17. *"Keep long accumulations in higher precision".* **Holds**: the mixed-precision recipe (§3).
18. *"Prefer float … on 128-bit NEON it doubles the lane count".* **Holds**: 4 lanes against 2 (§1).

From the "set aside" table: arrays beat `Unsafe` on JDK 25 **holds** (167 against 600–777 ns); Agrona as "byte-oriented buffers outside the GC heap" is **partly** right, since its buffers wrap heap or off-heap memory; Disruptor as "a messaging structure" **holds** (§9).

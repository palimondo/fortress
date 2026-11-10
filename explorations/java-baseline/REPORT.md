<!-- The pure-Java microGPT that P-7 names as the baseline for compiled microGPT, written and timed on 2026-11-10 by a Fable worker: a plain Java program (`double[]`, plain loops, one thread, the JDK alone) that computes what the flat program `run-c4/src/MicroGptFlat.fss` computes and passes its 7 quick checks and its 40 full checks against the same reference files at the same tolerances; its timings with their method and spread (one step after warm-up about 0.10 ms, the five-step run and the quick check as whole cold processes about 0.07 to 0.08 s); which of its loops HotSpot vectorised, from the machine code; and two variants measured beside it, one with the Vector API and one shaped as the Fortress library's fork/join, with the rehearsal's dot-product loop in Java. -->

# The pure-Java microGPT: the baseline of P-7, and its timings

Paths are under `explorations/` unless they start with `Library/` or `ProjectFortress/`. "The flat program" is `run-c4/src/MicroGptFlat.fss` with its vocabulary `FlatArrays.fss` and its data `FlatData.fss`. Everything here is in `java-baseline/`; `./run.sh` there compiles into `/tmp` and runs each thing this report cites. Nothing of Fortress was built or run for this report.

## 1. What was built

| File | What it is |
|---|---|
| `MicroGptFlat.java` | the model: `MicroGptFlat.fss` line for line. Each method is named after the model's function (`rmsn`, `sm`, `rmsn_b`, `sm_b`, `step`, `adam`, `learningRate`, `matName`, ...) and cites its line; `step` has one statement per expression of lines 52 to 71, under a comment that quotes the line |
| `FlatArrays.java` | the vocabulary as plain loops over `double[]`: the products (`mul`, `mulT`, `addMulT`, `tMul`), the per-head planes (`headsMulT`, `headsMul`, `headsTMul`), the keys (`gatherAdd`, `onehotTMul`), and the four seams through which the model reaches every row loop and every sum (`forRange`, `dot`, `sum`, `max`) |
| `FlatData.java` | the loaders and the corpus: `FlatData.fss` declaration for declaration, `parseFloat` included |
| `MicroGptFlatQuick.java`, `MicroGptFlatCheck.java` | the 7 and the 40 checks of the two `.fss` files of those names |
| `Bench.java`, `run.sh`, `asm-count.py`, `Probes.java`, `DotU.java` | the timing harness, the script, and the small measurements of sections 4 to 7 |
| `variants/vector/FlatArrays.java`, `variants/forkjoin/FlatArrays.java` | two other vocabularies, measured beside the baseline; the model and the checks are compiled unchanged against each |

The flat program has 4,192 parameters in nine matrices inside one vector. The Java keeps that layout: a matrix is an offset into `double[] p`, a view of the Fortress (a transpose, a row, the per-head planes) is an index computation in a loop, and the gradient is written at the same offsets, which is the order of `flat` (`MicroGptFlat.fss:71`).

`python-comparison.md` beside this report is another worker's note, which timed this program beside the Python, NumPy and APL ones.

## 2. What it reproduces of the checks

`./run.sh` runs the five-step program, the quick check and the full check. Both checks read the same files as the Fortress checks (`apl/reference/dzaima/w/*.txt`, `apl/reference/dzaima/docs.txt`, `run-c/goldens/*`) by the same relative paths, assert the same values and use the same tolerances (loss and gradient 10^-12, finite differences 10^-8, loaders and the zero count 0).

    VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS
    VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS

The measured differences of the quick check's seven values:

| Check (`MicroGptFlatQuick.fss`) | Java | Reference | Difference | Tolerance |
|---|---|---|---|---|
| loader: max of P - P0 over 4192 | | | 0.0 | 0 |
| corpus rows 0..15 | | | 0.0 | 0 |
| batch 1 step 1 loss | 3.3659669475848517 | 3.365966947584851 | 8.9e-16 | 1e-12 |
| step 0 gradient, max over 4192 | | | 8.3e-17 | 1e-12 |
| zero gradient entries | 464 | 464 | 0 | 0 |
| P after Adam, max over 4192 | | | 1.9e-16 | 1e-12 |
| batch 1 step 2 loss | 3.4242727838717717 | 3.424272783871772 | 4.4e-16 | 1e-12 |

So the two losses agree with the references to 15 significant digits (the difference is at most 2 units in the last place of a double), and the gradient and the updated parameters to 1.9e-16 absolute. In the full check the five losses of batch 1, the batch-4 loss, the four single-document losses and the weighted mean differ from the references by at most 8.9e-16; the 22 finite-difference values differ from backpropagation by at most 5.2e-10 (tolerance 1e-8).

Walk's own run of the quick check prints `3.3659669475848513` and `3.424272783871772` for the two losses (`compile-ladder/plan-30/PROBES.md:29-30`, 2026-11-10). The Java differs from walk in the last digits: see section 3.

## 3. What could not be matched, and what was chosen

**The order of the sums longer than 16 terms, and only that.** Everything else the Java computes by the operations of the Fortress source in its order: a division stays a division (no reciprocal), no fused multiply-add, the masked attention entries and the padded rows are computed as the Fortress computes them, `10.0^(-5)` is the folded constant `1e-5` and `beta1^t` is `Math.pow`, as walk's native is (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:76-78`).

- The library's matrix product adds the terms of each element in ascending order of the summed index: `Matrix.mul` splits the summed dimension in sequence, and forks only the rows and the columns (`Library/FortressLibrary.fss:3044-3102`). The Java's products add in the same order. Only the first term differs in form (the library stores it, the Java adds it to 0.0), which cannot change a value other than the sign of a zero.
- The library's `DOT`, `SUM` and `BIG MAX` are reductions over a range. A range of more than `grainSize` = 16 elements splits at a power-of-two boundary and joins the two results (`Library/RangeInternals.fss:20`, `:1310-1327`); at most 16 elements fold left to right from the identity (`:1365-1373`). In the model at batch 1 the only sums of more than 16 terms are the softmax over the 27 logits (`sm` on line 61), which the library adds as (16 terms) + (11 terms). The Java adds all 27 left to right. That is the last-digit difference from walk above. The fork/join variant of section 6 adds them as the library does.
- With more than one document in a batch, `SUM vm` and the loss's `DOT` are also longer than 16.

**The parser is ported, not replaced.** `FlatData.parseFloat` accumulates the mantissa digit by digit in a double and scales once, so it is not correctly rounded. `./run.sh parse`:

    4192 numbers, 699 differ from Double.parseDouble, the worst by 2.0 ulp

So 699 of the 4,192 initial parameters that the flat program trains from are not the doubles nearest to the decimal text of the weight files. The Java uses the same arithmetic, so that it starts from the same parameters; with `Double.parseDouble` it would start from other ones. The loader check passes at tolerance 0 either way, because it reads `P0.txt` through the same parser.

**Decisions.** No decision of the curator covers these; each says which reading was acted on.

1. *Same operations per element, sums left to right.* The alternative, reordering sums or replacing divisions where the tolerance holds, would be faster in places (section 5) and was not taken in the baseline, so that a ratio of compiled Fortress to this program measures the implementation and not a different arithmetic. The Vector API variant shows what one reordering buys.
2. *Dense, as the Fortress.* All 16 positions of every document are computed, and all 16 by 16 attention entries, also those that the mask sends to exactly 0. Skipping them is an algorithmic saving open to both programs alike.
3. *Storage reused.* One step's arrays are allocated once per batch size and reused, and `adam` updates `p`, `m` and `v` in place, where the Fortress makes new arrays and returns three new vectors. What this saves was not measured.
4. *Products read the weights in place.* `x w^T` is a dot product of two rows. A version that copied each transposed weight matrix first, so that the inner loop ran along rows of both operands, measured the same within noise in one fork (step 109 against 101 microseconds, taken at different loads) and was dropped.
5. *No lambdas.* The row bodies are anonymous classes. With lambdas the first step of a cold JVM took 30 ms instead of 5 ms (one run each), the cost of the first lambda's bootstrap.
6. *The model reaches loops and sums through four seams* (`forRange`, `dot`, `sum`, `max` in `FlatArrays`), so that the two variants replace the vocabulary alone. After warm-up the step measured the same with and without the seams (101.9 against 100.9 and 102.5 microseconds, one or two forks each).

## 4. Timings of the baseline

### Method

- Machine: 4 CPUs, Intel Xeon @ 2.30GHz (AVX-512), 15 GB, a cloud container shared with other sessions, which were building and running throughout. The load average is given with every run; it was never below 1.
- JDK: OpenJDK 25.0.4.1 (`/usr/lib/jvm/java-25-openjdk-amd64`, the JDK of `experiment/env.sh`), 64-bit server VM, mixed mode, class-data sharing on. Flags: none; `JAVA_TOOL_OPTIONS` unset, as `env.sh` does. So: tiered compilation, G1, the default heap. The program has one thread; the JVM's compiler and collector threads run beside it on the other CPUs.
- In process, after warm-up (`Bench fork`): one fork is a fresh JVM. It loads the parameters, runs the three workloads below in turn for 4 s (2,600 to 3,000 rounds), then takes 30 samples of each, the workloads in turn so that a change of load reaches all three. A sample is the mean time of one call over a block of consecutive calls that fills about 20 ms (about 198 calls of `step1`, 35 of `train5`, 50 of `step4`), each call timed by `System.nanoTime` around it alone. Every loss and one element of the result are added to a sink. 10 forks. The harness prints the median of each fork's first and second half of samples; they agree within 3 microseconds for `step1` in every fork, so the warm-up had ended.
- Whole processes, cold: 30 runs of each program, the wall time from before the launch to after the exit, read from bash's `EPOCHREALTIME` around `java ... > /dev/null`. It includes the JVM's start, class loading, reading the corpus (2,000 lines) and the nine weight files, and for the checks the reference files.
- Reported: per fork the median; over the forks the median of the medians and their range; the smallest sample. Means are not reported: single samples reach 1.7 times the median when another process takes the CPU.

The workloads:

- `step1`: one `step` at batch 1 on document 0 at the initial parameters: the forward and the backward pass, loss and gradient (`MicroGptFlat.fss:51-72`). No `adam`.
- `train5`: what the flat program's `run` does after loading, from the initial parameters: five times `step` and `adam` at batch 1 on documents 0 to 4 (`MicroGptFlat.fss:91-96` without the `println`). Resetting `p`, `m`, `v` is outside the timed span.
- `step4`: one `step` at batch 4 on documents 0 to 3.

### Results

`./run.sh bench`, 2026-11-10, load average 1.05 before, 1.66 between the two halves, 1.84 after.

In process, after warm-up, microseconds per call, 10 forks of 30 samples:

| Workload | Median of the fork medians | Range of the fork medians | Smallest sample | Interquartile range inside a fork |
|---|---:|---:|---:|---:|
| `step1`, one step, batch 1 | 101.6 | 100.8 to 104.0 | 96.4 | 0.4 to 6.4 |
| `train5`, five steps with Adam | 566.2 (113.2 per step) | 563.5 to 570.2 | 544.8 | 2.9 to 32 |
| `step4`, one step, batch 4 | 407.3 (101.8 per document) | 404.6 to 411.8 | 393.2 | 2.3 to 42 |

Whole processes, cold, milliseconds, 30 runs each:

| Program | Median | Quartiles | Min | Max |
|---|---:|---:|---:|---:|
| a JVM that does nothing (`Bench nothing`) | 25.8 | 24.6 to 29.4 | 23.5 | 35.2 |
| `MicroGptFlat`, the whole run of the flat program | 71.9 | 66.1 to 78.3 | 62.2 | 102.1 |
| `MicroGptFlatQuick`, the 7 checks | 77.2 | 73.6 to 86.4 | 70.1 | 116.0 |
| `MicroGptFlatCheck`, the 40 checks | 161.5 | 153.7 to 170.2 | 137.7 | 186.2 |

The checks' own work, cold: the program's `total` line, from its first statement to its last check (the loads, the reference files and the steps; not the JVM's start), milliseconds, 30 runs:

| Program | Median | Quartiles | Min | Max |
|---|---:|---:|---:|---:|
| `MicroGptFlatQuick` total | 44.7 | 42.7 to 46.1 | 41.5 | 58.1 |
| `MicroGptFlatCheck` total | 123.3 | 115.2 to 127.1 | 104.8 | 177.7 |

The five steps of the cold five-step run, each `step` with its `adam`, milliseconds, 30 runs (median; min to max): step 1: 5.34 (5.16 to 8.71); step 2: 3.27 (2.74 to 12.95); step 3: 2.95 (1.84 to 4.10); step 4: 2.36 (1.42 to 3.46); step 5: 1.99 (1.32 to 3.00). A cold step runs in the bytecode interpreter and in code being compiled: about 20 to 50 times the warm step.

The cold whole-process numbers depend on the load more than the warm ones. Three earlier runs of this table, on an earlier version of the program and at loads between 2 and 4, gave medians of 74, 95 and 133 ms for the five-step run; the warm `step1` medians of those runs stayed between 100.3 and 103.0 microseconds.

### A first ratio to walk

The record's walk timing of the same quick check: `compile-ladder/plan-30/PROBES.md:29-31`, 2026-11-10, one thread: the two steps took 5,717 ms and 4,876 ms, the check 38 s as a process. P-29 rules that no judgement rests on walk's speed, so this is orientation only: against walk, the Java quick check is about 500 times faster as a process (38 s to 0.077 s), the Java's cold first step about 1,000 times (5.7 s to 5.3 ms), and a warmed step about 50,000 times (4.9 s to 0.10 ms). The runs were not taken together.

## 5. Vectorisation: what HotSpot did with the baseline's loops

**How this is known.** `hsdis` is not on this machine (`Loading hsdis library failed`). Without it, `-XX:CompileCommand=print` prints a compiled method's machine code as hex; `asm-count.py` cuts it per method, disassembles it with `objdump` and counts the double-precision arithmetic instructions by kind. `./run.sh asm` compiles each method alone (`dontinline`) so that the counts can be attributed. Beside it: the same timings with `-XX:-UseSuperWord`, and the Vector API variant. The debug build's traces are not in this product JDK: `-XX:+PrintOptoAssembly` is accepted and prints no listing.

    FlatArrays::mul       1288 bytes | packed double arithmetic: none       | scalar: 12
    FlatArrays::tMul      1592 bytes | packed double arithmetic: none       | scalar: 12
    FlatArrays::mulT      1072 bytes | packed double arithmetic: 2 on ymm   | scalar: 12
    FlatArrays::addMulT   1112 bytes | packed double arithmetic: 2 on ymm   | scalar: 13
    FlatArrays::dot        648 bytes | packed double arithmetic: 2 on ymm   | scalar: 12
    FlatArrays::sum        352 bytes | packed double arithmetic: none       | scalar:  6
    FlatArrays::addInto    648 bytes | packed double arithmetic: 5 on zmm   | scalar:  2
    FlatArrays::headsMul  1544 bytes | packed double arithmetic: none       | scalar: 12
    MicroGptFlat::rmsn     632 bytes | packed double arithmetic: none       | scalar:  9
    MicroGptFlat$6::run   1296 bytes | packed double arithmetic: 42 on zmm  | scalar: 28      (adam's loop)

No method has a fused multiply-add. By loop shape:

| Loop shape | Where | Vectorised by C2? | Evidence |
|---|---|---|---|
| `out[ro+j] += s * w[rw+j]`: two rows at different offsets | `mul`, `tMul`, `headsMul`, `headsTMul`: all the backward products | **No.** The two ranges could overlap in one array, and C2 in this JDK neither proves that they do not nor checks it at run time | no packed instruction; the same time with superword off (table below); `./run.sh axpy`: 0.42 to 0.71 ns per element at every length |
| the same loop with one index on two arrays, `o[j] += s * w[j]` (what rows as `double[][]` would give) | not in the baseline | yes, but it pays only for long loops | `./run.sh axpy`: 0.42, 0.19, 0.13 and 0.17 ns per element at lengths 16, 64, 256 and 4,096, against 0.71, 0.44, 0.39 and 0.42 |
| `s += a[i] * b[i]`: a sum of products | `mulT`, `addMulT`, `dot`: the forward products and the norms | **Half.** The products are packed four at a time (ymm); the additions stay one after another, because a `double` sum keeps its order. It does not pay: with superword off most of these loops are faster | 2 packed multiplies, scalar adds; `mulT` 16x16: 1.33 microseconds with, 1.10 without |
| `s += x[i]` | `sum` | no | none packed |
| elementwise, every array at the same index | `adam`'s loop, `addInto` | **Yes**, 8 doubles at a time (zmm), divisions and square roots included | 42 packed instructions; `adam` takes 10.8 microseconds with superword and 20.7 without |
| `out[oo+j] = x[xo+j] / r` and the other row loops of the model | `rmsn`, `rmsn_b`, `sm_b` | no (the offsets differ, as in the first row) | none packed |

So the step's hot loops, the products, run as scalar code: about 0.33 to 0.36 ns per multiply-add in the products of 16 by 16 (0.8 cycles at 2.3 GHz). Only Adam's update is vectorised. What the check's tolerance would allow: a vectorised sum of products changes the order of the additions; the Vector API variant below does that in `mulT` and `addMulT` and still passes every check, with differences no larger than the baseline's.

**Per operation**, each alone at the step's sizes at batch 1, microseconds per call, median of 3 forks' medians (`./run.sh kernels`: 250 ms of warm-up, then 10 samples of 10 ms; load 2.6 at the start and 4.7 at the end, the fork/join configurations of section 6 ran in the same rounds). In the `plain` column the three forks' medians agree within 8 % for every row but four (`mulT` for `pr`: 2.54 to 3.81; `addMulT` for `x2`: 1.27 to 1.66; `tMul` for `gW*`: 1.43 to 2.54; `onehotTMul`: 0.13 to 0.18).

| Operation, shapes, the model's value | plain | superword off | Vector API |
|---|---:|---:|---:|
| `mulT` 16x16 . (16x16)^T, `q`, `k`, `v` | 1.33 | 1.10 | 0.50 |
| `mulT` 16x16 . (64x16)^T, `m0` | 4.83 | 4.31 | 1.94 |
| `mulT` 16x16 . (27x16)^T, `pr` | 2.56 | 1.85 | 0.87 |
| `addMulT` 16x16 . (16x16)^T, `x2` | 1.40 | 1.13 | 0.56 |
| `addMulT` 16x64 . (16x64)^T, `x4` | 4.65 | 6.08 | 1.60 |
| `mul` 16x16 . 16x16, `dh` and the terms of `dX1` | 1.45 | 1.46 | 0.82 |
| `mul` 16x27 . 27x16, `dX4` | 2.38 | 2.40 | 1.35 |
| `mul` 16x16 . 16x64, `dM0` | 5.08 | 5.17 | 2.27 |
| `mul` 16x64 . 64x16, `dX3` | 5.47 | 5.64 | 2.98 |
| `tMul` (16x16)^T . 16x16, `gWQ`, `gWK`, `gWV`, `gWO` | 1.45 | 1.44 | 0.47 |
| `tMul` (16x27)^T . 16x16, `gLM` | 2.39 | 2.35 | 0.86 |
| `tMul` (16x16)^T . 16x64, `gF2` | 5.05 | 5.05 | 1.82 |
| `tMul` (16x64)^T . 16x16, `gF1` | 5.49 | 5.16 | 1.99 |
| `headsMulTScaleMask`, 4 planes | 1.55 | 1.54 | (plain) |
| `headsMulT`, 4 planes | 1.32 | 1.29 | (plain) |
| `headsMul`, 4 planes | 1.88 | 1.86 | (plain) |
| `headsTMul`, 4 planes | 1.56 | 1.56 | (plain) |
| `rows(sm)`, 64 rows of 16 (1,024 `exp`) | 7.44 | 7.46 | (plain) |
| `rows(sm)`, 16 rows of 27 (432 `exp`) | 3.08 | 3.16 | (plain) |
| `rows(sm_b)`, 64 rows of 16 | 0.63 | 0.64 | (plain) |
| `rows(rmsn)`, 16 rows of 16 | 0.31 | 0.31 | (plain) |
| `rows(rmsn_b)`, 16 rows of 16 | 0.63 | 0.68 | (plain) |
| `onehotTMul` 27x16 | 0.13 | 0.17 | (plain) |
| `adam`, 4,192 elements | 10.77 | 20.69 | (plain) |

Counted over the calls of one step, the products are about 65 % of the measured step and the two softmaxes about 10 %; the times of the operations alone add up to about 80 % of it. The harness's last row, the whole step timed in the same JVM after all the operations, is left out: there the step measured 130 to 152 microseconds, slower than in a JVM that runs only the step, so the step's time is the one of section 4.

**The Vector API variant** (`variants/vector/FlatArrays.java`; `jdk.incubator.vector` is in this JDK as an incubator module, `--add-modules jdk.incubator.vector`). It replaces the four products only: `mul` and `tMul` add each element's terms in the baseline's order (a lane per element, no fused multiply-add), `mulT` and `addMulT` split each dot product over the lanes and add the lanes at the end. It passes the 7 and the 40 checks (`./run.sh variants`); its measured differences are 4.4e-16 on both quick losses, 8.3e-17 on the gradient, 5.6e-17 on the parameters after Adam, at most 8.9e-16 on any loss and 5.2e-10 on any finite difference of the full check.

The whole step, by the method of section 4 with 5 forks and the configurations in turn inside each fork (`./run.sh steps`; load 4.5 at the first fork, 2.1 at the last, the fork/join configurations of section 6 in the same rounds), microseconds, median of the fork medians (range), and the smallest sample:

| Configuration | `step1` | min | `train5` | min | `step4` |
|---|---:|---:|---:|---:|---:|
| plain, the baseline | 101.4 (100.9 to 103.9) | 98.9 | 563.7 (562.2 to 582.0) | 552.9 | 407.1 (404.8 to 413.4) |
| plain, `-XX:-UseSuperWord` | 97.6 (97.6 to 98.7) | 94.7 | 600.8 (596.3 to 603.9) | 582.2 | 414.4 (409.9 to 424.6) |
| Vector API in the four products | 75.5 (70.4 to 76.9) | 68.5 | 431.0 (415.2 to 478.9) | 405.1 | 305.8 (284.0 to 310.5) |

So with superword off the step alone is 4 % faster (the half-vectorised dot products) and the five steps with Adam 7 % slower (Adam's loop). The Vector API in the products alone takes a quarter off the step. The products alone are 1.8 to 3 times faster with it, less than the 8 lanes, because rows of 16 are two vectors long.

### What is not optimal in the baseline

P-7 calls the pure-Java program "the optimal result". This one is the careful scalar program that the brief asked for: `double[]`, plain loops, one thread, the arithmetic of the Fortress. It is not the fastest Java for this model. Measured here: the Vector API in the products gives 75 against 101 microseconds. Not measured: explicit vectors in the other loops, the `exp` of the softmax in vectors, skipping the masked and the padded entries, a batch larger than 1 per step.

## 6. Fork/join: the baseline in the shape of the library and the compiled runtime

`variants/forkjoin/FlatArrays.java` gives the vocabulary's loops and sums the shape that the Fortress library and its compiled runtime give parallel work, on a `java.util.concurrent.ForkJoinPool`. What a piece computes once it is no longer split is the baseline's plain loop, so its time is a floor for what compiled Fortress could reach with this structure and unboxed arrays.

| Shape | In the tree | In the variant |
|---|---|---|
| a parallel range | `Library/RangeInternals.fss:1310-1345`: a range of more than `grainSize` = 16 elements (`:20`) splits at the highest power-of-two boundary inside it; the two parts are the arms of a `do ... also do` | `forRange`, used by the model's row loops (`rows(rmsn)`, `rows(sm)`, ...), by `adam`'s loop over the 4,192 elements, by the loop over the planes and by the elementwise passes |
| a reduction | the same split, the two results joined; at most 16 elements fold left to right (`:1365-1373`) | `dot`, `sum`, `max`: no shared accumulator |
| the matrix product | `Library/FortressLibrary.fss:3044-3102`: the largest of the three dimensions is halved by `partition` (the largest power of two below it); the halves of the rows and of the columns are forked, the halves of the summed dimension run in sequence; it stops at one element | `mma`, under `mul`, `mulT`, `addMulT`, `tMul` and on each plane under the three `heads*` |
| the arms | `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1717-1770` and `runtimeSystem/BaseTask.java`: every arm but the first becomes a task object; `forkIfProfitable` forks it if the pool has more than one thread and the worker's surplus of queued tasks is at most the spawn threshold (5, `FortressExecutable.java:26`); the first arm runs in place; `joinOrRun` joins the task or runs it in place | `Arm`: the same two methods; the program's body runs as a task of the pool |

Not given the shape: `gatherAdd`, `onehotTMul`, `addInto` and the elementwise loops written in `step` itself stay plain loops, and `onehotTMul` stays a scatter where the Fortress multiplies by a 0/1 matrix.

**Grains.** `baseline.grain` is the range's grain and `baseline.mmgrain` the product's: a product whose three dimensions are all at most that is one plain block. The library's own are 16 for the range and 1 for the product, which has no grain: it forks down to single elements. Timed: the library's (16, 1); (16, 16), the product given the range's grain, at which a 16x16x16 product is one block and only the 27 and 64 dimensions split; and (4, 4), finer, at which the model's sizes do split.

**The order of the sums against the plain loop.** The product's halving does not change it at any grain: the summed dimension is split in sequence. The range's halving changes every sum longer than the grain: at grain 16 the softmax sum over 27 logits, as in the library; at grain 4 every sum of 16 as well. Every configuration passes the 7 and the 40 checks (`./run.sh variants`: 9 configurations, threads 1, 2, 4 by the three grains). Measured differences, for example at 4 threads and the library's grains: the two quick losses 0.0 and 4.4e-16, gradient 1.1e-16, parameters after Adam 2.8e-16; the full check's largest loss difference 8.9e-16 and largest finite difference 6.1e-10.

**The whole step**, by the method of section 4, 5 forks, in the same rounds as the table of section 5 (load 4.5 to 2.1; the machine's four CPUs were shared with other sessions, so the 4-thread rows had less than four CPUs). Microseconds, median of the fork medians (range), and the smallest sample:

| Threads | Grain: range, product | `step1` | min | `train5` | `step4` |
|---:|---|---:|---:|---:|---:|
| (plain) | | 101.4 (100.9 to 103.9) | 98.9 | 563.7 | 407.1 |
| 1 | 16, 1 (the library's) | 2,652 (1,961 to 3,239) | 1,893 | 13,430 | 10,574 |
| 1 | 16, 16 | 143.2 (142.5 to 145.5) | 139.4 | 862.0 | 579.7 |
| 1 | 4, 4 | 258.9 (255.3 to 267.8) | 248.4 | 1,414 | 1,036 |
| 2 | 16, 1 (the library's) | 5,633 (5,259 to 6,201) | 4,415 | 28,735 | 18,522 |
| 2 | 16, 16 | 255.2 (250.0 to 284.4) | 213.1 | 1,561 | 977.5 |
| 2 | 4, 4 | 874.9 (775.7 to 900.5) | 411.7 | 4,733 | 2,156 |
| 4 | 16, 1 (the library's) | 8,251 (7,936 to 8,583) | 6,939 | 41,385 | 24,359 |
| 4 | 16, 16 | 482.1 (460.8 to 497.2) | 304.3 | 2,818 | 1,408 |
| 4 | 4, 4 | 2,340 (2,099 to 2,437) | 1,486 | 12,094 | 4,067 |

At the model's sizes the fork/join shape loses in every configuration, and more threads lose more:

- At the library's grains and one thread, where nothing is forked, a step takes 19 to 32 times the plain step: the product recurses to single elements and makes a task object for each second arm. At 2 and 4 threads the tasks are forked and it takes 55 and 80 times.
- With the product's grain at 16, one thread costs 1.4 times the plain step (the recursion over the 27 and 64 dimensions, `adam` in 262 pieces of 16), 2 threads 2.5 times, 4 threads 4.8 times.

**Per operation**, as in section 5, microseconds, median of 3 forks' medians (`./run.sh kernels`). `fjT` is T threads; the column head gives the two grains.

| Operation | plain | fj1 16,1 | fj1 16,16 | fj1 4,4 | fj2 16,1 | fj2 16,16 | fj2 4,4 | fj4 16,1 | fj4 16,16 | fj4 4,4 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| `mulT` 16x16 . (16x16)^T | 1.33 | 42.3 | 1.09 | 4.12 | 202 | 1.23 | 10.3 | 323 | 1.05 | 21.8 |
| `mulT` 16x16 . (64x16)^T | 4.83 | 164 | 8.68 | 16.5 | 470 | 19.7 | 49.8 | 500 | 17.6 | 83.6 |
| `mulT` 16x16 . (27x16)^T | 2.56 | 69.5 | 3.39 | 7.65 | 235 | 6.52 | 24.8 | 256 | 7.05 | 33.8 |
| `addMulT` 16x16 . (16x16)^T | 1.40 | 41.5 | 2.38 | 4.15 | 110 | 2.06 | 16.3 | 205 | 2.20 | 36.7 |
| `addMulT` 16x64 . (16x64)^T | 4.65 | 226 | 8.76 | 17.7 | 572 | 8.56 | 64.6 | 746 | 8.48 | 115 |
| `mul` 16x16 . 16x16 | 1.45 | 40.9 | 2.38 | 5.38 | 126 | 2.56 | 12.8 | 171 | 2.44 | 35.1 |
| `mul` 16x27 . 27x16 | 2.38 | 67.1 | 3.92 | 8.92 | 281 | 3.99 | 24.2 | 302 | 3.97 | 64.2 |
| `mul` 16x16 . 16x64 | 5.08 | 179 | 9.36 | 20.9 | 357 | 27.2 | 39.4 | 528 | 41.9 | 67.0 |
| `mul` 16x64 . 64x16 | 5.47 | 164 | 9.24 | 20.7 | 479 | 9.21 | 50.9 | 999 | 9.72 | 140 |
| `tMul` (16x16)^T . 16x16 | 1.45 | 39.8 | 1.39 | 4.36 | 106 | 1.48 | 9.78 | 199 | 2.08 | 25.8 |
| `tMul` (16x27)^T . 16x16 | 2.39 | 63.7 | 3.54 | 7.56 | 190 | 5.90 | 16.9 | 249 | 7.16 | 32.0 |
| `tMul` (16x16)^T . 16x64 | 5.05 | 145 | 8.41 | 17.5 | 523 | 32.0 | 35.3 | 426 | 33.1 | 60.4 |
| `tMul` (16x64)^T . 16x16 | 5.49 | 147 | 8.34 | 17.6 | 519 | 20.2 | 37.4 | 410 | 31.2 | 50.3 |
| `headsMulTScaleMask`, 4 planes | 1.55 | 44.8 | 3.08 | 6.26 | 193 | 15.3 | 18.6 | 257 | 36.6 | 38.4 |
| `headsMulT`, 4 planes | 1.32 | 42.5 | 4.42 | 4.57 | 194 | 4.38 | 12.7 | 243 | 4.30 | 37.2 |
| `headsMul`, 4 planes | 1.88 | 39.9 | 1.75 | 4.82 | 217 | 4.17 | 11.5 | 283 | 4.11 | 27.1 |
| `headsTMul`, 4 planes | 1.56 | 39.4 | 1.39 | 4.47 | 239 | 3.60 | 12.9 | 301 | 4.15 | 39.1 |
| `rows(sm)`, 64 rows of 16 | 7.44 | 5.30 | 5.29 | 7.56 | 9.19 | 12.2 | 31.3 | 14.2 | 11.7 | 41.0 |
| `rows(sm)`, 16 rows of 27 | 3.08 | 2.48 | 2.50 | 3.17 | 8.38 | 11.6 | 16.8 | 22.7 | 36.3 | 25.2 |
| `rows(sm_b)`, 64 rows of 16 | 0.63 | 1.22 | 1.21 | 2.59 | 2.84 | 3.26 | 14.2 | 8.70 | 4.99 | 23.4 |
| `rows(rmsn)`, 16 rows of 16 | 0.31 | 0.31 | 0.31 | 0.73 | 0.42 | 0.37 | 4.24 | 0.44 | 0.36 | 7.36 |
| `rows(rmsn_b)`, 16 rows of 16 | 0.63 | 0.93 | 1.01 | 1.46 | 0.94 | 0.92 | 7.95 | 0.99 | 1.05 | 14.7 |
| `adam`, 4,192 elements | 10.77 | 24.6 | 24.6 | 21.2 | 40.0 | 39.5 | 51.4 | 50.0 | 65.3 | 73.9 |

Read per operation:

- **The products.** At the library's grain every product loses by 27 to 50 times at one thread and by 75 to 240 times at four. With the product's grain at 16, a 16x16x16 product is one block and ties with the plain loop; the products with a 27 or a 64 dimension split into 2 to 4 blocks and lose 1.3 to 1.9 times at one thread; where they then fork (2 and 4 threads) some lose 4 to 8 times, since one fork and join costs more than the 1 to 2 microseconds of a block.
- **The row loops.** 16 rows are at the grain and do not split: `rows(rmsn)` ties. 64 rows split into four pieces: with threads, `rows(sm)` over the 64 attention rows goes from 7.4 to 9 to 14 microseconds. At one thread the two softmaxes measure faster in this variant than plain (5.3 against 7.4); the cause was not found.
- **Adam.** 4,192 elements at grain 16 are 262 pieces: 2.3 times the plain loop at one thread (the pieces are too short for the vector loop that the plain version gets), 3.7 times at two threads, 4.6 to 6 times at four.

**Where threads start to pay**, by scaling one product and one dot product (`./run.sh scale`, one fork, 10 samples; load 2.0 throughout). Microseconds, median; n is the side of a square product, the dot product has n^2 elements. "64" is a product grain of 64 with a range grain of 1,024.

| n | plain `mul` | fj1 16,16 | fj2 16,16 | fj4 16,16 | fj2 "64" | fj4 "64" | fj1 16,1 | fj4 16,1 |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 16 | 2.16 | 2.09 | 2.08 | 2.09 | 2.09 | 2.09 | 35.3 | 192 |
| 32 | 14.3 | 18.5 | 33.8 | 56.4 | 15.1 | 15.2 | 277 | 709 |
| 64 | 102 | 151 | 160 | 185 | 115 | 114 | 2,257 | 3,465 |
| 128 | 874 | 1,233 | 784 | 774 | 893 | 614 | 17,392 | 17,937 |
| 256 | 6,298 | 9,642 | 6,895 | 5,240 | 4,197 | 3,332 | | |
| 512 | 58,922 | 93,699 | 51,047 | 33,142 | 32,022 | 22,635 | | |

| Elements | plain `dot` | fj1 grain 16 | fj2 grain 16 | fj4 grain 16 | fj2 grain 1,024 | fj4 grain 1,024 |
|---:|---:|---:|---:|---:|---:|---:|
| 256 | 0.18 | 0.19 | 2.36 | 14.6 | 0.19 | 0.19 |
| 1,024 | 0.89 | 0.73 | 4.04 | 20.4 | 0.89 | 0.90 |
| 4,096 | 3.74 | 3.04 | 9.36 | 24.7 | 9.44 | 22.6 |
| 16,384 | 15.2 | 12.2 | 28.1 | 38.1 | 27.3 | 41.6 |
| 65,536 | 61.2 | 47.9 | 87.0 | 86.4 | 60.0 | 78.8 |
| 262,144 | 250 | 217 | 282 | 253 | 169 | 172 |

So on this machine, at this load: a square product starts to gain from threads at about 128 by 128 with blocks of 64 (0.1 ms of work per task), and reaches 1.9 times at 256 and 2.6 times at 512 with four threads; at a product grain of 16 it gains less (1.1 times at 128, 1.8 times at 512), and at the library's own grain of 1 it never gains in the measured range (20 times slower at 128, at any thread count). A dot product gains only at about 260,000 elements with a grain of 1,024, and at the library's grain of 16 threads never gain in the measured range. The model's products are 16 by 16 to 64 by 16 and its sums 16 or 27 long: about three orders of magnitude of work below where forking pays. One oddity for a reader of sums: at one thread the halved dot product is faster than the plain loop from 1,024 elements on (3.0 against 3.7 microseconds at 4,096); the cause was not looked for.

## 7. The rehearsal's loop

`compile-ladder/plan-31/probes/switch-rehearsal.md`, section 5, gives the first compiled Fortress program with an array that ran against the interpreter's library: `DotU`, two arrays of 1,000 `RR64` and the loop `s += a[i] b[i]` over them run 5,000 times, 5 million iterations. `DotU.java` is that loop in plain Java with `double[]`, the same sizes and count; the rehearsal's source is not in the tree, so the fill (`a[i] = i`, `b[i] = 1.0`) is the one that gives its printed values, and it prints the same `total = 2.4975E9`. `./run.sh dot`, load 2.0 before and 1.9 after:

| What | Time |
|---|---|
| Fortress under walk, whole process (the rehearsal's one timing) | 39.8 s |
| Fortress compiled against the one library, whole process, the verifier off (the rehearsal's one timing) | 1.4 s |
| Java, whole process, 30 runs | median 44.3 ms (quartiles 42.5 to 46.6, min 40.0, max 53.5) |
| Java, the loops' own time in a cold JVM, 30 runs | median 7.47 ms (7.04 to 8.76) |
| Java, in process after 2 s of warm-up, 5 forks of 30 samples | fork medians 4.37 to 4.50 ms (min 4.23), 0.87 ns per iteration |

The two Fortress numbers are another worker's single timing, in another session, at another load (3.7 to 4.8), not taken with the Java's. That report puts a one-line program at 0.6 s compiled and 3.8 s under walk, so about 0.8 s and 36 s for the loop. Against the Java's cold loop of 7.5 ms that is of the order of 100 times for compiled Fortress and of 5,000 times for walk; as whole processes, of the order of 30 and 900 times. These are orders of magnitude and no more.

## 8. The lines of the Fortress that were hardest to read as an algorithm

- `MicroGptFlat.fss:59`, `a = rows(sm, mask + (qh kh^T) / SQRT (1.0 headDim)); hc = u(a vh)`. Three things on it are not visible from the line: the juxtaposition of two rank-3 arrays is a product on every pair of planes (`FlatArrays.fss:127`), `^T` on a rank-3 array transposes every plane (`MicroGptFlat.fss:24`), and `mask +` adds one matrix to every plane (`FlatArrays.fss:135`). Every operand has the type `Array[\RR64,(ZZ32,ZZ32,ZZ32)\]`, so no shape is on the page; the shapes had to be worked out from `heads` (`FlatArrays.fss:84-96`), whose index arithmetic `(q DIV nh) p + i, (q MOD nh) k + j` is itself juxtaposition for multiplication between integer names.
- `MicroGptFlat.fss:66`, `dS = rows(sm_b, a, dh vh^T) / SQRT (1.0 headDim)`: which of the four `rows` it is (the one over two rank-3 arrays), and that `dh vh^T` groups as `dh (vh^T)`.
- `MicroGptFlat.fss:63`, `diag(vm / nv) (pr - onehot(tg, vocabSize))`: a juxtaposition of a diagonal object and a matrix that scales the rows; `MicroGptFlat.fss:70`, a scatter-add written as a product with a transposed 0/1 matrix.
- `MicroGptFlat.fss:32`, `(dy - y ((y DOT dy) / |y|)) / r`: `y (...)` reads as an application and is a scaling; `|y|` is the number of elements, not a norm.
- The order in which a sum is added is on no line of the model. It took the library's `Matrix.mul`, `Vector.dot` and the range's `generate` to learn that a product adds in sequence and a dot product over more than 16 elements does not.
- `MicroGptFlat.fss:18`, `10.0^(-5)`: whether it is `Math.pow` at run time or a folded constant decides the last bit of `epsilon`; the skill's rule on numerals settles it (folded).

## 9. For the record

**Defects.** None found in the tree. One property of the model's data path that the record may want as a fact: `FlatData.parseFloat` is not correctly rounded (section 3); no check depends on it.

**Sentences of the specification made false.** None: nothing outside this folder changed, except one line of `coordinator/INDEX.md`.

**Points to report.** The brief named none beyond the final message's items.

**For FACTS** (the brief did not let this work write FACTS):

1. A pure-Java microGPT, the baseline that P-7 names, is in `java-baseline/` and passes the flat program's 7 quick and 40 full checks at their tolerances; one step at batch 1 takes about 0.10 ms after warm-up on this machine (fork medians 100.8 to 104.0 microseconds, 10 forks, 2026-11-10), the five-step run 72 ms and the quick check 77 ms as cold processes (medians of 30). Meaning: the distance of compiled microGPT to Java can be measured as soon as the flat program compiles. Shown by `java-baseline/run.sh` and `run.sh bench`; detail in sections 2 and 4.
2. The baseline's hot loops are scalar: HotSpot's C2 in OpenJDK 25 vectorises none of its matrix products, and the Vector API in the products alone brings the step from 101 to 75 microseconds. Meaning: the baseline is the careful scalar Java, not the fastest Java. Shown by `run.sh asm` and `run.sh steps`; detail in section 5.
3. In the fork/join shape of the library and the compiled runtime, with unboxed arrays and plain loops at the leaves, the model's step is 19 to 80 times slower than the plain loop at the library's grains (16 for a range, 1 for the matrix product) and 1.4 to 4.8 times slower with the product's grain at 16; threads gain only from products of about 128 by 128. Meaning: at microGPT's sizes the library's parallel shape costs time at any thread count, and the matrix product's missing grain is the largest part of it. Shown by `run.sh steps`, `run.sh kernels`, `run.sh scale`; detail in section 6.
4. 699 of the 4,192 parameters that `FlatData.parseFloat` reads differ from the nearest double of their text, by up to 2 ulp. Meaning: a port of the model must port the parser to start from the same parameters. Shown by `java-baseline/run.sh parse`; detail in section 3.

**Commands.** `java-baseline/run.sh` with no argument runs the three programs; `quick`, `check`, `run` one of them; `bench [forks] [processes]` section 4; `asm`, `kernels [forks]`, `steps [forks]`, `scale`, `axpy` sections 5 and 6; `variants` every check on both variants; `dot` section 7; `parse` section 3. To read machine code without `hsdis`: `java -XX:+UnlockDiagnosticVMOptions -XX:CompileCommand=print,Class::method ... | java-baseline/asm-count.py`.

**Questions for the curator.** One decision not taken: whether the baseline that P-7 names is this scalar program or the fastest Java that keeps the checks. Acted on: the scalar program, as the brief says ("the one-thread plain-loop program stays the baseline"), with the Vector API variant measured beside it.

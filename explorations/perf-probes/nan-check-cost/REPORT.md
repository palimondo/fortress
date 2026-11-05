<!-- Probe of 2026-11-05 for the curator's decision on a float compared with a NaN (review `explorations/reviews/nan-comparison-2026-11-05.md`, option (b)), an Opus worker in a worktree seeded from the base build `/home/user/fortress-base25` at `dc571c1f3`, removed after. Only this report and the probe program are committed; the helper change stayed in the worktree. The worker returned this text, and the coordinating session wrote it to the file word for word, since the harness refused the worker's own write. -->

# The cost of a NaN check in the compiled float comparisons

## The question

What does it cost, in running time on the compiled path, if `<`, `<=`, `>` and `>=` on `RR64` raise `FloatingComparisonError` at a NaN, instead of answering `false`?

The compiled path builds these four operators on the helpers `doubleLT`, `doubleLE`, `doubleGT` and `doubleGE` of `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java` (`CompilerBuiltin.fss:207-210`, `:940-943`; review, section 2.2). The probe changed these four helpers and measured the change.

## The program

`NanCheckCost.fss`, beside this report. It runs 50,000,000 comparisons `x < y` of two `RR64` variables in a `while` loop and counts the true results. `x` and `y` follow two logistic maps (`x := 3.9 x (1.0 - x)`), so they never become a NaN, and the branch on the result is not predictable. The loop runs twice in one JVM. Each round prints its count and its time by `nanoTime`. Round 2 is the loop after warm-up. The count is 26,440,006 in every run, before and after the change.

## The change

Each of the four helpers got one line before its comparison:

    if (Double.isNaN(a) || Double.isNaN(b)) throw com.sun.fortress.compiler.runtimeValues.Utility.makeFortressException("fortress.CompilerLibrary$FloatingComparisonError");

The name is the compiled class of the prelude's object `FloatingComparisonError` (`Library/CompilerLibrary.fss:239`, `CompilerLibrary.fsi:99`), as `simpleIntArith.intDiv` names `fortress.CompilerBuiltin$DivisionByZero`. A check program put `nan < 1.0` and `1.0 >= nan` each inside a `try` with `catch e FloatingComparisonError => ...`. It printed "raised FloatingComparisonError" for both, and `1.0 < 2.0` printed `true`. So the raise reaches a Fortress `catch` on the compiled path.

## The results

Five runs of `bin/fortress run NanCheckCost` each. Wall time is the whole JVM run, both rounds, 100M comparisons. Times are in seconds; the median is in bold.

| build | round 2 (50M comparisons) | wall (whole run) |
|---|---|---|
| A0: seeded caches, today's helpers | 2.807, 2.845, **2.869**, 2.943, 2.974 | 7.127, 7.202, **7.616**, 7.813, 7.889 |
| A: rebuilt, today's helpers | 2.761, 2.839, **2.859**, 2.875, 2.961 | 6.595, 6.754, **6.821**, 6.834, 7.050 |
| B: rebuilt, helpers with the NaN check | 2.716, 2.777, **2.838**, 2.841, 2.913 | 6.515, 6.721, **6.723**, 6.805, 6.842 |

- A and B differ only in the four helpers. Both were built the same way: `ant compileAll`, which emptied the caches, then the library order, then a compile of the program.
- A0 is the first baseline, run on the caches copied from the base build. Its round 1 took about 4.0 to 4.7 s, against about 3.6 s in A and B. The cause is not known. So A, not A0, is the baseline for the comparison.
- The medians: A 2.859 s, B 2.838 s for round 2; A 6.821 s, B 6.723 s for the wall time.
- The cost per comparison: (2.838 - 2.859) s / 50M = -0.4 ns from round 2, and (6.723 - 6.821) s / 100M = -1.0 ns from the wall time. Both are below the noise: the five runs of one build spread over 0.2 s in round 2, which is 4 ns per comparison. So the check costs nothing that this program can measure.
- One iteration of the loop costs about 57 ns (2.86 s / 50M). The compiled path boxes every `RR64`, and that dominates (F-11).

## Inlining

One run of each build with `-XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation -XX:+PrintInlining` in `JAVA_FLAGS`:

- A: `simpleDoubleArith::doubleLT (12 bytes)` is inlined by C1 and by C2 (`inline`, `inline (hot)`), inside the generated wrapper `native.com.sun.fortress.nativeHelpers.simpleDoubleArith::doubleLT (15 bytes)`.
- B: `doubleLT (32 bytes)` is not inlined by C1 ("failed to inline: callee is too large"), but C2 inlines it in the hot loop: `doubleLT (32 bytes) inline (hot)`, with both `java.lang.Double::isNaN` calls `inline (hot)`, inside `fortress.CompilerBuiltin::\^`, the prelude's `<`.

So in both builds the hot loop runs the helper inlined. The machine code was not read.

## The model program

Step 3 was skipped. microGPT does not compile on this base. `bin/fortress compile MicroGptFlatQuick.fss` in `explorations/run-c4/src/` stopped with "File MicroGptFlatQuick.fss has 87 errors." (exit 255). The first error is "ImmutableArray is undefined." at `Library/System.fsi:26`, and then "Array is undefined." in `FlatArrays.fsi`. This agrees with the review's sections 5 and 6.

## What it means for option (b)

The review's estimate holds: on today's compiled path the NaN test is noise. This probe does not settle the case the review leaves open: unboxed arrays (P-84), where a loop that can throw may stop the JVM from vectorising it.

## The machine

- `nproc`: 4. CPU: Intel(R) Xeon(R) Processor @ 2.10GHz.
- `java -version`: openjdk version "25.0.4.1" 2026-08-18, OpenJDK 64-Bit Server VM (build 25.0.4.1+1-1-24.04.4-Ubuntu, mixed mode, sharing).
- Load average 0.3 to 1.9 during the runs. No other agent ran.
- `FORTRESS_THREADS=1`, `JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=$PWD/tmp"`.

## The commands

The base commit of the worktree is `dc571c1f3`.

    explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base25 /home/user/fortress-nanprobe - dc571c1f3
    # set-up lines of references/build-and-caches.md, in the worktree
    cd explorations/perf-probes/nan-check-cost
    ../../../bin/fortress compile NanCheckCost.fss
    for k in 1 2 3 4 5; do s=$(date +%s.%N); ../../../bin/fortress run NanCheckCost; e=$(date +%s.%N); echo "wall $(echo "$e - $s" | bc)"; done   # A0
    # edit the four helpers (above), then:
    ant compileAll        # "Caches ... started again, empty"
    # the library order: AnyType, CompilerBuiltin, CompilerLibrary, CompilerAlgebra, CompilerSystem
    ../../../bin/fortress compile NanCheckCost.fss
    # the same loop of five runs                                                                              # B
    # revert the helpers, ant compileAll, the library order, compile the program, the same loop of five runs # A
    JAVA_FLAGS="$JAVA_FLAGS -XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation -XX:+PrintInlining" ../../../bin/fortress run NanCheckCost

`/usr/bin/time` is not installed in the container, so the shell's `date` timed each run.

## The same check on unboxed doubles, in Java

The curator asked what the check would cost once floats are unboxed, as in a future `double[]` array store (P-84), where the boxing that dominates the measurement above is gone. Java is the stand-in: the compiled code is JVM bytecode, and HotSpot optimises both the same way. A second Opus worker wrote and ran `NanVec.java`, beside this report, in `tmp/nan-java/`, and returned this text, which the coordinating session wrote here word for word in its substance.

Three loops over two `double[]` arrays of 16M elements, filled from a logistic map so that no NaN occurs and the branch is not predictable, each counting how many `a[i] < b[i]` (the count is 8,387,782 in every run): (1) the plain comparison; (2) the comparison guarded by a NaN check that throws `ArithmeticException("FloatingComparisonError")`, as the Fortress helper would; (3) the comparison with a check that records a NaN in a flag, tested once after the loop. Each loop warmed up for 20 passes, then 10 timed passes; the median per element, in nanoseconds, two runs of the whole set:

- (1) plain, default flags: 1.852 and 1.742. With `-XX:-UseSuperWord`: 1.764 and 1.741.
- (2) the throwing check, default flags: 2.064 and 2.173. With `-XX:-UseSuperWord`: 2.049 and 2.033.
- (3) the flag check, default flags: 2.030 and 2.036. With `-XX:-UseSuperWord`: 2.035 and 2.044.

What it means:

- Turning SuperWord off, which turns off auto-vectorisation, changes no loop beyond the noise. So HotSpot 25's C2 vectorised none of the three loops, the plain one included: it does not vectorise this loop shape, a conditional count over double compares. So the throwing check could not stop a vectorisation here, because there was none to stop. That question stays open.
- Both checks cost about 0.3 ns per element over the plain loop, 15 to 20 percent, from the two extra loads and compares and the branch. The flag variant costs the same as the throwing one here.
- At 16M elements a pass reads 256 MB in about 29 ms, about 9 GB/s, near memory bandwidth, which hides compute differences. With 64K elements, which sit in cache, and a branchless count (`c += (a[i] < b[i]) ? 1 : 0`, `NanVecB`), the plain loop runs 0.93 ns per element and both checks about 1.33, about 40 percent more; SuperWord still makes no difference to the plain loop.
- C2 compiled every loop at tier 4; no deoptimisation in the timed phase. `-XX:+PrintAssembly` is unavailable (no hsdis), so the machine code was not read, and the claim that nothing was vectorised rests on the `-UseSuperWord` timings alone.
- A control, an add-and-store loop `r[i] = a[i] + b[i]` (`NanVecS`), did not separate cleanly and gets no weight.
- Open for a later probe: whether a loop that HotSpot does vectorise, an element-wise store loop in a method of its own on cache-resident arrays, loses its vector form when a throwing NaN check is added.

Machine: 4 cores, Intel Xeon at 2.10 GHz with AVX-512; OpenJDK 25.0.4.1; load under 0.3; no other work ran. Commands, in `tmp/nan-java/`: `javac -d . NanVec.java`; `java -Xmx1g NanVec` and `java -Xmx1g -XX:-UseSuperWord NanVec`, twice each; `java -Xmx1g -XX:+UnlockDiagnosticVMOptions -XX:+PrintCompilation NanVec <k>` for each loop.

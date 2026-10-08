<!-- What the transaction checks cost on the compiled path, measured 2026-10-08 by a delegated worker for the coordinator. Compiled path only; no walk timing. Nothing tracked outside this directory was changed: the checks were removed by a class-path shadow built from inATransaction-false.patch. Command: run.sh beside this file. -->

# What the transaction checks cost on the compiled path

Compiled code keeps each mutable variable in a `MutableFValue` cell. Before each read and each write of the cell, the generated code calls `BaseTask.inATransaction()`. For a local this is in `compiler/codegen/VarCodeGen.java:483-546`, for a field in `:620-726`. This note measures what share of a compiled loop's time these calls take today.

## 1. The answer

Each loop was timed in fresh JVMs, as a pair:
- "with checks" is the tree as it is;
- "without" has the checks removed by a shadow (§ 2).

How to read the table:
- Times are nanoseconds per loop iteration, or per element for TxArray.
- Each time is the median of 15 runs per variant, with the range (min-max) in brackets.
- "Pairs" is the difference inside each pair of runs, taken one after the other.
- All figures are for the third timed loop in each JVM, after the JIT's warm-up.

| program | with checks | without | difference | pairs | share | checks per iteration |
| --- | --- | --- | --- | --- | --- | --- |
| TxScalar, the scalar loop | 20.42 (19.28-22.21) | 18.67 (16.42-19.99) | 1.75 | 1.96 (0.11-3.99) | 9 % | 2 |
| TxArray, the array loop | 23.17 (22.07-25.38) | 8.39 (8.17-9.05) | 14.79 | 14.60 (13.75-16.81) | 64 % | 7 |
| TxCell, the bare cell | 17.42 (16.30-19.04) | 14.56 (13.73-19.20) | 2.86 | 2.67 (-2.23-4.63) | 16 % | 2 |

- In the array loop, the checks take about two thirds of the time. Without them the loop runs 2.8 times as fast. The difference is far above the noise: every pair differs by 13.75 ns or more.
- In the scalar loop, the checks take about a tenth of the time. That difference is about as large as the spread between runs.
- One check costs about 2 ns in the array loop (14.79 / 7), and about 1 to 1.5 ns in the two scalar loops.
- The second timed loop shows the same:
  - TxScalar: 22.54 against 20.80 (1.74 ns, 8 %).
  - TxArray: 23.26 against 9.49 (13.77 ns, 59 %).
  - TxCell: 18.55 against 16.48 (2.07 ns, 11 %).
- The first timed loop includes the JIT's warm-up, as the earlier readings' single loops did:
  - TxScalar: 38.40 against 36.02 (2.39 ns, 6 %).
  - TxArray: 26.13 against 12.78 (13.35 ns, 51 %).
  - TxCell: 34.30 against 31.23 (3.07 ns, 9 %).
- Two earlier sessions of the same script, on the same day, agree (third loop; the first session had 7 runs per variant, the second 15):
  - TxScalar: 2.42 ns (11 %) and 3.08 ns (15 %).
  - TxArray: 14.15 ns (63 %) and 14.37 ns (63 %).
  - TxCell: 2.86 ns (16 %) and 3.17 ns (18 %).
- So the scalar loop's share lies between about 9 % and 15 %.

The programs, all in this directory:
- `TxScalar.fss` is the loop of `perf-probes/boxing/bench1t.fss`, which was removed in `fc89ee7a5`.
  - It runs 20 M iterations of `acc := acc 0.9999999 + 0.0000001` over `RR64`, through `for i <- seq(1#20000000)`.
  - The accumulator is a mutable local. The loop's body, a closure, reads and writes it.
- `TxArray.fss` is the hot loop of `perf-probes/nat/size-cost.md` § 3 (`size-cost/SizedSum.fss`, removed in `fc89ee7a5`), without the size.
  - It uses that file's control method `sumN`. `sumN` sums an eight-element `ZZ32Vector` with a `while` loop over the mutable locals `acc` and `i`.
  - A `while` loop over two more mutable locals calls it 10 M times per round.
- `TxCell.fss` is the second rung of the boxing probe's ladder (`bench1b.fss`): TxScalar's loop with the body `acc := acc`. It shows the checks against the cell alone.

Each program runs its loop three times in one JVM, and prints each loop's result and time.

Checks per iteration, read from `javap -c` of the compiled jars (`run.sh` prints the static count for each method):
- TxScalar and TxCell make 2: one before the read of `acc` and one before the write, in the body's `apply`. The library's sequential loop (`countedseqloop`, `Library/CompilerLibrary.fss:373-381`) has no mutable variable, so it adds no check.
- TxArray makes 7 per element:
  - 6 inside `sumN`'s loop: three reads of `i`, a read and a write of `acc`, and a write of `i`;
  - 3 per call of `sumN`: two initial writes and the final read;
  - 5 per call in the caller's loop: `k` read twice and written once, `total` read and written;
  - that is 6 + 8/8 = 7 per element.

## 2. What the shadow removed

- `inATransaction-false.patch` changes one method of `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java`: `inATransaction()` returns `false` without looking.
- The removed body:
  - `Thread.currentThread()`;
  - a cast to `FortressTaskRunner`;
  - a read of the `debug` flag, which is a non-final static `Boolean`;
  - two calls of `getTask()`;
  - a read of the task's `transaction` field.
- `run.sh` compiles the patched copy into `tmp/tx-probe/shadow-classes/`. It puts that directory first on the class path of the shadow variant's `java` command. Otherwise the two variants run the same command and the same compiled jars.
- The shadow leaves `MutableFValue` as it is, because the check is not there: the generated code makes the call itself, before `getValue` and `setValue`. So both variants keep:
  - the cell, with its `volatile` field, its allocation and its casts;
  - the generated bytecode. Each call site keeps its `invokestatic`, its `ifeq` and the transactional branch. The JIT folds them away once the call returns a constant.
- The shadow is correct for these programs. None of them runs `atomic`, so no transaction is ever open, and the tree's method also returns `false` on every call.
- Which method ran:
  - The JVM's class-load log cannot show it. The Fortress class loader defines `BaseTask` itself, from the bytes that `getResourceAsStream` finds first on the class path (`runtimeSystem/InstantiatingClassloader.java:141-160`).
  - The JIT's log does show it: `BaseTask::inATransaction (59 bytes)` with the checks, `(2 bytes)` without.
- The results printed the same in all 306 timed runs and all warm-up runs of the reported session:
  - TxScalar `0.8646647302294265`, the value that the boxing probe and rung 0 printed;
  - TxCell `0.5`;
  - TxArray `80000000`.

## 3. The machine

- The reported session ran on 2026-10-08, from 20:19:59 to 20:26:16 UTC.
- Tree `8f0bc7389`, on branch `tx-probe` cut from `main`. It was built in its own worktree with `ant compileAll`, then the library order.
- `nproc` 4.
- CPU "Intel(R) Xeon(R) Processor @ 2.10GHz", family 6, model 207, at 2100.000 MHz on all four cores.
- Load at the start: 0.36, 0.90 and 1.21 (1, 5 and 15 minutes).
- Load during the timed runs: 0.98 to 1.70, which is the measured JVM itself. A check during the second session found no other Java process.
- JDK: OpenJDK Runtime Environment, build 25.0.4.1+1-1-24.04.4-Ubuntu.
- `FORTRESS_THREADS=1`. `JAVA_FLAGS`: `-Xmx4g -Xss64m`.

## 4. Against the earlier readings, and what row 302's fix changed

- **The boxing probe.** `perf-probes/boxing/REPORT.md` § 2 charged this scalar loop's two checks 3.13 s of 9.34 s, in a Java model. That is about 156 ns per iteration, 34 % of the loop.
  - Today the same loop, compiled from Fortress, pays 1.75 ns per iteration for them: 9 % of the loop. In the first timed loop it pays 2.39 ns, 6 %.
  - So the cost per check fell from about 78 ns to about 1 ns.
- **Row 302's fix.** The fix (`53362cb88`; FACTS, "The eager debug string of `BaseTask.inATransaction()` is fixed") made the check read the `debug` flag before it builds its message. Before the fix, the message was built on every call.
  - `explorations/compile-ladder/rung0/REPORT.md`, "The four timings", measured that fix on `bench1h`.
  - What the fix left is the body listed in § 2. In the hot loops the JIT inlines that body: `-XX:+PrintInlining` shows `inATransaction (59 bytes) inline (hot)` there.
- **The size-cost note.** `perf-probes/nat/size-cost.md` § 3 found about 31 ns per element in the sized sum, with six checks per iteration in its loop, and did not split that time. It was measured on 2026-09-24, after row 302's fix.
  - TxArray is that loop's control without the size. Today it takes 23.17 ns per element, and the checks are 14.79 ns of that, 64 %.
  - The loop's six checks are the six that the note counted. With the method's entry and exit and the caller's loop, there are seven per element.
  - The 31 ns and the 23 ns come from different sessions, stacks and rounds: the size-cost stack carried the size patches, and its figure is its second round. The container's speed also varies between sessions (rung 0's report, "Two cautions"). So the two numbers do not show a change in the tree.
- **Why the array loop pays a larger share.** Its 7 checks per element sit against 8.39 ns of other work. The scalar loop's 2 checks sit against about 18.7 ns of other work: the closure call, the generator's step, two literals and two arithmetic calls.

## 5. What this measurement does not show

- **Four threads.** Every timing ran at `FORTRESS_THREADS=1`.
- **Code inside `atomic`.** No transaction is open in these programs. Inside one, a read or a write goes through `Transaction.TXRead` or `TXWrite`, and that cost is not measured. The shadow would be wrong there.
- **A top-level `var`.** Its cell lives in a static field (`VarCodeGen.java:620-726`, since `42d51c474`). None of the programs has one.
- **Other programs, microGPT among them.** The share depends on how many reads and writes of mutable variables a loop makes per unit of other work. In these three loops it runs from 9 % to 64 %.
- **Removing the checks at compile time.** The shadow removes only their run time. The generated methods keep their size: `sumN♙` stays at 319 bytes of bytecode.
- **The mechanism in machine code.** No JIT assembly was read. Two JIT controls ran on TxArray, 3 runs per variant each (third loop):
  - With `-XX:InlineSmallCode=6000`: 22.82 against 8.44 ns, a difference of 14.38 ns, the same as without the flag.
    - In one diagnostic run outside the reported session, C2 refused to inline `sumN♙` into its caller when the tree's checks were in place ("already compiled into a big method"). With the shadow it inlined the method.
    - The flag lifts that limit, and the difference does not change.
    - The reported session's own diagnostic step does not show the refusal, so this decision varies between runs.
  - With `-XX:-DoEscapeAnalysis`: 43.51 against 32.67 ns, a difference of 10.84 ns. So about 11 of the 15 ns remain without escape analysis, and about 4 ns appear only with it. The reason was not examined.
- **The noise in the scalar loops.** For TxScalar and TxCell the difference is about as large as the spread between runs. Some pairs in TxCell, and in the first loops, show a negative difference. Only the medians over 15 runs, and their agreement across three sessions, support those two figures.

## Decisions

- **The shadow's scope.** I shadowed only `inATransaction()` and left `MutableFValue` as it is.
  - The alternative was to shadow `MutableFValue`'s read and write as well. That would have removed nothing more: the check is not in `MutableFValue` (`compiler/runtimeValues/MutableFValue.java`), because the generated code makes it (`VarCodeGen.java:483-546`).
  - No decision of the curator covers this.
- **The array program.** I used `SizedSum.fss`'s control method `sumN`, without the size, rather than the sized `sumS`.
  - Reading a size as a value needs the size probes' shadow stack (`size-cost.md` § 1).
  - That note found `sumS` and `sumN` to be within noise of each other (§ 3).
- **The third program.** I added TxCell (`acc := acc`). It shows the checks against the cell alone. The boxing probe's Fortress ladder had charged them together with the cell.
- **The headline round.** I report the third timed loop in each JVM, after the JIT's warm-up. I give the first loop as well, because the earlier readings timed one loop per JVM.

## Files

- `TxScalar.fss`, `TxArray.fss` and `TxCell.fss`: the probe programs.
- `inATransaction-false.patch`: the shadow, as a patch against the tracked `BaseTask.java`.
- `run.sh`, in order:
  - it compiles the shadow and the programs;
  - it prints the machine line, the method each variant runs, the checks per method and the inlining decisions;
  - it runs one warm-up pair, then the timed runs and the JIT controls;
  - it prints the summary.
- `run.sh 15 3` produced the figures above in about six minutes. It writes only under the tree's `tmp/tx-probe/`, plus the programs' jars in the tree's bytecode cache.

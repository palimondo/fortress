<!-- Measurements 1, 2, 3 and 5 of c4-parallelism.md section 10, run 2026-09-19 on the
     four-core container. 4 (a code change) and 6 (needs the compiled path) were not run. -->

# The C4 parallelism measurements

`explorations/c4-parallelism.md` §10 lists six measurements, in the audit's priority
order. This directory holds four of them, run on 2026-09-19: **1** the allocation and
monitor profile at four threads, **2** the scaling curve at one to four threads, **3**
warm-up against steady state from the same outputs, and **5** whether the tuple
parallelism at `MicroGptFlat.fss:58` and `:68` pays. Measurement **4** is a code change
to `Evaluator.forDo` and **6** needs the compiled path; neither was run.

Every number below names the command that produced it and the file it was read from.
Paths are relative to this directory.

## How the runs were made

```bash
source /home/user/fortress/experiment/env.sh
export FORTRESS_CACHES=<private cache>          # the only adaptation to §10's commands
cd /home/user/fortress/explorations/run-c4/src
```

`JAVA_FLAGS` additionally carried `-Dfortress.caches=<private cache>` and
`-Djava.io.tmpdir=<private tmp>`, so nothing was written under
`default_repository/caches` and the 5.8 MB Rats! temp directory of each run was swept.
`default_repository/caches` was byte-identical before and after (`find ... -printf '%p %s
%T@' | sort`, diffed).

The runs were sequential, one at a time, on an otherwise idle four-core container. The
JFR run came first, then the four check runs at one to four threads in that order, then
the tuple-split variant. The driver is `job2.sh` in this directory; the commands it issues
are §10's, and they are quoted with each measurement below.

**The check program does not start from a cold cache on this tree.** The first run
against an empty `FORTRESS_CACHES` dies before the first check with

```
com.sun.fortress.exceptions.ProgramError: .../run-c4/src/FlatArrays.fss:31:1-105: and
.../Library/FortressLibrary.fss:280:5-71:
MAX[\I\](s:RR64,a:Array[\RR64,I\]):Array[\RR64,I\] ... and
StandardTotalOrder[\T ...\].MAX(self:StandardTotalOrder[\T\],other:T):T ... have parameters
with generic type, at least one pair of parameters must have excluding types
```

(`OverloadedFunction.java:527`, reached from `Shell.walk`). The same run repeated
succeeds: the failing run leaves `FlatArrays` in `interpreter_cache`, and a component
read back from the cache is not re-checked. The cache was therefore warmed by one
discarded run before the measurements began, and every number here is from a warm cache.
This is recorded as a finding, not investigated; it means the C4 measurements on record
were also taken against a warm cache, and that a fresh container cannot run the check
program at the first attempt.

## Measurement 1 — the allocation and monitor profile at four threads

```bash
env FORTRESS_THREADS=4 JAVA_FLAGS="-Xmx4g -Xss64m \
  -XX:StartFlightRecording=settings=profile,filename=<scratch>/t4.jfr,duration=300s" \
  ../../../bin/fortress MicroGptFlatCheck.fss > check_jfr.txt
jfr summary <scratch>/t4.jfr                          > jfr-summary.txt
jfr print --events jdk.ObjectAllocationSample <scratch>/t4.jfr | \
  grep -c "ValueNode\|ReadSet\|CopyOnWriteArrayList"  > jfr-alloc-grepcount.txt
jfr print --events jdk.JavaMonitorEnter,jdk.JavaMonitorWait <scratch>/t4.jfr | \
  head -80                                            > jfr-monitor-head80.txt
python3 jfr-top.py alloc   <scratch>/alloc.txt        > jfr-alloc-top.txt
python3 jfr-top.py monitor <scratch>/monitor.txt      > jfr-monitor-top.txt
```

The recording is 300 s of a run that took 354 s (`check_jfr.txt`, `total 354 s`, 40 PASS).
The unprofiled four-thread run of measurement 2 took 375 s, so the profiled run was the
faster of the two; why is not established here, and the honest reading is that JFR's
overhead on this workload is smaller than the run-to-run spread. The recording covers the
first 300 s of the 354 s.
`jfr-summary.txt`: 82 302 `jdk.ObjectAllocationSample`, 52 251 `jdk.ExecutionSample`,
354 994 `jdk.GCPhaseParallel`, 26 172 `jdk.ThreadPark`. The `.jfr` file itself (47 MB)
stays in the scratchpad.

### The allocation top ten

From `jfr-alloc-top.txt`, by sample count, with the most frequent leading stack frame
under each class. "MB" is the summed JFR sample `weight`, an extrapolation, not measured
bytes; the ranking, not the magnitude, is the result.

| # | samples | % of 82 302 | MB | class | leading frame |
|---|---|---|---|---|---|
| 1 | 22 775 | 27.7 | 135 456 | `com.sun.fortress.useful.BATreeNode` | `BATreeNode.add(Object,Object,Comparator)` |
| 2 | 12 142 | 14.8 | 82 518 | `interpreter.env.BetterEnvWithTopLevel` | `BetterEnvWithTopLevel.extendAt(HasAt)` |
| 3 | 9 023 | 11.0 | 60 202 | `java.lang.Object[]` | `java.util.ArrayList.<init>(int)` |
| 4 | 5 729 | 7.0 | 36 287 | `java.util.ArrayList$Itr` | `ArrayList.iterator()` |
| 5 | 5 174 | 6.3 | 32 634 | `java.util.ArrayList` | `Evaluator.evalExprListParallel(List)` |
| 6 | 4 947 | 6.0 | 34 485 | `interpreter.evaluator.tasks.TupleTask` | `Evaluator.evalExprListParallel(List)` |
| 7 | 4 705 | 5.7 | 29 593 | `interpreter.evaluator.Evaluator` | `TupleTask.compute()` |
| 8 | 3 871 | 4.7 | 26 145 | `java.util.Collections$1` | `Collections.singletonIterator(Object)` |
| 9 | 3 464 | 4.2 | 21 267 | `java.util.ArrayList$SubList` | `ArrayList.subList(int,int)` |
| 10 | 1 751 | 2.1 | 12 082 | `nodes_util.OprUtil$1` | `OprUtil.fixityDecorator(Fixity,String)` |

Where the four names the measurement was designed to find actually rank, over all 106
classes sampled:

| rank | samples | % | class |
|---|---|---|---|
| 20 | 226 | 0.27 | `interpreter.env.ValueNode` |
| 22 | 184 | 0.22 | `java.util.concurrent.CopyOnWriteArrayList` |
| 23 | 166 | 0.20 | `interpreter.evaluator.transactions.ReadSet` |
| 29 | 93 | 0.11 | `interpreter.env.ReferenceCell` |

Together 0.8 % of the allocation samples. `jfr-alloc-grepcount.txt` holds §10's own
`grep -c`, 1494 — that counts *lines* mentioning the three names anywhere in the printed
events, including stack frames, not events.

### The monitor top ten

From `jfr-monitor-top.txt`. There are only three entries; the whole 300 s recording
contains 525 `jdk.JavaMonitorEnter` and 5 `jdk.JavaMonitorWait` events.

| # | events | blocked ms | monitor class | leading frame |
|---|---|---|---|---|
| 1 | 525 | 6 282.3 | `com.sun.fortress.useful.Memo1C` | `Memo1C.make(Object)` |
| 2 | 4 | 0.0 | `java.lang.ref.ReferenceQueue$Lock` | `Object.wait0(long)` |
| 3 | 1 | 0.0 | `java.util.TaskQueue` | `Object.wait0(long)` |

Every one of the 525 is `Memo1C.make`, reached (`jfr-monitor-head80.txt`) through
`FTypeTuple.make(List)` → `FTupleLike.type()` → `FType.typeMatch(FValue)`: the memo table
that interns tuple types, contended between `ForkJoinPool-1-worker-*` threads.

`ReferenceCell` does not appear in the monitor profile at all. The threshold matters here
and is stated empirically: the smallest duration in the 525 records is exactly 10.000 ms
(`jfr-monitor-threshold.txt`), so JFR's `profile` settings recorded a monitor enter only
when a thread blocked at least 10 ms. A monitor that is taken on every element access but
never blocks a thread that long produces no event. So this says **ReferenceCell never
blocked a thread for 10 ms**; it does not say its monitor is free.

### The answer to the question the measurement was designed to ask

**No.** §10 predicted that `ValueNode`, `ReadSet` and `CopyOnWriteArrayList` would lead
the allocation profile and `ReferenceCell` the monitor profile, and that if so the cost is
§6's floor and more threads cannot remove it. Neither holds. The allocation profile is led
by the interpreter's *environments* — `BATreeNode` under `BATreeNode.add` and
`BetterEnvWithTopLevel` under `extendAt`, 42 % of samples between them — with task
machinery (`TupleTask`, `Evaluator`, the `ArrayList`s of `evalExprListParallel`) next; the
STM's three classes are under 1 %. The one contended monitor is `Memo1C`, the tuple-type
memo, not `ReferenceCell`.

## Measurement 2 — the scaling curve, one to four threads

```bash
for t in 1 2 3 4; do
  /usr/bin/time -f "threads=$t wall=%e maxrssKB=%M" \
    env FORTRESS_THREADS=$t ../../../bin/fortress MicroGptFlatCheck.fss \
    > check_t$t.txt 2>check_t$t.time.txt
done
grep -H "^total" check_t*.txt > totals.txt
```

GNU `time` was not installed on this container and was installed (`apt-get install -y
time`) so the command could be run as written.

From `totals.txt` and `times.txt`. Every run passed 40 of 40 checks.

| threads | total (program) | wall (`/usr/bin/time`) | maxrss KB | speedup vs 1 |
|---|---|---|---|---|
| 1 | 840 s | 845.91 | 657 928 | 1.00× |
| 2 | 478 s | 484.28 | 974 324 | 1.76× |
| 3 | 389 s | 395.70 | 1 100 028 | 2.16× |
| 4 | 375 s | 382.78 | 1 133 836 | 2.24× |

Resident memory grows 1.7× from one thread to four and is flat from three to four.

## Measurement 3 — warm-up against steady state

```bash
grep -H "batch 1 step" check_t*.txt > per-step.txt
```

From `per-step.txt` and the `batch 4 loss` line of each file. Milliseconds as the program
printed them.

| | 1 thread | 2 threads | 3 threads | 4 threads |
|---|---|---|---|---|
| batch 1 step 1 | 13 451 | 18 361 | 22 459 | 26 217 |
| step 2 | 7 627 | 4 055 | 3 223 | 2 917 |
| step 3 | 7 425 | 4 007 | 3 136 | 2 900 |
| step 4 | 7 597 | 4 051 | 3 299 | 2 987 |
| step 5 | 7 546 | 4 063 | 3 097 | 2 900 |
| **steps 2-5 mean** | **7 548.8** | **4 044.0** | **3 188.8** | **2 926.0** |
| batch-4 step | 26 488 | 14 001 | 11 064 | 10 263 |

As ratios against one thread:

| | 2 threads | 3 threads | 4 threads |
|---|---|---|---|
| step 1 | 0.73× | 0.60× | **0.51× — slower** |
| steps 2-5 mean | 1.87× | 2.37× | **2.58×** |
| batch-4 step | 1.89× | 2.39× | 2.58× |
| whole run | 1.76× | 2.16× | 2.24× |

## Does the record reproduce?

`c4-parallelism.md` §7, from `run-c4/checks/rerun-post-restart/`:

| | record, 1 thread | record, 4 threads | record ratio | here, 1 | here, 4 | here ratio |
|---|---|---|---|---|---|---|
| step 1 | 8 247 ms | 17 413 ms | 0.47× | 13 451 | 26 217 | 0.51× |
| steps 2-5 mean | 4 840 ms | 1 879 ms | 2.58× | 7 548.8 | 2 926.0 | **2.580×** |
| batch-4 step | 16 551 ms | 6 189 ms | 2.67× | 26 488 | 10 263 | 2.58× |
| whole run | 528 s | 263 s | 2.01× | 840 s | 375 s | 2.24× |

**The shape reproduces exactly; the absolute times do not.** This container is about 1.6×
slower than the one the record was taken on (840 s against 528 s at one thread, 375
against 263 at four), so no absolute figure here is comparable with §7. Every *ratio*
reproduces: the steady state is 2.580× on four workers against the record's 2.58×, the
batch-4 step 2.58× against 2.67×, and the first step is again roughly twice as slow at
four threads as at one, 0.51× against 0.47×. The whole-run ratio comes out a little
better here, 2.24× against 2.01×, because the fixed sequential part is a smaller share of
a longer run.

The record's reading — steady state 2.6-2.8× and a headline near 2× dragged down by a
first step that is slower with more workers — holds. The new information is that the
first step degrades *monotonically* with thread count (13 451 → 18 361 → 22 459 → 26 217
ms), which §7 could not see from two thread counts, and that almost all of the gain is
already taken at three threads.

## Measurement 5 — does the tuple parallelism pay?

```bash
# in a scratch copy of the model, never in the tree:
#   the tuples at MicroGptFlat.fss:58 and :68 written as separate bindings
env FORTRESS_THREADS=4 ../../../bin/fortress MicroGptFlatCheck.fss > check_tuplesplit_t4.txt
```

The variant is a copy of `explorations/run-c4/src` in the scratchpad with
`explorations/run-c` and `explorations/apl` symlinked beside it so the check program's
relative data paths still resolve. The only edit is in `tuple-split.diff`, also below:
the three tuple bindings on the two lines the audit names, written out as separate
bindings. Line 67's `(dQ, dK, dV)` tuple was left alone; the audit named 58 and 68.

```diff
-    (q, k, v) = (x1 wq^T, x1 wk^T, x1 wv^T); (qh, kh, vh) = (h(q), h(k), h(v))
+    q = x1 wq^T; k = x1 wk^T; v = x1 wv^T
+    qh = h(q); kh = h(k); vh = h(v)
...
-    (gWQ, gWK, gWV) = (dQ^T x1, dK^T x1, dV^T x1); dX1 = dQ wq + dK wk + dV wv
+    gWQ = dQ^T x1; gWK = dK^T x1; gWV = dV^T x1
+    dX1 = dQ wq + dK wk + dV wv
```

Both ran at four threads and both passed 40 of 40 with identical losses, so the split
changes no answer.

| | original (`check_t4.txt`) | tuple-split (`check_tuplesplit_t4.txt`) | delta |
|---|---|---|---|
| batch 1 step 1 | 26 217 ms | 26 108 ms | −0.4 % |
| steps 2-5 mean | 2 926.0 ms | 2 701.0 ms | **−7.7 %** |
| batch-4 step | 10 263 ms | 8 901 ms | **−13.3 %** |
| total | 375 s | 339 s | **−9.6 %** |
| wall | 382.78 s | 348.79 s | −8.9 % |
| maxrss | 1 133 836 KB | 1 128 964 KB | −0.4 % |

**The tuple parallelism does not pay: removing it makes the program faster at four
threads**, by 7.7 % in the steady state and 13.3 % on the largest step. This is one run of
each, so the sign is the result and the magnitude is soft; but it agrees with measurement
1, where `TupleTask` and the `ArrayList`s allocated in `evalExprListParallel` are ranks 5
and 6 of the allocation profile and the one contended monitor is the tuple-type memo
reached through `FTypeTuple.make`. Spawning three tasks to evaluate three matrix products
costs more than it saves when the products are themselves parallel loops.

## What this says about where the time goes

Taken together, and stated as a reading rather than a measurement: the cost is not the
STM. It is the interpreter's environments — every task builds one, and the top two
allocation sites are the balanced tree they are made of — plus the task machinery itself.
That is consistent with §7's items 1 and 3 (task overhead that does not shrink with
threads, allocation into one heap) and not with the expectation in §5.1 and §10 that
`ReferenceCell` monitors and `ValueNode`/`ReadSet` allocation dominate. The next
optimisation this points at is fewer and cheaper environments, and fewer tasks, not a
different concurrency mechanism.

## Not verified

- One run per configuration. Nothing here has an error bar, and a 3 % difference between
  two of these numbers means nothing.
- The JFR run and the unprofiled four-thread run differ by 21 s in total; the recording
  stopped at 300 s of a 354 s run, so the last 54 s are not in the profile.
- The monitor profile sees only blocking of 10 ms or more. An uncontended or briefly
  contended monitor, which is what `ReferenceCell` would be under this workload, is
  invisible to it. Deciding whether `ReferenceCell`'s monitor costs anything needs a
  different instrument than JFR's monitor events.
- The allocation figures are JFR sampling with extrapolated weights, not an allocation
  count.
- Measurement 5 is a single run of a single variant; no attempt was made to separate
  which of the three split tuples carries the gain.
- The cold-cache failure above was reproduced twice and then worked around; its cause was
  not investigated, and no claim is made about when it started.
- Measurements 4 and 6 of §10 were not run.

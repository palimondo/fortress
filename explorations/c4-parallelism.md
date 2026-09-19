<!--
  Written 2026-09-19 by a delegated writing worker, from `c4-parallelism/audit.md`
  (which sits beside this file in the tree as `explorations/c4-parallelism/audit.md`;
  "audit §n" below is a section of it).  For Pavol, answering his question:

    "I would like to understand much better the structure of the data structure that
    we have in the C4 version of the microGPT, where the potential for parallelism
    exists, where would the task boundaries be?  Where you are saying there will be
    no transactions in our code, I find that hard to believe.  I can't understand why
    we do not have any parallel mutation.  We are running batches of updates.  Is
    there some propagation of algebraic properties that allow us to parallelize
    stuff?  This is where I was hoping we will see the power of Fortress numerics
    with the work stealing, that we get some implicit parallelism from this.  While I
    worry that the unfinished state of the language will use some kind of very
    inefficient synchronization primitives for those transactions, and in the end we
    will end up with something super slow.  I need a good explainer of where we can
    potentially reap the benefits of parallel execution."

  Every claim cites a file:line as read on 2026-09-19, or a probe under
  `c4-parallelism/probes/`.  Nothing was run and no timing was taken for this text.
  Paths: `MicroGptFlat.fss`, `FlatArrays.fss`, `FlatData.fss`, `MicroGptFlatCheck.fss`
  are `explorations/run-c4/src/`; `FortressLibrary.fss`, `RangeInternals.fss`,
  `Generator2.fss`, `CompilerLibrary.fss` are `Library/`; Java files are under
  `ProjectFortress/src/com/sun/fortress/`.
  One file was moving while this was written: `Library/CompilerLibrary.fss` (and its
  `.fsi`) carried the gather stage of climb batch 1, a staged 61-line `Maybe` block
  (rung M) inserted between the `ZZ32Vector` operators and the array-support section.
  Its lines up to 533 are the same at `6a63980` (the last commit touching the file
  before batch 1) and after the gather; the array-support lines in §8 are given at
  `6a63980`, with the post-batch line beside.
-->

# C4 and parallel execution: where the work splits, and what it costs

## 1. The shape of C4's data

One vector holds all nine weight matrices. Everything else is a fresh array per
step, or a view onto that vector.

| array | shape | who writes it, and when |
|---|---|---|
| `p`, the parameters | 4192 `RR64` | the loader, once, in a `seq` loop (`FlatData.fss:96-97` → `:54`); never again (`MicroGptFlat.fss:51-72` contains no assignment) |
| `m`, `v`, Adam's moments | 4192 each | `adam` returns three new arrays; the driver rebinds its variables (`MicroGptFlat.fss:75-81`, `:94`) |
| `g`, the flat gradient | 4192 | built fresh each step by `flat` (`MicroGptFlat.fss:71`; `FlatArrays.fss:179-188`) |
| `corpus.tokm` | documents × 17 `ZZ32` | the loader, `seq` (`FlatData.fss:121-122`) |
| `mask` | 16 × 16 | once, at component start (`MicroGptFlat.fss:29`) |
| activations `x … pr`, gradients `dL … gWPE` | rows × 16, rows × 64, 4 × 16 × 16, … | each is one expression's fresh result inside `step` (`MicroGptFlat.fss:57-70`) |

Matrix *i* lives at `p[matOffset(i) …]`, row-major, in the order wte, wpe,
lm_head, wq, wk, wv, wo, fc1, fc2 (`MicroGptFlat.fss:37-44`). Shapes are (27,16),
(16,16), (27,16), four (16,16), (64,16), (16,64) (`:40-41`).

A *view object* is an object that holds a reference to a base array and an index
map. Its `get` and `put` translate the view's index into the base's index and
forward. Nothing is copied. `view(p, i)` returns matrix *i* as a `PView` whose
`get(i,j)` reads `p[off + i·c + j]` (`MicroGptFlat.fss:45`; `FlatArrays.fss:54-59`).
The nine views are taken once per step, in one tuple (`MicroGptFlat.fss:53`).

The other views, all in `FlatArrays.fss`: `RowView` (a matrix row as a vector,
`:66-71`), `Row3View` (`:73-78`), `HeadsView` (a rows × 16 activation as 4 planes of
16 × 4, `:83-89`), `UnheadsView` (its inverse, `:96-102`), `PlaneView` (`:110-115`),
`Transposed3` (`:117-122`), and `Diag` (a diagonal held as its vector, `:40-43`).
Each map is *injective*: two different view indices never land on the same base
cell. That single property carries every disjointness argument in §5.

Underneath, `array[\RR64\](n)` reaches `__DefaultVector`, whose storage is a
`PrimitiveArray` (`FortressLibrary.fss:1922-1931`, `:2240-2244`, `:2204-2210`).
Rank 2 and rank 3 use the same store with a row-major offset (`:2563-2569`,
`:2780-2790`). The native `PrimitiveArray` is an `AtomicArray`
(`interpreter/glue/prim/PrimitiveArray.java:34-35`), and an `AtomicArray` is a Java
array of `ReferenceCell` objects, one per element
(`interpreter/evaluator/transactions/AtomicArray.java:26, 34-37`). So the 4192
parameters are 4192 cell objects. §6 is about what that costs.

## 2. Where the algorithm is independent and what C4 does with it

| phase | independent across | as written in C4 | line |
|---|---|---|---|
| forward pass | every (document, position) row | one matrix expression over all rows at once; row independence is the array's shape | `MicroGptFlat.fss:57-61` |
| rmsn, softmax | rows | `rows(f, m)`, a parallel `for i <- 0#n` over rows | `FlatArrays.fss:144, 150, 156, 162` |
| q, k, v projections | the three products | one tuple of three products; tuple elements are parallel by the spec | `MicroGptFlat.fss:58`; `tuple-expr.tex:23-24` |
| attention | heads, then rows within a head | `heads` makes the head axis a plane axis; the batched product is a parallel `for p <- 0#np`; softmax is `rows` over each plane | `FlatArrays.fss:83-95, 130, 156` |
| backward contractions gLM, gF2, gWO, gWQ/K/V, gWTE, gWPE | output cells (row, column) | each is a matrix product; the library splits rows and columns in parallel, the contraction axis in sequence (§5) | `MicroGptFlat.fss:63-70`; `FortressLibrary.fss:2506-2548` |
| gWQ, gWK, gWV | the three products | one tuple | `MicroGptFlat.fss:68` |
| every elementwise operator | elements | `map`/`ivmap`, each a parallel `fill` over a fresh replica | `FlatArrays.fss:24-37`; `FortressLibrary.fss:2135-2138, 2396-2400, 2760-2765` |
| Adam | the 4192 parameters | three whole-vector expressions; each operator is a parallel `fill` | `MicroGptFlat.fss:77-79` |
| `flat` | cells within one block | outer loop `seq` (it carries the offset), inner loop parallel | `FlatArrays.fss:182-185` |
| training steps | nothing: step *s+1* needs step *s* | `seq(0#5)` | `MicroGptFlat.fss:91`; `MicroGptFlatCheck.fss:47` |
| loaders | nothing: stream order, running offset | `seq` | `FlatData.fss:77, 85, 96-97, 122` |

Five parallel `for`s in C4's own text, all in the vocabulary; eleven `seq` ones,
all forced (audit §2.2 lists every one). Far more parallelism comes from the
library's `fill`, `assign`, `map` and `mul` than from those five (audit §2.3).

One independence C4 has and does not express: `m'` and `v'` in `adam` do not
depend on each other, but they are two statements in a block, so they run one
after the other (`MicroGptFlat.fss:77-78`). Written as `(m', v') = (…, …)` they
would be tuple elements and run as two tasks. Each is already a parallel loop over
4192 elements, so the gain is the overlap of two such loops. It is one line, and
it has not been measured (audit §2.6).

The contraction over positions, the thing Pavol calls "batches of updates", is
never written as an accumulation in C4. It is written as a product: `gLM = dL^T x4`,
`gF2 = dX4^T mr`, `gWO = dX2^T hc`, `gWQ = dQ^T x1`, and so on
(`MicroGptFlat.fss:63-70`). The sum lives inside the library's `mul` (§5).

## 3. How a parallel `for` becomes tasks

A *task* here is a unit of work an interpreter thread can run or hand to
another thread. *Fork-join* is the pattern: a task forks children, then waits
(joins) for all of them before continuing. *Work stealing* is how idle threads
find work: each thread keeps its own queue of forked tasks, and an idle thread
takes a task from the back of a busy thread's queue.

The desugarer rewrites `for x <- g do b end` into the method call
`g.loop(fn x => b)` (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:357-382`;
`nodes_util/DesugarerUtil.java:31-32`). Parallelism is therefore a property of
the generator object, not of the loop syntax. `0#n` builds a
`CompactFullParScalarRange` (`FortressLibrary.fss:3813`; `RangeInternals.fss:1422-1423`).
`seq(0#n)` builds a `CompactFullSeqScalarRange` (`RangeInternals.fss:1019`), whose
`loop` is a plain `while` (`:1059-1082`).

The parallel `loop` (`RangeInternals.fss:1036-1053`) is a *range split*:

```
lop(lo,hi) = if lo = hi then body(lo)
             else split = partitionL((lo BITXOR hi)+1)
                  mid   = hi BITAND (BITNOT (split-1))
                  do lop(lo, mid-1) also do lop(mid, hi) end
             end
```

Three things to see. The cut is not the midpoint: `partitionL(x)` is
`Integer.highestOneBit(x-1)` (`interpreter/glue/prim/Int.java:203-207`), so the range
is cut at the highest power-of-two boundary inside it. The cut depends only on
`(lo, hi)`; §4 rests on that. And the base case is one element: there is no
threshold below which the split stops, so *n* elements give *n−1* splits.

Each split is a `do … also … end`. `Evaluator.forDo`
(`interpreter/evaluator/Evaluator.java:238-280`) builds one `TupleTask` per front
(`:267-270`), calls `TupleTask.invokeAll(tasks)` (`:274`), then reads every result
(`:277-279`). That last read is the join. `invokeAll` is
`java.util.concurrent.ForkJoinTask.invokeAll`, since `BaseTask extends RecursiveAction`
(`evaluator/tasks/BaseTask.java:21`): it runs one task inline, forks the other onto
this worker's queue, and joins.

One task costs: a `TupleTask` object capturing an `Evaluator` (`Evaluator.java:269`);
when it runs, a fresh environment from `extendAt` and another `Evaluator`
(`tasks/TupleTask.java:36-38`); and a walk to the parent task for its transaction
and depth (`tasks/BaseTask.java:33-44`). About four objects plus an environment per
task. A rank-1 `for` over *n* elements allocates 2(*n*−1) of them whatever
`FORTRESS_THREADS` says; at one thread they are pushed and popped on one queue and
nothing is stolen (`Evaluator.java:267-274`).

Operands and tuples go through a different door. `evalExprListParallel`
(`Evaluator.java:336-362`) first asks `TupleTask.worthSpawning()` (`:341`), which is
`ForkJoinTask.getSurplusQueuedTaskCount() <= 3` (`tasks/TupleTask.java:119-121`).
If this worker's queue already holds more than three tasks nobody has stolen, the
operands are evaluated in sequence instead. `forDo` has no such check.

The odd consequence. A rank-1 loop (`for i <- 0#n`) reaches parallelism through
`loop` → `also` → `forDo`, unthrottled. A rank-2 or rank-3 `fill` does not:
`zeroIndices()` returns a `CompactFullRange2D` (`FortressLibrary.fss:2387`), whose
`loop` delegates to `self.generator.loop` (`:1779`); that generator is
`range1.cross(range2)`, a `SimplePairGenerator` (`RangeInternals.fss:900`;
`FortressLibrary.fss:1036-1037, 3520-3526`); neither it nor `PairGenerator` defines
`loop` (`:3507-3518`), so the default `Generator.loop(f) = generate(VoidReduction, f)`
runs (`:1052`); `PairGenerator.generate` nests the two ranges' `generate`
(`:3515-3517`); and a range's `generate` writes its two halves as the argument
tuple of `red.join(loop'(lo,mid-1), loop'(mid,hi))` (`RangeInternals.fss:1021-1034`).
An argument tuple is the throttled path. So every matrix or rank-3 elementwise
operation in C4 is throttled by queue depth, and every vector one is not.

The pool: `FORTRESS_THREADS`, else half the processors (`interpreter/Driver.java:518-529`);
a `ForkJoinPool` subclass; the whole program is one task submitted with
`group.invoke` (`Driver.java:553-566`).

## 4. Reductions: how algebraic properties travel

`SUM[i <- g] e` desugars to `__generate(g, r, body)` inside `__bigOperator`
(`DesugarerUtil.java:130-160`; `FortressLibrary.fss:1063-1067, 1118-1123`). A
reduction object has exactly two methods: `empty()`, the value of an empty range,
and `join(a, b)`, which combines two partial results
(`FortressLibrary.fss:2835-2839`). `SumReduction` is `empty() = 0`, `join = a+b`
(`:3021-3040`); `MaxReduction` joins with `MAX` (`:3114-3121`).

*Associativity* means `join(join(a,b),c) = join(a,join(b,c))`: the grouping does
not matter. An *identity* is a value `e` with `join(e,x) = x`. Together they license
the tree: a generator may cut its range anywhere, combine each piece on its own,
insert `empty()` wherever it likes, and glue the pieces with `join`. The library
says so in two comments and nowhere else:

> "the reduction object R, which specifies a monoidal operation (associative and
> with an identity). … The author of the generator is free to use the identity
> element anywhere desired in this computation, and to group reductions in any
> way desired" (`FortressLibrary.fss:972-979`)

> "Invariants: join must be associative with identity empty" (`:2847-2850`)

A `Monoid` trait that would have put this in the type system is commented out
(`:2820-2827`). Nothing in the library or the interpreter checks it.

*Commutativity* means `join(a,b) = join(b,a)`. It travels as a marker trait:
`SomeCommutativeReduction` is an empty trait (`:2945`; "mark for commutative",
`FortressLibrary.fsi:1763`), mixed into `CommutativeReduction` (`:2947`) and
`CommutativeMonoidReduction` (`:2957`), which `SumReduction`, `ProdReduction` and
the `MAX` reductions extend (`:3021-3025, 3047-3050, 3065, 3114`). It is read at run
time by a `typecase`: `commutative(r)` (`Generator2.fss:94-99`).

*Distributivity* means one reduction distributes over another, as × over +. It
travels as an overloaded method: `ActualReduction.distribute(r)` answers "no" by
default (`:2866-2867`), and `SumReduction.distribute(r: MaxReduction)` answers with
a `MaxSumReductionPair` (`:3031-3038`). `distributes(q, r) = r.distribute(q).holds`
(`Generator2.fss:73`). The two are combined as `distributes(q,r) AND commutative(q)`
(`:411`), which is the guard for fusing two nested `BIG` operators into one
traversal (`__bigOperator2`, `FortressLibrary.fss:1144-1165`).

So, to Pavol's question directly: the properties propagate by type membership
and by overload resolution, and are checked by nothing. Declaring
`SumReduction` associative is what lets the range split and join in parallel.
Declaring it commutative, by extending a trait, is what lets nested sums fuse.
A wrong declaration would give a wrong answer silently.

The tree's shape. The split point is a pure function of `(lo, hi)`
(`RangeInternals.fss:1027-1028`), so the join tree depends on the index range and
not on the scheduler. Two runs with different thread counts perform the same
additions in the same grouping. Floating-point addition is not associative, so
the library's assumption is formally false, but the violation is deterministic.
Probe `TreeProbe` shows both halves: the parallel `SUM` of 4096 terms `1/(i+1)` is
`8.895103896966324` at one thread and at four; the sequential `SUM` of the same
data is `8.89510389696629` (`probes/TreeProbe.txt`). C4 depends on this in §5.

C4's reductions, with their objects, are the table in audit §2.4: `SUM`, `BIG MAX`
and `DOT` (a `SUM` inside `Vector.dot`, `FortressLibrary.fss:2200-2201`), all over
parallel generators.

## 5. Why there is no shared write, and why that is not luck

A parallel write is only a problem when two iterations write one location. The
spec puts the burden on the programmer: updates to shared mutable locations must
be inside `atomic`, and only locations actually reached by more than one thread
count as shared (`Specification/basic/memory-model.tex:69-75`). Nothing enforces
it. Probe `RaceProbe` (`probes/RaceProbe.fss`, `probes/RaceProbe.txt`) shows what
happens when the rule is broken, 2000 iterations each:

| case | 1 thread | 4 threads, three runs |
|---|---|---|
| disjoint parallel array writes (C4's shape) | 1999000 | 1999000, 1999000, 1999000 |
| shared element, parallel `for`, no `atomic` | 2000 | **723, 1151, 1034** |
| shared element, parallel `for`, `atomic` | 2000 | 2000, 2000, 2000 |
| shared element, `seq` `for` | 2000 | 2000, 2000, 2000 |
| shared variable, parallel `for`, no `atomic` | 2000 | **1077, 1887, 1572** |
| shared variable, parallel `for`, `atomic` | 2000 | 2000, 2000, 2000 |
| `SUM` reduction | 2000 | 2000, 2000, 2000 |

Roughly half the updates are lost, a different half each run, with no error.

C4 has no such site, and the reason is structural. The only place where many
contributions meet one location is the contraction inside a gradient, and C4
writes every contraction as a matrix product (§2). The sum then happens inside
the library's `Matrix.mul` (`FortressLibrary.fss:2506-2548`), which splits a
three-dimensional index box:

| axis | how it is split | parallel? |
|---|---|---|
| rows | `(mma(a,i0,…), mma(a+i0,i1,…))`, a tuple | yes (`:2524, :2540`) |
| columns | `(mma(…,c,k0), mma(…,c+k0,k1))`, a tuple | yes (`:2516, :2532`) |
| the contraction | two statements, one after the other | no (`:2520-2521, :2536-2537`) |

The accumulating write `res.put((a,c), res.get(a,c) + pr)` (`:2513`) therefore
runs in sequence for any one cell `(a,c)`, and different cells are different tasks.
The 2008 team said why, in the source:

> "If this were atomic, we could parallelize j-partition." (`FortressLibrary.fss:2512`)

> "Matrix multiplication; used to use a cache-oblivious algorithm, but we ran into
> trouble due to lack of support for atomic increment of matrix elements."
> (`FortressLibrary.fss:2618-2620`)

C4's own writes are all in one of three shapes (the full table, every write with a
verdict, is audit §4): a private local; a fresh array filled at an index that is an
injective function of the iteration variable; or a `seq` context. The parameter
vector is written by the loader (`FlatData.fss:97` → `:54`) and never again. The
only shared mutable state in the whole program is the two counters `passed` and
`failed` (`MicroGptFlatCheck.fss:20-24`), touched only from `seq` loops (`:47, :67, :79`).
The one place a mutable variable is read inside a parallel loop, `flat`'s offset
(`FlatArrays.fss:181-185`), is safe because a `for` joins before the next
statement runs (`Evaluator.java:274-279`); probe `FlatShapeProbe` reproduces that
shape and finds 0 wrong cells of 2048 in every run (`probes/FlatShapeProbe.txt`).

The evidence on record agrees. Five check outputs are committed:
`explorations/run-c4/checks/{threads1,threads4}.txt` and
`checks/rerun-post-restart/{threads1,threads1_second,threads4}.txt`. Masking the
thread number in the banner, the per-step `( … ms)` and the `total … s` line, the
one-thread and four-thread files are byte-identical: all 40 `diff` values, all 40
verdicts, `40 PASS, 0 FAIL` (audit §7.2). Given `RaceProbe`, a racing C4 would show
run-to-run variation in the loss and in thousands of gradient entries. It does
not. What the outputs cannot show is a race on a path the checks never take; the
audit's line-by-line table (§4) covers that.

## 6. What synchronization is actually paid

Pavol's worry is right in substance and wrong in location. The expensive
synchronization is not waiting for `atomic`. It is paid on every element access,
today, with no `atomic` anywhere.

A mutable variable is a `ReferenceCell` (`interpreter/evaluator/BaseEnv.java:593-611`;
`BuildLetEnvironments.java:109-114`). An immutable binding is an `IndirectionCell`,
a `volatile` field with no lock (`:116`; `interpreter/env/IndirectionCell.java:20-21, 41-46`).
C4 is almost entirely immutable bindings, which is why it survives. But every
array element is a `ReferenceCell` too (§1), and `AtomicArray.get`, `set` and
`init` go straight to the cell's `getValue`, `assignValue`, `storeValue`
(`AtomicArray.java:48-65`).

A *transaction* is a block of reads and writes that either all take effect or
none do. Its *read set* is the list of cells it has read; its *write set* is the
cells it has written. Here the read set is kept on the cell, not on the
transaction, and it is consulted whether or not any transaction exists.

What one element write costs with no transaction running
(`interpreter/env/ReferenceCell.java:123-140`):

1. the method is `synchronized`, so a Java monitor is taken (`:123`);
2. `FortressTaskRunner.getTransaction()` is called (`:124`; `tasks/FortressTaskRunner.java:101-103` → `:54-61`);
3. `cleanup()` runs, itself `synchronized` (`:125`, `:87`);
4. a new `ValueNode` is allocated (`:138`), whose constructor allocates a new
   `ReadSet` (`interpreter/env/ValueNode.java:29-34`), whose constructor allocates a
   `CopyOnWriteArrayList` (`transactions/ReadSet.java:29-32`);
5. the old node's `abortAllReadersAndWriters()` seals and iterates its read set
   (`:139`; `ValueNode.java:74-93`).

Three allocations and a monitor per element write, in the no-transaction case.

What one element read costs (`ReferenceCell.java:163-172`): the monitor (`:163`),
the transaction lookup (`:164`), and a `while (node.getWriter() != null)` loop.
Cheap in objects, but a monitor per element. Four threads reading the same weight
element, as 16 tasks do during a 16 × 16 product, serialize on that one monitor.
Every `a[i]`, every `a[i] := v` and every `init0` inside every `fill` in C4 goes
through this. There is no unsynchronized fast path.

What `atomic` would add on top. `atomic E` goes through `Evaluator.forAtomicExpr`
(`Evaluator.java:183-201`) to `FortressTaskRunner.doIt`
(`tasks/FortressTaskRunner.java:147-175`), a `while (true)` around `doItOnce`
(`:121-138`): begin, run the body, commit; on `AbortedException`, go round again,
with no bound on retries. Each attempt allocates a `Transaction` with a status
reference, a children list and a nesting depth (`transactions/Transaction.java:41-53`).
Inside it, a read adds this transaction to the cell's read set
(`ReferenceCell.java:181-184` → `ValueNode.java:66-72`), which is a
`CopyOnWriteArrayList.addIfAbsent` after a `cleanup()` scan (`ReadSet.java:68-84`).
*Copy-on-write* means every add copies the whole backing array, so *n* readers of
one cell cost O(*n*²) copying. A write calls `resolveReadWriteConflicts()`
(`ReferenceCell.java:144`; `ValueNode.java:95-116`), which scans the read set and
hands every other live reader to the *contention manager*, the object that decides
which of two conflicting transactions survives. The default is `GreedyManager`
(`FortressTaskRunner.java:26`), whose policy is to abort the other one
(`transactions/manager/GreedyManager.java:32-49`). Eleven managers ship
(`transactions/manager/`); Greedy is the one wired in.

Put together, for a program that accumulated a gradient with
`atomic g[k] := g[k] + c` in a parallel loop, *T* threads on one cell would give
one commit and *T−1* aborts per round, each abort retried in full. No parallel
progress, all of the overhead. That program shape is what Pavol feared, and on
this mechanism he would be right. C4 does not have that shape (§5), and the 2008
team reached the same conclusion and serialized the axis instead
(`FortressLibrary.fss:2618-2620`).

## 7. The four-thread numbers

From `explorations/run-c4/checks/rerun-post-restart/threads1.txt` and `threads4.txt`
(lines 7-12, 42):

| | 1 thread | 4 threads | ratio |
|---|---|---|---|
| step 1 | 8 247 ms | 17 413 ms | 0.47× — slower |
| steps 2-5, mean | 4 840 ms | 1 879 ms | 2.58× |
| batch-4 step | 16 551 ms | 6 189 ms | 2.67× |
| whole check run | 528 s | 263 s | 2.01× |

The older pair (`checks/threads1.txt`, `threads4.txt`) agrees: step 1 14 042 → 30 273 ms
(0.46×), steps 2-5 mean 8 010 → 2 860 ms (2.80×), batch-4 28 245 → 10 674 ms
(2.65×), total 873 → 396 s (2.20×).

So the steady state runs 2.6-2.8× faster on four workers, and the headline 2×
is dragged down by a first step that is twice as slow at four threads. Where the
rest of 4× goes, in the audit's terms (§7.3):

1. Task overhead does not shrink with threads: 2(*n*−1) tasks per rank-1 loop at any
   thread count (`Evaluator.java:267-274`). Pure fixed weight.
2. Per-element monitors: reads of one shared weight element serialize (§6).
3. Allocation: three objects per element write plus four per task, into one heap
   from four workers, so GC and memory bandwidth are shared. The audit names this
   the most likely cause of the slower first step, which is also the JIT warm-up
   and cache-populating step; that is a reading, not a measurement.
4. The throttle clips rank-2 and rank-3 loops sooner under four workers (§3).
5. The loaders and the five-step driver are sequential (`FlatData.fss:77, 85, 96-97, 122`;
   `MicroGptFlat.fss:91`), a fixed cost in every check run.
6. Four workers on four cores leave nothing for the JVM's GC and JIT threads.

None of these is a race, and none is transaction contention: there are no
transactions. The gap between 2.6× and 4× is overhead and memory.

## 8. The compiled path

The compiled world's `for` is already parallel. `parloop`
(`Library/CompilerLibrary.fss:359-371`) halves at the midpoint and forks with
`do … also … end`, but only while the chunk is larger than `jLoopChunk()`; below
that it calls `countedseqloop` (`:373-382`). `jLoopChunk()` reads
`FORTRESS_LOOP_CHUNK`, default 1 (`nativeHelpers/runtime.java:16`;
`runtimeSystem/FortressExecutable.java:28, 53-57`). So by default it also splits to
single elements, but the knob exists, which the interpreter lacks.
`FilteredRange.loop` is `parloop` and `seqloop` is `countedseqloop` (`:431-432`);
`lo # sz` builds a `FilteredRange` (`:445-446`); `seq(…)` wraps it in `SeqGenZZ32`
(`:347-356`). Reductions use `gen`, which joins two halves as an argument tuple
(`:383-398`), and `seqgen` binds them as two statements (`:400-419`).

The codegen emits real fork-join for `also`. `CodeGen.forDo` with more than one
front calls `forDoParallel` → `genParallelExprs`
(`compiler/codegen/CodeGen.java:1963-1974`, `:1589-1664`), which generates a task
class per front, calls `forkIfProfitable` (`:1644`) and then `joinOrRun` (`:1660`).
The runtime's `worthSpawning` is a queue-depth check against `spawnThreshold`
(`runtimeSystem/BaseTask.java:113-120`), default 5 (`FortressExecutable.java:26-27, 47-51`).

Tuples and operator arguments are decided *statically*: `forTupleExpr` and
`forOpExpr` fork only when `ParallelismAnalyzer.worthParallelizing(x)` marked the
node (`CodeGen.java:3411-3418, 4860-4880`; `ParallelismAnalyzer.java:43-50, 95-106`,
`ARG_THRESHOLD = 2`). The interpreter decides the same thing at run time from the
queue (§3). Compiled and interpreted timings will differ for that reason alone.

Transactions in the compiled runtime key on `MutableFValue`: the read and write
sets are `Hashtable<MutableFValue, Any>` (`runtimeSystem/Transaction.java:27-28, 112-113, 121-122`).
Only mutable variables are transactional. There is no per-element cell, so §6's
cost floor does not exist there.

What blocks C4 is data, not parallelism. `CompilerLibrary.fss` has no `Array`, no
`Vector[\RR64\]`, no `Array3`; `Matrix` is an empty stub, `trait Matrix[\T, nat s0, nat s1\] extends Object end`
(`CompilerLibrary.fss:562` at HEAD `6a63980`, `:623` in the working tree); the only
vector is the native `ZZ32Vector` (`:484-533`). The staged edit in the working tree
adds a `Maybe` block and no array or vector type, so this holds in both.
The work is in the library: rank-1/2/3 array traits over an `RR64` store whose
`zeroIndices()` returns a `Range`, so that `fill`, `assign`, `map` and `ivmap`
inherit `parloop` for free; a `Matrix` with a real `mul`; and a `double[]` backing
class in `runtimeSystem/` beside the existing `MutableFValue` handles (audit §6.3,
with the interpreter's text as the template). Nothing needs building for the loop.
Compiling C4 therefore removes the per-element monitor and allocations outright
and keeps every parallel axis of §2.

## 9. Where the benefits can be reaped

What the machinery already parallelizes in C4, with no change:

| where | mechanism | already? |
|---|---|---|
| row and column axes of every product | tuples inside `Matrix.mul` (`FortressLibrary.fss:2516-2540`) | yes |
| every elementwise operation | parallel `fill` over the replica (`:2135-2138, 2396-2400, 2760-2765`) | yes, throttled for rank 2 and 3 (§3) |
| attention per head and per row | parallel `for` over planes and rows (`FlatArrays.fss:130, 156`) | yes |
| rmsn and softmax per row | `rows` (`FlatArrays.fss:144, 150`) | yes |
| q/k/v and gWQ/gWK/gWV | tuples (`MicroGptFlat.fss:58, 68`) | yes, throttled |
| Adam over 4192 parameters | three `fill`s (`MicroGptFlat.fss:77-79`) | yes |

What could be added:

- The contraction axis of a product, but only if written as a reduction. A cell
  computed as `SUM[b <- 0#s1] a[i,b] c[b,j]` would split its inner axis through
  the join tree of §4, with no shared write, because each leaf returns a value and
  `join` adds two values. The library's `mul` accumulates into `res` instead
  (`:2513`), which is why its authors serialized that axis. This is a library
  change, and its gain is not measured.
- The tuple form for independent statements, starting with `(m', v')` in `adam`
  (§2).

What is not there:

- No threshold on the interpreter's `also` path: a loop over 16 elements forks 30
  tasks (§3). The compiled path has `FORTRESS_LOOP_CHUNK` (§8).
- No locality. Every region is `Global`: `region(a) = Global`, `here() = Global`,
  `Region.isLocalTo` is `false` and `Global.isLocalTo` is `true`
  (`FortressLibrary.fss:75-90`); the library says "At the moment all Fortress
  objects are immediately shared by default" (`:63`); `Indexed.region(i)` is the
  array's own region (`:1677-1678`). The `at` prefix of a `do` front
  (`Specification/basic/expressions/blocks.tex:18, 35-39`) is evaluated by the
  interpreter and its value dropped (`Evaluator.java:246-249, 263-266`). No
  placement is possible today.

## 10. What to measure after the batch lands

The audit's six measurements, in its priority order, with its commands
(audit, "To measure after the batch lands"). The JFR profile is first because it
decides whether the next optimization is about parallelism at all: if `ValueNode`,
`ReadSet` and `CopyOnWriteArrayList` lead the allocation profile and `ReferenceCell`
leads the monitor profile, the cost is §6's floor, and more threads cannot remove it.

```bash
source /home/user/fortress/experiment/env.sh
export FORTRESS_CACHES=/tmp/c4-timing/caches      # keep the tree clean
cd /home/user/fortress/explorations/run-c4/src
```

**1. The allocation and monitor profile at four threads** (one check run, 263 s
on record, plus JFR's own overhead):

```bash
env FORTRESS_THREADS=4 JAVA_FLAGS="-Xmx4g -Xss64m \
  -XX:StartFlightRecording=settings=profile,filename=/tmp/c4-timing/t4.jfr,duration=300s" \
  ../../../bin/fortress MicroGptFlatCheck.fss > /tmp/c4-timing/check_jfr.txt
jfr summary /tmp/c4-timing/t4.jfr
jfr print --events jdk.ObjectAllocationSample /tmp/c4-timing/t4.jfr | \
  grep -c "ValueNode\|ReadSet\|CopyOnWriteArrayList"
jfr print --events jdk.JavaMonitorEnter,jdk.JavaMonitorWait /tmp/c4-timing/t4.jfr | head -80
```

**2. The scaling curve on a quiet machine**, one to four threads (four check
runs, roughly 528 + 263 s and two in between):

```bash
for t in 1 2 3 4; do
  /usr/bin/time -f "threads=$t wall=%e maxrssKB=%M" \
    env FORTRESS_THREADS=$t ../../../bin/fortress MicroGptFlatCheck.fss \
    > /tmp/c4-timing/check_t$t.txt 2>/tmp/c4-timing/check_t$t.time
done
grep -H "^total" /tmp/c4-timing/check_t*.txt
cat /tmp/c4-timing/check_t*.time
```

**3. Warm-up against steady state**, from the same outputs; the per-step
milliseconds are already printed:

```bash
grep -H "batch 1 step" /tmp/c4-timing/check_t*.txt
```

**4. Whether the unthrottled task explosion matters.** Guard `Evaluator.forDo` with
`TupleTask.worthSpawning()` the way `evalExprListParallel` already is
(`Evaluator.java:341`), in a worktree; one variable, one rebuild, the full gate
before and after (two gate runs, 739 s each on record), then the check at one and
four threads:

```bash
ant compileAll && ant testSystem && ant testFast
for t in 1 4; do env FORTRESS_THREADS=$t ../../../bin/fortress MicroGptFlatCheck.fss; done
```

**5. Whether the tuple parallelism pays.** In a scratch copy of the model, write
the tuples at `MicroGptFlat.fss:58` and `:68` as three separate bindings each, and
compare per-step milliseconds at four threads. This separates tuple parallelism
from loop parallelism.

**6. `FORTRESS_LOOP_CHUNK` on the compiled path**, once C4 compiles: the knob is
there (`FortressExecutable.java:53-57`) and defaults to 1. Sweep 1, 8, 64, 512 on
one compiled kernel.

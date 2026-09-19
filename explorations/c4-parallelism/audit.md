<!--
  Produced by a delegated audit worker, 2026-09-19, read-only against the tree.
  Question: for the hand-written microGPT program "C4" (explorations/run-c4/src/),
  what are its data structures; where is there parallelism in the program as
  written; how does the interpreter actually execute a parallel `for` and a
  reduction; what does every mutation site write and is any of it a race; what
  synchronisation is on the path outside `atomic` and what would `atomic` cost;
  is the compiled path's `for` parallel; and what do the committed four-thread
  check outputs actually show.
  Every claim carries file:line.  Line numbers are those of the file named,
  read on 2026-09-19.
-->

# C4: data, parallelism, task boundaries, and every write

## 0. Summary for the impatient

- **The coordinator's claim to Pavol is confirmed, line by line.** C4 has **no
  write to a location that a second parallel iteration also touches**. Every
  write in the three model components falls into (a) private to one iteration,
  (b) a disjoint index per parallel iteration, or (d) sequential context. There
  is no `atomic`, no `spawn`, no `do … also …` anywhere in C4
  (`explorations/run-c4/src/*.fss`, grep for `atomic|spawn|also|var`: empty).
  The training loop and the check driver are `seq(0#5)`
  (`MicroGptFlat.fss:91`, `MicroGptFlatCheck.fss:47`).
- **Gradient accumulation — the place to look hardest — is not done by mutation
  at all.** The many-positions-to-one-parameter contraction happens inside the
  *library's* matrix product (`Library/FortressLibrary.fss:2506-2548`), which
  splits the row and column axes in parallel and the **contraction axis
  sequentially**, on purpose. The library says why, in the source, at
  `FortressLibrary.fss:2618-2620`: *"used to use a cache-oblivious algorithm,
  but we ran into trouble due to lack of support for atomic increment of matrix
  elements"*, and again at `:2512`: *"If this were atomic, we could parallelize
  j-partition."*
- **The four-thread outputs are bit-identical for a structural reason, not by
  luck.** A parallel range splits at a fixed power-of-two boundary
  (`Library/RangeInternals.fss:1021-1034`), so the reduction tree is a function
  of the index range and nothing else. Probe `TreeProbe` confirms: the parallel
  `SUM` is the same double at 1 and at 4 threads, and *differs* from the
  sequential `SUM` in the last two digits.
- **The real surprise is the cost floor, not a race.** In the interpreter every
  element of every array is a separate `ReferenceCell` object
  (`interpreter/evaluator/transactions/AtomicArray.java:26,34-37`), and every
  read and every write of one takes a Java monitor and runs the transaction
  bookkeeping *whether or not a transaction is running*
  (`interpreter/env/ReferenceCell.java:123,163` — both `synchronized`). A write
  with no transaction still allocates a `ValueNode`, a `ReadSet` and a
  `CopyOnWriteArrayList` (`env/ValueNode.java:29-34`,
  `transactions/ReadSet.java:23-26`). Pavol's worry about inefficient
  synchronisation is right, but it is **already being paid on the ordinary
  path**; `atomic` would add to it, not introduce it.
- **The compiled path's `for` *is* parallel** — `Library/CompilerLibrary.fss:359-371`
  (`parloop`, with a `do … also …` and a chunk threshold) — and the compiler
  emits real fork/join tasks for `do … also …`
  (`compiler/codegen/CodeGen.java:1963-1974` → `:1589-1664`). What is missing on
  the compiled path is not parallelism, it is C4's data: `CompilerLibrary` has no
  `Array`, no `Vector[\RR64\]`, no `Array3`, and `Matrix` is an empty stub
  (`CompilerLibrary.fss:562`).

---

## 1. The data structures

### 1.1 The flat layout

C4 follows Hsu's flat data design: **one vector holds all nine weight
matrices**, and the matrices are *views* over slices of it, not copies.

| thing | type | shape | where |
|---|---|---|---|
| the parameter vector `p` | `Array[\RR64,ZZ32\]` | 4192 elements | `MicroGptFlat.fss:88`, `MicroGptFlat.fsi:19` |
| Adam first moment `m` | `Array[\RR64,ZZ32\]` | 4192 | `MicroGptFlat.fss:89` |
| Adam second moment `v` | `Array[\RR64,ZZ32\]` | 4192 | `MicroGptFlat.fss:90` |
| the flat gradient `g` | `Array[\RR64,ZZ32\]` | 4192 | `MicroGptFlat.fss:93`, built by `flat(...)` at `:71` |
| the corpus | `Corpus(tokm, len, blk)` | `tokm` is documents × (block+1) `ZZ32`; `len` is one `ZZ32` per document | `FlatData.fss:106-118`, built at `:119-124` |
| the causal mask | `Array[\RR64,(ZZ32,ZZ32)\]` | 16 × 16, a component-level constant | `MicroGptFlat.fss:29` |

The layout table is three small pure functions and a running offset:
`matShape` (`MicroGptFlat.fss:40-41`), `matCount` (`:42`), `matOffset(i) = SUM[j <- 0#i] matCount(j)`
(`:43`), `nParams() = matOffset(9) = 4192` (`:44`). Matrix *i* occupies
`p[matOffset(i) … matOffset(i)+matCount(i)-1]`, **row-major**, in the order
wte, wpe, lm_head, attn_wq, attn_wk, attn_wv, attn_wo, mlp_fc1, mlp_fc2
(`matName`, `:37-39`). Shapes: (27,16), (16,16), (27,16), then four (16,16),
then (64,16) and (16,64) (`:40-41`).

`view(p,i)` (`MicroGptFlat.fss:45`) hands back matrix *i* as a `PView`
(`FlatArrays.fss:54-59`), an object with just a base vector and an offset whose
`get`/`put` compute `off + i·c + j` (`:55-56`). The nine views are taken once per
step, at `MicroGptFlat.fss:53`. **No copy is made**: reading `wq[i,j]` reads
`p[matOffset(3) + 16i + j]`.

### 1.2 The view vocabulary

Everything in C4 that looks like a reshape is a view object — zero-copy, with
`get`, `put`, `init0` and `replica`:

- `PView` — a matrix over a slice of a flat vector (`FlatArrays.fss:54-59`).
- `RowView` — row *i* of a matrix, as a vector (`:66-71`).
- `Row3View` — row *i* of plane *p* of a rank-3 array (`:73-78`).
- `HeadsView` — a (positions × model-dim) activation seen as (docs·heads) planes
  of (positions × head-dim); `plane q, row i, col j` is
  `base[(q DIV nh)·p + i, (q MOD nh)·k + j]` (`:83-89`).
- `UnheadsView` — the inverse (`:96-102`).
- `PlaneView` — one plane of a rank-3 array as a matrix (`:110-115`).
- `Transposed3` — every plane transposed (`:117-122`); plain matrix transpose is
  the library's `TransposedMatrix` via `m.t()` (`FlatArrays.fss:49`,
  `FortressLibrary.fss:2571-2589`).
- `Diag` — a diagonal held as its vector, so `diag(v) m` scales rows without ever
  forming the matrix (`FlatArrays.fss:40-43`).

Shapes that are only known at run time are recovered through the library's
`reflect` idiom (`FlatArrays.fss:60-63, 90-95, 103-108`, commented against
`FortressLibrary.fss:1922-1934`).

### 1.3 What the arrays actually are, underneath

`array[\RR64\](n)` → `__arr1` → `array1[\RR64,n\]()` → because `RR64` is a
`Number`, `vector[\RR64,n\]()` → `__DefaultVector`, whose storage is
`mem: PrimitiveArray[\T,s0\]` (`FortressLibrary.fss:1922-1931, 2240-2244,
2204-2210`). Rank 2 goes to `__DefaultMatrix` (`:2563-2569`) and rank 3 to
`__DefaultArray3` (`:2780-2790`), both also over `PrimitiveArray`.

`PrimitiveArray`'s native implementation is
`interpreter/glue/prim/PrimitiveArray.java:26-35`, and it makes an
**`AtomicArray`** — which is
`private ReferenceCell[] array` with **one `ReferenceCell` object per element**
(`interpreter/evaluator/transactions/AtomicArray.java:26,31-38`). So C4's 4192
parameters are 4192 `ReferenceCell`s, each holding a `ValueNode` holding an
`FFloat`. This matters for §5 and §7.

### 1.4 Activations and gradients

`step` (`MicroGptFlat.fss:51-72`) is a pure function: keys in, `(loss, gradient)`
out. Every intermediate is a *fresh* array produced by an expression; nothing is
updated in place. Forward: `x`, `xp`, `x1` (rows × 16), `q,k,v` (rows × 16),
`qh,kh,vh` (4 planes × 16 × 4 — views, not copies), `a` (attention, 4 × 16 × 16),
`hc`, `x2`, `x3`, `m0` (rows × 64), `mr`, `x4`, `pr` (rows × 27). Backward, one
line under each forward line (`:63-70`): `dL`, `gLM`, `dX4`, `gF2`, `dM0`, `gF1`,
`dX3`, `dX2`, `gWO`, `dh`, `dVh`, `dS`, `dQh`, `dKh`, `dQ/dK/dV`, `gWQ/gWK/gWV`,
`dX1`, `dXp`, `dX`, `gWTE`, `gWPE`. The nine gradient matrices are concatenated
into one flat vector in layout order by `flat(...)` (`:71`, implemented at
`FlatArrays.fss:179-188`).

Adam (`MicroGptFlat.fss:75-81`) is three whole-vector expressions; it returns a
new `(p', m', v')` triple. The driver rebinds, it does not mutate arrays
(`:94`).

### 1.5 What is mutated, in one sentence each

1. Freshly allocated arrays, while they are being filled — the library's
   `fill`/`assign`/`map`/`ivmap` (`FortressLibrary.fss:1974-1996, 2135-2138,
   2396-2400, 2760-2765`) and the matrix product's result
   (`:2506-2548`).
2. Three driver variables in `run()` — `p`, `m`, `v` (`MicroGptFlat.fss:88-90`,
   reassigned at `:94`), inside a `seq` loop.
3. Loader scratch in `FlatData.fss` — all inside `while` loops or `seq` loops.
4. Two counters and some scratch in the check component
   (`MicroGptFlatCheck.fss:20-21, 43-45, 69, 78, 82-83, 88`), all sequential.

The parameter vector is **never written after it is loaded**. The views onto it
are only read.

---

## 2. Where parallelism exists in the program as written

### 2.1 The rule

`Specification/basic/expressions/for.tex:28-32`: *"in general the programmer must
assume that each loop iteration will occur independently in parallel unless
every generator is explicitly `sequential`."* Tuples:
`basic/expressions/tuple-expr.tex:23-24`. Operator operands:
`basic/expressions/operator-app.tex:59`. In the library `seq(g)` and
`sequential(g)` are the same thing (`FortressLibrary.fss:1242`).

### 2.2 Every `for` in C4

| file:line | generators | parallel or seq | what the body does |
|---|---|---|---|
| `FlatArrays.fss:130` | `p <- 0#np` | **parallel** | writes plane *p* of a fresh rank-3 `out` |
| `FlatArrays.fss:144` | `i <- 0#n` | **parallel** | writes row *i* of a fresh `out` |
| `FlatArrays.fss:150` | `i <- 0#n` | **parallel** | writes row *i* of a fresh `out` |
| `FlatArrays.fss:156` | `p <- 0#np, i <- 0#n` | **parallel** (both) | writes row *i* of plane *p* |
| `FlatArrays.fss:162` | `p <- 0#np, i <- 0#n` | **parallel** (both) | writes row *i* of plane *p* |
| `FlatArrays.fss:182` | `m <- seq(ms)` | **seq** | per-matrix block of `flat` |
| `FlatArrays.fss:184` | `i <- 0#nr, j <- 0#nc` | **parallel** (both), nested in the `seq` above | `out[off + i·nc + j] := m[i,j]` |
| `FlatData.fss:77` | `i <- seq(0#cnt)` | **seq** | `out[i] := g.readLine()` — stream order |
| `FlatData.fss:85` | `i <- seq(0#n)` | **seq** | `v[i] := parseFloat(f.readLine())` — stream order |
| `FlatData.fss:96` | `i <- seq(0#count)` | **seq** | one weight file |
| `FlatData.fss:97` | `line <- seq(readLines(...))` | **seq** | `off += parseRow(...)` — a running offset |
| `FlatData.fss:122` | `d <- seq(…), j <- seq(…)` | **seq** (both) | `tokm[d, 1+j] := …` |
| `MicroGptFlat.fss:91` | `s <- seq(0#5)` | **seq** | a training step — genuinely sequential |
| `MicroGptFlatCheck.fss:47` | `s <- seq(0#5)` | **seq** | five Adam steps |
| `MicroGptFlatCheck.fss:67` | `d <- seq(0#4)` | **seq** | four single-document losses |
| `MicroGptFlatCheck.fss:79` | `r <- seq(0#|fdRows|)` | **seq** | finite differences |

Five parallel `for`s, all in the vocabulary; eleven `seq` ones, all in the
loaders and the drivers. The `seq` choices in `FlatData` are forced (file stream
order, a running offset); the `seq` in the training loops is forced (step *s+1*
needs the parameters from step *s*).

### 2.3 The parallelism that does not look like a loop

Far more of C4's parallelism comes from the library than from its own five
`for`s. Every one of these is a parallel `for i <- zeroIndices()` inside the
library:

- `fill(f)` and `fill(v)` — `FortressLibrary.fss:1974-1981`. C4 calls it in
  `vec`, `zeros`, `keys`, `mat` (`FlatArrays.fss:14-17`), `gather` (`:170`),
  `onehot` (`:174` via `mat`), `pick` (`:177` via `vec`), and the corpus's
  `tokens`/`positions`/`valid` (`FlatData.fss:112-117`).
- `assign(v)` and `assign(f)` — `FortressLibrary.fss:1989-1996`. This is what
  the five `for`s in `FlatArrays` call per row/plane, so each of those
  iterations is itself a parallel loop.
- `map`/`ivmap`/`copy` — `FortressLibrary.fss:2135-2138` (rank 1, and `:2129-2130` for `copy`),
  `:2396-2400` (rank 2), `:2760-2765` (rank 3); each is
  `replica().fill(…)`. **Every elementwise operator in C4's vocabulary is one of
  these**: `+ - × / MAX > SQRT exp log` at `FlatArrays.fss:24-37`, the
  `Diag` product at `:42-43`, and the matrix-plus-rank-3 at `:134-135`.
- The matrix product `Matrix.mul` — `FortressLibrary.fss:2506-2548` — a
  recursive divide-and-conquer; see §4.4.
- The vector dot product — `dot(v) = SUM[(i,me_i) <- self.indexValuePairs] me_i v.get(i)`
  (`FortressLibrary.fss:2200-2201`), a parallel reduction. C4 uses it at
  `MicroGptFlat.fss:27, 31, 32, 34, 61`.

### 2.4 Reductions in C4

| file:line | reduction | reduction object |
|---|---|---|
| `MicroGptFlat.fss:28` | `BIG MAX[t <- z] t` | `MaxReduction` — `FortressLibrary.fss:3114-3121` |
| `MicroGptFlat.fss:28` | `SUM e` | `SumReduction` — `:3021-3040` |
| `MicroGptFlat.fss:43` | `SUM[j <- 0#i] matCount(j)` | `SumReduction` |
| `MicroGptFlat.fss:52` | `SUM vm` | `SumReduction` |
| `FlatArrays.fss:180` | `SUM[m <- ms] |m|` | `SumReduction` |
| `MicroGptFlat.fss:27,31,32,34,61` | `DOT` → `SUM` inside `Vector.dot` | `SumReduction` |
| `MicroGptFlatCheck.fss:27,36,38` | `BIG MAX` | `MaxReduction` |
| `MicroGptFlatCheck.fss:56,72` | `SUM` | `SumReduction` |

All of them are parallel: the generator is a parallel range or a parallel array.

### 2.5 Where operand and tuple parallelism can fire

The spec makes the elements of a tuple and the arguments of an operator or
function evaluate in parallel implicit threads. In C4 that is:

- `MicroGptFlat.fss:53` — a 9-element tuple of nine `view` calls.
- `:58` — `(q,k,v) = (x1 wq^T, x1 wk^T, x1 wv^T)`: **three independent matrix
  products in one tuple**, and `(qh,kh,vh) = (h(q),h(k),h(v))` beside it.
- `:67` — `(dQ,dK,dV) = (u(dQh), u(dKh), u(dVh))`.
- `:68` — `(gWQ,gWK,gWV) = (dQ^T x1, dK^T x1, dV^T x1)`: **three independent
  matrix products**, the backward twin of `:58`.
- `:71` — `flat(gWTE, gWPE, gLM, gWQ, gWK, gWV, gWO, gF1, gF2)`, nine arguments,
  and `(loss, flat(...))`, a 2-tuple.
- `:80` — `(p', m', v')`.
- `:17-19` — the hyperparameter tuples, once.
- Every infix operator application in `step` and `adam`: `a + b`, `a / b`,
  `a × b`, `a - b` evaluate their two operands in parallel.

### 2.6 The algorithmic view: independence available, taken, and foreclosed

**Taken.**
- *Across rows (document × position).* The whole forward pass is written over all
  rows at once (`MicroGptFlat.fss:57-61`), so row independence is expressed as
  array shape and is exploited by every `fill`/`map`/`assign` and by `rows`
  (`FlatArrays.fss:141-146`). This is the dominant source of parallelism.
- *Across heads.* `heads`/`unheads` (`FlatArrays.fss:83-108`) turn the head axis
  into a plane axis, and the batched product loops over planes in **parallel**
  (`:130`).
- *Across the three projections q, k, v and the three gradients gWQ, gWK, gWV.*
  Expressed as tuples (`:58`, `:68`).
- *Across parameters, in Adam.* `adam` is three whole-vector expressions
  (`:77-79`); each elementwise operator is a parallel `fill` over 4192 elements.
- *Across positions inside softmax and rmsn.* `rows(sm, …)` and `rows(rmsn, …)`
  are parallel `for`s over rows (`FlatArrays.fss:144`).

**Available in principle but not expressed.**
- `adam`'s `m'` and `v'` (`MicroGptFlat.fss:77-78`) are independent of each
  other but are written as two successive statements in a block, so they run in
  sequence. Writing `(m', v') = (…, …)` would make them a tuple. The cost is
  small — each is already internally parallel — but it is the one clean example
  of foreclosed independence in the model.
- The attention scores and the masked softmax could in principle overlap with the
  value projection; as written they are chained by data dependence anyway.

**Deliberately foreclosed with `seq`.**
- `flat`'s outer loop (`FlatArrays.fss:182`), because it carries the running
  offset `off` (`:181, :185`). The inner loop stays parallel (`:184`).
- The loaders (`FlatData.fss:77, 85, 96, 97, 122`), because they read a stream.
- The training/check loops (`MicroGptFlat.fss:91`, `MicroGptFlatCheck.fss:47, 67, 79`),
  because of the step-to-step dependence and because `report` bumps shared
  counters (`MicroGptFlatCheck.fss:24`).

**Not expressed anywhere, and this is the important one:** the contraction over
positions that turns many per-position contributions into one gradient for a
shared weight. C4 never writes that as an accumulation. It writes it as a matrix
product — `gLM = dL^T x4` (`:63`), `gF2 = dX4^T mr` (`:64`),
`gWO = dX2^T hc` (`:65`), `gWQ/gWK/gWV = d_^T x1` (`:68`),
`gWTE = transpose(onehot(ids, vocabSize)) dX` (`:70`) — and the summation lives
inside the library's product, where the contraction axis is split sequentially
(§4.4). **There is no gradient accumulation by mutation in C4 at all.**

---

## 3. Task boundaries: how the interpreter really runs this

### 3.1 From `for` to a generator method call

The desugarer rewrites `for x <- g, y <- h do body end` into
`g.loop(fn x => h.loop(fn y => body))` —
`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:357-382`
(`visitLoop`, using `LOOP_NAME` from `nodes_util/DesugarerUtil.java:31-32`). A
reduction desugars instead to `__generate(g, r, body)` wrapped in
`__bigOperator` (`DesugarerUtil.java:130-160`; the glue functions are
`FortressLibrary.fss:1063-1067` and `:1118-1123`).

**So parallelism is not a property of the loop syntax at all.** It is a property
of the generator object, chosen by ordinary dynamic dispatch on `loop` /
`generate`. `0#n` builds a `CompactFullParScalarRange`
(`FortressLibrary.fss:3813` → `RangeInternals.fss:1422-1423`); `seq(0#n)` calls
the functional method `seq(self)` which returns a `CompactFullSeqScalarRange`
(`RangeInternals.fss:1019`).

### 3.2 The parallel range: how it splits

`CompactFullParScalarRange.loop` (`RangeInternals.fss:1036-1053`):

```
lop(lo,hi) = if lo=hi then body(lo)
             else split = partitionL((lo BITXOR hi)+1)
                  mid   = hi BITAND (BITNOT (split-1))
                  do lop(lo,mid-1) also do lop(mid,hi) end
             end
```

- **Split point**: not the midpoint — `partitionL(x) = Integer.highestOneBit(x-1)`
  (`interpreter/glue/prim/Int.java:203-207`), so the range is cut at the highest
  power-of-two boundary it contains. Deterministic given `(lo,hi)`.
- **Granularity**: down to **one element**. `lo=hi` is the only base case.
  **There is no threshold below which no task is forked** in this path.
- For a range of *n* elements there are exactly *n−1* splits, hence *n−1*
  `do … also …` evaluations.

`CompactFullParScalarRange.generate` (`:1021-1034`) has the same split, but
instead of `do … also …` it writes `red.join(loop'(lo,mid-1), loop'(mid,hi))` —
the two halves are the two elements of the argument tuple of `join`, so they run
in parallel by the tuple rule.

The sequential twin, for contrast, is a plain `while` loop with a running
accumulator (`RangeInternals.fss:1059-1082`).

### 3.3 `do … also …` in the interpreter

`Evaluator.forDo` (`interpreter/evaluator/Evaluator.java:238-280`): with one
front it evaluates in place; with two or more it builds one `TupleTask` per
front (`:267-270`) and calls `TupleTask.invokeAll(tasks)` (`:274`), then reads
each result (`:277-279`) — that is the join. Note: **there is no
`worthSpawning()` guard on this path**, unlike the tuple path in §3.4. So a
parallel 1-D `for` over *n* elements allocates 2(*n*−1) `TupleTask`s whatever
`FORTRESS_THREADS` is.

A task costs: one `TupleTask` object, which captures an `Evaluator`
(`Evaluator.java:269`), plus, when it runs, a fresh environment
`eval.e.extendAt(expr)` and another `Evaluator`
(`tasks/TupleTask.java:36-38`). `BaseTask`'s constructor also walks to the
parent task to inherit the transaction and the depth
(`tasks/BaseTask.java:33-44`). Roughly four objects and an environment extension
per implicit thread.

`invokeAll` is `java.util.concurrent.ForkJoinTask.invokeAll(Collection)`
(`TupleTask extends BaseTask extends RecursiveAction`,
`tasks/BaseTask.java:21`): it runs one task inline and forks the rest onto the
worker's deque, then joins. With `FORTRESS_THREADS=1` nothing is stolen, but the
objects are still allocated and the deque is still pushed and popped.

### 3.4 Operand and tuple parallelism

`Evaluator.evalExprListParallel` (`Evaluator.java:336-362`) is the single
implementation:

```java
if (sz < 2 || !TupleTask.worthSpawning()) { evalExprList(exprs, resList); }
else { … new TupleTask(expr, this) … TupleTask.invokeAll(TupleTasks); … }
```

`TupleTask.worthSpawning()` is `ForkJoinTask.getSurplusQueuedTaskCount() <= 3`
(`tasks/TupleTask.java:119-121`) — a **dynamic** throttle: if this worker's deque
already has more than three surplus tasks waiting, the operands are evaluated in
sequence instead. Call sites: tuple expressions (`Evaluator.java:1338,1341`),
operator applications (`:845-846`), juxtaposition (`:671`), function application
(`:701`), invocation arguments (`:1252`), subscripts (`:902`), and the LHS of an
assignment (`LHSEvaluator.java:44`, `LHSToLValue.java:49`).

**A consequence worth stating plainly.** A 1-D `for i <- 0#n` reaches its
parallelism through `loop` → `do … also …` → `forDo`, which is *unthrottled*. A
2-D or 3-D `fill`/`assign` (what every matrix and rank-3 elementwise operator in
C4 uses) reaches it differently: `zeroIndices()` on a rank-2 array returns a
`CompactFullRange2D` (`FortressLibrary.fss:2387`), whose `loop` delegates to
`self.generator.loop` (`:1779`), whose generator is
`range1.cross(range2)` = a `SimplePairGenerator`
(`RangeInternals.fss:900`; `FortressLibrary.fss:1036-1037, 3520-3526`),
which does **not** override `loop`, so it falls back to
`Generator.loop(f) = generate[\()\](VoidReduction, f)` (`:1052`) and runs through
`PairGenerator.generate` (`:3515-3517`) and thence the `red.join(a,b)` argument
tuple. **So rank-2 and rank-3 loops parallelise through the throttled tuple path,
and rank-1 loops through the unthrottled `also` path.** Two different mechanisms
for the same surface syntax.

### 3.5 The pool

`Driver.getNumThreads()` (`interpreter/Driver.java:518-529`) reads
`FORTRESS_THREADS`, else uses half the available processors. The pool is a
`FortressTaskRunnerGroup extends java.util.concurrent.ForkJoinPool`
(`tasks/FortressTaskRunnerGroup.java:16-33`) whose workers are
`FortressTaskRunner extends ForkJoinWorkerThread`
(`tasks/FortressTaskRunner.java:24`), each carrying a mutable `task` field
(`:27`) that is how the current transaction is found (`:59-65`). The program runs
as one `EvaluatorTask` submitted with `group.invoke` (`Driver.java:553-566`).

### 3.6 Reductions: `empty`, `join`, and which algebra is assumed

`trait Reduction[\L\]` has exactly `empty(): L` and `join(a,b): L`
(`FortressLibrary.fss:2835-2839`). The contract is stated twice, both times as a
**comment**:

- `FortressLibrary.fss:972-979` — *"The results of generation are combined using
  the reduction object R, which specifies a monoidal operation (associative and
  with an identity). … The author of the generator is free to use the identity
  element anywhere desired in this computation, and to group reductions in any
  way desired."*
- `FortressLibrary.fss:2847-2850` — *"Invariants: join must be associative with
  identity empty; unlift(lift(x)) = x."*

So the mechanism is: **a parallel generator may cut the index space anywhere,
combine each piece independently, and glue the pieces with `join`, because
`join` is declared associative with `empty` as identity.** Associativity is what
licenses the tree; the identity is what licenses an empty leaf.

**Pavol's exact question — "is there some propagation of algebraic properties
that allows us to parallelize stuff?" — answered with the mechanism:**

1. *The property is carried by the type, not inferred.* A reduction is an object
   that supplies `empty`/`join`. Associativity is asserted in prose and is
   **never checked** — nothing in the library or the interpreter verifies it.
2. *Commutativity is carried by a marker trait.* `SomeCommutativeReduction`
   (`FortressLibrary.fss:2945`, described in the api as *"mark for commutative"*
   at `FortressLibrary.fsi:1763`) is an empty trait mixed into
   `CommutativeReduction` (`:2947`) and `CommutativeMonoidReduction` (`:2957`).
   `SumReduction`, `ProdReduction`, `MaxReductionN`, `MaxReduction` all declare
   it (`:3021-3025, 3047-3050, 3065, 3114`). It is consulted at run time by a
   `typecase` — `commutative(r)` at `Library/Generator2.fss:94-99`.
3. *Distributivity is carried by an overloaded method.* `ActualReduction.distribute`
   defaults to "no" (`FortressLibrary.fss:2866-2867`) and is overridden per pair:
   `SumReduction.distribute(MaxReduction)` returns `MaxSumReductionPair`, and so
   on (`:3031-3038`, `:3054-3055`). `Generator2.fss:73` asks
   `distributes(q,r) = r.distribute(q).holds`, and `Generator2.fss:411` combines
   them: `distributes(q,r) AND commutative(q)`. That is the guard for **fusing
   two nested `BIG` operators into one traversal** (`__bigOperator2`,
   `FortressLibrary.fss:1144-1165`).
4. **Nothing is declared or checked at the *type* level.** There is a commented-out
   sketch of a `Monoid[\T, opr OPLUS\]` trait at `FortressLibrary.fss:2820-2827`
   that was never enabled.

**The practical consequence, which C4 depends on.** Because the split point is a
pure function of `(lo,hi)` (`RangeInternals.fss:1027-1028`) and the join tree is
built from that split, *the shape of the tree does not depend on the scheduler*.
Two runs with different thread counts perform exactly the same additions in
exactly the same grouping. Floating-point addition is not associative, so the
library's assumption is formally violated — but the violation is **deterministic**.
Probe `TreeProbe` (§Probes) shows both halves of this: the parallel `SUM` is
`8.895103896966324` at 1 thread and at 4 threads, and the sequential `SUM` of the
same data is `8.89510389696629`.

---

## 4. The audit: every write

Verdict key, per the brief: **(a)** private to one iteration; **(b)** disjoint
index per parallel iteration; **(c)** a data race under
`Specification/basic/memory-model.tex:69-75`; **(d)** sequential context only.

### 4.1 `MicroGptFlat.fss` — the model

| line | write | enclosing loops | verdict |
|---|---|---|---|
| 88 | `p := loadParams(...)` — declare + init a local mutable | none | **(d)** |
| 89 | `m := zeros(nParams())` | none | **(d)** |
| 90 | `v := zeros(nParams())` | none | **(d)** |
| 94 | `(p, m, v) := adam(...)` — tuple assignment to the three locals | `for s <- seq(0#5)` (`:91`) — **seq** | **(d)** |

That is the complete list. `step` (`:51-72`) and `adam` (`:75-81`) contain **no
assignment of any kind**. Nothing writes through the nine parameter views.

### 4.2 `FlatData.fss` — the loaders

| line | write | enclosing loops | verdict |
|---|---|---|---|
| 16-20 | `m`, `scale`, `ex`, `i`, `seenPoint` — locals in `parseFloat` | none | **(a)** per call |
| 24, 26, 27, 29 | updates to those locals | `while` (`:22`) | **(a)** |
| 34, 35 | `ex := …` | none | **(a)** |
| 47, 48, 52 | `i`, `k`, `j` — locals in `parseRow` | none / `while` | **(a)** |
| 53, 55, 56 | `j += 1`, `k += 1`, `i := j` | `while` (`:49, :53`) | **(a)** |
| 54 | `out[off + k] := parseFloat(...)` | `while` (`:49`) | **(d)** — sequential, and `out` is the caller's fresh buffer |
| 71-73 | `cnt`, `line` in `readLines` | `while` (`:73`) | **(a)** |
| 77 | `out[i] := g.readLine()` | `for i <- seq(0#cnt)` — **seq** | **(d)** |
| 85 | `v[i] := parseFloat(f.readLine())` | `for i <- seq(0#n)` — **seq** | **(d)** |
| 95 | `off := 0` in `loadParams` | none | **(a)** |
| 97 | `off += parseRow(line, p, off)` | `for i <- seq(…)` (`:96`), `for line <- seq(…)` (`:97`) — both **seq** | **(d)** |
| 122 | `tokm[d, 1+j] := …` | `for d <- seq(…), j <- seq(…)` — both **seq** | **(d)** |

`Corpus`'s fields (`FlatData.fss:106`) are constructor parameters, not `var`s;
no method writes them.

### 4.3 `FlatArrays.fss` — the vocabulary, where the element writes happen

**The view objects' `put`/`init0`.** These are the write primitives; they do not
loop, they forward one index:

| line | write |
|---|---|
| `:56` | `PView.put` → `base.put(off + i·c + j, x)` |
| `:57` | `PView.init0` → `base.init0(off + i·c + j, x)` |
| `:68, :69` | `RowView.put/init0` → `base.put((i,j), x)` |
| `:75, :76` | `Row3View.put/init0` → `base.put((p,i,j), x)` |
| `:86, :87` | `HeadsView.put/init0` → `base.put(((q DIV nh)·p+i, (q MOD nh)·k+j), x)` |
| `:99, :100` | `UnheadsView.put/init0` → `base.put(((i DIV b)·nh + (j DIV c), i MOD b, j MOD c), x)` |
| `:112, :113` | `PlaneView.put/init0` → `base.put((p,i,j), x)` |
| `:119, :120` | `Transposed3.put/init0` → `base.put((p,j,i), x)` |

Each is an **injective index map**, so distinct view indices land on distinct
base cells. That is what makes the disjointness arguments below hold through the
views.

**The loops that call them.**

| line | write | enclosing loops | verdict |
|---|---|---|---|
| `:14-17` | `vec`, `zeros`, `keys`, `mat`: `array(...).fill(f)` | the library's **parallel** `for i <- zeroIndices()` (`FortressLibrary.fss:1974-1981`) | **(b)** — one `init0` per index, into a just-allocated array |
| `:24-37` | the elementwise operators: `a.map(...)` / `a.ivmap(...)` | `replica().fill(...)` — **parallel** (`FortressLibrary.fss:2135-2138, 2396-2400, 2760-2765`) | **(b)** |
| `:42-43` | `Diag` product: `m.ivmap(...)` | same | **(b)** |
| `:130` | `(plane(out,p)).assign(...)` | `for p <- 0#np` — **parallel**; `assign` is itself a **parallel** `for` (`FortressLibrary.fss:1989-1996`) | **(b)** — iteration *p* writes only plane *p* of the fresh `out`; inner iteration `(i,j)` writes only `out[p,i,j]` |
| `:134-135` | matrix-plus-rank-3: `t.ivmap(...)` | parallel `fill` | **(b)** |
| `:144` | `(row(out,i)).assign(f(row(m,i)))` | `for i <- 0#n` — **parallel**; inner `assign` **parallel** | **(b)** — iteration *i* writes only row *i* of the fresh `out` |
| `:150` | `(row(out,i)).assign(f(row(x,i), row(y,i)))` | same | **(b)** |
| `:156` | `(row3(out,p,i)).assign(f(row3(t,p,i)))` | `for p <- 0#np, i <- 0#n` — **parallel** | **(b)** — iteration `(p,i)` writes only row *i* of plane *p* |
| `:162` | `(row3(out,p,i)).assign(f(row3(x,p,i), row3(y,p,i)))` | same | **(b)** |
| `:170` | `gather`: `array(|ks|,nc).fill(fn (i,j) => m[ks[i],j])` | parallel `fill` | **(b)** write; the read of `m` is read-only sharing |
| `:174` | `onehot` via `mat` | parallel `fill` | **(b)** |
| `:177` | `pick` via `vec` | parallel `fill` | **(b)** |
| `:180` | `out = zeros(SUM[m <- ms] |m|)` | parallel `fill` | **(b)** |
| `:181` | `off: ZZ32 := 0` | none | **(a)** |
| `:184` | `out[off + i·nc + j] := m[i,j]` | outer `for m <- seq(ms)` (`:182`) — **seq**; inner `for i <- 0#nr, j <- 0#nc` — **parallel** | **(b)** — within one outer iteration `off` is fixed and `(i,j) ↦ off + i·nc + j` is injective; across outer iterations the blocks are disjoint because `off` advances by exactly `nr·nc` |
| `:185` | `off += nr nc` | `for m <- seq(ms)` — **seq** | **(d)** |

The one subtlety at `:184-185` is whether the parallel inner loop is finished
before `off` is bumped. It is: the statements of a block execute in order and a
`for` expression completes only when its implicit threads have joined
(`Evaluator.java:274-279` — `invokeAll` then read every result). Probe
`FlatShapeProbe` reproduces exactly this shape at 1 and 4 threads and finds 0
wrong cells out of 2048 in every run.

### 4.4 The library's matrix product — the site that *is* an accumulation

`Matrix.mul` (`FortressLibrary.fss:2506-2548`) is where every gradient
contraction in C4 actually happens. Two mutually recursive local functions over
a 3-D index box `(a,i)` rows × `(b,j)` inner × `(c,k)` columns:

- `mm` stores: `res.put((a,c), get(a,b) other.get(b,c))` (`:2529`).
- `mma` accumulates: `res.put((a,c), res.get(a,c) + pr)` (`:2513`).
- **Row split** (`i`): `(mma(a,i0,…), mma(a+i0,i1,…))` — a **tuple**, so parallel
  (`:2524, 2540`).
- **Column split** (`k`): `(mma(…,c,k0), mma(…,c+k0,k1))` — a **tuple**, so
  parallel (`:2516, 2532`).
- **Inner (contraction) split** (`j`): two **separate statements**, so
  **sequential** (`:2520-2521, 2536-2537`).

And the reason is written in the source, twice:

> `FortressLibrary.fss:2512` — *"If this were atomic, we could parallelize
> j-partition."*  (a comment, sitting on the line above the accumulating write)
>
> `FortressLibrary.fss:2618-2620` — *"Matrix multiplication; used to use a
> cache-oblivious algorithm, but we ran into trouble due to lack of support for
> atomic increment of matrix elements."*

Verdict: **(b)** for the parallel axes (each leaf `(a,c)` is written by exactly
one task) and **(d)** for the accumulation (the read-modify-write on `res[a,c]`
only ever runs in sequence).

### 4.5 `MicroGptFlatCheck.fss` — the driver

| line | write | enclosing loops | verdict |
|---|---|---|---|
| 20, 21 | `passed`, `failed` — **top-level** mutable variables | none | **(d)** |
| 24 | `passed += 1` / `failed += 1` inside `report` | `report` is called only from `run()` and from the `seq` loops at `:47, :67, :79` and from `checkFd`'s `seq` loop | **(d)** |
| 43-45 | `p`, `m`, `v` locals | none | **(d)** |
| 51 | `g0.assign(fn i => g[i])` | `for s <- seq(0#5)` (`:47`) — **seq**; `assign` itself is a **parallel** `for` | **(b)** inside, **(d)** outside |
| 52 | `(p,m,v) := adam(...)` | `seq` | **(d)** |
| 69 | `singles[d] := ld` | `for d <- seq(0#4)` (`:67`) — **seq** | **(d)** |
| 78 | `worst: RR64 := 0.0` | none | **(a)** |
| 82, 83 | `pp[idx] := …`, `pm[idx] := …` on `p0.copy()` | `for r <- seq(…)` (`:79`) — **seq**; each `copy()` is a fresh array | **(d)** |
| 88 | `worst := worst MAX diff` | `seq` | **(d)** |

`report`'s counters are the only shared mutable state in the whole program, and
they are only ever touched from sequential loops.

### 4.6 Verdict on the coordinator's claim

> *"C4 is data-parallel, no shared writes, the training loop is `seq(0#5)`, the
> four-thread checks are identical."*

**Confirmed, on all four counts.**

- *Data-parallel* — yes, and mostly through the library rather than C4's own
  five `for`s (§2.3).
- *No shared writes* — **no site in the table above is category (c)**. Every
  parallel write lands in a freshly allocated array at an index that is an
  injective function of the iteration variable. The parameter vector is written
  once, sequentially, by the loader (`FlatData.fss:97` → `:54`), and never again.
- *The training loop is `seq(0#5)`* — `MicroGptFlat.fss:91`,
  `MicroGptFlatCheck.fss:47`.
- *The four-thread checks are identical* — see §7; they are bit-identical on all
  40 numbers, and §3.6 explains why that is structural rather than lucky.

Pavol's doubt was well placed as a matter of method — the earlier claim came from
a construct inventory — but the audit does not overturn it. What the audit adds
is *why* there is no shared write: not because C4 avoided one by care at each
site, but because it never expresses a contraction as an accumulation. The one
accumulation in the whole stack is in the library's matrix product, and the
library authors serialised its axis rather than make it atomic
(`FortressLibrary.fss:2512, 2618-2620`).

**And it is not a merely theoretical guarantee.** Probe `RaceProbe` shows what
would have happened if C4 *had* accumulated into a shared cell in a parallel
loop: at 4 threads a 2000-iteration accumulation returned 723, 1151 and 1034 in
three runs (expected 2000), and a shared variable returned 1077, 1887 and 1572.
Silently, with no error. A program with such a site could not produce the
bit-identical four-thread check outputs that are committed.

---

## 5. What synchronisation is actually on the path

### 5.1 Outside `atomic`: more than you would expect

**A mutable variable is a transactional cell.** `putVariable` always allocates a
`ReferenceCell` (`interpreter/evaluator/BaseEnv.java:593-611`) — for top-level
variables (via `BuildEnvironments.java:211`) and for block-local `x: T := v`
alike (`BuildLetEnvironments.java:109-114`, `LHSEvaluator.java:215, 239`).
Immutable bindings get a plain `IndirectionCell` instead
(`BuildLetEnvironments.java:116`), which is a `volatile` field with no lock and
no transaction check (`interpreter/env/IndirectionCell.java:20-21, 41-46`). C4 is
overwhelmingly immutable bindings, which is why this is survivable.

**`ReferenceCell` reads and writes are `synchronized` and always consult the
transaction.**

- `assignValue` — `interpreter/env/ReferenceCell.java:123`: `synchronized`,
  first statement `FortressTaskRunner.getTransaction()` (`:124`), then
  `cleanup()` (`:125`, itself `synchronized`, `:87`).
- `getValue` — `:163`: `synchronized`, first statement
  `FortressTaskRunner.getTransaction()` (`:164`).

`FortressTaskRunner.getTransaction()` is
`((FortressTaskRunner) Thread.currentThread()).task().transaction()`
(`tasks/FortressTaskRunner.java:54-61`) — a thread-local cast and two field
loads. That is the interpreter's counterpart of the compiled runtime's
`inATransaction()`, and unlike the compiled one it never built a debug string
(the eager-debug bug on record was in `runtimeSystem`, and the interpreter's
equivalents are all guarded by `if (Transaction.debug)`, e.g.
`ReferenceCell.java:89, 116, 120, 126, 153, 160`, with
`Transaction.debug = false` at
`interpreter/evaluator/transactions/Transaction.java:49`).

**What a plain write costs with no transaction running**
(`ReferenceCell.java:129-140`): a monitor acquire; `cleanup()`; **allocation of a
new `ValueNode`** (`:138`), whose constructor allocates a **new `ReadSet`**
(`env/ValueNode.java:33`), whose constructor allocates a
**`CopyOnWriteArrayList`** (`transactions/ReadSet.java:23-26, 29-36`); then
`temp.abortAllReadersAndWriters()` (`:139`) which seals the old read set and
iterates it (`ValueNode.java:74-93`). **Three object allocations and a monitor
per element write**, in the no-transaction case.

**What a plain read costs with no transaction running**
(`ReferenceCell.java:163-172`): a monitor acquire, the transaction lookup, and a
`while (node.getWriter() != null)` check. Cheap in objects, but still a monitor.
Since biased locking was removed from HotSpot, that is at minimum a CAS per
element access, and under 4 threads reading the *same* weight element it is real
contention: the monitor is per element.

**Array elements are transactional cells, not plain Java arrays.**
`PrimitiveArray` (`interpreter/glue/prim/PrimitiveArray.java:34`) makes an
`AtomicArray`, which is `ReferenceCell[]` with one cell per element
(`interpreter/evaluator/transactions/AtomicArray.java:26, 31-38`); `get`, `set`
and `init` go straight to `ReferenceCell.getValue` / `assignValue` / `storeValue`
(`:48-65`). So **every `a[i]`, every `a[i] := v`, and every `init0` inside every
`fill` in C4 takes a monitor and does the transaction bookkeeping.** There is no
unsynchronised fast path.

(The other array class, `AtomicFTypeArray`, `@author Jan-Willem Maessen`, is for
types rather than values and is not on C4's path.)

### 5.2 Inside `atomic`: what it would cost

`atomic E` evaluates through `Evaluator.forAtomicExpr`
(`interpreter/evaluator/Evaluator.java:183-201`) → `FortressTaskRunner.doIt`
(`tasks/FortressTaskRunner.java:147-175`), an **unbounded retry loop** around
`doItOnce` (`:121-138`): `beginTransaction`, run the body, `commitTransaction`,
`giveUpTransaction`; on `AbortedException` or `OrphanedException`, loop and try
again.

Per transaction: a `Transaction` object with a status `AtomicReference`, a
children list and a nesting depth
(`transactions/Transaction.java:41-53`, `tasks/BaseTask.java:105-121`).

Per *access inside* the transaction, the cell-level machinery switches on:

- **Reads** register the transaction in the cell's read set
  (`ReferenceCell.java:181-184` → `ValueNode.addReader`, `ValueNode.java:66-72`)
  — a `CopyOnWriteArrayList.addIfAbsent` preceded by a `cleanup()` scan of the
  whole set (`ReadSet.java:68-84`). **`CopyOnWriteArrayList` copies the backing
  array on every add**, so registering *n* readers on one cell is O(n²) copying.
- **Writes** call `node.resolveReadWriteConflicts()` (`ReferenceCell.java:144`),
  which scans the read set and the writer and, on conflict, calls the contention
  manager (`ValueNode.java:95-116`), then chains a new `ValueNode` onto the old
  one (`:152`) so the old value can be restored on abort.
- **Validation** at commit (`BaseTask.java:91-135`).
- **The contention manager.** The default is `GreedyManager`
  (`tasks/FortressTaskRunner.java:26`), which on any conflict simply **aborts the
  other transaction** (`transactions/manager/GreedyManager.java:32-49`). Eleven
  managers ship (`transactions/manager/`: Aggressive, Backoff, Base, Eruption,
  FortressManager2..5, Greedy, Karma, Kindergarten); the DSTM2 lineage is visible
  in the `@author` tags — Maurice Herlihy on `Recoverable.java:17`,
  `BackoffManager.java:22`, `AggressiveManager.java:19`; Bill Scherer on
  `KarmaManager.java:37`, `KindergartenManager.java:22`, `EruptionManager.java:42`;
  `mph` on `AtomicArray.java:20` and `BaseManager.java:20`. The four
  `FortressManager*` are the team's own.

**So, concretely: what would a program pay that accumulated gradients under
`atomic` inside a parallel loop?** Take 4192 parameters, *R* rows contributing to
each, *T* threads. Each `atomic g[k] := g[k] + c` would:

1. begin a transaction (one object) and register the task in it;
2. read `g[k]`, which adds this transaction to that cell's read set — a
   copy-on-write array copy, under the cell's monitor;
3. write `g[k]`, which scans the read set, finds the *T−1* other live readers,
   and hands them to `GreedyManager`, which **aborts all of them**;
4. commit, or — for the *T−1* losers — throw `AbortedException`, be caught by
   `doIt`'s `while(true)` (`FortressTaskRunner.java:149-174`), and start over.

With every thread hammering the same cell, the expected outcome is one commit and
*T−1* aborts per attempt: **no parallel progress at all, plus the full transaction
overhead on every retry**, plus the O(n²) read-set copying. Pavol's worry —
*"the unfinished state of the language will use very inefficient synchronization
primitives for those transactions, and we will end up with something super slow"*
— is, on this mechanism, correct for that program shape. The library authors
reached the same conclusion in 2008 and wrote it in the source
(`FortressLibrary.fss:2618-2620`).

**The corollary that matters for C4:** C4 pays none of this, because it has no
`atomic`. What it *does* pay, unavoidably, is §5.1 — a monitor and up to three
allocations on every single element access. That is the cost worth attacking,
and it is not a parallelism problem.

*(Not measured here, per the brief's no-timing rule; §"To measure after the batch
lands" gives the commands.)*

---

## 6. The compiled path

### 6.1 Is the compiled `for` parallel? Yes.

`CompilerLibrary.fss` has both loops. The parallel one:

```
parloop(lo,hi,p,body) = do
    loopChunk = jLoopChunk()
    if loopChunk >= hi-lo then countedseqloop(lo,hi,p,body)
    else  mid = …
          do parloop(lo, mid, p, body)  also do parloop(mid+1, hi, p, body) end
    end
end
```
— `CompilerLibrary.fss:359-371`. And `countedseqloop` (`:373-382`) is its
sequential twin, as the brief expected.

`Range`'s `loop` picks the parallel one: `FilteredRange.loop(body) = parloop(...)`
and `seqloop(body) = countedseqloop(...)` (`CompilerLibrary.fss:431-432`), with
`opr #(lo,sz) = lo : (lo+sz-1)` building a `FilteredRange` (`:445-446`). So
`for i <- 0#n do … end` compiled is **parallel**, and `for i <- seq(0#n)` is not
(`SeqGenZZ32`, `:347-357`).

Unlike the interpreter, the compiled splitter is a true **midpoint halving**
(`:363-364`) and it **does** have a threshold: `jLoopChunk()` is
`nativeHelpers/runtime.java:16` → `FortressExecutable.loopChunk`, from
`FORTRESS_LOOP_CHUNK`, defaulting to **1**
(`runtimeSystem/FortressExecutable.java:28, 53-57`). So by default it still goes
down to single elements, but the knob exists.

Reductions compiled use `gen` (`CompilerLibrary.fss:385-401`), which combines
with `r.join(gen(left), gen(right))` — the same "two halves as an argument tuple"
trick as the interpreter — and `seqgen` (`:403-419`) is the sequential twin with
`left`/`right` bound as separate statements.

### 6.2 Does the compiled runtime fork tasks for it? Yes.

`CodeGen.forDo` (`compiler/codegen/CodeGen.java:1963-1974`): more than one front
→ `forDoParallel` → `genParallelExprs` (`:1589-1664`), which for each argument
after the first generates a task class, constructs it, and calls
`forkIfProfitable` (`:1644`), then walks back left-to-right calling `joinOrRun`
(`:1660`). `BaseTask.forkIfProfitable` / `joinOrRun` are
`runtimeSystem/BaseTask.java:136-144` and `:146-…`; the profitability test is
`worthSpawning()` (`:118-120`) over `getSurplusQueuedTaskCount() <= spawnThreshold`
(`:115`), `spawnThreshold` defaulting to 5
(`FortressExecutable.java:26-27, 47-51`). The pool is the compiled world's own
`FortressTaskRunnerGroup(numThreads)` (`FortressExecutable.java:29-30`), sized by
`FORTRESS_THREADS` (`:37-45`).

Operand and tuple parallelism also exists compiled, but is decided **statically**:
`forTupleExpr` (`CodeGen.java:3411-3418`) and `forOpExpr` (`:4860-4871`) route
through `evaluateSubExprsAppropriately` (`:4877-4880`), which forks only when
`ParallelismAnalyzer.worthParallelizing(x)` says the node is "worthy"
(`ParallelismAnalyzer.java:43-50, 95-106` — a two-argument compute-intensity
heuristic, `ARG_THRESHOLD = 2` at `:44`). The interpreter decides the same thing
*dynamically*, per call, from the current deque depth (§3.4). That is a real
behavioural difference between the two worlds, worth remembering when compiled
and interpreted timings are compared.

### 6.3 So what is actually missing for C4 compiled?

Not parallelism. **Data.** `CompilerLibrary.fss` has no `Array`, no
`Vector[\RR64\]`, no `Array3`; `Matrix` is an **empty stub trait**:
`trait Matrix[\T, nat s0, nat s1\] extends Object end`
(`CompilerLibrary.fss:562`). The only vector type is the native `ZZ32Vector`
(`:484-533`). This matches the record: C4's three kernels do not compile because
`Array`, `Vector`, `Array3` are undefined in that world.

**What building it would take**, concretely:

1. `Library/CompilerLibrary.fss` (+ `.fsi`) — declare the array traits and their
   generators: a rank-1/2/3 array over an `RR64` backing store, with
   `zeroIndices()` returning a `Range` so that `fill`/`assign`/`map`/`ivmap`
   inherit `parloop`; and a `Matrix` with a real `mul`. The interpreter's text
   (`FortressLibrary.fss:1802-1996` for the array traits, `:2013-2138` rank 1,
   `:2280-2400` rank 2, `:2497-2548` the product, `:2660-2790` rank 3)
   is the template; the compiler world's own `HasRank` comment
   (`CompilerLibrary.fss:548-553`) shows the house style for porting one trait.
2. `ProjectFortress/src/com/sun/fortress/runtimeSystem/` — a backing store class
   with plain `double[]` (the compiled world's `MutableFValue` /
   `FValueHandle.java` are the existing handles), plus the native-helper
   declarations. There is no need for a `ReferenceCell` equivalent: the compiled
   transaction keys its read/write `Hashtable`s on `MutableFValue`
   (`runtimeSystem/Transaction.java:27-28, 112-113, 121-122`), so only *mutable
   variables* are transactional, not every array element. **That alone should be
   the single largest win of moving C4 to the compiled path** — it removes
   §5.1's per-element monitor and allocation entirely.
3. Nothing needs to be built for the loop itself.

---

## 7. The four-thread evidence

### 7.1 What is committed

Two sets of check outputs, both from `MicroGptFlatCheck` (40 checks):

| file | threads | total |
|---|---|---|
| `explorations/run-c4/checks/threads1.txt` | 1 | 873 s |
| `explorations/run-c4/checks/threads4.txt` | 4 | 396 s |
| `explorations/run-c4/checks/rerun-post-restart/threads1.txt` | 1 | 528 s |
| `explorations/run-c4/checks/rerun-post-restart/threads1_second.txt` | 1 | 444 s |
| `explorations/run-c4/checks/rerun-post-restart/threads4.txt` | 4 | 263 s |

and, for the focused APL base, `explorations/apl/mg/checks/`: `threads1.txt`
439 s, `threads4.txt` 254 s, `threads1_flatarrays2.txt` 420 s,
`threads4_flatarrays2.txt` 263 s.

The 528 s / 444 s / 263 s figures on record are the `rerun-post-restart` set.

### 7.2 What was compared, and how strong it is

Diffing `threads1.txt` against `threads4.txt` in each pair, the **only**
differences are the thread number in the banner, the per-step `( … ms)`
timings, and the `total … s` line. Masking those three, the files are
**byte-identical** — all 40 `diff …` values, all 40 PASS/FAIL verdicts, both
`VERDICT: 40 PASS, 0 FAIL of 40 -- ALL PASS`. Verified for all three pairs
(`run-c4/checks`, `run-c4/checks/rerun-post-restart`, and both `apl/mg` pairs).

What that covers: the loader against `P0`, the corpus against goldens, the
step-0 gradient over all 4192 entries to 1.1e-16, the parameters after one Adam
step, the zero-gradient count, five losses, the batch-4 loss and its four
single-document losses, the token-weighted-mean identity, and twenty-two finite
differences at the eleven golden indices in two batch configurations. That is a
broad, numerically sensitive cross-section of the whole program, and it is
bit-identical at 1 and 4 threads.

**How strong is that as evidence of no race?** Strong, given probe `RaceProbe`:
a shared accumulation in a parallel `for` loses roughly half its updates at four
threads and produces a *different* wrong answer every run (723, 1151, 1034 in
three consecutive runs). A racing C4 would produce run-to-run variation in the
loss and in thousands of gradient entries. It does not. What the outputs do
**not** prove is the absence of a race in a code path the checks never take; the
line-by-line audit of §4 is what covers that.

### 7.3 Where the speed-up comes from, and why it is not 4×

Steady-state per-step figures (`rerun-post-restart`):

| | 1 thread | 4 threads | ratio |
|---|---|---|---|
| step 1 | 8 247 ms | 17 413 ms | **0.47×** (slower) |
| steps 2-5 (mean) | 4 840 ms | 1 879 ms | **2.58×** |
| batch-4 step | 16 551 ms | 6 189 ms | **2.67×** |
| whole run | 528 s | 263 s | 2.01× |

The `run-c4/checks` pair agrees: step 1 14 042 → 30 273 ms (0.46×), steps 2-5
8 010 → 2 860 ms mean (2.80×), batch-4 28 245 → 10 674 ms (2.65×), total
873 → 396 s (2.20×).

So the *steady-state* speed-up is ~2.6-2.8× on four workers, and the headline
2.0-2.2× is dragged down by a first step that is **twice as slow** at four
threads.

Mechanism, from §3 and §5:

1. **The source of the speed-up.** `step` is almost entirely library
   `fill`/`map`/`assign`/`mul` over arrays of 256 to 4192 elements (§2.3), each a
   parallel loop or a parallel recursive product. Those are wide and independent,
   so four workers have real work.
2. **Task overhead does not shrink with threads.** A 1-D parallel `for` over *n*
   elements allocates 2(*n*−1) `TupleTask`s regardless of the pool size
   (`Evaluator.java:267-274`, no `worthSpawning` guard). At one thread the
   overhead is already paid; adding threads does not remove it, so it is pure
   Amdahl weight.
3. **Per-element monitors.** Every array read and write takes that element's
   `ReferenceCell` monitor (§5.1). Reads of a *shared* weight element — 16 tasks
   reading the same `wq[i,j]` during a 16×16 product — serialise on one monitor.
   That is a genuine scalability ceiling that no amount of parallel structure
   removes.
4. **Allocation pressure.** Three objects per element write (§5.1) on top of
   ~4 objects per task. Four workers allocate four times as fast into the same
   heap, so GC and memory bandwidth become shared resources. This is the most
   likely explanation for step 1 being *slower* at four threads: the first step
   is also the JIT-warm-up step and the one that populates the caches.
5. **The throttle.** Rank-2 and rank-3 loops parallelise through the tuple path,
   which stops forking as soon as the worker's deque has more than three surplus
   tasks (`TupleTask.java:119-121`). Under four workers that cap is reached
   sooner, so the available parallelism is deliberately clipped.
6. **Amdahl on the sequential parts.** The loaders (`FlatData.fss:77, 85, 96-97,
   122`) and the five-step driver (`MicroGptFlat.fss:91`) are strictly
   sequential; in the check run the loader plus the corpus build is a fixed cost
   that four threads do not touch.
7. **Only four cores, and the JVM wants some.** `FORTRESS_THREADS=4` on a
   four-core container leaves nothing for GC threads or the JIT compiler threads.

None of these is a race, and none of them is transaction contention — there are
no transactions. **The gap between 2.6× and 4× is overhead and memory, not
synchronisation of the program's own data.**

---

## Probes

All probes were run read-only, outside the repository, with
`FORTRESS_CACHES` pointed at the scratchpad (honoured — the interpreter created
`<scratchpad>/caches/{analyzed,bytecode,environment,interpreter,…}_cache` and
`/home/user/fortress/default_repository/caches` was untouched; the property is
`fortress.caches`, `repository/ProjectProperties.java:283`, and the
property→environment naming convention is documented at `:194-199`).
Command prefix for all of them:

```bash
source /home/user/fortress/experiment/env.sh
export FORTRESS_CACHES=<scratchpad>/c4-parallelism/caches
cd <scratchpad>/c4-parallelism/probes
```

### Probe 1 — `RaceProbe.fss` → `RaceProbe.txt`

*What it tests.* Whether an unprotected read-modify-write of a shared location
inside a parallel `for` loses updates at four threads, and whether `atomic`,
`seq` and a reduction each fix it. Seven cases: disjoint parallel array writes
(C4's shape), a shared array element with and without `atomic`, the same element
in a `seq` loop, a shared mutable *variable* with and without `atomic`, and a
`SUM` reduction. 2000 iterations each.

```bash
FORTRESS_THREADS=1 /home/user/fortress/bin/fortress RaceProbe.fss
FORTRESS_THREADS=4 /home/user/fortress/bin/fortress RaceProbe.fss   # ×3
```

*Result.* At 1 thread everything is correct. At 4 threads, three runs:

| case | T1 | T4 run1 | T4 run2 | T4 run3 | expected |
|---|---|---|---|---|---|
| 1 disjoint parallel array writes | 1999000 | 1999000 | 1999000 | 1999000 | 1999000 |
| 2 shared element, parallel, no atomic | 2000 | **723** | **1151** | **1034** | 2000 |
| 3 shared element, parallel, atomic | 2000 | 2000 | 2000 | 2000 | 2000 |
| 4 shared element, seq for | 2000 | 2000 | 2000 | 2000 | 2000 |
| 5 shared variable, parallel, no atomic | 2000 | **1077** | **1887** | **1572** | 2000 |
| 6 shared variable, parallel, atomic | 2000 | 2000 | 2000 | 2000 | 2000 |
| 7 reduction SUM | 2000 | 2000 | 2000 | 2000 | 2000 |

*Reading.* The memory model's rule (`memory-model.tex:69-75`) is enforced by
nothing: an unprotected shared update fails **silently and non-deterministically**,
and only at more than one thread. C4 has no such site (§4) — and this probe is
what makes the bit-identical four-thread check outputs (§7) meaningful evidence
rather than a coincidence.

### Probe 2 — `TreeProbe.fss` → `TreeProbe.txt`

*What it tests.* Whether the shape of a parallel reduction tree depends on the
thread count or only on the index range. Floating-point addition is not
associative, so a changed grouping shows in the last bits. `v[i] = 1/(i+1)`,
n = 4096; parallel `SUM`, sequential `SUM`, `DOT`, `BIG MAX`, and a 64×64
two-generator parallel `for` followed by a two-generator reduction.

```bash
FORTRESS_THREADS=1 /home/user/fortress/bin/fortress TreeProbe.fss
FORTRESS_THREADS=4 /home/user/fortress/bin/fortress TreeProbe.fss   # ×2
```

*Result* (identical across 1 thread and both 4-thread runs):

```
par SUM  8.895103896966324
seq SUM  8.89510389696629
par DOT  1.6446899560231236
par MAX  1.0
par grid 8.895103896966324
```

*Reading.* Two things at once. (i) The parallel value is **bit-identical at 1
and 4 threads** — the tree comes from `partitionL((lo BITXOR hi)+1)`
(`RangeInternals.fss:1027-1028`), a function of the bounds, not of the
scheduler. This is the structural reason the committed four-thread checks match.
(ii) The parallel value **differs from the sequential value** in the last two
digits — the library assumes `join` is associative
(`FortressLibrary.fss:972-979, 2847-2850`) and `+` on `RR64` is not. Nothing
checks it; the difference is deterministic, not random. Anyone comparing a
`seq`-ified C4 against a parallel one must expect last-bit differences.

### Probe 3 — `FlatShapeProbe.fss` → `FlatShapeProbe.txt`

*What it tests.* The exact shape of `FlatArrays.flat`
(`FlatArrays.fss:179-188`): an outer `seq` loop carrying a mutable offset, an
inner **parallel** loop that only *reads* that offset and writes disjoint cells,
and `off += width` after the inner loop. This is the one place in C4 where a
mutable variable is read from inside a parallel loop, so it is the one place
where the join-before-next-statement guarantee is load-bearing. 8 blocks ×
256 elements.

```bash
FORTRESS_THREADS=1 /home/user/fortress/bin/fortress FlatShapeProbe.fss
FORTRESS_THREADS=4 /home/user/fortress/bin/fortress FlatShapeProbe.fss   # ×3
```

*Result.* Every run, at 1 and at 4 threads:
`final off 2048 (expected 2048) | cells wrong: 0 of 2048`.

*Reading.* The parallel `for` joins before the next statement runs
(`Evaluator.java:274-279`), and reading a `ReferenceCell` from many parallel
iterations while nobody writes it is safe. `flat`'s design is sound.

---

## To measure after the batch lands

No timings were taken (the four cores are busy). These are the measurements the
audit points at, in priority order.

```bash
source /home/user/fortress/experiment/env.sh
export FORTRESS_CACHES=/tmp/c4-timing/caches      # keep the tree clean
cd /home/user/fortress/explorations/run-c4/src
```

**1. Confirm the per-thread scaling curve on a quiet machine** (the 2.0× on
record mixes a first step that is 2× *slower* at four threads with steady-state
steps that are 2.6-2.8× faster):

```bash
for t in 1 2 3 4; do
  /usr/bin/time -f "threads=$t wall=%e maxrssKB=%M" \
    env FORTRESS_THREADS=$t ../../../bin/fortress MicroGptFlatCheck.fss \
    > /tmp/c4-timing/check_t$t.txt 2>/tmp/c4-timing/check_t$t.time
done
grep -H "^total" /tmp/c4-timing/check_t*.txt
cat /tmp/c4-timing/check_t*.time
```

**2. Separate warm-up from steady state.** The per-step `( … ms)` figures are
already in the output; extract them rather than the total:

```bash
grep -H "batch 1 step" /tmp/c4-timing/check_t*.txt
```

**3. Is the cost the ReferenceCell monitor or the allocation?** Run the same
workload with allocation and lock profiling on:

```bash
env FORTRESS_THREADS=4 JAVA_FLAGS="-Xmx4g -Xss64m \
  -XX:StartFlightRecording=settings=profile,filename=/tmp/c4-timing/t4.jfr,duration=300s" \
  ../../../bin/fortress MicroGptFlatCheck.fss > /tmp/c4-timing/check_jfr.txt
jfr summary /tmp/c4-timing/t4.jfr
jfr print --events jdk.ObjectAllocationSample /tmp/c4-timing/t4.jfr | \
  grep -c "ValueNode\|ReadSet\|CopyOnWriteArrayList"
jfr print --events jdk.JavaMonitorEnter,jdk.JavaMonitorWait /tmp/c4-timing/t4.jfr | head -80
```
Expect `ValueNode`/`ReadSet`/`CopyOnWriteArrayList` high in the allocation
profile and `ReferenceCell` at the top of the monitor profile (§5.1). If so, the
next optimisation is not about parallelism at all.

**4. Does the unthrottled task explosion matter?** Compare the current build
against one where `Evaluator.forDo` is guarded by `TupleTask.worthSpawning()`,
the way `evalExprListParallel` already is (`Evaluator.java:341`). One variable,
one rebuild, the full gate before and after:

```bash
# after the edit, in a worktree:
ant compileAll && ant testSystem && ant testFast
for t in 1 4; do env FORTRESS_THREADS=$t ../../../bin/fortress MicroGptFlatCheck.fss; done
```

**5. Does the tuple parallelism at `MicroGptFlat.fss:58` and `:68` pay?**
Serialise those two tuples by hand (three separate bindings each) in a scratch
copy of the model and compare at 4 threads. This measures how much of the
speed-up is tuple parallelism versus loop parallelism.

**6. `FORTRESS_LOOP_CHUNK` on the compiled path**, once C4 compiles: the knob is
already there (`FortressExecutable.java:53-57`) and defaults to 1, i.e. no
chunking. Sweep 1, 8, 64, 512 on a compiled kernel.

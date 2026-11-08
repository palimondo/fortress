<!-- A read-only review, 2026-11-08, of how Fortress runs code in parallel and keeps shared state safe, for Pavol's question of 2026-11-08: the fork/join pool, the two STMs and the code that joins them, on walk and on the compiled path. It has their provenance, 31 targeted programs at four threads on both paths, a cost measurement, the specification's answers, the JVM-side reading in the terms of Goetz and the Java Memory Model, microGPT's exposure, eight new defects and a rewrite of row 933 drafted in the ledger's form, and the curator's answer. Tree main at f5aa647de (the batch-28 landing); base 157323e51; nothing in the tree was changed. -->

# The foundations of Fortress's parallelism: fork/join, the two STMs, and what microGPT stands on

## 0. What was run, and on what

- **Trees.** Walk programs ran on the base build `/home/user/fortress-base28` (157323e51) through `explorations/coordinator/tools/old-fortress.sh`, using private caches in my scratchpad. Compiled programs ran in a worktree seeded at main `f5aa647de`, with `seed-worktree.sh` then `ant compileAll` and the library order (`EXIT=0`, five jars). Every new compiled finding was also run on the base, through `old-fortress.sh … compile/run`. The worktree has been removed (`git worktree list` shows only `fortress`, `fortress-base28` and `fortress-transcripts-blinded`). `df -P /home/user` read 22 GB free at the start and at the end.
- **Where the base matters.** The base 157323e51 lacks rung A's slot API (`TXReadSlot`, `TXWriteSlot`, `FortressArrayStore`). This matters only for the store's init race (§7, row N7), which ran on f5aa647de alone. Walk's STM is byte-identical between the two (§2). On the base, walk's arrays reach `AtomicArray` through the old `PrimitiveArray` glue; on main they reach it through `ArrayOps`. They are the same cells (`compile-ladder/rung-array-store/REPORT.md:18`).
- **Programs.** All probe programs and scripts are under `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/parallelism/`, in `walk/`, `compiled/` and `java/probe/`, with the runners `runwalk.sh`, `runcomp.sh`, `runbase.sh` and `runcost.sh`. Every program ran three times at `FORTRESS_THREADS=4` unless stated otherwise. Every wait was under 240 s.
- **Machine, for the one timing (§3.3).** nproc 4; Intel Xeon @ 2.10 GHz, 2100 MHz; load 1.13 at the start and 1.51 at the end; OpenJDK 25.0.4.1+1-1-24.04.4; compiled path only (P-29); nothing else of mine was running.

## 1. The blocks, on each path

### 1.1 Walk: tasks and the pool (`interpreter/evaluator/tasks/`)

- **The pool.** `FortressTaskRunnerGroup` is a `java.util.concurrent.ForkJoinPool` (`FortressTaskRunnerGroup.java:16-33`, asyncMode false, so LIFO local queues). `FortressTaskRunner` is its worker thread. It holds a `volatile BaseTask task`, the "current task" through which every transaction is found (`FortressTaskRunner.java:27`, `:54-61`).
- **Tasks.** `BaseTask extends RecursiveAction` (`BaseTask.java:21`). A child copies its parent's transaction when it is constructed (`:35`). So **the implicit threads of an `atomic` block share the block's transaction object**.
- **`TupleTask`.** It is the unit for tuples, call arguments and `do … also` arms. `compute()` makes itself the current task, catches every `Exception` into `err` and nulls its transaction (`TupleTask.java:33-52`). `Evaluator.forDo` and `evalExprListParallel` save the current task, call `ForkJoinTask.invokeAll`, restore the current task, and only then rethrow the first recorded exception (`Evaluator.java:239-283`, `:336-362`). So **a group always waits for every arm, also when one arm throws or aborts**. That is the specification's fork-join rule (§4).
- **Throttle.** Arguments and tuples fork only while `getSurplusQueuedTaskCount() <= 3` (`TupleTask.java:119-121`, `Evaluator.java:342`). `forDo` has no such check.
- **`spawn`.** Each `spawn` makes a new one-thread pool (`interpreter/glue/prim/Thread.java:55-56`). `val()` and `wait()` busy-spin on a volatile flag (`SpawnTask.java:56-68`). A spawned task has no parent transaction (`SpawnTask` calls `super()`), so a `spawn` inside `atomic` runs outside the transaction. The specification forbids `spawn` inside `atomic` (`spawn.tex:28-31`), and nothing checks it. Row 938 is the spinning on an abrupt end.

### 1.2 Walk: the STM (`interpreter/evaluator/transactions/`, `interpreter/env/ReferenceCell.java`, `ValueNode.java`)

**Shape.** It descends from DSTM. Every mutable variable, mutable field and array element is a `ReferenceCell`. `AtomicArray` is one cell per element (`AtomicArray.java:26-37`). A cell holds a chain of `ValueNode`s, each with a value, a writer transaction, a set of readers and the older node (`ValueNode.java:23-34`). A transaction is a status in an `AtomicReference`: ACTIVE, COMMITTED, ABORTED or ORPHANED (`Transaction.java:36-46`).

- **Commit** is one compare-and-set from ACTIVE to COMMITTED (`Transaction.java:229-260`). A cell's `cleanup()` then reads a committed writer's node as the value, or as the value of the parent transaction for a nested commit. It pops an aborted writer's node (`ReferenceCell.java:87-121`). This is DSTM's "locator" scheme: the value is decided by the owner's status.
- **Readers are visible, and conflicts are detected eagerly.**
  - A transactional read registers the transaction in the node's read set, a `CopyOnWriteArrayList` (`ValueNode.java:66-72`, `ReadSet.java:68-84`).
  - A transactional write first resolves conflicts with every active reader that is not an ancestor, and with the writer (`ValueNode.java:95-116`). It then pushes a new node (`ReferenceCell.java:151-153`).
  - So validation at commit is only a status check (`BaseTask.java:91-100`).
- **Strong atomicity.** Plain access outside `atomic` is isolated from transactions. A non-transactional read aborts any active writer of the cell (`ReferenceCell.java:166-171`). A non-transactional write aborts every reader and writer (`:134-140`). The team added this in "Fixes for atomic/non-atomic interactions" (1d6d275bb, chf, 2008-02-13).
- **Nesting.** Nesting is closed. A nested `atomic` creates `new Transaction(parent)` (`tasks/BaseTask.java:105-121`), and an abort orphans its children (`Transaction.java:267-307`).
- **Contention manager and retries.** `GreedyManager` is wired in (`FortressTaskRunner.java:26`). Despite its name, it **always aborts the other transaction** (`GreedyManager.java:32-49`). Retries are unbounded and have no backoff (`FortressTaskRunner.java:147-175`).
- **`tryatomic`** runs the body once (`Evaluator.java:205-232`). Inside a transaction it is flattened into plain code (`:211-214`), which is defect N6 (§7).
- **Cost outside `atomic`.** Every cell access takes the cell's monitor and consults the transaction, and a write allocates a node, a `ReadSet` and a `CopyOnWriteArrayList` (`c4-parallelism.md` §6). The measured share was 0.8 % of allocation samples in a four-thread C4 run, not the bottleneck (`c4-parallelism.md`, "Measured, 2026-09-19").

### 1.3 Compiled: tasks and the pool (`runtimeSystem/BaseTask.java`, `FortressTaskRunner*`, `FortressExecutable.java`)

- **Pool and tasks.** The pool is again a `ForkJoinPool` (`FortressTaskRunnerGroup.java:33`), sized by `FORTRESS_THREADS`, or half the CPUs when unset (`FortressExecutable.java:37-45`). A generated task class per arm extends `BaseTask`, whose constructor copies the parent's transaction (`BaseTask.java:83-86`).
- **Forking.** `forkIfProfitable` forks while the surplus queue is at most `spawnThreshold`, 5 by default (`:113-144`). `joinOrRun` runs an unforked task inline, and joins a forked one with the current task saved and restored (`:146-178`).
- **Arms.** `genParallelExprs` forks arms n-1 down to 1, runs arm 0 in place, then joins left to right (`CodeGen.java:1635-1712`). It does so only on the normal path: there is no handler that joins the remaining arms when one throws. That is defect N1.
- **Tuples and operators** fork only where `ParallelismAnalyzer` marked the node "worthy" (`CodeGen.java:5233-5236`).
- **Call arguments are evaluated in order** (`CodeGen.evalArg`, `:6935-6955`, under the team's comment "Why isn't this parallel???" at `:6939`). That is defect N5.

### 1.4 Compiled: the STM (`runtimeSystem/Transaction.java`)

**Shape.** This is a different algorithm: one global sequence lock, buffered writes and value-based validation. In form it is NOrec (Dalessandro, Spear and Scott, PPoPP 2010), though the code cites no paper.

- **The lock.** `global_lock` is an `AtomicInteger`; an odd value means a commit is writing back (`Transaction.java:76`, `:120-158`). Each transaction keeps a `snapshot` of it.
- **Reads.** A read takes the committed value. While the snapshot differs from the lock, it revalidates every recorded read by value and reads again. It then returns an own or ancestral write if there is one, and records the read (`:212-231`).
- **Writes** go to a private `Hashtable` (`:287-297`).
- **Commit.**
  - A read-only transaction returns at once (`:301`).
  - Otherwise the commit takes the lock by compare-and-set from its snapshot, revalidating whenever that fails (`:306-310`).
  - A top-level commit writes back, and a nested commit merges its reads and writes into its parent (`:312-344`, with the team's "This is subtle" comment at `:328`).
  - It releases the lock to the next even value (`:346`).
- **Conflict policy.** The committer wins; there is no contention manager. The generated handler retries without bound and calls `delayTransaction` (`CodeGen.java:1774-1802`). That backs off only when `FORTRESS_EXP_BACKOFF` is set; its default is off, "no evidence that it helps" (`FortressExecutable.java:33`, `BaseTask.java:214-230`).
- **Non-transactional access** is a plain volatile read or write of the cell (`MutableFValue.java:18-29`). Generated code chooses between the two at every access by calling `BaseTask.inATransaction()` (`VarCodeGen.java:326-362`, `:483-546`; row 641). So **atomicity is weak**: plain accesses neither take nor check the lock (defect N2).
- `TransactionRecord.java` is an unused placeholder: `TXAbort` throws "Placeholder for now" (`:34-36`).

### 1.5 Compiled: arrays inside transactions (`compiler/runtimeValues/FortressArrayStore.java`, batch 28)

- **The `Object[]` store.** Inside a transaction, `get` and `put` go to `TXReadSlot` and `TXWriteSlot`, keyed by the array and the index (`FortressArrayStore.java:45-57`, `Transaction.java:31-62`). Outside one, they are `VarHandle` volatile accesses. `init` is a compare-and-set from null outside a transaction, and a transactional read-then-write inside one (`:60-66`).
- **The `double[]` store** (`FortressRR64ArrayStore.java`) "takes no part in a transaction" (its header comment).
- **The prelude's `ZZ32Vector`** is a plain `int[]` with no transaction check (`FZZ32Vector.java:18`, `simpleIntVector.java:26-29`). That is defect N8.

### 1.6 The code generator's `atomic`

`forAtomicBlock` registers its exception-table entry before it emits the body (`CodeGen.java:1783`), so an outer block's handler precedes an inner one's (rows 934, 937; row 888 is the same for `try`). Its other gaps:

- It catches only `TransactionAbortException` (`:1780`), so a Fortress exception leaves the transaction pushed (row 324).
- It has no case for `AtomicExpr` or `TryAtomicExpr` (rows 875, 353).
- Mutable fields bypass the transaction (`VarCodeGen.java:209`, `:220`; row 319).

### 1.7 `ParallelismAnalyzer`

It is a syntactic heuristic: a node is worthy when at least `ARG_THRESHOLD = 2` of its operands are "compute intensive" (`ParallelismAnalyzer.java:44`, `:113-118`). Its defects:

- Every named function is added as compute intensive (`:218`), but the removal targets the `FnDecl` node, not the name (`:225`). So every named call counts.
- Calls whose text contains `CompilerLibrary`, `CompilerBuiltin` or `println` are skipped (`:199-203`, with the team's comment "Is this right? The builtins could be intensive too, no?" at `:194`).
- "TODO: I don't think this handles mutual recursion" (`:40`).

### 1.8 Library: ranges, generators, reductions, `parloop`

- **The one library's parallel range.** `loop` splits at a power-of-two boundary into `do … also do … end`, down to single elements, with no grain size. `generate` joins the halves as a call's arguments, `red.join(loop'(lo,mid-1), loop'(mid,hi))` (`Library/RangeInternals.fss:1308-1342`, `:1320`). The split depends only on `(lo, hi)`, so the join tree is deterministic (`c4-parallelism.md` §4).
- **`GeneratorLibrary.fss`** only composes generators; it has no `also` of its own.
- **Reductions** carry their algebra as objects: `join` and `empty`, with associativity assumed and checked nowhere (`FortressLibrary.fss:3412`; `c4-parallelism.md` §4).
- **`Matrix.mul`** splits rows and columns with `also` and runs the contraction axis in sequence, with the team's comment "If this were atomic, we could parallelize j-partition" (`FortressLibrary.fss:3046`). A second comment says the cache-oblivious product was dropped "due to lack of support for atomic increment of matrix elements" (`:3175-3177`). That text dates to 2008 at least (moved by jmaessen's library reorganization 1d2680d4d, 2008-03-24).
- **The compiler prelude.** `parloop` halves at the midpoint while the chunk is above `FORTRESS_LOOP_CHUNK`, default 1 (`Library/CompilerLibrary.fss:357-369`). `gen` passes its halves as call arguments, and `seqgen` binds them as statements (`:381-414`). On the compiled path the two run alike (N5).

**Contention and abort policy, side by side**

| | walk | compiled |
|---|---|---|
| detection | eager: at the conflicting read or write, through visible readers | lazy: at validation, by value, when the global lock has moved |
| who wins | `GreedyManager`: always aborts the other | the first to commit |
| retry | `doIt`, unbounded, no backoff | generated handler, unbounded; backoff off by default |
| plain access beside `atomic` | aborts the conflicting transaction (strong) | not isolated (weak, N2) |
| nesting | closed; abort orphans the children | closed; a nested commit merges into the parent under the global lock |
| threads inside a block | share the block's transaction | share the block's transaction (unsafely, N3) |

## 2. Provenance

**Walk's STM began as Sun Labs' DSTM2 and became the team's own.**
- Christine Flood (`chf`) imported DSTM2 into the tree on 2007-06-13: "More Transactional Memory support. DSTM2 is now included in our source tree" (9aed945d8, 56 `dstm2/` paths). `ProjectFortress/src/dstm2/Transaction.java` there carries "Copyright 2006 Sun Microsystems" (`git show 9aed945d8:ProjectFortress/src/dstm2/Transaction.java`).
- Her later commits:
  - "Removed use of DSTM2 Adapters" (cdaf5a5f4, 2007-07-24);
  - "Concurrent Read sets, parallelism inside transactions, transaction tests, a new contention manager, new atomic arrays with single element transaction granularity" (c0331e339, 2007-09-06);
  - "Nested Transactions" (24f2532a7, 2007-10-24);
  - "nested parallel transactions" (37a30e8a1, 2008-07-22), which introduced `ValueNode`;
  - "Don't let orphaned transactions return values, … dial back parallelism" (432d03fe3, 2008-09-05).
- `dstm2/` is absent at a874948ac (`git ls-tree`).
- The contention managers keep DSTM2's `@author` tags: Maurice Herlihy (`AggressiveManager.java:19`, `BackoffManager.java:22`, `Recoverable.java:17`), Bill Scherer (`KarmaManager.java:37`, `KindergartenManager.java:22`, `EruptionManager.java:42`), and `mph` (`AtomicArray.java:20`, `BaseManager.java:20`). These are Scherer and Scott's managers of PODC 2005.
- `FortressManager2` to `5` are the team's own, unguarded debug experiments with priority by transaction number (e.g. `FortressManager5.java`, "We prefer the lowest numbered transaction unless we've retried too often, then we get mad (greedy)").

**The team knowingly gave up Greedy's waiting because of work stealing.**
- DSTM2's original `GreedyManager` is Guerraoui, Herlihy and Pochon's Greedy (PODC 2005), cited in its header: "If prior transaction is waiting or lower priority, then abort it. otherwise, wait for it to commit, abort, or wait" (`git show 9aed945d8:ProjectFortress/src/dstm2/manager/GreedyManager.java`).
- The Fortress `GreedyManager` is "Based on Backoff Manager" (`GreedyManager.java:12`) and never waits. It says why: "There is an interesting interaction between work stealing and transactions. Until we can figure out a way to boost the priority of the transaction keeping everyone else waiting at a join point, this will have to do." (`:22-24`, added in 432d03fe3, chf, 2008-09-05).

**The compiled STM is Flood's of 2012, young when the project stopped.**
- Its real commits, phantom roots filtered out:
  - "Top Level Transactions" (9f63f9859, chmf, 2012-04-09), with the remnant `//throw … "Only single level transactions for now"` at `Transaction.java:189`;
  - "All Fortress code now runs inside of a base task. Some nested transactions now work." (11beddd1d, 2012-05-21);
  - "fix for nested transactions" (d3f49be2f, 2012-05-29);
  - "Fix for deeply nested transactions" (8415fc990, 2012-05-30).
- Claire Alvis added backoff "disabled by default for now" (bc72d5c23, 2012-06-04).
- The team's last commit is 2012-08-31 (`records.md`). The cut parent links can hide earlier commits (`research/authorship.md`, caveats); `TransactionRecord.java` appears in "mutable fields" (b6d8718a2, chmf, 2012-01-31).
- Flood's own bio lists "software transactional memory, and compilation to a fork/join framework" (`research/authorship.md:46`).
- The team never measured this path. In its text, every `inATransaction()` built a debug string, which cost about 34 % of a scalar loop (row 302, fixed by the revival).

**Tasks.**
- Flood wrote the walk tasks from 2007-01-16, then moved to "Doug Lea's latest and greatest jsr166y" (938f5d226, 2007-08-14) and a "New jsr166y" (b1344d278, 2009-02-05).
- Maessen added `TupleTask.forkJoin` "at Doug Lea's suggestion (this saves a virtual call)" (3a879563b, 2008-08-12). It is now commented out, "not supported in new jsr166y library" (`TupleTask.java:86`).
- The team's jar is `ProjectFortress/third_party/jsr166y/jsr166y.jar` at a874948ac, built 2010-01-04. It has separate `join()` and `helpJoin()` (`javap`), which supports the revival comment's claim that jsr166y's plain `join` did not run other tasks.

**What the team said of its state, beyond the comments above.**
- "Why is this? It seems inconsistent with the rest of our transaction story. chf" on flattening `tryatomic` (`Evaluator.java:210`).
- "There is a race here…" on the read-set copy (`ReadSet.java:32`). That copy is dead: `myAdd` iterates its own empty list (`:38-42`). A Java check printed `readers 2, readers in the copy 0` (`java/probe/ReadSetCopy.java`). The bug dates from 37a30e8a1, and its effect is masked by eager conflict detection (§7.3).
- The specification itself: "This section makes potentially very controversial choices … hugely expensive mechanisms" (`memory-model.tex:240-246`).
- **`TransactionJUTest`'s multi-threaded half** (`tests/unit_tests/TestTask.java:43-44`, F-185) was commented out when `forkJoin` left jsr166y, not because it failed. Restored with `invokeAll` on a four-thread pool, it printed `readers 2048 of 2048` five times out of five (`java/probe/ReadSetThreads.java`).

**The coordinator's reading is correct.**
- `git diff a874948ac 157323e51 -- runtimeSystem/Transaction.java` shows only the `FValue`-to-`Any` rename (F-117) and `if (debug)` guards. The own-write record `reads.put(v,AncestrialValue)` is the team's text.
- `forAtomicBlock` at a874948ac (`CodeGen.java:1728-1756` there) has `visitTryCatchBlock` before the body, as today's `:1783` does.
- Batch 28 added the slot path. That includes `if (val == null) return null;` at `Transaction.java:227`, the revival's own line, which N7 rests on.

## 3. Maturity, measured

### 3.1 What the suites and the gate exercise, and what they leave

The gate's 14 atomic programs passed 42 of 42 runs at four threads (`compile-ladder/climb-batch-28/gate/summary.txt`). Their content:

- scalar mutable variables, top-level and local (`atomic0`, `atomic3`-`6`, `AtomicTopLevelVar`, `MutableTopLevelVarInLoop`);
- an object-typed variable (`AtomicTopLevelObjectVar`);
- a mutable field outside `atomic` (`atomic1`) and an unguarded race that prints multiples (`atomic2`);
- 800 class first-loads (`FirstLoadThreadsRungG`);
- nested atomics, but only across closures, never in one body (`nestedTransactions0`-`2`).

None of the 14 has an abort, an exception out of a block, two blocks nested in one body, tasks reading inside a block while others commit, plain writes beside a block, or array elements. Walk's suite adds `transactionalFork`, `TransactionalArrayShakedown` (a reduction beside a transaction), `abortTest`, `abortBlock`, `tryatomicTest` and `nestedTransactions3`-`4`. `nestedTransactions3` asserts that tryatomic is flattened.

### 3.2 Targeted programs, four threads, three runs each

| program (scratchpad name) | walk (157323e5) | compiled (f5aa647de; base 157323e5 where marked) |
|---|---|---|
| contended counters: top-level, local, array element (`WCounters`/`CCounters`) | exact: 2,000 each, ZZ32 and RR64 elements too | variables exact (20,000); `ZZ32Vector` element 19,448–19,895 (base 19,265–19,871): **N8** |
| unguarded control | 1,935 to 2,000 | 17,130 to 19,749 (row 59) |
| nested in one body (`*NestedSameBody`) | 400 | d 310, 337, 334 (row 934) |
| own write, nested commit (`*OwnWriteNested`) | `y + w = 4` | exit 124 (row 933) |
| own write under unrelated commits (`CContendedOwn`/`Ctl`) | — | 1,635 / 30,174 / 30,350 retries against 0 for the control (row 933, rewritten) |
| abort inside a fork (`*AbortInFork`) | c = 100, PASS | c = 100, PASS |
| first arm throws (`*ArmThrows`) | flag 1, then 1 | "flag 0, a second later: flag 1" (also base): **N1** |
| reduction beside a transaction (`*ReductionBeside`) | PASS; the sum saw the pre-state each time | PASS: 0 odd terms, x = 4000 |
| plain writes beside a block (`*StrongAtomicity`) | 0 of 300 blocks saw x change | 2,405–2,994 of 3,000 (base 2,085–2,983): **N2** |
| threads of one block, others committing (`CSharedTxn2`) | — | `ConcurrentModificationException`, 3 of 3 (also base): **N3** |
| nested block's view (`*OpacityNested`) | 0 inconsistent | 17, 18, 89 lines `INCONSISTENT` (base 45, 47, 111): **N4** |
| SUM bodies at once (`CReductionPar`) | — | "SUM of 64 bodies: at most 1 at once; parallel for: at most 4 at once" (also base): **N5** |
| tryatomic nested (`WTryAtomicNested`) | c = 374, 350, 359 of 400, 0 failures; nested `atomic` 400: **N6** | not compiled (row 353) |
| store `init` race (`java/probe/InitRace`) | 0 of 200 rounds wrong (`WInitRace`) | both answered true in 935, 988, 964 of 1,000: **N7** |
| exception out of a block (`*324`) | g = 100 | g = 7 (row 324) |
| atomic block ending an arm (`C322`) | — | in arm 0: PASS; in arm 1: `VerifyError` (row 322, narrowed) |
| `XXXNestedAtomicAbortCompiled` | — | FAIL, 3 of 3 (row 937) |

Walk passed every probe except tryatomic. The compiled path failed seven of the thirteen shapes it can express.

### 3.3 Cost of the compiled STM (`runcost.sh`, machine in §0)

```
CCostSeq t=1: round 3 : plain 15 ns/op, atomic 208 ns/op, c = 4000000
CCostPar1 t=1: round 3 : 225 ns/op            CCostPar1 t=4: round 3 : 351 ns/op
CCostPar1 t=4: Had to retry a transaction 475225 times
CCostPar4 t=4: round 3 : 526 ns/op, 330760 retries   (four variables, no better)
CCostFree t=1: round 3 : 176 ms               CCostFree t=4: round 3 : 66 ms
```

- An uncontended block costs about 210 ns, against 15 ns for the plain increment. Rounds 2 and 3 agree.
- A contended counter is **slower at four threads than at one** (351–602 against 225–335 ns per update, over three rounds). All commits pass one global lock, and every commit sends every running transaction back to revalidate.
- The retry tally is a lower bound: workers add to it without synchronization (`FortressTaskRunnerGroup.java:37`).
- Private work with no shared state speeds up 2.0–2.7× on four workers. **The pool works; the STM does not scale.**
- The JVM's pool reported `parallelism = 4, size = 5` (the statistics line): `ForkJoinPool` adds compensation threads while workers block in `join`.

## 4. Design: what the specification defines, and what each path does

| question | specification | walk | compiled |
|---|---|---|---|
| parallelism inside `atomic` | Implicit threads "will complete before the atomic expression itself does … will see one another's writes; they may synchronize with one another using nested atomic expressions" (`atomic.tex:77-81`). A nested block is atomic with respect to its siblings (`:72-75`; `memory-model.tex:416`). | children share the transaction; nested atomics synchronize them (400); tryatomic does not (N6) | the same sharing; a nested commit merges into the parent; the shared sets are unsafe (N3); nested validation is partial (N4) |
| a task that blocks or joins inside a transaction | A group's thread is suspended until the group completes; `abort` may suspend (`parallelism.tex:149-157`, `transactions.tex:41-45`). `spawn` "cannot be run within the body of an atomic expression" (`spawn.tex:28-31`). | joins are ordinary; a busy wait progresses by aborts; `spawn` runs unchecked outside the transaction | joins are ordinary; a busy wait progresses at revalidation; `spawn` is not compiled (row 82) |
| abort during a fork | `abort` "abandons execution of the innermost atomic expression" (`transactions.tex:16`). A group "completes abruptly" only after each thread has completed, not run, or ended early (`parallelism.tex:95-99`). | every arm is joined before the retry (PASS) | the retry happens with the other arms unjoined (N1); the innermost block is missed in one body (rows 934, 937) |
| work stealing across transactions | silent | tasks carry their transaction; the current task is restored after `invokeAll`; the manager never waits, so a transaction buried under a helping join is never waited on (`GreedyManager.java:22-24`) | the current task is saved and restored around `join` (revival); there is no waiting except on the sequence lock during write-back |
| plain access beside `atomic` | atomic "with respect to any action performed by any thread which is dynamically outside" (`atomic.tex:36-41`), explicitly including reads and writes outside atomic (`:100-106`); the memory model's predecessor and successor rule (`memory-model.tex:391-400`) | strong | weak (N2) |
| exceptions | variables revert (`atomic.tex:59-70`) | revert (g = 100) | kept (row 324) |
| gather | "Where feasible, reduction must be used in favor of updating a single shared object" (`memory-model.tex:90`); reduction variables in OpenMP style (`reduction.tex:67-79`), "not yet supported" (`:15`) | reductions are parallel and exact (row 60) | reductions run in sequence (N5) |

**The design is coherent: fork/join and STM fit together in it.** Its implicit threads inside a block are *closed nesting with parallel children*. Research systems built exactly that a few years later; each found it hard, and each answered with an ancestor-aware validation:

- Agrawal, Fineman and Sukha, "Nested parallelism in transactional memory", PPoPP 2008 ([researchr](https://researchr.org/publication/AgrawalFS08));
- Volos et al., "NePaLTM", ECOOP 2009, which calls itself the first TM to support nested parallelism inside transactions ([bibtex](https://bibtex.github.io/ECOOP-2009-VolosWASTN.html));
- Barreto et al., "Leveraging parallel nesting in transactional memory", PPoPP 2010, which names "efficiently answering the ancestor test" as the core difficulty ([Microsoft Research](https://www.microsoft.com/en-us/research/?p=163756)).

Production STMs, by my knowledge and not checked online here, avoided the problem altogether: Haskell's `atomically` admits no I/O or `forkIO`, and its types confine `TVar`s, which gives strong atomicity for free; Clojure's `dosync` runs nothing in parallel and holds agent sends until commit. The memory model itself compares a condition with "the X10 guys" (`memory-model.tex:440`); X10's `atomic`, by my knowledge, may not spawn activities.

Strong atomicity in an STM costs barriers on plain accesses. Shpeisman et al., PLDI 2007, built it with barriers, made cheaper by an analysis that spots data still private to one thread ([typeset](https://typeset.io/papers/enforcing-isolation-and-ordering-in-stm-8nbb5fqzpp)). Fortress's specification plans the same economy with shared and local objects, so that atomic access to a local object is cheap (`shared-local.tex:12-60`), but "the present Fortress implementation immediately makes every object shared" (`:40`).

The design's real weaknesses are three:
1. Two commitments that are expensive to deliver: strong atomicity and parallel nesting.
2. A programming discipline that nothing checks. The memory model's principles ask that "it must be possible to check that a program obeys the programming discipline" (`memory-model.tex:49-50`); no checker exists, and races are silent (row 59).
3. Its own gather tool, reduction variables, was never built.

## 5. The JVM side, in Goetz's and the JMM's terms

**Walk.**
- *Locking.* All of a cell's state is guarded by the cell's intrinsic lock (`ReferenceCell.java:87`, `:123`, `:163`), so its accesses are totally ordered: Goetz's "guarded by" rule. The cost is a monitor per element.
- *Atomic variables.* A transaction's status is an `AtomicReference` changed by compare-and-set, so commit and abort are linearizable (`Transaction.java:229-307`).
- *Publication.* Transactions reach other threads through monitor-guarded nodes or through `fork`; both are safe publication.
- *Busy waiting.* `SpawnTask` spins without `Thread.onSpinWait` and without `ForkJoinPool.ManagedBlocker` (`:56-68`), a liveness hazard.
- *Iteration.* `CopyOnWriteArrayList` read sets are safe to iterate, at O(n) per add.

**Compiled.**
- *The sequence lock* is a correct NOrec in JMM terms. Values and the lock are both volatile, so "read the value, then check the lock" is ordered in the synchronization order. Write-back is bracketed by compare-and-set on the lock (`Transaction.java:212-231`, `:299-347`).
- *Defects against Goetz.* What departs from Goetz is thread confinement assumed where there is none:
  - A `Transaction` is shared by sibling tasks (`BaseTask.java:86`), but its `Hashtable` is iterated without the table's lock, which `Hashtable` requires for compound iteration (N3).
  - `snapshot.set(TXValidate())` is a check-then-act race between siblings, benign but unprincipled (`:216-217`).
  - Two shared mutable counters are updated without synchronization: `allRetries` and `totalElapsedTime` (`FortressTaskRunnerGroup.java:37-41`).
  - `FException` keeps every exception value in a static, unsynchronized, never-read `HashMap` (`compiler/runtimeValues/FException.java:18`, `:26`). That is a data race on a shared map and a leak. It was found by reading only, not reproduced.
- *Fork and join publication.*
  - The class comment declines to fork in a constructor because of final-field semantics, "a memory model disaster" (`BaseTask.java:29-37`), a sound reading.
  - A task's fields are published by `fork()`'s release and read back after `join()`. `ForkJoinTask` implements `Future`, whose memory-consistency guarantee makes actions in the task happen before the joiner's next action.
  - Disjoint element writes by tasks are race-free: the JLS has no word tearing between distinct array elements (17.6), and `join` orders them before the reader. This is the ground microGPT's data-parallel writes stand on.
  - N1 breaks it: an orphaned arm's writes have no happens-before edge to the code that follows the group.
- *Volatile is stronger than the language needs.* Every plain access to a cell, and to an element of the `Object[]` store, is volatile (`MutableFValue.java:18`; `FortressArrayStore.java:47`, `:55`). The specification asks only indivisibility (`memory-model.tex:252-260`) and program order for accesses that "certainly access the same location" (`:285-286`). `VarHandle` opaque mode gives exactly that, bitwise atomic for `double` too and without fences; plain mode may tear a `double` (JLS 17.7). This matters for P-84's `double[]` store.
- *The revival's changes.* The move from `jsr166y` to `java.util.concurrent` changed three behaviours:
  - j.u.c's `join` helps by running other queued tasks. That broke the "current task" invariant, and the fix in `joinOrRun` saves and restores it (`BaseTask.java:150-177`). The fix is right for the forked branch. The unforked branch runs `compute()` inline and leaves the child as the current task (row 876). That drift stays consistent only while transactions nest along one thread, which holds today and should be made explicit by restoring there too.
  - j.u.c re-creates a rethrown exception in the joiner when it has a `(Throwable)` or no-argument constructor (the `DirectConstructorHandleAccessor.newInstance` frames in N3's trace). `FException` has neither, so Fortress exceptions keep their identity.
  - Compensation threads can lift the pool above `FORTRESS_THREADS` (`size = 5`, §3.3).

## 6. microGPT

**Under walk today.**
- Neither program writes `atomic`, `spawn` or `also` (`grep` over `explorations/run-c4/src/*.fss` and `explorations/apl/mg/*.fss`: no match). Their writes are private, disjoint fills, or sequential (`c4-parallelism/audit.md` §4).
- They reach the pool through parallel `for`, tuples, arguments, and the library's `fill`, `map` and `mul`; reductions through `SUM`, `DOT` and `BIG MAX`; and every array element as a `ReferenceCell` with no transaction open (`c4-parallelism.md` §§2-6).
- The gather is reductions and products, including the embedding gradients, written as one-hot products (`MicroGptFlat.fss:70`; APL `MicroGptApl.fss:96`). **No transaction is ever opened.**

**On the compiled path, with unboxed arrays and views** (P-17, P-84, F-11, F-12, F-40, F-301):
- **The pool and `do … also`.** Loops over views fork per arm. This is sound with disjoint writes (§5), but the one library splits to single elements with no grain size (`RangeInternals.fss:1324-1340`). Each split builds a task object even when it is not forked (`CodeGen.java:1667-1689`).
- **Reductions.** They will run in sequence (N5). Every `SUM`, `DOT` and `BIG MAX` of the model loses its parallelism unless the code generator or the library changes.
- **Abrupt completion.** Any exception in a forked arm, such as `IntegerOverflow`, an index fault in a view, or an `assert`, leaves sibling arms writing arrays after the caller has moved on (N1).
- **The per-access transaction check.** It stays on mutable locals (row 641, F-12). For elements, the `Object[]` store checks the thread and the current transaction on every `get` and `put` (`FortressArrayStore.java:35-37`). Whether the unboxed store pays the same is undecided (§8, D1).
- **The STM** is not reached, if the model keeps its shape.

**The gather can be done by reductions alone, as the language intends.** Only a scatter-add, such as an embedding gradient indexed by token, would tempt `atomic`. Both programs avoid it with one-hot products. The library's own authors also chose sequence over atomic increments (`FortressLibrary.fss:3046`, `:3175-3177`). Parallelising the contraction axis needs a reduction, private partial results joined, not `atomic`. Given the cost in §3.3, an atomic gather would be slower than a sequential one.

## 7. Defects

### 7.1 New rows, drafted (each checked with `ledger.py check --rows`: only the `?` number cell fails)

N1, beside rows 322 and 497:

| ? | on the compiled path a `do … also` group whose first arm completes abruptly does not wait for its other arms: they run on after the group has completed, so code after a `catch` around the group sees an arm's write arrive later | NEGATIVE-VERIFIED | implementation gap (codegen) | `basic/evaluation/parallelism.tex`, "Threads and Parallelism" | none | parallelism review | `CodeGen.genParallelExprs` forks arms 1 to n-1, runs arm 0 in place, then joins left to right on the normal path only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1662-1712`, at f5aa647de), so a throw in arm 0, or a join that rethrows, skips the later joins. Probe: `do boomArm() also do slowArm() end` in a `try`, `slowArm` setting `flag := 1` after 0.2 s: 'after the catch: flag 0, a second later: flag 1', 3 of 3 runs at four threads, at 157323e5 and f5aa647de. Walk joins every arm (`interpreter/evaluator/Evaluator.java:275`): flag 1, then 1. An aborted atomic block leaves its forked arms running the same way. |

N2:

| ? | on the compiled path an `atomic` block is not atomic with respect to writes made outside `atomic`: a block that reads `x` twice while another task assigns `x` without `atomic` sees two values in 2,405 to 2,994 of 3,000 blocks; under walk, 0 of 300 | NEGATIVE-VERIFIED | implementation gap (runtime) | `basic/expressions/atomic.tex`, "Atomic Expressions" | none | parallelism review | A plain write is `MutableFValue.setValue`, a volatile store that neither takes nor moves the global sequence lock (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:76`), a read validates only when that lock has moved (`:216`), and a read-only commit returns unvalidated (`:301`). Walk's plain write aborts the cell's readers and writer (`interpreter/env/ReferenceCell.java:134-140`, `:166-171`). The program is outside the discipline of `basic/memory-model.tex`, "Programming Discipline"; atomic.tex's last paragraph still asks for atomicity. At 157323e5: 2,085 to 2,983 of 3,000. |

N3:

| ? | on the compiled path the implicit threads of one `atomic` block share its read set, a `Hashtable` that validation iterates unlocked, so a parallel `for` inside a block dies with `ConcurrentModificationException` while another task commits | NEGATIVE-VERIFIED | implementation gap (runtime) | `basic/expressions/atomic.tex`, "Atomic Expressions" | none | parallelism review | `TXValidateHelperTopLevelTransaction` iterates `reads.entrySet()` (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:243`) while a sibling's `TXReadLocation` puts into it (`:223`, `:228`); a read validates once the global lock has moved (`:216`). A child task takes its parent's transaction (`runtimeSystem/BaseTask.java:86`), as atomic.tex asks. Probe: 3,000 blocks of `for i <- 0#64`, each iteration reading one of 64 top-level variables, beside a task looping `atomic do w := w + 1 end`: 'ConcurrentModificationException ... Transaction.TXValidateHelperTopLevelTransaction(Transaction.java:243)', 3 of 3 runs at four threads, at 157323e5 and f5aa647de. |

N4:

| ? | on the compiled path a nested `atomic` block validates only its own reads, so it can see a state that no commit made: the outer block reads `x`, its nested block reads `y`, other blocks change `x` and `y` together, and the nested block sees them differ | NEGATIVE-VERIFIED | implementation gap (runtime) | `basic/expressions/atomic.tex`, "Atomic Expressions" | none | parallelism review | `TXValidateHelperNestedTransaction` checks the nested transaction's reads against its ancestors' writes and the committed values, never the ancestors' reads (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:257-278`), and the read then takes a fresh snapshot (`:216-217`); the outer block aborts only at its own next validation, so the nested block computes, prints or throws on the mixed state meanwhile (a throw leaves by row 324's path). Probe of 3,000 outer blocks: 'INCONSISTENT x 15396 y 15398', 17 to 89 such lines at f5aa647de, 45 to 111 at 157323e5, three runs each at four threads; walk 0 in three runs of 300. |

N5, beside row 74 and F-19:

| ? | on the compiled path a reduction runs its bodies one at a time: the prelude's `gen` passes its two halves as a call's arguments, which the code generator evaluates in order; 64 slow `SUM` bodies run at most 1 at once where a parallel `for` runs 4 | NEGATIVE-BOUNDED | implementation gap (codegen) | `basic/evaluation/parallelism.tex`, "Threads and Parallelism" | none | parallelism review | `CodeGen.evalArg` evaluates a tuple argument's elements in order, under the team's comment 'Why isn't this parallel???' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6935-6955`); `gen` differs from `seqgen` only by passing the halves as arguments (`Library/CompilerLibrary.fss:381-414`), and the one library's ranges do the same (`Library/RangeInternals.fss:1320`), so after the switch-over every `SUM`, `DOT` and `BIG MAX` would too. The specification allows it (`parallelism.tex:89-90`). 'SUM of 64 bodies: at most 1 at once; parallel for: at most 4 at once', 3 of 3 at 157323e5 and f5aa647de. Walk forks argument tuples (`interpreter/evaluator/Evaluator.java:342`). |

N6, beside rows 352 and 353:

| ? | under walk `tryatomic` inside an `atomic` block runs as plain code of the enclosing transaction, so that block's implicit threads lose updates through it: 400 iterations of `tryatomic do c := c + 1 end` in a parallel `for` inside `atomic` leave 350 to 374 and throw no `TryAtomicFailure` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/expressions/atomic.tex`, "Atomic Expressions" | none | parallelism review | `Evaluator.forTryAtomicExpr` evaluates the body directly when a transaction is open (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:205-214`), under the team's 'Why is this? It seems inconsistent ...' (`:210`); the threads share the enclosing transaction (`interpreter/evaluator/tasks/BaseTask.java:35`), and a cell that a transaction itself wrote is read and rewritten without conflict (`interpreter/env/ReferenceCell.java:151`, `:179-180`). By atomic.tex tryatomic acts as atomic does, and nested atomic expressions synchronize implicit threads; with `atomic` in its place, 400. `tests/nestedTransactions3.fss` asserts the flattening. Compiled: row 353. At 157323e5. |

N7, beside row 466 (the gap the batch-28 review flagged by reading as A.skeptic.3; batch 28's own line):

| ? | on the compiled path two transactions that `init` the same empty element of an array store both answer true, and the later commit replaces the first value: in 935 to 988 of 1,000 rounds of two overlapping atomic blocks | NEGATIVE-VERIFIED | implementation gap (runtime) | `advanced/parallelism-locality/arrays-distributed.tex`, "Distributed Arrays" | none | parallelism review | siblings: 466. `FortressArrayStore.init` reads the slot through the transaction and writes it where the read found nothing (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java:60-66`), but `TXReadLocation` records no read of an empty slot (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:227`), so the second commit's validation has nothing to check. A Java probe on a `FortressTaskRunnerGroup(4)`, two tasks in `ArrayStoreJUTest`'s atomic protocol: 'both inits answered true 935, exactly one 65', then 988 and 964, at f5aa647de. Reached by compiled programs from the switch-over on. Walk: 0 of 200 rounds held neither value, three runs. |

N8, beside row 305:

| ? | on the compiled path, until the switch-over, an element of the prelude's `ZZ32Vector` is outside the transaction: 20,000 `atomic do v[k] := v[k] + 1 end` from a parallel `for` leave 19,265 to 19,895 | NEGATIVE-VERIFIED | implementation gap (prelude) | `basic/memory-model.tex`, "Programming Discipline" | none | parallelism review | `FZZ32Vector` holds a plain `int[]` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32Vector.java:18`) that `simpleIntVector.putIndexedValue` writes with no transaction check (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntVector.java:26-29`); a top-level and a local variable updated in the same iterations end exact, 20,000. Three runs at four threads at 157323e5 and at f5aa647de. The prelude goes at the switch-over, but an unboxed store of P-84 has the same shape unless it gets a slot API (P-169). |

### 7.2 Known rows: confirmed or corrected

- **933, rewrite.** The claim is true but narrow. The mechanism also aborts a block, without any nesting, whenever any other block commits during it (§3.2). Proposed whole line:

  | 933 | on the compiled path a block that reads a variable it wrote records that write as a read, so it aborts whenever any block commits before it does, on any variable; after it commits a nested block, its next read aborts it every time, and it never ends | NEGATIVE-VERIFIED | implementation gap (runtime) | `basic/expressions/atomic.tex`, "Atomic Expressions" | none | climb batch 28 rung A | `TXReadLocation` puts an own or ancestral write into the read set (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:223`, the team's text at a874948ac), and validation compares it with the committed value (`:247`, `:266-270`); a nested commit moves the global clock (`:306`, `:346`). `var x`, `var z`, `atomic do x := 2; y: ZZ32 = x; atomic do z := 1 end; w: ZZ32 = x end` under `timeout`: exit 124 at 157323e5, fe19fdad, f5aa647de. 20,000 blocks `x := x + 1; y := x` beside a task committing on `z` alone: 1,635 to 30,350 retries; the same writes without the read: 0. No gated test: the run step has no timeout (`tests/unit_tests/FileTests.java:585`). |

- **934, 937: confirmed at f5aa647de.** `d 310, 337, 334` of 400 (934); `XXXNestedAtomicAbortCompiled` FAIL 3 of 3 (937). Their mechanism is the team's (§2). Both rows' notes are full (`ledger.py note … --check`: 3 characters left), so this confirmation lives here.
- **322, narrow the claim.** It holds only when the block ends an arm after the first. Arm 0 compiles in place (`CodeGen.java:1693`), and with the block there the probe printed PASS; in arm 1 it gave `VerifyError`. Proposed claim: "an `atomic do … end` block as the trailing expression of a `do … also` arm after the first produces a class that fails verification on the compiled path: `VerifyError: Inconsistent stackmap frames at branch target 5`". The row has 96 characters left.
- **324: confirmed** at f5aa647de: `g = 7` compiled, `g = 100` under walk at 157323e5.
- **319: confirmed by reading.** `GETFIELD` and `PUTFIELD` with no check (`VarCodeGen.java:209`, `:220`).
- **59, 60: confirmed.** Unguarded counts are lost on both paths; reductions beside transactions are exact on both.
- **641: consistent.** 15 ns per plain increment of a top-level variable, including its two checks.
- **876: consistent by reading.** The unforked branch of `joinOrRun` never restores the current task (`BaseTask.java:148-149`).
- **82, 353, 497, 640, 888, 938, 417, 155, 265: not re-run.** They are consistent with the code read here.

### 7.3 Found by reading, no row drafted (decision 3)

- Walk's `ReadSet` copy constructor copies nothing (`ReadSet.java:29-42`; Java check above). Eager conflict detection masks it: the readers it drops are always ancestors of the new writer, which the writer relation protects. No program-level effect was found.
- `FException`'s static `HashMap` (§5): a data race and a leak, not reproduced.
- The racy retry tally (§3.3).
- `ParallelismAnalyzer`'s removal of the `FnDecl` instead of the name (§1.7).

## 8. The answer, in Pavol's terms

| block | verdict |
|---|---|
| fork/join pool and tasks, walk | **Mature enough.** Structured joins on every path; no grain size on `also`; `spawn` crude (a pool per spawn, spinning). |
| fork/join pool and tasks, compiled | **Sound core, immature edges.** It scales on private work (2.0–2.7×). It drops joins on abrupt completion (N1), relies on the current-task pointer (row 876), and runs call arguments, and so reductions, in sequence (N5). |
| library ranges and reductions | **Sound design.** Deterministic join trees, algebra by reduction objects, unchecked. Walk has no grain size; the compiled path runs reductions in sequence. |
| walk STM | **Mature for an interpreter, and faithful to the specification.** Strong atomicity, closed parallel nesting, a never-wait manager chosen for work stealing. One defect (N6); costly by design. |
| compiled STM | **An immature implementation of a sound algorithm family.** About two months old in 2012. Six runtime defects: rows 933 and 324's leak path, and N2, N3, N4, N7. No contention policy. It does not scale. |
| code generator's `atomic` | **Immature.** Rows 322, 324, 353, 875, 934, 937 and 319. |
| arrays inside transactions | walk: correct and costly. compiled: the `Object[]` slots are new (N7); unboxed stores have no transactional story (D1). |
| the language design | **Coherent, and fork/join plus STM is compatible in it.** Its flaws are of commitment, not contradiction: strong atomicity and parallel nesting are expensive; the programming discipline is unchecked; its gather tool, reduction variables, is unbuilt. |

So the mistakes found are signs of immature blocks, not of a broken design. The compiled path is where the immaturity sits. Two design-level gaps belong to the compiled implementation's choices, not to the language: weak atomicity (N2) and partial nested validation (N4).

**Repair before the compiled path relies on parallelism, in order:**
1. **N1.** Join every forked arm before a group completes abruptly, as walk does. Without it, an exception in parallel numeric code leaves writers running.
2. **N5,** with a grain size in the one library's parallel range. Without it, the model's reductions run in sequence.
3. **D1:** the unboxed store's stance on transactions, and its element access mode (opaque rather than volatile).
4. **Row 641's check** kept off, or hoisted out of, the unboxed element path.

**Before anything relies on `atomic`:**
- rows 933, 934/937/888 (one fix: register the handler after the body), 324, N4, N3 (per-task logs, or a lock on the shared sets), N7, 319 and 353;
- then D2 (strong atomicity) and a contention policy (backoff on, or a bound).

**Can wait:** walk's costs (P-29), the dead `ReadSet` copy, N6 (a nested `doItOnce` even inside a transaction would fix it), `spawn` (row 82), N8 (it goes with the prelude), the statistics, and sharedness and regions.

## Decisions

1. **Compiled probes in a worktree at main, repeated on the base for attribution.** Every new compiled defect reproduces on 157323e5. So N1–N6 and N8 are the team's code; N7 is batch 28's own line. The alternative, the base alone, would not have reached the slot API. No decision of the curator covers this; I followed the brief.
2. **The store's init race tested at Java level,** with `ArrayStoreJUTest`'s protocol, because no compiled program reaches the one library's arrays before the switch-over. The alternative, waiting for the switch-over, leaves A.skeptic.3 unmeasured.
3. **No rows for the four reading-only findings (§7.3).** None is reproduced as a program-level defect. The alternative was rows marked NEGATIVE-BOUNDED.
4. **A rewrite of row 933 rather than a sibling row.** It is one mechanism with two symptoms. The alternative is a new row, siblings 933.
5. **Timing only on the compiled path** (P-29), at one and four threads, alone on the machine.

## Questions for the curator (decisions not taken)

- **D1. Arrays of unboxed numbers and `atomic` (P-84, P-169).** P-169's own reason is that "a compiled atomic write into any array needs that keying". Today the slot API keys only `Object[]`, the `double[]` store "takes no part in a transaction", and N8 shows what an untracked store does under `atomic`. The options:
  - (a) Unboxed stores stay outside transactions. This is recorded as a departure in Appendix I. It contradicts P-169's reason.
  - (b) A primitive slot API, `TXReadDouble` and `TXWriteDouble`, validated by raw bits (NaN and -0.0 make `!=` wrong), plus a per-element check of about 1–2 ns (row 641's rate).
  - (c) The library checks once per bulk operation, `fill`, `map` or `mul`, and picks a transactional or a plain loop.

  There is no default on record. microGPT needs none of (b) or (c) for correctness.
- **D2. Strong atomicity on the compiled path** (N2; `atomic.tex:100-106`). The options:
  - (a) Keep weak atomicity for programs outside the discipline, recorded in Appendix I.
  - (b) Plain writes of mutable variables take the sequence lock: a compare-and-set pair per plain write.
  - (c) The specification's shared and local objects (`shared-local.tex`), so that only shared objects pay.

  Disciplined programs, microGPT among them, are unaffected by (a).
- **D3. Parallel reductions on the compiled path** (N5). The options:
  - (a) The code generator forks call arguments by `ParallelismAnalyzer`, as it does tuples.
  - (b) The one library's `generate` binds its halves as a tuple.
  - (c) Leave them sequential until PLAN's "compiled parallelism" (inventory B1 steps 20 and 21).

  This bears on PLAN's order.

## For FACTS

1. **Walk's STM descends from DSTM2 and is strongly atomic.** It has visible readers, eager conflict detection, and a manager that always aborts the other transaction, chosen for work stealing.
   - For the work: walk is the reference for the specification's semantics of `atomic`.
   - Check: `git show 9aed945d8:ProjectFortress/src/dstm2/manager/GreedyManager.java` against `GreedyManager.java:22-49`; `WStrongAtomicity` printed 0 of 300.
   - Detail: §§1.2, 2.
2. **The compiled STM is in NOrec's form: one global sequence lock, buffered writes, value validation, closed nesting.** Flood wrote it in April–May 2012.
   - For the work: its commits do not scale; a contended counter is slower at four threads than at one.
   - Numbers: about 210 ns per uncontended block against 15 ns plain; 351–602 against 225–335 ns per contended update.
   - Check: `runcost.sh` (§3.3). Detail: §§1.4, 2, 3.3.
3. **Compiled reductions run their bodies one at a time,** because call arguments are evaluated in order. This follows from F-19's evalArg sentence, which does not draw it.
   - Check: `CReductionPar` printed "at most 1 at once". Row N5.
4. **Neither microGPT program opens a transaction; their gather is reductions and products.**
   - Check: `grep -n -E '\batomic\b|\bspawn\b|\balso\b' explorations/run-c4/src/*.fss explorations/apl/mg/*.fss`, no match.
   - Detail: §6.
5. **F-185's commented-out multi-threaded half passes when restored with `invokeAll`:** 2048 of 2048, five runs. The comment-out came from an API change.
   - Check: `java/probe/ReadSetThreads.java`. Detail: §2.

## Commands worked out

- **Real commits of a file.** The phantom snapshot roots must be skipped. `authors.sh` in the scratchpad lists `git log --follow --format='%H|%P|…' a874948ac -- FILE` and drops parentless commits and commits touching more than 400 files.
- **Java probes against a tree's runtime.** `CP=$(bin/fortress_classpath | tail -1); javac -cp "$CP" -d classes probe/*.java; java -cp "classes:$CP" probe.X`, from the tree's root with `FORTRESS_HOME` set.
- **Retry counts.** `FORTRESS_THREAD_STATISTICS=y bin/fortress run P` prints the pool and "Had to retry a transaction N times" at the end; N is a lower bound (§3.3).

## Summary for the curator

You asked whether Fortress's parallel foundation is firm. It is firm where microGPT stands, and soft where it does not stand yet.

**Fork/join** is the core. A *task* is a piece of work. *Forking* hands it to the pool of worker threads, and *joining* waits for it. *Work stealing* means an idle thread takes queued tasks from a busy one. Both paths use Java's `ForkJoinPool`, and on private work it scales: 2.0–2.7× on four threads. Walk's tasks are sound. The compiled tasks have one structural fault that matters for microGPT: when one arm of a parallel block throws, the block exits without waiting for the others, which keep writing (N1). Compiled reductions such as `SUM` also run one body at a time, because the code generator evaluates a call's arguments in order (N5).

**STM** (software transactional memory) runs an `atomic` block as a *transaction*. Its reads and writes take effect all at once, at *commit*, or are thrown away and the block *retried*, if another thread *conflicts*, that is, touches the same data. Fortress has two STMs.

- **Walk's** grew from Sun Labs' own DSTM2 library (2006–2008). It records readers on each variable, so a conflicting writer can *abort* them at once. Plain reads and writes outside `atomic` also abort conflicting transactions. That is *strong atomicity*, which the specification requires. Its *contention manager*, the rule that picks who loses a conflict, always aborts the other side; the team removed DSTM2's waiting on purpose, writing that waiting interacts badly with work stealing. It passed every probe but one: `tryatomic` nested inside `atomic`.
- **The compiled one** was written in spring 2012, months before the project stopped. It keeps writes private until commit, takes one global lock to commit, and *validates* by checking that values it read are unchanged. That is a known good published design, NOrec. Its implementation is young. It aborts blocks that read their own writes (row 933). Its nested blocks can see half-made states, which breaks *opacity*, the promise that even a doomed transaction sees a consistent world (N4). It crashes when parallel tasks inside one block validate at once (N3). Plain writes slip past it, so its atomicity is *weak* (N2). Contended counters run slower on four threads than on one. In Java memory model terms (the rules on when one thread's write is visible to another, through *volatile*, locks and *compare-and-set*), its lock protocol is right; the faults are shared state assumed private.

**Are fork/join and STM compatible?** Yes. The specification defines tasks inside a transaction coherently: they share it and synchronize through nested `atomic`. Research systems built exactly this a few years later and found it hard. The faults found are immature implementation, not a broken design. The design's costs are strong atomicity, parallel nesting, and a discipline that nothing checks.

**microGPT** never opens a transaction. Its gather is reductions and matrix products, as the language intends, so it needs no `atomic`. Before the compiled path relies on parallelism, fix N1, make reductions parallel with a grain size (N5), and decide how unboxed arrays treat `atomic` (D1). The STM repairs can follow, before any program relies on `atomic`.

Sources:
- [Agrawal, Fineman, Sukha, PPoPP 2008](https://researchr.org/publication/AgrawalFS08)
- [Volos et al., NePaLTM, ECOOP 2009](https://bibtex.github.io/ECOOP-2009-VolosWASTN.html)
- [Barreto et al., Leveraging parallel nesting, PPoPP 2010](https://www.microsoft.com/en-us/research/?p=163756)
- [Shpeisman et al., Enforcing isolation and ordering in STM, PLDI 2007](https://typeset.io/papers/enforcing-isolation-and-ordering-in-stm-8nbb5fqzpp)

<!-- A review of the ways to make compiled code outside `atomic` pay nothing for its transaction checks, written by a delegated worker for the coordinator on 2026-11-17, for Pavol's question on gap-ledger row 641. Read only, at main 41894ec7d6: nothing was changed, built or run. It builds on reviews/parallelism-foundations-2026-11-08.md. A peer's claim with a link was checked online; one marked "by my knowledge" was not. -->

# The transaction checks: what the language requires, and the ways to remove them

## 1. A primer: what a transaction is in Fortress

The parallelism review explains the two STMs at length (`reviews/parallelism-foundations-2026-11-08.md`, "Summary for the curator"). STM is software transactional memory. Here is the short form, on one program.

```
var total: ZZ32 := 0

add(k: ZZ32): () = do
  total := total + k
end

run(): () = do
  for i <- 1#100 do
    atomic do add(i) end
  end
  add(1000)
end
```

- **The loop is parallel.** Two iterations can read `total` as 5 at once. Without `atomic`, both write 5 plus their own `i`, and one update is lost.
- **What `atomic` promises.** Every read and write inside the block appears to happen in one step, for every other thread. A *transaction* is one run of the block.
- **A read inside** notes the pair (variable, value seen) in the transaction's *read set*. **A write inside** goes to its private *write set*; no other thread sees it yet.
- **The commit.** At the block's end the transaction takes one global lock, checks that each value it read is still there (*validation*), and writes its write set out.
- **An abort and a retry.** If a value changed, another block committed first. The transaction drops its sets (an *abort*) and runs the block again (a *retry*). The second iteration then reads 6, not 5.
- **An exception** drops the block's writes, and each variable goes back to its value before the block.
- **Threads inside a block.** A parallel loop inside `atomic` runs its iterations as tasks, and each task inherits the block's transaction.

**Why every read and write asks.** `add` is compiled once, to one JVM method. In the loop it runs inside a transaction; in the last line, outside any. It can't know which, so before each read and write of `total` it calls `BaseTask.inATransaction()`, which asks the current thread for its task, and the task for its transaction. If there's one, the access goes to the transaction; if not, it reads or writes the variable's *cell*, the small object that holds a mutable variable's value. Outside `atomic` the answer is always no, at about 1 to 2 ns a question.

**What it costs today.** A probe measured the checks at one thread, against a copy whose check always answers no (gap-ledger row 641, the record of this cost):

- TxArray, a `while` loop over an array with mutable locals, 7 checks an element: 23.17 ns an element with the checks, 8.39 ns without, so 64 % of the time.
- TxScalar, a `for` loop over 20 M steps that updates one `var acc: RR64`, 2 checks a step: 9 to 15 %.
- TxCell, the same loop with the body `acc := acc`: 16 %.

References: `explorations/perf-probes/transactions/REPORT.md`, sections 1 and 2; `ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java:83-86` (a task inherits the transaction), `:255-263` (the check); `Specification/basic/expressions/atomic.tex:36-43`, `:59-70`, `:77-81`.

## 2. What the team's sources require

### 2.1 The specification

- **Every location the block touches belongs to it.** "All reads and all writes which occur as part of this evaluation will appear to occur simultaneously in a single atomic step with respect to any action performed by any thread which is dynamically outside" (`atomic.tex:37-41`). "Dynamically" means by what runs, not where the code is written, so a function called from a block is inside it.
- **Mutable variables are locations.** "Allocation occurs when a mutable variable is declared, or when a reference object is constructed" (`basic/evaluation/memory-ops.tex:36-39`). The team wasn't sure: "Should variables (esp parameters and mutable locals) be considered locations ...?" (`basic/memory-model.tex:360-363`).
- **Strong atomicity.** A block is atomic also against accesses outside every block: "with respect to reads and writes of a_i and sum that do not occur in atomic expressions" (`atomic.tex:104-106`). *Weak atomicity* protects a block only against other blocks.
- **The discipline.** A program that keeps it needs no strong atomicity: "Updates to shared mutable locations must always be performed using an atomic expression. A location is considered to be shared if and only if that location can be accessed by more than one thread at a time" (`memory-model.tex:69-75`).
- **What a block must undo.** On an exception, "all writes to objects allocated before the atomic expression began evaluation are discarded. Writes to newly allocated objects are retained. Any variable reverts to the value it held before evaluation of the atomic expression began" (`atomic.tex:63-67`). `abort()` "rolls back its changes, requiring the atomic expression to execute again from the beginning" (`advanced/parallelism-locality/transactions.tex:15-19`).
- **Nesting.** An inner block is atomic against the other threads of its outer block (`atomic.tex:72-81`).
- **Shared and local objects.** "A local object must be transitively reachable ... from the variables of at most one running thread. A local object may be accessed more cheaply than a shared object, particularly in the case of atomic reads and writes" (`advanced/parallelism-locality/shared-local.tex:19-23`). A local variable that a thread reads must be *published*, made shared, before that thread runs in parallel (`:47-50`). The team never built this: "the present Fortress implementation immediately makes every object shared" (`:40`).
- **Modifiers.** An `io` function "must not be invoked from a non-`io` function", and `io` functions "cannot be called within an atomic expression"; a function marked `atomic` runs its body as a block (`basic/functions.tex:118-126`; `atomic.tex:50-57`). Both are "not yet supported" (`atomic.tex:15`).

### 2.2 The team's later word

- The 2012 restart has a header for atomic expressions and nothing under it (`Documentation/Specification/Prose/Language/Expressions/atomic.tick:12`). Its `do … also` text keeps the `atomic` modifier of each block (`do-also.tick:18-37`).
- The papers under `Papers/` say nothing on transactions or `atomic` (grep, no match outside bibliographies).

### 2.3 The team's two implementations

- **Walk.** Every mutable variable, field and array element is a cell that takes its own lock and consults the transaction at every access, inside `atomic` or not. A plain access aborts a conflicting transaction, so walk is strongly atomic (parallelism review, section 1.2).
- **The compiled path.** The code generator, not the run time, writes the check, at every read and write of four kinds of variable (`compiler/codegen/VarCodeGen.java`):
  - `LocalMutableVar`, a `var` local in its own method's frame (`:454-560`; the cell is made at `:466-474`; the checks at `:484-513` and `:523-551`);
  - `MutableTaskVarCodeGen`, a `var` local captured by a task arm, a function expression or a local function, which reaches the cell through a field (`:612-745`; made for every capture at `compiler/codegen/CodeGen.java:5441-5462`, for task arms through `delegate`, `:5581-5611`, for function expressions at `:3924-3945` and for local functions at `:4079-4107`);
  - `MutableStaticBinding`, a top-level `var` (`VarCodeGen.java:313-414`);
  - `MutableFieldVar`, an object's `var` field, whose cell the object holds (`:207-239`).
- An immutable field has no check (`FieldVar`, `:174-199`).
- **The array store** checks too, in Java, in every `get` and `put` (`compiler/runtimeValues/FortressArrayStore.java:35-57`). This is the element side of the same question.
- **The compiled STM** is in the form of NOrec: one global sequence lock, buffered writes, validation by value (`runtimeSystem/Transaction.java:83`, `:228-248`, `:302-371`; parallelism review, section 1.4). A plain access neither takes nor checks the lock, so the compiled path is weakly atomic (gap-ledger row 948).
- **What the check reads.** The current thread, a cast, a non-final boxed static `Boolean debug` (`BaseTask.java:50`), the thread's `volatile` task field twice (`runtimeSystem/FortressTaskRunner.java:19`), and the task's transaction (`BaseTask.java:255-263`).

### 2.4 Who wrote it, and whether they planned to remove it

- Christine Flood wrote the compiled transactions; her bio names "software transactional memory, and compilation to a fork/join framework" (`research/authorship.md:46`). The checks first appear in her "Top Level Transactions" (9f63f9859, 2012-04-09), four sites in `VarCodeGen.java` calling `FortressAction.inATransaction`; the snapshot of 2012-03-20 (5e6f71081f) has none (`git show REV:…/VarCodeGen.java | grep -c inATransaction`: 4 and 0). Nested transactions followed in May 2012 (11beddd1d, d3f49be2f, 8415fc990), and Claire Alvis's backoff on 2012-06-04 (parallelism review, section 2). 9f63f9859 and 11beddd1d have no parent in the conversion, so an earlier change can be hidden (`research/authorship.md`, caveats).
- The revival added the top-level `var` (42d51c474, 2026-09-19) and the `var` field in a cell (F-374, the FACTS entry on the field's cell), each with the same check.
- **No plan to remove the checks is left.** I found no comment, stub or note on their cost in `VarCodeGen.java`, `CodeGen.java`, `BaseTask.java` or `Transaction.java`. The one stub near them is about tasks: "I'm just a stub. Someday I'll have a body that updates the changed local variables" (`CodeGen.java:5561`).
- **The team's bytecode optimizer** (Flood, Chase and Steele) is a separate jar-to-jar tool that `fortress compile` doesn't run (`compiler/asmbytecodeoptimizer/ByteCodeOptimizer.java:130-141`, `bin/BytecodeOptimize`). None of its passes treats the checks.
- The team's one plan for cheaper atomic access is the specification's shared and local objects (2.1).

### 2.5 The record, and where the tree moved since the parallelism review

- FACTS, the record's established facts: F-12 (a scalar loop pays a check at each use of its accumulator), F-351 (a compiled transaction validates itself and every ancestor), F-374 (a `var` field is a cell, and every access pays the check). POSITIONS, the curator's decisions: P-169 (the compiled store is an `Object[]` whose elements the transaction tracks by array and index; F-333). No other decision is on `atomic` or transactions (searched by title and by grep).
- **Moved since the parallelism review** (2026-11-08, at f5aa647de):
  - The transaction's repairs (594da41299; F-351) closed gap-ledger rows 933, 934, 937 and 324, and the review's defects N3 and N4 (rows 949, 950).
  - Climb batch 30's rung P (76b21f4981; F-350; P-175, the decision that a call's arguments fork) joins every forked arm (rows 947, 951), and the one library's parallel range stops at a grain of 16 elements (`Library/RangeInternals.fss:1312-1330`).
  - Row 319 is closed, so a `var` field now pays the check (F-374); the review's section 1.6 predates this.
- **Still open:** row 948, strong atomicity, which is review-queue item 510 (question D2, not yet asked); row 984, the same for a nested block; row 953, unboxed array elements outside the transaction, which is item 509 (question D1, not yet asked).

### 2.6 So: which variables can a transaction reach, by the specification?

This is my reading of 2.1. It isn't stated in one place.

- A block must undo, and must isolate, only locations that **existed before the block began** (`atomic.tex:63-67`). A location allocated inside the innermost open block needs no tracking by it. No thread outside can see it before the commit, and an abort makes it unreachable.
- So a `var` local that no closure captures (one thread's frame alone) is reached by a transaction only at an access written **inside an `atomic` block of its own body, when the declaration is outside that block**. Everywhere else, either no transaction is open, or the local was allocated inside the open one.
- A local captured only by a task arm keeps that rule. The arm is joined before its group ends (F-350), so it runs under the transactions open where it was written.
- A local captured by a function expression or a local function, a top-level `var`, a `var` field and an array element can be reached by any transaction that calls the code. That can be decided only by what runs, or by a whole-program analysis.

How each answer to D2 changes this:

- **D2(a), weak atomicity kept.** A check can go wherever the code is shown to run in no transaction, and tracking can go for a location allocated after the innermost open block began.
- **D2(b), plain writes take the sequence lock.** A plain write to any location that some transaction may read must pay a compare-and-set pair. For a plain read to be atomic too, it must wait while a commit writes back (inferred). Only a location that one thread alone reaches, or that no transaction ever touches, skips.
- **D2(c), shared and local objects.** Only shared objects pay the barrier. An uncaptured local is always local. A captured cell becomes shared when its task runs in parallel (`shared-local.tex:47-50`).

References: the lines above (specification files under `Specification/`, Java under `ProjectFortress/src/com/sun/fortress/`); `explorations/reviews/parallelism-foundations-2026-11-08.md`, sections 1, 2, 4, D1 and D2; `explorations/coordinator/review-queue.md`, items 509, 510; FACTS and POSITIONS as named.

## 3. The ways

**The four loops the ways are judged on.**

- **TxArray** (64 %): `sumN` sums an eight-element vector, and `round` calls it 10 M times. All four of its `var`s, `acc`, `i`, `total` and `k`, are uncaptured locals in `while` loops:

  ```
  sumN(): ZZ32 = do
    acc: ZZ32 := 0
    i: ZZ32 := 0
    n: ZZ32 = |data|
    while i < n do
      acc += data[i]
      i += 1
    end
    acc
  end
  ```

- **TxScalar** (9 to 15 %) and **TxCell** (16 %): `for i <- seq(1#20000000) do acc := acc 0.9999999 + 0.0000001 end`. The loop body is a function expression, so `acc` is captured by a closure. Its two checks are in the closure's `apply` (`perf-probes/transactions/REPORT.md`, section 1).
- **microGPT's shape**, by reading only, since no compiled microGPT runs:
  - Its model lines hold three captured `var`s, `p`, `m` and `v`, written once a training step (`explorations/run-c4/src/MicroGptFlat.fss:83-89`). Its vocabulary and loaders hold one captured `off` and uncaptured `cnt` and `line`, run once (`FlatArrays.fss:182-186`, `FlatData.fss:71-73`). None of these matter.
  - Its kernels are the one library's `SUM`, `DOT`, `MAX` and maps. A reduction over a parallel range splits down to 16 elements, then runs the sequential leaf (`Library/RangeInternals.fss:1365-1376`):

    ```
    generate[\T\](red: Reduction[\T\], body: ZZ32->T): T = do
      result : T := red.empty()
      i : ZZ32 := l
      if l <= r then
        result := red.join(result, body(i))
        while i < r do
          i += 1
          result := red.join(result, body(i))
        end
      end
      result
    end
    ```

    `result` and `i` are uncaptured, so that is 6 checks an element, and 4 in the leaf of `loop` (`:1377-1385`). Each element read in `body(i)` adds the store's own check (`FortressArrayStore.java:45-50`).
  - A loop that a program writes itself, as in F-358 (the first compiled loop against the one library), has `s: RR64 := 0.0` and `for i <- seq(0#n) do s += a[i] b[i] end`. There `s` is captured by a closure, which is TxScalar's case, plus two store checks a step.
  - The library's vector `dot` is a `SUM` over index-value pairs (`Library/FortressLibrary.fss:2803-2804`). I didn't trace whether that reaches the leaf above.

A *rung* below is one worker's change in a batch. Rung counts are my estimates.

### Way 1. The specification's shared and local objects (the team's own design, unbuilt)

- **Changes.** The run time marks each cell and object local or shared, and publishes a structure when it's stored into a shared object or a task runs in parallel (`shared-local.tex:37-53`). The code generator tests the mark at a plain access.
- **Cost.** A mark per object. Publication can be deep: "an apparently short atomic expression ... run arbitrarily long" (`:55-58`). Many rungs, in the run time and the code generator.
- **Inside `atomic`.** A local object needs undo, not conflict tracking (inferred from `:21-23`).
- **What it clears.** Under D2(a), none of the checks: a local object inside a transaction still needs undo, so the code still asks. Under (b) and (c) it removes the barrier for local objects. It is D2's answer (c), not a cure for row 641.
- **Decisions.** It bends none.
- **Peers.** Intel's STM for Java marks objects private or public at run time ("dynamic escape analysis"), so that private objects get shorter barriers: Shpeisman et al., "Enforcing isolation and ordering in STM", PLDI 2007, doi 10.1145/1250734.1250744 (read in its abstract, [summary](https://typeset.io/papers/enforcing-isolation-and-ordering-in-stm-8nbb5fqzpp)).

### Way 2. A lexical rule for uncaptured locals, in the code generator

- **Changes.** `CodeGen` keeps the depth of the `atomic` blocks it's inside, around `forAtomicBlock` (`CodeGen.java:2047-2081`). `LocalMutableVar` records the depth at its declaration. Then:
  - an access outside every block of its own method emits the plain cell access, with no check;
  - an access inside a block that doesn't enclose the declaration goes to the transaction, with no check;
  - a local declared inside the block uses the plain access.
  A local captured only by a task arm takes the same rule, which needs `createTaskLexEnvVariables` (`:5441-5462`) to tell an arm from a closure.
- **Cost.** About one rung, in `VarCodeGen.java` and `CodeGen.java`, and no compile time. Methods shrink: a check site adds about 17 to 19 bytes of bytecode (my count of `VarCodeGen.java:484-551`). `sumN` is 319 bytes with its 9 sites, against HotSpot's 325-byte limit for inlining a hot method (`FreqInlineSize`, from `java -XX:+PrintFlagsFinal`), and the probe saw C2 sometimes refuse to inline it with the checks (`REPORT.md`, section 5).
- **Inside `atomic`.** As today for a local declared outside the block. Its tests run at four threads (P-125, the decision that the suites do): such a local reverts on `abort` and on an exception.
- **What it clears.** All 7 of TxArray's checks an element (the probe's 23.17 to 8.39 ns, since every check there is on an uncaptured local), and the library leaf's 6, or 4. None of TxScalar's or TxCell's, and not the store's.
- **Needs** nothing the tree lacks, beyond the depth counter. **Decisions:** it bends none, and follows `atomic.tex:63-67` (2.6).
- **D2.** For an uncaptured local it holds under all three answers: one thread alone reaches it, so it never needs a barrier. The task-arm part holds under (a) only. Under (b) and (c), a cell that two arms reach is shared, and its plain writes need the barrier.
- **Peers.** Optimizing transactions for "captured memory", memory that can't escape the transaction or the thread, which their compiler found to be up to 60 % of the barriers it made: Dragojević, Ni and Adl-Tabatabai, SPAA 2009 ([paper](https://infoscience.epfl.ch/record/144051/files/spaa97-dragojevic.pdf); I read its abstract).

**Way 2b, its second step: no cell for an uncaptured local.** The value lives in a JVM local slot. A block that writes it saves it in a second slot at its start, and restores it on an abort or an exception, before the retry or the rethrow: `atomic.tex:66`'s "any variable reverts". This removes the cell's allocation and `volatile` access, which the shadow kept, so 64 % is a lower bound here. An unboxed accumulator (decision B, unboxed arithmetic chosen by static type; P-17, the decision that doubles are unboxed) can live only in such a slot, since a cell holds a boxed `Any` (F-117) (inferred). About one rung, with decision B. STM compilers checkpoint locals so, by my knowledge.

### Way 3. Ask once per method call, not once per access

- **Changes.** At each method's entry, generated code calls `inATransaction()` once into a JVM boolean; inside a lexical block the answer is known to be yes; every other access tests the boolean. C2 then splits a loop on that test into two copies, one with no test ("loop unswitching", on by default: [loopUnswitch.cpp](https://raw.githubusercontent.com/openjdk/jdk/master/src/hotspot/share/opto/loopUnswitch.cpp)).
- **Soundness, by reading.** Within one call, the current task's transaction changes only in this method's own blocks (`BaseTask.java:200-221`, `:293-314`); arms inherit it (`:83-86`), and a join restores the current task (`:166-197`).
- **Cost.** About one rung, in the code generator: a hook at every method entry (functions, methods, closures' `apply`, task `compute`).
- **What it clears.** TxArray's 7 checks an element become about 1/8. TxScalar's and TxCell's 2 a step become 1, at the `apply` entry, so about half their share (inferred, not measured). It reaches captured locals, top-level `var`s and fields, but not the store.
- **D2.** Only under (a) is the boolean the whole cost. Under (b) and (c) each plain access still pays the barrier.
- **Peers.** None found that does exactly this. The parallelism review proposed hoisting the check off the element path (section 8, step 4).

### Way 4. Two versions of each method

- **Changes.** Each method gets a plain version, with no checks, and a transactional one, where every access goes to the transaction. A block calls the transactional versions, so no access tests anything. The code generator can write both, doubling each jar, or the class loader can make the second on its first call from a block, as `InstantiatingClassloader` already makes each generic instance (inferred). Calls through a value (closures, the overload dispatchers, generic instances) must find the other version at run time, and Java helpers like the store need two entry points.
- **Cost.** Code up to twice as large for the methods a block reaches. Three to five rungs (inferred). Outside `atomic` the JIT sees the original methods, so inlining improves as in Way 2.
- **What it clears.** Every check outside `atomic`, on all four loops, of every kind, the store's included once it has two entry points.
- **D2.** Under (a), all. Under (b) and (c) the plain versions take the barriers, with no test of the transaction.
- **Peers.**
  - Deuce, a Java STM that also ships NOrec: "In order to avoid any performance penalty for non transactional code, and since Deuce provides weak atomicity, Deuce duplicates each method to provide two distinct versions", at class load, and "the size of the code approximately doubles" (Korland, Shavit and Felber, "Noninvasive concurrency with Java STM", [paper](https://people.csail.mit.edu/shanir/publications/MultiProg-journal.pdf), "Duplicate methods", section 7.1).
  - GCC finds a function's transactional clone through a table at run time (`_ITM_getTMCloneOrIrrevocable`, [libitm/clone.cc](https://gnu.googlesource.com/gcc/+/refs/heads/master/libitm/clone.cc)).

### Way 5. One global switch: no checks until the first `atomic` runs

- **Changes.** Each check site becomes a guard that a block's first start turns off for good: in Java, a `SwitchPoint` behind an `invokedynamic` site. Generated code has no `invokedynamic` today (grep).
- **Cost.** One or two rungs, in the run time and the code generator. Turning the switch recompiles every method that uses it.
- **What it clears.** Every check, the store's included, until any block runs anywhere; then none. The one library has blocks (`FileSupport.fss:152`, `Lazy.fss:60`, `OneShotFlag.fss:18`). microGPT's loaders call `readLine`, not `lines()`, so they likely never reach `FileSupport`'s (`FlatData.fss:69-87`; not traced).
- **D2.** Under (a) only.
- **Peers.**
  - The JDK's contract: "Invalidation cannot be reversed", and the switch acts "as if the switch point contained a volatile boolean variable consulted on every call" ([SwitchPoint](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/lang/invoke/SwitchPoint.html)). That HotSpot compiles a valid switch to no test at all is my reading, not the documented contract.
  - Speculating, and recompiling when wrong, cut strong atomicity's barrier cost to about 10 % in an Intel Java STM (Schneider, Menon, Shpeisman and Adl-Tabatabai, OOPSLA 2008, doi 10.1145/1449955.1449779; abstract only).

### Way 6. A whole-program analysis

- **Changes.** A pass finds which methods can run inside a transaction: those reachable from a block's body, through closures and dispatch. It also finds which variables no such method touches. Elsewhere the checks go.
- **Cost.** The tree compiles each component to its own jar and has no whole-program step. Three or more rungs, plus a points-to analysis for closures (inferred).
- **What it clears.** On the probe's loops, all of them, since nothing there runs in a block. On microGPT, all of them, if no library block is reachable.
- **D2.** Under (b) and (c), its second half (variables no transaction touches) is what removes barriers.
- **Peers.** Shpeisman et al. (PLDI 2007, above) drop the barrier of a plain access to a location that no transaction accesses, found by a whole-program analysis they call NAIT, "not accessed in transaction" (from summaries of the abstract).

### Way 7. A cheaper check (the run time only)

- **Changes.** Read the task once. Make `debug` a `static final boolean`, so the JIT folds it (`BaseTask.java:50`, `:255-263`). Possibly make the task field plain, not `volatile` (`FortressTaskRunner.java:19`), if no other thread reads it. I didn't check that.
- **Cost.** A part of a rung.
- **What it clears.** Some of each check's 1 to 2 ns, on every loop. It never reaches zero.
- **Decisions and D2.** It bends none. Under all three answers it lowers the cost of the test, not of a barrier.

### Way 8. The specification's `io` and `atomic` modifiers

An `io` function never runs in a transaction, and an `atomic` function always does (2.1). So both could compile without checks. Neither is built, and neither touches a numeric kernel. Little gain for microGPT. It bends no decision.

### Way 9. Change the language (listed as such)

- **The change.** Only variables declared transactional are tracked inside `atomic`. Every other variable would no longer revert, and would no longer be isolated. That changes `atomic.tex:36-41` and `:63-67`.
- **Decisions.** It bends P-7 (the revival does not redesign the language), and P-95 (each change to the specification is recorded).
- **Peers.**
  - Haskell: "No STM actions can be performed outside a transaction", and "Only STM actions and pure computation can be performed inside a memory transaction" (Harris, Marlow, Peyton Jones and Herlihy, "Composable memory transactions", PPoPP 2005, section 3.1, [paper](https://www.cs.tufts.edu/~nr/cs257/archive/tim-harris/composable.pdf)).
  - Clojure's refs: "Allowed only in a transaction: ensure ref-set alter commute" ([refs](https://clojure.org/reference/refs)).

References: the citations in each way; `explorations/perf-probes/transactions/REPORT.md`; `explorations/coordinator/FACTS.md`, F-117, F-350, F-358; `explorations/coordinator/POSITIONS.md`, P-7, P-17, P-66, P-95, P-125.

## 4. How they weigh, and how they combine

- **For microGPT.** Way 2 clears the library leaf's 4 to 6 checks an element, where the kernels' variable checks are (by reading). Ways 3 to 6 also clear captured locals, which microGPT's model lines touch once a step. Only Ways 4 to 6 reach the store's per-element check (Way 3 with two store entry points), which is D1's ground as much as this one's.
- **By risk.** Way 2 is local to one method and rests on the specification's undo rule. Way 3 rests on an invariant of the run time (2.3). Ways 4 and 6 are large. Way 5's gain is lost by any program that opens a block.
- **By D2.** Way 2 (for uncaptured locals) and Way 7 stand under every answer. Ways 3, 4 and 5 are complete only under (a). Under (b) or (c) the question becomes "may another thread's transaction touch this?", and Way 1 or Way 6's second half carries it. Weak atomicity is what the peers ship: Deuce says so (Way 4), and X10, a peer the curator named (P-66), runs its blocks under one global lock, which "is only actually compatible with the stop the world semantics if all shared variable accesses are inside an atomic block" (D. Cunningham, [x10-users, 2010-12-07](https://mail-archive.com/x10-users@lists.sourceforge.net/msg01026.html)).
- **They combine.** Ways 2 and 2b go with every other way and take the uncaptured locals out first. Way 3 covers what Way 2 leaves. Way 4 makes Ways 3 and 5 unneeded. Way 7 helps whatever checks remain. Way 1 answers D2 beside any of them.

## 5. What needs measuring first, and when

- **Measured already, so not measured again.** Way 2's gain on TxArray is the probe's pair, 23.17 against 8.39 ns, since every check there is on an uncaptured local (`REPORT.md`, section 1). The shadow kept the bytecode, so removing the sites at compile time may gain more through inlining.
- **Can be measured now, on the compiler's prelude.** The probe's programs compile on `main` today.
  - Way 3's gain on TxScalar and TxCell, by the same pair method.
  - Way 2b's gain on TxArray, beyond the shadow, since 2b removes the cell.
  - Four threads, which the probe didn't run.
- **Only after the switch-over's microGPT slice**, which the curator's order puts first (P-33). No compiled program runs against the one library on `main`: microGPT's 18 components stop at name resolution until the switch-over (F-97), and three small programs ran only in a scratch tree (F-352). Measure then the checks an element in microGPT's kernels, variable checks apart from store checks (by `javap`, as `run.sh` counts them); a shadow pair on one training step; and whether a run opens any transaction, which decides Way 5. The proposed profile of F-358's dot loop should include the checks' share (`reviews/plan-review-2026-11-10.md`, sections 7.3, 7.4).

References: `explorations/coordinator/PLAN.md`, "Where we stand" and "Phase 6. microGPT fast"; FACTS F-97, F-352, F-358; POSITIONS P-33.

## 6. Recommendation (the reviewer's, not a decision)

The answer to the question asked: both. An optimizer step in the code generator removes what can be proved from where the code is written (Way 2). A run-time strategy covers the rest, either asking once per call (Way 3) or keeping two versions of each method (Way 4).

1. **Build Way 2 first, one rung, with its tests at four threads.** It rests on the specification's own rule that a block undoes only what existed before it began. For uncaptured locals it holds whatever D2's answer. It clears TxArray's 64 % and the one library's leaf loop, and needs nothing that the tree lacks. It can land before the switch-over.
2. **Then Way 2b, with decision B,** since an unboxed accumulator needs a JVM slot, not a cell (P-17).
3. **Ask D2 (review-queue item 510) before Way 3.** Way 3 is complete only under weak atomicity. If D2 is (a), build Way 3 for the closures, and Way 7 alongside.
4. **Hold Ways 4, 5 and 6** until microGPT's first compiled profile shows a share left after Ways 2 and 3. Way 4 is the peers' full answer, Deuce's above all, and the class loader is the tree's natural place for it.
5. **Keep Way 9 out.** It changes the language, against P-7.
6. **Take the store's check with D1 (review-queue item 509),** not here.

The decisions on record that bear on this: P-7 (finish the design, don't redesign the language); P-17 and P-84 (unboxed numbers and arrays); P-169 (the transaction tracks the store by array and index); P-125 (the suites run at four threads); P-29 (walk's speed is irrelevant, so walk's checks stay); P-33 (microGPT's slice first); P-175 (a call's arguments fork, which makes more locals captured by task arms, and Way 2 covers those).

**Inferred, not verified:** each rung count; the byte counts per check site; the halving under Way 3; that the peers' compilers checkpoint locals; that HotSpot compiles a valid `SwitchPoint` to no test; whether the task field must be `volatile`.

References: as in the sections above.

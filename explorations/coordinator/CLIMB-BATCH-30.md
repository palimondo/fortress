<!-- The record of climb batch 30, in two runs (climb batch 30 and climb batch 30b), for the coordinating session, the curator and the batch's workers: what climb batch 29b left on the numerals, together with the parallelism review's repairs on the compiled path. Drafted 2026-11-10 by a planning worker on Fable against `main` at `00768e9e96`, whose code is the base build's, `/home/user/fortress-base31` at `9a0f69e01a` (`git diff --stat 9a0f69e01a main -- . ':!explorations'` prints nothing), so climb batch 29b's gate tables (`compile-ladder/climb-batch-29b/gate/`) describe the base. It proposes five rungs: N, P and X in run 1, Y and C in run 2, after run 1 lands. It has one consequential fork, G, the grain size (section 2), which the coordinator took at the planner's default (a) before the launch, to name to the curator (`BOOT.md`, "Running"), and twenty forks with defaults (section 3). No repair in scope needs D1 or D2. -->
<!-- Sources: the curator's go of 07:4x UTC on 2026-11-10, "numeral batch as my go, but together with the parallelism work" (the planner's brief, `<scratchpad>/batch30/planner-brief.md`); the coordinator's sort of climb batch 29b's points (the same brief, "Part 1"); `reviews/batch-29b-review.md`, sections 1 and 2, "Findings", "The steps due before the next batch" and "For the curator"; `reviews/parallelism-foundations-2026-11-08.md`, whole; POSITIONS P-175, P-169, P-84, P-125, P-174, P-176, P-173, P-37, P-12, P-29, P-40 and P-148; FACTS F-19, F-179, F-341 and F-347; the ledger rows 319, 322, 324, 353, 442, 446, 466, 497, 640, 641, 875, 876, 888, 933, 934, 937, 947 to 953, 957, 958, 960, 962, 963, 964, 966, 967, 971, 973 and 974; PLAN's items 74 and 76 to 79 and its phase 6 line on parallel reductions; review-queue items 408, 449 and 487 to 489; the manual `climb-batch-workflow.md`, "Preparing a batch record" and "Before the launch"; the `coordinator` skill's `references/batch.md`; `CLIMB-BATCH-29b.md` for the form and `CLIMB-BATCH-21.md` for two runs of one record; the code at the sites; the specification's sections cited. -->
<!-- The planner's probes: `compile-ladder/plan-30/PROBES.md`, in a worktree of the planner's own, `/home/user/fortress-p30`, seeded from the base build and removed after. No suite and no stage was run: the two reviews' measurements are cited as findings. -->

# Climb batch 30

## 1. The manifest, rung by rung

The batch's generator writes each run's manifest from this section. Each rung's `section` is its section 4 heading, word for word without its backticks. Run 1, climb batch 30, holds N, P and X in that order; run 2, climb batch 30b, holds Y and C. The expected minutes order the scatter only. REC stands for `doc:explorations/coordinator/CLIMB-BATCH-30.md#`, PAR for `doc:explorations/reviews/parallelism-foundations-2026-11-08.md#`, REV for `doc:explorations/reviews/batch-29b-review.md#`, SNAP for `doc:explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md#`, SPEC for `doc:Specification/`, and SRC for `ProjectFortress/src/com/sun/fortress/`. A briefing key marked (check) is also in the rung's `checks` list, which its skeptic, a judge and a repair round read. Every key was checked with `facts-extract.sh --check` on `main` (PROBES, probe 4).

| run | id | slug | title | expected minutes |
|---|---|---|---|---|
| 1 | N | `rung-numeral-leftovers` | The numerals' leftovers under walk, in the prelude and at a program's start | 160 |
| 1 | P | `rung-forked-arguments` | Parallel arms and arguments on the compiled path, and the one library's grain size | 210 |
| 1 | X | `rung-compiled-transaction` | The compiled transaction and its handlers | 210 |
| 2 | Y | `rung-atomic-forms` | `atomic` in its other forms: `tryatomic`, the expression, a stack that is not empty, a mutable field | 200 |
| 2 | C | `rung-numeral-compiled` | The numerals' leftovers in the parser, the checker and the code generator | 160 |

Fields common to the five rungs:

- **path:** `/home/user/fortress-<slug without its rung- prefix>`, as `/home/user/fortress-numeral-leftovers`; **branch:** `wip/<slug>`.
- **writes state:** no. **joins the gate:** none, but the specification's build at the gather of each run, for N's and C's text. **expected moves:** none.
- **lands only with:** none. In each run every rung lands on its own. Y and C are written on run 1's landed tree: Y needs X's handler and transaction, which have then landed.
- **its test is the stage:** no. **the stages:** P and C run the count stage and the distance stage once on their final trees, P because it edits the one library, C because it edits the parser and the checker. N, X and Y run neither and list their files (`STAGE_BLIND`).
- **expected checker count:** none declared; the count stays 0 and the distance 0 with `#crash none`, as climb batch 29b's gate left them. **expected checker crash:** none.

### N
- **slug:** `rung-numeral-leftovers`
- **worktree:** `/home/user/fortress-numeral-leftovers`
- **section:** `N. The numerals' leftovers under walk, in the prelude and at a program's start: an integer numeral at the prelude's RR64 and RR32, a numeral coercion that starts a task, walk's dead field-numeral code, and rows 958, 967 and 974 (P-174, P-176, P-173, P-37)`
- **blurb:** what climb batch 29b left on the numerals outside the parser, the checker and the code generator: the prelude's RR64 and RR32 gain the coercion from NaturalNumeral over n, r and v, so that x: RR64 = 3 compiles as it runs under walk (row 442's numeral half, P-37's exception); a compiled program's component class is initialized inside a root task on a pool of one thread of its own, so that a numeral coercion whose body starts a task fills its place when the class loads (row 971, P-176), and an imported component's class the same way where that way reaches it (row 979); walk's dead code of the field numerals is deleted in the places the post-batch review lists; row 960's reproducer is written again over the four numbers; under walk a float numeral left of an RR32 operand runs RR32's operator (row 958), a numeral that rounds to an infinity is refused when its place runs (row 967), and a numeral type written as an extended type or a static argument is refused at load (row 974); the Appendix I effects that name these rows are brought in line.
- **points to report:**
  - The two coercions as written, the constant each folds to at your test numerals, and whether the fold needed a change.
  - Every test whose verdict or pinned message changed because `RR64` and `RR32` now take an integer numeral, with its line before and after; every line of a team test changed.
  - Where the component class is now initialized, on which pool and inside which task, and each existing test whose output or order changed with it; whether `runtimeSystem/BaseTask.java` had to change (it is P's and X's).
  - Row 979: repaired by the same way or left open, with the test's failing and passing runs under `timeout`; if left open, the way that it needs.
  - Each piece of walk's field-numeral code deleted, and each left with its reason.
  - Row 974: built or not, and why; the message.
  - Each sentence of the specification changed, before and after; each sentence your change makes false that this section does not name.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
  - A step that would change walk's rule that a declaration that fits a numeral as it is runs before one that converts it, which is reserved.
- **briefing** (25 keys, 17 checks):
  - P-174 (check): the numeral types, every number type's coercion generic over the four numbers, a numeral type written only as a parameter's type.
  - P-176 (check): one value per place, filled when the class loads; row 971 is where the tree departs.
  - P-173 (check): where a numeral converts, the refusal of one outside its type's range, the default; the specification names the one that rounds to an infinity.
  - P-37 (check): the prelude's exception for the numerals, under which the two coercions fall.
  - P-12: walk refuses when a place runs, until it runs the checker.
  - ledger:442 (check): the prelude's gaps; its numeral half closes, the rest stays.
  - ledger:971 (check): the coercion that starts a task, which closes.
  - ledger:979 (check): the same hang in an imported component, which closes if the same way reaches it.
  - ledger:958 (check): the float numeral left of an RR32, which closes.
  - ledger:967 (check): the numeral that rounds to an infinity under walk, which closes.
  - ledger:974 (check): the numeral type written under walk, which closes if step 7 lands.
  - ledger:960: the leading zeros; its reproducer is yours, its repair rung C's.
  - ledger:973: the number and the numeral at =, which is not yours and whose test you leave.
  - REV `1. Fidelity` (check): the eight places of the field numerals' code, and the library types' own ways.
  - REV `2. The two paths` (check): where the two paths still answer differently.
  - REV `Findings`: findings 1 and 2, with the ways and the recommended ones.
  - SNAP `3. The design` (check): the design in the curator's confirmed words.
  - SNAP `4. What it is not`: the field numerals, whose remains you delete.
  - `code:ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java#public static void main` (check): where the component class is loaded and initialized.
  - `code:ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java#public final void forkIfProfitable`: the fork that a class initializer reaches, which you read and do not change.
  - `doc:explorations/coordinator/climb-batch-30-review.md#3.1 Row 971` (check): the prototype of both pools, the hang's thread dump, the two copies of the run time's classes, and row 979's three sources.
  - `map:modules-and-phases.md#B.11 The runtime`: the compiled run time, its pool and its class loader.
  - `map:modules-and-phases.md#B.8 The interpreter tail`: how walk runs a program after the phases.
  - REC `The planner's probes` (check): row 971's stack, by the planner's run.
  - REC `Forks the batch takes` (check): the defaults you build.

### P
- **slug:** `rung-forked-arguments`
- **worktree:** `/home/user/fortress-forked-arguments`
- **section:** `P. Parallel arms and arguments on the compiled path: every forked arm joined before a group completes abruptly, a task arm's locals and trailing block, a call's arguments forked where the analyzer judges them worth a task, and the one library's parallel range stopped at a grain size (P-175)`
- **blurb:** P-175 on the compiled path and in the one library: a group of forked arms joins every arm that it forked before it completes abruptly, whichever arm throws (row 947); a task arm reserves the slot of its own object and keeps nothing on the operand stack across its body, so a local, a typecase, a try or an atomic block in an arm verifies (row 497, row 322's arm case); a call's arguments, a function's and a method's, fork where ParallelismAnalyzer judges them worth a task, as a tuple's elements do (row 951); the one library's parallel range stops its split at a grain size and runs each chunk by the sequential range's own methods, tested under walk, its measurement on compiled reductions left for after the switch-over.
- **points to report:**
  - The handler as built: where it is registered, which arms it joins, which exception leaves the group, and what an arm that was never forked does.
  - Each node kind whose arguments now fork, and each change to `ParallelismAnalyzer`, with the calls it newly judges worth a task.
  - Whether the prelude's `gen` forks its two halves, with the analyzer's reason, and the test or the note that follows.
  - Every existing test that failed once arguments fork, with its cause: a test written wrong and repaired, or a defect and its row. Every line of a team test changed.
  - Row 322: closed, or rewritten to what remains, with the reproduction.
  - The grain: its constant, its value and where it is declared; the other parallel generators of `Library/RangeInternals.fss` that still split to single elements, listed and not changed.
  - The count and distance tables on your final tree, the commit they ran on, and their seconds.
  - A file edited beyond those named; a line of `runtimeSystem/BaseTask.java` below `joinOrRun`, which is X's.
- **briefing** (24 keys, 15 checks):
  - P-175 (check): the decision you build: forked arguments, the grain size, every arm joined.
  - F-19 (check): what may run in parallel, and what each path forks today.
  - ledger:947 (check): the group that does not wait, which closes.
  - ledger:951 (check): the arguments in order, which closes.
  - ledger:497 (check): the arm's local in slot 0, which closes.
  - ledger:322 (check): the atomic block that ends an arm; its arm case is yours.
  - ledger:640: the deep recursion of forked operands, which forked arguments widen.
  - ledger:876: the current task after an arm run in place, which you leave.
  - PAR `1.3 Compiled: tasks` (check): the pool, the tasks and the arms as the code has them.
  - PAR `1.7 ParallelismAnalyzer` (check): the analyzer's rule and its defects.
  - PAR `1.8 Library` (check): the one library's range and the prelude's parloop.
  - PAR `1.1 Walk: tasks`: walk's group, which joins every arm: the precedent.
  - PAR `5. The JVM side`: publication by fork and join, and what an arm left running breaks.
  - SPEC `basic/evaluation/parallelism.tex#Threads and Parallelism` (check): when a group completes abruptly.
  - SPEC `basic/expressions/also.tex#Parallel Do Expressions`: the arms of a parallel do.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private void genParallelExprs` (check): the fork and the joins.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private void evalArg` (check): the arguments in order.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private void generateTaskCompute`: an arm's method.
  - `code:ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java#public final void joinOrRun`: the join, with the current task saved and restored.
  - `code:Library/RangeInternals.fss#object CompactFullParScalarRange` (check): the parallel range's split.
  - `code:Library/RangeInternals.fss#object CompactFullSeqScalarRange` (check): the sequential range, the library's own way for a chunk.
  - `map:compile-path-walkthrough.md#5. Code generation`: how the code generator walks the tree.
  - `map:modules-and-phases.md#B.11 The runtime`: the compiled run time.
  - REC `Forks the batch takes` (check): the defaults you build.

### X
- **slug:** `rung-compiled-transaction`
- **worktree:** `/home/user/fortress-compiled-transaction`
- **section:** `X. The compiled transaction: a block's own writes, the sets that a block's threads share, a nested block's view, two initializations of one element, the handlers of nested blocks and of nested try, and an exception out of a block (P-169)`
- **blurb:** the compiled path's atomic block made to hold what the specification's atomic expression asks, in the transaction and in the block's generated handler: a read of a block's own or an ancestor's write is not checked against the committed value, so a block that reads what it wrote ends (row 933); the handler of a nested block, and of a nested try, is taken before the outer one's (rows 934, 937 and 888); a nested block's validation covers its ancestors' reads, and an abort restarts the block whose read failed (row 950); the read and write sets that a block's threads share are guarded (row 949); the first read of an empty element is recorded, so of two transactions that initialize one element only one succeeds (row 466's note); an exception that leaves a block discards the block's writes (row 324).
- **points to report:**
  - Each of the six repairs as built, by declaration, and the order in which a nested abort now finds its handler.
  - What a read of an own write and of an ancestor's write records; what a nested commit hands its parent.
  - The guard of the shared sets, and what it costs an uncontended block, by reading.
  - Each test with its failing run, 933's under `timeout`, and its passing runs at one thread and at four; the fourteen atomic programs' runs on your final tree.
  - Whether an exception that is not a Fortress exception leaves a block the same way.
  - Each sentence of the specification that your change makes false, or none.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named; a line of `runtimeSystem/BaseTask.java` above `startTransaction`, or of `CodeGen.genParallelExprs`, which are P's.
- **briefing** (25 keys, 17 checks):
  - P-169 (check): the compiled store and the transaction's slots, the shape your work stays within.
  - ledger:933 (check): the block that never ends, which closes.
  - ledger:934 (check): the nested block's abort at the outer handler, which closes.
  - ledger:937 (check): the nested abort that reruns the outer block, which closes.
  - ledger:888 (check): the nested try, the same order of handlers, which closes.
  - ledger:324 (check): the exception that leaves the writes, which closes.
  - ledger:949 (check): the shared read set, which closes.
  - ledger:950 (check): the nested block's view, which closes.
  - ledger:466 (check): the element initialized twice; its sentence on two transactions is yours.
  - ledger:948: plain writes beside a block, which is not yours.
  - ledger:641: the check before every access, which you leave as it is.
  - PAR `1.4 Compiled: the STM` (check): the algorithm as the code has it.
  - PAR `1.5 Compiled: arrays`: the stores inside a transaction.
  - PAR `1.6 The code generator` (check): the block's handler and its gaps.
  - PAR `1.2 Walk: the STM`: walk's transaction, the reference for the semantics.
  - PAR `3.2 Targeted programs` (check): the review's programs and their results, your tests' models.
  - PAR `4. Design`: what the specification defines, and what each path does.
  - PAR `7.2 Known rows` (check): row 933's wider mechanism, and the rows confirmed.
  - SPEC `basic/expressions/atomic.tex#Atomic Expressions` (check): the atomic expression.
  - SPEC `advanced/parallelism-locality/transactions.tex#Abortable Atomicity`: abort.
  - SPEC `basic/expressions/try.tex#Try Expressions`: the try expression.
  - `code:ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java#private Any TXReadLocation..public void TXCommit` (check): the read, the validation and the commit.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x)` (check): the block's code and its handler.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java#public boolean init`: the store's init.
  - REC `Forks the batch takes` (check): the defaults you build.

### Y
- **slug:** `rung-atomic-forms`
- **worktree:** `/home/user/fortress-atomic-forms`
- **section:** `Y. atomic in its other forms: tryatomic on both paths, atomic as an expression, an atomic block on a stack that is not empty, and a mutable field inside a transaction`
- **blurb:** on run 1's landed transaction and handler: the code generator compiles an atomic expression (row 875) and a tryatomic expression, which runs its body once in a transaction and throws TryAtomicFailure where that transaction aborts (row 353); under walk a tryatomic inside an atomic block runs in a nested transaction of its own (row 952); an atomic block or a try where the operand stack is not empty verifies, if the planner's reading reproduces (row 322's remainder); a mutable field of an object is read and written through the transaction inside an atomic block, an immutable field unchanged (row 319).
- **points to report:**
  - `tryatomic` on each path as built: what a nested one does, and each line of `tests/nestedTransactions3.fss` and `tests/tryatomicTest.fss` changed, before and after.
  - Row 322's remainder: reproduced or not, and what was built.
  - A mutable field as built: what the object holds, the code at a read and a write inside and outside a block, and the bytecode of an immutable field's read before and after.
  - Each test with its failing and passing runs at one thread and at four.
  - Each sentence of the specification that your change makes false, or none.
  - The files you edited, for `STAGE_BLIND`; a file edited beyond those named.
- **briefing** (17 keys, 12 checks):
  - ledger:353 (check): the tryatomic that does not compile, which closes.
  - ledger:875 (check): the atomic expression that does not compile, which closes.
  - ledger:952 (check): walk's tryatomic inside a block, which closes.
  - ledger:319 (check): the mutable field outside the transaction, which closes.
  - ledger:322 (check): the atomic block on a stack that is not empty, after rung P's arm case.
  - ledger:641: what a check before every access costs.
  - PAR `1.6 The code generator` (check): the block's code and its gaps.
  - PAR `1.4 Compiled: the STM`: the transaction, as run 1 left it changed.
  - PAR `1.2 Walk: the STM`: walk's transaction and its tryatomic.
  - SPEC `basic/expressions/atomic.tex#Atomic Expressions` (check): atomic and tryatomic.
  - SPEC `advanced/parallelism-locality/transactions.tex#Abortable Atomicity` (check): abort and tryatomic.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java#public FValue forTryAtomicExpr` (check): walk's tryatomic.
  - `code:ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java#public FValue forAtomicExpr`: walk's atomic, the precedent.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java#public static class MutableFieldVar` (check): a field's read and write.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#public void forAtomicBlock(Block x)`: the block's code, as run 1 left it changed.
  - REC `X. The compiled transaction` (check): what rung X built, which you build on.
  - REC `Forks the batch takes` (check): the defaults you build.

### C
- **slug:** `rung-numeral-compiled`
- **worktree:** `/home/user/fortress-numeral-compiled`
- **section:** `C. The numerals' leftovers in the parser, the checker and the code generator: a radix-point numeral's leading zeros, a numeral as a typecase's selector, and a numeral at a place whose type names a type parameter (P-173, P-174, P-176)`
- **blurb:** a numeral with a radix point keeps its leading zeros in its digit count on both paths, as the Working Draft counts them (row 960); the compiled checker gives a numeral that is a typecase's selector its default type, as walk does (row 963); at a place whose type names a type parameter of its generic declaration a numeral is one value for each instance, made when that instance's class loads (row 957); the Appendix I effects that name the three rows are brought in line.
- **points to report:**
  - Where the leading zeros are kept, and every test whose output changed with them.
  - The selector's type as built, and each line of `XXX5r.test` and `XXXPatternMatchingc.test` changed, before and after; every other team test line changed.
  - Row 957: built or not, the field's home and when it is filled.
  - The count and distance tables on your final tree, the commit they ran on, their seconds, and P-148's runs for your checker edit.
  - Each sentence of the specification changed, before and after.
  - A file edited beyond those named.
- **briefing** (15 keys, 10 checks):
  - P-173 (check): the default where nothing fixes a type.
  - P-174 (check): the four numbers, the digit count among them.
  - P-176 (check): one value per place, and per instance where the place's type names a type parameter.
  - P-148 (check): the checker's timing for your edit.
  - ledger:960 (check): the leading zeros, which closes.
  - ledger:963 (check): the selector's type, which closes.
  - ledger:964: the code generator's stop that a reachable clause then meets.
  - ledger:957 (check): the place at a type parameter, which closes.
  - REV `1. Fidelity`: the code generator's and the checker's numerals as landed.
  - REV `2. The two paths` (check): the differences that stand.
  - SNAP `3. The design` (check): the design in the curator's confirmed words.
  - `code:ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java#private String numeralCoercionSiteDesc` (check): which places get a field.
  - `map:compile-path-walkthrough.md#6. The run`: the class loader that makes an instance's class.
  - `map:modules-and-phases.md#B.6 Type checking`: the checker's place in the phases.
  - REC `Forks the batch takes`: the defaults you build.

## 2. For the curator

### The words this record uses

- **Walk** is the interpreter. The **compiled path** checks types with the **checker**, then makes JVM bytecode with the **code generator**; its **run time** holds the tasks and the transactions. Until the **switch-over** it uses its own small library, the **prelude**; after it, the **one library**, which only walk runs today.
- A **task** is a piece of work handed to the pool of worker threads. To **fork** it is to hand it over, to **join** it is to wait for it. A **group** is the arms of a `do … also` block, the elements of a tuple or the arguments of a call, forked together. A group **completes abruptly** when an arm throws.
- A **transaction** runs an `atomic` block: its reads and writes take effect together at its **commit**, or it **aborts** and the block runs again. A **nested** block is an `atomic` block inside another.
- The **grain size** is the number of elements at which a parallel range stops splitting and runs the rest in sequence.
- The **static numerals** are his design, which climb batch 29b built (P-174, P-176). The **four numbers** are a numeral's digit count, digits after the point, radix and digits read as one integer. A **place** is where a numeral is written.
- **D1** and **D2** are the parallelism review's two questions that are his and are not yet asked: arrays of unboxed numbers inside `atomic`, and strong atomicity on the compiled path.
- A **rung** is one change, built by one worker and checked by a skeptic; a **run** is one launch of the batch workflow; the **gather** composes a run's rungs; a **guard** is a test that passes before the change and after it. The **atomic runs** are the gate's compiled programs that run three times each at four threads.
- **microGPT** is the model program. No rung changes a line of it, and its quick checks under walk stay 7 of 7 for both programs.

### The one question before the launch

**Taken by the coordinator at way (a), before the launch** (`BOOT.md`, "Running": "P-175 and his go of today cover it, by the coordinator's reading"). It can be undone, so it lands, is named to you at the landing and goes on the review list with its default. The question as the planner put it:

**Fork G, the grain size: is it built now, with a value that cannot be measured yet?** P-175 has the one library's parallel range stop its split at a grain size, and your go of today brings the parallelism work forward. Two facts bear on it:

- Only walk runs the one library today. The value is to be measured on compiled reductions at one and four threads (P-29; PLAN's phase 6 line), and no compiled program reaches that range before the switch-over. So a value chosen now is provisional.
- A chunk run in sequence joins its elements in another order than today's tree of single elements. Under walk microGPT's reductions then round differently in their last bits. The planner tried a grain of 16: both quick checks stay 7 of 7, and the losses move by at most 4.4e-16 against a tolerance of 1e-12 (PROBES, probe 2).

The ways:

- **(a) Built now, in rung P:** the split stops at a named constant, 16 for now, and each chunk runs by the sequential range's own methods. It is tested under walk. The value is measured and set in the first batch after the switch-over. Cost: walk's microGPT numbers change in their last bits now, and once more if the measured value differs.
- **(b) Left to the first batch after the switch-over,** where PLAN had it, with its measurement. Rung P then builds the forked arguments and the joins only, and nothing changes under walk. Cost: after the switch-over the compiled path splits every parallel loop to single elements until that batch lands.

**Recommended: (a).** Its reason: P-175 is decided, the mechanism does not depend on the value, and a later change of one constant is small. The record is written for (a); for (b), step 5 of rung P's section is struck and nothing else changes.

### The scope: two runs, five rungs

**Run 1, climb batch 30:**

- **N**, the numerals' leftovers outside the compiler: `x: RR64 = 3` compiled, the coercion that starts a task, walk's dead code and three walk rows.
- **P**, parallel arms and arguments on the compiled path, and the grain size.
- **X**, the compiled transaction and the handlers of nested blocks.

**Run 2, climb batch 30b,** after run 1 lands:

- **Y**, `atomic` in its other forms, and a mutable field inside a transaction.
- **C**, the numerals' leftovers in the parser, the checker and the code generator.

**Why two runs.** The parallelism review's rows on `atomic` meet in one declaration, the code generator's `forAtomicBlock`, and in one class, `runtimeSystem/Transaction.java`. One worker cannot hold all eleven rows. Two workers in one run would edit the same declaration, which the gather cannot merge. So X repairs the transaction and the block's handler first, and Y builds the other forms on X's landed code. C goes with Y because run 1 already has three rungs in `CodeGen.java`.

**Why this order.** X's and P's repairs are what the review puts first (its section 8). Y cannot be written before X's handler exists. N holds the two numeral points that meet every program, findings 1 and 2 of climb batch 29b's review.

**Why these cuts in run 1.** Each rung owns whole declarations:

- N: the prelude's `RR64` and `RR32`, `MainWrapper.main`, walk's numeral classes.
- P: `CodeGen.genParallelExprs`, `evalArg` and `generateTaskCompute`, `ParallelismAnalyzer`, the task half of `BaseTask`, the one library's parallel range.
- X: `Transaction`, `CodeGen.forAtomicBlock` and `forTry`, the transaction half of `BaseTask`, the store's `init`.

P and X share two files, `CodeGen.java` and `BaseTask.java`, in declarations that lie apart; section 4, "The rule the rungs keep", says where each rung puts a new member.

### Where each piece of the parallelism work is tested today

On 2026-11-08 you placed the forked arguments and the grain size in the first batch after the switch-over, and N1 in the batch before theirs (P-175's history, its block of 23:47Z; PLAN's phase 6 line on parallel reductions). Your go of today brings them forward. Before the switch-over the compiled path runs the prelude, so:

| piece | its test today | what waits for the switch-over |
|---|---|---|
| every arm joined (row 947) | compiled, a program's own `do … also` | nothing |
| a task arm's locals and trailing block (rows 497, 322) | compiled | nothing |
| a call's arguments forked (row 951) | compiled, a program's own functions as the arguments | the reductions of the one library's range, `red.join(loop'(…), loop'(…))`; whether the prelude's own `gen` forks is rung P's to report, and the prelude is not changed for it |
| the grain size (P-175) | walk, on the one library | its measurement on compiled reductions at one and four threads, and its value |
| the transaction's repairs (rows 933, 934, 937, 949, 950, 324) | compiled, on mutable variables | the same on array elements, which a compiled program reaches only through the one library |
| two initializations of one element (row 466's note) | a Java test of the store, `ArrayStoreJUTest` | a compiled program |
| `tryatomic`, the atomic expression, a mutable field (rows 353, 875, 319) | compiled; `tryatomic` under walk too (row 952) | `Library/OneShotFlag.fss` compiled, row 875's own site |

### The atomic runs

The gate's atomic runs and the suites run at four threads (P-125). Every new compiled test of P, X and Y is an ordinary test of `compiler_tests/`, so the suites run it once at four threads. These join the atomic runs, three runs each at four threads, each printing `PASS` or `FAIL`:

- **Run 1:** `AlsoArmThrowsJoinsCompiled` and `CallArgumentsForkCompiled` (P); `AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled` and `AtomicThrowRevertsCompiled` (X). The fourteen become twenty-two.
- **Run 2:** `TryAtomicCompiled`, `AtomicExprCompiled` and `AtomicFieldCompiled` (Y). Twenty-five.

The list is in the batch script (`climb-batch-workflow.js`, `ATOMIC_OTHER` and the list beside it), which the coordinator edits before each run. The atomic runs stop a run at 120 s, so they are also the gate's guard against row 933's block that never ends, which the suites' run step cannot stop.

### The forks he may want to see

Besides fork G, none of section 3's forks is consequential by the `coordinator` skill's rule, and none bends a decision of his. Each lands with its default and goes on the review list. Four that a reader of his words may want first:

- **Fork P2, which arguments fork.** P-175 says "where `ParallelismAnalyzer` judges them worth a task". The analyzer's judgement stays as it is. It counts every call of a named function as worth a task, by a defect the review found by reading. So most calls with two or more calls among their arguments will fork at four threads.
- **Fork X3, an abort names its transaction.** When a nested block finds that a read of its outer block is stale, the outer block must start again, not the nested one. The abort carries the transaction whose read failed, and a block's handler restarts only its own.
- **Fork Y1, `tryatomic` inside `atomic` under walk.** The review listed row 952 under "Can wait". It is in run 2 because it is small, shares no file with another rung, and the compiled `tryatomic` of the same rung should do what walk does. It changes the team's test `tests/nestedTransactions3.fss`, which asserts the old behaviour under the team's own comment "Why is this? It seems inconsistent with the rest of our transaction story."
- **Fork Y2, a mutable field inside a transaction.** A `var` field is kept in a cell, as a top-level `var` is, and pays the check before each access that every mutable variable pays (row 641, 1 to 2 ns). An immutable field is unchanged. Neither microGPT program declares a `var` field.

### The team's lines this batch changes

Known before the run, each reported by its rung with its before and after:

- `tests/nestedTransactions3.fss`, its assertion of a flattened `tryatomic` (Y).
- `compiler_tests/XXX5r.test`, the pinned span of its unreachable clauses, and `compiler_tests/XXXPatternMatchingc.test`, whose clause becomes reachable (C; row 963's note).
- Any team test whose pinned checker message or verdict changes once `RR64` takes an integer numeral (N), or once a call's arguments fork (P): each rung lists them.

### What the batch leaves out

- **A number `=` a numeral (rows 973 and 966, item 487).** Not planned here: the ways review `reviews/numeral-equality-ways-2026-11-10.md` runs beside this record. A later rung on it would share these files with this batch's rungs:
  - with N: walk's `interpreter/evaluator/values/OverloadedFunction.java`, `Coercions.java` and `Numerals.java`, where N deletes dead code and repairs row 958; and the Effect of Appendix I's `revival-numerals` (`Specification/appendices/changes.tex:5247-5310`), which names rows 973 and 966 beside N's rows;
  - with C: the same Effect, and `scala_src/typechecker/impls/` if the ways review changes the checker;
  - with no rung: the tests `tests/XXXNumeralEqualsNumberWalk.fss` and `tests/XXXNotEqualNumeral.fss`, which no rung of this batch touches.
  So such a rung runs after run 1 has landed: in run 2 beside C, or later.
- **Row 962,** a size of 2^31 or more read as a value: CONTESTED, its question open (refused at the load, an `IntegerOverflow`, or not a `ZZ32`). Not well defined.
- **Row 446,** a sized arm reached with no size: both paths fail, with different messages; the repair is a rule for dispatch that no decision gives. Not well defined.
- **D1 and D2** (rows 953 and 948): his, not asked. No rung needs either.
- **A contention policy** (backoff on, or a bound on retries): the review puts it after D2, and no default is on record.
- **What the review lists under "Can wait"**, but row 952: walk's costs, the dead `ReadSet` copy and `FException`'s map (found by reading, no program shows them, so no test can come first), `spawn` (rows 82 and 938), the statistics' tally, sharedness and regions.
- **Row 876,** the current task after an arm run in place: CONTESTED, about `drandom`.
- **Row 442's other half:** a `ZZ32` value into `RR64` and the prelude's other missing operations close at the switch-over (P-37).
- **The analyzer's defect** that every named call counts as worth a task (the review's section 7.3): no row, found by reading; on the review list with fork P2.

### Before the batch runs

- **Fork G:** taken by the coordinator at way (a); no answer of his is waited for.
- **The Fable review of this record** (`references/batch.md`, "The go").
- **The manifest's generator,** `compile-ladder/plan-30/manifest/`, made by the coordinator from `plan-29b/manifest/` with this record's values, for two runs as `plan-21/manifest/` did (section 6).
- **The script's list of atomic programs,** with run 1's eight names; run 2's three before run 2.
- **The base build:** `/home/user/fortress-base31` at `9a0f69e01a`, built, clean and marked by `.base-ready` (PROBES, probe 1). Run 1's base is `main`'s head at the launch; while `main` changes only under `explorations/`, its code is the base build's. Run 2 needs a base build of its own at run 1's landing.
- **The disk.** The script stops under 1.5 G a rung plus 4 G: 8.5 G for run 1's three rungs, 7 G for run 2's two. Free at 08:2x UTC on 2026-11-10: 18,590,548 KB by `df -P /home/user`, about 17.7 G (PROBES, probe 5). At about 1.5 G a rung with whole suites, run 1 uses about 4.5 G.

### Cost

- **Run 1, about 5.5M tokens written, from 4.4M to 7.0M; about 7 hours at two agents at a time.**
  - Workers, about 2.4M: N 0.6M, P 0.9M, X 0.9M.
  - Skeptics, about 1.35M: N 0.35M, P 0.5M, X 0.5M.
  - The fixed roles, about 1.25M: the disk check, the gather with three rungs, one specification build and the demos, the merged-diff review, the gate with twenty-two atomic programs, the commit stage.
  - A judge and a repair round, about 0.5M.
  - Minutes: N 160, P 210, X 210. The critical path: P's or X's worker 210, its skeptic about 70, the gather about 45, the review beside the gate about 55, the commit stage about 15.
- **Run 2, about 3.8M, from 3.1M to 5.0M; about 5 hours 30 minutes.**
  - Workers, about 1.5M: Y 0.9M, C 0.6M. Skeptics, about 0.85M: Y 0.5M, C 0.35M, which runs the count stage itself since C edits the checker. The fixed roles, about 1.1M. A judge and a repair round, about 0.4M.
  - Minutes: Y 200, C 160.
- **The evidence.** Climb batch 29b's two rungs and fixed roles wrote 3.25M, 23 % under their estimate (`reviews/batch-29b-review.md`, title and section 5). Climb batch 29 wrote 7.54M for six rungs: workers 354K to 658K, skeptics 259K to 512K, the gather 548K, the review 467K, the gate 137K, the commit 131K (`reviews/batch-29-review.md`, section 3). This week every agent runs on Fable at medium effort (`FABLE_WEEK`), as climb batch 29b's did.

## 3. The forks, with their defaults

**Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of his; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.

### The consequential fork

**G, the grain size now or after the switch-over:** section 2, "The one question before the launch". It is consequential because way (a) changes microGPT's numbers under walk in their last bits and sets a constant that he asked to be right, and no measurement can choose its value yet. Default for the record: (a), a named constant of 16, each chunk run by the sequential range's own methods. The coordinator took (a) before the launch, as a decision that can be undone: it is named to the curator at the landing and goes on the review list.

### Forks the batch takes

None of the forks below is consequential: each builds within a decision on record, the coordinator's sort or the review's repair order, or chooses where they leave an implementation open, and each can be undone.

1. **B1. One record, two runs.** Run 1 is N, P and X; run 2 is Y and C on run 1's landed tree. **Default: so.** Way not taken: one run of five rungs, in which X and Y would edit `CodeGen.forAtomicBlock` together. The reason: `references/batch.md`, "The go": a piece waits only where the gather cannot merge it.

2. **B2. The new compiled tests of P, X and Y join the atomic runs.** **Default: the eleven names of section 2, "The atomic runs".** Way not taken: the suites alone, one run each. The reason: each test is of a race or of a block that may not end; three runs at four threads find more, and the atomic runs have a time limit.

3. **N1. Row 971: the component class is initialized inside a root task, on a pool of one thread of its own.** The sort's repair starts the task pool before the program's classes load. The planner's run shows that the pool's existence is not enough: the cast fails because the class initializer runs on the JVM's main thread (PROBES, probe 3). **Default: `MainWrapper.main` hands the load and initialization of the component class to a pool of one thread of its own, and waits for it. The class is initialized inside a root `BaseTask` that has set itself as the thread's task, and the pool and the task are the class loader's copies of the run time's classes, reached through `MainWrapper.icl`; `BaseTask` is not changed.** What a program sees: the same output in the same order and the same exit code; where a coercion raises, the first line of the error output can differ by the words "Exception in thread"; the arms of a group run one after another while the class initializes, which the specification allows (`parallelism.tex:89-90`). The evidence (`climb-batch-30-review.md`, section 3.1): a prototype of the planner's way hung in 12 of 12 runs of row 971's reproducer at four threads, and this way passed 12 of 12 runs, of the reproducer and of one with a slow arm. The same hang exists on the base for a place in an imported component (row 979): rung N repairs it where this way reaches it, and else the row stays open. Ways not taken: (i) the planner's way, the class initialized on a thread of the program's task pool of four threads: a worker steals the task that the initializer forked, calls a function of the class and waits for its initialization, while the initializer waits for the task; (ii) `BaseTask.getCurrentTask` answering for a thread outside the pool, which edits P's and X's file and leaves the coercion's tasks without a parent; (iii) numeral coercions compiled without the analyzer's spawns, the post-batch review's way (b), which the sort did not take and which does not reach a spawn inside a function that the coercion calls. The fork is the coordinator's, taken on the check before the launch: it lands, and is then reviewed. The reason: the sort, the prototype, and the team's comment at the load, "so that there is a task pool before any user code is run".

4. **N2. Row 442: two coercions, and no other declaration.** `RR64` and `RR32` of the prelude gain `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])`, with a body over the prelude's own natives, as their radix-point coercions have. **Default: so; a `ZZ32` value into `RR64` and the prelude's other gaps stay for the switch-over.** The reason: the sort; P-37's exception covers the numerals only.

5. **N3. Row 974: walk refuses the two written forms at load.** A numeral type written as a type that an object or a trait extends, or as a static argument, is refused when the component loads, with the checker's message. **Default: built last, if it fits; else the row stays.** Way not taken: left until walk runs the checker (P-12). The reason: the post-batch review counts it among the differences that stand, and walk has load checks of this kind.

6. **N4. Row 960 is split.** N writes its reproducer again, over the four numbers; C repairs it in the parser. **Default: so.** The reason: the vacuous test is walk's and is on the sort's list for now; the parser's edit changes what the count stage reads, and C runs the stages anyway.

7. **P1. A group that completes abruptly joins every arm it forked, then throws the first exception in the arms' order.** An arm that was never forked is not run. **Default: so.** The reason: `parallelism.tex`, "Threads and Parallelism": a group completes abruptly only after each thread has completed, not run, or ended early; walk rethrows the first recorded exception after `invokeAll` (`interpreter/evaluator/Evaluator.java:239-283`).

8. **P2. The analyzer's judgement is kept as it is.** A call's argument tuple forks where the analyzer already marks it worth a task; the analyzer gains only what a method call's arguments need to be judged as a function call's are. Its defect that every named call counts (the review's section 7.3) is not repaired. **Default: so.** Way not taken: repairing the defect, which would change which tuples and operators fork today. The reason: P-175's words.

9. **P3. The prelude is not changed to make its reductions fork.** If the analyzer does not judge the prelude's `gen` halves worth a task, the compiled reduction stays sequential until the switch-over, and P's test is of a program's own functions. **Default: so.** The reason: a limit of the prelude that ends at the switch-over is not repaired in the prelude (`fortress-repo`, `revival-changes.md`).

10. **P4. Rows 497 and 322's arm case go with the forked arguments.** Once arguments fork, an argument that declares a local, or is a `typecase`, a `try` or an `atomic` block, becomes a task arm, where today it fails verification. **Default: repaired in `generateTaskCompute`, before step 4.** The reason: without it, forked arguments turn working programs into classes that do not verify.

11. **X1. A read of an own or an ancestor's write is not validated against the committed value.** **Default: a read of the transaction's own write records nothing; a read of an ancestor's write is checked against that ancestor's write.** The reason: row 933's mechanism, and the review's rewrite of the row.

12. **X2. The sets that a block's threads share stay shared, under a lock.** **Default: validation, commit and the merge into a parent hold the set's lock while they iterate.** Way not taken: a log for each task, merged at the join, the review's other way, which is a larger design. The reason: the specification has a block's threads "see one another's writes" (`atomic.tex`).

13. **X3. An abort carries the transaction whose read failed, and a block's handler restarts only its own transaction.** A nested block that finds an ancestor's read stale ends its own transaction and passes the abort outward. **Default: so.** The reason: with rows 934 and 937 repaired, the nested block's handler comes first; without this, row 950's repair would restart the nested block forever.

14. **X4. Row 933's test is an ordinary compiled test, seen failing under `timeout`.** The suites' run step has no time limit (`tests/unit_tests/FileTests.java:585`). **Default: the test lands in `compiler_tests/` and in the atomic runs; a time limit for the run step is not built here.** The reason: a harness change is the coordinator's, between batches.

15. **X5. The store's `init` is tested in Java.** **Default: a case of `ArrayStoreJUTest` in the review's form, two tasks on a pool of four.** The reason: no compiled program reaches the store before the switch-over (the review's decision 2).

16. **Y1. `tryatomic` runs its body once in a transaction of its own, nested where a transaction is open, on both paths.** **Default: so; row 952 with row 353.** The reason: `atomic.tex`: `tryatomic` acts as `atomic` does, but throws where the transaction aborts.

17. **Y2. A `var` field is kept in a cell, as a top-level `var` is.** The code generator tells a `var` field from an immutable one, the team's TODO at the site, and only the first goes through the transaction. **Default: so.** Way not taken: a location keyed by the object and the field, as the array store's slots are. The reason: the code's own way for a mutable variable; it needs no new kind of location in the transaction.

18. **Y3. Row 322's remainder is built only if it reproduces.** The row says by reading that an `atomic` block is wrong as a call's argument after the first. **Default: reproduced first; then repaired where the block's code assumes an empty stack, or the row rewritten.**

19. **C1. Row 957: one static final in each instance's class.** **Default: climb batch 29b's fork A5, built.** The reason: P-176 read where a place has one value for each instance.

20. **C2. Row 963: the selector of a `typecase` takes the numeral's default.** **Default: so, with the two team tests changed as the row's note says.** The reason: P-173, and walk's answer.

## 4. The rungs

Each rung's section is its worker's brief. The briefing keys of section 1 give the decisions, rows and code the rung rests on. A line citation is the base build's, `9a0f69e01a`. Run 2's sections are re-read against run 1's landed tree before run 2's launch, and their line numbers then are that tree's. The record's forks are section 3's.

### N. The numerals' leftovers under walk, in the prelude and at a program's start: an integer numeral at the prelude's RR64 and RR32, a numeral coercion that starts a task, walk's dead field-numeral code, and rows 958, 967 and 974 (P-174, P-176, P-173, P-37)

**The mission.** Climb batch 29b built the static numerals on both paths. Its post-batch review lists where the two paths still answer differently and where the field numerals' code stays (`explorations/reviews/batch-29b-review.md`, sections 1 and 2). You repair the differences that lie outside the parser, the checker and the code generator, and delete the dead code. Rung C, in the batch's second run, takes the rest.

**The decisions this rung builds.** P-174, P-176, P-173; P-37's exception, under which the prelude carries the numerals; P-12. Section 3's forks N1 to N4. Whether a number is `=` a numeral (rows 973 and 966) is not yours: change nothing that it rests on.

**What you build, in order.**
1. **An integer numeral at the prelude's `RR64` and `RR32`** (fork N2; row 442). In `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` and `.fsi`, each of the two types gains `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])`, beside its radix-point coercion (`.fss:894`, `:955`). Its value is the numeral's exact value rounded once (P-173). Tests first:
   - `ProjectFortress/compiler_tests/NumeralNaturalAtFloatCompiled.test` (`compile`, `link`, `run`): `x: RR64 = 3` is `SEQV` a computed 3.0; `16777217` at `RR32` is 16777216.0 by its bits; a numeral of more than 20 digits at each type equals walk's value; `-3` at `RR64`; a numeral as an argument at an `RR64` parameter. Seen failing on the base: "Right-hand side has type NaturalNumeral[\1,10,3\], but declared type is RR64."
   - `ProjectFortress/library_tests/NumeralFoldFloats.fss:11` back to `16777217`, as climb batch 29b's record asked.
   - A case of `compiler/desugarer/NumeralCoercionFoldJUTest` for each new coercion's folded constant.
   - Walk's values of the same numerals are `tests/NumeralTypesWalk.fss`'s: a guard.
2. **A numeral coercion that starts a task** (fork N1; rows 971 and 979). The component class is loaded and initialized inside a root task on a pool of one thread of its own: `MainWrapper.main` reaches the class loader's copies of the pool and of `BaseTask` through `MainWrapper.icl`, the task sets itself as the thread's task, and `main` waits for it. A thread of the program's own pool of four threads is not the way: there a worker steals the forked task and waits on the class's initialization, and the program hangs (`explorations/coordinator/climb-batch-30-review.md`, section 3.1). Tests first: `compiler_tests/XXXNumeralCoercionSpawnCompiled` promoted to `NumeralCoercionSpawnCompiled`, and in it a second type whose coercion passes two calls of the program's own functions as a constructor's arguments, P-174's interval form. `compiler_tests/NumeralCoercionOnceCompiled.test` and `NumeralMinusOnceCompiled.test` are guards of the order of a place's output. A program whose coercion raises still stops while its class loads. Then row 979, the same hang for a place in an imported component, whose class initializes at its first use on a worker of the program's pool. Test first, from the three sources of the review's section 3.1: an api and a component that declare the type and the place, and a program that imports them; see it fail under `timeout`, since a hang stops a suite whose run step has no time limit, and keep it out of the suites while it can hang. Repair it where the same way does: an imported component's class initialized the same way, inside a root task on a pool of one thread of its own. If you find that it needs another way, such as no fork while a class initializes, which edits `BaseTask.java`, build none: the row stays open, and you report the way that it needs.
3. **Walk's dead code of the field numerals**, by the post-batch review's list (its section 1, "Every place where the landed tree still holds the field numerals", items 1 to 5): `Numerals.object` and the `Site.object` field; `Coercions.withNumeralObjects`, its call in `OverloadedFunction.java:2306-2309` and the `objects` path of `CoercedCall.convert`; `Numerals.isNumeralObject`, `fieldValue`, `field`, `intField`, `sameValue` and `fractionDigits`; the numeral case of `FOrdinaryObject.seqv`; the class comment of `Numerals`. And item 7's two comments of the prelude, `Library/CompilerLibrary.fsi:38-44` and `CompilerLibrary.fss:91-96`. A deletion of dead code has no failing test: walk's numeral tests (`tests/Numeral*Walk.fss`) are its guards, and your report says so.
4. **Row 960's reproducer** (fork N4). `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss` written again: a program's coercion over `RadixPointNumeral[\n, m, r, v\]` that returns `n`, asserting 3 for `00.5`. It still expects its failure, now for row 960's reason. The row's whole new line names it.
5. **Row 967.** Under walk a numeral, as written or folded, that rounds to an infinity at a typed place of `RR32` or `RR64` is refused when the place runs, in the form of walk's refusal of an integer numeral out of range. `tests/XXXNumeralRoundsToInfinityWalk.fss` promoted.
6. **Row 958.** Under walk a float numeral to the left of an `RR32` operand runs `RR32`'s operator. `tests/XXXNumeralLeftOfRR32Walk.fss` promoted. Walk's rule that a declaration that fits a numeral as it is runs before one that converts it does not change.
7. **Row 974, if it fits** (fork N3). `tests/XXXNumeralTypeWrittenWalk.fss` promoted.
8. **The whole suites** where the skill's `tests-running.md`, "When to run a whole suite", asks for them: your edits reach every compiled program's start and every numeral under walk.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Read each with `ledger.py show N` first. Close 971, 958 and 967, 979 if step 2 repairs it, and 974 if step 7 lands. Whole new lines, each within `ledger.py`'s limits: 442, without its numeral half; 960, with its new reproducer.

**Specification.** Your change makes these false; bring them in line, and build the specification as the skill's `specification.md` gives it:
- `Specification/appendices/changes.tex:5247-5250`, "coercions generic over the four numbers from NaturalNumeral at its five integer types and from RadixPointNumeral at RR64 and RR32";
- `Specification/basic/conversions-coercions.tex:91-93`, "declares no coercion into RR64 from an integer type or from NaturalNumeral", of which the numeral half goes;
- in the Effect of `revival-numerals` (`changes.tex:5272`, `:5294`, `:5304`), the clauses of rows 967, 958, 974 and 971; `changes.tex:2719`, row 958.
Leave the clauses of rows 960, 963, 957, 973 and 966.

**Files.**
- `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` and `.fsi`, the two types only; `Library/CompilerLibrary.fsi` and `.fss`, the two comments only.
- `runtimeSystem/MainWrapper.java`, and `FortressExecutable.java` if the pool's start needs it; for row 979, the class loader, `runtimeSystem/InstantiatingClassloader.java`, where the same way needs it.
- `interpreter/evaluator/values/Numerals.java`, `Coercions.java`, `OverloadedFunction.java`, `FOrdinaryObject.java`; walk's load code for step 7.
- Your tests; the specification's sentences named.
- Not: `compiler/codegen/`, `scala_src/`, the parser, `runtimeSystem/BaseTask.java` and `Transaction.java`, `Library/RangeInternals.fss`, microGPT.

**Reserved points.** A model line: none. Walk's rule on a declaration that fits a numeral as it is. A test of rows 973 or 966.

**Overlaps by file.** None with P or X.

### P. Parallel arms and arguments on the compiled path: every forked arm joined before a group completes abruptly, a task arm's locals and trailing block, a call's arguments forked where the analyzer judges them worth a task, and the one library's parallel range stopped at a grain size (P-175)

**The mission.** On the compiled path a function call's arguments run in order, so a reduction, which joins its two halves as the arguments of one call, runs its bodies one at a time (row 951). A group of forked arms joins them on the normal path only: when the first arm throws, the others run on after the group has ended (row 947). The one library's parallel range splits down to single elements. The decisions on record ask for the arguments forked, every arm joined, and the split stopped at a grain size (P-175). The review of the parallelism's foundations measured each defect (`explorations/reviews/parallelism-foundations-2026-11-08.md`).

**The decisions this rung builds.** P-175. Section 3's forks P1 to P4, and fork G at its default.

**What you build, in order.**
1. **Every forked arm joined** (fork P1; row 947). `CodeGen.genParallelExprs` (`compiler/codegen/CodeGen.java:1645-1721`) gains the abrupt path: when arm 0 or a join throws, every arm that was forked is joined, and then the first exception in the arms' order leaves the group. Register the handler's table entry after the code it covers, so that a handler inside an arm comes first (rows 888 and 934 show what the other order does). Test first, `ProjectFortress/compiler_tests/AlsoArmThrowsJoinsCompiled.test`, printing `PASS` or `FAIL`: the review's program, `do boomArm() also do slowArm() end` in a `try`, `slowArm` setting a flag after a wait, the flag read after the `catch`; the same with the throw in a later arm; a tuple and an operator whose first operand throws. Seen failing on the base: "after the catch: flag 0".
2. **A task arm's locals and trailing block** (fork P4; rows 497 and 322). `CodeGen.generateTaskCompute` (`:5181-5205`) reserves slot 0 and keeps nothing on the operand stack across the arm's body. Tests first: `XXXTaskArmLocalSlot` and `XXXTryInArmRungG` promoted; `AtomicEndsArmCompiled.test`, an `atomic do … end` block as the trailing expression of an arm after the first, which today fails with "VerifyError: Inconsistent stackmap frames".
3. **A call's arguments forked** (forks P2 and P3; row 951). `CodeGen.evalArg` (`:7064-7131`) forks a tuple argument's elements through `genParallelExprs` where `ParallelismAnalyzer` judges the tuple worth a task, for a function call and for a method call. Test first, `compiler_tests/CallArgumentsForkCompiled.test`, printing `PASS` or `FAIL`: a function of the program with two and with three arguments, each a call of a slow function of the program that counts, inside `atomic`, how many calls run at once; more than one at four threads; the results in the arguments' order; the same for a method call; an argument that throws, with the others joined. Seen failing on the base: at most 1 at once. Report whether the prelude's `gen` forks; change no prelude text for it.
4. **The whole compiled suite once**, `ant testFast`: forked arguments reach every compiled program. A test that now fails is written wrong, or shows a defect (P-125): repair the first, record the second, and report each.
5. **The grain size** (fork G, taken at way (a)). In `object CompactFullParScalarRange` of `Library/RangeInternals.fss` (`:1301-1345`), `generate` and `loop` stop the split at a chunk of at most the grain's elements and run it by the sequential range's methods, as `CompactFullSeqScalarRange(lo, hi).generate[\T\](red, body)` and `.loop(body)` (`:1347-1379`). The grain is one named constant of the component, 16. Study first how the library's generators name such constants. Tests first, under walk, `ProjectFortress/tests/ParRangeGrainWalk.fss`: a sum, a string concatenation and a `BIG MAX` over ranges shorter than the grain, equal to it, longer, empty and not aligned, each equal to the sequential range's answer; a parallel `for` that writes each element of an array once; and one assertion that fails on the base, of your design, such as the bodies of one chunk running in index order at four threads. The planner's trial of this edit kept microGPT's quick checks at 7 of 7 (section 5, "The planner's probes").
6. **The stages,** once on your final tree: the count stage and the distance stage, against climb batch 29b's gate (`explorations/compile-ladder/climb-batch-29b/gate/`), 0 and 0 with `#crash none`.

**Rows.** Close 947, 951 and 497; 322 closed, or its whole new line if a case remains. A note on row 640 that forked arguments reach it. New rows in `record.md`, `NEW-P-<n>`: each defect that step 4 shows.

**Specification.** No Effect of Appendix I and no note names these rows. List each sentence your change makes false, or none.

**Files.**
- `compiler/codegen/CodeGen.java`: `genParallelExprs`, `generateTaskCompute`, `evalArg` and their callers; `compiler/codegen/ParallelismAnalyzer.java`.
- `runtimeSystem/BaseTask.java`: the task half, above `startTransaction`.
- `Library/RangeInternals.fss`, the one object.
- Your tests.
- Not: `CodeGen.forAtomicBlock`, `forAtomicBlockHelper` and `forTry`; `runtimeSystem/Transaction.java` and `MainWrapper.java`; the prelude; microGPT.

**Reserved points.** A model line: none. A change of which tuples or operators fork today. A team test's line.

**Overlaps by file.** X edits `CodeGen.java` and `BaseTask.java` too: "The rule the rungs keep".

### X. The compiled transaction: a block's own writes, the sets that a block's threads share, a nested block's view, two initializations of one element, the handlers of nested blocks and of nested try, and an exception out of a block (P-169)

**The mission.** The compiled path runs an `atomic` block as a transaction of one global lock, buffered writes and validation by value (`runtimeSystem/Transaction.java`), inside a handler that the code generator writes (`CodeGen.forAtomicBlock`). The review of the parallelism's foundations found it young: it failed seven of thirteen program shapes where walk passed all but one (`explorations/reviews/parallelism-foundations-2026-11-08.md`, sections 1.4, 1.6, 3.2 and 7). You repair the six defects that need no decision still open. Walk's transaction is the reference for what the specification asks.

**The decisions this rung builds.** P-169, whose store and slots stay as they are. Section 3's forks X1 to X5. Not yours: plain writes beside a block (row 948) and the `double[]` store, which wait on decisions not taken; a retry bound or backoff; `tryatomic`, the atomic expression and fields, which the batch's second run builds on your code.

**What you build, in order.** Each test is a compiled test of `ProjectFortress/compiler_tests/` that prints `PASS` or `FAIL`, seen failing on the base at four threads and passing after at one thread and at four.
1. **The handlers of nested blocks and of nested try** (rows 934, 937 and 888). `CodeGen.forAtomicBlock` (`compiler/codegen/CodeGen.java:1784-1812`) and `forTry` (`:2101`) write their exception-table entry after the body's code, so an inner block's entry comes first. Tests first: `AtomicNestedSameBodyCompiled.test`, a parallel `for` over `1#400` of `atomic do atomic do d := d + 1 end end`, `d` = 400; `XXXNestedAtomicAbortCompiled` and `XXXNestedTryInnerCatch` promoted.
2. **A block's own writes** (fork X1; row 933). Tests first: `AtomicOwnWriteNestedCompiled.test`, the row's program, which ends with `y + w` = 4, and 20,000 blocks `x := x + 1; y := x` beside a task that commits on `z` alone, `x` = 20,000. On the base the first never ends: see it fail under `timeout 60`, exit 124 (fork X4).
3. **A nested block's view** (fork X3; row 950). A nested transaction's validation covers its ancestors' reads; an abort carries the transaction whose read failed; the block's handler restarts only its own. Test first: `AtomicNestedViewCompiled.test`, the review's program: the outer block reads `x`, its nested block reads `y`, other blocks change both together; no block sees them differ, in 3,000 outer blocks.
4. **The shared sets** (fork X2; row 949). Test first: `AtomicSharedReadsCompiled.test`, the review's program: 3,000 blocks of `for i <- 0#64`, each iteration reading one of 64 top-level variables, beside a task looping `atomic do w := w + 1 end`. It ends with no exception.
5. **Two initializations of one element** (fork X5; row 466's note). `Transaction.TXReadLocation` records the read of an empty element, so the second transaction's commit fails its validation and its `init` answers false on the retry. Test first, a case of `compiler/runtimeValues/ArrayStoreJUTest`: two tasks on a pool of four, each in the test's atomic protocol; exactly one `init` answers true in each of 1,000 rounds.
6. **An exception out of a block** (row 324). An exception that leaves an `atomic` block ends the block's transaction and discards its writes, then goes on. Test first: `AtomicThrowRevertsCompiled.test`: `atomic do g := 7; throw Boom end`, caught, `g` = 100; the same for a local and for an object variable; a throw out of a nested block, caught in the outer block, keeps the outer block's writes.
7. **The fourteen atomic programs** on your final tree, as the skill's `gate.md` gives them, and the whole suite where the skill asks for it.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 933, 934, 937, 888, 324, 949 and 950, each with its test. Row 466's whole new line, its sentence on two transactions gone.

**Specification.** No Effect of Appendix I and no note names these rows. List each sentence your change makes false, or none.

**Files.**
- `runtimeSystem/Transaction.java`; `runtimeSystem/TransactionAbortException.java`; `runtimeSystem/BaseTask.java`, the transaction half, from `startTransaction` down.
- `compiler/codegen/CodeGen.java`: `forAtomicBlockHelper`, `forAtomicBlock` and `forTry`.
- `compiler/runtimeValues/FortressArrayStore.java`, `init`; `ArrayStoreJUTest.java`.
- Your tests.
- Not: `CodeGen.genParallelExprs`, `evalArg` and `generateTaskCompute`; `compiler/codegen/VarCodeGen.java`; `runtimeSystem/MainWrapper.java`; `MutableFValue.java`; the `double[]` store; walk's transactions; microGPT.

**Reserved points.** A model line: none. A change to a plain read or write outside `atomic`. A change to walk.

**Overlaps by file.** P edits `CodeGen.java` and `BaseTask.java` too: "The rule the rungs keep".

### Y. atomic in its other forms: tryatomic on both paths, atomic as an expression, an atomic block on a stack that is not empty, and a mutable field inside a transaction

**The mission.** The batch's first run repaired the compiled transaction and the handler of an `atomic` block (section 4, rung X). The code generator still has no case for an `atomic` expression or a `tryatomic` expression (rows 875 and 353), a mutable field is read and written outside the transaction (row 319), and under walk a `tryatomic` inside an `atomic` block runs as plain code of the enclosing transaction (row 952). You build these on the first run's code.

**The decisions this rung builds.** Section 3's forks Y1 to Y3. The specification's sections on atomic expressions and abortable atomicity are the standard. Not yours: plain writes beside a block (row 948), the `double[]` store, a retry bound.

**What you build, in order.** Each compiled test prints `PASS` or `FAIL`, seen failing first and passing at one thread and at four.
1. **The atomic expression** (row 875). `compiler_tests/AtomicExprCompiled.test`: `atomic if … end` over a `var`, the form of `Library/OneShotFlag.fss:18`, from a parallel `for`; exactly one iteration wins.
2. **`tryatomic`, compiled and under walk** (fork Y1; rows 353 and 952). Compiled: `XXXTryAtomicCodegenRungB` promoted, and `TryAtomicCompiled.test`: a `tryatomic` that commits; one whose transaction aborts throws `TryAtomicFailure`, which a `catch` takes; one nested in an `atomic` block, in a parallel `for` over `1#400`, where the successes and the failures add to 400 and the counter equals the successes. Under walk: `ProjectFortress/tests/TryAtomicNestedWalk.fss` with the same nested case, which today leaves 350 to 374 with no failure. `tests/nestedTransactions3.fss` asserts the old behaviour: change its assertion, and report the lines.
3. **A mutable field inside a transaction** (fork Y2; row 319). `AtomicFieldCompiled.test`: 40,000 `atomic do n := n + 1 end` on a field from a parallel `for`, exact; a field read twice in one block beside blocks that write it; an immutable field read as before.
4. **Row 322's remainder** (fork Y3): an `atomic` block, and a `try`, as a call's argument after the first. Reproduce it first.
5. **The atomic programs** on your final tree, and the whole suites where the skill asks for them.

**The stages.** None. List your files (`STAGE_BLIND`).

**Rows.** Close 875, 353, 952 and 319; 322 closed or rewritten.

**Specification.** List each sentence your change makes false, or none.

**Files.** `compiler/codegen/CodeGen.java`, the cases for the two expressions, the block's code and the fields' declarations (`:4788-4800`); `compiler/codegen/VarCodeGen.java`, `MutableFieldVar`; `runtimeSystem/BaseTask.java` and `Transaction.java` where a form needs them; `interpreter/evaluator/Evaluator.java`, `forTryAtomicExpr`; your tests and the two team tests named. Not: the numeral sites of `CodeGen.java`, which are C's; microGPT.

**Reserved points.** A model line: none. A change to an immutable field's code. A team test's line beyond the two named.

**Overlaps by file.** C edits `CodeGen.java` in its numeral sites (`:7224-7450`), which you do not touch.

### C. The numerals' leftovers in the parser, the checker and the code generator: a radix-point numeral's leading zeros, a numeral as a typecase's selector, and a numeral at a place whose type names a type parameter (P-173, P-174, P-176)

**The mission.** Three differences from the static numerals' design stay in the parser, the checker and the code generator after the batch's first run (`explorations/reviews/batch-29b-review.md`, section 2): a numeral with a radix point loses its leading zeros before its digits are counted, on both paths (row 960); the compiled checker keeps a numeral's own type where it is a `typecase`'s selector (row 963); and at a place whose type names a type parameter the compiled code runs the coercion at each evaluation (row 957).

**The decisions this rung builds.** P-173, P-174, P-176; P-148 for your checker edit. Section 3's forks C1 and C2.

**What you build, in order.**
1. **The leading zeros** (row 960). `nodes_util/ExprFactory.java`, `makeFloatLiteralExpr` (`:1631-1643`) keeps what the digit count needs, so `00.5` has `n` = 3 on both paths, and its value does not change. Tests first: `tests/XXXRadixPointLeadingZerosWalk.fss`, which rung N wrote again, promoted; its compiled twin.
2. **The selector** (fork C2; row 963). `scala_src/typechecker/impls/Misc.scala`, the `typecase` case: a numeral selector takes its default. `XXXNumeralTypecaseSelector` promoted. The two team tests change as the row's note says; report their lines.
3. **A place at a type parameter** (fork C1; row 957). `XXXNumeralGenericPlaceCompiled` promoted: in `object Box[\T\]`, `m(): Gen[\T\] = 3` gives one object for two calls at one instance's type, and two for two instances' types.
4. **The comment** at `compiler/codegen/CodeGen.java:6482`, which still names `IntLiteral`.
5. **The stages and the timing,** once on your final tree: the count stage and the distance stage against the last landed gate, and P-148's runs.

**Rows.** Close 960, 963 and 957.

**Specification.** In the Effect of `revival-numerals` (`Specification/appendices/changes.tex:5294-5304` at this record's base), the clauses of rows 960, 963 and 957; then the specification's build. Leave the clauses of rows 973 and 966.

**Files.** `nodes_util/ExprFactory.java`; `scala_src/typechecker/impls/Misc.scala`; `compiler/codegen/CodeGen.java`, the numeral sites and the one comment; the class loader where step 3 needs it; your tests and the two team tests named; the Effect's clauses. Not: the block's code and the fields of `CodeGen.java`, which are Y's; walk's numerals; microGPT.

**Reserved points.** A model line: none. A change of the default where nothing fixes a type.

**Overlaps by file.** Y edits `CodeGen.java` outside the numeral sites.

### The rule the rungs keep, and how they meet

- **Run 1.** N shares no file with P or X. P and X share two files, by declaration:
  - `compiler/codegen/CodeGen.java`: P has `genParallelExprs` (`:1645-1721`), `generateTaskCompute` (`:5181-5205`) and `evalArg` (`:7064-7131`); X has `forAtomicBlockHelper` and `forAtomicBlock` (`:1768-1812`) and `forTry` (`:2101-2169`). P puts a new member directly above `genParallelExprs`; X puts one directly below `forAtomicBlock`.
  - `runtimeSystem/BaseTask.java`: P has the task half, through `joinOrRun` (`:113-178`), and puts a new member directly above `unsafeWorthSpawning` (`:113`), leaving `joinOrRun`'s last lines as they are; X has the transaction half, from `startTransaction` (`:180`) down, and puts a new member at the end of the class.
  - The gather applies N, then P, then X: of two rungs that share a file, the one whose lowest edited line is lower goes first (`climb-batch-workflow.md`, "Gather", "The order"), and P's is lower in both files.
- **Run 2.** Y and C share `CodeGen.java` only, in declarations more than two thousand lines apart. The gather applies Y, then C, by the same rule: Y's lowest edited line is the lower.
- **They meet on the merged tree:** the suites, the atomic runs with the new programs, the ladder and the two stages; the gather's 52 demos; the commit stage's microGPT quick checks, which read P's grain under walk.

## 5. The candidates, the probes, and what waits

### What the record owes

The planner's brief, piece by piece, with its home here:

- **Row 971, in:** N, step 2 (fork N1). Placed in N because its repair lies in `MainWrapper.java`, which no rung of part 2 edits.
- **Row 979, in where the same way reaches it:** N, step 2. Filed by the check before the launch (`climb-batch-30-review.md`, section 3.1).
- **Row 442, in:** N, step 1 (fork N2).
- **Walk's dead field-numeral code in eight places:** items 1 to 5 and item 7's prelude comments in N, step 3; item 7's comment in `CodeGen.java` in C, step 4; item 6, the vacuous test, in N, step 4; item 8, the record and the skill, in section 6.
- **Row 957's second case:** built, C, step 3.
- **Row 958:** built, N, step 6. **Row 967:** built, N, step 5. **Row 974:** built if it fits, N, step 7.
- **Row 960:** its reproducer in N, its repair in C. **Row 963:** built, C, step 2.
- **Row 962:** not built: CONTESTED, its question open. **Row 446:** not built: no decision gives the rule.
- **Row 966,** with row 973: not planned; the ways review.
- **N1 (row 947) and N5 with the grain size (row 951):** P.
- **Rows 933, 934 with 937 and 888, 324, N4 (950), N3 (949) and N7 (466's note):** X.
- **Rows 319 and 353, and the code generator's other `atomic` rows that the review's section 7 names, 875 and 322:** Y; 322's arm case in P.
- **Row 933's home** (PLAN's item 74, review-queue item 408): X. Its repair holds no switch-over step.
- **D1 and D2:** no rung needs either.

### The planner's probes

`compile-ladder/plan-30/PROBES.md` holds each with its commands and output. In short:

1. **The base build:** `/home/user/fortress-base31` at `9a0f69e01a`, "BUILD SUCCESSFUL", five jars, clean where the seed tests it; `/home/user/fortress-base30` removed.
2. **A grain of 16 under walk:** microGPT's quick checks stay 7 of 7 for both programs; the losses' last bits move by at most 4.4e-16 (fork G).
3. **Row 971's stack:** the cast fails in `BaseTask.getCurrentTask` (`runtimeSystem/BaseTask.java:241`), called from a task's constructor in the component's `<clinit>`, on the JVM's main thread (`MainWrapper.java:64`). A pool that exists earlier does not change that thread (fork N1).
4. **The briefing keys:** each matches one place on `main`.
5. **The disk:** about 17.7 G free.

**Not run:** a suite, a stage or a timing. Not probed: whether the analyzer judges the prelude's `gen` worth a task (fork P3, P's to report); row 322's remainder (fork Y3, Y's to reproduce).

### Rows filed by plan

None by the planner. Row 979 was filed by the check before the launch. A rung's new rows go in its `record.md` as `NEW-<rung>-<n>`.

### Left out, each with its home

Section 2, "What the batch leaves out", gives each with its reason. Their homes: rows 973 and 966, the ways review and item 487; rows 962 and 446, their rows and PLAN's item 76; D1, D2 and the contention policy, PLAN's "Pavol's answers"; the "Can wait" list, PLAN's phase 6; the grain's value, PLAN's phase 6 line on parallel reductions.

## 6. How it is run

The batch runs on the workflow of climb batches 22 to 29b: `coordinator/climb-batch-workflow.js` and its manual. Section 4 is each worker's brief word for word; section 1 holds the rest of the manifest.

### The generator

`compile-ladder/plan-30/manifest/` is the coordinator's, made from `plan-29b/manifest/`, with `--run 1` and `--run 2` choosing the block's rungs as `plan-21/manifest/` did:

- run 1: `BATCH` `30`, the folder `compile-ladder/climb-batch-30/`, the rungs N, P, X in that order; run 2: `BATCH` `30b`, `compile-ladder/climb-batch-30b/`, the rungs Y, C;
- no `landsOnlyWith`;
- the briefings and checks of section 1, with their reasons; no key holds a backslash, a backtick or a double quote;
- no rung declaring a count, a crash or a move;
- P's and C's sections naming the two stages; N, X and Y `STAGE_BLIND`.

### What every agent reads first

**Run 1.** This run is climb batch 30, the first of the two runs of the record CLIMB-BATCH-30.md: what climb batch 29b left on the numerals, together with the repairs of the review of the parallelism's foundations on the compiled path (P-175, P-169, P-174, P-176, P-37). On the compiled path a task is a piece of work forked to a pool of worker threads and joined later, and an atomic block runs as a transaction, whose reads and writes take effect together at its commit, or which aborts and runs again. Its rungs:

- N, the numerals' leftovers under walk, in the prelude and at a program's start: an integer numeral at the prelude's RR64 and RR32, a numeral coercion that starts a task, walk's dead code of the field numerals, three rows of walk;
- P, parallel arms and arguments on the compiled path: every forked arm joined before a group completes abruptly, a task arm's locals, a call's arguments forked where the analyzer judges them worth a task, and the one library's parallel range stopped at a grain size;
- X, the compiled transaction: a block's own writes, the sets its threads share, a nested block's view, two initializations of one element, the handlers of nested blocks and of nested try, an exception out of a block.

Each rung has tests that fail on the base and pass after. P and X share CodeGen.java and BaseTask.java by declaration: each keeps to its own, as its section says. P runs the count stage and the distance stage once on its final tree; N and X run neither. Whether a number is = a numeral is not this run's. microGPT changes no line, and its quick checks under walk stay 7 of 7. The gather applies N, P, then X, builds the specification once for N's text, and runs the 52 team demos on the merged tree. The gate's atomic runs hold eight new programs.

**Run 2.** This run is climb batch 30b, the second of the two runs of the record CLIMB-BATCH-30.md, after climb batch 30, which landed rungs N, P and X. Its rungs:

- Y, atomic in its other forms, on the first run's transaction and handler: tryatomic on both paths, atomic as an expression, an atomic block on a stack that is not empty, a mutable field inside a transaction;
- C, the numerals' leftovers in the parser, the checker and the code generator: a radix-point numeral's leading zeros, a numeral as a typecase's selector, a numeral at a place whose type names a type parameter.

Y and C share CodeGen.java in declarations far apart. C runs the count stage and the distance stage once on its final tree, with the checker's timing; Y runs neither. microGPT changes no line. The gather applies Y, then C, and builds the specification once for C's text. The gate's atomic runs hold three more programs.

### Before the launch

The coordinator, for run 1:

1. **Fork G:** taken by the coordinator at way (a), so P's section stands as written. Were it (b), step 5 of P's section would be struck, with its blurb's last clause, its two `RangeInternals` keys and the stages.
2. **The Fable review of this record,** its changes in place.
3. **The script:** run 1's eight programs in the atomic list; then the generator, its checks and the splice, as the manual's "Before the launch", step 4, gives them. The base is `main`'s head after that commit.
4. **The base build:** `/home/user/fortress-base31`, if `git diff --stat 9a0f69e01a <base> -- . ':!explorations'` prints nothing; its trial seed and the old code's run.
5. **The disk:** 8.5 G or more free; the main tree's old `tmp/gate-batch-*` and `tmp/gather/` cleared; `git status --porcelain` empty.
6. **Check-ins** for about 7 hours, 45 minutes apart (`<scratchpad>/batch30/checkins.txt`).

For run 2, after run 1's landing and its routing: sections Y and C re-read against the landed tree, by a planner's pass or the coordinator; a base build at that tree; the atomic list's three programs; then steps 3 to 6 with `--run 2`, 7 G free, about 5 hours 30 minutes.

### The launch arguments

`Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of main after step 3>', baseBuild: '/home/user/fortress-base31'}})` for run 1, and the same with run 2's base and its base build for run 2. The arguments of each are kept byte for byte, as `batch30/launch-args.json` and `batch30b/launch-args.json`.

### The gate, and what it should show

The comparands for run 1 are climb batch 29b's `summary.txt`, `checker-count.txt` (0) and `distance.txt` (0, `#crash none`), in `compile-ladder/climb-batch-29b/gate/`; for run 2, run 1's.

- `testSystem`: the comparand's count, with P's one walk test; N's walk tests are promotions, which keep the count.
- `testFast`: the compiler track 1,525 plus N's one, P's three and X's five new tests; the library track 86; the misc track with one more case in `ArrayStoreJUTest` (6 to 7) and N's cases in `NumeralCoercionFoldJUTest`.
- The atomic runs: twenty-two programs in run 1, twenty-five in run 2, each three times `PASS`.
- The ladder: no rung declares a move. P's forked arguments reach its 85 programs: a changed output is traced to P.
- The checker count: 0; the distance: 0, `#crash none`; reported, never red. P's library edit and C's checker edit are what they read.
- The 52 team demos at the gather. microGPT's quick pair at the commit stage, 7 of 7 each.

### The ledger

New rows go into the ledger only through `ledger.py add`, by the gather.

- **Run 1, closed:** 971, 958, 967, 979 if the same way repairs it, and 974 if it lands (N); 947, 951, 497, and 322 if no case remains (P); 933, 934, 937, 888, 324, 949, 950 (X). **Rewritten:** 442, 960 (N); 466 (X); 322 if a case remains (P). **Noted:** 640 (P).
- **Run 2, closed:** 875, 353, 952, 319, and 322 if open (Y); 960, 963, 957 (C).

### After the landing

- **PLAN:** item 74 answered (row 933's rung is X); items 78 and 79 answered by N; item 76 narrowed to rows 962 and 446; the phase 6 line on parallel reductions rewritten: the joins and the forked arguments landed before the switch-over, and what stays for the first batch after it is the grain's measurement and value and the reductions' test on compiled code; phase 4's line on row 971 struck; D1, D2 and the contention policy under "Pavol's answers" as questions not yet asked.
- **The review queue:** items 408, 488 and 489 answered; item 449 reworded to what stands; this record's forks as new items.
- **The gap ledger:** above.
- **The post-batch review** of each run.

### For the record-landing workflow

The batch edits no FACTS or POSITIONS entry. After run 1, these are false:

- **P-175:** "the code generator evaluates a call's arguments in order (F-19, row 951)" and "which the compiled path does not do (`CodeGen.genParallelExprs` joins on the normal path only, row 947)"; and "splits down to single elements" of the one library's range, if fork G lands as (a).
- **P-176:** its last sentence, "Rows 957 and 971 hold where the tree departs": row 971 after run 1, row 957 after run 2.
- **F-19:** "Compiled, a function call's arguments run in order (`CodeGen.evalArg`)"; "walk's library splits down to single elements" with fork G's (a).
- **F-347:** "A coercion whose body puts two calls of the program's own functions in one operator or one argument list ... spawns a task, and the spawn fails the class's load (row 971); bind the operands to locals first"; after run 2, "A place whose type names a type parameter calls the method at each evaluation (row 957)".
- **F-341,** where it describes walk's numeral code that N deletes; **F-345,** where it says what the specification states of the prelude's coercions.
- **F-179** and the entries that describe the compiled transaction: to be read against X's report; the facts that N, P and X hand over.
- After run 2: the entries that name rows 353, 875, 319, 960 and 963 as open.

### For the skill writer: the sentences of `fortress-repo` this batch makes false

The batch writes no skill text. After the landings, the record-landing workflow's skill writer brings these in line (each at `00768e9e96`).

After run 1:

- `SKILL.md`, "Parallelism and mutable state": nothing false; its sentence that "the arguments and operands of a call can run at once" becomes true of the compiled path.
- `references/compiler.md`, "Traps of the compiled path":
  - "In a `try` nested in another `try` of one body, the outer `try`'s `catch` clause is matched first (ledger row 888)." (X)
  - "A numeral coercion whose body spawns a task fails the component class's load: 'Thread cannot be cast to FortressTaskRunner' (ledger row 971). ... Bind each call in a statement of its own ..." (N)
  - "Until the switch-over, `RR64` converts only an `RR32` and a numeral with a radix point, and `RR32` only such a numeral. So `r: RR64 = 3` is refused, ... Write `3.0`": an integer numeral converts; a `ZZ32` value still does not (N).
- `references/interpreter.md`, walk's departures from "Numbers": the items of rows 958, 967 and 974 (N); row 960's item stays until run 2.
- `references/revival-changes.md`, "Numbers": "Walk gives `Infinity` for the second (row 967)." (N)
- `references/gate.md`, "The atomic runs": "The atomic runs compile fourteen programs ... in about a minute", and its list of names: twenty-two after run 1, twenty-five after run 2.

After run 2:

- `references/compiler.md`, "What the compiled path cannot compile yet": "`atomic` used as an expression" in the list of constructs without a case (Y); "Traps of the compiled path": "At a place whose type names a type parameter of its generic declaration, a numeral's coercion runs at each evaluation (ledger row 957) ..." and "As a `typecase`'s selector, a numeral keeps its own type ... (ledger row 963) ..." (C).
- `references/compiler.md`: "The compiled code keeps each mutable variable in a cell ...": a `var` field is such a variable too (Y).
- `references/interpreter.md`: "A numeral with a radix point keeps only one of its leading zeros ... (ledger row 960)." (C)

## 7. Files cited, with their links

- Records: [POSITIONS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/POSITIONS.md), [FACTS.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/FACTS.md), [PLAN.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/PLAN.md), [the gap ledger](https://github.com/palimondo/fortress/blob/main/explorations/fortress-gap-ledger.md), [the review queue](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/review-queue.md), [CLIMB-BATCH-29b.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/CLIMB-BATCH-29b.md), [climb batch 29b's review](https://github.com/palimondo/fortress/blob/main/explorations/reviews/batch-29b-review.md), [the review of the parallelism's foundations](https://github.com/palimondo/fortress/blob/main/explorations/reviews/parallelism-foundations-2026-11-08.md), [climb batch 29b's gate](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/climb-batch-29b/gate/summary.txt), [climb-batch-workflow.md](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/climb-batch-workflow.md), [this planner's probes](https://github.com/palimondo/fortress/blob/main/explorations/compile-ladder/plan-30/PROBES.md), [the design snapshot](https://github.com/palimondo/fortress/blob/main/explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md).
- Code: [CodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java), [ParallelismAnalyzer.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/ParallelismAnalyzer.java), [VarCodeGen.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/codegen/VarCodeGen.java), [Transaction.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java), [BaseTask.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/BaseTask.java), [MainWrapper.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java), [FortressArrayStore.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FortressArrayStore.java), [Evaluator.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java), [Numerals.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java), [Misc.scala](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala), [ExprFactory.java](https://github.com/palimondo/fortress/blob/main/ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java), [RangeInternals.fss](https://github.com/palimondo/fortress/blob/main/Library/RangeInternals.fss), [CompilerBuiltin.fss](https://github.com/palimondo/fortress/blob/main/ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss), [CompilerLibrary.fss](https://github.com/palimondo/fortress/blob/main/Library/CompilerLibrary.fss).
- Specification: [parallelism.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/evaluation/parallelism.tex), [atomic.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/atomic.tex), [transactions.tex](https://github.com/palimondo/fortress/blob/main/Specification/advanced/parallelism-locality/transactions.tex), [try.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/expressions/try.tex), [changes.tex](https://github.com/palimondo/fortress/blob/main/Specification/appendices/changes.tex), [conversions-coercions.tex](https://github.com/palimondo/fortress/blob/main/Specification/basic/conversions-coercions.tex).

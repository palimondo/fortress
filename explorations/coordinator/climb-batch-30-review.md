<!-- The check of climb batch 30's record, `CLIMB-BATCH-30.md` (`0829796281` on `main`), with its probe notes `compile-ladder/plan-30/PROBES.md`, before the launch of its first run, by a fresh reader on Fable at medium effort on 2026-11-10: each citation at its source, each rung against the decisions on record and the curator's words, the forks sorted by the `coordinator` skill's rule, the merge of rungs N, P and X, and row 971's planned repair, which a prototype shows to hang; with the changes made to the record in place. Its runs were in a worktree of its own, `/home/user/fortress-chk30`, seeded from the base build `/home/user/fortress-base31` (`9a0f69e01a`) and removed after; no suite and no stage was run. -->

# The check of climb batch 30's record, before the launch

## 1. For the curator

**What was checked.** The record of climb batch 30, run 1 in full (rungs N, P and X) and run 2 as far as its sections go (rungs Y and C):

- every file and line, ledger row, entry and review section that a rung cites, against `main`'s code;
- each rung against your decisions (P-174, P-176, P-173, P-37, P-40 for the numerals; P-175, P-169, P-84, P-125 for the parallelism work), the design snapshot's sections 3 and 11, the parallelism review's sections 7 and 8, and your go, "numeral batch as my go, but together with the parallelism work";
- the twenty-one forks;
- whether the three rungs of run 1 merge;
- the planned repair of row 971, the numeral coercion that starts a task.

**What was found.**

- **The record is sound in its citations.** Of the citations checked (section 5.1), one sentence was wrong: where you placed the parallelism pieces on 2026-11-08. All 103 briefing keys match one place each.
- **No rung builds against a decision of yours, and none changes one.** Every piece of run 1 rests on a decision or on the parallelism review's repair list.
- **One repair does not work as planned: row 971.** The record plans to initialize a program's class on a thread of the task pool. A prototype of that hangs in 12 of 12 runs at four threads. A task that the initializer forks is taken by another thread, which then waits for the class to finish initializing, while the initializer waits for the task. On a pool of one thread it passes 12 of 12. The same hang exists today, without any change, for a numeral in an imported component: 5 of 6 runs. This needs the coordinator's choice of a way before rung N is launched. It changes no decision of yours.
- **The grain size.** The coordinator took it at the planner's default: built now, as one named constant, 16, to be measured after the switch-over. The record did not say so; it does now. I judge that fork consequential by the skill's rule, and it can be undone, so it may land and be named to you.

**What was changed in the record:** the sentence on your placement of 2026-11-08, the statements that fork G waits for your answer, and one reason line of rung N's briefing. No design was changed.

## 2. Changes of the record that I made

Each is in `CLIMB-BATCH-30.md` in place.

### 2.1 The placement of 2026-11-08

- **Was:** "On 2026-11-08 you placed N1 and the forked arguments in the first batch after the switch-over." (section 2, "Where each piece of the parallelism work is tested today").
- **The source:** P-175's history, its block of 2026-11-08 23:47Z: "N1 (...) in the batch before; both, the argument fork and the grain size, in the first batch after the switch-over, since no compiled program runs the one library before it (PLAN, phase 6)". PLAN's phase 6 line says the same: "First, in the batch before D3's rung, the repair of a `do … also` group ... Then, in the first batch after the switch-over, D3's rung".
- **Now:** "you placed the forked arguments and the grain size in the first batch after the switch-over, and N1 in the batch before theirs". The planner's brief carried the wrong sentence, so the record copied it.
- **What it bears on:** fork G. The grain size was placed after the switch-over with your yes of 2026-11-08, so building it now reads that placement anew (section 4.1 below).

### 2.2 Fork G is taken, and the record says so

- **Was:** the header comment, section 2 ("The one question before the launch", "Before the batch runs"), section 3 (G), section 6 ("Before the launch", step 1) and step 5 of rung P's section all read as if the launch waited for the curator's answer.
- **The source:** `BOOT.md`, "Running": "The grain size, taken by the coordinator at the planner's default (a), to name to him ... P-175 and his go of today cover it, by the coordinator's reading."
- **Now:** each place says that the coordinator took way (a) before the launch, that it can be undone, and that it is named to the curator at the landing and goes on the review list. Step 5 of P's section reads "(fork G, taken at way (a))", so P's worker reads no open condition.
- **The constant is easy to change:** step 5 has "The grain is one named constant of the component, 16", in `Library/RangeInternals.fss`, and P reports "its constant, its value and where it is declared". A later change is one line of the one library.

### 2.3 A reason in rung N's briefing

- **Was:** "P-173 (check): where a numeral converts, the refusal of one that rounds to an infinity, the default."
- **The source:** P-173 says "a numeral outside the type's range is refused statically"; row 967's own note says "P-173 does not say whether `Infinity` is its one rounding". The rule is the specification's: "or rounds to an infinity there" (`Specification/basic/expressions/literals.tex:210`), which the compiled checker applies.
- **Now:** "where a numeral converts, the refusal of one outside its type's range, the default; the specification names the one that rounds to an infinity."

## 3. Points for the coordinator to decide

### 3.1 Row 971: the planned repair hangs; a way must be chosen before rung N is launched

**The plan** (fork N1; rung N, step 2): "`MainWrapper.main` hands the load and initialization of the component class to the pool, and waits for it; `BaseTask` is not changed."

**The planner's reproduction is right.** In my worktree, row 971's reproducer on the base's code gave the stack of PROBES, probe 3: the cast fails in `BaseTask.getCurrentTask` (`runtimeSystem/BaseTask.java:241`), called from a task's constructor (`compiler/codegen/CodeGen.java:5128`), in the component's `<clinit>`, on the JVM's main thread (`MainWrapper.java:64`).

**Three facts that the plan does not state, by reading:**

1. **Two copies of the run time's classes exist.** `MainWrapper` is loaded by the JVM's own loader, and `InstantiatingClassloader` defines its own copies of `BaseTask`, `FortressExecutable`, `FortressTaskRunner` and the pool (`runtimeSystem/InstantiatingClassloader.java:2901-2917` lists what it leaves to its parent; the stack's message says "FortressTaskRunner is in unnamed module of loader com.sun.fortress.runtimeSystem.InstantiatingClassloader"). A pool that `MainWrapper` names directly is the other copy's, and the cast fails again. The pool must be reached through `MainWrapper.icl`, by reflection.
2. **A thread of the pool is not enough: it needs a current task.** A task's constructor passes `getCurrentTask()` to `BaseTask(BaseTask parent)`, which reads `parent.transaction` (`BaseTask.java:83-91`). So the class must be initialized inside a `BaseTask` that has set itself as the thread's task, as the generated `compute` does (`CodeGen.java:677-679`).
3. **The program's own `main` makes a second pool** (`CodeGen.java:654-668`); `FortressExecutable.group` is another (`FortressExecutable.java:29-30`).

**The prototype.** `FortressExecutable` gained a static method that runs `Class.forName(name, true, loader)` inside a root `BaseTask` on a pool; `MainWrapper.main` calls it by reflection through `icl`. The two classes were compiled into the worktree's build; nothing else changed. At `FORTRESS_THREADS=4`, JDK 25.0.4.1, nproc 4:

| the pool | program | result |
|---|---|---|
| `FortressExecutable.group`, four threads | row 971's reproducer, `XXXNumeralCoercionSpawnCompiled` | hangs, 12 of 12 (`timeout 8`, exit 124) |
| the same | the reproducer with a slow `part` | hangs, 6 of 6 |
| a pool of one thread of its own | row 971's reproducer | `PASS`, 6 of 6 |
| the same | the reproducer with a slow `part` | `PASS`, 6 of 6 |
| `FortressExecutable.group`, at `FORTRESS_THREADS=1` | row 971's reproducer | `PASS` |

The thread dump of a hung run:

    "ForkJoinPool-1-worker-1" ... WAITING (parking)
    	at java.util.concurrent.ForkJoinTask.join(ForkJoinTask.java:669)
    	at com.sun.fortress.runtimeSystem.BaseTask.joinOrRun(BaseTask.java:170)
    	at SpawnInit.coerce_Cell?natural(SpawnInit.fss:5)
    "ForkJoinPool-1-worker-2" ... in Object.wait()
    	at SpawnInit$task1.compute(SpawnInit.fss:5)
    	- waiting on the Class initialization monitor for SpawnInit

**The cause.** The initializer forks the task (`BaseTask.forkIfProfitable`, `:136-144`). An idle worker steals it. The task's body calls a function of the component, a static method of the class that is still being initialized, so the JVM makes that worker wait for the initialization. The initializer then joins the task and waits for the worker. On a pool of one thread nothing steals the task, and `joinOrRun` runs it in place.

**The same hang exists today on the base, for an imported component.** A class of an imported component is initialized at its first use, inside `run`, on a worker of the program's pool of four threads, which is the state that the plan would put the main component in. On the base's code, unchanged:

    api SpawnLib
    object Cell(s: String)
      coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])
    end
    made(): Cell
    end

    component SpawnLib
    export SpawnLib
    object Cell(s: String)
      coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = Cell(part("a") || part("b"))
    end
    part(t: String): String = t || t
    made(): Cell = 3
    end

    component SpawnUse
    import SpawnLib.{...}
    export Executable
    run(): () = do
      println("REACHED")
      assert(made().s, "aabb", "the coercion's value at the place")
      println("PASS")
    end
    end

`fortress compile` of both, then `timeout 8 fortress run SpawnUse` at four threads: `REACHED` and exit 124 in 5 of 6 runs, `PASS` in 1; at one thread, `PASS`. The dump shows the same pair: `SpawnLib.\=numeral\%init\%0` in `joinOrRun`, and a worker "waiting on the Class initialization monitor for SpawnLib". No ledger row holds it (`ledger-find:clinit`, `ledger-find:class initialization`: rows 313, 971 and 368 only). Every place's field is in its component's class and is filled in that class's `<clinit>` (`CodeGen.java:7271-7307`, `:1947`), so this reaches each component that a program imports.

**The ways, for the coordinator:**

- **(a) A pool of one thread of its own for the main component's class,** reached through `icl`, in a root task; `BaseTask` unchanged. It repairs row 971 as its claim stands (12 of 12 in the prototype) within N's files (`MainWrapper.java`, `FortressExecutable.java`). The imported component's hang stays as it is today, with a new row. Tasks forked while the class initializes run in sequence, which the specification allows (`parallelism.tex:89-90`, row 951's note).
- **(b) No fork while a class initializes, on any thread.** The generated `<clinit>` marks the thread while it fills the places, and `BaseTask.forkIfProfitable` leaves a task unforked on a marked thread, so `joinOrRun` runs it in place. With (a)'s root task for the main component, this covers imported components and the functions that a coercion calls. It edits `BaseTask.java:136-144`, eight lines above `joinOrRun`, in P's half, and the `<clinit>` code of `CodeGen.java`, which N's section excludes: so it is P's work, or a rung of its own after run 1.
- **(c) The post-batch review's way (b), a coercion's method compiled without spawns.** It does not reach a spawn inside a function that the coercion calls, so alone it leaves both failures open.

**My recommendation:** (a) for run 1, in these words for fork N1 and step 2: "on a pool of one thread of its own, inside a root task, reached through the class loader's copy of the run time's classes". Then the new row for the imported component, with (b) as its repair in a later rung. As written, N's worker would meet the hang at its first test, with a brief that forbids `BaseTask` and names no other way; and a compiled test that hangs stops `ant testFast`, whose run step has no time limit (fork X4; `tests/unit_tests/FileTests.java:585`).

**What a program sees, under (a):**

- **Output and its order: unchanged.** `main` waits for the initialization before it calls the program's `main`.
- **A coercion that raises: the same lines and exit code 1.** On the base, `Cell(fail("boom"))` printed `FAIL:  boom`, then "Exception in thread "main" FortressException: ..." with its stack through `<clinit>`. The prototype printed the same stack without the words "Exception in thread "main"", which depend on how `main` rethrows. A test that pins that first line would change; N's points to report cover it.
- **The thread and the task of the initializer.** The component's top-level initializers run on a worker thread, inside a root task with no transaction, where today they run on the main thread with no task. A draw of `drandom` there now has a task's pedigree.
- **No parallelism while the class initializes.** The arms of a group in a coercion's body run one after another.
- **One more pool** of one thread at every program's start, shut down after the load.

### 3.2 The new defect, for the ledger

A candidate row, section 7, sibling of 971: on the compiled path a numeral's place in an imported component whose coercion's body spawns a task hangs the program at four threads, 5 of 6 runs, and passes at one. The evidence is section 3.1. The reproducer is not in the tree: this check adds no test. Whoever files the row adds `XXX` tests from the three sources above; a hanging test must not join the suites until the run step has a time limit.

### 3.3 Rows 442 and 971 were questions for the curator with other defaults

- PLAN's items 78 and 79, under "Pavol's answers", and review-queue items 488 and 489 hold both as his, with the defaults "as landed": way (c) for row 971 and way (b) for row 442. Item 79's way (a) says "if he confirms that a natural-numeral coercion is "the numerals" of his exception".
- The record builds way (a) of each on "the coordinator's sort" (the planner's brief, "Part 1").
- **I find the sort supported by his words, with no new reading:**
  - the snapshot's section 3, his addition: "The library's own number types (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64`) take numerals by the same mechanism as a program's types ... no excuses for them";
  - its point 7, "Both paths do the same thing, before the switch-over", and section 11's line on P-37's exception, "so that both paths do the same thing before the switch-over";
  - P-174, "every number type, the library's too, takes a numeral through a coercion generic over the four numbers";
  - P-176, "filled when the class loads", with row 971 named as where the tree departs.
- No entry, history block or snapshot line holds his confirmation in item 79's words. So both go to him as landed decisions, named at the landing, not as asks.

### 3.4 Where P's forks meet N's and X's work on the merged tree

No pair of rungs changes one behaviour two ways. Two behaviours are built by one rung and widened by another, and no rung's own tests cover the pair:

- **A task forked while a class initializes (N and P).** N's second test, "a constructor's arguments, P-174's interval form", forks on N's tree only by what the analyzer spawns today; once P forks a call's arguments, more coercion bodies fork in `<clinit>`. Under way (a) of 3.1 the merged tree is safe for the main component; the imported component's hang reaches more programs.
- **An exception out of a group inside an `atomic` block (P and X).** P's group throws "the first exception in the arms' order" (fork P1). X's block discards its writes when an exception leaves it (row 324) and restarts on an abort of its own transaction (fork X3). If one arm throws a Fortress exception and a later arm an abort, P's rule lets the Fortress exception leave a block whose transaction another arm found stale. Row 950's note already says that a nested block can throw on a mixed state. I propose one line for the merged-diff review: a parallel `for` inside `atomic` whose arms throw, beside committing blocks.

### 3.5 Small points

- **`BaseTask.java:1-112`** (the fields and the two constructors, which copy the parent's transaction, `:86`) are named by neither half of "The rule the rungs keep" ("through `joinOrRun` (`:113-178`)", "from `startTransaction` (`:180`) down"). P's Files line gives them to P ("above `startTransaction`"), and X's points to report agree. X's fork X2 keeps the shared sets, so X should not need them.
- **P's Files line ends "and their callers".** The callers of `genParallelExprs`, `evalArg` and `generateTaskCompute` are at `CodeGen.java:2028`, `:5257`, `:5295`, `:6724`, `:6897`, `:6914` and `:7496`, none inside X's declarations.
- **The script and the manual say "42 lines"** for the atomic runs (`climb-batch-workflow.js:1111`, `climb-batch-workflow.md:233`): 66 with twenty-two programs. Changed with the list in task 2.
- **Run 2, for its re-read before its launch:**
  - Fork Y2 keeps every `var` field in a cell. Neither microGPT program declares one, but the one library's objects do, and compiled microGPT runs them after the switch-over. Before run 2, list the one library's `var` fields on the model's path; if any is hot, Y2 touches microGPT's speed and is consequential.
  - Fork Y1 changes a team test against the review's "Can wait". The specification is the ground and the team's own comment doubts the old behaviour, so I judge it not consequential; it is the first for the review list.
  - C's briefing reason "P-176 (check): one value per place, and per instance where the place's type names a type parameter": P-176 says "one value" per place and names row 957 as a departure; "per instance" is climb batch 29b's fork A5, not P-176's words.

## 4. Points that would change a decision of the curator's

None. One fork reads a placement of his anew and is consequential; it can be undone:

### 4.1 Fork G

- **Consequential, by the first bullet of the skill's rule** ("reverses, bends or reads anew a decision of the curator's"): on 2026-11-08 the grain size was placed in the first batch after the switch-over with his "Yeah. Option one." (P-175's history; section 2.1 above), and its value is the "right forking constants" that he asked for, which no measurement can choose before compiled reductions run.
- **It can be undone:** one constant and two tests of one object of the one library. So the skill's second way fits, "Landed, then reviewed": it lands, is named in one line at the landing, and goes on the review list with the default that landed. The coordinator took it so (`BOOT.md`).
- **What he would see:** walk's microGPT losses move in their last bits, by at most 4.4e-16 against a tolerance of 1e-12, both quick checks 7 of 7 (PROBES, probe 2, at one thread; four threads were not run).

## 5. The checks, one by one

### 5.1 Citations

- **The base.** `git diff --stat 9a0f69e01a main -- . ':!explorations'` prints nothing at `f9d86cef91`. `/home/user/fortress-base31/.base-ready` holds `9a0f69e01ae9d1f87293aa479631e839ed6d2805`.
- **Code, at the lines given:** `CodeGen.java` `genParallelExprs` `:1645-1721`, `forAtomicBlockHelper` `:1768`, `forAtomicBlock` `:1784-1812`, `forTry` `:2101-2169`, `generateTaskCompute` `:5181-5205`, `evalArg` `:7064` with the team's comment at `:7068`, the fields' declarations `:4788-4800` with the team's TODO, the comment at `:6482`, the numeral sites from `:7224`; `BaseTask.java` `unsafeWorthSpawning` `:113`, the class-initializer comment and `forkIfProfitable` `:122-144`, `joinOrRun` `:146-178`, `startTransaction` `:180`, the cast `:241`; `MainWrapper.java:61-64` with the team's comment; `RangeInternals.fss` `:1301-1345` and `:1347-1379`; `ExprFactory.java:1631-1643`; `CompilerBuiltin.fss:894`, `:955`; `CompilerLibrary.fsi:38-44`, `.fss:91-96`; `OverloadedFunction.java:2306-2309`; `Evaluator.java:239-283`; `FileTests.java:585`; `OneShotFlag.fss:18`; `changes.tex:5247-5250`, `:5272`, `:5294`, `:5304`, `:2719`; `conversions-coercions.tex:91-93`. All as the record says.
- **The tests named** exist under their names: the twelve `XXX` tests to promote, the guards, `NumeralFoldFloats.fss:11` (`h: RR32 = 16777217.0`), `ArrayStoreJUTest` (6 cases), `NumeralCoercionFoldJUTest`, and the two team tests of run 2.
- **Rows** 322, 324, 442, 466, 497, 640, 876, 888, 933, 934, 937, 947 to 953, 957, 958, 960, 962, 963, 967, 971 and 974: each says what the record says of it. Rows 319, 353, 446, 875: their claims read.
- **The reviews:** the post-batch review's section 1, its eight places and items 1 to 7, as rung N's step 3 lists them; the parallelism review's sections 1.7, 1.8, 7.1 to 7.3 and 8, as P's and X's sections use them. Section 8's "Before anything relies on `atomic`" is covered whole by X and Y; its items 3 and 4 (D1, row 641's check on the unboxed path) are left out and the record says so.
- **The gate's numbers:** the compiler track 1,525, the library track 86, `ArrayStoreJUTest` 6, the count 0, the distance 0 with `#crash none` (`climb-batch-29b/gate/`); fourteen atomic programs and 85 ladder programs (the skill's `gate.md`). The new tests add up: N one, P three, X five; the atomic runs 14 + 2 + 6 = 22, then 25.
- **The sentences quoted** for the record-landing workflow and the skill writer: nineteen checked by `grep -F` in FACTS, POSITIONS and the skill's parts, all present.
- **The keys:** `python3 -B explorations/compile-ladder/plan-30/manifest/lists30.py`, 103 keys over the five rungs, each one place, "bad lists 0".
- **Not checked at the source:** the cost evidence beyond the two reviews' titles and totals; PROBES' probe 2, the grain under microGPT, which was not run again.

### 5.2 Each rung against the decisions and his words

- **N.** Steps 1 and 2: section 3.3 above. Step 3 deletes what the snapshot's section 4 says the design is not. Steps 5 to 7 bring walk to the checker's refusals, at run time until P-12; row 974 is named by P-174 as a departure. P-40 is not in N's briefing; N's two coercions follow the prelude's radix-point ones and read `v` and `r` as they do, so nothing of P-40 is built.
- **P.** P-175's three parts, each in a step. Rows 497 and 322's arm case come from fork P4, not from a decision; without them forked arguments break programs that verify today. The analyzer is kept as P-175's words have it.
- **X.** P-169's store and slots are not changed. Every repair is in the parallelism review's list "Before anything relies on `atomic`". Rows 948 and 953 and a contention policy are left out as D2, D1 and "after D2".
- **Y and C.** Y: the review's list, with rows 875 and 322 from its section 7 and row 952 from "Can wait" (fork Y1). C: P-173's default for row 963, the Working Draft's count for row 960 (P-174 names it), P-176 for row 957.
- **Left out by the record, and asked for by no decision:** a number `=` a numeral (the ways review), rows 962 and 446.
- **His go.** Both parts are in. Nothing in the record is stated as his beyond the entries, but the placement sentence (2.1).

### 5.3 The forks

By the rule of the `coordinator` skill's `SKILL.md`, "The curator's role and decisions":

| fork | consequential | reason |
|---|---|---|
| G, the grain size now | yes, can be undone | reads anew his placement of 2026-11-08 and sets an unmeasured value (4.1) |
| B1, two runs | no | the batch's own order |
| B2, the atomic runs' new programs | no | the gate's list |
| N1, row 971's repair | no | start-up code, undone by one file; its default must change (3.1) |
| N2, two coercions in the prelude | no | within P-37's exception as the snapshot states it (3.3) |
| N3, row 974 at load | no | P-174 names the row; built only if it fits |
| N4, row 960 split | no | which rung writes a test |
| P1, every arm joined, the first exception | no | the specification's sentence and walk's way |
| P2, the analyzer kept | no | P-175's words; the analyzer's defect on the review list |
| P3, the prelude not changed | no | P-37 |
| P4, rows 497 and 322 with the forks | no | a repair that the forks need |
| X1, own writes not validated | no | row 933's mechanism |
| X2, a lock on the shared sets | no | one of the review's two ways, the smaller |
| X3, an abort names its transaction | no | needed by rows 934, 937 and 950 together |
| X4, row 933's test under `timeout` | no | a test's form |
| X5, the store's `init` in Java | no | no compiled program reaches the store yet |
| Y1, `tryatomic` nested | no | the specification over a team test whose own comment doubts it; first on the review list |
| Y2, a `var` field in a cell | not for microGPT's lines; to check for the one library before run 2 (3.5) | the code's own way for a mutable variable |
| Y3, row 322's remainder | no | built only if it reproduces |
| C1, one value for each instance | no | row 957, climb batch 29b's fork A5 |
| C2, the selector's default | no | P-173 and walk's answer |

### 5.4 The merge

**Verdict: the gather can merge N, X and P cleanly, by declaration.**

- **N** shares no file with P or X, if it keeps to `MainWrapper.java` and `FortressExecutable.java`. Under way (b) of 3.1 it would not.
- **`CodeGen.java`:** P's three declarations and X's three lie at least 46 lines apart (`:1721` to `:1768`); P's new members go above `:1645`, X's below `:1812`.
- **`BaseTask.java`:** P above `:180`, X from `:180` down and at the class's end. The nearest pair is `joinOrRun`'s end (`:178`) and `startTransaction` (`:180`); the record tells P to leave `joinOrRun`'s last lines as they are, which keeps the hunks apart.
- **One behaviour, two ways:** none. The two meeting points are in 3.4.
- **`ForkJoinTask.join` and X3's abort.** X3 has an abort carry its transaction, and P's joins rethrow an arm's exception on the joining thread. On JDK 25.0.4.1 `join` rethrows the same object, with its fields, whether or not the class has a constructor without arguments (a Java check: a field set in a stolen task read back after `join`, both forms). So the field survives the join.

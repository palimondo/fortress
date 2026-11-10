<!-- The combined post-batch review of climb batch 30, run 1 of coordinator/CLIMB-BATCH-30.md: the numerals' leftovers with the parallelism review's repairs on the compiled path (three rungs planned and landed, N, P and X; run wf_94bad6da-b78, base 9d0147ff9ec4ef22e1849c6e421f6c8440e646b3; its first agent's first record at 08:40:41.306 UTC on 2026-11-10, its commit stage's last commit d89fc0fda4 at 12:42:30; 11 agent transcripts, each with its meta file, every agent on Fable at medium effort by the temporary switch FABLE_WEEK; no restart, no resume, no judge, no repair round; landed on main as N f36a651243, P 76b21f4981, X 594da41299, the closes d88ab05429, the gather's record 0ddfc840e6, the review's corrections eed02564c9 and the gate's tables d89fc0fda4; pushed, with no hold), owed at the landing by the coordinator skill's references/batch.md, "The landing", step 3, in the form of reviews/batch-29b-review.md, by a review worker on Fable reading only, against main at d89fc0fda4 (the tree at 855d629c3b, whose one commit after it is the coordinator's boot note). Its sources for the decisions are P-175, P-174, P-176, P-173, P-37 with its exception, P-169, P-84 and P-125, with history:P-175 and the dated lines of the others' last history blocks. The gate's result is cited as its agent returned it and was not run again. The measures are batch-measures.py's and transcript-study/skill-load.py's on this run, spend.py's method over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/rev30/ (spans.py, map.py and moved.py written new; brief.py, calls_mod.py, parts.py, runs3.py and mainw.py copied from rev29b). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only, at the curator's ruling of 2026-10-23. Besides reading, this review ran only those scripts, facts-extract.sh, grep, sed, diff and git, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 30: three of three rungs, forked arguments and joined arms on the compiled path, the compiled transaction repaired, the numerals' leftovers closed, the count and the distance still 0; a run of 2.92M, 47 % under its estimate, after a preparation span of 2.33M and a landing of climb batch 29b of 5.55M

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

**The standard.** P-175 (arguments fork where the analyzer judges them worth a task, the one library's range stops at a grain size, every forked arm is joined before a group completes abruptly), P-174 and P-176 (the static numerals: one value per place, made once), P-173 (where a numeral converts, the refusal outside a type's range), P-37 with its exception (no declaration is added to the prelude, but the numerals), P-169 (the compiled store and the transaction's slots stay as they are), P-84 (arrays unboxed, not touched here) and P-125 (the suites at four threads, a test that parallelism breaks is repaired, never hidden). P-175's history has four blocks: his "Yeah. Option one." of 23:3x on 2026-11-08, with N1 "in the batch before" and the argument fork and the grain "in the first batch after the switch-over", then three rewrites that only move pointers. His go of 07:4x on 2026-11-10 brought both forward (`CLIMB-BATCH-30.md`, "Where each piece of the parallelism work is tested today").

**Verdict: the three rungs build what the decisions ask, in the letter for P-174, P-176, P-173, P-37 and P-169, and in the spirit for P-175, with three readings of P-175 that reached him on no list (findings 2 and 3). No landed change acts against a decision on record.**

**Rung N, `f36a651243`.**
- **The prelude (P-37's exception, P-174):** in the letter. `RR64` and `RR32` gain the coercion from `NaturalNumeral` over `n`, `r` and `v` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:894`, `:956`; `CompilerBuiltin.fsi:402`, `:445`). The diff of the two files is these four lines, and nothing else is added to the prelude. Each body is the type's radix-point coercion at no digits after the point, so the value rounds once (P-173); the class file holds `3.0d` for `3` at `RR64` and `1.6777216E7f` for `16777217` at `RR32`.
- **The compiled run time (P-176):** in the letter, and wider than the plan's words (section 2, fork N1). A compiled program's component classes are initialized before `run`, inside a root `BaseTask` on a `FortressTaskRunnerGroup` of one thread (`runtimeSystem/FortressExecutable.java:113-141`), reached from `MainWrapper` through the class loader's copies (`runtimeSystem/MainWrapper.java:30-46`, `:94-95`). The classes are the program's and that of each component whose declarations its classes name, at any depth (`runtimeSystem/InstantiatingClassloader.java:185-248`). `BaseTask.java` is unchanged by N.
- **Walk (P-173, P-174, P-12):** in the letter for rows 967 and 958, and in part for row 974.
  - A numeral that rounds to an infinity at a typed place of `RR64` or `RR32` is refused when the place runs (`interpreter/evaluator/values/Numerals.java:309-337`, `:356-372`; the skeptic's `FType.java:108-115` and `LHSEvaluator.java:220` for a numeral with a radix point at `RR64`).
  - A float numeral left of an `RR32` operand runs `RR32`'s operator: walk now reads specificity through other applicable declarations where none wins directly (`interpreter/evaluator/values/OverloadedFunction.java:2398`, `:2418-2438`). The rule that a declaration that fits a numeral as it is runs first is unedited (`:2306-2317`). This also changes calls without a numeral: a chain of three coercions that ended in 'Ambiguous coercion' now runs the first (the skeptic's `SkChain`), as the compiled path does.
  - A numeral type written as an extended type or a static argument is refused at load (`interpreter/evaluator/BuildEnvironments.java:1175-1202`, called at `interpreter/Driver.java:227`). A `comprises` clause still loads (row 981).
  - The field numerals' dead code is gone: `grep` for `withNumeralObjects`, `isNumeralObject`, `fieldValue`, `intField` and `sameValue` under `interpreter/` prints nothing. `numeralType`, `fitsAsIs` and `numeralKey` stay, as the static numerals' own (`Numerals.java:292-302`, `:692`).
- **The specification:** eight sentences changed, one corrected by the skeptic, one clause added by the gather (`Specification/appendices/changes.tex:2717-2719`, `:5245-5248`, `:5259-5264`, `:5270-5280`, `:5299-5303`; `Specification/basic/conversions-coercions.tex:91-93`).

**Rung P, `76b21f4981`.**
- **Every forked arm joined (P-175):** in the spirit. `CodeGen.genParallelExprs` (`compiler/codegen/CodeGen.java:1692-1774`) ends in `joinForkedArms` (`:1657-1690`), whose handler joins each arm that was forked through `BaseTask.joinIfForked` (`runtimeSystem/BaseTask.java:113-131`) and throws on the exception of the first arm, in the arms' order, that threw. Its table entry is written after the group's code (`:1685`). Two readings of the worker's, neither named to him:
  - a `VirtualMachineError` leaves the group without the joins (`:1669-1674`), since a stack overflow inside a join left an arm that nothing would run and the handler waited without end;
  - an arm that was never forked is not run (fork P1, in the plan).
- **A call's arguments fork (P-175):** in the letter. `CodeGen.evalArg` (`:7132-7205`, the fork at `:7144-7148`) hands a tuple argument's elements to `forExprsParallel` where `pa.worthParallelizing` holds, for a function call (`:7570`) and a dotted method call (`:6965`, `:6982`, `:6792`). `ParallelismAnalyzer` is unchanged. The team's comment "Why isn't this parallel???", which P-175 cites, is gone with the code that it stood on.
- **A task arm (rows 497, 322):** `generateTaskCompute` (`:5243-5273`) reserves slot 0 and loads `this` after the body.
- **The grain (P-175, fork G):** section 2.
- **The skeptic's fix:** a binding named `n`, `r` or `v` whose forked right-hand side holds a numeral failed verification; the declared variable now joins the environment after its right-hand side (`:4513-4516`).

**Rung X, `594da41299`.**
- **P-169:** in the letter. The store, its slots and `FortressArrayStore.java` are unchanged; the first read of an empty element is recorded with a mark (`runtimeSystem/Transaction.java:244`).
- **The six repairs:** the exception-table entry of an `atomic` block and of a `try` follows its body's code (`CodeGen.java:1854`, `:2173`); a read of an own write records nothing (`Transaction.java:229-233`); a nested transaction validates its ancestors and an abort names its transaction (`:275-284`, `TransactionAbortException.java:36-40`); the shared sets are iterated under their monitors (`:237`, `:256`, `:332`, `:341`, `:357`); every exception ends the block's transaction (`BaseTask.java:293-314`, `leaveTransaction`).
- **Beyond the six, with the skeptic's test:** a nested transaction that wrote nothing, or that an exception leaves, hands its reads to its parent (`Transaction.java:302-318`; `compiler_tests/AtomicNestedReadsKeptCompiled`).
- **P-125:** each new compiled test passes at one thread and at four, and none is pinned to one thread. `AtomicSharedReadsCompiled` writes its outer loops over `seq(…)` because the parallel form passed on the base, not to hide a failure (X's decision 9).

**What the two paths still do differently after this batch.**

On a numeral:
1. `u = 0`, `0 = u` and `u =/= 0` for a zero `NN32`, `NN64` or `RR32` (rows 973 and 966): walk `false`, `false` and `true`; compiled the opposite. Run 2's equality rung, by his answer of 11:3x.
2. A numeral type in a `comprises` clause loads under walk and is refused compiled (row 981, new).
3. A numeral as a `typecase`'s selector (row 963) and a place whose type names a type parameter (row 957): run 2's rung C.
4. A `ZZ32` value at `RR64` is refused compiled and converts under walk (row 442's rest), and the compiled path has no `QQ`, both until the switch-over.
5. Where a numeral coercion's side effect shows: compiled, before the program's first line, for the program's and every used component's places (F-348); under walk, at the place's first evaluation (P-176 gives both).
6. A numeral out of range, or one that rounds to an infinity, at a typed place: a static error compiled, a refusal when the place runs under walk, with a message that differs by the kind of place ('Type mismatch binding', 'RHS expression type RR64 is not assignable to LHS type RR64', 'Unification error').
7. Rows 962, 446 and 694 stand as climb batch 29b's review gave them.

The same on both paths, so no difference: row 960 (the leading zeros), row 980 (a radix-point numeral that no place types and that rounds to an infinity is `Infinity`).

On parallelism:
8. A call's arguments: walk forks them wherever `TupleTask.worthSpawning` holds; compiled, only where the analyzer marked the tuple, which needs two or more calls of functions declared earlier in the file and outside the prelude's files (P's skeptic, "Which calls count").
9. A reduction of the library: walk's forks its halves above a chunk of 16; the prelude's runs its bodies one at a time (row 982, new), until the switch-over.
10. Which exception leaves a group in which two arms throw: compiled, the first arm's in the arms' order; walk at four threads gave another arm's (P's skeptic). A test that asserts which arm's exception leaves would differ between the paths.
11. An `atomic` block or a `try` as a call's later argument that does not fork fails verification compiled (row 322, rewritten); a deep recursion by forked arguments overflows a default stack (row 640).

On transactions:
12. An outer block that assigns from what its nested block read: compiled keeps other blocks' commits; walk loses them, 109 of 1,100 at four threads (row 985, new). Walk was the rung's reference, and here it is the one that is wrong.
13. A nested block beside a plain write of its outer block: compiled sees two values in some runs; walk none in two runs (row 984, new; row 948's question one level down).
14. `tryatomic`, `atomic` as an expression and a mutable field inside a transaction do not compile or are not tracked (rows 353, 875, 319), and walk flattens a `tryatomic` inside a block (row 952): run 2's rung Y.

### 2. The three forks that landed at a default

**Fork G, the grain size: landed as the plan's way (a).**
- `Library/RangeInternals.fss:20`: `private grainSize: ZZ32 = 16`, a private top-level constant beside `printLimit` (`:16`).
- In `object CompactFullParScalarRange`, `generate`'s `loop'` (`:1320-1321`) and `loop`'s `lop` (`:1337-1338`) run a range for which `0 <= (hi DOTMINUS lo) < grainSize` holds, at most 16 elements, by `CompactFullSeqScalarRange(lo,hi).generate[\T\](red,body)` and `.loop(body)`. The split above a chunk is unchanged.
- Against the plan: the same. The planner's trial wrote `hi - lo < 16`; the landed test uses the file's own wrapping operator, so a range of more than 2^31 elements does not raise (P's decision 9).
- Not changed, by plan: `StridedFullParScalarRange` still splits to single elements (`:1498-1585`).
- The count and the distance on P's tree and at the gate: 0 and 0.

**What it does to microGPT's two quick checks, from the record's measurements.**
- Both stay 7 of 7 in every run on record: the planner's probe at one thread (`compile-ladder/plan-30/PROBES.md`, probe 2), rung P at one thread and at four ('VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' four times), rung N and its skeptic, and the commit stage on the merged tree (`climb-batch-30/gate/summary.txt`, `# microgpt-walk`).
- The losses' last bits move. In the probe the first loss equals its golden where it differed by 4.4e-16, the second differs by 4.4e-16 where it was equal, and the parameters after Adam differ by 2.8e-16 where they differed by 8.3e-17. The tolerance is 1e-12.
- No time is a measurement: walk's time decides nothing (P-29), and each pair ran under a different load (the probe 38 s and 42 s before, 33 s and 39 s after; P 40 s and 34 s at one thread, 61 s and 49 s at four under a load of 8.9; the commit stage 33 s and 39 s).
- **By reading, not run: at 16 the model's own vectors no longer split.** The flat program's sizes are `nEmbd` 16, `blockSize` 16, `nHead` 4, `headDim` 4 and `vocabSize` 27 (`explorations/run-c4/src/MicroGptFlat.fss:17`). A range of sixteen elements or fewer now runs in sequence, so a `SUM`, a `DOT` or a `BIG MAX` over a vector of the model's width forks nothing, and a range of 27 splits once, into 16 and 11. P-175's ground is that "the model's parallelism is its reductions". Finding 1.

**Fork N1, rows 971 and 979: landed by the plan's mechanism, and wider in reach than the plan's words.**
- The mechanism is the plan's default: a pool of one thread of its own (`new FortressTaskRunnerGroup(1)`, `FortressExecutable.java:117`), a root `BaseTask` that sets itself as the thread's task (`:119-121`), the class loader's copies reached through `MainWrapper.icl` (`MainWrapper.java:32-35`), `main` waiting in `invoke`, and `BaseTask.java` unchanged.
- The reach: the plan's default named "the component class", and for row 979 "an imported component's class initialized the same way". The landed tree initializes, at every start, the class of every component whose declarations the program's classes name, the prelude's components among them (`fortress.CompilerBuiltin.jar`, N's `REPORT.md`, section 1). It finds them by reading the constant pool of every class in each component's jar (`InstantiatingClassloader.java:185-248`).
- Two things the plan said and the landed tree does not keep:
  - "What a program sees: the same output in the same order" (fork N1's text). A coercion with a side effect at a place in a used component now runs before the program's first line (the skeptic's `SkPlMain`: 'coerce in lib' then 'run start'; the old code the reverse).
  - No cost was named. A compiled program's start takes about 40 ms more (five runs twice: new 249 to 313 ms, old 214 to 263 ms; the skeptic's finding 6, which the worker's report did not hold).
- The program's arguments are now set before the classes initialize (`MainWrapper.java:94`).
- A top-level variable's initializer still runs at first use, and a component that is imported and never named is not initialized (the skeptic's correction of the worker's account and of one Appendix I sentence).
- It is on his list (`PLAN.md:769`). Finding 2 adds what the list does not say.

**The prelude's two coercions: landed exactly as fork N2.** The four lines above, and no other declaration. The fold needed no change (`NumeralCoercionFoldJUTest`, 10 tests). `library_tests/NumeralFoldFloats.fss:11` is back to `16777217`, as climb batch 29b's record asked. A `ZZ32` value at `RR64` is still refused, by P-37.

### 3. The count 0 and the distance 0, against climb batch 29b's tables

The gate ran once, on `0ddfc840e6`, and was green (its agent's result, cited). The review's `eed02564c9` and the commit stage's `d89fc0fda4` touch only `explorations/` and `Specification/fortress.pdf`.
- **The count's table:** `diff` of `climb-batch-30/gate/checker-count.txt` against climb batch 29b's prints nothing: 14 api rows, all 0, `#total 0`, `#locations 0`, `#crash none`. 'COUNT SAME   0, declared none'. **No row is new and none rose, so no row needs a rung edit to explain it.** P's count on `728c0fde79` read the same.
- **The distance's table:** `#total 0`, every `#kind` 0, `#crash none`; 'DISTANCE SAME   0'. Only `#seconds` and `#machine` differ.
- **The summary's other rows:** `CompilerJUTest` 1,525 to 1,558; `ArrayStoreJUTest` 6 to 8; `NumeralCoercionFoldJUTest` 8 to 10; `LibraryJUTest` 86; `testSystem` 822 to 830; `testSpecData` 130; 66 of 66 atomic lines `PASS`, 22 programs. The record expected the compiler track at 1,525 plus nine and `ArrayStoreJUTest` at 7.
- **The times:** the count stage about 70 s by the gate log's file times and the distance 128 s (`FortressLibrary` 83 s) at a start load of 0.14, beside `testFast` (F-240), against 104 s and 190 s (117 s) at climb batch 29b's gate, on a 2.30 GHz machine against a 2.10 GHz one. `testFast` 7 min 0 s, `testSystem` 3 min 20 s, `testSpecData` 45 s.
- **The microGPT walk check:** "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS" (rc=0) for both programs. No model line changed.

### 4. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 2.92M over 11 transcripts for 11 launches, in 4 h 03 min** (08:40:41 to 12:43:20 UTC; `batch-measures.py` gives the same 2.92M). No agent was retried, killed, judged or repaired. The boot note's "3.13M by the harness's count" is another count; the method of `spend.py` gives 2.92M.

By role (writes, then share):
- Rung workers (3): 1.13M, 38.6 %. N 416.8K, P 430.0K, X 278.5K.
- Skeptics (3): 897K, 30.8 %. N 315.0K, P 272.1K, X 310.0K.
- Gather: 299.9K, 10.3 %. Merged-diff review: 295.0K, 10.1 %.
- Gate: 123.3K, 4.2 %. Commit: 112.6K, 3.9 %. The disk check: 63.1K, 2.2 %.
- Per landed rung, all roles: 0.97M. The fixed roles, 894K, are 31 % of the run.

Against the batches before (B26, B27, B28, B29, B29b, B30):
- Rung workers: 990K (4); 2.26M (10); 2.77M (7); 3.03M (6); 1.19M (2); 1.13M (3).
- Skeptics: 707K; 1.33M; 2.50M; 2.43M; 890K; 897K.
- Judges and repairs on a rung: 0; 231K; 164K; 314K; 0; 0.
- Gather: 333K; 390K; 444K; 548K; 439K; 300K.
- Review: 204K; 271K; 401K; 467K; 410K; 295K. Its judge and repair: 0; 368K; 0; 415K; 0; 0.
- Gate: 204K; 213K; 149K; 137K; 132K; 123K. Commit: 113K; 118K; 158K; 131K; 121K; 113K.
- Total: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M; 2.92M.
- Span: 2 h 27; 5 h 22; 6 h 16; 7 h 27; 3 h 55; 4 h 03.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M; 0.97M.

**Against the record:** "about 5.5M tokens written, from 4.4M to 7.0M; about 7 hours at two agents at a time" (`CLIMB-BATCH-30.md`, section 2, "Cost"). **2.92M, 47 % under the estimate and 34 % under its range.** Where they differ, by role:
- **The workers wrote 1.13M against 2.4M.** X 279K against 0.9M, in 33 minutes against 210; P 430K against 0.9M, in 98 minutes against 210; N 417K against 0.6M, in 69 minutes against 160. This is more than half of the whole difference.
- **The skeptics wrote 897K against 1.35M.** N 315K against 0.35M; P 272K and X 310K against 0.5M each.
- **The fixed roles wrote 894K against 1.25M.** The gather 300K and the review 295K, each about 140K under climb batch 29b's.
- **No judge or repair ran, against 0.5M reserved.**
- **The time:** the critical path was X 33 min, N 69, 21 minutes in which N's skeptic waited for a slot, N's skeptic 51, the gather 47, the gate 20 beside the review's 11, the commit 2.
- **The reason, as far as the record shows it:** the estimate's per-rung figures are those of climb batches 29 and 29b, which ran on Opus (workers 354K to 720K). Every agent here ran on Fable at medium effort, and each worker wrote fewer tokens for a rung of the same kind. One run is not a measurement of the two models.

**The cost in three spans, each on its own.** Each span is `spend.py` from its start less `spend.py` from its end, over the same folders: the session's `subagents/` folder, its workflow folders `wf_94bad6da-b78` (this run), `wf_ab289a6d-124` (climb batch 29b's run) and `wf_b5fa84b2-fbe` (its record-landing), the project folder of headless sessions and the `landing-29b` folder. `find` shows no other folder with a transcript changed since 00:38:49. `spend.py` printed 11.36M from 1794271129, 5.81M from 1794283034, 3.48M from 1794300041.306 and 0.52M from 1794314550.
- **Span 1, the landing work of climb batch 29b**, from `a2be3e9e1d` (00:38:49) to 03:57:14: **5.55M over 32 transcripts.**
  - The record-landing run, 25 agents in the span, 3.89M (Opus 3.21M over 16, Sonnet 0.68M over 9). The largest: sort 407K, page 406K, check 363K, admission 317K, the judges 294K and 213K, quiz author 219K.
  - Its four headless skill-writer sessions, 883K: two in the `landing-29b` folder (648K) and two on `main` (235K).
  - So the record-landing with its writers wrote 4.78M, against climb batch 29's 5.60M.
  - Climb batch 29b's post-batch review, 501K; the round-trip numeral test's agent, 148K; climb batch 29b's commit agent, 121K, which last changed at 00:39:58.
- **Span 2, the preparation**, from 03:57:14 to 08:40:41.306: **2.33M over 15 transcripts.**
  - The record-landing's last agent, the revival-page publish, 94K, which last changed in the span's first second.
  - The post-mortem of the numeral design's closing work, 05:44 to 07:14, ten Fable agents, 1.16M: one design from the problem alone, one scout, six replays, one analysis and the report.
  - The ways review on a number `=` a numeral, 280K, and its four ledger rows, 72K: run 2's equality rung rests on it.
  - Climb batch 30's own preparation, 726K: the planner 366K and the check before the launch 360K. The manifest's generator and the splice were the coordinator's own, in its session.
- **Span 3, the run**, from 08:40:41.306 to 12:42:30: **2.96M over 11 transcripts**: ten of the run's eleven (2.80M; its commit agent last changed at 12:43:20) and one reading agent of the coordinator's, 156K (12:36 to 12:40, the units note).
- After the run's end, 0.52M at the time of the count: the run's commit agent 113K, the arrays reminder 245K, and this review.
- **The coordinating session's own writes**, which `spend.py` leaves out, by each message's time and model (`mainw.py`): span 1, 62K on Opus; span 2, 1,316K, of which 1,291K on Fable from 05:41:57, 434K of that one write of its whole context at the switch to Fable; span 3, 238K on Fable, 74K of it at 12:11:08 after his compaction.

So the landing of climb batch 29b wrote nearly twice what this run wrote. With the session's own writes the preparation span is 3.65M, of which the batch's own preparation is 0.73M.

**The briefing's use.**
- **6 of 6 briefed agents read their briefing, 100 %: the three workers and the three skeptics. None read it in its first turn.** The disk check, the gather, the review, the gate and the commit stage have none by design.
- When: skeptic P at call 5, 23 s after its start; rung P at call 6, 39 s; skeptic N at call 8, 33 s; rung X at call 12, 53 s; rung N at call 13, 52 s; skeptic X at call 14, 51 s.
- Each read every part ('end of part N of N, the last'): N four parts, P and X three, the skeptics two or three. Rung X wrote the command into a script and ran it three times. No key failed.
- Its results came to about 144K tokens, 4.9 % of writes, at 0.40 tokens a character plus 110 a call.
- Against the batches before (briefed, read, at calls, seconds, share): B26 8, 8, 5 to 13, 21 to 89, 5.2 %; B27 15 of 19, 15, 4 to 16, 16 to 78, 6.2 %; B28 15, 15, 3 to 21, 14 to 95, 3.1 %; B29 15, 15, 4 to 20, 15 to 105, about 3.6 %; B29b 4, 4, 12 to 21, 41 to 97, 2.7 %; B30 6, 6, 5 to 14, 23 to 53, 4.9 %.

**Other measures.**
- First calls: 648K (22.2 %), 7 cold. Cache refills: 0. Refusal cycles: 0. Rulings and repairs on the merged tree: 0.
- The skill's load: 467K, 16.0 %: load text 87K and 380K over 107 part reads. `revival-changes.md` was read 10 times (106K), by every agent but the disk check and the commit stage; the gate read it though it only runs. `sources.md` was not read.
- Error results: 17, of which 8 a `wait_for` cap, one `sleep` blocked (skeptic P), one built-in safety refusal of a removal (the review), one `ledger.py add` refused by size (row 986's notes, 706 characters), and the rest a probe or a `grep` failing as its caller expected.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `a46f7f51`, 63K, 0.2 min; rung P `a33dd438`, 430K, 97.5; rung X `a461d02f`, 279K, 32.5; rung N `a3c60865`, 417K, 69.3; skeptic X `a4d73574`, 310K, 25.7; skeptic P `a2ed3aff`, 272K, 31.0; skeptic N `a4d4a374`, 315K, 50.9; gather `ab24d0d5`, 300K, 46.6; gate `a28c976c`, 123K, 19.6; review `a6fdac8e`, 295K, 11.2; commit `ad2a91db`, 113K, 2.1.

### 5. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

The rule: no stage runs a build, a suite or a measurement again on a code state that another stage ran (`references/batch.md`, "The workflow"). By each agent's commands (`runs3.py`):
- **The count and the distance stages ran three times each; one pair measured again what the stages read.** Rung P ran both on `ef9bc9d7cd` (09:05, 09:07) and again on `728c0fde79` (09:46), a state that differs in `CodeGen.java` and one test, which neither stage reads (P's decision 15 says so). The gate ran each once on the merged tree. No skeptic ran a stage, rightly: no rung changed the checker.
- **Rung P built a merge of the three rungs' heads** in a worktree under its own `tmp/` (09:46 to 09:52: a seed, three merges, `ant compileAll`, the library order and 18 tests), to see whether N and X repair what P alone leaves red. The gather built the merge again at 11:41, on other heads (the skeptics' fixes had come in between). What P learned was true and was used: P needs N's root task and X's order of the exception table. But a rung is not briefed to read its siblings' branches, and the plan's manifest said that each rung lands on its own (process finding 1).
- **The 52 demos ran three times on three code states**: rung P (09:50), N's skeptic after its fix (52 of 52) and the gather on the merged tree (51 of 52, row 986). The plan gave them to the gather.
- **The microGPT quick pair ran six times**: the planner's probe twice, rung P at one thread and at four, rung N, N's skeptic, and the commit stage. The plan gave it to the commit stage. Climb batch 29's process finding 9 is not taken up, a third batch running.
- **Whole suites:** rung P ran `ant testFast` on `ef9bc9d7cd` and again on `728c0fde79`, once per code state, the first on a state that its own correction superseded; rung N `ant testSystem` and `ant testQuick` once each; N's skeptic `ant testSystem` after its fix; P's skeptic `ant testCompiler` after its fix (1,539 tests, 1 failure, `NumeralStaticDesignCompiled`, by row 971, which it approved as needing N); rung X no whole suite; the gate each once. No suite ran twice on one code state.
- **Builds:** N 4, N's skeptic 3, P 3 (one the trial merge), P's skeptic 1, X 1, the gather 1, the gate 1 (3 s, caches kept). Each after an edit of code, but the trial merge.

### 6. The push of 11:46: what happened, and its consequence

**What happened.** The gather started at 11:35:05 UTC (the journal's `started` line; its first record at 11:35:05.310). It committed N at 11:40:08, P at 11:40:52, X at 11:43:38 and the rows' close at 11:44:36, in the main tree. At 11:46:11 and 11:46:23 the coordinating session committed the boot note on top (`2b73940ecf`, `b8dafc382e`) and pushed each at once (the pushes' output: '4607992899..2b73940ecf' and '2b73940ecf..b8dafc382e', `-> main`). It had not read the journal since the gather started; its next read of it was at 11:55:04. The first push carried the gather's four commits. **So from 11:46:15 `origin`'s three branches, `main`, `claude/worker-brief-fable-vnnuv8` and `blinded-fable`, held the merged code of the three rungs, 35 minutes before the merged-diff review and the gate started (12:21:38) and 55 minutes before the gate ended (12:41:13).** The rule that it broke is in `references/batch.md`, "While it runs": from the gather's start until the batch's push, change nothing in the main tree, and push nothing that the batch committed.

**Whether any stage read or depended on `origin/main` in that time.** By every `git` command of the gather, the review, the gate and the commit stage (their transcripts):
- The gather read `git log -3` at 11:51:56 and saw the two commits. It went on, and its result names them: "two of the coordinator's boot-note commits sit between the close and the record". It ran no command on `origin`.
- The review and the gate ran `git status`, `git log` and `git diff` on local commits only. Neither ran `git fetch`, `git push` or any command that names `origin`.
- The commit stage was the first to read `origin`: `git status -sb` at 12:41:30 printed '## main...origin/main [ahead 2]', where it would have printed nine with nothing pushed. It did not remark on it. Its push at 12:42:36 printed 'b8dafc382e..d89fc0fda4' for each of the three refs: it pushed three commits, not nine.
- So no stage depended on `origin/main`, and the run was not disturbed. The push needs `origin/main` at or behind the main tree's head, which held.
- **Two results state what was no longer true:** the gather's summary says "nothing is pushed", and the review's says "Nothing is pushed". Neither stage checked.

**Whether a push hold could still have held anything.** Only three commits: the gather's record `0ddfc840e6`, the review's corrections `eed02564c9` and the gate's tables `d89fc0fda4`, which hold paths under `explorations/` and the rebuilt `Specification/fortress.pdf`. All code, every test, the library's edit, the specification's text and the ledger's closes were already on `origin`. A hold for a step that cannot be undone, or for a change against his word, would have held nothing of that change. A red gate would have left unlanded code on `main` and on `blinded-fable`, the branch from which the platform rebuilds a lost container.

**The consequence in fact: none.** The review approved, the gate came green, and nothing held the push. The slip is told to him (the boot note, "The coordinator's slip, told to him at 12:1x"), with the rule since: read the run's journal before any commit in the main tree while a batch runs. Process finding 2 proposes a check that does not rest on memory.

### 7. The tail

- **Rung X** (279K, 32.5 minutes): six repairs, each test seen failing first; row 933's under `timeout 60`, exit 124. It ran the fourteen atomic programs and its seven, 63 of 63 `PASS`.
- **Rung P** (430K, 97.5 minutes): the joins, the task arm, the arguments, the grain; one correction of its own first edit (the `VirtualMachineError`), with `ForkedArgumentsStackOverflowCompiled`.
- **Rung N** (417K, 69.3 minutes): all eight steps.
- **The skeptics** approved each rung, with eight commits, two of them defects: N `0f42002159` (row 967's repair missed a radix-point numeral at `RR64`) and P `9eb18a6350` (the binding named `n`, `r` or `v`). X's `913a9b191b` adds the test of a change that had none, and the expected failure under walk that is row 985. None contested.
- **The gather** (300K, 46.6 minutes): no conflict; 53 compiled tests, 12 walk tests, the two unit classes, the specification (715 pages, 0 warnings), the demos; rows 980 to 986; fifteen rows closed; F-348 to F-351, F-19 and F-347.
- **The merged-diff review** (295K, 11.2 minutes): approved. It corrected the record's branch lines, F-134, rows 640 and 948, and one quotation; it named P-174's and P-176's stale sentences beside P-175's, and routed row 497's two untested cases.
- **The gate** (123K, 19.6 minutes): green. **The commit** (113K, 2.1 minutes): the walk check, `d89fc0fda4`, the push of the three refs, the worktrees removed.

## Part 1. Conformance

### The decisions consequential for him, and the readings he has not confirmed

1. **Fork G** at way (a), value 16: the coordinator's, named to him at 12:5x (`BOOT.md:16`). Finding 1.
2. **Fork N1**, the coordinator's, taken on the check before the launch: on his list (`PLAN.md:769`). Finding 2.
3. **The prelude's two coercions**: his exception to P-37 covers them, and climb batch 29b's review recommended them; named to him at 12:5x. No finding.
4. **Rung P's readings of P-175**, on no list of his: the `VirtualMachineError`, the dropped exceptions of later arms, and the analyzer's judgement kept with its defects (fork P2). Finding 3.
5. **Rung X's two**, on his list: row 984 (`PLAN.md:772`) and the restart in place of a throw (`:773`).
6. **Row 980**, contested, on his list (`:770`).

### Findings

**Findings that would change a decision of his, each with its options:**

**Finding 1. At a grain of 16, microGPT's own reductions do not fork.** P-175 has two halves: arguments fork "so a reduction's two halves run in parallel", and the range stops at "a chunk that runs efficiently in sequence". With the model's widths at 16, 16, 4 and 4 (`MicroGptFlat.fss:17`) and the grain at 16 (`RangeInternals.fss:20`), a reduction over a vector of the model's width is one chunk: it forks nothing, under walk today and on the compiled path after the switch-over. Only a range of 17 or more splits, as the vocabulary's 27. This is by reading; which of the model's reductions go through this range, and what share of its time they are, is not measured. It bears on his decision because P-175's reason is that "the model's parallelism is its reductions", and because the value was his to get right ("you need the right forking constants"). The options:
- (a) Keep 16 until the first batch after the switch-over measures it on compiled reductions at one and four threads, as the plan has it. He is told now that at 16 the model's width-16 reductions run in sequence. Recommended: the mechanism is right, the value is one line, and no measurement before the switch-over can choose it (P-29).
- (b) Lower the constant now, to 8 or 4, so that a width-16 reduction forks. It moves microGPT's last bits again, and the measured value may move them a third time.
- (c) Give the measurement a rung now, under walk at one and four threads over 4, 8, 16 and 32. Walk's time decides nothing by P-29, so this would answer only whether the checks stay 7 of 7.

**Finding 2. Fork N1 as landed initializes every used component at every start, and its cost after the switch-over is not known.** Section 2 gives what landed. Two things bear on his aim of microGPT compiled and fast:
- Each start reads the constant pool of every class in every used component's jar. Today that costs about 40 ms over the prelude's few jars. After the switch-over the jars are the one library's, far larger; nothing measured it.
- Every numeral's place of every used component is then filled on one thread before `run`, in the order of the jars.
The options:
- (a) Keep it as landed, and measure a compiled program's start in the first batch that runs on the one library. Recommended: rows 971 and 979 are closed by it, 12 of 12 runs pass, and the cost is small today.
- (b) Keep the root task, and have the code generator write the list of a program's components into its class, so that the start reads no jar. N named this way and did not take it, since it edits `compiler/codegen/`.
- (c) Initialize so only the classes that hold a numeral's place, and leave the others to their first use. It keeps the old order of effects for every other component, and makes two rules.
- (d) Go back to initialization at first use, and repair row 979 in `BaseTask`: no fork while a class initializes.

**Finding 3. Three readings of P-175 by rung P landed without reaching him.** P's worker and skeptic each returned an empty list for him, and the gather's list holds no item of P's.
- A group that a `VirtualMachineError` leaves does not join its arms (`CodeGen.java:1669-1674`). P-175 asks that a group "join every arm before it completes abruptly". The worker's ground is measured: with the joins, a stack overflow left the program waiting without end.
- The exceptions of the arms after the first that threw are dropped, and the paths can differ on which one leaves (section 1, item 10).
- Arguments fork only where the analyzer marks them, and the analyzer adds a function's name when it reaches its declaration, so a call of a function declared later in the file is not judged worth a task (P's skeptic). The plan put the analyzer's defect "on the review list with fork P2"; it is on no list.
The options:
- (a) Confirm all three as landed, and file the analyzer's defects as a ledger row with a parked line for the batch after the switch-over, where the one library's reductions are first measured. Recommended.
- (b) Have the group cancel its arms on a JVM error, in a later rung.
- (c) Repair the analyzer before the switch-over, which changes which tuples and operators fork today, a reserved point of rung P.

**Corrections, sentences that the landing made false and the gather did not reword** (home: the record-landing workflow, by `record.py`; Part 3 has the skill's):
- **P-175** (`POSITIONS.md:31`): "the code generator evaluates a call's arguments in order (F-19, row 951)"; "under the team's comment "Why isn't this parallel???" (`compiler/codegen/CodeGen.java:7068`)", a comment that the tree no longer holds; "which the compiled path does not do (`CodeGen.genParallelExprs` joins on the normal path only, row 947"; "and splits down to single elements (`Library/RangeInternals.fss:1308-1342`)", now chunks of 16 at `:1312-1350`. The review's item review.1 names three of the four.
- **P-174** (`POSITIONS.md:105`): "Rows 960 and 974 hold where the tree departs ... and walk running a numeral type written as a static argument or as a type that an object or a trait extends". Row 974 is closed; the departure that stands is row 981, a `comprises` clause.
- **P-176** (`POSITIONS.md:106`): "Rows 957 and 971 hold where the tree departs: ... and a coercion that spawns a task". Row 971 is closed.
- **FACTS, moved citations in entries that the batch did not rewrite** (`moved.py`): F-302 `CodeGen.java:5527-5534`, now `:5595`; F-268 `:6250-6255`, now `:6318`; F-315 `:3029-3031`, now `:3087`; F-337 `InstantiatingClassloader.java:2897-2919`, now `:2969`; F-175 `changes.tex:3346-3542`, now from `:3345`.
- No FACTS entry names a row that this batch closed as open: F-19, F-134, F-347 and F-348 to F-351 state the landed tree, and the landing check prints no finding.
- **`BOOT.md`**: "The run's agents wrote 3.13M tokens"; by `spend.py`'s method, 2.92M.

**Confirmations:**
- No line of a team test changed, and no model line (`git diff --stat 9d0147ff9e d89fc0fda4 -- explorations/run-c4/src explorations/apl/mg` prints nothing).
- Every closed row names a landed commit and a gated test; `ledger.py landing-check` printed 'no finding' at the gather and after the review.
- No rung edited a file that another rung's section names as that rung's: P's and X's hunks in `CodeGen.java` and `BaseTask.java` applied with no conflict.
- The team's files edited: `Library/RangeInternals.fss` (8 lines), the prelude's two files (4 lines), the two comments of `Library/CompilerLibrary.fsi` and `.fss`, and the Java of the run time, the code generator and walk.

## Part 2. Did the practice hold

### The practice's measures, batches 26 to 30

(B26; B27; B28; B29; B29b; B30.)
- Written: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M; 2.92M.
- Launches lost to restarts or the disk: 0; 8 and a gate, 0.42M; 0; 0; 0; 0.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M; 0.97M.
- First calls: 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold; 1.12M, 10 cold; 0.63M, 8 cold; 0.65M, 7 cold.
- Cache refills: 1, 94K; 0; 1, 204K; 0; 0; 0.
- Refusal cycles: 0; 3 rungs, 231K; 1 rung, 164K; 2 rungs, 314K; 0; 0.
- Rulings and repairs on the merged tree: 0; 368K; 0; 415K; 0; 0.
- Skeptic fix commits (defects): 2 (0); 9 (1); 16 (1); 25 (10); 7 (2); 8 (2).
- Distance: 0 every time.
- Count stage at the gate: 180 s; 80 s; 99 s; 125 s; 104 s; about 70 s.
- Distance stage at the gate: 246 s; 144 s; 205 s; 224 s; 190 s; 128 s at 0.14 beside `testFast`.
- Skill's load: 13.9 %; 16.0 %; 16.5 %; 12.9 %; 10.6 %; 16.0 %.
- Briefing, estimated: 5.2 %; 6.2 %; 3.1 %; about 3.6 %; 2.7 %; 4.9 %.
- microGPT quick pair: 7 of 7 both, each time.

### Climb batch 29b's process findings, a batch later

1. A worker's workaround of a widened defect reaching no one: **not met**; no rung worked around a defect. Rung P left `NumeralStaticDesignCompiled` red on its branch and said so.
2. A probe's claim taken as built: **held**. The check before the launch built a prototype of the planner's way for row 971 and found its hang.
3. One code state run three times: not met, three code rungs.
4. A row rewritten without its reproducer: **taken up**. Row 960's reproducer is written again and shown to fail for the row's reason.
5. P-37's exception read narrowly: **taken up**, by rung N.
6. The estimate: **not taken up**, and wider: 47 % under, against 23 %.
7. The coordinator's own JVM runs during the run: held. Its commits in the main tree during the gather are this batch's slip (section 6).
8. The gate's load at a stage's end; `spend.py`'s header naming no landing folder; `File`, `Reader` and `System` outside the distance: not taken up.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The manifest said that each rung lands on its own, and rung P needed both others.** `CLIMB-BATCH-30.md`, section 1: "lands only with: none. In each run every rung lands on its own." P's `NumeralStaticDesignCompiled` is green only with N's root task, and a `try` around a group in one function joins the arms only with X's order of the exception table. P's skeptic approved with one suite failure for it. Had N or X been refused, P would have landed with a red test. P found both by building a merge of its own, outside its brief. Proposed (mine): the planner's probe for a rung that makes more programs fork runs the batch's existing compiled tests with the fork forced, and names each dependence as `landsOnlyWith`; a rung that suspects a dependence reports it and does not build the merge. Home: the manual's "Preparing a batch record"; the rung's brief.
2. **A commit and a push in the main tree while the gather ran.** Section 6. Proposed (mine): a check that does not rest on memory: the coordinator's push command, or a `pre-push` hook of the main tree, refuses `main` while the check-in file names a run whose journal has a `started` line for the gather and no `result` for the commit stage. And the gather's and the review's briefs say "nothing is pushed" only after `git rev-parse origin/main` shows it. Home: `references/batch.md`, "While it runs"; the script's gather and review roles.
3. **A fork's promise of what a program sees was not checked at the landing.** Fork N1 promised the same output in the same order; the landed way changes it for a used component's coercion, and costs 40 ms a start. The skeptic found both; the gather filed the question and not the broken promise. Proposed (mine): the gather compares each fork's "what a program sees" with the rung's points to report and names each difference in the item for him. Home: the gather's brief.
4. **A rung with decisions against a decision's words returned no item for him.** Rung P, finding 3. Proposed (mine): the skeptic's brief asks, for each of the worker's decisions that names a decision on record, whether its words are kept, and files an item where they are not. Home: the skeptic's role.
5. **The demos and the microGPT pair run by rungs again** (section 5). Proposed (mine), as climb batch 29's finding 9: each rung's section says that the demos are the gather's and the quick pair the commit stage's, and a rung that edits the one library runs `ant testSystem` in their place. Rung P ran the first two and not the suite.
6. **The stages run again on a state that they do not read** (rung P). Proposed (mine): the rung's section says that the stages run once, after the last edit of what they read: the checker, the parser and the one library.
7. **The estimate, on Fable.** 5.5M and 7 h against 2.92M and 4 h 03. Proposed (mine): for run 2, take this run's figures: a worker 0.28M to 0.43M, a skeptic 0.27M to 0.32M, the fixed roles 0.9M, so about 2.4M for three rungs with their skeptics, and about 3 h 30.
8. **The atomic runs' list lacks two of the batch's race tests.** `AtomicNestedReadsKeptCompiled` (X's skeptic) is in no list. `ForkedArgumentsStackOverflowCompiled` cannot join as it is: it asserts a non-zero exit, not `PASS`.
9. **Carried over:** climb batch 29b's findings 6 and 8.

### Misses, by kind

Numbered on from `batch-29b-review.md`'s 1060.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before landing:**
  - 1061, the planner's way for row 971, a thread of the program's pool, which hung 12 of 12 (the check before the launch);
  - 1062, "lands only with: none" (rung P, its skeptic);
  - 1063, fork N1's "the same output in the same order" (N's skeptic);
  - 1064, row 958's note gave a mechanism that walk does not have (rung N);
  - 1065, the expected counts of the gate (nine new compiled tests against thirty-three; `ArrayStoreJUTest` 7 against 8).
- **A defect of a change, caught before landing:**
  - 1066, the joins waiting without end after a stack overflow (rung P's own probe);
  - 1067, row 967's repair missing a radix-point numeral at `RR64` (N's skeptic);
  - 1068, a binding named `n`, `r` or `v` failing verification once arguments fork (P's skeptic).
- **A defect of the tree found and filed, not the batch's:** 1069 to 1075, rows 980 to 986.
- **A test that reached too little:**
  - 1076, a nested block's reads handed outward, changed with no test (X's skeptic);
  - 1077, two late assertions of `NumeralLeftOfRR32Walk` seen passing only (N's skeptic);
  - 1078, row 497 closed with two of its cases in no gated test (review-routed.1);
  - 1079, row 947's same-function case, addable only on the merged tree (the gather).
- **Sentences made wrong, caught:**
  - 1080, three sentences of N's report, record and Appendix I on the eager initialization, and the ground of row 958's repair (N's skeptic);
  - 1081, the Effect without row 981 (the gather);
  - 1082, the record's branch lines, F-134, rows 640 and 948, and one quotation (the review);
  - 1083, P-174's and P-176's row sentences (the review).
- **Process:**
  - 1084, the push of 11:46 (the coordinator, told);
  - 1085, the stages, the demos and the quick pair run again (section 5);
  - 1086, tests carrying more than one comment line, in six files (the skeptics).

Found by this review:
- 1087, at a grain of 16 the model's width-16 reductions do not fork (finding 1);
- 1088, the eager initialization's cost after the switch-over, unmeasured, and the jar scan at each start (finding 2);
- 1089, rung P's three readings of P-175 on no list of his (finding 3);
- 1090, the gather's and the review's "nothing is pushed", false from 11:46, and the commit stage's '[ahead 2]' unremarked (section 6);
- 1091, a hold could have held only three commits of the record (section 6);
- 1092, rows 982, 983 and 640 with no home in PLAN, and the batch's forks in no review-queue entry (Part 4);
- 1093, P-175's cited comment gone from the tree, and its range citation moved (Part 1);
- 1094, five moved citations of FACTS (Part 1);
- 1095, rung P's trial merge of its siblings' branches (section 5);
- 1096, row 957's planned repair fills a place when an instance's class loads, outside N's root task (Part 5);
- 1097, the equality rung edits the half of `bestMatchForNumerals` that rung N was told to keep (Part 5);
- 1098, the boot note's 3.13M.

**Against the earlier notes.** 26 misses were found before the launch or inside the batch (1061 to 1086), seven of them defects of the tree that the batch did not make, against climb batch 29b's 20 for two rungs. No departure from a decision of his landed. Three readings of one decision reached him on no list.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false, read on `main` at `855d629c3b`. The proposed wording is mine; the writer keeps the skill's form.

**False:**
1. `references/compiler.md:106`: "In a `try` nested in another `try` of one body, the outer `try`'s `catch` clause is matched first (ledger row 888)." The inner `try`'s clause is matched first; the sentence goes.
2. `references/compiler.md:109`: "A numeral coercion whose body spawns a task fails the component class's load: 'Thread cannot be cast to FortressTaskRunner' (ledger row 971). ... Bind each call in a statement of its own ...". The bullet goes; what holds is F-348: the classes of a program's components are initialized before `run`, so a coercion's side effect comes before the program's first line.
3. `references/compiler.md:110`: "Until the switch-over, `RR64` converts only an `RR32` and a numeral with a radix point, and `RR32` only such a numeral. So `r: RR64 = 3` is refused, and so is a `ZZ32` value where an `RR64` is expected (ledger row 442). Write `3.0`, and `i.asRR64` for a `ZZ32` value `i`." A numeral converts, with or without a radix point; a `ZZ32` value is still refused.
4. `references/interpreter.md:20`: "A float numeral to the left of an `RR32` operand runs `RR64`'s operator ... (ledger row 958). Bind the numeral at `RR32` first ...". It goes.
5. `references/interpreter.md:24`: "A numeral that rounds to an infinity at `RR32` or `RR64` gives `Infinity`, with no error (ledger row 967)." At a typed place walk refuses it when the place runs. Where nothing fixes a type, both paths give `Infinity` (row 980).
6. `references/interpreter.md:25`: "A numeral type written as a static argument, or as a type that an object or a trait extends, loads and runs ... (ledger row 974)." Walk refuses both at load with the checker's message; a numeral type in a `comprises` clause loads and runs (row 981).
7. `references/revival-changes.md:89`: "Walk gives `Infinity` for the second (row 967)." It goes. In the same paragraph, "by walk when the binding runs, with 'Type mismatch binding' and the numeral" holds for a top-level binding only: a local binding and a parameter give other messages (section 1, item 6).
8. `references/gate.md:47-51`: "The atomic runs compile fourteen programs, and run each one three times at four threads, in about a minute", and the loop's list of fourteen names. Twenty-two programs: the list gains `AlsoArmThrowsJoinsCompiled`, `CallArgumentsForkCompiled`, `AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled` and `AtomicThrowRevertsCompiled` (`climb-batch-workflow.js:1154-1156`).

**Incomplete, on no list:**
- `references/revival-changes.md:95`: "Where several declarations apply only by coercion and none is more specific, both paths stop: "Ambiguous coercion"." It still holds where no declaration is the most specific; under walk a chain of coercions now has one (F-349).
- `references/tests-writing.md:137`: a test of parallelism under walk needs a range longer than 16, since a parallel `ZZ32` range of sixteen elements or fewer runs its bodies in index order (F-19, F-350).
- `references/compiler.md`, "Traps of the compiled path": a call's arguments may run at once where two or more are calls of the program's functions, so a compiled test must not rely on their order (F-350); a variable written in an `atomic` block before a `throw` keeps its old value, and an `atomic` block or a `try` as a call's later argument still fails verification (row 322, `XXXAtomicBlockLaterArgument`).
- `references/session.md` or `records.md`, "Timings": a compiled program's start costs about 40 ms more than before `f36a651243`, so a timing of a compiled run compares only with one taken after it.

**Sentences that hold, met by the batch:** `SKILL.md:111`, "the arguments and operands of a call can run at once", now true of the compiled path too; `references/compiler.md:40`, "`atomic` used as an expression", and `:75`, the mutable variable's cell, until run 2; `references/interpreter.md:21`, row 960, until run 2.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home.

**Items for him: all have a home.** The thirteen ids of the rungs and the gather, review.1 and review-routed.1 are lines of `PLAN.md:765-777`, "Climb batch 30, listed for his review". None is unrouted (`curatorUnrouted` is empty in the gather's result).

**Open rows:**
- 980 (`PLAN.md:770`), 981 (`:771`), 984 (`:772`), 985 (`:774`) and 986 (`:775`): parked lines.
- 322, rewritten: run 2's rung Y, step 4. 960: run 2's rung C. 957 and 963: rung C. 973 and 966: run 2's equality rung.
- 442 and 466, rewritten: their lines of PLAN stand; each ends at the switch-over.
- **982, 983 and 640 have no home.** No line of `PLAN.md` or of `review-queue.md` names them. Owed: 982 with PLAN's phase 6 line on parallel reductions (`PLAN.md:119`), since it ends at the switch-over and its check is that batch's measurement; 983 and 640 as parked lines.
- 948, 953 and 876 (D1, D2 and the current task): the plan's home is "Pavol's answers", as questions not yet asked; 953 and 876 are not in PLAN yet.

**Record defaults: none is in the review queue.** `review-queue.md` holds no entry of this batch. The plan said of fork G that it "is named to the curator at the landing and goes on the review list", and of the twenty others that each "lands with its default and goes on the review list". Owed, each as an entry with its default as landed: G (with finding 1), N1 (with finding 2 and `PLAN.md:769`), N2, N3, N4, P1 to P4 (with finding 3 and the analyzer's defect), X1 to X5, B1 and B2.

**The step that the review routed: it belongs to run 2.** One compiled test with row 497's two cases that no gated test holds, a named `typecase` clause in an arm after the first and a local that a nested `also` reads, seen passing at one thread and at four (`PLAN.md:777`). Its home is rung Y, which works in the same code.

**PLAN lines that the batch built or made stale** (the plan's "After the landing"):
- "Where we stand": climb batch 30's gate as the last landed (`d89fc0fda4`).
- Phase 4: one line for climb batch 30, with its landing commit and this review; its line on row 971 struck.
- Item 74 answered (row 933's rung is X); items 78 and 79 answered by N; item 76 narrowed to rows 962 and 446.
- `PLAN.md:119`, the phase 6 line on parallel reductions: the joins, the forked arguments and the grain's mechanism landed before the switch-over; what stays for the first batch after it is the grain's value, its measurement on compiled reductions, row 982's end and the analyzer's judgement.
- Review-queue items 408, 488 and 489 answered; item 449 reworded to what stands; item 487 answered by his word of 11:3x, to POSITIONS before run 2.

**POSITIONS and FACTS:** Part 1, "Corrections". **The skill:** Part 3. **The manual and the script:** process findings 1 to 8.

## Part 5. What changes run 2's plan

`CLIMB-BATCH-30.md` wrote run 2's sections against the base `9a0f69e01a` and says that they are read again on run 1's landed tree. What the landed tree changes:

**Line numbers that moved** (`map.py`, base to `main`):
- `compiler/codegen/CodeGen.java`: the fields' declarations `:4788-4800` are `:4850-4862` (Y's file list); the comment that names `IntLiteral`, `:6482`, is `:6550` (C, step 4); the numeral sites `:7224-7450` are `:7298-7524` (Y's and C's overlap note); `numeralCoercionSiteDesc` is at `:7298`; `forAtomicBlockHelper` is at `:1822`, `forAtomicBlock` at `:1835-1867`, `forTry` at `:2157`.
- `runtimeSystem/BaseTask.java`: `startTransaction` `:180` is `:200`; `leaveTransaction`, new, is `:293-314`.
- `Specification/appendices/changes.tex`: the Effect's clauses that C edits, `:5294-5304`, are now `:5300-5310` (row 960 at `:5300-5302`, row 963 at `:5303-5305`, row 957 at `:5305-5308`); the clause of rows 966 and 973 is at `:5286-5298`; row 981's clause, new, stands between at `:5302-5303`.
- `interpreter/evaluator/values/Numerals.java`: every line below `:301` moved, by 31 to 38 (`exactAt` `:486-526` is `:524-564`).
- `interpreter/evaluator/Evaluator.java`, `VarCodeGen.java`, `nodes_util/ExprFactory.java` and `scala_src/typechecker/impls/Misc.scala` are unchanged, so Y's and C's citations of them hold.

**Rung Y.**
- It builds on what X landed: the handler takes every exception (`CodeGen.java:1854`, an entry with no type), `BaseTask.leaveTransaction` decides between a restart and a throw, an abort names its transaction (`TransactionAbortException.transaction()`), and the outermost block takes every abort. A `tryatomic` needs a third answer for an abort of its own transaction: `TryAtomicFailure`, not a restart. X's item X.2 (a nested block that an exception leaves may start again in place of throwing) bears on it.
- Its entry for a `tryatomic` and an `atomic` expression follows the body's code, as X's entries do.
- **Step 4 changes.** Fork Y3 says "built only if it reproduces". Rung P reproduced it and left the expected failure `compiler_tests/XXXAtomicBlockLaterArgument` with `AtomicBlockLaterArgumentLink.test`, and row 322's whole new line. So step 4 is: promote that test.
- It takes the routed step: row 497's two cases, one compiled test.
- Arguments fork now (`CodeGen.evalArg`, `:7132-7205`), so Y's tests that pass two calls as arguments run them at once at four threads.
- The atomic runs: `AtomicNestedReadsKeptCompiled` joins the list with Y's three names, twenty-six programs.
- The boot note names one more: fork Y2 needs a look at the one library's `var` fields.

**Rung C.**
- **Row 957, by reading: the planned repair fills a place outside N's root task.** Fork C1 puts one static final in each instance's class, "made when that instance's class loads". N's root task initializes the component classes that the jars name (`InstantiatingClassloader.java:185-248`); an instance's class is made by the class loader at its first use, on a worker of the program's pool of four. Since rung P landed, a coercion with two calls among its arguments forks there. C's section should add a test of a place at a type parameter whose coercion passes two calls of the program's functions, at four threads, under `timeout`, as N's row 979 test was seen.
- The Effect of `revival-numerals` is one paragraph that C and the equality rung both edit, their clauses two lines apart. Give the paragraph's clauses to one of the two rungs, or name the order and expect the gather to merge by hand.
- C's comment at `CodeGen.java:6550` is in the code that P's hunks moved, not changed.

**The equality rung, way B.**
- **Its walk half edits what rung N was told to keep.** Way B has a numeral go to the most specific declaration that takes it, by its own conversion if need be, where today a declaration that fits the numeral as it is runs first. That rule is the first half of `bestMatchForNumerals` (`OverloadedFunction.java:2306-2317`), which N left unedited as a reserved point, and whose comment states the old rule. F-349's last sentence, "Walk's rule that a declaration that fits a numeral as it is runs first is apart from it", becomes false when the rung lands.
- It shares with what N landed: `OverloadedFunction.java` (`bestMatchWithCoercion` at `:2356`, `mostSpecificThroughOthers` at `:2418-2438`), `Numerals.java` (`fitsAsIs` `:299`, the dispatch cache's keys `numeralKey` `:692` and `rangeKey` `:705`, which must tell apart what way B tells apart) and `FType.typeMatch` (`:108-115`, the skeptic's refusal of a numeral that rounds to an infinity).
- It shares the checker with C by folder, not by file: `Functionals.scala` against `Misc.scala`. Both run the count and the distance stages and P-148's timing, and each one's skeptic runs the count stage itself.
- `Equality[\T\]` gains `=/=` in the one library, so its tests include `ant testSystem`. The prelude's own `=/=` is not the numerals' exception to P-37; the plan must say whether the prelude changes, since row 966 is the compiled half of the same answer.
- It promotes `tests/XXXNumeralEqualsNumberWalk.fss` and `tests/XXXNotEqualNumeral.fss`, and edits `Specification/basic/conversions-coercions.tex:107-117`, in the file where N changed `:91-93`.
- Before it is briefed: his answer of 11:3x goes to POSITIONS by a record writer (P-46, P-49 and P-173), as the held list's first line of "Held in chat (2026-11-10)" says.

**The run's frame.**
- The base build: `fortress-base31` is at `9a0f69e01a`, older than the landed code; run 2 needs its own.
- The gate's comparands are this run's tables: `CompilerJUTest` 1,558, `testSystem` 830, `ArrayStoreJUTest` 8, 22 atomic programs.
- The estimate: process finding 7.
- Three rungs, two of which edit the checker and one the one library: the rule on merge risk (`references/batch.md`, "The go") is met if the Effect's paragraph has one owner.

### The steps due before the next batch

1. **His word on findings 1, 2 and 3**, or the standing defaults: each landed at its default, can be undone, and holds nothing.
2. **The record-landing workflow** (`tools/record-landing/README.md`; `args: { batch: '30', base: '9d0147ff9e', landing: 'd89fc0fda4' }`). It routes Part 4, rewords P-175, P-174 and P-176, moves the five citations of FACTS, and runs the orientation and the skill updates with Part 3's list.
3. **The routing that no list holds yet:** rows 982, 983 and 640; the review-queue entries of the batch's forks; the analyzer's defects as a row.
4. **His numeral rule into POSITIONS** by a record writer (P-46, P-49, P-173), before run 2 is briefed.
5. **Run 2's record read again on the landed tree** (Part 5): Y's step 4 and the routed test; C's test of a place in an instance's class at four threads; the Effect's owner; the equality rung's section with the reserved rule lifted; the line numbers; the estimate.
6. **The script, between batches:** process findings 1 to 8; finding 2 first, since it guards the push.
7. **Run 2's own base build** at the landed head, the atomic list's four names, the check by a fresh reader, the launch.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I read the run's transcripts through scripts and the journal's results, and the coordinating session's transcript for the minutes from 11:33 to 12:35 and for its own writes by model. For the two spans before the run I read only the transcripts' labels, times, models and writes.
- These are by reading, not run:
  - that microGPT's width-16 reductions go through `CompactFullParScalarRange` and so no longer fork (finding 1);
  - the start cost of the eager initialization on the one library (finding 2);
  - that a place in an instance's class is filled outside the root task (Part 5, rung C);
  - which half of walk's dispatch way B changes (Part 5).
- I did not check each of the rungs' reported runs against their logs; the skeptics and the merged-diff review did, and I cite them.
- I did not run `record.py check` or `ledger.py landing-check` again; the review's runs after its commit are cited.

## For the curator

Climb batch 30 ran on 10 November from 08:41 to 12:43 UTC and is pushed. All three tasks landed.
- **Parallelism on the compiled path.** When several parts of an expression run at once and one of them throws, the compiled program now waits for the others before the exception goes on. A call's arguments now run at once where two or more of them are calls of the program's own functions. The interpreter's library now stops splitting a parallel range at 16 elements and runs each such chunk in order.
- **Transactions on the compiled path.** An `atomic` block runs as a transaction: its changes take effect together, or it starts again. Six defects are repaired. A block that reads what it wrote now ends. A block inside another block now starts again by itself. An exception that leaves a block undoes the block's changes.
- **The numerals' leftovers.** `x: RR64 = 3` now compiles, as it already ran in the interpreter. A conversion from a numeral that starts parallel work no longer stops or hangs a compiled program. The interpreter now refuses a numeral too large for its type, and its dead code of the old numeral objects is gone.
- All tests passed, the checker count and the distance stay at 0, and the quick microGPT check passed 7 of 7 for both programs.

Three points need your word. Each landed at its default and can be changed later.
- **The grain size is 16, and the model's vectors are 16 wide.** The grain size is the number of elements at which a parallel range stops splitting. At 16, a sum over a vector of the model's width runs in order and starts no parallel work. I recommend keeping 16 until it can be measured on compiled code, after the compiled path moves onto the interpreter's library.
- **A compiled program now prepares every component that it uses before it starts.** A component is one unit of Fortress code. This closed two defects. It costs about 40 ms at each start today, and its cost on the interpreter's larger library is not measured. I recommend keeping it and measuring it then.
- **Three choices in the parallelism task did not reach your list.** After a stack overflow the program does not wait for the other parts. When two parts throw, only the first one's exception is kept. Which arguments run at once follows the old analyzer, which misses a function declared later in the file. I recommend confirming all three as landed.

One event to know. While the batch was merging its tasks on the main copy, the coordinating session committed its notes on top and pushed. So the merged code was on GitHub 55 minutes before its tests ended. Nothing went wrong: the tests passed and nothing was held. Had the tests failed, or had a change needed your go, the code would already have been there. The session now reads the batch's log before it commits, and I propose a check that refuses such a push.

The cost, in tokens written:
- the landing work of batch 29b: 5.55 million;
- the preparation of this batch: 2.33 million, of which the plan and its check were 0.73 million;
- the run: 2.96 million in its span, 2.92 million by its own eleven agents, against the plan's 5.5 million, in 4 h 03 min against 7 hours.

All six agents that were given a briefing read all of it, within their first minute.

For the next batch, 30b, the plan needs four changes: one of its `atomic` steps is now a test to promote; its numeral task needs one more test at four threads; two tasks edit one paragraph of the specification and need one owner; and the task on `u = 0` changes a rule of the interpreter that this batch was told to keep, which your answer of this morning allows.

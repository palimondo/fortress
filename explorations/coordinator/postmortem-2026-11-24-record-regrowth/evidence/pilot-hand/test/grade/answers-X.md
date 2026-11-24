# Answers to questions-q.md (reader in /home/user/record-test-q)

All paths below are relative to /home/user/record-test-q. Nothing was built, run or edited.

---

## 1. Two failures that the suite does not show

**Decision.** Neither failure is yet shown to be a defect of my change. The compiled `StackOverflowError` is a gap the record knows: row 640. The walk `OutOfMemoryError` is not yet classified. It is either a regression of my change at walk's 256 MB default heap or a near-limit case of the kind F-107 describes. One paired measurement settles which.

**Compiled failure.** `FORTRESS_THREADS=4 bin/fortress run DeepForkRungX` with no `JAVA_FLAGS` runs `bin/run` at `-Xmx1536m` (`bin/run:33-34`). It sets no `-Xss`, so the worker threads get the JVM's default 1 MB stacks. That is row 640's setting exactly: a 1,000-deep forked recursion overflows in 8 of 12 runs, and passes 12 of 12 with `-Xss64m` or at one thread. 5 of 8 is the same rate. `testFast` passes because `fastTrack` pins `JAVA_FLAGS=-Xmx4g -Xss64m` and `FORTRESS_THREADS=4` (`build.xml:1257-1259`; F-99, P-125). Next:
- Run `FORTRESS_THREADS=4 JAVA_FLAGS="-Xmx4g -Xss64m" bin/fortress run DeepForkRungX` 8 times and expect 8 of 8.
- Run the same 8 runs at default stacks on the base, with a test that exists there, or with `TimingRungT`. This shows whether my run-time change raised the rate (row 640 notes that "the frames per Fortress call were not measured").

If the rates match, the failure is row 640, and I add a note to the row that `DeepForkRungX` also meets it. If my change clearly raises the rate (more stack frames per fork or join), that is a finding of my change, and I report it with the numbers.

**Walk failure.** `bin/fortress tests/DeepForkRungXWalk.fss` with no `JAVA_FLAGS` gives walk 256 MB and 32 MB stacks (`bin/fortress:28-29`, row 67). The harness runs the same test at 768 MB (`junitMem`, `build.xml:141`), which is why `testFast` passes. This is F-107's case: a gated walk test can pass at 768 MB and 4 GB and die at 256 MB, and F-107 says to measure a claim about a walk failure near a memory limit at 256 MB. On the base the same command ran to its end, so the result points at my change.

One thing does not fit. A run-time rung's fix is in `runtimeSystem/`, which walk does not run (F-179). Unless my change also touches a shared phase, a `nativeHelpers` class or the library, the difference may come from the conditions of the two runs rather than the code. Possible causes are a first run that rebuilt walk's caches, or a thread count of half the CPUs when `FORTRESS_THREADS` is unset. Next, with everything else held equal, run base and change alternately, about 5 times each, with `FORTRESS_THREADS=4`, no `JAVA_FLAGS` and caches already warm:
- If only the change dies, it is a regression of my change at 256 MB. I find what my change touches on walk's path, record it as a defect and report it.
- If both die intermittently, the twin sits at walk's default limit. I record that, with a ledger note on row 67 or F-107's evidence, and shrink the twin so that it is not a near-limit test.

**Report lines.**
- "Compiled run outside the suite: `FORTRESS_THREADS=4 bin/fortress run DeepForkRungX`, no `JAVA_FLAGS` (bin/run: -Xmx1536m, 1 MB thread stacks): StackOverflowError in 5 of 8 runs. This is row 640's shape and setting. With the suite's `JAVA_FLAGS=-Xmx4g -Xss64m`: N of 8 pass. Base at default stacks: M of 8. [Same rate: row 640, note added. Higher: finding, frames per fork raised by this change.]"
- "Walk twin outside the suite: `bin/fortress tests/DeepForkRungXWalk.fss`, no `JAVA_FLAGS` (256 MB, F-107): OutOfMemoryError. The base ran to its end with the same command. Paired runs at 256 MB, FORTRESS_THREADS=4, warm caches: base a/5, change b/5. [Regression of this change / near-limit case, both trees.] The suite's pass at 768 MB does not cover 256 MB (F-107)."

Sources:
- `explorations/fortress-gap-ledger.md` row 640 (via `facts-extract.sh 'ledger:640'`): the known overflow at 1 MB stacks, four threads.
- row 67: walk's 256 MB default.
- F-203 and P-125 (facts-extract): `env.sh` and the thread pin.
- `bin/fortress:28-29`, `bin/run:33-34`: the defaults actually in force.
- `build.xml` (grep `FORTRESS_THREADS`, `Xss64m`, `junitMem`): what the suite pins.
- F-179 (as quoted in scenario 3): walk and the runtime are separate copies.

---

## 2. A closed family covered by a generic body

**Decision.** The refusal of `HImpl` is a known gap: row 728, which has exactly this shape, `g[\T extends Side\](self, x: T)` under `g(self, x: Side)`, with "does not define an abstract method declared in type H". It is gated by `tests/XXXAbstractMethodGenericBodyWalk.fss` and is a defect of walk (F-145). Walk refuses it at `Constructor.checkForDef`/`definedBelow`. The compiled path runs it, as my compiled test shows: the single body covers without a split, so row 725's limit does not bite. My brief does not give me walk's evaluator, so I do not repair it.

**How to write `HImpl`.** Use the plain case of P-147, a body at the abstract method's own parameter type: `g(self, x: Side): ZZ32 = 1`. Walk and the checker both accept it. An alternative that also lands is two bodies, `g(self, x: Ping)` and `g(self, x: Pong)`. They cover through `Side comprises { Ping, Pong }` on both paths (P-147; `tests/AbstractMethodCoveredWalk.fss`, `compiler_tests/AbstractMethodCoveredPairs`), and they also have no static parameter of their own, so neither row 728 nor row 725 applies. If the body really needs `T`, that need is a point for the report: the library cannot use the generic body until row 728 is fixed.

**`Wrap`.** Its walk run shows nothing about completeness. Walk does not check generic objects at load (row 665, `XXXAbstractMethodUndefinedGenericWalk`: `declared = !(selfType instanceof GenericTypeInstance)`). By P-147, `Wrap` does not define `g`, so it is incomplete. That is a defect of my change, not of walk. I give `Wrap` a body `g(self, x: Side): ZZ32 = ...`. I also add `Wrap` to my compiled test, so that the compiled checker, which reads generic declarations, checks it too.

**Report lines.**
- "Walk refused `HImpl` with the generic body `g[\T extends Side\](self, x: T)`: row 728 (known; XXXAbstractMethodGenericBodyWalk). The compiled test ran it. Not repaired: walk's evaluator is outside this brief."
- "Decision: `HImpl.g(self, x: Side)`, a plain body. Alternatives: the generic body (blocked on walk by row 728); `Ping`/`Pong` bodies covered by `comprises` (valid on both paths, P-147). No curator decision covers the choice. It follows P-147's plain case."
- "`Wrap[\T\]` lacked `g`. Its walk test passing proves nothing (row 665: walk skips generic objects). Fixed by adding the body. The compiled checker checks it in [test]."

Sources:
- `facts-extract 'ledger:665'`, `'ledger:728'`, `'ledger:725'`, `'P-147'`: the rows and the rule.
- `ls ProjectFortress/tests | grep AbstractMethod`: the gating and XXX tests exist.

---

## 3. A rung on the transaction check of `var` fields

**Answer to the curator.** The rung cannot be cut as you word it, for three reasons.

1. "Outside `atomic`" is a run-time fact, not a place in the source. The specification makes every read and write "which occur as part of this evaluation" of an atomic body atomic, against any action "dynamically outside" (`Specification/basic/expressions/atomic.tex:38-41`). A method that reads `self.n` cannot know at compile time whether some caller up the stack is inside `atomic`. The per-access `BaseTask.inATransaction()` check is how the code finds out. A plain JVM field with no check would reopen row 319, a var field outside the transaction, which the cell repaired. `compiler_tests/AtomicFieldCompiled` would fail. A plain field captured by a loop body or a closure would also bring back the copied-field bug that `VarFieldCapturedCompiled` gates (rung-atomic-expr-field REPORT, "Defects", item 3).
2. The walk half has no ground. Row 641 is compiled-path only: under walk its probe did not even load. Walk's tasks and transactions are a separate implementation (F-179), and the record holds no measurement of a walk var field's cost. Keeping the two paths alike is no reason to change walk's code without a measured cost and its own test.
3. The representation is still open in the record. F-374: "The batch's planner chose the cell as a default, and the curator has not decided it."

There is also a matter of payoff. microGPT has no object `var` fields. Its mutable state is three locals, `p`, `m` and `v` (`explorations/run-c4/src/MicroGptFlat.fss:83-89`). Row 641's measured cost is on locals: 64 % of the array loop, 9 to 15 % of the scalar loop. Its "Not measured" list names a `var` field.

**What you must decide first.** Whether the cell stays as the representation of a `var` field (F-374's default). Second, whether an `atomic` block must keep covering accesses made in code it calls, which `atomic.tex` says it must, so that any cheaper scheme still gives that guarantee.

**A rung that can be cut now.** A measurement rung, possibly followed by a check that costs less but means the same. Key lines of its brief:
- May change: `runtimeSystem/BaseTask.java`'s `inATransaction` path and `compiler/codegen/VarCodeGen.java` (`MutableStaticBinding`, `MutableFieldVar`, `LocalMutableVar`, `MutableTaskVarCodeGen`), and new tests under `compiler_tests/` and probes under `explorations/perf-probes/transactions/`.
- Must keep: an `atomic` block tracks every `var` field, local and top-level `var` that its dynamic extent reads or writes. A task or closure captures the cell. Gates that must stay green: `AtomicFieldCompiled`, `VarFieldCapturedCompiled`, `AtomicExprCompiled`, `ExitOutOfAtomicCompiled`, and the four-thread atomic runs (`gate.md`). No change to walk.
- Before: row 641's numbers, the array loop at 23.17 ns against 8.39 ns an element with the check removed, and no number for a var field. Time a var-field loop with `explorations/perf-probes/transactions/run.sh`, at one and at four threads.
- After: the same probe with the cheaper check. Candidates are a cheaper test of "in a transaction", or code that a method's caller marks as known to be outside `atomic`, with a fallback to the check. Report the ns per access before and after on one machine. Every atomic test stays green.

**The question for him.**
"Do `var` fields keep the cell (F-374's default), and must `atomic` keep covering what its callees touch (`atomic.tex:38-41`)? Default: yes to both. Then the next rung measures and cheapens the check, keeping its meaning, on the compiled path only, and walk stays as it is until a probe measures a cost there."

Sources:
- `facts-extract 'ledger:641'`: the cost, compiled only, var field not timed.
- `'ledger:112'`: the value-object `var` field.
- `'ledger:302'`: F-179's fix example.
- `positions:` queries for transaction, atomic and var field, plus a grep of POSITIONS: no decision on record.
- `Specification/basic/expressions/atomic.tex:30-50`: dynamic extent.
- `explorations/compile-ladder/rung-atomic-expr-field/REPORT.md` (sections "What changed and why" item 2, "Decisions", "Defects"): the cell, row 319, the captured copy.
- `explorations/run-c4/src/MicroGptFlat.fss` (grep `var`/`:=`): microGPT's mutable state.

---

## 4. A gate that reads one error and runs slow

**Is the error real?** Treat it as real until shown otherwise. It is not a flake by any evidence on record. The checker's output order is fixed (`compiler.md`, "The checker's time": a node's hash starts from its class name). The distance stage runs with the memo off. The two stages and rung C's run measure different things:
- The count stage checks only `FortressLibrary`, through the checker's early returns.
- The distance stage runs the compile setting over fourteen components in one JVM, every stage of every unit "whatever the earlier stages reported", with `-Dfortress.analyzer.overload.cache=false` (`tools/distance/run.sh` header; `climb-batch-36/gate/distance.txt` line 1). So a count of 0 beside a distance of 1 is a known kind of difference (P-39, F-53), not a contradiction.
- Rung C's `fortress compile` with `FORTRESS_LIBRARY=one` is a third measurement. It runs the memo on (the default, F-43), stops at the first stage with errors, checks one component in its own JVM, and may reuse caches. Its "no error" does not overrule the distance stage. F-43's evidence that memo on and off agree is one measurement, and on the count stage only.

Before running anything, read the error's text and place from the gate's distance output. Then run the distance stage once on rung C's tree alone (base plus rung C) and once on the base, as the gate does. If the error appears only with rung C, it is rung C's. The fix is rung C's to make: a declaration that breaks the overloading rule at its place, which P-33's phase 3 had driven to a distance of 0 (batch 36: `#total 0`). If it also appears on the base, it is not rung C's, and I look at what the batch's merge changed.

**Did the batch slow the checker?** Nothing here shows it. Batch 36's 66 s and 117 s were taken at a load of 0.29. Batch 37's 140 s and 260 s were taken at 3.8. F-240 says load can lengthen a stage more than twofold: batch 16's code took 217 s at 3.3 and 574 s at 4.6 to 5.3. The ratios here are about 2.1 and 2.2, inside that range. Each gate runs each stage once, and the count stage's seconds come from log file times. Rung C's 48 s is a different command (one component, memo on, possibly warm caches) and compares with nothing. The worker's claim that "the other rungs' checker changes" slowed it is also unsupported. If any rung changed the checker's Scala, `compiler.md`, "The checker's time", already asks that rung for a base/change timing of the count stage. If one is wanted now, run the count stage on the base build and on the batch head back to back on an idle machine with nothing beside them, and name the machine and load. One run each is a smoke test that catches only a slowdown of several times.

**Do we hold the landing?** By P-39 neither number turns the gate red: the distance stage only reports. Holding is your call. My recommendation is to hold rung C, not the batch, if the batch can land without it. Rung C fixes its declaration, or shows that the error is the distance stage's and not its own, and then lands after one distance run (about 2 to 5 minutes at low load). If the batch cannot be split, landing a known new error at a distance that phase 3 had brought to 0 needs your explicit yes.

Sources:
- `.claude/skills/fortress-repo/references/compiler.md` (glossary; "The checker's time"): the two stages and timing rules.
- `explorations/coordinator/tools/distance/run.sh` header: settings, memo off, 14 components.
- `explorations/compile-ladder/climb-batch-36/gate/distance.txt`: the batch 36 row (117 s, load 0.29, total 0).
- POSITIONS P-33 and P-39 (grep `distance`): phase 3's target, and that the distance stage only reports.
- `.claude/skills/fortress-repo/references/library.md` "Designing a change" (the steps that check each component).
- `references/records.md` "Timings and citations": a timing needs an idle machine and named settings.

---

## 5. Walk's departures from the instance rule

None of the four is mine to change in this rung. Each departure is either a default the curator has not decided or a repair F-141 reserves for him. My brief's "wherever it departs" meets the record's departures that are recorded as defects, not choices: rows 587, 591, 612 and 616, where walk still gives `Bottom` or fails a call that P-48 names ("Rows 587, 591 and 612: three cases in which walk still gives `Bottom`"). Those are this rung's work, test first from their `XXX` tests (`XXXInferUntypedLambdaResultWalk`, `XXXInferSeveralBoundsWalk`, `XXXInferAboveBoundMentionsParamWalk`, `XXXInferAboveTwoBoundsWalk`).

- **(a) `ap[\T, A extends T\]`: to the curator.** This is D3, row 592, class "deliberate (walk)", with the test `tests/XXXInferThroughBoundWalk.fss`. F-141 says it is a worker's default the curator has not decided. What the change meets: the library's `APPCOV[\T, A extends T, B extends T\]` (`Library/CovariantCollection.fss:30`) would build its result at `Any`. The tests `tests/booleanGuard.fss` and `tests/RangePrototype.fss` then fail, and walk has no expected type to narrow `T` the way the compiled path does (row 592's notes). The specification's side is `basic/inference.tex`, "The Static Arguments of a Call". The row's open question: whether walk moves once it has an expected type.
- **(b) The F-bound `mk[\T extends Cmp[\T\]\]()`: leave it, and name it as a question.** P-48 does not reach it. The decision record says a bound that mentions its own parameter is "outside the paper's calculus, p. 11:11, and not yet decided" (`rung-walk-instance/decision-record.md`, rationale). F-141 states it as walk's behaviour, gated by `tests/InferUnfixedFBoundedWalk.fss` (`b = mk()` runs). What it meets: `SUM` and `PROD`, whose bounds name their parameter (P-78), and F-228's reduction rule all depend on the open type. Five extracted specification examples that `ant testSpecData` runs pass only because walk leaves the parameter open (F-141, F-114), so a change makes specification examples fail.
- **(c) A lone parameter whose bound mentions another static parameter: to the curator.** This is D5, also a worker's default the curator has not decided (F-141). It is gated by `tests/InferLoneBoundMentionsParamWalk.fss`. It meets the chapter's silence: the decision record's D5 notes that the chapter does not settle whether a call's type parameters are solved jointly, and walk cannot evaluate such a bound before the instances are known. Changing it moves `InferLoneBoundMentionsParamWalk`'s pinned answers.
- **(d) `g(Apple, Cherry)` with two minimal common supertypes: to the curator.** This is row 589, with the test `tests/XXXDispatchTwoCommonParentsWalk.fss`. P-46 makes the generic applicable at `T = Fruit`, but F-141 says its repair, which changes which declaration runs, is the curator's to decide, and row 589 says the repair also changes what `declaredBelow` answers at load. It meets `OverloadedFunction.bestMatchInternal` and `instanceHolding`, and `tests/InferTwoCommonParentsWalk.fss`.

**Report lines.** Under "Questions for the curator" there are three decisions not taken: D3 (row 592), D5, and row 589's repair. Each has its alternatives and its default. For D3 and D5 the default is today's behaviour, as F-141 records. For row 589 the default is to leave it. The F-bound is listed as an open point under P-48, with its cost to `testSpecData`.

Sources:
- `facts-extract 'P-48'`, `'ledger:592'`, `'ledger:589'`, `'F-114'`.
- `explorations/compile-ladder/rung-walk-instance/decision-record.md` (grep D3/D5 and the rationale line).
- POSITIONS grep for "F-bound" and P-78.
- `ls ProjectFortress/tests | grep Infer`: the gating tests.
- `tests/InferUnfixedFBoundedWalk.fss`, `tests/InferLoneBoundMentionsParamWalk.fss` (headers).

---

## 6. An empty sum under walk

- **(a) `s: RR64 = SUM...` in the block: gives `0.0`.** A local variable's declared type directs the reduction (F-228).
- **(b) `acc := SUM...`: does not.** An assignment does not direct it (F-228).
- **(c) A method's return type `RR64`: does not.** A method's return type is on F-228's list of what does not direct.
- **(d) A top-level function `total(n: ZZ32): RR64 = SUM...`: gives `0.0`.** A top-level function's declared return type directs it, also where the clause form ends a block.

The better rewrite is the library's written form. P-78 says that "a reduction written with generators writes its static argument where nothing at the call fixes the element type", as in `SUM[\ZZ32\][j <- 0#n] f(j)`. So I write `report(SUM[\RR64\][j <- 0#n] (w[j] / 2.0))`. It is the same line on both paths and needs no helper. I take that, and keep (a) as the fallback if the twin must mirror the compiled line.

**Classification.** The `0` is a known gap, not my change and not new. It is row 716: an empty reduction that no declared type directs takes `SUM`'s F-bounded instance, `additiveIdentity`'s first clause, `ZZ32`. Row 705 (and 510) adds that a call's argument gets no expected type (F-228, F-221). It is gated by `tests/XXXUnwrittenEmptyFloatSumUntypedWalk.fss` and `XXXInferCallArgumentWalk.fss`.

**Do I change walk?** No. My brief gives me `Library/` and `ProjectFortress/tests/`, not walk's evaluator, and the record already holds the gap and its tests. Nothing needs to go to the curator: P-78 already decides the written form.

**Report lines.**
- "Walk twin: `report(SUM[j <- 0#n] (w[j]/2.0))` at n = 0 gave `0 : ZZ32` and ran `report(x: Any)`. This is rows 716 and 705 (known; XXXUnwrittenEmptyFloatSumUntypedWalk, XXXInferCallArgumentWalk), not this change."
- "Decision: wrote `SUM[\RR64\][...]` (P-78's written static argument). Alternatives: a typed local or a typed top-level function (F-228 directs both); an assignment or a method's return type (F-228: neither directs, so both stay `0`). Walk not changed (outside the brief)."
- "Note for the record: row 716's text names the value as `0 : Int`. Walk's `ZZ32` is no longer `Int` (F-379, as F-229 quotes). The row's wording may need a rewrite. Not measured."

Sources:
- `facts-extract 'ledger:716'`, `'ledger:705'`, `'ledger:510'`: the known gaps.
- POSITIONS P-78 (via grep): the written static argument.
- The entries F-228 and F-221 given.

---

## 7. A rung on `label` and `exit`

**Row 1040 (`catch` of `Exception` takes an exit under walk): the specification speaks, but the team's own tests disagree, so the answer is not mine to choose.** The specification says an exit "completes abruptly" to its label, and that only the `finally` clauses of the `try` expressions between run (`Specification/basic/expressions/label.tex`, "Label and Exit"). The compiled answer follows that, and the row is `NEGATIVE-VERIFIED` with `XXXExitThroughCatchWalk`. Walk's `forTry` offers the exit to `catch` clauses as the library object `LabelException` (`Evaluator.java:1452-1456`; `Library/FortressLibrary.fsi:1224`, `LabelException extends UncheckedException`).

Two of the team's tests, `tests/LabelTest.fss:26-30` and `tests/objectCC_label.fss:181-186`, catch an exit as `LabelException`. Both catch an exit that runs after its label block has completed, which is row 1041's case. If walk stops offering exits to `catch` clauses, a catch of `Exception` no longer takes them (the specification's answer for 1040). But `catch e LabelException` no longer takes them either, those two team tests break, and walk's answer to row 1041 changes with it. So fixing 1040 decides part of the contested row 1041.

Plan: write the 1040 fix only if it can leave a late exit as it is. Since neither path can tell a late exit from a live one (F-401), I expect it cannot. If not, I do not change walk's `try`. I report the conflict, the specification against the team's tests and library declaration, as a decision not taken.

**Row 1041 (an exit after its label completed): not mine.** The row is `CONTESTED`, and the specification is silent: it scopes the target statically. Walk lets `catch e LabelException` take the exit, as the team's tests above expect. The compiled path ends the program with an uncaught `LabelExit`. Both libraries declare `LabelException`, and the code generator never throws it. It touches F-401: such a late exit commits the atomic blocks it passes on both paths, and `ExitOutOfAtomicWalk`/`ExitOutOfAtomicCompiled` must stay green. It also touches F-401's walk `tryatomic` rows 1110 and 1111, where an exit is wrapped in a `RuntimeException`. Its test `compiler_tests/ExitAfterLabelCompletedCompiled` stays as it is.

**Row 1042 (which evaluation an exit leaves): not mine.** The row is `CONTESTED`. The specification scopes the target statically, but also says that a label completes normally where its body completes abruptly with an exit to its name. The innermost evaluation's body does exactly that, which is walk's reading. `LabelEvaluationIdentityCompiled` asserts the compiled answer, 102, where walk gives 104. I change neither path.

**Tests.** If 1040 can be fixed: rename `XXXExitThroughCatchWalk.fss` to `ExitThroughCatchWalk.fss` (component line too), see it fail on the base, then fix and see it pass. `LabelTest.fss`, `objectCC_label.fss`, `labelExit.fss`, `ExitOutOfAtomicWalk.fss`, `LabelExitCompiled`, `ExitOutOfAtomicCompiled`, `ExitAfterLabelCompletedCompiled` and `LabelEvaluationIdentityCompiled` all stay green. Any edit to `LabelTest.fss` or `objectCC_label.fss`, which are the team's (2008-2009 Oracle header), is a changed line of a team test, to report.

**Other limits.** F-373's limits (row 890, `finally` not run on the compiled path, which the specification settles; rows 322 and 340) are outside rows 1040 to 1042. I leave them and name them.

**Plan's key lines.**
1. Ledger rows 1040, 1041, 1042, 890 and 1110/1111 read; `label.tex` "Label and Exit" read.
2. 1040: walk's `forTry` stops offering a `LabelException` to `catch`, but only if a late exit's behaviour (1041) is kept. Otherwise the change is not made.
3. 1041, 1042: no change. Questions for the curator.

**Report lines (decisions not taken).**
- "Row 1040: the specification says only `finally` runs between an exit and its label (label.tex). The team's `tests/LabelTest.fss` and `tests/objectCC_label.fss`, and the library's `LabelException`, make an exit catchable. Fixing 1040 under walk breaks those two tests and moves 1041. Alternatives: follow the specification and rewrite both team tests; keep walk's catchable exit and change the specification's text; leave both paths as they are. Default: none on record."
- "Row 1041: may a program catch an exit whose label block has completed? Walk: yes, as `LabelException`. Compiled: an uncaught `LabelExit` ends the program. Specification: silent. Default: the compiled answer, as F-373 records it chosen."
- "Row 1042: which evaluation an exit leaves. Compiled: the one in which the exit's function was made (static scoping). Walk: the innermost running (label.tex's completion sentence). Default: the compiled answer, which LabelEvaluationIdentityCompiled asserts."

Sources:
- `facts-extract 'ledger:1040'`, `'ledger:1041'`, `'ledger:1042'`, `'ledger:890'`: the rows.
- `Specification/basic/expressions/label.tex`: the rule.
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1445-1460`: walk's `forTry`.
- `Library/FortressLibrary.fsi:1220-1228`: `LabelException`.
- `tests/LabelTest.fss`, `tests/objectCC_label.fss`: team tests that catch exits.
- `ls` of the tests and compiler_tests for label and exit.
- `FortressTaskRunner.java` (grep `LabelException`, `:133`): F-401's walk commit.

---

## 8. An array of `Number`

**Answer to the curator.** The rung cannot be cut as you word it. Under the library's bound on `Vector` and `Matrix`, `T extends { Number, MultiplicativeRing[\T\] }` (F-151; `Library/FortressLibrary.fsi:1645`, `:1757` per row 729), `Vector[\Number,n\]` is not a well-formed type. `Number` declares no arithmetic and is not a ring at its own type. So there is no vector of `Number` for the factory to return. Something has to give way: the specification's sentence (`Specification/basic/expressions/aggregate.tex:165-166`, and `:152-155` for matrices) or the bound. Row 729 is `CONTESTED` on exactly this.

**The ways and their costs.**
1. **Revise the text** to say "whose element type is one of the number types", with a revision box and an Appendix I entry. No code changes. The plain array at `Number` and `AnyIntegral` stays, pinned by `tests/ArrayFactoryAbstractNumber.fss`.
2. **Weaken the bound to `T extends Number`** (way 6a of `reviews/array-fork2-judgement.md` section 2.9). The bodies lose their arithmetic, and the checker's 25 errors return. Ruled out there.
3. **Put arithmetic on `Number`** (way 6f), `opr +(self, other: Number): Number`. This reverses route A, the curator's flat tower, and loses `T`. Ruled out there.
4. **Some other vector type for `Number`** that does not need the ring. Nothing on record designs one. It would be a new design, and `Vector`'s operators would not apply.

**What the record already says.** The judgement recommended the two-trait bound, and F-151 records it as the default that landed. That judgement claimed the specification's sentences on `Number` elements "stay true". Row 729 and PLAN show they do not hold at `Number` itself. The question is already in PLAN's queue, PLAN line 478, L.worker.1 of climb batch 15's rung L, with a default: "the text as it stands, the departure listed for a later text rung". Its evidence is `compile-ladder/rung-library-factories/REPORT.md` section 11.

**Draft question.**
"The specification says a one-dimensional array of `Number` elements is a vector (aggregate.tex:165-166; the same for matrices, :152-155). The library's `Vector` needs elements that are a ring at their own type (F-151), so `Vector[\Number,n\]` cannot exist, and `array1[\Number,3\]()` gives a plain array (row 729, test ArrayFactoryAbstractNumber). Which gives way?
(a) The text: 'whose element type is one of the number types', with a box and an Appendix I entry. Cost: a text rung; no code.
(b) The bound: `T extends Number` alone, which returns 25 checker errors; or arithmetic on `Number`, which reverses route A.
Default on record (PLAN, L.worker.1): the text as it stands for now, the departure listed for a later text rung, row 729 contested, the plain array pinned. Recommended: (a) when that text rung runs."

Sources:
- `facts-extract 'ledger:729'`: the contested row.
- `explorations/reviews/array-fork2-judgement.md` ("In short", 2.9, 4, "For Pavol"): the ways and the recommendation.
- `explorations/coordinator/PLAN.md:478`: the queued question and its default.
- `Specification/basic/expressions/aggregate.tex:150-185`: the sentences.
- grep of POSITIONS: no decision on the bound or the sentence.

---

## 9. A rung on row 808

**The test I start from.** The row already has its reproducer, `tests/XXXArray2ShiftedSlice.fss`. It asserts, for `s = a.shift((1,1))`, that `s[(1,2)#(2,2)]`'s `[0,0]` is 12 and `[1,1]` is 23, that `s[:,2][0]` is 12, and that `s[:][0,0]` is 11. My fix repairs it, so I promote it:
- Rename it to `tests/Array2ShiftedSlice.fss`, with its component line, before editing the library.
- Extend it with the row's second half: a `shift` of a slice, a column (`(m[:,1]).shift(5)`, which today raises 'Index -11 out of bounds for length 6'), a row, and an already shifted `Array2`, each asserting the elements read after the shift.
- With "Expected failure:" echoed, run it through `harness-one.sh` on the base and see it fail on the first wrong element (12 expected, `a[1,2]` read) and on the `ArrayIndexOutOfBoundsException`.

**Where the fix goes.** `Library/FortressLibrary.fss:3083`, in `SubArray2.subarray`: `(o0', o1') = index(on0 - bo0, on1 - bo1)` becomes `index(on0 - b0, on1 - b1)`. That subtracts the view's own base, as `__SimpleSubArray1.subarray` subtracts its `b0`. This is the row's one-line repair. Note that the row cites `:2828`, but the line is now at `:3083`, as F-279 says. Then see the test pass. That is the whole fix; `Array3` has no such override (row 808).

**Cases beyond the test.**
- A slice of a strided slice. `SubArray2.subarray` hands the new view `mn0`/`mn1` as its stride, not `m0 * mn0`. A slice taken from a view whose own stride is not 1 may still read wrong elements. I check it, and if it is wrong, record it as a new defect (`tests-writing.md`, "How a defect is recorded") rather than widen the fix unasked.
- A slice at a nonzero output base (`bo0`, `bo1` not 0).
- `Col`/`Row` built from a shifted array (`:3096`, `:3107` call `mem.subarray[...]`) and then shifted.

**Tests that stay green.**
- `tests/Array2SliceAtNonzeroBase.fss` and `Array3SliceAtNonzeroBase.fss` (F-279's gate).
- `tests/VectorMatrixCastsWalk.fss`. F-264: `a[:, j]` and `a[i, :]` pass a cast sub-array to `Col`/`Row`, and on a shifted array that sub-array now comes from the changed method.
- `tests/ArrayElementAlgebra.fss` and the other array-family tests.
- The microGPT quick pair under walk (`interpreter.md`, "The model program"). F-264's landing checked 42 test files, and this view code runs under every column and row subscript of a shifted array.
- `FortressLibrary` is one of the fourteen components, so also `ant testOneLibrary` (`tests-running.md`, "When to run a whole suite"), and the count stage for the compiled checker's view of the body.

**What else it can move.** Every view built through `SubArray2.subarray`: the range subscripts, `[:]`, columns and rows of a shifted `Array2`, and `Matrix` views if any are `SubArray2`s. Unshifted arrays do not go through this path for their first slice. A shifted array's `Col`/`Row` then flows into the `cast` sites of F-264.

**Report.**
- "Point to report: library edit, `Library/FortressLibrary.fss:3083`, `on0 - bo0, on1 - bo1` to `on0 - b0, on1 - b1`."
- "Row 808 fixed: promoted test `tests/Array2ShiftedSlice.fss` (from `XXXArray2ShiftedSlice`), failing on the base [quoted lines], passing after."
- `ledger.py close 808 --commit ... --test Array2ShiftedSlice` once the commit is in `HEAD`, and F-279's text on the shifted exception marked for rewrite in "For FACTS".
- Any further defect found (for example, the strided case), recorded as such.

Sources:
- `facts-extract 'ledger:808'`: the row, its repair and its cases.
- `python3 explorations/coordinator/tools/ledger.py find --cites Library/FortressLibrary.fss` (filtered): the rows that cite the file.
- `Library/FortressLibrary.fss:3066-3110` and the grep of `shift(`/`SubArray2`: the code.
- `tests/XXXArray2ShiftedSlice.fss`: the existing test.
- `ls tests | grep Slice/Shift`: the gating tests.
- `.claude/skills/fortress-repo/references/tests-writing.md` ("Promoting an XXX test", "How a defect is recorded").
- `references/tests-running.md` (the `testOneLibrary` rule).

---

## 10. A proposal to make covariance legal

**Decision.** No. The curator has already decided this exact example, so it is not a proposal to make.
- P-97: the covariance example "is rewritten and marked in the same way" as the other examples that break the exclusion rule. It takes the library's shape, and the original stays beside it, marked "Not allowed". Its callout adds one sentence: the later design in the 2012 Types chapter declares variance with a `covariant` modifier, which neither path implements, with row 404 recording the gap.
- P-25: `Specification/` stays the standard. The restart's Types chapter is cited beside it, and `covariant` "is future work, off the path to microGPT (P-62)".

The worker's evidence is not new. The restart's `covariant` is the evidence P-25 and P-97 used (F-166). The compiled checker's acceptance is row 404: it type-checks, then the compiled run dies with `IncompatibleClassChangeError`, and walk refuses it. So "the checker already accepts it" argues against legalising it, since neither path runs it.

**Reply to the worker.**
"Do not rewrite the example as legal. P-97 decides this example: it shows the library's shape, the original stays beside it marked 'Not allowed', and its callout carries one sentence: the type group's later design, the 2012 Types chapter (`Documentation/Specification/Prose/Language/types.tick:320-339`), declares variance with a `covariant` modifier, which neither walk nor the compiled path implements (row 404). Do not add `covariant` to the chapter on trait parameters: P-25 keeps `Specification/` as the standard and makes `covariant` future work (P-62). The checker's acceptance is row 404's gap, not support: the compiled run dies with `IncompatibleClassChangeError`, and walk refuses the program. If the example or its callout does not yet match P-97, bring it to that form. If you think P-25 or P-97 should change, put it in your report as a question with evidence that those decisions did not use. The restart's text and row 404 were used."

**For the curator.** Nothing needs his decision. I would note in the batch record that a worker proposed reversing P-97, so the reviewer sees the brief may need to quote P-97 and P-25.

Sources:
- `facts-extract 'P-25'`, `'P-97'`: the decisions.
- `'ledger:404'`: covariant accepted by the checker, dies at run time.
- The entries F-166, F-47 and F-167 given.

---

## 11. Parallel reductions after the switch-over

**Answer to the curator.** Your proposal for the first rung is already done. P-175 decided that a call's arguments, and so a reduction's two halves, run in parallel on the compiled path. F-350 says this is built: `CodeGen.genParallelExprs`, gated by `CallArgumentsForkCompiled` and `AlsoArmThrowsJoinsCompiled`. Today the prelude's reductions run in sequence only because `ParallelismAnalyzer` skips calls written in the prelude's files (row 982), and that ends at the switch-over. After it, against the one library, a reduction forks its halves wherever the range has more than `grainSize`, 16, elements (`Library/RangeInternals.fss:20`).

**Will microGPT's `SUM`s and `DOT`s fork?** Mostly not, by reading; nobody has run it. The model's sizes are `nEmbd` 16, `blockSize` 16, `nHead` 4, `headDim` 4 and `vocabSize` 27 (`explorations/run-c4/src/MicroGptFlat.fss:17`), and the MLP is `4 nEmbd` = 64 wide (`:36`). A reduction over 16 or fewer elements forks nothing.

F-350 says "16, 16, 4 and 4 wide ... forks nothing" and leaves out two widths:
- The vocabulary's 27: `sm`'s `∑ e` and `BIG MAX z` over the logits (`:23`, used at `:56`) split once, into 16 and 11. This is the batch 30 review's own wording, "a range of 27 splits once".
- The 64-wide MLP, wherever a reduction runs along it.

The matrix product splits down to single elements, so it forks heavily (`Library/FortressLibrary.fss:3129-3187`, F-356). I hand F-350's omission over as a correction for FACTS.

**Will four threads make a step faster?** The evidence says no, at these sizes. F-356 runs a Java model of the step in the library's fork/join shape, with unboxed arrays and plain loops at the leaves, so it is a floor for compiled Fortress with this structure. It takes 19 to 32 times the plain step on one thread, 55 times on two and 80 times on four. With the matrix product stopped at blocks of 16, it takes 1.4 to 4.8 times. Threads gain only from a product of about 128 by 128 in blocks of 64, or a dot product of about 260,000 elements; microGPT's products are 16 by 16 to 64 by 16. Trust: measured once on a shared 4-CPU machine, every configuration passing its checks, no test of timings. The direction is strong (factors of 20 to 80), but the exact factors are not.

**What we compare a step with.** The pure-Java baseline, F-355 (P-7): about 0.10 ms a step without Adam and 0.113 ms with it. These are fork medians of 100.8 to 104.0 µs over 10 fresh JVMs, measured once on a shared 4-CPU machine with OpenJDK 25, no test of timings. It is careful scalar Java, not the fastest (the Vector API in the products gives 75 µs). For scale, from the same session: NumPy 0.20 ms, dzaima/APL 13 ms, pure Python 132 ms.

**The first parallel-work rung of phase 6.** Not "make the reductions fork". Instead:
1. Measure first. Time the compiled microGPT step against the one library at one and four threads on the same machine. Report it against 0.1 ms, with the machine named.
2. Give the matrix product a grain. Stop its split at blocks of 16 or more, the way `grainSize` does for the range (P-175's "right forking constants"). F-356 names this as the largest part of the cost: 19 to 80 times falls to 1.4 to 4.8 times in the model.
3. Then decide on the grain. Any larger change, such as running the model's reductions in sequence below some size, is his decision, since P-175 declined "reductions left in sequence".

Sources:
- The entries F-350, F-356 and F-355 given.
- `explorations/run-c4/src/MicroGptFlat.fss` (lines 17, 22-36, 56; grep `SUM`/`DOT`/`BIG`): the model's widths and reductions.
- `Library/RangeInternals.fss:18-22`: the grain.
- `explorations/reviews/batch-30-review.md` section 2: "a range of 27 splits once".
- `facts-extract 'ledger:982'`: the prelude's sequential reductions.
- POSITIONS P-175 (via grep `distance`, which printed it): the decided fork and the grain.

---

## 12. A walk refusal test that passes on the base

**What the pass means.** The test does not test my fix. By F-383, walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load. So on the base the program was refused or stopped before running, with some message containing "q". `load_exception_contains=q` is a one-letter key that matches nearly any message naming `q` ("q is undefined", for example) or any word containing the letter. A refusal test must fail on the base (`tests-writing.md`, "The order", step 2). If it passes, find out why before the fix.

**What I do about the walk test.**
1. Run the program on the base under walk and read the message it gave. That is the base's refusal or static error.
2. Correct the program so that, apart from the new overload shape, it is valid and runs clean on the base: fix whatever earlier error it had.
3. Set the key to the full message, `load_exception_contains=illegal overload of q`.
4. With "Expected failure:" echoed, run it through `harness-one.sh` on the base. It must be red because walk loads and runs it. Then apply the fix and see it green.

If the base's error turns out to be a real refusal of the same program for another reason, that is a finding to record, and the test needs a program that only the new check refuses.

**Recording the compiled failure.** F-103 says that one `XXX` file cannot express "compiles, then fails at run time". A single `XXX` compile test with `compile_err_contains` is red, "Saw wrong failure", when the program compiles. So I use the run-time pair (`tests-writing.md`, "Writing an `XXX` test"):
- `compiler_tests/XXXOverloadShapeQ.fss`, `component XXXOverloadShapeQ`. It prints `REACHED` in `run()` before the call that throws the `ClassCastException`.
- `compiler_tests/OverloadShapeQLink.test`: `tests=XXXOverloadShapeQ` and `link`. A plain name, red if the link reports static errors.
- `compiler_tests/XXXOverloadShapeQ.test`: `tests=XXXOverloadShapeQ`, `run`, `run_out_contains=REACHED`, and no `link`.

Run the two together in one `junit.sh` call, the Link file first. Show this first `XXX` test working twice: as it is (an expected failure), and once with the failing call removed (red), then restored.

The defect itself is that the compiled checker accepts a declaration shape that walk now refuses as illegal. It is not only the run-time `ClassCastException`. It needs a ledger row, class `implementation gap (checker)`, with the pair as its reproducer and both paths named. When the checker learns to refuse the shape, `OverloadShapeQLink.test` turns red, and the pair becomes one compile test with `compile_err_contains=illegal overload of q` (or the checker's text).

**Report lines.**
- "`tests/OverloadShapeQWalk` first passed on the base with `load_exception_contains=q`. The base gave [message]: a static error before the run, which the harness counts as a refusal (F-383), and the one-letter key matched it. Corrected the program [how] and the key to `illegal overload of q`. Expected failure on the base: [quoted]; passing after the fix: [quoted]."
- "Defect: the compiled path compiles the same program and fails at run time with ClassCastException [quoted]. Recorded by the pair `compiler_tests/OverloadShapeQLink.test` + `XXXOverloadShapeQ.test` over `XXXOverloadShapeQ.fss` (F-103), and ledger row N (the checker accepts the shape that walk refuses; the specification section that makes it illegal: [cite])."

Sources:
- `tests/TypecaseUndefinedArmWalk.test`: the key form.
- `compiler_tests/FinallyOnEscapeLink.test`, `XXXFinallyOnEscape.test`: an existing pair, as a model.
- `.claude/skills/fortress-repo/references/tests-writing.md` (lines 45, 75-135): refusal tests, the pair, the order, promotion.
- The entries F-383 and F-103 given.

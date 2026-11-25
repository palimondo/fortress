# Answers to the twelve record-test scenarios (questions-p.md)

Folder read: `/home/user/record-test-p`. Every record query used `explorations/coordinator/tools/facts-extract.sh --root /home/user/record-test-p`. Common to all scenarios: the `fortress-repo` skill's `SKILL.md` and `references/records.md`, loaded once to learn the queries and the report form.

---

## 1. Two failures that the suite does not show

**The `StackOverflowError` (compiled, `FORTRESS_THREADS=4`, no `JAVA_FLAGS`) is a known gap, and not a defect of my change.** Run so, `bin/fortress run` goes through `bin/run`, which gives 1536 MB of heap but leaves the JVM's default 1 MB thread stacks (F-107, F-99). Row 640 describes this exact shape: a deep recursion whose operands fork overflows a worker's stack at four threads with default stacks, 8 of 12 runs for `TimingRungT`, and also 9 of 12 for the call-argument form. The workaround is the `JAVA_FLAGS=-Xmx4g -Xss64m` pin in `fastTrack`. My 5 of 8 is the same failure in a new program. Next I run it under the suite's own settings, `FORTRESS_THREADS=4 JAVA_FLAGS="-Xmx4g -Xss64m"`, 8 times, and expect 8 of 8 to pass. To learn whether my fix adds stack depth, I also run the base build's run step 8 times without `JAVA_FLAGS`, in the same session, with nothing else running. If the base overflows at about the same rate, my change has no part in it. I add `DeepForkRungX` to row 640 as a further reproducer with `ledger.py note 640`, and I open no new row.

**The `OutOfMemoryError` under walk is something new, and my change is the first suspect.** F-107 says `bin/fortress` gives walk 256 MB, while the harness runs walk tests at 768 MB (`junitMem`). That is why `testFast` passes it. F-107 also says a claim about a walk failure near a memory limit is measured at 256 MB. The base ran the same command at 256 MB to the end, and my head does not, so the twin's memory use rose across my change. Row 67 records only that the 256 MB default is small. It does not cover a regression. Whether my change can cause it depends on what the change touched. Walk and the compiled runtime share no task code (F-179, and the skill's "How a program runs"). If my edit is only in `runtimeSystem/`, it cannot change walk, and the gap needs another cause: cache state, or a twin that differs from the one run on the base. If it touches the library or a shared phase, it can. Next I run base and head each three times at 256 MB, unchanged `bin/fortress tests/DeepForkRungXWalk.fss` with `JAVA_FLAGS` unset, one after the other in one session. I log the load, `nproc`, the JDK and `FORTRESS_THREADS` with the runs. I then shrink the twin's depth until both pass, which tells me how far apart they are.

Report lines:
- "Defect (known, row 640): `FORTRESS_THREADS=4 bin/fortress run DeepForkRungX` with `JAVA_FLAGS` unset: `StackOverflowError` in 5 of 8 runs (1 MB default stacks, `bin/run`). Under the suite's pin `-Xmx4g -Xss64m`: [n] of 8 pass. Base without `JAVA_FLAGS`: [n] of 8 overflow. Added as a reproducer to row 640. Not caused by this change."
- "Finding (new): `bin/fortress tests/DeepForkRungXWalk.fss` at walk's default 256 MB ends in `OutOfMemoryError` on my head and runs to its end on the base. The suite passes it at the harness's 768 MB, so the gate cannot see it (F-107). Base and head, three runs each at 256 MB: [results]. Cause: [the change's part / not the change]. If it is my change, it is a defect of the change, fixed before landing or recorded as a row."
- "For FACTS: none yet. The 256 MB regression becomes a row or a fact once it is measured."

Sources:
- `questions-p.md` scenario 1: the entries F-99 and F-107.
- Ledger row 640 (`ledger:640`): the known stack-overflow gap and its workaround.
- Ledger row 67 (`ledger:67`): walk's 256 MB default, as a gap of the default and not of a change.
- `ledger-find:OutOfMemoryError`: to check whether the record already holds a walk OOM regression (it holds only rows 67 and 431).
- `explorations/coordinator/process-engineering/build-efficiency.md` (section query): the source F-99 cites. The entries were enough, and this added only background.

---

## 2. A closed family covered by a generic body

**The refusal of `HImpl` is a known gap, row 728, and not a defect of my change.** F-145 names this case: walk refuses an object whose one covering definition has a static parameter of its own, though the object is valid, and the compiled path runs it. Row 728 has my exact shape, `g[\T extends Side\](self, x: T)` under `g(self, x: Side)`, with the message "does not define an abstract method declared in type H". It is gated by `tests/XXXAbstractMethodGenericBodyWalk.fss`. The fix is in walk's `Constructor.checkForDef`/`definedBelow` (`interpreter/evaluator/values/Constructor.java:431-433`, `:480`). That file is outside my brief, which allows only `Library/` and `ProjectFortress/tests/`. So I do not fix walk in this rung.

**To land the rung, I write `HImpl` in a form both paths accept.** One way is a body at the abstract method's own type, `g(self, x: Side): ZZ32 = 1`. The other is two bodies, `g(self, x: Ping)` and `g(self, x: Pong)`, which the `comprises` split covers on both paths (F-145; `compiler_tests/AbstractMethodCoveredPairs`). The first is simpler and has the same meaning. The rung needs no generic body, so I drop it. I would not add the walk twin of the generic body: `XXXAbstractMethodGenericBodyWalk` already pins it. Report: "Defect (known, row 728): walk refuses an object whose one covering body is generic. Its home is walk's `Constructor.java`, outside this brief. `HImpl` takes `g(self, x: Side)` instead. Decision: the plain body over the two-body split, because it has the same meaning in fewer lines."

**The walk run of `Wrap` shows nothing about completeness.** F-145 says a generic object is not checked (row 665, gated by `XXXAbstractMethodUndefinedGenericWalk`): the check skips any object whose type is an instance of a generic. So `Wrap[\T\]()`, with no `g`, loads and runs under walk although it is incomplete. A call `g(Wrap[\ZZ32\](), Ping)` would fail only at dispatch. By the traits chapter ("Method Declarations", the spec citation of rows 665 and 728), an object must define every inherited abstract method, so `Wrap` is wrong as written. I give `Wrap` the same `g(self, x: Side): ZZ32` body, or remove it if the rung does not need it. I also add it to the compiled test, so that the compiled checker checks it. F-145 says the compiled checker covers abstract methods, and the record does not say that it skips generic objects. Report line: "`Wrap[\T\]` lacked `g`. Walk loaded it only because walk does not check generic objects (row 665), and the record gives no evidence that `Wrap` was complete. I gave it a body, and the compiled test now holds it."

Sources:
- `questions-p.md` scenario 2: the entries F-145 and F-147.
- Ledger rows 665, 728, 725 (`ledger:`): the generic-object skip, the generic-body refusal and its file:line, and the compiled split limit.
- `ls ProjectFortress/tests | grep XXXAbstractMethod` and `ls compiler_tests | grep AbstractMethod`: to confirm the gating tests exist.

---

## 3. A rung on the transaction check of `var` fields

**Answer to the curator.** The rung cannot be cut as worded, for three reasons.

First, "drop the check outside `atomic`" cannot be done by where the code is written. The memory model defines a transaction by dynamic extent: accesses "dynamically contained within the `atomic` expression" (`Specification/basic/memory-model.tex:385`). A method that reads `o.n` may be written outside any `atomic` and still be called from inside one. `BaseTask.inATransaction()` is how the compiled code learns that at run time (`compiler/codegen/VarCodeGen.java:334`, `:365`, `:490`, `:528`, `:660`, `:705`). If the check goes from every field access outside a written `atomic`, row 319 comes back: `atomic` would stop tracking a field that a callee writes, and updates would be lost above one thread. `compiler_tests/AtomicFieldCompiled` gates that.

Second, the storage form is undecided. F-374 says the cell for a `var` field is "a default" of the batch's planner, which "the curator has not decided". POSITIONS holds no decision on it (grep for transaction/`var` field/atomic). A plain JVM field would also change how a loop body or function expression in a method captures the field: today it captures the cell (`VarFieldCapturedCompiled`). It would also change the `value` object case: `V(1) === V(1)` compares cells by identity (row 112), and the library has one such object, `Lazy`.

Third, "the same for walk" has no counterpart. Walk keeps every mutable variable and field in a `ReferenceCell` that carries its transaction state (`interpreter/env/ReferenceCell.java:25-56`). It has no JVM field and no separate per-access check like the compiled one. F-179 says tasks and transactions are built twice, independently, so a compiled change does not reach walk. Row 641's cost is measured on the compiled path only. Walk could not even load the probe (`TxArray.fss` stops at load).

**What can be cut now: a measurement rung, then a cheaper check.**
- *Before:* row 641 measured locals and a scalar accumulator at one thread. It did not measure a `var` field, four threads, code inside `atomic`, or microGPT (row 641's notes).
- *Rung A, measure (compiled only):* extend `explorations/perf-probes/transactions/run.sh` to a `var` field and to four threads, and count the checks on microGPT's step. It changes no source and keeps all tests. *After:* the field's cost per access, and its share of a microGPT step.
- *Rung B, if A shows the cost matters:* keep the dynamic check's meaning and make it cheaper. For example, read a per-thread "in a transaction" flag that the task runner keeps, in place of the full `inATransaction()` call. The rung's files would be `compiler/codegen/VarCodeGen.java` and `runtimeSystem/BaseTask.java`. It must keep `AtomicFieldCompiled`, `VarFieldCapturedCompiled`, `AtomicExprCompiled` and the atomic runs green, and it must keep a `var` field tracked when a method called inside `atomic` reads or writes it. *Before:* row 641's numbers. *After:* the same probe, timed with the base in one session. Walk is not changed.

**For him to decide first:** whether a compiled `var` field stays a cell, as the planner's default, or becomes a plain JVM field with its transaction state kept elsewhere. The default on record is the cell (F-374). Also, whether walk should be touched at all, given that P-7 measures the compiled step and walk has no such check to drop.

Sources:
- `questions-p.md` scenario 3: the entries F-374 and F-179.
- Ledger rows 641, 319, 112 (`ledger:`): what is measured, what the check guards, and the value-object case.
- `grep` of `POSITIONS.md` for transaction/var field/atomic: to confirm that no curator decision covers the storage form.
- `grep inATransaction` over `ProjectFortress/src/com/sun/fortress`: where the compiled code emits the check, and walk's separate copy.
- `interpreter/evaluator/Evaluator.java:205-230` and `interpreter/env/ReferenceCell.java:25-120`: walk's form of mutable state.
- `Specification/basic/memory-model.tex` (grep atomic, lines 381-389): transactions are defined by dynamic containment.

---

## 4. A gate that reads one error and runs slow

**Is the error real?** Take it as real. The worker's run cannot refute it. His `fortress compile` ran with the overloading checker's memo on, the default (`OverloadingChecker.scala:79`). F-43 says that memo hides some overloading errors, and which ones changes from one build of the checker to another. The gate's stages turn it off with `-Dfortress.analyzer.overload.cache=false`. So "no error" with the memo on does not show the gate wrong. With the memo off the check is deterministic, which rules out a flake by memo. The error's kind is overloading, the kind the memo hides. The distance was 0 at climb batch 36's gate (F-53), so this is DISTANCE UP by 1, at a line rung C added.

The count stage read 0 because it checks only the `FortressLibrary` component, and each unit stops at its first failing checker stage. The distance stage runs every stage of fourteen components (F-53; `compiler.md`'s glossary). So the error may be met while another of the fourteen, which imports the declaration, is checked. The table's component column should show this. I would read the gate's per-site list, then run the distance stage once on rung C's tree alone, from its last landed table, to confirm that the error is rung C's and not a meeting of two rungs ("two rungs' changes do not add", `climb-batch-workflow.md:250`).

**Did this batch slow the checker?** These numbers cannot tell. F-240 says load can lengthen a stage more than twofold (217 s at load 3.3 against 574 s at 4.6 to 5.3 for nearly the same code), so a time compares only with one taken under a like load. Climb batch 36's 65 s and 117 s were taken at a start load of 0.29 for the distance stage. This gate started at 3.8. So 140 s and 260 s are about 2.2 times those, which load alone could explain. The worker's 48 s is not comparable at all: memo on, one component, the default `fortress compile`, and an unknown load. If rung C or another rung changed the checker, the workflow already asks that rung for a timing pair of the count stage, base build and its tree, in one session (`climb-batch-workflow.md:119`; P-148). If no rung changed the checker, a library edit alone is unlikely to double it. To answer the question, I would run the count stage on the base build and the merged tree one after the other, in one session, at a quiet load, with nothing else running, and log `nproc`, CPU, load, JDK and threads.

**Do we hold the landing?** The gate is not red: the distance stage only reports, and its rise never fails a batch (P-39). But P-33 makes a distance of 0 the end of phase 3, and this rung would take it from 0 to 1. My default: land the other rungs and hold rung C until its worker reproduces the error with the memo off, then fixes it or records it. If he wants the whole batch to land, rung C can land with the +1 recorded as a ledger row and in its report. The choice is his.

Sources:
- `questions-p.md` scenario 4: the entries F-240 and F-43.
- F-53 (`F-53`): the last landed distance and count, 0 and 0, and what each stage checks.
- F-235 (`F-235`): the other memos, to keep them apart from F-43's.
- P-39 and P-33 (`P-39`, `P-33`): the distance never turns the gate red, and phase 3 ends at 0.
- `.claude/skills/fortress-repo/references/compiler.md` lines 1-8 and 120-127: the definitions of the count and distance stages.
- `explorations/coordinator/climb-batch-workflow.md` lines 119 and 250-262: the timing pair for a checker change, the memo off, and "changes do not add".
- F-111 (title query): which edits can move the stages.

---

## 5. Walk's departures from the instance rule

**(a) `ap[\T, A extends T\](Apple)` gives `BoxU[\Apple\]`: leave it.** This is decision D3 of the walk-instance rung, row 592, status `deliberate (walk)`, gated by `tests/XXXInferThroughBoundWalk.fss`. It does depart from P-48, but on purpose. The library's `APPCOV[\T, A extends T, B extends T\]` (`Library/CovariantCollection.fss:27-30`) builds its result at `T`. Giving `T` its bound `Any` makes `tests/booleanGuard.fss` and `tests/RangePrototype.fss` fail, because walk has no expected type to stand where the compiled path's static types fix `T` (decision record D3). Row 592 names it "Open for the curator: whether walk moves once it has one". I would not change it. I would restate that open question in my report. It touches `Specification/basic/inference.tex`'s revision box, which lists D3 among walk's exceptions (`:285`, `:463`).

**(b) `mk[\T extends Cmp[\T\]\]()` leaves `T` open: leave it, and take it to the curator.** F-143 gates it by `tests/InferUnfixedFBoundedWalk.fss`. The decision record says the F-bounded case is "outside the paper's calculus, p. 11:11, and not yet decided". P-48 says "never `Bottom`", but no position covers an F-bound, and walk cannot evaluate such a bound before the instance is known. A change would reach the library's own F-bounded parameters, `SUM`'s and `PROD`'s. Through `additiveIdentity`'s typecase, that is row 716's empty `SUM` (`XXXUnwrittenEmptyFloatSumUntypedWalk`). It would also reach the open-type dispatch of row 663 and row 825's `CastError` at `Library/List.fss:179`. Report it as a decision not taken: what an F-bounded parameter that nothing fixes takes under walk, with "stays open" as the default (the current state, F-143).

**(c) A lone parameter whose bound mentions a static parameter takes the narrowest common supertype: leave it.** This is decision D5, a default of the same rung (F-141), and it has no row of its own. The decision record gives the reason: walk files such a parameter in `rechecks`, because it cannot evaluate the bound before the instances are known, and the chapter does not settle the case of several minimal supertypes (`decision-record.md`, D5, "Reach"). It is gated by `InferLoneBoundMentionsParamWalk.fss`. Moving it to the bound would undo a recorded default with no new evidence. It goes with (a) to the curator only if he wants walk's defaults reviewed. It also touches the inference revision box (`inference.tex:304`).

**(d) `g(Apple, Cherry)` runs the plain `g`: take it to the curator.** Row 589, gated by `tests/XXXDispatchTwoCommonParentsWalk.fss`, is an implementation gap. P-46 makes the generic applicable at `T = Fruit`, and so it would be the one to run. But F-141 and the row say that its repair "changes which declaration runs, the curator's to decide". It also changes what `declaredBelow` answers at load. The fix would be in `OverloadedFunction.java:2309`/`:2497`, which would pass the bound into `inferByUnification` (`EvaluatorBase.java:841`). I would prepare the repair with its test, and present it as a decision not taken: "run the generic at its bound (P-46, P-48) or keep the plain one", with the default "keep" as row 589 stands. The open defects that need no decision belong to this rung by P-180 if they cite my files: rows 591, 612, 616 and 587. That is where the rung's work goes.

Sources:
- `questions-p.md` scenario 5: the entries F-141 and F-143.
- P-48 (`P-48`): the rule and its cases.
- Ledger rows 592, 589, 612, 591, 716 (`ledger:`): status, tests, the library's reason for D3, and the curator's open question.
- `explorations/compile-ladder/rung-walk-instance/decision-record.md` D3-D6 and lines 18-31: the defaults and the F-bound "not yet decided".
- `grep` of `POSITIONS.md` for F-bound/open: no position on the F-bounded case (P-180 found as the cleanup rule).
- `grep interpreter Specification/basic/inference.tex`: the revision boxes each change would meet.
- `ls ProjectFortress/tests | grep Infer...`: to confirm the gating tests exist.

---

## 6. An empty sum under walk

**Which rewrites give `RR64`'s zero.** F-228 lists the contexts that direct an unwritten reduction's instance: a local variable's declared type, and a top-level or local function's declared return type, also where the clause form ends a block. A method's return type, a field, an assignment, a branch and a call's argument do not.
- (a) `s: RR64 = SUM[...]` is a local variable's declared type, so it directs the sum to `SUM[\RR64\]`, which gives `0.0`, and `report(s)` runs the `RR64` overload. Yes.
- (b) `acc := SUM[...]` is an assignment, which does not direct it. The sum is instantiated with no hint, and an empty one takes `ZZ32`'s identity (row 716). The assignment of a `ZZ32` 0 to an `RR64` variable then either converts it or fails. The record does not say which, and I did not measure it. No.
- (c) A method's return type does not direct it. No: same as (b). Whether the method's declared return type then converts or refuses the `0` is not on record.
- (d) A top-level function's declared return type directs it. Yes.

I would take (a), the smallest change and the one closest to the compiled test's line.

**Is the `0` mine?** No. It is a known gap: row 716 (an empty clause form that no declared type directs takes `ZZ32`'s identity, `XXXUnwrittenEmptyFloatSumUntypedWalk`), and row 705 (a call's argument gets no expected type under walk, `XXXInferCallArgumentWalk`; F-221 says so of walk). The compiled test sees `0.0` because the compiled checker retries the argument against `report`'s parameter types (F-221).

**Do I change walk?** No. My brief is a library rung, and walk's evaluator is not among its files. Row 510 says that passing a declared type into walk's inference is the curator's to time ("whether before the switch-over (P-12) is the curator's"). Nothing new goes to the curator: rows 705/510 already carry that question.

Report lines:
- "Defect (known, rows 716 and 705): under walk `report(SUM[j <- 0#n] (w[j] / 2.0))` at `n = 0` passes a `ZZ32` `0` and runs `report(x: Any)`. Walk gives a call's argument no expected type, and an empty `SUM` with none takes `ZZ32`'s identity. The compiled path gives `0.0` (F-221). Not caused by this change."
- "Decision: the walk twin binds the sum to `s: RR64` first, a context that directs it (F-228). I rejected an assignment and a method's return type, which do not direct it. I did not take a top-level function, which also works, because it is a larger change. Walk is not changed: outside this brief, and the timing of row 705's repair is the curator's (row 510)."

Sources:
- `questions-p.md` scenario 6: the entries F-228 and F-221. They were enough for the four rewrites.
- Ledger rows 716, 705, 510 (`ledger:`): the exact gaps, their tests, and whose decision the repair is.

---

## 7. A rung on `label` and `exit`

**Row 1040 (a `catch` of `Exception` takes an exit under walk) is mine to decide, because the specification settles it.** The status is `NEGATIVE-VERIFIED`, an implementation gap of walk. The specification has an exit complete abruptly until its label takes it, with only `finally` clauses running on the way (`Specification/basic/expressions/label.tex:51-65`, `:72-78`). It names no `LabelException`. So walk comes to the compiled answer: no `catch` takes an exit whose label block is still running. The fix is in walk's `forTry` (`interpreter/evaluator/Evaluator.java:1445-1456`), which today hands any `LabelException` to the `catch` clauses as the library's object. The tests: I promote `tests/XXXExitThroughCatchWalk.fss` to `ExitThroughCatchWalk.fss` (`git mv`, rename the component), see it fail on the base, fix, and see it pass. `compiler_tests/LabelExitCompiled`'s `throughTry` stays as is.

The fix must not touch the late-exit case, which is row 1041's. The team's own tests catch an exit after its label has completed as `LabelException`: `tests/LabelTest.fss:29` and `tests/objectCC_label.fss:184` (`exitNestedUnnamedLabel(1)`, where the object's `m` exits `inner` after it has completed). So the walk fix takes an exit past a `catch` only while a label of its target is running. A late exit stays a `LabelException`, as today. Those two team tests must stay green, and no line of them changes.

**Row 1041 (an exit after its label block has completed) is not mine.** The status is `CONTESTED`, and the specification is silent: it scopes the target statically and says nothing of a label block no longer running. The compiled answer, an uncaught `LabelExit` that ends the program, "was chosen as the path was built, and the curator has not decided" (F-373). The two team tests above assert walk's answer. Following the compiled answer would change team-written tests, which is a point the curator reviews. I leave both paths as they are, keep `compiler_tests/ExitAfterLabelCompletedCompiled` asserting today's compiled behaviour, and report it. It also touches F-401: such a late exit commits the `atomic` blocks it passes, on both paths (rows 1041, 1039). Any answer that makes it catchable must say whether those commits stand.

**Row 1042 (which evaluation an exit leaves when the block is evaluated again inside itself) is not mine.** The status is `CONTESTED`. The row itself says the specification can be read both ways: it scopes the target statically, which fits the compiled per-evaluation identity, and a label completes normally where its body completes abruptly with an exit of its name, which the innermost running evaluation's body does, which fits walk. The record says "Unsettled: which reading stands". I leave it. `compiler_tests/LabelEvaluationIdentityCompiled` keeps asserting the compiled 102, and walk keeps 104.

**Also in reach, by P-180 (fix the open rows that cite my files and need no decision):** rows 1110 and 1111. An exit or exception out of a `tryatomic` that no `atomic` encloses is wrapped in a `RuntimeException` at `Evaluator.java:229-231`. The specification settles both (`atomic.tex`: `tryatomic` acts as `atomic`), and their `XXX` tests get promoted. Row 890 is the compiled `finally` that does not run on an exit or exception (`CodeGen.java:2078-2089`, `XXXFinallyOnEscape`). The specification settles that too (`label.tex:72-78`), and the file is in my set. I take it if the rung's size allows, and otherwise say in the report why it stays. Before editing, `ledger.py find --cites` on `Evaluator.java` and `CodeGen.java`.

Plan's key lines:
1. Promote `XXXExitThroughCatchWalk` → `ExitThroughCatchWalk`, see it fail on the base; add an assertion that a late exit is still caught as `LabelException` (today's answer, row 1041).
2. Walk `forTry`: an exit whose target label is still running passes the `catch` clauses and runs `finally`. Build, then the walk tests: `ExitThroughCatchWalk`, `LabelTest`, `objectCC_label`, `ExitOutOfAtomicWalk`, and `testSystem` once.
3. Promote and fix rows 1110 and 1111 the same way, and 890 if taken.
4. Do not touch 1041 or 1042, and do not change their tests.

Report lines for what I do not decide:
- "Decision not taken (row 1041, CONTESTED, specification silent): is an exit after its label block has completed a `LabelException` that a program may catch (walk, and the team's tests `LabelTest.fss:29`, `objectCC_label.fss:184`), or an uncaught `LabelExit` that ends the program (compiled)? Default: as each path stands. A choice must also say whether the atomic blocks such an exit passes stay committed (F-401)."
- "Decision not taken (row 1042, CONTESTED): does an exit leave the evaluation of its label in which its function was made (compiled, 102), or the innermost one running (walk, 104)? Default: as each path stands, `LabelEvaluationIdentityCompiled` pinned."

Sources:
- `questions-p.md` scenario 7: the entries F-373 and F-401.
- Ledger rows 1040, 1041, 1042, 890, 1110, 1111 (`ledger:`): statuses, tests, file:line and what each leaves open.
- `grep` of `POSITIONS.md` for label/exit: only P-50 on typing, so no decision on these rows.
- `Specification/basic/expressions/label.tex:35-80`: what the specification settles.
- `grep -rl LabelException` over the library and tests, then `tests/LabelTest.fss:15-40` and `tests/objectCC_label.fss:81-95,170-195`: the team tests that catch a late exit.
- `interpreter/evaluator/Evaluator.java:1445-1465`: walk's `forTry`.
- `ls tests`/`compiler_tests` for the label tests: to confirm the gating files exist.

---

## 8. An array of `Number`

**Answer to the curator.** Not as worded. The factory cannot give a vector at `Number`, because `Vector[\Number,n\]` is not a well-formed type. `Vector` and `Matrix` bound their element by `T extends { Number, MultiplicativeRing[\T\] }`, and `Number` is no ring at its own type (F-151; `Library/FortressLibrary.fss:3115` `trait Matrix[\T extends { Number, MultiplicativeRing[\T\] }, ...]`). The factory's `typecase` matches only the eight number types exactly, because `Array1` and `Array2` are invariant (F-229). Row 729 is `CONTESTED` for this reason: "no decision says which gives way".

**The ways and their cost.**
1. *The text gives way:* revise `aggregate.tex:152-170` ("whose elements are a subtype of `Number` is a vector") to "whose element type is one of the number types", with a revision box and an Appendix I entry (P-95). It costs a specification edit and no code. `ArrayFactoryAbstractNumber` stays as it pins today's plain array.
2. *The bound gives way, toward `Number` alone* (the judgement's way 1, 6a). `Vector`'s bodies then have no evidence for their arithmetic: 25 checker errors come back (`reviews/array-fork2-judgement.md` 2.9).
3. *Arithmetic on `Number`* (way 7, 6f), so that `Number` is a ring. That reverses route A's flat tower. The judgement ruled it out.
4. *The ring alone, `T extends MultiplicativeRing[\T\]`* (way 3). It still does not admit `Number`. It brings back the 8 errors measured on 09-29, and it makes `overview.tex:917` false. The judgement ruled it out.
5. *A factory that reads the element bound in place of its fixed list of eight types* (PLAN line 118, for his own `CC64`/`HH64` stress test). It widens the vector to every ring number type, a program's own included, but `Number` itself is still not a ring, so it does not meet the text at `Number` either. It belongs to the array design's return after the switch-over (P-85).

None of the code ways makes `array1[\Number,3\]()` a vector without changing the language's type system. So the question is whether the text yields.

**What the record has said.** The two-trait bound is the default that `reviews/array-fork2-judgement.md` recommended, sections 2.9 and 4 (F-151). The judgement says it keeps "all elements of vectors and matrices must be numbers" true, but it did not address "Array Expressions" at `Number` itself. The question on that sentence is already in his review queue, as climb batch 15 rung L's L.worker.1 (`review-queue.md:478`), with a default.

**The question for him.** "The specification's 'Array Expressions' makes an array of `Number` elements a vector (`Specification/basic/expressions/aggregate.tex:152-170`). Under the library's element bound `{ Number, MultiplicativeRing[\T\] }` (F-151) no vector of `Number` exists, so `array1[\Number,n\]` gives a plain array (F-229, row 729). Does the text say 'whose element type is one of the number types', with a box and an Appendix I entry, or does the library's bound give way? Default (on record, review queue item 478): the text as it stands, the departure listed for a later text rung, and row 729 `CONTESTED` with the plain array pinned by `ArrayFactoryAbstractNumber`." No rung is cut until he answers. If he takes the text's side, the rung is a specification-only rung.

Sources:
- `questions-p.md` scenario 8: the entries F-229 and F-151.
- Ledger row 729 (`ledger:729`): `CONTESTED`, and what keeps it open.
- `grep` of `POSITIONS.md` for the ring bound/Vector: P-28, P-160, P-85, P-87 for context, and no decision on row 729.
- `explorations/reviews/array-fork2-judgement.md`, "In short", 2.3, 2.9, 4: the ways and their measured costs, and the default bound.
- `explorations/coordinator/PLAN.md` line 118 and `review-queue.md` line 478: the bound-reading factory, and the default on record for this question.
- `Library/FortressLibrary.fss:3111-3118` (read during scenario 9): the `Matrix` bound in the source.

---

## 9. A rung on row 808

**The test I start from.** `tests/XXXArray2ShiftedSlice.fss` (row 808's reproducer). The harness reports it today as 'OK Saw expected exception', and on the old code it failed with 'FAIL: a Int: 23 =/= a Int: 12' (`rung-slices-list-equality/REPORT.md:75-77`). Before I edit the library, I promote it: `git mv` to `tests/Array2ShiftedSlice.fss`, rename the `component` line, and see it fail through the harness on the base with that same line, after echoing `Expected failure: FAIL ... 23 =/= ... 12`. It shows a range subscript, a column and the whole subscript of a shifted `Array2` reading the wrong elements. I add assertions for the row's other half, which the test does not hold yet: a shift of a column, `(s[:, 2]).shift(5)`, or of `(m[:,1]).shift(5)`; a shift of a row; and a shift of a shifted `Array2`, `s.shift((1,1))`. Each ends in Java's `ArrayIndexOutOfBoundsException` today (row 808), and each is asserted at its first element.

**Where the fix goes.** `SubArray2.subarray`, `Library/FortressLibrary.fss:3083`: `(o0', o1') = index(on0 - bo0, on1 - bo1)` becomes `index(on0 - b0, on1 - b1)`. The view subtracts its own base, as `Array2.subarray` (`:2999`) and the rank-1 views (`__SimpleSubArray1.subarray`) already do. Row 808 says that with this line the test passes. That is one line, in the library's own form. Row 808's citation `:2828` is stale against today's `:3083`, so I rewrite the row's line reference when I close it.

**Cases to check beyond the test.** A 0-based view, `b0 = bo0 = 0`, is unchanged by the edit. So the cases that move are views whose own base is not the output base: shifted arrays, and their column, row and whole subscript. Others: a transposed shifted array, since `TransposedArray2.subarray` (`:3054-3056`) calls `mem.subarray` with the axes swapped; `Col` and `Row` of a shifted array, whose `subarray` calls `mem.subarray` (`:3095-3096`, `:3106-3107`); and a slice of a slice based above zero, the `u[(0,1)#(2,2)]` case of the earlier rung (`REPORT.md:143`). I assert each in the test, not in a script.

**What must stay green, and why.**
- `Array2SliceAtNonzeroBase` and `Array3SliceAtNonzeroBase`: they hold the base subtraction of rows 793 and 794 (F-279), which this edit must not undo.
- `VectorMatrixCastsWalk`: `Col` and `Row` get their sized `Array2` from the range subscript through `cast` (F-264, `:2972-2976`). A changed `SubArray2` must still answer an array that passes the cast.
- `subArray`, `RangeSubscriptPositions`, `TabulateRungA`, `LibraryMeetDeclarations` and `RelationalPredicateTargets`: the tests that call `.shift(` (grep).
- The 41 test files that use `Vector`, `Matrix` or `DOT`, which the earlier rung ran (`REPORT.md:89`).

The edit is under `Library/`, which walk loads in every program, so I run `testSystem` once after the fix (`tests-running.md`, "When to run a whole suite"). The count and distance stages do not move for a body edit that changes no line count, but a library edit can move them, so they run in the gate.

**What else it can move.** Any view built on `SubArray2`: `Matrix`, which is an `Array2` based at 0, only through a shifted or transposed view; and `Col`/`Row`. microGPT's flat program calls no `shift(` (grep of `run-c4/src` and `apl/mg`), so the model's values should not move. I run its quick check if the brief's gate asks for it. `Array3` has no such override (row 808), so it is not touched.

**What I report.**
- Point to report: the library edit, `Library/FortressLibrary.fss:3083`, before/after, quoted.
- The promoted test's failing run on the base and its passing run.
- Row 808 closed with `ledger.py close 808 --commit HASH --test Array2ShiftedSlice`.
- Defects: none new, unless a case above fails.
- For FACTS: F-279's "except a shifted `Array2`" is no longer true. Hand over a rewrite: "Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, a shifted `Array2` included", tests `Array2ShiftedSlice` with the other two.

Sources:
- `questions-p.md` scenario 9: the entries F-279 and F-264.
- Ledger row 808 (`ledger:808`): the claim, the fix line, and the stale line number.
- `ledger.py find --cites Library/FortressLibrary.fss` (filtered for array/slice/shift): other rows the edit could touch (685 fixed, 1077 unrelated).
- `ProjectFortress/tests/XXXArray2ShiftedSlice.fss`: what the test asserts today.
- `Library/FortressLibrary.fss:2940-3010`, `:3059-3110` and `grep subarray|shift(`: the code paths.
- `explorations/compile-ladder/rung-slices-list-equality/REPORT.md` (grep for Array2/SubArray2): the earlier rung's runs, the failing line, and the cases it measured.
- `grep -rln '.shift('` over the tests and the model programs: which tests and model lines use `shift`.

---

## 10. A proposal to make covariance legal

**Decision: no.** The rewrite goes against two of the curator's decisions, and its premise is half wrong.
- P-25: `Specification/` stays the standard. The 2012 restart's Types chapter is cited beside it, and its `covariant` modifier "neither path implements" and "is future work, off the path to microGPT (P-62)". F-166 says the same: which text governs is the curator's, and he has decided.
- P-97: the specification's examples that break the exclusion rule take the library's shapes, and each original stays, marked "Not allowed". The covariance example is named as rewritten and marked in that way, with a callout of one sentence on `covariant`.
- "The compiled checker already accepts it" is true but misleading. Row 404: the checker accepts `covariant`, and the compiled run then dies with `IncompatibleClassChangeError`, while walk refuses the program. A specification that makes it legal would describe something neither path runs. F-47 says the same: "passes the compiled checker and dies at run time (row 404)".

**Reply to the worker:** "Do not rewrite the covariance example as legal, and keep the 'Not allowed' original. P-97 has the example show the library's shape beside the original under the specification's own mark. P-25 keeps `Specification/` as the standard and makes `covariant` future work (P-62). On `covariant` you may write only what P-97 gives: the callout's one sentence, that the type group's later design in the 2012 Types chapter (`Documentation/Specification/Prose/Language/types.tick:320-339`) declares variance with a `covariant` modifier, which neither walk nor the compiled path implements (row 404). If that sentence is missing, add it. Do not add `covariant` to the chapter on trait parameters. The checker's acceptance is not support: the compiled run dies, and walk refuses (row 404). The ways that run today on both paths are the widening function and the parametric object with a factory (F-47)."

**To the curator:** nothing as a decision. The worker's argument (the restart is the latest word, and the checker accepts the keyword) is the evidence P-25 already weighed, so it is not new evidence (the skill's "When to explore"). I would note in the batch review that a worker proposed to reverse P-25/P-97, in case he wants to see it.

Sources:
- `questions-p.md` scenario 10: the entries F-166, F-47 and F-167.
- P-25 and P-97 (`P-25`, `P-97`): the decisions that govern.
- Ledger row 404 (`ledger:404`): what the checker accepts and how both paths fail.
- `grep covarian Specification/basic/traits.tex`: where the example and its note are.

---

## 11. Parallel reductions after the switch-over

**Will its `SUM`s and `DOT`s run in parallel?** Most will not, and the rung he proposes is already built. By P-175 and F-350, after the switch-over a compiled reduction against the one library forks its halves, but only for a range of more than `grainSize`, 16, elements (`Library/RangeInternals.fss:20`, `:1320`, `:1337`). Until then the prelude's reductions run in sequence, because the analyzer skips prelude calls (row 982). microGPT's widths are `(nEmbd, blockSize, nHead, headDim, vocabSize) = (16, 16, 4, 4, 27)` (`explorations/run-c4/src/MicroGptFlat.fss:17`). So a reduction over an embedding, a block or a head forks nothing. F-350 states this by reading, not by a run. F-350 lists only the 16, 16, 4 and 4 widths, but `vocabSize` is 27, so a reduction over the vocabulary (the logits' softmax sum or max) should fork once. That is my reading too, unmeasured. The matrix product is the exception: it splits down to single elements (`Library/FortressLibrary.fss:3129-3187`; F-356).

**Will four threads make a step faster?** Not in the library's current shape. F-356's Java model of the step with the library's fork/join shape takes 19 to 32 times the plain step on one thread, 55 times on two and 80 on four. With the matrix product stopped at blocks of 16, it is 1.4 to 4.8 times. Threads gain only from a product of about 128 by 128 with blocks of 64, or a dot product of about 260,000 elements. microGPT's products are 16 by 16 to 64 by 16. How far to trust this: one measurement, on a shared 4-CPU machine. It is a Java model with unboxed arrays, so a floor for compiled Fortress with this structure, not a Fortress measurement. Boxed Fortress (the skill's "The compiled runtime") will be slower still, and its relative fork cost may differ.

**What we compare a step with.** The pure-Java baseline of P-7: about 0.10 ms per step without the Adam update and 0.113 ms with it (F-355; fork medians 100.8 to 104.0 µs over 10 fresh JVMs). It is careful scalar Java, not the fastest: the Vector API in the products gives 75 µs. It too was measured once, on a shared machine, and no test checks it. NumPy took 0.20 ms and pure Python 132 ms in the same session.

**The first rung of phase 6 on parallel work.** Not "make the reductions fork": P-175 already decided that and it is built, and at microGPT's sizes forking costs time. The rung I would propose gives the library's matrix product a grain, splitting into blocks of at least 16 instead of single elements. F-356 names the product's missing grain as the largest part of the cost. This applies P-175's own principle, "you need the right forking constants", to the one place the library lacks it. Its before and after: the compiled step against the one library, at one and four threads, against the 0.1 ms baseline, measured in one session. Then whether to raise the grain further, or to keep microGPT's small reductions sequential, is a question for him with the measurement in hand. P-175 declined "reductions left in sequence" as a general rule, so a per-size choice is his.

Sources:
- `questions-p.md` scenario 11: the entries F-350, F-356 and F-355.
- P-175 and P-7 (`P-175`, `P-7`): the decided grain-size fork, and the baseline.
- Ledger row 982 (`ledger:982`): the prelude's reductions are sequential until the switch-over.
- `explorations/run-c4/src/MicroGptFlat.fss:17`: the model's widths, `vocabSize` 27 included.

---

## 12. A walk refusal test that passes on the base

**What the pass on the base means.** The test is broken, not walk. F-383 says walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load, so a `load_` key passes on any such error that it matches. The key `load_exception_contains=q` matches any message that holds the letter "q" ("required", "equal", "unique", any name with a q). So on the base, the program met a static error or load failure whose message holds a "q". Either the program itself has a mistake (an undefined name, a misspelling), or the base refuses it for a reason other than my new check. A test that passes on the base proves nothing about my fix. The skill requires that I find out why and correct it before the fix (`tests-writing.md`, "The order", step 2).

**What I do with the walk test.**
1. Run the program on the base under walk, without the harness key, and read the whole message.
2. If it is an error of the program, correct the program so that, on the base, it loads and runs clean or fails only in the way the defect shows.
3. Key the `.test` on the full message: `load_exception_contains=illegal overload of q`.
4. Run it through `harness-one.sh` on the base, echoing `Expected failure: the harness reports the program not refused at load (it runs)`, and see it fail that way.
5. Fix, and see it pass.

**How I record the compiled failure.** A program that compiles and then fails at run time needs two `.test` files over one component (F-103; `tests-writing.md`, "Writing an `XXX` test"):
- `compiler_tests/XXXOverloadShapeQ.fss`, with `component XXXOverloadShapeQ`. It prints `REACHED` in `run()` before the call that throws.
- `compiler_tests/OverloadShapeQLink.test` (plain name): `tests=XXXOverloadShapeQ` and `link`. It is green while the link reports no static error.
- `compiler_tests/XXXOverloadShapeQ.test`: `tests=XXXOverloadShapeQ`, `run`, no `link`, and `run_out_contains=REACHED`, or `run_out_does_not_contain=REACHED` if the `ClassCastException` comes before `run()` prints. Never `run_out_contains=PASS`.

I run the two in one `junit.sh` call, the plain one first. This is the first `XXX` test my change adds, so I show it twice: once as is, where it must report an expected failure; and once with the failing call removed, where it must go red, before restoring it.

A one-file `XXX` compile test with `compile_err_contains` would be red today ("Saw wrong failure"), because the program compiles (F-103). Yet the true compiled defect is likely that the checker accepts an overload that walk now refuses. If the specification makes the shape illegal, the run-time pair records today's symptom. The ledger row records the cause, "the compiled checker accepts the overload shape that walk refuses as 'illegal overload of q'; the run dies with `ClassCastException`", class `implementation gap (checker)`, reproducer the pair. When the checker is fixed, `OverloadShapeQLink` goes red and is replaced by an `XXX` compile test.

Report lines:
- "My walk test `tests/OverloadShapeQWalk.fss` first passed on the base. Its key `q` matched an unrelated error before the run, which walk's harness counts as a refusal at load (F-383). Base error: '[message]'. I corrected [the program] and keyed the test `load_exception_contains=illegal overload of q`. On the base it now fails ('[harness line]'), and after the fix it passes ('[line]')."
- "Defect (new, row [N]): compiled, the same program compiles and dies at run time with `ClassCastException` ('[lines]'). It is recorded by `compiler_tests/OverloadShapeQLink.test` + `XXXOverloadShapeQ.test` over `XXXOverloadShapeQ.fss`. The checker accepts the shape that walk refuses. The run-time pair is used because a compile-time `XXX` test is red while the program compiles (F-103)."

Sources:
- `questions-p.md` scenario 12: the entries F-383 and F-103.
- `.claude/skills/fortress-repo/references/tests-writing.md`, lines 45, 75-128 ("How a defect is recorded", "The order", "Writing an `XXX` test"): the load key's rule, the run-time pair's exact files and keys, and the base-pass rule.

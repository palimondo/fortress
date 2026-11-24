# Record test of 2026-11-24: the key

For the grader. Two readers answered `questions.md`, each in its own copy of the repository. One copy holds FACTS as it stood on 2026-11-24 (339 entries, the old texts). The other holds the consolidated FACTS (the new texts), with the old texts in `FACTS-history.md`. You score blind to the copy. For each scenario this key gives the right answer; the sentences it rests on, by entry number, as the entries stood on 2026-11-24; where each other fact lives; whether a reader must follow a pointer; what a wrong answer from missing information looks like; and the rubric.

Paths are under `explorations/` unless they start with `ProjectFortress/`, `Library/`, `Specification/`, `java-baseline/` (under `explorations/`) or `.claude/`. "Row N" is a gap-ledger row, printed by `coordinator/tools/facts-extract.sh 'ledger:N'`. A sentence quoted from an entry is the entry's text of 2026-11-24. In the new copy it may sit in another entry, the one that owns its subject, or in the report that the entry points to. A reader who finds it there by a pointer has it.

Scoring. **Decision 0-2**: 2, the decision is right and rests on the facts below; 1, right in the main but missing a fact that changes a step or a number; 0, wrong, or a step that cannot work, or a decision of the curator contradicted, or a choice that is the curator's taken by the reader. **Sources 0-1**: 1, every load-bearing fact beyond the quoted entries is cited to a source that holds it (the sources named below, or an equivalent one), or the answer needed none; 0, such a fact is asserted without a source, invented, or the answer stops at the entries where they could not carry it.

---

## 1. Two failures that the suite does not show

**The right answer.** The compiled overflow is not the change's defect. `bin/fortress run` goes through `bin/run`, which gives 1536 MB and, with `JAVA_FLAGS` unset, the JVM's default 1 MB thread stacks. At four threads a deep forked recursion overflows such stacks: row 640, NEGATIVE-BOUNDED, the known case `library_tests/TimingRungT` (8 of 12 runs). The suite passes because `build.xml`'s `fastTrack` pins `JAVA_FLAGS` to `-Xmx4g -Xss64m`. The worker reruns its compiled test with `JAVA_FLAGS="-Xmx4g -Xss64m"` and `FORTRESS_THREADS=4`, several runs; if it passes, it opens no row (a note on row 640 for the new shape is optional) and says in its report that the test needs the pin. The walk failure is different. `bin/fortress` gives walk 256 MB unless `JAVA_FLAGS` is set (row 67); the harness runs walk tests at 768 MB. The record says to measure a claim about a walk failure near a memory limit at 256 MB. The base ran the twin to its end at that heap and the head does not, so the change raised walk's memory use. That is the change's, not a known gap: the worker measures base against head at 256 MB, more than one run each, and either repairs the cost or reports it as a defect of its change with a ledger row (sibling 67), naming the heap. It does not call it fine because the suite passes at 768 MB. Each claim names its heap and its `JAVA_FLAGS`.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| The suites pin `FORTRESS_THREADS=4` and `JAVA_FLAGS` `-Xmx4g -Xss64m`; without the pin a compiled run step gets 1 MB stacks and `TimingRungT` overflowed in 8 of 12 runs (row 640) | F-99: "`fastTrack` also pins `JAVA_FLAGS` to `-Xmx4g -Xss64m` ... With `JAVA_FLAGS` unset, a compiled test's run step (`bin/run`) gives its threads the JVM's default 1 MB stacks, and at four threads `library_tests/TimingRungT` overflowed in 8 of 12 runs (row 640)." F-107 repeats the pin. | row 640; `build.xml` (`fastTrack`); `coordinator/process-engineering/build-efficiency.md` section 6 |
| Three heaps run walk: 256 MB under `bin/fortress`, 768 MB in the harness, 4 GB under `env.sh` | F-107: "`bin/fortress` gives walk's JVM 256 MB unless `JAVA_FLAGS` is set (row 67: a 2M-element array exhausts it). The harness runs each walk test inside its JUnit JVM, at 768 MB" | row 67; `build.xml` (`junitMem`) |
| Measure a walk memory claim at 256 MB; a test can pass at two heaps and die at the third, and that was a defect repaired | F-107: "Measure a claim about a walk failure near a memory limit at 256 MB." and "before its repair, `IntSemanticsRungI.fss` passed at 4 GB and at 768 MB and died with `OutOfMemoryError` at 256 MB" | `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 3 and 4.4 |
| `bin/run` gives 1536 MB unless `JAVA_FLAGS` is set | F-107: "`bin/fortress run` goes through `bin/run`, which gives 1536 MB unless `JAVA_FLAGS` is set" | `bin/run`; row 640's notes |

**Pointer needed?** No, if the entries keep the two conditions: the 1 MB stacks without the pin, and the 256 MB rule with its example. A reader who loses "measure at 256 MB" and the `IntSemanticsRungI` case needs `rung-int-semantics-walk/REPORT.md` to see that such a failure was a defect.

**Wrong answers from missing information.** Opening a new row for the overflow (row 640 holds it); calling the overflow the change's defect; dismissing the walk failure because the suite passes at 768 MB; rerunning the walk twin under `env.sh` (4 GB) and calling it fixed; comparing one run of base with one of head; making the walk test an `XXX`.

**Rubric.** Decision 2: the overflow tied to row 640 and the unpinned stacks, checked with the pin; the walk failure taken as the change's memory cost at 256 MB, measured base against head and repaired or recorded. 1: one of the two right, or both right but no rerun with the stated settings. 0: both called the change's defect, or both dismissed, or a new row for the overflow with the walk failure dismissed. Sources 1: cites row 640 (or `build.xml` / the build-efficiency note) and row 67 or the `IntSemanticsRungI` report. 0: asserts the heaps or the stacks with no source beyond the entries where it needed one.

---

## 2. A closed family covered by a generic body

**The right answer.** The refusal is row 728, a known defect of walk: an object whose one covering body has a static parameter of its own is refused at load though it is valid, and the compiled path runs it; the gating expected failure is `tests/XXXAbstractMethodGenericBodyWalk.fss`. The worker opens no row and does not fix walk (its brief gives it `Library/` and tests, not walk). It writes `HImpl`'s cover as plain bodies, `g(self, x: Ping)` and `g(self, x: Pong)`: by P-147 bodies at narrower types define the abstract method where together they cover its parameter types, with `comprises` clauses read; walk splits `Side` through its clause, and the compiled checker covers the same way where no static parameter is involved (`compiler_tests/AbstractMethodCoveredPairs`). Its report names row 728 as the reason for the form. A generic body with a second parameter would also meet row 725 on the compiled path. The `Wrap` run shows nothing: walk does not check a generic object for uncovered abstract methods (row 665, open, `XXXAbstractMethodUndefinedGenericWalk`), so a load under walk is no evidence that `Wrap` defines `g`. `Wrap` leaves `g` undefined, so it is ill-formed; the worker gives `Wrap` a body for `g` (or drops `extends H`), and does not cite the walk load as a check.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| A covering body with its own static parameter is refused under walk though valid; the compiled path runs it | F-145: "An object whose one covering definition has a static parameter of its own is refused, though it is valid (row 728, a defect of walk; the compiled path runs it)." | row 728 and its test `XXXAbstractMethodGenericBodyWalk` |
| Narrower bodies cover with `comprises` read (P-147) | F-145: "Bodies at narrower parameter types define an abstract method only where together they cover its parameter types, with `comprises` clauses read, as P-147 decides" | P-147; `compiler_tests/AbstractMethodCoveredPairs`; `compile-ladder/rung-walk-coverage/REPORT.md` sections 1 and 6 |
| The compiled checker does not split where static parameters are involved (row 725) | F-145: "where the abstract method or a body below it has static parameters of its own, it does not split the parameter types, so it refuses an object whose cover needs a split (row 725)" | row 725 |
| A generic object is not checked under walk | F-145: "A generic object is not checked (row 665)." | row 665 and its two `XXX` tests |
| The `override` check is another check (relevant only if the reader writes `override`) | F-147: "Walk refuses an `override` that overrides nothing ..."; "Walk checks the `override` of a generic trait, object or object expression once, at its declaration." | `compile-ladder/rung-walk-override/REPORT.md` section 1 |

**Pointer needed?** Yes for the test name and the status: row 728 gives the expected failure and "NEGATIVE-VERIFIED"; row 665 gives the test that shows walk skips generic objects. The entry carries the rows' numbers and their claims.

**Wrong answers from missing information.** Treating the refusal as the worker's error and rewriting `H`; fixing walk's `Constructor` in a library rung; opening a new row (duplicate of 728); writing a generic body with a second generic parameter (row 725); taking `Wrap`'s walk load as proof that it is complete; adding an `override` modifier to get past the check.

**Rubric.** Decision 2: row 728 named, plain covering bodies written, no walk edit, `Wrap`'s load read as row 665 and `Wrap` given its body. 1: row 728 right but `Wrap` taken as complete, or `Wrap` right but the refusal opened as a new row. 0: the refusal fixed in walk inside the rung, or `H` changed so that the family is no longer closed. Sources 1: cites rows 728 and 665 (or their tests) and P-147 or the coverage report. 0: states the rows' status or the compiled path's behaviour without a source.

---

## 3. A rung on the transaction check of `var` fields

**The right answer.** Not as he words it. Four facts stand in the way. (1) His own condition on row 641, written in `PLAN.md` phase 6: what the specification's `atomic` requires of a variable no transaction can reach, and how the code generator leaves those out, is to be understood first, and the role of the transactional memory described to him, before the checks change (he said he has no knowledge of software transactional memory, 2026-09-19). So the first step is that description, not a rung that drops checks. (2) The `var` field's cell is a default that the batch's planner chose, and he has not decided it; storing the field as a plain JVM field replaces that default, which is his call. Whatever replaces it must keep what the cell gives: an `atomic` block tracks a `var` field (row 319, `compiler_tests/AtomicFieldCompiled`), and a loop body or function expression in the object's method captures the cell (`VarFieldCapturedCompiled`). (3) The check is emitted for locals, top-level variables and fields by one code, `VarCodeGen`; a change of the transaction's variable code reaches fields with no second edit. So a rung on row 641 is a rung on all mutable variables, not on fields alone. (4) The cost on a `var` field is not measured: row 641 measured a loop with mutable locals (64 %) and a scalar accumulator (9 to 15 %), at one thread, and lists "a `var` field" as not measured. A rung's before must measure it. On walk: tasks and transactions are built twice, independently; a compiled fix does not reach walk, and row 641 is compiled-only (under walk its probe stops at load), so "the same for walk" has no measured problem to repair. Reply: no rung yet; first the description of what `atomic` requires, for him; then, if he wants it, a measuring probe of the check on fields, locals and top-level variables, and a decision by him on the cell.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| The cell is a planner's default, not his decision | F-374: "The batch's planner chose the cell as a default, and the curator has not decided it." | `compile-ladder/rung-atomic-expr-field/REPORT.md`, "What changed and why" |
| Every access pays the check, outside `atomic` too (row 641); an `atomic` block tracks a `var` field (row 319) | F-374: "So an `atomic` block tracks a `var` field (row 319, fixed), and every access of one pays the transaction check, outside `atomic` too (row 641)." | row 641; `compiler_tests/AtomicFieldCompiled` |
| Captured cells; one code for all variables | F-374: "a loop body or a function expression in the object's method captures the cell"; "So a change of the transaction's variable code reaches fields with no second edit" | `compiler_tests/VarFieldCapturedCompiled`; row 641's notes (`VarCodeGen.java`) |
| The two implementations are independent | F-179: "A fix in one copy does not reach the other: row 302's fix is in the compiled copy only." | `coordinator/map/modules-and-phases.md`, "B.11 The runtime" |
| His condition before the checks change | none | `coordinator/PLAN.md`, phase 6, the line on row 641 |
| The field's cost is not measured; row 641 is compiled-only | none | row 641's notes: "Not measured: four threads, code inside `atomic`, microGPT, a `var` field. Compiled path only" |

**Pointer needed?** Yes. Neither entry holds his condition or the unmeasured field; row 641 (named in F-374) and `PLAN.md` (named in row 641's line there) hold them. A reader who does not open row 641 cuts a rung that the plan says must wait.

**Wrong answers from missing information.** Cutting the rung as asked; cutting it for fields alone, as though fields had their own check; dropping the cell without noting that the curator has not decided it; promising a speed-up for fields; cutting a walk rung for the same change; letting the rung decide what `atomic` requires.

**Rubric.** Decision 2: no rung as worded; his PLAN condition named; the cell's status; the shared code; the field cost unmeasured; walk independent and not measured. 1: the rung refused or reshaped for the right main reason (the cell's status or the PLAN condition) but missing the unmeasured field cost or the shared code. 0: the rung cut as asked, or a walk rung cut. Sources 1: cites row 641 and `PLAN.md` phase 6, and the rung report or the tests for the cell. 0: states the condition or the measurement without a source.

---

## 4. A gate that reads one error and runs slow

**The right answer.** The error is real until shown otherwise, and the worker's run does not show otherwise. The overloading checker's memo keeps a "valid" verdict per pair and hides some errors, which ones changing from build to build; it is on by default, so an ordinary `fortress compile` can miss them; the gate's count and distance stages run with `-Dfortress.analyzer.overload.cache=false` (`coordinator/tools/distance/run.sh`, `checker-count/run.sh`). The worker's clean compile ran with the memo on, so it is no evidence. The coordinator has the error reproduced with the memo off (the worker's compile with the property, or the distance stage's per-site output). Until the switch-over, neither the count nor the distance turns the gate red, so the error does not by itself hold the landing; the post-batch review ties it to rung C's edit, and it is repaired or becomes a ledger row (the `coordinator` skill's `references/batch.md`, "The checker count and the distance"). It is not written off as a flake. On the time: each stage ran once, its time is the file times of the gate's log, and the distance stage ran beside the first minutes of `testFast`. Load can lengthen a stage more than twofold (217 s at load 3.3 against 574 s at 4.6 to 5.3 for nearly the same code), so 260 s at load 3.8 against 117 s at load 0.29 shows nothing about the checker. The worker's 48 s is not comparable either: one component, the memo on. A time compares only with one taken under a like load; to learn whether the batch slowed the checker, run the stage on the base and on the head in one session, nothing else running, with the machine named. No stage fails on time, so time does not hold the landing either.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| The memo hides errors, changes by build, is on by default; the gate turns it off | F-43: "The overloading checker's memo hides some errors, and which ones changes from one build of the checker to another, so the gate's checker count and distance run with the memo off." and "The memo is on by default ..., so an ordinary `fortress compile` can miss these errors. The JVM property `-Dfortress.analyzer.overload.cache=false` turns it off" | `perf-probes/nat/triage.md` section 1; `coordinator/tools/distance/run.sh:86` |
| Last landed times and loads | F-240: "The checker's count stage takes about 65 s and its distance stage 117 s at the last landed gate"; "ran at a start load of 0.29, then beside the first minutes of `testFast`" | `compile-ladder/climb-batch-36/gate/distance.txt` (`#seconds`, `#machine`) |
| Load can more than double a stage; compare only under a like load | F-240: "Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s ... at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load." | `reviews/batch-16-review.md` section 2 |
| One run each; earlier halving unexplained | F-240: "each gate ran each stage once"; "Both stages about halved at climb batch 27's gate, and no run measured why" | `reviews/batch-27-review.md` section 2 |
| A timing pair is taken in one run, the machine named | none | `fortress-repo`'s `references/records.md`, "Timings and citations" |
| The count and the distance do not turn the gate red; the review ties a risen row to a rung edit | none | the `coordinator` skill's `references/batch.md`, "The checker count and the distance" |

**Pointer needed?** No for the decision, if the entries keep the memo's default and the load sentence. The last gate's load (0.29) is in F-240 and in `distance.txt`.

**Wrong answers from missing information.** Accepting the worker's clean compile as proof of a flake; rerunning the gate for the time without fixing the load; reading 260 s against 117 s as a slowdown of the checker; blaming the other rungs; holding the landing on the time as though it turned the gate red; landing with the error neither tied to rung C nor recorded.

**Rubric.** Decision 2: the error kept, with the memo named as why the worker missed it and a memo-off reproduction, tied to rung C and repaired or recorded; the time read as not comparable, with a like-load pair as the way to measure. A reader who holds the landing until rung C's error is repaired loses no point if it says why; one who holds it on the time alone does. 1: one of the two right. 0: the error dismissed as a flake, or the slowdown asserted from the two numbers. Sources 1: cites the memo's property or the gate tools, `distance.txt` or a batch review for the times, and the skill's rule on the two stages if it says whether they hold the landing. 0: states the memo's effect or the loads without a source where the entries did not hold them.

---

## 5. Walk's departures from the instance rule

**The right answer.** None of the four is a plain repair for this rung. (a) is row 592, classed `deliberate (walk)`: decision D3 of the walk-instance rung's decision record. A parameter that only another fixed parameter's bound mentions takes that parameter's instance, because walk has no expected type to fix it, and the library's `APPCOV[\T, A extends T, B extends T\]` (`Library/CovariantCollection.fss:30`) builds its result at `T`; the specification's inference box names it among walk's departures. Changing it breaks `APPCOV`'s results and goes against a recorded default; leave it, or take it to the curator with the library consequence; the test is `XXXInferThroughBoundWalk`. (b) is walk's rule for an F-bounded parameter, which stays open. Such a bound is not a type until the parameter's instance is known, so there is no bound to take; climb batch 11's rung W built the open type as way 11 of its question Q1 (`compile-ladder/rung-walk-open-param/REPORT.md`). The paper's calculus excludes an F-bound (its soundness proof does not cover the library's `SUM` and `BIG MAX`), and the walk-instance decision record lists that case as "not yet decided". Changing it would change every unwritten `SUM` and `PROD` that nothing directs (the empty-sum case, row 716) and the open-tuple dispatch (row 663, contested). Not this rung's to change; if the worker thinks it should change, it goes to the curator. (c) is D5, a default of the same record: walk cannot evaluate such a bound before the instances are known. A change is a choice to report, not a repair. (d) is row 589, a defect with `XXXDispatchTwoCommonParentsWalk`; P-46 makes the generic applicable at `T = Fruit`, but its repair changes which declaration runs and what `declaredBelow` answers at load, so the record holds it "for the curator". The rung may prepare the repair and measure it, but lands it only with his decision. What the rung can repair are the defects that give `Bottom` (rows 587, 591, 612), which P-48 names. The report lists (a) to (d) as decisions not taken, each with its row and test.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| D3: a parameter only another's bound mentions takes that instance | F-141: "a parameter that only another fixed parameter's bound mentions takes that parameter's instance, not its own bound: `ap[\T, A extends T\](a: A)` gives `T` the type of `a` (D3, row 592)" | row 592 (`deliberate (walk)`, `APPCOV`); `compile-ladder/rung-walk-instance/decision-record.md` section 2, D3 |
| These are defaults of a rung, not his decisions | F-141: "Two more rules are defaults of the walk-instance rung's decision record." | the decision record |
| D5 | F-141: "a lone one whose bound mentions a static parameter has the arguments' supertypes among its candidates, and so takes their narrowest common supertype, never its bound (D5)" | decision record, D5 |
| Row 589's repair is the curator's | F-141: "a generic passed over at dispatch when its arguments have several minimal common supertypes (row 589), whose repair changes which declaration runs, the curator's to decide" | row 589 ("F-141 holds the repair for the curator") |
| An F-bounded parameter stays open, and where that reaches | F-143: "Under walk, a type parameter whose bound mentions itself and that nothing at a call fixes is left open."; "an empty `SUM` or `PROD` that no declared type directs, which takes `ZZ32`'s identity ... (row 716)"; "(row 663, contested)" | F-271 (the paper does not cover F-bounded functions); the decision record's rationale |
| The defects that give `Bottom` | F-141: rows 591, 612, 616, 587 | P-48: "Rows 587, 591 and 612: three cases in which walk still gives `Bottom`." |

**Pointer needed?** Yes for (a): the entry says D3 is a default; only row 592 says it is deliberate and that `APPCOV` depends on it. A reader who stops at the entry may "repair" (a).

**Wrong answers from missing information.** Changing (a) and breaking `APPCOV`; giving F-bounded parameters their bound in this rung; repairing row 589 without the curator; calling D3 and D5 the curator's decisions (they are a rung's defaults); missing the `Bottom` rows as the rung's real work.

**Rubric.** Decision 2: (a) left, with row 592's `APPCOV`; (b) left or taken to the curator; (c) a default, change reported; (d) the curator's; the `Bottom` rows named as repairable. 1: three of the four right, or all four right but no library consequence named for (a). 0: (a) or (d) changed in the rung as a plain repair. Sources 1: cites rows 592 and 589 (or their tests) and the decision record. 0: states the departures' status without a source.

---

## 6. An empty sum under walk

**The right answer.** Rewrites (a) and (d) give `RR64`'s zero; (b) and (c) do not. Walk instantiates an unwritten reduction by a declared type only where it is a local variable's type, or a top-level or local function's declared return type. A method's return type, a top-level variable, a field, an assignment, a function expression, a branch and a call's argument do not direct it. With no element and no declared type, `SUM`'s F-bounded parameter stays open and takes `ZZ32`'s identity: row 716, with `tests/XXXUnwrittenEmptyFloatSumUntypedWalk.fss`. The original line is also row 705's case: a call's argument gets no expected type under walk. So the `0` is a known gap, not the change's defect: no new row, no new `XXX` test. The worker writes (a) or (d) in the twin and cites rows 716 and 705 for the departure from the compiled test. It does not change walk: its brief is a library rung, and whether walk should give the argument a type is an open question for the curator (`PLAN.md`, "B.worker.1 and B.skeptic.1 of climb batch 15's rung B": accept it as walk's limit until the switch-over, or a defect for a later rung; no default on record, the review's natural default walk's limit). Nothing new goes to the curator; the question is already listed.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| Which declared types direct an unwritten reduction | F-228: "The declared type is a local variable's, or a top-level or local function's declared return type ... A method's return type, a top-level variable, a field, an assignment, a function expression, a branch, a call's argument and another clause form's body do not direct it." | `compile-ladder/rung-walk-elements/REPORT.md` section 5.3 |
| The empty, undirected case is row 716 | F-228: "an empty clause form that no declared type directs takes its bound or stays open (row 716)" | row 716; F-143 ("takes `ZZ32`'s identity") |
| A clause form as a call's argument gets no declared type | F-228: "a clause form that is a call's argument gets no declared type (rows 510, 705)"; F-221: "Walk gives such an argument no expected type (row 705)." | row 705 |
| The compiled checker retries an argument against the parameter's type | F-221: "The compiled checker retries a call written as another call's argument ..." | `compile-ladder/rung-argument-context/REPORT.md` |
| The question is open for the curator | none | `coordinator/PLAN.md`, the item on row 716 under "Climb batch 15, listed for his review" |

**Pointer needed?** Yes for the last point: neither entry says that the curator holds the question of row 716; row 716 and `PLAN.md` do. The contexts list must survive in the entry or its report section 5.3, or a reader picks (b) or (c).

**Wrong answers from missing information.** Choosing (b) (an assignment) or (c) (a method's return type); opening a new row; adding an `XXX` test; changing walk to give the argument an expected type in a library rung; asking the curator a question that `PLAN.md` already holds.

**Rubric.** Decision 2: (a) and (d) yes, (b) and (c) no, rows 716 and 705 named, no walk edit, the open question found. 1: the rewrites right but the rows or the open question missing, or one rewrite wrong. 0: (b) or (c) chosen as the fix and the others not, or walk changed in the rung. Sources 1: cites rows 716 and 705 (or their tests) and the report or `PLAN.md`. 0: states the contexts or the status without a source where the entries did not hold them.

---

## 7. A rung on `label` and `exit`

**The right answer.** The three rows differ. Row 1040 (walk's `catch` of `Exception` takes an exit): the specification settles it. It names no `LabelException`; an exit completes abruptly until its label takes it, and only `finally` clauses run on the way (`Specification/basic/expressions/label.tex`). The row is classed a gap of walk. The rung may bring walk to the compiled answer, promote `tests/XXXExitThroughCatchWalk.fss`, and report the choice with its ground. It notes that the compiled path departs on the same passage too: a `finally` clause on an exit's way does not run (row 890, `XXXFinallyOnEscape`), outside this brief. Row 1041 (an exit after its label block has completed): the specification is silent and the row is CONTESTED; the compiled answer, an uncaught `LabelExit`, was chosen as the path was built, and the curator has not decided it. The rung does not choose. It reports a decision not taken with its alternatives: an uncaught `LabelExit`, or a `LabelException` that a program may catch, as walk does. Whatever answer comes, such a late exit today also commits the `atomic` blocks it passes on both paths, so the answer touches the atomic semantics too. Row 1042 (which evaluation an exit leaves): CONTESTED, "which reading stands" unsettled; the specification scopes the target statically and also says the label completes where its body completes abruptly, which the innermost evaluation's body does. The compiled test `LabelEvaluationIdentityCompiled` asserts the compiled answer. Not the rung's; reported as a decision not taken. Walk's `tryatomic` wrapping of an exit (rows 1110, 1111) is in walk's evaluator but outside the brief's rows; listed, not touched. The first plan, all three to the compiled answer, is wrong for 1041 and 1042.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| Three compiled answers were chosen as the path was built; the curator has not decided them | F-373: "Three of the compiled answers were chosen as the path was built, and the curator has not decided them; walk answers each otherwise: ... (row 1042); ... (row 1040); ... (row 1041)." | rows 1040, 1041, 1042 |
| `finally` does not run on an exit's way, compiled | F-373: "a `finally` clause on the exit's way does not run (row 890)" | row 890 |
| A late exit commits the atomic blocks it passes | F-401: "Neither path tells an exit to an enclosing label from one to a label block that has completed, so such a late exit also commits the atomic blocks it passes (row 1041)." | row 1041's notes |
| Walk's `tryatomic` wraps an exit | F-401: "(rows 1110 and 1111)" | rows 1110, 1111 |
| Row 1040: the specification settles it; a walk gap | none | row 1040's notes and class; `Specification/basic/expressions/label.tex` |
| Rows 1041 and 1042: CONTESTED, unsettled | none | rows 1041 and 1042 |

**Pointer needed?** Yes. The entry puts the three rows together as undecided; only the rows show that 1040 is a walk gap the specification settles, while 1041 and 1042 are contested. A reader who stops at the entry either takes all three to the curator (decision 1) or decides all three (decision 0).

**Wrong answers from missing information.** Bringing walk to the compiled answer in all three rows; leaving all three to the curator without seeing that the specification settles 1040; missing the atomic consequence of 1041; fixing row 890 or rows 1110 and 1111 inside this brief without saying so.

**Rubric.** Decision 2: 1040 done by the specification, 1041 and 1042 reported as decisions not taken, the atomic consequence and row 890 named. 1: 1041 and 1042 right but 1040 also left undecided, or the atomic consequence missing. 0: 1041 or 1042 decided in the rung. Sources 1: cites the three rows and `label.tex` (or row 1040's notes). 0: states the rows' status or the specification's text without a source.

---

## 8. An array of `Number`

**The right answer.** Not as worded. `Vector` and `Matrix` bound their element type by `T extends { Number, MultiplicativeRing[\T\] }`. `Number` is not a ring at its own type, so `Vector[\Number,n\]` is not a well-formed type, and the factory has no vector to give at `Number`. The plain array there is row 729, CONTESTED, pinned by `tests/ArrayFactoryAbstractNumber.fss`. The ways: (1) the specification gives way: the text says "whose element type is one of the number types", with a revision box and an Appendix I entry; cost, a text rung only. (2) The library's bound gives way, so that `Number` meets it; that reopens the array family's bound, which the compiled checker now accepts through `MultiplicativeRing[\T\]` alone, since `Number` declares no arithmetic. The bound is the default of `reviews/array-fork2-judgement.md` (sections 2.9 and 4 measure the ring alone and the bound's cost); a change touches every body of `Vector` and `Matrix` and the distance. The record already holds the question: `PLAN.md`, L.worker.1 of climb batch 15's rung L, with the default "the text as it stands, the departure listed for a later text rung". The draft question for him repeats that item, with the default. Under walk, a factory called at a type inferred from `ZZ32`, `ZZ64` or `RR64` values does give a vector, so the departure reaches only an abstract element type.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| The bound; `Number` does not meet it; not well-formed | F-151: "The eight number types meet the bound. `Number` itself and the numeral types do not, since none is a ring at its own type. So `Vector[\Number,n\]` is not a well-formed type" | `reviews/array-fork2-judgement.md` sections 2.9 and 4 |
| The checker accepts the arithmetic only through the ring | F-151: "`Number` declares no arithmetic, so the compiled checker accepts the bodies' arithmetic only through `MultiplicativeRing[\T\]`." | F-324 |
| A plain array at other types; the specification differs (row 729, contested) | F-229: "The specification's "Array Expressions" makes an array of `Number` elements a vector (row 729, contested)." | row 729 |
| Walk infers a concrete type and gets a vector | F-229: "Under walk, a type parameter inferred from a `ZZ32`, `ZZ64` or `RR64` value is that type, so it gets a vector" | `tests/ArrayInferredElementVectorWalk` |
| The question and its default are on record | none | `coordinator/PLAN.md`, L.worker.1 of climb batch 15's rung L; row 729's notes |

**Pointer needed?** Yes for the default: only `PLAN.md` (named in row 729's notes) holds the question with its default.

**Wrong answers from missing information.** Cutting the rung as worded; proposing a `Number` branch in the factory's `typecase`; drafting a new question without the one on record; changing the bound without naming its cost.

**Rubric.** Decision 2: not as worded; both ways with their cost; the PLAN item and its default found. 1: the two ways right but the item on record missed, or one way's cost missing. 0: the rung cut as worded. Sources 1: cites row 729 and `PLAN.md` (or the judgement). 0: asserts the contested status or the default without a source.

---

## 9. A rung on row 808

**The right answer.** Start from `tests/XXXArray2ShiftedSlice.fss`, run it through the harness on the base to see its expected failure, then promote it. The fix is the one line in `SubArray2`'s own `subarray`: it subtracts the output base, `index(on0 - bo0, on1 - bo1)`, where its own base belongs; the fix is `index(on0 - b0, on1 - b1)`, as `__SimpleSubArray1.subarray` subtracts its own base. Its line today is `Library/FortressLibrary.fss:3083` (the report's `:2816` and the row's `:2828` are older). The report measured this line passing `XXXArray2ShiftedSlice`. The row claims more than the test: every subscript of a shifted `Array2`, and a shift of a slice, a column or a row, which ends in `ArrayIndexOutOfBoundsException` (`(m[:,1]).shift(5)`, through `Array1.shift` of a `Col` or `Row`). The worker checks which of these the test asserts, and adds asserts for the others, or says which the fix does not reach. Must stay green: `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, and `VectorMatrixCastsWalk`, since `Array2`'s column and row subscripts build their sub-array with a range subscript and cast it to the sized `Array2` that `Col` and `Row` take; a change of what a slice reads passes through those casts. The edit is a library edit of the team's line: a point to report, and the commit says it edits the original tree.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| The defect's place and its reach | F-279: "`SubArray2`'s own `subarray` subtracts the output base instead of its own (`:3083`, row 808), so a slice of a shifted `Array2` still reads the wrong elements, and a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`." | row 808 |
| Its tests | F-279: "Tests: `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`." | |
| The one-line fix, measured | none | `compile-ladder/rung-slices-list-equality/REPORT.md` section 11 ("Row 808's one-line fix ... was measured passing `XXXArray2ShiftedSlice`") and section 1 |
| The column and row subscripts cast a range subscript's sub-array | F-264: "the sub-array that `Array2`'s column and row subscripts pass to `Col` and `Row`"; "Each builds its sub-array with a range subscript, which answers an unsized `Array`, and the cast gives it the sized `Array2`" | `tests/VectorMatrixCastsWalk.fss`; `compile-ladder/rung-array-sites/REPORT.md` section 1 |

**Pointer needed?** Yes for the fix's form: the entry places the defect, the report gives the measured line. The column and row shifts are in the row's claim.

**Wrong answers from missing information.** Writing a new test instead of promoting the `XXX` one; changing `Array2.subarray` or `Array2.shift` instead of `SubArray2.subarray`; citing `:2816` or `:2828` as today's line; checking only the slice case; missing `VectorMatrixCastsWalk`; not reporting the library edit.

**Rubric.** Decision 2: the `XXX` test promoted, the fix at `SubArray2.subarray` in the measured form, the row's other cases checked, the casts' test kept green, the library edit reported. 1: right test and fix but the other cases or the casts missed. 0: the fix in the wrong method, or a fix planned without a test. Sources 1: cites row 808 or the rung report, and the casts' test or report. 0: gives the fix or its line without a source.

---

## 10. A proposal to make covariance legal

**The right answer.** No. The curator decided this: `Specification/` stays the standard and the restart's Types chapter is cited beside it (P-25); the restart's `covariant` modifier is future work, off the path to microGPT, implemented on neither path (P-25, P-62). The checker's acceptance is not support: the compiled checker accepts `covariant` and the run dies with `IncompatibleClassChangeError`, and walk refuses the program (row 404). The specification keeps each example that the exclusion rule refuses, marked "Not allowed", beside the library's shape (P-97). So the worker keeps the example and its mark, and writes nothing that makes `covariant` legal. The library's shapes in its place are measured: a parametric object with a factory, or a widening function, runs on both paths as a user program. Where the text must mention `covariant`, it says it is future work, as P-25 does. Nothing goes to the curator unless the worker has evidence the decisions did not use; "the restart is the team's latest word" is the ground of P-25 itself, so it is not new evidence.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| Which text governs is the curator's; `covariant` is future work | F-166: "Which text governs is the curator's: `Specification/` stays the standard, the Types chapter is cited beside it, and `covariant` is future work (P-25)." | P-25; P-62 |
| The `covariant` keyword passes the checker and dies at run time | F-47: "The 2012 `covariant` keyword passes the compiled checker and dies at run time (row 404)." | row 404; P-62 |
| The alternatives, measured on both paths | F-47: "a parametric object with a factory, or a widening function, runs on both paths as a user program" | `reviews/spec-refused-examples.md`, "What was found" |
| The specification keeps refused examples marked "Not allowed" | F-167: "The specification states instantiation exclusion and keeps each example that the rule refuses, marked "Not allowed"" | P-97; `compile-ladder/rung-spec-route-a/decision-record.md` sections 2 and 3 |

**Pointer needed?** No for the decision: the three entries carry it. The reader should still cite P-25 or P-62, which the entries name.

**Wrong answers from missing information.** Letting the worker go ahead; treating the checker's acceptance as working support; dropping the "Not allowed" original; sending the curator a question that P-25 and P-62 already answer.

**Rubric.** Decision 2: no; P-25 or P-62; row 404; the example kept with its mark and the library's shape. 1: no, but on a partial ground (for example only P-97, with the run-time failure missed). 0: yes, or a question to the curator as though nothing were decided. Sources 1: cites P-25 or P-62 and row 404 or P-97. 0: none of them.

---

## 11. Parallel reductions after the switch-over

**The right answer.** After the switch-over, a reduction compiled against the one library forks its halves only over a range of more than 16 elements, the grain (`grainSize`, `Library/RangeInternals.fss:20`; P-175); until then the prelude's reductions run in sequence (row 982). microGPT's vectors are 16, 16, 4 and 4 wide (`MicroGptFlat.fss:17`), so a reduction over one of them forks nothing on either path; this is by reading, not run. So "make the reductions fork" changes little for microGPT's vectors, and where it does fork it costs. The Java model of the step in the library's fork/join shape runs 19 to 32 times slower than plain loops on one thread at the library's grains, 55 times on two threads and 80 on four; threads gain only at sizes far above microGPT's (a product of about 128 by 128 with blocks of 64). The largest part of the cost is the matrix product, which splits down to single elements (`Library/FortressLibrary.fss`, the `Matrix` product's `mul`); with blocks of 16 the model is 1.4 to 4.8 times slower. So four threads will not make a step faster at these sizes, and the first rung on parallel work should give the matrix product a grain, as P-175 asks of the range ("the right forking constants"), not add forking. Trust: the model is Java, not Fortress, a floor for this structure; measured once, on a shared machine of 4 CPUs. The number to compare a step with is the pure-Java baseline of P-7: about 0.10 ms a step without Adam, 0.113 ms with it, measured once on a shared 4-CPU machine with OpenJDK 25. It is the careful scalar Java, not the fastest (the Vector API in the products gives 75 µs); whether the baseline is this program or the fastest Java is review-queue item 524.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| Prelude reductions sequential until the switch-over; the one library's range splits only above 16 | F-350: "The analyzer marks no call written in the prelude's files, so the prelude's reductions run in sequence until the switch-over (row 982); the one library's parallel `ZZ32` range splits only a range of more than `grainSize`, 16, elements" | row 982; P-175 |
| microGPT's widths fork nothing, by reading | F-350: "By reading, not run: microGPT's vectors are 16, 16, 4 and 4 wide ..., so a reduction over one of them forks nothing on either path." | `reviews/batch-30-review.md`, "2. The three forks that landed at a default" |
| The fork/join model's ratios and the product's missing grain | F-356: "At the library's grains a step takes 19 to 32 times the plain step on one thread, 55 times on two and 80 on four."; "the matrix product's missing grain is the largest part of the cost" | `java-baseline/REPORT.md` section 6 |
| The model is a floor; measured once | F-356: "its times are a floor for compiled Fortress with this structure"; "Measured once on a shared machine of 4 CPUs" | |
| The baseline's number and its limits | F-355: "one training step at batch 1 takes about 0.10 ms after warm-up without the Adam update, and 0.113 ms with it"; "It is the careful scalar Java, not the fastest" | `java-baseline/REPORT.md` sections 4 and 5; `coordinator/PLAN.md` phase 6 (review-queue item 524) |

**Pointer needed?** No for the decision, if the entries keep "by reading, not run", the grain, the ratios and the product's missing grain. P-175 (named in F-356) gives the curator's own words for a grain.

**Wrong answers from missing information.** Promising a speed-up from four threads; cutting a rung that makes more calls fork; saying microGPT's reductions fork after the switch-over; stating the model's ratios as compiled Fortress's measured times; stating the baseline as the fastest Java.

**Rubric.** Decision 2: no speed-up from threads at these sizes; the widths fork nothing (by reading); a grain for the matrix product as the first rung; the baseline with its limits. 1: the decision right but the trust of a number misstated (the model taken as measured Fortress, or "by reading" lost), or the product's grain missed. 0: the curator's rung endorsed. Sources 1: cites the baseline report (or the entries' commands) and P-175 or row 982. 0: numbers with no source beyond the entries where the answer needed one.

---

## 12. A walk refusal test that passes on the base

**The right answer.** The pass on the base proves nothing about the fix. Walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load, and a `.test` whose `load_` keys expect a refusal passes on any such error that its keys match. The key `q` matches almost any message. So the base refused the program for another reason, perhaps an error in the test program itself, and the key matched. The worker runs the program under walk on the base to see the message, removes any unrelated static error from the program, sets the key to the check's own message, `illegal overload of q`, and sees the test fail on the base through the harness before the fix, then pass after it. The compiled failure: the program compiles and links and fails at run time. An `XXX` prefix makes every command of its `.test` a must-fail, so one file cannot express it. It needs two `.test` files over one component, the component named `XXX...`: a plain-named file with `link`, green when the link reports no static error, and an `XXX`-named file with `run` and the run key for the failure, and no `link`; the two run in one call, the plain one first (`tests-writing.md`, "Writing an `XXX` test"). An `XXX` compile test of a program that compiles would be red, "Saw wrong failure". The report says the failure is a defect of the compiled path recorded by the pair and its ledger row, and that the walk test was rekeyed after it passed on the base.

**The sentences it rests on.**

| Fact | Entry, 2026-11-24 | Elsewhere |
|---|---|---|
| A pre-run static error counts as a refusal at load | F-383: "Walk's harness counts a static error that a phase raises before the run, such as the disambiguator's, as a refusal at load, so a walk `.test` whose `load_` keys expect a refusal at load passes on such an error that its keys match." | `FileTests.java` (`InterpreterTest.thrownAtLoad`); `compile-ladder/rung-typecase-unbound-arm/REPORT.md`, "10. Decisions" |
| A program that compiles then fails needs two `.test` files | F-103: "So such a defect needs two `.test` files over one component: a plain-named file that drives `link`, and an `XXX` file that drives `run`" | `fortress-repo`'s `references/tests-writing.md`, "Writing an `XXX` test" |
| An `XXX` compile test of a program that compiles is red | F-103: "An `XXX` compile test with a `compile_err_contains` key whose program compiles is red: "Saw wrong failure"." | |
| A compiled refusal test is `XXX`-named | F-383: "A compiled refusal test is still `XXX`-named" | |

**Pointer needed?** No. The skill's `tests-writing.md`, which every worker loads, also holds the two-file form.

**Wrong answers from missing information.** Taking the pass on the base as a sign that walk already refuses the shape; keeping the key `q`; one `XXX` file with `compile` and `run`; an `XXX` compile test; a plain-named `run` test left red.

**Rubric.** Decision 2: the pass read as a pre-run error matched by a loose key, the key made exact and seen failing on the base; the two-file form for the compiled failure. 1: one of the two right. 0: the pass taken as the base already refusing the shape, and the compiled failure in one `XXX` file. Sources 1: cites the harness code, the rung report or `tests-writing.md`. 0: none where the answer needed one.

# Answers: the trap test, the copy with the entries as at bedc80b01

Answered as the coordinating session, after loading `fortress-repo` (with its `references/records.md`) and then `coordinator`. No boot steps were taken. Nothing was built, run or edited in `/home/user/record-test-p`. All `facts-extract.sh` queries ran with `--root /home/user/record-test-p`. The skills I read are the copy's own `.claude/skills/`, which I compared byte for byte with the loaded ones (31 files, no difference).

One note on scope: when `fortress-repo` loaded, the harness displayed a Read of `/home/user/fortress/Library/FlatString.fss`, which is outside the folder. I did not ask for it, and no answer below uses it.

---

## 1. A tuple-typed parameter of a dotted method

**Decision.** This is a code-generator defect. It is not a rule of the language. The rung records it and goes on with its own mission. I take neither (a) nor (b). Nothing goes to the curator while the batch runs.

**Reply to the worker.**

- **The defect.** On the compiled path, a generic dotted method whose single parameter has a tuple type dies at the call with `ClassCastException` in `castTo`. The tuple can be written, as in `first[\U\](y: (U, U))`, or come from a tuple static argument, as in `b.wrap[\(ZZ32,ZZ32)\]((2, 3))`. `CodeGen.receiverPrependedDomainType` (`CodeGen.java:6250-6263`) adds the receiver in front of the tuple's elements. So the call casts to a three-place arrow, while the class loader makes a two-place closure whose second place is a pair. It happens under both bounds, and walk runs both shapes (the probe's "What the code shows": `2`, `2 3`). The JVM has no limit here: the closure is built correctly, and only the call site's spelling of its domain is wrong. A fix is code-generator work.
- **What the rung does now.** Keep to your files and your mission, the bound `Any` and the ten tests. Do not touch `CodeGen.java`. The defect neither blocks the flip nor comes from it. If the test you were respelling met this shape, respell it another way that keeps its checked value, for example with two parameters or a top-level generic function. List that line before and after: it goes on the review list (`batch.md`, "The checker count and the distance").
- **Where it is recorded, and its class.** The specification settles the answer: the method's parameter is bound to the argument's value, and walk prints `2`. So this is way 2 of "How a defect is recorded": a gated `XXX` test that asserts the specification's answer, written now, in `compiler_tests/`, which is inside your files. Write it as a run-time pair: `XXXDotTupleParam.fss`, which prints `REACHED` and then asserts `Box[\ZZ32\](1).first[\ZZ32\]((2, 3)) = 2`; `DotTupleParamLink.test` (`link`); and `XXXDotTupleParam.test` (`run`, `run_out_contains=REACHED`). Show it through `junit.sh` twice, as `tests-writing.md` says: once as it is, and once changed so that the defect does not show, which must be red. Write a new row in your `record.md` as `NEW-<rung>-1`, in the row template. The gather adds it with `ledger.py add` (`CLIMB-BATCH-22.md`, "The ledger").
  - Section: "12. The compiled path: constructs, crashes and the switch-over".
  - Status: `NEGATIVE-VERIFIED`.
  - Class: `implementation gap (codegen)`. Not `design limit (specification)`.
  - Spec citation: `Specification/basic/expressions/method-invocation.tex`, "Dotted Method Invocations".
  - Notes: sibling row 339; the mechanism at `CodeGen.java:6250-6263` and `:6316-6355`; walk runs both shapes; the workaround (two parameters, or a top-level generic); the probe report's path.
  - Check it with `ledger.py check --rows FILE`.
- **(a) is not taken.**
  - P-26 settles conflicts between the type group's later positions and the specification's early text. The team's comment is not a later position. It says "We need to figure out what this means", which is an open question about their own code generator. No word of theirs conflicts with the specification or with P-42 here. So P-26 does not apply.
  - P-77 is a decision of the curator's, for a real JVM limit: an array holds at most as many elements as the largest `ZZ32`. This defect has no such limit behind it. It is one call site's arity, which a fix removes.
  - The rule would not even cover the defect. `wrap[\U\](y: U)` at a pair dies too. To refuse that, the checker would have to refuse tuple static arguments for dotted generic methods, and that goes against P-42, whose point is that generics instantiate at tuples.
  - The rule would change the checker, walk and the specification. That is three areas and a language change, so it is not a worker's choice (`exploring.md`, "The choices that are yours"). The three principles do not support it either. The team left no word, the library instantiates generics at tuples, and peer languages take a tuple-typed parameter.
- **(b) is not taken.**
  - It would keep the bound `Object` past the switch-over for part of the language. That bends P-42, which ends the departure at the switch-over.
  - It rests on the Working Draft's `Object`, which P-42 already overrode. The specification's callout records that text.
  - It would not repair anything. The probe shows `first[\U\](y: (U, U))` dying under the bound `Object` too. The bound keeps out only the tuple-static-argument shape.
- **The fix's home.** One code-generator rung, by the probe's reading. Code-generator work can go on beside the phases, under either library (P-33, P-37). I route it to PLAN at the landing.

**What goes to the curator.** No ask and no hold. Neither way is taken, so no decision of his moves. During the batch I say nothing about it (`SKILL.md`, "Quiet times"). At the landing, the new row is in the batch's defects, and one line goes on the batch's review list: "the dotted-method tuple-parameter crash recorded as `implementation gap (codegen)`, not made a language rule, and the bound `Object` not kept for dotted methods; default as landed".

Sources:
- `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/trap-test/questions-p.md` (`questions-p.md` below): the scenario.
- `.claude/skills/fortress-repo/SKILL.md`, `references/records.md`: the record's queries, the ledger's form, the report's items.
- `.claude/skills/fortress-repo/references/tests-writing.md`: how a deferred defect is recorded, and the form of a run-time `XXX` pair.
- `.claude/skills/fortress-repo/references/exploring.md`: which choices are a worker's.
- `.claude/skills/fortress-repo/references/revival-changes.md` (grep for "tuple"): no revival rule on tuple-typed parameters.
- `.claude/skills/coordinator/SKILL.md`, `references/batch.md`, `references/delegating.md`: what counts as consequential, the review list, quiet times during a batch.
- `explorations/perf-probes/bound-any-compiled/REPORT.md`, whole: the defect, its cause, its controls under both bounds, walk's output, and its proposed ledger section.
- `explorations/coordinator/POSITIONS.md` via `P-42+`, `P-95`, `P-77+`: the bound `Any`, the revision form, and the JVM-limit precedent.
- `explorations/coordinator/FACTS.md` via `P-42+` and `P-77+` (F-289, F-173, F-174, F-133): what the bound flip touches.
- `explorations/fortress-gap-ledger.md` via `ledger-find` (receiverPrependedDomainType; tuple dotted; ClassCastException tuple; bound-any-compiled; generic method tuple; single parameter tuple; castTo; dotted generic), `ledger:412`, and the row template: no row holds the defect yet, and the valid classes.
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6235-6275`: the site and the team's comment.
- `Specification/basic/expressions/method-invocation.tex:12-60`, and a grep of `Specification/basic/` for section headings on methods: the spec citation for the row.
- `explorations/coordinator/CLIMB-BATCH-22.md` (grep, and its sections "The rule the rungs keep", "The ledger"): how a rung hands over a new row.
- `explorations/coordinator/INDEX.md`, `review-queue.md`, `CLIMB-BATCH-20.md` (grep for "22c" and for the probe): no batch-22c record in this copy, and the probe's INDEX line.

---

## 2. The order traits' self type, in a planner's draft

**Decision on the rung.** Climb batch 22c drops it. That is my call, because P-146 settles it: "The library's text gains no self type and no `comprises` clause, and walk is unchanged." The rung is that change, on seven traits and in walk. It would reverse a decision of the curator, and no batch lands that under the standing go (`batch.md`, "The go"). No other rung needs it. Phase 3's exit does not need it either: the distance is 0 under P-146's rule as built (F-53, F-225). So I drop it instead of holding the batch. Its line under "Left out, each with its home" points to the review-queue item below.

**The two arguments, corrected in the batch record before the curator reads it.**
- The planner's reasons do not hold. P-26 settles the type group's later word against the specification's early text. Here the specification has had the idiom since 2009 (`var-ref.tex:63-69`). The split is between two parts of the team's own work: the compiler's prelude, and the interpreter's library, which kept the F-bound with no clause. P-37 lets the one library take a prelude design, but it does not pick one. And "the revival does not second-guess them" cannot reverse a decision of the curator's; only he can.
- The Fable reviewer reaches the right end with a wrong reason. P-37 says outright: "The decision settles which files survive, not the designs inside them: the one library may take a design of the prelude's". So "the prelude is a bootstrap" is no argument against a design of the prelude. The grounds are P-146 itself and P-27: the interpreter's library never had a clause on these traits (ways note, section 3, step 7). I correct this in one line, so that the curator is not told that the prelude's designs are off limits.

**The sweep's finding.**
- **Its first bullet is not new.** The judgement behind P-146 cited `CompilerAlgebra.fsi:16`, `:24` (section 2, item 2). The page he answered said: "Their compiled-world idiom was a `comprises` clause naming the parameter" ("For Pavol", option 2). Under the skill's rule, a new view of evidence that the decision used is not new evidence.
- **Its second bullet is new.** The record has no `655e65d53`. It knows `59fdeff62` only for the coverage check and for the trait-below-trait case that Steele commented out for a stack overflow. The ways note's history of the idiom stops at 2011-12-06. So the record does not hold the dating, or the fact that the compiled world's last edit of `StandardTotalOrder` went from the F-bound to the clause. This bears on the reason he gave for option 1 at 23:32 UTC on 2026-10-13: "more in line with weak signal from repo" (`history:P-146`).
- **What I do first.** I launch a Sonnet archaeology worker, retrieval only. It runs `git show` of both commits on `Library/CompilerAlgebra.fsi` and on the checker files, and confirms the interpreter library's form at `a874948ac`. Then I weigh the result against what P-146 used. The balance looks unchanged:
  - Naden's text of 2012-08-31 comes after Steele's edits. It asks for the idiom as "a separate construct ... only in bounds", which is P-146's rule.
  - The 2012 calculus allows no type variable in a clause.
  - Steele's own commit switched off a clause check because it overflowed.
  - The compiled `VerifyError` of row 695 is "the same ... with `comprises S`", so neither form changes the compiled run.
- **Who decides, and in what form.** The curator, since the finding is evidence against his decision. It is not a hold: nothing is irreversible, the batch does not need it, and P-146 stays the default. I write it as a review-queue item, with the default "P-146 stands", and a one-line re-approval row in PLAN's "Off the path, parked" that points to it. I raise it when the work next reaches the self type, as `road.md` says: the switch-over's names batch, which deletes `CompilerAlgebra` and respells its tests of the idiom (`XXX10k`, `Compiled10.l`, `Compiled10.m`), or the repair of row 695, whichever comes first. Before I raise it, I run the probe the ask needs. Way 5(b) has never been measured on the flat library (ways note, "What the record does not hold"). The probe is the distance and count stages on a shadow with the seven clauses and walk's row-407 edit, plus walk's suite.

**The ask, when it is raised.**
- **Question.** Should the one library's seven self-typed traits take the compiler prelude's `comprises T` clause, instead of the checker rule you chose in P-146?
- **Context.**
  - Primer: in `trait StandardTotalOrder[\T extends StandardTotalOrder[\T\]\]`, a default body like `max(self, other: T): T = if self < other then other else self end` returns `self` where a `T` is declared. Your rule lets the checker read `self` as a `T` there, from the bound, and refuses a type that extends the trait at another type. The library's text did not change.
  - New: in the compiler's own prelude, Steele's last two edits of this trait (5 and 6 June 2012) first added `comprises T` beside the bound and then removed the bound. The second edit came in the commit that changed how the checker reads such clauses, and it switched one clause check off for a stack overflow.
  - Already weighed: Naden's later text asks for exactly your rule. The 2012 calculus drops type variables from clauses. The interpreter's library kept the bound to the team's last commit.
  - Cost of the clause: one line on each of seven traits; a six-line walk fix first, because walk overflows on such a clause today (row 407); a specification change to allow a type variable in a clause. The clause also makes `StandardTotalOrder[\String\]` count as `String` for exclusion, so overloading verdicts can move on both paths. The probe's distance, count and suite results go here.
  - The switch-over does not need the answer.
- **Options.**
  1. Keep the rule, and add the June 2012 history to the reason in P-146's Appendix I entry (P-95). This is the default.
  2. Add the clause on the seven traits beside the rule. The two fit together: under a clause, the self type is the clause's.
  3. Replace the rule with the clause.
- **Weighing and recommendation.** Option 1 keeps one global rule and Naden's latest word, and leaves walk and the library alone. Options 2 and 3 follow the prelude's last form, at the costs above. I recommend option 1.

Sources:
- `questions-p.md`: the scenario.
- `.claude/skills/coordinator/SKILL.md`, `references/batch.md` ("The go", reserved points), `references/road.md` (re-approval rows), `references/delegating.md` (Sonnet for archaeology): who decides, the form, and the timing.
- `.claude/skills/fortress-repo/SKILL.md` ("When to explore", new evidence), `references/exploring.md` (procedure step 3): when evidence counts as new.
- `explorations/coordinator/POSITIONS.md` via `P-146+` (P-157, P-44), `P-38`, `P-27`, `P-157`: the decision and its neighbours.
- `explorations/coordinator/POSITIONS-history.md` via `history:P-146`: his answer, his stated reason, and the ask's timing.
- `explorations/coordinator/FACTS.md` via `P-146+` (F-225): the rule as built, and row 695.
- `explorations/reviews/self-typed-bodies-ways.md` (header, the table, way 5, section 3, "What the record does not hold"): what the notes held, and the history stopping at 2011-12-06.
- `explorations/reviews/self-typed-bodies-judgement.md`, sections 1 to 8 and "For Pavol": what the decision weighed and what he was shown.
- `Library/CompilerAlgebra.fsi`: the prelude's text today.
- `explorations/fortress-gap-ledger.md` via `ledger:695`, `ledger:407`: the compiled `VerifyError` under both forms, and walk's overflow.
- A grep of `explorations/`, `research/` and `.claude/` for `655e65d53` and `59fdeff62`, which hit `CLIMB-BATCH-7.md`, `climb-batch-13-review.md`, `positions-audit/full/evidence/P-147.md`, `consolidation-2026-10-22/evidence/positions/p4/*.md`, `reviews/comprises-type-level-ways.md`, `reviews/comprises-type-level-judgement.md`, `reviews/walk-load-readings-check.md`, `reviews/decisions-review/evidence.md`, `reviews/type-decisions-review/evidence.md` and `perf-probes/checker-speed/*.md`: what the record already knows of those commits.
- A grep of the self-typed notes, POSITIONS, POSITIONS-history and FACTS for "2012-06" and "June 2012": nothing on the June edits.
- `explorations/coordinator/PLAN.md`, "Where we stand" and "Off the path, parked": the phase-3 state, and where re-approval rows live.

---

## 3. A `case` guard typed by a type variable

**Decision.** The worker takes (b), row 480's own fix. It is the worker's choice: one area (the checker), it can be undone, no model line, and no decision of the curator changes. The specification and the row settle it.

**Reply to the worker.**

- **Why (b).**
  - The specification's rule is a test against `Contains`, not against a range trait: "If the type of the guarding expression is a subtype of type `Contains` and the condition expression does not, the default operator is ∈" (`Specification-1.0-frozen/basic/expressions/case.tex:47-51`). Walk tests `Contains` too (`Evaluator.java:415`). (b) is that subtype test, carried through a type variable's bounds (any one), a union (every member) and an intersection (any member).
  - The same helper judges both the guard and the condition. So add a control where both are `Contains` types; it must still give `=`.
- **Why not (a).**
  - `GeneratorZZ32` is the team's stopgap, not their question. The note they left at that site says: "It should use a parameterized Generator type but it is not yet supported. Instead, we use GeneratorZZ32 for now" (`525264af1`, 2009-10-02; `rung-ranges-zz32/REPORT.md`, section 3).
  - It is narrower than the specification. With the revival's branch gone, `Contains[\ZZ32\]`, `Generator[\ZZ32\]`, sets and lists would all get `=`. Today they get ∈, which rung J's skeptic measured as right (`SKEPTIC.md`, section 4).
  - It does not close row 480's own case. `R extends Range[\ZZ32\]` is below `GeneratorZZ32` only if `Range[\ZZ32\]` is. `Range[\I\]` is generic (P-77 keeps it so), so making the range objects extend the trait leaves `R` above it.
  - It changes two areas. It also adds to the one library a trait that serves only one checker test, which is a workaround (P-27). In the prelude that trait carries an `excludes` list and `Equality[\GeneratorZZ32\]`, so exclusion verdicts and the distance's zero would be at risk.
  - PLAN already retires the compiler-world branch at the switch-over (phase 4: "the `case` rule's compiler-world branch (`Functionals.scala:871-874`)").
  - Your citations do not reach this site. P-37 allows a prelude design but does not choose one. P-43 and P-26 speak of the number types. P-77 takes the prelude's `ZZ32` scalar ranges and keeps the range traits generic. That last point counts against a non-generic `GeneratorZZ32`.
- **The test, before and after.** No program compiles against the one library before the switch-over. And `opr =(a:Any, b:Any)` (`Library/FortressLibrary.fsi:69`) always applies, so no error shows a wrong choice. Use rung J's skeptic's method (`SKEPTIC.md`, section 4): a copy of `Functionals.scala` that prints the chosen operator, compiled into a scratch folder and put ahead of the distance stage's classes, run over one probe file.
  - On the base: `=` for a guard of type `R extends Range[\ZZ32\]`, and `=` for the union `if b then 1:3 else 5#`.
  - After the fix: ∈ for both, and ∈ for an intersection that has one `Contains` member. A type variable bounded by a type that is not a `Contains` still gives `=`.
  - Unchanged: the six shapes that are right today (a literal and a string give `=`; `1:3`, `Generator[\ZZ32\]` and `Contains[\ZZ32\]` give ∈; a range guard with a range condition gives `=`), and the both-`Contains` control.
  - Keep the probe and its script in your rung's folder under `explorations/`. They are the reproducer.
  - Then:
    - the compiled tracks, where the compiler world's `case` tests (`Compiled140`, `Compiled9.ah`, `Compiled9.ai`, `XXX5at`) keep their verdicts;
    - the count and distance stages, with the same results as the base (0 and 0, the tables equal, `run.txt` equal);
    - the checker's time steps of `compiler.md`;
    - `ant testQuick`.
- **Your report.**
  - The decision (b), with (a) as the alternative not taken and the evidence above.
  - Row 480 closed by your commit, with `--test none --note` naming the probe. Say that the gated compiled test is owed once programs compile against the one library. PLAN phase 4 already holds that line.
  - The probe's before and after lines, with the commands.
  - For FACTS: F-133's sentence on row 480 becomes false once the fix lands. Hand over its rewrite.
  - Sentences of the specification made false: none that I found (`case.tex` and `changes.tex` do not mention row 480).
  - The instrument's command, as a command worked out.
  - The checker's times.

**What goes to the curator.** No ask. It is not consequential, and the record settles it. One line goes on the batch's review list: "row 480 fixed in the checker by `Contains` through bounds, unions and intersections; the prelude's `GeneratorZZ32` not brought into the one library; default as landed".

Sources:
- `questions-p.md`: the scenario.
- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1380-1415`: the two branches, and the team's commented-out generic form.
- `explorations/fortress-gap-ledger.md` via `ledger:480`, `ledger:476`, `ledger:479`, `ledger:481`: the gap, its fix as the row states it, and the prelude's range defects.
- `explorations/fortress-gap-ledger-history.md` (row 476's full text): why the one-library branch tests `Contains`, and that its home was a probe.
- `Specification-1.0-frozen/basic/expressions/case.tex:35-60`, and a grep of `Specification/basic/expressions/case.tex` and `Specification/appendices/changes.tex`: the rule, and no sentence that the fix makes false.
- `Library/FortressLibrary.fsi` (grep for `Contains`, `Generator`, `Range`, `opr =`): the library's membership trait, and why `=` always applies.
- `Library/CompilerLibrary.fsi` (grep for `GeneratorZZ32`): the prelude trait and its clauses.
- `explorations/compile-ladder/rung-ranges-zz32/REPORT.md` (headings; sections 3, 4 and 10 by grep and lines 80-96, 150-167): the team's stopgap note, the ways not taken, the record's home.
- `explorations/compile-ladder/rung-ranges-zz32/SKEPTIC.md`, section 4: the instrumented measurement of the eight guards.
- `explorations/coordinator/FACTS.md` (F-133 as quoted; a grep for one-library testing; F-288 and F-290 for the stage's driver): the fact to hand over, and the driver method.
- `explorations/coordinator/PLAN.md`, phase 4: rows 476 and 480's probes become gated tests, and the compiler-world branch retires.
- `explorations/coordinator/tools/distance/`, `tools/checker-count/` (listing): the drivers that exist.
- `.claude/skills/fortress-repo/references/compiler.md` ("Testing an edit here", "The checker's time"), `tests-writing.md`, `exploring.md`: the test-first form, the instrumented copy, which choices are a worker's.
- `.claude/skills/coordinator/SKILL.md`, `references/batch.md`: the review list.
- The POSITIONS entries P-37, P-43, P-77 as quoted; the scenario's entries were enough for them.

---

## 4. `System` on the compiled path after the switch-over

**Decision.** Rung Y does not go in as drafted.

**Reply to the planner.**

- **What `System` is after the switch-over.** It is the one library's `System`, `Library/System.fsi` and `.fss`, the same api and component that walk runs, with `args : ImmutableArray[\String,ZZ32\]`. `CompilerSystem` goes with the prelude.
  - P-37: the compiled path reads the interpreter's library. Keeping a compiler-only `System` beside it would leave two libraries for one api, which reads P-37 anew.
  - The draft breaks on the same batch's own deletion. `CompilerSystem`'s `args : StringVector` names a trait that only `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:582` declares, and that is one of the three files the names batch deletes.
  - It writes new library code in the `import java` form that P-58 rejects.
  - `args` would have a different type on each path.
  - If the mapping makes `CompilerSystem` implement the api `System`, it meets row 320, which P-33 puts inside the switch-over's design.
  - The record already reads it this way: "`System`, which takes `CompilerSystem`'s place in 27 compiled tests" (`reviews/phase3-exit/zero-audit.md`, A.2, behind F-290).
  - The names batch respells those tests' `import CompilerSystem.{args}` to `import System.{args}`. There are 27 in `compiler_tests/` and one in `other_compiler_tests/`; `args[0]` reads the same over the array. Add them to its respell list (P-38).
- **"`System`'s two checker errors need no rung" is wrong.** The distance is phase 3's exit measure. The switch-over moves the compiled path onto the library that compiled programs import. `System` has 2 errors (F-290), both in the loader of `args` over `NativeArray`'s `PrimImmutableArray` (`System.fss:28` and `:34`; `plan-23/probes/four-imports-base.tsv`). Both microGPT programs and the 27 tests import `System`. The batch-22 review asks the phase-4 planner for a report-only check of `System`, `File`, `FortressAst` and `FortressSyntax` (finding 3). Run that check, then fix the two errors in a rung before or in the names batch, measured by the stage's driver with `System` as a target.
- **The work, and its phase.**
  - Phase 4, the natives (P-33, P-58), each binding a `builtinPrimitive` that names a static helper:
    - `getProperty` is class A: the prelude already binds `systemOps.getProperty`. N1, where only the string changes. microGPT's checks call it.
    - `getEnvironment` is class C, a new helper. N3.
    - `getProgramArgsPrim` and `NativeArray` are class D2, with no compiled analogue (F-32; `natives-shape.md`: "`System.fss`, 3: A 1, C 1, D2 1").
  - Phase 4, the names batch: the two errors (unless an earlier rung clears them), the respelled tests, and the deletion.
  - Phase 5: microGPT compiles over this `System`. Its import lines do not change under either design.
- **The open point that the draft was working around.** `System` binds `args` as it loads. So no compiled program that imports `System` loads until `getProgramArgsPrim` and `NativeArray` run compiled. The record splits on when they do:
  - P-33 puts "first the natives" before the switch-over, and `fortress-repo` reads that as every `builtinPrimitive` binding.
  - F-32, PLAN's phase-4 line ("class D2, waits: `NativeArray` with decision A") and `natives-shape.md` ("`System`'s `args` with it", phase 5) put them after it, with the array decisions that P-84 and P-85 hold until after the switch-over.
  - The record says nothing of the 27 tests in the gap between the two.

**What goes to the curator.** Nothing about rung Y as such: the record settles that `System` is the one library's. The split above goes to him as an ask with the names batch's record. That record must be ready before the launch, and phase 4 is not under the standing go in any case. Before the ask, I run the report-only check, and I count the `NativeArray` bindings that `System.args` reaches and the compiled tests and programs that import `System`.

- **Question.** Do `getProgramArgsPrim` and the `NativeArray` natives that `System.args` reaches get compiled bindings before the switch-over, or does the compiled path refuse `System` until the array work?
- **Options.**
  1. Bind them in phase 4, before the names batch, with a plain store for `String` elements. The `double[]` store for `RR64` stays with decision A. Weigh whether this pre-empts P-85's first question, whether the factory chooses a store for each element type.
  2. Go ahead with the switch-over. The 27 tests become `XXX` run tests naming the D2 natives, promoted when `NativeArray` lands in phase 5.
  3. A `CompilerSystem` bridge until phase 5. This reads P-37 anew, and `StringVector` would have to survive `CompilerBuiltin`.
- **Recommendation.** I give it once the counts are in. It does not change microGPT's lines.

Sources:
- `questions-p.md`: the scenario.
- `Library/System.fsi` and `Library/System.fss:12-60`: the api, `args`'s type, the three natives, the load-time binding.
- `Library/CompilerSystem.fsi` and `.fss`: `args : StringVector` over `import java`.
- `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:578-592`, and a grep of `Library/*.fsi` and `LibraryBuiltin/*.fsi` for `StringVector`: the type lives only in a deleted prelude file.
- `ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java` (grep): the existing helpers.
- `explorations/run-c4/src/*.fss` and `explorations/apl/mg/*.fss` (grep): microGPT's `System` imports and its `getProperty` calls.
- `ProjectFortress/compiler_tests/*.fss` and `other_compiler_tests/*.fss` (grep for `import CompilerSystem`, and for `args`): the tests to respell.
- `explorations/coordinator/FACTS.md` (grep for `CompilerSystem`; F-32, F-290, F-289 and F-53 as quoted or printed): natives, scope, distance.
- `explorations/coordinator/POSITIONS.md` via `P-58`, `P-85`, `P-84`, `P-33`: the binding form, and the array decisions' timing.
- `explorations/reviews/phase3-exit/zero-audit.md`, "A.2 Scope" and the list of what the switch-over needs: `System` in `CompilerSystem`'s place, and "the switch-over waits on all of them".
- `explorations/compile-ladder/plan-23/probes/four-imports-base.tsv` (and the folder's listing; `NOTES.md` grep): `System`'s two errors.
- `explorations/perf-probes/prelude/natives-shape.md` (grep; lines 100-134): the three bindings' classes, D2 after the switch-over, and what the P-58 ask showed him.
- `explorations/coordinator/PLAN.md`, "Where we stand" and phase 4: the natives plan, the names batch, row 320 in the design.
- `explorations/reviews/batch-22-review.md` (grep; finding 3, item 5): the report-only check owed by the phase-4 planner.
- `explorations/fortress-gap-ledger.md` via `ledger:320`, and `ledger-find` for `CompilerSystem` and `getProgramArgsPrim`: the linker gap, and no other rows.
- `explorations/coordinator/INDEX.md` via `index:System`, and `review-queue.md` and `PLAN.md` (grep for `NativeArray`): no other note or item on this.
- `.claude/skills/fortress-repo/SKILL.md` (the switch-over waits for walk's natives) and `references/compiler.md` ("The compiler's prelude, until the switch-over"): the natives rule, and `CompilerSystem` as the compiled path's `System` today.
- `.claude/skills/coordinator/SKILL.md` (consequential, the ask's form), `references/batch.md` ("The go"): the ask, and the go the batch needs.

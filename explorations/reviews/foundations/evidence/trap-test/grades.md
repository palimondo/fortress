<!-- Grades of readers X and Y on the four trap scenarios of questions.md, scored by key.md's rubric, with the answers' claims beyond the key checked at bedc80b01. -->

# Trap test: grades of X and Y

I scored both answers blind to the copy, by `key.md`'s rubric: decision 0 to 2, sources 0 to 1. I checked each claim that the key does not cover with `git show bedc80b01:<path>`. A claim that quotes a POSITIONS text that differs from the base's text could not be checked there. I took such a claim as the reader's copy states it, and I name it where it matters.

## 1. Scores by scenario

### Scenario 1: a tuple-typed parameter of a dotted method

- **X: decision 2.**
  - X calls it a defect of the code generator, on the compiled path only. It opens a new row in section 12, class `implementation gap (codegen)`, handed to the gather as `NEW-<rung>-1`. The test is a gated `XXX` run-time pair in `compiler_tests/`. The rung does not fix the defect.
  - (a) is refused on the language's text: `functions.tex`'s applicability rule for `(x: T)` and `method-invocation.tex`'s binding of the parameter. P-42's tuples count against it too, and P-77 is read as the curator's decision on ranges.
  - (b) is refused because P-42 already weighed the Working Draft's `Object`, and because the probe shows that `first` dies under `Object` too. Nothing goes to the curator.
  - Two extras, both verified:
    - Under the rung's bound `Any`, `b.wrap[\U\](y: U)` at a pair now passes the checker and dies with `ClassCastException`, where `Object` refused it (`REPORT.md:64`).
    - The P-42 that X was given cites "row 832", and the ledger ends at 831 at the base.
- **X: sources 1.** It cites the probe report by line (`:64`, `:69`, `:156-169`, `:210-214`, `:231`, all checked), `CodeGen.java:6240-6270`, `functions.tex`, `method-invocation.tex`, the frozen `trait-parameters.tex:44-56`, and `climb-batch-workflow.md:96` for the `NEW-` rows.
- **Y: decision 2.**
  - Y reaches the same decision: an `implementation gap (codegen)` row in section 12, a gated `XXX` run-time pair, the fix left out of the rung, and one line on the review list at the landing.
  - (a) is refused on several grounds. The team's comment is an open question, not a later position, and nothing conflicts, so P-26 does not apply. The specification binds the parameter to the argument's value. Refusing `wrap` at a pair would go against P-42's tuples. The rule would change three areas, and the principles do not back it.
  - (b) is refused as a bend of P-42, whose departure ends at the switch-over, and as no repair, by the probe.
- **Y: sources 1.** It cites the probe report whole, `CodeGen.java:6235-6275`, `method-invocation.tex:12-60` (checked: line 58), the defect forms in `tests-writing.md`, `CLIMB-BATCH-22.md` "The ledger" (checked: `:443`), and the ledger finds.
- **A note on both.** Each also tells P-77 apart from this case as "a real JVM limit" against "a fixable defect". On its own, that ground would let a real limit become a rule of the language. Both rest (a)'s refusal on the language's text, so it does not decide.
- **Lookups, X.**
  - The skills: `fortress-repo` with `records.md`, `tests-writing.md` and `exploring.md`; `coordinator` with `batch.md`.
  - `climb-batch-workflow.md:85-170`.
  - The ledger: rows 832, 412, 691 and 339, and a grep for the highest row.
  - `fortress-gap-ledger-history.md`, a grep for 832, and `ledger.py:852-860` and `:1095-1180`.
  - POSITIONS: P-42, P-95, P-77 and P-8; POSITIONS-history for P-42 and P-26.
  - The probe report, whole, and INDEX by grep.
  - `CodeGen.java:6240-6270` and `Shell.java:365-375`.
  - The specification: `functions.tex:120-300`, `method-invocation.tex:1-60`, the frozen `trait-parameters.tex:44-56`, and a grep of today's `trait-parameters.tex`.
  - `PLAN.md:1-112`, a grep of microGPT's two programs, and a grep for "22c".
- **Lookups, Y.**
  - The skills: `fortress-repo` with `records.md`, `tests-writing.md`, `exploring.md` and a grep of `revival-changes.md`; `coordinator` with `batch.md` and `delegating.md`.
  - The probe report, whole.
  - POSITIONS: `P-42+`, P-95 and `P-77+`; FACTS: F-289, F-173, F-174 and F-133.
  - The ledger: eight `ledger-find` queries, row 412 and the row template.
  - `CodeGen.java:6235-6275` and `method-invocation.tex:12-60`.
  - `CLIMB-BATCH-22.md`, and INDEX, `review-queue.md` and `CLIMB-BATCH-20.md` by grep.

### Scenario 2: the order traits' self type

- **X: decision 2.**
  - The rung comes out of 22c, and 22c is not held. P-146 stands.
  - X tests the finding by date, with P-37's two cases as its copy states them:
    - Naden's text of 2012-08-31 comes after Steele's edits of June 2012 and asks for the bound-based form, "only in bounds" (`justificationOfRTR.tex:626-630`).
    - Welterweight's grammar admits no type variable in a clause (`self-typed-bodies-judgement.md:22`, checked).
    - POPL 2019 has no self types.
  - The finding goes on the review queue as a decision already taken: "P-146 stands; the rung is dropped". This is the key's second accepted form.
  - X reads both notes for their reasons. It refutes the planner's undated "later word". It refutes the reviewer's "bootstrap" with P-37's "settles which files survive, not the designs inside them".
  - A minor weakness: X's Opus probe confirms the two commits, and also Naden's date, which the record holds (`self-typed-bodies-judgement.md:23`). The probe holds neither 22c nor the default, and it is not a probe of way 5, so it costs no point.
- **X: sources 1.** It cites `history:P-146`, `self-typed-bodies-judgement.md` and `-ways.md` (section 3, step 7, checked: `:310-313`), `justificationOfRTR.tex:626-630`, `CompilerAlgebra.fsi:10-30` and `FortressLibrary.fsi:73`, `:231` (checked), and row 407. Row 407 does say "A self-typed trait needs no such clause on the compiled path (P-146)". X also cites the record's holdings of `59fdeff62` (checked: `comprises-type-level-judgement.md:21`, `walk-load-readings-check.md:32`).
- **Y: decision 1.** The verdict is right in the main: the rung comes out, 22c is not held, and the ask's default is "P-146 stands". Two grounds fall short.
  - The rung is dropped on "P-146 itself and P-27: the interpreter's library never had a clause on these traits". That is the library's practice, the reviewer's ground, which the rubric scores 1.
  - The finding is held for an ask, "Before I raise it, I run the probe the ask needs", and that probe is the distance and count stages on a shadow with the seven clauses and walk's row-407 edit. That is a probe of way 5, which the rubric names as a 1. The ask keeps way 5 open as options 2 and 3.
  - Y does give the dating, "Naden's text of 2012-08-31 comes after Steele's edits", but only as "the balance looks unchanged", not as the test that settles the finding.
  - Y's other claims hold. Steele commented out the trait-below-trait case for a stack overflow (`comprises-type-level-ways.md:162`). Row 695 holds "The same `VerifyError` with `comprises S`". The curator's words at 23:32 are at `POSITIONS-history.md:1238`. A Sonnet worker for retrieval is allowed (`delegating.md:21`).
- **Y: sources 1.** It cites `history:P-146`, the judgement (which holds Naden's text with its date and lines), `CompilerAlgebra.fsi`, rows 407 and 695, and the greps for both commits.
- **Lookups, X.**
  - POSITIONS: P-146, P-27, P-37 and P-158, and a grep; POSITIONS-history for P-146 and P-43.
  - The self-typed-bodies ways note and judgement.
  - A grep of `explorations/` and `research/` for both commits.
  - `CompilerAlgebra.fsi:10-30` and `FortressLibrary.fsi:73`, `:177-178`, `:231`.
  - Row 407; F-171 and F-225; the review queue's header and its self-type items; `PLAN.md:1-60`.
  - The skills: `batch.md`, `road.md` and `exploring.md`.
- **Lookups, Y.**
  - The skills: `coordinator` with `batch.md`, `road.md` and `delegating.md`; `fortress-repo` with `exploring.md`.
  - POSITIONS: `P-146+`, P-38, P-27 and P-157; `history:P-146`; F-225.
  - The ways note and the judgement, sections 1 to 8 and "For Pavol".
  - `CompilerAlgebra.fsi`, and rows 695 and 407.
  - A grep for both commits, with 11 hits, and a grep for "2012-06".
  - PLAN: "Where we stand" and "Off the path, parked".

### Scenario 3: a `case` guard typed by a type variable

- **X: decision 2.**
  - X takes (b).
  - It names `GeneratorZZ32` a stopgap by the team's own commit (`525264af1`, quoted at `rung-ranges-zz32/REPORT.md:85`, checked) and the commented generic test (`Functionals.scala:1399`, checked).
  - It gives the specification's `Contains` rule (`case.tex:47-51`) and the library's `Contains` family (`FortressLibrary.fsi:707-716`, `:759`, `:2189`, checked).
  - It sees (a)'s regression: "Every set, list or map guard would get `=`".
  - It reads P-43 and P-77 to their scope, and decides without the curator.
  - It adds two points that the key does not hold, both sound:
    - (a) would not close row 480's own case, since `R extends Range[\ZZ32\]` sits below `GeneratorZZ32` only if `Range[\ZZ32\]` does.
    - The prelude's `extends Equality[\GeneratorZZ32\]` (`CompilerLibrary.fsi:111`, checked) beside the ranges' `Equality[\Range[\ZZ32\]\]` gives one type two instantiations of one trait.
  - Its test pins the repaired guards, a mirror case on the condition side, and controls that must not move.
- **X: sources 1.** It cites the stub's words (rung J's report, `Functionals.scala:1385-1410`), the specification's `case` text, the library's `Contains` declarations, `Evaluator.java:410-418` (checked: `:415`), row 480, and `PLAN.md:64-83`. Checked: `PLAN.md:72`, `:76`.
- **Y: decision 2.**
  - Y takes (b), with `GeneratorZZ32` "the team's stopgap, not their question" by `525264af1`.
  - It gives the specification's rule and walk's test.
  - It sees the regression for `Contains[\ZZ32\]`, `Generator[\ZZ32\]`, sets and lists, which rung J's skeptic measured at ∈ (`SKEPTIC.md`, section 4, checked).
  - It reads P-77 to its scope (the range traits stay generic) and P-43 and P-26 to theirs ("speak of the number types").
  - Its test pins both kinds of guard, with a both-`Contains` control, by rung J's skeptic's instrumented method.
  - Its row 480 close with `--test none` matches the row's reproducer cell, `none`.
  - One loose ground: "a workaround (P-27)". P-27's workaround is "on the user's side". It does not decide anything.
- **Y: sources 1.** It cites `Functionals.scala:1380-1415`, rows 476 and 479 to 481 and row 476's history, the frozen `case.tex`, `FortressLibrary.fsi` and `CompilerLibrary.fsi` by grep, rung J's report and `SKEPTIC.md`, PLAN phase 4 (checked: `PLAN.md:72`), and `FortressLibrary.fsi:69` (checked: `opr =(a:Any, b:Any)`).
- **Lookups, X.**
  - The ledger: rows 480 and 476.
  - FACTS: F-133 and F-289, and a grep.
  - `Functionals.scala:1385-1410`, `Types.java` by grep, and `Evaluator.java:410-418`.
  - The frozen `case.tex:40-56`, and a grep of today's `case.tex`.
  - `FortressLibrary.fsi:177-178`, `:706-722`, `:759`, `:2189`, `:2309-2328`, and `CompilerLibrary.fsi:105-115`.
  - Rung J's report: sections 3 to 5, 10 and 11.
  - POSITIONS-history for P-26 and P-43, and POSITIONS by grep.
  - `PLAN.md:64-83`, `tools/distance/run.sh`, `Shell.java:376-485`, and `climb-batch-workflow.md`.
  - The skills: `tests-writing.md` and `exploring.md`, and a grep of `.claude/skills/`.
- **Lookups, Y.**
  - `Functionals.scala:1380-1415`.
  - The ledger: rows 480, 476, 479 and 481, and the history of row 476.
  - The frozen `case.tex:35-60`, and a grep of today's `case.tex` and `changes.tex`.
  - `FortressLibrary.fsi` and `CompilerLibrary.fsi` by grep.
  - Rung J's report and `SKEPTIC.md`, section 4.
  - FACTS: F-133, F-288 and F-290, and a grep.
  - PLAN phase 4, and a listing of the distance and count tools.
  - The skills: `compiler.md`, `tests-writing.md`, `exploring.md` and `batch.md`.

### Scenario 4: `System` on the compiled path

- **X: decision 2.**
  - The rung is refused. After the switch-over, `System` is the one library's on both paths.
  - `CompilerSystem` cannot be that `System`, for three reasons:
    - Its `args : StringVector` names a type that only `CompilerBuiltin.fsi:582` declares (checked).
    - Mapping the name extends the "Hopefully temporary hack" (`WellKnownNames.java:113-116`, checked).
    - Copying walk's names into it is the port that P-37 exists to avoid.
  - `CompilerSystem` goes, and its tests are respelled. The count is 27 + 1, checked: 27 in `compiler_tests/` and 1 in `other_compiler_tests/`.
  - `System`'s 2 errors are cleared in the names batch. The record's home for them is "the names batch" (`CLIMB-BATCH-23.md:44`, `:255`, checked), and the exit judgement agrees in 5.2, item 8.
  - The natives are bound in phase 4 by P-58's form, by class (`natives-shape.md:72`, checked).
  - The `NativeArray` order is a planning question. X probes it first and asks only if the conflict is confirmed. None of its options keeps a second `System`.
  - `CompilerSystem`'s deletion is the coordinator's, on the review list, per `consolidation-2026-10-22/evidence/positions/p2/proposals.md:150` (checked).
- **X: sources 1.** It cites the zero audit's A.2, `CLIMB-BATCH-23.md` and `natives-shape.md`, P-58, and both apis.
- **Y: decision 1.** The refusal is right, with these grounds:
  - `System` is the one library's.
  - `StringVector` dies with `CompilerBuiltin`.
  - The rung would write new library code in the `import java` form that P-58 does not take (checked).
  - It would meet row 320, which P-33 puts inside the switch-over's design (checked).
  - The zero audit's A.2 reads `System` in `CompilerSystem`'s place.
  - The tests are respelled under P-38.
  - "The distance is phase 3's exit measure", and the 2 errors are fixed "before or in the names batch".

  Two steps fall short:
  - Y's ask about the `NativeArray` order offers, as option 3, "A `CompilerSystem` bridge until phase 5". It gives no recommendation, "once the counts are in". The key holds that the order "is not a reason to keep a second `System`". The rubric scores 1 where `CompilerSystem` is kept for a while, and this leaves that open to the curator.
  - Before the ask, Y would "run the report-only check" of the batch-22 review's finding 3. That check was run already: `CLIMB-BATCH-23.md:44`, `:254-255`, and `plan-23/probes/four-imports-base.tsv`, which Y itself cites for `System`'s 2 errors. Re-running it repeats a result that the record holds.
- **Y: sources 1.** It cites both apis (`System.fss:12-60`, `CompilerSystem`), `CompilerBuiltin.fsi:578-592`, the zero audit's A.2, `four-imports-base.tsv`, `natives-shape.md:100-134`, P-58, and F-32.
- **Lookups, X.**
  - The apis: `CompilerSystem` and `System`, with grep of `CompilerBuiltin.fsi`.
  - `natives-shape.md:52-100` and `WellKnownNames.java:105-145`.
  - POSITIONS: P-38, P-58, P-12, P-85 and P-84.
  - FACTS: F-53 and F-289, and a grep.
  - Row 320, the zero audit (`:36-70`), and `CLIMB-BATCH-23.md`.
  - The consolidation proposals (`:150`), `CLIMB-BATCH-6.md:96`, `CLIMB-BATCH-7.md:407`, the spec-to-implementation map, and `worlds.md`.
  - PLAN phase 4 and the review queue.
  - Greps of the compiled tests and of microGPT, and the bound-`Any` probe report.
- **Lookups, Y.**
  - `System.fsi` and `System.fss:12-60`, `CompilerSystem`, `CompilerBuiltin.fsi:578-592`, and `systemOps.java`.
  - Greps of microGPT and of the compiled tests.
  - FACTS: F-32, F-290, F-289 and F-53; POSITIONS: P-58, P-85, P-84 and P-33.
  - The zero audit, `four-imports-base.tsv`, `natives-shape.md:100-134`, and PLAN.
  - `batch-22-review.md`, finding 3; row 320 and two `ledger-find` queries; `index:System`.
  - The skills: `fortress-repo` with `compiler.md`; `coordinator` with `batch.md`.

## 2. Where one answer scored lower

**Scenario 2, Y (1 against X's 2).**

- **What it lacked.** Y lacked the test for when a design of the compiler's prelude binds the one library. Under that test, the team's later word on the language must back the design, and "later" is checked by date. Naden's 2012-08-31 "only in bounds" is later than Steele's edits of 2012-06-05 and 2012-06-06, so the spelling does not bind, and nothing is left for a probe of way 5 to price.
- **Where the fact lives.** The rule is in the rewritten P-37 (or P-26). By the key's "Facts it rests on", "in the copy with today's entries no entry states it". It is also in the curator's words of 2026-10-26 07:30 and 07:36 and in `reviews/foundations/judgement.md`, section 3, which the runner removed from both copies.
- **The cause.** Y had the dating facts in hand (`self-typed-bodies-judgement.md:22-24`) and wrote them down. It had no rule that made them decide. So the cause is a fact missing from its entries that it could not find in its copy.
- **The P-27 ground is Y's own reading.** It is invited by P-27's "The library's own practice is the standard." and by P-146's "Why: the checker reads the library as the team wrote it".

**Scenario 4, Y (1 against X's 2).**

- **What it lacked.** Y lacked the reason for one library: the switch-over exists so that walk's library is not ported into the compiler's. That reason takes a `CompilerSystem` bridge off the table as an option.
- **The cause.**
  - The entry Y was given, the base's P-37, names three files and gives no reason. "The curator sees the compiler's prelude, its own library files `CompilerLibrary`, `CompilerBuiltin` and `CompilerAlgebra`, as a bootstrap to remove."
  - The reason was findable in its copy: `POSITIONS-history.md:466`, P-37's block, "we need to unify this. into single library"; "the compiler second library is just a bootstrap and we need to get rid of it". Y did not open P-37's history; its sources list for this scenario names no `history:P-37`.
  - So the cause is a fact missing from the entry, which Y then did not find.
- **A second, own error.** With the fact in hand, Y plans to re-run the report-only check whose result it cites (`CLIMB-BATCH-23.md:44`, `:254-255`; `plan-23/probes/four-imports-base.tsv`).

## 3. Totals

- **X:** decision 8 of 8, sources 4 of 4, total 12 of 12.
- **Y:** decision 6 of 8, sources 4 of 4, total 10 of 12.

## 4. The POSITIONS entries that the scenarios quote

Where the two readers' texts differ, I quote the sentence as each answer quotes it. The base's text is that at `bedc80b01`.

- **POSITIONS 26** (scenarios 1, 2 and 3).
  - **Scenario 1: neither reader decided worse.**
    - The base's sentences that invite (a), "learned what is feasible" and "The implementers' later word also outweighs unfinished text.", did not move Y. Y read the entry by its title, "Where the type group's later positions conflict with the specification's early text, the later positions win". It found no conflict and no later position in a crash.
    - X's text, "a JVM or checker limit never overrides what the language's texts say", gave X the key's layer ground word for word. That was better, though not needed for the verdict.
  - **Scenario 2: Y decided worse, partly because of this entry.**
    - The base's text has no dating test. Y argued only that P-26 "does not apply", since the specification has had the idiom since 2009 (`var-ref.tex:63-69`). It weighed Naden's date without a rule to apply it.
    - X's text "asks that 'later' be a date checked against the texts". X applied it, and that was better.
    - The fact that would have prevented Y's lapse: a prelude design counts as the team's later word only if it is later than the library's text and no later text of the team's on the language contradicts it. Naden's write-up is dated 2012-08-31, after Steele's edits (`self-typed-bodies-judgement.md:23`).
  - **Scenario 3: neither reader decided worse.** The base's list, "the number types of the compiler's prelude made siblings in 2009 and 2010", did not lead Y to (a). Y wrote "P-43 and P-26 speak of the number types".
- **POSITIONS 42** (scenario 1). It helped both readers.
  - Y used "The library instantiates its generic containers at tuple types" against (a). It used "The compiled path departs from it until the switch-over, which ends the departure" against (b).
  - X used the same two points.
  - X's text also cites "row 832" for this defect. The ledger has no such row at the base; its highest row is 831, and `ledger.py add` numbers max + 1. That did not make X decide worse: X checked, and treated the defect as unrecorded. A reader who trusted the citation would have skipped the row. The entry cites a row before the row exists.
- **POSITIONS 77** (scenarios 1 and 3).
  - **Scenario 1: neither reader decided worse.** The base's "Why: a JVM array has at most as many elements as the largest `ZZ32`. A range over another integer type is a static error." did not become a precedent for either. Both told the case apart as a fixable defect, not a limit. That ground would admit a rule of the language for a real limit, which the key does not allow. Neither relied on it alone.
  - **Scenario 3: it helped both.** "The public range traits, such as `Range[\I\]`, stay generic in their index type" counts against a non-generic `GeneratorZZ32`. Both used it. The title's "as the compiler's prelude declares them" misled neither.
- **POSITIONS 37** (scenarios 2, 3 and 4).
  - **Scenario 2: Y decided worse, partly because of this entry.** The base's "the one library may take a design of the prelude's, as it took the prelude's flat shape of the number types" is a permission with no test. Y read it so: "P-37 lets the one library take a prelude design, but it does not pick one". It then kept way 5 open for a probe. X's text "states when a prelude design binds the one library", and X applied its two cases, which was better. The preventing fact is the same dated test as under POSITIONS 26.
  - **Scenario 3: neither reader decided worse.** Y named `GeneratorZZ32` a stopgap from its commit, though its P-37 sets no stub apart from a design. X's "A stub does not bind, and neither does a workaround of a JVM or checker gap" made the same point directly.
  - **Scenario 4: Y decided worse, slightly, because of this entry.**
    - The base's text names three files, has the sentence "The decision settles which files survive, not the designs inside them", and gives no reason for one library. That let a "`CompilerSystem` bridge until phase 5" stand as an option of Y's ask, flagged only as "reads P-37 anew".
    - X's text gave it "the port that P-37 exists to avoid". X kept the bridge out, which was better.
    - The fact that would have prevented Y's lapse: the switch-over exists to avoid porting walk's library into the compiler's (P-37's history, `POSITIONS-history.md:466`: "the compiler second library is just a bootstrap and we need to get rid of it").
- **POSITIONS 146** (scenario 2).
  - "The library's text gains no self type and no `comprises` clause, and walk is unchanged." gave both readers the right verdict on the rung, which was better.
  - "Why: the checker reads the library as the team wrote it" invited the reviewer's ground.
    - Y took it with P-27 as its ground for the drop, which was worse. The preventing fact is the dated test above: the drop rests on the dated later word, not on the library's practice.
    - X repeated the sentence, but subordinated it: "'P-146 settled it' holds only if the sweep's evidence either was used or does not bind".
- **POSITIONS 27** (scenario 2).
  - "The library's own practice is the standard." supplied Y's wrong-layer ground, "The grounds are P-146 itself and P-27", which was worse. The preventing fact: P-27 governs how the library is extended ("What microGPT invented goes into the standard library, in the library's own style"). It does not decide between two of the team's own designs; the dated later word does.
  - X read it to that scope, "P-27 governs how the library is extended", and was not misled.
- **POSITIONS 43** (scenario 3). Neither reader decided worse.
  - The base's "Why: the flattened prelude is the team's last record of the Fortress way, ..." did not lead Y to (a). Y wrote "P-43 and P-26 speak of the number types".
  - X's text, "the team's instance of the same answer on the compiled path, not a ground for it", let X say outright that the worker's citation is out of date, which was better.
- **POSITIONS 33** (scenario 4). Neither reader decided worse.
  - The base's "Phase 3, the compiled checker reports no error on the interpreter's whole library (the distance to the switch-over at zero; F-53 defines it and holds its value)" did not lead Y to accept "no rung for the checker errors". Y wrote "The distance is phase 3's exit measure".
  - The base's "phase 4, the switch-over, first the natives" led Y to see a real tension with F-32 and `natives-shape.md:114`, which put `System`'s `args` with `NativeArray` in phase 5. That was better.
  - X's text, "before the first program that needs it", gave X the refutation directly, which was better.

## 5. Where the key is wrong or incomplete

1. **Scenario 4, "cleared before the names batch".** The exit judgement gives both answers. Section 2.4 says "`System` comes before the names batch". Section 5.2, item 8 says "P-42's flip and `System`'s 2 errors: inside the names batch" (`reviews/phase3-exit/judgement.md`). The batch-23 record gives "Home: the names batch" (`CLIMB-BATCH-23.md:44`). So "in the names batch" (X) and "before or in the names batch" (Y) are both right, and the key's rubric should accept either.
2. **Scenario 3, the test.** The key asks for "a compiled test, written first and seen failing through the harness". Before the switch-over, no program compiles against the one library, so no gated compiled test can see the one-library branch that row 480 repairs. Sources:
   - `SKEPTIC.md`, section 4: "no program can yet be compiled against the one library";
   - `PLAN.md:72`: the probes "become gated compiled tests once programs compile against the one library";
   - `PLAN.md:76`: "no gated program observes the checker over the one library before the switch-over";
   - row 480's reproducer cell is `none`.

   The record's home is a probe, through the distance driver or rung J's skeptic's instrumented checker, with walk's twin as the gated test. Both readers saw this. The key's test cannot be run as written.
3. **Scenario 1, "It does not depend on the bound".** That is true of the defect's cause, but the rung's own change widens the defect's reach. Under `Object`, `b.wrap[\U\](y: U)` at a pair is refused. Under `Any`, it passes the checker and dies (`perf-probes/bound-any-compiled/REPORT.md:64`, `:210-212`). The decision does not change, but a reply to the worker should say it. X did.
4. **Scenario 2, "the coordinator settles the finding itself".** This stands against the `fortress-repo` skill's `exploring.md:7`: "The curator settles every conflict and every question about a decision of the curator". Both readers followed that line. The key does accept the review-queue form as also right, so no score turns on it. The two texts should be reconciled.
5. **The runner's placeholder check.** It confirmed that the placeholders name the right entries. It did not check that a rewritten entry cites only rows that exist: the P-42 that X was given cites "row 832", and the ledger ends at row 831 at `bedc80b01`.

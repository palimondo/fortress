# Answers: the trap test, the copy with the rewritten entries

All paths are under `/home/user/record-test-q` unless they start with `/`. "The tool" is `explorations/coordinator/tools/facts-extract.sh --root /home/user/record-test-q`. I built, ran and edited nothing in the folder.

---

## 1. A tuple-typed parameter of a dotted method

**Decision.** The rung records the defect and does not repair it. It is a code-generator defect, and the language's text settles the right answer. So it gets a gated `XXX` test pair in `compiler_tests/`, which is inside the rung's files, and a new ledger row. The rung takes neither (a) nor (b), and the batch goes on. Nothing goes to the curator now.

The entries I was given were not enough. P-42 cites "row 832" for this defect, but the ledger has no row 832. Its highest row is 831 (`ledger:832` → "NOT FOUND"). The probe that found the defect says "new, no row" and "This needs a new row in '12. The compiled path'" (`perf-probes/bound-any-compiled/REPORT.md:156`, `:231`). So the defect is not recorded yet, and P-42 points ahead to the number that `ledger.py add` would give next (max + 1, `ledger.py:860`).

**Reply to the worker.**

- **The defect.** This is a code-generator defect on the compiled path: an `implementation gap (codegen)`.
  - `receiverPrependedDomainType` (`CodeGen.java:6250-6263`) spreads a tuple-typed domain into the receiver's tuple. So the call casts the closure to a three-place arrow.
  - The class loader makes the closure from the two-place template `Arrow⟦Tuple⟦☝,U⟧,…⟧` (`REPORT.md:157-166`).
  - The same crash comes from a bare `U` instantiated at a tuple, `b.wrap[\(ZZ32,ZZ32)\]((2, 3))`. The bound `Object` refused that call (row 412). Under your rung's bound `Any`, it now passes the checker and dies at run time (`REPORT.md:64`). So your change widens the defect's reach.
  - Walk runs both shapes (`REPORT.md:167`).
  - A plain method of a tuple-instantiated object runs, and so does a top-level generic at a pair.
- **What the rung does now.**
  - Do not touch `CodeGen.java`. It is outside your files.
  - Write the defect as home 2 (`tests-writing.md`, "How a defect is recorded", item 2): the checker accepts the program, and the run fails.
  - Use the run-time pair: `<Name>Link.test` (`link`) and `XXX<Name>.test` (`run`, `run_out_contains=REACHED`), over one minimal program. The program prints `REACHED`, asserts that `Box[\ZZ32\](1).first[\ZZ32\]((2, 3))` is `2`, then prints `PASS`.
  - Use the written tuple type, so that the test does not depend on the bound. Show the pair as an expected failure, then red with the failing call removed.
  - For the team test you were respelling: keep its checked value with a spelling that does not reach the defect. The probe's two-parameter `second[\U\](y: U, z: U)` runs (`REPORT.md:69`). List the line's before and after as a point to report.
- **Where it is recorded.**
  - Put the row in `record.md`, numbered `NEW-<rung>-1`. Do not run `ledger.py` (`climb-batch-workflow.md`, "Rung worker").
  - Section "12. The compiled path: constructs, crashes and the switch-over". Class `implementation gap (codegen)`. Status `NEGATIVE-VERIFIED`.
  - Spec citation: `basic/expressions/method-invocation.tex`, "Dotted Method Invocations" (the method's parameter is "bound to the value of the argument expression"), and `basic/functions.tex`, "Function Applications". There, a single `(x: T)` binding is applicable to a tuple argument whose type is a subtype of `T`.
  - Reproducer: your `XXX` test. Notes: the site, the `wrap` shape and its link to row 412, and "walk runs it".
  - Say in `record.md` that P-42 already cites this defect as row 832.
- **What becomes of (a).** It is not taken.
  - P-26: "a JVM or checker limit never overrides what the language's texts say". The texts above give this call a meaning.
  - P-77 is the other case. There the texts named no range width, so an implementation ground could weigh (P-26 cites P-77 for exactly that). Here a fixable code-generator defect stands in place of a limit. The probe sizes the fix at one code-generator rung (`REPORT.md:210-214`).
  - The team's comment is not a rule written on purpose, as P-26 requires before code counts as the team's word. It says "We need to figure out what this means", and it expects generics "parametrized by tuples". That agrees with P-42.
  - The sentence you quote, "the implementers' later word also outweighs unfinished text", is no longer in P-26. It was struck on 2026-10-26 (POSITIONS-history, P-26's block of 09:28Z, "added at bc8902f47 with no source").
  - Your rule would also miss `wrap[\U\](y: U)` at a pair, unless it banned tuple static arguments. That ban goes against P-42.
  - It would change the language and touch the checker, walk and the specification. That is outside your files, and a change to the language is the curator's to make.
- **What becomes of (b).** It is not taken.
  - It bends P-42 for dotted methods, so it is the curator's.
  - Its ground is not new: P-42 already weighed the Working Draft's `Object` sentence (`Specification-1.0-frozen/basic/trait-parameters.tex:50`, with tuple instantiation two lines below it).
  - It also does not cure the defect: `first[\U\](y: (U, U))` dies under the bound `Object` too (`REPORT.md:166`).
- **The curator.** Nothing goes to him now. I say nothing about a running batch until it lands. The record settles (a) and (b), so there is no ask, and nothing here is irreversible, so there is no hold. The row is named among the rows that the batch opened. Your choice to record the defect and not repair it goes in your report's decisions, with (a) and (b) as the ways not taken. It is routine: the text settles the defect, and only the route of the repair is open.

**My own steps after the landing.**

- Check that the gather numbered this row 832. If it got another number, rewrite P-42's citation with `record.py set`. During the run I edit nothing tracked in the main tree (`batch.md`, "While it runs").
- File the code-generator fix as a PLAN line. Code-generator work goes on beside the phases (P-33, P-37). It is not on the switch-over's path: the probe's rough grep found no library declaration of the shape (`REPORT.md:169`). It is not on microGPT's path either: my grep found no generic dotted method in either model program.

**Sources:**

- `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/trap-test/questions-q.md` (cited as `questions-q.md` below): the scenario.
- `/home/user/fortress/.claude/skills/fortress-repo/SKILL.md`, `references/records.md`, `references/tests-writing.md`, `references/exploring.md`: the queries, the three homes of a defect, the `XXX` run-time pair, whose choice this is.
- `/home/user/fortress/.claude/skills/coordinator/SKILL.md`, `references/batch.md`: what reaches the curator, quiet during a batch, no edits in the main tree while a batch runs.
- `explorations/coordinator/climb-batch-workflow.md` (lines 85-170): rows numbered `NEW-<rung>-<n>`, the worker never runs `ledger.py`, the gather numbers rows.
- `explorations/fortress-gap-ledger.md`, through the tool (`ledger:832`, `:412`, `:691`, `:339`), plus a grep for the site and the highest row: row 832 does not exist, and the sibling rows.
- `explorations/fortress-gap-ledger-history.md` (grep "832"): no earlier row 832.
- `explorations/coordinator/tools/ledger.py` (grep, `:852-860`, `:1095-1180`): `add` numbers rows max + 1.
- `explorations/coordinator/POSITIONS.md`, through the tool (P-42, P-95, P-77, P-8): P-42's citation and the entries the worker leans on.
- `explorations/coordinator/POSITIONS-history.md` (P-42's block, and P-26's blocks through the tool): the struck sentence the worker quotes.
- `explorations/perf-probes/bound-any-compiled/REPORT.md`, whole: the defect, its controls, "no row", the sizing.
- `explorations/coordinator/INDEX.md` (grep): the probe's line. The foundations notes it names are not in this copy.
- `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6240-6270`: the site and the team's comment.
- `ProjectFortress/src/com/sun/fortress/Shell.java:365-375`: the rung's line.
- `Specification/basic/functions.tex:120-300`, `Specification/basic/expressions/method-invocation.tex:1-60`: the text gives the call a meaning.
- `Specification-1.0-frozen/basic/trait-parameters.tex:44-56` and a grep of `Specification/basic/trait-parameters.tex`: (b)'s ground, already weighed by P-42.
- `explorations/coordinator/PLAN.md:1-112`: the phases, where the fix goes.
- `explorations/run-c4/src/MicroGptFlat.fss`, `explorations/apl/mg/MicroGptApl.fss` (grep): no generic dotted method in microGPT.
- grep of `explorations/` for "22c": no record of the batch in this copy.

---

## 2. The order traits' self type, in a planner's draft

**What climb batch 22c does with the rung.** I take it out of the draft before the launch.

- It contradicts P-146 word for word: "The library's text gains no self type and no `comprises` clause, and walk is unchanged."
- A rung that reverses a decision of the curator is consequential, and a standing-go batch cannot carry it as a default (`batch.md`, "The go").
- No other rung needs it. Phase 3's measure does not need it either: P-146 is built (F-225), and the distance is 0 (PLAN, "Where we stand").
- Walk's edit for row 407 is useful only with the clauses. The row itself says "A self-typed trait needs no such clause on the compiled path (P-146)". So it stays parked with its row.
- Dropping the rung keeps the batch on its standing go. No batch is held.

**The two drafts' grounds.**

- **The planner's grounds do not hold.**
  - P-26 counts the team's code as their word on the language only where they wrote the rule on purpose. It also asks that "later" be a date checked against the texts.
  - The prelude belongs to the implementation layer. Its designs are "evidence, not authority" (P-37).
  - The flat number types did not come into the one library from the prelude. The exclusion rule backs them, in four texts of the language. P-43 calls the prelude "the team's instance of the same answer on the compiled path, not a ground for it".
- **The reviewer's result is right, and two of its grounds are weak.**
  - The prelude's deletion does not make its design irrelevant. P-37 says the decision "settles which files survive, not the designs inside them", and it states when a prelude design binds the one library.
  - P-27 governs how the library is extended. The ground that applies is P-146's own: the checker reads the library as the team wrote it.
  - "P-146 settled it" holds only if the sweep's evidence either was used or does not bind. That has to be checked, not assumed.

**The sweep's finding.**

- **Who decides.** The curator. This is evidence about his decision, and he settles every question about one (`exploring.md`, "The choices that are yours").
- **Is it new?** Partly.
  - P-146's judgement used the prelude's spelling. Its section 2, point 2 cites `CompilerAlgebra.fsi:16`, `:24` as "the team's compiled world". It also weighed Naden's write-up of 2012-08-31 as "the latest dated text", and Welterweight.
  - It did not use the two June 2012 commits. The ways note's history stops at 2011-12-06 (`self-typed-bodies-ways.md`, section 3, step 7).
  - The record does hold `59fdeff62` elsewhere, with its message: "This should improve the behavior of 'covers' checks in AbstractMethodChecker" (`reviews/comprises-type-level-judgement.md:21`, `reviews/walk-load-readings-check.md:32`). The commit is about coverage, not about self types.
  - The record does not hold `655e65d53`.
- **Before it reaches him.**
  1. Launch an Opus probe, with no go needed. It confirms the two commits' dates, diffs and messages, and finds the date of the team's last edit of the interpreter library's F-bounded `StandardTotalOrder` and `Equality` (`FortressLibrary.fsi:73`, `:231`). It also confirms the dates of Naden's and Welterweight's texts.
  2. Apply P-37's two cases to the probe's result.
     - First case, the later word on the language: it fails if Naden's 2012-08-31 text is later. That text asks for the idiom as "a separate construct ... only in bounds" (`justificationOfRTR.tex:626-630`), which is P-146's rule. Welterweight's 2012 grammar also admits no type variable in a clause.
     - Second case, a checker rule where the text is silent: it fails too. The checker supports the clause but never requires it (F-225), and the June checker change is about coverage.
  3. Record the dates as a fact, handed over from the probe's report.
- **The form.** If the probe confirms this, P-146 stands by P-37's own test. Then the finding goes on the review queue as a decision already taken by me: "P-146 stands; the rung is dropped". Its theme is "The checker's typing and inference". Its line is "Needed by: never", since nothing on the path waits and the choice can be undone. He gets it later, one item per message.
- **If the probe finds otherwise** (the prelude's edit later than every text of the language, and no later text against it), it becomes an ask, put before any batch that touches self types. It is still not a hold.

**The item for the curator.**

- **Question.** Do Guy Steele's June 2012 edits of the compiler prelude's order traits reopen your self-type decision (P-146)?
- **Context.**
  - A self-typed trait is a trait whose parameter stands for the type that implements it: `trait StandardTotalOrder[\T extends StandardTotalOrder[\T\]\]`. Its default bodies return `self` where a `T` is declared. P-146 lets the checker read `self` as also a `T`, with no change to the library's text.
  - The team left two spellings. The interpreter's library has the bound and no clause, with the bodies (`FortressLibrary.fsi:231`). The compiler's prelude has `comprises T` and no bound, with abstract operators only (`CompilerAlgebra.fsi:16`, `:24`).
  - New: on 2012-06-05 Steele added `comprises T` to the prelude's bounded trait (`655e65d53`). On 2012-06-06 he removed the bound, in a commit whose message is about the coverage check (`59fdeff62`).
  - Later than both: Naden's write-up of 2012-08-31 wants the idiom as "a separate construct ... only in bounds", which is P-146's rule. The type group's 2012 calculus drops type variables from such clauses. The POPL 2019 paper has no self types.
  - The record's test for a prelude design (P-37): it binds only if a later word on the language backs it, or if the text is silent and the checker enforces it. Neither holds.
  - The other way, the clauses on seven traits (way 5), costs seven library lines, a walk edit (row 407), a specification change that admits a type variable in a clause, and exclusion verdicts that can move on both paths (judgement, section 3). The switch-over does not need it.
- **Default.** P-146 stands, and the notes gain the June 2012 dates.

**Sources:**

- `questions-q.md`: the scenario.
- `explorations/coordinator/POSITIONS.md`, through the tool (P-146, P-27, P-37, P-158), and its grep for "flattened in 2009": the entries as the copy holds them.
- `explorations/coordinator/POSITIONS-history.md` (`history:P-146`; P-43's block of 2026-10-26): P-146 is the curator's answer "1" of 2026-10-13, and P-43's old "last record" text is gone.
- `explorations/reviews/self-typed-bodies-ways.md` (way 5, sections 3 and 4): the history stops at 2011-12-06, and the later texts.
- `explorations/reviews/self-typed-bodies-judgement.md` (sections 1-4, 7, "For Pavol"): what P-146 weighed, Naden as the latest text.
- grep of `explorations/` and `research/` for `59fdeff62` and `655e65d53`: the first is held with its coverage message, the second is not.
- `Library/CompilerAlgebra.fsi:10-30`, `Library/FortressLibrary.fsi:73`, `:177-178`, `:231` and `.fss` (grep): the sweep's first point checked, and the library's bounded traits.
- `explorations/fortress-gap-ledger.md`, through the tool (`ledger:407`): walk's overflow, and that the edit is not needed under P-146.
- `explorations/coordinator/FACTS.md`, through the tool (F-171, F-225): the clause's status in the text, P-146 as built.
- `explorations/coordinator/review-queue.md` (header, counts, grep of self-type items): the item's form and theme.
- `explorations/coordinator/PLAN.md:1-60`: phase 3 at its exit, distance 0.
- `/home/user/fortress/.claude/skills/coordinator/references/batch.md` ("The go"), `references/road.md` (re-approval items), `/home/user/fortress/.claude/skills/fortress-repo/references/exploring.md` (evidence against a decision).

---

## 3. A `case` guard typed by a type variable

**Decision.** The worker takes (b), row 480's own fix. Nothing goes to the curator.

**Reply to the worker.**

- **Why (b).**
  - The language's text asks the question about `Contains`, not about a ZZ32 generator: "If the type of the guarding expression is a subtype of type `Contains` and the condition expression does not, the default operator is ∈; otherwise, it is =" (`Specification-1.0-frozen/basic/expressions/case.tex:47-51`; the same in `Specification/`).
  - The library says the same: `Contains` is the trait that "we can check ... using `opr IN` ... or using a `case` expression" (`Library/FortressLibrary.fsi:707-716`). Every `Generator` and every `Range` extends it (`:759`, `:2189`).
  - Walk asks the same question of the guard's value (`Evaluator.java:415`).
  - (b) asks the text's question for every type, so it is a subtype test against `Contains`.
- **Why not (a).**
  - `GeneratorZZ32` is the team's stopgap, by their own words: "It should use a parameterized Generator type but it is not yet supported. Instead, we use GeneratorZZ32 for now" (`525264af1`, quoted in `rung-ranges-zz32/REPORT.md:85`). The general form stays commented out beside it (`Functionals.scala:1399`). P-37: "A stub does not bind, and neither does a workaround of a JVM or checker gap".
  - Rung J already weighed the `Generator` routes and refused them: "a `Contains` that is not a `Generator` would get `=`" (`REPORT.md:162-165`). (a) is narrower still. Every set, list or map guard would get `=`, against the text.
  - It does not close the row's own reproducer. The range operators return generic traits, such as `CompactFullRange[\ZZ32\]` (`FortressLibrary.fsi:2313`). A type variable bounded by `Range[\ZZ32\]` passes the subtype test only if `Range[\ZZ32\]` is below `GeneratorZZ32`, and the generic traits could get there only through a conditional extension.
  - Copied as the prelude declares it, `extends Equality[\GeneratorZZ32\]` beside the ranges' `Equality[\Range[\ZZ32\]\]` (through `StandardPartialOrder`, `:177-178`) breaks the exclusion rule (P-43).
  - It touches two areas, the library and the checker. That alone makes it not your choice (`exploring.md`).
- **Your citations are of superseded text.**
  - P-43 no longer says "the flattened prelude is the team's last record of the Fortress way". That sentence moved to history on 2026-10-26. P-43 now calls the prelude "the team's instance of the same answer ..., not a ground for it".
  - P-26 no longer counts the prelude's number types among the later word. They "left the list" in the same rewrite (POSITIONS-history, P-26's and P-43's blocks of 09:28Z).
  - P-77 took the prelude's width (`ZZ32`), on a JVM ground where the text named no width (rung J, section 5). It keeps "the public range traits ... generic in their index type". That argues against a ZZ32-only trait in the one library.
  - P-37 lets the one library take a prelude design in two cases only, and the stopgap is neither.
- **What the test must show.**
  - **Before the fix, on the base's checker, in the one-library world:** `=` is chosen for a guard typed by a type variable bounded by `Range[\ZZ32\]`, by a union of ranges such as `(if b then 1:3 else 5#)`, and by an intersection with a `Contains`.
  - **The mirror case:** the condition typed by a type variable bounded by a `Contains`, against a `Contains` guard. The text gives `=`, and today's branch answers ∈. Measure it. If the base shows it, it widens row 480's claim, and you write the row's whole new line.
  - **After the fix:** ∈ for the first three, `=` for the mirror.
  - **Controls, the same before and after:** a guard of a trait type such as `Range[\ZZ32\]` or a `Set` gives ∈. A non-`Contains` guard, such as a `ZZ32`, gives `=`.
  - **The compiler world:** unchanged, and its tests stay green. Its branch retires with the prelude (PLAN, phase 4).
  - **How to observe it.** No gated compiled program reads the one library before the switch-over (row 579's note; PLAN, phase 4: rows 476 and 480's probes "become gated compiled tests once programs compile against the one library"). Rung J recorded this branch the same way, by probes through the distance stage's driver (`REPORT.md`, section 10, home 3).
    - So: a probe through that driver, run on the base and on your tree, the before and after quoted with their commands.
    - A gated walk test with the same guards, green before and after, that pins the language's answer.
    - The count stage, timed before and after as a checker rung requires. It should stay 0.
    - Name the probe so that the names batch can make it the gated compiled test. Row 480 says its old probes are gone.
- **What goes into the report.**
  - Defects: row 480, closed by the fix, with the mirror case if it shows.
  - Decisions: (b) taken, (a) not taken, with the evidence above.
  - For FACTS: F-133's sentence on row 480 becomes false, so hand over its new text.
  - Points to report: none from the team's lines. The branch is the revival's (`3be1fecd7`).
  - Commands: the driver command, which this skill does not give.
  - A note that the record's precedent (home 3, probes) stands in for the gated test that the skill asks for, and why.
- **The curator.** Nothing. The text settles the fix. It changes one area and no model line, and it can be undone. The decision lands as a routine item on the batch's review list.

**My own step.** `fortress-repo`'s `exploring.md`, "Weighing the sources", still lists "the compiled number tower, which they flattened in 2009 and 2010" and the kept specialisation among the late positions. That is out of step with P-26 and P-43 as of 2026-10-26, and POSITIONS rules. I have the skill writer fix it, and I tell the curator when it lands, with the other skill changes.

**Sources:**

- `questions-q.md`: the scenario.
- `explorations/fortress-gap-ledger.md`, through the tool (`ledger:480`, `:476`): the row and its fix, and the stopgap row already closed.
- `explorations/coordinator/FACTS.md`, through the tool (F-133, F-289), and a grep for a gated one-library route: F-133 needs a rewrite, and no gated route exists.
- `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1385-1410` and `compiler/Types.java` (grep `isContainsType`): the two branches, and the commented general form.
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:410-418`: walk asks about `Contains`.
- `Specification-1.0-frozen/basic/expressions/case.tex:40-56` and a grep of `Specification/basic/expressions/case.tex`: the text's rule.
- `Library/FortressLibrary.fsi:177-178`, `:706-722`, `:759`, `:2189`, `:2309-2328`: the library's own way, and the types the range operators return.
- `Library/CompilerLibrary.fsi:105-115`: `GeneratorZZ32` as declared.
- `explorations/compile-ladder/rung-ranges-zz32/REPORT.md` (sections 3-5, 10, 11) and a grep of its notes for `GeneratorZZ32`: the team's stopgap words, the ways not taken, the probe homes.
- `explorations/coordinator/POSITIONS-history.md` (P-26's blocks through the tool, P-43's block) and `POSITIONS.md` (grep): the superseded text that the worker quotes.
- `explorations/coordinator/PLAN.md:64-83`: the phase-4 line on rows 476 and 480, row 579's note.
- `explorations/coordinator/tools/distance/run.sh` (header), `ProjectFortress/src/com/sun/fortress/Shell.java:376-485` and a grep for `useFortressLibraries()`: whether a program can be checked against the one library.
- `explorations/coordinator/climb-batch-workflow.md` ("Rung worker"): what `record.md` carries.
- `/home/user/fortress/.claude/skills/fortress-repo/references/tests-writing.md`, `references/exploring.md`, and a grep of the copy's `.claude/skills/`: the test order and homes, and the stale line.

---

## 4. `System` on the compiled path after the switch-over

**Decision.** Rung Y does not go into the names batch as drafted.

**Reply to the planner.**

- **What `System` is on the compiled path after the switch-over.** It is the one library's `System` (`Library/System.fsi` and `.fss`), which the compiled path checks, compiles and runs, as walk runs it (P-37: "One library, the interpreter's, serves both paths").
- **Why `CompilerSystem` cannot be that `System`.**
  - It cannot outlive the prelude as written. Its `args : StringVector` names a type of `CompilerBuiltin` (`CompilerBuiltin.fsi:582`). That file is deleted at the switch-over, and the type has no counterpart in the one library (`perf-probes/prelude/natives-shape.md`, "The foreign-type table").
  - Mapping the api name `System` to it extends the hack that the switch-over ends. The team called it a "hopefully temporary hack" (`WellKnownNames.java:113-116`, cited by P-37). It would give the two paths two different `System` apis: `args` would be an `ImmutableArray[\String,ZZ32\]` under walk and a `StringVector` compiled, so no one program fits both.
  - Copying walk's names into it is the port that P-37 exists to avoid. The batch records also treat `CompilerSystem.*` as a compiler file that "take[s] no new declaration before the switch-over" (`CLIMB-BATCH-6.md:96`, `CLIMB-BATCH-7.md:407`).
  - The audit of the zero already reads `System` as taking `CompilerSystem`'s place in the compiled tests (`reviews/phase3-exit/zero-audit.md`, A.2).
- **"No native work" saves almost nothing.**
  - `getProgramArgsPrim` and `NativeArray` both have no compiled analogue, and microGPT needs both (F-32).
  - microGPT's arrays reach `NativeArray` whatever `System` is (natives-shape, "microGPT's path").
- **"No rung for the checker errors" is wrong.**
  - P-33 clears each component outside the fourteen "before the first program that needs it". The names batch's respelled tests need `System`, and microGPT, in phase 5, does too.
  - The record already gives `System`'s 2 errors a home in the names batch. Both are type errors of `NativeArray`'s `PrimImmutableArray` (`System.fss:28`, `:34`; `CLIMB-BATCH-23.md:44`, `:255`).
- **The work, by phase.**
  - **Phase 4, the natives** (P-58's form, `builtinPrimitive` naming a helper):
    - `getProperty`, class A: only the binding's text changes (N1).
    - `getEnvironment`, class C: a new helper (N3).
    - `getProgramArgsPrim` and the `NativeArray` natives that `args` is built over: class D2, no compiled analogue (natives-shape, "By file").
    - `programName` and `toDirectoryName` are plain Fortress and need nothing.
  - **The names batch:**
    - `CompilerSystem` goes with the prelude.
    - The 27 components in `compiler_tests/` that import it, and the one in `other_compiler_tests/`, are respelled to `import System.args` or `System.{...}`, with every checked value kept. All 28 import `args`, and they use `args[0]` and `|args|`. List each changed team line for the review list.
    - `System`'s 2 checker errors are cleared there.
    - These tests have never run under the bound `Any` (F-289). They passed under it once in the probe (`perf-probes/bound-any-compiled/REPORT.md:13`).
  - **Phase 5:** microGPT's two programs need `System` to load, and their import lines do not change either way.
- **Before you redraft, probe one thing.** Does a compiled program that imports `System` initialise `args` as the component loads, so that it needs `getProgramArgsPrim` and `NativeArray`? Walk does (`System.fss:28`). PLAN parks class D2 "with decision A" (PLAN, phase 4). P-84 and P-85 hold the array store until after the switch-over. If the compiled path behaves as walk does, the respelled tests cannot run at the switch-over unless `NativeArray` runs on the compiled path for a `String` element.

**What goes to the curator.**

- **Rung Y itself:** nothing. P-37 settles it.
- **`CompilerSystem`'s deletion.** The record says that no line decides `CompilerSystem`'s fate, and that it "belongs to the switch-over's design, for the coordinator" (`consolidation-2026-10-22/evidence/positions/p2/proposals.md:150`). So I decide it under P-37: deleted with the prelude, its tests kept and respelled. It is named in one line at the names batch's landing and goes on the review list.
- **One ask, if the probe confirms the conflict.** It goes before the names batch is briefed, since the switch-over needs the answer. It is consequential: it touches the array work that P-84 and P-85 hold, and microGPT's array path.
  - The question: how `System.args` runs compiled at the switch-over while the array store waits.
  - The options:
    1. Bind `NativeArray`'s natives for reference elements before the names batch, and leave the `double[]` store to decision A.
    2. Keep the respelled tests as expected failures under a new row until the array work.
    3. Bring the array decisions forward.
  - With each: what it touches and costs, from the probe.

**Sources:**

- `questions-q.md`: the scenario.
- `Library/CompilerSystem.fsi` and `.fss`, `Library/System.fsi` and `.fss`: the two apis, and which members are natives.
- `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` (grep `StringVector`): `args`'s type is the prelude's.
- `explorations/perf-probes/prelude/natives-shape.md:52-100`: the classes of `System`'s three natives, `StringVector` with no type, microGPT's path.
- `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:105-145`: the mapping and the team's "temporary hack" comment.
- `explorations/coordinator/POSITIONS.md`, through the tool (P-38, P-58, P-12, P-85, P-84): the tests, the binding form, the clearing order, the array wait.
- `explorations/coordinator/FACTS.md`, through the tool (F-53, F-289), and a grep for `CompilerSystem` and `getProgramArgs`: the distance's scope, the importing tests never run under `Any`.
- `explorations/fortress-gap-ledger.md`, through the tool (`ledger:320`), and a grep: no row on `CompilerSystem`.
- `explorations/reviews/phase3-exit/zero-audit.md:36-70`: `System` takes `CompilerSystem`'s place, and its 2 errors.
- `explorations/coordinator/CLIMB-BATCH-23.md` (header, `:40-48`, `:250-262`): the 2 errors are `NativeArray`'s, and their home is the names batch.
- `explorations/coordinator/consolidation-2026-10-22/evidence/positions/p2/proposals.md:150`, found by grep: `CompilerSystem`'s fate is unrecorded and is the coordinator's.
- `explorations/coordinator/CLIMB-BATCH-6.md:96`, `CLIMB-BATCH-7.md:407`, `map/spec-to-implementation.md:133`, `next-climb/worlds.md` (grep): how the record has treated `CompilerSystem`.
- `explorations/coordinator/PLAN.md` (phase 4, `:589`) and `review-queue.md` (grep): D2 parked with decision A, the review's finding 3.
- `ProjectFortress/compiler_tests/*.fss`, `other_compiler_tests/`, `library_tests/` (grep `import CompilerSystem`, then the uses of `args`): 27 + 1 importers, all of `args`.
- `explorations/run-c4/src/*.fss`, `explorations/apl/mg/MicroGptApl.fss` (grep): microGPT imports `System` and uses only `getProperty`, in its check programs.
- `explorations/perf-probes/bound-any-compiled/REPORT.md` (opened for scenario 1): the importers' count and their run under `Any`.

---

Note: when the `fortress-repo` skill loaded, the context also showed a Read of `/home/user/fortress/Library/FlatString.fss`. That was not my call, and I used nothing from it.

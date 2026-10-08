<!-- DRAFT, CONTENT ONLY. The record of climb batch 11, the next batch of the plan's phase 3, "the checker at a true zero", drafted 2026-10-08 by a planning worker for the coordinating session, the curator and the batch's workers, against `main` at `a8385b23a`, whose `Library/`, `ProjectFortress/`, `Specification/`, `Documentation/`, `build.xml` and `bin/` are byte for byte those of `ec718967a`, climb batch 10's landing (`git diff --stat ec718967a HEAD` over those paths is empty), so batch 10's landed tables describe this base. It says what the batch changes, why, and what the curator decides first. It holds no manifest and no workflow mechanics, since the batch workflow is being redesigned before the batch runs (POSITIONS, "The order of the work after batch 10."). Sources: PLAN.md, phase 3 items 8 and 9 and the lines under them, items 36 to 47, and the lists "Climb batch 9, listed for his review" and "Climb batch 10, listed for his review"; batch 10's landed tables (`compile-ladder/climb-batch-10/gate/distance.txt`, `checker-count.txt`, `summary.txt`) and per-site list (`compile-ladder/gate/distance-sites.tsv`); `compile-ladder/climb-batch-10/RECORD.md`; `reviews/batch-10-review.md`, section 1 ("What is left of the 253"), the findings and Part 3; `reviews/p1-judgement.md`, "The judgement"; POSITIONS.md and FACTS.md, cited by bold title; ledger rows read one at a time with `facts-extract.sh`; the form of `coordinator/CLIMB-BATCH-10.md` and its review `climb-batch-10-review.md`. Nothing was built or run: no stage, no suite, no Fortress program and no `classify.py`. The per-site list was read by file, line and message; a class named below is by reading `classify.py`'s rules against the messages, not by a run. One line per paragraph. Reviewed in place on 2026-10-08 by the top-tier review `coordinator/climb-batch-11-review.md`, on the curator's standing pre-approval of such reviews (POSITIONS, "The phase-3 batches run on a standing go."), against `main` at `2f6db6625`, whose commits since `a8385b23a` touch the boot note, the revival story and the testing-practices note only; the review gives one reason per change, what it checked and found right, and the questions as they now stand. -->

# Climb batch 11

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode.
- **The one library** is the interpreter's library (`Library/`, `ProjectFortress/LibraryBuiltin/`). At the **switch-over** the compiled path takes it over and the compiler's own small library is deleted.
- **The distance** is the number of errors the checker reports when it checks the one library. Each error has a **site** (a file and a line) and a **class** (the distance stage's grouping by cause, such as `S1` or `OT`, "other body errors"). Phase 3 of the plan brings the distance to a true zero, so that the switch-over can happen.
- **The count** is the older, narrower measure, the checker's errors on the one library's api files. It is 1: `isLeftZero` (row 582).
- A **row** is an entry of the gap ledger, the project's list of known defects, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers".
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker. A **batch** is a few rungs, merged and tested together by the **gate** (every suite once) and landed at once.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. An **expected failure** is a test named `XXX…` that passes while the defect is there; when the fix lands it is **promoted**, renamed by `git mv` to a plain name.

### Where the distance stands

- After batch 10 the distance is 253 and the count 1 (`compile-ladder/climb-batch-10/gate/distance.txt`; `checker-count.txt`; landed at `ec718967a`).
- The 253, by what each group waits on (`reviews/batch-10-review.md` section 1, "What is left of the 253"; its groups sum to 253):
  - about 95, the arrays: they wait for the array design after the switch-over (your answer to batch 8's Q4, item 15);
  - 36, the ranges: items 39 to 41, yours, unanswered (question Q3 below);
  - 30, the self-typed bodies: a list of ways and a judgement first (your answer to batch 8's Q2; Q5 below);
  - 18, the tuple comparisons: item 43, yours;
  - 13, row 560's second part: item 36 (Q2 below);
  - 32 under batch 10's rung G's rows and row 627: row 628 13, row 629 9 (item 45), row 630 2, row 631 1, row 632 1 (item 46), row 627 6;
  - 12 under batch 10's rung N's rows: `QQ`'s power and `strToFloat` 5 (rows 438, 441, 445), row 635 2 (item 44), row 636 4, row 637 1;
  - 17 others: row 433 6, row 425 4, `isLeftZero` 2 (row 582), row 606 2 (item 42), row 585 3 (item 38).
- So most of what is left waits on a decision, not on work. This batch reaches 17 sites with no answer from you, 20 with Q2, and 56 with Q2 and Q3. The rest waits on the arrays (95), the self-typed judgement (30), your other open items (43 sites, section 2's last list), `where` clauses (12) and row 425's rewriting (4), and row 628 (13) builds on this batch's walk rung.

### The rungs, two sentences each

- **W, walk.** Under your yes to Q1 (P1), walk leaves open a type parameter whose bound names itself when nothing at a call fixes it, so `SUM[i <- 1#100] i` with no type written runs again: row 424 closes, the specification's five red examples and the walk smoke test `explorations/claude_demo.fss` run, and the examples' run joins the gate. With or without Q1, walk stops running a declaration that a trait overrides (row 614) and checks the Meet Rule on object expressions (row 618); the distance does not move, since the checker does not read walk, and the compiled path still refuses the unwritten reduction (row 425).
- **C, the checker's overloading and export defects.** The checker stops refusing four valid programs and stops accepting one invalid one (rows 610, 617, 625, 637; row 619), reports an undeclared type in a `typecase` arm instead of crashing (row 626), and gains row 463's two owed tests; under your yes to Q4, the three crashes on local functions with untyped parameters become a message (rows 620 to 622). One site moves (row 637, `List`'s export check); the other rows are test programs, not library sites.
- **E, the checker's expected type and a captured parameter.** The checker passes the type the text gives into an `if` without `else`, a block's last expression after a local declaration and a call by loose juxtaposition, and, under Q2, a `typecase` branch (item 36), and it keeps a method's own static parameter apart from the caller's at a method call (row 627): 16 sites, 19 under Q2. The self-typed bodies and row 425's four sites do not move.
- **L, the library: the ranges, only under Q3, and three slips.** Under your answers to items 39 to 41, the range types of rank 2 and 3 get the type or device you choose, the generic range bodies compare their indices by the way you choose, and a zero extent answers an empty range: up to 36 sites. With them, three getters stop being called with `()` and five `throw ForbiddenException` get their argument (rows 633, 638, no site); without Q3 the rung does not run, and those two rows wait for batch 12's library rung.

### What the batch leaves out, and why (section 4 gives each home)

- The arrays, about 95: after the switch-over, by your answer.
- The self-typed bodies, 30: no list of ways is on file yet (Q5).
- The ranges, 36, unless you answer Q3.
- The sites under your other open items (items 38, 42 to 46, the negative power, `isLeftZero`, one team test line): 43 sites, listed at the end of section 2.
- Row 628, 13 sites: its repair types the reductions at their element type, which walk can run only once rung W has landed, and a rung may not build on another rung of its own batch (PLAN, "The principle for the batches").
- `where` clauses (rows 433, 630, 636; 12 sites) and the checker's rewriting of a reduction by its element type (row 425; 4 sites): language and checker work no batch has planned.

### Before the batch runs

- The redesigned workflow, then batch 11 (POSITIONS, "The order of the work after batch 10.").
- Your answers to Q1 to Q4, or the defaults they name.
- The two microGPT walk checks on the landed tree `ec718967a`. They have not run since batch 10 landed: the session's permission check refused the commit stage's `mg-run.sh`, and the way through is your word, a manual approval for one run or an allow rule (PLAN, "Climb batch 10, listed for his review", its last entry; `reviews/batch-10-review.md` finding 1). Batch 10's library edits have no model check until then.
- `classify.py` reading its ranges by declaration (row 577; `reviews/batch-10-review.md` finding 7; PLAN, batch 11's line) is not built. This record counts by the review's groups and by row, not by the stage's classes, so it does not need it; but the gate's class table will misfile moved sites again until it is.

### Cost

- About 5.2M tokens, from 4.3M if no skeptic's fix is contested to 6.3M if three rungs go to a judge; a red gate adds about 0.5M. Batch 10 wrote 6.26M for four rungs (`reviews/batch-10-review.md`, "For Pavol"). The derivation, role by role, is `process-engineering/batch-redesign.md`, section 5.

## 2. Your questions, in the order they block the batch

**Answered.** The curator answered Q1 to Q4 on 2026-10-08, each at its recommendation (POSITIONS, "The order of the work after batch 10."): Q1 yes, way 11; Q2 yes to both parts, the `typecase` branch and the plan's reading of the other three contexts; Q3 the recommended readings, items 39, 40 and 41 each at way (a), so rung L runs; Q4 yes, way 1. Q5 stays out of this batch. Each rung's section in section 3 opens with the answers it follows, and section 5 gives the manifest the batch runs on.

### Q1. Probe P1: under walk, is a type parameter whose bound names itself, and that nothing at a call fixes, left open (way 11)?

- **Blocks:** rung W's main part. Without a yes, W builds rows 614 and 618 only.
- **On file:** the top-tier judgement `reviews/p1-judgement.md` (2026-10-08), with the probe `compile-ladder/plan-9/probes/P1.md`. The short form follows.
- **Terms.** A type parameter is a hole a type fills, `T` in `SUM[\T\]`; its bound is the widest type allowed in the hole. An F-bound names the parameter itself, `T extends AdditiveGroup[\T\]`: `T` must be a type whose `+` takes a `T` and gives a `T`. The clause form `SUM[i <- 1#100] i` calls `SUM()` before any element exists, so nothing fixes `T`.
- **Type theory.** An F-bound has many solutions and no largest one, so your rule, "takes its bound, never `Bottom`", has no bound to take. The paper the rule comes from leaves this case out (`research/extracts/ParkPOPL2019-extract.md:282-285`).
- **Today.** Walk gives `T` the type `Bottom`, which holds no value, and the reduction refuses the first element. The checker takes the bound and refuses the call (row 425).
- **The specification.** A reduction is rewritten by the type `N` of its elements, `SUM[\N\]` (`Specification/advanced/parallelism-locality/defining-generators.tex:154-164`); the inference chapter lists this case as not yet described (`Specification/basic/inference.tex:246-249`).
- **The library's own way.** Keep the parameter out of the way and let the elements' own types do the work: `simpleJoin(a: Any, b: Any)`, the comprehensions' `AnyCovColl` (the judgement, step 5).
- **The peers.** C# and Rust refuse; Java keeps the hole abstract; Scala takes `Nothing`, walk's `Bottom`; Julia, the dynamic peer, reads the type from the elements (step 6).
- **The commits.** Your answer 7 (the one library's `SUM` and `PROD` typed, without the `Number` catch-all; POSITIONS, "`SUM` and `PROD` without the `Number` catch-all (answer 7)") removed the catch-all (`d846e3644`), and the 21 team demos that ran before all stopped, 18 of them at this row (row 424's note); batch 9's rung W (`669b77d03`) gave a plain bound its bound and kept a big operator's parameters at `Bottom` (its decision D2).
- **The derivation.** The letter of your rule cannot apply; its spirit, never refuse every value, does. "The specification's examples join the gate at zero red", not respelled, rules out writing the type and refusing.
- **The ways** (the probe's numbers; the sizes are the judgement's, by the probe's patches): 1, a `ZZ32` default, one edit in `instanceOf`, breaks every sum of floats; 9, `Any`, one block in `instanceOf` of about 20 lines, runs everything but makes a set comprehension's collection a `NodeSet[\Any\]`, which by the judgement's reading a declared `Set[\ZZ32\]` refuses; 10, the bound read without `T`, about 60 lines, as 9 and dependent on how placeholder traits are written; 11, left open, about 60 lines in five interpreter files, runs everything and keeps today's types; 12, refuse, about 25 lines, leaves the examples red and refuses the library's own `upto`; 2 to 8 are not fixes or are ruled out by your decisions.
- **Recommendation** (the judgement's): way 11.
- **A yes commits you to:** rung W's P1 half, about 60 Java lines in five interpreter files, no library or model line; two passages of the specification in the S1 form (a labelled callout at the passage and an entry with its reason in Appendix I; POSITIONS, "The S1 form"); `ant testSpecData` in the gate at zero red; the 18 demos and the smoke test run once and reported, none edited; a walk type named `OPEN` that a program can see where it prints such a type; one new row, an empty unwritten reduction over a type other than `ZZ32` getting `ZZ32`'s identity (`0 : Int` for an empty sum of `RR64`).
- **Not covered by the yes:** D2's case, a big operator's plain-bounded parameters (the judgement's section 5); it stays out of this batch (section 4).
- **Default:** if you give no answer, W builds rows 614 and 618 only; the P1 half, the five examples' run and the gate's new stage wait for your yes. The judgement asks for a yes.

### Q2. Item 36: does a `typecase` branch pass the enclosing expected type to its call? And do you confirm the plan's reading of the other three contexts?

- **Blocks:** 3 of rung E's 19 sites; and, if you do not confirm the reading, all 13 of item 36's.
- **On file:** PLAN item 36, narrowed by batch 8's review (`reviews/batch-8-review.md` section 2, "The 11 are less of a question than item 36 says", and finding 2): the text answers three of the four contexts, so they are "new work for a checker rung, not a fork", and "what is left for him is the `typecase` face at most". Row 560, the ledger row that records these 13 sites, still says in its note that the whole second part is yours, and the inference chapter lists all four as not described, so a word from you settles which reading stands. No top-tier judgement is on file; none is needed for the three contexts the text answers.
- **Terms.** The expected type is the type a context requires of an expression, such as the declared type of the variable it is assigned to. A result-only type parameter appears only in a function's return type, as `T` in `fail[\T\](s: String): T`; only the expected type can fix it. A `typecase` chooses a branch by the run-time type of a value.
- **Type theory.** A checker that passes the required type down into an expression's parts (bidirectional checking) gives each part the type the whole requires. Where no type reaches the call, the result-only parameter takes its bound, `Any`, and an `if` without `else`, whose clauses must have type `()`, then has a clause of type `Any`.
- **Today.** Walk runs all 13 sites. The checker refuses them, for example "An 'if' clause without corresponding 'else' has type Any instead of type ()" (`Library/FortressLibrary.fss:295`). Before batch 8 the same shapes compiled and then failed JVM verification at load (row 560).
- **The specification.** An `if` without `else`: "then every clause must have type ()" (`Specification/basic/expressions/if.tex:67-68`). A block: "the value and type of this expression are the value and type of the expression block as a whole" (`blocks.tex:54-57`). A loose juxtaposition: the static arguments "are statically inferred from the context of the function call" (`var-ref.tex:35-40`, row 455's reading). A `typecase`: its type is "the union of types of all right-hand sides" (`typecase.tex:110-111`), which by reading gives each branch the enclosing expected type. The inference chapter's list of contexts (`Specification/basic/inference.tex:128-136`) names none of the four, and its list of what it does not yet describe names all four (`:254-258`).
- **The library's own way.** The library calls `fail` or `builtinPrimitive` in all four positions, 13 sites; the checker accepted them by binding `Bottom` until batch 8, which your instance rule forbids.
- **The peers.** No survey is on file. By reading, bidirectional checkers, Scala's among them, pass the required type into a conditional's branches and a block's last expression.
- **The commits.** Batch N's rung T wrote the inference chapter's context list (`f54ffac90`); batch 8's rung I made a result-only parameter take its bound (`f3032eed8`); batch 10's rung N dropped the written `Object` bounds (`a1b5c253d`), which left these 13.
- **The derivation.** "A type parameter the arguments do not fix takes its bound, never `Bottom`" and "The specification stays the standard": the checker must pass in the type the text requires. It touches the specification and the checker, so it reaches you (POSITIONS, "Which decisions taken inside the work reach Pavol, and how.").
- **The ways.**
  1. All four contexts, the `typecase` branch by the union rule. Touches `impls/Misc.scala` and `impls/Operators.scala` of the checker, the chapter's two lists and its Appendix I entry. Clears 13 sites.
  2. The three contexts the text answers; the `typecase` branch left with row 560. The same two files but the `typecase` case; the chapter's lists without it. Clears 10.
  3. None: the 13 stay, pinned by `compiler_tests/XXXInferResultOnlyNoContext`.
  4. Rejected: the library writes the type at each call, `fail[\()\](…)`. It routes round a checker gap, which the library's practice forbids (POSITIONS, "The library's own practice is the standard.").
  The costs of 1 and 2 are unmeasured; no probe ran.
- **Recommendation:** way 1, the batch-8 review's reading of the union rule, which the planner takes; unmeasured.
- **Default:** the three contexts, by PLAN's reading; the `typecase` branch waits for your word.

### Q3. The ranges' 36 sites: items 39, 40 and 41

- **Blocks:** rung L. Without an answer, L does not run.
- **Why they are held.** Batch 9's rung R repaired the ranges' Meet Rule pairs and slips and left 36 sites under rows 599 to 601. Each needed a choice its brief did not give it: two design forks "for Pavol" and one repair that changes a value walk prints, a stop reserved for you (`compile-ladder/rung-range-meets/REPORT.md` section 6 and decision 2; its `SKEPTIC.md` section 8, "For Pavol"). Batch 9's gather filed them as items 39 to 41, each "needed before the switch-over" for phase 3's distance. Batch 10's record left them out as yours (`CLIMB-BATCH-10.md` section 1), and batch 10's review counts them unchanged. No answer is on record.
- **What was asked** (PLAN items 39 to 41, in short):
  - 39, row 599, 15 sites: the range types of rank 2 and 3 have no type for "a bounded range of that rank", so fifteen declarations cannot declare what their bodies build, and two programs stop walk. Either a `BoundedRange2D`/`BoundedRange3D` trait, or a `cast` in each body, as the `CAP` meets now have. No default.
  - 40, row 600, 18 sites: the generic range bodies compare indices of their type parameter `I` (`checkSelection`, `Range.CMP`, `FORWARD_CMP`, `CompactFullRange`'s `|self|`, `TrivialOpenRange`). Move the bodies to the `ZZ32` types of rank 1 to 3; declare generic `PCMP` and `SCMP`; or compare through a bound. No default.
  - 41, row 601, 3 sites: `#0`, `#(0,n)` and `#(0,n,m)` answer an empty full range where an extent range is declared, and the rank-2 and rank-3 forms write its bounds out of order, so `|#(0,3)|` is 1. Repairing the order makes it 0, a value walk prints. The declared type could become `RangeWithExtent[\…\]` (with `opr #`'s), or a zero extent could answer an empty extent range. Default: left, today's values pinned by `ProjectFortress/tests/RangeDeclarations.fss:112-113`.
- **No judgement is needed by the Fable rule:** the three touch the library alone, since the specification describes no range of rank 2. The rung's lists are the ways; item 40's are not weighed.
- **Terms.** A range is a set of indices: `0#4` is four indices from 0, `0:3` the indices 0 to 3. Its rank is its number of dimensions; a range of rank 2 indexes a matrix by pairs `(ZZ32, ZZ32)`. Its kind says which ends are known: full (both), left, right, extent (a count), open. `BoundedScalarRange` is the library's type for a rank-1 range with both ends known. `CAP` intersects two ranges. `PCMP` and `SCMP` compare two indices (product and lexicographic order).
- **Type theory.** A declared return type must cover what the body builds. With no named type for "bounded, rank 2", a method that builds one declares something wider and its callers lose the knowledge, or the body casts (39). Generic code may apply an operator to a value of a type parameter only if the parameter's bound declares it; here `I` has no bound, so the checker refuses `PCMP` on `I`, while walk finds the `ZZ32` or tuple version at run time (40). A declared type must cover every value the body can answer (41).
- **Today.** Walk runs item 40's bodies and answers. Two programs of 39 stop walk with a unification error, `((0,0)#).every(-1,-1)` and `((5,5)#).flip().forward()`. Item 41 gives `|#(0,3)|` as 1, where an empty range has 0 elements. The checker refuses all 36.
- **The specification.** It describes no range of rank 2, and `#s` only as an implicit subscript range (`Specification/basic/expressions/ranges.tex`, section "Ranges"; rung R's report, section 6). It is silent on all three.
- **The library's own way.** For rank 1, `BoundedScalarRange` names the bounded meet (`Library/RangeInternals.fsi:225-231`). The comparisons exist only at `ZZ32` and the two tuple types (`RangeInternals.fsi:30-40`). A declared type narrower than its body is repaired to what the body answers (batch 10's library rungs, `CLIMB-BATCH-10.md`, rungs G and N, "The decisions").
- **The peers.** No survey is on file; the question is internal to the library's design.
- **The commits.** Batch 7R made scalar ranges `ZZ32` only and kept the public range traits generic (`65f1e40ca`; POSITIONS, "Scalar ranges are over `ZZ32` only"). Batch 9's rung R declared the six rank-2 and rank-3 `CAP` meets with a `cast` in one body each (`Library/RangeInternals.fss:632`, `:664`, `:760`, `:792`, `:949`, `:1009`; `631fb867e`), a fork it settled in your stead.
- **The derivation.** "The library's own practice is the standard" points to a named meet for rank 2 and 3, as for rank 1 (39). "Scalar ranges are over `ZZ32` only", with the public traits generic, leaves the comparisons to the `ZZ32` and tuple kinds (40). A value walk prints changes only by your word (41).
- **The ways, and the recommendation for each.** No recommendation is on file; these are the planner's readings, unmeasured.
  - 39: (a) `BoundedRange2D` and `BoundedRange3D`, each the meet of the rank's range trait and its `BoundedRange`, as `BoundedScalarRange` is: two api types and six `extends` clauses; clears the 15 sites and lets the six casts go. (b) A `cast` in each body: no new type; whether it ends walk's two stops is unmeasured. Recommendation: (a).
  - 40: (a) the bodies moved to the `ZZ32` kinds of rank 1 to 3, the generic traits declaring them abstract, in the way batch 7R gave the scalar ranges their `ZZ32` types; (b) generic `PCMP` and `SCMP` beside the `ZZ32` and tuple ones; (c) a bound on `I` that declares the comparisons. By reading, (c) cannot cover ranks 2 and 3, since their index type is a tuple and a tuple type extends no trait. Recommendation: (a), or a short measurement of (a) and (b) first if you want their costs.
  - 41: (a) the order repaired, `|#(0,3)|` 1 to 0, and the declared types widened to what the bodies answer (`RangeWithExtent[\…\]`, with `opr #`'s); (b) the order repaired, and a zero extent answering an empty extent range, the declared type kept; (c) left. Recommendation: (a), the library's repair of a declared type; (b) if you prefer no api change, though whether the library has an empty extent range is unmeasured.
- **Default:** if you give no answer, rung L does not run: the 36 sites stay under their rows, rows 633 and 638 go to batch 12's library rung, and item 41 keeps today's values, pinned by `ProjectFortress/tests/RangeDeclarations.fss:112-113`.

### Q4. Item 47: should a local function whose parameter type is left out be refused with a message, as at top level, instead of crashing the checker?

- **Blocks:** rows 620 to 622 in rung C. The three crashes hide what lies behind three library declarations.
- **On file:** PLAN item 47; batch 10's rung C, its decision 9 with three candidates (`compile-ladder/rung-checker-defects/REPORT.md` section 12 and decision 9; `JUDGE.md` section 2). No ways note or judgement beyond them.
- **Terms.** A local function is a function declared inside a body, as `body(i) = …` inside `__bigOperator`. Its parameter type is left out when written `i`, not `i: ZZ32`; so is a function expression's, `fn (i) => …`.
- **Type theory.** A left-out type is found either by inference over its uses, or from the function type the context expects (a function expression passed where `ZZ32 -> ()` is expected gets `i: ZZ32`). Without either, the type is unknown and the checker must refuse.
- **Today.** Walk runs them. The checker crashes three ways: "Type is not inferred", "TryChecker returned an untyped expr", "Result of typechecking still contains intermediate nodes" (rows 620 to 622; `distance.txt`, the three `#crash` rows at `Library/FortressLibrary.fss:1302-1306`, `:2492-2606`, `:2865-2978`). At top level or in a method it refuses the same omission, "Missing parameter type for x" (row 405; `scala_src/typechecker/staticenv/STypeEnv.scala:193`).
- **The specification.** The components chapter says inference runs over every construct that still has a left-out type (`Specification/basic/components/type-inference.tex:44-45`); the inference chapter leaves that inference undescribed (`Specification/basic/inference.tex:24`, `:261`).
- **The library's own way.** The library leaves the type out in these three declarations; walk never needs it.
- **The peers.** No survey is on file. By reading, Java and Scala find a lambda's parameter type from the expected function type and refuse when there is none.
- **The commits.** Batch 10's rung C (`aa07efb31`) kept the crashes as expected failures, `compiler_tests/XXXLocalFunctionUntypedParam`, `…AndReturn`, `…InLoop`, under its stop "a crash repaired by catching it without the error the text gives".
- **The derivation.** A crash is no answer the text gives. The refusal departs from the components chapter, as row 405's top-level refusal already does without a passage of the specification saying so (a grep of `Specification/` for row 405 and its message finds none), so it would be recorded in the S1 form (POSITIONS, "Every change to the specification is recorded with its reason.").
- **The ways** (rung C's three):
  1. The refusal "Missing parameter type for i" for the local form. Small. The three crash rows become three errors; what lies behind them stays hidden until the types are known. A callout at `type-inference.tex:44-45` and an Appendix I entry, naming row 405 too.
  2. Inference of the left-out types: the repair, a checker project the text leaves undescribed. Not a rung.
  3. Left as expected failures: the default.
- **Recommendation:** way 1, the planner's own and unmeasured; rung C, its skeptics and its judge recommended none (`compile-ladder/rung-checker-defects/REPORT.md`, decision 9; `JUDGE.md` section 2). It turns a crash into a message and records a departure that already exists at top level.
- **Default:** way 3, as landed.

### Q5. The self-typed bodies, 30 sites: not decidable yet

- **What they are.** A self-typed trait is a generic trait whose parameter stands for the type itself, `trait Integral[\I extends Integral[\I\]\]`. Its bodies return `self` where the declared type says `I`, as `floor(self): I = self`. The checker types `self` as `Integral[\I\]`, not as `I`, and refuses the body. Walk runs them.
- **The sites.** Three families on the landed list: the orders' and `AdditiveGroup`'s bodies (`Library/FortressLibrary.fss:223-360`), `Integral`'s (`:685-721`) and `StandardMutableArrayType`'s (`:2175-2187`). The stage files 28 under `S1` and 2 under `R4`; the review counts them together.
- **Why they wait.** Your answer to batch 8's Q2: "the class waits until there is better information" (`CLIMB-BATCH-8.md` Q2, answered 2026-10-02). No list of ways is on file. What is on file covers parts:
  - the `comprises` judgement's way 3, `Integral[\I\] comprises I` with a six-line walk edit for row 407's stack overflow, which reaches `Integral`'s 8 at most and was never measured on the distance (`reviews/anyintegral-comprises-judgement.md`, way 3 and section 4);
  - route C's device, `comprises T` on all eight self-typed traits, which overflowed the checker (FACTS, "Route C built whole as a shadow"; POSITIONS, "The exclusion rule stays and the tower is flat (route A).");
  - the 2012 patents' forest rule, read as a checker rule, in a shadow only (`reviews/mie-probes/patents-forest-rule.md`); and the survey's note that Cecil, C#, Swift and Scala flatten the self-typed algebra (`reviews/mie-probes/literature.md`).
- **What it needs before you can decide.** It touches the specification, the library and both paths, so:
  1. A ways worker of the standard tier that has not read the record's notes lists every way the language and the library offer for the three families, and measures each on a shadow of the base: walk's verdicts on the interpreter tests, the distance, and both microGPT walk checks. P1's probe is the model; it wrote 7.0M tokens against a stated 0.5M, 0.39M of it real work and the rest rewritten context after long waits (`coordinator/process-engineering/p1-cost.md`), so its brief needs a bound on waits.
  2. A top-tier judgement on that list, in the nine-step form. The coordinator may run it without asking once the list is on file (POSITIONS, "The Fable rule.").
  3. Your answer, then a later batch.
- **Question for you now:** none. Batch 11 leaves the 30 out.

### Questions on file that this batch does not need

Each is yours, with its sites and where it is asked. None blocks batch 11; each adds sites to a later batch.
- Item 38: when the checker checks symbolic operators, and which device `String`'s four operator families take (row 585, 3 sites; row 611, walk's side).
- Item 42: `String`'s `left` and `right` (row 606, 2 sites).
- Item 43: the tuple comparisons and `LexicographicOrder` (row 634, 18 sites).
- Item 44: `QQ`'s `ceiling` and `truncate` (row 635, 2 sites).
- Item 45: a size or index read from a `Generator` (row 629, 9 sites).
- Item 46: `__bigOperator2`'s fused arm (row 632, 1 site).
- The negative power of an integer (row 441, with rows 438 and 445; PLAN, "Raised by climb batch 6's rung T, the number chapters"): 5 sites wait on it.
- Row 582, `isLeftZero`: the count's one error, 2 sites of the distance.
- Row 631, `embiggen`: its typed form changes a declared type in the team's test `ProjectFortress/tests/WordCountSmall.fss:76`, a team test line (1 site).
- D5's reach (batch 9's rung W's decision D5: under walk a lone type parameter whose bound mentions another static parameter keeps the arguments' common supertype where the chapter gives the bound) and row 591's entry (walk has no intersection type, so a parameter with two bounds it cannot meet stays at `Bottom`) (PLAN, "Climb batch 9, listed for his review"): rows 612 and 616 wait on them.
- Row 615's reading of "overridden" (walk counts as not inherited only what a type's own `override` declarations override) and decision W2 (batch 10's rung W: the traits chapter's clause on equal parameter types read at the same self position) (PLAN, "Climb batch 10, listed for his review"): as landed; rung W's row 614 repair follows the landed reading.

## 3. The rungs

Line numbers are on `ec718967a`. Site counts are by reading the landed per-site list, not predictions. Each rung's tests come first: written, run through the harness on the base and seen failing, and committed alone before the edit. A value that matters is asserted inside the test (POSITIONS, "The suite's verdict is the check.").

### W. Walk: a parameter whose bound names itself left open (under Q1), a trait's override, and object expressions under the Meet Rule

**The answers this rung follows.** The curator's answers on record (POSITIONS, "The order of the work after batch 10."): Q1 yes, way 11, so every paragraph and bullet marked "under Q1" applies. Where this section says "you" or "your", it means the curator.

**Rows.**
- Under Q1: row 424's F-bounded half closes. One new row opens with its expected failure: an empty unwritten reduction over a type other than `ZZ32` gets `ZZ32`'s identity. Notes: row 628 unblocked for a later library rung; row 555's F-bounded form unchanged (there the arguments fix `T`); D2's entry gains the open candidate.
- Always: row 614 (walk runs a declaration that a trait's `override` declaration overrides: with `trait W extends S` overriding `S`'s `tag` and `dot`, `object Wo extends W` runs `S`'s; the row's fix drops overridden inherited declarations when a trait's members are gathered) and row 618 (walk does not check an object expression that provides two overlapping functional methods with no declaration on their meet, `object extends { A, B } end`, and runs one of them; its load check visits declared traits and objects only, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1206-1213`; the checker's half of the same rule is row 570, section 4).

**Distance classes.** None. The count and distance stages do not read walk (FACTS, "The checker-count and distance stages read only the compiler's phases …"). What moves is walk: under Q1, the five red examples of `ant testSpecData` (FACTS, "`ant testSpecData` runs 130 of the specification's 133 extracted examples …"), the smoke test, and by the probe 14 of the 18 team demos (`P1.md`).

**Files.** Under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`:
- under Q1, the probe's `plan-9/probes/P1-open.patch`, re-read on this base (the judgement, section 3): `EvaluatorBase.java` (`instanceOf`'s F-bounded block), `types/BottomType.java` (the open type), `types/FType.java` (the `subtypeOf` fallback), `Evaluator.java` (three checks) and `LHSEvaluator.java` (one check);
- row 614: where walk gathers a trait's members, named in the rung's report;
- row 618: `BuildEnvironments.java` (`checkFunctionalMethodMeets`), `values/OverloadedFunction.java` (`FunctionalMethodMeets`) and where walk builds an object expression's type;
- new and promoted files in `ProjectFortress/tests/`.
- Not: the library, the checker, the test harness.

**Tests, first.**
- Under Q1 (the judgement, section 3): `ProjectFortress/tests/XXXUnwrittenSumRungF.fss` promoted to a name by topic (`emptySum(0)` is 0, `SUM[j <- 0#4] j` is 6, `PROD[j <- 1#3] j` is 6). One new test of the open parameter, every value asserted: `SUM[j <- 0#4] (j / 2.0)` is 3.0; `PROD[j <- 1#0] j` is 1; `BIG MIN[j <- 0#4] (j - 2)` is -2 and `BIG MAX` 1; a set comprehension bound to a variable declared `Set[\ZZ32\]`, and its size; `mk()` of an F-bounded `mk[\T extends Cmp[\T\]\]` and its result used; `"ab.c".upto('.')`. One new expected failure for the empty reduction, `emptyRSum(0)` asserted to be 0.0, with its new row. `BIG MINMAX[i <- 0#4] i` measured first, then gated as a plain test or an expected failure.
- Row 614: `ProjectFortress/tests/XXXOverrideInTraitWalk.fss` promoted.
- Row 618: `ProjectFortress/tests/XXXFunctionalMethodMeetObjectExpressionWalk.fss` and its `.test` key promoted, the refusal at load named (`load_exception_contains=Invalid overloading of pick`).
- Keep their verdicts: the team's `simpleSum.fss`, `setSum.fss` and `disp0.fss`; `FunctionalMethodOverrideOtherPathWalk.fss` (row 615's pin); the expected failures of rows 591, 592, 612 and 616, and without Q1's yes `XXXUnwrittenSumRungF.fss`.
- After the edit: the interpreter suite once. Under Q1, `ant testSpecData` once, and R10's read (R10 is your decision that the team's demos are not respelled, "Let's not touch them"): the 18 demos and `explorations/claude_demo.fss` each run once under walk, the verdict and first error line reported, none edited (POSITIONS, "The team demos that write no static argument for a generic reduction").

**Specification.** Under Q1, as the judgement words it (section 3): the interpreter's box in "The Static Arguments of a Call" (`Specification/basic/inference.tex:276-300`), the revision note on reductions (`Specification/basic/expressions/reductions.tex:27-44`), and their Appendix I entries "Reductions whose element type nothing fixes" (`Specification/appendices/changes.tex:1004`) and "The inference of a call's static arguments" (`:1575`), its interpreter sentences. Rows 614 and 618: none found; no passage names either row, and the Meet Rule's text already covers object expressions (`Specification/advanced/overloading.tex`, section "Meet Rule").

**Overlaps by file.**
- No other rung edits walk.
- `ProjectFortress/tests/`: L adds distinct files.
- `Specification/basic/inference.tex`: E edits the same file at other passages (W the interpreter's box, `:276-300`; E the context list, `:128-136`, and the "not yet described" item, `:254-258`), more than a hundred lines apart.
- `Specification/appendices/changes.tex`: W amends the two entries the judgement names; E writes an entry of its own (E's section), so no two rungs edit one entry.

**At the landing, under Q1.** The walk example of the skill returns to `explorations/claude_demo.fss` (PLAN, batch 11's line; now the skill's `references/interpreter.md:43`), at your word to the skill writer.

### C. The checker: overloading, export, a crash in the disambiguator, and row 463's tests

**The answers this rung follows.** The curator's answers on record (POSITIONS, "The order of the work after batch 10."): Q4 yes, way 1, so rows 620 to 622 are this rung's and every line marked "under Q4" applies.

**Rows.**
- Row 610: the checker reads every functional method a supertype declares as provided, so it refuses the team's `tests/disp0.fss` and any `override` that widens a parameter. Fix area: `STypesUtil.gatherMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1602-1620`) and `OverloadingChecker.toFunctionalMethodArrows` (`scala_src/typechecker/OverloadingChecker.scala:135-157`).
- Row 617: the per-provider cover counts the self position; the fix gives `coversOverlap` the arrows without self (`OverloadingChecker.scala:618` against `:587-589`).
- Row 619: an overloaded dotted method whose single parameter is written bounded by `Any` is accepted and the run dies with `ClassCastException`; `checkBoundAny` (`OverloadingChecker.scala:487-493`) refuses only the top-level form.
- Row 625: a renamed parameter's bound is left naming the object's parameter; the fix renames every own parameter's bound in `domainApart` (`scala_src/typechecker/AbstractMethodChecker.scala:141`) and `ownStaticParamsApart` (`OverloadingChecker.scala:200`) together.
- Row 637: the export check requires an api declaration for a component trait's private abstract method; the fix skips private members in `allAbstractsMadePublic` (`scala_src/typechecker/ExportChecker.scala:746-758`).
- Row 626: a `typecase` arm naming with static arguments a type the library does not declare crashes the checker, "Not in the trait table"; the fix reports the undeclared name in the disambiguator (`ProjectFortress/src/com/sun/fortress/compiler/disambiguator/TypeDisambiguator.java:234-238`, `:376-380`).
- Row 463, tests only: the compiled path refuses a generator binding as an `if` or `while` clause, "Variable __cond is not defined", where walk runs it. The fix, declaring `__cond` in the compiler's prelude, is ruled out (POSITIONS, "The library route."), so the tests are its home until the switch-over (PLAN, review-routed.1, the item batch 10's merged-diff review routed to the next rung that owns `compiler_tests/`).
- Under Q4: rows 620 to 622.

**Distance classes.** X1, 1 site: `List.fss:12`, the export check (row 637). The other rows have no site on the one library; their programs are tests. Under Q4 the three crash rows become three refusals and what lies behind them stays hidden, so the distance may rise by about 3.

**Files.** `scala_src/useful/STypesUtil.scala` (`gatherMethods`); `scala_src/typechecker/OverloadingChecker.scala`, `AbstractMethodChecker.scala`, `ExportChecker.scala`; `compiler/disambiguator/TypeDisambiguator.java`; under Q4, the files the trace names among `nodes_util/NodeUtil.java:339`, `scala_src/typechecker/staticenv/STypeEnv.scala`, `scala_src/typechecker/STypeChecker.scala` and `compiler/StaticChecker.java`; new and promoted files in `ProjectFortress/compiler_tests/`. Not: the library, walk, the checker's inference (E's).

**Tests, first** (each through `junit.sh` on the base):
- Promoted to plain names by topic, each with the key that the fix makes right: `XXXOverrideFunctionalMethodWiden` (610; `disp0`'s program compiling and printing, as batch 10's record asked, `run_out_contains=f PASS`), `XXXFunctionalMethodMeetCoverWithoutSelf` (617; compiles), `XXXOverloadDottedSingleParamBoundAny` with `OverloadDottedSingleParamBoundAnyLink.test` (619; refused with the restriction's message), `XXXInheritedAbstractMethodBoundSameName` (625; compiles), `XXXTypecaseUndeclaredType` (626; refused with the disambiguator's message, not crashing), `XXXExportPrivateAbstractMember` (637; compiles).
- Row 463: two new expected failures over the compiler library's `Maybe` and `Just` (`Library/CompilerLibrary.fsi:223-224`), one per clause, keyed `compile_err_contains=` on "Variable __cond is not defined" and "Variable __whileCond is not defined.", each shown through `junit.sh`, both named in the row.
- Under Q4: `XXXLocalFunctionUntypedParam`, `XXXLocalFunctionUntypedParamAndReturn` and `XXXLocalFunctionUntypedParamInLoop` become refusals keyed on "Missing parameter type for".
- Keep their verdicts: batch 10's `InheritedAbstractMethodStaticParamSameName`, `InheritedAbstractOperatorTraitParamSameName`, `FieldBesideInheritedGetter`, the Meet Rule and coverage tests; the ladder's 85 files.
- After the edit: the compiler and library test tracks once; the count and distance stages once.

**Specification.** A grep of `Specification/` for these rows' numbers finds none. Appendix I's entry "The implicit bound of a type parameter" already says the checker applies the restriction to a bound written `Any` (`Specification/appendices/changes.tex:2202-2203`); row 619's fix makes that true of dotted methods, so the text stays. Under Q4: a callout at `Specification/basic/components/type-inference.tex:44-45` and a new Appendix I entry, naming row 405's top-level refusal as well.

**Overlaps by file.**
- `STypesUtil.scala`: E too, if row 627's trace leads there; different declarations.
- `ProjectFortress/compiler_tests/`: E adds distinct files.
- `Specification/appendices/changes.tex`: under Q4, a new entry of C's own.

### E. The checker: the expected type the text gives (item 36), and a method's own static parameter at a method call (row 627)

**The answers this rung follows.** The curator's answers on record (POSITIONS, "The order of the work after batch 10."): Q2 yes to both parts, so all four contexts are this rung's, the `typecase` branch by the union rule (way 1), and every line marked "under Q2" applies.

**Rows.**
- Row 560's second part (item 36), 13 sites. Without Q2's first part, all 13 wait; without its `typecase` part, 3 stay with the row.
- Row 627, 6 sites: at a method call, a generic method's own static parameter captures the caller's parameter of the same name, so `g.mp[\(ZZ32,G)\](…)` inside `pairUp[\G\]` is refused and the same body with the caller's parameter named `H` checks. Its siblings at two other sites, rows 561 and 563, are fixed; the row's fix renames the method's own static parameters before substituting, as `OverloadingChecker.scala:181-202` does for row 561. The site of the substitution is not located.

**Distance classes.** All 19 are `OT`, by reading `classify.py`'s rules against the messages (`explorations/coordinator/tools/distance/classify.py`, `RULES`): none matches them.
- Item 36, an `if` without `else`: `Library/FortressLibrary.fss:295`, `:300`, `:305`, `:323`, `:4403`; `Library/RangeInternals.fss:157`, `:158`.
- Item 36, a block's last expression after a local declaration: `FortressLibrary.fss:2083`; `Library/List.fss:458`.
- Item 36, a loose juxtaposition: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:35`.
- Item 36, a `typecase` branch (under Q2): `FortressLibrary.fss:1094` (`Contains`'s `MATCH`), `:3974` (`FullRange.narrowToRange`); `Library/String.fss:431`.
- Row 627: `FortressBuiltin.fss:587` (`Boolean`'s `cross`); `List.fss:94`, `:103`, `:106` (`app`, `addL`, `addR`); `FortressLibrary.fss:1417` (`Condition`'s `cross`), `:1516` (`Just`'s `cross`).

**Files.** `scala_src/typechecker/impls/Misc.scala` (the `if` without `else` at `:582`, the block at `:411-421`, the `typecase` at `:657`); `impls/Operators.scala` (juxtaposition, `:76-100`); `impls/Functionals.scala` (the method call at `:946`) and the file where the trace finds row 627's substitution; new and rewritten files in `ProjectFortress/compiler_tests/`. Not: the library, walk, the overloading checker (C's).

**Tests, first.**
- Item 36: `compiler_tests/XXXInferResultOnlyNoContext`, which pins the refusal of an `if` without `else`, rewritten as a passing test by topic. One new test by topic for each other context, a program the text allows and the base refuses: a block whose last call follows a local declaration; a loose juxtaposition (the split of `XXXInferContextDrops`, next); under Q2, a `typecase` branch. `compiler_tests/XXXInferContextDrops` holds a loose juxtaposition (`wrapV 3`) beside two calls passed as arguments of another call (`takesBox64(wrapT(3))`, `takesBox64(mk())`), a context outside item 36's four, which the inference chapter lists as not yet described (`inference.tex:254-255`) though batch N's rung I read `var-ref.tex:35-40` as settling it too (`compile-ladder/rung-inference-checker/REPORT.md:461`): split it, the juxtaposition a passing test by topic, the two arguments kept as an expected failure under row 455, not E's to clear.
- Row 627: `compiler_tests/XXXMethodStaticArgReceiverSameName` promoted.
- Keep their verdicts: the inference tests of batches N, 8 and 10, `InferDependentBound` and `InferBigOperatorUnwritten` among them; the ladder's 85 files.
- After the edit: the compiler and library test tracks once; the count and distance stages once.

**Specification.** In the inference chapter, the list of contexts with an expected type (`Specification/basic/inference.tex:128-136`) gains the three contexts, and under Q2 the `typecase` branch; the "not yet described" item (`:254-258`) loses them; a new Appendix I entry of E's own, in the S1 form, records the change with its reason, the two lists' original sentences and row 560. E does not edit the entry "The inference of a call's static arguments" (`changes.tex:1575`), which W amends. Row 627: none; no passage names the capture.

**Overlaps by file.**
- `inference.tex`: W, other passages; `changes.tex`: W amends two existing entries, E adds one of its own (W's section above).
- `STypesUtil.scala` with C, if row 627's trace leads there; different declarations.
- `ProjectFortress/compiler_tests/`: C adds distinct files.
- No edit overlap with L, but two of E's sites sit in L's sections (`RangeInternals.fss:157-158` in `ScalarRange.check`; `FortressLibrary.fss:3974-3980` in `FullRange.narrowToRange(other: Range[\I\])`, whose sibling overload `narrowToRange(other: OpenRange[\I\])` at `:3973` is row 599's site and L's): L leaves those two declarations alone, and the gate measures both rungs on the merged tree.

### L. The library: the ranges under your answers to items 39 to 41, and three slips

**The answers this rung follows.** The curator's answers on record (POSITIONS, "The order of the work after batch 10."): Q3 takes the recommended readings, item 39 way (a), `BoundedRange2D` and `BoundedRange3D`; item 40 way (a), the bodies moved to the `ZZ32` kinds of rank 1 to 3; item 41 way (a), the bounds' order repaired so that `|#(0,3)|` is 0 and the declared types widened to `RangeWithExtent[\...\]`. So the rung runs, and every line marked "under Q3" or "under item 41" applies, the value change of item 41 among them. Where this section says "you" or "your", it means the curator.

Runs only if you answer Q3. Without it, rows 633 and 638 wait for batch 12's library rung, with row 628.

**Rows.**
- Under Q3: rows 599 (item 39), 600 (item 40) and 601 (item 41), as section 2 gives them.
- Row 633: three getters invoke the getter `indices` with `()`, against "A getter method must be invoked with the field access syntax" (`Specification/basic/traits.tex`, section "Method Declarations"): `Library/Set.fss:154`, `Library/PrefixSet.fss:478`, `Library/CaseInsensitiveString.fss:27`. The repair is `s.indices`.
- Row 638: the bare constructor `throw ForbiddenException`, not an exception value, at `Library/QuickCheck.fss:743`, `:757`, `Library/Reflect.fss:376`, `:380` and `Library/ReflectiveQuickCheck.fss:181`, and as type witnesses in the revival's `ProjectFortress/tests/InferUnfixedBoundWalk.fss:8` and `XXXInferSeveralBoundsWalk.fss:10`. The repair is batch 10's rung N's for `FortressLibrary`'s two: `ForbiddenException` with its chain.
- A correction to row 638: of the three tests it calls the revival's, `ProjectFortress/tests/QuickCheckTest.fss:39` is the team's (the file since 2010 by `git log --follow`; the line a boundary commit of 2012-07-19 by `git blame`), not the revival's; the row's text and PLAN's batch-10 line on row 638 say "three revival tests", and are the coordinator's to correct. L leaves that line; it is a witness never called.

**Distance classes.** Under Q3, up to 36 sites: row 599 15, row 600 18, row 601 3 (their lines at `fa14a190c` in `compile-ladder/rung-range-meets/REPORT.md` section 6). The stage files them under `RG`, `I1` and `OT`, by line ranges that are stale (row 577), so the rows, not the classes, are the measure. Rows 633 and 638: none; the stages do not read those components.

**Files.**
- Under Q3: `Library/RangeInternals.fsi` and `.fss`, but `ScalarRange.check` (E's sites); the ranges section of `Library/FortressLibrary.fsi` (`:2154-2411`) and `.fss` (`:3796-4172`), but `FullRange.narrowToRange(other: Range[\I\])` (`:3974-3980`, E's site); the sibling overload `narrowToRange(other: OpenRange[\I\])` at `:3973` is row 599's and L's.
- `Library/Set.fss`, `Library/PrefixSet.fss`, `Library/CaseInsensitiveString.fss`; `Library/QuickCheck.fss`, `Library/Reflect.fss`, `Library/ReflectiveQuickCheck.fss`; the two revival test witnesses above; new tests in `ProjectFortress/tests/`.
- Not: any other section of `FortressLibrary`; the checker; walk; the team's test lines.

**Tests, first.**
- Row 599 under item 39: one new walk test of the two runs that stop today, `((0,0)#).every(-1,-1)` and `((5,5)#).flip().forward()`, each value asserted, failing on the base.
- Rows 599 and 600: the count and distance stages are the failing-then-passing test, before from batch 10's landed tables, after once on the rung's tree, read by row. Beside them, one walk test calling each repaired body with today's value, passing before and after.
- Row 601 under item 41: if you allow the value change, the two pins of today's values in the revival's `ProjectFortress/tests/RangeDeclarations.fss:112-113` (batch 9's rung R, `631fb867e`) change to the new values, each with its before and after listed for you; if not, they stay.
- Rows 633 and 638: one walk test calling `indices` on a `Set`, a `PrefixSet` and a `CaseInsensitiveString` with today's values, passing before and after. Row 638's throws are reached by no gated program, by the row's reading, so the row stays their record.
- After the edit: the interpreter suite once, since walk reads the library.

**Specification.** Under Q3: none found. The text describes no range of rank 2 (rung R's report, section 6), and Part IV of the specification is rendered from the api files, so new api types reach it when the PDF is rebuilt. Rows 633 and 638: none; the edits make the library agree with the getter rule and with `Specification/basic/expressions/throw.tex`, section "Throw Expressions".

**Overlaps by file.**
- No other rung edits the library.
- `ProjectFortress/tests/`: W adds distinct files; L edits two witness lines in files W does not touch.
- E's two sites inside L's sections (E's section above).

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung of the same batch (PLAN, "The principle for the batches"). W is walk's, C and E the checker's in separate files (but perhaps `STypesUtil.scala`, at different declarations), L the library's.
- Where they meet only in a measure: E's checker change and L's library change both move sites in the ranges' sections, and W's walk change and L's library change both reach the interpreter tests. The gate measures and runs the merged tree.

## 4. What the batch leaves out, each with its home

- **The arrays, about 95 sites** (the stage's three array classes V1, V2 and Z1, 71 among them, the array support section's and `FortressLibrary`'s two export errors): the array questions after the switch-over (your answer to batch 8's Q4; PLAN item 15 and phase 5).
- **The self-typed bodies, 30 sites:** a ways worker, a top-tier judgement, your answer, a later batch (Q5).
- **The ranges, 36 sites,** unless you answer Q3: items 39 to 41.
- **Your other open items, 43 sites:** items 38, 42 to 46, the negative power (row 441), `isLeftZero` (row 582) and row 631's team test line, section 2's last list.
- **Row 628, 13 sites:** the reductions' `simpleJoin(a: Any, b: Any)`, `AnyMaybe` and `lift(r: Any)` typed at their element type. It needs walk's open parameter to keep the reductions running, so it is batch 12's library rung, after W lands (the P1 judgement, section 3, "The records"; row 628).
- **`where` clauses, 12 sites:** row 433 (6), row 636 (4), row 630 (2; the specification's `HasIdentity`), with `Maybe`'s bare `Nothing` (POSITIONS, "`Maybe`'s empty case"); no batch named (PLAN, phase 3, the `where`-clause line).
- **Row 425, 4 sites:** the checker's rewriting of a reduction by its element type, `SUM[\N\]`, a checker project before the switch-over, not a rung (the P1 judgement, section 5).
- **Rows 612 and 616:** D5's question and row 591's (PLAN, batch 11's line).
- **D2's case,** a big operator's plain-bounded parameters left at `Bottom`: the next walk rung, after a first measurement and your word on D2's entry (the P1 judgement, section 5).
- **Row 555's F-bounded form:** stays open with its row; there the arguments fix `T`, and the question is walk's join (the P1 judgement, section 5).
- **The compiled path's varargs:** the refusal under the compiled library goes with the switch-over (row 604's entry); code generation is row 624, phase 5.
- **Row 570, the checker's half of row 618:** the compiled overloading checker checks no object expression per provider, so the pair that W's row 618 repair makes walk refuse at load still passes the checker; code generation stops on every object expression first (row 375), so no compiled program runs it. Its fix needs the trait table to hold object expressions, or the team's plan of lifting them into named objects (row 597's checker note); PLAN names no rung for it (batch 8's list only). A checker defect, not a code-generation row.
- **Phase 4 and 5 work:** the natives rungs, Q-walk (walk's half of the numeral switch), the code-generation rows (559, 564, 565, 566, 571, 573, 594, 624), the compiled dispatcher's return type (PLAN, phases 4 and 5).

**What PLAN gives batch 11, and where each goes** (PLAN, phase 3 item 9):
- P1's judgement: W, under Q1.
- Rows 610, 617, 619 and 625, "the next checker rung": C.
- Row 638, "the next library rung's slips": L, under Q3; else batch 12.
- review-routed.1, row 463's owed compiled tests: C.
- Rows 612 and 616: out, waiting on D5's and row 591's entries.
- `classify.py` by declaration: not built; this record does not depend on it (section 1, "Before the batch runs").
- The walk example back to `explorations/claude_demo.fss`: at W's landing, under Q1.

## 5. How it is run

The batch runs on the redesigned workflow: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. In short: each rung's worker does the rung test first; its skeptic checks it and fixes what it finds, test first, and a judge rules only on a fix the skeptic marks contested or on a rung the skeptic cannot fix; the gather lands the rungs on `main` and folds their record lines, their ledger rows through `coordinator/tools/ledger.py`, and their entries for the skill's part on the revival's changes; the merged-diff review and the gate run side by side, then a cold reader reads the skill text the batch added; the commit stage lands the gate's tables, runs the microGPT walk check and pushes. Section 3 is each worker's brief word for word, with the answers line it opens with; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-11/manifest/gen11.py` reads with the briefings of `lists11.py` beside it.

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the checker count and the distance are the rung's failing-then-passing test, before from batch 10's landed tables (`compile-ladder/climb-batch-10/gate/`, `compile-ladder/gate/distance-sites.tsv`) and after once on the rung's tree. "Joins the gate" names a step the gate gains once the rung lands. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands (POSITIONS, "Reversible stops do not hold a batch."); only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### W
- **slug:** `rung-walk-open-param`
- **worktree:** `/home/user/fortress-walkopen`
- **expected minutes:** 110
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** `testSpecData`
- **blurb:** walk leaves open an F-bounded type parameter that nothing at a call fixes (Q1, way 11; row 424's F-bounded half), so the unwritten `SUM`, the specification's five red examples and the smoke test run; walk stops running a declaration a trait overrides (row 614) and checks the Meet Rule on object expressions (row 618); the inference chapter's box on walk and the reductions note in the S1 form; Java under `interpreter/evaluator/`.
- **points to report:**
  - An interpreter test whose verdict changes other than by the rung's intent: each with its before and after.
  - A library type or a team test that walk now refuses at load.
  - A change to which declaration walk runs for a set it loads today, beyond the overridden declarations of row 614.
  - Each place a program can now print the open type `OPEN`.
  - The empty unwritten reduction over a type other than `ZZ32` that gets `ZZ32`'s identity: its new row and expected failure.
  - Each of the 18 demos and the smoke test, its verdict and first error line.
  - A team test line changed or a demo edited.
  - Normative text changed beyond the passages section 3 names.
  - A library, checker or test-harness edit.

#### C
- **slug:** `rung-checker-overloading`
- **worktree:** `/home/user/fortress-checkover`
- **expected minutes:** 120
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **blurb:** the compiled checker stops refusing four valid programs and accepting one invalid one (rows 610, 617, 625, 637; row 619), reports an undeclared type in a `typecase` arm instead of crashing (row 626), and gains row 463's two owed tests; under Q4 (yes, way 1) a local function whose parameter type is left out is refused with "Missing parameter type for" instead of crashing (rows 620 to 622), with a callout and an Appendix I entry; Scala under `scala_src/` and Java in `compiler/disambiguator/`.
- **points to report:**
  - A compiled test whose verdict changes other than by the rung's intent.
  - A program the text allows that the checker now refuses, or one the text refuses that it now accepts, outside the rung's rows.
  - A crash repaired by catching it without the error the text gives.
  - Each error the three refusals of Q4 uncover behind the crash rows, with its site.
  - Normative text changed beyond Q4's callout and its entry.
  - A library or walk edit, or a declaration added to the compiler's prelude.

#### E
- **slug:** `rung-checker-expected-type`
- **worktree:** `/home/user/fortress-expected`
- **expected minutes:** 100
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **blurb:** the compiled checker passes the type the text gives into an `if` without `else`, a block's last expression after a local declaration, a loose juxtaposition and a `typecase` branch (item 36 under Q2, row 560's second part, 13 sites), and keeps a method's own static parameter apart from the caller's at a method call (row 627, 6 sites); the inference chapter's two lists and an Appendix I entry of its own; Scala under `scala_src/typechecker/`.
- **points to report:**
  - A compiled test whose verdict changes other than by the rung's intent.
  - A program the text allows that the checker now refuses, or one the text refuses that it now accepts, outside item 36's four contexts and row 627.
  - The argument face of `XXXInferContextDrops` (row 455) cleared or changed.
  - Normative text changed beyond the inference chapter's two lists and the rung's own Appendix I entry.
  - A library or walk edit.

#### L
- **slug:** `rung-range-types`
- **worktree:** `/home/user/fortress-ranges`
- **expected minutes:** 90
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **blurb:** the one library's ranges under Q3's answers: `BoundedRange2D` and `BoundedRange3D` (item 39, row 599), the generic bodies' comparisons moved to the `ZZ32` kinds (item 40, row 600), the bounds' order repaired and the declared types widened (item 41, row 601), up to 36 sites; three getters called without `()` (row 633) and five `throw ForbiddenException` given their argument (row 638); library declarations only.
- **points to report:**
  - A value walk prints that changes, each with its before and after: item 41's `|#(0,3)|` from 1 to 0 and the two pins in `ProjectFortress/tests/RangeDeclarations.fss:112-113` among them, and any other.
  - A new api type beyond `BoundedRange2D` and `BoundedRange3D`, or a team declaration removed.
  - A declaration of E's two sites edited (`ScalarRange.check`; `FullRange.narrowToRange(other: Range[\I\])`).
  - A team test line changed.
  - A checker or walk edit, or a site whose only repair is a checker change.

### What every agent of the run reads first

This run is climb batch 11, the record `CLIMB-BATCH-11.md`, phase 3's next batch after 10, toward the checker at a true zero: one walk rung, two checker rungs and one library rung, each at the answers on record to the record's questions Q1 to Q4. The distance stands at 253 and the count at 1 after batch 10 (`compile-ladder/climb-batch-10/gate/`). The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another rung of the batch. W edits walk alone, C and E the checker in separate files (both may touch `STypesUtil.scala` at different declarations), L the library alone; W and E edit `Specification/basic/inference.tex` at passages more than a hundred lines apart; in `Specification/appendices/changes.tex` W amends two entries and C and E each write an entry of its own; `ProjectFortress/tests/` takes W's and L's distinct files, `ProjectFortress/compiler_tests/` C's and E's. E's checker change and L's library change both move sites in the ranges' sections, and the gate measures both on the merged tree.

### Before the launch

The coordinator, in this order:
1. The redesigned script, its manual and this manifest on `main`, and the skill's rewrite landed with its part on the revival's changes, `.claude/skills/fortress-repo/references/revival-changes.md`; the batch's base is `main`'s head after both, its full hash, passed as `args.base`. The run's gather folds each landed rung's entry into that part; if the part is not there at the base, the gather lists the entries for the coordinator instead.
2. The base build, as the manual's "Before the launch" gives it: `git -C /home/user/fortress worktree add --detach /home/user/fortress-base11 <base>`, `ant compileAll` in it, the library order, one passing walk test, `git status --porcelain` empty; passed as `args.baseBuild`. One trial seed proves it (`coordinator/tools/seed-worktree.sh /home/user/fortress-base11 /home/user/fortress-seedcheck - <base>`, then `git -C /home/user/fortress worktree remove /home/user/fortress-seedcheck`), and one `coordinator/tools/old-fortress.sh /home/user/fortress-base11 /home/user/fortress-seedcheck-caches ProjectFortress/tests/BooleanOps.fss` run from the main tree proves the old code runs, its folder removed after.
3. The briefings checked on the base: `python3 explorations/compile-ladder/plan-11/manifest/lists11.py`, every key matching one place (they did on `cd2393a08`, with W 39.6K, C 28.8K, E 30.1K and L 18.5K tokens of briefing).
4. The block generated and spliced: `python3 explorations/compile-ladder/plan-11/manifest/gen11.py`, then `node explorations/compile-ladder/plan-11/manifest/check11.js`, which splices it into a scratch copy and checks it; then the same splice into the script itself (`check11.js --write`), `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. No launch value is set by hand: the batch's new ledger rows are numbered by the gather through `ledger.py add`.
5. `df -h /` against four seeded worktrees (about 206 MB each) and the base build; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`: batch 10's run of it was refused over an `rm -rf` the tool no longer has (`98ed1f5c1`).
6. Check-ins armed for the run's length, 45 minutes apart, and one after the session's predicted process stop (the `cloud-container` skill).

The launch: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of the base>', baseBuild: '/home/user/fortress-base11'}})`. The arguments are kept byte for byte in the session's scratchpad, since a resume needs them.

### The gate, and what it should show

The comparands are batch 10's `summary.txt`, `checker-count.txt` (1) and `distance.txt` (253), with `distance-sites.tsv`.
- `testSystem`: the comparand's sum (516) plus the files W and L add; a promotion moves nothing.
- `testFast`: the compiler track 1,043 plus the cases C and E add; the library track 86, the othercompiler track 263 and the misc track unchanged.
- `testSpecData`, a step the gate gains with W: every example green, the five of row 424 among them; its row is new in the summary and from this batch on every gate runs it.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move.
- The checker count and the distance: reported, never red. By reading, E clears 19 sites, L up to 36 and C one (row 637); Q4's three refusals may add about 3 errors and uncover more; W moves neither. The distance near 200, the count 1 (`isLeftZero`, row 582).
- A repair after the review or the gate reruns the gate only when it changed a path the gate reads (`ProjectFortress/` but test files, `Library/`, `build.xml`).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather, in the order it applies the rungs (its `RECORD.md` says which order and why); until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>` for its number (`NEW-W-1`), and the gather replaces every placeholder with the number `ledger.py` gives. Rows the rungs close (`ledger.py close`, after the rung's commit is on `main`): 424 (W, under Q1), 614, 618 (W); 610, 617, 619, 625, 626, 637, 620 to 622 (C); 560's second part and 627 (E); 599, 600, 601, 633, 638 (L), each as its test passes on the merged tree. Notes: 555, 628, 570 (W); 405 (C); 455 (E); 577 (L).

### After the landing

The coordinator: the landing report; the routing of every item for the curator into PLAN; FACTS consolidated; the walk example of the skill moved back to `explorations/claude_demo.fss` at the curator's word to the skill writer (section 3, W); row 638's note and PLAN's batch-10 line on "three revival tests" corrected (section 3, L); row 560's note against PLAN item 36 now that Q2 is answered; the combined post-batch review, which reports this batch's measures against batches 8 to 10 as `process-engineering/batch-redesign.md`, "The measures", defines them.

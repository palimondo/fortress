<!-- DRAFT, CONTENT ONLY. The record of climb batch 14, the next batch of the plan's phase 3, "the checker at a true zero", drafted 2026-10-13 by a planning worker for the coordinating session, the curator and the batch's workers, against `main` at `e019c094d`, whose `Library/`, `ProjectFortress/`, `Specification/`, `Documentation/`, `build.xml` and `bin/` are byte for byte those of `d96bc7776`, climb batch 13b's gate commit (`git diff --stat d96bc7776 HEAD` over those paths is empty), so 13b's landed tables describe this base. It says what the batch changes, why, and what the curator reviews after it; it launches on his standing go for phase 3 (the `coordinator` skill's `references/batch.md`, "The go"), so its one question takes its recommended default and is listed for his review, the default reversing no decision of his. Section 5 holds the manifest's fields, which `explorations/compile-ladder/plan-14/manifest/gen14.py` reads. Sources: PLAN.md, "The principle for the batches" (the method), phase 3 items 11 and 12 (batch 13's line with the rows under it, batch 14's candidates); item 47, item 51 and item 52 under "Pavol's answers"; "Climb batch 13, listed for his review"; climb batch 13b's landed tables (`compile-ladder/climb-batch-13b/gate/distance.txt`, `checker-count.txt`, `summary.txt`) and per-site list (`compile-ladder/gate/distance-sites.tsv`, 85 rows, committed by `d96bc7776`, its `#total` and its thirteen `#class` counts matching `distance.txt`), read site by site with `tools/distance/classify.py -v` and grouped by ledger row; `compile-ladder/climb-batch-13b/RECORD.md`; `reviews/batch-13-review.md` sections 1 to 3; the judgement `reviews/self-typed-bodies-judgement.md` with its measurement and patch, the POPL check `reviews/array-judgements-popl-check.md` (sections 5 and 7), the probe `reviews/argument-context-probe.md`, the note `reviews/popl2019-examples.md`, `reviews/walk-load-readings-check.md` through item 51; `review-queue.md`, items 1, 14, 17 and 33; POSITIONS.md and FACTS.md, cited by number; ledger rows read with `facts-extract.sh 'ledger:N'`; the library, checker, walk and `Shell.java` at the sites; the form of `coordinator/CLIMB-BATCH-13.md`. Nothing was built or run: no stage, no suite, no Fortress program. Two `git apply --check` runs, which write nothing, tested that the self-type patch and the argument-retry patch apply to `main`'s head. Counts are by row and line, never by class (row 577). One line per paragraph. Reviewed in place on 2026-10-13 by the top-tier review `coordinator/climb-batch-14-review.md`, on the curator's standing pre-approval of such reviews (the `coordinator` skill's `references/batch.md`, "The go"), against `main` at `b4fa3cd47`, whose commits since this draft (`77b59d7a2`) touch only `BOOT.md`, `review-queue.md` and POSITIONS, where P-146 records his answer to QS and P-147 his answer to item 51, both for the coordinator to fold; the review gives one reason per change, what it checked and found right, and what it weighed and left as drafted. -->

# Climb batch 14

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode.
- **The one library** is the interpreter's library (`Library/`, `ProjectFortress/LibraryBuiltin/`). At the **switch-over** the compiled path takes it over.
- **The distance** is the number of errors the checker reports on the one library. Each error has a **site** (a file and a line). This record counts sites by the ledger **row** that records their defect, not by the stage's classes. Phase 3 brings the distance to a true zero.
- **The count** is the older measure: the checker's errors on the one library until a component's first error stops it. It is 1: `__bigOperator`'s local `body(i)`, whose parameter has no type.
- A **row** is an entry of the gap ledger, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers".
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the skeptic. A **batch** is a few rungs, merged and tested together by the **gate** and landed at once.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. An **expected failure** is a test named `XXX...` that passes while the defect is there; when the fix lands it is **promoted**, renamed to a plain name.
- A **self-typed trait** is a generic trait whose parameter stands for the type that implements it: `trait Integral[\I extends Integral[\I\]\]`. The bound `I extends Integral[\I\]` is an **F-bound**: it names the parameter itself.
- The **self type** is the type the checker gives `self` inside such a trait. Today it is the trait, `Integral[\I\]`, so a body that returns `self` as an `I` is refused.
- An **extension** is a new declaration in the library. By your rule you judge each one, shown the library line it copies (`process-engineering/library-extension-rule-archaeology.md` §5 point 4).

### Where the distance stands

- After climb batch 13b the distance is 85 and the count 1 (`compile-ladder/climb-batch-13b/gate/distance.txt`, `checker-count.txt`; landed at `d96bc7776`). The per-site list is 13b's: 85 rows, the same `#total` and class counts.
- The 85 by what each group waits on, sorted site by site (`reviews/batch-13-review.md` section 1 gave the 105; 13b took 24 and brought 4):
  - 30, the self-typed bodies: 29 that way 6 clears, and `numerator`'s default at `:688`, which takes one body per integer type.
  - 27, the arrays: the two first factories, two errors each (row 685, 4); the norm's call (row 686, 1); 14 bodies typed by their parent trait; 3 sizes tested in a branch; 2 export errors; `Array2`'s 3 (row 678's 2, row 679's 1).
  - 12, your other open items: the integer power answering `RR64` 6 (rows 438, 441, 445), `String`'s operator pairs 3 (row 585, item 38), the list order 1 (row 634's list half), `__bigOperator2`'s fused arm 1 (row 632, item 46), `embiggen` 1 (row 631).
  - 12, the `where` clauses (rows 433, 636, 436).
  - 3, row 425; 1, row 488.
  - Hidden behind two crash rows: `__bigOperator`'s body (the count's error) and `Array3` (row 680), with its two calls of a size known only at run time.
- This batch reaches 31 sites:
  - S 29: the self-typed bodies, under QS.
  - L 2: `numerator`'s `:688` under QS, and `Array2`'s `offset` (row 679). It also tries to type `body(i)`, which would unhide `__bigOperator`'s body (no site by reading); by reading walk refuses the typed line (the count bullet below), and then L holds it.
  - A and P none: A's retry moved no site when measured, and P's files are ones the stages do not read.
- **The distance expected after the batch: about 54, the count 1.**
  - The count stays 1 by reading: with `body(i)` typed, the run goes on to `Array3`'s crash (row 680), which the shell reports as one error (`ProjectFortress/src/com/sun/fortress/Shell.java:978-996`). It shows the component's own errors only once row 680's crash goes too. F-53's "typing it raises the count toward the distance" holds then, not before.
  - By reading, walk refuses `body(i: I)` on every list or map comprehension written with a generator clause list: the desugarer passes the big operator with only the static arguments the program writes (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:405-408`), so `<| e | x <- g, ... |>` names `BIG <|[\T\]|>` (`Library/List.fss:178`) with none, walk leaves its plain-bounded `T` at `BottomType` (F-141, D2; `interpreter/evaluator/EvaluatorBase.java:143-147`, `:170`, `:181`), `__bigOperator`'s `I` takes it from the operator's type, and `BottomType` admits no value (`interpreter/evaluator/types/FType.java:108-113`). Today nothing checks an element against `I`. If L's walk check confirms it, L holds the line, the count's error stays `body(i)`, and typing it waits on your item 17 (`review-queue.md` item 17). The count is 1 either way.
  - With `body(i)` typed, the count stage checks the component past `:1311` for the first time. 13b's stage took 387 s against its 900 s limit, of which the component to `:1311` about 108 s (`perf-probes/checker-speed/REPORT.md` section 7); the rest is unmeasured. A run past the limit leaves the table without a total, which the gate reads red. L reports the stage's time.
  - Row 488's site at `:130` can move 2 to 4 errors either way (F-53).
  - The self-type rule was measured on batch 12's tree. This tree has batch 13's and 13b's checker changes on the same paths. S's own run is the first measure here.
- What is left then (54): the arrays 26, your other items 12, the `where` clauses 12, row 425's 3, row 488's 1.

### The rungs, two sentences each

- **S, the checker's self type.** In a trait with no `comprises` clause whose parameter is F-bounded by the trait, the checker types `self` in a method body as the trait and that parameter at once (`Integral[\I\] & I`), while each declaration's signature keeps the plain trait type; a second rule checks that whatever extends `Integral[\X\]` is an `X`. 29 sites go, the 29 library bodies unchanged; the specification gains the two rules in the S1 form; walk is untouched. By grep the second rule refuses four declarations that no stage or test reads: two of the team's mixins in `Containment`, a team demo's object and a `PureList` slip (section 3, S).
- **A, the checker's argument retry.** Your decision on item 48 (b) is built: when no declaration of a call fits, an argument that is itself a call with inferred static arguments is checked again against each declaration's parameter type. Row 455's two faces compile and run, row 535's pinned refusal becomes a passing test, and no site moves.
- **L, the library's loose ends.** `__bigOperator`'s `body(i)` gets its type unless walk refuses it, `Array2`'s `offset` takes `Array1`'s shape (row 679), each integer type gets its own `numerator` (under QS, four api lines for you to judge), and `IntMap`'s `SYMDIFF` with a one-entry map keeps all its entries (row 671). 2 sites go; the count stays 1, its one error at `body(i)` or, if that line lands, row 680's crash.
- **P, the POPL 2019 examples, tested.** The paper's and the talk's worked examples become tests, 7 green and 7 expected failures that gate rows 697 to 699 and the notes on rows 444, 373 and 537, and the No Duplicates Rule is restated on the non-strict relation (row 696). Walk computes a power in a size (row 676), with the note and the Appendix I sentence that say it stops corrected, and the walk test batch 13's review owes for row 693 is written.

### What the batch leaves out, and why (section 4 gives each home)

- Rows 685 and 686 (5 sites), 687, 689, 690, 680 (which hides `Array3`) and 691: none is traced to a fix. Each needs a trace first, named in section 4 with what it would decide.
- Row 695, the compiled run of a body that returns `self`: no repair traced. S writes its reproducer as an expected failure.
- The arrays' other 21: a list of ways first.
- Item 51 and rows 666, 668, 669 and 665's abstract half: your answer.
- Your other items (12 sites), the `where` clauses (12), row 425 (3), row 488 (1): as batch 13's record placed them.
- Rows 681, 673, 697's repair, 444's and 373's repairs, 700: later checker and walk rungs, or a measurement first.

### Before the batch runs

- This record and its generator on `main`, a top-tier review in place, the base build, the splice and the scenarios (section 5, "Before the launch").
- No probe. Both patches the rungs start from are measured (`reviews/self-typed-bodies-judgement.md`, "The measurement"; `reviews/argument-context-probe.md`) and apply to `main`'s head. Each rung's first measurement is its own test.
- QS takes its default unless you answer before the launch.

### Cost

- About 5.0M tokens written, from 4.9M if no fix is contested to 5.6M if two rungs go to a judge and one to a repair round. A red gate adds about 0.5M.
  - Workers about 1.9M: S 0.55M (a patch in hand, a rule to write, the text, the stages), P 0.5M (fifteen tests and the text), L 0.45M, A 0.4M.
  - Skeptics about 1.6M, at batch 13's 0.4M each.
  - The fixed roles about 1.36M: gather, merged-diff review, gate and commit at batch 13's figures; the cold read is gone (`reviews/batch-13-review.md` section 3).
- Four rungs at two agents at once: about 5 hours, against batch 13's 6 h 24 min for five.

## 2. Your questions, in the order they block the batch

**Taken on the standing go.** The one question below takes its recommended default, and the rungs build it. It is listed for your review: an answer the other way is reversible and loses only what the question names. The default reverses no decision of yours; it bends a reading of an earlier record, which it says. Your decisions on item 48 (b) and item 47 are built here and are not asked again.

### QS. The self-typed bodies (review list item 1)

**The question.** Should the checker read `self`'s type in a self-typed trait from the trait's F-bound, so that the team's 29 library bodies check as written?

**The context.**
- **Blocks:** rung S, 29 sites; rung L's four `numerator` bodies, 1 site.
- **Terms.** In `trait Integral[\I extends Integral[\I\]\]` the parameter `I` stands for the type that implements the trait. The checker types `self` there as `Integral[\I\]`, so 29 library bodies that return or pass `self` as an `I` are refused, in `Integral`, the two order traits, `AdditiveGroup` and `StandardMutableArrayType`. Walk runs them all. The team wrote these bodies in 2008.
- **The peers.** Scala's self type and Rust's `Self` give `self` the implementing type, with one check: whatever implements the trait at `A` must be an `A`.
- **What option 1 reads anew.** A reading of an earlier record, "no self type enters the library" (`CLIMB-BATCH-8.md:113`; `reviews/anyintegral-comprises-judgement.md` section 3). The library's text gains none, but the checker gives `self` one. Route A stands (P-43): no clause enters the library, and no type is identified with another. Your `comprises` decision stands (P-44): under a clause the self type is the clause's, and the new rule is never reached.
- **What the 2019 paper adds.** It has no self types, so it neither backs nor refuses the rules. It gives option 1's confinement its reason: its declared types hold no intersection, and its Return Type Rule compares declared domains (pp. 11:21-22, 11:13). S's decision record states this, the sentence the POPL check owes this record (`review-queue.md` item 33, sentence 4).
- **On file:** `reviews/self-typed-bodies-judgement.md` (top tier, "For Pavol"), its measurement and its 114-line patch; `reviews/array-judgements-popl-check.md` sections 5 and 7.1; `review-queue.md` item 1.

**The options.**
1. **A checker rule, way 6.** Rule (a): in such a trait with no `comprises` clause, `self` in a method body has type `Integral[\I\] & I`, while each declaration's signature keeps the plain trait type (the measured confinement; without it the checker reported 21 false errors at `CMP`). Rule (b): a type that extends `Integral[\X\]` must itself be an `X`. The checker and the specification change; the library and walk do not. Measured on a shadow: 29 sites gone, none new, no stall. One rung, S.
2. **The team's clause, `comprises I`, on seven traits.** The library, walk and the specification change, and walk's row 407 (a stack overflow on this clause) must be fixed first. Clears 29.
3. **A run-time `cast`** in 21 library lines. Clears 29, checked only when the program runs.
4. **Leave the 30.** They stay on the distance until the switch-over needs them.

Under 1, 2 and 3 the thirtieth site, `numerator`'s default, gets one body per integer type in `ZZ`'s shape (rung L, four api lines for you to judge).

**What a yes commits you to.** Rung S as section 3 gives it, and L's `numerator` lines. A compiled body that returns `self` still dies at class load (row 695), so S's compiled run test stays an expected failure until a code-generator rung repairs it. No walk value changes. A no costs the batch's 29 sites: rung S is dropped, and under 4 L's `numerator` lines too.

**Recommendation, the default: option 1, with the per-type `numerator`.**

### Answered, built here

- **Item 48 (b), the argument of a call** (P-51). Rung A applies the probe's wide patch: row 455's two faces compile and run, and `XXXInferContextDrops` and `XXXInferLoneUnionClosedTrait` turn plain, as P-51 names. P-49 settles the probe's third fork: a declaration that fits as written is never passed over.
- **Item 47, a local function's parameter left untyped is refused** (PLAN item 47, way 1; F-42). Rung L writes the type at the one library site left, `body(i)`.
- **The No Duplicates Rule on the non-strict relation** (row 696). It follows P-26: the 2011 paper and the 2019 paper state it so. The passage is the revival's own.

### Points the batch lists for you, not questions

- **An extension for you to judge** (library rule, point 4): `numerator(self): ZZ` declared on `ZZ32`, `ZZ64`, `NN64` and `NN32`, four api lines and four bodies, with `Integral`'s default body removed. The precedent is `ZZ`'s own line (`Library/FortressLibrary.fsi:672`, `.fss:999`).
- **Pins of the revival's tests changed**, each with its before and after:
  - `ProjectFortress/tests/IntMapSymdiffSingleton.fss:12-13` (L), two of today's wrong values.
  - `compiler_tests/XXXInferLoneUnionClosedTrait` (A), a refusal that becomes a passing run, as P-51 says.
- **The argument retry's three small forks**, built as the probe's patch has them (`reviews/argument-context-probe.md` section 6):
  - (2) a generic outer call whose static arguments only retried arguments fix takes its bound;
  - (4) an ambiguity the retry finds is refused with today's message;
  - (5) arguments that write their static arguments are retried too, to no effect.
- **The count after the batch.** It stays 1 by reading: its error moves from `body(i)` to row 680's crash in `Array3` if L lands the typed line, and stays at `body(i)` if walk makes L hold it. It reaches the component's errors only once both are repaired.
- **Under walk, `body(i: I)` checks each element** of every big operator and comprehension against `I`. By reading it refuses every list and map comprehension, whose `I` walk leaves at `BottomType` (section 1, the count). L checks that first with one walk program, then the interpreter suite. If walk refuses a call, L holds the line and names the program (section 3, L), and typing `body(i)` waits on your item 17.

### Questions on file that this batch does not need

Each is yours, with its home in section 4.
- Item 51, coverage and an inherited abstract method (`review-queue.md` item 14). Rows 666, 668, 669 and 665's abstract half wait on it.
- Unwritten reductions whose parameter has a plain bound (`review-queue.md` item 17). The walk rung on rows 645 and 662 waits on it, and by reading so does L's typed `body(i)`, which L then holds (section 1, the count). P's walk edit is row 676 only, in another file.
- Row 682's status word (`review-queue.md` item 33; the POPL check's section 7.2).
- Item 38 (row 585), item 46 (row 632), row 631, the integer power (rows 438, 441, 445); item 13's forks 4 to 6.
- The entries that hold rows 612, 616, 645, 662, 663, 661, 670, 650 and row 653's compiled half; rows 672, 674, 675 and 683 as landed.

## 3. The rungs

Line numbers are on `e019c094d`, whose `Library/`, `ProjectFortress/` and `Specification/` are those of `d96bc7776`. Site counts are by reading the landed per-site list, grouped by row and line. Each rung's tests come first: written, run through the harness on the base and seen failing, and committed before the edit. A value that matters is asserted inside the test (P-103).

### S. The checker's self type: read from a trait's F-bound, with its extender check (the self-typed bodies, way 6, under QS)

**The answers this rung follows.** The way for the self-typed bodies is not decided: this rung builds the judgement's recommendation, way 6 (explorations/reviews/self-typed-bodies-judgement.md, section 4, "The recommendation"), on the standing go, and it is on the review list as QS (section 2); every line of this section is under QS. The library's 29 bodies stay as the team wrote them in 2008, and the checker is brought to read them as walk runs them (P-27). Route A stands (P-43): no clause enters the library and no type is identified with another. The decision on comprises stands (P-44): the clause's text and walk stay as they are, and under a comprises clause the self type is the clause's, so rule (a) is never reached there. What the rung bends is a reading of an earlier record, "no self type enters the library" (explorations/coordinator/CLIMB-BATCH-8.md:113), which section 2 names; the library's text gains no self type. Rule (a) is confined to method bodies, as measured: a declaration's signature keeps the plain trait type. The type group's 2019 paper gives that confinement its reason, and the decision record states it: the paper's declared types hold no intersection at all (Lemma 5.2's assumption, pp. 11:21-22) and its Return Type Rule compares declared domains (p. 11:13), the two places where the unconfined rule made 18 false errors (explorations/reviews/array-judgements-popl-check.md, sections 5 and 7.1). A compiled body that returns self dies at class load (row 695), so the compiled run is an expected failure, not this rung's repair. Numerator's default at :688 is rung L's, under the same QS. Walk is untouched.

**Rows.**
- The 29 sites, no row of their own (S1's 28 and R4's 1; S1's twenty-ninth, :688, is rung L's), in four families, every one a body the team wrote: the two order traits, 16: StandardPartialOrder at Library/FortressLibrary.fss:226 (the call and its filter, two errors), :231, :233; StandardTotalOrder at :285 (two), :289, :290 (three), :291 (three), :293 (three, R4's tuple among them); AdditiveGroup, 2: :360, :363; Integral, 7: :691, :692, :693, :713, :722, :723, :724; StandardMutableArrayType, 4: :2182, :2186, :2190, :2194. The messages: "Function body has type Integral[\I\], but declared return type is I.", "Could not check call to operator < ... is not applicable to an argument of type (T, StandardTotalOrder[\T\])" and the filter cascade "Filter expressions in generator clauses must have type Boolean, but OpExpr at ... was not well typed".
- Rule (a), measured as a patch (self-typed-bodies-judgement.md, "The patch": 114 lines, +63 -4, against 7cb479984), which git apply --check accepts on this base with no offset. SelfParamDisambiguator.scala, the trait case (ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala:63-72): when a trait has no comprises clause and a static parameter bounded by the trait at its own parameters, the self type lists that parameter, so self is C[\X\] & X. The confinement: FunctionalMethod's index entry (ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java:43-58), which overloading, the Return Type Rule and call resolution read (scala_src/useful/STypesUtil.scala:161), gives the self parameter the plain trait type when the self type was read from the F-bound; a body's self is bound from the declaration's own parameters (scala_src/typechecker/impls/Decls.scala:198) and keeps the intersection. Apply the patch as measured, read it, and own it: the rung's tests, not the patch's history, are its proof.
- Rule (b), not yet built (judgement section 5, "Checker"; "Way 6", "Clears"): for each extended C[\A\] whose C has a self parameter at position k, the extending declaration's self type must be a subtype of A_k, with the error "D extends C[\A\], whose self parameter is A, but D is not a subtype of A"; the same for an object expression where its type is formed (STypesUtil.getObjectExprType, scala_src/useful/STypesUtil.scala:1949). Put it in a function of its own in scala_src/typechecker/TypeHierarchyChecker.scala, called beside checkDeclComprises (:60; the loop over extendsTypes at :207-261 shows the shape), editing none of checkDeclComprises. For the object expression, the precedent is the revival's checkObjectExprComprises in the same file (:66-100, aa07efb31), which already walks every object expression of a component with its static parameters in scope and forms its type from its extends clause.
- Rule (b) and the tree. The judgement's grep found every extender at itself; four declarations it missed extend a self-typed trait at another type, so rule (b) as P-146 words it ("A type that extends such a trait at another type is refused") refuses them: the team's mixins trait ContainmentBySubset[\T extends Containment[\T\]\] extends Containment[\T\] and ContainmentByComparison, the same (Library/Containment.fsi:22-23, :29-30; Library/Containment.fss:42, :57; Relation extends the first at itself, Library/Relation.fsi:17), whose parameter is the type that implements them but is not their own self parameter by rule (a); the team demo's object generator(...) extends StandardTotalOrder[\trip\] (ProjectFortress/demos/trips.fss:97-98); and PureList's trait List[\E\] extends { Equality[\E\], ZeroIndexed[\E\] } (Library/PureList.fsi:41), which Equality's bound already makes ill-formed. No stage, suite or compiled test reads any of them, so neither stage shows it. Build rule (b) as P-146 words it and edit none of them (the library and the demos are not this rung's); write a compile test of the mixin's shape, a trait whose parameter is bounded by a self-typed trait it extends at that parameter and an object extending it at itself, keyed on what the checker reports; list the four as a point to report.
- Row 695, a note: the compiled run of a default body that returns self as S dies with VerifyError: Bad return type (the judgement's "The compiled run of a body that returns self"). The rung gives the row its reproducer as an expected failure; no repair.
- Notes, not repairs: row 407 (walk's comprises T, untouched; under rule (a) no clause is needed); row 488 (the site at :130 went under the measured rule and has come and gone between landings: a point if it moves); row 577 (count by row and line).

**Distance sites.** The 29 gone; no site come. Measured on batch 12's tree: 153 to 123, the 29 gone, none new, no stall (judgement, "The measurement"). This tree has since gained batch 13's opening of sizes in TypeAnalyzer.scala, its bound lists in TypeSchemaAnalyzer.scala, 13b's memo on TraitTable and the array family's two-trait bound, so your stage run is the first on this tree. The regression to watch is the unconfined rule's 21: 18 Return Type Rule errors at CMP between StandardPartialOrder and StandardTotalOrder, and CMP bodies typed Comparison at :1004, :1930 and :4178 (their lines on batch 12's tree; find them by message). On your tree :688 stays, rung L's: its message becomes "Right-hand side has type (Integral[\I\] & {I}), but declared type is ZZ.", which classify.py files under OT, so S1 reads 0 and OT one more with no site come (the judgement, "Rule (a) alone"). The count stays 1.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/SelfParamDisambiguator.scala (the trait case, :63-72).
- ProjectFortress/src/com/sun/fortress/compiler/index/FunctionalMethod.java (:43-58 and the helper the patch adds).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala (a new function beside checkDeclComprises, called at :60), and the object expression's case beside checkObjectExprComprises (:66-100), or where its type is formed (scala_src/useful/STypesUtil.scala:1949, or its caller).
- Specification/basic/expressions/var-ref.tex (:53-70), Specification/basic/traits.tex (a passage for rule (b), beside the extends prose at :156-198 or the comprises passage at :235-276), Specification/appendices/changes.tex (a new entry before "Passages not yet revised", :3296).
- The rung's decision-record.md in its folder; new files in ProjectFortress/compiler_tests/.
- Not: the library (numerator is rung L's); the demos; walk; the overloading oracle and impls/Functionals.scala (rung A's); the code generator; the compiler prelude.

**Tests, first.** Each through junit.sh on the base.
- SelfTypeFromBound, a typecheck test: trait Shape[\S extends Shape[\S\]\] with twin(self): S = self, opr MINS(self, other: S): S = if other < self then other else self end and a (S, S) body, and an object Pt extends Shape[\Pt\] with its <. Seen failing on the base with "Function body has type Shape[\S\], but declared return type is S.", then passing.
- Row 695's reproducer: the judgement's probe, object Pt(t: String) extends Shape[\Pt\] with run printing twin(Pt("b")).tag, as F-103's pair, a plain link test and an XXX run test, failing as expected while the row stands; note the row with it.
- XXXSelfTypeExtenderWrong, a compile test: object Bad extends Shape[\Pt\], compile_err_contains the new message. On the base it reports "Saw wrong failure", since the base accepts it; after, the expected failure. Show it red once with Bad changed to extend Shape[\Bad\].
- SelfTypeExtenderThroughOwn, a typecheck test: trait Lex[\T extends Lex[\T,E\], E\] extends Shape[\T\] and trait Below extends Lex[\Below, ZZ32\], accepted; beside it XXXSelfTypeObjectExprWrong, an object expression extending Shape[\Pt\], refused.
- XXXSelfTypeMixinBound, a compile test of the mixin's shape (Rows, "Rule (b) and the tree"): trait Sub[\T extends Shape[\T\]\] extends Shape[\T\] with no body that uses self as T, and object Q extends Sub[\Q\], compile_err_contains the message rule (b) gives at Sub. On the base it compiles, so it reports "Saw wrong failure"; after, the expected failure.
- The confinement's test is the distance stage: a small program with two F-bounded traits whose subtrait narrows an operator's return type compiled clean even under the unconfined shadow (the judgement, "Rule (a) alone"), so only the library's own CMP pair shows the 18.
- The count and distance stages once on your final tree, before from 13b's landed tables (compile-ladder/climb-batch-13b/gate/, compile-ladder/gate/distance-sites.tsv), read by row and line: the 29 gone, none come. Read the stage's FortressLibrary time against 13b's 1,318 s and report it.
- Keep their verdicts: XXX10k (the clause's reading), Compiled10.l, Compiled10.m, Compiled17defgh, ComprisesGenericSubtrait, library_tests/EqualityRung1 and MaybeTest9; Compiled17ee stays undriven, a point if it compiles.
- After the edit: the compiler and library test tracks once (ant testQuick); the interpreter suite once (ant testSystem), since SelfParamDisambiguator runs in the disambiguation phase walk shares (ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java:145, :300), though by reading walk reads a self type by its named trait alone (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:51-53, :535-537), so no walk verdict moves; the count and distance stages once.

**Specification.** Rule (a): the paragraph that gives self its type (Specification/basic/expressions/var-ref.tex:53-54, "The type of self is the type of the trait or object being declared") and the team's self-type idiom after it (:63-70), one sentence for a trait with no comprises clause whose static parameter is bounded by the trait at its own parameters: in its method bodies self has the type T & X; with a \revision callout. Rule (b): one passage in the traits chapter, with its callout. One Appendix I entry before "Passages not yet revised" (Specification/appendices/changes.tex:3296), with the original text of the self paragraph from Specification-1.0-frozen/basic/expressions/var-ref.tex, the reason (the judgement's sections 2 and 4, and the 2019 paper's reason for the confinement), route C, and the decision it follows (P-95, P-96). The sentence that a functional method's self parameter "implicitly has the type of the enclosing trait or object" (Specification/basic/traits.tex:553-555) stays true of the declaration's signature under the confinement; say so in its callout. The calculi of Appendix A are untouched, with no new callout. List every other sentence your change makes false.

**Overlaps by file.**
- A edits the checker too, only scala_src/typechecker/impls/Functionals.scala; no checker file is both rungs'. S's FunctionalMethod.java changes what call resolution reads for a self-typed functional method, A's retry what it tries when no declaration fits: they meet only in the gate's measure.
- Specification/appendices/changes.tex: S adds an entry before :3296; A amends one other entry and P two others, the last of them, "When two sizes are the same" (:3224-3294), ending just above S's new entry. Specification/basic/traits.tex and var-ref.tex are S's alone.
- ProjectFortress/compiler_tests/: S, A and P add distinct files.
- L edits the library: numerator's lines are not S's.

### A. The checker's argument retry: a call written as another call's argument (P-51, row 455)

**The answers this rung follows.** P-51 is decided: when the checker's attempts at a call keep none, an argument that is a call with inferred static arguments is checked again, with each candidate declaration's parameter type as its expected type; the trigger is wide, any inferred static argument, so the inference rules are one rule everywhere; the rung promotes XXXInferContextDrops and XXXInferLoneUnionClosedTrait, whose refusals it repairs. P-49 settles the probe's third fork: the checker tries a call as written first, so the retry never displaces a declaration that already accepts the call. The probe's forks 2, 4 and 5 (explorations/reviews/argument-context-probe.md, section 6) are built as its patch has them and are on the review list: a generic outer call whose static arguments only retried arguments fix takes its bound; an ambiguity the retry finds is refused with today's not-applicable message; an argument that writes its static arguments is retried too, to no effect. The text already makes the context matter: an identifier's static arguments "are statically inferred from the context of the function call" (Specification/basic/expressions/var-ref.tex:38-40).

**Rows.**
- Row 455's argument faces, no distance site: takesBox64(wrapT(3)) and takesBox64(mk()) (ProjectFortress/compiler_tests/XXXInferContextDrops.fss:10-11), refused today at BoxT[\IntLiteral\] and BoxT[\Object\]. The repair is the probe's wide patch (argument-context-probe.md, "The patch (wide), against fe74fb738"): one file, scala_src/typechecker/impls/Functionals.scala, 94 lines added and 1 removed, in typedApplication (:650-815), by the mechanism the checker already uses for a function literal argument (inferFnExprParams, :510-537). git apply --check accepts it on this base, its three hunks at :657, :736 and :835 (offset 13). Batch 13's rung N edited the coercion path of the same file at :324-389 (an opened argument opened once per call); the batch 13 review reads no overlap with the probe's hunks. Apply the patch, read it, and own it.
- Row 535, closed: its expected failure XXXInferLoneUnionClosedTrait pins the refusal of k(pk0(Tri, Sq)) at BoxT[\Any\]; under the retry the call compiles with T = Fig and runs. The test becomes a plain passing test with its run asserted, a revival test's pin changed.
- Notes, not repairs: row 642 (the label body, beside this context); row 577.

**Distance sites.** None. On batch 11's tree the probe's stage was 207 to 207: the retry was tried at 10 library call sites and kept at none (argument-context-probe.md, section 4). A site that moves is a point to report. The count stays 1.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala (typedApplication and the methods the patch adds).
- Specification/basic/inference.tex (the list of contexts at :128-150; the item at :277-278) and Specification/appendices/changes.tex (the entry "The contexts that give a call an expected type", :2043-2190, its sentence on row 455 at :2125-2126).
- New and changed files in ProjectFortress/compiler_tests/.
- Not: Operators.scala, Misc.scala, STypesUtil.scala, Formula.scala, TypeAnalyzer.scala; SelfParamDisambiguator.scala, FunctionalMethod.java and TypeHierarchyChecker.scala (rung S's); the library; walk.

**Tests, first.** Each through junit.sh on the base.
- Row 455: XXXInferContextDrops promoted to a name by topic, compiled and run, the two faces' values asserted with run_out_equals; through junit.sh on the base it shows today's refusal.
- Row 535: XXXInferLoneUnionClosedTrait rewritten as a plain test whose run prints BoxT[Fig]; refused on the base.
- From the probe's section 2, compiled and run, each instance asserted: the overloaded outer call, over(mk()) and over5(mk(), Tri) (the more specific arm wins); the generic outer call, kindOf(mk(), z64) with ZZ64 expected and pair(mk(), b64); the nesting, takesBox64(idB(idB(mk()))); the method Taker.take(mk()); the operator mk() BOXOP 3; the constructor takesBox64(BoxT(1)); over3(mk()) keeping its Any arm (P-49). Beside them an XXX compile test of the controls, refused before and after: takesBox64(mkS()), takesBox64(wrapT("s")), takesBox32(wrapT(z64)), and over2(mk())'s ambiguity.
- Keep their verdicts: InferLooseJuxtContext, InferRepeatedOperatorContext, InferTightJuxtContext, InferCoercionShapes, the InferResultOnly*, InferLone* and Infer*Context tests, XXXNatArithInferChecker (row 681), XXXNatOpenOverloadChecker (row 682).
- The count and distance stages once on your final tree, before from 13b's landed tables: no site moves.
- After the edit: the compiler and library test tracks once (ant testQuick).

**Specification.** The probe's section 5, under the wide trigger: the chapter's list of contexts (Specification/basic/inference.tex:128-150) gains the argument of a call that does not write its static arguments, where no declaration of the enclosing call fits without it, its expected type the parameter type at that position of each declaration in turn, instantiated by the other arguments and the enclosing call's expected type; the item at :277-278 drops "an argument of another call"; a revival-expected-contexts callout beside each, in the S1 form. Appendix I's entry "The contexts that give a call an expected type": the argument joins the Change, whose sentence that the item "names an argument of another call and the body of a for loop" (changes.tex:2061-2064) changes with the item, the Effect's sentence "It still gives no expected type to an argument of another call (row 455 ...)" (changes.tex:2125-2126) is amended, and the Rationale cites var-ref.tex:38-40 (P-95, P-96). The item is in the section "A Numeral Whose Conversions Tie", not in the list's own section. List every other sentence your change makes false.

**Overlaps by file.**
- S edits the checker too, in other files (the disambiguator, the index entry, the hierarchy check); no checker file is both rungs'.
- Specification/appendices/changes.tex: S adds an entry; P amends "Overloading with static parameters"; A amends "The contexts that give a call an expected type". Specification/basic/inference.tex is A's alone.
- ProjectFortress/compiler_tests/: S, A and P add distinct files; A alone changes XXXInferContextDrops and XXXInferLoneUnionClosedTrait.

### L. The library's loose ends: __bigOperator's body(i) typed (the count's error), Array2's offset (row 679), Integral's numerator per type (under QS) and IntMap's SYMDIFF (row 671)

**The answers this rung follows.** Item 47 is answered (PLAN item 47, way 1; F-42): the checker refuses a local function's parameter left untyped, "Missing parameter type for i", and the library writes the type; __bigOperator's body(i) is the one such site left, the count's one error (F-53). Each repair takes the library's own spelling (P-27): Array2's offset takes the shape of Array1's and Array3's; IntMap's node map takes the singleton map's own SYMDIFF. Integral's numerator per type is under QS (section 2), the judgement's thirtieth site (explorations/reviews/self-typed-bodies-judgement.md, ":685, shape C, apart"): one body per integer type in ZZ's shape, four api lines that the review list judges as an extension, shown ZZ's line (process-engineering/library-extension-rule-archaeology.md section 5, point 4); if QS is answered "leave them" before the launch, those lines are dropped. Rows 668 and 669 wait on item 51 and are not this rung's.

**Rows.**
- The count's error, no row: __bigOperator's local body(i): L = r.lift((o.body)(i)) (Library/FortressLibrary.fss:1311), its parameter untyped, "Missing parameter type for i"; the count's one error and the distance's crash row "FnDecl FortressLibrary.fss:1309:1-1313:4 TypeError" (compile-ladder/climb-batch-13b/gate/distance.txt). The repair: body(i: I): L. By reading the body then checks: o.body is I->R, r an ActualReduction[\R,L\] with lift: R->L, unlift: L->R, and o.unwrap R->O (BigOperator, Library/FortressLibrary.fsi:1940-1944). Under walk the parameter is checked at each call of body, which every big operator and comprehension reaches through __bigOperator; where walk gives I a type the elements are not in, the call is refused, and by reading that is every list or map comprehension: the desugarer passes the big operator with only the static arguments the program writes (ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:405-408), walk leaves a big operator's plain-bounded parameter at BottomType (F-141, D2; ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:143-147, :170, :181), as it does BIG <|[\T\]|>'s T (Library/List.fss:178), so __bigOperator's I is BottomType, which admits no value (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:108-113); rows 645 and 662 show the F-bounded cousins. Today nothing checks an element against I. So check it first: write the line, run one walk program with a list comprehension over a generator clause, and run the interpreter suite only if that passes. If walk refuses a call at body's parameter, do not land the line; report the program and the instance walk gave I. Typing body(i) then waits on the open question of review-queue.md item 17 (a big operator's plain-bounded parameter at BottomType under walk) and the walk rung on rows 645 and 662, and the count's error stays at :1311.
- What the count does if the line lands, by reading: the run stops at a component's first thrown error (F-53); the next is Array3's crash at :2923 (row 680, "TryChecker returned an untyped expr", an InterpreterBug), which Shell.compilerPhases returns as one error (ProjectFortress/src/com/sun/fortress/Shell.java:978-996). So the count stays 1, its error now row 680's. It shows the component's own errors, 79 in component FortressLibrary by the distance, only once row 680's crash goes too. The stage then checks the component past :1311 for the first time: 13b's stage took 387 s of its 900 s limit, the component to :1311 about 108 s (explorations/perf-probes/checker-speed/REPORT.md section 7), the rest unmeasured; a run past the limit leaves the table without a total, which the gate reads red, so report the stage's time.
- Row 679, 1 site (:2525): Array2's offset answers oops(...) in two branches of its if, and oops is declared () (:1778), so the body types as OR((ZZ32, ZZ32),()). The repair in the shape of Array1's offset (:2238-2242) and Array3's (:2934-2941): each bound check a statement, if NOT (...) then oops(...) end, then the pair. Walk answers the same values.
- Under QS, 1 site (:688): Integral's default numerator(self):ZZ = do z: ZZ = self; z end (the revival's, d846e3644), "Right-hand side has type Integral[\I\], but declared type is ZZ.": an I has no coercion into ZZ. The repair: Integral's numerator stays declared and loses its body; ZZ32, ZZ64 and NN64 (Library/FortressLibrary.fss:727, :814, :906) and NN32 (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:385) each get numerator(self): ZZ = do z: ZZ = self; z end, which converts by ZZ's coercion from the concrete type, with the api line each as ZZ's (Library/FortressLibrary.fsi:672 in ZZ; .fsi:531, :586, :485; FortressBuiltin.fsi:131). Walk's value is the same conversion at the concrete type. Every object below Integral must then reach a body: walk refuses at load one that does not (F-145).
- Row 671, no distance site: NodeIM's opr SYMDIFF(self, other: SingletonIM[\Val\]) = self.seek(other.key) SYMDIFF other (Library/IntMap.fss:570-571) keeps of self only the entry seek finds, so under walk {0,1,2} SYMDIFF {5} is {2,5}. The repair answers what the library's comment says, "the key/value mappings contained in exactly one input map" (:360), in the singleton map's own shape (SingletonIM's SYMDIFF, :361-363, other.updateWith(...)), or by delegating to it; name the precedent line.
- Notes, not repairs: row 680 (the count's next error, by reading); row 678 (Array2's other two sites, Col and Row at :2568 and :2572, a list of ways); row 639 (an out-of-bounds index fails through fail, whose FAIL no interpreter test can hold); row 577.

**Distance sites.** Row 679's :2525 and, under QS, :688: 2 gone. If body(i) lands, the crash row at :1309 goes, and whatever __bigOperator's body shows is reported by row and line (none by reading). The count: 1 to 1 by reading, its error moving from :1311 to row 680's crash if body(i) lands, and staying at :1311 if walk makes you hold it; if the stage prints otherwise, a point to report, never red.

**Files.**
- Library/FortressLibrary.fss: __bigOperator (:1309-1313); Array2's offset (:2525-2536); Integral's numerator (:688); numerator bodies in ZZ32, ZZ64 and NN64 (:727, :814, :906).
- Library/FortressLibrary.fsi: the numerator lines in ZZ32, ZZ64 and NN64 (:531, :586, :485).
- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss and .fsi: NN32's numerator (:385, :131).
- Library/IntMap.fss (:570-571).
- ProjectFortress/tests/: IntMapSymdiffSingleton.fss's two pins (:12-13) changed; new files named by topic.
- Not: Array2's Col and Row lines (row 678), Array3 (row 680), the array family, the checker, walk, the specification, the team's tests.

**Tests, first.**
- The count and distance stages are the failing-then-passing test of :1311, :2525 and :688, before from 13b's landed tables, after once on your final tree, read by row and line: :2525 and :688 gone, the :1309 crash row gone if body(i) landed, the count's table read (1 by reading, its error row 680's or :1311's) with the stage's time.
- Row 671: IntMapSymdiffSingleton.fss's two today's-value lines (:12-13) changed to the right values, {0,1,2,5} and {0,2}, red on the base, green after; beside them a node map SYMDIFF a singleton on a key it holds and on one it lacks, each asserted against the reverse order.
- Under QS: NumeratorPerType.fss (walk), numerator(x) for one value of each of the five integer types against its ZZ value and denominator(x) against 1; it passes on the base, since walk converts the same way today, so it is seen passing, and the site's test is the stage.
- Row 679: a walk test of Array2's subscripts in bounds, passing before and after; the site's test is the stage.
- body(i): first one walk program with a list comprehension over a generator clause, refused by reading (Rows); if it runs, the interpreter suite after your last edit (below) is body(i)'s test, every big operator and comprehension under walk.
- Keep their verdicts: IntMapTest and the team's IntMap tests, RationalTest, the reductions' and comprehensions' tests, the seven walk array tests.
- After the edit: the interpreter suite once (ant testSystem), since walk reads the library.

**Specification.** None. The text gives numerator on each integer type (Specification/basic-lib/basic-integers.tex:664-667), which stays true; Part IV renders the api lines when the PDF is rebuilt.

**Overlaps by file.**
- L alone edits the library. S's 29 sites are bodies L does not touch; numerator's lines are not S's.
- ProjectFortress/tests/: L and P add distinct files; L alone changes IntMapSymdiffSingleton.fss.

### P. The POPL 2019 examples as tests (rows 697 to 699), the No Duplicates Rule restated (row 696), walk's power in a size (row 676) and row 693's owed test

**The answers this rung follows.** The type group's late positions outweigh the early text (P-26): the POPL 2019 paper's and talk's worked examples test rules the revival implements, and the paper's No Duplicates Rule (Fig. 5, p. 11:13) and the 2011 paper's (Papers/Types/rules.tick:158-161) refuse a pair whose domains are each below the other. The specification's passage is the revival's own (576b4c287) and is restated on the non-strict relation in the S1 form (P-95, P-96); the compiled checker already refuses such a pair by its own duplicate check, so the defect is the text's alone. The examples' note (explorations/reviews/popl2019-examples.md, "For the next batch") lists the tests: each failing example becomes an expected-failure test, written test first; none of rows 697, 698, 699, 444, 373 or 537 is repaired here. Rows 697, 698 and 699 are filed; the optional walk row R4 and the notes on rows 444, 373, 537 and 696 are this rung's to file. Row 676's repair is named by its row: a fourth case, an exact power with the compiled path's refusal out of range. The expected-failure test owed for row 693 by batch 13's merged-diff review (review-routed.1) is a walk test, and this is the rung that writes walk tests.

**Rows.**
- Row 696, no distance site: "more specific" is defined strictly (Specification/advanced/overloading.tex:539-542, "and not the other way round"), so the No Duplicates Rule, "d1 and d2 are not each more specific than the other" (:548-549), refuses no pair, and an equivalent pair falls to the Meet Rule. Restate it on the non-strict relation, or define "as specific as" beside the strict one: your wording, with the reason, both papers, and route C.
- The examples, in the note's list ("Candidate test rung (group A, new or failing)"). Failing today, each an expected failure: XXXDottedMethodMeetBothBodiesWalk (A1, row 444); XXXReturnRuleObjectParamWalk (A4, row 697); XXXGenericBoundsNoMeetWalk (A6, row 373); XXXOverloadZZ32BesideUserTrait.test (A10, row 698); XXXGenericInstanceReturnOnly.fss with GenericInstanceReturnOnlyLink.test and XXXGenericInstanceReturnOnly.test (A-C4, row 699); XXXGenericInstanceReturnOnlyWalk.fss (A-C4), under row R4 if you file it; and, low priority, XXXGenericBoundsMeet.fss with its two .test files (A-B2, row 537). Green today, plain or expected-failure as the note gives: XXXDottedMethodMeetBothBodies.test (A1); TwoTraitsNoMeetWalk and XXXTwoTraitsNoMeet.test (A3); XXXReturnRuleMeetCrossing.test (A4); DispatchCrossingMeetWalk and DispatchCrossingMeet (A5); XXXGenericBoundsNoMeet.test (A6); DispatchSymmetricSortedWalk and DispatchSymmetricSorted (A10, without the two-argument ZZ32 declaration), and A10's whole set under walk; GenericBoundsMeetWalk (A-B2). Beside them, B4's pair, dup[\T\](x: Box[\T\]) beside dup[\U\](x: Box[\U\]): a compile test keyed compile_err_contains=There are multiple declarations of dup, green on the base, the test row 696's close names.
- Row 676, no distance site: under walk Box[\2^3\] stops, "EvalType: class com.sun.fortress.nodes.IntBinaryOp is not yet implemented.", since EvalType.forIntBinaryOp computes +, - and juxtaposition only (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:468-480). The compiled path computes the power by Naming.sizeOp (ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1212-1222): a nonnegative exponent, any power of 0, 1 or -1, otherwise an exponent up to 4096. Walk's fourth case: an exact power, refused for a negative exponent and, by the same message walk gives a sum out of range, for a value beyond the size's range (F-140).
- Row 693's owed test: the generic object of batch 13's review.1, object H[\T\](y: T) extends A[\T\] where { T extends ZZ32 } with override f(x: String): String over A[\T\]'s f(x: T), which loads today against Specification/basic/traits.tex:603-604; an XXX walk test with its .test keyed load_exception_contains=does not override any inherited declaration, beside XXXOverrideObjectExpressionOverParamWalk, so that the row's repair promotes both.
- The rows' notes, from the note's "Candidate ledger rows": row 444 (A1's shape), row 373 (two reproducers, A6 and B4), row 537 (a third shape, A-B2), row 696 (the checker already refuses an equivalent pair); and each of rows 697, 698 and 699 noted with its test.

**Distance sites.** None. Every path of the rung is one the count and distance stages do not read (tests, the specification, walk's evaluator): run neither and list the paths.

**Files.**
- New files in ProjectFortress/tests/ and ProjectFortress/compiler_tests/, as the note names them; XXXNatArithPowerWalk.fss promoted.
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java (forIntBinaryOp, :468-480).
- Specification/advanced/overloading.tex (:531-560, "Declarations with Static Parameters") and Specification/appendices/changes.tex (the entry "Overloading with static parameters", :2270-2431).
- Specification/basic/expressions/constant.tex (the note, :15-21) and Specification/appendices/changes.tex (the entry "When two sizes are the same", its Effect's last sentence at :3280-3282), for row 676.
- Not: walk's load checks (OverloadedFunction.java, the repairs of rows 697, 444 and 373), the checker, the code generator, the compiler prelude, the library, every other walk file.

**Tests, first.**
- Each example through the harness on the base, as the note ran them (its "How the examples were run"): each failing one seen failing as written and then gated as an expected failure; each green one seen passing.
- Row 676: XXXNatArithPowerWalk promoted to a name by topic, red on the base, with an exponent of 0 and a power of 1 and of -1 asserted. Each refusal, a negative exponent and a power out of the size's range, in a program of its own that instantiates the size in a top-level variable, with a .test keyed load_exception_contains on walk's message (the fortress-repo skill's tests-writing.md: a failure while the top-level variables are initialised counts as a refusal at load).
- Row 693: the XXX test above, passing on the base as the expected failure.
- Keep their verdicts: XXXOverloadExistentialMeet and XXXOverloadExistentialMeetWalk (rows 537, 539), XXX2f.test, XXXoverloadTest5, the walk size tests (NatReflectTest and the Nat*Walk tests), XXXOverrideObjectExpressionOverParamWalk, the Override*Walk tests.
- After the edit: the interpreter suite once (ant testSystem) and the compiler test track once (ant testQuick), since the rung adds files to both.

**Specification.** Row 696: the No Duplicates sentence restated on the non-strict relation in the S1 form, with a callout, and the Appendix I entry "Overloading with static parameters" amended with the reason, the 2011 paper's and the 2019 paper's rule, and route C. Row 676: the text already gives a power in a static expression (Specification/basic/expressions/constant.tex, "Static Expressions"), so no normative sentence changes, but two revival sentences say walk stops on a power and your repair makes both false: the note at the head of that section, "Of the static expressions in a size, the interpreter computes a sum, a difference and a product, and stops on a power (row~676 of the revival's gap ledger)" (constant.tex:15-17), and the Effect of the Appendix I entry "When two sizes are the same" (Specification/appendices/changes.tex:3224-3294), "The interpreter computes a sum, a difference and a product exactly when it instantiates a type and refuses a size outside its kind; it stops on a power (row~676)." (:3280-3282). Correct each to what walk then does, each clause checked against EvalType.forIntBinaryOp. List every other sentence your change makes false.

**Overlaps by file.**
- No other rung edits walk.
- Specification/appendices/changes.tex: S adds an entry before :3296 and A amends another; P amends "Overloading with static parameters" and the last sentence of "When two sizes are the same", which ends just above S's new entry. Specification/advanced/overloading.tex and constant.tex are P's alone.
- ProjectFortress/compiler_tests/ and ProjectFortress/tests/: S, A, L and P add distinct files.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung of the same batch (PLAN, "The principle for the batches"). S and A are the checker's in different files; L is the library's alone; P edits one walk function, tests, one specification passage and the two revival sentences on walk's size arithmetic.
- Numerator's default (:688) and the 29 bodies are two rungs' sites under one question: the per-type bodies clear :688 with or without S's rule, so L does not build on S.
- The repairs that P's expected failures gate (rows 697, 444, 373) are not in this batch: a rung that wrote the test and another that fixed it would build on each other.
- Where they meet only in a measure: S, A and L all reach the checker's view of component FortressLibrary, and S (through the disambiguation phase walk shares), L and P the interpreter suite. The gate measures and runs the merged tree.

## 4. What the batch leaves out, each with its home

**Kept out for want of a measurement.** Each needs a trace or a run the record does not hold; none blocks a rung of this batch.
- **Row 685, 4 sites** (the first factory of each pair, `vector` and `matrix`, `:2461` and `:2838`, two errors each since 13b's bound): `TypeWellFormedChecker.scala:153-166` tests a written argument with no bound in scope, not traced to its line, and no reproducer. The trace would decide whether the fix is the bound's scope at the first declaration of an overloaded pair, and whether both errors of each site go with it. Home: a checker rung once traced.
- **Row 686, 1 site (the norm's `squaredNorm(me)`, `:2490`), and rows 687, 689, 690** (the four checker defects at a type parameter bounded by a closed trait and a bound that excludes one of its listed types): each gated, none traced. Refused at `impls/Functionals.scala:721` (686), crashing in `Formula.slv` at `:593` (687, 689), a false Return Type Rule error at `OverloadingOracle.scala:115-117` (690). A trace of each would decide whether one fix in the inference step serves 686, 687 and 689, and where 690's normal form goes wrong. Home: item 52's checker rung once traced, after A lands, since A edits `Functionals.scala`.
- **Row 680, `Array3`'s crash** (`:2923`, "TryChecker returned an untyped expr"), which hides `Array3`'s body and its two run-time-size calls and is the count's next error. A trace of what fails in `plane`'s body would decide whether a library line or a checker fix clears it, and so when the count reaches the component's errors. Home: the next checker rung once traced, or the library's arrays.
- **Row 691,** a generic call with more arguments than parameters accepted and the extra ones dropped: not traced, no reproducer. Home: a checker rung once traced.
- **Row 695,** the code generator's missing cast on a default body that returns `self`: S writes its reproducer; the cast's place in the generator is not traced. Home: a code-generator rung after S lands.
- **Row 700,** `LinearCongruential` wrong for a modulus that is not a power of two: by reading, never run, and the library builds it only with 2^48. A run of a non-power-of-two modulus would decide whether it is a library slip for the next library rung.

**Kept out by the method or a decision.**
- **The arrays, 21 more sites:** row 678's 2 (`Col` and `Row`, a size lost in a factory), 14 bodies typed by their parent trait (`:2402` to `:2841`), 3 sizes tested in a branch (`:2427`, `:2438`, `:2817`), 2 export errors (`FortressLibrary.fss:12`). A list of ways first, as batch 13's record placed them. Home: the arrays' lists of ways; the export errors with decision E and the library-wide api match.
- **Item 51, rows 666, 668 and 669, and row 665's abstract half:** your answer to item 51 (`review-queue.md` item 14). Then a library rung repairs rows 668 and 669, and a walk rung builds the rule you choose.
- **Your other open items, 12 sites:** the integer power, 6 (rows 438, 441, 445); item 38 (row 585), 3; row 634's list half, 1 (`:1939`, the `where`-clause line); item 46 (row 632), 1; row 631, 1. Home: your answers.
- **`where` clauses, 12 sites:** rows 433 (6), 636 (4), 436 (2), with rows 677 and 652. PLAN's `where`-clause line.
- **Row 425, 3 sites** (`:4236`, `:4242`, `List.fss:146`): a checker project before the switch-over. **Row 488, 1 site** (`:130`): moves with the checker's query history.
- **Row 681,** a static argument written with a static parameter in it not inferred: no library site needs it. Home: the next checker rung on sizes, beside row 683.
- **Row 673,** walk's `if` on an object that is not `Boolean`: the repair must say whether `Just` and `Nothing` keep walk's reading as a clause, which no record settles. Home: the next walk rung.
- **The repairs of rows 697, 444 and 373** (walk's load checks), which P's tests gate: the next walk rung. **Row 698** ends at the switch-over; **row 699** with phase 5's dispatcher (row 538); **row 537** with phase 5's code generation.
- **Rows 645 and 662:** `review-queue.md` item 17, which by reading also holds `body(i)` typed under walk (section 1, the count). **Rows 612 and 616:** D5's and row 591's entries. **Row 663:** batch 11's entry on the open type's dispatch. **Rows 661, 670, 650 and 653's compiled half:** their entries.
- **Row 638:** its five library sites have passed `CallerViolation` since `b872d65a1` (climb batch 11's rung L); what is left is the team's never-called witness at `ProjectFortress/tests/QuickCheckTest.fss:39` and a commented line. Its close or note is the coordinator's; no rung.
- **Rows 701 and 702:** phase 5's code generation; the tools.

**What PLAN gives batch 14, and where each goes** (phase 3 item 12 and the lines under item 11):
- The self-typed rung: S, under QS, with the 2019 paper's sentence in its decision record; row 695 beside it as a reproducer.
- The Q48(b) wide checker rung: A, with batch 13's rung N's hunk named in its overlaps.
- Fork 2's held library half: landed as 13b; rows 686, 687, 689 and 690 kept out for a trace.
- `__bigOperator`'s `body(i)`: L, with the count's move declared by reading; held, and then with item 17's walk rung, if walk refuses it, as by reading it does (section 1, the count).
- `Array2`'s 3 sites and row 680: row 679 in L; row 678 to the arrays' lists; row 680 kept out for a trace.
- Item 51 and row 665's abstract half: held for your answer.
- Rows 671 (L), 676 (P), 681 (out), 685 (out), 691 (out), 695 (S's reproducer), 696 (P) and the POPL 2019 test rung (P).

## 5. How it is run

The batch runs on the workflow of batch 13: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`. Each rung's worker does its rung test first; its skeptic checks it and fixes what it finds, test first; a judge rules only on a fix the skeptic marks contested, on a rung the skeptic refuses, or on a worker's stop; the gather lands the rungs on `main` and folds their record lines and their ledger rows through `coordinator/tools/ledger.py`; the merged-diff review and the gate run side by side; the commit stage lands the gate's tables, runs the quick microGPT walk check and pushes. The batch writes no skill text: each rung's revival-change material goes into the batch's `RECORD.md` for the skill writer. Section 3 is each worker's brief word for word, with the answers line it opens with; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-14/manifest/gen14.py` reads with the briefings of `lists14.py` beside it, and `check14.js` checks.

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the checker count and the distance are the rung's failing-then-passing test, before from climb batch 13b's landed tables (`compile-ladder/climb-batch-13b/gate/`, `compile-ladder/gate/distance-sites.tsv`) and after once on the rung's tree. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because 13b's landed summary has it. Rung L declares the checker count it expects, 1. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands (the `coordinator` skill's `references/batch.md`, "Reserved points and repairs"); only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### S
- **slug:** `rung-self-type`
- **worktree:** `/home/user/fortress-selftype`
- **expected minutes:** 140
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** under QS (the self-typed bodies, way 6) the compiled checker types self in a method body of a trait with no comprises clause and an F-bounded parameter as the trait and that parameter at once, each declaration's signature keeping the plain trait type, and checks that whatever extends such a trait at X is an X; the self paragraph, rule (b)'s passage and an Appendix I entry in the S1 form; 29 sites, row 695's reproducer as an expected failure; Scala and Java under scala_src/ and compiler/index/.
- **points to report:**
  - A compiled test whose verdict changes other than by the rung's intent, or a ladder file that moves.
  - A site that comes, by row and line, above all a Return Type Rule error at CMP or a CMP body typed Comparison, the unconfined rule's 21; a site gone beyond the 29.
  - The distance stage's FortressLibrary time against 13b's 1,318 s, or a stage that stalls.
  - An extender in the library, the demos or the tests that rule (b) refuses, the four the section names among them, or a program the text allows that the checker now refuses outside self types.
  - XXX10k's verdict moving, or Compiled17ee compiling.
  - The patch changed from the judgement's, with the reason.
  - Normative text changed beyond the self paragraph, rule (b)'s passage and their Appendix I entry, and every sentence made false.
  - A library, walk or code-generator edit, or a walk test whose verdict changes (the disambiguator is a phase walk shares).

#### A
- **slug:** `rung-argument-context`
- **worktree:** `/home/user/fortress-argctx`
- **expected minutes:** 90
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** under P-51 (item 48 b, wide) the compiled checker, when no declaration of a call fits, checks again an argument that is a call with inferred static arguments against each declaration's parameter type, never passing over a declaration that already fits (P-49): row 455's two faces compile and run and row 535's pinned refusal becomes a passing test; the inference chapter's list of contexts and its Appendix I entry amended; no site; Scala in impls/Functionals.scala.
- **points to report:**
  - A compiled test whose verdict changes other than XXXInferContextDrops and XXXInferLoneUnionClosedTrait, or a ladder file that moves.
  - A count or distance site that moves.
  - A call whose chosen declaration changes, or a retried argument that displaces a declaration that already accepted the call.
  - The probe's forks 2, 4 and 5 as built, and any departure from the probe's patch, with the reason.
  - Normative text changed beyond the list of contexts, its item and the Appendix I entry.
  - A checker file edited beyond Functionals.scala.

#### L
- **slug:** `rung-library-followups`
- **worktree:** `/home/user/fortress-followups`
- **expected minutes:** 120
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **checker count:** 1
- **blurb:** __bigOperator's local body(i) typed body(i: I) under item 47's refusal, the count's one error, which then moves by reading to Array3's crash (row 680), the line held if walk refuses it, as by reading it does on every list comprehension; Array2's offset in Array1's shape (row 679); under QS each integer type's own numerator in ZZ's shape, Integral's default removed; IntMap's node map SYMDIFF a singleton keeping its other entries (row 671, two revival pins changed); 2 sites; library declarations only.
- **points to report:**
  - A walk test or a team test whose verdict changes, above all a reduction or comprehension refused at body's parameter, with the program and the instance walk gave I.
  - The count's table after the edit, its total and its error, the stage's time against its 900 s limit (13b's 387 s), and any site that __bigOperator's body brings.
  - A library or test type below Integral that walk refuses at load once numerator has no default.
  - Each repair's precedent line, and a new api declaration beyond the four numerator lines.
  - The pins changed in IntMapSymdiffSingleton.fss, each with its before and after.
  - A team test line changed.
  - A checker or walk edit, or a site whose only repair is one.

#### P
- **slug:** `rung-popl-examples`
- **worktree:** `/home/user/fortress-popl`
- **expected minutes:** 100
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** the POPL 2019 paper's and talk's worked examples as tests, seven green and seven expected failures gating rows 697, 698 and 699 with notes on rows 444, 373 and 537 (row R4 if filed), the No Duplicates Rule restated on the non-strict relation with its Appendix I entry (row 696), walk's power in a size (row 676, XXXNatArithPowerWalk promoted, with the note and Appendix I sentence that say walk stops on it corrected) and the expected failure owed for row 693; tests, the overloading chapter, the static expressions' note and one walk function.
- **points to report:**
  - An example that passes where the note says it fails, or fails where it says it passes, with its run.
  - A walk or compiled test whose verdict changes other than XXXNatArithPowerWalk's promotion.
  - Each row filed and each note written, and row R4 filed or not, with the reason.
  - A power in a size whose value or refusal differs between walk and the compiled path.
  - Normative text changed beyond the No Duplicates Rule and its Appendix I entry, and each sentence on walk's power in a size corrected (constant.tex's note, the Effect of "When two sizes are the same").
  - A walk edit beyond EvalType.forIntBinaryOp, or a checker, library or code-generator edit.

### What every agent of the run reads first

This run is climb batch 14, the record CLIMB-BATCH-14.md, phase 3's next batch after 13 and 13b, toward the checker at a true zero: two checker rungs, one library rung, and one rung of tests, one specification passage, two revival sentences and one walk function. The decisions on record built here are item 48 (b), wide (P-51), and item 47's refusal of an untyped local parameter; the self-typed bodies' way 6 is built at its judgement's default on the standing go and listed for review (QS). The distance stands at 85 and the count at 1 after climb batch 13b (compile-ladder/climb-batch-13b/gate/). The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another rung of the batch. S and A edit the checker in different files: S the self-parameter disambiguator, the functional method's index entry and the type hierarchy check, A the argument retry in impls/Functionals.scala. L alone edits the library: __bigOperator's body, Array2's offset, the integer types' numerator and IntMap's SYMDIFF. P edits walk's EvalType.forIntBinaryOp and no other code. ProjectFortress/compiler_tests/ takes S's, A's and P's distinct files, ProjectFortress/tests/ L's and P's distinct files; A alone changes two compiler tests, L alone one walk test's pins. Specification/appendices/changes.tex takes S's new entry, A's amendment of "The contexts that give a call an expected type" and P's of "Overloading with static parameters" and of the last sentence of "When two sizes are the same"; S also edits var-ref.tex and traits.tex, A inference.tex, P overloading.tex and the note of constant.tex. S, A and L move the checker's view of component FortressLibrary, S, L and P reach the interpreter suite (S through the disambiguation phase walk shares); the gate measures and runs the merged tree. ant testSpecData runs in the gate because 13b's landed summary has it.

### Before the launch

The coordinator, in this order:
1. This record with its generator on `main`, and its top-tier review in place on the standing pre-approval of such reviews. The base is `main`'s head after them, its full hash, passed as `args.base`.
2. The base build, as the manual's "Before the launch" gives it: `git -C /home/user/fortress worktree add --detach /home/user/fortress-base14 <base>`, `ant compileAll` in it, the library order, one passing walk test, `git status --porcelain` empty; passed as `args.baseBuild`. One trial seed proves it (`coordinator/tools/seed-worktree.sh /home/user/fortress-base14 /home/user/fortress-seedcheck - <base>`, then `git -C /home/user/fortress worktree remove /home/user/fortress-seedcheck`), and one `coordinator/tools/old-fortress.sh /home/user/fortress-base14 /home/user/fortress-seedcheck-caches ProjectFortress/tests/BooleanOps.fss` run from the main tree proves the old code runs, its folder removed after.
3. No probe: both patches are measured and apply to the base, and each rung's first measurement is its own test. If QS is answered before the launch, the coordinator drops what section 2 says, from section 3, the manifest and `lists14.py`, and runs `gen14.py` and `check14.js` again.
4. The briefings checked on the base: `python3 explorations/compile-ladder/plan-14/manifest/lists14.py`, every key matching one place. The block generated and spliced: `python3 explorations/compile-ladder/plan-14/manifest/gen14.py`, then `node explorations/compile-ladder/plan-14/manifest/check14.js`, which splices it into a scratch copy and checks it; then the same splice into the script itself (`check14.js --write`), `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. No launch value is set by hand: the batch's new ledger rows are numbered by the gather through `ledger.py add`.
5. `df -h /` against four seeded worktrees (about 206 MB each) and the base build; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`.
6. Check-ins armed for the run's length, 45 minutes apart, and one after the session's next predicted process stop, which the boot note names (the `coordinator` skill's `references/delegating.md`, "Watching a run"); a run stopped there is resumed with `resumeFromRunId`.

The launch: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of the base>', baseBuild: '/home/user/fortress-base14'}})`. The arguments are kept byte for byte in the session's scratchpad, since a resume needs them.

### The gate, and what it should show

The comparands are 13b's `summary.txt`, `checker-count.txt` (1) and `distance.txt` (85), with `distance-sites.tsv`.
- `testSystem`: the comparand's sum (580: 146, 149, 141 and 144 over the four shards) plus the files L and P add; a promotion or a changed pin moves nothing.
- `testFast`: the compiler track 1,118 plus the cases S, A and P add; the library track 86, the othercompiler track 263 and the misc tracks unchanged.
- `testSpecData`: 130 green, run because the last landed summary has it.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move; S's and A's checker changes are the ones that could move a file, each a point to report.
- The checker count: 1 to 1, declared by rung L, its error moving from `:1311` to row 680's crash by reading if L lands `body(i)`, staying at `:1311` if walk made L hold it. With `body(i)` typed the stage checks the component past `:1311` for the first time: its time against the 900 s limit is read (13b's 387 s), since a run past it leaves no total, which `checker_compare` reads red. The distance: reported, never red. By reading, S clears 29 and L 2; A and P move neither measure. The distance near 54, give or take row 488's 2 to 4.
- A repair after the review or the gate runs the gate again only when it changed a path the gate reads (`ProjectFortress/` but test files, `Library/`, `build.xml`).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather, in the order it applies the rungs (its `RECORD.md` says which order and why); until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>` for its number (`NEW-P-1`), and the gather replaces every placeholder with the number `ledger.py` gives. The row a rung may open by plan: P's R4, walk's run of a generic declaration reached only by dispatch at its bound (`reviews/popl2019-examples.md`, "Candidate ledger rows"), if its test shows it (NEW-P-1). Rows the rungs close (`ledger.py close`, after the rung's commit is on `main`): 455 (A); 679 and 671 (L); 676 and 696 (P, row 696 with the No Duplicates compile test); each as its test passes on the merged tree. Rows that stay open with a note: 695 (S, its reproducer), 680 (L, the count's next error), 697, 698 and 699 (P, their tests), 693 (P, its second test). Notes: 407 and 488 (S); 678 and 639 (L); 444, 373 and 537 (P, the note's text). Row 535 is closed (`FIXED`) and takes none. Where `ledger.py` refuses a note for length or a closed row, the gather lists the text for the coordinator.

### After the landing

The coordinator: the landing report; the routing of every item for the curator into PLAN, QS among them with the default that landed, and a PLAN line for every row the batch opens; FACTS consolidated (F-53 and F-54 to the new figures; F-87's last clause made false by A; F-53's sentence on the count once `body(i)` is typed, as the gate reads it); the post-batch review, which reports this batch's measures against batches 8 to 13 as `process-engineering/batch-redesign.md`, "The measures", defines them; batch 15's lists, from section 4, with the traces it names.

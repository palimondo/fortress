<!-- DRAFT, CONTENT ONLY. The record of climb batch 12, the next batch of the plan's phase 3, "the checker at a true zero", drafted 2026-10-09 by a planning worker of the top tier (Fable) for the coordinating session, the curator and the batch's workers, against `main` at `ae93dd1ae`, whose `Library/`, `ProjectFortress/`, `Specification/`, `Documentation/`, `build.xml` and `bin/` are byte for byte those of `f9d3ec826`, climb batch 11's landing (`git diff --stat f9d3ec826 HEAD` over those paths is empty), so batch 11's landed tables describe this base. It says what the batch changes, why, and what the curator decides first; section 5 holds the manifest's fields, which `explorations/compile-ladder/plan-12/manifest/gen12.py` reads. Sources: PLAN.md, "The principle for the batches", phase 3 items 9 and 10 and the lines under them, items 48 to 50, and the list "Climb batch 11, listed for his review"; batch 11's landed tables (`compile-ladder/climb-batch-11/gate/distance.txt`, `checker-count.txt`, `summary.txt`) and per-site list (`compile-ladder/gate/distance-sites.tsv`), read file by file, line by line and message by message and grouped by ledger row; `compile-ladder/climb-batch-11/RECORD.md`; `reviews/batch-11-review.md`, section 1 and Part 4; the rung reports and skeptic notes of batch 11 that the rows cite; `process-engineering/library-extension-rule-archaeology.md`, sections 5 and 7; POSITIONS.md and FACTS.md, cited by bold title, every figure taken from the gate files and none from the four FACTS entries that still carry batch 10's figures (its lines 44, 56, 66 and 144); ledger rows read one at a time with `ledger.py show`; the library and checker code at the sites; the form of `coordinator/CLIMB-BATCH-11.md`. Nothing was built or run: no stage, no suite, no Fortress program and no `classify.py`; the counts are by row and by site, never by class (row 577). One line per paragraph. Reviewed in place on 2026-10-09 by the top-tier review `coordinator/climb-batch-12-review.md`, on the curator's standing pre-approval of such reviews (POSITIONS, "The phase-3 batches run on a standing go."), against `main` at `6067ccb25`, whose one commit since `ae93dd1ae` is this draft; the review gives one reason per change, what it checked and found right, and the questions as they now stand. -->

# Climb batch 12

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode.
- **The one library** is the interpreter's library (`Library/`, `ProjectFortress/LibraryBuiltin/`). At the **switch-over** the compiled path takes it over and the compiler's own small library is deleted.
- **The distance** is the number of errors the checker reports when it checks the one library. Each error has a **site** (a file and a line). This record counts sites by the ledger **row** that records their defect, not by the distance stage's classes, whose line ranges are stale (row 577). Phase 3 of the plan brings the distance to a true zero, so that the switch-over can happen.
- **The count** is the older, narrower measure, the checker's errors on the one library's api files. It is 1: `isLeftZero` (row 582).
- A **row** is an entry of the gap ledger, the project's list of known defects, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers".
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the skeptic. A **batch** is a few rungs, merged and tested together by the **gate** (every suite once) and landed at once.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. An **expected failure** is a test named `XXX...` that passes while the defect is there; when the fix lands it is **promoted**, renamed by `git mv` to a plain name.
- A **load check** is a check walk makes when it loads a program, before it runs it. A refusal there is walk's form of a static error.
- A **type parameter** is a hole a type fills, `T` in `SUM[\T\]`; its **bound** is the widest type allowed in the hole. An **F-bounded** parameter has a bound that names the parameter itself, `T extends AdditiveGroup[\T\]`. Since batch 11, walk leaves such a parameter **open** when nothing at a call fixes it, so every value passes. **D2** is batch 9's decision that a big operator's other parameters, when nothing fixes them, stay at `Bottom`, the empty type that no value passes.
- The **expected type** is the type a context requires of an expression, such as the declared type of the variable it is assigned to.

### Where the distance stands

- After batch 11 the distance is 207 and the count 1 (`compile-ladder/climb-batch-11/gate/distance.txt`; `checker-count.txt`; landed at `f9d3ec826`).
- The 207, by what each group waits on. This record read the per-site list site by site and grouped the sites by ledger row; the groups sum to 207. PLAN's batch-11 line gave the groups by batch 10's review less what batch 11 cleared, without a site-by-site map, and four of its figures differ by one or two from this reading, each noted below.
  - 94, the arrays: 92 sites in the array, vector and matrix sections, in `NatReflect` and in `NativeArray`, and the two export errors of `FortressLibrary`, which batch 10's review counted with them (PLAN: about 95). They wait for the array design after the switch-over (your answer to batch 8's Q4, item 15).
  - 30, the self-typed bodies: a list of ways and a judgement first (your answer to batch 8's Q2; Q5 below).
  - 44, your other open items (PLAN: 43): the tuple comparisons 18 (row 634, item 43), a size read from a `Generator` 9 (row 629, item 45), `String`'s operator pairs 3 (row 585, item 38), the integer power answering `RR64` 6 (rows 438, 441 and 445; PLAN: 5), `QQ`'s `ceiling` and `truncate` 2 (row 635, item 44), `String`'s `left` and `right` 2 (row 606, item 42), `isLeftZero` 2 (row 582), `__bigOperator2`'s fused arm 1 (row 632, item 46) and `embiggen`'s team test line 1 (row 631).
  - 13, row 628: the reductions' three `Any` devices, which batch 11's rung W unblocked. This batch's rung G.
  - 12, the `where` clauses: row 433 6, row 636 4, row 436 2 (row 630 is its duplicate).
  - 9, the ranges and one slip, this batch's rung R: row 654 1, row 655 2, row 656 5 (item 49, Q49), row 608 1.
  - 3, row 425, the checker's rewriting of a reduction by its element type (PLAN: 4; `Library/List.fss:146`, a list comprehension whose element type nothing fixes, is the third by this reading).
  - 1, row 642, the body of a `label` (item 48, Q48). This batch's rung C.
  - 1, row 488, `BIG LEXICO(g)`, which moves with the checker's query order.
- So most of what is left waits on a decision, not on work. This batch reaches 23 sites at the defaults of Q48 to Q50 and with probe P2 clean (section 5): C 1, R 9, G 13. Without Q49's default it reaches 18; without Q48's, 22; if P2 finds the typing stopping an identity-less operator that runs today, rung G does not run and the batch reaches 10; if it stops a monoid operator only, G leaves `MonoidReduction`'s one `lift` site and the batch reaches 22. The rest waits on the arrays (94), the self-typed judgement (30), your other open items (44), the `where` clauses (12), row 425 (3) and row 488 (1).

### The rungs, two sentences each

- **W, walk: three load checks and a binding order.** Walk refuses at load an object that inherits an abstract method and gives it no body (row 649), an `override` that overrides nothing (row 653's walk half) and a generic object, or an object expression inside a generic function, whose functional methods break the Meet Rule (row 647); and a top-level variable initialised with an object expression gets its value instead of stopping the program (row 648). The distance does not move, since the stages do not read walk.
- **C, the checker's expected type and a crash.** Under Q48 the body of a `label` takes the expected type, and `Library/String.fss:431`, item 36's thirteenth site, clears (row 642, 1 site); an operator repeated between three or more operands gets its expected type, and Appendix I's sentence that says it gets none is amended (row 644); and the crash 'R is not in the kind env' on a written static argument whose bound names another parameter becomes a check (row 651). Rows 644 and 651 have test programs, not library sites.
- **R, the library's ranges and two slips.** `FullRange.narrowToRange` over an open range (row 654), the bounds check moved to the `ZZ32` kinds with its three callers (row 655) and, under Q50, comparing point by point (row 657, a value change), under Q49 `fail` bodies for the open range's five methods (row 656), `PrefixSet`'s `indices` (row 658, a walk stop) and `ImmutableArray1`'s `r'.lower` (row 608): up to 9 sites. Library declarations only.
- **G, the library's reductions.** The three `Any` devices of the identity-less reductions, `simpleJoin(a: Any, b: Any)`, the lifted type `AnyMaybe` and `lift(r: Any)`, are typed at the element type, as the api already declares `lift` (row 628, 13 sites). It runs only if probe P2 (section 5), the operators' unwritten clause forms run on the base and on a shadow with the devices typed, shows no operator that runs today stopping once they are typed; a new stop at a monoid operator alone leaves `MonoidReduction`'s `lift` site out, 12 sites.

### What the batch leaves out, and why (section 4 gives each home)

- The arrays, 94: after the switch-over, by your answer.
- The self-typed bodies, 30: no list of ways is on file yet (Q5).
- The sites under your other open items, 44, listed at the end of section 2.
- The `where` clauses, 12; row 425's 3; row 488's 1: language and checker work no batch has planned.
- Row 455's argument faces (Q48's part b): no site of the 207; the checker's way needs a measurement first.
- Rows 612 and 616, D2's case and row 645: they wait on your word on D5's, row 591's and D2's entries.
- Rows 650 (the code generator's `override`), 652 (keyword parameters), 643 (a code-generator crash), 659 (a rank-2 range strided both ways) and 646 (a set comprehension's type under walk): your questions or later phases.

### Before the batch runs

- The two owed script edits (`coordinator/pending-script-edit.md`: the briefs write the `nohup` form instead of `run_bg`; the gather's unfolded-entry filter) and the FACTS consolidation of the four entries still carrying batch 10's figures; then this record and its generator on `main`. The base is `main`'s head after them.
- Your answers to Q48, Q49 and Q50, or the defaults they name.
- Probe P2 (section 5, "Before the launch"): about 12 minutes of machine time on a worktree seeded from the base build, its program run on the base build too. It settles whether rung G runs, and whether it takes 13 sites or 12. This record did not run it, since no base build exists now.
- `classify.py` reading its ranges by declaration (row 577) is not built. This record counts by row, not by class, so it does not need it; the gate's class table will misfile moved sites again until it is.

### Cost

- About 4.7M tokens, from 4.2M if no skeptic's fix is contested to 5.6M if two rungs go to a judge and one to a repair; a red gate adds about 0.5M. The figures scale batch 11's by role (workers 1.99M, skeptics 1.60M, one ruling 0.14M, gather 0.49M, review 0.41M, cold read 0.15M, gate and commit 0.25M; `reviews/batch-11-review.md`, "For Pavol"), with four rungs smaller than batch 11's W and E and one, G, that changes an api type across the reductions. Batch 11 wrote 5.03M for four rungs.

## 2. Your questions, in the order they block the batch

**Not yet answered.** Items 48, 49 and 50 are open (PLAN, "Pavol's answers", under "Before the switch-over, raised by climb batch 11"). Each question below gives a default; the rungs of section 3 run at the defaults, and an answer the other way loses only the sites the question names. Q5 is carried from batch 11 and asks nothing.

### Q48. Item 48: does the body of a `label` expression take the enclosing expected type? And, row 455's two argument faces: does the argument of a call?

- **Blocks:** part (a), rung C's one site of the 207, `Library/String.fss:431`. Part (b), no site: the two faces of `ProjectFortress/compiler_tests/XXXInferContextDrops`.
- **On file:** PLAN item 48; row 642 (batch 11's rung E put the question, `compile-ladder/rung-checker-expected-type/REPORT.md` section 8); row 455; the inference chapter's two lists (`Specification/basic/inference.tex:128-142`, `:266-268`) and Appendix I's entry "The contexts that give a call an expected type" (`Specification/appendices/changes.tex:1984-2082`), which names the `label` body as outside the list (`:1998-2001`, `:2043-2046`) and says the checker gives a repeated operator no expected type (`:2047-2051`, row 644, rung C's whatever this question's answer); PLAN's batch-11 line, which queues row 455's argument faces for the next checker rung beside row 644. No top-tier judgement is on file; none is needed for (a), the reading you took for a `typecase` clause (batch 11's Q2, way 1).
- **Terms.** A result-only type parameter appears only in a function's result, as `T` in `fail[\T\](s: String): T`; only the expected type can fix it. A `label` names a block that an `exit` inside it can leave early with a value. An argument face is a call written as the argument of another call, `takesBox64(wrapT(3))`.
- **Type theory.** A checker that passes the required type down into an expression's parts gives each part the type the whole requires. The text types a `label` as the union of its body's last expression and its exits' values; by the reading you took for `typecase`'s union rule, each member then takes the enclosing expected type. An argument's expected type is the parameter type of the declaration the call chooses, but the call chooses by the arguments' types, so an overloaded callee makes a cycle; bidirectional checkers break it by typing the argument first and typing it again against the chosen parameter where a type variable stayed unfixed.
- **Today.** Walk runs both. The checker checks a `label` body with no expected type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:706`), so `fail`'s `T` takes `Any` and `SubString.verify`, declared `()`, is refused: "Function body has type Any, but declared return type is ()". At an argument it does the same: `takesBox64(wrapT(3))` and `takesBox64(mk())` are refused; rung E's split of `XXXInferContextDrops` left those two faces there and made the loose juxtaposition a passing test (`InferLooseJuxtContext`).
- **The specification.** `Specification/basic/expressions/label.tex:66-70`: the type of a `label` is the union of the type of its body's last expression and the types of its exits' `with` values. The inference chapter's list of contexts (`inference.tex:128-142`) names neither; its list of what it does not yet describe names both: "an expected type in any context other than those listed above, such as an argument of another call, the body of a `for` loop or the body of a `label` expression" (`:266-268`). `Specification/basic/expressions/var-ref.tex:35-40`, read by batch N's rung I, says a call's static arguments are inferred from the context of the call.
- **The library's own way.** One `label` body ends in a `typecase` whose arms call `fail` (`String.fss:431`); the library writes no static argument there. No library site of the 207 is an argument face, by this record's reading of the per-site list.
- **The peers.** No survey is on file. By reading, a bidirectional checker gives a block's last expression and its early exits the block's expected type alike; for arguments, Scala types the argument without an expected type first and again against the chosen overload's parameter type.
- **The commits.** Batch 11's rung E (`27cb9e93b`) gave item 36's four contexts and opened row 642; its Appendix I entry lists the `label` body as still outside. Batch N's rung I (`8dc1a74d9`) passed the expected type at `f(x)`, a method invocation, a prefix, an infix and a parenthesised call, with a retry without it, and left the argument face as `XXXInferContextDrops`.
- **The derivation.** "A type parameter the arguments do not fix takes its bound, never `Bottom`" and "The specification stays the standard": the checker passes in the type the text requires. Both parts touch the specification and the checker, so they reach you (POSITIONS, "Which decisions taken inside the work reach Pavol, and how."). Part (a) is the union rule you read for `typecase`; part (b) is a context whose rule the chapter has not yet written and whose checker cost no probe measured.
- **The ways.**
  1. (a) yes: the chapter's list gains the body of a `label` and the `with` values of its exits, the not-yet-described item loses the body, Appendix I's entry is amended in the S1 form, `Misc.scala:706` passes the type, `XXXInferResultOnlyLabelBody` is promoted. Clears 1 site.
  2. (a) no: the row stays, pinned by that expected failure.
  3. (b) yes: the checker types an argument again against the chosen declaration's parameter type where a result-only parameter took its bound, and the chapter's list gains the argument of a call whose declaration is chosen. Unmeasured; a checker design with overloading in it.
  4. (b) no: the two faces stay as the expected failure under row 455; a later checker rung after a measurement.
  The costs of 1 and 3 are unmeasured; no probe ran.
- **Recommendation:** (a) way 1, the union rule as you read it for `typecase`; (b) way 4 for now, with a measurement of way 3's shape and cost before it is put to you again.
- **Default:** (a) yes; (b) no. Rung C runs at these.

### Q49. Item 49: `TrivialOpenRange`'s five methods, row 656, 5 sites

- **Blocks:** 5 of rung R's 9 sites.
- **On file:** PLAN item 49; row 656; batch 11's rung L, decision 7 and section 10 (`compile-ladder/rung-range-types/REPORT.md`). No default on record.
- **Terms.** `(:)` is the open range, "everything": `a[:]` is all of `a`, at any rank. Its one value is the object `TrivialOpenRange`, which extends `OpenRange[\Any\]` (`Library/FortressLibrary.fss:3869-3885`). Its five methods cut or stride it: `truncL(x)` keeps what is at or after `x`, `truncR` what is at or before, `every(s)` and `imposeStride(s)` keep every `s`-th index, `atMost(k)` the first `k`. Generics are invariant: a `LeftRange[\ZZ32\]` is not a `LeftRange[\Any\]`.
- **Type theory.** An object extending `OpenRange[\Any\]` inherits each method at `I = Any`: parameters of type `Any`, results that are ranges over `Any`. `#`, `:` and `::` take a `ZZ32` or a tuple, not an `Any`, and no range of a `ZZ32` kind is a range over `Any`. So no body can meet these declarations; only a body that answers nothing, `fail`, types.
- **Today.** Walk answers each, dispatching on the run-time value: `(:).truncL(3)` is `LeftScalarRange(3,1)`; its `cast` of the same refuses (`CastError`, `FortressLibrary.fss:36`). The checker refuses all five: "Could not check call to operator # - (ZZ32, ZZ32)->LeftRange[\(ZZ32, ZZ32)\] is not applicable to an argument of type Any" (`:3873-3879`). No gated program calls them: a grep of `ProjectFortress/tests/` for `(:)` finds only `RangeDeclarations.fss:122`, which pins `(:) CMP (:)`; the library's indexed types take `(:)` by its own type, `opr[_:TrivialOpenRange]` (`FortressLibrary.fss:1883`, `:1913`, `:1988`; the api's array subscripts), not through these methods.
- **The specification.** Silent: it describes `#s` only as an implicit subscript range and no method of the open range (`Specification/basic/expressions/ranges.tex`, section "Ranges").
- **The library's own way.** A body that its declared type cannot hold is a `fail` with a message: the team's `else => fail("Library error: ...")` in `FullRange.narrowToRange` (`FortressLibrary.fss:3944`, a line of 2012 by `git blame`; `RangeInternals.fss` at the team's last commit `a874948ac` has seven such bodies) and batch 11's `BoundedRange2D` and `BoundedRange3D` meets (rung L's decision 1, `Library/RangeInternals.fss:593-608`). Where a body could answer, rung L kept the value (`TrivialOpenRange`'s own `CMP`, decision 5). The object's role as the subscript marker is the team's (`:1883`).
- **The peers.** No survey is on file. By reading, Julia's bare `:` in a subscript is the marker object `Colon()`, and NumPy's is a `slice`; neither is a range one can cut or stride.
- **The commits.** Batch 7R made the scalar ranges `ZZ32` only (`65f1e40ca`); batch 11's rung L (`b872d65a1`) gave the object its `CMP` and left the five methods for you (decision 7).
- **The derivation.** "The library's own practice is the standard" points to `fail`. A value walk prints changes only by your word, and the five are such values, so the choice is yours. The true zero needs the five sites.
- **The ways.**
  - (a) `fail` bodies with a message naming the open range: the five sites clear; `(:).truncL(3)` and its four siblings become stops. The library's own way.
  - (b) Left: the five sites stay, the one place the checker can never accept as written.
  - (c) `(:)` typed over `ZZ32`: `object TrivialOpenRange extends OpenRange[\ZZ32\]`, the five methods at `ZZ32` with today's values. But `(:)` is then no `Range[\Any\]`: its `INTERSECTION`, `IN`, `=` and `CMP` with a range of rank 2 or 3, and any generic code that takes it as a `Range[\I\]` for a tuple `I`, may change under walk. Unmeasured; probe P3 (section 5) measures it if you want (c).
- **Recommendation:** (a).
- **Default:** (a). If you answer (b), rung R leaves the five sites and loses nothing else; if (c), rung R waits for P3.

### Q50. Item 50: the bounds check of a range of rank 2 or 3, row 657, a value walk prints

- **Blocks:** no site. Rung R clears row 655's 2 sites either way; your answer decides the value.
- **On file:** PLAN item 50; rows 655 and 657; rung L's decision 6 and section 10; today's value pinned at `ProjectFortress/tests/RangeKindBodies.fss:94`. Rung L recommends the repair.
- **Terms.** `r.narrowToRange(other)` is the part of `other` inside `r`, and it raises `IndexOutOfBounds` when `other` reaches outside `r`; `checkSelection` (`Library/RangeInternals.fss:125-138`) is that check. A bound of a rank-2 range is a pair. Lexicographic order compares the first components, then the second on a tie. Point by point compares each component on its own axis; `PCMP` (`RangeInternals.fss:113`) does that.
- **Type theory.** A box, the product of one interval per axis, is inside another when each interval is inside its own axis's: point by point. Lexicographic order is a total order on pairs and says nothing about containment: `(2,-1) > (0,0)` lexicographically, though `-1` is below `0` on the second axis.
- **Today.** Walk answers `((0,0):(9,9)).narrowToRange((2,-1):(5,5))` as `(2,0):(5,5)` and reports no bound outside, while `(-1,2):(5,5)` raises; the `>` and `<` on pairs dispatch to the library's lexicographic tuple order (`FortressLibrary.fss:4436-4525`). The checker refuses both comparisons on `I` (row 655, `RangeInternals.fss:129`, `:133`).
- **The specification.** Silent: no range of rank 2, and `narrowToRange` is the library's.
- **The library's own way.** The ranges' own order compares point by point: `PCMP` on pairs and triples, `SYMMETRIC_PARTIAL` of the components (`RangeInternals.fss:99-121`). The team's comment at `narrowToRange` names the minimum and the maximum bound (`FortressLibrary.fss:3823-3832`). The lexicographic tuple operators serve sorting, under the team's own doubt ("Shouldn't these operators have to extend something?", row 634).
- **The peers.** No survey is on file. By reading, NumPy and Julia check a multi-dimensional index against each axis's bounds apart.
- **The commits.** Batch 9's rung R (`631fb867e`) kept `checkSelection` generic; batch 11's rung L (`b872d65a1`) left it, since its callers include rung E's site, and recorded rows 655 and 657.
- **The derivation.** Your answer to item 40 (batch 11's Q3, way (a)) moves the generic range bodies to the `ZZ32` kinds; `checkSelection` moves with its callers. At rank 2 and 3 the moved body must name an order: "The library's own practice is the standard" gives the ranges' own, `PCMP`. A value walk prints changes, so it is yours.
- **The ways.**
  - (a) `PCMP` at the `ZZ32` kinds of rank 2 and 3: `(2,-1):(5,5)` raises `IndexOutOfBounds`; the pin at `RangeKindBodies.fss:94` changes to the raise, its before and after listed for you.
  - (b) The move with the tuple `<` and `>` kept: today's value, row 657 stays open.
- **Recommendation:** (a), rung L's.
- **Default:** (a).

### Q5. The self-typed bodies, 30 sites: not decidable yet

- **What they are.** A self-typed trait is a generic trait whose parameter stands for the type itself, `trait Integral[\I extends Integral[\I\]\]`. Its bodies return `self` where the declared type says `I`, as `floor(self): I = self`. The checker types `self` as `Integral[\I\]`, not as `I`, and refuses the body. Walk runs them.
- **The sites.** Three families on the landed list: the orders' and `AdditiveGroup`'s bodies (`Library/FortressLibrary.fss:223-360`, 18), `Integral`'s (`:685-721`, 8) and `StandardMutableArrayType`'s (`:2175-2187`, 4).
- **Why they wait.** Your answer to batch 8's Q2: "the class waits until there is better information". No list of ways is on file; what is on file covers parts (`reviews/anyintegral-comprises-judgement.md`, way 3; FACTS, "Route C built whole as a shadow"; `reviews/mie-probes/patents-forest-rule.md`; `reviews/mie-probes/literature.md`).
- **What it needs before you can decide.** A ways worker that lists every way the language and the library offer for the three families and measures each on a shadow of the base; a top-tier judgement on that list, in the nine-step form (the coordinator may run it without asking once the list is on file, POSITIONS, "The Fable rule."); your answer; then a later batch. P1's probe is the model, with a bound on waits (`coordinator/process-engineering/p1-cost.md`).
- **Question for you now:** none. Batch 12 leaves the 30 out.

### Questions on file that this batch does not need

Each is yours, with its sites and where it is asked. None blocks batch 12; each adds sites to a later batch.
- Item 38: when the checker checks symbolic operators, and which device `String`'s four operator families take (row 585, 3 sites: `FlatString.fss:12`, `FortressLibrary.fss:4219`, `:4220`; row 611, walk's side).
- Item 42: `String`'s `left` and `right` (row 606, 2 sites).
- Item 43: the tuple comparisons and `LexicographicOrder` (row 634, 18 sites).
- Item 44: `QQ`'s `ceiling` and `truncate` (row 635, 2 sites).
- Item 45: a size or index read from a `Generator` (row 629, 9 sites).
- Item 46: `__bigOperator2`'s fused arm (row 632, 1 site).
- The negative power of an integer (rows 438, 441 and 445; PLAN, "Raised by climb batch 6's rung T, the number chapters"): 6 sites wait on it, `QQ`'s `^` (`FortressLibrary.fss:639`, `:640`) and the integer `^` answering `RR64` in `strToInt` and `strToFloat` (`:4366`, `:4382`).
- Row 582, `isLeftZero`: the count's one error, 2 sites of the distance.
- Row 631, `embiggen`: its typed form changes a declared type in the team's test `ProjectFortress/tests/WordCountSmall.fss:76`, a team test line (1 site, `FortressLibrary.fss:3557`).
- D5's reach and row 591's entry (PLAN, "Climb batch 9, listed for his review"): rows 612 and 616 wait on them.
- D2's case (PLAN, "Climb batch 9, listed for his review", D2's entry, with batch 11's two sentences): a big operator's parameter that is not F-bounded stays at `Bottom` under walk when nothing fixes it; row 645, the empty unwritten reduction over a type other than `ZZ32` getting `ZZ32`'s identity, waits with it. Probe P2 (section 5) measures what D2 does to rung G; it decides nothing about D2 itself.
- Row 650: should the code generator accept the modifier `override` (PLAN, "Climb batch 11, listed for his review")? Row 653's compiled half and row 610's owed compiled run wait on it.
- Row 659: a bounded range of rank 2 or 3 strided backwards on some axes and forwards on the others, a stop to leave or a design to ask for (the same list). Default: as landed.
- The name `OPEN`, the open type's dispatch, the skeptic's contested rule and the ledger tool's three missing writes (gather.1): the same list, each with its default as landed.

## 3. The rungs

Line numbers are on `f9d3ec826`, whose `Library/`, `ProjectFortress/` and `Specification/` are those of `main` at `ae93dd1ae`. Site counts are by reading the landed per-site list, grouped by row. Each rung's tests come first: written, run through the harness on the base and seen failing, and committed before the edit. A value that matters is asserted inside the test (POSITIONS, "The suite's verdict is the check.").

### W. Walk: three load checks (rows 647, 649 and 653's walk half) and a top-level object expression (row 648)

**The answers this rung follows.** None of the curator's open questions touches this rung. Rows 614 and 615 stand as landed (PLAN, "Climb batch 10, listed for his review", row 615's entry): a trait's override declarations override for every type below it, and walk counts as not inherited only what a type's own override declarations override. Where this section says "you" or "your", it means the curator.

**Rows.**
- Row 649: an object that inherits an abstract method and declares no body for it loads, and the call stops with an InterpreterBug, '... has neither body nor def'; the traits chapter makes the program a static error ("any object inheriting an abstract method must define a body expression for the method", Specification/basic/traits.tex:571). Walk's load checks read no abstract method (BuildEnvironments.checkFunctionalMethodMeets, checkComprisesClauses); row 614's repair reaches the case anew. The fix is a load check where walk builds an object's methods from what its traits provide (values/Constructor.java, finishInitializing at :154-270, overriddenInTraits at :448, accumulateEnvMethods at :535): every inherited abstract method has a body in the object or in a trait it extends, else a refusal at load. It covers object expressions, which walk lifts to objects.
- Row 653, walk's half: a method declaration with the modifier override that overrides no inherited declaration loads and runs, where the chapter says "It is a static error if a declaration with the modifier override does not override any inherited declaration" (traits.tex:594-595). The fix is a load check beside row 614's bookkeeping (Constructor.overriddenInTraits computes what each trait's override declarations override): an override that overrides nothing is refused at load. The checker's half waits on row 650 (section 4).
- Row 647: the load check of the Meet Rule for Functional Methods skips every type with static parameters (checkFunctionalMethodMeets visits declarations without static parameters, interpreter/evaluator/BuildEnvironments.java:1214-1221; finishObjectTrait checks an object expression only without them, :993), so a generic object, and an object expression inside a generic function, extending two traits that each declare pick(self) with no declaration on the meet load and run A's pick. The rule covers declarations "occurring in trait or object declarations or object expressions" (Specification/advanced/overloading.tex, section "Meet Rule"). The fix checks the generic declaration too, over its own static parameters or at the instantiation walk makes; the worker says which and why, and reports the cost on the library's load.
- Row 648: a top-level variable initialised with an object expression stops the program at load, 'Missing value: *objectexpr_ObjectExpr', since CUWrapper.initVars binds the lifted constructors (registerObjectExprs) after it visits the component's variables (interpreter/env/CUWrapper.java:272-286). The fix binds them first. The text: Specification/basic/expressions/object.tex, section "Object Expressions".
- Notes, not repairs: row 570 (the checker's half of rows 618 and 647: the compiled overloading checker checks no object expression per provider); row 650 (row 653's compiled half waits on it); row 615 (the landed reading, which row 653's check follows: an override overrides what the type's own traits provide).

**Distance sites.** None. The count and distance stages do not read walk (FACTS, "The checker-count and distance stages read only the compiler's phases ..."). What moves is walk's refusals at load.

**Files.** Under ProjectFortress/src/com/sun/fortress/interpreter/:
- evaluator/BuildEnvironments.java (checkFunctionalMethodMeets, finishObjectTrait) and evaluator/values/OverloadedFunction.java (FunctionalMethodMeets), for row 647;
- evaluator/values/Constructor.java (finishInitializing, overriddenInTraits, accumulateEnvMethods), for rows 649 and 653;
- env/CUWrapper.java (initVars, registerObjectExprs), for row 648;
- new and promoted files in ProjectFortress/tests/.
- Not: the library, the checker, the test harness.

**Tests, first.**
- Row 649: ProjectFortress/tests/XXXAbstractMethodUndefinedWalk.fss and its .test promoted, the refusal at load named in load_exception_contains=. One more case in the same file or beside it: an object expression inheriting an abstract method with no body, refused alike.
- Row 653: the owed expected failure written first, ProjectFortress/tests/XXXOverrideNothingWalk.fss with a .test keyed load_exception_contains= on the refusal's message, green while walk loads and runs the program (the skill's tests-writing.md, "Where a test goes, and how it passes"); then promoted when the check lands. Its program: trait A with f(x: ZZ32): String = "A", object B extends A with override f(x: String): String = "B", as row 653's note gives it.
- Row 647: ProjectFortress/tests/XXXFunctionalMethodMeetGenericProviderWalk.fss and its .test promoted, the refusal at load named (as FunctionalMethodMeetObjectExpressionWalk names it, load_exception_contains=Invalid overloading of pick).
- Row 648: ProjectFortress/tests/XXXObjectExpressionTopLevelVariableWalk.fss promoted, the variable's value asserted.
- Keep their verdicts: FunctionalMethodMeetObjectExpressionWalk, OverrideInTraitWalk, FunctionalMethodOverrideOtherPathWalk (row 615's pin); the team's disp0.fss, disp1.fss and FunctionalMethodMeetProvided.fss, which declare override on objects; the expected failures of rows 591, 592, 612 and 616.
- After the edit: the interpreter suite once (ant testSystem), since every load check reads every component walk loads, the one library among them; ant testSpecData is the gate's.

**Specification.** None. The texts already make rows 649 and 653 static errors, the Meet Rule already covers object expressions and generic declarations, and row 648 is a defect against "Object Expressions". A grep of Specification/ for these rows' numbers finds none.

**Overlaps by file.**
- No other rung edits walk.
- ProjectFortress/tests/: R and G add distinct files.

### C. The checker: the expected type at a label body (row 642, under Q48) and at a repeated operator (row 644), and a crash on a written static argument (row 651)

**The answers this rung follows.** Q48 is not yet answered; this rung runs at its defaults (section 2): part (a) yes, so row 642 is this rung's and every line marked "under Q48" applies; part (b) no, so row 455's argument faces stay as the expected failure XXXInferContextDrops and no line marked "under Q48(b)" applies. If the curator answers (a) no, the lines marked "under Q48" are dropped and XXXInferResultOnlyLabelBody keeps its verdict. Where this section says "you" or "your", it means the curator.

**Rows.**
- Row 644: the checker gives no expected type to an operator repeated between three or more operands that no multifix declaration accepts. SAmbiguousMultifixOpExpr (scala_src/typechecker/impls/Operators.scala:382-387) tries the multifix application and then the left-associated binary ones, both with no expected type, so the outer application's result-only parameter takes its bound: with opr OPLUS[\T\](a: Any, b: ZZ32): BoxV[\T\], y: BoxV[\ZZ64\] = 1 OPLUS 2 OPLUS 3 is refused, 'Right-hand side has type BoxV[\Object\], but declared type is BoxV[\ZZ64\].', where 1 OPLUS 2 checks. The fix mirrors the loose juxtaposition's since rung E (:170-197): try the multifix application with the expected type, else check the left-associated applications with it. The chapter's sentence after its list of contexts gives an operator application the expected type (Specification/basic/inference.tex:143-145), and Appendix I's entry "The contexts that give a call an expected type" says the checker gives none to a repeated operator (Specification/appendices/changes.tex:2047-2051, which names row 644): a sentence this repair makes false, amended whatever Q48's answer.
- Row 651: an invocation of a dotted method with its static arguments written, one of whose type parameters is bounded by a type at another, stops the checker, 'R is not in the kind env'. staticArgsMatchStaticParamsForApp (scala_src/useful/STypesUtil.scala:771-794) checks each written argument against its parameter's bound with the other written arguments not put in; the fix substitutes them, as StaticTypeReplacer does elsewhere. Two expected failures pin it: XXXMethodStaticArgsBoundNamesOther (rung C's) and XXXMethodStaticArgsBoundNamesOtherSameName (rung E's skeptic's, the same-name shape that the base accepted only through row 627's capture).
- Under Q48, row 642: the checker checks the body of a label with no expected type (impls/Misc.scala:706, newChecker.checkExpr(body)), so a call that ends the body and whose type parameter only its result mentions takes the bound Any. The fix passes the label's expected type into the body and, by the same union rule, into the with values of its exits. One site: Library/String.fss:431, SubString.verify, a typecase ending a label body.
- Under Q48(b) only: row 455's two argument faces. Not this rung's at the default.
- Notes, not repairs: row 455 (the argument faces stay with it); row 560 (item 36 complete under Q48, its thirteenth site); row 627 (row 651's second shape came from its renaming, which is right).

**Distance sites.** Row 642, 1 site, String.fss:431, under Q48. Rows 644 and 651: none on the one library; their programs are tests. By row, not class (row 577).

**Files.** scala_src/typechecker/impls/Operators.scala (SAmbiguousMultifixOpExpr, :382-387, against the juxtaposition at :170-197); scala_src/useful/STypesUtil.scala (staticArgsMatchStaticParamsForApp, :771-794); under Q48, scala_src/typechecker/impls/Misc.scala (the label at :706 and the exit case near it); new and promoted files in ProjectFortress/compiler_tests/. Not: the library, walk, the overloading checker (providedAndOverridden, row 653's compiled half waits on row 650), the disambiguator.

**Tests, first** (each through junit.sh on the base):
- Row 644: XXXInferRepeatedOperatorContext promoted to a name by topic, compiling and its value asserted.
- Row 651: XXXMethodStaticArgsBoundNamesOther and XXXMethodStaticArgsBoundNamesOtherSameName promoted, each compiling and printing its value (1 and 11, as the rows give them).
- Under Q48: XXXInferResultOnlyLabelBody promoted, with one more label whose exit's with value is a result-only call, asserted.
- Keep their verdicts: InferLooseJuxtContext, InferResultOnlyIfWithoutElse, InferResultOnlyAfterLocalDecl, InferResultOnlyTypecaseBranch, MethodStaticArgReceiverSameName, InferDependentBound, InferBigOperatorUnwritten, the inference tests of batches N, 8 and 10; XXXInferContextDrops (row 455) at the default; the ladder's 85 files.
- After the edit: the compiler and library test tracks once; the count and distance stages once.

**Specification.** Row 644, whatever Q48's answer: the Appendix I entry "The contexts that give a call an expected type" (Specification/appendices/changes.tex:1984-2082) says at :2047-2051 that the checker gives no expected type to an operator repeated between three or more operands that no multifix declaration accepts, naming row 644; the sentence is amended in the S1 form with the reason and the row (POSITIONS, "Every change to the specification is recorded with its reason."; "The S1 form"). The chapter itself changes nothing for row 644: its sentence after the list already gives an operator application the expected type (Specification/basic/inference.tex:143-145). Under Q48, in the inference chapter: the list of contexts with an expected type (:128-142) gains the body of a label expression and the with values of its exits; the "not yet described" item (:266-268) loses the label body and keeps the argument of another call and the body of a for loop; and the same entry's sentences at :1998-2001 and :2043-2046, which name the label body as outside the list, are amended with row 642. Row 651: none; no passage names the crash.

**Overlaps by file.**
- No other rung edits the checker or the specification.
- ProjectFortress/compiler_tests/: C alone.

### R. The library: the ranges' last generic bodies (rows 654, 655 and, under Q50, 657), the open range's five methods under Q49 (row 656), and two slips (rows 658 and 608)

**The answers this rung follows.** Q49 and Q50 are not yet answered; this rung runs at their defaults (section 2): Q49 way (a), fail bodies, so row 656 is this rung's and every line marked "under Q49" applies; Q50 way (a), point by point, so row 657's value change is this rung's and every line marked "under Q50" applies. If the curator answers Q49 (b), the lines marked "under Q49" are dropped and the five sites stay; if (c), they wait for probe P3 and the rung runs without them. If the curator answers Q50 (b), the moved bounds check keeps the tuple order and the pin at RangeKindBodies.fss:94 keeps today's value. Item 40's answer stands (batch 11's Q3, way (a); POSITIONS, "The order of the work after batch 10."): the generic range bodies move to the ZZ32 kinds of rank 1 to 3. Where this section says "you" or "your", it means the curator.

**Rows.**
- Row 655, 2 sites: checkSelection, the bounds check behind narrowToRange (Library/RangeInternals.fss:125-138), compares its ranges' bounds with > and < on the index type I, which declares neither (:129, :133). Its three callers are generic: Range.narrowToRange(other: Range[\I\]) (Library/FortressLibrary.fss:3839-3840), BoundedRange's (:3909-3910) and FullRange's (:3940-3946, rung E's site in batch 11, now landed); the OpenRange overloads beside them (:3841, :3908, :3939) call no check. Under item 40's way (a) the comparisons move to the ZZ32 kinds with the callers: the generic traits declare narrowToRange abstract (api Library/FortressLibrary.fsi:2180-2181, :2232-2233, :2262-2263; RangeInternals.fsi:42) and the ZZ32, pair and triple kinds of rank 1 to 3 hold the bodies, with checkSelection at each index type, as batch 11's rung L moved CMP, FORWARD_CMP and |self| (FACTS, "The one library's range types provide a declaration on the meet ..."). Not taken by rung L, and not here: a typecase on (this, other) inside the generic function; overloaded helpers with a generic fallback (its decision 6).
- Under Q50, row 657: the rank-2 and rank-3 bounds checks compare point by point with PCMP (RangeInternals.fss:113), not in the tuples' lexicographic order (FortressLibrary.fss:4436-4525), so ((0,0):(9,9)).narrowToRange((2,-1):(5,5)) raises IndexOutOfBounds where it answered (2,0):(5,5). A value walk prints changes; the pin at ProjectFortress/tests/RangeKindBodies.fss:94 changes with it, its before and after listed for you.
- Row 654, 1 site: FullRange.narrowToRange(other: OpenRange[\I\]) (FortressLibrary.fss:3939) declares FullRange[\I\] and answers self INTERSECTION other, which the library types BoundedRange[\I\]. Widening it breaks the return-type rule against its sibling narrowToRange(other: Range[\I\]): FullRange[\I\] (:3940). The repair, now that rung E has landed: the sibling's typecase on FullRange[\I\], whose else branch E's change types; or a FullRange meet over an OpenRange; or, with row 655's move, a body at each ZZ32 kind. The worker takes the library's own way and says why. Walk answers today: (0:9).narrowToRange(::2) is 0:8:2 (RangeDeclarations.fss:104), a value to keep.
- Under Q49, row 656, 5 sites: TrivialOpenRange's truncL, truncR, every, imposeStride and atMost (FortressLibrary.fss:3873-3879) apply #, : and :: to an Any and declare ranges over Any, which no range of a ZZ32 kind is. Way (a): fail bodies with a message naming the open range, as the team's else in FullRange.narrowToRange (:3944) and batch 11's BoundedRange2D and BoundedRange3D meets (RangeInternals.fss:593-608) do. Five values walk prints become stops, listed for you with their values today ((:).truncL(3) is LeftScalarRange(3,1), and the other four).
- Row 658: PrefixSet declares no indices, so IndexValuePrefixSetGenerator.indices, which reads s.indices (Library/PrefixSet.fss:478), stops walk on every prefix set, "Cannot find definition for method indices given receiver fastPrefixSet". The repair is 0 # |s|, the shape of ZeroIndexed's bounds (FortressLibrary.fss:1909), the precedent line this rung cites, under the library rule (the archaeology's section 5: write the missing one in the shape of the one the library has, and cite that line). No new api declaration.
- Row 608, 1 site: ImmutableArray1's opr[r: Range[\ZZ32\]] reads r'.lower (FortressLibrary.fss:2255), which FullRange[\ZZ32\] does not declare. The repair is r'.left.get, as its twin in Array1 reads (:2313), the stride kept as the twin keeps it (m = r'.stride).
- Notes, not repairs: rows 599 and 600 (closed; their last sites are rows 654 to 656); row 577 (the classes, again); row 634 (the tuple order the moved check leaves, under Q50); row 659 (a stop this rung does not touch).

**Distance sites.** Row 654 1, row 655 2, row 656 5 (under Q49), row 608 1: up to 9. By row, not class (row 577). Rows 657 and 658 have no site; row 657 is the value, row 658 a walk stop.

**Files.**
- Library/FortressLibrary.fss, the ranges section (:3806-3960) and :2255; Library/FortressLibrary.fsi, the ranges section (:2163-2276).
- Library/RangeInternals.fss and .fsi (checkSelection and the ZZ32, pair and triple kinds).
- Library/PrefixSet.fss (:478).
- New tests and the changed pin in ProjectFortress/tests/.
- Not: the reductions section of FortressLibrary (G's, :3080-3500 and .fsi:1860-2030); Library/Set.fsi (G's); the checker; walk; the team's test lines, but the pin under Q50, which is the revival's (batch 11's rung L).

**Tests, first.**
- Rows 654 and 655: the count and distance stages are the failing-then-passing test, before from batch 11's landed tables, after once on the rung's tree, read by row. Beside them, one walk test calling each moved narrowToRange body at rank 1, 2 and 3 with today's values, passing before and after; RangeDeclarations.fss:104 already pins (0:9).narrowToRange(::2).
- Row 657 under Q50: the pin at RangeKindBodies.fss:94 changes to the raise, caught and asserted, failing on the base; its before and after listed for you.
- Row 656 under Q49: one walk test that asserts today's five values before the edit and, after it, asserts the five stops, each caught with its message.
- Row 658: one walk test of ps.indexValuePairs.indices on a prefix set, failing on the base (the stop) and passing after, its values asserted.
- Row 608: the stage as the test, and one walk test of ImmutableArray1's range subscript with a stride, today's value, passing before and after.
- Keep their verdicts: RangeDeclarations, RangeKindBodies (but the pin under Q50), RangeBoundedEveryForward, IndicesGetterCalls, the team's range tests.
- After the edit: the interpreter suite once, since walk reads the library.

**Specification.** None. The text describes no range of rank 2 and no method of the open range (Specification/basic/expressions/ranges.tex, section "Ranges"), and narrowToRange, checkSelection and PrefixSet are the library's. Part IV is rendered from the api files, so abstract declarations reach it when the PDF is rebuilt.

**Overlaps by file.**
- G edits Library/FortressLibrary.fss and .fsi too, in the reductions section only (:3080-3500; .fsi:1860-2030), hundreds of lines from R's declarations; no declaration is both rungs'.
- ProjectFortress/tests/: W and G add distinct files.

### G. The library: the reductions' three Any devices typed at the element type (row 628)

**The answers this rung follows.** None of the curator's open questions touches this rung. It runs on probe P2's outcome (i) (section 5, "Before the launch"), measured on 2026-10-09 under walk on the base build (fe74fb738) and on shadows seeded from it, none of them committed: outcome (i) on the typing completed by the three edits below, which the rung makes; the typing as Rows words it alone would have given outcome (iii). Of this section's 22 candidates, the unwritten clause form of 12 runs on the base over a non-empty generator: BIG MIN[i <- 0#4] (3 - i) is 0, BIG MAX[i <- 0#4] i is 3, SUM[i <- 0#4] i is 6, PROD[i <- 1#3] i is 6, BIG AND[i <- 0#4] (i < 4) is true, BIG OR[i <- 0#4] (i = 2) is true, BIG BITXOR[i <- 0#3] i is 3, BIG ||[i <- 0#3] i is "012", BIG |||[i <- 0#3] i is "0 1 2", BIG //[i <- 0#3] i is ("0" // "1") // "2", BIG LEXICO[i <- 1#2] (i CMP 1) is GreaterThan, and Map's BIG UNION[i <- 0#3] {[\ZZ32,ZZ32\] i |-> 10 i} has 3 entries, 20 at key 2. The rung's first test is these 12 in one program, each value asserted; that program passed on the base and on the completed shadow, run directly and through harness-one.sh at four threads. The other 10 stop on the base and stay out of the test: BIG MIN_MIN, BIG MIN_MAX, BIG MAX_MIN, BIG MAX_MAX and Set's BIG INTERSECTION at the abstract simpleJoin(a:Any, b:Any) ('has neither body nor def', as BIG MINMAX does, row 473), Set's BIG UNION at join (Set[\OPEN\] given a NodeSet[\ZZ32\]), and BIG SQCAP, BIG SQCUP, List's BIG CONCAT and PrefixSet's BIG UNION at join, a parameter at BOTTOM (D2's case; PureList's BIG CONCAT the same). The typing as Rows words it, types alone and every body kept (56 lines in the four files and Generator22D.fss:207), stops three identity-less operators that run on the base: BIG MIN and BIG MAX ('join param 1 (a:Maybe[\OPEN\]) got arg Just[\Int\]') and BIG // ('(a:Maybe[\String\]) got arg Just[\FlatString\]'), since walk's Just(r) takes the run-time class of r and walk's generics are invariant; 13 of the interpreter suite's 526 tests fail on it, written forms too (BigMinMax.fss). Three more edits in the rung's files complete the typing, each as the api or the library already writes it, and on them no operator that runs on the base stops and every value stays: ActualReduction's abstract lift(r: Any): L (Library/FortressLibrary.fss:3062) at lift(r: R): L, as the api declares it (.fsi:1869), else walk picks that abstract declaration over a typed lift ('lift(r:Any):L ... has neither body nor def', simpleSum.fss); Just[\R\](...) for Just(...) in the lifted bodies, AssociativeReduction's join and lift and LiftedCommutativeMonoidReduction's empty, join and lift, as the empty case already writes Nothing[\R\]; and MinReduction's and MaxReduction's simpleJoin(a, b) (:3291, :3300) at simpleJoin(a: T, b: T): T, as the api declares them (.fsi:1979, :1987), else walk picks the abstract simpleJoin(a: R, b: R) (batch 10's measured stop). The monoid operators that stop on the base stop on the completed shadow too, now at the typed lift, so no new stop is at a monoid operator, every line marked "under P2(b)" applies, and the rung takes all 13 sites. On the completed shadow the interpreter suite has 4 failures of 526, each a test line the typing reaches and a point to report: XXXUnwrittenBigMinMaxWalk.fss passes, since BIG MINMAX and the four tuple forms unwritten now answer, (0, 3) over 0#4 and (0, 0), (0, 2), (1, 1) and (1, 3) over (i MOD 2, i) for i in 0#4, so row 473's open half moves and the test's promotion is the rung's; GeneratorDeclarations.fss:14 names AnyMaybe in __bigOperator2's static arguments, Maybe[\ZZ32\] there; and the team's HeapTest.fss:80 and RangePrototype.fss:336-337 name AnyMaybe as generate's static argument, Maybe[\(ZZ32,ZZ32,ZZ32)\] there, RangePrototype's StrideReduction also declaring simpleJoin(l:Any, r:Any): Any (:213), which takes (ZZ32,ZZ32,ZZ32) for both parameters and its result; so written, the three pass on the completed shadow. An operator that stops on the base too is not this rung's. The curator's answer to batch 11's Q1 stands (POSITIONS, "The order of the work after batch 10."): walk leaves an F-bounded type parameter open where nothing at a call fixes it, which is what lets these reductions run once typed. Where this section says "you" or "your", it means the curator.

**Rows.**
- Row 628, 13 sites: the identity-less reductions keep three devices typed Any so that walk's reductions ran while walk gave an unwritten static argument Bottom. They are AssociativeReduction's abstract simpleJoin(a: Any, b: Any): Any (Library/FortressLibrary.fss:3116; api Library/FortressLibrary.fsi:1907), where its eight implementers declare simpleJoin at the element type, so the checker reports the abstract method as not implemented in each (8 sites, :3289, :3298, :3307, :3338, :3358, :3378, :3398, :3496); the lifted type AnyMaybe (AssociativeReduction[\R\] extends ActualReduction[\R,AnyMaybe\], :3104; LiftedCommutativeMonoidReduction, :3129), which is no Condition, so the generator binding if av <- a cannot bind in join (4 sites, :3107, :3119, :3133, :3144); and lift(r: Any) in AssociativeReduction (:3117) and, under P2(b), in MonoidReduction (:3162) against the api's lift(r: R) (.fsi:1908, :1920) (1 site, :3162). The fix, as the row says: simpleJoin(a: R, b: R): R and lift(r: R) (MonoidReduction's under P2(b)), and the lifted type Maybe[\R\] where AnyMaybe stood: in the two traits, in LiftedCommutativeMonoidReduction, and in the declared types of the identity-less big operators and their sugar (.fsi:1982-2027, :2114, with the component's BigReduction[\T,AnyMaybe\], __bigOperatorSugar[\T,T,T,AnyMaybe\] and Comprehension[\...,AnyMaybe\] lines) and Set's BIG INTERSECTION (Library/Set.fsi:64-66, Set.fss:128-132). The trait AnyMaybe itself stays: Maybe extends it and HasRank excludes it (.fsi:947-964, :1195).
- The precedent, under the library rule (the archaeology's section 5): the api already declares lift(r: R) in both traits, and Set's Intersection already names Maybe[\Set[\E\]\] as its lifted type (ReductionWithZeroes[\Set[\E\],Maybe[\Set[\E\]\]\], Library/Set.fss:134-136). This rung extends nothing; it types what the library has at the type its api and its sibling already write.
- Notes, not repairs: row 433 (the fusion pairs' distribute declares PossibleReductionPair[\AnyMaybe\]; it follows the lifted type's spelling where that type changes, and its ill-formed bounds stay, so its six sites stay and its two distribute sites are a point to report if they move); row 473 (BIG MINMAX's open half, XXXUnwrittenBigMinMaxWalk.fss, keeps its verdict or moves: a point to report); row 645 (the empty reduction's identity, not this rung's); rows 424 and 425 (what made the devices necessary and what still refuses an unwritten reduction compiled); row 436 (the identities' else => 0, not this rung's); row 631 (embiggen's Comprehension[\T,T,Any,Any\], a team test line, not this rung's); D2's entry (the plain-bounded big operators, which P2 measured).

**Distance sites.** 13, all in component FortressLibrary, row 628's: 8 abstract-method, 4 typecheck at the generator bindings, 1 at lift. The stage files them under the abstract-method kind and OT; by row, not class (row 577).

**Files.**
- Library/FortressLibrary.fss, the reductions section (:3080-3500): AssociativeReduction, LiftedCommutativeMonoidReduction, MonoidReduction (under P2(b)), the eight implementers, the identity-less big operators' declared types and sugar.
- Library/FortressLibrary.fsi (:1904-1910, :1919-1921, :1982-2027, :2114).
- Library/Set.fsi (:64-66) and Library/Set.fss (:128-132); Library/Generator22D.fss:207 and Library/QuickCheck.fss:758, which name the lifted type, if the type they name changes.
- New tests in ProjectFortress/tests/.
- Not: the ranges section of FortressLibrary and RangeInternals (R's); Library/PrefixSet.fss (R's); the identities (additiveIdentity, multiplicativeIdentity, :3200-3240); the checker; walk.

**Tests, first.**
- The count and distance stages are the failing-then-passing test, before from batch 11's landed tables, after once on the rung's tree, read by row: the 13 sites gone and no site come.
- One walk test, P2's program handed to the rung as its first test: the unwritten clause form of each library big operator whose reduction inherits a typed device and whose form P2 found running on the base, over a non-empty generator, each value asserted. The candidates are BIG MIN, BIG MAX, BIG MIN_MIN and its three siblings, SUM, PROD, BIG AND, BIG OR, BIG BITXOR, BIG SQCAP, BIG SQCUP, BIG ||, BIG |||, BIG //, BIG LEXICO, Set's BIG UNION and BIG INTERSECTION, List's BIG CONCAT, Map's and PrefixSet's BIG UNION; P2's base run says which of them the test holds, and one that stops on the base stays out with a note. BIG MINMAX is out already: its unwritten form stops on the base (row 473, XXXUnwrittenBigMinMaxWalk.fss, green while the run fails). The test passes before and after; the two values row 628 names (BIG MIN <|[\ZZ32\] 4, 2, 7 |> is 2, BIG MIN[i <- 0#4] (3 - i) is 0) are among them.
- Keep their verdicts: BigMinMax.fss; batch 11's rung W's promoted tests of the unwritten reductions; XXXUnwrittenBigMinMaxWalk.fss (row 473) and row 645's expected failure; the team's simpleSum.fss and setSum.fss; GeneratorDeclarations.fss, SetTest.fss, ListTest.fss, MapTest.fss.
- After the edit: the interpreter suite once, since walk reads the library; the count and distance stages once.

**Specification.** None. A grep of Specification/ and of the skill's parts for AnyMaybe and simpleJoin finds no sentence; the reductions chapter (Specification/basic/expressions/reductions.tex, section "Summations and Other Reduction Expressions") describes the operators, not the library's lifting. The row's citation of the if chapter is the generator binding the typed lifted type lets the checker read (Specification/basic/expressions/if.tex, section "If Expressions").

**Overlaps by file.**
- R edits Library/FortressLibrary.fss and .fsi too, in the ranges section and at :2255; no declaration is both rungs'.
- ProjectFortress/tests/: W and R add distinct files.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung of the same batch (PLAN, "The principle for the batches"). W is walk's, C the checker's, R and G the library's in different sections of two shared files.
- Where they meet only in a measure: R's and G's library changes both move sites of component FortressLibrary, and W's load checks and R's and G's library changes all reach the interpreter suite. The gate measures and runs the merged tree.

## 4. What the batch leaves out, each with its home

- **The arrays, 94 sites:** the array, vector and matrix sections (`Library/FortressLibrary.fss:2114-2160` 6, `:2249-2460` 24 but row 608's `:2255`, `:2620-2991` 48, `:4686-4706` 9; the four self-typed lines at `:2175-2187` lie between the first two ranges and are the 30's), `NatReflect.fss` 3, `NativeArray.fsi` 2, and `FortressLibrary`'s two export errors: the array questions after the switch-over (your answer to batch 8's Q4; PLAN item 15 and phase 5).
- **The self-typed bodies, 30 sites:** a ways worker, a top-tier judgement, your answer, a later batch (Q5).
- **Your other open items, 44 sites:** items 38, 42 to 46, the negative power (rows 438, 441, 445), `isLeftZero` (row 582) and row 631's team test line, section 2's last list.
- **`where` clauses, 12 sites:** row 433 (6), row 636 (4), row 436 (2; row 630 its duplicate), with `Maybe`'s bare `Nothing` (POSITIONS, "`Maybe`'s empty case"); no batch named (PLAN, phase 3, the `where`-clause line).
- **Row 425, 3 sites:** the checker's rewriting of a reduction by the expression's type `N`: `upto`'s and `beyond`'s `BIG MIN[i <- self.indices, self[i]=c] i` at `FortressLibrary.fss:4194` and `:4200`, and the list comprehension at `List.fss:146`: a checker project before the switch-over, not a rung (the P1 judgement, section 5).
- **Row 488, 1 site:** `BIG LEXICO(g)` at `FortressLibrary.fss:130`, which moves with the checker's query history (PLAN, "Climb batch 10, listed for his review", row 488's entry).
- **Row 455's two argument faces:** Q48's part (b), default no; a later checker rung after a measurement of the retyping's shape and cost.
- **Rows 612 and 616:** D5's question and row 591's (PLAN, batch 12's line).
- **D2's case and row 645:** a big operator's parameter that is not F-bounded left at `Bottom`, and the empty unwritten reduction's identity: the next walk rung, after your word on D2's entry (the P1 judgement, section 5; PLAN, "Climb batch 9, listed for his review"). If P2 finds the typing stopping an identity-less operator that runs today, row 628 joins them here; a monoid operator only, and its `lift` site (`FortressLibrary.fss:3162`) does, the other 12 going with G.
- **Row 653's compiled half:** the checker type checks an `override` that overrides nothing; its expected failure stops at row 650 first (the code generator's `override`), so it waits on your answer to row 650's entry (PLAN, "Climb batch 11, listed for his review").
- **Row 570, the checker's half of rows 618 and 647:** the compiled overloading checker checks no object expression per provider; code generation stops on every object expression first (row 375). A checker defect no batch has planned (batch 11's record, section 4).
- **Row 646:** a set comprehension built at its elements' run-time class under walk, information for you; no change proposed (PLAN, "Climb batch 11, listed for his review", the fourth entry).
- **Row 659:** a rank-2 or rank-3 range strided both ways, a stop; your word on whether to ask for a design (the same list).
- **Row 652, keyword parameters, and row 643, the code generator's `NoSuchMethodError`:** a language feature not built, parked beside the `where`-clause line; phase 5's code-generation list.
- **Row 555's F-bounded form:** stays open with its row (the P1 judgement, section 5).
- **Phase 4 and 5 work:** the natives rungs, Q-walk, the code-generation rows (559, 564, 565, 566, 571, 573, 594, 624, 643, 650), the compiled dispatcher's return type (PLAN, phases 4 and 5).

**What PLAN gives batch 12, and where each goes** (PLAN, phase 3 item 10):
- Rows 644 and 651, "the next checker rung": C.
- Row 455's two argument faces, queued with row 644: Q48's part (b); C only at your yes.
- Rows 647, 648 and 649, "the next walk rung", and review-routed.1's row 653: W.
- Rows 654 and 628, "the next library rung": R and G, cut by section so that no rung builds on another.
- Items 48, 49 and 50 "as he answers them": C (48), R (49 and 50), each at its default until then.
- Rows 612 and 616, D2's case: out, waiting on your entries.
- The skill's six false sentences: rewritten at `7b3226bb2` before this record; nothing for the batch.
- The two owed script edits and `classify.py` by declaration: the coordinator before the launch; this record does not depend on `classify.py`.

## 5. How it is run

The batch runs on the redesigned workflow: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`, as batch 11 ran (`compile-ladder/climb-batch-11/RECORD.md`). In short: each rung's worker does the rung test first; its skeptic checks it and fixes what it finds, test first, and a judge rules only on a fix the skeptic marks contested or on a rung the skeptic cannot fix; the gather lands the rungs on `main` and folds their record lines, their ledger rows through `coordinator/tools/ledger.py`, and their entries for the skill's part on the revival's changes; the merged-diff review and the gate run side by side, then a cold reader reads the skill text the batch added; the commit stage lands the gate's tables, runs the quick microGPT walk check and pushes. Section 3 is each worker's brief word for word, with the answers line it opens with; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-12/manifest/gen12.py` reads with the briefings of `lists12.py` beside it, and `check12.js` checks.

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the checker count and the distance are the rung's failing-then-passing test, before from batch 11's landed tables (`compile-ladder/climb-batch-11/gate/`, `compile-ladder/gate/distance-sites.tsv`) and after once on the rung's tree. "Joins the gate" names a step the gate gains once the rung lands; none does in this batch, and `ant testSpecData` runs because batch 11's landed summary has it (the script's rule, `climb-batch-workflow.js:1892-1897`). The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands (POSITIONS, "Reversible stops do not hold a batch."); only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### W
- **slug:** `rung-walk-load-checks`
- **worktree:** `/home/user/fortress-walkloads`
- **expected minutes:** 100
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **blurb:** walk refuses at load an object that inherits an abstract method and gives it no body (row 649), an override that overrides nothing (row 653's walk half) and a generic provider or an object expression in a generic function that breaks the Meet Rule for Functional Methods (row 647), and binds a top-level variable initialised with an object expression (row 648); Java under interpreter/evaluator/ and interpreter/env/; no library, checker or specification edit.
- **points to report:**
  - An interpreter test whose verdict changes other than by the rung's intent: each with its before and after.
  - A library type, a team test or a demo that walk now refuses at load, with the declaration and the check that refuses it.
  - A change to which declaration walk runs for a set it loads today.
  - A load check that instantiates a generic type to read it, or that runs at every instantiation, with its cost on the one library's load.
  - A team test line changed or a demo edited.
  - Normative text changed.
  - A library, checker or test-harness edit.

#### C
- **slug:** `rung-checker-contexts`
- **worktree:** `/home/user/fortress-checkctx`
- **expected minutes:** 90
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **blurb:** the compiled checker gives an operator repeated between three or more operands its expected type (row 644), stops crashing on a written static argument whose bound names another parameter (row 651, both expected failures), amends Appendix I's sentence that says a repeated operator gets no expected type (row 644), and under Q48 (default yes) passes the expected type into the body of a label and the with values of its exits (row 642, 1 site, item 36's thirteenth), with the inference chapter's two lists and the entry's label sentences amended; Scala under scala_src/typechecker/impls/ and scala_src/useful/.
- **points to report:**
  - A compiled test whose verdict changes other than by the rung's intent.
  - A program the text allows that the checker now refuses, or one the text refuses that it now accepts, outside rows 642, 644 and 651.
  - The argument faces of XXXInferContextDrops (row 455) cleared or changed.
  - A change in which declaration an operator application chooses once the expected type reaches it.
  - Normative text changed beyond the inference chapter's two lists and the amended Appendix I entry.
  - A library or walk edit.

#### R
- **slug:** `rung-range-kinds`
- **worktree:** `/home/user/fortress-rangekinds`
- **expected minutes:** 85
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **blurb:** the one library's last generic range bodies move to the ZZ32 kinds with their bounds check (row 655, 2 sites; under Q50, default yes, point by point at rank 2 and 3, row 657, a value walk prints), FullRange.narrowToRange over an open range types (row 654, 1 site), under Q49 (default way a) the open range's five methods get fail bodies (row 656, 5 sites), PrefixSet gets its indices as 0 # |s| (row 658, a walk stop) and ImmutableArray1 reads r'.left.get (row 608, 1 site); library declarations only, up to 9 sites.
- **points to report:**
  - A value walk prints that changes, each with its before and after: item 50's raise and the pin at RangeKindBodies.fss:94, item 49's five stops, and any other.
  - A library caller of the open range's five methods, found by reading or by a stop in the interpreter suite.
  - A new api type or declaration beyond the moved bodies, or a team declaration removed.
  - A declaration of the reductions section edited (G's).
  - A team test line changed.
  - A checker or walk edit, or a site whose only repair is a checker change.

#### G
- **slug:** `rung-reduction-types`
- **worktree:** `/home/user/fortress-reductions`
- **expected minutes:** 95
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **blurb:** the identity-less reductions' three Any devices are typed at the element type, simpleJoin(a: R, b: R): R, lift(r: R) and the lifted type Maybe[\R\] where AnyMaybe stood, in the two traits, the lifted monoid wrapper and the declared types of the identity-less big operators in FortressLibrary and Set (row 628, 13 sites, or 12 with MonoidReduction's lift left under P2's outcome (ii)), on probe P2's reading that no library big operator's unwritten clause form that runs today stops under walk once the devices are typed; library declarations only.
- **points to report:**
  - A big operator whose unwritten clause form stops under walk after the typing, with the operator, its parameter's bound and the stop.
  - A value walk prints that changes, each with its before and after.
  - An api declaration changed beyond the lifted type of the identity-less reductions and their big operators (FortressLibrary.fsi, Set.fsi).
  - Row 433's two distribute sites or row 473's expected failure moving.
  - A declaration of the ranges section edited (R's).
  - A team test line changed.
  - A checker or walk edit.

### What every agent of the run reads first

This run is climb batch 12, the record CLIMB-BATCH-12.md, phase 3's next batch after 11, toward the checker at a true zero: one walk rung, one checker rung and two library rungs, each at the defaults of the record's questions Q48 to Q50 where the curator has not answered, and rung G on probe P2's reading. The distance stands at 207 and the count at 1 after batch 11 (compile-ladder/climb-batch-11/gate/). The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another rung of the batch. W edits walk alone, C the checker alone, R and G the library: both edit Library/FortressLibrary.fss and .fsi, R in the ranges section and at one array line, G in the reductions section, hundreds of lines apart; R alone edits RangeInternals and PrefixSet, G alone Set. ProjectFortress/tests/ takes W's, R's and G's distinct files, ProjectFortress/compiler_tests/ C's. Only C edits the specification. R's and G's library changes both move sites of component FortressLibrary, and W's load checks read every component walk loads; the gate measures and runs the merged tree. ant testSpecData runs in the gate because batch 11's landed summary has it.

### Before the launch

The coordinator, in this order:
1. The two owed script edits of `coordinator/pending-script-edit.md` (the briefs' `nohup` form in place of `run_bg`, with the scenario checker's pattern; the gather's unfolded-entry filter, with scenario C2b), the FACTS consolidation of the four entries that still carry batch 10's figures (its lines 44, 56, 66 and 144, the BR site at `:56` given to row 488, as `reviews/batch-11-review.md`, Part 4, says), and this record with its generator on `main`. The base is `main`'s head after them, its full hash, passed as `args.base`.
2. The base build, as the manual's "Before the launch" gives it: `git -C /home/user/fortress worktree add --detach /home/user/fortress-base12 <base>`, `ant compileAll` in it, the library order, one passing walk test, `git status --porcelain` empty; passed as `args.baseBuild`. One trial seed proves it (`coordinator/tools/seed-worktree.sh /home/user/fortress-base12 /home/user/fortress-seedcheck - <base>`, then `git -C /home/user/fortress worktree remove /home/user/fortress-seedcheck`), and one `coordinator/tools/old-fortress.sh /home/user/fortress-base12 /home/user/fortress-seedcheck-caches ProjectFortress/tests/BooleanOps.fss` run from the main tree proves the old code runs, its folder removed after.
3. **Probe P2**, on a worktree seeded from the base build (never in the base build itself): a shadow edit that types the three devices as rung G would (about 25 lines in `Library/FortressLibrary.fss`, `.fsi`, `Library/Set.fss` and `.fsi`), the library order once (about 3 minutes), then one walk program of about 30 lines running the unwritten clause form of each library big operator named in G's tests over a non-empty generator, each value asserted, run twice, on the base build through `coordinator/tools/old-fortress.sh` with a private caches folder and on the shadow, and the interpreter suite once on the shadow (about 3 minutes at four threads). It settles whether the typing stops an operator that runs today. D2's residue, a big operator whose parameter is not F-bounded and that nothing fixes staying at `Bottom` under walk, reaches the typed `lift` of `MonoidReduction` (`FortressLibrary.fss:3162`) through the monoid operators with a plain parameter, `BIG SQCAP`, `BIG SQCUP`, `BIG AND`, `BIG OR`, List's and PureList's `BIG CONCAT`, Map's and IntMap's operators, and PrefixSet's and PrefixMap's, whose second parameter's bound names the first (row 612's shape); the identity-less operators (`BIG MIN`, `BIG MAX`, the four tuple forms, `BIG //`, Set's `BIG INTERSECTION`) are F-bounded or concrete and meet the typed `simpleJoin` and the join over `Maybe[\R\]`. An operator that stops on the base too is not the typing's: row 473's `BIG MINMAX` is one, and any other stays out of G's test with a note. Three outcomes, stated in the answers line of G's brief: (i) no operator that runs on the base stops on the shadow: G runs as section 3 gives it, its program G's first test. (ii) A new stop at monoid operators only: G stays, its lines marked "under P2(b)" dropped, `MonoidReduction`'s `lift` left with a note on row 628, 12 sites; this record needs no edit, as the Q-marked lines need none. (iii) A new stop at an identity-less operator: the coordinator drops G before the launch: `G` leaves `IDS` in `lists12.py`, the `#### G` block and the `### G.` section move from this record to section 4 with P2's result, `gen12.py` and `check12.js` are run again, and row 628 waits on D2's entry. About 12 minutes of machine time; an Opus worker of about 0.3M, or the coordinator by hand. It measures nothing the record holds: row 628's two measured stops were taken before rung W, and D2's reach into the typed reductions is unmeasured.
4. **Probe P3**, only if the curator answers Q49 (c): the same kind of shadow with `TrivialOpenRange extends OpenRange[\ZZ32\]` and the five methods at `ZZ32`, the interpreter suite once and a program of the `INTERSECTION`, `IN`, `=` and `CMP` of `(:)` with ranges of rank 1 to 3, each value compared with the base's. It settles whether way (c) keeps every value walk prints. About 10 minutes; not run unless asked.
5. The briefings checked on the base: `python3 explorations/compile-ladder/plan-12/manifest/lists12.py`, every key matching one place. The block generated and spliced: `python3 explorations/compile-ladder/plan-12/manifest/gen12.py`, then `node explorations/compile-ladder/plan-12/manifest/check12.js`, which splices it into a scratch copy and checks it; then the same splice into the script itself (`check12.js --write`), `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. No launch value is set by hand: the batch's new ledger rows are numbered by the gather through `ledger.py add`.
6. `df -h /` against four seeded worktrees (about 206 MB each) and the base build; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`.
7. Check-ins armed for the run's length, 45 minutes apart, and one after the session's predicted process stop (the `cloud-container` skill; POSITIONS, "Check-ins and stops.").

The launch: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of the base>', baseBuild: '/home/user/fortress-base12'}})`. The arguments are kept byte for byte in the session's scratchpad, since a resume needs them.

### The gate, and what it should show

The comparands are batch 11's `summary.txt`, `checker-count.txt` (1) and `distance.txt` (207), with `distance-sites.tsv`.
- `testSystem`: the comparand's sum (526: 134, 128, 133 and 131 over the four shards) plus the files W, R and G add; a promotion moves nothing.
- `testFast`: the compiler track 1,078 plus the cases C adds; the library track 86, the othercompiler track 263 and the misc tracks unchanged.
- `testSpecData`: 130 green, run because the last landed summary has it.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move.
- The checker count and the distance: reported, never red. By reading, C clears 1 site (under Q48), R up to 9 and G 13 (12 under P2's outcome (ii)); W moves neither measure. The distance near 184, the count 1 (`isLeftZero`, row 582).
- A repair after the review or the gate runs the gate again only when it changed a path the gate reads (`ProjectFortress/` but test files, `Library/`, `build.xml`).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather, in the order it applies the rungs (its `RECORD.md` says which order and why); until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>` for its number (`NEW-W-1`), and the gather replaces every placeholder with the number `ledger.py` gives. Rows the rungs close (`ledger.py close`, after the rung's commit is on `main`): 647, 648, 649 (W); 644, 651, and under Q48 642 (C); 654, 655, 608, under Q50 657, under Q49 656 (R); 628 (G, when its 13 sites move; under P2's outcome (ii) a note instead, the `lift` site left), each as its test passes on the merged tree. Row 658 has no test the stages read and a walk test the rung writes, so it closes with that test. Row 653 stays open: W repairs walk's half only, and its claim covers both paths; W's note names the walk test, and `ledger.py` has no command to set a reproducer (gather.1), so the gather lists that line for the coordinator. Notes: 570, 650, 615 (W); 455, 560, 627 (C); 599, 600, 577, 634, 659 (R); 433, 473, 645, 424, 425 (G).

### After the landing

The coordinator: the landing report; the routing of every item for the curator into PLAN; FACTS consolidated; row 653's reproducer, which `ledger.py` cannot set, and the four groups whose figures PLAN's batch-11 line gives differently from this record (the arrays, the other items, row 425, the negative power), corrected in PLAN's batch-12 line; items 48 to 50 marked answered against this record's Q48 to Q50; the combined post-batch review, which reports this batch's measures against batches 8 to 11 as `process-engineering/batch-redesign.md`, "The measures", defines them.

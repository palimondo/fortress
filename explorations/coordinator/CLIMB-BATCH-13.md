<!-- DRAFT, CONTENT ONLY. The record of climb batch 13, the next batch of the plan's phase 3, "the checker at a true zero", drafted 2026-10-09 by a planning worker for the coordinating session, the curator and the batch's workers, against `main` at `b886aedae`, whose `Library/`, `ProjectFortress/`, `Specification/`, `Documentation/`, `build.xml` and `bin/` are byte for byte those of `32b88cd3b`, climb batch 12's landing (`git diff --stat 32b88cd3b HEAD` over those paths is empty), so batch 12's landed tables describe this base. It says what the batch changes, why, and what the curator reviews after it; it launches on his standing go for phase 3 (POSITIONS, "The phase-3 batches run on a standing go."), so every question it raises takes its recommended default and is listed for his review, none of those defaults reversing a decision of his. Section 5 holds the manifest's fields, which `explorations/compile-ladder/plan-13/manifest/gen13.py` reads. Sources: PLAN.md, "The principle for the batches" (the method, `:21`), phase 3 item 11 (batch 13's line) and the lines under item 10 that name the next rungs (rows 660, 665, 667), item 13 (the array forks), items 15, 43, 45 and 51, and the list "Climb batch 12, listed for his review"; batch 12's landed tables (`compile-ladder/climb-batch-12/gate/distance.txt`, `checker-count.txt`, `summary.txt`) and per-site list (`compile-ladder/gate/distance-sites.tsv`, 153 rows), read site by site and grouped by ledger row; `reviews/batch-12-review.md`, section 1 and Part 4; `coordinator/climb-batch-12-review.md`; the judgements `reviews/array-forks-now.md` (Q15), `reviews/array-fork3-judgement.md`, `reviews/array-fork2-judgement.md`, `reviews/tuple-comparisons-judgement.md`, `reviews/generator-size-judgement.md` and the check `reviews/walk-load-readings-check.md`; `reviews/self-typed-bodies-judgement.md` for the room it may take; `process-engineering/library-extension-rule-archaeology.md`, sections 5 and 7; POSITIONS.md and FACTS.md, cited by bold title; ledger rows read with `ledger.py show`; the library, checker and walk code at the sites; the form of `coordinator/CLIMB-BATCH-12.md` as launched (`7a836ccab`). Nothing was built or run: no stage, no suite, no Fortress program; the counts are by row and line, never by class (row 577). One line per paragraph. Reviewed in place on 2026-10-09 by the top-tier review `coordinator/climb-batch-13-review.md`, on the curator's standing pre-approval of such reviews (POSITIONS, "The phase-3 batches run on a standing go."), against `main` at `2b7a5cf58`, whose one commit since `b886aedae` is this draft; the review gives one reason per change, what it checked and found right, and what it weighed and left as drafted. -->

# Climb batch 13

## 1. For the curator

### The words this record uses

- **Walk** is the interpreter. It runs a program without static types. The **compiled path** checks a program's types with the **checker**, then makes JVM bytecode.
- **The one library** is the interpreter's library (`Library/`, `ProjectFortress/LibraryBuiltin/`). At the **switch-over** the compiled path takes it over.
- **The distance** is the number of errors the checker reports on the one library. Each error has a **site** (a file and a line). This record counts sites by the ledger **row** that records their defect, not by the stage's classes (row 577). Phase 3 brings the distance to a true zero.
- **The count** is the older measure, the checker's errors on the one library's api files. It is 1: `isLeftZero` (row 582). This batch takes it to 0.
- A **row** is an entry of the gap ledger, cited by number. An **item** is a numbered question in PLAN's list "Pavol's answers"; item 13 holds the six array forks.
- A **rung** is one fix, built by one worker in its own copy of the tree and checked by a second worker, the skeptic. A **batch** is a few rungs, merged and tested together by the **gate** and landed at once.
- **Test first.** Every fix starts with a test that shows the defect, seen failing before the edit and passing after. An **expected failure** is a test named `XXX...` that passes while the defect is there; when the fix lands it is **promoted**, renamed to a plain name.
- A **load check** is a check walk makes when it loads a program. A refusal there is walk's form of a static error.
- A **size** is a number inside a type: the 16 of `Vector[\RR64, 16\]`. **Arithmetic in a size** is a size written as a sum or product, `s0 s1`. **`reflect(x)`** turns a number known only when the program runs into a size.
- A **bound** is the rule on a type parameter: `T extends Number` admits only number types. A **two-trait bound**, `T extends { Number, MultiplicativeRing[\T\] }`, asks for both.
- An **extension** is a new declaration in the library. By your rule you judge each one, shown the library line it copies (`process-engineering/library-extension-rule-archaeology.md` §5 point 4, §7).

### Where the distance stands

- After batch 12 the distance is 153 and the count 1 (`compile-ladder/climb-batch-12/gate/distance.txt`; `checker-count.txt`; landed at `32b88cd3b`).
- The 153 by what each group waits on (`reviews/batch-12-review.md` section 1, checked here site by site against the per-site list):
  - 67, the arrays: item 15's 13, fork 2's 25 (the bound of `Vector` and `Matrix`), fork 3's 10 (a size known only at run time, row 664 among them) and 19 that need a list of ways (13 bodies typed by their parent trait, 3 sizes tested in a branch, `matrix(v)`'s numeral, row 437, and 2 export errors).
  - 30, the self-typed bodies.
  - 40, your other open items: the tuple comparisons 18 (row 634, item 43), a size read from a `Generator` 9 (row 629, item 45), the integer power answering `RR64` 6, `String`'s operator pairs 3 (row 585, item 38), `isLeftZero` 2 (row 582), `__bigOperator2`'s fused arm 1 (row 632, item 46), `embiggen`'s team test line 1 (row 631).
  - 12, the `where` clauses (rows 433, 636, 436).
  - 3, row 425; 1, row 488.
- This batch reaches 75 sites and uncovers 1:
  - N 23: item 15's 13 and fork 3's 10.
  - V 24: fork 2's 23 and row 437's 1; `scale`'s parent-trait error at `:2399`, which an arithmetic error hides today, comes.
  - O 19: the tuples' 17 and `isLeftZero`'s 2.
  - G 9: row 629's 9.
  - W none: walk is not measured by the stages.
- **The distance expected after the batch: about 79, the count 0.** Two things can move it up, each a point to report: rung N types the two local parameters that crash the checker on `Array2` and `Array3`, so those traits come onto the list, their 4 run-time-size calls cleared by N's rule and the rest unread; and the norm's call at `:2483` may stay refused if V's checker fix does not reach it (+1).
- What is left then (79): the arrays 21 (the 2 factory sites, 14 parent-trait bodies, 3 sizes in a branch, 2 export errors), the self-typed bodies 30, your other items 12 (the integer power 6, row 585's 3, the list order 1, rows 632 and 631), the `where` clauses 12, row 425's 3, row 488's 1.
- If the self-typed bodies' measurement comes back clean before the launch, a sixth rung T takes 29 or 30 of them (section 5, "Room for a sixth rung"): about 50.

### The rungs, two sentences each

- **N, the checker's sizes.** Under your answer to item 15 (15a with (b)) the checker accepts a sum, difference, product or power in a size, compares sizes by their written form once numerals are folded, and lets a size name equal a numeral; the class loader computes the size when it makes a class. Then, at fork 3's default (way 4a), the team's commented clause `NatParam comprises { N[\n\] } where [\nat n\]` is restored and the checker opens a `NatParam` argument as that value's own size for the call: 23 sites, 4 more that hide behind two crashes, row 664 closed.
- **V, the checker's bound lists and a tight juxtaposition, then the arrays' bound.** The checker's crash on a bound list that names a closed trait (the team's `boundsSubstitution`, "TODO: FIX THIS FOR OPS") is fixed test first, and a tight juxtaposition like `a(b)` gets its expected type (row 660). Then, at fork 2's default, `Vector`, `Matrix` and their family take `T extends { Number, MultiplicativeRing[\T\] }`, the array-and-number operators a bound per operator, and `matrix(v)` writes `v.zero` (row 437): 24 sites, 1 come.
- **O, the library's orders.** At item 43's default (way 1b) each element of a pair or triple is bounded by `StandardPartialOrder`, `Comparison` gains the lazy `LEXICO` that `TotalComparison` has, and each `typecase` an `Unordered` clause: 17 sites. Under your decision on row 582, `isLeftZero` takes `TotalComparison` (2 sites, the count to 0); and `IntMap`'s three objects get the `genComb` body they lack (row 667).
- **G, the library's generators.** At item 45's default (ways 1, 3 and 6) every generator gets a size `|g|` by default, counted by running it; the relational check becomes one pass; the default index-value pairs become a small object. 9 sites, row 629 closed.
- **W, walk's `override`.** An `override` whose parameter types equal the inherited declaration's is refused at load, as the traits chapter's "strict subtype" says, and the `override` check reaches generic objects and traits (row 665's half). The specification's sentence that the checker covers abstract methods "reading no comprises clause", false since 2012, is corrected, and two tests batch 12's review owes are written.

### What the batch leaves out, and why (section 4 gives each home)

- Q48's part (b), row 455's argument faces: waiting on your answer (wide or narrow).
- Item 51 (rung W's Q1, a body at narrower types): waiting on your answer; rows 666, 668 and 669, and row 665's abstract half, wait with it.
- The arrays' other 21 and whatever `Array2` and `Array3` show once unhidden: a list of ways first, in batch 14's lists.
- The self-typed bodies, 30: their measurement is running; a sixth rung if it lands clean before the launch, else batch 14.
- The integer power (6), row 585 (3), row 632 (1), row 631 (1), the list order (1), the `where` clauses (12), row 425 (3), row 488 (1): your items or later work, batch 14's lists.
- Rows 612, 616, 645, 662, 663, 661, 670, 650 and row 653's compiled half: your entries on record.

### Before the batch runs

- Done before this draft: FACTS consolidated to batch 12's figures (`b886aedae`); the skill writer's batch-12 list (`38def33a9`).
- This record and its generator on `main`, a top-tier review in place, the base build, the splice and the scenarios (section 5, "Before the launch"). No probe: no fork here is open to one, and each rung's first measurement is its own test.
- The self-typed bodies' measurement, if its result comes in time: the coordinator adds rung T as section 5 says.

### Cost

- About 5.8M tokens: five rungs at batch 12's means by role (worker 0.41M, skeptic 0.33M), rung N at about one and a half rungs since it builds two judgements' rungs in one, two rulings at batch 12's 0.15M each, the fixed roles at batch 12's 1.42M; from 5.5M if no fix is contested to 6.4M if two rungs go to a judge and one to a repair; a red gate adds about 0.5M; a sixth rung T adds about 0.75M. The figures scale batch 12's 5.43M by role (`reviews/batch-12-review.md` section 2).
- At two agents at once, the run is longer than batch 12's 4 h 36 min, by rung N mostly. Launched at about 17:30 UTC it crosses the session's predicted process stop at about 23:01 UTC; the check-ins resume it (section 5).

## 2. Your questions, in the order they block the batch

**Taken on the standing go.** Each question below takes its recommended default, and the rung builds it. Each is listed for your review: an answer the other way is reversible and loses only what the question names. None of the defaults reverses a decision of yours; Q13.2's bends the letter of one, which it says. Item 15 and row 582 are your decisions already and are not asked again.

### Q13.3. Item 13, fork 3: a size known only at run time

- **Blocks:** 10 sites of rung N (the six run-time factories and the four rank-1 subarrays, row 664), 4 more hidden in `Array2` and `Array3`.
- **On file:** `reviews/array-fork3-judgement.md` (top tier, way 4a); `reviews/array-forks-now.md` section 1; rows 664, 307, 25.
- **Terms.** `reflect(x)` answers the trait `NatParam`, whose every value is some `N[\n\]`. The checker does not know that, so it refuses the library's own `array[\E\](x)` and its siblings. *Opening* a size is binding a size name to a number known only at run time, for one call.
- **What the default does (4a).** The team wrote the rule in 2007 as a comment beside `NatParam`: `comprises { N[\n\] } where [\nat n\]` (Jan-Willem Maessen, `da43f8872`; `ProjectFortress/LibraryBuiltin/NatReflect.fsi:23`). The rung uncomments it and teaches the checker its one rule: an argument of type `NatParam`, passed where `N[\n\]` is expected, binds `n` to that value's own size for that call. Walk's loader reads the clause (about ten lines). The traits chapter's sentence on listed types is widened to admit a `where` variable, and the size chapter gains one sentence, with an Appendix I entry.
- **What it reads anew.** Your "Sizes" entry ("a size left unknown after inference is an error only when it reaches a type, a name or a value"): an opened size is read as bound, not unknown. And the revival's own sentence of 2026-09-28 (`Specification/basic/traits.tex:238-240`) is widened. Nothing of yours is reversed.
- **Other ways.** 4b `reflect` built in (clears nothing more; speed, measurable after the switch-over); 4c sizes stay unsized (the library's own `array[\E\](x)` stays refused); 4d no run-time sizes (decision D's D4); 4e a `typecase` that binds a size (no spelling exists).
- **Its order.** The clause must not land before item 15's part (b), or the checker would hold that `NatParam` excludes `N[\0\]`. Rung N builds both, (b) first.
- **Default:** 4a; 4b deferred. If you answer otherwise, rung N's lines marked "under Q13.3" are dropped and the 10 sites stay.

### Q13.2. Item 13, fork 2: the bound of `Vector` and `Matrix`

- **Blocks:** 23 sites of rung V (15 arithmetic refusals in the bodies, 8 in the array-and-number block), and row 437's `v.zero`.
- **On file:** `reviews/array-fork2-judgement.md` (top tier, measured on a library copy); POSITIONS, "The integration review's checks" and "The exclusion rule stays and the tower is flat (route A)".
- **Terms.** `Number` declares `asFloat` and `=`, no arithmetic. Route A moved the arithmetic to each number type at its own type, through `AdditiveGroup[\T\]` (plus, minus) and `MultiplicativeRing[\T\]` (and times). So `Vector`'s body adds two `T`s with no rule for it.
- **What the default does.** `Vector`, `Matrix` and their family take `T extends { Number, MultiplicativeRing[\T\] }` (29 component lines, 32 api lines); the eight array-and-number operators take a bound per operator: `+` and `-` `{ Number, AdditiveGroup[\T\] }`, `MIN` `{ Number, StandardMin[\T\] }`, `MAX` `{ Number, StandardMax[\T\] }`. The library already writes this form (`MaxSumReductionPair`, `Library/FortressLibrary.fss:3262`). Measured: 23 of 25 go, 1 hidden appears, walk's seven array tests print the same. First the checker's crash on such a bound (the team's code, 2012) is fixed, test first.
- **What it bends.** The letter of "no blanket ring bound that would exclude integer arrays", on the two traits: the ring is on `Vector` and `Matrix`. Its reason holds: every number type is a ring at its own type, integers included (`Library/FortressLibrary.fsi:443`), so no integer array is excluded. A `Vector` of bare numerals (`IntLiteral`) is refused; nothing makes one.
- **Other ways.** The ring alone (loses `Number`'s exclusions); a bound per method (needs `where` clauses and breaks your diagonal's override); arithmetic on `Number` (reverses route A); leave the 23.
- **Default:** the two-trait bound and the per-operator bounds. If you hold the letter, rung V's half two is dropped and the 23 stay; its checker fix and row 660 stand.

### Q43. Item 43: the tuple comparisons

- **Blocks:** 17 sites of rung O.
- **On file:** `reviews/tuple-comparisons-judgement.md` (top tier, way 1b for tuples, way 3 for lists at the `where`-clause line); row 634.
- **What the default does (1b).** Each element type of a pair or triple is bounded by `StandardPartialOrder`, as the team bounded its range-tuple comparison `PCMP` in 2008; `Comparison` gains the lazy `LEXICO` that `TotalComparison` and `EqualTo` already have (three api lines, an extension for you to judge, its precedent `Library/FortressLibrary.fss:177`); each `typecase` gains `Unordered => false`.
- **The one value walk prints that changes.** `((1,2),3) < ((1,3),0)` answers `true` today and is refused after: a tuple is outside every trait by the team's rule. The pin at `ProjectFortress/tests/NumberOrderListDeclarations.fss:41` (the revival's) is replaced by a test of the refusal. A pair whose first elements are unordered, `(0.0/0.0, 1) < (1.0, 1)`, stops today (`MatchFailure`) and answers `false` after, as `RR64`'s own `<` does for NaN.
- **Default:** 1b, `Unordered => false`. If you answer otherwise, rung O's tuple lines are dropped and the 17 stay.

### Q45. Item 45: a generator's size and index

- **Blocks:** 9 sites of rung G (row 629).
- **On file:** `reviews/generator-size-judgement.md` (top tier, ways 1, 3 and 6); `reviews/generator-size-ways.md`.
- **What the default does.** Every generator gets a size `|g|`, counted by running it, unless its own type answers faster: one new api declaration on `Generator`, an extension for you to judge, in the shape of `Generator`'s own `opr IN` (`Library/FortressLibrary.fss:1238`). The relational check runs as one pass carrying each part's first and last element (the shape of the team's relational reduction, `Library/Generator2.fss:207-229`). The default index-value pairs become a small object beside `SimpleMappedIndexed`.
- **What changes under walk.** No value walk prints today changes. `|g|` now answers on a filter, a nest, a map and a cross where walk stopped; it consumes a file generator and never ends on an endless one. The relational check answers on an unsized target. A default pairs value prints as a bare list.
- **The other way.** Ways 5, 3 and 6: delete the three size bodies instead of declaring one; the same 9 go, and walk loses two sizes it answers today.
- **Default:** ways 1, 3 and 6.

### QW2. Rung W's Q2 of batch 12: an `override` at equal parameter types

- **Blocks:** nothing of the distance; rung W's first item.
- **On file:** `reviews/walk-load-readings-check.md` section 3 (top tier); its entry under "Climb batch 12, listed for his review", default (a) as landed. Told to you at 15:29 UTC on 2026-10-09 with the strict default.
- **What the default does.** The chapter: an `override` overrides a declaration whose parameter type is "a strict subtype" of its own, and one that overrides nothing is a static error (`Specification/basic/traits.tex:585-595`). The team asked this question in 2008 and then wrote "strict" (`Specification/appendices/future.tex:156-184`). Walk refuses at load an `override` whose parameter types equal the inherited declaration's. No program in the tree writes one; nothing loads differently but such a program.
- **The other way.** Allow it: the chapter's "strict subtype" revised to "subtype", walk unchanged.
- **Default:** strict, the chapter as written.

### Answered, built here

- **Item 15, arithmetic in a size: 15a with (b)** (POSITIONS, "Arithmetic in a size: the checker compares size expressions by their written form after folding numerals, and a size name may equal a numeral (item 15, 15a with (b))."). Rung N, 13 sites, `XXXNatArithChecker` promoted.
- **Row 582, `isLeftZero` over `TotalComparison`** (POSITIONS, "`LexicographicReduction.isLeftZero` takes `TotalComparison`, so the team's answers are reached (row 582)."). Rung O: `LessThan` and `GreaterThan` answer `true`, `EqualTo` `false`; the pin at `ProjectFortress/tests/LibraryMeetDeclarations.fss:33` changes from `false` to `true`, listed for you; the count goes to 0.

### Points the batch lists for you, not questions

- Three extensions for you to judge (library rule, point 4): `Comparison`'s lazy `LEXICO` with its two arms (O, precedent `:177`, `:211`, and the team's `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:704`); `Generator`'s `|self|` (G, precedent `opr IN`, `:1238`); the pairs object beside `SimpleMappedIndexed` (G, not in the api).
- The team's commented `NatParam` clause restored (N): the team's own line, not an extension.
- Two pins of the revival's tests changed, each with its before and after: `LibraryMeetDeclarations.fss:33` (O) and `NumberOrderListDeclarations.fss:41` (O, replaced by a refusal).
- `matrix(v)` for `NN32` and `NN64` runs where walk stopped (V, row 437).

### Questions on file that this batch does not need

Each is yours, with its home in section 4.
- Q48's part (b), row 455's argument faces: wide or narrow, recommended wide (`CLIMB-BATCH-12.md`, Q48; `reviews/argument-context-probe.md`). If you answer before the launch, rung V can take it: the probe's patch is one file no rung edits.
- Item 51, rung W's Q1 of batch 12: the check recommends coverage, the team's 2012 rule, after rows 668 and 669 are repaired (`reviews/walk-load-readings-check.md` section 2).
- Item 38 (row 585), item 46 (row 632), row 631, the integer power (rows 438, 441, 445).
- The entries under "Climb batch 9, 11 and 12, listed for his review" that hold rows 612, 616, 645, 650, 653's compiled half, 661, 662, 663 and 670.

## 3. The rungs

Line numbers are on `b886aedae`, whose `Library/`, `ProjectFortress/` and `Specification/` are those of `32b88cd3b`. Site counts are by reading the landed per-site list, grouped by row and line. Each rung's tests come first: written, run through the harness on the base and seen failing, and committed before the edit. A value that matters is asserted inside the test (POSITIONS, "The suite's verdict is the check.").

### N. The checker's sizes: arithmetic in a size (item 15, 15a with its part b) and a size known only at run time (item 13's fork 3, way 4a)

**The answers this rung follows.** Item 15 is answered (2026-10-09): 15a with its part (b) (POSITIONS, "Arithmetic in a size: the checker compares size expressions by their written form after folding numerals, and a size name may equal a numeral (item 15, 15a with (b))."): the checker accepts a sum, difference, product or power in a size, compares two size expressions by their written form once numerals are folded (2 3 is 6; s0 s1 is not s1 s0) and range-checks what it folds; the class loader computes the value when it makes a class; a size name counts as possibly equal to a numeral; the team's storage fields stay sized by a product; the specification's identity sentence is revised in the S1 form with an Appendix I entry. Fork 3 (PLAN item 13, point 3) is not answered: this rung builds it at the default of explorations/reviews/array-fork3-judgement.md, way 4a, taken on the curator's standing go and listed for his review (section 2, Q13.3), and every line marked "under Q13.3" applies; if he answers otherwise before the launch, those lines are dropped. The order the judgement requires, the NatParam clause never on a tree without part (b), is met inside this rung: build and commit part (b) and 15a first, the clause after, and show on your tree that a typecase on a NatParam value with an N[\0\] clause is reachable. The judgement reads the curator's "Sizes" entry anew (an opened size is bound, not unknown) and widens the revival's own sentence at Specification/basic/traits.tex:238-240; both are listed for him. The array design's other questions stay open (POSITIONS, "The array design's three questions are open."). Where this section says "you" or "your", it means the curator.

**Rows.**
- Item 15, 13 sites, no row of its own (row 307's notes name XXXNatArithChecker): the storage fields of __DefaultArray2, __DefaultMatrix and __DefaultArray3, mem:PrimitiveArray[\T, (s0 s1)\] and its rank-3 twin (Library/FortressLibrary.fss:2619, :2783, :3006, two errors each, "Ill-formed static argument: s0 s1 Arithmetic on nat static arguments is not supported by the type checker"), the same two types at ProjectFortress/LibraryBuiltin/NativeArray.fsi:12 (2), reflect's helper __refl' at ProjectFortress/LibraryBuiltin/NatReflect.fss:45 and :47 twice (3), and the two typecase arms typecase N[\b0\] of N[\0\] that the checker calls unreachable (Library/FortressLibrary.fss:2423, :2434), because its size rule says a symbol is not any literal (scala_src/types/TypeAnalyzer.scala:354-362, pEqv). The refusal is hasSizeArithmetic (scala_src/typechecker/TypeWellFormedChecker.scala:41-47) and its three uses (:83-84, :148-149, :187-188); the equality is nEq (scala_src/typechecker/Formula.scala:95-105, "A size with arithmetic in it equals nothing"); the range check of a literal size is already there (sizeOutOfRange, TypeWellFormedChecker.scala:55-70), and what you fold passes through it. The loader: the name mangler spells a size expression out (compiler/NamingCzar.java:1899-1905, forIntBinaryOp); 15a asks that the class loader compute the value when it makes a class, so that Box[\2 + 1\] and Box[\3\] are one class; find where a template's static arguments are put in and compute there. Walk already computes a size exactly and range-checks it (interpreter/evaluator/EvalType.java:468-479). The test is ProjectFortress/compiler_tests/XXXNatArithChecker, which compiles and runs Box[\2 + 1\] and Box[\k + 1\].
- Under Q13.3, fork 3, 10 sites: the six run-time factories __arr1, __arr2, __arr3, __imm1, __parr and __piarr, each called with reflect(x) where N[\n\] is declared (Library/FortressLibrary.fss:2114, :2116, :2118, :2132, :2151, :2156), and the four rank-1 subarrays (:2249, :2257, :2307, :2315; row 664 records :2257 and :2315): "Could not check call to function __arr1 ... is not applicable to an argument of type (()->E, NatReflect.NatParam)". The team's rule, as a comment since 2007: trait NatParam (* comprises { N[\n\] } where [\ nat n \] *) (NatReflect.fsi:22-25, NatReflect.fss:23-26), with "within that function n becomes a static nat parameter" (NatReflect.fss:19-21). The repair, as the judgement's section 4 reads it: uncomment the clause in both files; KindEnv takes a nat (and int) where binding, where today it stops with "non-type where clause bindings" not yet implemented (scala_src/typechecker/staticenv/KindEnv.scala:117-127); TypeAnalyzer.pSubInner opens an argument whose type is a trait whose comprises clause lists an instantiation at where-clause variables, each variable a fresh name equal only to itself, and checks the listed type against the parameter (TypeAnalyzer.scala:130-169, beside the union case); TypeHierarchyChecker.checkDeclComprises accepts N[\nat n\] extends NatParam against the listed N[\n\] (scala_src/typechecker/TypeHierarchyChecker.scala:192-283); walk's loader binds the where-bound size so that comprises { N[\n\] } evaluates, and the comprises load check reads the listed N[\n\] as N at every n (interpreter/evaluator/BuildEnvironments.java:893-945, finishTrait and processWhereClauses; checkComprisesClauses at :1127). An opened size that reaches a declared sized type is refused, as it should be; one value opened twice in one call gets two names (no site does this).
- Under Q13.3, the two crash rows, 4 calls hidden: the checker stops on the whole of Array2 (:2491-2605) and Array3 (:2880-2993) at their asString's local row(i) and row(i,k), whose parameters have no type ("Missing parameter type for i", :2500, :2899; climb-batch-12/gate/distance.txt, the #crash rows). Type them row(i: ZZ32) and row(i: ZZ32, k: ZZ32), and any next untyped local parameter of the same two getters in the same way (plane(k) beside row(i,k)). Behind them, by reading, four calls of fork 3's shape: Array2's range subscript and shift (:2537, :2574) and Array3's (:2948, :2959); your rule clears them. Whatever else the two traits hold comes onto the list: count it by row and line, and give each new site a row or a note.
- Notes, not repairs: row 307 (item 15 clears its arithmetic half; NatReflectTest compiled still stops for want of NatReflect in the compiled library, and the compiled half of fork 3, a call whose size is read off the argument's descriptor and the code generator's refusal of a where clause, waits for the switch-over); row 25 (the reflect idiom stands, now accepted); row 636 (the same rule for a type, List's "Not yet: comprises List[\E\] where [\E\]": not this rung's); row 577 (count by row and line).

**Distance sites.** Item 15's 13 and, under Q13.3, fork 3's 10: 23, all in components FortressLibrary, NatReflect and NativeArray's api. The 4 hidden calls are not on the 153; whatever the unhidden traits show is reported by row and line. Row 664 closes under Q13.3.

**Files.**
- Under ProjectFortress/src/com/sun/fortress/scala_src/: typechecker/TypeWellFormedChecker.scala (hasSizeArithmetic and its three uses, :41-47, :83-84, :148-149, :187-188, with sizeOutOfRange, :55-70; not the static-argument bound check at :151-167, which V's new row names), typechecker/Formula.scala (nEq, :95-108), types/TypeAnalyzer.scala (pEqv, :354-362; pSubInner, :130-169; comprisesClause, :727-734, if a where-bound name must stay free there), and under Q13.3 typechecker/staticenv/KindEnv.scala (:112-127) and typechecker/TypeHierarchyChecker.scala (checkDeclComprises, :192-283).
- ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java (forIntBinaryOp, :1899-1905) and the loader code that puts a template's size arguments in.
- Under Q13.3: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java (finishTrait and processWhereClauses, :893-945; checkComprisesClauses, :1127 on); ProjectFortress/LibraryBuiltin/NatReflect.fsi:23 and NatReflect.fss:24; Library/FortressLibrary.fss:2500 and :2899 (and a next untyped local of the same two getters).
- Specification/basic/types-vals-vars.tex (:46-52), Specification/appendices/changes.tex (a new entry before "Passages not yet revised", :3126; under Q13.3 the entry "The traits that extend a closed trait", :1297-1397); under Q13.3 Specification/basic/traits.tex (:235-240) and Specification/basic/trait-parameters.tex ("Nat and Int Parameters", :80-112).
- New and promoted files in ProjectFortress/compiler_tests/ and ProjectFortress/tests/.
- Not: scala_src/types/TypeSchemaAnalyzer.scala and scala_src/typechecker/impls/Operators.scala (V's); the array family's headers, Vector, Matrix and their factories (V's); the reductions, orders, tuples and generators (O's and G's); interpreter/evaluator/values/Constructor.java and BuildEnvironments.forTraitDecl3 (W's); the model.

**Tests, first.**
- Item 15: XXXNatArithChecker promoted to a name by topic, compiling and running Box[\2 + 1\] and Box[\k + 1\] with their values asserted, as it is written; through junit.sh on the base it shows today's refusal. Add to it, or beside it, a typecheck case that s0 s1 is not s1 s0 (refused) and one that a folded size out of range is refused with the range check's message.
- Item 15's part (b): a compiled test of its own, a typecase N[\b0\] of N[\0\] in a generic function, its N[\0\] arm reached for b0 = 0 and its value asserted; refused on the base as unreachable. It declares its own sized value object in NatReflect's shape, NT[\nat n\], since ProjectFortress/compiler_tests/ cannot import NatReflect (row 307), as the Q13.3 test below does.
- Under Q13.3: ProjectFortress/compiler_tests/ cannot import NatReflect (row 307), so the test declares its own trait NatParamT comprises { NT[\n\] } where [\nat n\], a value object NT[\nat n\] extends NatParamT, a maker mk(): NatParamT = NT[\3\], a generic take[\nat n\](x: NT[\n\]) whose sized result is widened to an unsized parent, and a typecase mk() of NT[\0\] => ... else => ... end reachable under part (b); seen failing on the base at the header (the KindEnv refusal), passing at the typecheck after. A second file, an expected failure, holds the refused line keep[\nat n\](x: NT[\n\]): NT[\n\] with y: NT[\3\] = keep(mk()), refused before and after. The compiled run of an opened size is fork 3's compiled half, after the switch-over: if you write it, it stays an expected failure under row 307.
- Under Q13.3: ProjectFortress/tests/NatReflectTest.fss under walk keeps its two OK lines; by reading the uncommented clause stops walk at load until walk's loader binds the where-bound size, which is the failing run of your walk edit.
- The count and distance stages once on your final tree, before from batch 12's landed tables, read by row and line: the 23 gone, and under Q13.3 the two crash rows gone and the unhidden traits' sites listed, their 4 calls among the gone.
- Keep their verdicts: the 19 compiler_tests/NatRt* tests, NatArgRungS, NatDispArmChecker, NatOverrideChecker, XXXNatBoolChecker (row 307's bool half); the seven walk array tests (vectorOps, matrixOps, ArrayScalarExtension, ArrayOperatorsBesideLibrary, FlatTowerRungF, TabulateRungA, sparseMatrix).
- After the edit: the compiler and library test tracks once (ant testQuick) and, since walk's loader and the library changed, the interpreter suite once (ant testSystem); the count and distance stages once.

**Specification.** Item 15: the identity sentence, "Two types are identical if and only if they are the same kind and their names and static arguments (if any) are identical" (Specification/basic/types-vals-vars.tex:51-52, under the team's note that it "isn't complete in any case"), revised in the S1 form to say when two size expressions are the same (the same written form once numerals are folded) and that a size name is not known to differ from a numeral, as the team's Q&A answers (Specification/appendices/internal-document.tex:167-198); a new Appendix I entry before "Passages not yet revised" (Specification/appendices/changes.tex:3126) with the reason, the original sentence from Specification-1.0-frozen/, and route C (POSITIONS, "Every change to the specification is recorded with its reason."; "The S1 form"). Under Q13.3: the comprises proviso at Specification/basic/traits.tex:238-240, "provided that every static variable that occurs in its static arguments is a static parameter of T", widened to admit a where-clause variable of T's declaration, which the listed type then holds at every value; one sentence in "Nat and Int Parameters" (Specification/basic/trait-parameters.tex:80-112) stating the opening; and the entry "The traits that extend a closed trait" (changes.tex:1297-1397) amended with the reason and the team's comment as route C. List every other sentence your change makes false.

**Overlaps by file.**
- V edits the checker too, in TypeSchemaAnalyzer.scala and impls/Operators.scala, and the library's array family; no file of the checker is both rungs', and no library declaration: N types two local parameters inside Array2's and Array3's asString, V the bounds of Vector, Matrix and their family.
- V, O and G edit Library/FortressLibrary.fss; N only the two lines :2500 and :2899.
- W edits walk in Constructor.java and BuildEnvironments.forTraitDecl3; N edits BuildEnvironments' finishTrait, processWhereClauses and the comprises check, other methods.
- Specification/appendices/changes.tex: N adds an entry and amends "The traits that extend a closed trait"; V amends "The contexts that give a call an expected type"; W amends "Traits with comprises clauses read at the level of values". Different entries; the gather orders them.
- ProjectFortress/compiler_tests/: N and V add distinct files. ProjectFortress/tests/: N, V, O, G and W add distinct files.

### V. The checker's bound lists (a crash) and a tight juxtaposition (row 660), then the arrays' bound (item 13's fork 2) and matrix(v) (row 437)

**The answers this rung follows.** Fork 2 (PLAN item 13, point 2) is not answered: this rung builds it at the default of explorations/reviews/array-fork2-judgement.md, taken on the curator's standing go and listed for his review (section 2, Q13.2), and every line marked "under Q13.2" applies. That default bends the letter of POSITIONS, "The integration review's checks" ("the generic Vector/Matrix bodies are checked per operation's required capability, with no blanket ring bound that would exclude integer arrays") on Vector and Matrix while keeping its reason: every number type of the flat tower is a ring at its own type, integers included (Library/FortressLibrary.fsi:443), so no integer array is excluded; the scalar block keeps its letter, a bound per operator. The checker's crash comes first, test first: without its fix the library's overloading and export stages crash on the bound and hide their errors. Row 660 is the next checker rung's by PLAN's line for it; Q48's part (b), row 455's argument faces beside it, is not answered and is not this rung's. Row 437's repair takes the form fork 2 gives it (batch 12's rung S left it so). Route A stands (POSITIONS, "The exclusion rule stays and the tower is flat (route A)"). Where this section says "you" or "your", it means the curator.

**Rows.**
- A checker crash, no row yet (NEW-V-1): TypeSchemaAnalyzer.boundsSubstitution (scala_src/types/TypeSchemaAnalyzer.scala:441-490, the team's "TODO: FIX THIS FOR OPS", David Chase, 2012) builds each parameter's bound list from the conjuncts of the meet of its bounds and casts each to BaseType (:474-477). The analyzer reads a closed trait as the intersection of its name with the union of its comprises members and distributes the intersection, so the meet of { Number, MultiplicativeRing[\T\] } is a union and the cast throws: "ClassCastException: class com.sun.fortress.nodes.UnionType cannot be cast to class com.sun.fortress.nodes.BaseType", under reduceED (:421), normalizeED (:216), subtypeEDInner (:171), whenever the overloading checker compares two overloads whose parameter carries the list. Measured by the judgement on a library copy: three stage crash rows, the api's and the component's overloading and the component's export. The judgement's reading of the fix: keep the image bounds as the list they are, each already a BaseType, never met into one type to be cast; the comparison at :487 compares types and needs no cast. One call is refused for the same reason by reading, the norm's squaredNorm(me) at Library/FortressLibrary.fss:2483 ("is not applicable to an argument of type Vector[\T,k\]"); whether the same code refuses it is for your test to say.
- Row 660, no distance site: the checker gives no expected type to a tight juxtaposition of items none of which is a function, a(b) where a is not a function. The SMathPrimary case (scala_src/typechecker/impls/Operators.scala:205-376, the left-associating tail at :355-374) tries the multifix juxtaposition and then the left-associated binary ones with no expected type, where the loose juxtaposition (:170-197) and, since batch 12's rung C, the repeated operator (:379-393) give it. The fix mirrors theirs. Gated by ProjectFortress/compiler_tests/XXXInferTightJuxtContext.
- Under Q13.2, 23 sites: arithmetic on T in the bodies, 15 ("Could not check call to operator + ... is not applicable to an argument of type (T, T)" and its kin): Vector's +, -, unary -, scale, pmul and dot (Library/FortressLibrary.fss:2395, :2397, :2398, :2399, :2401, :2403) and Matrix's +, -, unary -, scale, mul's two products and its accumulation, rmul and lmul (:2703, :2705, :2706, :2707, :2713, :2739, :2715, :2769, :2774); the scalar block, 8 (:4716, :4717, :4718, :4722, :4723, :4724, :4725, :4726). The repair, as the judgement measured it: T extends { Number, MultiplicativeRing[\T\] } in place of T extends Number on the array family, 29 lines of the component (Vector, __DefaultVector, the factories vector and tabulatedVector, pmul, squaredNorm, the norm, Matrix, __DefaultMatrix, TransposedMatrix, the factories matrix, and every sized DOT and juxtaposition of the family, :2391-2871) and 32 of the api (Library/FortressLibrary.fsi:1602-1785); in the block, + and - take { Number, AdditiveGroup[\T\] }, MIN { Number, StandardMin[\T\] }, MAX { Number, StandardMax[\T\] } (:4716-4726; api :2683-2693), 8 and 8. The precedent lines: MaxSumReductionPair's and MinSumReductionPair's two-trait bounds (:3262, :3268) and SUM's and PROD's algebra bounds (:3284-3301). One site comes, as read: :2399, scale's "Function body has type Array1[\T,0,s0\], but declared return type is Vector[\T,s0\]", which its arithmetic error hides today.
- Under Q13.2, the 2 factory sites stay: "Ill-formed type: Vector[\T,s0\] The static argument T does not satisfy the corresponding bound Number" at vector (:2454) and the same for Matrix at matrix (:2831). By the judgement's reading a checker slip, not the bound's: TypeWellFormedChecker.scala:154-167 tests the written T with no bound in scope at the first declaration of each overloaded factory pair. It gets a row (NEW-V-2), not a repair: TypeWellFormedChecker.scala is N's file.
- Under Q13.2, row 437, 1 site: matrix(v)'s off-diagonal numeral 0 (:2834, "Function body has type OR(IntLiteral,T), but declared return type is T") becomes v.zero, which AdditiveGroup gives T under the new bound (Library/FortressLibrary.fsi:260). Under walk, matrix(v) for NN32 and NN64, refused today, then runs.
- Notes, not repairs: row 591 (a two-bound parameter that no call fixes stays at Bottom under walk; the arrays' calls all fix T); row 455 (Q48's part b, held); row 577 (count by row and line).

**Distance sites.** Under Q13.2, 23 gone, 1 come (:2399); row 437's 1 gone; net 23. The 2 factory sites stay. If the norm's call at :2483 stays refused, a point to report with its trace. No #crash stage row may come.

**Files.**
- ProjectFortress/src/com/sun/fortress/scala_src/types/TypeSchemaAnalyzer.scala (boundsSubstitution, :441-490).
- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Operators.scala (the SMathPrimary case, :205-376).
- Under Q13.2: Library/FortressLibrary.fss, the array family's T extends Number lines (:2391-2871), matrix(v) (:2833-2834) and the scalar block (:4716-4726); Library/FortressLibrary.fsi (:1602-1785, :2683-2693).
- Specification/appendices/changes.tex, the entry "The contexts that give a call an expected type" (:1985-2126), for row 660 only.
- New and promoted files in ProjectFortress/compiler_tests/; one new walk test in ProjectFortress/tests/.
- Not: TypeAnalyzer.scala, TypeWellFormedChecker.scala, Formula.scala, KindEnv.scala, TypeHierarchyChecker.scala (N's); Functionals.scala (the argument-context probe's, Q48 b); Array2, Array3 and every array declaration that is not the family's T extends Number line, matrix(v) or the block; the parent-trait bodies, the sizes tested in a branch, the export errors (a list of ways first); the model; walk.

**Tests, first.**
- The crash, against the compiler's prelude, whose Number is not closed, so each test declares its own closed trait: trait K comprises { A, B }, a self-typed trait R[\T extends R[\T\]\], objects A and B extending both. An XXX test with two overloaded generic functions f[\T extends { K, R[\T\] }\](x: T, y: ZZ32) and f[\T extends { K, R[\T\] }\](x: T, y: String), called on A: the checker crashes on the base, and must check and run after. An XXX test with g[\T extends { K, R[\T\] }\](x: T): T = h(x) and h[\T extends { K, R[\T\] }\](x: T): T: refused on the base as :2483 is, checking after if the same code refuses it. Each promoted by the fix, or the second kept with a row if its cause is elsewhere. GenericBesidePlainTwoBounds.fss keeps its verdict under walk.
- Row 660: XXXInferTightJuxtContext promoted to a name by topic, compiling and its value asserted; a(b)(c) beside it.
- Under Q13.2: the count and distance stages are the test of the 23 and of row 437's site, before from batch 12's landed tables, after once on your tree, read by row and line: the 23 and :2834's OR(IntLiteral,T) gone, :2399 come, the 2 factory sites unchanged, no #crash stage row, the export, isLeftZero and distribute errors still counted. Read the stage's FortressLibrary time against 739 s and report it.
- Under Q13.2: one walk test, values asserted, of what the bound names for an integer and a float element type: an integer vector's dot and scale, an integer matrix product, the block's MIN and MAX with a ZZ32 and an RR64 array, and matrix(v) for NN32 (its stop on the base is the failing run, row 437).
- Keep their verdicts: the seven walk array tests (vectorOps, matrixOps, ArrayScalarExtension, ArrayOperatorsBesideLibrary, FlatTowerRungF, TabulateRungA, sparseMatrix), RationalTest, IntegerOrderNumerals, GenericBesidePlainTwoBounds; InferLooseJuxtContext, InferRepeatedOperatorContext, the inference tests of batches N, 8, 10 and 12; XXXInferContextDrops (row 455).
- After the edit: the compiler and library test tracks once (ant testQuick) and the interpreter suite once (ant testSystem), since walk reads the library; the count and distance stages once.

**Specification.** Row 660: the entry "The contexts that give a call an expected type" says the checker "still gives none to the juxtaposition operator application that a tight juxtaposition of items none of which is a function stands for ... (row 660)" (Specification/appendices/changes.tex:2077-2081); your repair makes it false: amend it in the S1 form with the date and the row. The chapter's sentence already gives a tight juxtaposition the expected type (Specification/basic/inference.tex:149-151). Fork 2: none; the specification's elements of vectors and matrices are numbers (Specification/basic/expressions/aggregate.tex:152-170; Specification/preliminaries/overview.tex:917), which stays true; the library's bounds are the library's.

**Overlaps by file.**
- N edits the checker too, in other files; no checker file is both rungs'.
- N, O and G edit Library/FortressLibrary.fss and .fsi: N two local parameters in Array2's and Array3's asString; O the comparisons, isLeftZero and the tuples (:93-215, :4448-4553; .fsi :93-164, :2624-2635); G Generator, Indexed's default pairs, a new object beside SimpleMappedIndexed and cond (:1141-1239, :1847-1848, :3600, :4651-4661; .fsi :729-829). No declaration is two rungs'.
- Specification/appendices/changes.tex: N and W amend or add other entries.
- ProjectFortress/compiler_tests/: N adds distinct files.

### O. The library's orders: the tuple comparisons (row 634, item 43, way 1b), isLeftZero over TotalComparison (row 582) and IntMap's genComb (row 667)

**The answers this rung follows.** Row 582 is decided (POSITIONS, "LexicographicReduction.isLeftZero takes TotalComparison, so the team's answers are reached (row 582)."): the team's isLeftZero(_:Comparison): Boolean = true is declared over TotalComparison, so that the inherited ReductionWithZeroes.isLeftZero no longer shadows it; LessThan and GreaterThan answer true and EqualTo false; the pin at ProjectFortress/tests/LibraryMeetDeclarations.fss:33 changes, its before and after listed; the count goes to 0. Item 43 is not answered: this rung builds the tuple half at the default of explorations/reviews/tuple-comparisons-judgement.md, way 1b, taken on the curator's standing go and listed for his review (section 2, Q43), and every line marked "under Q43" applies; the list half, LexicographicOrder at :1932, waits for the where-clause line. Under Q43 one value walk prints changes, ((1,2),3) < ((1,3),0) from true to a refusal, and a pair whose first elements are unordered answers false where it stops today. Row 667 is the next library rung's by PLAN's line for it. Where this section says "you" or "your", it means the curator.

**Rows.**
- Under Q43, row 634's tuple half, 17 sites: the ten order operators on pairs and triples compare elements whose type parameters have no bound, "Could not check call to operator CMP ... is not applicable to an argument of type (A, A)" (Library/FortressLibrary.fss:4459, :4469, :4479, :4489, :4499 twice, :4511 twice, :4521 twice, :4531 twice, :4541 twice, :4551 three times), under the 2008 comment "Shouldn't these operators have to extend something? A,B,C?" (:4448). The repair, way 1b: A, B and C extends StandardPartialOrder[\A\] (and [\B\], [\C\]) on the ten operators in the api (Library/FortressLibrary.fsi:2625-2629, :2631-2635) and the component (:4456, :4466, :4476, :4486, :4496, :4508, :4518, :4528, :4538, :4548); the two = operators stay unbounded (.fsi :2624, :2630; .fss :4450, :4502). Comparison gains the lazy opr LEXICO(self, other:()->Comparison): Comparison, its default = Unordered beside :138, TotalComparison's = self beside :177 and EqualTo's = other() beside :211, with their api lines beside .fsi :104, :133, :164; without the two arms, a thunk typed ()->Comparison would reach the default on the compiled path and answer Unordered. Each of the eight typecases (:4459, :4469, :4479, :4489, :4511, :4521, :4531, :4541) gains Unordered => false, what RR64's own <, <=, > and >= answer for a value that is not a number (:439-442). The precedent lines: PCMP, bounded per element by the team in 2008 (Integral per element, 0948c2b1c) and typed ZZ32 per element by the revival (Library/RangeInternals.fss:99-121); the tuple reductions' bounds (.fsi:2011-2027); the strict and lazy arms at :176-177 and :211; the team's compiler prelude's LEXICO on Comparison (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:704). The comment at :4448 is answered and may go.
- Row 582, 2 sites: LexicographicReduction's isLeftZero(_:Comparison) (Library/FortressLibrary.fss:123; api Library/FortressLibrary.fsi:93) becomes isLeftZero(_:TotalComparison); the Meet Rule pair the checker refuses ("Invalid overloading of isLeftZero in trait LexicographicReduction", the api's and the component's) goes, and with it the count's last error. Nothing calls isLeftZero.
- Row 667, no distance site: IntMap's objects EmptyIM, SingletonIM and NodeIM (Library/IntMap.fss:142, :259, :406) define no body for IntMap's abstract genComb (:125), which combine calls (:112), so combine stops walk: "MethodClosure genComb[\That,Result\](...) ... has neither body nor def". The repair writes genComb in each object in the library's own shape: Map's combine on its empty and node objects (Library/Map.fss:260, :421-436) and IntMap's own union and intersection on the same three objects (IntMap.fss:191-196, :236, :333-346); name the precedent line of each body. A body for genComb comes before row 665's abstract half (row 665's notes).
- Notes, not repairs: row 634's list half (LexicographicOrder's fn(a:E,b:E) => a CMP b at :1932, the where-clause line); row 558, closed, whose fix is why the unordered pair stops with a MatchFailure today (no note: ledger.py writes no closed row); row 488 (BIG LEXICO(g) at :130, a site that varies from run to run: a point if it moves); row 665 and row 668 (not yours); row 577.

**Distance sites.** Under Q43 row 634's 17; row 582's 2: 19, all in component FortressLibrary and its api. Row 667 none. The count 1 to 0.

**Files.**
- Library/FortressLibrary.fss: LexicographicReduction's isLeftZero (:123); Comparison, TotalComparison and EqualTo's LEXICO lines (:138, :177, :211); the tuple operators (:4448-4553).
- Library/FortressLibrary.fsi: isLeftZero (:93); the LEXICO lines (:104, :133, :164); the tuple operators (:2624-2635).
- Library/IntMap.fss (EmptyIM, SingletonIM, NodeIM; :142-663).
- ProjectFortress/tests/: the pins LibraryMeetDeclarations.fss:33 and NumberOrderListDeclarations.fss:41 changed; new files named by topic.
- Not: LexicographicOrder (:1927-1937, .fsi:1333-1339), List, PureList, the = operators on tuples, Generator and the generators (G's), the array family (V's), the checker, walk, the specification, the team's tests.

**Tests, first.**
- The count and distance stages are the failing-then-passing test of the 19 sites, before from batch 12's landed tables, after once on your tree, read by row and line: the 19 gone, no site come; the count's table at 0.
- Row 582: the pin at LibraryMeetDeclarations.fss:33 (isLeftZero(LessThan) is false today) changed to true, with GreaterThan true and EqualTo false beside it, failing on the base; its before and after listed for you.
- Under Q43: TupleOrderBounds.fss (or a name of yours by topic), red on the base at its unordered line: (1,2) < (1,3), (1,2,3) CMP (1,2,2), (1.5, 2) < (2.5, 1), a pair of strings, a pair of lists, a triple under <= and >=, (1, 0.0/0.0) CMP (2, 0.0/0.0) is LessThan, and (0.0/0.0, 1) < (1.0, 1) is false, each asserted. TupleOrderNestedRefused.fss with its .test, load_exception_contains=Cannot unify, the top-level binding nested: Boolean = ((1,2),3) < ((1,3),0): red on the base (it runs today), passing after. The line NumberOrderListDeclarations.fss:41 goes, its before and after listed.
- Row 667: a walk test of combine over one-entry and many-entry IntMaps, stopping on the base, its values asserted after.
- Keep their verdicts: NumberOrderListDeclarations (but :41), ResultBoundsRungB, RangeKindBodies, LibraryMeetDeclarations (but :33), the team's IntMap, range and list tests.
- After the edit: the interpreter suite once, since walk reads the library.

**Specification.** None. The text is silent on tuple comparisons (Specification/basic/operators/opr-overview.tex:276-295) and on isLeftZero and genComb, and nothing it says is made false; Part IV renders the api lines when the PDF is rebuilt.

**Overlaps by file.**
- N, V and G edit Library/FortressLibrary.fss and .fsi in other declarations: N two local parameters in Array2 and Array3, V the array family and the scalar block, G Generator, Indexed's default pairs, a new object and cond. No declaration is two rungs'.
- Library/IntMap.fss: O alone.
- ProjectFortress/tests/: N, V, G and W add distinct files; O alone changes the two pins.

### G. The library's generators: a generator's size and index (row 629, item 45, ways 1, 3 and 6)

**The answers this rung follows.** Item 45 is not answered: this rung builds it at the default of explorations/reviews/generator-size-judgement.md, ways 1, 3 and 6, taken on the curator's standing go and listed for his review (section 2, Q45), and every line marked "under Q45" applies. The one new api declaration, Generator's opr |self|, is an extension the curator judges, shown its precedent line, Generator's own opr IN (process-engineering/library-extension-rule-archaeology.md section 5, point 4); the new object beside SimpleMappedIndexed is not in the api. No value walk prints today changes, by reading; what changes is where walk stopped. Where this section says "you" or "your", it means the curator.

**Rows.**
- Under Q45, row 629, 9 sites in three shapes. Shape A, |x| on a Generator, 5: DelegatedIndexed's |self| = |self.indices| (Library/FortressLibrary.fss:1961), PairGenerator's |self.e| |self.f| (:3720, two errors), NaiveSeqGenerator's size and |self| from |g| (:3798, :3800); "Could not check call to operator |_| ... is not applicable to an argument of type Generator[\I\]". Way 1: Generator gains opr |self| : ZZ32, declared in the api after opr IN (Library/FortressLibrary.fsi, Generator, :731-829) with a default in the component that counts by mapReduce over generate, self.mapReduce[\ZZ32\](fn (_:E):ZZ32 => 1, fn (a:ZZ32, b:ZZ32):ZZ32 => a + b, 0) (Generator, :1141-1239, beside opr IN at :1238), mapReduce rather than SUM so that the body does not meet row 425; the api comment says what opr IN's says, a naive O(n) default that sized types override. The five bodies stay as written.
- Under Q45, shape B, 3 sites and one hidden: RelationalPredicateCondition.cond reads x.size twice and then x[i], x[i+1] on x = target(), a Generator[\E\] (:4651-4661; the sites :4654 twice and :4657; the index at :4658 hidden). Way 3: cond becomes one generate with a MapReduceReduction whose element is (Boolean, Maybe[\E\], Maybe[\E\]), in the shape of Library/Generator2.fss:207-229 (efficientImplRelationalDistributiveImpl, whose join carries (R, R, Maybe[\E\], Maybe[\E\])), takeleft and takeright written in place since they are Generator2's; relation(), target() and the api unchanged.
- Under Q45, shape C, 1 site: Indexed's default indexValuePairs maps self.indices, a Generator, so it answers a Generator where Indexed[\(I,E),I\] is declared (:1847-1848). Way 6: one object beside SimpleMappedIndexed (:3600), for example SimpleIndexValuePairs[\E,I\](g: Indexed[\E,I\]) extends Indexed[\(I,E),I\], with generate over g.indices, opr[i] = (i, g[i]), opr[r] = SimpleIndexValuePairs(g[r]), bounds, indices and |self| from g, and a seq over seq(g.indices); the default at :1847-1848 answers it.
- Notes, not repairs: row 425 (why mapReduce and not SUM); row 577; the five families that declare indexValuePairs as Generator where the api says Indexed (List, PureList, Sparse, the rank-2 and rank-3 ranges), which draw no row today: a point if one moves.

**Distance sites.** Under Q45, row 629's 9, all in component FortressLibrary; no index site surfaces at :4658. Row 629 closes.

**Files.**
- Library/FortressLibrary.fss: Generator (:1141-1239, one declaration with its comment); Indexed's default indexValuePairs (:1847-1848); one new object beside SimpleMappedIndexed (:3600); cond (:4651-4661).
- Library/FortressLibrary.fsi: Generator (:731-829). If the checker refuses Indexed's abstract opr |self| (.fsi:1283) under the new concrete inherited one, that api line drops abstract; its body = self.size (.fss:1864) stays.
- ProjectFortress/tests/: three new tests, named by topic.
- Not: the checker, walk's Java, Specification/, Library/RangeInternals.*, Library/Generator2.*, List, Set, PureList, Sparse, the team's test lines, Indexed's and DelegatedIndexed's api comments (.fsi:1240-1243, :1343-1349), which stay true; the orders (O's), the array family (V's).

**Tests, first.**
- GeneratorSize.fss (walk): |g| of a filtered range, a nested generator, a mapped generator, a cross of two ranges (the product, by PairGenerator's own body), a naive seq of a filter, and a type that extends DelegatedIndexed and defines only indices (the shape of ProjectFortress/tests/spuriousSelf.fss:44-52), each asserted; every case stops walk on the base and passes after. Beside them, |x| of a list, a range, a string and an array, passing before and after: the type's own size is chosen.
- RelationalPredicateTargets.fss (walk): the relational predicate applied to a list, a range, an array slice, an array with a nonzero lower bound, a filtered generator, an empty generator and a one-element generator, each cond value asserted through if; the shifted array and the filter fail on the base. The tests that reach cond keep their verdicts.
- IndexValuePairsDefault.fss (walk): the pairs of a string, a DefaultZip and a CaseInsensitiveString: elements in order, |pairs|, pairs[i], pairs[r], and ivmap through them, asserted, passing before and after; shape C's failing-then-passing test is the distance stage.
- The count and distance stages once on your final tree, before from batch 12's landed tables, read by row and line: the 9 gone, no new |_| site, none at Indexed's api line.
- Keep their verdicts: IndicesGetterCalls, PrefixSetIndices, RangeDeclarations, GeneratorDeclarations, spuriousSelf, MapTest, HeapTest, Region, the team's generator tests.
- After the edit: the interpreter suite once, since walk reads the library; if walk's load check asks for a meet for the new |self|, the suite names the type, and an excludes clause in the library's shape is the answer, a point to report.

**Specification.** None. "An instance of Generator[\E\] only needs to define the generate method" (Specification/advanced/parallelism-locality/defining-generators.tex:22-25) stays true with a default; Part IV renders the new api line when the PDF is rebuilt.

**Overlaps by file.**
- N, V and O edit Library/FortressLibrary.fss and .fsi in other declarations (N two local parameters in Array2 and Array3, V the array family and the block, O the comparisons, isLeftZero and the tuples). No declaration is two rungs'.
- ProjectFortress/tests/: N, V, O and W add distinct files.

### W. Walk: an override at equal parameter types refused (batch 12's rung W, Q2), the override check on generic types (row 665's override half), the revival-covering callout corrected, and two owed tests

**The answers this rung follows.** Q2 of batch 12's rung W asked whether an override whose parameter types equal those of an inherited declaration overrides it; its entry under "Climb batch 12, listed for his review" held the landed reading, (a), as the default. The top-tier check explorations/reviews/walk-load-readings-check.md (section 3) found that the landed reading departs from the traits chapter's letter, "a strict subtype" (Specification/basic/traits.tex:585-595), with nothing later to outweigh it, and that no program in the tree writes such an override; the curator was told at 15:29 UTC on 2026-10-09 with the strict default. This rung builds it at that default on his standing go, listed for his review (section 2, QW2). Q1 of the same rung, PLAN item 51, is not answered: walk's allowance for a body at narrower parameter types stays as landed (row 666), and rows 668 and 669 wait with it. Row 665 is the next walk rung's by PLAN's line for it: its override half is this rung's; its abstract half waits, since checking each generic instance for a body would refuse IntMap's objects (row 667, rung O's in this batch) and SeededRandomGenWithDistribution (row 668, under item 51). The two tests batch 12's merged-diff review owes go into any rung that writes ProjectFortress/tests/, and this is the walk rung. Rows 614 and 615 stand as landed. Where this section says "you" or "your", it means the curator.

**Rows.**
- Row 653's walk half, sharpened: Constructor.checkOverrides (interpreter/evaluator/values/Constructor.java:555-576) refuses an own override that overriddenBy (:615-634) relates to none of the inherited declarations; overriddenBy asks that each parameter type of the inherited declaration be a subtype of the override's, equality included, so object B extends A with override f(x: ZZ32) over A's f(x: ZZ32) loads. The chapter: such a declaration overrides nothing, since an equal parameter type hides by the inheritance rule's second clause (traits.tex:521-527) and is not a strict subtype (:589), and it is a static error (:594-595). The repair is in checkOverrides alone: the strict relation, each parameter type a subtype and not all equal; providedByTrait (:528-530) and OverloadedFunction's FunctionalMethodMeets.inherited (interpreter/evaluator/values/OverloadedFunction.java:1211-1233) stay as they are, since there the equal clause and the override clause rightly act together. Row 653 stays open for its compiled half (row 650).
- Row 665's override half: walk checks an override only for an object without static parameters (Constructor.finishInitializing, :261-267, the check under if (declared)) and a trait without static parameters (interpreter/evaluator/BuildEnvironments.java:869-876, forTraitDecl3, ft instanceof FTypeTrait); a generic object, an object expression in a generic function and a generic trait with an override that overrides nothing load and run. Extend the override check to them; say whether you check the generic declaration or each instance, and why, and report the cost on the one library's load. The library writes no override (a grep of Library/ and ProjectFortress/LibraryBuiltin/), so the check refuses nothing of it by reading. The abstract half (XXXAbstractMethodUndefinedGenericWalk, XXXAbstractMethodUndefinedGenericObjectExpressionWalk) keeps its verdict; the row stays open for it.
- The revival-covering callout: Specification/basic/functions.tex:441-443 says "The compiled type checker checks, at each object declaration, that the object's concrete methods cover the abstract methods it inherits, reading no comprises clause", and the Effect of the Appendix I entry "Traits with comprises clauses read at the level of values" says the same (Specification/appendices/changes.tex:2604-2606). Both are false: the checker's coverage check reads comprises clauses since the team's 59fdeff62 (2012-06-06; scala_src/types/TypeAnalyzer.scala:154-158; scala_src/typechecker/AbstractMethodChecker.scala:81-122), and batch 12's rung W measured it (compile-ladder/rung-walk-load-checks/REPORT.md, CoverAbstractProbe). Correct both sentences in the S1 form. The revision of traits.tex:570-572 to the team's coverage rule waits with item 51.
- review-routed.1, no row: under walk a program's own reduction without static parameters that extends AssociativeReduction and declares simpleJoin only at Any, or with untyped parameters, is refused at load, "Object ... does not define an abstract method declared in type AssociativeReduction" (Library/FortressLibrary.fss, AssociativeReduction's abstract simpleJoin; Constructor.java:423-453, checkForDef), stated by FACTS and the skill with no gated test. Write the test: such a program with a .test keyed load_exception_contains=does not define an abstract method declared in type AssociativeReduction, passing on the base and after.
- review-routed.2, no row: the one library's Pairs loads under walk only through row 666's allowance, SingleRange defining RunRanges's abstract BOXPLUS only at the two types of its comprises clause (Library/Pairs.fss:78-87); no gated test imports Pairs. Write a walk test that imports Pairs and asserts a value of runRanges (Pairs.fss:72-73), which reaches SingleRange's BOXPLUS, passing on the base and after; if no call of it runs today, one that only loads Pairs.
- Notes, not repairs: row 666 (item 51, as landed); row 668 and row 669 (item 51); row 667 (rung O's); row 650 (the compiled half of row 653); row 614 and row 615 (as landed); row 670 (the demos refused at load since batch 12; no demo is edited).

**Distance sites.** None. The count and distance stages read no walk code they could move (FACTS, "The checker-count and distance stages read only the compiler's phases, so an edit to the test corpora, the texts or walk's evaluator and natives cannot move them"); the script's list of paths no stage reads names interpreter/evaluator/, where your edits are, and Specification/.

**Files.**
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java (checkOverrides, :555-576; finishInitializing's override check, :261-267).
- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java (forTraitDecl3 and declaresOverride, :869-884).
- Specification/basic/functions.tex (:435-444) and Specification/appendices/changes.tex (the entry "Traits with comprises clauses read at the level of values", :2549-2643, its Effect at :2604-2606).
- New and promoted files in ProjectFortress/tests/.
- Not: overriddenBy's other callers, providedByTrait, FunctionalMethodMeets, checkForDef and definedBelow (row 666's allowance); BuildEnvironments' finishTrait, processWhereClauses and checkComprisesClauses (N's); the library; the checker; the test harness; the demos.

**Tests, first.**
- OverrideEqualTypesWalk.fss and its .test keyed load_exception_contains=does not override any inherited declaration: trait A with f(x: ZZ32): String = "A", object B extends A with override f(x: ZZ32): String = "B". It loads on the base, so it is red there; it passes after.
- Row 665's override half: XXXOverrideNothingGenericWalk and XXXOverrideNothingGenericTraitWalk promoted, each with its refusal at load named; an object expression in a generic function beside them, refused alike.
- review-routed.1 and .2: the two tests above, passing on the base and after.
- Keep their verdicts: OverrideNothingWalk, OverrideNothingInTraitWalk, OverrideInTraitWalk, AbstractOverrideUndefinedWalk, FunctionalMethodOverrideOtherPathWalk (row 615's pin), the team's disp0.fss, disp1.fss and FunctionalMethodMeetProvided.fss, which widen with override; XXXAbstractMethodPartlyDefinedWalk (row 666), XXXAbstractMethodUndefinedGenericWalk and XXXAbstractMethodUndefinedGenericObjectExpressionWalk (row 665's abstract half); the team's XXXUnimplementedMethod.fss.
- After the edit: the interpreter suite once (ant testSystem), since every load check reads every component walk loads.

**Specification.** The two sentences of the revival-covering callout and its entry's Effect, corrected in the S1 form: the compiled checker reads comprises clauses in its coverage check. No other passage: the traits chapter already makes an equal-typed override a static error, and row 665's override half is a defect against its text.

**Overlaps by file.**
- N edits BuildEnvironments.java too, in finishTrait, processWhereClauses and the comprises check; W only forTraitDecl3 and declaresOverride. No other rung edits Constructor.java.
- Specification/appendices/changes.tex: N and V amend or add other entries; Specification/basic/functions.tex is W's alone.
- ProjectFortress/tests/: N, V, O and G add distinct files.

### The rule the rungs keep, and how they meet

- No two rungs change one declaration, and no rung builds on another rung of the same batch (PLAN, "The principle for the batches"). N and V are the checker's in different files; W is walk's, in methods N does not edit; O and G are the library's, in different declarations of two shared files, as are N's two local parameters and V's array family; N, V and W amend different entries of Appendix I.
- Item 15's part (b) and fork 3's clause, which must land in that order, are one rung, N, so the order is kept inside one tree and no rung depends on another.
- Row 665's abstract half needs row 667's genComb (O) and row 668's repair (item 51), so it is not in W: that would build on O.
- Where they meet only in a measure: N, V, O and G all move sites of component FortressLibrary, and N, V, O, G and W all reach the interpreter suite. The gate measures and runs the merged tree.

## 4. What the batch leaves out, each with its home

- **The arrays, 21 of the 67 after this batch, and what the unhidden traits show:**
  - The 2 factory sites (`vector`, `matrix`, `:2454`, `:2831`): a checker slip at `TypeWellFormedChecker.scala:154-167`, rung V's new row. Home: a checker rung once the row is traced (batch 14's lists).
  - 14 bodies typed by their parent trait (`:2399` among them after V): a list of ways (`fill` and `tabulate` redeclared at the leaf as `ImmutableArray1` does; `map` and `ivmap` through `tabulate` or `cast`). Home: batch 14's lists.
  - 3 sizes tested in a branch (`:2420`, `:2431`, `:2810`): a list of ways (a checker rule that refines a size in its arm, or the library's `cast`). Home: batch 14's lists.
  - 2 export errors (`FortressLibrary.fss:12`): decision E's dead sizes with the switch-over's design, and the library-wide api match.
  - Whatever `Array2` and `Array3` hold beyond their 4 run-time-size calls, once N types their `row` parameters: listed by N, then batch 14's lists.
  - Fork 3's compiled half (a call whose size is read off the argument's descriptor, and the code generator's refusal of a `where` clause) and way 4b: after the switch-over (row 307).
  - Forks 4, 5 and 6 (the width, decision D, decision A): phases 5 and 6 (PLAN item 13).
- **The self-typed bodies, 30 sites:** `reviews/self-typed-bodies-judgement.md`, way 6, its measurement running in `/home/user/fortress-selftype`. Home: rung T of this batch if it comes back clean before the launch (section 5, "Room for a sixth rung"); else batch 14, or the judgement's fallback, the team's `cast`.
- **Your other open items, 12 sites:** the integer power answering `RR64`, 6 (rows 438, 441 and 445; PLAN, "Raised by climb batch 6's rung T"); item 38, `String`'s operator pairs, 3 (row 585); item 46, `__bigOperator2`'s fused arm, 1 (row 632); `embiggen`'s team test line, 1 (row 631); the list order, 1 (row 634's list half, `:1932`, at the `where`-clause line). Home: your answers, then batch 14's lists.
- **`where` clauses, 12 sites:** rows 433 (6), 636 (4), 436 (2); PLAN's `where`-clause line.
- **Row 425, 3 sites:** the checker's rewriting of a reduction by its element type; a checker project before the switch-over.
- **Row 488, 1 site:** `BIG LEXICO(g)` at `:130`, which moves with the checker's query history.
- **Q48's part (b), row 455's two argument faces:** waiting on your answer, wide or narrow, recommended wide (`reviews/argument-context-probe.md`). Home: your answer, then a checker rung beside row 660; if you answer before the launch, the coordinator may amend this record to give it to rung V, since the probe's patch is one file, `impls/Functionals.scala`, that no rung edits.
- **Item 51, rows 666, 668 and 669, and row 665's abstract half:** your answer to item 51; then a library rung repairs rows 668 and 669, a walk rung builds the team's coverage rule in place of the allowance (`reviews/walk-load-readings-check.md` section 2.5) with `traits.tex:570-572` revised, and row 665's abstract half follows row 667 (rung O) and row 668.
- **The third crash row,** `__bigOperator`'s local `body(i)` at `FortressLibrary.fss:1304`: a one-line slip that unhides a declaration whose sites are unread, routed by no line. Home: batch 14's lists.
- **Rows 612 and 616:** D5's and row 591's entries. **D2's case, rows 645 and 662:** D2's entry. **Row 663** (`CONTESTED`): batch 11's entry on the open type's dispatch.
- **Row 661,** the strided `:` answering a `Range`: its entry under "Climb batch 12, listed for his review", as landed.
- **Row 670,** the five demos refused at load: its entry and R10's line; no demo is edited.
- **Row 653's compiled half and row 650:** your entry on the code generator's `override`.
- **Rows 570, 646, 659, 652, 643, 555:** as batch 12's record placed them.
- **The skill writer's list from batch 12:** done at `38def33a9`; nothing for the batch.

**What PLAN gives batch 13, and where each goes** (PLAN, phase 3 item 11, and the lines under item 10):
- Item 15's checker rung: N.
- Forks 3 and 2, "which come to him next": N (fork 3 at 4a) and V (fork 2 at its default), on the standing go, listed (section 2).
- Rows 660, 665 and 667: V (660), W (665's override half; its abstract half held), O (667).
- The two tests batch 12's merged-diff review owes (review-routed.1 and .2): W.
- Row 582, the count's last error: O.
- The lists of ways for the self-typed bodies, the tuple comparisons and item 45: judged since; the tuples O, item 45 G, the self-typed bodies waiting on their measurement.
- Q48's part (b) with row 660 beside it: Q48(b) held; row 660 in V.
- Item 51 before row 666 is tightened: held.
- Rows 612 and 616, D2's case and row 645: held.
- The skill writer's task: done.

## 5. How it is run

The batch runs on the redesigned workflow: `coordinator/climb-batch-workflow.js`, its manual `coordinator/climb-batch-workflow.md`, and the practice they build, `coordinator/process-engineering/batch-redesign.md`, as batch 12 ran (`compile-ladder/climb-batch-12/RECORD.md`). Each rung's worker does the rung test first; its skeptic checks it and fixes what it finds, test first, and a judge rules only on a fix the skeptic marks contested or on a rung the skeptic cannot fix; the gather lands the rungs on `main` and folds their record lines, their ledger rows through `coordinator/tools/ledger.py`, and their entries for the skill's part on the revival's changes; the merged-diff review and the gate run side by side, then a cold reader reads the skill text the batch added; the commit stage lands the gate's tables, runs the quick microGPT walk check and pushes. Section 3 is each worker's brief word for word, with the answers line it opens with; this section holds the rest of the manifest, which `explorations/compile-ladder/plan-13/manifest/gen13.py` reads with the briefings of `lists13.py` beside it, and `check13.js` checks.

### The manifest, rung by rung

Each block gives the fields of one rung's manifest entry. "Its test is the stage" means the checker count and the distance are the rung's failing-then-passing test, before from batch 12's landed tables (`compile-ladder/climb-batch-12/gate/`, `compile-ladder/gate/distance-sites.tsv`) and after once on the rung's tree. "Joins the gate" names a step the gate gains once the rung lands; none does, and `ant testSpecData` runs because batch 12's landed summary has it. Rung O declares the checker count it expects, 0. The points to report are the kinds of change the curator reviews after the landing: a rung that reaches one finishes, lists it with its evidence, and lands (POSITIONS, "Reversible stops do not hold a batch."); only a step that cannot be undone, or that would act against a decision of the curator, holds the push.

#### N
- **slug:** `rung-size-expressions`
- **worktree:** `/home/user/fortress-sizes`
- **expected minutes:** 150
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** under item 15 (15a with b) the compiled checker accepts arithmetic in a size, compares sizes by their written form once numerals are folded and lets a size name equal a numeral, and the class loader computes a folded size; then, under Q13.3 (fork 3, default way 4a), the team's commented NatParam comprises clause is restored, the checker opens a NatParam argument as that value's own size for the call, walk's loader reads the where binding, and Array2's and Array3's untyped row parameters are typed; the identity sentence, the comprises proviso and the size chapter revised in the S1 form; 23 sites and 4 hidden, row 664.
- **points to report:**
  - A compiled test whose verdict changes other than by the rung's intent, or a ladder file that moves.
  - A program the text allows that the checker now refuses, or one it refuses that the checker now accepts, outside sizes.
  - Every site the unhidden Array2 and Array3 traits bring, by row and line, and every site gone beyond the 23 and the 4.
  - The class loader's computed size: what it changes in a class name or a stamped descriptor, and any compiled test that moves with it.
  - A walk value that changes, or a library type walk now refuses at load, with the clause's load check.
  - A size opened twice in one call, or an opened size reaching a declared type, met in the library or the tests.
  - Normative text changed beyond the identity sentence, the comprises proviso, the size chapter's sentence and their Appendix I entries.
  - A library edit beyond NatReflect's clause and the typed row parameters, or a team test line changed.

#### V
- **slug:** `rung-array-bound`
- **worktree:** `/home/user/fortress-arraybound`
- **expected minutes:** 110
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** the compiled checker stops crashing on a bound list that names a closed trait (the team's boundsSubstitution, test first) and gives a tight juxtaposition of non-functions its expected type (row 660, its Appendix I sentence amended); then, under Q13.2 (fork 2, the judgement's default), Vector, Matrix and their family take T extends { Number, MultiplicativeRing[T] }, the scalar block a bound per operator, and matrix(v) writes v.zero (row 437): 24 sites, 1 come; Scala under scala_src/types/ and scala_src/typechecker/impls/, and library bounds.
- **points to report:**
  - A compiled test whose verdict changes other than by the rung's intent, or a ladder file that moves.
  - The norm's call at FortressLibrary.fss:2483 still refused after the fix, with its trace.
  - A #crash stage row in the distance, or a site that comes beyond scale's at :2399.
  - The stage's FortressLibrary time against 739 s.
  - A value walk prints that changes, matrix(v) for NN32 and NN64 among them, each with its before and after.
  - A change in which declaration an operator application or a call chooses once a tight juxtaposition gets its expected type.
  - An array declaration edited beyond the family's bound lines, matrix(v) and the scalar block.
  - A checker file of rung N's edited, or a walk edit.

#### O
- **slug:** `rung-tuple-orders`
- **worktree:** `/home/user/fortress-orders`
- **expected minutes:** 90
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **checker count:** 0
- **blurb:** under Q43 (item 43, way 1b) each element of a tuple comparison is bounded by StandardPartialOrder, Comparison gains the lazy LEXICO with its two arms and each typecase an Unordered clause (row 634, 17 sites, one walk pin replaced by a refusal); under the curator's decision on row 582, LexicographicReduction's isLeftZero takes TotalComparison (2 sites, the count to 0); and IntMap's objects get the genComb body they lack (row 667); library declarations only.
- **points to report:**
  - A value walk prints that changes, each with its before and after: the nested pair now refused, the unordered pair's MatchFailure now false, isLeftZero's three answers, and any other.
  - A new api declaration beyond the three LEXICO lines, or a team declaration removed.
  - Walk's load check of the three LEXICO arms, and the overloading stage's answer to them.
  - A site that comes behind the 17, or row 488's site at :130 moving.
  - A library caller or a suite test that compares a pair of pairs or a pair with an unordered element.
  - Each genComb body's precedent line, and a change to which declaration walk runs for an IntMap.
  - A team test line changed.
  - A checker or walk edit, or a site whose only repair is one.

#### G
- **slug:** `rung-generator-size`
- **worktree:** `/home/user/fortress-gensize`
- **expected minutes:** 85
- **its test is the stage:** yes
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** under Q45 (item 45, ways 1, 3 and 6) Generator gains opr |self| with a default that counts by running the generator, the relational predicate's cond becomes one reduction carrying each part's first and last element, and Indexed's default index-value pairs become a small object beside SimpleMappedIndexed (row 629, 9 sites); library declarations only.
- **points to report:**
  - A value walk prints that changes, and where walk now answers where it stopped (a filter's size, cond on an unsized target, the pairs' printed form), each with its before and after.
  - Indexed's abstract opr |self| refused under the new concrete one, and the api line changed for it.
  - A program walk refuses at load after the new declaration, and the meet or excludes clause added for it.
  - A new api declaration beyond Generator's opr |self|, or a team declaration removed.
  - A gated test whose pin names mapped(...) for a default pairs value.
  - A family that declares indexValuePairs as Generator moving on the distance.
  - A team test line changed.
  - A checker or walk edit.

#### W
- **slug:** `rung-walk-override`
- **worktree:** `/home/user/fortress-walkoverride`
- **expected minutes:** 80
- **its test is the stage:** no
- **writes state:** no
- **joins the gate:** none
- **checker count:** none
- **blurb:** walk refuses at load an override whose parameter types equal the inherited declaration's, as the traits chapter's strict subtype says (batch 12's rung W, Q2, default strict), and checks an override that overrides nothing on generic objects, object expressions in generic functions and generic traits (row 665's override half); the revival-covering callout's sentence that the checker reads no comprises clause, false since 2012, is corrected with its Appendix I Effect; two tests batch 12's review owes (a reduction declaring simpleJoin at Any refused at load; Pairs loading); Java under interpreter/evaluator/.
- **points to report:**
  - An interpreter test whose verdict changes other than by the rung's intent: each with its before and after.
  - A library type, a team test or a demo that walk now refuses at load, with the declaration and the check that refuses it.
  - Whether the generic override check runs at the declaration or at each instance, with its cost on the one library's load.
  - A change to which declaration walk runs for a set it loads today.
  - Normative text changed beyond the two corrected sentences.
  - A library, checker or test-harness edit, or a demo edited.

### What every agent of the run reads first

This run is climb batch 13, the record CLIMB-BATCH-13.md, phase 3's next batch after 12, toward the checker at a true zero: two checker rungs, two library rungs and one walk rung. The curator answered item 15 (15a with its part b) and decided row 582; the batch runs on his standing go for phase 3, so fork 3 (way 4a), fork 2 (the two-trait bound), item 43 (way 1b), item 45 (ways 1, 3 and 6) and rung W's strict override are built at their judgements' defaults and listed for his review. The distance stands at 153 and the count at 1 after batch 12 (compile-ladder/climb-batch-12/gate/). The rungs meet only in a measure: no two rungs change one declaration, and no rung builds on another rung of the batch. N and V edit the checker in different files: N the size rules, the kind environment, the hierarchy check and the loader's size spelling, V the bound substitution and the tight juxtaposition. W edits walk's Constructor and one pass of BuildEnvironments; N edits other methods of BuildEnvironments. N, V, O and G edit Library/FortressLibrary.fss and .fsi in different declarations: N two local parameters in Array2 and Array3, V the array family's bounds, matrix(v) and the scalar block, O the comparisons, isLeftZero and the tuple operators, G Generator, Indexed's default pairs, one new object and the relational cond; N alone edits NatReflect, O alone IntMap. ProjectFortress/compiler_tests/ takes N's and V's distinct files, ProjectFortress/tests/ every rung's distinct files and O's two changed pins. N, V and W edit Specification/appendices/changes.tex in different entries; N also the types, traits and static-parameter chapters, W the functions chapter's callout. N, V, O and G all move sites of component FortressLibrary, and every rung reaches the interpreter suite; the gate measures and runs the merged tree. ant testSpecData runs in the gate because batch 12's landed summary has it.

### Before the launch

The coordinator, in this order:
1. This record with its generator on `main`, and its top-tier review in place on the standing pre-approval of such reviews. FACTS is already consolidated to batch 12's figures (`b886aedae`). The base is `main`'s head after them, its full hash, passed as `args.base`.
2. The base build, as the manual's "Before the launch" gives it: `git -C /home/user/fortress worktree add --detach /home/user/fortress-base13 <base>`, `ant compileAll` in it, the library order, one passing walk test, `git status --porcelain` empty; passed as `args.baseBuild`. One trial seed proves it (`coordinator/tools/seed-worktree.sh /home/user/fortress-base13 /home/user/fortress-seedcheck - <base>`, then `git -C /home/user/fortress worktree remove /home/user/fortress-seedcheck`), and one `coordinator/tools/old-fortress.sh /home/user/fortress-base13 /home/user/fortress-seedcheck-caches ProjectFortress/tests/BooleanOps.fss` run from the main tree proves the old code runs, its folder removed after.
3. No probe: each fork here is judged on file, and each rung's first measurement is its own test (V's crash, G's api redeclaration, N's unhidden traits). If the self-typed measurement lands clean, rung T as "Room for a sixth rung" says; if Q48's part (b) is answered, the amendment section 4 names.
4. The briefings checked on the base: `python3 explorations/compile-ladder/plan-13/manifest/lists13.py`, every key matching one place. The block generated and spliced: `python3 explorations/compile-ladder/plan-13/manifest/gen13.py`, then `node explorations/compile-ladder/plan-13/manifest/check13.js`, which splices it into a scratch copy and checks it; then the same splice into the script itself (`check13.js --write`), `node explorations/coordinator/tools/workflow-scenarios.js` on the spliced script, and the commit. No launch value is set by hand: the batch's new ledger rows are numbered by the gather through `ledger.py add`.
5. `df -h /` against five seeded worktrees (about 206 MB each) and the base build; `/home/user/fortress-selftype` removed once its measurement is read; `git status --porcelain` empty in the main tree, and no other agent writing there or pushing `main` while the run gathers and commits. The session's permission rules let the commit stage run `explorations/coordinator/tools/mg-run.sh`.
6. Check-ins armed for the run's length, 45 minutes apart, and one after the session's predicted process stop at about 23:01 UTC (the `cloud-container` skill; POSITIONS, "Check-ins and stops."); a run stopped there is resumed with `resumeFromRunId`.

The launch: `Workflow({scriptPath: 'explorations/coordinator/climb-batch-workflow.js', args: {base: '<the full hash of the base>', baseBuild: '/home/user/fortress-base13'}})`. The arguments are kept byte for byte in the session's scratchpad, since a resume needs them.

### Room for a sixth rung

The self-typed bodies' measurement (`reviews/self-typed-bodies-judgement.md` section 6, way 6, rule (a) as a shadow in `/home/user/fortress-selftype`) is running. If it comes back clean before the launch (the 29 sites of classes S1 and R4 gone, no new error, no stall), the coordinator may add rung T, a checker rung in the form of N: `scala_src/disambiguator/SelfParamDisambiguator.scala` and the extender check of rule (b), with `Specification/basic/expressions/var-ref.tex`, the traits chapter and an Appendix I entry. Two cuts first, by the record's rules:
- Rule (b)'s extender check sits in `TypeHierarchyChecker.scala`'s loop at `:208-258`, inside `checkDeclComprises` (`:192-283`), which rung N edits for fork 3. T's check goes into a function of its own, called beside `checkDeclComprises` and editing none of it, or rule (b) waits for batch 14.
- `Specification/basic/traits.tex`: N edits the comprises proviso (`:235-240`); T's passage must be another.
- `numerator`'s line at `Library/FortressLibrary.fss:685` (shape C, `Integral`'s section) is no rung's declaration here; T takes it itself, as a library line beside its checker change, or it waits.
The coordinator then adds `T` to `IDS` in `lists13.py` with its lists, a `### T.` section to section 3, a `#### T` block here, and runs `gen13.py` and `check13.js` again; the distance expected falls by 29 or 30.

### The gate, and what it should show

The comparands are batch 12's `summary.txt`, `checker-count.txt` (1) and `distance.txt` (153), with `distance-sites.tsv`.
- `testSystem`: the comparand's sum (554: 138, 140, 141 and 135 over the four shards) plus the files N, V, O, G and W add; a promotion or a changed pin moves nothing.
- `testFast`: the compiler track 1,086 plus the cases N and V add; the library track 86, the othercompiler track 263 and the misc tracks unchanged.
- `testSpecData`: 130 green, run because the last landed summary has it.
- The four-thread atomic runs, 42 lines: unchanged.
- The ladder: no rung declares a move; N's and V's checker changes are the ones that could move a file, each a point to report.
- The checker count: 1 to 0, declared by rung O. The distance: reported, never red. By reading, N clears 23, V 24 and brings 1, O 19, G 9; W moves neither measure. The distance near 79, plus what `Array2` and `Array3` show once unhidden, plus 1 if `:2483` stays refused.
- A repair after the review or the gate runs the gate again only when it changed a path the gate reads (`ProjectFortress/` but test files, `Library/`, `build.xml`).

### The ledger

New rows go into `explorations/fortress-gap-ledger.md` only through `ledger.py add`, by the gather, in the order it applies the rungs (its `RECORD.md` says which order and why); until then a worker or a skeptic writes each new row in its `record.md` in the row template with the placeholder `NEW-<rung>-<n>` for its number (`NEW-V-1`), and the gather replaces every placeholder with the number `ledger.py` gives. Rows the rungs open by plan: V's crash in `boundsSubstitution` (NEW-V-1, closed with V's commit when its tests are promoted) and V's factory slip (NEW-V-2, open). Rows the rungs close (`ledger.py close`, after the rung's commit is on `main`): 664 (N, under Q13.3); 660 and 437 (V); 582 and 667 (O); 629 (G); each as its test passes on the merged tree. Rows that stay open with a note: 634 (O, its list half), 653 (W, its compiled half), 665 (W, its abstract half), 307 (N), 25 (N). Notes: 636, 577 (N); 591, 455, 577 (V); 488, 668 (O); 425 (G); 666, 668, 669, 650, 670 (W); row 558, which rung O's section names, is closed (`FIXED`) and takes none. Where `ledger.py` refuses a note for length or a closed row (gather.2 of batch 12), the gather lists the text for the coordinator.

### After the landing

The coordinator: the landing report; the routing of every item for the curator into PLAN, the questions of section 2 among them with the defaults that landed, and a PLAN line for every row the batch opens; FACTS consolidated; the post-batch review, which reports this batch's measures against batches 8 to 12 as `process-engineering/batch-redesign.md`, "The measures", defines them; batch 14's lists, from section 4.

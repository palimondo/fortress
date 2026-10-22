# FACTS clarity assessment, chunk f4: F-52 to F-63

Base: `main` at `8c99c2413`, 2026-10-22. Rubric: `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", and `.claude/skills/coordinator/references/record.md`, "What an entry is". Each entry was read with `facts-extract.sh 'F-N+'` and `'history:F-N'`, and its cited evidence was followed in bounded sections: the report section, the gap-ledger row, the gate's tables, the test, and in places the library or checker source. No experiment was rerun and no transcript was searched.

How the marks were applied: if an over-broad title or sentence conflicts with a linked entry only on a literal reading, it is marked as a scope fail. It is marked as a consistency fail only if the two entries still disagree on a charitable reading.

Counts: keep 1, reword 7, reorganize 4, investigate 0. Of 12 entries, 11 are to be rewritten.

## The table

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-52 | **fail**: the title's identity clause covers every reduction, where F-59 and P-78 hold it for `SUM` and `PROD` and F-60 gives `BIG MAX` none; the no-argument overload claim rests on one compiled-path probe | pass: the `RationalQuantity` claim is current; the authorship sentence is dated | **fail**: the pointer "(F-59)" does not hold the overload claim; `flattening-questions-ways.md` Question 1 section 2 does, measured on the compiled path with the compiler library | **fail**: `RationalQuantity` is not glossed; "Steele's operators of 2011" has no referent | **fail**: four subjects, three of them owned elsewhere or history | pass: on a charitable reading it agrees with F-59, F-60, F-55, P-74 and P-78 | **reorganize** |
| F-53 | pass: "at the last landed gate" bounds both values, batch 20's (`climb-batch-20/gate/distance.txt` `#total 5`, `checker-count.txt` `#total 3`) | pass | pass: the gate's `#class` rows X1 1, BR 2, OT 2, every api 0, `#crash none`; `gate/distance-sites.tsv` lists the five sites; `reviews/batch-20-review.md` section 1 ties the count's three to `FortressLibrary.fss:1465`, `:4386`, `:4392`; row 731 names "3 sites of the distance"; row 632 | **fail**: three referents need batch 20's or the review queue's history; the last sentence does not parse | pass: the one entry for the count, with its value, what it counts, and its kinds | pass: F-54, PLAN's "The live thread", rows 731 and 632 agree | **reword** |
| F-54 | pass: the title's claim holds (`#class` rows of each gate's `distance.txt`) | **fail**: the row 680 sentence reports a repair's outcome, not a current property | pass: `perf-probes/prelude/distance-triage.md` section 2.2 (a generic coercion refused; the library's `x.zero` and `x.one`) and section 3.4 (over 15 minutes, the run stopped at 47); `rung-checker-bounds/REPORT.md` section 6 ("None lies in `Array3`") | pass, with a note: "the array bound" is the array family's element bound (F-94) | **fail**: four subjects under a title that states one | **fail**: its numeral sentence names other ways than F-57 does | **reorganize** |
| F-55 | pass | pass | **fail**: the detail sections record the tree before this inference was built | pass, with a note: the row 412 sentence does not say why it is there | **fail**: it restates F-73 (checker) and F-137 (walk, which also holds row 510) without naming them | pass: agrees with F-73, F-137 and P-74 | **reorganize** |
| F-56 | pass | pass | **fail**: the cited section does not hold the last sentence, and that sentence cites a ruling as support | pass | **fail**: the `BottomType` sentence is F-78's subject (the instance at a call), not the expected type at `f(x)` | pass: F-78's "never `BottomType`" is for a call, and F-56 states the difference | **reorganize** |
| F-57 | pass | pass | **fail**: rows 325 and 443 do not support "only walk checks" | pass | pass: one subject, a numeral's type on each path | **fail**: F-54 names other ways for a numeral in generic code | **reword** |
| F-58 | **fail**: the title states a current count, and the body bounds it to one measurement on an earlier library and says 3 of the 14 are gone | pass: the measurement is explicitly bounded | pass, with a note: `array-design-ways.md` section 2; the `DOT` clause matches `rung-array-sites/REPORT.md` section 7 ("by reading E3 clears them … not measured here") | pass, with a note: "climb batch 20's rung A" is a batch handle | pass | pass: F-35 (dead sizes gone), rows 533 and 474 | **reword** |
| F-59 | **fail**: "every generic big operator" is broader than row 731's (a bound that names the parameter), and the entry does not say that a declared type receiving the value does not fix the element type | pass | pass: the gates exist (`InferBigOperatorUnwritten` is row 731's reproducer); `sum-replacement-judgement.md` section 5, table 2, measured that the unwritten form is refused and the written form accepted; F-143 for walk | pass | pass | pass: on a charitable reading ("since an F-bounded parameter") it agrees with F-221 and row 731; P-78 agrees | **reword** |
| F-60 | pass | pass | **fail**: the cited test asserts the empty `BIG MIN`, not `BIG MAX` | pass | pass | pass: P-78 (which points to F-60, a pointer that `facts-extract.sh` does not list) and F-59 | **reword** |
| F-61 | pass | pass | pass, with a note: `perf-probes/prelude/REPORT.md` section 5 holds the three steps; the shim claim is in section 4 | **fail**: a quoted handle and two shorthand step names | pass | pass: F-67, F-131, F-53 (every api at 0), F-32 | **reword** |
| F-62 | pass: the title and body agree on the compiled checker and on the specification's reading | pass | pass: `rung-comprises-checker/REPORT.md` section 4 (the specification against the 2012 reading until rung X) and section 3 (the `comprises I` idiom: the checker's filter drops it, walk overflows, row 407); rows 595 and 596 (walk reads only the main component's clauses) | pass | pass: walk's behaviour and the `comprises I` idiom are conditions on the same closure | pass: P-44, F-72, F-171, F-29 agree | **keep** |
| F-63 | pass, with a note: the title omits the `QQ` clause that the body holds | pass | **fail**: "each is an error" is not shown for `Condition.map` on the landed checker, and the cited section shows a different `QQ` clause | pass | pass, with a note: the `QQ` clause is a fourth form of the api; the title could name it | pass: F-64 agrees | **reword** |

## Each failing entry: the passages, and what the rewrite needs

### F-52, reorganize

- Scope: "An empty reduction's identity comes from its static argument". F-59 and P-78 hold this for `SUM` and `PROD`. F-60 and P-78 say that an empty `BIG MAX` or `BIG MIN` has no identity and raises. The second passage is "A form with no argument cannot be overloaded by its result type alone". It rests on `Q1NullaryComp.comp.txt` alone: with a `ZZ32` and a `String` version declared, the compiled checker picked the `String` one.
- Evidence: "(F-59)". F-59 does not state the overload claim. `reviews/flattening-questions-ways.md`, "Question 1", section 2, "The two ways to get an identity without an element, measured", holds it.
- Comprehension: "neither path can build `RationalQuantity`". The entry does not say what `RationalQuantity` is: the advanced numbers chapter's sign-refined rational type, which the team's `tests/conditionalExtension.fss` declares by a conditional `extends … where`. The second passage is "before Steele's operators of 2011". These are the `ZZ32` and `ZZ64` operators, and the `ZZ32` big `+` and big `MAX`, in `CompilerLibrary`.
- Ownership: the title bundles the three questions of one report, "a section for each question". The identity is F-59's subject. The mixed widths are F-55's, with F-73, F-137 and P-74. The flattening's authors ("Chase, Ryu, Maessen and Allen flattened the compiler prelude's tower in 2009 and 2010") are history. They are in the report's opening, "One premise of the brief, corrected by the history".
- Rewrite: F-52 keeps one claim, that neither path can build `RationalQuantity`. The checker refuses it as a cyclic type hierarchy. Walk runs the team's declaration only because nothing instantiates it, and fails when it is instantiated. The detail is `flattening-questions-ways.md`, Question 3, section 2. Drop the identity and mixed-width clauses, and point to F-59 and F-55. Move the no-argument overload sentence into F-59, scoped to the compiled path's measurement, or leave it in the report. Move the authorship sentence to the history. F-52 has no incoming pointers.

### F-53, reword

- Comprehension:
  - "the api's second export error (class X1)". "Second" means something only against batch 20's removed first error (`batch-20-review.md` section 1). Today it is the one export error, the component against its api.
  - "item 46's fused arm (row 632)". Item 46 is a review-queue item, and the arm is `__bigOperator2`'s fused `typecase` arm. The entry says neither.
  - "By kind and by site, a rung's before (…): the last landed batch's `gate/distance.txt` and `compile-ladder/gate/distance-sites.tsv`". The sentence does not parse. It means that a rung measured by the count or the distance takes the last landed gate's tables as its starting values (`references/batch.md`, "The checker count and the distance").
  - "Both are reported, never red". This could say that neither measure turns the gate red (P-39).
- Rewrite: keep the two values, the five sites by class and the count's three. Name the export error by what it is, name the fused arm by its function, and turn the last sentence into a plain pointer. Other entries give F-53's number, and their pointers stay valid.

### F-54, reorganize

- Present meaning: "Row 680's crash hid no error: with its repair (F-233) the component's check finds none in `Array3`, and the distance lost its crash row." This tells how the present came about. The current property is that `Array3` checks clean and the gate's `distance.txt` reads `#crash none`, and F-233 owns the repair.
- Ownership: the title states that the gate classes the distance by root cause. The body adds three subjects:
  - a numeral in code generic over `Integral` (F-57's subject);
  - row 680's repair (F-233 and its history);
  - "With `StandardMinMax[\T\]` added to the array bound, the overloading check ran past 15 minutes when measured, before row 688's memo". This is the array family's bound and the checker's time, F-94's subject.
- Consistency: "a numeral where such an `I` is expected needs `x.zero` or `x.one`". F-57 says "only `x.one` and the witness `typecase` give a `T` on both paths". The two entries list different ways.
- Rewrite: keep the classing claim. F-53 already says "by root cause (F-54)", so the classing could become one clause of F-53. Move the numeral sentence into F-57, listing the getters and the witness `typecase`, with the reason that no coercion into an arbitrary `I extends Integral[\I\]` can be declared (triage section 2.2). The pre-memo timing goes to F-94 as a measurement bounded to its day, or stays in triage section 3.4. The row 680 sentence goes to the history. F-53 ("by root cause (F-54)") and PLAN's "The live thread" (`PLAN.md:11`, "F-53, F-54") point to F-54. Both need repointing if the classing moves into F-53. `facts-extract.sh 'F-54+'` reports no incoming pointers, so it misses F-53's in-sentence pointer.

### F-55, reorganize

- Evidence: "Detail: `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.2, 3.4 and 4.2". The digest was taken at `219cd7038`, before inference with coercion was built. Section 3.4 is headed "Not while solving". Section 4.2 measures `twice(l, 3)` refused under walk, "Cannot unify AnyIntegral …". The claim's support is its gates, `compiler_tests/InferCoercionShapes` and `tests/InferCoercionRungK` (the two that `InferCoercion*` matches), and the rungs that built it: `compile-ladder/rung-inference-checker/REPORT.md` (section 3.2, which F-73 cites) and `compile-ladder/rung-inference-walk/REPORT.md`.
- Ownership: "Static arguments are inferred with coercion on both paths: the compiled checker from the arguments' static types and the expected type, walk from their run-time types". F-73 owns the checker half and F-137 the walk half, and F-137 also holds row 510 ("Not reached: rows 432, 486, 510 and 511"). F-55 names neither.
- Rewrite: either make F-55 the summary across the two paths, with pointers to F-73, F-137 and P-74 and its detail repointed to the two rung reports, or merge it into those entries. Keep row 412 only with its bearing: on the compile path an unwritten bound is `Object`, so a parameter that nothing fixes takes `Object` there (F-78, P-48). Otherwise move it to F-78. F-52 points to F-55 for the mixed widths, so reconcile that pointer.

### F-56, reorganize

- Evidence: "The overloading check's comparison of type schemas binds an open variable to `BottomType`, which a call's solver never does (P-48)." `measure-D.md` section 1, the cited detail, does not hold this. It is in `compile-ladder/rung-instance-bound/REPORT.md`, decision D1: the type-schema comparisons keep `solve`, and only call inference takes the bounds (its header's "deviation" line and section 1). P-48 is a ruling, not evidence. The main claim is supported by `InferCoercionShapes` and by `measure-D.md` section 1.2, which read and measured the parser path. `Operators.scala:90` and the `Fortress.ast` note still read so.
- Ownership: the same sentence. Its subject is the instance an open variable takes, which F-78 owns ("never `BottomType`").
- Rewrite: move the `BottomType` sentence to F-78, citing the rung-instance-bound report's D1. F-56 keeps the expected type at `f(x)` and the `fnApp` path. F-56 has no incoming pointers.

### F-57, reword

- Evidence: "Only walk checks a numeral's range (rows 325, 443)." Row 325 says that on the compiled path `a: ZZ32 = 4294967295` "compiles clean and raises `Not in range for ZZ32` at run time", where the specification makes it a static error. Row 443 is walk wrongly refusing a large numeral into `RR64`. Neither row says that only walk checks.
- Consistency: F-54's "needs `x.zero` or `x.one`" (see F-54).
- Rewrite: state that neither path refuses an out-of-range numeral statically. The compiled run raises at run time (row 325). Walk refuses it at a narrower typed binding by its run-time type, and also refuses a large numeral into `RR64` (row 443). Take in F-54's numeral sentence. Note that `evidence-B.md` section 3.1's library measurements predate the numeral switch (F-79). The entry's current claims rest on F-79 and row 454, and its pointers already go there.

### F-58, reword

- Scope: "MicroGPT's flat program, C4, has 26 errors of its own under the compiled checker", against "The counts come from one measurement, on an earlier library" and "3 `DOT` calls that failed on the api's unused sizes, gone since climb batch 20's rung A and not measured again".
- Rewrite:
  - Bound the title to the measurement, for example "When measured, on an earlier library, …".
  - Say that the 3 `DOT` refusals are cleared by reading, since F-35's dead sizes are gone, and not measured since. The batch name goes to the history.
  - Add a gap the entry does not show: batch 20's integer-power rung changed both `^` declarations that row 533 names. `rung-integer-power/REPORT.md` section 7 says: "Whether `10.0^(-5)` still ties, and between which two, is not measured." So the powers' stated cause holds only for that measurement.

### F-59, reword

- Scope: "The checker refuses it for every generic big operator, `BIG MAX` included, since an F-bounded parameter that nothing fixes has no instance at its bound (row 731)". Row 731 covers a big operator whose bound names the parameter. F-221 records that a plain-bounded big operator takes the reduction's expected type. The entry also says "where nothing at the call fixes the element type" without P-78's limit, "A declared type that receives the value does not fix it", so a reader may count a typed binding as fixing it.
- Rewrite: "every generic big operator whose bound names its parameter (`SUM`, `PROD`, `BIG MAX`, `BIG MIN`)", and add that a typed binding does not fix the parameter. The detail is section 5 of the judgement, whose `Bottom` mechanism predates P-48. Row 731 gives today's mechanism.

### F-60, reword

- Evidence: "an empty one raises `EmptyReduction`, as `tests/simpleSum` asserts". `simpleSum.fss` asserts it for `r = BIG MIN[x<-(0#10),x<0] …`. No test in `tests/` or `compiler_tests/` asserts an empty `BIG MAX`. `flattening-questions-ways.md` Question 1 section 2 measured an empty `BIG MAX` raising on walk, and P-78 states it.
- Rewrite: cite `simpleSum` for `BIG MIN`, and give the `BIG MAX` case by the measurement or by P-78. Or say "an empty `BIG MAX` or `BIG MIN`" and name the test for the one it gates.

### F-61, reword

- Comprehension: "'Use FortressLibrary for the compiler too' is three steps, of which the checker's sizes and the tower's errors are done". The quoted words are the curator's question in the report's opening, which is a conversation handle. Only the report's section 5 expands the steps:
  1. Check `nat` and `int` static parameters in the checker.
  2. Clear the library api's 92 errors from the number and comparison tower.
  3. Port the native bindings.
- Rewrite: name the goal plainly: the interpreter's library as the compiler's library. Name each step by what it is. Keep the pointers to F-67, F-131, F-53 and F-32 and the PLAN phase. Cite section 4 for the shim claim.

### F-63, reword

- Evidence: "Declared otherwise, each is an error of the checker on the api."
  - For `Condition.map`, the rung saw the error only under rung P's relaxation, which did not land (`rung-library-defects/REPORT.md`, Summary, and "Defects and their homes", family F). Otherwise it rests on reading the export check's equality of return types (`ExportChecker.scala:598-610`, the report's Decisions).
  - The entry's text before F2b said "whether the count stage … refuses it reverted is not measured", and the cut kept only "No test gates the `Condition.map` edit".
  - The cited "What changed" gives `QQ`'s clause as `comprises { AnyIntegral, ... }`. Today's `comprises { ... }` (`Library/FortressLibrary.fsi:398`) is read in the tree. The reason, that a private type is left out only by `...`, is in the report's Summary.
- Rewrite: say that the `split` and `zip` errors were measured and that the `Condition.map` error is by reading and unmeasured on the landed checker. Cite the tree or the later change for `QQ`'s clause, and add the clause to the title or let it stand as a second sentence.

## Evidence gaps recorded, not settled

None blocks a rewrite. Each would need a run, which this pass does not do.

- F-63: does today's count stage refuse the api if `Condition.map` returns anything other than `Condition[\G\]`?
- F-58: since batch 20's integer-power rung, do C4's numeral powers still tie, and between which two declarations of `^` (row 533)?
- F-54, or F-94 if the sentence moves: does the array family bound with `StandardMinMax[\T\]` still exceed the count stage's limit with row 688's memo?

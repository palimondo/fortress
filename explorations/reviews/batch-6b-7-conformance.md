<!-- Conformance review of climb batch 6b (rung O 917bb7b32, with the merged-diff review's corrections 85788d183 and 533f6524f, the judge's ruling 2f4736a0b and its repair 519cb8ce3) and climb batch 7 (rung B de22fd928, rung H 952892a00, rung A f3b62bc83, with the review's corrections 4c92ea034, the judge's ruling d3f92a509, its repair e75fca14b and the second review's corrections bb3af372f), made on 2026-09-28 at Pavol's request, in the form of reviews/batch-6-conformance.md with its four global questions; written by a review worker reading only, on main at ed054d93c (cc96c0103 by the end, two commits that changed one line of POSITIONS.md in place), nothing built and no Fortress program run; the one command beyond reading was `git apply --check` of two parked patches, which writes nothing. Batch 7C ran in other worktrees, which were not read. -->

# Climb batches 6b and 7 against the specification, the team's built intent, the design record and the plan

## For Pavol, in short

- All four rungs are in the spirit of the designers.
  - Rung O makes the interpreter's fixed-width arithmetic raise `IntegerOverflow` when a result does not fit, as the specification says.
  - Rungs B, H and A cleared most of what the flattening left. The checker's full count of errors on the library went from 1.7K to 940, and the gate's count from 62 to 22.
- Nothing found here blocks the switch-over.
- The batches' own reviews checked the records and the gate. What they did not look at comes to seven points:
  1. Batch 6b's items for you never reached the plan. The batch 7 gather filed its items in `PLAN.md`; the 6b gather did not, and `PLAN.md` still says 6b "runs rung O".
  2. Three range bodies relied on wrapping and now raise at the integer bounds; a sequential range steps past its end. They are gated as expected failures. Your decision of 2026-09-26 already names their repair: reorder the arithmetic and keep the checked operators, as for the strided distance. No batch holds the repair.
  3. Rung O left ten more natives in the same four Java files: `^`, `CHOOSE` and the unsigned `LCM`. They wrap in silence or fail in a way no `catch` sees. Batch 6.5 as drafted fixes one, the 32-bit `LCM`, and leaves the other nine, its 64-bit twin among them.
  4. Rung H added a second library function whose `typecase` binds a name, which the compiled path cannot read yet. Batch 6.5's rung G repairs exactly that, but its tests were written before H landed and do not cover H's shape.
  5. Rung B's written `Object` bound steers around a quirk of the checker's type inference. With no bound written, a type parameter that only the result mentions is refused. With any written bound, it is inferred as the bottom type, the type with no values. No ledger row holds the quirk, and batch N's record describes only its second half. This is a fact for your items 18 and 20. It is not a new question.
  6. The specification still says an unbounded type parameter is bounded by `Object`. Your answer (a) made it `Any`. The fix is in batch 7b, which now comes after batch N, and batch N writes the inference chapter on top of the old sentence.
  7. Decision D's parked diff, and the library patch beside it, no longer apply to the tree since the `fill` to `tabulate` rename. Their measurements predate batches 7 and 7R.
- No new decision for you. Point 1's items go on your review list. Point 5 adds one fact to two asks already on the plan.

## Method

The method is batch 6's (`explorations/reviews/batch-6-conformance.md`), which follows `batch-5-conformance.md` and the rung reviews of 2026-09-17 (`rung-conformance-1-4.md`, `rung-conformance-5-8.md`). For each rung:
- `git show <hash>` first;
- then its `REPORT.md`, `record.md` and `SKEPTIC.md` (rung O's `JUDGE.md` too);
- then the batch records: `explorations/compile-ladder/climb-batch-6b/RECORD.md` with its `JUDGE-review.md`; `explorations/coordinator/CLIMB-BATCH-7.md` with `climb-batch-7-review.md`; `explorations/compile-ladder/climb-batch-7/RECORD.md` with its `JUDGE-review.md`;
- then the landed code as it stands on `main`, the ledger rows the batches opened, and the specification and library lines they cite.

Each rung is judged against three standards, kept apart:
1. the specification, `Specification/` (the July 2012 draft), with the later Types chapter (`Documentation/Specification/Prose/Language/types.tick`) cited beside it where it speaks (`explorations/coordinator/POSITIONS.md:83`);
2. the team's built intent: the library's own practice, the interpreter and the compiler as the team left them, their drafts;
3. the design record outside the specification (`explorations/coordinator/map/design-intent-sources.md`).

Then batch 5's four questions:
- Does a choice made inside the rung, not by Pavol, conflict with a later phase of `explorations/coordinator/PLAN.md` (the checker at a true zero, the switch-over, microGPT's static types and arrays, unboxed arithmetic)?
- Is anything built twice, or built so that the switch-over or the array work must undo it?
- Did the rung solve its problem the way the library already solves the same family, or invent a local device?
- What did the rung leave in the ledger or its report that should have reached Pavol and did not?

A structural fact first. Both batches carry Pavol's decisions:
- O carries row 379 (`POSITIONS.md:65`), rung O's fork (`:81`) and the unsigned widths (`:99`).
- B carries the numerics plans' decision 2 (`:128`).
- H carries route A (`:69`).
- A carries answer 10 (`:109`).

So the review judges only what a rung, its judge, its gather or its batch record decided.

Principle 5 of the protocol applies. Every measurement below is the rungs' own, cited with its capture. Claims marked "by reading" were not run.

## The verdicts

- **Rung O, the raising natives: in the spirit.** It is the specification's rule, carried out with batch 4's patch and the team's own compiled helpers. Its limits are two families the rung found and listed: the range bodies that relied on wrapping, and ten natives outside its named classes. Batch 6.5 takes one of the ten; no batch takes the rest or the range bodies.
- **Rung B, the written bounds: in the spirit, as decided.** It writes the specification's idiom, `extends Object`, on the three parameters Pavol named. It fixes row 421 as the specification states `MIN` and `MAX`. What the bound works around is a quirk of the checker's solver, and nothing on record names it as such.
- **Rung H, what the flattening left: in the spirit.** It uses the compiler prelude's own edit and route A's price, and it brings `TotalComparison` nearer the specification's. It missed the library's own device for a partial order with `MIN` and `MAX`, which its skeptic found (item 22).
- **Rung A, `tabulate`: in the spirit.** It is answer 10, placed where the library places a method at the array diamond's meet. The team's own 2011 prelude had already given the function form a second name.

## Rung O, `917bb7b32` (with `85788d183`, `2f4736a0b`, `519cb8ce3` and `533f6524f`)

### What landed

- Eighteen natives raise the catchable `IntegerOverflow` through `Int.overflow()`:
  - `Negate`, `Add`, `Sub`, `Mul` and `Div` of `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:98-128` and `Long.java:112-142`;
  - `Negate`, `Add`, `Sub` and `Mul` of `NN32.java:103-129` and `UnsignedLong.java:104-130`.
- Row 379's expected failure became the plain test `ProjectFortress/tests/FixedWidthOverflowRungB.fss`. `intPrim` and `longPrim` gained two assertions each.
- The demo `HeapShakedown`'s hash is respelled with ∔ and ⨰ (row 427).
- Six expected failures gated rows 450 to 453. Four are under walk. Two are compiled pairs, one of them from the review's repair. Row 452's has since passed and been renamed, since batch 7R builds no `ZZ64` range.
- None of 413 interpreter tests changed, and both microGPT checks are 40 of 40 (FACTS, "Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow`", `explorations/coordinator/FACTS.md:114`).

### Standard 1: the specification

- **The rule.** "For integer results, overflow throws an `IntegerOverflow`" (`Specification/basic/operators/opr-overview.tex:154-155`, `:195-196`). ℕ32 and ℕ64 are among the fixed-size integer types (`Specification/basic/types-vals-vars.tex:545-550`). O makes that true for the operators it names, on both signs and both widths. It matches the compiled run on the same 31 bound cases, where the compiled run differs only in printing unsigned values as signed (row 326; `explorations/compile-ladder/rung-overflow-natives/probes/bounds/OverflowBounds-differential.txt`).
- **Where the same sentence still does not hold** (finding 3). The sentence covers every integer result, not the operators row 379 listed.
  - Rung O's own count of sibling sites found ten natives in the same four files that still give no catchable `IntegerOverflow` (`explorations/compile-ladder/rung-overflow-natives/REPORT.md:38-44`).
  - By reading, one of them is worse than the report says. `Int$Pow` multiplies in a `long` with no check (`Int.java:361-371`) before `Int.rc` tests the width (`:250-256`). So a power whose 64-bit product wraps reaches `rc` as a wrong number that may fit. `2^64` on `ZZ32` would read 0, silently.
  - The integer chapter says the power of an integer is an integer (`Specification/basic-lib/basic-integers.tex:498`). Pavol's decision on row 334 says `LCM` raises "when the multiple does not fit, on both paths" (`POSITIONS.md:54`). Both settle the siblings.
- **Numerals.** Walk's numeral is a `ZZ32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:117`). So `2147483647 + 1` of two numerals now raises at run time where it wrapped. The specification makes such a program a static error (row 325's reading, which O's judge took). The raise is nearer the specification than the old silent value, and batch N's numeral switch is where the static half belongs.

### Standard 2: the team's built intent

- **The signed natives** are batch 4's `natives.patch`, hunk for hunk (`explorations/compile-ladder/rung-overflow-natives/REPORT.md:36`).
- **The unsigned natives** copy the tests of the team's compiled helpers (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:46-59`, `simpleUnsignedLongArith.java:56-73`).
- **Both are the team's own devices.**
- **The library's device for a body that must not overflow was not used** (finding 2). Pavol's decision of 2026-09-26 names it: the strided distance "is reordered and keeps the checked operators" (`POSITIONS.md:81`). Batch 5's review traced the same separation in Steele's 2011-2012 code (`explorations/reviews/batch-5-conformance.md:62`).
  - Rung O's skeptics found three more bodies of that family: `sized1Range`'s `lo+ex-1`, `CompactFullScalarRange.size`'s `narrow(r-l+1)` taken before its emptiness test, and `CompactFullRange`'s `(u - l') + 1`. They sit today at `Library/RangeInternals.fss:1379`, `:953-958` and `Library/FortressLibrary.fss:3894`.
  - They also found a sequential range that steps past its last element (row 451, `RangeInternals.fss:1040`, `:1048`).
  - The judge ruled home 2 rather than repair, because the batch record kept the library out of rung O (`explorations/compile-ladder/rung-overflow-natives/REPORT.md:137`).
  - Batch 7R's record then weighed adding them to rung J and did not: "One word adds them to J" (`explorations/coordinator/CLIMB-BATCH-7R.md:24`).

### Standard 3: the design record

- The team's 2012 restart keeps the operator chapter's rule word for word (`Documentation/Specification/Prose/Language/Operators/operator-overview.tick:154-155`, `:195-196`). So the late word and the draft agree.
- Pavol's principle of 2026-09-22 gives hardware wrapping its own spelling (`POSITIONS.md:52`). Since batch 5 that spelling exists (∔, ∸, ⨰), and `HeapShakedown`'s hash now uses it. That is the separation the principle asks for: a wrap written as a wrap, and plain `+` checked.

### The global questions

- **Later phases.**
  - At the switch-over the compiled path runs the one library's range bodies. Row 453's compiled test goes green only once row 450's fix is in the one library (row 453's note).
  - No conflict with phases 5 and 6. The compiled helpers already raise, so unboxed arithmetic by static type keeps a checked `+` and a wrapping ∔.
- **Built twice.** No. The `Wrapping*` natives and the checked ones now differ, as batch 5's review expected.
- **The library's way.** Yes for the natives. No for the range bodies (finding 2).
- **What reached Pavol.**
  - The batch record lists for him the three range bodies, `:989`'s reach, the six expected failures, and the alternative not taken, the reorder (`explorations/compile-ladder/climb-batch-6b/RECORD.md:83`).
  - None of these is in `PLAN.md`. Its batch 6 line still says "the follow-up 6b runs rung O" (`PLAN.md:51`).
  - The handover's 6b paragraphs moved to its history file at batch 7's landing (`explorations/microgpt-run-c-handover.md:15`). So the list now lives only in the 6b record (finding 1).

### Verdict: in the spirit

The specification's rule, in the team's own two devices, with every changed output traced. What the rung left undone is written down and gated, but no plan or batch holds it.

## Rung B, `de22fd928`

### What landed

- `extends Object` on the result-only type parameter of `builtinPrimitive`, `fail` and `List`'s nullary comprehension operator, api and component.
- `StandardMinMax`'s default `MIN` and `MAX` declared returning `T` (row 421).
- One new test, `ProjectFortress/tests/ResultBoundsRungB.fss`.
- Rows 469 to 473, and a note on row 447.
- The distance stage went from 1,747 to 1,337, and no walk output changed (`explorations/compile-ladder/rung-result-bounds/REPORT.md:13-15`).

### Standard 1: the specification

- **The bound.** The specification's current text gives an unbounded type parameter the implicit bound `Object` (`Specification/basic/trait-parameters.tex:49-50`). So on today's text, B writes what the text already implies. Pavol's answer (a) makes the implicit bound `Any` (`POSITIONS.md:128`), and against that the written `Object` narrows.
  - For `fail` and `builtinPrimitive` the narrowing costs nothing. A `throw` has the bottom type (`types-vals-vars.tex:508-513`), and the natives' bodies go at the switch-over.
  - For the comprehension, it cuts against the next sentence, which lists tuple types among a type parameter's instances (`trait-parameters.tex:53-54`). That is item 20 (`PLAN.md:117`).
- **The text now disagrees with the library, walk and the gate on the bound itself** (finding 6).
  - Batch 7b's rung S revises the sentence (`explorations/coordinator/CLIMB-BATCH-7.md:106`, `:117`). The order of 2026-09-27 put batches 7C and N before 7b (`PLAN.md:61-66`).
  - Batch N's specification rung writes the inference chapter, including "a type parameter ... taking the narrowest of its arguments' types and its bound" (`explorations/coordinator/CLIMB-BATCH-N.md:217`). Its record names no revision of the implicit bound.
  - Rung A's own reasoning already leans on the revision to come: "Your answer (a) ... takes `Any`, which rung S writes in batch 7b" (`explorations/compile-ladder/rung-tabulate/REPORT.md:224`).
- **`fail`.** The specification's `fail` is a test helper returning `()` (`Specification/basic-lib/tests.tex:46-51`). The library's generic `fail` was never that declaration, and B's report says so (`REPORT.md:57`).
- **Row 421.** `MAX` and `MIN` return one argument (`Specification/basic-lib/basic-integers.tex:599-602`). This is right, and its one remaining sibling is row 472.

### Standard 2: the team's built intent

- **The library's own practice for a result-only parameter is `Any`,** in `cast` and `instanceOf` (`Library/FortressLibrary.fsi:24`, `:26`).
- **The compile path writes `Object` on every unbounded parameter** (row 412). B's deviation line says so. The decision chose the specification's idiom.
- **Why `Object` helps is the checker's solver** (finding 5). A constraint that reduces to `True` returns the empty substitution (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:492-493`), so the variable stays open and the call is refused "without context". Any other constraint goes through `killIvars`, which binds a leftover variable to `BOTTOM` (`Formula.scala:524`; `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1937-1940`).
  - A bound of `Any` makes `T <: Any` trivially true, so the parameter is refused.
  - A bound of `Object` makes the constraint real, so the parameter becomes `Bottom`.
  - FACTS records the mechanism (`FACTS.md:58`), and B's report section 2 names it (`REPORT.md:32`).
  - No ledger row names it.
  - Batch N's checker rung excludes the solver file (`CLIMB-BATCH-N.md:127`).
  - Batch N's record says a result-only parameter "is still bound to `Bottom`, as today" (`:37`). That holds only where a bound is written, or where the compile path adds `Object`.

### Standard 3: the design record

- **The type group's inference infers the bottom type whatever the bound.** In Welterweight's dispatch semipredicate, a function's type parameter starts with an empty set of lower bounds, and the inferred type is their join (`Papers/Welterweight/dispatch.tick:83`, `:193`, by reading). So a parameter nothing constrains gets the join of nothing, whatever its upper bound. Batch 6's review read the same passage for row 446.
  - The solver's refusal under `Any` is therefore an accident of the code path, not a design.
  - B's three bounds route around it rather than state a type.
- **The team's late word on the implicit bound is split.**
  - Steele implemented the specification's implicit `Object` on 2012-05-28, "and also updated libraries and tests to reflect this (many instances of /extends Any/ inserted)" (`91e71e62e`'s message; batch 5's review cites the commit, `batch-5-conformance.md:197`).
  - The next day he "temporarily" commented the desugaring out "so that interpreter tests will pass" (`c61723f61`, in Q1's record, `CLIMB-BATCH-7.md:17`). Today it is a setting of the compile path alone (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:135-137`).
  - So under an implicit `Object`, the team's device was to write `Any` where a parameter had to admit more. Under Q1 (a), which followed walk, B writes the inverse, `Object`, where the checker needs a constraint it can solve, on three lines Pavol chose.

### The global questions

- **Later phases.**
  - Phase 4: `fail`'s bound meets row 447, since a value-position call compiled to `Bottom` fails JVM verification. That is item 18 (`PLAN.md:138`).
  - Phase 3: the comprehension's bound is item 20.
  - Batch N: the solver quirk decides what the inference chapter can truthfully say about a parameter nothing fixes (finding 5).
- **Built twice.** No.
- **The library's way.** No, by decision: the specification's idiom in place of the library's `Any`, as the report says.
- **What reached Pavol.** Items 20 and 18 carry B's two points. The solver quirk, which is the reason for both, is in neither ask.

### Verdict: in the spirit, as decided

The ten lines are the decision, and row 421's fix is the specification's. What is missing is on the record's side. The device works around a solver quirk that the type group's own inference does not have, and no ask names that quirk.

## Rung H, `952892a00`

### What landed

- `TotalComparison extends { Comparison }` with `>=`, `<=`, `MIN`, `MAX` and `MINMAX` restated from `StandardTotalOrder`.
- `AnyMaybe extends { AnyUniqueItem }` with its own `=`.
- `RelationalPredicateCondition` without `excludes Condition[\()\]`, the second `ANDCOND` renamed `andRelCond` and chosen by `andCondCombine`'s `typecase` at `FilterGenerator2`'s two call sites (`Library/FortressLibrary.fss:4515`, `:4517`, `:4556-4567`).
- The count stage went from 62 to 44 and the distance stage from 1,747 to 1,661, every exclusion error gone.
- Rows 456 to 463, and notes on rows 351, 407, 430 and 473.

### Standard 1: the specification

- **Instantiation exclusion** (`Specification/basic/types-vals-vars.tex:218-237`, `Specification/basic/traits.tex:299-313`): met at every declaration the stage named.
- **`TotalComparison` is nearer the specification's.** The specification's extends no order (`Specification/advanced-lib/comparison.tex:28-32`, `:43-58`). It also carries `LEXICO`'s algebra, `Associative`, `HasIdentity` and `HasLeftZeroes`, and `isLeftZero`. The library's did not before H and does not after, so that gap is older than the batch.
- **The team's doc comment kept by H's D9 is rendered into Part IV.** It says `TotalComparison` is "a total order (`TotalComparison` alone)" (`Library/FortressLibrary.fsi:117-119`). Since H, the declaration beside it extends no total order, and generic code bounded by one refuses it (row 461). Under item 22's option (b) the comment reads nearer the declaration.

### Standard 2: the team's built intent

- **The compiler prelude's own edit.** Steele commented out `TotalComparison`'s `StandardTotalOrder` clause in 2011 (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:719-722`). Route A's price names the same edit. H followed both.
- **Missed: the library's device for a partial order that also has `MIN` and `MAX`,** `StandardMinMax[\X\]` beside it. Its skeptic found and measured it, and it is item 22. Not repeated here.
- **The `Condition` site** takes zero.md's measured P3d, with two changes the compiled checker needed: a clause-binding `typecase` and two type ascriptions. Both are the library's own spellings (`cast`, `Library/FortressLibrary.fss:33-37`; `Library/Reflect.fss:252`).

### Standard 3: the design record

- **The generator machinery exists to choose the implementation by dispatch in library code** (`explorations/coordinator/map/design-intent-sources.md:106`). P3d moves the choice of the relational fusion from dispatch (a second `ANDCOND` overload) to a `typecase` inside `FilterGenerator2`. That is why a program's own `p1 ANDCOND p2` is no longer relational (row 458).
  - The overload needed the clause the rule refuses, so no dispatch device is left under route A (`explorations/compile-ladder/rung-exclusion-remainder/REPORT.md:60`).
  - The parked line states the cost (`PLAN.md:179`). It does not state that the choice left dispatch. A note, not a finding.

### The global questions

- **Later phases.**
  - Phase 3: the `AnyIntegral` clause is batch 7C's.
  - Phase 4 (finding 4): `andCondCombine` binds a clause name at an arrow type over its own type parameter, `rp:(Generator[\E\] -> RelationalPredicateCondition[\E\]) =>` (`Library/FortressLibrary.fss:4559-4561`).
    - The compiled code generator cannot read a clause's bound name (row 351), and H's gather appended exactly that to row 351.
    - Batch 6.5's rung G repairs row 351. Its tests are a plain clause binding and `cast[\T\]` (`explorations/coordinator/CLIMB-BATCH-6.5.md:174`), written on 2026-09-27 before H landed.
    - A compiled `typecase` on an arrow type over a type parameter is a different test from either, and nothing measured shows the compiled path can make it. By reading.
- **Built twice.** The five restated bodies. Item 22's option (b) would inherit three of them.
- **The library's way.** Yes, except the device of item 22.
- **What reached Pavol.** Items 21 (settled since, batch 7C) and 22, and six parked lines.

### Verdict: in the spirit

Route A's own edit, the prelude's precedent and the specification's shape of `TotalComparison`, with every cost measured. The one device it missed is in front of Pavol as item 22.

## Rung A, `f3b62bc83`

### What landed

- `fill(v)` keeps the value form, and the function form is `tabulate`.
- Both are defined at the diamond's meet, `StandardMutableArrayType` and `ImmutableArray1` (`Library/FortressLibrary.fsi:1446-1447`, `:1500-1501`), with `StandardImmutableArrayType`'s two abstract.
- The factories are `tabulatedArray1`, `tabulatedArray2`, `tabulatedArray3` (row 247) and `tabulatedVector`.
- 33 library call sites, 12 team-test lines, 32 lines of eight demos, and the 12 approved vocabulary lines with 4 probe lines.
- The specification's figure row, a callout and an Appendix I entry.
- The count stage went from 62 to 40 and the distance stage from 1,747 to 1,434, every `fill` refusal gone.

### Standard 1: the specification

- The Working Draft's figure gave both forms one name (`Specification-1.0-frozen/advanced/parallelism-locality/arrays-distributed.tex:53-55`). The pair fails the Incompatibility Rule (`Specification/advanced/overloading.tex:176-180`). A renames the function form as answer 10 decided, and the callout says why (`arrays-distributed.tex:62-69`).
- The paragraph after the figure still says the `fill` methods are defined by `init` and is silent on `tabulate` (`:71`). That is parked (`PLAN.md:188`).
- One quiet change follows from the rename. `fill` given a function on an array of `Any` now stores the function, as the figure's "Initializes all elements with value v" says. The skeptic weighed it, and FACTS records it (`explorations/compile-ladder/rung-tabulate/SKEPTIC.md:110-117`).

### Standard 2: the team's built intent

- **The meet placement is the library's own device:** `StandardMutableArrayType` already declares `assign` there. The leaf placement, answer 10's words, was measured and leaves the meet refused, as `copy` is today (row 467). It is parked for Pavol.
- **The factory names follow the library's adjective-before-type factories** (`immutableArray1`, `primitiveArray`). They are parked for Pavol.
- **A sibling call site outside the sweep.** A's sweep covered `Library/`, `ProjectFortress/tests/` and `ProjectFortress/demos/`. `ProjectFortress/not_passing_yet/tree.fss:205` still calls `vector[\RR64,100\](fn (i:ZZ32) => ...)`, the function form now named `tabulatedVector`. It is outside every gate, a note.

### Standard 3: the design record

- **The Meet Rule exists so that no call can ever be ambiguous** (`design-intent-sources.md:100`). A declaration at the meet is its direct application.
- **Steele's 2011 prelude already gave the function-taking form a second name,** `fill2` beside `fill` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:577-579`). So the team's late word pointed the same way as answer 10.

### The global questions

- **Later phases** (finding 7). Decision D's diff, the sized signatures of C4's vocabulary parked for phase 5 (`PLAN.md:68`), was written on 2026-09-27 against the old spelling.
  - `git apply --check explorations/reviews/decision-d-diff/decision-d.patch` fails at `explorations/run-c4/src/FlatArrays.fss`. Its context lines read `.fill(f)` (patch `:122`, `:124`), and its removed lines at `mat` and `gather` read `.fill(` (`:125`, `:319`). The file now says `.tabulate(` (`FlatArrays.fss:13`, `:15-16`).
  - The library patch beside it, `library-e3.patch` (the dead sizes of answer 12), fails at `Library/FortressLibrary.fsi:1559`, where `vector(f)` is now `tabulatedVector`.
  - Their checker measurements predate batches 7 and 7R.
  - Nothing is lost, since the diff is evidence to re-derive. But the plan does not say it must be re-based before it is shown to Pavol.
- **Built twice.** Two copies of each body, against the leaves' four for `copy`.
- **The library's way.** Yes.
- **What reached Pavol.** D1, D2 and D4, Appendix I's introduction (item 23) and the `init` paragraph, all in `PLAN.md`.

### Verdict: in the spirit

Answer 10 as measured, placed by the library's device and named in its style, with every respelled line keeping its value. The two things it leaves behind are a demo line it names and a parked diff it could not know of.

## The global questions, across both batches

- **Later phases.**
  - Nothing here blocks the switch-over.
  - Before it, three repairs meet the compiled path:
    - `andCondCombine`'s clause binding (finding 4);
    - `fail` bound to `Bottom` (item 18);
    - the range bodies the compiled path will run (finding 2).
  - Before batch N, two record lines (findings 5 and 6).
  - Before phase 5, the re-based decision D diff (finding 7).
- **Built twice.** Only H's restated bodies, and item 22 is the way to fewer.
- **The library's way.** Each rung used it where the library had one. The two exceptions:
  - H's missed device, item 22;
  - O's range bodies, where the device was known and decided but kept out by the batch record's scope.
- **What reached Pavol.**
  - Batch 7's gather filed every item in `PLAN.md`, the practice batch 6's review asked for.
  - Batch 6b's did not (finding 1).

## Findings

Each finding has its evidence, a severity and a proposed home. None blocks the switch-over.

1. **Batch 6b's items for Pavol stopped at its record.**
   - Evidence: `explorations/compile-ladder/climb-batch-6b/RECORD.md:83` lists for him:
     - the three range bodies and `:989`'s reach;
     - rows 450 to 453 with six expected failures;
     - the reorder not taken;
     - the ten test files outside the named ones.
   - `PLAN.md` carries none of them, and its line 51 still says "the follow-up 6b runs rung O". The ten natives left open are on no list for him either (finding 3).
   - Severity: should be fixed now. It is a record edit.
   - Home: `PLAN.md`, "Off the path, parked", one line for the range bodies with finding 2's placement and one for the natives with finding 3's. `PLAN.md:51` gets 6b's landing.

2. **Rows 450 and 451 have a decided repair and no batch.**
   - Evidence: the bodies at `Library/RangeInternals.fss:1379`, `:953-958`, `:1040`, `:1048` (with the strided steps row 451 names) and `Library/FortressLibrary.fss:3894`, gated by `ProjectFortress/tests/XXXRangeBoundsRungO.fss`, `XXXRangeEmptyHashRungO.fss` and `XXXSeqRangeTopRungO.fss`.
   - The device is Pavol's for the strided distance (`POSITIONS.md:81`): reorder, keep the checked operators, and test emptiness before the distance.
   - Deferred twice, by O's batch record (`REPORT.md:137`) and by 7R's (`CLIMB-BATCH-7R.md:24`).
   - At the switch-over the compiled path runs these bodies, and row 453's compiled test waits on row 450's fix.
   - Not on microGPT's path by reading: its ranges start at 0.
   - Severity: should be fixed in a named batch.
   - Home: batch 6.5's first run, E's scope widened to the four bodies or a fifth small library rung, with the tests promoted. Batch 8's one-line slips would do if 6.5 cannot take it; the distance stage does not see these defects, so batch 8 would not find them by itself.

3. **Nine natives still give no catchable `IntegerOverflow`, recorded only on a closed row, and batch 6.5 fixes one of the ten and leaves its twin.**
   - The nine:
     - `Int$Pow` and `Int$Choose` go through `Int.rc`, uncatchable (row 347). By reading, `Int$Pow` can also wrap silently in `Int.pow`'s `long` (`Int.java:220-230`, `:361-371`).
     - `Long$Pow` and `Long$Choose` wrap silently (`Long.java:164-168`, `:232-242`).
     - `NN32$Choose` and `NN32$Pow` go through `NN32.rc` (`NN32.java:157-161`, `:226-236`, `:262-267`).
     - `UnsignedLong$Lcm`, `$Choose` and `$Pow` wrap silently (`UnsignedLong.java:150-162`, `:227-237`, `:297-328`).
   - Rung O listed them (`explorations/compile-ladder/rung-overflow-natives/REPORT.md:38-44`). FACTS repeats the list (`FACTS.md:114`, last sentence). The only row is row 379, which is closed. The 6b judge left them because they were unmeasured (`explorations/compile-ladder/climb-batch-6b/JUDGE-review.md:122-123`).
   - Batch 6.5's planner found `NN32$Lcm` separately and wrote "No ledger row holds it" (`CLIMB-BATCH-6.5.md:81`). Its rung E may touch "`NN32.java`, its `Lcm` class only" (`:93`). So `UnsignedLong$Lcm`, the same shape with an unchecked `multiplyToLong`, stays wrong.
   - The specification settles all of them (`opr-overview.tex:154-155`; `basic-integers.tex:498`; row 334's decision, `POSITIONS.md:54`). None is on microGPT's path.
   - Severity: should be fixed in a named batch.
   - Home: batch 6.5's E, its file scope widened to the ten natives of rung O's list, or at least to `UnsignedLong$Lcm`. One probe first, since they are by reading. A new ledger row in either case, and row 347 closes with them.

4. **Batch 6.5's rung G does not test the library's second clause-binding site, which rung H added.**
   - Evidence: `andCondCombine` binds `rp` at `Generator[\E\] -> RelationalPredicateCondition[\E\]` (`Library/FortressLibrary.fss:4559-4567`). Row 351's note from H's gather names it as the library's second site beside `cast`.
   - G's tests are a plain binding and `cast[\T\]` (`CLIMB-BATCH-6.5.md:174`), drafted before batch 7 (the record's last edit is `3ae7c4d84`, 2026-09-27).
   - `FilterGenerator2`'s `filter` calls it, so a compiled comprehension with two guards reaches it after the switch-over.
   - Severity: should be fixed in a named batch.
   - Home: batch 6.5's G, one line in its brief and its skeptic's checks: a compiled `typecase` whose clause binds at an arrow type over the function's own type parameter, in `andCondCombine`'s shape.

5. **The checker's solver treats a parameter bounded by `Any` differently from any other, and no row holds it.**
   - Evidence: `Formula.scala:492-493` against `:524` with `STypesUtil.scala:1937-1940`, as under rung B's Standard 2. FACTS has the mechanism (`FACTS.md:58`).
   - The type group's own inference gives the join of nothing, the bottom type, whatever the bound (`Papers/Welterweight/dispatch.tick:83`, `:193`, by reading).
   - Consequences:
     - Under Q1 (a), a program's own `f[\T\](): T` is refused where `f[\T extends Object\](): T` is accepted. A specification cannot state that rule.
     - Rung B's three bounds, and item 20's narrowing with them, exist only to select the second branch.
     - Batch N's record describes only that branch (`CLIMB-BATCH-N.md:37`) and keeps the solver out of its checker rung (`:127`).
   - Probe P5 found no compiler test that meets it under `Any` (`explorations/compile-ladder/plan-7b/probes/P5.md`), so its reach today is programs and the text.
   - Severity: should be settled in a named batch. Batch N's record, before it launches.
   - Home:
     - a ledger row now;
     - one sentence in batch N's record at `:37` and in its chapter's "not covered" list, naming both behaviours;
     - a fact added to items 18 and 20 in `PLAN.md`. What a parameter nothing fixes is bound to is one question. If the solver bound it as the type group's inference does, B's bounds could go back to the library's `Any`, and item 20 would close.
   - This is Pavol's through items 18 and 20. It is not a new ask.

6. **The specification's implicit bound stays `Object` for three batches after the library, walk and the gate took `Any`, and batch N writes on top of it.**
   - Evidence: `trait-parameters.tex:49-50`; answer (a) (`POSITIONS.md:128`); 7b's S carries the sentence (`CLIMB-BATCH-7.md:106`, `:117`); the order puts 7C and N first (`PLAN.md:61-66`).
   - Batch N's chapter speaks of a parameter's bound (`CLIMB-BATCH-N.md:217`) and names no revision of the sentence.
   - `PLAN.md:17`: "Every batch lands with the specification, the library and both paths agreeing."
   - Severity: should be fixed in a named batch.
   - Home: batch N's record before launch. Either its specification rung takes the one sentence and its Appendix I entry from 7b's S, since the chapter depends on it; or the chapter's callout names the bound it assumes and points to 7b. Which batch carries a passage is the coordinator's call by the batch rules (`climb-batch-7-review.md`, change 9).

7. **Decision D's parked diff and its library patch no longer apply.**
   - Evidence: `git apply --check` of `explorations/reviews/decision-d-diff/decision-d.patch` fails at `FlatArrays.fss`, where `.fill(f)` became `.tabulate(f)`. `library-e3.patch` fails at `Library/FortressLibrary.fsi:1559`, where `vector(f)` became `tabulatedVector`. Both were measured before batches 7 and 7R.
   - Severity: a note.
   - Home: one clause in `PLAN.md:68` (phase 5), and in item 12's E3 line (`PLAN.md:113`): re-based and re-measured on the tree of the day before either is shown to Pavol.

## Smaller notes, for the record

- `ProjectFortress/not_passing_yet/tree.fss:205` calls the renamed function factory `vector(fn ...)`. It is outside every gate. It belongs as one line on A's parked line or row 464.
- `TotalComparison`'s team doc comment, rendered in Part IV, calls it a total order, which the declaration no longer says (`Library/FortressLibrary.fsi:117-119`). It goes with item 22.
- H's P3d moves the relational fusion's choice from dispatch into a `typecase` at two call sites. Under route A no dispatch device is left. The parked line on row 458 could say so.
- The specification's `TotalComparison` carries `LEXICO`'s algebra and `isLeftZero`, and the library's never did (`comparison.tex:43-58`). This is older than the batches. `isLeftZero` is among batch 8's one-line slips.

## What went right

- Every decision reached its rung and was built as worded: the eighteen natives and their tests; B's ten lines; route A's two header edits; answer 10's rename with the approved vocabulary lines.
- O's skeptics found the range bodies that the logging pass could not reach, and the gather and the review gave each a gated home, one compiled pair among them.
- B's skeptic showed that the decision's reason, that binding `Bottom` is harmless, covers the natives and not `fail`, and it is now in item 18.
- H's skeptic found the library's own device and measured it; A's worker measured answer 10's placement words and found them wrong.
- Batch 7's gather put every item for Pavol into `PLAN.md`, in the order each is needed.

## What I did not do

- Built nothing and ran no Fortress program. I edited no source, library, test, ledger or record file besides this one.
- The one command beyond reading was `git apply --check` of the two parked patches, on `main`, which writes nothing.
- Did not measure the nine natives (finding 3), the compiled `andCondCombine` (finding 4), or the solver quirk's reach in programs (finding 5). Each is stated by reading.
- Did not read batch 7C's worktrees, or `explorations/reviews/option-2-soundness/`, another worker's directory that was untracked while I wrote.

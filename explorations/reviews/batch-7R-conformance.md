<!-- Conformance review of climb batch 7R, the ranges batch (rung J 3be1fecd7; rung U 17c6052bb; the merged-diff review's corrections 9c46c2206, the judge's ruling d7424cb28 and its repair efff9ff1d, the second review's corrections 4368621b6, the landing record 65f1e40ca), asked for by Pavol and made on 2026-09-28, in the form of reviews/batch-6-conformance.md with batch 5's four global questions; written by a review worker reading only, on main at cc96c0103 (the tree of ed054d93c but for two POSITIONS.md lines), nothing built or run, while batch 7C ran in other worktrees, which were not read. -->

# Climb batch 7R against the specification, the team's built intent, the design record and the plan

## For Pavol

- Both rungs are in the spirit of the designers. Rung J builds your ranges decision clause by clause with the library's own devices: the compiler library's `ZZ32` ranges, the team's own comment on what the range operators "actually want", and the library's `excludes` clause. Rung U writes the decision into the specification in the usual form, every original quoted.
- One question sits too late in the plan. Item 25 asks, "before the switch-over", whether a `nat` parameter may bound a range. It is really about what type a size has when a program uses it as a number. The library does that in every array's size, index and bounds, not only in ranges. The team's own checker already gives a size the numeral's type, and batch N's numeral switch will settle the answer in code either way. So it belongs before batch N (finding 1).
- Three defects the batch found have no batch to fix them. The new `case` rule quietly picks `=` for a guard typed by a type variable or a union (row 480). The `Character` crash is one microGPT's own path needs fixed (row 477). And two range bodies fail at the type's maximum, which the compiled path inherits at the switch-over (rows 450, 451). I propose naming all three in batch 8.
- Two notation choices in the specification were the rung's own. The record said they come back to you; nothing on file shows they did. ℤ's factorial property now reads `0! = 1` and `(m+1)! = (m+1) m!` instead of a product over `1:m`. The figure's midpoint `⌊(lo+hi)/2⌋` became `lo + (hi − lo) DIV 2`. The team's compiler library has a method, `floorAverage`, whose own comment is that floor expression computed without overflow; the rung did not weigh it.
- Smaller: walk's shared overload bound (row 478) belongs to batch 7b's walk rung, whose record does not name it. The one library itself writes two loops with a numeral stride, which batch N's record does not name.

## Method

The method is the one of `explorations/reviews/batch-6-conformance.md`, which follows `batch-5-conformance.md` and the rung reviews of 2026-09-17. For each rung:
- `git show <hash>` first, then its `REPORT.md`, `record.md` and `SKEPTIC.md` (and rung U's `decision-record.md` and `probes/list.txt`); the batch record `explorations/coordinator/CLIMB-BATCH-7R.md` with its review `climb-batch-7R-review.md`; the gather's `explorations/compile-ladder/climb-batch-7R/RECORD.md` with `JUDGE-review.md` and `REPAIR-review.md`; ledger rows 476 to 486; `PLAN.md` items 24 and 25;
- then the landed code and text on `main`;
- then the specification and the team's code the rungs touch.

Each rung is judged against three standards, kept apart:
1. the specification, `Specification/`, with the later Types chapter (`Documentation/Specification/Prose/Language/types.tick`) beside it where it speaks;
2. the team's built intent: the library's own practice in the same family, the compiler library's ranges, the checker and walk as the team left them;
3. the design record and the decisions on record (`explorations/coordinator/POSITIONS.md`, above all the numerics plans of 2026-09-27, decision 1, "Option 1, ZZ32"), and `PLAN.md`.

Then batch 5's four global questions: does a choice made inside a rung, not by Pavol, conflict with a later phase (phase 3's true zero, phase 4's switch-over, phase 5's static types and `double[]` arrays, phase 6's unboxed arithmetic); is anything built twice or built so a later phase must undo it; did the rung solve its problem the library's way; what should have reached Pavol and did not.

The batch's own reviews and judge found and closed seven corrections, gated rows 481 and 482, and observed rows 483 and 486 and the numeral stride. This review does not repeat them; it cites them where a finding builds on them. What the record measured is cited, not re-measured. Claims marked "by reading" were not run.

## The verdicts

- **Rung J, ranges over `ZZ32`: in the spirit.** It carries every clause of the decision with the library's own devices, and it fixes the crash by the specification's rule where the team's stopgap had pointed at `Generator`. What is not yet in the spirit is where its limits went: the fix's reach (row 480) and its sibling crash (row 477) have no batch.
- **Rung U, the specification's ranges: in the spirit.** Its one normative sentence is the decision's, in the S1 form, and its respelled examples run. Its two notation choices were its own and reached no list for Pavol, and its midpoint passed over the team's own overflow-free device. Its new sentence, read with the size decision, collides with the section's own static-range bullet, which is item 25's evidence.

## Rung J, `3be1fecd7` (with the repair `efff9ff1d`)

### What landed

- `Library/RangeInternals.fsi` and `.fss` and the `#`, `:` and `::` operator block of `Library/FortressLibrary.fsi:2206-2265` and `.fss:3904-3984` declare no integer type parameter: 95 declarations and 173 parameters in each `RangeInternals` file, 18 and 36 in each `FortressLibrary` file (`REPORT.md` section 4). The three point operators are split into `ZZ32`, pair and triple forms. The dummy `0 asif ZZ32` arguments and the helpers' throwaway parameters are gone.
- Still generic: the public range traits, `openRange[\I\]()`, `opr :[\I\](r: Range[\I\], stride:I)`, `opr :[\I\](r: FullRange[\I\], stride:I)`, `opr #[\I\](r: PartialRange[\I\], size:I)` (`FortressLibrary.fsi:2319`, `:2321`, `:2324`), `checkSelection`, `tupleFlatten`, `UniformDistribution[\T\]`.
- `Range` excludes `{ Number, String }` in the component only (`FortressLibrary.fss:3708`); the api's `Range` (`.fsi:2095`) still declares no exclusion.
- The compiled checker's `case` without an operator: in the one-library world, a trait-typed guard is tested for `Contains` among its ancestors (`Functionals.scala:866-883`, `Types.isContainsType` at `Types.java:133-139`); the compiler's world keeps `GeneratorZZ32`.
- Tests: `RangeZZ32RungJ.fss`, `XXXRangeWideRungJ.fss`, the restated four, the compiled pairs of rows 479 and 481, and row 482's compile test. Gate: `testSystem` 425, the compiler track 784, the count 22 to 10, the distance 940 to 627, both microGPT checks 40 of 40 (`climb-batch-7R/RECORD.md`, "The landing").

### Standard 1: the specification

- **The width.** The Working Draft named none (`Specification-1.0-frozen/basic/expressions/ranges.tex:42-44`). The decision names `ZZ32`, and U writes it. J builds exactly that. The compiled path already refused a `ZZ64` or `NN32` range against its own library (U's skeptic, `rung-spec-ranges/probes/skeptic/differential.txt:134-139`, `:174-179`), so the two paths now agree on the rule.
- **Why generic code could not be checked.** "Types named by type parameters *do not have coercions*" (`Specification/basic/conversions-coercions.tex:363-365`). A non-generic `ZZ32` parameter takes a numeral by the library's coercion. That is the specification's own reason for the edit.
- **The `case` rule.** "If the type of the guarding expression is a subtype of type `Contains` and the condition expression does not, the default operator is ∈; otherwise, it is =" (`Specification/basic/expressions/case.tex:47-51`). J tests `Contains`, as the rule says and walk does (`Evaluator.java:415`). It falls short for a guard typed by a type variable or a union (row 480, the skeptic's).
- **The `String` exclusion.** Exclusion is symmetric (`Specification/basic/traits.tex:223-233`), so `Range excludes String` is enough for walk's pair check.

### Standard 2: the team's built intent

- **The compiler library is the implementers' later practice** (POSITIONS 2026-09-19): `trait Range extends GeneratorZZ32 excludes { Number, String, Boolean, Character }`, `opr :(lo:ZZ32, hi:ZZ32)`, `opr #(lo:ZZ32, sz:ZZ32)` (`Library/CompilerLibrary.fsi:143`, `:173-174`). J's operators are those shapes.
- **The team's own wish.** The one library's comment says what its operators "Actually want", with no dummy argument (`FortressLibrary.fss:3952-3957`). J drops the dummy as the comment wants, where measurement C's shadow had kept it.
- **The team's own device for the overload pair.** `excludes Number (* Important or the strided factories can't overload! *)` on `Range`, and `excludes { Number, String }` on `Rank1` to `Rank3` and the arrays (`FortressLibrary.fss:1708-1714`, `:2411`). J widens the clause the team wrote, where the team put it.
- **The crash's site.** The team's stopgap: "It should use a parameterized Generator type but it is not yet supported" (`525264af1`, 2009). J asks for `Contains`, the specification's word, and keeps the compiler world's test. The checker may have a way to make the team's parameterized form work; see finding 3.

### Standard 3: the design record

- Pavol's reason, "ranges can realistically have only ever be ZZ32 because that's the largest array size on JVM" (POSITIONS 2026-09-27, the numerics plans), and his principle of 2026-09-28, "generic is never fast. So make it fast": non-generic `ZZ32` range operators are the shape the compiled path can make fast.
- Steele's retrospective keeps generators generic in their element type (slide 35, `research/extracts/SteeleJuliaCon2016-extract.md:145-148`). The public `Range[\I\]` and `Generator[\E\]` keep that; only the scalar bound became concrete.
- The 2009 migration to a flat hierarchy expected "more coercions to come on line" (`128f313b5`). A `ZZ32` operator taking a numeral by coercion is that migration's device.

### What the respelling changed beyond the type parameter

Read from the diff; none needs Pavol, and each is accounted for in the report.
- The 18 helpers of `RangeInternals` lost their throwaway first parameters, so their arity changed for any program that imports `RangeInternals`. In the tree only the team's `RangePrototype` does, and it is restated.
- Every range object lost its static arguments, so its run-time name did. The team's `BadBounds` prints `CompactFullRange2D` where it printed `CompactFullRange2D[\ZZ32,ZZ32\]`; its verdict is unchanged (`REPORT.md` section 8).
- A two- or three-dimensional range of mixed widths can no longer be built (`trait Range2D extends Range[\(ZZ32, ZZ32)\]`). That is the decision's "tuples of `ZZ32` ranges".
- The base's two-dimensional `openRange` wrote one static argument for two parameters; it is gone with the parameters (home 1).
- Left as the generic code wrote them, harmless at `ZZ32`: the zero devices `xx = x-x` (`RangeInternals.fss:1400`, `:1408`, `:1416`) and `narrow(r-l+1)` (`:956`), now `ZZ32`'s identity `narrow` (`FortressLibrary.fsi:548`). The overflow of row 450 sits in that line.
- No overloading error of the new `#`, `:` and `::` pairs appears in the distance stage's tables, before or after (no such line in `rung-ranges-zz32/probes/distance/errors-postedit.txt` or `errors-preedit.txt`). So batch 7C's rise, measured on batch 7's tree, should not include them.

### Verdict: in the spirit

It is the decision built with the compiler library's shapes, the team's own comment and the team's own exclusion device, and the crash fixed by the specification's rule. Its limits are recorded; where they went is findings 3 to 6.

## Rung U, `17c6052bb`

### What landed

- The ranges section: "Its components are values of type ℤ32 ... An integer numeral converts to ℤ32 (§ literals), and it is a static error if a component of an explicit range has an integer type other than ℤ32" (`Specification/basic/expressions/ranges.tex:42-48`); the wider counter as `for i <- 0#n do j: ZZ64 = i ... end` (`:78-91`); a callout (`:92-99`).
- `mySum(i:ZZ32):ZZ64`; the blocked range generator over `ZZ32` with `mid = lo + (hi - lo) DIV 2` (`SpecData/examples/advanced/Generators.GeneratorDefn.fss:19-35`); the adapted `BlockedRange` with it (`defining-generators.tex:389-438`).
- ℤ's factorial property as `0! = 1` and `m >= 0 IMPLIES (m+1)! = (m+1) m!` (`basic-integers.tex:544-554`).
- " or a range" deleted from the callout and its two repetitions; Appendix I's I.1.18 and I.1.19 (`changes.tex:1071-1244`); one sentence in "Passages not yet revised" on `nat` parameters (`:1255-1259`).

### Standard 1: the specification

- **The normative sentence is the decision.** Width, numeral, static error, wider counter: each is a clause of decision 1. The gather checked each against J's landed library (`climb-batch-7R/RECORD.md`, "The gather's checks").
- **The later word.** The restart's ranges section is a heading only (`Documentation/Specification/Prose/Language/Expressions/ranges.tick:12`), and `types.tick` says nothing of ranges or of a size's value (a grep for "range" and "nat" finds neither). So nothing is cited beside, rightly.
- **Where the new sentence meets the old text.** The section's own unrevised bullet says: if `n` is a static expression, `a#n` "is a range of static size ... even if `a` is not a static expression" (`ranges.tex:68-75`). "Static parameters are static expressions" (`Specification/basic/expressions/constant.tex:95`). Read with Pavol's size decision, "a `nat` parameter is an `NN32` value", the sentence at `:46-48` refuses what the bullet below it defines. U saw it (`probes/list.txt`, L2) and Appendix I says the static ranges are left (`changes.tex:1255-1259`); item 25 does not carry it (finding 1).

### Standard 2: the team's built intent

- **The S1 form** as rungs S, T and A applied it; the typed binding in place of the demos' `widen` rests on the specification's own coercion into ℤ64 (`basic-integers.tex:25`), which the chapter lists and `widen` is not. Right.
- **The midpoint.** The team's compiler library declares `floorAverage` on each fixed-width integer, "computes `|\ (self+other)/2 /|` efficiently and without overflow" (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:746-747` for `ZZ32`). That comment is the Working Draft's midpoint word for word. The one library splits its own ranges at a power-of-two boundary, without a sum (`Library/RangeInternals.fss:996-999`). U weighed the floor, `(lo + hi) DIV 2` and a `ZZ64` map (`decision-record.md:86`), not these (finding 2).

### Standard 3: the design record

- **The notation is what the project exists for** (protocol principle 1). The Working Draft showed ℤ's factorial as a big product over a range, `m! = ∏_{k←1:m} k`, and the figure's midpoint in floor brackets. Both are gone. The recurrence is correct for every natural `m` and is the chapter's own form (`CHOOSE` by Pascal's rule); the way not taken, a `ZZ32` range with conversions, states the property only below 2^31. The loss is one showcase of the notation, and it was the rung's call (finding 2).

### Verdict: in the spirit

The text says what Pavol decided, in the team's layered form, with the originals quoted and the examples running. The notation choices and the midpoint's device belong in front of him, and the new sentence's collision with the static-range bullet belongs in item 25.

## The global questions

- **Later phases.**
  - Batch N. Its numeral switch settles item 25 in code (finding 1). It meets the library's two numeral strides (finding 7). Its briefing names neither row 485 nor row 486 (`CLIMB-BATCH-N.md:244`).
  - Batch 7b. Row 478's walk defect is in the overload check its walk rung rewrites (finding 6).
  - Phase 3's true zero. The `Character` crash and rows 450, 451 and 480 have no batch (findings 3 to 5).
  - Phase 4. Row 480 turns a crash into a silent wrong answer once programs compile against the one library. Rows 476 and 480 are homed in probes only until then, and phase 4 has no line turning them into gated tests (finding 3). Two status texts retire at the switch-over with no row pointing at them: U's callout, "as the smaller library of the compiled path already did" (`ranges.tex:92-99`), and the case rule's compiler-world branch with `Types.makeGeneratorZZ32Type` (`Functionals.scala:871-874`).
  - Phase 5. Decision D's diff wrote microGPT's vocabulary around one reading of item 25 (finding 1). Array indexing over `ZZ32` ranges fits `double[]` and a JVM length; nothing to undo.
  - Phase 6. Ranges over `ZZ32`, non-generic, give `int` loop counters. No conflict.
- **Built twice.** No. The case rule's two worlds and the api/component split of `Range`'s clause are merged at the switch-over, not undone.
- **The library's way.** J: yes, throughout; finding 3 names one checker device to measure. U: yes, but for the midpoint (finding 2).
- **What reached Pavol.** Items 24 and 25, a sentence on item 23 and three parked lines (`PLAN.md:121`, `:143`, `:191-193`). Item 24 is already in the ask form (`reviews/before-n-questions.md`, question B). Not on file: two of the record's three defaults and both rungs' "What comes back to Pavol" lists (finding 8).

## Findings

Each has its evidence, a severity and where it should go.

1. **Item 25 is about a size's value, not a range's bound, and batch N decides it in code.** Severity: a decision for Pavol, before batch N.
   - The team's checker gives a `nat` or `int` parameter used as a value the numeral's type: `case _:KindNat => Some(Types.INT_LITERAL)` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala:67-68`). That is candidate (a) as the team built it. The item states the compiled run's behaviour, not that it is the team's code.
   - The one library uses a size as a `ZZ32` value outside ranges: `getter size():ZZ32 = s0` (`Library/FortressLibrary.fss:2127`; the products at `:2412`, `:2793`), `toIndex(i:ZZ32):ZZ32 = i + b0` (`:2152`), and rung J's own `sized1Range(b0,s0)` (`:2128`) into `sized1Range(lo: ZZ32, ex: ZZ32)` (`Library/RangeInternals.fsi:548`). `ZZ32` declares no coercion from `NN32` (`Library/FortressLibrary.fsi:510-550`). So reading (b) refuses these too, with or without ranges; the item names only `b0#s0`.
   - The section's own bullet makes `a#n` with a static `n` a range of static size (`ranges.tex:68-75`), and a static parameter is a static expression (`constant.tex:95`). Under (b), the new sentence contradicts it.
   - Decision D's diff already wrote microGPT's vocabulary around (b): "a range bounded by a size, such as `0#n` with `n` a `nat`, would be refused. The patched bodies therefore keep today's bounds from `m.sizes`" (`explorations/reviews/decision-d-diff.md:227-228`). Model lines rest on the open question.
   - Batch N's rung Q gives `IntLiteral` a coercion into every integer type (`CLIMB-BATCH-N.md:276`, `:316`). By reading, the compiled checker then converts a size into `ZZ32` and `NN32` alike through the `KindEnv` line: (a), decided by the code. Walk keeps a size a `ZZ32` (row 486). The judge named batch N's walk rung as the next that may write row 486's owed test (`climb-batch-7R/JUDGE-review.md` section 5); batch N's briefing lists neither row.
   - Home: `PLAN.md` item 25 moved under "Before batch N", restated as the type of a size used as a value, with the four pieces of evidence above. Rows 485 and 486 go into batch N's briefing: the checker rung for `KindEnv`, the walk rung for row 486 and its `XXX` test, the specification rung for his answer.
2. **U's two notation choices, and the team's device it did not weigh.** Severity: a note, for his review.
   - The factorial property and the midpoint, as in rung U's standards 2 and 3 above (`basic-integers.tex:541-554`; `Generators.GeneratorDefn.fss:35`; `decision-record.md:86`, `:88`).
   - `floorAverage` is in the compiler library only; the batch's own row 453 names it as the compiled midpoint's fix. U's spelling overflows when `hi − lo` leaves `ZZ32` (the skeptic's correction, `changes.tex:1170-1173`). The figure's `size` overflows first, so the example is right as it stands.
   - The record said "the spelling chosen for each example and for the factorial property" comes back to him (`CLIMB-BATCH-7R.md:187`). U's list for him has five points and neither spelling (`rung-spec-ranges/probes/for-pavol.txt`).
   - Home: one parked `PLAN.md` line with both, the default the text as landed. Keeping the floor notation would need `floorAverage` in the one library, a library edit.
3. **Row 480 is on the switch-over's path and no plan holds it.** Severity: should be fixed in a named batch before the switch-over (batch 8, or batch N's checker rung, which works in `Functionals.scala`).
   - Row 480: for a guard typed by a type variable bounded by a `Contains`, or a union of such types, the one-library branch answers `=`, so a compiled clause of that shape never matches, and nothing reports it (`SKEPTIC.md` section 14). `PLAN.md`'s batch 8 (`:66`) and phase 4 (`:70-78`) do not name it.
   - Rows 476 and 480 are homed in probes because no program compiles against the one library (row 476's notes). At the switch-over that reason ends, and no phase-4 line turns `CaseProbeJ.fss` and `SkCaseGuardsC.fss` into gated compiled tests.
   - The checker's own device, by reading. The team's form, a `Generator` with an inference variable, was measured false for all eight guards through `isSubtype`, which asks the formula to be true with the variable unsolved (`STypeChecker.scala:282-283`; `probes/skeptic/sk-case-op-alt.txt`). The checker asks "some instance exists" with `Formula.solve` over `analyzer.subtype` (`Formula.scala:486`), as it does for an application's domain (`STypesUtil.scala:263`). That form, with `Contains`, may answer the eight guards as the specification does, bounds and unions included, in place of row 480's hand-written walk. Not measured.
   - Home: row 480's note (the `solve` form beside its own fix); `PLAN.md`'s batch 8 line; a phase-4 line promoting the two probes to compiled tests.
4. **The `Character` crash is on microGPT's path, and "batch 8 or later" is no batch.** Severity: should be fixed in batch 8.
   - Row 477 is the sibling of the crash J fixed, with a three-line fix measured in a shadow (FACTS, "Crashes reach zero in the shadow"). Decision D's diff lists "the `Character` crash" among what microGPT needs to pass the checker (`decision-d-diff.md:243`).
   - The record's "one word from you changes it" (`CLIMB-BATCH-7R.md:26`) is in no `PLAN.md` item, and the batch 8 line names no crash.
   - Home: `PLAN.md`'s batch 8 line.
5. **Rows 450 and 451 have no batch, and the compiled path inherits them.** Severity: should be fixed in a named batch (batch 8's one-line slips, or a range rung before the switch-over).
   - The record left them open with "One word adds them to J" (`CLIMB-BATCH-7R.md:24`); that default is not in `PLAN.md`. Their fixes are in the rows.
   - Row 453, the compiler library's midpoint overflow, retires with that library. By reading, at the switch-over the compiled path runs the one library's range bodies, and with them rows 450 and 451.
   - Home: `PLAN.md`'s batch 8 line.
6. **Row 478 belongs to batch 7b's walk rung, whose record does not name it.** Severity: should be fixed in batch 7b.
   - Walk's shared symbolic instantiation (`FGenericFunction.java:43-62`) sits in the overload check answer 9's walk rung rewrites; row 478 says "answer 9's walk rung is where the cache key gains the bounds". `CLIMB-BATCH-7.md` does not mention the row or the cache.
   - The api/component split of `Range`'s clause is counted: the export check lists `Range` "different excludes clauses for traits" before and after J (`rung-ranges-zz32/probes/distance/errors-preedit.txt:39`, `errors-postedit.txt:22`). Where the clause should end, in the api, is in row 478's note only.
   - A note: the home-1 check of the `String` clause runs only when walk analyses `FortressLibrary` afresh (J's `REPORT.md` section 6; rows 98, 342), so a warm `testSystem` shard can pass without the clause. The skeptic flagged it (`SKEPTIC.md` section 13); nobody ruled.
   - Home: batch 7b's record, W's section names row 478, and L or batch 8 moves the clause into the api.
7. **The one library writes two numeral strides, and batch N's record does not name them.** Severity: a note for batch N's record.
   - J split the point operators "so that a numeral meets a `ZZ32` parameter and the library's coercion" (`REPORT.md` section 4) and kept the strided and partial-size operators generic (`FortressLibrary.fsi:2319`, `:2324`). The second review found a numeral stride in no microGPT file. The library itself has two: `SUFFIX_SUM`'s `seq((|x| - 2):0:-1)` (`Library/FortressLibrary.fss:4592`) and `seq((|a| - 1):-1:-1)` (`Library/Shuffle.fss:23`).
   - Today the numeral is an `IntLiteral` below `ZZ32`. After rung Q, `-1` meets a parameter typed by `I`. Whether batch N's inference with coercion takes it when the range argument fixes `I` is not in its record (no "stride" in `CLIMB-BATCH-N.md`). U's sentence "An integer numeral converts to ℤ32" covers the stride.
   - Home: batch N's record names the two sites as cases its shadow must show. If the rule does not take them, J's own device, a `ZZ32` strided form beside the generic one, is the library's way.
8. **The record's lists for Pavol have no route.** Severity: a note, for the workflow.
   - Of section 1's three defaults (`CLIMB-BATCH-7R.md:24-26`), only row 452's is in `PLAN.md` (`:191`). The workflow says the tails' "What comes back to Pavol" lists "reach him with the landing" (`climb-batch-workflow.md:45`). The landing's written record, the handover's two paragraphs (`microgpt-run-c-handover.md:23-25`), carries neither list, though J wrote its list out (`rung-ranges-zz32/probes/lists-for-pavol.txt`). The first review checked `PLAN.md` against the gather's items, not against the record's lists.
   - Home: findings 2, 4 and 5 put the substantive ones in `PLAN.md`. For later batches, the gather files a record's defaults and each tail's "What comes back to Pavol" as a parked line, or the records stop writing lists nobody files.

## Smaller notes

- Row 482 survives the switch-over (the judge, section 2) and has no plan line; no microGPT file writes `case most`.
- Row 483 has no home. One of its fixes changes three lines of the team's `RandomTest`, which the record would list for Pavol; it fits batch 8's library slips.
- The team's comment "Actually want" (`FortressLibrary.fss:3952-3957`, api `FortressLibrary.fsi:2235-2240`) still describes generic point operators the decision set aside. It is the team's text and stays; the provenance is in J's commit.

## What went right

- Every clause of decision 1 reached a rung and was built as worded, and the gather checked U's text against J's landed library, statement by statement.
- J followed the team's own comment against measurement C's shadow, and traced `rangeOperators` to a real walk defect instead of patching around it.
- The skeptics measured what the reports said by reading: the case rule's operator choice with one instrumented line, the compiled stubs of rows 479 and 481, the extremum crash, and the `nat` differential that item 25 now cites.
- The judge's ruling put rows 481 and 482 in the home the rule gives, in a batch whose rung had just written the same shape.

## What I did not do

- Built nothing, ran no program, edited no source, library, test, ledger or record file.
- Did not measure finding 3's `solve` form, finding 1's reading of batch N's effect on a size, or finding 7's strides under batch N's rule. Each is by reading.
- Did not read batch 7C's worktrees; read `CLIMB-BATCH-7C.md` and `CLIMB-BATCH-N.md` on `main` only for the rows they name.

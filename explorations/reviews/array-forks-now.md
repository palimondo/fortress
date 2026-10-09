<!-- The six array forks as they stand now, written 2026-10-09 by an Opus worker for the coordinating session, which puts the array questions to Pavol one at a time. Four parts: the 94 array sites of the distance by the fork whose answer clears them; what changed for the first three forks since the clean list of 2026-09-29 (`reviews/array-design-ways.md`); which forks a batch can build before the switch-over; the order to put them, with the first as a question in the nine-step form of `coordinator/CLIMB-BATCH-12.md` section 2. Base: `main` at `9aeb22f8b`, whose `Library/`, `ProjectFortress/` and `Specification/` are those of `f9d3ec826`, climb batch 11's landing (`git diff --stat f9d3ec826 HEAD` over them is empty). Sources: the per-site list `compile-ladder/gate/distance-sites.tsv` (207 sites), cut by the line ranges of `CLIMB-BATCH-12.md:291`; the 09-29 list `compile-ladder/climb-batch-N/gate/distance-sites.tsv` and the landed lists of batches 7b to 11 read from git; the note's captures read at `fb10482ba`, since the cleaning of 2026-09-30 (`84aef6a4f`) took them out of the tree; the library and checker at each site. Nothing was built, run or measured. Readings of my own are marked "by reading". -->

# The array forks now

## In short

- **The 94 by fork.** Fork 1, arithmetic in a size: 13. Fork 2, the bound of `Vector` and `Matrix`: 44. Fork 3, a size known only at run time: 9. Forks 4 to 6 (width, decision D, decision A): none. None of the six: 28.
- **Two forks at one site.** Only `reflect`'s 3 (`NatReflect.fss:45`, `:47` twice): fork 1's 15a clears them, or fork 3's 4b. Under 15b they need 4b.
- **The 94 is a floor.** Two crash rows of the distance hide the `Array2` and `Array3` traits whole. By reading they hold at least 5 more fork-3 calls.
- **What moved since 09-29.** The array sites are the same, 67 to 70 lines lower, less 6 that later batches cleared. Fork 1: walk computes a size exactly and both paths range-check it (`413f36ac0`). Fork 2: `RR32` and `IntLiteral` joined `Number`; the Meet Rule code whose slowness 6c's two-trait form measured was rewritten (`70d5486f9`), so that timing is stale. Fork 3: the witness's own error is gone (`a1b5c253d`); the crash hiding the rank-2 and rank-3 calls is now a plain refusal, so a library slip unhides them.
- **Before the switch-over.** Forks 1, 2 and 3 can each be built in a phase-3 batch, in the checker or the library. Their compiled runs wait for the switch-over and for decision A's binding of `NativeArray`. Forks 4, 5 and 6 belong to phases 5 and 6.
- **No answer needed for 28 sites.** 6b's 19 (a slip under every way) and 9 other slips clear without any fork.
- **The order.** 1, then 3, then 2, then 4, 5, 6. The first question is item 15, below (section 4).

## 1. The 94 sites, by the fork whose answer clears them

How they were cut. `CLIMB-BATCH-12.md:291` names the arrays as these line ranges: `FortressLibrary.fss:2114-2160` (6), `:2249-2460` (24, without row 608's `:2255`), `:2620-2991` (48), `:4686-4706` (9), plus `NatReflect.fss` (3), `NativeArray.fsi` (2) and `FortressLibrary`'s two export errors. The same cut of `distance-sites.tsv` gives 94. I read every site against the library at `main`.

Against 09-29. Every site maps to a site of the 09-29 list (`climb-batch-N/gate/distance-sites.tsv`), 67 to 70 lines lower. Six sites of 09-29 are gone:

- the storing objects' three abstract-method errors (batch 10's rung C, `aa07efb31`, row 563; `reviews/batch-10-review.md:17`);
- `Col` and `Row`'s two `subarray` return types (batch 8's rung M, `0ae526b31`);
- the witness `__thrower`'s `throw` (batch 10's rung N, `a1b5c253d`).

### Fork 1, arithmetic in a size (item 15): 13

- **The storage fields, 8.** `__DefaultArray2`, `__DefaultMatrix` and `__DefaultArray3` type their field by a product, `mem:PrimitiveArray[\T, (s0 s1) \]` (`FortressLibrary.fss:2620`, `:2768`, `:2991`, 2 each). The same two types are reported again at `NativeArray.fsi:12` (2). 15a, 15b and 15d each clear them; 15b was measured on 09-29.
- **`reflect`'s helper, 3.** `__refl'[\r, b+b\]` and `__refl'[\r+b, b+b\]` (`NatReflect.fss:45`, `:47` twice). 15a clears them by reading. 15b does not. Fork 3's 4b, `reflect` built in, removes the body that holds them. These are the sites that need one of two forks.
- **Two `typecase` arms called unreachable, 2.** `typecase N[\b0\] of N[\0\] => r` (`FortressLibrary.fss:2424`, `:2435`). The checker's size rule says a size name is never a numeral: "Sizes are equal as symbols and literals; a symbol is not any literal" (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:355`, with `Formula.scala:95-105`; rung N, `3f297441c`). So `N[\b0\]` excludes `N[\0\]`, though `b0` can be 0. They clear only if fork 1's answer also says that a name may equal a numeral. The team's Q&A gives exactly that answer (section 4). The 09-29 note listed them under question 4's "today", by class. Their mechanism is fork 1's rule (by reading).

### Fork 2, the bound of `Vector` and `Matrix`: 44

- **Arithmetic on `T` in the bodies, 15.** These are the note's V1 refusals "not applicable to an argument of type (T, T)": `Vector` at `:2396`, `:2398`, `:2399`, `:2400`, `:2402`, `:2404`; `Matrix` at `:2704`, `:2706`, `:2707`, `:2708`, `:2714`, `:2716`, `:2732`, `:2754`, `:2759`.
- **"T does not satisfy the corresponding bound Number", 21.** 19 are in or through the storing objects, which declare `T` with no bound (`:2407`, `:2708`, `:2752` twice, `:2757` twice, `:2762`, `:2767`, `:2774`, `:2775`, `:2781` to `:2785`, `:2786` twice, `:2787` twice). 2 are at the factories `vector` (`:2455`) and `matrix` (`:2816`).
  - 6b, the slip, cleared the 19 on 09-29 with none new. The note calls it a slip under every way, so these 19 can be fixed before he answers fork 2.
  - The 2 factory sites stayed under every measured way, from a cause the note did not trace.
- **The scalar-extension block, 8.** `opr + - MIN MAX[\T extends Number, I\]` (`:4696` to `:4706`): the same `Number`-has-no-arithmetic refusal. The 09-29 note counted these outside V1.
  - 6c on `Vector` and `Matrix` alone (the measured variant RINGVM) leaves them.
  - With the ring bound on the block too (variant RING), walk refused the block's `MAX` at load.
  - `MIN` and `MAX` need `StandardMin` and `StandardMax`, which the ring does not give (by reading). So only a bound per operation, 6d, reaches all 8.

### Fork 3, a size known only at run time: 9

- **The run-time factories, 6.** `__arr1`, `__arr2`, `__arr3`, `__imm1`, `__parr` and `__piarr` are each called with `reflect(x)`, a `NatParam`, where `N[\n\]` is declared (`:2114`, `:2116`, `:2118`, `:2132`, `:2151`, `:2156`).
- **The rank-1 subarrays, 3.** `__subarrayI` and `__subarray` are called with `reflect(o)` (`:2249`, `:2307`, `:2315`).
- **Which ways clear them.** 4a clears all 9 by reading. 4b clears them only together with 4a's rule. 4c, 4d and 4e leave the library's own calls as they are.

### Forks 4, 5 and 6: none

The width, decision D and decision A clear no site of the 94. Decision D is the model's text (C4), which the distance does not check. Decision A, as A1, rewrites the factories' bodies (`array1`, `vector`, `matrix`). Two of those lines carry fork 2's untraced bound errors (`:2455`, `:2816`); whether A1 moves them is not known.

### None of the six: 28

- **Bodies typed by the parent trait, 13.** `Vector`'s and `Matrix`'s bodies answer `Array1` or `Array2`, because `map`, `ivmap`, `fill` and `tabulate` are declared on the parent: "Function body has type Array1[\T,0,s0\], but declared return type is Vector[\T,s0\]" (`:2396`, `:2398`, `:2399`, `:2402`, `:2457`, `:2459`, `:2752`, `:2757`; for `Matrix`, `:2704`, `:2706`, `:2707`, `:2708`, `:2819`).
  - The measured 6c left them, and it uncovered one more at `:2400` (`sites-RINGVM-vs-L0.txt` at `fb10482ba`).
  - The library's own way covers `fill` and `tabulate`: `ImmutableArray1` redeclares both at its own type (api `FortressLibrary.fsi:1567-1568`, bodies `FortressLibrary.fss:2276-2283`). POSITIONS, "`fill` takes a value, `tabulate` a function", says the same of the leaf traits.
  - For `map[\R\]` and `ivmap[\R\]` the `R` is unbounded, so `Vector[\R\]` cannot be their result. The ways there are a body built through `tabulate`, or a `cast`.
  - No row names these sites. They need a list of ways.
- **A size tested in a branch, 3.** `typecase N[\b0\] of N[\0\] => r` and `if b0=0 AND b1=0 then …` answer a join, because the checker does not learn `b0 = 0` inside the arm: "Function body has type OR(Array1[\T,0,s0\],Array1[\T,b0,s0\])" (`:2421`, `:2432`, `:2795`). The ways are a checker rule that refines a size in the arm that tests it (no way of the six names it; 4e is the nearest), or the library's `cast` in the arm. No row.
- **Library slips, 10.** None waits on a design.
  - `__immutableFactory1` declares `ReadableArray1` where its callers need `ImmutableArray1` (`:2272`, `:2336`).
  - `__ImmutableSubArray1.put` calls a `put` that immutable arrays lack (`:2381`).
  - `mul`'s two local functions declare `()` and end in a parallel pair typed `((), ())` (`:2712`, `:2730`).
  - `TransposedMatrix` calls `add`, `subtract` and `negate`, which `Matrix` does not declare (`:2782` to `:2784`).
  - `SUFFIX_SUM`'s `seq((|x| - 2):0:-1)` passes a `Range[\ZZ32\]`, which no `seq` takes (`:4686`).
  - `matrix(v)`'s numeral `0` (`:2819`, row 437). Its repair's form follows fork 2: `v.zero` under a ring bound, the witness device under `Number`.
  - No row names the first nine.
- **The two export errors, 2** (`FortressLibrary.fss:12`).
  - The first lists 17 api declarations the component lacks. 14 are decision E's dead sizes, `DOT` and juxtaposition declared with size parameters they never use (`FortressLibrary.fsi:1650-1666`, `:1763-1793`), shown to him "with the switch-over's design" (POSITIONS, "Sizes."). The others are the two commented-out `immutableArray` ranks (`FortressLibrary.fss:2133-2138`) and `array3`.
  - The second is one error over about 50 traits, most of them not arrays (`Comparison`, `Range`, `String`, `Number`, `Maybe` among them). It clears only with the library-wide api match.

### Sites that need two forks, or a fork and something else

- **Two forks, either one: 3**, `reflect`'s helper (fork 1 by 15a, or fork 3 by 4b).
- **Fork 2 plus a body repair, on 8 lines.** `:2396`, `:2398`, `:2399`, `:2402`, `:2704`, `:2706`, `:2707` and `:2708` each carry a fork-2 error and a parent-trait error. The line is clean only when both are repaired. Fork 2's answer uncovers a ninth at `:2400`.
- **Fork 1's rule plus a refinement.** The 2 unreachable arms (fork 1's rule) sit in the bodies `:2421` and `:2432` (refinement or `cast`).
- **A compiled run, not the distance.** Under 15b the 8 storage sites leave the distance with fork 1 alone. A matrix runs compiled only with fork 3's answer, because `primitiveArray` calls `reflect`, and with decision A's `NativeArray` binding (section 3).

### What the 94 does not show

- **The hidden traits.** The batch-11 distance table has three crash rows (`compile-ladder/climb-batch-11/gate/distance.txt`, `#crash`). Two stop the checker on the whole `Array2` trait (`FortressLibrary.fss:2492-2606`) and the whole `Array3` trait (`:2865-2978`), at their `asString`'s local `row(i)` and `row(i,k)`, which have untyped parameters (`:2501`, `:2884`). On 09-29 these were "TryChecker returned an untyped expr" crashes. Since batch 11's rung C (`2d22d3a35`; row 620 fixed) they are "Missing parameter type for i", a refusal the text gives (`climb-batch-11/gate/summary.txt:126-131`). `CLIMB-BATCH-12.md` does not mention them.
- **What is inside them.** By reading, the two traits hold five more `__subarray(…, reflect(…), …)` calls (`:2538`, `:2550`, `:2575`, `:2933`, `:2943`). These are the rank-2 and rank-3 twins of fork 3's three. Typing those parameters, a slip, puts the traits on the distance with these calls and whatever else they hold.

## 2. What changed since 2026-09-29, forks 1 to 3

The note was measured on `main` at `6bc21c364`. Six batches have landed since:

- 6.5b: `e455ccd98`, `413f36ac0`;
- 7b: `e2f1aa7e8`, `8f7e183d4`, `070ef39e5`;
- 8: `f3032eed8`, `9d2e4c856`, `70d5486f9`, `0ae526b31`;
- 9: `669b77d03`, `7ed2a8387`, `631fb867e`, `1e176516c`;
- 10: `a1b5c253d`, `a9b9933e6`, `833420ce4`, `aa07efb31`;
- 11: `27cb9e93b`, `369982d85`, `2d22d3a35`, `b872d65a1`.

The distance went from 627 to 207. These apply to all three forks:

- **Line numbers.** Every line the note cites in the array section is now 67 or 68 lower (`git diff 6bc21c364 HEAD -- Library/FortressLibrary.fss`). PLAN item 15's `:2558`, `:2706`, `:2929` (`PLAN.md:194`) are stale too. Today the fields are at `:2620`, `:2768`, `:2991`.
- **The captures.** The note's captures and patches, `reviews/array-design-ways/` and `reviews/decision-d-diff/rebase-2026-09-29/`, 65 files, left the tree with `84aef6a4f` (2026-09-30). The note still cites them. They are at `fb10482ba`.

### Fork 1, item 15

- **Same count, new lines.** 11 sites, as on 09-29 (8 storage, 3 `reflect`). `NatReflect.fss` and `NativeArray.fsi` are unchanged.
- **15b still applies as written.** Its edit is the variant STORE (`lib-variants.py` at `fb10482ba`, lines 71-75). Its exact strings still match today: two rank-2 fields and one rank-3. The measured cost (3 lines, 8 sites, none new) holds by reading. `primitiveArray` is at `:2151-2153`, unchanged.
- **Walk computes sizes exactly, and both paths range-check them** (`413f36ac0`, batch 6.5b's rung E).
  - Walk computes `+`, `-` and juxtaposition with exact arithmetic and refuses a result out of range (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:468-479`).
  - The checker refuses a literal size outside `NN32` or `ZZ32` (`scala_src/typechecker/TypeWellFormedChecker.scala:49-69`).
  - Effect on 15a: its folding must pass each folded numeral to that range check, and the loader's evaluation must give the same refusal (by reading). Walk's half of 15a is already built.
- **His answer moved it** (batch 8's Q4, 2026-10-02, `CLIMB-BATCH-8.md:56-62`). Item 15 waits with the array questions after the switch-over. PLAN item 15 now pairs 15b with `reflect` built in for the other 3 (`PLAN.md:194`). FACTS records what the text says ("The specification allows arithmetic in a size and does not say when two size expressions are the same type", `FACTS.md:177`, `c01b3bf30`).
- **Read anew, not changed.**
  - The team's other library writes sums in result types: `BSD`, `ABV` and `tri` answer `Array2[\T, 0, s0, 0, s1 + s2\]` (`Library/Generator22D.fss:314`, `:318`, `:324`; Kento Emoto, 2010; the revival changed only `fill` to `tabulate`, `f3b62bc83`). `Generator22D` is not one of the distance's components. The note's "the three fields and `reflect` are the only arithmetic in sizes in the library" holds only for the one library. 15b cannot reach a size in a signature; 15a accepts these by their form.
  - The two unreachable arms (section 1) also belong to fork 1's rule. 15a must say what a name against a numeral is.
  - The gated expected failure `ProjectFortress/compiler_tests/XXXNatArithChecker` (`Box[\2 + 1\]`, `Box[\k + 1\]`, from rung N) is 15a's test, ready.

### Fork 2, the bound

- **Same count, new lines.** V1 is 36, as on 09-29 (15 arithmetic, 21 bound). The same sites are 68 lines lower. The distance table's class row says V1 27 (`climb-batch-11/gate/distance.txt`) because the class ranges were stale (row 577). Counted by site, it is 36.
- **The storing objects are cleaner.** Their three abstract-method errors are gone (`aa07efb31`). After 6b they keep only fork 1's storage field and `TransposedMatrix`'s three slips (section 1).
- **`Number` has two more members.** It now `comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }` (`FortressLibrary.fsi:283-284`; `e455ccd98`, `9d2e4c856`).
  - `RR32` is a sibling that extends `MultiplicativeRing[\RR32\]` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47-48`), so 6c's ring admits it. On 09-29 it was a subtype of `RR64`.
  - `IntLiteral` extends `Number` alone (`FortressBuiltin.fsi:178`). So a ring bound refuses a vector of numerals, where `Number` admits one (by reading).
  - `Number` stays closed. 6c alone swaps it for the open ring, so the 4 overloading errors it brought on 09-29 (`String`'s juxtapositions) would come again (by reading).
- **6c's timing is stale.** The two-trait form's 3,825 s against 704 s was spent in `OverloadingChecker.meetRule`'s exclusion tests. That checker has since been rewritten: batch 8's rung O (`70d5486f9`, +114 lines in `OverloadingChecker.scala`, a per-provider Meet Rule and a memo keyed on its inputs), then `e2f1aa7e8`, `aa07efb31` and `2d22d3a35`.
  - Today's unchanged library takes 662 s in that component (`climb-batch-11/gate/distance.txt`, `#seconds`).
  - Whether the two-trait form is still several times slower is not known.
- **6c's edit is the same size.** It is still 61 lines: 3 objects, 26 component bounds (`FortressLibrary.fss:2392-2856`) and 32 api bounds (`FortressLibrary.fsi:1602-1785`). The variant script's fixed line ranges (2300-2800 and 1540-1735) would need re-basing.
- **The scalar block counts with the arrays now.** `CLIMB-BATCH-12.md:291` counts its 8 sites, which the note left in no class. Its api twin is `FortressLibrary.fsi:2681-2691`.
- **The two-trait precedent moved.** It is at `:3247` and `:3253` (note: `:3179`) and reads `T extends { AdditiveGroup[\T\], StandardMax[\T\] }`. Its uses are on the distance under row 433, the `where` clauses: `SumReduction`'s `distribute` names the pairs with only `AdditiveGroup[\T\]` in hand. That is the need 6d meets when a method wants a bound its trait lacks.

### Fork 3, a run-time size

- **Same count, new lines.** 9 `NatParam` refusals, as on 09-29.
- **The witness is clean.** `__thrower[\T\](): T = throw ForbiddenException(CallerViolation)` (`:2440`, `a1b5c253d`): the witness's own refusal (old `:2372`) has been gone since batch 10. Each of the 6 factories now has the one refusal 4a addresses.
- **The hidden twins can be unhidden by a slip.** The crash that hides the rank-2 and rank-3 subarray calls is now a refusal the text gives (`2d22d3a35`; section 1). On 09-29 a checker crash hid them. Now typing `row`'s parameters (`:2501`, `:2884`) unhides them, and 4a's effect grows to at least 14 sites (by reading).
- **Walk unaffected.** Walk's binding changes (`669b77d03`, `369982d85`) leave `reflect` running. Batch 11's microGPT walk check passed 7 of 7 (`climb-batch-11/gate/summary.txt:132-135`).
- **4a still has no test on the compiled path.** `NatReflect` is still not in the compiled path's library (row 307). Before the switch-over, the distance stage is 4a's test, as batch 12's rung R uses it for row 608 (`CLIMB-BATCH-12.md:244`).

## 3. What a batch can build before the switch-over

**The tension on record.** The switch-over comes when the checker accepts the one library: "Phase 3 of the plan brings the distance to a true zero, so that the switch-over can happen" (`CLIMB-BATCH-12.md:11`). The 94 are on that distance. His answer to batch 8's Q4 and the array positions place the array questions after the switch-over (POSITIONS, "The array design's three questions are open"; `CLIMB-BATCH-12.md:24`, `:44`). PLAN item 13 already notes that the first three forks "sit on phase 3's road" (`PLAN.md:308`). So forks 1 to 3 cannot all wait for the switch-over unless its measure leaves the arrays out. Building them now reverses that placement, which is his to change.

- **Fork 1 can be built before the switch-over.**
  - 15a is one checker rung: the refusal in `TypeWellFormedChecker.scala:41-47`, the size equality in `Formula.scala:95-105` and `TypeAnalyzer.scala:355`, and a specification revision. Batch 8's Q4 priced it at about 1M as a fifth rung.
  - The loader's half (computing `s0 s1` when it makes a class; today `NamingCzar.java:1899-1905` spells it out) can ride with it, tested by `XXXNatArithChecker` run compiled. Or it can wait until the one library's matrices run compiled.
  - 15b is one library rung of 3 lines. Its compiled run waits for fork 3 and for `NativeArray`'s binding.
  - 15d's walk natives can be built any time. Its compiled natives wait with `NativeArray` (phase 4's natives: "The rest, class D2, waits: `NativeArray` with decision A", `PLAN.md:124`; `perf-probes/prelude/natives-shape.md:114`).
- **Fork 2 can be built before the switch-over, library only.**
  - 6b (3 lines) and 6c (61 lines) were both measured, and both keep walk's array tests unchanged.
  - 6d is unmeasured. It touches C4's `Diag` override of `mul` (`explorations/run-c4/src/FlatArrays.fss:36`, row 299), which is vocabulary shown to him as a diff (POSITIONS, "The model's text is the notation.").
  - 6e waits for `where` clauses, which no batch has planned (`CLIMB-BATCH-12.md:47`).
  - His standing check already leans: "checked per operation's required capability, with no blanket ring bound that would exclude integer arrays" (POSITIONS, "The integration review's checks").
- **Fork 3 can be built before the switch-over.**
  - 4a is one checker rung, at the application rule, plus a specification sentence. The distance stage is its test until `NatReflect` reaches the compiled library (row 307).
  - 4b's walk half can be built any time. Its compiled half, over design B's `RTTIsize.of` (`FACTS.md:133`), matters only once the compiled path imports `NatReflect`, at or after the switch-over.
  - 4c and 4d build nothing in the library and leave its 9 sites. 4e waits for `where` clauses.
- **Fork 4, the width, belongs to phase 5.** It has no site. It can be answered any time; rung V, the `RR32` sibling 5b waited for, has landed (`e455ccd98`). What it changes is built in phase 5 (the model's types, new goldens) and with decision A's store.
- **Fork 5, decision D, belongs to phase 5.** "Nothing is applied until phase 5" (POSITIONS, "The model's text is the notation."). The model compiles only after the switch-over gives it the one library's names (`PLAN.md:10`). D1's 10 bridge lines are fork 3's answer.
- **Fork 6, decision A, belongs to phases 5 and 6.** It "stays after the switch-over" (POSITIONS, "The array design's three questions are open"). The compiled binding of `NativeArray` waits on it (`PLAN.md:124`). The speed comes from decision B, phase 6 (`PLAN.md:156`).
- **28 sites need no fork.**
  - 6b's 19, "a slip under every way" (`reviews/array-design-ways.md` sections 7 and 8).
  - The 9 slips of section 1 (row 437's `:2819` waits on fork 2's form).
  - The `row` parameter types that unhide `Array2` and `Array3` (not among the 94).
  - These fit the planner's pile 1 ("decided and free to fix, the library's one-off slips", `PLAN.md:21`), if he agrees that the arrays' slips are not the array design. That is one line to ask.
- **Three groups need a list of ways first:** the 13 bodies typed by their parent trait, the 3 sizes tested in a branch, and the two export errors (decision E with the switch-over's design, and the library-wide api match).

## 4. The order now, and the first question

The order: **1 (item 15), 3 (run-time size), 2 (bound), 4 (width), 5 (D), 6 (A).**

- **1 first.** It is the smallest question, and its ways are all on file. The default on record is 15a (`CLIMB-BATCH-7.md:43`), and a gated test already pins it. He weighed it once, in batch 8's Q4. Its answer also decides whether fork 3 must build `reflect` in: 15b leaves `reflect`'s 3 to 4b.
- **3 before 2.** Fork 3 follows from fork 1's answer, and its question is ready.
  - Fork 2 holds the most sites (44), but its fair question needs a probe first. 6d, the per-operation bound his standing check names, is unmeasured. The scalar block's 8 have no measured way. 6c's two-trait timing predates rung O's rewrite.
  - A worker can probe 6d and re-time 6c while he answers 1 and 3.
  - The note's order put 2 before 3, by what each unblocks. Nothing on record makes 2 a prerequisite of 3.
- **4, 5 and 6 as the note has them.** They clear no site. The width fixes the types of D's diff and the store of A.

### Q15. Item 15: when the library writes arithmetic in a size, what makes the checker accept it?

- **Blocks.** 11 sites of the 94: the three storage fields (8) and `reflect`'s helper (3). 2 more if part (b) is yes. Also whether fork 3 must build `reflect` in.
- **On file.** PLAN item 15 (`PLAN.md:194`); batch 8's Q4, answered "a later checker batch" (`CLIMB-BATCH-8.md:56-62`); FACTS, "The specification allows arithmetic in a size and does not say when two size expressions are the same type"; the clean list, section 4; this note, sections 1 and 2.
- **Terms.**
  - A *size* is a number written in a type: `Vector[\RR64, 16\]` is a vector of 16 numbers. A function declares one as `nat n`.
  - *Arithmetic in a size* is a size written as a sum or a product: `s0 s1` (two names side by side multiply), `b+b`.
  - A *storing object* holds a matrix's numbers in one flat row of `s0 s1` cells.
  - `reflect(x)` turns a number known only when the program runs into a size.
  - *Folding* computes `2 3` into `6` when both are numbers.
  - *The checker* is the compiled path's type checker; *walk* is the interpreter.
- **Type theory.**
  - Two sizes are the same type when they are the same number for every value of their names. So `s0 s1` is `s1 s0`. Proving that in general needs algebra, which Haskell does with a plugin.
  - Comparing the written form is simpler: `s0 s1` is `s0 s1`, but not `s1 s0`.
  - Every such rule must also say when two sizes are known to differ. `3` and `4` differ. A name `b0` and the numeral `0` may be equal, because `b0` can be 0.
- **Today.**
  - Walk computes a size expression when it makes an instance, exactly, with a range check (`EvalType.java:468-479`). Every matrix microGPT makes lives in such a store.
  - The checker refuses any arithmetic in a size by name (`TypeWellFormedChecker.scala:41-47`). That gives 11 errors: the fields at `FortressLibrary.fss:2620`, `:2768`, `:2991` (6), the same types at `NativeArray.fsi:12` (2), and `reflect`'s helper at `NatReflect.fss:45`, `:47` (3).
  - The checker's rule says a name is never a numeral (`TypeAnalyzer.scala:355`). So it calls the `N[\0\]` arm of `typecase N[\b0\]` unreachable (`:2424`, `:2435`), 2 more.
  - The compiled run computes nothing: the name mangler spells the expression out (`NamingCzar.java:1899-1905`). No compiled program has a product in a size.
  - A test is waiting: `ProjectFortress/compiler_tests/XXXNatArithChecker`, with `Box[\2 + 1\]` and `Box[\k + 1\]`.
- **The specification.**
  - It allows arithmetic in a size: a static argument may be a sum, a difference, a product or a power (`Specification/appendices/grammars/concrete-syntax.tex:540-547`).
  - Once the names are known, the value is fixed: "Given instantiations of all static parameters ... in scope of a static expression, the value of the static expression can be determined statically" (`Specification/basic/expressions/constant.tex:20-23`).
  - Two types are identical when "their names and static arguments (if any) are identical" (`Specification/basic/types-vals-vars.tex:51-52`), beside the team's note "It isn't complete in any case" (`:48-50`). It never says when two size expressions are identical.
  - The team's own Q&A: `f(x: T[\n+1\])` beside `f(x: T[\0\])`, "now that n+1 is necessarily nonzero": "Not allowed". `T[\1\]` beside `T[\0\]`: "Allowed" (`Specification/appendices/internal-document.tex:167-198`). So two numerals differ, and an expression with a name is not known to differ from a numeral.
  - The feature is marked "not yet supported" (`constant.tex:15`; `trait-parameters.tex:15`).
- **The library's own way.**
  - The team stores a matrix in a field sized by a product: `mem:PrimitiveArray[\T, (s0 s1) \]` (`FortressLibrary.fss:2620`). `reflect` computes its sizes (`NatReflect.fss:45`, `:47`).
  - The team's block concatenation answers summed sizes: `Array2[\T, 0, s0, 0, s1 + s2\]` (`Library/Generator22D.fss:314`, `:318`, `:324`; not checked by the distance).
  - Where the checker refuses, the library's way around is a run-time factory: `primitiveArray[\E\](x)` (`:2151-2153`).
  - The team's comment in `reflect`: "we ought to build it in and document it in the spec" (`NatReflect.fss:38-40`).
- **The peers** (`reviews/array-design-ways.md` section 4).
  - C++ computes a size argument at each instantiation, so it never compares two expressions.
  - Rust refuses `N + 1` in a type on its stable compiler.
  - Haskell solves `+` and `*` on type-level numbers only for literals; full algebra is a plugin.
  - Futhark allows any size expression, compares narrowly, and treats `n+1` as an unknown size.
- **The commits.**
  - Rung N, batch 4 (`3f297441c`), taught the checker sizes, refused arithmetic by name, and wrote "a symbol is not any literal".
  - Batch 6.5b's rung E (`413f36ac0`) made walk compute sizes exactly and both paths range-check them.
  - His Q4 answer of 2026-10-02 (`c01b3bf30`) put the choice with the array questions.
- **The derivation.**
  - "The library's own practice is the standard": the team wrote a product in the fields and sums in result types. A rule that accepts what they wrote keeps their text; 15b changes it.
  - "Storage is `double[]`, unboxed." says the sizes are "not sidestepped or layered in later". Under 15b the field's type loses its size.
  - "The specification stays the standard": it allows the arithmetic and fixes the value once the names are known. Its identity rule is unfinished, so whichever rule we choose is an S1 revision with an Appendix I entry.
  - It touches the checker, the library or both, and the specification, so it is his (POSITIONS, "Which decisions taken inside the work reach Pavol, and how.").
- **The ways.**
  1. **15a, the default on record.** The checker compares sizes by their written form after folding numerals, and range-checks what it folds.
     - Changes: the checker's refusal and its size equality; the loader computes the size when it makes a class; one specification sentence and an Appendix I entry.
     - Clears the 11. Promotes `XXXNatArithChecker`. Accepts `Generator22D`'s sums. No library or model line.
     - Costs about 1M as a rung (batch 8's Q4).
     - Limit: `s0 s1` is not `s1 s0`. Nothing in the one library needs that, by reading: each product is written once, its type and its constructor on the same line.
  2. **15b, the library's way around.** The three fields are made at run time, `mem: Array[\T,ZZ32\] = primitiveArray[\T\](s0 s1)`.
     - Changes three team lines.
     - Measured on 09-29: 8 go, none new, walk's array tests and microGPT's check unchanged.
     - Leaves `reflect`'s 3 to fork 3's 4b. Every matrix made pays `reflect` on the compiled path. Cannot reach a size in a signature.
  3. **15c, full algebra.** A solver over `+` and `×`. Open-ended, and nothing in the library needs more than 15a.
  4. **15d, a native store per rank.** A store that holds both sizes, so no type needs a product.
     - New natives on both paths. The compiled half waits for decision A's binding of `NativeArray`.
  - **Part (b), with any way:** a name against a numeral counts as possibly equal, as the team's Q&A answers. Clears the 2 unreachable arms. No library line.
- **Recommendation.** 15a with (b) yes. It keeps the team's text, clears 13 sites in one checker rung, and is the specification's own reading of when a size's value is known.
- **Default.** 15a with (b) yes. 15a is the default on record (`CLIMB-BATCH-7.md:43`). (b) is the team's Q&A.

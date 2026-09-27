<!-- The coordinator's plan (Opus tier) for Pavol's question of 2026-09-27 15:24-15:35 UTC: now that the number tower is flat and sizes are checked, what moves the needle most toward compilation, and are the "unknown types and coercion" problems one issue. Written 2026-09-27 on `main` at `d7ca74708` from two evidence digests by Opus workers (beside this file) and the triage of the distance, `perf-probes/prelude/distance-triage.md`. Written at the same time as the Fable plan, `numerics-plan-fable.md`, without reading it; its worker's three-line message and its commit subject arrived while this was being written. The synthesis is `numerics-plan-synthesis.md`. -->

# The numerics on the path to compilation: the coordinator's plan

## 1. The answer

- **You are right about the shape.** Every complaint you heard has the same shape: a value meets a type that the program does not write. The specification never wrote the rule for that. Its type-inference chapter is empty, and its numeral types are a note ("We need to describe the Numeral type hierarchy", `Specification/basic/expressions/literals.tex:83-95`).
- **On the library's count it is two knots, and each has a small fix.** Neither fix is the general rule.
  - **Knot 1: ranges are generic over their integer type.** Almost every numeric error sits in range code written for an unknown integer type `I`. The language has no way to turn a number into a type it knows only as `I`. The compiler library's authors avoided this by declaring ranges over `ZZ32` only. Your point, that a range can only be `ZZ32`, is the fix.
  - **Knot 2: type parameters that nobody writes.** A native's result type, `fail`'s result type, and the implicit bound of an unbounded parameter. This knot is not numeric at all. It looks numeric because most of its errors sit inside the number types' own natives.
- **The rest is not one issue.** About half of the distance is overloading rules, exclusion, library slips and arrays. Batches 7 and 7b already attack most of it.
- **What moves the needle most, in order:**
  1. Batch 7, widened: the bound decision, two written bounds and row 421's four lines added to rungs H and A.
  2. A ranges batch: scalar ranges over `ZZ32`.
  3. Batch 7b's library rung L.
- **What happens to the planned batches:**
  - Batch 7 is not a corner. Rung A alone clears the second-largest class.
  - Batch 7b's rung L is on the path. Its rungs S, C and W are correctness work that clears nothing on the count.
  - Batch 6.5 is a corner for compilation: it clears about 5 errors. It can wait, or run while a decision holds the queue.

## 2. Refresher

- **The distance.** The number of distinct errors the compiled type checker reports on the one library (the interpreter's library, which the compiler is to read). It stood at 1.74K under walk's setting and 1.53K under the compile path's own setting. The two settings differ in what an unbounded type parameter is bounded by: nothing (walk), or `Object` (the compile path). Zero is necessary for the switch-over, not sufficient.
- **A static argument** is the type or size that fills a type parameter, the `ZZ32` in `f[\ZZ32\](x)`. **Inference** fills it in when the program does not write it, from the arguments' types. Today the checker infers only from the arguments. It never looks at the type the result must have. A parameter nothing constrains becomes `Bottom`, or an error "without context".
- **A coercion** converts a value into a wider type at a call or a typed binding, for example a `ZZ32` into `ZZ64`. The flat tower declares one from each narrower number type into each wider one. A coercion needs its target type known. Inside generic code the target is `I`, which is not known until the call.
- **A numeral's type.** The compiler library gives a numeral its own type, `IntLiteral`, which converts into each number type. Walk makes a numeral a `ZZ32` today. You decided walk switches to `IntLiteral` (POSITIONS 2026-09-27, "a numeral's type").

## 3. The audit

Counts are walk's setting / the compile path's setting, from the triage's captures, with the classes as the triage names them. The digest behind every number, with sites and messages, is `numerics-plan-coordinator/evidence-A.md`.

### Knot 1: range code generic over its integer type, about 500 / 500

- **Where it is.**
  - `RangeInternals.fss` holds 340 errors, and 336 of them are in declarations generic over an integer type parameter.
  - The range operators of `FortressLibrary.fss:3690-3970` hold about 80 more.
- **The coercion errors.** 145 / 145 errors are a value that needs converting into a type. Every one is a numeral, or in 3 cases a `ZZ32`, meeting a type parameter `I` in range code. None is between two concrete number types.
  - Examples: `ex > 0` at `RangeInternals.fss:381`, and `n : I := 1` at `:570`.
- **The inference errors.**
  - The dummy `0 asif ZZ32` argument of the range operators (18) makes the checker infer the union `OR(ZZ32, I)`.
  - Four ranges over numerals are inferred at `IntLiteral`.
- **Bound and declaration errors.**
  - Row 358's bounds say `AnyIntegral` where the api says `Integral[\I\]` (81).
  - `|x|`, `narrow` and `partitionL` are declared on the integer types but not on `Integral` (15 and more).
  - Wrong static arguments written by hand (8).
  - Range objects implementing a family at their own types (18).
  - Declared types narrower than what the body builds (29).
  - Tuple shifts (8).
  - The range families among the overloading errors: `CAP`, `IN` and `openRangeHelper` (56), and part of the meet rule's 100.
- **Why it is one knot.** Code generic over an integer type needs numbers of that type. The language offers no conversion into a type variable:
  - the compiled checker refuses a generic coercion as a cyclic hierarchy;
  - walk does not apply a coercion declared in a generic trait (row 389).
  The library has workarounds, but they are barely used:
  - the type's own `zero` and `one` (no call site reads `.one`);
  - the `() -> T` witness;
  - the dummy argument.
  The compiler library's authors did not write this code: their ranges take `ZZ32` only (`Library/CompilerLibrary.fsi:173-174`).
- **What else it dissolves.**
  - The numeral switch adds 35 errors to the count. 15 of them are ranges over numerals, where `0 # |self|` asks the checker to choose `I` between `IntLiteral` and `ZZ32`.
  - Over `ZZ32` alone, the numeral converts into a known parameter type. The checker already does that, and no inference is needed.
  - The same holds for microGPT's own ranges, `0#n` and `0:n-1`, all over `ZZ32`.
- **Under the compile path's setting**, 170 more errors of the bound `Object` sit inside the range declarations. They are the tuples of multi-dimensional ranges, and they belong to knot 2.

### Knot 2: type parameters that nobody writes, about 375 / 380

- **The natives.** `builtinPrimitive[\T\](javaClass: String): T` has a type parameter only in its result: 340 / 0.
  - Writing `T extends Object` at its declaration clears all 340, measured. Writing `extends Any` clears none.
  - 278 of the 340 sit inside the number types' own natives, which is why they sound numeric. The cause is not numeric.
- **`fail`**, whose parameter is also only in its result, and three other calls: 24 / 0.
- **A function argument inferred at `Bottom`** (7 / 8), and `Maybe`'s `__cond` (4 / 4).
- **The implicit bound.** Under the compile path's setting every unbounded parameter gets `extends Object`, which refuses a tuple or `Any` as a static argument: 0 / 372.
  - Batch 7's question 1 decides this bound. Its default (a), the bound `Any`, removes the 372 and brings the natives' 340 back (1,747 measured).
  - The two written bounds above then clear the natives.
- None of this knot is numeric, and none of it needs the general inference rule.

### The rest, about 700 / 650, several separate causes

- **`fill`:** the function form against the value form, and the array diamond, 302 / 58. Batch 7, rung A.
- **Exclusion and the comparisons:** 40 by rung H's brief. By reading, `LEXICO`/`SQCAP` (15), `CMP` return types (17) and `Maybe` (7) as well.
- **Row 421's slip:** `StandardMinMax` declares `MIN` and `MAX` returning `(T,T)`. It causes 52 errors, measured, and its fix is four lines. It sits in rung L.
- **The overload families of answer 9:** the non-range part of 85 / 78. Rung L.
- **The meet rule:** 100, about half of them the range kinds. Batch 8, after probe P2.
- **Arrays and sizes:** 97. The `Number` bound declares no arithmetic, sizes are lost in joins, and the checker has no arithmetic in a size. Phase 5, the array design.
- **The self type:** 28. `self` in `Integral[\I\]` is not an `I`. This is route C's ground, and the checker overflows on it.
- **`String`, the residue and the rest:** `String`'s fields read as methods (22), unbounded tuple comparisons (18), a call covered only by its overloads' union (10), names an api does not declare (54), and 54 unrelated items in the residue.

## 4. The plan, in order

Each step is a batch run of the existing workflow, gated as always. Where a count is inferred, it says so.

1. **Batch 7, widened** (H, A and one small rung N).
   - H and A as planned.
   - N writes `extends Object` on `builtinPrimitive`'s and `fail`'s result parameter, and takes row 421's four lines out of rung L.
   - Question 1 is taken at its default (a), the bound `Any`.
   - It clears, walk's setting: natives 340 and `fail` 24 (the natives measured), `fill` 302, row 421 52, exclusion 40 and more by reading. About 750 of 1.75K. Under the compile path's setting, the 372 go with the bound.
   - The measurement of this tree is running and will be added here.
   - Cost: three rungs, one batch run.
2. **The ranges batch.** Scalar ranges over `ZZ32` only, as the compiler library has them.
   - `RangeInternals` and the range operators lose their integer type parameter. Multi-dimensional ranges stay tuples of `ZZ32` ranges.
   - The specification's ranges text is revised in the S1 form.
   - Tests and demos that range over another integer type are respelled; their count is being measured.
   - It clears most of knot 1's 500, by reading; the measurement of a shadow copy is running. It also makes the numeral switch safe for every range, microGPT's among them.
   - Cost: a library rung and a specification rung, one batch run.
   - Needs decision 1.
3. **Batch 7b's rung L,** with S, C and W beside it as planned. L repairs the overload families by the library's own devices: about 70 by reading.
   - S, C and W clear nothing on the count, and C may raise it. Probe P1 measures that first, as planned.
4. **The numeral switch and the promotion rule.** Walk makes a numeral an `IntLiteral`.
   - With ranges over `ZZ32`, what is left for inference is generic calls over mixed widths and containers (row 388). Neither appears in the library's count, and microGPT has neither.
   - So the promotion rule and the specification's inference chapter are written here, as their own batch, before the switch-over, where walk and the compiled path must agree on every program.
   - This is batch 6.5's question 1, answered: after the ranges batch.
5. **Batch 8:** the meet rule, then the residue one by one to a true zero.
6. **Batch 6.5** (E, P, G, V) runs whenever a decision holds the queue. Its rungs are correctness (a size beyond its range, the integer rules' text, the compiled generics at run time, `RR32` a sibling) and clear about 5 errors. G's rows matter when microGPT runs compiled, which is phase 5.

## 5. Batches 6.5, 7 and 7b, rung by rung

- 6.5 E (a size beyond its range, `NN32`'s `LCM`): clears 0. Keep; not urgent.
- 6.5 P (the integer rules and owed text): clears 0. Keep; not urgent.
- 6.5 G (the compiled path's generics at run time; rows 417, 419, 420, 351, 426): clears 2. Needed before microGPT runs compiled, not before it compiles.
- 6.5 V (`RR32` a sibling): clears 3. Completes the flat tower; not urgent.
- 7 H (exclusion, `AnyIntegral`'s clause): clears 40, and about 70 more by reading. First.
- 7 A (`fill` renamed `tabulate`): clears 302 / 58. First.
- 7b S (the overloading chapters): clears 0. Beside L.
- 7b C (the return-type rule over every instance, the positional rule): clears 0 and may raise the count. Beside L, after probe P1.
- 7b W (walk's choice by declared domains): clears 0. Beside L.
- 7b L (the library's overload families): about 70 by reading. Row 421's 52 move to batch 7.

## 6. Your decisions

### Decision 1: are the library's scalar ranges over `ZZ32` only?

- **Context.**
  - Range code generic over its integer type holds about 500 of the 1.74K errors, and every coercion error in the count.
  - The compiler library, the implementers' later word, declares ranges over `ZZ32` only.
  - A JVM array is indexed by a 32-bit int, and a size is an `NN32` by your decision of 2026-09-27.
  - microGPT's ranges are all over `ZZ32`.
  - Peers: Java has `IntStream.range` and `LongStream.range`, and Kotlin `IntRange` and `LongRange`: two concrete families. Scala's `Range` is over `Int`, with a generic `NumericRange` beside it. Rust's ranges are generic over any integer type.
- **Options.**
  1. Scalar ranges over `ZZ32` only, as the compiler library has them.
     - Touches `RangeInternals`, the range operators of `FortressLibrary`, the specification's ranges text in the S1 form, and the tests that use another width (count being measured).
     - Cost: two rungs.
     - Clears most of the 500 (being measured) and makes the numeral switch safe for ranges.
  2. Keep them generic and repair them with the library's own devices.
     - Row 358's bounds and the dummy argument (85, measured).
     - `x.zero` and `x.one` for the numerals.
     - `|x|`, `narrow` and `partitionL` declared on `Integral`.
     - The slips fixed one by one.
     - Touches the same files, at about 150 more sites.
     - Clears the numerals only as far as the devices reach. The numeral switch then needs the inference rule for `0 # n`.
  3. Ranges over `ZZ32` and `ZZ64`, two concrete families. Twice the range code, with no generic code.
- **What a yes commits you to.** A language change, recorded in the specification with the original kept. A range over another integer type becomes a static error, and such a loop is written another way.
- **What a no costs.** Option 2's sites, and the general inference rule becomes a condition of the numeral switch.
- **Recommendation:** option 1, once the running measurement confirms the count.

### Decision 2: widen batch 7 and take its question 1 at the bound `Any`

- **Context.**
  - Knot 2 is about 375 errors under walk's setting and 372 under the compile path's.
  - With the bound `Any`, a native's result parameter is not inferred. Writing `extends Object` on that one parameter clears all 340, measured.
- **Options.**
  1. Batch 7 = H, A and a small rung N (the two written bounds, row 421's four lines), question 1 at (a).
  2. Batch 7 as planned, with the natives left to the switch-over, which replaces `builtinPrimitive` (row 309).
- **What a yes commits you to.** One more small rung in the next batch.
- **What a no costs.** About 400 errors stay on the count until the switch-over.
- **Recommendation:** option 1.

### Decision 3: the order

- **Options.**
  1. Batch 7 widened, then the ranges batch, then 7b, then the numeral switch with the inference chapter, then batch 8. Batch 6.5 runs while a decision holds the queue.
  2. The order of the plan as it stands: 6.5, then 7, then 7b.
- **What a yes commits you to.** Batch 6.5 waits. Its question 1 is answered by the order: the numeral switch comes after the ranges batch.
- **What a no costs.** One batch run first that clears about 5 errors.
- **Recommendation:** option 1.

## 7. Measured and inferred

- **Measured**, by the triage (captures under `perf-probes/prelude/distance-triage/`):
  - the class counts;
  - the natives' written bound (340);
  - row 421 (52);
  - row 358's bounds with the dummy argument (85);
  - the numeral switch's library half (+35);
  - the setting `Any` (1,747).
- **By reading:**
  - what rungs H, L, G and V clear;
  - the size of knot 1 (summed from the classes, about 500);
  - whether the meet rule's range half goes with option 1.
- **Running, to be added:**
  - batch 7's widened tree under walk's and the `Any` settings;
  - a shadow copy with scalar ranges over `ZZ32`, whether it runs under walk, and its count;
  - the uses of ranges over other integer types in tests, demos and the specification.
- **Not checked:**
  - microGPT's own errors through the compiled checker;
  - what the general inference rule would clear beyond the library.

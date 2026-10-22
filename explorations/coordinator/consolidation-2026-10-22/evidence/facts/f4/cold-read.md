# Cold read: facts F-52 to F-63 (f4)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the skill's `references/` (not `revival-changes.md` or `sources.md`). File read: `explorations/coordinator/consolidation-2026-10-22/evidence/facts/f4/clean.txt`. The file holds F-52 to F-61 and F-63; there is no F-62.

One point applies to every entry: the "Detail:" paths (`reviews/...`, `compile-ladder/...`, `perf-probes/...`) are relative, and no entry says what they are relative to. Most likely `explorations/`, but that is a guess. This is unclear wording, and it is not repeated below.

---

## F-52 "Neither path can build `RationalQuantity`"

- **Established:** The advanced numbers chapter specifies a rational type, `RationalQuantity`, refined by sign flags. Its declaration is a trait that extends instances of itself with weaker flags, under a `where` clause. The team's test `tests/conditionalExtension.fss` writes it that way. The compiled checker refuses that declaration as a cyclic type hierarchy ("Type RationalQuantity transitively extends itself"). Walk runs the test only because the test never instantiates the trait. A probe that does instantiate it fails under walk.
- **Conditions:** It holds for this way of declaring the type: self-extension with weaker flags, under `where`. On walk it applies once something instantiates the trait; declaring it alone passes.
- **Consequence:** No program can use `RationalQuantity` as the chapter declares it, on either path. A walk pass of `conditionalExtension.fss` does not show that the construct works. Work that needs this type must deal with the cyclic-hierarchy refusal on the checker and with walk's failure at instantiation.
- **Evidence:** "Measured", with no test named. Detail in `reviews/flattening-questions-ways.md`, "Question 3", section 2.
- **Could not resolve:**
  - "sign flags": probably `bool` static parameters for sign properties such as nonnegative or nonzero, but the entry does not say what they are. This is a language and specification concept I lack, and the skill does not cover it.
  - "build": it could mean "declare and check", "compile", or "instantiate and run". From the body, the checker fails at the declaration and walk fails at instantiation. Unclear wording.
  - "the advanced numbers chapter": presumably the specification's, but no file is named. Unclear wording, minor.
  - How the walk probe fails (its error) is not given. This leaves a gap, but it does not make the claim ambiguous.
  - The entry is "Measured", yet it names no gating test and no command. The skill says a fact that no test checks gives its command and output. The entry gives neither.

## F-53 "At the last landed gate, the distance to the switch-over is 5 errors and the checker count is 3"

- **Established:** At the last landed gate the distance is 5 and the checker count is 3. The distance's five errors are:
  - 1, class X1: an export error, where the `FortressLibrary` component does not match its api.
  - 2, class BR: two `BIG MIN` sites of ledger row 731.
  - 2, class OT: row 731's site at `List.fss:146`, and the fused arm of `__bigOperator2`, whose `typecase` arm returns the wrong type (row 632, review-queue item 46).

  The checker count stops when the checker crashes or meets an error it cannot get past. Nothing stops it now (F-233). Its 3 are the fused arm and the two `BIG MIN` sites, and every api counts 0. Neither number turns the gate red (P-39).
- **Conditions:** These values are as of the last landed gate only. The entry does not name that batch.
- **Consequence:** A rung measured by distance or checker count starts from that batch's `gate/distance.txt` and from `compile-ladder/gate/distance-sites.tsv`. Its result is the change against those values. A rise in either number does not fail the gate.
- **Evidence:** The gate's tables. Procedure in the `coordinator` skill's `references/batch.md`, "The checker count and the distance".
- **Could not resolve:**
  - "every stage of every unit, by root cause": I cannot tell what a "stage" is (a pass of the checker? the api check, component check and export check?) or what a "unit" is (component and api?). "Counts ... by root cause" can also be read two ways: errors with one root cause count once, or every error is counted and then sorted by cause. Unclear wording.
  - "its 3 are the `FortressLibrary` component's own errors, the fused arm and the two `BIG MIN` sites": read as a list of three items it comes to more than 3. Only by the arithmetic (1 + 2 = 3) can I tell the first phrase is an appositive. Unclear wording.
  - Why the count leaves out the export error and the `List.fss:146` site even though "nothing stops it" is not explained. The skill defines the checker count as "the errors up to each component's first error", which does not obviously leave them out. My guess is that the count stage covers only the `FortressLibrary` component and the apis, and not the export check or `List`. Unclear wording, or a missing condition.
  - "OT": the class is never defined, here or in F-54 (perhaps "other"). Two sites of row 731 fall in BR and one in OT, and the entry does not say why. A missing definition.
  - "fused arm" of `__bigOperator2`: not defined. The skill's `library.md` says no desugaring calls `__bigOperator2`, so I cannot tell what "fused" refers to. A library concept I lack.
  - "that batch's `gate/distance.txt` and `compile-ladder/gate/distance-sites.tsv`": the second path could be inside the batch folder or a fixed top-level location. Which batch is "last landed" has to be found elsewhere. Unclear wording.
  - Rows 731 and 632, P-39 and F-233 are cited by number only. Their content is outside what I may read, but the entry is understandable without them.

## F-54 "The gate classes the distance to the switch-over by root cause"

- **Established:** The gate's `distance.txt` has `#class` rows, one per root-cause class, each with the count of errors in that class. Examples: X1 is an export error, BR is a big operator's body. `explorations/coordinator/tools/distance/classify.py` assigns the classes. The last gate's `distance.txt` reads `#crash none`, meaning the checker did not crash on the component (F-233).
- **Conditions:** It applies to every gate's distance stage. The values are given in F-53.
- **Consequence:** A worker reads the class rows to see which kinds of error remain, and treats `classify.py` as the authority on classes. With no crash, the whole component is checked.
- **Evidence:** `perf-probes/prelude/distance-triage.md` section 2. The entry names no test; the gate's own output stands as evidence.
- **Could not resolve:**
  - "the component's check runs through `Array3`": which component (presumably `FortressLibrary`)? And does "runs through" mean "reaches and passes `Array3`, the former crash point" or "runs to the end, which is `Array3`"? Unclear wording.
  - Only X1 and BR are glossed. OT, used in F-53, is not. Missing definition.
  - "root cause" could mean several errors share one class, or one count per cause. The same ambiguity as in F-53.

## F-55 "Static arguments are inferred with coercion on both paths"

- **Established:** When static arguments are inferred, both paths allow coercion:
  - The compiled checker uses the arguments' static types and the expected type.
  - Walk uses the arguments' run-time types.

  So a call whose arguments have different widths takes the narrowest type that all of them convert into (as P-74 decides). Under walk, the call's result is converted to the type of a typed binding after the call. A static parameter that appears only in the result type is not fixed by that binding (row 510). On the compiled path, a parameter with no written bound is bounded by `Object`, not `Any` (row 412), so a parameter that nothing fixes becomes `Object` there (F-78).
- **Conditions:** It holds for generic calls with coercible arguments. The walk limit covers static parameters named only by the result. The `Object` bound applies on the compiled path only, until the switch-over (`compiler.md` agrees).
- **Consequence:** A mixed-width call can be written without static arguments on either path. Under walk, a declared result type is not enough to fix a static parameter named only in the result. On the compiled path, an unfixed parameter becomes `Object`, which excludes tuples and so on. F-73, F-137 and F-87 give the details.
- **Evidence:** Gated by `compiler_tests/InferCoercionShapes` and `tests/InferCoercionRungK`. Detail in `compile-ladder/rung-inference-checker/REPORT.md` 3.2 and `rung-inference-walk/REPORT.md` 2 and 9.
- **Could not resolve:**
  - "a static argument that only the result names is not fixed": the entry does not say what it becomes under walk instead. It could take its bound (the skill's general rule), stay open, or become `Bottom` (the skill says some cases still get `Bottom` under walk). Unclear wording.
  - "mixed-width": I read it as arguments of different numeric widths, such as `ZZ32` with `ZZ64`. The term is not defined, but the reading is safe.

## F-56 "The compiled checker keeps the expected type at a call written `f(x)`"

- **Established:** At a call written `f(x)`, which the parser represents as a tight juxtaposition, the compiled checker passes the expected type into inference. It does the same at method calls and operators. F-87 lists the other places. The `fnApp = true` branch of `Operators.scala` is reached only by calls that desugarings create, never by a call written `f(x)`.
- **Conditions:** It applies to the compiled checker only.
- **Consequence:** To change how the checker treats a call written `f(x)`, editing the `fnApp = true` branch alone does nothing. The change must be made in the path that tight juxtaposition takes.
- **Evidence:** Gated by `compiler_tests/InferCoercionShapes`. Detail in `reviews/numerics-plan-coordinator/measure-D.md` section 1.
- **Could not resolve:**
  - "tight juxtaposition": the skill explains juxtaposition and says whitespace counts, but it does not define "tight". I take it to mean juxtaposition with no whitespace. A language and parser concept I lack.
  - "keeps the expected type": I read it as "uses the expected type in inference". Plausible, not certain. Unclear wording, minor.
  - `Operators.scala`: no full path is given, and the entry does not say which path handles `f(x)`.

## F-57 "A numeral's type depends on the path and on the library in scope"

- **Established:**
  - Typing: the checker gives an integer numeral the type `IntLiteral` and a decimal one `FloatLiteral`, by its form (F-79). Walk gives an integer numeral `Int`, `Long` or `BigNum`, by its size.
  - Generic code: only `x.zero`, `x.one` and the witness `typecase` yield a value of `T` on both paths. In code generic over `Integral`, `x + 1` fails the checker but runs under walk. No coercion into an arbitrary self-bounded `I extends Integral[\I\]` can be declared.
  - Binding numerals: a numeral bound to `NN32` or `NN64` fails under walk, and `1.5` bound to `RR32` fails on both paths (row 454).
  - Out-of-range numerals: neither path rejects them statically. The compiled run raises `Not in range for ZZ32` at run time (row 325). Walk refuses one at its use, and also when a numeral beyond `ZZ32`'s range is bound to `RR64` (row 443).
- **Conditions:** The behaviour differs by path, and the entry says it also depends on the library in scope. The detail was measured before the numeral switch (F-79).
- **Consequence:** In generic numeric code, get constants of `T` from `x.zero`, `x.one` or a witness `typecase`, not from numerals. Do not bind numerals to `NN32`, `NN64` or `RR32`; `tests-writing.md` agrees for walk. Do not expect a static error for an out-of-range numeral.
- **Evidence:** No test named. Detail in `perf-probes/prelude/distance-triage.md` 2.2 and `reviews/numerics-plan-coordinator/evidence-B.md` 3.1, 4.1 and 6.2, "measured before the numeral switch (F-79)".
- **Could not resolve:**
  - "depends ... on the library in scope": the body never says how the library changes a numeral's type. Unclear wording, or a missing condition.
  - "witness `typecase`": not in the skill. I guess it is a `typecase` over a `() -> T` witness, from F-59. A language and library concept I lack.
  - `Int`, `Long`, `BigNum`: are these Fortress types, or walk's internal value classes standing for `ZZ32`, `ZZ64` and `ZZ`? Unclear.
  - "the numeral switch": not defined. Since the evidence predates it, I cannot tell which claims (for example `x + 1` failing the checker) were re-confirmed afterwards. Unclear wording.
  - "walk refuses it where it is used": at run time at the use site? Probably, but not stated.
  - `Integral[\T\]` and then `I extends Integral[\I\]`: the change of parameter name is confusing. Minor.

## F-58 "When measured, on an earlier library, microGPT's flat program, C4, had 26 errors of its own"

- **Established:** On an earlier library, the compiled checker found 26 errors in C4's own code. None came from the type of a numeral.
  - 15 were arrays declared without sizes, such as `Array[\RR64,ZZ32\]`, where the library expects `Vector`, `Matrix` or `Array3`.
  - 5 were numeral powers such as `10.0^(-5)`, refused as ambiguous because both declarations of `^` needed the integer converted (row 533).
  - 6 were small slips.

  With the array-sizing diff (P-87), 14 remained: the 5 powers, 3 `DOT` calls that failed on the api's unused sizes, 1 bridge that passes arrays sized only at run time, and 5 slips. Since then the unused sizes have been removed (F-35), so by reading the 3 `DOT` errors are gone. Both `^` declarations have also changed, and whether the powers still tie has not been measured. Every count is a lower bound, because the checker stops a block at its first failing statement (row 474).
- **Conditions:** These are old measurements on an older library, and they count only C4's own errors.
- **Consequence:** The current count of C4's errors is unknown. A rough lower bound is 11, assuming the `DOT` errors are gone by reading. The powers may or may not still fail. A worker must measure again rather than cite 26 or 14.
- **Evidence:** No test. Detail in `reviews/array-design-ways.md` section 2 and `compile-ladder/rung-integer-power/REPORT.md` section 7. The `DOT` clearing is "by reading", not measured.
- **Could not resolve:**
  - "the diff that sizes the model's arrays (P-87)": is that diff landed in C4 now, or was it only applied for the measurement? "With the diff" suggests it was hypothetical. Unclear wording.
  - "1 bridge that passes arrays sized only at run time": "bridge" is not defined (a function in C4? an adapter to the library?). Unclear wording.
  - "the api's unused sizes": probably size static parameters declared in the api but not used, so they cannot be inferred. It is resolved by F-35 in any case. Minor.
  - "of its own": I read it as errors located in C4's source, not in the library. Probably right.

## F-59 "`SUM` and `PROD` take their identity from the static argument"

- **Established:** `SUM` and `PROD` get their zero or one from the static type argument, which implements P-78 with a `() -> T` witness `typecase`. The compiled checker needs that argument written whenever nothing at the call fixes the element type. A declared type that receives the result does not count as fixing it. The checker refuses an unfixed call for every generic big operator whose bound names its own parameter: `SUM`, `PROD`, `BIG MAX` and `BIG MIN`. Such an unfixed parameter has no instance at its bound (row 731). Walk leaves such an F-bounded `T` open, so the same call runs there (F-143). A big operator whose bound does not name its parameter takes the reduction's expected type instead (F-221). C4 and the team's tests write the static argument. `SUM e` and `DOT` need none.
- **Conditions:** The rule covers the generic big operators whose bound names their parameter. The refusal is on the compiled checker; walk accepts such calls. Plain-bounded big operators are exempt.
- **Consequence:** Write the static argument, for example `SUM[\ZZ32\][...]`, on `SUM`, `PROD`, `BIG MAX` and `BIG MIN` when the generators and the body do not fix the element type, even when the result goes to a typed variable. `library.md` agrees for `SUM` and `PROD`.
- **Evidence:** Gated by `compiler_tests/WitnessIdentityRungG` and `InferBigOperatorUnwritten`. Detail in `reviews/sum-replacement-judgement.md` section 5, measured before P-48. Row 731 gives today's mechanism.
- **Could not resolve:**
  - "It builds P-78, with a `() -> T` witness `typecase`": "It" seems to mean the library's implementation of `SUM` and `PROD`. "Builds" means "implements", following the POSITIONS "Built." vocabulary. I do not know what the witness is or how the `typecase` uses it. A language and library concept I lack.
  - "`SUM e`": the form is not explained (`SUM` over a single collection expression, without generators?). A language concept I lack.
  - "Walk leaves an F-bounded `T` open, so such a call runs there": the skill's `library.md` says walk runs such a call at the value's declared type, or else at the join of its elements' run-time types. I cannot tell whether "open" contradicts that or describes an earlier step. Unclear wording.
  - "measured before P-48": I cannot tell which parts of the detail are stale. Only row 731 is said to be current.

## F-60 "The coercions between number types carry a sum's zero and a product's one into every wider type by themselves"

- **Established:** Coercing a narrower number type into a wider one preserves arithmetic on both paths. So the narrow type's zero and one coerce to the wide type's zero and one, and a sum or product identity needs no separate declaration per wider type. A maximum's identity is its type's least element, and coercion does not preserve that. `ZZ` and `QQ` have no least element. The library's generic `BIG MAX` and `BIG MIN` have no identity, so on an empty input they raise `EmptyReduction`. Each reduction makes its identity at its own type (P-78).
- **Conditions:** The coercion part holds on both paths. The empty `BIG MAX` result was measured only under walk, and the entry does not say which path `tests/simpleSum` runs on.
- **Consequence:** Do not rely on coercion to produce a max or min identity. An empty `BIG MAX` or `BIG MIN` raises `EmptyReduction`, so guard the empty case or expect the exception.
- **Evidence:** `tests/simpleSum` asserts the `BIG MIN` case. The `BIG MAX` case was observed under walk (`reviews/flattening-questions-ways.md`, "Question 1", section 2). Detail in `reviews/max-min-identities-judgement.md` sections 1 and 2.
- **Could not resolve:**
  - "carry ... by themselves": I read it as "with no extra declarations". Probable.
  - "a maximum's identity is its type's least element": for `BIG MIN` the identity would be the greatest element. The entry leaves that implicit. Minor.
  - "A reduction makes its identity at its own type (P-78)": this could describe present behaviour or the design target. Unclear wording, minor.

## F-61 "Making the interpreter's library the compiler's library takes three steps"

- **Established:** The switch-over needs three steps:
  1. The checker checks `nat` and `int` static parameters (F-67). Done.
  2. The number and comparison tower's errors in the library api are cleared (F-131). Done.
  3. The native bindings move to the compiled path's helpers (F-32). This is PLAN phase 4, "The natives", and is not done.

  F-53 has what the checker still reports. No minimal `Array` or `Vector` shim can stand in for the compiler. `FlatArrays` relies on the full array protocol, on `NativeArray.fss`, and on about 1,000 lines of the library.
- **Conditions:** It applies to the switch-over plan.
- **Consequence:** The remaining work is the natives (phase 4) and the leftover checker errors (F-53). Do not try to build a small array or vector shim as a shortcut to compiling with the interpreter's library.
- **Evidence:** `perf-probes/prelude/REPORT.md` sections 5 (the steps) and 4 (the shim). No test.
- **Could not resolve:**
  - "three steps" against F-53's remaining distance of 5: the skill says the distance must reach zero before the switch-over, but clearing it is not one of the three steps. I cannot tell whether it is a fourth step, part of step 2, or just outside this list. Unclear wording.
  - "number and comparison tower": the skill says number types are "siblings, not a tower". Here "tower" presumably means the algebraic trait hierarchy, but the word conflicts with the skill's phrasing. Unclear wording.
  - "shim" and "serve the compiler": a stand-in `Array` or `Vector` for the compiled path before the switch-over? The purpose is implied, not stated. "`FlatArrays`" is not defined (a component? the flat array design?). Unclear wording, and a library term I lack.

## F-63 "The one library's api declares `String`'s `split` pair once, abstract"

- **Established:** The interpreter's library api, which both paths will use, does four things:
  - declares `String`'s pair of `split` methods once, as abstract;
  - does not redeclare a covariant `zip` in `List`;
  - has `Condition.map` return `Condition[\G\]`;
  - closes `QQ` with `comprises { ... }`.

  When measured, the checker refused the api if the `split` pair or `zip` were declared differently. The `Condition.map` error appeared only under a checker change that did not land. Otherwise it is inferred from the export check's comparison of return types, and no test covers that edit. `QQ`'s clause names no type, because its only value type, `Ratio`, is private to the component, and an api may omit a private type only with `...` (`Library/FortressLibrary.fsi:398`). Nothing extends `QQ`, so F-64's refusal does not catch it.
- **Conditions:** It applies to `Library/FortressLibrary.fsi` as it stands. The `split` and `zip` refusals are measured. The `Condition.map` claim is inferred and has no test.
- **Consequence:** When editing the api, keep these four forms. Changing `split` or `zip` makes the checker refuse the api. A change to `Condition.map` is not caught by any test.
- **Evidence:** Measurements of the `split` and `zip` variants. The export check's comparison for `Condition.map`. The source line `FortressLibrary.fsi:398`. Detail in `compile-ladder/rung-library-defects/REPORT.md`, "Summary" and "Defects and their homes".
- **Could not resolve:**
  - "`split` pair": which two declarations make the pair (two overloads? a dotted and a functional form?). Unclear wording.
  - "covariant `zip`": generics are invariant, so I take it to mean a redeclaration in `List` with a narrower return type. Probable, not certain.
  - "`Condition`" and "`G`": the trait and the parameter `G` are not introduced. A library concept I lack.
  - "F-64's refusal misses it": I cannot tell what F-64 refuses, or what "misses" means for `QQ`. It might mean `QQ` escapes a check that would otherwise flag a `comprises { ... }` clause, or that the refusal does not bite because nothing extends `QQ`. A missing definition: it depends on F-64.
  - "The one library's api": the skill defines "one library", but the entry does not name the api file in its title (`FortressLibrary.fsi` appears later). Minor.

# Cold read: facts f3 (F-40 to F-51, F-?1 to F-?3)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the skill's `references/` (compiler.md, records.md, tests-writing.md, exploring.md, interpreter.md, library.md, gate.md looked up for terms). Nothing else read.

Terms found in the skill and used below: walk, compiled path, one library, prelude, checker count (counts errors up to each component's first error), distance (all the checker's errors), rung, ledger row ("row N"), `XXX` test (expected failure; a compile-time refusal is written as an `XXX` compile test), template class and `RTTIsize.of` descriptor, dispatch method from `OverloadSet`, the transaction check `BaseTask.inATransaction()` before each read and write of a mutable cell, the exclusion rule, the Return Type Rule (the more specific overload's return type must fit the other's), the flat number tower, `opr` static parameters, the code-generator wall.

---

## F-40 "Measured on 2026-09-24 for two size designs that were not built ..."

- **Established:** Two candidate designs for carrying a size (a `nat` static argument) at run time, called A and B, were measured on a private build and neither was landed. Under them, a size added a few kilobytes at load time and no cost inside a hot loop, and the only code that read a size from a value was the overload dispatcher. A loop bounded by the size constant was no faster than one bounded by the array's length read at run time, because each element costs about 31 ns, spent in boxing and in the transaction check on every read and write of a local mutable variable. Dispatching a call on a size cost about 4 to 20 ns more than a call the checker resolved statically. The design actually built (one descriptor per size value, from `RTTIsize.of`, F-129) has not had its load size or loop speed measured; its rung measured only the dispatcher's table lookup, 0.9 to 2.6 ns inside a dispatched call of about 23 ns. By reading the code: no optimization uses a size, and a dispatched call tests the size once for each overload arm it tries.
- **Conditions:** The load and loop numbers hold for designs A and B on the probes' private build only, not for the built design. The 0.9 to 2.6 ns figure is the built design's, and covers only the lookup.
- **Consequence:** A worker cannot cite F-40 as the built design's load or loop cost. A worker should not expect a speed-up from bounding loops by a size; the per-element cost to attack is boxing plus the transaction check. Size dispatch is a small cost per overload arm tried.
- **Evidence:** `perf-probes/nat/size-cost.md`, "The answers"; `compile-ladder/rung-size-runtime/REPORT.md` section 12; code reading for the last sentence.
- **Could not resolve:**
  - "designs A and B": never said what each design is, or how they differ from each other and from the built one. Unclear wording (a reader cannot tell what was measured).
  - "a few kilobytes at load": per size value, per class, per program? And bytes of what (heap, class bytes)? Unclear wording.
  - "A call dispatched on a size cost about 4 to 20 ns more ...": the sentence follows "Under both designs, ..." and precedes the built design's figure; it reads either as A/B only or as general. Unclear wording.
  - "its table lookup": what table (descriptors by size? arms by size?) is not said. Unclear wording.
  - "one descriptor per number": per size value (one object for 3, one for 4) or per number type? I read it as per size value. Unclear wording.
  - "no optimization uses a size": whose optimization (the code generator's, the checker's, HotSpot's)? And whether "by reading the code" means the landed tree or the private build. Unclear wording.

## F-41 "The compiled dispatcher tests a size that two parameters share, in `DOT`'s shape, ..."

- **Established:** When an overload's two parameters share one size parameter, as `dot[\nat n\](a: Vec[\RR64,n\], b: Vec[\RR64,n\])` does (the shape of the library's `DOT`), the compiled dispatch method checks that the two arguments' sizes are equal before it picks that arm. Vectors of sizes 3 and 4 fall through to the catch-all `dot(a: Any, b: Any)`, in either argument order, whether the call was resolved statically or dispatched at run time; walk gives the same result. A call with statically mismatched sizes is not a compile error: the checker types it by the catch-all. The size check is the team's existing check in `OverloadSet.java` for a type variable that occurs in two invariant positions. The library's own `DOT` was not compiled and run; by reading, the matrix product's shared inner size gets the same check.
- **Conditions:** Shown with a user `Vec` object in `compiler_tests/NatRtDot`, with a catch-all present. For the library's `DOT`, inferred by reading, not run.
- **Consequence:** A worker can rely on the compiled dispatcher to reject mismatched shared sizes at run time; a static size mismatch is not caught by the checker when a catch-all exists. Without a catch-all, the behaviour is not stated.
- **Evidence:** `compiler_tests/NatRtDot` (named, but not said to be a gated test); `perf-probes/nat/size-rung-probes.md` section 3; `OverloadSet.java`.
- **Could not resolve:**
  - "for equality in both directions": I read it as equality tested as two subtype checks (a's against b's and b's against a's), which fits "two invariant positions". It could also mean testing each argument against the other in both orders of the arguments. Unclear wording.
  - "The test is the team's own check": "test" could be the dispatcher's run-time test or the harness test `NatRtDot`. From the citation of `OverloadSet.java` I read it as the dispatcher's test. Unclear wording.

## F-42 "The compiled checker skips a unit's overloading and return-type checks ..."

- **Established:** In the compiled checker, `StaticChecker` stops before running `OverloadingChecker` on a unit if an earlier stage reported errors for that unit, so its overloading and Return Type Rule errors are not reported. Fixing an early error can therefore make the checker count go up, since the count sees only errors before each unit's early return (F-53). The distance runs every stage of every unit regardless, so it does see these errors.
- **Conditions:** Holds per unit; only when an earlier stage of that same unit has errors. The distance is not affected.
- **Consequence:** A rise in the checker count after a fix is not necessarily a regression; compare against the distance. A worker should use the distance to judge whether overloading errors exist.
- **Evidence:** `StaticChecker.java:268-279`; `tools/distance/run.sh` header; `perf-probes/nat/zero.md`, opening section.
- **Could not resolve:**
  - "unit": not a term of the skill; I read it as one component or api, the thing the count stage counts errors per. Unclear wording (minor).

## F-43 "The overloading checker's memo hides errors depending on the build order, ..."

- **Established:** The overloading checker keeps a memo (a cache of earlier answers), on by default, and it can hide overloading errors depending on the order in which things are checked. So a plain `fortress compile` may miss errors. The switch `fortress.analyzer.overload.cache=false` turns the memo off, and the gate's count stage and distance stage both set it.
- **Conditions:** Holds whenever the memo is on (the default). The gate's counts are not affected.
- **Consequence:** For an honest error count by hand, a worker must turn the memo off; counts from the gate can be trusted on this point.
- **Evidence:** `OverloadingChecker.scala:79`; `perf-probes/nat/triage.md` section 1.
- **Could not resolve:**
  - How the switch is passed (a Java system property through `JAVA_FLAGS` with `-D`?) is not said. Unclear wording.
  - "the build order": the order in which components are compiled, or the order in which the checker visits declarations? Unclear wording.
  - "every count runs with the memo off" (title) against "an ordinary `fortress compile` can miss these errors" (body): "count" means the gate's two counting stages, not every checker run. Readable, but the title alone overstates it.

## F-44 "The compiled checker enforces the multiple instantiation exclusion rule and relies on it, ..."

- **Established:** The rule: no type may extend two different instantiations of one generic trait. The compiled checker enforces it, and its Return Type Rule depends on it: relaxing only this rule lets a program pass the checker and then die with `IncompatibleClassChangeError`. Walk does not enforce the rule (row 416). P-43 keeps the rule. The one library obeys it, by three changes: `TotalComparison` extends `Comparison` and `StandardMinMax[\TotalComparison\]` instead of `StandardTotalOrder[\TotalComparison\]`; `AnyMaybe` extends only `AnyUniqueItem`, dropping `Equality[\AnyMaybe\]`; and `andCondCombine` picks `andRelCond` by a `typecase` instead of through a second `ANDCOND` overload. As a result, under walk, an `ANDCOND` of two relational predicates in a user program does not give a relational predicate (row 458). The distance has no exclusion-rule errors (F-53).
- **Conditions:** The checker enforces the rule; walk does not. F-48 limits which static arguments the rule compares.
- **Consequence:** A worker must not write a type that extends two instantiations of one generic trait, in the library or a test; the library's three workarounds are the pattern to follow. A worker must not relax the rule alone.
- **Evidence:** `OverloadingOracle.scala:81-105`; probe `ProbeMIEPick`; `reviews/multiple-instantiation-exclusion.md` sections 1 and 2; `Library/FortressLibrary.fsi:121-123`, `:959`; `Library/FortressLibrary.fss:4861-4867`.
- **Could not resolve:**
  - `ANDCOND`, `andRelCond`, `andCondCombine`, "relational predicate": library operators and a library notion not in the skill. Language concept I lack (library).
  - "a program's own `ANDCOND`": either a user program's call of the library's `ANDCOND`, or a user program's own declaration of `ANDCOND`. Unclear wording.
  - Why the consequence is stated "under walk" only (because the compiled prelude lacks these declarations?) is not said. Unclear wording.
  - Why the old supertypes broke the rule (that `Comparison` already extends another `StandardTotalOrder` instantiation, and `AnyUniqueItem` another `Equality`) is left to inference. Unclear wording (minor).

## F-45 "Without the exclusion rule, every dispatcher would have to call its generic arms at its own static arguments, ..."

- **Established:** If the exclusion rule were dropped, a value could belong to two instantiations of one generic, and every dispatch method would have to call its generic overloads at static arguments supplied by the call site rather than worked out from the value; that call form is built only for template dispatchers (F-136). No published work solves run-time dispatch for a value in two instantiations of one generic. The team's 2012 patents allow a narrower case, the forest rule: a self-typed generic (one that comprises exactly its own parameter) may be extended at several instantiations if they lie along a chain of subtypes. The forest rule alone leaves the specialisation hole: an overload specialised to one instantiation, more specific than the generic one, can run for a value at a lower level of the chain and return a type that a caller typed at that lower level does not expect; compiled, this dies with `IncompatibleClassChangeError`. Route C adds a return-type rule that closes this hole (F-46).
- **Conditions:** A statement about what dropping the rule would require; the forest rule applies only to self-typed generics and chains of subtypes.
- **Consequence:** The exclusion rule cannot be dropped without the call-site dispatch in every dispatcher and without a fix for the specialisation hole; there is no published design to copy.
- **Evidence:** `reviews/mie-probes/patents-forest-rule.md` sections 1 and 3; `reviews/mie-probes/scope-call-site-dispatch.md` section 3; `reviews/mie-probes/literature.md`, "What the field settled and what it did not".
- **Could not resolve:**
  - "call its generic arms at its own static arguments": "its own" is the dispatcher's, which I read as the static arguments known at the call site. What a dispatcher does today instead (infer them from the arguments' run-time types?) is not said. Unclear wording.
  - "template dispatchers": not in the skill; I guess a dispatch method of a generic declaration, compiled as a template class. Language concept I lack (compiled path).
  - "a lower level of the chain": lower may mean more specific (a subtype) or less specific; the hole's direction depends on it. Unclear wording.
  - "Route C": named as if routes A and B were known; they are not described. Unclear wording.
  - "forest rule": why "forest" is not explained; the entry's gloss is enough to use it. Minor.

## F-46 "Route C, the patents' forest rule with a return-type rule over every level of a chain, ..."

- **Established:** Route C, the forest rule plus a return-type rule checked at every level of a chain, does close the specialisation hole. An experimental shadow checker for it, built on 2026-09-24, refuses 25 overload pairs at 21 declarations of a nested (non-flat) number tower. Finishing that tower needs seven more declarations and treating `Integral[\ZZ32\]` as the same type as `ZZ32`. The patents' `comprises T` on self-typed traits would justify that, but `comprises T` overflows the checker's stack; a dedicated hierarchy check could enforce it instead, and none exists. Moving from P-43 to route C would also need: the tower nested again; call-site dispatch in every dispatcher (F-136); forwarding methods in the code generator for each middle level of a chain (else `AbstractMethodError`); walk accepting the specialised pairs without overflowing on `comprises T`; and a way past the checker's overflow.
- **Conditions:** Measured on a shadow checker, not the tree's checker; the tower is incomplete.
- **Consequence:** Route C is not a checker-only change. A worker should not propose it as a small change; P-43 stands, and the list above is the cost of leaving it.
- **Evidence:** `reviews/mie-probes/route-c-experiment.md` sections 2 to 5.
- **Could not resolve:**
  - "a return to it": suggests route C was once taken and abandoned; it could also just mean "adopting it later". Unclear wording.
  - "refuses 25 pairs at 21 of the nested number tower's declarations": whether this shows the rule catching real holes (desired) or the tower failing route C (work to do) is not said. Unclear wording.
  - "shadow checker": I read it as a separate checker run beside the real one, not landed. Not in the skill; unclear wording (minor).
  - "the nested number tower": the skill says the numbers are flat siblings; the nested tower is presumably the older or specified tower where narrower types are subtypes. Language concept only partly in the skill.
  - "a hierarchy check of its own could enforce it" and "a way past the checker's overflow": whether these are one item or two is unclear. Unclear wording (minor).

## F-47 "The exclusion rule refuses some of the specification's own examples; ..."

- **Established:** Ten examples in the specification (E1 to E10) are refused by the exclusion rule, among them three `where`-clause examples, the Working Draft's `Nothing`, the nested number tower and `RationalQuantity`. The `where`-clause examples fail earlier on both paths, in name resolution ("T is undefined"), before the rule is reached. As replacements, a parametric object with a factory, or a widening function, runs on both paths when written as a user program with its own types; the library's `Nothing[\String\]` does not yet run on the compiled prelude (row 331, F-167). A marker object with a coercion in the generic trait also runs compiled, and walk applies that coercion (row 389). The 2012 `covariant` keyword passes the compiled checker but dies at run time (row 404). The compiled checker refuses a generic coercion, calling it a cyclic hierarchy. By inference from the forest rule, route C would not rescue the `where`-clause examples, `Nothing`, or the internal appendix's "Disjunctive Constraints"; only the tower and the root `Object`'s algebra would change under it.
- **Conditions:** The replacements were measured as user programs, not in the library. The route C claim is inferred, not run.
- **Consequence:** Where a specification example breaks the rule, a worker should use one of the measured replacements (factory, widening function, marker object with coercion), not `covariant` and not a generic coercion.
- **Evidence:** `reviews/spec-refused-examples.md`, "What was found"; rows 331, 389, 404; F-167.
- **Could not resolve:**
  - "a parametric object with a factory", "a widening function", "a marker object": their shapes are not given, so a worker cannot write them from the entry. Unclear wording.
  - "a generic coercion" (refused as a cyclic hierarchy) against "a coercion in the generic trait" (runs compiled): these read as the same thing and contradict. Perhaps "generic coercion" means a `coerce` with its own static parameters. Unclear wording.
  - "the root `Object`'s algebra would read differently": "read differently" does not say whether it would be accepted. Unclear wording.
  - "Disjunctive Constraints" is not in the listed E1 to E10 members; whether it is one of them is not said. Unclear wording (minor).
  - "the Working Draft's `Nothing`": which `Nothing` (the `Maybe` case, or a bottom type?) is not said; the skill names `Bottom` as the empty type. Language concept I lack.

## F-48 "The compiled checker's exclusion rule compares type arguments, and sizes only when both are literals."

- **Established:** The checker's exclusion rule tells two instantiations apart by their type arguments, and by size arguments only when both are literal numbers. Two boolean arguments, or a static parameter beside any other argument, are treated as not excluding (rows 406, 414): so `object F extends { Flag[\true\], Flag[\false\] }` passes the checker and fails in code generation. Two literal sizes are excluded: `object V extends { Vec[\3\], Vec[\4\] }` is refused, "Types Vec[\3\] and Vec[\4\] exclude each other" (row 402, fixed). The gap is the code's "Todo: Handle bool args".
- **Conditions:** Booleans and non-literal static arguments are not compared.
- **Consequence:** A worker cannot rely on the checker to catch a boolean or symbolic-size double instantiation; such a program fails later, in code generation.
- **Evidence:** `compiler_tests/XXXNatExcludeChecker` (gate); `TypeAnalyzer.scala:539-544`; `reviews/spec-refused-examples-judgement.md` section 6.
- **Could not resolve:**
  - Which claim the `XXX` test gates: I read it as the literal-size refusal (an `XXX` compile test is the skill's form of an expected refusal); the boolean gap (rows 406, 414) then has no test named. Unclear wording (minor).

## F-49 "Under walk, a value form and a function form of one name are chosen by the argument's run-time type, ..."

- **Established:** If one name has an overload taking an element value and another taking a function, walk picks by the argument's run-time type; when the element type is `Any`, a function meant as an element value is a function too, so walk sends it to the function form. The compiled checker refuses such a pair when the bound is `Any`: a function whose one parameter has a type-parameter type bounded by `Any` cannot be overloaded. The one library avoids the pair: `fill` takes a value and `tabulate` a function (F-158).
- **Conditions:** The surprise arises only with element type `Any` (or a bound that admits functions). Walk runs it; the compiled checker refuses it.
- **Consequence:** A worker must not overload a value form and a function form of one name over a type bounded by `Any`; give them different names, as `fill` and `tabulate` do.
- **Evidence:** The probe's tabulation result `c[1] = 11`; probe `FillBoxAny`; `reviews/fill-overloads-ways.md` section 2.
- **Could not resolve:**
  - "The probe tabulated a function argument: `c[1] = 11`": what `c` is and why 11 shows the function form ran is not explained. Unclear wording.
  - "a functional": I read it as a function or functional method. Unclear wording (minor).

## F-50 "The compiled checker lets overloads differ in static parameters, ..."

- **Established:** The compiled checker allows overloads with different static parameters, matching the specification's 2011 model (this builds P-45). It refuses a pair as ambiguous only when it cannot prove the pair unambiguous. It cannot prove it for a pair over open traits that no declaration makes exclusive, nor for a pair whose domains exclude each other only through the exclusion rule plus a bound (the `CAP` shape). Its Return Type Rule and its positional rule also refuse some pairs the 2011 paper accepts (F-75). Other gaps tracked elsewhere: symbolic operators are never checked (P-155, row 584); two generic overloads on a bare type variable fail compiled (F-174, row 537); walk runs an overload whose size the call leaves unfixed, where the checker drops that overload or refuses the call (F-69, row 400).
- **Conditions:** Refusals beyond the 2011 model come from the unprovable cases and the two rules named.
- **Consequence:** A refusal "ambiguous" may mean "not provable", not "truly ambiguous"; a worker may need an `excludes` or `comprises` declaration to let the checker prove it.
- **Evidence:** `reviews/overload-static-params-ways.md` sections 2 and 3.
- **Could not resolve:**
  - "the `CAP` shape": not defined; `CAP` is perhaps the intersection operator. Language concept I lack (library).
  - "its positional rule": not in the skill. Language concept I lack (checker).
  - "open traits": I read it as traits without a `comprises` clause. Unclear wording (minor).
  - "never checks symbolic operators": never checks their overloading for ambiguity, or never type-checks them? Unclear wording.
  - "the specification's 2011 model" and "the 2011 paper": the same source or two? Unclear wording (minor).

## F-51 "A generic call converts a narrower argument for a parameter typed by a type variable that another argument fixes, ..."

- **Established:** In a generic call, when one argument fixes a type variable, an argument of a narrower number type for a parameter typed by that variable is converted to it. For `scale[\T\](b: Box[\T\], x: T)` with `b: Box[\RR64\]`, `scale(b, 3)` fixes `T = RR64` and converts `3`. This holds on both paths (row 388, fixed). So under walk the library's array-scalar `+`, `-`, `MIN`, `MAX`, and matrix-scalar juxtaposition and `DOT`, accept a `ZZ32` scalar with `RR64` elements. F-73 and F-137 give each path's rule.
- **Conditions:** The variable must be fixed by another argument; the library consequence is stated under walk (the one library runs only there before the switch-over).
- **Consequence:** A worker may pass integer literals as scalars to `RR64` array and matrix operations without writing the conversion.
- **Evidence:** `tests/InferCoercionRungK` and `compiler_tests/InferCoercionShapes` (gate); `reviews/numeric-hierarchy-integration-review/row388-container-probe.md`.
- **Could not resolve:** nothing.

## F-?1 "The compiled checker refuses a local function's parameter that has no type, ..."

- **Established:** The compiled checker refuses an untyped parameter of a local function with "Missing parameter type for i", as it already did for a top-level function. The specification does not describe inferring a parameter's type, so the type must be written. Before the fix, such a local function crashed the checker (rows 620, 621, fixed). Row 405 records the top-level case on both paths.
- **Conditions:** Local and top-level functions, compiled checker.
- **Consequence:** A worker must write every parameter's type, also in local functions.
- **Evidence:** `compiler_tests/XXXLocalFunctionUntypedParam` and `XXXLocalFunctionUntypedParamInLoop` (gate); `STypeEnv.scala:75` (local) and `:200` (top level); `Specification/appendices/changes.tex`, "The type of a parameter that a declaration leaves out".
- **Could not resolve:**
  - "Row 405 holds the top-level case on both paths": whether walk also refuses the local case is not said. Unclear wording (minor).
  - "there" in "inference of a parameter's type there": a local function only, or any declaration? The cited heading suggests any. Unclear wording (minor).

## F-?2 "The compiled checker refuses a subtrait that inherits an abstract method named by an operator static argument, ..."

- **Established:** When a generic trait declares an abstract method whose name is an `opr` static parameter, and a subtrait extends one instantiation of it, the compiled checker wrongly reports the method as unimplemented, because its abstract-method check matches inherited and concrete methods by name before substituting the operator argument. The specification and walk substitute the name first, so they accept it.
- **Conditions:** Even with a single instantiation (not an exclusion-rule case). The code cause is from reading.
- **Consequence:** A checker defect: such a program will not compile until the check substitutes first. No row or test exists yet, so a worker who meets it must record it.
- **Evidence:** `AbstractMethodChecker.scala:100-101` (by reading); probes `OprSingle` and `OprInstancesOplus`; `reviews/spec-refused-examples-judgement.md` section 4.
- **Could not resolve:** nothing material; what a worker should do about the missing row and test is left implied.

## F-?3 "The code generator throws on `Any` as a static argument in an `extends` clause."

- **Established:** When a type extends a generic instantiated at `Any` (for example `extends T[\Any\]`), the code generator stops with "Only handling some static args of generic types in extends clause".
- **Conditions:** Code generation only; the checker's view is not stated.
- **Consequence:** A code-generator wall; a compiled program or test must avoid `Any` as a static argument in `extends` for now. No row or test exists yet.
- **Evidence:** `CodeGen.java:5805`; probe `AltEveryContra`; `reviews/spec-refused-examples-judgement.md` sections 3.1 and 9.
- **Could not resolve:** nothing.

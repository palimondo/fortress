# Cold read 2 of facts/f3/clean.txt

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and for terms `references/compiler.md`, `library.md`, `records.md`, `tests-writing.md`, `interpreter.md`, `specification.md` (grep only). Nothing else.

Terms taken from the skill throughout: "row N" is a gap-ledger row; "fixed" is a closed row of status `FIXED`; walk and the compiled path; the one library (the interpreter's library); the checker count and the distance; rung; an `XXX` test is a gated expected failure (a compile test with `compile_err_contains` is the way to gate a refusal).

---

## F-40 "Measured on 2026-09-24 for two size designs that were not built"

- **Established:** Two ways of carrying a size (a `nat` static argument) at run time were measured on a private build and neither was built: A, a descriptor class stamped per size per generic; B, one class per number handed to the generic's descriptor factory. Under either, the classes for a size cost a few KB, small against the 8.6 MB every run loads. A loop bounded by the size constant ran no faster than one bounded by the storage length read at run time; the loop's ~31 ns per element goes to a transaction check on every local read/write, boxing, and a method call per element read. A call dispatched on a size cost about 4 to 20 ns more than one the checker resolved statically. The design that was built (one descriptor object per size from `RTTIsize.of`, F-129) differs from both; for it, only the dispatcher's lookup of a literal size's descriptor was measured: 0.9 ns on the landed build (six runs from -2.2 to 7.0 ns) and 2.6 ns on an earlier build, within a dispatched call of about 23 ns. By reading, no optimization uses a size, and a dispatched call tests the size once per overload arm it tries, as the built dispatcher does.
- **Conditions:** The load and loop numbers are for designs A and B on the probes' private build only. The built design's load size and loop cost are unmeasured. The code reading is of 2026-09-24; F-20 carries the "no optimization uses a size" claim for today's tree.
- **Consequence:** A worker cannot cite these load or loop numbers as the built design's. Speeding up a size-bounded loop means removing the transaction check, boxing and per-element call, not exploiting the size. The run-time cost of a size is in dispatch, per arm tried.
- **Evidence:** `perf-probes/nat/size-cost.md` section 1 and "The answers"; `compile-ladder/rung-size-runtime/REPORT.md` section 12; `OverloadSet.java`, `SizeLiteralStructure`. No test (a measurement).
- **Could not resolve:**
  - "a size cost ... nothing in a hot loop" (title) against the body's "a loop bounded by the size constant was not measurably faster": the title reads as "no slower", the body says "no faster". Two readings; unclear wording.
  - "only the overload dispatcher read a size off a value": I take it as "no other generated code reads a value's size at run time", but it could also mean only the dispatcher was observed doing so in the probes. Unclear wording.
  - "0.9 ns ... its six runs from -2.2 to 7.0 ns": the negative bound says this is a difference, but against what baseline (the same call with no size test? a call with a non-literal size?) is not said. Unclear wording.
  - "the built design's rung", "the landed build" against "an earlier build": which rung and which builds; I took rung-size-runtime, but the entry does not tie them. Unclear wording.
  - "literal leaf" (the built dispatcher's "literal leaf"): not in the skill; I read it as the dispatcher's test node for a literal size (`SizeLiteralStructure`). Language/implementation concept I lack.

## F-41 "The compiled dispatcher tests a size that two parameters share"

- **Established:** When two parameters of a generic arm share one size, as in `dot[\nat n\](a: Vec[\RR64,n\], b: Vec[\RR64,n\])`, the compiled dispatcher checks the two arguments' sizes for equality before picking that arm. With sizes 3 and 4, the call goes to the catch-all `dot(a: Any, b: Any)`, both when the arguments are typed statically (one argument order tested) and when dispatched at run time (both orders). Walk gave the same in a probe. A statically mismatched call compiles cleanly: the checker types it by the catch-all. The equality test is the team's existing check for a type variable that appears in two invariant positions.
- **Conditions:** Shown on a user object `Vec` in the test. The library's `DOT` was not run compiled; that its matrix product's shared inner size takes the same check is by reading. Walk's agreement is from a probe, not the gated test.
- **Consequence:** A worker can rely on mismatched shared sizes being caught at dispatch (falling through to a less specific arm), not at compile time; a mismatch is not a static error.
- **Evidence:** `compiler_tests/NatRtDot` (gates four outputs); `OverloadSet.java`; `perf-probes/nat/size-rung-probes.md` section 3.
- **Could not resolve:**
  - "for equality in both directions": either the arguments in both orders (3,4 and 4,3) or a two-way subtype test that amounts to equality. Unclear wording.
  - "the four outputs": the entry describes three mismatch calls (one static, two dynamic); whether the fourth is a matching-size call that reaches the generic arm is not said. Unclear wording.
  - "in the one order that the test makes": I read it as "the test makes the static call in one order only", not that only one order is possible. Mildly unclear.

## F-42 "The compiled checker skips a compilation unit's ... overloading and return-type checks"

- **Established:** For each api or component, `StaticChecker` stops before `OverloadingChecker` if an earlier stage of that unit reported an error, so that unit's overloading and return-type errors are not reported. Hence clearing an early error can raise the checker count. The distance runs every stage of every unit regardless, so it sees these errors.
- **Conditions:** Per unit; holds for an ordinary compile and for the count stage. The distance is not affected.
- **Consequence:** A rise in the checker count after a fix is not necessarily a regression; compare the distance. Use the distance for the true number of errors.
- **Evidence:** `StaticChecker.java:268-279`; `tools/distance/run.sh` header; F-53; `perf-probes/nat/zero.md`, opening section. No test named.
- **Could not resolve:**
  - The checker count "sees only the errors before each unit's early return", while the skill defines it as counting "the errors up to each component's first error". These read as two different cut-offs (all errors of the early stages, or errors up to the first). Unclear wording, across the entry and the skill.
  - "an earlier stage": which stages precede `OverloadingChecker` is not named. Minor.

## F-43 "The overloading checker's memo hides some errors"

- **Established:** The overloading checker caches a "valid" verdict per pair of declarations. A pair that several traits inherit should be checked at each trait's instantiation, but the checks run in hash-set order and the first "valid" is reused for the later traits, hiding errors that only a later trait has. Which errors are hidden varies with the build of the checker. The memo is on by default, so a plain `fortress compile` can miss them; `-Dfortress.analyzer.overload.cache=false` turns it off, and the gate's count and distance stages set it.
- **Conditions:** Only pairs inherited by several traits. Default `fortress compile` is affected; the gate's count and distance are not.
- **Consequence:** A worker who wants the full set of overloading errors must set the property; a difference in errors between two checker builds can come from the memo, not from the change.
- **Evidence:** `perf-probes/nat/triage.md` section 1; `OverloadingChecker.scala:79`. No test or command output named.
- **Could not resolve:**
  - "is checked once per trait ... so a pair valid for one trait is taken as valid for the next": "checked once per trait" first reads as "it is checked for every trait", which contradicts the reuse. I read it as "is due to be checked". Unclear wording.

## F-44 "The compiled checker enforces the multiple instantiation exclusion rule"

- **Established:** The compiled checker refuses a type that extends two different instantiations of one generic trait, and its Return Type Rule depends on that: relaxing the rule alone lets a program pass and die with `IncompatibleClassChangeError`. Walk does not apply the rule: it accepts such a type and its overloading check does not treat the two instantiations as excluding. The curator keeps the rule (P-43). The one library satisfies it through the flat number tower and three changes in `952892a00`: `TotalComparison` now extends `Comparison` and `StandardMinMax[\TotalComparison\]` instead of `StandardTotalOrder[\TotalComparison\]`; `AnyMaybe` extends only `AnyUniqueItem`, dropping `Equality[\AnyMaybe\]`; `andCondCombine` picks `andRelCond` by `typecase` instead of a second `ANDCOND`. As a result, under walk, `p1 ANDCOND p2` of two relational predicates is no longer itself a relational predicate. The distance has no exclusion error.
- **Conditions:** F-48 limits which static arguments the rule compares. The walk consequence for `ANDCOND` is under walk (the path that runs the one library today).
- **Consequence:** Library edits must not make a type extend two instantiations of one generic; walk will not catch it, only the checker will.
- **Evidence:** `OverloadingOracle.scala:81-105`; probe `ProbeMIEPick`; rows 416 and 458; `reviews/multiple-instantiation-exclusion.md` sections 1 to 3; `Library/FortressLibrary.fsi:121-123`, `:959`; `Library/FortressLibrary.fss:4861-4867`; F-53. No gated test named.
- **Could not resolve:**
  - "relational predicate", "conditions built from a relation over a generator, which `filter` fuses", `ANDCOND`, `andRelCond`: library concepts not in the skill. What is lost when the combination is no longer a relational predicate (presumably `filter` can no longer fuse it) is not said. Language/library concept I lack, and an unstated consequence.
  - "the review's section 3": which review is only clear from the Detail line at the end. Minor wording.
  - Why each of the three library changes was needed (which second instantiation each removed) is not said. Not blocking.

## F-45 "Without the exclusion rule, every dispatcher would have to call its generic arms at the call site's static arguments"

- **Established:** If a value could be in two instantiations of one generic, a dispatcher could not read static arguments off the value; it would have to use the call site's, which the loader already passes it. That call is built for template dispatchers (F-136), and by reading not for dispatchers with an `opr` or `nat` static parameter. No published work resolves such a value under run-time dispatch. The team's 2012 patents allow a self-typed generic (one that comprises exactly its parameter) at several instantiations along a subtype chain (the forest rule), but that alone leaves the specialisation hole: a more specific declaration can run for a value at a narrower level and return a type the caller does not expect. Under an unlanded shadow checker with the forest rule, such a program dies with `IncompatibleClassChangeError`; the tree's checker refuses it. Route C adds a return-type rule that closes the hole (F-46).
- **Conditions:** Hypothetical: only if the exclusion rule were dropped. The `opr`/`nat` gap is by reading.
- **Consequence:** Dropping the rule is not a checker-only change: it needs call-site dispatch in every dispatcher and a rule against the hole.
- **Evidence:** `reviews/mie-probes/scope-call-site-dispatch.md` section 3; `compile-ladder/rung-generic-runtime/REPORT.md` section 9; `reviews/mie-probes/patents-forest-rule.md` sections 1 and 3; `reviews/mie-probes/literature.md`, "What the field settled and what it did not". No test.
- **Could not resolve:**
  - "returns a type that a caller typed at that narrower level does not expect": if the specialised declaration is the one at the narrower level, a caller typed there would seem to expect it; I cannot tell which level the caller is typed at and which declaration's return type is wrong. Unclear wording.
  - "template dispatchers": not in the skill (the skill has template classes for generic declarations, not template dispatchers). Implementation concept I lack; F-136 presumably defines it.
  - "shadow checker": defined inline as a patched unlanded copy; clear.

## F-46 "Route C, the patents' forest rule with a return-type rule over every level of a chain"

- **Established:** Route C (forest rule plus a return-type rule at every level of a chain) closes the specialisation hole. Built as a shadow checker and run on a library copy with the old nested number tower, it refused 25 pairs at 21 declarations: specialisations not covered at the level below. Completing the tower needs seven more declarations and treating `Integral[\ZZ32\]` as `ZZ32`; the patents' `comprises T` would license that, but overflows the checker's stack in `Formula.scala` (code the tree shares). A dedicated hierarchy check could enforce it instead; none exists. Moving from route A (the flat tower, P-43) to route C would also need: the tower nested again; the call-site fix in every dispatcher (F-136); a code-generator method for each middle level of a chain (without which, by the error text, the chain dies with `AbstractMethodError`); walk accepting the specialised pairs without overflowing on `comprises T`; and a way past the overflow or the hierarchy check.
- **Conditions:** A shadow-checker experiment on a library copy, not the tree. The `AbstractMethodError` cause is inferred from the error text.
- **Consequence:** Route C is not a checker-only switch; a worker should treat it as a multi-area project with the listed parts.
- **Evidence:** `reviews/mie-probes/route-c-experiment.md` sections 2 to 5. No test.
- **Could not resolve:**
  - "the zero probe's stack": "stack" here seems to mean a stack of patches or tools, while two sentences later "overflows the checker's stack" means the JVM call stack. Two senses of one word; and "the zero probe" itself is not defined (F-42 cites `perf-probes/nat/zero.md`, which may be it). Unclear wording and a term I lack.
  - "without the reduction markers": not in the skill. Concept I lack.
  - "route A": only implied by "before route A flattened it (P-43)". Readable, but not stated.

## F-47 "The exclusion rule refuses some of the specification's own examples"

- **Established:** Examples E1 to E10 of the specification are refused under the exclusion rule, among them three `where`-clause examples, the Working Draft's `Nothing`, the nested number tower and `RationalQuantity`. As user programs, two replacements run on both paths: a parametric object with a factory (`object Empty[\T\]` with `emptyList[\E\]()`) and a widening function (`widen[\T, S extends T\](c: C[\S\]): C[\T\]`). A marker object with a `coerce` in the generic trait also runs compiled, and walk applies the coercion. The 2012 `covariant` keyword passes the compiled checker but dies at run time. The compiled checker refuses `coerce[\S extends T\](c: C[\S\])` between two instantiations as a cyclic hierarchy. The library's `Nothing[\String\]` does not yet run on the compiled path's prelude. By inference, route C would save only the tower (E5) and the root `Object`'s algebra (E7), not the `where`-clause examples, `Nothing` or E8.
- **Conditions:** The replacements are measured as user programs with their own types, not as library code. The route C claims are inferred, not run.
- **Consequence:** Where the specification's example is refused, a worker should use a parametric object with a factory, a widening function, or a marker object with `coerce`; not `covariant`, and not a generic `coerce` between instantiations.
- **Evidence:** `reviews/spec-refused-examples.md`, "What was found"; rows 331, 389, 404; F-167; probe `AltEmptyCoerce`. No gated test.
- **Could not resolve:**
  - The title says the rule refuses the examples, but the `where`-clause examples "stop on both paths before the rule, in name resolution". So are they refused by the rule or not? Two readings; unclear wording.
  - "the 2012 `covariant` keyword": the skill says generics are invariant and has no such keyword. Language concept I lack.
  - "the internal appendix's 'Disjunctive Constraints'" and "the root `Object`'s algebra": which appendix, and what algebra on `Object`. Concepts I lack.
  - "the library's `Nothing[\String\]`": whether this is the library's form of the factory replacement or the refused original is not said. Unclear wording.

## F-48 "The compiled checker's exclusion rule compares type arguments, and sizes only when both are literals"

- **Established:** The exclusion check counts two instantiations as different only for type arguments and for two literal sizes. Two `bool` arguments do not count: `Flag[\true\]` and `Flag[\false\]` together pass the checker and die in code generation. A static parameter beside a literal does not count: `O[\nat n\] extends { Vec[\n\], Vec[\3\] }` passes and dies at load with `ClassFormatError`. Two literal sizes are refused ("Types Vec[\3\] and Vec[\4\] exclude each other").
- **Conditions:** Compiled checker only. `opr` arguments are not mentioned.
- **Consequence:** A worker cannot rely on the checker to catch extension of two instantiations that differ by `bool` or by a size parameter; these fail later.
- **Evidence:** `compiler_tests/XXXNatExcludeChecker` (the literal refusal); `XXXBoolExtendsTwice` (row 406), `XXXNatExtendsTwice` (row 414, which also blames `TypeHierarchyChecker`); row 402 fixed; `TypeAnalyzer.scala:539-546`; `reviews/spec-refused-examples-judgement.md` section 6.
- **Could not resolve:**
  - "compares type arguments" in the title, then "two boolean arguments count as no exclusion": I read "type arguments" as "arguments that are types". Whether `opr` arguments are compared is not said. Unclear limit.
  - Whether `XXXBoolExtendsTwice` and `XXXNatExtendsTwice` gate this fact (only `XXXNatExcludeChecker` is named after "Gated by") is not said. Minor wording.

## F-49 "Under walk, a value form and a function form of one name are chosen by the argument's run-time type"

- **Established:** When one name has an overload taking a value and one taking a function, walk picks by the run-time type of the argument. So if the element type is `Any`, passing a function as the value reaches the function form: `fill` on an `Any` array stored the function's results (`c[1] = 11`), not the function. The compiled checker refuses such a pair when the parameter's type is a type parameter bounded by `Any`. The one library has no such pair: `fill` takes a value, `tabulate` a function.
- **Conditions:** Walk only; arises only where a function is a valid element (element type `Any`).
- **Consequence:** Do not overload one name with a value form and a function form; keep the library's split (`fill` / `tabulate`).
- **Evidence:** probe `FillBoxAny`; F-158; `reviews/fill-overloads-ways.md` section 2. No gated test.
- **Could not resolve:**
  - Which `fill` was run: the library has no such pair, so the `fill` with both forms must be a probe's own; the entry does not say. Unclear wording.

## F-50 "The compiled checker lets overloads differ in static parameters"

- **Established:** The compiled checker accepts overloads that differ in their static parameters, as the OOPSLA 2011 model does and the specification now states. It refuses a pair as ambiguous only when it cannot prove it unambiguous; it cannot prove pairs over open traits (no `excludes` or `comprises`), nor pairs that exclude only through the exclusion rule plus a bound (the library's `CAP` on `ScalarRange[\I\]` beside `Range2D[\I,J\]`). It also refuses some pairs the paper accepts, by its Return Type Rule and by a positional rule (generic declarations in the more-specific relation must match static parameters by position). This builds P-45. Other gaps are owned elsewhere: symbolic-operator pairs such as `+` are not checked (P-155, row 584); two generic arms on a bare type variable fail compiled (F-174, row 537); walk runs an arm with an unfixed size left unbound where the checker drops the arm or refuses the call (F-69, row 400).
- **Conditions:** Compiled checker; the listed exceptions are refusals or gaps.
- **Consequence:** A worker who meets an ambiguity refusal should look for a missing `excludes`/`comprises` or the bound case before suspecting the checker; the listed gaps go to their owners.
- **Evidence:** `reviews/overload-static-params-ways.md` sections 2 and 3; F-75, F-174. No test named.
- **Could not resolve:**
  - "its overloading check never reads a pair of symbolic operators": I read it as "never checks such pairs at all"; it could mean it fails to parse/see them. Unclear wording.
  - "two generic arms on a bare type variable": I take it as two generic overloads whose parameter type is a bare type variable (`f[\T\](x: T)`), but "on" is vague. Unclear wording.
  - "differ in static parameters": whether this means differing only in static parameters or simply being generic is not clear. Mild.

## F-51 "A generic call converts a narrower argument for a parameter typed by a type variable that another argument fixes"

- **Established:** On both paths, when one argument fixes a type variable and another argument of a narrower type is passed for a parameter of that variable's type, the narrower argument is coerced: `scale(b, 3)` with `b: Box[\RR64\]` takes `T = RR64` and converts `3`. So under walk the library's array-scalar `+`, `-`, `MIN`, `MAX` and matrix-scalar juxtaposition and `DOT` accept a `ZZ32` scalar with `RR64` elements.
- **Conditions:** Both paths; F-73 and F-137 give each path's rule.
- **Consequence:** A worker can pass an integer scalar to these `RR64` operations without converting it.
- **Evidence:** `tests/InferCoercionRungK`, `compiler_tests/InferCoercionShapes`; row 388 fixed; `reviews/numeric-hierarchy-integration-review/row388-container-probe.md`.
- **Could not resolve:** nothing.

## F-?1 "The compiled checker refuses a local function's parameter that has no type"

- **Established:** The compiled checker refuses an untyped parameter of a local function ("Missing parameter type for i"), as it does for a top-level function; it used to crash on the local case. Compiled, an untyped parameter is refused wherever it is; under walk, it fails only when its method implements an abstract declaration. The specification asks for inference of an omitted type but does not describe it.
- **Conditions:** Compiled checker, local and top-level functions. Walk behaves differently (row 405).
- **Consequence:** Write every parameter's type.
- **Evidence:** `compiler_tests/XXXLocalFunctionUntypedParam` and `XXXLocalFunctionUntypedParamInLoop`; rows 620 and 621 fixed; row 405; `STypeEnv.scala:75` and `:200`; `Specification/appendices/changes.tex`, "The type of a parameter that a declaration leaves out".
- **Could not resolve:**
  - "Row 405 holds the case elsewhere": "elsewhere" reads as "in other places in a program" (not local functions); it could also be read as "the case is recorded in another place". I took the first. Mildly unclear wording.

## F-?2 "The compiled checker refuses a subtrait that inherits an abstract method named by an operator static argument"

- **Established:** When a trait's abstract method is named by an `opr` static parameter, and a subtrait inherits it at an instantiation with a concrete operator, the compiled checker matches the inherited abstract method to the concrete one by its unsubstituted name and so refuses the subtrait, even with only one instantiation. The specification and walk substitute the operator first and accept.
- **Conditions:** Compiled checker; the code cause is by reading.
- **Consequence:** A worker meeting this refusal has met a checker defect, not a program error; it is not yet recorded in the ledger or a test.
- **Evidence:** `AbstractMethodChecker.scala:100-101` (by reading); probes `OprSingle`, `OprInstancesOplus`; `reviews/spec-refused-examples-judgement.md` section 4. No ledger row or test.
- **Could not resolve:**
  - What is refused: the entry says a subtrait, but a trait may leave a method abstract; I infer the subtrait (or an object) defines the concrete operator and the checker fails to match it. Whether the refused declaration defines the method is not said. Unclear wording.

## F-?3 "The code generator throws on `Any` as a static argument in an `extends` clause"

- **Established:** A program that the checker accepts and that has `Any` as a static argument in an `extends` clause makes the code generator throw "Only handling some static args of generic types in extends clause".
- **Conditions:** Compiled path, code generation. Which other static arguments are unhandled is not said.
- **Consequence:** Avoid `Any` as a static argument in `extends`; it is a code-generator wall with no row or test yet.
- **Evidence:** `CodeGen.java:5805`; probe `AltEveryContra`; `reviews/spec-refused-examples-judgement.md` sections 3.1 and 9. No ledger row or test.
- **Could not resolve:** nothing.

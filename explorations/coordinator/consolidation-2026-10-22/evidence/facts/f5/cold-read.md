# Cold read: FACTS slice f5 (F-64 to F-75)

Read with only `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and its `references/` (without `revival-changes.md` and `sources.md`). "Row N" is read as gap-ledger row N (`records.md`); "builds P-N" as "is the landed form of the curator's decision P-N" (SKILL.md, "Built."); a "draft note" as a `\note{}` box, which a release build hides (`specification.md`).

---

## F-64 "The compiled checker refuses every type that an api declares ..."

- **Established:** If a trait's `comprises` clause holds `...`, the compiled checker refuses every trait or object declared in an api (`.fsi`) that extends that trait. Being listed in the clause does not help. So a `.fsi` cannot hold `comprises { T, ... }` together with the declaration of `T`. The published specification text (traits.tex, "Trait Declarations") allows `...` in an api. Only a `\note{}` box forbids it, and a release build hides that box.
- **Conditions:** The extender is declared in an api, and the trait it extends has `...` in its `comprises` clause. Applies to the compiled checker only; the entry says nothing about walk.
- **Consequence:** Do not write `comprises { T, ... }` in an api that also declares `T`. A change that lets a listed type through turns the team's `compiler_tests/XXX3q` and `XXX10p` red, so such a change has to deal with those two team tests.
- **Evidence:** Ledger row 354; the spec passage and the draft note; the two team `XXX` tests, which pin the refusal. Detail: `compile-ladder/rung-library-defects/REPORT.md`, "Defects and their homes".
- **Could not resolve:**
  - Whether the closed trait has to be in the same api as the extender. The title says "a type that an api declares" and the consequence says "an api that declares `T`". Is a type declared only in a component (`.fss`) refused too? Unclear wording.
  - Whether the refusal is a defect waiting for a fix or a behaviour the project keeps. The entry sets the published spec text against a hidden note and two team tests, and does not say which one wins. F-72 says "The ellipsis refusal stays", but F-64 on its own does not say so. Unclear wording, and an open point a worker might take for a conflict to explore.

## F-65 "The checker memoizes `TypeAnalyzer.parents` and `excludesClause` per trait table ..."

- **Established:** The compiled checker caches the results of `TypeAnalyzer.parents` and `excludesClause`, one cache per trait table. The cache changes no result. Setting `FORTRESS_ANALYZER_CLAUSES_CACHE=false` turns it off.
- **Conditions:** It holds as long as both functions depend only on the table and the type. The timing comes from one measurement on climb batch 7C's tree: count stage 1,149 s with the cache off, 112 s with it on.
- **Consequence:** A worker can trust the cache, and can switch it off to rule it out as the cause of a checker result, at roughly ten times the count stage's time. With the cache off, the count stage runs past its 900-second limit. Any edit that makes either function depend on more than the table and the type breaks the reason the cache is safe.
- **Evidence:** Reading the code (both functions are pure in the table and the type). One differential on batch 7C's tree gave the same errors with the cache off and on: 626 at the distance stage and 75 at the count stage. No test gates this. Detail: `compile-ladder/rung-analyzer-memo/REPORT.md`, "Why the memo changes no answer"; `reviews/row-488-probe.md`, "The answer".
- **Could not resolve:**
  - "trait table": the checker's structure behind it, and so what "per trait table" covers (one per component? one per run?). An implementation concept I lack; the skill does not define it.
  - "the same errors": the same error texts and places (the `run.txt` comparison that `compiler.md`, "The checker's time", asks for), or only the same totals? The numbers given are totals. Unclear wording.
  - "its 900-second limit": whose limit (the gate's timeout for the stage?), and does it kill the run? The off run finished at 1,149 s, so the limit did not stop it there. Unclear wording.
  - "climb batch 7C": the skill names batches by number. Is 7C a batch, or rung C of batch 7? Unclear naming.

## F-66 "The checker-count stage's table, `gate/checker-count.txt`, lands with every batch ..."

- **Established:** Every batch lands the count stage's table as `gate/checker-count.txt`, next to the gate's `summary.txt` (so under `explorations/compile-ladder/climb-batch-<N>/gate/`). The total in the last landed table is the checker count that F-53 holds. Gate step 8 compares the new table with the newest landed one. A change in the total never makes the gate red by itself (P-39): a fix can raise it, and the effects of two rungs do not simply add. The gate is red on (a) a crash line that no rung declared, (b) a table with no total, (c) a stale shadow. A shadow is the instrumented copy of `StaticChecker` that the stage runs; it is stale when it no longer matches the tracked checker.
- **Conditions:** Every batch's gate. This is a process fact, not a property of the code.
- **Consequence:** Land the table with the batch. Do not count a higher total as red. Declare any expected crash in advance. A worker who edits `StaticChecker` must bring the instrumented copy back in line, or the gate goes red.
- **Evidence:** No test or command given. Detail: `coordinator/climb-batch-workflow.md`, "The checker count, and a rung whose test is that stage".
- **Could not resolve:**
  - "The gate's step 8": `references/gate.md` lists seven steps and has no count-stage step. SKILL.md names a count stage and a distance stage, but nothing in the skill numbers them. A worker cannot find step 8 from the skill. This is a broken pointer, not a language concept.
  - "a crash line that no rung declared": declared where (the rung's brief, the batch brief, its report?) and in what form. I read "crash line" as the table's "first crash" line (`compiler.md`). Unclear wording.
  - Where the shadow copy lives, and how to update it: not said. Unclear wording.
  - "two rungs' changes do not add": I read it as "their effects on the count are not additive". It can also be read as "do not add errors". Mildly ambiguous.

## F-67 "The compiled type checker checks `nat` and `int` static parameters."

- **Established:** The compiled checker type-checks size static parameters (`nat`, `int`). A size is a symbol, a literal, or an operation on sizes. Two sizes are equal when their written forms match after numerals are folded (F-146). The checker will not infer a `bool`, `dim` or `unit` static argument. A `bool` argument written explicitly passes the checker: row 406's `Flag[\true\]` and `Flag[\false\]` pass it and then fail in code generation. A call that leaves a size undetermined is refused with "Could not infer static argument ... without context". For overload sets, F-69 gives the exceptions.
- **Conditions:** Compiled path only. Size equality is by form, not by arithmetic (my reading: `n+1` and `1+n` are different sizes). `bool` arguments get through the checker but not through code generation.
- **Consequence:** Write `bool`, `dim` and `unit` static arguments out. Do not expect a compiled program with a `bool` static argument to compile all the way through (row 406). Write sizes in matching forms. Expect the refusal when a call does not fix a size.
- **Evidence:** It builds P-40. Gated by `compiler_tests/NatInferredChecker` and its siblings in the report's section 6. Detail: `compile-ladder/rung-nat-checker/REPORT.md` section 1.
- **Could not resolve:**
  - "once numerals are folded": does folding only normalise numerals, or does it also evaluate operations on numerals (`2+3` becomes `5`)? These give different equalities. Unclear wording, deferred to F-146.
  - "symbol": I take it to mean a static parameter's name. The skill does not define it.
  - "checks": the title says the checker checks sizes, while the body implies it also infers them (it "refuses to infer" the other kinds). From what it infers a size is not said.
  - "its siblings": the gating tests are named only in the report. A reader cannot tell which tests fail if the fact stops holding.

## F-69 "The compiled checker refuses a call whose most specific arm failed only on a size ..."

- **Established:** Take an overloaded call where the most specific declaration ("arm") fails to apply only because its size cannot be determined from the call, and the size does not occur in that arm's parameter type (for example, it occurs only in the return type). The checker refuses the call: "Could not infer static argument nat n without context". If the undetermined size does occur in the arm's own parameter type, the checker instead drops that arm and resolves among the rest (row 400). If the argument's static type is above (a supertype of) the arm's domain, the checker lets the call through, and the compiled run dies when it reads the size (row 446).
- **Conditions:** Compiled checker, overloaded calls with size static parameters. The third case is accepted statically and fails at run time.
- **Consequence:** A call whose size is not in the parameter types must fix the size in some other way. A worker must expect that a statically accepted call can still crash at run time in the row 446 case.
- **Evidence:** It builds P-40. Gated by `compiler_tests/NatKnownSizeArm` and `XXXNatUnknownSize*`. Detail: `compile-ladder/rung-unknown-size-arm/REPORT.md` section 10.
- **Could not resolve:**
  - "arm": I read it as one declaration of an overloaded name. The term is not in the skill.
  - "parameter type" in the singular: how the rule works for a declaration with several parameters (free of the size in all of them?). Unclear wording.
  - In the row 446 case, which arm the checker resolves the call to, and whether row 446 is an open defect. F-70 marks a fixed row "fixed", so I take rows 400 and 446 as open, but the entry does not say. It also does not say which of the two gating tests covers which case.
  - "dies reading the size": what error the run ends with. Not said.

## F-70 "The compiled checker checks a static argument written at a dotted method call against its parameter's bound, but not one written at a top-level function call."

- **Established:** At a dotted call `x.m[\A\](...)`, the checker substitutes the written static arguments into each bound and refuses a call whose argument fails a bound, with "No such method" (row 651, fixed). At a top-level call it only checks that the kinds match. So `n[\String\]("d")` passes for `n[\T extends Number\](s: String): T` (row 470).
- **Conditions:** Explicitly written static arguments, compiled checker.
- **Consequence:** Do not rely on the checker to enforce bounds at a top-level call. Row 470 is an open defect with no test. Its first fix needs a test written first.
- **Evidence:** Gated by `compiler_tests/MethodStaticArgsBoundNamesOther*`, which cover only the dotted call. Row 470 has no test. Detail: `compile-ladder/rung-checker-contexts/REPORT.md` section 1.
- **Could not resolve:**
  - Which side a call of a functional method falls on (`f(x)` where `f` has `self` among its parameters; SKILL.md, "Functional methods"). It is called like a top-level function but declared as a method. Unclear wording.

## F-?1 "No static parameter of the interpreter's library is bounded by `Object`; under walk ..."

- **Established:** Two claims. (1) No static parameter in the interpreter's library (`Library/`, `ProjectFortress/LibraryBuiltin/`) has the bound `Object`. Its result-only type parameters are unbounded (that is, bounded by `Any`), as P-48 decides (F-84). Six functions of the `FortressLibrary` api write `extends Any` explicitly: `cast`, `instanceOf`, `identity`, `shared`, `localize`, `copy`. (2) Under walk, if a parameter's type is a type variable bounded by `Object` and the argument's type is a tuple, `()` or an arrow, the program stops with an `InterpreterBug` instead of a type error (row 471).
- **Conditions:** Claim 2 is walk only, and only for `Object`-bounded type variables at such arguments. The library cannot trigger it. Programs that copy the specification's examples or the compiler tests' style (`extends Object`) can.
- **Consequence:** Bound by `Any` (or leave unbounded) wherever tuples, functions or `()` must pass. Read a walk `InterpreterBug` at such a call as row 471, not as a program error. Row 471 is open and has no test. Since walk crashes, it is a ledger-only defect (`tests-writing.md`, "How a defect is recorded", way 3).
- **Evidence:** A search of `Library/` and `ProjectFortress/LibraryBuiltin/`, with no command given, and the probe that row 471 records. Detail: `compile-ladder/rung-result-bounds/REPORT.md` section 10.
- **Could not resolve:**
  - The entry has no permanent number ("F-?1"). It cannot be cited by number.
  - "result-only parameters": I read it as type parameters that occur only in the result type. That is my reading, not one the skill gives. Also unclear: are the six `extends Any` functions those result-only parameters, or a separate set?
  - "the compiler tests write `extends Object`, so they can meet walk's stop": the compiler tests run on the compiled path, so when would they meet walk's stop? Only if run under walk? After the switch-over? Unclear wording.
  - The title joins two claims with a semicolon, and the second does not follow from the first. A reader may look for a causal link that is not there.

## F-71 "The compiled checker does not narrow a `typecase` variable in the shorthand form ..."

- **Established:** Three forms of `typecase`:
  - Shorthand `typecase x of T => ...`: walk runs it. The compiled checker does not narrow `x` to `T` inside the clause, so code that uses `x` as a `T` is refused on the compiled path.
  - Binding form `typecase x = e of`: neither path accepts it, because it parses as the equality `x = e`. Only the specification's grammar, which is marked for revision, has it.
  - Clause-binding form `x:T =>`: runs on both paths, and is the form the library uses (F-134).
- **Conditions:** The compiled checker for the shorthand; both paths for the binding form.
- **Consequence:** Write the clause-binding form. Do not use the shorthand in code meant to compile, and do not use the binding form at all.
- **Evidence:** Row 460 records both refusals; no test gates them. Detail: `compile-ladder/rung-exclusion-remainder/REPORT.md` section 15.
- **Could not resolve:**
  - The full syntax of the clause-binding form: is it `typecase e of x: T => ... end`? The fragment `x:T =>` does not show where the scrutinee goes. `typecase` syntax is a language concept I lack, and the skill does not give it.
  - "marked for revision": marked by whom (a team `\note{}` or a revival `\revision` box)?
  - Whether the shorthand's lack of narrowing is a defect to fix later or an accepted limit. The entry does not say.

## F-72 "The compiled checker reads a `comprises` clause as the 2012 texts do for a generic subtrait ..."

- **Established:** Suppose a generic trait (the subtrait) extends a closed trait (one with a `comprises` clause) and is not listed in that clause. The compiled checker accepts it when the trait table knows at least one type that immediately extends it, and every such type is below a listed type. If no immediate extender is known, it is refused. The `...` refusal of F-64 still applies.
- **Conditions:** Compiled checker; generic subtraits of a closed trait. Open: an extender in another unit is not checked (the hole P-44 leaves, row 487). Parked for the curator: renaming the extender's type variable changes the verdict (row 489), and extenders are found by matching the plain text of the trait's name (row 490).
- **Consequence:** Rely on the check only within one unit. Expect a verdict that depends on a type variable's name, and possible name collisions, until rows 489 and 490 are settled. Those are the curator's to settle, not a worker's.
- **Evidence:** It builds P-44. Gated by `compiler_tests/ComprisesGenericSubtrait`. Detail: `compile-ladder/rung-comprises-checker/REPORT.md` section 6.
- **Could not resolve:**
  - "at least one type that immediately extends it": "it" can be the generic subtrait or the closed trait. I read the subtrait, but the sentence allows both. Unclear wording.
  - "the 2012 texts": which texts (the specification? a paper under `Papers/`?). Not named.
  - "trait table": an implementation concept the skill does not define (as in F-65).
  - "unit": I read it as a component or an api. Not defined.
  - "on phase 3's road with no batch named": I read it as "owed within PLAN phase 3, not yet scheduled in any batch". "Road" is unclear wording.

## F-73 "The compiled checker infers a generic's static arguments with coercion ..."

- **Established:** Take a type parameter that is the whole declared type of exactly one parameter (`x: T`) and occurs in no other parameter type. When inferring it, the checker considers the argument's type, the types it coerces to, and `T`'s bound, and picks the narrowest. Overload ranking: a declaration that needs coercion ranks below one that does not. A tie among coerced declarations is refused with "Ambiguous coercion". When the candidates differ only at a numeral argument, the numeral is read as `ZZ32` (or `ZZ64`, or `ZZ`, if its value does not fit). That last reading is a default awaiting the curator (review-queue item 209). The coercion search refuses a call with more than 64 combinations of candidate types (row 506), and a call with an untyped function argument (row 507).
- **Conditions:** Compiled checker; type parameters of the shape above. The numeral reading is provisional (a default).
- **Consequence:** Expect "Ambiguous coercion" on tied coerced overloads. Give function arguments parameter types. Keep calls under the 64-combination limit. Do not build on the numeral reading as if it were settled.
- **Evidence:** It builds P-74 and P-49. Gated by `compiler_tests/NatLitArgChecker`, `CoercionGenericFnCompiledRungC` and `InferCoercionShapes` (F-51); the tie refusal by `XXXInferAmbiguousCoercion`. Detail: `compile-ladder/rung-inference-checker/REPORT.md` section 3.2.
- **Could not resolve:**
  - "the narrowest of its arguments' types, their coercion targets and its bound": the plural "arguments'" does not fit a type parameter that occurs in one parameter only. And "narrowest" among which candidates: all of them (then the argument's own type would always win), or only those that make the call check? Number types are siblings (SKILL.md), so there may be no narrowest. Two readings; unclear wording.
  - "When the declarations differ only at a numeral": declarations do not contain numerals, calls do. I read it as "differ only in the parameter where the call passes a numeral". Unclear wording.
  - "(F-51)" after `InferCoercionShapes`: what F-51 adds here is not said.

## F-74 "Under walk, an integer numeral takes its type from its value ..."

- **Established:** Under walk, an integer numeral is a `ZZ32` if it fits in 32 bits, a `ZZ64` if it fits in 64 bits, and a `ZZ` otherwise. This lasts until walk gets the checker's static types, because without them a list of numerals and an inferred static argument take their types from the values. Walk names these types by its implementation classes `Int`, `Long` and `BigNum`, as in `Cell[\Int\]` (row 364). A size below 2^31 used as a value is a `ZZ32` too (row 486; F-140). This is the walk half of P-76; F-79 is the library half.
- **Conditions:** Walk only, until walk has static types. The probe numbers describe a tree before climb batch N's second run and before the library half landed, so they may be out of date.
- **Consequence:** Under walk, expect value-based numeral types, and the names `Int`, `Long` and `BigNum` where a type is shown or inferred. Do not switch walk's numerals now. The probe measured the switch to an `IntLiteral` numeral on its own: it changed 59 test verdicts. With its four devices, the library loaded and both microGPT checks kept their values, but 24 passing interpreter tests failed: 6 by design (3 of them team tests that assert `ZZ32`), 9 for want of static types (rows 364, 510), and 9 walk gaps.
- **Evidence:** Probe Q. Detail: `reviews/numeral-switch-judgement.md` sections 2 and 3.
- **Could not resolve:**
  - "an `IntLiteral` numeral": a numeral typed by a literal type instead of by its value? The skill does not define `IntLiteral`. A language/implementation concept I lack.
  - "its four devices": what the four devices are. Undefined, and unclear wording.
  - "climb batch N": the skill names batches by number. Is N a letter name or a placeholder? Unclear naming. "Probe Q" is not identified either.
  - "Walk names these values by ... `Int`, ... as in `Cell[\Int\]`": is this only a display name, or does walk instantiate `Cell[\Int\]` as a type distinct from `Cell[\ZZ32\]`? These give different consequences. Unclear wording.
  - A size of 2^31 or more used as a value: its type is not said.

## F-75 "The compiled checker checks the Return Type Rule over every instance, and a positional rule ..."

- **Established:** For two overloaded declarations where one is more specific, the compiled checker checks the Return Type Rule on every instantiation. It also checks a positional rule. When both are generic and declare the same number of static parameters of their own, those parameters must agree in kind position by position. And the more specific one's return type must be a subtype of the other's, once the other's static parameters are renamed to its own by position. The checker also refuses a generic declaration next to a non-generic one on an object domain, which the paper accepts (row 542; review-queue item 57, awaiting the curator). In the interpreter's library these rules refuse no pair: the distance has no return-type or overloading error (F-53).
- **Conditions:** Compiled checker, pairs in the more-specific relation. The positional rule applies only when the numbers of own static parameters are equal. The object-domain refusal is provisional.
- **Consequence:** Keep a more specific overload's static parameters in the same kind order as the less specific one's, and its return type below the other's. Treat the object-domain refusal as a known over-refusal waiting for the curator (item 57), not as a rule to defend. Library edits do not trip these rules today.
- **Evidence:** It builds P-45. Accepting tests: `compiler_tests/OverloadGeneric*` and `OverloadBoundNamesForced`. Refusals pinned by `XXXOverloadReturnEveryInstance`, `XXXOverloadPermutedStaticParams` and `XXXOverloadReturnObjectDomain`. Detail: `compile-ladder/rung-return-type-rule/decision-record.md` sections 1 and 2.
- **Could not resolve:**
  - "on an object domain": a domain whose parameter types are object (leaf) types? A concept the skill does not define, and the wording admits more than one reading.
  - "the paper": which paper. I assume the 2012 write-up on the Return Type Rule that `exploring.md` names, but the entry does not say.
  - Which of the three refusals pinned by `XXX` tests are correct behaviour and which are defects. Only the object-domain one is marked as questionable. `XXX` alone does not tell (`tests-writing.md`).

---

## Across the slice

- F-68 is missing between F-67 and F-69. That may just be the extract's choice.
- One entry has the placeholder number "F-?1".
- F-64 and F-72 both bear on the `...` refusal. Only F-72 says that it stays.

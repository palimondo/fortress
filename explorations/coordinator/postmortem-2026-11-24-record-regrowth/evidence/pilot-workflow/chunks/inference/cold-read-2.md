# Cold read 2: inference chunk

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and lookups in `references/compiler.md` (distance stage), `references/library.md` (reductions, `SUM`) and `references/records.md` (ledger rows). Every entry here is a fact. Cross-references to other entries (P-nn, F-nn) that are not in this file could not be followed; I note them only where the entry's meaning depends on them.

## F-28

- **Established:** When walk instantiates a generic declaration, its `MakeInferenceSpecific` visitor uses the declared return type to narrow the inferred static arguments. A return type of `Any` is handled the same way as a trait type, so it works. The syntax tree has 18 concrete type classes. The visitor has no case for 11 of them, and walk stops with an internal error if one of those is the return type. Only two of the 11 can be written as a return type, the two dimension forms, and walk does not support dimensions anyway.
- **Conditions:** Walk only, generic declarations. The 11 missing cases cannot be reached except through dimension types.
- **Consequence:** A generic that returns `Any` is safe under walk. The missing cases are not a gap that matters, so no ledger row is kept for them.
- **Evidence:** `tests/GenericReturningAny.fss`; `compile-ladder/rung-walk-dispatch/REPORT.md` section 3.
- **Could not resolve:** "passes over `Any` as it does a trait type": "passes over" can mean "handles" or "skips". The title says walk instantiates it, so I read it as "handles without error", but I cannot tell whether `Any` narrows anything or is ignored (unclear wording).

## F-73

- **Established:** The compiled checker can infer a generic's static arguments through coercion. This applies to a type parameter that is the entire type of every parameter it appears in (as `T` in `pick[\T\](x: T, y: T)`). Such a parameter takes the narrowest type that every argument converts into and that its bound allows. The candidates are the arguments' static types, their coercion targets, and the bound (the bound only if it is a trait type other than `Object` or `Any`). Walk applies the same rule to run-time types (F-137). The two paths agree when static types equal run-time types, as in microGPT, and can differ when a static type is wider than its value (row 509). A declaration that needs coercion ranks below one that does not. A tie between coerced declarations is refused with "Ambiguous coercion", except in three narrow cases. When a tie differs only at a numeral argument, the numeral is read as `ZZ32`, or as `ZZ64`/`ZZ` if it does not fit (this implements P-173). The coercion attempt refuses a call with an untyped function argument (row 507), and a call with more than 64 combinations of candidate types for its lone type parameters (row 506). A parameter that only numerals fix counts as one.
- **Conditions:** Compiled checker. Lone type parameters only (whole type of each parameter). Exceptions: the three tie cases, untyped function arguments, the 64-combination limit.
- **Consequence:** Expect the same instance on both paths only where static and run-time types agree. Where a static type is wider than its value, they may differ. Avoid untyped function arguments and very wide combinations in such calls.
- **Evidence:** `compiler_tests/NatLitArgChecker`, `CoercionGenericFnCompiledRungC`, `InferCoercionShapes`; refusal of a tie: `XXXInferAmbiguousCoercion`; `compile-ladder/rung-inference-checker/REPORT.md` section 3.2 (which lists the three cases).
- **Could not resolve:**
  - "lone type parameters": used later without a definition. I take it to mean the kind of parameter in the bold title, but the entry does not say so (unclear wording; the skill does not define it).
  - "a parameter that numerals alone fix counting as one": one combination, or one type parameter in the count? Read two ways (unclear wording).
  - "outside three narrow cases": what the cases are is only in the report (incomplete here, though pointed to).
  - "It builds P-74 and P-49": what these positions require is not stated (cross-reference).

## F-78

- **Established:** When nothing at a call fixes a type parameter, the compiled checker instantiates it at the intersection of its upper bounds, never at `BottomType`. When there is an expected type, the checker tries these in order: (1) subtyping without the expected type, kept if the result converts to it; (2) subtyping with it; (3) coercion with it; (4) coercion without it. P-49 decides (1) and (3). A worker chose (2) and (4) (decision D4). Attempt (2) accepts a call whose untyped function argument is fixed only by the expected type, which the coercion attempt would refuse (row 507). An argument of intersection type fixes a parameter at the whole intersection (row 541). The run time has no class for an intersection type, so an instance at one, whether from such an argument or from an unfixed parameter's bounds, dies when its class loads (row 559).
- **Conditions:** Compiled checker. The attempt order applies only when there is an expected type.
- **Consequence:** A program for the compiled path must not let an unfixed parameter with several bounds, or an intersection-typed argument, reach an instantiation: it type-checks but fails at run time. Attempts (2) and (4) are a worker's choice, not the curator's.
- **Evidence:** `compiler_tests/InferResultOnly*`, `InferContextKeepsFit`; `compile-ladder/rung-instance-bound/REPORT.md` sections 1 and 7; D4 of `compile-ladder/rung-instance-bound/decision-record.md`.
- **Could not resolve:**
  - "An argument of intersection type fixes a parameter at the whole intersection (row 541)": I cannot tell whether this is the intended rule or a defect (unclear wording).
  - The status of the worker's choice of (2) and (4): is it accepted, or open for the curator? (unclear wording).

## F-87

- **Established:** The compiled checker gives a call an expected type in many contexts: the right-hand side of a typed declaration; a clause of an `if` without `else` (expected `()`); a block's last expression after local declarations; a `typecase` clause; a juxtaposition; an operator repeated over three or more operands; a `label` body and each value that an `exit` passes to it; and another call's argument, through a retry of the enclosing call (F-221). The specification's paragraph "The expected type" in `Specification/basic/inference.tex` lists the same set. For a juxtaposition or a repeated operator, the expression's expected type goes to the call that it desugars to. The `label` contexts implement P-50.
- **Conditions:** Compiled checker. The list is complete per the specification paragraph.
- **Consequence:** A worker can rely on the expected type flowing into these contexts, and can check the specification paragraph for the full list.
- **Evidence:** `compiler_tests/InferResultOnly*`, `Infer*Context`; `compile-ladder/rung-checker-contexts/REPORT.md` section 1.
- **Could not resolve:** "in many contexts, among them": "among them" suggests the list is partial, but the next sentence says the specification paragraph lists every context and the checker gives the same set. So I cannot tell whether the bold list is complete (unclear wording).

## F-221

- **Established:** If a call that encloses another call as an argument is not accepted otherwise, the compiled checker retries the inner call against each enclosing declaration's parameter type as its expected type. Under P-49, a declaration that accepts the call as written is never skipped. A reduction is a call of `__bigOperator` that takes the big operator as an argument, so the retry also reaches reductions. An operator chain `a OPLUS b OPLUS c` that a multifix `OPLUS` (one declared over three or more operands) accepts only through the retry runs the multifix declaration, not the binary one. Walk gives such an argument no expected type (row 705).
- **Conditions:** Compiled checker, and only when the enclosing call fails without the retry.
- **Consequence:** The paths can differ for nested calls and operator chains: the compiled path may pick a multifix declaration or an instance by expected type that walk would not.
- **Evidence:** `compiler_tests/InferCallArgument*`, `InferBigOperatorExpectedType`; `compile-ladder/rung-argument-context/REPORT.md` sections 1, 5 and 8, and its `SKEPTIC.md` finding 5.
- **Could not resolve:** "where a plain-bounded big operator's bound does not fit, the retry gives it the reduction's expected type; one whose bound names its parameter takes that type, else its body's (F-364)": what the bound must fit is not said, and "that type" could mean the expected type or the bound. I read it as: a plain-bounded big operator (bound does not mention its parameter) is instantiated at the expected type when its bound does not fit; an F-bounded one tries the expected type, then the body's type. I am not confident (unclear wording). "plain-bounded" itself I could infer only from F-364's "a plain bound".

## F-59

- **Established:** `SUM` and `PROD` get their identity (0 or 1) from their static argument. When none is written, the compiled checker infers it (F-364). The identity is chosen by a witness `typecase`: a `typecase` over a `() -> T` function, with one clause per number type, that picks the identity for `T` (P-78). A sum without generators (`SUM e` over a collection `e`, or `x DOT y`) writes no static argument. C4's one clause-form sum writes none; it is the body of a top-level function declared to return `ZZ32`, so both paths sum at `ZZ32` (walk by F-228). The team's tests and the interpreter's library write the argument (F-285).
- **Conditions:** `SUM`/`PROD`; the measurements in the detail report predate P-48 and F-364.
- **Consequence:** microGPT's sum is safe on both paths because of its declared return type. Elsewhere, an unwritten argument is inferred by the checker.
- **Evidence:** `compiler_tests/WitnessIdentityRungG`; `reviews/sum-replacement-judgement.md` section 5, Table 2.
- **Could not resolve:**
  - "A sum without generators ... writes no static argument (P-78)": is this a rule (it must not, or cannot, write one) or a description (it has no place for one)? Read two ways (unclear wording).
  - "clause-form sum": not defined. I take it to be a sum with generator clauses, `SUM[\T\][x <- g] e` (term not found in the skill).
  - `x DOT y` as "a sum": I take it to be a dot product that desugars to a sum, but this is not said (language concept I lack).

## F-364

- **Established:** For a reduction with no written static argument, the compiled checker first checks the call as written. It can do so when the big operator has an instance on its own: a plain bound, or no static parameter. If that is not accepted, or its result does not convert to the expected type, the checker writes in the expected type, then the body's type, each only if it meets the bound. It keeps the first form that is accepted and converts. The elements are converted to the chosen instance. A call's argument has no expected type when the call is accepted without one (P-51), so a reduction in that position runs at its body's type. As a result, `SUM`, `PROD`, `BIG MIN` and `BIG MAX` need no written static argument for the checker. Walk and the checker give different instances at a method's return type, a field, a top-level variable and an assignment (row 1008). A big operator with two or more static parameters is refused (row 1007). With an F-bounded big operator, a type error in the body is reported as the big operator's refusal (row 1015).
- **Conditions:** Compiled checker; reductions with no written static argument that are not accepted as written.
- **Consequence:** A program meant for both paths must write the static argument at a method's return type, a field, a top-level variable and an assignment. A confusing refusal of an F-bounded big operator may hide a type error in the body.
- **Evidence:** `compiler_tests/InferBigOperatorSelfBound` (gate), guarded by `InferBigOperatorUnwritten`; `compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction".
- **Could not resolve:** "Gated by ... and guarded by ...": the difference between gated and guarded is not explained (unclear wording; perhaps the second is an `XXX` test or not in the gate).

## F-365

- **Established:** When a generic function's name (a single declaration with static parameters) is used without static arguments where an arrow type is expected, the compiled checker instantiates it from that arrow type. As a call's argument, it is typed again in the retry (F-221). If the arrow type's domain leaves a static parameter unfixed (one that only the return type mentions, for example), the checker refuses it with a message naming the parameter. An arrow type with its own static parameters is a subtype of no arrow type and coerces to nothing. The function's own static parameters stay unbound even inside a generic declaration whose static parameter has the same name. The memo of normalized arrow types includes static parameters in its key, so a generic function's type and an instance that look alike stay distinct. Refused: a name with several declarations of which one is generic (row 1009), and applying an untyped binding such as `g = count`. Stopped with 'F is not in the kind env': such a binding that is never applied (row 1010). Accepted but dead at run time: a reference where the expected type is not an arrow type, such as a parameter of type `Any` (row 1012), and a generic trait's functional method passed as a value inside the trait (row 1013). Whether the checker accepts microGPT's row lift `rows(rmsn, x)` is unmeasured.
- **Conditions:** Compiled checker; a single generic declaration, referenced without static arguments, at an arrow type.
- **Consequence:** For the compiled path, pass a generic function only where an arrow type fixes all its static parameters. Do not pass one at `Any`, overload it with a generic declaration, or bind it to an untyped variable. The model's `rows(rmsn, x)` is an open question for the compiled path.
- **Evidence:** `compiler_tests/*GenericFunctionAsValue*Compiled`; `compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 2, row 758".
- **Could not resolve:**
  - "the applied value of an untyped binding such as `g = count`": is the refusal at the binding or at the call `g(...)`? I read it as the call (unclear wording).
  - "row lift": not defined. I take it to be applying `rmsn` to each row of `x` (term not found in the skill).
  - "whose generic callee's other argument fixes the sizes": the sizes of what, `rmsn`'s size parameters? (unclear wording).

## F-367

- **Established:** Under walk, a generic function is a value with a type of its own, below `Any` and below each arrow type at which it can be received. A parameter, a local variable declared with an arrow type, and a variable of arrow type at an assignment (a mutable top-level variable included) receive the instance that a direct call with the arrow domain's types would run. A generic callee's static parameters are fixed by its other arguments first, so `rows(rmsn, x)` runs with `rmsn` sized. At an arrow type that leaves a static parameter open, at `Any`, at a type parameter, or at an untyped place, the value stays generic and each application infers its own static arguments. The specification makes this a static error (row 1021, a design limit of walk). The compiled checker refuses the open arrow type and the untyped place, and accepts `Any`, whose compiled run dies (row 1012). An overloaded name's value keeps its generic declarations, so `pick(twice)` runs the `pick` declared over an arrow type; no test pins this. Defects: an immutable top-level variable keeps the generic value (row 1019); `appT(half, v)` is refused where `v` fixes the callee's type parameter by its run-time type (row 1018); a block-local function with its own static parameters does not run, whether called or passed (row 1020).
- **Conditions:** Walk; the listed defects and design limit.
- **Consequence:** Under walk, the model's row lift works. Avoid immutable top-level variables of generic functions, block-local generic functions, and the `appT(half, v)` shape (write the static argument). Do not rely on the open/`Any`/untyped cases, which the specification forbids.
- **Evidence:** `tests/GenericFunctionAsValueWalk`, `GenericFunctionRowLiftWalk`, `GenericFunctionAssignedWalk`; `compile-ladder/rung-generic-function-value/REPORT.md`, "The rule as built".
- **Could not resolve:** "Of these, the compiled checker refuses the open arrow type and the untyped place, and accepts `Any`": the type-parameter case is left out, so I cannot tell what the checker does there (incomplete wording).

## F-141

- **Established:** Under walk, a type parameter that nothing at a call fixes takes its declared bound. A lone parameter (F-137) with no narrowest candidate takes its bound if every argument is below the bound, and otherwise the join of the arguments. A parameter that appears only in function domains, an odd number of arrows deep and never inside a static argument (as `T` in `g: T -> ZZ32`), is bounded by the arguments only from above. With nothing from below, it takes the meet of its declared bound and those upper bounds. An F-bounded parameter stays open (F-143). A worker chose two more default rules: D3, where a parameter mentioned only in another fixed parameter's bound takes that parameter's instance (so `ap[\T, A extends T\](a: A)` gives `T` the type of `a`, row 592); and D5, where a lone parameter whose bound mentions a static parameter takes the arguments' narrowest common supertype, never its bound. Expected-failure defects: rows 591, 616, 612, 587 and 589 (as listed in the entry).
- **Conditions:** Walk only.
- **Consequence:** A worker can predict walk's instance in these cases, and must treat the listed rows as known failures, not new gaps. Repairing row 589 would change which declaration runs.
- **Evidence:** `tests/Infer*Walk.fss`; `compile-ladder/rung-walk-instance/REPORT.md` section 2; `compile-ladder/rung-walk-meet/REPORT.md` section 1; D3 and D5 of `compile-ladder/rung-walk-instance/decision-record.md`.
- **Could not resolve:** "lone" again depends on F-137, which is not here (cross-reference; F-73's title suggests the meaning). Whether D3 and D5 are settled or await the curator is not said (unclear wording, as in F-78).

## F-242

- **Established:** The fusion of `SUM` with `MAX` and with `MIN` produces no error in the distance stage. `SumReduction`'s two `distribute` overloads carry `where` conditions, and `ActualReduction`'s generic `distribute`, which `SumReduction` inherits, answers over its own static parameter `K`. The fusion pairs are `MaxSumReductionPair`, `MinSumReductionPair` and those two overloads, through which `Generator2` computes the maximum or minimum of sums in one pass. The `where` conditions give `T` the bound that `MaxReduction`/`MinReduction` needs. The overloads answer a pair over `Maybe[\T\]`, which the generic's `PossibleReductionPair[\K\]` admits under the return-type rule (F-75). The team's commented-out generic, answering `PossibleReductionPair[\R\]`, would fail that rule. The fusion is kept (P-151).
- **Conditions:** The interpreter's library, as checked by the distance stage.
- **Consequence:** Keep the fusion pairs. Do not revive the commented-out generic.
- **Evidence:** test in F-250; `perf-probes/where-clauses/REPORT.md` A.1 and A.2.1; `perf-probes/generic-distribute/REPORT.md` sections 3 and 4.
- **Could not resolve:** "hold no site of the distance": I read "site of the distance" as "error counted by the distance stage", but the phrase is not defined (unclear wording). "answers over its own static parameter `K`" (returns a type parameterized by `K`?), and "admits" (accepts as a more specific return type?), are terse but readable.

## F-248

- **Established:** Under walk, the team's generic `distribute` over `K`, without a `distribute(r: Any)` beside it, gives the same fused results that the `Any` method gave, and a nested reduction with no fused pair runs. `GeneratorDeclarations` and microGPT's quick pair keep their answers. `MAX` and `MIN` over `SUM`, and `SUM` over `PROD`, still fuse. A `SUM` of `SUM`s over a generator of generators runs through walk's inference of a generic method's static arguments (F-253). Making live the commented-out `r.distribute[\L1\](q)` in `Generator2` stops every fused pair with an error (row 744).
- **Conditions:** Walk.
- **Consequence:** The `Any` overload of `distribute` is not needed. Do not uncomment `r.distribute[\L1\](q)`.
- **Evidence:** `tests/NestedReductionFusion` (named for the nested case); `perf-probes/generic-distribute/REPORT.md` section 5.
- **Could not resolve:**
  - "microGPT's quick pair": the two quick checks (`MicroGptFlatQuick.fss` and `MicroGptAplQuick.fss`), or some pair of reductions? Read two ways (unclear wording).
  - Whether `distribute(r: Any)` was removed from the tree or was only absent in the probe (unclear wording).
  - No gate test is named for the main claim, only for the nested case.

## F-285

- **Established:** In the components the distance stage checks, the interpreter's library writes the static argument of: every clause form whose big operator's bound names its parameter; every list comprehension; and each `cond` call in `Condition`'s methods. Clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or of `BIG LEXICO`, which has no static parameter. The checker could infer an unwritten argument (F-364), but the sites stay written. A `cond` call writes its result type, as `cond[\Maybe[\G\]\]`. `__bigOperator2`'s fused arm (the `typecase` arm that runs a nested big operator through `generate2`) casts its result to `O0`, its declared result type, so the checker does not type it `OR(I0,O0)` (row 632). This is the library's practice for an arm whose type a `typecase` cannot show (F-264). So the distance stage reports nothing at these declarations (F-53). Outside those components, `PureList` writes no static argument at its strided subscript. Under walk that answers a list typed at its elements' run-time types, which a binding declared `List[\Shape\]` refuses (row 824).
- **Conditions:** The distance stage's components; `PureList` is outside them.
- **Consequence:** When editing the library, write the static argument at these sites, following the existing practice (P-78), and cast a `typecase` arm's result where its type cannot be shown. Be aware of the `PureList` defect.
- **Evidence:** the distance stage; `tests/WrittenReductionArgumentsWalk`, `GeneratorDeclarations`, `NestedReductionFusion` (which run the fused arm), `PureListStridedSubscriptWalk`; `compile-ladder/rung-body-arguments/REPORT.md`; `compile-ladder/rung-generator-slips/REPORT.md` section 5.
- **Could not resolve:**
  - "clause form": not defined (see F-59); I take it to be a reduction written with generator clauses (term not found in the skill).
  - `BIG LEXICO`: unknown operator (language concept I lack; not in the skill).
  - `OR(I0,O0)`: I take it to be the checker's union type of the type parameters `I0` and `O0` (language/checker concept I lack).
  - The skill's `library.md` says no desugaring calls `__bigOperator2`; this entry says tests "run the arm fused". How the fused arm is reached is not explained here (unclear wording; not a contradiction I could resolve).

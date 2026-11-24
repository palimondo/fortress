# Cold read: inference chunk (13 FACTS entries)

Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and term lookups (grep) in `references/compiler.md`, `library.md`, `interpreter.md`, `records.md`. Nothing else was read. Every entry in the file is a fact. "Row N" is read as a row of the gap ledger (records.md, compiler.md use "ledger row N"). "P-N" is a curator decision in POSITIONS that the entry implements ("builds"); its content is not given here, so the entries cannot be checked against it.

---

## F-28 Walk instantiates a generic declaration whose declared return type is `Any`

- **Established:** Walk can instantiate a generic declaration whose declared return type is `Any`. Walk's visitor `MakeInferenceSpecific` handles `Any` as a trait type. The visitor has no case for 11 of the 18 concrete type classes of the syntax tree. Of those 11, only the two dimension forms can appear as a return type, and walk does not build dimensions, so the missing cases cannot be reached from a return type.
- **Conditions:** Return types under walk. The claim that the gap cannot be reached covers return types only. It does not say whether the 11 missing cases can be reached some other way.
- **Consequence:** A generic declaration that returns `Any` is safe under walk. No ledger row is needed for the 11 missing cases, because they cannot be reached from a return type.
- **Evidence:** `tests/GenericReturningAny.fss`; `compile-ladder/rung-walk-dispatch/REPORT.md` section 3.
- **Could not resolve:**
  - "instantiates" (title). The title states a capability but not the result: at what instance does the generic run, and does the return type `Any` take part in the inference? Unclear wording.
  - "treats `Any` as a trait type". It is unclear what this changes in behaviour, or why it explains the title. The link is left implicit. Unclear wording.
  - What happens when one of the 11 missing cases is hit: a crash, `Bottom`, or no instantiation? Unclear wording.

## F-73 The compiled checker infers a generic's static arguments with coercion

- **Established:** Suppose a type parameter is the whole declared type of every parameter it occurs in, as `T` in `pick[\T\](x: T, y: T)`. The compiled checker then sets it to the narrowest type that every argument converts into and that its bound allows. For example, a call with one `ZZ32` and one `ZZ64` argument is set at `ZZ64`. Walk gets the same answer from run-time types (F-137). A declaration that needs coercion ranks below one that needs none. A tie among declarations that need coercion is refused ("Ambiguous coercion"), except in three narrow cases. A tie that differs only at an argument where the call passes a numeral is settled by the checker's reading of the numeral (P-173, F-342). The coercion attempt refuses a call that has an untyped function argument (row 507), and a call with more than 64 combinations of candidate types (row 506).
- **Conditions:** The compiled checker only, except the sentence about walk. The parameter must be the whole type at every place it occurs. Rows 506 and 507 are the limits.
- **Consequence:** A mixed-width call to such a generic gives the same instance on both paths, so a worker need not write the static argument there. Avoid untyped function arguments, and avoid calls with very many candidate types, where the coercion attempt is needed.
- **Evidence:** `compiler_tests/InferCoercionShapes` and `XXXInferAmbiguousCoercion`; `compile-ladder/rung-inference-checker/REPORT.md` section 3.2.
- **Could not resolve:**
  - "outside three narrow cases". The three cases are not named, so a worker cannot tell whether a given tie is refused. Unclear wording, because the information is missing.
  - "the checker's reading of the numeral builds P-173". It does not say what the reading decides, for example the type that the numeral's own default suggests. Unclear wording.
  - "combinations of candidate types". It is unclear what is combined: one candidate per type parameter, or one per argument? Unclear wording.
  - "a type parameter that is the whole type of each parameter it occurs in". This is clear from the example. It may be the "lone" parameter of F-141 and F-137, but the entry does not say so.

## F-78 The compiled checker instantiates an unfixed type parameter at the intersection of its upper bounds, and tries subtyping without the expected type first

- **Established:** If nothing at a call fixes a type parameter, the checker sets it to the intersection of its upper bounds, never to `BottomType`. When the call has an expected type, the checker makes up to four attempts, in this order:
  1. subtyping without the expected type, kept if the result converts to the expected type;
  2. subtyping with the expected type;
  3. coercion with the expected type;
  4. coercion without the expected type.

  Attempts 1 and 3 follow the curator's decision P-49. A worker chose attempts 2 and 4 (decision D4). Attempt 2 accepts a call whose untyped function argument only the expected type fixes (row 507). An argument of intersection type fixes the parameter at the whole intersection (row 541). The run time has no class for an intersection type, so such an instance dies when its class loads (row 559).
- **Conditions:** The compiled checker. The attempt order applies only when an expected type exists. The run-time death applies to instances at intersection types.
- **Consequence:** Attempts 2 and 4 are a worker's choice, not the curator's, and could be revisited. A program meant for the compiled path should not let a generic be instantiated at an intersection type, whether through several bounds or through an intersection-typed argument, because the run fails as the class loads.
- **Evidence:** `compiler_tests/InferResultOnly*` and `InferContextKeepsFit`; `compile-ladder/rung-instance-bound/REPORT.md` sections 1 and 7; decision record D4.
- **Could not resolve:**
  - "such an instance" (row 559). It could mean the instance from row 541 (an intersection-typed argument), or also the instance that the title describes (the intersection of several upper bounds). If it means the second, every generic with two upper bounds and no fixing argument dies at run time on the compiled path. Read two ways; unclear wording.
  - Row 507 appears here as something attempt 2 accepts, and in F-73 as something the coercion attempt refuses. The reader must work out that both are true, and it is unclear whether row 507 is still open. Unclear wording.
  - "kept when the result converts to it". "It" means the expected type. This is resolvable, but it takes a second reading.
  - "BottomType" here and "Bottom" in F-141. They are presumably the same empty type. Minor.

## F-87 The compiled checker gives a call its expected type in many contexts

- **Established:** The checker passes an expected type down to a call in these places: the right-hand side of a typed declaration; a clause of an `if` without `else` (expected type `()`); the last expression of a block after local declarations; a `typecase` clause; a juxtaposition; an operator repeated between three or more operands; a `label` body and each value an `exit` gives the label; and another call's argument, through a retry of the enclosing call (F-221). In a juxtaposition or a repeated operator, the whole expression's expected type goes to the call that the expression becomes. The `label` contexts implement P-50.
- **Conditions:** The compiled checker. Section "The Static Arguments of a Call" of `Specification/basic/inference.tex` lists every context.
- **Consequence:** At these places a generic call, such as a reduction (F-364), can be inferred from context without a written static argument on the compiled path.
- **Evidence:** `compiler_tests/InferResultOnly*` and `Infer*Context`; `compile-ladder/rung-checker-contexts/REPORT.md` section 1.
- **Could not resolve:**
  - "in many contexts, among them ... lists every context". This reads two ways: (a) the checker builds every context that the specification lists, and this entry names only some of them; or (b) the specification lists more contexts than the checker builds. So a worker cannot tell whether a context missing from this list, such as a return expression or a field initializer, gets its expected type. Unclear wording.
  - "the expression's own expected type goes to the application that it makes". This reads as the call that the juxtaposition or the operator chain desugars to. That is plausible, but "application" is not defined in the skill. Partly a language concept.

## F-221 The compiled checker retries a call written as another call's argument

- **Established:** Suppose the enclosing call is not accepted as written. The checker then retypes an inner call, written as its argument, against the parameter type of each declaration of the enclosing call. This implements P-51 under P-49, so a declaration that accepts the call as written is never skipped. A reduction is a call of `__bigOperator` with the big operator as an argument, so the retry gives the big operator the reduction's expected type (F-364). Suppose a multifix declaration accepts a chain `a OPLUS b OPLUS c` only through the retry. Then that multifix declaration runs, not the binary one. Walk gives such an argument no expected type (row 705).
- **Conditions:** Only when the enclosing call fails without the retry. Compiled checker only; walk differs (row 705).
- **Consequence:** An argument can get its static arguments from the enclosing call's parameter type on the compiled path, but not under walk. So a program for both paths should write the static arguments of a generic call nested as an argument whenever the call needs them.
- **Evidence:** `compiler_tests/InferCallArgument*` and `InferBigOperatorExpectedType`; `compile-ladder/rung-argument-context/REPORT.md` sections 1, 5 and 8, and `SKEPTIC.md` finding 5.
- **Could not resolve:**
  - The multifix sentence. "Multifix declaration" (an operator declared over three or more operands, I assume) is not in the skill. It is unclear whether this sentence states an intended rule, a consequence the reader should beware of, or a difference from walk, which might run the binary one. Language concept that I lack, and unclear intent.
  - "against each enclosing declaration's parameter type". This presumably means each overload of the enclosing function, at the argument's position. Resolvable, but terse.

## F-59 `SUM` and `PROD` take their identity from their static argument

- **Established:** `SUM` and `PROD` get their identity (0 or 1) from their static argument. Where none is written, the compiled checker infers it (F-364). The library builds this (P-78) with a witness `typecase`: a `typecase` over a function of type `() -> T`, with one clause for each number type. `SUM e` over a collection `e`, and `x DOT y`, need no static argument. C4 (the flat microGPT program) writes none in its one clause-form sum. That sum is the body of a top-level function declared to return `ZZ32`, so both paths sum at `ZZ32` (walk by F-228). The team's tests and the interpreter's library do write the static argument (F-285).
- **Conditions:** The detail report was measured before P-48 and F-364, so its numbers may be out of date.
- **Consequence:** C4's sum is safe on both paths, because the declared return type fixes `ZZ32`. In the library, write the static argument (library.md agrees).
- **Evidence:** `compiler_tests/WitnessIdentityRungG`; `reviews/sum-replacement-judgement.md` section 5, Table 2 (measured before P-48 and F-364).
- **Could not resolve:**
  - "`SUM e` over a collection `e`, and `x DOT y`, need no static argument". The entry does not say why: does the collection's element type supply the identity, or is the identity not needed? It also does not say on which path. Elsewhere F-364 says no `SUM` needs a written argument for the checker, so this sentence must mean something narrower, such as walk, or the library's own definitions. Read two ways; unclear wording.
  - "clause form". I take it to mean `SUM[j <- g] body`, as opposed to `SUM e`. Not defined in the skill; inferred from the contrast.
  - "witness `typecase`". This is described, but not why a `() -> T` thunk is needed. I take it that the thunk carries `T` without a value, so that an empty reduction still knows its type. It also does not say what happens for a non-number `T`. library.md: `CastError`, row 436. Partly a language concept.
  - "its one clause-form sum". This implies C4 has other sums, in non-clause form. Their status is not stated.

## F-364 The compiled checker instantiates a reduction that writes no static argument by its expected type, else by its body's type

- **Established:** If a reduction with no written static argument is accepted as written, nothing changes. A reduction is accepted as written where the big operator alone has an instance, that is, where its bound is plain or it has no static parameter. Otherwise, or where the result does not convert to the expected type, the checker tries two static arguments in turn: the expected type, then the body's type. It tries each only where it meets the big operator's bound, and keeps the first that is accepted and converts. A call's argument has no expected type where the call is accepted without one (P-51), so a reduction there runs at its body's type. So `SUM`, `PROD`, `BIG MIN` and `BIG MAX` need no written static argument for the checker.
- **Conditions:**
  - At a method's return type, a field, a top-level variable and an assignment, the two paths pick different instances (row 1008).
  - A big operator with two or more static parameters is refused (row 1007).
  - Where the bound names its parameter, a type error in the body is reported as the big operator's refusal (row 1015).
- **Consequence:** For the compiled path alone, the static argument can be left out. A program for both paths must write it at a method return, a field, a top-level variable and an assignment. When a reduction is refused, suspect the body (row 1015).
- **Evidence:** `compiler_tests/InferBigOperatorSelfBound`; `compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 1, row 731: the reduction".
- **Could not resolve:**
  - "plain bound". I read it as a bound that does not name the parameter itself, unlike `T extends AdditiveGroup[\T\]`. Inferred from the contrast with "the bound names its parameter", and from F-285's "plain-bounded". Not defined; minor.
  - "the big operator alone has an instance". I read it as: the big operator's static parameter can be set from its bound alone. Unclear wording, but resolvable through the parenthesis that follows.

## F-365 The compiled checker instantiates a reference to a generic function by the arrow type that receives it

- **Established:** Take a name with a single declaration that has static parameters. Where it is referenced without static arguments at a place that expects an arrow type, the checker instantiates it from that arrow type. As a call's argument, it is retyped in the retry (F-221). A static parameter that the arrow type's domain does not fix, such as one that only the return type mentions, is refused with a message that names it. Applying the value of an untyped binding is refused.
  - Refused or stopped: a name with several declarations of which one is generic (row 1009); an untyped binding that is never applied (row 1010).
  - Accepted, then dead at run time: a reference where the expected type is not an arrow type, such as a parameter of type `Any` (row 1012); a generic trait's functional method passed as a value inside the trait (row 1013).
  - Not compiled by any test: the model's row lift `rows(rmsn, x)`, where the generic callee's other argument fixes the sizes.
- **Conditions:** One declaration, no static arguments written, an arrow type expected.
- **Consequence:** On the compiled path, pass a generic function only at a fully determining arrow type, and give it a single declaration. Do not pass it at `Any`, and do not bind it untyped. Whether the model's row lift compiles is unknown.
- **Evidence:** `compiler_tests/*GenericFunctionAsValue*Compiled`; `compile-ladder/rung-static-argument-inferred/REPORT.md`, "Step 2, row 758".
- **Could not resolve:**
  - "The applied value of an untyped binding is refused", beside "an untyped binding never applied (row 1010)" under "Refused or stopped". Together they suggest every untyped binding of a generic function fails, whether applied or not. But which outcome is a refusal (a type error) and which a "stop" (a crash or a code-generator wall)? "Refused or stopped" does not pair outcomes with rows. Unclear wording.
  - "untyped binding". I take it to mean `f = g` with no type annotation. Not defined.
  - The row-lift sentence. It does not say whether the checker is expected to accept the row lift by the retry rule, or whether this is an open risk for compiling microGPT. "rmsn" is a model function that is not explained (presumably RMS norm). Unclear wording for the consequence.

## F-367 Under walk, a generic function is a value, received at the arrow type of its parameter or variable

- **Established:** Under walk, three places receive a generic function as the instance that a direct call with arguments of the arrow's domain types would run:
  - a parameter;
  - a local variable declared with an arrow type;
  - a variable of arrow type at an assignment, including a mutable top-level variable.

  A generic callee's static parameters are fixed by its other arguments first, so `rows(rmsn, x)` runs with `rmsn` at the right sizes. At an open arrow type, at `Any`, at a type parameter and at an untyped place, the value stays generic, and each application infers its own static arguments (row 1021). Of these places, the compiled checker refuses the open arrow type and the untyped place, and accepts `Any`, whose compiled run dies (row 1012). An overloaded name's value keeps its generic declarations, so `pick(twice)` runs the `pick` declared over an arrow type, not `pick(x: Any)`. No test pins this.
- **Conditions:** Walk. Defects: an immutable top-level variable keeps the generic value (row 1019); a callee's type parameter that only a value's run-time type fixes refuses the function (row 1018); a function declared in a block with its own static parameters does not run, whether called or passed (row 1020).
- **Consequence:** The model's row lift works under walk. For both paths, pass generic functions at closed arrow types. Do not declare generic local functions. Do not depend on immutable top-level variables of arrow type being instantiated.
- **Evidence:** `tests/GenericFunctionAsValueWalk`, `GenericFunctionRowLiftWalk`, `GenericFunctionAssignedWalk`; `compile-ladder/rung-generic-function-value/REPORT.md`, "The rule as built".
- **Could not resolve:**
  - Row 1021. It is unclear whether the value staying generic is a defect or the intended rule, since it is not listed under "Defects". Read two ways; unclear wording.
  - "a callee's type parameter that only a value's run-time type fixes refuses the function". Who refuses: dispatch at the call? And "the function" means the generic function passed as a value? Unclear wording.
  - The `pick(twice)` example. It does not say what `twice` is (an overloaded name with generic declarations, presumably), or why that matters for choosing the overload of `pick`. Unclear wording.

## F-141 Under walk, a type parameter that nothing at a call fixes takes its declared bound

- **Established:** Under walk, a type parameter that nothing at a call fixes takes its declared bound. A "lone" parameter (F-137) with no narrowest candidate takes its bound where every argument is below the bound, and otherwise the arguments' join.
  - A parameter that the parameter types mention only in function domains, an odd number of arrows deep and never inside a static argument (contravariant), is bounded by the arguments only from above. With nothing from below, it takes the meet of its declared bound and those upper bounds.
  - An F-bounded parameter stays open (F-143).
  - A parameter that only another fixed parameter's bound mentions takes that parameter's instance (row 592).
  - A lone parameter whose bound mentions a static parameter takes the arguments' narrowest common supertype, never its bound.
- **Conditions:** Walk. Two of these defaults are a worker's choice (D3, D5); the rest implement P-48. Expected-failure defects:
  - bounds walk cannot meet: two bounds (row 591), and two upper bounds from two function arguments (row 616);
  - `Bottom` kept for a parameter bounded only from above whose bound mentions another static parameter (row 612);
  - `Bottom` kept for a parameter that only an untyped function expression's result fixes (row 587);
  - a generic passed over at dispatch when its arguments have several minimal common supertypes (row 589). A repair of this would change which declaration runs.
- **Consequence:** A worker can predict walk's instance for unfixed or contravariant parameters. In the defect cases, write the static arguments.
- **Evidence:** `tests/Infer*Walk.fss`; `compile-ladder/rung-walk-instance/REPORT.md` section 2; `compile-ladder/rung-walk-meet/REPORT.md` section 1; decision record D3 and D5.
- **Could not resolve:**
  - "lone" (F-137). It is not defined here or in the skill. It may be F-73's "whole type of each parameter it occurs in". Unclear wording; it depends on another entry.
  - "no narrowest candidate". Candidate for what: the narrowest type that all arguments convert into, as in F-73? Unclear wording.
  - "takes its bound where every argument is below it, else the arguments' join", against "takes its arguments' narrowest common supertype, never its bound". It is unclear whether "join" and "narrowest common supertype" are the same thing (the skill defines join as the least common supertype). The two sentences read as different rules for subtly different cases, and the difference is hard to state. Unclear wording.
  - "A worker chose two defaults (D3 and D5)". It does not say which of the listed rules they are, so a worker cannot tell which rules are the curator's (P-48) and which are open to revision. Unclear wording, because the information is missing.
  - "F-bounded". The skill describes it as a bound that names the parameter itself. Resolved.
  - "two bounds (row 591)". This presumably means a parameter declared with two bounds. Unclear wording.

## F-242 `SUM`'s fusion pairs with `MAX` and `MIN` hold no site of the distance

- **Established:** The library code that lets `SUM` fuse with `MAX` or `MIN` causes no compiled-checker error in the distance stage. `SumReduction` has two `distribute` overloads with `where` conditions. `SumReduction` also inherits `ActualReduction`'s generic `distribute`, which answers over its own static parameter `K`. Through these, `Generator2` computes the maximum or minimum of sums in one pass. The `where` conditions give `T` the bound that `MaxReduction` or `MinReduction` needs. The overloads answer a pair over `Maybe[\T\]`, which the generic's `PossibleReductionPair[\K\]` return type admits under the Return Type Rule (F-75). The team's commented `PossibleReductionPair[\R\]` would move the errors onto the generic. The fusion is kept (P-151).
- **Conditions:** The distance stage's components, and the current form of these declarations.
- **Consequence:** Do not change these overloads to the commented `[\R\]` form, and do not remove the fusion (P-151).
- **Evidence:** "F-250 gives the test". No test is named in this entry. `perf-probes/where-clauses/REPORT.md` A.1 and A.2.1; `perf-probes/generic-distribute/REPORT.md` sections 3 and 4.
- **Could not resolve:**
  - "hold no site of the distance". From compiler.md, I read the distance as the distance stage's error count, and a site as a place where an error is reported. The phrase is jargon; resolved only by inference.
  - "fusion" and "fused pair". These are not in the skill. I read fusion as combining an outer reduction with an inner one (`BIG MAX` of `SUM`s) through `distribute`, in one pass. Language and library concept that I lack.
  - `distribute`, `ActualReduction`, `Generator2`, `PossibleReductionPair` and their roles are not explained in the skill. library.md also says no desugaring calls `__bigOperator2`, which leaves open how `Generator2` is reached. Library concept that I lack.
  - "the team's commented `PossibleReductionPair[\R\]`". This could mean a commented-out alternative, or a declaration with a comment. Read two ways.
  - "would move the errors to the generic". Which errors? The title says there are none now. Presumably the alternative would create errors in the generic `distribute`. Unclear wording.

## F-248 Under walk, the team's generic `distribute` over `K`, with no `distribute(r: Any)` beside it, keeps every fused answer

- **Established:** Under walk, the generic `distribute` over `K` gives the same results for every fused reduction, with no catch-all `distribute(r: Any)` overload. A nested reduction with no fused pair also runs. `GeneratorDeclarations` and microGPT's quick pair keep their answers. `MAX` and `MIN` over `SUM`, and `SUM` over `PROD`, still fuse. A `SUM` of `SUM`s over a generator of generators runs, because walk infers a generic method's static arguments (F-253). Writing `r.distribute[\L1\](q)` explicitly stops every fused pair (row 744).
- **Conditions:** Walk.
- **Consequence:** Leave the generic `distribute` without an explicit static argument at its call, and do not add a `distribute(r: Any)` overload.
- **Evidence:** `tests/NestedReductionFusion`; `GeneratorDeclarations` and the quick pair, as named. No "Gated by" line. `perf-probes/generic-distribute/REPORT.md` section 5.
- **Could not resolve:**
  - "with no `distribute(r: Any)` beside it". It is unclear whether this describes the present library (such an overload was removed or never existed), or a variant that was tested. Read two ways.
  - "stops every fused pair" (row 744). It could mean the fusion is no longer used (correct results, slower) or that fused pairs fail. Read two ways; unclear wording.
  - "keeps every fused answer". Keeps compared with what: with a version that had the `Any` overload? Unclear wording.
  - It is unclear whether the explicit `r.distribute[\L1\](q)` is in the library today or was only a probe. Unclear wording.
  - "fused" and "fusion": the same lacking concept as in F-242.

## F-285 In the components that the distance checks, the interpreter's library writes the static argument of every reduction whose bound names its parameter

- **Established:** In the fourteen components that the distance stage checks, the interpreter's library writes the static argument in three kinds of place:
  - every clause-form reduction whose big operator's bound names its parameter (per P-78);
  - every list comprehension;
  - each `cond` call in `Condition`'s methods.

  `__bigOperator2`'s fused arm casts its result to `O0`. The unwritten ones are reductions over plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, or over `BIG LEXICO`, which has no static parameter. The checker could infer the unwritten arguments (F-364), but the sites stay written. A `cond` call writes the call's result type, such as `cond[\Maybe[\G\]\]`, because its branches answer a `Maybe`, a `Condition` or a `Generator`. The fused arm uses the library's cast for an arm whose type a `typecase` cannot show (F-264). So these declarations give no error site in the distance stage (F-53).
- **Conditions:** Only the components that the distance stage checks. `PureList`, outside them, writes none at its strided subscript. Under walk, that subscript answers a list of objects at their elements' run-time types (row 824).
- **Consequence:** Keep the written static arguments; do not remove them because the checker could infer them. When adding such a reduction, comprehension or `cond` call to these components, write its static argument. `PureList`'s strided subscript is a known gap.
- **Evidence:** the distance stage; `tests/WrittenReductionArgumentsWalk`, `GeneratorDeclarations`; `compile-ladder/rung-body-arguments/REPORT.md`; `compile-ladder/rung-generator-slips/REPORT.md` section 5.
- **Could not resolve:**
  - "`O0`". This is presumably a static parameter of `__bigOperator2`, but it is not explained. Unclear wording.
  - "fused arm". This presumably means the branch of `__bigOperator2` that handles a fused pair. Library concept that I lack (see F-242). library.md says no desugaring calls `__bigOperator2`, so it is unclear when that arm runs.
  - "an arm whose type a `typecase` cannot show". This is unclear: does it mean the type cannot be established by a `typecase` clause? Unclear wording.
  - "`cond`" and "`Condition`". These are library names that the skill does not explain. Library concept.
  - "answers a list of objects at their elements' run-time types" (row 824). This implies the list's element type is wrong, the join of run-time types instead of the declared element type. It is stated obliquely; unclear wording.

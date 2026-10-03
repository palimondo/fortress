# Decision record: the paper's instance rule under walk (rung W, climb batch 9)

This is the decision record the S1 form asks for (`explorations/coordinator/POSITIONS.md`, "The S1 form"): each revised passage, what it said, what it says now, why, and the way back; and the decisions taken inside the rung, each with the alternatives considered and the evidence that settled it. Appendix I's entry "The inference of a call's static arguments" (`Specification/appendices/changes.tex`, `\seclabel{revival-inference}`) names this file. The base is `fa14a190c`. The rung's report is `explorations/compile-ladder/rung-walk-instance/REPORT.md`.

The decisions this rung carries out, from POSITIONS.md:
- **A type parameter the arguments do not fix takes its bound, never `Bottom` (the paper's instance rule).** "such a parameter takes the intersection of its upper bounds, its declared bound (`Any` if none) under the constraint of the call's static return type; never `Bottom`, never the union of the arguments' types, never the value's type alone." Its last sentence: "Later: a walk rung for row 424". Walk has no static return type, so only the declared bound (`explorations/reviews/decisions-review/popl-recheck.md`, section 1.8).
- **The implicit bound of an unbounded type parameter is `Any`.**
- **Walk chooses coercions on the value, for now** and **Conversions never change which declaration runs**: this rung changes the instance a chosen declaration runs at, not which declaration runs and not which coercion walk applies.
- **`SUM` and `PROD` without the `Number` catch-all**: a clause form whose element type nothing fixes writes its static argument; teaching walk the unwritten one is later work, under the batch record's P1, which is not answered for this run.
- **Every change to the specification is recorded with its reason** and **The S1 form**.

## 1. The passages revised

### 1.1 The interpreter's box in "The Static Arguments of a Call" (`Specification/basic/inference.tex`, the `\revision{revival-inference}` after the example of `op`)

- Before: "Where no argument's type is the narrowest, it binds a type parameter that is the whole type of parameters to the narrowest named common supertype of the arguments' run-time types that the bounds permit: that is the bound where the bound is that supertype, as `Number` is for a `ZZ64` and an `RR64`, and not for a type parameter declared without an `extends` clause, to which this chapter gives `Any` (row 516 of the revival's gap ledger). It does not yet fix a type parameter by the expected type."
- Now: where neither an argument's type nor a type into which the arguments convert is the narrowest, the interpreter gives such a type parameter its declared bound, `Any` if it has none, as the chapter does (`Number` for a `ZZ64` and an `RR64` where that is the bound, `Any` without an `extends` clause); it does the same where the arguments that fix a type parameter inside other types have several minimal common supertypes; when its dispatch chooses among declarations it passes over a declaration with static parameters whose arguments have several minimal common supertypes in favour of any other applicable without coercion (row 589); it does not yet fix a type parameter by the expected type, and it instantiates at `BottomType` a type parameter that an argument bounds only from above (row 588). The sentences before and after are unchanged.
- Why: the box describes walk, and walk changed (rows 516 and 555). The two departures named are measured in this rung and gated by expected failures (`ProjectFortress/tests/XXXDispatchTwoCommonParentsWalk.fss`, `XXXInferContravariantWalk.fss`).
- Way back: restore the quoted sentences; walk's change is then undescribed.

### 1.2 The box after the chapter's list of what it does not yet describe

- Before: "The interpreter erases a type parameter that nothing at a call fixes, of a function, to `BottomType`, and leaves a generic method's uninstantiated (rows 21 and 424 of the revival's gap ledger)."
- Now: the interpreter instantiates a type parameter of a function that nothing at a call fixes at its bound, `Any` if it has none, and one whose bound mentions other static parameters at that bound with their instances; it still erases to `BottomType` a type parameter whose bound mentions the type parameter itself, as the big operators `SUM` and `PROD` declare theirs, and the static parameters of a big operator that a reduction or a comprehension invokes without its static arguments, a comprehension's collection being then built at the type of its elements (row 424); it gives a function expression that declares no return type the return type `BottomType`, so that a type parameter that only its result fixes is instantiated there (row 587); and it leaves a generic method's static parameters uninstantiated (row 21).
- Why: the decision's "Later: a walk rung for row 424" is this rung; the box must say what walk does once built, and name exactly what it still erases, since each of the three is a decision of this rung (section 2, D2 and D3) or a departure measured here.
- Way back: restore the quoted sentence.

### 1.3 Appendix I, the entry "The inference of a call's static arguments"

- Change: one paragraph after the paragraph on the box after the list: "A later revision of the interpreter changes both boxes on it", quoting what each box said and saying what it says now.
- Rationale: the decision of 29 September 2026 provided that the interpreter follow the same rule where it instantiates a declaration, from the run-time types of the arguments, with no static return type to add; what it still erases is of two kinds, a type parameter whose bound mentions itself (outside the paper's calculus, p. 11:11, and not yet decided) and a big operator's static parameter that a reduction or a comprehension does not write (the element type of a reduction, which the chapter does not yet describe); the reasoning is this file.
- Effect: under the interpreter a type parameter nothing fixes runs at its bound where it ran at `BottomType`, one with no narrowest candidate at its bound where it ran at the arguments' narrowest named common supertype, and a call whose arguments have several minimal common supertypes runs where it stopped the interpreter.
- Way back: delete those sentences with 1.1 and 1.2.

The team's draft note at the chapter's end is untouched; no normative sentence of the chapter changes. `Specification-1.0-frozen/` is untouched.

## 2. The decisions taken inside the rung

### D1. Where the bound replaces `BottomType`: at instantiation only, never when a declaration is chosen

- Candidates: (a) everywhere walk unifies, including the unification `OverloadedFunction.bestMatchInternal` uses to choose a declaration (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1181`) and the symbolic instantiation `instanceHolding` that compares declarations (`:1296`); (b) only where walk instantiates the declaration a call runs, `EvaluatorBase.inferAndInstantiateGenericFunction` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:61`).
- Chosen: (b). `inferByUnification` keeps its public form for choosing and comparing, with the base's behaviour; the instantiation passes `bounded` (`EvaluatorBase.java:530`, `:570`, `:730`).
- Evidence: the record's stop "A change to which declaration walk chooses"; under (a) the bounding map's join would also have changed which overloads `bestMatchInternal` keeps and what `declaredBelow` answers at load, rung K's ground. The first attempt on this branch (`2b734f9cb`) made the lattice's join answer `Any` globally (`TypeLatticeOps.join`); on that build `g[\T\](a: T, b: T)` beside `g(a: Any, b: Any)` ran the generic for an `Apple` and a `Cherry` where the base runs the plain one (`XXXDispatchTwoCommonParentsWalk.fss` reported "Missing expected failure", REPORT.md section 5.2). The base's answer is wrong by the chapter's "Choice" paragraph, and the repair is a change of which declaration runs: it is gated as an expected failure and its row (589) is for Pavol. `TypeLatticeOps.java` is back to the base.
- Cost: an overloaded set walk chooses from still passes over such a generic when another declaration applies without coercion. Where none does, the coercion pass (`OverloadedFunction.bestMatchWithCoercion`, `:1106-1111`), which calls the instantiation, now finds the generic applicable at its bound: `either(Apple, Cherry)` beside `either(a: ZZ32, b: ZZ32)` runs the generic, where the base failed to find a matching overload (`InferTwoCommonParentsWalk.fss`). This is reported as a stop met (REPORT.md section 8).

### D2. A big operator's static parameters keep `BottomType`

- Candidates: (a) the record's line, every type parameter nothing fixes whose bound does not mention it takes its bound, big operators included; (b) a big operator's static parameters, which a reduction or a comprehension leaves to its generator clauses, keep walk's `BottomType`.
- Chosen: (b) (`EvaluatorBase.java:140`, `bigOperator`; `:156-191`, `instanceOf`).
- Evidence: under (a), on `b037c7426`, the interpreter suite failed six tests, `ResultBoundsRungB`, `RangePrototype`, `CovariantTest`, `MapTest`, `QuickCheckTest` and `booleanGuard` (REPORT.md section 6.1). The trace names the declarations: `List`'s `opr BIG <|[\T extends Object\]|>()` (`Library/List.fss:177`), `Map`'s `BIG {|->}`, `BIG UPLUS` and `BIG CUP` (`Library/Map.fss:191`, `:197`, `:203`). From `BottomType` the one library builds a comprehension's collection at the type of its elements; from the bound it builds `ArrayList[\Object\]` or `NodeMap[\Any,Any\]`, which a binding `List[\Number\]` then refuses ("RHS expression type ArrayList[\Object\] is not assignable to LHS type List[\Number\]", `CovariantTest.fss:28`). The chapter itself lists "the element type of a reduction that only its generator clauses determine" as not yet described and says the rule gives the big operator's parameter its bounds, "not the type of the elements" (`Specification/basic/inference.tex`, the list after "A Numeral Whose Conversions Tie"). The type-directed desugaring (`Specification/advanced/parallelism-locality/defining-generators.tex`, `SUM[\N\]` for the type `N` of the expression) is what walk approximates with `BottomType`, and it is the territory of the record's P1 and of rows 424 and 425.
- Cost: a big operator called directly with nothing to fix its parameter still runs at `BottomType` under walk. No program in the corpora or the library calls one so (the suite's trace on `0244b0ce4` records none).

### D3. A type parameter that a bound of a fixed parameter mentions counts as fixed

- Candidates: (a) the chapter's literal reading: a type parameter that no parameter's declared type mentions is fixed by nothing and takes its bound; (b) the arguments fix it when they fix a parameter whose bound mentions it, as `A extends T` bounds `T` from below once `A` is fixed.
- Chosen: (b) (`EvaluatorBase.java:194`, `fixedThroughBounds`).
- Evidence: `CovariantCollection`'s `opr APPCOV[\T, A extends T, B extends T\](a: CovariantCollection[\A\], b: CovariantCollection[\B\]): CovariantCollection[\T\]` (`Library/CovariantCollection.fss:27`): with D2 alone, `booleanGuard` and `RangePrototype` still failed, `ArrayList[\Any\]` where the elements are `Int` (REPORT.md section 6.1), because `APPCOV` of two empty collections, `Empty[\BOTTOM\]`, took `T` at `Any`. Walk's recheck of `A`'s and `B`'s bounds joins their instances into `T` (`EvaluatorBase.java:391-395`), so `T` has the arguments' lower bound, `BottomType` here only because the arguments are collections D2 leaves at `BottomType`. The paper's calculus admits no method type parameter in an upper bound (`research/extracts/ParkPOPL2019-extract.md`, section 4.2, p. 11:11), so it says nothing of `A extends T`.
- Cost: none measured; the suite on `0244b0ce4` passes.

### D4. A type parameter whose bound mentions another static parameter, but not itself

- Candidates: (a) leave it at `BottomType`, with the F-bounded case, as the machinery that checks such bounds after binding (`rechecks`) did; (b) take the bound at the other parameters' instances where they are not `BottomType`.
- Chosen: (b) (`EvaluatorBase.java:217`, `boundAtInstances`): `mkB[\T extends Number, U extends BoxU[\T\]\]()` gives `U` the instance `BoxU[\Number\]` (`InferUnfixedBoundWalk.fss`).
- Evidence: the record defines this rung's half of row 424 as a parameter "whose bound does not mention it", which includes this case, and the chapter's rule gives "its declared bound". A bound that mentions a parameter whose instance is `BottomType` (an F-bounded one, unfixed) is left alone, so the F-bounded case does not move.

### D5. The candidates of a lone type parameter

- Chosen: the arguments' types, the types they coerce to and the declared bounds, without the arguments' supertypes, for a type parameter whose bounds mention no static parameter; with no narrowest among them, its bound where every argument's type is a subtype of it (`EvaluatorBase.java:369-373`, `narrowest` at `:458-464`). An F-bounded lone parameter keeps the supertypes, as rung K built it (`compile-ladder/rung-inference-walk/REPORT.md`, decision B).
- Evidence: the chapter's candidate set (`Specification/basic/inference.tex:76-94`); row 516's walk half names the supertypes at `narrowest` as the cause. Keeping the supertypes for the F-bounded case keeps that case unchanged without P1.

### D6. A join of several minimal common supertypes

- Candidates: the minimal supertypes' intersection; the parameter's bound (row 555's "Fix, for a walk rung").
- Chosen: the bound, `Any` if none, where both types lie under it (`EvaluatorBase.java:103-127`, `BoundingIntervals` with `bounded`); without `bounded` the lattice's join decides as on the base (D1). Walk has no intersection type to instantiate at, and the decision gives the bound.

### D7. Row 567: where walk instantiates a generic functional method

- Found: walk registered every functional method of a trait without static parameters, or of a generic trait's instance, as a plain `FunctionalMethod` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObjectOrGeneric.java:121`), and a generic trait's as a `GenericFunctionalMethod` generic in the trait's parameters alone (`values/GenericFunctionalMethod.java`, `getStaticParams`), so the method's own `R` was never bound: "Missing type R" (`BaseEnv.java:374`).
- Chosen: a functional method with static parameters of its own is a `GenericFunctionalMethod.Own` (`GenericFunctionalMethod.java:151`), generic in them; a generic trait's is generic in the trait's parameters then its own (`:105`); an instance at its own arguments finds the receiver's method by the dotted route and applies its generator at them (`OwnClosure`, `:72-98`), as a dotted call of the same generic method already runs on the base (REPORT.md section 5.4).
- The files: `GenericFunctionalMethod.java` and the registration line in `FTraitOrObjectOrGeneric.java`, both named here as the file of walk's generic-method instantiation the record leaves the rung to name. Neither is `OverloadedFunction.java` nor `BuildEnvironments.java`.

### D8. A trace of the instances that moved

- Chosen: a system property, `fortress.inference.trace`, naming a file to which walk appends each instance the bound rules give in place of the earlier one (`EvaluatorBase.java:73`); inert when unset.
- Alternatives: comparing the suite's outputs before and after, which the batch prefix rules out; a trace removed before landing, so that the suite would have run on code other than the landed code.
- Evidence: the record asks for "every generic call whose instance moved, each with its before and after" from the suite run (REPORT.md section 6.2).

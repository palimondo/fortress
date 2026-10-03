# Rung W of climb batch 10: decision record

Walk's load check gains the Meet Rule for Functional Methods per providing type (row 544) and the restriction on a single parameter written bounded by `Any` (row 534); a type parameter that an argument bounds only from above takes the upper end of its interval (row 588). P1 is not answered, so the F-bounded case is untouched. Each decision below names the alternatives and what settled it. The evidence is in `REPORT.md` of this directory.

## 1. The passages revised

All in the S1 form, the revival's own callouts revised in place and Appendix I's entries recording the old sentences.

| passage | before | after | why |
|---|---|---|---|
| `Specification/basic/inference.tex`, section "The Static Arguments of a Call", the interpreter's box | "it instantiates at BottomType a type parameter that an argument bounds only from above, as a function argument bounds the type parameter of its parameter type (row 588 ...)" | such a type parameter is instantiated at the intersection of the upper bounds its declared bound and the arguments place on it, `ZZ32` and `Number` as examples; one whose bound mentions a static parameter or that has several bounds walk cannot meet still at `BottomType` | row 588 repaired; the two exceptions measured (`REPORT.md` section 4.3) |
| `Specification/basic/expressions/reductions.tex`, section "Summations and Other Reduction Expressions", the callout | both implementations "each take BottomType" for a big operator's static parameter that no argument fixes (rows 424 and 425) | walk takes `BottomType` (row 424); the compiled checker takes the parameter's bound, which gives the reduction the type of a plain bound and no applicable instance for an F-bounded one (row 425) | the checker's half has been false since batch 8's rung I (row 425's note); walk's half is unchanged, P1 not answered |
| `Specification/appendices/changes.tex`, entry "The inference of a call's static arguments" | Change: the box "now says ... that it instantiates at BottomType ..."; Rationale: row 588 among the defects; Effect: no sentence on it | Change: "until 3 October 2026" on the old clause and a paragraph quoting it and saying what the box now says; Rationale: the defect moved to a sentence on what changed and the two exceptions; Effect: one sentence | the entry's sentences on the box became false |
| `Specification/appendices/changes.tex`, entry "Reductions whose element type nothing fixes" | Rationale: "The interpreter, and the compiled type checker ..., each take BottomType" | Change quotes the box's old sentence and says what it now says; Rationale splits the two implementations | twin of the callout |

Route back for each: restore the quoted sentence; the code change is the only reason for the new text.

## 2. Decisions

### W1. Where the Meet Rule check for functional methods runs

- Chosen: `BuildEnvironments.checkComprisesClauses` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1066-1072`), which `Driver.evalComponent` calls once with every unit after the types are built, now also runs `OverloadedFunction.FunctionalMethodMeets` over every trait and object without static parameters of every component (`BuildEnvironments.java:1206-1213`).
- Considered: `OverloadedFunction.finishInitializingSecondPart`, per overload set. It sees the two declarations but no type that provides both, and the rule is about such types; walk's own comment there leaves the case to "the object level" (`OverloadedFunction.java:429-436` at the base), which no code implemented.
- Considered: `FTraitOrObjectOrGeneric.finishFunctionalMethods`, which `Driver` calls per type and environment. It would need a hook in `Driver.java`, outside `interpreter/evaluator/` (a stop), or a per-environment de-duplication.
- Settled by: one call site already in place, inside the files the section names.

### W2. What a type provides

- Chosen: the traits chapter's reading (`Specification/basic/traits.tex`, section "Method Declarations", `:518-527` and `:585-595`). A type provides the functional methods it declares and those it inherits: those its immediate supertypes provide, except one that a declaration of its own with the modifier `override` overrides (same name, self at the same position, parameter types but self's strictly below), and one whose parameter types but self's equal a declaration of its own at the same self position (`OverloadedFunction.java:1166-1235`).
- Considered: every declaration of every supertype, as the compiled checker reads them (`STypesUtil.gatherMethods`, `scala_src/useful/STypesUtil.scala:1595-1613`). That was the first build (`f0cef8d83`). Its suite run refused the team's `tests/disp0.fss` at load, whose `object B` declares `override f(self, other: Number)` over `A`'s `f(self, other: ZZ32)` (`REPORT.md` section 5.1).
- The equal-parameter clause does not say "the self parameter at the same position"; the override clause does, and so does the checker's `removeIdenticallyCoveredMethods` (`STypesUtil.scala:1528-1551`). It is read at the same position, a decision.
- Consequence: the compiled checker refuses `disp0` (`REPORT.md` section 5.1), so walk and the checker now differ there and the text favours walk. Provisional row W-a.

### W3. Which names

- Chosen: the names the compiled checker checks, `OverloadingChecker.isDeclaredName` (`scala_src/typechecker/OverloadingChecker.scala:647-651`): identifiers, and operators whose names `NodeUtil.validOp` admits (`OverloadedFunction.java:1237-1241`). Symbolic operators are skipped, as the checker skips them (row 584).
- Considered: every name, as the specification asks. A development build that logged instead of refusing found five library sites refused, all symbolic: `EmptyString`'s `||` against `Concatenable`'s (`Library/String.fss:275`), and `CompactFullRange2D` and `CompactFullRange3D` each providing `|_|` from `CompactFullRange` and from `FullRange2D`/`FullRange3D` and `DelegatedIndexed` (`Library/RangeInternals.fss:1130`, `:1161`). A library type refused at load is a stop, and row 585 makes String's families Pavol's question.
- Settled by: the manifest's "as the checker applies them", and the stop. The five sites go to provisional row W-b.

### W4. Which providers

- Chosen: traits and objects without static parameters, declared in any component of the program, the one library among them. Their generic supertypes are read through their instances.
- Not checked: a generic trait or object as the provider (its non-generic extenders are checked; `PrGenericProvider` is refused at `Vo`, not at `V[\X\]`); an object expression (the class of rows 570 and 597).
- Considered: generic declarations at a symbolic instance. Walk has no such machinery at load, and the instances walk makes at load are only those the program names.

### W5. The meet, the cover and what is not settled

- A pair needs a meet when, position by position, neither parameter list is below the other and no position excludes (`OverloadedFunction.java:1244-1262`).
- Candidates: declarations the type provides with self at the same position, whose self type is below both declaring types and whose other parameter types are below both. The self position is compared as a dotted method's receiver, as the checker's `withoutSelf` does (`OverloadingChecker.scala:584-586`). The overlap of the other positions is cut by `overlapPieces` (`OverloadedFunction.java:1023`) and each part must lie inside one candidate (`meetProvided`, `:1268-1320`). An exact meet is the one-part case.
- Unreadable parameter types (own static parameters, varargs, keyword parameters, a type walk cannot evaluate) and an overlap search that does not settle are not refused. Considered: refusing them, as `overlapCovered` does. But that code runs only after the parameter-by-parameter check has refused; a new refusal that refused what it cannot settle could refuse library types.

### W6. The naked-`Any` restriction

- Chosen: in `finishInitializingSecondPart`, a set of two or more refuses a function that is not a method or functional method, has one parameter, neither varargs nor keyword, declared as one of its own type parameters whose `extends` clause holds `Any` written (`OverloadedFunction.java:256-259`, `:635-654`). That is `checkBoundAny`'s condition (`OverloadingChecker.scala:484-490`, called at `:426`).
- The message is the checker's words, which the test's key names.
- An unbounded type parameter has an empty `extends` clause, so the implicit bound does not count (`tests/OverloadSingleParamUnbounded.fss`; POSITIONS, "The implicit bound of an unbounded type parameter is `Any`").

### W7. Which type parameters an argument bounds only from above

- Chosen: structurally. The declared types of the parameters mention the type parameter only at negative polarity, an odd number of arrow domains deep, and never inside a static argument (`EvaluatorBase.java:202-240`). Such a parameter, unless it is in `rechecks` or belongs to a big operator, takes `boundOf`, its interval's upper end, where its lower end is `BottomType` (`:173-177`).
- Considered: recording at run time which keys an argument joined into from below (`BoundingIntervals.joinPut`). Rejected: unification in a contravariant position goes through the dual map (`useful/LatticeIntervalMapDual.java`), which bypasses the override, and backtracking (`FType.unify`, `abm.assign`) leaves stale marks.
- Precedent: the team's `MakeInferenceSpecific` clamps a type parameter in a contravariant position of the return type to its most general bound (`interpreter/evaluator/MakeInferenceSpecific.java:81-88`).
- Rule: the paper's solving step, the intersection of the upper bounds (`research/extracts/ParkPOPL2019-extract.md`, section 4.2; POSITIONS, "A type parameter the arguments do not fix takes its bound, never `Bottom`").

### W8. What row 588's repair leaves

Two shapes keep `BottomType`.

- A type parameter bounded only from above whose bound mentions another static parameter, as `coS[\S, T extends S\](g: T -> ZZ32, s: S)`. It is in `rechecks`, and walk cannot evaluate its bound before the instances are known. Gated by `tests/XXXInferAboveBoundMentionsParamWalk.fss` (home 2), provisional row W-c.
  - Considered: extending `instanceOf`'s second loop (`boundAtInstances`) to such parameters, met with the arguments' upper end. That would have meant a third code state and a second whole-suite run after the first was complete; the case is the same exception the box already names for every bound rule of walk.
- One declared with several bounds walk cannot meet: row 591's mechanism, now noted there.

### W9. The D5 pin

`tests/InferLoneBoundMentionsParamWalk.fss` asserts today's values. Over `Apple, Pear, Pear`, `S` and `T` are `Fruit`; over `Apple, Cherry, Apple`, both are `Any`. It passes on the base and on the edit. The chapter is silent on whether a call's type parameters are solved jointly (home 3, provisional row W-d).

### W10. A defect met on the way: an override declared in a trait

Walk runs the overridden declaration for an object below a trait whose `override` overrides it, for functional and dotted methods alike: `tag(Wo, 3)` gives 1 where `W` overrides `S`'s `tag`. In an object the override works (`disp0`). The traits chapter settles it, so its home is 2: `tests/XXXOverrideInTraitWalk.fss`, provisional row W-e. Walk's dispatch is not this rung's file, so it is not repaired here.

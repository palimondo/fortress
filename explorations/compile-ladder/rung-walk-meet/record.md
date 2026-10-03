# Rung W of climb batch 10: record lines

## FACTS entry

- **Walk applies at load the Meet Rule for Functional Methods per providing type and the restriction on a single parameter written bounded by `Any`, and a type parameter an argument bounds only from above takes its interval's upper end** (`compile-ladder/rung-walk-meet/REPORT.md`; rows 544, 534, 588 fixed).
  - **Meet Rule.** `BuildEnvironments.checkComprisesClauses` runs `OverloadedFunction.FunctionalMethodMeets` over every trait and object without static parameters of every component. A type provides what it declares and what it inherits by the traits chapter: an `override` declaration's overridden ones, and those whose parameter types but self's equal its own, are not inherited. Each overlapping pair needs a provided meet or cover. Only the names the compiled checker checks are read, so symbolic operators are skipped.
  - **Naked `Any`.** `finishInitializingSecondPart` refuses an overloaded functional whose single parameter has the bound `Any` written.
  - **Row 588.** `EvaluatorBase.instanceOf` gives a type parameter that the parameter types mention only in arrow domains its upper end, but not one in `rechecks` or a big operator's.
  - **Gated by** `tests/FunctionalMethodMeetInherited`, `OverloadSingleParamBoundAny`, `InferContravariantWalk`, `FunctionalMethodMeetProvided` and `OverloadSingleParamUnbounded`. The residues are `XXXInferAboveBoundMentionsParamWalk` and `XXXOverrideInTraitWalk`.

## Ledger notes

- **Row 544:** status FIXED (climb batch 10, rung W). Append: "Fixed (climb batch 10, rung W). Walk refuses at load a trait or object without static parameters that provides two functional methods of one identifier or word-operator name, declared in different types with self at one position, neither parameter list below the other and none excluding, with no provided declaration on their meet or cover (`OverloadedFunction.FunctionalMethodMeets`, called from `BuildEnvironments.checkComprisesClauses`). Provides is read by the traits chapter (`Specification/basic/traits.tex`, section "Method Declarations"), so an `override` declaration's overridden ones are not provided (the team's `tests/disp0.fss`). `tests/FunctionalMethodMeetInherited.fss` is promoted; `tests/FunctionalMethodMeetProvided.fss` is the other face. Not checked: symbolic operators (row W-b), a generic trait or object as the provider (its non-generic extenders are), an object expression (rows 570, 597)."
- **Row 534:** status FIXED (climb batch 10, rung W). Append: "Fixed (climb batch 10, rung W). `OverloadedFunction.finishInitializingSecondPart` refuses, in the checker's words, an overloaded function whose single parameter is one of its type parameters with `Any` written in its `extends` clause; an unbounded one is not refused (`tests/OverloadSingleParamBoundAny.fss`, promoted; `tests/OverloadSingleParamUnbounded.fss`)."
- **Row 588:** status FIXED (climb batch 10, rung W). Append: "Fixed (climb batch 10, rung W). A type parameter that the declared parameter types mention only in arrow domains, an odd number deep, and never inside a static argument, takes its interval's upper end, the meet of its declared bound and the arguments' bounds (`EvaluatorBase.instanceOf`, `boundedOnlyAbove`). `tests/InferContravariantWalk.fss` is promoted, with `coN` (`Number`) and `co2` (`ZZ32`). The suite's trace moved no other instance. Left at `BottomType`: one whose bound mentions another static parameter (row W-c) and one with several bounds walk cannot meet (row 591)."
- **Row 425:** append: "Note (climb batch 10, rung W): the reductions callout (`Specification/basic/expressions/reductions.tex`, section "Summations and Other Reduction Expressions") and Appendix I's entry "Reductions whose element type nothing fixes" now say that the compiled checker takes the bound of the big operator's static parameter: a plain bound gives the reduction that type, and an F-bounded one gives no applicable instance. Walk's half, `BottomType`, is unchanged while P1 is not answered."
- **Row 591:** append: "Note (climb batch 10, rung W): the same mechanism leaves at `BottomType` a type parameter with several bounds that an argument bounds only from above, `co2B[\T extends { Red, Round }\](g: T -> ZZ32)` given a function of a `Red` (`compile-ladder/rung-walk-meet/REPORT.md` section 4.3)."
- **Row 584:** append: "Note (climb batch 10, rung W): walk's Meet Rule check for functional methods reads the names the checker reads (`isDeclaredName`), so it skips symbolic operators too; over them the rule breaks at five library sites (row W-b)."

## New rows (provisional numbers from 610; the gather assigns the final ones in manifest order)

- **610 (W-a), provisional.**
  - Claim: **the compiled checker reads every functional method that a supertype declares as provided, so it refuses an `override` that the traits chapter allows.** The team's `tests/disp0.fss` (`object B extends A` with `override f(self, other: Number)` over `A`'s `f(self, other: ZZ32)`) is refused, 'Invalid overloading of f in trait B: (A, ZZ32)->String ... and (B, Number)->String'. So is the same shape through a trait (`PrOverrideWiden`).
  - Status: NEGATIVE-VERIFIED. Class: checker defect.
  - Spec citation: `Specification/basic/traits.tex`, section "Method Declarations": a type does not inherit an overridden declaration, and provides only what it declares or inherits.
  - Reproducer: `fortress compile disp0.fss` in the rung's base copy (`compile-ladder/rung-walk-meet/REPORT.md` section 6).
  - Found by: ours (climb batch 10, rung W).
  - Notes: `STypesUtil.gatherMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1595-1613`) gathers every declaration of every supertype, and `OverloadingChecker.toFunctionalMethodArrows` drops only an abstract one implemented below (`OverloadingChecker.scala:135-157`). Walk reads provides by the chapter since rung W. The compiled expected failure is owed in `compiler_tests/`: `XXXOverrideFunctionalMethodWiden.fss` with `disp0`'s program and `run_out_contains=f PASS`, over a link test.
- **611 (W-b), provisional.**
  - Claim: **walk's and the checker's Meet Rule checks skip symbolic operators, and over them the rule breaks at five library sites.** `EmptyString` provides its own `opr ||(self, other:String)` and `Concatenable`'s `opr ||(self, _:EmptyString)`, with no declaration on their meet (`Library/String.fss:275-325`, `:33-37`). `CompactFullRange2D` and `CompactFullRange3D` provide `opr |self|` from `CompactFullRange` and from `FullRange2D`/`FullRange3D` and `DelegatedIndexed`, with none of their own (`Library/RangeInternals.fss:1130-1156`, `:1161-1190`).
  - Status: NEGATIVE-VERIFIED. Class: library defect.
  - Spec citation: `Specification/advanced/overloading.tex`, section "Meet Rule", the Meet Rule for Functional Methods; operators overload as functions do (`Specification/basic/operators/intro.tex`).
  - Reproducer: a development build of rung W that logged instead of refusing, over every name, `bin/fortress Hello.fss` (`compile-ladder/rung-walk-meet/REPORT.md` section 11, item 1).
  - Found by: ours (climb batch 10, rung W).
  - Notes: the ledger row is its home, as row 584's. Walk's check reads the checker's names (`OverloadedFunction.checkedName`) so that the library loads. The repair, a declaration on each meet, waits on item 38 (row 585) for String.
- **612 (W-c), provisional.**
  - Claim: **under walk, a type parameter that an argument bounds only from above, and whose bound mentions another static parameter, keeps `BottomType`.** `coS[\S, T extends S\](g: T -> ZZ32, s: S)` given `fn (x: ZZ32): ZZ32 => x` and a `ZZ32` gives `BoxU[\BOTTOM\]`.
  - Status: NEGATIVE-VERIFIED. Class: interpreter defect.
  - Spec citation: `Specification/basic/inference.tex`, section "The Static Arguments of a Call" (the intersection of the upper bounds, never BottomType).
  - Reproducer: `ProjectFortress/tests/XXXInferAboveBoundMentionsParamWalk.fss` (home 2; 'FAIL: J5/0:other =/= J10/0:BoxU[ZZ32]' / ' OK Saw expected exception'; red on the stand-in with `coS[\ZZ32, ZZ32\]` written).
  - Found by: ours (climb batch 10, rung W).
  - Notes: such a parameter is in `rechecks` (`EvaluatorBase.java`), which row 588's repair leaves alone. The fix, for a walk rung: meet `boundAtInstances` with the interval's upper end in `instanceOf`'s second loop.
- **613 (W-d), provisional.**
  - Claim: **under walk, a lone type parameter whose bound mentions another static parameter keeps the arguments' narrowest named common supertype (D5's reach), and the chapter does not say whether a call's type parameters are solved jointly.** `loneS`/`loneT[\S, T extends S\](a: T, b: T, s: S)` give `Fruit` for `S` and `T` over `Apple, Pear, Pear`, and `Any` for both over `Apple, Cherry, Apple`.
  - Status: POSITIVE-VERIFIED (today's behaviour pinned). Class: open question.
  - Spec citation: `Specification/basic/inference.tex`, section "The Static Arguments of a Call" (silent on joint solving).
  - Reproducer: `ProjectFortress/tests/InferLoneBoundMentionsParamWalk.fss` (home 3).
  - Found by: climb batch 9 rung W's second skeptic; the pin climb batch 10, rung W.
  - Notes: the chapter's items give `S` the type of `s` alone, `Pear`, and then `T` has no instance over `Apple`. Whether the chapter solves jointly is Pavol's (PLAN, "Climb batch 9, listed for his review", D5's reach).
- **614 (W-e), provisional.**
  - Claim: **under walk, an object below a trait whose method declaration with the modifier `override` overrides an inherited one runs the overridden declaration**: with `trait S` declaring `tag(self, x: ZZ32)` and `dot(x: ZZ32)`, `trait W extends S` declaring both `override` over `Number`, and `object Wo extends W`, `tag(Wo, 3)` and `Wo.dot(3)` give `S`'s. An object declaring the overrides itself runs them (`tests/disp0.fss`).
  - Status: NEGATIVE-VERIFIED. Class: interpreter defect.
  - Spec citation: `Specification/basic/traits.tex`, section "Method Declarations".
  - Reproducer: `ProjectFortress/tests/XXXOverrideInTraitWalk.fss` (home 2; 'FAIL: a Int: 1 =/= a Int: 2' / ' OK Saw expected exception'; red on the stand-in where the object declares the overrides).
  - Found by: ours (climb batch 10, rung W).
  - Notes: walk's method sets keep the overridden declaration, so dispatch picks it as more specific. The fix, for a walk rung: drop overridden inherited declarations when a trait's members are gathered.

## Handover state line

Climb batch 10's rung W: walk refuses at load what the overloading chapter refuses for functional methods per providing type (provides read by the traits chapter) and for a single parameter written bounded by `Any`. A type parameter an argument bounds only from above takes its upper end. D5's reach is pinned. Rows 544, 534 and 588 are fixed, with the residues W-a to W-e opened. The suite is green on `c3d077fa9`, 509 tests. The checker count and the distance are unchanged and were not run, the edit touching only `interpreter/evaluator/`, `tests/` and `Specification/`.

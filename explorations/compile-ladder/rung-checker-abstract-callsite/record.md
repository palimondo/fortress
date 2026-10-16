# Rung K (`rung-checker-abstract-callsite`): record lines for the gather

Written by the rung worker for the gather's fold. `<K1>` is 96c441771 (the overloading change and the first version of the place) and `<K3>` is a79a51661 (the final rule for the place), on `wip/rung-checker-abstract-callsite`; `<KS1>` is the skeptic's fix that walks a local variable's right-hand side before its body, and `<KS2>` its contested fix that reports each call at its own place. The gather puts in the landed hashes.

## FACTS.md

Rewrite F-80, in "The checker and the one library". Its "Unchecked" part is false since `<K1>`:

- F-80 **The compiled checker judges two functional methods of one name by the Meet Rule for Functional Methods, in each type that provides both, abstract declarations included, and keys its overloading memo on the check's inputs.** Such a type must provide their meet, compared without the self parameter. F-88 says what a type provides. An abstract functional method beside a concrete one with the same parameter type is refused by the No Duplicates Rule. Unchecked: a pair that only an object expression provides (row 570). Gated by `compiler_tests/FunctionalMethodMeet*`, `XXXFunctionalMethodMeetAbstractSibling` and `XXXNoDuplicatesRuleAbstract`. Detail: `compile-ladder/rung-overloading-checker/REPORT.md` section 5; `compile-ladder/rung-checker-abstract-callsite/REPORT.md` section 1.

Rewrite F-223, in "The specification and the repository's lineage". Its sentence "and reads no abstract functional method of a trait the component declares (row 727); such a pair passes it and stops the code generator (rows 726 and 727)" is false since `<K1>`, and `XXXNoDuplicatesRuleAbstract` is no longer a departure:

- F-223 **The specification's No Duplicates Rule is the papers' non-strict rule, and the compiled checker applies it, to functional methods wherever their `self` parameters stand, abstract ones included.** Two declarations of one name may not each be applicable to every call to which the other is, as in the type group's papers of 2011 and 2019 (P-26). The checker refuses such a pair, two functional methods at different `self` positions and an abstract functional method beside a concrete one among them: "There are multiple declarations of f with the same parameter type", naming the domain of the declaration written first. It checks no symbolic operator (row 584); such a pair passes it and stops the code generator (row 726). Walk runs one of such a pair in two shapes (rows 373 and 549). Gated by `compiler_tests/XXXNoDuplicatesRule`, `XXXNoDuplicatesRuleSelfPositions`, `XXXNoDuplicatesRuleSelfPositionsPlain`, `XXXNoDuplicatesRuleAbstract` and `XXXNoDuplicatesRuleAbstractSelfPositions`, the checker's departure by `XXXNoDuplicatesRuleSelfPositionsOperator`, and walk's departure by `tests/XXXNoDuplicatesRuleWalk`. Detail: `compile-ladder/rung-popl-examples/REPORT.md` section 4, its `SKEPTIC.md` section 2, `compile-ladder/rung-duplicates-coverage/REPORT.md` sections 1 and 8, and `compile-ladder/rung-checker-abstract-callsite/REPORT.md` section 1.

A new entry, in "The checker and the one library":

- **The well-formedness walk reports an ill-formed type that it meets outside the expression it is in at that expression, so a call whose static argument breaks the bound of the callee's result type is reported at the call.**
  - A call's type keeps the spans of the callee's declared type.
  - An error on such a type is reported at the innermost expression the walk met it in, once for each call that made the type: the expressions that a call's value flows to share its type node and add no error, and a second call with the same printed static argument gets its own error (`XXXStaticArgBoundAtEachCall`, the skeptic's contested `<KS2>`).
  - Where the type is ill-formed where it is written, its error stays at the declaration.
  - A local variable's right-hand side is walked before the lines that use the variable, so the error of a call whose value a variable holds is at the call, not at a later use (`XXXStaticArgBoundAtCallNotAtUse`, the skeptic's `<KS1>`).
  - In the library no error is added or dropped: the count stays 39 and the distance 49, and row 433's two fusion-pair sites are at their calls, `Library/FortressLibrary.fss:3422` and `:3424`.
  - Source: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:37-114`, `check`, `error` and their helpers (`:42-82` at `<K3>`, before the skeptic's `<KS2>`), and `:284-287`, the walk of a local variable (`<KS1>`).
  - Gated by `compiler_tests/XXXStaticArgBoundAtCall`, `XXXStaticArgBoundAtCallOnce`, `XXXStaticArgBoundAtEachCall`, `XXXStaticArgBoundAtCallNotAtUse` and `XXXIllFormedTypeAtDeclarationOnce`.
  - Detail: `compile-ladder/rung-checker-abstract-callsite/REPORT.md` sections 1 and 6.

## Ledger notes and closes

- **Row 727**: close with `ledger.py close 727 --commit <K1> --test XXXNoDuplicatesRuleAbstract`. Note: "fixed <K1> (climb batch 16 rung K): the per-provider set reads a type's abstract functional methods (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:137`), 'There are multiple declarations of f with the same parameter type: (S)'; the pair at two self positions is `XXXNoDuplicatesRuleAbstractSelfPositions`."
- **Row 572**: close with `--commit <K1> --test XXXFunctionalMethodMeetAbstractSibling`. Note: "fixed <K1>: refused by the Meet Rule, 'Invalid overloading of pick in trait O'; walk refuses the shape at load (F-142), not by row 100's mechanism."
- **Row 734**: close with `--commit <K1> --test XXXFunctionalMethodMeetAbstractSiblingNarrower`. Note: "fixed <K1>: refused as row 572's shape, 'Invalid overloading of pick in trait O: A->R ... and B->R1'."
- **Row 720**: close with `--commit <K3> --test XXXStaticArgBoundAtCall`. Note: "fixed <K3>: reported at the call, once for each call (`XXXStaticArgBoundAtCallOnce`, `XXXStaticArgBoundAtEachCall`, `<KS2>`); a type ill-formed where it is written keeps its error at the declaration (`XXXIllFormedTypeAtDeclarationOnce`); a call whose value a local variable holds is reported at the call, not at a later use (`XXXStaticArgBoundAtCallNotAtUse`, `<KS1>`); the reproducer's two errors are at its :16:20-17:8, the call."
- **Row 433**, append: "Since <K3> (climb batch 16 rung K) its two wellformed sites, `MaxSumReductionPair[\T\]` and `MinSumReductionPair[\T\]`, are reported at the calls in `SumReduction`'s `distribute`, `Library/FortressLibrary.fss:3422` and `:3424`, not at the objects' declarations `:3405` and `:3411`; the sites at `:3421` and `:3423` stay."
- **Row 707**, append: "Since <K1> an abstract `f(self, y: S)` beside a concrete `f(x: S, self)` reaches this check (`XXXNoDuplicatesRuleAbstractSelfPositions`)."
- **Row 726**, append: "Unchanged by <K1>, which reads abstract functional methods but no symbolic operator (row 584); `XXXNoDuplicatesRuleSelfPositionsOperator` keeps its code-generator key."
- **Row 584**, append: "<K1> leaves `isDeclaredName` and `NodeUtil.validOp` as they are."
- **Row 488**, append: "Two JFR-instrumented count-stage runs on climb batch 16 rung K's tree (<K1>) printed `#total 38`, `#locations 37` against the plain runs' 39 and 38: the site at `Library/FortressLibrary.fss:130` was gone and the apis' order changed."

## New rows

In section 5, "Overloading on the compiled path: checker and dispatch":

| NEW-K-1 | the compiled checker's per-provider overloading message calls every trait or object a trait: 'Invalid overloading of m in trait O' for `object O`, since its kind word tests the compilation unit where the trait or object is meant | NEGATIVE-VERIFIED | implementation gap (checker) | silent | `ProjectFortress/compiler_tests/XXXDottedMethodMeetAbstractSibling.test` | climb batch 16 rung K | `traitKindAndName` matches `compilation_unit` against `ObjectTraitIndex` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:338` at a79a51661, a team line), which a compilation unit never is; the test pins today's text. The same word is in the refusals of rows 572, 734 and 735. Fix: match `traitOrObject`. |

In the same section, from rung K's skeptic: the top-level face of row 727's mechanism, outside the rung's declaration (`toFunctionalMethodArrows` only).

| NEW-K-2 | the compiled checker's top-level set reads no abstract functional method of a component's own trait, so `h(self): ZZ32` abstract in `S` beside a top-level `h(x: String): ZZ32` passes it, where the concrete twin is refused | NEGATIVE-VERIFIED | implementation gap (checker) | `advanced/overloading.tex`, "Meet Rule" | none | climb batch 16 rung K's skeptic | siblings: 727. In a component `getFunctions` reads only declarations with a body (`onlyConcrete`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:118-121` at a79a51661), functional methods among them; `checkFancyRule` (`:387`) asks only that the function be no more specific. The concrete twin is refused, 'Invalid overloading of h in component SkConcTopDiff: S->ZZ32 ... and String->ZZ32'. Compiled, the abstract shape runs `PASS` through `O`'s body; walk refuses it at load, 'first parameters x:[String] and self:[S] are unrelated'. No `XXX` compile test holds a refusal not made. Probes: rung K's `SKEPTIC.md` section 4. |

## Handover line

Climb batch 16, rung K landed on `wip/rung-checker-abstract-callsite`:
- The compiled checker reads the abstract functional methods a type provides (P-149). Rows 727, 572 and 734 are closed, and an object's functional method that defines its trait's abstract one with an unrelated return type is refused.
- A call's ill-formed type is reported at the call, once. Row 720 is closed, and row 433's two sites are at `FortressLibrary.fss:3422` and `:3424`.
- Count 39 and distance 49, tables unchanged. Both libraries unchanged. Count seconds 383 and 367 on the base, 393 and 371 on the change.
- Appendix I's sentence on row 727 is corrected.
- New row NEW-K-1: the message calls an object 'trait'.

## Revival change

**The change.** There are two.

1. **The overloading check of what a type provides.** The team's compiled checker of 2012 read only functional methods with a body when it checked the overloading of what a trait or object provides (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala`, line 133 at a874948ac). It did read abstract dotted methods (lines 144-146 there).
   - So an abstract functional method beside a concrete one with the same parameter type, in one trait, passed the checker and stopped the code generator.
   - An object that inherits an abstract functional method from one trait and a body from another, and declares none of its own, compiled and ran the body.
   - An object's functional method that defines its trait's abstract one with an unrelated return type compiled and failed verification: 'java.lang.VerifyError: Bad return type'.

   The tree now reads every functional method a type provides. It refuses the first, 'There are multiple declarations of f with the same parameter type' (`ProjectFortress/compiler_tests/XXXNoDuplicatesRuleAbstract.test`, `XXXNoDuplicatesRuleAbstractSelfPositions.test`). It refuses the second, 'Invalid overloading of pick in trait O' (`XXXFunctionalMethodMeetAbstractSibling.test`, `XXXFunctionalMethodMeetAbstractSiblingNarrower.test`). It refuses the third, 'For f, the return type of ... should be a subtype of ...' (`XXXAbstractFunctionalMethodReturnType.test`).

   The reason:
   - the No Duplicates Rule (`Specification/advanced/overloading.tex:548-549`);
   - the Meet Rule over what a type provides, abstract declarations included (`Specification/basic/traits.tex:580-581`);
   - the rule that an object defines each abstract method it inherits (`traits.tex:628-633`);
   - the code generator's own refusal of such a set, 'Likely bug in static analysis, apparently malformed overload set not rejected' (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:409-411`);
   - walk refuses all three shapes at load.

2. **Where a type's error is reported.** The team's well-formedness walk reported an error on a type at the type's own node (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala`, line 113 at a874948ac). A call's type keeps the spans of the callee's declared type, so a call whose static argument breaks the bound of the callee's result type was reported at the callee's declaration.

   The tree reports it at the call (`ProjectFortress/compiler_tests/XXXStaticArgBoundAtCall.test`), once for each call (`XXXStaticArgBoundAtCallOnce.test`, `XXXStaticArgBoundAtEachCall.test`), also where a local variable holds the call's value and a later line uses it (`XXXStaticArgBoundAtCallNotAtUse.test`). It keeps at the declaration the error of a type that is ill-formed where it is written (`XXXIllFormedTypeAtDeclarationOnce.test`).

   The reason, as evidence:
   - The old place holds no error of its own. On the old code `XXXStaticArgBoundAtCall` names its line 12, `vec`'s declared result, which is well-formed in `vec`'s scope; the call with the unbounded argument is on line 13.
   - The library's two such errors named the objects' declarations, `Library/FortressLibrary.fss:3405` and `:3411`, whose bounds are their own. The unbounded argument is written at the calls `:3422` and `:3424`.

**Provenance.**
- The first change follows Q1 of climb batch 16 (review-queue item 62), answered (a), refuse (P-149), for rows 727 and 572; row 734 closes with them.
- The second follows the coordinator's call 4 of climb batch 16, for row 720.
- Both are climb batch 16, rung K.

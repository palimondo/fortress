# Rung P (climb batch 14, `rung-popl-examples`): record

## FACTS.md

Under "## Landed semantics", after F-140 ("A size beyond `NN32` or `ZZ32` is refused on both paths, and walk reads a size exactly"):

- **Walk computes a power in a size exactly, and refuses a negative exponent.**
  - `EvalType.forIntBinaryOp` computes `^` on longs by repeated squaring with `Math.multiplyExact`, as `Int.powExact` computes a value's power (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:475-484`).
  - A power that overflows a long gets the out-of-range refusal that a sum gets, and one beyond its parameter's kind is refused at binding (F-140).
  - A negative exponent, which only a static parameter can give, is refused: "has the negative exponent".
  - Its values are `Naming.sizeOp`'s wherever they fit a long.
  - At class load the compiled path still makes `2^32`, and stops on a negative exponent or on `2^5000` (row 675).
  - Gated by `tests/NatArithPowerWalk`, `NatPowerNegativeExponentWalk`, `NatPowerOutOfRangeWalk` and `NatPowerOverflowWalk`.
  - Detail: `compile-ladder/rung-popl-examples/REPORT.md`, sections 3 and 6.

Under "## The specification and the repository's lineage", after F-174:

- **The specification's No Duplicates Rule is the type group's non-strict rule, and the compiled checker applies it.**
  - Two declarations of one name may not each be applicable to every call to which the other is (`Specification/advanced/overloading.tex:548-549`), as in the papers of 2011 and 2019.
  - The checker refuses such a pair by `oracle.equiv`, the domains' subtype relation both ways (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:439-446`, `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:68-74`).
  - Walk runs one of the pair (row 373).
  - Gated by `compiler_tests/XXXNoDuplicatesRule.test`; walk's side by `tests/XXXNoDuplicatesRuleWalk`.
  - Detail: `compile-ladder/rung-popl-examples/REPORT.md`, section 4.

## Ledger

Each note below was checked against the template by appending it to its row in a scratch file: `ledger.py check --rows` printed "6 rows, 0 fail the template".

- **Row 373**, append: "B4's pair: `XXXNoDuplicatesRuleWalk`." The row's reproducer cell, `none`, is to name `ProjectFortress/tests/XXXGenericBoundsNoMeetWalk.fss` (A6) if the tool allows; the note holds 40 more characters at most.
- **Row 444:** no note fits (notes 683 of 700 characters). Its reproducer cell, `none`, is to name `ProjectFortress/tests/XXXDottedMethodMeetBothBodiesWalk.fss`: the POPL 2019 p. 11:2 shape, a body of `m(x: Number)` in each of two traits and none in the object.
- **Row 537**, append: "Also XXXGenericBoundsMeet." The row holds 28 more characters at most. The test is `compiler_tests/XXXGenericBoundsMeet.fss` with `GenericBoundsMeetLink.test` and `XXXGenericBoundsMeet.test` (A-B2, the meet written as `R extends { A, B }`).
- **Row 675**, append: "At e = -1, `IBox[\2^e\]` stops it too, 'Illegal embedded sign character'; walk refuses it (`NatPowerNegativeExponentWalk`)."
- **Row 676**, close: `ledger.py close 676 --commit dcad9f75a --test ProjectFortress/tests/NatArithPowerWalk.fss`.
- **Row 693**, append: "Object shape: `XXXOverrideNothingConditionalExtensionWalk`."
- **Row 696**, close: `ledger.py close 696 --commit 98e8ff979 --test ProjectFortress/compiler_tests/XXXNoDuplicatesRule.test --note "the compiled checker's duplicate check refused such a pair before the text did; walk runs one (row 373)"`.
- **Row 697:** no note fits (notes 681 of 700 characters). Its reproducer cell, `none`, is to name `ProjectFortress/tests/XXXReturnRuleObjectParamWalk.fss`, the talk's slide 4 set. Compiled, `compiler_tests/XXXReturnRuleMeetCrossing.test` refuses the same program.
- **Row 698**, append: "Gated by `compiler_tests/XXXOverloadZZ32BesideUserTrait.test`; walk runs the set, `tests/OverloadZZ32BesideUserTraitWalk.fss`."
- **Row 699**, append: "Gated by `compiler_tests/XXXGenericInstanceReturnOnly.test`, linked by `GenericInstanceReturnOnlyLink.test`; walk's side: row NEW-P-1."

New row, in section "4. Operators and overloading under walk" (linted with a number in place of NEW-P-1: "1 rows, 0 fail the template"):

| NEW-P-1 | under walk, a generic declaration reached by dispatch whose type parameter only its return type mentions runs at its bound, not at the call's static type: `sort[\P\](x: Ltwo): Sorted[\P\]` beside `sort(x: Lst): Sorted[\A\]` gives `Sorted[\Any\]`, and `merge` of it with a `Sorted[\A\]` fails | NEGATIVE-VERIFIED | design limit (walk) | `basic/overloading.tex`, "Overloading Resolution" | `ProjectFortress/tests/XXXGenericInstanceReturnOnlyWalk.fss` | POPL 2019 examples sorting | siblings: 510, 538, 699. 'Unification error: Closure/Constructor for merge param 1 (x:Sorted[\Any\]) got arg Sorted[\A\] of type Sorted[\A\]'. Walk has no static types, so no static type of the call bounds the instance; the section's `\revision{revival-dispatch}` callout states walk's departure but names no row. The paper's p. 11:7 `sort`/`merge` example, made invariant. `explorations/reviews/popl2019-examples.md` |

## Handover state line

Climb batch 14's rung P (`rung-popl-examples`, branch `wip/rung-popl-examples`):
- The POPL 2019 examples are tests on both paths: 15 walk and 12 compiled test programs. Green: A1, A3, A4 and A6's refusals; A5's and A10's dispatch; A-B2 under walk; B4 compiled. Expected failures gate rows 444, 697, 373, 693, 698, 699, 537 and the new row NEW-P-1.
- Walk computes a power in a size and refuses a negative exponent (row 676 fixed, `NatArithPowerWalk`).
- The No Duplicates Rule is restated on the non-strict relation with its Appendix I entry (row 696 closed, `XXXNoDuplicatesRule.test`).
- testSystem: 594 tests, 0 failures. testQuick: compiler 1132, library 86, othercompiler 263, 0 failures.
- No count or distance was run: every changed path is exempt.

## Revival change

**The change.**
- **What the team's source does.** The team's walk computed a sum, a difference and a product in a size, in wrapping longs, and stopped on any other operator with an internal error, "EvalType: ... is not yet implemented." (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:457-464` at `a874948ac`). So `Box[\2^3\]` stopped the program.
- **What the tree now does.** Walk computes a power in a size exactly (`EvalType.java:475-484`), as the compiled path does (`ProjectFortress/src/com/sun/fortress/runtimeSystem/Naming.java:1212-1222`):
  - `Box[\2^3\]` is `Box[\8\]`, an exponent of 0 gives 1, and a power of 0, 1 or -1 is computed at any exponent (`ProjectFortress/tests/NatArithPowerWalk.fss`);
  - a power at a negative exponent, which only a static parameter can give, is refused: "Static argument 2^e has the negative exponent -1, and a power in a size takes an exponent of 0 or above" (`ProjectFortress/tests/NatPowerNegativeExponentWalk.fss`);
  - a power beyond its parameter's kind is refused as a sum is, at binding or when it overflows a long (`NatPowerOutOfRangeWalk.fss`, `NatPowerOverflowWalk.fss`).
- **The reason.**
  - The grammar gives a power of a size, `IntExpr ^ IntVal` (`Specification/appendices/grammars/concrete-syntax.tex:545`).
  - The text says "Given instantiations of all static parameters ... in scope of a static expression, the value of the static expression can be determined statically" (`Specification/basic/expressions/constant.tex:26-29`).
  - A `nat` or `int` parameter takes an `NN32` or a `ZZ32` value (`Specification/basic/trait-parameters.tex:98-105`), which a power at a negative exponent of a base other than 1 and -1 is not.
  - The compiled path computes the same powers, and no negative one (`Naming.java:1216`).

The restated No Duplicates Rule makes no such difference. It brings the revival's own text into agreement with the type group's papers (`Papers/Types/rules.tick:158-162`; POPL 2019, Fig. 5) and with the compiled checker (`OverloadingChecker.scala:439-446`); the Working Draft had no such rule.

**Provenance.** Ledger row 676, "under walk, a power in a size stops the program", whose fix the row names: "a fourth case, an exact power with the same out-of-range refusal". The refusal of every negative exponent is the rung's choice where the specification is silent, following the compiled path's `sizeOp`, and is put to the curator. Climb batch 14, rung P.

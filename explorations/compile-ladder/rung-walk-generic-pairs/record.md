# Rung G of climb batch 17: the record lines

## For FACTS

New entry, in "Landed semantics", beside F-238:

**Under walk, two functions with static parameters that no pair of parameter types excludes are read on their declared domains, each over its own instances, by the No Duplicates, Return Type and Meet Rules, and a pair whose declared domains are equal is refused even where the parameter check orders it.** Walk's parameter-by-parameter check passes a pair it finds excluding; a pair of two own generics it refuses is read by `genericPairValid` (`interpreter/evaluator/values/OverloadedFunction.java:766`), whether or not an exclusion was withdrawn; a pair it passes by order, one at least an own generic and the other an own generic or plain, whose declared domains each lie inside the other is refused, "fails because their parameter lists have the same types" (`:533-540`, `sameDeclaredDomains` `:806`), since the check reads a type parameter as strictly below its bound. Limits: the Meet Rule's search matches the two domains only where their parameter types are, position by position, instances of one generic type or static parameters (row 539); a pair whose parameter types exclude only together is refused (row 740); instances of one generic type at different ground arguments do not exclude in the check (row 416); a generic functional method or dotted method is compared on the instance a call makes. Gated by `tests/DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk`, `GenericPairNestedBoundsWalk` (load and dispatch), `GenericBesideGenericSameDomain`, `GenericBesidePlainSameDomain` (refused), `XXXOverloadExistentialMeetWalk` and `XXXGenericPairExcludesTogetherWalk`. Detail: `compile-ladder/rung-walk-generic-pairs/REPORT.md` sections 1 and 5.

Corrections, each now false in part (REPORT.md section 7):

- F-238: drop "A pair the old reading did not find excluding keeps its refusal (row 159)."; the new entry above gives the reading of every pair.
- F-223: in place of "it loads and runs one of a generic declaration beside one whose parameter types are its bounds, a plain one (row 549) or a generic one whose parameter types mention none of its static parameters (row 742)", read "it refuses too a generic declaration beside one whose parameter types are its bounds, a plain one or a generic one whose parameter types mention none of its static parameters, 'fails because their parameter lists have the same types'"; and in place of "walk's two departures by `tests/XXXGenericBesidePlainSameDomain` and `XXXGenericBesideGenericSameDomain`", read "those two refusals by `tests/GenericBesidePlainSameDomain` and `GenericBesideGenericSameDomain`".
- F-155: "or a rank-specialised declaration beside an index-generic one" is no longer refused where the rank-specialised one lies inside the index-generic one: `k[\I\](a: Array[\RR64,I\])` beside `k[\nat n\](v: Vector[\RR64,n\])` loads and dispatches (`vector`, `any rank`); two declarations that differ only in the element type, as `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])`, are still refused, "at least one pair of parameters must have excluding types" (row 416); and the rank-specialised `×` of `apl/mg/elemwise_nat_probe.fss` now passes its own pair, then is refused beside the library's `MultiplicativeRing.×` (row 341). The rows: 416 and 341, no longer 159.

## For POSITIONS and PLAN

P-45's "Still to build: walk's load check over every pair, PLAN phase 3 item 15" is built by this rung (commit `b5a497c04`).

## Ledger

Closes, after the landing, by the commit that lands `b5a497c04`'s change:

- Row 159: `--test DispatchRenamedGenericArmWalk`. Its claim names the `opr ×` pair over `Array[\RR64,I\]` twice beside `Vector[\RR64,s\]` and `Matrix[\RR64,r,c\]`, which stays refused as row 740's shape (REPORT.md section 5); the close may take `--claim "walk refuses at load two generic declarations of one name unless some parameter pair excludes, even when one is more specific: grab[\X\](t: Tag[\X\]) beside grab[\Y\](t: Sub[\Y\])"`.
- Row 742: `--test GenericBesideGenericSameDomain`.
- Row 549: `--test GenericBesidePlainSameDomain`.

Notes (each measured to fit the row's 1,200 characters and the notes' 700):

- Row 740: "Climb batch 17 rung G: microGPT's old `×` pair of row 159 has this shape."
- Row 741: "Climb batch 17 rung G kept both loads (`tests/GenericPairExcludingWalk`)."
- Row 373: "Climb batch 17 rung G read every refused pair of two own generics so, withdrawn or not (`OverloadedFunction.java:766` at b5a497c04; P-45)."
- Row 539: "After climb batch 17 rung G only m[\P\] beside m[\Q\] is refused: `matchApart` reads no supertype (`OverloadedFunction.java:1010`)."
- Row 101: "`PrefixMap` alone is refused too, through `PrefixSet`'s `BIG CUP` (`Library/PrefixSet.fss:425` beside `Library/PrefixMap.fss:419`), at 3aea3da53 and after climb batch 17 rung G; no gated test imports it."
- Rows 697 and 341: their notes are at 700 characters, so nothing is added; row 697 is unchanged (`XXXReturnRuleObjectParamWalk` keeps its verdict), and row 341's new face is in REPORT.md section 5.

New rows: none.

## Handover

Climb batch 17 rung G: walk's load check reads every refused pair of two generic functions on its declared domains and refuses two whose declared domains are equal (P-45 built; rows 159, 742 and 549 close); the model's old `×` pair waits on P-152's probe (row 740), and row 539's last pair on a meet search that reads supertypes.

## Revival change

**The change.** The team's walk refused at load two generic declarations of one name unless some pair of their parameter types excluded each other: its `overloadOk` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:492-510` at `a874948ac`, "non-ground types need exclusion", `:497-499`) refused every pair whose parameter-by-parameter comparison met a type parameter neither excluding nor ordered, with "with generic type, at least one pair of parameters must have excluding types"; and its comparison read a type parameter as strictly below its bound (`:443`), so it loaded `tie[\T extends Wide\](a: T, b: T)` beside `tie(a: Wide, b: Wide)` and ran one of the two. The tree now reads such a pair of two functions with static parameters on the declared domains, each over its own instances, by the No Duplicates, Return Type and Meet Rules: it loads `grab[\X\](t: Tag[\X\])` beside `grab[\Y\](t: Sub[\Y\])` and the pair `which[\T extends Shape\]` beside `which[\T extends Round\]`, and dispatches each call to the more specific one that applies (`ProjectFortress/tests/DispatchRenamedGenericArmWalk.fss`, `GenericPairNestedBoundsWalk.fss`); and it refuses the two `tie` pairs, "fails because their parameter lists have the same types" (`GenericBesideGenericSameDomain`, `GenericBesidePlainSameDomain`). It still refuses a pair whose overlap only a declaration over a supertype's instance holds (`XXXOverloadExistentialMeetWalk`), a pair that excludes only together (`XXXGenericPairExcludesTogetherWalk`), and two instances of one generic type at different ground arguments. The reason: the specification reads a declaration with static parameters over every instance within its bounds and compares declarations on the parameter types they declare (`Specification/basic/overloading.tex:100-110`), states the three rules on those domains (`Specification/advanced/overloading.tex:545-560`), and allows `ident[\T extends Shape\](x: T): T` beside `ident[\T extends Round\](x: T): T` (`:608-614`), which the team's walk refused, "with generic type, at least one pair of parameters must have excluding types" (measured on the base through the harness, `GenericPairNestedBoundsWalk`). The skill's `references/interpreter.md:38` and `references/revival-changes.md:43-50` ("walk loads two generic declarations whose declared domains are equal") describe the earlier state.

**Provenance.** P-45 (the curator's answer 9, with his answer of 19:47 UTC on 2026-10-16 that the load check reads every pair on its declared domains by the checker's rules, no parameter pair required to exclude); rows 742 and 549 by the coordinator's call 6 of climb batch 17, the No Duplicates Rule on the same declared domains; climb batch 17, rung G.

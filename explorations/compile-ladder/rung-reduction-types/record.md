# Rung G of climb batch 12: the record lines

## The FACTS entry (section "Landed semantics")

- **The identity-less reductions are typed at their element type: `AssociativeReduction[\R\]` lifts to `Maybe[\R\]`, its `simpleJoin` takes and answers `R`, and every `lift` takes `R`** (`compile-ladder/rung-reduction-types/REPORT.md`; row 628 fixed, and row 473's open half).
  - Source: `Library/FortressLibrary.fss:3061-3164`, api `Library/FortressLibrary.fsi:1866-1921`. The identity-less big operators declare `BigReduction[\T,Maybe[\T\]\]` or `Comprehension[\...,Maybe[\...\]\]`. `Set`'s `BIG INTERSECTION` declares `Maybe[\Set[\R\]\]`, as `Set`'s `Intersection` already did.
  - Under walk:
    - The lifted bodies build `Just[\R\](...)`, since walk's `Just(r)` takes the run-time class of `r` and its generics are invariant.
    - A reduction that extends `AssociativeReduction` declares `simpleJoin` at its element type. One declared at `Any`, or with untyped parameters, leaves the abstract `simpleJoin(a:R, b:R)` unimplemented, and the reduction stops at its first join.
    - A static argument that names an identity-less reduction's lifted type is `Maybe[\R\]`; walk's invariance refuses `AnyMaybe` there.
  - Where nothing at the call fixes the element type, `BIG MINMAX` and the four tuple forms answer under walk. `Set`'s `BIG UNION` and `BIG INTERSECTION` stop at `Set[\OPEN\]` (row NEW-G-1). The plain-bounded monoid operators stop at `BOTTOM` (D2); both kinds now stop at the typed `lift`.
  - Test: gated by `tests/UnwrittenBigOperatorsWalk.fss`, `UnwrittenBigMinMaxWalk.fss` and `UnwrittenTupleMinMaxWalk.fss`; the residue by `XXXUnwrittenSetBigOperatorsWalk.fss`. The distance stage's 13 sites of row 628 are gone (207 to 194 on the rung's tree).

## FACTS corrections

The entry "Under `walk`, a type parameter whose bound mentions itself and that nothing at a call fixes is left open, ..." needs three changes:
- "row 473's open half given an expected failure" becomes "row 473's open half fixed by climb batch 12's rung G".
- Its residue list loses `XXXUnwrittenBigMinMaxWalk.fss`, promoted to `UnwrittenBigMinMaxWalk.fss`.
- Its sentence "so `(Int, Int)` is not below `(OPEN, OPEN)` at dispatch (row 473)" loses its witness. Row 473 no longer shows it: by reading, the abstract `simpleJoin` now has the implementer's signature, so dispatch has no second declaration to choose. The sentence's claim about dispatch itself is not re-measured.

## Ledger: rows closed

- Row 628: close with `--commit 1410a62de --test ProjectFortress/tests/UnwrittenBigOperatorsWalk.fss`. Note: "Fixed by climb batch 12 rung G (`1410a62de`): `simpleJoin(a:R, b:R): R`, every `lift(r: R)`, and the lifted type `Maybe[\R\]` in the two traits, `LiftedCommutativeMonoidReduction`, the identity-less big operators and `Set`'s `BIG INTERSECTION`. With them, `ActualReduction`'s abstract `lift` at `R`, `Just[\R\]` in the lifted bodies, and `MinReduction`'s and `MaxReduction`'s `simpleJoin` at `T`, as the api declares them. The distance stage's 13 sites are gone (207 to 194 on the rung's tree)."
- Row 473: close with `--commit 1410a62de --test ProjectFortress/tests/UnwrittenBigMinMaxWalk.fss`. Note: "Open half fixed by climb batch 12 rung G (`1410a62de`): with `AssociativeReduction`'s `simpleJoin` at `R`, `MinMaxReduction`'s `simpleJoin` implements it, and `BIG MINMAX[i <- 0#4] i` unwritten is `(0, 3)`; `XXXUnwrittenBigMinMaxWalk.fss` promoted to `UnwrittenBigMinMaxWalk.fss` (`17dfc355b`). The four tuple forms answer too (`UnwrittenTupleMinMaxWalk.fss`)."

## Ledger: notes

- Row 433: "After climb batch 12 rung G (`1410a62de`), `MaxSumReductionPair` and `MinSumReductionPair` extend `ReductionPair[\T,Maybe[\T\]\]`, and the two `distribute` declare `PossibleReductionPair[\Maybe[\T\]\]` (`Library/FortressLibrary.fss:3248-3265`). The two return-type sites stay, and their message now names `Maybe[\T\]`; the four wellformed sites are unchanged."
- Row 405: "In the library, `MinReduction`'s and `MaxReduction`'s `simpleJoin(a, b)` were a case of this, harmless while the abstract declaration took `Any`. Climb batch 12 rung G (`1410a62de`) typed them at `T`, as the api declares them (`Library/FortressLibrary.fss:3291`, `:3300`)."
- Row 646: "siblings: NEW-G-1 (`Set`'s unwritten `BIG UNION` and `BIG INTERSECTION` at `Set[\OPEN\]`)."

## Ledger: new row (section "8. Generators, reductions and ranges")

| NEW-G-1 | under walk, `Set`'s `BIG UNION` and `BIG INTERSECTION` with a generator clause list and no static argument stop at their first element: `R` is left open and `Set[\OPEN\]` admits no `NodeSet[\ZZ32\]`, so `BIG UNION[i <- 0#3] {[\ZZ32\] i}` stops where it is `{0,1,2}` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/expressions/reductions.tex`, "Summations and Other Reduction Expressions" | `ProjectFortress/tests/XXXUnwrittenSetBigOperatorsWalk.fss` | climb batch 12 probe P2 and rung G | siblings: 424, 473, 646. `R extends StandardTotalOrder[\R\]` is F-bounded, so walk leaves it open (row 424's fix); the reduction's parameters are then `Set[\OPEN\]`, and a generic type holding the open type admits no more than at `BottomType` (FACTS, "Under `walk`, a type parameter whose bound mentions itself ..."). At `7fa767d48` `UNION` stopped at `Union.join`, `INTERSECTION` at the abstract `simpleJoin(a:Any, b:Any)`; at `1410a62de` both stop at `lift` in `__bigOperator` (`Library/FortressLibrary.fss:1304`), 'lift param 1 (r:Set[\OPEN\]) got arg NodeSet[\ZZ32\]'. Workaround: `BIG UNION[\ZZ32\][i <- 0#3] {[\ZZ32\] i}`. |

## The handover line

Climb batch 12's rung G fixed row 628: the identity-less reductions are typed at `Maybe[\R\]`, 13 sites; the distance is 207 to 194 on its tree, and the count stays 1. It also fixed row 473's open half (`UnwrittenBigMinMaxWalk.fss`). `Set`'s unwritten `BIG UNION` and `BIG INTERSECTION` stay stopped (NEW-G-1, `XXXUnwrittenSetBigOperatorsWalk.fss`). The gather owes three specification sentences that still say `BIG MINMAX` stops (`Specification/basic/inference.tex:305-311`, `Specification/appendices/changes.tex:1065-1071`, `:1916-1923`).

## The revival change (`.claude/skills/fortress-repo/references/revival-changes.md`)

This goes under a new heading, `## Loops and reductions are library code`, placed between "Numbers are siblings, not a tower" and "Specified, but not built", in the order of `SKILL.md`'s points:

**The lifted type of a reduction without an identity**

- Original: the interpreter's library lifted the reductions without an identity, such as `BIG MIN`, `BIG MAX` and `BIG //`, to the type `AnyMaybe`, which takes no type argument. Their `simpleJoin` took and answered `Any`, and their `lift` took `Any`, while the api declared `lift(r:R)`. The team's tests declared their own such reductions with `simpleJoin` at `Any`, and passed `AnyMaybe` to `generate`.
- Resolution: `AssociativeReduction[\R\]` lifts to `Maybe[\R\]`. Its `simpleJoin` takes and answers `R`, and every `lift` takes `R`. A reduction that extends it declares `simpleJoin` at its element type. Under walk, one declared at `Any` or with untyped parameters leaves the abstract `simpleJoin` without a body, and the reduction stops. A static argument that names the lifted type is `Maybe[\R\]`, as in `h.generate[\Maybe[\(ZZ32,ZZ32,ZZ32)\]\](TestReduction, sing)`.
- Reason: the checker refused the `Any` devices at 13 places in the library, and `if av <- a` cannot bind from `AnyMaybe`, which is not a `Condition`. The api and `Set`'s `Intersection` already wrote these types. The devices had kept walk's reductions running while walk gave an unwritten static argument `Bottom`, which it no longer does.

# Record lines: climb batch 13, rung W (`rung-walk-override`)

## FACTS

A new entry in "Landed semantics", after the entry whose title begins "Walk refuses at load an object that leaves an inherited abstract method without a body":

- **Walk reads an `override` by the chapter's strict subtype, and checks the `override` of a trait, object or object expression with static parameters once, at its declaration** (`compile-ladder/rung-walk-override/REPORT.md`; row 653's walk half sharpened, row 665's override half).
  - `Constructor.checkOverrides` counts an inherited declaration as overridden only where each of its parameter types is a subtype of the override's and not all are equal (each a subtype of the other's) (`interpreter/evaluator/values/Constructor.java:569-627`). So an `override` at the inherited declaration's own parameter types is refused at load: '... does not override any inherited declaration'.
  - `BuildEnvironments.checkGenericOverrides` checks a generic declaration that declares an `override` through the stand-in of `symbolicInstance`, each static parameter a symbolic type below its bound (`interpreter/evaluator/BuildEnvironments.java:886-899`). It is called at `:592` and `:875`, and at `interpreter/env/ComponentWrapper.java:186`.
  - The one library's load reads its 146 generic declarations for the modifier and builds no stand-in.
  - At an instance of a generic declaration, such as a generic trait's instance above an object, equal parameter types still count as overridden (`Constructor.java:588`, `:595`).
  - Gated by `tests/OverrideEqualTypesWalk.fss`, `OverrideNothingGenericWalk.fss`, `OverrideNothingGenericTraitWalk.fss`, `OverrideNothingGenericObjectExpressionWalk.fss` and `OverrideGenericInstanceEqualTypesWalk.fss`.

Rewrite in place, in the entry "Walk refuses at load an object that leaves an inherited abstract method without a body, ..." (`explorations/coordinator/FACTS.md:151`):
- Its source note: add `compile-ladder/rung-walk-override/REPORT.md` and "row 665's override half".
- The sentences "`Constructor.checkOverrides` refuses an object's, or a trait's without static parameters, `override` declaration that overrides nothing its type's immediate supertraits provide, with equal parameter types counting as overridden (`:555-576`). A trait without static parameters that declares one is checked in pass 3 (`interpreter/evaluator/BuildEnvironments.java:874`); a generic trait's only where an object without static parameters extends one of its instances." become: "`Constructor.checkOverrides` refuses an `override` declaration that overrides nothing its type's immediate supertraits provide, by the strict subtype (`:569-627`): an object's where its methods are built, a trait's without static parameters in pass 3 (`interpreter/evaluator/BuildEnvironments.java:874`), and a generic trait's, object's or object expression's at its declaration (the entry beside it, 'Walk reads an `override` by the chapter's strict subtype')."
- The words "The residues are gated by `XXXAbstractMethodUndefinedGenericWalk`, `XXXOverrideNothingGenericWalk`, `XXXOverrideNothingGenericTraitWalk` and `XXXAbstractMethodUndefinedGenericObjectExpressionWalk` (row 665: generic objects, object expressions in generic functions and generic traits are not checked)" become "The residues are gated by `XXXAbstractMethodUndefinedGenericWalk` and `XXXAbstractMethodUndefinedGenericObjectExpressionWalk` (row 665: the abstract-method check skips generic objects and object expressions in generic functions)".
- After "(`Library/Pairs.fss:78-87`)", add "; `tests/PairsRunRangesWalk.fss` runs `runRanges` through it".

In the entry "The identity-less reductions are typed at their element type ..." (`explorations/coordinator/FACTS.md:150`): after "walk refuses such a reduction at load, 'Object ... does not define an abstract method declared in type AssociativeReduction'", add "(`tests/ReductionSimpleJoinAtAnyWalk.fss`)".

## Ledger

- **Row 653.** Append: "Walk's half sharpened by climb batch 13 rung W (7ea90f57d): `Constructor.checkOverrides` reads the strict subtype (`traits.tex:589`), so an `override` at the inherited declaration's own parameter types is refused at load (`tests/OverrideEqualTypesWalk.fss`; on a1a75716a it printed `B`), and a generic declaration's `override` is checked (665). The row stays open for its compiled half (650)."
- **Row 665.** Append: "The override half is fixed by climb batch 13 rung W (7ea90f57d). `BuildEnvironments.checkGenericOverrides` checks a generic trait, object or object expression that declares an `override` once, at its declaration, through `symbolicInstance`'s stand-in (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:886-899`). `OverrideNothingGenericWalk` and `OverrideNothingGenericTraitWalk` are the promoted expected failures; `OverrideNothingGenericObjectExpressionWalk` gates the third shape. The abstract half stays open." The gather may narrow the claim to the abstract half; the reproducer cell (`XXXAbstractMethodUndefinedGenericWalk`) stands.
- **Row 666.** Append: "`tests/PairsRunRangesWalk.fss` (climb batch 13 rung W) imports `Pairs` and asserts `runRanges`, which reaches `SingleRange`'s `BOXPLUS`. It loads only through this allowance."

## New rows

None. The rung measured no defect that the record does not hold.

## Handover

Climb batch 13 rung W (`wip/rung-walk-override`; 4e0833a4f, 7ea90f57d, 6bfd27720):
- Walk refuses at load an `override` at the inherited declaration's own parameter types (Q2 at its strict default; row 653's walk half).
- It checks the `override` of a generic trait, object or object expression once, at its declaration (row 665's override half; two expected failures promoted).
- The revival-covering box and its Appendix I effect say that the compiled checker reads comprises clauses in its coverage check.
- The two tests owed by batch 12's review, `ReductionSimpleJoinAtAnyWalk` and `PairsRunRangesWalk`, are in.
- `ant testSystem` is green (559). The count stays at 1 and the distance at 153; no site moved.
- Open: QW-a and QW-b for the curator; row 665's abstract half; row 653's compiled half (650).

## Revival change

Rewrite in place the entry "An abstract method without a body, and an `override` that overrides nothing, under walk" in `.claude/skills/fortress-repo/references/revival-changes.md`:

**An abstract method without a body, and an `override` that overrides nothing, under walk**

- Original: the traits chapter makes both static errors. An `override` overrides an inherited declaration only if the inherited parameter type is a strict subtype of its own, so an `override` at equal parameter types overrides nothing. Walk loaded both: a call of the abstract method stopped with an `InterpreterBug`, "has neither body nor def", and the `override` ran. The compiled checker refuses the first and accepts the second (ledger row 653).
- Resolution: walk refuses the abstract method without a body at load in an object or an object expression without static parameters. It refuses at load an `override` that overrides nothing in every trait, object and object expression, also one at the inherited declaration's own parameter types. It checks a declaration with static parameters once, through the stand-in of "A trait's `override`, and object expressions, under walk", not at each instance. So an instance that makes the two parameter types equal is not refused. A declaration with a body of the method's name, whose parameter types are the abstract declaration's or below them, counts as defining the abstract method (ledger row 666). This allowance departs from the chapter, which asks an object to define a body for the abstract method itself. A call outside the narrower types still stops walk with "has neither body nor def" (ledger rows 668 and 669). Walk makes no abstract-method check on a generic object (ledger row 665).
- Reason: unchanged.

In `.claude/skills/fortress-repo/references/interpreter.md`, "What walk checks", the last bullet of the first list becomes: "- a declaration with the modifier `override`, in a trait, object or object expression, that overrides no declaration that its type's immediate supertraits provide. An `override` at an inherited declaration's own parameter types overrides nothing."
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
## The skeptic's additions

These follow the skeptic's three fixes, two of them contested (`SKEPTIC.md`). Each line says which commit it rests on; if the judge reverts that commit, the line goes with it.

### FACTS

In the new entry "Walk reads an `override` by the chapter's strict subtype ...", after its fourth bullet (e8d377669):
  - Where walk does not read a static parameter's bounds, an inherited declaration whose parameter types mention a static parameter, and are not equal to the override's, counts as possibly overridden: in an object expression, whose static parameters walk's rewrite lifts without the where clauses of the declarations around it (`nodes_util/ExprFactory.java:1127`), and in a declaration that extends a type under a `where` clause, which walk reads as unconditional (`interpreter/evaluator/values/Constructor.java:600`, `:634-666`). Gated by `tests/OverrideObjectExpressionWhereBoundWalk.fss` and `OverrideConditionalExtensionWalk.fss`; the residue, an object expression's `override` over an unbounded static parameter loading, by `XXXOverrideObjectExpressionOverParamWalk` (row NEW-W-2).

A new entry in "Landed semantics", beside it (7b625cdf9):

- **Under walk, a `where` clause's bound on a static parameter bounds that parameter alone** (`compile-ladder/rung-walk-override/SKEPTIC.md`; row NEW-W-1). `SymbolicType.addExtend` and `addExtends` put the bound into an extends list of the parameter's own (`interpreter/evaluator/types/SymbolicType.java:46-63`); a parameter with no bound otherwise holds `FTypeTop`'s one list (`types/FTraitOrObject.java:76-80`, `types/FTypeTop.java:26`), which every unbounded symbolic type of the load shares. Gated by `tests/WhereBoundOverloadWalk.fss` (`p(3)` runs `p(x: ZZ32)` beside `trait W[\T\] where { T extends ZZ32 }`) and `OverrideAfterWhereBoundWalk.fss`.

### Ledger

The skeptic's rows, checked against the template with `ledger.py add` on a copy of the ledger (they took 671 and 672 there): NEW-W-1 in "2. Types: generics, static parameters, inference and coercion", NEW-W-2 in "3. Traits, objects and components". NEW-W-1 is fixed by 7b625cdf9: the gather adds it and closes it (`ledger.py close N --commit 7b625cdf9 --test WhereBoundOverloadWalk`) if the commit lands, and keeps it open if the judge reverts it. NEW-W-2 exists only with e8d377669; if the judge reverts e8d377669 (and 02f94f4a5 with it), it is not added. NEW-W-3, in "5. Overloading on the compiled path: checker and dispatch" (673 on the copy), is a compiled-path measurement of the skeptic's differential, apart from every fix: the rung's paths do not reach `compiler_tests/`, and row 650 stops any compiled test of it, so it has no reproducer.

| NEW-W-1 | under walk, a `where` clause that bounds an unbounded static parameter of a generic trait or object bounds every other unbounded static parameter of the load: with `trait W[\T\] where { T extends ZZ32 }` declared, `p(3)` runs `p[\U\](x: U)` over the more specific `p(x: ZZ32)` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/trait-parameters.tex`, "Where Clauses" | `ProjectFortress/tests/WhereBoundOverloadWalk.fss` | climb batch 13 rung W's skeptic | siblings: 478. `SymbolicType.addExtends` appended the bound in place (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/SymbolicType.java:54-57` at a1a75716a) to a list that, for a parameter with no bound, is `FTypeTop`'s one list (`types/FTraitOrObject.java:76-80`, `types/FTypeTop.java:26`), so every unbounded symbolic type took the bound; the Meet Rule check's stand-ins (`BuildEnvironments.symbolicInstance`) run before pass 3. On the base `p(3)` prints `U`. Fixed by the skeptic's contested 7b625cdf9 (the bound goes into a list of the parameter's own); the gather closes the row if it lands. |
| NEW-W-2 | under walk, an `override` over an inherited declaration whose parameter types mention a static parameter is not refused when it overrides nothing, in an object expression with static parameters or a generic declaration extending a type under a `where` clause: `override f(x: String)` over `f(x: T)` | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/traits.tex`, "Method Declarations" | `ProjectFortress/tests/XXXOverrideObjectExpressionOverParamWalk.fss` | climb batch 13 rung W's skeptic | siblings: 665. Walk's rewrite gives an object expression the static parameters it uses without the where clauses of the declarations around it (`ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1127`), and the stand-in reads an extends clause under a where clause as unconditional (`BuildEnvironments.java:1060`), so `Constructor.checkOverrides` counts such an inherited declaration, unless its parameter types equal the override's, as possibly overridden (`boundsUnread`, `symbolicDomain`, skeptic's contested e8d377669). The base loads the same programs. |
| NEW-W-3 | the compiled checker's choice for a dotted call whose numeral arguments need a coercion keeps a declaration that the receiver's `override` overrides: with `B`'s `override f(x: Number, y: ZZ32)` over `A`'s `f(x: ZZ32, y: ZZ32)`, `B.f(3, 4)` is refused as an ambiguous coercion | NEGATIVE-VERIFIED | implementation gap (checker) | `basic/traits.tex`, "Method Declarations" | none | climb batch 13 rung W's skeptic | siblings: 391, 610, 650, 653. `typecheck` on a1a75716a: 'Ambiguous coercion in method invocation B.f: of the declarations applicable to an argument of type (IntLiteral, IntLiteral) only by coercion, none is more specific than every other: (ZZ32, ZZ32)->String; (Number, ZZ32)->String.', the same message as without `override`. With `ZZ32` arguments the override drops `A`'s `f`: `f(x: ZZ32, y: ZZ32): Any` beside `override f(x: Number, y: ZZ32): String` and `s: String = B.f(z, z)` check (without `override`, 'Invalid overloading of f in trait B'). Walk prints `B`. Row 650 stops the compile, so no compiled test can show it. |

- **Row 665.** Append (e8d377669): "An object expression's `override` over a declaration whose parameter types mention a static parameter is not refused when it overrides nothing (NEW-W-2), since the where clauses that may bound the parameter do not reach the check."

### Handover

- The skeptic's 7b625cdf9 (contested): a `where` clause's bound stays its own static parameter's under walk; before it, one generic declaration's `where` bound on an unbounded parameter bounded every unbounded parameter of the load, so `p(3)` ran a generic `p[\U\]` over `p(x: ZZ32)` (also on the base), and the generic override check accepted what it refuses alone (NEW-W-1).
- The skeptic's e8d377669 and 02f94f4a5 (contested): the generic override check does not refuse an `override` over a static parameter whose bounds walk does not read (an object expression's, or under a conditional extends clause); the residue is NEW-W-2. `ant testSystem` on e8d377669: 563, green.

### Revival change, if e8d377669 lands

In the resolution of "An abstract method without a body, and an `override` that overrides nothing, under walk", after "also one at the inherited declaration's own parameter types.", add: "It does not refuse one over an inherited declaration at a static parameter whose bounds it does not read: an object expression's, whose static parameters walk's rewrite lifts without the `where` clauses around them, or one under an `extends` clause's `where` clause (ledger row NEW-W-2)."

In `references/interpreter.md`, the replacement bullet above ends: "... An `override` at an inherited declaration's own parameter types overrides nothing. Walk does not refuse an `override` in an object expression over a declaration at a static parameter of the function around it."

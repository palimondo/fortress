# Record lines: climb batch 16, rung W (`rung-walk-overload-if`)

## FACTS

A new entry in "Landed semantics", beside F-145:

- **Under walk, two generic declarations a pair of whose parameter types excludes only when both are read at one instantiation are read each over its own instances, and are valid only by the No Duplicates, Return Type and Meet Rules on their declared domains.** Walk's load check read two generic functions of one name and one list of static parameters at one shared symbolic instantiation (`FGenericFunction.java:43-64`), and two instances of one generic object as two types that cannot be extended. Now such an exclusion is withdrawn where the instances of each do not exclude (instances of one generic type exclude only where their static arguments cannot be equal; an exclusion read at the shared instantiation stands where every generic type both extend forces one instance, as `Array` and `ImmutableArray` through `ReadableArray`), and the pair is then refused where each domain is inside the other, valid where one is inside the other with its return type below at the holding instance, or where a third declaration inside both holds their overlap (F-bounds read from the declarations); otherwise refused, "with generic type, at least one pair of parameters must have excluding types" (F-155). A pair the old reading did not find excluding keeps its refusal (row 159). Gated by `tests/GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `GenericOverloadInstancesApartWalk` (refused), `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk` and `ShuffleTest` (load). Detail: `compile-ladder/rung-walk-overload-if/REPORT.md` sections 1 and 9.

A new entry in "Landed semantics":

- **Under walk, an `if` clause without a binding takes a `Boolean` by its value, a `Just` of the library's `Maybe` as true and a `Nothing` as false, and refuses every other value, "If clause did not return boolean".** A `Just` is true whatever it holds; a number, a string and an object that is neither are refused as `()`, a tuple and a function were (`Evaluator.java:582-621`). A refusal while a top-level variable is initialised counts as a refusal at load. Gated by `tests/IfClauseObjectWalk`, `IfClauseNumberWalk`, `IfClauseStringWalk`, `maybeTest` and `naturalsTest`. Detail: `compile-ladder/rung-walk-overload-if/REPORT.md` section 1.

Rewrite in place:

- **F-228** (`FACTS.md:150`): "Left open: an empty clause form no declared type directs (row 716), a comprehension no declared type reaches (rows 20 and 717), a user big operator whose declared result is its own trait (row 718), an argument of a call (rows 510 and 705)." becomes "A big operator whose declared result is a trait of its own is read through the `BigReduction`, `Comprehension` or `BigOperator` that the trait extends, its static arguments substituted (`EvaluatorBase.libraryBigResult`). Left open: an empty clause form no declared type directs (row 716), a comprehension no declared type reaches (rows 20 and 717), an argument of a call (rows 510 and 705)." Its gate list gains `UserBigOperatorResultTraitWalk`; its detail gains `compile-ladder/rung-walk-overload-if/REPORT.md` section 1.
- **F-223** (`FACTS.md:179`): "Walk runs one of such a pair in two shapes (rows 373 and 549)." becomes "Walk refuses such a pair of two generic declarations at load, and runs one of a generic declaration beside a plain one at its bound (row 549)."; "and walk's departure by `tests/XXXNoDuplicatesRuleWalk`" becomes "and walk's refusal by `tests/NoDuplicatesRuleWalk`".

## Ledger

Closes, after the fix lands (`0be28a5a6`, with the meet's refinement `e9fbbff7f`, on the branch; the gather names the commits on `main`):

- **Row 373.** `close 373 --commit 0be28a5a6 --test GenericOverloadInstancesApartWalk --note "fixed 0be28a5a6 and e9fbbff7f (climb batch 16 rung W, P-45): a two-generic pair whose parameter types exclude only read at one instantiation is read over each one's instances, on its declared domains; XXXGenericBoundsNoMeetWalk and XXXNoDuplicatesRuleWalk promoted to GenericBoundsNoMeetWalk and NoDuplicatesRuleWalk."`
- **Row 673.** `close 673 --commit 0be28a5a6 --test IfClauseObjectWalk --note "fixed 0be28a5a6 (climb batch 16 rung W, the coordinator's call 6): walk's if takes a Boolean by value, a Just as true, a Nothing as false, and refuses every other value; XXXIfClauseObjectWalk promoted to IfClauseObjectWalk, with IfClauseNumberWalk and IfClauseStringWalk."`
- **Row 718.** `close 718 --commit 0be28a5a6 --test UserBigOperatorResultTraitWalk --note "fixed 0be28a5a6 (climb batch 16 rung W): resultArgOf reads the BigReduction, Comprehension or BigOperator a declared result extends, its static arguments substituted; XXXUserBigOperatorResultTraitWalk promoted to UserBigOperatorResultTraitWalk."`

Notes:

- **Row 159** (notes cell 622 of 700 characters), append: "Batch 16 W reads pairs excluding only at one instance on declared domains." (74 characters)
- **Row 697** (681 of 700), **row 444** (683 of 700) and **row 549** (684 of 700) have no room. What the rung read of each is in `REPORT.md` section 11: row 697's expected failure keeps its verdict and its repair still waits on row 433; row 444's site is `Constructor`'s one `OverloadedMethod` of inherited and declared methods (`values/Constructor.java:383-388`), whose pair analysis compares the parameter lists without the receiver (`OverloadedFunction.java:1761-1773`); row 549's half of Appendix I's sentence stands.

Other record files that name the four old test names, for the gather: `explorations/reviews/popl2019-examples.md:131` and `:282` (`XXXGenericBoundsNoMeetWalk`), `explorations/compile-ladder/rung-popl-examples/REPORT.md:226` (`XXXNoDuplicatesRuleWalk`), `explorations/coordinator/PLAN.md:386` (row 373's reproducer, `XXXGenericBoundsNoMeetWalk.fss`), and FACTS F-223 (above).

## New rows

None.

## Handover

Climb batch 16 rung W landed walk's check of two generic declarations over each one's own instances (row 373), its `if` on a `Boolean` or a `Maybe` only (row 673) and a user big operator's result through its `BigOperator` supertype (row 718); no library api, team test or specification example is refused (47 api probes the same on old and new code; testSystem 626/0; testSpecData 130/0); row 159's pairs keep their refusal, a question for the curator.

## For the curator

- Row 159: walk now reads on declared domains only a two-generic pair whose parameters excluded at one instantiation alone (`OverloadedFunction.java:764`), so row 159's renamed and swapped arms, nested pairs it never took as excluding (`tests/XXXDispatchRenamedArmWalkRungG.fss`, `XXXDispatchSwappedArmWalkRungG.fss`), stay refused while `GenericBoundsMeetWalk`'s nested pair loads. Should walk read every pair of two generic declarations on its declared domains, as the checker does, promoting those two tests and lifting row 159's design limit?

## Revival change

### Walk's `if` on a value that is not a `Boolean`

The change:
- The team's sources: the specification takes a clause without a binding only of type `Boolean` (`Specification/basic/expressions/if.tex:54`). The team's walk took a value whose type is named `Just` as true and every other object as false, refusing only `()`, a tuple or a function (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:594-600` at `a874948ac`). The team's gated tests take a `Nothing` as false and a `Just` as true in a plain `if` (`ProjectFortress/tests/maybeTest.fss:21-22`, `naturalsTest.fss:21-22`).
- What the tree now does: a `Boolean` by its value; a `Just` of the library's `Maybe` as true, whatever it holds, and a `Nothing` as false; every other value refused, "If clause did not return boolean, but 1: ZZ32" for a number (`Evaluator.java:582-621`; `tests/IfClauseObjectWalk`, `IfClauseNumberWalk`, `IfClauseStringWalk`, `maybeTest`, `naturalsTest`).
- The reason: the specification's rule, which the compiled checker enforces ("Filter expressions in generator clauses must have type Boolean, but O had type O.", the checker's refusal of `if O then`), and the team's own gated tests, which take a `Maybe` clause; an object that was neither took the `else` branch silently.

Provenance: row 673; the coordinator's call 6 of climb batch 16 (`CLIMB-BATCH-16.md:86`), rung W.

### Walk's check of two generic declarations

The change:
- The team's walk read two generic functions of one name and one list of static parameters at one shared symbolic instantiation (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FGenericFunction.java:43-64`), took two instances of one generic object as two types that cannot be extended and so exclude (`interpreter/evaluator/types/FType.java:212-217`), and marked a pair whose differing parameters are object types distinct (`OverloadedFunction.java:466` at `a874948ac`). So it loaded `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])` where `P[\T\] excludes { Q[\T\] }`, `dup[\T\](x: Box[\T\])` beside `dup[\U\](x: Box[\U\])`, and two `sort`s over `ListI` bounded by two unrelated traits, and ran one of each pair.
- What the tree now does: each domain is read over its own instances; such a pair is valid only by the No Duplicates, Return Type and Meet Rules on its declared domains, and otherwise refused, "with generic type, at least one pair of parameters must have excluding types" (`OverloadedFunction.java:424-535`, `:760-1187`; `tests/GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `GenericOverloadInstancesApartWalk` refused; `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `ShuffleTest` load). A pair whose parameter types never excluded in the team's reading keeps the team's refusal.
- The reason: the specification reads a declaration with static parameters over every instance within its bounds and decides exclusion by existential reduction, instances of one parameterized trait meeting only where their static arguments are equal (`Specification/advanced/overloading.tex:536-538`, `:579-588`); the compiled checker refuses the three pairs ("Invalid overloading of sort", "There are multiple declarations of dup with the same parameter type: Box[\T\]", "Invalid overloading of o").

Provenance: row 373; P-45 and P-26, with climb batch 14's POPL 2019 examples A6 and B4; climb batch 16, rung W.

### A big operator whose declared result is a trait of its own, under walk

The change:
- The team's specification desugars a reduction by the type of its expression (`Specification/advanced/parallelism-locality/defining-generators.tex:117`). Walk read that type off a big operator's declared result named `BigReduction`, `Comprehension` or `BigOperator` only, so `opr BIG CATOP[\T\](): CatOperator[\T\]` took its bound and stopped at an element it did not admit, `CastError`; the skill's entry on a reduction without static arguments under walk lists it as the third case where walk differs from the specification.
- What the tree now does: the declared result is read through the `BigReduction`, `Comprehension` or `BigOperator` its trait extends, its static arguments substituted (`EvaluatorBase.java:281-336`; `tests/UserBigOperatorResultTraitWalk`). Two cases remain where walk differs: an empty clause form no declared type directs, and a comprehension no declared type reaches.
- The reason: a trait that extends `BigOperator` is one, and its supertype's static arguments are the operator's element and result types, which the desugaring by type fixes.

Provenance: row 718; P-48 and F-228's open item; climb batch 16, rung W.

<!-- Climb batch 13, rung W (rung-walk-override): the judge's ruling on the skeptic's two contested fixes, 7b625cdf9 and e8d377669 with 02f94f4a5. -->

# The judge's ruling on rung W of climb batch 13

Decision: **stands**. Both contested fixes are **upheld**: 7b625cdf9, and e8d377669 with 02f94f4a5. Nothing is reverted, so the rung lands as the branch holds it at 78021df0a, plus this file. No build and no test was run for this ruling. Every result below is the skeptic's or the worker's, cited where it is quoted. Every point about the code is a reading of the tree at 78021df0a or at the base a1a75716a.

## 1. Fix 1, 7b625cdf9: a `where` bound stays its own static parameter's

### What it changes

`SymbolicType.addExtend` and `addExtends` copy the parameter's extends list before they add the bound (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/SymbolicType.java:46-63`). Its tests are `ProjectFortress/tests/OverrideAfterWhereBoundWalk.fss` with its `.test`, and `WhereBoundOverloadWalk.fss`. It is contested as beyond the rung, for two reasons: the section does not list the file, and the fix changes which declaration walk runs.

### The ruling: uphold

1. **The defect is real, by reading.**
   - `setExtendsAndExcludes` gives any type whose extends list is empty `FTypeTop`'s one list: `extends_ = FTypeTop.ONLY.getTransitiveExtends()` (`interpreter/evaluator/types/FTraitOrObject.java:78-80`). That list is a single static `SingleT` (`types/FTypeTop.java:26`, `:44-46`).
   - At the base, `addExtends` was `extends_.addAll(t)` and `addExtend` was `extends_.add(t)`. Both wrote into that list in place (`git show 7b625cdf9`, the removed lines).
   - The bound reaches them from two places. A header's `where` clause goes through `SingleFcn.createSymbolicInstantiation` (`interpreter/evaluator/values/SingleFcn.java:224-234`), which `BuildEnvironments.symbolicInstance` calls for every stand-in (`interpreter/evaluator/BuildEnvironments.java:1059`). A declared trait's or object's `where` clause goes through `processWhereClauses` (`:977`).
   - Subtyping reads the list each time it is asked: `FTraitOrObject.subtypeOf` walks `getExtends()` (`types/FTraitOrObject.java:204-213`), and `getExtends()` returns the field itself (`:106-110`).
   - So once a bound has gone in, every holder of the shared list sits below it. That holds for every unbounded static parameter, as measured. By reading, it also holds for any trait or object whose evaluated extends list was empty. The second case was not measured.
   - No other code writes into an extends list in place: `grep -rn "extends_\.add\|getExtends()\.add\|getTransitiveExtends()\.add"` under `interpreter/` prints nothing on the branch. So the skeptic's claim that "the two mutators are the only writers of the shared list" holds, and the copy closes the aliasing for every holder.

2. **It makes the rung's own check order-dependent, and the worker's account does not hold without it.**
   - The worker's D5 reads each static parameter "below their bounds" (`REPORT.md:268`). With the shared list, an unbounded parameter sits below every `where` bound declared anywhere in the load.
   - The skeptic measured this (`SKEPTIC.md:73-75`, `:81-82`). `SkPolluteAlone` is refused on the worker's code. `SkPolluteAfter` and `SkPolluteNoOverrideFirst` load and print `G2`, and they differ from it only by an unrelated earlier trait with a `where` clause.
   - The chapter's static error belongs to the declaration (`Specification/basic/traits.tex:594-595`, at the line numbers the brief gives). An unrelated declaration cannot change whether there is one.
   - `OverrideAfterWhereBoundWalk` pins the declaration's verdict. Under every reading on record it is right: `override g(x: ZZ32)` over `A[\U\]`'s `g(x: U)`, with `U` unbounded, is no strict subtype at the declaration. At the instance `G[\ZZ32\]` the two parameter types are equal, so the declaration overrides nothing there either (`traits.tex:585-589`).

3. **The dispatch it changes is changed toward the specification.**
   - "A declaration d1 is more specific than a declaration d2 when d2 is applicable to every call to which d1 is applicable, and not the other way round" (`Specification/advanced/overloading.tex:539-541`). `p(x: ZZ32)` is therefore more specific than `p[\U\](x: U)` with `U` unbounded.
   - On the base, `p(3)` runs `p[\U\]` only when the unrelated `trait W[\T\] where { T extends ZZ32 }` is in the load (`SKEPTIC.md:77-78`: `SkPolluteOverload` prints `U, U` on the old code, and `SkPolluteOverloadAlone` prints `Z, U`).
   - `WhereBoundOverloadWalk` asserts the specification's answer. A `where` clause constrains its own static parameter (`Specification/basic/trait-parameters.tex:316-317`, "Static parameters may have constraints placed on them in a **where** clause"). Nothing in the chapter lets it constrain another parameter.

4. **It is within the rung in every sense the batch's rules give.**
   - The file is walk's evaluator, under `interpreter/evaluator/`, which is the rung's area ("Java under interpreter/evaluator/", `explorations/coordinator/CLIMB-BATCH-13.md:455`).
   - The section lists what the rung does not touch (`CLIMB-BATCH-13.md:303`): `overriddenBy`'s other callers, `providedByTrait`, `FunctionalMethodMeets`, `checkForDef`, `definedBelow`, N's three methods of `BuildEnvironments`, the library, the checker, the harness and the demos. `SymbolicType` is none of these.
   - No other rung's branch edits any file under `interpreter/` except N's `BuildEnvironments.java` (`git diff --stat a1a75716a origin/wip/<rung> -- ProjectFortress/src/com/sun/fortress/interpreter` for the four other rungs). N's edit of `processWhereClauses` adds `SymbolicNat`s for nat and int where bindings and calls neither mutator (`git diff a1a75716a origin/wip/rung-size-expressions`, the hunk at `:927`). So no two rungs change one declaration (`CLIMB-BATCH-13.md:321`).
   - The count and distance stages read no walk code (FACTS, "The checker-count and distance stages read only the compiler's phases, so an edit to the test corpora, the texts or walk's evaluator and natives cannot move them").
   - Batch 12's judge upheld an edit to a walk file outside its section's list on the same grounds (`explorations/compile-ladder/rung-walk-load-checks/JUDGE.md:40-44`).

5. **The point it reaches is a point to report, and points to report land.**
   - "A change to which declaration walk runs for a set it loads today" is on the rung's own list (`CLIMB-BATCH-13.md:460`). A rung that reaches one lists it and lands (POSITIONS, "Reversible stops do not hold a batch.").
   - The change can be undone: it is four lines.
   - It acts against no decision on record. It follows the overloading chapter (point 3).

6. **It was tested first, and the suite holds.**
   - Both tests were red on the worker's head and green after the fix (`SKEPTIC.md:118-129`):

         explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-override/skeptic/h-head [the four new tests]
          Missing expected refusal at load
         FAIL: J1/0:U =/= J4/0:ZZ32; p over ZZ32 is more specific than p over an unbounded U, ...
         Tests run: 4,  Failures: 4,  Errors: 0

   - `ant testSystem` on e8d377669's code, which contains this fix, printed shards of 144, 137, 143 and 139 tests with no failure, and "BUILD SUCCESSFUL" (`SKEPTIC.md:170-176`).

7. **Reverting would cost more.** The rung's generic check would land with a verdict that depends on unrelated declarations. The two tests would go with the revert. Row NEW-W-1 would stay open, and an expected failure would be owed (`SKEPTIC.md:135`). The goal is one tree with everything running (POSITIONS, "The specification stays the standard, the Types chapter beside it.").

## 2. Fix 2, e8d377669 with 02f94f4a5: no refusal where walk has lost the bounds

### What it changes

`Constructor.checkOverrides` counts an inherited declaration as possibly overridden in one case (`interpreter/evaluator/values/Constructor.java:600`). The owner's static parameters must have bounds that walk does not read: the owner is an object expression, or it extends a type under a `where` clause (`boundsUnread`, `:641-650`). The inherited declaration's parameter types must mention a static parameter (`symbolicDomain`, `:655-666`). And its parameter types must not equal the override's.

- `OverrideObjectExpressionWhereBoundWalk` and `OverrideConditionalExtensionWalk` load and run.
- `XXXOverrideObjectExpressionOverParamWalk` gates the refusal that the fix gives up.

The worker argued against it in D5 (`REPORT.md:268`).

### The ruling: uphold

1. **The finding is right: the bounds are lost, by reading.**
   - Walk's rewrite gives an object expression a header with `Option.<WhereClause>none()` (`ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1124-1128`).
   - The stand-in reads the extends clause through `NodeUtil.getTypes` (`BuildEnvironments.java:1060`), which keeps a `TraitTypeWhere`'s type and drops its clause.
   - So for these two shapes, D5's own premise, that each parameter is read "below their bounds", is false. The check then refuses programs that the same reading accepts when the bound is written where walk reads it. `SkObjExprBound` and `SkGenHeaderWhereAtBound` load, while `SkObjExprWhere` and `SkGenWhereAtBound` are refused (`SKEPTIC.md:67-71`, `:95`).
   - The specification gives a `where` constraint the force of a bound (`trait-parameters.tex:316-317`). So the refusal of `SkObjExprWhere` is a static error that the specification does not make, and the base loads that program. A rung whose purpose is to refuse what the chapter refuses must not add refusals that the chapter does not make.

2. **The worker's argument does not reach this fix.**
   - D5 rejects "skipping a declaration whose parameter types mention a static parameter, as the Meet Rule check skips such a pair", because that "would leave `override f(x: T)` over an unrelated type unchecked" (`REPORT.md:268`). That is a general skip.
   - Fix 2 is not one. It applies only where `boundsUnread` holds (`Constructor.java:641-650`). Every generic trait and object whose bounds walk does read keeps D5's check in full.
   - D5's own probe keeps its refusal. Its inherited declaration is at `ZZ32`, not at a static parameter, so `symbolicDomain` is false (`REPORT.md:159-168`).
   - Row 665's object-expression test also keeps its refusal. `A`'s `f` there is at `ZZ32` (`ProjectFortress/tests/OverrideNothingGenericObjectExpressionWalk.fss:6-12`).
   - Equal types are still refused everywhere: the clause requires `!sameParameterTypes(m, o)`, and `SkObjExprGenEq` is refused on the fix (`SKEPTIC.md:63`, `:146`).

3. **Leniency is how the method already handles a type it cannot read, and how walk's other load check handles one.**
   - `checkOverrides` already counts as possibly overridden an inherited declaration that is generic, or whose parameter types it cannot read (`Constructor.java:598`, `unreadable`, `:668-676`).
   - The Meet Rule check returns no pair for a parameter type that is symbolic (`interpreter/evaluator/values/OverloadedFunction.java:1105`).
   - A check that refuses at load should refuse only what it can show to be an error.

4. **The way that would keep the refusal is a change of its own.**
   - It means carrying the enclosing declarations' `where` clauses into the rewritten header (`ExprFactory.java:1114-1133`; `interpreter/rewrite/DesugarerVisitor.java:908`).
   - That changes the run-time instantiation of every generic object expression, and it edits a node factory that both paths share (`SKEPTIC.md:144`). It does nothing for the conditional extends clause, whose meaning the specification does not give: `traits.tex:76-83` gives only the grammar of `TraitTypeWhere`, and the prose about the extends clause (`:156-198`) gives no meaning to its per-trait `where`.
   - A repair round is no place for it. The residue is recorded the repository's usual way: `XXXOverrideObjectExpressionOverParamWalk` and row NEW-W-2 (`record.md:71`).

5. **What is given up is the base's own behaviour, and it is gated.** On the base and on the fix, `SkObjExprGenBad` loads, and its run fails at dispatch with the same message (`SKEPTIC.md:51`, `:72`). The skeptic ran the XXX test both ways through the harness, as it is and with `A`'s `f` over `ZZ32` for one run (`SKEPTIC.md:156-158`):

       Saw expected failure: loaded and ran, not refused at load
       OK (1 test)

   It turns red if the lenience goes, so it goes with any revert of e8d377669.

6. **The suite holds.** `ant testSystem` ran on e8d377669's code with no failure (`SKEPTIC.md:170-176`). 02f94f4a5 adds only a test file, which the harness ran twice (`SKEPTIC.md:179`).

## 3. What each side had right

**The worker** was right:
- on the strict relation and where it belongs (D1, `REPORT.md:256-259`, as `walk-load-readings-check.md:98` prescribes);
- on equality read as mutual subtyping (D2);
- on checking at the declaration through the stand-in, not at each instance (D3);
- that a general skip of symbolic parameter types would leave real errors unchecked (D5).

Two claims of the report are superseded by the two fixes:
- "No declaration that walk runs changed, since the rung only refuses" (`REPORT.md:250`) was true of the worker's head. Fix 1 changes one, toward `advanced/overloading.tex:539-541`.
- D5's "below their bounds" (`REPORT.md:268`) holds only where walk reads the bounds. It did not hold for any unbounded parameter in a load with a `where` bound (fix 1), nor for object expressions and conditional extends clauses (fix 2).

**The skeptic** was right on every point it argued:
- the aliasing and its two writers (section 1, point 1);
- the two places where bounds are lost (section 2, point 1);
- that the lenience keeps every refusal the rung's tests pin (section 2, point 2);
- that each revert would need an expected failure and a row (`SKEPTIC.md:135`, `:164`).

One precision for the gather:
- Row NEW-W-1's claim names "every other unbounded static parameter of the load" (`record.md:70`), which is what was measured.
- By reading, the shared list is also every trait or object whose evaluated extends list is empty (`types/FTraitOrObject.java:78-80`, reached from `BuildEnvironments.java:921` and `:1017`). That case was not measured.
- The row's text may stay as measured. Its notes may add "by reading, also any type whose extends list was empty when set".

## 4. For the gather

The rung lands as the branch holds it. The skeptic's additions in `record.md` (`:53-83`) apply as written for "if the commit lands":
- Add row NEW-W-1 and close it on 7b625cdf9 with `WhereBoundOverloadWalk`.
- Add row NEW-W-2.
- Add the FACTS bullets and the entry under "Under walk, a `where` clause's bound on a static parameter bounds that parameter alone".
- Append the note to row 665.
- Add the revival-change sentence.

Also:
- Add `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/SymbolicType.java` to the `historical:` line (`REPORT.md:6`). The file is the team's; its last change before the revival is 5a68404fd (2012-07-19).
- Row 407 cites `SymbolicType.java:74` (`excludesOtherInner`). After 7b625cdf9 that line is `:65`, by the tree at 78021df0a. The skeptic's note gives `:80` (`SKEPTIC.md:40`, `:209`); the method starts at `:65`.
- QW-a and QW-b stand as the worker put them (`REPORT.md:280-290`). QW-c is the skeptic's (`SKEPTIC.md:202-206`). All three go to the curator with the batch's list (section 5).

## 5. For the curator

Neither fix holds the push: each can be undone, and neither acts against a decision on record. These are listed for review after the landing.

- **A point to report (fix 1): walk now runs another declaration for a set it loads today.** With a `where` bound on an unbounded static parameter anywhere in the load, `p(3)` runs `p(x: ZZ32)`, not `p[\U\](x: U)`. The old code printed `U` (`SKEPTIC.md:77`). The new behaviour follows `Specification/advanced/overloading.tex:539-541`. It is gated by `ProjectFortress/tests/WhereBoundOverloadWalk.fss`, and its edit is `interpreter/evaluator/types/SymbolicType.java:46-63`, a file outside the section's list.
- **A decision taken where nothing on record settles it (fix 2): no refusal where walk has lost the bounds** (`Constructor.java:600`, `:641-666`).
  - Way 1, built: the lenience. It costs the refusal of an object expression's `override` that overrides nothing over a declaration at a static parameter (`XXXOverrideObjectExpressionOverParamWalk`, row NEW-W-2), which is the base's behaviour.
  - Way 2: carry the `where` clauses around an object expression into its rewritten header (`ExprFactory.java:1124-1128`, `DesugarerVisitor.java:908`). Its cost is a change to the run-time instantiation of every generic object expression, and to a node factory that both paths share. It is a rung of its own.
  - Way 3: refuse as the worker's head did. It costs false static errors on programs that the base loads (`SkObjExprWhere`, `SkGenWhereAtBound`).
- **QW-c (the skeptic's): what an extends clause's own `where` clause means**, as in `trait G[\T\] extends A[\T\] where { T extends ZZ32 }`. The specification gives only its grammar (`traits.tex:76-83`), and walk reads the extension as unconditional.
  - Way (a), built as a lenience: the inherited declarations are read under the clause, and an `override` at its bound overrides. Test: `OverrideConditionalExtensionWalk`.
  - Way (b): the extension is read as unconditional, and that `override` is a static error. This was the worker's head.
  - The answer belongs with the language's reading of conditional inheritance, which no implementation here models.

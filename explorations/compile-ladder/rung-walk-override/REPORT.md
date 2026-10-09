problem: an `override` at the inherited declaration's own parameter types loads under walk, against the traits chapter's strict subtype, and walk checks no `override` of a generic trait, object or object expression (`explorations/reviews/walk-load-readings-check.md:68-104`, section 3; `explorations/fortress-gap-ledger.md:245`, row 665; `explorations/fortress-gap-ledger.md:370`, row 653)
spec: `Specification/basic/traits.tex:585-595`, section "Method Declarations" ("a strict subtype", `:589`; the static error, `:594-595`), with the inheritance rule's equal clause, `:521-527`
precedent: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:1034-1037` (`checkGenericFunctionalMethodMeets`, which checks a generic declaration once through `symbolicInstance`, `:1048`) and `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1211-1233` (`FunctionalMethodMeets.inherited`, which reads equal parameter types as mutual subtypes)
deviation: at an instance of a generic declaration, equal parameter types still count as overridden (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:588`, `:595`), because the declaration is checked at its static parameters and the chapter's static error is the declaration's
deviation: the object-expression check is in `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:186` and the generic object's in `BuildEnvironments.java:592` (`forObjectDecl3`); both files are beyond the section's two, and the object-expression call sits beside the precedent's own call
historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java`, `ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java`, `Specification/basic/functions.tex`, `Specification/appendices/changes.tex`

# Climb batch 13, rung W: an `override` at equal parameter types, `override` on generic types, the revival-covering box

Branch `wip/rung-walk-override`, cut from a1a75716a. Commits: 4e0833a4f (the tests), 7ea90f57d (walk), 6bfd27720 (the specification). `seed-worktree.sh` seeded the worktree: exit 0, "seeded from /home/user/fortress-base13 (a1a75716a) in 3 s".

## 1. What changed, and why

**The strict relation (Q2 of batch 12's rung W, at its strict default).**

The chapter's rule:
- An `override` "overrides any inherited declaration ... whose parameter type, not counting the type of the self parameter, is a strict subtype of the overriding declaration's parameter type" (`Specification/basic/traits.tex:585-589`).
- "It is a static error if a declaration with the modifier override does not override any inherited declaration" (`:594-595`).
- A declaration at equal parameter types hides the inherited one by the inheritance rule's equal clause (`:521-527`). It overrides nothing.

What walk did: `Constructor.checkOverrides` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:569-608`) asked only `overriddenBy`: each inherited parameter type a subtype of the override's, equality included. So `object B extends A` with `override f(x: ZZ32)` over `A`'s `f(x: ZZ32)` loaded and printed `B`.

What it does now: it also asks that not all parameter types be equal. The new `sameParameterTypes` (`:610-627`) reads two types as equal when each is a subtype of the other, as `FunctionalMethodMeets.inherited` does (`OverloadedFunction.java:1211-1233`).

What is unchanged: `overriddenBy` (`Constructor.java:666`) and its other callers, `providedByTrait` (`:519`) and `FunctionalMethodMeets.inherited`. There the equal clause and the override clause act together, and what a type inherits does not change.

**At an instance of a generic declaration**, equal parameter types still count as overridden (`owner instanceof GenericTypeInstance`, `Constructor.java:588`; `:595`).
- The landed check reads the `override` declarations of a generic trait's instance where an object without static parameters extends that instance (`providedByTrait` with its check on, `:269` and `:519-537`).
- An instance can make equal two parameter types that the declaration keeps apart. Example: `trait G[\T\] extends A[\T\]` with `override f(x: Any)` over `A[\T\]`'s `f(x: T)`. At the declaration it overrides, since `T` is a strict subtype of `Any`. `G[\Any\]` makes both types `Any`.
- The declaration is now checked at its static parameters (below), and there the relation is strict.
- At an instance the landed relation stays. It is the fallback for a declaration that walk can make no stand-in for.
- `tests/OverrideGenericInstanceEqualTypesWalk.fss` gates it.

**The generic declarations (row 665's override half).**

What walk checked: an `override` only in an object without static parameters (`Constructor.java:269`, under `if (declared)`) and in a trait without static parameters (`BuildEnvironments.java:874`).

The new check:
- `BuildEnvironments.checkGenericOverrides` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:886-899`) checks a trait, object or object expression with static parameters that declares an `override`. It checks it once, at its declaration.
- It checks through a stand-in: the type that stands for every instance, with a symbolic type for each static parameter (`symbolicInstance`, `:1048`). The Meet Rule check of the same declarations works the same way (`checkGenericFunctionalMethodMeets`, `:1034-1037`).
- `Constructor.checkTypeOverrides` (`Constructor.java:547-567`) checks the stand-in as a declared trait (`checkTraitOverrides`) or a declared object (`finishInitializing`, `:263-269`) is checked.

Where it is called:
- in pass 3, for a generic trait (`BuildEnvironments.java:875`) and a generic object (`:592`);
- where a generic object expression (one in a generic function) is registered (`ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java:186`), beside the Meet Rule check.

`declaresOverride` now takes the declarations (`BuildEnvironments.java:878-884`), so that the object and the object expression can use it.

The refusal is the landed message, with the generic declaration's name: "Invalid override of f in G: f(x:FortressLibrary.String):FortressLibrary.String ... has the modifier override and does not override any inherited declaration" (`cd ProjectFortress && ../bin/fortress tests/OverrideNothingGenericTraitWalk.fss`, rc=1). An object expression's owner prints as `*objectexpr_ObjectExpr at .../OverrideNothingGenericObjectExpressionWalk.fss:10.20`.

**The revival-covering box.**
- Its last sentence (`Specification/basic/functions.tex:441-445`) and the sentence of the Appendix I entry's effect that repeats it (`Specification/appendices/changes.tex:2627-2631`) said that the compiled checker covers inherited abstract methods "reading no comprises clause".
- They now say that it reads such clauses: concrete methods over the types that a trait lists together cover an abstract method over that trait.
- The entry records the correction in its Change (`changes.tex:2574-2582`), its reason in its Rationale (`:2607-2620`) and the replaced sentence in its Original text (`:2664-2672`). This is the form the entries already use for a revised box ("The box said at first ...; it now says ...", `changes.tex:1017-1032`).
- Section 5 gives the evidence.

**The two owed tests.**
- `tests/ReductionSimpleJoinAtAnyWalk.fss`, with its `.test` keyed `load_exception_contains=does not define an abstract method declared in type AssociativeReduction`: an object that extends `AssociativeReduction[\ZZ32\]` and declares only `simpleJoin(a: Any, b: Any): Any`.
- `tests/PairsRunRangesWalk.fss`: imports `Pairs` and asserts three values of `runRanges` (`Library/Pairs.fss:72-73`).
  - Its `BIG BOXPLUS` joins `SingleRange`s and `RangeSet`s, so `SingleRange`'s `BOXPLUS` (`:83-87`) runs.
  - `Pairs` loads only through row 666's allowance (`Constructor.java:468`, `definedBelow`). So the test turns red if the allowance goes without a repair of `Pairs`.

## 2. The tests, their failing run and their passing run

All the tests are in `ProjectFortress/tests/`, committed in 4e0833a4f.

New:
- `OverrideEqualTypesWalk.fss` and `.test`;
- `OverrideNothingGenericObjectExpressionWalk.fss` and `.test`;
- `OverrideGenericInstanceEqualTypesWalk.fss`;
- `ReductionSimpleJoinAtAnyWalk.fss` and `.test`;
- `PairsRunRangesWalk.fss`.

Promoted by `git mv`, with their `component` lines (`.fss` and `.test` each):
- `XXXOverrideNothingGenericWalk` to `OverrideNothingGenericWalk`;
- `XXXOverrideNothingGenericTraitWalk` to `OverrideNothingGenericTraitWalk`.

The failing run was on the base's code, 19:17:10Z-19:17:30Z, before the edit was first built (19:20:11Z):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-override/h-base \
      [the seven tests, with their .test files]

    . interpret tmp/rung-walk-override/h-base/tests/OverrideEqualTypesWalk
    B
     Missing expected refusal at load
    FAILURES!!!
    Tests run: 7,  Failures: 4,  Errors: 0

Four tests were red, each "Missing expected refusal at load":
- `OverrideEqualTypesWalk` (prints `B`);
- `OverrideNothingGenericWalk` (prints `G`);
- `OverrideNothingGenericTraitWalk` (prints `loaded`);
- `OverrideNothingGenericObjectExpressionWalk` (prints `G`).

The other three passed on the base:
- `OverrideGenericInstanceEqualTypesWalk` ("PASS", "OK");
- `ReductionSimpleJoinAtAnyWalk` ("OK Saw expected refusal at load");
- `PairsRunRangesWalk` ("PASS", "OK").

The passing run is the last after the last change of code: the code of 7ea90f57d, built at 19:24:35Z, run at 19:24:58Z. It ran 22 tests:
- the seven above;
- the five kept override tests: `OverrideNothingWalk`, `OverrideNothingInTraitWalk`, `OverrideInTraitWalk`, `AbstractOverrideUndefinedWalk` and `FunctionalMethodOverrideOtherPathWalk`;
- the team's `disp0`, `disp1` and `FunctionalMethodMeetProvided`;
- the expected failures `XXXAbstractMethodPartlyDefinedWalk`, `XXXAbstractMethodUndefinedGenericWalk` and `XXXAbstractMethodUndefinedGenericObjectExpressionWalk`, and the team's `XXXUnimplementedMethod`;
- `AbstractMethodUndefinedWalk`, `FunctionalMethodMeetGenericProviderWalk` and `FunctionalMethodMeetObjectExpressionWalk`.

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-override/h-final [the 22 tests]
    OK (22 tests)

The three generic and partly-defined abstract-method expected failures each print "Saw expected failure: loaded and ran, not refused at load". Row 665's abstract half is unchanged.

The suite ran once on 7ea90f57d, since the edit is walk's Java: `ant testSystem`.

    [junit] Tests run: 139, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 288.304 sec
    [junit] Tests run: 138, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 321.924 sec
    [junit] Tests run: 139, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 325.724 sec
    [junit] Tests run: 143, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 331.696 sec
    BUILD SUCCESSFUL

That is 559 tests, against 554 in climb batch 12's gate (`explorations/compile-ladder/climb-batch-12/gate/summary.txt`: 138, 140, 141, 135). The difference is the five new files. No verdict changed except those of the four tests above.

## 3. Where the fix belongs, and the precedent

Where it belongs:
- `explorations/coordinator/map/spec-to-implementation.md:221-223` puts walk's traits, methods and objects in `BuildEnvironments.forTraitDecl` and `forObjectDecl` and the environments that they build.
- Walk's load checks of `override` are `Constructor.checkOverrides` and its two callers (FACTS, "Walk refuses at load an object that leaves an inherited abstract method without a body").
- The strict relation belongs in `checkOverrides` alone (`explorations/reviews/walk-load-readings-check.md:98`).
- Those callers do not reach the generic declarations. A generic object has no `Constructor` until an instance is made, which is at run time. A generic trait has none at all.

The precedents:
- For a generic declaration, the Meet Rule check. `checkGenericFunctionalMethodMeets` (`BuildEnvironments.java:1034-1037`) and `ComprisesCheck.checkFunctionalMethodMeets` check a generic trait, object or object expression once, through `symbolicInstance`. The file holds those two sites. Batch 12's rung W put the object expression's call in `ComponentWrapper.registerObjectExprs` (fdd377ead).
- For equality, `FunctionalMethodMeets.inherited` (`OverloadedFunction.java:1211-1233`): `equal &= xy && y.subtypeOf(x)`.

The ways that the language and walk offer for the generic check:
1. At the declaration, through the stand-in. This rung takes it.
2. At each instance, in `finishInitializing` and `providedByTrait`, by dropping `if (declared)`.
3. At the declaration, by reading the declared types as written, as `ComprisesCheck` reads extends clauses, with no stand-in.

Why not way 3: it needs a second reader of parameter types, and `MethodClosure.getDomain` already reads them on the stand-in.

Why not way 2:
- It runs at an object's first instantiation, which is at run time. The harness counts that as "Failed after load", not a refusal at load (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:480-512`).
- It never runs for a generic trait that no object extends (`OverrideNothingGenericTraitWalk`).
- With the strict relation, it would refuse `G[\Any\]` of section 1, which is no static error.

## 4. The cost on the one library's load, and what the check now refuses

**The cost.** It was measured with a counter, put in `checkGenericOverrides` for one build and then removed. `git diff` shows the method as committed, rebuilt at 19:24:35Z before the final runs. The counter printed two lines: `PROBE-scan` before the test of the modifier and `PROBE-standin` after it. Direct walk runs:

    tests/BooleanOps.fss rc=0 scans=146 standins=0
    tests/PairsRunRangesWalk.fss rc=0 scans=167 standins=0
    tests/disp1.fss rc=0 scans=148 standins=1
    tests/OverrideGenericInstanceEqualTypesWalk.fss rc=0 scans=148 standins=1

- The one library's load reads the declarations of its 146 generic traits, objects and object expressions for the modifier, and builds no stand-in.
- It builds none because the library declares no `override`. `grep -rnE '^\s*override\s|\soverride\s+[a-zA-Z(]'` over every `.fss` and `.fsi` of the tree finds the modifier only in `ProjectFortress/tests/` and `ProjectFortress/compiler_tests/`. In `Library/`, the word is only in four comments.
- The 146 equal the Meet Rule check's stand-ins per load (FACTS, "Walk refuses at load an object that leaves an inherited abstract method without a body"), which that check builds anyway.

**What the check now refuses.** The declaration is read at its static parameters, each a symbolic type below its bound. So a generic declaration's `override` at a static parameter, over an inherited declaration at a type below the bound, is refused. The base ran it at an instance:

    trait A  f(x: ZZ32): String = "A"  end
    trait G[\T extends Number\] extends A  override f(x: T): String = "G"  end
    object O extends G[\Number\] end      run(): () = println(O.f(3))

- On the old code (`old-fortress.sh /home/user/fortress-base13 $PWD/tmp/old-caches tmp/rung-walk-override/probes/OverrideAtParamProbe.fss`), it prints `G`.
- On the new code (`bin/fortress` on the same file): "Invalid override of f in G: f(x:T):FortressLibrary.String ... has the modifier override and does not override any inherited declaration".
- At `G`'s declaration, `ZZ32` is no subtype of `T`, so the chapter makes it a static error there.
- No program in the tree writes this shape. Question QW-b, below.

## 5. What the specification settles

- **The equal-typed `override`:** `traits.tex:589`, "a strict subtype", and `:594-595`. The review's verdict is at `walk-load-readings-check.md:94-104`, and this rung builds its default (b).
- **The generic declarations:** the same paragraph names no exception for them, and the static error is the declaration's. The text does not address an instance that makes two parameter types equal (QW-a).
- **The box's sentence:** the checker has read comprises clauses in its coverage check since the team's 59fdeff62 (Guy Steele, 2012-06-06). Its message: "Fixed TypeAnalyzer (pSubInner) so that when asking the question A <: B union C where A has a comprises clause { D, E }, one of the questions it asks is whether D union E <: B union C. This should improve the behavior of 'covers' checks in AbstractMethodChecker".
  - The code: `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:154-158`, and the coverage check, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/AbstractMethodChecker.scala:81-122`.
  - Three probes on the old code, each `trait D comprises { P, Q }` with abstract `f(self, other: D): ZZ32`. Command: `old-fortress.sh /home/user/fortress-base13 $PWD/tmp/old-caches typecheck P.fss`, in `tmp/rung-walk-override/probes/`.
    - `CoverAbstractProbe`, objects `P` and `Q` each declaring `f` over `P` and over `Q`: rc=0.
    - `CoverAbstractPartProbe`, `Q` declaring `f` over `P` only: rc=255, "Domain D is not a subtype of P", "The inherited abstract method f(self:(D & {P, Q}),other:D):ZZ32 from the trait D has no concrete implementation in the object Q".
    - `CoverAbstractOpenProbe`, the first without the `comprises` clause: rc=255, "Domain D is not a subtype of OR(Q,P)".
  - So the checker reads the clause: the same methods cover `D` with it and not without it. Batch 12's rung W measured the first shape too (`explorations/compile-ladder/rung-walk-load-checks/REPORT.md:147`).

The specification's build: `( cd Specification/fortress && ./ant genSource && ./ant tex )`.
- Both steps print "BUILD SUCCESSFUL".
- `grep -c "LaTeX Warning: Reference\|LaTeX Warning: .*multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` prints 0.
- The label is defined: `\newlabel{sec:revival-covering}{{I.1.32}{635}`.
- The skill's grep prints 41. Each of the 41 is the traced definition of LaTeX's `\@warning` macro, as `explorations/compile-ladder/rung-library-slips/REPORT.md:182` found.
- The build's files were removed with `git clean -fXq -- Specification`.

## 6. Programs run old against new

- The seven tests of section 2: the failing run on the base's code in this tree, before the first build, then the passing run on the new code.
- `OverrideAtParamProbe` (section 4): the old code prints `G`, and the new code refuses it at load.
- `CoverAbstractProbe`, `CoverAbstractPartProbe` and `CoverAbstractOpenProbe` (section 5): old code only, since the rung does not change the checker.

## 7. The checker count, the distance and the ladder subset

`ProjectFortress/src/com/sun/fortress/interpreter/env/ComponentWrapper.java` is outside the paths that can move neither stage. So both stages ran once on 7ea90f57d, after its build.

**The count** (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-walk-override/checker-count-postedit.txt tmp/rung-walk-override/cc-post`, 19:26:13Z-19:29:21Z): `diff explorations/compile-ladder/climb-batch-12/gate/checker-count.txt tmp/rung-walk-override/checker-count-postedit.txt` prints nothing. The table ends "#total	1", "#crash	none".

**The distance** (`explorations/coordinator/tools/distance/run.sh tmp/rung-walk-override/distance-postedit.txt tmp/rung-walk-override/dist-post`, started detached at 19:29:21Z): "EXIT=0", "#seconds	1232	FortressLibrary 721". `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt tmp/rung-walk-override/distance-postedit.txt` prints:

    DISTANCE SAME   153

No site moved, read by row (row 577): `diff <(sort explorations/compile-ladder/gate/distance-sites.tsv) <(sort tmp/rung-walk-override/dist-post/errors.tsv)` prints nothing (154 lines each).

**The ladder subset** is empty, so nothing ran:
- `grep -rlE 'interpreter\.(env|evaluator)|BuildEnvironments|ComponentWrapper|values\.Constructor|does not override any inherited declaration|checkGenericOverrides|checkTypeOverrides|Invalid override' explorations/compile-ladder/baseline-2026-09-19/raw | wc -l` prints 0.
- Only `interpreter/` calls the methods that the rung adds: `grep -rln "checkGenericOverrides\|checkTypeOverrides" ProjectFortress/src/com/sun/fortress` prints `Constructor.java`, `BuildEnvironments.java` and `ComponentWrapper.java`.

## 8. Names added, and the other rungs

`grep -rlw` over `ProjectFortress/` and `Library/` (`.fss`, `.fsi`, `.test`, `.java`) finds:
- each new test's component name only in its own files;
- the object `AnyJoin` only in `ReductionSimpleJoinAtAnyWalk.fss`;
- `checkGenericOverrides`, `checkTypeOverrides` and `sameParameterTypes` only in the three edited Java files.

The other rungs' pushed branches (`git diff --name-only a1a75716a origin/wip/rung-...`):
- add no file of these names;
- edit none of `Constructor.java`, `ComponentWrapper.java` and `functions.tex`.

No hunk of another rung touches this rung's hunks:
- rung N in `BuildEnvironments.java`: hunks start at `:927` and `:1141` of the base;
- rung N in `changes.tex`: `:1298-1433` and `:3123`;
- rung V in `changes.tex`: `:2074`;
- this rung: `BuildEnvironments.java:589-592` and `:869-899`; `changes.tex:2571-2672`.

## 9. Sentences of the specification made false

None.
- The two corrected sentences were false before the rung (section 5).
- No passage of `Specification/` says that walk skips the `override` of a generic type, or accepts one at equal parameter types (`grep -n -i override Specification/appendices/changes.tex`, and the chapters' boxes).
- The team's draft note "the override modifier ... are not yet supported" (`Specification/basic/traits.tex:15-16`) was already false of walk.

Outside the specification, two texts that the gather owns go stale (record.md gives the new text):
- the skill's `references/interpreter.md`, "What walk checks", last bullet: "in an object or object expression or a trait without static parameters";
- `references/revival-changes.md`, "An abstract method without a body, and an `override` that overrides nothing, under walk": "It refuses the `override` in a trait without static parameters too" and "Walk makes neither of these two checks on a generic object".

## 10. Points to report

- **Whether the generic override check runs at the declaration or at each instance, with its cost on the one library's load.**
  - At the declaration, once, through the stand-in (`BuildEnvironments.java:886-899`).
  - At an instance, the landed non-strict check stays (`Constructor.java:588`, `:595`).
  - Cost: 146 generic declarations read for the modifier, no stand-in built (section 4).
  - A generic declaration's `override` at a static parameter is now refused where an instance made it override (section 4, `OverrideAtParamProbe`).
- **An edit beyond the section's files.** `BuildEnvironments.forObjectDecl3` (`BuildEnvironments.java:592`) and `ComponentWrapper.registerObjectExprs` (`ComponentWrapper.java:186`), one line each, call the new check (decision D6).
- Not reached:
  - No interpreter test changed its verdict other than the four intended (section 2).
  - No library type, team test or demo is refused. Of them, only `disp0.fss` and `disp1.fss` write `override`; both widen and pass.
  - No declaration that walk runs changed, since the rung only refuses. `overriddenBy`, `providedByTrait`'s drop and `overriddenInTraits` are unchanged.
  - The normative text is unchanged. The box and the Appendix I entry are informative.
  - No library, checker or harness edit; no demo edited.

## 11. Decisions

- **D1. The strict relation is in `checkOverrides` alone, through a new `sameParameterTypes`.** Chosen as the review prescribes (`walk-load-readings-check.md:98`). Not taken:
  - Q2's way (a), equal types override: the landed reading, which departs from `traits.tex:589`;
  - revising `:589` to "a subtype": the curator's decision (`walk-load-readings-check.md:100`);
  - a strictness flag on `overriddenBy`, whose other callers are to stay as they are.
- **D2. Equal parameter types are mutual subtypes**, as `FunctionalMethodMeets.inherited` reads them (`OverloadedFunction.java:1220-1224`). A type that walk cannot compare counts as unequal, so no refusal is made on it. Not taken: `FType` identity or `equals`, which would read two structurally equal arrow or tuple types as different.
- **D3. The generic check runs once, at the declaration, through `symbolicInstance`'s stand-in** (section 3). Not taken:
  - a check at each instance: it runs at run time, it misses a generic trait that no object extends, and it refuses instances that are no static error;
  - reading the declared types as written: a second reader of parameter types.
- **D4. At an instance of a generic declaration, the landed non-strict relation stays** (`Constructor.java:588`, `:595`; guarded by `OverrideGenericInstanceEqualTypesWalk`). Not taken:
  - strict at instances too, which refuses `object O extends G[\Any\]` of section 1, no static error;
  - no check at instances, which edits `providedByTrait`'s check (the section keeps it), and drops the only check of a generic declaration with an `opr` static parameter, for which walk makes no stand-in (`BuildEnvironments.java:1048-1059`).
  - Question QW-a.
- **D5. Static parameters are read as walk's symbolic types, below their bounds.** So `override f(x: T)` over an inherited `f(x: ZZ32)` is refused at the declaration of `G[\T extends Number\]` (section 4). Not taken: skipping a declaration whose parameter types mention a static parameter, as the Meet Rule check skips such a pair (FACTS, "Walk refuses at load ..."). That would leave `override f(x: T)` over an unrelated type unchecked. Question QW-b.
- **D6. Where the generic check is called:** pass 3 for traits and objects (`BuildEnvironments.java:875`, `:592`), and `ComponentWrapper.registerObjectExprs` for object expressions (`ComponentWrapper.java:186`), beside the Meet Rule check that batch 12's rung W put there. Not taken:
  - folding the check into `checkGenericFunctionalMethodMeets`. It would keep the edit under `interpreter/evaluator/` and spare running the count and the distance, but it gives the Meet Rule method a second job under its name;
  - `ComprisesCheck.checkFunctionalMethodMeets`, which is rung N's method.
- **D7. A stand-in only for a declaration that declares an `override`** (`declaresOverride`, `BuildEnvironments.java:896`), as the trait check already gates (`:874`). Not taken: a stand-in for every generic declaration, which is 146 more per load with nothing to check.
- **D8. The box and the effect are corrected in place, and the same entry records the correction**, in the form the entries use for a revised box (`changes.tex:1017-1032`). Not taken:
  - a new Appendix I entry for a correction of the revival's own informative text;
  - changing the two sentences with no record.
- **D9. `PairsRunRangesWalk` asserts the values of `runRanges`** (three calls, one with no `true`), since a call runs today. Not taken: a test that only loads `Pairs`.
- **D10. `ReductionSimpleJoinAtAnyWalk` declares `simpleJoin` at `Any`**, not with untyped parameters: one program shows one refusal at load, and FACTS states both forms as one rule. Not taken: two programs, one for each form.
- **D11. `OverrideNothingGenericObjectExpressionWalk` calls the function in `run()`**, as `OverrideNothingGenericWalk` calls `G[\ZZ32\]()`, so that the base's run shows the override running. Not taken: a `run()` that only prints.

## 12. Questions for the curator

- **QW-a.** At an instance of a generic declaration, is an `override` a static error when its parameter types equal the inherited declaration's only at that instance?
  - Example: `trait A[\T\]` with `f(x: T)`; `trait G[\T\] extends A[\T\]` with `override f(x: Any)`; `object O extends G[\Any\]`.
  - Way (a): no, because the declaration is checked at its static parameters. Built: `Constructor.java:588`, `:595`; `tests/OverrideGenericInstanceEqualTypesWalk.fss`.
  - Way (b): yes, and each instance is checked strictly.
  - The chapter states the static error of declarations (`traits.tex:594-595`) and says nothing of instances.
- **QW-b.** Is a generic declaration's `override` at a static parameter `T` a static error when the inherited declaration is at a type below `T`'s bound?
  - Way (a): yes, because `ZZ32` is no subtype of `T` at the declaration. Built: `BuildEnvironments.java:886-899`; section 4's probe is refused.
  - Way (b): no, where some instance overrides. This is the base's behaviour for a trait instance above an object.
  - No program in the tree writes this shape.

## 13. Defects and their homes

- Walk loaded an `override` at the inherited declaration's own parameter types (row 653's walk half, sharpened; gap 1 of `walk-load-readings-check.md:108`): home 1, repaired. Test: `tests/OverrideEqualTypesWalk.fss`.
- Walk made no `override` check of a generic trait, a generic object or an object expression in a generic function (row 665's override half): home 1, repaired. Tests: `tests/OverrideNothingGenericWalk.fss`, `OverrideNothingGenericTraitWalk.fss` and `OverrideNothingGenericObjectExpressionWalk.fss`.
- The revival-covering box and its effect said that the checker reads no comprises clause (gap 2 of `walk-load-readings-check.md:109`): repaired in the text. A prose edit has no test; section 5's probes check it.
- Row 665's abstract half stays: home 2, with its two expected failures unchanged.
- No new defect was measured, and the rung opens no ledger row.

## 14. Files of this note

The harness refused the worker's write of this file and of `record.md`, under `explorations/compile-ladder/rung-walk-override/`. Their text is in the rung's result. The Appendix I Rationale (`changes.tex:2619`) cites this file.
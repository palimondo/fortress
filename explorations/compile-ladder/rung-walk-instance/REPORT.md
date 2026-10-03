# Rung W, climb batch 9: walk's instances (a parameter nothing fixes, a lone parameter, a join, a typecase, a generic functional method)

problem: ProjectFortress/tests/XXXInferLoneUnboundedWalk.fss:19 (row 516), XXXInferTwoCommonParentsWalk.fss:14 (row 555), XXXTypecaseNoMatchWalk.fss:13 (row 558), XXXGenericTraitGenericFunctionalMethodWalk.fss:13 (row 567), at fa14a190c; row 424's erasure at ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:206 and :507 at fa14a190c; the departures the repair round gates, explorations/compile-ladder/rung-walk-instance/SKEPTIC.md:78 (F1, several bounds), :95 (F2, decision D3), :105 (F3, row 587)
spec: Specification/basic/inference.tex:89-107 (a lone parameter with no narrowest candidate, and a parameter nothing fixes, take the intersection of their upper bounds; never BottomType); Specification/basic/inference.tex:54-61 (a declaration with static parameters is applicable if some instance within its bounds is); Specification/basic/expressions/typecase.tex:99-100 (no matching clause: MatchFailure, an unchecked exception); Specification/basic/traits.tex:536-556 (functional methods); Specification/basic/types-vals-vars.tex:508-515 (no value has BottomType; row 587) and :412 (arrow types covariant in the return type)
precedent: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:426-428 (the case expression's MatchFailure, copied for the typecase); ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java:81-88 (walk already takes an interval's upper end for a contravariant return position); ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala:496 (solveToBounds, the checker's half of the same rule); ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericMethod.java:103 (a generic method applied at its own static arguments, the route OwnClosure takes); ProjectFortress/tests/InferUnfixedBoundWalk.fss:8-19 (the () -> T witness the repair round's several-bounds test copies); ProjectFortress/compiler_tests/DispatchMethodArmRungGLink.test:1-2 and XXXDispatchMethodArmRungG.test:1-3 (the link test beside an XXX run test keyed on REACHED, for the two compiled pairs)
deviation: a big operator's static parameters keep BottomType (EvaluatorBase.java:140, :162); a parameter bounded below through a fixed parameter's bound counts as fixed (EvaluatorBase.java:194); the join of several minimal supertypes takes the bound only where walk instantiates, not where it chooses (EvaluatorBase.java:103-127); a trace switch, fortress.inference.trace (EvaluatorBase.java:73); since the repair round the D3 departure and the several-bounds case are gated as expected failures (ProjectFortress/tests/XXXInferThroughBoundWalk.fss:23, XXXInferSeveralBoundsWalk.fss:27)
historical: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java; ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java; ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObjectOrGeneric.java; ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionalMethod.java; Specification/basic/inference.tex; Specification/appendices/changes.tex

The answers this rung followed: P1 was not answered, so the F-bounded half of row 424 is not this rung's: an unwritten `SUM`, `PROD` or `BIG MIN`, and the walk smoke test. `XXXUnwrittenSumRungF.fss` keeps its expected failure, and no demo was run.

## 1. What I inherited and what I re-verified

This is a relaunch, and the first worker of this rung did the following:
- made the worktree;
- wrote and promoted six tests;
- ran them on the base through the harness, where all six failed (`tmp/rung-walk-instance/h-base.txt`, 23:15:43Z);
- committed them alone (`4f4fc1ead`, 23:16);
- committed a first edit (`2b734f9cb`, 23:34);
- stopped before running the interpreter suite.

Its transcript holds the order of work. I read that transcript and its logs, and on its code states I re-ran only the targeted harness run its last log already covered.

I re-read its edit as I would a colleague's and changed three things (decision record, D1 to D4):
- The join repair was global, so it also changed which declaration walk chooses. I measured that (section 5.2) and restricted the repair to instantiation (`d124569b9`).
- The bound rule broke six interpreter tests, as the suite run on `b037c7426` showed (section 6.1). Repaired in `0244b0ce4`.
- A bound that mentions another parameter was left at `BottomType`. Repaired in `0244b0ce4`.

I also added four tests for defects measured on the way (sections 5.2 to 5.4).

One slip in the history. The commit `e0a2b35d1` was meant to hold tests alone, but it also carries the revert of `TypeLatticeOps.java`, which I had staged for the next edit. The harness runs before that commit (`h2-base.txt`, `h2-head.txt`, `h2-standin.txt`) ran on two code states: the base copy, and the build of `2b734f9cb`, which still had the first attempt's lattice join. The revert took effect with the build of `d124569b9`. No commit was rewritten.

In the first pass the harness refused my write of this file and of record.md, so both reached the gather through the structured result; the repair round writes both from those texts (section 12).

One qualification of the test-first order, from the skeptic's reading of the transcripts (`SKEPTIC.md`, section 1). The fix commit `2b734f9cb` also adds assertions to the tests: the inferred `pick` and `gen` calls, `thunks`, `thunksF`, `several`, `none` and `openRange[\ZZ64\]`, in `InferTwoCommonParentsWalk.fss` (+6 lines), `InferUnfixedBoundWalk.fss` (+2), `TypecaseNoMatchWalk.fss` (+7) and the two functional-method tests (+1 each), and the new pin file `InferUntypedLambdaResultWalk.fss`. They were written after the edit was built, and each case was seen failing on the base copy only by probes (`probes/base-walk2.txt`), not through the harness, and was not committed before the fix. Each file they went into had failed through the harness on the base before the first edit (`h-base.txt`, 23:15:43Z), so the order holds per file.

## 2. The rule as built under walk

`EvaluatorBase.inferAndInstantiateGenericFunction` (`EvaluatorBase.java:61`) instantiates the declaration a call runs, and it is the only path that changed. Choosing and comparing declarations still call the public `inferByUnification` as on the base: `OverloadedFunction.bestMatchInternal` (`OverloadedFunction.java:1181`) and `instanceHolding` (`:1296`).

**A type parameter nothing fixes takes its declared bound, `Any` if none** (row 424, plain-bound half). The code is `instanceOf` (`EvaluatorBase.java:156-191`).
- "Nothing fixes" means two things: no argument's declared parameter type mentions the parameter, and no bound of a parameter the arguments fix mentions it (`fixedThroughBounds`, `:194`).
- Its bound is the upper end of its interval, the meet of its declared bounds (`boundOf`, `:131`).
- A parameter whose bound mentions other static parameters, but not itself, takes that bound at their instances, unless one of them is `BottomType` (`boundAtInstances`, `:217`).
- Examples, all in `ProjectFortress/tests/InferUnfixedBoundWalk.fss`:
  - `mkN[\T extends Number\]()` is a `BoxU[\Number\]`;
  - `mkU[\T\]()` is a `BoxU[\Any\]`;
  - the `() -> T` witness takes its `Number` clause;
  - `mkB[\T extends Number, U extends BoxU[\T\]\]()` gives `U` the instance `BoxU[\Number\]`.

**Left at `BottomType`:**
- a parameter whose bound mentions itself (the F-bounded half, P1);
- the static parameters of a big operator (`bigOperator`, `:140`), which a reduction or a comprehension leaves to its generator clauses (decision record D2);
- a parameter that only the result of a function expression without a declared return type fixes, since walk types such an expression `() -> BOTTOM` (row 587, an expected failure since the repair round, `XXXInferUntypedLambdaResultWalk.fss`);
- a parameter declared with several bounds that walk cannot meet, as it cannot meet two bounds neither of which is a subtype of the other (`FType.meet`, `types/FType.java:338-348`, answers the empty set, and `TypeLatticeOps.meet` calls `bug`, `types/TypeLatticeOps.java:38-44`): the catch at `EvaluatorBase.java:312-313` files it among the `rechecks`, `instanceOf` skips it (`:167-168`), and `boundAtInstances` fails again (`:233`, `:237-238`). The chapter gives the intersection of the bounds; walk has none (row 591, `XXXInferSeveralBoundsWalk.fss`).

**Not at its bound, by decision D3:** a parameter that only the bound of a parameter the arguments fix mentions, as `A extends T` mentions `T`, counts as fixed (`fixedThroughBounds`, `:194-210`) and takes the arguments' type: `ap[\T, A extends T\](Apple)` is a `BoxU[\Apple\]`, where the chapter, the decision's "never the value's type alone" and the compiled path give `BoxU[\Any\]`, and `BoxU[\Fruit\]` for `T extends Fruit` (row 592, `XXXInferThroughBoundWalk.fss`).

**A lone parameter with no narrowest candidate takes its bound** (row 516, walk half).
- Its candidates are the arguments' types, their coercion targets and its declared bounds, no longer the arguments' supertypes (`narrowest`, `:458-464`).
- With no narrowest candidate, it takes the bound where every argument's type is a subtype of it (`:369-373`).
- `pickU(l, r)` for a `ZZ64` and an `RR64` is a `BoxU[\Any\]`, and `pickO[\T extends Object\]` is a `BoxU[\Object\]` (`InferLoneUnboundedWalk.fss`). `pickU[\T extends Number\]` stays `BoxU[\Number\]` (`InferLoneBoundWalk.fss`).
- Two kinds of lone parameter are exceptions, both in `rechecks` (`selfBounded`, `:369`, `:373`). One whose bound mentions a static parameter, itself or another (decision D5), keeps the supertypes as candidates and takes, as before, the narrowest named common supertype of the arguments' run-time types that the bounds permit, where there is one. One declared with several bounds that walk cannot meet does the same, and where there is none its call fails: `pick2[\T extends { Red, Round }\](Apple, Cherry)` stops with 'Cannot unify Red ... with Round ... abm=T=(Red,Red)' (row 591). Where such a parameter is fixed inside other types by a join of several minimal supertypes, one of the second kind fails the same way (`RpInside2`), and one whose bound mentions another parameter took `Any` in the case measured (`RpInside3`; section 12).

**A join of several minimal common supertypes takes the bound** (row 555).
- `BoundingIntervals` (`:103-127`) puts the bound, `Any` if none, where both types lie under it. It does so only when walk instantiates; where walk chooses a declaration, the lattice's join decides as on the base.
- In `InferTwoCommonParentsWalk.fss`: `same(Apple, Cherry)` runs, `pair(Apple, Cherry)` is a `BoxU[\Any\]` and `pairF[\T extends Fruit\]` is a `BoxU[\Fruit\]`. Two thunks and a varargs call behave the same way, and the library's case, a `ZZ32` vector and matrix passed to a generic function, runs.

**A typecase with no matching clause throws `MatchFailure`** (row 558). The change is at `Evaluator.java:1441-1442`, which copies the case expression's three lines (`:426-428`). Uncaught, the failure still ends the run with exit 1, but its message no longer names the matched type: 'typecase match failure given Int' became 'MatchFailure' (the skeptic's `SkMatchUncaught`). The compiled path's message does not name it either, and `Specification/basic/expressions/typecase.tex:99-100` asks only that `MatchFailure` be thrown.

**A generic functional method of a generic trait, or of a plain trait, runs** (row 567).
- A functional method with static parameters of its own is a `GenericFunctionalMethod.Own` (`values/GenericFunctionalMethod.java:151`), registered at `types/FTraitOrObjectOrGeneric.java:121-122`.
- A generic trait's functional method is generic in the trait's parameters, then its own (`GenericFunctionalMethod.java:105`).
- An instance at its own arguments applies the receiver's method at them (`OwnClosure`, `:72-98`).
- `gen[\String\](p, 3, f)`, `gen(p, 3, f)`, `pick[\String\](Q, f)`, `pick(Q, f)` and the override form all run (`GenericTraitGenericFunctionalMethodWalk.fss`, `GenericFunctionalMethodWalk.fss`).

**Unchanged:**
- which declaration walk chooses where one applies without coercion;
- walk's coercions;
- row 157's fix, the value's type where a dispatched generic's value fixes the parameter.

## 3. Where the fix belongs

The map rows: `explorations/coordinator/map/spec-to-implementation.md:193` (type inference: "the interpreter ... static args are matched at dispatch"), `:249` (`typecase`: `Evaluator.forTypecase:1382`), and the map README's row for `interpreter/`, which `testSystem` guards.

Where each part lives:
- Walk's inference of static arguments is `EvaluatorBase` (FACTS, "Under `walk`, a generic call's static arguments are inferred with coercion ...").
- The bounding map is `LatticeIntervalMap` over `TypeLatticeOps`.
- A functional method is registered in `FTraitOrObjectOrGeneric.initializeFunctionalMethods` and instantiated in `GenericFunctionalMethod.newClosure`.
- "Missing type R" comes from `BaseEnv.getType` (`BaseEnv.java:374`), when the method's own `R` is evaluated in an environment that never bound it.

## 4. Precedent search

**`MatchFailure`.** The case expression already throws it (`Evaluator.java:426-428`), and the typecase copies those lines. `Evaluator.java` has two sites that end a match: the case expression's, already right, and the typecase's (row 558). The third message, "typecase match failure!" at `Evaluator.java:1375`, is `getType` refusing an unsupported pattern form rather than a missed match, so it was left alone.

**The bound.** The checker's `Formula.solveToBounds` (`scala_src/typechecker/Formula.scala:496`) is the other path's half of the rule (FACTS, "The compiled checker instantiates a type parameter that nothing at a call fixes ..."). Walk's own `MakeInferenceSpecific.forVarType` (`MakeInferenceSpecific.java:81-88`) already sets a contravariant occurrence's lower bound to its upper end. `LatticeIntervalMapBase.meetPut` stores a declared bound as the interval's upper end, so `boundOf` reads it there.

**The join.** Row 555's note offers the intersection or the bound, and the decision gives the bound. The first attempt edited `TypeLatticeOps.join` globally; that edit is replaced by a subclass of the bounding map that only instantiation uses.

**Row 567.** A dotted call of an overridden generic method already runs on the base: `p.gen[\String\](3, f)` printed "dot renamed" (`tmp/rung-walk-instance/probes/PDotOverride.fss`). `OwnClosure` takes that route: `DottedMethodApplication.make` on the receiver, then `GenericMethod.typeApply` (`GenericMethod.java:103`) at the method's own arguments.

## 5. The tests, first, and the failures seen

The harness command is `bash explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-walk-instance/<dir> <files>`, run from the worktree with `FORTRESS_HOME` set to it. For the base, the same command runs from `/home/user/fortress-walkinst-base` with `FORTRESS_HOME=/home/user/fortress-walkinst-base`.

### 5.1 The first six tests, on the base

These are the first worker's run (`h-base.txt`, tree `fa14a190c`), committed alone in `4f4fc1ead`:

```
FAIL: J12/0:BoxU[Number] =/= J9/0:BoxU[Any]; a ZZ64 and an RR64 leave the unbounded parameter to its bound Any (inference.tex, section "The Static Arguments of a Call")
** bug! Join(Apple, Cherry) not a singleton: [Red, Round]
FAIL: J5/0:other =/= J12/0:BoxU[Number]; a type parameter bounded by Number that nothing at the call fixes takes its bound Number (inference.tex, section "The Static Arguments of a Call")
typecase match failure given Int
Missing type R
Tests run: 6,  Failures: 6,  Errors: 0
```

### 5.2 The join at choice time, and a contravariant-only parameter (`e0a2b35d1`)

**`XXXDispatchTwoCommonParentsWalk.fss`** (home 2, row 589):
- On the base copy (`h2-base.txt`): `FAIL: J5/0:plain =/= J7/0:generic; ...` / ` OK Saw expected exception`.
- On the build of `2b734f9cb`, whose lattice join answered `Any` everywhere (`h2-head.txt`): `PASS` / ` Missing expected failure`. The key goes red on a fix. That build also changed which declaration runs, which is why D1 restricts the join repair to instantiation.

**`XXXInferContravariantWalk.fss`** (home 2, row 588):
- On the base copy and on `2b734f9cb`: `FAIL: J5/0:other =/= J10/0:BoxU[ZZ32]; a function of a ZZ32 bounds the type parameter above by ZZ32, which it takes, never BottomType ...` / ` OK Saw expected exception`.
- On a stand-in with the static argument written, `co[\ZZ32\](...)` (`h2-standin.txt`): `PASS` / ` Missing expected failure` / `Tests run: 1,  Failures: 1,  Errors: 0`.
- The compiled path gives the same program `BoxU[ZZ32]`: `co  BoxU[ZZ32]`, compiled in the base copy (`tmp/rung-walk-instance/probes2/compiled-PContraC.txt`).

**`InferTwoCommonParentsWalk.fss`** gains `either[\T\](a: T, b: T)` beside `either(a: ZZ32, b: ZZ32)`, called with an `Apple` and a `Cherry`. On the base the file fails earlier, at the join bug. The call alone also fails there: `Failed to find any matching overload, args = (Apple,Cherry)` (`FORTRESS_HOME=/home/user/fortress-walkinst-base .../bin/fortress POverSeveral.fss`, `probes2/base-walk.txt`).

### 5.3 `MatchFailure` as an unchecked exception (`b037c7426`, home 2, row 590)

`XXXTypecaseNoMatchUncheckedWalk.fss` puts `catch e UncheckedException` around a typecase that matches nothing.
- On the base copy (`h4-base.txt`): `typecase match failure given ...` / ` OK Saw expected exception`.
- On this tree (`h4.txt`): `FortressException: MatchFailure` / ` OK Saw expected exception`.

The one library declares `object MatchFailure extends CheckedException` (`Library/FortressLibrary.fsi:1164`, `Library/FortressLibrary.fss:1714`). `typecase.tex:99-100` calls it unchecked, and the compiler library declares it so (`Library/CompilerLibrary.fsi:101`). The repair is a library edit, which is a stop for this rung.

### 5.4 A bound that mentions another parameter (`b2b96fd9d`, test alone)

`InferUnfixedBoundWalk.fss` gains `mkB[\T extends Number, U extends BoxU[\T\]\]()`. On the build of `b037c7426` (`h5.txt`): `FAIL: J5/0:other =/= J18/0:BoxU[BoxU[Number]]; a type parameter bounded by BoxU[T] that nothing fixes takes that bound at the instance of T, which takes its bound Number ...` / `Tests run: 1,  Failures: 1,  Errors: 0`. Repaired in `0244b0ce4`.

### 5.5 Passing, on the build of `0244b0ce4` (`h7.txt`)

The run covered the rung's tests, the six tests the first suite run failed, and the controls `InferLoneBoundWalk`, `InferCoercionRungK` and `XXXUnwrittenSumRungF`.
- Verdict: `OK (19 tests)`.
- `XXXUnwrittenSumRungF`: ` OK Saw expected exception`, with its `CastError`.
- The three new `XXX` files: ` OK Saw expected exception`.

Rung 7b's dispatch tests `DispatchDeclaredDomain`, `DispatchConvertedAgain` and `GenericOverloadBoundsApart` passed on the build of `d124569b9` (`h3.txt`, `OK (15 tests)`) and in the suite below.

### 5.6 The homes of every defect measured

| defect | home | where |
|---|---|---|
| row 424, plain bound: a parameter nothing fixes at `BottomType` | 1 | `InferUnfixedBoundWalk.fss` (four assertions) |
| a bound mentioning another parameter left at `BottomType` | 1 | `InferUnfixedBoundWalk.fss`, `mkB` |
| row 516, walk half | 1 | `InferLoneUnboundedWalk.fss` (promoted, with `pickO`) |
| row 555, the join of several minimal supertypes | 1 | `InferTwoCommonParentsWalk.fss` (promoted, with seven more assertions) |
| an overloaded generic with such arguments, no other declaration applicable, failed to find an overload | 1 | `InferTwoCommonParentsWalk.fss`, `either` |
| row 558 | 1 | `TypecaseNoMatchWalk.fss` (promoted, with `openRange[\ZZ64\]`) |
| row 567, the plain trait's form and the override form | 1 | `GenericTraitGenericFunctionalMethodWalk.fss` (promoted, with the inferred call), `GenericFunctionalMethodWalk.fss` |
| the six suite regressions of the first edit (section 6.1) | 1 | the team's and the revival's own tests named there |
| row 589: walk passes over such a generic when another declaration applies | 2 | `XXXDispatchTwoCommonParentsWalk.fss` |
| row 588: a parameter bounded only from above at `BottomType` | 2 | `XXXInferContravariantWalk.fss` |
| row 590: `MatchFailure` declared checked | 2 | `XXXTypecaseNoMatchUncheckedWalk.fss` |
| row 587: an untyped function expression's result type is `BottomType`, so the type parameter it fixes is instantiated there | 2 (3 in the first pass) | `XXXInferUntypedLambdaResultWalk.fss`, renamed from the pin `InferUntypedLambdaResultWalk.fss` in the repair round: the instance is a supertype of `Apple`, never `BottomType` (`Specification/basic/types-vals-vars.tex`, "Special Types", :510; :412; `Specification/basic/expressions/function.tex:39-42`; `Specification/basic/inference.tex:104-105`). Which supertype stays open, since the chapter does not yet describe an elided return type (JUDGE.md, decision J1) |
| row 591: a type parameter with several declared bounds walk cannot meet stays at `BottomType` where nothing fixes it, and its call fails where the arguments have no narrowest named common supertype | 2 | `XXXInferSeveralBoundsWalk.fss` |
| row 592: decision D3, a type parameter that only another parameter's bound mentions takes the arguments' type | 2 | `XXXInferThroughBoundWalk.fss` |
| row 593 (compiled path): `depS[\S extends Number, U extends BoxU[\S\]\](z)` instantiates `S` at `Number`, where the chapter gives `ZZ32` | 2 | `ProjectFortress/compiler_tests/InferDependentBoundLink.test` and `XXXInferDependentBound.test` over `XXXInferDependentBound.fss` |
| row 594 (compiled path): a generic functional method with `self` second dies with `NoSuchMethodError` | 2 | `ProjectFortress/compiler_tests/GenericFunctionalMethodSelfSecondLink.test` and `XXXGenericFunctionalMethodSelfSecond.test` over `XXXGenericFunctionalMethodSelfSecond.fss` |
| row 565, its object-override form (compiled path): a generic trait's abstract generic functional method overridden in an object of one of its instances writes its wrapper twice, 'ZipException: duplicate entry ... $conv ...' (the skeptic's `SkFnMeth`) | 2, row 565's own test | a note on row 565 (record.md); its test `ProjectFortress/compiler_tests/XXXGenericTraitFunctionalMethodOverride` already gates the defect |
| a lone type parameter with a self-mentioning bound over arguments with several minimal supertypes fails under walk, now with 'Cannot unify Any ... with Cmp[\T\]' where the base stopped at the join | 3 | a note on row 555 alone (record.md). The specification does not settle an F-bounded parameter (the paper admits no method type parameter in an upper bound), and P1 is not answered, so no program can pin a verdict that a test would keep (section 12) |

### 5.7 The repair round's tests, through the harness

**The three walk files, on the worktree's build of `0244b0ce4` (tree `27c3b59bc`)**, from `/home/user/fortress-walkinst` with `explorations/experiment/env.sh` sourced:

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress-walkinst/tmp/rung-walk-instance/h8 ProjectFortress/tests/XXXInferSeveralBoundsWalk.fss ProjectFortress/tests/XXXInferThroughBoundWalk.fss ProjectFortress/tests/XXXInferUntypedLambdaResultWalk.fss

```
FAIL: J4/0:ZZ32 =/= J3/0:Red; a type parameter with the two declared bounds Red and Round that nothing at the call fixes takes their intersection, a subtype of Red, never BottomType, ...
 OK Saw expected exception
FAIL: J2/0:no =/= J3/0:yes; a function expression without a declared return type returns an Apple, so its return type holds one and the type parameter it fixes is a supertype of Apple, never BottomType ...
 OK Saw expected exception
FAIL: J11/0:BoxU[Apple] =/= J9/0:BoxU[Any]; a type parameter that only the bound of another type parameter mentions, as A extends T mentions T, is fixed by no argument and takes its own bound Any, ...
 OK Saw expected exception
OK (3 tests)
```

Each fails at the assertion the ruling names. The judge's command gave the scratch directory as a relative path, `tmp/rung-walk-instance/h8`, which the harness cannot use: it changes to `$FORTRESS_HOME/ProjectFortress` before it passes `-Dtests="$S/tests"` (`explorations/compile-ladder/rung-inference-walk/harness-one.sh:15-16`), and the first run printed 'tmp/rung-walk-instance/h8/tests does not exist'. The run above gives it as an absolute path.

**The same three with the static arguments written** (`witnessRed[\Apple\]()`, `witnessRound[\Apple\]()`, `pick2[\Both\](Apple, Cherry)` with `trait Both extends { Red, Round }` above `Apple` and `Cherry`; `ap[\Any, Apple\](Apple)`, `apF[\Fruit, Apple\](Apple)`; `thunk[\Apple\](fn () => Apple)`), same names, the same command over the copies in `tmp/rung-walk-instance/standin9/`:

```
PASS
 Missing expected failure
  (three times)
Tests run: 3,  Failures: 3,  Errors: 0
```

Each key goes red when walk gives the instance the test asserts.

**The two compiled pairs, in the rung's base copy**, since the rung changes no compiler source:

    bash /home/user/fortress-walkinst-base/explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxx9 /home/user/fortress-walkinst/ProjectFortress/compiler_tests InferDependentBoundLink.test XXXInferDependentBound.test GenericFunctionalMethodSelfSecondLink.test XXXGenericFunctionalMethodSelfSecond.test

```
. link .../compiler_tests/XXXInferDependentBound  OK (time = 4161ms)
. run .../compiler_tests/XXXInferDependentBound (595ms) REACHED
FAIL:  BoxU[Number] =/= BoxU[ZZ32]; a lone type parameter bounded by Number given a ZZ32 takes ZZ32, the narrowest candidate its bound permits, also where another type parameter's bound mentions it ...
Saw expected failure (Exit code != 0)
. link .../compiler_tests/XXXGenericFunctionalMethodSelfSecond  OK (time = 3792ms)
. run .../compiler_tests/XXXGenericFunctionalMethodSelfSecond (575ms) REACHED
Caused by: java.lang.NoSuchMethodError: 'java.lang.Object XXXGenericFunctionalMethodSelfSecond$Shape.\=tag?1??Arrow?fortress\|CompilerBuiltin\%Object,fortress\|AnyType\%Any?(long, java.lang.String)'
Saw expected failure (Exit code != 0)
```

Each of the four runs ends `OK (1 test)`. The control `idS(z)` passes, so the run fails at `depS`.

**The compiled stand-ins** (`depS[\ZZ32, BoxU[\ZZ32\]\](z)`; `tag2[\R extends Any\](self, x: R)` called `tag2(Ci, "t")`), same names, the same command over `tmp/rung-walk-instance/standin9c/`:

```
. run .../standin9c/XXXInferDependentBound (568ms) REACHED
PASS
Did not see expected failure
Tests run: 1,  Failures: 1,  Errors: 0
```

and the same four lines for `XXXGenericFunctionalMethodSelfSecond`, both link tests passing. The harness fails each XXX run test as one that succeeds.

## 6. The interpreter suite

The command is `tmp/rung-walk-instance/corpus.sh <i> 4` for i from 0 to 3, run in parallel. It runs `SystemJUTest` over `ProjectFortress/tests/` as `build.xml`'s `systemShard` does: 768 MB, `-Xss32m`, `FORTRESS_THREADS=1`, private caches, `-Dfortress.suite.shard=i/4`, plus `-Dfortress.inference.trace`. There is one run per code state.

### 6.1 On `b037c7426` (the code of `d124569b9`)

```
Tests run: 121,  Failures: 2,  Errors: 0      (QuickCheckTest, ResultBoundsRungB)
OK (121 tests)
Tests run: 123,  Failures: 1,  Errors: 0      (RangePrototype)
Tests run: 121,  Failures: 3,  Errors: 0      (CovariantTest, MapTest, booleanGuard)
```

Two examples:
- `ResultBoundsRungB`: `FAIL: a ArrayList[\Any\]: <|(1,11), (2,12), (3,13)|> =/= a ArrayList[\(Int,Int)\]: ...; trait-parameters.tex, section "Type Parameters": a list comprehension at a tuple type`.
- `CovariantTest.fss:28`: `RHS expression type ArrayList[\Object\] is not assignable to LHS type List[\Number\]`.

The trace named the comprehension big operators and `APPCOV`. Decision record D2 and D3 repaired both in `0244b0ce4`.

### 6.2 On `0244b0ce4`, after the last code edit

```
OK (121 tests)
OK (121 tests)
OK (123 tests)
OK (121 tests)
```

486 tests, no failure.

The table lists the generic calls whose instance moved, from the trace, outside this rung's own tests. The trace has one line per declaration and argument types first met in each shard's JVM, because walk caches an instance per argument types.

| declaration | parameter | before | after |
|---|---|---|---|
| `fail[\T extends Object\](s: String): T` (`Library/FortressLibrary.fss:54`) | T | BottomType | Object |
| `sparse[\T extends Number, nat n\](me: Array1[\RR64,0,n\])` (`Library/Sparse.fss:107`) | T | BottomType | Number |
| `opr -[\T extends Number, nat n, nat m\](x: String, y: ZZ32)` (`tests/primOverloadTest.fss:15`) | T | BottomType | Number |
| `juxtaposition[\T extends Number, nat n, nat m, nat p\](x: Array1[\ZZ32,0,3\], y: String)` (`tests/primOverloadTest.fss:22`) | T | BottomType | Number |
| `f[\A\](x: A, y: A): A` with a `B()` and a `C()` (`tests/commonSuper.fss:15`) | A | T, their common trait | Any |
| `pickK[\T\](a: T, b: T)` with a `ZZ64` and an `RR64` (`tests/InferCoercionRungK.fss:24`) | T | Number | Any |

None of these programs observes the parameter's instance:
- `fail` throws;
- the `T` of `sparse` and of the two operators appears in no parameter or result type;
- `commonSuper` calls a method of the value;
- `InferCoercionRungK.fss:47` asserts the arguments, which are not converted either way.

The rung's own tests account for the other moves: `mkN`, `mkU`, `none`, `witness`, `mkB`, `pickU`, `pickO`, `pair`, `pairF`, `same`, `either`, and three joins of `Apple` and `Cherry`.

## 7. The specification

Revised in the S1 form:
- `Specification/basic/inference.tex`: the interpreter's box in "The Static Arguments of a Call" (`:169-204` since the repair round) and the box after the list (`:255-294`).
- `Specification/appendices/changes.tex`, the entry "The inference of a call's static arguments": a paragraph in Change quoting both boxes' old sentences, a paragraph in Rationale, and two sentences in Effect.

`decision-record.md` section 1 gives each passage before and after, why it changed, and the way back. No normative sentence changed, and the team's draft note is kept. The PDF was not built here, since the commit stage builds it once. A script checked that the edited files' braces and math delimiters balance as before.

## 8. Stops met

**"A parameter nothing fixes bound to anything but its declared bound (Bottom ...)".** Two parameters stay at `BottomType`, and with the bound six tests broke (section 6.1). Decision record D2 and D3.
- A big operator's static parameter that nothing fixes, even plain-bounded as `List`'s `BIG <|[\T extends Object\]|>` is (`EvaluatorBase.java:140`, `:162`).
- `APPCOV`'s `T`, when both its collections are at `BottomType` (`:194`).

**"A change to which declaration walk chooses".** Where no declaration applies without coercion, the coercion pass now finds a generic declaration applicable at its bound when its arguments have several minimal common supertypes or no narrowest type.
- Example: `either(Apple, Cherry)` runs the generic where the base failed to find an overload (`InferTwoCommonParentsWalk.fss`; `OverloadedFunction.java:1111`).
- Where another declaration applies without coercion, the choice is the base's (row 589).

The repair round adds two more cases to the first stop, each now gated by an expected failure:
- Decision D3: `ap[\T, A extends T\](Apple)` is a `BoxU[\Apple\]`, where the bound gives `BoxU[\Any\]` (`EvaluatorBase.java:194-210`; the skeptic's `SkThroughBound`; row 592).
- Several declared bounds: `witness[\T extends { Red, Round }\]()` is still at `BottomType` (`EvaluatorBase.java:309-313`, `:233-238`; the skeptic's `SkTwoBoundW`, 'two bounds: ZZ32 clause (T is BottomType)'; row 591). The first pass did not list it.

Rows 587 and 588 are the same stop's other two cases, measured in the first pass and gated (`XXXInferUntypedLambdaResultWalk.fss`, `XXXInferContravariantWalk.fss`).

All of these stops are reversible and listed for review (POSITIONS, "Reversible stops do not hold a batch").

## 9. For Pavol

- D2: a big operator's static parameters keep `BottomType` under walk, so that the one library builds comprehensions at their elements' type. With P1 and rows 424 and 425, this is the reduction's element type the chapter does not yet describe.
- D3: a type parameter bounded below through another parameter's bound (`APPCOV`'s `T`) counts as fixed. Read literally, the chapter would give `Any`.
- Row 589: repairing walk's choice, so that the generic is chosen when its arguments have several minimal supertypes, changes which declaration runs. `XXXDispatchTwoCommonParentsWalk.fss` gates it.
- Row 567's repair edits `FTraitOrObjectOrGeneric.java:121-122`, three lines in `initializeFunctionalMethods`. The file is outside the record's list of named files and could be rung K's "load-time file it names".
- The trace switch `fortress.inference.trace` stays in `EvaluatorBase.java:73-89` (D8). It is inert unless the property is set, and one edit removes it.
- Row 590: the one library declares `MatchFailure` checked, against `typecase.tex:99-100`. The repair is a library edit.
- The provisional rows 587-594 are cited in record.md, and 587, 588, 589, 591 and 592 also in `Specification/basic/inference.tex`. If the gather numbers them otherwise, the specification's citations change with them.

Added by the repair round, from `JUDGE.md` section 5 and its own findings:
- D3, now gated as row 592 (`XXXInferThroughBoundWalk.fss`): walk keeps the arguments' type for a type parameter that only another parameter's bound mentions, because the library's `APPCOV` builds its result from that parameter and walk has no expected type. The chapter (`Specification/basic/inference.tex:99-107`), the decision's "never the value's type alone" and the compiled path give the bound. Should walk move once it has an expected type? Evidence: `Library/CovariantCollection.fss:27`, `EvaluatorBase.java:194`.
- Row 591 (`XXXInferSeveralBoundsWalk.fss`): walk has no intersection type, so a type parameter with several declared bounds it cannot meet stays at `BottomType` where nothing fixes it, and its call fails where it is a lone parameter over arguments with no narrowest named common supertype. Should walk's lattice gain intersections, or does the expected failure suffice until the switch-over? Evidence: `types/TypeLatticeOps.java:38-44`, `types/FType.java:338-348`, `EvaluatorBase.java:312-313`, `:233-238`.
- Judge's decision J2, a process decision: the two compiled-path defects the skeptic measured, rows 593 and 594, have their XXX pairs in `ProjectFortress/compiler_tests/`, a directory outside the files the batch record's section 4 gives W; no rung of the batch edits it.
- Judge's decision J1, where the specification is silent on the inference of an elided return type: row 587's expected failure asserts only that the instance is a supertype of `Apple` (`XXXInferUntypedLambdaResultWalk.fss:29`). Row 587's home moved from 3 to 2.
- D5's reach: a lone type parameter whose bound mentions any static parameter, not only itself, keeps the arguments' narrowest named common supertype where the chapter gives the bound. No program in the corpora measures that. Where such arguments have several minimal common supertypes, the repair round measured `BoxU[\Any\]` for `T extends S` (section 12, `RpInside3`), a case the specification does not settle. Evidence: `EvaluatorBase.java:369-373`.
- Row 555 is not closed in every form: a lone parameter with a self-mentioning bound over arguments with several minimal supertypes still fails, now with 'Cannot unify Any ... with Cmp[\T\]' (section 12, `RpFJoin`), and the several-bounds form is row 591. Both are recorded as notes; the F-bounded form waits for P1.
- The trace switch `fortress.inference.trace` (D8) includes an eager `typesOf(args)` built whenever a bound is taken, even with the switch off (`EvaluatorBase.java:170`, `:183`). Removing the switch is one edit and a suite run.

## 10. The checker count, the distance and the ladder

None was run.

The checker count and the distance are unchanged. Every path this rung changes is one the two stages do not read:
- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`: `EvaluatorBase.java`, `Evaluator.java`, `types/FTraitOrObjectOrGeneric.java`, `values/GenericFunctionalMethod.java`;
- `ProjectFortress/tests/`, and since the repair round `ProjectFortress/compiler_tests/` (two test programs and four .test files);
- `Specification/`;
- `explorations/`.

The gate measures both on the merged tree.

The ladder subset was not run either. The ladder drives the compiled path over `compiler_tests/` and `library_tests/`, and no file of it is blocked by a name this rung adds. Those names are test components and private Java methods. A grep of `src/com/sun/fortress/` and both corpora finds each only in its own file; `bigOperator` also names the unrelated string constant `WellKnownNames.bigOperator`.

## 11. Differentials, base copy against this build

Each program ran under walk in `/home/user/fortress-walkinst-base` and on this tree (`tmp/rung-walk-instance/probes/base-walk*.txt`, `edit2-walk.txt`; `probes2/base-walk.txt`).

| program | base | this build |
|---|---|---|
| `mkB()`, `mkU()`, `mkO()` | `other` (BOTTOM) | `BoxU[Number]`, `BoxU[Any]`, `BoxU[Object]` |
| `same(Apple, Cherry)`, `sameF` | the join bug | `BoxU[Any]`, `BoxU[Fruit]` |
| untyped thunks `arr(fn () => Apple, ...)` | `other` (BOTTOM) | `other` (BOTTOM) |
| a `ZZ32` vector and matrix to `both[\T\]` | the join bug | `both` |
| `pickU(l, r)`, `pickO(l, r)` | `BoxU[Number]` | `BoxU[Any]`, `BoxU[Object]` |
| `pickN` | `BoxU[Number]` | `BoxU[Number]` |
| `pickU(z, l)` | `BoxU[ZZ64]` | `BoxU[ZZ64]` |
| `g(Apple, Cherry)` beside `g(Any, Any)` | `plain Any` | `plain Any` |
| `f(Apple, Cherry)` beside `f(ZZ32, ZZ32)` | no matching overload | `generic` |
| `co(fn (x: ZZ32): ZZ32 => x)` | `BoxU[\BOTTOM\]` | `BoxU[\BOTTOM\]` |
| `openRange[\ZZ64\]()` under `catch e MatchFailure` | the typecase ProgramError | `caught MatchFailure` (row 553) |
| generic functional methods: plain trait, generic trait, overridden, written and inferred | "Missing type R" | all run |
| repair round: `tupA[\T\]((Apple, Cherry))` | not run | runs (`RpInside`) |
| repair round: `tup2[\T extends { Red, Round }\]((Apple, Cherry))` | not run | 'Cannot unify Red ... with Round ... abm=T=(Red,Red)' (`RpInside2`) |
| repair round: `tupB[\S, T extends S\]((Apple, Cherry), Apple)`, `loneB[\S, T extends S\](Apple, Cherry, Apple)` | the join bug at `tupB` | `BoxU[Any]`, `BoxU[Any]` (`RpInside3`) |
| repair round: `fF[\T extends Cmp[\T\]\](Apple, Cherry)`, `Red` and `Round` each extending `Cmp` of itself | the join bug | 'Cannot unify Any ... with Cmp[\T\] ... abm=T=(Any,Any)' (`RpFJoin`) |

## 12. The repair round

The skeptic refused the rung (`explorations/compile-ladder/rung-walk-instance/SKEPTIC.md`), and the judge ruled for a repair (`explorations/compile-ladder/rung-walk-instance/JUDGE.md`, commit `27c3b59bc`). The skeptic was right on all three grounds:
- F1: a type parameter with several declared bounds walk cannot meet stays at `BottomType` where nothing fixes it, and its call fails as a lone parameter; the chapter gives the intersection, never `BottomType`.
- F2: decision D3 gives `ap[\T, A extends T\](Apple)` the arguments' type where the chapter and the compiled path give the bound; D3 stays as a reversible stop, now gated.
- F3: row 587's instance, `BottomType`, is one the chapter forbids, since the function returns an `Apple` and no value has `BottomType`; its home is 2, not 3.

And on five text corrections: the first box's exception for D5, the Rationale's "two kinds", D2's cost, section 1's qualification of the test-first order, and the overclaims of F1 and F2.

What the round did, in the ruling's order:
1. Wrote the three walk expected failures (`XXXInferSeveralBoundsWalk.fss`, `XXXInferThroughBoundWalk.fss`, and `XXXInferUntypedLambdaResultWalk.fss`, renamed from the pin by `git mv`) and the two compiled pairs (`XXXInferDependentBound`, `XXXGenericFunctionalMethodSelfSecond`, each with a link test and an XXX run test keyed on `REACHED`), showed them through the harness and on stand-ins (section 5.7), and committed them alone (`211610c19`).
2. Revised the first interpreter box, the second, the Appendix I entry and the decision record (`5b5c00071`). No normative sentence changed.
3. Wrote this report and record.md.

It changed no code and built nothing: the code is that of `0244b0ce4`, whose interpreter-suite run (486 tests, section 6.2) stands. Besides the harness runs, it ran four small programs of its own under walk on this build, and two of them in the base copy, to word the boxes truthfully. From `tmp/rung-walk-instance/repair/`, with `FORTRESS_HOME=/home/user/fortress-walkinst /home/user/fortress-walkinst/bin/fortress P.fss` (and the base copy's tree for the base):

```
== RpInside head          tupA ran / tupB ran
== RpInside2 head         Cannot unify Red(...FTypeTrait) with Round(...VarType) abm=T=(Red,Red)
== RpInside3 head         tupB BoxU[Any] / loneB BoxU[Any]
== RpInside3 base         ** bug! Join(Apple, Cherry) not a singleton: [Red, Round]
== RpFJoin head           Cannot unify Any(...FTypeTop) with Cmp[\T\](...TraitType) abm=T=(Any,Any)
== RpFJoin base           ** bug! Join(Apple, Cherry) not a singleton: [Red, Round]
```

Where the ruling was wrong against a primary source, the round followed the source:
- The ruling describes the several-bounds case as bounds "that no named type below them all meets". Walk's meet does not look for a type below both: `FType.meet` answers a bound only where one is a subtype of the other, and the empty set otherwise (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:338-348`), so `object Apple extends { Red, Round }` below both does not help. The boxes, the entry and row 591 say "several bounds that the interpreter cannot meet, as it cannot meet two bounds neither of which is a subtype of the other".
- The ruling's step 10 has the second kind's call fail outright. Like the first kind, it is bound to the arguments' narrowest named common supertype where there is one, since it falls among the same `rechecks` (`EvaluatorBase.java:312-313`, `:369-371`); it fails where there is none (`SkTwoBoundLone`, `RpInside2`). The box says so.
- The ruling's harness command took a relative scratch path, which the harness cannot use (section 5.7).
- The Effect sentence is restricted further than the ruling asked: `RpFJoin` shows that a call fixing a type parameter whose bound mentions itself also still fails over arguments with several minimal supertypes, so the sentence excepts it as well.

The decisions this round took itself:
- R1. Where the first box says a type parameter of the first kind is bound "as before", it adds "where there is one" and says nothing of the case where its arguments have several minimal supertypes. Alternatives: state `Any`, measured for `T extends S` (`RpInside3`) but failing for `T extends Cmp[\T\]` (`RpFJoin`); or state the failure, false for `T extends S`. The case lies in D5's reach, which the specification does not settle, and it is listed for Pavol.
- R2. `RpFJoin`'s failure gets a note on row 555 alone, not a test (home 3, the ledger row alone). Alternatives: an XXX test, which needs an answer the specification gives, and it gives none for a self-mentioning bound; or a pin, which cannot keep a run that fails. P1 decides the F-bounded half.
- R3. The Rationale names three defects, not two: besides the several-bounds case and the untyped function expression, the first box already named row 588's parameter bounded only from above, also instantiated at `BottomType`.

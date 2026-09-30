# Skeptic, rung W (`rung-walk-dispatch`), first judgement

*Gather's note (climb batch 7b): written at the gather from the skeptic's `skepticText`; the provisional rows 534 to 536 are cited by their final numbers, 548 to 550, and the gather made the seven corrections and opened or refused the four recommended rows (`compile-ladder/climb-batch-7b/RECORD.md`, rung W).*

*Review's note (climb batch 7b's merged-diff review): the provenance block of `REPORT.md`, which finding 6 below could not check, was opened line by line at the gather (the note under `REPORT.md`'s title) and again by the merged-diff review: the problem line's probe, its four captures and the base's `XXXComprisesMeetWalk.fss:13-20`, the specification lines at `811053f15`, the four precedent lines and the three historical files each hold what the block says.*

**Verdict: approved, with seven required corrections.** The change does what answer 9, the conversion decision's four items, row 478, row 157, row 492's walk half and the paper's instance rule ask of walk. Its tests fail on the base and pass on the branch. No stop reserved for Pavol is met.

This file was not committed to the branch. This agent's harness forbids writing report or findings files, which is the refusal the worker met for REPORT.md. Its text is carried here for the gather to write.

## 1. What I ran

- **The base.** I checked out the tests-only commit `b3589652e` in `/home/user/fortress-dispatch`, ran `ant compileAll` (javac 'Compiling 1617 source files', BUILD SUCCESSFUL) and restored `global.map`. I then ran `explorations/compile-ladder/rung-inference-walk/harness-one.sh` over the rung's 19 walk files: the 16 files it adds or renames, the old `XXXComprisesMeetWalk.fss`, and row 159's two XXX files.
- **The head.** I checked out `wip/rung-walk-dispatch` (`1d78d7828`), ran `ant compileAll` and the library-order cache rebuild, and ran the harness again.
- **The differentials.** 45 programs ran under walk at `FORTRESS_THREADS=1` and `4`, and compiled and run at `1` and `4`.
- **A base-class overlay.** For the base walk column, I compiled the three changed files at `811053f15` with javac into a classpath overlay. There are 7 classes; none is anonymous, so none collides with the head's `$1` or `$TypeOnly`.
- Scratch is in `tmp/rung-walk-dispatch/skeptic/`.

## 2. The failure and the pass (check 3)

Base, `harness-one.sh <scratch> tmp/rung-walk-dispatch/skeptic/tests-head/*.fss` on `b3589652e`:

    FAIL: J7/0:generic =/= J6/0:circle; the plain declaration on Circle, written second, lies inside the generic declaration's domain, so a Circle takes it (Overloading Resolution)
    Missing visitor for class com.sun.fortress.nodes.AnyType
    first parameters t:[T] and s:[S] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present
    Tests run: 19,  Failures: 9,  Errors: 0

- **The failures.** The seven home-1 tests failed, and so did `ComprisesMeetWalk` and `DispatchWrittenStaticArgWalk`, both refused at load.
- **The expected failures.** Every XXX file printed 'OK Saw expected exception'. `XXXInferLoneUnboundedWalk` printed 'FAIL: J12/0:BoxU[Number] =/= J9/0:BoxU[Any]'.
- **The rewritten test.** `InferLoneBoundWalk` printed PASS on the base, as the record requires.

At the head, all 18 of the rung's files pass. Three runs in the same harness go red as they should:
- my stand-in `XXXComprisesMeetUncoveredFixed`, which adds `f(v: V)`;
- my stand-in `XXXGenericBesidePlainReturnParamFixed`, whose generic returns `Number`;
- the old name `XXXComprisesMeetWalk`, which is why the rename was needed.

    Tests run: 21,  Failures: 3,  Errors: 0
    1) ...XXXComprisesMeetUncoveredFixed ... Expected failure or exception, saw none.
    2) ...XXXGenericBesidePlainReturnParamFixed ... Expected failure or exception, saw none.
    3) ...XXXComprisesMeetWalk ... Expected failure or exception, saw none.

## 3. Verdicts outside the rung's own files (checks 3, 12)

- **The XXX files.** All 99 `ProjectFortress/tests/XXX*.fss` ran under the harness at base (overlay) and at head: 'OK (99 tests)' both times. Their first failure lines are identical, with two exceptions:
  - `XXXComprisesCoverReturnWrong` moves from `:20` 'unrelated' to `:21`, the return rule, which is the rung's intent;
  - `XXXInheritedOverload` moves from `:29` to `:25`, row 430's known run-to-run order.
- **No hidden change.** So no XXX file hides a load verdict that changed.
- **The plain tests.** The 75 plain tests whose names match coercion, overload, generic, dispatch, inference, comprises, exclusion, range, typecase or Reflect are 'OK (75 tests)' at head.

## 4. The diff (checks 4, 12)

**The load check (`OverloadedFunction.java:494-497`).** Both lifts run only where today's check refuses.
- `validOnDeclaredDomains` (`:692-721`) reads one own generic beside a non-generic declaration on declared domains.
  - Equal domains stay refused (`:713`).
  - Inclusion is decided by `instanceHolding` (`:1291-1306`) and the symbolic domain.
  - The return rule reads the generic's range symbolically. That is sound over every instance and stricter where the range mentions a parameter (row 550).
- `overlapCovered` (`:799-808`) and `overlapCoveredBy`/`overlapPieces` (`:821-945`) distribute an overlap over `comprises` clauses and drop excluding parts. They require every combination of parts to lie inside one plain declaration below both, and refuse on a cycle, on the step and combination bounds, or on a symbolic type.
- `FType.meet` and subtyping are untouched, as the addendum's locality point asks.
- Every pair of the set is still checked by the outer loop, so the covering declarations' own pairs are checked too. My `SkCoverPairOverlap` is refused on its `(V1, V2)` pair.

**Dispatch.** `bestMatchInternal` keeps a candidate by `moreSpecificDeclaration` (`:1335-1342`). For a valid set the linear scan finds the declaration below every other in any order: my `SkGenPlainThree` prints the same answer in three orders on both paths. `convertedCall` (`:1222-1239`) copies `bestMatchWithCoercion`'s per-position loop and `CoercedCall`, and dispatches the converted values again. `O2Z64`'s `op(z, w)` gives `plain64` on both paths.

**The cache key.** `GenericFunctionOrMethod.java:57-68` adds kind and bounds to the key. `NodeComparator.compare(Type)` covers `TraitType`, `VarType` and `AnyType` bounds without a bug path.

**`forAnyType`.** It is a no-op, as the decision asks. No interpreter change was made for the paper's instance rule.

**Scope.** The edit touches only the files the section permits.

## 5. Precedent (check 5)

The cited precedents check out:
- `P4Probe.java:69-75` and `:139-143`;
- the base's `OverloadedFunction.java:838-859`;
- `Coercions.java:363-378`;
- `FType.java:280-296`;
- `EvaluatorBase.java:223-245`;
- `MakeInferenceSpecific.java:66-70`;
- `FGenericFunction.java:49-51`;
- `NodeComparator.java:110-117`.

Other notes:
- `staticParamsNamed` copies the private `EvaluatorBase.mentions` instead of reusing it. This is not a correction.
- The only other interpreter type visitor, `EvalType`, already has `forAnyType`.
- `GenericMethod`'s own `GenericComparer` is unused.
- The missing-case count is wrong; see correction 3.

## 6. The tests (checks 6, 9)

- **Form.** Each file has one comment line, and its messages are plain words that name sections by title ('Overloading Resolution', 'Meet Rule', 'Type Inference', all real titles).
- **The renamed file.** `ComprisesMeetWalk.fss` keeps its old message and comment, which cite a `.tex` line and row 492. It was renamed only, and the gather re-anchors the citation if S moves it.
- **What the tests exercise.** They exercise:
  - defect 1 in both orders;
  - the converted call dispatched again;
  - the meet beside a generic;
  - row 478;
  - row 157;
  - row 492 and the addendum's pair in both orders, with the uncovered and wrong-return controls;
  - the lone-parameter rewrite and its unbounded expected failure.
- **Instances asserted.** No test asserts an instance the value does not fix, except the two lone-parameter tests the record mandates.

## 7. Competing declarations (check 7)

Each new component name occurs once across `tests/`, `compiler_tests/`, `library_tests/`, `test_library/`, `Library/` and `LibraryBuiltin/`. No source or test still names `XXXComprisesMeetWalk` or `XXXInferLoneUnionWalk`.

## 8. record.md (check 8)

The cited lines are right. Four statements need correcting:
- the missing-visitor count (correction 3);
- row 157's closure, whose reproducers now stop earlier (correction 5);
- row 492's note on closure (correction 1);
- a line for the gather on the inference callout (correction 4).

The rows 548-550 cite existing lines. No row is renumbered.

## 9. Count table (check 10)

There is no table and none is needed. The count and the distance are declared unchanged and not run, and `git diff --name-only 811053f15...HEAD` lists only `explorations/`, `ProjectFortress/tests/` and `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`. The manifest's `expectedCheckerCount` is 75 (`CHECKER_BASE`), a prediction only.

## 10. Differentials

Walk at 1 and 4 threads, and compiled at 1 and 4, gave identical columns for every program.

**Agreeing after the rung, where walk refused, or answered generic by order, before it:**
- `GenPlainSub` in both orders;
- `O2Meet`;
- `O2Z64` without a written static argument;
- `PbgLone` and `PbgRetObject`;
- `SkGenPlainThree`, `SkGenPlainNonArg`, `SkGenArrowBesidePlain`, `SkGenNatBesidePlain`;
- `SkGenMeetCoverTyped`, `SkKeyGenPlain`;
- `SkParallelDispatch` ('circles 1000 generics 1000 plains 2000').

**Walk accepts or answers where the compiled path refuses. Each is rung C's half or an existing row:**
- `MeetExample`, `BetweenTwoClosed`, `SkCoverFamily` and `CoverageReturnGood` in both orders;
- `PlainBesideZZ32` and `PlainBesideRet`: walk runs the generic declaration, while the compiled run dies with `ClassCastException` (row 496);
- row 159's pairs: walk still refuses them, while the compiled run prints PASS; they stay XXX under Q4 = (1).

**Divergences whose cause lies outside W:**
- `SkConvertedToRR`: the compiler prelude's `RR64` has no `coerce(x: ZZ32)` (`CompilerBuiltin.fsi:433-435` against `FortressLibrary.fss:391`).
- `SkGenLiteral` and `SkGenTupleBesidePlain` with numerals: the numeral's type differs by prelude. With `ZZ32` arguments both print plain.
- `SkGenMeetCover` with a numeral: row 390.
- `O2Z64` with a written static argument: row 504's home-3 pin, the text being silent (`Specification/basic/overloading.tex:137-138`, `:170-175`).
- `SkPosBox`: walk now prints 'box, box, box, any' and compiled 'box, any, any, any'; the three `viaT` calls are row 499's.

**Unchanged:** `SkBetweenAssign` is PASS before and after under walk, and still refused compiled. `SkM2GenOvl` prints 'oP oP'.

## 11. Findings

**1. Loud to quiet: an unlisted extender of two closed traits.** The program is `SkUnlistedExtender`: `object Z extends { S, T }` beside the Meet Rule's traits and `f(S)`, `f(T)`, `f(V)`.

    walk, base overlay:  first parameters t:[T] and s:[S] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present
    walk, head, T1 and T4:  f(Z) = f(S), g(Z) = g(T)
    compiled:  Invalid comprises clause: S has a comprises clause
               but its immediate subtype Z is not eligible to extend it.

- **Cause.** Walk records the clause and never checks it (`BuildEnvironments.java:892-895`), and `overlapPieces` trusts it (`OverloadedFunction.java:915`).
- **What the text says.** The text makes the program invalid (`Specification/basic/traits.tex:239-247`) and lets dispatch pick an arbitrary minimal declaration (`Specification/basic/overloading.tex:272-274`).
- **What is lost.** The load-time diagnosis. The answer now depends on the order the declarations were written.

**2. The lift refuses a set the checker accepts.** In `SkGenTwoBounds`, the generic's type parameter has two bounds. Walk refuses it at base and at head, 'has a parameter with generic type, at least one pair of parameters must have excluding types', because `genericOverlapCovered` requires at most one bound (`OverloadedFunction.java:742`). The checker accepts it. The worker's FACTS line documents the limit, but no test gates it.

**3. The missing visitor cases number 11.** They are `BottomType`, `UnknownType`, `TraitSelfType`, `ObjectExprType`, `_InferenceVarType`, `TaggedDimType`, `TaggedUnitType`, `IntersectionType`, `UnionType`, `FixedPointType` and `LabelType` (`ProjectFortress/astgen/Fortress.ast:1015-1168`). The record says 10.

**4. The inference callout goes stale.** `Specification/basic/inference.tex:158-160` says walk does not compare declarations with static parameters on their declared parameter types, nor dispatch a converted call again. After W, both are false, except for generic dotted methods and overloaded methods.

**5. Row 157's reproducers stop earlier.** `q02c3_genericplain_any.fss`, `q02d_rankbyresult.fss` and `q02_rowlift.fss` stop at the library's `fill`, on the base and after: 'Unification error: Closure/Constructor for fill param 1 (v:RR64) got arg FnExpr'.

**6. REPORT.md is not on the branch,** so its provenance block was not checked.

## 12. Stops

None is met:
- No test's verdict and no library or test set's load verdict changed outside the section's shapes.
- `SkBetweenAssign`'s walk verdict holds.
- No interpreter change was made for the paper's instance rule.
- No file of another rung was touched.

## 13. Required corrections

1. record.md: a provisional row for finding 1, whose home is the ledger row alone (the rung's decision-6 form). Row 492's note must say that walk enforces no comprises closure within a component either, not only across components (row 487).
2. An XXX walk test for finding 2, in `SkGenTwoBounds`'s shape with `ZZ32`-typed arguments, asserting meet, generic and bothAny. It is shown through `harness-one.sh` and goes red on a one-bound stand-in. Provisional row 550, or a new row, names the overlap reading's limits (`OverloadedFunction.java:736-757`).
3. The visitor count is 11, listed as in finding 3, in record.md's third FACTS entry and in the precedent text.
4. A line in record.md for the gather: once W lands, the callout at `Specification/basic/inference.tex:158-160` (base lines) must drop both claims, save the two exceptions, and rung S's reworded callout is checked against this.
5. Row 157's note says its run-c reproducers stop at `fill` before the defect. The row closes on `GenericReturningAny.fss`, and the nat form is fixed too (`SkNatReturnAny`: 'lenOf: 3').
6. The gather writes REPORT.md from reportText and checks its five-line provenance block. The historical line names `OverloadedFunction.java`, `GenericFunctionOrMethod.java` and `MakeInferenceSpecific.java`.
7. In the report's divergences, `SkPosBox` compiled is 'box' for the direct call and 'any' for the three `viaT` calls.

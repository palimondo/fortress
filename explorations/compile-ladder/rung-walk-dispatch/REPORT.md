# Rung W, walk's choice of declaration (`rung-walk-dispatch`, climb batch 7b)

*Gather's note (climb batch 7b): written at the gather from the worker's `reportText`. The provisional rows 534 to 536 are cited by their final numbers, 548 to 550. The gather opened each file:line of the provenance block below: the probes' lines and captures hold what the block says, the specification lines are the base's (rung S rewrote those passages; `Specification/basic/overloading.tex:292-295` is the sentence it replaced), and the historical line names the rung's three files of the 2012 tree. Corrected at the gather on the skeptic's corrections 3 and 7: the visitor's count in section 3 and `SkPosBox`'s compiled column in section 7.*

- problem: `explorations/reviews/overload-static-params-ways/probes/GenPlainSub.fss:10-11` (walk prints `generic` three times, `explorations/reviews/overload-static-params-ways/captures/GenPlainSub.txt:1-5`); `explorations/reviews/option-2-soundness/captures/O2Z64.walk-stock.txt:2-6`; `explorations/compile-ladder/rung-ranges-zz32/probes/rangeoperators/BoundBoundedFirstSameName.txt:3-7`; `explorations/reviews/plain-beside-generic-ways/captures/both-paths.txt:38-41`; `ProjectFortress/tests/XXXComprisesMeetWalk.fss:13-20` at the base
- spec: `Specification/basic/overloading.tex:256-295` (Overloading Resolution: the declaration applicable at run time that no other applicable one is more specific than); `Specification/advanced/overloading.tex:149-166` (the Subtype Rule, strict) and `:224-307` (the Meet Rule and its `comprises` example)
- precedent: `explorations/compile-ladder/plan-7b/probes/P4/P4Probe.java:69-126` (the declared-domain relation, inference from values that carry only types); `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:838-859` at the base (`bestMatchWithCoercion`'s per-position coercions); `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:280-296` (walk reading transitive `comprises` clauses); `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java:66-70` (`forTraitType`, a no-op)
- deviation: the comparison follows answer 9 (POSITIONS 2026-09-26, answer 9) where `Specification/basic/overloading.tex:292-295` still says static parameters are inferred before the parameter types are compared, the sentence rung S rewrites; the return-type rule of the lifted pairs reads the generic declaration's range with its type parameters standing for themselves, stricter than "over every instance" where the range mentions a parameter (section 5.3; row 550, `ProjectFortress/tests/XXXGenericBesidePlainReturnParam.fss`); generic dotted methods and generic functional methods keep today's comparison on the instance (section 11, decision 2); the coercion pass is not changed (section 11, decision 4)
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionOrMethod.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java`

## 0. What I inherited

Nothing. The worktree `/home/user/fortress-dispatch` and the branch `wip/rung-walk-dispatch` did not exist when the rung started (`git worktree list` in the main tree listed neither, and `git ls-remote origin` had no such branch, nor any of the batch's four). I created both at `811053f15` with `git worktree add`, copied `ProjectFortress/build` in as the brief describes, and pushed the branch. The harness refused my write of this file; its text travels in the structured result.

## 1. Summary

Walk now chooses between a generic declaration and another on their declared domains, so the order they are written in no longer decides. It hands the chosen generic declaration to rung K's inference as before, and when that instance converts an argument, it dispatches the converted call again. Where today's check refuses a generic declaration beside a plain one, it reads the pair on declared domains, which loads `O2Z64`'s and `O2Meet`'s shapes. It loads the Meet Rule's `comprises` example by a coverage search, local to the load check, that reads the clauses (row 492's walk half). It keys its shared symbolic instantiation by each static parameter's bound as well as its name (row 478), and it instantiates a generic declaration declared to return `Any` (row 157). The walk test of a lone type parameter now tests the written bound, and the unbounded case is a new expected failure (row 516). Row 159's renamed and swapped pairs stay refused, since under Q4 = (1) the load check of two generic declarations is kept (section 11, decision 1). Three source files change: 453 lines added and 5 removed, all but 18 in `OverloadedFunction.java`. The interpreter corpus keeps every verdict: `SystemJUTest` over `ProjectFortress/tests/` in two shards, `OK (232 tests)` and `OK (230 tests)`.

## 2. Where the fix belongs

`explorations/coordinator/map/spec-to-implementation.md:213` (multiple dispatch, overload resolution) gives the interpreter site: `values/OverloadedFunction.java` `bestMatch`, which reads run-time types. The load-time check is `finishInitializingSecondPart` in the same file (`OverloadedFunction.java:185-268` at the base). The map's `modules-and-phases.md` A.2.2 places run-time dispatch in `evaluator/values/` and the run-time type objects in `evaluator/types/`. The symbolic instantiation row 478 names is built in `FGenericFunction.getSymbolic` and `GenericConstructor.getSymbolic`. Both are keyed through one comparer, `GenericFunctionOrMethod.GenericComparer`, so the key is changed there, once. Row 157's visitor is `MakeInferenceSpecific`, which `EvaluatorBase` runs on the declared return type in both of its inference paths (`EvaluatorBase.java:195-197`, `:465-467`). Nothing of the change is in the checker, the code generator or the library, and none of it is reached on the compiled path.

## 3. Precedent search

- **The declared-domain relation.** Probe P4's shadow (`explorations/compile-ladder/plan-7b/probes/P4/P4Probe.java:69-126`) computes it by walk's own inference from values that carry only the declared types (`TypeOnly`, `:69-76`) and a subtype test on the instance (`:124`). It reads only generic declarations with static parameters of their own (`ownGeneric`, `:139-143`). I copied that shape (`OverloadedFunction.java:1248-1361`), with two differences:
  - I use `inferByUnification` rather than `inferAndInstantiateGenericFunction`, because a declared domain lies inside a generic one when some instance holds it by subtyping, not by coercion.
  - `ownGeneric` also leaves out generic dotted methods (section 11, decision 2).
- **The converted call.** `bestMatchWithCoercion` builds a `Coercions.CoercedCall` from per-position coercions (`OverloadedFunction.java:838-859` at the base). Applying that call converts the arguments and dispatches again (`Coercions.java:363-378`). `convertedCall` (`OverloadedFunction.java:1222-1239`) is the same loop over the promoted instance's domain. It is the only other site in the file that builds such a call.
- **Reading `comprises` clauses in walk.** Three precedents:
  - `FType.excludesOtherInner` already reads transitive `comprises` clauses for exclusion (`FType.java:280-296`).
  - The compiled checker's `normConjunct` (`scala_src/types/TypeAnalyzer.scala:645-655`) is the one-clause case of the distribution the comprises judgement describes (`explorations/reviews/comprises-type-level-judgement.md` section 6).
  - `overlapPieces` (`OverloadedFunction.java:901-945`) distributes the same way and drops excluding pairs. It is a private helper of the load check, not `FType.meet`, whose callers include walk's inference lattice (`TypeLatticeOps.java:41`).
- **Naming a type's static parameters.** `staticParamsNamed` (`OverloadedFunction.java:768-790`) copies the visitor of `EvaluatorBase.mentions` (`EvaluatorBase.java:223-245`).
- **Row 157.** `forTraitType` is the no-op precedent (`MakeInferenceSpecific.java:66-70`). The same defect elsewhere in that file:
  - The visitor had cases for 6 of the AST's 18 concrete type classes (`TraitType`, `VarType`, `ArrayType`, `ArrowType`, `MatrixType`, `TupleType`); it now has `AnyType` too.
  - The 11 left are `BottomType`, `FixedPointType`, `IntersectionType`, `LabelType`, `ObjectExprType`, `TaggedDimType`, `TaggedUnitType`, `TraitSelfType`, `UnionType`, `UnknownType` and `_InferenceVarType` (`ProjectFortress/astgen/Fortress.ast:1015-1168`; the skeptic's correction 3).
  - Of these, only the two dimension forms can be written as a return type, and walk has no dimensions. They are counted and not repaired.
- **Row 478.** The team's note at the cache: "TODO This is not quite right, because we risk identifying two functions whose where clauses are interpreted differently in two different environments" (`FGenericFunction.java:49-51`). The key now holds each static parameter's kind and bounds (`GenericFunctionOrMethod.java:57-68`). They are compared by `NodeComparator.traitTypeListComparer`, the list comparer the tree already has for bound lists (`NodeComparator.java:110-117`). A `where` clause is not in the key. That is what the TODO names, and no test or library declaration reaches it.

## 4. The tests, first, and their failure on the base

Commit `b3589652e` holds the tests alone. Run through the testSystem harness on the unchanged tree:

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-walk-dispatch/h-base <the 14 files>

    FAIL: J7/0:generic =/= J6/0:circle; the plain declaration on Circle, written second, lies inside the generic declaration's domain, so a Circle takes it (Overloading Resolution)
    opz[\T extends FortressLibrary.Number\](a:T,b:T):FortressLibrary.String...DispatchConvertedAgain.fss:6:1-84 has a parameter
    with generic type, at least one pair of parameters must have excluding types
    Missing visitor for class com.sun.fortress.nodes.AnyType
    Tests run: 14,  Failures: 7,  Errors: 0

The seven that fail are `DispatchDeclaredDomain`, `DispatchConvertedAgain`, `DispatchMeetBesideGeneric`, `GenericOverloadBoundsApart`, `GenericReturningAny`, `ComprisesMeetViaExclusion` and `ComprisesCoverReturn`. The last two fail with "first parameters t:[T] and s:[S] are unrelated (neither subtype, excludes, nor equal) and no excluding pair is present". The expected failures fail as expected: `XXXInferLoneUnboundedWalk` (`FAIL: J12/0:BoxU[Number] =/= J9/0:BoxU[Any]`), `XXXComprisesMeetUncovered`, `XXXComprisesCoverReturnWrong` and the kept `XXXComprisesMeetWalk`. `InferLoneBoundWalk`, the rewrite of `XXXInferLoneUnionWalk`, passes on the base, as the brief says it must.

The first `XXX` file this rung adds, `XXXInferLoneUnboundedWalk.fss`, goes red under the harness on a deliberate local fix. The stand-in writes the call as `pickU[\Any\](l, r)`, which gives the `BoxU[\Any\]` the text now gives:

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-walk-dispatch/h-standin tmp/rung-walk-dispatch/standin/XXXInferLoneUnboundedWalk.fss
     Missing expected failure
    1) ...XXXInferLoneUnboundedWalk(...InterpreterTest)junit.framework.AssertionFailedError: Expected failure or exception, saw none.

Five more files came during the work, each shown through the harness: `XXXGenericBesidePlainReturnRule.fss` and `XXXGenericBesidePlainReturnParam.fss` (section 5.3), `XXXDispatchGenericMethodBesidePlain.fss` and `DispatchWrittenStaticArgWalk.fss` (section 10), and the rename of `XXXComprisesMeetWalk.fss` to `ComprisesMeetWalk.fss`.

## 5. The edit

### 5.1 Dispatch on declared domains (answer 9; defect 1)

`bestMatchInternal` (`OverloadedFunction.java:1161-1213`) still finds each applicable declaration as before, a generic one instantiated at the arguments by `inferByUnification`. It now keeps a candidate when `moreSpecificDeclaration` (`:1335-1342`) prefers it, where it used to compare the two instances' domains.

- **When one of the two is an own generic**, the comparison is on declared domains. `declaredBelow` (`:1314-1323`) tells whether one declared domain lies inside the other, and when exactly one does, that one wins.
- **Otherwise** the instances' domains are compared, as before. Two plain declarations are always compared that way, since for them the instance is the declaration.
- **A generic declaration's declared domain** is its symbolic instantiation, each type parameter standing for itself with its bounds as its supertypes (`GenericFunctionOrConstructor.getDomain`).
- **A domain lies inside a generic one** when walk's inference, from values that carry only its types, finds an instance whose domain holds them (`instanceHolding`, `:1291-1306`).
- **Results are memoized** per overloaded function for pairs whose domains do not depend on the call (`:1344-1361`).

Why the choice no longer depends on the order: the loop keeps a candidate only when it is strictly preferred to the best so far. When one applicable declaration's declared domain lies below every other's, the loop reaches it in any order and no later candidate displaces it. The load check's rules guarantee such a declaration for a valid set. This is the ordered candidate family the proof addendum applies to (`explorations/reviews/comprises-type-level-proof-addendum.md`, "Application to the existing brief"). Where the declared domains do not order two candidates, the instances decide as before.

### 5.2 Rung K's inference, and the converted call dispatched again (the conversion decision's items 2 and 3)

A generic declaration chosen is still instantiated again by `EvaluatorBase.inferAndInstantiateGenericFunction`, rung K's inference with answer 8's promotion (`:1203-1211`).

What is new: when that instance does not take the arguments without a coercion, `convertedCall` (`:1222-1239`) returns a `Coercions.CoercedCall` over it. The call converts the arguments and dispatches them again through the same overloaded function. So `opz(z, w)` with a `ZZ32` and a `ZZ64` is promoted to the generic declaration at `ZZ64`, converts `z`, and runs `opz(a: ZZ64, b: ZZ64)`, the more specific declaration for the converted values.

Two cases keep the promoted instance:
- An overloaded method, because `OverloadedMethod.getApplicableMethod` casts the choice to a `MethodClosure` (`OverloadedMethod.java:47-53`).
- A position whose coercion `Coercions.coercionFor` does not find, such as a tuple converted element by element (row 395's mechanism).

`bestMatchWithCoercion` and `EvaluatorBase` are unchanged.

### 5.3 The load check for a generic declaration beside a plain one (the conversion decision's item 4)

Today's parameter-by-parameter check runs first and decides every pair it accepts. When it refuses a pair of one own generic and one plain declaration of equal length, `validOnDeclaredDomains` (`OverloadedFunction.java:692-721`, called at `:494-497`) reads the pair on declared domains:

- equal declared domains are refused, as today (`:713`);
- a plain domain inside the generic one is valid when the plain declaration's return type is below the generic's, the generic's type parameters standing for themselves (`:714`);
- the generic inside the plain one is valid likewise (`:715`);
- neither inside the other: valid when declarations below both cover the overlap (`genericOverlapCovered`, `:736-763`). The generic's domain is read at its bounds, which holds every value of it when each type parameter is the whole type of the parameters it occurs in and has at most one bound, a bound that names no static parameter. Any other generic is not read, and the pair stays refused.

Pairs of two generic declarations keep today's check (Q4 = (1)). The lift only turns a refusal into an acceptance, so no set that walk loads today is read by it.

The return-type rule. My first build compared the plain declaration's return type with the range of the generic instance that holds its domain. That is the one-instance reading, defect 2's (`explorations/reviews/overloading-judgement.md` section 3.7).
- **The defect.** With it, walk accepted `GenPlainRTR`, the Types paper's `baz` pair (`ident[\T extends Shape\](x: T): T` beside `ident(x: Round): Round`), which the rule over every instance refuses. At `T = Circle` the generic declaration promises a `Circle`, and the plain one, which runs, returns a `Round`. I measured it on my own probe run: "static type Circle kept", in `tmp/rung-walk-dispatch/probes-walk-edit.txt`.
- **The repair.** Before commit `adc6505c1` the rule reads the generic's range with its type parameters standing for themselves (`:714`).
- **The test.** The refusal is pinned in `ProjectFortress/tests/XXXGenericBesidePlainReturnRule.fss`, an expected failure in the form of the team's `XXXGenericOverload2`: a program that must be refused at load, refused before the rung and after.
- **The cost.** That reading is sound for every instance but conservative. `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: ZZ64, b: ZZ64): ZZ64`, valid over every instance, stays refused, as it is today. Its home is 2: `ProjectFortress/tests/XXXGenericBesidePlainReturnParam.fss`, asserting the answers, refused at load before and after; row 550. `O2Z64`'s and `O2Meet`'s declarations return `String`.

### 5.4 Row 492's walk half: covering declarations read through the `comprises` clauses (item 26 = (1))

When today's check refuses two plain declarations because a parameter pair is "unrelated", neither a subtype of the other nor excluding, `overlapCovered` (`OverloadedFunction.java:799-808`) looks for declarations that cover the overlap.

- **The parts.** The overlap, position by position, is a union of parts, each part a set of types standing for their intersection (`overlapPieces`, `:901-945`). For `p` and `q` the parts are:
  - `{p}` when `p` is a subtype of `q`, and `{q}` the other way;
  - none when they exclude;
  - otherwise the parts of each type a `comprises` clause of `p` (else of `q`) lists, taken with the other type;
  - `{p, q}` when neither is closed.
- **The covering declarations** are those without static parameters whose domains lie below both (`overlapCoveredBy`, `:825-879`).
- **The test.** Every combination of parts across the positions must lie inside the domain of one covering declaration. A part lies inside a domain when one of its types is a subtype of it (`someBelow`, `:881-891`).

So `S ∩ T` in the specification's example is the parts `{U, V}` and `{V}` (`W` is excluded by `U`), both inside `f(V)`.

The contract is rung C's:
- a covering family, not one declaration that handles part of the overlap;
- each covering domain strictly below both;
- every refused pair of the set checked, the covering declarations' own pairs among them. The load check's loop over all pairs gives this.

The search refuses when it does not settle: a cycle on its path (`:925`), a step bound of 10,000 (`:902`), more than 4,096 combinations (`:837`), a symbolic type, or an exception from the type objects. When the part is the two parameter types themselves, neither subtype and neither closed, no declaration below both can hold it, so a case the clauses do not settle stays refused. The search is not used for functional or dotted methods, whose Meet Rule is another (`:803-806`). No dispatch rule is added: walk chooses by the values' object types, and the covering declaration is the most specific.

Assignment and ordinary subtyping are untouched. `FType.meet`, `FType.subtypeOf` and `FTypeTuple.meet` are not changed, and the helpers are private to the load check. `SkBetweenAssign` keeps its walk verdict (`PASS` before and after). Dispatch neither repairs closure nor proves coverage. A value of a type declared in another component, outside every listed type of a closed trait (row 487), is the case the proof does not cover, and this rung does not repair it.

### 5.5 Row 478: the cache key gains the bounds

`GenericComparer` (`GenericFunctionOrMethod.java:44-72`) compares the name and the static parameters' names as before, then each parameter's kind and bound list. Two overloads whose parameters share a name but not a bound now each get their own symbolic instantiation. Two with equal names and bounds still share one, as the cache intends. Generic functional methods are keyed by their trait's parameters, so their key takes those parameters' bounds too.

### 5.6 Row 157: `forAnyType`

`MakeInferenceSpecific.forAnyType` (`MakeInferenceSpecific.java:72-75`) is a no-op like `forTraitType`. `peekLone[\X\](t: Tag[\X\]): Any` runs at `X = Red`. Beside `peekBeside(a: Any): Any`, the generic declaration is chosen for a `Tag[\Red\]`. The catch in `bestMatchInternal` is not touched.

### 5.7 Row 516, the lone parameter, and the paper's instance rule

- **The written bound.** `XXXInferLoneUnionWalk.fss` is renamed `InferLoneBoundWalk.fss` and rewritten to `pickU[\T extends Number\](a: T, b: T)`. It asserts `BoxU[\Number\]` for a `ZZ64` and an `RR64`, the written bound, which walk already takes. It passes on the base and after, and the assertion that pinned the union is gone.
- **The unbounded case.** `XXXInferLoneUnboundedWalk.fss` keeps it: `pickU[\T\]`, asserting `BoxU[\Any\]`, the bound the text now gives. Walk answers `BoxU[\Number\]`, the arguments' common supertype, on the base and after.

No interpreter source is changed for either: under the paper's instance rule this is walk's limit, since walk has no static return type.

### 5.8 Row 159's renamed and swapped pairs

They are not promoted, and both expected failures keep their verdicts. Walk still refuses `grab[\X\](t: Tag[\X\])` beside `grab[\Y\](t: Sub[\Y\])`, and the swapped `pair`, with "at least one pair of parameters must have excluding types". Section 11, decision 1 gives the reason.

## 6. The passing run

    bash explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/rung-walk-dispatch/h-final <the rung's 17 walk files>
    OK (17 tests)

That is 10 plain tests passing and 7 expected failures failing ("OK Saw expected exception"), the two row-159 files among the latter. The plain tests are `DispatchDeclaredDomain`, `DispatchConvertedAgain`, `DispatchMeetBesideGeneric`, `DispatchWrittenStaticArgWalk`, `GenericOverloadBoundsApart`, `GenericReturningAny`, `InferLoneBoundWalk`, `ComprisesMeetWalk`, `ComprisesMeetViaExclusion` and `ComprisesCoverReturn`. `XXXGenericBesidePlainReturnParam` was run through the same harness alone: "OK Saw expected exception", "OK (1 test)".

The interpreter corpus on the edit ran through `SystemJUTest` over `ProjectFortress/tests/`, with `fortress.suite.shard` 0/2 and 1/2, private caches, 768 MB and `FORTRESS_THREADS=1` (`tmp/rung-walk-dispatch/corpus.sh`):

    OK (232 tests)
    OK (230 tests)

That run was on the committed source, `adc6505c1`'s. It came before the last three test files, which were run alone. It covers every interpreter test's verdict. Each shard analyses the library afresh, so the library loads under walk.

## 7. Differentials

- **Walk before and after:** `tmp/rung-walk-dispatch/walk.sh base` runs with the base's three classes first on the classpath, and `walk.sh edit` runs on the edit, each file from an empty private cache.
- **The compiled run:** this tree's checker and compiler library (`tmp/rung-walk-dispatch/compiled.sh`). The rung changes nothing on that path, and rung C's checker is not in this tree.

| program | walk before | walk after | compiled |
|---|---|---|---|
| `GenPlainSub` (generic first) | generic, generic, generic | circle, generic, circle | circle, generic, circle |
| `GenPlainSubPlainFirst` | circle, generic, circle | circle, generic, circle | circle, generic, circle |
| `O2Z64` | refused at load | `op(z, w)`, `op(w, w)` plain64[ZZ64,ZZ64]; `op(z, z)` generic[ZZ32,ZZ32]; `op[ZZ64](z, w)`, `op[ZZ64](w, w)` generic[ZZ64,ZZ64] | the same, but `op[ZZ64](…)` plain64 |
| `O2Meet`, `O2MeetRev` | refused at load | meet, meet, generic[ZZ64,ZZ64], z32any | the same (`O2Meet`) |
| `O2MeetNo` (no meet) | refused | refused | (on file: refused) |
| row 478's four probes | `BoundBoundedFirstSameName` refused, the others `integer pair / string pair / triple` | all four `integer pair / string pair / triple` | `AnyIntegral is undefined` (the compiler library declares no `AnyIntegral`) |
| `XXXDispatchRenamedArmWalkRungG`, `…SwappedArm…` | refused | refused | (rung G: the compiled answers) |
| `PbgLone` | `Missing visitor for class com.sun.fortress.nodes.AnyType` | `Marker[Red]` | `Marker[Red]` |
| `PbgRetObject` | `Marker[Red]` (generic) | `Marker[Red]` | `Marker[Red]` |
| `PlainBesideZZ32` | the Any declaration | `Marker[ZZ32]` (generic) | run exit 1 (row 496) |
| `PlainBesideRet` | `Marker[Red]` | `Marker[Red]` | run exit 1 (row 496) |
| `MieDispatchAny` | peek ×3: Red (the Any declaration) | peek: Marker[Red], Marker[Red], Marker[Blue] | (on file) |
| `MeetExample`, `SkMeetSingle` | refused, "unrelated" | `f(g) = 3` | (rung C's) |
| `MeetViaExclusion` | refused | `PASS` | `PASS` |
| `MeetViaExclusionNoV` | refused | refused | (rung C's) |
| `CoverageReturnGood`, its reversed twin | refused, "unrelated" | `PASS`, `PASS` | refused by this tree's checker (`Right-hand side has type RightResult, but declared type is LeftResult`), rung C's to change |
| `CoverageReturnBad` | refused, "unrelated" | refused, on the return-type rule | (rung C's) |
| `BetweenTwoClosed` | refused, "unrelated" | `f(g) = 3` | (on file: refused by the hierarchy check) |
| `SkBetweenAssign` | `PASS` | `PASS` | (on file: refused) |
| `SkPosBox` (row 499) | any, any, any, any | box, box, box, any | box for the direct call, any for the three `viaT` calls (row 499) |
| `SkPosFixed` (row 499) | refused (row 159) | refused | (on file: tag) |
| `GenPlainRTR` | refused | refused | (rung C's defect 2) |
| `RetParamBesidePlain` (`pickFirst`'s shape) | refused | refused | — |
| `XXXGenericOverload2`, `XXXGenericOverload3` | refused | refused | — |
| `MethGenPlain` (a generic dotted method beside a plain one) | `Missing type T` at load | the same | — |
| `CoerceTie`, `CoerceTieLate` (a coercion needed under a generic and a plain declaration of equal domains) | `Ambiguous coercion` | the same | — |

Walk and the compiled run now agree on every program of the table that both run, except the written static argument `op[\ZZ64\](z, w)` (section 10). That case is outside the four items.

## 8. Load-time verdicts that moved

Refused before and loaded after, each one of the shapes the brief names:
- a generic declaration beside a plain one, read on declared domains: `O2Z64`, `O2Meet` and `O2MeetRev`, and this rung's `DispatchConvertedAgain`, `DispatchMeetBesideGeneric` and `DispatchWrittenStaticArgWalk`;
- row 478: `BoundBoundedFirstSameName` and `GenericOverloadBoundsApart`;
- row 492: `MeetExample`, `SkMeetSingle`, `MeetViaExclusion`, `CoverageReturnGood` in both orders, `BetweenTwoClosed`, and the tests `ComprisesMeetWalk`, `ComprisesMeetViaExclusion` and `ComprisesCoverReturn`.

Loaded before and refused after: none. The lifts only accept, and the corpus shows no verdict change.

Still refused: row 159's pairs, `XXXGenericOverload2`, `XXXGenericOverload3`, `O2MeetNo`, `MeetViaExclusionNoV`, `CoverageReturnBad` (now on the return-type rule), `GenPlainRTR` and `pickFirst`'s pair.

## 9. What the specification settles

- **Which declaration runs:** the one applicable to the values that no other applicable one is more specific than (`Specification/basic/overloading.tex:262-276`). "More specific" is read on declared, quantified domains (answer 9, POSITIONS 2026-09-26; the conversion decision, POSITIONS 2026-09-28, decision 1). The base's sentence that static parameters are inferred before the comparison (`:292-295`) is the one rung S revises.
- **The converted call:** run-time dispatch considers the statically chosen declaration and the more specific ones (`Specification/advanced/overloading.tex:73-78`). The converted values dispatch to the most specific declaration applicable to them (the conversion decision's item 3; FACTS, "Under `walk`, the interpreter converts by coercion at its three kinds of type check").
- **The Meet Rule's example** is valid (`Specification/advanced/overloading.tex:275-307`). Coverage read at the level of values is item 26's decision (POSITIONS 2026-09-29, PLAN item 26).
- **The Subtype Rule** requires a strict subtype (`Specification/advanced/overloading.tex:149-166`). So `CoerceTie`'s equal declared domains make no valid overloading, `GenPlainRTR`'s return type breaks the rule, and `pickFirst`'s pair keeps it over every instance.
- **A lone type parameter** that nothing fixes takes its bound (the paper's instance rule, POSITIONS 2026-09-29, a type parameter that a call's arguments do not fix; the text rung S writes).
- **Silent:** a written static argument on a name whose other declarations take none. The chapter assumes "all static variables in functional calls have been instantiated or inferred" (`Specification/basic/overloading.tex:137-138`).

## 10. Every measured defect and its home

| defect | home | where |
|---|---|---|
| defect 1, walk's order-dependent choice between a generic and a plain declaration (row 548) | 1 | `ProjectFortress/tests/DispatchDeclaredDomain.fss`, both orders |
| the converted call not dispatched again (the conversion decision's item 3), and `O2Z64`'s set refused at load | 1 | `DispatchConvertedAgain.fss` |
| `O2Meet`'s set refused at load | 1 | `DispatchMeetBesideGeneric.fss` |
| row 478 | 1 | `GenericOverloadBoundsApart.fss` |
| row 157 | 1 | `GenericReturningAny.fss` |
| row 492, walk's half | 1 | `ComprisesMeetWalk.fss` (renamed, no assertion changed), `ComprisesMeetViaExclusion.fss`, `ComprisesCoverReturn.fss` (the addendum's acceptance program in both orders) |
| coverage must not admit an uncovered overlap, or a covering result that breaks the return-type rule | 1, as refusals | `XXXComprisesMeetUncovered.fss`, `XXXComprisesCoverReturnWrong.fss`: expected failures in the form of the team's `XXXGenericOverload2`, programs that must be refused at load and would print `PASS` if loaded |
| my first build's one-instance return rule, which accepted `GenPlainRTR` (measured and repaired in this rung before commit) | 1, as a refusal | `XXXGenericBesidePlainReturnRule.fss` |
| the lifted check's return rule, stricter than "over every instance" where the generic's range mentions a parameter (row 550) | 2 | `XXXGenericBesidePlainReturnParam.fss`, refused at load before and after |
| row 516, walk's unbounded lone parameter at `Number` where the text gives `Any` | 2 | `XXXInferLoneUnboundedWalk.fss`, seen red on the stand-in |
| row 159's renamed and swapped pairs | 2, kept | `XXXDispatchRenamedArmWalkRungG.fss`, `XXXDispatchSwappedArmWalkRungG.fss` |
| a generic dotted method beside a plain one of one name is refused at load, `Missing type T` (the type form of row 21's size note) | 2 | `XXXDispatchGenericMethodBesidePlain.fss`, asserting the declared-domain answers in both orders |
| a written static argument on a name with a generic and a plain declaration: walk runs the generic instance, the compiled run dispatches to the plain one | 3, the text is silent (`overloading.tex:137-138`) | `DispatchWrittenStaticArgWalk.fss` pins walk's answer; a note on row 504 |
| walk loads a generic and a plain declaration whose declared domains are equal (`tie[\T extends Wide\](a: T, b: T)` beside `tie(a: Wide, b: Wide)`), which the Subtype Rule's strictness refuses; a call that needs a coercion is then `Ambiguous coercion` | the ledger row alone (row 549), by decision (section 11, decision 6) | the output below |

The `CoerceTie` output, on the base and after (`tmp/rung-walk-dispatch/walk.sh edit tmp/rung-walk-dispatch/probes/CoerceTie.fss`):

    com.sun.fortress.exceptions.ProgramError: tmp/rung-walk-dispatch/probes/CoerceTie.fss:12:34-57:
    Ambiguous coercion, args = (Narrow,Narrow), applicable with coercion = {coerced tie[\T extends Wide\](a:T,b:T):FortressLibrary.String[\Wide\] (Wide,Wide)->String ...,coerced tie(a:Wide,b:Wide):FortressLibrary.String (Wide,Wide)->String ...}

The `MethGenPlain` output, on the base and after:

    com.sun.fortress.exceptions.ProgramError: tmp/rung-walk-dispatch/probes/MethGenPlain.fss:8:32:
    Missing type T

## 11. Decisions

1. **Row 159's pairs stay refused.** The candidates:
   - (a) keep today's load check for two generic declarations;
   - (b) key the symbolic instantiation by position instead of by name, which identifies `X` with `Y` and accepts the renamed and swapped pairs through today's check;
   - (c) read such pairs on declared domains.

   Under (b), today's check read positionally is the positional rule with the domain condition, which is Q4 = (2)'s reading (`explorations/coordinator/CLIMB-BATCH-7.md` section 1, Q4). (c) accepts `XXXGenericOverload2`, "Should not compile" (probe P4). The answers line is Q4 = (1), and the record says the load check of two generic declarations "stays as it is", so I took (a). The two tests stay expected failures, and row 159 gets a note.
2. **What reads declared domains.** Generic functions and constructors do (`ownGeneric`, `OverloadedFunction.java:1248-1250`).
   - A functional method of a generic trait keeps its instance, as in P4: it is instantiated from its self argument, and its symbolic trait parameters carry only the declaring trait's bound (`explorations/compile-ladder/plan-7b/probes/P4.md` section 1).
   - I also left out generic dotted methods, which P4 read. Walk has no symbolic instantiation for them: `GenericMethod.finishInitializing` evaluates their parameter types in the declaring environment (`GenericMethod.java:126-140`). Walk also refuses such a method beside a plain one at load (`MethGenPlain`, section 10), so no call reaches the comparison.
3. **The converted call.** Where the promoted instance converts an argument, it is dispatched again through a `CoercedCall` (the conversion decision's item 3). The alternative was to dispatch again only when some other declaration could be more specific; that saves one dispatch per converted call's first occurrence at the price of a test that repeats the dispatch. Overloaded methods are left out, because their `getApplicableMethod` cannot carry a conversion (section 5.2).
4. **The coercion pass is not changed.** Its candidates need a coercion, and its result is already a converted call dispatched again, which reaches `bestMatchInternal`'s declared-domain comparison. The one tie that pass could meet between a generic instance and a plain declaration of the same domain is `CoerceTie`'s. Its declared domains are equal, so the fault is in the set, not in the pass (decision 6).
5. **The load-check lifts run only where today's check refuses.** The alternative was to read every pair with a generic declaration on declared domains, as P4's verdict did. P4 found no loaded set whose verdict that changes, but by construction the lift-only form cannot refuse a set walk loads today, and that refusal is a stop of this rung. For the same reason:
   - the coverage search runs only where today's check reports an unrelated parameter pair, and not where it finds each declaration better in some parameter and no exact meet (`meetExistsIn`);
   - the return rule reads the generic's range symbolically. That is sound and conservative, and the case it refuses is gated as row 550's expected failure.
6. **`CoerceTie`'s home.** The Subtype Rule settles that equal declared domains make no valid overloading, so its home would be 2. But walk's harness gates only a failure that a program shows:
   - an `XXX` program that walk wrongly loads fails on its call today and would still fail once walk refuses it, so it could never go red;
   - a plain test would assert an invalid program's answer;
   - refusing the set at load changes the verdict of a set walk loads today, which is this rung's stop.

   So the ledger row alone carries it, with the output quoted, for the rung that settles duplicates on both paths.
7. **The cover's bounds:** 10,000 steps and 4,096 combinations. Both are far above the specification's example (under 20 steps, 2 combinations). They bound a search that the addendum requires to terminate with a conservative failure ("Bound recursive search with cycle detection").
8. **Running the interpreter corpus.** I ran `SystemJUTest` over `ProjectFortress/tests/` myself, in two shards of about 8 minutes, not `ant testSystem`. The change reaches every overloaded call with a generic declaration, every overload set's load check and the library's symbolic instantiations. The brief's stops, a verdict changing or a set loaded today refused after, could not be judged without the run.

## 12. What comes back to Pavol

- **The load-time verdicts that moved:** section 8. `O2Z64`'s, `O2Meet`'s, row 478's and row 492's shapes were refused before and load after. None moved the other way.
- **Row 395's tests (item 16's second point).** The rung does not move row 395.
  - `XXXCoercionTupleOverloadRungC` keeps its verdict ("Failed to find any matching overload"). Its listing of the two overloads changed order between my base and edit runs, which the untouched tree already does from run to run (row 430).
  - `XXXCoercionStaticRungC` and `XXXCoercionStaticNarrowRungC` print the same before and after.
  - `XXXCoercionAnyOverloadRungC` is a compiled test this rung cannot reach.
- **`PlainBesideZZ32` and `PlainBesideRet` (item 30):** before, the `Any` declaration and `Marker[Red]`; after, `Marker[ZZ32]` and `Marker[Red]`. Walk now runs the generic declaration for both.
- **Row 492's walk outcome:** repaired. `ComprisesMeetWalk.fss` passes, renamed without the prefix.
- **Row 491's two programs:** `SkBetweenAssign` prints `PASS` before and after. `BetweenTwoClosed` was refused before and prints `f(g) = 3` after, since every value of its `G` there is a `V`.
- **The lone-parameter tests:** `InferLoneBoundWalk` passes before and after. `XXXInferLoneUnboundedWalk` fails before and after at `BoxU[Number]`.
- **For the gather:** the renamed `ComprisesMeetWalk.fss` keeps its message's citation of `Specification/advanced/overloading.tex:282-307`, which rung S's edit may move.

## 13. Stops

None met:
- No test's verdict changed other than by the rung's intent: the corpus is green with this rung's tests as intended, and `ComprisesMeetWalk` is renamed.
- No set walk loads today is refused after, and every set refused today and loaded after is one of the named shapes.
- `SkBetweenAssign` keeps its verdict.
- The only library and test edits are the new tests, the two renames and the rewrite.
- No interpreter change was made for the paper's instance rule.
- Generic inference is unchanged beyond the `AnyType` case: `EvaluatorBase` is not edited, and `bestMatchInternal` hands the chosen declaration to it as before.

## 14. The checker count and the distance

Unchanged and not run. The edit touches only `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` and `ProjectFortress/tests/` (`git diff --name-only 811053f15`), and both stages run the compiler's phase order over the library, which reads neither.

## 15. The ladder and the names

The ladder is the compile path and reads no interpreter evaluator code. The names the rung adds are private Java helpers and new walk components, which no ladder file can name. So no ladder subset was run.

The names the rung adds were grepped in `ProjectFortress/src/com/sun/fortress/` whole: `ownGeneric`, `declaredBelow`, `instanceHolding`, `TypeOnly`, `convertedCall`, `validOnDeclaredDomains`, `genericOverlapCovered`, `overlapCovered`, `overlapCoveredBy`, `overlapPieces`, `staticParamsNamed`, `someBelow`, `moreSpecificDeclaration`, `memoDeclaredBelow`, `stableDomain`, `declaredBelowMemo`, `OVERLAP_STEPS`, `OVERLAP_PARTS`. None is declared elsewhere. The only near-collision is `NonPrimitive.hasRest()`, an instance method of an unrelated class, beside the new static `hasRest(List)`.

The test programs' names were grepped in `Library/` and `ProjectFortress/LibraryBuiltin/`. None is a library declaration; `Round` appears there only in comments.

## 16. Not done

- microGPT's two checks were not run. Probe P4 ran them under the declared-domain choice without a change, but on an older tree and without the converted call's second dispatch.
- The demos were not run.
- This file was refused by the harness's write guard ("Subagents should return findings as text, not write report files"). record.md is on the branch at `explorations/compile-ladder/rung-walk-dispatch/record.md`.
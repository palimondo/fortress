<!-- Probe of climb batch 15, written before the batch's record so that the walk rung on review-queue item 17 is briefed with the answer: how walk keeps P-48 ("A type parameter that a call's arguments do not fix takes its bound, never Bottom") for a big operator's plain-bounded static parameter, which decision D2 of climb batch 9's rung W left at BottomType, without breaking the checked values of the tests that broke when that parameter was given its bound. Every way the library and the language offer is listed, the library's first; each measurable one was built as a shadow of walk's code (a patch beside this file) and run through `ant testSystem` and `ant testSpecData`; the way to brief was then run on rows 645 and 662, on row 703's programs with `body(i: I)` typed, and on microGPT's quick check. Base: main at 11bea64a0, built once as /home/user/fortress-b15walk-base (ant compileAll, the library order, one walk run), every measurement in a worktree seeded from it, both removed afterwards. Facts only; the record's findings are cited, not re-measured, except where a number moved since the rung that took it. No file of the original tree is changed by this commit; no capture or log is committed. -->

# Walk's plain-bounded big-operator parameter: the ways to P-48, measured

## 1. The answer

| way | kind | interpreter tests (604) | spec examples (130) | rows 645 / 646 / 662 | `body(i: I)` (row 703) |
|---|---|---|---|---|---|
| base: `BottomType` (D2) | today | all green | all green | open / open / open | refused |
| 2. the comprehension's collection built from its elements, with the bound | library + walk | 21 red | all green | open / open / open | not measured |
| 4. the declared bound (P-48 as written) | walk | 7 red | 1 red | open / open / open | not measured |
| 5. the open type, as F-143 gives an F-bounded one | walk | all green | all green | open / open / open | runs |
| 6. the desugaring by the elements' type | walk + library | 2 changed, both promotions | all green | open / fixed / fixed | runs |
| 6 + 7. and the call's static return type where walk has one | walk + library | 3 changed, all promotions | all green | fixed / fixed / fixed | runs |

The way to brief is 6 + 7 (`patches/wayDE-elements-expected-body.patch`). It keeps every checked value. A clause form with no element and no declared type takes the bound, as P-48 says. A declared type comes first, as P-48's "constrained by the call's static return type" says. Otherwise the instance is the join of the elements' run-time types, which stands in for the specification's desugaring by the type `N` of the expression. It promotes three expected failures (rows 645, 646 and 662) and lets `__bigOperator` type `body(i: I)` in the same rung. microGPT's quick pair passes 7 of 7 twice.

Its one reading to confirm (section 9, question 1): P-48 rules out "the value's type alone" for a parameter that the arguments do not fix. Way 6 counts a clause form's parameter as fixed by its elements, the run-time stand-in for the type `N` with which the specification's desugaring writes it. Way 5 is the closest alternative. It changes no verdict at all, and `body(i: I)` lands with it too. But its instance is the open type, a kind of `BottomType`, and it leaves rows 645, 646 and 662 and the unwritten `BIG CONCAT` as they are.

## 2. The question and the record

- P-48: the instance of a type parameter that the arguments do not fix is the intersection of its upper bounds, constrained by the call's static return type, never `Bottom`.
- F-141: under walk such a parameter takes its declared bound, with these departures:
  - D2: a big operator's plain-bounded parameters keep `BottomType`, at `EvaluatorBase.java:170`, `boolean bounds = bounded && !bigOperator(appliedThing);`;
  - F-143: an F-bounded parameter stays open.
- F-220 and row 703: because of D2, `__bigOperator`'s local `body(i)` (`Library/FortressLibrary.fss:1314`) cannot be typed `I`.
- Review-queue item 17, PLAN item 53 and rows 645 and 662: giving the bound broke six tests at rung W's base (`compile-ladder/rung-walk-instance/REPORT.md` section 6.1).

The mechanism is as follows:
- The desugarer passes the big operator with only the static arguments that the program writes: `__bigOperator(BIG OP(), fn (r, u) => ...)` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreDisambiguationDesugaringVisitor.java:404-408`).
- `__bigOperator` takes `o.reduction` before any element exists (`FortressLibrary.fss:1312-1316`).
- The library's comprehensions are built by the team's covariant collections (`Library/CovariantCollection.fss:136-146`). The reduction's identity is `Empty[\T\]`, and the result is lifted to `T` by `upward(Empty[\T\], xs)`.
- At `T = BottomType` that lift does nothing, so the result is built at the join of the elements' run-time types. At the bound it is built at the bound.

The specification desugars a clause form with the type of the expression. `<| e | gs |>` of type `List[\E\]` uses `BIG <|[\E\]|>`, and `SUM[gs] e` of type `N` uses `SUM[\N\]` (`Specification/advanced/parallelism-locality/defining-generators.tex`, figure `generatedExpressions`, `:154-197`). So in the specification the desugaring fixes the parameter, and P-48's bound applies to it only where walk lacks that type.

## 3. The ways, the library's own first

1. **Write the static argument** (the library's and the programs' own way; answer 7's rule; the revival box in `Specification/basic/expressions/reductions.tex:38-44`). Under way 4, each of the eight changed sites needs one written argument:
   - in the team's tests: `booleanGuard.fss:18`, `RangePrototype.fss:286`, `MapTest.fss:60`, `CovariantTest.fss:28`;
   - in the revival's tests: `ResultBoundsRungB.fss:48`, `NumberOrderListDeclarations.fss:47`;
   - in the library: `Library/QuickCheck.fss:1128`;
   - in the specification's own example `Generators.GeneratorDefn`.

   A one-line grep counts at least 73 unwritten list comprehensions and 14 other plain-bounded clause forms in `ProjectFortress/demos`, and at least 35 and 5 in `ProjectFortress/tests` (section 11). It is a respelling, not a walk change, and it would rewrite a specification example, against "The specification's examples join the gate at zero red". Not a shadow.
2. **The comprehension's collection built from its elements and not lifted to `T`, with walk giving the bound** (the library's own device, `AnyCovColl` and `APPCOV`, made independent of `T`). In `CovariantCollection.fss`:
   - `CVReduction.join` passes an `AnyEmpty` operand over;
   - `covariantCompr` unwraps a non-empty collection at its own type and an empty one at `Empty[\T\]`;

   together with way 4's line (`patches/wayC1-bound-elements-library.patch`). Measured: 21 tests red. The library can no longer tell an unwritten parameter from a written one, so a written static argument stops lifting. `p8 : List[\ZZ32\] = <|[\ZZ32\] x + y | ...|>` is refused, 'RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]' (`simpleBig.fss:25`, and alike `CovariantTest.fss:21` and `SetTest.fss:37`). `IntMap`'s comprehension stops at `fromCC` (`IntMap.fss:733`).
3. **Lift to `T` only where `T` is not its bound.** Not measured:
   - The comprehension cannot tell a written bound from an inferred one, so `<|[\Any\] k | ...|>` would build at its elements' type.
   - Each operator's bound would have to be named in the library (`(Any, Any)` for `Map`, `(ZZ64, Any)` for `IntMap`).

   Ruled out by reading.
   - 3b. **The bare form over the generator**, `BIG OP g` (`List.fss:180`). It covers only a body that is the bound variable, and the desugarer, not the library, chooses the form. Ruled out by reading.
4. **The declared bound, P-48 as written**: D2 lifted, one line (`patches/wayA-bound.patch`). Measured: 7 interpreter tests and 1 specification example red (section 5).
5. **The open type, as F-143 gives an F-bounded parameter**: a big operator's unfixed plain-bounded parameter becomes `BottomType.OPEN` (`patches/wayB-open.patch`, 11 lines in `instanceOf`). Measured: no verdict changes. The empty list comprehension prints `ArrayList[\OPEN\]` where the base prints `ArrayList[\BOTTOM\]`. `BIG CONCAT` unwritten still stops, 'lift param 1 (r:List[\OPEN\])'. Rows 645, 646 and 662 are unchanged.
6. **The desugaring by the elements' type** (`patches/wayD-elements.patch`), the run-time stand-in for `N`:
   - D2 is lifted.
   - `Evaluator.for_RewriteFnApp` recognises `__bigOperator(BIG OP, clauses)` with no written static argument. It runs the clauses once through a new library reduction (`__ElemsReduction`, in `FortressLibrary.fss` after `__bigOperator`). That reduction collects the elements in order, typed at their join by the same generic inference that `APPCOV` uses.
   - It then evaluates the big operator with that join as a hint. `inferWithCoercionOrFail` unifies the hint with the first static argument of the operator's declared `Comprehension`, `BigReduction` or `BigOperator` result.
   - It then runs `__bigOperator` over the collected elements (`__replayOf`), so each body runs once.
   - With no element there is no hint, and the parameter takes its bound.
   - The per-argument-type instance caches (`OverloadedFunction.java:1414`, `:1430`; `GenericFunctionOrConstructor.java:52`, `:55`) are bypassed while a hint is set. Without that, a nullary big operator reuses its first instance: a nested comprehension printed `ArrayList[\Object\]` before the bypass and `ArrayList[\ArrayList[\Int\]\]` after it.
   - `IntMap`'s `opr BIG {|->[\Val\] }` is declared to return `IntMap[\Val\]` while its body returns a `Comprehension` (`Library/IntMap.fsi:82`, `IntMap.fss:732`). So the patch corrects its declared result, and the api imports `AnyCovColl`. Without it, `IntMap`'s comprehension took the bound, `NodeIM[\Any\]`.
7. **The call's static return type where walk has one**, on top of 6 (`patches/wayDE-elements-expected-body.patch`, which also types `body(i: I)`). Where an unwritten clause form is the whole value of a variable declared with a type (`BuildLetEnvironments.java:80`) or of a function declared with a return type (`FunctionClosure.java:199`), that type is unified first with the operator's result type `O`. It is the second static argument of `Comprehension` and `BigOperator`, the first of `BigReduction`. The elements' join is used only where that fails. Row 510's general repair (`XXXInferExpectedTypeRungK.fss`) does not move under this way.
8. **The specification's desugaring by the static type `N`**: the compiled path's road (row 425). Walk has no static types. Not a walk shadow.
9. **`BottomType`**: today's D2, the base column.

Ways 6 and 7 were built after way 5 had already passed everything, as the brief asks: "Do not take the first that works."

## 4. What was measured

Suites, each one `ant testSystem` and one `ant testSpecData` in the seeded worktree, the way's patch applied, the verdicts compared per test with the base pass (`verdicts.py`):

| way (patch) | `testSystem` | `testSpecData` | verdicts changed |
|---|---|---|---|
| base | 604 run, 0 failures | 130, 0 failures | none |
| 4, bound (`wayA-bound`) | 604 run, 7 failures | 130, 1 failure | `CovariantTest`, `MapTest`, `NumberOrderListDeclarations`, `QuickCheckTest`, `RangePrototype`, `ResultBoundsRungB`, `booleanGuard`; example `Generators.GeneratorDefn` |
| 2, library collections (`wayC1-bound-elements-library`) | 604 run, 21 failures | 130, 0 failures | `ArrayListQuick`, `CovariantTest`, `Generator2Test`, `IntMapCombine`, `IntMapSymdiffManyEntry`, `IntMapSymdiffSingleton`, `IntMapTest`, `IntMapUplusSingleton`, `MapTest`, `PrefixSetIndices`, `PureListQuick`, `ReflectTest`, `ReflectiveQuickCheckTest`, `SetTest`, `StringPieces`, `formatTest`, `importBig`, `parametricListCompr`, `parametricManiaCompr`, `setSum`, `simpleBig` |
| 5, open (`wayB-open`) | 604 run, 0 failures | 130, 0 failures | none |
| 6, elements (`wayD-elements`) | 604 run, 2 failures | 130, 0 failures | `XXXComprehensionTypedBindingWalk`, `XXXUnwrittenSetBigOperatorsWalk`: "Missing expected failure", each printing `PASS` |
| 6 + `body(i: I)` (`wayD-elements-body`) | 604 run, 2 failures | 130, 0 failures | the same two |
| 6 + 7 + `body(i: I)` (`wayDE-elements-expected-body`) | 604 run, 3 failures | 130, 0 failures | the same two and `XXXUnwrittenEmptyFloatSumWalk`, "Missing expected failure" |

Way 5 plus `body(i: I)` (`wayB-open-body`) was run on its probes only: row 703's two programs print `<|0, 2, 4|>` and `{ 0 |-> 0, 1 |-> 1, 2 |-> 2 }`. Way 4 was run on its seven red tests directly (section 5), not on the probes.

The probes (`probes/`, one expression each, run by `run-probes.sh` under walk with an empty private cache each; the value and its `ilkName`, or the first error):

| probe | base | 5, open | 2, library | 6, elements | 6 + 7 |
|---|---|---|---|---|---|
| `PListComp` `<\| 2 k \| k <- 0#3 \|>` | `ArrayList[\Int\]` | same | same | same | same |
| `PListEmpty` (over `0#0`) | `ArrayList[\BOTTOM\]` | `ArrayList[\OPEN\]` | `ArrayList[\Any\]` | `ArrayList[\Any\]` | `ArrayList[\Any\]` |
| `PListTuple` (and `= <\|(1, 11), ...\|>`) | `ArrayList[\(Int,Int)\]`, `true` | same | same | same | same |
| `PListMixed` (0, 1.0, 2 into `List[\Number\]`) | `ArrayList[\Number\]` | same | same | same | same |
| `PListNested` | `ArrayList[\ArrayList[\Int\]\]` | same | same | same | same |
| `PMapComp` (Map) | `NodeMap[\Int,Int\]` | same | same | same | same |
| `PIntMapComp` | `NodeIM[\Int\]` | same | stops at `fromCC` | `NodeIM[\Int\]` | same |
| `PSetComp` | `NodeSet[\Int\]` | same | same | `NodeSet[\ZZ32\]` | same |
| `PBigConcat` `BIG CONCAT[k <- 0#3] <\|[\ZZ32\] k\|>` | stops, 'lift param 1 (r:List[\BOTTOM\])' | stops, 'r:List[\OPEN\]' | stops, 'r:List[\Any\]' | `<\|0, 1, 2\|> : ArrayList[\ZZ32\]` | same |
| `PMapUnion` (Map's `BIG UNION`) | `NodeMap[\ZZ32,ZZ32\]` | same | same | same | same |
| `PSetUnion` (row 662) | stops, 'lift param 1 (r:Set[\OPEN\])' | same | same | `{0,1,2} : NodeSet[\ZZ32\]` | same |
| `PNested2` `BIG CONCAT[ys <- ...] <\| 2 y \| y <- ys \|>` | stops, 'r:List[\BOTTOM\]' | - | - | - | `<\|2, 4, 6\|> : ArrayList[\Int\]` |
| `PEmptyRSum` (row 645) | `0 : Int` | same | same | same | `0.0 : FloatLiteral` |
| `PSumR`, `PBigAnd` | `3.0 : Float`, `true` | same | same | same | same |
| `PListTyped` `xs: List[\ZZ32\] = <\| 2 k \| k <- 0#3 \|>` | refused, 'ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]' | same | same | same | `ArrayList[\ZZ32\]` |
| `PListEmptyTyped` (the same over `0#0`) | refused, 'ArrayList[\BOTTOM\]' | refused, 'ArrayList[\OPEN\]' | refused, 'ArrayList[\Any\]' | refused, 'ArrayList[\Any\]' | `ArrayList[\ZZ32\]` |
| `PListTypedWider` `ys: List[\Number\] = <\| k \| k <- 0#3 \|>` | refused | - | - | - | `ArrayList[\Number\]` |
| `PFnReturn` `evens(n): List[\ZZ32\]` at 3 and 0 | `ArrayList[\Int\]`, `ArrayList[\BOTTOM\]` | - | - | - | `ArrayList[\ZZ32\]`, `ArrayList[\ZZ32\]` |
| `PWrittenNumber` `<\|[\Number\] k \| ...\|>` | `ArrayList[\Number\]` | - | `ArrayList[\Int\]` | - | `ArrayList[\Number\]` |
| `PWrittenTyped`, `PWrittenMap` (written, bound to a typed variable) | run | - | refused | - | run |

## 5. The changed tests, each read against the specification

Under way 4, the declared bound. Each was run directly, from `ProjectFortress/` with an empty private cache (`bin/fortress tests/X.fss`).

| test (author) | under way 4 | its checked value | reading |
|---|---|---|---|
| `ResultBoundsRungB` (the revival's) | 'FAIL: a ArrayList[\Any\]: <\|(1,11), (2,12), (3,13)\|> =/= a ArrayList[\(Int,Int)\]' | a list comprehension equals the aggregate (`:48-49`) | right by the specification (`List[\(ZZ32,ZZ32)\]`); wrong under the way |
| `booleanGuard` (the team's) | 'FAIL: a ArrayList[\Any\]: <\|0, 1, 2, 3, 5, 6, 7\|> =/= a ArrayList[\Int\]' | `<\| x \| x <- a, true \|>` equals `a` (`:18-19`) | right by the specification; wrong under the way |
| `NumberOrderListDeclarations` (the revival's) | 'FAIL: a ArrayList[\Any\]: <\|2, 3, 4\|> =/= a ArrayList[\Int\]' | (`:47`) | right by the specification; wrong under the way |
| `RangePrototype` (the team's) | '... =/= a ArrayList[\StridedFullRange2D\] ...; Uniqueness of equality' | `<\| s \| s <- pairTestRanges, ..., r=s \|>` equals `<\| r \|>` (`:286-287`) | right by the specification; wrong under the way |
| `MapTest` (the team's) | 'check param 1 (db:Map[\String,ZZ32\]) got arg NodeMap[\Any,Any\]' at `:61` | `db3`, a `BIG UNION` of map comprehensions over `String` and `ZZ32`, is a `Map[\String,ZZ32\]` (`:60-61`) | right by the specification; wrong under the way |
| `QuickCheckTest` (the team's) | 'loop param 1 (f:Any->()) got arg FnExpr ... (Any,Any)->BOTTOM' at `Library/QuickCheck.fss:1129` | the library's report of collected data, a list of pairs then a pair pattern (`QuickCheck.fss:1128-1129`) | right by the specification; wrong under the way |
| `CovariantTest` (the team's) | 'RHS expression type ArrayList[\Any\] is not assignable to LHS type List[\Number\]' at `:28` | `samples2 : List[\Number\] = <\| y \| x <- samples, y <- cv2(x) \|>`, `cv2(x): AnyList` | pins walk's run-time join: `AnyList` extends no `Generator` (`Library/List.fsi:55`), so the specification gives the comprehension no type; `BottomType` gives the elements' join |
| example `Generators.GeneratorDefn` | `assert(x, <\|2,4,...,20\|>, ...)` fails | `f() = <\| 2 x \| x <- BlockedRange(1,10,3) \|>` | the specification's own example; wrong under the way |

So seven of the eight checked values are the specification's, and way 4 makes them wrong. `CovariantTest:28` pins `BottomType`'s behaviour.

Under ways 6 and 6 + 7, every changed test is an expected failure whose program now passes. Each asserts the specification's answer, so the way makes them right:

- `XXXUnwrittenSetBigOperatorsWalk` (row 662).
- `XXXComprehensionTypedBindingWalk` (row 646). Under way 6 alone, the F-bound's recheck takes `Int` to `ZZ32`.
- `XXXUnwrittenEmptyFloatSumWalk` (row 645), under 6 + 7, by `emptyRSum`'s declared `RR64`.

No other test changed under 5, 6 or 6 + 7.

## 6. Under the way to brief: rows 645 and 662, row 703, microGPT

Run under 6 + 7 with `body(i: I)` typed at `FortressLibrary.fss:1314`.

`harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/XXXUnwrittenEmptyFloatSumWalk.fss ProjectFortress/tests/XXXUnwrittenSetBigOperatorsWalk.fss ProjectFortress/tests/XXXComprehensionTypedBindingWalk.fss`:

    F. interpret tmp/h1/tests/XXXUnwrittenSetBigOperatorsWalk
     Missing expected failure
    F. interpret tmp/h1/tests/XXXUnwrittenEmptyFloatSumWalk
     Missing expected failure
    Tests run: 3,  Failures: 3,  Errors: 0

Under way 6 alone, row 645 reads 'OK Saw expected exception', with 'FAIL: J5/0:other =/= J4/0:RR64; an empty sum whose expression has type RR64 ...'. No element is given, so only a declared type can direct it.

Row 703's programs (`probes/P703List.fss`, `probes/P703Map.fss`), run with `body(i: I)` typed:
- On the base's walk code they reproduce the row: 'Unification error: Closure/Constructor for body param 1 (i:BOTTOM) got arg 4: ZZ32 of type Int' and '(i:(ZZ64,BOTTOM)) got arg (2,2): (Long,Int)'.
- Under 6 + 7, as under 6 and under 5, they print `<|0, 2, 4|>` and `{ 0 |-> 0, 1 |-> 1, 2 |-> 2 }`.

With the line typed, the suites change nothing beyond the promotions (section 4). So `body(i)` lands in the same rung.

`explorations/coordinator/tools/mg-run.sh <tree>/tmp/mg-E E 1`, under 6 + 7 with the typed line:

    MicroGptAplQuick:  VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS   rc=0
    MicroGptFlatQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS   rc=0

Under 6 with the typed line it read the same. The model writes every static argument of its reductions (`SUM[\ZZ32\]`, `BIG MAX[\RR64\]`).

## 7. What the rung would change

**Files**:
- walk: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`
  - `EvaluatorBase.java`: D2's line; the element hint and the expected-type hint;
  - `Evaluator.java`: `for_RewriteFnApp`;
  - `BuildLetEnvironments.java` and `values/FunctionClosure.java`: the declared type;
  - `values/OverloadedFunction.java` and `values/GenericFunctionOrConstructor.java`: the caches.
- the library:
  - `Library/FortressLibrary.fss`: the `__Elems` collector, `__elemsOf`, `__replayOf`, and `body(i: I)`;
  - `Library/IntMap.fsi` and `Library/IntMap.fss`: the declared result of `BIG {|->}`.

Design points left to the rung:
- The hints are thread-locals. A work-stealing thread could read an expected type set for the same node by another instance of a generic function. Carrying the hint explicitly, or keying the caches by (arguments, hint), avoids that and the cache bypass.
- The collection step keeps every element until the reduction runs: one node more per element for a reduction such as `SUM`.
- It runs for every unwritten clause form, `SUM` and `BIG AND` included. Restricting it is the rung's choice.
- No library generator calls `isLeftZero` or `isRightZero` (`grep -n 'isLeftZero(\|isRightZero(' Library/*.fss` shows only declarations), so no short circuit is lost.
- `__bigOperator2`'s fused path is not routed through the collection step. Its plain-bounded parameters take the bound.

**Tests to write first**, red on the base through the harness:
- `BIG CONCAT[k <- 0#3] <|[\ZZ32\] k|>` is `<|0, 1, 2|>`, and the nested `BIG CONCAT[ys <- <|<|1, 2|>, <|3|>|>] <| 2 y | y <- ys |>` is `<|2, 4, 6|>`. Both stop on the base, 'lift param 1 (r:List[\BOTTOM\])'.
- An empty unwritten list comprehension is an instance of `List[\Any\]`, P-48's bound. It is `ArrayList[\BOTTOM\]` on the base.
- `xs: List[\ZZ32\] = <| 2 k | k <- 0#3 |>`, the same over `0#0`, `ys: List[\Number\] = <| k | k <- 0#3 |>`, and `evens(n): List[\ZZ32\] = <| 2 k | k <- 0#n |>` at 3 and 0. Each is refused on the base, except the last, which is `ArrayList[\Int\]` and `ArrayList[\BOTTOM\]` there.
- A guard that passes on the base: `<| <| j | j <- 0#i |> | i <- 1#2 |>` equals `<|<|0|>, <|0, 1|>|>`. A draft that kept the caches built it as `ArrayList[\Object\]`.

**Expected failures promoted**:
- `ProjectFortress/tests/XXXUnwrittenSetBigOperatorsWalk.fss` (662);
- `XXXComprehensionTypedBindingWalk.fss` (646);
- `XXXUnwrittenEmptyFloatSumWalk.fss` (645, with way 7).

Row 703 has no reproducer. The checker count's error at `body(i)` moves (not measured here).

**Sentences made false** (line numbers at 11bea64a0):
- `Specification/basic/inference.tex:265`: "It does not yet fix a type parameter by the expected type."
- `Specification/basic/inference.tex:362-373`: the open parameter, the empty reduction at `ZZ32`'s identity (row 645), the set reductions stopping (row 662).
- `Specification/basic/inference.tex:374-377`: "It still erases to BottomType the other static parameters of a big operator that a reduction or a comprehension invokes without its static arguments ... (row 424)".
- `Specification/basic/expressions/reductions.tex:30-37`: "Neither implementation directs it by type yet. ... the interpreter leaves that parameter open ... except that an empty one takes the identity of ZZ32 ... (row 645)".
- `Specification/appendices/changes.tex:1068-1074` (Effect of "Reductions whose element type nothing fixes").
- `Specification/appendices/changes.tex:1852-1857` (D2 in "The inference of a call's static arguments").
- `Specification/appendices/changes.tex:1977-1985` (its Effect).

The record's entries made false: F-141 (D2), F-143 (its open rows 645, 646, 662), F-220, and row 424's note. In the `fortress-repo` skill:
- `references/revival-changes.md`, "A type parameter that a call does not fix" (first bullet) and "A type parameter whose bound names itself, under walk";
- `references/library.md`, the `SUM` and `PROD` item;
- `SKILL.md`, "Static parameters".

**`body(i)`**: it lands in the same rung. Under way 5 it would land too.

## 8. Decisions

1. **Which ways get a shadow.** Ways 2, 4, 5, 6 and 6 + 7 were built and run through both suites. Ways 1, 3, 3b and 8 were read, not built:
   - way 1 is a respelling of programs and a specification example;
   - way 3 conflates a written bound with an inferred one;
   - way 3b does not reach clause forms;
   - way 8 needs static types.
2. **Way 2 run through the suites although its probes already failed.** It is the library's own way, and its 21 red tests are the measure of why the library cannot carry the case alone.
3. **Way 7 built on top of 6.** It is P-48's own words, and the only way that reaches row 645, since an empty reduction gives no element. Its contexts are limited to a declared variable and a declared return type. Not taken: an argument's expected type, which is row 510's general repair.
4. **`IntMap`'s declared result corrected inside way 6's patch.** Not taken: reading the operator's `BigOperator` supertype from its value.
5. **The caches bypassed rather than keyed by the hint.** It is the smaller shadow, and its cost is time only.

## 9. Questions for the curator

1. **Does a clause form's parameter count as fixed by its elements under walk?** Way 6 instantiates an unwritten clause form's big operator at the join of its elements' run-time types: the value's type, which P-48 rules out for a parameter the arguments do not fix.
   - The specification's desugaring fixes that parameter with `N`. The record already reads walk's run-time element types as "the interpreter's counterpart of the desugaring by the type N" (`Specification/basic/inference.tex:367-369`, F-143).
   - Alternatives:
     - (a) way 6 + 7, as measured;
     - (b) way 5, the open type: no verdict changes, but rows 645, 646, 662 and the unwritten `BIG CONCAT` stay;
     - (c) way 4, the bound, with the eight sites written, one a specification example.
   - Evidence: sections 4 and 5.
   - No default on record. This probe recommends (a).
2. **Way 7's reach.** Alternatives:
   - (a) a declared variable or return type at an unwritten clause form, as measured;
   - (b) only with row 510's general repair;
   - (c) not at all, leaving row 645 to the compiled path.

## 10. Defects

- `Library/IntMap.fsi:82` and `Library/IntMap.fss:732` declare `opr BIG {|->[\Val\] }: IntMap[\Val\]`, whose body is a `Comprehension`. Walk does not check a declared result, so nothing observes it today. Under ways 4 and 6 it decides the instance (`NodeIM[\Any\]` until corrected). It needs a ledger row, kind `implementation gap (library)`, reproducer `none`. Not written: the brief allows no edit of the record.
- The typed binding of an unwritten list comprehension is refused on the base, 'RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]' (`probes/PListTyped.fss`). It is the list face of rows 646 and 20, so no new row. Way 7 repairs it where the type is declared.

## 11. Commands worked out

- `run-probes.sh <tree> <outdir> [probe ...]` (beside this file): runs `probes/*.fss` under walk with `<tree>`'s `bin/fortress`, each from an empty private caches folder, four at a time.
- `verdicts.py <TEST-RESULTS dir or SpecData report>`: name and verdict per test from the plain JUnit reports; two passes are compared with `diff`. A red test's verdict is empty, since its message is in the report's `Standard Error` section.
- The counts in way 1 (approximate, one line each):

      grep -rhoE '<\|[^\\[|][^|]*\|[^>]*<-' --include=*.fss ProjectFortress/demos | wc -l    # 73; tests 35
      grep -rhoE 'BIG (CONCAT|UNION|UPLUS|SQCAP|SQCUP|BOXPLUS|UNIONCAT|UNIONPLUS|RELATION) *\[[^\\]' --include=*.fss ProjectFortress/demos | wc -l    # 14; tests 5

## 12. For FACTS

- **With a big operator's plain-bounded parameter given its bound under walk (D2 lifted), 7 interpreter tests and 1 specification example go red at 11bea64a0, each at a comprehension built at `Any`.** Seven of the checked values are the specification's. `CovariantTest:28` pins the run-time join. Rung W's six, plus `NumberOrderListDeclarations` and `Generators.GeneratorDefn`. Command: `patches/wayA-bound.patch`, then both suites. Detail: sections 4 and 5.
- **The open type for those parameters changes no verdict and lets `body(i: I)` run**, but leaves rows 645, 646 and 662 and the unwritten `BIG CONCAT`. Command: `patches/wayB-open.patch`.
- **Walk's desugaring of an unwritten clause form by its elements' type, a declared type first and the bound where neither is at hand, changes only rows 645, 646 and 662's expected failures to passing.** Spec examples 130 green, microGPT quick 7/7 twice, and `body(i: I)` lands. Command: `patches/wayDE-elements-expected-body.patch`.
- **The library's covariant comprehensions built at their elements' type, under the bound, turn 21 tests red**, because written static arguments stop lifting. Command: `patches/wayC1-bound-elements-library.patch`.

## 13. How it was measured

- **Base**: main at 11bea64a0. `/home/user/fortress-b15walk-base` was built by `ant compileAll` (1 min 29 s), the library order and a walk run of `BooleanOps.fss`, all exit 0, five jars present, the tree clean. `/home/user/fortress-b15walk` was seeded from it by `seed-worktree.sh`.
- **Each way**: patch applied, `ant compileAll`, `ant testSystem`, `ant testSpecData`, reports copied out, tree restored by `git checkout -- .`. Way 2's patch carries way 4's line.
- **The base pass**: run first, before any edit.
- **The probes**: walk at one thread. The base column used the base build's `bin/fortress` with private caches.
- **No timing is recorded or compared.**
- **Machine**: nproc 4, Intel Xeon @ 2.10 GHz, openjdk 25.0.4.1. Load 0.70 at the start, 13 to 15 during the later suites, while other agents shared the machine.
- **Old code**: row 703's reproduction ran on the base's Java, rebuilt in the seeded worktree, with only `body(i: I)` edited.

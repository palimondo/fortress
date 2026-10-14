# Climb batch 15, rung B (`rung-walk-elements`): walk's big operator by a declared type, its elements or its bound

problem: on the base the checker count's one error was the untyped `body(i)` at `Library/FortressLibrary.fss:1314`. Walk could not type it `I` while D2 kept a big operator's plain-bounded parameter at `BottomType` (F-53, F-220; row 703, `explorations/fortress-gap-ledger.md:562`). Rows 645, 646 and 662 stayed open beside it (`ProjectFortress/tests/XXXUnwrittenEmptyFloatSumWalk.fss:7`, `XXXComprehensionTypedBindingWalk.fss:8`, `XXXUnwrittenSetBigOperatorsWalk.fss:8` on the base)
spec: `Specification/advanced/parallelism-locality/defining-generators.tex:154-197` (figure `generatedExpressions`: a clause form is desugared with the type `N` of the expression); `Specification/basic/inference.tex:99-104` (a type parameter that nothing fixes takes the intersection of its upper bounds and what the expected type requires); `inference.tex:128-133` (the expected type of a variable's or a function's value, also as a block's last expression)
precedent: `Library/CovariantCollection.fss:27-40` (`APPCOV`: a generic join of two typed collections beside an `AnyCovColl` fallback, at the join of their element types); `CovariantCollection.fss:108-112` (`AnySingleton`'s `getter x(): Any`, provided by `Singleton[\T\](x:T)`); `Library/FortressLibrary.fss:1420-1423` (`__resolveBottomArgumentType`: a typecase that casts to a static parameter, else `throw CastError`); `Library/Map.fsi:104` and `Library/PrefixSet.fsi:33` (a comprehension operator declared `Comprehension[\...,AnyCovColl,AnyCovColl\]`, the api importing `AnyCovColl`)
deviation: the replay is a top-level generic function, `__replay[\I,L\]`, called with its static arguments written, not a method, since walk does not infer a generic method's static arguments (row 21) `FortressLibrary.fss:1360`; a second hook, `__bigOperatorElements`, applies the collected elements beside `__bigOperator`, since walk cannot fix a typed replay function's static parameters from an argument that does not mention them `FortressLibrary.fss:1371-1372`; under walk the declared type of the clause form's value, or its elements' run-time join, stands for the specification's static type `N`, by the coordinator's call under P-48 `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:787-804`
historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildLetEnvironments.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FunctionClosure.java`, `Library/FortressLibrary.fss`, `Library/IntMap.fsi`, `Library/IntMap.fss`, `Specification/basic/inference.tex`, `Specification/basic/expressions/reductions.tex`, `Specification/appendices/changes.tex` (each in the team's tree: `git cat-file -e a874948ac:<path>`)

## 1. What changed and why

Under walk, a reduction or a comprehension that writes no static argument is desugared to `__bigOperator(BIG OP, clauses)`. Its big operator is now instantiated as the specification's desugaring by the type `N` would instantiate it, with run-time types in place of the static type that walk does not have. This builds P-48 under the coordinator's call, which took the walk probe's way 6 + 7 (`explorations/perf-probes/walk-plain-bound/REPORT.md` sections 1, 3 and 7):

1. **By a declared type** (way 7, P-48's "constrained by the call's static return type"). The clause form may be the value of a local variable declared with a type, or of a function declared with a return type, also as a block's last expression and after local declarations. That type is unified with the result type `O` of the big operator's declared `BigReduction`, `Comprehension` or `BigOperator`. If it fixes the instance, the clauses run as written.
2. **Otherwise by the elements** (way 6).
   - The clauses run once into the library's collector (`__elemsOf`). It keeps the elements in order, typed at the join of their run-time types, as `APPCOV` joins a covariant collection.
   - The big operator is instantiated with that join unified with its element type `I`.
   - The reduction then runs over the collected elements (`__bigOperatorElements`), so each body runs once.
3. **Otherwise at the bound.** With no element and no declared type, D2 is lifted: a plain-bounded static parameter takes its bound (P-48), and an F-bounded one stays open (F-143).

A hint that does not fit falls back to the instance that no hint gives, and so does an instance under it that does not admit its arguments.

The code:
- `EvaluatorBase.java`:
  - D2's line is gone from `instanceOf` (`:324`, `bounded` alone).
  - `BigOperatorHint` (`:161-200`) carries the operator value, the elements' join and the declared type.
  - `instantiateBigOperator` (`:230-256`) chooses and instantiates the operator under the hint, outside the per-argument caches, and applies the instance.
  - The hint reaches `inferWithCoercionOrFail` as an argument (`:83-91`, `:607-640`). For an overloaded operator it crosses `OverloadedFunction.bestMatch` in the thread-local `choosing` (`:206`), which is set only around that call. There it is read only for an overload of the operator it names (`:69-75`, `BigOperatorHint.covers`).
  - `resultArgOf` (`:277-292`) reads `I` or `O` off the declared result.
- `Evaluator.java`:
  - `unwrittenBigOperator` (`:698-710`) and `unwrittenAtTail` (`:716-736`);
  - `evalAt` (`:744-776`), which carries a declared type along the tail of an evaluation;
  - `bigOperatorByElements` (`:787-804`);
  - `for_RewriteFnApp` (`:806-809`) routes the unwritten clause form; the team's body stays as `applyRewriteFnApp` (`:811-824`).
- `BuildLetEnvironments.java:35-48`, `:80`, `:92-99`, `:140`: `evalAt` evaluates a typed local variable's right-hand side. It also evaluates the body of a local declaration that ends a block with a declared type.
- `values/FunctionClosure.java:199-205`: a function declared with a return type evaluates its body by `evalAt` where an unwritten clause form is its tail.
- `Library/FortressLibrary.fss:1314`: `body(i: I): L`. `:1318-1373`: the collector (section 5.4).
- `Library/IntMap.fsi:13`, `:83` and `Library/IntMap.fss:732`: `opr BIG {|->[\Val\] }` is declared `Comprehension[\(ZZ64,Val),IntMap[\Val\],AnyCovColl,AnyCovColl\]`, as `Map`'s is, and the api imports `CovariantCollection.{AnyCovColl}` as `PrefixSet`'s does (row NEW-B-1).
- `Specification/basic/inference.tex:265-269`, `:371-395`; `Specification/basic/expressions/reductions.tex:30-42`; `Specification/appendices/changes.tex` (section 8).

Not taken from the patch: its two `ThreadLocal` hints, its node-keyed `expectedFor`, and its bypass of the per-argument caches (`OverloadedFunction.java:1414`, `:1430`; `GenericFunctionOrConstructor.java:52`, `:55`). `OverloadedFunction.java` and `GenericFunctionOrConstructor.java` are unchanged (decision 1).

## 2. The tests: their failing runs and the passing run

New tests, in `ProjectFortress/tests/`:
- `UnwrittenListMapComprehensionWalk` (row 703): `<| 2 k | k <- 0#3 |>` is `<|0, 2, 4|>`; `{ widen(k) |-> k | k <- 0#3 }` has 3 entries and maps 2 to 2.
- `UnwrittenComprehensionElementsWalk` (way 6):
  - `BIG CONCAT[k <- 0#3] <|[\ZZ32\] k|>` is `<|[\ZZ32\] 0, 1, 2|>`;
  - `BIG CONCAT[ys <- <|<|1, 2|>, <|3|>|>] <| 2 y | y <- ys |>` is `<|2, 4, 6|>`;
  - `<| 2 k | k <- 0#0 |>` is a `List[\Any\]`.
- `UnwrittenComprehensionDeclaredTypeWalk` (way 7):
  - `xs: List[\ZZ32\] = <| 2 k | k <- 0#3 |>`, and the same over `0#0`;
  - `ys: List[\Number\] = <| k | k <- 0#3 |>`;
  - `evens(n): List[\ZZ32\] = <| 2 k | k <- 0#n |>` at 3 and at 0;
  - `evensAfter(n)`, whose comprehension follows a local declaration.
- `NestedListComprehensionWalk` (a guard): `<| <| j | j <- 0#i |> | i <- 1#2 |>` equals `<|<|0|>, <|0, 1|>|>`.
- `IntMapComprehensionTypedWalk` (row NEW-B-1): `m: IntMap[\ZZ32\] = { widen(k) |-> 10 k | k <- 0#3 }` has 3 entries and maps 2 to 20.

Promoted, each renamed before the code was edited (`git mv`, and the `component` line changed):
- `XXXComprehensionTypedBindingWalk` to `ComprehensionTypedBindingWalk` (row 646);
- `XXXUnwrittenSetBigOperatorsWalk` to `UnwrittenSetBigOperatorsWalk` (row 662);
- `XXXUnwrittenEmptyFloatSumWalk` to `UnwrittenEmptyFloatSumWalk` (row 645).

New expected failures (section 11): `XXXUnwrittenEmptyFloatSumUntypedWalk` (row NEW-B-2) and `XXXNestedComprehensionDeclaredTypeWalk` (row NEW-B-3).

**The failing runs, on the base's code**, before the edit was first built. The build started at 11:11, and its log reads `BUILD SUCCESSFUL`, `Total time: 1 minute 10 seconds`.

`explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-elements/h-base` with the eight files, at 2026-10-14T10:57:25Z, on the unedited worktree (tree `ee1aa1a95`):

    RHS expression type NodeSet[\Int\] is not assignable to LHS type Set[\ZZ32\]                       (ComprehensionTypedBindingWalk)
    RHS expression type NodeIM[\Int\] is not assignable to LHS type IntMap[\ZZ32\]                     (IntMapComprehensionTypedWalk)
    Unification error: Closure/Constructor for lift param 1 (r:List[\BOTTOM\]) got arg ArrayList[\ZZ32\] of type ArrayList[\ZZ32\]   (UnwrittenComprehensionElementsWalk)
    FAIL: J5/0:other =/= J4/0:RR64; an empty sum whose expression has type RR64 ...                     (UnwrittenEmptyFloatSumWalk)
    Unification error: Closure/Constructor for lift param 1 (r:Set[\OPEN\]) got arg NodeSet[\ZZ32\] ...   (UnwrittenSetBigOperatorsWalk)
    RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]                    (UnwrittenComprehensionDeclaredTypeWalk)
    Tests run: 8,  Failures: 6,  Errors: 0

`UnwrittenListMapComprehensionWalk` and `NestedListComprehensionWalk` read `OK` there, as the brief expects. The first's defect shows only with the line typed; the second is a guard.

Row 703 on the base's walk with only `body(i: I)` typed at `FortressLibrary.fss:1314`, the same command, at 10:58:03Z:

    . interpret tmp/rung-walk-elements/h-703/tests/UnwrittenListMapComprehensionWalk
    Unification error: Closure/Constructor for body param 1 (i:BOTTOM) got arg 4: ZZ32 of type Int
    Tests run: 1,  Failures: 1,  Errors: 0

`UnwrittenComprehensionDeclaredTypeWalk` gained `evensAfter` after that run, so it ran again on the old code. `FORTRESS_HOME=/home/user/fortress-base15 /home/user/fortress-base15/explorations/compile-ladder/rung-inference-walk/harness-one.sh .../h-old-decl .../UnwrittenComprehensionDeclaredTypeWalk.fss` at 11:11:37Z (tree `ee1aa1a95`, the base build) printed:

    RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]
    Tests run: 1,  Failures: 1,  Errors: 0

`evensAfter(2)` alone on the old code (`old-fortress.sh`) printed `<|0, 2, 4|> : ArrayList[\Int\]`.

`IntMapComprehensionTypedWalk`, with the walk change built and `IntMap`'s line as it was, `harness-one.sh .../h-new1` at 11:12:40Z:

    RHS expression type NodeIM[\Any\] is not assignable to LHS type IntMap[\ZZ32\]
    Tests run: 12,  Failures: 1,  Errors: 0

The brief expected this test green on the base. It is red there too, at the binding (`NodeIM[\Int\]`), which is the map face of rows 646 and 20.

**The passing runs**, after the last change of code (`IntMap`'s line, 11:13). `harness-one.sh .../h-new2` at 11:13:32Z ran:
- the eight files;
- `UnwrittenReductionWalk`, `UnwrittenBigOperatorsWalk`, `UnwrittenBigMinMaxWalk` and `UnwrittenTupleMinMaxWalk`;
- the five `IntMap*` tests;
- the seven tests that the bound alone turned red in the probe: `ResultBoundsRungB`, `booleanGuard`, `NumberOrderListDeclarations`, `RangePrototype`, `MapTest`, `QuickCheckTest` and `CovariantTest`;
- `XXXInferExpectedTypeRungK`.

It printed:

    . interpret tmp/rung-walk-elements/h-new2/tests/XXXInferExpectedTypeRungK
     OK Saw expected exception
    OK (25 tests)

`ant testSystem` at 11:26, which holds every file above, passed as well (section 6).

The expected failures, `harness-one.sh .../h-xxx` at 11:23:29Z: `OK Saw expected exception` for each, `OK (2 tests)`. The first was then run with `SUM[\RR64\][j <- 0#0]` written for one run, and restored after (`.../h-xxx-fixed`, 11:23:48Z): ` Missing expected failure`, `Tests run: 1,  Failures: 1,  Errors: 0`.

## 3. Where the fix belongs, and the precedent search

- Walk instantiates a generic call in `EvaluatorBase.inferAndInstantiateGenericFunction` (`references/interpreter.md`, "How walk evaluates a program"). `Evaluator.for_RewriteFnApp` evaluates the desugared call. Both paths share the desugaring (`PreDisambiguationDesugaringVisitor.java:404-408`), so the change is walk's (`explorations/coordinator/map/spec-to-implementation.md:256`).
- The library joins elements at their element types with its covariant collection. `CVReduction[\T\].join` is `a APPCOV b`, and `APPCOV[\T, A extends T, B extends T\]` stands beside `APPCOV(a: AnyCovColl, b: AnyCovColl)` (`Library/CovariantCollection.fss:27-40`, `:136-142`). The collector follows it. The reductions beside `__bigOperator` give the collector's types (`Library/FortressLibrary.fsi:1867-1947`).
- `IntMap`'s declaration follows `Map`'s (`Library/Map.fsi:104`). Counted over every api of `Library/` outside the compiler's library, no other nullary big operator declares a result other than `BigReduction`, `Comprehension` or `BigOperator`. `IntMap`'s own `BIG CUP` and `BIG UPLUS` are already `Comprehension`s (`IntMap.fsi:87`, `:91`).
- Typing `body(i)` follows F-42. It was the only untyped local parameter left in `FortressLibrary.fss`, the count's one error (F-53).

## 4. What the specification settles

- The value of every clause form tested. The comprehensions chapter (`Specification/basic/expressions/comprehensions.tex`, "Comprehensions") and the reductions chapter (`reductions.tex`, "Summations and Other Reduction Expressions") give them, with the desugaring by the type `N` (`defining-generators.tex:154-197`).
- The specification gives `<| 2 k | k <- 0#0 |>` the type `List[\ZZ32\]`. Walk has no static type and no element there, so it gives the bound, `List[\Any\]` (P-48), and the test pins walk's answer, as the brief asks.
- A declared type is the expected type of a variable's or a function's value, also as the last expression of a block "whether or not local declarations precede it" (`inference.tex:128-133`).
- The normative text is unchanged; only the revival's boxes and two Appendix I entries change (section 8).

## 5. The design

### 5.1 The hint (decision 1)

- `bigOperatorByElements` makes a `BigOperatorHint` for one operator value, holding the elements' join and the declared type. It hands the hint to `instantiateBigOperator`, which calls the instantiation itself:
  - for a generic function, `inferAndInstantiateGenericFunction(none, g, g.getWithin(), h)`, with the hint as an argument;
  - for an overloaded one, `of.bestMatch(none, of.getOverloads())`, with the hint in `choosing` around that call alone.

  It then applies the instance, the operator's body, by `inst.functionInvocation(none, site)`, with no hint in reach.
- **Why no other task can read the hint.** By reading the code:
  - `choosing` is set only while `bestMatch` runs on the current thread.
  - `bestMatch` and what it calls (`bestMatchInternal`, `inferByUnification`, `inferAndInstantiateGenericFunction`, `bestMatchWithCoercion` and `convertedCall`; `OverloadedFunction.java:1441-1614`) unify types, evaluate declared types and build instances. They evaluate no Fortress expression, and start and join no `TupleTask`.
  - A thread runs other tasks only while it joins, inside `TupleTask.invokeAll` or a join (`Evaluator.evalExprListParallel`, `Evaluator.java:337-353`). So no task runs on that thread while `choosing` is set.
  - Even so, `inferAndInstantiateGenericFunction` reads `choosing` only for an overload of the operator that the hint names (`BigOperatorHint.covers`).
  - The operator's body runs after `choosing` is restored, and the collection of the elements runs before any hint exists.
- **The caches.** A hinted call neither reads nor writes the per-argument-type caches of `OverloadedFunction` and `GenericFunctionOrConstructor`, since `instantiateBigOperator` does not go through `applyInnerPossiblyGeneric`, where they live.
  - For an unhinted nullary call, they keep the instance that no hint gives, the same each time.
  - The guard `NestedListComprehensionWalk` is green (section 2). Its inner comprehension's nullary operator is instantiated at two element types in one run. The probe's draft that kept the caches built it as `ArrayList[\Object\]`.
- **The declared type** travels as an argument too. `evalAt(e, expected)` evaluates `e`'s tail through a `do` block of one plain part, a block's last expression and a local declaration's body (`BuildLetEnvironments.tailExpected`).
  - It reaches `bigOperatorByElements` only at the tail node, so no other node and no other instance sees it.
  - The patch's `expectedFor` was a thread-local, set over the whole right-hand side, while the clauses fork and join tasks.

### 5.2 The reach of the collection step (decision 4)

- The step runs for every unwritten clause form whose big operator value has static parameters, `SUM`, `BIG MAX` and `BIG AND[\T\]` among them (`EvaluatorBase.instantiable`: a generic function, or an overloaded one with a generic overload).
- It does not run where a declared type fixes the instance first. It does not run for an operator without static parameters (`BIG ||`, `BIG LEXICO`), which runs as written.
- It must reach `Set`'s F-bounded `BIG UNION` and `BIG INTERSECTION` (row 662), whose open instance fails. It also reaches `SUM`, whose open instance runs. The declaration does not cheaply show which open instances fail, so the step is not restricted further.
- It keeps every element until the reduction runs: one `__ElemsOne` and one `__ElemsTwo` for each element. These ran at one thread and at four, the second at `-Xmx768m -Xss32m` (`tmp/rung-walk-elements/edge/EBigList.fss`):
  - a 20,000-element `SUM` over a range;
  - a list comprehension over a 20,000-element list;
  - a `SUM` over `seq` of that list.

  Each printed its value, `199990000 : Int`, `20000 : Int ArrayList[\Int\]` and `199990000 : Int`, with `rc=0`.
- No library generator calls `isLeftZero` or `isRightZero`, so no short circuit is lost (the probe's section 7).
- The interpreter suite took 3 min 30 s here (611 tests). Batch 14's gate took 4 min 6 s (604 tests; `explorations/compile-ladder/climb-batch-14/gate/summary.txt`, "# testSystem: Total time: 4 minutes 6 seconds"). The machine was shared with three other rungs: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, load 3.23 at the start, openjdk 25.0.4.1. The two timings are not like for like.

### 5.3 The contexts of way 7 (decision 3)

Reached:
- a local variable declared with a type (`BuildLetEnvironments.java:92-99`);
- a function declared with a return type (`values/FunctionClosure.java:199-205`).

Each is reached through a `do` block of one part, a block's last expression, and the body of a local declaration that ends the block (`Evaluator.unwrittenAtTail`).

Not reached, each with its reason:
- a method's declared return type: `MethodClosure.applyMethod` evaluates method bodies (`values/MethodClosure.java:66-90`), a file outside the section's;
- a top-level variable: `BuildTopLevelEnvironments` initialises it, outside the section's files;
- a field;
- an assignment to a declared variable;
- a function expression's declared return type, since its `def` is not a `FnDecl`;
- an `if` or `typecase` branch;
- an argument of a call: row 510's general repair, and row 705's;
- the body of another clause form (row NEW-B-3).

### 5.4 The library additions (decision 2), `Library/FortressLibrary.fss:1318-1373`

Each is in the component and not in its api, by the coordinator's call 5. Each is named as the hooks that the implementation calls by name are.

| declaration | types | precedent |
|---|---|---|
| `trait __ElemsAny end`, `object __ElemsNone extends __ElemsAny end` | none | `AnyCovColl`, `AnyEmpty` (`CovariantCollection.fss:71`, `:94`) |
| `trait __AnyElemsOne extends __ElemsAny getter v(): Any end`, `trait __AnyElemsTwo extends __ElemsAny getter a(): __ElemsAny getter b(): __ElemsAny end` | the non-generic faces that a typecase can name | `AnySingleton`, `AnyAppend` (`:108-110`, `:118-121`) |
| `trait __Elems[\T\] extends __ElemsAny end`; `object __ElemsOne[\T\](v: T) extends { __AnyElemsOne, __Elems[\T\] } end`; `object __ElemsTwo[\T\](a: __ElemsAny, b: __ElemsAny) extends { __AnyElemsTwo, __Elems[\T\] } end` | `T` is the elements' join, which walk reads off the value (`EvaluatorBase.elementsType`) | `CovariantCollection[\T\]`, `Singleton[\T\](x:T)` (`:112`), `Append` (`:123`) |
| `__elemsJoin[\T, A extends T, B extends T\](a: __Elems[\A\], b: __Elems[\B\]): __Elems[\T\]` beside `__elemsJoin(a: __ElemsAny, b: __ElemsAny): __ElemsAny` | statically the second applies; walk's dispatch takes the first when both arguments are `__Elems`, at their join (D3) | `opr APPCOV` (`:27-40`) |
| `object __ElemsReduction extends MonoidReduction[\__ElemsAny\]`, with `empty(): __ElemsAny` and `join(a: __ElemsAny, b: __ElemsAny): __ElemsAny = __elemsJoin(a, b)` | | `CVReduction` (`:136-140`) |
| `__elemsOne(x: Any): __ElemsAny = __ElemsOne(x)` | | `CVSingleton(a:Any): AnyCovColl = Singleton(a)` (`:142`) |
| `__elemsOf(desugaredClauses: (Reduction[\__ElemsAny\], Any->__ElemsAny)->__ElemsAny): __ElemsAny` | the clauses at the collector | `__bigOperator`'s `desugaredClauses` (`FortressLibrary.fss:1312`) |
| `__replay[\I,L\](e: __ElemsAny, r: Reduction[\L\], u: I->L): L` | a typecase through the two faces; an element is cast to `I`, else `throw CastError` | `__resolveBottomArgumentType` (`FortressLibrary.fss:1420-1423`) |
| `__bigOperatorElements[\I,O,R,L\](o: BigOperator[\I,O,R,L\], e: __ElemsAny): O = __bigOperator[\I,O,R,L\](o, fn (r: Reduction[\L\], u: I->L): L => __replay[\I,L\](e, r, u))` | `o` fixes all four | `__bigOperatorSugar` (`FortressLibrary.fss:1308-1309`) |

The patch's declarations at `Any` are gone: `r.empty()`, `u(v)` and `desugaredClauses(...)` on `Any`, and `__replayOf`'s untyped `fn (r, u) => e.__replay(r, u)`. Walk's values are unchanged, as the suites and section 7 show. The distance stage checks every declaration above and finds no error in them (section 6).

`__elemsJoin`'s fallback also takes the case where walk's dispatch passes over the generic declaration, because its arguments have several minimal common supertypes (row 589). The fallback builds `__ElemsTwo[\Any\]`, so such elements take `Any`. `<| (if k = 0 then 1 else 2.5 end) | k <- 0#2 |>` stays `ArrayList[\Number\]`, as on the base, since the comprehension's own lift decides it (section 7).

### 5.5 `__bigOperator2` (decision 5)

It stands, and no clause form reaches it:
- `DesugarerUtil.nestedGeneratorOpportunity` returns `null` for every input (`ProjectFortress/src/com/sun/fortress/nodes_util/DesugarerUtil.java:279`, `if (gs==0 || gs != 0) return null;`, the team's `5a68404fd` of 2012-07-19).
- So neither desugarer emits `__bigOperator2`, and the `BIGOP2_NAME` branch is dead (`PreDisambiguationDesugaringVisitor.java:409-430` and its sibling in `PreTypeCheckDesugaringVisitor`).
- Only a program that calls it with its static arguments written reaches it (`ProjectFortress/tests/GeneratorDeclarations.fss:14`).
- The nested `BIG CONCAT[ys <- ...] <| 2 y | y <- ys |>` goes through `__bigOperator`: its failure under a declared type reads `body param 1` (section 7).

## 6. Suites, the count, the distance and the ladder

- `ant testSystem`, from the worktree at `81fde35ea` (`tmp/rung-walk-elements/testSystem.txt`): four shards, `Tests run: 149, Failures: 0`, `150`, `157` and `155`, so 611 tests and 0 failures; `BUILD SUCCESSFUL`, `Total time: 3 minutes 30 seconds`. Batch 14's gate had 604. The five new tests and two expected failures make the difference, and the three promotions keep their count.
- `ant testSpecData`: `Tests run: 130, Failures: 0, Errors: 0`; `BUILD SUCCESSFUL`, `Total time: 58 seconds`.
- microGPT's quick pair, `explorations/coordinator/tools/mg-run.sh tmp/rung-walk-elements/mg B 1`:
  - `MicroGptAplQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0`;
  - `MicroGptFlatQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS`, `rc=0`.

**The checker count**: `explorations/coordinator/tools/checker-count/run.sh tmp/rung-walk-elements/checker-count-postedit.txt tmp/rung-walk-elements/cc-post`.
- It started at 11:33:31, and its last output came at 11:41:44: 493 s, against the 900 s limit and the 690 s line. The load was 8.03 at its end, with three other rungs running.
- Its table against batch 14's, `diff explorations/compile-ladder/climb-batch-14/gate/checker-count.txt tmp/rung-walk-elements/checker-count-postedit.txt`:

      15c15
      < #locations	1
      ---
      > #locations	0

- `#total` is 1 before and after, and every api row is 0. The one error is now row 680's crash in `Array3`, as F-53 predicted. The run's last lines:

      @@PROBE checkComponent FortressLibrary
      ** bug! TryChecker returned an untyped expr: FnExpr at /home/user/fortress-elements/Library/FortressLibrary.fss:2978.13
      Expected type was: ZZ32->Any
      File FortressLibrary.fss has 1 error.

- `:2978` is the base's `:2922`, with the collector's 56 lines above it. The crash has no location row, so `#locations` reads 0.
- `body(i: I)` landed.

**The distance**: `explorations/coordinator/tools/distance/run.sh tmp/rung-walk-elements/distance-postedit.txt tmp/rung-walk-elements/dist-post`.
- It ran from 11:42:03, `#seconds 1792  FortressLibrary 998`, against batch 14's 1714 and 954, with load 7.55 at its start.
- `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-14/gate/distance.txt tmp/rung-walk-elements/distance-postedit.txt`:

      DISTANCE SAME   54
          crash gone   decl	TraitDecl FortressLibrary.fss:2886:1-2999:2	InterpreterBug	** bug! TryChecker returned an untyped expr: FnExpr at FortressLibrary.fss:2922.13 ...
          crash gone   decl	FnDecl FortressLibrary.fss:1312:1-1316:4	TypeError	FortressLibrary.fss:1314:10: Missing parameter type for i
          crash new    decl	TraitDecl FortressLibrary.fss:2942:1-3055:2	InterpreterBug	** bug! TryChecker returned an untyped expr: FnExpr at FortressLibrary.fss:2978.13 ...

- No `#kind` or `#class` row moved. The `Array3` crash is the same declaration, 56 lines lower, and `__bigOperator`'s crash is gone.
- Read by row and line (row 577), with every `FortressLibrary.fss` line at or after `:1374` mapped back by 56, each of the 54 sites of `tmp/rung-walk-elements/dist-post/errors.tsv` matches the per-site list `explorations/compile-ladder/gate/distance-sites.tsv` in kind, family, location and message. A one-pass Python comparison of the two files found 0 rows that differ in either direction.
- So `__bigOperator`'s body and the collector bring no site. The stage is tolerant, checks every declaration, and finds no error in them.

**The ladder subset**: `IntMapTest.fss`, the one file whose recorded first error in the baseline names something that the change touched ("Comprehension is undefined.", from `IntMap.fsi`).
- The gate's drivers were copied to `tmp/rung-walk-elements/ladder/` (`run-subset.sh` and `classify.py`, with `OUT` and `LADDER_ROOT` there).
- It is compared with `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`, which holds the file's row; the newest landed `ladder.tsv`, batch 14's, does not:

      before: tests	IntMapTest.fss		disambiguate	2	Comprehension	...	Comprehension is undefined.
      after:  tests	IntMapTest.fss		disambiguate	2	ImmutableArray	...	ImmutableArray is undefined.

- The phase is the same. The first error now comes from `CovariantCollection.fsi:23`, which the new import at `IntMap.fsi:13` brings in first, and `Indexed` joins the imported missing names. The compiled path's prelude has neither name, as before.

## 7. Old against new

Each program is under `tmp/rung-walk-elements/edge/`, run under walk by `tmp/rung-walk-elements/run-edge.sh new|old`. The new code ran from this tree with a private caches folder; the old ran through `old-fortress.sh` on `/home/user/fortress-base15`. Each prints the value and its `ilkName`, or its first error:

| program | old | new |
|---|---|---|
| `ELocalTypedDo` (`xs: List[\ZZ32\] = do n = 3; <\| k \| k <- 0#n \|> end`) | refused, 'RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\ZZ32\]' | `<\|0, 1, 2\|> : ArrayList[\ZZ32\]` |
| `EMapComp` (`Map`'s comprehension untyped, then `t: Map[\ZZ32,ZZ32\]`) | `NodeMap[\Int,Int\]`, then refused | `NodeMap[\Int,Int\]`, then `NodeMap[\ZZ32,ZZ32\]` |
| `ESetComp` (`{ n^2 \| n <- -2:2 }`; an empty `BIG UNION`) | `NodeSet[\Int\]`; `EmptySet[\OPEN\]` | `NodeSet[\ZZ32\]`; `EmptySet[\OPEN\]` |
| `ENestedFused` (the nested `BIG CONCAT`) | stops, 'lift param 1 (r:List[\BOTTOM\])' | `<\|2, 4, 6\|> : ArrayList[\Int\]` |
| `ENestedFusedTyped` (the same, bound to `List[\ZZ32\]`) | stops, 'lift param 1 (r:List[\BOTTOM\])' | stops, 'body param 1 (i:List[\ZZ32\]) got arg ArrayList[\Int\]' (row NEW-B-3) |
| `EDeclaredMismatch` (`xs: List[\String\] = <\| k \| k <- 0#3 \|>`, ill-typed) | refused, 'RHS expression type ArrayList[\Int\] is not assignable to LHS type List[\String\]' | refused, 'Unification error: Closure/Constructor for body param 1 (i:String) got arg 2: ZZ32 of type Int' |
| `ESqCupCap` (`BIG SQCUP[k <- 0#1] Just(k)`, `BIG SQCAP[k <- 0#2] Just(7)`) | stops, 'lift param 1 (r:UniqueItem[\BOTTOM\])' | `Just(0) : Just[\Int\]`, `Just(7) : Just[\Int\]` |
| `EArgPosition` (`f(<\| k \| k <- 0#3 \|>)` with `f(xs: List[\ZZ32\])`), `EDeclaredGen` (`xs: Generator[\ZZ32\] = ...`) | refused | refused, with the same messages |
| `EListMixed`, `EListFilter`, `EListTuple`, `EListTwoGens`, `EListStrings`, `EObjects`, `EGenericFn` | `ArrayList[\Number\]`, `[\Int\]`, `[\(Int,Int)\]`, `[\Int\]`, `[\FlatString\]`, `[\Fruit\]`, `[\Int\]` and `[\FlatString\]` | the same |
| `ESumMixed`, `ESumFloat`, `ESumEmptyUntyped`, `ESumBig`, `EMaxAnd`, `EMinEmpty` | `3.5 : Float`, `1.5 : Float`, `0 : Int`, `199990000 : Int`, `2`, `true`, `012`, `EmptyReduction` | the same |

The probe measured seven tests that the bound alone turns red, and the specification example `Generators.GeneratorDefn`. They are not run again as programs here: each is in the suites above, green.

## 8. Sentences of the specification made false, and their corrections

Corrected here. Each is a revival box or an Appendix I sentence; the normative text is unchanged.
- `Specification/basic/inference.tex:265` on the base: "It does not yet fix a type parameter by the expected type." Now `:265-269`.
- `inference.tex:367-380` on the base, now `:371-395`:
  - the open parameter's reduction: "an empty such reduction takes the identity of \EXP{\mathbb{Z}32} ... (row~645 ...), and the library's set reductions ... stop at their first element (row~662)";
  - "It still erases to \TYP{BottomType} the other static parameters of a big operator that a reduction or a comprehension invokes without its static arguments ... (row~424 ...)".
- `Specification/basic/expressions/reductions.tex:30-37` on the base, now `:30-42`: "Neither implementation directs it by type yet. ... the interpreter leaves that parameter open ..., except that an empty one takes the identity of \EXP{\mathbb{Z}32} ... (row~645 ...)". The checker's sentences beside it (`:38-44` on the base, row 425) stay.
- `Specification/appendices/changes.tex`, "Reductions whose element type nothing fixes":
  - the Change gains the revision of 14 October 2026 (`:1033-1045`);
  - the Rationale gains its decision, what it replaced and its way back (`:1066-1092`); the way back of the 9 October revision (`:1048-1052` on the base) stands, and the new way back is stated beside it;
  - the Effect at `:1068-1074` on the base is rewritten (`:1108-1125`).
- `changes.tex`, "The inference of a call's static arguments":
  - the Change gains the revision (`:1846-1864`);
  - "it has no static return type to add to the bound" gains its exception, and "four kinds by decision" becomes three (`:1904-1911`);
  - D2's paragraph (`:1852-1857` on the base) is put in the past, with the decision that replaces it (`:1924-1943`);
  - the Effect at `:1977-1985` on the base is rewritten (`:2063-2082`).
- The placeholders stand where the new rows' numbers go:
  - `NEW-B-2` at `inference.tex:385`, `reductions.tex:41`, `changes.tex:1121` and `:2080`;
  - `NEW-B-3` at `inference.tex:389`, `changes.tex:1124` and `:2082`.
- `cd Specification/fortress && ./ant genSource && ./ant tex`: both `BUILD SUCCESSFUL`. The log's 41 matches of `grep 'Reference .* undefined\|multiply defined\|Undefined control sequence'` are each the line `x@warning {Reference `#1' on page \thepage \space undefined}}{}`, a macro's text that the log echoes. The log has no `LaTeX Warning: Reference` line and no `! Undefined` line. The citation of `NEW-B-3` was added after that build, plain text in two sentences.

Made false and not corrected here, for the gather and the skill writer:
- FACTS: F-141 (its D2 departure), F-143 (its open rows 645, 646 and 662), F-220 (that `body` cannot be typed `I`), and F-53 (the count's error at `body(i)`). Their record lines are in `record.md`.
- The skill:
  - `SKILL.md:126`, "Static parameters": "Under walk, one whose bound names the parameter itself, such as `SUM`'s, stays open".
  - `references/revival-changes.md:108-109`: "Walk still gives `Bottom` to these: a big operator's static parameters with a plain bound (ledger row 424)".
  - `references/revival-changes.md:124`, "A type parameter whose bound names itself, under walk": "An empty reduction gives `ZZ32`'s identity, whatever the type of its elements (ledger row 645). ... So `Set`'s `BIG UNION` and `BIG INTERSECTION` still stop at their first element ... (ledger row 662)", and its Reason.
  - `references/revival-changes.md:219`: "With a plain bound, it still gives `Bottom`, so `BIG SQCAP`, `BIG SQCUP` and `List`'s `BIG CONCAT` without static arguments stop at their first element (ledger row 424)".
  - `references/library.md:25`: "Walk runs such a call, but an empty one gives `ZZ32`'s identity (ledger row 645), and `Set`'s `BIG UNION` and `BIG INTERSECTION` stop (ledger row 662)".

  Each is revival-change material in `record.md`.

## 9. Points to report

1. **A walk test, a team test or a specification example whose verdict changes, other than the three promotions.** None: `ant testSystem` (611) and `ant testSpecData` (130) have 0 failures each (section 6). No assertion of any test changed.
2. **The count's table, its error and the stage's time; whether `body(i)` landed; any site of `__bigOperator`'s body or the collector.** The count is 1: row 680's crash at `FortressLibrary.fss:2978`, after 493 s against the 900 s limit. `body(i: I)` landed (`FortressLibrary.fss:1314`). The distance is 54, and no site moved (section 6).
3. **The hint's design, the caches, and why no other task reads it; the reach of the collection step and of way 7's contexts; the suite's time.** Sections 5.1, 5.2 and 5.3:
   - the hint is an argument to the operator's own instantiation, the caches are not touched, and `choosing` is set only around `bestMatch`;
   - the step runs for every generic operator unless a declared type decides first;
   - the suite took 3 min 30 s, against batch 14's 4 min 6 s.
4. **Each library declaration added or changed.**
   - Section 5.4's table.
   - `body(i: I): L` (`FortressLibrary.fss:1314`; F-42).
   - `IntMap`'s api lines: `IntMap.fsi:13`, `import CovariantCollection.{AnyCovColl}`, from `PrefixSet.fsi:33`; `IntMap.fsi:83` and `IntMap.fss:732`, `opr BIG {|->[\Val\] }: Comprehension[\(ZZ64,Val),IntMap[\Val\],AnyCovColl,AnyCovColl\]`, from `Map.fsi:104`.
5. **Normative text changed, and every revival sentence made false and corrected, the skill's among them.** No normative text changed; section 8 lists the rest.
6. **A checker or code-generator edit, or a walk edit beyond the files the section names.** None. The walk edits are in four of the six named files, and `OverloadedFunction.java` and `GenericFunctionOrConstructor.java` are unchanged.

None holds the push: each is reversible, and none acts against a decision on record.

One more change of this kind, outside the list: an ill-typed program's refusal moves. `xs: List[\String\] = <| k | k <- 0#3 |>` is now refused inside the library's `__bigOperator` ('body param 1 (i:String) got arg 2: ZZ32'), where it was refused at the binding (section 7).

## 10. Decisions

1. **The hint is an argument to the big operator's own instantiation, outside the caches.**
   - `BigOperatorHint` goes from `bigOperatorByElements` to `instantiateBigOperator`, which instantiates the operator and then applies it.
   - The thread-local `choosing` carries the hint across `OverloadedFunction.bestMatch` only.
   - The declared type is an argument of `evalAt`, along the tail.

   Ways not taken:
   - the patch's thread-locals, set around the evaluation of the operator expression, whose window held the operator's body, together with the patch's cache bypass;
   - keying the caches by the arguments and the hint;
   - a thread-local taken at the top of `applyInnerPossiblyGeneric`, which would leave a non-generic operator's body inside the window and edit both files that hold the caches.

   Evidence: section 5.1; `Evaluator.java:337-353`; `NestedListComprehensionWalk` and `ant testSystem` green at four threads.
2. **The collector is typed in the covariant collection's way.** It has a generic join beside an `Any` fallback, non-generic faces for the typecase, a cast to `I` in `__replay`, and a second hook, `__bigOperatorElements`, which `o` instantiates.

   Ways not taken:
   - the patch's methods and functions at `Any`, which the checker refuses by reading;
   - generic methods `__replay[\I,L\]` and `__joinAfter[\A\]` on the trait: walk does not infer a generic method's static arguments, and an abstract generic method in a non-generic object meets walk's load checks (row 21);
   - a typed `__replayOf[\I,L\](e)` passed to `__bigOperator`: no argument fixes its `I` and `L` under walk, so they would take `Any`, and a `Reduction[\AnyCovColl\]` is not a `Reduction[\Any\]`.

   Evidence: section 5.4; the distance stage finds no error in the collector (section 6).
3. **Way 7's contexts** are a typed local variable and a function's declared return type, each through a `do` block, a block's last expression and a local declaration's body. The last goes beyond the patch's `tailOf`, by the specification's "whether or not local declarations precede it" (`inference.tex:128-133`; `evensAfter`, `ELocalTypedDo`).

   Not taken: the contexts of section 5.3, each for the reason given there.
4. **The collection step runs unless a declared type decides first, and only for an operator with static parameters.**

   Ways not taken:
   - collecting for every clause form, the patch's way, which collects even where the declared type decides;
   - restricting the step to plain-bounded operators, which would leave row 662.

   Evidence: section 5.2.
5. **`__bigOperator2` stands, unrouted**, since no clause form reaches it (`DesugarerUtil.java:279`). Not taken: routing it through the collector, which would add code that no program runs.
6. **A hint that does not fit falls back to the instance that no hint gives.** `inferWithCoercion` runs again without the hint (`EvaluatorBase.java:83-91`), and each unification is tried on a copy first.

   Not taken: the patch's fall to `inferByUnification`, and its unification of the elements' join straight into the map.

   Evidence: `ESumMixed` and `EListMixed` are unchanged (section 7).
7. **`IntMap`'s declared result is corrected** to match `Map`'s (row NEW-B-1).

   Not taken: reading the operator's `BigOperator` supertype from its value (the probe's decision 4).

   Evidence: `IntMapComprehensionTypedWalk` is red with the line as it was and green with it corrected (section 2).
8. **Row 645 closes with its claim corrected to the declared case.** The empty reduction that no declared type directs is a new row, NEW-B-2, with `XXXUnwrittenEmptyFloatSumUntypedWalk`.

   Ways not taken:
   - closing 645 as written, whose general claim still holds without a declared type;
   - keeping 645 open, though its example and its test are repaired.
9. **The nested comprehension under a declared type is a new row**, NEW-B-3, with `XXXNestedComprehensionDeclaredTypeWalk`. Not taken: a note on row 20, whose root it shares, since row 20's notes cell has no room (692 of 700 characters).
10. **The promotions' names drop the prefix**, since each name already says its topic.
11. **`resultArgOf` matches the last segment of the trait's name exactly.** Not taken: the patch's `endsWith`, which a `MyComprehension` would match.
12. **No decision record.** The section asks for none. The reasoning behind the specification's change is in this report and the probe's, which Appendix I cites.
13. **The empty unwritten list comprehension's test pins walk's bound, `List[\Any\]`**, as the brief asks. The specification's static answer would be `List[\ZZ32\]`, and walk has neither an element nor a static type there (P-48).

## 11. Defects, each with its home

- **Row 703**, walk refuses `body(i: I)`: home 1, `UnwrittenListMapComprehensionWalk`. It is red at `(i:BOTTOM)` with the line typed on the base's walk, and green now.
- **Row 646**, a set comprehension built at `Int` and refused at `Set[\ZZ32\]`: home 1, `ComprehensionTypedBindingWalk`.
- **Row 662**, `Set`'s unwritten `BIG UNION` and `BIG INTERSECTION` stop: home 1, `UnwrittenSetBigOperatorsWalk`.
- **Row 645**, the empty sum declared `RR64`: home 1, `UnwrittenEmptyFloatSumWalk`, with its claim corrected to the declared case.
- **The list face of row 20 at a declared type**: home 1, `UnwrittenComprehensionDeclaredTypeWalk`. Row 20 stays open for what no declared type reaches.
- **Row NEW-B-1**, `IntMap`'s comprehension operator declared `IntMap[\Val\]` while its body is a `Comprehension`: home 1, `IntMapComprehensionTypedWalk`.
- **Row NEW-B-2**, an empty reduction with no static argument and no declared type takes `ZZ32`'s identity whatever its expression's type: home 2, `XXXUnwrittenEmptyFloatSumUntypedWalk`. The specification settles it (`SUM[\RR64\]`'s zero), and walk has no static type to give it.
- **Row NEW-B-3**, a comprehension nested in another clause form whose instance a declared type fixes is built at its elements' run-time class, which the outer's element type refuses: home 2, `XXXNestedComprehensionDeclaredTypeWalk`.
  - `zs: List[\ZZ32\] = BIG CONCAT[ys <- <|<|1, 2|>, <|3|>|>] <| 2 y | y <- ys |>` stops, 'body param 1 (i:List[\ZZ32\]) got arg ArrayList[\Int\]'.
  - It stopped on the base too, at `lift`.
- **The dead fusion of nested reductions** (`DesugarerUtil.java:279`) is no defect of this rung's area: it is the team's own switch, and no program depends on it. It is listed for the curator below, with no row.

## 12. For FACTS, commands, questions

For FACTS: see `record.md`.

Commands worked out:
- `tmp/rung-walk-elements/run-edge.sh new|old <outdir>`: runs each `tmp/rung-walk-elements/edge/*.fss` under walk, three at a time, and prints the first lines and the `rc=` of each. `new` runs the new code with a private caches folder; `old` runs the old code through `old-fortress.sh`. It is scratch, and not committed.
- `git cat-file -e a874948ac:<path>`: whether a file is in the team's 2012 tree.

Questions for the curator (decisions not taken):
1. **An empty unwritten reduction with no declared type** (row NEW-B-2) still takes `ZZ32`'s identity, or its operator's bound: walk has no element and no static type to stand for `N`. Alternatives:
   - (a) accept it as walk's limit until the switch-over, as P-59 accepts walk's coercion by value, with the expected failure as its record;
   - (b) keep it a defect, for a later rung that gives walk a static type there.

   Evidence: `XXXUnwrittenEmptyFloatSumUntypedWalk`; `inference.tex:383-385`. No default is on record; the rung recorded it as a deferred defect (home 2).
2. **The team's disabled fusion of nested reductions.** `DesugarerUtil.java:279` returns before its body for every input (`5a68404fd`), so `__bigOperator2` and the desugarers' `BIGOP2_NAME` branches are dead. Alternatives:
   - (a) leave them;
   - (b) record the dead path in the dormant-code map (`explorations/coordinator/map/dormant-code.md`).

# Climb batch 16, rung W (`rung-walk-overload-if`): walk's generic overload check at load, its `if`, and a user big operator's declared result

problem: walk loaded and ran two generic overload sets the specification and the checker refuse, its expected failures `ProjectFortress/tests/XXXGenericBoundsNoMeetWalk.fss:12-13` and `XXXNoDuplicatesRuleWalk.fss:8-9` on the base (row 373, `explorations/fortress-gap-ledger.md:326`); its `if` took any object but one named `Just` as false (`XXXIfClauseObjectWalk.fss:8`, row 673, `fortress-gap-ledger.md:690`); a user big operator returning its own trait got no hint (`XXXUserBigOperatorResultTraitWalk.fss:25`, row 718, `fortress-gap-ledger.md:581`)
spec: `Specification/advanced/overloading.tex:546-559` (the No Duplicates, Meet and Return Type Rules for declarations with static parameters), `:579-588` (exclusion by existential reduction: instances of one parameterized trait meet only where their static arguments are the same); `Specification/basic/expressions/if.tex:54` (a clause without a binding must be a `Boolean`); `Specification/advanced/parallelism-locality/defining-generators.tex:117` (a clause form is desugared by the type of its expression)
precedent: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:760-791` (`validOnDeclaredDomains` of a generic beside a plain declaration, `8f7e183d4`: `instanceHolding` and `declaredBelow` on declared domains, a cover of the overlap); `SingleFcn.java:163-226` (`createSymbolicInstantiation`, whose order of making symbolic static parameters and evaluating their bounds the meet follows); `Evaluator.java:1600-1617` (`forWhile` refuses every clause value that is not `Boolean`); `Evaluator.java:416` (`Glue.extendsGenericTrait` names a library trait a value's type extends)
deviation: the object-type shortcut's two lines change for two generic declarations' instances of one generic object whose static arguments may be equal (`OverloadedFunction.java:445-446`), which the batch record left as row 697's; the declared-domain reading is reached only by a pair some parameter pair of which excluded at one instantiation alone (`OverloadedFunction.java:764`), so row 159's pairs keep their refusal; `EvaluatorBase.java:14` uses the checker's `compiler/typechecker/StaticTypeReplacer.java` (no edit of it); none of the specification's spelling changes
historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java`

Line numbers are on this branch at `e9fbbff7f` unless they say "on the base" (`528438ac5`).

## 1. What changed and why

### Row 373: two generic declarations, each read over its own instances

Walk's load check compares each pair of overloads parameter by parameter (`OverloadComparisonResult.completeOverloadingCheck`). For two declarations with static parameters of their own it read both domains at one instantiation in two ways, both the team's:

- Two generic functions of one name and one list of static parameters (names, kinds, bounds) share one symbolic instantiation (`FGenericFunction.java:43-64`, keyed by `GenericComparer`, `GenericFunctionOrMethod.java:43-68`). So `o[\T\](x: P[\T\])` beside `o[\T\](x: Q[\T\])` read `P[\T\]` and `Q[\T\]` at one `T`, where `trait P[\T\] excludes { Q[\T\] }` makes them exclude (`OverloadedFunction.java:454` on the base), though `Mixed extends { P[\ZZ32\], Q[\String\] }` has both.
- Two instances of one generic object at different symbolic static arguments, `ListI[\P\]` beside `ListI[\Q\]` or `Box[\T\]` beside `Box[\U\]`, are two object types that cannot be extended, so they exclude (`interpreter/evaluator/types/FType.java:212-217`), and every differing parameter being an object type marks the pair distinct anyway (the shortcut, `OverloadedFunction.java:432-433` and `:486` on the base). So A6's two `sort`s and B4's two `dup`s loaded.

Now, for two own generics (`ownGeneric` of both, `OverloadedFunction.java:424`):

- A parameter pair the old reading finds excluding is read again over the instances of each (`excludesOverInstances`, `:1059-1067`), o2's static parameters renamed apart from o1's where the two share their symbolic instantiation (`Apart`, `:1006-1032`, made with `createSymbolicInstantiation` and `typeApply`). Instances of one generic type exclude only where their static arguments cannot be equal (`mayBeEqual`, `:1133-1148`: two type parameters unless their bounds exclude, a type parameter and a type within its bounds, one generic's instances argument by argument). Any other pair excludes as `excludesOther` reads it apart, or, read at the shared instantiation, where every generic type both extend forces o2's renamed static arguments back to the shared ones (`oneInstance`, `:1077-1092`): no type extends two instances of one generic trait, so `Array[\T,ZZ32\]` beside `ImmutableArray[\T,ZZ32\]`, which exclude at one `T` (`Library/FortressLibrary.fsi:1455`), exclude at every pair of instances through `ReadableArray`. Where it does not hold, the exclusion is withdrawn (`:467-479`).
- A coinciding pair of one generic object's instances is no object type for the shortcut (`:443-446`); the shortcut itself (`:513`) is the team's line, unchanged.
- A withdrawn position counts as one with generic type (`:499-501`), so a refusal keeps walk's generic message, "with generic type, at least one pair of parameters must have excluding types" (F-155).
- A pair with a withdrawn exclusion that the check then refuses is read on its declared domains, each over its own instances (`validOnDeclaredDomains`, `:764`; `genericPairValid`, `:801-818`): each inside the other is refused (the No Duplicates Rule); one inside the other is valid where its return type is below the other's at the instance that holds it (the Return Type Rule); otherwise a third declaration whose declared domain lies inside both must hold their overlap (`genericMeetCovered`, `:833-878`, the Meet Rule). The overlap matches the two domains position by position (`matchApart`, `:969-988`); type parameters matched to each other become one made afresh whose bounds are each one's, evaluated in an environment where each declaration's static parameters stand for their arguments at the overlap, as `createSymbolicInstantiation` evaluates bounds, so F-bounds meet (`meetParams`, `:891-961`).

Pairs that the old reading did not find excluding keep the old check (`:764` returns false without a withdrawal): row 159's renamed and swapped arms stay refused, and `XXXDispatchRenamedArmWalkRungG` and `XXXDispatchSwappedArmWalkRungG` keep their verdicts.

### Row 673: walk's `if`

`forIf` (`Evaluator.java:582-609`) takes a `Boolean` by its value. Any other clause value is a `Maybe` of the library when its type is named `Just` or `Nothing` and extends `Maybe` (`maybeType`, `:611-621`): a `Just` runs the `then` branch, whatever it holds, a `Nothing` the next clause, as the team's line took a `Just` (`:595-597`, the team's test of the name kept) and as the team's `maybeTest.fss:21-22` and `naturalsTest.fss:21-22` ask. Every other value is refused, "If clause did not return boolean, but 1: ZZ32" for a number, as `()`, a tuple and a function already were (`:599`). This is the coordinator's call 6 (`explorations/coordinator/CLIMB-BATCH-16.md:86`).

### Row 718: a user big operator's declared result

`resultArgOf` (`EvaluatorBase.java:281-290`) read the element and result types only off a declared result named `BigReduction`, `Comprehension` or `BigOperator`. It now reads them off the one of those three that the declared result extends (`libraryBigResult`, `:310-336`): the declared result's trait or object declaration is looked up in the operator's environment, and its extends clause is read with the declaration's static parameters replaced by the declared result's static arguments (`StaticTypeReplacer`), up the supertypes in turn, at most 16 declarations deep. So `opr BIG CATOP[\T\](): CatOperator[\T\]`, with `trait CatOperator[\T\] extends BigOperator[\List[\T\],List[\T\],List[\T\],List[\T\]\]`, reads `I = List[\T\]`, and its elements fix `T = ZZ32`.

## 2. The tests, the failing run and the passing run

Promoted, each renamed by its topic with `git mv`, its component line with it, before the first build of the edit (commit `b4b5e20aa`); each `.test` key kept:

| was | now | row |
|---|---|---|
| `XXXGenericBoundsNoMeetWalk.fss`, `.test` | `GenericBoundsNoMeetWalk.fss`, `.test` (`load_exception_contains=at least one pair of parameters must have excluding types`) | 373 |
| `XXXNoDuplicatesRuleWalk.fss`, `.test` | `NoDuplicatesRuleWalk.fss`, `.test` (the same key) | 373 |
| `XXXIfClauseObjectWalk.fss`, `.test` | `IfClauseObjectWalk.fss`, `.test` (`load_exception_contains=If clause did not return boolean`) | 673 |
| `XXXUserBigOperatorResultTraitWalk.fss` | `UserBigOperatorResultTraitWalk.fss` (no `.test`) | 718 |

New, in `ProjectFortress/tests/`:

- `IfClauseNumberWalk.fss` and `.test`, `IfClauseStringWalk.fss` and `.test`: a top-level `if 1 then` and `if "yes" then`, refused at load with row 673's key; red on the base. Two files, since a refusal at load stops at the first.
- `GenericOverloadInstancesApartWalk.fss` and `.test`: row 373's own program (`P[\T\] excludes { Q[\T\] }`, `Mixed`), refused at load with the generic message; red on the base.
- `GenericPairExcludingWalk.fss`: generic pairs that exclude over every instance (two generic objects; bounds `Red` and `Blue` that exclude; a ground second parameter; `Frozen[\T\]` beside `Thawed[\T\]`, which exclude at one `T` and extend `Readable` at one instance only) or nest (`Box[\U extends Red\]` inside `Box[\T\]`, `Sub[\X\]` inside `Tag[\X\]`), asserted to load and dispatch; green on the base and after.
- `GenericFBoundsMeetWalk.fss`: `f` over `Box[\T\]` with `T extends Ord[\T\]`, with `U extends Eq[\U\]`, and with `V extends { Ord[\V\], Eq[\V\] }`, asserted to load and dispatch each call to its most specific declaration; green on the base and after. It guards the case the first version of this edit refused (section 5).

The failing run, through the harness, on the base's code, at 10:17:40 to 10:17:52 UTC, before the edit's first build (`ant compileAll`, ended 10:26:30 UTC):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-overload-if/h-base \
      $T/GenericBoundsNoMeetWalk.fss $T/GenericBoundsNoMeetWalk.test $T/NoDuplicatesRuleWalk.fss ... $T/GenericPairExcludingWalk.fss

    # harness-one 2026-10-16T10:17:40Z; tree 528438ac5; nproc=4; load 1.08 1.08 0.69; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
     Missing expected refusal at load
     UNEXPECTED exception 
    FortressException: CastError
    Tests run: 8,  Failures: 7,  Errors: 0

The seven red were the four promotions and the three new refusals; `GenericPairExcludingWalk` was green.

The passing run, the last after the last change of code (the meet's rewrite, built at 10:53 UTC, committed as `e9fbbff7f`), over the rung's tests and every test whose verdict the brief keeps:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-overload-if/h4 \
      $T/GenericBoundsNoMeetWalk.fss ... $T/GenericFBoundsMeetWalk.fss $T/GenericBoundsMeetWalk.fss $T/TwoTraitsNoMeetWalk.fss $T/TwoTraitsNoMeetWalk.test \
      $T/DispatchCrossingMeetWalk.fss $T/DispatchSymmetricSortedWalk.fss $T/GenericOverloadBoundsApart.fss $T/XXXDottedMethodMeetBothBodiesWalk.fss \
      $T/XXXReturnRuleObjectParamWalk.fss $T/maybeTest.fss $T/naturalsTest.fss $T/XXXOverloadExistentialMeetWalk.fss \
      $T/XXXDispatchRenamedArmWalkRungG.fss $T/XXXDispatchSwappedArmWalkRungG.fss $T/ShuffleTest.fss

    OK (22 tests)

`GenericPairExcludingWalk` and `GenericFBoundsMeetWalk` were also run on the old code, through the base build's harness (`FORTRESS_HOME=/home/user/fortress-base16 /home/user/fortress-base16/explorations/compile-ladder/rung-inference-walk/harness-one.sh ...`): `OK (1 test)` each.

No `XXX` test is added, so none is shown red on a deliberate fix.

## 3. Where the fix belongs, and the precedent

`explorations/coordinator/map/spec-to-implementation.md:214` and `:244` put overload checking in walk's `values/OverloadedFunction.java` and `if` in `Evaluator.forIf`; `:256` puts the instantiation of a big operator in walk's evaluator. All three are walk's alone (`interpreter/`), which the compiled path does not run.

- Row 373: the precedent is rung W of climb batch 7b (`8f7e183d4`), which read a generic declaration beside a plain one on their declared domains (`validOnDeclaredDomains`, with `instanceHolding`, `declaredBelow` and a cover of the overlap) and fixed row 478, one generic's bound read for another's through the shared instantiation (the comparer's key, `GenericFunctionOrMethod.java:56-68`). In `OverloadedFunction.java` three sites read two generic declarations at their shared instantiation: the exclusion test (`:454` on the base), the object shortcut (`:486` on the base) and `meetExistsIn` (`:697` on the base), beside the positional subtype and return-type comparisons (`:461-462`, `:494-501` on the base), which P-45's positional rule keeps. The edit repairs the first two; `meetExistsIn` is reached only for a pair each better at one position, and keeps its reading.
- Row 673: `forWhile` (`Evaluator.java:1600-1617`) is the one other site of the file that tests a clause value; it refuses every value that is not `Boolean`, which `forIf` now does but for a `Maybe`. The two chain sites (`:380`, `:461`) test an operator's result, not a clause.
- Row 718: `resultArgOf` is climb batch 15 rung B's (`5dad832f3`); no other site of its file reads a declared result's static arguments.

The ways the language and the tree offer, with the choice: section 9.

## 4. What the specification settles

- A declaration with static parameters is read as one whose parameter type ranges over every instance within its bounds (`advanced/overloading.tex:536-538`). Two parameter types with static parameters exclude by existential reduction, each static parameter standing for any type within its bound, instances of one parameterized trait meeting only where their static arguments are the same (`:579-588`). A set is valid when every pair meets the No Duplicates, Meet and Return Type Rules (`:546-559`), a cover by several declarations counting (`:575-577`). So A6's two `sort`s (no meet), B4's two `dup`s (duplicates) and row 373's `o` pair (overlapping at `Mixed`) are refused, and `GenericBoundsMeetWalk`'s and `GenericFBoundsMeetWalk`'s sets are valid.
- A clause without a binding must be a `Boolean` (`basic/expressions/if.tex:54`). The `Maybe` clause walk keeps reads past that letter, as the team's line and tests did; it is revival-change material (`record.md`).
- A reduction is desugared by the type of its expression (`advanced/parallelism-locality/defining-generators.tex:117`), which a big operator's declared result fixes through its supertype as well as when it names one of the library's three.

No normative sentence changes.

## 5. Programs run, old code beside new

- The eight test programs of section 2, through the harness: seven red and one green on the base; green on the new code.
- `GenericPairExcludingWalk` and `GenericFBoundsMeetWalk` through the base build's harness: green.
- Every library api, one probe each (`import X.{...}` and a `run` that prints `loaded`, under `tmp/rung-walk-overload-if/probes/`), 47 probes on the old code and on the new: the same lines on both. 45 load; `LoadPrefixMap` is refused on both by `PrefixSet`'s and `PrefixMap`'s `BIG CUP` pair ("Overloading of BIG CUP[\E extends StandardTotalOrder[\E\],F extends List.List[\E\]\]():BigReduction[...]", `Library/PrefixSet.fss:425`, the cross-api family of F-155), and `LoadGeneratorLibrary` stops on both at `Library/CompilerAlgebra.fsi:16:7-23` (`library.md`: nothing imports it). The comparison, `diff <(sed 's|/home/user/fortress-base16|TREE|g' load-old.txt) <(sed 's|/home/user/fortress-walkovl|TREE|g' load-new2.txt)`, printed nothing.
- The first version of the edit (`0be28a5a6` before `oneInstance`, uncommitted) refused `Library/Shuffle.fss:21` beside `:30` when every api was imported in one probe ("shuffle[\T\](a:ImmutableArray[\T,FortressLibrary.ZZ32\]) ... and shuffle[\T\](a:Array[\T,FortressLibrary.ZZ32\]):() ... have parameters with generic type, at least one pair of parameters must have excluding types"); `oneInstance` answers it. That one-probe form could not run on the old code either, which refuses `PrefixSet` beside `PrefixMap`, so it gave way to the 47 probes.
- A probe of `GenericFBoundsMeetWalk`'s set: the old code printed `both` and `ord`; the edit's first meet (`0be28a5a6`), which joined the bounds as run-time types and gave up on a bound that names a static parameter, refused it; the final edit prints `both` and `ord`.

## 6. Suites, the checker count and the distance, the ladder, names

- `ant testSystem`, once on the final code state (the tree of `e9fbbff7f`): `BUILD SUCCESSFUL`, `Total time: 5 minutes 8 seconds`; shards `Tests run: 158`, `157`, `153`, `158`, each `Failures: 0, Errors: 0`: 626 tests, against 621 at climb batch 15b's gate (`explorations/compile-ladder/climb-batch-15b/gate/summary.txt`, 149 + 161 + 150 + 161), the five new tests. The code state of `0be28a5a6` had run it too: 625 tests, 0 failures.
- `ant testSpecData`, once on the final code state: `Tests run: 130, Failures: 0, Errors: 0`, `BUILD SUCCESSFUL` (P-124).
- The checker count and the distance: neither run. Every path the rung changes is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/` or `ProjectFortress/tests/` (`git diff --name-only 528438ac5`: `Evaluator.java`, `EvaluatorBase.java`, `values/OverloadedFunction.java` and the test files of section 2; `git status --short` empty), so neither stage can move.
- The ladder subset is empty: no file of the baseline's `raw/` names what the rung touched (`grep -rlE 'OverloadedFunction|forIf|EvaluatorBase|If clause did not return|excluding types|interpreter\.evaluator' explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing); the ladder runs the compiled path, which runs none of walk's evaluator.
- Competing names: none. The Java names added (`maybeType`, `libraryBigResult`, `bareName`, `BIG_RESULT_DEPTH`, `Apart`, `genericPairValid`, `genericMeetCovered`, `meetParams`, `matchApart`, `root`, `instancesMayCoincide`, `excludesOverInstances`, `oneInstance`, `withSupertypes`, `mentions`, `argsMayBeEqual`, `mayBeEqual`, `mayInstantiate`, `sameGeneric`, `mentionsSymbolic`, the field `withdrawn`) are each declared once under `ProjectFortress/src/com/sun/fortress/` (`maybeType` is also a local variable at `nodes_util/NodeUtil.java:1760`, another scope); the test components' names and their traits, objects and functions (`Readable`, `Frozen`, `Thawed`, `FrozenZ`, `ThawedZ`, `copyOf`, `Ord`, `Eq`, `Both`, `OnlyOrd`, `OnlyEq` and the rest) appear in no other test or library file.

## 7. Sentences made false

### The four revival clauses on rows 373 and 718, with their corrected text

1. `Specification/appendices/changes.tex:2628-2631` (the Effect of "Overloading with static parameters"): "The interpreter loads such a pair and runs one of them where both declarations have static parameters and their parameter types mention one parameterized type, as \VAR{dup}'s do (row~373), and where one has static parameters and the other's parameter type is its bound (row~549)." Corrected: "The interpreter refuses at load such a pair of two declarations with static parameters, as \VAR{dup}'s, reading each declaration's parameter type over its own instances; it loads such a pair and runs one of them where one has static parameters and the other's parameter type is its bound (row~549)."
2. `Specification/appendices/changes.tex:1128-1132` (the Effect of "Reductions whose element type nothing fixes"): "and a reduction over a big operator whose declared result is a trait other than the library's \TYP{BigReduction}, \TYP{Comprehension} and \TYP{BigOperator} stops at an element that the operator's instance at its bound does not admit (row~718)." Corrected: "and a reduction over a big operator whose declared result is a trait other than the library's \TYP{BigReduction}, \TYP{Comprehension} and \TYP{BigOperator} is instantiated through the one of those three that the trait extends, its static arguments put for the trait's, as one declared with that supertype is."
3. `Specification/appendices/changes.tex:2095-2097` (the Effect of "The inference of a call's static arguments"): "and a big operator whose declared result is a trait other than the library's three is instantiated at its bound, where an element it does not admit stops the reduction (row~718)." Corrected: "and a big operator whose declared result is a trait other than the library's three is instantiated through the one of them that the trait extends, as one declared with it is."
4. `Specification/basic/inference.tex:394-398` (the chapter's revision box, `:342`): "and a big operator whose declared result is none of the library's \TYP{BigReduction}, \TYP{Comprehension} and \TYP{BigOperator} is instantiated as where there is no element, so that the reduction stops at an element that its instance at the bound does not admit (row~718)." Corrected: "and a big operator whose declared result is none of the library's \TYP{BigReduction}, \TYP{Comprehension} and \TYP{BigOperator} is instantiated through the one of those three that its declared result extends, with that trait's static arguments."

The gather may date each change as the entries date theirs ("Since ... 2026, under the interpreter, ...").

### Other sentences of the specification

5. `Specification/appendices/changes.tex:2612-2614` (the same Effect as 1): "and the interpreter refuses at load two declarations with static parameters of which no pair of parameter types excludes each other (row~159), that example among them (row~539)." It held in walk's own reading, which took `GenericBoundsMeetWalk`'s instances of one generic object as excluding; now walk reads such a pair over its instances and loads it on its declared domains. Corrected: "and the interpreter refuses at load two declarations with static parameters of which no pair of parameter types excludes each other (row~159), that example among them (row~539), except where a pair of their parameter types, read at one instantiation of both, excludes and read over the instances of each does not: such a pair it reads on the two declared domains, by the three rules above."

`Specification/advanced/overloading.tex:626-629` ("the interpreter refuses it at load, since it asks two declarations with static parameters for a pair of parameter types that exclude each other (row~159)", of `ident[\T extends Shape\]` beside `ident[\T extends Round\]`) stays true: that pair's parameter types never excluded in walk's reading, so its refusal stands.

No sentence of the specification on walk's `if` exists (`grep -n -i 'interpreter' Specification/basic/expressions/if.tex` prints nothing).

### FACTS (the gather's rewrites, in `record.md`)

- F-228 (`FACTS.md:150`): "Left open: ... a user big operator whose declared result is its own trait (row 718), ..." is false.
- F-223 (`FACTS.md:179`): "Walk runs one of such a pair in two shapes (rows 373 and 549)" and "walk's departure by `tests/XXXNoDuplicatesRuleWalk`" are false.
- F-145 (`FACTS.md:145`) stays true: its refusals are the abstract-method, `override` and functional-method Meet Rule checks; the new refusal sits beside F-155, whose message it gives.

### The skill (revival-change material)

- `.claude/skills/fortress-repo/references/revival-changes.md:146-149`: "Walk still differs from the specification in three cases: ... a user big operator declared to return a trait of its own, such as `opr BIG CATOP[\T\](): CatOperator[\T\]`, takes its bound (ledger row 718)." is false: two cases remain.
- `.claude/skills/fortress-repo/references/interpreter.md:38`: "two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if their declared domains order a generic declaration and a plain one, or if `comprises` clauses cover the overlap." is incomplete: two generic declarations a pair of whose parameter types excluded only at one instantiation are refused unless their declared domains, each over its own instances, nest or a third declaration below both holds their overlap.

## 8. Points to report

- **Library, team tests, demos and specification examples refused at load: none.** The 47 library probes give the same lines on old and new code (section 5); `ant testSystem` 626 tests and `ant testSpecData` 130, 0 failures (section 6). Row 373's line landed (`OverloadedFunction.java:424-535`, `:760-1187`). Demos are not run; their `if` clauses were read (below).
- **What a reading of microGPT's components finds of rows 373 and 673's shapes: none.** In `explorations/run-c4/src/` and `explorations/apl/mg/` the generic pairs of one name are `opr /[\I\]` twice (`run-c4/src/FlatArrays.fss:26-27`, sharing `I`, whose second parameters `Array[\RR64,I\]` and `RR64` are ground and keep their reading), and pairs of different static-parameter lists over different generic types (`transpose`, `FlatArrays.fss:50-51`; `rows`, `:142-160`; `opr ×` and `opr /`, `apl/mg/FlatArrays2.fss:23-35`), none of which an instance of one generic object at static arguments that may be equal, or an exclusion read at one shared instantiation, decides. Every `if` clause is a comparison, a Boolean combination or a `Boolean` variable (`ok = diff <= tol`, `MicroGptFlatCheck.fss:23`; `neg`, `eneg`, `seenPoint: Boolean`, `FlatData.fss:15-32`, `FlatData2.fss:18-35`).
- **Library lines, team tests, demos or specification examples beyond `maybeTest` and `naturalsTest` whose `if` clause is neither a `Boolean` nor a `Maybe`: none found.** Every gated team test runs (testSystem) and every specification example (testSpecData); the demos' clauses that are no comparison or Boolean operation were read, each a `Boolean` (`tictactoe.fss:83`, `HeapShakedown.fss:40`, `:93`, `aStar.fss:77`, `:185`, `BirdCount1v.fss:182`, `BirdCount1q.fss:116`, `tennisRanking.fss:292`, `Satisfiability.fss:62` through `Library/File.fsi:28`; `Cfa.fss:440` is inside a comment). The library's by the batch record's reading (`CLIMB-BATCH-16.md:86`).
- **Walk tests whose verdict changes beyond the four promotions and the new tests: none** (testSystem 0 failures; the kept tests of the brief in the harness run of section 2).
- **Team lines changed.** `Evaluator.java:595` (`forIf`'s test `clauseVal.type() instanceof FTraitOrObject`, now `maybeType(clauseVal.type())`; the next line's test of the name `Just` kept); `OverloadedFunction.java:445-446` (the shortcut's `allObjInstance1 &= p1 instanceof FTypeObject;` and its twin, now `&& !coincide`, which the batch record had left as row 697's); `:467-479` (the test `if (p1.excludesOther(p2))`, `:454` on the base, now withdrawn for two own generics where the instances of each do not exclude); `:499` and `:501` (`if (p1.isSymbolic())` and its twin, now `|| withdrawnHere`); `:535` and `:764` (`validOnDeclaredDomains` takes the withdrawal). `EvaluatorBase.resultArgOf` is the revival's own (`5dad832f3`).
- **The four revival clauses on rows 373 and 718, with their corrected text, and every other sentence made false**: section 7.
- **A walk edit beyond the three files, or any checker or library edit: none.** `EvaluatorBase.java:14` imports the checker's `StaticTypeReplacer`, which the rung does not edit.

## 9. Decisions

1. **How far row 373 reaches.** Chosen: a pair of two own generics is read over the instances of each only where a parameter pair excluded read at one instantiation and does not read apart; such a pair is then judged on its declared domains by the three rules. Not taken: reading every pair of two generic declarations on its declared domains, as the checker does, which would also accept row 159's renamed and swapped arms, turning `XXXDispatchRenamedArmWalkRungG` and `XXXDispatchSwappedArmWalkRungG` red, a design limit the record keeps (row 159, "walk's check is kept by decision"); only renaming the static parameters apart at the exclusion test (`:454` on the base), which leaves A6 and B4 loading, since their declarations share no instantiation and walk took their instances of one object as distinct non-extensible types (`FType.java:212-217`) and through the shortcut; giving each generic its own symbolic instantiation in `FGenericFunction.getSymbolic` (`FGenericFunction.java:43-64`), which changes every generic's domain for dispatch and inference as well, and is a fourth file. Evidence: the failing run of section 2; row 159's tests in the passing run. Question for the curator: `record.md`.
2. **The object shortcut.** Chosen: instances of one generic object whose static arguments may be equal count as no object type (`:443-446`). Not taken: dropping the shortcut for two own generics, which would repair row 697 for generic pairs with a ground object type below the other's, beyond the rung and against the record's reading of row 697 (its repair waits on row 433); leaving it, which keeps A6 and B4 loading. Evidence: A6 and B4 have one parameter each, both instances of one object, so the shortcut alone marks them distinct (`:486` on the base).
3. **An exclusion read at one shared instantiation, of two different generic types.** Chosen: it stands where every generic type both extend forces the renamed static arguments back to the shared ones, the instantiation exclusion of `advanced/overloading.tex:584-588` (`oneInstance`). Not taken: withdrawing every such exclusion, which refused `Library/Shuffle.fss:21` beside `:30` (section 5); keeping every one, which loads row 373's own program. Evidence: `GenericPairExcludingWalk`'s `copyOf` pair and `GenericOverloadInstancesApartWalk`.
4. **The overlap of two generic domains.** Chosen: matched position by position, with a type parameter made afresh under the bounds of each, evaluated from the declarations as `createSymbolicInstantiation` evaluates them, and covered by a third declaration whose declared domain lies inside both and holds the overlap (`advanced/overloading.tex:553-555`). Not taken: joining the bounds as run-time types, which gave up on a bound that names a static parameter and refused `GenericFBoundsMeetWalk`'s valid set (section 5); building the overlap by substitution inside run-time types, which needs the bound of a type parameter not yet made; no cover at all, which turns `GenericBoundsMeetWalk` red. A pair whose domains do not match so (a lone type parameter against a parameterized type, a tuple or an arrow over static parameters) or that has a `where` clause is refused, as walk refused every such pair whose parameters did not exclude before.
5. **The Return Type Rule of a nested pair.** Chosen: the inner declaration's return type below the outer's at the instance of the outer that holds the inner's domain, as the checker's `satisfiesReturnTypeRule` solves the outer's static parameters (`scala_src/overloading/OverloadingOracle.scala:83-128`). Not taken: comparing the two symbolic return types, as the generic-beside-plain path does (`OverloadedFunction.java:784-785`), which for two generics compares types over unrelated static parameters.
6. **The message.** Chosen: a withdrawn position counts as one with generic type, so the refusal is walk's generic message, the key of the two promoted tests and F-155's. Not taken: a new message, which would change both tests' keys.
7. **How `forIf` knows a `Maybe`.** Chosen: by its type, named `Just` or `Nothing` and extending the library's `Maybe` (`Glue.extendsGenericTrait`, as `Evaluator.java:416` reads `Contains`), a `Just` true whatever it holds. Not taken: calling the `holds` getter, Fortress code run from inside `forIf`, which the coordinator's call allows equally; the team's name test alone, which takes any object named `Just`, a program's own among them; constants in `compiler/WellKnownNames.java`, a fourth file. Evidence: `maybeTest` and `naturalsTest` green; `IfClauseObjectWalk`, `IfClauseNumberWalk`, `IfClauseStringWalk`.
8. **How `resultArgOf` reaches the supertype.** Chosen: the declaration's extends clause as written, its static parameters replaced by the declared result's static arguments with the checker's `StaticTypeReplacer`, up the supertypes, at most 16 deep. Not taken: the run-time supertypes of an instance (`getTransitiveExtends`), which are run-time types where the unification needs the written type that names the operator's own static parameters; a substitution visitor of walk's own, which repeats the checker's; one level only, which misses a trait that extends `BigOperator` through another.
9. **Tests.** Chosen: the number and the string in two files, since a refusal at load stops at its first; row 373's own program as a gated test; two guards green on the base and after. Not taken: one file with both, which can assert only one.
10. **The specification.** Chosen: no edit; the four clauses and the fifth sentence go to the gather with their corrected text, as the brief says.

## 10. Defects and their homes

- Row 373: home 1, repaired; `GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk` and `GenericOverloadInstancesApartWalk` refuse, `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk` and `GenericPairExcludingWalk` load and dispatch.
- Row 673: home 1, repaired; `IfClauseObjectWalk`, `IfClauseNumberWalk`, `IfClauseStringWalk`; `maybeTest` and `naturalsTest` keep the `Maybe` clause.
- Row 718: home 1, repaired; `UserBigOperatorResultTraitWalk`.
- No other defect was measured. The two that the edit's first versions showed (the library's `Shuffle` pair refused; an F-bounded meet refused) were of the edit, not of the base, and are guarded by `ShuffleTest`, a gated test that imports `Shuffle`, and by `GenericFBoundsMeetWalk`.

## 11. Notes on the neighbouring rows

- Row 697: its expected failure `XXXReturnRuleObjectParamWalk` keeps its verdict ("Saw expected failure: loaded and ran, not refused at load"). The shortcut stays for every pair but two own generics' instances of one generic object at static arguments that may be equal (`OverloadedFunction.java:445-446`). The record's reading stands: its repair, an object type excluding only a type it is not below, would make walk compare the return types of `SumReduction`'s `distribute` pair with `ActualReduction`'s, row 433's, which are not below each other, so every `SUM` would stop. Its notes cell holds 681 of 700 characters, so no note fits.
- Row 444: `XXXDottedMethodMeetBothBodiesWalk` keeps its verdict. Its site, by reading: `Constructor` builds one `OverloadedMethod` of an object's inherited and declared methods of one name (`values/Constructor.java:383-388`), whose constructor adds each as a plain `Overload` (`OverloadedFunction.java:1761-1773`, the base's `:1333-1345`), so the pair analysis compares the parameter lists without the receiver. Its notes cell holds 683 of 700 characters.
- Row 549: its half of the Appendix I sentence stands (section 7, item 1). Its notes cell holds 684 of 700.
- Row 159: its pairs keep their refusal; a note fits (`record.md`).

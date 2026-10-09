<!-- Climb batch 11, rung W (rung-walk-open-param): walk leaves open an F-bounded type parameter that nothing at a call fixes (Q1, way 11), stops running a declaration that a trait's override declaration overrides (row 614), and checks object expressions under the Meet Rule for Functional Methods (row 618). Worktree /home/user/fortress-walkopen, branch wip/rung-walk-open-param, base 83b1cae78, seeded from /home/user/fortress-base11. Commits: c022fda6e (the tests), c0b2888f2 (walk), 404f62fd4 (the specification). -->

# Rung W of climb batch 11: an open type parameter, a trait's override and object expressions, under walk

- problem: the five red examples of `ant testSpecData` and the smoke test stop at a reduction that writes no static argument (FACTS, "`ant testSpecData` runs 130 ..."); this is ledger row 424's F-bounded half; with rows 614 and 618, explorations/fortress-gap-ledger.md:143
- spec: `reductions.tex`, section "Summations and Other Reduction Expressions" (the desugaring by the type `N` of the expression), and `traits.tex`, section "Method Declarations" (what an `override` declaration overrides), Specification/basic/traits.tex:585
- precedent: the probe's patch for way 11, re-read on this base, explorations/compile-ladder/plan-9/probes/P1-open.patch:1; batch 10's per-type reading of `override` in walk's load check, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1211
- deviation: the probe's helper `unfixedSelfBounded` is inlined, and its trace rule is named `open`, not `p1`, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:191
- deviation: `Evaluator` and `LHSEvaluator` import `BottomType` by name, since `com.sun.fortress.nodes.BottomType` makes the short name ambiguous, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:20
- deviation: an object expression is checked where its type gets its supertypes, not in `checkFunctionalMethodMeets`, which runs before walk makes the types of object expressions, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildEnvironments.java:993
- deviation: the judgement's test item "a set comprehension bound to a variable declared `Set[\ZZ32\]`" fails under the open parameter as on the base. So it is an expected failure of its own (NEW-W-3), and the plain test asserts the set's size and members without a typed binding, ProjectFortress/tests/XXXComprehensionTypedBindingWalk.fss:8
- deviation: the expected failure of the empty sum asserts the identity's type as well as its value, since under walk `0 = 0.0` holds and the value alone passes, ProjectFortress/tests/XXXUnwrittenEmptyFloatSumWalk.fss:11
- historical: interpreter/evaluator/EvaluatorBase.java, Evaluator.java, LHSEvaluator.java, BuildEnvironments.java, types/BottomType.java, types/FType.java and values/Constructor.java, all under ProjectFortress/src/com/sun/fortress/; Specification/basic/inference.tex, Specification/basic/expressions/reductions.tex, Specification/appendices/changes.tex:1

## 1. What changed and why

The rung makes three repairs of walk, all under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`. It changes no line of the library, the checker or the harness.

**The open type parameter (Q1, way 11; row 424's F-bounded half).** The bound of a type parameter can mention the parameter itself, as `SUM[\T extends AdditiveGroup[\T\]\]`'s does. Such a bound is not a type until the parameter's instance is known, so there is no bound to take. Where nothing at a call fixed such a parameter, walk gave it `BottomType`, and a reduction that writes no static argument refused its first element. Walk now leaves such a parameter open:

- `EvaluatorBase.instanceOf` (`EvaluatorBase.java:184-194`) gives the parameter the open type `BottomType.OPEN` when three things hold: the arguments do not fix it, its bound mentions it (`mentionsItself`, `:480`), and its instance is still `BottomType`. This happens at instantiation only (batch 9 rung W's D1), for any generic function, a big operator included. The plain-bounded static parameters of a big operator stay at `BottomType` (D2).
- `BottomType.OPEN` (`types/BottomType.java:36`) is below every type, as `BottomType.ONLY` is, and its `typeMatch` admits every value. The fallback in `FType.subtypeOf` (`types/FType.java:315`) puts no type but `OPEN` itself below it.
- Walk checks a value against a type by `subtypeOf` at four places, and each now admits every value at `OPEN`: `as` and `asif` (`Evaluator.java:105`, `:114`), a `typecase` clause (`:1397`) and a typed local (`LHSEvaluator.java:220`). Every other value check in the evaluator goes through `typeMatch`, which `OPEN` overrides. There are 15 such sites: `NonPrimitive.java:148`, `:171`, `:256`; `Coercions.java:137`, `:215`, `:226`, `:257`, `:276`; `OverloadedFunction.java:1755`; `LHSEvaluator.java:99`; `Simple_fcn.java:45`; `BuildEnvironments.java:229`, `:761`, `:784`; `BaseEnv.java:314`.

So `SUM[j <- 0#4] j` is `6`, `SUM[j <- 0#4] (j / 2.0)` is `3.0` and `PROD[j <- 1#0] j` is `1`. A set comprehension is still built at its elements' type, `NodeSet[\Int\]`, as on the base.

**A trait's override (row 614).** Walk built an object's methods from every method declared in its transitive supertraits (`Constructor.finishInitializing`, `values/Constructor.java:242-270`, and `accumulateEnvMethods`). It dropped an inherited declaration only by name, and only where the object itself declares an `override`. A trait's own `override` declaration dropped nothing. Take `trait W extends S`, where `W` overrides `S`'s `tag` and `dot` over `Number`: `object Wo extends W` ran `S`'s declarations over `ZZ32`, because they are more specific.

Now `Constructor.overriddenInTraits` (`:448`) computes what each trait provides, by the traits chapter: what it declares, and what its immediate supertraits provide, except the declarations that its own `override` declarations override. A declaration is overridden when the override has the same name and self position, and each other parameter type of the declaration is a subtype of the override's (`overriddenBy`, `:504`). A trait method that the object inherits on no path is left out of its methods (`:555`, `:570`). The object's own `override` declarations keep their drop by name.

The reading is row 615's: a type's own `override` declarations override. An object that extends both `W` and `S` still inherits `S`'s `tag`, by the path through `S`, and walk still refuses it at load (row 615's pin, `FunctionalMethodOverrideOtherPathWalk.fss`, green).

**Object expressions under the Meet Rule (row 618).** Batch 10's load check runs `FunctionalMethodMeets` over the traits and objects that components declare (`BuildEnvironments.java:1209-1227`). Walk lifts each object expression to the top level and makes its type later, in `registerObjectExprs` (`interpreter/env/ComponentWrapper.java:156-172`), after that check has run (`interpreter/Driver.java:227`). Now the static `BuildEnvironments.finishObjectTrait`, which gives an object expression's type its supertypes, also runs `FunctionalMethodMeets.check` on that type (`BuildEnvironments.java:993-997`). It does so only for an object expression without static parameters, as the declared check skips generic types.

So take `A` and `B`, each declaring `pick(self)`: walk now refuses `object extends { A, B } end` at load, "Invalid overloading of pick in ...". The compiled checker still accepts that pair (row 570). After this rung, walk refuses at load a program that the checker accepts.

## 2. The tests, failing then passing

The interpreter tests, in `ProjectFortress/tests/`:

- `UnwrittenReductionWalk.fss`, promoted by `git mv` from `XXXUnwrittenSumRungF.fss` (row 424): `emptySum(0)` is `0`, `SUM[j <- 0#4] j` is `6`, `PROD[j <- 1#3] j` is `6`.
- `InferUnfixedFBoundedWalk.fss`, new:
  - `SUM[j <- 0#4] (j / 2.0)` is `3.0`;
  - `PROD[j <- 1#0] j` is `1`;
  - `BIG MIN[j <- 0#4] (j - 2)` is `-2`, and `BIG MAX` is `1`;
  - the set comprehension `{ n^2 | n <- -2:2 }` has 3 elements, `0`, `1` and `4`;
  - `mk()`, of `mk[\T extends Cmp[\T\]\](): BoxU[\T\]`, runs, and its getter answers;
  - `"ab.c".upto('.')` is `"ab"`.
- `XXXUnwrittenEmptyFloatSumWalk.fss`, a new expected failure (NEW-W-1): `emptyRSum(0)`, of `emptyRSum(n: ZZ32): RR64 = SUM[j <- 0#n] (j / 2.0)`, is `0.0` and an `RR64`.
- `XXXUnwrittenBigMinMaxWalk.fss`, a new expected failure (row 473's open half, whose reproducer was `none`; first written here as a new row, NEW-W-2): `BIG MINMAX[i <- 0#4] i` is `(0, 3)`. It was measured first as a plain test. It stops under the open parameter as on the base, so it is gated as an expected failure, as the section says.
- `XXXComprehensionTypedBindingWalk.fss`, a new expected failure (NEW-W-3): `s: Set[\ZZ32\] = { n^2 | n <- -2:2 }`, and `|s|` is `3`.
- `OverrideInTraitWalk.fss`, promoted from `XXXOverrideInTraitWalk.fss` (row 614).
- `FunctionalMethodMeetObjectExpressionWalk.fss` and its `.test`, promoted from `XXXFunctionalMethodMeetObjectExpressionWalk.*` (row 618), with the key `load_exception_contains=Invalid overloading of pick`.

The failing runs went through the harness on the base's code: the worktree as seeded, before the edit was first built at 23:54 UTC.

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h-base ProjectFortress/tests/UnwrittenReductionWalk.fss ... (16 files)   # 2026-10-08T23:46:39Z to 23:46:58Z
    F. interpret tmp/h-base/tests/UnwrittenReductionWalk
    FortressException: CastError
    FAIL: a Int: 1 =/= a Int: 2; W's functional method tag over Number overrides S's over ZZ32, ...   (OverrideInTraitWalk)
     Missing expected refusal at load   (FunctionalMethodMeetObjectExpressionWalk)
    Tests run: 14,  Failures: 5,  Errors: 0

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h-base ProjectFortress/tests/InferUnfixedFBoundedWalk.fss ProjectFortress/tests/XXXComprehensionTypedBindingWalk.fss   # 23:49:10Z to 23:49:13Z
    Unification error: Closure/Constructor for join param 1 (a:BOTTOM) got arg 1.0:RR64 of type Float
    . interpret tmp/h-base/tests/XXXComprehensionTypedBindingWalk ... OK Saw expected exception
    Tests run: 2,  Failures: 1,  Errors: 0

- The fifth failure of the first run was the BIG MINMAX test, still plain then: "MethodClosure simpleJoin(a:Any,b:Any):Any ... has neither body nor def instanceof Method".
- In that run `InferUnfixedFBoundedWalk` failed for another cause: its getter was named `label`, which is a keyword. The getter was renamed `kind` before the second run.
- The two revised expected failures ran on the old code after the edit (`FORTRESS_HOME=/home/user/fortress-base11 /home/user/fortress-base11/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/old-harness ...XXXUnwrittenEmptyFloatSumWalk.fss ...XXXUnwrittenBigMinMaxWalk.fss`, 23:57:33Z): "FortressException: CastError ... OK Saw expected exception", "InterpreterBug ... OK Saw expected exception", "OK (2 tests)".

The first expected failure added, `XXXUnwrittenEmptyFloatSumWalk.fss`, was shown red on a deliberate fix through the harness. For one run (23:58:05Z) its sum was written `SUM[\RR64\][j <- 0#n]`; then the file was restored:

    PASS
     Missing expected failure
    Tests run: 1,  Failures: 1,  Errors: 0

The passing run is the last after the last change of code (the build of 23:55 UTC). It holds the rung's tests and the tests whose verdicts the section keeps:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h-final <the 7 tests above> simpleSum.fss setSum.fss disp0.fss FunctionalMethodOverrideOtherPathWalk.fss/.test XXXInferSeveralBoundsWalk.fss XXXInferThroughBoundWalk.fss XXXInferAboveBoundMentionsParamWalk.fss XXXInferAboveTwoBoundsWalk.fss   # 2026-10-09T00:12:18Z
    OK (15 tests)

## 3. The suites

- `ant testSystem`, once, on the final code (2026-10-08T23:58:21Z to 2026-10-09T00:00:48Z): "Tests run: 132, Failures: 0", "Tests run: 129, Failures: 0", "Tests run: 131, Failures: 0", "Tests run: 128, Failures: 0", "BUILD SUCCESSFUL". That is 520 tests: the last landed gate's 516 (`explorations/compile-ladder/climb-batch-10/gate/summary.txt`) and the 4 new files. The three promoted tests are renames.
- `ant testSpecData`, once (2026-10-09T00:00:59Z): "Tests run: 130, Failures: 0, Errors: 0", "BUILD SUCCESSFUL". The five examples are green: "interpret .../SpecData/examples/preliminaries/Overview.factorial OK", "Overview.Expression.big OK", "advanced/OprDecl.Bracketing OK", "advanced/Generators.ReductionClass OK", "advanced/OprDecl.Postfix OK". On this tree, the condition of POSITIONS, "The specification's examples join the gate at zero red.", is met.
- The checker count and the distance were not run. Every path that the rung adds or changes (`git diff --name-only 83b1cae784df32aac95d9b2c518466583423b092` and `git status --short`) is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` or `explorations/`, so neither stage can move. The paths are the seven Java files of section 1, the eight test files of section 2, `Specification/basic/inference.tex`, `Specification/basic/expressions/reductions.tex` and `Specification/appendices/changes.tex`.
- The ladder subset is empty. No first error in the baseline's `raw/` (`explorations/compile-ladder/baseline-2026-09-19/raw/`, 85 files) or in the newest landed `ladder.tsv` (`explorations/compile-ladder/climb-batch-10/gate/ladder/ladder.tsv`) names anything that the rung touched. `grep -rlE 'EvaluatorBase|BottomType|LHSEvaluator|BuildEnvironments|interpreter\.evaluator\.values\.Constructor|FTypeObject|interpreter\.evaluator\.Evaluator\b' explorations/compile-ladder/baseline-2026-09-19/raw | wc -l` prints 0, and the same words match no row of the `ladder.tsv`. The ladder runs the compiled path, which uses none of these classes.

## 4. R10's read: the 18 demos and the smoke test

Each program ran once under walk on the final code, from 2026-10-09T00:02:25Z to 00:11:55Z, four at a time:

- `FORTRESS_THREADS=1`, and its own empty private caches folder;
- the demos from a scratch copy of `ProjectFortress/demos`, the smoke test from the tree's root;
- no demo edited, and no timing taken.

| program | verdict | first error line |
|---|---|---|
| `explorations/claude_demo.fss` | rc 0, to its last line ("SUM[i <- 1#100] i = 5050") | |
| `BiCGSTAB` | rc 1 | `BiCGSTAB.fss:177:8`: Failed to find any matching overload, args = (65096583124: ZZ64,1.0E9) |
| `BirdCount1m` | rc 1 | `BirdCount1m.fss:28:3-94`: Failed to find any matching overload, args = (1.0,Ratio) |
| `BirdCount1n` | rc 1 | `BirdCount1n.fss:27:3-94`: Failed to find any matching overload, args = (1.0,Ratio) |
| `BirdCount1o` | rc 1 | `BirdCount1o.fss:27:3-94`: Failed to find any matching overload, args = (1.0,Ratio) |
| `BirdCount1p`, `1q`, `1r`, `1s`, `1t`, `1u`, `1v`, `1w`, `1y`, `1z`, `2a`, `2b`, `2c` | rc 0 each | |
| `posFeedback` | rc 0 | |

- The smoke test and 14 of the 18 demos run to the end, as the probe measured under way 11 (`explorations/compile-ladder/plan-9/probes/P1.md`, "What was measured").
- The four that stop do so after their sums, at lines that answer 8 makes explicit: a `ZZ64` divided by an `RR64` (`BiCGSTAB.fss:177`), and an `RR64` juxtaposed with a `QQ` (`BirdCount1m.fss:28` and its two siblings). Neither is row 424's failure.
- On the old code the smoke test stops at its `SUM`, rc 1 (`old-fortress.sh /home/user/fortress-base11 ... explorations/claude_demo.fss`): "Unification error: Closure/Constructor for join param 1 (a:BOTTOM) got arg 98: ZZ32 of type Int".
- Under Q1, the skill's walk example can return to `explorations/claude_demo.fss` (PLAN, batch 11's line), at the curator's word to the skill writer. The line is `references/interpreter.md:68` on this base.

## 5. Old against new

Each probe is a one-expression program under `tmp/`, run with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base11 <worktree>/tmp/old-caches P.fss` and with the worktree's `bin/fortress`:

| program | old (83b1cae78) | new |
|---|---|---|
| `SUM[j <- 0#4] (j / 2.0)` | rc 1: Unification error: ... join param 1 (a:BOTTOM) got arg 1.0:RR64 of type Float | `3.0 : Float` |
| `PROD[j <- 1#0] j` | rc 1: CastError (`FortressLibrary.fss:36`) | `1 : Int` |
| `emptyRSum(0)`, declared `RR64` | rc 1: CastError | `0 : Int` (NEW-W-1) |
| `BIG MIN` / `BIG MAX[j <- 0#4] (j - 2)` | `-2 : Int`, `1 : Int` | the same |
| `{ n^2 \| n <- -2:2 }` | `{0,1,4} : NodeSet[\Int\]` | the same |
| `s: Set[\ZZ32\] = { n^2 \| n <- -2:2 }` | rc 1: RHS expression type NodeSet[\Int\] is not assignable to LHS type Set[\ZZ32\] | the same (NEW-W-3) |
| `{[\ZZ32\] n^2 \| n <- -2:2 }` at the same binding | not run | `NodeSet[\ZZ32\]`, size 3 (the workaround) |
| `mk()`, `mk[\T extends Cmp[\T\]\](): BoxU[\T\]` | `BoxU[\BOTTOM\]` | `BoxU[\OPEN\]` |
| `"ab.c".upto('.')`, `.beyond('.')` | `ab`, `c` | the same |
| `BIG MINMAX[i <- 0#4] i` | rc 1: InterpreterBug, simpleJoin(a:Any,b:Any) ... has neither body nor def | the same (row 473) |
| `explorations/claude_demo.fss` | rc 1 at its `SUM` | rc 0 |

Three probes of the open type's reach ran on the new code only. Each uses a generic object instantiated at the open type (`Holder[\OPEN\]`).

These methods run:

- `take(x: T)` on `3`;
- `pair(x: (T,T))` on `(3,4)`;
- `two(a: (T,T), b: (T,T))`, not overloaded, on two pairs;
- `over(x: T)`, overloaded with `over(x: String)`, on `3`;
- `one(a: T)`, beside an inherited abstract `one(a: Any): Any`, on `3`.

But `sj(a: (T,T), b: (T,T))`, beside an inherited abstract `sj(a: Any, b: Any): Any`, is not chosen for two pairs. The abstract one runs: "MethodClosure sj(a:Any,b:Any):Any ... has neither body nor def". The same object at `ZZ32` chooses its own `sj`. That is row 473's shape: `MinMaxReduction`'s `simpleJoin` beside `AssociativeReduction`'s.

## 6. Where the fixes belong, and the precedents

- **The open parameter.** It belongs in walk's instance of a call's static parameters, `EvaluatorBase.instanceOf`: `explorations/coordinator/map/modules-and-phases.md` places walk's inference in `interpreter/evaluator/`, as the skill's `interpreter.md`, "How walk evaluates a program", does.
  - Precedent: the probe's patch `P1-open.patch`. It applied to this base with offsets only (`git apply --check -v`: "Hunk #1 succeeded at 178 (offset 6 lines)", "Hunk #2 succeeded at 474 (offset 53 lines)"). Since the probe's base, one commit has changed walk (`git log cec70988b..83b1cae78 -- ProjectFortress/src/com/sun/fortress/interpreter/`: `833420ce4`, batch 10).
  - The same shape in the file: batch 9's `boundAtInstances` block after the first loop, beside which the new block sits.
- **The trait's override.** It belongs where an object's methods are gathered from its traits, `Constructor.finishInitializing`. The methods table that dispatch reads is built there, and `FunctionalMethod.applyInnerPossiblyGeneric` sends a functional method's call to that table (`values/FunctionalMethod.java:74-78`).
  - Precedent: batch 10's `FunctionalMethodMeets.providedBy` and `inherited` (`OverloadedFunction.java:1166-1234`), the same per-type reading of `override`, which the load check already applied. The rung follows it for dotted and functional methods alike.
  - The other site in `Constructor.java` that gathers trait members, `accumulateGenericMethods`, gathers generic methods and applies no `override`. It is left as it was, unmeasured: no test or library declaration overrides a generic method in a trait. The library declares no `override` at all: `grep -n override Library/*.fss ProjectFortress/LibraryBuiltin/*.fss` finds only four comment lines.
- **The object expressions.** Precedent: batch 10's `checkFunctionalMethodMeets`. The object expression's type is finished at one site, `finishObjectTrait`. `ComponentWrapper.registerObjectExprs` calls it for a non-generic object expression, and `FTypeGeneric` (`types/FTypeGeneric.java:274`) calls it for a generic one's instances. The check skips the second, as the declared check skips generic types.

Section 9 gives the ways that each repair had and the one taken.

## 7. What the specification settles

- The desugaring of a reduction is directed by type (`reductions.tex`; `defining-generators.tex`, subsection "Simple Desugaring of Expressions with Generators"). `SUM[j <- 0#4] (j / 2.0)` is `SUM[\RR64\]`, which gives `3.0`, and an empty one is `RR64`'s zero. Walk has no static types and cannot choose `N`. Leaving the parameter open gives the same values where elements exist (section 5); the empty case is NEW-W-1.
- `traits.tex`, section "Method Declarations": a trait inherits from its immediate supertraits all their declarations except those that are overridden. An `override` declaration overrides an inherited one of the same name and self position whose parameter type is a strict subtype of its own. Row 614's test and row 615's pin both follow this text, read per type.
- `advanced/overloading.tex`, section "Meet Rule": the Meet Rule for Functional Methods covers declarations "occurring in trait or object declarations or object expressions". No passage names rows 614 or 618, and neither row needs a change of text.
- `comprehensions.tex`, section "Comprehensions": "Comprehensions evaluate to aggregate values and have corresponding aggregate types". So `{ n^2 | n <- -2:2 }` over `ZZ32` is a `Set[\ZZ32\]` (NEW-W-3).

## 8. Sentences of the specification and the record made false

Edited by this rung (the judgement's section 3), with the lines on the base:

- `Specification/basic/inference.tex:285-289`: "It still erases to \TYP{BottomType} a type parameter whose bound mentions the type parameter itself, as the big operators $\sum$ and $\prod$ declare theirs, and the static parameters of a big operator that a reduction or a comprehension invokes without its static arguments ..."; now at `:285-302`.
- `Specification/basic/expressions/reductions.tex:31-33`: "When no argument of the big operator fixes the element type, the interpreter takes \TYP{BottomType} for it, and the reduction then accepts no element (row~424 ...)"; now at `:31-47`.
- `Specification/appendices/changes.tex`, entry "Reductions whose element type nothing fixes": the Rationale's "The interpreter takes \TYP{BottomType} for the static parameter of a big operator that no argument fixes (row~424 ...)" (`:1029-1030`) and the Effect's "None beyond the box" (`:1041`). Amended at `:1024-1032`, `:1038-1052` and `:1065-1072`.
- `Specification/appendices/changes.tex`, entry "The inference of a call's static arguments": the Rationale's "By decision, a type parameter whose bound mentions the type parameter itself keeps \TYP{BottomType}: ... and the revival has not yet decided that case." (`:1738-1741`), and "... leaves unchanged the case of a type parameter whose bound mentions itself, which the revival has not yet decided." (`:1756-1757`). Amended at `:1724-1734`, `:1779-1794`, `:1806-1807` and `:1916-1923`.

Not edited here, for the gather and the skill writer:

- FACTS, "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound ...": "Left at `BottomType`: an F-bounded parameter, a big operator's static parameters (D2), ..." (record.md gives the replacement).
- FACTS, "`ant testSpecData` runs 130 ... and 5 are red, all of one cause" (record.md).
- FACTS, "Walk applies at load the Meet Rule for Functional Methods ...": "runs `OverloadedFunction.FunctionalMethodMeets` over every trait and object without static parameters", and "the residues are rows 611, 612, 614, 616 and 618" (record.md).
- `.claude/skills/fortress-repo/SKILL.md:126`: "Under walk, one whose bound names the parameter itself, such as `SUM`'s, still gets the empty type `Bottom` (ledger row 424)."
- `.claude/skills/fortress-repo/references/library.md:25`: "Under walk, a call without it fails at its first element (ledger row 424)."
- `.claude/skills/fortress-repo/references/interpreter.md:68`: "Do not use `explorations/claude_demo.fss`: it dies under walk (ledger row 424)."
- `.claude/skills/fortress-repo/references/tests-running.md:54`: "Five of its examples fail today: reductions written without their element type."
- `.claude/skills/fortress-repo/references/revival-changes.md:65-69`, "A type parameter that a call does not fix", stays true; record.md gives the entries for this rung's changes.
- The judgement (`explorations/reviews/p1-judgement.md:74`, `:89`) reads a variable declared `Set[\ZZ32\]` as admitting the comprehension under way 11. Measured, the variable refuses it under way 11 as on the base (NEW-W-3).

## 9. Decisions

1. **The open type, as the probe built it** (Q1, way 11; POSITIONS, "The order of the work after batch 10.", with its questions at their recommendations).
   - Ways not taken, each measured or read by the probe (`P1.md`): `ZZ32` (way 1), `Any` (9), the bound without the parameter (10) and refusal (12). The library's devices (ways 4 and 5) and respelling the programs (way 6) are ruled out by R10 and POSITIONS, "The specification's examples join the gate at zero red."
   - Within way 11, the open type is given only at instantiation, and for any generic function, not for big operators only (the judgement's section 4 default).
2. **The plain-bounded static parameters of big operators stay at `BottomType`** (D2). Not taken: the open type for them too, the judgement's section 5 candidate. It is not measured here: D2's six tests are its measure, and the section names no such change. It is left for the next walk rung, with the candidate noted on D2's entry (record.md).
3. **Row 614 by the per-type reading of `override`**, row 615's landed reading. Not taken:
   - dropping by name, as walk does for an object's own `override`: that drops unrelated overloads of the name;
   - dropping a declaration overridden on any path, not on every path: that makes `FunctionalMethodOverrideOtherPathWalk` load, against row 615's pin, which the section keeps;
   - comparing by strict subtype only, the chapter's "strict subtype": the chapter's second clause already makes an equal parameter type not inherited, so the rung follows `FunctionalMethodMeets.inherited`, which is not strict.
4. **Row 618's check where the object expression's type is finished.** Not taken:
   - `checkFunctionalMethodMeets`, which runs before walk makes those types (`Driver.java:227`);
   - `ComponentWrapper.registerObjectExprs`, under `interpreter/env/`: the section's files do not name it, and it would put a path outside the paths that the stages cannot read;
   - `Constructor.finishInitializing`, which runs for every object and every instance.

   Generic object expressions are not checked, as generic declared types are not.
5. **The unwritten `BIG MINMAX` gated as an expected failure.** The section says: "measured first, then gated as a plain test or an expected failure", and it stops under the open parameter as on the base. Not taken: widening the open type at overload dispatch over tuples, which is beyond the probe's patch and unmeasured.
6. **The comprehension's typed binding as an expected failure of its own (NEW-W-3).** Not taken: keeping it in the plain test, which is red under every way, or dropping it, since a measured defect needs a home. The plain test keeps the comprehension, its size and its members.
7. **The empty sum's assertion of its type.** Not taken: the value alone, which passes since `0 = 0.0` under walk, so that the expected failure would never have been red.
8. **No decision record.** The section asks for none. The Appendix I entries cite the judgement, `explorations/reviews/p1-judgement.md`, as the full reasoning.
9. **The demos with private caches, four at a time**, as the probe ran them. The 18 are the rows of `demos-count.txt` whose failure was row 424's (`git show ab067d9b6^:explorations/compile-ladder/rung-flat-tower/probes/demos-count.txt`).

## 10. Points to report

- An interpreter test whose verdict changes other than by the rung's intent: none. `ant testSystem` has 0 failures in 520 tests. The verdicts that change are the three promotions, by intent.
- A library type or a team test that walk now refuses at load: none. Every test loads the library, and `testSystem` is green.
- A change to which declaration walk runs for a set it loads today, beyond row 614's: none found. The library declares no `override`. The team's tests that declare one (`disp0.fss`, `disp1.fss`, `FunctionalMethodMeetProvided.fss`) declare it on objects, whose handling is unchanged, and they pass.
- Each place where a program can now print `OPEN`:
  - the type of a value of a generic type instantiated at an open parameter, as `ilkName` prints it (`BoxU[\OPEN\]`, `Holder[\OPEN\]`, section 5);
  - by reading, any walk diagnostic that prints such a type, or an overload's domain at it;
  - the inference trace (`fortress.inference.trace`), with the rule `open`.

  The specification's text names no type (`inference.tex:285-289`).
- The empty unwritten reduction over a type other than `ZZ32` that gets `ZZ32`'s identity: NEW-W-1, `ProjectFortress/tests/XXXUnwrittenEmptyFloatSumWalk.fss:6`.
- Each of the 18 demos and the smoke test: section 4.
- A team test line changed or a demo edited: none.
- Normative text changed beyond the passages that the judgement's section 3 names: none. The edits are the box, the note and the two Appendix I entries.
- A library, checker or test-harness edit: none.

## 11. Defects, each with its home

- Row 424's F-bounded half: home 1, repaired; `UnwrittenReductionWalk.fss`, `InferUnfixedFBoundedWalk.fss`.
- Row 614: home 1, repaired; `OverrideInTraitWalk.fss`.
- Row 618: home 1, repaired; `FunctionalMethodMeetObjectExpressionWalk.fss` and its `.test`.
- NEW-W-1, an empty unwritten reduction over a type other than `ZZ32` takes `ZZ32`'s identity: home 2, settled by the desugaring by `N`; `XXXUnwrittenEmptyFloatSumWalk.fss`.
- Row 473's open half (first written here as a new row, NEW-W-2), an unwritten `BIG MINMAX` stops: home 2, the reduction's answer being `(0, 3)`; `XXXUnwrittenBigMinMaxWalk.fss`.
- NEW-W-3, a set comprehension built at its elements' run-time class is refused by a variable declared `Set[\ZZ32\]`: home 2, settled by the comprehension's aggregate type; `XXXComprehensionTypedBindingWalk.fss`. It is present on the base too.
- The compiled path: rows 425 and 570 stay as they are. Neither is this rung's.

## 12. Commands worked out

- `nohup tmp/rung-walk-open-param/demos/run-demos.sh > tmp/rung-walk-open-param/demos/run.log 2>&1 &` runs the demos in the background. Claude Code's removal check refused the skill's `run_bg`, a `bash -c` script, because it could not read the script. So the long runs here were a script file under `nohup`, or `ant` in the foreground with a log and a 600 s limit.
- After the specification build, the skill's check `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log` prints 40 on this tree. All 40 lines are one macro's text in the log (`x@warning {Reference `#1' on page \thepage \space undefined}}{}`). `grep -c "LaTeX Warning: Reference\|LaTeX Warning: Label .* multiply\|^! Undefined control sequence" fortress.log` prints 0. Both `./ant genSource` and `./ant tex` ended "BUILD SUCCESSFUL", and the build's files were removed with `git clean -fXq -- Specification`.

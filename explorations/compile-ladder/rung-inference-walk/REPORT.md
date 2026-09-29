# Rung K (`rung-inference-walk`): walk infers a generic's static arguments with coercion

problem: row 388's call `gf(NarrowOf(2), "two")` and row 389's `f(NarrowGOf[\ZZ32\](2))`, refused at the base (`explorations/compile-ladder/rung-inference-walk/probes/tests-base.txt:27-29`, `:40-41`), and `scaleK(b, z)` for `b: BoxK[\RR64\]`, refused as `T = Number` (`probes/tests-base.txt:3-4`), at `ProjectFortress/tests/CoercionGenericFnRungC.fss:25`, `ProjectFortress/tests/CoercionGenericTraitRungC.fss:25`, `ProjectFortress/tests/InferCoercionRungK.fss:38`
spec: arguments to functionals are a coercion context (`Specification/basic/conversions-coercions.tex:119-120`), a declaration applicable with coercion (`:430-432`), coercion resolution and the rewritten call (`:472-476`, `:533-553`), resolved statically (`:598-601`); static parameters inferred before applicability (`Specification/basic/overloading.tex:170-174`); the promotion the revival's callout names (`Specification/basic-lib/basic-integers.tex:90-94`), with POSITIONS 2026-09-26 answer 8 and 2026-09-28 the conversion rule; the chapter itself a note (`Specification/basic/inference.tex:15`)
precedent: probe K's logging shadow of the same three places (`explorations/compile-ladder/plan-n/probe-k/shadow.patch:16-396`, `:407-543`, `:555-728`); rung C's per-argument coercions for a plain overload (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:838-852`); the checker's lifted coercion instantiated with the target's arguments (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:217-220`); the team's per-run reset of a static cache (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeGeneric.java:52-54`)
deviation: the shadow logged both rules and ran one, the edit runs the rule and falls back to today's unification only when no instance admits every argument (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:57-62`); the shadow moved the promoted generic out of `bestMatchInternal`'s pass, the edit keeps that pass's choice and re-instantiates its winner (`OverloadedFunction.java:879-929`); a generic instance that the coercion pass finds taking the arguments unconverted is applied as itself, not as a converted call (`:858`, `:869`); a lifted coercion's own inference stays today's unification (`Coercions.java:73`); the reverse lookup's per-environment cache, reset per run from `Init.initializeEverything` (`Coercions.java:163-168`, `Init.java:44`); walk has no counterpart of the specification's statically chosen coercion (`conversions-coercions.tex:598-601`) and chooses from run-time types (`EvaluatorBase.java:254-304`)
historical: (`values/Coercions.java` is climb batch 4's rung C's, `b628871a2`) `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:48-313`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:787-929`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Init.java:17`, `:44`

**About this file.** The harness refused the first pass's write of `REPORT.md`, and its text reached the judge only as the worker's `reportText`. The repair round's prompt does not carry that text, and the harness refused the repair round's write of `REPORT.md` too. So this text is written by the repair round from the branch's commits, `record.md`, `SKEPTIC.md`, `JUDGE.md` and the captures, with the judge's amendments (`JUDGE.md` section 4, step 15) applied, and every claim here was re-read against the tree or re-run. The decisions the skeptic and the judge cite by letter keep their letters: B, the lone parameter's candidates; C, the edit to `bestMatchInternal`; D, the refusal kept where no instance admits the arguments. The other letters are this file's. Where the worker's `reportText` words a point differently, this file is the one re-verified on the repaired tree.

**What the repair round inherited.** The branch through `f2f3c5e27`, the judge's ruling:
- the edit (`a686b4504`), with its tests and recorded failure (`0dc881cb9`);
- the one-shape and RuleCRun runs, the three-pass comparison, and the demos and microGPT comparisons (`3218bed4b`, `34235e4b2`, `b9d21288f`);
- `record.md` (`7f8399e45`), and the skeptic's and the judge's files.

What the repair round re-ran: the six walk tests through the harness, the skeptic's 26 programs under walk, row 388's twelve shapes on the base and on the repaired tree, the heap probe, the checker count, and the load-time verdicts from the passes' logs. It did not re-run the three-pass comparison, since the reset changes no output: the 26 programs print exactly what they printed before it (`explorations/compile-ladder/rung-inference-walk/probes/repair/walk-repair-diff.txt`).

## 1. The problem, measured at the base

- Walk infers in `EvaluatorBase.inferAndInstantiateGenericFunction`. It unifies every argument's run-time type with its declared parameter type, whether or not that type mentions a static parameter, before any conversion, and it joins two lower bounds to a common supertype (`FType.join`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:350-380`). So:
  - `gf(NarrowOf(2), "two")` is refused, "Cannot unify NarrowOf ... with Wide" (row 388; `probes/tests-base.txt:27-30`);
  - `scaleK(b, z)` instantiates `T = Number`, and the binding refuses `BoxK[\RR64\]` for `BoxK[\Number\]` (`:3-4`);
  - `same(z, w)` runs at the join, unconverted (`probes/oneshape-base.txt`, `SameZW`).
- Rung C's coercion pass skipped every generic declaration (`OverloadedFunction.java:826` at the base, `if (sfn instanceof GenericFunctionOrMethod) continue;`).
- A declaration chosen by `bestMatchInternal`'s subtyping pass kept the join instance: `OpAnyZW`'s `op(z, w)` printed `op generic[ZZ32,ZZ64]` (`probes/shapes-base.txt`, `OpAnyZW`).
- A generic trait's coercion was not applied (row 389): `Coercions.coercionFor` inferred the lifted coercion from the value alone (`probes/tests-base.txt:40-41`).
- Row 486: `u: NN32 = n` for `nat n = 3` is refused, "RHS expression type Int is not assignable to LHS type NN32" (`probes/tests-base.txt:14-15`), where the compiled run prints 3.
- Row 388's flat-tower consequence, found by the skeptic and measured whole by the repair round. With an `RR64` matrix `m`, an `RR64` array `a` and a `ZZ32` `i`, nine shapes are "Failed to find any matching overload" at the base: `m i`, `i m`, `m DOT i`, `a + i`, `i + a`, `a - i`, `i - a`, `a MIN i` and `i MAX a` (`explorations/compile-ladder/rung-inference-walk/probes/repair/row388-base.txt:9-17`). `m.scale(i)` and the two controls run.

## 2. What changed

The edit is in three places, as the decisions name them, plus one reset. The decisions are POSITIONS 2026-09-27, the numerics plans, decision 3 ("walk does the same at dispatch"), and 2026-09-28, the two decisions of the conversion judgement, decision 1, with the judgement's section 3.

1. **Inference** (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:48-313`).
   - `inferAndInstantiateGenericFunction` (`:57-62`) now tries `inferWithCoercion` (`:75-87`, `:89-225`). When that finds no instance, it runs today's inference, kept whole as `inferByUnification` (`:312` on).
   - The first pass (`:140-181`) unifies, as before, three kinds of argument: those whose declared type mentions a static parameter other than as the whole type, a functional method's `self`, and a varargs parameter (`:151-156`). An argument whose declared type mentions no static parameter is left to the binding, which converts it (rung C's `Coercions.coerce` in `NonPrimitive.buildEnvFromParams` and `typecheckParams`). A type parameter that is the whole declared type of some argument is collected for the second pass.
   - The second pass (`:182-194`) handles each such lone parameter. If nothing else fixed it, it gets the narrowest type that every one of its arguments is a subtype of or converts into (`narrowest`, `:254-304`; decision B). If the first pass fixed it, its arguments are left to the binding.
   - The instance is kept only if its domain admits every argument by subtyping or one coercion (`:210-217`, `Coercions.admits`).
2. **Dispatch** (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:787-929`).
   - The coercion pass (`bestMatchWithCoercion`, `:823-870`) keeps generic declarations, each instantiated by the rule (`:829-837`). Its per-argument coercions are built against the instantiated domain, as rung C builds them for a plain one (`:838-852`). An instance that takes the arguments with no coercion is returned as itself (`:858`, `:869`; decision E).
   - `bestMatchInternal` (`:879-929`) chooses as before. Its loop's inference is renamed to today's `inferByUnification` (`:898`), so the choice is today's.
   - With `reinstantiate`, the chosen generic declaration is instantiated again by the rule before it is applied (`:916`, `:920-927`; decision C). `bestMatch` sets the flag (`:790`); `bestMatchWithoutCoercion` does not (`:809`).
3. **A generic trait's coercion** (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:58-130`).
   - `coercionFor` first instantiates a generic target's lifted coercions with the target's own static arguments (`genericCoercionFor`, `:92-130`), as the checker does ("the lifted args are given in U", `CoercionOracle.scala:217-220`).
   - A lifted coercion's own inference stays today's (`:73`; decision F).
   - The file also gains the helpers the rule reads: `admits` (`:136-151`), `convertsInto` (`:156-161`), and the reverse lookup `coercionTargets` (`:199-219`). The reverse lookup reads `coercionTypes` (`:174-191`), which caches, per top-level environment, the non-generic types that declare a coercion (`coercionTypesByEnv`, `:163-164`; decision I).
4. **The cache's reset** (the repair round). `Coercions.reset()` clears that cache (`Coercions.java:166-168`). `Init.initializeEverything` calls it between `NativeApp.reset()` and `Driver.reset()` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Init.java:44`, its import at `:17`), as it resets every other static cache of interpreter objects (`Init.java:28-45`; `FTypeGeneric.java:52-54`, `GenericFunctionOrMethod.java:70-72`, `NativeApp.java:221-224`). Without it, the map kept every run's library environment for the life of a harness JVM: the skeptic's refusal, and decision J.

Nothing under `interpreter/glue/prim/`, `FIntLiteral.java`, the library, the checker or the specification is edited. The load-time check (`OverloadedFunction.java:416-425`, `:519-527`) is untouched: the file's hunks start at `:787`.

## 3. The tests

In `ProjectFortress/tests/` (walk), gated by `testSystem`:
- `CoercionGenericFnRungC.fss` and `CoercionGenericTraitRungC.fss`, promoted by `git mv` from their `XXX` names (rows 388 and 389).
- `InferCoercionRungK.fss`: the rule's shapes. Each value is shown with its type through `shownK` (`:6-13`), and each message cites its source (`:37-50`).
  - `scaleK(b, z)` and `scaleK(b, 3)` at `RR64`.
  - `sameK(z, w)`, `sameAddK(z, w)`, `lohiK(z, w)` and `twiceK(l, z)` at `ZZ64`.
  - `sameK(z, r)` at `RR64`, and `pickK(z, u)` at `ZZ64`.
  - `pickK(l, r)` unconverted, as answer 8 keeps `ZZ64` into `RR64` explicit.
  - `ogK(b, z)`, a generic declaration chosen by coercion.
  - `opK(z, w)`, the conversion rule's shape: the generic chosen and run at `ZZ64`.
  - Controls beside them.
  - The repair round adds row 388's container shapes (`:51-67`). It declares an `RR64` matrix and array as the flat-tower rung's script builds them, and uses the test's `z: ZZ32 = 3` as the scalar. Each message is "row 388: the container fixes T at RR64 and the ZZ32 scalar converts at binding; conversions-coercions.tex:119-120". The assertions:
    - `(a + z)[1]` and `(z + a)[1]` are `3.25 : RR64` (`:59-60`);
    - `(a - z)[1]` is `-2.75 : RR64` (`:61`), and `(z - a)[1]` is `2.75 : RR64` (`:62`);
    - `(a MIN z)[0]` is `1.5 : RR64` (`:63`), and `(z MAX a)[0]` is `3.0 : RR64` (`:64`);
    - `(m z)[0,0]`, `(z m)[0,0]` and `(m DOT z)[0,0]` are `4.5 : RR64` (`:65-67`).
- `XXXNatValueNN32RungK.fss`: row 486's owed test, home 2. It restates `SkNatType`'s T3 line as an assertion (`:26`) with its `ZZ32` control (`:25`), and fails at the binding (`:19`) with walk's message.
- `XXXInferExpectedTypeRungK.fss`: the expected type at a generic result, home 2 (`:22-23`; row 510; section 9).
- `XXXInferVarargsRungK.fss` (the repair round): a varargs parameter `T...` over a `ZZ32` and a `ZZ64`, home 2. Its control `varK(z, z)` passes (`:19`), and `varK(z, w)` fails at `:20` with its message, answer 8 (decision K).

In `ProjectFortress/compiler_tests/` (the compiled path), the repair round adds three files in row 366's shape (`XXXOprParamRungS.fss`, `XXXOprParamRungS.test`, `OprParamRungSLink.test`):
- `XXXUnionOfThreeRungK.fss`, the program;
- `XXXUnionOfThreeRungK.test` (`run`, `run_out_contains=REACHED`), an expected failure;
- `UnionOfThreeRungKLink.test` (`link`), which passes.

The program calls `triK(OneK, TwoK, ThreeK)` over three sibling objects. It compiles and dies with `NoSuchMethodError: ... Union$RTTIc.factory(RTTI, RTTI, RTTI)` (row 512; decision L).

**The recorded failure.** `explorations/compile-ladder/rung-inference-walk/probes/tests-base.txt` was captured at 2026-09-28T23:03:09Z on the base build and committed in `0dc881cb9`, before the edit's commit `a686b4504`:
- `InferCoercionRungK` stops at `scaleK(b, z)` (`:3-4`);
- `XXXNatValueNN32RungK` stops at its `NN32` binding (`:14-15`);
- the two promoted tests stop at their `:25` (`:27-29`, `:40-41`).

For what the repair round adds:
- the container assertions: all nine shapes refused on the base build (`tmp/home-base`, `bce66f1fa`) by the flat-tower rung's own script (`explorations/compile-ladder/rung-inference-walk/probes/repair/row388-base.txt:9-17`);
- the varargs expected failure: the failing assertion at `:20` (`explorations/compile-ladder/rung-inference-walk/probes/repair/xxx-varargs.txt`);
- the compiled pair: the crash (`explorations/compile-ladder/rung-inference-walk/probes/repair/xxx-union-compiled.txt:10-20`).

**The recorded pass.**
- The first pass: `explorations/compile-ladder/rung-inference-walk/probes/tests-edit.txt`, and through the harness at `build.xml`'s `systemShard` settings, `probes/harness-edit.txt` (`OK (4 tests)`).
- The repaired tree, through the harness (`explorations/compile-ladder/rung-inference-walk/probes/repair/harness-repair.txt`, `OK (6 tests)`):
  - `InferCoercionRungK`, with its nine new assertions, prints `PASS`, as do `CoercionGenericFnRungC` and `CoercionGenericTraitRungC`;
  - `XXXNatValueNN32RungK`, `XXXInferExpectedTypeRungK` and `XXXInferVarargsRungK` are each "OK Saw expected exception" at the line their messages name.
- Row 388's twelve shapes on the repaired tree (`explorations/compile-ladder/rung-inference-walk/probes/repair/row388-edit.txt:8-19`): every line equals the nested tower's (`explorations/compile-ladder/rung-flat-tower/probes/row388-base.txt:8-19`; `probes/repair/row388-compare.txt`).
- The compiled pair: the link test is `OK` (`probes/repair/xxx-union-compiled.txt:2-9`). The run test prints `REACHED`, then the `NoSuchMethodError`, then "Saw expected failure", and ends `OK` (`:10-20`). The same program under walk prints `PASS` (`:21-26`).

**The expected failures shown red.**
- The rung's first `XXX` file, `XXXNatValueNN32RungK`, went red through the harness on a stand-in whose one change is `u: NN32 = unsigned(n)`: "Missing expected failure" (`probes/xxx-harness.txt:16-35`).
- The compiler pair's run test went red on a stand-in whose one change writes the static argument, `triK[\KindK\](OneK, TwoK, ThreeK)`, linked first: "Did not see expected failure", `FAILURES!!!` (`probes/repair/xxx-union-compiled.txt:27-52`).

## 4. Where the fix belongs, and the precedent

- **Where.** The map's interpreter row and the shadow's section 6 (`explorations/reviews/inference-rule-shadow.md:116-123`) name the three places, and the batch record names the same files for K. The admission half already exists:
  - an instantiated function's arguments are converted at binding by rung C's `Coercions.coerce` (`NonPrimitive.java:134-185`, `:212-257`);
  - a generic that is not overloaded is applied through `GenericFunctionOrConstructor.applyInnerPossiblyGeneric` (`evaluator/values/GenericFunctionOrConstructor.java:50-57`), whose instantiated closure converts at binding.

  What refused was the inference half and the coercion pass. The reset belongs where the team resets every such cache, `Init.initializeEverything` (`Init.java:27-45`). It is the one file this rung edits outside the record's list.
- **Precedent, and in how many ways.**
  - Probe K's shadow is the one prior build of the rule under walk (`explorations/compile-ladder/plan-n/probe-k/shadow.patch`: the inference `:16-396`, the dispatch `:407-543`, the coercion `:555-728`). It ran the rule or today's inference by a switch and logged the difference; its measurement over the corpus is `explorations/compile-ladder/plan-n/probe-k/PROBE-K.md` section 6. The edit copies its three places and differs where the decisions differ from the shadow (the deviation line).
  - The per-argument coercions of the coercion pass are rung C's own (`OverloadedFunction.java:838-852`).
  - The generic target's coercion follows the checker (`CoercionOracle.scala:217-220`).
  - The cache's reset follows the ten `reset()` calls of `Init.initializeEverything`. The team has one idiom for a static cache of interpreter objects, and every other such cache uses it (`FTypeGeneric.java:52-54`, `GenericFunctionOrMethod.java:70-72`, `NativeApp.java:221-224`), so the rung's map was the one site without it.
- **A precedent that repaired a defect is evidence of the same defect elsewhere.** Rung C's coercion code sets generic declarations aside in three places:
  1. the coercion pass's `continue`, removed here;
  2. `coercionFor`'s inference of a generic target, repaired here (row 389);
  3. `Coercions.addSource` (`Coercions.java:301-305`), which leaves a generic `coerce` out of the sources the specificity relation reads.

  The third is left unmeasured and named for Pavol (section 11): no library, test or microGPT declaration reaches it.

## 5. What the specification settles

- Arguments to functionals whose parameters have declared types are a coercion context (`Specification/basic/conversions-coercions.tex:119-120`). A declaration is applicable with coercion when each argument is substitutable for its parameter type (`:430-432`), where substitutable is subtype or coerces, and coercion does not chain (`:424-425`). So `gf(NarrowOf(2), "two")` and `scaleK(b, z)` are valid calls that convert, and the rows are the implementation's.
- Resolution: a declaration applicable without coercion is chosen first. Failing one, the call is rewritten with coercions to the most specific declaration applicable with coercion (`:472-476`, `:533-553`). The conversion rule (POSITIONS 2026-09-28) adds that the chosen generic is instantiated by answer 8's promotion. Walk keeps the order: the subtyping pass first, the coercion pass only when it finds nothing.
- Static parameters are inferred "before checking the applicability of the declaration to the call" (`Specification/basic/overloading.tex:170-174`), by the chapter that is today a note (`Specification/basic/inference.tex:15`). The revival's callout says a generic call over two different integer types is to infer the narrowest type both coerce into (`Specification/basic-lib/basic-integers.tex:90-94`), which is answer 8.
- Coercion is resolved statically (`conversions-coercions.tex:598-601`). Walk has only run-time types, so where a static type is wider than its value the paths differ; the conversion judgement takes walk's promotion from run-time types as its default (section 8).
- Type parameters have no coercions (`conversions-coercions.tex:363-365`). An argument's conversion is always into a concrete instance's parameter type, which is what re-instantiation before binding gives.
- Two points the rung gates but does not repair:
  - the expected type at a call written `f(x)`: "the static arguments are statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:38-40`), with decision 3;
  - a `nat` parameter is usable where an `NN32` variable can appear (`Specification/basic/trait-parameters.tex:83-86`), with POSITIONS 2026-09-28, a size used as a value.

## 6. Decisions

- **A. Which positions the first pass unifies.** As the shadow read it:
  - an argument whose declared type mentions a static parameter other than as the whole type fixes it by unification, as today;
  - `self` of a functional method and a varargs parameter are unified as today;
  - an argument whose declared type mentions no static parameter is left to the binding.

  The alternatives were the shadow's form, which is the same split, and unifying lone positions too when another position fixes the parameter, which is today's refusal of `scale(b, z)`.
- **B. How a lone parameter's choice reads a run-time type.** Walk's run-time types are the implementation classes under the library's traits (`Int` under `ZZ32`, row 432). So a candidate set of the arguments' own types would never hold `ZZ64` for a `ZZ32` with a `ZZ64`.

  The candidates are:
  - each argument's run-time type with all its supertypes (`EvaluatorBase.java:259`);
  - the types a coercion takes it into, found by a reverse lookup of the lifted `coerce_` names at the top level of the library, of the function's component, and of the value's type's component (`:260`, `Coercions.coercionTargets`);
  - the parameter's bounds.

  The rule keeps the candidates that every argument is a subtype of or converts into, and that the bounds admit. The answer is the kept candidate that is a subtype of, or converts into, every other one. If there is not exactly one, the rule gives no instance for that parameter, and it is unified as today.

  So arguments of one run-time class keep it: `T = Int` for two `ZZ32`s, and row 364 is unchanged. Arguments of different classes take the library's trait:
  - `ZZ64` for a `ZZ32` with a `ZZ64` or an `NN32`;
  - `RR64` for a `ZZ32` with an `RR64`;
  - `Number`, with nothing converted, for a `ZZ64` with an `RR64`.

  **Its reach beyond numbers, disclosed by the repair round.** The same candidates reach a user coercion into another argument's type or supertype. Take `userS[\T\](a: T, b: T)` called with `(AaaOf(1), CccOf(2))`, where `trait Aaa` declares `coerce(x: Ccc)`. It printed `Aaa Ccc` at the base and prints `Aaa Aaa` after: `T = Aaa`, with the `CccOf` converted (`explorations/compile-ladder/rung-inference-walk/probes/skeptic/walk-base.txt:74-75`, `probes/skeptic/walk-edit.txt:56-57`). The stock compiled run converts nothing (`probes/skeptic/compiled.txt:117-119`).

  Either candidate source yields `Aaa` by reading, so removing the supertypes alone would not change the call:
  - `AaaOf(1)`'s supertypes hold `Aaa` (`:259`);
  - the reverse lookup finds `Aaa`'s lifted coercion in the function's component, and keeps it because `coercionFor(Aaa, CccOf(2))` is not null (`:260`; `Coercions.java:199-219`, `:174-191`).

  This matches the record's words for K, "a parameter that stands alone takes the narrowest type its arguments convert into" (`explorations/coordinator/CLIMB-BATCH-N.md:1503`). It goes beyond rung T's chapter as the record specifies it, "the narrowest of its arguments' types and its bound", with answer 8 as the number case (`CLIMB-BATCH-N.md:245`). Walk cannot tell this call from the same call over variables declared `Aaa` and `Ccc`, where the checker's candidates would hold `Aaa` too. Left as built. It goes to Pavol (section 11), and the gather is asked to run `SkK17` on rung I's build.

  A generic constructor takes the rule as a function does (`GenericFunctionOrConstructor.java:51-56`): `PairS(z, w)` builds `PairS[\ZZ64\]` (`probes/skeptic/walk-edit.txt:23-25`).
- **C. The edit to `bestMatchInternal`.** The judgement permits exactly one: "Rung K's choice stays on today's instantiation in `bestMatchInternal`'s subtyping pass, its code unchanged, and the winner is re-instantiated by the promotion before application" (`explorations/reviews/conversion-overloading-judgement.md:137`). Its form:
  - a `reinstantiate` flag on the signature (`OverloadedFunction.java:879`);
  - the loop's inference call renamed to `inferByUnification`, so that the loop still runs today's inference now that `inferAndInstantiateGenericFunction` is the rule (`:898`);
  - the chosen generic declaration remembered (`:881`, `:916`) and re-instantiated by the rule after the loop (`:920-927`).

  If the re-instantiation throws, today's instance stands (`:924-926`). That is a valid instance, so no loud failure becomes quiet. The comparison (`:912-914`) and the load-time check are untouched. `bestMatchWithoutCoercion`, which `coercionFor` uses to choose among a type's lifted coercions, passes `false` (`:809`): a coercion is chosen on the value as it is.

  The alternative was the shadow's form, with the promoted generic moved out of the subtyping pass. It ran the plain declaration in `OpAnyZW` (`explorations/reviews/before-n-questions/fork/OpAnyZW.walk-apply.txt`), which is the reading the conversion rule does not take. Listed as a stop in case the review reads it as one (section 12).
- **D. Where no instance admits the arguments, today's answer stands.** `inferWithCoercion` returns null on any failure, and `inferAndInstantiateGenericFunction` then runs today's unification (`EvaluatorBase.java:60-61`). So a call the rule cannot type is refused with today's message, unchanged in text: `evS(z, u)` with `T extends ZZ32` (`probes/skeptic/walk-base.txt`, `walk-edit.txt`, `SkK22`). The alternative, a new message naming the rule, would change refusal texts the corpus compares.
- **E. A generic instance the coercion pass finds taking the arguments unconverted is applied as itself.** A converted call re-dispatches its converted arguments as an ordinary call. With nothing converted, that would re-enter the subtyping pass that found nothing. So such an instance is returned directly (`OverloadedFunction.java:858`, `:869`), and its binding converts what its instantiated domain needs.
- **F. A lifted coercion's own inference stays today's.** On a non-generic target, and after `genericCoercionFor` finds nothing, `coercionFor` infers a generic lifted coercion by `inferByUnification` (`Coercions.java:73`), not by the rule, because the rule's reverse lookup calls `coercionFor` itself. A coercion does not chain (`conversions-coercions.tex:424-425`), so the rule has nothing to add there.
- **G. The instance is checked before it is used.** An instance from the rule is kept only if its domain admits every argument, by subtyping or one coercion (`EvaluatorBase.java:210-217`); otherwise decision D applies.
- **H. The expected type at a generic result is walk's gap, not repaired here.** `a: BoxK[\ZZ64\] = wrapK(3)` is refused at the base and after (`probes/xxx-expected-type.txt`), because walk has no static context and no coercion converts a `BoxK[\Int\]`. The record read walk's side as covered because "a typed binding already converts after the call". That holds only where the result is the type parameter itself (`i: ZZ64 = idK(3)`, the test's control). Home 2, `XXXInferExpectedTypeRungK.fss`, on decision 3 and `var-ref.tex:38-40`; row 510. The repair would pass a typed binding's declared type into its right-hand call's inference (`LHSEvaluator`, `BuildEnvironments`), outside K's files.
- **I. The reverse lookup is cached per environment.** It walks a component's top-level names, so it is computed once per top-level environment and kept (`Coercions.java:163-191`). Measured free: `atomic5` and `commonSuper` alternated five times each (`probes/warm-time.txt`), and the skeptic's `QuickCheckTest` at load 1.1 (`probes/skeptic/warm-quickcheck.txt`).
- **J. The cache's reset (the repair round; the judge's decision, executed).** `Coercions.reset()` is called from `Init.initializeEverything` (`Coercions.java:166-168`, `Init.java:44`), the team's one idiom for a static cache of interpreter objects (`Init.java:28-45`). The alternatives (`JUDGE.md` section 1):
  - (a) no cache: the lookup is recomputed for every argument of every lone-parameter inference, at a cost that is unmeasured, where the cache is measured free;
  - (b) a cache that clears itself when `Driver.getFortressLibrary()` changes, the skeptic's overlay: measured flat and inside K's files, but a new idiom coupled to the library wrapper's identity;
  - a `WeakHashMap`, rejected because its values are types whose `getWithin()` leads back to the key.

  Its cost is one import and one line in `Init.java`, a 2012 file outside the record's list for K. No other rung edits it, and no reserved stop names it.
- **K. The varargs shape is home 2, not a repair; the tuple shape is home 3 (the repair round; the judge's ruling).** `varS[\T\](xs: T...)` over a `ZZ32` and a `ZZ64` runs at the join, unconverted (`probes/skeptic/walk-edit.txt:62-63`), because the first pass unifies a varargs argument as before (`EvaluatorBase.java:151-156`). The varargs binding stores each element through the array's `init` method, whose declared parameter converts (`ProjectFortress/src/com/sun/fortress/interpreter/glue/IndexedArrayWrapper.java:43`, `:67-71`; `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:54`), so `varR[\ZZ64\](z, w)` prints `[3:ZZ64,4:ZZ64]` under walk, at the base and after (`explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2/walk-base.txt:27`, `walk-edit.txt:24`). The repair is the first pass's varargs branch alone (`EvaluatorBase.java:151-156`), inside rung K's own file, left for later by the judge's ruling, whose reading of the binding this measurement corrects. (Corrected at the gather by the second skeptic's correction 3; the text had said the binding copies each value unconverted.) Answer 8 settles the answer, so the shape gets an expected failure, `XXXInferVarargsRungK.fss`, citing answer 8 and not `basic-integers.tex`, whose callout rung T revises.

  The tuple parameter `tupS[\T\](p: (T, T))` with `(z, w)` is at the join on both paths (`walk-edit.txt:65-66`, `compiled.txt:137-139`). A type fixed through a structure is what rung T's chapter leaves open (`CLIMB-BATCH-N.md:245`), so it is home 3, named in row 511 with its capture.
- **L. The compiled union test concatenates with `||` (the repair round; the judge's text wrote juxtaposition).** The judge's instruction takes `SkK23`'s `kindK(a) " " kindK(b) " " kindK(c)`. Written that way, the stand-in with the static argument written runs and fails its own assertion, `" OneK   TwoK   ThreeK" =/= "OneK TwoK ThreeK"` (`explorations/compile-ladder/rung-inference-walk/probes/repair/xxx-union-juxtaposition.txt:52-53`). The cause is that string juxtaposition inserts spaces on the compiled path (row 76, `explorations/fortress-gap-ledger.md:307`). That test could never turn red on a repair of row 512, which is the whole use of an expected failure. With `||` (`CompilerBuiltin.fsi:37`) the stand-in passes and the `XXX` test goes red (`probes/repair/xxx-union-compiled.txt:27-52`), and the assertion still states the specification's answer.
- **M. The heap bound, read over repeated runs (the repair round).** The judge's bound for the re-measure is every fifth at most 95 MB and each of the last ten at most 100 MB, with "if it fails, do not try another design: stop". The first run's second fifth was 107 MB, its only figure over the bound, from one transient spike early in the run; its later fifths were 68, 68 and 80. I did not try another design. I repeated the same measurement twice on the repaired build and once on the base, back to back: both repeats meet the bound, and the base shows the same spike, its second fifth 106 (section 10). The alternative was to stop on the first run, which would refuse a repair whose runs stay flat, for a spike the untouched tree shows too.

## 7. The comparison

The first pass ran it as batch 6b's rung O ran its own (`explorations/compile-ladder/rung-walk-overflow/count-run.sh`, `count-compare.py`):
- every file of `ProjectFortress/tests/` except the new tests, 429 files;
- three passes (base A, the edit, base B), one JVM per test, with private caches;
- masked as batch 5 masked, with `XXXInheritedOverload.fss` listed as unstable (row 430).

The capture is `explorations/compile-ladder/rung-inference-walk/probes/passes/tests-compare.txt`, with its machine lines at `:2-19`. Result (`:87`): 408 the same, 3 changed, 17 unstable, 1 listed, 0 verdicts changed. The 17 unstable ones are those the untouched tree varies between its own passes: timings, random seeds, thread names.

The three changed outputs are probe K's list less the call batch 7R removed (`PROBE-K.md` section 6):
- `XXXCoercionGenericFnRungC`, now `CoercionGenericFnRungC`: `gf(NarrowOf(2), "two")` runs, with `T = FlatString` and the `NarrowOf` converted to `Wide` at binding; rc 1 to 0, `PASS` (row 388; `conversions-coercions.tex:119-120`).
- `XXXCoercionGenericTraitRungC`, now `CoercionGenericTraitRungC`: the coercion to `WideG[\ZZ32\]` is applied; rc 1 to 0, `PASS` (row 389; `:176-178`, `:212-222`).
- `commonSuper`: `f(13.0, 5)` has `A = RR64` where it had `Number`, so the `5` converts, and the test prints `5.0` and `35.0` for `5` and `35` (answer 8: `ZZ32` into `RR64` is exact). The test checks nothing and keeps its verdict.

`XXXInheritedOverload`'s order: base A names `a(x:Sub1,y:Base)` first; base B and the edit name `a(x:Base,y:Sub2)` first. The untouched tree varies between its passes (row 430). No overloaded call of the corpus changes its declaration.

The load-time check refuses the same nine tests in all three passes (`explorations/compile-ladder/rung-inference-walk/probes/repair/load-verdicts.txt`, recomputed by the repair round from the passes' logs). So no overload set that walk loads today is refused after, or the reverse.

The demos (`probes/passes/demos-compare.txt`): the 62 files of `ProjectFortress/demos/`, one pass before and one after, each cut at 120 s. 45 are the same and 17 differ. With every number masked, 13 of the 17 are equal: printed timings, and elapsed times in messages. The other 4 (`demos-compare.txt:18`):
- `BiCGSTAB2`, cut at 120 s both times;
- `DemoGenerator22D`, `Generator2Demo` and `conjGrad`, which read random input.

The exit codes are the same in both passes: 18 rc 0, 40 rc 1, 2 rc 124, 2 rc 255.

microGPT (`probes/passes/mg-compare.txt`): `MicroGptFlatCheck` and `MicroGptAplCheck`, from an empty cache at `FORTRESS_THREADS=1`, pass 40 of 40 each, before and after, with every printed value the same. The one differing line in each is the run's total time.

## 8. The instance split where a static type is wider than its value

`explorations/compile-ladder/rung-inference-walk/probes/instance-split.txt` holds `O2Wide` and `O2Lone` (`explorations/reviews/option-2-soundness/`) under walk at the base and after, with the compiled lines of `explorations/reviews/option-2-soundness/summary.txt` (stock, and the checker shadow's rule; rung I's build is the gather's).

- `O2Wide`: `n: Number` holds a `ZZ32` and `m: Number` a `ZZ64`. `op(n, w)`, `op(z, m)` and `op(n, m)` print `op generic[ ZZ32 , ZZ64 ]` compiled (`T = Number`, nothing converted), and `op generic[ZZ64,ZZ64]` under walk after (`:12-14`, `:27-29`).
- `O2Lone`: `same(n, w)` is `[ ZZ32 , ZZ64 ]` compiled under the rule and `[ZZ64,ZZ64]` under walk (`:47`, `:59`).
- Where an argument is typed `Any` (`op(a, w)`, `op(a, aw)`), the compiled run takes the plain arm and walk the generic arm, as at the base, now at `ZZ64` (`:15`, `:30`; `:43`, `:61`).

The same body runs at a narrower instance, and in the number tower the value stays inside the declared type. The decision records the split, not a stop (the judgement's section 3). Home 3: the specification resolves coercion statically (`conversions-coercions.tex:598-601`) and says nothing of an implementation with only run-time types. Row 509 (504 provisionally), which the gather opens; the repair round adds `SkK17`'s user-coercion case to it (section 9).

## 9. Every measured defect's home

- **Row 388's walk half** (a generic's declared parameter, and a parameter typed by a type variable another argument fixes): repaired, home 1, `CoercionGenericFnRungC.fss:25` and `InferCoercionRungK.fss:37-39`, `:48`.
- **Row 389**: repaired for a coercion whose static parameters are the trait's own, home 1, `CoercionGenericTraitRungC.fss:25`. A coercion that declares its own static parameter (the second skeptic's finding 1) is still refused: home 2, `ProjectFortress/tests/XXXCoercionOwnStaticRungK.fss`, placed at the gather, and a new row.
- **Answer 8's promotion under walk** (same, lohi, twice, pick, the conversion rule's shape): repaired, home 1, `InferCoercionRungK.fss:40-50`.
- **Row 388's flat-tower container shapes** (the skeptic's finding 2): the rung repaired them, but they went unmeasured until the repair round measured all nine (refused in `probes/repair/row388-base.txt:9-17`; the nested tower's values in `probes/repair/row388-edit.txt:9-17`). Home 1, all nine asserted, `InferCoercionRungK.fss:59-67`. None stays refused, so no `XXXContainerScalarRungK.fss` is written.
- **Row 486, a `nat` parameter at an `NN32` binding**: not repaired. The refusal is the binding's, not a call's; the repair is rung Q's switch, or later. Home 2, `XXXNatValueNN32RungK.fss:26`.
- **The expected type at a generic result**: home 2, `XXXInferExpectedTypeRungK.fss:23`; row 510.
- **A varargs parameter `T...` over mixed widths** (the skeptic's finding 3): not repaired (decision K); the repair is the first pass's varargs branch alone, inside this rung's `EvaluatorBase.java`, since the varargs binding converts (`explorations/compile-ladder/rung-inference-walk/probes/skeptic/round2/walk-edit.txt:24`; corrected at the gather). Home 2, `XXXInferVarargsRungK.fss:20`; row 511.
- **A tuple parameter `(T, T)` over mixed widths**: home 3, since the chapter leaves a type fixed through a structure open. Named in row 511 with `probes/skeptic/walk-edit.txt:65-66` and `compiled.txt:137-139`.
- **The union of three types on the compiled path** (the skeptic's finding 5): not rung K's to repair (code generation and run time). Home 2 by row 366's precedent, the judge's ruling over the skeptic's home 3: `compiler_tests/XXXUnionOfThreeRungK.fss:22` with its two `.test` files; row 512. The call is valid (`overloading.tex:170-174`), and walk answers it.
- **The user coercion reached through a lone parameter** (the skeptic's finding 4): not a defect by the decisions as written. It is disclosed in decision B, added to row 509's text and sent to Pavol, and the gather is asked to run `SkK17` on rung I's build.
- **The static cache that outlived a run** (the skeptic's refusal): repaired by the reset. Home 1 in the only form a heap trend admits, since no `.fss` assertion can hold one: the re-measure, `explorations/compile-ladder/rung-inference-walk/probes/repair/heap-summary.txt`.
- **Row 432 at a structured position**: not reached; a note on the existing row (record.md).
- **The instance split where a static type is wider than its value**: home 3, `probes/instance-split.txt`, row 509.
- **`Coercions.addSource` leaving a generic `coerce` out of the specificity sources**: not measured and no row; named for Pavol (section 11).

## 10. Measurements

- **The checker count.** Unchanged, as the manifest predicts. The count stage reads the one library's apis under the checker (`explorations/coordinator/tools/checker-count/run.sh:1-9`), not the interpreter or the tests.
  - Before: the last landed gate's table, `explorations/compile-ladder/climb-batch-6.5/gate/checker-count.txt`, 75 (`git log d9c62446e..bce66f1fa -- Library/ ProjectFortress/` prints nothing).
  - After: 75 on the first pass's tree (`probes/checker-count-postedit.txt`), and 75 on the repaired tree with every row equal to the landed table's (`explorations/compile-ladder/rung-inference-walk/probes/repair/checker-count-repair.txt`).
  - The distance stage was not run: the rung edits nothing it reads.
- **Time.** No measurable cost.
  - `atomic5` and `commonSuper`, base and edit alternated five times each at load 4.3 to 6.1 (`probes/warm-time.txt`): `atomic5` base 3,514 to 4,151 ms, edit 3,528 to 4,067; `commonSuper` base 2,587 to 2,862, edit 2,654 to 3,051.
  - `QuickCheckTest` at load 1.1 (`probes/skeptic/warm-quickcheck.txt`): base 53.5 and 63.2 s, after 62.7 and 58.9 s.
  - The per-test sums of the three passes (base A 2,693 s, edit 3,174, base B 1,716) reflect the load, not the edit.
- **The heap, before and after the reset** (`explorations/compile-ladder/rung-inference-walk/probes/repair/heap-summary.txt`). The probe runs `SystemJUTest` over shard 0 of 4 (107 tests, one JVM, `-Xmx768m`, `FORTRESS_THREADS=1`), as `build.xml`'s `systemShard` runs one shard. It records the heap after each young collection, averaged over fifths of the run, then the last ten, in MB:

  | build | fifths | last ten |
  |---|---|---|
  | base, the skeptic's run | 64 92 72 71 63 | 58 to 72 |
  | the rung before the repair | 70 88 101 120 140 | 122 to 161 |
  | the skeptic's clearing overlay | 66 84 77 78 76 | 74 to 91 |
  | repaired, run 1 | 42 107 68 68 80 | 73 to 95 |
  | repaired, run 2 | 54 89 71 73 75 | 66 to 86 |
  | repaired, run 3 | 46 92 69 68 69 | 64 to 82 |
  | base, run beside them | 46 106 69 70 83 | 75 to 98 |

  No run of the repaired build grows from fifth to fifth. Run 1's second fifth, 107, is one spike of floating garbage at 23 to 30 s: 143 to 178 MB, back to 86 MB by 40 s (`probes/repair/gc-edit-shard4.txt`). The base run beside it shows the same spike early in its run, 120 to 177 MB at 17 to 22 s (`probes/repair/gc-base-shard4.txt`). So it is the untouched tree's own variation under the load of the moment: 7.0 to 11.7, with another rung on the same cores (decision M).

## 11. For Pavol

1. **The reach of answer 8's promotion to user coercions under walk.** Rung K's rule converts a user-typed argument through a coercion into another argument's type or supertype. `userS(AaaOf(1), CccOf(2))`, with `Aaa` declaring `coerce(x: Ccc)`, runs at `T = Aaa` with the `CccOf` converted; the stock compiled run converts nothing (`probes/skeptic/walk-edit.txt:56-57`, `compiled.txt:117-119`).
   - It matches the record's words for K (`CLIMB-BATCH-N.md:1503`); rung T's chapter states the general case more narrowly (`:245`); whether rung I's build agrees is the gather's measurement.
   - Unlike row 509, the body sees a different value, not a narrower number instance.
   - The options: leave walk as built and widen the chapter's statement; narrow walk to library or number coercions, a heuristic walk cannot ground; or record the split beside row 509.

   Left as built; reversible.
2. **One file outside rung K's list.** The cache's reset is called from `Init.initializeEverything` (`Init.java:17`, `:44`), the team's idiom for every such cache. The alternative was a cache in `Coercions.java` that clears itself when the library changes, measured flat but a new idiom. The judge's decision; reversible.
3. **A compiled defect measured by K's skeptic gets home 2 in K's repair.** `compiler_tests/XXXUnionOfThreeRungK.fss` with a link test, in row 366's shape; row 512. The skeptic had recommended home 3, and the judge ruled home 2 by row 366's precedent.
4. **The expected type at a generic result** (from the first pass). Walk refuses `a: BoxK[\ZZ64\] = wrapK(3)` before and after the rung, where the checker under rung I keeps the expected type at `f(x)`. It is gated as an expected failure (`XXXInferExpectedTypeRungK.fss:22-23`, row 510). The repair lies outside K's files; whether walk should carry the expected type, and when, is his. Rung T's callout that walk applies the same rule from run-time types is inexact on this point.
5. **`Coercions.addSource`** (from the first pass). It leaves a generic `coerce` out of the sources the specificity relation reads (`Coercions.java:301-305`), so a choice between two coercions into a generic trait can only be "Ambiguous coercion". Nothing in the library, the tests or microGPT reaches it. Named so it is not lost; no row opened.

The reports the record's "What comes back to Pavol" names reach him here with the landing:
- the changed outputs with their causes (section 7);
- no microGPT value moved (section 7);
- how a lone parameter reads a run-time type (decision B);
- the edit to `bestMatchInternal` (decision C);
- the instance split (section 8).

## 12. Stops

One reserved stop is listed, as the first pass and the skeptic listed it: "an edit to bestMatchInternal beyond the re-instantiation of the declaration its subtyping pass chooses, or to the load-time check, unreported". The edit is reported whole (decision C; `OverloadedFunction.java:879`, `:898`, `:916`, `:920-927`), and the skeptic and the judge read it as the permitted re-instantiation. It is lifted by POSITIONS 2026-09-27, on the stops a batch record reserves for him.

The repair round meets no reserved stop:
- `Init.java` is outside the record's list for K, no stop names it, and no other rung of the run edits it;
- the new `compiler_tests/` files are new files, no rung's;
- no walk output changes (`probes/repair/walk-repair-diff.txt`).

Not stops: the 17 outputs the untouched tree varies between its passes (POSITIONS 2026-09-26, rung D's stop), and the instance split (section 8).

## 13. Differentials

- **The one-shape shapes, walk against the compiled run.** `explorations/reviews/inference-rule-shadow/probes/OneShapeW.fss`, split into one program per call (`probes/oneshape-base.txt`, `probes/oneshape-edit.txt`). After the edit, `SameZW`, `LohiZW`, `LohiZU`, `Same3W`, `ScaleZ` and `Scale3` take the rule's instance. `SumLit` stays refused (row 432), and the ranges over mixed widths stay refused (batch 7R's `ZZ32` ranges).
- **`RuleCRun` under walk** (`probes/rulecrun-walk.txt`). At the base it stops at `scale64(bS, 3)`, "Cannot unify Int ... with FortressLibrary.ZZ64". After, `scale64` and `scale` run, `pick(z, l)` and `pick(3, l)` run at `ZZ64`, and it stops at its last line, the expected type at a generic result (decision H).
- **The test's shapes, one program each**, with the conversion judgement's `O2*` programs and `OpAnyZW` (`probes/shapes-base.txt`, `probes/shapes-edit.txt`). `OpAnyZW`'s `op(z, w)` prints `op generic[ZZ64,ZZ64]` after, where the base prints `op generic[ZZ32,ZZ64]`. `O2Meet`, `O2MeetNo`, `O2MeetRev`, `O2Z64` and `O2Z64Rest` are refused at load before and after; they are batch 7b's rung W's.
- **The skeptic's 26 programs** (`probes/skeptic/`): under walk at the base, under walk after, and on the stock compiled path, all at 1 thread, plus walk after at 4. The repair round re-ran walk after on the repaired build: identical line for line (`probes/repair/walk-repair.txt`, `probes/repair/walk-repair-diff.txt`).
- **Row 388's twelve shapes**, base and repaired (`probes/repair/row388-base.txt`, `row388-edit.txt`, `row388-compare.txt`).

## 14. The machine

Every capture carries its machine line: `nproc` 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, openjdk 25.0.4, `FORTRESS_THREADS=1` unless marked, with the load at each run's start beside it. The load ran from 0.4 to 11.7, because other rungs of the batch ran on the same cores.

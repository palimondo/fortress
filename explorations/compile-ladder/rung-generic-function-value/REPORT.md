# Rung F (`rung-generic-function-value`): a generic function passed as a value under walk

- problem: under walk a function with static parameters had no type as a value, so passing it failed with a unification error, a missing-type error or a Java `NullPointerException` (ledger row 156; the planner's probe `explorations/compile-ladder/plan-32/probes/P156.fss:5`).
- spec: "An identifier reference which denotes a polymorphic function may include explicit static arguments [...] but most identifier references do not include them.; the static arguments are statically inferred from the context of the function call" (`Specification/basic/expressions/var-ref.tex:35-40`).
- precedent: a direct call's inference, `EvaluatorBase.inferAndInstantiateGenericFunction` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:72`), and the type of an overloaded function as a value, `FTypeOverloadedArrow` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTypeOverloadedArrow.java:59`).
- deviation: walk has no static types, so the context it reads is the run-time arrow type of the parameter or local variable that receives the value, not the static context of the reference; one line more under "The rule as built" (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Fcn.java:74`).
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BaseEnv.java:613`, `EvaluatorBase.java:637`, `values/Fcn.java:59`, `values/GenericFunctionOrConstructor.java:44`, `values/NonPrimitive.java:273`, `values/OverloadedFunction.java:2866`.

Base `db352c1776`; branch `wip/rung-generic-function-value`; commits `42fc9c6641` (the fix and three tests) and `c35643a2c3` (one more expected-failure test). The worktree was seeded by the brief's command (exit 0). The base build `/home/user/fortress-base33` is at `84f1c37190`, an ancestor of the base; `git diff --stat 84f1c37190 db352c1776 -- ProjectFortress Library bin` prints nothing, so its code is the base's.

## What changed and why

A function with static parameters had a null `ftype` (`values/Fcn.java`, `type()`), so no parameter type could match it, a generic callee could not unify it, and the callee's cache of instances, keyed by argument types, compared a null. The change gives the value a type and a rule for what a typed place receives.

1. **The type.** `types/FTypeGenericArrow.java` (new, 38 lines): the type of a function with static parameters as a value. It is below `Any`, and below an arrow type exactly where the function can be received at it (`Source.receivedAt`). `GenericFunctionOrConstructor.type()` (`values/GenericFunctionOrConstructor.java:56`) answers one such type per function, named by the function and its static parameters, as `half[\n\]`.
2. **The instance at an arrow type.** `EvaluatorBase.instanceReceivedAt` (`EvaluatorBase.java:786`): the instance that a direct call with arguments of the arrow's domain types runs (`inferAndInstantiateGenericFunction` on stand-in values of those types, `DummyValue`), kept where its type is a subtype of the arrow type; null where no instance fits. `EvaluatorBase.leavesOpen` (`:761`): the arrow type leaves a static parameter open where no declared parameter type of the function mentions it, or where a type of the arrow's domain is itself unfixed. `GenericFunctionOrConstructor.instanceAt` (`:82`) keeps each answer per arrow type; `receivedAt` (`:98`) is `leavesOpen` or an instance.
3. **Receiving.** `Fcn.received(t, v)` (`values/Fcn.java:74`): for a generic function at an arrow type, its instance; where the type leaves a static parameter open, and at every other type (`Any`, a type parameter, an open type), the value as it is. Called where a parameter is bound (`values/NonPrimitive.java:273`, `buildEnvFromParams`) and where a local variable declared with a type is bound (`BaseEnv.java:613-614`, `putVariable`).
4. **A generic callee.** In both inferences of a call's static arguments (`EvaluatorBase.java:637`, `:1060`), an argument that is a generic function, or an overloaded one with a generic overload, and whose type does not unify with its parameter's declared type constrains nothing (`unifyArgument`, `:729`). The callee's other arguments fix its static parameters, and the parameter's type at that instance then receives the function (3).
5. **An overloaded name.** `OverloadedFunction.type()` (`values/OverloadedFunction.java:2877`, a new member at the class's end): where an overload has static parameters, the types of all the overloads, so that an arrow-typed place that a generic overload can be received at takes the function. The value stays the whole overloaded function.

Diff against the base: 7 Java files, 3 of them with one changed line or two (`git diff --stat db352c1776 c35643a2c3`: 12 files, 397 lines with the four tests).

## The rule as built

- **When.** At the binding of a parameter of a function or of a constructor (`NonPrimitive.buildEnvFromParams`; `F156s` for the constructor) and of a local variable declared with a type, after the place's type has matched the value.
- **From what.** From the place's run-time arrow type: the function's static arguments are those that a direct call with arguments of the arrow's domain types infers; the instance's type must be a subtype of the arrow type (so its range is checked too). A generic callee's own static parameters are fixed first, by its other arguments alone.
- **Open.** Where no declared parameter type mentions some static parameter of the function (`tag[\nat k\](x: ZZ32)`), where a type of the arrow's domain is unfixed, and at any place that is not of arrow type (`Any`, an untyped local, a type parameter), the value stays generic, and each application infers its static arguments from its arguments' run-time types, as a direct call does (`GenericFunctionOrConstructor.applyInnerPossiblyGeneric`, unchanged). P-48's rule for an unfixed parameter and walk's open parameter are untouched: the same inference runs.
- **No instance.** Where the arrow type fixes every static parameter and no instance fits, the place does not match the value, and walk answers the place's own refusal, which names the value's type: `Unification error: Closure/Constructor for app2 param 1 (f:Vector[\RR64,2\]->Vector[\RR64,3\]) got arg half[\nat n\](...) ... of type half[\n\]`. This departs from the section's words "the refusal that a direct call with those arguments gives": the match is a predicate that overload dispatch also asks, so it cannot raise the call's own error. Where the value stays generic, the refusal is the direct call's (`undefined variable [k]` for `tag`, below).
- **An overloaded name** is not instantiated at the binding. Each application chooses a declaration by its arguments' run-time types, as dispatch does everywhere in Fortress.
- **Not reached:** a top-level variable and an assignment (defect 2 below); a callee's type parameter that a value's run-time type fixes (defect 1 below).

## The failing runs and the passing run

The failing run on the base's code, through the harness, in my worktree before any edit of code (the first build of the edit started after it, `tmp/rung-generic-function-value/build1.txt`), 2026-11-15T23:29:57Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/GenericFunctionAsValueWalk.fss ProjectFortress/tests/GenericFunctionRowLiftWalk.fss

    # harness-one 2026-11-15T23:29:57Z; tree db352c1776; ...
    Unification error: Closure/Constructor for app param 1 (f:Vector[\RR64,3\]->Vector[\RR64,3\]) got arg half[\nat n\](x:Vector[\FortressLibrary.RR64,n\]):Vector[\FortressLibrary.RR64,n\]tmp/h1/tests/GenericFunctionAsValueWalk.fss:9:1-60 of type null
    Argument half[\nat n\](x:Vector[\FortressLibrary.RR64,n\]):Vector[\FortressLibrary.RR64,n\]tmp/h1/tests/GenericFunctionRowLiftWalk.fss:8:1-60 has no type information
    FAILURES!!!
    Tests run: 2,  Failures: 2,  Errors: 0

After that run I corrected the tests' own text where the fixed walk then refused it (a call followed by a subscript, which is the language's static error; a `/` of a vector by a scalar, which the library does not declare; a numeral written `1.0e-12`) and added the two cases after a plain function and `appN(twice, w)`. The tests in their final text fail the same way on the old code, through the base build's harness, 2026-11-15T23:36:39Z:

    FORTRESS_HOME=/home/user/fortress-base33 /home/user/fortress-base33/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/old-harness $PWD/ProjectFortress/tests/GenericFunctionAsValueWalk.fss $PWD/ProjectFortress/tests/GenericFunctionRowLiftWalk.fss

    # harness-one 2026-11-15T23:36:39Z; tree 84f1c37190; ...
    Unification error: Closure/Constructor for app param 1 (f:Vector[\RR64,3\]->Vector[\RR64,3\]) got arg half[\nat n\](...) ... of type null
    Argument half[\nat n\](...) ... has no type information
    Tests run: 2,  Failures: 2,  Errors: 0

The passing run, my last run after my last change of code (the code of `42fc9c6641`), 2026-11-15T23:51:13Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h2 $T/XXXGenericFunctionTopLevelVariableWalk.fss $T/XXXGenericFunctionTopLevelVariableWalk.test $T/XXXGenericFunctionAtTypeParameterWalk.fss $T/GenericFunctionAsValueWalk.fss $T/GenericFunctionRowLiftWalk.fss      (T=ProjectFortress/tests)

    # harness-one 2026-11-15T23:51:13Z; tree 42fc9c6641; ...
    . interpret tmp/h2/tests/XXXGenericFunctionTopLevelVariableWalk
     Saw expected failure: loaded and ran, not refused at load
    . interpret tmp/h2/tests/XXXGenericFunctionAtTypeParameterWalk
     OK Saw expected exception
    OK (4 tests)

Row 156's three failures, each on the base's code by a direct run in my worktree before the edit, and after it (`tmp/rung-generic-function-value/probes/`, run as `../../../bin/fortress F156x.fss`):

| program | the base's code | after |
|---|---|---|
| `F156a`: `app(half, v)`, a plain callee | `Unification error: Closure/Constructor for app param 1 (f:Vector[\RR64,3\]->Vector[\RR64,3\]) got arg half[\nat n\](...) ... of type null` | `[0#3][ 4.0 4.0 4.0 ]` |
| `F156b`: `appN(half, v)`, a callee generic in one size | `Argument half[\nat n\](...) ... has no type information` | `[0#3][ 4.0 4.0 4.0 ]` |
| `F156g`: `appN(plain, v)` then `appN(half, v)` | `[0#3][ 4.0 4.0 4.0 ]`, then `Exception in thread "main" java.lang.NullPointerException` | both lines `[0#3][ 4.0 4.0 4.0 ]` |
| `F156c`: `appNM(half, v, w)`, a callee generic in two sizes | `Argument half[\nat n\](...) ... has no type information` | `5.0`, `4.0` |
| `F156d`: `appZ(twice, z)`, `app(twice, v)`, `appZ(ident, z)` | `42`, then `Unification error: ... got arg { twice[\nat n\](...) twice(x:ZZ32):ZZ32 ... }:OverloadedFunction of type (ZZ32->ZZ32)` | `42`, `[0#3][ 4.0 4.0 4.0 ]`, `21` |
| `F156h`: `useAny(ident, z)` for `useAny(f: Any, x: ZZ32)` | `** bug! This should have been an environment with a Top Level` | `5` |

The `NullPointerException` needs an entry in the callee's cache of instances before the generic function arrives, which is why a callee generic in two sizes alone (`F156c`) shows the missing-type error on this base: the row's "callee generic in two `nat`s" is the program in which run C2 met it, not its condition. `GenericFunctionAsValueWalk` holds each of the three as an assertion. (`F156c`'s body was respelled after its base run, from `f(v)[0] + w[0]` to a block, for the same static error as in the test; its base run stopped at the call, before the body.)

## The tests

- `ProjectFortress/tests/GenericFunctionAsValueWalk.fss` (plain): `app(half, v)`; `appN(plain, v)` then `appN(half, v)` and `appN(half, w)`; `appNM(half, v, w)` and `appNM(half, w, v)`; a function generic in one size (`size`), in two (`sizes`), in a type (`ident` at `ZZ32` and at `String`; `count` over `Box[\F\]`, row 758's program); a local variable of arrow type; `app(half[\3\], v)` as the guard; the overloaded `twice` at `ZZ32 -> ZZ32`, at a vector arrow and through a generic callee. In each the receiving arrow type fixes every static parameter.
- `ProjectFortress/tests/GenericFunctionRowLiftWalk.fss` (plain): `rows[\nat r, nat c\](f: Vector[\RR64,c\] -> Vector[\RR64,c\], m: Matrix[\RR64,r,c\])` called as `rows(half, m)` and as `rows(rmsn, x)` for `rmsn[\nat n\](x: Vector[\RR64,n\]): Vector[\RR64,n\]`, the callee's `c` fixed by the matrix. `rmsn` is written with the library's `scale` and `dot`, since the library's `Vector` has no `/` by a scalar; the model's line is not touched.
- `ProjectFortress/tests/XXXGenericFunctionAtTypeParameterWalk.fss` (expected failure, defect 1). Shown through the harness as it is (`OK Saw expected exception`, 2026-11-15T23:39:00Z) and red on a deliberate fix, `appT(half[\3\], v)` for one run, then restored (`Missing expected failure`, `Tests run: 1,  Failures: 1`, 23:39:13Z).
- `ProjectFortress/tests/XXXGenericFunctionTopLevelVariableWalk.fss` with its `.test` (expected failure, defect 2): green in the passing run above.

## Runs to report, not tests

Each under walk on the code of `42fc9c6641`, as `../../../bin/fortress F156x.fss` from `tmp/rung-generic-function-value/probes/`. Rung C's checker refuses the first two forms; walk runs them only for want of static types.

- **A generic function bound to an untyped local and called at two sizes** (`F156e`): `g = half; println(g(v)); println(g(w))` prints `[0#3][ 4.0 4.0 4.0 ]` and `[0#2][ 2.0 3.0 ]`. The base's code prints the same: the value was always applicable, only not passable.
- **A receiving type that leaves a static parameter open** (`F156l`): `useTag(tag, z)` for `tag[\nat k\](x: ZZ32): ZZ32 = x + k` and `useTag(f: ZZ32 -> ZZ32, x: ZZ32)`: the binding accepts the value, and the application stops with `undefined variable [k]`, which is what the direct call `tag(z)` gives (`F156p`).
- **At `Any` and at a type parameter** (`F156l`): `appAny(ident, z)` and `appT(ident, z)` print `5`; `h = ident; h(z); h("ab")` prints `5` and `ab`.
- **Instantiated at the binding, not at the call** (`F156o`): `k: Vector[\RR64,3\] -> Vector[\RR64,3\] = half; k(w)` for a `w` of size 2 is refused by the instance: `Closure/Constructor for half param 1 (x:Vector[\RR64,3\]) got arg __DefaultVector[\RR64,2\]`. `appK(kind, z)` for `kind[\T\](x: T): String`, a typecase on `x`, and `appK(f: ZZ64 -> String, x: ZZ32)` prints `ZZ64`, where the untyped local `g = kind; g(z)` prints `ZZ32` (`F156s`): the parameter received `kind[\ZZ64\]`, and its argument converted. A constructor's parameter receives too: `Holder(half).go(w)` for `object Holder(f: Vector[\RR64,3\] -> Vector[\RR64,3\])` is refused the same way (`F156s`).
- **No instance** (`F156j`, `F156k`): `app2(half, w)` for `app2(f: Vector[\RR64,2\] -> Vector[\RR64,3\], ...)` and `appW(ident, z)` for `appW(f: ZZ32 -> ZZ64, ...)` are refused at the binding, `... got arg ident[\T\](x:T):T ... of type ident[\T\]`.
- **Overloads that differ in an arrow type** (`F156q`, row 171's shape): `lift(half, v)` picks `lift(f: Vector[\RR64,3\] -> Vector[\RR64,3\], ...)` and `lift(norm2, v)` picks `lift(f: Vector[\RR64,3\] -> RR64, ...)`.
- **An overloaded name as a local value** (`F156n`): `t = twice; t(v); t(3)` prints `[0#3][ 4.0 4.0 4.0 ]` and `6`.

## Where the fix belongs, and the precedent search

The defect is in walk's values (`map/modules-and-phases.md`, "B.8 The interpreter tail": values from `evaluator/values/`, types from `evaluator/types/`); the compiled path's half is row 758, rung C's. The record holds no earlier repair of this defect (`ledger.py find 156`; `FACTS.md` has no entry on a generic function value); the team's own comment at `Fcn.java:58-66` on the base names the bug and leaves it. The precedent for the shape is `FTypeOverloadedArrow`, the one other type that stands for a function value without one arrow type: its `subtypeOf` asks each member, and its `unifyNonVar` tries each. Sites that check a value against a place's type and could receive: 9 by `grep -rn "typeMatch(" interpreter/` outside `Coercions.java` and `Numerals.java`; this rung receives at 2 (`NonPrimitive.java:256-273`, `BaseEnv.java:613`), and the other binding sites are in files of rungs B and N (defect 2).

## What the specification settles

- A function is a value, and a generic function may be referred to without static arguments, which come from the context (`Specification/basic/expressions/var-ref.tex:35-40`). So `app(half, v)` is valid, and so is `appT(half, v)` (defect 1).
- "The type of an identifier reference is the declared type of the name" (`var-ref.tex:27-28`). So a variable declared `g: Vector[\RR64,3\] -> Vector[\RR64,3\]` cannot be called at another size, wherever it is declared (defect 2).
- The inference chapter does not describe this context (`Specification/basic/inference.tex:201-205`, as the review `explorations/reviews/c4-fortress-way-2026-11-15.md`, section 1.2, says); this rung changes no text.

## Sentences that the change makes false

None in `Specification/`: `grep -rniE "generic function.*(value|argument)|polymorphic function.*(value|passed)" Specification/appendices Specification/basic/functions.tex Specification/basic/inference.tex` prints nothing, and no Effect of Appendix I names row 156 (the section's own grep). In the record, row 758's notes say that walk refuses `useOne(count)` "as row 156 gives"; walk now runs it (`GenericFunctionAsValueWalk` asserts 1). Row 758 is rung C's to close.

## Suites and other checks

- `ant testSystem`, once, on the code of `42fc9c6641` (the only code state; run before the commit): `BUILD SUCCESSFUL`, `Total time: 4 minutes 36 seconds`; the four shards ran 206, 210, 213 and 204 tests, 833 in all, 0 failures and 0 errors (`ProjectFortress/TEST-RESULTS/system-*/`). The last landed gate ran 830 (`explorations/compile-ladder/climb-batch-30/gate/summary.txt:61-64`); the 3 more are this rung's first three tests. The fourth test was added after, with no change of code, and ran in the passing run above.
- microGPT's quick checks: `explorations/coordinator/tools/mg-run.sh tmp/rung-generic-function-value/mg post`: `VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS` and `rc=0` for both `MicroGptFlatQuick` and `MicroGptAplQuick`.
- The team demos, once, on the code of `42fc9c6641`, by the demo driver (`bash tmp/run-demos.sh tmp/demos`, the script of `explorations/compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out"): `demos: 52 run, 52 reached their end`.
- The stages: none, as the section says. Every path the rung changes is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/` or `explorations/`, so neither the count nor the distance can move (STAGE_BLIND): `interpreter/evaluator/BaseEnv.java`, `EvaluatorBase.java`, `types/FTypeGenericArrow.java`, `values/Fcn.java`, `values/GenericFunctionOrConstructor.java`, `values/NonPrimitive.java`, `values/OverloadedFunction.java`; `ProjectFortress/tests/GenericFunctionAsValueWalk.fss`, `GenericFunctionRowLiftWalk.fss`, `XXXGenericFunctionAtTypeParameterWalk.fss`, `XXXGenericFunctionTopLevelVariableWalk.fss` and `.test`.
- The ladder subset: empty. The ladder runs `fortress compile`, and no file of the baseline's `raw/` has a first error that names what this rung touched (`grep -rlE "of type null|has no type information|Unification error" explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing).
- Competing declarations: none. Each name the rung adds (`FTypeGenericArrow`, `received`, `instanceAt`, `receivedAt`, `leavesOpen`, `instanceReceivedAt`, `unifyArgument`, `domainTypes`, `typeWithGenerics`, `genericType`, `receivedInstances`) occurs in `ProjectFortress/src/com/sun/fortress/` only in the files of this rung, and the four test names occur in no other file of the test folders.

## Existing tests whose verdict, output or pinned message changed

None. `ant testSystem` passed whole, and no test or `.test` file pins `of type null`, `has no type information` or `No type information` (`grep -rln` over the five test folders prints nothing).

## Points to report

1. **The rule as built**: the section above.
2. **Row 156's three failures**, a function generic in a type, in one size and in two, and an overloaded name with a generic declaration: the table above and `GenericFunctionAsValueWalk`.
3. **The two runs to report**: `F156e` and `F156l` above.
4. **The row lift with sized functions**: `GenericFunctionRowLiftWalk`, `rows(half, m)` and `rows(rmsn, x)`.
5. **Existing tests changed**: none.
6. **Files beyond those the section names**: `interpreter/evaluator/values/NonPrimitive.java` (one line, `:273`): the check of an argument against its parameter's type for a plain callee is there, in `buildEnvFromParams`, not at `EvaluatorBase.java:941`, which is the generic callee's. `interpreter/evaluator/BaseEnv.java` (one statement, `:613-614`): where a local variable declared with a type is bound, the only way to receive at a typed variable without editing `LHSEvaluator.java`. `interpreter/evaluator/types/FTypeGenericArrow.java` (new). None is in another rung's list. In `OverloadedFunction.java` the one new member is at the class's end (`:2866-2892`).
7. **The message at no instance** differs from the section's words ("The rule as built", "No instance").

No reserved point was reached: no model line changed, no direct call runs another declaration (the direct call's inference is called, not changed; `unifyArgument` differs from the old code only for an argument that is a generic function or an overloaded one with a generic overload and that did not unify, where the old code raised an error), and walk's open parameter is untouched.

## Decisions, each with the ways not taken

1. **The value gets a type of its own, below the arrow types it can be received at.** Ways not taken: (a) accept a null-typed function at every arrow type in `FType.typeMatch`, which would let any generic function into any arrow-typed parameter and would leave the callee's caches and inference comparing a null; (b) give the value the arrow type of its symbolic instance, which no concrete arrow type is a supertype of. Evidence: the three failures are all one null (`Fcn.java`, `type()`; `FValue.java:141`; `EvaluatorBase.java`, `inferByUnification`).
2. **The instance is the one a direct call at the arrow's domain types runs**, through stand-in values. Ways not taken: a second inference over types written for this purpose (a second rule to keep in step with the first); unifying the declared parameter types with the arrow's domain alone (it would miss the coercion and bound rules of `inferWithCoercion`). Evidence: the section's "as a direct call is".
3. **Receiving happens at the binding, in `NonPrimitive.buildEnvFromParams` and `BaseEnv.putVariable`.** Ways not taken: (a) in `Coercions.coerce`, which every checking site calls, but only where the type does not match, and the file is rung N's; (b) in `LHSEvaluator` and `BuildEnvironments`, rung B's files; (c) no instantiation at all, the value staying generic everywhere, which would run `k(w)` at a size the variable's type excludes and would run `kind` at `ZZ32` under a `ZZ64 -> String` parameter. Evidence: `F156o` and `F156s` above.
4. **A generic function constrains no static parameter of a generic callee.** Way not taken: unifying the function's symbolic arrow type with the declared parameter type, which needs unification between two sets of variables and which the old code does not have. Consequence: defect 1.
5. **An overloaded name keeps its whole overload set at an arrow-typed place.** Way not taken: choosing one declaration at the binding by the arrow type. Evidence: dispatch in Fortress is on the run-time types of the arguments (`SKILL.md`, "Fortress as a language"); before this rung `appZ(twice, z)` already passed the whole function (`F156d` on the base prints `42`).
6. **The overloaded function's type is extended by an override of `type()` at the class's end**, not by adding the generic overloads' types where the type is built (`OverloadedFunction.java:246-279`), which is outside the members that the section gives this rung. A generic member's type unifies with no arrow type (`FType.unifyNonVar`'s default), so `FTypeOverloadedArrow.unifyNonVar` counts the same members as before.
7. **No instance: the place's own refusal** ("The rule as built").
8. **Defects 1 and 2 are recorded as expected-failure tests and rows, not repaired**: 1 needs the inference of decision 4's way not taken; 2 is one call in each of two files of rung B's and one in `BaseEnv.assignValue`, left so that no rung edits another's file and the suite ran on one code state.

## Defects measured, each with its home

1. **A generic function at an arrow type over the callee's own type parameter that a value fixes** (`appT(half, v)`): home 2, the gated expected failure `XXXGenericFunctionAtTypeParameterWalk`, and row NEW-F-1. The specification settles it (the reference's static arguments come from the context).
2. **A top-level variable of arrow type, and an assignment, keep the generic function as it is**: home 2, the gated expected failure `XXXGenericFunctionTopLevelVariableWalk` (the top-level variable; a refusal while top-level variables are initialised counts as a refusal at load), and row NEW-F-2, whose notes hold the assignment's run (`F156r`: `k := half; k(w)` prints `[0#2][ 2.0 3.0 ]`).
3. **Row 156 itself**: home 1, the assertions of `GenericFunctionAsValueWalk` and `GenericFunctionRowLiftWalk`.
4. **`useAny(ident, z)` on the base: `** bug! This should have been an environment with a Top Level`** (`F156h`), a fourth face of row 156 that the row does not list (its history gives a unification error for a parameter typed `Any`): home 1; it runs now (`F156h` prints `5`, and `appAny(ident, z)` in `F156l`). It is in no test, since the checker's answer for a generic function at `Any` is rung C's refusal.
5. **An array literal of generic functions, `[half half]`**: `Can't infer element type for array construction` (`F156n`, before the line was removed). An untyped array literal is row 49's; no new row.

## After this report: the skeptic's fix

This report describes the rung's head `affea715e7`, except that its citations of `BaseEnv.java` are moved by one line to the tree after the skeptic's fix. That fix, `4c66c28fbc`, makes an assignment receive (`BaseEnv.java:333`, `assignValue`), a mutable top-level variable with it, so the sentences above that say an assignment keeps the generic value ("Not reached" under "The rule as built", decision 8, defect 2 and its `F156r` run) hold for `affea715e7` only; an immutable top-level variable still keeps it. `SKEPTIC.md` beside this file gives the finding, the test and the suite's run.

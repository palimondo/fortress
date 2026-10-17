# Rung W, walk infers a generic dotted method's own static arguments (`rung-walk-method-sargs`, climb batch 17)

- problem: ledger row 21, a generic method's own static arguments are not inferred under walk (`explorations/fortress-gap-ledger.md:99`); F-248, rung L's generic `distribute` stops a nested reduction under walk without this fix (`explorations/coordinator/FACTS.md:166`); the probe's base runs, `explorations/perf-probes/walk-generic-static/REPORT.md:13-30`.
- spec: `Specification/basic/inference.tex:47-75` ("The Static Arguments of a Call": a declaration is chosen on the parameter types it declares, then instantiated from the arguments); `Specification/basic/expressions/method-invocation.tex:49-52` ("most method invocations do not include them; the static arguments are statically inferred").
- precedent: the function path's call of a generic declaration, `GenericFunctionOrConstructor.applyInnerPossiblyGeneric` through `EvaluatorBase.inferAndInstantiateGenericFunction` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionOrConstructor.java:51-57`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvaluatorBase.java:72-78`); the declared-domain comparison of an own generic, `moreSpecificDeclaration`, `declaredBelow` and `instanceHolding` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2138-2145`, `:2117-2128`, `:2094-2110` at 3aea3da53); the probe's commit fd7056abf.
- deviation: part A keeps no per-argument-type cache, where `GenericFunctionOrConstructor.applyInnerPossiblyGeneric` keeps one (`GenericFunctionOrConstructor.java:52-56`); the comparison of a generic dotted method on its declared domain is a helper of its own (`OverloadedFunction.java:2035-2086`), not a widening of `ownGeneric`, `declaredBelow` or `instanceHolding`, which walk's load check shares (`OverloadedFunction.java:2051`, `:2117` at 3aea3da53); the specification's text names the new rows NEW-W-1 to NEW-W-3 by placeholder (`Specification/basic/inference.tex:288`, `:291`, `:418`; `Specification/appendices/changes.tex:2120-2124`).
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `Specification/basic/inference.tex`, `Specification/appendices/changes.tex`.

## 1. What changed and why

Under walk an object holds a generic method as its symbolic instance, at static arguments that stand for themselves. A dotted call that wrote no static argument applied that symbolic instance as it was (`DottedMethodApplication.java:166`, the team's line `return cl.applyMethod(self, args);`, the same at a874948ac:166). So the call failed with "Unification error" or "Symbolic type T is being matched to value". An overloaded method set took the symbolic instance for a plain method, so a call that only the generic method fits found "no matching overload". The specification infers the static arguments of every call that does not write them, method invocations included (`Specification/basic/inference.tex:47-75`; `Specification/basic/expressions/method-invocation.tex:49-52`), and walk already does so for functions (P-45, F-26).

The change is in walk only (`git diff --stat 3aea3da53 -- ProjectFortress/src`: two files, +100 -10):

- **Part A, the probe's code as it is** (`DottedMethodApplication.java:166-187`). `applyInnerPossiblyGeneric` applies `instanceFor(cl, args)`. For a symbolic instance of a generic method, that is the instance `EvaluatorBase.inferAndInstantiateGenericFunction` infers from the arguments in the generic method's evaluation environment (`GenericMethod.evaluationEnv`). It does not use the trait method's member environment, which is empty. `isSymbolicInstance` recognizes such an instance: a `MethodInstance` and a `FunctionClosure` whose instance arguments are symbolic.
- **Part B, the probe's code as it is** (`OverloadedFunction.java:1911-1914`, `:1981-1984`, `:2002`, `:2008`, `:2018-2033`). `bestMatchWithCoercion` and `bestMatchInternal` treat a symbolic instance as its generic method when they choose and instantiate an overload. They go through `genericOf` and `inferenceEnv`, which return what the code used before for a real generic function (`gsfn` and `gsfn.getWithin()`).
- **Part B, beyond the probe** (`OverloadedFunction.java:1999`, `:2035-2086`). With the probe's code, a generic dotted method's instance was compared with the set's other methods on its inferred domain, and that domain can tie a plain method's. `Describer.describe(Circle)`, for an inherited `describe[\T extends Shape\](x: T)` beside the object's own `describe(x: Circle)`, answered `"generic"` where the base answered `"circle"` (section 5, `MInstCompare`). `bestMatchInternal` now calls `preferredDeclaration`: when one of the two is such a symbolic instance and exactly one of their declared domains lies inside the other, the inner one wins; otherwise `moreSpecificDeclaration` decides, as before. `methodDeclaredBelow` reads a symbolic instance's domain as its declared domain, each static parameter standing for itself. It decides whether some instance of the other generic method holds that domain, as `instanceHolding` does for an own generic, from values that carry only types, and memoizes the answer per pair.

Part B infers again on every call of an overloaded method, since `OverloadedMethod` keeps no cache (the probe's section 7). The pair comparison is memoized.

Not changed, each left as the brief leaves it: written static arguments on an overloaded receiver (row 744, `DottedMethodApplication.typeApply`, `:124-143`); an expected type that alone fixes the argument (row 510); a generic dotted method beside a plain one in one declaration list (NEW-W-1); `bool` static parameters (row 307, NEW-W-2).

## 2. The tests, failing and passing

Walk tests, in `ProjectFortress/tests/`:

| Test | What it asserts | Base | Final |
|---|---|---|---|
| `MethodStaticArgInference` (renamed from `XXXMethodStaticArgRungT`) | `O.get(Box[\ZZ32\](z)) = 3` | red, unification error | green |
| `MethodStaticArgInheritedGeneric` | a trait's `distribute[\K\]`, alone under its name, gives `NoPair[ZZ32]` and `NoPair[Lifted[ZZ32]]` | red, unification error | green |
| `MethodStaticArgOverloadedReceiver` | the same generic beside the object's plain `distribute(r: Mx[\T\])`: `NoPair[ZZ32]` for an `Sm`, `SomePair[Lifted[ZZ32]]` for an `Mx` | red, "Failed to find any matching overload"; red with part A alone | green |
| `MethodStaticArgCases` | sizes (`idx`, `sz`), a `Vector` (`first`, `len`), a lone `T` (`id`), mixed widths (`same(z, w)` gives `[3:ZZ64,4:ZZ64]`), a generic receiver (`get`, `both`), a bound naming the object's parameter (`pick`), a library bound in a trait (`num`) | red, unification error at the first | green |
| `MethodStaticArgDeclaredDomain` | a Circle takes the plain method and a Square the generic one, whether the generic is inherited or the object's own | red on the base (a Square finds no overload) and on the probe's code (a Circle takes the generic) | green |
| `NestedReductionFusion` | over `inits <\|1, 3, 2\|>`, with dispatching off and on: SUM of SUMs 11, MAX of MAXes 3, MAX over SUM 6, MIN over SUM 1, SUM over PROD 10 | green (a guard for rung L) | green |
| `XXXBoolStaticArgMethod` | NEW-W-2's expected failure | expected failure | expected failure |
| `XXXTraitBoundGenericMethod` | NEW-W-3's expected failure | expected failure | expected failure |

Compiled tests, in `ProjectFortress/compiler_tests/`: `BoolStaticArgRunLink.test` with `XXXBoolStaticArgRun.test` (NEW-W-4), and `XXXBoolStaticArgMethodWritten.test` (NEW-W-5). The compiled path is not changed, so they ran once, on the old code.

The failing runs, through the harness on the base's code, before the first build of the edit (`ant compileAll` of part A started after 13:37:56Z, the commit of the tests, e42e05498):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-method-sargs/h1 <the walk tests>
    # harness-one 2026-10-17T13:36:56Z; tree 3aea3da53; nproc=4; load 0.52 0.69 0.50; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    Unification error: Closure/Constructor for get param 1 (b:Box[\T@tmp/rung-walk-method-sargs/h1/tests/MethodStaticArgInference.fss:8:1-10:2\]) got arg Box[\ZZ32\] of type Box[\ZZ32\]
    Unification error: Closure/Constructor for idx param 1 (b:Sized[\j\]) got arg Sized[\2\] of type Sized[\2\]
    Tests run: 8,  Failures: 3,  Errors: 0

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-method-sargs/h1 ProjectFortress/tests/MethodStaticArgInheritedGeneric.fss ProjectFortress/tests/MethodStaticArgOverloadedReceiver.fss
    # harness-one 2026-10-17T13:37:39Z; tree 3aea3da53; ...
    Failed to find any matching overload, args = (Sm[\ZZ32\]), overload = {
    Unification error: Closure/Constructor for distribute param 1 (r:Red[\ZZ32,K@tmp/rung-walk-method-sargs/h1/tests/MethodStaticArgInheritedGeneric.fss:14:1-47\]) got arg Sm[\ZZ32\] of type Sm[\ZZ32\]
    Tests run: 2,  Failures: 2,  Errors: 0

The three expected failures the base holds, `XXXMethodStaticArgRungT`, `XXXDispatchGenericMethodBesidePlain` and `XXXExpectedTypeFixRungT`, showed "OK Saw expected exception" at 13:35:18Z, before the rename. With parts A and B, a copy of `XXXMethodStaticArgRungT` reported " Missing expected failure " (13:42:48Z).

With part A alone (built at 13:40; `harness-one.sh` at 13:41:26Z), part B's test stayed red: `MethodStaticArgOverloadedReceiver.fss:27:17-46: Failed to find any matching overload, args = (Sm[\ZZ32\])`, `Tests run: 4,  Failures: 1`.

`MethodStaticArgDeclaredDomain` was written after the probe's code was built. It failed through the base build's harness on the old code, and through mine on the probe's code, before the change of section 1's third item was built:

    FORTRESS_HOME=/home/user/fortress-base17 /home/user/fortress-base17/explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-method-sargs/old-harness $PWD/ProjectFortress/tests/MethodStaticArgDeclaredDomain.fss
    # harness-one 2026-10-17T14:00:28Z; tree 3aea3da53; ...
    Failed to find any matching overload, args = (Square), overload = {

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-method-sargs/h1 ProjectFortress/tests/MethodStaticArgDeclaredDomain.fss
    # harness-one 2026-10-17T14:00:33Z; tree e42e05498; ...
    FAIL: J7/0:generic =/= J6/0:circle; the object's plain method on Circle lies inside the inherited generic method's declared domain, so a Circle takes it; ...

The passing run, the last one after the last change of code (built at 14:01-14:02, 57 s):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-method-sargs/h1 <the eight walk tests, XXXDispatchGenericMethodBesidePlain, XXXExpectedTypeFixRungT, LibraryOverloadFamilies, GeneratorDeclarations, Generator2Test, ExclusionRemainderRungH>
    # harness-one 2026-10-17T14:02:53Z; tree 3167ffa83; ...
    OK (14 tests)

The first expected failure added, `XXXBoolStaticArgMethod`, was shown red on a deliberate fix through the harness, from its place in `ProjectFortress/tests/`. With both parameter types written `Any` for one run, then restored with `git checkout`, the run printed `REACHED`, `PASS`, " Missing expected failure " and `Tests run: 1,  Failures: 1`.

The compiled expected failures, on the old code:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base17 $PWD/tmp/rung-walk-method-sargs/old-caches junit $W/BoolStaticArgRunLink.test $W/XXXBoolStaticArgRun.test $W/XXXBoolStaticArgMethodWritten.test
    . compile .../XXXBoolStaticArgMethodWritten java.lang.ClassCastException: class com.sun.fortress.nodes.TraitType cannot be cast to class com.sun.fortress.nodes.BoolExpr ...
    Caused by: java.lang.NoClassDefFoundError: true$RTTIc
    OK (3 tests)

## 3. Suites

Each ran once, on the final code state, after the last edit (`ant compileAll` of 14:01):

    ant testSystem    BUILD SUCCESSFUL / Total time: 6 minutes 8 seconds; shards 159, 155, 159, 164: 637 tests, 0 failures, 0 errors
    ant testSpecData  BUILD SUCCESSFUL / Total time: 1 minute 23 seconds; Tests run: 130, Failures: 0, Errors: 0

The base holds 630 walk tests: the batch 16 gate's 629 (`explorations/compile-ladder/climb-batch-16/gate/summary.txt:57-60`) plus `XXXGenericBesideGenericSameDomain`, which 464159846 added after that gate. 637 is 630 plus 7 new walk tests; the promotion is a rename. No walk test's verdict changed beyond the promotion and the new tests: every test passes in both runs. The probe's 66 walk tests that write static arguments on dotted calls or declare generic methods are among them.

The time is a smoke test (P-29): 6 min 8 s, with the machine at load 3.09 at the start and 17.65 at the end, from other agents' runs. The batch 16 gate's run took 3 min 34 s at load 3.21 (`summary.txt:66`, `:73`). My run on the probe's code state took 4 min 8 s, at load 2.35 to 9.00. Machine: 4 CPUs, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4.1. There is no slowdown of several times that the load does not account for.

The probe's code state also ran `ant testSystem` (636 tests, 0 failures) and `ant testSpecData` (130, 0 failures); the final state superseded it.

## 4. Where the fix belongs, and the precedent

`explorations/coordinator/map/spec-to-implementation.md:214` places walk's multiple dispatch in `values/OverloadedFunction.java`, `bestMatch`; `modules-and-phases.md:371` puts the per-call selection on run-time values there. The dotted call is `DottedMethodApplication`, which `make` builds and `applyInnerPossiblyGeneric` applies (`DottedMethodApplication.java:52-114`, `:165-167` at 3aea3da53). Both are in walk's evaluator, not in the checker, the code generator or the library.

The ways the tree offers, and the one followed:

1. Infer at the dotted call, as the function path infers at a generic function's call (`GenericFunctionOrConstructor.java:51-57`), through the same entry point, `inferAndInstantiateGenericFunction`. Taken: part A.
2. Make the object's member environment hold the `GenericMethod` itself rather than its symbolic instance, so every caller meets a `GenericFunctionOrMethod`. Not taken: the member tables, the load check over method sets and `typeApply` all read the symbolic instance (`GenericMethod.newClosure`, `GenericMethod.java:48-64`; `typeApply`, `DottedMethodApplication.java:131-139`), so this is a change of several files beyond the two named.
3. In an overloaded set, treat the symbolic instance as its generic where the set chooses (`bestMatchInternal`, `bestMatchWithCoercion`). Taken: part B.
4. Compare it there on its declared domain by widening `ownGeneric` to symbolic instances. Not taken: `ownGeneric`, `declaredBelow` and `instanceHolding` also serve the load check (`validOnDeclaredDomains`, `OverloadedFunction.java:760-791` at 3aea3da53), which is rung G's declaration, and `ownGeneric`'s comment says a generic dotted method is compared on its instance. Taken instead: a dispatch-only helper, `preferredDeclaration` with `methodDeclaredBelow`, which follows `moreSpecificDeclaration`'s rule and `instanceHolding`'s method.

The precedent repaired the same defect for generic functions (rung W of climb batch 7b, `explorations/compile-ladder/rung-walk-dispatch/REPORT.md` section 5.1). Other sites in `OverloadedFunction.java` that test `instanceof GenericFunctionOrMethod`, at 3aea3da53: three at dispatch or explicit instantiation (`:1853`, the bug check in `applyInnerPossiblyGeneric`; `:2163`, `stableDomain`; `:2228`, an overloaded function's explicit instantiation) and eight in the load check and its helpers (`:665`, `:767`, `:770`, `:864`, `:1021`, `:1284`, `:1328`, `:1334`). All are left to the load check and rung G.

## 5. Programs run old against new

Each ran under walk, from `tmp/rung-walk-method-sargs/`: the new code in my tree, the old code through `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base17 <tree>/tmp/rung-walk-method-sargs/old-caches`.

| Program (the probe's, or mine) | Old | New |
|---|---|---|
| `MBoxObj`, `MBoxGenRecv`, `MVector`, `MSize`, `MSizeVector`, `MTraitLone`, `MTraitNum`, `MObjBound` | unification error or "Symbolic type ... is being matched to value" | `3`, `Box[ZZ32]`; `3`, `s 3`; `7`; `7`, `2`; `3`; `none`, `NoPair[ZZ32]`; `5`, `Just(5)`, `5`; `picked`, `picked` |
| `MMixed` | function `[3:ZZ64,4:ZZ64]`, then the method stops | the method `[3:ZZ32,3:ZZ32]` and `[3:ZZ64,4:ZZ64]` |
| `MPlain` | stops | `id: 3`; `wrap: other`, a `Box[\Int\]` (row 364) |
| `MTraitOver` | "Failed to find any matching overload" | `none`, `NoPair[ZZ32]` |
| `MTraitPlain` | `some` | `some` |
| `FuseSumSum`, `FuseMaxMax`, `FuseMaxSum`, `FuseMinSum`, `FuseSumProd` | 11 11, 3 3, 6 6, 1 1, 10 10 | the same |
| `MInstCompare` (inherited generic, the object's plain on Circle) | `circle`, then a Square finds no overload | on the probe's code `generic`, `generic`; final: `MethodStaticArgDeclaredDomain`, the same declarations, green |
| `MInstCompare2` (inherited plain, the object's generic) | `circle`, then no overload | on the probe's code `generic`, `generic`; final: the same test, green |
| `MExpectedNew` (`Fac.mk()`, `mk[\T\](): BoxT[\T\]`) | `BoxT[\T@...\]`, then 'RHS expression type BoxT[\T@...\] is not assignable to LHS type BoxT[\ZZ64\]' | `BoxT[\Any\]`, then the same refusal with `BoxT[\Any\]` (row 510) |
| `MBesideTrait` (generic and plain `describe` in one trait) | 'This should have been an environment with a Top Level' at load | the same (NEW-W-1) |
| `MBoolTrait`, `MBoolP`, `MBoolE` | 'subtypeCompareTo(... BoolArg ...) is not implemented!' at load | the same (NEW-W-2) |
| `MBoolTop` (a function and a field of type `Flag[\true\]`), `MBoolR`, `MBoolFW` | `8`, `9`; `7`; `7` | the same |
| `MTraitBoundW`, `MTraitBoundGen` | 'Missing type R' | the same (NEW-W-3) |

Compiled, on the old code (the compiled path is unchanged): `XXXTraitBoundGenericMethod` and `XXXDispatchGenericMethodBesidePlain` compile and print `PASS`. `XXXBoolStaticArgMethod` stops the checker with NEW-W-5's `ClassCastException`. `CBoolPlain` and `CBoolFun` (a plain method and a generic function over `Flag[\true\]`) compile, then stop at run time with `NoClassDefFoundError: true$RTTIc` (NEW-W-4).

## 6. Distance, count and ladder

Neither stage can move: every path the change adds or touches is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `ProjectFortress/compiler_tests/`, `Specification/` or `explorations/` (`git diff --name-only 3aea3da53`; `git status --short` shows only `tmp/`). I ran neither.

The change's own ladder subset is empty. No recorded first error in the baseline's raw output names walk's code (`grep -rl "DottedMethodApplication\|OverloadedFunction\|interpreter.evaluator" explorations/compile-ladder/baseline-2026-09-19/raw/` prints nothing), and the ladder runs only the compiled path. I ran no driver.

## 7. What the specification settles

The chapter already infers a method's static arguments and chooses a declaration on the parameter types it declares (`Specification/basic/inference.tex:47-75`), so no normative sentence changes. The written form of a `bool` static argument is settled (`Specification/basic/trait-parameters.tex`, "Bool Parameters": "These parameters are instantiated at runtime with boolean values"), so NEW-W-2, NEW-W-4 and NEW-W-5 are expected failures. A trait's method may bound its own static parameter by the trait's (`Specification/basic/traits.tex`, "Method Declarations", as row 567 reads it), so NEW-W-3 is an expected failure. NEW-W-1's pair is valid overloading (`Specification/advanced/overloading.tex`, "Declarations with Static Parameters").

The sentences of walk's revision boxes I edited, in the revision form:

- `Specification/basic/inference.tex:283-292`: "It compares declarations with static parameters on the parameter types they declare, except generic dotted methods (row~21 of the revival's gap ledger), and dispatches a converted call again, except a call of an overloaded method." It now says that walk infers a generic dotted method's static arguments as it does a generic function's, alone under its name or among its receiver's overloads, compares the method on its declared parameter types, and still stops on NEW-W-1 and NEW-W-3. The clause on the converted call is kept.
- `Specification/basic/inference.tex:408-410`: "and it leaves a generic method's static parameters uninstantiated (row~21)" now says that walk instantiates a parameter that only the expected type would fix at its bound, as it does for a generic function (row 510).
- `Specification/basic/inference.tex:416-418`: "(rows~21 and~307 of the revival's gap ledger)" now names row 307 and NEW-W-2.
- Appendix I, the entry "The inference of a call's static arguments": the Change's history (`Specification/appendices/changes.tex:1876-1889`) quotes the old text of both boxes and says what they now say; the Effect (`:2112-2125`) says what walk now does, with rows 21, NEW-W-1 to NEW-W-3 and 744. No other rung edits that entry (`explorations/coordinator/CLIMB-BATCH-17.md:311`).

The front matter's paragraph is not made false. The specification builds clean: `./ant genSource` and `./ant tex` both end in BUILD SUCCESSFUL, and `grep -c "LaTeX Warning: Reference\|multiply defined\|^! Undefined control sequence" fortress.log` prints 0. The skill's own grep pattern counts 42 lines, but each is the text of LaTeX's warning macro, not a warning.

Sentences made false that I did not edit, for the gather:

- F-248 (`explorations/coordinator/FACTS.md:166`): "A `SUM` of `SUM`s over a generator of generators now stops, since walk infers no static argument of a generic method (row 21)." This holds of rung L's library without this change; on the merged tree the nested reduction runs, which `NestedReductionFusion` asserts.
- F-26 (`explorations/coordinator/FACTS.md:20`): "A generic trait's functional method and a generic dotted method are still compared by their instances." A generic dotted method is now compared on its declared domain where exactly one of the two declared domains lies inside the other, as an own generic is (`MethodStaticArgDeclaredDomain`).
- Once row 21 closes: the notes of row 21 (`explorations/fortress-gap-ledger.md:99`) and of row 744 (`:352`, "G0's inferred call fails wherever only the generic fits: row 21"). Also `explorations/perf-probes/generic-distribute/REPORT.md` section 5, "G0's inferred call fails wherever only the generic fits", which is a probe's record of the base.
- `ownGeneric`'s comment, "a generic dotted method has no symbolic instantiation to read its declared domain from; both are compared on the instance a call makes" (`OverloadedFunction.java:2044-2050` at 3aea3da53). It stays true of the load check and of `moreSpecificDeclaration`, but not of dispatch as a whole. I left it unedited because `ownGeneric` belongs to the load check.

No sentence of the skill says walk does not infer a method's static arguments (`grep -n -i "dotted\|generic method" .claude/skills/fortress-repo/references/*.md`).

## 8. Points to report

- **fd7056abf's code, changed.** Parts A and B are as the commit has them. In addition, `preferredDeclaration` and `methodDeclaredBelow`, with their call in `bestMatchInternal` (`OverloadedFunction.java:1999`, `:2035-2086`). The reason: the probe's code chose the generic method for a Circle where a plain method on Circle is more specific, a wrong answer in a case the base answered right (section 1; `MethodStaticArgDeclaredDomain`, red on the probe's code).
- **No walk test's verdict changes** beyond the promotion and the new tests (section 3).
- **The system suite's time**: 6 min 8 s at a load of up to 17.65, beside the base gate's 3 min 34 s at 3.21; no slowdown of several times (section 3).
- **Row 21's notes, each case's home.** A size, a `Vector`, mixed widths, a lone `T`, a generic receiver, the trait-inherited generic and the overloaded receiver now run (`MethodStaticArgCases`, `MethodStaticArgInheritedGeneric`, `MethodStaticArgOverloadedReceiver`, `MethodStaticArgDeclaredDomain`). The expected type that fixes a method's argument is row 510's method form (`XXXExpectedTypeFixRungT`, re-cited). A generic dotted method beside a plain one in one declaration list is NEW-W-1 (`XXXDispatchGenericMethodBesidePlain`, re-cited). `bool` is row 307 and NEW-W-2. The nested reductions of `Generator2.fss:73` run with rung L's library, and `NestedReductionFusion` guards the pair. The two new defects: NEW-W-2 shows under walk at load, and the same programs hit two other compiled-path defects, NEW-W-4 (run time) and NEW-W-5 (checker); NEW-W-3 shows under walk only, and the compiled path prints `PASS`.
- **The team's lines changed.** `DottedMethodApplication.java:166`, `return cl.applyMethod(self, args);` (a874948ac:166), is now `return instanceFor(cl, args).applyMethod(self, args);`. `OverloadedFunction.java:1981-1982`, `if (sfn instanceof GenericFunctionOrMethod) { GenericFunctionOrMethod gsfn = (GenericFunctionOrMethod) sfn;` (a874948ac:818-819), is now `GenericFunctionOrMethod gsfn = genericOf(sfn); if (gsfn != null) {`. The other changed lines of `bestMatchWithCoercion` and `bestMatchInternal` are the revival's (0416821881, 8f7e183d4, b628871a2).
- **Sentences made false, and the specification sentences I edited**: section 7, with the edits at `Specification/basic/inference.tex:283-292`, `:408-410`, `:416-418` and `Specification/appendices/changes.tex:1876-1889`, `:2112-2125`.
- **Beyond the named methods.** Two more helpers after `bestMatchInternal` than the brief's two, and the call in `bestMatchInternal` changed from `moreSpecificDeclaration` to `preferredDeclaration` (`OverloadedFunction.java:1999`). This is still walk's `OverloadedFunction.java`, below rung G's declarations. Appendix I's entry "The inference of a call's static arguments" is edited beside inference.tex, for the revision form (decision 4). Three compiled test files sit beside the walk tests (NEW-W-4, NEW-W-5). There is no library or checker edit.

## 9. Decisions

1. **Improve the probe's part B rather than take it as it is.** Ways: take fd7056abf as it is and file the tie as a new row; widen `ownGeneric` to symbolic instances; add a dispatch-only helper. Chosen: the helper. Evidence: `MethodStaticArgDeclaredDomain` is red on the probe's code (`FAIL: J7/0:generic =/= J6/0:circle`), where the base answered `circle` (`MInstCompare`, old code); P-45 says walk dispatches on declared domains; `ownGeneric` serves the load check (`validOnDeclaredDomains`), which is rung G's declaration.
2. **Part A without a cache.** Ways: a per-argument-type cache like the one `GenericFunctionOrConstructor` keeps; none. Chosen: none, as in the probe. `GenericMethod.make` already memoizes the instances (`GenericMethod.java:80-84`), and walk's speed decides nothing (P-29).
3. **Split the overloaded-receiver test in two.** Ways: one test with both receivers, as the brief describes; two tests. Chosen: two, `MethodStaticArgInheritedGeneric` and `MethodStaticArgOverloadedReceiver`. The base then shows both messages, "Unification error" and "Failed to find any matching overload", and part A alone leaves only the second test red. The single test stopped at its first assertion on the base and hid the second message (`h1-base`, 13:36:56Z).
4. **Edit Appendix I's entry beside inference.tex.** Ways: inference.tex only, leaving the entry to the gather; both. Chosen: both. In the revision form the box is the callout and the entry is the record (`references/specification.md`, "Changing the text: the revision form"); no other rung edits this entry (`CLIMB-BATCH-17.md:311`); and the entry records every earlier revision of these boxes (`Specification/appendices/changes.tex:1832-1875`). No decision record: the brief asks for none, the entry's rationale is still P-45's, and this report holds the reasoning.
5. **NEW-W-2's claim is wider than the probe's.** Ways: the probe's "an object method with its own `bool` static parameter"; the measured cause. Chosen: any method of an object or trait whose parameter type has a `bool` static argument. `unflagTrue(f: Flag[\true\])`, which has no static parameter, stops the same way, and a method's own `bool` parameter that no parameter type mentions runs (`MBoolP`, `MBoolR`). The test asserts both written forms, not the inferred form, which is row 307's.
6. **The compiled path's `bool` defects get rows and expected failures** (NEW-W-4, NEW-W-5). Ways: only say in NEW-W-2's row that the compiled path stops; rows with tests. Chosen: rows with tests. They are other defects, at other sites, and the specification settles them (`references/tests-writing.md`, "How a defect is recorded", home 2). F-36 calls the type argument of a `bool` parameter a latent defect, and these runs show it.
7. **NEW-W-3's test asserts both the written and the inferred call.** Ways: the written call only; both. Chosen: both. The object stops before either call runs, and with this change the inferred call runs wherever the object loads (`MObjBound`, a bound naming a generic object's own parameter, runs).
8. **The section of each new row**: NEW-W-1 in section 4, beside row 723; NEW-W-2 and NEW-W-5 in section 2, beside row 307; NEW-W-3 in section 3; NEW-W-4 in section 12.

## 10. Defects and their homes

| Defect | Home | Where |
|---|---|---|
| Row 21: a generic dotted method's own static arguments are not inferred under walk | 1, repaired | `MethodStaticArgInference`, `MethodStaticArgInheritedGeneric`, `MethodStaticArgOverloadedReceiver`, `MethodStaticArgCases` |
| The probe's code compares a generic dotted method on its inferred instance, so a tie takes the generic | 1, repaired in this change | `MethodStaticArgDeclaredDomain` |
| NEW-W-1: a generic dotted method beside a plain one in one declaration list stops at load | 2 | `XXXDispatchGenericMethodBesidePlain`, re-cited |
| NEW-W-2: a method whose parameter type has a `bool` static argument stops walk at load | 2 | `XXXBoolStaticArgMethod` |
| NEW-W-3: a trait's generic method bounded by the trait's parameter stops walk at the extending object | 2 | `XXXTraitBoundGenericMethod` |
| NEW-W-4: a value of a type with a `bool` static argument stops the compiled run, `true$RTTIc` | 2 | `XXXBoolStaticArgRun` with `BoolStaticArgRunLink` |
| NEW-W-5: the checker stops on a method's own `bool` static parameter written at the call | 2 | `XXXBoolStaticArgMethodWritten` |
| Row 510's method form: the expected type does not fix a method's static argument | 2, existing | `XXXExpectedTypeFixRungT`, re-cited to row 510 |
| Row 364: a lone `T` from a `ZZ32` argument is `Int`, now for a method too (`MPlain`: `wrap: other`) | 3, existing | row 364's reproducer |
| Row 744: written static arguments on an overloaded receiver stop | 3, existing | row 744 |

## 11. For FACTS

Under walk, a dotted call that writes no static argument to a generic method infers the method's own static arguments from the run-time types of the arguments, as a call of a generic function does, whether the method is alone under its name or among the receiver's overloads; a method that a trait declares is instantiated without coercion or bound (NEW-W-7, the skeptic's, `SKEPTIC.md`). Against the set's other methods, a generic dotted method is chosen on its declared domain where exactly one of the two declared domains lies inside the other. This means rung L's generic `distribute` runs the nested reductions under walk, and F-248's stop holds only without this change. Gated by `tests/MethodStaticArgInference.fss`, `MethodStaticArgOverloadedReceiver.fss`, `MethodStaticArgDeclaredDomain.fss` and `NestedReductionFusion.fss`. Detail: this report, sections 1 and 2.

## 12. Commands worked out

- `FORTRESS_HOME=<base-build> <base-build>/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/<dir> <tree>/ProjectFortress/tests/X.fss`: runs a walk test on the old code once the tree holds the fix (the skill's form, `references/worktrees.md`).
- `explorations/coordinator/tools/old-fortress.sh <base-build> <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/X.test ...`: runs compiled tests without the library order, where the change leaves the compiled path as the base has it.

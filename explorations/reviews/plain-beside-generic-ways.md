<!-- 2026-09-28, 19:50 UTC. PLAN item 30, ledger row 496: a clean worker's list of the ways, with the nine steps (protocol principle 2), for Pavol through the coordinator. Read first: CLAUDE.md, explorations/protocol.md, coordinator/POSITIONS.md whole; then the record the brief named (rung G's REPORT.md section 9, SKEPTIC.md section 13, probes/differential-after.txt, probes/for-pavol.txt; ledger rows 495, 496, 499; mie-probes/scope-call-site-dispatch.md; reviews/overloading-judgement.md, overload-static-params-ways.md, conversion-overloading-ways.md, conversion-overloading-judgement.md, option-2-soundness.md; the two FACTS entries), and the primary sources cited below. Measured only what no record answers: six small probes (probes/), run on rung G's build (/home/user/fortress-genrt at 8b2f53430, no source edits) with a private cache outside both trees (run.sh), FORTRESS_THREADS=1, on a machine with nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz, JDK 25.0.4, load 1.7 to 3.5 at the starts (each capture's first line). No timing was taken. "By reading" marks a claim not run; "my reading" marks an opinion. -->

# A generic declaration beside a plain one: which runs when only the value fits the generic

## For Pavol

**The question.** Answer 9 lets a name have a generic declaration and a plain one, for example `grab[\X\](t: Tag[\X\])` beside `grab(a: Any)`. A call `grab(a)` with `a: Any` is resolved by the checker to the plain declaration, since only it accepts an `Any`. At run time `a` holds a `RedTag`, which is a `Tag[\Red\]`, so the generic declaration fits too and is the more specific one. Which runs?

**Terms.** A *declaration* (an *arm*) is one definition of the name. A *generic* arm has static parameters (`[\X\]`); a *plain* arm has none. The *static choice* is the arm the checker picks from the declared types. *Dispatch* is the run-time choice from the values' actual types. An *instance* of a generic arm is the arm at one value of its parameters, `grab` at `X = Red`. A *dispatcher* is the compiled method that makes the run-time choice.

**What the evidence says, in short.**
- Every source that speaks runs the generic arm, at the instance the value fixes: the type group's 2011 paper names this exact case, Welterweight (2012) formalises it, Naden's 2012 notes work through it, the restart's overloading chapter states it, and the chapter's own applicability rule gives it once answer 9's revision removes the sentence.
- Both paths were built to do this. Walk instantiates every generic arm from the run-time values. The compiled dispatcher reads the instance from the value (Naden, 2011).
- Every divergence measured is a defect, not a rule. Walk's "plain" answer is ledger row 157 (walk crashes on a generic arm whose declared return type is `Any`, and silently drops the arm). The compiled crashes are the `ZZ32` spelling (row 494's remainder) and a cast to the arm's unrewritten return type.
- The library relies on the generic answer. Every list and map comprehension joins its parts with `a APPCOV b` on two `AnyCovColl`s, whose plain arm is a deliberate `fail`. The tuple `=` sits beside the `Any` catch-all `=`.
- Eight gated compiler tests already assert it: the team's `Compiled12.invariantInference`, rung Z's six sized-dispatch tests and rung G's own `FirstLoadThreadsRungG`. Row 413 (home 2) already reads the specification this way.
- What is written nowhere is not which arm runs but which instance it runs at when nothing in the call fixes it. Under instantiation exclusion that question has one answer wherever the parameter occurs in a parameter type such as `Tag[\X\]`. It is open only for a bare `T`, for a parameter that occurs only covariantly, and for a parameter in no parameter type (row 400).

**The ways** (section 9 gives each with what it touches):
1. The generic arm runs, at the instance the value fixes. This is the library's own way.
2. The plain arm runs: a generic arm is dispatched only at the call site's static arguments, and a plain static choice has none.
3. Refuse the pair at the declaration.
4. Refuse the call.
5. Leave it to the program's own devices.

**Does the conversion decision of 2026-09-28 already settle it?** For which arm runs, yes, by its own words: it defines applicability on quantified domains ("a generic declaration fits when some instance within its bound fits") and dispatch as the most specific declaration applicable to the values. That is way 1. It does not say how a generic arm chosen only at run time gets its instance: its instantiation step speaks of the statically selected declaration. One sentence is missing.

**What answer 9's positional rule does to the pair.** Nothing. As worded it binds two generic arms, and a plain arm has no static parameters. Extending it to a zero-length list would be way 3, which reverses answer 9's own "a generic arm beside a plain arm stays legal".

**My reading, marked as mine:** way 1, with one sentence on the instance and the defects on each path fixed where they already sit.

## 1. The mathematics and the type theory

- **The two domains.** The type group's model reads a generic arm as one declaration whose domain is existentially quantified: `∃X. Tag[\X\]`, the values whose type is `Tag[\W\]` for some `W`. A plain arm is the degenerate case (`Papers/Types/introduction.tick:320-331`). "A function declaration is applicable to a type if and only if at least one of its instances is" (`Papers/Types/setup.tick:393-397`).
- **The order.** `∃X. Tag[\X\]` is a strict subset of `Any`, so the generic arm is more specific than the plain one. The value `RedTag` is in both domains, with the witness `X = Red` for the first.
- **Dispatch** picks the most specific arm whose domain holds the value. So the generic arm runs, at the witness.
- **The paper names this exact case** (`Papers/Types/rules.tick:118-129`): "If d2 is the most specific declaration applicable to the static types of the argument expressions, and d1 ≤ d2 is the most specific declaration applicable to the ilks of the arguments, then the type parameter instantiations derived by static type inference are relevant to d2, but not to d1. Because the call is dispatched to d1, we require type parameters for d1 to be inferred dynamically. Showing how to do so is beyond the scope of this paper." (An *ilk* is the paper's word for a value's run-time type.)
- **Is the witness unique?** Instantiation exclusion (route A, POSITIONS 2026-09-24) says no type is two instantiations of one generic trait. So where `X` occurs in a parameter type as the argument of a trait, as in `Tag[\X\]`, the value fixes `X` uniquely, and "the instance the value fixes" needs no further rule. It is not unique in three cases:
  - `X` occurs bare, as in `f[\T\](x: T)`. Every supertype of the value's type is a witness.
  - `X` occurs only covariantly.
  - `X` occurs in no parameter type (row 400's `ee[\nat n\](x: ZZ32)`). No value fixes it.

  For the first two, Welterweight takes the least witness: "inference also aims to obtain the most specific instantiation of an applicable entrypoint" (`Papers/Welterweight/dispatch.tick:67`). Naden adds an upper bound from the static return type (section 3).
- **Soundness.** Both readings are sound. The specification's promise is that the dynamic choice is at least as specific as the static one (`Specification/advanced/overloading.tex:466-468`). Way 1 keeps it strictly. Way 2 keeps it trivially, because the dynamic choice is the static one. With way 1, type safety of the result comes from the return-type rule over every instance, which is answer 9's defect-2 fix. The generic's result at the witness must lie below the plain arm's declared return type.
- **What differs is meaning, not safety.** Under way 2 the arm that runs depends on the declared type of the variable that holds the value. Measured with `PbgStatic`, one `RedTag` passed three ways:
  - through a variable of type `RedTag` or `Tag[\Red\]`, the generic arm runs, on both paths;
  - through a variable of type `Any`, way 2 gives the plain arm.

  Dispatch on run-time types exists to prevent that. It is the Types paper's argument against the instantiation reading (`introduction.tick:171-251`): the `quux` example, where the arm chosen must follow the value.

## 2. What each path does today

Measured here and on record. Each capture is named.

**Compiled.**
- **The code generator is built for way 1.** A dispatcher whose least specific arm is plain tests each more specific generic arm by reading the arm's static arguments from the value's run-time type descriptor and loading that instance. This is "Runtime inference for some cases" (`/home/user/fortress-genrt/ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1484-1803`). It was added by Karl Naden: "easy cases of dynamic inference" (`babe99f3b`, 2011-08-01) and `519ad598f` (2011-08-11).
- **It runs the generic arm wherever that path works:**
  - the team's gated `compiler_tests/Compiled12.invariantInference`: a plain `f(x: Any, z: Any, y: Any)` beside six generic arms, twelve calls with `Any`-typed arguments, each expecting a generic arm's answer (`.test`: `run_out_equals`; passing before and after rung G, `compile-ladder/rung-generic-runtime/probes/compare-generic-overload.txt:10`);
  - `MieDispatchAny`'s `peek(a1)` → `Marker[Red]` (`reviews/mie-probes/scope/dispatch-probes.compiled.txt:27`);
  - `O2Lone`'s `op(a, a2)` with two `Any`-typed `ZZ32`s → `op generic[ZZ32, ZZ32]` (`reviews/option-2-soundness/summary.txt:174`);
  - `PbgRetObject` → `Marker[Red] (the generic declaration)` (`captures/ret-object.txt`);
  - the revival's own gated tests, listed in section 5.
- **It dies on two defects:**
  - The instance is spelled from the descriptor's Java class, so a `ZZ32` becomes `fortress|CompilerBuiltin%ZZ32` (`RTHelpers.java:174-175`; row 494's remainder). This is `PlainBesideZZ32`.
  - The arm's result is cast to its declared return type spelled with its own parameter, which nothing rewrites in a dispatcher that is not a template (`OverloadSet.java:1796-1803`; scope note section 4). This is `PlainBesideRet`, and `PbgStatic`'s third call (`captures/both-paths.txt`).
- **Where the value path cannot join two run-time types without a union, it quietly falls to the plain arm.** `O2Lone`'s `op(a, aw)` with a `ZZ32` and a `ZZ64` prints `op plain` (`OverloadSet.java:1650`, "fails if cannot join w/o union"; `summary.txt:175`). This is the bare-`T` case of section 1.
- **The checker's own annotation reads way 2.** Its list of the arms a call may reach at run time drops a generic arm whose static parameters the static choice's arguments do not fix (`STypesUtil.scala:1101-1130`; Hilburn, `dc75ba359`, 2009-06; Kilpatrick, `a7f149194`, 2009-10). By reading, the code generator does not consult that list:
  - `CodeGen.java` never calls `getNewOverloadings`;
  - it names the call from the chosen overloading's type (`:3605-3606`, `:6130`, `:6196`) and calls the set's dispatcher, which covers every arm.

  So on the compiled path the checker (2009) and the code generator (2011) disagree, and the program runs the code generator's answer.

**Walk.**
- **Walk is built for way 1.** `bestMatchInternal` instantiates every generic arm from the run-time arguments and keeps the most specific arm that matches (`/home/user/fortress-genrt/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:856-895`). Walk has no static types, so it never knows the static choice.
- **It runs the generic arm in:**
  - `PlainBesideRet` (`differential-after.txt:362`);
  - all three calls of `PbgStatic`;
  - `PbgRetObject`;
  - `O2Lone` (`summary.txt:195-199`);
  - the library's pair `=` (section 5);
  - row 400's `SkDeadTop`.
- **Why walk "answers both ways": row 157, not a rule.** Walk's inference passes the generic arm's declared return type through `MakeInferenceSpecific` (`EvaluatorBase.java:203-205`), which has no visitor for `Any` (`MakeInferenceSpecific.java:51-53`, visitors at `:66-122`; Chase, 2007). The resulting `InterpreterBug` is a `FortressException`, which `bestMatchInternal` catches as "No match, means no dice" (`OverloadedFunction.java:874-879`), and the plain arm runs.
  - `PlainBesideZZ32`'s `peek` and `MieDispatchAny`'s `peek` declare `: Any`. `PlainBesideRet`'s `grab` declares `: Marker[\X\]`. That one difference is the whole split (`reviews/mie-probes/route-c/probes/MieDispatchAny.txt:2`, `:6`; the `ZZ32` is not the cause).
  - Measured: the lone generic `peek` with `: Any` dies under walk with "Missing visitor for class com.sun.fortress.nodes.AnyType" at the `Any` token (`PbgLone`, `captures/both-paths.txt`).
  - `MieDispatchAny`'s `peek` with only `Any` changed to `Object` in the generic arm runs the generic arm under walk, and on the compiled path too (`PbgRetObject`, `captures/ret-object.txt`).
  - Row 157 records this defect: "when such a declaration is one of two overloads the symptom is `Failed to find any matching overload`"; with a plain `Any` arm beside it, the symptom is the plain answer instead.
- **Walk refuses the team's `Compiled12.invariantInference` at load**, "at least one pair of parameters must have excluding types" (`captures/team-tests-walk.txt`). This is row 159's check, which answer 9's walk rung lifts.

**Summary.** Both paths implement way 1. Rung G's two programs die compiled on two code-generation defects. Walk answers one of them with the plain arm because of row 157. No path implements way 2.

## 3. What the specification says, under every spelling

- **The sentence.** `Specification/basic/overloading.tex:100-107` and `advanced/overloading.tex:95-102` forbid the pair; answer 9 removes both. While the pair was forbidden, "static parameters do not enter into the determination of which declarations are applicable" (`:106-107`), and `:136-138` ("all static variables in functional calls have been instantiated or inferred") could be read as one instantiation, fixed at the call, shared by every declaration. That is the scope note's reading and the only textual support for way 2. It needs the sentence: without identical static parameters there is no shared instantiation.
- **Applicability, per declaration and per call.** "A declaration f(P) is applicable to a call f(C) if ... C <: P. If the parameter type P includes static parameters, they are inferred ... before checking the applicability of the declaration to the call" (`basic/overloading.tex:170-175`). "Call f(C)" covers static and dynamic calls alike (`:126-136`). So for the dynamic call the generic arm's `X` is inferred from the dynamic type, and the arm applies. Rows 400 and 413 already read the passage this way (row 413 sits in home 2 on it).
- **Dispatch.** "We consider the declarations that are applicable to that call at run time" and choose the most specific (`:262-276`). The implementation strategy considers "that declaration plus declarations that are more specific than that declaration" (`advanced/overloading.tex:72-77`).
- **Answer 9's revision** (`reviews/overloading-judgement.md` section 3.4):
  - applicability and specificity are decided on the quantified types;
  - "inference instantiates the chosen declaration; it does not precede the comparison";
  - the planned examples include "`quux` beside its plain arm as allowed, with which arm a call gets".
- **The conversion judgement's rule** (`reviews/conversion-overloading-judgement.md:111-117`), in three steps:
  - *Resolution*: "a declaration with static parameters being applicable when some instance within its bounds is";
  - *Instantiation*: "the static arguments of the selected declaration are then inferred";
  - *Dispatch*: "dispatches at run time, by subtyping and without further coercion, to the most specific declaration applicable to the converted values".
- **The restart** (2012): "the *dynamically most specific applicable visible* definition is chosen ... among those in the set that are applicable to the given argument values" (`Documentation/Specification/Prose/Language/overloading.tick:21-26`). A function type is a set of arrow types and universal arrow types, generic and plain arms together (`types.tick:553-558`).
- **Welterweight** (2012):
  - `R-Function` reduces a call by `msav(f, (ilk(v)))`, the most specific applicable visible function at the values' run-time types (`Papers/Welterweight/fig-evaluation.tick:64`, `evaluation.tick:43-47`);
  - `Applicable` instantiates each generic candidate by the substitution that places the run-time types in its quantified domain (`fig-msa.tick:26`, `:41`, `:46`);
  - the dispatch semipredicate "returns ... a set of type bindings for the static type parameters of that entrypoint" (`dispatch.tick:20`), for every entrypoint "statically visible at a call site" (`:5`).
- **Naden** (2012-06-15, `Papers/RuntimeInstantiation/2012-6-15 return type instantiation restrictions.txt`). His counterexample is this pair: `f(x : Object) : empty[\Object\]` beside `f[\P\](x : String) : empty[\P\]`. "If we statically know that def1 is applicable, then if it so happens that def2 is applicable at runtime, we need to find an instantiation of X for that call. Here we know that since X is invariant in empty, X must be Object." His notes then derive when the static return type restricts the run-time instance: only where the arm's parameter occurs in a position the static return type instantiates. They are implemented on neither path (`grep relatedPositions`: nothing in `ProjectFortress/src`).
- **The grep** of rung G's section 9 (`grep -n 'static parameters'` over both chapters) finds no passage saying which arm runs. Read with the passages above, the answer is written, in `:170-175` with `:262-276`, and in every later source. What no passage gives is how the instance of an arm chosen only at run time is found. The paper says so ("beyond the scope"), and the conversion judgement's instantiation step covers only the statically selected arm.

## 4. Where it sits in the type system

Three steps meet here, the conversion judgement's three:
- **Static resolution** picks the plain arm.
- **Instantiation** has nothing to instantiate.
- **Run-time dispatch** finds the generic arm applicable and more specific. The step the record lacks is this arm's instance.

Answer 9's positional rule is the generic-to-generic half of the same problem. When the static choice is itself generic, its instance is fixed at the call, and the rule makes it pass by position to any more specific generic arm. Rung G's template dispatcher does exactly that (`OverloadSet.java:1342-1353`; FACTS, "A generic arm of a template dispatcher is called at the dispatcher's own static parameters").

When the static choice is plain there is nothing to pass, so the instance can only come from the value. Rung G's report splits its dispatcher change the same way: template dispatchers take the call site's instance, and the "dispatcher that is not a template" is row 496.

## 5. What the library already does in the same family

- **The covariant collections.** `CovariantCollection.fsi:14-16` (Maessen, `e22945bc7`, 2008-11-01, "Covariant collections. Required fix to add caching of inferred types.") declares:
  - `opr APPCOV[\T, A extends T, B extends T\](a: CovariantCollection[\A\], b: CovariantCollection[\B\]): CovariantCollection[\T\]`;
  - beside it, `opr APPCOV(a: AnyCovColl, b: AnyCovColl): AnyCovColl`, whose body is `fail(a " APPCOV " b " have no common supertype!")` (`CovariantCollection.fss:39-40`).

  `CVReduction.join(a: AnyCovColl, b: AnyCovColl) = a APPCOV b` (`:139`) is statically the plain arm. It works only because dispatch reaches the generic arm and infers `A`, `B` and their join `T` from the values. It is the join of every list comprehension (`BIG <|[\T\]|>`, `List.fss:177-178`, since `ca8d4e241`, 2008-11-04), of every map comprehension (`Map.fss:192`), of `IntMap` (`IntMap.fss:690`) and of `PrefixMap` (`PrefixMap.fss:414`). `tests/CovCollTest.fss:59` calls `Empty[\ZZ32\] APPCOV cc` with `cc: AnyCovColl`.

  The plain arm cannot be rewritten with a `typecase`, because a clause cannot bind the unknown `A`. The library's other way around an overloading choice, overriding on a dotted method (`overload-static-params-ways.md`, way 1), would need generic dotted methods, which neither path dispatches today (rows 21, 495).
- **The pair `=`.** `opr =(a:Any, b:Any)`, body `a SEQV b` (`FortressLibrary.fsi:69`, `.fss:96`), sits beside `opr =[\A,B\](t1:(A,B), t2:(A,B))` and the triple form (`.fsi:2530`, `:2536`, `.fss:4345-4349`), which compare element by element. Measured under walk (`PbgPairEq`, `captures/pair-eq-walk.txt`):
  - `(0.0, 1) = (-0.0, 1)` answers `true` through a static pair type, through `Any`, through a type parameter and nested;
  - the plain arm's body, `p1 SEQV p2`, answers `false`.

  So walk runs the generic `=` from a plain static choice, and way 2 would change these answers once the compiled path reads this library at the switch-over. (The compiler library declares neither, so this cannot be run compiled today.)
- **The other names** the text scan finds with a plain and a generic top-level arm in one api (`reach-scan.py`, `captures/reach-library-apis.txt`) are `#` and `:`. Their generic arm (`[\T\](x:T)`) is less specific than the plain ones, the other direction, which a template dispatcher handles.
- **microGPT.** Its four source files have no such pair (`captures/reach-microgpt.txt`, empty) and no list comprehension (`grep '<|'`, none).
- **The revival's own gated tests assert way 1** on the compiled path, each through an `Any`-typed variable beside `f(x: Any)`:
  - rung Z's `NatRtDisp`, `NatRtDispSize`, `NatRtDispTrait`, `NatRtDot`, `NatRtExtLit` and `NatRtDispLit`, whose `h[\T\](v: Vec[\T,3\])` reads a type parameter from the value;
  - rung G's own `FirstLoadThreadsRungG`, whose sum is right only if `f[\T\](v: Vt[\T\])` runs for values returned as `Any`;
  - `XXXTypeBoundDisp` (row 413, home 2) asserts it for a bounded arm and fails today on a code-generation defect.

  The list is from `captures/reach-tests.txt` and the tests' `.test` files.
- **Where the designers departed from Java.** Java resolves overloads statically and erases generics, so a Java program cannot even ask this question. Fortress keeps generics at run time (the instantiating loader, descriptors, rung Z's sizes as descriptors) and dispatches on run-time types, and this question exists because of those two choices.

## 6. What the peers do

From the published definitions; not run here. The peers of the earlier notes (`overload-static-params-ways.md` section 6, `conversion-overloading-ways.md` section 6) are not repeated.
- **Julia**, the one mainstream language with run-time multiple dispatch over parametric methods:
  - "Using all of a function's arguments to choose which method should be invoked ... is known as multiple dispatch";
  - "the most specific method applicable to those arguments is applied";
  - a method's type parameters "can be used anywhere a value would be in the signature of the function or body of the function" (https://docs.julialang.org/en/v1/manual/methods/).

  So `f(t::Tag{X}) where X` beats `f(a::Any)` for any `Tag` value, with `X` bound from it: way 1. Julia has no static choice to depart from.
- **C#.** Resolution is static by default, which is way 2 by construction. With an argument of type `dynamic`, "overload resolution occurs at run time instead of at compile time", on "the run-time type" of the argument (https://learn.microsoft.com/en-us/dotnet/csharp/advanced-topics/interop/using-type-dynamic, section "Overload resolution with arguments of type dynamic"). Generic type inference is part of overload resolution in the C# standard, so a generic candidate is then instantiated from the run-time types (by reading). C# offers way 1 as the programmer's explicit opt-in.
- **Java, Scala, Kotlin, C++, Swift.** Overloads are resolved statically only, so the static choice always runs: way 2, but because these languages have no run-time dispatch on arguments at all. Java, Scala and Kotlin also erase type arguments, so no run-time instance exists. Rust has no overloading.
- **CLOS** dispatches on run-time classes of all arguments, but its specialisers are classes, not parametric types, so the instance question does not arise.

In summary, languages that dispatch on run-time argument types (Julia, C# `dynamic`) run the generic method at the instance the values fix. Languages that resolve statically run the static choice, and none of them has Fortress's run-time generics.

## 7. The history in the commits

- 2007-07-22, Chase, `7da936cec`: walk's run-time inference of a generic arm's parameters from the arguments. `MakeInferenceSpecific`, without an `Any` case, dates from then.
- 2008-11, Maessen: covariant collections and list comprehensions built on dispatch from `APPCOV`'s plain arm to its generic arm (`e22945bc7`, `ca8d4e241`).
- 2009-06 and 2009-10, Hilburn (`dc75ba359`) and Kilpatrick (`a7f149194`, "Overloadings are no longer dynamically applicable if they have static params that couldn't be inferred"): the checker's call annotation, which reads way 2 for such arms.
- 2009-11, Ryu, `0f49d8698`: the specification sources enter git with the sentence.
- 2010-02-24, Chase's comment on dispatchers (`OverloadSet.java:2060-2068`): "runtime inference is still necessary ... Runtime inference is only necessary when the occurrences are ALL in variant context", which is section 1's uniqueness result, stated for invariant occurrences.
- 2011: the Types paper names the case and leaves "inferred dynamically" beyond its scope. In 2011-08, Naden adds dynamic inference to the code generator (`babe99f3b`, `519ad598f`). `Compiled12.invariantInference`, "Test that dynamic inference works as expected", first appears in git at the parentless root `26718e298` (2011-12-06); the commit that created it is behind a severed parent link (`research/authorship.md`).
- 2012: Welterweight's dispatch semipredicate; Naden's return-type restriction notes (May to July); the restart's overloading chapter.
- 2026: rung Z's sized dispatch tests (way 1 for sizes); row 413 in home 2; rung G's `FirstLoadThreadsRungG`; row 496 put in home 3 on the unrevised sentence.

## 8. The derivation from his principles

- **Custodians; the type group's later word weighs more** (POSITIONS 2026-09-23, 2026-09-26 on the restart). The paper, Welterweight, Naden and the restart all give the generic arm; none gives the plain one.
- **The library's practice is the standard** (2026-09-19). `APPCOV` and the pair `=` rely on the generic arm. Way 2 would break every comprehension's join on any path that implements it, and the library has no device around it short of generic dotted methods.
- **No open discrepancy between specification and implementation** (2026-09-24). Way 1 describes what both paths are built to do. Way 2 describes the checker's unused annotation only, and walk cannot implement it, having no static types (FACTS: the checker runs only on the compile path).
- **microGPT compiled and fast; "generic is never fast" (2026-09-28, 13:10 UTC).**
  - microGPT reaches no such pair.
  - Way 1 costs a dispatcher test, a descriptor read and a cached instance load, only for calls whose static type is wider than a generic arm's domain.
  - A program that wants no dispatch writes the static type: `PbgStatic`'s first two calls compile to a direct call of the instance.
  - Way 2 costs nothing at run time, but it buys that by changing answers, not by making the same answer faster.
- **Answer 9** keeps generic-beside-plain legal and asks the revised text to say "with which arm a call gets". **Answer 12** refuses a call whose static choice needs a size the call cannot fix. The run-time counterpart, an arm reached only by dispatch whose parameter no value fixes (row 400 through `Any`), is not covered by either. It is the one place where way 1 needs a rule of its own (way 1's sub-choice c).

## 9. The ways

### Way 1. The generic arm runs, at the instance the value fixes (the library's own way)

- **What it says.** A generic arm is applicable at run time when some instance within its bounds holds the values, as answer 9 and the conversion judgement word applicability. It then runs at the instance the values fix.
- **Sources.** Sections 1, 3 and 5; both paths' design; eight gated tests; row 413.
- **Sub-choices,** needed only where the witness is not unique (section 1):
  - (a) **The least instance** (Welterweight `dispatch.tick:67`). For a bare `T` over number arguments this meets answer 8: the conversion judgement already chose promotion from run-time types for walk (`conversion-overloading-judgement.md:134-136`) and recorded the split with the compiled join (`O2Lone`'s `op(a, aw)`) as a ledger row for batch N's gather.
  - (b) **Naden's restriction.** The instance is also bounded by the static return type where his notes show it matters. Implemented on neither path; phase 5 at the earliest.
  - (c) **An arm whose parameter no argument fixes** (row 400's shape) is not dispatched from a call that did not fix it. This is the checker's way 13 (`a7f149194`) carried to run time and the run-time half of answer 12. The alternative refuses such a pair at the declaration, the declaration form answer 9's judgement did not take for the library's factories (its option 5).
- **Touches.**
  - The specification: one sentence in answer 9's specification rung (batch 7b's rung S). The instance of a declaration chosen only at run time is inferred from the arguments' run-time types, as the least instance within its bounds; under instantiation exclusion it is unique wherever the static parameter occurs in a parameter type. Row 496 moves to home 2, rung G's two programs becoming `XXX` compiler tests.
  - Compiled: the two value-path defects, the `ZZ32` spelling (`RTHelpers.java:174-175`, row 494's remainder) and the unrewritten return-type cast (`OverloadSet.java:1796-1803`). Both are code generation, on phase 5's list with rows 494 and 495. The checker's annotation (`STypesUtil.scala:1101-1130`) is corrected or left as unused.
  - Walk: row 157, a case for `Any` in `MakeInferenceSpecific`, and the swallowed exception in `bestMatchInternal` narrowed to real non-matches. It is small and could ride with batch 7b's rung W, which already edits `bestMatchInternal`.
- **Costs.** No gated test changes. The run-time cost is as in section 8.

### Way 2. The plain arm runs: a generic arm is dispatched only at the call site's static arguments

- **What it says.** A call resolved to a plain arm supplies no static arguments, so no generic arm is applicable at run time. This is the scope note's reading and its `skip` variant.
- **Sources.** The unrevised sentence with `:136-138`; the checker's annotation. The static-only peers run the static choice, but only because they never dispatch on arguments.
- **Touches.**
  - Compiled: the `skip` variant, 3 lines in `OverloadSet.java` (scope note section 3), which removes the value path.
  - It turns red: `Compiled12.invariantInference` (all twelve lines, measured under `skip`), rung Z's six sized-dispatch tests (each one's dispatched lines), `FirstLoadThreadsRungG`, and row 413's reading.
  - Walk cannot implement it without the checker's static choice of each call, which walk does not have. Until it does, the two paths split on every such call.
  - At the switch-over the compiled library's comprehensions stop working (`APPCOV`'s plain arm fails) and the pair `=` answers `SEQV` (`PbgPairEq`: `true` becomes `false` for `(0.0, 1)` against `(-0.0, 1)`).
  - The specification needs a sentence that applicability at run time is at the call's static arguments. That contradicts answer 9's quantified applicability, `:170-175` and `:262-276`, and the conversion judgement's dispatch step.
  - What runs depends on a variable's declared type (`PbgStatic`).
- **Costs.** As listed, plus a new design for the covariant collections.

### Way 3. Refuse the pair at the declaration

- **What it says.** A plain arm with a generic arm more specific than it is a static error. This is the sentence kept for this one case, or answer 9's positional rule extended to a zero-length parameter list.
- **Touches.**
  - It reverses part of answer 9 ("a generic arm beside a plain arm stays legal", `overloading-judgement.md:24`; the `quux` example, which is the other direction, stays legal).
  - The checker gains a rule, and the specification a sentence.
  - It refuses `APPCOV`, the pair `=`, `Compiled12.invariantInference`, rung Z's six tests and `FirstLoadThreadsRungG`.
  - The library then needs renamed operators or a new comprehension design.
- **Library's way around.** Names (the numbered factories' device), or a `typecase` in the plain arm where a clause can name the type (`array1`'s device). Neither reaches `APPCOV`.

### Way 4. Refuse the call

- **What it says.** A call whose static choice is plain while a more specific generic arm could apply at run time is an error: answer 12's call-site refusal carried from sizes to types.
- **Touches.** It refuses the library's own bodies: the pair `=`'s `a1 = a2` at a type parameter, and `CVReduction.join`. By reading, it refuses every generic body that calls `=` on a type parameter. Listed for completeness.

### Way 5. The program's own devices (composes with any way)

- A program that wants the generic arm writes the static type (`PbgStatic`'s first two calls).
- A program that wants the plain behaviour for a value that fits the generic arm uses another name. Under way 1 overloading cannot give it.
- A program that wants the generic arm from an `Any`-typed value under way 2 has no device where the arm's parameter must be bound (`APPCOV`).

## My reading (mine, not a decision)

- **Way 1.** Everything that speaks to the case gives it: the type group's paper names it, Welterweight formalises it, Naden works it through, and the restart states it. So do the chapter's own applicability passage once the sentence is gone, and the conversion decision Pavol accepted today.
- **Both paths implement it**, and every measured divergence is a defect already on the ledger or on phase 5's list. The library's comprehensions depend on it, and eight gated tests assert it.
- **Row 496's "which declaration applies is written nowhere" is true of the committed text read with the sentence.** The sentence is gone. What is really unwritten is the instance of an arm reached only by dispatch. That is one sentence for batch 7b's specification rung: the least instance within the bounds, unique under instantiation exclusion where the parameter occurs in a parameter type. Beside it goes the run-time half of answer 12 for an arm whose parameter nothing fixes.
- **Row 157 in walk** is a small fix and belongs with batch 7b's rung W.
- **The compiled defects** stay on phase 5's code-generation list.

## What a judge must still decide

- Whether the conversion decision's dispatch step is read as settling which arm runs, so that this is recorded as its consequence, not as a new decision. My reading is that it is.
- The instance rule's wording for the three non-unique cases (way 1's sub-choices a to c), and whether Naden's restriction is recorded as future work, as answer 9's judgement already names his design.
- Where row 157's walk fix lands, and row 496's move from home 3 to home 2 with rung G's two programs as `XXX` tests.

## Found on the way, not the question

- Inside the library's pair `=`, a program's own object's `=` is not reached: `(Pt(1), 1) = (Pt(1), 1)` answers `false` even at a static pair type, while `Pt(1) = Pt(1)` answers `true` (`captures/pair-eq-walk.txt`). The element comparison in the library body falls to `SEQV`. Not investigated; a candidate ledger row on the visibility of a program's functional methods from library code.
- `PbgRetString` failed to compile because it juxtaposed a `String` with an `Any`, which the checker refuses. That was my probe's error, not a finding; `PbgRetObject` replaces it (`captures/both-paths.txt`).

## Files, and what was run

- `probes/`:
  - `PbgStatic.fss`: one value, three static types; both paths;
  - `PbgRetObject.fss`: `MieDispatchAny`'s `peek` with `Any` changed to `Object` in the generic arm; both paths;
  - `PbgLone.fss`: the generic `peek` alone; both paths;
  - `PbgRetString.fss`: superseded;
  - `PbgPairEq.fss`: the library's pair `=`; walk only.
- `captures/`:
  - `prelude.txt`: the compiler prelude built into the private cache;
  - `both-paths.txt`, `ret-object.txt`, `pair-eq-walk.txt`;
  - `team-tests-walk.txt`: `Compiled12.invariantInference` and `invariantInference2` under walk;
  - `reach-library-apis.txt`, `reach-microgpt.txt`, `reach-tests.txt`: the text scan.
- `run.sh <cache-dir> prelude|both|walk|team`: rung G's `probes/common.sh` functions with the scope note's private cache, on `/home/user/fortress-genrt`.
- `reach-scan.py`: a text scan, not the checker.
- Nothing in either tree was edited; no suite, gate stage, count or distance run.

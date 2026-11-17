# Rung V, rung-walk-value-bound: walk before the merge of the number types

- problem: the number-object merge probe met two defects of walk that stand today at `NN32` and `RR32`, rows 997 and 998: explorations/compile-ladder/plan-31/probes/number-object-merge.md:111
- spec: the Return Type Rule over every instance of the less specific declaration that applies to an argument: Specification/advanced/overloading.tex:555
- precedent: `returnRuleAtEveryInstance`, the rule at every instance for two generic declarations: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:1262
- deviation: a more specific declaration that writes no return type is not judged by the rule where its domain is an object type, since walk has no type for a body; a `comprises` clause is not read: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:520
- historical: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java, Specification/basic/inference.tex: none

One launch worked this rung. The worktree was seeded by `seed-worktree.sh` (exit 0) from /home/user/fortress-base35, whose head is three commits of `explorations/` past the base; the branch was cut from c1ce2a35e1. The code is commit fcdf7bc2da.

## What changed and why

1. `FTraitOrObject.enforceValueness` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:102-103) returns at once for a `SymbolicType`. The check refuses a type that is not a value type below a value type. The symbolic type that walk makes for a type parameter is a trait type that extends its bound, and where the bound is a value object the check refused it. A declared type that is not a value type is still refused below a value type.
2. The load check, `completeOverloadingCheck` (OverloadedFunction.java:513-527). The team's shortcut takes two parameter lists to exclude where every parameter at which they differ is an object type of one of them. For an own generic beside a declaration without static parameters whose domain lies inside the generic's declared domain (`plainInsideGeneric`, :837), the pair is now first read on its declared domains (`validOnDeclaredDomains`, :792). A reading that names a rule refuses the pair with that rule's message. A valid reading, and a reading that does not read the pair, leave the pair accepted as before. A Return Type Rule reading against a more specific declaration that writes no return type (`writesReturnType`, :862) is not acted on.
3. The reading on declared domains, plain declaration inside the generic one (OverloadedFunction.java:814-820). It was: the plain result below the generic result, its type parameters standing for themselves. It is now that, or `returnRuleAtObjectArguments` (:882): each static parameter that the generic's return type mentions is fixed by a static argument of one of its parameter types, or the generic returns that type parameter itself and the plain declaration has, at a parameter whose type in the generic is that type parameter, an object type below which its result lies; and the plain result lies below the result of the instance that holds the plain domain. An argument at an object type has that type itself, so every instance of the generic that applies returns a type at or above it. Below a trait type a lower argument selects a lower instance, so a trait type gives nothing.
4. `Specification/basic/inference.tex:267-268`: the box names the declared return type and the field of an object, row 1036, beside the immutable top-level variable.

## The tests, failing and passing

The failing run, on the base's code, before the first build of the edit (the build's log starts after it). Command, from the worktree's root, 2026-11-17T00:09:08Z:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/TraitGenericMethodValueBoundWalk.fss ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.fss ProjectFortress/tests/GenericBesidePlainObjectReturnRuleWalk.test ProjectFortress/tests/GenericBesidePlainObjectValidWalk.fss ProjectFortress/tests/GenericBesidePlainObjectNoReturnTypeWalk.fss ProjectFortress/tests/XXXGenericFunctionArrowReturnWalk.fss ProjectFortress/tests/XXXGenericFunctionArrowReturnWalk.test

    # harness-one 2026-11-17T00:09:08Z; tree c1ce2a35e1; ... cache empty
    T@tmp/h1/tests/TraitGenericMethodValueBoundWalk.fss:17:1-57: non-value subtype of value type RR32
    . interpret tmp/h1/tests/GenericBesidePlainObjectReturnRuleWalk
    plain
     Missing expected refusal at load
    Tests run: 5,  Failures: 2,  Errors: 0

The two guards passed in that run (`GenericBesidePlainObjectNoReturnTypeWalk` and `GenericBesidePlainObjectValidWalk`, each `PASS`, `OK`), and `XXXGenericFunctionArrowReturnWalk` printed `done` and ' Saw expected failure: loaded and ran, not refused at load'.

The first `XXX` test shown red on a deliberate fix, on the base's code: its line 12 changed for one run to `r: Vector[\RR64,2\] = half[\3\](w)`, then restored.

    . interpret tmp/h1/tests/XXXGenericFunctionArrowReturnWalk
     Refused at load as its keys name
    Unification error: Closure/Constructor for half param 1 (x:Vector[\RR64,3\]) got arg __DefaultVector[\RR64,2\] of type __DefaultVector[\RR64,2\]
    Tests run: 1,  Failures: 1,  Errors: 0

The passing run, after the last change of code, from an empty cache: the same command with `COLD_CACHE=1` before it and these files after it: `XXXNonValueOfValue.fss`, `XXXGenericBesidePlainReturnParam.fss`, `XXXGenericBesidePlainReturnRule.fss`, `XXXReturnRuleObjectParamWalk.fss`, `XXXReturnRuleObjectParamWalk.test`, `TraitGenericMethodInference.fss`, all of `ProjectFortress/tests/`.

    . interpret tmp/h1/tests/GenericBesidePlainObjectReturnRuleWalk
     OK Saw expected refusal at load
    . interpret tmp/h1/tests/TraitGenericMethodValueBoundWalk
    PASS
    . interpret tmp/h1/tests/XXXReturnRuleObjectParamWalk
     Saw expected failure: loaded and ran, not refused at load
    OK (10 tests)

The two tests added after it, which come with no fix, through the harness on the edit:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/NonValueBelowValueTypeWalk.fss ProjectFortress/tests/NonValueBelowValueTypeWalk.test ProjectFortress/tests/XXXGenericBesidePlainObjectNoReturnTypeWalk.fss ProjectFortress/tests/XXXGenericBesidePlainObjectNoReturnTypeWalk.test

    . interpret tmp/h1/tests/NonValueBelowValueTypeWalk
     OK Saw expected refusal at load
    . interpret tmp/h1/tests/XXXGenericBesidePlainObjectNoReturnTypeWalk
    two
     Saw expected failure: loaded and ran, not refused at load
    OK (2 tests)

Walk's suite, once, on the final code (the tree of fcdf7bc2da before its commit, without the two tests added after it), `ant testSystem`:

    Tests run: 217, Failures: 0, Errors: 0   (system-0)
    Tests run: 211, Failures: 0, Errors: 0   (system-1)
    Tests run: 220, Failures: 0, Errors: 0   (system-2)
    Tests run: 213, Failures: 0, Errors: 0   (system-3)
    BUILD SUCCESSFUL
    Total time: 4 minutes 53 seconds

861 tests in the four shards. My edit is under `interpreter/` only, so the suite is its whole check; no demo was run, as the brief says.

## Where the fix belongs, and the precedent search

- The value check: `setExtendsAndExcludes` calls `enforceValueness` for every trait or object type (FTraitOrObject.java:88). A function's own type parameter gets its bound by `SymbolicType.addExtend` (ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/SymbolicType.java:51), which does not pass the check; a trait's generic method's goes through `setExtendsAndExcludes`. No other site of FTraitOrObject.java treats a symbolic type apart: the count of precedents in the file is 0. In the folder, `FType.java:186` and `:234` and `SymbolicType.java:66` read `instanceof SymbolicType` for exclusion.
- The load check: the precedent is `returnRuleAtEveryInstance` (OverloadedFunction.java:1262), which `genericPairValid` calls at two sites for two own generics. Its last clause, an object type at a parameter whose type in the outer declaration is the returned type parameter, with the inner result below it, is the clause the new reading takes for a plain inner declaration. The plain-beside-generic reading had one site, `validOnDeclaredDomains`, and the shortcut one site (the count of other sites is 0 for each).

## What the specification settles

- The Return Type Rule compares at every argument type to which the more specific declaration applies, and at every instance of the other that applies to it (Specification/advanced/overloading.tex:555-559). So the pair of row 998 is invalid, the pair at `NN32` with result `NN32` is valid, and `ident[\T extends Shape\](x: T): T` beside `ident(x: Round): Round` stays refused (overloading.tex:607-621).
- A value trait's subtypes are value traits and value objects (Specification/basic/traits.tex:957-960). A type parameter is no declared subtype, and the passage does not speak of it.
- A function's unwritten return type is its body's type; walk has no static types before the switch-over (P-12), so it cannot read it. The rule refuses `pick(a: NN32) = "two"` beside `pick[\T extends Number\](a: T): ZZ32`, and walk loads it (NEW-V-1).

## Programs run old against new

Each under walk, new from the worktree and old by `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base35 <worktree>/tmp/old-caches P.fss`. The programs are scratch; each is given whole here.

| program | old | new |
|---|---|---|
| `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: NN32, b: ZZ64): NN32`, called on an `NN32` and a `ZZ64` | refused, 'fails the Return Type Rule' | loads, prints `4` |
| `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = "two"` | loads, prints `two` | loads, prints `two` |
| `dup[\T extends NN32\](a: T): ZZ32` beside `dup(a: NN32): ZZ32` | stops, 'T@...: non-value subtype of value type NN32' | refused, 'fails because their parameter lists have the same types' |
| `object Ob` with `same(self): String`, beside top-level `same[\T\](a: T): T` | loads, prints `method` and `3` | refused, 'fails the Return Type Rule: the second is more specific ...' |
| `wrap[\T extends Number\](a: T): Box[\T\]` beside `wrap(a: NN32): Box[\NN32\]` | loads | refused, 'fails the Return Type Rule' |
| `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: ZZ64) = 2` | refused, 'fails the Return Type Rule' (`ZZ64->BOTTOM`) | the same |

The third row shows that the base also stopped a function's own type parameter bounded by a value object; the repair of the check covers it, and the pair is then a duplicate by the No Duplicates Rule. The fourth and fifth are refusals that the rule asks for and that the shortcut hid: at an `Ob` argument the instance at `Ob` returns an `Ob`, and `String` is not below it; `Box[\NN32\]` is not below `Box[\Number\]`, the result of the instance at `Number`, which applies to an `NN32`.

The planner's probes on the edit only: `PArrowRet.fss` and `PArrowField.fss` (explorations/compile-ladder/plan-31/probes/planner/) each print 'ran at size 2', as row 1036 gives for the base.

On the compiled path, from the base build (the checker is unchanged): `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: NN32) = "two"` is refused by `fortress compile`: 'the return type of NN32->String ... should be a subtype of the return type of [\T extends Number\]T->ZZ32'.

## Sentences of the specification made false

None. The box edited, before and after (Specification/basic/inference.tex:266-268):

- before: "though not of an immutable top-level variable (row~1019), and runs both forms that this paragraph refuses"
- after: "though not of an immutable top-level variable (row~1019), of a declared return type or of the field of an object (row~1036), and runs both forms that this paragraph refuses"

Not made false by this change, and left for the gather: the Effect of the same entry names row 1019 alone for the places that keep the generic function (Specification/appendices/changes.tex:2717-2718), and so omits the declared return type and the field of row 1036. No Effect names rows 997, 998 or 550 (`grep -n 'row~550\|row~697\|row~997\|row~998\|row~785' -r Specification --include=*.tex` prints nothing). The form is not the full S1 form: the change is inside an existing callout of the entry `revival-expected-contexts`, it changes no rule, and no decision record is asked for.

## The stages

Neither the count stage nor the distance stage was run: every path of the change is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` or `explorations/`, so neither can move. STAGE_BLIND, the files edited: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `Specification/basic/inference.tex`; twelve new files under `ProjectFortress/tests/`. No file was edited beyond those the section names.

The ladder subset is empty: no recorded first error of the baseline names something the change touches (`grep -rlE 'non-value subtype|Return Type Rule|OverloadedFunction|FTraitOrObject|fails because their parameter lists|excluding types' explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing), and the change is in walk alone. Nothing was run for it.

## Points to report

1. **The check of a value type as built.** `enforceValueness` refuses every `FTraitOrObject` that is not a value type and extends a value type, except a `SymbolicType` (FTraitOrObject.java:102-108). The team's test of it, `tests/XXXNonValueOfValue.fss`, does not reach the check: it fails on 'Variable f is not defined.' (NEW-V-2). `tests/NonValueBelowValueTypeWalk.fss` holds the refusal: 'non-value subtype of value type Stamp'.
2. **The load check as built.** Two lists count as excluding where they differ only at object types of one of them, as before, except for an own generic beside a plain declaration whose domain some instance of the generic holds; that pair is read on its declared domains (OverloadedFunction.java:513-527). The two results are compared with the generic's type parameters standing for themselves, or at the instance that holds the plain domain where every static parameter in the generic's result is fixed by a static argument or is the result itself and meets an object type of the plain declaration below which the plain result lies (:882-903).
3. **Rows 997 and 998**: each test failed on the base and passes after, above. Row 550's test at `ZZ64` is still an expected failure after: `XXXGenericBesidePlainReturnParam`, ' OK Saw expected exception' in the passing run, and `cd ProjectFortress && ../bin/fortress tests/XXXGenericBesidePlainReturnParam.fss` prints 'fails the Return Type Rule: the first is more specific ...'. The plain declaration with no written return type still loads: `GenericBesidePlainObjectNoReturnTypeWalk`, `PASS`. It did not load after the first form of the edit, which read it by the rule ('NN32->BOTTOM ... fails the Return Type Rule'); the exemption was added then, and all runs quoted as passing are after it.
4. **Pairs of the one library or of an existing test whose verdict at load changed**: none found. `ant testSystem` passes whole from empty caches, which analyses the library and every test of `tests/`. The demos and microGPT were not run by this rung. Three kinds of a program's own pair change, by the table above: a plain declaration at an object type whose result is not below it, beside a generic that returns its type parameter, is now refused, a functional method of an object beside a top-level generic among them; a plain declaration at an object type whose result is an instance of a generic type over the type parameter is now refused; a plain declaration over a mix of object and trait types, its result below the object type, now loads.
5. **Row 697's test**, `XXXReturnRuleObjectParamWalk`: unchanged, ' Saw expected failure: loaded and ran, not refused at load' in the passing run.
6. **Row 1036**: `tests/XXXGenericFunctionArrowReturnWalk.fss` with its `.test`, an expected failure, shown red on a deliberate fix; the box's sentence before and after, above.
7. **Files edited**: the three of STAGE_BLIND above; none beyond those named.

No reserved point was reached as a step taken: no model line changed; no pair of the library or of an existing test is newly refused; no call runs another declaration (the choice at a call and `bestMatchForNumerals` are untouched, and each program that loads on both codes prints the same).

## Decisions

1. **The value check passes every symbolic type** (fork V1). Ways not taken: make the symbolic type a value type where its bound is one, which changes what every later check of the type reads; override the check in `SymbolicType`, which needs the private method opened. Evidence: the probe's suite passed with the one line; `ant testSystem` passes.
2. **Where the shortcut would fire, the reading on declared domains decides, and anything but a named rule leaves the pair accepted.** Ways not taken: (a) withdraw the shortcut and let the check's ordinary flow run, in which a plain declaration better at a parameter without a symbolic type meets the team's Subtype Rule branch and row 785's refusal for an unwritten return type; (b) remove the shortcut for every pair, which is row 697 and refuses pairs of the library. Evidence: row 785; the brief's section, "the shortcut stays as it is for them".
3. **A more specific declaration that writes no return type is not judged at an object type.** Ways not taken: read its range as walk gives it, `Any`, which refused the brief's guard (seen in the first run after the edit); read it as `BottomType`, which changes `Simple_fcn` for every caller. No decision on record covers the unwritten return type; I acted on the brief's guard, and recorded the invalid pair that loads as NEW-V-1.
4. **The new reading is added to the old one, not put in its place.** The old comparison, type parameters standing for themselves, is sound and settles results that mention no static parameter. Way not taken: the new reading alone; the old one is kept so that no pair read valid before is refused.
5. **The reading applies in `validOnDeclaredDomains` wherever the plain declaration lies inside the generic, not only where the shortcut would have fired.** So a plain declaration over a mix of object and trait types loads where it was refused. Way not taken: a flag that limits it to the shortcut's pairs, which would keep a refusal that the rule does not make.
6. **A `comprises` clause is not read** (fork V4). Row 550's pair at `ZZ64` stays refused.
7. **Two guards in two files, and a test of the value check's refusal added.** The brief names `XXXNonValueOfValue` as the test of the check; it is not (NEW-V-2), so a plain test with a `load_exception_contains` key was written. The team's test is left as it is: it is beyond the files the section names.
8. **The Effect at changes.tex:2717 is not edited**: the section names the box alone.

## Defects, each with its home

- Row 997, a type parameter bounded by a value object: home 1, `tests/TraitGenericMethodValueBoundWalk.fss`.
- Row 998, the invalid pair that loaded at an object type: home 1, `tests/GenericBesidePlainObjectReturnRuleWalk.fss` and its `.test`.
- Row 550, the valid pair at a trait that comprises one object: deferred, home 2, its `XXX` test stays; the row's whole new line is in record.md.
- Row 1036: deferred, home 2, `tests/XXXGenericFunctionArrowReturnWalk.fss` and its `.test`; the row's whole new line.
- NEW-V-1, an invalid pair whose plain declaration writes no return type loads at an object type: deferred, the specification settles it, home 2, `tests/XXXGenericBesidePlainObjectNoReturnTypeWalk.fss` and its `.test`, with a row. Walk only; the checker refuses it.
- NEW-V-2, the team's `XXXNonValueOfValue` fails before the check it names: a defect of a test, home 3 by its kind (a ledger row; the test as it stands is the reproducer), and the check's refusal is asserted by `tests/NonValueBelowValueTypeWalk.fss`.

## For FACTS

In record.md.

## Commands worked out

None beyond the skill's.

## Questions for the curator

1. Should walk's load check refuse, at an object type, a more specific declaration that writes no return type (as it does at a trait type, row 785), or load it unjudged (as built, NEW-V-1)? Evidence: OverloadedFunction.java:520-521; `tests/GenericBesidePlainObjectNoReturnTypeWalk.fss`; row 785.
2. `tests/XXXNonValueOfValue.fss` is green for a reason other than the one it was written for (ProjectFortress/tests/XXXNonValueOfValue.fss:18). Repair the team's test, or delete it for `NonValueBelowValueTypeWalk`?

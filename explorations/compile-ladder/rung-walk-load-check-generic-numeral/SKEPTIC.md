<!-- Climb batch 35b, rung L (rung-walk-load-check-generic-numeral): the skeptic's check of the worker's change, its two fixes (the kinds of static parameters in an object's shared symbolic instantiation, and in the choice of overloads at written static arguments), the two defects it recorded, its corrections, and its verdict. -->

# Rung L: the skeptic's check

Verdict: **approved**, with two settled fixes of the change and corrections; none contested.

Head judged: `43ebc4292304648bef397eb73a0e52c8dbb8542a`. One launch of the skeptic: the branch carried the worker's `REPORT.md` and `record.md` (committed in 43ebc42923), so the step that writes them from the run's journal wrote nothing and made no commit.

## What was checked

1. **Stages.** The report says neither stage ran (STAGE_BLIND). `git diff --name-only 5a595515546edc5564515d4492ff4d44b5d07153...HEAD`, filtered by the brief's list of blind paths, prints nothing (grep exit 1), after the skeptic's commits too: every path is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` or `explorations/`. No stage ran, here or for the fixes.
2. **Test first**, from the worker's transcript. The promotion's `git mv` at 17:51:21 (call `bKGhfW`); the first harness run at 17:51:36 (`chGaCi`) echoed two `Expected failure:` lines before the harness command and printed, on tree 5a59551554, 'Cannot find definition for method tk given receiver Two', 'REACHED: a numeral type is in a comprises clause', ' Missing expected refusal at load', 'Tests run: 2,  Failures: 2'; the second at 17:51:49 (`uzjvke`) 'Overloading of pt(a:Dot):(Dot, FortressLibrary.ZZ32) ... fails the Return Type Rule', 'Tests run: 1,  Failures: 1'. The first edit of code is the copy and debug print of `Constructor.java` at 17:55:08 (`hE62NP`), after both. The last edit of code is `BuildEnvironments.java` at 18:04:49 (`rpCZH5`), built at 18:05:12 (`4d9S59`); the last passing run, 18:16:02 (`RAPQoS`), 'OK (6 tests)', and `XXXNumeralTypeReturnTypeWalk` at 18:17:40, 'OK (1 test)'. The report put that run "on tree 84ca5ae101"; the harness's header names 0c784a87ce, the working tree whose code 84ca5ae101 then committed unchanged: corrected in `REPORT.md`.
3. **The diff**, against the section, `basic/overloading.tex`, "Applicability to Dotted Method Calls", `advanced/overloading.tex`, "Declarations with Static Parameters", P-174 and forks L1 to L3. Rows 1058 and 981 do what the report says and no more: `belowAtObjectArguments` reads a tuple result element by element and leaves the rest to the comparison with the holding instance; `forTraitDecl` refuses a numeral type that a `comprises` clause lists, with the `extends` clause's message. Row 1057's repair takes each generic method of an unfinished set as its symbolic instance; its key, `genericKey`, the name and the number of static parameters, is wrong (finding 1).
4. **The precedent.** The worker followed `Factory.make` for a call at written static arguments, and the lone generic method's symbolic instance. It did not name the precedent of its key: for top-level generic functions the revival shares a symbolic instantiation only among declarations of one name whose static parameters agree in name, kind and bound (`GenericFunctionOrMethod.GenericComparer`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/GenericFunctionOrMethod.java:44-72`), the repair of row 478, "two generic overloads whose static parameters share a name share one symbolic instantiation, so the check reads one's bound for the other". `genericKey` brings row 478's mechanism back for methods, by kind (finding 1, fixed) and by bound (finding 3, recorded). `compatible`, which `genericOverloadsAt` reads from the precedent, does not read kinds (finding 2, fixed at the shared site).
5. **The tests.** Each exercises its defect, carries one comment line, and cites the specification by file and section. The promoted tests' bodies are unchanged but for the `component` line.
6. **Programs, old against new** (below), under walk with the old code tool and the rung's build, and on the compiled path with the old code tool. The rung changes no code of the compiled path; the compiled runs in the worktree stopped, 'No class fortress.CompilerBuiltin$ZZ for the type ZZ', because the rung's builds emptied its caches and no library order ran, so the compiled column is the old code's, which is the new code's. The diff adds no field, mutable variable or atomic block: the direct runs are at `FORTRESS_THREADS=1`, the harness at 4.
7. **Homes**, below, for every defect the report names and every one measured here.
8. **Ledger and siblings.** `ledger.py find --cites Constructor.java` gives rows 774, 665, 693, 728, 762, 870, 430, 444, 735, 1109; `ledger-find` gives 744, 760, 922, 478. Row 760 holds a plain method beside a generic one in one object (`SkPlainGeneric`, 'Missing type T' old and new); row 922 a single generic method on an assumed receiver, not the pair (finding 4). The worker's sibling of row 1058, `returnRuleAtEveryInstance`, is 1122.
9. **The report.** Its five provenance lines open at the lines they cite; the corrections are below. Its whole-suite run is on the code of 84ca5ae101, the head's code before the skeptic's fixes; the skeptic's run is below.
10. **Competing declarations.** `genericKey`, `getOverloadsAndPending`, `genericOverloadsAt` and `belowAtObjectArguments` are declared once in `ProjectFortress/src/com/sun/fortress/` and used only in the rung's files; each test component's name is held by one file of the corpora.
11. **Failure mode**: finding 3. Where two generic methods of one name differ only in their bounds, the change turns the base's 'Cannot find definition' into a quiet wrong value.

## Findings

1. **Defect of the change, fixed: generic methods of one name whose static parameters differ in kind share one symbolic instantiation, and the object stops at its construction.** On the base the object below runs its other methods; after the change it stops at its first use:

       SkKindsOnlyOther: object K with h[\nat n\](x: ZZ32): ZZ32 = n, h[\T\](x: T, y: T): ZZ32 = 7, m(): ZZ32 = 5; run prints K.m()
       old-fortress.sh /home/user/fortress-base43 <worktree>/tmp/old-caches SkKindsOnlyOther.fss    ->  A 5
       bin/fortress SkKindsOnlyOther.fss (rung's build)                                            ->  When instantiating h[\T\](x:T,y:T):FortressLibrary.ZZ32Got nat n instead of type for param T

   The message depends on which method the key's set yields first: through the harness on the worker's head the other order, 'Expected Nat, got T@... for param nat n instantiating h[\nat n\]'. The pair is row 1057's own form, two generic dotted methods of one name and one static parameter that differ in their number of parameters, and the compiled path runs it: `K.h(1, 2)`, `K.h[\3\](1)`, `K.h[\ZZ32\](1, 2)` print 7, 3, 7.
2. **Defect reached by the change, fixed at the shared site: at static arguments a call writes, a type passes for a nat parameter.** `OverloadedFunction.compatible` refused a size at a type parameter but not a type at a nat or int parameter, so the top-level `kd[\ZZ32\](1, 2)`, with `kd[\nat n\](x: ZZ32)` beside `kd[\T\](x: T, y: T)`, stops on the base, 'Expected Nat, got ZZ32 for param nat n instantiating kd[\nat n\]', and the change's dotted call at written static arguments reads the same function. The compiled path prints 7, 3, 7 for `kd(1, 2)`, `kd[\3\](1)`, `kd[\ZZ32\](1, 2)`.
3. **Defect recorded (1125, home 2): of two generic dotted methods of one name, number of parameters and kinds that differ only in their bounds, one is dropped.** They share one symbolic instantiation, so their instances have one signature, and `putIfAbsent` keeps the first. After the change:

       SkBoundsNested: object Two with tk[\U extends Number\](y: U): ZZ32 = 2, tk[\U extends ZZ32\](y: U): ZZ32 = 3; Two.tk(n), Two.tk(m) for n: ZZ32, m: ZZ64
       old-fortress.sh ... SkBoundsNested.fss   ->  Cannot find definition for method tk given receiver Two
       bin/fortress SkBoundsNested.fss         ->  A 2 / B 2
       SkBoundsNestedTop (the same two as top-level functions), old and new  ->  A 3 / B 2

   With `String` for `ZZ32` (`SkBoundsSame`), the call over a `String` stops, '** bug! Meet(String, Number) not a singleton: []'. The same mechanism holds on the base in two traits (`SkBoundsTwoTraits`, 'Unification error ... Cannot unify String ... with FortressLibrary.Number') and in a trait's method redeclared in an object at another bound (`SkBoundsRedeclare`, 'Meet(ZZ32, String) not a singleton'). Not fixed: a key that reads bounds would have to read them modulo the names of the static parameters, which a bound can name, since only the shared instantiation hides a supertrait's generic method behind its redeclaration, and the one library redeclares `Generator`'s `map[\G\](f: E->G)` in `Indexed` as `map[\R\](f: E->R)` (`Library/FortressLibrary.fss:1374`, `:2269`); the team's comparer of top-level generics reads the names too (`GenericFunctionOrMethod.java:44-72`). That is more than a repair round. Compiled, the code generator stops, 'duplicate entry' (row 537).
4. **Defect recorded (1126, home 2): a call on a receiver assumed at a trait of the trait's two generic methods of one name stops, 'Missing type U'**, old and new (`SkAsIfOnly`): `asMethodOverloads` finishes the trait's unfinished set (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:131`), row 760's mechanism; the call on the object itself runs since the change.

## Fixes

Both fixes are one code state, built once (`ant compileAll`, 'BUILD SUCCESSFUL', 'Total time: 33 seconds').

- **529e8955ba, "Skeptic's fix: walk shares one symbolic instantiation among an object's generic methods of one name only where their static parameters are of the same kinds"** (finding 1). `Constructor.genericKey` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:896-906`) keys by the name and the kinds of the static parameters, in order, and the comment over `genericArgs` (`:203-207`) says so. Test: `ProjectFortress/tests/GenericMethodOverloadSetWalk.fss`, object `Kinds` and its three assertions. Settled by `Specification/basic/overloading.tex:235-238` ("If the declaration has static parameters, it is applicable to the call if some instance of it whose static arguments satisfy their bounds is") and by the section's own row 1057 claim, two generic dotted methods of one name and one static parameter that differ in their number of parameters; the program ran on the base.
- **6fcbe62f95, "Skeptic's fix: walk instantiates, at static arguments a call writes, only the generic overloads whose static parameters' kinds take them"** (finding 2). `OverloadedFunction.compatible` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:3057-3070`) refuses a static argument that is not a size at a nat or int parameter. Test: `ProjectFortress/tests/GenericOverloadStaticArgKindsWalk.fss`, and the third assertion of `Kinds`. Settled by `Specification/basic/overloading.tex:149-151` ("We assume throughout this chapter that the static arguments that a call writes ... have been substituted for the static parameters of the declarations that they instantiate") and `:193-195`, the same sentence on applicability for a named call. `compatible` is a member of a named file beyond the members the section names, and it reaches the top-level call too.

Failing, on the worker's head (tree 43ebc42923, its build), before either edit:

    echo "Expected failure: GenericMethodOverloadSetWalk red, object Kinds stops, 'When instantiating h[\T\](x:T,y:T):FortressLibrary.ZZ32Got nat n instead of type for param T'"
    echo "Expected failure: GenericOverloadStaticArgKindsWalk red, kd[\ZZ32\](1, 2) stops, 'Expected Nat, got ZZ32 for param nat n instantiating kd[\nat n\]'"
    echo "Expected failure: XXXGenericMethodBoundsApartWalk green as an expected failure, Two.tk(\"a\") stopping with 'Meet(String, Number) not a singleton'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-check-generic-numeral/skeptic/h1 ProjectFortress/tests/GenericMethodOverloadSetWalk.fss ProjectFortress/tests/GenericOverloadStaticArgKindsWalk.fss ProjectFortress/tests/XXXGenericMethodBoundsApartWalk.fss

    Expected Nat, got T@.../GenericMethodOverloadSetWalk.fss:26:1-29:2 for param nat n instantiating h[\nat n\](x:FortressLibrary.ZZ32):FortressLibrary.ZZ32
     OK Saw expected exception
    Expected Nat, got ZZ32 for param nat n instantiating kd[\nat n\](x:FortressLibrary.ZZ32):FortressLibrary.ZZ32
    FAILURES!!!
    Tests run: 3,  Failures: 2,  Errors: 0

`GenericMethodOverloadSetWalk` failed in the other order of the same cause, the symbolic instantiation made from `h[\T\]`; run again with that line:

    echo "Expected failure: GenericMethodOverloadSetWalk red, object Kinds stops at its construction, its two methods h sharing one symbolic instantiation made from whichever its set yields first: 'Expected Nat, got T@... for param nat n instantiating h[\nat n\]', or 'When instantiating h[\T\] ... Got nat n instead of type for param T'"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-check-generic-numeral/skeptic/h1 ProjectFortress/tests/GenericMethodOverloadSetWalk.fss

    Expected Nat, got T@.../GenericMethodOverloadSetWalk.fss:26:1-29:2 for param nat n instantiating h[\nat n\](x:FortressLibrary.ZZ32):FortressLibrary.ZZ32
    FAILURES!!!
    Tests run: 1,  Failures: 1,  Errors: 0

`GenericOverloadStaticArgKindsWalk` fails so on the base's code too (`FORTRESS_HOME=/home/user/fortress-base43 .../harness-one.sh ... GenericOverloadStaticArgKindsWalk.fss XXXGenericMethodBoundsApartWalk.fss`: 'Expected Nat, got ZZ32 for param nat n instantiating kd[\nat n\]', 'Tests run: 2,  Failures: 1').

Passing, after the build of both edits, with the rung's tests and three neighbours:

    echo "Expected failure: none red; XXXGenericMethodBoundsApartWalk, XXXGenericPairTupleReturnWalk, XXXGenericFunctionalMethodsExcludingWalk and XXXNumeralTypeReturnTypeWalk green as expected failures"
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-load-check-generic-numeral/skeptic/hall [the rung's seven tests with their .test files, GenericOverloadStaticArgKindsWalk.fss, XXXGenericMethodBoundsApartWalk.fss, MethodStaticArgOverloadedReceiver.fss, MethodStaticArgCases.fss, GenericOverloadBoundsApart.fss]

     OK Saw expected refusal at load
     Saw expected failure: loaded and ran, not refused at load
    OK (12 tests)

The programs of finding 1 and 2 under walk on the fixed code: `SkKinds` 'A 7', 'B 7', 'C 3'; `SkKindsOnlyOther` 'A 5'; `SkKindsTop` 'A 7', 'C 3', 'B 7'.

**The whole suite, once, after the last edit of code:** `ant testSystem`, started 19:22:03Z on the working tree whose code 529e8955ba committed unchanged (the head's code: 8bab93ca66 and this commit change tests and prose only):

    [junit] Tests run: 218, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 212.701 sec
    [junit] Tests run: 228, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 213.104 sec
    [junit] Tests run: 217, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 216.764 sec
    [junit] Tests run: 229, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 230.79 sec
    BUILD SUCCESSFUL

892 tests: the worker's 888 and four files added since (`XXXGenericFunctionalMethodsExcludingWalk`, `XXXNumeralTypeReturnTypeWalk`, `GenericOverloadStaticArgKindsWalk`, and `XXXGenericMethodBoundsApartWalk`, which the skeptic then rewrote as `XXXGenericMethodBoundsDifferWalk` with the nested form first). `XXXGenericMethodBoundsDifferWalk` and `XXXAsIfGenericMethodOverloadsWalk` came after the suite and change no code; each ran through the harness on the fixed code, below. No line of the library or of a team test is refused at load.

## Corrections (8bab93ca66)

- `ProjectFortress/tests/XXXGenericMethodBoundsDifferWalk.fss` (1125). As it is, on the fixed code: 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; a ZZ32 takes the declaration bounded by ZZ32, the more specific', ' OK Saw expected exception', 'OK (1 test)'; with each object's second method named `tq` for one run, ' Missing expected failure', 'Tests run: 1,  Failures: 1' (restored, `cmp` equal); on the base's code, through the base build's harness, ' OK Saw expected exception' at `Nested.tk(n)` (18:12-22), 'Cannot find definition'.
- `ProjectFortress/tests/XXXAsIfGenericMethodOverloadsWalk.fss` (1126). As it is: the exception at 6:26, 'Missing type U', ' OK Saw expected exception', 'OK (1 test)'; with the trait's two methods plain for one run, ' Missing expected failure', 'Tests run: 1,  Failures: 1' (restored); on the base's code, the same exception at 6:26, 'OK (1 test)'.
- `Specification/appendices/changes.tex:2416-2423`, the clause on row 744 that the change makes false in part, which the report left for the gather. Before: "and a dotted call that writes static arguments to a method its receiver overloads still stops (row~744)." After: "and a dotted call that writes static arguments to a method name that its receiver overloads by a plain and a generic method still stops (row~744)." The clause on row 981 that the worker took out now opens at `:5487`.
- `record.md`: finding 1 and the FACTS entry name the key by kinds, the kinds case and 1125 and 1126; findings 8 to 10 added; 1125 and 1126 rows, each failing only its number rule under `ledger.py check --rows` ('2 rows, 2 fail the template; rows (or places) failing each rule: number 2'); the handover line and the revival change follow; F-341's correction adds its test `NumeralTypeComprisedWalk.fss`.
- `REPORT.md`: the citations the fixes moved (`genericKey` `:896-906`, Appendix I `:5486-5487`, `:3116-3122`); the provenance of the last passing run; the clause on row 744 marked as edited.

## Where the skeptic differs from the worker's account

- Decision 2, one symbolic instantiation per name and number of static parameters: the key needs the kinds too (finding 1), and the bounds (finding 3, recorded). The worker's evidence, `Statics` and `Redeclares`, holds under the kinds key.
- The report's "Made true, not false" of `Specification/basic/inference.tex:332-334` holds except for 1125 and 1126, which the passage's list of departures (rows 760 and 762) can name once the gather numbers them.

## Programs run old against new

Old: `/home/user/fortress-base43/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base43 <worktree>/tmp/old-caches P.fss` (walk) and `... compile P.fss && ... run P` (compiled); new: the worktree's `bin/fortress P.fss` on the rung's build (before the fixes) and on the fixed build where marked.

| program | walk, old | walk, new | compiled |
|---|---|---|---|
| `SkBounds`: object, `tk[\U extends Number\](y: U, z: U)` beside `tk[\U extends String\](y: U, z: U, w: U)`, inferred and written | 'Cannot find definition' | 2, 3, 2, 3 | |
| `SkBoundsTop`: the same at the top level | 2, 3, 2, 3 | the same | |
| `SkKinds`: object, `h[\nat n\](x: ZZ32)` beside `h[\T\](x: T, y: T)` | 'Cannot find definition' | 'Got nat n instead of type for param T'; fixed: 7, 7, 3 | 5, 7, 3, 7 (with `m()`) |
| `SkKindsOnlyOther`: the same object, only `K.m()` called | 5 | the same stop; fixed: 5 | |
| `SkKindsTop`: the same at the top level | 7, 3, then 'Expected Nat, got ZZ32' | the same; fixed: 7, 3, 7 | 7, 3, 7 |
| `SkBoundsSame`: object, `tk[\U extends Number\](y: U)` beside `tk[\U extends String\](y: U)` | 5, then 'Cannot find definition' | 5, 2, then 'Meet(String, Number) not a singleton'; fixed: the same | 'duplicate entry' (row 537) |
| `SkBoundsSameTop`: the same at the top level | 2, 3 | 2, 3 | |
| `SkBoundsNested`: `Number` beside `ZZ32` bounds, a `ZZ32` and a `ZZ64` | 'Cannot find definition' | 2, 2 | 'duplicate entry' |
| `SkBoundsNestedTop` | 3, 2 | 3, 2 | |
| `SkBoundsTwoTraits`: the bounds in two traits | 2, then 'Unification error' | the same | |
| `SkBoundsRedeclare`: the trait's, redeclared in an object at another bound | 3, then 'Meet(ZZ32, String) not a singleton' | the same | |
| `SkGenericObject`: `object Box[\E\]` with `tk[\U\]` of two and three parameters | 'Cannot find definition' | 5, 3, 5, 3 | |
| `SkTwoTraits`: `tk[\U\]` of two parameters in trait `A`, of three in `B`, `object Ab extends {A, B}` | 2, 3, then 'Don't actually resolve overloading of generic methods yet.' | 2, 3, 2, 3 | |
| `SkPlainGeneric`: plain `f(x: ZZ32)` beside `f[\T\](x: T, y: T)` in one object | 'Missing type T' (row 760) | the same | |
| `SkAsIfOnly`: `(Inherits asif Tk).tk(1, 2)` | 'Missing type U' | the same (1126) | |
| `SkTupleTrait`: `pt[\T extends Shape\](a: T): (T, ZZ32)` beside `pt(a: Round): (Round, ZZ32)` | 'fails the Return Type Rule' | the same, as the rule asks | |
| `SkTupleBoth`: `(T, T)` beside `(Dot, Dot)` | 'fails the Return Type Rule' | loads, 4 4 | 4 |
| `SkTupleWrongOther`: `(T, ZZ32)` beside `(Dot, ZZ64)` | refused | refused | |
| `SkTupleLength`: `(T, ZZ32)` beside `(Dot, ZZ32, ZZ32)` | refused | refused | |
| `SkTupleNotTuple`: `(T, ZZ32)` beside `Any` | refused | refused | |
| `SkTupleSecond`: `pt[\T extends Number\](a: T, b: ZZ32): (ZZ32, T)` beside `(ZZ32, Dot)` | refused | loads, 1 4 2 | |
| `SkTupleTwoParams`: `pt[\T, U\](a: T, b: U): (T, U)` beside `(Dot, Dot)` | refused | loads, 4 4 | |
| `SkComprRadix`: `comprises { RadixPointNumeral[\2, 1, 10, 15\] }` | REACHED | 'RadixPointNumeral cannot be written in a program except as a parameter's type.' | |
| `SkComprWhere`: `comprises { NaturalNumeral[\n, r, v\] } where [\nat n, nat r, nat v\]` | REACHED | refused, 'NaturalNumeral cannot be written ...' | |
| `SkComprGeneric`: `trait T[\X\] comprises { NaturalNumeral[\1, 10, 3\], Box[\X\] }` | REACHED | refused | |
| `SkComprPlain`: comprises clauses of objects, generic and plain | REACHED | REACHED | |

Each refusal of the tuple programs reads 'fails the Return Type Rule'.

## Defects and their homes

- Rows 1057, 1058, 981: home 1, the promoted tests (the worker's).
- 1122, 1123, 1124: home 2 (the worker's).
- Finding 1, the kinds in the key: home 1, `GenericMethodOverloadSetWalk.fss`, object `Kinds`.
- Finding 2, `compatible`: home 1, `GenericOverloadStaticArgKindsWalk.fss` and `Kinds`.
- Finding 3, 1125: home 2, `XXXGenericMethodBoundsDifferWalk.fss`, with its row in `record.md`.
- Finding 4, 1126: home 2, `XXXAsIfGenericMethodOverloadsWalk.fss`, with its row in `record.md`.
- `SkPlainGeneric`: row 760, whose test is `XXXDispatchGenericMethodBesidePlain.fss`.

## Points to report

- Each fix as made, by file and member: the worker's, as its report lists them; the skeptic's, `Constructor.genericKey` (`Constructor.java:896-906`) and `OverloadedFunction.compatible` (`OverloadedFunction.java:3057-3070`), a member beyond those the section names, which reaches the top-level overloaded generic function too.
- The three expected failures promoted, each failing on the base and passing after: item 2 above.
- Walk's suite: 892 tests, 0 failures, on the fixed code; no line of the library or of a team test refused at load.
- Sentences of the specification made false, before and after: `Specification/appendices/changes.tex:5486-5487` (the worker's) and `:2416-2423` (the skeptic's), above.
- P-174's sentence on row 981, quoted in `REPORT.md`, "P-174's sentences on row 981", with the words that hold after the change.
- Files edited: all under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` and `explorations/`; beyond the named members, `getOverloadsAndPending` (the worker's) and `compatible` (the skeptic's); beyond the named tests, the worker's four and the skeptic's three.
- Failure mode: finding 3, a loud failure on the base made a quiet wrong value for two generic methods differing only in their bounds.

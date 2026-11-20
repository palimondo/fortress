# Rung G of climb batch 34: NN32's getters at NN32, and the checker's refusal of a getter that widens one it inherits (row 993)

- problem: the compiled checker passed `NN32`'s `getter zero(): Number` and `getter one(): Number` beside the inherited `zero(): I` and `one(): I` at `I = NN32`, and the code generator then stopped the whole of `FortressBuiltin` against the one library (row 993, `explorations/fortress-gap-ledger.md:1055`; the rehearsal's W4, `explorations/compile-ladder/plan-31/probes/switch-rehearsal.md:66-72`).
- spec: the Return Type Rule, `Specification/advanced/overloading.tex:555-559`, and "The return type of the overriding declaration must be subtype of that of the overridden declaration", `Specification/basic/traits.tex:678`.
- precedent: the check of a method redeclared at the same parameter types, `checkOverridingReturnType`'s equal case with `returnTypeCheck` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:731-734`, `:753`); for the library, the scalar range's pairs built by `self.map` (`Library/RangeInternals.fss:1280-1283`) and `SimpleIndexValuePairs`'s and `ReversedIndexed`'s `getter bounds(): CompactFullRange[\I\] = self.g.bounds` (`Library/FortressLibrary.fss:4049`, `:4201`).
- deviation: `getterArrow` reads a getter's receiver as the plain type that declares it at the instance, where `toMethodArrows` reads a dotted method's from the index's self type, the intersection `T[\X\] & {X}` of a self-typed trait (`OverloadingChecker.scala:214` beside `:224-234`); the getter check reaches a pair of getters only, not a getter beside a dotted method (`:725`).
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `Library/FortressLibrary.fss`, `Library/List.fss`, `Library/RangeInternals.fsi`, `Library/RangeInternals.fss`.

One launch worked this rung. Branch `wip/rung-widening-getter`, from `639eef1806`; its code commits are `0579b62a7f` (the checker and its three tests), `9580dd7bbb` (`NN32`'s two lines) and `721bd2b25b` (the thirteen other library getters and the walk test). Machine of every run: 4 CPUs, Intel Xeon @ 2.30 GHz, OpenJDK 25.0.4.1; the stages at `FORTRESS_THREADS=1`, the harness at 4; other agents ran beside this rung (loads 0.04 to 11).

## What changed and why

A getter is a `FieldGetterMethod` in the checker's index, and `toMethodArrows` keeps only a `DeclaredMethod` (`OverloadingChecker.scala:208-210`). So `checkOverridingReturnType`, which compares a declaration with the one it keeps its type from inheriting (`STypesUtil.providedAndOverridden`, which does gather getters), got no arrow for a getter and checked nothing (`case _ =>`). The checker passed `getter zero(): Number` in an object below `trait Tz[\I extends Tz[\I\]\]` with `getter zero(): I`, and the code generator, which builds one overload set of the two, stopped: 'Likely bug in static analysis, apparently malformed overload set not rejected'.

The edit (`0579b62a7f`): where both declarations of such a pair are getters (`:725`), each gets an arrow from `getterArrow` (`:220-234`), its receiver the one parameter, and the pair is checked as a pair of methods at the same parameter types is, by `returnTypeCheck` both ways (`:731-734`), whose message is 'For zero,\nthe return type of Oz->Number @ ... should be a subtype of the\n    return type of Tz[\Oz\]->Oz @ ...'. `isGetter` (`:800-803`) names a getter. The receiver is the plain declaring type at the instance (the third element of each gathered declaration), because P-146 and P-157 have the Return Type Rule read a self-typed trait's plain signature: the index's self type, `Tz[\Oz\] & {Oz}`, is equivalent to `Oz`, so a narrowing getter would have failed the second direction (below, "Decisions", D2).

The library (`9580dd7bbb`, `721bd2b25b`): every getter of the fourteen components that the new check refuses answers the inherited type now:

- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265`: `NN32`'s `zero` and `one` at `NN32`, keeping `unsigned(0)` and `unsigned(1)`.
- `Library/FortressLibrary.fss:4031`: `SimpleMappedIndexed`'s `bounds` at `CompactFullRange[\I\]` (was `Range[\I\]`; its body `self.g.bounds` already answered it).
- `Library/FortressLibrary.fss:3638`: `VoidReduction`'s `reverse` at `CommutativeMonoidReduction[\()\]` (was `Reduction[\()\]`; its body is `VoidReduction`).
- `Library/List.fss:264-275`: `ArrayList`'s `extractLeft` and `extractRight` at `Maybe[\(E,List[\E\])\]` and `Maybe[\(List[\E\],E)\]`, their `Nothing` and `Just` at the same arguments (they named `ArrayList[\E\]`, and generics are invariant, so `Maybe[\(E,ArrayList[\E\])\]` is no subtype of `Maybe[\(E,List[\E\])\]`).
- `Library/List.fss:278`: `ArrayList`'s `indexValuePairs` at `Indexed[\(ZZ32,E),ZZ32\]` (was `Generator`; its body `self.indices.map` already answered it).
- `Library/RangeInternals.fsi:526`, `:546`, `:601`, `:620` and `Library/RangeInternals.fss:1400-1401`, `:1436-1437`, `:1658-1659`, `:1693-1695`: the `indexValuePairs` of `CompactFullRange2D`, `CompactFullRange3D`, `StridedFullRange2D` and `StridedFullRange3D` at `Indexed[\(I,I),I\]` for their index type `I` (was `Generator`), built by `self.map` (`Indexed`'s own `map`, `SimpleMappedIndexed`) where they mapped `self.generator`. So under walk the pairs now take a subscript, as `Indexed` promises; before, `((1,1):(2,3)).indexValuePairs[(1,2)]` stopped walk.

## The runs

**The test, failing on the base.** Expected failure, stated before the run: junit.sh reports the compile red, ' Saw failure, but did not satisfy compile_err_contains; expected should be a subtype of the', with the code generator's 'Likely bug in static analysis ...' and 'File XXXGetterReturnTypeNotSubtype.fss has 1 error.'. The run, 15:34:23Z, before any edit (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh g1base ProjectFortress/compiler_tests XXXGetterReturnTypeNotSubtype.test`):

    Likely bug in static analysis, apparently malformed overload set not rejected for
    XXXGetterReturnTypeNotSubtype..Oz.zero():Number
    File XXXGetterReturnTypeNotSubtype.fss has 1 error.
     Saw failure, but did not satisfy compile_err_contains; expected
    Tests run: 1,  Failures: 1,  Errors: 0

**The test, passing** (`... junit.sh g1fix2 ProjectFortress/compiler_tests XXXGetterReturnTypeNotSubtype.test SelfTypedGetterNarrowedReturn.test XXXSelfTypedMethodNarrowedReturn.test`, on the code of `0579b62a7f`):

    the return type of Oz->Number @ ProjectFortress/compiler_tests/XXXGetterReturnTypeNotSubtype.fss:10:5-29 should be a subtype of the
        return type of Tz[\Oz\]->Oz @ ProjectFortress/compiler_tests/XXXGetterReturnTypeNotSubtype.fss:6:5-7:1
    File XXXGetterReturnTypeNotSubtype.fss has 1 error.
     Saw expected failure
    OK (5 tests)

Its last run after the last change of code is `ant testFast` on `721bd2b25b` (below). The first XXX test, red on a deliberate fix: with `Oz`'s getter typed `Oz` for one run, then restored (`... junit.sh g1red ...`): ' Saw failure, but did not satisfy compile_err_contains; expected', 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1,  Errors: 0'.

**The two other compiled tests on the old code** (`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base40 <tree>/tmp/old-caches junit ...`): `SelfTypedGetterNarrowedReturn` compiles, links and prints PASS there ('. run ... SelfTypedGetterNarrowedReturn (498ms) PASS'), a test with no failing run, which guards the narrowing form; `XXXSelfTypedMethodNarrowedReturn` reports ' Saw expected failure' there and on the new code, the compile refused 'For g,\nthe return type of (Tn[\On\] & {On})->Number ... should be a subtype of the\n    return type of On->ZZ32'.

**`NN32`'s two lines, failing with the new checker.** Expected failure, stated before the run: the compile of `FortressBuiltin` under `FORTRESS_LIBRARY=one` refuses `FortressBuiltin.fss:264-265` with `returnTypeCheck`'s message. It failed another way, before the checker, at row 874's wall:

    java.lang.RuntimeException: Can't generate header for method floatToString with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String
    File FortressBuiltin.fss has 1 error.

So the distance stage's driver ran on `FortressBuiltin` alone, from a copy of `explorations/coordinator/tools/distance/run.sh` whose `COMPONENTS` names that one component, on `0579b62a7f` (the lines unchanged), with the expected failure stated again: the return-type kind at 2, where the comparand reads 0. It was:

    #total	2
    #kind	return-type	2
    #unit	component FortressBuiltin	2
    return-type	zero	...	FortressBuiltin.fss:264,FortressLibrary.fsi:472	For zero, the return type of NN32->Number @ FortressBuiltin.fss:264:5-39 should be a subtype of the return type of Integral[\NN32\]->NN32 @ FortressLibrary.fsi:472:5-29

After the edit the distance stage reads 0 (below).

**What else the checker refused.** The distance stage on `9580dd7bbb` (`NN32`'s lines repaired, a discovery run on code that the final stage does not measure): 13 errors, all return-type, in four units:

    #total	13
    #unit	api RangeInternals	4
    #unit	component FortressLibrary	2
    #unit	component List	3
    #unit	component RangeInternals	4

The thirteen are the lines listed under "What changed". The count stage on the same commit read 4 errors at 5 places, the RangeInternals api's four. No team test's line was refused: `ant testFast` and `ant testSystem` passed on the final tree with every checked value as before.

**The walk test of the ranges' pairs.** Expected failure, stated before the run: on the old code the harness reports `RangeBodiesWalk` red at its first new case, indexing a mapped generator. The run (`FORTRESS_HOME=/home/user/fortress-base40 /home/user/fortress-base40/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-widening-getter/old-harness <tree>/ProjectFortress/tests/RangeBodiesWalk.fss`, 15:52:04Z, before the edit of `RangeInternals`):

    Cannot find definition for method _[_] given receiver SimpleMappedGenerator[\(ZZ32,ZZ32),((ZZ32,ZZ32),(ZZ32,ZZ32))\]
    .../RangeBodiesWalk.fss:17:16-49:
    Tests run: 1,  Failures: 1,  Errors: 0

After it (`explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-widening-getter/h1 ProjectFortress/tests/RangeBodiesWalk.fss ProjectFortress/tests/IndexValuePairsDefault.fss`): 'OK (2 tests)'; last, in `ant testSystem` on `721bd2b25b`.

**The whole suites,** once, on `721bd2b25b`, the final code:

- `ant testFast`: 'BUILD SUCCESSFUL', 'Total time: 9 minutes 33 seconds'; compiler 1,771 tests (the gate of climb batch 33b: 1,766, and these three files add 5), library 86, othercompiler 263, onelibrary 14, misc as before; 0 failures and 0 errors in each.
- `ant testSystem`: 'BUILD SUCCESSFUL', 'Total time: 4 minutes 41 seconds'; 224 + 213 + 225 + 216 = 878 tests, 0 failures, as at that gate.

**The stages,** on `721bd2b25b`, after the last edit was built; no change of code followed. Comparand: `explorations/compile-ladder/climb-batch-33b/gate/checker-count.txt`, `distance.txt` and `explorations/compile-ladder/gate/distance-sites.tsv`.

- Count (`explorations/coordinator/tools/checker-count/run.sh tmp/rung-widening-getter/checker-count-postedit.txt tmp/rung-widening-getter/cc-post`): `diff` with the comparand's table prints nothing (`#total 0`, `#locations 0`, `#crash none`).
- Distance (`explorations/coordinator/tools/distance/run.sh tmp/rung-widening-getter/distance-postedit.txt tmp/rung-widening-getter/dist-post`): `#total 0`, every kind 0, `#crash none`, 130 s; `explorations/coordinator/tools/distance/compare.sh` with the comparand prints 'DISTANCE SAME   0'. Sites moved: none; `errors.tsv` and the per-site list each hold only their header line.

**The checker's time (P-148).** The count stage, `time explorations/coordinator/tools/checker-count/run.sh`, once each:

| run | tree | load at start | real |
|---|---|---|---|
| base | the base build `/home/user/fortress-base40` (`2676c8009c`, the base's code) | 0.04 | 80.4 s |
| change | `721bd2b25b` | 3.04 | 91.4 s |

The results are the same: the two tables are equal, and the two `run.txt` files are equal once each run's tree path is replaced by `TREE`. A difference of 11 s at a load of 3 against one of 0.04 is noise for this smoke test. The second pass: JFR on one count run of each tree (`JDK_JAVA_OPTIONS=-XX:StartFlightRecording=...,settings=profile`, not timed). The top frames of the change are the generated `Walker` (`walkCases7$` 7.9 %, `walkCases5` 4.2 %), `BoxesRunTime.equals2` 4.0 %, `List.prependedAll` 3.8 %, as before; samples with `checkOverridingReturnType` on the stack are 406 of 5,540 on the base (7.3 %) and 345 of 4,816 on the change (7.2 %), and `getterArrow` is in 1. The profile shows no gain in the new code, so the pass changed nothing, and `pass` is `change`. Its audit has no reuse to check.

**The ladder subset.** No file of `explorations/compile-ladder/baseline-2026-09-19/raw/` has a first error that names what this change touched. Of the 85 programs of `pass-list.txt`, six declare getters (`tests/AliasedGetterTest`, `deepHierarchy`, `fmTest2`, `fmTest3`, `ifGetter`, `nestedInst`); run after the edit with the gate's drivers copied under `tmp/rung-widening-getter/ladder/`, each is at `pass`, as in `explorations/compile-ladder/climb-batch-33b/gate/ladder/ladder.tsv`, and its output is the baseline's after the timing line is masked.

**The library outside the fourteen.** The driver over the library's other 40 components, on `721bd2b25b`, finds new refusals at pairs of getters in `Library/Sparse.fss:26`, `:124`, `:168` (`indexValuePairs` at `Generator`) and `Library/Random.fss:159-162`, `:175-178` (`left`, `min`, `max`, `right` at `Maybe[\T\]` in objects that extend `RandomGen[\U\]`), and three crashes of the overloading stage in `Format`, `Generator2` and `PureList` whose traces pass through no line of this change. These components are checked by no stage and compiled by no test, and they hold many other errors (`#total none`, 508 typecheck errors). Their getters stay as they are (D6). The same run on the base build, which would have told the new crashes from the old, was refused by the automatic permission check, and was not made by another route.

## Where the fix belongs, and the precedent search

`explorations/coordinator/map/compile-path-walkthrough.md`, "3. The checker", puts the overloading rules after the type check in `StaticChecker` (`compiler/StaticChecker.java`); the Return Type Rule for a declaration and the one it keeps from being inherited is `checkOverridingReturnType` (`OverloadingChecker.scala:712-751`), by its comment and by the commit that wrote it (`2d22d3a35d`, "checks an override's return type"). The team's checker had no such check, and its dotted-method set already dropped getters (`git show a874948ac:ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala`, `:146`). Of the other sites of the same file that read only declared methods, one remains: the per-provider overloading check, `toMethodArrows(dottedMethods)` at `:416`, which is why row 1073's two sibling getters pass; fork G1 does not reach it. The ways the language and the library offered: (a) refuse by `returnTypeCheck`'s message at the pair (taken, fork G1); (b) refuse by the `override` message at `:744-746`, which speaks of an `override` that widens parameter types, not of a getter at the same ones; (c) widen the per-provider check to getters, which would also change row 1073's form, outside the fork; (d) leave the checker and only repair the library's lines, which leaves a program's own widening getter stopping the code generator against the prelude.

## What the specification settles

The Return Type Rule (`Specification/advanced/overloading.tex:555-559`): where one declaration is more specific than another, its return type is a subtype of the other's. An object's getter is more specific than the one it keeps from being inherited, by its receiver, at the same parameter types, so its return type must be a subtype. `traits.tex:678` says the same of an `override`. The Subtype Rule for dotted methods (`overloading.tex:203-208`) needs strictly narrower parameter types, which a pair of getters lacks, so it does not decide the pair. The self-type revision (`Specification/basic/traits.tex:610-615`; its Appendix I Effect, `Specification/appendices/changes.tex:4441-4446`, "keeps T in the signatures that overloading, the Return Type Rule and the choice of a declaration at a call read") settles the receiver's reading (D2), and with it the method form of NEW-G-1, which the checker gets wrong today.

## Old code against new

| program | old code | new code |
|---|---|---|
| `compiler_tests/XXXGetterReturnTypeNotSubtype` | code generator: 'malformed overload set not rejected' | checker: 'For zero, ... should be a subtype of the ...' |
| scratch `WidenGetterPlain` (`trait T` `getter g(): ZZ32`, `object O extends T` `getter g(): Number = 3`) | compiles, rc 0 | refused, 'For g, the return type of O->Number ... should be a subtype of the return type of T->ZZ32' |
| scratch `WidenGetterField` (`object O(g: Number) extends T`) | compiles, rc 0 | refused, same message at the field |
| scratch `WidenGetterInTrait` (`trait U extends T` `getter g(): Number = 3`) | compiles, rc 0 | refused, same message |
| `compiler_tests/SelfTypedGetterNarrowedReturn` | compiles, runs, PASS | compiles, runs, PASS |
| scratch `NarrowGetterPlain` | rc 0 | rc 0 |
| `compiler_tests/XXXSelfTypedMethodNarrowedReturn` | refused, 'For g, ... (Tn[\On\] & {On})->Number ...' | the same |
| `tests/RangeBodiesWalk` (walk) | 'Cannot find definition for method _[_] ...' | PASS |

The scratch programs are under `tmp/rung-widening-getter/probes/`; each compile ran with `bin/fortress compile` of the tree, or of the base build through `old-fortress.sh`.

## Sentences of the specification made false

None. `grep -rn '~993' Specification --include=*.tex` prints nothing, as on the base. The Return Type Rule's section, the Subtype Rule's section (`overloading.tex:184-208`) and `traits.tex`, "Method Declarations", hold no sentence that a widening getter is accepted, and no sentence names `NN32`'s getters, `indexValuePairs`, `extractLeft`, `VoidReduction` or `SimpleMappedIndexed`. One sentence was already false before this change and stays so for dotted methods: the Effect at `Specification/appendices/changes.tex:4441-4446` says the compiled checker keeps `T` in the signatures that the Return Type Rule reads, but its check of a dotted method redeclared at the same parameter types reads `T[\X\] & {X}` (NEW-G-1); the gather may name the row there.

## Points to report

1. Where the checker now refuses the form: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:720-751`, `checkOverridingReturnType`, for a getter that keeps a getter of its name from being inherited at the same parameter types (`:725`, `getterArrow` at `:220-234`); message `returnTypeCheck`'s (`:753-769`), 'For zero,\nthe return type of Oz->Number @ ... should be a subtype of the\n    return type of Tz[\Oz\]->Oz @ ...'; rule: the Return Type Rule, `Specification/advanced/overloading.tex:555-559`.
2. The test against the prelude, `ProjectFortress/compiler_tests/XXXGetterReturnTypeNotSubtype.test`, failing on the base and passing after (runs above); `NN32`'s getters typed `NN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265`), their refusal by the new checker seen before their edit (the distance driver on `FortressBuiltin`, `0579b62a7f`) and gone after (the distance stage, 0, `721bd2b25b`).
3. Every line of the libraries that the checker now refuses, and what was done: the thirteen of the fourteen components, repaired (listed above); `Library/Sparse.fss:26`, `:124`, `:168` and `Library/Random.fss:159-162`, `:175-178`, outside the fourteen, left, NEW-G-2; `Library/PureList.fss:175-177` has the forms, unmeasured. No line of the tests is refused.
4. The two stages' tables on the final tree against the comparand: equal, count 0 and distance 0; the checker's time 80.4 s before and 91.4 s after, the results the same.
5. Sentences of the specification made false: none.
6. Files edited beyond those named: `Library/FortressLibrary.fss`, `Library/List.fss`, `Library/RangeInternals.fsi`, `Library/RangeInternals.fss` (fork G2's repairs) and `ProjectFortress/tests/RangeBodiesWalk.fss` (four assertions added, none changed). This is also the reserved point "a line of the libraries changed beyond the two": nineteen lines, five of them bodies. No team test's checked value changed. No model line changed.

## Decisions

- D1. The getter check reaches a pair of getters only (`:725`). Ways not taken: any pair with a getter in it, which would also check a getter beside a dotted method of its name, a form that traits.tex refuses anyway, "Getter names may not overlap ordinary method names" (`Specification/basic/traits.tex:555`), by a rule not built. Evidence: fork G1 names a getter beside a getter.
- D2. The receiver is the plain declaring type at the instance, not the index's self type. Ways not taken: `toMethodArrows`'s arrow, the self type (my first build did so: `NarrowGetterSelf`, compiled on the base, was refused, 'the return type of (Tn[\On\] & {On})->Number ... should be a subtype of the return type of On->ZZ32'); or one direction of `returnTypeCheck` only, which keeps the self type and departs from the method precedent in another way. Evidence: P-146 ("The method signatures keep the plain trait type"), P-157 ("specificity and the Return Type Rule keep the plain signatures"), `changes.tex:4441-4446`.
- D3. The method form's refusal (NEW-G-1) is deferred with an expected failure, not repaired. Ways not taken: give `toMethodArrows` the plain receiver too, which also changes the per-provider check at `:416` and every method pair, outside fork G1, and which the stages would have to measure anew; leave it unrecorded. Evidence: fork G1 ("only the getter is new").
- D4. Each refused getter of the fourteen components is repaired in the library's own spelling (fork G2): the declared type narrowed where the body already answers it (`bounds`, `reverse`, `ArrayList`'s `indexValuePairs`); `ArrayList`'s `extract` getters at `List`'s types, as `List` declares them (`Library/List.fss:116-117`); the ranges' pairs by `self.map`, as the scalar range writes them (`Library/RangeInternals.fss:1280-1283`). Ways not taken: delete the ranges' overrides and inherit `Indexed`'s default `SimpleIndexValuePairs`, which drops the team's own index arithmetic; leave them refused (count 4, distance 13), which would stop the RangeInternals api under the checker; narrow the new check.
- D5. `NN32`'s lines keep their bodies `unsigned(0)` and `unsigned(1)`, typed `NN32`, as `NN64`'s are at `Library/FortressLibrary.fss:1066-1067`. Way not taken: `= 0`, the numeral converting at the declared type.
- D6. The getters that the check refuses outside the fourteen components (`Sparse`, `Random`) stay, recorded in NEW-G-2. Ways not taken: repair them under fork G2, though no stage or test checks those components and `Random`'s are a slip of `T` for `U` throughout its two proxy objects, not a plain widening. Evidence: the driver's run above; `Library/Random.fss:155-184`.
- D7. The failing run of `NN32`'s lines is the distance driver on `FortressBuiltin` alone. Ways not taken: the full distance stage twice; the compile under the selector, which stops first at row 874's wall. Evidence: the runs above.
- D8. The tests: the refusal test is `XXX`-named, as all 167 compile tests that pin a refusal are, since a plain-named compile that reports errors is red ('FAIL or fail should not appear in output', `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:419-426`); a plain compiled test guards the narrowing getter; the ranges' walk cases join `tests/RangeBodiesWalk.fss`, the test of those range bodies. Ways not taken: one test file holding both the refused and the accepted form, which a refusal test cannot.
- D9. The second pass changed nothing: the profile shows no gain in the new code. Way not taken: check a getter pair in one direction only, which keeps the results on this library but changes them for a pair of equivalent receivers.
- D10. The stages ran on intermediate code once each for discovery (`9580dd7bbb`), as fork G2 asks what the checker refuses elsewhere, and once on the final tree. Way not taken: one run, on the final tree only, which could not find the thirteen before their repair.

## Defects and their homes

- The checker passes a getter that widens the getter it keeps from being inherited (row 993's checker half): home 1, `compiler_tests/XXXGetterReturnTypeNotSubtype`. Row 993 closes.
- `NN32`'s getters at `Number` (row 993's library half): home 1, the distance stage, a library site's test (2 errors with the new checker before the edit, 0 after).
- Thirteen more widening getters in `FortressLibrary`, `List` and `RangeInternals`: home 1, the distance stage (13 errors on `9580dd7bbb`, 0 on `721bd2b25b`).
- The rank-2 and rank-3 ranges' pairs take no subscript under walk: home 1, `tests/RangeBodiesWalk`.
- A dotted method that narrows a self-typed trait's method in an object is refused (NEW-G-1): home 2, `compiler_tests/XXXSelfTypedMethodNarrowedReturn`, since `changes.tex:4441-4446` and P-146 settle it.
- Widening getters in `Sparse` and `Random`, outside the stages (NEW-G-2): a row only. The specification settles them, but no gated test compiles those components, so the row carries the command.
- Three crashes of the overloading stage in `Format`, `Generator2` and `PureList` (NEW-G-3): a row only; no gated test checks those components, and the base run was refused.
- Row 1073's cause, the per-provider check dropping getters: a note on row 1073.
- Under `FORTRESS_LIBRARY=one`, `FortressBuiltin`'s compile stops at the helper wrappers: row 874's, known; nothing new.

## Commands worked out

- The distance stage's driver on chosen components: a copy of `explorations/coordinator/tools/distance/run.sh` under `tmp/`, its `COMPONENTS=` line replaced by the paths wanted, run as the stage is; it writes the same table and `errors.tsv`.
- A profile of the count stage: `JDK_JAVA_OPTIONS="-XX:StartFlightRecording=filename=<file>.jfr,settings=profile"` before `run.sh` (it reaches the `java` launcher, not `javac`); then `jfr view --width 200 hot-methods <file>.jfr`, and for inclusive counts `jfr print --events jdk.ExecutionSample --stack-depth 400 <file>.jfr` with an awk count of the events whose stack holds a method's name.

## For FACTS

See `record.md`.

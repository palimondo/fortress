# Rung X: the checker's Return Type Rule for a generic declaration beside a plain one whose domain is an object type

- problem: row 542 of the gap ledger: the compiled checker refused `ident[\T\](x: T): T` beside `ident(x: Circle): Circle`, `Circle` an object, 'the return type of Circle->Circle ...' (`ProjectFortress/compiler_tests/XXXOverloadReturnObjectDomain.test:3` at c1ce2a35e1)
- spec: the Return Type Rule, "for every argument type other than BottomType to which d1 is applicable" (`Specification/advanced/overloading.tex:555`), and "an object trait type excludes any type that is not its supertype" (`Specification/basic/types-vals-vars.tex:288`)
- precedent: the rule's own construction of the special arrow, which replaces a forced static parameter of the less specific declaration through a `StaticTypeReplacer` before the meet is taken (`ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala:106-109`); the positions of a domain as `coversOverlap` reads them (`OverloadingOracle.scala:231-235`)
- deviation: the paper's theorem sets aside every instance whose domain is `Bottom` (`Papers/Types/overloading-check.tick:180`); the edit sets aside only those that an object type at a whole parameter position shows empty: none
- deviation: `compiler/OverloadSet.java` is edited, a file beyond those the rung names: `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1958`
- historical: `ProjectFortress/src/com/sun/fortress/scala_src/overloading/OverloadingOracle.scala`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java`, `Specification/appendices/changes.tex` (the revival's own entry in it): none

One launch worked the rung. The worktree was seeded by `seed-worktree.sh` (exit 0). Commits on `wip/rung-return-rule-object`: f145926e3b (the code and its tests), 17c71b2623 (one more expected-failure test and the specification's sentence), then this report.

## What changed and why

**The rule as built** (`OverloadingOracle.scala:114-122`, `:136-167`). `satisfiesReturnTypeRule(f, g)` builds, for `f` more specific than `g`, the special arrow `ra` over `f`'s static parameters and the static parameters of `g` that the domains do not force (the "kept" ones), with the domain `d1 ∩ d2` and `g`'s return type, and asks whether `f`'s arrow is a subtype of `ra`. Before this rung every instance of a kept parameter was compared. Now `meetingInstances(d1, d2, kept)` reads `g`'s domain `d2` and return type first: where a kept type parameter `T` of `g` is a whole parameter type of `d2` (the whole domain, or one element of its tuple) and `f`'s domain `d1` has an object type `C` at that position, `T` is replaced by `T ∪ C` in `d2` and in `g`'s return type. An object type is a `TraitType` whose index is an `ObjectTraitIndex`, with or without static arguments, or the self type of one. Where `T` stands at several positions, the union takes each object type found there. Nothing else is changed: a kept parameter inside a static argument, as `T` in `List[\T\]`, a size, a parameter whose position in `d1` is a trait, a tuple or an arrow type, and a domain with varargs or keywords are read as before.

**Where the paper's condition is read.** The paper counts the instances `U -> V` of the special arrow with `U` not `Bottom` (`Papers/Types/overloading-check.tick:180`). At a position where `f` has the object type `C` and `g` has `T`, the instance's domain holds `C ∩ T`. Below an object type there is only the object (`Specification/basic/types-vals-vars.tex:288`), so `C ∩ T` is not `Bottom` exactly where `C` is a subtype of `T`. The instances with `C <: T` are exactly the types `T ∪ C` for `T` within its bound (each such instance `T'` equals `T' ∪ C`; `f` more specific than `g` puts `C` within the bound). So the substitution keeps every instance whose domain can meet, and drops only instances whose domain is `Bottom`: the rule accepts no pair that the paper's rule refuses. It is one sufficient reading of "not `Bottom`", at object types only; the instances it still compares without need are those that only a `comprises` clause, a tuple type or a function type shows empty.

**The dispatcher's return** (`OverloadSet.java:1800`, `:1830`, `:1947`, `:1958-1971`). With the checker's repair alone the pair compiled and the run died as the class of the generic declaration's instance loaded: the dispatcher of `ident[\Square\]` holds the arm `ident(Circle)`, whose result the JVM's verifier reads as a `Circle` where the method returns a `Square`. `castArmResultToRange` now casts an arm's result to the dispatcher's range where that range is a static parameter and the arm declares another return type. The Return Type Rule makes the cast hold wherever the arm is reached. For an arm with static parameters of its own that is instantiated at run time, the old cast to the arm's declared return type named the arm's uninstantiated template (`Box?U?`), and failed with `ClassCastException` once the verifier was satisfied; in that one case the cast to the range takes its place (`OverloadSet.java:1800`). A dispatcher whose range is not a static parameter writes the bytecode it wrote before.

## The failing run and the passing run

The test is `ProjectFortress/compiler_tests/OverloadReturnObjectDomain` (`.fss`, `.test`), promoted from `XXXOverloadReturnObjectDomain`: three pairs, each call printing which declaration ran, checked by `run_out_WIcontains`.

Failing, on the base's code (the seeded build, before the edit was first built; `ProjectFortress/build/implementation.stamp` equal to the base build's), 2026-11-17T01:15:31Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base2 ProjectFortress/compiler_tests OverloadReturnObjectDomain.test XXXOverloadReturnObjectDomainOtherType.test XXXOverloadGenericObjectDomainByPosition.test

    . compile ProjectFortress/compiler_tests/OverloadReturnObjectDomain ProjectFortress/compiler_tests/OverloadReturnObjectDomain.fss:10:3-56:
        For ident,
    the return type of Circle->Circle @ ProjectFortress/compiler_tests/OverloadReturnObjectDomain.fss:14:1-59 should be a subtype of the
        return type of [\T\]T->T @ ProjectFortress/compiler_tests/OverloadReturnObjectDomain.fss:13:1-55
    File OverloadReturnObjectDomain.fss has 3 errors.
    Tests run: 5,  Failures: 5,  Errors: 0

An earlier form of the test (the row's second pair as a top-level `keep[\U\](x: Box[\U\])`) failed the same way at 01:07:38Z; that pair turned out to be refused by the positional rule (below), so the test took the functional-method form before the edit was built.

Passing, on the edit (f145926e3b's code, built by `ant compileAll`, then the library order), 2026-11-17T01:17:28Z:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fix1 ProjectFortress/compiler_tests OverloadReturnObjectDomain.test XXXOverloadReturnObjectDomainOtherType.test XXXOverloadGenericObjectDomainByPosition.test XXXOverloadReturnEveryInstance.test XXXOverloadPermutedStaticParams.test OverloadGenericBesidePlain.test

    . run ProjectFortress/compiler_tests/OverloadReturnObjectDomain (778ms) ident Circle
    OK (10 tests)

The program also prints the same eight lines and exits 0 run directly at `FORTRESS_THREADS=1` and `=4`.

The whole compiled suite, once, on the same code state (HEAD 17c71b2623, which adds only a test and prose to f145926e3b):

    ant testFast
    [junit] Tests run: 1624, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 695.837 sec      (compiler)
    [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 348.987 sec       (othercompiler)
    [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 254.653 sec        (library)
    BUILD SUCCESSFUL
    Total time: 11 minutes 43 seconds

The distance stage ran beside it, which is why it took longer than the 5 to 7 minutes of an idle machine.

## Where the fix belongs, and the precedent search

`explorations/coordinator/map/modules-and-phases.md`, "B.7 Overloading", and row 542 put the rule in `satisfiesReturnTypeRule`. Its three callers are the overloading check (`scala_src/typechecker/OverloadingChecker.scala:740`, `:867`) and the export check (`scala_src/typechecker/ExportChecker.scala:617`); all three take the repair, and none is edited. No precedent repaired this defect: `python3 explorations/coordinator/tools/ledger.py find --cites OverloadingOracle.scala` lists rows 542, 546 and 879, and row 542 names one sibling, row 853 (the specificity test, not this rung's). The construction followed is the rule's own substitution of forced parameters (one site, `OverloadingOracle.scala:106-109`).

The verification failure is in `OverloadSet`, which writes every dispatcher (`modules-and-phases.md`, B.7: `compiler/OverloadSet.java:1944,1964`). Two sites return an arm's result, `generateCall` and `generateLeafCall`; both take the cast. Rung K's cast is in `CodeGen.java` at the places where a value meets a declared type; a dispatcher's arm is not one of them, and no rung of this run names `OverloadSet.java` (rung M's section lists it under "Not").

## What the specification settles

The Return Type Rule quantifies over argument types "other than BottomType" (`Specification/advanced/overloading.tex:555-559`), and an object trait type excludes any type that is not its supertype (`Specification/basic/types-vals-vars.tex:288`): the pair `ident[\T\](x: T): T` beside `ident(x: Circle): Circle` is valid. The compiled implementation's restriction on static parameters by position (`Specification/advanced/overloading.tex:644-651`; P-45) stands: it refuses row 542's second pair as the row wrote it (below).

## Each program run old against new

| program | base's code | this rung's code |
|---|---|---|
| `ident[\T\](x: T): T` beside `ident(x: Circle): Circle` (in `OverloadReturnObjectDomain`) | refused, 'the return type of Circle->Circle' | compiles; `ident(Circle)` and `ident(h)` for `h: Shape = Circle` run the plain one, `ident(Square)` the generic one |
| `keep[\T\](x: T): T` beside `keep(self): Box[\U\]` in `object Box[\U extends Object\]` (same test) | refused, 'the return type of [\U extends Object\]Box[\U\]->Box[\U\]' | compiles and runs: `keep Box`, `keep generic` |
| `pick[\T\](x: T, y: T): T` beside `pick(x: Circle, y: Circle): Circle` (same test) | refused, 'the return type of (Circle, Circle)->Circle' | compiles and runs: `pick Circle`, and `pick generic` for `pick(Circle, Square)` |
| `g[\T\](x: T): T` beside `g(x: Circle): String` (`XXXOverloadReturnObjectDomainOtherType`) | refused, 'the return type of Circle->String' | refused, the same message |
| `keep[\T\](x: T): T` beside `keep[\U extends Object\](x: Box[\U\]): Box[\U\]`, row 542's second pair as written (`XXXOverloadGenericObjectDomainByPosition`) | refused, 'the return type of [\U extends Object\]Box[\U\]->Box[\U\]' | refused by the positional rule: 'the static parameters of [\U extends Object\]Box[\U\]->Box[\U\] ... should correspond position by position' |
| `keep[\T\](x: T): T` beside `keep[\U, V\](x: Duo[\U, V\]): Duo[\U, V\]`, called on a `Duo` (`XXXOverloadGenericObjectTwoParams`) | stops in the type check, 'V is not in the kind env' | the same (NEW-X-1) |
| `ident[\T extends Shape\](x: T): T` beside `ident(x: Round): Round`, `Round` a trait (`XXXOverloadReturnEveryInstance`) | refused | refused, the same message |

The base column of the first five rows is the 01:15:31Z run above and the run of 01:07:38Z; the last two are the fix1 run and the run of `XXXOverloadGenericObjectTwoParams.test` alone, 'Saw expected failure', `OK (1 test)`. Two more programs were run on the new code only, from scratch: a top-level `keep[\T, S\](x: T, y: S): T` beside `keep[\U extends Object\](x: Box[\U\], y: Square): Box[\U\]` (compiles, runs, PASS), and `first[\T\](x: T, y: Any): T` beside `first(x: Circle, y: Square): Circle` (compiles, runs, PASS).

## The stages and the checker's time

Both stages ran once on f145926e3b's code; no code changed after they started (17c71b2623 adds a test and prose). The comparand is `explorations/compile-ladder/climb-batch-32/gate/`.

Count stage: `diff explorations/compile-ladder/climb-batch-32/gate/checker-count.txt <the table of this run>` prints nothing: `#total 0`, `#locations 0`, `#crash none`.

Distance stage:

    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-32/gate/distance.txt tmp/rung-return-rule-object/distance-postedit.txt
    DISTANCE SAME   0

The two tables differ only in `#seconds` (165 there, 179 here; FortressLibrary 102 and 101) and `#machine` (the load at start). The run's `errors.tsv` holds its header line only, so no site moved against `explorations/compile-ladder/gate/distance-sites.tsv`.

The checker's time (P-148; `compiler.md`, "The checker's time"), one session, nproc 4, Intel Xeon 2.10 GHz, 2100 MHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`:

| run | tree | load at start | `time` real | user |
|---|---|---|---|---|
| base | `/home/user/fortress-base35`, c1ce2a35e1 | 0.07 | 93.6 s | 145.6 s |
| change | this worktree, f145926e3b | 2.91 | 93.2 s | 140.0 s |

Command, each run: `time explorations/coordinator/tools/checker-count/run.sh $W/tmp/rung-return-rule-object/count/$N.txt $W/tmp/rung-return-rule-object/count/$N`. The two tables are equal (`diff` prints nothing), and the two `run.txt` files, 33 lines each, are equal once each run's tree path and scratch path are replaced by one word.

The second pass: a JFR profile of the count stage's checker on the change (`-XX:StartFlightRecording=...,settings=profile` on the stage's own `java` line) holds 5,921 execution samples; 958 have `OverloadingOracle` on the stack, 440 `satisfiesReturnTypeRule`, and 0 `meetingInstances`. Its top frames are the generated walker's (`Walker.walkCases7$` 7.80 %, `walkCases0` 5.91 %, `walkCases2` 4.63 %, `walkCases3` 4.22 %, `walkCases4` 4.14 %), then `List.prependedAll` 2.77 % and `BoxesRunTime.equals2` 2.57 %. The new code asks the type analyzer nothing: it reads the two domains' positions and one index per position, and returns the identity where no kept type parameter meets an object type. The profile shows no gain to take in it, so the pass changed no code, `pass` is `change`, and no further count run or suite was due. The profiled run is neither a timed run nor a compared one.

## The ladder subset

Empty. No file's recorded first error names what this change touches: `grep -i "should be a subtype of the\|Bad return\|static parameters of" explorations/compile-ladder/ladder.tsv` prints nothing, and the baseline's `raw/` (85 files, all of the pass list) holds no 'return type' line. Nothing was run.

## Competing declarations

`grep -rn "meetingInstances\|castArmResultToRange\|armResultIsCastToRange" ProjectFortress/src/com/sun/fortress/` finds only the new members and their calls. The four test components' names occur in both test corpora only in their own files.

## Sentences of the specification

Changed, `Specification/appendices/changes.tex:3097-3104`, in the Effect of the revival's overloading entry. Before:

> The compiled type checker refuses more than the Return Type Rule where the more specific declaration's parameter type is an object type, as in ident⟦T⟧(x: T): T beside ident(x: Circle): Circle where Circle is an object (row 542);

After:

> The compiled type checker's Return Type Rule counts only the instances of the less specific declaration whose parameter type meets the more specific declaration's in a type other than BottomType: where the more specific declaration's parameter type is an object type, below which there is only the object, as in ident⟦T⟧(x: T): T beside ident(x: Circle): Circle where Circle is an object, it accepts the pair, which compiles and runs;

The sentence says what the compiled path does; `OverloadReturnObjectDomain` shows it. The specification was not built here: the gather builds it once.

The skeptic narrowed this sentence after the report (SKEPTIC.md, fix 1): its first clause said of every parameter type what the edit does at an object type only. As it stands on the branch:

> The compiled type checker's Return Type Rule sets aside the instances of the less specific declaration whose parameter type meets the more specific declaration's only in BottomType where the more specific declaration's parameter type is an object type, below which there is only the object: it accepts ident⟦T⟧(x: T): T beside ident(x: Circle): Circle where Circle is an object, and the pair compiles and runs. It still compares those instances, and so refuses more than the Return Type Rule, where that parameter type is a tuple of object types, as in the same ident beside ident(x: (Circle, Circle)): (Circle, Circle);

Other sentences made false: none. `Specification/advanced/overloading.tex:636-637` ("with its Return Type Rule checked over every instance of the less specific declaration") stays true beside the rule's own words, "for every argument type other than BottomType".

## Points to report

1. **The rule as built**: above, "What changed and why"; `OverloadingOracle.scala:114-122` and `:136-167`.
2. **Row 542's two pairs.** The first compiles and runs, seen refused on the base first. The second, as the row wrote it (`f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]`), passes the Return Type Rule now and is refused by the positional rule, which P-45 keeps: both declare one static parameter of their own, and `Box[\U\]` is no subtype of `U`. It is pinned as refused (`XXXOverloadGenericObjectDomainByPosition.test:3`). The same domain as a functional method of the generic object, whose static parameter is the object's and not the method's own, compiles and runs (`OverloadReturnObjectDomain.fss:9-11`, `:16`). The invalid pair stays refused (`XXXOverloadReturnObjectDomainOtherType.test:3`).
3. **Pairs of the one library or of an existing test whose verdict changed**: none. The count stage's `run.txt` is equal to the base's and the distance is 0 with no site; `ant testFast` passes with no existing test edited but the promoted one, and an existing expected failure that pinned a refusal would have turned red.
4. **The two stages and the timing**: above.
5. **The sentence of the specification**: above.
6. **A file edited beyond those named**: `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:1800`, `:1830`, `:1947`, `:1958-1971`. Without it row 542's pair compiles and dies at class load, `VerifyError: Bad return type`, so "compiling and running" could not be shown. Reversible: the four hunks come out together.

No reserved point was reached: no model line, no pair of the library or of an existing test changed verdict, no rise of the count or the distance.

## Decisions

1. **The meeting instances are read by a substitution, `T ↦ T ∪ C`, into the special arrow.** Ways not taken: (a) a lower bound `C <: T` on the kept parameter in the kind environment, which a static parameter's declaration cannot carry outside `scala_src/types/`, a folder the rung does not edit; (b) checking the rule twice, once with `T := C`, which reads one instance and not every meeting one (`pick(Circle, Square)` at `T = Shape`); (c) a general test that `d1 ∩ d2` is `Bottom` under each instance, which needs the solver's exclusion with bounds (`meetEmptyWithBounds`) per instance and belongs with row 853. Evidence: the union is exact for an object type (above), and the analyzer already decides `C <: T ∪ C` (`scala_src/types/TypeAnalyzer.scala:160-165`).
2. **Only an object type at a whole parameter position is read.** Ways not taken: a trait whose `comprises` clause lists one object (fork V4 keeps that reading out of this run for walk; the prelude's number types are such traits until the merge), and tuple and function types, which also exclude every type that is not their supertype (`Specification/basic/types-vals-vars.tex:537`). No decision on record covers them; the reading acted on is the rung's section, "below an object type is only the object".
3. **The dispatcher casts an arm's result to its range, in `OverloadSet`.** Ways not taken: (a) leave the pair as an expected failure at run time with a new row, the checker's half alone landing; the section asks for the pair running, and row 496's notes already hold this verification failure; (b) cast in every dispatcher, whatever its range, which would add a run-time check to dispatchers that verify today and could fail where an interface return is wrong but unread (row 699). Evidence: `VerifyError: Bad return type` at `ident?...Square...the_function ... @14: areturn`, 'Type OverloadReturnObjectDomain$Circle (current frame, stack[0]) is not assignable to OverloadReturnObjectDomain$Square', from `bin/fortress run OverloadReturnObjectDomain` with the checker's repair alone.
4. **Row 542's second pair is tested as a functional method of the generic object, and the row's own spelling is pinned as refused by position.** Ways not taken: weaken the positional rule (against P-45); a top-level pair with two static parameters on the object side, which meets NEW-X-1. No decision of the curator covers which spelling the test takes.
5. **No second-pass code change** (the profile, above).
6. **The first expected-failure test shown red**: `XXXOverloadReturnObjectDomainOtherType`, with `g(x: Circle): String` changed to `g(x: Circle): Circle = x` for one run through `junit.sh`: 'Saw wrong failure. compile', `Tests run: 1,  Failures: 1`; then restored (`git diff --stat` on the file prints nothing).

## Defects, each with its home

| defect | home | where |
|---|---|---|
| row 542: the Return Type Rule refuses a generic declaration beside a plain one on an object type | 1, repaired | `compiler_tests/OverloadReturnObjectDomain` |
| the accepted pair's dispatcher fails verification, `Bad return type` (named in row 496's notes) | 1, repaired | the `run` step of the same test |
| a generic arm instantiated at run time is cast to its uninstantiated template, `ClassCastException: ... cannot be cast to class PrA$Box?U?` | 1, repaired where the dispatcher's range is a static parameter | the `keep Box` line of the same test |
| the checker crashes, 'V is not in the kind env', on a call over a generic object with two static parameters beside a generic declaration | 2, deferred; the specification settles it (the pair is valid) | `compiler_tests/XXXOverloadGenericObjectTwoParams`; NEW-X-1 |
| the checker's static type for a call of an invalid set depends on what the same JVM compiled before | 3, row only: no gated test can show two JVM histories | NEW-X-2 |

NEW-X-2's two programs and commands. `LeakB`: `trait Shape end`, `object Circle extends Shape end`, `g[\T\](x: T): T = x`, `g(x: Circle): String = "circle"`, and `run()` with `c: Circle = g(Circle)`. `LeakA`: the same two types, `ident[\T\](x: T): T = x`, `ident(x: Circle): Circle = x`, and `run()` with `h: Shape = Circle` then the statement `ident(h)`, which fails its type check. Each with a `.test` of `tests=` and `compile`:

    junit.sh leak1 <dir> LeakB.test
        the return type of Circle->String @ .../LeakB.fss:6:1-31 should be a subtype of the
    junit.sh leak2 <dir> LeakA.test LeakB.test
        .../LeakB.fss:8:15-22:
            Right-hand side has type String, but declared type is Circle.

## For the curator

1. Row 542's second pair, `f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]`, stays refused, now by the positional rule that P-45 keeps and not by the Return Type Rule. The language's rules allow the pair (`Specification/advanced/overloading.tex:644-651` calls the restriction "not a rule of the language"). Whether row 542 closes whole, as this report hands it over, or the pair gets a row of its own under the positional restriction is a decision not taken. Evidence: `ProjectFortress/compiler_tests/XXXOverloadGenericObjectDomainByPosition.test:3`; `OverloadingOracle.scala:201-215`.
2. Whether the Return Type Rule should also set aside the instances that a tuple type, a function type or a one-object `comprises` clause shows empty (decision 2). Evidence: `Specification/basic/types-vals-vars.tex:537`; `OverloadingOracle.scala:146-150`.

## Commands worked out

- The profile: the count stage's `java` line (`explorations/coordinator/tools/checker-count/run.sh:95-97`) with `-XX:StartFlightRecording=filename=F,settings=profile`, on the classes the stage compiled into its scratch folder; then `jfr view hot-methods F` and `jfr print --events jdk.ExecutionSample --stack-depth 64 F`, counting the samples whose stack names a method.

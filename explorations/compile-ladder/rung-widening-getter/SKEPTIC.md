# Skeptic's verdict on rung G of climb batch 34 (rung-widening-getter)

Head judged: `b9e24165a3` (the worker's report commit; its code is `721bd2b25b`'s). Head after: the commit of this file. Two launches of this role worked the rung: the first (16:59 to 17:06 UTC) read the branch and started a count run on the base build, and a restart of the machine ended it before any commit; its count run had no `EXIT=` line, so this launch ran it again. The branch already carried `REPORT.md` and `record.md` (the worker's commit `b9e24165a3`, the journal's texts plus a final newline), so the journal tool wrote nothing.

## What I checked

1. **The stages.** The diff changes the compiled checker, so I ran the count stage on the base build and on the worker's head, in one session, one after the other, under `nice -n 19` (4 CPUs, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`; another machine than the worker's, after a restart):

   `time nice -n 19 explorations/coordinator/tools/checker-count/run.sh $S/$N.txt $S/$N`, `N=base` from `/home/user/fortress-base40` (load at start 0.85), `N=change` from the rung's tree at `b9e24165a3` (load 1.25):

       base:   real 1m54.920s    #total 0   #locations 0   #crash none
       change: real 2m4.408s     #total 0   #locations 0   #crash none

   `diff` of the two tables prints nothing; the two `run.txt` files are byte-equal once each tree's path is replaced by `TREE`; my `change` table equals the worker's `checker-count-postedit.txt`, and both normalised `run.txt` files equal the worker's `run-base-norm.txt` and `run-change-norm.txt`. The worker's second pass changed no code, so its `change` run is the one compared. The distance stage's table the report quotes is the worker's file on `721bd2b25b` ('#total 0', every kind 0, '#crash none'), and its `compare.sh` line 'DISTANCE SAME   0' is in the transcript at 15:57:44. Every stage, suite and harness run the report gives as final started after the worker's last change of code (the library edits at 15:52:35 to 15:52:54; count 15:53:38, distance 15:55:21, `ant testFast` 15:57:48, `ant testSystem` 16:07:31); the discovery runs on `9580dd7bbb` are named as such in the report.

2. **Test first.** `XXXGetterReturnTypeNotSubtype` failed through the harness on the base's code at 15:34:23 (call `cnNKdR`), before the first edit of the checker (15:35:55) and its build (15:36:23): 'Likely bug in static analysis, apparently malformed overload set not rejected for', 'File XXXGetterReturnTypeNotSubtype.fss has 1 error.', ' Saw failure, but did not satisfy compile_err_contains; expected', 'Tests run: 1,  Failures: 1,  Errors: 0'. It passed after the last change of the checker (`junit.sh g1fix2`, 'OK (5 tests)') and in `ant testFast` on `721bd2b25b` (' compile .../XXXGetterReturnTypeNotSubtype  Saw expected failure', compiler track 'Tests run: 1771, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL'). No `Expected failure:` line precedes any of the rung's failing runs in the worker's messages, though `REPORT.md` said three times that one was stated before the run. Each failure is the one the brief's section names (the code generator's message and one error; for `NN32`'s lines, `returnTypeCheck`'s refusal of `FortressBuiltin.fss:264-265`, fork G2), or for `RangeBodiesWalk` the defect its new cases assert, on the base's code before the edit of the library source it reads (15:52:03, the edits from 15:52:35). The harness prints ' Saw failure, but did not satisfy' where the section's plain-named probe printed 'Must satisfy compile_err_contains', because the test is `XXX`-named; a plain-named compile test that reports errors is red (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:419-426`), and all 170 compile tests that pin an error are `XXX`-named. I corrected the report's sentences (below), and count the order as kept.

3. **The diff.** `OverloadingChecker.scala:725` sends a pair of getters to `getterArrow` (`:220-234`), which gives each its declaring type at the instance as receiver; the equal case's two `returnTypeCheck` calls (`:732-734`) then refuse a widening getter, the more specific one, and pass a narrowing one. The receiver is the plain type, as P-157 ("specificity and the Return Type Rule keep the plain signatures") and P-146 ("The method signatures keep the plain trait type") have it, and as `Specification/basic/traits.tex`, "Method Declarations", states in its self-type revision. Fork G1 names the rule and the message. The edit is as small as the form around it: `getterArrow` mirrors `toMethodArrows` without the renaming apart, which a getter, having no static parameters, does not need; `isGetter` follows `isDeclaredMethod`. I found nothing to trim. The library lines follow fork G2: types narrowed where the body answers the inherited type, `List`'s own types for `ArrayList`'s extract getters (`Library/List.fss:116-117`, `Library/List.fsi:79-80`), and the ranges' pairs by `self.map` as the scalar range builds them (`Library/RangeInternals.fss:1280-1283`).

4. **Precedent.** The worker found the revival's override check (`2d22d3a35d`) and followed its equal case; the library precedents it cites hold at the lines given.

5. **The tests.** Each exercises its form; each file has one comment line, which cites the specification by file and section. `SelfTypedGetterNarrowedReturn` guards the narrowing form, which the first build of the change refused (D2).

6. **My programs** (below): eleven checker programs and two library programs that the worker did not write, and the team's `ArrayListQuick`, each under walk and, for the checker's, on the compiled path, on the old code and the new.

7. **Homes.** The worker's homes hold. Two defects my programs measured are added (below).

8. **The ledger and the sibling sites.** `ledger.py find` with my words (getter return, getter widen, getter overrid, getter inherit, malformed overload, indexValuePairs, extractLeft, object expression) finds rows 993, 1073, 570, 375, 629 and 128 bearing on the rung; none other names the form. The same file's per-provider check (`:416`) still drops getters (row 1073, outside fork G1, as the worker says). The object expression is a sibling site that no check of the file reaches (row 1097, below). Walk, the other path, checks no return type at all; the specification asks only the static check.

9. **The report.** Its five provenance lines and the lines they cite open as they say (`OverloadingChecker.scala:207-234`, `:720-769`, `:800-803`; `overloading.tex:555-559`, `:203-208`; `traits.tex:555`, `:610-615`, `:678-679`; `changes.tex:4441-4446`; `FortressLibrary.fss:1066-1067`, `:4049`, `:4201`; `FortressLibrary.fsi:472-473`, `:1421`; `RangeInternals.fss:1280-1283`; `FileTests.java:419-426`; `a874948ac:...OverloadingChecker.scala:146`). The sentences of the specification made false: none; `grep -rn '~993' Specification --include=*.tex` prints nothing, and no `.tex` file names `indexValuePairs`, `extractLeft` or `VoidReduction`. The whole-suite runs are those of the head's code (`721bd2b25b`): `ant testFast` 'BUILD SUCCESSFUL', 1,771 compiler tests; `ant testSystem` 'BUILD SUCCESSFUL', 224 + 213 + 225 + 216 = 878, the sum of climb batch 33b's gate. Three sentences of `record.md` were not true as written (below).

10. **Competing names.** `getterArrow` and `isGetter` have no other declaration in `OverloadingChecker.scala`; `impls/Common.scala:62` has its own `isGetter` in another class. The test names are new in every test folder.

11. **Loud to quiet.** The checker turns the code generator's stop ('malformed overload set not rejected') into its own error, and a widening getter without a declared type from a run-time `VerifyError` into a static error. Under walk, the rank-2 and rank-3 ranges' `indexValuePairs[i]` gives a pair where it stopped with 'Cannot find definition for method _[_]', as `Indexed`'s contract (`Library/FortressLibrary.fsi:1421`) says. One quiet change: `ArrayList`'s `extractLeft` now makes a `Just[\(E,List[\E\])\]`, so under walk a `typecase` arm at `Just[\(ZZ32, List[\ZZ32\])\]` takes it, where on the base it did not; that is the type `List.fsi:79` declares.

## My programs, old code against new

Commands, from `tmp/rung-widening-getter/skeptic/progs/`: the old code by `/home/user/fortress-base40/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base40 /home/user/fortress-widening-getter/tmp/old-caches compile P.fss`, `... run P` and `... P.fss`; the new by the rung's `bin/fortress` with `FORTRESS_HOME` the rung's tree and `FORTRESS_CACHES` a private copy of its caches; `fortress typecheck` likewise.

| program | old: compile, run | new: compile, run | walk, old and new |
|---|---|---|---|
| `SkInferredWiden` (`getter g() = "s"` below `getter g(): ZZ32`) | rc 0; run 'VerifyError: Bad return type' | refused, 'the return type of O->String ... should be a subtype of the ... T->ZZ32' | 's', 's' |
| `SkGenericWiden` (`G[\ZZ32\]`'s `g(): X`, `g(): Number`) | rc 0, 'compiled' | refused, '... O->Number ... G[\ZZ32\]->ZZ32' | 'compiled' both |
| `SkGenericObjWiden` (`Ob[\Y\]`'s `g(): Any` below `G[\Y\]`) | rc 0 | refused, '... Ob[\Y\]->Any ... G[\Y\]->Y' | 'compiled' both |
| `SkGenericObjNarrow` (`g(): Y` below `G[\Y\]`) | 'narrow  5' | 'narrow  5' | 'narrow 5' both |
| `SkDiamondNarrow` (`g(): ZZ32` below `A`'s `Number` and `B`'s `ZZ32`) | 'a  7  b  7' | 'a  7  b  7' | 'a 7 b 7' both |
| `SkDiamondWiden` (`g(): Number` there) | rc 0 | refused, '... O->Number ... B->ZZ32' | 'compiled' both |
| `SkComprisesNarrow` (`trait T comprises { O }`, narrowing) | 't  3' | 't  3' | 't 3' both |
| `SkSelfTypedFieldWiden` (`object Oz(zero: Number) extends Tz[\Oz\]`) | 'malformed overload set not rejected' | refused, '... Oz->Number ... Tz[\Oz\]->Oz' | 'compiled' both |
| `SkNarrowViaTrait` (a trait's and a field's narrowing getter) | 't  4  s  9' | 't  4  s  9' | 't 4 s 9' both |
| `SkGetterBesideMethod` (getter beside a dotted `g(): ZZ32`, D1) | rc 0, 'compiled' | rc 0, 'compiled' | 'compiled' both |
| `SkObjExprWiden`, `SkObjExprMethodWiden` (object expressions) | typecheck rc 0; compile 'Can't compile ObjectExpr' | the same | 't 3' both |
| `SkObjExprNarrow` | typecheck rc 0; 'Can't compile ObjectExpr' | the same | 't 3' both |
| `SkObjMethodWiden` (an object's dotted `g(): Number`) | refused, '... O->Number ... T->ZZ32' | the same | — |
| `SkRangePairsWalk` (walk; the four ranges' pairs: size, a weighted `SUM`, the `seq` order; `(1:3).indexValuePairs.bounds`; `VoidReduction.reverse`) | — | — | equal on both codes, at `FORTRESS_THREADS=1` and 4: 'compact2 size 6', 'compact2 sum 3702', 'strided2 sum 10098', 'compact3 sum 674004', 'strided3 sum 3002994', 'scalar pairs bounds [0,1,2]', 'void reverse VoidReduction' |
| `SkArrayListWalk` (walk; `<\|1,2,3\|>`'s extract getters and pairs) | — | — | old 'extractLeft is another Maybe', new 'extractLeft is a Just at List'; then equal: 'head 1 tail <\|2, 3\|>', 'init <\|1, 2\|> last 3', 'pairs 3' |
| `tests/ArrayListQuick` (the team's, walk) | — | — | equal: '10:<\|0, 1, 2, 3, 4, 5, 6, 7, 8, 9\|>....', 'Succeeded in ...' |

The diff writes no mutable state; `SkRangePairsWalk` ran at both thread counts all the same. The reserved points: a model line, none changed (no path of `explorations/run-c4/src/` or `explorations/apl/mg/` in the diff); a team test's checked value, none changed (`ArrayListQuick`, above, and the suites); a line of the libraries beyond the two, twenty-one, whose walk answers are equal on both codes but for the `typecase` of `SkArrayListWalk`.

## Corrections

- **The test of an inferred getter** (`355edea65c`). `SkInferredWiden` is a form the rung repairs that no test of the rung reached: the check reads the getter's type from the index (`f.getReturnType`, `:226`), so a getter whose type is inferred is checked only while that stays so. Home 1: `ProjectFortress/compiler_tests/XXXInferredGetterReturnTypeNotSubtype.fss` and `.test`, `compile_err_contains=the return type of Oi->String`. Written in this file after its first run, not stated before it (`reviews/batch-34-review.md`, A1): 'Expected failure: on the base's code (old-fortress.sh junit), the harness reports the compile red, ' Saw failure, but did not satisfy compile_err_contains; expected' then 'the return type of Oi->String', 'Saw wrong failure. compile', 'Tests run: 1,  Failures: 1,  Errors: 0''. On the base's code (`.../old-fortress.sh /home/user/fortress-base40 /home/user/fortress-widening-getter/tmp/old-caches junit /home/user/fortress-widening-getter/ProjectFortress/compiler_tests/XXXInferredGetterReturnTypeNotSubtype.test`, 17:27:40Z):

       Saw failure, but did not satisfy compile_err_contains; expected
      the return type of Oi->String
      ...junit.framework.AssertionFailedError: Saw wrong failure.
      Tests run: 1,  Failures: 1,  Errors: 0

  On the head (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skinferred ProjectFortress/compiler_tests XXXInferredGetterReturnTypeNotSubtype.test XXXGetterReturnTypeNotSubtype.test SelfTypedGetterNarrowedReturn.test XXXSelfTypedMethodNarrowedReturn.test`):

      the return type of Oi->String @ ProjectFortress/compiler_tests/XXXInferredGetterReturnTypeNotSubtype.fss:10:5-20 should be a subtype of the
       Saw expected failure
      OK (6 tests)

  It adds one test to the compiler track, 1,772 with it. No code changed, so no build and no suite followed.

- **The report and the record** (`eed9c3da23`). `REPORT.md`: the three "Expected failure, stated before the run" sentences now say what the transcript holds (item 2); the two defects below join "Defects and their homes". `record.md`: row 1073's note read 'an inherited pair has `getterArrow`', which reads as if two inherited getters, row 1073's form, reached it; it now says that `getterArrow` is for a redeclared getter (the row's line lints clean, 1,121 characters, notes 698). Row 1094 said 'A call `On.g()` is typed `Number`.', which no run measured, since the program is refused; the sentence is gone (the worker's question for the curator repeats it: I differ there). The "Revival change" section said that the team's checker checked no override's return type; at `a874948ac` it compared a type's own and inherited dotted methods as one overloading (`OverloadingChecker.scala:312-318` there), so the section now says that, with the getter's absence from that set (`:146`). Finding 1 and the FACTS hand-over name the new test. New row 1097.

- **Row 1097**, home 3, a row only: an object expression's getter, or dotted method, that widens the declaration it keeps from being inherited passes `fortress typecheck` (rc 0) on both codes, where an object declaration's is refused (`SkObjMethodWiden`, `SkObjExprWiden`, `SkObjExprMethodWiden`, above). Its cause is row 570's: the per-provider loop visits only the unit's named traits and objects (`OverloadingChecker.scala:377-378`), and `checkOverridingReturnType` is called inside it (`:422`). No gated test can read the checker's answer: the compile stops first at row 375's wall, 'Can't compile ObjectExpr', and an `XXX` compile test whose key names the Return Type Rule's message is red while it does. Row 570 has 25 characters left, so the form takes a row of its own.

No defect of the change was found, and no fix or trim was made.

## Where I differ from the worker

- The three "stated before the run" claims (corrected; item 2).
- Row 1094's typing of a call, also in the worker's first question for the curator: unmeasured.
- The team's checker and override return types (corrected in `record.md`).
- D6 and D1 stand: `Sparse`'s and `Random`'s getters lie outside the section's reach (its step 4 names the tracks, walk's suite and the two stages), and the getter beside a dotted method compiles on both codes, unchanged.

## Verdict

Approved. The change is right: it refuses the widening getter by the Return Type Rule with `returnTypeCheck`'s message (fork G1), reads the receiver as P-146 and P-157 have it, repairs the library's refused lines in the library's way (fork G2), keeps the count and the distance at 0, and passes the suites; my corrections are a test and the record's text. The stages' tables in the report are those of the worker's head (`721bd2b25b`'s code); my commits change no code, and no stage ran after them.

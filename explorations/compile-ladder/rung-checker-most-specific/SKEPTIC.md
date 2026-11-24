<!-- Climb batch 36, rung K (rung-checker-most-specific): the skeptic's check of the worker's change and record, its corrections, and its verdict. -->

# Rung K: the skeptic's check

Judged: `1f2507f6ec` (the worker's head). One launch of this role worked the rung. The branch carried `REPORT.md` and `record.md` already, so the journal step wrote nothing. My commits: `2fe64f262a` (four tests), `0b5f234096` (a sentence of Appendix I), `1fef75d339` (REPORT.md and record.md), and this file. None changes Java or Scala, so no suite and no stage ran after them; the report's tables are those of the worker's head.

## 1. The two stages, and the count run again

The worker's tables, read: `tmp/rung-checker-most-specific/checker-count-postedit.txt` is '#total 0', '#locations 0', '#crash none', and its `diff` against `explorations/compile-ladder/climb-batch-35b/gate/checker-count.txt` prints nothing; `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-35b/gate/distance.txt tmp/rung-checker-most-specific/distance-postedit.txt` prints 'DISTANCE SAME   0'. Both stages started after the worker's last change of code: the last edit of `Functionals.scala` at 02:25:07 (call `9gCicz`), its build at 02:25:15 (`iHWCiB`), the count at 02:26:18 (`To5g8S`), the distance at 02:27:46 (`EyNgJw`).

The count stage myself, in one session, `explorations/coordinator/tools/checker-count/run.sh $W/tmp/rung-checker-most-specific/skeptic/count/$N.txt $W/tmp/rung-checker-most-specific/skeptic/count/$N` under `time nice -n 19`, the base build `/home/user/fortress-wsuite` (4b0e3abd6a, the base's code: its diff to b5a758846d touches only `explorations/`, `.claude/` and `docs/`) then the worker's head. Machine: nproc 4, Intel(R) Xeon(R) Processor @ 2.30GHz, 2300 MHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1`.

| run | load at start | real | user |
|---|---|---|---|
| base | 3.12 | 75.2 s | 117.5 s |
| change | 2.65 | 65.7 s | 110.7 s |

The worker's were 65.7 s and 68.6 s: the same order. My two tables are equal (`diff` prints nothing), the two `run.txt` files are equal with each tree's path replaced by `TREE` (33 lines each), and my change table and `run.txt` equal the worker's (`diff` prints nothing). The worker's second pass changed no code, so its `change` run is the one compared.

## 2. Test first, in the worker's transcript

- The echoed lines and the base run: call `uQsciv`, 02:00:42, five lines beginning 'Expected failure:' (and one 'Expected pass:'), then `old-fortress.sh /home/user/fortress-wsuite .../old-caches junit` on the five tests; its log `base-tests.txt` ended 02:00:48 with 'FAIL:  2 =/= 12; each direct call on a Box runs the declaration on Box, ...', 'Function body has type Q, but declared return type is R.', '... should be a subtype of the', 'Right-hand side has type RightResult, but declared type is LeftResult.', 'Tests run: 15,  Failures: 10,  Errors: 0', as `recordedFailure` quotes. The first edit of code was at 02:05:08 (`6m91Hk`, `FunctionalMethod.java`) and the first build at 02:07:23 (`LzbgHn`, `ant compileAll` into `build1.txt`), so the run ended before it. REPORT.md said "(02:03)"; corrected to 02:07:23 (`1fef75d339`).
- `OverloadGenericObjectTwoParams`, written after the fix, seen failing on the old code (`gSkgNx`, 02:23:57), its line echoed in that call: 'V is not in the kind env [][][]', 'Tests run: 3,  Failures: 2'. Its run step passed, not as echoed ("its link and run fail with it"); the cause is named in REPORT.md (a one-pair jar left in the private caches by the call before), so I count it seen failing.
- The pass: `ant testQuick` at 02:38:13 (`TbNDtR`), after the last change of code: 'Tests run: 1823, Failures: 0' (compiler), 86 and 263 with 0 failures, 'BUILD SUCCESSFUL', 'Total time: 11 minutes 58 seconds'; 'run ProjectFortress/compiler_tests/GenericTiesDeclaredCompiled (822ms) Passed' and the other five lines that `recordedPass` quotes. `ant testOneLibrary`: 'Tests run: 41, Failures: 0', 'BUILD SUCCESSFUL'.

## 3. The diff against the section and the forks

- K1, `FunctionalMethod.parameters()`: self at its plain trait type wherever its declared type is a `TraitSelfType` that lists types, the F-bound case as before (`selfFromBound` requires the same), now also a `comprises` clause's trait and the prelude's `comprises T`. As K1 states it. `selfType()` keeps the meet for a `comprises` trait, which the bodies read.
- K2/K4/K5/K3 in `Functionals.scala`: as REPORT.md, "What changed and why", says. `decided` by `CoercionOracle.moreSpecificDeclared` on `declaredOf`, the dotted arrow from `originalMethod` with the trait's parameters lifted; candidates `sortBy(place)` before `PartialOrder`; `tieType` over the tied declarations and the generic ones more specific that `mayRun`; the gate repair's `traitOfSelf`/`takesSelfAtTrait` gone. The exception to K3 (ties all of the unit, or duplicates, kept first) is the worker's, argued and put to the curator; my finding 4.1 bears on it.
- K6, `castToTypeBelow`: one line that maps a declared object `TraitSelfType` to its named type, inside the method F-377 made. My two-argument, second-position and operator calls on `self` run with it (section 6).
- I found nothing to trim: `schemaOf` repeats part of `declaredOf` for a `PreAppCandidate`, a different input, in two lines.

## 4. Findings

### 4.1 A tie that no rule decides among the unit's own declarations passes with no error; through an api it is refused

The branch `top.forall(ofThisUnit)` of `head` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1196-1198`) leaves such a tie to the overloading check on the ground that that check judges the set. For two generic declarations at excluding bounds the check accepts the set, so nothing is reported, and the call takes the first by place; the same call of the same declarations imported from an api is 'Ambiguous call'. My programs (`tmp/rung-checker-most-specific/skeptic/progs/`, `run-progs.sh`, the old code by `old-fortress.sh`, the new by the head's `bin/fortress`):

    SkTieGenExcl (f[\T extends A\](x: T): ZZ32 beside f[\T extends B\](x: T): String, trait A excludes B, g[\X extends { A, B }\](x: X): ZZ32 = f(x), one component)
      old compiled: compile rc=0, 'f(Ao)  1  f(Bo)  b', 'PASS'     new compiled: compile rc=0, the same     walk old and new: 'PASS'
    SkTieGenExclMain (the same g, f and the traits from the api SkTieGenExclFam)
      old compiled: compile rc=0, 'PASS'
      new compiled: 'SkTieGenExclMain.fss:5:39-41:' 'Ambiguous call to function f: of the declarations applicable to an argument of type X, none is more specific than every other: T->ZZ32; T->String.'
      walk old and new: 'PASS'

The ground form (`SkTieExcl`, `SkTieExclMain`, the same without static parameters) compiles on both codes in both layouts: `tieType` types it by the intersection, as on the base. Fork K3 makes a tie that the rules leave a static error; `Specification/basic/overloading.tex`, "Overloading Resolution", chooses an arbitrary declaration at run time and says nothing of the static call; which side is right is the curator's question the worker already put, and this is new evidence for it. Not repaired: the specification does not settle it and the worker argues for the exception. Recorded (home 3): `compiler_tests/GenericTieInUnitFirstByPlace` (today's behaviour: twelve such pairs of the unit, each call taking the first declared) and the row 1136 in `record.md`; and `compiler_tests/XXXGenericTieImportedAmbiguous`, the error through an api, which no gated test reached before (the worker's census: "no program reaches the new error").

    echo "Expected failure: XXXGenericTieImportedAmbiguous.test is red on the base: its program compiles, so the harness reports 'Saw wrong failure. compile', ..."
    old-fortress.sh /home/user/fortress-wsuite .../old-caches-t2 junit .../XXXGenericTieImportedAmbiguous.test
      ' Saw failure, but did not satisfy compile_err_contains; expected' 'Ambiguous call to function f' 'Tests run: 1,  Failures: 1,  Errors: 0'
    echo "Expected failure: GenericTieInUnitFirstByPlace's compile fails on the base at a pair whose tie keeps the String declaration, 'Function body has type String, but declared return type is ZZ32.', ..."
    old-fortress.sh ... junit .../GenericTieImportedAmbiguous.test .../GenericTieInUnitFirstByPlace.test
      '    Function body has type String, but declared return type is ZZ32.' 'File GenericTieInUnitFirstByPlace.fss has 6 errors.' 'Tests run: 4,  Failures: 4,  Errors: 0'
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh sk6 ProjectFortress/compiler_tests XXXGenericTieImportedAmbiguous.test GenericTieInUnitFirstByPlace.test ComprisesOwnParameterNarrowedReturn.test XXXGenericBesidePlainInvalidSetCallType.test GenericTiesDeclaredCompiled.test ComprisesSelfListedTypeCompiled.test
      ' Saw expected failure' ... '. run ProjectFortress/compiler_tests/GenericTieInUnitFirstByPlace (380ms) PASS' ... 'OK (14 tests)'

The first run of the api test echoed the wrong form ("'Expected failure or exception, saw none'"); the harness reported 'Saw wrong failure', which `tests-writing.md` gives for an `XXX` compile test whose program compiles; the call after echoed the right form, above. The first form of the unit test called each `f` under its return type's context, where the attempt with the context takes the `ZZ32` declaration alone, and passed on the base; the calls now bind `r = fK(x)` first, and the run above fails on the base.

### 4.2 Row 879, which the change repairs, is not in the record

Row 879 (CONTESTED): "the compiled checker reads `self` as `C[\X\] & X` in the signatures of a trait whose `comprises` clause lists its own type parameter ... Open: plain trait (P-146) or intersection." K1 answers it, and its probe's program changes:

    SelfCmpTieClause (explorations/perf-probes/self-type-idiom/REPORT.md, section 3.2)
      old compiled: 'the return type of ((PartOrd[\A\] & {A}), A)->Res @ SelfCmpTieClause.fss:7:3-8:1 should be a subtype of the' ... 'File SelfCmpTieClause.fss has 2 errors.'
      new compiled: compile rc=0, 'PASS'

Home 1: `compiler_tests/ComprisesOwnParameterNarrowedReturn` (`2fe64f262a`), the row closed in `record.md` with `--settled` naming fork K1.

    echo "Expected failure: ComprisesOwnParameterNarrowedReturn's compile fails on the base, 'the return type of ((PartOrd[\\A\\] & {A}), A)->Res ... should be a subtype of the return type of ((TotOrd[\\A\\] & {A}), A)->TRes', and its link and run fail with it"
    old-fortress.sh ... junit .../ComprisesOwnParameterNarrowedReturn.test
      'the return type of ((PartOrd[\A\] & {A}), A)->Res @ .../ComprisesOwnParameterNarrowedReturn.fss:14:5-15:1 should be a subtype of the' '    Function body has type Res, but declared return type is TRes.' 'Tests run: 3,  Failures: 3,  Errors: 0'
    junit.sh sk3 ... ComprisesOwnParameterNarrowedReturn.test: '. run ... (288ms) PASS', 'OK (3 tests)'

The link's JVM on the base gave the call's face of the same defect ('Function body has type Res'), the compile's the Return Type Rule's.

### 4.3 Row 1047, which the change repairs, is not in the record

Row 1047 (NEGATIVE-BOUNDED): the static type of a call of an invalid set of `g[\T\](x: T): T` beside `g(x: Circle): String` depends on what the JVM compiled before. Its two programs from `explorations/compile-ladder/rung-return-rule-object/REPORT.md`, "Defects":

    old: fortress junit LeakB.test: 'Right-hand side has type String, but declared type is Circle.'
    old: fortress junit LeakA.test LeakB.test: 'the return type of Circle->String @ LeakB.fss:7:1-32 should be a subtype of the'
    new: both: 'Right-hand side has type String, but declared type is Circle.'

Home 1: `compiler_tests/XXXGenericBesidePlainInvalidSetCallType` (`2fe64f262a`), twelve such sets, each call bound without a declared type; the row closed in `record.md`.

    echo "Expected failure: XXXGenericBesidePlainInvalidSetCallType.test is red on the base: some call takes the generic declaration, ... 'Saw wrong failure. compile'"
    old-fortress.sh ... junit .../XXXGenericBesidePlainInvalidSetCallType.test
      '    Right-hand side has type Circle, but declared type is String.' 'File GenericBesidePlainInvalidSetCallType.fss has 9 errors.' 'Tests run: 1,  Failures: 1,  Errors: 0'
    junit.sh sk5 ...: 'File GenericBesidePlainInvalidSetCallType.fss has 12 errors.' ' Saw expected failure' 'OK (1 test)'

The first form bound each call at `String`, under which the base too took the plain declaration and passed; corrected before the run above.

### 4.4 A sentence of Appendix I that the change makes false, left by the worker for the gather

`Specification/appendices/changes.tex:5538-5546` (`revival-numerals`, Effect): "\EXP{c = 0} compiles and overflows the stack when it runs". After the change `c = 0` is refused, 'Ambiguous coercion in call to operator =' (the worker's `XXXNumeralEqualsRR32Compiled`). Edited (`0b5f234096`), the line now `:5539-5550`: "...refuses \EXP{c \neq 0}, and refuses \EXP{c = 0} too, since the \EXP{=} of \TYP{Equality} and the one at \EXP{\mathbb{R}64} each apply to it only by coercion and neither is more specific, while \EXP{c = c} compiles and overflows the stack when it runs (...; the expected failure \nolinkurl{XXXNumeralEqualsRR32Compiled.fss}, which asserts \VAR{true}, and the expected failure \nolinkurl{ProjectFortress/library_tests/XXXRR32EqualityRungV.fss})". `c = c` overflowing is the worker's run of `library_tests/XXXRR32EqualityRungV` on the change ('java.lang.StackOverflowError', 'Saw expected failure (Exit code != 0)', 'OK (2 tests)'). The hunk sits about twenty lines below the nearest hunk of rungs G and N in base numbering (G's `@@ -5445,7`, N's `@@ -5435,8`; mine is at base line 5472).

### 4.5 Notes, not repaired

- The new ambiguity message prints each declared arrow without its static parameters: 'T->ZZ32; T->String' names two declarations that differ only in their bounds (section 4.1's output).
- `place` orders two files by their path's spelling, so between a library declaration and a program's own the order follows where the program lies; it is the same in every run of one layout, which K4 asks.
- The failure-mode question: the change turns no loud failure into a quiet value. Row 1046's crash becomes the declared answer; row 528's stack overflow at `c = 0` becomes a static refusal; row 770's refusal moves from the overloading check to the export check. The one quiet choice is 4.1's, which the base made too, by the JVM's hashes.

## 5. The reserved points, one program each on both codes

- A team test's pinned message: the team's `XXX7e.test` (`compile_err_equals`, `Compiled7.e`), with `XXXImportExceptOperator` and `XXXImportExplicitHidesOnDemand`. Head, `junit.sh sk7`: three 'Saw expected failure', 'OK (3 tests)'. Base, `old-fortress.sh ... junit`: the same message, 'There are multiple declarations of g with the same parameter type: ZZ32', with `XXX7e.test` red only because its expected text names `${FORTRESS_AUTOHOME}`, the base build's path, while the file is the worktree's ('Saw failure, but did not satisfy compile_err_equals'). No pinned message changes.
- A line of the libraries that the checker now refuses: the count stage on both codes (section 1), 0 and 0.
- A model line: none changed (`git diff --name-only b5a758846d...HEAD` names no file under `explorations/run-c4/` or `explorations/apl/`).

## 6. My programs, old against new

All at `FORTRESS_THREADS=1`; the change has no mutable state, field or atomic block, so no four-thread run.

| program | walk old | walk new | compiled old | compiled new |
|---|---|---|---|---|
| `SkSelfTwoArg` (`comprises { R }`: `combine(self, k)`, `flip(k, self)`, `+`, `join(self, self)` on `self`, each `R`'s at `R`) | 'PASS' | 'PASS' | 4 errors, 'Function body has type Q, but declared return type is R.' | 'twice  10' ... 'both  25', 'PASS' |
| `SkSelfDotted` (dotted `g()`, `h(k)` in `Q` and `R`, called on `self`) | 'PASS' | 'PASS' | 'viaSelf  105', 'PASS' | the same |
| `SkSelfTypedComprisesT` (`trait Mon[\T\] comprises T`, `Num`'s `twice` at `Num`) | 'PASS' | 'PASS' | 'Right-hand side has type Mon[\Num\], but declared type is Num.' | 'b  6  c  9', 'PASS' |
| `SkGenericDotted` (six objects' generic dotted pairs on a `Box`; the specification's `describe`) | 'PASS' | 'PASS' | 'n  6', 'circle   circle   generic', 'PASS' | the same |
| `SkCoverRunnableGeneric`, `...Right` (row 543's family with a generic declaration below `V` that may run) | 'PASS' | 'PASS' | 'Invalid overloading of choose' (row 546); the second 'Right-hand side has type LeftResult' | the same |
| `SkCoverMain` with the api `SkCoverFam` (the same family through an api) | 'PASS' | 'PASS' | 'Invalid overloading of choose in API SkCoverFam' | the same |
| `SkTieExcl`, `SkTieExclMain` (ground pair at excluding traits, one unit and through an api) | 'PASS' | 'PASS' | 'PASS' | 'PASS' |
| `SkTieGenExcl`, `SkTieGenExclMain` | 'PASS' | 'PASS' | 'PASS', 'PASS' | 'PASS'; 'Ambiguous call to function f' (4.1) |
| `SelfCmpTieClause` (row 879) | not run | not run | 2 errors (4.2) | 'PASS' |

In two JVM hash modes, `JAVA_FLAGS` with `-XX:+UnlockExperimentalVMOptions -XX:hashCode=0` and `=2`, private caches each: `GenericTiesDeclaredCompiled` old 'FAIL:  5 =/= 12' and 'FAIL:  0 =/= 12', new 'PASS' in both; `OverloadGenericObjectTwoParams` old 'V is not in the kind env [][][]' in both, new 'PASS'; `ComprisesSelfAbstractFunctionalMethodCall` 'PASS' on both codes in both modes; `SkSelfTwoArg` and `SkGenericDotted` as in the table.

## 7. Homes, the ledger and the sibling sites

The worker's homes stand (REPORT.md, "Defects and their homes"). Mine: 4.1 home 3 (`GenericTieInUnitFirstByPlace`, 1136) with the error's own test `XXXGenericTieImportedAmbiguous`; 4.2 and 4.3 home 1. `ledger.py find` on "tie", "hash* order", "comprises self", "most specific" and `--cites` the three edited source files found rows 879 and 1047 beside the worker's; rows 1071 (a getter on `self`, the body's meet), 1113 (a getter's `min`), 391 (coercion) and 547, read and not run, I found no reason to think changed. The worker's four rewritten rows pass `ledger.py check --rows`; 1136 passes it but for its number cell.

The report's provenance lines open to what they claim (`REPAIR-gate.md:41-51`, `overloading.tex:353-372`, `var-ref.tex:53-54`, `FunctionalMethod.java:153-166` and `CodeGen.java:8255` at b5a758846d, `CoercionOracle.scala:85-88`). No new name competes with another in `ProjectFortress/compiler_tests/`, `ProjectFortress/tests/` or `ProjectFortress/src/com/sun/fortress/`.

## 8. Where I differ from the worker

- Decision 3 (K3's exception): the comment at `Functionals.scala:1170-1174` calls the unit's sets those that "break its rules"; a set of the unit that the overloading check accepts reaches the same branch (4.1).
- "Each sentence of the specification that the change makes false": one was left for the gather; I edited it (4.4).

## 9. Verdict

Approved. The change does what the section asks, with its tests failing on the base and passing after, its stages at 0 and its time unchanged in order; my commits are corrections and tests, none contested. Section 4.1 is new evidence for the worker's question on K3's exception, recorded, not decided.

<!-- Climb batch 25's gather record: the rungs D, P, A, R, U, N and C applied on main in that order, their commits, the rows opened and closed, the merged tree's tests, the points to report, the items for the curator and where each is in PLAN.md, and each rung's revival change for the skill writer. -->

# Climb batch 25: the gather's record

Written at the gather stage of climb batch 25 (2026-11-03), the batch of `explorations/coordinator/CLIMB-BATCH-25.md`, phase 4's third batch, the natives' N3 families (P-58) with three walls of the code generator, on `main` from the base `97a416b18c9fb39adfe90d396380b49b146c49b6`.

**Preconditions.** `git status --porcelain` printed nothing, and `97a416b18` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0; `HEAD` was the base itself).

**Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff 97a416b18c9fb39adfe90d396380b49b146c49b6...<branch>`. Each patch was applied on `main` with `git apply --3way --index`, its record folded and its commit made before the next.

## The landed commits

| Order | Rung | Branch | Commit on `main` |
|---|---|---|---|
| 1 | D, `rung-natives-float-bits` | `wip/rung-natives-float-bits` at `52a9162c9` | `17b9f6b58` |
| 2 | P, `rung-natives-rr32` | `wip/rung-natives-rr32` at `94471d86d` | `43f130022` |
| 3 | A, `rung-natives-asfloat` | `wip/rung-natives-asfloat` at `83514cd98` | `d2501afef` |
| 4 | R, `rung-natives-remainders` | `wip/rung-natives-remainders` at `67d09b547` | `41830b90c` |
| 5 | U, `rung-natives-unsigned` | `wip/rung-natives-unsigned` at `0e8d36f7a` | `f7a33b97b` |
| 6 | N, `rung-natives-divisors` | `wip/rung-natives-divisors` at `8676dd4f4` | `d85bac271` |
| 7 | C, `rung-codegen-walls` | `wip/rung-codegen-walls` at `5d4d9a8ef` | `8833d89c5` |
| | the rows' closes | | `b1149e218` |

## The order the rungs were applied in

D, P, A, R, U, N, C, the manifest's order.
- No rung lands only with another (`landsOnlyWith` empty for all seven), so the first rule orders nothing.
- The lowest edited line of each shared file, read from `git diff -U0 97a416b18...<branch>` (the base side of its first hunk): `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, D `:61`, P `:210`, A `:241`, R `:441`, N `:445`, U `:449`; `Library/FortressLibrary.fss`, R `:781`, N `:785`, U `:937`, D `:4535`; `simpleLongArith.java`, A `:26`, R `:83`, N `:351`; `simpleArbitraryPrecisionArith.java`, A `:29`, R `:46`, N `:128`; `simpleIntArith.java`, R `:83`, N `:414`; `simpleUnsignedIntArith.java`, R `:66`, N `:232`; `simpleUnsignedLongArith.java`, U `:24`, R `:79`, N `:230`; `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss`, new in D and in P.
- Three pairs are ordered both ways by two shared files, so each keeps the manifest's order: D and R, D and U, D and N (D first in `FortressBuiltin.fss`, last in `FortressLibrary.fss`); R and U (R first in the two library files, U first in `simpleUnsignedLongArith.java`); U and N (N first in the two library files, U first in `simpleUnsignedLongArith.java`). Every other pair orders the manifest's way (P before A in `FortressBuiltin.fss`; A before R and N in the two Java files; R before N in every file), and C shares no file. So the order is the manifest's.
- The later rungs' cited lines that an earlier hunk moved are re-anchored by symbol where the gather folded them: A's five lines at the top of `simpleLongArith.java` and `simpleArbitraryPrecisionArith.java`, R's eleven or twelve lines in the five helper classes and U's seven in `simpleUnsignedLongArith.java` moved F-305's citations (now `simpleIntArith.java:174-175`, `:222-225`, `simpleLongArith.java:153-154`, `:200-203`), row 856's (now `simpleUnsignedIntArith.java:242`, `simpleUnsignedLongArith.java:246`) and N's row 887 (`simpleArbitraryPrecisionArith.java:164-177`, `simpleIntArith.java:218`). The library files' hunks replace one line with one, so no library line moved. The rungs' REPORT.md and SKEPTIC.md keep the lines of their own branches.

## Conflicts

One: rung P's `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss`, new in both D and P ('Applied patch to ... with conflicts.', `AA`). Both files are reproducers of one defect, asserting today's values; they do not change the same logic of code. Resolved by hand from both sides: P's file (`RR32` and `RR64`) with D's two assertions that `nextUp` of `-0.0` is not above it and `nextDown` of `0.0` not below it, and a header naming both types. It passes on the merged tree (below). The two rungs' rows for the defect, NEW-D-1 and NEW-P-1, became one row, 880, its claim widened to `RR32` in P's commit.

## The tests on the merged tree

In the main tree at `8833d89c5`, after `ant compileAll` ('BUILD SUCCESSFUL', the caches started again) and the library order (five compiles, rc=0, the five jars):
- `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/gather/h1` on the five remainder tests, the merged reproducer and rung C's three walk guards:
  `# harness-one 2026-11-03T02:51:07Z; tree 8833d89c5; nproc=4; load 1.08 0.42 0.53; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty`
  `OK (9 tests)`
- `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh gather ProjectFortress/compiler_tests` on `ExtendsGenericAtAnyCompiled`, `ForbidClauseCompiled`, `TestModifierCompiled`, `NN64WrappingNegationHelperCompiled` and its link, `UnsignedLongToStringHelperCompiled` and its link, `UnsignedPrintingCompiled` and its link and `NativeHelperFamilyUnsignedCompiled`:
  `# junit.sh gather 2026-11-03T02:51:54Z; nproc 4; ... tree 8833d89c5`
  `. run ProjectFortress/compiler_tests/ExtendsGenericAtAnyCompiled (315ms) PASS`; `. run ProjectFortress/compiler_tests/ForbidClauseCompiled (451ms) PASS`
  `OK (17 tests)`
- `explorations/coordinator/tools/distance/run.sh tmp/gather/distance.txt tmp/gather/dist`, row 873's check: '#total 0', '#crash none', '#seconds 222 FortressLibrary 165'; `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-24/gate/distance.txt tmp/gather/distance.txt`: 'DISTANCE SAME   0'.
- `bash tmp/run-demos.sh tmp/gather/demos`, the demo driver as `compile-ladder/rung-team-demos/REPORT.md`, "Commands worked out", gives it, from about 02:52Z to 03:23:13Z, `FORTRESS_THREADS=1`, nproc 4, beside the distance stage for its first minutes:
  `demos: 52 run, 52 reached their end`
  Among them `BiCGSTAB` ('elapsed time 78568207904 ns ( 78.568207904 s)'), `npbft` ('  Checksum 1 : 570.4182371381474+385.43365014877793i') and `trips` ('{[trip 3 4 5],[trip 5 12 13],[trip 7 24 25],...').
- The specification, built once on `main`'s text after the last edit under `Specification/` (`d85bac271`): `cd Specification/fortress && ./ant genSource && ./ant tex`, 'BUILD SUCCESSFUL' twice ('Total time: 51 seconds', 'Total time: 58 seconds'); the count of reference, label and undefined-control-sequence warnings in `fortress.log` printed 0; the PDF copied to `/home/user/fortress/tmp/gather/fortress-batch-25.pdf` (its text holds '288 of the 449').
- Each closing test passed there, as its rung last ran it. The suites, the count stage and `ant testSpecData` are the gate's.

### Text mismatches

None. No rung edits a sentence of `Specification/`; the gather's one rewrite of the Appendix I Effect (in rung N's commit) states what the merged code does: 288 of 449 bindings name a helper (`git grep -h -o 'builtinPrimitive("com.sun.fortress.nativeHelpers' -- Library ProjectFortress/LibraryBuiltin | wc -l` prints 288), with the list counted per declaring type (`NN64` 25, `NN32` 28, `UnsignedLong` 3, `Char` 40, `Float` 57, `RR32` 50); `REM` and `MOD` by zero throw `DivisionByZero`; an argument declared `UnsignedLong` takes the `NN64` transfer.

## Rows opened

| Row | Rung | Claim |
|---|---|---|
| 880 | D, widened by P (NEW-D-1, NEW-P-1) | `nextUp` of `-0.0` is `0.0` and `nextDown` of `0.0` is `-0.0` on `Float` and `RR32`, where IEEE 754-2008's nextUp gives the smallest signed subnormal; `CONTESTED` |
| 881 | R's skeptic (NEW-R-1) | `DIVREM` and `DIVMOD` are declared by neither library |
| 882 | U (NEW-U-1) | the natives' rewrite is switched by one static flag, so `fortress parse` and `fortress api` rewrite only after a compile in the same JVM |
| 883 | U (NEW-U-2) | a component that names a helper is parsed whole four times for one compile |
| 884 | U (NEW-U-3) | a helper string in a component that imports a grammar is not rewritten |
| 885 | U (NEW-U-4) | a binding over `NN32`, `NN64` or `Char` to a helper overloaded at one arity gets no transfer; `CONTESTED` |
| 886 | U, extended by its skeptic (NEW-U-5) | the rewrite reads a declared type by its simple name, so a program's own `Char` or `UnsignedLong` takes the library's transfer |
| 887 | N (NEW-N-1) | `ZZ`'s `CHOOSE` answers 1 where the zero rule gives 0, at `k < 0` or `k > n` |
| 888 | C (NEW-C-1) | a compiled `try` nested in another is matched against the outer `catch` first |
| 889 | C (NEW-C-2) | the code generator crashes on a tuple static argument holding `Any` in an `extends` clause |
| 890 | C's skeptic (NEW-C-3) | a compiled `finally` clause does not run when an exception leaves the `try` block |
| 891 | C's skeptic (NEW-C-4) | a compiled `try` with only a `finally` clause fails verification |
| 892 | C's skeptic (NEW-C-5) | neither path refuses a non-test's call of a test |

Rows rewritten: 454 and 529 (a note each, cut to fit: P, A), 856 (re-anchored: R, U), 865 and 866 (their `XXX` tests: U), 650 and 624 (C), 880 (P). Notes: row 75 (N).

## Rows closed

In `b1149e218`, each after its test passed on the merged tree: 336 and 848 by `41830b90c` (R), tests `ZZ64RemainderByZeroWalk` and `NN32RemainderByZeroWalk`; 326, 860 and 873 by `f7a33b97b` (U), tests `UnsignedPrintingCompiled`, `NN64WrappingNegationHelperCompiled` and the distance stage; 820, 821 and 823 by `8833d89c5` (C), tests `ExtendsGenericAtAnyCompiled`, `ForbidClauseCompiled` and `TestModifierCompiled`. `python3 explorations/coordinator/tools/ledger.py landing-check 97a416b18c9fb39adfe90d396380b49b146c49b6` then printed 'ledger.py landing-check: 97a416b18..HEAD: no finding'.

## Each rung

- **D** (`17b9f6b58`): F-303 rewritten, F-32 and F-299 counted; row 880. Skeptic's fix `b7211ab2b`: 28 assertions added to each guard (the directed roundings at -0.0, -infinity, 0.0, a large value, the smallest subnormal and the negative underflows), and REPORT.md's counts and a citation. No contested ruling.
- **P** (`43f130022`): F-310 added; F-32, F-299 counted; row 454 rewritten with its note; row 880 widened; `CLIMB-BATCH-25.md:29`, `:147`, `:459` say 46 helpers for the 49 bindings. No skeptic fix, no ruling.
- **A** (`d2501afef`): F-311 added; F-32, F-299, F-308 and F-310 corrected; row 529 rewritten with its note; `PLAN.md:52` no longer lists the `asFloat`s as waiting. Skeptic's fix `0be1ccdbd`: REPORT.md's "Competing declarations" said four classes hold static `toDouble` methods; they call `com.naturalbridge.misc.Unsigned.toDouble`. No ruling.
- **R** (`41830b90c`): F-312 added; F-24, F-32, F-299, F-305, F-306 and F-308 corrected; row 856 re-anchored; row 881; `CLIMB-BATCH-25.md:212` corrected (its leftForGather). Skeptic's fix `1a9bc9707`: DIVREM and DIVMOD, which REPORT.md said the library writes in Fortress, are declared by neither library; `XXXDivRemDivModWalk` and row 881. No ruling.
- **U** (`f7a33b97b`): F-313 added; F-32, F-298, F-299 and F-308 corrected; rows 865 and 866 rewritten, 856 re-anchored; rows 882 to 886; `PLAN.md:52`'s waiting families cut to `Char`'s `asExprString`. Skeptic's fix `6c3daa011`: row 886 (NEW-U-5) reaches a program's own `UnsignedLong`, `XXXNativeHelperOwnUnsignedLongCompiled.test`. No ruling.
- **N** (`d85bac271`): F-314 added; F-32, F-125, F-299, F-305 (its `NN32` `CHOOSE` sentence, rung U's), F-306 and F-308 corrected; row 75 noted; row 887; the Appendix I Effect rewritten once for the batch. No skeptic fix, no ruling.
- **C** (`8833d89c5`): F-315 added; F-34 and F-268 rewritten; rows 650 and 624 rewritten; rows 888 to 892. Skeptic's fixes `33cf2e541` (comment lines of the tests, `tests.tex` cited as a chapter, a provenance line), `6678a80d0` (rows 890 and 891, the `finally` clause skipped and the `try` with only `finally`), `6555d011d` (row 892). No ruling.

## Files written from the journal

None. Every branch carried its REPORT.md, record.md and SKEPTIC.md, and no rung had a repair round.

## The rungs that did not land

None: all seven were approved and landed.

## Handover lines

- **D** (`rung-natives-float-bits`, `17b9f6b58`): Climb batch 25, rung D, `Float`'s bit and rounding operations: `Float`'s 27 bit, neighbour, narrowing, inequality, `MIN`, `MAX` and directed-rounding bindings and the top-level `fromRawBits` name 28 new one-line `simpleDoubleArith` helpers, the planner's sample taken without its source comment; no walk value moves (458 printed results, the guards, 26 of 26 mutants caught), the count and the distance 0, `ant testQuick` and `ant testSystem` with no failure (725 walk tests); new row 880 (`nextUp` of `-0.0` is `0.0`, `CONTESTED`, for the curator). Next for `Float`: the five bindings that wait on item 331.
- **P** (`rung-natives-rr32`, `43f130022`): Climb batch 25 rung P: value object `RR32`'s 49 bindings name 46 new helpers of a new class, `simpleFloatArith`, each computing as the glue class does; walk's values unchanged (539 printed results equal; the walk guard green on both codes); the compiled guard red on the base, green after; the count and the distance 0, equal to climb batch 24's, the distance's zero shown a check by a one-line control; its defect, `nextUp` at a signed zero, folded into row 880 (rung D's, widened to `RR32`), contested.
- **A** (`rung-natives-asfloat`, `d2501afef`): Climb batch 25's rung A declared the `asFloat`s of `Int`, `RR32`, `NN32`, `Long` and `BigNum` at `RR64`, the type of `Number`'s abstract `asFloat`, and moved them onto helpers, two of them new (`longToDouble`, `toDouble`): 178 of 449 bindings name a helper on its tree, walk's values unchanged, the count and the distance 0.
- **R** (`rung-natives-remainders`, `41830b90c`): Rung R: `REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` name ten new helpers that raise `DivisionByZero` at a zero divisor and keep every other value (626 pairs); rows 336 and 848 closed by `ZZ64RemainderByZeroWalk` and `NN32RemainderByZeroWalk`; 183 of 449 bindings name a helper on its tree; the count and the distance 0.
- **U** (`rung-natives-unsigned`, `f7a33b97b`): Climb batch 25's rung U fixed the compiled path's unsigned printing and the `NN64` wraparound negation helper (rows 326, 860), gave `UnsignedLong`'s `self` the `NN64` transfer (row 873), moved five more bindings onto helpers (178 of 449 on its tree), wrote row 865's and row 866's `XXX` tests, and probed the rewrite's seven limits: five show (rows 882 to 886), none reached by the library.
- **N** (`rung-natives-divisors`, `d85bac271`): Climb batch 25's rung N on `wip/rung-natives-divisors` (`dcc1ee79b`): the 18 integer-divisor and `nanoTime` bindings name new helpers, 8840 walk values unchanged, both guards green (the compiled one red on the base), the count and distance stages 0 and 0, `ant testQuick` 1381/263/86 and `ant testSystem` 725 with no failure; `ZZ`'s `CHOOSE` at `k < 0` or `k > n` stays 1 (row 887, its `XXX` test), a one-line repair for a later rung.
- **C** (`rung-codegen-walls`, `8833d89c5`): Climb batch 25, rung C (`rung-codegen-walls`), on `wip/rung-codegen-walls` at `bc72d9dec`: the code generator compiles a trait or object extending a generic trait at `Any`, a `try` with a `forbid` clause (a `ForbiddenException` chained to the exception, by the library's constructor) and a function declared `test`; rows 820, 821 and 823 close with `ExtendsGenericAtAnyCompiled`, `ForbidClauseCompiled` and `TestModifierCompiled`, each with its walk guard; under the planner's control the library's refusals fall from 50 to 47 and its kinds from 14 to 11, `stringifyChars` now at a varargs call (row 624); four defects met and recorded by `XXX` tests, a nested `try` matched outer first (row 888), a tuple holding `Any` in an `extends` clause (row 889), a `finally` clause skipped when an exception leaves the `try`, the new `forbid` path among them (row 890), and a `try` with only a `finally` clause failing verification (row 891); a non-test's call of a test, a static error by the tests chapter's note, refused by neither path (row 892); no checker code changed, neither stage run (fork 13), the tracks left to the gate.

## Points to report

None holds the push; each is reversible and landed.
- **D**: `sample-D.patch` taken by `git apply`, its five helpers and strings kept, its source comment naming the planner dropped, the other 23 in its form; all 28 moved, `Float`'s other five left by the brief (item 331) (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:136-246`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:61-153`; `Library/FortressLibrary.fss:4535`). The walk guard passes on the base and after; the compiled guard is refused on the base ('builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleIsNaN') and passes after. The count and the distance 0, 'DISTANCE SAME   0', 157 s; no walk value moves (458 results), no verdict changes (`ant testQuick` 1381/86/263, `ant testSystem` 725, 0 failures). Defect: row 880. Sentences made false: the Effect, F-32, F-299, F-303 (folded).
- **P**: `sample-P.patch` applied, its header comment replaced; all 49 moved; `RR32`'s `asFloat` and `^` at `Float` left to other rungs and item 331 (`simpleFloatArith.java:1-9`; `FortressBuiltin.fss:210-342`). Walk guard green on both; compiled guard red on the base ('Tests run: 2,  Failures: 2') and green after. The count and the distance 0, 152 s, a one-line control showing the stage checks `RR32`'s bindings. No walk value moves (539 results), `ant testSystem` 725, 0 failures. Defect: row 880. A file beyond those named: `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss`. Sentences made false: the Effect, F-32, F-299 (folded), `explorations/perf-probes/prelude/natives-shape.md:80` (a dated probe's sizing, left), `CLIMB-BATCH-25.md:29`, `:147` (corrected).
- **A**: `rung-A.patch`'s library text taken as is, five headers from `Float` to `RR64` and five strings; the Java helpers' comments reworded, `longToDouble` above the section comment (`FortressBuiltin.fss:241`, `:374`, `:383`, `:396`, `:570`; `simpleLongArith.java:27-30` and `simpleArbitraryPrecisionArith.java:30-33` on its branch). Walk guard passes on both; compiled guard fails on the base ('...simpleLongArith.longToDouble') and passes after. The count and the distance 0, about 162 s. No value moves, `ant testQuick` 1381 and `ant testSystem` 724, 0 failures. Sentences made false: the Effect, F-32, F-299, F-308, `PLAN.md:52` (folded).
- **R**: `rung-R.patch` taken, its five comments rewritten from provenance to semantics; ten strings moved (`Library/FortressLibrary.fss:780-783`, `:873-876`, `:956-959`, `:1053-1056`; `FortressBuiltin.fss:440-443`). Harness on the base 'Tests run: 6,  Failures: 5' (the walk guard OK), after 'OK (6 tests)'; compiled guard refused on the base ('...simpleIntArith.intRem'), 'OK (2 tests)' after. The count and the distance 0, 151 s. No walk value moves but the remainders by zero (626 pairs). A file beyond those named: none, the skeptic's `XXXDivRemDivModWalk.fss` in a named folder. Sentences made false: the Effect, rows 336 and 848, F-24, F-32, F-299, F-306, F-308, F-305's lines, `CLIMB-BATCH-25.md:212` (all folded or closed).
- **U**: `rung-U.patch` taken as is (`simpleUnsignedLongArith.java`, `FNN32.java:19-20`, `FNN64.java:20`, `BuiltinPrimitiveRewriter.java:189-190`, `FortressBuiltin.fss:449`, `:479-483`, `Library/FortressLibrary.fss:937`). junit.sh on the base 'Tests run: 14,  Failures: 6', after 'OK (14 tests)'; walk guard 'OK (1 test)' on the base, 'OK (3 tests)' after. The count and the distance 0, 167 s, no site. `ant testQuick` 1393, the one verdict changed the promoted `NN64WrappingNegationHelperCompiled`; `ant testSystem` 724, none changed. A compiled value that moves beyond the rows' fixes: the compiler prelude's `NN64` prefix `BOXMINUS` now wraps, 'BOXMINUS 1: 1' then 'BOXMINUS 1: 18446744073709551615' (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:832`); no compiled test asserts it. The rewrite's seven limits probed, five as rows 882 to 886. Row 866's run test checks `run_out_contains=REACHED`, not the brief's `run_out_does_not_contain=REACHED` (`ProjectFortress/compiler_tests/XXXObjectExtendsZZ32Compiled.test:3`), since the run dies after its first line. Sentences made false: the Effect (folded), rows 326 and 860 (closed), F-32, F-299, F-308 (folded), `.claude/skills/fortress-repo/references/compiler.md:86` (left for the skill writer). No file beyond those named.
- **N**: `sample-N.patch` applied, its five strings taken, its helper text changed to one unsigned Euclid, since the sample's signed Euclid gives -2 at `ZZ64` MIN `GCD` 6 where the glue gives 2 (`simpleUnsignedLongArith.java:233-240` on its branch; `tests/NativeHelperFamilyDivisorsWalk.fss:112-113`); all 18 moved. Walk guard green on the base and after; compiled guard red on the base ('...simpleIntArith.intGcd') and green after. The count and the distance 0, 197 s and 253 s. No walk value moves (8840 and 9851 results), no verdict changes. No `CHOOSE` helper keeps state, so no parallel test. Defect: row 887. Sentences made false: the Effect, F-32 (its count and `nanoTime` sentence), F-299, F-306, F-308, F-125, F-305's `NN32` sentence (folded); the skill's `references/interpreter.md:89` and `references/library.md:56` (left for the skill writer).
- **C**: methods changed, `forTry`, `generateTypeReference`'s `AnyType` branch, `fnDeclCompilableModifiers` and the new `throwForbiddenException` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2019-2087`, `:2089-2122`, `:2947-2949`, `:5845-5851`). junit.sh on the base 'Tests run: 6,  Failures: 6', after 'OK (9 tests)'; walk guards 'OK (3 tests)' and 'OK (4 tests)'. The compiler track not run (the gate's); 23 neighbouring `.test` files kept their verdicts ('OK (36 tests)'). Sentences made false: F-268, F-34, rows 820, 821, 823 and 650 (folded or closed), `.claude/skills/fortress-repo/references/compiler.md:44` (left for the skill writer). No file beyond the named folders.

## Items for the curator, and where each is in `PLAN.md`

All are under "Off the path, parked", in the new group "Climb batch 25, listed for his review"; none asks for an answer before work on the path can go on.
- D.worker.1, D.skeptic.2, P.worker.2 and P.skeptic.1's second question (row 880): one entry, "D.worker.1 and D.skeptic.2 of climb batch 25's rung D, with P.worker.2 ..." (`PLAN.md:669`).
- D.skeptic.1: "D.skeptic.1 of climb batch 25's rung D: the batch spells its square-root roundings two ways ..." (`PLAN.md:670`).
- P.worker.1 and P.skeptic.1's first question: "P.worker.1 and the first question of P.skeptic.1 ..." (`PLAN.md:671`).
- U.worker.1 and U.skeptic.1 (row 885): "U.worker.1 and U.skeptic.1 of climb batch 25's rung U ..." (`PLAN.md:672`).
- N.worker.1 (row 887): "N.worker.1 of climb batch 25's rung N ..." (`PLAN.md:673`).
- C.worker.1 and C.skeptic.2: "C.worker.1 and C.skeptic.2 of climb batch 25's rung C (its D6) ..." (`PLAN.md:674`).
- C.skeptic.1 (row 890): "C.skeptic.1 of climb batch 25's rung C (row 890) ..." (`PLAN.md:675`).
- C.worker.2 and C.skeptic.3: "C.worker.2 and C.skeptic.3 of climb batch 25's rung C, a step refused ..." (`PLAN.md:676`).
- gather.1: "gather.1 of climb batch 25, told, not asked: rungs D and P met one defect ..." (`PLAN.md:677`).
- gather.2: "gather.2 of climb batch 25, told, not asked: four sentences of the `fortress-repo` skill are false ..." (`PLAN.md:678`).

## Left for the coordinator and the skill writer

- gather.1 (`PLAN.md:677`): the batch's two `nextUp` rows were one defect; the gather made them one row, 880, and the two reproducers of one file name one file (`ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss:1-22`; `explorations/fortress-gap-ledger.md`, row 880).
- gather.2 (`PLAN.md:678`): the skill's sentences made false, which the batch does not write: `.claude/skills/fortress-repo/references/compiler.md:44` (the modifier guard now admits `test`, C), `:86` (`self` of `UnsignedLong` takes a transfer, U), `references/interpreter.md:89` and `references/library.md:56` ("Most" bindings name glue classes: 161 of 449 now do, N).
- `explorations/perf-probes/prelude/natives-shape.md:80`, a dated probe's sizing ("`RR32` 50 (no float helper exists but `floatToDouble`)"), is left as measured.
- The handover lines are in this file only; the per-rung commits carry no handover file, since this record is written once, last.

## Revival changes, for the skill writer

Each landed rung's "Revival change" section, both its parts word for word, or its line "Revival change: none" with the reason, in the order the rungs landed, with the rows' numbers in place of the placeholders.

### D (`rung-natives-float-bits`, `17b9f6b58`)

Revival change: none. The rung moves 28 more bindings onto the binding form already in the record (P-58; Appendix I, "A native binding that names a static helper"), and every value under walk stays the glue classes' (the value program, `diff` empty; both guards; the mutant sweep); the new helpers call the team's own `DirectedRounding` and Java's `Double` and `Math`, as the glue classes do. No team source's behaviour changes.

### P (`rung-natives-rr32`, `43f130022`)

Revival change: none. The rung moves 49 more bindings onto the binding form that climb batch 23 recorded (P-58; Appendix I, "A native binding that names a static helper"), each helper computing as the team's glue class `RR32` does, and every value under walk stays the glue class's (the 539 printed results, equal on the old code and the new; the guards). The class `simpleFloatArith` is the revival's, not a team source, and no team source's behaviour changes; the `nextUp` at a signed zero that row 880 records is the team's own `DirectedRounding`, kept as it was.

### A (`rung-natives-asfloat`, `d2501afef`)

#### The change

The team's library declared `asFloat(self): RR64` on the numbers' trait (`git show a874948ac:Library/FortressLibrary.fss`, `:355`), and in walk's value objects `Int`, `Long`, `NN32`, `RR32` and `BigNum` declared it `asFloat(self): Float`, walk's float object, bound to the glue classes `Int$AsFloat`, `Long$AsFloat`, `NN32$AsFloat`, `RR32$AsFloat` and `BigNum$AsFloat` (`git show a874948ac:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `:238`, `:374`, `:383`, `:395`, `:533`). The tree now declares these five `asFloat(self): RR64` and binds them to static helpers that both paths call, `simpleIntArith.intToDouble`, `simpleLongArith.longToDouble`, `simpleUnsignedIntArith.unsignedIntToDouble`, `simpleDoubleArith.floatToDouble` and `simpleArbitraryPrecisionArith.toDouble` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:241`, `:374`, `:383`, `:396`, `:570`); under walk each still answers the same `Float` object at the same value (`ProjectFortress/tests/NativeHelperFamilyAsFloatWalk.fss`), and on the compiled path the helpers answer those values (`ProjectFortress/compiler_tests/NativeHelperFamilyAsFloatCompiled.test`). The reason: the library's api declares `abstract asFloat(self): RR64` on `Number`, "the explicit conversion into %RR64%" (`Library/FortressLibrary.fsi:290-291`), as the specification's text does (`Specification/basic-lib/numbers.tex:47-49`); no Java type is read by the checker as `Float`, so a helper answers `RR64`, and with the declaration at `Float` the checker refuses the binding: 'Function body has type RR64, but declared return type is Float.' at `FortressBuiltin.fss:375`.

#### Provenance

Climb batch 23's fork 12, which left the declared type open with two ways named; P-58; climb batch 25's fork 3 at its default, the declaration at `RR64` (`explorations/coordinator/CLIMB-BATCH-25.md`, "Forks the batch takes, none consequential"); climb batch 25, rung A.

### R (`rung-natives-remainders`, `41830b90c`)

#### The change

The team's walk ended the run with a Java `ArithmeticException`, which no Fortress `catch` sees, at a zero divisor of `REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`: its bindings named glue classes (`git show a874948ac:Library/FortressLibrary.fss`, `:668-671`, `:736-739`, `:790-793`, `:861-864`; `git show a874948ac:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `:418-421`) that divide with no zero test, as `Int$Rem`'s `return x % y;` (`git show a874948ac:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java`, `:124-128`) and `BigNum$Rem`'s `return x.remainder(y);` (`git show a874948ac:ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java`, `:161-165`). The team's compiled prelude raised `DivisionByZero` there, since it writes `REM` over `DIV` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:601`, `:686`). The tree now throws `DivisionByZero` under walk too, and on the compiled path through the same helpers, and gives every other remainder the value the team's walk gave: `ProjectFortress/tests/ZZ32RemainderByZeroWalk.fss`, `ZZ64RemainderByZeroWalk.fss`, `NN32RemainderByZeroWalk.fss`, `NN64RemainderByZeroWalk.fss`, `ZZRemainderByZeroWalk.fss`, `NativeHelperFamilyRemainderWalk.fss`, and `ProjectFortress/compiler_tests/NativeHelperFamilyRemainderCompiled.fss`. The reason: the specification's "For integer results, division by zero throws a \TYP{DivisionByZero}." (`Specification/basic/operators/opr-overview.tex:165`), and the measured failure of the team's glue classes on the tree before the change, 'Caused by: java.lang.ArithmeticException: / by zero' ('BigInteger divide by zero' for `ZZ`) for each of the five tests through the harness.

#### Provenance

Rows 336 and 848, how `REM` and `MOD` by zero behave under walk; P-58, each binding names a static helper; the default of the batch's fork 4, helpers that raise `DivisionByZero` and compute every other value as the glue classes do, over a zero test in each glue class; climb batch 25, rung R.

### U (`rung-natives-unsigned`, `f7a33b97b`)

#### The change

The team's compiled path printed an `NN32` or `NN64` at or above its signed half as a negative number: `FNN32`'s `toString` and `asString` were `String.valueOf` of the `int` (`git show a874948ac:ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FNN32.java`, `:19-20`), `FNN64`'s `toString` `"" + val` (`FNN64.java`, `:20`), and `simpleUnsignedLongArith.unsignedLongToString`, which its prelude's `NN64` `asString` calls, `Long.toString` (`simpleUnsignedLongArith.java`, `:23-25`, at `a874948ac`); so a compiled `n: NN32 = 4294967295` printed -1. Its `unsignedLongWrappingNeg` answered its operand (`:106-108`, at `a874948ac`), so its prelude's `NN64` prefix `BOXMINUS` was the identity. The tree prints the unsigned value (`ProjectFortress/compiler_tests/UnsignedPrintingCompiled`, `UnsignedLongToStringHelperCompiled`) and negates by wrapping (`compiler_tests/NN64WrappingNegationHelperCompiled`). The reason: an `NN32` or `NN64` is an integer of unsigned binary form (`Specification/basic-lib/basic-integers.tex:29-31`), so -1 names none; walk prints and negates so (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/UnsignedLong.java:251-255`, `:365-369`); the team's own prelude masks its `NN32` getter (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:759`), and the wraparound subtraction of `Specification/basic/operators/opr-overview.tex`, "Addition and Subtraction Operators", gives the negation of x as 0 minus x, wrapped. The team's library declared `UnsignedLong`'s `asFloat` at walk's `Float` (`git show a874948ac:ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `:457`); the tree declares it at `RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:482`), under walk the same `Float` value (`tests/NativeHelperFamilyUnsignedWalk`), since the checker refuses the helper's `double` at `Float` ('Function body has type RR64, but declared return type is Float.') and the one library's `Number` declares `abstract asFloat(self): RR64` (`Library/FortressLibrary.fsi:290-291`; `Specification/basic-lib/numbers.tex:47-50`).

#### Provenance

Rows 326 and 860 of the gap ledger, P-58, and climb batch 25's forks 3, 5 and 6 at their defaults (`explorations/coordinator/CLIMB-BATCH-25.md`, "Forks the batch takes, none consequential"); climb batch 25, rung U.

### N (`rung-natives-divisors`, `d85bac271`)

Revival change: none. Each of the 18 bindings keeps its declaration and the value the team's walk computed (8840 printed results equal on the old code and the new); only its string names a helper of `nativeHelpers/` in place of a glue class, the change P-58 already describes for the earlier batches' bindings.

### C (`rung-codegen-walls`, `8833d89c5`)

#### The change

The team's code generator refuses three constructs that the checker passes: an `extends` entry that gives a generic trait the static argument `Any`, whose branch in `generateTypeReference` is empty and falls to 'Only handling some static args of generic types in extends clause' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5753-5760` at the team's last commit `a874948ac`); a `try` with a `forbid` clause, on which `forTry` throws 'NYI: Forbid clauses are not yet implemented' (`:2013-2014` there); and a function declared `test`, which the modifier guard `fnDeclCompilableModifiers` leaves out, so `forFnDecl` stops with 'Don't know how to compile this kind of FnDecl.' (`:2866-2868` there). What the tree now does: it compiles all three; the `forbid` clause throws on, as a `ForbiddenException` whose `chain` is that exception, an exception of a listed type that no catch clause took, and lets one of no listed type pass on; a `test` function compiles as the function it is, and what `fortress test` runs is unchanged (`ProjectFortress/compiler_tests/ExtendsGenericAtAnyCompiled.fss`, `ForbidClauseCompiled.fss`, `TestModifierCompiled.fss`). The reason, as evidence: the specification gives the `forbid` clause's meaning, "a new ForbiddenException is created with the thrown exception as its argument and thrown", the catch clause first (`Specification/basic/expressions/try.tex:65-78`), and its equivalence to a catch clause that throws `ForbiddenException(e)` (`Specification/basic/exceptions.tex:177-210`), and the `test` modifier on a top-level function (`Specification/basic/tests.tex:36-55`); walk runs all three (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1424-1433`, `interpreter/evaluator/CollectTests.java:51`); and the one library carries them (`Library/FortressLibrary.fss:339`, `:3728`, `:4070`; `Library/String.fss:337`), which the code generator refused while the checker passed them, measured as 'refused declarations 50' with these three kinds among 14, and 47 in 11 without them.

#### Provenance

F-34 and the phase 3 exit judgement's item that the library must emit, not only check (`reviews/phase3-exit/judgement.md`, sections 2.4 and 5.2, item 6); P-33, code-generator work beside the natives; climb batch 25's fork 14 (C takes rows 820, 821 and 823) and fork 12 (its own tests, the tracks to the gate); climb batch 25, rung C, rung-codegen-walls.


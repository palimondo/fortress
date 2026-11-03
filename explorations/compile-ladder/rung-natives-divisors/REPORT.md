# Rung N of climb batch 25: the integer divisors and nanoTime, 18 bindings on new helpers

- problem: 18 bindings of the one library named a glue class of walk's, which the compiled path cannot call, and no helper computed them: `GCD`, `LCM` and `partitionL` on the five integer types, `CHOOSE` on `NN64` and `ZZ`, `ZZ`'s `cmp` and `nanoTime`, the planner's N3 count, one row each in `explorations/compile-ladder/plan-25/probes/n3-base.tsv`: `explorations/coordinator/CLIMB-BATCH-25.md:373`
- spec: `GCD`, `LCM` and `CHOOSE` in `Specification/basic/operators/opr-overview.tex:254-271`, "GCD, LCM, and CHOOSE Operators", and for `partitionL`, `cmp` and `nanoTime` none (`grep -rn 'partitionL\|nanoTime' Specification/basic Specification/basic-lib` prints nothing): `Specification/basic-lib/basic-integers.tex:606-616`
- precedent: the planner's sample of five of the 18, in the form of climb batch 24's moves, as `ZZ`'s `DIV` naming `simpleArbitraryPrecisionArith.div` (`Library/FortressLibrary.fss:1051-1052`): `explorations/compile-ladder/plan-25/probes/sample-N.patch:1-122`
- deviation: one Euclid over unsigned 64-bit values gives every greatest common divisor, where the glue classes run the binary algorithm in three copies (`Int.java:320`, `Long.java:281`, `UnsignedLong.java:263`) and the sample a signed Euclid of its own; the same values: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:233-240`
- deviation: `ZZ64`'s `LCM` raises at an operand of `Long.MIN_VALUE` before it divides, where `Int.lcm` tests the quotient after (`Int.java:308-318`); the same values: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:362-374`
- deviation: `NN64`'s `LCM` and `CHOOSE` multiply by the class's own overflow-checked `unsignedLongOverflowingMul` where the glue class has `UnsignedLong.multiplyExact` (`UnsignedLong.java:320-324`); the same test and values: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:242-262`
- deviation from the specification's spelling: none
- historical: the 18 strings and the ends of five helper classes: `Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java`, `simpleLongArith.java`, `simpleUnsignedIntArith.java`, `simpleUnsignedLongArith.java`, `simpleArbitraryPrecisionArith.java`

The glue classes cited by file name alone are in `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`.

## 1. What changed and why

P-58 has each binding name a static helper that both paths call; P-70 and P-73 give the values: `GCD` and `LCM` nonnegative, `IntegerOverflow` where a result does not fit its fixed width. Climb batch 25's fork 7 has each new helper compute as its glue class does. The commit `dcc1ee79b` moves the 18 strings and adds the 18 helpers:

| owner | binding | string at | helper |
|---|---|---|---|
| trait `ZZ32` | `GCD`, `LCM`, `partitionL` | `Library/FortressLibrary.fss:785`, `:787`, `:808` | `simpleIntArith.intGcd`, `intLcm`, `intPartition` (`simpleIntArith.java:417-434`) |
| trait `ZZ64` | `GCD`, `LCM`, `partitionL` | `:878`, `:880`, `:899` | `simpleLongArith.longGcd`, `longLcm`, `longPartition` (`simpleLongArith.java:355-378`) |
| trait `NN64` | `GCD`, `LCM`, `CHOOSE`, `partitionL` | `:961`, `:963`, `:965`, `:982` | `simpleUnsignedLongArith.unsignedLongGcd`, `unsignedLongLcm`, `unsignedLongOverflowingChoose`, `unsignedLongPartition` (`simpleUnsignedLongArith.java:233-266`) |
| trait `ZZ` | `cmp`, `GCD`, `LCM`, `CHOOSE` | `:1021`, `:1058`, `:1060`, `:1062` | `simpleArbitraryPrecisionArith.cmp`, `gcd`, `lcm`, `choose` (`simpleArbitraryPrecisionArith.java:132-163`) |
| top level | `nanoTime` | `:4522` | `simpleLongArith.longNanoTime` (`simpleLongArith.java:380-382`) |
| value object `NN32` | `GCD`, `LCM`, `partitionL` | `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:445`, `:447`, `:468` | `simpleUnsignedIntArith.unsignedIntGcd`, `unsignedIntLcm`, `unsignedIntPartition` (`simpleUnsignedIntArith.java:235-251`) |

Each helper's Java types carry the declared types (`int` for `ZZ32` and `NN32`, `long` for `ZZ64` and `NN64`, `BigInteger` for `ZZ`), `self` first; the `NN32` and `NN64` positions reach the helpers through the rewrite's transfers (F-308). Each raises `fortress.CompilerBuiltin$IntegerOverflow` where its glue class raises `IntegerOverflow`, which walk raises as the library's own (F-299). The glue computations they follow: `Int.java:136-150`, `:214-218`, `:308-358`; `Long.java:150-162`, `:226-230`, `:274-279`; `NN32.java:143-156`, `:221-225`; `UnsignedLong.java:144-162`, `:221-225`, `:263-324`; `BigNum.java:170-198`, `:268-272`, `:326-345` (all under `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`). No glue class is edited, and none of the 18 is left on one.

No helper keeps state between calls: each works in its locals, and the two `CHOOSE` helpers loop over local accumulators; neither has a scratch array (`simpleUnsignedLongArith.java:248-262`, `simpleArbitraryPrecisionArith.java:146-159`), so row 855's race cannot come back and fork 7's parallel test is not owed.

`nanoTime` is one of the two of N3's 158 on microGPT's path (`explorations/coordinator/CLIMB-BATCH-25.md:373`); it keeps its type `ZZ64`, and the compiled checker reads its helper's `long` as `ZZ64`, so after the switch-over both paths type it alike (row 75's difference is the compiler's prelude's `RR64`, which stays until then).

## 2. The tests, first

The two guards, in the form of climb batch 23's and 24's (fork 9):

- `ProjectFortress/tests/NativeHelperFamilyDivisorsWalk.fss`, the walk guard: every moved binding on chosen values, 189 assertions: `GCD` and `LCM` at the four pairs of signs, at 0 and at the bounds, P-70's four examples (`:53`, `:68`, `:73`, `:61`, and the same on `ZZ64` and `ZZ`); `NN32` and `NN64` above their signed half; `NN64`'s `CHOOSE` past `ZZ64`'s range (`67 CHOOSE 33` is 14226520737620288370, `:211`), raising where it does not fit (`68 CHOOSE 34`, `:225`) and 0 where `k` is above `n` (`:222`); `ZZ`'s `CHOOSE` at 70, 68 and 100; `partitionL` at 0, 1, 2, a power of two, one above it and the bounds; `ZZ`'s `cmp` at both signs and at equality, beyond `ZZ64` too, and `<` and `>=` through it; `nanoTime` twice, the second not less than the first (`:285`).
- `ProjectFortress/compiler_tests/NativeHelperFamilyDivisorsCompiled.fss` with its `.test` (`link`, `run`, `run_out_contains=PASS`), the compiled guard: one top-level declaration per helper of the 18, at `ZZ32`, `ZZ64` and `ZZ`, an `NN32` carried in a `ZZ32` and an `NN64` in a `ZZ64`, with `makeZZfromZZ64` and `neg` to build `ZZ` values, and the walk guard's values asserted, 185 assertions.

Neither guard asserts `ZZ`'s `CHOOSE` where `k < 0` or `k > n`, which row 887 names as a departure.

The walk guard on the base's code, before any edit, through the harness (00:09:42 UTC):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-divisors/h1 ProjectFortress/tests/NativeHelperFamilyDivisorsWalk.fss
    . interpret tmp/rung-natives-divisors/h1/tests/NativeHelperFamilyDivisorsWalk
     OK (time = 9375ms)
    OK (1 test)

The compiled guard failing on the base's code, through the harness, at 00:12:21 to 00:12:23 UTC, before the sample was applied and before the edit's build, which ran from about 00:14:11 to 00:14:48:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh divbase ProjectFortress/compiler_tests NativeHelperFamilyDivisorsCompiled.test
    . link ProjectFortress/compiler_tests/NativeHelperFamilyDivisorsCompiled ProjectFortress/compiler_tests/NativeHelperFamilyDivisorsCompiled.fss:5:47-98:
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArith.intGcd
    File NativeHelperFamilyDivisorsCompiled.fss has 1 error.
    Tests run: 2,  Failures: 2,  Errors: 0

The passing runs, on the edit after its build and the library order (00:16:08 and 00:16:28 UTC), with no change of code after them:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh divedit ProjectFortress/compiler_tests NativeHelperFamilyDivisorsCompiled.test
    . link ProjectFortress/compiler_tests/NativeHelperFamilyDivisorsCompiled  OK (time = 11905ms)
    . run ProjectFortress/compiler_tests/NativeHelperFamilyDivisorsCompiled (1037ms) PASS
    OK (2 tests)

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-divisors/h1 ProjectFortress/tests/NativeHelperFamilyDivisorsWalk.fss ProjectFortress/tests/XXXChooseZZOutOfRangeWalk.fss
    . interpret tmp/rung-natives-divisors/h1/tests/NativeHelperFamilyDivisorsWalk
     OK (time = 1249ms)
    OK (2 tests)

The last runs of the three on the final code are in the suites (section 6): `NativeHelperFamilyDivisorsWalk  OK (time = 1407ms)` and `XXXChooseZZOutOfRangeWalk  OK Saw expected exception` in `ant testSystem`, and `NativeHelperFamilyDivisorsCompiled  OK (time = 3655ms)` (link) and `(700ms) Passed` (run) in `ant testQuick`.

The `XXX` test this rung adds, `ProjectFortress/tests/XXXChooseZZOutOfRangeWalk.fss` (section 9), shown working through the harness from its place, on the base's code (00:10:05 UTC), as it is:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-divisors/h1 ProjectFortress/tests/XXXChooseZZOutOfRangeWalk.fss
    FAIL: J1/0:1 =/= J1/0:0; ZZ 3 CHOOSE 5 is 0
     OK Saw expected exception
    OK (1 test)

and with its three expected strings set for one run to what the run prints, `"1"`, then restored (00:10:17 UTC):

     Missing expected failure
    1) tmp/rung-natives-divisors/h1/tests/XXXChooseZZOutOfRangeWalk(com.sun.fortress.tests.unit_tests.FileTests$InterpreterTest)junit.framework.AssertionFailedError: Expected failure or exception, saw none. InterpreterTest tmp/rung-natives-divisors/h1/tests/XXXChooseZZOutOfRangeWalk
    Tests run: 1,  Failures: 1,  Errors: 0

## 3. Where the fix belongs, and the precedent

The place is the one P-58 gives and fork 2 fixes: a static helper in the `nativeHelpers/` class of each number type, at the class's end, and the binding's string (`explorations/coordinator/map/modules-and-phases.md`, B.12: walk's `StaticNativeApp` calls the helper by reflection; the compiled path's `BuiltinPrimitiveRewriter` rewrites the body into a call of it). The skill's `library.md`, "Designing a change": a new native is a public static method of a class under `nativeHelpers/`, at the Java types that carry the declared types. Every way the library offers for these bindings:

1. a new static helper per binding, named in the string (taken: P-58);
2. an existing helper of the same operation: none exists for these 18 (N3; the planner's `n3-base.tsv`);
3. the binding left on its glue class (not taken: the compiled path cannot call it, F-32);
4. the compiler's prelude's way, `GCD` and `LCM` written in Fortress over `REM` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:694-708`): not a bare binding, which P-58 keeps (fork 7's way not taken);
5. a synthetic `import java` written in the library: the form P-58 does not take.

The precedent search: climb batch 23 moved `ZZ32`'s first family onto existing helpers (`640acb4a1`), climb batch 24 the rest that had them and `CHOOSE` on `ZZ32` and `ZZ64` onto two fixed helpers (`71249bf55`); the planner's `sample-N.patch` wrote five of these 18 in the classes' ends (followed). No precedent repaired a defect of these bindings, so no other site is owed by a precedent's fix. In the five classes, the helpers that raise `IntegerOverflow` all raise it by `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")`, as these do.

## 4. What the specification settles

`opr-overview.tex:262-269`: "The results of GCD and LCM are nonnegative", and a result that a fixed-size type cannot hold throws `IntegerOverflow`, with the examples `-2^31 GCD 0` and `(2^31-1) LCM 2` on `ZZ32`; the walk guard asserts both and P-70's two positive examples. `basic-integers.tex:606-616`: `CHOOSE` "is defined only for natural number types; it computes the binomial coefficient m CHOOSE n = m!/(n! (m-n)!). If n<0 or n>m, the result is 0." `NN64`'s helper gives 0 there, as its glue class; `ZZ`'s gives 1, as its glue class (section 9). The property under it fails at `m = n = -1` (review-queue item 333), which this rung leaves as the probe's question: the helpers keep the glue classes' values there. `partitionL`, `cmp` and `nanoTime` are not in the specification (the grep above); `FortressLibrary.fsi:2560-2563` gives `nanoTime(): ZZ64`, "the current time in nanoseconds", for differences only.

## 5. Old against new

A scratch program written by a script, not kept, `ValN.fss`: every moved binding over pairs of chosen values, each overflow caught and printed, in sequential loops: `GCD` and `LCM` on 24 `ZZ32` values and their `unsigned` images and on 36 `ZZ64` values and their `unsigned` images, `partitionL` on each, `NN64`'s `CHOOSE` on 20 values each way, `ZZ`'s `GCD`, `LCM` and `cmp` on 16 values, its `CHOOSE` on 9 by 7, and `nanoTime`'s order. Run on the old code and on the edit, and compared:

    explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base25 $PWD/tmp/old-caches ValN.fss > valn-old.txt    (rc=0, 8840 lines)
    bin/fortress ValN.fss > valn-new.txt                                                                                      (rc=0, 8840 lines)
    diff valn-old.txt valn-new.txt && echo SAME
    SAME

1539 of the 8840 lines print `IntegerOverflow` on both. Among them, on both: 'ZZ32 -2147483648 GCD -2147483648 = IntegerOverflow', 'ZZ -5 CHOOSE -1 = 1', 'ZZ 70 CHOOSE 35 = 112186277816662845432', 'nanoTime ordered true'. No walk value moves.

A compiled scratch probe, `ProbeChooseZZCompiled.fss`, not kept, binding `simpleArbitraryPrecisionArith.choose` by its own declaration, compiled and run with a private copy of the caches:

    ../bin/fortress compile .../ProbeChooseZZCompiled.fss ; ../bin/fortress run ProbeChooseZZCompiled
    compiled ZZ 3 CHOOSE 5 =  1
    compiled ZZ 0 CHOOSE 1 =  1
    compiled ZZ 5 CHOOSE -1 =  1

so the departure of section 9 is the helper's on both paths.

## 6. The stages, the ladder and the suites

Every path the edit changes (`git diff --name-only 97a416b18 HEAD`): `Library/FortressLibrary.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, the five helper classes, and the three tests. The library and the helper classes are outside the brief's list of paths that cannot move a stage, so both ran once, on the final code (`dcc1ee79b`), with the brief's commands.

The count stage (started 00:18:43 UTC, beside the distance stage; its table written 00:22:00, so 197 s; load at start 5.60): its table and climb batch 24's landed one are equal, `diff explorations/compile-ladder/climb-batch-24/gate/checker-count.txt tmp/rung-natives-divisors/checker-count-postedit.txt` printing nothing:

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-divisors/checker-count-postedit.txt tmp/rung-natives-divisors/cc-post
    FortressLibrary	0
    #total	0
    #locations	0
    #crash	none

The distance stage (started 00:18:43, ended 00:23:02):

    explorations/coordinator/tools/distance/run.sh tmp/rung-natives-divisors/distance-postedit.txt tmp/rung-natives-divisors/dist-post
    #total	0
    #crash	none
    #seconds	253	FortressLibrary 194
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-24/gate/distance.txt tmp/rung-natives-divisors/distance-postedit.txt
    DISTANCE SAME   0

The two distance tables differ only in the `#seconds` and `#machine` rows. The stage's per-site errors table holds its header only, as the landed per-site list `explorations/compile-ladder/gate/distance-sites.tsv:1` does: no site came, and none went. So the checker reads NN32's three bindings in `FortressBuiltin` and the 15 in `FortressLibrary` against their helpers' Java signatures and accepts them. No checker code changed: no speed pass (fork 15).

The ladder subset (`gate.md`, "The ladder regression", the drivers copied to the rung's scratch folder): no file's recorded first error in the baseline names a binding, operator or helper class this rung touches, so the rule gives an empty subset; the subset run instead holds the two pass-list programs that use `GCD`, `LCM`, `CHOOSE` or the 64-bit and unsigned types, `tests/chain0.fss` and `tests/varTest.fss`, since the compiler's prelude imports the five helper classes and their wrappers gain the new methods, and the eighteen microGPT components. `chain0.fss` and `varTest.fss` reach `pass`, as in `explorations/compile-ladder/climb-batch-24/gate/ladder/ladder.tsv`; `ladder_compare` prints no DOWN, UP or STDOUT line (and 83 MISSING, the pass-list files outside the subset); their outputs equal the baseline's; the `mg_phases` diff of the subset's microGPT table against `explorations/compile-ladder/climb-batch-24/gate/ladder/microgpt-phase.md` prints nothing.

The suites, once each after the last change of code (`dcc1ee79b`; fork 12):

    ant testQuick      BUILD SUCCESSFUL   Total time: 8 minutes 23 seconds
        [junit] Tests run: 86, Failures: 0, Errors: 0, Skipped: 0      (library)
        [junit] Tests run: 263, Failures: 0, Errors: 0, Skipped: 0     (othercompiler)
        [junit] Tests run: 1381, Failures: 0, Errors: 0, Skipped: 0    (compiler)
    ant testSystem     BUILD SUCCESSFUL   Total time: 4 minutes 42 seconds
        [junit] Tests run: 182, 182, 180, 181; Failures: 0 each

The compiler track's 1381 are climb batch 24's 1379 and the compiled guard's link and run; the 725 of `testSystem` are its 723 and the two new walk tests. No test changed its verdict: `IntegralOpsRungN` (link and run), `ChooseHelperCompiled`, `ChooseHelperZZ64Compiled`, `ChooseTableCompiledRungE`, `XXXNNGcdLcmRungP` ('Saw expected failure'), `ChooseHelperWalk`, `ChooseHelperZZ64Walk`, `PowChooseLcmRungE` and `IntSemanticsRungI` pass as before. The 52 demos are the gather's (fork 11).

## 7. Sentences made false

- `Specification/appendices/changes.tex:4469`, "173 of the 449 bindings of \library\ name a helper": with this rung alone, 191.
- `Specification/appendices/changes.tex:4476`, "the same operators but \EXP{<} and \OPR{CHOOSE} of the trait \EXP{\mathbb{Z}}": `ZZ`'s `CHOOSE`, `GCD`, `LCM` and `cmp` now name helpers.
- `Specification/appendices/changes.tex:4477-4478`, "eighteen bindings of the trait \EXP{\mathbb{N}64}, and of the interpreter's objects twenty-one of \EXP{\mathbb{N}32}": 22 and 24 with this rung.
- `Specification/appendices/changes.tex:4482`, "The other 276 still name a glue class": 258 with this rung. The gather rewrites the Effect once (fork 10).
- F-299's title and body: "173 of the one library's 449 live bindings name one", "The 173 by type: `ZZ32` 20 and `Int` 2, `ZZ64` 21 and `ZZ` 16 ... `NN32` 20, `NN64` 17 ... the other 276 name glue classes" (`explorations/coordinator/FACTS.md:134`).
- F-32: "of its 449 live bindings, 276 name one", and "MicroGPT also needs `nanoTime`, which needs a new helper, since the compiled one returns `RR64`" (`explorations/coordinator/FACTS.md:30`): `nanoTime` names its helper now.
- F-306: "trait `ZZ64`'s 20 and trait `ZZ`'s 16 native bindings name helpers" (`explorations/coordinator/FACTS.md:136`): 23 and 20.
- F-308: "`NN32`'s 20, `NN64`'s 17 and `Char`'s 39 bindings name their helpers" (`explorations/coordinator/FACTS.md:138`): `NN32`'s 23 and `NN64`'s 21.
- F-125: "`CHOOSE` answers 0 for `k < 0` or `k > n`" (`explorations/coordinator/FACTS.md:173`) was already false for `ZZ` on the base (section 9); this rung keeps that value.
- F-305: "`NN32`'s binding in the one library stays on its glue class" (`explorations/coordinator/FACTS.md:216`) is rung U's, not this rung's.
- The `fortress-repo` skill: `references/interpreter.md:89`, "Most bindings name one", and `references/library.md:56`, "Most of the library's bindings still name glue classes", stay true with this rung alone (191 of 449), not with the batch merged. No sentence of the skill names the glue classes this rung leaves (`grep -n 'Int\$Gcd\|Long\$NanoTime\|BigNum\$Cmp' .claude/skills/fortress-repo/references/*.md` prints nothing).

## 8. Points to report

- sample-N.patch: applied with `git apply`; its five strings taken as they are; its helper text changed (decision 1). Each of the 18 bindings moved; none left on its glue class. Evidence: `git diff 97a416b18 dcc1ee79b -- Library/FortressLibrary.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fss` (18 lines changed, each a string).
- The two guards on the base and on the text, through the harness and `junit.sh`: section 2 (walk guard green at 00:09:42 on the base and 00:16:28 on the text; compiled guard red at 00:12:21 on the base, green at 00:16:08 on the text).
- The distance table and the count table on the final tree: '#total 0' each, 'DISTANCE SAME 0', the count table equal to climb batch 24's; no site came; the count stage's 197 s, the distance stage's 253 s (section 6).
- Walk values that move: none, 8840 results equal (section 5); tests whose verdict changes in `ant testQuick` and `ant testSystem`: none (section 6).
- Whether a `CHOOSE` helper keeps state: neither does (section 1); no parallel test written.
- Every sentence made false: section 7.
- A file edited beyond those named: none.

## 9. Defects and their homes

- **`ZZ`'s `CHOOSE` answers 1 where the specification's zero rule gives 0, at `k < 0` or `k > n` for a natural `n`** (`3 CHOOSE 5`, `0 CHOOSE 1` and `5 CHOOSE -1` on `ZZ`), and 1 too at every negative `n`. Home 2: the specification settles it ("If n<0 or n>m, the result is 0.", `basic-integers.tex:611`), and the change that measured it writes its `XXX` test, `ProjectFortress/tests/XXXChooseZZOutOfRangeWalk.fss`, with the new row 887. The cause: `BigNum.choose` swaps `k` with `n - k` where `n - k < k`, so a negative `k` gives the loop no step and the result stays 1 (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:326-345`); its helper copies it (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleArbitraryPrecisionArith.java:146-159`), so the compiled path shows it too through a program's own binding (section 5). The fixed widths return 0 first (`simpleIntArith.java:206`; `Int.java:361`; row 337 fixed those). Not repaired here: fork 7 keeps the glue classes' values; the repair is one guard at a natural `n`, and at a negative `n` it meets review-queue item 333.
- F-125's sentence on `CHOOSE` is wrong for `ZZ` (section 7): a correction of the record, handed over in `record.md`.

## 10. Decisions

1. **The sample's helper text improved, its strings taken.** Chosen: one Euclid over unsigned 64-bit values, `simpleUnsignedLongArith.unsignedLongGcd` (the sample's `NN64` helper as it stands), called with the operands' magnitudes by the `ZZ32`, `ZZ64` and `NN32` helpers, and no private method. Why: a signed Euclid over `long`, the sample's `gcdOfLongs` written for `ZZ64`, meets `Long.MIN_VALUE`, whose negation stays negative, and Java's `%` keeps the dividend's sign, so `MIN GCD 6` would end at -2 and raise `IntegerOverflow` where the glue class gives 2; read unsigned, the magnitude of `MIN` is 2^63 exactly (the walk guard's `ZZ64 MIN GCD 6` and `ZZ64 2^62 GCD MIN`, `NativeHelperFamilyDivisorsWalk.fss:112-113`); one function in place of the glue's three copies of the binary algorithm; and a helper class's private method gets a wrapper too when the prelude compiles (F-106; fork 2). Ways not taken: the glue's binary algorithm copied into each class (`Int.java:320`, `UnsignedLong.java:263`); the sample's private signed `gcdOfLongs` in each class; `BigInteger.gcd` for every width, which allocates. The comments name the glue class each helper computes as, not the sample (`references/committing.md`: provenance in commits and reports).
2. **`ZZ`'s `CHOOSE` keeps the glue class's 1 at `k < 0` and `k > n`.** By fork 7 and the brief ("each computing as its glue class does"; "no value moves under walk"). Way not taken: the guard that gives 0, which moves walk's values at those pairs and, at a negative `n`, answers item 333's question. Recorded as row 887, with the `XXX` test.
3. **`ZZ64`'s `LCM` tests `Long.MIN_VALUE` before it divides.** Every nonzero multiple of 2^63 is at least 2^63; the glue class reaches the same raise through the quotient's test or `multiplyExact` (`Int.java:308-318`). Way not taken: the glue's order, which needs the signed `gcd`'s negative result at `MIN, MIN`.
4. **`NN64`'s `LCM` and `CHOOSE` multiply by the class's `unsignedLongOverflowingMul`.** It is the class's own overflow-checked product, the test `UnsignedLong.multiplyExact` makes (a product whose unsigned quotient by the multiplier is not the multiplicand). Ways not taken: `Math.unsignedMultiplyHigh`, which the classes do not use; a copy of `multiplyExact` in the helper class.
5. **`ZZ`'s `LCM` divides the smaller operand**, as `BigNum$Lcm` does, written with `min` and `max`; the value is the same either way.
6. **The guards' carriers.** The compiled guard binds at `ZZ32`, `ZZ64` and `ZZ`, an `NN32` carried in a `ZZ32` and an `NN64` in a `ZZ64`, as climb batch 24's `NN32` and `NN64` guards do, and asserts the unsigned results in their signed carriers (as `-4220223336089263246` for 14226520737620288370). Way not taken: binding at `NN32` and `NN64` through the prelude's transfers, which tests the transfers, not the helpers.
7. **The ladder subset.** The rule's subset is empty (section 6); chosen: `chain0.fss`, `varTest.fss` and the microGPT phase, as the programs the five classes' wrappers reach. Way not taken: the gate's 85, which is the gate's.
8. **No parallel test** (forks 7 and 8): no helper of the 18 keeps state.
9. **The `XXX` test's values**: only natural `n` (`3 CHOOSE 5`, `0 CHOOSE 1`, `5 CHOOSE -1`), where the zero rule and the binomial coefficient agree; a negative `n` stays out, as item 333's.

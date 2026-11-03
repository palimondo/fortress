# Skeptic's verdict on rung N of climb batch 25 (rung-natives-divisors)

Judged: `wip/rung-natives-divisors` at `c2699f1a82012db29b8fa590d636f7f2cb19030b` (the code at `dcc1ee79b`, then the report and record commits). Verdict: **approved**, no fix made, none contested.

## The worker's report and record

Both were on the branch already (`8c3db2d3d`, `c2699f1a8`), so the journal step wrote nothing and made no commit.

## What I checked

1. **The tables.** The worker's files, read: `checker-count-postedit.txt` gives '#total 0', '#locations 0', '#crash none', and `diff` against `explorations/compile-ladder/climb-batch-24/gate/checker-count.txt` prints nothing; `distance-postedit.txt` gives '#total 0', '#crash none', '#seconds 253 FortressLibrary 194', and against climb batch 24's `gate/distance.txt` differs only in the `#seconds` and `#machine` rows. The count stage started 00:18:43 UTC and its table was written 00:22:00, the report's 197 s. The diff changes no checker code (no path under `scala_src/`), so no count stage of mine was owed. These are the tables of the worker's head; I ran no stage.
2. **Test first**, in the worker's transcript. The compiled guard was written at 00:11:54 (call `ezk2jh`) and run through `junit.sh` at 00:12:20 (call `m5cutf`) on the base's code, before `sample-N.patch` was applied (00:12:28, `tVbg32`), before the helpers were written (00:13:34 to 00:13:51) and before the build (00:14:11, `btgvo9`, `build-1.txt` ending 00:14:48). Its output: '. link ProjectFortress/compiler_tests/NativeHelperFamilyDivisorsCompiled ProjectFortress/compiler_tests/NativeHelperFamilyDivisorsCompiled.fss:5:47-98:', 'File NativeHelperFamilyDivisorsCompiled.fss has 1 error.', 'Tests run: 2,  Failures: 2,  Errors: 0', the lines `recordedFailure` quotes, the header naming 'tree 97a416b18'. Passing at 00:16:08 (`EqWWVo`): '. link ... OK (time = 11905ms)', '. run ... (1037ms) PASS', 'OK (2 tests)'. No edit of code after it: the commit at 00:18:34, then the stages and the suites, whose logs hold the lines `recordedPass` quotes ('[junit]  link .../NativeHelperFamilyDivisorsCompiled  OK (time = 3655ms)', '[junit] Tests run: 1381, Failures: 0, Errors: 0', '[junit]  interpret .../tests/NativeHelperFamilyDivisorsWalk  OK (time = 1407ms)', '[junit]  interpret .../tests/XXXChooseZZOutOfRangeWalk  OK Saw expected exception', 'BUILD SUCCESSFUL' in each). The walk guard is a guard of existing behaviour, green on the base at 00:09:41 (`8rfa8w`), as the section asks; the `XXX` test was seen working on the base at 00:10:05 and red with its expectations inverted at 00:10:16.
3. **The diff, line by line.** The 18 strings are exactly those the section names, at the lines it names (each shifted by one by the diff's own context), and no other string moved; `ZZ32`'s, `ZZ64`'s and `NN32`'s `CHOOSE`, `REM` and `MOD`, and `ZZ`'s `narrow` and `widen` untouched. Each helper is at its class's end. Against the glue classes (`interpreter/glue/prim/`): `intGcd` and `Int$Gcd` (`Int.java:136-142`) raise where the magnitude exceeds 2^31 - 1; `intLcm` and `Int.lcm` (`Int.java:308-318`) agree, the product of two magnitudes at most 2^31 fitting a `long`; `longGcd` reads `|MIN|` unsigned as 2^63 and raises where the result reads negative, as `Long$Gcd` over `Int.gcd` does (`Long.java:150-156`); `longLcm` raises at a `MIN` operand before dividing, where `Int.lcm` reaches the same raise through its quotient test or `multiplyExact`; `unsignedIntGcd`/`unsignedIntLcm` against `NN32$Gcd`/`NN32$Lcm` and its `rc` (`NN32.java:143-156`, `:263-268`); `unsignedLongLcm` and `unsignedLongOverflowingChoose` against `UnsignedLong$Lcm` and `UnsignedLong.choose` (`UnsignedLong.java:150-162`, `:297-317`), the same algorithm step for step with the class's own `unsignedLongOverflowingMul` (`simpleUnsignedLongArith.java:68-73`) in place of `multiplyExact`, the same test; the four `partitionL` helpers are the glue's one line each; `gcd`, `lcm`, `choose`, `cmp` of `simpleArbitraryPrecisionArith` are `BigNum`'s (`BigNum.java:170-198`, `:268-272`, `:326-345`). The sample's signed Euclid would answer -2 at `ZZ64` `MIN GCD 6`; the worker's unsigned one answers 2, as the glue (my program, below), so the change from the sample is an improvement and is said so in the report, decision 1.
4. **Precedent.** The form is climb batch 24's (`ZZ`'s `DIV` naming `simpleArbitraryPrecisionArith.div`, `Library/FortressLibrary.fss:1051-1052`), and the raise is the classes' own `Utility.makeFortressException("fortress.CompilerBuiltin$IntegerOverflow")`. No device invented: the overflow-checked product reused is the class's own.
5. **The tests.** Each file carries one comment line and is named by its topic; the walk guard asserts 189 values, the compiled guard 185 (`grep -c` of `assert(` and `chk(`), P-70's four examples among them (`NativeHelperFamilyDivisorsWalk.fss:53`, `:61`, `:68`, `:73`). The `XXX` test's comment cites `basic-integers.tex`, section "Integers", `opr CHOOSE`, whose text says "If n<0 or n>m, the result is 0." (`Specification/basic-lib/basic-integers.tex:609-611`).
6. **My programs** (below).
7. **Homes.** The one defect, `ZZ`'s `CHOOSE` answering 1 at `k < 0` or `k > n`, has its home 2: the `XXX` test and row NEW-N-1 in `record.md`. Row 337's fix covered the four fixed widths only (its text: "`Int.choose` and `UnsignedLong.choose` return 0 first ... so `CHOOSE` on `ZZ32`, `ZZ64`, `NN32` and `NN64` answers 0 there"), so NEW-N-1 is a sibling of 337, as it says, not a regression of it. Keeping the 1 is the section's rule ("your helpers keep the glue classes' values there"; "no value moves under walk").
8. **Ledger.** `ledger.py find CHOOSE`, `GCD`, `partitionL`, `nanoTime`: rows 334, 337, 519, 520, 521, 855 (FIXED), 442 and 75 (open, the prelude's, not this rung's); none reopened by the change, none closed by it.
9. **The report.** Its provenance lines open where they cite (`CLIMB-BATCH-25.md:373`, N3's 158; `basic-integers.tex:606-616`; `FortressLibrary.fss:1051-1052`; `simpleUnsignedLongArith.java:233-240`, the unsigned Euclid; `simpleLongArith.java:362-374`, `longLcm`; `UnsignedLong.java:320-324`, `multiplyExact`; `Int.java:320`, `Long.java:281`, `UnsignedLong.java:263`, the three binary `gcd`s). The sentences made false: `changes.tex:4469`, `:4476-4478`, `:4482`; F-32 (`FACTS.md:30`, its count and its `nanoTime` sentence), F-299 (`:134`), F-306 (`:136`), F-308 (`:138`); F-125's `CHOOSE` sentence (`:173`) already false for `ZZ`; F-305's `NN32` sentence (`:216`) rung U's. Each opened and saying what the report says. The skill's `interpreter.md:89` ("Most bindings name one.") and `library.md:56` ("Most of the library's bindings still name glue classes.") stay true with this rung alone (191 of 449). The whole suites: `ant testQuick` and `ant testSystem` once each on `dcc1ee79b`, the head's code.
10. **Competing declarations.** Each of the 14 new method names occurs only in its class, the library string, and the compiled guard (`grep -rlw` over `ProjectFortress/src/com/sun/fortress`, both test corpora, `LibraryBuiltin` and `Library`); `simpleArbitraryPrecisionArith` had no `gcd`, `lcm`, `choose` or `cmp` before. The three test names are new in both corpora.
11. **Failure modes.** No loud failure becomes a quiet value: every raise of the glue classes is a raise of the helpers, at the same arguments (my programs). `ZZ`'s quiet 1 at `k > n` is the glue's, unchanged.

## My programs, the differential

`tmp/rung-natives-divisors/skeptic/SkDivWalk.fss`: `GCD`, `LCM` on `ZZ32` and `NN32` over 17 by 17 values (both bounds, `±46340`, 2^30, a prime), `NN32`'s `CHOOSE` there, `partitionL` on each; `GCD`, `LCM` on `ZZ64` and `NN64`, `NN64`'s `CHOOSE`, and `ZZ`'s `GCD`, `LCM` and `cmp` over 16 by 16 values (both bounds, ±2^62, `3037000499`, `-3037000500`); `NN64`'s `CHOOSE` over 0 to 79 each way; `ZZ`'s `CHOOSE` over -3 to 16 each way and at 10^30; `nanoTime`'s order; each overflow caught. Walk, new and old:

    bin/fortress tmp/rung-natives-divisors/skeptic/SkDivWalk.fss > walk-new.txt
    /home/user/fortress-base25/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base25 /home/user/fortress-natives-divisors/tmp/old-caches .../SkDivWalk.fss > walk-old.txt
    diff walk-old.txt walk-new.txt && echo SAME
    SAME

9851 lines each, 963 of them `IntegerOverflow`; among them 'Z64 -9223372036854775808 GCD 0 IntegerOverflow', 'Z64 -9223372036854775808 LCM 0 0', 'Z64 -9223372036854775808 GCD -9223372036854775808 IntegerOverflow', 'N64 9223372036854775808 CHOOSE 2 IntegerOverflow', 'ZZ 3 CHOOSE 5 1', 'ZZ 5 CHOOSE -1 1'.

`tmp/rung-natives-divisors/skeptic/SkDivCompiled.fss`: the same grids (the `NN` values in their signed carriers, `ZZ`'s `CHOOSE` -3 to 16), binding 15 of the helpers by its own declarations, compiled and run on the rung's build with a private copy of its caches:

    FORTRESS_CACHES=.../skeptic/caches bin/fortress compile SkDivCompiled.fss ; bin/fortress run SkDivCompiled > comp-new.txt
    EXIT=0
    ZZ  3  CHOOSE  5   1

A script reading both outputs, the `NN` results of walk turned to their signed carriers: 'compared 9509 differ 0 unmatched 0'. On the old code the compile refuses: 'SkDivCompiled.fss:4:47-98:', 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArith.intGcd', 'File SkDivCompiled.fss has 1 error.'

The diff holds no mutable variable, field, atomic block or write into a library's state (every helper works in locals), so I ran these at `FORTRESS_THREADS=1` only.

## Where I differ from the report

Nowhere in substance. Its decision 2 says a guard giving 0 "at a negative `n`, answers item 333's question"; item 333 (`explorations/coordinator/review-queue.md:629`) asks about the property at `m = n = -1` and names "change the zero rule at a negative `m`" as one answer, so the zero rule at a negative `self` is open there, as the report says, though the rule's text alone gives 0 at `(-5) CHOOSE 2` (`n > m`). The `XXX` test keeps to natural `self`, which nothing on record leaves open.

## Fixes

None.

## Verdict

Approved. The 18 bindings name 18 stateless helpers that compute as their glue classes, the guards were seen red then green in the right order, the old and new walk agree on 9851 more results and the compiled helpers with walk on 9509, and the record is true as written.

# Rung I (rung-natives-shift-power): the integers' 16 shifts and powers onto helpers

- problem: the 16 bindings over `AnyIntegral` named glue classes, which the compiled path cannot call, and no Java type carries `AnyIntegral` (`explorations/reviews/hard-set-natives-2026-11-06.md:73-105`, section 2.1, the shadow's 'GLUE-CALLS Int$LShift Library/FortressLibrary.fss:796:5-797:77 6')
- spec: `Specification/basic-lib/basic-integers.tex:47-62` (section "Integers", the shifts at a count of any integer type); the power by P-153, `basic-integers.tex`, section "Integers", `opr ^`
- precedent: the review's pair pattern in its public spelling, a public bare native at the narrow header beside a public converting declaration (`explorations/reviews/hard-set-natives-2026-11-06.md:292-338`), with `IntLiteral`'s exponent overloads converting by `b.asZZ32` (`Library/FortressLibrary.fss:856`) and Steele's `<<<` converting its count in Fortress around one helper (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:732-735`)
- deviation: the bare half's exponent at `NN32` and `NN64` is a `ZZ32`, not the prelude's own type (`CompilerBuiltin.fss:809`, `:878`), by fork I1; the narrow count at `NN32`, `NN64` and `ZZ`, which the prelude does not declare, is the signed type of the receiver's width, by fork I1; `ZZ`'s wide `^` passes whether its base is 0, 1 or -1 to its conversion (`Library/FortressLibrary.fss:1140`), which the review's spelling did not have (finding 5)
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java`, `simpleLongArith.java`, `simpleUnsignedIntArith.java`, `simpleUnsignedLongArith.java`, `simpleArbitraryPrecisionArith.java`

## What changed and why

Each of the 16 declarations keeps its public header over `AnyIntegral` and its api line, converts its count or exponent in Fortress, and calls a public bare `builtinPrimitive` binding at the narrow header, which the api now declares beside it (P-162, the public spelling, fork I1). No stage refused a pair, so no bare half takes the private spelling. Commits: `c17db57e0` (the two tests), `e46dd6f40` (the edit), `baa3a18fb` (`ZZ`'s left shift onto the existing `shiftLeft`, finding 4 of `record.md`).

The bindings, each with its narrow header and its helper's Java signature:

| type | declaration over `AnyIntegral` | bare binding | helper | new? |
|---|---|---|---|---|
| `ZZ32` | `LSHIFT` (`FortressLibrary.fss:847`) | `opr LSHIFT(self,b:ZZ32):ZZ32` (`:845`) | `simpleIntArith.intBitLeftShift(int,int):int` (`simpleIntArith.java:369`) | existing |
| `ZZ32` | `RSHIFT` (`:850`) | `opr RSHIFT(self,b:ZZ32):ZZ32` (`:848`) | `simpleIntArith.intBitRightShift(int,int):int` (`:374`) | existing |
| `ZZ32` | `^` (`:855`) | `opr ^(self, b:ZZ32):ZZ32` (`:853`) | `simpleIntArith.intPower(int,int):int` (`:450`) | new |
| `ZZ64` | `LSHIFT` (`:943`) | `opr LSHIFT(self,b:ZZ64):ZZ64` (`:941`) | `simpleLongArith.longBitLeftShift(long,long):long` (`simpleLongArith.java:343`) | existing |
| `ZZ64` | `RSHIFT` (`:946`) | `opr RSHIFT(self,b:ZZ64):ZZ64` (`:944`) | `simpleLongArith.longBitRightShift(long,long):long` (`:348`) | existing |
| `ZZ64` | `^` (`:951`) | `opr ^(self, b:ZZ32):ZZ64` (`:949`) | `simpleLongArith.longPower(long,int):long` (`:403`) | new |
| `NN64` | `LSHIFT` (`:1029`) | `opr LSHIFT(self,b:ZZ64):NN64` (`:1027`) | `simpleUnsignedLongArith.unsignedLongBitLeftShift(long,long):long` (`simpleUnsignedLongArith.java:288`) | new |
| `NN64` | `RSHIFT` (`:1032`) | `opr RSHIFT(self,b:ZZ64):NN64` (`:1030`) | `simpleUnsignedLongArith.unsignedLongBitRightShift(long,long):long` (`:293`) | new |
| `NN64` | `^` (`:1037`) | `opr ^(self, b:ZZ32):NN64` (`:1035`) | `simpleUnsignedLongArith.unsignedLongPower(long,int):long` (`:300`) | new |
| `ZZ` | `LSHIFT` (`:1129`) | `opr LSHIFT(self, b:ZZ32): ZZ` (`:1127`) | `simpleArbitraryPrecisionArith.shiftLeft(BigInteger,int):BigInteger` (`simpleArbitraryPrecisionArith.java:111`) | existing |
| `ZZ` | `RSHIFT` (`:1132`) | `opr RSHIFT(self, b:ZZ32): ZZ` (`:1130`) | `simpleArbitraryPrecisionArith.bigBitRightShift(BigInteger,int):BigInteger` (`:185`) | new |
| `ZZ` | `shift` (`:1135`) | `shift(self, k:ZZ32): ZZ` (`:1133`) | `simpleArbitraryPrecisionArith.shiftLeft(BigInteger,int):BigInteger` (`:111`) | existing |
| `ZZ` | `^` (`:1140`) | `opr ^(self, b:ZZ32):ZZ` (`:1138`) | `simpleArbitraryPrecisionArith.bigPower(BigInteger,int):BigInteger` (`:196`) | new |
| `NN32` | `LSHIFT` (`FortressBuiltin.fss:488`) | `opr LSHIFT(self,b:ZZ32):NN32` (`:486`) | `simpleUnsignedIntArith.unsignedIntBitLeftShift(int,int):int` (`simpleUnsignedIntArith.java:266`) | new |
| `NN32` | `RSHIFT` (`:491`) | `opr RSHIFT(self,b:ZZ32):NN32` (`:489`) | `simpleUnsignedIntArith.unsignedIntBitRightShift(int,int):int` (`:271`) | new |
| `NN32` | `^` (`:496`) | `opr ^(self, b:ZZ32):NN32` (`:494`) | `simpleUnsignedIntArith.unsignedIntPower(int,int):int` (`:278`) | new |

So the 16 bindings name 15 helpers: ten new (`intPower`, `longPower`, the four unsigned shifts, the two unsigned powers, `bigBitRightShift` and `bigPower`: the brief's nine kinds and `ZZ`'s right shift), and five existing, `shiftLeft` named twice. The api lines: `Library/FortressLibrary.fsi:525`, `:527`, `:530` (`NN64`), `:582`, `:584`, `:587` (`ZZ32`), `:644`, `:646`, `:649` (`ZZ64`), `:701`, `:703`, `:706`, `:712` (`ZZ`), `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:164`, `:166`, `:169` (`NN32`). At `NN32` and `NN64` the rewrite passes `self` and the result through the transfers of F-308; each helper name is unique in its class, so the transfers apply.

The conversion functions, as written, all private:

- `shiftCount32(b:AnyIntegral):ZZ32` (`Library/FortressLibrary.fss:733-742`), for `ZZ32` and `ZZ`: a `ZZ32` count unchanged; a `ZZ64` count clamped to ±(2^31-1) and read by `ZZ64`'s `narrow`; an `NN32` or `NN64` count capped at 2^31-1 by the unsigned `MIN` and read by `signed` (and `narrow`); a `ZZ` count clamped in `ZZ` to ±(2^31-1) and read by `ZZ`'s `narrow`, one call (`:739`). The saturation is `Int.shiftCount`'s (`interpreter/glue/prim/Int.java:295-306`): every shift of a `ZZ32` reads 2^31-1 as beyond the width, and `ZZ`'s `shiftLeft` overflows at it for a nonzero value or shifts out every bit at its negation, as `BigNum$LShift` does past the `int` range.
- `shiftCount64(b:AnyIntegral):ZZ64` (`:744-751`), for `ZZ64` and `NN64`: `widen` of a `ZZ32`, `signed(widen(c))` of an `NN32`, an `NN64` capped at 2^63-1, and a `ZZ` through `shiftCount32` and `widen`, so the one `ZZ` `narrow` above serves it too.
- `powerCount32(b:AnyIntegral, unitBase:Boolean):ZZ32` (`:757-771`) with `highExponent32` and `lowExponent32` (`:773-777`), for all five powers: an exponent in the `ZZ32` range unchanged; beyond it, the nearest `ZZ32` of its sign and parity, 2^31-2 or 2^31-1 above and -2^31 or -2^31+1 below, as `Int.powCount` keeps sign and parity at 64 bits (`Int.java:271-283`); where `unitBase` is false, above the range it becomes 2^31-1. A `ZZ` exponent is compared in `ZZ` and read by `ZZ`'s `narrow`, one call (`:770`). The fixed-width powers pass `true`; `ZZ`'s passes `|self| <= 1`.
- `countNN32` and `exponentNN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:389-415`), the same readings for `NN32`, since a private function of `FortressLibrary` does not reach `FortressBuiltin`; each has one call of `ZZ`'s `narrow` (`:395`, `:414`).

So the conversions make four calls of `ZZ`'s `narrow`, all on a value clamped to the `ZZ32` range first (fork I2), and every other conversion is a conversion member that the five types already have, called and not edited.

## The failing run and the passing run

The failing run, on the base's code before any edit was built (the tree was `ed8652dc0` with the two tests written, uncommitted):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyShiftPowerCompiled.test
    # junit.sh base 2026-11-07T07:36:08Z; ... tree ed8652dc0; ...
    . link ProjectFortress/compiler_tests/NativeHelperFamilyShiftPowerCompiled ProjectFortress/compiler_tests/NativeHelperFamilyShiftPowerCompiled.fss:7:47-100:
        builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArith.intPower
    FAILURES!!!
    Tests run: 2,  Failures: 2,  Errors: 0

The walk guard on the same code, green as a guard must be:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/NativeHelperShiftPowerWalk.fss
    # harness-one 2026-11-07T07:34:47Z; tree ed8652dc0; ...
    shifts and powers done
    OK (1 test)

The passing runs, the last after the last change of code (the code of `baa3a18fb`, uncommitted at the run):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h1 ProjectFortress/tests/NativeHelperShiftPowerWalk.fss
    # harness-one 2026-11-07T07:55:00Z; tree e46dd6f40; ... cache empty
    OK (1 test)
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests NativeHelperFamilyShiftPowerCompiled.test
    . run ProjectFortress/compiler_tests/NativeHelperFamilyShiftPowerCompiled (339ms) PASS
    OK (2 tests)

The compiled test binds every helper that the 16 name, in its own declarations at the compile's Java types, `NN32` carried in a `ZZ32` and `NN64` in a `ZZ64`, at 2^31 and above and 2^63 and above (`NN32 2^31 RSHIFT 31 is logical`, `NN32 (2^32-1) RSHIFT 1`, `NN64 2^63 LSHIFT -1 is logical`, `NN64 (2^64-1) RSHIFT 1`, `NN64 (2^63)^2 throws IntegerOverflow`). The walk guard runs each of the 16 at a count or exponent of each of the five types, negative, at and beyond the width, beyond 64 bits (a `ZZ` 2^70 and -2^70, odd and even), at `NN32` 2^31 and `NN64` 2^63 and the next odd values, the `ZZ32` and `ZZ64` minimums, each power at the exponents -1, 0, 1 and 2 and at an overflow, each value as the glue answers it: 227 assertions, the same on both versions.

## The suites, once on the final code

Both suites ran on `baa3a18fb`, after its build (a helper class that the library's bindings name changed, so both, as fork 2 gives):

    nice -n 19 ant testSystem
    BUILD SUCCESSFUL
    Total time: 3 minutes 47 seconds
    (TEST-RESULTS/system-0..3: Tests run: 188, 189, 190, 190, Failures: 0, Errors: 0)
    nice -n 19 ant testQuick
    BUILD SUCCESSFUL
    Total time: 4 minutes 43 seconds
    (fast-compiler 1434, fast-library 86, fast-othercompiler 263; Failures: 0, Errors: 0)

Against climb batch 26's gate (`explorations/compile-ladder/climb-batch-26/gate/summary.txt`): the system shards sum 757 against 756, the new walk guard; the compiler track 1,434 against 1,432, the new compiled test's link and run; the library and othercompiler tracks unchanged. No verdict changes: `IntSemanticsRungI`, `IntegerPowerContractWalk`, the `NatPower…Walk` tests, `NativeHelperUncarriedWalk`, the `NativeHelperFamily…Walk` and `…Compiled` tests pass, and `XXXIntegerPowerContractCompiled` (row 441, the prelude's) stays an expected failure. An earlier pass of both suites on `e46dd6f40` gave the same counts with no failure; its code state is not the final one.

## The checker count and the distance

Both stages ran once on `baa3a18fb`, the final tree, after its build; no change of code followed.

    explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-shift-power/checker-count-postedit.txt tmp/rung-natives-shift-power/cc-post
    #total	0
    #crash	none
    diff explorations/compile-ladder/climb-batch-26/gate/checker-count.txt tmp/rung-natives-shift-power/checker-count-postedit.txt
    (no output)

    explorations/coordinator/tools/distance/run.sh tmp/rung-natives-shift-power/distance-postedit.txt tmp/rung-natives-shift-power/dist-post
    #total	0
    #seconds	163	FortressLibrary 122
    explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-26/gate/distance.txt tmp/rung-natives-shift-power/distance-postedit.txt
    DISTANCE SAME   0

The stage's per-site error list holds only its header line, so no site moved against `explorations/compile-ladder/gate/distance-sites.tsv`. The count stage checks each moved binding of `FortressLibrary` against its helper's Java signature, the distance stage those of `FortressBuiltin` too (P-58): all 16 pass. An earlier pass of both on `e46dd6f40` also gave 0 and 0; its code state is not the final one.

## The ladder subset

The baseline's files whose recorded first error names a shift, a power or `AnyIntegral` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv`): `expTest.fss`, `transposition.fss`, `rshiftbug.fss`, `tupleInfer.fss`, none in the gate's pass list. Run on the final code with the gate's drivers copied under `tmp/rung-natives-shift-power/ladder/`:

    tests	expTest.fss	disambiguate	Variable asFloat is not defined.
    tests	rshiftbug.fss	codegen	Can't compile AsIfExpr at .../ProjectFortress/tests/rshiftbug.fss:34.27
    tests	transposition.fss	typecheck	Could not check call to operator ^
    tests	tupleInfer.fss	disambiguate	AnyIntegral is undefined.

Three are the baseline's. `expTest.fss` was at typecheck in the baseline; the old code gives the same disambiguation error, so the move is not this rung's:

    old-fortress.sh /home/user/fortress-base27 .../tmp/old-caches compile expTest.fss
    .../expTest.fss:25:13-18:
        Variable asFloat is not defined.
    File expTest.fss has 2 errors.

The ladder compiles against the compiler's prelude, which this rung does not touch, so no move was expected.

## Where the fix belongs, and the precedent search

The bindings are library text (`Library/`, `ProjectFortress/LibraryBuiltin/`), and the helpers belong under `nativeHelpers/`, which both paths call (`.claude/skills/fortress-repo/references/library.md`, "Designing a change"; `explorations/coordinator/map/compile-path-walkthrough.md`, section 7). Walk's loader and the compiled rewrite need no change: each bare binding is the form both already read (F-298, F-308). The ways the language and the library offer:

1. A public bare binding at the narrow header beside the converting declaration (the review's (a), public spelling): taken, by P-162 and fork I1.
2. The same pair with the bare half private: kept for a pair that a stage refuses; none was.
3. One declaration per count type, as Steele's `<<<` (`CompilerBuiltin.fss:732-735`): four overloads for each of 16, about 60 declarations, each still needing a conversion; not taken.
4. A Java helper over `AnyIntegral`: no Java type carries it (F-299; `tests/NativeHelperUncarriedWalk.test`); not possible.

The conversion's spelling: a `typecase` over the five types, the review's probe's (section 6, (a), reference 2), in place of an overload per count type; `MIN` and `MAX` for the clamps, as the review's probe wrote them. The precedent for the converting body is `IntLiteral`'s `opr ^(self, b:IntLiteral):ZZ32 = self^(b.asZZ32)` (`FortressLibrary.fss:856`): the library has four such sites, one at each of `ZZ32`, `ZZ64`, `NN64` and `ZZ` (`:856`, `:952`, `:1038`, `:1141`), and a fifth at `NN32` (`FortressBuiltin.fss:497`); they stay, and now reach the bare power.

## What the specification settles

`basic-integers.tex:47-62`: a count of any integer type, the shift at the width of the value shifted, a count at or beyond the width giving 0 or -1, a negative count shifting the other way, an `NN64` count of 2^63 or more beyond the width; on `ZZ`, `x LSHIFT k` is `shift(x, k)`. P-153 gives the power's type and its negative exponents. Every value of the guard is these rules' value; no sentence of the specification changes.

## Old against new

- `tests/NativeHelperShiftPowerWalk.fss`, through `harness-one.sh`, on the base's code (07:34:47Z) and on the final code (07:55:00Z): the same 227 values, green both times.
- `tests/expTest.fss`, compiled on the old code through `old-fortress.sh`, above: the same first error as on the new.
- A scratch Java program on JDK 25, for the choice of `shiftLeft` (finding 4 of `record.md`): 'shiftLeft(5, MIN): 0', 'shiftLeft(-5, MIN): -1', 'shiftLeft(0, MIN): 0', 'shiftRight(5, MIN): ArithmeticException BigInteger would overflow supported range'.

## Sentences made false

- `Specification/appendices/changes.tex:4495`, in the entry "A native binding that names a static helper": 'The other 143 still name a glue class, which the compiled code cannot call.' On this tree alone, 127; the entry's list (`changes.tex:4432-4562`) does not name these 16. The gather corrects the entry once (fork 7).
- F-32's 143 and F-299's '306 of the library's 449 live bindings', on this tree alone 127 and 322 of 449: the glue strings in the one library fall from 108 to 92 and the helper strings rise from 305 to 321 by a grep of `builtinPrimitive("com.sun.fortress.interpreter.glue` and `…nativeHelpers` over its `.fss` files, a count of strings, not F-299's count of live bindings, but its difference, 16, is the bindings'.
- `explorations/coordinator/PLAN.md:10` and `:47`, '306 of the library's 449 live bindings name helpers … and 143 still name glue classes'; `PLAN.md:51`, the integers' rung as work to come, with 'about 9 new helpers' (ten were written, finding 3).

No sentence of an Appendix I Effect or a `\note` on walk or the compiled path names these 16 otherwise (`grep -n 'LSHIFT\|shift\|power' Specification/appendices/changes.tex`, lines 4420 to 4570: only `:4495`).

## Points to report

- Each binding moved, its narrow header and helper with its Java signature: the table above. No pair took the private spelling; no stage refused one.
- The conversion functions as written, and each call of `ZZ`'s `narrow`: above, four calls (`FortressLibrary.fss:739`, `:770`; `FortressBuiltin.fss:395`, `:414`).
- The tests before and after through the harness and `junit.sh`, at `NN32` 2^31 and above and `NN64` 2^63 and above: above.
- The count table and the distance table on the final tree: 0 and 0, no site.
- Each value that moves: none in the guard's 227; no test's verdict changes in `ant testSystem` or `ant testQuick`.
- Every sentence made false: above.
- A file edited beyond those named: `FortressBuiltin.fss` holds two private conversion functions before `NN32` (`:389-415`), outside the brief's 'NN32's three, their narrow headers and api lines, only', since `FortressLibrary`'s private functions do not reach it. No conversion member of the five types, no checker or compiler code was edited.
- Not reached: a model value that moves (no model line holds a shift, and its powers are at a `ZZ32` exponent, which now reaches the bare binding straight); a step that would edit a conversion member.

## Decisions

1. **The public spelling for all 16, no private half.** Ways not taken: the private spelling, kept by P-162 for a refused pair; both stages accepted every pair (0 and 0 on `baa3a18fb`).
2. **The narrow headers of fork I1**: a `ZZ32` count on `ZZ32`, `NN32`, `ZZ`; a `ZZ64` count on `ZZ64`, `NN64`; a `ZZ32` exponent everywhere. Ways not taken: the prelude's `NN32` and `NN64` exponent of the base's own type (`CompilerBuiltin.fss:809`, `:878`), which loses the sign that P-153 tests at run time; a `ZZ64` count on `ZZ32`, which the prelude's `ZZ32` pair does not take (`:736-737`).
3. **`ZZ`'s `LSHIFT` and `shift` on the existing `shiftLeft`, `RSHIFT` on a new `bigBitRightShift`.** Evidence: the JDK 25 probe above; at `Integer.MIN_VALUE`, `shiftLeft(a, -k)` would answer 0 or -1 where `BigNum$RShift` raises `IntegerOverflow` for a nonzero value. Way not taken: a new `bigBitLeftShift`, which `e46dd6f40` had and `baa3a18fb` removed, since fork I3 takes an existing helper where it computes as the glue does.
4. **New helpers for the five powers and the four unsigned shifts**, at each class's end (fork I3). Ways not taken: `intExp` (casts `Math.pow`, row 441) and `intToIntPower` (answers 0 at `2^(-1)`, row 441's history), `UnsignedLong.powExact` and the other glue methods (walk-only classes).
5. **The conversion as a `typecase` over the five types, clamped by `MIN` and `MAX`.** Ways not taken: an overload per count type, Steele's way (about 60 declarations); `if` chains for the clamps, which the review's probe did not need.
6. **`ZZ`'s wide `^` passes `|self| <= 1` to its conversion** (finding 5 of `record.md`). Ways not taken: the parity clamp alone, which turns `2^(2^70)` from the glue's `IntegerOverflow` into a 2^31-1-bit number; a `throw IntegerOverflow` written in Fortress for a large exponent, which puts P-153's rule in two places; a `ZZ64` exponent at `ZZ`'s bare half, which fork I1 does not give.
7. **`bigPower` refuses before building where `(bitLength(|a|)-1)·b` reaches 2^31-1.** Evidence: there `|a|^b` is at least 2^(2^31-1), past `BigInteger`'s range, so the glue's `u.pow(v)` throws too; the test changes no answer and avoids a 256 MB allocation at `2^(2^31-1)`. Way not taken: `a.pow(b)` alone.
8. **Two private conversions in `FortressBuiltin` for `NN32`** (`countNN32`, `exponentNN32`). Ways not taken: public conversions in `FortressLibrary`'s api, a new public name the brief does not give; inline `typecase`s in each of `NN32`'s three declarations, the same text three times.
9. **Both suites after the last change, and both stages, run a second time** because `baa3a18fb` changed a helper class and the library after the first runs on `e46dd6f40`; the first runs are not cited as the final tree's.

## Defects and their homes

- The compiled path could not run these 16 bindings (glue classes): home 1, repaired; `compiler_tests/NativeHelperFamilyShiftPowerCompiled` and the walk guard `tests/NativeHelperShiftPowerWalk`.
- `BigInteger.shiftLeft(a, -k)` at `k = Integer.MIN_VALUE` does not compute as `BigNum$RShift`: home 1, repaired by `bigBitRightShift`; the guard's 'ZZ 5 RSHIFT the ZZ32 minimum throws IntegerOverflow' and 'ZZ 0 RSHIFT the ZZ32 minimum'.
- Rows 441 and 442, the prelude's: home 3 as they stand, unchanged in status; their notes say what the one library now binds (`record.md`, "Ledger rows"). Rows 523 to 525, 381 and 383 stay with the prelude (P-38).

## Disk

The ladder subset's first try stopped on 'STOP: only 425796 KB free on / (floor 512000 KB)', the shared disk at 99%. This tree's finished scratch was removed (`ProjectFortress/test-caches`, `tmp/old-caches`, `tmp/h1.cache`), giving 1,003 MB free, and the subset ran.

## Commands worked out

- `git show REV:FILE | grep -c 'builtinPrimitive("com.sun.fortress.interpreter.glue'` over the one library's `.fss` files at the base and at `HEAD`: the change in glue strings, 108 to 92.

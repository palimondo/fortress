# Rung A, rung-natives-asfloat: the skeptic's verdict

Head judged: 2628fdb14 (the worker's). REPORT.md and record.md were already on the branch (f2441ab7d, 2628fdb14), so nothing was written from the run's journal. The tables in REPORT.md are those of the worker's head; no count or distance stage ran after my commit, which changes prose only.

## What I checked

1. **The stages.** `diff explorations/compile-ladder/climb-batch-24/gate/checker-count.txt tmp/rung-natives-asfloat/checker-count-postedit.txt` printed nothing; the count's `#total 0`, `#locations 0`, `#crash none`. `diff` of climb batch 24's `distance.txt` with `tmp/rung-natives-asfloat/distance-postedit.txt` differs only in the rows `#seconds 198 FortressLibrary 152` / `#seconds 219 FortressLibrary 157` and `#machine`; `dist-post/errors.tsv` holds its header only. The count ran 01:59:35 to 02:02:17 (the call's start, the table's write time): about 162 s, as reported.
2. **Test first.** In the first launch's transcript (agent-a98194d5352da54a4): the walk guard 'OK (1 test)' on tree 97a416b18 at 01:37:37 (call HUoVY2); the compiled guard on the base at 01:38:04 (call 1ahSx6), 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleLongArith.longToDouble', 'Tests run: 2,  Failures: 2,  Errors: 0'; tests committed 5ea480cb6 at 01:38:14; the patch applied at 01:38:19, the Java comments edited at 01:38:34, `ant compileAll` started 01:38:49, so the failure ended before the edit was built. Passing after the last code change: 01:40:03 (call jDRsry), 'OK (2 tests)' and the walk guard 'OK (1 test)'; the code was committed at 01:40:41 (76a900f19) and not changed after. `tmp/rung-natives-asfloat/testQuick.txt`: 'Tests run: 86, Failures: 0', '263, Failures: 0', '1381, Failures: 0', 'BUILD SUCCESSFUL'; `testSystem.txt`: 180, 183, 182, 179, each 'Failures: 0', 'BUILD SUCCESSFUL'.
3. **The diff.** Five headers `asFloat(self): Float` to `asFloat(self): RR64` and five strings, rung-A.patch's text exactly (FortressBuiltin.fss:241, :374, :383, :396, :570); two helpers, `simpleLongArith.longToDouble` (`(double) a`, simpleLongArith.java:27-30) and `simpleArbitraryPrecisionArith.toDouble` (`a.doubleValue()`, simpleArbitraryPrecisionArith.java:30-33), each the method right before longAdd and add (fork 2). Each computes as its glue class: Long.java:268-271, BigNum.java:280-283; the three existing helpers as Int.java:244-246, RR32.java:390-392 and NN32.java:257-259 (Unsigned.toDouble, against `(double) toLong(a)`, simpleUnsignedIntArith.java:226-228). The declared result is fork 3's default, settled by Library/FortressLibrary.fsi:290-291 and numbers.tex:47-49. No path outside the section's list. One cosmetic remnant: the move of longToDouble above the section comment leaves two blank lines before "// The original "Java-like" arithmetic operators" (simpleLongArith.java:31-32); whitespace only, not worth a build, not changed.
4. **Precedent.** F-307's one-line string swap on the same owners (`Long`'s and `BigNum`'s `asString`, FortressBuiltin.fss:380, :567) and the helpers' form `intToDouble` (simpleIntArith.java:411-413) are the library's way; no device invented.
5. **The tests.** Each has one comment line and is named by its topic; no specification citation in a message. The walk guard holds every value the section lists; the compiled guard leaves out RR32's -0.0 and -infinity, for the reason REPORT.md's decision 4 gives (CompilerBuiltin.fsi:479, :434-438; no nativeHelpers method answers a `float`: `grep -n 'static float' nativeHelpers/*.java` printed nothing). I agree.
6. **My programs** (tmp/rung-natives-asfloat/skeptic/). `SkAsFloatW.fss`, under walk on the rung's code and on the old code: the five through the library's mixed operators (`asFloat(i) + 0.5`, `(i = 7.0)`, `(r = 2.5)`, `SQRT`, `MAX`, `rawBits`, `nextUp`, `floor`, `round`, the coercions of FortressLibrary.fss:414-415), a generic `conv[\T extends Number\]`, `SUM` and `BIG MAX`, and a `typecase` of each result:

       A 7.0 RR64 7.5 3.5
       D 4.294967293E9 RR64 4.294967292E9
       E 3.402823669209385E38 RR64 1.157920892373162E77
       H 4619567317775286272 2.5000000000000004 3.402823669209385E38 9007199254740996
       J 10.0 16.0

   `diff` of the two outputs, paths stripped, printed nothing ('SAME'). `SkAsFloatC.fss`, compiled, the two new helpers at values the worker's guard does not reach: 2^53 + 3 and -(2^53 + 1) at ZZ64, and at ZZ 2^1024 - 2^971 (the largest double), 2^1024 - 2^970 (the halfway point, to even: infinity), one less, and 2^128:

       L  9.007199254740996E15   0.0   -9.007199254740992E15
       Z  1.7976931348623157E308   Infinity   1.7976931348623157E308   3.402823669209385E38

   the same as Java's `(double)` and `BigInteger.doubleValue()` (a scratch `J.java`, same four and two values), and equal to walk's 2^128 above. On the old code its compile is refused, 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleLongArith.longToDouble'. No mutable state, field or atomic block in the diff, so no run at four threads.
7. **Defects and homes.** The negated radix-point numeral at RR32 on the compiled path: I did not re-measure it (the worker's probe is in its transcript, calls ES5uTR to WwjKTG); its home as a note to row 529 (the prelude's RR32 arithmetic answering RR64, closing at the switch-over) is sound; row 454 is the one library's numeral refusal at RR32, not the prelude's. My programs measured no defect of the rung.
8. **Ledger.** `ledger.py find asFloat`: rows 360, 434, 442, 672, 873 among others; none is opened or closed by this rung; 442 (the prelude's missing conversions into RR64) stays the prelude's.
9. **The report.** Its five provenance lines opened with `sed -n`: numbers.tex:47-49, FortressLibrary.fsi:290-291, PLAN.md:52, FortressBuiltin.fss:370-371, :380, :567, simpleIntArith.java:411-413, the five headers, the helpers' lines: each says what is claimed. The record's Revival change citations (`git show a874948ac:` FortressLibrary.fss:355 and FortressBuiltin.fss:238, :374, :383, :395, :533; CompilerBuiltin.fss:745) hold. The sentences made false are listed whole: changes.tex:4469, F-32 (FACTS.md:30), F-299 (:134), F-308 (:138, its head's "`NN32`'s 20" too), PLAN.md:52; I found no other (`grep -n asFloat` over FACTS, PLAN, POSITIONS and changes.tex). The summary.txt lines cited hold (1379, 86, 263; 176, 185, 181, 181).
10. **Competing declarations.** `longToDouble` only in simpleLongArith.java:28 and the compiled guard; `toDouble` declared only in simpleArbitraryPrecisionArith.java:31. The report said the four other files that name it hold static methods; they call `com.naturalbridge.misc.Unsigned.toDouble` (FNN32.java:44, FNN64.java:46, UnsignedLong.java:259, NN32.java:259). Corrected (below).
11. **Failure mode.** No loud failure becomes a quiet value: the five give the glue classes' values; a ZZ past the double range answers an infinity, as BigNum$AsFloat did, and the specification is silent on it (numbers.tex:47-49).

## Fixes

- Correction, 0be1ccdbd: REPORT.md, "Competing declarations": the four files outside nativeHelpers/ call Unsigned.toDouble and declare none. Prose only; no test, no build.

No defect of the change; nothing contested.

## Where I differ from the worker

Nowhere on its decisions. Its comment wording and the place of longToDouble change no line another rung writes (fork 2).

## Verdict

Approved.

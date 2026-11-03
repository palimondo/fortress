# Rung A, rung-natives-asfloat: the asFloats of Int, RR32, NN32, Long and BigNum at RR64, on their helpers

- problem: climb batch 23's fork 12: `Int`'s `asFloat` moved at its header `Float` is refused by the checker, 'Function body has type RR64, but declared return type is Float.' at `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:375` (the planner's control, explorations/coordinator/CLIMB-BATCH-25.md:367-397, "The stages"); PLAN's natives line, explorations/coordinator/PLAN.md:52
- spec: Specification/basic-lib/numbers.tex:47-49 ("a conversion into RR64 ... is explicit, written asFloat(x) with the method that the library declare on Number"), with Library/FortressLibrary.fsi:290-291 (`abstract asFloat(self): RR64`, "the explicit conversion into %RR64%")
- precedent: the bindings that already name a helper beside these, `Int`'s `asString` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:370-371) and `Long`'s and `BigNum`'s `asString` (F-307, :380, :567); for the new helpers, `simpleIntArith.intToDouble` (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:411-413)
- deviation: the declared result is `RR64`, not the team's `Float` (ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:241, :374, :383, :396, :570), by fork 3; `longToDouble` sits above the comment "The original Java-like arithmetic operators" (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:27-30), not under it as rung-A.patch put it; the two new helpers' comments say what they compute, not which glue class they copy (simpleLongArith.java:27, simpleArbitraryPrecisionArith.java:30)
- historical: ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:241-242, :374-375, :383-384, :396-397, :570-571; ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleLongArith.java:27-31; ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleArbitraryPrecisionArith.java:30-34

## What changed and why

Five bindings of walk's library move from glue classes onto static helpers of `nativeHelpers/` (P-58), and their declared result goes from walk's float object `Float` to `RR64`, the type of the library's abstract `asFloat` on `Number` (Library/FortressLibrary.fsi:291) and of the specification's text (numbers.tex:49):

| owner | line | was | now |
|---|---|---|---|
| `RR32` | FortressBuiltin.fss:241 | `asFloat(self): Float`, `RR32$AsFloat` | `asFloat(self): RR64`, `simpleDoubleArith.floatToDouble` |
| `Int` | :374 | `Float`, `Int$AsFloat` | `RR64`, `simpleIntArith.intToDouble` |
| `Long` | :383 | `Float`, `Long$AsFloat` | `RR64`, `simpleLongArith.longToDouble` (new) |
| `NN32` | :396 | `Float`, `NN32$AsFloat` | `RR64`, `simpleUnsignedIntArith.unsignedIntToDouble`, through the rewrite's NN32 transfer (F-308) |
| `BigNum` | :570 | `Float`, `BigNum$AsFloat` | `RR64`, `simpleArbitraryPrecisionArith.toDouble` (new) |

The two new helpers compute as their glue classes: `simpleLongArith.longToDouble` is `(double) a`, as `Long$AsFloat` (interpreter/glue/prim/Long.java:268-271); `simpleArbitraryPrecisionArith.toDouble` is `a.doubleValue()`, as `BigNum$AsFloat` (BigNum.java:280-283). The three existing helpers compute as theirs: `intToDouble` `(double) a` as `Int$AsFloat` (Int.java:244-246); `floatToDouble` `(double) f` as `RR32$AsFloat` (RR32.java:390-392); `unsignedIntToDouble` `(double) toLong(a)` (simpleUnsignedIntArith.java:226-228), the unsigned value, as `NN32$AsFloat`'s `Unsigned.toDouble(x)` (NN32.java:257-259). Walk boxes the helper's `double` at the declared `RR64` as the same `Float` object as before (F-303), so no value moves under walk: the walk guard passes on the base and on the edit with the same assertions.

I took rung-A.patch's text as it is in the library file, all five headers and strings; in the two Java files I kept its two helpers and their bodies and changed two things: their comments, and the place of `longToDouble`. The patch's comments named the glue class each helper copies ("as walk's Long$AsFloat computes it"); the glue classes go at the switch-over (F-32), so each comment now says what the helper computes ("the nearest double, ties to even", and for `ZZ` "an infinity past the double range"), which the guards assert. The patch put `longToDouble` under the comment "// The original \"Java-like\" arithmetic operators", which heads the arithmetic section that begins at `longAdd`; it is a conversion, so it now sits right above that comment, still right before `longAdd` in the class's order of methods and at the place fork 2 gives (before the addition helper), with no other helper between. Neither change moves a line that rungs R or N write (R writes right after the division helper, N at the class's end, fork 2).

## The tests, their failing and passing runs

Both written first, committed in 5ea480cb6, before the edit (76a900f19).

- Walk guard, `ProjectFortress/tests/NativeHelperFamilyAsFloatWalk.fss`: every one of the five at ordinary values and its type's bounds, 32 assertions, each type's results also checked to be an `RR64` (ZZ32 minimum, -1, 0, 1, 2^24 + 1, maximum; RR32 narrow(0.1), 0.0, -0.0, the largest, the smallest subnormal, the two infinities; NN32 0, 1, 2^31, 2^32 - 1; ZZ64 minimum, -1, 2^53 + 1, maximum; ZZ 10^20, a negative 30-digit value, 2^53 + 1, plus and minus 10^320, past the double range). On the base, `explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-natives-asfloat/h1 ProjectFortress/tests/NativeHelperFamilyAsFloatWalk.fss`, 2026-11-03T01:37:37Z, tree 97a416b18:

      . interpret tmp/rung-natives-asfloat/h1/tests/NativeHelperFamilyAsFloatWalk
       OK (time = 8730ms)
      OK (1 test)

  Shown red on a deliberate change (the expectation of NN32's 2^32 - 1 replaced by "-1.0", the signed reading), the same harness, 01:37:55Z, base code:

      FAIL: J13/0:4.294967295E9 =/= J4/0:-1.0; NN32 asFloat of 2^32 - 1 is unsigned
      Tests run: 1,  Failures: 1,  Errors: 0

  On the edit, the same command, 01:40:10Z: '. interpret ... NativeHelperFamilyAsFloatWalk', ' OK (time = 10911ms)', 'OK (1 test)'. And in `ant testSystem` on the final code (below), every shard 'Failures: 0'.
- Compiled guard, `ProjectFortress/compiler_tests/NativeHelperFamilyAsFloatCompiled.fss` and `.test` (link, run, `run_out_contains=PASS`): one top-level declaration per helper of the five, over `ZZ32` (NN32's carried in a `ZZ32`, as the rewrite's transfer passes it), `RR32`, `ZZ64` and `ZZ`, answering `RR64`, 24 assertions at the same values but RR32's -0.0 and -infinity and the five `RR64` type checks (below, decisions). On the base, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests NativeHelperFamilyAsFloatCompiled.test`, 2026-11-03T01:38:04Z, tree 97a416b18:

      . link ProjectFortress/compiler_tests/NativeHelperFamilyAsFloatCompiled ProjectFortress/compiler_tests/NativeHelperFamilyAsFloatCompiled.fss:8:45-103:
          builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleLongArith.longToDouble
      File NativeHelperFamilyAsFloatCompiled.fss has 1 error.
      Tests run: 2,  Failures: 2,  Errors: 0

  On the edit, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh edit ProjectFortress/compiler_tests NativeHelperFamilyAsFloatCompiled.test`, 01:40:03Z: '. link ... OK (time = 5633ms)', '. run ... (749ms) PASS', 'OK (2 tests)'. In `ant testQuick` on the final code: '[junit]  link .../compiler_tests/NativeHelperFamilyAsFloatCompiled  OK (time = 834ms)' and '[junit]  run .../compiler_tests/NativeHelperFamilyAsFloatCompiled (372ms) Passed'.

The guards' expected values are Java's: `(double)` of an `int`, `float` and `long`, `BigInteger.doubleValue()`, printed by `Double.toString`, computed by a scratch Java program before the tests were written and matching the planner's ValA, which printed these five's 40 results (with UnsignedLong's) the same on the old code and on the text (CLIMB-BATCH-25.md, "The values under walk").

## Whole suites, once, on the final code (76a900f19)

- `nice -n 19 ant testQuick` (01:48 to 01:54 UTC): 'Tests run: 86, Failures: 0' (library), 'Tests run: 263, Failures: 0' (othercompiler), 'Tests run: 1381, Failures: 0' (compiler), 'BUILD SUCCESSFUL', 'Total time: 6 minutes 18 seconds'. Against climb batch 24's gate summary (explorations/compile-ladder/climb-batch-24/gate/summary.txt:2-3, :55): 1379, 86 and 263, the compiler track's two more being this rung's link and run. No verdict changed. An earlier launch of this role started the same run and was stopped by a restart of the machine before its end; its partial log was not used.
- `nice -n 19 ant testSystem` (01:55 to 01:59 UTC): 'Tests run: 180, Failures: 0', '183, Failures: 0', '182, Failures: 0', '179, Failures: 0', 724 tests, 'BUILD SUCCESSFUL', 'Total time: 4 minutes 13 seconds'. Against the gate's 176 + 185 + 181 + 181 = 723 (summary.txt:57-60), one more, the walk guard. No verdict changed.

Both run as fork 12 asks: the compiler's prelude imports `simpleLongArith` and `simpleArbitraryPrecisionArith`, so each new helper gets a wrapper that every compiled program's prelude carries.

## The stages

Every changed path is under ProjectFortress/LibraryBuiltin/ or nativeHelpers/, so both stages can move; each ran once on the final code, after the build of the last edit.

- The count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-natives-asfloat/checker-count-postedit.txt tmp/rung-natives-asfloat/cc-post`, 01:59:35 to 02:02:17 UTC, about 162 s: '#total 0', '#locations 0', '#crash none', '#shadow matches the tracked StaticChecker'. `diff explorations/compile-ladder/climb-batch-24/gate/checker-count.txt tmp/rung-natives-asfloat/checker-count-postedit.txt` printed nothing: the tables are equal.
- The distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-natives-asfloat/distance-postedit.txt tmp/rung-natives-asfloat/dist-post`, 02:02:26 UTC start: '#total 0', every '#kind' 0, '#crash none', '#seconds 219 FortressLibrary 157', '#shadow every shadow edit matched the tracked sources'. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-24/gate/distance.txt tmp/rung-natives-asfloat/distance-postedit.txt` printed 'DISTANCE SAME   0'; `diff` of the two tables differs only in the '#seconds' row (198, FortressLibrary 152, before) and the '#machine' row. tmp/rung-natives-asfloat/dist-post/errors.tsv holds its header only, as explorations/compile-ladder/gate/distance-sites.tsv does: no site came and none went, row by row. So the checker reads the five at `RR64` against their helpers with no error, where the planner's control at `Float` gave '#total 1' at FortressBuiltin.fss:375.

The count stage's seconds are reported as the brief asks; no checker code changed, so no speed pass (fork 15).

## Where the fix belongs, and the precedent search

The binding is the library's (`FortressBuiltin.fss`), its helper the compiled path's helper class of its number type (fork 2; explorations/coordinator/map/modules-and-phases.md, B.12 "Natives"). The library's own way is P-58's bare form, `builtinPrimitive("<class>.<method>")`, as 173 bindings already take it (F-299). Precedent: climb batch 24's small rest (F-307), which moved `Long`'s and `BigNum`'s `asString` onto `longToString` and `toString` beside these; in the same file 97 lines named `nativeHelpers` on the base and 102 after (`grep -c nativeHelpers ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, on `git show 97a416b18:` and on the tree).

The ways the language and the library offer, for the declared result:
1. `RR64`, the type of `Number`'s abstract `asFloat` (FortressLibrary.fsi:291) and of numbers.tex:49: taken (fork 3).
2. `Float`, kept, with a helper answering walk's `Float`: no Java type is read by the checker as `Float`, so a static helper over plain Java values cannot answer it (fork 3; F-303).
3. `Float`, kept, the binding left on its glue class: leaves the five off P-58 and the compiled path, as PLAN's natives line left them.
4. A Fortress body over another binding (for example `asFloat(self): RR64 = widen(self).asFloat`): not P-58's bare form, and a second dispatch per call.

## What the specification settles

numbers.tex:47-49 says the conversion into `RR64` is explicit, written `asFloat(x)` "with the method that the library declare on Number", and Library/FortressLibrary.fsi:290-291 declares it `abstract asFloat(self): RR64`. The five now answer that type. The specification says nothing of the rounding; the helpers round to nearest, ties to even, as Java's conversions do and as the glue classes did, and the guards assert it at 2^53 + 1 and the `ZZ64` maximum. A `ZZ` past the double range answers an infinity, as `BigNum$AsFloat` did; the specification does not say otherwise (grep -n 'asFloat' Specification/basic-lib/*.tex: numbers.tex:49 only).

## Programs run old against new

The walk guard is the comparison: the same 32 assertions pass on the base's code (01:37:37Z) and on the edit (01:40:10Z), so every value it reaches is the old code's. No other program was run on the old code; the planner's ValA ran these five's 40 values old against new with no difference (CLIMB-BATCH-25.md, "The values under walk").

## The ladder subset

Empty: no file of explorations/compile-ladder/baseline-2026-09-19/raw/ and no first error of its ladder.tsv names `asFloat`, `AsFloat`, `toDouble`, `longToDouble`, `intToDouble`, `floatToDouble`, `unsignedIntToDouble`, `simpleLongArith` or `simpleArbitraryPrecisionArith` (`grep -rlE 'asFloat|simpleLongArith|simpleArbitraryPrecisionArith|longToDouble|intToDouble|floatToDouble|unsignedIntToDouble|AsFloat' explorations/compile-ladder/baseline-2026-09-19/raw` printed nothing; none of the 85 pass-list programs names `asFloat`), so nothing ran (fork 16: all 85 pass at climb batch 24's gate).

## Competing declarations

`grep -rlw` over ProjectFortress/tests, ProjectFortress/*_tests and ProjectFortress/src/com/sun/fortress for each name added: `longToDouble` only in simpleLongArith.java and the compiled guard; `toDouble` in simpleArbitraryPrecisionArith.java, the compiled guard, and static methods of other classes outside nativeHelpers/ (interpreter/evaluator/values/FNN32.java, FNN64.java, interpreter/glue/prim/UnsignedLong.java, NN32.java), which a helper string names by class and so do not compete; the guards' own top-level names (`zz32AsFloat`, `rr32AsFloat`, `nn32AsFloat`, `zz64AsFloat`, `zzAsFloat`, `isRR64`) only in the guards; `dToString`, `sub64`, `mulZ` and `negZ` also in NativeHelperFamilyFloatCompiled.fss and NativeHelperFamilyIntegersCompiled.fss, as private declarations of other components.

## Demos

Not run: the gather runs the 52 team demos on the merged tree (fork 11), where the brief holds over the skill's tests-running.md, "Outside the gate".

## Sentences made false

- Specification/appendices/changes.tex:4469, the Appendix I entry's Effect, "173 of the 449 bindings of \library\ name a helper: ..." with its list: five more name one. The gather's (fork 10).
- explorations/coordinator/FACTS.md:30, F-32: "of its 449 live bindings, 276 name one" (a glue class): five fewer.
- explorations/coordinator/FACTS.md:134, F-299: "173 of the one library's 449 live bindings name one", and its count by type.
- explorations/coordinator/FACTS.md:138, F-308: "Six of the 82 bindings over these types stay on glue classes: `NN32`'s `asFloat` and `CHOOSE`, ...": `NN32`'s `asFloat` no longer does.
- explorations/coordinator/PLAN.md:52, the natives line, "The families that wait on a known obstacle": "the `asFloat`s of `Int`, `RR32` and `NN32` with the declared result at `RR64` or a helper answering walk's type, since `Float` is narrower than the helper's `RR64` and the checker refuses the move": no longer waiting.
- No note on walk or the compiled path in the specification is made false: numbers.tex:49 and changes.tex:578 say the conversion into RR64 is `asFloat`, which holds.

## Points to report

- rung-A.patch taken in the library file as it is, all five headers `asFloat(self): Float` changed to `asFloat(self): RR64` and all five strings moved (FortressBuiltin.fss:241, :374, :383, :396, :570); in the Java files its two helpers kept, their comments changed and `longToDouble` moved above the section comment (simpleLongArith.java:27-30, simpleArbitraryPrecisionArith.java:30-33), for the reasons above.
- The two guards: walk passing on the base and the edit (harness-one, 01:37:37Z and 01:40:10Z), compiled failing on the base and passing on the edit (junit.sh, 01:38:04Z and 01:40:03Z).
- The count table equal to climb batch 24's, about 162 s; the distance table: '#total 0', '#crash none', 'DISTANCE SAME   0' against climb batch 24's, equal but for '#seconds' (219 s) and '#machine'; no site came.
- No walk value moves; no verdict changes in `ant testQuick` or `ant testSystem`, which each gain this rung's test.
- The sentences made false, listed above.
- No file edited beyond those named.

## Decisions, each with the ways not taken

1. The declared result `RR64` (fork 3), not `Float` with a helper (no Java type reads as `Float`), not the glue classes kept, not a Fortress body over another binding (above).
2. The patch's comments rewritten to say what each helper computes, not "as walk's X$AsFloat computes it": the glue classes are deleted at the switch-over (F-32), so a comment naming them would point nowhere. The way not taken: the patch's comments as they are.
3. `longToDouble` above the comment "The original Java-like arithmetic operators" (simpleLongArith.java:27-30), not under it as the patch put it: the comment heads the arithmetic, of which a conversion is no part; the method still comes right before `longAdd`, with no method between. The way not taken: the patch's place.
4. The compiled guard leaves out RR32's -0.0 and -infinity: on the compiled path `e: RR32 = -0.0` and `g: RR32 = -1000000000000000000000000000000000000000.0` are refused, 'Right-hand side has type RR64, but declared type is RR32.' (a probe in tmp/, the prelude's `FloatLiteral` declaring no prefix `-`, ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:479, so the literal converts to `RR64` first, :434-438), and `floatToDouble` is a plain widening which the other values reach. Walk's guard asserts both. The ways not taken: building them through a helper (a negation helper over `float` exists in no class; rung P adds `simpleFloatArith`), or through `narrow` of an `RR64` (the prelude declares none at RR32). The probe also showed that a numeral with an exponent letter does not parse ('a numeral contains letters and does not have a radix specifier.'), the language's numeral form, so the guards write `1.4E-45` and `3.4028235E38` in full.
5. NN32's compiled guard passes its values as `ZZ32`, the Java `int` that the rewrite's NN32 transfer hands the helper (F-308), as climb batch 24's NN32 guard does (ProjectFortress/compiler_tests/NativeHelperFamilyNN32Compiled.fss:1-5, 'an NN32 carried in a ZZ32'); the unsigned reading is what is asserted (2^31 and 2^32 - 1, item 326). The way not taken: declarations over `NN32`, which the compiled guard's precedent does not use.
6. The ZZ guard reaches 10^320 by squaring 10^20 four times, not by a 321-digit numeral, so that the line stays readable; walk by juxtaposition, the compiled guard by `simpleArbitraryPrecisionArith.mul`.
7. The demos not run, the gather's (fork 11). Both suites run (fork 12).

## Defects and their homes

- On the compiled path, a negated radix-point numeral at a typed binding of `RR32` is refused: `e: RR32 = -0.0` gives 'Right-hand side has type RR64, but declared type is RR32.', where `e: RR32 = 0.0` compiles. Home 3: deferred, the specification silent on a negated numeral's type at `RR32` beyond the coercion rules; it is the compiler prelude's (`FloatLiteral` declares no prefix `-`, `CompilerBuiltin.fsi:479`; `RR32` declares no `-` and no coercion from `RR64`), which the switch-over deletes, a sibling of row 529. Recorded as a note to row 529 (record.md); no gated test, since the program is refused at compile and the prelude goes at the switch-over. Not a defect of this rung's edit; the guard works around it.
- No defect of the five bindings was measured: their values are the glue classes' on both paths.

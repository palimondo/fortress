# Rung I (rung-natives-shift-power): the skeptic's verdict

Head judged: `3a8f0ea01`, the worker's last commit. The branch already carried REPORT.md and record.md, so no text was written from the run's journal.

## What was checked

1. **The tables.** The report's count and distance tables are the worker's runs on `baa3a18fb`, its last code state: the edit of `simpleArbitraryPrecisionArith.java` and the library at 07:53:58Z, the build at 07:54:06Z, and both stages started by one call at 07:55:28Z after the commit (call `BVet89`). Read again from the worker's files: `diff explorations/compile-ladder/climb-batch-26/gate/checker-count.txt tmp/rung-natives-shift-power/checker-count-postedit.txt` prints nothing, the file's `#total	0` and `#crash	none`; `distance/compare.sh ... distance-postedit.txt` prints 'DISTANCE SAME   0'. The diff changes no checker or Scala, so no count stage of mine. These are the tables of the worker's head.
2. **Test first.** The walk guard ran green on the base's code at 07:34:46Z (call `gJViAa`); the compiled test ran red at 07:36:07Z (call `wJ188x`, `tmp/rung-natives-shift-power/junit-base.txt`: 'builtinPrimitive names no static helper: com.sun.fortress.nativeHelpers.simpleIntArith.intPower', 'Tests run: 2,  Failures: 2,  Errors: 0', tree `ed8652dc0`), before the first helper edit (07:37:07Z) and the first build (07:38:44Z). Both passed at 07:54:59Z (call `8NJSd3`, '. run ... (339ms) PASS', 'OK (2 tests)'; walk 'OK (1 test)'), after the last build. Both suites ran after that, on the same code (`s898He`, `vMYmik`).
3. **The diff against P-162, P-69, P-153 and P-58.** Each of the 16 keeps its public header over `AnyIntegral`, converts, and calls a public bare `builtinPrimitive` binding whose string names a static helper (P-58, P-162's public spelling). Counts saturate as `Int.shiftCount` does (`interpreter/glue/prim/Int.java:295-306`), exponents keep sign and parity as `Int.powCount` does (`:271-283`), a fixed-width shift never goes through `ZZ` (P-69), each power answers its base's type and raises `DivisionByZero` or `IntegerOverflow` at a negative exponent as P-153 states. The table of REPORT.md was checked line by line against the tree: every library line and every helper signature it cites is the one named. No file outside the section's list beyond the two private conversions in `FortressBuiltin.fss:389-415`, which the worker lists.
4. **Precedent.** The review's pair pattern (`explorations/reviews/hard-set-natives-2026-11-06.md:292-338`), `IntLiteral`'s converting overloads (`Library/FortressLibrary.fss:856`), Steele's `<<<` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:732-735`): the citations say what the report says.
5. **Tests.** Each has one comment line, is named by its topic, and cites no specification line. The walk guard's 227 assertions cover every type and every edge the section lists.
6. **My programs, old against new.**
   - `tmp/rung-natives-shift-power/skeptic/SkShiftPow.fss`, 91 values that the worker's guard does not hold: counts at the `ZZ64` minimum and maximum, at -2^31 and -2^31-1 as a `ZZ64`, at the `NN32` and `NN64` maxima, `ZZ` shifts at ZZ64 counts of ±2^31 and ±2^40, and powers at exponents just past the `ZZ32` range (2^31, 2^31+1, -2^31-1 of each type), the minimum bases, and the first overflow of 3^k at each width. Walk on the new code (`FORTRESS_CACHES=<private copy> bin/fortress SkShiftPow.fss`) and on the old code (`old-fortress.sh /home/user/fortress-base27 .../tmp/old-caches SkShiftPow.fss`): `diff walk-old.txt walk-new.txt` prints nothing, rc=0 both. Among the lines:

         E7 ZZ 5 RSHIFT ZZ64 -2^31: IntegerOverflow
         E11 ZZ -5 LSHIFT ZZ64 -2^31-1: -1 ZZ
         F2 ZZ (-1)^(ZZ64 2^31): 1 ZZ
         F8 ZZ 2^(NN32 2^31): IntegerOverflow
         I6 NN64 3^40: 12157665459056928801 NN64

   - `tmp/rung-natives-shift-power/skeptic/SkShiftPowC.fss`, the compiled path on the new build: the new and existing helpers bound as the worker's compiled test binds them, at 41 edges of my own (the minimum bases, `(-1)^(2^31-1)`, `NN64` 3^40 carried as -6289078614652622815, `NN32` 3^20 carried as -808182895, the unsigned shifts at the `ZZ32` and `ZZ64` minima, `bigPower(-2, 2^31-1)`, `bigBitRightShift(-5, MIN)`), each asserted at walk's value above: `fortress compile SkShiftPowC.fss && fortress run SkShiftPowC` printed 'SKEPTIC PASS', rc=0. The old code has no such helper, which the worker's recorded failure shows.
   No mutable state is touched, so no run at four threads.
7. **Homes.** The report's three defects have their homes as it states.
8. **Ledger and siblings.** `ledger.py find exponent --open` and `find AnyIntegral --open` name rows 441, 523, 383 and 905; 441 and 442 get the whole lines that record.md gives, 523 and 383 stay with the prelude (P-38). Row 905's Appendix I line citations shift again at `changes.tex:1861` ('lines 510--511 and 552--553'), which climb batch 27's fork 8 leaves to row 905: not this rung's. No other glue binding over `AnyIntegral` is left among the integer types; `Float`'s power is rung F's.
9. **The report.** Its five provenance lines open to what they claim (`basic-integers.tex:47-62` the shifts, `:529-537` the power's negative exponent). Sentences made false: `changes.tex:4495`'s 143, F-32's and F-299's counts, `PLAN.md:10`, `:47`, `:51`, as listed. The suites' verdicts and commits are the head's code.
10. **Competing names.** None of the seven private functions or the ten helper names is declared elsewhere in `ProjectFortress/tests`, `compiler_tests`, `ProjectFortress/src`, `Library` or `LibraryBuiltin` (`git grep -lw`).
11. **Failure modes.** No loud failure becomes a quiet value: every throw of the glue is a throw of the helper at the same inputs (items 6).

## Fixes

- `ac7dedc08`, a correction: record.md's finding 5 said "`powExact`'s multiplications" overflow, naming the glue's `Int.powExact` and `UnsignedLong.powExact`; the bindings now reach `longPower` and `unsignedLongPower` (`simpleLongArith.java:403`, `simpleUnsignedLongArith.java:300`), whose checked multiplications the sentence now names.

No defect of the change was found, so no build and no suite of mine.

## Where I differ from the worker

Nowhere on behaviour. The disk filled during my runs (98 MB free on `/`, shared); I deleted my own private caches after each run.

## Verdict

Approved: the change is right and the record honest with the one correction; nothing contested.

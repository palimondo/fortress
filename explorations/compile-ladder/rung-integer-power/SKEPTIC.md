# Rung I (rung-integer-power): the skeptic's verdict

The head judged is `1059606f1`, the worker's last commit. My commits on `wip/rung-integer-power`, in order:

- `1cff513e5`: the worker's `REPORT.md` and `record.md`, written byte for byte from the run's journal by `journal-text.py` (both exited 0).
- `f39076fa8`: a correction of three messages of the walk test (finding 4).
- `4ae8b80ea`: the compiled half of row 441 gets its gated expected-failure test (finding 5).
- `57142f4c9`: corrections of `REPORT.md` and `record.md` (findings 1 to 3, 6 and 7).
- `2f78e98ce`: NEW-I-1's repair measured (finding 8).
- this file.

**Verdict: approved.** The change does what P-153 and the rung's section ask, and the record is honest once corrected. No fix of mine changes code or a decision the worker argued for, and none is contested.

## 1. What I checked

### 1.1 The tables

The worker's head changes no checker code: `git diff --name-only 97ccd5f1f...HEAD` names nothing under `scala_src/` or the checker's generated code. So I read the worker's files and ran no stage. The tables in `REPORT.md` are those of the worker's head (`0bf22171b`'s code, which later commits leave unchanged).

- **Count.** `tmp/rung-integer-power/checker-count-postedit.txt` has '#total 22' and '#locations 22'. Climb batch 19's `climb-batch-19/gate/checker-count.txt` has '#total 28' and '#locations 27'. Every api row is 0, and '#crash none'. The 22 locations in `cc-post/run.txt` are made up of `FortressLibrary.fss:1465`, 19 array sites from `:2528` to `:2979`, and `:4370` and `:4376`. The report said 17 array sites, and 1 + 17 + 2 is not 22 (finding 1).
- **Distance.** `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-19/gate/distance.txt tmp/rung-integer-power/distance-postedit.txt` printed:

      DISTANCE DOWN   31 -> 25 (-6)
          kind typecheck               29 -> 23     (-6)
          class GF                      1 -> 0      (-1)  generators: a filter that failed for another reason
          class OT                      9 -> 4      (-5)  other body errors (one-off library slips and checker limits)

  The six sites gone match `explorations/compile-ladder/gate/distance-sites.tsv:6-7`, `:10-12` and `:32` (each opened with `awk`). None came. The second export error lost two entries and gained one: MultiplicativeRing's entry is gone, and QQ's entry now names `isNaN` alone. That is 44 entries to 43, read by my own split of the two messages on `(...Decl`. The first export error keeps its 17 entries.
- **Seconds.** The count stage started at 07:34:04 (the transcript's call `5nN12h`), and `stat` of `count-run.txt` gives 07:35:15, so about 71 s. Climb batch 19's gate took about 64 s (the brief). There was no speed pass.

### 1.2 Test first

In the worker's transcript (`agent-a7da6b5cdd4e4c40d.jsonl`), by time and call id:

- 07:14:07 `47Fh1V`: the walk test was written.
- 07:14:24 `nc1eoL`: it ran through the harness on `97ccd5f1f`, with only the test untracked ('?? ProjectFortress/tests/IntegerPowerContractWalk.fss'). It printed 'FAIL: ZZ32 2^(-1) is no integer and throws IntegerOverflow; ...', 'FAILURES!!!' and 'Tests run: 1,  Failures: 1,  Errors: 0'.
- 07:14:40: the three team tests were respelled with `sed`.
- 07:14:52 `owntTy`: the respelled team tests passed on the base, 'OK (3 tests)', with the same 20 printed lines of `compoundArray` as the unchanged file's.
- 07:15:34: `XXXQQPowerExponent` was renamed `QQPowerExponent` (`git mv`).
- 07:15:53 `9RNDor`: `QQPowerExponent` failed on the base: 'Value 3 might not fit in ZZ64.', 'Tests run: 1,  Failures: 1'.
- The first edit of the library or of code came after both failing runs: `git apply` of `power.patch` at 07:17:30 (`ixxg2Y`), the first Java edit at 07:18:11 (`PEgAYp`), and the build at 07:20:39 (`cLn4fE`).
- 07:22:43 to 07:23:06: the test was corrected after the build (the numeral case and the parenthesised `big(…)` bases). At 07:23:27 (`hBaBj2`) the corrected test failed again on the old code, through the base build's harness, with the same FAIL line.
- 07:24:22 `WuHBHM`: the last such run, after the last change of code, printed 'OK (30 tests)' (`h-census.txt:373`).
- `ant testSystem` and `ant testSpecData` followed on that code state: 160, 172, 164 and 169 tests, 0 failures; then 130 tests, 0 failures (`testSystem.txt:769-810`, `testSpecData.txt:188-191`).

The order is as `tests-writing.md`, "The order", gives it: `failureWasRecorded` is true.

### 1.3 The diff, line by line

- **The library.** `git diff 97ccd5f1f -- Library ProjectFortress/LibraryBuiltin | diff - explorations/compile-ladder/plan-20/probes/power.patch` printed nothing, so the library change is the planner's patch byte for byte. `git apply --check` of the patch on the base build printed nothing.
- **The natives.** They read as P-153 and fork 11 give them:
  - `Int.Pow`, `Long.Pow`, `NN32.Pow` and `UnsignedLong.Pow` read the exponent by `Int.powCount` and take the negative branch by `Int.negativePow` or `UnsignedLong.negativePow`.
  - `BigNum.Pow` and `IntLiteral.Pow` go through `BigNum.pow`.
  - `powCount` keeps the exponent's sign and parity beyond 64 bits: `Long.MAX_VALUE - 1` is even, `Long.MAX_VALUE` odd, `Long.MIN_VALUE` even and `Long.MIN_VALUE + 1` odd. It treats an `FNN64` of 2^63 or more as positive.
  - `FNN32.getLong` is unsigned (`FNN32.java:31-33`), so an `NN32` exponent is never negative.
  - An `FIntLiteral` exponent can exist only below `Long.MIN_VALUE` (`FIntLiteral.java:40-56`), and it never reaches the `AnyIntegral` overload: `IntLiteral` extends `Number`, not `AnyIntegral`.
  - `powExact` loops at most 63 times at any exponent (`Int.java:402-415`), so 0, 1 and -1 at an exponent beyond 64 bits answer at once.
- **The tests and demos.** The team lines are those of fork 15, a `.0` on each base numeral and nothing else (`git diff` of the six files).
- **The specification.**
  - The method entry's three sentences and the two boxes say what P-153 says.
  - The Appendix I entry gives the change, its reason, the way back, the decision with its date (P-153's commit `d3b5b812d`, 2026-10-20) and the departures with their rows (441, 523).
  - P-96 asks for "a repository document" holding the full reasoning. The entry cites the Fable judgement and the probe's report, as `14e91723f` cited its rung's report.

### 1.4 Precedent

The worker's devices are the library's own:
- the `typecase` over the comprised integer types (`Library/FortressLibrary.fss:398-408`);
- `Int.overflow()` (`Int.java:258-261`) for `Int.divisionByZero()`;
- `Int.shiftCount` (`Int.java:295-306`) for `powCount`, with the deviation the report names.

The library also declares `shouldRaise[\Ex extends Exception\](expr: ()->()): ()` (`Library/FortressLibrary.fsi:254`), which `NumberOrderListDeclarations.fss:25-30` uses for `DivisionByZero`. The brief prescribed `PowChooseLcmRungE`'s `overflows` helper and one in its shape, so the worker's `dividesByZero` is the brief's and I left it.

### 1.5 The test's messages

Every citation names a file and a section with an entry, never a line. Three messages say what the cited entry does not say (finding 4). The test has one comment line and is named by its topic.

### 1.6 Programs of my own: the differential

These are under `tmp/rung-integer-power/skeptic/`. They ran under walk with the rung's build (`bin/fortress`, private caches) and with the old code (`old-fortress.sh /home/user/fortress-base20 ... P.fss`), at `FORTRESS_THREADS=1`. The diff shows no mutable variable, field, atomic block or write to a library's state, so there was no four-thread run (the harness runs the gated tests at four).

`SkPowEdgesB.fss` under walk, old | new:

    ZZ32 (-2)^(-1) = -0.5 : RR64|ZZ32 (-2)^(-1) raises IntegerOverflow
    ZZ64 (-1)^(minL) = 1.0 : RR64|ZZ64 (-1)^(minL) = 1 : ZZ64
    NN32 allOnes^(-1) = -1.0 : RR64|NN32 allOnes^(-1) raises IntegerOverflow
    NN64 2^(2^63 NN64) = 1.0 : RR64|NN64 2^(2^63 NN64) raises IntegerOverflow
    QQ (1/2)^(unsigned(3)) raises IntegerOverflow|QQ (1/2)^(unsigned(3)) = 1/8 : QQ

Equal in both: 'ZZ32 2^31 raises IntegerOverflow', 'ZZ32 (-2)^31 = -2147483648 : ZZ32', 'NN32 allOnes^2 raises IntegerOverflow', 'QQ (-2/3)^(-3) = -27/8 : QQ', 'strToInt -45 = -45 : ZZ32', 'strToFloat 1.25 = 1.25 : RR64'.

`SkPowEdges.fss` adds `ZZ` exponents. The old code stops at the first one, 'Value -1 might not fit in ZZ64.'. The new code gives:
- 'ZZ32 (-1)^(big(-1)) = -1 : ZZ32';
- 'ZZ 1^(-big(2)^70) = 1 : ZZ';
- 'QQ (2/3)^(big(-2)) = 9/4 : QQ';
- 'RR64 2.0^(big(3)) = 8.0 : RR64'.

Every value on the new code is what contract E gives.

`SkPowCompiled.fss`, compiled and run on the old code and the new, printed the same lines: '2^(-1) =  0', '(-1)^(-1) =  -1', 'strToInt =  123', 'PASS'. The compiled path's own library is untouched, so walk and the compiled path now disagree at `2^(-1)`. The specification answers that the compiled path is wrong, which is row 441's compiled half (finding 5).

`SkPowCompiledWide.fss` and `SkPowCompiledNN.fss`, compiled on the head: 'Could not check call to operator ^' at a `ZZ64` base and at a `ZZ32` base with an `NN32` exponent. These come from the compiled prelude, which declares a power only at `ZZ32`, `NN32` and `NN64` over their own type (`CompilerBuiltin.fsi:267`, `:326`, `:385`). They predate the rung, and row 442 holds them.

`SkRow747.fss`, the worker's shape, compiled on the old code: 'Variable __cond is not defined.', 'File SkRow747.fss has 1 error.'. This confirms that the compiled path cannot state row 747.

`SkBiCG.fss` and `SkBiCG2.fss` are the demos with their timing line written `asFloat(t) / 1000000000.0`, run on the head. Both exit with rc 0 after their 29 residuals, BiCGSTAB with 'elapsed time 62581849885 ns ( 62.581849885 s)' (finding 8).

### 1.7 The homes, the ledger and the sibling sites

- `ledger.py find --cites` on each edited native lists rows 336, 350, 445, 502, 525, 441 and 578.
- My `ledger-find` searches covered "power", "DivisionByZero", "strToInt", "exponent", "Pow", "BiCGSTAB", "nanoTime" and "ZZ64 RR64 asFloat".
- Row 336 (walk's division by zero is a raw `ArithmeticException`) is a sibling. Its fix names the helper the rung adds, `Int.divisionByZero()`, but it is not this rung's repair: a note (finding 7).
- Row 533 names a declaration the rung changes (finding 3).
- Row 578 is the numeral object's `ZZ32` (finding 2).
- The other path: `jIntExp` (row 523) is phase 4's.
- The only other integer `Pow` with a float result is the unbound `ZZ32$Pow` (`ZZ32.java:201-211`).

### 1.8 The report

The five provenance lines were opened with `sed -n` at their lines on the base and the head. `Int.java:295-306` is `shiftCount` on the head. The tsv lines are the six sites and the export error.

The whole-suite runs are `ant testSystem` and `ant testSpecData` on `0bf22171b`'s code, which is the head's code: my commits change no Java, Scala or library line.

F-84 and row 533 were missing from the sentences made false (finding 3). The record's FACTS entry overclaimed (finding 2).

### 1.9 Competing declarations

`divisionByZeroException`, `divisionByZero`, `powCount`, `negativePow` and `BigNum.pow(BigInteger, long)` are each declared once in `ProjectFortress/src/com/sun/fortress/`. `IntegerPowerContractWalk`, `QQPowerExponent` and my `XXXIntegerPowerContractCompiled` are each one component across both test corpora.

### 1.10 Failure modes

No loud failure becomes a quiet value that the specification does not give. Each quiet value the change gives is the specification's answer:
- `(1/2)^(big(3))` was a `ProgramError`, now `1/8`;
- `0^huge` was a `ProgramError`, now `0`;
- `(-1)^huge` gives its exact power by parity.

Each quiet wrong value of the base now throws:
- `(big(3))^(2^32)` was 1;
- an `NN64` 2^(2^63) was `1.0`;
- `2^(-1)` was `0.5`.

## 2. Findings and fixes

1. **The count's array sites are 19, not 17** (`REPORT.md`, section 4, at `1059606f1`). The arithmetic is 22 = 1 + 19 + 2 (`cc-post/run.txt:29-67`). Correction, `57142f4c9`.
2. **Walk's numeral power does not answer its own type.** At `1059606f1`, `record.md`'s FACTS entry said the contract "holds at ... and the numeral type", and `REPORT.md`, section 12, said "Under walk ... every integer power answers its base's own type". The worker's own probe printed '0 : ZZ32' for `IntLiteral^3`, and its test asserts the value only for that reason. That is row 578's defect: the object's arithmetic answers `ZZ32` (`IntLiteralValue` pins it). The FACTS entry, section 12, section 2's explanation and the revival change now name row 578. Correction, `57142f4c9`.
3. **Two sentences made false were not listed.**
   - F-84: "Left: `QQ`'s power (rows 438, 445)." Both rows close.
   - Row 533's claim names the tie of `RR64`'s `opr ^(self, b:RR64)` with `MultiplicativeRing`'s `opr ^(self, other:ZZ64)`. The second is now `abstract opr ^(self, other:AnyIntegral): T` (`Library/FortressLibrary.fsi:283`), with `RR64`'s new `opr ^(self, b:AnyIntegral):RR64` (`:366`) beside it. `IntLiteral` coerces into `AnyIntegral` (`fsi:443`). Whether the tie stays is not measured, and the gather's note says so.

   Both are now in `REPORT.md`, section 7, and `record.md`. Correction, `57142f4c9`.
4. **Three walk-test messages cite an entry that does not say what they assert** (`ProjectFortress/tests/IntegerPowerContractWalk.fss:121`, `:126`, `:133` at `1059606f1`). They assert an overflow at a positive exponent, a `ZZ32` 2 and a `ZZ` 3, and cited only `basic-integers.tex`, section "Integers", opr ^. That entry says nothing of an overflow at a positive exponent. `opr-overview.tex`, subsection "Multiplication, Division, Modulo, and Remainder Operators", says it: "For integer results, overflow throws an \TYP{IntegerOverflow}." (`Specification/basic/operators/opr-overview.tex:155`).
   - Each message now cites both, as `PowChooseLcmRungE.fss:58-60` does.
   - `:133` said "beyond 32 bits" for 2^31, which 32 bits hold, and now says "beyond the int's range".
   - Settled by `tests-writing.md:135` ("cite the specification by file and section or entry") and the brief's check 5.
   - Seen on the head: `harness-one.sh .../skeptic/h-new ProjectFortress/tests/IntegerPowerContractWalk.fss` printed 'OK (1 test)'. On the old code it still fails at its first assertion: 'FAIL: ZZ32 2^(-1) is no integer and throws IntegerOverflow; ...', 'Tests run: 1,  Failures: 1,  Errors: 0'.
   - Correction, `f39076fa8`.
5. **Row 441's compiled half had no home 2.** The rung measured the compiled path's `2^(-1)` as 0 and its `0^(-1)` as a raw `RuntimeException` (`REPORT.md`, section 5). It named them as a departure in Appendix I's Effect, but recorded them only in a ledger note. With the revised method entry the specification settles them (`Specification/basic-lib/basic-integers.tex:534-537`), and the defect is deferred to phase 4. Its home is then "a gated `XXX` test that asserts the specification's answer. Write it in the change that measured the defect, even if a later change will repair it." (`.claude/skills/fortress-repo/references/tests-writing.md:84`).
   - The test: `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.fss`, with `XXXIntegerPowerContractCompiled.test` (run) and `IntegerPowerContractCompiledLink.test` (link), the run-time pair of `tests-writing.md`, "Writing an `XXX` test". It asserts that `ZZ32` `2^(-1)` throws `IntegerOverflow` and `0^(-1)` throws `DivisionByZero`.
   - Fork 13's note on the row stays (`explorations/coordinator/CLIMB-BATCH-20.md:75`), and the row stays open. The test is that note's reproducer, and `record.md` asks the gather to name it.
   - On the old code, `old-fortress.sh /home/user/fortress-base20 .../tmp/old-caches junit .../IntegerPowerContractCompiledLink.test .../XXXIntegerPowerContractCompiled.test` printed:

         . run .../XXXIntegerPowerContractCompiled (297ms) REACHED
         FAIL:  0 =/= OVF; ZZ32 2^(-1) is no integer and throws IntegerOverflow; basic-integers.tex, section "Integers", opr ^
         Saw expected failure (Exit code != 0)
         OK (2 tests)

   - On the head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xxxneg ProjectFortress/compiler_tests IntegerPowerContractCompiledLink.test XXXIntegerPowerContractCompiled.test` printed the same lines.
   - With the first assertion removed for one run: 'java.lang.RuntimeException: java.lang.RuntimeException: Overflow Error:', 'Saw expected failure'.
   - With both removed for one run: 'PASS', 'Did not see expected failure', 'Tests run: 2,  Failures: 1,  Errors: 0'. The file was then restored (`cmp` with the kept copy).
   - Correction (a home-2 test), `4ae8b80ea`. It adds three files under `compiler_tests/`, beyond the files the section names for this rung, which is a point to report.
6. **NEW-I-2 cited `Library/FortressLibrary.fsi:1113`,** the base's line. On the head `DivisionByZero` is at `:1114`, since `RR64`'s new api line is at `:366`. The report also said 21 `fail(` calls where the base has 20, plus the declaration. Correction, `57142f4c9`.
7. **Row 336's note.** Walk now has the helper its fix names, `Int.divisionByZero()` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:263-266`). The note goes in `record.md` for the gather. Correction, `57142f4c9`.
8. **NEW-I-1's repair was stated, not run.** I ran it with `SkBiCG.fss` and `SkBiCG2.fss` (section 1.6), and the row now says so. Correction, `2f78e98ce`.

No defect of the change itself was found: no fix of mine changes Java, Scala or a library line, so no build and no suite was needed.

## 3. Where I differ from the worker

- **The `ZZ` power beyond the int's range** (the worker's third question for the curator). The specification already bears on it. "For integer results, overflow throws an IntegerOverflow" (`opr-overview.tex:155`). The revival's own shift entry on `ZZ` reads "a result too large for the implementation to represent throws an \TYP{IntegerOverflow}" (`Specification/basic-lib/basic-integers.tex:738-739`). Beyond `Integer.MAX_VALUE` bits a `BigInteger` holds no power of a base other than 0, 1 and -1. The question stays the curator's, with this evidence.
- **The demos' timing line** (the worker's second question). With `asFloat(t)` both demos complete (finding 8), so the respelling the worker proposes is measured.
- **"No `XXX` test is added"** (`REPORT.md`, section 2). This is true of the worker's work. I added one, and the report now says so in a parenthesis.
- **The decision record.** P-96's "a repository document holds the full reasoning" is met by the two documents the entry cites, as `14e91723f` met it with its rung's report. I agree with the worker's default.

## 4. Points to report the rung reaches, beyond the worker's list

- A file edited beyond those named: `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.fss`, `.test` and `IntegerPowerContractCompiledLink.test`, a new compiled test pair, an expected failure on the base and the head.
- Walk values that move, beyond the worker's list:
  - `QQ (1/2)^(unsigned(3))` and `^(NN64 3)` raised `IntegerOverflow` on the base and are `1/8` now (row 445, part 2);
  - an `NN32` or `NN64` all-ones base at a negative exponent was `-1.0` and now raises `IntegerOverflow` (row 441's sign extension);
  - an `NN64` 2 to the `NN64` 2^63 was `1.0` and now raises `IntegerOverflow`.

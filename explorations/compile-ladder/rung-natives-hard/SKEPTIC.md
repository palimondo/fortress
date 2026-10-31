<!-- Rung H of climb batch 24 (rung-natives-hard): the skeptic's verdict on the worker's head 967e595ca (code c4424fd10, tests 3c070ec17), cut from b0f6cd6b7. Written 2026-10-31 on branch wip/rung-natives-hard. -->

# Rung H: the skeptic's verdict

**Verdict: approved.** The change is the planner's `rung-H.patch`, its Java differing only in two comments and one equivalent expression, and its 76 strings equal to the patch line for line. Its tests came first, through the harness, on the base's code. The record had two inexact lines, and I corrected them in one commit, `4af5d05bc`. No fix of mine is contested, and none changes code.

## The report and the record on the branch

The branch already held both files, at `967e595ca`. So the brief's two `journal-text.py` lines wrote nothing (`[ -e … ] ||`). I wrote the journal's texts to scratch, and `diff` against the committed `REPORT.md` and `record.md` printed nothing, so the branch carries the journal's texts byte for byte.

## What I checked

1. **The tables.** The worker's count table, `diff`ed against `explorations/compile-ladder/climb-batch-23/gate/checker-count.txt`, prints nothing. Its distance table differs from `climb-batch-23/gate/distance.txt` only in the `#seconds` and `#machine` rows (`#total 0`, every `#kind` 0, `#crash none`), and its `errors.tsv` holds only its header. Both stages ran at 11:43-11:50 UTC, on the build of 11:28, after the last code change (applied 11:26:46, reworded 11:27:20-27). The count log's `seconds=132` is the report's. The diff changes no Scala under `scala_src/` and nothing the build generates for the checker: the rewrite runs at the parse (`compiler/BuiltinPrimitiveRewriter.java`). So "The checker's time" asks for no count run of a reviewer, and I ran none. **The report's tables are those of the worker's head.**
2. **Test first**, in the worker's transcript `agent-a9bf180e5f37c2b45.jsonl`:
   - Walk on the base: call `BdrMx3`, 11:21:12. `git status` shows the six tests untracked and nothing else changed. The harness's header reads 'tree b0f6cd6b7', and its verdict 'Tests run: 6,  Failures: 2,  Errors: 0': the two division tests, each 'Caused by: java.lang.ArithmeticException: / by zero'. The guards are 'OK', and `XXXNN32RemainderByZeroWalk` 'OK Saw expected exception'.
   - Compiled on the base: call `BMgz7Z`, 11:25:32, 'File NativeHelperTransferCompiled.fss has 71 errors.' and 'Tests run: 10,  Failures: 4'. The guards link and run 'PASS'.
   - The patch was applied in call `DSMmzV` at 11:26:46 and built in call `Q1f5ak` at 11:27:34, so both base runs came before the edit and its build.
   - After the edit: call `7XaWv4` at 11:29:41 gives 'OK (16 tests)', with '. run … NativeHelperTransferCompiled (754ms) PASS' and the `XXX` run 'REACHED', then 'Saw expected failure (Exit code != 0)'. Call `1M3Wcj` at 11:30:14 gives 'NN32 DIV by zero: DivisionByZero', 'NN64 DIV by zero: DivisionByZero' and 'OK (14 tests)'.
   - The deliberate fix, call `Cw9pk3`, gives ' Missing expected failure' and 'Tests run: 1,  Failures: 1'.
   - `CharAsStringSupplementaryWalk`, a pin of today's value with no failing run, is 'OK (1 test)' on the edit and on the old code (call `85EHZU`).
   - These are recordedFailure's and recordedPass's lines.
3. **The diff, line by line.** I applied `plan-24/probes/rung-H.patch` to the base's three files in scratch. `diff` against the head prints three differences, all in `BuiltinPrimitiveRewriter.java`:
   - the class comment, `:23-31`;
   - the in-code comment, `:132-134`;
   - `declared.add(0, owner == null ? null : owner)` written `declared.add(0, owner)`, `:126`.

   The library files are identical. No path outside the section's files list changes: `git diff --name-only b0f6cd6b7...HEAD` lists the rewrite, the two library files, the tests and this folder. Against P-58, each binding keeps the bare form ✓. Against the hard-set probe's §4.2 2b:
   - a transfer goes in only where the helper's Java type is `int` or `long`, `NamingCzar.fortressTypeForForeignJavaType` reads the position otherwise, and the declared type is `NN32`, `NN64`, `Char` or `Character` (`:176-193`) ✓;
   - a transfer's own position gets none (`:182`) ✓;
   - the rewrite runs only on the compiled path's repositories (F-298, unchanged) ✓.

   Both stage drivers call `Shell.useInterpreterLibraries()` before they parse (`explorations/coordinator/tools/checker-count/WorldFlip.java:41`, `tools/distance/DistanceMulti.java:48`). So the parse-time reading in `transfer` is the one-library reading (`NamingCzar.java:368-372`, `:493-504`). On the merged tree, that leaves rung S's four transfer strings (`signed` twice, `codePoint`, `char`) without a second transfer, by reading `:182`. The gate's stages measure it.
4. **The library's way.** The worker found the team's device, the six transfers composed around each helper (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:768`, `:815`, `:1112`, `:1065`), and the rewrite writes that composition. No device was invented. The sibling sites of the repaired defect have homes:
   - `REM` and `MOD` by zero on `NN32`, `NN64` and `ZZ`: row 848, rewritten, with `XXXNN32RemainderByZeroWalk`;
   - those on `ZZ32` and `ZZ64`: rung Z's row 336, still on glue at `NN32.java:137-141`, `:164-168`, `UnsignedLong.java:138-142`, `:164-168` and `BigNum.java:166`, `:205`, lines I opened.
5. **The tests.**
   - The guards call every one of the 20, 17 and 39 bindings, at the brief's values. I counted the 23 predicates of `NativeHelperFamilyCharWalk.fss` against `FortressBuiltin.fss:671-716`.
   - Each file has one comment line, and its name is its topic.
   - The division tests cite `opr-overview.tex`, "Multiplication, Division, Modulo, and Remainder Operators", whose `:164-165` says "For integer results, division by zero throws a \TYP{DivisionByZero}."
   - The `XXX` pair cites "Addition and Subtraction Operators", whose `:205-206` gives `\dotminus` as wraparound subtraction.
   - The pair has the skill's form: `tests=XXX…` with `link` in `NN64WrappingNegationHelperCompiledLink.test`, and `run` with `run_out_contains=REACHED` in `XXXNN64WrappingNegationHelperCompiled.test`. The program prints 'REACHED', then fails at the defect's assertion, 'FAIL:  the wraparound negation of the NN64 1 is 2^64-1'.
6. **My own programs**, below.
7. **The homes**:
   - the `DIV` half of row 848: home 1, repaired;
   - its rest: home 2;
   - row 860: home 2;
   - NEW-H-1: home 3, with a pin and a row draft that passes the template.

   My programs measured no defect of the rung. One is a property of the device, which I report as the failure mode below.
8. **The ledger.**
   - `ledger.py find --cites BuiltinPrimitiveRewriter.java` gives row 849 only (varargs, untouched).
   - `ledger-find` for supplementary, surrogate, transfer and "Char asString" finds nothing, so NEW-H-1 is new.
   - "NN32 helper" gives rows 521, 848 and 855. The rung touches 848's text only; 521 and 855 are rung K's.
   - Row 860's rewrite keeps its claim and moves its walk run into the reproducer's compiled pair.
   - Row 848's notes cite lines I opened, each saying what the row says.
9. **The report.**
   - Its five provenance lines: I opened `hard-set.md:8`, `NativeHelperTransferCompiled.fss:5`, `opr-overview.tex:164-165`, `CompilerBuiltin.fss:768` and the rewrite's lines, and each says what is claimed.
   - The counts: `git diff --numstat` gives '95 12' for the rewrite. `grep -c 'builtinPrimitive("com.sun.fortress.nativeHelpers\.'` gives 36 and 61 on the head, 19 and 2 on the base, so 97 of 449. The suites are 1348, 86 and 263, and 182+167+179+173 = 701, against the gate's 1338, 86, 263 and 694 (`climb-batch-23/gate/summary.txt:2-3`, `:55`, `:57-60`).
   - The sentences made false: `changes.tex:4466`, `:4472` and `:4484-4488`; row 848; F-298, F-299 and F-32; `compiler.md:85`; `CLIMB-BATCH-24.md:431`. I found no other. `interpreter.md`'s "Natives", F-24 and `FortressBuiltin.fsi:19` stay true. F-24 only grows: corrected below.
   - The suites: `ant testQuick` 'BUILD SUCCESSFUL' and `ant testSystem` 'BUILD SUCCESSFUL', on the edit's code, after its last change.
   - The commits are c4424fd10's code: the `.fss` test written at 11:33 is in testSystem's 701.
10. **Competing names.** I searched for each of the 15 component and test names the rung adds, in `ProjectFortress/src`, every `ProjectFortress/*tests*` folder, `test_library` and `Library`. Each is declared once, and none clashes with a test of the six sibling rungs (`git diff --name-only` of each). The rewrite's new methods `alias`, `simpleName`, `transfer` and `soleMethod` are private.
11. **The failure mode**: below.

## My programs, the differential

Each program ran on the old code from the base build, through `/home/user/fortress-base23/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base23 /home/user/fortress-natives-hard/tmp/old-caches`, and on the rung's build. The compiled runs used `FORTRESS_CACHES` set to a private copy of the worktree's caches. Nothing was built.

- **SkHWalk1**, under walk, 2,571 `println`s, generated by a short script. It calls the 39 `Char` bindings at ten characters that the worker's programs did not reach: `char(-1)`, `char(1114112)`, `char(1114111)`, `char(65535)`, `char(0)`, `char(2147483647)`, `char(-2147483648)`, `char(56319)`, `char(57343)` and `char(127)`. Each comparison runs pairwise, with `<=`, `>`, `>=`, `CMP` and `MIN` as the library derives them from the moved `<`.

  It then calls library code that reaches the moved bindings:
  - `strToInt` at radices 2, 10, 16 and 36, with non-digits and Arabic-Indic digits;
  - `||` with a `Char`;
  - for `NN32` and `NN64` at seven values each: `|x|`, `^2`, `signed`, `widen`, `narrow`, and pairwise `<=`, `>`, `>=`, `=/=`, `MIN`, `MAX`, `CMP`, `DIV`, `REM` and `MOD` at nonzero divisors;
  - three parallel `BIG AND` reductions over 20,000 calls of `DOTPLUS`, `+` after `widen`, and `toLowerCase` with `toUpperCase`.

  The commands are `FORTRESS_THREADS=t old-fortress.sh … SkHWalk1.fss` and `FORTRESS_THREADS=t bin/fortress SkHWalk1.fss`, for t = 1 and 4, all four `rc=0`. Old against new prints nothing at either thread count, and old at 1 against old at 4 prints nothing. Lines of the new output:

      c 0 asString 1 "\'0ffff'"
      strToInt 255
      32 4,6 MIN 2147483647
      64 5,4 REM 9223372036854775807
      parallel32 true

  `strToInt("zz", 36)` fails on both codes: `digit(self, radix)` answers `Nothing` outside radices 2 to 16 by its own condition (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:657`). That is no defect of the rung.
- **SkHWalk2**, under walk: an `NN32` negation's `IntegerOverflow`, caught and printed, then an uncaught one. Old and new print the same lines and exit 1 (`diff` prints nothing):

      caught IntegerOverflow: Integer Overflow | a IntegerOverflow: Integer Overflow
      uncaught next
      IntegerOverflow

  So a helper's raise looks the same to a program as the glue class's.
- **SkHComp1**, compiled: bindings in shapes the worker's tests do not have:
  - `NN32` with `ZZ32` (`unsignedIntLeftShiftByIntMod32`);
  - `NN32` with `ZZ64` (`…ByLongMod32`);
  - `NN64` with `ZZ32` (`unsignedLongLeftShiftByIntMod64`);
  - an `NN32` argument with an `RR64` result (`unsignedIntToDouble`);
  - a transfer composed around another transfer: `cpN(c:Character):NN32` on `charCodePointWith…` and `fromN(a:NN32):Character` on `charMakeCharacterWith…`;
  - `upN(a:NN32):Character` on `charToUpperCase`;
  - `ovl(a:ZZ64):NN32` on `longOverflowingToUnsignedInt`;
  - a bound declaration passed as a function value.

  On the old code: 'File SkHComp1.fss has 9 errors.', the first 'Could not check call to function builtinPrimitive_simpleUnsignedIntArith_unsignedIntLeftShiftByIntMod32 - (ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type (NN32, ZZ32).'. On the new code: 'compile rc=0', then 'REACHED', '2.147483648E9', 'PASS', 'run rc=0', at `FORTRESS_THREADS` 1 and 4.
- **SkHComp3**, compiled: three misfits.
  - `wrongWidth(a:NN64):NN32` on `unsignedIntBitNot`;
  - `wrongResult(a:NN32):NN64` on `unsignedIntBitNot`;
  - `wrongChar(c:Character):NN64` on `charToUpperCase`.

  The old code gives 3 errors and the new code 3 errors, so the misfits stay loud. Two messages move from the argument to the result: 'Function body has type ZZ32, but declared return type is NN64.'
- **SkHComp2 and SkHWalk4**: the failure mode, below.

## The failure mode

The transfers are identities (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:230-231`), so the rewrite turns the checker's refusal of a binding over `NN32`, `NN64` or `Char` into a composition whatever the helper computes. SkHComp2, compiled:

    badLt(a:NN32, b:NN32):Boolean = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intLT")
    badAdd(a:NN32, b:NN32):NN32 = builtinPrimitive("com.sun.fortress.nativeHelpers.simpleIntArith.intOverflowingAdd")
    … println("badLt(2^31, 1) = " badLt(h, one)) ; println("badAdd(2^31, 2^31) = " badAdd(h, h))   (h: NN32 = 2147483648)

On the old code, `old-fortress.sh … compile SkHComp2.fss` refuses it:

    Could not check call to function builtinPrimitive_simpleIntArith_intLT
    - (ZZ32, ZZ32)->Boolean is not applicable to an argument of type (NN32, NN32).
    File SkHComp2.fss has 2 errors.

On the new code, `bin/fortress compile SkHComp2.fss` and `bin/fortress run SkHComp2` give:

    compile rc=0
    badLt(2^31, 1) =  true
    FortressException: class fortress.CompilerBuiltin$IntegerOverflow with string Integer overflow

So a loud static error becomes a quiet value: `true` where the specification's order of `NN32` gives 2^31 > 1, and an `IntegerOverflow` where the `NN32` sum 2^32 does overflow, though as a signed sum. Walk already answers so (F-299). SkHWalk4, the same `badLt` under walk, prints 'badLt(2^31, 1) = true' and 'library 2^31 < 1 = false' on both codes. So the checker now reads such a binding as walk does. The guards, not the checker, show that each of the 76 names the unsigned helper. My reading of families-base.tsv, and the worker's 2,933 values and my 2,571, all old against new, show that it does.

This does not stop the rung. Way 2b is the team's device, taken by Question 2 (`explorations/coordinator/CLIMB-BATCH-24.md:90-100`). I added the sentence to the record's FACTS hand-over.

## Corrections, commit `4af5d05bc`

- **The FACTS hand-over** (`record.md:18`) said "A helper overloaded at its arity, or a binding in a generic owner, gets no transfer." In a generic owner only `self` goes without one: `header` names the owner `""` (`BuiltinPrimitiveRewriter.java:91`), `self` takes that name (`:124-127`), and every other position is read at its own declared type (`:139-144`). The report's own `REPORT.md:158` says so. The hand-over now says so, and adds the failure mode's sentence. Settled by the code, `BuiltinPrimitiveRewriter.java:91`, `:124-127`, `:139-144`.
- **The entries made stale** (`record.md:20-24`) gain F-24. Its "so `ZZ32`'s `DIV` by zero raises `DivisionByZero` (F-299)" now holds for `NN32` and `NN64` too, and its gating tests gain the two division tests. Rung Z's record rewrites the same sentence for `ZZ64` and `ZZ`. Settled by the tests' passing lines above.

These are record text only, so no test or suite applies. My commits change no code, so no whole-suite run was owed.

## Where I differ from the worker, not fixed

- Decision 6 (NEW-H-1 at home 3): the row's spec cell says "silent". The specification does say that a character literal "evaluates to a value of type \TYP{Char}, which represents an abstract Unicode character" (`Specification/basic/lexical-structure.tex:816-817`), and that a string is "a sequence of \unicode\ characters" (`expressions/literals.tex:57-58`). It names no `asString` of `Char`, so I leave the worker's home. The curator may read the two sentences as settling it, which would make the row home 2.
- The worker's question on `CLIMB-BATCH-24.md:431` stands as it put it, with its default.

## Points to report

As the worker lists them, each checked above, and also **team lines changed**: the 76 strings, in declarations of the team's 2012 tree (`a874948ac`: `value object NN32`, `FortressBuiltin.fss:387`; `value object Char`, `:574`; `trait NN64`, `Library/FortressLibrary.fss:770`), now at `FortressBuiltin.fss:391-466`, `:612-722` and `FortressLibrary.fss:917-984`. All are reversible, and none holds the push.

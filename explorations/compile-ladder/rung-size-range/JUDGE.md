# Judge (refusal): rung E, `rung-size-range` (climb batch 6.5b)

*Gather's note (climb batch 6.5b, 2026-09-29): the provisional rows this file names keep their numbers in the ledger, 519, 520 and 522 to 527. The provisional row 521 it names, withdrawn into row 337, is not the ledger's row 521: that number went at the gather to the second judgement's recommended row, the compiled `CHOOSE`'s table bound, gated by `ProjectFortress/compiler_tests/XXXChooseTableCompiledRungE`.*

**Ruling: repair.** The skeptic's refusal stands on its ground: the record says three things the tree and the ledger do not. The code change is sound and stays. The repair round corrects the record, repairs one sibling site in the rung's own visitor (home 1), gives home 2 to four defects the skeptic measured, and gives home 3 to two more. It changes no library line and no file outside the rung's section.

I ran nothing. I read the briefing slice (`explorations/coordinator/tools/facts-extract.sh`, parts 1 to 4), the net diff `382b9fe7f...801a446a6`, the worker's structured result (its `reportText` and `recordText`, since the harness refused `REPORT.md` and `record.md`), `SKEPTIC.md`, the specification passages both cite, and the code and captures named below, each by `sed -n` on the rung's tree (`801a446a6`) unless marked "at 382b9fe7f".

## 1. What each side got right and wrong

### 1.1 The anchors (skeptic right)

On the rung's tree `Library/RangeInternals.fss:1390-1393` is `sized1Range`: `:1391` the positive size, `:1392` the fitting empty size, `:1393` `else CompactFullParScalarRange(0,-1) end`. `:1394` is the header of `sized2Range`, `:1398` that of `sized3Range`. `emptyScalarRange()` is `:1387`, and was `:1375` only at 382b9fe7f. So the deviation's `:1394` is wrong (`:1393`), the precedent's `:1375` is the base's line unmarked (`:1387`), and the record's row 450 note cites `(:1391-1394)` and `(:1395-1402)` for what is `:1390-1393` and `:1394-1401`.

One more of the same kind, which neither side flagged: `NN32$Pow`'s negative branch, the sign-extended `UnsignedLong.pow(base, -exp)`, is `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java:232` on the rung's tree (`:231` is `if (exp < 0) {`). The worker's forPavol entry and its row 441 note say `:231`; its section 6 says `NN32.java:230-231` for what is `:231-232`. Section 3's "(`:231`)" is inside a list headed "at 382b9fe7f", where it is right. Four anchors off in one record is enough to require a systematic check (step 2).

### 1.2 The compiled power (skeptic right)

The report's precedent calls `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:380-398` "the compiled path's checked power", and its divergence entry says that on `ZZ32` power overflow "the compiled helpers raise IntegerOverflow". `intToIntPower` (`:380-398`) is bound nowhere: no line of `ProjectFortress/LibraryBuiltin/`, `Library/` or `ProjectFortress/src/` names it besides its declaration. The prelude's `ZZ32` `^` is `jIntExp` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744`), imported from `simpleIntArith.intExp` (`:75`), which casts `Math.pow` to `int` and throws `new RuntimeException("Overflow Error:")` only above `Integer.MAX_VALUE` (`simpleIntArith.java:400-406`). No Fortress `catch` sees that, and a result below the minimum saturates. The skeptic measured both: `2^31` ends the run (`explorations/compile-ladder/rung-size-range/probes/skeptic/natives-both.txt:83-84`, `:185-186`), `(-3)^21` and `(-2)^33` are `-2147483648` (`:129-130`). The `NN32` `^` (`CompilerBuiltin.fss:809`, `:118`) is `simpleUnsignedIntArith.unsignedIntExp` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:218-224`), which throws `IntegerOverflow` above 2^32-1 but casts a double in [2^31, 2^32) to `int`, which saturates at 2147483647 (`natives-both.txt:152-156`). The `NN64` `^` (`CompilerBuiltin.fss:878`, `:156`) is `unsignedLongExp`, marked `// NIY`, `return a + b;` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:222-225`; `natives-both.txt:166`, `:171`).

The binomial half of the worker's claim is right: `ZZ32` `CHOOSE` is `jIntOverflowingChoose` (`CompilerBuiltin.fss:741`, `:44`), `simpleIntArith.java:203-220`, which raises `IntegerOverflow`.

The specification settles the power against the compiled path: "Exponentiation of an integer to a nonnegative integer power produces an integer result" (`Specification/basic-lib/basic-integers.tex:527-529`), and "For integer results, overflow throws an `IntegerOverflow`" (`Specification/basic/operators/opr-overview.tex:154-155`). Walk after the edit gives those answers. The divergence lands unrepaired, rule 4's fourth case: the fix is in `ProjectFortress/LibraryBuiltin/` (a stop in the rung's section, `explorations/coordinator/CLIMB-BATCH-6.5.md:116`) and `nativeHelpers/` (not named there). So it is owed home 2 in this rung (step 6), and three rows. Row 441 records `intExp` for negative powers only (its notes' last sentences).

### 1.3 Row 521 is row 337 (skeptic right)

Row 337 is "the interpreter's `CHOOSE` answers `1` where the specification requires `0`, for every `k > m ≥ 0`", NEGATIVE-VERIFIED since the repair batch, and its notes give the fix: "a `k < 0 || k > n` test at the head of `Int.choose` ... before the `k = n - k` fold" (`explorations/fortress-gap-ledger.md:348`). The rung's `Int.java:329` and `UnsignedLong.java:298` are that fix, and `Specification/basic-lib/basic-integers.tex:598` ("If n<0 or n>m, the result is 0") settles it, rule 4 outcome 2. `Int.choose` is a helper of `Choose`, inside the rung's files (`CLIMB-BATCH-6.5.md:116`). So it is neither a new row nor a decision beyond scope: provisional 521 is withdrawn, the fix is appended to row 337, and the forPavol entry is withdrawn. Row 327 (`library_tests/ChooseTest3.fss:125`) is its test-side twin; `library_tests/` run compiled (`ProjectFortress/library_tests/Integer.test:10-14`), so walk's fix does not reach it.

### 1.4 Walk's static arithmetic wraps (skeptic right; home 1, a decision below)

`EvalType.forIntBinaryOp` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:468-475`) adds, subtracts and multiplies two `long`s unchecked, so `Box[\4294967296 4294967296\]` and `Box[\9223372036854775807 + 9223372036854775807 + 2\]` bind a size of 0 with no error, on the base and after the edit (`probes/skeptic/sizes-walk.txt:58`, `:63`; `sizes-walkbase.txt:36`, `:41`). The decision on a size's range refuses a size beyond `NN32` (`explorations/coordinator/POSITIONS.md:123`); the literal half of that refusal is the rung's `forIntBase` (`:449-455`), three lines above. It is row 418's silent form reached through arithmetic, in a file and a visitor the rung already edits (`CLIMB-BATCH-6.5.md:116`, "`EvalType.java` and what else ... walk's reading needs"). The repair is three checked operations: home 1, in this round (step 5).

### 1.5 Row 522 misses a site (skeptic right on the site, wrong on one reason)

`ScalarRange.check()` computes `(l-r) MOD str` (`Library/RangeInternals.fss:152-161`, the difference at `:156`), and `fullScalarRange` calls it for every range it builds, stride 1 included (`:1366-1368`). `0:MIN:MIN`, two elements that fit, passes `imposeStride` (`dist = MIN - 0` fits, `:802`) and raises at `:156` from `:1368` under `imposeStride`'s `:806`, on the base and after the edit (`probes/skeptic/ranges-walk.txt:25`, `:46-55`, `:87`, `:135`, `:177`). So row 522's site list and its stated fix ("test the sign before the distance ... split at zero") are incomplete.

The skeptic's reason for the added assertion, that an `imposeStride`-only fix would turn `ProjectFortress/tests/XXXStridedSpanWalk.fss` red, does not hold by reading. After such a fix `|MAX:MIN:1|` takes `imposeStride`'s else branch to `fullScalarRange(MAX, MIN, 1)`, whose `check()` computes `MAX - MIN` at `:156`. `|MIN:MAX:3|` builds `fullScalarRange(MIN, MAX, 3)`, whose `check()` computes `MIN - MAX`. Both still raise, so the test stays an expected failure. The assertion `|0:MIN:MIN| = 2` is still required, for another reason: it is the one measured range whose only failing site is `:156`. With it the test gates each site of the row. The row is not the rung's to repair: `check()` and `imposeStride` are not among the bodies of rows 450 and 451 (`CLIMB-BATCH-6.5.md:116`). Home 2, extended (step 7).

### 1.6 The array storage sites (skeptic right on the facts; home 3 for a different reason)

`PrimitiveArray.java:40`, `PrimImmutableArray.java:43` and `PrimImmutableRR64Array.java:36` (under `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/`) read `s0` with `getInt()`. `FLong.getInt()` is `(int) val` (`interpreter/evaluator/values/FLong.java:23-26`). Since `putNat` makes a size from 2^31 to 2^32-1 a `ZZ64` value (`BaseEnv.java:630`), `array1[\ZZ32, 3000000000\](7)` dies with a raw `java.lang.NegativeArraySizeException: -1294967296` (`probes/skeptic/misc-walk.txt:80-81`). The base refused it at binding with a Fortress `ProgramError` for the wrong reason, "Negative nats are unNATural" (`:87-88`). The run was loud before and is loud after; the failure is now a raw Java exception with no Fortress location. The rung's count of sites where walk narrows a size (report section 3) must include them.

The skeptic calls the specification silent on where walk refuses. That is not quite so. Pavol's decision places the refusal: "the array design refuses a JVM array length over 2^31-1 where it makes storage" (`POSITIONS.md:123`). Home 3 is still right, for two reasons. The fix is in three glue files the rung's section does not name, a stop (`CLIMB-BATCH-6.5.md:116`, `:124`). And no gated test can tell a raw exception from a refusal: both end the run, and neither can be caught. The row says so, with the committed probe (step 9).

### 1.7 A try expression as an operand (skeptic right)

`"a" || (try f() catch e InvalidRange => "c" end)` compiles and fails verification at load, "Inconsistent stackmap frames" (`probes/skeptic/natives-both.txt:88-89`, `probes/skeptic/SkTryOperand.fss`). Walk prints `ac`. A `try` expression's value is its `catch` clause's (`Specification/basic/expressions/try.tex:56-64`). This is the JVM's rule that row 322 records (the operand stack is cleared at a handler), reached from `try` rather than `atomic`. Row 322's fix is in `forAtomicBlock` and `generateTaskCompute` and would not reach it. It gets its own row, not a note on 322, and home 2 in `XXXUnionReturnRungS`'s form, since the class fails before any output (step 8).

### 1.8 The quiet `ZZ64` at a `ZZ32` return (skeptic right)

Under walk, `as32[\nat k\](b: Box[\k\]): ZZ32 = k` at `k = 2147483648` returns `2147483648` of kind `ZZ64` (`probes/skeptic/sizes-walk.txt:125`). The base refused there, loudly and wrongly, "Negative nats are unNATural: -2147483648" (`sizes-walkbase.txt:53`). The compiled run raises "Not in range for ZZ32" (`sizes-compiled.txt:41`). The cause is walk's unchecked declared return, row 22's mechanism: a numeral `2147483648` from a `ZZ32` function answers the same (`sizes-walk.txt:138`), as does `plain32(widen(5))` (`:124`). Item 25 refuses such a size, but neither the decision nor the specification says where (climb batch N's `JUDGE-review.md` section 2.3). So its home is the note on row 325, where that ruling put the `nat` size face. It also belongs in the evidence of the stop "the type of a size read as a value changed", and in forPavol (step 10).

### 1.9 What the worker got right

- The code change. I read the diff. The checker refusal and walk's reading and refusal at binding do what the report says. So do the natives, with the gcd-first binomial exact because `gcd(accum/g, j/g) = 1` puts `j/g` in `m`, and the range reorders, whose strided step cannot leave `ZZ32` at either sign of `r` or of the stride. The skeptic re-ran the rung's tests through both harnesses, 18 of 18 and 9 of 9 (`probes/skeptic/harness-walk.txt:26`, `junit-placed.txt:88`), and agrees.
- `c1`'s run-test form, `run_out_does_not_contain=REACHED` with `run_err_contains=java.lang.VerifyError`: the batch record asks for exactly this, "`c1`'s run test in the form the harness takes for a run that fails before any output" (`CLIMB-BATCH-6.5.md:112`), and both stand-ins go red (`probes/skeptic/junit-standin.txt:20`).
- Every other defect home the worker gave: rows 418, 450, 451 and 347 at home 1; row 503, the row 340 shape, and rows 447 and 505 at home 2.
- The checker count, 75, table identical to `explorations/compile-ladder/climb-batch-N/gate/checker-count.txt`, with the base unchanged under it.
- The decision on `MIN # 0` and its siblings, the library's own empty range where `lo+ex-1` leaves `ZZ32`, which is taken under a silent specification (`ranges.tex:78-79` fixes the set, not the printed bounds). It stays in forPavol.
- The 16-for-7 repeat of the compiled refusal: a design limit, recorded. The skeptic recommends removing it and does not require it. Neither do I.

## 2. The decision I take, under the decision on a size's range

Walk's static arithmetic (`EvalType.java:468-475`) raises the out-of-range error when an operation leaves `ZZ64`, with `Math.addExact`, `subtractExact` and `multiplyExact`. The message is `forIntBase`'s (`:452`), naming the expression. The value it computes is still range-checked at binding by the kind (`:258-260`, `:270-273`). The decision on a size's range (`POSITIONS.md:123`) settles that a size beyond `NN32` is refused. What it leaves open is an intermediate result beyond `ZZ64` whose final value would fit. Candidates:
1. Refuse at the operation. Cost: three calls and a `catch`. An expression such as `4294967296 4294967296 - 4294967296 4294967296` would be refused where its value, 0, fits.
2. Compute exactly, making `IntNat` carry a `BigInteger`. Cost: `IntNat`, `longify` and every reader of `getValue()` change, all for expressions no program writes.
3. Leave the wrap, with an `XXX` test and a row. Cost: the silent wrong size the decision forbids stays, in a visitor the rung already edits.

I take candidate 1. The compiled checker refuses arithmetic in a size altogether (`TypeWellFormedChecker.scala:41-47`), so walk refusing one more case diverges from nothing the compiled path accepts.

## 3. The repair

Provisional row numbers: 521 is withdrawn (row 337). 519, 520 and 522 keep their numbers, so that `SKEPTIC.md` and this file stay readable. The new rows take 523 to 527. The gather assigns the final numbers. Steps 2 to 4 and 6 to 8 need no build and come before step 5's Java edit, so that the compiled runs use the build the rung left. Every capture is named `.txt` and goes under `explorations/compile-ladder/rung-size-range/probes/repair/`. Shorthand used below:
- `probes/` means `explorations/compile-ladder/rung-size-range/probes/`.
- `reportText` and `recordText` are the texts of `REPORT.md` and `record.md` from the rung worker's structured result. The harness refused both files.

1. **Setup.** Work in `/home/user/fortress-sizerange` on `wip/rung-size-range`, with the shell set up as the shared prefix says.
   - Read this file, `SKEPTIC.md` sections 2, 5, 11 and 16, and the worker's `reportText` and `recordText`. Every text change below is made to those two texts.
   - The harness (`run-harness.sh`), the compiled runner (`junit.sh`) and the stand-in layout (`probes/standin/`) are the rung's own, in `explorations/compile-ladder/rung-size-range/`.
2. **Anchors.**
   - In both texts, the deviation's `Library/RangeInternals.fss:1394` becomes `:1393`.
   - The precedent's and section 3's `:1375` becomes `:1387`.
   - Row 450's note: `(:1391-1394)` becomes `(:1390-1393)`, and `(:1395-1402)` becomes `(:1394-1401)`.
   - `NN32.java:231` in the forPavol entry and in row 441's note becomes `:232`.
   - Section 6's `NN32.java:230-231` becomes `:231-232`.
   - Then check with `sed -n`, against HEAD, every `file:line` citation in both texts of the ten edited files and of the rung's own test files. Mark "at 382b9fe7f" every citation that is true only there. Commit the list, with each result, as `probes/repair/anchor-check.txt`.
3. **The compiled power** (section 1.2).
   - Replace the precedent "the compiled path's checked power and binomial (`simpleIntArith.java:380-398`, `:203-220`)". The new text: the compiled path's checked binomial is `simpleIntArith.java:203-220`, bound as `jIntOverflowingChoose` (`CompilerBuiltin.fss:44`, `:741`). No checked power is bound on the compiled path: its `ZZ32` `^` is `simpleIntArith.intExp` (`CompilerBuiltin.fss:75`, `:744`; `simpleIntArith.java:400-406`), and `intToIntPower` (`:380-398`) is bound nowhere.
   - Split the divergence entry "ZZ32 power and CHOOSE overflow ..." in two:
     - `CHOOSE`: the compiled helper raises `IntegerOverflow`, and walk now agrees.
     - `^`: the compiled `ZZ32` power ends the run uncatchably above the maximum and saturates below the minimum. The `NN32` power saturates at 2147483647 on [2^31, 2^32). The `NN64` power answers `a + b`. The specification settles all three against the compiled side (`basic-integers.tex:527-529`, `opr-overview.tex:154-155`), and walk is right after this rung. They get home 2 by step 6, rows 523-525.
   - Cite section 1.2's lines of this file.
4. **Row 337** (section 1.3).
   - Remove provisional row 521 from `recordText`.
   - Row 337's status gains ", POSITIVE-VERIFIED (the fix)". Append to its notes: "Fixed by climb batch 6.5b rung E with the fix this row states: `Int.choose` and `UnsignedLong.choose` return 0 first when `k<0` or `k>n` (`glue/prim/Int.java:329`, `UnsignedLong.java:298`), so `CHOOSE` on `ZZ32`, `ZZ64`, `NN32` and `NN64` answers 0 there, as the compiled helper does (`simpleIntArith.java:205`). Home 1: `ProjectFortress/tests/PowChooseLcmRungE.fss:70-72`, `:82`, `:92`, `:103`; measured in `compile-ladder/rung-size-range/probes/natives/natives-compare.txt` (NatP11-13, NatP26, NatP37, NatP49). Row 327's compiled test is not reached by walk's fix (`library_tests/` run compiled, `library_tests/Integer.test:10-14`)."
   - Remove the forPavol entry "Decision taken beyond the overflow scope" and section 13's `CHOOSE` item.
   - Section 12 item 5 names row 337.
   - In the FACTS lines and the handover line, "rows 347, 519-521" becomes "rows 337, 347, 519, 520".
5. **Walk's static arithmetic** (section 1.4; home 1; the decision of section 2).
   - (a) **Two new tests** in `ProjectFortress/tests/`, in the form of `XXXNatBeyondNN32Walk.fss:1-17`. Each has one comment line and prints `REACHED`, the value read, then `PASS`.
     - `XXXNatArithProductWalk.fss` reads `size64(Box[\4294967296 4294967296\](0))`.
     - `XXXNatArithSumWalk.fss` reads `size64(Box[\9223372036854775807 + 9223372036854775807 + 2\](0))`.
     - Grep `ProjectFortress/tests/`, `compiler_tests/`, `library_tests/`, `demos/` and `Library/` first, to show that both names are new.
   - (b) **The failure, before the edit.** On the current build:
     - Run both tests through `run-harness.sh`. Each must be red, "Expected failure or exception, saw none", with walk reading 0.
     - Grep `ProjectFortress/tests/`, `ProjectFortress/demos/` and `Library/` for static arguments written with `+`, `-` or juxtaposition. Run each test or demo file found under walk.
     - Capture `probes/repair/arith-before.txt` and `probes/repair/static-arith-before.txt`, then commit and push.
   - (c) **The edit.** In `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:468-475`, compute with `Math.addExact`, `Math.subtractExact` and `Math.multiplyExact`. On `ArithmeticException`, `return error(n, errorMsg("Static argument ", n, " is out of range for a nat parameter, whose values are those of NN32, 0 to 4294967295, and for an int parameter, whose values are those of ZZ32, -2147483648 to 2147483647"));`, which is `forIntBase`'s message at `:452`. Leave `bug(...)` for other operators as it is.
   - (d) **The pass.**
     - Rebuild with `ant compileAll`, in the background as the prefix says. If it deleted `default_repository/caches/global.map`, restore it with `git checkout`.
     - Through `run-harness.sh`, run the two new tests, the rung's ten walk tests (`PowChooseLcmRungE`, `NatBigSizeWalk`, the three refusal tests, the three promoted range tests, `XXXRangeTupleShiftWalk`, `XXXStridedSpanWalk`) and the eight neighbours of `probes/skeptic/harness-walk.txt`. All must be OK, the two new ones as expected failures with the new message.
     - Re-run the files of (b) under walk.
     - Capture `probes/repair/arith-after.txt` and `probes/repair/static-arith-after.txt`, each with the machine line. Expected: no file's output changes, since only a result beyond `ZZ64` does.
   - (e) **The record.**
     - Row 418's note: the skeptic found the wrap at `EvalType.java:468-475`, the repair fixed it, and the two tests gate it.
     - The FACTS entry "A size beyond `NN32` or `ZZ32` is refused on both paths": walk also refuses static arithmetic that leaves `ZZ64`.
     - Report section 3: `forIntBinaryOp` counted as a fourth live site.
     - Report section 13: section 2's decision, as the judge's, with its candidates and costs.
6. **The compiled powers** (section 1.2; home 2).
   - (a) **Three components** in `ProjectFortress/compiler_tests/`. Each has one comment line and prints `REACHED` first. Each has an `XXX` run test (`run`, `run_out_contains=REACHED`) and a plain link test (`link`), in the form of `XXXInferResultOnlyCoerced.test` and `InferResultOnlyCoercedLink.test`.
     - `XXXPowZZ32CompiledRungE.fss` has the helper `pz` of `probes/skeptic/SkNatBoth2.fss:3`. It asserts `assert(pz(-3, 21), "OVF", "ZZ32 (-3)^21 throws IntegerOverflow; basic-integers.tex:527-529, opr-overview.tex:154-155")`, then the same for `pz(2, 31)` (2^31), then prints `PASS`. The quiet face comes first.
     - `XXXPowNN32CompiledRungE.fss` has `r: NN32 = unsigned(2)^unsigned(31)` and `twoTo31N: NN32 = unsigned(1073741824) + unsigned(1073741824)`. It asserts `assert(r = twoTo31N, "NN32 2^31 is 2147483648; basic-integers.tex:527-529")`, comparing values rather than strings, since the compiled path renders `NN32` signed (row 326).
     - `XXXPowNN64CompiledRungE.fss` has `r: NN64 = unsigned(widen(3))^unsigned(widen(2))`. It asserts `assert(r = unsigned(widen(9)), "NN64 3^2 is 9; basic-integers.tex:527-529")`.
     - The link tests are `PowZZ32CompiledRungELink.test`, `PowNN32CompiledRungELink.test` and `PowNN64CompiledRungELink.test`.
     - Check that all names are new, as in 5(a).
   - (b) **Placing them.** Run all six through `junit.sh` on the current build. The links must be OK and the run tests expected failures.
   - (c) **The stand-ins.** Show each run test red on a stand-in under `probes/repair/standin/`, whose one change computes the power by repeated multiplication in a local helper. The compiled `ZZ32` and `NN32` products raise `IntegerOverflow` (`POSITIONS.md:65`, `:99`).
   - (d) Capture `probes/repair/pow-pairs.txt` and `probes/repair/pow-standin.txt`.
   - (e) **Rows 523, 524 and 525**, in `recordText`: the compiled `ZZ32` `^` (`intExp`), the `NN32` `^` (`unsignedIntExp`) and the `NN64` `^` (`unsignedLongExp`). Each row has:
     - the specification's lines;
     - the probes (`probes/skeptic/SkNatBoth2.fss`, `SkPowZZ32Ovf.fss`, and the `natives-both.txt` lines of section 1.2);
     - the pair, as home 2;
     - the fix: bind a checked power for a nonnegative exponent. Negative exponents stay with row 441: `intToIntPower`'s own negative branch answers otherwise than walk, so binding it as it stands would decide row 441.
7. **Row 522** (section 1.5).
   - (a) In `ProjectFortress/tests/XXXStridedSpanWalk.fss`, after its second assertion, add `twoFit = 0:zMin:zMin` and `assert(|twoFit|, 2, "a strided range whose two elements, 0 and the minimum, fit; ranges.tex:68-70, :140-143")`.
   - (b) Run a copy holding only that assertion under walk, to show the raise at `Library/RangeInternals.fss:156`. Run the file through `run-harness.sh`, where it must be an expected failure. Capture `probes/repair/strided-156.txt`.
   - (c) Row 522 gains the third site: `ScalarRange.check()`'s `(l-r) MOD str` (`:156`, in `:152-161`), reached from `fullScalarRange` (`:1366-1368`) for every stride, 1 included. Measured for `0:MIN:MIN` (`probes/skeptic/ranges-walk.txt:25`, `:46-55`, `:135`). By reading, `|MAX:MIN:1|` and `|MIN:MAX:3|` reach it too after an `imposeStride`-only fix.
   - (d) The row's fix becomes: `imposeStride` tests the sign before the distance and counts without leaving `ZZ32`; `check()` tests divisibility by the stride without computing `l-r`, the stride `MIN` included; and the strided size counts a nonempty span beyond `ZZ32` without leaving it.
8. **A `try` expression as an operand** (section 1.7; home 2).
   - (a) **The tests.**
     - `ProjectFortress/compiler_tests/XXXTryOperandRungE.fss` holds `probes/skeptic/SkTryOperand.fss`'s program. Its `run()` prints `REACHED` first, then `s = "a" || (try f() catch e InvalidRange => "c" end)`, then `assert(s, "ac", "a try expression's value is its catch clause's; try.tex:56-64")`, then prints `PASS`.
     - `XXXTryOperandRungE.test` has `run`, `run_out_does_not_contain=REACHED` and `run_err_contains=java.lang.VerifyError`, the form of `XXXUnionReturnRungS.test`.
     - `TryOperandRungELink.test` has `link`.
   - (b) Place the pair through `junit.sh`: the link must be OK and the run test an expected failure. Show the run test red on a stand-in that binds the `try` expression to a local first, or calls a helper that returns it. Capture `probes/repair/try-operand.txt`.
   - (c) Open row 526, citing `try.tex:56-64`. Name row 322 as the same JVM rule reached from `atomic`, whose fix does not reach `try`; `CodeGen.forTry` is `CodeGen.java:2019`. State the mechanism as by reading unless it is measured.
9. **The array storage sites** (section 1.6; home 3).
   - Report section 3's count gains `PrimitiveArray.java:40`, `PrimImmutableArray.java:43`, `PrimImmutableRR64Array.java:36` and `FLong.java:23-26`.
   - Report section 14 records the change in the failure's form (`probes/skeptic/misc-walk.txt:80-81` against `:87-88`).
   - Open row 527 with:
     - the probe, `probes/skeptic/SkArraySize.fss` and its captures;
     - class: interpreter defect;
     - spec: none names it, and `POSITIONS.md:123` places the refusal where storage is made;
     - why home 3: the fix is in three glue files outside the rung's section, and no gated test can tell a raw exception from a refusal;
     - the fix: read `s0` as a `long` in the three `oneTimeInit` methods, and raise a Fortress error naming the size where it exceeds 2147483647.
10. **The quiet return** (section 1.8).
    - The stop "the type of a size read as a value changed" gains the evidence `probes/skeptic/sizes-walk.txt:124-125`, `:138` and `probes/skeptic/sizes-compiled.txt:41`.
    - The rung's row 325 note gains a sentence: row 22's mechanism, and the place undecided per climb batch N's `JUDGE-review.md` 2.3.
    - The report's failure-mode record names it: loud to quiet here; loud to loud in a worse form for arrays; loud to the specification's values for the ranges and `CHOOSE`.
11. **For Pavol.** The structured `forPavol` holds:
    - section 4's entries;
    - the worker's entries that stay: the `MIN # 0` decision, row 522, the design limit of the compiled refusal, row 340's shape, and row 441's `NN32.java:232`.
    Add a section listing them to `probes/lists-for-pavol.txt`.
12. **The report's other sections.**
    - Section 12, the homes: add items for sections 1.4 to 1.8 of this file, each with its home.
    - Section 11: the measurements of step 5.
    - `defectHomes` and `divergences` in the structured result follow.
13. **Close.**
    - Write `REPORT.md` and `record.md` from the corrected texts. If the harness refuses, carry the full corrected texts, not a diff, in `reportText` and `recordText`.
    - Run the prefix's tracked-path check over both texts and fix what it prints.
    - Commit and push on `wip/rung-size-range`.
    - Do not run `ant testFast` or `ant testSystem`.

## 4. For Pavol, out of the loop

- My decision of section 2 (candidates and costs there).
- Divergences that land unrepaired, walk right after this rung and the compiled side wrong by `basic-integers.tex:527-529` and `opr-overview.tex:154-155`: the compiled `ZZ32`, `NN32` and `NN64` `^` (rows 523-525, home 2). Also the compiled `try` expression as an operand (row 526, home 2, `try.tex:56-64`).
- Loud to quiet: under walk a `ZZ32`-declared function answers a size of 2^31 to 2^32-1 as a `ZZ64` value (section 1.8). Where item 25's refusal goes is his (`JUDGE-review.md` 2.3).
- Loud to loud, in a worse form: walk's array of a static size from 2^31 to 2^32-1 dies with a raw `NegativeArraySizeException` (row 527, home 3), where his decision places a refusal at storage.
- The worker's decision on `MIN # 0` and its siblings (section 1.9), kept.

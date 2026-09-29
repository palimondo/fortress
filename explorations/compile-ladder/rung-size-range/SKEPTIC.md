# Skeptic, second judgement: rung E, `rung-size-range` (climb batch 6.5b)

*Gather's note (climb batch 6.5b, 2026-09-29): the provisional rows this file names keep their numbers in the ledger, 519, 520 and 522 to 527. The provisional row 521 it names, withdrawn into row 337, is not the ledger's row 521: that number went at the gather to the second judgement's recommended row, the compiled `CHOOSE`'s table bound, gated by `ProjectFortress/compiler_tests/XXXChooseTableCompiledRungE`.*

**Verdict: approved, with required corrections.** The repair round did what the judge ordered (`JUDGE.md` section 3, steps 2 to 13), and every claim I checked holds on the rung's tree (`0734a3eb4`). Walk's static arithmetic now refuses an operation that leaves `ZZ64` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:468-480`); its two tests were red before the edit and are expected failures after. The compiled power pairs and the `try`-operand pair are placed, and each goes red on its stand-in. The record's anchors and its account of the compiled power are corrected. My own differentials found one more defect, on the compiled path: `CHOOSE` ends the run with a raw `ArrayIndexOutOfBoundsException` when `k` is past the helper's table. So the record's sentence that the compiled binomial raises `IntegerOverflow` holds only below that bound. The defect is not the rung's to repair, but its home-2 test is owed in this batch. A ready pair, with its placed and stand-in runs, is under `probes/skeptic/r2/owed/`. The corrections are in section 12.

Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. The load at the starts ranged from 2.11 (the walk runs, 14:07 UTC) to 5.13; each capture's first line gives its own. The build is the repair round's: `EvalType$5.class` is dated 13:37 UTC, newer than `EvalType.java` (13:36), and holds the three `Math.*Exact` calls. No source under `ProjectFortress/src` is newer. Walk on the base used `tmp/baseA-home` (`git archive 382b9fe7f`, base build) through my runner `probes/skeptic/sk.sh`. Compiled runs used the rung's `compile-one.sh` and `junit.sh`. Every program of this judgement is new, under `probes/skeptic/r2/`.

## 1. Briefing and inherited state

I ran the slice of `facts-extract.sh` the brief names, parts 1 to 4. I re-read rung E's section of `explorations/coordinator/CLIMB-BATCH-6.5.md` (`:70-131`), `JUDGE.md` and my first judgement (below). The branch holds four repair commits past `90d5d8057`:
- `6b198978c`: the compiled pairs, the `|0:MIN:MIN|` assertion and the anchor check;
- `e86808de9`: the static-arithmetic tests and their failure;
- `be7c67b85`: the edit and its pass;
- `0734a3eb4`: the final anchor check and the points for Pavol.

The worktree was clean. `REPORT.md` and `record.md` are still not on the branch, because the harness refused them. I judged the texts carried in the worker's structured result.

## 2. The judge's steps, one by one

- **Step 2, anchors.** The deviation cites `Library/RangeInternals.fss:1393` (`else CompactFullParScalarRange(0,-1) end`) and the precedent `:1387` (`emptyScalarRange()`). Row 450's note cites `(:1390-1393)` and `(:1394-1401)`. `NN32.java:232` is the sign-extended negative branch. I checked each with `sed -n`. The round's anchor check covers 260 citations (`probes/repair/anchor-check-final.txt`, last line). It caught one error in the round's own draft: `forIntBinaryOp` is `EvalType.java:457-464` at `382b9fe7f`. I confirmed that.
- **Step 3, the compiled power.** The precedent line now says that no checked power is bound. `intToIntPower` has one grep hit in `ProjectFortress/src`, `ProjectFortress/LibraryBuiltin` and `Library`: its own declaration (`simpleIntArith.java:380`). The power divergence is split from `CHOOSE`'s. The `CHOOSE` half is true only below the helper's table bound (section 7).
- **Step 4, row 337.** Row 521 is withdrawn into row 337, with the note the judge gave.
- **Step 5, static arithmetic.** Done as ordered (sections 4 and 5).
  - Step 5(d) expected no output change. Two outputs differ: `DemoGenerator22D` prints a `random(10)` matrix (`ProjectFortress/demos/DemoGenerator22D.fss:61`) and `BiCGSTAB2` a `nanoTime` line (`ProjectFortress/demos/BiCGSTAB2.fss:159-164`).
  - I diffed the two captures (`probes/repair/static-arith-before.txt`, `static-arith-after.txt`). They differ only at lines 1 and 33 (the header and the machine line), 103 (the `nanoTime` line) and 126-151 (the random matrix).
- **Step 6, the power pairs.** There are three pairs. The judge's spelling `unsigned(2)^unsigned(31)` does not parse (`probes/repair/pow-parse-first.txt:3-4`, `:73-74`). The operands are therefore locals, the form in which `probes/skeptic/SkNatBoth2.fss:6` and `:8` compile. The assertions are the judge's. I re-ran the pairs on the edit's build: the links are OK and the runs "Saw expected failure" (`probes/skeptic/r2/junit-placed.txt:89-100`).
- **Step 7, row 522.** `XXXStridedSpanWalk.fss:14-15` asserts `|0:MIN:MIN|` = 2. That is `ranges.tex:68-70`'s max(0, ⌊(MIN-0+MIN)/MIN⌋) = 2. Run alone, the assertion raises at `Library/RangeInternals.fss:156` (`probes/repair/strided-156.txt:4-5`). The file stays an expected failure (my run, `probes/skeptic/r2/harness-walk.txt:13`).
- **Step 8, the `try` pair.** It uses `XXXUnionReturnRungS.test`'s form. It is placed and goes red on its stand-in (`probes/repair/try-operand.txt:37`, `:52`). I re-ran it placed (`probes/skeptic/r2/junit-placed.txt:101`, `:131`).
- **Steps 9 to 11.**
  - Row 527 is at home 3, with the count of the three glue sites.
  - The quiet `ZZ64` return is in the stop's evidence and in the note on row 325.
  - `probes/lists-for-pavol.txt` has gained its new section.

## 3. The provenance block (five lines), on HEAD

I checked every citation with `sed -n`, and each specification citation with ten lines either side.
- **problem.** Every citation says what the block says:
  - `probes/failure/walk-base.txt:16` ("read as 0") and `:31` ("Negative nats are unNATural: -1");
  - `probes/failure/walk-base.txt:42`, `:55` and `:68` (`IntegerOverflow`, under the headers of `XXXRangeBoundsRungO`, `XXXRangeEmptyHashRungO` and `XXXSeqRangeTopRungO`);
  - `probes/repair/arith-before.txt:28` ("4294967296 4294967296 ... read as 0");
  - `NatRtBigSize.fss:35` at `382b9fe7f` (the read of 18446744073709551615);
  - `plan-6.5/probes/lcm/NN32Lcm.walk.txt:5` ("a LCM b = 2147483646");
  - `probes/natives/natives-base.txt:4-5` (the `ProgramError`, then "Overflow of ZZ32 2147483648").
- **spec.** The citations are `trait-parameters.tex:82-90`, `opr-overview.tex:154-155` and `:262-265`, `basic-integers.tex:527-529` and `:596-598`, `ranges.tex:61`, `:68-70`, `:78-79` and `:140-143`, `try.tex:56-64` and `inference.tex:191-196`. None is under `library/apis/`.
- **precedent.** All correct:
  - `TypeWellFormedChecker.scala:41-47`, `:107-108` and `:144-145` at `382b9fe7f`;
  - `EvalType.java:251-256` (the negative-size check) and `:452` (`forIntBase`'s message);
  - `NN32.java:143-147`, `Int.java:258-261` and `UnsignedLong.java:125-130`;
  - `simpleIntArith.java:203-220`, bound at `CompilerBuiltin.fss:44` and `:741`;
  - `CompilerBuiltin.fss:75` and `:744`, with `simpleIntArith.java:400-406`, and `:380-398`;
  - `POSITIONS.md:81`, `Library/RangeInternals.fss:1387`, and the three `.test` files.

  One claim needs a qualifier: `intOverflowingChoose` as "the compiled path's checked binomial". It is correct for the code as cited, but incomplete in behaviour (section 7).
- **deviation.** All correct: `TypeWellFormedChecker.scala:75-87` (`kindsAt`, `walkStaticArgs`) and `:189-190`, `EvalType.java:468-480`, `Int.java:340-351` and `:329`, `UnsignedLong.java:298`, and `Library/RangeInternals.fss:1393`.
- **historical.** It names the ten files of the 2012 tree that the net diff edits outside `explorations/` (`git diff --stat 382b9fe7f..HEAD`), and no others.

## 4. The recorded failure (repair round)

- `e86808de9` (13:35 UTC) carries `XXXNatArithProductWalk.fss`, `XXXNatArithSumWalk.fss` and `probes/repair/arith-before.txt`. There the harness reports each test "Missing expected failure", and walk reads both sizes as 0 (`arith-before.txt:9`, `:14`, `:28`, `:33`).
- The edit is in `be7c67b85` (13:42 UTC).
- The home-2 pairs' red runs on their stand-ins are in `6b198978c`: `probes/repair/pow-standin.txt:22` ("Tests run: 6,  Failures: 3") and `probes/repair/try-operand.txt:52`.

## 5. The diff of the repair round

`git diff 90d5d8057..HEAD` touches one source file. `forIntBinaryOp` (`EvalType.java:468-480`) wraps its three operations in `Math.addExact`, `subtractExact` and `multiplyExact`, and turns an `ArithmeticException` into `forIntBase`'s out-of-range error. The `bug(...)` branch is unchanged. That is the judge's candidate 1 and nothing more. The rest of the diff is tests, captures and the one added assertion.

The refusal names the failing sub-expression: `Static argument 9223372036854775807+9223372036854775807 ...` (`probes/repair/arith-after.txt:50`). A result that fits `ZZ64` goes on to the binding check by kind (section 9: `R2ArithNatEdge`, `R2ArithParamSum`).

## 6. The tests

- Each new file has one comment line, pointing at `REPORT.md`.
- **Walk, through the `testSystem` harness on the edit.** I ran the rung's twelve walk files, plus `GenericFnWithExcludes` and `genericTest2`, the corpus's users of static arithmetic. 14 of 14 are OK, and the two new tests "Saw expected exception" (`probes/skeptic/r2/harness-walk.txt:8`, `:14`, `:22`).
- **Compiled, through `fortress junit` on the edit.** I ran the rung's fourteen compiled `.test` files and `NatRtBigSize.test`. 17 of 17 tests are OK (`probes/skeptic/r2/junit-placed.txt:135`). The worker placed the power and `try` pairs on the build from before its Java edit. That edit reaches only walk, and the pairs hold after it.
- **The two walk tests are refusal tests.** The `tests/` harness can gate a refusal only as an expected failure, so they catch a return of the wrap. The first pass's refusal tests have the same form. They cannot tell the refusal's message from another failure. The message itself is recorded in `probes/repair/arith-after.txt:39` and `:50`, and in my `probes/skeptic/r2/walk-after.txt:5`.

## 7. Competing declarations, ledger and sibling sites

- **Competing declarations.** The ten new names (six components, four link tests) occur only in their own files. I searched `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `demos`, `Library`, `ProjectFortress/LibraryBuiltin` and `ProjectFortress/src/com/sun/fortress`.
- **The compiled `CHOOSE` is checked only inside its tables.**
  - The two helpers:
    - `simpleIntArith.intOverflowingChoose` indexes `maxIntChooseSafeN[k-2]` for every `n` above 33 (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:211`). That table has 15 entries, for `k` = 2 to 16 (`:126-127`).
    - `simpleLongArith.longOverflowingChoose` indexes `maxLongChooseSafeN[k-2]` for every `n` above 66 (`simpleLongArith.java:185`). That table has 32 entries, for `k` = 2 to 33 (`:110-112`). The `NN32` `CHOOSE` goes through this helper (`simpleUnsignedIntArith.java:80-82`).
  - The failures:
    - `34 CHOOSE 17` on `ZZ32` ends the run with a raw `java.lang.ArrayIndexOutOfBoundsException`: "Index 15 out of bounds for length 15".
    - `68 CHOOSE 34` on `ZZ64` and on `NN32` does the same: "Index 32 out of bounds for length 32".
    - No `catch` sees these (`probes/skeptic/r2/compiled-choosetab.txt:7`, `:14`, `:21`).
    - Walk after the rung raises `IntegerOverflow` (`walk-choosetab.txt:4`, `:9`, `:14`).
  - **What the specification says.** Every such coefficient overflows its width: C(34,17) = 2333606220 > 2^31-1, and C(68,34) ≈ 2.8·10^19 > 2^63-1. So the specification's answer is `IntegerOverflow` (`Specification/basic/operators/opr-overview.tex:154-155`; `Specification/basic-lib/basic-integers.tex:596-598`). This is rule 4, outcome 2: walk is right. Below the bound the two paths agree (`compiled-choose.txt:5-8` against `walk-choose.txt:3-6`).
  - **Why nothing gates it today.** No ledger row holds it: I grepped the ledger for the tables' names and for `ArrayIndexOutOfBounds`. `library_tests/ChooseTest3.fss:113-119` stops at `k` = 17 for `n` above 66, and folds `i-j` back below it.
  - The report's divergence line and its section 16 say the compiled helper raises `IntegerOverflow`, without that bound. That is a record correction, and the defect's home-2 test is owed in this batch (section 12, items 1 and 2).
- **The scope of a `try` in operand position.**

  | shape | program | compiled | walk |
  |---|---|---|---|
  | the second argument of a call | `R2TryArg` | fails verification (`compiled.txt:62-63`) | `ac` |
  | no exception thrown | `R2TryNoThrow` | fails verification (`:96`) | `ab` |
  | the first operand | `R2TryFirst` | runs (`:57`) | `ca` |
  | a numeral `catch` value as an operand: `one + (try h() catch e InvalidRange => 41 end)` | `R2TryNum` | the code generator stops: "Error trying to close method scope", `Index 2 out of bounds for length 2` (`:127-129`) | 42 |

  - The last shape is row 340's frame-merge shape.
  - Row 526's claim reads "an operand after another". The call-argument case has the same mechanism.
  - I recommend these as notes (section 13).
- **The compiled prelude has no `^` on `ZZ64` and no `LCM` on `NN32` or `NN64`.** The checker refuses the calls: "Could not check call to operator ^ ... (ZZ64, ZZ64)" and "operator LCM ... (NN32, NN32)" (`compiled.txt:144-161`). Walk answers them (`walk-after.txt:107-127`). The first judgement noted the `LCM` half, but neither judgement opened a row. I recommend one (section 13). It is not the rung's to repair.

## 8. The record fragment

The FACTS lines, the ledger notes and the new rows 519, 520 and 522 to 527 are true as written, with one exception. The divergence wording says the compiled `CHOOSE` raises `IntegerOverflow`, which holds only inside its tables (section 7). No row is renumbered, and provisional 521 is withdrawn. The new rows cite committed captures, and a reader can re-run each probe named.

## 9. Differentials (my programs, `probes/skeptic/r2/`)

| program | walk, edit | walk, base | compiled | verdict |
|---|---|---|---|---|
| `R2ArithIn`: `3 4 + 5`, `2147483647 + 2147483648`, `0 - 2147483647 - 1` (int), `65536 65536 - 1`, `9223372036854775807 - 9223372036854775807 + 7` | 17, 4294967295, -2147483648, 4294967295, 7 (`walk-after.txt:14-18`) | 17, then "Negative nats are unNATural: -1" at the second (`walk-base.txt:8-10`) | refuses arithmetic in a size, 10 errors (`compiled.txt:2-33`) | walk right by `constant.tex:123-133`; the compiled refusal is row 307's limit |
| `R2ArithNatEdge` (`4294967295 + 1`), `R2ArithIntEdge` (`2147483647 + 1`, int), `R2ArithIntLow` (`0 - 2147483647 - 2`, int) | refused at binding, naming the kind (`walk-after.txt:21-53`) | 0, -2147483648, 2147483647, quietly (`walk-base.txt:18-32`) | refused (`compiled.txt:44-51`; `compiled-arith.txt:2-19`) | agree; the rung's fix |
| `R2ArithNeg64` (`0 - 9223372036854775807 - 2`), `R2ArithParamBig` (`n n`, n = 4294967295) | refused at the operation (`walk-after.txt:57`, `:68`) | -1 quietly; "Negative nats" (`walk-base.txt:33-48`) | refused (`compiled-arith.txt:20-37`) | agree |
| `R2ArithParamOk` (`n n`, n = 65535), `R2ArithParamBind` (n = 65536), `R2ArithParamSum` (`n + n`, int) | 4294836225; refused at binding; -2147483648, then refused at -2147483650 (`walk-after.txt:77-100`) | -131071, 0, 2147483646, all quietly wrong (`walk-base.txt:49-63`) | refused (`compiled.txt:35-42`; `compiled-arith.txt:38-67`) | walk right after the rung |
| `R2ArithCancel` (`4294967296 4294967296 - 4294967296 4294967296`, value 0) | refused at the operation (`walk-after.txt:4-5`) | 0 (`walk-base.txt:4`) | refused (`compiled-arith.txt:68-76`) | the judge's candidate 1 and its stated cost; a stop met (section 11) |
| `R2PowEdge`: `(-2)^31`, `(-1)^2147483647`, `0^0`, `(-2)^32`, `46340^2`, `46341^2`; `34 CHOOSE 17` and neighbours, on `ZZ32` | -2147483648, -1, 1, OVF, 2147395600, OVF; the `CHOOSE` values or OVF (`walk-after.txt:130-142`) | the first three, then "Overflow of ZZ32 4294967296" uncaught (`walk-base.txt:93-101`) | the first three, then `RuntimeException: Overflow Error:` uncaught (`compiled.txt:137-142`) | agree to the bound; row 523's face above it |
| `R2Pow64`, `R2NN32Lcm`: `^`, `CHOOSE` and `LCM` on `ZZ64`, `NN64` and `NN32` at the bounds (`(-2)^63`, `3^40`, `66`/`67 CHOOSE 33`, `68 CHOOSE 34`, `4294967296 LCM 4294967295`/`4294967297`, `65535 LCM 65537`, `92682`/`92683 CHOOSE 2`, `65535^2`/`65536^2`) | every answer is the specification's value, or OVF where the value does not fit (`walk-after.txt:106-127`) | `66 CHOOSE 33` = 20188145145702184, `67 CHOOSE 33` on `NN64` = 23341572944240599, `3^40` negative, `65536 LCM 65537` = 65536 (`walk-base.txt:64-90`) | refused: no `ZZ64` `^`, no `NN32` or `NN64` `LCM` (`compiled.txt:144-164`) | walk right; the prelude's gap, section 7 |
| `R2ChooseC`: the `CHOOSE` bounds on three widths | `34 CHOOSE 17` OVF, the rest as above (`walk-choose.txt:3-11`) | not run | agrees up to `92683 CHOOSE 2`; `34 CHOOSE 17` a raw `ArrayIndexOutOfBoundsException` (`compiled-choose.txt:5-10`) | section 7 |
| `R2ChooseTab32`, `R2ChooseTab64`, `R2ChooseTabN32` | OVF each (`walk-choosetab.txt:4`, `:9`, `:14`) | not run | a raw `ArrayIndexOutOfBoundsException` each (`compiled-choosetab.txt:7`, `:14`, `:21`) | the specification settles it against the compiled run (rule 4, outcome 2) |
| `R2TryFirst`, `R2TryArg`, `R2TryNoThrow`, `R2TryNum` | `ca`, `ac`, `ab`, 42 (`walk-after.txt:144-161`) | the same (`walk-base.txt:107-124`) | `ca`; `VerifyError`; `VerifyError`; the code generator stops (`compiled.txt:57`, `:63`, `:96`, `:129`) | `try.tex:56-64` favours walk; rows 526 and 340 |

Thread counts: every run was at `FORTRESS_THREADS=1`. The repair round's edit is a pure computation in the type evaluator. It touches no mutable state, no transaction and no library write.

## 10. The failure-mode question

- **Quiet to loud.** The round's edit replaces quiet wrong values with loud refusals. A static-arithmetic size that wrapped is now refused: `R2ArithNatEdge` read 0 and `R2ArithIntEdge` read -2147483648.
- **Loud to quiet.** No loud failure becomes a quiet value.
- **One cost.** `R2ArithCancel`'s value, 0, was read right on the base by the wrap's accident, and is now refused. That is the judge's stated cost.
- **Carried over.** The first pass's loud-to-quiet case stands: a `ZZ32`-declared return answering a `ZZ64` value. It is recorded on row 325 and listed for Pavol.

## 11. Stops met

- **NatRtBigSize's restated lines and the three promoted range tests.** Met; lifted by `POSITIONS.md:123` and `:81`; reversible, `POSITIONS.md:120`.
- **The type of a size read as a value changed.** Met under walk (`BaseEnv.java:630`; `probes/skeptic/sizes-walk.txt:124-125`); reversible, `POSITIONS.md:120`.
- **An interpreter output the natives or the range bodies change.** Met at four frame positions (`probes/compare-3pass.txt:57-65`, `:94-96`); reversible, `POSITIONS.md:120`.
- **A size inside `NN32` or `ZZ32` that stops reading back.** Met on an expression no program writes: `Box[\4294967296 4294967296 - 4294967296 4294967296\]`. The base read its value, 0, back; it is now refused at the operation (`probes/skeptic/r2/walk-after.txt:4-5` against `walk-base.txt:4`; `EvalType.java:468-480`). The judge chose this cost knowingly (`JUDGE.md` section 2, candidate 1), and the worker's forPavol names it. But the report's section 14 lists this stop as not met. Reversible, `POSITIONS.md:120`.
- **Not met:**
  - a library declaration newly refused (the round edits no checker file and no library line, and the table stays at 75);
  - another test's verdict changed;
  - a range whose elements all fit answering differently where the base answered;
  - a negative power's branch, or the power's declared type, changed;
  - an edit to inference, the solver or the run time for the owed tests;
  - an edit to `StaticChecker.java`, another library line, or an unnamed file.

## 12. Required corrections (for the commit stage)

1. **Place the owed home-2 pair for the compiled `CHOOSE`'s table bound.**
   - Copy `probes/skeptic/r2/owed/XXXChooseTableCompiledRungE.fss`, `XXXChooseTableCompiledRungE.test` and `ChooseTableCompiledRungELink.test` into `ProjectFortress/compiler_tests/`, unchanged.
   - Placed, the link passes and the run is an expected failure (`probes/skeptic/r2/owed-choose-pair.txt:6`, `:10`).
   - On the stand-in, the run test goes red (`owed-choose-pair.txt:17`, `:24`). The stand-in is `probes/skeptic/r2/owed-standin/`: `k` is one lower, inside the table, where the helper raises `IntegerOverflow`.
   - Open the row of section 13, item 1, citing the pair.
2. **Correct the claim about the compiled `CHOOSE`.** It appears in the report's divergence entry, in its section 16 and in the structured divergence: "`CHOOSE` overflow: the compiled helper raises `IntegerOverflow` ... and walk now agrees". It should say:
   - The compiled helper raises `IntegerOverflow` only while `k` is inside its table.
   - On `ZZ32`, for `n` above 33 and `k` from 17 to `n`-17, it ends the run with a raw `ArrayIndexOutOfBoundsException`.
   - On `ZZ64` and `NN32`, the same happens for `n` above 66 and `k` from 34 to `n`-34.
   - Walk raises `IntegerOverflow` in all these cases (`probes/skeptic/r2/compiled-choosetab.txt`, `walk-choosetab.txt`).
   - Home 2, the pair of item 1.

   The FACTS sentence on the compiled path's `^` gains the same clause for `CHOOSE`.
3. **Correct section 14 of the report.** Move "a size inside `NN32`/`ZZ32` that stops reading back or dispatching" from not met to met, on the expression of section 11, with its evidence and `POSITIONS.md:120`. The structured `stopsMet` carries it too.

## 13. Recommended rows

These are in the structured result, one entry each, each with its probe:
1. the compiled `CHOOSE`'s table bound;
2. the compiled prelude's missing `ZZ64` `^` and `NN32`/`NN64` `LCM`;
3. a note on row 526 for the call-argument case;
4. a note on row 340 for the numeral-valued `try` in operand position.

## 14. The count table

- The rung's table, `probes/checker-count/checker-count-after.txt:14`, reads `#total 75`.
- The report, the record and the structured result declare 75.
- The manifest's expectedCheckerCount is 75, a prediction.
- The round edits no checker file and no library line: `git diff 90d5d8057..HEAD -- ProjectFortress/src/com/sun/fortress/scala_src Library` prints nothing. So the table stands, and there is no mismatch.

## 15. Tracked paths

The prefix's check, run over this file, prints nothing once this commit lands.

---

# Skeptic, first judgement: rung E, `rung-size-range` (climb batch 6.5b)

**Verdict: refused.** The one thing that must change: the record must say what the tree and the ledger say. Two anchors of the provenance block do not say what the block claims (`Library/RangeInternals.fss:1394`, `:1375`). The report says the compiled path's power raises `IntegerOverflow`, and it does not: the prelude binds `^` to helpers that raise a Java `RuntimeException`, saturate or add. Provisional row 521 is the ledger's existing row 337. The repair round closes these with the other corrections in section 16. The code change is sound: every home-1 assertion passes (section 9), and every differential of the rung's own constructs agrees with the specification (section 13). The corrections concern the record, three sibling sites, and the homes of defects this judgement measured.

Machine for every run below: nproc 4, Intel(R) Xeon(R) Processor @ 2.10GHz, 2100.000 MHz, OpenJDK 25.0.4, `FORTRESS_THREADS=1`. The load at each start is in each capture's first line; it ranged from 2.5 to 6.8. The worktree was at `e855607a4`, clean, with the build from 11:07 UTC, which is newer than every edited source under `ProjectFortress/src`. Walk on the base used the worker's base copy `tmp/baseA-home` (`git archive 382b9fe7f`, base build). I checked that its `Library/RangeInternals.fss` and `Library/FortressLibrary.fss` are byte-identical to `382b9fe7f`, and that its `Int.class` has no `powExact`. My runner is `probes/skeptic/sk.sh`, one JVM per file with private caches. Compiled runs used the worker's `compile-one.sh` and `junit.sh`.

## 1. Briefing and inherited state

I ran `facts-extract.sh` with the slice the brief names, parts 1 to 4. I read POSITIONS.md:54, :65, :81, :99, :114, :120, :123, :126, :135 and :137, ledger rows 334, 347, 418, 447, 450, 451, 503 and 505, JUDGE-review 2.4, conformance finding 3, the three specification sections, and the code slices. I also read rung E's section of `explorations/coordinator/CLIMB-BATCH-6.5.md`. The branch holds four worker commits past `382b9fe7f` (`c2534dd7a`, `87c73bf0e`, `c30db4fc2`, `e855607a4`). `REPORT.md` and `record.md` are not on the branch, because the harness refused them. I judged their texts as carried in the worker's structured result.

## 2. The provenance block (five lines, checked with `sed -n`)

- problem: every citation says what the block says. That covers `probes/failure/walk-base.txt:4`, `:16`, `:21`, `:26`, `:31`, `:42`, `:55` and `:68`, `probes/natives/natives-base.txt:4` (the `ProgramError` line, with the message on `:5`), `plan-6.5/probes/lcm/NN32Lcm.walk.txt:5`, and `NatRtBigSize.fss:35` at `382b9fe7f`.
- spec: every citation checked, with ten lines either side. These are `trait-parameters.tex:82-90`, `opr-overview.tex:154-155` and `:262-265`, `basic-integers.tex:527-529` and `:596-598`, `ranges.tex:61`, `:68-70`, `:78-79` and `:140-143`, `inference.tex:191-196` and `try.tex:56-64`. None of them is under `library/apis/`.
- precedent: `TypeWellFormedChecker.scala:41-47`, `:107-108` and `:144-145` at `382b9fe7f` are correct, as are `EvalType.java:251-256` at `382b9fe7f`, `NN32.java:143-147`, `Int.java:258-261`, `UnsignedLong.java:125-130` and `simpleIntArith.java:203-220`. **`simpleIntArith.java:380-398` is cited as "the compiled path's checked power".** That line is `intToIntPower`, and nothing binds it: a grep of `LibraryBuiltin/`, `Library/` and `src/` finds no caller. The compiled `ZZ32` `^` is `jIntExp`, which is `simpleIntArith.intExp` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744`, `:75`; `simpleIntArith.java:400-406`). **`Library/RangeInternals.fss:1375`** ("the library's own empty range") is on the rung's tree `CompactFullRange2D(l_i,l_j,r_i,r_j).check()`. `emptyScalarRange()` is at `:1387` there, and at `:1375` only at `382b9fe7f`, which the block does not mark.
- deviation: `TypeWellFormedChecker.scala:75-87` and `:189-190`, `Int.java:340-351` and `:329`, and `UnsignedLong.java:298` are correct. **`Library/RangeInternals.fss:1394`** ("`MIN # 0` is ... `CompactFullParScalarRange(0,-1)`") is the header of `sized2Range`. The empty range is at `:1393`.
- historical: it names all ten files of the 2012 tree that the diff edits, and no others.

By the brief, a cited line that does not say what the block says is a refusal. The three bold items above are the ground.

## 3. The recorded failure

It exists and was committed before the edit. Commit `c2534dd7a` (10:31 UTC) carries the tests and their captures on the base build. The edit came in `87c73bf0e` (11:16 UTC).
- `probes/failure/walk-base.txt` was captured with `tmp/build-base` and the base library. It records "Overflow of ZZ32 2147483648" (`:4`), sizes read as 0, -2147483648 and 2147483647 (`:16`, `:21`, `:26`), "Negative nats are unNATural: -1" (`:31`), and `IntegerOverflow` at the base's `RangeInternals.fss:1379` and `:1048` (`:42`, `:55`, `:68`).
- `probes/failure/compiled-base-first.txt:3` records "Saw failure, but did not satisfy compile_err_contains" for `XXXNatRangeChecker` on the base build. `probes/failure/nat-tests-before.txt:267` records "Tests run: 91, Failures: 1".
- `probes/harness/harness-base.txt:48` records four failures: the natives test, and the three walk refusal tests, each "Expected failure or exception, saw none".

## 4. The diff

I read it line by line. It does what the report says.
- **Checker.** `TypeWellFormedChecker.scala` gains `sizeOutOfRange`, `kindsAt` and `walkStaticArgs`. Trait types are checked against the `TraitIndex` kinds in both passes. A written reference is checked against its declared schemas, which exist only after type checking. Any other `IntArg` is refused only beyond both kinds.
- **Walk.** `EvalType.java:449-455` reads the literal exactly, and `:258-260` and `:270-273` refuse at binding. `BaseEnv.java:630` builds the value with `FIntLiteral.make`, which gives `FInt` up to 2^31-1 and `FLong` above. `IntNat.java:136` compares the literal exactly.
- **Natives.** I checked each helper by hand. `choose`'s gcd-first step is exact: `gcd(accum/g, j/g) = 1`, so `j/g` divides `m`, and after `k` is flipped to at most `n/2` the partial `C(n-k+j, j)` grows monotonically. `powExact` squares only while bits remain. `UnsignedLong.multiplyExact`'s divide-back test is exact for unsigned values. `NN32$Lcm`'s 64-bit product is below 2^64, so `rc`'s `(i >> 32) != 0` catches every value above 2^32-1, including values that read as negative. No `error(` is left in `Int.java` or `NN32.java`. The negative branches are unchanged, and so is `NN32.java:232`'s sign-extended `base`.
- **Range bodies.** In the strided sequential step, `r - str` for `r >= 0, str > 0`, `i + str` for `r < 0, str > 0`, `r - str` for `r < 0, str < 0` (the stride `MIN` included) and `i + str` for `r >= 0, str < 0` cannot leave `ZZ32`. The loops keep `i <= r` (or `i >= r`) as an invariant. `sized1Range`'s `lo > lo.minimum - ex` is `lo + ex - 1 >= MIN` without overflow.
- **Scope.** Nothing outside the named files and bodies is edited.

## 5. The precedent search

It was followed, and the counts are given. Two sites of the same kind are missing from the count:
- **`EvalType.forIntBinaryOp`** (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/EvalType.java:468-475`), in the visitor the rung edited, adds, subtracts and multiplies sizes in unchecked `long`. Walk therefore reads `Box[\4294967296 4294967296\]` and `Box[\9223372036854775807 + 9223372036854775807 + 2\]` as a size of 0, with no error, on the base and after the edit (`probes/skeptic/sizes-walk.txt:58`, `:63`; `sizes-walkbase.txt:36`, `:41`). The compiled checker refuses arithmetic in a size (`sizes-compiled.txt:172-187`). This is row 418's silent form reached through arithmetic. The decision on a size's range (POSITIONS.md:123) refuses it.
- **The three array glue classes** read `s0` with `getInt()`: `glue/prim/PrimitiveArray.java:40`, `PrimImmutableArray.java:43` and `PrimImmutableRR64Array.java:36`. `FLong.getInt()` is `(int) val` (`evaluator/values/FLong.java:23-25`). A size from 2^31 to 2^32-1 now reaches them. `array1[\ZZ32, 3000000000\](7)` dies with a raw `java.lang.NegativeArraySizeException: -1294967296` from `AtomicArray.<init>`, where the base refused the size at binding (`probes/skeptic/misc-walk.txt:80-81`, `:88`).

The devices copied are the library's and rung O's. The strided step's split test is new. The library and the compiler prelude have no device for stepping without overflow; `Library/CompilerLibrary.fss` has no loop at all. My probes verified the new test at both signs of `r` and of the stride, the stride `MIN` included (section 13).

## 6. The tests

- **`PowChooseLcmRungE.fss`.** It has 50 assertions and one comment line. It uses `IntSemanticsRungI`'s helper, which catches only `IntegerOverflow`.
- **The three walk refusal tests.** Each is a separate file, since a refusal ends the run. On the base each read a wrong value and printed PASS.
- **`XXXNatRangeChecker`.** It covers the seven written sites. It is pinned by one message of each kind, the `int` one by `compile_err_contains` and the `nat` one by `compile_err_WIcontains`, which `FileTests.java:155` supports. It gates the message family, not each site; this is the precedent's own form, `XXXNatArithChecker`.
- **The owed pairs.** I re-ran them placed and on the stand-ins (section 13). Both links pass. `c1`'s run test uses `XXXUnionReturnRungS`'s form. This departs from JUDGE-review 2.4, which sets `run_out_contains=REACHED`. It is right: with no key the harness demands PASS whatever `shouldFail` says (FACTS.md, "The XXX expected-failure mechanism in compiler_tests/ ... a run-time defect needs two .test files"). Neither test asserts the binding. The assertions `shown =/= ""` and `d =/= ""` are vacuous by design.
- **The four promoted tests.** Each differs from its base file on its `component` line only. I checked this with `diff` against `git show 382b9fe7f:...`.
- Every test file carries at most one comment line.

## 7. Competing declarations

I searched `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `demos` and `Library` for each new component name: one hit per name, the rung's own. In `src/com/sun/fortress/` whole, `powExact` is declared only at `Int.java:370` and `UnsignedLong.java:327`, `multiplyExact(long x` only at `UnsignedLong.java:320`, and `sizeOutOfRange`, `kindsAt` and `walkStaticArgs` only in `TypeWellFormedChecker.scala`. No other test holds a static argument of ten or more digits.

## 8. The record fragment

The FACTS lines are true as written, with four exceptions:
- The row 450 note cites `sized1Range` at `(:1391-1394)` and the other two at `(:1395-1402)`. The lines are `:1390-1393` and `:1394-1401`.
- New row 521 duplicates row 337 (section 11).
- Row 522's claim and fix leave out a third site (section 11).
- Nothing in the record says that walk's arithmetic sizes still wrap. Row 418's closing note and the FACTS entry "Walk reads a size literal exactly" are precise about literals. The same note should name `forIntBinaryOp`, unless the repair closes it.

No row is renumbered. The notes cite existing rows: 307, 325, 340, 347, 418, 441, 447, 450, 451, 453, 503 and 505.

## 9. The three homes

- **Home 1, re-run by me through the `testSystem` harness.** 18 of 18 OK (`probes/skeptic/harness-walk.txt:26`). The set is the rung's ten walk files plus `IntSemanticsRungI`, `UnsignedTest`, `RangeZZ32RungJ`, `RangeSizeRungO`, `IntegerMinMaxRungM`, `XXXNatValueNN32RungK`, `FixedWidthOverflowRungB` and `WrapOperatorsRungD`.
- **Home 1, compiled, through `fortress junit`.** 9 of 9 OK (`probes/skeptic/junit-placed.txt:88`). `XXXNatRangeChecker` is an expected failure with 16 errors, and `NatRtBigSize` compiles, links and runs PASS.
- **Home 2.**
  - `XXXRangeTupleShiftWalk` and `XXXStridedSpanWalk` are expected failures (`harness-walk.txt`). Their red captures exist: `probes/shifts/xxx-503-red.txt:21` and `probes/strided/strided-control.txt:8`, "Missing expected failure".
  - `XXXTryCompareCoerceRungE` is "Saw expected exception", and `probes/codegen/trycmp-control-junit-base.txt:8` is red on its control.
  - The owed pairs go red on the stand-ins, 4 tests with 2 failures (`probes/skeptic/junit-standin.txt:20`).
- **Home 3.** None claimed.

Defects I measured without a home are listed in section 16.

## 10. The count table

The rung's table is `probes/checker-count/checker-count-after.txt`, `#total 75`. The report, the record and the structured result say 75. The manifest's expectedCheckerCount is 75, a prediction and not a target. The table is identical to `climb-batch-N/gate/checker-count.txt` apart from its header. `git log 3fb0cd8c1..382b9fe7f -- Library/ ProjectFortress/` prints nothing, so the landed table is a valid "before". There is no mismatch.

## 11. The ledger and the sibling sites

- **Row 337** is "the interpreter's `CHOOSE` answers `1` where the specification requires `0`, for every `k > m ≥ 0`". It was opened from the repair batch's R2 skeptic, and its fix is stated: "a `k < 0 || k > n` test at the head of `Int.choose`". That is the defect of provisional row 521, and the rung's edit closes it (`Int.java:329`, `UnsignedLong.java:298`). So this is not a decision "beyond the overflow scope" for Pavol. The ledger settled it as rule 4, outcome 2. Row 327 (`library_tests/ChooseTest3.fss:125`) is its test-side twin. It is a compiled test, so walk's fix does not reach it.
- **Row 522 misses a site.** `ScalarRange.check()` computes `(l-r) MOD str` (`Library/RangeInternals.fss:156`). `0:MIN:MIN`, whose two elements 0 and `MIN` both fit, passes `imposeStride` (dist `MIN - 0` fits) and raises `IntegerOverflow` at `:156` from `fullScalarRange` (`:1368`) under `imposeStride`'s `:806`, on the base and after the edit (`probes/skeptic/ranges-walk.txt:46-55`, `:25`, `:87`, `:135`, `:177`). So the fix row 522 describes, "test the sign before the distance", would not make the strided ranges whose elements fit work. `XXXStridedSpanWalk` would turn red on an `imposeStride`-only fix while `0:MIN:MIN` still raises.
- **The compiled path's powers answer against the specification.** The rung's divergence line says otherwise. The spec rows are `basic-integers.tex:527` (an integer power is an integer) and `opr-overview.tex:154-155` (overflow throws `IntegerOverflow`). Walk after the edit gives the specification's answers (`probes/skeptic/natives-both.txt:195-196`, `:218-222`, `:232-237`, `:247-250`).
  - `ZZ32` `^` is `intExp`. Above `MAX` it throws `java.lang.RuntimeException: Overflow Error:`, which no `catch` sees (`natives-both.txt:83-84`, `:185-186`). Below `MIN` it saturates quietly: `(-3)^21` and `(-2)^33` are `-2147483648` (`:129-130`).
  - `NN32` `^` is `unsignedIntExp` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedIntArith.java:218-224`). Its `(int)` of a double saturates, so every result in [2^31, 2^32) is 2147483647: `2^31`, `65535^2`, `(2^31)^1` (`:152-156`).
  - `NN64` `^` is `unsignedLongExp`, `return a + b;` (`simpleUnsignedLongArith.java:223-225`). `3^2` is 5 and `2^63` is 65 (`:166`, `:171`).
  - Row 441 records `intExp` for negative powers only.
- **Other compiled answers** (no row owed by this rung): `ZZ32`, `ZZ64` and `NN32` `CHOOSE` agree with walk, with `NN32` rendered signed as row 326 says (`:160-161`). `NN64` has no `CHOOSE` or `LCM` of its own in the prelude. Its `CHOOSE` resolves to `ZZ`'s unbounded one (`:173`, `:177`), and `LCM` is a static error.
- **A try expression as an operand fails JVM verification on the compiled path.** `"a" || (try f() catch e InvalidRange => "c" end)` fails at load with "Inconsistent stackmap frames" (`probes/skeptic/natives-both.txt:88-89`), where walk prints `ac`. This has row 322's mechanism: a value left on the operand stack across a handler. Row 340's new shape, which the rung gated, is a different failure: a crash in the code generator.

## 12. The decisions on record

- **POSITIONS.md:123** (a size's range). The checker refuses per kind, and walk refuses at binding, including in types, `typecase`, `extends`, singletons and method static arguments (section 13). The case it leaves out is walk's arithmetic sizes (section 5). That is a finding for repair, not a contradiction.
- **POSITIONS.md:135** (item 25). The compiled `IntLiteral` is unchanged. Under walk a size from 2^31 to 2^32-1 read as a value is now `ZZ64`, as walk's numeral of that value is. At a declared `ZZ32` binding walk refuses: "RHS expression type Long is not assignable to LHS type ZZ32" (`sizes-walk.txt:141`). At a declared `ZZ32` return it answers 2147483648 of kind `ZZ64`, quietly, since walk checks no declared return (`sizes-walk.txt:124-125`). The compiled run fails loudly there with "Not in range for ZZ32" (`sizes-compiled.txt:41`). Item 25 refuses a larger size used as a value, and its place is undecided (climb batch N's JUDGE-review 2.3). The rung lists the stop. The record should carry this quiet case (section 14).
- **POSITIONS.md:54, :65, :99 and :81.** All followed. The count of changed interpreter outputs is reported. The reorder keeps the checked operators.
- **POSITIONS.md:137.** The owed tests are written, and neither decides item 18.

## 13. Differentials (my programs, in `probes/skeptic/`)

| program | walk (after) | compiled | verdict |
|---|---|---|---|
| `SkSzIn`: `nat` 2^31-1, 2^31, 2^32-1, 0 and `int` 2^31-1, 0 in a type, as a written argument, as a value, in dispatch and in `typecase` | 16 lines (`sizes-walk.txt:92-109`); the base refused 2^31 (`sizes-walkbase.txt:78`) | the same 16 lines (`sizes-compiled.txt:57-73`) | agree; the rung's fix |
| `SkNatBeyondDecl`, `SkNatBeyondTypecase`, `SkNatBeyondWritten`, `SkIntBeyondWritten`, `SkIntBeyondDecl` | refused, message names the kind (`sizes-walk.txt`); the base answered `other`, matched `Box[\0\]` against `Box[\4294967296\]`, read 0 and -2147483648 (`sizes-walkbase.txt`) | refused (`sizes-compiled.txt:7-35`, `:76-81`) | agree |
| `SkIntSingleton`, `SkMethodSize`, `SkMethodSizeNat`, `SkExtendsSize` | refused (`misc-walk.txt:2-53`); the base read -1294967296, -1294967296 and 0 (`:56`, `:61`, `:72`) | refused (`sizes-compiled.txt:103-120`, `:164+`) | agree |
| `SkNatProdWrap`, `SkNatSumWrap` (a size of 2^64 written as arithmetic) | reads 0, base and edit | refuses arithmetic | walk wrong by the decision; section 16, item 4 |
| `SkIntMinArg` (`0 - 2147483648`) | -2147483648 | refuses arithmetic (and names `nat`, row 307) | expected |
| `SkSizeZZ32Ctx`, `SkSizeZZ32Type`, `SkSizeLocal32` | ZZ32 return: 2147483648 of kind `ZZ64`; ZZ32 local: refused | "Not in range for ZZ32" at both | loud to quiet at the return; section 14 |
| `SkSizeBare`, `SkSizeBare2`, `SkNumeralBare2` (`x = k; x + 1`) | `IntegerOverflow` at k = 2147483647, 3000000001 at 3000000000 | 2147483648 and 3000000001; a bare numeral `y = 2147483647; y + 1` is 2147483648 compiled too (`sizes-compiled.txt:196`) | the compiled numeral's own behaviour (row 325's family), not this rung's |
| `SkArraySize` (`array1[\ZZ32, 3000000000\]`) | raw `NegativeArraySizeException` (`misc-walk.txt:80-81`) | `array1` is not in the prelude | section 16, item 7 |
| `SkNatBoth`, `SkNatBoth2`, `SkPowZZ32Ovf`: `^` and `CHOOSE` on four widths at the bounds | all as the specification says (`natives-both.txt:189-250`); the base ended at the first overflow (`:68-78`) | `CHOOSE` agrees; `^` does not (section 11) | spec settles against the compiled powers; section 16, item 6 |
| `SkTryOperand` | `ac` | `VerifyError` at load | section 16, item 8 |
| `SkRangeEdge`, `SkRangeEdge2`, `SkRangePar`: 60 range forms at and inside the bounds, walk edit against the base | every form that answered on the base answers the same; every form that raised now gives the specification's answer; `0:MIN:MIN` raises on both at `:156` | not applicable: the compiled path runs the prelude's ranges (row 453) | the rung's fix, plus section 11's third site |
| `SkRangeBig` (row 325's `nat` face) | "Failed to find any matching overload, args = (3000000000: ZZ64,2: ZZ32)"; the base said "Negative nats ... -1294967296" (`misc-walk.txt:101`, `:119`) | not run | as the worker reported |
| the owed pairs, placed and on the stand-ins, through `fortress junit` | not applicable | placed: 9 of 9 OK, run tests "Saw expected failure (Exit code != 0)" (`junit-placed.txt:78`, `:84`); stand-ins: both run tests red (`junit-standin.txt:4-12`) | the pair form works |

Thread counts: every run was at `FORTRESS_THREADS=1`. The rung touches no shared mutable state, transaction or library write. The changed loops mutate a local counter only, and the parallel `generate` bodies are unchanged. My `SkRangePar` confirms those parallel bodies at the bounds (`ranges-walk.txt:212-229`).

## 14. The failure-mode question

- **Loud to quiet, one case.** Under walk, a function declared to return `ZZ32` returns a size from 2^31 to 2^32-1 as a `ZZ64` value, 2147483648 (`sizes-walk.txt:125`). The base failed there loudly, and wrongly: it refused a valid `NN32` size ("Negative nats are unNATural: -2147483648", `sizes-walkbase.txt:53`). The compiled run fails loudly ("Not in range for ZZ32"). The specification with item 25 would refuse the oversized conversion. The quiet answer comes from walk not checking declared return types (`plain32(widen(5))` returns a `ZZ64` too, `sizes-walk.txt:124`), and the rung's `putNat` exposes it to sizes.
- **Loud to loud, worse form.** An array of a static size from 2^31 to 2^32-1 now dies with a raw Java exception and no Fortress location, where it died with a Fortress `ProgramError` at the size.
- **Loud to a computed value.**
  - The range bodies now give the specification's values where they raised; each is checked in `ranges-walk.txt`.
  - `CHOOSE`'s 1 is now 0, which row 337 and `basic-integers.tex:598` require.
  - `MIN # 0`, `MIN # -1`, `MIN # MIN`, `(MIN+1) # -2` and `-1 # MIN` now build `CompactFullParScalarRange(0,-1)` (`ranges-walk.txt:5-12`). This is empty, as `ranges.tex:78-79` requires, but its printed bounds are not the ones the program wrote. The worker lists this as a decision. `MAX # MIN` keeps the base's `(2147483647,-2)`, and its size is now 0 (`:9`).

## 15. Stops met

- NatRtBigSize's restated lines and the three promoted range tests. `NatRtBigSize.fss` base `:6` and `:26-37` are removed. `RangeBoundsRungO.fss:3`, `RangeEmptyHashRungO.fss:3` and `SeqRangeTopRungO.fss:3` are renamed, component line only. Lifted by POSITIONS.md:123 and :81, and reversible by POSITIONS.md:120.
- The type of a size read as a value changed, under walk only (`BaseEnv.java:630`; `probes/skeptic/sizes-walk.txt:124-125`). Reversible by POSITIONS.md:120.
- An interpreter output the range bodies change, at four frame positions: `probes/compare-3pass.txt:57-65` (`XXXUnwrittenSumRungF`, `XXXloopError`, `XXXseqLoopError`) and `:94-96` (`taskTrace3`). Reversible by POSITIONS.md:120.
- Not met:
  - a library declaration newly refused (the count is 75);
  - another test's verdict changed;
  - a size inside `NN32` or `ZZ32` that stops reading back or dispatching (`SkSzIn`);
  - a range whose elements all fit answering differently from the base where the base answered;
  - a negative power's branch or the power's declared type changed;
  - an edit to inference, the solver or the run time for the owed tests;
  - `StaticChecker.java`, another library line, or an unnamed file.

## 16. Required corrections for the repair round

1. **Anchors.** Deviation `Library/RangeInternals.fss:1394` becomes `:1393`. Precedent `:1375` becomes `:1387`, or is marked "at 382b9fe7f". Row 450's note `(:1391-1394)` becomes `(:1390-1393)`, and `(:1395-1402)` becomes `(:1394-1401)`.
2. **The compiled power.** Correct the divergence line "ZZ32 power and CHOOSE overflow ... the compiled helpers raise IntegerOverflow", and the precedent line "the compiled path's checked power (`simpleIntArith.java:380-398`)". The compiled `ZZ32` `^` is `intExp` (`CompilerBuiltin.fss:744`, `:75`; `simpleIntArith.java:400-406`), and `intToIntPower` is unbound. After this rung the specification settles the power divergence against the compiled path (rule 4, outcome 2).
3. **Row 521 is row 337.** Drop provisional row 521. Append the fix to row 337, with status gaining ", POSITIVE-VERIFIED (the fix)". Withdraw the forPavol entry that calls the change a decision beyond scope.
4. **Walk's arithmetic sizes** (`EvalType.java:468-475`). Give this a home. Either repair it in this rung, raising the out-of-range error on `long` overflow with checked `addExact`, `subtractExact` and `multiplyExact`, gated by an `XXX` walk refusal test of `Box[\4294967296 4294967296\]` (home 1). Or give it home 2 and a row. In either case row 418's note says it.
5. **Row 522 names `ScalarRange.check()`'s `(l-r)`** (`Library/RangeInternals.fss:156`) as a third site. `XXXStridedSpanWalk.fss` gains `|0:MIN:MIN|` = 2 (`ranges.tex:68-70`, `:140-143`), so that a fix of `imposeStride` alone does not turn it red.
6. **Home 2 for the compiled power defects.** The defects are `ZZ32` `^` (uncatchable above, saturating below), `NN32` `^` (saturating at 2147483647) and `NN64` `^` (`a + b`). Each gets a link test and an `XXX` run test in `ProjectFortress/compiler_tests/`, with REACHED printed first and one assertion from `probes/skeptic/SkNatBoth2.fss` and `SkPowZZ32Ovf.fss`, plus the rows in recommendedRows. The test is owed in the batch that measures the defect.
7. **The array sites.** Add `PrimitiveArray.java:40`, `PrimImmutableArray.java:43` and `PrimImmutableRR64Array.java:36` to the report's count of narrowing sites. Record the change in form, from `ProgramError` to a raw `NegativeArraySizeException` (`misc-walk.txt:80-81`, `:88`). Its home is a row (recommendedRows): the specification is silent on where walk refuses an array length over 2^31-1.
8. **Home 2 for the try-as-operand `VerifyError`.** The program is `probes/skeptic/SkTryOperand.fss`. Give it a link test and an `XXX` run test in `XXXUnionReturnRungS`'s form, plus a row or a note on row 322.
9. **The quiet `ZZ64` return** of section 14 goes into the evidence of the stop "the type of a size read as a value changed", with `sizes-walk.txt:124-125` and `sizes-compiled.txt:41`.

## 17. Tracked paths

The check of the shared prefix, run over this file, prints nothing once this commit lands. Every cited `explorations/compile-ladder/` path exists and is tracked.

# Skeptic's judgement of rung I (`rung-int-semantics-walk`)

**Verdict: refused.** The one thing that must change: `BigNum.shiftLeft` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/BigNum.java:237-250`) must reject an unrepresentable left shift before `BigInteger` allocates the result. As landed, the rung's own gated test ends with an uncatchable `OutOfMemoryError` at `ProjectFortress/tests/IntSemanticsRungI.fss:93` under the interpreter's own launcher (finding 1).

I read the branch at `354e2db4e`. The worktree was clean (`git status --short` printed nothing), so the net change `git diff abdfbb2db...HEAD` is what I judged. I read the seven milestones, `REPORT.md`, `record.md`, `JUDGE.md`, the batch record `explorations/coordinator/CLIMB-BATCH-3.5.md` and the captures the report cites. I did not edit the worker's files. My probes and their captures are in `explorations/compile-ladder/rung-int-semantics-walk/probes/skeptic/`. Every run used one thread (`FORTRESS_THREADS=1` from `experiment/env.sh`), because the diff adds no mutable variable, field, atomic block or library write: the natives are pure, and `Int.overflow()` only reads the library environment. For the compiled half I rebuilt this worktree's bytecode cache in library order. The compiled path is the base tree's, because this rung does not touch it and rung B is in another worktree.

## 0. The provenance block

I opened every line it cites with `sed -n`.

- `problem:` holds. `probes/IntSemProbe-before.txt:8` is `ZZ32 3 LSHIFT -1 = 0   (want 1)   DIFF`, and `probes/run-enders-before.txt:1-3` is `0 LCM 0` ending in `java.lang.ArithmeticException: / by zero`.
- `spec:` mostly holds, with two faults:
  - It cites `explorations/coordinator/CLIMB-BATCH-3.5.md:18` for Pavol's decision, and that line is blank. The decision is `:17`. `JUDGE.md:14` carries the same off-by-one, and the worker copied it.
  - The quoted GCD/LCM rule leaves out part of the cited passage (finding 5).

  `basic-integers.tex:695-702`, `opr-overview.tex:154-155`, `declarations.tex:426-436`, `:454-461` and `:533` all say what the block says. I read each with ten lines either side.
- `precedent:` holds at every line: `Evaluator.java:224-226`, `StringPrim.java:130-133`, `CompilerBuiltin.fss:616-619`, `simpleArbitraryPrecisionArith.java:117-119`, `UnsignedLong.java:240-243`, `Library/incomplete/basic/Fortress.Number.fsi:162` (in the spec's form, beside `even`/`odd` at `:172-173`) and `Library/FortressLibrary.fss:881-884`.
- `deviation:` holds: `FortressLibrary.fss:885-886`, `WellKnownNames.java:86`, `RangePrototype.fss:66`/`:171`, `Int.java:134-148`, and `PLAN.md:52` ("which file it is in is not a decision").
- `historical:` holds. It names all twelve 2012-tree files the diff edits, and `:71` is the provenance paragraph. Each source-touching commit (`20984ad15`, `a7459393e`, `fafc4eb75`) carries its own `historical:` line.

By the letter of check 0, a cited line that does not say what the block says is refusal-grade, and `:18` is such a line. It is a one-character repair, so I list it as a required correction and refuse on finding 1.

The same off-by-one appears in the body. `REPORT.md:55` cites `CLIMB-BATCH-3.5.md:36`, `:81` cites `:46` and `:122` cites `:58`. All three lines are blank; the text is at `:35`, `:45` and `:57`. `REPORT.md:11` says section I is "lines 40-58", but it is 39-57.

## 1. The recorded failure

It exists, and it predates the edit:
- `test-before.txt` (commit `cf01b652d`, the test alone, with no source edit yet) shows `Variable shift is not defined.` six times, exit 255. The captures `probes/IntSemProbe-before.txt` (58 `DIFF` lines, every group) and `probes/run-enders-before.txt` are in the same commit.
- `test-before-shift.txt` (`fafc4eb75`) holds the folded seven `shift` assertions, red before the library patch.
- `test-before-final.txt` holds the landed test against the base natives, through `probes/base-overlay.sh`. It first fails at `ZZ32 3 LSHIFT -1`.

## 2. The diff, line by line

- **The four fixed-width shift pairs** (`Int.java:180-192`, `Long.java:192-204`, `NN32.java:183-195`, `UnsignedLong.java:184-196`) are right. The comparison with `-32`/`-64` precedes the negation, so `Long.MIN_VALUE` is never negated. Signed right saturation gives `u >> 31` (`>> 63`), and the unsigned forms give 0.
- **`Int.shiftCount`** (`Int.java:261-272`) is right. `FNN32.getLong` is already unsigned (`FNN32.java:31-33`), so an `NN32` count is not misread.
- **`BigNum.shiftLeft`** (`BigNum.java:237-250`) is right on every count except one: an unrepresentable result reached with a count inside the `int` range (finding 1).
- **`toB`'s `FNN64` branch** (`BigNum.java:46-48`) matches `makeZZfromNN64`.
- **`Int.gcd`, `Int.lcm`, `Int$Gcd/$Lcm` and `Long$Gcd/$Lcm`** are right on everything I tried (section 9). `Long$FromLong` is `(int) x`.
- **The library renames are purely mechanical.** I replaced every whole-word `shift` in the base files with `amount` and diffed the result against the landed files. The only differences are the new declaration (`FortressLibrary.fsi:544`, `.fss:885-886`) and the array-origin `shift` names, which the landed files correctly left alone. No dotted `.shift(` call occurs in `RangeInternals.fss`, `RangeInternals.fsi` or `List.fss` in the base, so none was clobbered.
- **The `RangePrototype.fss:66`/`:171` edit is sound.** `(u DIV (u GCD v)) DOT v` equals the old `(u / g) * v` for nonzero strides, and the library's own callers do not depend on the sign of `LCM`. `RangeInternals.fss:511-517` flips strides before `forwardIntersection` (`:539`, `:873`), and `:442-445` restores the sign by hand. It is a code change in a gated 2012 test, not an assertion change, and the batch record lists exactly these two lines under "must stay green" (`CLIMB-BATCH-3.5.md:55`).

The edit does what the report says. Its size fits the test, apart from finding 2 (a native it should have reached) and finding 3 (a dispatch route it opened).

## 3. The precedent search

The worker cited the right shapes: Evaluator's raise, `StringPrim`'s constant, the compiled `LCM` body and `makeZZfromNN64`. The site count is wrong in one place. `REPORT.md:128` says the unguarded `LCM` "sat in three natives; two are fixed here, and the third is in `glue/prim/ZZ32.java:128-133`, a dormant duplicate". A fourth native is reachable and spelled differently: `BigNum$Lcm` (`BigNum.java:176-188`, `u.divide(g).multiply(v)`), bound as the unbounded ℤ's `LCM` at `Library/FortressLibrary.fss:871-872`. It is in a file this rung edits and has row 334's defect (finding 2).

## 4. The test

`ProjectFortress/tests/IntSemanticsRungI.fss` covers every case the tail names: the shared table on `ZZ32` and `ZZ64`, the `NN32`/`NN64` reversals, the two `ZZ` counts beyond the `int` range, the three named `shift` cases, row 334's cases and twins, and the four `narrow`s. It has one comment line (`:4`), pointing at `REPORT.md`, and no provenance essay.

Under the testSystem harness, on a fresh cache, it is `OK (1 test)` (`probes/skeptic/harness-test.txt`). Two of its assertions are weaker than they look:

- **`:93`** passes only because the harness JVM has 768 MB (`build.xml:131`, `junitMem`, used by the shard macro at `:1181`). Under `bin/fortress`, whose default heap is `-Xmx256m` (`bin/fortress`, the `JAVA_FLAGS` default), the test dies with `java.lang.OutOfMemoryError: Java heap space` (`probes/skeptic/test-default-heap.txt:1-2`). The same file without `:93` prints `PASS` at that heap (`probes/skeptic/test-default-heap-no93.txt:1`).
- **`:82`** (`ZZ32 -3 RSHIFT a ZZ count of 40` = -1, cited to `FortressLibrary.fss:637`) is independent of the width, because a negative number shifted right past 32 or past 64 is -1 either way. It therefore does not exercise what finding 3 measures.

## 5. Competing declarations

I searched `git grep -nw shift` over every tracked `.fss`/`.fsi` outside `Specification/`, `explorations/` and `Library/incomplete/`, excluding `.shift(` calls and comment lines. It finds:
- the new declaration and body;
- the seven array-origin dotted declarations (`FortressLibrary.fsi:1294`, `:1317`, `:1337`, `:1417`, `:1447`, `:1557`, `:1688`). `:1557`'s component body at `FortressLibrary.fss:2373` is inside `trait Array2` (`:2295`);
- the dead `CompilerLibrary/FortressLibrary.fsi` group, including `:2061-2064`;
- comments and strings;
- this rung's own calls.

Under `src/com/sun/fortress/`, `"shift"` occurs nowhere, `"IntegerOverflow"` and `integerOverflowException` occur only at `WellKnownNames.java:86` and `Int.java:257`, and `shiftCount`, `LC2L` and `UC2U` occur only in the five natives files.

The reserved name is real for user programs. On the landed tree, a local and a parameter named `shift` are rejected under `walk` with `Variable shift is already declared.` and accepted on the compiled path (`SkShiftLocal.*.txt`, `SkShiftParam.*.txt`). A user top-level function named `shift` of either shape overloads cleanly on both paths (`SkShiftFn.*.txt`, `SkShiftFn2.*.txt`).

## 6. `record.md`

The FACTS lines are sourced, and I confirmed the counts they state:
- 25 `overflows(...)` assertions;
- 52 assertions at `:29-95`, 7 at `:97-103`, 31 at `:105-139` and 4 at `:141-145`;
- `Int.rc`'s callers `Int.java:152` and `:225`;
- the row 347 correction (`ZZ32.java:208` and `NN32.java:226` call their own `rc`, declared at `ZZ32.java:225` and `NN32.java:257`).

Rows 334, 335, 336, 346 and 347 exist (`explorations/fortress-gap-ledger.md:345-358`), and nothing is renumbered. Three statements are not true as written:
- FACTS line 2 says "an unrepresentable left shift a catchable `IntegerOverflow`". That is false at the launcher's default heap (finding 1).
- The row 334 note closes the row while the unbounded ℤ's `LCM` still returns `1 LCM -5` = -5 (finding 2).
- FACTS line 2 says of the `ZZ` count only that it "is read exactly". It does not say what a `ZZ32` receiver then answers (finding 3).

## 7. The three homes

The worker's homes are in place and pass (I ran the test): `:29-95`, `:97-103` (the seventh assertion at `:103` included), `:105-139`, `:141-145`, `:81-82` and `:94-96`/`:101`. The `XXXShiftRungI.fss` placeholder was removed before it ever reached `main`, and its deliberate-red capture stays committed. The `RangeInternals.fss` tuple defects are unmeasured, and I did not measure them either.

Each defect I measured has a home:
- **Finding 1**: home 1, after the repair round. The assertion `:93` already exists, and it must then pass under `bin/fortress` at the default heap.
- **Finding 2**: home 1 (repair plus assertions) or home 2 (an `XXX` file, with row 334 left open for ℤ). The specification settles it (`basic-integers.tex:527-529`).
- **Finding 3**: home 3. The specification's prose is silent on `LSHIFT`/`RSHIFT` (the worker's own `grep -rn "LSHIFT\|RSHIFT\|narrow" Specification/basic Specification/basic-lib` matches nothing), and the repair is a batch stop. My captures are committed, and a row is recommended below.
- **Findings 6-8**: compiled-path defects, outside this rung. Each is in `recommendedRows`.

## 8. The count table

The table is `probes/checker-count-after-shift.txt`, `#total 103`, byte-identical to `probes/checker-count-before.txt`. The report declares 103 (`REPORT.md:120`), `record.md`'s handover line says "stays 103", and the structured report says "The checker count is 103". The manifest's `expectedCheckerCount` is 103, a prediction. Table 103, report 103, prediction 103: no mismatch.

## 9. The differentials I ran

These are my own programs, not the rung's test.

| program | walk (landed) | compiled (base; rung B not here) | which outcome of rule 4 |
|---|---|---|---|
| `SkIntDiff.fss`: 14 `ZZ32` and 9 `ZZ64` shifts outside the table (`1 RSHIFT -31`, `MIN LSHIFT -31`, `-7 LSHIFT -1`, counts `MAX`/`MIN`, and others) | all at the decided answers (`SkIntDiff.walk.txt:2-15`, `:31-39`) | 8 + 6 differ (`SkIntDiff.compiled.txt:3-16`, `:32-40`) | Specification silent; Pavol's rule of 2026-09-22 decides for `walk`. This is row 335's compiled half, rung B's. |
| `SkIntDiff.fss`: 13 `ZZ32` `GCD`/`LCM` cases (`-6 LCM -4`, `MIN GCD 2`, `46341 LCM 46340`, `46341 LCM 46342`, and others) | all right | all right | agree |
| `SkIntDiff.fss`: `ZZ64` `MIN GCD 2`, `MIN GCD 2^62` | 2, 2^62 | `IntegerOverflow` (`:44-45`) | The specification settles against the compiled run (`basic-integers.tex:523-525`, `opr-overview.tex:154-155`). Outside this rung; finding 7. |
| `SkIntDiff.fss`: `ZZ64 3037000499 LCM 3037000500` | 9223372033963249500 | `IntegerOverflow` (`:49`) | The siblings' zero quotient (`CLIMB-BATCH-3.5.md:35`), rung B's. |
| `SkIntDiff.fss`: 7 `ZZ64` `narrow`s | low 32 bits | 4 in-range answers agree, 4 out-of-range throw (`:55-58`) | Row 346's compiled half, rung B's. |
| `SkMulMin.fss`: `2 DOT -2^62`, `MIN REM 2`, `MIN MOD 2`, `MIN GCD 2`, `2 GCD MIN` | -2^63, 0, 0, 2, 2 | `IntegerOverflow` for all (`SkMulMin.compiled.txt:2-7`) | Settles against the compiled run; finding 7. (`walk`'s `2^62 DOT 2` wraps, `SkMulMin.walk.txt:7`: the known undecided divergence, `CLIMB-BATCH-3.5.md:75`.) |
| `SkCountType.fss`: `ZZ32 3 LSHIFT` a `ZZ64` count of 33 | 0 | 25769803776 | Specification silent; finding 6. |
| `SkShiftCall.fss`: `shift(3, 33)` on a `ZZ32` | 25769803776 | `Variable shift is not defined.` (compile, exit 255) | Settles against the compiled run (`basic-integers.tex:695-702`). Outside this rung by the batch record's section B; finding 8. |
| `SkShiftLocal.fss`, `SkShiftParam.fss`: `shift` bound as a local or a parameter | `Variable shift is already declared.` | runs | Settles for `walk` (`declarations.tex:454-456`, `:533`, with `components/source-code.tex:305`, "Every component implicitly imports the Fortress core APIs"); finding 8. |
| `SkShiftFn.fss`, `SkShiftFn2.fss`: a user top-level `shift` | runs | runs | agree |
| `SkWalkOnly.fss` (walk only: the compiled prelude has no `NN` shifts, no `big` and no `shift`): `ZZ32` receiver with a count that is not a `ZZ64` | 64-bit `ZZ64` answers (`SkWalkOnly.walk.txt:2-6`, `:9`) | — | Finding 3. |
| `SkWalkOnly.fss`: unsigned counts of 2^63 and 2^64-1, nine `shift` cases (`NN32` receiver, `0` count, count ±2^70, `MAX32`, `MIN64`, and others), `ZZ` ops with an `NN64` of 2^64-1 | all right (`SkWalkOnly.walk.txt:10-12`, `:14-22`, `:24-27`) | — | — |
| `SkWalkOnly.fss`: the renamed `Range` shifts (`(1:5) << 2`, `>> 3`, `.shiftLeft(2)`, `(0#4) >> 10`) | `[-1,0,1,2,3]`, `[4,5,6,7,8]`, `[-1,0,1,2,3]`, `[10,11,12,13]` (`SkWalkOnly.walk.txt:29-32`) | — | — |
| `sk-base-cases.sh`: the four count types on the landed tree and on the base natives | `ZZ` count: base ends the run, landed 25769803776 : `ZZ64`; `NN32`/`NN64`: the same answer before and after; `ZZ64`: 0 : `ZZ32` before and after (`sk-base-cases.txt`) | — | Finding 3's loud-to-quiet change. |
| `SkBigLcm.fss` (walk only; the compiled `ZZ` has no `LCM`) | `1 LCM -5` = -5, `-4 LCM 6` = -12, `0 LCM 0` a raw `ArithmeticException` (`SkBigLcm.walk.txt:1-4`, `:8-9`) | — | Finding 2. |
| `SkBigAlloc.fss`: `ZZ 3 LSHIFT 2147483647` at three heaps | `OutOfMemoryError` at 256m, `IntegerOverflow` at 768m and 4g (`SkBigAlloc.txt`) | — | Finding 1. |
| Regression, under the harness: the worker's 36 plus 14 `List` and `Range` users (`ArrayListQuick`, `ListTest`, `HeapTest`, `ShuffleTest`, `Reversals`, `Generator2Test`, `PureListQuick`, and others) | `OK (50 tests)` (`harness-regression-skeptic.txt`) | — | — |

## 10. The failure-mode question

These are the loud failures the rung turned into values, and what each value is:
- **`0 LCM 0`**: a raw `ArithmeticException` becomes 0. This is the specification's answer (`basic-integers.tex:529`).
- **Out-of-range `ZZ64.narrow`**: a `ProgramError` becomes the low 32 bits. This is Pavol's decision; the specification is silent.
- **A `ZZ` count on a fixed-width shift**: `ProgramError: Value 33 might not fit in ZZ64.` becomes a value. On a `ZZ64` receiver the value is right. On a `ZZ32` receiver it is the `ZZ64` method's 64-bit answer, typed `ZZ64`: `3 LSHIFT big(33)` = 25769803776 and `3 LSHIFT big(40)` = 3298534883328, where the shared table's rule for a `ZZ32` gives 0. That is finding 3, and the report does not state it.
- **A `ZZ` shift whose result the JVM cannot hold**: at 768 MB and above, a raw `ArithmeticException` becomes a catchable `IntegerOverflow`. At the launcher's default 256 MB it is still an `OutOfMemoryError`, as on the base tree (finding 1).

In the other direction, the rung makes previously valid `walk` programs that bind `shift` a static error. The specification requires that, and the corpus has no such program.

## 11. Findings

1. **(The refusal.)** At the interpreter's default heap, an unrepresentable `ZZ` left shift with a count inside the `int` range is an uncatchable `OutOfMemoryError`, not `IntegerOverflow`, and the rung's gated test dies at `:93`.
   - Cause: `BigNum.shiftLeft` calls `u.shiftLeft((int) v)` (`BigNum.java:245`) and translates only the `ArithmeticException` that `BigInteger` raises after it has allocated the magnitude array. For `3 << 2147483647` that array is about 268 MB.
   - Evidence: `test-default-heap.txt` (red), `test-default-heap-no93.txt` (`PASS` without `:93`), `SkBigAlloc.txt`.
   - Repair: one line after `:243`, `if (u.abs().bitLength() + v > Integer.MAX_VALUE) throw Int.overflow();`. `BigInteger` holds magnitudes up to 2^31-1 bits, so the test is exact, and the `catch` stays as a backstop. I applied it in a scratch class overlay only, not to the tree (`fix-trial-patch.txt`), and the unmodified test printed `PASS` at `-Xmx256m` (`fix-trial-default-heap.txt`).
   - This is not a regression (the base tree also runs out of memory at 256 MB), but the rung's claim and its gated assertion hold only at the harness heap.
2. **The unbounded ℤ's `LCM` keeps row 334's defect.** Under `walk`, `big(1) LCM big(-5)` = -5, `big(-4) LCM big(6)` = -12, and `big(0) LCM big(0)` ends the run with `ArithmeticException: BigInteger divide by zero` (`SkBigLcm.walk.txt`).
   - Location: `BigNum$Lcm`, `BigNum.java:176-188`, bound at `Library/FortressLibrary.fss:871-872`, in a file the rung already edits.
   - Settled by `basic-integers.tex:527-529`. That section declares `LCM` on ℤ itself (`:521`).
   - Consequences: the report's site count misses it (`REPORT.md:128`), and the row 334 note cannot say "close" while this stands.
3. **Under `walk`, a `ZZ32` receiver shifted by a count that is not a `ZZ64` (`ZZ`, `NN32`, `NN64`) is computed at width 64 and answered as a `ZZ64`.**
   - Cause: `ZZ32`'s own `LSHIFT`/`RSHIFT` declare `b:ZZ64` (`Library/FortressLibrary.fss:688-691`), so any other count type dispatches to `ZZ64`'s `b:AnyIntegral` pair (`:756-759`, `Long$LShift`), although `Integral[\I\]` declares `opr LSHIFT(self,b:AnyIntegral):I` (`:637-638`).
   - Before and after: the `NN` counts gave this answer before the rung, while the `ZZ` count ended the run and now gives it (`sk-base-cases.txt`).
   - Repair and home: the repair is a change of an existing declaration's type, which the batch record makes a stop (`CLIMB-BATCH-3.5.md:57`). So it goes to home 3 and a recommended row. The report must state the value, and must stop presenting `:82` as covering the `ZZ32` case of section 6.1.
4. **Four citations of the batch record are off by one**, `:18`, `:36`, `:46` and `:58`, and so are "lines 40-58" (section 0 above). `:18` is in the provenance block.
5. **The GCD/LCM citation leaves out half of what it cites.**
   - Where: `basic-integers.tex:524-525` ("If either argment is 0, the result equals the other argument") and `:528-529` ("If either argment is 1, the result equals the other argument").
   - The clash: taken alone, those two sentences give -4 for `0 GCD -4` and -5 for `1 LCM -5`. The rung asserts 4 and 5, citing `:524` and `:528` (`IntSemanticsRungI.fss:105`, `:107`), which is what the "always nonnegative" sentence on the same lines requires.
   - What is missing: the report does not say that the passage conflicts with itself for a negative argument, or that the reading is Pavol's row-334 decision.
6. **The two paths pick different methods for a mixed-width count**: `ZZ32 3 LSHIFT` a `ZZ64` count of 33 is 0 under `walk` and 25769803776 compiled (`SkCountType.*.txt`). After rung B the compiled answer stays 25769803776, because `ZZ64`'s 64-bit shift of 3 by 33 is unchanged. The batch's agreement covers only same-type counts. Outside this rung.
7. **The compiled `ZZ64` multiply rejects a product equal to `Long.MIN_VALUE`.** `longOverflowingMul` (`simpleLongArith.java:70-85`) tests `Long.MAX_VALUE / |a| < |b|` (`:82`). Through `REM` (`CompilerBuiltin.fss:597`), which the compiled `MOD` and `GCD` call, `MIN REM 2`, `MIN MOD 2` and `MIN GCD 2` therefore throw (`SkMulMin.compiled.txt:2-7`). This is not the zero guard of the siblings paragraph, and no ledger row names it (`grep -n longOverflowingMul explorations/fortress-gap-ledger.md` is empty). Outside this rung.
8. **The spec's `shift` exists only under `walk`**: compiled, `shift(3, 33)` is `Variable shift is not defined.`, and `shift` stays bindable (`SkShiftCall.*.txt`, `SkShiftLocal.*.txt`, `SkShiftParam.*.txt`). This was decided in `CLIMB-BATCH-3.5.md:29`, and the judge reported it to Pavol (`JUDGE.md:84`), but no ledger row carries it.

## Required corrections for the repair round

1. Finding 1, with the discipline:
   - Capture the red first (the assertion `:93` already exists; `probes/skeptic/test-default-heap.txt` is the red on the landed tree).
   - Apply the precheck in `BigNum.shiftLeft`.
   - Capture the test passing under `bin/fortress` with `JAVA_FLAGS` unset. Also capture it passing under the harness.
   - Correct `REPORT.md` section 4.4 and `record.md` FACTS line 2 to describe the precheck instead of "the JVM's own `ArithmeticException` … caught at the call and translated".
2. Finding 2, either way:
   - Repair `BigNum$Lcm` (zero first, then a nonnegative result) with assertions in `IntSemanticsRungI.fss` (`big(1) LCM big(-5)` = 5, `big(-4) LCM big(6)` = 12, `big(0) LCM big(0)` = 0), red captured before the edit. This is home 1.
   - Or add an `XXX` file, shown red on a deliberate fix, and keep row 334 open for ℤ. This is home 2.

   Correct `REPORT.md:128`'s site count to name `BigNum$Lcm`.
3. Finding 3: state in `REPORT.md` section 6.1 and in `record.md` FACTS line 2 what a `ZZ32` receiver now answers for a `ZZ`, `NN32` or `NN64` count (the `ZZ64` method's 64-bit answer, typed `ZZ64`; `3 LSHIFT big(33)` = 25769803776). Name the declaration that routes it (`FortressLibrary.fss:688-691` against `:756-759` and `:637-638`) and why the rung cannot repair it (the stop at `CLIMB-BATCH-3.5.md:57`). Point at `probes/skeptic/SkWalkOnly.walk.txt` and the recommended row.
4. Finding 4: `CLIMB-BATCH-3.5.md:18` → `:17` in the provenance block; `:36` → `:35`, `:46` → `:45` and `:58` → `:57` in the body; "lines 40-58" → "39-57".
5. Finding 5: one sentence in the provenance `spec:` line and in section 4.2 saying that `basic-integers.tex:524-525` and `:528-529` also say "the result equals the other argument", which conflicts with "always nonnegative" for a negative argument, and that the rung follows the nonnegative reading as Pavol decided for row 334.

## Recommended ledger rows (for the gather to open or refuse)

These are in the structured report's `recommendedRows`, one each: finding 3, finding 6, finding 7, finding 8.

# Skeptic's second judgement of rung I: the repair round at `d68be2587`

**Verdict: approved, with one required correction.** The refusal ground is repaired. At the launcher's own heap (`JAVA_FLAGS` unset, so `-Xmx256m`) and on empty caches, the gated test prints `PASS` (`probes/skeptic/r2-test-default-heap.txt`). My own probe of 27 `ZZ` shifts also gives every wanted answer at that heap, including 14 refused shifts that no longer allocate first (`probes/skeptic/SkR2BigShift.walk.txt`). The unbounded `ZZ`'s `LCM` is repaired and asserted. The correction concerns the record: `REPORT.md:148` and the row 336 note (`record.md:37`) present `0 LCM 0` as closed on the `LCM` route, but `NN32` and `NN64` `0 LCM 0` still end a `walk` run with row 336's raw `ArithmeticException` (finding R2-1).

The first judgement above (lines 1-173) stays byte for byte as it was, because `REPORT.md`, `record.md` and `JUDGE.md` cite it by line. This part starts at line 175.

**What I read and ran.** The branch was at `d68be2587` and the worktree was clean. The repair round is five commits, `c54346915` to `d68be2587`, and its source diff (`git diff bdb94f2a1..HEAD`) is four lines of `BigNum.java` and three assertions. I read:
- the repair round's diff, the rewritten `REPORT.md` and `record.md`, and `JUDGE.md`'s second ruling (its line 91 on);
- every capture the repair round added.

The differentials ran at one thread (`FORTRESS_THREADS=1`, from `experiment/env.sh`), because the diff adds no mutable variable, field, atomic block or library write. The built class carries the edit: `javap -c` of `ProjectFortress/build/.../BigNum.class` shows the `bitLength` call ahead of `shiftLeft`. The worker's `ant compileAll` had emptied the bytecode cache. I rebuilt it in library order (all five exit 0) before the compiled runs. The compiled path is the base tree's, because rung B is in another worktree. I did not edit the worker's files.

## 0. The provenance block (`REPORT.md:3-7`)

It has five lines, and I opened every citation with `sed -n`. All of them hold.
- **problem:** `IntSemProbe-before.txt:8` and `run-enders-before.txt:1-3` hold. So do `probes/skeptic/SkBigLcm.walk.txt:1` (`ZZ 1 LCM -5 = -5`) and `probes/skeptic/test-default-heap.txt:1-2` (the `OutOfMemoryError`).
- **spec:** `basic-integers.tex:518-529`, which I read from `:505` to `:535`, says what the line says:
  - `:518-519` are the commented source declarations returning `NN`;
  - `:520-521` are the rendered `ZZ` ones;
  - "always nonnegative" is at `:524` and `:528`;
  - "equals the other argument" is at `:524-525` and `:528-529`;
  - `0` for a zero argument is at `:529`.

  `CLIMB-BATCH-3.5.md:17` and `:19` are now the decisions, the off-by-one repaired. `opr-overview.tex:154-155` and `basic-integers.tex:695-702` hold, as does the declarations passage I checked in the first judgement. No citation is to `Specification/library/apis/`.
- **precedent:** `Evaluator.java:224-226`, `StringPrim.java:130-133`, `CompilerBuiltin.fss:616-619`, `simpleArbitraryPrecisionArith.java:117-119`, `UnsignedLong.java:240-243`, `probes/skeptic/fix-trial-patch.txt:2`, `Fortress.Number.fsi:162` and `FortressLibrary.fss:881-884` all hold.
- **deviation:** `PLAN.md:52`, `FortressLibrary.fss:885-886`, `WellKnownNames.java:86`, `RangePrototype.fss:66`/`:171`, `Int.java:134-148` and `BigNum.java:184-190` (the swap, now on magnitudes) all hold.
- **historical:** it names all twelve 2012-tree files that `git diff --name-only abdfbb2db...HEAD` lists, apart from the rung's own new test. `CLIMB-BATCH-3.5.md:71` is the provenance rule. Commit `1401fd1a2`, which carries the `BigNum.java` edit, has its `historical:` body line.

## 1. The recorded failure

Both reds of this round predate the edit. They are in commit `c54346915`; `BigNum.java` is first touched in `1401fd1a2`.
- `test-before-biglcm.txt:1`: `FAIL: a BigNum: -5 =/= a Int: 5; row 334: ZZ 1 LCM -5`, located at `IntSemanticsRungI.fss:146` (`:7` of the capture).
- `probes/test-default-heap-before.txt:16-19`: `OutOfMemoryError: Java heap space` at `BigNum.shiftLeft(BigNum.java:245)` of that tree. This reproduces my first judgement's red.

The earlier rounds' reds stand as I found them in the first judgement.

## 2. The diff

The source diff has four lines, and the three assertions follow in section 4.

**`BigNum$Lcm`** (`BigNum.java:176-192`). `:178` returns zero for a zero argument, and `:179-180` take both magnitudes. After them come the unchanged `gcd`, the smaller-first swap (`:184-189`, now comparing magnitudes) and `u.divide(g).multiply(v)`. This is the compiled body's shape (`CompilerBuiltin.fss:616-619`). The one deviation is the swap, which only reorders two positive factors. No comment was added.

**`BigNum.shiftLeft`** (`:240-254`). The precheck is at `:247`:
- It sits after the count bound at `:246`, so `bitLength + v` cannot overflow the `long`. It sits before the `try`, and the `catch` is kept at `:248-253`.
- `RShift` maps `Long.MIN_VALUE` to `Long.MAX_VALUE` (`:236`), and `:246` refuses that for a nonzero receiver.
- The check is exact on both sides at the Fortress level:
  - three results of exactly 2^31-1 bits are admitted at 4 GB (`SkR2BigEdge.walk.txt:2-4`: `1 LSHIFT 2147483646`, `-3 LSHIFT 2147483645`, `-4 LSHIFT 2147483644`);
  - six results one bit longer are refused at 256 MB (`SkR2BigShift.walk.txt:3-8`: `±1 << 2147483647`, `±2 << 2147483646`, `±4 << 2147483645`).

  The worker's Java-level probe agrees (`probes/PrecheckBoundary.txt`, 24 cases, `mismatches 0`).

The edit does what `JUDGE.md`'s second ruling (section 8, steps 1 and 3) says, and only that.

## 3. The precedent search

The worker followed the right precedent, the compiled `LCM` body. Its site count for the sign defect is now right: I grep five signed `LCM` natives (`Int`, `Long`, `BigNum`, dormant `ZZ32.java:128-133`, dormant `IntLiteral.java:155-167`). I checked that `IntLiteral`'s binding is inside the commented-out block `FortressBuiltin.fss:483-525` (`:508`).

The same grep shows two more `LCM` natives, the unsigned ones, which divide by `g` with no zero test:
- `NN32$Lcm` (`NN32.java:145-150`, `Unsigned.divide(u, g)` at `:148`);
- `UnsignedLong$Lcm` (`UnsignedLong.java:146-151`, at `:149`).

Both are in files this rung edits. The batch record puts the unsigned pair out of the rung (`CLIMB-BATCH-3.5.md:47`), so not repairing them is right. But the report's claim about the `LCM` route of row 336 is wrong as written (finding R2-1).

## 4. The test

`ProjectFortress/tests/IntSemanticsRungI.fss` has 98 `assert(` lines. `overflows(` occurs 26 times: the helper plus 25 uses. It has one comment line (`:4`), and the three new assertions (`:146-148`) carry their citation in the message.
- **Default heap:** I ran it under `bin/fortress` with `JAVA_FLAGS` unset and `FORTRESS_CACHES` at an empty directory, which it filled. It printed `PASS`, exit 0 (`probes/skeptic/r2-test-default-heap.txt`).
- **Harness, 768 MB:** under the harness it is `OK (1 test)` (`probes/skeptic/r2-harness-one.txt`).
- **Regression subset:** the worker's 36-file subset, re-run by me after the `BigNum.java` edit, is `OK (36 tests)` (`probes/skeptic/r2-harness-regression.txt`). No other file of `ProjectFortress/tests/` names `LCM` or `GCD`.

One limit, stated here because the report implies it but does not say it (finding R2-2). At the harness's 768 MB, `:93` passes with or without the precheck: my first judgement's harness run was on the tree before the precheck and was `OK` (`probes/skeptic/harness-test.txt`). So `ant testSystem` does not guard the precheck; only a run at 256 MB tells the two trees apart. No assertion can do better cheaply, because the largest allocation a refused shift can make, about 268 MB, always fits in 768 MB. I do not require a change.

## 5. Competing declarations

This round adds no name:
- `bitLength` occurs in `src/com/sun/fortress/interpreter/` only at `Int.java:268` and `BigNum.java:247`.
- The top-level `shift` is still declared only at `FortressLibrary.fsi:544`/`.fss:885`, beside the array-origin dotted ones.
- `IntSemanticsRungI` occurs only in its own file, across `ProjectFortress/tests`, every `ProjectFortress/*_tests`, `test_library`, `Library` and `src/com/sun/fortress/`.

## 6. `record.md`

**FACTS.** The FACTS lines are true as written and sourced:
- line 1: the 25 `overflows(...)` assertions;
- line 2: the precheck at `BigNum.java:247`, `BigNum$Lcm` at `:176-192` and row 379's values, which match `probes/skeptic/SkWalkOnly.walk.txt:2-6` and `:9`;
- line 5: the three heaps.

**Ledger notes.**
- The notes on rows 334, 335, 346 and 347 cite existing rows (`explorations/fortress-gap-ledger.md:345-358`) and renumber nothing. Their line citations hold (`BigNum.java:178`, `:228-254`, `:247`, `:248-253`).
- I checked the five new rows against their captures:
  - 379: `SkWalkOnly.walk.txt:2-6`, `:9`, and `sk-base-cases.txt`;
  - 380: `SkCountType.walk.txt:1` and `.compiled.txt:2`;
  - 381: `SkMulMin.walk.txt:1-6` against `.compiled.txt:2-7`, six operations and six walk values;
  - 382: `SkShiftCall.compiled.txt:1-4` and `SkShiftLocal.compiled.txt:1-3`;
  - 383: `BigShiftHeapEq-jstack.txt:4-8`. For 383 I also read the code it cites (`EvaluatorBase.java:75-78`, `ProgramError.java:44`, `:48-54`, `FBigNum.java:40-42`, `OverloadedFunction.java:821-827`), and it says what the row says.

  They are verifiable six months from now.
- **One note is wrong in scope.** The row 336 note (`record.md:37`) reads "Rung I closed the `LCM` route only: `0 LCM 0` … is `0` on `ZZ32`, `ZZ64` and `ZZ`", and `REPORT.md:148` says "Row 336's shape is gone from `LCM`". Both would reach the ledger as a closed route while two routes stay open (finding R2-1).

## 7. The three homes

| defect | home | where it is now | checked |
|---|---|---|---|
| Finding 1: `ZZ` shift out of memory at 256 MB | 1 | `IntSemanticsRungI.fss:93` passes under `bin/fortress` at 256 MB; red `probes/test-default-heap-before.txt` | I ran it: `r2-test-default-heap.txt` |
| Finding 2: `BigNum$Lcm` signed, `0 LCM 0` divides by zero | 1 | `:146-148` pass; red `test-before-biglcm.txt` | I ran it: `r2-test-default-heap.txt`, `r2-harness-one.txt` |
| Finding 3: `ZZ32` receiver, count not a `ZZ64` | 3 (specification silent) | row 379; captures committed; `REPORT.md` section 6.1 states the value and why it is not repaired | `grep -rn "LSHIFT\|RSHIFT\|narrow" Specification/basic Specification/basic-lib` matches nothing, as the `spec:` line says |
| Finding 6: mixed-width count, two methods | 3 (specification silent) | row 380 | captures committed |
| Finding 7: compiled `longOverflowingMul` at `Long.MIN_VALUE` | fourth case | row 381, rung B's file | captures committed |
| Finding 8: `shift` only under `walk` | fourth case | row 382 | captures committed |
| Round 2's own: overload resolution stringifies a large `ZZ` | 3 | row 383 | code read, captures committed |
| R2-1 (mine): `NN32`/`NN64` `0 LCM 0` raw `ArithmeticException` | the specification settles it (`basic-integers.tex:529` with `:65`, ℕ being ℤ≥); outside the rung by `CLIMB-BATCH-3.5.md:47` | recommended row; the record's scope corrected (required) | `SkR2NN32Lcm0.walk.txt:4`, `:19-21`; `SkR2NN64Lcm0.walk.txt:4`, `:19-21` |
| R2-3 (mine): compiled `ZZ` `<<<` raw `ArithmeticException` on an unrepresentable result | the specification settles it (`opr-overview.tex:154-155`); outside the rung (compiled path) | recommended row, or an addition to row 382 | `SkR2ShiftC.compiled.txt:2-4`, `:17`, `:36` |

## 8. The count table

The table is `probes/checker-count-after-shift.txt`, `#total 103`, byte-identical to `probes/checker-count-before.txt`. The report declares 103 (`REPORT.md:133`, `:171`), `record.md:51` says "stays 103", and the manifest's `expectedCheckerCount` is 103, a prediction. Table 103, report 103, prediction 103: no mismatch. This round edits no file under `Library/` or `ProjectFortress/LibraryBuiltin/`, so the stage's input is unchanged.

## 9. The differentials I ran

These are my own programs, none of them the rung's test. They are in `probes/skeptic/`, and each capture sits beside its program. Walk runs used the shell's 4 GB `JAVA_FLAGS` unless a capture's first line says otherwise. The compiled runs used the base tree's compiled path, which this rung does not touch.

| program | walk (landed) | compiled (base) | outcome under rule 4 |
|---|---|---|---|
| `SkR2LcmBig.fss`: 18 pairs through `big`, `GCD` and `LCM` (zero first and second, `±1`, `-6 LCM -4`, `10 LCM -4` and `-10 LCM 4` to drive the swap on magnitudes, `12 LCM -18`, `2^40` against `-3·2^39`, `ZZ64 MIN` against 0, 1 and itself) | every answer nonnegative; `0 LCM 0 = 0`; `MIN64 LCM 1`, `MIN64 GCD 0` and `MIN64 LCM MIN64` are `2^63` (`SkR2LcmBig.walk.txt:31-36`) | `Variable big is not defined.` (the compiled `ZZ` has no `big`, `GCD` or `LCM`) | walk only; the specification's answers throughout |
| `SkR2Lcm64.fss`: the same 18 pairs on `ZZ64` | identical to `SkR2LcmBig.walk.txt` on every in-range pair; `IntegerOverflow` where the answer is `2^63` (`SkR2Lcm64.walk.txt:32-36`) | differs on `0 GCD -5`, `12 LCM -18`, `12 GCD -18`, and `LCM`/`GCD` of `2^40` and `-3·2^39`: `IntegerOverflow` (`SkR2Lcm64.compiled.txt:5`, `:20-21`, `:26-27`); the reversed pairs are right | The specification settles it against the compiled run (`basic-integers.tex:523-529`). This is the zero quotient inside the compiled `REM` that `GCD` loops on (`CompilerBuiltin.fss:597`, `:605-615`), which is rung B's siblings row (`CLIMB-BATCH-3.5.md:35`). No new row. |
| `SkR2BigShift.fss` at 256 MB: 14 refused shifts (`±1`, `±2`, `±4` at the bit boundary; `RSHIFT` by `-2147483646` and by `ZZ64 MIN`; counts `ZZ 2^127` and `ZZ64 MAX`; `shift` on a `ZZ` and on a `ZZ32` receiver; the shift inside a sum; a `catch e Exception`), 8 zero and saturating cases, and 5 representable round trips | 27 of 27 at the wanted answer, exit 0 (`SkR2BigShift.walk.txt:3-31`) | `Variable big is not defined.`, `Variable shift is not defined.` | walk only |
| `SkR2BigEdge.fss` at 4 GB: three results of exactly 2^31-1 bits | all three return (`SkR2BigEdge.walk.txt:2-4`) | — | the precheck admits the representable edge |
| `SkR2ShiftC.fss`: the compiled `ZZ`'s own shift, `<<<` | `asZZ` undefined under `walk`; the walk counterpart is `shift(ZZ 1, 2147483647)` = `IntegerOverflow` (`SkR2BigShift.walk.txt:13`) | `3 <<< -5 = 0`, `-3 <<< -5 = -1`, `3 <<< 33 = 25769803776` (`:2-4`); `3 <<< 2147483647` ends the run with `java.lang.ArithmeticException: BigInteger would overflow supported range` that `catch e IntegerOverflow` does not see (`:17`, exit 1 `:36`) | The specification settles it against the compiled run (`opr-overview.tex:154-155`). Outside the rung. Finding R2-3. |
| `SkR2Fixed.fss`: 14 fixed-width shifts outside the rung's table (`ZZ32 MIN LSHIFT -32`, `MAX RSHIFT -1`, `ZZ64 MIN LSHIFT -63`, `1 LSHIFT 63`, `-1 LSHIFT -64`, and others), 5 `GCD`/`LCM` cases (`-46340 LCM 46341`, `-65536 LCM 32768`, `MIN GCD -2`, `MIN LCM MIN`, `MIN LCM 0`), 3 `narrow`s | every answer at Pavol's rule | differs on the four negative counts (`SkR2Fixed.compiled.txt:3`, `:7`, `:11`, `:14`) and on `narrow(-2^31 - 1)` (`:21`); the rest agree | Specification silent. Pavol's rule decides for `walk`. Rows 335 and 346, compiled half, rung B's. |
| `SkR2NN32Lcm0.fss`, `SkR2NN64Lcm0.fss` | `4 LCM 6 = 12`, `0 GCD 0 = 0`, `4 LCM 0 = 0`; `0 LCM 0` ends the run with `ArithmeticException: / by zero` from `Unsigned.divide`, called at `NN32.java:148` and `UnsignedLong.java:149` (`:4`, `:19-21` of each) | not defined: the compiled `NN32`/`NN64` have no `GCD`/`LCM` | The specification settles it against `walk` (`basic-integers.tex:529`, with ℕ = ℤ≥ at `:65`). Outside the rung (`CLIMB-BATCH-3.5.md:47`). Finding R2-1. |
| Regression: the worker's 36 files, after the `BigNum.java` edit | `OK (36 tests)` (`r2-harness-regression.txt`) | — | — |

## 10. The failure-mode question

This round turns two loud failures into other outcomes:
- **`ZZ` `0 LCM 0`:** a raw `ArithmeticException: BigInteger divide by zero` becomes `0`, the specification's answer (`basic-integers.tex:529`). A signed `LCM` becomes its magnitude (`:528`, with the `NN` return type at `:519`).
- **An unrepresentable `ZZ` left shift at 256 MB:** an uncatchable `OutOfMemoryError` becomes a catchable `IntegerOverflow` (`opr-overview.tex:154-155`). A loud failure becomes a louder, catchable one, and no quiet value is produced.

A representable shift larger than the heap still runs out of memory, which is the JVM's limit and is recorded (`REPORT.md:82`). The one quiet value the rung produces overall, a `ZZ32` receiver's 64-bit answer for a `ZZ`, `NN32` or `NN64` count, is now stated in `REPORT.md` section 6.1 and carried by row 379.

## 11. Findings

- **R2-1 (the required correction).** `REPORT.md:148` says "Row 336's shape is gone from `LCM`", and the row 336 note (`record.md:37`) is headed "closed the `LCM` route only". Two `LCM` routes still end a `walk` run with row 336's raw exception: `NN32` and `NN64` `0 LCM 0` raise `ArithmeticException: / by zero` from `Unsigned.divide(u, g)` with `g = 0`, at `NN32.java:148` and `UnsignedLong.java:149` (`probes/skeptic/SkR2NN32Lcm0.walk.txt:4`, `:19-21`; `probes/skeptic/SkR2NN64Lcm0.walk.txt:4`, `:19-21`). Not repairing them is right, because the batch record puts the unsigned pair out (`CLIMB-BATCH-3.5.md:47`). But the two sentences are false as written, and the rule-2 count in `REPORT.md` section 8 does not name these two sites, although they are in files the rung edits.
- **R2-2 (no change required).** The gate at 768 MB cannot see the precheck (section 4). The record's FACTS line 5 carries the general lesson; this is its instance.
- **R2-3 (outside the rung).** The compiled `ZZ` `<<<` (`CompilerBuiltin.fss:547`, `simpleArbitraryPrecisionArith.java:93-95`, a bare `a.shiftLeft(k)`) raises a raw `ArithmeticException` on an unrepresentable result, which a Fortress `catch` does not see. Row 382's text names `<<<` as the body that "already computes" the specification's `shift` on the compiled path. A repair taking that route would inherit this failure, so it needs `walk`'s precheck.
- **Checked and right.** The four source lines, the three assertions, both reds before the edit, the pass at 256 MB and under the harness, the regression subset, the provenance block, the corrected citations (`:17`, `:35`, `:45`, `:57`, "39-57"), the passage reconciliation, the five new rows against their captures, and the count table.

## Required correction

1. **`REPORT.md:148` and `record.md:37`.**
   - Say that the `LCM` route of row 336 is closed on the signed types only: `ZZ32`, `ZZ64` and `ZZ`.
   - Say that `NN32` and `NN64` `0 LCM 0` still end a `walk` run with the raw `ArithmeticException: / by zero`, from `Unsigned.divide(u, g)` at `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java:148` and `UnsignedLong.java:149`, citing `probes/skeptic/SkR2NN32Lcm0.walk.txt` and `probes/skeptic/SkR2NN64Lcm0.walk.txt`.
   - Say that the batch record left the unsigned pair out (`explorations/coordinator/CLIMB-BATCH-3.5.md:47`).

   In `REPORT.md` section 8's rule-2 paragraph, add the two unsigned `LCM` natives as sites of the zero-divisor shape that the rung does not repair.

## Recommended rows (for the gather to open or refuse)

These are in the structured report's `recommendedRows`: R2-1's unsigned `0 LCM 0` and R2-3's compiled `<<<`.

---

At the gather (2026-09-24) the provisional rows 379-383 this text cites became ledger rows 380-384, rung B having opened 378 and 379; finding 7's row, 382, closed with rung B's `ce0c7f453`; the second judgement's two recommended rows became rows 385 and 386, and its required correction is made in `REPORT.md` and `record.md`.

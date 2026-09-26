# Skeptic: rung K, `rung-shift-count` (climb batch 4), first judgement

**Verdict: approved, with four required corrections for the commit stage.** The library edit is exactly what the decision of 2026-09-24 (`explorations/coordinator/POSITIONS.md:89`) names, six declaration lines copied token for token from the precedent. The failure was captured before the edit. The gated assertion fails on the base library and passes on the branch, and I reran it. The corrections are to the record, not to the code. Three sentences of the record state something the cited source does not say (one is a count, two are specification derivations), and `REPORT.md` does not exist.

Branch `wip/rung-shift-count`, net change `git diff 47437c65f...a857544ca`: `Library/FortressLibrary.fss` (2 lines), `Library/FortressLibrary.fsi` (4 lines), `ProjectFortress/tests/IntSemanticsRungI.fss` (+7 lines), and the rung's own directory. Worktree clean at `a857544ca` when I started.

## 0. The provenance block

`REPORT.md` does not exist. The worker reports that the Write tool refused it for a subagent and that it did not work around the refusal through the shell. I checked that the refusal is real and depends on the file's name. A Write of a one-line file named `REPORT.md` in my own scratch directory was refused with "Subagents should return findings as text, not write report files", while this `SKEPTIC.md` was written by the same tool. So the provenance block could not be checked where the brief puts it. Its five lines are in the structured report's `specCitations`, and I opened every citation in them:

- problem: `explorations/compile-ladder/rung-int-semantics-walk/probes/skeptic/SkWalkOnly.walk.txt:2` reads `ZZ32 3 LSHIFT a ZZ count of 33 = 25769803776 : ZZ64   (want 0 : ZZ32)   DIFF`. `explorations/compile-ladder/rung-shift-count/test-before.txt:2` is the rung's red. Both say what the block says.
- spec: `Specification/basic/objects.tex:149-154` (an object must define every abstract method it inherits), `basic/traits.tex:509-512` (the same for abstract method declarations), `basic/traits.tex:461-467` (a declaration of equal parameter type stops inheritance), `basic/components/source-code.tex:399-404` (an api method is satisfied by component methods whose parameter types union to its own). `grep -rn 'LSHIFT\|RSHIFT' Specification/` prints nothing; I reran it. `explorations/coordinator/CLIMB-BATCH-3.5.md:17` is the row 335 width decision. No line cites `Specification/library/apis/`.
- precedent: `Library/FortressLibrary.fss:756-759` is `ZZ64`'s component pair with `b:AnyIntegral`, bound to `Long$LShift`/`Long$RShift`.
- deviation: `ProjectFortress/tests/IntSemanticsRungI.fss:14-18` is the helper and `:89` the assertion. `SkWalkOnly.fss:4-12` is the typecase the helper is shaped on.
- historical: `Library/FortressLibrary.fss:688-691`, `Library/FortressLibrary.fsi:491-492`, `:530-531`. These are both 2012-tree files the diff edits. `IntSemanticsRungI.fss` is the revival's own (first commit `d6faad28f`, 2026-09-24).

The block's content is correct. Its location is missing, which is correction 1.

## 1. The recorded failure

`explorations/compile-ladder/rung-shift-count/test-before.txt:2`: `FAIL: J24/0:25769803776 : not a ZZ32 =/= J8/0:0 : ZZ32; row 380: ZZ32 3 LSHIFT a ZZ count of 33`, exit 1. It was committed in `3eb25c7b2`, whose tree still has `opr LSHIFT(self,b:ZZ64):ZZ32` at `Library/FortressLibrary.fss:688` (`git show 3eb25c7b2:Library/FortressLibrary.fss | sed -n 685,692p`). So the capture was taken with the test in place and the library at base. That is the required recorded failure.

## 2. The diff against the specification

Six declaration lines change, and nothing else under `Library/` or `ProjectFortress/LibraryBuiltin/`:

- `ZZ32`'s `LSHIFT`/`RSHIFT` go from `b:ZZ64` to `b:AnyIntegral`: component `Library/FortressLibrary.fss:688`, `:690`, still bound to `Int$LShift`/`Int$RShift`; api `.fsi:491-492`.
- `ZZ64`'s api pair goes from `b:ZZ64` to `b:AnyIntegral` at `.fsi:530-531`, which matches its component at `.fss:756`, `:758`.

The natives already read any count by its class. `Int.ZL2Z.applyMethod` calls `shiftCount(y)` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:93-94`, `:261-272`), and `FNN32.getLong` is unsigned (`interpreter/evaluator/values/FNN32.java:31-33`). So no Java change is needed. The edit is as small as the decision allows; the `ZZ64` api lines are the decision's, not the test's.

The derivation is right in substance, with one step wrong. Before the edit, `ZZ32`'s own declaration had parameter type `ZZ64`. It stopped neither `ZZ64`'s `LSHIFT(self:ZZ64, b:AnyIntegral):ZZ64` nor `Integral[\ZZ32\]`'s abstract `LSHIFT(self:Integral[\ZZ32\], b:AnyIntegral):ZZ32` from being inherited (`traits.tex:461-467`). The self types are `ZZ64` and `Integral[\ZZ32\]`, and neither is a subtype of the other: `Integral` extends only `StandardTotalOrder[\I\]` and `AnyIntegral` (`Library/FortressLibrary.fsi:412`), and `ZZ64` extends `Integral[\ZZ64\]`, not `Integral[\ZZ32\]` (`:499`). So under `Specification/basic/overloading.tex:280-285` neither declaration is more specific than the other.

The rule the base library broke is the Meet Rule for Functional Methods (`Specification/advanced/overloading.tex:396-411`). A trait that provides both of two such declarations must provide one for their meet, and `ZZ32`'s `(b:ZZ64)` declaration is not that one. It also broke `objects.tex:149-154`: `Int` left the inherited abstract method undefined. After the edit, `ZZ32`'s `(self, b:AnyIntegral):ZZ32` stops both inheritances. Since `ZZ32` is a subtype of both self types, it is more specific than either for a `ZZ32` receiver (`basic/overloading.tex:280-285`), and it is a valid overloading with `ZZ64`'s under the Subtype Rule (`advanced/overloading.tex:162-166`).

`record.md`'s row 380 note says instead that the abstract declaration "is the most specific one applicable". The passage it cites does not say that. This is correction 3.

## 3. The precedent search

The right precedent was found and followed: `ZZ64`'s component pair, `Library/FortressLibrary.fss:756-759`, copied as `(self,b:AnyIntegral)`. The count given with it is wrong. At `47437c65f` there are 22 active `opr LSHIFT`/`opr RSHIFT` declaration lines in the interpreter's libraries:

- 8 in `FortressLibrary.fsi`
- 10 in `FortressLibrary.fss`
- 4 in `FortressBuiltin`

16 of them take `b:AnyIntegral`, not 18, and 6 take `b:ZZ64`, not 4 (`git grep -n 'opr \(LSHIFT\|RSHIFT\)' 47437c65f -- Library ProjectFortress/LibraryBuiltin`). The worker's own `probes/integral-contract.txt:2-7` flags six lines. "Four" is right only if a declaration is counted once across its component and api, as the brief counts. This is correction 2.

## 4. The test

`ProjectFortress/tests/IntSemanticsRungI.fss` still has one comment line (`:4`, pointing at a REPORT.md), and the new lines carry none. The assertion at `:89` checks value and type through `zz32Shown` (`:14-18`). That matters because `assert` compares with `=/=` (`Library/FortressLibrary.fss:296-300`), under which a `ZZ64` zero equals a `ZZ32` zero. It fails on the base library with the `ZZ64` answer and passes on the branch.

I ran it myself with every cache subdirectory emptied first: `PASS` (`probes/skeptic/IntSemanticsRungI.skeptic-run.txt:2`). The `ZZ32 -3 RSHIFT` a `ZZ` count of 40 assertion at `:88` now goes through `ZZ32`'s method and still gives `-1`.

## 5. Competing declarations

`zz32Shown` occurs only at `IntSemanticsRungI.fss:14` and `:89`. It appears nowhere else in `ProjectFortress/` or `Library/`, and not at all in `ProjectFortress/src/com/sun/fortress/`. No Java or Scala source names `LSHIFT` or `RSHIFT`. The only other shift declaration with a `ZZ64` count is the ungated `ProjectFortress/not_working_static_tests/BuiltinTest.fss:60-62`, which the worker also found.

I checked every library call site of `LSHIFT`/`RSHIFT` (`Library/ChunkedSparseArray.fss:64`, `:75`, `Library/QuickCheck.fss:287-322`, `Library/Random.fss:208-336`). None has a `ZZ32` receiver with a count other than a `ZZ32` or `ZZ64`:

- `MersenneTwister`'s `(1 asif N) LSHIFT wordsize` has a `ZZ64` receiver, because `asif` wraps the value in an `FAsIf` of the named type (`interpreter/evaluator/Evaluator.java:108-114`).
- A `nat` parameter used as a value is an `FInt` (`interpreter/evaluator/BaseEnv.java:624-627`).

The worker's 11-file subset (`probes/shift-subset.txt`) covers every file in `ProjectFortress/tests/` that shifts or imports `Random`, `QuickCheck` or `ChunkedSparseArray` (the complement is empty). `ProjectFortress/library_tests/IntegralOpsRungN.fss` shifts, but the library track runs compiled, and the compiled path does not read this library.

## 6. The record

- FACTS replacement: true as written, apart from the count wording below. The `ZZ32` answers for `ZZ`, `NN32` and `NN64` counts are confirmed by the worker's `ShiftCountK-after.txt:5-14` and by my `SkShiftSumK.walk-after.txt:3` (`NN64`) and `SkShiftReturnK.walk-after.txt:2` (`NN32`). The checker claim is confirmed: `cmp probes/checker-count-before-full.txt probes/checker-count-after-full.txt` reports them identical. The `StaticChecker.java` citations (`:219`, `:269-272`, `:274-275`) say what they are cited for.
- Row 380 note: it cites the existing row without renumbering. Every capture it cites exists, is tracked, and says what is claimed. Two sentences need correcting: "exactly these four declarations" (the capture shows six lines, correction 2) and the "most specific" step (correction 3).
- Row 381 note: the captures are right (`SkCountType.walk-after-K.txt:2`, `SkCountType.compiled-after-K.txt:3-4`). So are `Shell.java:402-403` and `WellKnownNames.java:113-125`. But "the specification's dispatch rule chooses `ZZ64`'s method" names the wrong mechanism. In the compiler prelude `ZZ32` excludes `ZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:663`), so no declaration applies without coercion. `ZZ64`'s method applies only by coercing the receiver, through `coerce(x: ZZ32) = jIntToLong(x)` (`:580`), under `Specification/basic/conversions-coercions.tex:412-415` and `:454-461`. This is correction 4.
- The handover line is accurate.

## 7. The three homes

- Row 380, the `ZZ32` receiver with a `ZZ`, `NN32` or `NN64` count. Home 1, and the assertion is in place and passing: `IntSemanticsRungI.fss:89`, red at `test-before.txt:2`, green in my run.
- `ZZ64`'s api pair. Home 1 without an assertion, and I accept the worker's reason. `walk` dispatches on the component, the compiled path reads another prelude, and the checker-count stage stops at the api's hierarchy errors before the overloading checker. No gated test can observe it today.
- Row 381, the compiled half. It stays in its existing row by the 2026-09-24 decision (closes at the switch-over). The fresh captures are committed. The `grep` showing the specification names no `LSHIFT` is in the report fields.
- My own finding: the compiled path refuses a `ZZ32` receiver with a `ZZ`, `NN32` or `NN64` count at compile time. Home 3 by the same decision (the compiled side of this declaration closes at the switch-over). The captures are committed under `probes/skeptic/`, and the row text is in `recommendedRows` as an append to row 381.

## 8. The count table

- Table: `explorations/compile-ladder/rung-shift-count/probes/checker-count-after.txt:14` reads `#total 103`, and the before table is identical.
- Report: `record.md` declares 103, and so does the structured report.
- Manifest prediction (`expectedCheckerCount`): 103.

They match. The crash row is `OverloadingChecker CRASHED on NativeArray ...`, the same as the last landed table (`explorations/compile-ladder/climb-batch-3.5/gate/checker-count.txt:16`).

## Differentials (one thread; the rung writes no state)

All at `a857544ca`, `FORTRESS_THREADS=1`. The compiled runs used a bytecode cache I rebuilt from empty in library order (`probes/skeptic/cache-rebuild.txt`). The walk "before" runs used `probes/skeptic/sk-before-after.sh`, which points `FORTRESS_HOME` and `FORTRESS_AUTOHOME` at a scratch home. In it every file is a symlink into this worktree, except `Library/FortressLibrary.fss`/`.fsi`, which are the `47437c65f` copies. The worktree's tracked files were never modified. The scratch home reproduces the worker's before-capture (`ShiftCountK-before.txt:3-9`).

| Probe | walk | compiled | Reading |
|---|---|---|---|
| `SkShiftWidthK.fss`: `ZZ32` receivers, `ZZ64` counts 31, 32, 64, -1, 2^32+1, and a sum after a shift | `1 LSHIFT 31L` = `-2147483648`, `1 LSHIFT 32L` = `0`, `(1 LSHIFT 31L)+1` = `-2147483647` (`SkShiftWidthK.walk.txt:2`, `:4`, `:11`) | `2147483648`, `4294967296`, `2147483649` (`SkShiftWidthK.compiled.txt:3`, `:5`, `:12`); the other eight lines agree | Row 381, which K does not change on either side. The difference is between the two preludes, and the decision closes it at the switch-over. |
| `SkShiftCountZZK.fss`, `SkShiftCountNN32K.fss`, `SkShiftCountNN64K.fss`: `k: T = 33; three LSHIFT k` | `ZZ`: `0` (the literal stays an `FInt`, so this is a `ZZ32` count); `NN32`, `NN64`: `RHS expression type Int is not assignable to LHS type NN32` (`SkShiftCountNN32K.walk.txt:3`), the typed-binding coercion rung C is for | static error: `Could not check call to operator LSHIFT`, neither `(ZZ32, ZZ32)->ZZ32` nor `(ZZ64, ZZ64)->ZZ64` applicable (`SkShiftCountZZK.compiled.txt:3-10`, and the same for `NN32`/`NN64`) | New measurement. On the compiled path the construct K widens is refused at compile time. The specification's prose names no `LSHIFT`, and the compiler prelude has no `Integral`. The decision's switch-over covers it, so this is the fourth outcome: settled, and outside this rung. Recommended as an append to row 381. |
| `SkShiftBindK.fss`: `r: ZZ32 = three LSHIFT k`, `k: ZZ` | before: `RHS expression type Long is not assignable to LHS type ZZ32` (`SkShiftBindK.walk-before.txt:3`); after: `24` (`SkShiftBindK.walk-after.txt:2`) | not run (`big` is interpreter-only; the compiled refusal is the row above) | Loud to quiet; see the next section. |
| `SkShiftReturnK.fss`: `shl(x: ZZ32, k: NN32): ZZ32 = x LSHIFT k` | `24` before and after (`SkShiftReturnK.walk-before.txt:2`, `-after.txt:2`) | not run | Before the edit a `ZZ64` came out of a function declared `ZZ32`, silently: `walk` does not check a declared return type, which is row 153's kind. |
| `SkShiftSumK.fss`: `h = 1 LSHIFT` a `ZZ` 30, then `h + h`; `1 LSHIFT` an `NN64` 31; `-1 RSHIFT` an `NN32` 2^32-1 | before `2147483648`, `2147483648`, `-1`; after `-2147483648`, `-2147483648`, `-1` (`SkShiftSumK.walk-before.txt:2-4`, `-after.txt:2-4`) | not run | The shift answers now follow the `ZZ32` width rule, as with a `ZZ32` count (`SkShiftWidthK.walk.txt:3`). `h + h` now wraps silently at width 32, the row 379 defect rung O repairs. With O merged it becomes `IntegerOverflow`. This interaction is worth one look at the gather. |
| `SkShiftHugeLiteralK.fss`: counts of magnitude 2^64, literal and computed | `ZZ32 3 RSHIFT` a count of -2^64 = `ZZ64 0` before and `ZZ32 0` after; a negative literal below the `ZZ64` range is a `ZZ` at run time, so the `FIntLiteral` path of `Int.shiftCount` is not reached (`SkShiftHugeLiteralK.walk-before.txt:3-7`, `-after.txt:3-7`) | not run | The saturation rule holds at the extreme counts after the edit. |

## Loud to quiet

Yes, once. Before the edit, `r: ZZ32 = three LSHIFT k` with a `ZZ` count stopped the run with a run-time type error, because the value was a `Long`. After the edit it binds `24 : ZZ32` (`SkShiftBindK.walk-before.txt:3` against `-after.txt:2`).

The quiet value is the one the specification gives. With the library's declarations, the static type of `three LSHIFT k` is `ZZ32`, by `ZZ32`'s own `(self, b:AnyIntegral):ZZ32` being the most specific applicable declaration. The value 3·2^3 = 24 is within the width. Nothing that was an error for a good reason became silent.

## Thread counts

Every differential ran at `FORTRESS_THREADS=1`. The diff changes two declared parameter types and adds a pure helper and an assertion. There is no mutable variable, field, `atomic` block or library write, so the brief's one-thread allowance applies.

## Machine

nproc 4, Intel(R) Xeon(R) Processor @ 2.80GHz, cpu MHz 2800.212, JDK 25.0.4, `FORTRESS_THREADS=1`. Each capture's first line records its load average at the start.

- The gated test took 23.6 s at load 0.46 (`probes/skeptic/IntSemanticsRungI.skeptic-run.txt`).
- The bytecode cache rebuild took 17 + 72 + 31 + 2 + 3 s at load 0.78 (`probes/skeptic/cache-rebuild.txt`).

## Required corrections (the commit stage closes these)

1. `REPORT.md` does not exist. The commit stage composes `explorations/compile-ladder/rung-shift-count/REPORT.md` from the worker's structured report and opens it with the five-line provenance block as given in `specCitations` (checked in section 0 above), with corrections 2 to 4 applied. A subagent repair round cannot do this, because it would meet the same refusal of the Write tool.
2. The precedent count: "22 active shift-operator declarations ... and 18 of them take b:AnyIntegral ... The four exceptions" becomes "22 active declaration lines, 16 with `b:AnyIntegral` and 6 with `b:ZZ64`: `ZZ32`'s pair in the component and the api, and `ZZ64`'s pair in the api". Likewise, in `record.md`'s row 380 note, "exactly these four declarations" becomes "exactly these six declaration lines (`ZZ32`'s pair in both files, `ZZ64`'s api pair)". That is what `probes/integral-contract.txt:2-7` shows.
3. The row 380 note in `record.md`: replace "and that abstract declaration, with result type `ZZ32`, is the most specific one applicable to a `ZZ32` receiver and any integral count (`Specification/basic/overloading.tex:274-285`)" with this sentence. "Neither inherited declaration was more specific than the other, their self types `ZZ64` and `Integral[\ZZ32\]` being unrelated (`Specification/basic/overloading.tex:280-285`), so `ZZ32` owed a declaration for their meet under the Meet Rule for Functional Methods (`Specification/advanced/overloading.tex:396-411`); the widened `(self, b:AnyIntegral):ZZ32` is that declaration, more specific than both for a `ZZ32` receiver, and a valid overloading with `ZZ64`'s under the Subtype Rule (`Specification/advanced/overloading.tex:162-166`)."
4. The row 381 note in `record.md`: "the specification's dispatch rule chooses `ZZ64`'s method (`:647`)" becomes "no declaration applies without coercion, `ZZ32` excluding `ZZ64` in the compiler prelude (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:663`), and coercion resolution (`Specification/basic/conversions-coercions.tex:454-461`) chooses `ZZ64`'s method (`:647`) by coercing the receiver through `coerce(x: ZZ32)` (`:580`)".

## Recommended ledger rows

- Append to row 381: "Measured by rung K's skeptic, climb batch 4: the compiled path refuses a `ZZ32` receiver shifted by a `ZZ`, `NN32` or `NN64` count at compile time: `Could not check call to operator LSHIFT`, with `(ZZ32, ZZ32)->ZZ32` and `(ZZ64, ZZ64)->ZZ64` not applicable to `(ZZ32, ZZ)`, `(ZZ32, NN32)`, `(ZZ32, NN64)`, and the same for `RSHIFT`. The compiler prelude declares `LSHIFT`/`RSHIFT` only with a count of the receiver's own width (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:647-648`, `:736-737`), and none of these count types coerces to `ZZ32` or `ZZ64` there (`:579-580`, `:664`). `walk` answers the same programs with a `ZZ32` since rung K. It closes with the rest of this row at the switch-over." The probes are `explorations/compile-ladder/rung-shift-count/probes/skeptic/SkShiftCountZZK.fss`, `SkShiftCountNN32K.fss` and `SkShiftCountNN64K.fss`, with captures `SkShiftCountZZK.compiled.txt:3-10`, `SkShiftCountNN32K.compiled.txt:3-10` and `SkShiftCountNN64K.compiled.txt:3-10`, and `SkShiftWidthK.compiled.txt` for the `ZZ64` counts.

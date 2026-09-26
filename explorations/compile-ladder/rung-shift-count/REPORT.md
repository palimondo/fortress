# Rung K: the shift count takes any integral type

problem: under `walk` a `ZZ32` receiver shifted by a `ZZ`, `NN32` or `NN64` count is answered by `ZZ64`'s method at width 64 as a `ZZ64`: `explorations/compile-ladder/rung-int-semantics-walk/probes/skeptic/SkWalkOnly.walk.txt:2` ("ZZ32 3 LSHIFT a ZZ count of 33 = 25769803776 : ZZ64"), and this rung's red at `explorations/compile-ladder/rung-shift-count/test-before.txt:2`
spec: the declaration, not the operator. An object must define every abstract method it inherits (`Specification/basic/objects.tex:149-154`, `Specification/basic/traits.tex:509-512`); a trait's own declaration of equal parameter type stops the inherited ones (`Specification/basic/traits.tex:461-467`); an api method is satisfied only by component methods whose parameter types union to its own (`Specification/basic/components/source-code.tex:399-404`). `LSHIFT`/`RSHIFT` are named nowhere in `Specification/` (`grep -rn 'LSHIFT\|RSHIFT' Specification/` finds nothing), and their width rule is Pavol's decision at `explorations/coordinator/CLIMB-BATCH-3.5.md:17`
precedent: `Library/FortressLibrary.fss:756-759` (`ZZ64`'s component pair, `b:AnyIntegral`)
deviation: none in the four declarations. The new assertion compares a string of value and type through the typecase helper at `ProjectFortress/tests/IntSemanticsRungI.fss:14-18`, `:89`, where the file's other assertions compare values only; the helper's shape is from `explorations/compile-ladder/rung-int-semantics-walk/probes/skeptic/SkWalkOnly.fss:4-12`
historical: `Library/FortressLibrary.fss:688-691`, `Library/FortressLibrary.fsi:491-492`, `Library/FortressLibrary.fsi:530-531`

## 0. How this report was written

The worker's harness refused a file named `REPORT.md` from a subagent ("Subagents should return findings as text, not write report files"), and the skeptic confirmed that the refusal depends on the file's name (`explorations/compile-ladder/rung-shift-count/SKEPTIC.md` section 0). This report was composed at the gather of climb batch 4 from the worker's structured result (run `wf_f54d0e4b-63d`, `rung:K`), as batch 3.5 did for its rung B (`explorations/compile-ladder/climb-batch-3.5/RECORD.md:13`). The provenance block above is the worker's, as the skeptic checked it. The skeptic's corrections 2 to 4 are applied here and in `record.md`; section 11 lists what the gather changed.

## 1. What changed

Four declarations of the interpreter's library, six lines:
- `Library/FortressLibrary.fss:688-691`: `ZZ32`'s `opr LSHIFT` and `opr RSHIFT`, `b:ZZ64` to `b:AnyIntegral`, still bound to `Int$LShift`/`Int$RShift`.
- `Library/FortressLibrary.fsi:491-492`: the same pair in the api.
- `Library/FortressLibrary.fsi:530-531`: `ZZ64`'s api pair, `b:ZZ64` to `b:AnyIntegral`, now matching its component at `Library/FortressLibrary.fss:756-759`.

No Java changed: the natives already read any count through `Int.shiftCount` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Int.java:261-272`). The test: `ProjectFortress/tests/IntSemanticsRungI.fss:14-18`, a new helper `zz32Shown`, a typecase giving the value and " : ZZ32" or " : not a ZZ32", and `:89`, the one new assertion, `assert(zz32Shown(three LSHIFT big(widen(33))), "0 : ZZ32", "row 380: ZZ32 3 LSHIFT a ZZ count of 33")`. No test file is added, so the `testSystem` count does not move.

## 2. Where the fix belongs

In the library's declarations, the decision's place (`explorations/coordinator/POSITIONS.md:89`). Under `walk` a `ZZ32` receiver with a count that is not a `ZZ64` misses `ZZ32`'s own pair and reaches `ZZ64`'s component pair, which takes any integral count (`Library/FortressLibrary.fss:756-759`); the natives compute the right answer at either width once they are reached. The compiled path does not read `Library/FortressLibrary` (`ProjectFortress/src/com/sun/fortress/Shell.java:402-403`, `ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:113-125`), so the compiled prelude is not this rung's, and row 381's compiled half closes at the switch-over as decided.

## 3. Precedent search

The question: has the team declared a shift count in the interpreter's library already, and in how many ways? At `47437c65f` there are 22 active declaration lines of `opr LSHIFT`/`opr RSHIFT` in the interpreter's libraries, counting the api and the component separately: 8 in `FortressLibrary.fsi`, 10 in `FortressLibrary.fss` and 4 in `FortressBuiltin` (`git grep -n 'opr \(LSHIFT\|RSHIFT\)' 47437c65f -- Library ProjectFortress/LibraryBuiltin`). 16 take `b:AnyIntegral` and 6 take `b:ZZ64`: `ZZ32`'s pair in the component and the api, and `ZZ64`'s pair in the api.
- `Integral[\I\]`: `Library/FortressLibrary.fss:637-638` and `.fsi:431-432`.
- `NN64`: `.fss:810-813` and `.fsi:457-458`.
- `ZZ`: `.fss:881-884`; the api has none and inherits `Integral[\ZZ\]`'s.
- `NN32`: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:434-437` and `FortressBuiltin.fsi:101-102`.
- `ZZ64`'s component: `.fss:756-759`.
- The team's commented-out `IntLiteral` draft also takes `AnyIntegral` (`FortressBuiltin.fsi:138-139`, `.fss:517-520`), and so does rung I's `shift` (`.fss:885-886`).

The six `b:ZZ64` lines, four declarations when a declaration is counted once across its component and api as the batch record counts them, are exactly the ones this rung changes. The precedent followed is `ZZ64`'s component pair, `.fss:756-759`, copied token for token as `(self,b:AnyIntegral)`.

The same-defect count: `explorations/compile-ladder/rung-shift-count/probes/integral-contract.py` checks all 18 binary operators of `Integral` against `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32`, in both components and both apis (`FortressLibrary` and `FortressBuiltin`). It flags exactly these six lines before the edit and none after (`explorations/compile-ladder/rung-shift-count/probes/integral-contract.txt:2-7`). The `ZZ64` api pair is also the only parameter-type mismatch between the api and component signatures of the four library integer traits. Also found and left alone: an ungated copy of the old pair, a test's own `SweetZZ32` declaration at `ProjectFortress/not_working_static_tests/BuiltinTest.fss:60-62`. The name grep: `zz32Shown` occurs only at the two new sites in `IntSemanticsRungI.fss`, in both corpora and in `ProjectFortress/src/com/sun/fortress/`.

## 4. The specification

The prose names no `LSHIFT` or `RSHIFT`, so it is silent on what a shift computes; the width rule is Pavol's (`CLIMB-BATCH-3.5.md:17`). Read with the library's own `Integral[\ZZ32\]`, it settles the declaration:
- A functional method is a top-level function whose `self` has the enclosing trait's type (`Specification/basic/traits.tex:484-495`), so `Integral[\ZZ32\]` declares an abstract `LSHIFT(self: Integral[\ZZ32\], b: AnyIntegral): ZZ32`.
- With its own `b:ZZ64`, `ZZ32` stopped neither `ZZ64`'s concrete `LSHIFT(self: ZZ64, b: AnyIntegral): ZZ64` nor that abstract one from being inherited (`traits.tex:461-467`).
- Neither inherited declaration was more specific than the other, their self types `ZZ64` and `Integral[\ZZ32\]` being unrelated (`Specification/basic/overloading.tex:280-285`; `Integral` extends only `StandardTotalOrder[\I\]` and `AnyIntegral`, `Library/FortressLibrary.fsi:412`, and `ZZ64` extends `Integral[\ZZ64\]`, `:499`), so `ZZ32` owed a declaration for their meet under the Meet Rule for Functional Methods (`Specification/advanced/overloading.tex:396-411`). The widened `(self, b:AnyIntegral):ZZ32` is that declaration, more specific than both for a `ZZ32` receiver, and a valid overloading with `ZZ64`'s under the Subtype Rule (`Specification/advanced/overloading.tex:162-166`). So the answer for a `ZZ32` receiver and any integral count is a `ZZ32`; the value, `0` for a count of 33, comes from the width rule.
- `value object Int` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:76`) inherited the abstract method without defining it, which `Specification/basic/objects.tex:149-154` forbids and `walk` never checks.
- The api's `b:ZZ64` for `ZZ64` was not satisfied by the component's single `b:AnyIntegral` (`Specification/basic/components/source-code.tex:399-404`). The draft note at `:361-367` would allow a wider parameter, but it is a note, not the rule.
- The specification's `shift(self, k: IndexInt): ZZ` (`Specification/basic-lib/basic-integers.tex:695-702`) is a different function from `LSHIFT` and not this rung's.

## 5. Decisions

- **One assertion, not one per count type or operator.** Pavol's decision names one gated assertion for a `ZZ` count (`POSITIONS.md:89`), and every case fails for the same declaration. Rejected: an assertion per count type (`ZZ`, `NN32`, `NN64`) and per operator. The other cases are measured before and after by `probes/ShiftCountK.fss`.
- **The assertion goes in `ProjectFortress/tests/IntSemanticsRungI.fss`, not a new file.** That file gates the interpreter's shifts, its `:88` is the neighbouring case, and no other rung of this batch edits it. Rejected: a new `tests/` file, which would add one to `testSystem` and need its own comment line. The file keeps its single comment line and the new lines carry none; the message carries "row 380".
- **The assertion checks the type as well as the value, through a typecase helper.** `assert(x, y, ...)` compares with `=/=` (`Library/FortressLibrary.fss:296-300`), under which a `ZZ64` zero equals a `ZZ32` zero. Rejected: a typed binding (`r: ZZ32 = ...`), which would fail before the edit as a run-time type error rather than an assertion, and typed bindings are what rung C changes.
- **The `ZZ64` api lines were changed to match the component, not the component to match the api.** The component is what `walk` runs and what `Integral` promises (the decision's text).
- **The ladder subset driver was not run.** The compiled path does not read `Library/FortressLibrary` and the rung adds no name; no first error in `baseline-2026-09-19/ladder.tsv` names `LSHIFT` or `RSHIFT`, and the five raw captures that name `AnyIntegral` name it because the compiler prelude lacks it, which this rung does not change.
- **Row 381's compiled measurement was taken from a bytecode cache rebuilt in library order**, not by reading alone, so that row 381's note cites a capture from this branch.
- **Row 380's classification is refined in its closing note, not by a new row.** The prose is silent on what `LSHIFT` computes but settles the declaration's result type (section 4).

## 6. The recorded failure and the recorded pass

- Failure: `explorations/compile-ladder/rung-shift-count/test-before.txt:2` (commit `3eb25c7b2`, before the library edit, caches emptied): "FAIL: J24/0:25769803776 : not a ZZ32 =/= J8/0:0 : ZZ32; row 380: ZZ32 3 LSHIFT a ZZ count of 33", exit 1; every earlier assertion of the file passed. The skeptic confirmed that `3eb25c7b2`'s tree still has `opr LSHIFT(self,b:ZZ64):ZZ32` at `Library/FortressLibrary.fss:688`.
- Pass: `explorations/compile-ladder/rung-shift-count/test-after.txt:2` (commit `03c341403`, caches emptied first), "PASS", exit 0; at `bin/fortress`'s default heap, `explorations/compile-ladder/rung-shift-count/test-after-default-heap.txt:2`; and under the `testSystem` harness over 11 shift-related tests, `explorations/compile-ladder/rung-shift-count/probes/harness-after.txt:19`, "OK (11 tests)".

## 7. The checker count

Declared 103, measured before and after: the tables are identical and the full checker output is byte-identical (`explorations/compile-ladder/rung-shift-count/probes/checker-count-before.txt`, `explorations/compile-ladder/rung-shift-count/probes/checker-count-after.txt`, and their `-full.txt` twins), because the `FortressLibrary` api stops at its hierarchy errors (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:219`, `:269-272`) before the overloading checker (`:274-275`).

## 8. What stayed green

The `testSystem` harness passes the 11 files the batch record names or that shift or import `Random`, `QuickCheck` or `ChunkedSparseArray` (`probes/shift-subset.txt`; `probes/harness-after.txt:19`). A `walk` differential of the same 11 files against the base declarations differs only in the new assertion and in `QuickCheckTest`'s system-seeded random data, and two runs of the same tree differ the same way (`explorations/compile-ladder/rung-shift-count/probes/walk-diff.txt`; `explorations/compile-ladder/rung-shift-count/probes/QuickCheckTest-after-run1.txt` against `explorations/compile-ladder/rung-shift-count/probes/QuickCheckTest-after-run2.txt`).

## 9. The differentials, and row 381

`probes/ShiftCountK.fss` runs every count type (`ZZ`, `NN32`, `NN64`), both operators and a literal receiver: each moves from a `ZZ64` answer to the `ZZ32` one (`explorations/compile-ladder/rung-shift-count/probes/ShiftCountK-before.txt:5-14`, `:16` against `explorations/compile-ladder/rung-shift-count/probes/ShiftCountK-after.txt:5-14`, `:16`); `ZZ64` receivers and a `ZZ64` count are unchanged (`:19-21`).

Row 381, a `ZZ32` receiver with a `ZZ64` count of 33: `walk` gives `0` (`ZZ32`'s method, now the widened pair) and the compiled run `25769803776`, measured from a rebuilt bytecode cache (`explorations/compile-ladder/rung-shift-count/probes/SkCountType.walk-after-K.txt:2`, `explorations/compile-ladder/rung-shift-count/probes/SkCountType.compiled-after-K.txt:3-4`). On the compiler prelude's own declarations `ZZ32`'s pair takes only a `ZZ32` count (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:736-737`) and there is no `Integral` trait: no declaration applies without coercion, `ZZ32` excluding `ZZ64` in the compiler prelude (`CompilerBuiltin.fss:663`), and coercion resolution (`Specification/basic/conversions-coercions.tex:454-461`) chooses `ZZ64`'s method (`:647`) by coercing the receiver through `coerce(x: ZZ32)` (`:580`). Each path answers by its own prelude, and the library's `Integral` contract, which only the interpreter's library has, favours `walk`'s `0 : ZZ32`. It closes at the switch-over (`POSITIONS.md:89`), with no compiler prelude edit.

## 10. Defect homes

- Row 380, a `ZZ32` receiver with a `ZZ`, `NN32` or `NN64` count answered by `ZZ64`'s method as a `ZZ64`: home 1, repaired, gated by `ProjectFortress/tests/IntSemanticsRungI.fss:89`, red before and passing after (section 6). The `NN32` and `NN64` counts, `RSHIFT` and a literal receiver are the same declaration's defect, measured both ways by `probes/ShiftCountK.fss` and not asserted separately, per the decision's "one gated assertion".
- `ZZ64`'s api pair declaring `b:ZZ64` where its component declares `b:AnyIntegral`: home 1, repaired, with no assertion possible today. `walk` dispatches on the component (the `ZZ64` rows are unchanged, `ShiftCountK-before.txt:19-21` against `ShiftCountK-after.txt:19-21`), and the checker-count stage stops before the overloading checker on this api. Its check is `probes/integral-contract.py` and its capture (six flagged lines before, none after).
- Row 381's compiled half: home 3, already a ledger row, where it stays until the switch-over (section 9).

## 11. What was not done, the machine, and the gather's changes

- `ant testFast` and `ant testSystem` were not run, as the brief says; only the 11-file harness subset. `ant compileAll` was not run: no `.java` or `.scala` changed, and the copied build was current, since every pre-existing assertion of `IntSemanticsRungI` passed before the edit.
- Machine for every timing: nproc 4, Intel(R) Xeon(R) Processor @ 2.80GHz, cpu MHz 2800.212, JDK 25.0.4, `FORTRESS_THREADS=1`, with other rungs running at the same time. Load at the start of each run: the failing test 2.36 (33.7 s), the passing test 6.66 (29.3 s), the checker count 5.84 before and 6.86 after, the harness 6.70 (138.6 s), the `walk` differential 6.30, `QuickCheckTest` twice 6.79, the bytecode-cache rebuild 5.84 (AnyType 20 s, CompilerBuiltin 80 s, CompilerLibrary 35 s, CompilerAlgebra 3 s, CompilerSystem 3 s), the default-heap test 6.55.
- Nothing comes back to Pavol beyond the landing. Checker count declared: 103.
- Changed at the gather, the skeptic's corrections: section 3's count reads 22 declaration lines, 16 with `b:AnyIntegral` and 6 with `b:ZZ64` (the worker wrote 18 and four); section 4's derivation says that neither inherited declaration was more specific and that the widened declaration is the meet the Meet Rule requires (the worker cited `Specification/basic/overloading.tex:274-285` for "the most specific applicable declaration ... is `ZZ32`'s"); section 9 names coercion resolution, not the dispatch rule, as what chooses `ZZ64`'s method on the compiled path. `record.md` carries the same three corrections, and its `<landing>` placeholders are written `<short hash>`.

# Chunk p1, run p-run1, base de6d905f5

Marks: scope, present meaning, evidence, comprehension, ownership, consistency. Beyond the evidence files I read: P-161, P-38, P-69, P-153, P-73 (POSITIONS); row 380 and row 442; `CompilerBuiltin.fsi` (the traits `ZZ`, `ZZ64`, their `widen`/`narrow`); `FortressLibrary.fsi:640-700`; `FortressLibrary.fss:796-799` and `Int.java:182-187` (walk's `ZZ32` shift); `simpleIntArith.java:370-421`; `simpleUnsignedIntArith.java:229-235`; `simpleUnsignedLongArith.java:240-243` and its diff since 052a7c3fe; the `^` bindings of `FortressLibrary.fss` (walk uses glue classes, not the prelude's helpers); `compiler_tests/XXXZZNarrowRungP.{fss,test}`, `XXXShiftDeclRungI.{fss,test}`; `tests/SignedAboveSignedRangeWalk.fss`; `FortressBuiltin.fsi:179-200`; `climb-batch-20/RECORD.md:128-132` (refused notes); `rung-numeral-library/SKEPTIC.md:100`; `integer-conversions-evidence.md` headings and 1.1; `git cat-file` of each probe path in `ab067d9b6^` (all present). I ran no build, test or program.

## 349: rewrite
- scope: pass. present meaning: FAIL: "the compiler prelude's `trait ZZ` declares neither `widen` nor `narrow`, so `widen` of a `ZZ64` ... refused" names the wrong trait for the `widen` half: the prelude's `trait ZZ64` (`CompilerBuiltin.fsi:147-208`) has `narrow` but no `widen`, and walk's `ZZ64` has its own `widen` (`FortressLibrary.fsi:646`). evidence: pass (XXX test, gated). comprehension: FAIL: citations `:634`, `:670-671` point at `CHOOSE` and `MINNUM`. ownership: FAIL: P-161 (2026-11-06) closes the `narrow` half by deleting `ZZ`'s `narrow` and moving `XXXZZNarrowRungP` onto `.asZZ32`; the row did not say so. consistency: FAIL with P-161, as above.
- change: claim names both traits; lines re-pinned at de6d905f5; P-161's route for the `narrow` half, the switch-over (with row 442) for `widen`; siblings 502, 859 (859 already names 349).
- dropped: the old probe path `SK3Tower.fss` (home: history, row 349; the row has a test reproducer); "The specification is silent on `widen` (row 502)" (home: row 502's spec cell `silent`); "fixed-size traits exclude each other" (home: history).
- pairs.txt: 349 with 442, the `narrow`-on-`ZZ` half and the shared test.

## 381: rewrite
- scope, evidence (no tree reproducer; probe paths in `ab067d9b6^`, present), ownership (P-38, P-69), consistency (P-38, P-69 line 77): pass. present meaning: pass by reading: walk's `ZZ32` `LSHIFT(self,b:AnyIntegral)` (`FortressLibrary.fss:796`) via `Int$LShift` returns 0 for a count of 33 (`Int.java:185`); the compiled lines hold. comprehension: FAIL: "siblings: 380" names a FIXED row (its walk half, fixed); "At 052a7c3fe" pin; the walk side's mechanism missing.
- change: dropped the closed sibling, re-pinned, added the walk mechanism, POSITIONS by number (P-69, P-38).
- dropped: "siblings: 380" (home: row 380 itself, which says "the compiled side is row 381"); the probes' folder `rung-int-semantics-walk/` for `SkCountType` (the copy the evidence found is `rung-shift-count/probes/SkCountType.fss`, which the line now names; both are in history).

## 383: rewrite
- scope, present meaning (no `shift` in `CompilerBuiltin.fs?`; walk's at `FortressLibrary.fsi:700`), evidence (XXX test), ownership, consistency (P-38, P-69): pass. comprehension: FAIL: `Library/FortressLibrary.fsi:672` now reads `opr -(self): ZZ` (+28 lines).
- change: re-pinned to `:700`; P-38's promotion of `XXXShiftDeclRungI` and `shift` as a reserved name added (from P-38, which names this row); POSITIONS title replaced by P-69.
- dropped: nothing of substance; the POSITIONS title text (home: P-69).

## 441: rewrite
- scope, present meaning (compiled `^` at `CompilerBuiltin.fss:744` unchanged; `intExp` at `simpleIntArith.java:415-421`), evidence (XXX test), consistency (FACTS:218, P-153): pass. comprehension: FAIL: `simpleIntArith.java:400-406` now inside `intToIntPower`, `:380-398` is `intShift` (+15 lines). ownership: FAIL: the refused batch-20 note (P-153's contract E) not in the row, and no route to the fix.
- change: re-pinned `:415-421`, `:395-413`; "Walk follows P-153".
- dropped: none; the refused note's "until phase 4's natives" is a batch story (home: `climb-batch-20/RECORD.md:131`).

## 502: rewrite
- scope, present meaning (`BigNum$ToZZ64` still `x.longValue()`, `BigNum.java:292-296`), evidence (`none` with the probe's old path, present in `ab067d9b6^`): pass. ownership: FAIL: "Whether it truncates ... or throws ... is the curator's (`explorations/coordinator/PLAN.md`, item 31)": P-161 settled it: `ZZ`'s `widen` is deleted and callers move onto `.asZZ64`, which raises; P-161 says this closes row 502. consistency: FAIL with P-161.
- change: notes state P-161's route and that it closes the row; siblings 349, 858; the values' note named.
- dropped: the PLAN item 31 sentence and the `opr-overview.tex` sentence (home: P-161, whose "Why" cites the general sentence; history, row 502); "the compiled prelude has no `big`" (home: row 442 and history). Status kept beside `silent` (silent.txt: defect).

## 523: rewrite
- scope, present meaning (`intExp` unchanged), evidence (XXX test), comprehension of mechanism: pass but for FAIL: lines `:400-406`, `:380-398` stale. consistency: FAIL: "Fix: bind a checked power in the compiler prelude" contradicts P-38 ("The compiler prelude's own text is not repaired") and `compiler.md` ("Do not add a declaration to the three prelude files").
- change: re-pinned; "Closes at the switch-over (P-38)"; "as P-153 asks" carries the refused batch-20 note's point.
- dropped: the "Fix: bind..." sentence (contradicted by P-38; history keeps it).

## 524: rewrite
- present meaning: pass (`unsignedIntExp` still casts the `double` to `int`, now at `simpleUnsignedIntArith.java:229-235`, with an `IntegerOverflow` above 2^32-1). comprehension: FAIL: `:218-224` is now `unsignedIntShift`. consistency: FAIL: "Fix: bind a checked power for `NN32`" against P-38. Others pass.
- change: re-pinned; closes at the switch-over (P-38), keeping what the power needs.
- dropped: none.

## 525: rewrite
- present meaning: pass (`unsignedLongExp` still `return a + b;`, now `:240-243`). comprehension: FAIL: `:222-225` stale. consistency: FAIL: "Fix: an unsigned checked power" stated as a prelude fix against P-38. Others pass.
- change: re-pinned; closes at the switch-over (P-38), keeping `UnsignedLong.powExact` as the model.
- dropped: none.

## 581: rewrite
- scope, ownership, consistency (FACTS:76): pass. present meaning: pass by reading: neither `IntLiteral` (`FortressBuiltin.fsi:179`, `CompilerBuiltin.fsi:390-431`) declares `minimum`; the run itself is rung Q's and was not repeated. evidence: weak: "Probe: the second skeptic's `SkqR2f.fss`, `check.sh SkqR2f base`": `SkqR2f.fss` was never in git, and `check.sh` is another review's script. comprehension: FAIL: `FortressLibrary.fsi:534-535` now reads `end` (the getters are at `:542-543`); the one library's `IntLiteral` not located.
- change: re-pinned; the one library's `IntLiteral` cited; the record of the run cited by line (`SKEPTIC.md:100`) and the probe said never committed.
- dropped: `check.sh` (home: history, row 581; `SKEPTIC.md:186`). Not given to measure: no tool at the base checks a program over the one library short of the switch-over (questions.md).

## 856: rewrite
- scope, present meaning, evidence (the gated test asserts the wrap), comprehension: pass. ownership/consistency: FAIL: "keep the low bits or raise is row 502's question, for `widen`" is settled by P-161: `signed` keeps the low bits, with `asZZ32`/`asZZ64` as the raising forms. The row's status beside `silent` is item 265's; silent.txt says choice.
- change: P-161's ruling in place of the open question; full paths.
- dropped: "as the glue classes `NN32$ToInt` and `UnsignedLong$ToLong` did" (a story of the move onto helpers; home: history, row 856, and F-307, which states it); "The specification names only `narrow`'s wrap" (home: the spec cell and P-161, which puts the getters into `basic-integers.tex`).

## 858: keep
- All six pass. The mechanism holds at base: `NN64` (`FortressLibrary.fsi:489-534`) has no `widen`; `ZZ`'s `coerce(x: NN64)` at `FortressLibrary.fss:997-1000`; `BigNum.java:292-296` unchanged. `none` with the program and its output in `integer-conversions-evidence.md`, "1.6 The runs". P-161 names the row as to be fixed and does not contradict it.

## 859: keep
- All six pass. The cited declarations read as the row states at base (`FortressLibrary.fsi:532-533`, `:586-590`, `:645-648`, `:698-699`; `FortressBuiltin.fsi:171-173`); the outputs are in `integer-conversions-evidence.md:251-253`. P-161 names the row as to be fixed.

## mech.py
Last line: "MECH: 10 lines, 0 failing, every check passes."

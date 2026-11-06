# c34 assessment (base c124c6b65)

Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## 255: rewrite
- scope pass; present meaning FAIL: reproducer `explorations/apl/rung-6/w02_lib.fss` no longer reproduces the claim, since "Workaround, in place" makes case (b) pass; evidence FAIL: "`AplCore.fss:1674:20-34: CallerViolation`" points at a line that moved (the `requires` is now `AplCore.fss:1698`), and the evidence's run failed on the source path, not on the row (it lacked `explorations/apl/base`; `rung-6/PROBES.md` gives the path); comprehension pass; ownership pass (sibling 218); consistency pass.
- New line: reproducer `none`, the first run's failure and the workaround in notes, the source path named, pins at c124c6b65.
- Dropped: the old error position `1674:20-34` (home: history, row 255). Read beyond evidence: `explorations/apl/base/AplCore.fss:1680-1702`, `rung-6/PROBES.md`, `rung-6/REPORT.md:48-56`.
- silent.txt: choice.

## 430: keep
- All six pass. The pins are "By reading (d4d454f9d)", and at d4d454f9d `Constructor.java:348-349` is the `entrySet()` loop, `FType.java:96-101` the counter, `FunctionClosure.java:130-131` the `identityHashCode` hashCode (checked with git show); the mech's "moved" is the shift since. The refused batch-16 note (FType counter and FunctionClosure identity hash remain; verdicts unchanged) is already in the row. F-108 and FACTS.md:98 agree. silent.txt: defect.

## 806: keep
- All pass. `OverloadedFunction.java:381 at 00f2e1bdc` is pinned to its commit; at the base the same `if (l1 != l2) return;` is at :383 (c41c3d2b0 added lines above). `XXXIndexBesideTupleOverloadWalk` ran as expected failure at gate a12ab5c60. Sibling 783 is FIXED but remains the related row; FACTS.md:119 agrees.

## 102: close
- present meaning FAIL: the mechanism ("`RR64` satisfies `StandardMax[\Number\]`, never `StandardMax[\RR64\]`") is false since d846e3644, where `trait RR64 extends { Number, StandardPartialOrder[\RR64\], StandardMinMax[\RR64\], ... }` (Library/FortressLibrary.fsi:298 at the base). `ProjectFortress/tests/FlatTowerRungF.fss:182` asserts `BIG MAX z` over an `Array[\RR64,ZZ32\]`, the prefix form, is `2.25`; it was added in d846e3644 and runs green at the holding gate. Probes are gone (path-gone).
- closes.txt: 102, d846e3644, FlatTowerRungF.fss.

## 436: rewrite
- scope pass; present meaning pass (XXX green as expected failure at a12ab5c60); evidence FAIL: pins at d4d454f9d are correct but stale by 14 lines, repinned to c124c6b65 (`:3447`, `:3408`, `:3425`, checked); comprehension FAIL: no workaround; ownership pass; consistency pass (P-78, POSITIONS.md:86, FACTS.md:187; F-243's "clears 2" is about distance sites, not the bug).
- Added a workaround (a `seq` loop from the group's `zero`). Dropped: "Detail: `compile-ladder/rung-library-distribute/REPORT.md` section 5" and "its `where` a `coerces` constraint" wording shortened (home: history, row 436; the B.4 pointer stays).

## 479: keep
- All pass. `CompilerLibrary.fss:311` at 052a7c3fe still reads `opr IN(x:ZZ32, self): Boolean = false` at the base; `FilteredRange` moved 426 to 424 (two lines dropped above), pinned to its commit. Sibling 481 in this chunk, a different operator: not a duplicate.
- FACTS.md:189 says the compiled range "`IN` and `=` are always `false` (rows 479, 481)": for `=` it is identity now (row 481); a FACTS correction owed, not a row change.

## 481: rewrite
- comprehension FAIL: "its always-false top-level `=` is gone since climb batch 21b" and "(climb batch 21b's review-routed.1)" are batch story. Rewritten to state the mechanism (no range object overrides `Equality`'s identity `=`) and the owed test without batches. Citations hold at the base. Dropped: the batch names (home: history, row 481). Consistency: FACTS.md:189 as above.

## 603: rewrite
- evidence FAIL: `:3565-3577`, `:3585-3586` and `:58` were read against `ExportChecker.scala`, ambiguous, and stale; repinned to `FortressLibrary.fss:4319-4320`, `:3751-3762`, `:3771-3772` and `RangeDeclarations.fss:58` at c124c6b65 (checked: `SimpleMappedSeqIndexed extends { SequentialGenerator[\F\], Indexed[\F,I\] }`; `MappedGenerator` absent from FortressLibrary.fsi). The reproducer pins today's wrong string, so it reproduces the claim; spec silent, not an XXX. Added workaround (compare elements). Dropped "or accept the string" (home: history). Full ExportChecker path shortened to the file name. silent.txt: defect. FACTS.md:79 agrees.

## 609: rewrite
- evidence FAIL: `RangeInternals.fss:687-722`, `:715-719` at 052a7c3fe no longer hold the cited words at the base; repinned to `:873-877` (atMost, `opr IN` with `stride DIVIDES (r-n)`) and String's `narrowToRange(r0)` to `FortressLibrary.fss:4383`. Added workaround `[0:3:2]`. XXX test green as expected failure at a12ab5c60. FACTS.md:80 agrees. Overlap 674 (outside run) is a different defect (the api's advice), no pair.

## 659: rewrite
- evidence FAIL: pin b28e3e7e1 is not in the base's history; `RangeInternals.fss:590-591` and `:217` no longer hold the cited code. Repinned to `:639-640` and `:207-208` at c124c6b65. comprehension FAIL: "before batch 11 the run stopped ... at `:217`" and "Unchanged by batch 12's rung R" are story; no workaround. RangeInternals.fss is unchanged since the row's commit abe8b0342 (in base), so the run's output stands. Dropped: the pre-batch-11 Unification error (home: history, row 659). Added workaround. silent.txt: defect.

## 661: rewrite
- evidence FAIL: `.fsi:2391`, `:2163` and `.fss:4686` moved; repinned to `.fsi:2421`, `:2189`, `.fss:4944`. comprehension FAIL: "which batch 12 rung S rewrote over" is story; restated as what the line is now. Sibling 514 is in another chunk, a different library (compiler library): already siblings, no pair.

## 799: rewrite (CONTESTED stays)
- ownership FAIL: "leaves the question for the curator" names no item; it is review-queue item 188 (P-151 read as built, or move the bodies), still unanswered. Repinned `List.fsi:57-61`, `List.fss:89-90` at c124c6b65. Dropped: the `sed -n 55,60p` command at d4d454f9d (home: history).

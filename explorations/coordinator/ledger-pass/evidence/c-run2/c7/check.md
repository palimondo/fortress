# Check, chunk c7 (c-run2), base c124c6b65

mech.py: 5 lines, 0 failing. No closes, duplicates or pairs; no question to measure (questions.md says why; the three `XXX` tests still assert values the cited lines do not give).

## Row 328 (rewrite): pass
- Fidelity: `CompilerBuiltin.fss:912-917` hold the six `self.asZZ64 <op> other.asZZ64`; `FIntLiteral.java:74-77` throws when `largerVal` (the decimal string, `:28`, `:35-38`) is set, message at `:63-65`. "Walk prints `false`": `p37.walk.skeptic` at ab067d9b6^ reads `p37 a<c false`; `p37.compiled.skeptic` reads `Not in range for ZZ64: 18446744073709551615`. `p37.fss` is at c69cb2064^. F-118 (FACTS.md:175) says no test pins it.
- Nothing lost: `row 317`, `true` (the old silent wrong answer) are history; home: row 317 and the history, row 328.
- Present, reproducer (none, notes give probe and both outputs), status, cold read, form: pass.

## Row 440 (rewrite): pass
- Fidelity: `FortressLibrary.fss:596-598`, `:605`, `:607`, `:610-619`, `:658-661` read as cited; QQ extends `StandardPartialOrder[\QQ\]` (`:577`), whose `CMP` is `:224-229`; `0/0 < 0/0` false and `0/0 CMP 1` Unordered follow from `:600-604`. `ComparisonAtNaNWalk.fss` asserts 0/0 against a finite value (its `rationals()`); F-319 matches.
- Nothing lost: `NanQQ.fss` is false: `git log --all -- '*NanQQ*'` is empty and a3252d568 adds only `NanVec.java` and a report.
- Cold read: "five comparisons" is read as `=`, `<`, `<=`, `>`, `>=`, which is right; no failure.

## Row 456 (rewrite): fail
- Failure (fidelity; cold read "Could not resolve" item 3). Passage: "so these are the only `CMP` bodies walk chooses for two total comparisons". Source: `Library/FortressLibrary.fss:186` (`LessThan CMP LessThan = EqualTo`), `:198` (`GreaterThan CMP GreaterThan = EqualTo`) and `:209` (`EqualTo CMP other = INVERSE other`) at c124c6b65 are also chosen for two total comparisons, and answer correctly (`ExclusionRemainderRungH.fss:23`, `:26-28`, `:31`). The cold reader could not tell whether the equal case is wrong or what the fix is. Correction: replace that clause with "so no `StandardTotalOrder` default intervenes: for two different total comparisons walk runs these two bodies, while the equal cases (`:186`, `:198`) and `EqualTo`'s `CMP` (`:209`) answer correctly".
- Rest passes: `:187`, `:199`, `:159-160`, `CompilerBuiltin.fss:1551`, `:1571` read as cited; "five of them" are `:24`, `:25`, `:29`, `:30`, `:55`. Nothing lost: `:185`, `:197`, `Library/FortressLibrary.fss:185` are false (they now read `opr =`); `:24-30` is kept; `StandardTotalOrder` is kept in substance ("extends `Comparison` and `StandardMinMax` only"); `triage.md`, `triage.md:67` (the api's `Comparison` result) are false now, `Library/FortressLibrary.fsi:143-144`, `:154-155` declare `TotalComparison`; the old line is in the history.

## Row 457 (keep): pass
- `FortressLibrary.fss:138`, `:177-179`, `:214`, `CompilerBuiltin.fss:1494-1495` hold their words at the base; the commits since d4d454f9d that touch these files (`git log d4d454f9d..c124c6b65`) leave these lines unchanged; `XXXLexicoUnorderedRungH.fss` asserts the claim; `climb-batch-13/RECORD.md:174` says `LessThan LEXICO: Unordered` is `LessThan`; `ComparisonLazyLexico.fss` exists; the frozen specification's table (`comparison.tex:163-177`) gives the left argument.

## Row 462 (rewrite): fail
- Failure (reproducer). Passage: "Old probe `explorations/compile-ladder/rung-exclusion-remainder/probes/skeptic/SkCmpTable.fss`, in the parent of ab067d9b6". The cell is `none` and the notes name the probe but not its output. Source: `git show ab067d9b6^:explorations/compile-ladder/rung-exclusion-remainder/probes/skeptic/SkCmpTable-compiled.txt` reads `LessThan   Unordered  (as Comparison): <  T ... CMP  LessThan`, and `SkCmpTable-walk-base.txt` reads `< F ... CMP Unordered`. Correction: "Old probe `.../SkCmpTable.fss` and its outputs `SkCmpTable-compiled.txt` and `SkCmpTable-walk-base.txt`, in the parent of ab067d9b6".
- Failure (cold read, Status; "Could not resolve" item 1). The row does not say which answer is right, so a worker cannot tell what to build. Source: specification "silent" (`Specification/advanced-lib/comparison.tex:115-121`, `:207-215` define `Unordered` but no order against it); fortress-repo SKILL.md: the compiler's prelude is deleted at the switch-over. Correction: add after the prelude's citation "Which answer governs is not decided: the specification is silent, and the prelude's lines go at the switch-over".
- Rest passes: `FortressLibrary.fss:167-168`, `CompilerBuiltin.fss:1530`, `:1537`, `ExclusionRemainderRungH.fss:45`, `:51` read as cited. Nothing lost: `Library/FortressLibrary.fss:166-167` false (re-pinned to `:167-168`); `LEXICO` is row 457's, a sibling.

## Row 880 (keep): pass
- CONTESTED stays: review-queue item 344 is still open (`review-queue.md:874`), with a default only (`review-queue-learning-2026-11-05.md:159-161`); no POSITIONS entry. `DirectedRounding.java:111-127`, `:25-41`, `FortressBuiltin.fsi:65`, `FortressLibrary.fsi:323-326` hold; the later helper commits (17b9f6b58, 43f130022) are covered by "glue classes and helpers alike"; `FloatNextUpSignedZeroWalk.fss` exists.

## Row 484 (rewrite): fail
- Failure (cold read, "Could not resolve" item 2). Passage: "so `ZZ64` with a numeral answers." Two readings (a contrast case, or part of the defect); it is a remnant of the fixed half (row 517). Correction: replace with "so the call runs `ZZ64`'s declaration rather than stopping."
- Failure (fidelity, minor). Passage: "an `NN64` with a numeral answers a `ZZ` in the same way" has no pinned line. Source: `Library/FortressLibrary.fss:994`, `:997` (ZZ coerces from `ZZ32` and `NN64`) at c124c6b65. Correction: append "(`:994`, `:997`)".
- Rest passes: `:821-822` hold; `XXXNumeralWithNN32.fss` asserts `u + 1`, `u MAX 1`, `u MAXNUM 1` at `NN32`; F-74, F-138 and Q-walk (PLAN.md:77) say what is cited. Nothing lost: `2770550c3`, `9d2e4c856`, `b MAX 1`, `row 517`, `StandardMax`, `StandardMinMax`, `StandardTotalOrder`, `CMP`, `MINMAX` are the fixed half and its mechanism; home: row 517 (FIXED, 9d2e4c856), F-138 and the history, row 484.

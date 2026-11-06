# Assessment, chunk c7 (c-run2), base c124c6b65

## Row 328: rewrite
- Scope: pass. Present meaning: fail, "Exposed by row 317's repair, which turned a silent `true` into this error" is a repair story. Evidence: pass; the lines `CompilerBuiltin.fss:912-917` still hold the six `self.asZZ64 <op> other.asZZ64` at the base (the pin 052a7c3fe moved to c124c6b65). Comprehension: pass. Ownership: fail, the story of row 317. Consistency: pass, F-118 says the same and that no test pins it.
- Change: pin moved to c124c6b65; the story dropped; F-118 named; "Old probe" for the gone probe path.
- Dropped: the row-317 story; home: the history, row 328, and row 317 (FIXED).
- Read beyond the evidence: FACTS.md:175 (F-118).

## Row 440: rewrite
- Scope: pass. Present meaning: pass. Evidence: fail, "'0/0 <= 0/0 true 0/0 >= 0/0 true' (`NanQQ.fss` at a3252d568)": no `NanQQ.fss` exists in git history, and a3252d568 adds only a Java benchmark (`git show --stat a3252d568`). The values follow from `:605`, `:607`, which still read as cited. Comprehension: pass. Ownership: pass. Consistency: pass with F-319.
- Change: the false citation dropped; the comparisons of 0/0 against a finite value named with their guard, `tests/ComparisonAtNaNWalk.fss:51-60`; pin moved to c124c6b65 (the cited lines hold at the base).
- Dropped: the NanQQ.fss quotation; home: none needed, its fact (`<=`, `>=` true) is in the claim and follows from `:605`, `:607`; the old line stays in the history.
- Read beyond: `ProjectFortress/tests/XXXRationalUnorderedRungP.fss`, `ComparisonAtNaNWalk.fss`, commit 3eabf8435.

## Row 456: rewrite
- Scope: pass. Present meaning: fail, "`TotalComparison` is no longer a `StandardTotalOrder` since rung H" tells history. Evidence: fail, `Library/FortressLibrary.fss:185`, `:197` now read `opr =`; the `CMP` bodies are at `:187`, `:199`. Also "The api's `Comparison` result on them is another slip (triage.md:67)" is no longer true: `Library/FortressLibrary.fsi:144`, `:155` declare `TotalComparison`. Comprehension: pass. Ownership: pass. Consistency: pass.
- Change: lines re-pinned; the mechanism stated as the present declaration (`:159-160`); siblings 457, 462; the fixed api slip dropped. Reproducer kept: the plain test asserts the wrong values, so it holds while the defect does.
- Dropped: the api-slip sentence (fixed; old line in the history).
- Silent: `defect` (silent.txt).
- Read beyond: `Library/FortressLibrary.fss:159-214`, `Library/FortressLibrary.fsi:141-160`, `CompilerBuiltin.fss:1525-1575`, `ExclusionRemainderRungH.fss`.

## Row 457: keep
- All six pass. `Library/FortressLibrary.fss:138`, `:177-179`, `:214` hold at the base; `CompilerBuiltin.fss:1494-1495` holds; the `XXX` test asserts the claim; the refused batch-13 note is already folded in (the lazy form, `ComparisonLazyLexico`). The mech's "moved" marks on `:179`, `:214` are misreadings: they are lines of `FortressLibrary.fss`, not of RECORD.md.

## Row 462: rewrite
- Scope: pass. Present meaning: pass. Evidence: fail, `FortressLibrary.fss:166-167` now read `=` and `CMP`; walk's `CMP` and `<` against `Unordered` are at `:167-168`. Comprehension: pass. Ownership: fail, "The same probe shows the prelude's `CMP` ... where walk's do not (rows 456, 457)" restates siblings' claims. Consistency: pass.
- Change: re-pinned; siblings 456, 457 first; walk's half tied to `ExclusionRemainderRungH.fss:45`, `:51`; the compiled half said to have no test. Reproducer stays `none` (no single test shows both halves), with the old probe path.
- Dropped: the restatement of 456 and 457; home: rows 456 and 457.
- Silent: `defect`.

## Row 880: keep
- All six pass. CONTESTED: review-queue item 344 (review-queue-learning-2026-11-05.md:159) landed a default by sort workers, not a curator's answer or a POSITIONS entry, so the status stays. Citations hold (FortressBuiltin.fsi:65 is the comment line, the getter at :66). The plain test asserts today's values, as item 344 records.

## Row 484: rewrite
- Scope: fail, the claim names the fixed half: "the `ZZ64` half, `b MAX 1` stopping the run with "Ambiguous coercion", is fixed". Present meaning: fail, notes tell the repair ("fixed `2770550c3` (climb batch N, rung M) and `9d2e4c856` (climb batch 8, rung Q)"). Evidence: fail, no pinned line for the mechanism. Comprehension: pass. Ownership: fail. Consistency: pass with F-74, F-138.
- Change: the fixed half and the repair story cut; mechanism pinned at `Library/FortressLibrary.fss:821-822` (ZZ64's coercions from ZZ32 and NN32) with F-74; F-138 named for the per-type MIN/MAX. Sibling 517 dropped from `siblings:` since it is FIXED.
- Dropped: commits 2770550c3, 9d2e4c856 and the ambiguity's mechanism; home: row 517 (FIXED), F-138 and the history, row 484.

No pairs for the reconcile run: the overlaps outside the chunk (318, 795, 188) state other defects.

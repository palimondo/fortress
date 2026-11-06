# Chunk p2 of run p-run1: assessment

Base de6d905f5. Marks: scope, present meaning, evidence, comprehension, ownership, consistency.

## 327: rewrite
- scope pass; present meaning FAIL: "Under the code generator's wrap the call was `verifyChoose(-1257966796+j, 2)`" tells a past compiled behaviour (F-118 has since changed numeral handling); evidence pass (`ChooseTest3.fss:122-125` unchanged; `IntegerChoose2.fss:56`, `:115` read; `LibraryJUTest.java:36-41` read: it builds a suite of `.test` files only); comprehension pass; ownership FAIL: "the identical line of `library_tests/IntegerChoose2.fss` (`fastSlowBoundary`)" gives no line; consistency pass.
- New line: the wrapped value stated as the one measured; `IntegerChoose2.fss:56`, `:115` pinned. Nothing dropped.
- Beyond the evidence: FACTS F-118; `grep ChooseTest3 *.test` (none).

## 348: rewrite
- scope FAIL: the claim omits that the prelude declares no `DOTTIMES` (FACTS:186, "declares no ⨰"; grep at base finds none in `CompilerBuiltin.fss`); present meaning FAIL: "Interpreter half fixed ab914b6e0 (climb batch 5, rung D)", "By POSITIONS 2026-09-26 (rung O of climb batch 4)"; evidence pass (the four ranges hold the inverted bindings at de6d905f5, lines read); comprehension pass; ownership FAIL: the batch story; consistency pass (P-38, P-73, FACTS:30, :136, :186 agree; the record-says-fixed signal is P-38's future respelling, not a fix).
- Dropped: "in 10 compiled test files" (a count; today 7 `compiler_tests` files and 6 `library_tests` files hold the spellings): home, the history. The commit ab914b6e0: home, the history. Siblings 700, 797 added.

## 350: rewrite
- scope FAIL: the claim says "the compiled path's" while its notes and `Int.java:258-261` show walk's `IntegerOverflow` carries no value either; present meaning pass; evidence pass (43 throws in nativeHelpers name IntegerOverflow, none with a message; `Utility.java:28-48` read); comprehension pass; ownership pass; consistency pass.
- Pin moved to `simpleIntArith.java:97` at de6d905f5. Nothing dropped.

## 429: rewrite
- scope pass; present meaning FAIL: "Nothing to do now: the decision on the wrapping operators (POSITIONS-history, rung O of climb batch 4)"; evidence FAIL: "`git show 7f57b836e:Library/FortressLibrary.fsi`, `:416-420`": the commit does not resolve; comprehension pass; ownership FAIL (batch story); consistency FAIL: "⊞ ... (row 348)": the one library's lack of ⊞ is row 797's, not 348's.
- New line: the grep at the base with its empty output; `FortressLibrary.fsi:561-563`; spec lines `:391-392`; P-73 by number; row 797. Dropped: the rung branch's commit (unresolvable): home, the history.

## 431: rewrite
- scope FAIL: "on a `BigNum` the unwidened shift never terminates" states the team's line, not the tree's: line 322 has `widen` and ends; present meaning FAIL: "decision D10 ... keeping the base's 64-bit behaviour: the nested tower gave it `Long`s"; evidence: the probe is gone, but `explorations/reviews/quickcheck-widen.md` sections 3, 7.3 and 8 (read) measured the effect: 2^40+7, 2^50+7, 2^70+7 give one state; comprehension pass; ownership FAIL (rung story); consistency pass.
- Dropped: D10 and the nested-tower history: home, the history and quickcheck-widen.md section 4. Kept: the team line's OutOfMemoryError, the fix and its cost.

## 500: rewrite
- scope pass; present meaning FAIL: "At 052a7c3fe they are `...:788-789` and `:810`": at the base those lines are `\end{Fortress}` and blank; the properties are at `:801-802`, `:823`; evidence pass (lines read; library declares none of the three, grep); comprehension pass; ownership pass; consistency pass.
- Lines re-pinned. Nothing dropped.

## 501: rewrite
- scope pass; present meaning FAIL: `algebraic-constraints.tex:1153-1154` and `basic-integers.tex:541-547` now point at other text; the passage is at `:1159-1160` and `:554-560`; evidence pass, and F-316 (gated by `tests/IntSemanticsRungI.fss`) now gates the nonnegative results under walk; comprehension pass; ownership pass; consistency pass.
- Added: F-316, and the chapter's own "strictly positive integers" lattice sentence (`:562-564`). Nothing dropped.

## 700: rewrite
- scope pass; present meaning pass; evidence FAIL (minor): `Random.fss:222`, `:235`, `:241`, `:252-253` at 7e4fcb562 now show comments and `reseed`; at the base the object is `:226`, `random`'s line `:239`, `perturbed`'s `:245`, the 2^48 constructor `:256-257`; comprehension pass; ownership pass; consistency pass (FACTS:186).
- Lines re-pinned. Still by reading: a run is suggested in questions.md, not required for the claim.

## 792: rewrite (status stays CONTESTED)
- scope FAIL: the listing names `IntegerDivisionByZero` again at `basic-integers.tex:460-464` and `:481`, which the row omits; present meaning FAIL: `Library/FortressLibrary.fsi:1114` is now `empty(): UniqueItem[\T\]`, `DivisionByZero` is at `:1138`; evidence pass; comprehension pass; ownership pass ("climb batch 20's review's default" reworded to the file); consistency pass (no POSITIONS or FACTS entry settles it; review-queue item 195 open). Sibling 881 added, which names 792.
- Not closed: its question is unsettled.

## 797: keep
- All six pass. The grep at d4d454f9d still prints 0 for each file at the base (rerun); `Fortress.Number.fsi:87-88` holds; P-73 agrees.

## 881: keep
- All six pass. `git grep 'opr DIVREM\|opr DIVMOD' de6d905f5` finds only `Library/incomplete/basic/Fortress.Number.fsi:130-131`; `XXXDivRemDivModWalk` ran green as an expected failure in the gate a12ab5c60, which holds for the base.

## 887: keep
- All six pass. Cited lines unchanged since d85bac271; `XXXChooseZZOutOfRangeWalk` is a gated expected failure; FACTS F-316 and F-314 agree. Sibling 337 is FIXED: it is the fixed widths' half, a true sibling, so `siblings: 337` stays.

## Pairs, duplicates
- Overlaps with other chunks (318, 349, 381, 863) state other defects; no pair written. Within the chunk: 348, 429, 700, 797 are siblings (different sites); 792 and 881 siblings. No duplicate.

## Tokens mech.py lists as dropped, and their homes
- 327: `verifyChoose(-1257966796+j, 2)` is kept as the value `-1257966796`; `fastSlowBoundary` kept as `fastSlowBoundary: ZZ64`.
- 431: `propMapSizeInvariant2` (where the team line's test died), `genQQ` (whose `BigNum` parts reached it), `perturb-probe.sh` and `rung-flat-tower/REPORT.md` (D10): home, the history (row 431's old lines) and `explorations/reviews/quickcheck-widen.md`, sections 3 to 5.
- 350, 429, 500, 501, 700, 792: old line numbers replaced by the base's; `git show 7f57b836e` does not resolve.

mech.py's last line: "MECH: 9 lines, 0 failing, every check passes."

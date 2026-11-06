# Check of c28 (run c-run1, base c124c6b65)

`mech.md`: `MECH: 9 lines, 0 failing, every check passes.` Citations read at the base with `git show c124c6b65:<path>`. No build or test run. Closes, duplicates: none in this chunk. Pairs: 293/371 plausible (293's walk half is 371's defect): pass.

## 24 (question): FAIL
- Passage (`questions.md`, row 24, third outcome): "Both accepted: the defect is gone under walk; close with `none` and this run as the reason, after the compiled path is checked".
- Source: the outcome rests on a compiled check that the question gives no command or outcomes for; the brief needs each outcome to map to a line or a close. The first command also names `T24.fss` while the file is to be written under `tmp/`.
- Correction: command `bin/fortress walk tmp/T24.fss`; third outcome: "Both accepted: run `bin/fortress compile tmp/T24.fss`; if it also accepts both, close with `none` and both runs as reason; if it refuses, rewrite the claim to the compiled path only (`ProjectFortress/src/com/sun/fortress/compiler/typechecker/TypeNormalizer.java:144-160` desugars only `T^(n BY m)`), with the refusal as reproducer output."

## 721 (rewrite): FAIL
- Fidelity: pins hold at the base (`fss:2597-2608` `array1`, `:2984-2995` `array2`, typecase over `__thrower`, eight number types, `else` plain); `array[\T\](n)` reaches `array1` through `__arr1` (`fss:2259`, `:2267-2268`). Test asserts the specification's `AnyVector`. Dropped `:2834`, `Library/FortressLibrary.fss:2455` (false, moved), `Vector[\Int,3\]` (story of the old base; home: history). Present, status, form: pass.
- Failure (cold read): passage "`Int`, `ZZ32`'s one listed type (row 364)"; the cold reader could not resolve "listed", and a worker would not either.
- Correction: replace "`Int`, `ZZ32`'s one listed type (row 364)" with "`Int`, the run-time class walk gives a `ZZ32` value (row 364)" (notes 459 -> 479).

## 674 (rewrite): pass
- Advice at `fsi:1336` and `fss:2022` holds; `narrowToRange` at `fss:2398`, `:2456`, `:2691`, `:3117`, `:3799` holds; test asserts `(5#3)[0#2]` = `[5,6]` and `narrowToRange`. Dropped old pins (false, moved); `compile-ladder/rung-generator-size/SKEPTIC.md` and the rung G story: history. Silent kept, NEGATIVE-VERIFIED kept.

## 53 (question): pass
- F-151 bound at `fsi:1645`, `:1757`; `dot` is `SUM[\T\]` at `fss:2555-2556`. Question narrow, runs from the main tree, every outcome maps to a line or a close.

## 54 (rewrite): pass
- `__SimpleSubArray1` (`fss:2506`), `Col` (`:2833`), `Row` (`:2844`) extend only `Array1`; `SubArray2` (`:2811`) is the `Array2` view. Nothing dropped.

## 56 (rewrite): pass
- `fss:2701-2717`, `:2720-2722`, `:2724-2726` are comment blocks in `Array2` (`:2653`); `:2719`, `:2723` are live `m[:, j]`, `m[i, :]`. Dropped old pins (false).

## 109 (rewrite): FAIL
- Fidelity: `Matrix` (`fsi:1757-1770`) has no `pmul`; `Vector.pmul` `:1652`, top-level `:1683`. Dropped `:1609`, `:1720-1731` (false), `Vector.pmul` (now "`Vector` does (`:1652`)"); "a design gap rather than a broken promise": a judgement, the silent cell and `silent.txt` hold it. Pass.
- Failure (cold read): passage "Workaround: a user `ODOT` (⊙) on the carrier"; "the carrier" names nothing in this row (in row 293 it is a type extending both `Matrix` and `MultiplicativeRing`, which is not the workaround). A worker would stumble.
- Correction: replace "a user `ODOT` (⊙) on the carrier" with "a top-level `ODOT` (⊙, row 161)" (notes 695 -> 694).

## 169 (rewrite): FAIL
- Fidelity: `_[_]:=` at `fss:2127`, `:2226`, `:2228`, `:2689` hold. Passage: "The commented-out blocks of row 56 (`:2701-2717`, `:2720-2726`)"; at the base `:2723` inside that range is the live `opr[i0:ZZ32, _:TrivialOpenRange]` (`fss:2723`), not commented out, as row 56 itself states.
- Correction: replace "(`:2701-2717`, `:2720-2726`)" with "(`:2701-2717`, `:2720-2722`, `:2724-2726`)" (notes 519 -> 533).

## 254 (question): FAIL
- Passage (`questions.md`, row 254): the program builds `m = matrix[\RR64,2,3\](1.0)`, `n = matrix[\RR64,2,3\](1.0)` and calls them "runtime-built".
- Source: the row's claim is "a mismatched `DOT` product on runtime-built arrays"; `matrix[\RR64,2,3\]` fixes the sizes statically (`fss:3006`), so the run does not test the claim's condition, and an outcome could close or rewrite the row on the wrong case.
- Correction: build them at run-time sizes: `r: ZZ32 = 2`, `c: ZZ32 = 3`, `m = array[\RR64\](r, c).fill(1.0)`, `n = array[\RR64\](r, c).fill(1.0)` (`array[\E\](x,y)` reaches `array2` through `__arr2`, `fss:2260`, `:2269-2270`, a `Matrix` at `RR64`). Outcomes unchanged.

## 292 (rewrite): FAIL
- Fidelity: `Array3` at `fsi:1824-1834` extends `Indexed1/2/3`, `Rank3`, `StandardMutableArrayType`, excludes `AnyAdditiveGroup`, comment gives the trade. "unary `-`" dropped: home `fsi:1650`, `:1762`: kept.
- Failure (nothing lost / cold read): dropped `two or more -- Jan: I continue to disbelieve`. With it gone, the notes' only spec sentence, "The specification makes a two-dimensional `Number` array a matrix.", says nothing of rank 3, so the class "library gap vs spec" has no stated basis; the cold reader said exactly that. Source: `Specification-1.0-frozen/basic/expressions/aggregate.tex:153` (margin "two or more"), `:158-161` (matrix types with `k > 1` extents).
- Correction: replace "The specification makes a two-dimensional `Number` array a matrix." with "The specification makes a two-dimensional `Number` array a matrix, and its margin notes ask for two or more dimensions (`aggregate.tex:153`, `:158-161`)."; and, for the notes limit, replace "Every rank-3 elementwise operator is a user declaration; so C4's operator family is generic in the index type (rows 161, 295)." with "Every rank-3 elementwise operator is a user declaration (rows 161, 295)." (notes 663 -> 696; the C4 clause's home: rows 161, 295).

## 293 (rewrite): pass
- Exclusions at `fsi:1647`, `:1759` hold. Dropped `:1602-1604`, `:1720-1722` (false), `v02_ring_excluded.fss`, `v02b_ring_juxt.fss` (now written whole). Walk half paired to 371.

## 729 (rewrite): pass
- `fsi:1645`, `:1757` bound and `fss:2597-2608`, `:2984-2995` `else` branch hold; test asserts the plain array at `Number`, `AnyIntegral`. CONTESTED kept, unsettled (PLAN L.worker.1). Dropped `:2953-2965`, `fsi:1613`, `fss:2572-2586` (false), `Vector[\Number,2\]` (old base; history).

## Counts
6 pass (53, 54, 56, 293, 674, 729), 6 fail (24, 109, 169, 254, 292, 721).

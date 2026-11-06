# Assessment, c-run2 probe

The eight questions of the run's chunks (c13: 850; c17: 465; c22: 789, 341; c26: 390; c30: 23, 393; c41: 852), each with its run in `runs.md`. Chunks c2, c7, c9, c35, c36 and c42 put no row to measure and believe no `XXX` test passes. Dispositions follow `writer.md`; every new line is in `rows.rewrite`, the close in `closes.txt`.

## Row 850 (c13, CONTESTED)

- Question: does `fortress compile` refuse `object D extends { C[\Dog\], C[\Animal\] }` under `trait C[\covariant S\]`, and does it take `f(x: C[\Dog\])` beside `f(x: C[\Cat\])` as excluding?
- Output: `Types C[\Dog\] and C[\Animal\] exclude each other.  D must not extend them.` (4 errors, rc 255). The `f` pair: `P850f` was refused only for its object's name, 'DC is not a valid object name'; renamed `DogCatC` (`P850g`), it compiles and `f(DogCatC)` prints `1`, rc 0.
- Disposition: rewrite, status stays `CONTESTED` (variance is future work, P-62; no curator answer settles it). Both halves of the reading hold, so the claim loses "by reading" and the notes gain the two outputs in place of "By reading, not run" and "Settles it: ...". Dropped: the rules map's citation `explorations/reviews/popl2019-rules-map.md`, finding 1 (home: history, the old line whole) and the subtype test's `:274-280` (home: history).

## Row 465 (c17, NEGATIVE-VERIFIED)

- Question: under walk, does a program call an overload that only the component declares where its api declares another of the same name?
- Output: `2` then `a!`, rc 0.
- Disposition: rewrite, the question's first outcome: the gap stands, its library example (`Array2`'s `m[:, j]`, `m[i, :]`) is gone since the api declares them (`Library/FortressLibrary.fsi:1729-1730`). The claim names the probe's `f` pair. Dropped: `FortressLibrary.fss:2707`, `:2711` and `VectorMatrixCastsWalk.fss:158-165` (no longer the defect's site; home: history).

## Row 789 (c22, NEGATIVE-VERIFIED)

- Question: does the compiled checker still refuse the overlapping pair with 'V is not in the kind env'?
- Output: `P789.fss:8:19:` `V is not in the kind env [][][]`, `File P789.fss has 1 error.`, rc 255; control `P789c` (second declaration alone) prints `2`.
- Disposition: rewrite (first outcome): the claim stands at the base, past `64fa505c4` and `108ab82d6`; the notes give the probe as command and output and drop "on 612869b4a and the rung's head". Dropped: the control beside `h[\T\](x: Box[\T\], y: ZZ32)`, not rerun (home: history).

## Row 341 (c22, NEGATIVE-VERIFIED)

- Question: does walk, from an empty cache, still refuse a program's generic pair of a library operator beside the library's generic declarations?
- Output: `P341.fss` (one component) prints `4.0` cold, with the library analysed again into the empty folder, and warm. The row's own old probe `run-c4/cold-cache/p4/` (api pair imported, `1.0 MAX zeros(3)`), whose 2026-09-19 `run1.txt` holds the refusal, prints `3.0` and `1.0` cold and warm. The claim's sized face, a `nat`-sized `Vector` `+` pair, prints `3.0` three times cold.
- Disposition: close, by `c41c3d2b0` ("Walk's load check reads a program's generic operators between an array and a number beside a self-typed group's own on their declared domains", row 804, which it fixed with the same refusal message). The commit is identified by reading, not bisected: the probe built nothing, and of the commits since `ae4f8e38a` that touch `OverloadedFunction.java` (`f9fe5c874`, `9879d4386`, `6d187d069`, `743eb5286`, `5262a2412`, `14e91723f`, `c41c3d2b0`), it is the one whose change reads a program generic beside a functional method of a generic self-typed trait, the library's `StandardTotalOrder.MAX` here. The landing should take that as the fixing commit only with this caveat; a bisect over those seven would settle it. Test `none`: `ExclusionArrayScalarLibraryShapeWalk.fss` asserts the shape against a mock library, and `ArrayOperatorsBesideLibrary.fss` calls the library's own generic family, not a program's pair. Hand-over: FACTS F-269's sentence on C4's former `MAX` refusal is now false at the base (record maintainer). The cache half (a hit skips the check) stays with row 98.

## Row 390 (c26, NEGATIVE-VERIFIED)

- Question: does the compiled run still die with `NoSuchMethodError`?
- Output: `REACHED`, then `NoSuchMethodError: ... \=p{...!20!1-30,...!21!1-29}(fortress.AnyType$Any)`, both from the probe copy and from the gated test (`Saw expected failure`); faces `g1(5)` and `h(Circle, 3)` die the same way.
- Disposition: rewrite (first outcome): the claim stands; notes re-pinned to `typedApplication` (`Functionals.scala:650`; `checkApplication` at `:430-453` is gone), "rung I (`8dc1a74d9`) kept that ranking" dropped (a story; home: history), both numeral faces kept. Dropped: the `IntLiteral` site `CompilerBuiltin.fss:883` (home: history).

## Row 23 (c30, NEGATIVE-VERIFIED)

- Question: does walk still refuse an array argument at `T[n]` with a `nat` parameter?
- Output: `literal size: 3`, then `Cannot unify __DefaultVector[\RR64,3\](class ...FTypeObjectInstance) with ArrayType`, rc 1.
- Disposition: rewrite (first outcome): the claim names the probe's shape and the path; the notes give the run and pin `unify`'s error at `FType.java:576` (its `unificationError(..., "Cannot unify ", ...)` at the base). Nothing dropped.

## Row 393 (c30, NEGATIVE-VERIFIED)

- Question: is a cycle of coercions still accepted, on each path?
- Output: compiled compiles, prints `fp(QOf(1)) =  1`, `fq(POf(2)) =  2`; walk prints the same, rc 0 both.
- Disposition: rewrite (first outcome): notes give both runs, the test it owes (an `XXX` compile test with `compile_err_contains`) in place of "no test can gate it", and drop "walk refused the program before rung C" (story; home: history). The probe's path is its path in the parent of `ab067d9b6`.

## Row 852 (c41, CONTESTED)

- Question: do two parameters, or two static parameters, of one name load, on walk and compiled?
- Output: `DupParam` prints `2` and `DupStaticParam` prints `3`, rc 0, on walk and on the compiled path.
- Disposition: rewrite to `NEGATIVE-VERIFIED`, the question's second outcome. Its `CONTESTED` was the open fact ("whether ... loads is not established; by reading"), not a question for the curator; the specification makes it a static error and the run confirms the load on both paths, the template's `NEGATIVE-VERIFIED`. If the landing reads `writer.md`'s rule on `CONTESTED` rows as keeping the status until the curator speaks, the same line stands with `CONTESTED` in its status cell. Dropped: the rules map's citation, finding 3 (home: history).

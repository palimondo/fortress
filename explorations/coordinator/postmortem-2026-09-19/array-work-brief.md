# The array work of 2026-09-19: what was changed, what was only written down

For Pavol. Everything below was checked in the tree on 2026-09-20 (commits on `main` between 2026-09-19 12:00 and 2026-09-20 05:30; the tip is `e8059a765`, a handover commit that touches none of the paths here). Every line number is the current tree's. Two terms used throughout: the **cache** is the interpreter's saved analysis of the library and of each component (`default_repository/caches/`, or wherever `FORTRESS_CACHES` points); a **cold** run is one that starts with that directory empty. The **overload check** is the test the interpreter runs when it loads a component, that any two declarations of one operator name can be told apart by their parameter types.

## 1. Committed under the sealed tree

One commit, `02d09a39f` (2026-09-19 20:24), touches `Library/` and `ProjectFortress/`. Six files. The precedent column names the library line that already does the same thing; each was opened and read.

| File | Lines | What the change does | Precedent, verified |
|---|---|---|---|
| `Library/FortressLibrary.fss` | 4496-4504 (was 4493-4517) | The four integer-only operators `+ - MIN MAX` between an `Array[\ZZ32,ZZ32\]` and a `ZZ32` become eight declarations generic over `[\T extends Number, I\]`, each order of operands, bodies `x.map[\T\](fn e => e + y)`; this is "scalar extension": one number applied to every element of an array. | The library's own array operators over `T extends Number`: `opr DOT[\ T extends Number, nat n \](me: Vector[\T,n\], other: T)` and its juxtaposition twin at `:2270-2276`, the matrix forms at `:2624-2637`. |
| same file | 327-331 | Adds an empty trait `AnyAdditiveGroup` and makes `AdditiveGroup[\T\]` extend it; an empty "marker" trait exists only so that another trait can name it in an `excludes` clause, because `excludes` cannot name a generic trait. | `trait AnyMultiplicativeRing end`, "Place holder for exclusions of MultiplicativeRing", at `:338-339`, extended by `MultiplicativeRing`; the same shape at `:1293-1295` (`AnyMaybe`) and `:1370-1372` (`AnyUniqueItem`), both commented "This makes excludes work without where clauses". |
| same file | 612 | `trait AnyIntegral extends { QQ } end` becomes `… comprises { ZZ } end`; `comprises` lists the only types allowed directly beneath a trait, and this was the one link in the numeric tower without one. | Every other link of the tower: `Number comprises { RR64 }` `:355`, `RR64 comprises { Float, FloatLiteral, RR32, QQ }` `:425`, `QQ comprises { Ratio, AnyIntegral }` `:524`, `ZZ32 comprises { Int, IntLiteral }` `:645`, `ZZ comprises { BigNum, ZZ64, NN64 }` `:824-825`; the api already wrote `ZZ`'s at `.fsi:536`. |
| same file | 2669 | `Array3 … excludes { Number, String }` becomes `excludes { Number, String, AnyAdditiveGroup, AnyMultiplicativeRing }`; `excludes` declares that no type can be both. | `Vector … excludes { AnyMultiplicativeRing }` `:2194` and `Matrix … excludes { AnyMultiplicativeRing }` `:2502`; `Array1` and `Array2` carry the `{ Number, String }` half at `:2099`, `:2295`. |
| `Library/FortressLibrary.fsi` | 250-255, 409, 1659, 2540-2547 | The same four sites mirrored in the api. | As above. |
| `ProjectFortress/tests/ArrayScalarExtension.fss` | new, 52 lines | Test program, section 2. | New file; its pass rule is the harness's existing one (section 2). |
| `ProjectFortress/tests/ArrayOperatorsBesideLibrary.fss` | new, 33 lines | Test program, section 2. | New file, same rule. |
| `ProjectFortress/test_library/ArrayOperatorVocabulary.fsi` and `.fss` | new, 12 + 17 lines | The api the second test imports, section 2. | `test_library/` already holds 32 other files of this kind (apis that tests import, such as `AsciiVal.fsi/.fss`). |

Why the tower had to be closed for the generic block to load, in the commit's own words: the interpreter treats a trait with a `comprises` clause as excluding a type when every leaf under it excludes that type; `ZZ32`'s leaves are the objects `Int` and `IntLiteral`, so the old integer block loaded; `RR64`'s leaves included `AnyIntegral`, which had no `comprises` clause and so excluded nothing, so a block over `T extends Number` was refused beside `AdditiveGroup.+` and `StandardTotalOrder.MAX`. The `Array3` clause and the marker do the same for a user operator whose other operand is an `Array3`.

Also in the window, not array work, listed so the sealed-tree inventory is complete: commit `a0fcf0a96` (17:06) added ten lines to `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:155-164` (the `run_out_WIcontains` test key, a whitespace-insensitive "output contains"), pinned `FORTRESS_THREADS=1` in `build.xml:947` for the `fastTrack` test macro, and appended `/tmp/` to `.gitignore`. These were part of the "go" recorded in POSITIONS for the six process decisions of that day.

## 2. The tests that gate it

Both programs live in `ProjectFortress/tests/` with no `.test` file, so the harness rule that applies is the default for that directory: the program passes when it exits 0 and its output contains neither `fail` nor `FAIL` (`FileTests.java:377-380, 408`). Each prints one line per check, `name = value`, and prints `fail name: got …, want …` on a miss. Each was run cold, red before the library edit and green after; the captures are in `explorations/run-c4/cold-cache/repair/`.

- **`ArrayScalarExtension.fss`**, 24 checks: `+ - MIN MAX` in both operand orders over a 3-element `Array[\RR64,ZZ32\]`, a 2×2 `Matrix[\RR64,2,2\]`, and a 3-element `Array[\ZZ32,ZZ32\]`. The last eight pin what the old integer block did, which no test asserted before. Before the edit it died at line 20 (`v + 1.0`) with `Failed to find any matching overload, args = (__DefaultVector[\RR64,3\],1.0)` (`test-ArrayScalarExtension-before.txt`); after, 24 lines (`-after.txt`).
- **`ArrayOperatorsBesideLibrary.fss`** with the fixture **`test_library/ArrayOperatorVocabulary.{fsi,fss}`**, 9 checks. The fixture is a user api that declares operator names the library also declares: two `MINMAX` over `Array[\RR64,ZZ32\]` (both orders), a plane-wise `+` between a `Matrix` and an `Array3` (both orders), and two `juxtaposition` at rank 3. The test imports it and checks that it loads beside the library's operators and computes (`v MINMAX 0.0`, `m + t`, `t + m`, `t t`, `t m`), then that the library's new block still answers `m + 1.0`, `1.0 + m`, `0.0 MAX v`. It declares two of each name because, measured in this work, the interpreter does not check a single user declaration of a library operator name against the library's at all. Before the edit: `ArrayOperatorVocabulary.fss:4 and FortressLibrary.fss:281: StandardTotalOrder[\T\].MINMAX(self, other:T) has a parameter with generic type, at least one pair of parameters must have excluding types` (`test-ArrayOperatorsBesideLibrary-before.txt`); after, 9 lines.
- Gate on the committed tree, caches wiped first: `ant testSystem` 384 tests (382 + these two), 0 failures; `ant testFast` 1,409 tests, 0 failures (`repair/GATE.txt`).

## 3. Committed under explorations

Commit `8590d7a9e` (20:39).

- **`explorations/run-c4/src/FlatArrays.{fss,fsi}`** dropped seven declarations the library now serves: the four scalar `+`/`-` (both orders), the two scalar `MAX`, and the `Diag`-times-`Matrix` juxtaposition; `Diag[\nat s\]` now `extends Matrix[\RR64,s,s\]` as a read-only view (`get` returns `d[i]` on the diagonal and `0.0` elsewhere, `put` fails), so `diag(v) m` is the library's own matrix product. Everything else in the file stays (`×`, `/`, `>`, `SQRT`, `exp`, `log`, the plane-wise `+`, the batched juxtaposition, the view objects, `rows`, `gather`, `onehot`, `pick`, `flat`). `MicroGptFlat.fss` is byte-identical.
- **`explorations/apl/mg/FlatArrays2.{fss,fsi}`** dropped the same seven and made `Diag` the same view; `MicroGptApl.fss`, the APL text and the grammar rules are byte-identical. `apl/mg/NOTES-swap.md` gained a dated paragraph under the one that had called the cold failure "bogus", the original kept.
- Evidence, all under `explorations/run-c4/cold-cache/`, 226 tracked files: the top level (22 files: `CAPTURES.md`, `ROWS.md`, the `exp1`-`exp3` captures of C4 and the APL base dying cold, the ablation captures and scripts) with `mini/` 6, `p1/` 3, `p2/` 9, `p3/` 5, `p4/` 8, `p5/` 4 (the 13-line reproducers); `max-shapes/` 95 (`probes/` 89, `H1/` 1, `H2/` 1, `H3/` 4); `operators/` 64 (`A/` 3, `B/` 1, `C/` 16, `D/` 44); `repair/` 10. Plus `explorations/reviews/c4-flatarrays-review.md`, 191 lines.

## 4. Written down, not built

`explorations/coordinator/array-design.md`, 203 lines, two commits (`c227cbe55` the first version, `d55aa91a6` the revision after your rulings). It is a design sketch for arrays on the compile path. Its four questions, and a fifth it added after the rulings:

1. Storage, boxed or `double[]` (a boxed number is one wrapped in a heap object; `double[]` is a bare JVM array of doubles). **Fixed by your ruling**: `double[]`, unboxed.
2. What implements the library's sized array traits over that store. **Default only** (the document's word; it says every recommendation "decides nothing"): one hand-written native store per element type under the library's generic objects, chosen by the factory.
3. Where the loops run unboxed: inside native whole-array Java routines, or in generated code once the code generator learns bare doubles. **Default only**: natives first, generated-code unboxing later.
4. Where sizes live: as run-time fields only, or in the type as `nat` parameters (a size carried in the type, `Vector[\T, nat s0\]`), which the compiler's checker does not implement today. **Fixed by your ruling**: in the type, the checker taught `nat`, the array fork and the `nat` fork taken together.
5. (added) What to do with the library's six declarations whose `nat` nothing constrains. **Default only**: an unconstrained `nat` becomes `0`.

Smaller defaults inside it: the `nat` also stored as a run-time field of the store; a run-time-sized factory returns the unsized `Array` as the model already does; one "shadow" session (edited compiler classes placed first on the class path, nothing tracked changed) before the checker edit lands in the tree.

No line of code exists for any of it. The two commits touched only the document and one index line. Its eight probe programs were compiled in a private cache and are not in the tree; nothing in `Library/`, `ProjectFortress/` or the compiler was changed for it.

## 5. What was measured and how

Each run below started from a freshly created empty directory named by `FORTRESS_CACHES`, so the first run is the one that analyzes the library and runs the overload check (the check that every earlier C4 number had skipped, ledger rows 341 and 342).

- The repair, after landing (`explorations/run-c4/cold-cache/repair/`): `MicroGptFlatCheck-threads1.txt` 40 PASS, 0 FAIL, check total 946 s (wall 968 s); `MicroGptFlatCheck-threads4.txt` 40 PASS, 395 s (419 s); `MicroGptAplCheck-threads1.txt` 40 PASS, 926 s (958 s); `MicroGptAplCheck-threads4.txt` 40 PASS, 362 s (395 s). The worker's record (`ROWS.md`, "Landed 2026-09-19") says every non-timing line matches the committed warm captures `run-c4/checks/threads{1,4}.txt` and `apl/mg/checks/threads{1,4}_flatarrays2.txt`; I did not re-run that comparison. Also there: `MicroGptAplCheck-threads1-second-run.txt`, the same program on the cache the cold run left, 847 s, 40 PASS.
- Before landing, the same run under a copy of the library with the edit (`operators/C/run1.txt`): 40 PASS cold, 923 s. And the earlier in-place repair you stopped (`max-shapes/H3/run1.txt`): the five batch-1 losses, identical digits.
- The failures the work started from: `cold-cache/exp1-run1.txt` (C4's first cold run dying at `FlatArrays.fss:31` against `FortressLibrary.fss:280`), `exp1-run2.txt` (the identical second run, green), `exp3-run1.txt` (the APL base dying at `FlatArrays2.fss:40`); `p3/` the 13-line reproducer.
- Timings recorded by the worker, not judged: the APL base at one thread is 926 s cold and 847 s warm against its committed 420 s; C4 946 s against its committed 873 s at one thread, level at four.

## 6. Open questions the reports raise that you have not ruled on

- Ledger row 342 stays open: the interpreter writes a component to its cache before it runs the overload check on it, so a rejection appears once and never again; worklist item 24 asks for the check to run on a cache hit, an edit under `ProjectFortress/src/`.
- A single user declaration of a library operator name is never checked against the library's (measured, `ROWS.md`); C4's remaining plane-wise `+` and batched juxtaposition, one each, load by that gap. Whether that stands is not ruled.
- Your ruling says all of microGPT's invented extensions go into the standard library; only the scalar extension went. The rest (`×`, `/`, `>`, `SQRT`, `exp`, `log`; `Matrix + Array3`; the batched product; the view objects; `gather`, `onehot`, `pick`, `flat`, `rows`) stay in C4's file; row 341's append sketches a library home for each and says `rows` has no precedent. When, or whether, is not ruled.
- `operators/B/adjudication.md` reads the specification as refusing the library's own old integer block beside `AdditiveGroup.+`; the interpreter accepts the new generic block through exclusion. Whether the new block is legal by the specification's letter, and whether a trait's `T` counts as its functional method's own static parameter, are flagged as unadjudicated.
- Ledger row 296 ("a user declaration against an imported one is not checked and works") was contradicted twice on 2026-09-19 and still stands; the review proposed retiring it. Row 342 says of itself it "should probably be folded into row 98"; not done.
- The review's option 4: whether the APL sub-language becomes the only readable layer of the showcase, "a decision for Pavol, not a repair".
- The design document's questions 2, 3 and 5 and its smaller defaults (section 4) are defaults awaiting a ruling.

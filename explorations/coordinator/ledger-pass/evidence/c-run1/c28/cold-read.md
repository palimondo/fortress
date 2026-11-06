# Cold read, c28

Read with `CLAUDE.md`, the `fortress-repo` skill core and `references/records.md`, `tests-writing.md`. One gap common to every row: the skill names the seven status words but defines them only in "the row template" inside the ledger, which a cold reader may not read. I read `NEGATIVE-VERIFIED` as "the defect is confirmed and open" and `CONTESTED` as "open, a question decides it"; neither says on its own whether to build a fix now.

## Row 721

- **Defect:** under walk, a generic function that builds an array with `array[\T\]`, `array1` or `array2` at an inferred `T` gets a plain array when called with a `ZZ32` value, where the specification (which instantiates `T` at the static number type) gives a `Vector`. Walk instantiates `T` at the run-time class of the value (`Int` for `ZZ32`, and likewise for `ZZ64`, `RR64`), and the factories' `typecase` over their result type matches only the eight number types exactly, so it takes the plain branch. Consequence: `filled(z) + filled(z)` finds no overload.
- **Where:** walk only (class says walk); the static-argument inference of a call; the factories in `Library/FortressLibrary.fss:2597-2608` and `:2984-2995`.
- **Reproduce:** run the `XXX` test `ProjectFortress/tests/XXXArrayInferredElementVectorWalk.fss` under walk (it is green while the defect holds); or write `filled[\T\](x: T) = array[\T\](3).fill(x)`, call it on `z: ZZ32`, and add the result to itself.
- **Status:** confirmed, open, with a deferred `XXX` test pinning the specification's answer: a fix is wanted in walk's instantiation at a call; until then use the workaround `filled[\ZZ32\](z)`.
- **Could not resolve:** "`ZZ32`'s one listed type" is unclear wording (listed where? presumably the run-time class list of row 364, which I cannot read). "a witness of their result type" is a library idiom I could not find in the skill; I read it as a dummy value whose type the `typecase` inspects. The Claim's "at a `T` that walk instantiates at a value's run-time class" is hard to parse on first read but resolves with the Notes.

## Row 729

- **Defect:** `array1` and `array2` at an element type other than the eight concrete number types (for example `Number` or `AnyIntegral`) return a plain array, where the specification says an array of `Number` subtypes is a vector or matrix. `array1[\Number,2\]()` is not an `AnyVector`.
- **Where:** library, both paths implied (class says library); the factories' `typecase` at `Library/FortressLibrary.fss:2597-2608`, `:2984-2995`; the bound on `Vector`/`Matrix` at `Library/FortressLibrary.fsi:1645`, `:1757`.
- **Reproduce:** run `ProjectFortress/tests/ArrayFactoryAbstractNumber.fss`, a plain test that asserts today's plain array; or test `array1[\Number,2\]()` against `AnyVector`.
- **Status:** contested: the specification's sentence cannot hold at `Number` because the library bounds `Vector`'s element by `MultiplicativeRing[\T\]`, so `Vector[\Number,n\]` is ill-formed; no decision says whether the specification or the library gives way. Wait on that decision; do not build a fix. Note that the reproducer pins the current behaviour, so a fix must change it.
- **Could not resolve:** "PLAN, L.worker.1" is a pointer into a coordinator file that the skill does not describe for workers; I cannot tell what it holds or whether a worker should read it. "F-151" resolves via the FACTS query in `records.md`. "a witness of their result type", as in row 721.

## Row 674

- **Defect:** the library api's comment advises implementing an `Indexed`'s range subscript as `(bounds())[r]`, but that subscripts the bounds range by position from 0, not by index. With bounds `5#3`, `(5#3)[5#2]` fails ("right outside bounds") and `(5#3)[0#2]` gives `[5,6]`. The correct narrowing is `narrowToRange`, which takes indices. So a user `Indexed` with bounds not starting at 0 that follows the advice refuses its own index ranges.
- **Where:** library documentation and convention: `Library/FortressLibrary.fsi:1336` (`.fss:2022`); observed under walk; the advice's own uses in `Library/FlatString.fss:117`, `Library/String.fss:309` are correct only because string bounds start at 0.
- **Reproduce:** `ProjectFortress/tests/RangeSubscriptPositions.fss`, which asserts today's behaviour; or evaluate `(5#3)[5#2]` and `(5#3)[0#2]`.
- **Status:** confirmed, open, specification silent: a small fix (correct the advice, perhaps the two string uses) is open to build; meanwhile use `self.bounds.narrowToRange(r)`.
- **Could not resolve:** the Claim's phrase "reads `r` as positions from 0 ... where `narrowToRange` takes indices" is clear only after the Notes; otherwise none. Whether the fix is the comment, the subscript semantics of ranges, or both is not stated.

## Row 54

- **Defect:** slices and views of arrays (`v[4:7]`, `m[1,:]`, `m[:,j]`, `m[(a,b)#(c,d)]`) are zero-copy but their classes extend only `Array1`/`Array2`, never `Vector`/`Matrix`, so vector and matrix operators do not apply to a slice.
- **Where:** library; `__SimpleSubArray1` (`Library/FortressLibrary.fss:2506`), `SubArray2` (`:2811`), `Col`, `Row` (`:2833`, `:2844`).
- **Reproduce:** no test; the probe `explorations/matrix-ad-probes/p03.fss` (run at the parent of `e879b6a44`) prints `row is NOT an AnyVector`.
- **Status:** confirmed, classed as a design limit: leave it unless work needs it; use `.copy()` or a user view object extending `Vector` (row 55).
- **Could not resolve:** "in the parent of `e879b6a44`" I read as "check out `e879b6a44^` to run the probe", which the skill does not spell out. "design limit" vs the specification it cites: the row does not say whether the specification lines promise views to be vectors, so whether this is a gap or accepted is unclear.

## Row 56

- **Defect:** reading a matrix with a pair of ranges (`m[r0,r1]`) or a mixed index and range (`m[i,r]`, `m[r,j]`) fails dispatch ("Failed to find any matching overload") because those subscript methods ship commented out in `Array2`. `m[:, j]` and `m[i, :]` work.
- **Where:** library, `Array2` at `Library/FortressLibrary.fss:2653`; dead blocks `:2701-2717`, `:2720-2722`, `:2724-2726`; live forms `:2719`, `:2723`.
- **Reproduce:** no test; probe `explorations/matrix-ad-probes/p03.fss` at the parent of `e879b6a44`, or write `m[1, 0#2]` on a matrix.
- **Status:** confirmed, open implementation gap: a fix (restore or rewrite the blocks) is open to build, with a test written first; meanwhile a user subscript operator (row 110).
- **Could not resolve:** "full text: history, row 56" I read as "the earlier text is in `explorations/fortress-gap-ledger-history.md`", per `records.md`. The row does not say why the blocks were commented out (they may not compile or check), which a fixer would need.

## Row 169

- **Defect:** indexed assignment on a rank-2 array accepts only two scalar indices; assigning a vector into a row with `out[i, 0#cols] := y` fails dispatch. No `_[_]:=` method takes an index and a range.
- **Where:** library, the `_[_]:=` methods at `Library/FortressLibrary.fss:2127`, `:2226`, `:2228`, `:2689`; restoring row 56's blocks would not help since they are reads.
- **Reproduce:** no test; probe `explorations/run-c3/probes/lift_c3.fss` at the parent of `a0a0c7c99`, or `out[i, 0#cols] := y` with `y` a `Vector[\RR64,3\]`.
- **Status:** confirmed, open: a fix is open to build; meanwhile `Row(out, i).assign(y)` (row 170).
- **Could not resolve:** the Specification cell cites `Specification/basic/expressions/ranges.tex` where siblings 54 and 56 cite `Specification-1.0-frozen/...` by line; I cannot tell whether the difference matters or which tree a worker should read. "full text: history" as in row 56.

## Row 109

- **Defect:** `Matrix` has no elementwise (Hadamard) product; `Vector` has `pmul` but `m.pmul(n)` fails with "Cannot find definition for method pmul".
- **Where:** library, `Matrix` at `Library/FortressLibrary.fsi:1757-1770`; `Vector`'s `pmul` at `:1652`, top-level `pmul` at `:1683`.
- **Reproduce:** no test; probe `explorations/gap-ledger-probes/g23.fss` at the parent of `e879b6a44`, or call `pmul` on a `__DefaultMatrix`.
- **Status:** confirmed, open, specification silent: adding `pmul` to `Matrix` is a buildable library fix; meanwhile a user `ODOT` or `ivmap`.
- **Could not resolve:** "a user `ODOT` (⊙) on the carrier": "carrier" is not in the skill; I read it as the user's own type that wraps or extends `Matrix`, but it could mean the matrix class itself. "APL's elementwise ..." sentence: the cost argument refers to an exploration (`explorations/apl/rung-3`) a worker does not know; its point (three declarations per operator) is readable but its relevance to the fix is unclear.

## Row 292

- **Defect:** rank-3 arrays have no algebraic trait: `t + t` on two rank-3 arrays fails dispatch with no rank-3 candidate, and they are neither `AnyVector` nor `AnyMatrix`. `Array3` extends only indexing and rank traits and explicitly excludes `AnyAdditiveGroup`.
- **Where:** library, `Array3` at `Library/FortressLibrary.fsi:1824-1834` (its comment gives the reason for the exclusion).
- **Reproduce:** no test; probes `explorations/run-c4/probes/vocabulary/v01b_rank3plus.fss` and `v01a_libfree.fss` at the parent of `11bf69c39`, or add two runtime-built rank-3 arrays.
- **Status:** confirmed, open library gap against the specification: buildable in principle, but the exclusion is a deliberate trade in the library, so a worker should weigh that comment before changing it; meanwhile declare user elementwise operators.
- **Could not resolve:** "The specification makes a two-dimensional `Number` array a matrix" does not say what the specification says of rank 3, so the gap against the specification at rank 3 is unstated. "so C4's operator family is generic in the index type (rows 161, 295)": "C4" is a run name unknown to a worker; the clause reads as history, not as a fact a worker uses.

## Row 293

- **Defect:** no elementwise `×` applies to `Vector` or `Matrix`, by design: both exclude `AnyMultiplicativeRing` because their juxtaposition means the inner product. A user type extending both `Matrix` and `MultiplicativeRing` is accepted by walk (its `×` works, juxtaposition is elementwise) but its inherited `+` crashes walk with "bug! MethodClosure + ... has neither body nor def", and the checker refuses the type.
- **Where:** library exclusions at `Library/FortressLibrary.fsi:1647`, `:1759`; the crash is in walk; the refusal is in the checker.
- **Reproduce:** no test; probes `v01c_matrix_times.fss`, `v02_ring_excluded.fss`, `v02b_ring_juxt.fss` under `explorations/run-c4/probes/vocabulary/`, at the parent of `11bf69c39`.
- **Status:** confirmed, design limit: leave the exclusion; use a top-level `×` (row 161). The walk crash in row 371 is a separate defect.
- **Could not resolve:** "carrier" again (as in row 109). "(two `AdditiveGroup` instantiations)" is terse: I read it as the cause of the crash (the type inherits `AdditiveGroup` twice at different arguments), but it could be read as a count of failures. The Specification cell cites "Trait Declarations", for exclusion in general; whether the specification promises elementwise `×` is not said.

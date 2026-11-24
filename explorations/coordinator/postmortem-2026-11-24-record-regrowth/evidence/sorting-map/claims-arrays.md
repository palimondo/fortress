<!-- The claims of each FACTS entry of the chunk arrays (sections "The library's arrays and algebra" and "The territory map", 23 entries), each with its subject, its kind, the entries that overlap it and what today's checks say of it, as the first step of the sorting map of 2026-11-24; written by a worker that rewrote no entry and judged nothing new. -->

# Claims of chunk arrays, by subject and by kind

Sources: the entries as `facts-extract.sh` printed them on 2026-11-24; `evidence/consolidation/scout-arrays.md` ("scout"); `evidence/stale-claims.md` ("stale"), which quotes `pilot/pilot.md` for F-155. Overlaps were searched over all 339 entries of FACTS by a script that matches a term in each entry's line; the term is given in brackets. "Checks" quotes only those two files; where they say nothing of a claim, the claim is marked "no finding".

Each claim reads: number, [kind], {subject}, sentence.

## F-151, "In the interpreter's library, `Vector`, `Matrix` and their factories and operators bound their element type ..."

- Claims:
  1. [property] {the library: array element bound} `Vector`, `Matrix`, their factories and operators bound their element by `T extends { Number, MultiplicativeRing[\T\] }`.
  2. [property] {the checker: array family bound} `Number` declares no arithmetic, so the checker accepts the bodies' arithmetic only through `MultiplicativeRing[\T\]`.
  3. [property] {the library: array element bound} `Number` stays in the bound though it has no `comprises` clause now (F-324).
  4. [property] {the library: juxtaposition overloads} The four juxtapositions of a vector or matrix with a scalar stand beside those with a `String`, and the checker finds no error in them (F-53).
  5. [plan] {the library: juxtaposition overloads} No run measures what now keeps a scalar `T` apart from `String`.
  6. [property] {the library: array algebra} The vector norm is declared at each of the eight number types, by its own `asFloat` (F-324).
  7. [property] {the library: array element bound} The eight number types meet the bound; `Number` and the numeral types do not, so `Vector[\Number,n\]` is not well-formed.
  8. [property] {the library: array factories} `array1` and `array2` have no branch for `Number` and give a plain array there (F-229).
  9. [property] {the checker: array family bound} The checker accepts a call whose argument's type is built from the caller's own type parameter under the same bound, such as `squaredNorm(me)` (F-227).
  10. [pointer] The scalar extension has bounds of its own (F-119).
  11. [tests] {the library: array element bound} `tests/ArrayElementAlgebra.fss`, under walk.
  12. [history] {the library: array element bound} The bound is the default that `reviews/array-fork2-judgement.md` recommended.
  13. [pointer] Detail in that judgement, sections 2.5, 2.9, way 3 and 4.
- Overlaps:
  - 1, 7: F-90 ("declare the array family's bound ... which F-151 owns"), F-94 (title: "checks the array family under the bound"), F-229 ("`Vector[\Number,n\]` is not well-formed under the element bound") [MultiplicativeRing[\T\] }, Vector[\Number].
  - 2, 9: F-94 ("the library's `squaredNorm(me)` among them"), F-227 [squaredNorm].
  - 3, 6: F-324 ("The one library's `Number` declares nothing ... the vector norm is declared at each of the eight types") [norm, F-324].
  - 4: F-53 (cited); none found for the juxtaposition pair.
  - 8: F-229 (title) [array1].
- Checks: test found; cited entries not checked (scout 4). No stale finding.
- Shape: several subjects: the library: array element bound; the checker: array family bound; the library: array factories; the library: array algebra; the library: juxtaposition overloads.
- Title: states the bound; the body serves it, with the norm (6) owned by F-324 and the factories (8) by F-229.

## F-152, "`Vector` and `Matrix` are the only array traits with an algebra, `AdditiveGroup` ..."

- Claims:
  1. [property] {the library: array algebra} `Vector` and `Matrix` are the only array traits with an algebra, `AdditiveGroup`, and their element must be a `Number`.
  2. [property] {the library: array algebra} They inherit `+`, `-`, unary `-` and `zero`, and nothing from another algebraic trait.
  3. [defect] {the library: array algebra} `Array3` has no algebra (row 292).
  4. [property] {the library: array algebra} `×` reaches no array, by design: juxtaposition is the inner product (rows 109, 293).
  5. [defect] {walk: excludes check} Walk accepts unchecked a carrier that extends both `Matrix` and `MultiplicativeRing`, and its `+` then fails (row 371).
  6. [defect] {the library: array algebra} The specification's `T^n` denotes these traits (row 24), and neither path takes it.
  7. [pointer] Detail in `reviews/array-design-ways.md`, section 2.
- Overlaps:
  - 1, 2: F-119 (scalar extension bounded by `AdditiveGroup`), F-277 (`AdditiveGroup`'s `+` and `-` against the scalar block) [AdditiveGroup]; F-151 claim 1.
  - 3: none found [Array3: F-158, F-233, F-279 name `Array3` for other questions].
  - 4: none found [row 109, row 293].
  - 5: none found [row 371].
  - 6: none found [T^n, row 24].
- Checks: rows 24, 109, 292, 293, 371 NEGATIVE-VERIFIED, agree (scout 4). No stale finding.
- Shape: one subject (the library: array algebra), mostly defects by row.
- Title: states the algebra's reach; the body serves it, with a walk defect (5) on another question.

## F-154, "The library declares its matrix and vector products with shared `nat`s, so under walk a product of the wrong shapes stops the run at dispatch."

- Claims:
  1. [property] {the library: array products and shapes} The library declares its matrix and vector products with shared `nat` size parameters, as `m` in `DOT` and in the juxtaposition of two matrices.
  2. [property] {walk: shape mismatch} Under walk a product of the wrong shapes stops at dispatch, "Failed to find any matching overload", a `ProgramError` that no `catch` takes.
  3. [property] {walk: shape mismatch} A declaration that is not overloaded fails instead with a unification error that names the size; no library product is such.
  4. [history] {walk: shape mismatch} Observed for a mismatched `DOT` (row 254) and in a probe of the model's sized declarations, where a `try` caught nothing.
  5. [pointer] Detail in `apl/mg/NOTES-swap.md`.
- Overlaps:
  - 2: F-20 ("product ... whose inner sizes differ, is a `ProgramError`, 'Failed to find any matching overload', that no `catch` takes (row 254)") [row 254, Failed to find any matching overload].
  - 1, 3: none found [shared `nat`].
- Checks: row 254 NEGATIVE-VERIFIED, agrees; the heading has an added ": the mismatch probe" not matched (scout 1, 4). No stale finding.
- Shape: several subjects: the library: array products and shapes; walk: shape mismatch.
- Title: states the declaration and its consequence; the body serves it.

## F-155, "Under walk, two plain declarations of one name that differ only in the element type are refused at load ..."

- Claims:
  1. [defect] {walk: overload check at load} Walk refuses at load two plain declarations of one name that differ only in an instance's static argument, "are unrelated" (row 416).
  2. [property] {walk: overload check at load} Two generic ones, `h[\I\]` over `Array[\RR64,I\]` beside `h[\J\]` over `Array[\ZZ32,J\]`, load and run (F-252).
  3. [property] {walk: overload check at load} A rank-specialised declaration beside an index-generic one, `k` over `Array` beside `k` over `Vector`, loads and dispatches.
  4. [history] {walk: overload check at load} The probe's rank-specialised `×` passes its own pair, then is refused beside the library's `MultiplicativeRing.×` (row 341).
  5. [defect] {walk: overload check at load} Walk checks as one family the overloads of one name that two imported apis declare, and an import alias does not separate them, so two such vocabularies cannot stand in one component.
  6. [pointer] Detail in `apl/mg/NOTES-swap.md` items 5 and 6; `rung-walk-generic-pairs/REPORT.md` section 5.
- Overlaps:
  - 1: F-252 ("so two plain declarations so typed are refused (row 416)"), F-44, F-91 [row 416].
  - 2, 3: F-252 (title and "Two declarations with static parameters of their own so typed load"), F-27, F-257 [F-252].
  - 4: F-269 ("It refuses the `Matrix`-specialised elementwise `×` of `apl/mg/elemwise_nat_probe.fss` (F-155)") [row 341, elemwise_nat_probe].
  - 5: none found [two imported apis, import alias, vocabularies].
- Checks:
  - 2: beyond its support: no test writes the `h` pair; one walk run observed it; F-155 and F-252 cite each other; the cited section 5 shows the pair refused (stale, F-155, from pilot/pilot.md, F-252, finding 1).
  - 4: row 341 is FIXED and the entry does not say so: a ledger row's status disagrees (stale, F-155, from scout).
  - 1: row 416 NEGATIVE-VERIFIED, agrees (scout 4).
- Shape: one subject (walk: overload check at load).
- Title: states three load verdicts; the body serves it, with the two-api family rule (5) on another question.

## F-156, "The interpreter's library declares no reshape, plane, gather, outer product or ravel over its arrays."

- Claims:
  1. [defect] {the library: array vocabulary} The library declares no reshape, plane, gather, outer product or ravel over its arrays.
  2. [property] {the model program: C4 vocabulary} So Run C4's vocabulary, `FlatArrays.fsi`, declares `view`, `heads`, `plane`, `gather`, `onehot` and `flat` itself.
  3. [plan] {the library: array vocabulary} Such an operation belongs in the library (the skill's `library.md`).
  4. [detail] {the library: array vocabulary} Read by a search of `Library/*.fsi`.
  5. [pointer] Detail in `run-c4/probes/vocabulary/REPORT.md`, question 5 and section A.
- Overlaps:
  - 1: none found [reshape, ravel]; F-58 names C4's `gather` and `view` sites [gather].
  - 2: F-58 (`FlatArrays` 31 distance sites), F-61 ("No minimal `Array` ... can serve C4's `FlatArrays`"), F-362 [FlatArrays].
- Checks: "question 5" is not a heading of the cited report (it is item (5) under "The five questions"): cites a thing that is gone or moved (stale, F-156). The grep of the apis agrees with claim 1 (scout 4).
- Shape: mostly a defect.
- Title: states the absence; the body serves it.

## F-157, "An array is a trait with `get` and `put`, and a view is an object that implements it over other storage ..."

- Claims:
  1. [property] {the library: array views} An array is a trait with `get` and `put`, and a view is an object that implements it over other storage, as `TransposedMatrix` is.
  2. [property] {walk: array views} Under walk a subtype of `Matrix` that overrides `mul` gets its own product through the library's juxtaposition and `DOT`, with no api line.
  3. [history] {walk: array views} The override was measured under walk only.
  4. [defect] {the library: array views} At `b176a4b79`, the row slice `m[i,:]` took five times as long as a six-line user view (row 298).
  5. [defect] {the library: array views} The library's product with a plain `Matrix` diagonal view took 13 times a row-scaling operator at n = 16, and 58 to 63 times at n = 64 (row 299, which says 54).
  6. [pointer] Detail in `reviews/c4-flatarrays-review.md` and `run-c4/probes/vocabulary/diag-override.md`.
- Overlaps:
  - 1: F-90 (names `TransposedMatrix` in the family) [TransposedMatrix]; none for the idiom.
  - 2: F-90 (`Matrix`'s `mul`) [mul`]; none for the override.
  - 4, 5: none found [row 298, row 299].
- Checks: commit and rows found; rows 298, 299 POSITIVE-VERIFIED; the entry notes row 299's 54 (scout 4). No stale finding.
- Shape: several subjects: the library: array views; walk: array views.
- Title: states the idiom; the timings (4-5) answer what views cost, another question.

## F-158, "`fill` takes a value and `tabulate` a function, both defined where the array diamond meets."

- Claims:
  1. [property] {the library: fill and tabulate} `fill` takes a value and `tabulate` a function.
  2. [property] {the library: fill and tabulate} `StandardMutableArrayType` and `ImmutableArray1`, the meet of the array diamond, define them.
  3. [pointer] It builds P-89.
  4. [property] {the library: fill and tabulate} `Vector` and `Matrix` redeclare them at their own type, with the meet's bodies (F-264).
  5. [property] {the checker: Meet Rule} A method declared only in each leaf leaves the meet refused by the Meet Rule, so `copy` is declared on the meet too (row 467).
  6. [detail] {the library: fill and tabulate} The factories are `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`.
  7. [tests] {the library: fill and tabulate} `tests/TabulateRungA.fss`.
  8. [pointer] Detail in `rung-tabulate/REPORT.md`, section 2.
- Overlaps:
  - 1: F-49 ("The one library has no such pair: `fill` takes a value and `tabulate` a function (F-158)") [tabulate]; the skill's `library.md:27`.
  - 4: F-264 ("`Vector` and `Matrix` redeclare those two at their own type (F-158)").
  - 5: F-81, F-82 (Meet Rule pairs in the library each with a meet declaration), F-80, F-142 [Meet Rule]; none for row 467.
- Checks: test found; row 467 FIXED, consistent (scout 4). No stale finding.
- Shape: one subject (the library: fill and tabulate), with one checker claim (5).
- Title: states the two methods and where they are defined; the body serves it.

## F-159, "In probes of 2026-09-29, a generic factory with a written static argument selected a store written for `RR64` alone ..."

- Claims:
  1. [history] {the library: array factories} In probes of 2026-09-29, a generic factory selected an `RR64`-only store through a witness `typecase` whose branch result was cast, on both paths.
  2. [property] {the library: witness typecase} A witness is `__thrower[\X\]`, a `() -> X` never called, on which a `typecase` chooses a branch by `X`.
  3. [detail] {the library: array factories} The probes declared their own `Arr[\T\]`, `DStore` and `BStore`, and used the prelude for compiled runs.
  4. [history] {the checker: witness typecase} The compiled checker refused the uncast body, typed `OR(DStore,BStore[\T\])`, and accepted it with the branch result through `cast[\Arr[\T\]\]`.
  5. [history] {the library: array factories} Both paths then gave `DStore` at `RR64` and `BStore` at `ZZ32`.
  6. [history] {the checker: generic beside plain} A plain `RR64` factory beside the generic one was accepted by the checker and dispatched to the plain one; walk refused that pair at load.
  7. [plan] {walk: overload check at load} Walk's present load check (F-27) has not been run on that pair.
  8. [pointer] `array1` and `array2` take a witness of the result type for F-229's reason.
  9. [plan] {the library: array stores} It bears on array decision A, how a number array gets its unboxed store, which is open (P-85).
  10. [history] {the library: array factories} No gated test holds it, and the probes are in the history before `84aef6a4f`.
  11. [pointer] Detail in `reviews/array-design-ways.md`, sections 0 and 3.
- Overlaps:
  - 2: F-57 ("the witness `typecase` is a `typecase` over ..."), F-59 ("a witness `typecase`, a `typecase` over a `() -> T` function"), F-229 [witness].
  - 4: F-85, F-250 (`additiveIdentity`'s `cast`) [cast[\].
  - 9: F-18 ("way A4 of array decision A (P-85)"), F-333 (`PrimImmutableRR64Array` with no factory, P-84, P-85), F-270 [P-85]; F-317 [unboxed].
- Checks: commit `84aef6a4f` found; cited entries not checked (scout 4). The curator's word of 2026-11-08 widened P-84 and P-85 (scout 6). No stale finding.
- Shape: mostly history or plan.
- Title: states a dated probe; the body serves it.

## F-229, "`array1` and `array2` give a vector and a matrix only at the eight number types ..."

- Claims:
  1. [property] {the library: array factories} `array1` and `array2` give a vector or a matrix only at the eight number types, chosen by a `typecase` over a witness of their result type, and a plain array otherwise.
  2. [property] {the library: array factories} Each branch builds the array at its type and returns it through `cast`, in `additiveIdentity`'s shape.
  3. [property] {the library: array factories} `Array1` and `Array2` are invariant, so a branch matches only its own number type exactly.
  4. [property] {the library: array element bound} `Number` and `AnyIntegral` get a plain array, since `Vector[\Number,n\]` is not well-formed (F-151).
  5. [defect] {the specification: array expressions} The specification's "Array Expressions" makes an array of `Number` elements a vector (row 729, contested).
  6. [property] {walk: generic instantiation} Under walk a type parameter inferred from a `ZZ32`, `ZZ64` or `RR64` value is that type, so it gets a vector.
  7. [history] {the library: array factories} The witness is of the result type because a witness of the element type failed while walk's `ZZ32` values were of a native object `Int`, now gone (row 722).
  8. [tests] {the library: array factories} `ArrayInferredElementVectorWalk`, `ArrayFactoryNumberTypes`, `ArrayFactoryAbstractNumber`.
  9. [property] {the checker: distance stage} The distance stage measures the checker's acceptance; it reports and does not turn the gate red.
  10. [pointer] Detail in `rung-library-factories/REPORT.md`.
- Overlaps:
  - 1, 2: F-151 ("`array1` and `array2` have no branch for `Number`"), F-159 ("take a witness of their result type"), F-57, F-59 [array1, witness]; the skill's `revival-changes.md:99`.
  - 4: F-151 claim 7 [Vector[\Number].
  - 5: none found [row 729].
  - 6: F-74, F-344 (walk infers at the value object).
  - 7: F-361, F-379 (`Int` removed) [Int`]; none for row 722.
- Checks: tests found; row 729 CONTESTED, agrees with "contested"; row 722 FIXED, consistent (scout 4). No stale finding.
- Shape: one subject (the library: array factories), with the bound (4) and a walk claim (6).
- Title: states the factories' rule; the body serves it.

## F-264, "In the interpreter's library, nine `Vector` and `Matrix` operators and three branches of the array factories get their declared type through the function `cast` ..."

- Claims:
  1. [property] {the library: array casts} Nine `Vector` and `Matrix` operators, three factory branches and the `Array2` column and row subscripts get their declared type through `cast`.
  2. [property] {the library: casts} `cast[\T\](x)` returns `x` if it has type `T`, and raises `CastError` if not.
  3. [detail] {the library: array casts} The nine operators, the three factory branches and the two subscripts, by name.
  4. [property] {the library: array casts} Each operator builds its result with the inherited `map` or `ivmap`, typed `Array1` or `Array2`, through `replica`.
  5. [property] {the library: array casts} Each subscript builds its sub-array with a range subscript, which answers an unsized `Array`.
  6. [property] {the library: fill and tabulate} Five bodies build with `fill` or `tabulate` and need no cast (F-158).
  7. [property] {the checker: distance stage} So the compiled checker accepts all these bodies.
  8. [property] {walk: array casts} Under walk each cast holds at the eight number types.
  9. [property] {the library: array casts} A `Vector` or `Matrix` whose `replica` answers another kind raises `CastError` at the nine operators.
  10. [history] {the library: array casts} When the casts landed, no walk value moved in 42 test files and four demos, and the suite and microGPT's quick pair passed.
  11. [tests] {walk: array casts} `tests/VectorMatrixCastsWalk.fss`.
  12. [pointer] Detail in `rung-array-sites/REPORT.md` and `SKEPTIC.md`.
- Overlaps:
  - 1, 4: F-90 (factory "cast to that type, F-264"; `replica` in a test) [replica, cast[\].
  - 2: F-134 ("the compiled `cast[\T\]` matches a value of type `T`"), F-143, F-259 [CastError].
  - 6: F-158 claim 4.
  - 9: none found.
- Checks: test and `FortressLibrary.fss:33` found (scout 4). No stale finding.
- Shape: one subject (the library: array casts).
- Title: states the casts; the body serves it, with landing history (10).

## F-279, "Under walk an `Array2` or `Array3` based above zero slices like a 0-based one, except a shifted `Array2`."

- Claims:
  1. [property] {walk: array slices} `Array2.subarray` and `Array3.subarray` hand their 0-based views the offset less the base, and `Array3`'s `[:]` passes its base, as `Array1`'s do.
  2. [detail] {walk: array slices} `FortressLibrary.fss:2999`, `:3401`, `:3380`, `:2711`, `:3083`.
  3. [defect] {walk: array slices} `SubArray2`'s `subarray` subtracts the output base, so a slice of a shifted `Array2` reads the wrong elements (row 808).
  4. [defect] {walk: array slices} A shift of a slice, column, row or shifted `Array2` ends in `ArrayIndexOutOfBoundsException` (row 808).
  5. [tests] {walk: array slices} `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`.
  6. [pointer] Detail in `rung-slices-list-equality/REPORT.md`.
- Overlaps:
  - 1: F-35, F-68 (`subarray`'s size parameters, another subject) [subarray].
  - 3, 4: none found [row 808, SubArray2].
- Checks: all line cites hold; tests found; row 808 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: one subject (walk: array slices).
- Title: states the rule and its exception; the body serves it.

## F-284, "Under walk, `Generator22D`'s `rects` gives every contiguous rectangle of an `Array2` once."

- Claims:
  1. [property] {the library: generators} Under walk, `Generator22D`'s `rects` gives every contiguous rectangle of an `Array2` once.
  2. [property] {the library: generators} `rectsImpl` counts with `DIV`, since `/` on integers answers a rational.
  3. [detail] {the library: generators} `Generator22D.fss:144`, `:145`, `:150`; `opr-overview.tex:125-128`.
  4. [property] {the compiled runtime: prelude} The compiled prelude has no `Generator22D`.
  5. [tests] {the library: generators} `tests/Generator22DRects.fss`.
  6. [pointer] Detail in `rung-team-demos/REPORT.md`, section 2.
- Overlaps:
  - 1, 2: none found [Generator22D]; `/` answering a rational is restated nowhere searched [DIV hits F-24, F-124, F-132, F-306, F-308, F-316, F-339 on other questions].
- Checks: all found (scout 4). No stale finding.
- Shape: one subject (the library: generators).
- Title: states the behaviour; the body serves it.

## F-317, "The comment on the library's scalar-extension block is the revival's, not the team's ..."

- Claims:
  1. [property] {the repository: authorship} The comment on the scalar-extension block in `FortressLibrary.fsi` is the revival's, written in September 2026 (`c2b4e2c95`, `581356f32`).
  2. [property] {the library: scalar extension} The comment says a static checker loses a sized argument's rank and size in the block's result.
  3. [property] {the repository: authorship} The team's statement on per-type storage is Maessen's commit `353818213` of 2008-07-28, "Immutable arrays of unboxed RR64".
  4. [plan] {the repository: authorship} So a claim of the team's intent on per-type array storage cites that commit.
  5. [detail] {the repository: authorship} Read by `git blame` and `git show`.
  6. [pointer] Detail in `reviews/array-design-ways.md`, section 9.
- Overlaps:
  - 1, 3: F-359 cites another Maessen commit, `76c267f987`, on the number traits [Maessen]; none for `353818213`.
  - 2: F-119 (the block) [scalar extension].
- Checks: commits found; the comment is at `FortressLibrary.fsi:2854-2865` (scout 4). No stale finding.
- Shape: about how the project works and not about the tree (provenance of a comment), one subject (the repository: authorship).
- Title: states the provenance and the rule for citing; the body serves it.

## F-361, "With the five number traits merged with their objects in a scratch tree ..."

- Claims:
  1. [history] {the library: number types as objects} In a scratch tree on `832f7d0d91`, the merge of five number traits with their objects kept the checker count and distance at 0 and microGPT's quick checks passing.
  2. [detail] {the library: number types as objects} The merge touched 12 files, the library and 78 lines of walk's Java, no checker or code generator file and no model line.
  3. [history] {walk: overload check at load} Of 830 `testSystem` tests 829 passed, and `XXXGenericBesidePlainReturnParam` passed for a wrong reason (rows 550, 998).
  4. [history] {walk: overload check at load} Two other gaps were widened: rows 997 and 542.
  5. [history] {walk: typecase} On that code a `typecase` arm naming a removed object matched every value (row 959).
  6. [property] {the library: number types as objects} On `main` the five are value objects (F-379), rows 998, 997, 542, 550 and 959 are fixed, and an arm at a removed name is refused (F-382).
  7. [history] {the library: number types as objects} Measured once; no test holds it; the compiled tests and `testFast` were not run.
  8. [pointer] Detail in `plan-31/probes/number-object-merge.md`.
- Overlaps:
  - 1, 6: F-379 (the landed state), F-75 and F-375 ("With the five number types merged with their objects (P-178, F-379)") [merge, five number].
  - 3, 4: F-375 (rows 998, 997, 550), F-75 (row 542) [row 998 ...].
  - 5: F-379 ("'Int is undefined.' (row 959, fixed; F-382)"), F-382 [row 959].
- Checks: the test `XXXGenericBesidePlainReturnParam` is not found; it is now `tests/GenericBesidePlainReturnParam.fss`: cites a thing that is gone or moved (stale, F-361). Rows all FIXED, agree with "fixed since" (scout 4).
- Shape: mostly history or plan.
- Title: states a probe's result and that its gaps are fixed; the body serves it; the present state (6) is F-379's.

## F-368, "Under walk a top-level array literal with a declared type is built into the library array of that type ..."

- Claims:
  1. [property] {walk: array literals} Under walk a top-level array literal with a declared type is built into the library array of that type, in the variable's cell.
  2. [property] {walk: array literals} An immutable variable's literal is built when the cell is first forced, so a reader above, an importer and the type check see the array; a `var`'s is built by `forVarDecl4`.
  3. [detail] {walk: array literals} `LazilyEvaluatedCell.getValueNull`, `BuildEnvironments.forVarDecl4`, `LHSEvaluator.topLevelArray`, `libraryArray`.
  4. [property] {walk: array literals} So a model table can be a top-level literal with a declared type, as `shp: ZZ32[9] = [...]`.
  5. [defect] {the code generator: unsupported constructs} The code generator compiles no array literal, so such a line does not compile.
  6. [defect] {walk: array literals} The declared size is checked only at top level; a block binds a literal of another size (row 1022).
  7. [property] {walk: array literals} A field declaration of an object takes the same code.
  8. [defect] {walk: array literals} An untyped top-level literal stays a paste (row 49).
  9. [defect] {walk: array literals} A `var` bound in a block to a literal is immutable (row 1024), and a literal assigned to a variable is not built (row 1025).
  10. [tests] {walk: array literals} Four tests, `ObjectFieldArrayLiteral` to `TopLevelArrayLiteralElement`.
  11. [pointer] Detail in `rung-toplevel-array-literal/REPORT.md`.
- Overlaps:
  - 1, 2: F-398 ("An array literal inside a right side that is not a tuple expression") [array literal].
  - 5: F-181 (the skill's list of what the code generator has no case for); the skill's `compiler.md:42`.
  - 6, 8, 9: none in FACTS [row 1022, row 49), row 1024]; the skill's `interpreter.md:34-35` holds rows 1024 and 1025 (scout 5).
- Checks: tests and code found; rows 49, 1022, 1024, 1025 NEGATIVE-VERIFIED, agree (scout 4). No stale finding.
- Shape: one subject (walk: array literals), with four defects.
- Title: states the build; the body serves it.

## F-379, "The one library and walk declare `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` each as one value object ..."

- Claims:
  1. [property] {the library: number types as objects} The one library declares `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` each as one value object.
  2. [property] {walk: native number values} Walk builds their native values from the glue classes of the same names, found by a table.
  3. [detail] {the library: number types as objects} `FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`; `BuildEnvironments.java:459-470`.
  4. [property] {the library: number types as objects} No `Int`, `Long`, `Float`, `BigNum` or `UnsignedLong` is declared or used, and a `typecase` arm at one is refused on both paths (row 959, F-382).
  5. [property] {the library: number types as objects} So `asif` at one of the five is the identity.
  6. [property] {walk: overload check at load} `object Mine extends ZZ32` is refused at load, 'Attempt to extend object type ZZ32'.
  7. [property] {walk: overload check at load} Walk's load check reads pairs over the five as over objects, so a valid generic-beside-plain pair at `ZZ64` loads (row 550).
  8. [defect] {walk: overload check at load} Two kinds of invalid pair load too: a plain declaration with no written return type beside a generic one (row 1044), and two plain lists against the Subtype Rule (row 697).
  9. [property] {the library: number types as objects} With `NN32` and `RR32`, seven of the eight number types are objects, `QQ` the trait; the prelude declares the same seven (F-388).
  10. [pointer] It builds P-178's one-library half.
  11. [tests] {the library: number types as objects} `NumberTypesAreObjectsWalk`, `NumberTypeExtendRefusedWalk`.
  12. [pointer] Detail in `rung-number-objects/REPORT.md`.
- Overlaps:
  - 1, 9: F-388 (the prelude's seven value objects), F-396 (claim 5), F-74, F-344 [value object]; the skill's `revival-changes.md:89`.
  - 4: F-382 (title), F-361 claim 6 [F-382, Int`].
  - 5: F-325 (assumptions), none else [asif].
  - 7, 8: F-375 (rows 550, 1044, 697) [row 1044, row 697].
  - 6: none found [Attempt to extend].
- Checks: all lines, tests and table found; rows 959, 550 FIXED and 1044, 697 NEGATIVE-VERIFIED, agree (scout 4). No stale finding.
- Shape: several subjects: the library: number types as objects; walk: native number values; walk: overload check at load.
- Title: states the declaration and the refused extension; the load-check claims (7-8) serve another question, F-375's.

## F-179, "Tasks and transactions are implemented twice, in `interpreter/evaluator/` and in `runtimeSystem/`, independently."

- Claims:
  1. [property] {the repository: two runtimes} Tasks and transactions are implemented twice, in `interpreter/evaluator/` and `runtimeSystem/`, independently.
  2. [property] {the repository: two runtimes} A fix in one copy does not reach the other: row 302's fix is in the compiled copy only.
  3. [pointer] Detail in `coordinator/map/modules-and-phases.md`, "B.11".
- Overlaps:
  - 1: none in FACTS [runtimeSystem names it for other questions]; the skill's `SKILL.md:111` says it word for word (scout 5).
  - 2: none found [row 302].
- Checks: directories found; row 302 FIXED, consistent (scout 4). No stale finding.
- Shape: one subject (the repository: two runtimes).
- Title: states the fact; the body serves it.

## F-180, "`import java` is wired on walk through `ForeignComponentWrapper` and `ClosureMaker`, but four gaps stop it ..."

- Claims:
  1. [defect] {walk: import java} `import java` is wired on walk through `ForeignComponentWrapper` and `ClosureMaker`, but four gaps stop it and no test uses it.
  2. [history] {walk: import java} In a probe, six Java patches closed the five gaps of the tree then, and a component with two `import java` declarations printed on walk what the compiled path prints.
  3. [property] {the checker: walk-world type table} Gap 1 is closed: in walk's world `NamingCzar.fortressTypeForForeignJavaType` reads a Java type as the one library's (F-298).
  4. [defect] {walk: import java} So a component with one such import now stops at gap 3, 'Non-top-level reference to imported …' (row 845).
  5. [pointer] P-58 chose another way, a `builtinPrimitive` string naming a static helper; its compiled half is built (F-298), and so is walk's (F-299).
  6. [property] {the compiled runtime: helper raises} A helper raises a Fortress exception by naming a class of the compiled prelude, which walk has no class for.
  7. [property] {walk: helper raises} Walk's `builtinPrimitive` loader translates the raise (F-299), but through a written `import java` walk ends with a `FortressImplementationError` unless the probe's gap-5 patch is applied.
  8. [property] {walk: import java} By reading, a helper whose parameters or results are compiled-path classes, such as `FZZ32Vector`, cannot take walk's values.
  9. [detail] {walk: import java} The probe's closure converts only Java numbers, booleans, strings and `BigInteger`, and the helpers had 50 such parameters or results by one `javap` read.
  10. [pointer] Walk's loader refuses at load a binding whose declared type no Java type carries (F-299).
  11. [pointer] Detail in `perf-probes/prelude/natives-shape.md`, `natives-binding-probe.md`, `rung-natives-compiled/SKEPTIC.md`.
- Overlaps:
  - 1, 4: F-298 ("as walk reads a written `import java` (F-180; row 845)") [row 845]; the skill's `interpreter.md:141`.
  - 3: F-298, F-309 [import java].
  - 6: F-336 (the raise now names its exception by simple name through `LibraryNames`) [makeFortressException, LibraryNames]; this claim may be stale against F-336, not settled here.
  - 7: F-299 (cited).
  - 8: F-353 (`FZZ32Vector` links against the prelude by name) [FZZ32Vector].
- Checks: `gap5-helper-raise.patch` is not found, and `nativeHelpers/simpleIntLiteralArith.java` exists only as a build `.class`: cites a thing that is gone or moved (stale, F-180). Row 845 NEGATIVE-VERIFIED, agrees (scout 4).
- Shape: several subjects: walk: import java; the checker: walk-world type table; the compiled runtime: helper raises; walk: helper raises.
- Title: states the wiring and the gaps; the body serves it, but claims 6-7 on helper raises and 5 on P-58 answer other questions.

## F-181, "The code generator compiles a function, method, object or trait declaration that carries a `where` clause in its own header ..."

- Claims:
  1. [property] {the code generator: where clauses and contracts} The code generator compiles a declaration that carries a `where` clause in its own header, emitting nothing for the clause.
  2. [defect] {the code generator: where clauses and contracts} It refuses every function or method with a contract (row 701).
  3. [property] {the checker: where clauses} The clause's constraints are the checker's.
  4. [defect] {the checker: contracts} A trait's or object's contract is dropped by the disambiguator (row 781).
  5. [pointer] F-255 says how each path reads a `where` clause on an `extends` entry (row 774).
  6. [property] {walk: contracts} Walk checks a function's `requires` clause and raises `CallerViolation`.
  7. [pointer] The skill's `compiler.md` gives the refusals and the constructs with no case.
  8. [defect] {the code generator: unsupported constructs} An array comprehension has no case either.
  9. [property] {the code generator: local functions} A local function compiles as a closure, except in the forms F-320 names.
  10. [property] {the code generator: where clauses and contracts} A trait whose `comprises` lists a type at a `where`-clause size compiles.
  11. [defect] {the code generator: where clauses and contracts} A call that opens its value to the size fails verification (row 307).
  12. [property] {the code generator: where clauses and contracts} Where a listed generic type gives a member's body, the member compiles (row 812, fixed; F-384).
  13. [defect] {the code generator: where clauses and contracts} A function's own clause that introduces a `where`-clause variable compiles, and the call dies with `NoClassDefFoundError` (row 867).
  14. [tests] {the code generator: where clauses and contracts} Five `WhereBound*`/`ComprisesWhere*` tests and three `XXX` tests or pairs.
  15. [pointer] Detail in `rung-codegen-where/REPORT.md`.
- Overlaps:
  - 1, 3: F-250, F-256 (the checker reads `where` constraints), F-255, F-392 [where` clause].
  - 4: F-255 ("drops every trait's and object's `throws` clause and contract ... (row 781)") [contract].
  - 9: F-320 (cited).
  - 11: F-129, F-270, F-377 (row 307) [row 307].
  - 12: F-281 ("row 812, fixed; F-384") [row 812].
  - 2, 6, 8, 13: none found [row 701, CallerViolation, row 867].
- Checks: all tests found; rows 701, 781, 774, 307, 867 NEGATIVE-VERIFIED and 812 FIXED, agree (scout 4). No stale finding.
- Shape: several subjects: the code generator: where clauses and contracts; the checker: contracts; walk: contracts; the code generator: unsupported constructs; the code generator: local functions.
- Title: states the `where` compile and the contract refusal; the body serves it, with walk's contracts (6), comprehensions (8) and local functions (9) on other questions.

## F-182, "Both paths refuse a `type` alias, a `test` declaration of the form `test Id[gens] = Expr`, and a `property` declaration ..."

- Claims:
  1. [defect] {the checker: unbuilt declarations} Both paths refuse a `type` alias, a `test Id[gens] = Expr` declaration and a `property` declaration, in the index builder both run (`IndexBuilder.scala:187-189`).
  2. [defect] {the checker: unbuilt declarations} At top level each stops with `** bug! Not yet implemented:` and the kind (rows 18, 121, 122).
  3. [defect] {the checker: unbuilt declarations} Inside an object a `property` declaration stops with an uncaught `java.lang.Error`, and a `test` declaration does not parse.
  4. [history] {the checker: unbuilt declarations} The rows observe walk; compiled, the type alias was observed to stop alike, the other two by reading.
  5. [property] {the harness and the gate: test functions} A function with the `test` modifier runs under `fortress test` (row 120).
- Overlaps:
  - 1-3: none found [type` alias, property` declaration, IndexBuilder, row 121]; the skill's `SKILL.md:137` lists `property` declarations as not built.
  - 5: none found [fortress test].
- Checks: `IndexBuilder.scala:187-189` found; rows 18, 121, 122 NEGATIVE-VERIFIED and 120 POSITIVE-VERIFIED, agree; the entry cites no report section (scout 1, 4). No stale finding.
- Shape: mostly a defect.
- Title: states the refusals; the body serves it.

## F-183, "The compiled path's only array-like types are `ZZ32Vector` and `StringVector` ..."

- Claims:
  1. [property] {the compiled runtime: prelude vectors} The compiled path's only array-like types are `ZZ32Vector` and `StringVector`, hand-written Java classes declared only in its prelude and absent from the specification.
  2. [property] {the compiled runtime: prelude vectors} Each element access is boxed.
  3. [tests] {the compiled runtime: prelude vectors} No gated test makes or indexes a `ZZ32Vector` at run time; `DefaultRenderRungS` and `Compiled2` use a `StringVector`.
  4. [defect] {the compiled runtime: prelude vectors} Passed to a generic object's constructor, either type fails at load: its descriptor class is `RTTIv` where stamped code asks for `RTTIc` (row 408 for `ZZ32Vector`).
  5. [defect] {the compiled runtime: native helpers} A native helper cannot take a Java array, since the wrapper generator skips such methods.
  6. [pointer] Detail in `compiler-probes/vectors/vectors.md`.
- Overlaps:
  - 1: F-353, F-180, F-321 (`FZZ32Vector`, `FStringVector`) [ZZ32Vector, StringVector]; the skill's `compiler.md:86`.
  - 4: F-129 ("a `ZZ32Vector` passed to a generic constructor fails at load (row 408)") [row 408].
  - 5: F-106 (the wrapper generator skips constructors and others) [import java].
- Checks: declarations and tests found; row 408 NEGATIVE-VERIFIED, agrees (scout 4). No stale finding.
- Shape: one subject (the compiled runtime: prelude vectors), with a helper claim (5).
- Title: states the only array-like types; the body serves it. Under the one library (F-396) the claim that these are the compiled path's only array-like types holds only for the prelude; that scope is not stated, and no check marked it.

## F-184, "A generic object referenced without its static arguments is a static error on the compiled path ..."

- Claims:
  1. [defect] {the checker: bare generic references} A generic object referenced without its static arguments is a static error compiled, and the checker never consults the expected type for it.
  2. [detail] {the checker: bare generic references} `b: Box[\ZZ32\] = Box` fails as an ill-formed type, and a bare `Empty` as an argument or a field's default as `T is not in the kind env`.
  3. [defect] {walk: bare generic references} Walk fails on both.
  4. [property] {the checker: bare generic references} Writing the static argument avoids both.
  5. [property] {the library: Maybe} So a bare `Nothing` compiles only against the prelude's own `Nothing` (row 331, P-90).
  6. [pointer] Detail in `compiler-probes/maybe-inference/inference.md`.
- Overlaps:
  - 1-3: none found [Box[\ZZ32\] = Box]; F-21 is the Working Draft's bare `Nothing`, another question.
  - 5: F-47, F-167 ("`Nothing[\String\]` on the compiled prelude (row 331)") [row 331].
- Checks: row 331 NEGATIVE-VERIFIED, agrees; the report cites no heading (scout 1, 4). No stale finding.
- Shape: mostly a defect.
- Title: states the refusal; the body serves it.

## F-185, "The suites run two corpora ported by hand, and no test compares the two paths on one program."

- Claims:
  1. [property] {the harness and the gate: test corpora} The suites run two corpora ported by hand, and no test compares the two paths on one program.
  2. [detail] {the harness and the gate: test corpora} `tests/` shares no file name with `compiler_tests/`, and its 11 names shared with `other_compiler_tests/` are other programs.
  3. [property] {the harness and the gate: test corpora} `fortress.unittests.noopt=true` turns off the bytecode optimizer's tests.
  4. [defect] {the harness and the gate: test corpora} `TransactionJUTest`'s multi-threaded half is commented out.
  5. [detail] {the harness and the gate: test corpora} By the map's one count, 121 `.fss` files run in no test, and some directories are orphaned.
  6. [pointer] Detail in `coordinator/map/test-coverage.md`.
- Overlaps:
  - 1, 3, 4: none found [compares the two paths, noopt, TransactionJUTest]; F-39, F-265, F-293, F-112 name `other_compiler_tests/` for other questions.
- Checks: `TransactionJUTest.java` has no comment; the commented-out half is in `TestTask.java:43-44`: cites a thing that is gone or moved (stale, F-185, claim 4). The 11 shared names agree; the 121 not recounted (scout 4).
- Shape: one subject (the harness and the gate: test corpora).
- Title: states the corpora and the missing cross-path test; the body serves it.

## Subject labels used

- the checker: array family bound: F-151
- the checker: bare generic references: F-184
- the checker: contracts: F-181
- the checker: distance stage: F-229, F-264
- the checker: generic beside plain: F-159
- the checker: Meet Rule: F-158
- the checker: unbuilt declarations: F-182
- the checker: walk-world type table: F-180
- the checker: where clauses: F-181
- the checker: witness typecase: F-159
- the code generator: local functions: F-181
- the code generator: unsupported constructs: F-181, F-368
- the code generator: where clauses and contracts: F-181
- the compiled runtime: helper raises: F-180
- the compiled runtime: native helpers: F-183
- the compiled runtime: prelude: F-284
- the compiled runtime: prelude vectors: F-183
- walk: array casts: F-264
- walk: array literals: F-368
- walk: array slices: F-279
- walk: array views: F-157
- walk: bare generic references: F-184
- walk: contracts: F-181
- walk: excludes check: F-152
- walk: generic instantiation: F-229
- walk: helper raises: F-180
- walk: import java: F-180
- walk: native number values: F-379
- walk: overload check at load: F-155, F-159, F-361, F-379
- walk: shape mismatch: F-154
- walk: typecase: F-361
- the library: array algebra: F-151, F-152
- the library: array casts: F-264
- the library: array element bound: F-151, F-229
- the library: array factories: F-151, F-159, F-229
- the library: array products and shapes: F-154
- the library: array stores: F-159
- the library: array views: F-157
- the library: array vocabulary: F-156
- the library: casts: F-264
- the library: fill and tabulate: F-158, F-264
- the library: generators: F-284
- the library: juxtaposition overloads: F-151
- the library: Maybe: F-184
- the library: number types as objects: F-361, F-379
- the library: scalar extension: F-317
- the library: witness typecase: F-159
- the specification: array expressions: F-229
- the harness and the gate: test corpora: F-185
- the harness and the gate: test functions: F-182
- the repository: authorship: F-317
- the repository: two runtimes: F-179
- the model program: C4 vocabulary: F-156 (an area beyond the brief's list, for C4's own api)

## Entries that overlap

- The array element bound and the factories' `Number` case: F-151 (claims 1, 7, 8) and F-229 (1, 4), with F-90 and F-94 outside.
- Witness `typecase` and factories: F-159 (2), F-229 (1-2), with F-57 and F-59 outside.
- `fill` and `tabulate` at `Vector` and `Matrix`: F-158 (4) and F-264 (6), with F-49 outside.
- Number types as objects: F-361 (6) and F-379, with F-375, F-382, F-388, F-75 outside; F-361 is the probe and F-379 the landed state.
- Walk's overload check at load: F-155, F-379 (6-8), F-159 (6-7), with F-252, F-27, F-257, F-269, F-375 outside; F-155 and F-252 cite each other for the `h` pair.
- Shape mismatch at dispatch: F-154 (2) and F-20 outside (row 254).
- Helper raises and `import java`: F-180 (6-7) with F-299, F-336 outside.
- Prelude vectors: F-183 with F-129 (row 408), F-353, F-321 outside.
- `where` clauses: F-181 with F-250, F-255, F-256, F-281, F-320 outside.
- Array literals: F-368 (5) and F-181 (8) on constructs the code generator has no case for.
- Unboxed per-type storage and decision A: F-159 (9) and F-317 (3), with F-18, F-333, F-270 outside.
- Two runtimes: F-179 has no overlap in FACTS; the skill's `SKILL.md` states it.

## What the search could not settle

- F-152 claims 3-6, F-157 claims 4-5, F-182, F-184 claims 1-3, F-279 claims 3-4, F-368 claims 6-9, F-181 claims 2, 6, 8, 13: no other entry names these rows or terms; whether the ledger alone should hold them is the grouping worker's question.
- F-155 claim 5 (one family across two imported apis) found no other entry; F-151 claim 5 (no run measures what keeps a scalar `T` apart from `String`) is a plan that no other entry holds.
- F-180 claim 6 says a helper raises by naming a prelude class; F-336 now says the raise names its exception by simple name through `LibraryNames`. The two may disagree; no check marked it, so it is not settled here.
- F-183 claim 1 says the compiled path's only array-like types are the prelude's two; under the one library's selection (F-381, F-396) the one library's arrays compile. No check marked it; not settled here.
- F-185 claim 5 (121 files) was not recounted by the scout; F-159 claim 7 says walk's present load check has not been run on the pair, which no later entry settles.

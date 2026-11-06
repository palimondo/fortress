# Cold read, c-run4/c34

Read with `CLAUDE.md`, the `fortress-repo` skill's core and its `references/` (not `revival-changes.md`, not `sources.md`). One gap in the skill touches every row: the seven status words are listed in `references/records.md`, but their definitions are in the ledger's row template, which a cold reader may not open. I read `NEGATIVE-VERIFIED` as "a gap shown to exist and still open" and `CONTESTED` as "open on a question for the curator", from the names and from `close --settled`.

## Row 255

- **Defect:** In the APL library built on Fortress, comparing two scalars (as `{⍺<⍵}` does when it is applied element by element with `¨` or as an outer product with `∘.`) gives a host `Boolean`, not the APL 0/1 number. The function that builds the result array from its cells requires every cell to be a scalar, so it rejects the `Boolean`. Comparisons on arrays give 0/1. Only scalar against scalar fails, because `Number`'s `<` returns `Boolean` and the APL base declares no `(RR64, RR64)` comparison.
- **Where:** Walk (the only path named). The library is `explorations/apl/base/AplCore.fss`: `aplAsmV`'s `requires { aplAllScalar(rs) }` near `:1698`, with the workaround in `aplIsScalar`/`aplScalarOf` at `:1685-1688`. The program is `explorations/apl/rung-6/w02_lib.fss`.
- **Reproduce:** No reproducer. The failure no longer shows, because the workaround is in place. To see it, take out the `Boolean` case from `aplIsScalar`/`aplScalarOf` and run `w02_lib.fss` with `explorations/apl/base` on the source path: you get a `CallerViolation` from `aplAsmV`. With the workaround, `w02_lib.fss` (b) and `Rung6.fss` `Z13` pass (`rung-6/PROBES.md`).
- **Status:** Leave it. It is a design limit and the workaround already handles it. A worker writing APL code should know that a scalar comparison gives a `Boolean` that the base turns into 1.0/0.0.
- **Could not resolve:** "dfn" and the glyphs `¨`, `∘.`, `⍺`, `⍵` are APL terms, not Fortress ones. The skill does not explain them; I know them from APL in general. "assemble-by-cell" and "the scalar contract" are unclear wording: I read them as `aplAsmV` and its `requires` clause, but the row does not say so. "(b)" after `w02_lib.fss` is unclear: it may be a case or a part of that file. "siblings: 218" names a related row and does not say how it is related.

## Row 436

- **Defect:** Under walk, a `SUM` written with a static argument that is a user additive group, not a number type, ends in `CastError` when it is empty or filtered. The empty reduction's identity falls back to `cast[\T\](0)`, which casts the numeral 0 to the group instead of using the group's `zero`. `PROD` has the same fallback, with `cast[\T\](1)`.
- **Where:** Walk. `Library/FortressLibrary.fss`: `SumReduction.empty()` at `:3447`, `additiveIdentity` at `:3408`, `multiplicativeIdentity` at `:3425` (line numbers at c124c6b65). The construct is the big operator `SUM` / `PROD`.
- **Reproduce:** `ProjectFortress/tests/XXXEmptyGroupSumRungF.fss`, a walk `XXX` test. The two cases are `SUM[\M7\][i <- 0#0] M7(i)` (empty) and `SUM[\M5\][i <- 1#4, i > 2] M5(i)` (filtered). An unfiltered sum that is not empty runs.
- **Status:** Open, and a fix has a direction: `HasIdentity` (P-78; `perf-probes/where-clauses/REPORT.md` B.4). Until then, add up in a `seq` loop that starts from the group's `zero`. Whether a worker may build `HasIdentity` now or must wait for P-78's own work is not said.
- **Could not resolve:** Why "filtered" fails on a range that is not empty. I guess the filter makes the reduction start from `empty()`, but the row does not say. "P-78" can be looked up by number with the skill's tool; it is not explained here. Otherwise clear (`references/library.md` cites this row too).

## Row 481

- **Defect:** On the compiled path, `=` on two ranges compares identity: two ranges with the same elements are not equal unless they are the same object. `(1:3) = (1#3)` and `(3:1) = (5:4)` print `false` compiled and `true` under walk.
- **Where:** The compiled path's prelude. `Library/CompilerLibrary.fsi:111` and `.fss:301`: `GeneratorZZ32` extends `Equality[\GeneratorZZ32\]`, whose `=` is `self === other` (`Library/CompilerAlgebra.fss:26`), and no range object overrides it.
- **Reproduce:** `ProjectFortress/compiler_tests/XXXRangeEqRungJ.fss`. It asserts `(1:3) = (1#3)`, `(3:1) = (5:4)` and `NOT ((2:4) = (2:5))`. Walk passes all three; the compiled run stops at the first.
- **Status:** Leave it. The prelude takes no new declaration (POSITIONS, "The library route"; `references/compiler.md`). The defect goes away at the switch-over, when the one library's `=` replaces the prelude's. Keep the `XXX` test until then.
- **Could not resolve:** That `(3:1)` and `(5:4)` are both empty ranges is my inference; the row does not say what case this pair is. "measured but not gated" for `r = r`: I read it as "seen to hold but no gated test checks it". Whether the compiled `XXX` test is one `.test` file or a link/run pair (`references/tests-writing.md`) the row does not say. "siblings: 479" does not say how 479 is related.

## Row 603

- **Defect:** `SimpleMappedSeqIndexed`, the object you get when you `map` a sequential range (`seq(...)`), is not a `MappedGenerator`. So its `reverse` is `Indexed`'s default, which wraps it: `seq(0:6:2).map(fn x => x + 1).reverse.asString` prints `SimpleReversedIndexed(mapped(seq(1,3,5,7)))`, where `mapped(7,5,3,1)` is expected. The elements and their order are right. Only the form (and perhaps `reduce`) is different.
- **Where:** Walk (the only path named). `Library/FortressLibrary.fss:4319-4320` at c124c6b65. It lacks `MappedGenerator`'s `reverse`, `reduce`, `g` and `f` (`:3751-3762`). The parallel twin `SimpleMappedIndexed` (`:3771-3772`) does it right: `(0#4).map(f).reverse` prints `mapped(6,4,2,0)`.
- **Reproduce:** `ProjectFortress/tests/RangeDeclarations.fss:58`, a plain test that pins today's wrong string. Or print the expression in the claim under walk.
- **Status:** Build a fix if your work needs it. The row gives two repairs: export the object and make it extend `MappedGenerator`, or declare `reverse` as `SimpleMappedIndexed[\E,F,I\](g0.reverse, f0)`. The fix must change the pinned string in `RangeDeclarations.fss:58`. Until then, compare elements, not strings.
- **Could not resolve:** "the full sequential ranges" is unclear: full as in `FullRange`, or all of them? "no longer `mapped(7,5,3,1)`" reads as a regression from an earlier state, but the row gives no when or why. "the api does not export it, and the export check compares extends clauses (`ExportChecker.scala:733-734`)" does not say what follows: I guess that adding `extends MappedGenerator` alone fails the export check unless the api also declares it. `g0` and `f0` in the second repair are not defined in the row.

## Row 609

- **Defect:** Under walk, a subscript with an implicit strided range `:b:c`, which has no left end, is completed wrong. The specification says `:b:c` means `l:b:c`, where `l` is the left end of the axis. The library instead counts back from `b` in steps of `c`. So `<|a,b,c,d,e,f|>[:3:2]` gives `<|b, d|>` (indices 1 and 3), where `<|a, c|>` (indices 0 and 2) is meant, and `"abcdef"[:3:2]` gives `bd`.
- **Where:** Walk. `Library/RangeInternals.fss:873-877` at c124c6b65: `RightScalarRange`'s `opr IN` and `atMost`. `String` inherits it through `self.bounds.narrowToRange(r0)` in its `opr[r0]` (`Library/FortressLibrary.fss:4383`).
- **Reproduce:** `ProjectFortress/tests/XXXSubscriptImplicitStridedRange.fss`. Or evaluate `(0#6).narrowToRange(:3:2)`, which gives `[1,3]` where `[0,2]` is meant.
- **Status:** Build a fix. The specification settles the answer, and the repair is named: in `RangeInternals`, complete `:b:c` from the left end of the axis it subscripts. Until then, write the left end, as in `[0:3:2]`.
- **Could not resolve:** The claim says "anchored at the subscripted axis's right end", but the notes and the example show it anchored at the range's own right end `b` (3), not at the axis's right end (5). The claim can be read two ways; the notes settle it. `RightScalarRange` (a range that has only its right end given) is a library name I inferred, not found in the skill. `r-(n-1)str` uses `str` for the stride, by juxtaposition.

## Row 659

- **Defect:** Walk has no range kind for a bounded range of rank 2 or 3 that steps backwards on some axes and forwards on others. So `((0,0)#).every(-1,1)` stops walk with "shouldn't happen: combine2D of non-uniform ranges ...".
- **Where:** Walk. `Library/RangeInternals.fss`: `combine2D(i:BoundedScalarRange, j:BoundedScalarRange)` at `:639-640` and `combine2D(i:ScalarRange, j:ScalarRange)` at `:207-208` (at c124c6b65).
- **Reproduce:** No test. Run `bin/fortress` on a program that prints `(((0,0)#).every(-1,1)).asDebugString`; it prints the message above.
- **Status:** Leave it. It is a design limit. Step every axis forwards and read a backward axis's index as `n - 1 - i`.
- **Could not resolve:** `((0,0)#)` is a syntax I cannot read from the skill: `#` with a tuple start and no count. The message shows axes of 5 elements, so some size is set elsewhere; the row's program seems to be shortened. "a right and a left scalar range" is a library term I lack: I read it as "a range stepping backwards and one stepping forwards". "The file is unchanged since abe8b0342" does not say which file: `RangeInternals.fss`, I suppose. The compiled path is not mentioned; I read that it was not tried there.

## Row 661

- **Defect:** In the one library, a strided range `a:b:c` has the declared type `Range[\ZZ32\]`, and `Range` extends no `Generator`. So the compiled checker refuses `seq(a:b:c)` with 'Could not check call to function seq ... not applicable to an argument of type Range[\ZZ32\]'. Walk runs it, since at run time walk builds a strided full range that `RangeInternals` gives `seq`.
- **Where:** The compiled checker, checking against the one library. `Library/FortressLibrary.fsi:2421` (`opr :[\I\](r: Range[\I\], stride:I): Range[\I\]`), under the team's comment that a `FullRange` form "doesn't obey the subtyping rule"; `Range` at `:2189`. Library sites: `SUFFIX_SUM`, now written as `seq((0 # (|x| - 1)).reverse)` (`Library/FortressLibrary.fss:4944`), and `Library/Shuffle.fss:23`.
- **Reproduce:** No test. It was measured at `SUFFIX_SUM` (`explorations/compile-ladder/gate/distance-sites.tsv` at f9d3ec826). Today you would see it with a count-stage or distance-stage check of a library site that writes `seq(a:b:c)`, such as `Library/Shuffle.fss:23`.
- **Status:** Open. No program compiles against the one library yet, so nothing fails today. A worker writing library code should avoid `seq(a:b:c)`, as `seq((0 # n).reverse)` does. The row does not say whether a fix to the declaration is wanted now or must wait for the switch-over.
- **Could not resolve:** "outside the distance's units" is unclear: I guess that `Shuffle` is a component that the distance stage does not count. The workaround `seq((0 # n).reverse)` covers only stride -1, not a general `a:b:c`; the row does not say what to write for other strides. "siblings: 514" does not say how 514 is related. The team's remark "doesn't obey the subtyping rule" is quoted without saying which rule.

## Row 799

- **Defect:** This records a difference between the library and a decision. `AnyList`'s `addLeft(e:Any): AnyList` and `addRight(e:Any): AnyList` are declared (`Library/List.fsi:57-61`) and defined (`Library/List.fss:89-90`) in `AnyList`, under its clause `comprises { List[\E\] } where [\E\]`. P-151 puts them in `List`.
- **Where:** The library, `Library/List.fsi` and `Library/List.fss` (at c124c6b65). Walk is tested by `ProjectFortress/tests/AnyListElementTypeWalk.fss`, which runs the two methods on an `AnyList`.
- **Reproduce:** No test. Read the lines named. Nothing fails; `AnyListElementTypeWalk.fss` passes.
- **Status:** Wait. It is `CONTESTED` on review-queue item 188, the curator's question: either read P-151 as built (accept the library as it is), or move the bodies into `List` in a library change. Nothing built later depends on which, so do not move the methods yourself.
- **Could not resolve:** "respelled" is unclear: respelled from what? Perhaps P-151 wrote another spelling of these declarations and the library spells them differently. "live" in "its live `comprises ... where` clause" is unclear: it may mean "in force, not commented out". "read P-151 as built" could mean "P-151 describes what is built" or "reinterpret P-151 to match the build". `comprises ... where [\E\]` (a comprises clause with a `where` binding a type variable) is a language form that the skill does not explain.

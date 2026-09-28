# Rung A (`rung-tabulate`): the skeptic's first judgement

*Row numbers, noted at the gather of climb batch 7: the rows 456 and 457 this file cites are rung A's provisional numbers, which the gather opened as ledger rows 464 and 465 in that order; its three recommended rows are rows 466, 467 and 468 (`explorations/compile-ladder/climb-batch-7/RECORD.md`, "Final row numbers").*

**Verdict: approved, with two required corrections** (section 13). The recorded failure exists and was committed before the edit; I reproduced the post-edit checker-count table (40) and the post-edit distance table (1,434, row for row); the diff does what the report says; my own programs give the same answers on the base and the edit wherever the old and new spellings mean the same thing. No stop the batch record reserves is met unlifted.

The worker's REPORT.md and record.md are not on the branch (the harness refused the writes); every check on them below ran on the structured result's `reportText` and `recordText`.

## 1. What I ran, and where

- Machine for every run here: `nproc` 4; Intel(R) Xeon(R) Processor @ 2.10GHz, `cpu MHz` 2100.000; OpenJDK 25.0.4; `FORTRESS_THREADS=1` unless marked 4. Load at the start 5.8, and 6 to 29 during the work, with two other rungs' workers on the box. No timing here is a comparison.
- The base for my walk runs: an extract of `ff1649cea`'s `Library/`, `ProjectFortress/LibraryBuiltin/` and `default_repository/configuration` (`git archive`, no git metadata touched), read through `FORTRESS_AUTOHOME` with this worktree's build and a private cache per run (`explorations/compile-ladder/rung-tabulate/probes/skeptic/sk-walk.sh`). For the base distance and count runs, a fuller extract that adds `bin/`, `ProjectFortress/src/` and the tools, with `FORTRESS_HOME` and `FORTRESS_AUTOHOME` pointed at it.
- The compiled path: the library-order bytecode cache built in a private `FORTRESS_CACHES` (`AnyType`, `CompilerBuiltin`, `CompilerLibrary`, `CompilerAlgebra`, `CompilerSystem`), so `default_repository/caches/global.map`, which is tracked, was not touched.
- Not re-run: the three-pass comparison over 418 tests and the two microGPT checks (about 2,500 s each). I read their captures and re-ran the seven respelled tests and my own programs instead (sections 4 and 8).

## 2. The recorded failure and the recorded pass (checks 3 and 10)

- `explorations/compile-ladder/rung-tabulate/probes/checker-count-preedit.txt` was committed in `0b908ebb4`, before the library edit (`77b429e01`). It reads `NativeArray 44` (:8) and `#total 62` (:14), and equals batch 6b's landed table `explorations/compile-ladder/climb-batch-6b/gate/checker-count.txt` except for the `#cache` row the stage gained at `ff1649cea`.
- My run of the stage on the base extract gives the same table (`explorations/compile-ladder/rung-tabulate/probes/skeptic/checker-count-skeptic-base.txt:8`, `:14`). Its 22 errors in `NativeArray` are all "Invalid overloading of fill", 11 in `PrimitiveArray` and 11 in `PrimImmutableArray` (`explorations/compile-ladder/rung-tabulate/probes/skeptic/checker-count-messages.txt:20-21`).
- My run of the stage on this branch gives `NativeArray 0` and `#total 40`, crash line `none` (`explorations/compile-ladder/rung-tabulate/probes/skeptic/checker-count-skeptic.txt:8`, `:14`), the same as the worker's `checker-count-postedit.txt`. No `fill` or `tabulate` message is left in it (`checker-count-messages.txt:26-45`). The difference is the defect: both runs build the shadow checker fresh and use a private cache.
- Check 10: the table's `#total` is 40, and the report (section 4), the record ("expectedCheckerCount for A alone is 40") and the structured result all declare 40. `expectedCheckerCrash` does not move. No mismatch.

## 3. The distance stage (check 3)

- My run on this branch reads 1,434, and its table is identical to the worker's `distance-postedit.txt` row for row, apart from `#seconds` and `#machine` (`explorations/compile-ladder/rung-tabulate/probes/skeptic/distance-skeptic-compare.txt:5`, `:7`). Against the pre-edit table: A1 244 to 0, A2 58 to 0, the four crashes the same declarations at lines shifted by the edit (`:10-34`).
- My run on the base extract reads 1,745 (`explorations/compile-ladder/rung-tabulate/probes/skeptic/distance-skeptic-base.txt`). The untouched base has now read 1,747, 1,747, 1,745 and 1,745 in four runs, with different rows each time it moved (`distance-skeptic-compare.txt:36-78`).
- Error by error against my base run, 29 rows are new on the edit (`distance-skeptic-compare.txt:80-113`). Besides the worker's classes they include rows in files the rung never touched (`RangeInternals.fss:512`, `List.fss:94`, `FortressBuiltin.fss:327`). So the base's own variation is at least as wide as the worker says, and the worker's reading, that no new row is caused, stands.
- The two rows the worker says moved with the bodies are what it says. The base reports "Function body has type StandardImmutableArrayType[\..\], but declared return type is T" at base `FortressLibrary.fss:2076` and `:2080`. The edit reports the same message, with `StandardMutableArrayType`, at `:2093` and `:2097`, beside the two it already reported for `assign`. `ImmutableArray1`'s new bodies draw no such error, since their declared type is the concrete `ImmutableArray1`.

## 4. The diff, line by line (check 4)

- The library, as the report's section 2 says:
  - `tabulate(f:I->E)` replaces `fill(f:I->E)` in `ReadableArray`, `ImmutableArray` and `Array`.
  - `StandardImmutableArrayType` declares both forms abstract. `StandardMutableArrayType` holds the two bodies, moved unchanged, and `ImmutableArray1` holds copies.
  - The factories get their new names, and `tabulatedArray3` takes `(ZZ32,ZZ32,ZZ32)->T` in the api and the component.
  - The 33 call sites change the method name or the factory name and nothing else: 21 in `FortressLibrary.fss` (my count: ImmutableArray1 4, Array1 4, Array2 3, Array3 3, Matrix 2, `matrix(v)` 1, factory bodies 4), `Generator22D.fss` 7, `List.fss` 2, `Random.fss` 2, `System.fss` 1.
  - Nothing else extends `StandardImmutableArrayType` directly, in `Library/`, `LibraryBuiltin/`, the tests or the demos. Making its two declarations abstract therefore leaves no object without a body.
- Section 4's ownership holds. No hunk touches rung H's declarations (the comparisons, `Maybe`, `RelationalPredicateCondition`, the `AnyIntegral` and `Integral` headers) or rung B's (`fail`, `StandardMinMax`'s `MIN` and `MAX`, `builtinPrimitive`, `List`'s nullary comprehension at `List.fss:177`). The `List.fss` hunk is at `:459-468`.
- The vocabulary. The distinct changed lines of `explorations/run-c4/src/FlatArrays.fss`, `explorations/apl/mg/AplMg.fss` and `explorations/apl/mg/FlatArrays2.fss` equal the diff block of `explorations/reviews/overloading-judgement.md` section 4.4 exactly, 24 lines against 24. The two probe files add 4 lines.
  - `git diff --stat` over `explorations/run-c4` and `explorations/apl` shows 5 files and 16 lines.
  - `MicroGptFlat.fss` and `MicroGptApl.fss` are untouched.
- The specification:
  - The figure's row becomes `tabulate`.
  - The `\revision` callout follows the figure, and the Appendix I entry sits immediately before "Passages not yet revised".
  - The entry quotes `Specification-1.0-frozen/advanced/parallelism-locality/arrays-distributed.tex` line 55, which I opened; it is the row, and `Specification-1.0-frozen/` is untouched.
  - The three labels the entry uses exist (`arrays`, `type-param`, `incompatibility-rule`).
- The demos: 32 lines in eight files, each a respelling (decision D4). I found no other `fill` with a function and no function-form factory call in any corpus of the tree outside `explorations/`: tests, `*_tests`, `test_library`, `not_passing_yet`, demos and `SpecData`. `not_passing_yet/tree.fss:205` is inside a comment.
- Two sites the rung does not reach, neither a defect of this rung:
  - The compiler prelude's `ZZ32Vector` keeps `fill(f: ZZ32 -> ZZ32)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:578`). That pair is not ambiguous, since `ZZ32` excludes arrow types, and the prelude takes no new declaration before the switch-over (POSITIONS 2026-09-21, the library route). The compiled path runs it (`explorations/compile-ladder/rung-tabulate/probes/skeptic/compiled.txt:32-36`).
  - The root directory `CompilerLibrary/` (10 files, last changed 2012-07-19 at `5a68404fd`) still declares `fill(f)` and the old factories (`CompilerLibrary/FortressLibrary.fsi:1307`, `:1499`, `:1608`). No build, `bin/` script or repository path reads that directory.

## 5. The provenance block (check 2)

I opened every file:line the five lines cite, with `sed -n`.
- **problem**: `checker-count-preedit.txt:8` and `:14`, `distance-preedit.txt:14-15` and `test-preedit.txt:3-4` say what the block says.
- **spec**: `arrays-distributed.tex:53-55` holds the figure's two rows. `overloading.tex:176-180` is the Incompatibility Rule's heading and its basic idea, and `:114-127` is the rule for a lone parameter of a naked type variable bounded by `Any`. `trait-parameters.tex:49-54` holds the implicit `Object` bound and the tuple and arrow instances. `spec-grep.txt:2-3` shows an empty grep over `basic/` and `basic-lib/`. No `library/apis/` citation.
- **precedent**, at `ff1649cea`: `FortressLibrary.fsi:1439-1440` holds `assign`'s two forms in `StandardMutableArrayType`. `:1635` holds the "Copied here" comment, and `:1492`, `:1518`, `:1631` and `:1763` are the leaves' `copy`. `:1349-1350` holds `ivmap` and `map`, `:1554` `immutableArray1`, and `:1421` `primitiveArray`. `CompilerBuiltin.fsi:577-579` holds `fill` and `fill2`. `fill2` came in with Steele's commit `d535963cb` of 2011-10-12, as the report says.
- **deviation**: `FortressLibrary.fsi:1441-1442`, `:1495-1496`, `:1431-1432`, `:1556` and `:1778` are what the line says. `distance-sites-leaves.txt:348` is "Invalid overloading of fill in trait StandardMutableArrayType". `demos/lutx.fss:62` is a factory call now spelled `tabulatedVector`.
- **historical**: every file of the 2012 tree the diff edits is listed: six library components, seven team tests plus the new one, eight demos, and the two specification files.

One citation outside the block is wrong. The report's D2 (section 9) and its `specCitations` cite `Specification/basic/types-vals-vars.tex:400-403` for "arrow types never exclude". Those lines define when an arrow type is applicable. The sentence the decision rests on is `:434-437`: "An arrow type excludes any non-arrow type other than Any ... However, arrow types do not exclude other arrow types". This is required correction 1.

## 6. The precedent (check 5)

- The worker found both of the library's answers to the diamond: the meet's own declaration (`assign` in `StandardMutableArrayType`) and the leaves' redeclarations (`copy`, `map`, `ivmap`, `replica`).
- It measured that the leaf way leaves the meet refused when the meet is a trait of its own (`distance-sites-leaves.txt:348-355`). It counted the one other site of that defect, `copy` at `StandardMutableArrayType`, 2 rows on the base and after. I reproduced them in my own runs (`explorations/compile-ladder/rung-tabulate/probes/skeptic/copy-meet-refusal.txt:3-4`, `:28-29`).
- `copy` is not rung A's declaration (section 4 of the batch record), so it gets a recommended row, not a repair here.
- The factory names follow the library's adjective-before-type factories. The meet shape is the judgement's measured variant (`explorations/reviews/fill-overloads-ways/variants/edits.py:23-35`, `meet()`).
- No invented device.

## 7. The test (checks 6 and 9)

- `ProjectFortress/tests/TabulateRungA.fss` has one comment line, pointing at REPORT.md. Each assert message carries its citation, and nothing else in the file does.
- I ran it under walk: exit 0 on the edit at 1 and 4 threads (`explorations/compile-ladder/rung-tabulate/probes/skeptic/respelled-tests.txt:16`, `threads.txt:8`).
- On a copy against the base library it fails on the four new factory names (`respelled-tests.txt:17-28`).
- The home-1 assertions exercise the defect. The three cases at `:46-51` store a function on an array of `Any`, directly, through `array1[\Any,3\]` and through generic code. My own program shows the base tabulating exactly these and the edit storing them (`explorations/compile-ladder/rung-tabulate/probes/skeptic/old-spelling.txt:17-24`). The row-247 case at `:32-33` builds a three-dimensional array from a three-argument function.
- Home 2: none added, so the XXX demonstration does not apply.
- Home 3: rows 456 and 457 cite committed `.txt` captures. The report says why neither gated home can hold them: a team demo's line, and a static refusal a passing program cannot assert.

## 8. My differentials (the required ones)

Written by me, none of them the worker's; outputs under `explorations/compile-ladder/rung-tabulate/probes/skeptic/`.

- **`SkShapes.fss`** (and `SkShapes.base.fss`, the base spelling). It covers 25 constructs: value `fill` on mutable, immutable, 1-D and 2-D arrays; `tabulate` then `t()`; `freeze` and `thaw`; generic `tabulate` and `fill`; function elements built by `tabulate`; tuple elements by `fill((1,2))` and by `tabulate`; the two-argument tuple fill `ChunkedSparseArray.fss:54` uses; `matrix(v)`; `Matrix.lmul` and `rmul`; the three factories; `ArrayList.map` and `ivmap` (`List.fss`'s `mapArr` and `ivmapArr`); and 3-D `copy` and `ivmap`.
  - Walk: base and edit identical, 25 lines each (`walk-base-edit.txt:4-57`).
  - Compiled: refused at `List.fsi:67` ("LexicographicOrder is undefined"), since the compiler's prelude is not the one library (`compiled.txt:20-29`).
  - Verdict: same.
- **`SkGen22D.fss`** (`Generator22D`'s `rows`, `cols`, `rects`).
  - Walk: base and edit identical up to the moved library positions. Both stop at `Generator22D.fss:146` on `(Ratio,Ratio)`, one line before the respelled call, because `:144-145` halve with `/`, which gives a rational (row 174) (`walk-base-edit.txt:59-136`).
  - Verdict: same. The site at `:146` is reached by no run on either tree, which is recommended row 3.
- **`SkMss.fss`** (`MSS2DReductionAbove` and `Beside` over `SumReduction`). It reaches `createArray2`, `ABV`, `BSD` and `tri`, the respelled sites at `Generator22D.fss:314-327`.
  - Walk: base and edit identical, 54 lines each (`walk-base-edit.txt:138-247`).
- **`SkArgs.fss alpha beta gamma`** (`System.args`, built by `System.fss:34`).
  - Walk: base and edit both print `args: 3 alpha gamma` (`walk-base-edit.txt:249-254`).
- **`SkTab3.fss`** (`tabulatedArray3` with a tuple-parameter and a three-parameter function, and the `array3().tabulate` method).
  - Walk, edit: 101 11, 110, 3 (`old-spelling.txt:65-69`).
  - Compiled: "Function tabulatedArray3 is not defined" (`compiled.txt:10-17`).
- **The old spellings under walk**, each run on the base and on the edit:
  - `SkOldFillNumeric.fss`: base 0 5 10; edit "Unification error: Closure/Constructor for fill param 1 (v:ZZ32) got arg FnExpr", exit 1 (`old-spelling.txt:4-15`). Compiled: "Function array is not defined" (`compiled.txt:4-8`).
  - `SkOldFillAny.fss`: the base tabulates (the number 10) and the edit stores the function (`old-spelling.txt:17-24`).
  - `SkOldVector.fss` and `SkOldArray1.fss`: base values; edit "Failed to find any matching overload", listing the two remaining factories (`old-spelling.txt:26-54`).
- **`SkTwiceInit.fss`**: a second `fill` on an initialized array is silently ignored on both trees, and the first values stay (`old-spelling.txt:56-63`). The specification's footnote says the implementation signals a fatal error. This predates the rung and is recommended row 1.
- **`SkZZ32VectorFill.fss`**: the compiler prelude's `ZZ32Vector.fill(f)`.
  - Compiled: `v 0 5 10`, `w 7 7`. Walk: `makeZZ32Vector` is not defined (`compiled.txt:32-41`).
- **The seven respelled team tests**, base against edit: six identical. `ShuffleTest`'s first line, the array the respelled line builds, is identical, and its later lines are random by design (`respelled-tests.txt:3-13`).
- **Threads.** The moved and copied bodies write array elements inside a parallel `for`, so I also ran `SkShapes` (base and edit), `SkOldFillAny`, `SkTab3`, `SkMss` and `TabulateRungA` at `FORTRESS_THREADS=4`. Every output is identical to the one-thread run (`threads.txt:3-8`).

**Walk against compiled.** Every program that uses the one library's arrays runs under walk and is refused by the compiled path's name resolution. This is rule 4's fourth case. The specification settles it against the compiled run: the arrays figure lists the factories (`arrays-distributed.tex:39-49`). The repair, the switch-over, lies outside this rung, and rows 72 and 305 already carry it. No new row is owed.

## 9. The failure-mode question

No loud failure became a quiet value. The rename moves the other way:
- Old calls of the function form on arrays whose element type excludes functions were quiet values and are now loud walk errors. The errors name `fill`'s value parameter or list the remaining factories (`old-spelling.txt:9`, `:31`, `:46`).
- The one quiet change is the element type `Any`, or a function type. An old `fill(f)` there tabulated, and now stores `f` in every element, with no diagnostic at the call (`old-spelling.txt:18-23`).
  - That is what the specification's figure says `fill` does (`arrays-distributed.tex:53`, "Initializes all elements with value v").
  - The cost falls on a program written against the old library: it receives functions where it expected values, and learns it only where it uses an element.
  - The worker's FACTS line already records it ("`fill` with a function stores it wherever the element type admits it"), so no correction is owed.

## 10. The record fragment (check 8)

- The FACTS entry's numbers check against the captures and my runs: 33 call sites, 12 test lines, 32 demo lines, 62 to 40, 1,747 to 1,434, 302 plus 5 refusals gone, 391/9/17/1 of 418.
- The appended notes cite rows that exist and are not renumbered: 247 (`fortress-gap-ledger.md:250`), 430 (`:441`) and 437 (`:448`).
- The new rows 456 and 457 are marked provisional for the gather's numbering. Their probes are committed `.txt` files, and I opened them: `demos-compare.txt:4-13`, `Array3Value.txt:4`, `ComponentOnly.txt:4`.
- A reader can check each claim from the cited files.
- One addition would help that reader. The FACTS line "Two runs of the stage on the untouched base read 1,747 and 1,745" now has two more runs, 1,747 (the gate baseline) and my 1,745, with different rows (`distance-skeptic-compare.txt:36-78`).

## 11. The ledger and the sibling sites (check 11)

I searched the ledger for "Meet Rule", "init0" and "initializ", "Generator22D" and "rects", and "ZZ32Vector". What bears on the rung:
- Rows 72 and 305 (the compiled path has no arrays) and row 174 (`/` on integers is rational, as specified).
- Rows 33, 97, 99, 159 and 444, on the Meet Rule; none names `copy` at `StandardMutableArrayType`.
No row changes what the rung should do. The sibling sites:
- `copy`'s Meet Rule refusal at `StandardMutableArrayType`: recommended row 2.
- The compiler prelude's `ZZ32Vector.fill(f)`: not a defect (section 4).
- The root `CompilerLibrary/` relic: not read by anything (section 4).
- `mg.fss:20`: row 456, as the worker opened it.

## 12. The decisions on record (check 12)

- **Answer 10** (POSITIONS 2026-09-26, answer 10; `POSITIONS.md:109`).
  - The rename, `fill` keeping the value, the library call sites, the test lines, the figure's row and the 12 vocabulary lines are as decided.
  - The placement is not as worded. The decision says "redeclaring `fill` in the leaf array traits", and the landed library defines both forms at `StandardMutableArrayType` and `ImmutableArray1` (`Library/FortressLibrary.fsi:1441-1442`, `:1495-1496`). Of the four leaves, only `ImmutableArray1` holds them.
  - I do not read this as contradicting the decision. The count the decision quotes ("measured to clear all 95 fill refusals ... 125 to 103") was measured on the meet shape (`explorations/reviews/fill-overloads-ways/variants/edits.py:23-35`). The leaf shape was measured by the worker and leaves 4 refusals (`distance-sites-leaves.txt:348-355`).
  - The landed text follows the decision's measured content, and departs from its placement words. The worker flagged it (D1). It is his to confirm, and it is in `forPavol`.
- **The FlatArrays review's repair** (2026-09-19): no model line changed, and the vocabulary lines are the approved ones, line for line (section 4).
- **S1 and the first of the batch-5 answers** (2026-09-26): the callout, the Appendix I entry, "the Working Draft of February 2011", and the path and line in `Specification-1.0-frozen/` are as decided. Route C is "The same under route C", the form the neighbouring entries use.
- **Rung D's stop** (2026-09-26): `XXXInheritedOverload`'s order flip is recorded as a note to row 430, not raised as a stop, as decided.
- **Stops a batch record reserves** (2026-09-27): applied to `mg.fss`'s changed output (section 14).

## 13. Required corrections (the commit stage must close both)

1. **The D2 citation for arrow-type exclusion.** In `reportText` section 9 (D2) and in `specCitations`, replace `Specification/basic/types-vals-vars.tex:400-403` with `Specification/basic/types-vals-vars.tex:434-437`. Lines 400-403 define applicability; 434-437 say that arrow types do not exclude one another, which is what D2 rests on.
2. **The doc comment the move made false.** `Library/FortressLibrary.fss:1951-1953` and `Library/FortressLibrary.fsi:1357-1359`, the doc comment of `ReadableArray`'s `tabulate` and `fill` (rung A's declarations), still say the forms "are defined with more specific self types in StandardImmutableArrayType".
   - After D1, `StandardImmutableArrayType` only declares them abstract. The bodies are in `StandardMutableArrayType` and `ImmutableArray1`.
   - The `.fsi` comment is rendered into Part IV of the specification.
   - Fix: name the two traits that define them, in both files, and record the edit in the report's section 2.

## 14. Stops

- The standing stops the worker names, a library declaration that gated tests use renamed and team test lines restated with their values, are met. They are lifted by answer 10 (`POSITIONS.md:109`).
- The batch record's "a changed walk output" is met by the demo `ProjectFortress/demos/mg.fss`. Its walk run now fails at `:20` instead of `:159`, with the same exit code (`explorations/compile-ladder/rung-tabulate/probes/demos-compare.txt:4-13`). The worker accounts for it: the demo passes a value or a function to `fill`. It is lifted as reversible and listed for review by `POSITIONS.md:120` (2026-09-27, the stops a batch record reserves). The rename that causes it is answer 10's.
- Not stops:
  - `XXXInheritedOverload`'s order flip (`POSITIONS.md:114`).
  - The demo files the rung edited: they are not another rung's, and the batch record's own skeptic check asks that no `fill(f` remain in the demos.
  - The callout beside the figure: the S1 form, named in the batch record's "What it writes".
- No model line, no vocabulary or probe line beyond the 12 and the 4, and no declaration or file of another rung's was touched.

## 15. Recommended ledger rows

1. **Under walk, a second initialization of an array element is silently ignored, where the specification's footnote says the implementation signals a fatal error.**
   - `a = array[\ZZ32\](2).fill(3); a.fill(4)` leaves `3 3` on the base and the edit (`explorations/compile-ladder/rung-tabulate/probes/skeptic/old-spelling.txt:56-63`).
   - `PrimitiveArray.init0` discards `init00`'s result, with the team's comment "We used to validate the result of init00, but that doesn't work if the ith element was initialized as part of a failed transaction" (`ProjectFortress/LibraryBuiltin/NativeArray.fss:25-29`).
   - The specification: `Specification/advanced/parallelism-locality/arrays-distributed.tex:71`, the footnote "The present implementation signals a fatal error in case of duplicate initialization".
   - Fix: validate outside a transaction, or revise the footnote in the S1 form.
2. **`copy` is refused by the Meet Rule at `StandardMutableArrayType`**, the diamond's one other site, 2 rows on the base and after (`explorations/compile-ladder/rung-tabulate/probes/skeptic/copy-meet-refusal.txt:3-4`, `:28-29`).
   - `Array` and `StandardImmutableArrayType` both declare `copy` and nothing below both does. The leaves' redeclarations do not reach the meet, as rung A measured for `fill` (`explorations/compile-ladder/rung-tabulate/probes/distance-sites-leaves.txt:348-355`).
   - Fix: `copy()` declared at `StandardMutableArrayType`, the device rung A used. Batch 8's Meet Rule class, for probe P2.
3. **`Generator22D`'s `rects` cannot run under walk**: `rectsImpl` halves with `/` (`Library/Generator22D.fss:144-145`), which on `ZZ32` gives a rational (row 174). `array[\Generator[\E\]\](ss0, ss1)` at `:146` then finds no overload for `(Ratio,Ratio)`.
   - Evidence: `explorations/compile-ladder/rung-tabulate/probes/skeptic/walk-base-edit.txt:79`, `:118`, on the base and the edit alike.
   - `ProjectFortress/demos/DemoGenerator22D.fss` prints `rects xs` and fails earlier in its run. So no run reaches the respelled call at `:146`.
   - Fix: `DIV` at `:144-145`, and in `ss` at `:150`.

## 16. Findings that need no correction

- The Appendix I entry's rationale says "Where the library derived a second name, it gave it to a form that takes a function (ivmap beside map)" (`Specification/appendices/changes.tex:1050-1051`). `map` takes a function too; `ivmap` names the variant whose function also takes the index. The library's closer case, a second name for a function form beside a value form, is `fill2` in the compiler's prelude, which the specification does not describe. The sentence is not false, but its example is weak. The commit stage may reword it.
- My programs reach most of the 33 respelled library sites on both trees, with identical answers (section 8). `Generator22D.fss:146` is reached by no run on either tree (recommended row 3).
- For Pavol, I confirm the worker's five points with my own evidence (`forPavol`). I add none of my own.

# Rung G of climb batch 13: a generator's size and index (row 629, item 45 at ways 1, 3 and 6)

- problem: the nine sites of row 629 in the landed per-site list, `explorations/compile-ladder/gate/distance-sites.tsv:81-85` (shape A, `|_|` on a `Generator`), `:94`, `:132`, `:133` (shape B, `cond`'s size) and `:108` (shape C, the default pairs); the walk stops of `|g|` on a filter and of `cond` on a filter and on an array indexed from 5 (section 2)
- spec: `Specification/advanced/parallelism-locality/defining-generators.tex:22-25`, "An instance of Generator[\E\] only needs to define the generate method"
- precedent: `Generator`'s `opr IN`, a naive O(n) default (`Library/FortressLibrary.fss:1238`, `.fsi:826-828` at the base); Generator2's fused relational reduction (`Library/Generator2.fss:207-229`) with the component's own `Maybe` join (`StringJoinReduction.join`, `Library/FortressLibrary.fss:4290-4300` at the base); `SimpleMappedIndexed` (`Library/FortressLibrary.fss:3600-3618` at the base) and the api's way to write a range subscript, `(bounds())[r]` (`Library/FortressLibrary.fsi:1291-1297` at the base)
- deviation: the pairs' range subscript maps the narrowed bounds, `self.g.bounds[r].map(...)`, not the brief's `SimpleIndexValuePairs(g[r])`, which would number a slice's pairs from 0 (decision 1; `Library/FortressLibrary.fss:3631-3632`); the meet test is the component's nested `Maybe` binding, not Generator2's `typecase` on the pair, and `takeleft`/`takeright` are `if h1.holds then h1 else h2 end` and its mirror, written in place (decision 2; `Library/FortressLibrary.fss:4676-4682`); `GeneratorSize` asserts the cross of two ranges among the passing-before cases, since it answers 12 on the base, and takes its failing crosses and naive `seq` from unsized generators (decision 6; `ProjectFortress/tests/GeneratorSize.fss:35-40`, `:46`)
- historical: `Library/FortressLibrary.fss`, `Library/FortressLibrary.fsi` (first edits `Library/FortressLibrary.fss:1239`, `Library/FortressLibrary.fsi:829`)

The harness refused the write of this file; the text is the report.

Branch `wip/rung-generator-size`, base `a1a75716a`. Commits: the tests `24a924bc6`; the edit `af2127f5d`; `record.md` `9a89985af`. Nothing under `ProjectFortress/src/` changed: no Java, no Scala, no build.

## 1. What changed, and why

The answer followed: item 45 is not answered, and the rung builds it at the default of `explorations/reviews/generator-size-judgement.md`, ways 1, 3 and 6, on the curator's standing go, listed for his review. All nine sites of row 629 are gone and no site came. The distance falls 153 to 143 on this tree: the nine, and one site of row 488's run-to-run variation. The count stays 1 (section 3).

### 1.1 Shape A: `Generator` gains a counted `opr |self|` (5 sites)

- The api declares `opr |self| : ZZ32` after `opr IN`, with a comment in `opr IN`'s words: "By default this is implemented using the naive $O(n)$ algorithm, which runs the generator; a generator that knows its size overrides it." (`Library/FortressLibrary.fsi:829-833`).
- The component's default counts by `mapReduce` over `generate`: `self.mapReduce[\ZZ32\](fn (_:E):ZZ32 => 1, fn (a:ZZ32, b:ZZ32):ZZ32 => a + b, 0)` (`Library/FortressLibrary.fss:1239-1242`). It uses `mapReduce`, not `SUM`, so that the body does not meet row 425's rewriting of a reduction by its element type.
- The five bodies stay as written: `DelegatedIndexed`'s `|self.indices|` (`:1965`), `PairGenerator`'s `|self.e| |self.f|` (`:3739`), and `NaiveSeqGenerator`'s `size` and `|self|` (`:3817`, `:3819`). Each now types, since `|_|` applies to a `Generator`.
- A type with its own `|self|` keeps it, because dispatch picks the most specific declaration. `GeneratorSize`'s `Claimed` declares `|self| = 99` over three elements, and answers 99 before and after.
- This is the one new api declaration. Its precedent line is `opr IN`'s (`Library/FortressLibrary.fss:1238`, `.fsi:826-828` at the base), the derived default of the same trait, for the curator to judge (`explorations/coordinator/process-engineering/library-extension-rule-archaeology.md`, section 5, point 4).

### 1.2 Shape B: the relational predicate in one pass (3 sites and the hidden index)

`RelationalPredicateCondition.cond` (`Library/FortressLibrary.fss:4670-4687`) is one `generate` over `target()` with a `MapReduceReduction` whose element is `(Boolean, Maybe[\E\], Maybe[\E\])`. The element says whether the relation holds between the neighbours inside a part, and gives the part's first and last element.

- Each element is `(true, Just(v), Just(v))`, and the identity is `(true, Nothing, Nothing)`.
- The join tests `rel(l1, h2)` where the left part's last element meets the right part's first. It takes the left part's first element and the right part's last, each falling back on the other side's when it is `Nothing`.
- It reads no size and no index, so the hidden index at the base's `:4658` never surfaces. `relation()`, `target()` and the api are unchanged.
- This is the shape of Generator2's `efficientImplRelationalDistributiveImpl` (`Library/Generator2.fss:207-229`), whose join carries `(R, R, Maybe[\E\], Maybe[\E\])`.
- An empty and a one-element target answer `t()`, as the base's `x.size <= 1` branch did.

### 1.3 Shape C: the default index-value pairs as an object (1 site)

`Indexed`'s default `indexValuePairs` answers `SimpleIndexValuePairs[\E,I\](self)` (`Library/FortressLibrary.fss:1851-1852`). This is a new object beside `SimpleMappedIndexed` (`:3624-3637`). It is not in the api, as `SimpleMappedIndexed` is not.

- `generate` runs over `g.indices` and hands `(i, g[i])` to the body. `seq` is `seq(g.indices)`, mapped the same way.
- `opr[i] = (i, g[i])`. `bounds`, `indices` and `|self|` are `g`'s.
- `opr[r]` maps the narrowed bounds: `self.g.bounds[r].map[\(I,E)\](fn (i:I):(I,E) => (i, self.g[i]))`. This is the api's own way to write a range subscript ("writing `(bounds())[r]` in order to narrow and bounds check the range", `Library/FortressLibrary.fsi:1296-1302`). A slice's pairs keep their indices, as the base's mapped range kept them (decision 1).
  - Skeptic's correction: a range reads a range subscript as positions from 0, so for a value indexed from 5 this refused `pairs[6#2]` although `pairs.bounds` is `[5,6,7]` ("[6,7] right outside bounds [0,1,2]"). The skeptic's fix `a61ecbc55` narrows with `self.g.bounds.narrowToRange(r)`, as the arrays and `String` do; for bounds that start at 0 every slice is the same (`SKEPTIC.md`).
- Its own `indexValuePairs` is the inherited default, pairs of pairs, well typed. `ivmap`, `map`, `reverse` and `indexOf` are `Indexed`'s defaults.

The body before, `self.indices.map(...)`, answered a `Generator` where `Indexed[\(I,E),I\]` is declared, because `indices` has been a `Generator` since the team's `2f26aeded`.

## 2. The tests: the failing run and the passing run

Three walk tests are written first (`24a924bc6`):

- `ProjectFortress/tests/GeneratorSize.fss` asserts `|·|` of each of these, and each stops walk on the base:
  - a filter (4) and an empty filter (0);
  - a nest (6) and a mapped filter (4);
  - a filter crossed with `0#3` (12) and with itself (16);
  - a generator that defines only `generate` (5), an empty one (0), and its naive `seq` (5);
  - a sequential filter (4);
  - a `DelegatedIndexed` type that defines only its indices, a filter of `0#7` (4, and its `size` 4).

  Beside them, passing before and after: `Claimed`'s own 99, the cross of two ranges (12), and a list, a range, a string and an array.
- `ProjectFortress/tests/RelationalPredicateTargets.fss` applies `increasing` to:
  - a list (holds and fails) and a range;
  - an array slice (holds and fails) and an array indexed from 5 (holds and fails);
  - a filter of a range (holds) and two filters of a list (holds and fails);
  - an empty range, a one-element list and an empty filter.

  It reads each value through `if _ <- c then "holds" else "fails" end`. The shifted array and the filters fail on the base.
- `ProjectFortress/tests/IndexValuePairsDefault.fss` covers the pairs of `"abcd"`, of `DefaultZip[\ZZ32,String\]` and of `CaseInsensitiveString("AbC")`. It asserts their elements in order, `|pairs|`, `pairs[i]`, `pairs[r]` and its first element, the reversed pairs, the pairs' indices, and `ivmap` through them. It passes before and after: shape C is a type-only repair, whose failing-then-passing test is the distance stage (section 3).

The failing run on the base's code, before the library edit:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-generator-size/h1 ProjectFortress/tests/GeneratorSize.fss ProjectFortress/tests/RelationalPredicateTargets.fss ProjectFortress/tests/IndexValuePairsDefault.fss
    # harness-one 2026-10-09T19:20:12Z; tree a1a75716a; nproc=4; load 0.30 0.46 1.73; openjdk version "25.0.4.1" 2026-08-18; FORTRESS_THREADS=4; cache empty
    .../tests/GeneratorSize.fss:28:12-19: Failed to find any matching overload, args = (SimpleFilterGenerator[\ZZ32\]), overload = {
    FAIL: Index of dimension 1 out of bounds; got 2 which is not in 5#4
    Tests run: 3,  Failures: 3,  Errors: 0

In that run, `IndexValuePairsDefault` failed on a syntax error of its own (`f(...)[3]`), fixed by binding the call first. It then passed on the base, with the passing-before block of `GeneratorSize` run alone as a scratch copy: `# harness-one 2026-10-09T19:21:02Z; tree a1a75716a`, `OK (2 tests)`.

The passing run, on the library edit, committed unchanged as `af2127f5d`:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-generator-size/h2 ProjectFortress/tests/GeneratorSize.fss ProjectFortress/tests/RelationalPredicateTargets.fss ProjectFortress/tests/IndexValuePairsDefault.fss
    # harness-one 2026-10-09T19:22:38Z; tree 24a924bc6; ...; cache empty
    OK (3 tests)

A second harness run, at 19:23:17Z on the same code, covered the tests whose verdicts the brief keeps and the team's generator tests: `IndicesGetterCalls`, `PrefixSetIndices`, `RangeDeclarations`, `GeneratorDeclarations`, `spuriousSelf`, `MapTest`, `HeapTest`, `Region`, `Generator2Test`, `ExclusionRemainderRungH`, `LibraryMeetDeclarations`, `Reversals`, `SetTest`, `PureListQuick`, `ArrayListQuick`, `NumberOrderListDeclarations`, `RangeBodiesWalk`, `RangePrototype`, `SequentialGeneratorMap`, `conditionalGenerator`, `generatedExpr`, `generatorTest`, `multiGenFor`, `GeneratorNullPointer`, `zeno`, `subArray`, `TabulateRungA`, `FlatTowerRungF` and `IntMapTest`. It printed `OK (29 tests)`.

The interpreter suite ran once, after the last edit, at `af2127f5d` (`ant testSystem`, started 19:49:30Z): `BUILD SUCCESSFUL`, `Total time: 2 minutes 25 seconds`.

- The four shards ran 143, 137, 140 and 137 tests, 557 in all, with 0 failures and 0 errors.
- Batch 12's gate ran 554; the three new files account for the difference.
- No program was refused at load, and no gated pin changed.

## 3. The checker count and the distance: the stage as the test

Before: batch 12's landed tables (`explorations/compile-ladder/climb-batch-12/gate/checker-count.txt`, `distance.txt`) and the per-site list (`explorations/compile-ladder/gate/distance-sites.tsv`). After: one run each on the final code, `af2127f5d`.

The count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-generator-size/checker-count-postedit.txt tmp/rung-generator-size/cc-post`, ran at 19:24:54Z. `diff` against the landed table prints nothing: `#total 1`, `#locations 2`, `FortressLibrary 2` (`isLeftZero`, row 582), every other api 0. So `Indexed`'s api line `abstract opr |self|` (`Library/FortressLibrary.fsi:1288`), now under a concrete inherited declaration, draws nothing, and the line keeps `abstract`.

The distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-generator-size/distance-postedit.txt tmp/rung-generator-size/dist-post`, ran from 19:27:53Z for 1,259 s on one core. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-12/gate/distance.txt tmp/rung-generator-size/distance-postedit.txt` prints:

    DISTANCE DOWN   153 -> 143 (-10)
        kind typecheck              129 -> 119    (-10)
        class BR                      4 -> 3      (-1)  big operators: a reduction's body typed as the element, not the BigReduction or Comprehension declared
        class NM                      6 -> 3      (-3)  names the api does not declare (getters and methods of Range, String, Generator)
        class OT                     16 -> 10     (-6)  other body errors (one-off library slips and checker limits)
        unit component FortressLibrary    143 -> 133    (-10)
        crash gone   decl	FnDecl FortressLibrary.fss:1302:1-1306:4	TypeError	FortressLibrary.fss:1304:10: Missing parameter type for i
        crash gone   decl	TraitDecl FortressLibrary.fss:2491:1-2605:2	TypeError	FortressLibrary.fss:2500:9: Missing parameter type for i
        crash gone   decl	TraitDecl FortressLibrary.fss:2880:1-2993:2	TypeError	FortressLibrary.fss:2899:11: Missing parameter type for i
        crash new    decl	TraitDecl FortressLibrary.fss:2884:1-2997:2	TypeError	FortressLibrary.fss:2903:11: Missing parameter type for i
        crash new    decl	TraitDecl FortressLibrary.fss:2495:1-2609:2	TypeError	FortressLibrary.fss:2504:9: Missing parameter type for i
        crash new    decl	FnDecl FortressLibrary.fss:1306:1-1310:4	TypeError	FortressLibrary.fss:1308:10: Missing parameter type for i

The three crash rows are the same three declarations, four lines lower below `Generator`'s new lines. The class moves are row 577's stale ranges.

By site, the run's `errors.tsv` is read against the per-site list. Every line of the two edited files is mapped back to the base through `git diff -U0 a1a75716a -- Library/FortressLibrary.fss Library/FortressLibrary.fsi`:

| per-site list | site at the base | message | row | moved |
|---|---|---|---|---|
| `:81` | `FortressLibrary.fss:1961` | `\|_\|` not applicable to `Generator[\I\]` (`DelegatedIndexed`) | 629 | gone |
| `:82` | `FortressLibrary.fss:3720` | `\|_\|` not applicable to `Generator[\E\]` (`PairGenerator`'s `e`) | 629 | gone |
| `:83` | `FortressLibrary.fss:3720` | `\|_\|` not applicable to `Generator[\F\]` (`PairGenerator`'s `f`) | 629 | gone |
| `:84` | `FortressLibrary.fss:3798` | `\|_\|` not applicable to `Generator[\E\]` (`NaiveSeqGenerator.size`) | 629 | gone |
| `:85` | `FortressLibrary.fss:3800` | `\|_\|` not applicable to `Generator[\E\]` (`NaiveSeqGenerator`'s `\|self\|`) | 629 | gone |
| `:94` | `FortressLibrary.fss:4654` | filter expression not well typed (`x.size<=1`) | 629 | gone |
| `:132` | `FortressLibrary.fss:4654` | `Generator[\E\] has no getter called size` | 629 | gone |
| `:133` | `FortressLibrary.fss:4657` | `Generator[\E\] has no getter called size` | 629 | gone |
| `:108` | `FortressLibrary.fss:1848` | body has type `Generator[\(I, E)\]`, declared `Indexed[\(I, E),I\]` | 629 | gone |
| `:131` | `FortressLibrary.fss:130` | `BIG LEXICO`'s body has type `TotalComparison` | 488 | gone, not this rung's |
| `:4` | `FortressLibrary.fss:12` | the export error's 44 unmatched declarations | — | same |

- The export error's text differs only in its positions, shifted by the new lines, and in the order in which it lists the same 44 declarations, a set.
- `BIG LEXICO`'s body is a declaration the rung does not touch. Its loss is row 488's run-to-run variation, as in batch 12's rung R.
- No new site: none for `|_|`, none at `Indexed`'s api line, none in `SimpleIndexValuePairs` or in the new `cond`.
- The five families that declare `indexValuePairs` as `Generator` did not move: `List` stays 5 and `RangeInternals` 0. `PureList` and `Sparse` are not among the stage's twelve components.

No table is committed: the gate's tables on the merged tree are the record.

## 4. Where the fix belongs, and the precedent search

The place is the one library. The "for loops and generators" row of `explorations/coordinator/map/spec-to-implementation.md:246` gives walk's generators as the interpreter's library over any `Generator[\E\]`, and the nine sites are its declarations. No walk or checker change is needed: walk reads the library, and the checker refused the library's bodies, rightly, since a `Generator` declared neither a size nor an index.

The ways the language and the library offer, by shape (the judgement's sections 3.1 to 3.4 weigh them):

- Shape A:
  - (1) a counted default on `Generator`: taken.
  - (5) delete the three bodies and `DelegatedIndexed`'s api line: the judgement's alternative. It costs walk the sizes of a cross and a naive `seq`, and leaves a `DelegatedIndexed` type that defines only `indices` looping.
  - (8) a sized trait, with a `typecase` at each of five sites.
  - (10) a count written at each site.
  - (11) an `Indexed` cross, a later refinement.
- Shape B:
  - (3) one reduction carrying the ends: taken.
  - (4) a `typecase` on `Indexed[\E,ZZ32\]` keeping the index arm, which still reads from 0 and needs (3) as its second arm.
  - (2) retype the target `Indexed`, which retypes the generators of generators through contravariance.
- Shape C:
  - (6) an object over the indexed value: taken.
  - (9) `bounds.map(...)` for the whole pairs, refused on the api's contract wherever the indices are a proper subset of the bounds.
  - (2a) narrow `DelegatedIndexed.indices`.
  - (7) pairs typed `Generator`, which moves the error into `ivmap` and the mapped views.

The precedents, and their sites in the precedent's file:

- `Generator`'s derived defaults: `reverse`, `asString`, `map`, `seq`, `nest`, `filter`, `cross`, `mapReduce`, two `reduce`, `loop` and `opr IN` (`Library/FortressLibrary.fss:1146-1238` at the base). These are eleven operations derived from `generate`, which sized or sequential types override.
  - `opr IN` is the precedent line for `|self|`: a naive O(n) default (`:1237-1238`; `.fsi:826-828`).
  - The trait has had no size since the team's `98d4cda94` (2007), which moved `size` to `Indexed`.
- The relational family: Generator2's fused path is the one other place that checks an adjacent-pair relation, in one reduction carrying `Maybe` ends (`Library/Generator2.fss:207-229`, `takeleft` and `takeright` at `:52-57`).
  - The `Maybe` join inside one reduction is also `StringJoinReduction.join`'s (`Library/FortressLibrary.fss:4290-4300` at the base), the component's only other join of two `Maybe`s, spelled with nested bindings.
  - The rung spells the meet test the same way.
- Derived views of an indexed value are objects over it: `SimpleMappedIndexed` (`:3600-3618` at the base) and `SimpleReversedIndexed` (`:3776-3779`).
  - Index-value pairs are objects in three components: `PureList`'s private `IndexValuePairs` (`Library/PureList.fss:280-286`), `Set`'s `IndexValueSetGenerator` (`Library/Set.fss:151-162`) and `PrefixSet`'s `IndexValuePrefixSetGenerator` (`Library/PrefixSet.fss:475-485`).
  - `ReadableArray`'s own pairs map a range of indices and keep each index (`Library/FortressLibrary.fss:2000-2001` at the base).
- Batch 10's rung G (`compile-ladder/rung-generator-slips/REPORT.md`) repaired the other generator slips of the same file and left these nine. No other site in `Library/FortressLibrary.fss` reads a size or an index from a value typed `Generator`: the per-site list's other rows belong to other ledger rows.

## 5. What the specification settles, and the sentences made false

`Specification/advanced/parallelism-locality/defining-generators.tex:22-25` says: "An instance of `Generator[\E\]` only needs to define the generate method". A default keeps it true; an abstract declaration would not. The same file's early `SimplePairGenerator` reads `outer.size · inner.size` from two `Generator`s (`:320-338`), as `PairGenerator` does.

The specification says nothing of the relational predicate or of `indexValuePairs` outside the api: `grep -rln "relationalPredicate\|RelationalPredicate\|indexValuePairs" Specification --include=*.tex` prints nothing. Part IV renders the apis from the `.fsi` files, so the new api line reaches it when the PDF is rebuilt.

Sentences made false: none.

- No Appendix I entry, `\revision` or `\note{}` box speaks of a generator's size, the relational predicate or the default pairs. `grep -n Generator Specification/appendices/changes.tex` names only the `BlockedRange` example.
- The api comments of `Indexed` (`Library/FortressLibrary.fsi:1245-1248`) and `DelegatedIndexed` (`:1348-1354`) stay true.

## 6. Old against new: what walk prints

The programs were run under walk with `bin/fortress` in this tree, before the library edit (the base's code) and after it. They are scratch probes, quoted here.

Where walk stopped and now answers. The `stop` entries are `Failed to find any matching overload, args = (<type>)` for `|_|`, or the message given:

    |(0#10).filter(x MOD 3 = 0)|                 stop (SimpleFilterGenerator)                       ->  4
    |seq((0#10).filter(...))|                     stop (SimpleSeqFilterGenerator)                    ->  4
    |(0#3).nest(i => 0#i)|                        stop (SimpleNestedGenerator)                       ->  3
    |filter.map(2 x)|                             stop (SimpleMappedGenerator)                       ->  4
    |seq(OnlyGenerate(5))|, a naive seq           stop at FortressLibrary.fss:3800 (OnlyGenerate)    ->  5
    |OnlyIndices(6)|, DelegatedIndexed            stop at FortressLibrary.fss:1961 (filter)          ->  3
    increasing(filter of 0#10, x > 4)             Cannot find definition for method size given receiver SimpleFilterGenerator[\ZZ32\]  ->  holds
    increasing(array indexed from 5: 1,2,3,4)     FAIL: Index of dimension 1 out of bounds; got 3 which is not in 5#4 (and five more)  ->  holds
    increasing(array indexed from 5: 1,2,3,0)     the same FAIL lines                                ->  fails

The pairs' printed form, for `p = "abcd".indexValuePairs` and its relatives:

    p                         mapped((0,a),(1,b),(2,c),(3,d))                  ->  (0,a),(1,b),(2,c),(3,d)
    p.indices                 mapped(0,1,2,3)                                  ->  [0,1,2,3]
    p.reverse                 mapped((3,d),(2,c),(1,b),(0,a))                  ->  SimpleReversedIndexed((0,a),(1,b),(2,c),(3,d))
    p.indexValuePairs         mapped((0,(0,a)),(1,(1,b)),(2,(2,c)),(3,(3,d)))  ->  (0,(0,a)),(1,(1,b)),(2,(2,c)),(3,(3,d))
    zip's pairs               mapped((0,(1,x)),(1,(2,y)))                      ->  (0,(1,x)),(1,(2,y))
    CaseInsensitive AbC's     mapped((0,A),(1,b),(2,C))                        ->  (0,A),(1,b),(2,C)

The elements are the same, and in the same order. `p.reverse` generates `(3,d)` first before and after (`IndexValuePairsDefault.fss:21`). Its printed form is `SimpleReversedIndexed`'s own, which prints the value it reverses (`Library/FortressLibrary.fss:3778` at the base).

Skeptic's correction: two answers that walk gave do change, measured by the skeptic's programs on the old code and on this branch (`SKEPTIC.md`, section 3):

    increasing((0#10).reverse)            holds                          ->  fails (natural order 9, ..., 0; the base read x[0] to x[9])
    pairs of a value indexed from 5:
      pairs.bounds                        [0,1,2]                        ->  [5,6,7]
      pairs[0]                            (5,50)                         ->  (0, the value's own [0])
      pairs[5]                            IndexOutOfBounds stop          ->  (5,50)
      pairs.indexOf((6,60))               Just(1)                        ->  Just(6)

and walk answers where it stopped in more places than above: `cond` on a 2-D array (stopped at the base's `FortressLibrary.fss:4658`) and on a mapped generator; `p.reverse[0]` and `|p.filter(...)|` of default pairs.

Unchanged, and checked:

- `|p|` 4, `p[2]` `(2,c)`, `p[1#2]` `mapped((1,b),(2,c))`, `p[1#2][0]` `(1,b)`, `p[1:3]` `mapped((1,b),(2,c),(3,d))`;
- `"abcd".ivmap(...)` `mapped(0a,1b,2c,3d)`, `p.ivmap(...)` `mapped(00a,11b,22c,33d)`;
- `p.bounds` `[0,1,2,3]`, `"abcd".indexOf(c)` `Just(2)`, `seq(p)` `mapped(seq((0,a),(1,b),(2,c),(3,d)))`;
- the case-insensitive `cp[1#2]` `mapped((1,b),(2,C))`, and `|(0#3).cross(0#4)|` 12;
- `increasing` on a list, a range, an array slice, `0#0` and a one-element list.

What it costs, by reading (POSITIONS, "Interpreter performance is irrelevant."):

- `|g|` where walk answered is unchanged, by dispatch.
- Where `|g|` stopped, it is now O(n). It consumes a consumable generator and never ends on an endless one, as every other derived default of `Generator` does.
- `cond` is one O(n) reduction where it read a size and 2(n-1) subscripts.

## 7. The other checks

- The rung's own ladder subset:
  - The baseline's `explorations/compile-ladder/baseline-2026-09-19/ladder.tsv` names `Generator` in the first error of six files: `not_working_library_tests/GenTest3`, `GenTest4`, `GenTest8`, `HelperTest1`, `HelperTest2` and `HelperTest3`. No file's first error names `|_|`, a size, the pairs or the relational predicate.
  - The gate's ladder runs none of the six, so the comparand is the baseline. The drivers were copied under `tmp/rung-generator-size/ladder/` as `gate.md`, "The ladder regression", says, and run after the edit.
  - All six keep their phase and first error: disambiguate, "Type name may refer to: Generator, CompilerBuiltin.Generator", five times; link, "Unable to read serialized data for GeneratorLibrary$CommutativeMonoidReduction??", once.
  - The ladder compiles against the compiler's library, which the rung does not touch.
- Competing declarations: `grep -rn SimpleIndexValuePairs` finds only the new object and its one use. It searched `ProjectFortress/tests`, `compiler_tests`, `library_tests`, `other_compiler_tests`, `test_library`, `ProjectFortress/src/com/sun/fortress`, `Library/` and `ProjectFortress/LibraryBuiltin/`. `opr |self|` adds to `|_|`, which every number and indexed type already declares; the count and the suite show no ambiguity. No library or test declaration of `|self|` carries `override`, so batch 13's rung W's strict check does not reach one.
- One thread and four: the change touches no mutable state. The harness ran at four threads and the probes at one.
- The merged tree: `git merge-tree --write-tree HEAD origin/wip/<b>` finds no conflict with any of the other four rungs' pushed heads: `rung-size-expressions` `fbda64d4c`, `rung-array-bound` `816251130`, `rung-tuple-orders` `4f84f330a` and `rung-walk-override` `6bfd27720`. The gate runs the merged tree.

## 8. Points to report

1. **A value walk prints changes, and walk now answers where it stopped** (section 6). Skeptic's correction: two answers walk gave change, the relational predicate on a reversed indexed value and the default pairs of a value indexed from 5 (section 6); the other elements and answers stay.
   - Where it stopped, `|g|` now answers on a filter, a sequential filter, a nest, a mapped filter, a naive `seq` of an unsized generator, a cross of unsized generators and a `DelegatedIndexed` type that defines only its indices.
   - `cond` now answers on an unsized target, and on an array indexed from a nonzero bound, which it read outside the bounds.
   - Printed forms: a default pairs value prints as its elements, not `mapped(...)`. Its `indices` and `reverse` print as `[0,1,2,3]` and `SimpleReversedIndexed(...)`.
2. **Indexed's abstract `opr |self|` refused under the new concrete one**: not reached. The count draws nothing at `Library/FortressLibrary.fsi:1288`, and the line keeps `abstract`.
3. **A program walk refuses at load after the new declaration**: not reached. The interpreter suite ran 557 tests with 0 failures, and no meet and no `excludes` clause was added.
4. **A new api declaration beyond Generator's `opr |self|`, or a team declaration removed**: none. `SimpleIndexValuePairs` is not in the api. The bodies of the team's `cond` and default `indexValuePairs` are replaced, and their declarations stay.
5. **A gated test whose pin names `mapped(...)` for a default pairs value**: none. The suite is green. The `mapped(...)` pins of `ProjectFortress/tests/RangeDeclarations.fss:87-95` and `RangeBodiesWalk.fss:13-14` are the range kinds' own pairs and indices.
6. **A family that declares `indexValuePairs` as `Generator` moving on the distance**: none (section 3).
7. **A team test line changed**: none.
8. **A checker or walk edit**: none.

## 9. Decisions

1. **The pairs' range subscript maps the narrowed bounds** (`self.g.bounds[r].map(...)`, `Library/FortressLibrary.fss:3631-3632`).
   - On the base, `"abcd".indexValuePairs[1#2]` generates `(1,b),(2,c)`, and its first element is `(1,b)` (section 6).
   - The brief's `SimpleIndexValuePairs(g[r])` takes the pairs of the slice `"bc"`, which is numbered from 0, and would generate `(0,b),(1,c)`. That is a changed value. It goes against the brief's "No value walk prints today changes" and its test "passing before and after", and against the pairs' contract, since `(0,b)` is no pair of `"abcd"` ("`self[i] = v`", `Library/FortressLibrary.fsi:1268`).
   - The api names `(bounds())[r]` as the way to write a range subscript, and `ReadableArray`'s pairs map a range of indices and keep each index.
   - Not taken: `SimpleIndexValuePairs(g[r])`, or `g[r].indexValuePairs` as `Set`'s and `PrefixSet`'s own objects write it (`Library/Set.fss:160`, `Library/PrefixSet.fss:483`), which renumber; a sliced view object holding `g` and the range, a second new object.
   - Some type could have indices that are a proper subset of its bounds and inherit the default pairs. The library has none: the arrays define their own. For such a type, the slice holds a pair for each index in the narrowed bounds, as `|pairs|` counts `|g|`, the valid indices.
2. **The meet test is the component's nested `Maybe` binding**: `if a <- l1 then if b <- h2 then rel(a, b) else true end else true end` (`Library/FortressLibrary.fss:4676-4682`), as `StringJoinReduction.join` spells its join of two `Maybe`s. The ends are `if h1.holds then h1 else h2 end` and `if l2.holds then l2 else l1 end`. Not taken:
   - Generator2's `typecase (l1,h2) of (l1':Just[\E\], h2':Just[\E\]) => ...`, the precedent's own spelling; among the component's checked bodies, only `__bigOperator2` uses a tuple `typecase`.
   - `takeleft` and `takeright` as overloads on `Nothing[\T\]`, Generator2's spelling. `FortressLibrary` cannot import them, and they would add two top-level overloads to the prelude.
3. **`cond` calls `generate` with a `MapReduceReduction`**, as the brief and Generator2 do. Not taken: `target().mapReduce(...)`, the same reduction through the derived method.
4. **The default `|self|` counts with `mapReduce`**, as the brief writes it. Not taken: `SUM[\ZZ32\][_ <- self] 1`, which meets row 425; `generate` with `SumReduction[\ZZ32\]`, the same count spelled through a reduction object.
5. **`SimpleIndexValuePairs` follows `SimpleMappedIndexed`'s form**: a parameter `g0` and a getter `g`, `bounds` at the api's `CompactFullRange[\I\]`, no `size` getter (`Indexed`'s is `|self|`), and no own `reverse`, `ivmap` or `map`. Not taken: the brief's parameter name `g` without a getter; `SimpleMappedIndexed`'s wider `bounds(): Range[\I\]`.
6. **`GeneratorSize`'s cases.**
   - The brief lists the cross of two ranges among the cases that stop walk on the base. It answers 12 there (`|(0#3).cross(0#4)|`, by `PairGenerator`'s body, since a range has a size), so it is asserted among the passing-before cases.
   - The failing crosses are a filter crossed with `0#3` and with itself: the product, by `PairGenerator`'s own body.
   - A naive `seq` of a filter cannot be built, because `FilterGenerator.seq` answers `SimpleSeqFilterGenerator` (`Library/FortressLibrary.fss:3642` at the base). So the test takes a naive `seq` of a generator that defines only `generate`, and the sequential filter separately.
   - `Claimed` is added to show that a type's own size wins over the count.
7. **The relational predicate's value is read through `if _ <- c then`**, the binding the `if` chapter requires for a `Condition` (`Specification/basic/expressions/if.tex:49-54`). A plain `if c then` takes the `else` branch under walk whatever `c` holds (row 673, section 10).
8. **Row 673 is a ledger row, its `XXX` test owed**: the brief's files name three tests. Not taken: a fourth test file.

No decision of the curator's is reversed or bent; item 45 is built at the record's default, listed for his review.

## 10. Defects and their homes

**Home 1, repaired, with an assertion in a plain test:**

- row 629, shape A: `GeneratorSize.fss`, and the distance stage (five sites gone);
- row 629, shape B: `RelationalPredicateTargets.fss`, and the distance stage (three sites gone);
- row 629, shape C: the distance stage (one site gone), with `IndexValuePairsDefault.fss` for the values kept.

The row closes at the gather by the landed commit and `GeneratorSize`.

**A new row, home 2 owed (`row 673` in record.md):** under walk, an `if` whose clause is an object that is not `Boolean` runs its `else` branch, unless the object's type is named `Just` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:582-609`).

- With `object O end`, `if O then println("then") else println("else") end` prints `else` on the old code.
- The compiled checker refuses it: "Filter expressions in generator clauses must have type Boolean, but O had type O."
- The specification settles it: without a binding, the clause "must be an expression of type Boolean" (`Specification/basic/expressions/if.tex:49-54`).
- Its home is an `XXX` walk test with a `.test` naming the refusal. The rung's files name three tests, so the row is the record, reproducer `none`, with the command and its output in its notes.
- Skeptic's correction: the skeptic wrote that home, `ProjectFortress/tests/XXXIfClauseObjectWalk.fss` and its `.test` (`fc4e8e6ad`), and added row 674, the api's advice `(bounds())[r]` reading positions, with its home-3 test `RangeSubscriptPositions.fss`.

**Notes, not repairs:**

- row 488: `BIG LEXICO`'s body site (`Library/FortressLibrary.fss:130`) was lost in this run, with no edit of that declaration;
- row 425: why the default counts with `mapReduce`;
- row 577: the classes again.

## 11. Commands worked out

- The by-site comparison of section 3. A script maps each location, and each embedded `FortressLibrary.fs[si]:N`, of `errors.tsv` back to the base through the hunks of `git diff -U0 a1a75716a -- <file>`; a line inside a changed hunk maps to `+N`. It then compares the multisets of (kind, mapped location, message with columns masked) with the per-site list. The export error's 44 declarations were compared as a set.
- Probing walk's `if` on the old code: `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base13 <tree>/tmp/old-caches IfObjectClause.fss`, and the same with `compile`.

## 12. Questions for the curator

- Item 45 (Q45) is built at its default, ways 1, 3 and 6. `Generator`'s counted `opr |self|` is the one new api declaration, shown its precedent line, `opr IN` (section 1.1). Under the judgement's alternative, ways 5, 3 and 6, the declaration is dropped, the three bodies and `DelegatedIndexed`'s api line are deleted, and `GeneratorSize`'s failing half changes.
- The pairs' range subscript keeps each pair's index (decision 1), where the brief's example would renumber from 0, as `Set`'s and `PrefixSet`'s own pairs do. The record holds no decision on whether a slice of index-value pairs keeps its indices.
- Row 673's `XXX` walk test (home 2) is owed by a later rung. (Skeptic's correction: written, `XXXIfClauseObjectWalk`.)

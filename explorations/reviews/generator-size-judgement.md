<!--
The top-tier judgement on PLAN item 45, ledger row 629: library code that reads a size or an index from a value typed Generator, which declares neither, and Indexed's default indexValuePairs answering a Generator. Written 2026-10-09 by a Fable judge on the curator's go of 2026-10-09 ("let's bring some big guns to this fight"), for Pavol, who reads the section "For Pavol" and answers in one step. Reading only: nothing built, run or measured; every number is cited from the record (protocol principle 5). Read whole: explorations/reviews/generator-size-ways.md (the Opus ways worker's note, commit 665f46b78, cited below as "the note"); PLAN item 45 and phase 3's lines for batches 12 and 13; ledger row 629; compile-ladder/rung-generator-slips/REPORT.md sections 8, 12 and 14; POSITIONS ("The library's own practice is the standard.", "The type group's late positions outweigh the early text.", "Interpreter performance is irrelevant.", "The suite's verdict is the check.", "Test first, the test kept.", "Which decisions taken inside the work reach Pavol, and how.", "Asks and decisions."); process-engineering/library-extension-rule-archaeology.md sections 5 and 7; reviews/ranges-and-index-types.md; FACTS ("The compiled checker judges two functional methods by the Meet Rule for Functional Methods, per providing type ...", "Walk applies at load the Meet Rule for Functional Methods per providing type ..."); coordinator/CLIMB-BATCH-12.md, rung R, for the form of a library rung. Opened at the cited lines: Specification/basic/expressions/generators.tex, Specification/advanced/parallelism-locality/defining-generators.tex, Specification/preliminaries/overview.tex, Documentation/Specification/Prose/Language/Expressions/generators.tick, Library/FortressLibrary.fss and .fsi, Library/Generator2.fss, List.fss, PureList.fss, Set.fss, PrefixSet.fss, Sparse.fss, RangeInternals.fss, ChunkedSparseArray.fss, FileSupport.fss, SkipList.fsi, Avl.fss, CovariantCollection.fss, CompilerLibrary.fsi, ProjectFortress/not_working_library_tests/GenTest4.fss, Library/GeneratorLibrary.fss, the tests the note names, compile-ladder/gate/distance-sites.tsv, and the commits of 2007 to 2011 the note cites, with the message of 2f26aeded. Tree: main at 3c2e6f569, whose Library/ and Specification/ are those of f1f3e2694 (git diff --stat prints nothing).
-->

# A generator's size and index: the judgement (row 629, PLAN item 45)

## 1. The question, in plain words

A generator is anything a `for` loop or a big operator runs over. The library asks one thing of it: `generate`, which hands each element to a body and combines the results in the generator's natural order (`Library/FortressLibrary.fsi:729-753`; `Specification/advanced/parallelism-locality/defining-generators.tex:22-25`, "only needs to define the generate method"). An indexed value is a generator that also has an index set, a subscript `x[i]`, bounds and a size `|x|` (`fsi:1248-1317`). A list, a range, an array and a string are indexed. A filtered generator, a nested one, a mapped one and a cross of two generators are not.

Nine lines of the library are refused by the compiled checker because they ask a value typed `Generator` for what only `Indexed` promises (the note, section 1; `compile-ladder/gate/distance-sites.tsv` rows 81 to 85, 94, 108, 132 and 133):

- Shape A, 5 sites: `|x|` on a `Generator`. `DelegatedIndexed`'s `|self| = |self.indices|` (`fss:1961`), `PairGenerator`'s `|self.e| |self.f|` (`fss:3720`, two errors) and `NaiveSeqGenerator`'s `size` and `|self|` from `|g|` (`fss:3798`, `:3800`).
- Shape B, 3 sites and one hidden: `RelationalPredicateCondition.cond` reads `x.size` twice and then `x[i]`, `x[i+1]` on `x = target()`, a `Generator[\E\]` (`fss:4650-4661`). The index at `:4658` has no row yet because the checker stops before it; any repair that gives `x` a size and no index uncovers it (the note, section 1, shape B).
- Shape C, 1 site: `Indexed`'s default `indexValuePairs` maps `self.indices`, a `Generator`, so it answers a `Generator` where `Indexed[\(I,E),I\]` is declared (`fss:1847-1848`).

Walk runs all nine, because it dispatches on run-time types and every value that reaches them is sized at run time (`rung-generator-slips/REPORT.md` section 8). The checker's refusals are the static check the specification asks for: a call is "statically checked to ensure that some definition will be applicable at run time" (`Specification/preliminaries/overview.tex:707-710`). So the checker is right and the library is wrong, and the fix is the library's.

The question for the curator: where do a size and an index live? On every generator, counted when unknown; only on indexed values, asked for by type; or both. The note lists eleven ways and takes the question through the nine steps. This judgement weighs them and recommends one combination.

## 2. What the evidence settles

### 2.1 The nine sites come from three moments, none a design

The note's step 7, confirmed at the commits:

- 2007-05-11, `f1f435b11` (Maessen): `Generator` declares `getter size(): ZZ32`, abstract, so every generator had to define a size. The pair's size `e.size() f.size()` and the naive `seq`'s `g.size()` are written against it.
- 2007-09-13, `98d4cda94` (Maessen, "Fixed bugs in demos due to library refactoring"): `size` and `isEmpty` move from `Generator` to `Indexed`. The pair's and the naive `seq`'s sizes stay behind. Shapes A2 and A3 date from here. What the team removed was an obligation on every generator, not the idea that a generator can be counted.
- 2007-09-19, `226481530`: `indices(): Indexed[\I,I\]` and `indexValuePairs(): Indexed[\(I,E),I\]`, each defined by default from the other. Shape C's body is well typed here, and so is `DelegatedIndexed`'s `|self.indices|` when it is written on 2008-10-07 (`0948c2b1c`).
- 2008-10-08, `2f26aeded` (Maessen): `indices` becomes `Generator[\I\]` in the api and the component. The message is a bug fix, not a design: "Should fix bugs in demos by cleaning up missing method printing and fixing the missing method problem (caused by adding a spurious abstract method declaration that shadowed the necessary concrete method)." The same commit declares the rank-2 and rank-3 ranges' `indices` as `Generator` in `RangeInternals.fsi`, because their bodies build a `cross`, and a cross is not an `Indexed` (`Library/RangeInternals.fss:1132`). Shapes A1 and C1 are what that retyping left ill-typed.
- 2008-12-12, `178e1585d` (Emoto): `RelationalPredicateCondition` with `target(): Generator[\E\]`, `x.size()` and `x[i]`. Shape B was ill-typed from its first line.
- 2011-11-21, `299e4ee24` (Steele): the restructured generators of `GenTest4.fss`. Its `PairGenerator` has no size (`:307-316`) and its naive `seq` is commented out (`:107`). Its `Generator` has no size either; the only sizes in the file are `Condition`'s, commented out (`:383-390`, `:431-447`). This code is in `not_working_library_tests/`, and `Library/GeneratorLibrary.fss`, which carries the same declarations, is reachable by no program (`.claude/skills/fortress-repo/references/library.md`).

### 2.2 The specification

- "An instance of `Generator[\E\]` only needs to define the generate method" (`defining-generators.tex:22-25`). A default on `Generator` keeps this sentence true; an abstract declaration would not.
- The text's own `SimplePairGenerator` declares `size : ZZ64 = outer.size · inner.size` with `outer : Generator[\A\]` (`:320-338`). So the specification reads a size from a `Generator`, exactly as shape A2 does. The example belongs to the 2007 design, and its `join` and `Monoid` signatures are also older than the library's.
- The generators section lists `a.indices`, "the index set of array a", among the common generators (`basic/expressions/generators.tex:95-102`), and says nothing about a generator's size.
- Part IV renders the apis from the `.fsi` files when the specification is built (`.claude/skills/fortress-repo/references/specification.md`; `Specification/library/default-libraries.tex:27`). So `Indexed`'s documentation of `|self|`, `bounds`, `indices` and the pairs (`fsi:1229-1283`) is specification text, and an api change reaches Part IV with no edit of a `.tex` file.
- The team's later restart, `Documentation/Specification/Prose/Language/Expressions/generators.tick`, has no passage on a generator's size or on `Indexed` (grep for `size`, `Indexed`, `indices`: nothing). The papers have none either (the note, step 3).
- The compiler's prelude, the type group's own `GeneratorZZ32`, has `generate`, `loop`, `filter`, `seq` and `opr IN`, and no size (`Library/CompilerLibrary.fsi:111-122`); its commented `Condition` keeps `size` and `|self|` (`:194-202`). It is deleted at the switch-over and settles nothing here.

None of the type group's late positions that POSITIONS names (the exclusion rule, specialization, the flat tower, the 2012 write-up, the 2019 paper) speaks of a generator's size. So "The type group's late positions outweigh the early text" is not engaged. What the later record shows is a direction: since 2007 the team's library has had no size on `Generator`, and Steele's unreachable 2011 code has none on pairs.

### 2.3 The library's own ways, by family

Each repair below is something the library already does in the same family (the note, section 2 and step 5):

- `Generator` is a trait of defaults derived from `generate`: `reverse` (`fss:1146`), `asString` (`:1147`), `map` (`:1171`), `seq` (`:1174`), `nest` (`:1186-1187`), `filter` (`:1192-1193`), `cross` (`:1220-1221`), `mapReduce`, `reduce`, `loop` (`:1227-1236`) and `opr IN`, "By default this is implemented using the naive O(n) algorithm" (`fsi:826-828`; `fss:1238`). A sized or sequential type overrides each by dispatch. A counted `|self|` is the one derived operation the trait lacks, and three of its own subtypes and the specification's example read it (section 2.1).
- The relational family checks the same adjacent-pair relation with no size and no index: `Generator2`'s fused path runs one reduction in the natural order, each partial result carrying its first and last elements as `Maybe`, and tests `rel(l1, h2)` where two partial results meet (`Library/Generator2.fss:207-229`, with `takeleft` and `takeright` at `:52-57`). The same family also tests a generator for `Indexed[\E, ZZ32\]` with a fallback (`initsImpl`, `:119-131`).
- Derived views of an indexed value are objects over it: `SimpleMappedIndexed` for the default `map` (`fss:1895`, `:3600-3619`), `SimpleReversedIndexed` for `reverse` (`:1852`, `:3776-3779`). Index-value pairs in particular are objects in three components: `PureList`'s private `IndexValuePairs` (`Library/PureList.fss:177`, `:280`), `Set`'s `IndexValueSetGenerator` (`Library/Set.fss:151-162`) and `PrefixSet`'s `IndexValuePrefixSetGenerator` (`Library/PrefixSet.fss:475-485`).
- Where a value is a range, the overrides narrow `indices` to it: `String` (`fss:4158`), `CaseInsensitiveString` (`Library/CaseInsensitiveString.fss:27`), `ReflectTuple` (`Library/Reflect.fss:345`), `List` (`Library/List.fss:277`), `Condition` (`fsi:908`).

### 2.4 The peers

From the note's step 6, each read at its own source: Scala's `size` answers `knownSize` when known and otherwise counts; Haskell's `Foldable.length` is a fold that arrays override; Swift's `Sequence` has no `count` and its `Collection` does; C#'s LINQ `Count()` tests for `ICollection` at run time and otherwise enumerates; Java's `Spliterator` carries `SIZED`. Two peers put a counted size on every collection, three keep it on the sized kind and test at run time. Fortress dispatches on every argument at run time, so a counted default on `Generator` costs nothing for a type that declares its own `|·|`: dispatch picks the type's declaration, as Scala's override and Haskell's class method do.

### 2.5 What the type system allows

- Generics are invariant, so a `typecase` at a generic site can test only an index type it can name (`reviews/ranges-and-index-types.md`, point 5; the note, way 4). That limits way 4 to shape B, where the index type is `ZZ32`.
- An arrow type is contravariant in its parameter (`Specification/basic/types-vals-vars.tex:411-416`). Retyping `cond`'s target `Indexed` retypes every predicate on it, and so `Generator2`'s element type, its `filter`, `theorems` and `theoremsFiltered`, and `inits`, `tails` and `segs` (the note, way 2). That is why way 2 is large.
- The Meet Rule for Functional Methods is applied per providing type, by the checker and by walk at load: "every type that provides both must provide the meet" (FACTS, "The compiled checker judges two functional methods by the Meet Rule for Functional Methods, per providing type ..."; "Walk applies at load the Meet Rule for Functional Methods per providing type ..."). A new `|self|` on `Generator` meets another `|self|` only in a type that extends both. `Indexed`, `Condition` and every sized generator extend `Generator`, so theirs are more specific. `SkipList` (`Library/SkipList.fsi:19-26`), `Avl` (`Library/Avl.fss:16-24`) and `CovariantCollection` (`Library/CovariantCollection.fss:98`) declare `|self|` and do not extend `Generator`, and no type extends one of them and a generator. `Char` is an object (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:228`). The numbers are excluded by `Generator excludes { Number }` (`fsi:731-732`). So the note's concern that way 1 needs a meet or an `excludes` for `SkipList` is answered by FACTS: it does not.
- The checker today draws no row for a getter that overrides with a wider type (the five families that declare `indexValuePairs` as `Generator`, the note, way 7). That is unmeasured and no way below relies on it.

### 2.6 What reaches the bodies under walk, and what microGPT reaches

By the note's section 1, read against the library: shape A1 runs for no type, since every `DelegatedIndexed` type declares its own `|self|`; A2 and A3 run only when a program asks the size of a cross or a naive `seq`, which nothing in the tree does; B1 runs in four tests, `Generator2Test`, `GeneratorDeclarations`, `ExclusionRemainderRungH` and `LibraryMeetDeclarations`, whose targets are lists, ranges, array slices and the elements of `inits`, all `Indexed[\E,ZZ32\]` counted from 0; C1 runs for the `String` family, `DefaultZip`, `CaseInsensitiveString`, `ReflectTuple` and the index-value generators of `Set` and `PrefixSet`, whose `indices` are ranges, so the declared type holds at run time. The scalar and the rank-2 and rank-3 range kinds declare their own `indexValuePairs` (`Library/RangeInternals.fss:1276`, `:1392`, `:1428`, `:1464`, `:1650`, `:1685`), so the pins at `ProjectFortress/tests/RangeDeclarations.fss:87-95` do not go through C1. MicroGPT reaches none of the nine (`explorations/run-c4/src/`, grep: its `ivmap` calls go to the arrays' own).

## 3. The ways, weighed

### 3.1 Shape A: way 1 against way 5

Way 1 gives `Generator` an `opr |self| : ZZ32` whose default counts the elements through `generate`. Way 5 deletes the three bodies (`PairGenerator`'s, `NaiveSeqGenerator`'s and `DelegatedIndexed`'s `|self|`) and `DelegatedIndexed`'s api line. The note puts way 5 first, as "the team's latest word". I put way 1 first, for five reasons.

1. It is `Generator`'s own pattern. The trait already derives eleven operations from `generate` and lets sized types override them (section 2.3). The archaeology's rule for an extension is "it has an operation ... for one ... and lacks it for another; write the missing one in the shape of the one it has, and cite that line" (`library-extension-rule-archaeology.md` section 5, point 2). The line is `opr IN`'s naive default (`fss:1238`; `fsi:826-828`).
2. It changes no body the team wrote. A1, A2 and A3 type as they stand. Way 5 deletes them and leaves `Indexed`'s two defaults, `size` from `|self|` and `|self|` from `size` (`fss:1834`, `:1864`), as the only ones: a type that extends `DelegatedIndexed` and defines only `indices`, as the api invites ("it is only necessary to define either indexValuePairs() or indices()", `fsi:1343-1346`), counts its indices today and would loop forever under way 5. The api's sentence would have to change to add `|self|`. Way 1 keeps the convenience trait convenient.
3. The 2007 move is not against it. What `98d4cda94` removed was an abstract `size` that every generator had to define. A counted default imposes nothing on anyone. Steele's 2011 code drops the pair's size because its `Generator` has no size at all, in a file no program can reach; it is not a word against a default.
4. The specification's own example reads a size from a `Generator` (section 2.2), and the sentence "only needs to define generate" stays true.
5. Two peers do exactly this, and Fortress's dispatch makes the default free where a type knows its size (section 2.4).

What way 1 costs, and way 5 does not:

- One declaration added to the api, rendered in Part IV. No `\revision` and no Appendix I entry: no `.tex` sentence changes.
- Where walk stops today, `|g|` on a filter, a nest, a map, a naive `seq` or a cross of unsized generators, it now answers a count. Counting runs `generate`: on a `FileGenerator`, which is `Consumable` (`Library/FileSupport.fss:147-149`), the count consumes the file; on an endless generator it never returns. Every other default of `Generator` already behaves so on those values (`asString`, `IN`, any reduction), and Scala documents the same for `size`.
- No `excludes` clause anywhere, by the per-providing-type rule (section 2.5).

What way 5 costs, and way 1 does not: `|a.cross(b)|` and the size of a naive `seq` stop walk instead of answering; `DelegatedIndexed` loses its size derivation and its api sentence; a new `DelegatedIndexed` type that defines only `indices` loops at run time.

The other A ways: way 8 (a non-generic sized trait, with a `typecase` at each of the five sites) adds a trait, five `typecase` bodies and the exclusions `AnyMaybe` needed, for the same five sites; way 10 (a count written at each site) is way 1 written five times with no declaration, which is what the specification's and the library's derived-default style exists to avoid; way 11 (an `Indexed.cross(Indexed)` answering a sized pair) is a sound later refinement, since the api says `cross` is "specifically designed to be overloaded" (`fsi:766-768`), but it clears A2 and A3 only, needs a static parameter for the argument's index type, and is not needed to reach zero. It stays available after way 1, as an override of the counted default.

### 3.2 Shape B: way 3 against way 4

Way 3 rewrites `cond` as one reduction carrying the two ends, the device its own family already uses at `Generator2.fss:207-229`. Way 4 tests the target for `Indexed[\E,ZZ32\]` and keeps today's body in that arm.

Way 3 is the better repair:

- It needs neither a size nor an index, so it clears the three rows and the hidden index at `:4658` together. Way 4 keeps the index inside its first arm and needs a second arm for every other generator; way 3 is the natural second arm.
- It is correct where today's body is not. Today's body reads `x[i]` for `i` in `0#sz`, assuming indices from 0. An array whose lower bound is not 0 (`toArray` builds such an array with `shift`, `fss:1941-1947`) is read out of its bounds today, a stop or a wrong element, by reading. The reduction reads no index.
- It gives the same Boolean for every target that answers today. `generate` combines results "following the natural order of the generator" (`fsi:747-748`), and the join tests the relation exactly where two neighbours meet; the empty tuple `(true, Nothing, Nothing)` is neutral, as the family's `zero1` is (`Generator2.fss:224`). Empty and one-element targets give `true`, as today's `x.size <= 1` branch does.
- It changes no type. `target(): Generator[\E\]`, the predicates and `Generator2` stay as declared (`fsi:2663-2670`). Way 2's retyping of the generators of generators is not needed.

Its cost: one parallel reduction with a three-field tuple per element, in place of a size read and 2(n-1) index reads. On a list, an array or a range both are O(n); the fused path already pays it. No interpreter timing bears on it (POSITIONS, "Interpreter performance is irrelevant."), and microGPT does not reach it.

### 3.3 Shape C: way 6 against ways 2a, 9 and 7

Way 6 makes the default `indexValuePairs` an object over `self`, as `map` and `reverse` already are and as `PureList`, `Set` and `PrefixSet` already build their pairs (section 2.3). It generates over `self.indices`, subscripts at `i` to `(i, self[i])`, takes `self.bounds` and `|self|`, and cuts by a range through `self[r]`.

- Way 9, `self.bounds.map(...)`, breaks the pairs' documented contract, "stripping away the i yields exactly the results of v <- self" (`fsi:1265`), wherever the indices are a proper subset of the bounds, as the sparse array's are (`Library/ChunkedSparseArray.fss:55`). Rejected on the api's own text.
- Way 2a narrows `DelegatedIndexed.indices` and makes the default `indexValuePairs` abstract, copying it into every type whose `indices` is a range. It changes the api's sentence on what a type must define (`fsi:1240-1243`) and needs new `indices` bodies for the rank-2 and rank-3 ranges, which extend `DelegatedIndexed` and build a cross. More change for the same one site.
- Way 7, pairs typed `Generator`, moves the error into `ivmap`, `ReversedIndexed`, `SimpleMappedIndexed` and `SimpleMappedSeqIndexed` (the note, way 7).

Way 6 keeps the contract, changes no declared type, and clears the site. Its one visible change: a pairs value that inherits the default prints as the bare element list, `Generator`'s `asString` (`fss:1147`), where today's mapped range prints `mapped(...)` (`fss:3580-3584`). By reading, no gated test asserts the printed form of such a value: the asserted `mapped(...)` strings are the range kinds' own pairs (section 2.6), and `IndicesGetterCalls.fss:15` and `PrefixSetIndices.fss:16-18` read the pairs' `indices`, which the set generators define themselves. The rung's gate is the check.

### 3.4 Way 2 whole, and way 0

Way 2 restores `indices(): Indexed[\I,I\]` and types the relational target `Indexed[\E,ZZ32\]`. It is coherent: the 2008 retyping was a bug fix, the api's own text ties `indices` to the index component of an `Indexed` pairs value (`fsi:1274-1280`), and the default `indices` body, `self.indexValuePairs.map(first)`, already answers an `Indexed` at run time. But it clears five sites at the price of new `indices` bodies for the rank-2 and rank-3 ranges and the sparse array, and of retyping the generators of generators through contravariance (section 2.5); it does not touch A2 or A3. Way 11 is the piece that would make it cheap, an `Indexed` cross. That is a later refinement, not this row's repair.

Way 0 leaves nine rows in the distance; phase 3 cannot reach its true zero while they stand (PLAN item 45).

## 4. The recommendation: ways 1, 3 and 6

**What it changes in the library.**

- `Generator` gains `opr |self| : ZZ32`, declared in the api after `opr IN` (`fsi:829`) and given a default in the component (`fss:1238`'s neighbourhood) that counts by `mapReduce` over `generate`: `self.mapReduce[\ZZ32\](fn (_:E):ZZ32 => 1, fn (a:ZZ32, b:ZZ32):ZZ32 => a + b, 0)`. `mapReduce` rather than `SUM`, so that the body does not meet row 425's rewriting of a reduction by its element type. The api comment says what `opr IN`'s says: a naive O(n) default that sized types override. A1, A2 and A3 stay as written.
- `cond` (`fss:4651-4661`) becomes one `generate` with a `MapReduceReduction` whose element is `(Boolean, Maybe[\E\], Maybe[\E\])`, in the shape of `Generator2.fss:207-229`, with `takeleft` and `takeright` written in place (they are `Generator2`'s, not the prelude's). `relation()`, `target()` and the api are unchanged.
- One object beside `SimpleMappedIndexed` (`fss:3600`), for example `SimpleIndexValuePairs[\E,I\](g: Indexed[\E,I\]) extends Indexed[\(I,E),I\]`, with `generate` over `g.indices`, `opr[i] = (i, g[i])`, `opr[r] = SimpleIndexValuePairs(g[r])`, `bounds`, `indices` and `|self|` from `g`, and a `seq` over `seq(g.indices)`. The default at `fss:1847-1848` answers it. Its own `indexValuePairs` is the inherited default, pairs of pairs, well typed. The api does not declare it, as it does not declare `SimpleMappedIndexed`.

**What it changes elsewhere.** Nothing in the checker, nothing in walk's Java, nothing in `Specification/`: Part IV renders the new api line, `defining-generators.tex:22-25` stays true, and the `SimplePairGenerator` example (`:320-338`) is left as the early text it is. No Appendix I entry, since no sentence of the text changes.

**The sites it clears.** A1 (1), A2 (2), A3 (2) by way 1; B1's three by way 3, with no index left to uncover; C1 (1) by way 6. Nine of the 153, the distance 153 to 144 by reading, row 629 closed at the gather.

**Which walk values change.** None that walk answers today, by reading (section 2.6). What changes:

- `|g|` answers a count on a filter, a nest, a map, a naive `seq` and a cross of unsized generators, where walk stops today. A consumable generator is consumed by the count; an endless one never returns.
- `cond` answers on an unsized target and on an array with a nonzero lower bound, where walk stops today or reads outside the bounds.
- A default pairs value prints as a bare list, not `mapped(...)`; its run-time type is the new object.

**Which costs change.** `|·|` where it answered today: unchanged, since dispatch picks the type's own declaration. `|·|` where it stopped: O(n). `cond`: one O(n) reduction in place of a size read and 2(n-1) subscripts, the same order on every target the tests use. The pairs: the same order as the mapped range. Compiled cost is unmeasurable until the compiled path runs the one library, and microGPT reaches none of it.

**What it reverses or bends.** No decision of the curator's. The record holds none on a generator's size, and the three named rules are followed: the library's own way in each family, the precedent line cited for the one extension (`opr IN`), the refusing rule answered by what the library does instead. It takes none of item 45's three listed ways as written: the count by a reduction becomes one default instead of five bodies, `bounds` for `indices` is refused on the api's contract, and the `Indexed` retyping is set aside as the larger redesign. Stated plainly for him: way 1 gives `Generator` back, as a default, the size the team removed from it as an obligation in 2007, and keeps three bodies that Steele's unreachable 2011 restructure dropped. That leans toward the specification's early example on a point where no late position of the type group speaks.

**The alternative to state beside it.** Ways 5, 3 and 6, the note's reading: deletions instead of a declaration. It clears the same nine, adds nothing to the api, and costs `DelegatedIndexed` its size derivation and its api sentence, and walk the two sizes it answers today for a cross and a naive `seq`. If Pavol prefers no new declaration on `Generator`, this is the combination, and the rung below changes only in its first point and its first test.

## 5. The rung for batch 14

One library rung, in the form of batch 12's rung R (`coordinator/CLIMB-BATCH-12.md`, section 3, R). It touches no declaration of item 15's checker rung, of fork 3's rung, of the self-typed bodies (the number section) or of the tuple comparisons (item 43), and builds on nothing of its own batch.

**Rows.** 629, nine sites, by row and line.

**Files.**

- `Library/FortressLibrary.fss`: `Generator` (`:1140-1240`, one declaration with its comment); `Indexed`'s default `indexValuePairs` (`:1847-1848`); one new object beside `SimpleMappedIndexed` (`:3600`); `cond` (`:4651-4661`).
- `Library/FortressLibrary.fsi`: `Generator` (`:729-829`, one declaration with its comment).
- `ProjectFortress/tests/`: three new tests, named by topic.
- Not: the checker, walk's Java, `Specification/`, `Library/RangeInternals.*`, `Generator2.*`, `List.*`, `Set.*`, `PureList.*`, `Sparse.*`, the team's test lines, `Indexed`'s api comment at `fsi:1240-1243`, which stays true, and `DelegatedIndexed`'s at `fsi:1343-1349`, likewise.

**Tests, first** (POSITIONS, "Test first, the test kept."; the harness reads a thrown exception as red, so a walk stop on the base is a failing test).

- `GeneratorSize.fss` (walk): `|·|` of a filtered range, a nested generator, a mapped generator, a cross of two ranges (the product, by `PairGenerator`'s own body), a naive `seq` of a filter, and a type that extends `DelegatedIndexed` and defines only `indices` (the shape of `ProjectFortress/tests/spuriousSelf.fss:44-52`), each value asserted. Every case stops walk on the base and passes after. Beside them, `|·|` of a list, a range, a string and an array, asserted, passing before and after: the dispatch to the type's own size.
- `RelationalPredicateTargets.fss` (walk): `relationalPredicate` applied to a list, a range, an array slice `xs[0:i]`, an array with a nonzero lower bound (`toArray`'s shape, `fss:1941-1947`), a filtered generator, an empty generator and a one-element generator, each `cond` value asserted through `if`. The shifted array and the filter fail on the base. The four tests that reach B1 (section 2.6) keep their verdicts.
- `IndexValuePairsDefault.fss` (walk): the pairs of a string, a `DefaultZip` and a `CaseInsensitiveString`: their elements in order, `|pairs|`, `pairs[i]`, `pairs[r]`, and `ivmap` through them, asserted; passing before and after, since C1 is a type-only repair. For C1 the failing-then-passing test is the distance stage, before from the last landed gate's tables and after once on the rung's tree, read by row, as rung R did for rows 654 and 655.
- Keep their verdicts: `IndicesGetterCalls`, `PrefixSetIndices`, `RangeDeclarations`, `GeneratorDeclarations`, `spuriousSelf`, `MapTest`, `HeapTest`, `Region`, the team's generator tests.
- After the edit: the interpreter suite once, since walk reads the library; the count and distance stages; the ladder regression (microGPT compiles, reaching none of the nine by reading).

**The first measurements, each with its fallback.**

- The distance stage: the nine rows gone, no new `|_|` row, no row at `Indexed`'s api line `abstract opr |self|` (`fsi:1283`), which now sits under a concrete inherited declaration for the first time. If the checker refuses that redeclaration, the api line drops `abstract`; the component's body `= self.size` (`fss:1864`) is unchanged either way.
- The interpreter suite: no program refused at load. By FACTS (section 2.5) no meet is needed; if walk's check asks for one, the suite names the type, and an `excludes` clause in the shape of `Generator excludes { Number }` is the library's answer.
- The pairs' printed form: any gated test that asserts `mapped(...)` for a default pairs value changes its pin, listed for him with its before and after. By reading there is none.

**Specification.** None. Part IV renders the new declaration when the PDF is rebuilt (`specification.md`, the api listings).

**Ledger.** Row 629 closed at the gather by the rung's commit and `GeneratorSize`; a note on what walk now answers where it stopped. No new row: the hidden index at `:4658` never surfaces.

**Listed for his review at the landing** (POSITIONS, "Which decisions taken inside the work reach Pavol, and how.", "Reversible stops do not hold a batch."): the three walk changes of section 4, each reversible by reverting the declaration, the body or the object.

## 6. What the record does not hold, and what this leaves open

- Way 11, an `Indexed.cross` taking an `Indexed` and answering a sized pair indexed by the pair of indices, as the api invites (`fsi:766-768`) and as `FullRange2D` already is in effect (`Library/RangeInternals.fss:1125-1140`). It would let `indices` return to `Indexed[\I,I\]` cheaply one day (way 2). Not needed for zero; a later library rung, if he wants the 2007 typing back.
- The five families that declare `indexValuePairs` as `Generator` where the api says `Indexed` (`List`, `PureList`, `Sparse`, the rank-2 and rank-3 ranges; the note, way 7) draw no row today, and why the checker accepts a wider getter override is unmeasured. Not this row's; worth one line in the next checker rung's brief.
- Whether the checker accepts an api's `abstract` redeclaration under a concrete inherited one (section 5, first measurement).
- The `SimplePairGenerator` example of `defining-generators.tex:320-338` is older than the library in its `join`, `Monoid` and `size` signatures. Under way 1 its `size` line is the only one that types again, as `|outer| · |inner|`. A specification rung may one day restate the example in the library's shape; nothing here needs it.

## For Pavol

**The question.** Nine of the checker's 153 refusals. A *generator* is anything a `for` loop or a `SUM` runs over; it promises only `generate`. An *indexed* value is a generator with a size and a subscript: a list, a range, an array. Five lines ask a plain generator its size, three ask a size and a subscript, one promises an indexed value and gives a plain generator.

**What we do.**

- Give every generator a size, `|g|`, counted by running it. A list or a range keeps its own instant size: the most specific declaration runs. `Generator` already derives `IN` and `map` so. The five lines then type.
- Rewrite the relational check ("every neighbour pair satisfies the relation") as one pass carrying each part's first and last element, as its family does. No size, no subscript.
- Build the default index-value pairs as a small object, as `map` and `reverse` are.

**What it changes.** Library only: one declaration, one body, one object. Nothing in the checker, walk's Java or the specification. No value walk prints changes. `|g|` now answers on a filter where walk stopped; it consumes a file generator, never ends on an endless one. The pairs print as a bare list.

**What it reverses.** None of your decisions. It gives `Generator` back, as a default, the size the team removed in 2007 as an obligation.

**Cost.** One library rung in batch 14, tests first; the distance 153 to 144.

**Recommendation.** Yes to all three; default yes.

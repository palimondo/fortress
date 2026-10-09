<!--
Every way to clear row 629 (PLAN item 45): library code that reads a size or an index from a value typed Generator, and Indexed's default indexValuePairs answering a Generator. Written 2026-10-09 by an Opus ways worker for the Fable judge who will recommend one way to Pavol; reading only, on main at f1f3e2694; nothing built, run or measured. The nine sites are those of compile-ladder/gate/distance-sites.tsv, written by climb batch 12's gate at 32b88cd3b; Library/ and Specification/ are unchanged from that commit to f1f3e2694 (git diff --stat prints nothing). Sources: the record the brief names (PLAN item 45; compile-ladder/rung-generator-slips/REPORT.md section 8; ledger row 629; POSITIONS, "The library's own practice is the standard."; reviews/ranges-and-index-types.md); Library/ (FortressLibrary, Generator2, GeneratorLibrary, List, PureList, Set, PrefixSet, Sparse, ChunkedSparseArray, RangeInternals, FileSupport, SkipList, CompilerLibrary); ProjectFortress/tests and not_working_library_tests/GenTest4.fss; Specification/ and Specification-1.0-frozen/; Papers/; the git history from 2007, with research/authorship.md for the logins; the peers' own sources, fetched 2026-10-09 (step 6).
-->

# A generator's size and index: every way (row 629, PLAN item 45)

Nine of the 153 errors the compiled checker reports on the one library belong to row 629. Library code reads a size or an index from a value typed `Generator`, which declares neither. And `Indexed`'s default `indexValuePairs` answers a `Generator` where an `Indexed` is declared. Walk runs these bodies: it dispatches on run-time types, and the values are sized at run time (`compile-ladder/rung-generator-slips/REPORT.md`, section 8).

This note groups the sites by shape, lists every way, and takes the question through the nine steps (`explorations/protocol.md`, principle 2). It ends with a reading, marked as mine. It decides nothing.

**Terms.**
- `Generator[\E\]`: anything a `for` loop or a big operator runs over. It must define only `generate` (`Library/FortressLibrary.fsi:729-731`).
- `Indexed[\E,I\]`: a generator with an index type `I`, `bounds`, `indices`, `indexValuePairs`, a size and a subscript `[i]` (`fsi:1248-1317`).
- Size: the operator `|x|`, or the getter `x.size`, which the api calls deprecated (`fsi:1253-1254`).
- `indices`: the indices of the elements, which "may in general be a subset" of `bounds` (`fsi:1274-1280`).
- The distance: the checker's per-site list over the twelve measured units (`compile-ladder/gate/distance-sites.tsv`; the units at `explorations/coordinator/tools/distance/run.sh:83-85`).
- `fss` and `fsi` without a directory are `Library/FortressLibrary.fss` and `.fsi`.

## 1. The nine sites, by shape

Row 629 cites these lines at `9c9e823d5`. The same lines are 18, 33 or −4 lines away today.

**Shape A: a size read by `|·|` from a value typed `Generator` (5 sites).** The message is the same at all five: "Could not check call to operator |_| ... is not applicable to an argument of type Generator[\I\]" (or `[\E\]`, `[\F\]`).
- A1. `DelegatedIndexed`'s `opr |self| : ZZ32 = |self.indices|` (`fss:1961`), 1 site. The `Generator` is `indices` (`fss:1859`, `fsi:1280`).
- A2. `PairGenerator`'s `opr |self| : ZZ32 = |self.e| |self.f|` (`fss:3720`), 2 sites, one for each factor. The getters `e` and `f` are typed `Generator` (`fss:3715-3716`). A pair is what `Generator`'s default `cross` builds (`fss:1220-1221`).
- A3. `NaiveSeqGenerator`'s `getter size() = |g|` and `opr |self| : ZZ32 = |g|` (`fss:3798`, `:3800`), 2 sites, with `g: Generator[\E\]` (`fss:3796`). It is what `Generator`'s default `seq` builds (`fss:1174`).

**Shape B: a size read by `.size`, and behind it an index, from a value typed `Generator` (3 sites).**
- B1. `RelationalPredicateCondition.cond` (`fss:4651-4661`). Here `x = target()` is typed `Generator[\E\]` (`fss:4650`).
  - `if x.size<=1` gives two errors at `:4654`: "Generator[\E\] has no getter called size", and "Filter expressions in generator clauses must have type Boolean".
  - `sz = x.size - 1` gives one at `:4657`.
- Behind them, `x[i]` and `x[i+1]` at `:4658` index the same `Generator`. The list has no row at `:4658`. By reading, the checker does not reach them while `sz` has no type. So a way that gives `x` a size but no index uncovers them.

**Shape C: a `Generator` answered where an `Indexed` is declared (1 site).**
- C1. `Indexed`'s default `getter indexValuePairs(): Indexed[\(I,E),I\] = self.indices.map[\(I,E)\](...)` (`fss:1847-1848`): "Function body has type Generator[\(I, E)\], but declared return type is Indexed[\(I, E),I\]". The `map` of a `Generator` answers a `Generator` (`fsi:761`). Only an `Indexed`'s `map` answers an `Indexed` (`fsi:1311`).

**Where the `Generator` type comes from:** `indices` (A1, C1: 2 sites), the factors of a cross (A2: 2), the generator wrapped by a naive `seq` (A3: 2) and the relational target (B1: 3).

**What reaches the bodies under walk, by reading.**
- **A1 runs for no type in the tree.** Every type that extends `DelegatedIndexed` declares its own `|self|`:
  - `DefaultZip` (`fss:1921`);
  - the arrays of rank 1 to 3 (`fss:2225`, `:2516`, `:2924`);
  - `String` (`fss:4169`), `FlatString` (`Library/FlatString.fss:52`) and `SubString` (`Library/String.fss:361`);
  - the rank-2 and rank-3 ranges (`Library/RangeInternals.fss:1133`, `:1204`);
  - `ReflectTuple` (`Library/Reflect.fss:348`), `CaseInsensitiveString` (`Library/CaseInsensitiveString.fss:29`) and `ArrayList` (`Library/List.fss:307`);
  - the test type in `ProjectFortress/tests/spuriousSelf.fss:49`.
- **A2 and A3 run only when a program asks the size of a cross or of a naive `seq`.** A grep of the tests, the demos and the library finds no such call. `|seq(3:5)|` (`ProjectFortress/tests/RangeKindBodies.fss:90`) uses a range's own `seq`.
- **B1 runs in four tests:** `Generator2Test`, `GeneratorDeclarations`, `ExclusionRemainderRungH` and `LibraryMeetDeclarations`, all in `ProjectFortress/tests/`.
  - Every target there is a list, a range, an array slice `xs[0:i]`, or an element of `inits`, which is a slice or a list (`Library/Generator2.fss:119-131`).
  - Each of these is an `Indexed[\E,ZZ32\]` counted from 0.
- **C1 runs for the types that define `indices` but not `indexValuePairs`:** the `String` family (`fss:4158`), `DefaultZip`, `CaseInsensitiveString`, `ReflectTuple`, and the index-value generators of `Set` and `PrefixSet` (`Library/Set.fss:151-162`, `Library/PrefixSet.fss:475-485`).
  - At run time their `indices` is a range, and a range's `map` is an `Indexed`.
  - So the declared type holds at run time.
- **microGPT reaches none of these operations**, by a grep of `explorations/run-c4/src/`. Its `ivmap` calls go to the arrays' own `ivmap` (`fss:2290`, `:2340`).

## 2. The ways

The library's own ways come first. Ways 1 to 8 each follow something the library already does in the same family; the heading names the precedent. Ways 9 and 10 are the two remaining ways batch 10 weighed. Way 11 is the specification's merged pairs. Way 0 keeps today's behaviour.

No way changes the checker. The checker's refusals are the static check that the specification asks for (step 3, and "Blocked" below).

| Way | A1 | A2 (2) | A3 (2) | B1 (3) | C1 | Sites cleared |
|---|---|---|---|---|---|---|
| 1 counted size on `Generator` | yes | yes | yes | the size; uncovers the index | no | 8 |
| 2 `indices` and target typed `Indexed` | yes | no | no | yes | yes | 5 |
| 2a narrow only where read | yes | no | no | no | yes | 2 |
| 3 relation by a reduction | no | no | no | yes | no | 3 |
| 4 `typecase` with a fallback | no | no | no | yes | no | 3 |
| 5 drop the undeclared sizes | yes | yes | yes | no | no | 5 |
| 6 a pairs object | no | no | no | no | yes | 1 |
| 7 pairs typed `Generator` | no | no | no | no | moves it | 0, or 1 with four more bodies |
| 8 a non-generic sized trait | yes | yes | yes | no | no | 5 |
| 9 `bounds` for `indices` | yes | no | no | no | yes | 2 |
| 10 count at each site | yes | yes | yes | the size; uncovers the index | no | 8 |
| 11 overloaded `cross` and `seq` | no | yes | yes | no | no | 4 |
| 0 leave | no | no | no | no | no | 0 |

### Way 1: a size on every generator, counted from `generate` by default (`Generator`'s own pattern)

**The precedent.**
- `Generator` already derives operations from `generate`. Each is a correct default that a sized type overrides:
  - `opr IN`: "By default this is implemented using the naive O(n) algorithm" (`fsi:826-828`, body at `fss:1238`);
  - `asString` (`fss:1147`);
  - `mapReduce`, `reduce` and `loop` (`fss:1227-1236`).
- `String`'s "dumb" generator "always works, but can be 'Big O' inefficient ... Sub-traits should override it" (`fss:4163-4166`).
- The team's `Generator` declared `getter size(): ZZ32` until 2007-09-13 (step 7).
- The specification's own `SimplePairGenerator` reads `outer.size` from a `Generator` (step 3).

**What it is.** `Generator` gains `opr |self| : ZZ32`, with a default that counts the elements: by `mapReduce`, or `SUM[\ZZ32\][_ <- self] 1`.

**What it changes.**
- Library: one declaration in `Generator`'s api and its body. In `cond`, `x.size` is respelled `|x|`, as the api itself advises (`fsi:1253`).
- Checker: none.
- Walk: no Java change.
- Specification:
  - Part IV renders the new declaration.
  - `defining-generators.tex:22-25` stays true: a generator still needs only `generate`.

**Sites cleared.** A1, A2 and A3 (5). B1's three size errors (3), once respelled. Not C1. It uncovers B1's index at `:4658`, so way 3 or 4 must go with it.

**What walk sees.**
- No value walk answers today changes. Each value at the sites carries its own `|·|` at run time (section 1), and dispatch picks the most specific declaration.
- A generator with no size of its own now answers a count where walk stops today: a filter, a nest, a mapped generator.
- Counting runs `generate`:
  - on a `FileGenerator`, which is `Consumable` (`Library/FileSupport.fss:147-152`), the count consumes the file;
  - on an endless generator, the count never ends, as Scala documents for its own `size` (step 6).
- Cost: unchanged wherever walk answers today; O(n) where walk stops today.

**Overloading.**
- The new declaration joins the overloads of `|_|`.
- The numbers' declarations of `|_|` exclude it: `Generator excludes { Number }` (`fsi:731-732`).
- `Indexed`'s `|self|`, and that of every sized type, is more specific than the new one.
- `SkipList` declares `|self|` (`Library/SkipList.fsi:19`) and neither extends nor excludes `Generator`. So the Meet Rule may ask for a declaration at their meet, or for an `excludes` clause.
- An object that declares `|self|` without being a generator, such as `Char`, cannot be extended, so it excludes `Generator`.

**One measurement to settle it.** The distance stage on the edit. It shows whether the eight rows go, how many rows the uncovered index adds at `:4658`, and whether any new `|_|` row appears. `SkipList` is outside the twelve units: walk's Meet Rule check at load (rows 647 to 649) reaches it only in a program that imports it.

### Way 2: `indices` typed `Indexed[\I,I\]` and the relational target typed `Indexed[\E,ZZ32\]` (batch 10's third way)

**The precedent.**
- The component declared `indices(): Indexed[\I,I\]` from 2007-09-19. The api did so from its first version (`1c492019f`, 2007-12-13). Both kept it until `2f26aeded` retyped it `Generator[\I\]` on 2008-10-08 (step 7).
- A1 and C1 were written against the older type: C1 in 2007, A1 one day before the retyping.
- Today the overrides still narrow `indices` where the value is a range:
  - `String` and `List` answer `CompactFullRange[\ZZ32\]` (`fss:4158`, `Library/List.fss:277`), as the api's `Condition` does (`fsi:908`);
  - the scalar ranges answer `Indexed[\ZZ32,ZZ32\]` (`Library/RangeInternals.fss:1280`, `:1466`).
- For B1, the target type is the one `initsImpl` already tests for, `Indexed[\E, ZZ32\]` (`Library/Generator2.fss:122`). `ZeroIndexed` would refuse the arrays and their slices, which are `Indexed[\T,ZZ32\]` (`fsi:1530-1531`).

**What it changes.**
- Library, for A1 and C1:
  - `Indexed.indices`, in the api and in the component.
  - The `indices` declarations typed `Generator` take the new type, most of them with no change to the body: `fss:1392`, `:1919`, `:1999`, `:3608`, `:3761`, `:4138`; `Library/Set.fss:154`; `Library/PrefixSet.fss:478`.
  - Two families need new bodies:
    - the rank-2 and rank-3 range kinds, whose `indices` is a `cross` or a mapped `cross` (`Library/RangeInternals.fss:1132`, `:1202`, `:1390`, `:1426`, `:1648`, `:1682`);
    - `ChunkedSparseArray`, whose `indices` is a `nest` over the bits that are set (`Library/ChunkedSparseArray.fss:55-71`).
- Library, for B1:
  - `target()`, `ConcreteRelationalPredicateCondition`, `AndRelationalPredicateCondition`, `andRelCond`, `andCondCombine` and `relationalPredicate` (`fss:4648-4691`, `fsi:2663-2670`).
  - An arrow type is contravariant in its parameter (`Specification/basic/types-vals-vars.tex:411-416`). So a predicate on `Indexed` is not a predicate on `Generator`, and the generators of generators are retyped too:
    - `Generator2`'s element type;
    - the predicate types in `filter`, `theorems`, `theoremsFiltered` and `__generate2filtered` (`fsi:2645-2660`);
    - `Library/Generator2.fss` and `Library/Generator22D.fss`: `inits`, `tails` and `segs`, and their seeds.
- Checker: none.
- Walk: no Java change.
- Specification: Part IV (`Indexed`, the relational predicates, `Generator2`).

**Sites cleared.** A1, C1, and B1 with its hidden index (5). Not A2 or A3.

**What walk sees.**
- The tests' targets give the same values (section 1).
- A generator of generators whose elements are not indexed is refused at the call, not inside `cond`. So is a predicate applied to such an element.
- The new range and sparse-array bodies change the run-time types of those `indices` values.
- The sparse array has two options, each with its cost: build its index set (an allocation of O(n) on each call), or wrap it.

**One measurement to settle it.** The distance stage on the edit: the rows the retyping adds in `RangeInternals` and `FortressLibrary`, against the five it clears. `Generator2` and `ChunkedSparseArray` are outside the twelve units, so for them the four tests under walk are the check.

**2a: narrow only where the value is read** (the arrays' "repetition with better return type information", `fsi:1711`, `fss:2096`).
- `DelegatedIndexed` redeclares `indices` as `Indexed[\I,I\]`. That clears A1.
- `Indexed`'s default `indexValuePairs` is copied into the traits whose `indices` is already narrow, `String` among them, and becomes abstract in `Indexed`. That clears C1.
- What it still needs:
  - The rank-2 and rank-3 ranges extend `DelegatedIndexed`, so their `indices` still need new bodies.
  - `DefaultZip` and the index-value generators of `Set` and `PrefixSet` need a narrowed `indices` before their copies type.
- It clears 2 sites.
- The api's sentence "It is necessary to define one of `indices()` and `indexValuePairs()`" (`fsi:1240-1243`) changes to name `indexValuePairs()` only.

### Way 3: the relation checked by one reduction, with no size or index (the relational family's own way)

**The precedent.** `Generator2`'s fused path already checks the same relational predicate over any generator, with no size and no index (`Library/Generator2.fss:207-229`). It runs one reduction in the natural order. Each partial result carries its first and last elements as `Maybe`. The join tests `rel(l1, h2)` where two partial results meet (`:211-221`).

**What it is.** `cond` does the same with a `Boolean` and the two ends.

**What it changes.**
- Library: the body of `cond` (`fss:4651-4661`).
- Checker, walk and specification: nothing.

**Sites cleared.** B1's three, and the hidden index (3).

**What walk sees.**
- The same `Boolean` for every target that answers today. The reasons:
  - `generate` combines results "following the natural order of the generator" (`fsi:747-748`);
  - an indexed object's elements, `indices` and `indexValuePairs` "share the same natural order" (`fsi:1237-1240`).
- A target with no size or index answers where walk stops today.
- Today's body assumes indices that start at 0 (`(0#sz)`, `x[i]`). So an array whose lower bound is not 0 stops walk today and answers afterwards.
- Cost: one parallel O(n) reduction with a small tuple per element, in place of one size read and 2(n−1) index reads. It is cheaper where indexing is not O(1). No interpreter timing decides it (POSITIONS, "Interpreter performance is irrelevant.").

**One measurement to settle it.** The four tests that reach B1 (section 1), run under walk on the edit: every asserted value unchanged.

### Way 4: a `typecase` to `Indexed[\E,ZZ32\]`, with a fallback (the relational family's own way)

**The precedent.**
- `initsImpl` tests its generator: `typecase x of x':Indexed[\E, ZZ32\] => ... else => initsImplByList[\E\](x)` (`Library/Generator2.fss:119-131`).
  - The indexed arm keeps the generator's structure.
  - The else arm works on any generator, by a reduction into a list.
- The team marked `SequentialGenerator`'s own two `typecase`s "TODO: make overloaded" (`fss:1366`, `:1373`). So the team used this shape knowingly, as a stand-in for overloading.

**What it is.** `cond` tests `x` the same way, and its first arm keeps today's body. The else arm is one of:
- way 3's reduction;
- a conversion to a list, as `initsImplByList` does;
- `fail` (4b), which keeps walk's stop for a target that is not indexed, with a clearer message.

**What it changes.**
- Library: the body of `cond`.
- Checker, walk and specification: nothing.

**Sites cleared.** B1 and its hidden index (3).
- It cannot reach A1 to A3. At those generic sites, a `typecase` would have to name an index type it does not know. Generics are invariant, so `Indexed[\E,ZZ32\]` is not an `Indexed[\E,Any\]`.
- Way 8 is how a `typecase` reaches them.

**What walk sees.**
- The same values for the tests' targets.
- One run-time type test per call.
- For a target that is not indexed, the else arm's value or message.

**One measurement to settle it.** The same four tests under walk on the edit.

### Way 5: drop the sizes that no api declares (the team's later generator library)

**The precedent.**
- Guy Steele's restructured generators of 2011-11-21 (`ProjectFortress/not_working_library_tests/GenTest4.fss`, `299e4ee24`):
  - `PairGenerator` has no size (`:307-316`);
  - the naive default `seq` is commented out (`:107`).
- `Library/GeneratorLibrary.fss` carries the same declarations at the conversion's cut of 2012-05-23 (`:288-312`; `seq` abstract, `:46-47`); `git log --follow` traces its content to `GenTest4.fss`. No program can reach it (`.claude/skills/fortress-repo/references/library.md`).
- In the one library, the api declares neither `PairGenerator` nor `NaiveSeqGenerator` (a grep of `fsi`). Both are private to the component.
- Their sizes are left over from 2007, when every `Generator` had one (step 7).

**What it is.** Delete:
- `PairGenerator`'s `size` and `|self|` (`fss:3718`, `:3720`);
- `NaiveSeqGenerator`'s `size` and `|self|` (`fss:3798`, `:3800`);
- `DelegatedIndexed`'s body for `|self|` (`fss:1961`).

That leaves `Indexed`'s two defaults, `size` from `|self|` and `|self|` from `size` (`fss:1834`, `:1864`). A type breaks that cycle by defining one of the two.

**What it changes.**
- Library: three bodies.
- The api's `DelegatedIndexed` loses `opr |self|` (`fsi:1354`), and its comment that a type need define "either `indexValuePairs()` or `indices()`" (`fsi:1343-1346`) has to name `|self|` too.
- Checker: none. Walk: no Java change.
- Specification: Part IV, for `DelegatedIndexed`.

**Sites cleared.** A1, A2 and A3 (5).

**What walk sees.**
- No value in the tree changes. By section 1, no program reads these sizes, and every `DelegatedIndexed` type has its own `|self|`.
- A program that asks `|a.cross(b)|`, or the size of a naive `seq`, stops instead of answering.
- A new type that extends `DelegatedIndexed` and defines only `indices` loops between `size` and `|self|`. Today it counts its indices.

**One measurement to settle it.** The suites under walk on the edit. They would show any reader of the three sizes that the grep missed.

### Way 6: an index-value-pairs object (the pattern of `Indexed`'s own `map` and `reverse`)

**The precedent.**
- `Indexed`'s default `map` and `reverse` do not map a generator. Each answers a small object over `self`:
  - `SimpleMappedIndexed` (`fss:1895`, `:3600-3619`);
  - `SimpleReversedIndexed` (`fss:1852`, `:3776-3779`).
- `ReadableArray` builds its pairs from a range (`fss:2000-2001`).

**What it is.** The default `indexValuePairs` answers such an object, an `Indexed[\(I,E),I\]` over `self`:
- it generates over `self.indices`;
- its subscript at `i` answers `(i, self[i])`;
- it takes `self.bounds`, and `|self|` for its size;
- it cuts by a range as `SimpleMappedIndexed` does (`fss:3611-3612`).

**What it changes.**
- Library: one object and the default's body. The object can stay private: the api does not declare `SimpleMappedIndexed` either.
- Checker, walk and specification: nothing.

**Sites cleared.** C1 (1).

**What walk sees.**
- The same pairs, in the same order, for the types that inherit the default (section 1).
- The pairs' run-time type changes from a mapped range to the new object.
- The cost is of the same order.

**One measurement to settle it.** The distance stage on the edit: C1 gone, and no row in the new object.

### Way 7: `indexValuePairs` typed `Generator` (what List, PureList, Sparse and the rank-2 and rank-3 ranges already declare)

**The precedent.**
- The api's `indexValuePairs` was `Generator[\(I,E)\]` until 2007-09-19 (`98d4cda94` to `226481530`, step 7).
- Today five families override it with that wider type:
  - `ArrayList` (`Library/List.fss:278`);
  - `PureList` (`Library/PureList.fss:176`);
  - `SparseVector`, `Csr` and `Csc` (`Library/Sparse.fss:26`, `:124`, `:168`), whose pairs are only the stored ones, a subset of the bounds;
  - the rank-2 and rank-3 range kinds (`Library/RangeInternals.fss:1392`, `:1428`, `:1650`, `:1685`).
- The distance has no row at those lines, although `List` and `RangeInternals` are measured units. So today the checker does not refuse a getter that overrides with a wider type. Why it does not is not measured.

**What it changes.**
- Library: `Indexed.indexValuePairs` and `ReadableArray`'s (`fsi:1269`, `:1390`).
- Each declaration that answers an `Indexed` built from the pairs must widen too, or be rebuilt on way 6's object. Otherwise the error moves there:
  - `ivmap`'s default (`fss:1894`);
  - `ReversedIndexed` (`fss:3764`);
  - `SimpleMappedIndexed` (`fss:3606-3607`);
  - `SimpleMappedSeqIndexed` (`fss:4136-4137`).
- Checker: none. Walk: no Java change.
- Specification: Part IV, including `Indexed`'s documentation of the pairs (`fsi:1258-1269`).

**Sites cleared.** C1's error moves into those four declarations, so 0; or 1, if they change too.

**What walk sees.** No value changes: only types change.

**One measurement to settle it.** The distance stage on the edit, read for the rows the change moves.

### Way 8: a non-generic trait for a known size (the library's `Any` traits)

**The precedent.**
- The library gives a generic family a supertrait without static parameters wherever code must test or exclude the family without naming its arguments:
  - `AnyMaybe` "makes excludes work without where clauses", and carries `holds` (`fsi:945-951`);
  - `HasRank` carries `rank()` for every array (`fsi:1195-1199`);
  - also `AnyList`, `AnyVector`, `AnyMatrix` and `SomeGenerator2` (`Library/List.fsi:55`, `fsi:1600`, `:1718`, `:2642`).
- Peers: Java's `Spliterator.SIZED` characteristic, and Scala's `knownSize` (step 6).

**What it is.**
- A new trait carries `abstract opr |self| : ZZ32`. Its name is the curator's to choose.
- `Indexed` extends it, and so do the sized generators that are not indexed: `Map`, `IntMap` and `PrefixMap`.
- At a site typed `Generator`, the code asks: `typecase g of s: <the trait> => |s| else => ...`. The else arm is a count (way 10) or `fail`.

**8b: a known size as a query on every generator.**
- `Generator` gains a getter that answers `Maybe[\ZZ32\]`: `Nothing` by default, and `Just` of `|self|` in `Indexed` and the sized types.
- A site writes `if n <- g.knownSize then ... else ... end`.
- This is Scala's `knownSize` (which answers −1 when unknown), written with Fortress's `Maybe`. With way 1 as the else arm, it is exactly Scala's `size`.

**What it changes.**
- Library: one trait (8) or one getter on `Generator` (8b) in the api; extends clauses or overrides; the five A bodies.
- Checker: none.
- Specification: Part IV.

**Sites cleared.** A1, A2 and A3 (5). B1 needs way 2, 3 or 4 beside it.

**What walk sees.**
- The same values wherever walk answers today.
- The else arm's value or message where walk stops today.
- One run-time test per call.

**Overloading.** As in way 1: the trait's `|self|` meets the other declarations of `|_|`. The exclusions this needs are the kind `AnyMaybe` was made for.

**One measurement to settle it.** The distance stage on the edit.

### Way 9: `bounds` for `indices` (batch 10's second way)

**What it is.** A1 becomes `|self.bounds|`, and C1 becomes `self.bounds.map[\(I,E)\](...)`. `bounds` is a `CompactFullRange[\I\]`, which is an `Indexed[\I,I\]` (`fsi:2262`, `:2271`).

**The precedent, and where it fails.**
- For the size, the api supports it:
  - it documents `|self|` as "the number of distinct valid indices that may be passed to indexing operations" (`fsi:1281-1283`);
  - it documents `bounds` as "a range of indices that are valid" (`fsi:1255-1257`);
  - so the count of the bounds is the documented size.
- The sparse array already counts this way. Its `|self|` is its static size `n` (`fss:2225`), while its `indices` are only the bits that are set (`Library/ChunkedSparseArray.fss:48`, `:55`).
- For the pairs, the api's documentation says the opposite: "stripping away the i yields exactly the results of v <- self" (`fsi:1265`). Pairs over all the bounds break that wherever the indices are a subset of the bounds.

**What it changes.**
- Library: two bodies, and the api's comments on what a type must define (`fsi:1240-1243`, `:1343-1346`).
- Checker: none. Walk: no Java change.
- Specification: Part IV, for those comments.

**Sites cleared.** A1 and C1 (2).

**What walk sees.**
- By reading, no value in the tree changes:
  - A1 runs for no type;
  - the types that inherit C1 have `indices` equal to their bounds (section 1).
- A type that relies on these defaults and whose indices are a proper subset of its bounds would count its bounds, and would pair its unset indices.
- A possible endless recursion: `ZeroIndexed`'s `bounds = 0 # |self|` (`fss:1909`) and A1's `|self| = |self.bounds|` call each other forever, for a type that extends both traits and defines neither. There is none in the tree.

**One measurement to settle it.** One walk run of the suites with the two default bodies replaced by `fail`. It shows which types reach them. By reading: none for A1; for C1, the `String` family, `DefaultZip` and the two set generators.

### Way 10: count by a reduction at each site (batch 10's first way, kept local)

**What it is.** Each A body counts instead of reading a size:
- A1: `SUM[\ZZ32\][_ <- self.indices] 1`;
- A2: the product of the two factors' counts;
- A3: the count of `g`.

B1's two `x.size` reads become the count of `x`. Its index stays.

**What it changes.**
- Library: five bodies, and no declaration.
- Checker, walk and specification: nothing.

**Sites cleared.** A1, A2 and A3 (5). B1's three size errors (3), uncovering its index. Not C1.

**What walk sees.**
- The same values.
- The cost of `|self|` rises from O(1) to O(n) where the inner values are sized. For example, `|a.cross(b)|` over two ranges becomes O(|a| + |b|). By section 1, nothing in the tree reads these sizes.
- A consumable generator is consumed, as in way 1.
- Interpreter timings decide nothing. The compiled cost cannot be timed until the compiled path runs the one library.

**One measurement to settle it.** The distance stage on the edit.

### Way 11: overload `cross` and `seq`, so that sized inputs give sized results (the specification's merged pairs)

**The precedent.**
- The specification makes the pairing of independent generators a hook for the library: "The goal is to permit library code to define more efficient merged generators for generator pairs" (`Specification/advanced/parallelism-locality/defining-generators.tex:301-316`).
- The api says `cross` and `nest` are "specifically designed to be overloaded" (`fsi:766-768`, `:783-786`).

**What it is.**
- `Indexed` gains a `cross` that takes an `Indexed`, and a `seq`. Each answers a sized pair or a sized sequential view, whose fields are typed `Indexed`.
- The generic `PairGenerator` and `NaiveSeqGenerator` lose their sizes, as in way 5.
- The new `cross` needs a static parameter for its argument's index type. The revised overloading chapter lets overloads differ in their static parameters (`Specification/advanced/overloading.tex:109-123`).

**What it changes.**
- Library: two objects, the overloads in `Indexed`, and way 5's deletions.
- Checker: none, if it accepts the overloads. That is part of what the measurement shows.
- Specification: Part IV.

**Sites cleared.** A2 and A3 (4). A1 needs way 2 or 5 beside it.

**What walk sees.**
- Crosses and sequential views of indexed values keep the sizes they answer today through their factors' run-time types.
- Other crosses and naive `seq`s lose their size, as in way 5.

**One measurement to settle it.** The distance stage on the edit, read for overloading rows on `cross` and `seq`.

### Way 0: leave the nine sites (today's behaviour)

Row 629 stays `NEGATIVE-VERIFIED`. The nine rows stay in the distance, and phase 3 cannot reach a true zero while they do (PLAN item 45). Walk is unchanged.

### Blocked or rejected

- **The checker accepts the reads.** Blocked by the specification. A call is "statically checked to ensure that *some* definition will be applicable at run time" (`Specification/preliminaries/overview.tex:707-710`). `Generator` declares no `|·|`, no `size` and no `[i]`, so the checker's refusals are that check.
- **An index on every generator.** No rule refuses it: the i-th element in the natural order can be computed from `generate`. But no peer gives its base sequence type an index: Scala's `Iterable` has no `apply`, and Swift's `Sequence` has no subscript. Each read would cost O(i), so B1's loop would cost O(n²).

### Combinations that clear all nine, by reading

Each still needs its measurement.
- **1 + 3 + 6.** One declaration on `Generator`, the body of `cond`, and one object. No existing type changes.
- **5 + 3 + 6.** Deletions, the body of `cond`, and one object. Nothing is added to the api. Way 9 or 2a can stand in for 6 on C1.
- **2 + 5, or 2 + 1, or 2 + 11.** The 2007 typing restored, plus one of the ways for A2 and A3. Retypes the generators of generators.
- **8 + 3 + 6.** One trait and a `typecase` at each A site.
- **10 + 3 + 9.** Bodies only, nothing declared, with way 10's costs.

## 3. The nine steps, in short

**1. Refresher.**
- A generator is what `for` loops and big operators run on. All it must do is `generate`: hand each element to a body, and combine the results with a reduction, in its natural order (`fsi:729-753`).
- A generator's size is then itself a reduction: a count, the sum of a 1 for each element.
- An indexed object knows more: an index set, and an element at each index. Its size is a property of the index set, available without visiting the elements.
- So the question is where a size and an index live. There are three options: on every generator, counted where unknown; only on indexed ones, and asked for by type; or both.

**2. What each path does today** (cited, not measured).
- Walk runs the nine bodies, and the values at each site are sized at run time (REPORT section 8).
- Which values reach each site is in section 1: A1 none; A2 and A3 none in the tree; B1 four tests; C1 the `String` family and a few others.
- The checker refuses them: nine rows of the 153 in `compile-ladder/gate/distance-sites.tsv` (batch 12's gate, `32b88cd3b`).
- The compiled path does not run the one library yet.

**3. The specification.**
- "An instance of `Generator[\E\]` only needs to define the `generate` method" (`Specification/advanced/parallelism-locality/defining-generators.tex:22-25`). "All the parallelism provided by a particular generator is specified by definition of the generate method" (`:33-34`).
- Its own `SimplePairGenerator` declares `size : ZZ64 = outer.size · inner.size`, with `outer : Generator[\A\]` (`:320-338`; the same in `Specification-1.0-frozen/advanced/parallelism-locality/defining-generators.tex:315`, `:325`).
  - So the text reads a size from a `Generator`, as A2 does.
  - It belongs to the design in which every generator had a size: its `join` and `Monoid` signatures are also older than the library's.
- The generators section lists `a.indices`, "the index set of array a", among the common generators (`Specification/basic/expressions/generators.tex:95-102`).
- Part IV renders the apis. So `Indexed`'s documentation of `|self|`, `bounds`, `indices` and the pairs (`fsi:1229-1283`) is specification text too.
- The overview's `size(x: Nil)` and `size(x: Cons)` show dispatch on the run-time type, "regardless of the static type of the argument", beside the static check that some definition applies (`Specification/preliminaries/overview.tex:696-710`).
- The papers say nothing on a generator's size or on `Indexed`. A grep of `Papers/` for `Generator`, `Indexed` and `indices` finds no passage on the subject. They bear on the ways only through the overloading rules (ways 1 and 8).

**4. Where it sits in the type system.**
- `Generator[\E\]` declares no `|·|`, no `size` and no `[i]` (`fsi:731-829`).
- Generics are invariant. So a `typecase` at a generic site can test only an index type it can name (the limit of way 4, and the reason for way 8).
- Arrow types are contravariant in their parameter (`Specification/basic/types-vals-vars.tex:411-416`). So retyping B1's target retypes the generators of generators (way 2).
- A new declaration of `|_|` on `Generator`:
  - is accepted beside the numbers' declarations by exclusion (`fsi:731-732`);
  - must meet any trait with its own `|self|` that neither extends nor excludes `Generator` (way 1).
- The five families that override `indexValuePairs` with a wider type draw no row today (way 7).

**5. What the library does in the same family.**
- Defaults derived from `generate` on `Generator` itself, slow but general, which sized types override (way 1).
- Size and index on `Indexed` alone since 2007-09-13. Overrides narrow `indices` to a range wherever they can (way 2).
- The relational family's two devices:
  - a reduction carrying the two ends (way 3);
  - a `typecase` to `Indexed[\E,ZZ32\]` with a fallback (way 4).
- No size on generic pairs and sequential views in the team's last generator code (way 5).
- Derived indexed views built as objects (way 6).
- Pairs typed `Generator` in five families (way 7).
- Supertraits without static parameters for testing and exclusion (way 8).
- "Repetition with better return type" (way 2a).

**6. What the peers do** (each peer's own source, read 2026-10-09).
- **Scala 2.13** (`scala/scala`, branch 2.13.x, `src/library/scala/collection/`):
  - `IterableOnceOps.size` answers `knownSize` when it is not negative, and otherwise iterates and counts (`IterableOnce.scala:986-993`).
  - `knownSize` is "The number of elements in this $coll, if it can be cheaply computed, -1 otherwise. Cheaply usually means: Not requiring a collection traversal" (`:88-91`).
  - `IndexedSeq`, "Base trait for indexed sequences that have efficient `apply` and `length`" (`IndexedSeq.scala:21`), sets `knownSize` to `length` (`:123`).
  - So: a size on every collection, counted unless known. That is ways 1 and 8b.
- **Swift** (`swiftlang/swift`, branch main, `stdlib/public/core/`):
  - `Sequence` has no `count` and no subscript. It has only `underestimatedCount`, O(1), which is 0 by default (`Sequence.swift:348-356`, `:808-810`).
  - `Collection` declares `count`: "O(1) if the collection conforms to `RandomAccessCollection`; otherwise, O(*n*)" (`Collection.swift:512-521`).
  - So: size and index on the indexed protocol only. That is way 2's split, with 8b's hint.
- **C#** (`dotnet/runtime`, branch main, `src/libraries/System.Linq/src/System/Linq/Count.cs:11-37`):
  - `IEnumerable<T>` has no count.
  - LINQ's `Count()` tests `source is ICollection<TSource>` at run time, and otherwise enumerates.
  - That is way 4 or 8, with way 10 as the fallback.
- **Java** (`openjdk/jdk`, branch master, `java/util/Spliterator.java`):
  - `Iterable` has no size.
  - A `Spliterator` has `estimateSize()`, `getExactSizeIfKnown()` and the `SIZED` characteristic (`:401`, `:413`, `:527`).
  - That is way 8.
- **Haskell** (`ghc/ghc`, branch master, `libraries/ghc-internal/src/GHC/Internal/Data/Foldable.hs`):
  - `Foldable`'s `length` defaults to `foldl' (\c _ -> c+1) 0` (`:529-530`).
  - Structures that know their length override it, such as arrays (`:774`).
  - That is way 1.
- **Where Fortress sits.**
  - Two peers put a counted size on every collection (Scala, Haskell).
  - Three keep the size on the sized or indexed kind, and test for it or hint at it at run time (Swift, C#, Java).
  - Fortress dispatches on every argument at run time. So way 1's default costs nothing where a type knows its own size: dispatch picks the type's own `|·|`, as Scala's override and Haskell's class method do.

**7. The history in the commits.** Logins are mapped to names by `research/authorship.md`.
- 2007-05-11, `f1f435b11` (Jan-Willem Maessen).
  - `Generator` declares `getter size(): ZZ32` (abstract).
  - `SimplePairGenerator`'s size is `e.size() f.size()`, and `NaiveSeqGenerator`'s is `g.size()`.
  - The default `seq()` is the naive one.
- 2007-09-13, `98d4cda94` (Maessen, "Fixed bugs in demos due to library refactoring").
  - `size` and `isEmpty` move from `Generator` to `Indexed`.
  - The pair's size and the naive `seq`'s size stay behind. A2 and A3 date from here.
- 2007-09-19, `226481530` (Maessen, "Lots of work on Indexed generators").
  - `indices(): Indexed[\I,I\]` and `indexValuePairs(): Indexed[\(I,E),I\]`, each defined by default from the other.
  - C1's body, well typed at this point.
- 2007-12-13, `1c492019f` (Maessen): the first `FortressLibrary.fsi`, with `indices(): Indexed[\I,I\]`.
- 2008-10-07, `0948c2b1c` (Maessen, "Cut over to new range implementation"): `DelegatedIndexed`'s `|self| = |self.indices|`. This is A1, well typed that day.
- 2008-10-08, `2f26aeded` (Maessen).
  - `indices` becomes `Generator[\I\]` in the api and the component.
  - In the same commit, the rank-2 and rank-3 ranges' `indices` are declared `Generator` in `RangeInternals.fsi`. Today their bodies build a `cross` (`Library/RangeInternals.fss:1132`), which is a `Generator` and not an `Indexed`.
  - A1's and C1's bodies are left unchanged, so both sites date from here.
- 2008-12-12, `178e1585d` (Kento Emoto, the generators of generators).
  - `RelationalPredicateCondition`, with `target() : Generator[\E\]`, `x.size()` and `x[i]`. This is B1, ill-typed from its first line.
  - 2009-09-05, `c86b8a9c5` (Sukyoung Ryu) respells `x.size()` as `x.size`.
- 2011-11-21, `299e4ee24` (Guy Steele): the restructured generators of `GenTest4.fss`, with no size on pairs and no naive `seq` (way 5).
- 2026-10, climb batch 10's rung G repairs 30 slips around these sites and opens row 629 (REPORT section 8).
- So the nine sites have three origins:
  - four (A2, A3) are left over from moving the size off `Generator` in 2007;
  - two (A1, C1) are left over from retyping `indices` in 2008;
  - three (B1) were written against a `Generator` that had no size.

**8. Derivation from Pavol's principles.**
- **"The library's own practice is the standard"** (POSITIONS).
  - Ways 1 to 8 each follow a practice of the same family.
  - Two families have the closest precedent:
    - B1's own family already answers the same predicate by a reduction (way 3), and already tests for `Indexed[\E,ZZ32\]` with a fallback (way 4);
    - A2 and A3 have the team's latest word, which is no size on generic pairs and sequential views (way 5).
- **"The type group's late positions outweigh the early text"** (POSITIONS).
  - The specification's `SimplePairGenerator`, which reads `outer.size`, is the earlier design. The library has not had it since 2007-09-13.
  - Steele's 2011 generators drop the pair's size.
  - Way 1 brings back the early design, as a default. Way 5 follows the later code.
- **A fork resting on a refusing rule says what the library does instead** (POSITIONS, the same entry).
  - Here the rule is the static check.
  - Where the library needs a size or an index that it cannot type, it uses a reduction (way 3) or a `typecase` (way 4).
- **"Interpreter performance is irrelevant"** (POSITIONS).
  - Ways 1, 3 and 10 change costs only where nothing in the tree reads the value, or only in the interpreter.
  - No timing can decide among them before microGPT runs compiled.
- **microGPT and phase 3.**
  - No way changes a line of microGPT or a body it reaches (section 1).
  - Way 0 leaves nine sites in the distance. Each combination in section 2 reaches the true zero for this row, by reading.

**9. The options for his decision.**
1. **The library's own way in each family (5 + 3 + 6; or 9 or 2a for C1).**
   - The private sizes and `DelegatedIndexed`'s default go.
   - `cond` checks by one reduction.
   - The pairs become an object.
   - A yes commits him to `DelegatedIndexed`'s api losing `|self|`, and to `|a.cross(b)|` stopping walk.
2. **A counted size on every generator (1 + 3 + 6).**
   - A yes commits him to a new `Generator` declaration in the specification's Part IV.
   - Also to `SkipList`'s meet with it, and to counting that consumes a consumable generator or never ends on an endless one.
3. **The 2007 typing restored (2 + 5, or 2 + 1).**
   - A yes commits him to retyping `indices` across the library, the relational predicates and the generators of generators.
   - Also to new `indices` bodies for the rank-2 and rank-3 ranges and the sparse array.
4. **Local repairs only (10 + 3 + 9).** No declaration changes. The size costs O(n) where nothing in the tree reads it.
5. **Leave the sites (0).** The row stays, and phase 3 keeps these nine rows.

## 4. A reading (mine, not a decision)

The nine sites come from three moments, and the library has its own answer for each.
- **B1:** its own family already checks the same predicate with a reduction that needs neither a size nor an index. Way 3 changes no type and gives the same values for every target the tests use.
- **A2 and A3:** these are 2007 leftovers that nothing reads. The team's last generator code dropped them, which is way 5.
- **A1 and C1:** both were well typed until `indices` was retyped in 2008.
  - Of the repairs that keep that retyping, way 5 for A1 changes nothing walk computes, since no type runs it.
  - For C1, the narrowest repair is way 6, the library's own derived-view object. Way 9 also clears C1, but it breaks the pairs' documented contract for a sparse type.

So I would put 5 + 3 + 6 in front of Pavol first. The alternative to state beside it is way 1: a size on every generator, as in Scala and Haskell and in the specification's own example. Way 2 is the larger redesign, which restores the 2007 typing at the cost of retyping the generators of generators.

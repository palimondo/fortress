<!-- Review of whether the decision that scalar ranges are over ZZ32 only broke a generic indexing design of the team's, with Q49's three ways read in that light; written for Pavol by a research worker reading only, on main at 720ef21e4, nothing built or run; the peers read from their own sources on 2026-10-09. -->

# Ranges and index types

## The short answer

No. The decision did not break a generic indexing design of the team's.

- The team's generic layer is untouched by it. `Indexed[\E, I\]`, the arrays' traits, the public range traits and `Generator[\E\]` are generic in their index or element type, as the team left them. The decision changed none of their declarations; in the arrays it only dropped a dummy argument from the bounds bodies. The decision's commit changed the range constructors, `RangeInternals` and a few lines that call them (point 3).
- The team never indexed by a non-integer. Every indexed type in the team's tree is indexed by `ZZ32`, a pair of `ZZ32` or a triple of `ZZ32`, or passes its own `I` through (point 1).
- The team never built a range over a non-integer. Every range constructor since 2008 took an integer or a tuple of integers, and the team's own generic range bodies work only on those (point 2).
- Lookup by a key was always separate. `Map`, `IntMap` and `PrefixMap` are not indexed types and have no ranges. The decision did not touch them (point 1).
- What the decision did take away: ranges over the other integer widths (`ZZ64`, `NN32`, `NN64`, `ZZ`), and ranks 2 and 3 of mixed widths (point 3).
- Q49's way (c) narrows only `(:)` as a range value at ranks 2 and 3, not indexing. My reading is in point 5.

## Terms

- **Index type**: the type of the value that picks an element. It is `I` in `Indexed[\E, I\]`. A rank-2 array's index type is a pair.
- **Rank**: the number of axes.
- **Range**: a value made by `:`, `#` or `::`, a set of indices. A range has an index type too: `Range[\I\]`.
- **Kind**: one family of concrete range objects, such as the `ZZ32` scalar kinds or the pair kinds.
- **Open range**: `(:)`, "everything". It is the one object `TrivialOpenRange`.
- **Subscript marker**: a value whose only job is to sit inside `a[...]`, as `(:)` does in `a[:]`.
- **Walk**: the interpreter. **Checker**: the compiled path's static type checker.

## 1. The team's indexing design

**What `Indexed[\E, I\]` is.**
- "The indexed trait indicates that an object of type T can be indexed using type I to obtain elements with type E" (`Library/FortressLibrary.fsi:1229-1230`, trait at `:1248`).
- Its index type is tied to ranges over it:
  - `bounds(): CompactFullRange[\I\]` (`:1257`),
  - `indices(): Generator[\I\]` (`:1280`),
  - `opr[i:I]` (`:1285`),
  - `opr[r:Range[\I\]]` (`:1297`),
  - `opr[_:TrivialOpenRange]` (`:1298`).
- So a new index type needs a range kind over it.
- Its size is a `ZZ32` whatever `I` is (`:1254`, `:1283`).
- The one hint of a non-integer index type: "The results are 0-based when the underlying index type has a notion of 0" (`:1287-1288`). Nothing in the library builds such a type.

**The traits on top of it.**
- `DelegatedIndexed[\E, I\]` (`:1351`) is a convenience supertype: "it should not be used as a type in running code" (`:1348-1349`).
- `ReadableArray[\E, I\]`, `ImmutableArray[\E, I\]` and `Array[\E, I\]` (`:1384`, `:1443`, `:1459`) keep `I` open.
- A range is itself indexed by its own index type: `FullRange[\I\] extends ... Indexed[\I, I\]` (`:2260`).

**The concrete arrays fix `I` to `ZZ32` and its tuples.**
- Rank 1: `ReadableArray1 ... extends ... ReadableArray[\T,ZZ32\]` (`:1530-1531`), bounds `CompactFullRange[\ZZ32\]` (`:1534`).
- Rank 2: index `(ZZ32,ZZ32)` (`:1679-1681`), bounds `CompactFullRange[\(ZZ32,ZZ32)\]` (`:1685`).
- Rank 3: index `(ZZ32,ZZ32,ZZ32)` (`:1794-1797`), bounds at `:1808`.
- The team's own array bounds were already `ZZ32` before the decision: `sized1Range[\ZZ32\](0,b0,s0)` and the rank-2 and rank-3 twins are lines the decision's commit rewrote (`git show 3be1fecd7 -- Library/FortressLibrary.fss`).

**Strings are indexed by integer positions**, unlike Swift's.
- `trait String extends { ..., ZeroIndexed[\Char\] }` (`:2417`), and `ZeroIndexed[\E\] extends Indexed[\E,ZZ32\]` (`:1319`).
- `object FlatString extends { String, DelegatedIndexed⟦Char, ZZ32⟧ }` (`Library/FlatString.fss:34`).

**What `I` is instantiated at in the team's code.**
- I scanned the team's last commit, `a874948ac`, over `Library/`, `ProjectFortress/tests/`, `ProjectFortress/LibraryBuiltin/` and `ProjectFortress/demos/`. For each written use of `Indexed`, `DelegatedIndexed`, `MutableIndexed`, `ReadableArray`, `ImmutableArray`, `Array` and the two `Standard...ArrayType` traits, I took its index argument.
- `ZZ32`: 257 uses. `(ZZ32,ZZ32)`: 19. `(ZZ32,ZZ32,ZZ32)`: 13. The generic `I` passed through: 149.
- `(I,J)` and `(I,J,K)`: 4, all in the rank-2 and rank-3 range kinds, whose components were bounded `Integral` (`a874948ac:Library/RangeInternals.fsi:387`, `:405`, `:53`, `:85`).
- Nothing else. The same holds for `Range[\...\]`: a grep of the whole team tree for a range over `Char`, `Character`, `RR64`, `RR32`, `String`, `QQ`, `Float` or `Boolean` finds nothing.

**Generic code over `Indexed`.**
- The default `a[:]` turns the marker into an open range at the indexed type's own `I`: `opr[_:TrivialOpenRange] : Indexed[\E,I\] = self[openRange[\I\]()]` (`Library/FortressLibrary.fss:1883`).
- `openRange[\I\]()` is defined for `ZZ32` and its pair and triple (`:4018-4023`). The team's helper was defined for any integer type and its tuples (`a874948ac:Library/RangeInternals.fss:1482-1487`). Neither ever covered a non-integer `I`.

**Maps are a separate design.**
- `trait Map[\Key,Val\] extends { Generator[\(Key,Val)\], Equality[\Map[\Key,Val\]\] }`, with `opr[k:Key]: Val throws NotFound` (`Library/Map.fsi:24-25`, `:31`). It is not an `Indexed`. It has no bounds, no indices and no range subscript.
- `IntMap` is keyed by `ZZ64` (`Library/IntMap.fsi:19-20`, `:32`). `PrefixMap` is keyed by lists (`Library/PrefixMap.fsi:34-36`, `:50`). Both extend `Generator` and not `Indexed`.
- None of the four files has changed since the team (`git diff --stat a874948ac HEAD` on them prints nothing).

**The specification** (the Working Draft, `Specification-1.0-frozen/`).
- Arrays: "A k-dimensional array A is indexed by placing a sequence of k indices"; "By default, arrays are indexed from 0" (`basic/expressions/aggregate.tex:142-146`).
- A multidimensional array's `indices` "returns a tuple of values" (`basic/expressions/generators.tex:121-126`).
- Maps: "A map m is indexed by placing an element in the domain of m enclosed in brackets" (`aggregate.tex:88-89`). Lists "are always indexed from 0" (`:107-111`).
- Linear sequences index by `IndexInt`: "only ranges of static size with element type IndexInt may be used to subscript a linear sequence" (`advanced-lib/binary.tex:100`, `:162-164`). `IndexInt` is defined nowhere in the library (`compile-ladder/rung-int-semantics-walk/JUDGE.md:33`).
- Distributions bound an array's index type by `ArrayIndex` (`advanced/parallelism-locality/distributions.tex:25-32`). `ArrayIndex` is defined nowhere; a grep of the team tree finds only those lines.
- The future-work appendix shows the team's open problem. It quotes `Indexed`'s two subscripts and says "The above overloaded declarations are not really a valid overloading". It wanted `I` to extend an `Index` type, and it notes that `a[1, 2, 3]` passes a tuple, so "we need a magic to convert that tuple argument expression to something of type Index" (`appendices/future.tex:186-207`). That design was never built.
- Its notes on arrays speak of a subscript that would "generate the same integer twice" (`future.tex:68`).

**The papers** say nothing on indexing or index types. A grep of `Papers/` for `Indexed`, "index type" and `Range[` finds no such passage.

## 2. The team's ranges

**The specification: sets of integers.**
- "A range expression is used to create a special kind of Generator for a set of integers, called a Range, useful for indexing an array or controlling a for loop" (`Specification-1.0-frozen/basic/expressions/ranges.tex:37-39`).
- "Assume that a, b, and c are expressions that produce integer values" (`:43-44`).
- "One may test whether an integer is in a range" (`:94`). Ranges compare "as if they were sets of integers" (`:97`). "A range is very different from an interval with integer endpoints" (`:108`).
- An implicit range such as `:` is defined per axis: "used as a subscript for an axis of an array for which the lower bound is l and the upper bound is u" (`:78-82`).

**The library at the team's last commit.**
- Every constructor took an integer at rank 1 and a tuple of integers at ranks 2 and 3: `opr #[\I extends AnyIntegral\](lo:I, ex:I)` and its siblings (`a874948ac:Library/FortressLibrary.fsi:2158-2185`, `:2210-2213`).
- Every range kind was bounded `I extends Integral[\I\]` (`a874948ac:Library/RangeInternals.fsi:44`, `:53`, `:85`, `:125`).
- The generic bodies work only on integers and their tuples:
  - `SCMP` and `PCMP` are declared for `Integral` and its pairs and triples only (`a874948ac:Library/RangeInternals.fsi:30-40`);
  - `CompactFullRange[\I\]`'s size branches on `ZZ32`, `(ZZ32, ZZ32)` and `(ZZ32, ZZ32, ZZ32)` alone (`a874948ac:Library/FortressLibrary.fss:3799-3806`). Those are exactly the three kinds the decision keeps.
- The rank-2 and rank-3 kinds are pairs and triples of scalar ranges: `Range2D` has `range1` and `range2`, each a `ScalarRange` (`a874948ac:Library/RangeInternals.fsi:53-56`).

**The one unbounded form was never active.**
- The "Actually want" comment writes the one-sided constructors over an unbounded `T` (`a874948ac:Library/FortressLibrary.fsi:2188-2193`; today `Library/FortressLibrary.fsi:2307`, `.fss:4009`).
- It was already commented out before Maessen's range rewrite of 2008 (`7c1b30b2b:Library/FortressLibrary.fss:3686-3691`). At that time `LowerRange[\T\](lo:T)` was a generic object, and it compared bounds with `PCMP` (`7c1b30b2b:Library/FortressLibrary.fss:3141`, `:3146`).
- My reading: one generic constructor for every rank, without the dummy argument. Rung J read it the same way (`compile-ladder/rung-ranges-zz32/REPORT.md`, section 3). It is not a plan for non-integer ranges.

**No team test, demo or example builds a range over a non-integer.**
- The grep in point 1 finds none, and no range between two character literals either.
- The seven ranges in the tree that were not over `ZZ32` were over `ZZ64` or `NN32`, and all seven are restated (FACTS, "The cheap fixes and scalar ranges over `ZZ32`...").
- The `[a:z]` of the syntax-grammar notation is a character class of the grammar, `CharacterInterval(String beginSymbol, String endSymbol)` (`ProjectFortress/astgen/Fortress.ast:1920`). It is not a range value.

**One team use treats `(:)` as a range of any index type.**
- QuickCheck's `genRange[\I\]` returns `(:)` as a `Range[\I\]` in one case of 32, `case c.random(32) of 0 => (:)` (`Library/QuickCheck.fss:491-497`).
- Only `Range[\ZZ32\]` instantiates it (`ProjectFortress/tests/QuickCheckTest.fss:67`).
- Q49's grep, which covered the tests, does not list this library line. It matters for point 5.

## 3. What the decision changed, and what it left

**What changed** (rung J, `3be1fecd7`; `compile-ladder/rung-ranges-zz32/REPORT.md`, section 4):
- The `#`, `:` and `::` block lost its integer type parameter. In the api this is the commit's only change (two hunks, `Library/FortressLibrary.fsi:2204-2265`).
- `RangeInternals` lost it throughout, and its 18 helpers lost their dummy first parameters.
- The array getters lost their dummy `0` arguments.
- `Range` now excludes `String` as well as `Number` (FACTS, "The one library's scalar ranges are over `ZZ32` alone"). So no type can be both a string and a range.

**What was lost:**
- Ranges over `ZZ64`, `NN32`, `NN64` and `ZZ`. FACTS lists the seven constructions restated, none of them in the library, the demos or microGPT.
- Ranges of ranks 2 and 3 with mixed widths (`reviews/batch-7R-conformance.md`, "What the respelling changed beyond the type parameter").
- `openRange[\I\]()` at those widths, by consequence (point 1).
- `UniformDistribution[\T\]` at a `T` other than `ZZ32`. Only `RandomTest` uses it, at `ZZ32` (REPORT, section 4).

**What was left:**
- `Indexed`, `DelegatedIndexed`, `MutableIndexed`, `ReadableArray` and the arrays: the commit's api diff has no line in them.
- The public range traits, generic in their index type.
- `Generator[\E\]`, `Map`, `IntMap` and `PrefixMap`.

**What came later.** Item 40's way (a) moved the generic range bodies that compare indices down to the `ZZ32` kinds, and `Range.CMP` became abstract (`compile-ladder/rung-range-types/REPORT.md`, section 1.2). A future range kind over another index type would now write its own `CMP`. That is more code to write, not a lost capability: the team's body only worked on integers (above).

**The answer to "did it remove a capability?"**
- On non-integer indexing, maps and generic code over `Indexed[\E, I\]`: no.
- On integer widths: yes, as decided.
- Read literally, "Scalar ranges are over `ZZ32` only" also rules out a future scalar range kind over a non-integer index, in the way Swift has `Range<String.Index>`. The team never built one. My reading: if one is ever wanted, it plugs into the public range traits as a new kind beside the `ZZ32` ones. That would be a new decision, not a revert.

## 4. The peers, briefly

**Swift** (`swiftlang/swift`, `stdlib/public/core/`, read on 2026-10-09):
- `Collection` has `associatedtype Index: Comparable`, `subscript(position: Index) -> Element` and `subscript(bounds: Range<Index>) -> SubSequence` (`Collection.swift`). This is the same shape as `Indexed[\E, I\]`.
- `public struct Range<Bound: Comparable>`. It is a `Sequence` only `where Bound: Strideable, Bound.Stride: SignedInteger`. Floating-point types "cannot be used as the bounds of a countable range" (`Range.swift`).
- `Dictionary` has `subscript(key: Key) -> Value?` beside `subscript(position: Index) -> Element`. The second "takes an index into the dictionary, instead of a key" (`Dictionary.swift`).
- So Swift keeps three things apart. Positions can be opaque, as `String.Index` is. Keys are a separate subscript. Only integer ranges can be iterated; a range over opaque positions is only an interval for slicing.

**Scala 2.13** (`scala/scala`, branch 2.13.x):
- `Range(start: Int, end: Int, step: Int)` extends `IndexedSeq[Int]`: "represents integer values in range" (`collection/immutable/Range.scala`).
- `NumericRange[T]` needs an implicit `Integral[T]` (`collection/immutable/NumericRange.scala`).
- By reading: an `IndexedSeq` is indexed by `Int`, and a `Map` looks up by key with `apply`.

**Julia** (docs.julialang.org, v1):
- `a:b` makes "a UnitRange when a and b are integers, or a StepRange when a and b are characters, or a StepRangeLen when a and/or b are floating-point". `:` "is also used in indexing to select whole dimensions, e.g. in `A[:, 1]`" (the docstring of `:`).
- An array index "may be a scalar integer, an array of integers, or any other supported index", including Colon, ranges and booleans (manual, Arrays, "Indexing").
- By reading: a `Dict` takes `d[key]` but is not an `AbstractArray`, and the bare `:` is the marker object `Colon()`, not a range.

**Where Fortress sits.**
- Every peer separates lookup by key from indexing by position.
- Julia allows ranges over characters and floats as values, but not as array indices.
- Swift's opaque positions are the one design the team's Fortress never had. Its `Indexed` has Swift's shape, but every index type it was used at is an integer or a tuple of integers, and its maps have no positions.

## 5. Q49 in that light (my reading)

**`(:)` has two roles today.**
- **The subscript marker.** Every subscript that takes `(:)` names the object's own type, `TrivialOpenRange`:
  - `Library/FortressLibrary.fsi:1298`, `:1379`, `:1419`, `:1446`, `:1466`, `:1555`, `:1588`, `:1693`, `:1824`;
  - per axis at rank 2, `Library/FortressLibrary.fss:2553-2566`.
  - Generic `Indexed` code turns the marker into `openRange[\I\]()` at its own `I` (`:1883`).
- **A range value.**
  - Its own methods (`:3869-3885`).
  - `(:) CMP (:)`, pinned at `ProjectFortress/tests/RangeDeclarations.fss:122`.
  - QuickCheck's `genRange` (point 2).

**Its history.**
- Before 2008, `(:)` was `OpenRange[\Any\]`, and the subscripts took `opr[_:OpenRange[\Any\]]` (`7c1b30b2b:Library/FortressLibrary.fsi:2002-2003`, `:1041`).
- Maessen's rewrite made it `object TrivialOpenRange extends OpenRange[\Any\]` (`0948c2b1c`, 2008-10-07; `0948c2b1c:Library/FortressLibrary.fss:3104`).
- `Any` was the team's wildcard: the marker meant "whatever the index type".

**(a) `fail` bodies.**
- It keeps both roles typed as today.
- The five methods stop at every rank. Today walk answers them at rank 1, and by reading at ranks 2 and 3 too: `truncL(x:Any) = (x#)` dispatches on a pair or triple to that rank's `#`.
- It takes nothing from indexing.
  - No team code calls these methods on `(:)` (Q49's grep; the QuickCheck line calls none).
  - The library's callers on a generic range are `opr :[\I\](r, stride)` and `opr #[\I\](r, size)` (`Library/FortressLibrary.fss:4105`, `:4110`). The library's own table of tight range uses lists no `(:)` form for them (`:4054-4103`).

**(b) Left.** Everything stays as it is, and so do the five checker sites.

**(c) `(:)` over `ZZ32`.**
- The marker role is unchanged at every rank and every index type, by reading, because the overloads name `TrivialOpenRange` itself.
- Generic `Indexed` code is unchanged: it goes through `openRange[\I\]()`, not through `(:)`'s own type.
- The value role narrows to rank 1:
  - the five methods take a `ZZ32`; today, by reading, a pair or triple also works under walk;
  - its `INTERSECTION`, `IN`, `=` and `CMP` with a range of rank 2 or 3 may change (Q49's own caveat).
- It gains one thing: `(:)` becomes a `Range[\ZZ32\]`, so QuickCheck's one instantiation types. Today `(:)` types as a range at no index type but `Any`.
- What it rules against:
  - `(:)` as a range at any index type other than `ZZ32`. No team code builds that.
  - The team's wildcard type for the marker.
- At `Indexed`'s two subscripts, `opr[r:Range[\I\]]` beside `opr[_:TrivialOpenRange]`, the two overlap today at `I = Any`, and would overlap under (c) at `I = ZZ32`. The shape is the same. The team called that pair "not really a valid overloading" (`future.tex:200`). It is not measured.

**Does (c) narrow anything the team's design needs?**
- By reading, no. Indexing at every rank takes the marker by its own type, and no team code uses `(:)` as a range at rank 2 or 3.
- It also matches the specification's per-axis reading of `:` (`ranges.tex:78-82`).
- Two things are unknown:
  - walk's values for `(:)` with ranges of rank 2 and 3, which probe P3 measures;
  - the checker's count, which P3 does not run (`coordinator/CLIMB-BATCH-12.md:402`).

**So:**
- Both (a) and (c) leave generic indexing by any `I` where the team left it.
- (a) keeps `(:)` index-agnostic, as the team made it, and gives up five walk values.
- (c) keeps the rank-1 values and gives up the wildcard type.
- Neither reverts the `ZZ32` decision, and neither needs it reverted.

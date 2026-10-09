<!-- Review of whether the decision that scalar ranges are over ZZ32 only broke a generic indexing design of the team's, with Q49's three ways read in that light; written for Pavol by a research worker reading only, on main at 720ef21e4, nothing built or run; the peers read from their own sources on 2026-10-09. Revised on 2026-10-09 after probe P3 (`9082945aa`, its outcome in `coordinator/CLIMB-BATCH-12.md`, Q49, "P3, measured"), by a writer reading only, on main at `8e276cf48`, nothing built or run: the short answer's lines on Q49 and point 5 are rewritten, and point 5 cites that commit's lines; points 1 to 4 are unchanged and cite `720ef21e4`, whose `Library/` and `ProjectFortress/` are those of P3's base `fe74fb738`. -->

# Ranges and index types

## The short answer

No. The decision did not break a generic indexing design of the team's.

- The team's generic layer is untouched by it. `Indexed[\E, I\]`, the arrays' traits, the public range traits and `Generator[\E\]` are generic in their index or element type, as the team left them. The decision changed none of their declarations; in the arrays it only dropped a dummy argument from the bounds bodies. The decision's commit changed the range constructors, `RangeInternals` and a few lines that call them (point 3).
- The team never indexed by a non-integer. Every indexed type in the team's tree is indexed by `ZZ32`, a pair of `ZZ32` or a triple of `ZZ32`, or passes its own `I` through (point 1).
- The team never built a range over a non-integer. Every range constructor since 2008 took an integer or a tuple of integers, and the team's own generic range bodies work only on those (point 2).
- Lookup by a key was always separate. `Map`, `IntMap` and `PrefixMap` are not indexed types and have no ranges. The decision did not touch them (point 1).
- What the decision did take away: ranges over the other integer widths (`ZZ64`, `NN32`, `NN64`, `ZZ`), and ranks 2 and 3 of mixed widths (point 3).
- Q49 decides nothing about indexing (point 5).
  - Probe P3 measured way (c): every subscript by `(:)` stays as it is. Ways (a) and (b) do not touch the subscripts.
  - Q49 decides what `(:)` does as a range value. Under (a), on main since climb batch 12 and now in POSITIONS, its five methods stop. Under (b), they answer as before, and five checker errors stay that the checker can never accept. Under (c), they answer at rank 1 only, and 64 of P3's 186 small programs change.

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

## 5. Q49 after probe P3

This point reads main at `8e276cf48`, and its line numbers are that commit's.

**Words used below.**
- A **value**: walk runs the program and prints a result.
- A **stop**: the run ends with an error instead.
- A **checker site**: one place in the library that the checker refuses. The **distance** counts them. It must reach zero before the compiled path can use the interpreter's library.

**What `(:)` is.**
- `(:)` is the open range: a range that means "everything". A bare `#` builds it too, so `a[#]` is `a[:]` (`Library/FortressLibrary.fss:4036-4037`).
- It is one object, `TrivialOpenRange` (`:3883-3906`).
- That object extends `OpenRange[\Any\]`. So it is a range whose index type is `Any`, the type that holds every value.
- The team used `Any` as a wildcard: "whatever the index type". `(:)` was a value of type `OpenRange[\Any\]` before 2008 (`7c1b30b2b:Library/FortressLibrary.fsi:2002-2003`), and Maessen's rewrite made it this object (`0948c2b1c`, 2008-10-07; `0948c2b1c:Library/FortressLibrary.fss:3104`).
- It has two jobs:
  - **the subscript marker**: `a[:]` is all of `a`, and `m[:, j]` is column `j` of `m`;
  - **a range value**: a program can also compare it, test membership in it, or cut it, like any other range: `(:) CMP (:)`, `3 IN (:)`, `(:).truncL(3)`.

**The five methods.**
- Every range must provide them, because the trait `Range[\I\]` declares them (`Library/FortressLibrary.fsi:2172-2178`). A range over `ZZ32` provides them at `I = ZZ32`.
- What each does, with what walk printed for `(:)` before climb batch 12 (`compile-ladder/rung-range-kinds/REPORT.md:187-191`):
  - `truncL(x)` keeps the indices at or after `x`. `(:).truncL(3)` was `LeftScalarRange(3,1)`, the range `3#`: 3, 4, 5 and on.
  - `truncR(x)` keeps those at or before `x`. `(:).truncR(3)` was `RightScalarRange(3,1)`, the range `:3`.
  - `every(s)` keeps every `s`-th index. `(:).every(3)` was `OpenScalarRange(3)`, the range `::3`.
  - `imposeStride(s)` does the same on `(:)`: `(:).imposeStride(3)` was `OpenScalarRange(3)` too.
  - `atMost(k)` keeps at most `k` indices. `(:).atMost(3)` was `ExtentScalarRange(3,1)`, the range `#3`: three indices, not yet placed.
- The team's bodies built these with the range operators: `(x#)`, `(:x)`, `(::x)`, `(::x)` and `(#k)` (`720ef21e4:Library/FortressLibrary.fss:3873-3879`).

**Why the checker cannot type them.**
- `(:)` is a range over `Any`, so it inherits each method at `I = Any`. Each takes an `Any` and must answer a range over `Any`, for example `truncL(x:Any): RangeWithLeft[\Any\]` (`Library/FortressLibrary.fss:3887`).
- Fortress generics are invariant. A range over `ZZ32` is not a range over `Any`, though every `ZZ32` is an `Any`. Fortress has no mark like Scala's `+T` that would allow it.
- The range operators take only a `ZZ32`, or a pair or triple of them, and answer a range over that type (`Library/FortressLibrary.fsi:2281-2339`). So `(x#)` with `x` an `Any` fits none of them. The checker says so at each of the five: "Could not check call to operator # - (ZZ32, ZZ32)->LeftRange[\(ZZ32, ZZ32)\] is not applicable to an argument of type Any" (`coordinator/CLIMB-BATCH-12.md:96`).
- The library has no range over `Any` to answer with. So the only body the checker can accept is one that answers nothing: a `fail`.
- Walk has no static types. It looked at the value at run time, `3`, chose the `#` over `ZZ32`, and answered.

**When the five are called.**
- Only when code calls one of them on a value that is `(:)`. There are two ways to do that:
  - directly: `(:).truncL(3)`;
  - through generic range code, written for any range. The library has two such operators: `r:s`, with a range `r` on the left, calls `r.imposeStride(s)`, and `r#n` calls `r.atMost(n)` (`Library/FortressLibrary.fss:4125`, `:4130`). So `(:):3` and `(:)#3` reach them.
- The library's subscripts never call them. Each takes `(:)` by its own type, `opr[_:TrivialOpenRange]` (`Library/FortressLibrary.fsi:1298`, `:1379`, `:1419`, `:1446`, `:1466`, `:1555`, `:1588`, `:1693`, `:1824`), and does something else:
  - the generic `a[:]` asks for `openRange[\I\]()`, an open range at the indexed value's own index type (`Library/FortressLibrary.fss:1883`);
  - a `ZeroIndexed` value, such as a string, a list or a set, answers itself (`:1913`);
  - `a[:] := b` assigns over `a`'s bounds (`:1988`);
  - the arrays of rank 1 to 3 answer a subarray of the whole (`:2259`, `:2317`, `:2540`, `:2951`);
  - `m[:, j]` and `m[i, :]` read a column or a row (`:2561`, `:2565`).
- The range kinds call the five only on themselves, on their own parts, which are scalar ranges over `ZZ32`, or on another scalar range (`Library/RangeInternals.fss:218-341`, `:367-370`, `:462`, `:608-616`, `:697-699`, `:866-868`, `:1041-1043`). `(:)` is none of those.
- I searched the 2,392 tracked `.fss` and `.fsi` files outside `explorations/` and `research/`: the library, the compiler's own library, the demos and every test folder. `(:)` appears in nine files, and `(#)`, `(:):` and `(:)#` in none:
  - the library: the five `fail` messages, and QuickCheck's `genRange` (below);
  - `ProjectFortress/tests/RangeDeclarations.fss:122`, `(:) CMP (:)`, and `RangeNarrowKinds.fss:39`, `(:).narrowToRange(:)`; neither calls the five;
  - the five tests `ProjectFortress/tests/TrivialOpenRange{TruncL,TruncR,Every,ImposeStride,AtMost}Stop.fss`, which climb batch 12 wrote to pin way (a)'s stops.
- The subscripts written with a bare `:` or `#`, such as `x0[:]`, `g[#]`, `a2[1,:]` and `a2[:,2]` (`Library/Tuple.fss:30`, `Library/List.fss:194`, `ProjectFortress/tests/subArray.fss:80-81`), go to the subscripts above, by reading.
- So no library, test or demo code calls the five on `(:)`, apart from those five tests. Before climb batch 12, none did.

**QuickCheck's `genRange`.**
- `object genRange[\I\](genI:Gen[\I\]) extends Gen[\Range[\I\]\]` makes random ranges for testing (`Library/QuickCheck.fss:491`). Its `generate` answers `(:)` one time in 32, as a `Range[\I\]` (`:494-496`).
- The team's comment above it: "Mostly for the testing of subscripts. (XXX not tested)" (`:490`). No code in the tree subscripts with its ranges.
- One caller names it: the library's default `Arbitrary`, for any `Range[\I\]` (`:732-733`, called from `:763`). One gated test reaches it that way, at `ZZ32`, and prints four draws (`ProjectFortress/tests/QuickCheckTest.fss:67`). Its `perturb` reads a range's `stride`, `left` and `right` (`:506-510`), not the five.
- This note said before that way (c) would make the `(:)` line type. That was wrong. P3 found that it types under neither (a) nor (c) (`coordinator/CLIMB-BATCH-12.md:116`).
- Why: the checker checks `generate` once, for every `I` at once, without knowing `I`. The line must answer a `Range[\I\]` for that unknown `I`.
  - Under (a) and (b), `(:)` is a `Range[\Any\]`. By invariance, that is a `Range[\I\]` only when `I` is `Any`.
  - Under (c), it is a `Range[\ZZ32\]`: a `Range[\I\]` only when `I` is `ZZ32`.
  - Neither fits an unknown `I`. That the one test uses `ZZ32` does not help: the checker does not check each use on its own.
- By reading, `generate`'s three other branches do not type at an unknown `I` either: `:` takes only a `ZZ32` or a tuple of them (`Library/FortressLibrary.fsi:2285-2306`).
- `QuickCheck` is also not among the twelve components that the distance measures (`coordinator/tools/distance/run.sh:83-85`). So `genRange` counts for none of the three ways.

**What each way means for a program you write.**
- Main runs way (a). Climb batch 12 built it as Q49's default (`abe8b0342`; PLAN item 49). POSITIONS now records it, "The open range `(:)` keeps its wildcard type, and its five cutting methods fail", an entry that ends "his confirmation after `explorations/reviews/ranges-and-index-types.md` and P3" (`8e276cf48`).
- Keeping (a) changes nothing on main. Choosing (b) or (c) instead removes the five `fail` bodies and their five tests. Under (b) the five checker sites come back. Under (c) the five bodies change type, and the checker's view of them is not measured.
- P3 compared walk's values on the library from before climb batch 12 (`fe74fb738`) with way (c). "Before" below means that library.

**(a) `fail` bodies** (on main).
- Example: `(:).truncL(3)`. Before, walk printed `LeftScalarRange(3,1)`. Now the run stops: "truncL of the trivial open range (:), whose index type is Any". The same holds for the other four, and for `(:):3` and `(:)#3`, which call two of them (`compile-ladder/rung-range-kinds/REPORT.md:187-193`).
- By reading, the same at pairs and triples: `(:).truncL((1,2))` stops too, since the body is a `fail` whatever its argument.
- The way edits only the five bodies. So the subscripts by `(:)`, `3 IN (:)`, `(1,2) IN (:)` and `(:) CMP (:)` are untouched.
- The five checker sites clear (FACTS, "The one library's `narrowToRange` and its bounds check are declared at the range kinds over `ZZ32` of rank 1 to 3").
- `(:)` stays a range "whatever the index type", as the team made it. A `fail` is the library's own way for a body that cannot answer its declared type (`coordinator/CLIMB-BATCH-12.md:98`), and (a) is the record's recommendation (`:106`).

**(b) Leave the team's bodies.**
- Example: `(:).truncL(3)` prints `LeftScalarRange(3,1)` again. The five, `(:):3` and `(:)#3` answer as before climb batch 12, at every rank.
- The five checker sites stay. The checker can never accept them as written (`coordinator/CLIMB-BATCH-12.md:104`), so the distance cannot reach zero while they stand (`:101`).

**(c) `(:)` as a range over `ZZ32`.**
- The library change: `TrivialOpenRange extends OpenRange[\ZZ32\]`, and the five take a `ZZ32`, with the team's bodies.
- Its `INTERSECTION`, `=`, `IN` and `CMP` must move to `ZZ32` too. Without them walk refuses the library: "Invalid overloading of CAP in TrivialOpenRange" (`CAP` is another name of `INTERSECTION`, `ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/Operators.java:1322`).
- By reading, `stride` must change too, from `()` to `1`: every range's `stride` is of its index type (`Library/FortressLibrary.fsi:2164`), and the checker reads that (`coordinator/CLIMB-BATCH-12.md:116`).
- P3 ran 186 programs of one expression each under walk, on the library from before and on (c). 64 differ:
  - **25 values become stops**, all at a pair, a triple or a string:
    - the five at rank 2 and 3 (10): `(:).truncL((1,2))` was `LeftRange2D(1,2, 1,1)`, and `(:).every((2,2,2))` was `OpenRange3D(2,2,2)`;
    - `(1,2) IN (:)`, `(1,2,3) IN (:)` and `"x" IN (:)`, which were `true` (3);
    - `(:) << (1,2)`, `(:).shiftRight((1,2))` and the same at rank 3, which were `(:)` itself (4);
    - the generic `:` and `#` on `(:)` with a pair or a triple, which were `OpenRange2D(2,2)`, `ExtentRange2D(4,4, 1,1)` and the same at rank 3 (4);
    - generic code that takes `(:)` as a `Range[\I\]` at a pair or triple `I`, and calls `x IN r` or `r.truncL(x)` (4).
  - **16 stops become values**, all at rank 1 with `(:)` on the left:
    - `(:) INTERSECTION r` answers `r`, for seven kinds of scalar range `r` (7);
    - `(:) CMP r` answers `GreaterThan`, or `EqualTo` for `::1` and `::2` (7);
    - `(:) FORWARD_CMP (0#3)` answers `GreaterThan`, and `(:).narrowToRange(0#3)` answers `0#3` (2).
    - Before, these stopped with "Failed to find any matching overload": the object's operators take a range over `Any`, and no range over `ZZ32` is one. No ledger row records that.
  - **16 stops stay stops**, with another error: at rank 1 with `(:)` on the right, `r INTERSECTION (:)`, `(0#3).narrowToRange((:))` and `r CMP (:)` (15), and `genRange`'s `perturb((:), g)` (1).
  - **7 values change**: `(:).left`, `.right` and `.extent` print `Nothing[\ZZ32\]` for `Nothing[\Any\]` (3); `(:)` becomes an instance of `Range[\ZZ32\]` and `OpenRange[\ZZ32\]`, and stops being one of `Range[\Any\]` and `OpenRange[\Any\]` (4).
- **Unchanged:** every subscript by `(:)` (`a[:]`, `a[:] := b`, `m[:]`, `m[:, 1]`, `m[1, :]`, `"hello"[:]`, a list's `[:]`); the five at rank 1, so `(:).truncL(3)` is `LeftScalarRange(3,1)`; `3 IN (:)`; `(:)` with itself; `INTERSECTION`, `=` and `CMP` of `(:)` with ranges of rank 2 and 3.
- The interpreter's suites, `ant testSystem`, pass on (c): 526 tests, 0 failures. No team test moves.
- With `stride` at `1`, measured on a third copy of the library:
  - `(:).stride` is `1`, where it was `()`;
  - the seven `r CMP (:)` stops become values, `LessThan` (`EqualTo` for `::1`), so 23 values are gained in all;
  - `(::1) = (:)` becomes `true`, while `(:) = (::1)` stays `false`. So `=` answers differently by side: `::1` compares strides (`Library/RangeInternals.fss:366`), while `(:)` asks whether the other is `(:)` (`Library/FortressLibrary.fss:3902`).
- Not measured: the checker under (c). By reading, the five bodies type at `ZZ32` (`coordinator/CLIMB-BATCH-12.md:116`).

**So what you decide.**
- Not indexing. Every subscript by `(:)` works the same under all three ways. P3 measured that for (c); (a) and (b) do not touch the subscripts' code.
- Not the `ZZ32` decision. No way reverts it, and none needs it reverted.
- Only what `(:)` does as a range value, in a program that cuts, strides or compares it. No code in the tree does that through the five, apart from the five tests that pin way (a).
  - (a): `(:)` stays a range over any index type. Its five methods, `(:):s` and `(:)#n` stop at every rank. The five checker sites go. This is main now, and the position POSITIONS records.
  - (b): the five methods answer as before, at every rank. The five checker sites stay, and the checker can never accept them.
  - (c): `(:)` becomes a range over `ZZ32` only. The five answer at rank 1 only. 25 values at pairs, triples and strings become stops, 16 uses at rank 1 of its `INTERSECTION`, `CMP`, `FORWARD_CMP` and `narrowToRange` that stopped before start working (23 with `stride` at `1`), and 7 values print differently. Four operators, and likely `stride`, change beside the five.

<!--
2026-09-26. The top-tier judgement on the three Number-typed big operators BIG MAXN, BIG MINN
and BIG MINMAXN (the answer-7 judgement's alternative 3), and on Pavol's question whether the
coercions between number types must preserve each operation's identity; prepared for Pavol
before anything is built, under his permission of 2026-09-26 (POSITIONS, the entry after
answer 7). His question was taken as open: nothing here is drawn from anyone's earlier answer
to it. Sources: Library/FortressLibrary.{fss,fsi}, Library/RangeInternals.fss,
Library/CompilerLibrary.fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, the
interpreter's glue/prim/Float.java; Specification/basic-lib/numbers.tex,
Specification/basic-lib/basic-integers.tex, Specification/advanced-lib/numbers-advanced.tex,
Specification/advanced-lib/algebraic-constraints.tex, Specification/basic/conversions-
coercions.tex, Specification/advanced/parallelism-locality/defining-generators.tex, the later
restart's Documentation/Specification/Prose/Language/Operators/operator-overview.tick; the
team's tests simpleSum.fss, zeno.fss and Generator2Test.fss; POSITIONS 2026-09-24 (route A)
and 2026-09-26 (answers 7 and 8); reviews/sum-replacement-judgement.md and
reviews/flattening-questions-ways.md Question 1 with their captures. Four probes on both
paths, captures under max-min-identities-judgement/ (walk.sh, comp.sh, make-lib.sh, the
library copies made by variants/*.py in a private scratch directory; nothing tracked
touched, no shared cache used). Machine for every capture: 4 cores, Intel Xeon 2.10 GHz,
JDK 25.0.4, FORTRESS_THREADS=1, load 0.4 to 1.7 at start because climb batch 5 ran beside
the probes; no timing was taken and none is used. The peers' behaviour is from their
reference documentation, not measured.
-->

# Maximum, minimum and the identities under coercion: a judgement

## The decision in three sentences

The coercions between the number types need no rule about identities: a sum's zero and a
product's one are carried into every wider type by the arithmetic the coercion already
preserves, and answer 7 never carries an identity across types anyway, since it makes the
identity at the fold's own type. A maximum's identity is different in kind, the least value
the whole type has, and a narrower type's least value is not the wider type's, so it cannot
be carried; the three operators built on that idea, `BIG MAXN`, `BIG MINN` and
`BIG MINMAXN`, have no caller anywhere and are dropped in batch 6's flattening rung, the
library's own `BIG MAX`, `BIG MIN`, `BIG MINMAX` (an error on nothing) and `BIG MAXNUM`,
`BIG MINNUM` (RR64, identity NaN) covering every use. The alternative, kept measured here,
is to keep the three names for the types that have a least and a greatest element.

## The terms, once

- **A reduction** is an object with `join(a, b)`, the operation, and `empty()`, its
  **identity**: the value that leaves any other unchanged, `z + x = x`. It is what a fold
  over nothing answers. The specification's rule (`defining-generators.tex:57-61`): a
  generator "is permitted to group reduction operations in any way it likes ... and insert
  an arbitrary number of `empty` elements", and "if `empty` is not the identity of `join`
  ... unpredictable results". So the identity is not a placeholder for the empty case; it
  is joined into folds that are not empty. The library does exactly that in two common
  places, measured below: a filter clause (`[j <- 0#4, j > 1]`) joins `empty()` for every
  element the filter drops (`FortressLibrary.fss:3447`), and a sequential range
  (`seq(0#4)`) starts its accumulator from `empty()` (`RangeInternals.fss:1068`).
- **A coercion** is the automatic conversion of a value of a narrower type into a wider
  one, declared on the wider type (`ZZ64`'s `coerce(x: ZZ32)`), applied at a typed
  binding, a parameter or a declared return (`conversions-coercions.tex:98-108`). Answer 8
  declares them between the integer widths, and from `ZZ32` and integer literals into
  `RR64`. `widen(x)` is the same conversion written by hand, and is what the probes use
  on today's library.
- **The least element** of a type is the value below every other value of the type; the
  **greatest** is above every other. `ZZ32`'s are -2147483648 and 2147483647; `RR64`'s are
  -∞ and +∞; `ZZ` and `QQ` have none, since there is always a smaller integer and a
  smaller rational. A type with a least element is called **bounded below**.
- **A selection** is an operation that answers one of its two arguments unchanged. `MAX`
  and `MIN` are selections (`QQ`'s `MAX` is `if self > other then self ... else other`,
  `FortressLibrary.fss:549-550`); `+` and multiplication are not, they compute a new value.
- **Walk** is the interpreter; **the compiled path** is the bytecode compiler, which today
  runs only with its own prelude (`CompilerLibrary`), where the number types are already
  siblings and `ZZ64` coerces from `ZZ32`.
- **The static argument** is the type written at a big operator, `SUM[\ZZ32\][j <- ...]`;
  answer 7 chooses the identity from it alone.

## 1. The answer to his question

**Do the coercions need to preserve the identities?** For sum and product, no rule is
needed, because they cannot fail to. A coercion between number types is a conversion that
keeps the arithmetic: `widen(3 + 4) = widen(3) + widen(4)`, which is the property that
makes inserting it anywhere safe at all. From that alone the zero is carried: the
converted zero equals itself plus itself (`c(0) = c(0 + 0) = c(0) + c(0)`), and the only
value that equals itself plus itself is the wider type's zero. The one is carried the same
way: the converted one equals its own square, so it is the wider one or the wider zero, and
it is not the zero, because the conversion already sends the zero there and sends no two
values to one. In plain words: zero is zero in every width, and the conversion has nowhere
else to send it.

Measured on walk (`MaxMinWalk.walk.txt` § 5), with `y` a `ZZ64` below `ZZ32`'s range:
`widen(0) + y = y` and `widen(1) y = y`; into `RR64`, `0 + (-1.0e300) = -1.0e300`. On the
compiled path, where the coercion is real (`MaxComp.comp.txt`): `s: ZZ64 = SUM[j <- 0#0] j`
converts `ZZ32`'s zero into `ZZ64` at the typed binding, and `s + y = y`.

**Does a narrower type's identity, once coerced, still act as the wider type's identity?**
For `+` and multiplication, always, by the argument above. For `MAX` and `MIN`, no. The
identity of `MAX` is not an arithmetic fact about a value but a fact about the whole type:
it is the type's least element, and the identity of `MIN` is its greatest. A conversion into
a wider type keeps the order (`a < b` stays `c(a) < c(b)`), but the wider type has values
below the narrower type's least one, so the converted least element is no longer least, and
so no longer an identity. Measured: on walk, `widen(ZZ32 minimum) MAX y = -2147483648`, not
`y`; `widen(ZZ32 maximum) MIN (-y) = 2147483647`, not `-y`; into `RR64`,
`m32 MAX (-1.0e300) = -2.147483648e9`. On the compiled path, `m: ZZ64 = BIG MAX[j <- 0#0] j`
holds `ZZ32`'s least element -2147483648 converted into `ZZ64`, and `m MAX y = m`, where an
identity would have given `y` (`MaxComp.comp.txt`). Among the coercions answer 8 declares,
none carries a least or greatest element: `ZZ32` into `ZZ64`, `ZZ32` into `RR64` both fail
as measured, and `ZZ` and `QQ` have none to carry.

The specification says the same in its own words. A type has an identity for `MAX` only
when it "has a minimal element" (`PartialOrderAndJoinBoundedLattice`,
`algebraic-constraints.tex:1280-1290`; `HasMinimalElement`, `:472-489`), and among the
number types only the rational types that hold `-∞` are such (`numbers-advanced.tex:279-288`:
join-bounded exactly when the type can hold `-∞` and cannot hold `0/0`); `ZZ` and `QQ` are
declared plain lattices with no bound (`basic-integers.tex:204`, `numbers.tex:183`). And the
specification's own design for identities (`Identity[\+\]` coerced *into each type*,
`numbers.tex:184-190`, `algebraic-constraints.tex:772-797`) makes each type produce its own
identity from an abstract identity object; it never asks a coercion between two number types
to carry one.

**Is that already the case for SUM and PROD under answer 7?** Yes, and it needed no rule.
Under answer 7 the identity is made at the fold's own type from the static argument
(`additiveIdentity[\T\]()`), and the elements are of that type too, so inside a reduction
no identity is ever coerced. An identity leaves a reduction only as the value of an empty
fold, say an empty `ZZ32` sum stored in an `RR64` variable, and there the conversion sends
0 to 0.0, the `RR64` zero, by the argument above. Every peer that types its sum does the
same (Julia's `zero(T)`, Rust's per-type `Sum`, Haskell's `fromInteger 0` at the result
type); none has a rule about it.

**What does it mean for maximum and minimum?** Three things.

1. An empty maximum has no one value for all number types. For the bounded types it is
   the type's least element (`ZZ32` -2147483648, `ZZ64` -9223372036854775808, `RR64` -∞,
   the unsigned types 0); `ZZ` and `QQ` have none, and their empty maximum can only be an
   error. Today's `BIG MAXN` answers the rational `-1/0` for every type (measured:
   `-1/0 : Ratio`), which is `-∞` in `QQ`'s extended form and a value of no integer or
   float type; that is what the team's comment "(what is -1/0?)" is doubting. On the flat
   tower `empty(): T` must be a `T`, and there is no `T` for which `-1/0` serves all.
2. A per-type identity works only when the fold runs at that type, exactly as answer 7's
   zero does, and then it works well: with the three names rebuilt on answer 7's device in
   a private copy (`MaxNWalk.maxn.walk.txt`), `BIG MAXN[\ZZ32\][j <- 0#0] j` answers
   `-2147483648 : Int`, `BIG MAXN[\RR64\][t <- a0] t` answers `-Infinity : Float`, and the
   identity joined into a filtered or a sequential fold leaves the value and the type
   unchanged (`3 : Int`, `1.25 : Float`).
3. The difference in kind shows when an empty fold's value leaves its type. An empty sum's
   zero, coerced wider, is harmless wherever it lands; an empty maximum's least element,
   coerced wider, is a wrong maximum there (`m MAX y = m` above), the same trap as Java's
   `Integer.MIN_VALUE` widened to a `long`. Nothing in the library or the programs does
   this today; it is what a rule would have to forbid if the three operators were kept
   for the bounded types, and it is one reason the library's own generic `BIG MAX` has no
   identity at all.

One more measured fact explains today's behaviour and warns about tomorrow's. Because
`MAX` is a selection, today's rational identity joined into an integer fold hands the
integer back untouched: `BIG MAXN[j <- 0#4, j > 1] j` is `3 : Int` and
`(BIG MAXN[j <- 0#0] j) MAX 5` is `5 : Int`, through `QQ`'s `MAX`, which an `Int` reaches
by subtyping today. On the flat tower an integer reaches `QQ`'s `MAX` only by coercion,
which converts it to a rational before `MAX` sees it, so the selection would hand back the
converted rational and an integer fold would answer a `QQ`. (By reading: the flat copy does
not run on walk, `FlatMaxWalk.flat.walk.txt`.) Either way the identity of another type is
wrong for the fold; a sum's zero of another type is not, because `0 + x` computes `x` at
the wider of the two types, which is `x`'s own when the zero is narrower (measured:
`SUM[t <- a3, t > 1.0] t = 3.5 : Float` with today's integer 0 joined in).

## 2. What the library already does in this family

The standard is the library's own practice (POSITIONS 2026-09-19), so this comes before
any option.

1. **`BIG MAX`, `BIG MIN`, `BIG MINMAX`** are the library's generic extremum reductions:
   `MinReduction[\T extends StandardMin[\T\]\]`, joined with `T`'s own operator, no
   identity, the fold lifted to `Maybe` so that a filtered or sequential fold has a
   `Nothing` to join, and an empty fold throws `EmptyReduction`
   (`FortressLibrary.fss:2907-2927`, `:3117-3147`). The team's own test asserts the error:
   `simpleSum.fss:56-60` folds `BIG MIN` over a range filtered to nothing and fails if it
   returns. `zeno.fss:95` uses a filtered `BIG MAX`. Measured today (`MaxMinWalk.walk.txt`
   § 3): filtered and sequential folds answer the element's value and type, the empty fold
   throws. The four tuple forms `BIG MIN_MIN` ... `BIG MAX_MAX` are the same shape
   (`:3165-3244`).
2. **`BIG MAXNUM`, `BIG MINNUM`** are the library's one extremum with an identity: `RR64`
   only, built from a join and a written identity `0.0/0.0`, NaN, through
   `MapReduceReduction` (`:3149-3161`). NaN is a true identity of `MAXNUM` (the operator
   returns the number when one argument is NaN, `:450-469`), and measured it behaves as
   one: the empty fold is `NaN`, a filtered fold with NaN joined in is unchanged
   (`1.25 : Float`). Astra's microGPT programs used `BIG MAXNUM` for their softmax
   maximum (`explorations/astra/worker/main/MicroGPT.fss:122`).
3. **The three `N` operators** (`:3076-3114`): `MaxReductionN`, `MinReductionN`,
   `MinMaxReductionN`, all `CommutativeMonoidReduction[\Number\]`, joined with `Number`'s
   `MAX`/`MIN` (the catch-alls that convert to float, `:352-423`), identities `-1/0`,
   `1/0` and the pair, under the comment "(what is -1/0?)". No caller in the library, the
   tests, the demos, the specification or the programs (a tree-wide search; the only uses
   are the ways note's probe). Two slips sit beside them: `MinMaxReductionN.empty()` is
   declared `Number` and returns a pair (`:3101`), and `SumReduction.distribute(r:
   MinReductionN)` returns `MaxNSumReductionPair` (`:3049-3050`; the ways note saw it).
   Measured today: nonempty folds answer the element's type (`3 : Int`, `0.25 : Float`),
   the empty fold `-1/0 : Ratio` and `(1/0,-1/0)`.
4. **The compiled prelude's `ZZ32Max`** (`CompilerLibrary.fss:468-471`, Steele's 2011
   flattening) gives its one `BIG MAX` an identity, `ZZ32`'s least element, written as
   `(-32768) TIMES 65536`; measured, `BIG MAX[j <- 0#0] j = -2147483648`. So when the
   designer flattened, he chose the type's least element for the one type he had, under
   the name `BIG MAX`; the interpreter's `BIG MAX` throws instead. At the switch-over the
   interpreter's library replaces the prelude, and C4's `BIG MAX z` is never empty.
5. **The least and greatest elements by name**: `ZZ32` and `ZZ64` carry `getter minimum()`
   and `getter maximum()` (`:649-650`, `:707-708`), instance getters that need an element
   in hand; `RR64` has none (its infinities are written `1.0/0.0`); `ZZ` and `QQ` have none.
   The compiled prelude has no such getters.
6. **Choosing by the static argument alone** is answer 7's device, the `typecase` over a
   `() -> T` witness (`:2243-2250`); the "keep" alternative below is built on it and
   measured.
7. **The specification** puts a `MAX` identity only on the types with `-∞` (§ 1). Its later
   restart, the designers' later word, says only how `MAX`/`MIN` and `MAXNUM`/`MINNUM`
   treat NaN and that `-0 < +0` (`operator-overview.tick:241-252`), nothing about empty
   folds.
8. **`Generator2Test.fss:58-76`** writes `BIG MAX[\Number\]` and `SUM[\Number\]` six
   times each, on nine lines, over a `Number[10]` array, resting on `Number extends
   StandardMinMax[\Number\]`, which the flattening removes; see § 5.

**The peers**, by family, from their reference documentation. *JVM*: Java's `IntStream.max()`
answers `OptionalInt`, `Collections.max` throws on an empty collection, `Math.max`
propagates NaN; Scala's `max` throws `empty.max` and `maxOption` answers `None`; Kotlin's
`maxOrNull()`. *Close to the metal*: Rust's `Iterator::max()` answers `Option`, `None` on
empty, and the idiom for a fold with an identity is `fold(f64::NEG_INFINITY, f64::max)`
with the type's own constant; C++'s `max_element` answers the end iterator on empty.
*Scientific*: Julia's `maximum(Float64[])` throws "reducing over an empty collection is
not allowed" and takes `init=typemin(T)` when asked; NumPy's `np.max([])` raises "zero-size
array to reduction operation maximum which has no identity" (`np.maximum.identity` is
`None`, `np.add.identity` is 0) and takes `initial=-np.inf`; APL and Fortran are the other
family: every APL primitive has a declared identity and `⌈/⍬` is the most negative
representable number of the type, and Fortran's `MAXVAL` of a zero-size array is
`-HUGE(x)`. *Unbounded*: Python's `max([])` raises `ValueError` unless `default=` is
given; Haskell's `maximum []` errors, and its `Max a` is a monoid exactly when `a` is
`Bounded`, with `mempty = minBound`, so `Max Integer` is no monoid at all, which is the
`ZZ` case stated as a type-class law. Every peer's empty sum is the type's zero.

So the peers split as the library does: the general-purpose languages make the empty
maximum an error or an optional answer (the library's `BIG MAX`); the array languages and
Haskell's bounded case use the type's least element (the compiled prelude's `ZZ32Max`,
and the `MAXNUM` shape). No peer has one identity for all number types, which is the only
shape the three `N` operators have.

## 3. The options for the three operators

**A. Drop them.** The three objects, the six operator declarations, the two fusion pairs
that name them (`MaxNSumReductionPair`, `MinNSumReductionPair`, `:3022-3031`) and the
`DistributesOver` markers and `distribute` overloads for them in `SumReduction`
(`:3033-3050`) go, in the api as in the component (`FortressLibrary.fsi:1817-1871`); the
answer-7 text already replaces the whole block from `SumProdReductionPair` to
`BIG MINMAXN` (its probe copy dropped them, `sum-replacement-judgement/variants/sumlib.py`).
No caller changes. Every use is served: a maximum over anything by `BIG MAX`, with the
library's own rule that an empty one is an error; a float maximum with an identity by
`BIG MAXNUM`. The specification names none of the three, so nothing there changes. The
2010 api snapshot `CompilerLibrary/FortressLibrary.fsi` mentions them and stays as it is,
a historical copy. Cost: nothing beyond what answer 7 already does.

**B. Keep the names, each type's least and greatest element from the static argument.**
Measured in a private copy on today's tower (`variants/maxn.py`, `MaxNWalk.maxn.walk.txt`):
two identity functions on answer 7's device, `leastElement[\T\]()` and
`greatestElement[\T\]()`, with one branch per bounded leaf and `throw EmptyReduction` for
`ZZ` and `QQ`; three generic objects and six declarations over the bound the library's
`BIG MAX` uses, `StandardMax[\T\]`, about 60 library lines with the eight leaves. What it
gives: `BIG MAXN[\ZZ32\]` over nothing `-2147483648 : Int`, over `RR64` `-Infinity :
Float`, and the identity joined into a filtered or sequential fold leaves value and type
unchanged. What it costs: the static argument must be written on every clause form, as
answer 7's sums write it (the unwritten `BIG MAXN[j <- 0#4] j` dies at Bottom exactly as
the unwritten sum does, `MaxNWalk.maxn.walk.txt` last lines); and for `ZZ` and `QQ` the
throwing identity misbehaves where `BIG MAX` does not: a filtered fold over `ZZ` throws
`EmptyReduction` even when elements remain (measured, `BIG MAXN[\ZZ\][j <- 0#4, j > 1]
...` throws, while the unfiltered fold answers `3 : BigNum`), because the filter asks for
the identity per dropped element. To be right, B needs a bound that admits only the bounded
types, which the library does not have (the specification's `HasMinimalElement` is not in
it) and would be a new trait on five leaves; or it needs `ZZ` and `QQ` left out of the
witness, which makes the operators partial over `StandardMax`. No program wants any of it.

**C. Keep the names restricted to `RR64`, identities `-∞` and `+∞`.** The `MAXNUM` shape
(per type, `MapReduceReduction`), about ten lines; it differs from `BIG MAXNUM` only in
answering NaN when any element is NaN. No caller; the specification's `MAX` versus
`MAXNUM` distinction is already carried by the two-argument operators.

**D. A form that answers `Nothing` on an empty fold** (Rust's and Scala's shape). The
library computes exactly that inside `BIG MAX` and unlifts it by throwing; exposing it
would be a new operator shape with no precedent in the library, not a rung of the
flattening.

## 4. Recommendation, alternatives, where it lands

**Recommendation: A, drop them.** The library's own way for a generic maximum is `BIG MAX`'s,
no identity and an error on nothing, and the team's test asserts it; where the library
wanted an identity it built one per type (`BIG MAXNUM` for `RR64`, `ZZ32Max` in the
compiled prelude), never one for all numbers. The three operators are the one shape no
peer has and the flat tower cannot type: their identity is a value of `QQ`'s extended
form that no integer or float fold can hold, and a maximum's identity cannot be carried
between types the way a sum's zero is (§ 1). They have no caller. Nothing is lost that
`BIG MAX` and `BIG MAXNUM` do not give, and the two slips beside them go with them.

**Alternatives, for Pavol to weigh.**

1. B, if he wants the names for the bounded types: measured to work with the static
   argument written, at about 60 library lines plus a bound or a rule for `ZZ` and `QQ`
   that the library does not have today. Recommended against: an operator that is an
   error on `ZZ` and `QQ` for a filtered fold with elements in it is worse than `BIG MAX`,
   which never is.
2. C, if he wants the float form with `-∞`: ten lines beside `BIG MAXNUM`. Recommended
   against for lack of a caller; it can be added the day a program wants NaN-propagating
   maxima with an identity.

**Where it lands.** Batch 6's flattening rung, in the same block the answer-7 text replaces,
so nothing is added to the rung's plan; one line in the rung's brief saying the three are
dropped and why, one ledger row at the gather recording the drop with the team's comment,
the two slips, and this note as the reference. No specification change (the three are not
in it); no model line changes; no test line changes for the three (no caller).

## 5. What this finds about answer 7

1. **The witness's branch order matters on the nested tower and not on the flat one.** The
   first run of the keep-them copy, on today's tower, had branches for `ZZ32`, `ZZ64` and
   `RR64` only; for `T = ZZ` the `() -> RR64` branch was taken, since a `() -> ZZ` is a
   `() -> RR64` while `ZZ` is a subtype of `RR64`, and the reduction's `join(a: ZZ, ...)`
   then refused the float (`MaxNWalk.maxn-first.walk.txt`); with `ZZ` and `QQ` given
   branches before `RR64` it ran (`MaxNWalk.maxn.walk.txt`). Answer 7's identity functions
   list all eight leaves, and on the flat tower no leaf is another's subtype, so the order
   is immaterial there; but the rung lands the flattening and the replacement together, and
   should its copy ever be run on the nested tower (a first commit, a bisect), the rule is:
   each leaf's branch before any of its supertypes', narrowest first, `ZZ` and `QQ` before
   `RR64`. The answer-7 probe copy (three leaves) has this hole on today's tower for `ZZ`
   and `QQ` sums; the rung's eight-leaf text does not.
2. **The identity is joined into folds that are not empty**, by filters and sequential
   ranges (§ terms, measured in `MaxMinWalk.walk.txt` §§ 1-2), so answer 7's identities must
   be true identities at `T`, which 0 and 1 are. One float footnote, measured:
   `0.0 + (-0.0) = 0.0` (IEEE's exact identity of `+` is `-0.0`), so a filtered or
   sequential sum of `[-0.0]` answers `+0.0`; today's integer 0 gives the same through the
   catch-all, every peer that uses `0.0` has it, and nothing changes.
3. **The approved C4 line `BIG MAX z`** (bare form over an `RR64` array, POSITIONS answer
   7) rests on `RR64` becoming `StandardMax[\RR64\]` on the flat tower, a claim by reading.
   It cannot be measured on walk until the rung's copy runs: the keep note's flat copy
   fails to load on walk (`Operator prefix SQRT is not defined`, its
   `FortressLibrary.fss:2242`, `FlatMaxWalk.flat.walk.txt`), since it dropped `Number`'s
   `SQRT` that `Vector` uses. The rung's gate is where it shows; it was accepted on the
   checker already (the answer-7 judgement's table 2).
4. **Nine test lines not on any list yet.** `Generator2Test.fss:58-60, 66-68, 74-76`
   write `BIG MAX[\Number\]` and `SUM[\Number\]` over a `Number[10]` array
   (`xs : Number[10] = [ 1 3 4 ... ]`, `:53`). On the flat tower `Number` is neither a
   `StandardMax[\Number\]` nor an `AdditiveGroup[\Number\]`, so these fail their bounds
   after answer 7, and the array's element type must change with them (to `ZZ32`). They
   are not among the answer-7 judgement's 32 lines (those are clause forms without a static
   argument) and I found them on no flattening list; batch 6's test-edit count should take
   them in, flagged as edits to the team's tests like the others.
5. **Two more library slips in the family**, for the ledger with the rung: `StandardMinMax`
   declares its default `MIN` and `MAX` as returning `(T,T)` while their bodies return one
   `T` (`FortressLibrary.fss:260-261`), and `LiftedCommutativeMonoidReduction.empty()` is
   declared `Nothing[\R\]` and returns `Just(...)` (`:2934`). Walk does not check them; the
   checker will, on the flat library, so they are switch-over work, not batch 6's.

## Appendix. The probes and captures

All under `explorations/reviews/max-min-identities-judgement/`. `walk.sh <Name> [variant]`
runs a probe on walk in a private cache, on the tree's library or on a private copy edited
by `variants/<variant>.py` (`maxn`: today's tower with answer 7's SUM/PROD from
`../sum-replacement-judgement/variants/sumlib.py` and the keep-them shape of the three
operators from `variants/maxnlib.py`, bound `Number` as the earlier walk probe used;
`flat`: the keep note's flat copy, which turns out not to load on walk); `comp.sh <Name>`
compiles and runs in the compiler's world on the flattening worker's library cache;
`make-lib.sh` makes the copies. Captures, each with the machine and the load on its first
line: `MaxMinWalk.walk.txt` (today's library: the three operators, the same shapes for
`SUM`, `BIG MAX` and `BIG MINNUM`, the identities under `widen`, `RR64`'s own least element
and zero); `MaxComp.comp.txt` (the compiled path: `ZZ32`'s least element and zero coerced
into `ZZ64`); `MaxNWalk.maxn.walk.txt` and `MaxNWalk.maxn-first.walk.txt` (the keep-them
shape, after and before the branch-order fix); `FlatMaxWalk.flat.walk.txt` (the flat copy
does not load on walk).

# Independent design review — `02d09a39f`, four changes to the sealed standard library

Reviewer: independent design reviewer, blinded from the designing workers' write-ups
(`run-c4/cold-cache/`, `reviews/c4-flatarrays-review.md`, `coordinator/array-design.md`,
ledger rows 341/342 were not opened). Read-only; nothing built, nothing run. All line
numbers are HEAD (`02d09a39f`) unless a commit is named.

---

## 0. What was moved into the standard library, in one list

| # | Site | Statement |
|---|------|-----------|
| 1 | `FortressLibrary.fss:4496-4504` (api `:2540-2547`) | the four ground integer operators `+ - MIN MAX` over `(Array[\ZZ32,ZZ32\], ZZ32)` become eight generic ones over `(Array[\T,I\], T)` and `(T, Array[\T,I\])` for `T extends Number` |
| 2 | `:327-328` (api `:250-251`) | a new empty marker trait `AnyAdditiveGroup`, which `AdditiveGroup` now extends |
| 3 | `:612` (api `:409`) | `trait AnyIntegral extends { QQ } comprises { ZZ } end` — the tower's last open `comprises` link is closed |
| 4 | `:2669` (api `:1659`) | `Array3 excludes { Number, String, AnyAdditiveGroup, AnyMultiplicativeRing }` |

Nothing else in the library changed. Change 1 is the user-visible service; change 3 is
what makes change 1 loadable; changes 2 and 4 are an independent capability (they are not
needed by change 1) that lets *user* code declare an operator whose other operand is a
rank-3 array.

---

## Change 1 — the generic scalar-extension block

**1. What it adds.** "An array of numbers and one number, either way round": `a + s`,
`s + a`, `a - s`, `s - a`, `a MIN s`, `s MIN a`, `a MAX s`, `s MAX a`, elementwise, for
any element type under `Number` and any index type — where the library previously served
only 1-D `ZZ32` arrays with the scalar on the right.

**2. Precedent.** Three separate precedents, all in the library, all opened:

* *The type-variable shape* is copied verbatim from the array operators the team wrote for
  `Vector` and `Matrix`. `:2271-2280`:
  ```
  opr DOT[\ T extends Number, nat n \](me : Vector[\T,n\], other : T) : Vector[\T,n\] = me.scale(other)
  opr juxtaposition[\ T extends Number, nat n \](me : Vector[\T,n\], other : T) : Vector[\T,n\] = me.scale(other)
  opr DOT[\ T extends Number, nat n \](other : T, me : Vector[\T,n\]) : Vector[\T,n\] = me.scale(other)
  opr juxtaposition[\ T extends Number, nat n \](other : T, me : Vector[\T,n\]) : Vector[\T,n\] = me.scale(other)
  ```
  and the identical four for `Matrix` at `:2647-2659`. So `[\T extends Number, …\]`, an
  array on one side, a bare `T` on the other, **and both operand orders** are the library's
  own established shape for scalar extension. This is the strongest single fact in the
  commit's favour.
* *The body* is the library's own idiom: `Vector.scale(t: T) = map[\T\](fn (v) => t v)`
  (`:2200`), `Matrix.scale(t1: T) = map[\T\](fn (e:T):T => t1 e)` (`:2508`),
  `Vector.opr -(self) = map[\T\](fn (e: T):T => - e)` (`:2199`). The removed bodies used
  `x.copy()` plus an in-place `for` loop; since `copy()` is itself
  `replica[\T\]().fill(…)` (`:2134`) and `map` is `replica[\R\]().fill(f ∘ get)` (`:2138`,
  `:2400`, `:2763`), the rewrite is behaviour-preserving and one traversal shorter.
* *The direction of the generalisation* is integer → any number, which is exactly the
  owner's endorsed move. What the library shipped was an integer-only convenience; what it
  now has is the same convenience over the numeric tower.

It **generalises an existing pattern**; it introduces no new shape. Two sub-points where
the precedent runs out:

* The `Vector`/`Matrix` precedents are for *commutative* operations (both orders call the
  same `me.scale(other)`). `opr -(y: T, x: Array[\T,I\]) = x.map(fn e => y - e)` is a
  genuinely new semantic decision — there is no reversed-order non-commutative operator
  anywhere in the library. The reading chosen (`y - e`, elementwise, not `-(e - y)` and not
  a reversed fold) is the only sensible one, and it is what every array language means; but
  it is a decision, not a copy.
* The precedents **preserve the operand's type** (`Vector[\T,n\] → Vector[\T,n\]`); the new
  block returns the *unsized* `Array[\T,I\]`. Rank and size leave the static type. In the
  interpreter this is invisible (dispatch is dynamic, and `map` goes through `replica`, so
  `m + 1.0` is still dynamically a `Matrix`), but it is a departure from the shape it cites.
  In fairness it is inherited from the block it replaced, which also returned the unsized
  `Array[\ZZ32,ZZ32\]`. See §6.

**3. microGPT/C4/APL specificity.** None in the declarations. `[\T extends Number, I\]`
over `Array[\T,I\]` is the most general form the library's own vocabulary can express, and
it is rank- and element-agnostic. A library user gains: elementwise scalar arithmetic and
clamping on *any* array — `Array1`, `Vector`, `Array2`, `Matrix`, `Array3`, sub-arrays,
transposed views, any `I` — where before only `Array[\ZZ32,ZZ32\]` with the scalar on the
right worked. `m + 1.0` and `0.0 MAX v` are now expressible; before the change they were a
"Failed to find any matching overload". Two things a user would reasonably expect and still
does not get, and both are asymmetries the change creates rather than removes:

* `opr PREFIX_SUM` / `opr SUFFIX_SUM` sit three lines above (`:4483`, `:4490`) and remain
  `Array[\ZZ32,ZZ32\]`-only. A reader now sees four generic operators wedged between two
  integer-only ones. Generalising them is the same move and would keep the block coherent.
* The spec's own prose sanctions *multiplication* of a vector or matrix by a scalar
  (juxtaposition) and *division* by a scalar (`Specification/basic/operators/opr-overview.tex:143-148`:
  "Multiplication of a vector or matrix by a scalar is done with juxtaposition … Division of
  a matrix or vector by a scalar may be expressed using `/`"). After this change `+ - MIN MAX`
  work at every rank while scaling and `/` still work only at ranks 1 and 2 (and `/` by a
  scalar is nowhere in the library at all). Note the direction of the irony: the operators
  the spec actually promises are the ones still missing; `+`/`MIN`/`MAX` against a scalar is
  APL-style broadcast that the specification never mentions. It is, however, the library's
  own 2012 invention, so the precedent for *serving* it is internal and real.

**4. Anything commented out / off the source path.** The block itself was live code, not
commented out. Nothing dormant is reinstated here. The commented-out material nearby is
unrelated (`immutableArray2/3` factories at `:1944-1960`).

**5. Overloading rules.** Each of the eight is checked against the other seven and against
the 40 self-parameter declarations of `+ - MIN MAX` in the library (`AdditiveGroup:333`,
`StandardMinMax:236,247`, `StandardTotalOrder:279-280`, `MinMax:260-261`, `Number:374-379`,
`QQ:547-559`, `Integral:621`, `ZZ32:659`, `ZZ64:727`, `NN64:781`, `ZZ:844`, `Vector:2195`,
`Matrix:2503`, …). The Subtype Rule (`Specification/advanced/overloading.tex:162`) never
applies — no parameter type is a subtype of its counterpart. The Meet Rule (`:247`) is not
satisfied — there is no disambiguating `f(Ps ∩ Qs)` declaration. So everything rests on the
**Incompatibility Rule** (`:212`), which requires `Ps ⋈ Qs`, i.e. exclusion. Concretely:

* vs `Number.opr +(self,b:Number)` (`:379`) and `Number.opr MIN/MAX(self,b:Number)`
  (`:374-375`): pair 0 is `Array[\T,I\]` against `Number`. `Array[\E,I\]` (`:1889`) has **no**
  `excludes` clause of its own — only its rank-specific subtraits do (`Array1:2099`,
  `Array2:2295`, `Array3:2669`) — so the exclusion has to be *derived*, and it can be, but
  only once `Number`'s transitive `comprises` bottoms out in objects. That is change 3.
* vs `AdditiveGroup.opr +(self, other: T')` (`:333`) and `StandardMinMax`/
  `StandardTotalOrder.MIN/MAX(self, other: T')` (`:236,247,279-280`): pair 0 cannot exclude
  (`Vector` and `Matrix` really are `AdditiveGroup`s and `Array`s at once), so the whole
  overloading hangs on pair 1: the bound `Number` of the new declaration's `T` must exclude
  the symbolic bound `AdditiveGroup[\$T'\]` / `StandardMinMax[\$T'\]` of the method's own
  type variable. Again derivable only after change 3.

I verified the interpreter's machinery rather than taking the commit message on trust.
`OverloadedFunction.java:436` sets `distinct` if **any** parameter pair excludes;
`:493-497` refuses outright when a symbolic parameter is present and nothing excludes
("…has a parameter with generic type, at least one pair of parameters must have excluding
types", `:527`). `FType.java:280-297` decides exclusion between two extensible traits by
pairing every leaf of one's transitive `comprises` against every leaf of the other's and
requiring all pairs to exclude, with `FTypeTrait.computeTransitiveComprises` (`:71-78`)
returning `{this}` for a trait *without* a comprises clause. So the commit's diagnosis is
exactly right: with `AnyIntegral` open, `Number`'s leaf set contained the bare trait
`AnyIntegral`, which excludes nothing, and every derivation failed at that one leaf.

**The honest status against the specification.** The exclusion the checker uses here is
between *the bounds of static parameters*, not between ground types, and whether that is
legitimate is an **open question the team never answered**:
`Specification/appendices/future.tex:264-265` —
"What is the exclusion rule for a pair of overloaded declarations with different static
parameters?" and "Do we want to consider only the exclusion between ground types or also
the exclusion between the bounds of static parameters?". Taken as a statement about ground
types, `Number excludes AdditiveGroup[\T'\]` is *false* at `T' := Number` (`Number extends
AdditiveGroup[\Number\]`, `:352-353`). It is true under the interpreter's reading, in which
a symbolic instantiation is a distinct instantiation. And no actual call is ambiguous: a
call answering both declarations would need one value that is both an `Array` and an
`AdditiveGroup` (a `Vector` or `Matrix` — fine) *and* a second value that is both a `Number`
and that same `Vector`/`Matrix`, which `Array1 excludes Number` forbids. So the pair is
genuinely incompatible; the certificate the checker accepts is merely stronger than the
spec licenses. **Verdict on rule-conformance: the interpreter's own check accepts it (and
the two gated tests are the evidence); the specification neither accepts nor refuses it,
because the rule in question is one of its recorded open questions.** That is a defensible
place to land, but it should be recorded as taking a position on `future.tex:265`, not as
conforming to a settled rule.

**6. Compiler world.** `Library/CompilerLibrary.fss:497-520` already carries the *same*
family, monomorphically:
```
opr +(x: ZZ32Vector, y: ZZ32): ZZ32Vector = do result = x.copy; for i <- 0 # |x| do result[i] += y end; result end
opr -(x: ZZ32Vector, y: ZZ32): ZZ32Vector = …
opr MIN(x: ZZ32Vector, y: ZZ32): ZZ32Vector = …
opr MAX(x: ZZ32Vector, y: ZZ32): ZZ32Vector = …
```
— i.e. the compiler prelude is a copy of the block this commit replaced, plus
`opr PREFIX_SUM(x: ZZ32Vector)` at `:484` and `SUFFIX_SUM` commented out at `:491-496`.
The two worlds have now diverged on this block. The generic form cannot be ported as
written: the compiler world has no `Array[\E,I\]` trait, no `AdditiveGroup`, no
`AnyMultiplicativeRing`, `trait Matrix[\T, nat s0, nat s1\] extends Object end` is a stub
(`CompilerLibrary.fss:638`), and its tower is flat with hand-written exclusions —
`trait Number excludes { String }`, `trait ZZ32 extends { Number, … } excludes { ZZ64, RR32,
RR64 }`, `trait RR32 extends { Number, … } excludes { ZZ64, ZZ32, RR64 }`
(`CompilerBuiltin.fss:504,655,917,978`), and `trait ZZ32Vector excludes { String, Number,
Boolean, Character }` (`:1101`). Two consequences worth stating plainly: (a) in the compiler
world the loading problem **does not arise at all** — there is no `AdditiveGroup.+` to
collide with, and the array type states `excludes Number` directly — so when that world
catches up it will need a real tower before it needs this closure; (b) the unsized return
type `Array[\T,I\]` that costs nothing in the interpreter is a real loss under static
typing: `(m + 1.0) v` would have no rank or size to check. If the compiled path is meant to
run this code (goal 4), the per-shape declarations returning `Vector[\T,n\]` /
`Matrix[\T,n,m\]` — the very precedent at `:2271-2280` — are the shape that survives
compilation.

**Verdict: in the spirit of the library, with precedent** for the shape, the body and the
direction of generalisation; with one new semantic decision (reversed non-commutative
operand order) and one departure from the cited precedent (unsized return type) that should
be acknowledged rather than discovered later.

---

## Change 2 — the `AnyAdditiveGroup` marker

**1. What it adds.** An empty trait above `AdditiveGroup` that other types can name in an
`excludes` clause, because `AdditiveGroup[\T\]` itself is parametric and cannot usefully be
named there.

**2. Precedent.** Literal, eleven lines below, comment included:
```
327: (** Place holder for exclusions of AdditiveGroup **)
328: trait AnyAdditiveGroup end
330: trait AdditiveGroup[\T extends AdditiveGroup[\T\]\] extends AnyAdditiveGroup
…
338: (** Place holder for exclusions of MultiplicativeRing **)
339: trait AnyMultiplicativeRing end
341: trait MultiplicativeRing[\T extends MultiplicativeRing[\T\]\]
342:         extends { AdditiveGroup[\T\], AnyMultiplicativeRing }
```
The api mirrors it identically (`.fsi:250-251` beside `:262-263`). `AnyMultiplicativeRing`
was introduced in `dc0f919ce` (2008-05-08, "Refactored libraries to move arithmetic
operators from top level into the relevant traits and objects") — i.e. it was created for
precisely this purpose the moment operators moved into parametric traits. The library has a
whole family of these: `AnyVector` (`:2190`), `AnyMatrix` (`:2498`), `AnyMaybe` (`:1295`),
`AnyUniqueItem` (`:1372`), `AnyIntegral` itself, and the `Rank1/2/3` traits, which the team
labels in its own words at `:1598-1600`:
```
(* Potemkin exclusion traits.  Really we just want to say that
 * Rank[\n\] excludes Rank[\m\] where { m =/= n }, but we can't yet. *)
```
and at `:1293`: `(* This makes excludes work without where clauses … *)`. So this is not
merely a precedent, it is the library's named and documented device for exactly this
situation. Pure generalisation of an existing pattern; no new shape.

**3. Specificity.** None. An empty marker trait carries no semantics and serves anyone who
needs to say "this type is not an additive group". A library user gains the ability to write
`excludes { AnyAdditiveGroup }` — which, as it happens, only `Array3` currently does (see
change 4), so today the marker has exactly one client.

**4. Commented out / off path.** Nothing reinstated. Note for completeness that the team's
own drafted tower takes a different route entirely: `Library/incomplete/basic/Fortress.Number.fsi`
models the algebra with operator-parameterised conformances
(`Field[\QQ,QQ_NE,+,-,DOT,/\]`, `CommutativeRing[\ZZ,+,-,juxtaposition\]`, `IntegerLike[\ZZ\]`)
and has no `Any*` markers and no `comprises` at all. That draft is a different design, not a
contradiction with this one.

**5. Overloading rules.** Adding a supertype creates no new declaration, so no overloading
rule is engaged. Its only effect on exclusion is to make `AnyAdditiveGroup` appear in the
transitive `extends` of everything additive, which the checker consults at
`FType.java:258-277` ("check that a supertype of other isn't excluded by us"). Since only
`Array3` declares `excludes { AnyAdditiveGroup }`, the only new exclusions are Array3's, and
`Array3` already excluded `Number`, `Array1` and `Array2` via `Rank3` (`:1608`,
`Rank1:1602`, `Rank2:1605`). Exclusion facts can only make the checker *accept* more
overloadings, never reject one, so no existing declaration can be broken by this.

**Verdict: in the spirit of the library, with precedent** — the closest to a copy of the
four changes.

---

## Change 3 — `AnyIntegral comprises { ZZ }`

**1. What it adds.** It declares that `ZZ` is the only thing below `AnyIntegral`, which
closes the last open link in the tower `Number ⊃ RR64 ⊃ QQ ⊃ AnyIntegral ⊃ ZZ ⊃ …` and lets
the exclusion checker reason all the way down to objects from anywhere above.

**2. Precedent.** Every other link in the tower is closed, and the shape is identical:
`Number … comprises { RR64 }` (`:355`), `RR64 extends Number comprises { Float,
FloatLiteral, RR32, QQ }` (`:425`), `QQ extends { RR64, StandardPartialOrder[\QQ\] }
comprises { Ratio, AnyIntegral }` (`:524`), `ZZ extends Integral[\ZZ\] comprises { BigNum,
ZZ64, NN64 }` (`:825-826`), `ZZ32 … comprises { Int, IntLiteral }` (`:645`), `ZZ64 …
comprises { Long, ZZ32 }` (`:703`), `NN64 … comprises { UnsignedLong, NN32 }` (`:773`).
`AnyIntegral` was the sole exception. And the team's own drafted tower puts `ZZ` directly
under `QQ` (`Library/incomplete/basic/Fortress.Number.fsi:82`:
`trait ZZ extends { QQ, ZZ_star, IntegerLike[\ZZ\], CommutativeRing[…], … }`) with no
`AnyIntegral` at all — so "below the rationals there is `ZZ`" is the design's own intent,
which is what the new clause asserts. On shape, this is a generalisation of the library's
dominant pattern, not a new one.

**3. Specificity.** Nothing about it is specific to microGPT, C4 or APL. It is the fact that
makes the library's *own* hand-written white lies derivable. Before the change,
`Array excludes Number` was **not** derivable (the derivation died on the `AnyIntegral`
leaf), which is why `Array1`, `Array2`, `Array3`, `Rank1`, `Rank2`, `Rank3`, `AnyMaybe`,
`AnyUniqueItem`, `HasRank` and `String` each hand-write `excludes { Number, … }` (`:2099`,
`:2295`, `:2669`, `:1602`, `:1605`, `:1608`, `:1295`, `:1372`, `:1587`, `:3959`). After the
change the tower yields those facts by itself. That is a real simplification of the
library's design and the best argument for the change. The user-visible gain: the integer
scalar-extension convenience the library shipped in 2012 becomes available for floats — and
note that **no** extension of that block was possible without this, not even a ground `RR64`
copy of it, because `RR64`'s leaf set also passed through `AnyIntegral`. The shipped `ZZ32`
block loads only by the accident that `ZZ32` happens to be closed to `Int`/`IntLiteral`.

**4. What the team left off, and why — the part that needs resolving.** This is the one
change where the team's own record argues against the commit, and the commit message does
not engage with it. Reconstructed from the per-revision history of the file (the mainline
history is split across parentless import roots, so `-S` is unreliable; I walked the 137
revisions of `Library/FortressLibrary.fss` and printed the declaration at each):

| date | commit | the integral link |
|---|---|---|
| 2008-05-06 | `f01962fec` | `trait Integral extends { StandardTotalOrder[\Integral\], RR64 }` **`comprises { ZZ64, IntLiteral }`** |
| 2008-07-02 | `82c85b03a` | `Integral` becomes parametric; **`AnyIntegral extends { RR64 } end`** is born as its non-parametric stand-in; the comprises clause stays on `Integral[\I\]` |
| 2008-07-10 | `25acd32f7` | clause retargeted: `Integral[\I\] … comprises { ZZ, IntLiteral }` |
| 2008-07-21 | `dc41d5000` | "added NN32 and NN64 and QQ …": `AnyIntegral extends { QQ } end`, and **the comprises clause is deleted from `Integral[\I\]` and never reappears** |
| 2011-12 → 2012-08 | — | `QQ` gains `comprises { Ratio, AnyIntegral }`, `RR64` is retargeted to `{ Float, FloatLiteral, RR32, QQ }`; `AnyIntegral` is left open |

So the team wrote essentially this clause, moved it once, then removed it the day
`Integral` acquired siblings — and later closed the links on both sides of it while
deliberately stepping over it. The reason is visible in the library: the truthful clause is
not expressible. `AnyIntegral`'s immediate subtrait is `Integral[\I\]` (`:614`), so the
honest statement is `comprises { Integral[\I\] where [\I\] }`, and the library records that
exact limitation three times, in the team's voice:
`:1296` `(** NOT YET: comprises Maybe[\T\] where [\T\] *)`, `:1373` the same for
`UniqueItem`, and `:1588-1589` — on `HasRank`, the array hierarchy's own root:
```
trait HasRank extends Equality[\HasRank\] excludes { Number, AnyMaybe }
  (** NOT YET: comprises Array[\T,E,I\] where [\T,E,I\]{ T extends Array[\T,E,I\] } *)
```
That is the good reason the owner asked about, and it is not resolved by the commit — it is
worked around. Two concrete consequences:

* **The clause is false as written, by the specification's own rule.**
  `Specification/basic/traits.tex:231-235`: "If a trait declaration of `T` includes a
  `comprises` clause then the traits listed in its `comprises` clause **are exactly the
  traits that immediately extend `T`** and they must explicitly extend `T`."
  `Integral[\I\]` immediately extends `AnyIntegral` and is not `ZZ` (nor a subtype of it).
  The compiler front end has code that says so: `TypeHierarchyChecker.checkDeclComprises`
  (`scala_src/typechecker/TypeHierarchyChecker.scala:138-212`, helper
  `isEligibleToExtend:247-266`) errors with "Invalid comprises clause: … has a comprises
  clause but its immediate subtype … is not eligible to extend it" unless (1) the parent has
  no comprises clause, (2) the child is a subtype of something listed, or (3) **the child
  itself has a comprises clause all of whose members are eligible**. `Integral[\I\]` meets
  none of the three *since 2008-07-21*, when clause (3) was deleted from it. It never fires
  today only because that checker is not run over the interpreter library — the interpreter
  reads the clause and never validates it (`BuildEnvironments.java:887-890` merely
  `setComprises`; `FTypeTrait.java:50-78` stores it and enforces nothing).
* **There is a clean repair, and it is the team's own.** Restore the clause that was deleted:
  `trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], AnyIntegral }
  comprises { ZZ }`. Then clause (3) is satisfied for `Integral`, `comprisesContains({ZZ},
  ZZ)` satisfies it for `ZZ`, and `ZZ32/ZZ64/NN64/NN32/ZZ` are all `≤ ZZ`, so the hierarchy
  becomes legal under the spec rule and under `TypeHierarchyChecker` while the interpreter's
  leaf sets — and therefore change 1 — are unaffected. This is `25acd32f7`'s clause minus
  the now-relocated `IntLiteral`. I could not run it (see probes); it is the change I would
  ask for before calling this the canonical Fortress way. Failing that, the minimum is a
  comment at `:612` in the voice of `:1296`/`:1600` saying what the clause stands in for and
  that `Integral[\I\]` is an unlisted immediate subtrait.

Two further costs to weigh, both new with the closure and neither mentioned in the commit
message:

* **It seals the integral layer against users.** `Number`, `RR64` and `QQ` were already
  sealed, but `AnyIntegral` was the one rung where a user could hang their own integral type
  by extending `Integral[\MyInt\]`. After the change that type is not `≤ ZZ`, so the clause
  forbids it. The interpreter will not notice (nothing checks), so the seal is nominal
  today — but it is now what the library *says*, in the api as well (`.fsi:409`).
* **It puts more weight on `future.tex:265`.** The closure does not only make
  `Number excludes AdditiveGroup[\$T'\]` derivable for our eight declarations; it makes the
  whole numeric tower exclude *every* symbolic instantiation of every trait it extends.
  Anyone who writes one declaration bounded by `Number` and another bounded by
  `AdditiveGroup[\T\]` at the same parameter position now gets past the checker, where
  before they were refused; if such a pair is genuinely ambiguous the refusal is gone. I
  believe the pairs in the library are fine (§1.5), but this is a checker-strength change,
  not a local one, and it deserves a probe (below).

**Verdict: defensible, with the tower's own pattern as precedent and a real simplification
to show for it, but not yet proven in the spirit of the library** — it re-instates, on the
marker trait, a clause the team deleted from the parametric trait in 2008, it is false under
the spec's stated `comprises` rule as long as `Integral[\I\]` has no comprises clause of its
own, and nothing in the interpreter would ever tell us. Not a one-off for our use case:
nothing about it is specific to microGPT, and the change it enables is precisely
"integers → floats". I would land it with `Integral[\I\] comprises { ZZ }` restored beside
it, plus a comment; then it becomes change 2's kind of clean.

**6. Compiler world.** Nothing to port: `CompilerBuiltin`'s tower has no `comprises` at all
and no `AnyIntegral` — it is flat traits with hand-written `excludes`
(`CompilerBuiltin.fss:504,655,917,978`). So the compiler world is the living proof that the
other strategy (state the exclusions on the types, do not seal the tower) is viable for a
prelude; it is also, today, far less expressive. If the compiler prelude is ever grown into
a real tower, this is the moment to decide once whether it is closed by `comprises` (and
therefore checked by `TypeHierarchyChecker`, which the compiler path *does* run) or
Potemkin-excluded. Note the asymmetry of risk: the interpreter never checks, the compiler
does — so a clause that is quietly false here becomes a hard error there.

---

## Change 4 — `Array3 excludes { …, AnyAdditiveGroup, AnyMultiplicativeRing }`

**1. What it adds.** It states that a rank-3 array is never an additive group and never a
multiplicative ring, so a user may declare an operator between an `Array3` and a
numeric-tower type without colliding with `AdditiveGroup.+` or `MultiplicativeRing.TIMES`/
`juxtaposition`.

**2. Precedent.** For `AnyMultiplicativeRing` the precedent is exact and the change is
literally filling a hole: `Vector … excludes { AnyMultiplicativeRing }` (`:2193-2194`) and
`Matrix … excludes { AnyMultiplicativeRing }` (`:2501-2502`) — ranks 1 and 2 already say it,
rank 3 did not. (`String` says it too, `:3959`.) That is what lets today's
`opr juxtaposition[\T extends Number, nat n\](me: Vector[\T,n\], other: T)` coexist with
`MultiplicativeRing.opr juxtaposition(self, other:T)` (`:346`) — the exclusion is found on
pair 0 via the marker in `MultiplicativeRing`'s transitive extends. So the mechanism, the
idiom and the wording are all the library's.
For `AnyAdditiveGroup` there is no existing `excludes` user, for a structural reason worth
stating: `Vector` and `Matrix` *are* additive groups (`:2193`, `:2501`), so the same clause
can never be written at ranks 1 and 2. The generalisation is therefore genuine but lopsided.

**3. Specificity.** The clause itself is generic — a true statement about a library type,
in the library's own idiom, useful to any user who wants a rank-3 operator. But it is *only*
useful to user code: no library declaration needs it (change 1 does not), and its motivation
in the commit message is "a user operator whose non-self operand is an `Array3`", which is
the shape the C4/APL fixture exercises (plane-wise `+` between a `Matrix` and an `Array3`,
batched `juxtaposition` at rank 3). I would not call it a one-off — the capability it grants
is the general one, and the test fixture correctly lives in `ProjectFortress/test_library/`
rather than in the library — but the owner should know it is a capability added *for* user
vocabularies of that kind, and should weigh the cost:

**The cost, which the commit does not state.** `Array3 excludes AnyAdditiveGroup` forecloses
the library's own obvious growth path. `Vector` completes `Array1` and `Matrix` completes
`Array2` by adding `AdditiveGroup` and elementwise `+`/`-`; the missing third member of that
family — a `Tensor3`/`Array3`-based additive group giving elementwise `t1 + t2` at rank 3 —
becomes a contradiction after this clause, as does any user object extending both
`Array3[\…\]` and `AdditiveGroup[\Self\]`. The library currently has no rank-3 `+` at all,
and this closes the door on filling that gap the library's way. The two capabilities are
mutually exclusive: you can have "users may declare `opr +(Matrix, Array3)`" or "rank-3
arrays may be additive groups", not both. The commit chooses the first silently. That choice
is Pavol's to make, and whichever way it goes the reason belongs in a comment beside the
clause, next to `:1598`'s "Potemkin exclusion traits" note.
Minor: consider whether the clause belongs on `Rank3` (`:1608`) rather than `Array3`
(`:2669`) — `Rank3` is where the library keeps the rank-level Potemkin exclusions, and it
would cover future immutable or view types at rank 3, whereas the clause on `Array3` covers
only `Array3`'s own subtypes. Also note `excludes { Number, String }` on `Array3` is already
redundant with `Rank3`'s (`:1608`); the new entries are not redundant, since `Number ∉
MultiplicativeRing[\$T'\].getTransitiveExtends()`.

**4. Commented out / off path.** Nothing reinstated. The relevant team note is the
"Potemkin exclusion traits … but we can't yet" comment at `:1598-1600` and the `HasRank`
"NOT YET: comprises" at `:1588` — both say the array hierarchy's exclusions are hand-faked
by design, which is a positive precedent for this clause.

**5. Overloading rules.** No new declaration, so no rule is engaged directly; it supplies
the `Ps ⋈ Qs` certificate for the Incompatibility Rule
(`Specification/advanced/overloading.tex:212`) for a user pair such as
`opr +(Matrix[\RR64,r,c\], Array3[\RR64,…\])` against `AdditiveGroup.opr +(self, other:T')`,
found on pair 0 by `FType.java:258-266` (supertype exclusion) once `AnyAdditiveGroup` is in
`AdditiveGroup`'s transitive extends. This one is a ground-type exclusion between a declared
`excludes` clause and a supertype, i.e. squarely inside the spec's rule and not dependent on
`future.tex:265` — unlike change 1. Nothing an existing declaration relies on is weakened
(more exclusion only widens acceptance). One caveat noted in the commit message and worth
repeating in the ledger's own terms: a *single* user declaration of an operator name is not
checked against the library's, which is why the fixture declares two of each; so this clause
is what makes a *vocabulary* loadable, not a single operator.

**6. Compiler world.** Nothing to port and nothing blocked: the compiler world has no
`Array3`, no `AdditiveGroup`, no markers. When it grows arrays it will need the same
decision (rank-3 additive group, or rank-3 user operators), and its `ZZ32Vector excludes
{ String, Number, Boolean, Character }` (`CompilerBuiltin.fss:1101`) shows it already
prefers explicit exclusion clauses — so this change is, if anything, the shape the compiler
world would adopt.

**Verdict: in the spirit of the library, with precedent** for `AnyMultiplicativeRing`
(it fills a hole that ranks 1 and 2 already filled) and **defensible but consequential**
for `AnyAdditiveGroup`: it is the library's own device applied faithfully, but it silently
decides that rank-3 arrays will never be additive groups, and that decision should be taken
explicitly and commented.

---

## The two gated tests

Right place, right imports, and they pin the shipped integer behaviour that no test
previously asserted (`ArrayScalarExtension.fss`, the `iv` block) — good. The fixture is in
`ProjectFortress/test_library/`, which is where this corpus keeps apis its tests import, and
not in the library. One substantive defect: both tests use a hand-rolled
```
check(name: String, got: RR64, want: RR64): () = if got = want then println(…) else println("fail " …) end
```
which only *prints* on mismatch. `ProjectFortress/tests/` has no expected-output files (0
`.out` for 383 `.fss`; the `.test` property files with `compile`/`run`/`compile_err_equals`
drive `compiler_tests/`, per `explorations/repo-internals.md:222-224`), so an interpreter
system test passes if the program runs cleanly. As written, the 24 "checks" therefore assert
only that the declarations *load and dispatch* — which is the property under test, so the
tests are not useless — but a wrong value would print `fail …` and the suite would still be
green. The corpus convention is `assert(flag, failMsg)` / `deny` / `fail`
(`FortressLibrary.fss:286-310`), which throws. Changing `check` to
`assert(got = want, name …)` costs one line and makes the numbers load-bearing.

---

## What I could not settle without running a probe

1. **Run the front end's hierarchy check over the interpreter library.** Drive
   `StaticChecker` (`StaticChecker.java:219` → `TypeHierarchyChecker.checkAcyclicHierarchy`)
   over `Library/FortressLibrary.fss` and confirm the predicted error "`AnyIntegral` has a
   comprises clause but its immediate subtype `Integral` is not eligible to extend it";
   then confirm that adding `comprises { ZZ }` to `Integral[\I\]` (`:614`, api `:411`)
   clears it and that `ant testSystem` + `ant testFast` stay green. This is the single probe
   that decides whether change 3 is a repair or a white lie.
2. **Does the closure let a genuinely ambiguous user overloading through?** In one component
   declare `opr ⊞[\T extends Number\](x: String, y: T): String` and
   `opr ⊞[\T extends AdditiveGroup[\T\]\](x: String, y: T): String` and see whether the
   interpreter now accepts the pair (it should have refused before `02d09a39f`). If it does,
   the checker-strength change is real and worth a ledger row against `future.tex:265`.
3. **Cost of change 4.** Try `object T3 extends { Array3[\RR64,0,2,0,2,0,2\],
   AdditiveGroup[\T3\] } … end` and confirm it is now refused; that measures exactly what
   the rank-3 exclusion gives up.
4. **Could the block serve `ReadableArray[\T,I\]` instead of `Array[\T,I\]`?** `:1844-1845`
   declares `map` there, so immutable arrays and views would be covered by the same eight
   declarations. Check whether it loads and whether `ImmutableArray excludes Array[\E,I\]`
   (`:1874`) causes trouble.
5. **`PREFIX_SUM`/`SUFFIX_SUM` (`:4483`, `:4490`) under the same generalisation** — do they
   load over `T extends Number` now that the tower is closed? If yes, the block becomes
   coherent; if not, we learn something about what the closure does and does not buy.
6. **Do the tests actually fail on a wrong answer?** Flip one `want` and re-run; I expect
   the suite to stay green, confirming the `check` defect above.
7. **Is a user integral type still loadable** (`trait MyInt extends Integral[\MyInt\] …`)
   after the closure? Expected: yes in the interpreter (nothing checks), which would show
   the new seal is nominal there and hard only in the compiler path.
8. **API form.** Would `trait AnyIntegral extends { QQ } comprises { ... } end` be accepted
   in the `.fsi` (the form `QQ` already uses at `.fsi:373`, licensed by
   `traits.tex:236-241`) while the component keeps the exact list? If so it is the more
   honest api statement, since it does not promise users that `ZZ` is all there is.

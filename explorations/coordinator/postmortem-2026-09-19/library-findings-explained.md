# Four findings of the blinded review, explained

For Pavol, to decide. The blinded review is `explorations/reviews/library-scalar-extension-review.md`;
the commit under review is `02d09a39f` (2026-09-19), four changes to `Library/FortressLibrary.fss`
and its api `Library/FortressLibrary.fsi`. What the commit changed, file by file, is
`explorations/coordinator/postmortem-2026-09-19/array-work-brief.md` §1. Every line number below was
opened in the current tree. Nothing here was run; where a claim would need a run, it says so.

Four terms are used throughout and are defined once here, because all four findings share them.
A **trait** is Fortress's interface-like type. Two traits **exclude** each other when no type is
allowed to be both — `Specification/basic/traits.tex:218-222`: "A trait with an `excludes` clause
excludes every trait listed in its `excludes` clause. If a trait `T` excludes a trait `U`, the two
traits are mutually exclusive: neither can extend the other, and no trait can extend them both."
Exclusion is what lets two declarations of one operator name coexist: if their operand types can
never both be matched by one call, no call is ambiguous. A **static parameter** is the `[\T extends
Number, I\]` part of a declaration — a type supplied afresh at each call — and its **bound** is the
`extends Number` part, the promise about what may be supplied.

---

## 1. The tower closure: `AnyIntegral comprises { ZZ }`

**The finding, in plain words.** The commit added a clause to the numeric tower that says something
untrue, and nothing in the interpreter will ever notice. The clause is load-bearing: without it the
eight new scalar operators do not load at all.

**The line.** `Library/FortressLibrary.fss:612`, mirrored at `Library/FortressLibrary.fsi:409`:

```
trait AnyIntegral extends { QQ } comprises { ZZ } end

trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], AnyIntegral }
```

A **`comprises` clause** names the only traits allowed to sit directly below a trait; it seals that
rung. The two lines are adjacent: `Integral[\I\]` (`:614`) sits directly below `AnyIntegral`, and
`Integral[\I\]` is not `ZZ`.

**Why the library's other levels have one.** Sealing is how exclusion gets derived rather than
hand-written. The interpreter decides that two sealed traits exclude by pairing every type at the
bottom of one's `comprises` chain against every type at the bottom of the other's and requiring all
pairs to exclude (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FType.java:287-294`);
a trait with no `comprises` clause counts as its own bottom (`.../types/FTypeTrait.java:71-78`), and
a bare trait excludes nothing. One unsealed rung therefore poisons every derivation passing through
it. Every other rung is sealed — `Number` (`:355`), `RR64` (`:425`), `QQ` (`:524`), `ZZ32` (`:645`),
`ZZ64` (`:703`), `NN64` (`:773`), `ZZ` (`:826`) — and `AnyIntegral` was the sole gap, which is why
`RR64`'s bottom set contained the bare trait `AnyIntegral` and a block over `T extends Number` was
refused.

**What the specification says.** `Specification/basic/traits.tex:231-235`: "If a trait declaration of
`T` includes a `comprises` clause then the traits listed in its `comprises` clause **are exactly the
traits that immediately extend `T`** and they must explicitly extend `T` (i.e., list `T` in their
`extends` clause)." By that rule the new clause is false, because `Integral[\I\]` immediately extends
`AnyIntegral` and is not listed.

**What the team's own record says.** They wrote this clause, moved it, then deleted it. `f01962fec`
(2008-05-06): `trait Integral extends { StandardTotalOrder[\Integral\], RR64 } comprises { ZZ64,
IntLiteral }`. `82c85b03a` (2008-07-02, "Changed Integral to be a parametric type"): `AnyIntegral
extends { RR64 } end` is born as the non-parametric stand-in, and the clause stays on `Integral[\I\]`.
`25acd32f7` (2008-07-10): retargeted to `comprises { ZZ, IntLiteral }`. `dc41d5000` (2008-07-21,
eleven days later, the commit that introduces `QQ` and gives `Integral` siblings): the clause is
deleted from `Integral[\I\]` and never reappears.

**Why the honest list cannot be written.** The truthful clause is `comprises { Integral[\I\] where
[\I\] }` — naming a parametric trait for all its instantiations — which the language does not accept.
The team recorded that limitation three times in its own voice: `:1296` `(** NOT YET: comprises
Maybe[\T\] where [\T\] *)`, `:1373` the same for `UniqueItem`, and `:1588-1589` on `HasRank`, the
array hierarchy's own root: `(** NOT YET: comprises Array[\T,E,I\] where [\T,E,I\]{ T extends
Array[\T,E,I\] } *)`.

**Why the interpreter accepts it and the compiler's checker would not.** The interpreter reads the
clause and stores it — `BuildEnvironments.java:890` calls `setComprises`, `FTypeTrait.java:50-57`
holds it — and validates nothing. The compiler front end does validate:
`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeHierarchyChecker.scala:206-208`
errors with "Invalid comprises clause: … has a comprises clause but its immediate subtype … is not
eligible to extend it", where eligibility (`:254-265`) is satisfied if the child is at or below
something listed, **or** if the child itself has a `comprises` clause all of whose members are
eligible. `Integral[\I\]` has satisfied neither since 2008-07-21. That checker is simply never run
over the interpreter's library.

**The team's own repair.** Restore the deleted clause on the generic trait beside it —
`trait Integral[\I extends Integral[\I\]\] extends { StandardTotalOrder[\I\], AnyIntegral } comprises
{ ZZ }`, i.e. `25acd32f7`'s clause minus the since-relocated `IntLiteral`. `Integral` then qualifies
by the second of those two routes; `ZZ32`, `ZZ64`, `NN64`, `NN32` and `ZZ` all sit at or below `ZZ`,
so they qualify by the first; and the interpreter's bottom sets are unchanged, so the eight operators
keep loading.

**The alternatives.**

- **A — leave it.** What it changes: nothing mechanical. The library states something the spec's own
  rule calls false, in the api as well, and the day the front end is run over this library it is a
  hard error rather than a design question.
- **B — land the repair (default).** What it changes: two lines (`.fss:614`, `.fsi:411`) plus a
  comment at `:612` in the voice of `:1598`. The claim becomes true under `traits.tex:231-235` and
  passes `TypeHierarchyChecker`. Costs one gate run (`ant testSystem` + `ant testFast`); the review
  could not run it, so "unchanged" is a prediction, not a measurement.
- **C — back the closure out.** What it changes: the eight generic operators stop loading and the
  whole commit falls; the seven declarations that left C4's `FlatArrays.fss` come back.

**Default: B — land the repair beside it, with a comment, gated.**

**What it means.** For C4: the closure is the reason `m + 1.0` and `0.0 MAX v` resolve to the library,
which is what let seven declarations leave `explorations/run-c4/src/FlatArrays.fss`. B changes nothing
C4 sees. For the future compiled arrays: the compiler prelude has no `comprises` anywhere — flat
traits with hand-written exclusions (`CompilerBuiltin.fss:504, 655, 917, 978`) — so there is nothing
to port, but the compiler path *does* run the hierarchy checker, so a clause that is quietly false
here becomes a build error there. One further consequence either way: the closure seals the integral
rung against a user's own integral type (a type extending `Integral[\MyInt\]` is not at or below
`ZZ`). Nothing checks that today, so the seal is nominal in the interpreter and real only under a
compiler.

---

## 2. The rank-3 exclusion: `Array3 excludes { …, AnyAdditiveGroup, AnyMultiplicativeRing }`

**The finding, in plain words.** The commit silently chose one of two futures for rank-3 arrays, and
the one it closed off is the library's own obvious next step.

**The lines.** `Library/FortressLibrary.fss:2665-2669`, mirrored at `.fsi:1655-1659`:

```
trait Array3[\T, nat b0, nat s0, nat b1, nat s1, nat b2, nat s2\]
    extends { Indexed1[\s0\], Indexed2[\s1\], Indexed3[\s2\], Rank3,
              StandardMutableArrayType[\Array3[\T,b0,s0,b1,s1,b2,s2\],T,
                                        (ZZ32,ZZ32,ZZ32)\] }
    excludes { Number, String, AnyAdditiveGroup, AnyMultiplicativeRing }
```

`AnyAdditiveGroup` is the empty **marker trait** the same commit added at `:327-328` — a trait with
no content, existing only so that an `excludes` clause can name it, because an `excludes` clause
cannot name a parametric trait such as `AdditiveGroup[\T\]`. The library already had the identical
device for rings at `:338-339`, comment included: `(** Place holder for exclusions of
MultiplicativeRing **) trait AnyMultiplicativeRing end`.

**Why vectors and matrices are additive groups, and what that gives them.** `:2192-2195`:

```
trait Vector[\T extends Number, nat s0\]
        extends { AnyVector, Array1[\T,0,s0\], AdditiveGroup[\Vector[\T,s0\]\] }
        excludes { AnyMultiplicativeRing }
    opr +(self, v:Vector[\T,s0\]): Vector[\T,s0\] = …
```

and the same shape for `Matrix` at `:2500-2503`. Extending `AdditiveGroup` is what gives them
elementwise `+` and `-` between two values of the same shape, unary `-`, and a `zero` getter
(`:330-336`). `Vector` completes `Array1`; `Matrix` completes `Array2`; there is no third member, and
the library has no rank-3 `+` at all.

**The two futures, and that they are mutually exclusive.**

- *Future one, the one the clause takes:* a user may declare an operator between a rank-3 array and
  something on the numeric side without colliding with `AdditiveGroup.opr +(self, other: T)`
  (`:333`). That is exactly C4's plane-wise addition, `explorations/run-c4/src/FlatArrays.fss:131-133`:
  ```
  (* m +⍤2 t : a matrix added to every plane *)
  opr +[\nat r, nat c, nat a, nat b, nat d\](m: Matrix[\RR64,r,c\], t: Array3[\RR64,0,a,0,b,0,d\]): Array[\RR64,(ZZ32,ZZ32,ZZ32)\] =
      t.ivmap[\RR64\](fn (ix: (ZZ32,ZZ32,ZZ32), e: RR64): RR64 => do (p, i, j) = ix; m[i,j] + e end)
  ```
- *Future two, the one it forecloses:* a rank-3 type that is an additive group — the missing third
  member of `Vector`/`Matrix`, giving `t1 + t2` elementwise at rank 3, and any user object extending
  both `Array3[\…\]` and `AdditiveGroup[\Self\]`.

The clause says no type is both an `Array3` and an `AdditiveGroup`. Future two needs exactly such a
type. You can have one or the other, not both.

**What the specification says.** `traits.tex:218-222`, quoted at the top: an `excludes` clause means
no trait can extend both. That is the whole of it — this clause is a plain, checkable statement
between named types, not a borderline case. (Contrast finding 4, which is borderline.)

**What the team's own record says.** The clause's `AnyMultiplicativeRing` half is literally filling a
hole ranks 1 and 2 already filled (`Vector … excludes { AnyMultiplicativeRing }` `:2194`, `Matrix`
`:2502`); the `AnyAdditiveGroup` half has no precedent for the structural reason that `Vector` and
`Matrix` *are* additive groups, so the same clause can never be written at ranks 1 and 2. On the
practice of hand-writing exclusions the team is explicit, `:1598-1599`:

```
(* Potemkin exclusion traits.  Really we just want to say that
 * Rank[\n\] excludes Rank[\m\] where { m =/= n }, but we can't yet. *)
```

**The alternative placement the review names.** `Rank3` (`:1608`) is where the library keeps the
rank-level exclusions: `trait Rank3 extends { Rank[\3\]} excludes { Number, String } end`. A clause
there covers every present and future rank-3 type — immutable rank-3 arrays, views — whereas on
`Array3` it covers only `Array3`'s own subtypes. Note also that `excludes { Number, String }` on
`Array3` is already redundant with `Rank3`'s; the two new entries are not.

**The alternatives.**

- **A — keep the clause, move it to `Rank3`, comment it (default).** What it changes: the two markers
  move from `:2669` to `:1608`, beside the Potemkin note that explains the practice; every rank-3
  type inherits them; the decision "rank-3 arrays are never additive groups" is written where the
  next reader meets it. Needs a gate run.
- **B — keep it on `Array3` as committed, add only the comment.** What it changes: nothing mechanical;
  future immutable or view rank-3 types each need their own copy of the clause.
- **C — drop `AnyAdditiveGroup`, keep `AnyMultiplicativeRing`.** What it changes: future two stays
  open, and C4's plane-wise `+` loses its licence — it would have to become a named function or a
  method on the view object rather than an `opr +`.

**Default: A — keep it, on `Rank3`, with the reason in a comment.**

**What it means.** For C4: today the plane-wise `+` loads even without the clause, because the
interpreter does not check a *single* user declaration of a library operator name against the
library's at all (measured, `array-work-brief.md` §6). The clause is what makes it legal rather than
lucky, and what makes a whole *vocabulary* of such operators loadable. Under C it must be renamed.
For the future compiled arrays: the compiler world has no `Array3`, no `AdditiveGroup` and no markers,
so nothing ports; but `CompilerBuiltin.fss:1101` (`trait ZZ32Vector excludes { String, Number,
Boolean, Character }`) shows that world already prefers explicit exclusion clauses, so whichever way
this goes is the shape it will inherit — and it is the same choice, made once, when it grows arrays.

---

## 3. The two unnamed choices inside the scalar block

**The finding, in plain words.** The eight new operators are otherwise a faithful copy of the
library's own shape, but two things in them were decided rather than copied, and neither is written
down: what `s - a` means, and what type the result has.

**The lines.** `Library/FortressLibrary.fss:4496-4504`, mirrored at `.fsi:2540-2547`:

```
(*) Scalar extension: an array of numbers and one number, either way round.
opr +[\T extends Number, I\](x: Array[\T,I\], y: T): Array[\T,I\] = x.map[\T\](fn (e: T): T => e + y)
opr +[\T extends Number, I\](y: T, x: Array[\T,I\]): Array[\T,I\] = x.map[\T\](fn (e: T): T => y + e)
opr -[\T extends Number, I\](x: Array[\T,I\], y: T): Array[\T,I\] = x.map[\T\](fn (e: T): T => e - y)
opr -[\T extends Number, I\](y: T, x: Array[\T,I\]): Array[\T,I\] = x.map[\T\](fn (e: T): T => y - e)
opr MIN[\T extends Number, I\](x: Array[\T,I\], y: T): Array[\T,I\] = x.map[\T\](fn (e: T): T => e MIN y)
…
```

### 3a. What `s - a` means

`opr -[\T extends Number, I\](y: T, x: Array[\T,I\])` is the scalar on the left: it subtracts every
element from the number, so `3 - [1, 2]` is `[2, 1]`. That is what every array language means by it
and there is no serious rival reading. It is nonetheless a decision, because the library has no
precedent for it: the declarations this block copies its shape from are all **commutative** — an
operation is commutative when the two operand orders give the same answer, so writing both orders
decides nothing. `:2271-2280`:

```
opr DOT[\ T extends Number, nat n \](me : Vector[\T,n\], other : T) : Vector[\T,n\] = me.scale(other)
opr DOT[\ T extends Number, nat n \](other : T, me : Vector[\T,n\]) : Vector[\T,n\] = me.scale(other)
```

Both orders call the same `me.scale(other)`. The identical four exist for `Matrix` at `:2647-2657`.
Of the eight new declarations, `+`, `MIN` and `MAX` are likewise commutative; only the reversed `-`
is a genuinely new semantic statement, and it is the only reversed non-commutative operator in the
library.

- **A — keep it, say so in a comment (default).** What it changes: one comment line beside `:4501`
  recording that the reversed `-` is elementwise `y - e`, and that it is the block's one new
  decision.
- **B — drop the reversed `-`.** What it changes: seven declarations instead of eight; `1.0 - v`
  goes back to being "Failed to find any matching overload"; nothing else.

**Default: 3a-A — keep `y - e`, comment it.**

### 3b. The result type

The eight return the **unsized** `Array[\T,I\]`: rank and size are gone from the type. The precedents
they cite keep them — `Vector[\T,n\] → Vector[\T,n\]` (`:2271-2274`), `Matrix[\T,n,m\] →
Matrix[\T,n,m\]` (`:2647-2657`). The departure is inherited, not invented: the four integer
declarations this block replaced also returned the unsized `Array[\ZZ32,ZZ32\]`.

On the interpreter it costs nothing, for two reasons. Types are matched at run time against the
actual value, and the body goes through `map`, which builds its result with `replica` — `:2138`
`map[\R\](f:T->R): Array1[\R,b0,s0\] = replica[\R\]().fill(…)`, and the same at `:2400` and `:2763` —
so `m + 1.0` really is a `Matrix` when it lands. Under a compiler it is a real loss: `(m + 1.0) v`,
a matrix times a vector, would have no rank and no size left to check, and sizes in the type are
exactly what the array design commits to (`array-work-brief.md` §4, question 4, fixed by your ruling
of 2026-09-19: sizes as `nat` parameters, the checker taught `nat`).

- **A — leave the eight as they are; add per-shape declarations when the compiled path has sized
  arrays (default).** What it changes: nothing now. Later, four `Vector` and four `Matrix`
  declarations returning `Vector[\T,n\]` / `Matrix[\T,r,c\]` are added beside the generic eight —
  literally the precedent's own shape — and the generic ones keep serving rank 3 and the other index
  types.
- **B — add the per-shape declarations now.** What it changes: sixteen further declarations in the
  library today, each of which must pass the overload check against the other eight and against the
  forty existing declarations of these four names; buys nothing the interpreter can use.
- **C — replace the generic block with per-shape declarations only.** What it changes: rank-3 arrays,
  sub-arrays, transposed views and non-`ZZ32` index types lose scalar arithmetic again.

**Default: 3b-A — leave the return types unsized now; per-shape declarations arrive with sized
compiled arrays.**

**What it means.** For C4, on 3a: the reversed `-` is one of the seven declarations C4 handed to the
library — its own `opr -[\I\](s: RR64, a: Array[\RR64,I\])`, removed from
`explorations/run-c4/src/FlatArrays.fsi` in `8590d7a9e` — so 3a-B hands it straight back. On 3b:
nothing either way, since every C4 value is dynamically a `Vector`, `Matrix` or `Array3` and stays
so. For the future compiled arrays: 3b is the one of the four findings with a dated cost. The
per-shape declarations are what survives static checking; the generic eight are what serves every
other shape. Both will be wanted.

---

## 4. Exclusion between the bounds of static parameters

**The finding, in plain words.** The rule that makes the eight new declarations legal is one the team
left explicitly unanswered in the specification's own list of open questions. The interpreter answers
it one way, in code, without saying so.

**The team's open question, in their words.** `Specification/appendices/future.tex:258-265`, under
the heading "Overloading with static parameters":

```
\item What is the exclusion rule for a pair of overloaded declarations with different static parameters?
\item Do we want to consider only the exclusion between ground types or also the exclusion between the bounds of static parameters?
```

A **ground type** is one with no variables left in it — `RR64`, `Matrix[\RR64,2,2\]`. The question is
whether two declarations may be told apart by their *bounds* (`extends Number` against `extends
AdditiveGroup[\T\]`) or only by types with nothing left to fill in.

**Why the new block's acceptance rests on it.** Two declarations of one operator name in one scope
are a legal pair only under one of three rules in `Specification/advanced/overloading.tex`: the
**Subtype Rule** (`:162`) — one parameter list is a subtype of the other, so one is always the more
specific; the **Incompatibility Rule** (`:212-216`) — "If `Ps` is incompatible with `Qs` then `f(Ps)` and
`f(Qs)` are a valid overloading", incompatibility being exclusion plus the coercion conditions
defined at `:196-210`; and the **Meet Rule** (`:247`) — a third, more specific declaration exists at the
intersection and answers any call both would match.

For the new block against `AdditiveGroup.opr +(self, other: T)` (`:333`) and against
`StandardMinMax`/`StandardTotalOrder`'s `MIN`/`MAX` (`:236, :247, :279-280`), neither the Subtype
Rule nor the Meet Rule applies, so everything rests on exclusion — and it cannot be found on the
first operand, since a `Vector` genuinely is both an `Array` and an `AdditiveGroup`. It has to be
found on the second: the bound `Number` of the new declaration's `T` against the bound
`AdditiveGroup[\T'\]` of the method's own type variable. That is an exclusion between two bounds, the
very thing `future.tex:265` asks about. The interpreter requires it and refuses without it:
`.../evaluator/values/OverloadedFunction.java:434` marks a pair distinct if any operand position
excludes, `:493-497` refuses when a type variable is present and nothing excludes, and `:527` is the
message the pre-commit run produced — "has a parameter with generic type, at least one pair of
parameters must have excluding types".

**Read as a claim about ground types the exclusion is false.** `Number` extends
`AdditiveGroup[\Number\]` (`:352-353`), so at `T' := Number` the two bounds have a common inhabitant.
It is true under the interpreter's reading, in which each instantiation of a type variable counts as
a type of its own. Either way no actual call is ambiguous: answering both declarations would need one
value that is both an `Array` and an `AdditiveGroup` (a `Vector` or `Matrix` — allowed) *and* a
second that is both a `Number` and that same `Vector`/`Matrix`, which `Array1 … excludes {Number,
String}` (`:2099`) forbids. The pair is genuinely safe; the certificate the interpreter accepts is
simply stronger than the specification has ever licensed.

**What changes if the question is answered either way.**

- *Answered "bounds count"* (the interpreter's standing behaviour): the commit conforms, and finding
  1's closure widens the effect well beyond these eight declarations — with the tower sealed, every
  numeric type now excludes every variable instantiation of every trait it extends. One declaration
  bounded by `Number` and another bounded by `AdditiveGroup[\T\]` at the same operand position now
  get past the check where before they were refused. That is a change in the strength of the checker,
  not a local fix: if such a pair is ever genuinely ambiguous, the refusal that would have caught it
  is gone.
- *Answered "ground types only"*: the Incompatibility Rule no longer licenses the block, which would
  need either a disambiguating declaration under the Meet Rule or per-shape ground declarations —
  3b's shape, arriving early. The interpreter runs the code as written either way; the answer bites
  only where a static overload check is run.

**The alternatives.**

- **A — record the position, after one probe (default).** What it changes: a ledger row stating that
  this revival reads `future.tex:265` as "bounds count", with the interpreter's behaviour as its
  evidence; and, before writing it, the review's probe — declare
  `opr ⊞[\T extends Number\](x: String, y: T): String` and
  `opr ⊞[\T extends AdditiveGroup[\T\]\](x: String, y: T): String` in one component and see whether
  the interpreter now accepts the pair where before the commit it refused. One small program and one
  cold run, and the widening is measured rather than assumed.
- **B — record the position without the probe.** What it changes: the row says the same thing with
  only the eight declarations' loading behind it; the widening stays unmeasured.
- **C — answer it the other way and rebuild the block.** What it changes: the generic eight give way
  to per-shape ground declarations, which need no bound exclusion; rank 3 and the other index types
  lose the service; finding 1's closure loses this motivation, though not its other benefit (the
  library's ten hand-written `excludes { Number, … }` lines, `:1295, :1372, :1587, :1602, :1605,
  :1608, :2099, :2295, :2669, :3959`, become derivable).

**Default: A — probe it, then record it as a position taken on `future.tex:265`.**

**What it means.** For C4: everything the commit gave C4 — the seven declarations that left
`FlatArrays.fss` — rests on this reading. Under C, C4 gets the same service from per-shape
declarations and its own text does not change. For the future compiled arrays: this is the finding
most likely to be decided *for* us rather than by us, because the interpreter's library is never
front-end checked while the compiled path runs a static check. Whether that check reads bounds the
same way was not measured here and should not be assumed. Today the question does not arise there at
all: the compiler prelude's tower is flat traits with hand-written exclusions and has no parametric
bounds to argue about (`CompilerBuiltin.fss:504, 655, 917, 978`).

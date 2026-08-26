<!-- Produced by a delegated spec-audit worker session during the microgpt-native
     exploration; commissioned by Pavol's review of 2026-08-26. Probe programs:
     explorations/spec-probes/. Design journal: explorations/microgpt-native.md. -->

# Adversarial expressiveness audit: `explorations/microgpt_paper.fss` vs. the Fortress specification

Audit date 2026-08-26. Spec read from the LaTeX sources in `Specification/` (working draft).
Every one of the ten chapters cited below is **byte-identical** in `Specification-1.0-frozen/`
(verified by `diff`), so nothing here turns on which spec you read.

Interpreter: `./bin/fortress` on JDK 25, per `CLAUDE.md`. All probes are in
`probes-spec/` next to this file. Tracked files were never modified: the
golden-gated trials ran on `explorations/mgprobe.fss`, a scratch copy whose
`run()` is `goldenCheck()` only; it was removed after each run and
`git status --porcelain` is empty.

Classification: **(a) WORKS today** — spec feature, interpreter supports it, we
failed to use it. **(b) SPEC-ONLY** — spec promises it, implementation does not
deliver. **(c) DELIBERATE** — our way is defensible, reason stated.

Counts: **6 (a) WORKS · 8 (b) SPEC-ONLY · 6 (c) DELIBERATE**, plus 3 places
where the spec is silent and the library is the only authority.

- (a) findings 1, 3, 4, 10, 11, 15
- (b) findings 2, 5, 6, 8, 9, 12, 13, 14
- (c) verdicts in findings 5, 6, 7, 10, and the four listed in 16

---

## Verified simplification bundle (all (a); golden check PASSes)

Applied together to a scratch copy of the file and run: **`golden transformer
forward/backward vs Python reference: PASS`** (probe files
`probes-spec/mgprobe_s3.fss`, `mgprobe_s4.fss`, `mgprobe_s5.fss`;
baseline `mgprobe_base.fss`).

| # | Change | Lines touched |
|---|--------|---------------|
| A1 | drop `[\V\]` from every list aggregate/comprehension whose elements are `V` | 26 |
| A2 | `object V ... extends AdditiveGroup[\V\]`, delete hand-written binary `-` | +1 / −1 |
| A3 | delete `opr SQRT(n: ZZ32): RR64` — the library already has it | −1 |
| A4 | drop the return-type annotation from the 11 notation-layer declarations | 11 |
| A5 | (optional, also PASSes) full `MultiplicativeRing[\V\]`: define `TIMES`, inherit `juxtaposition` | +2 / −1 |

---

# Findings, ordered by impact on the program's notation

---

## 1. (a) WORKS — the `[\V\]` on every aggregate is redundant: 26 of them

**Spec.** `Specification/basic/expressions/aggregate.tex`, §`list-expr`:

> The type of a list expression is `List[\T\]` where `T` is the union type of
> the types of all element expressions.

The element type is *inferred*. Static args on an aggregate are optional in the
grammar (`LeftEncloser option{StaticArgs} …`, §`aggregate-expr`; same in
`Specification/basic/expressions/comprehensions.tex`).

**Current code.** Ascribed everywhere, e.g. line 58:

```
  opr +(self, o: V): V = V(data + o.data, <|[\V\] self, o|>, <|[\RR64\] 1.0, 1.0|>)
```

and line 157:

```
  <|[\V\] (w[r] DOT x) | r <- 0#|w| |>
```

**Probe.** `probes-spec/p1_infer.fss` — unascribed literals and comprehensions of
a user object type infer correctly. Golden-gated across the whole program in
`mgprobe_s5.fss`: **all 26** `<|[\V\] …|>` occurrences drop, golden check PASSes.

**Simplification.**

```
- opr +(self, o: V): V = V(data + o.data, <|[\V\] self, o|>, <|[\RR64\] 1.0, 1.0|>)
+ opr +(self, o: V): V = V(data + o.data, <| self, o |>, <|[\RR64\] 1.0, 1.0|>)

-   <|[\V\] (w[r] DOT x) | r <- 0#|w| |>
+   <| (w[r] DOT x) | r <- 0#|w| |>
```

**But — the `[\RR64\]` and `[\List[…]\]` ascriptions are NOT redundant, and the
reason is finding 2.** `probes-spec/p2_ascribe.fss`:

```
Unification error: Closure/Constructor for V param 3 ($grads:List[\RR64\])
got arg ArrayList[\FloatLiteral\] of type ArrayList[\FloatLiteral\]
```

and, once the `[\RR64\]` on `<| o.data, data |>` is dropped, `ArrayList[\Float\]`.
Dropping `[\List[\V\]\]` gives `ArrayList[\ArrayList[\V\]\]`. So the interpreter
computes the aggregate's element type from the **runtime class** of the elements
(`FloatLiteral`, `Float`, `ArrayList[\V\]`), not from their declared type, and
`List` is invariant. That is only harmless when the elements' runtime class *is*
the target element type — true for `V` (a concrete object), false for `RR64` and
for `List[\…\]`. The authors generalised from the `RR64` case (which really does
need the ascription) to the `V` case (which does not).

---

## 2. (b) SPEC-ONLY — declaration-site covariance: the root cause of all remaining ascriptions

**Spec.** `Specification/basic/trait-parameters.tex` (~line 339):

> Trait declarations are allowed to extend other instantiations of themselves.
> For example, we can write `trait C[\S\] extends C[\T\] where {S extends T, T
> extends Object} end`. … Effectively, we have expressed the fact that the
> static parameter `S` of `C` is covariant.

If `List` were declared this way, `List[\Float\] <: List[\RR64\]` and
`List[\ArrayList[\V\]\] <: List[\List[\V\]\]`, and **every** remaining ascription
in the file (and `x.zip[\V\](y)`, finding 9) would go away.

**Library.** `Library/List.fss:112` — `trait List[\E\] extends { AnyList,
LexicographicOrder[\List[\E\],E\] }`, invariant. And `Library/FortressLibrary.fss:2243`
carries the comment `(* TODO: fix when Number is covariant. *)`.

**Probe.** `probes-spec/p16_covar.fss` writes the spec's idiom verbatim:

```
trait Co[\S\] extends Co[\T\] where { S extends T, T extends Object }
```
```
p16_covar.fss:6:27: T is undefined.
p16_covar.fss:6:49: T is undefined.
```

The interpreter does not bind where-clause type variables in an `extends` clause.
Corroborating evidence that the library authors hit the same wall:
`Library/CovariantCollection.fss` is an entire hand-rolled covariant list built
out of `typecase` and explicit `upward[\R, I extends R, T extends R\]` lifting
functions — the workaround for the feature the spec describes in one line.

**Revival-worklist item, high value:** this single gap is responsible for most of
the notational noise in `microgpt_paper.fss`, in `microgpt_native.fss`, and in
`Library/CovariantCollection.fss` itself.

---

## 3. (a) WORKS — `V` should join the numeric tower, exactly as `C` does

**Spec.** `Specification/advanced-lib/algebraic-constraints.tex`,
§`monoids-groups-rings-fields`, defines `Monoid`, `CommutativeMonoid`, `Group`,
`AbelianGroup`, `SemiRing`, `Ring`, `CommutativeRing`, `Field` — each as a trait
carrying default methods derived from the abstract ones.

**Library (the only authority in practice).** `Library/FortressLibrary.fss`
implements *two* of them: `AdditiveGroup[\T\]` (line 328) and
`MultiplicativeRing[\T\]` (line 340). `AdditiveGroup` gives, free:

```
    getter zero(): T = self - self
    opr -(self, other: T): T = self + (-other)
    opr -(self) : T = self.zero - self
```

**Current code.** `V` extends nothing, and line 63 hand-writes precisely the
`AdditiveGroup` default:

```
  opr -(self, o: V): V = self + (-o)
```

The in-house precedent `explorations/complex_ring.fss` does the opposite:
`object C … extends MultiplicativeRing[\C\]` inherits juxtaposition, binary
minus and `zero` from three chained defaults.

**Probes.** `probes-spec/p4_addgroup.fss` (AdditiveGroup) and
`probes-spec/p5_ring.fss` (MultiplicativeRing) both run; golden-gated in
`mgprobe_s3.fss` / `mgprobe_s4.fss`.

**Simplification (minimum-cost form, A2).**

```
  object V(var data: RR64, children: List[\V\], grads: List[\RR64\])
+         extends AdditiveGroup[\V\]
    …
-   opr -(self, o: V): V = self + (-o)
```

The `opr +(self, c: RR64)` overload keeps resolving alongside the inherited
generic `+` (verified). The full-ring form (A5) additionally inherits
`juxtaposition` from `TIMES` at the cost of `getter one()` and
`opr ^(self, n: AnyIntegral)`; both `^` overloads (`AnyIntegral` and `RR64`)
coexist because `AnyIntegral <: RR64` makes the pair a legal Subtype-Rule
overloading. Recommend A2 as the change and A5 as the statement of intent —
the reason `C` is a `MultiplicativeRing` is that it *is* one, and so is `V`.

---

## 4. (a) WORKS — the vector×matrix overload the header calls impossible **is** buildable

This is the file's own boxed exception (header lines 30–49):

> ONE spec item could not be built as written. … The interpreter rejects the
> pair: *first parameters `p:[List[\V\],List[\List[\V\]\]]` and
> `w:[List[\List[\V\]\],List[\V\]]` are unrelated (neither subtype, excludes,
> nor equal) and no excluding pair is present* — two instantiations of the SAME
> generic trait are not seen as disjoint.

**The library does exactly this, and it works.** `Library/FortressLibrary.fss`
declares **both** directions:

```
opr juxtaposition[\ T extends Number, nat n, nat m \]
     (me:Matrix[\T,n,m\], v:Vector[\T,m\]):Vector[\T,n\] = me.rmul(v)      (:2634)

opr juxtaposition[\ T extends Number, nat n, nat m \]
     (v:Vector[\T,n\], me:Matrix[\T,n,m\]):Vector[\T,m\] = me.lmul(v)      (:2641)
```

It is legal because the two carriers are **mutually excluding traits**, not two
instantiations of one:

```
trait Rank1 extends { Rank[\1\]} excludes { Rank2, Rank3, Number, String }   (:1599)
trait Vector[\T extends Number, nat s0\] extends { AnyVector, Array1[…] }    (:2189)
trait Matrix[\T extends Number, nat s0, nat s1\] extends { AnyMatrix, Array2[…] } (:2497)
```

The blocker was never "two instantiations of a generic trait"; it was
"`List[\V\]` and `List[\List[\V\]\]` do not *exclude*". The spec agrees the
instantiations are not disjoint — `Specification/basic/trait-parameters.tex`
explicitly permits `trait C[\S\] extends C[\T\]`, so `A[\ZZ32\]` and
`A[\Boolean\]` really can share a subtype, and the hopeful comment in
`ProjectFortress/tests/doubledOverloading3.fss` ("we should consider these
instantiations to be disjoint (right right?)") is wrong *per spec*. The remedy
the spec offers is §`more-specific-rule` (the Meet Rule): "either `P excludes Q`
or there is a declaration `f(P ∩ Q)` in the scope". The library takes the
`excludes` branch.

**Probe 1** — the exclusion alone (`probes-spec/p7_excludes.fss`):

```
trait Rank1V excludes Rank2V end
trait Rank2V excludes Rank1V end
object Vec(xs: List[\V\]) extends Rank1V …
object Mat(rows: List[\Vec\]) extends Rank2V …
opr juxtaposition(m: Mat, x: Vec): Vec = …
opr juxtaposition(p: Vec, m: Mat): Vec = …
```
```
m x = Vec<|V(1.0), V(6.0)|>
x m = Vec<|V(1.0), V(6.0)|>
```

**Probe 2** — the objection the header raises against wrappers ("no wrapper
objects, so the renders carry no field noise") is answerable. Make the carriers
library generators (`probes-spec/p14_genwrap.fss`):

```
object Vec(xs: List[\V\]) extends { Rank1V, ZeroIndexed[\V\], DelegatedIndexed[\V,ZZ32\] }
  getter asString(): String = "" xs
  getter indices(): Generator[\ZZ32\] = 0#|xs|
  opr |self| : ZZ32 = |xs|
  opr [i: ZZ32]: V = xs[i]
  opr [r: Range[\ZZ32\]]: ZeroIndexed[\V\] = Vec(xs[r])
end
```
```
m x  = <|V(1.0), V(6.0)|>
x m  = <|V(1.0), V(6.0)|>
|x|  = 2   x[1] = V(2.0)
comprehension over Vec: <|1.0, 2.0|>
for over Mat:
  row <|V(1.0), V(0.0)|>
  row <|V(0.0), V(3.0)|>
```

Six lines of carrier per rank buys `|x|`, `x[i]`, `x[r]`, `u <- x`, `seq(x)`,
`.map`, `.reduce`, no field noise in renders — **and both juxtaposition
directions**, which is the attention blend written the way the brief asked:

```
- BIG BOXPLUS[j <- 0#|p|] p[j] Vv[j]
+ p Vv
```

**Cost, stated honestly.** This is a structural rewrite of the notation layer
(every `List[\V\]` becomes `Vec`, every `List[\List[\V\]\]` becomes `Mat`,
`BIG BOXPLUS` and `VecConcat` and `vecsum` disappear, the three-different-names
workaround for `Vec.Vec`/`Mat.Vec`/`Vec.Mat` disappears). It is not a
line-for-line edit. But the header's claim that it *cannot be done* is false,
and the header's stated reason (generic instantiations are not disjoint) is the
right diagnosis of the wrong problem.

---

## 5. (b) SPEC-ONLY — coercion: `konst(…)` and the RR64 overload triplication are unavoidable *today*

**Spec.** `Specification/basic/conversions-coercions.tex` — a 906-line chapter.
§`coercion-declarations`: "To declare that trait `U` allows a coercion from type
`T`, the declaration of trait `U` must provide a coercion declaration whose
parameter type is `T`." §`coercion` lists the contexts, including "arguments to
functionals and constructors where the corresponding parameters have declared
types". `Specification/basic/expressions/coerce.tex` adds the `coerce[\T\]`
library identity function.

**What it would buy.** One declaration inside `V`:

```
  coerce(d: RR64) = V(d, emptyList[\V\](), emptyList[\RR64\]())
```

would delete `konst` entirely (13 call sites), plus lines 59, 64, 68, 69 —
`opr +(self, c: RR64)`, `opr -(self, c: RR64)`, `opr /(self, c: RR64)`,
`opr /(self, n: ZZ32)` — and let `x - c`, `a + 0.00001`, `loss / 3.0` read
literally.

**Probe.** `probes-spec/p3_coerce.fss` and `p3b_coerce_fn.fss` and `p15_coertc.fss`.
The declaration **parses** (no syntax error) but is ignored:

```
$ fortress p15_coertc.fss
f got W
Unification error: Closure/Constructor for f param 1 (u:U) got arg 3: ZZ32 of type Int

$ fortress typecheck p15_coertc.fss
    Could not check call to function f
    - U->String is not applicable to an argument of type IntLiteral.
File p15_coertc.fss has 1 error.
```

Neither path applies it. `grep -rl Coercion ProjectFortress/src/…/interpreter/`
returns **nothing**; there *is* a
`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala`
(plus `CoercionTest.scala`), so the machinery was started on the static side and
never wired end to end.

**Classification of our code: (c) DELIBERATE by necessity.** `konst` and the
RR64 overloads are the correct workaround. **Revival-worklist item**, and a large
one — the chapter is 906 lines and the file is one of its most obvious customers.

---

## 6. (b) SPEC-ONLY — big operators: the spec's shape is one declaration, not a nullary registry

**Spec.** `Specification/basic/expressions/reductions.tex`, §`reduction-expr`:

> There is no explicit relationship between `BIG Op` and `Op`. Instead, a
> reduction expression corresponds to a call to the `BIG Op` operator, which has
> the following header:
> `opr BIG Op[\T\](g:(Reduction[\R0\],T->R0)->R0):R`

`Specification/advanced/parallelism-locality/defining-generators.tex`,
§`desugaring-generators`: "A wrapper function always has the following type:
`wrapper(g:(Reduction[\R0\],T->R0)->R0): R`". And
`Specification/advanced/subscripting.tex`, §`big-operators-impl`, in full: "A big
operator such as Σ or Π is declared as a usual operator declaration."

**Nowhere** does the spec mention a nullary registration, a `BigOperator` object,
`Comprehension[\I,O,R,L\]`, or `__bigOperatorSugar`.

**Current code** (lines 99–103, 146–150) uses the two-declaration idiom:

```
opr BIG OPLUS(): Comprehension[\V,V,List[\V\],List[\V\]\] = …
opr BIG OPLUS(g: Generator[\V\]): V =
  __bigOperatorSugar[\V,V,List[\V\],List[\V\]\](BIG OPLUS(), g)
```

**Probe** (`probes-spec/p11_bigspec.fss`) writes the spec's single-declaration
form:

```
opr BIG OTIMES(g: (Reduction[\List[\V\]\], V->List[\V\])->List[\V\]): V = …
```
```
Unification error: Closure/Constructor for BIG OTIMES param 1
  (g:(Reduction[\List[\V\]\],V->List[\V\])->List[\V\]) got arg (): () of type ()
```

The desugarer emits a **nullary** operator reference. Source:
`ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:367-373` —

```java
Expr opexp = ExprFactory.makeOpExpr(span, op, staticArgs);      // BIG OP()
res = ExprFactory.make_RewriteFnApp(span, BIGOP_NAME,
          ExprFactory.makeTupleExpr(span, opexp, body));         // __bigOperator(BIG OP(), fn(r,u)=>…)
```

**Classification of our code: (c) DELIBERATE — forced.** Our idiom copies the
library's own (`FortressLibrary.fss:3041-3045` for `SUM`, `:126-130` for
`BIG LEXICO`, `:1422-1441` for `BIG SQCAP`/`SQCUP`) and it is the only shape the
desugarer accepts. **Spec is silent on the registry; the library is the sole
authority.** Revival-worklist entry: the desugaring diverges from the spec it
implements.

---

## 7. Why Σ is closed to `V` — spec-level *and* implementation-level, revised

The journal's "P3, why `SUM` is closed" concluded impossibility. Both halves of
the answer are now precise, and the *reason* differs from what was recorded.

**(i) Library sealing, not spec design.** `Library/FortressLibrary.fss:3041`:

```
opr SUM[\T extends Number\](): Comprehension[\T,Number,Number,Number\] = …
```

The `T extends Number` constraint is the library's choice; the spec's
`opr BIG Op[\T\](g:…)` places no such constraint (§`reduction-expr`, above), and
`figref{generatedExpressions}` in `defining-generators.tex` shows `Σ` with a
generic `N`. `V` cannot become a `Number` because `trait Number … comprises {
RR64 }` (`FortressLibrary.fss:349`) is sealed — again a library decision.

**(ii) But the spec *also* forbids the overload, for a different reason.**
`Specification/basic/overloading.tex`, §`overloading-terms`:

> Although there may be multiple declarations with the same functional name, it
> is an error for their static parameters to differ (up to α-equivalence), or
> for one declaration to have static parameters and another to not have them.

A user `opr SUM(…)` with no static parameters may not coexist with the library's
`opr SUM[\T extends Number\](…)`. This is a **spec-level** bar, independent of
the library.

**(iii) And the implementation adds a third, narrower bar.** Probe
`probes-spec/p6_sum.fss`:

```
Overloading of BIG +[\T extends Number\]():Comprehension[…]  …:3041  and
BIG +():Comprehension[\V,V,List[\V\],List[\V\]\]  …:22
fails because their parameter lists have the same types
```

Both nullary registrations have parameter list `()`, so **at most one big
operator per name, per program** — which is what the file's header records
("nullary big-operator registrations are one-per-name") and what forced the
second glyph `BIG BOXPLUS`. Under the spec's single-declaration form (finding 6)
this collision would not exist, because the declarations would differ in their
real argument types.

**Verdict for the charge:** the closedness of Σ is *both* a library sealing and a
spec-level restriction, and the one-per-name collision on top is purely an
implementation artefact of a desugaring the spec does not describe. The file's
choice of `BIG OPLUS`/`BIG BOXPLUS` is **(c) DELIBERATE and correct**; the header
comment's diagnosis ("the second-monoid worry turns out to be per-NAME, not
per-carrier") is right.

---

## 8. (b) SPEC-ONLY — multifix operators would give the n-ary `Sum` node for free

This is the one the authors had no reason to look for, and it is aimed squarely
at the engine's central design decision.

**Spec.** `Specification/basic/operators/chained-multifix.tex`, §`chained-multifix`:

> Any infix operator that does not chain may be treated as *multifix*. If `n−1`
> occurrences of the same operator separate `n` operands where `n ≥ 3`, then the
> compiler **first checks to see whether there is a definition for that operator
> that will accept `n` arguments. If so, that definition is used**; if not, then
> the operator is treated as left-associative …

The entire reason `microgpt_paper.fss` carries `vsum`, `VConcat` and
`opr BIG OPLUS` (lines 87–103, and the header's "alternative A: a uniform tape
node, summation as an n-ary Sum node built by BIG OPLUS over a list-concatenation
monoid") is to get **one** `Sum` node with `n` addends instead of a chain of
binary `+` nodes. A multifix declaration

```
opr +(args: V...): V = V(SUM[a <- seq(args)] a.data, <| a | a <- seq(args) |>, …)
```

is the spec's sanctioned way to get exactly that for ordinary infix `a + b + c`.

**Probes.** `probes-spec/p12_multifix.fss`, `p13_multifix2.fss`.
Varargs declarations *are* supported. Multifix *dispatch* is not:

- `opr OTIMES(a:V,b:V)` together with `opr OTIMES(args:V...)` is rejected —
  "*fails because of ambiguity in overlapping rest (...) parameters*".
- With only the varargs declaration, `a OTIMES b OTIMES c` yields
  `V(24.0, n=2)` — the value is right (2·3·4) but the node has **2** children:
  the expression was reassociated left-associatively into two binary calls. No
  `n`-argument definition was looked for.

So the interpreter never performs the "first check for an `n`-argument
definition" step. **Revival-worklist item.** Our `BIG OPLUS`-over-a-concatenation-
monoid construction is **(c) DELIBERATE** and remains the only working route —
but it is a reconstruction of a language feature, which is exactly what this
audit was asked to find.

---

## 9. (b) SPEC-ONLY / spec silent — static-argument inference

**Current code**, line 163 and 121:

```
  <|[\V\] (u + w) | (u, w) <- x.zip[\V\](y)|>
      for (ch, lg) <- seq(v.children.zip[\RR64\](v.grads)) do
```

**Probe** `probes-spec/p8_omit.fss` drops the static argument:

```
Unification error: Closure/Constructor for zip param 1
  (g:ZeroIndexed[\F@…List.fss:251…\]) got arg ArrayList[\V\] of type ArrayList[\V\]
```

**Spec.** `Specification/basic/inference.tex` is the whole Type Inference
chapter, and it is a **27-line stub**:

```latex
\chapter{Type Inference}
\note{This chapter will include the Fortress static type inference mechanism.}
\note{ \begin{itemize}
 \item There seems to be a circular dependency between inference and
 juxtaposition disambiguation …
```

Identical in `Specification-1.0-frozen/basic/inference.tex`. So the language's
inference rules were **never written down**, and
`Specification/basic/components/type-inference.tex` (§`type-inference-components`)
only explains how to *lift* the missing procedure to components.

**Classification: spec is silent; the implementation is the only authority.**
`x.zip[\V\](y)` stays. Worth recording as the single largest hole in the
specification itself, and the reason findings 1, 2 and 9 cannot be adjudicated
"against the spec" at all.

---

## 10. (a) WORKS — return-type annotations are optional

**Spec.** `Specification/basic/functions.tex` / `declarations.tex` make the
return type optional in the grammar; the whole point of the (stubbed) inference
chapter is to supply it.

**Current code.** Every one of the eleven notation-layer declarations annotates:

```
opr DOT(u: List[\V\], v: List[\V\]): V = BIG OPLUS[m <- 0#|u|] (u[m] v[m])
opr juxtaposition(w: List[\List[\V\]\], x: List[\V\]): List[\V\] = …
relu(x: List[\V\]): List[\V\] = <| (relu u) | u <- x |>
rmsnorm(x: List[\V\]): List[\V\] = x / SQRT((x DOT x) / |x| + 0.00001)
```

**Probe.** `probes-spec/p8_omit.fss` (functions, operators, methods all infer);
golden-gated across all eleven in `mgprobe_s4.fss`.

**Simplification.**

```
- opr DOT(u: List[\V\], v: List[\V\]): V = BIG OPLUS[m <- 0#|u|] (u[m] v[m])
+ opr DOT(u: List[\V\], v: List[\V\]) = BIG OPLUS[m <- 0#|u|] (u[m] v[m])
```

**Recommendation: keep them anyway (c) DELIBERATE** for the *paper register*.
These eleven declarations are the file's exhibits — the header says so ("these
definitions are themselves the exhibits"). A reader needs `: List[\V\]` to see
that `relu` lifts pointwise. Report it as *available*, not as *owed*. Parameter
types cannot be dropped in any case (overload resolution needs them).

---

## 11. (a) WORKS — `opr SQRT(n: ZZ32)` is dead weight

**Library.** `Library/FortressLibrary.fss:383`, inside `trait Number`:

```
    opr SQRT(self):RR64 = SQRT asFloat(self)
```

`ZZ32 <: ZZ64 <: ZZ <: … <: Number`, so `SQRT |q|` already works.

**Current code**, lines 82–83:

```
opr SQRT(u: V): V = u^0.5
opr SQRT(n: ZZ32): RR64 = SQRT (n 1.0)
```

**Probe.** `probes-spec/p10_sqrt.fss` keeps only the `V` overload:

```
SQRT |q| = 2.0
SQRT V(9.0) = V(3.0)
```

The user overload on `V` and the library's on `Number` coexist (they exclude —
`AnyList excludes { Number, HasRank, String }` at `List.fss:86` and `V` is a
fresh object type). Golden-gated in `mgprobe_s3.fss`.

**Simplification.**

```
  opr SQRT(u: V): V = u^0.5
- opr SQRT(n: ZZ32): RR64 = SQRT (n 1.0)
```

The comment on line 81 ("the radical sign the formulas print, on a graph value
**and on a dimension**") should lose its second half.

---

## 12. (b) SPEC-ONLY — the algebraic-constraints library does not exist

**Spec.** `Specification/advanced-lib/algebraic-constraints.tex` is 1894 lines
specifying `UnaryPredicate`, `EquivalenceRelation`, `PartialOrder`,
`Associative`, `Commutative`, `HasIdentity`, `HasInverses`, `Distributive`,
`ZeroAnnihilation`, `Lattice`, `Monoid`, `CommutativeMonoid`, `Group`,
`AbelianGroup`, `SemiRing`, `Ring`, `CommutativeRing`, `Field` and their
approximate variants — the framework in which "define `TIMES`, get
juxtaposition" is a theorem rather than a convenience.

**What ships.** `Library/FortressLibrary.fss` has `AdditiveGroup` and
`MultiplicativeRing` only. `trait Monoid[\ T, opr OPLUS \]` is present at line
2823 but **commented out** inside a `(*************  … *************)` block.
There is no `Ring`, no `Field`, no `CommutativeMonoid`.

The whole chapter exists in-tree as
**`Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE`** — every trait
present, every line commented out (`%trait Monoid[\T extends Monoid[\T,ODOT\],
opr ODOT\]` at line 775, `%trait Ring…` at 976, `%trait Field…` at 1196). The
filename is the finding.

**Consequence for us:** finding 3 (`AdditiveGroup`/`MultiplicativeRing`) is the
*whole* of what trait compliance can buy today. No trait route opens `SUM`,
reductions, or anything else. Revival-worklist item, and a natural companion to
project goal 3 (complex numbers).

---

## 13. (b) SPEC-ONLY / library-sealed — spec-style dimensioned vectors run, but not for `V`

**Spec.** `Specification/basic/expressions/aggregate.tex`, §`array-expr`
(marginnote):

> Vector types are written `Vector[\T\][n]`. A type of this form can be
> abbreviated as `T^n` … Matrix types are written
> `Matrix[\T\][n_0 × … × n_{k-1}]` … `T^{n_0 × … × n_{k-1}}`.

**Library.** Both exist, with `nat` dimension parameters, and are substantial:
`Vector[\T extends Number, nat s0\]` (`FortressLibrary.fss:2189`) with `+ - scale
pmul dot`; `Matrix[\T extends Number, nat s0, nat s1\]` (`:2497`) with `mul rmul
lmul scale`; free operators `DOT`, `juxtaposition` (both directions, finding 4),
`squaredNorm`, `opr ||v||`. **Sealed to `T extends Number`**, and `Number
comprises { RR64 }`, so `Vector[\V,n\]` is unreachable. That is a library
decision; the spec's marginnote says only `Vector[\T\][n]`.

**But the *shape* runs for a user carrier.** `probes-spec/p9_natvec.fss`:

```
object Vn[\nat n\](xs: Array[\V,ZZ32\])
  opr |self| : ZZ32 = n
  opr [i: ZZ32]: V = xs[i]
end
opr +[\nat n\](a: Vn[\n\], b: Vn[\n\]): Vn[\n\] = …
```
```
r[2] = V(12.0)  |r| = 3
```

Statically dimension-checked vector addition over a user element type works in
the 2012 interpreter. Combined with finding 4's excluding carriers, this is the
shape a future `microgpt_dim.fss` would take: `Vn[\nEmbd\]`, `Mat[\hs,nEmbd\]`,
with shape errors caught at declaration rather than by `assert`. Out of scope for
this file (the model's dimensions are runtime config values, not literals), but
it is the spec-shaped destination, and it is **reachable**.

---

## 14. (b) SPEC-ONLY — dimensions and units

`Specification/basic/dimensions.tex` opens:

```latex
\chapter{Dimensions and Units}
\note{Dimensions and units are not yet supported.
The examples in this chapter are not tested nor run by the interpreter.}
```

257 lines of grammar and semantics, zero implementation. Nothing was missed
here; recorded so the question is closed.

---

## 15. (a) WORKS — the parameter flattening in `run()` contradicts the file's own `concat`

**Current code**, lines 345–357 — three nested `for` loops and a mutable list:

```
  var psL: List[\V\] := emptyList[\V\]()
  for m <- seq(<|[\List[\List[\V\]\]\] g.wte, g.wpe, g.lmHead, g.wo, g.fc1, g.fc2|>) do
    for row <- seq(m) do
      for q <- seq(row) do psL := psL.addRight(q) end
    end
  end
  for hm <- seq(<|[\List[\List[\List[\V\]\]\]\] g.wq, g.wk, g.wv|>) do
    for m <- seq(hm) do
      for row <- seq(m) do
        for q <- seq(row) do psL := psL.addRight(q) end
      end
    end
  end
```

The file already knows the idiom — line 175:

```
concat(heads: List[\List[\V\]\]): List[\V\] = <|[\V\] u | h <- heads, u <- h|>
```

**Spec.** `Specification/basic/expressions/comprehensions.tex` §`comprehensions`
+ `Specification/advanced/parallelism-locality/defining-generators.tex`
§`desugaring-generators` (nested generator clause lists desugar to nested
`generate` calls, natural order preserved).

**Probe.** `probes-spec/p17_nested.fss` — three-level nesting, order preserved:
`flat = <|1, 2, 3, 4, 5, 6|>`.

**Simplification.**

```
- var psL: List[\V\] := emptyList[\V\]()
- for m <- seq(<|…\] g.wte, g.wpe, g.lmHead, g.wo, g.fc1, g.fc2|>) do
-   for row <- seq(m) do
-     for q <- seq(row) do psL := psL.addRight(q) end end end
- for hm <- seq(<|…\] g.wq, g.wk, g.wv|>) do … 4 levels … end
+ flat  = <| q | m  <- seq(<|[\List[\List[\V\]\]\] g.wte, g.wpe, g.lmHead, g.wo, g.fc1, g.fc2|>),
+                row <- seq(m), q <- seq(row) |>
+ flatH = <| q | hm <- seq(<|[\List[\List[\List[\V\]\]\]\] g.wq, g.wk, g.wv|>),
+                m  <- seq(hm), row <- seq(m), q <- seq(row) |>
+ psL   = flat || flatH
```

13 lines to 5, and it removes the only mutable accumulator in the setup path.
(Not golden-gated — `goldenCheck()` does not reach `run()`'s optimizer setup —
but the idiom is probed and is the file's own.)

---

## 16. (c) DELIBERATE, confirmed correct

- **`opr juxtaposition` for `W x`, `DOT` for the inner product** (lines 153–157).
  The library uses `DOT` **and** `juxtaposition` for the vector inner product
  (`FortressLibrary.fss:2261-2265`) and `DOT`/`juxtaposition` for matrix·vector
  (`:2631-2635`), so the library itself does not distinguish them; the file's
  split is forced by the one-overload-per-`(List,List)` limit and the header's
  "seven uses against one" reasoning is sound. It would dissolve under finding 4.
- **Adam left in index-form `RR64`** (header lines 26–28). Stated teaching point.
- **`konst` + RR64 overloads** — forced by finding 5.
- **`BIG OPLUS` / `BIG BOXPLUS` two-glyph split** — forced by finding 7(iii).

## 17. Where the spec is silent and the library is the only authority

1. **Type inference** — `basic/inference.tex` is a stub (finding 9). Everything
   about ascriptions, static-argument inference, and literal typing is
   implementation-defined.
2. **Big-operator registration** — the spec says "declared as a usual operator
   declaration" (finding 6); the nullary + `BigOperator` + `__bigOperatorSugar`
   protocol is `FortressLibrary.fss`'s invention and the desugarer's contract.
3. **Variance** — the spec gives one idiom (finding 2) and does not otherwise
   discuss variance of library collections; `List` is invariant by library fiat
   and `CovariantCollection.fss` is the escape hatch.

---

## Revival worklist extracted from this audit

| Item | Spec | Evidence | Payoff |
|---|---|---|---|
| Declaration-site covariance (`C[\S\] extends C[\T\] where {S extends T}`) | `basic/trait-parameters.tex` | `p16_covar.fss`: "T is undefined" | removes nearly every static-arg ascription tree-wide |
| Coercion declarations (evaluator + typechecker) | `basic/conversions-coercions.tex` (906 lines) | `p15_coertc.fss`; `CoercionOracle.scala` exists, unwired | removes `konst` and RR64 overload triplication |
| Multifix operator dispatch | `basic/operators/chained-multifix.tex` | `p13_multifix2.fss`: `n=2` children from a 3-ary chain | n-ary nodes without a reduction monoid |
| Big operators as plain declarations | `advanced/subscripting.tex` §big-operators-impl, `basic/expressions/reductions.tex` | `p11_bigspec.fss`: "got arg (): () of type ()" | lifts one-big-operator-per-name |
| Algebraic-constraints library | `advanced-lib/algebraic-constraints.tex` (1894 lines) | `Library/incomplete/advanced/Fortress.Operators.fsi.INCOMPLETE` | `Ring`/`Field`/`Monoid` for goal 3 (ℂ) and for `V` |
| `Vector`/`Matrix` unsealed from `Number` | `basic/expressions/aggregate.tex` §array-expr | `FortressLibrary.fss:2189, 2497` | dimensioned vectors for non-numeric carriers |
| Static-argument inference (`x.zip(y)`) | — (`basic/inference.tex` is a stub) | `p8_omit.fss` | pervasive |
| Dimensions and units | `basic/dimensions.tex` | chapter's own `\note` | far future |

---

## Probe index (`probes-spec/`)

| File | What it establishes |
|---|---|
| `p1_infer.fss` | unascribed list literals / comprehensions infer |
| `p2_ascribe.fss` | `<|1.0,1.0|>` is `List[\FloatLiteral\]`; invariance bites |
| `p3_coerce.fss`, `p3b_coerce_fn.fss`, `p15_coertc.fss` | `coerce` parses, is ignored by walk *and* typecheck |
| `p4_addgroup.fss` | `V extends AdditiveGroup[\V\]` → free binary `-`, `zero` |
| `p5_ring.fss` | full `MultiplicativeRing[\V\]`; two `^` overloads coexist |
| `p6_sum.fss` | `SUM` nullary collision, verbatim error |
| `p7_excludes.fss` | `excludes` makes both juxtaposition directions legal |
| `p8_omit.fss` | return types optional; `zip` static arg mandatory; `SQRT 4` |
| `p9_natvec.fss` | `nat`-parameterized user vector + dimension-checked `+`; `typecase` |
| `p10_sqrt.fss` | library `Number.SQRT` covers `SQRT |q|` |
| `p11_bigspec.fss` | spec's single-declaration BIG operator form fails |
| `p12_multifix.fss`, `p13_multifix2.fss` | varargs OK, multifix dispatch absent |
| `p14_genwrap.fss` | excluding carriers as library generators — no field noise |
| `p16_covar.fss` | spec's covariance idiom rejected |
| `p17_nested.fss` | 3-level nested generator comprehension, order preserved |
| `mgprobe_base.fss` → `mgprobe_s5.fss` | golden-gated simplification bundle A1–A5 |

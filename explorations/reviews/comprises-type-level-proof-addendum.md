# Coverage extension of the overloading-resolution proof

For review by the item 26 authors and batch 7b implementers. 2026-09-29;
read against main at `3ec367f4deb8c47d1720da3760240ed0b9f8ce95`.

**Decision supported:** option 1 of [the judgement](comprises-type-level-judgement.md).
Allow coverage to resolve overload overlap without turning coverage into
ordinary subtyping. The original proof can retain runtime uniqueness, but
must give up static uniqueness; the return-type intersection has the short
justification below. This is a conditional, pen-and-paper proof extension,
not a verification of the implementations or full Fortress soundness.

## Source and scope

The source is [Proof of Overloading Resolution for Functions](../../Specification/appendices/overloading-function.tex),
especially `lem:subset`, `lem:le`, `thm:overloading-subtyping` and
`thm:dynamic-subtype-static`. Keep its finite-candidate argument, for
calls applicable **without coercion**. Here declarations have ground domain
and return types; an intermediate argument type such as `G[\ZZ32\]`
is ground too. Assume the existing no-duplicates rule, concrete implementation
availability, body typing, and a sound, transitive subtype relation.
Equivalent domains are identified for ordering purposes.

This does not prove the lift to quantified generic overloads or inference:
their instantiation and Return Type Rule obligations remain with batch 7b.
[Welterweight](../../Papers/Welterweight/evaluation.tick) supplies the useful
notion of a value's *ilk* (its most specific runtime type), but explicitly
says its broader propositions are not rigorously proved. This note does not
claim to finish those propositions.

## One replacement premise

Write $P\le Q$ for subtyping and $P<Q$ for strict subtyping. Let $v$ be the
argument value (a tuple for multiple arguments), $X$ its ilk, and $A$ its
static type. Membership $v\in P$ entails $X\le P$; type soundness gives
$X\le A$.

Replace the exact-meet requirement for overlapping incomparable domains
$P,Q$ by **Cover-Meet**: there are visible concrete declarations with domains
$C_1,\ldots,C_n$ such that

$$
C_i\le P,\quad C_i\le Q,\qquad
v\in P\cap Q\ \Longrightarrow\ \exists i:\ v\in C_i .
$$

The last condition quantifies every permitted value, not merely the current
call or objects observed in a test. Require Cover-Meet for every incomparable
overlapping pair in the family, including pairs among the covering
declarations. An empty overlap needs no resolving declaration.

This is a separate coverage judgement. It does **not** assert the nominal
subtyping identity $P\cap Q=\bigcup_i C_i$.

## Replacement lemmas and theorem

Use the appendix's notation: $\Sigma$ and $\Delta$ are the statically and
dynamically applicable domains; $\sigma$ and $\delta$ are their minimal
(most-specific) elements.

**1. Existence is unchanged.** $\Sigma\subseteq\Delta$, since
$X\le A\le S$ for each $S\in\Sigma$. If $\Sigma$ is nonempty, $\Delta$ is
nonempty. Finiteness and the strict partial order give a minimal element.
The original subset and existence lemmas therefore remain.

**2. Runtime uniqueness.** Suppose distinct $P,Q\in\delta$. They are
incomparable. Since $v$ belongs to both, Cover-Meet supplies an applicable
$C_i\in\Delta$ below both. Incomparability makes $C_i$ strictly below each,
contradicting minimality. Thus $|\delta|\le1$, and by (1),

$$
\Sigma\ne\varnothing\ \Longrightarrow\ |\delta|=1.
$$

Delete the original lemma's assertion that the static case is identical:
coverage gives a domain containing the *value*, not necessarily a supertype
of $A$. Accordingly, do not retain the conclusion $|\sigma|=1$.

**3. Refinement of every static candidate.** Let $\delta=\{D\}$ and take
any $S\in\Sigma\subseteq\Delta$. If $S<D$, minimality of $D$ is contradicted.
If $S,D$ are incomparable, Cover-Meet supplies a dynamically applicable
domain strictly below $D$, also a contradiction. Therefore

$$
D\le S\quad\text{for every }S\in\Sigma.
$$

This replaces `thm:dynamic-subtype-static`; a singleton $\sigma$ is no
longer a hypothesis.

**4. Result-type corollary.** Let $R_P$ be a declaration's return type.
For these ground declarations the Return Type Rule gives
$D\le S\Rightarrow R_D\le R_S$. Hence

$$
R_D\le R_{\mathrm{call}},
\qquad R_{\mathrm{call}}=\bigcap_{S\in\sigma}R_S .
$$

By body typing, a returned value belongs to $R_D$, and therefore to
$R_{\mathrm{call}}$. The proposed call type is sound under the stated
premises and independent of candidate enumeration order. It is the greatest
lower bound of these return contracts, not a claim of globally optimal
inference. This proves neither termination of the called function nor
absence of unrelated runtime errors.

## Application to the existing brief

[PLAN](../coordinator/PLAN.md) routes item 26 to **batch 7b**, whose
[rungs S, C and W](../coordinator/CLIMB-BATCH-7.md) already specify the
text change, coverage repair and result intersection. Batch N's second
run is rung Q (the numeral switch); N's first run supplies the ambiguity
checker that C adjusts.

- **S:** retain the existence lemmas; replace the two uniqueness conclusions
  by runtime uniqueness alone; use (3) and (4) for the call's result.
  Mark the ground/no-coercion scope rather than presenting this as the
  proof of the whole generic system.
- **C and W:** establish Cover-Meet, including applicability and strict
  refinement, before accepting overlap. The plan's clause expansion may
  serve this judgement; it must not silently make a coverage result an
  ordinary assignment/subtyping fact. Reusing the global normalizer needs
  particular care at this boundary.
- **C:** keep coercion-involving ties under their separate ambiguity rule.
  The Return Type Rule is a premise, not something result intersection
  repairs. W's existing runtime selection must implement the ordered
  candidate family to which the proof applies.

The brief already includes the positive meet case, `MeetViaExclusionNoV`'s
rejection, and `SkBetweenAssign`'s unchanged static rejection. One useful
additional acceptance check is to give the two static candidates different,
compatible return interfaces and the resolving arm a result implementing
both: the call must support both interfaces, regardless of declaration
order. The same family with an incompatible resolving return must be refused.

**Remaining boundary, not new work in this note:** coverage must hold across
all legal extenders. The already-recorded cross-component closure gap
(row 487) is not discharged by this proof or by passing local examples.
Generic instantiation, coercion resolution, coverage-search termination,
and actual code generation likewise retain their existing proof or
implementation obligations. No new probes, build, implementation change,
or claim that those obligations have been completed accompanies this note.

## Review of the 7b briefing, at the same base

Read against `3ec367f4d`: the [7b record](../coordinator/CLIMB-BATCH-7.md),
[its review](../coordinator/climb-batch-7b-review.md), the
[rung workflow](../coordinator/climb-batch-workflow.md), the
[7C decision](../compile-ladder/rung-spec-comprises/decision-record.md),
and [answer 9](overloading-judgement.md), sections 3.4–3.7. Source conclusions
below are by reading, not new measured verdicts. The proof above is unchanged.

**For Pavol.** Option 1 remains my recommendation. It permits an overload
family to handle every possible object even when the argument's static type
does not select one most-specific declaration. The new static result type
must describe what every possible selected implementation promises. This is
not permission to guess a method or to ignore a type error.

The coordinator's proposed performance price needs correction. Fortress
already permits a dynamically more-specific declaration to run even when
there is one static winner; the original appendix's final theorem says so.
Losing a unique static winner does not establish a new runtime-dispatch
mechanism or a measured slowdown. Nor does the proof prevent an optimizer
from resolving a particular call with additional information. Performance
remains unmeasured; do not sell either a cost or a speedup here.

### The normalizer boundary is already mixed

In `ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala`:

- `subtype` (85–86) normalizes both arguments; `meet` (78–79) uses the same
  normalizer. `equivalent` (314–315) also normalizes.
- `normConjunct` (645–655) replaces a closed conjunct by its surviving cases
  when another conjunct excludes a listed case. On the judgement's
  `MeetViaExclusion` shape this gives conjuncts `V,T`; the intersection
  subtype rule (135–147) can then establish subtyping to `V`.
- `pSubInner` (152–157) explicitly uses comprised cases when checking a
  trait against a union. Trait-to-trait checking (264–273) instead follows
  parents, with Steele's alternative commented out.

Thus my earlier warning must not be read as a claim that the current checker
keeps coverage wholly outside subtyping. It does not. This is broader than
the measured overload acceptance, although no new assignment verdict was
measured here. It is not, by itself, evidence of an unsafe value conversion.

**Brief amendment for C:** use a coverage query local to overload validity
(and the static-tie justification), reusing clause/exclusion helpers as
appropriate. Do not broaden the shared normalizer merely because the old
one contains a related rule. Preserve existing general subtype verdicts in
this rung; repairing their overall consistency is separate work. The
existing `SkBetweenAssign` guard alone cannot detect every change involving
an explicitly written intersection or union. Any proposed global change
must have its assignment/equivalence consequences reviewed explicitly.

### What coverage checking assumes

Clause expansion is a finite symbolic justification from declared closed
families, not enumeration of observed objects. It must substitute static
arguments correctly, prove each resolving domain below both competitors,
drop only proven exclusions, and establish coverage of the whole remaining
overlap. Failure to establish it is not success. Bound recursive search
with cycle detection; do not infer termination merely from a supposed
finite clause depth. Return a conservative failure on an unresolved case.

`TypeHierarchyChecker.everyKnownSubtypeListed` (275–289) checks the extenders
in its available trait table. Row 487 records that a later component can
escape this check. Therefore the implementation does not yet establish the
proof's closed-world premise for every accepted program. This limitation
predates the new meet search and remains a real limitation.

Runtime dispatch selects among applicable declarations; it does **not**
repair broken closure or prove coverage. If an outside object escapes the
listed cases, uniqueness is no longer justified. A complete implementation
must enforce closure at extension/link/load boundaries, or restrict/guard
the cases that rely on it. This review does not add that repair to 7b:
retain row 487 as an explicit dependency of the full guarantee. If full
cross-component soundness is required before enabling coverage, closing
487 or choosing a checked restricted domain is prerequisite; calling it
a runtime obligation without a mechanism is insufficient.

### Coercion is a separate choice

Batch N's landed `Functionals.scala` (688–752) retains unconverted ties for
7b, handles numeral ties by choosing a reading, and signals ambiguity for
unresolved conversion ties. It also retains a same-parameter-types case;
"every coercion tie is rejected except numerals" is too broad a description.

Do not use Cover-Meet to choose between different conversions: those may
produce different values. Once existing rules have fixed a conversion and
its result type, the converted call can use the no-coercion dispatch lemma,
provided its overload family satisfies the lemma's premises. Numeral
reading and the other retained tie cases keep their own obligations; this
note neither changes nor proves them.

### Rung size and the existing fallback

- **S:** the text and this bounded proof extension fit its assigned task.
- **C:** coverage search plus the result-type change is a coherent addition
  if it stays local. Intersecting returns must reach the call's expression
  type and expected-type checks, not only replace the head of a candidate
  list. The acceptance pair below makes that observable.
- **W:** its load-time overlap test can use the same coverage contract while
  retaining runtime selection. It must consider a covering *family*, not
  just find one arm that handles part of the overlap.

The workflow already supplies a worker, skeptic, repair/judgement and merged
gate; a rung is not a single unsupported implementation attempt. The 7b
review nevertheless reports large briefings (roughly 69K tokens for C and
66K for W). I cannot turn a source review into an assurance of completion
time or the proposed line counts.

**Do not take the fallback solely because of this proof.** No extra proof
project is needed. Keep the planned three-way change if the local coverage
boundary is adopted. Use the existing fallback if C/W requires a global
subtype redesign, general generic-instantiation work, or closure enforcement
to meet the chosen guarantee: move P2, its implementation and result typing
together to batch 8. Do not land a new unconditional soundness claim while
its premises are still recorded as unenforced. The other text corrections
may proceed as the record already specifies.

## Concrete acceptance pair for rung C

These are complete **unexecuted test designs**, not passing probes or gate
files. No builds were run for this addendum. The worker must record the
before/after outcomes and integrate the harness under the existing workflow.
The programs deliberately have no generic function declarations and no
coercions; `M` is an own-clause intermediate trait already used in the ways
note. Return interfaces are distinct but compatible.

`CoverageReturnGood.fss`: after the repair, require type checking and `PASS`.
The inferred type of `result` must support both assignments; neither a
return type chosen by sort order nor simply `Any` suffices. Also reverse the
two broad declarations as an order-invariance check. If bytecode generation
blocks execution, record that separately from the checker result.

```fortress
component CoverageReturnGood
export Executable

trait S comprises { U, V } end
trait T comprises { V, W } end
trait U extends S excludes W end
trait M extends { S, T } comprises { V } end
trait V extends M end
trait W extends T end
object Vo extends V end

trait LeftResult end
trait RightResult end
object LeftOnly extends LeftResult end
object RightOnly extends RightResult end
object BothResult extends { LeftResult, RightResult } end

choose(s: S): LeftResult = LeftOnly
choose(t: T): RightResult = RightOnly
choose(v: V): BothResult = BothResult

exercise(m: M): () = do
    result = choose(m)
    left: LeftResult = result
    right: RightResult = result
    typecase result of
        BothResult => println("PASS")
        else => println("FAIL")
    end
end

run(): () = exercise(Vo)
end
```

`CoverageReturnBad.fss`: refuse the overload family on its return-type
contract, not merely on the old missing-meet failure. The resolving domain
still covers the overlap, but its result is not a `RightResult`. Coverage
alone must not admit it. Its body conforms to its own declared return type,
so ordinary body checking is not the intended rejection.

```fortress
component CoverageReturnBad
export Executable

trait S comprises { U, V } end
trait T comprises { V, W } end
trait U extends S excludes W end
trait M extends { S, T } comprises { V } end
trait V extends M end
trait W extends T end
object Vo extends V end

trait LeftResult end
trait RightResult end
object LeftOnly extends LeftResult end
object RightOnly extends RightResult end
object BothResult extends { LeftResult, RightResult } end

choose(s: S): LeftResult = LeftOnly
choose(t: T): RightResult = RightOnly
choose(v: V): LeftResult = LeftOnly

exercise(m: M): () = do
    result = choose(m)
    left: LeftResult = result
    right: RightResult = result
    typecase result of
        BothResult => println("PASS")
        else => println("FAIL")
    end
end

run(): () = exercise(Vo)
end
```

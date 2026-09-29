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

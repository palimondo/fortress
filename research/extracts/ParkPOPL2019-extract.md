# Extract: Park, Hong, Steele & Ryu, "Polymorphic Symmetric Multiple Dispatch with Variance" (POPL 2019)

Working notes on Gyunghee Park (KAIST and Oracle Labs), Jaemin Hong (KAIST),
Guy L. Steele Jr. (Oracle Labs) and Sukyoung Ryu (KAIST), *Polymorphic
Symmetric Multiple Dispatch with Variance*, Proc. ACM Program. Lang. 3, POPL,
Article 11, January 2019, 28 pages, doi:10.1145/3290324. These notes are our
own summary and commentary with brief attributed quotations, not a
reproduction of the paper.

- **Source.** https://dl.acm.org/doi/10.1145/3290324. The PDF,
  https://dl.acm.org/doi/pdf/10.1145/3290324?download=true, was downloaded by
  Pavol on 2026-09-29. It is 28 pages, SHA-256
  `791f978e529b17d533e3342763ed6c54a2f1027eeee5aac9869956b5cdd2b954`.
- **Local copies (gitignored, never committed).** The PDF is at
  `research/decks/popl19w.pdf`, and its full text (`pdftotext -layout`,
  1,460 lines) is at `research/decks/popl19w.txt`.
- **The copy the record read on 2026-09-23** (`explorations/reviews/mie-probes/literature.md`):
  http://web.archive.org/web/20240415191855/https://dl.acm.org/doi/pdf/10.1145/3290324.
- **License**, as printed on the first page: "This work is licensed under a
  Creative Commons Attribution-NonCommercial 4.0 International License. ©
  2019 Copyright held by the owner/author(s)." That license permits
  copying and redistribution for non-commercial purposes with attribution.
  The PDF and its text stay out of git all the same; the coordinator decides
  that with Pavol.

Page numbers are the printed article pages (11:N). The full proofs are in a
companion report, "Polymorphic Symmetric Multiple Dispatch with Variance
(Extended Report)", 2018, which the paper cites without a URL; the paper
itself gives proof sketches. Cross-references to this repository are marked
**[repo]**.

## 1. What the paper is

The abstract claims "the first formal specification of a strongly typed
object-oriented language with symmetric multiple dispatch, multiple
inheritance, and parametric polymorphism with variance", with a static and a
dynamic semantics and a type soundness proof "demonstrating that our novel
dynamic dispatch algorithm is consistent with the static semantics"
(p. 11:1). The calculus is **FGFV**, "Featherweight Generic Fortress with
Variance" (p. 11:3). It formalises the overloading rules of the 2011 OOPSLA
paper (Allen et al., in the tree as `Papers/Types/`), which were stated
informally and without a language semantics. It adds declaration-site
variance and a dispatch algorithm, and proves that the static rules and the
run-time choice agree (§6, p. 11:25).

The language (Fig. 2, p. 11:8; §3.2, pp. 11:8-9):
- **Traits and objects.** Traits are "like Java interfaces that do not have
  any fields", and objects are "like Java final classes that cannot be
  extended".
- **Type parameters.** Trait type parameters carry a variance mark (`+`, `-`,
  `=`) and upper bounds. Object type parameters are always invariant. Method
  type parameters have lower and upper bounds, and the defaults are `Any` and
  `Bottom`.
- **Expressions.** Variables, first-class functions, object creation with
  written type arguments, and method calls `e.m(e)` with no written type
  arguments.
- **Types.** `Bottom` "is intentionally not expressible in the surface
  syntax" (p. 11:9). Union and intersection types exist only as internal
  types (p. 11:9). Tuples are not values.
- **What is left out.** "FGFV omits functional methods … and declarations
  of closed types …, but these could be added back to FGFV in an obvious
  way" (p. 11:3). Related work adds "modularity, nominal exclusion, and
  closed types" to that list (p. 11:25). There are no top-level functions:
  what is overloaded is methods.

## 2. The rule excluding multiple instantiations

- **The rule.** Every pair of a class's proper ancestors must satisfy
  [Anc-Diff-Trait] (instances of two different traits: no condition) or
  [Anc-Same-Trait] (Fig. 4, p. 11:11). [D-Trait] and [D-Object] both check it
  (Fig. 3, p. 11:10). [Anc-Same-Trait] requires that "if a class C extends two
  instances of a trait T, T⟦α⟧ and T⟦ρ⟧, then C also extends some T⟦γ⟧
  (which may be T⟦α⟧, T⟦ρ⟧, or a third instance) that extends both"
  (p. 11:11).
- **Per variance (our derivation from the rule's two subtype premises).** An
  invariant parameter forces γ = α = ρ, so two different instances cannot
  both be ancestors: that is the blanket rule. A covariant parameter needs an
  ancestor instance whose argument is below both arguments, and a
  contravariant one needs one whose argument is above both.
- **Why.** "Because the rules guarantee that there always exists a single
  minimal ancestor when a class extends multiple instances of a trait, no
  ambiguous method calls are possible due to multiple instances of a trait"
  (p. 11:11).
- **Credited.** The discussion calls it "the 'Ancestor Meet Rule' …
  introduced into Fortress in 2012 by Guy Steele and David Chase … to design
  an expressive type system with union and intersection types". It gives the
  laws T⟦α ⊓ α′⟧ ≡ T⟦α⟧ ⊓ T⟦α′⟧ for a covariant T and T⟦α ⊔ α′⟧ ≡ T⟦α⟧ ⊓
  T⟦α′⟧ for a contravariant one, and not "the 'obvious other two cases'"
  (p. 11:24). The citation is "Personal communication".
- **Used by the overloading check.** To close part of the gap between
  subtyping of domains and inclusion of applicable sets, the checker reduces
  an existential domain by collecting the constraints that keep it from being
  `Bottom` (*existential reduction*, pp. 11:13-14). The worked case uses
  invariance: with `ArrayList` extending `List` and both invariant, subtypes
  of `ArrayList⟦P⟧` and `List⟦Q⟧` "are exclusive unless they are both
  ArrayList⟦S⟧ for some type S" (pp. 11:13-14). So the rule is what lets
  two generic declarations be proved disjoint or nested.
- **Not argued.** The paper argues that the rule is sufficient, not that it
  is necessary.

## 3. Variance

- **Subtyping.** Declaration-site variance on trait type parameters, as in
  the example "T⟦U2, U1, U1⟧ <: T⟦U1, U2, U1⟧" for `trait T⟦+P, -Q, =S⟧` with
  U2 <: U1 (p. 11:9).
- **Positions.** [D-Method] checks that covariant and contravariant class
  type parameters appear only in positions of their own variance. A *type
  context* gives each position a variance: arrow domains and contravariant
  arguments flip it, and "type parameters of objects and invariant type
  parameters of traits are invariant" (pp. 11:11-12).
- **The overloading rules do not change.** "The overloading rules for FGF
  remain the same because covariant or contravariant types affect only the
  well-formedness of method declarations rather than the validity of
  overloading" (p. 11:12).
- **Run time is where variance costs something.** "Supporting variance in a
  type-sound manner requires keeping track of the static types of method
  invocations at run time" (p. 11:7).
  - The example: `sort(x: ListC⟦A⟧)`, `sort(x: ListC⟦B⟧)` and
    `sort⟦P⟧(x: ListC⟦C⟧): SortedListI⟦P⟧`, with `ListC` covariant and
    `SortedListI` invariant, beside a generic
    `merge⟦P⟧(SortedListI⟦P⟧, SortedListI⟦P⟧)`.
  - Two calls statically typed `SortedListI⟦A⟧` feed a merge. If run time
    instantiates the third `sort`'s `P` as anything but `A`, "the merge call
    would fail, despite the fact that the program successfully passed static
    type checking" (p. 11:7).
- **The 2012 alternatives.** The team considered dropping contravariance,
  treating arrow domains as invariant and compensating "by introducing rules
  of coercion". They also considered dropping union types, and perhaps
  intersections, for pseudo-joins and pseudo-meets. The paper instead
  accepts "the potential for exponential blowup" at run time (p. 11:24).

## 4. How dispatch picks among overloads

### 4.1 The static rules (§4, pp. 11:12-15)

- **The reading of a generic declaration.** Following Allen et al. 2011, a
  generic declaration is "a single declaration whose domain type is
  existentially quantified over its type parameters", not "a set of
  infinitely many monomorphic declarations" (p. 11:3). "A monomorphic method
  declaration is a generic method declaration without any type parameter"
  (p. 11:5).
- **Specificity.** The informal rules compare applicable sets, "which is not
  practically checkable", so the formal ones compare domain types by
  subtyping (p. 11:12). This is sound but "not complete" (p. 11:13), and
  existential reduction narrows the gap (§2 above).
- **Three rules for every pair of same-named declarations** (Fig. 5,
  p. 11:13):
  - No Duplicates: neither domain is below the other.
  - Meet: the domains exclude ([Meet-Excl], their intersection reduces to
    `Bottom`), or one is below the other, or a third declaration's domain is
    equivalent to their intersection ([Meet-Third]).
  - Return Type ([Return-Test]): when d1 is more specific than d2,
    `arrow(d1)` must be a subtype of `∀⟦κ, κ′⟧((α ⊓ α′) → ρ′)`, where the
    κ are both declarations' type parameters, α and α′ their domains and ρ′
    the less specific return type.
- **What [Return-Test] guarantees.** It checks the informal rule "for any
  instance of d2 instantiated with σ2 that is applicable to γ, there exists
  an instance of d1 … that is applicable to γ and has a return type that is
  a subtype of the return type of the instance of d2" (p. 11:15). That is,
  it quantifies over every instance of the less specific declaration.
- **Theorem 4.1** (p. 11:15). "For any method invocation, there always
  exists a unique most specific method declaration in its set of applicable
  method declarations." No Duplicates makes specificity antisymmetric, and
  the Meet Rule gives "a meet for every nonempty subset".
- **Static resolution** ([T-Method], [MSAV], Fig. 7, p. 11:16). The checker
  picks an instance of the most specific declaration applicable to the static
  argument types, and annotates the call with that instance's return type.
  The type-annotated expression `ϵ.m(ϵ): α` is what runs.

### 4.2 The dynamic choice (§5.2, pp. 11:16-21)

- **The contract.** "dynamic overloading resolution then must select an
  instance of the most specific method declaration that is applicable to the
  dynamic types of the arguments and whose return type is a subtype of the
  static type of the expression" (p. 11:15).
- **Types at run time.** Types are reified: "all the type parameters are
  instantiated with ground types at run time", and a value's run-time type is
  its *ilk* (p. 11:17). Ground types include unions and intersections
  (Fig. 8, p. 11:17).
- **[R-Method]** (p. 11:17). It sorts the visible declarations most-to-least
  specific ("This order is statically determinable, so the sorting can be
  done at compile time"). It then runs the *dispatch semipredicate* on each
  declaration in turn and takes the first that succeeds. The receiver's ilk is
  matched together with the arguments' ilks, which is what makes the dispatch
  symmetric.
- **The semipredicate** ([Dispatch], pp. 11:17-18) has three steps:
  1. match the argument ilks against the domain to get lower and upper bounds
     for the method type parameters;
  2. match the call's static return type against the declared return type to
     get bounds "to make sure that the dynamic dispatch preserves type";
  3. solve the bounds.

  "If any of these steps fails, the semipredicate is false: the declaration
  is not applicable" (p. 11:18). Matching a union can yield several candidate
  bound lists, combined as a Cartesian product (pp. 11:18-19).
- **Solving** (Fig. 10, p. 11:19). The rule works from the rightmost type
  parameter to the left and "computes a substitution … by taking the
  intersection of the upper bounds", declared and computed. It then
  propagates the choice into the declared lower bounds of the parameters to
  its left. It "never instantiates method type parameters with Bottom". The
  right-to-left pass works because of the binding restrictions (p. 11:11):
  - a method type parameter's scope "extends to the right of its
    declaration";
  - "no reference to a method type parameter appears in any of the upper
    bounds";
  - the union of the lower bounds must be below the intersection of the upper
    bounds.
- **The worked example** (§5.2.4, pp. 11:20-21).
  - Two covariant `append` declarations, over `SortedList` and over `List`.
  - The call has static type `List⟦C3⟧` and argument ilks `SortedCons⟦C1⟧`
    and `Cons⟦C2⟧`, with C1, C2 <: C3.
  - The `SortedList` declaration fails on the second argument, so the `List`
    one runs, instantiated at `[C3/P, C3/Q]`.
  - So the instance comes from the static return type's upper bound, not from
    the ilks' C1 and C2.
- **Why intersection of upper bounds.** The Fortress team "had assumed …
  that once the tightest possible upper and lower bounds for a method type
  parameter have been found, then the union (or pseudo-union) of the lower
  bounds should be chosen". For that and for a hybrid "we were unable to
  complete the proofs of correctness", so the algorithm "always chooses the
  intersection of the upper bounds" (p. 11:25).
- **Union instances.** A type parameter can be instantiated at a union at
  run time. In the paper's example `O.m(3, true): (Int ⊔ Boolean)`, "P of m
  is inferred as (Int ⊔ Boolean) by the dispatch semipredicate at run time"
  (p. 11:21).

## 5. The run-time check on the return type

- **What it is.** Every call carries its static return type into run time
  (§5.1, p. 11:16). Dispatch uses it as an upper bound when it instantiates
  the chosen declaration (p. 11:18).
- **It never moves a call to another declaration.**
  - Lemma 5.8: whatever instance the checker chose, "there exists a
    type-safe most specific method instance at run time" (p. 11:22). Its proof
    is where [Return-Test] is used (pp. 11:22-23).
  - Lemma 5.9: the first-dispatchable scan then yields an instance of the
    most specific declaration applicable to the ilks, with a return type below
    the static one (p. 11:23).
  - In a well-formed program the return-type bounds therefore never rule out
    that declaration. They only choose its instance.
- **What it costs.**
  - "In simple invariant cases, we expect the run-time cost to be relatively
    low but nonzero", since matching `List⟦String⟧` against `List⟦T⟧` only
    binds T (pp. 11:24-25).
  - For the covariant and contravariant cases, "caching or dynamic
    recompilation … may help" (p. 11:25).
  - The discussion calls left-to-right scoping "a relatively small sacrifice
    of expressivity for a large gain in dynamic efficiency" (p. 11:24).

## 6. What it proves and what it leaves open

**Proved (sketched here, full proofs in the companion report):**
- Theorem 4.1: a unique most specific declaration exists (p. 11:15).
- Soundness and completeness of type matching and of solving (Lemmas 5.1 to
  5.4), and so of the dispatch semipredicate (Theorems 5.5, 5.6;
  pp. 11:21-22). Completeness of matching assumes that a matched type holds
  no `Bottom` and no type parameter inside a union or intersection. The
  paper shows that every use meets this: declared types have neither, and
  unions reach a declaration only through already-ground instances
  (pp. 11:21-22).
- Lemmas 5.7 to 5.9 (pp. 11:22-23).
- Theorem 5.10, soundness of a method call: a well-typed call is reduced by
  [R-Method] and its body's type is below the call's static type (p. 11:23).
- Theorem 5.11, type soundness: if `e` types to `(ϵ, д)` and `ϵ` evaluates to
  a value, the value's type is below `д` (p. 11:24).
- Only the method-invocation case is proved, "the other cases are
  conventional" (p. 11:23). The proofs are not mechanised; the Coq model in
  the lineage is Kim and Ryu 2011, without generics (p. 11:4).

**Left open or left out:**
- No static inference algorithm: "we do not present a specific static type
  inference algorithm that finds the substitution σ in rule [E-Sub]". The
  paper conjectures that its match rule could serve (p. 11:25).
- Domain subtyping is incomplete against applicable sets (p. 11:13).
- Exponential blowup is possible at run time (p. 11:24).
- The union-of-lower-bounds instance is unproved (p. 11:25).
- Functional methods and top-level functions, closed types (`comprises`),
  nominal exclusion (`excludes`) and modularity are out; the paper says they
  "could be added back … in an obvious way" but shows nothing (pp. 11:3,
  11:25). Self types and a numeric tower are absent: neither is mentioned,
  and `Integer` appears only in a `List⟦Integer⟧` example (p. 11:2).
- Method type parameters may not appear in upper bounds, so F-bounded method
  parameters are outside the calculus (p. 11:11). Trait parameters' bounds are
  checked in an environment that binds the parameters themselves ([D-Trait],
  p. 11:10), so by the rule's form F-bounded trait parameters are admitted.
- Whether the ancestor rule is necessary is not argued.

## 7. How it differs from the 2012 Welterweight draft and Naden's write-ups

The paper cites neither text; its only 2012 source is "Steele and Chase 2012.
Personal communication" (p. 11:28). The lineage is by content.

**Welterweight** (`Papers/Welterweight/`: "Dynamic Dispatch and Type Inference
Semipredicates", Chase, Hilburn, Luchangco, Naden, Ryu, Steele, Tristan,
"PAPER SUBMITTED TO 2012 ACM SPLASH---OOPSLA", `paper.tick:499-509`; Naden
calls it "the failed OOPSLA 2012 submission",
`Papers/Types/journal/justificationOfRTR.tex:538`).

- *The same:*
  - the Ancestors Meet Rule and its reason, a "unique minimal instance" for
    efficient dispatch (`static.tick:83-89`);
  - ilks;
  - the most-to-least-specific order with a first-success scan of dispatch
    semipredicates (`dispatch.tick:5-20`);
  - right-to-left processing of type parameters under left-to-right scoping
    (`dispatch.tick:67`).
- *The differences:*
  - **Inputs to dispatch.** Welterweight dispatches on the ilks alone: it is
    "possible to select the dynamically most specific applicable function or
    method from an overload set using only the ilks of the argument values; no
    other information about the arguments is needed" (`evaluation.tick:30-33`).
    POPL adds the call's static return type.
  - **The instance.** Welterweight aims at "the most specific instantiation"
    by propagating lower limits (`dispatch.tick:67`). It leaves the Return
    Type Rule to "one final adjustment step … after the entrypoint [has] been
    chosen", with no static type to adjust to (`dispatch.tick:212`). POPL
    takes the intersection of the upper bounds, the static return type among
    them.
  - **Proof.** Welterweight states soundness as propositions that "should
    also hold" if "our type system is sound" (`evaluation.tick:71-99`). POPL
    proves them.
  - **Language.** Welterweight's is larger: top-level functions, a typecase
    (`R-Match-Succeeds`), `comprises` and `excludes` clauses, and coverage of
    abstract declarations. POPL drops all of these. POPL does handle
    contravariance and intersections in matching, where Welterweight's main
    algorithm is "Simplified version: no contravariance or ∩", with
    contravariance a variation (`dispatch.tick:62`, `:365`).
  - **Self types.** Welterweight's self-typed-generics dispatch step is
    commented out (`dispatch.tick:195-210`); POPL has no self types at all.

**Naden, "The Return Type Rule and Generics"** (2012-08-31,
`Papers/Types/journal/justificationOfRTR.tex`).
- *Rejected:* letting the static context limit which definitions are
  applicable, so that overloads failing the Return Type Rule could pass.
  "By adding contextual information to the concept of the overload set, we
  muddy its semantics" (`:241-305`, quoted at `:289-290`).
- *Kept:* the Return Type Rule, plus multiple instantiation exclusion: "any
  type which is a subtype of two distinct instantiations of a single generic
  type is equivalent to Bottom" (`:342-347`), with a proof (`:433`).
- *Why:* a canonical instance for run-time choice (`headOrID`, "Context
  does not give us any clue", `:480-495`). So "Fortress implements blanket
  multiple instantiation exclusion" (`:496`).
- *For covariant parameters:* a minimal instance suffices, "the ancestor
  meet rule that appears in the failed OOPSLA 2012 submission" (`:512-538`).
  He adds a second, cross-instantiation restriction between a covariant
  subtrait and its supertrait (`:540-566`). He finds that the numeric tower's
  self-type idiom breaks it, and that "more work needs to be done"
  (`:568-633`). His suggested rewrite puts the self type in a bound,
  `add⟦X <: Ring⟦X⟧⟧(X, X): X` (`:620-624`).

**Naden, "Enforcing Fortress' Return Type Rule at Runtime"** (2012-08-31,
`Papers/RuntimeInstantiation/RTRinstantionTheory.tex`, with the notes of
May to July 2012 beside it).
- *Proposed:* adding bounds from the call's static return type to run-time
  instantiation "without changing which function definition will be chosen"
  (`:73-80`).
- *Proved:* a theorem that under the Return Type Rule the return-type bounds
  are satisfiable exactly when applicability is, so they can join the
  single pass (`:279-298`).
- *Not done:* the bound-generation algorithm and the open coding (`:84-89`).

**POPL 2019 against these.**
- It carries out the second write-up in a full calculus, with proofs: the
  return-type bounds in the semipredicate, and Lemmas 5.8 and 5.9.
- It stays within the first write-up's position: overload sets are validated
  statically and without context, the Return Type Rule is kept, and the
  exclusion rule is kept with the covariant relaxation, extended to
  contravariance.
- It does not do what that write-up rejected: the static type chooses the
  instance, never the declaration (§5 above). One part of Naden's objection
  still applies to the instance: which instance runs depends on static
  information (the `append` example).
- It has no counterpart to the cross-instantiation restriction. Whether
  [Return-Test] refuses Naden's `coTail` pair instead has not been worked
  out here.
- It says nothing on the tower problem.
- It excludes the F-bounded method parameters of Naden's suggested rewrite
  (§6).

## 8. Bearing on the decisions on record

- **Instantiation exclusion and route A (POSITIONS 2026-09-24).**
  - [Anc-Same-Trait] is the rule route A keeps: blanket for invariant
    parameters, as rung S states it in Luchangco's two-part form
    (`Documentation/Specification/Prose/Language/types.tick:353-360`).
  - For covariant parameters the two are consistent by our reading: the
    Types chapter lets two instances share a value unless their covariant
    arguments exclude, and the paper asks a class with both to have an
    instance below both. The Types chapter has only `covariant`; the paper
    also has contravariance.
  - The record summarises the route as "culminating in the POPL 2019 paper,
    which keeps the rule and specialisation by a run-time return-type check,
    with no self types and no tower". The full text bears that out (§§2, 5,
    6).
  - The paper uses the rule inside the overloading check (existential
    reduction, pp. 11:13-14). That is the same work instantiation exclusion
    does in the checker's domain reduction
    (`reviews/overloading-judgement.md` § 3.5).
  - **[repo]** The rule was in the checker from 2010 (FACTS, the exclusion
    fork, dated). The paper's 2012 date is for the ancestor form.
- **Answer 9's overloading rules (POSITIONS 2026-09-26).**
  - The paper is answer 9's model, formalised and proved: existential
    domains, the plain declaration as the degenerate case, the three rules,
    and specificity by domain subtyping (§4.1).
  - Calls write no static arguments (Fig. 2). So answer 9's positional rule,
    which exists for calls that do, has no counterpart. That fits answer 9's
    note on the 2011 paper.
  - The paper overloads methods only. Fortress's top-level functions and
    operators are, by our reading, the receiver-free case.
- **The return-type rule over every instance (answer 9, defect 2).**
  [Return-Test] is exactly the construction answer 9 prescribes for the
  checker rung, the "special arrow" `∀[Δ1, Δ2] (S1 ∩ S2) → T2` with the less
  specific declaration's parameters kept quantified
  (`reviews/overloading-judgement.md` § 3.5). The paper states that it
  covers every instance of the less specific declaration (p. 11:15), and
  its universal reduction is the paper's form of "except where the domain
  reduction forces an equality" (pp. 11:14-15). The rung can cite Fig. 5 and
  Fig. 6 as its specification.
- **Run-time instantiation of a dispatched generic (item 30, POSITIONS
  2026-09-29).** The decision: the generic declaration runs, at the instance
  the value fixes, and at the least instance within the bounds where it fixes
  none; Naden's return-type restriction is future work
  (`reviews/plain-beside-generic-judgement.md:74`, `:159`).
  - *Which declaration:* the paper agrees. The most specific declaration
    applicable to the ilks runs (Lemma 5.9).
  - *Naden's restriction:* the paper is its published, proved form (§§5, 7).
  - *The instance where the value does not fix it:* the paper diverges. It
    takes the intersection of the upper bounds, declared and from the static
    return type (p. 11:19), and reports that the least instance, the union
    of the lower bounds, could not be proved correct (p. 11:25). Item 30's
    default is Welterweight's "most specific instantiation"
    (`dispatch.tick:67`), which is that unproved choice.
  - *Where the value fixes it* (an invariant position), the two agree.
  - *An example* (ours, by reading, not run): `wrap[\X extends Number\](x:
    X): Box[\X\]` beside `wrap(a: Any): Any` is a valid pair (the generic is
    more specific, and its return type is below `Any`). Called through a
    variable of type `Any` holding a `ZZ32`, item 30's default runs it at
    `ZZ32` and returns a `Box[\ZZ32\]`. The paper's rule runs it at `Number`,
    the declared bound, since the static return type `Any` adds nothing, and
    returns a `Box[\Number\]`.
  - *Unions:* the paper also instantiates at run-time unions (p. 11:21),
    which the compiled path does not have (item 30's judgement, line 74).
  - Both points should reach the coordinator before batch 7b's rung S writes
    item 30's sentence.
- **The `covariant` keyword (row 404, POSITIONS 2026-09-26).**
  - FGFV is the formal account of the 2012 `covariant` and `contravariant`
    modifiers: position checks, the ancestor rule relaxed by variance, and
    overloading rules unchanged.
  - It also says what carrying variance to run time takes beyond
    variance-aware subtyping of reified types: the static return type at
    every call (p. 11:7).
  - It is the design reference for worklist item 12 when that is taken up.
    It changes nothing in row 404's standing as future work off the path to
    microGPT.
  - Its variance is on type parameters only. Sign flags as covariant
    parameters (probe `Q3Phantom`) would be an extension.
- **`comprises` read on values (item 26, POSITIONS 2026-09-29).**
  - The paper has no closed types, so it says nothing on reading a
    `comprises` clause, and its "obvious" addition is not shown.
  - Its Meet Rule asks for a declaration whose domain is equivalent to the
    intersection ([Meet-Third]), and Theorem 4.1 gives a unique most specific
    declaration for static types and ilks alike. So it keeps static
    uniqueness, the property item 26 gives up for closed traits in favour of
    run-time uniqueness.
  - What it shares with item 26's rung W is the run-time shape: a statically
    sorted most-to-least-specific list scanned for the first fit (p. 11:17;
    `explorations/coordinator/PLAN.md`, batch 7b's line on item 26).
  - Its proofs are over a whole program, so the closure caveat of row 487 has
    no counterpart.
- **F-bounded functions in the library (no decision yet; for batch 8 and the
  switch-over).** Generic functions such as
  `opr BIG MIN[\T extends StandardMin[\T\]\](g: Generator[\T\]): T`
  (`Library/FortressLibrary.fsi:1929`) are outside FGFV on two counts: they
  are top-level operators, and their type parameter appears in its own upper
  bound (restriction (2), p. 11:11).

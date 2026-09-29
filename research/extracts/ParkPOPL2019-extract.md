# Extract: Park, Hong, Steele & Ryu, "Polymorphic Symmetric Multiple Dispatch with Variance" (POPL 2019)

Working notes on Gyunghee Park (KAIST and Oracle Labs), Jaemin Hong (KAIST),
Guy L. Steele Jr. (Oracle Labs) and Sukyoung Ryu (KAIST), *Polymorphic
Symmetric Multiple Dispatch with Variance*, Proc. ACM Program. Lang. 3, POPL,
Article 11, January 2019, 28 pages, doi:10.1145/3290324 (authors,
affiliations and pages as Crossref records them). These notes are our own
summary and commentary with brief attributed quotations, not a reproduction
of the paper.

**Written from partial text.** On 2026-09-29 the paper could not be fetched
from the revival's container. dl.acm.org answers the PDF and ePDF URLs with a
Cloudflare challenge (403). The Wayback capture the record used,
`https://web.archive.org/web/20240415191855id_/https://dl.acm.org/doi/pdf/10.1145/3290324`,
failed on more than fifty attempts between 16:06 and 16:32 UTC: the proxy's
tunnel closed during the TLS handshake every time. WebFetch refuses
web.archive.org, and the Internet Archive's other hosts answered with rate
limits or errors. The
KAIST lab's publications page links a Google Drive copy that asks for a
sign-in. KAIST's repository record (KOASAS, handle 10203/270069) has no file,
and Unpaywall, OpenAlex, Semantic Scholar and CORE list no copy but ACM's.
So this extract has no SHA-256 and no license read from the paper itself. It
rests on two sources:

- the passages a delegated worker printed on 2026-09-23 from its own
  `pdftotext` of that Wayback capture, recovered verbatim from its transcript
  (branch `transcripts-blinded`,
  `projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/agent-a0689478938fee59e.jsonl`,
  07:46 to 08:00 UTC) and kept locally at
  `research/decks/ParkPOPL2019.passages.txt` (gitignored);
- `explorations/reviews/mie-probes/literature.md` § 1, written from the same
  text.

Page citations are the printed article pages (11:N). They come from the
running heads inside those passages or from the 2026-09-23 worker's
page-finding script. Where no page is recorded for a passage, the section is
cited instead, and only section numbers the passages show are used (§1, §2
with §2.2 and §2.3, §4.1, §5.2 to §5.4, §6). The calculus's syntax and
declaration rules, the overloading judgements of §4.1 and §5.2.2 to §5.2.5
(the details of the dispatch algorithm) survive only in fragments. A claim
that waits on the full text is marked **[not read]**. Cross-references to
this repository are marked **[repo]**.

**License.** Crossref's record, deposited by ACM, gives Creative Commons
Attribution-NonCommercial 4.0 (https://creativecommons.org/licenses/by-nc/4.0/)
for the version of record from 2019-01-02
(`https://api.crossref.org/works/10.1145/3290324`, read 2026-09-29), and
OpenAlex classes the article as open access. This is **not yet confirmed on
the paper's first page**. If the page says CC BY-NC 4.0, the license permits
copying and redistribution for non-commercial purposes with attribution,
which would cover this repository. The PDF and its full text stay out of git
all the same until the coordinator decides with Pavol.

**To finish.** When the capture is reachable, save it as
`research/decks/ParkPOPL2019.pdf`, run `pdftotext -layout` to
`research/decks/ParkPOPL2019.txt`, record the SHA-256 and the first page's
license line here and in `research/README.md`, and settle the [not read]
marks, starting with the list in section 5.

## 1. What the paper defines

In the abstract's words, "the first formal specification of a strongly typed
object-oriented language with symmetric multiple dispatch, multiple
inheritance, and parametric polymorphism with variance". The calculus is
**FGFV**, "Featherweight Generic Fortress with Variance" (§1).

- **The language.** It has traits and objects. Traits are "like Java
  interfaces that do not have any fields", and objects are "like Java final
  classes that cannot be extended". A trait "may have type parameters with
  variance annotations and upper bounds, extend any number of other traits,
  and have method definitions" (the calculus's syntax, page not recorded).
  Method type parameters take sets of lower and upper bounds. Union and
  intersection types are part of the type theory, "even if not directly
  expressible by the programmer" (p. 11:24). Types are reified: "all the type parameters are
  instantiated with ground types at run time", and a value's run-time type is
  its *ilk* (p. 11:17).
- **Variance.** Covariant and contravariant trait type parameters may appear
  only in positions of their own variance. Positions are checked with *type
  contexts*: the hole of a type context is covariant, the domain of an arrow
  and a contravariant parameter flip the variance, and "type parameters of
  objects and invariant type parameters of traits are invariant"
  (pp. 11:11-12).
- **The ancestor rule.** Rule [Anc-Same-Trait] (Fig. 4, p. 11:11) is the
  exclusion rule, kept in ancestor form: "if a class C extends two instances
  of a trait T, T⟦α⟧ and T⟦ρ⟧, then C also extends some T⟦γ⟧ (which may be
  T⟦α⟧, T⟦ρ⟧, or a third instance) that extends both". So "there always
  exists a single minimal ancestor", and "no ambiguous method calls are
  possible due to multiple instances of a trait" (p. 11:11). For an invariant
  parameter the two subtype premises force γ = α = ρ, so two different
  instances cannot both be ancestors. For a covariant parameter they need an
  instance below both, and for a contravariant one an instance above both.
  (This derivation is ours, as in `literature.md`.) The discussion credits
  the rule to Steele and David Chase: it "was introduced into Fortress in 2012
  … to design an expressive type system with union and intersection types"
  (p. 11:24).
- **Method type parameters.** Their bindings are well-formed when "(1) every
  reference to a method type parameter falls within its scope (which extends
  to the right of its declaration), (2) no reference to a method type
  parameter appears in any of the upper bounds, and (3) for each type
  parameter, the union of its lower bounds is a subtype of the intersection of
  its upper bounds" (p. 11:11). Restriction (1) is there for dispatch speed:
  "a simple, one-pass right-to-left scan" (p. 11:24).
- **Overloading rules.** These are the three rules of Allen et al. 2011 (No
  Duplicates, Meet, Return Type) over generic declarations read
  existentially: a generic declaration "is applicable to a type α if there
  exists an instance D of d that is applicable to α", specificity is
  inclusion of applicable sets, and "a monomorphic method declaration is a
  generic method declaration without any type parameter" (§2.2, page not
  recorded). They are restated as judgements with variance in §4.1 ([Meet-Excl]
  among the Meet cases; "∆ ⊢ d return type wrt d ok"), where the set of
  applicable declarations is shown to be "a meet semilattice"
  (**[not read]** in full).
- **The run-time return-type check.** Each method call carries its static
  return type after type checking, and dispatch uses it. Rule [R-Method]
  "seeks the most specific method declaration with a dispatchable instance
  that is applicable to the ilk of the arguments and whose return type is a
  subtype of the annotated static return type" (p. 11:17). The motivation:
  "Supporting variance in a type-sound manner requires keeping track of the
  static types of method invocations at run time" (p. 11:7).
- **Symmetric dispatch.** The receiver counts as one more argument, and no
  argument position takes priority. In the soundness proof's case for
  [R-Method] the chosen instance's domain is matched against the tuple of the
  receiver's and the arguments' ilks (just before §5.4). [R-Method] "first
  topologically sorts all the visible method declarations in a
  most-to-least specific order", adding
  "This order is statically determinable, so the sorting can be done at
  compile time", and then takes the first declaration that the *dispatch
  semipredicate* accepts (p. 11:17). The semipredicate computes lower and upper
  bounds for the method type parameters by matching the ilks against the
  signature (§5.2.2) and then solves them (§5.2.3); both are **[not read]**
  beyond their titles.

## 2. Main results

- A static semantics (type checking, including the overloading rules) and a
  dynamic semantics (dispatch), and a type soundness theorem joining them:
  if an expression types to an elaborated form of type д and that form
  reduces to a value, the value's type is a subtype of д (just before §5.4,
  p. 11:24). In the abstract's words this demonstrates that "our novel
  dynamic dispatch algorithm is consistent with the static semantics".
- A dispatch algorithm with a correctness proof for its semipredicate
  (§5.2.5, **[not read]**). When a method type parameter's bounds leave a
  choice, it "always chooses the intersection of the upper bounds" (p. 11:25).
- What the calculus leaves out: "While FGFV does not support features like
  modularity, nominal exclusion, and closed types in their work, they can be
  added in an obvious way" (p. 11:25). A keyword search of the whole text on
  2026-09-23 found no self types ("self" only as the receiver keyword), no
  `comprises`, and no numeric tower ("Integer" only in a `List⟦Integer⟧`
  example).
- What it improves on (§6, p. 11:25): the 2011 rules were stated "without
  defining a language with complete static and dynamic semantics", so that
  work "does not guarantee that the static overloading rules and the way a
  language chooses a method to invoke at run time match correctly".

The proof shows that the ancestor rule suffices for soundness. It does not
argue that the rule is necessary, and neither does any other published text
the record found (`literature.md`, closing section).

## 3. Section by section

- **§1, Introduction.** Places Fortress beside Common Lisp and Julia as
  languages with multiple dispatch. It recounts two earlier rule sets: Kim and
  Ryu's (Exclusion, Subtype, Meet) and Allen et al. 2011's (No Duplicates, a
  revised Meet, Return Type). Page not recorded.
- **§2, the earlier rules (p. 11:4).** FF is the paper's name for CF (Core
  Fortress, Allen et al. 2007, which "informally provides rules" and "does
  not specify the language semantics") together with FFMM (Kim and Ryu 2011,
  with "a complete formalization of the language semantics including
  overloading rules and its type soundness proof in Coq"; without generics,
  per `literature.md`). Each pair of declarations must satisfy
  Exclusion ("their intersection is Bottom"), Subtype or Meet.
- **§2.2, generics (FGF).** This is the 2011 model: existential
  applicability, specificity by applicable sets, and a plain declaration as
  the degenerate generic one. The paper names the rules' roles: "Meet Rule
  plays an important role for ensuring the existence of a disambiguating
  method declaration, and Return Type Rule serves a key role for type
  preservation". **Bears on** answer 9 (section 4.2 below).
- **§2.3, variance (pp. 11:6-7).** The worked example: `sort(x: ListC⟦A⟧)`
  and `sort(x: ListC⟦B⟧)` need a disambiguating `sort(x: ListC⟦C⟧)` "with a
  more specific return type". If the result type `SortedListI` is invariant,
  the set is invalid, because `SortedListI⟦A⟧` is not a supertype of
  `SortedListI⟦C⟧`. The paper then says that variance needs static types at
  run time and shows why with a set whose third declaration is generic in its
  result only, `sort⟦P⟧(x: ListC⟦C⟧): SortedListI⟦P⟧` (p. 11:7). The
  continuation with a generic `merge` is **[not read]**. **Bears on** item
  30 and row 404: `P` occurs only in the result, so the argument cannot fix
  it and the call's static type must. That is the case in Naden's note of
  2012-06-15
  (`Papers/RuntimeInstantiation/2012-6-15 return type instantiation restrictions.txt:70-77`).
- **The calculus's syntax** (section number and page not recorded).
  Traits, final objects, variance annotations, several bounds per method type
  parameter, for example "⟦{A,B} <: U <: {List⟦Boolean⟧}, {} <: V <:
  {Any,C,Number}⟧".
- **Well-formed declarations (pp. 11:11-12) and §4.1.** Fig. 4 (p. 11:11):
  [Anc-Diff-Trait], [Anc-Same-Trait], and the binding rules. A class's
  visible methods must satisfy "the overloading rules described in Section
  4.1" pairwise (p. 11:11). Variance positions are checked by type contexts
  (p. 11:12). §4.1 holds the overloading judgements. The static rule for a
  call, just before §5.2, appeals to Theorem 4.1 and "selects one instance D
  out of instantiations of d′" (**[not read]** beyond fragments). **Bears on**
  route A (4.1), answer 9 and its return-type rule (4.2, 4.3), and row 404
  (4.5).
- **§5.2, dynamic semantics (p. 11:17, Fig. 8).** Ilks, reified ground types,
  the [R-Method] rule with the static return type, the precomputed
  most-to-least-specific order with a first-match scan, and the
  semipredicate. Subsections: 5.2.2 Computing Bounds by Type Matching, 5.2.3
  Solving the Bounds, 5.2.4 Example, 5.2.5 Correctness of Dispatch
  Semipredicate (all **[not read]**). **Bears on** item 30 (4.4) and item 26
  (4.6).
- **The type soundness theorem** (just before §5.4, p. 11:24). In the
  proof's [R-Method] case the chosen instance's return type is a subtype of
  the annotated static type, and that is where the run-time check is used.
- **§5.4, discussion (pp. 11:24-25).** The paper names the language's
  asymmetries: a variable may have type `Any` but not `Bottom`, and "A trait
  may declare ancestors but not descendants". The ancestor rule gives
  T⟦α ⊓ α′⟧ ≡ T⟦α⟧ ⊓ T⟦α′⟧ for a covariant T and the matching law for a
  contravariant one, and not the other two cases.
  - In 2012 the team considered two ways to avoid exponential blowup at run
    time. One was to drop contravariance, treating arrow domains as
    invariant and compensating "by introducing rules of coercion". The other
    was to drop union types, and perhaps intersections too, in favour of a
    pseudo-join or pseudo-meet. The paper instead "accept[s] the potential
    for exponential blowup".
  - Run-time cost: "In simple invariant cases, we expect the run-time cost
    to be relatively low but nonzero". For the covariant and contravariant
    cases, "caching or dynamic recompilation … may help".
  - The instance choice: "the Fortress team had assumed … that once the
    tightest possible upper and lower bounds for a method type parameter
    have been found, then the union (or pseudo-union) of the lower bounds
    should be chosen". For that rule and for a hybrid, "we were unable to
    complete the proofs of correctness", so the algorithm "always chooses
    the intersection of the upper bounds".
  - No static inference algorithm is given for the substitution in [E-Sub];
    the paper only conjectures that its match rule could serve.

  **Bears on** item 30 (4.4), row 404 (4.5) and route A's coercion (4.1).
- **§6, related work (pp. 11:25-26).** Scope: the paper extends Allen et al.
  2011 "with variance for polymorphic types and a dynamic dispatch
  algorithm", and modularity, nominal exclusion and closed types are left
  out. Peers:
  - ML≤ "lacks multiple inheritance".
  - ParaSail restricts the scope of type parameters "so that dynamic type
    inference can be fast", but has no co- or contravariance.
  - Julia has no static type system and "does not check the validity of
    overloaded methods".
  - Scala has variance without symmetric multiple dispatch.
  - FHJ "uses static types at run time".

  **Bears on** item 26 (4.6).

## 4. Bearing on the decisions on record

### 4.1 Instantiation exclusion and route A (POSITIONS 2026-09-24)

- The paper keeps the rule in ancestor form, for all three variances
  (p. 11:11). Its invariant case is the instantiation exclusion that route A
  keeps and that rung S states in Luchangco's two-part form
  (`Documentation/Specification/Prose/Language/types.tick:353-360`). For
  covariant parameters the two are consistent by our reading: the Types
  chapter lets two instances share a value unless their covariant arguments
  exclude, and the paper asks a class that has both to have an instance below
  both. The Types chapter has only the `covariant` modifier. The paper also
  has contravariance, as the 2012 checker does (row 404).
- POSITIONS 2026-09-24 records Pavol's reading of the patents' forest rule
  ("the team's last record on how to do the 'Fortress' way") as the route
  "culminating in the POPL 2019 paper, which keeps the rule and
  specialisation by a run-time return-type check, with no self types and no
  tower". That summary is borne out as far as the text goes. The
  rule is on p. 11:11 and the check on p. 11:17, and the whole-text search
  found neither self types nor a tower.
- The paper gives two reasons for the rule: the single minimal ancestor that
  makes dispatch unambiguous (p. 11:11), and the union and intersection laws
  (p. 11:24). **[repo]** Welterweight gives the first reason, in terms of the
  efficiency of dispatch (`Papers/Welterweight/static.tick:83-89`).
- It dates the ancestor form to Steele and Chase in 2012. **[repo]** The
  blanket rule was in the checker from 2010 (FACTS, the exclusion fork,
  dated), so the paper's date is for the variance-aware form.
- Nothing in the paper speaks to the flattening itself.
- One parallel, not a ruling: the 2012 alternative to contravariance was
  coercion to a new function object (p. 11:24). That is the same device route
  A uses in place of the tower's subtyping, and the library already uses it
  in place of covariance (`Library/CovariantCollection.fss`, the widening
  functions).
- One limit to carry into the library work (ours, from restriction (2) on
  p. 11:11): FGFV forbids a method type parameter in an upper bound, so
  F-bounded generic functions are outside its proof. The library's
  `opr BIG MIN[\T extends StandardMin[\T\]\](g: Generator[\T\]): T`
  (`Library/FortressLibrary.fsi:1929`) and its kin are of that shape. Whether
  trait parameters may be F-bounded is **[not read]**.

### 4.2 Answer 9's overloading rules (POSITIONS 2026-09-26)

- Answer 9 revises the specification to the 2011 model the checker runs:
  existential domains, the plain declaration as the degenerate case, and the
  three rules. The paper is that model with variance added, proved sound
  together with a dispatch semantics (§2.2, §4.1, §5). It is the published
  confirmation that the model was meant for generic declarations beside plain
  ones.
- Answer 9's extra positional rule has no counterpart in the paper: two
  generic declarations in the more-specific relation must agree on their
  static parameters position by position (`reviews/overloading-judgement.md`
  § 3.4). By the reduction rule's form, an FGFV call carries its static
  return type and no static arguments (p. 11:17), so the case that rule
  closes, a call that writes its static arguments, does not arise in the
  calculus. Whether the surface syntax allows written arguments is
  **[not read]**. This fits answer 9's own note that the 2011 paper lacks the
  rule for the same reason.
- FGFV overloads methods and dispatches symmetrically on the receiver and the
  arguments together. By our reading, Fortress's top-level functions and
  operators, where most of answer 9's families live, are the receiver-free
  case.

### 4.3 The return-type rule over every instance (answer 9, defect 2)

- The paper's Return Type Rule is the 2011 rule. Its informal statement opens
  as that one does, "If one method declaration d1 is more specific than d2,
  for any non-Bottom …" (§2.2), and the paper calls it the rule that "serves
  a key role for type preservation".
- Whether the formal judgement of §4.1 quantifies over every instance of the
  less specific declaration, as `Papers/Types/rules.tick:174-180` does and as
  the checker rung is to enforce, is **[not read]**. It is the first thing to
  check in the full text.
- What the paper adds is that the static rule alone is not its whole story.
  With variance and a result-only type parameter, soundness also needs
  [R-Method]'s run-time filter on the static return type (pp. 11:7, 11:17).
  By our reading, the static rule guarantees that some instance of the more
  specific declaration matches, and the run-time filter picks that instance.
- The revival has adopted the static half (answer 9's checker rung). The
  run-time half is what item 30 recorded as future work (4.4).

### 4.4 Run-time instantiation of a dispatched generic (item 30, POSITIONS 2026-09-29)

Pavol's decision: the generic declaration runs at the instance the value
fixes, and at the least instance within the bounds where the value fixes
none. Naden's return-type restriction is recorded as future work
(`reviews/plain-beside-generic-judgement.md:74`, `:159`).

- **The static return type.** In FGFV the instance of the dispatched
  declaration is constrained by the call's static return type as well as by
  the ilks, and this is proved sound (pp. 11:7, 11:17, 11:24). That is
  Naden's restriction of 2012-06-15, the instance of a declaration reached
  at run time bounded by the static return type (his note, cited under
  §2.3 in section 3), which item 30 set aside as future work. The paper is its published,
  proved form.
- **A filter, not only a choice of instance.** [R-Method] states the check
  as a condition on which declaration is dispatchable. `literature.md`
  matches that form to the option Naden's journal draft describes, "The
  runtime could be enhanced to include return type constraints when
  considering applicability", and rejects because "programmers can no longer
  understand the execution of a program without static type information"
  (`Papers/Types/journal/justificationOfRTR.tex:251-252`, `:288-289`). The
  paper also keeps the static Return Type Rule. Whether the filter ever skips
  a declaration in a well-typed program, or only picks its instance, is
  **[not read]**.
- **Where the value does not fix the parameter.** The paper diverges from the
  decision's default here.
  - The paper's algorithm "always chooses the intersection of the upper
    bounds" (p. 11:25). That is the greatest admissible instance, with the
    call's static return type among the upper bounds.
  - It reports that the choice the team had assumed, "the union … of the
    lower bounds", and a hybrid could not be proved correct.
  - The decision's default, the least instance, is that assumed choice:
    Welterweight's "most specific instantiation"
    (`Papers/Welterweight/dispatch.tick:67`), which item 30's judgement
    cites.
  - Where the value fixes the parameter (an invariant position), the two
    choices coincide.
  - Our example, by reading and not run: `wrap[\X\](x: X): Box[\X\]` beside
    `wrap(a: Any): Any`, called through `Any` with a `String`. Item 30's
    default gives `Box[\String\]`. The paper's rule, with the upper bounds
    `Any` (declared) and nothing from the static return type `Any`, gives
    `Box[\Any\]`. A `typecase` on the result tells them apart.
  - The exact solving rule (§5.2.3) and its example (§5.2.4) are
    **[not read]**. The difference should reach the coordinator before batch
    7b's rung S writes item 30's sentence.
- **Cost.** "relatively low but nonzero" for invariant cases, and caching or
  recompilation for the variant ones (pp. 11:24-25). This is relevant to
  Pavol's principle of 2026-09-28 that generic code must be fast code a JVM
  can specialise.

### 4.5 The `covariant` keyword (row 404, POSITIONS 2026-09-26)

- FGFV is the formal account of declaration-site variance with both
  modifiers: positions checked by type contexts (pp. 11:11-12) and the
  ancestor rule relaxed by variance (p. 11:11).
- Row 404 records that the compiled checker accepts the 2012 keywords and
  that neither path carries them to run time. The paper says what carrying
  them requires beyond variance-aware subtyping of reified types: "keeping
  track of the static types of method invocations at run time" (p. 11:7).
  That is the static return type at every dispatched call (4.3, 4.4).
- It also records the team's 2012 alternative, dropping contravariance in
  favour of coercion (p. 11:24).
- So the paper is the design reference for worklist item 12 when it is taken
  up. It does not change row 404's standing as future work off the path to
  microGPT.
- Whether FGFV's variance extends beyond type parameters (the sign flags of
  probe `Q3Phantom`) is **[not read]**. The passages speak only of type
  parameters.

### 4.6 `comprises` read on values (item 26, POSITIONS 2026-09-29)

- FGFV has no closed types and no nominal exclusion. The paper says they "can
  be added in an obvious way" (p. 11:25) but gives no argument. So it says
  nothing on reading a `comprises` clause at the level of values or of types.
- Its proof is over a whole program, the visible methods of each class
  (p. 11:11). So the closure caveat item 26 carries (row 487, closed families
  not closed across some component boundaries) has no counterpart in it.
- What it shares with item 26's decision is run-time uniqueness by a
  statically ordered scan. Dispatch walks a most-to-least-specific order
  fixed at compile time and takes the first declaration that fits, relying
  on the Meet Rule's semilattice (p. 11:17, §4.1). Item 26 gives batch 7b's
  rung W the same shape, "the ordered candidate family the proof covers"
  (`explorations/coordinator/PLAN.md`, batch 7b's line on item 26).
- FGFV also has intersection types in its type theory, the typing item 26
  uses for a call whose argument's static type sits between closed traits.
  How FGFV types a call with several incomparable statically applicable
  declarations is **[not read]**.

## 5. To check in the full text

1. The first page: the license line, the page count (28) and the SHA-256 of
   the PDF.
2. §4.1: the formal Return Type Rule, and whether it quantifies over every
   instance (4.3).
3. §5.2.3 and §5.2.4: the solving rule, whether the static return type
   enters as an upper bound, and the worked example (4.4).
4. The syntax: whether calls may write static arguments, and whether trait
   parameters may be F-bounded (4.1, 4.2).
5. §4.1 [Meet-Excl]: which exclusions FGFV has without nominal exclusion
   (objects final, invariant instances), and how a call is typed when several
   incomparable declarations apply statically (4.6).
6. §2.3's `merge` continuation (p. 11:7 onward).

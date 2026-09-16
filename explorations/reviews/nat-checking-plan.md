# Checking `nat` static parameters in the compiler's type checker: a plan

Pavol's question: "Do you know how to implement the nat checking on arrays?
What was the team's initial idea? How to implement it in the spirit they
intended?"

The starting fact, from `explorations/perf-probes/prelude/REPORT.md` (§2,
probe 11): the Scala type checker throws `java.lang.Error: Not yet
implemented` from `STypesUtil.makeInferenceArg` for any `nat`, `int`, `bool`,
`dim` or `unit` static parameter, both when the argument must be inferred
(`pNat1.fss`) and, one step later, when it is written out (`pNat2.fss`,
`ClassCastException: VarType cannot be cast to IntExpr`). The interpreter
runs both. The interpreter's library carries 81 such declarations, C4's array
code 30, and the compiler's own library exactly one, deliberately empty
(`Library/CompilerLibrary.fss:512`).

One correction to the brief: the file is
`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala`
(the `useful` package, not `typechecker`). Line numbers below are from HEAD.

Every claim here cites `file:line`. Where the evidence is thin, the text says
so. Nothing under the historical tree was modified; nothing was run beyond
the probes that already exist.

## (a) What the team intended for `nat` parameters

### The specification

The static-parameter chapter opens with a note that settles the era's status:
"Non-type static parameters and static expressions are not yet supported. The
examples in this chapter are not tested nor run by the interpreter."
(`Specification/basic/trait-parameters.tex:15-17`). The same note heads the
static-expression section: "Static expressions are not yet supported."
(`Specification/basic/expressions/constant.tex:15`). The frozen 1.0 text is
byte-identical for the chapter (`diff` of
`Specification-1.0-frozen/basic/trait-parameters.tex` against the current
one is empty). So the checker's `nyi` is not a regression: the team shipped
the spec with the feature marked unsupported.

What the spec promises, in plain sentences:

- A `nat` parameter is `nat` followed by an identifier; an `int` parameter
  likewise (`trait-parameters.tex:71-81`).
- "These parameters are instantiated at runtime with numeric values."
  (`trait-parameters.tex:82`). The same sentence is repeated for `bool`
  (`:111`). This is the sentence that matters most for the design below: the
  spec's own model of a `nat` is a run-time value, not a compile-time
  constant that the checker must evaluate.
- A `nat` parameter "may be used to instantiate other `nat` parameters, or to
  appear in any context that a variable of type N32 can appear, except that
  it cannot be assigned to" (`trait-parameters.tex:83-86`). So the value
  position is unrestricted (a nat is a read-only `NN32` variable), and the
  type position is restricted to instantiating other nat parameters.
- The chapter's single example is exactly the array shape:
  `makeVector[\T extends Number, nat s0\](): Vector[\T,s0\] = vector[\T,s0\]`
  (`Specification/basic/examples/StatParam.Nat.tex:2`, quoted at
  `trait-parameters.tex:94-97`): one symbol, occurring in the parameter list
  and in the return type, that must agree.
- Static expressions (`constant.tex:17-30`) are the general form: "given
  instantiations of all static parameters in scope of a static expression,
  the value of the static expression can be determined statically." A `nat`
  parameter has type `NaturalStatic` (`constant.tex:95-97`); numeric static
  expressions may be combined with `+ - x / ! MIN MAX sqrt floor ceiling gcd
  lcm sin cos ...` (`constant.tex:123-133`) and compared with `< <= = ...`
  to yield boolean static expressions (`constant.tex:117-121`). Only "a
  restricted subset of operations" may occur as static arguments
  (`constant.tex:23-25`); the subset is never listed.
- `where` clauses may carry a `NatConstraint` (`trait-parameters.tex:296`,
  `:325` "an arithmetic constraint"); the section is marked "out of date"
  (`:287`).
- Type aliases may take nat parameters and pass them through:
  `type SimpleFloat[\nat e, nat s\] = DetailedFloat[\Unity,e,s,false,...\]`
  (`Specification/basic/types-vals-vars.tex:614-618`).
- The type-inference chapter, which the overloading chapter defers to three
  times for "static parameters ... are inferred as described in
  chapref{type-inference}" (`Specification/basic/overloading.tex:174, 206,
  293`), is a stub: "This chapter will include the Fortress static type
  inference mechanism." with two open questions, one of them "Do we want to
  forbid such cases where type inference infers BottomTypes for static
  parameters?" (`Specification/basic/inference.tex:15-26`; frozen copy
  identical). The component-level section only says that api declarations
  get "empty bodies" that inference ignores
  (`Specification/basic/components/type-inference.tex:26-46`). So there is no
  specified inference algorithm for static arguments of any kind, type or
  nat.

### The team's internal design notes

The frozen spec's internal-document appendix records a decision meeting on
nats and overloading (`Specification-1.0-frozen/appendices/internal-document.tex:167-208`).
Three questions, with the recorded answers:

1. `f(x: T[\n+1\], ...)` overloaded with `f(x: T[\0\], ...)` inside
   `trait Foo[\nat n\]` — "now that n+1 is necessarily nonzero, so maybe it's
   okay??? Not allowed." (`:167-182`). The checker is not expected to reason
   about arithmetic on nats, even the trivial `n+1 != 0`.
2. `f(x: T[\1\], ...)` with `f(x: T[\0\], ...)` — "now that nat parameters
   are all instantiated, so maybe it's okay??? Allowed." (`:183-198`). Two
   distinct literals make distinct, mutually exclusive types.
3. `f(x: ZZ32, ...)` with `f(x: T[\0\], ...)` — "if our implementation
   strategy for nat parameters is 'don't instantiate'? Allowed."
   (`:199-208`).

Question 3 is the only place in the tree that names an implementation
strategy for nats, and it is "don't instantiate": the nat is not something
the static side has to compute. The evidence is thin (one clause in a meeting
note), but it agrees with the spec's "instantiated at runtime" and with what
the interpreter does (§c below).

The same appendix decides that trait-parameter overloading gets no help from
the trait body: "The static checker does not take the implicit constraint
from the body of the trait." (`internal-document.tex:164`), and forbids
mutually recursive nat-arithmetic extends clauses (`F[\nat n\] extends
G[\n\]`, `G[\nat n\] extends F[\n+1\]`) "by the type acyclicity restriction"
(`:210-217`).

### The in-repo papers

What each directory is:

- `Papers/Dispatch` — Allen, Hilburn, Kilpatrick, Luchangco, Ryu, Chase,
  Steele, POPL 2011 submission (`Papers/Dispatch/SteelePOPL2011.pdf`,
  `POPL-2011-response.txt`): "Fortress requires that the signatures in every
  overload set form a meet-bounded lattice" and a source-to-source rewrite
  for dispatch (`Papers/Dispatch/abstract.tex:3-40`). On static parameters
  it says: references "may supply explicit static arguments, which may be
  types, boolean values, integers, or operator symbols. However, we do not
  address parametric polymorphism of traits and objects in this paper"
  (`Papers/Dispatch/body.tex:368-372`), and for functions the run-time
  `applicable` test needs "not to explicitly construct or identify types for
  the type parameters, but only to prove their existence"
  (`body.tex:2493-2497`).
- `Papers/Types` — "Type Checking Modular Multiple Dispatch with Parametric
  Polymorphism and Multiple Inheritance", Allen, Hilburn, Kilpatrick,
  Luchangco, Ryu, Chase, Steele (`Papers/Types/paper.tick:213-221`), the
  OOPSLA 2011 paper. It "reduce[s] the problem of handling parametric
  polymorphism to one of determining subtyping relationships among universal
  and existential types" and "has been implemented as part of the
  open-source Fortress compiler" (`Papers/Types/abstract.tick:27-33`). Its
  static parameters are type parameters only: every mention in the source
  is "type parameter" (`Papers/Types/introduction.tick:159-330`,
  `overloading-check.tick:33-34`, `exc-reduction.tick:29-53`); `nat` does
  not occur in any `.tick` file. Left open by the paper: variance
  (`Papers/Types/conclusion.tick:8`). Nothing on non-type parameters, in
  either direction. `research/README.md` does not index this paper (its only
  OOPSLA entry is "Growing a Language", `research/README.md:56`); the
  in-repo source is the primary copy.
- `Papers/Welterweight` — "Welterweight Fortress", the core calculus for
  run-time dispatch with non-erased generics (`Papers/Welterweight/paper.tick:534-559`).
  Its grammar has one kind of static parameter, the type parameter `P`
  with bounds (`Papers/Welterweight/fig-grammar.tick:17-18, 33, 42`). The
  calculus does nothing with nats: they are not in the grammar, the
  inference chapter computes "a substitution sigma (an appropriate assignment
  of types to the type parameters)" (`Papers/Welterweight/inference.tick`,
  first section) and nothing else.
- `Papers/RuntimeInstantiation` — five dated notes (May–July 2012) and a
  write-up on enforcing the return-type rule during run-time instantiation
  of generic functions (`Papers/RuntimeInstantiation/RTRinstantionTheory.tex:56-76`).
  All examples are type parameters. No nats.
- `Papers/Implementation` — the JVM encoding (`TypeMapping.tex`,
  `MethodMapping.tex`). Two facts bear on nats. First, erasure for the
  template name: "mentions of static parameters are replaced with their
  upper bounds in domain and range" (`Papers/Implementation/MethodMapping.tex:134`).
  Second, the generic template's side file records kinds: "A second file
  with suffix `.xlation` contains info about the static parameters,
  including their names, whether they are types, oprs, or nats, and their
  variance relation with the generic type." (`MethodMapping.tex:142`). So
  the codegen design knew nats exist as a kind and planned to carry them
  through the template machinery by name, the way it carries types. The
  static-parameter inference sketch in `MethodMapping.tex:315-326`
  (invariant/covariant/contravariant positions, `asSUPER#N()` accessors)
  is again about types.

### Summary of intent

Put together, the team's position on nats was:

1. Syntax and run-time semantics were settled and implemented: a `nat` is a
   symbol instantiated with a number at run time, usable as a read-only
   `NN32` in expressions (`trait-parameters.tex:82-86`; interpreter, §c).
2. Static checking of nats was declared unsupported in the spec
   (`trait-parameters.tex:15`, `constant.tex:15`), left `nyi` in the checker
   (§b), and kept out of every formal paper: the calculi of Types and
   Welterweight have type parameters only.
3. The one recorded implementation stance is "don't instantiate"
   (`internal-document.tex:206`): the checker treats a nat as opaque. Two
   different literals are different types; arithmetic on nats is not
   something the checker reasons about (`internal-document.tex:182`).
4. The full static-expression language (`constant.tex:123-133`) was a design
   for a future the team never built, and its own text calls the allowed
   subset "restricted" without listing it.

So the "spirit they intended" for a first checker implementation is narrow
and clear: symbols and literals, equality, no arithmetic. That is the
coordinator's "minimum", and it is also what the spec's only example
(`makeVector`) needs.

<!-- Why the compiled path treats an `opr` static parameter differently from a `nat`/`type` one, and how that split entered the tree. Written for Pavol, 2026-09-24, by a delegated worker from a read-only pass over the git history, the specification and the interpreter; nothing was built or run. -->

# Why operators are different, and how that came about

## 1. The commits, in order

The interpreter's operator parameter is the oldest of the three mechanisms.
David Chase (`dr2chase`) opened it within the project's first year:
`1d618873a` "First cut at opr parameters, including tests" (2007-08-14),
after `35a704241`/`b7e67e060` the same week. Its name-substitution
mechanism (§2) was reworked once: `1fefb37c7` "Replaced OprInstantiator
reflection-visitor with a NodeUpdateVisitor" (2008-09-04).

The compiled path's version is a single, continuous effort by the same
author, opened more than four years later and closed in about ten weeks:

- `a5a06c65c` "Some steps towards opr parameters…" (2011-12-08) adds
  `LEFT_HEAVY_ANGLE`/`RIGHT_HEAVY_ANGLE` — "marks Opr parameters in RTTI
  types" — and `oprArgAnnotatedRTTI`, the bracket-name channel, before any
  of the run time's other kind-handling exists.
- `3b7bda65e` "More SMOPing towards opr parameters" (2012-01-13) deletes a
  block of per-kind Unicode dingbats (bool, dim, nat, opr, type, unit) each
  marked "seem to be unused", replacing all six at once with the string
  tags `XL_BOOL`/`XL_INTNAT`/`XL_OPR`/`XL_TYPE`/`XL_UNIT`/`XL_DIM`
  (`Naming.java:212-217`) — `opr` and `intnat` born as siblings, same block.
- `b2fe1437e`, same day, "Refactoring to get opr-static-param data
  available for RTTI class creation".
- `bcf08dae8` "More work in opr parameters, still busted somehow in
  instantiation" (2012-01-18) adds `isOprKind` (`Naming.java:95-109`, in
  the `XlationData` inner class) — the run time's *only* per-kind
  predicate, used to leave `opr` out of the RTTI machinery. No reason is
  given beyond "still busted".
- `49e0373b8` "Working towards instantiating RTTI for opr-parameterized
  types" (2012-01-26) adds `RTTI.java` itself, the abstract descriptor
  class every type's descriptor now extends: the general descriptor
  mechanism was built to make the `opr` case work, and ended up serving
  every other kind too.
- `0b4584c03`/`8af8941d9` (01-27, 01-29) "Closer to…"; `fb32dcc9d`
  "Initial opr parameter test working…" (01-30) closes the run.
  `726d806e0` (01-24, Tristan King) is the one commit by someone else.

**Sizes were not part of this design.** `XL_INTNAT` is a same-commit
sibling of `XL_OPR` (`3b7bda65e`) but gets none of the rest: no
heavy-angle channel, no `isOprKind`-style exclusion, ever. A `nat` static
parameter defaults into the same "every static parameter gets an RTTI
field" treatment as a `type` parameter (`InstantiatingClassloader.java
:1600-1622`) — not a decision made for a size, but the absence of one:
nothing ever carved sizes out the way `opr` was carved out. The size probes
(`perf-probes/nat/size-probes.md`, `runtime.md`) later found this default
wrong for a literal used in value position.

## 2. What an operator parameter is for

The specification says an operator parameter is not a value channel.
`Specification/basic/trait-parameters.tex:173-174`: "Unlike other static
parameters, operator parameters may be used in both type context and value
context" — but "value context" means as the *name* of an operator method
to call directly (`x MYOP y`), never as a value handed to a function.
`:224-226`: "any declarations that may be associated with an actual
operator name that is passed for an operator parameter are *irrelevant* to
the behavior of the operator parameter… the subtrait inherits methods
whose names are the actual operator names instead of the operator
parameter names." An operator argument is a compile-time synonym,
substituted into the declaring trait's own method names at instantiation.

The interpreter matches this, and had since 2007. An operator argument
evaluates to an `FTypeOpr`, a named, memoized `FType`
(`interpreter/evaluator/types/FTypeOpr.java:44-46`) whose `unifyNonVar` is
simply `bug(…, "Unimplemented -- unify opr parameter …")` — never needed,
since unification on an operator never happens. `EvalType.forOpArg`
(`EvalType.java:316-317`) is exactly this: `return
FTypeOpr.make(NodeUtil.nameString(b.getId()));`. Instantiating a generic
with an operator argument, `FTypeGeneric.Factory.make`
(`FTypeGeneric.java:156-180`) pulls every `opr` argument *out* of the
arguments that identify the instantiation, builds a name-to-name map, and
hands it to `OprInstantiaterVisitor` to rewrite the trait/object's own AST,
substituting the actual operator's name throughout the body — the same
idea `oprArgAnnotatedRTTI` re-derives on the compiled path four years
later, from the same author.

By contrast `trait-parameters.tex:83-86` on `nat`/`int`: "These parameters
are instantiated at runtime with numeric values… may be used… to appear in
any context that a variable of type N32 can appear, except that it cannot
be assigned to." A size is specified as a genuine run-time value; an
operator is specified as a compile-time name. They were never meant to be
treated alike — the compiled path's present sameness (both fall into the
RTTI-bearing default) is an accident of what got built, not a reading of
the spec.

## 3. Does the run time ever need an operator as a value?

No site was found, interpreter or compiled path, where an operator
argument is dispatched on, compared, or type-tested at run time. The
compiled path's own comment says as much where it builds a generic RTTI
factory: `InstantiatingClassloader.java:2683`, "Push nulls for opr
parameters in the factory call" — an operator's slot in the RTTI
constructor is filled with a null, because nothing downstream reads it.
Name substitution at stamping — baking the operator's name into the
mangled class/method name, once, at instantiation — is everything the
mechanism does with it, on both paths, in every commit found.

No file in `Papers/`, and no comment longer than a line or two anywhere in
`ProjectFortress/src/com/sun/fortress/runtimeSystem/*.java`, discusses
unifying `opr` with the other kinds or names its RTTI exclusion as a
considered choice; `isOprKind`'s commit message reads as debugging, not
design. `Specification/basic-lib/`'s "big operators" (`BIG SUM`,
`__bigOperator` in `FortressLibrary.fss:1121`) are a reduction syntax over
ordinary operator methods; they do not touch operator static parameters.

## 4. The worker's reading, not a decision

Unifying `opr` with the descriptor-bearing kinds — an RTTI class per
operator, the way design B gives one per `nat` literal — would mean
building a descriptor for something the spec defines as having no run-time
identity beyond its name: a `+$RTTIc` beside `3$RTTIc`, answering
`runtimeSupertypeOf` for a symbol never compared to another symbol at run
time. It looks buildable (an `RTTI` subclass with an unused `javaRep`,
like `VoidRTTI`), but it would add a class per operator literal for a value
nothing reads, undoing `isOprKind` for no measured gain — row 366's own
fix, design A's three `ONLY` lines (FACTS, 2026-09-24), is smaller. The
opposite move, giving `nat` the name-only treatment `opr` has had since
2011, is what design A in the size probes already is — and needs less
machinery than `opr` once did, because a size's use in value position
(`s0.asZZ32`) is the one place the spec asks for a real number, not a name.

Nothing on the microGPT path, and neither library, declares an `opr`
static parameter (established fact, not re-checked here); deferring the
unification question costs nothing. It reads as a ledger row — row 366's
own fix, plus a note that `isOprKind` is the run time's only kind
predicate and that no general "kind of static parameter" abstraction was
ever built on either path — rather than a decision to take now.

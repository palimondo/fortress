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

## (b) How the checker infers static arguments today, at one call site

The call site is probe 11's `pNat1.fss`
(`explorations/perf-probes/prelude/pNat1.fss`):

```fortress
object Box[\nat k\](v: ZZ32) end
unbox[\nat k\](b: Box[\k\]): ZZ32 = b.v
run() = println(unbox(Box[\3\](7)))
```

Step by step, with the file and line where each step happens. Where a step
would behave differently for a type parameter `T`, the text says what `T`
gets, so the gap for `k` is visible.

1. **Parse.** `Box[\3\]` parses to `TraitType(Box, [IntArg(IntBase 3)])`:
   the `StaticArg` rule tries `Op`, then `IntExpr`, then `BoolExpr`, then a
   type (`ProjectFortress/src/com/sun/fortress/parser/MayNewlineHeader.rats:464-478`).
   In the declaration, `Box[\k\]` parses as `TypeArg(VarType k)`: "All Args
   are parsed as TypeArgs"
   (`compiler/disambiguator/TypeDisambiguator.java:663-666`).
2. **Disambiguate.** `forTypeArgOnly` looks `k` up in the static
   environment; if it is a `nat` or `int` parameter the `TypeArg` becomes
   `IntArg(IntRef k)` (`TypeDisambiguator.java:666-697`; the same rewrite
   for explicit arguments at `:402-433`, with the comment "TODO: shouldn't
   there be a NatArg class?" at `:432`). The AST kinds are `IntArg(IntExpr)`
   with `IntExpr ::= IntBase(literal) | IntRef(name) | IntBinaryOp(l, r, op)`
   (`ProjectFortress/astgen/Fortress.ast:1275-1348`). The parameter carries
   `StaticParamKind` `KindNat` (`Fortress.ast:1540-1547, 2103`).
3. **Well-formedness.** `TypeWellFormedChecker` checks each `TraitType`'s
   argument count and, for `TypeArg`s only, the bounds
   (`scala_src/typechecker/TypeWellFormedChecker.scala:98-118`). An
   `IntArg` is accepted unexamined.
4. **Applicability.** At `unbox(...)`, `Functionals.checkApplicable` gets
   the arrow schema `[\nat k\] Box[\k\] -> ZZ32`, first infers lifted
   parameters (none here: `inferLiftedStaticParams`,
   `scala_src/useful/STypesUtil.scala:1024-1044`), then, because the arrow
   still has static parameters, calls `checkApplicableWithInference`
   (`scala_src/typechecker/impls/Functionals.scala:153-165, 170-262`).
5. **Argument type.** `recurOnArgs` builds `argType = Box[\3\]` and calls
   `inferStaticParams(arrow, argType, context)` (`Functionals.scala:224`;
   `STypesUtil.scala:912-931`). The constraint it will build is
   `argType <: dom(arrow')` and, if a context type is known,
   `range(arrow') <: context` (`:916-927`).
6. **Fresh variables.** `inferStaticParamsHelper` maps every static
   parameter through `makeInferenceArg` (`STypesUtil.scala:966`). For
   `KindType` that is `TypeArg(_InferenceVarType)`, for `KindOp` it is
   `OpArg(_InferenceVarOp)`; for `KindNat`, `KindInt`, `KindBool`,
   `KindDim`, `KindUnit` it is `NI.nyi()` (`STypesUtil.scala:546-559`).
   **This is the crash.** For a type parameter the story continues:
7. **Instantiate the schema.** `staticInstantiation(sargs, arrow)` walks the
   arrow replacing each `VarType T` by its argument, and already does the
   same for `IntRef`, `BoolRef`, `DimRef`, `UnitRef` and `OpArg`
   (`STypesUtil.scala:627-679`, the walker at `:666-676`). So
   `Box[\k\] -> ZZ32` would become `Box[\$k\] -> ZZ32` for free, if `$k`
   existed.
8. **Constraint.** `checkSubtype(Box[\3\], Box[\$k\])` reaches
   `TypeAnalyzer.pSub`'s trait case: same constructor, so zip the
   parameters with both argument lists and compare per variance
   (`scala_src/types/TypeAnalyzer.scala:237-258`). Variance +1/-1 casts
   both arguments to `TypeArg` (`:251-254`); variance 0 calls
   `pEqv(StaticArg, StaticArg)` (`:255`). That function is the second
   place nats are unfinished: `(TypeArg, TypeArg)` → type equivalence,
   `(OpArg, OpArg)` → op equivalence, and then, under the comment "Not
   handling all static args properly yet", `(IntArg, IntArg) => pTrue()`
   (`TypeAnalyzer.scala:327-337`). Today any two int arguments are equal.
   Exclusion has the matching hole: "Todo: Handle int, nat, bool args",
   two `IntArg`s never exclude (`TypeAnalyzer.scala:447-451`).
9. **Bounds.** Upper bounds are added for type parameters only
   (`staticParamBoundType`, `STypesUtil.scala:514`, used at `:982-999`).
10. **Solve.** `solve(and(constraint, bounds))` (`STypesUtil.scala:1004`)
    goes to `Formula.solve` (`scala_src/typechecker/Formula.scala:420-460`).
    A constraint is `And(ts: Map[_InferenceVarType, TPrimitive], os:
    Map[_InferenceVarOp, OPrimitive])` (`Formula.scala:50`): per type
    variable, sets of lower/upper/exclusion bounds and their negations
    (`:55`); per op variable, sets of equal and not-equal ops (`:60`).
    Solving first factors out equalities and unifies them as cliques
    (`unify`, `getEquality`, `un`: `Formula.scala:494-560`), then joins
    the remaining lower bounds per type variable (`:441-460`). Ops never
    reach that second stage: "Operators only have equality constraints so
    they should always be solved by unification" (`Formula.scala:441`).
    The op track is built from `oEquivalent(i, o)` / `oNotEquivalent`
    (`Formula.scala:704-707`), emitted by `TypeAnalyzer` when an
    `_InferenceVarOp` meets an op (`TypeAnalyzer.scala:344-346, 793`).
11. **Substitute back.** The solution is a pair of functions
    `(Type => Type, Op => Op)`; the arrow is rewritten and normalized
    (`STypesUtil.scala:1007-1010`) and the static arguments are rebuilt:
    `STypeArg` and `SOpArg` get substituted, `case sarg => sarg` leaves
    anything else untouched (`:1012-1016`). Unbound type variables are
    erased to `BOTTOM` by `killIvars` (`STypesUtil.scala:1920-1923`).
12. **Back at the call.** If `hasInferenceVars(resultArrow)` (which looks
    only for `_InferenceVarType`, `STypesUtil.scala:778-789`) the checker
    reports "not enough context" (`Functionals.scala:240-244`); otherwise
    an `AppCandidate(resultArrow, sargs, ...)` is formed (`:246-251`),
    overloads are ordered by `moreSpecificCandidate`
    (`STypesUtil.scala:1050+`), and the chosen candidate's `sargs` are
    recorded on the reference for the code generator, which mangles an
    `IntArg` into the instantiation name through `Naming.XL_INTNAT`
    (`compiler/NamingCzar.java:1888-1909`).

Explicit static arguments take a shorter path: `staticInstantiationForApp`
substitutes them directly (`Functionals.scala:485-489`,
`STypesUtil.scala:682-720`), with kind matching but no value checking
(`staticArgsMatchStaticParamsForApp`, `:754-778`). That path already works
for `int` (`ProjectFortress/compiler_tests/Compiled1.p.fss:19`,
`Compiled6.af.fss:22-27`, both green today).

The same `inferStaticParamsHelper` is also the engine of the overloading
checker: `TypeSchemaAnalyzer.subUA` and `subEDsolution` call it to decide
whether one generic signature is more specific than another
(`scala_src/types/TypeSchemaAnalyzer.scala:133-142, 187-195`). That is why
the crash appears twice in the prelude probe: once from
`OverloadingChecker.checkMethodOverloading` while checking apis, once from
the call-site inference while checking the component
(`explorations/perf-probes/prelude/REPORT.md` §2).

Two more places consume nat arguments and are worth knowing before touching
anything:

- The checker already synthesizes nat literals: an array literal
  `[1 2 3]` gets the type `Array1[\T, 0, 3\]` with `IntArg` literals
  (`scala_src/typechecker/impls/Misc.scala:816-820, 894-903`), and a
  multi-dimensional pasting demands `IntBase` arguments or signals "Not yet
  implemented." (`Misc.scala:849-851`).
- `ExportChecker` compares an api's and a component's declarations
  structurally; for two `IntArg`s it calls `equalIntExprs`, which is
  `= false` with the comment "Not implemented!"
  (`scala_src/typechecker/ExportChecker.scala:640-648`). Every exported
  signature mentioning `Vector[\T,n\]` would fail the export check once the
  crash is gone. The probes never got that far.

### How the interpreter does it, for comparison

The interpreter has the full behaviour the spec describes. A nat is a
*type* in its lattice: `IntNat extends FTypeNat extends FType`, interned
per value, named `nat 3`
(`interpreter/evaluator/types/IntNat.java`, `FTypeNat.java`). A static
argument is evaluated by `EvalType.forIntArg`: a literal makes an `IntNat`,
an `IntRef` is looked up in the environment, and `IntBinaryOp` computes
`+`, `-` and juxtaposition (`*`); `^` is "not yet implemented"
(`interpreter/evaluator/EvalType.java:431-464`). At a call, argument ilks
are unified against parameter signatures into a bounding map
(`interpreter/evaluator/EvaluatorBase.java:88-176`); when an `IntNat`
meets a static argument, `IntNat.unifyStaticArg` does exactly three things:
a literal must be equal, a symbol is bound (`abm.joinPut(name, this)`),
anything else is a unification error
(`interpreter/evaluator/types/IntNat.java:127-147`). A parameter left
unbound becomes `BottomType.ONLY` (`EvaluatorBase.java:238-240`). So the
interpreter's *checking* of nats at a call is already the minimal design;
only its *instantiation* evaluates arithmetic.

## (c) The minimal design

Nats as symbols and literals; unification by equality; a literal binds a
symbol; no arithmetic in the checker. In the interpreter's terms: port
`IntNat.unifyStaticArg` into the constraint solver, as a third track next
to types and ops.

### Rules

An `IntArg`'s expression is one of: an inference variable (fresh per
inference, the analogue of `_InferenceVarType`), an `IntRef` naming a
static parameter in scope, or an `IntBase` literal. `pEqv(IntArg, IntArg)`
becomes:

| left | right | result |
|---|---|---|
| inference var `$n` | anything `e` | equality constraint `$n = e` (the op track's `oEquivalent`, `Formula.scala:707`, with an int flavour) |
| `IntRef n` | `IntRef n` (same name) | true |
| `IntRef n` | `IntRef m` (different) | false |
| `IntBase 3` | `IntBase 3` | true; different literals false |
| `IntRef n` | `IntBase 3` | false (inside a generic body `Vector[\T,n\]` is not `Vector[\T,3\]`; the team's "don't instantiate", `internal-document.tex:206`) |
| anything with `IntBinaryOp` | anything | false, and the type is rejected earlier as ill-formed (below) |

Unification of the equality track: cliques of `{$n, e1, e2, ...}` must
contain at most one distinct non-variable expression, otherwise `False`.
This is the op track's rule (`Formula.scala:511-520`, `un` at `:551+`)
with structural equality on `IntBase`/`IntRef` instead of `==` on ops.
Negated equalities (`nNotEquivalent`) are needed only because
`Formula.neg` must be total (`Formula.scala:662-680`); they arise from the
exclusion checker, and the minimal design can leave `checkP` as it is
(two `IntArg`s never exclude, `TypeAnalyzer.scala:447-451`), which is the
conservative side: an overload set distinguished only by two nat literals
is rejected as ambiguous rather than accepted. The team wanted that case
allowed (`internal-document.tex:183-198`); it is a follow-up of a few
lines in `checkP` (`(IntBase a, IntBase b)` with `a != b` excludes), not
part of the minimum.

`int` parameters get the same treatment as `nat`; the checker does not
reason about sign, so there is nothing to distinguish. `bool`, `dim` and
`unit` stay out of scope: `makeInferenceArg` should raise a checker error
naming the kind instead of `NI.nyi()` so that a program using them fails
cleanly, but their equality rules are not written here.

A nat left unconstrained after solving (the library's vector products
declare `nat m, nat p` and never use them,
`Library/FortressLibrary.fsi:1508-1523`) is a decision to take:

- (1) default it to the literal `0`, the analogue of `killIvars` erasing
  an unbound type variable to `BOTTOM` (`STypesUtil.scala:1920-1923`) and
  of the interpreter's `BottomType.ONLY` (`EvaluatorBase.java:238-240`);
  the six library declarations keep working unchanged;
- (2) report "cannot infer nat parameter m; write it explicitly", which is
  Rust's rule, and delete the dead parameters from those six declarations
  (an edit under the sealed `Library/`).

This plan proposes (1) for the prototype and (2) as the question for Pavol,
since (2) is the only reason the minimal design would ever touch the
library.

### Representation of the nat inference variable

Two options, and the recommendation differs for the prototype and the real
edit:

- **A. A new AST node** `_InferenceVarInt(Object id)` under `IntExpr`,
  next to `_InferenceVarOp` (`Fortress.ast:1588`) and `_InferenceVarType`
  (`:1061`). Clean, symmetric with the existing two, but it regenerates
  every visitor class (`touch ProjectFortress/astgen/Fortress.ast && ant
  compileAll`, CLAUDE.md), so it cannot live in a classpath shadow.
- **B. An `IntRef` with a reserved name** (`$nat$<n>`, minted like
  `makeFreshName`, `SNodeUtil.scala:196`) recognized by a predicate
  `isNatIvar`. No AST change; `staticInstantiation` already substitutes
  `IntRef`s (`STypesUtil.scala:670`); `alphaRenameTypeSchema` renames by
  name and so leaves it alone (`SNodeUtil.scala:192-203`). The cost is a
  string convention in three or four places.

Prototype with B (§f). For the real edit, A is the shape the codebase
uses for its other two inference variables, and it is the one to propose
to Pavol; B is acceptable if regenerating the AST is judged too heavy for
this step.

### What it touches

Files and functions, in the order a reader would follow them:

| file:line | function | change |
|---|---|---|
| `scala_src/useful/STypesUtil.scala:546-559` | `makeInferenceArg` | `KindNat`, `KindInt` → `IntArg(fresh nat var)`; other `nyi` → checker error |
| `STypesUtil.scala:1012-1016` | `inferStaticParamsHelper`, `resultArgs` | add `case SIntArg(info, lifted, e) => SIntArg(info, lifted, nSub(e))` |
| `STypesUtil.scala:1004` | same, the `solve` call | receive the third substitution |
| `STypesUtil.scala:778-789` | `hasInferenceVars` | also find nat inference variables (else "no context" is never reported and an unsolved `$n` leaks into codegen names) |
| `STypesUtil.scala:1920-1923` | `killIvars` | companion `killNatIvars` (decision (1) above) |
| `scala_src/types/TypeAnalyzer.scala:327-337` | `pEqv(StaticArg, StaticArg)` | the table above; new `pNatEquivalent(i, e)` next to `pEquivalent` (`:793`) |
| `TypeAnalyzer.scala:237-258` | `pSub`, trait case | guard the `asInstanceOf[TypeArg]` casts so a variant nat parameter gives an error, not a `ClassCastException` |
| `scala_src/typechecker/Formula.scala:50` | `And` | third map `ns: Map[NatVar, NPrimitive]` |
| `Formula.scala:60` | new `NPrimitive(pe: Set[IntExpr], ne: Set[IntExpr])` | mirror of `OPrimitive` |
| `Formula.scala:71-97` | `oUnit`, `oEq`, `oSubstitution`, `merge`, `oMerge` | nat twins |
| `Formula.scala:99-160` | `and`, `or` (both flavours) | carry the third map |
| `Formula.scala:270-360` | `reduce` (CFormula) | reduce the nat map as the op map is reduced (`:317-332`) |
| `Formula.scala:420-460` | `solve` / `slv` | return a triple; `assert(ns.isEmpty)` after unification, as for ops (`:441`) |
| `Formula.scala:494-560` | `unify`, `getEquality`, `getCliques`, `un` | nat cliques with structural equality |
| `Formula.scala:623-655` | `cMap` | apply the nat substitution |
| `Formula.scala:662-680` | `neg` | nat branch |
| `Formula.scala:704-707` | `oEquivalent`, `oNotEquivalent` | `nEquivalent`, `nNotEquivalent` |
| `scala_src/typechecker/ExportChecker.scala:648` | `equalIntExprs` | structural equality on `IntBase`/`IntRef`, false on `IntBinaryOp` |
| `scala_src/typechecker/TypeWellFormedChecker.scala:98-118` | `wfStaticArgs` | reject an `IntArg` containing `IntBinaryOp` |

Callers of `Formula.solve`/`unify` that destructure the pair must be
updated for the triple; `grep -rn "solve(\|unify(" scala_src` at edit time
lists them (the ones seen here: `STypesUtil.scala:1004`, and
`TypeSchemaAnalyzer` only through the helper).

Not touched: `staticInstantiation` (already substitutes `IntRef`,
`STypesUtil.scala:670`), `staticArgsMatchStaticParams` (already accepts
`IntArg` for `KindNat`, `:742-747, 767-772`), `KindEnv.getType` (a nat in
value position is already an `INT_LITERAL`,
`scala_src/typechecker/staticenv/KindEnv.scala:64-70`, which is the spec's
"any context a variable of type N32 can appear"), `TypeDisambiguator`,
the parser, `Functionals`, `TypeSchemaAnalyzer`, `NamingCzar`.

### What it deliberately does not handle, and the error it gives

- **Arithmetic in a type.** `Vector[\T, n+1\]`, `Matrix[\T, 2 n, m\]`: the
  well-formedness checker reports
  `Ill-formed type: Vector[\T,n+1\]  Arithmetic on nat static arguments is
  not checked; use a nat parameter or a literal.` at the type's span,
  through the same `error(...)` as the bound violations
  (`TypeWellFormedChecker.scala:111-116`). The interpreter still evaluates
  such types (`EvalType.java:457-463`), so the two paths differ exactly
  here, and only here. Nothing in the interpreter's library, C4's arrays
  or `FlatArrays2` writes arithmetic inside white brackets (census in §d),
  so no known program hits the error.
- **A `where` clause `NatConstraint`** (`trait-parameters.tex:296`): the
  AST has `IntConstraint` (`Fortress.ast:1485-1496`) and the checker
  ignores where clauses ("ToDo: Handle where clauses",
  `STypesUtil.scala:625`); unchanged.
- **`requires {n >= 0}`** (`compiler_tests/Compiled5.z.fss:15`): a
  contract, not a type; unchanged.
- **Exclusion between two literals** (`TypeAnalyzer.scala:447-451`):
  unchanged, conservative; follow-up.
- **`bool`, `dim`, `unit` parameters**: a clean error in place of the
  crash; no rules.
- **Two known bugs outside the checker on the same path**, which the plan
  does not fix but the gate will meet: (i) probe 11's `pNat2.fss` dies in
  `gatherMethods` → `StaticTypeReplacer.replaceIn` with `VarType cannot be
  cast to IntExpr` (`STypesUtil.scala:1530-1543`,
  `compiler/typechecker/StaticTypeReplacer.java:121-141, 221-223`), which
  means somewhere a `TypeArg(VarType k)` for a nat parameter escaped the
  disambiguator's rewrite (`TypeDisambiguator.java:402-433, 663-697`);
  the source is not identified by reading, and the shadow run in §f is
  where to find it (evidence thin). (ii) The code generator throws
  `CompilerError("Only emitting RTTI for types right now")` for an
  `IntArg` in an `extends` clause (`compiler/codegen/CodeGen.java:5752-5776`),
  which C4's `object PView[\nat s, nat r, nat c\](…) extends
  Matrix[\RR64,r,c\]` will hit after the checker passes.

## (d) Size

**Functions changed:** about 24, in 5 Scala files: `STypesUtil.scala` 5,
`TypeAnalyzer.scala` 3, `Formula.scala` about 13 (one case class, one new
primitive, and every function that already has an op branch gets a nat
branch), `ExportChecker.scala` 1, `TypeWellFormedChecker.scala` 1. No Java
file. No AST change under option B; one `Fortress.ast` line plus
regeneration under option A. Roughly 200-300 lines, most of them the
mechanical third track in `Formula.scala`.

**Not-working tests that would turn green:** none. The three catalogues
contain no nat-parameterized program: `not_working_static_tests/` (43
files) has one grep hit and it is a comment about "int literals"
(`OverloadedFunctions.fss:15`); `not_working_compiler_tests/` (10 files)
and `long_term_not_working/` (6 directories) have none. Two of the static
ones mention nat-*typed* arrays (`ArrayElement.fss:16-25`,
`ArrayElements.fss:20-38`: `Array1[\String,0,1\]`,
`Array2[\IntLiteral,0,3,0,3\]`), but they need `Array1`/`Array2` in the
compiler's prelude, which has no array traits at all
(`Library/CompilerLibrary.fss:512` is its only nat-parameterized
declaration; "Array is undefined" ×60 in
`explorations/perf-probes/prelude/REPORT.md` §4). Their README points to a
dead wiki page (`not_working_static_tests/README`). So the nat change
unblocks the library port; it does not by itself flip any catalogued test.

**Tests that must stay green:** the five compiler tests that declare nat or
int parameters and pass today, `Compiled1.ah`, `Compiled1.av`,
`Compiled1.p`, `Compiled5.z`, `Compiled6.af`
(`ProjectFortress/compiler_tests/`). None of them ever *infers* a nat:
`Compiled1.ah` and `Compiled5.z` only declare, `Compiled1.av` uses `n` in
value position, `Compiled1.p` and `Compiled6.af` pass the argument
explicitly. On the interpreter side, 23 of the 381 `tests/*.fss` declare
nat parameters and 11 write literal nat arguments to `Vector`/`Matrix`/
`Array`; they run on a path this plan does not touch.

**Library coverage.** The census, by grep for a nat/int/bool parameter
and, separately, for an operator inside white brackets:

| file | declarations with `nat`/`int`/`bool` params (lines) | arithmetic inside `[\ \]` |
|---|---|---|
| `Library/FortressLibrary.fss` | 92 lines (the REPORT's count of 81 declarations) | 0 |
| `Library/FortressLibrary.fsi` | 60 | 0 |
| `ProjectFortress/LibraryBuiltin/NativeArray.fss` / `.fsi` | 3 / 2 | 0 |
| `ProjectFortress/LibraryBuiltin/NatReflect.fsi` (`N[\nat n\]`) | 1 | 0 |
| `explorations/run-c4/src/FlatArrays.fss` / `.fsi` | 30 / 20 | 0 |
| `explorations/apl/mg/FlatArrays2.fss` / `.fsi` | 27 / 23 | 0 |
| `explorations/run-c4/src/MicroGptFlat.fss`, `FlatData.fss` | 2, 1 | 0 |
| `explorations/apl/mg/MicroGptApl.fss`, `FlatData2.fss` | 2, 1 | 0 |

Every declaration is symbols and literals: `Vector[\T,s0\]`,
`Matrix[\T,s0,s1\]`, `Array1[\T,b0,s0\]`, `array1[\T, nat s0\]():
Array1[\T,0,s0\]`, `mul[\nat s2\](other: Matrix[\T,s1,s2\]):
Matrix[\T,s0,s2\]`, `opr DOT[\T, nat n, nat m, nat p\](Matrix[\T,n,m\],
Matrix[\T,m,p\])` (`Library/FortressLibrary.fsi:1435-1701`). So the
minimal design covers **all 81 and all 30**, with two qualifications: the
six vector products with unused `m`, `p` (`:1508-1523`) depend on the
unbound-nat decision in §c, and the three `subarray[\nat b, nat s, nat
o\](m: ZZ32)` methods (`:1398, 1420, 1448`) can only be called with
explicit static arguments, which is the path that already works.

## (e) The gate

In order, each step on a clean build:

1. `ant testFast` zero failures and `ant testSystem` 382/0/0
   (`explorations/protocol.md` §6), with the five nat compiler tests
   still green.
2. The probes: `pNat1.fss` compiles and runs (prints `7`); `pNat2.fss`
   compiles and runs (this one will also need bug (i) of §c found);
   `pNat3.fss` unchanged. A new probe with a deliberate mismatch,
   `unbox[\4\](Box[\3\](7))`, must be rejected with a type error; one with
   `Box[\k+1\]` must be rejected as ill-formed. Both go in
   `explorations/perf-probes/` next to the existing ones, with `.out`
   files.
3. The not-working catalogues re-run: expected zero change (§d); any
   change is a finding.
4. The `WorldFlip` run of `Library/FortressLibrary.fss` from the prelude
   probe (`explorations/perf-probes/prelude/run-all.sh:28-35`): the
   `makeInferenceArg` crash gone in both `checkApis` and the component;
   the 92 exclusion/hierarchy errors remain and are the next, separate
   problem (`REPORT.md` §2).
5. `explorations/run-c4/src/FlatArrays.fss` and
   `explorations/apl/mg/FlatArrays2.fss` under `WorldFlip`
   (`run-all.sh:44-45`): api and component pass the type checker with no
   nat-related error; whatever DESUGAR and CODEGEN then say (bug (ii) of
   §c first) is the next report.
6. Once the compiler prelude exists (goal 4 in CLAUDE.md), the microGPT
   goldens through the compile path: `MicroGptFlat.fss` with
   `MicroGptFlatCheck` against `explorations/run-c/goldens`, and the APL
   variant, at both pool sizes
   (`explorations/microgpt-run-c-handover.md:24, 42`). This step is
   gated on the prelude, not on this plan.

## (f) Where it is prototyped, and what the real edit would be

**Prototype, no tracked file touched.** The prelude probe already shadows
one Java class: it copies `compiler/StaticChecker.java` into
`explorations/perf-probes/prelude/shadow-src/`, compiles it with `javac
-cp "$CP" -d shadow-classes`, and runs with `-cp
"$P/shadow-classes:$CP:$P"` so the copy wins
(`explorations/perf-probes/prelude/run-all.sh:7, 33-35`;
`$CP` from `./bin/fortress_classpath`). The same works for Scala: copy
`STypesUtil.scala`, `TypeAnalyzer.scala`, `Formula.scala`,
`ExportChecker.scala`, `TypeWellFormedChecker.scala` into
`explorations/perf-probes/nat/shadow-src/`, edit the copies, compile them
with the build's own compiler entry point (`scala.tools.nsc.Main -cp
"$CP" -d shadow-classes <files>`, the way `build.xml` drives scalac,
CLAUDE.md "Toolchain"), and run `java -cp "shadow-classes:$CP"
com.sun.fortress.Shell compile pNat1.fss` and the `WorldFlip` launcher
with the same prefix. Each Scala source produces several class files
(`STypesUtil$`, `Formula$`, the anonymous-function classes); all land in
`shadow-classes` and all shadow their originals, which is what is
wanted. Option B for the inference variable (an `IntRef` with a reserved
name) is what makes this possible without regenerating the AST. The
directory gets the probes of §e step 2, their `.out` files, a `run-all.sh`
and a `REPORT.md`, in the prelude probe's format.

**The real edit under the sealed tree,** file by file, flagged at commit
time as edits to the historical artifact (`protocol.md` §4):

1. `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Formula.scala`:
   the third track (`And`, `NPrimitive`, `and`/`or`/`reduce`/`getEquality`
   /`un`/`cMap`/`neg`/`solve`, `nEquivalent`). The bulk of the diff.
2. `.../scala_src/types/TypeAnalyzer.scala`: `pEqv(StaticArg, StaticArg)`
   and `pNatEquivalent`; the cast guard in `pSub`.
3. `.../scala_src/useful/STypesUtil.scala`: `makeInferenceArg`,
   `inferStaticParamsHelper` (result args, solve triple),
   `hasInferenceVars`, `killNatIvars`.
4. `.../scala_src/typechecker/ExportChecker.scala`: `equalIntExprs`.
5. `.../scala_src/typechecker/TypeWellFormedChecker.scala`: reject
   `IntBinaryOp` in a static argument.
6. Under option A only: `ProjectFortress/astgen/Fortress.ast`, one node
   `_InferenceVarInt(Object id)` under `IntExpr` (`:1315`), then the
   regenerated `nodes/` sources (generated-source churn to be read, not
   waved through, `protocol.md` §4).
7. `explorations/perf-probes/nat/`: the probes and report from the
   prototype, committed as the evidence.

Nothing in `Library/` unless decision (2) of §c is taken.

## (g) Rust, Haskell, and the Fortress spec, where the difference changes a decision

**Rust's stable const generics.** A const parameter `const N: usize` may be
instantiated by a parameter, a literal or a `{ const block }` with no
generic in it; `[T; N + 1]` in a type is the unstable
`generic_const_exprs`. Inference unifies const arguments structurally
from argument types, and an uninferrable one is an error ("type
annotations needed"). That is the design in §c, rule for rule, with one
decision Rust forces and this plan leaves to Pavol: Rust would reject the
library's `DOT[\T, nat n, nat m, nat p\](Vector[\T,n\], Vector[\T,n\])`
for `m` and `p`; the interpreter tolerates it (§c, unbound nat).

**Haskell's type-level naturals.** `GHC.TypeLits` gives kind `Nat`,
literals, `+`/`*`/`^` as type families whose equations GHC solves only
for closed literals (a plugin does the algebra), and a `KnownNat n`
dictionary to reflect `n` to a value. Two things carry over. `KnownNat`
is what Fortress already has in `NatReflect.N[\nat n\].toZZ`
(`ProjectFortress/LibraryBuiltin/NatReflect.fsi`); nothing to decide. And
Haskell shows what "arithmetic in types" costs when done honestly: a
normalizing solver as a plugin. That cost is why this plan draws the line
at symbols and literals and does not promise the spec's algebra
(`constant.tex:123-133`) as a later step of the same shape.

**The Fortress spec.** Its nats differ from both: they are "instantiated at
runtime with numeric values" (`trait-parameters.tex:82`), and the
interpreter does instantiate them and evaluates `+`, `-`, `*` while doing
so (`EvalType.java:457-464`). So a nat is not erased; the code generator
must carry it (it already mangles it into names, `NamingCzar.java:1888-
1909`, and does not yet emit it as run-time type information,
`CodeGen.java:5767`). The decision this changes: the checker's refusal of
arithmetic (§c) is a refusal to *check* it, not a language restriction;
the interpreter keeps computing it, and if the compiled path ever wants
`Vector[\T, n+1\]` the question is codegen's, not the checker's.

# Traits, abstraction, and mathematical refactoring

Astra's present synthesis, grounded in the repository linked from [the investigation](README.md). This is a fresh contribution, not a reconstruction of a lost assistant reply.

## Where Sol's vocabulary helps, and where I would change the method

Sol's [candidate framework](sol-candidate-framework.md) names **abstraction integrity**:

> Does each abstraction hide detail while preserving the structure the reader still needs?

That is the concise connection to Pavol's account of climbing the abstraction ladder. The handoff also discusses **subordination of detail**, attributed there to Iverson, and calls movement from a scalar implementation to structured mathematical objects **abstraction lifting**. A reference implementation can supply a correctness oracle without dictating the representation of the resulting program.

Fortress's `Matrix.rmul` makes that concrete. `A x` suppresses the row traversal, indexing and reduction while retaining a composable linear-map operation. The indexed form brings the coordinate relationship back into view. The abstraction has not destroyed that relationship; its definition makes it recoverable.

I agree with Sol's separation of denotation, representation, program structure, notational grammar, and typography as **questions to diagnose**. I would not enforce “do not optimize them all at once” as a strict sequence. An early render can reveal a semantic ambiguity, as the `x_i`/`x[i]` probe does. A useful symbol can also suggest an abstraction we had not yet exposed in the library. Movement between these layers is part of design.

I would also qualify “refine within the winning family.” Matrix products, indexed normalization, and explicit optimizer state can sensibly coexist. Prematurely picking one family can recreate the anchoring the original experiment was meant to resist. Nor does every minor change need three candidates or fourteen scores. Use alternatives to test a consequential choice, with a named reader task: recognizing a linear map, checking a derivative, checking shapes, diagnosing state, or comparing with the Python oracle.

**Canonical therefore needs a scope.** A conventional formulation for explaining a linear transformation may hide the coordinates needed to verify one gradient component. We can evaluate that tradeoff rather than treating one expression as intrinsically more mathematical. The fresh rendering collision shows why visual resemblance alone is too weak: a recognizable formula must also correspond faithfully to the executable meaning.

## What declaring a trait actually buys here

Pavol is right that Fortress already combines mechanisms that our earlier generic discussion understated. The distinction is between the several kinds of commitment inside that combination.

| Mechanism | Concrete repository example | What it establishes, and what it leaves open |
|---|---|---|
| Nominal participation and operation signatures | `Value extends MultiplicativeRing[\Value\]` in `microgpt2.fss` | Membership in an interface hierarchy and signatures relating operations to the same carrier; not an automatic proof of ring laws |
| Shared executable definitions | `MultiplicativeRing` inherits `AdditiveGroup`; juxtaposition delegates to `TIMES`; binary minus defaults to addition with negation | A concrete implementation connection, stronger than merely giving two operations related names |
| Structural access protocol | `RowLike` combines `Rank1`, `ZeroIndexed`, and `DelegatedIndexed`; `Vec` adds `AdditiveGroup` | Reuse of iteration/indexing structure and algebra on the carrier, rather than a rendering flag |
| Intended algebraic law | Astra's `VSumReduction extends CommutativeMonoidReduction[\V\]` | Supplies reduction operations and permits the inherited `reverse = self` convention; declaration alone does not prove floating-point associativity or equality of AD graph structure |
| Domain-specific nominal distinction | `ProbDist extends RowLike` | A useful name for a probability-vector role; its constructor does not establish nonnegativity and unit sum |
| Executable contracts | `requires`, `ensures … provided …`, `invariant` | Recorded runtime checks of supplied conditions; neither a general static theorem prover nor universal quantification over all inputs |

In [FortressLibrary.fss](../../Library/FortressLibrary.fss), `AdditiveGroup` gives `zero = self - self`, binary subtraction as `self + (-other)`, and unary subtraction in terms of zero and binary subtraction. Its comment requires implementations to define addition and either unary or binary subtraction. The defaults are connected code, not independently magic primitives. Choosing an inconsistent or incomplete implementation can defeat the intended structure.

An F-bound such as `T extends MultiplicativeRing[T]` ties a carrier to its operations. It does not quantify over values to establish associativity, distributivity, inverses, or floating-point error bounds. More expressive proof-oriented systems can carry some such evidence, but one must identify the evidence and checker actually used before calling a particular declaration a verified theorem.

There is also an important observation boundary for our AD scalars. Two computations can yield the same mathematical primal and derivative while constructing different nodes, changing allocation, identity, sharing, traversal order, or accumulated rounding. Claiming a ring structure at one observation level does not make those other observations disappear.

## Type checking as limited proof checking

The useful analogy is: a typing derivation is evidence that an expression satisfies the rules encoded by that type system and environment. Shape parameters can express that a product consumes compatible dimensions and produces a particular shape; interface bounds can demand an operation. This is meaningful mechanical reasoning.

It is too strong to say an ordinary successful typecheck proves that an executable implementation will run successfully and return the declared structure. That conclusion needs additional assumptions about soundness, implementation completeness, termination, exceptions, and foreign/runtime behavior. Laws about values require more than signatures about allowable operations.

This repository makes that boundary unusually visible. [Repo internals](../repo-internals.md) traces the Scala checker and the interpreter path: the normal `walk` path disables the static checking stage, while runtime type objects, bounds, casts, and dispatch still participate. “The interpreter ignores types” is false. “A walk success is proof the Scala typechecker accepted the program” is also false. The closed-`Number` example is a practical consequence.

The ledger records functioning contracts (**118**), a bare-`ensures` desugaring bug with a workaround (**119**), executable test declarations (**120**), and unimplemented `property` declarations (**122**). These are inherited probe results, not fresh reruns here. We should neither erase existing guarantees nor infer a working algebraic verifier from features present only in the specification.

The library even contains distribution machinery (`leftDistribute`, `rightDistribute`, `DistributesOver`) and nested big-operator handling. One `__bigOperator2` path explicitly assumes a composition is the identity without its types guaranteeing that fact. This is evidence of algebra-aware design and a concrete trust boundary, not evidence of a generally verified optimizer.

## Refactorings need named preservation obligations

Fowler's [definition of refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html) centers on changing internal structure while preserving observable behavior. Mathematical equality helps justify such changes, but “observable” must be stated for an executable numerical program.

A useful transformation record is:

**before/after source + intended mathematical law or definition + side conditions + preserved observations + evidence + reader benefit.**

| Candidate move | Justification to inspect | Additional obligation in our implementation |
|---|---|---|
| Indexed row sum ↔ `A x` | Definition of matrix–vector multiplication and this library's `rmul` | Same coordinate domain and element operations; empty cases, accumulation behavior, AD effects if applicable |
| Named transpose helper ↔ postfix `^T` calling that helper | The operator's actual body delegates to the same operation | Parse/precedence and overload resolution; preserve view-versus-copy behavior |
| Tight division ↔ spaced division for layout | Both spellings must parse to the same operations and grouping | Compare actual source and output, then inspect Fortify; not all whitespace changes are harmless |
| Explicit scalar backward rules ↔ matrix pullback | Derivative identities under fixed shape/orientation conventions | Gradient accumulation at shared nodes, parameter keys, graph structure and numerical tolerance |
| Tape ↔ recursively composed pullbacks | Same intended derivative map | Shared-subproblem cost, mutation visibility, identity and evaluation order; ledger **139** measures repeated fan-out cost |
| Concrete vector ↔ array-backed view with Vector interface | Representation relation preserving elements and index domain | Aliasing, writes, lifetime and which operations remain available |

A definition expansion can be justified by inspecting the function body. An algebraic reassociation needs appropriate laws and effect conditions. A representation change needs a relation between states or values, not only an equation between visible entries. A typography change needs a parse/meaning check and a reader check. All can be useful program transformations, but they discharge different obligations.

This also connects to compiler transformations without collapsing the layers. Inlining, loop transformations, lowering and instruction rewrites preserve semantics appropriate to their input/output representations. A readable source refactoring has an extra human objective. A faster lower-level implementation need not be a better explanation, and a better explanatory expression need not require a different execution strategy.

## Finite precision is part of the contract

There are at least three different claims: equality in an ideal mathematical model; identical machine results; and an accepted numerical relationship under stated conditions. A tolerance check on a fixture establishes the third for those observations, not a universally substitutable equality. Error allowances can accumulate across transformations, and an approximation can change a branch decision.

Numerical analysis studies these issues. Type- and analysis-based error tools also exist: the primary paper [Combining Tools for Optimization and Analysis of Floating-Point Computations](https://arxiv.org/abs/1805.02436) combines Herbie's heuristic accuracy-oriented rewrites with Daisy's sound error analysis. This corrects the blanket idea that tools cannot reason about or improve numerical accuracy. It does not imply such machinery exists in Fortress or that an optimizer can always select a globally best precision strategy.

For the transformer, subtracting a row maximum before softmax exponentiation is a concrete example: the ideal normalized probabilities are unchanged, while the finite-precision calculation avoids exponentiating large positive values. That is principally range/overflow control, not switching a float into a higher-precision mode. It still does not eliminate every underflow or rounding issue. Mixed precision and hardware throughput matter when choosing an execution contract; no hardware survey is needed to settle the present notation question.

The shared design space is therefore real: **we are designing executable abstractions, their lawful uses, and how readers see them**. Fortress already supplies substantial machinery. The next step is to make the guarantees and tradeoffs explicit for the actual abstractions we have built, using small transformations as our unit of discussion.

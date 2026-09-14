# Evaluating executable mathematical notation after the Fortress experiments

Astra, 2026-09-11. This revises the evaluation proposal, rather than replacing Sol's original or rewriting earlier experiment records. It builds on [Sol's candidate framework](sol-candidate-framework.md), the [source investigation and executable probe](README.md), and the actual Astra/Fable implementations. Source baseline: `89c6710a309fac243daac2f1d0f3a2075dcdbcbb`. The conclusions below are a proposed framework derived from that evidence, not an established scoring standard or a new independent implementation experiment.

## The change to the starting question

Sol asks which equivalent formulation best combines mathematical conventionality, executable structure, visual clarity, algebraic usefulness and maintainability. I would retain that ambition, but change the unit we evaluate:

**Evaluate a mathematical operation together with its carrier, available interfaces, implementation, and visible notation. Ask what the reader can correctly understand and do through that combination.**

An isolated expression such as `A x` is insufficient evidence. In our programs it might dispatch to the standard matrix implementation, a custom scalar-AD contraction, or a matrix-level differentiable operation. The glyphs can be identical while their shape information, reusable definitions, gradient behavior and execution cost differ.

The central criterion becomes **supported mathematical reasoning**: does the notation suggest relationships that the abstraction actually supports, and does it make the relationships important to this reader easy to recover? Sol's *abstraction integrity* supplies the core idea. Fortress makes us inspect how that integrity is constructed.

## 1. The numerical hierarchy is not a ladder from scalars to matrices

The following is a map of the relevant implemented mechanisms in [FortressLibrary.fss](../../Library/FortressLibrary.fss), not a claim that the whole library realizes a complete abstract-algebra hierarchy.

| Carrier or protocol | Declared structure | Executable definitions supplied | Mathematical reading and boundary |
|---|---|---|---|
| `AdditiveGroup[T]` | An F-bound relating T to its own additive operations | `zero = self - self`; binary minus from addition and negation; unary minus from zero and binary minus | A group-like additive interface. An implementation must supply the primitive operations needed to break the default-definition cycle. The signatures do not themselves prove the group laws. |
| `MultiplicativeRing[T]` | Extends `AdditiveGroup[T]` and `AnyMultiplicativeRing` | Juxtaposition delegates to `TIMES`; one, multiplication and exponentiation are required operations | Adds multiplication on the same carrier. A ring does not generally promise commutative multiplication, division, ordering, square roots or exponentials. Those capabilities need their own definitions/contracts. |
| `Number` | Combines numerical/order traits; closed with `comprises {RR64}` | Many defaults convert through `asFloat`; numerical zero and one | This particular reference-library root is not an unrestricted universe of all mathematical numbers. Extending it can affect both admissibility and whether operations preserve a custom carrier. |
| `Vector[T,n]` | `Array1[T,0,n]` plus `AdditiveGroup[Vector[T,n]]`; **excludes `AnyMultiplicativeRing`** | Coordinatewise addition/negation, scaling, pointwise product, dot product through an indexed sum | Addition stays in the vector carrier. Dot product leaves it and returns T. Pointwise multiplication is a separate operation. |
| `Matrix[T,m,n]` | `Array2[T,0,m,0,n]` plus `AdditiveGroup[Matrix[T,m,n]]`; **excludes `AnyMultiplicativeRing`** | Coordinatewise additive operations, scaling, multiplication, matrix–vector products, transpose view | Addition preserves shape. Composition relates several shapes rather than being a single closed binary operation on every rectangular matrix type. |
| `ActualReduction[R,L]` | Separates result elements R and accumulation representation L | Lift/unlift and distribution interfaces; comments state associativity, identity, and a lift/unlift equation | The reduction object carries more operational information than an ordinary binary function. Its stated invariants are contracts, not automatically proved theorems. |
| `CommutativeMonoidReduction[R]` | Combines a same-carrier reduction with a commutativity marker | Inherits identity lift/unlift; `reverse` returns itself | An empty result and associative, commutative join are the intended laws. This directly supports the generator/big-operator mechanism, without requiring every capability of a numeric scalar. |

The F-bound in `MultiplicativeRing[T]` says that the carrier participating in this interface is the carrier used by its operations. It provides useful structure for checking and dispatch; it is not a proof term for distributivity.

The collection signatures show why “more numerical inheritance” is the wrong score:

| Operation | Shape relationship expressed by the library's types |
|---|---|
| Vector addition | `Vector[T,n] × Vector[T,n] → Vector[T,n]` |
| Vector dot product | `Vector[T,n] × Vector[T,n] → T` |
| Matrix addition | `Matrix[T,m,n] × Matrix[T,m,n] → Matrix[T,m,n]` |
| Matrix multiplication | `Matrix[T,m,n] × Matrix[T,n,p] → Matrix[T,m,p]` |
| Matrix–vector multiplication | `Matrix[T,m,n] × Vector[T,n] → Vector[T,m]` |
| Transpose | `Matrix[T,m,n] → Matrix[T,n,m]` |

Mathematically, vectors over an appropriate scalar field form a vector space; over a ring, a module is the related structure. Rectangular matrices represent maps between such spaces. Square matrices can form a ring under matrix addition and multiplication, usually with noncommutative multiplication. **These mathematical observations do not mean this library declares a `Module` interface or specializes square matrices into its ring hierarchy.** The inspected generic Vector and Matrix traits exclude that ring marker even for square dimensions.

What matters for evaluation is **algebraic fit**: the interface exposes the operations appropriate to the objects and keeps distinct operations distinguishable. Contraction, scalar action, pointwise multiplication and composition should not be conflated merely because all can be written with multiplication-like symbols. Shape signatures are a form of mathematical exposition as well as a possible checking mechanism.

## 2. Inheritance can turn notation into a reusable implementation

In [Fable's microgpt2](../microgpt2.fss), `Value` extends `MultiplicativeRing[Value]` and `StandardMax[Value]`. It implements addition, multiplication and negation on nodes carrying primal values and derivative edges. Consequently:

- Inherited juxtaposition reaches its own `TIMES` implementation, so writing a product constructs the intended differentiable operation.
- Inherited binary subtraction combines its own addition and negation. The relationship between the surface operations is executable, not only a convention in the article.
- `StandardMax` is a separate capability used by the maximum reduction. It does not follow from ring membership. `exp`, `log`, division and square root likewise require additional definitions.

This is stronger than attaching mathematical names to unrelated methods. It also creates obligations. The inherited `zero = self - self` is a computation over these AD objects: it can build graph nodes and retain dependencies even if its mathematical result is zero. Algebraic reuse is valuable without being operationally free.

Fable's `RowLike` supplies indexed/generator access through `Rank1`, `ZeroIndexed` and `DelegatedIndexed`. `Vec` adds additive structure; `ProbDist` reuses access without declaring that it is closed under arbitrary vector addition. This is a good instance of designing the reader's available operations. But `ProbDist`'s constructor does not check positivity or unit sum: its name communicates a role, not a proved simplex invariant.

[Astra's implementation](../astra/worker/main/MicroGPT.fss) makes a different choice. Its scalar `V` and custom Vec/Mat do not inherit that numerical/carrier hierarchy; matrix–vector multiplication is explicitly implemented using an indexed sum. Yet `VSumReduction` does extend `CommutativeMonoidReduction[V]` and plugs into library `Comprehension`. That is genuine semantic reuse at the reduction boundary. It should receive credit for that specific connection, not be called either wholly idiomatic or wholly bespoke.

The implication for an evaluator is to trace **one operation end to end**: visible expression → applicable interface/operator → inherited or local body → element operation → result carrier. Count neither traits nor standard-library calls. Ask whether the abstraction makes related operations agree by construction, where custom code remains, and which assumptions that custom code must satisfy.

## 3. Distinguish the commitment from the evidence for it

A useful review annotates a guarantee with its mechanism and evidence:

| Claim | Possible evidence in this repository |
|---|---|
| “These operations accept and return this carrier/shape” | Declared signatures; separately, static checking if actually used, or observed runtime dispatch/checks |
| “Subtraction is addition with negation” | An inherited method body that defines exactly that relationship |
| “This join is associative/commutative” | A declared algebraic contract, a mathematical argument for the chosen interpretation, or tests; trait membership alone does not settle it |
| “This object represents a probability distribution” | A naming convention, a construction discipline, a checked constructor/contract, or a proof—identify which |
| “This is legal Fortress” | Specification plus implementation-path evidence; interpreter acceptance alone is insufficient |
| “These rewrites preserve the numerical result” | Stated domain, comparison rule and relevant tests or error argument; distinguish exact identity from tolerance |

The [gap ledger](../fortress-gap-ledger.md), claims 22 and 52–53, is decisive here. Standard Vector/Matrix operations work with a user element type under an illegal extension of closed `Number`; the legal unsealed-ring route encounters numeric bounds and casts that block important operations. A pleasing standard-library solution can therefore owe its success to an implementation gap. Conversely, a small custom carrier can be the principled legal alternative. Neither library reuse nor custom code deserves an automatic verdict.

Likewise, [repo internals](../repo-internals.md) records that ordinary interpreter `walk` bypasses the Scala static-checking stage while retaining runtime typing/dispatch. Contracts do work in recorded probes, but `property` declarations do not (ledger 118–122). We should evaluate what the selected execution path enforces, rather than attributing every declared property to an automatic proof verifier.

This is not a reason to discount types. Types express part of the mathematical design, establish usable interfaces, constrain implementations where checked, and make relationships explicit. The evaluation must credit those contributions separately from universal laws that remain trusted.

## 4. Index notation and matrix notation are connected views of operations

The [small running probe](NotationViews.fss) uses the same standard matrix A and vector x for both:

```fortress
y = A x
z = vector[\RR64,2\](fn i => SUM[j <- 0#2] A[i,j] x[j])
```

![Actual Fortify rendering of the probe's declarations and expressions](figures/same-data.png)

Both yield the same two entries in the recorded fixture. More significantly, the standard `rmul` implementation itself constructs the result by an indexed sum. The connection can be inspected at its definition.

This suggests a stronger interpretation of Sol's **abstraction integrity**: a good abstraction allows us to suppress coordinates when treating the map as a unit, and recover the coordinate relationship when checking an element or derivative. We should evaluate the quality of the connection between views, not only choose a prettier view.

There are four different moves hidden inside the word “projection”:

| Move | What changes? | Fortress example |
|---|---|---|
| Typographical presentation | Layout of an expression whose parse/meaning must remain checked | Tight versus spaced division; tight versus spaced access brackets |
| Definition expansion/contraction | Which operation and implementation detail are explicit | `A x` versus its row-sum definition |
| Interface exposure | Which operations a carrier offers without necessarily changing storage | An array view wrapped to restore Vector operations; Run B's matrix exposing rows as differentiable vectors |
| Representation/algorithm change | Objects, sharing, state or execution strategy | Scalar AD nodes versus matrix pullbacks; tape versus recursive propagation; copied transpose versus shared view |

Only the first is principally a rendering change. Fortify operates on written source and does not inspect a type to choose between matrix and index notation. Library design determines which expressions the programmer can choose; rendering determines how the selected spelling appears.

The subscript collision is a hard check on faithful presentation: our running program distinguishes the identifier `x_i` from access `x[i]`, but Fortify renders them alike. A notation convention must avoid or explicitly disambiguate such collisions. Visual similarity to a formula is not enough if distinct executable meanings become indistinguishable in the reader's context.

For each algebraic operation, the ideal correspondence is that interpreting the implementation's result mathematically agrees with applying the intended mathematical operation to the interpreted inputs. This is a claim about a chosen interpretation: for AD objects it might include primal values and derivatives while excluding node identity. Floating-point computation may require an approximate rather than exact correspondence. The chosen exclusions must be legitimate for the task; they cannot silently hide observable mutation or broken gradient accumulation.

## 5. The six evaluation questions

I would keep Sol's fourteen axes as useful descriptive vocabulary, but organize the actual review around six questions. These are not six numbers to add up.

| Question | What a good answer establishes | Why our experience requires it |
|---|---|---|
| **Algebraic fit** | Carriers, shapes and operations match the mathematical objects; promises are no stronger than intended | Vector dot product is not a vector-valued ring multiplication; `MAX` and `exp` do not come free with a ring |
| **Semantic support** | The visible operation connects to reusable, coherent implementations and the required guarantees have identified evidence | Fable's inherited arithmetic, Astra's reduction, and the closed-Number workaround have different strengths and liabilities |
| **Faithful presentation** | Source, typeset form and intended mathematical reading agree without material ambiguity | `x_i` versus `x[i]`; transpose superscript versus actual transpose implementation; real versus merely claimed stacked fractions |
| **Useful abstraction and recoverability** | The reader sees the structure needed for the task and can unfold hidden detail without reverse-engineering the whole system | Matrix product versus coordinates; vector RMSNorm versus full indexed pullback |
| **Compositional reach** | The abstraction works across neighboring kernels and legitimate changes in shape, rather than only one polished formula | A row-vector interface helps both RMSNorm and softmax; a tiny test fixture must not become a hardcoded model limitation |
| **Operational adequacy** | State, sharing, numerical behavior and cost meet the chosen contract | Transpose aliasing; dense diagonal scaling; repeated pullback fan-out; scalar versus matrix AD |

Before comparing presentation quality, establish **admissibility**: the candidate covers the requested domain, runs on the chosen path, meets correctness requirements, and discloses any dependence on implementation gaps. An attractive rendering cannot compensate for failure here. An experimental extension may still be valuable, but label the extension and compare it under the appropriate contract.

After that, state the reader and task. Compare the candidates' benefits and costs without forcing one winner across every kernel. Sol's conventionality, locality, symmetry, economy and typographic hierarchy inform these judgments. Economy should include the supporting machinery and unfamiliar conventions the reader must learn, not just the line being displayed.

## 6. Worked evaluation: row-wise RMS normalization

For a row x of length d, the intended operation is

$$\operatorname{rmsnorm}(x)=\frac{x}{\sqrt{\frac{1}{d}\sum_j x_j^2+\epsilon}}.$$

Keep this mathematical target fixed while comparing representations; do not rewrite the reference formula to flatter the candidate source.

**Run B exposes a differentiable vector as a meaningful unit.** Its actual definitions are:

```fortress
rmsnorm(x: Vec): Vec = x/(SQRT((x DOT x)/(|x|) + epsilon))
rmsnorm(X: Mat): Mat = stack(<| rmsnorm(x) | x <- X |>)
```

The first line mirrors a vector formula. The second exposes an independent operation on each row. This works because its Mat generates differentiable Vec rows and its vector operations have backward rules. The gain is produced by the interface and AD abstraction, not typography alone. See [source](../run-b/src/MicroGPT.fss), [existing Fortify figure](../run-b/figures/v2_rmsnorm.svg).

**Run B2 exposes one differentiable matrix carrier.** Its RMSNorm extracts the primal matrix, computes row scales by indexed reductions, constructs entries, and supplies an explicit matrix pullback. See [source](../run-b2/src/MicroGPT.fss), [existing Fortify figure](../run-b2/figures/def_rmsnorm.svg). This can make individual derivative terms inspectable and gives a compact overall engine, while making the forward row operation less immediate. It does not follow that indexed notation is generally inferior; the coordinate relation is exactly what some derivative checks need.

**A diagonal-matrix alternative also exists.** The [review probe](../run-b2-review-probes/RvwBroadcast.fss) constructs `diag(1/r) X` in its concrete list-comprehension spelling and records agreement with entrywise row scaling. This disproves the claim that indexed construction was the only expressible option. But its dense diagonal carrier and generic matrix multiplication create unnecessary storage and work compared with row scaling. A future diagonal operator with a specialized multiplication could change that cost; this probe does not provide one.

| Candidate | Strongest reader benefit | Actual price or limitation | Provisional conclusion |
|---|---|---|---|
| Vector formula lifted across rows | Recognize the normalization and its independent row structure | Needs a vector-level AD/interface layer with correct gather/scatter and accumulation | Strong choice for teaching the forward computation and reuse across row operations |
| Indexed matrix construction with explicit pullback | Check coordinate dependencies and derivative terms | More visible indices and factory plumbing in the forward definition | Valuable derivative/execution view; may coexist with a higher-level forward presentation |
| Dense diagonal multiplication | Recognize row scaling as linear algebra once r is known | Extra dense storage and multiplication; full RMSNorm remains nonlinear because r depends on X | Useful equivalence witness, not an automatic implementation improvement |

The lesson is not “matrices beat indices” or its reverse. **Expose the semantic unit needed by the operation.** Matrix multiplication is naturally a matrix operation; row normalization naturally includes a vector operation; a derivative may benefit from indices. A coherent library can support all three.

These are judgments from source and existing review/probe evidence. This revision does not claim a fresh benchmark or a fresh visual audit of those older RMSNorm figures. The prior investigation's two small figures and executable remain its separately recorded fresh evidence.

## 7. Refactoring becomes a set of justified moves

For a consequential change, record:

> Before and after; selected mathematical interpretation; definition/law or representation relation; side conditions; preserved observations; evidence; reader benefit; implementation cost.

This distinguishes three levels of confidence often conflated in our discussion:

- **Definitional connection:** expanding an operator's actual body explains why two source forms correspond. Overloads, order and effects still matter.
- **Algebraic connection:** a rewrite such as reassociation needs the relevant law under the chosen interpretation. Floating-point addition and AD graph observations require extra care.
- **Representation connection:** replacing a tape with functional pullbacks requires correspondence of gradients and state behavior, not only similar-looking multiplication formulas. The recorded fan-out cost in ledger 139 is also relevant to the execution contract.

A custom wrapper is justified when it restores useful structure, such as vector operations on a view or differentiable rows on a matrix. An inherited implementation is justified when its defaults respect the carrier's intended interpretation. A new symbol is justified when it exposes a recognizable operation and composes with neighboring conventions. None is good solely because it reduces characters.

## 8. How I would now run a review

Choose one kernel and one reader task. Establish the target domain, mathematical definition and execution requirements. Trace its actual carrier and operation mechanisms. Compare the current form with one alternative that challenges its most consequential assumption; add another only if it reveals a different live tradeoff. Inspect exact source and actual Fortify output, and reuse existing evidence before running a small discriminating probe.

Report a compact judgment under the six questions, with unresolved claims marked. Retain both views when they serve different legitimate tasks. Record a new convention only after seeing whether it composes with another kernel. This is an iterative design practice rather than a fixed search through notation families followed by cosmetic polishing.

For this project, the deliverable should teach both the transformer and the Fortress mechanisms that make its notation executable. A concise core formula plus an accessible explanation of the carrier, operations and guarantees is often better than either exposing every implementation detail inline or hiding the entire mechanism behind unexplained symbols.

## What I would change in my earlier assessment

I would give more weight to **how an abstraction earns its notation**. Fable's traits are not merely conveniences, and Astra's custom carriers are not disqualified simply by being custom. Their merit depends on the mathematical operations they support, what they reuse coherently, what they check or assume, and whether the reader can move between the useful views.

I would stop treating abstraction lifting as necessarily moving upward from indices to matrices. Sometimes the valuable move is exposing rows, naming a parameter family, separating pointwise multiplication from contraction, or unfolding a matrix operation into coordinates. The improvement is a better fit between the reader's reasoning and the program's structure.

Finally, I would evaluate the **connections** as well as the forms: mathematical operation to type signature, signature to implementation, high-level expression to coordinate definition, source to rendering, and representation to execution. A successful executable notation makes those connections easy to trust and economical to inspect. That is the substantive extension I would now make to Sol's framework.

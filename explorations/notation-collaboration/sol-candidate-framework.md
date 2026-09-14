# Executable Mathematical Notation: A Design Framework

## Scope

This framework is for programs whose source language can be rendered or interpreted as mathematical notation. It is intentionally **not tied to any one algorithm, benchmark, or reference implementation**.

The central problem is:

> Given several semantically equivalent programs, which formulation provides the best combination of executable structure, mathematical conventionality, visual clarity, algebraic usefulness, and maintainability?

The goal is not to imitate a particular scalar implementation. A scalar reference may be an operational specification while the best notation uses vectors, matrices, tensors, higher-order functions, comprehensions, or other abstractions that preserve the intended computation at a higher semantic level.

## 1. Separate five design layers

Do not optimize them all at once.

### 1. Denotation
What mathematical/computational object does the program denote?

Examples: a linear map, recurrence, reduction, state transition, tensor contraction, probability distribution, iterative solver.

### 2. Representation
Which semantic objects should exist explicitly in the program?

Examples: scalar vs vector vs matrix vs tensor; sequence vs map; dense matrix vs operator; mutable state vs value transformation; named intermediate vs composition.

This layer is allowed to differ substantially from a pedagogical or low-level reference implementation.

### 3. Program structure
How are those objects composed?

Examples: functions, combinators, maps/folds/scans, comprehensions, modules, traits/types, lexical scope, helper abstractions.

### 4. Notational grammar
How are the semantic operations written?

Examples: juxtaposition, infix operators, subscripts/superscripts, big operators, comprehensions, indexing, function application, named operators.

### 5. Typography / rendering
How does the program appear spatially?

Examples: fractions, alignment, vertical placement, 2-D grouping, matrices, large delimiters, line breaks, visual hierarchy.

A common failure mode is to repair a problem in one layer with tricks in another. Typography should not compensate for a poor semantic decomposition.

## 2. Semantic equivalence vs representational fidelity

A good translation or redesign need not preserve the *representation strategy* of a reference implementation.

For example:
- a scalar loop can legitimately become a vector operation;
- nested loops can become a matrix product or tensor contraction;
- repeated accumulation can become a reduction;
- explicit indexing can become a map or comprehension;
- a low-level state transition can become a higher-level pure operator if the semantics remain equivalent.

The right question is:

> Does the transformed program preserve the intended denotation and relevant operational constraints?

not:

> Does it preserve the original implementation's local structure?

This is **abstraction lifting**, not cosmetic refactoring.

## 3. Avoid local minima by searching notation families

Do not repeatedly polish one expression. Generate candidates from genuinely different notation families:

1. **Index notation** — explicit indices and sums/reductions; strong for elementwise relationships and dimensions.
2. **Linear-algebra notation** — vectors, matrices, products, transposes; strong when the computation is naturally linear or affine.
3. **Tensor notation** — explicit axes and contractions; useful when matrix notation hides important higher-dimensional structure.
4. **Functional/combinator notation** — composition, map, fold, scan, reduce; useful when structural transformation matters more than coordinates.
5. **Operator notation** — named mathematical operators over structured objects; useful when repeated substructure deserves a stable semantic identity.
6. **Algorithmic/state notation** — explicit sequencing/update; appropriate when order, mutation, caching, randomness, or control flow are essential.
7. **Hybrid notation** — mathematical kernels embedded in explicit program structure; often the best answer for real systems.

Compare **families first**, then refine within the winning family.

## 4. Core evaluation axes

Score 0–4 if useful, but do not let a total score hide tradeoffs.

- **Denotational adequacy:** Does the notation directly represent the mathematical/computational object of interest?
- **Conventionality:** Does it exploit conventions the intended reader already knows?
- **Compositionality:** Do locally good pieces combine into globally readable expressions?
- **Abstraction integrity:** Does each abstraction hide detail while preserving the structure the reader still needs?
- **Suggestivity:** Does the form make valid relationships, symmetries, transformations, or generalizations easier to see?
- **Algebraic manipulability:** Can expressions be transformed by recognizable laws?
- **Dimensional/shape legibility:** Can a reader infer domains, codomains, axes, or dimensions without reverse-engineering implementation detail?
- **Symmetry preservation:** If operations are structurally parallel, are they written in visibly parallel ways?
- **Economy:** Does the notation suppress irrelevant detail without suppressing orientation? Optimize for minimum cognitive state, not minimum character count.
- **Locality:** How far must the reader look to understand a symbol, operator, index, or convention?
- **Dual readability:** If there is source text and a rendered view, are both workable?
- **Scalability:** Does the notation remain readable as the program grows?
- **Typographic hierarchy:** Does 2-D layout reveal outer structure before details?
- **Executability/auditability:** Can the mathematical-looking program still be inspected as a program where dependencies, control flow, state, or effects matter?

Prefer **Pareto improvement** over a single weighted score.

## 5. Global coherence beats local elegance

Before polishing details, write a short **notation constitution** for the whole artifact. Decide:

- what counts as scalar, vector, matrix, tensor, sequence, operator;
- how indices are ordered;
- which indices are implicit;
- what superscripts and subscripts mean;
- how functions are named;
- when juxtaposition means multiplication/application;
- how reductions are written;
- how transposes/adjoints are written;
- how dimensions/shapes are exposed;
- how mutation/state is shown;
- how parameters differ visually from values;
- how temporary variables are named;
- which abbreviations are conventional enough to use unexplained.

Then prefer consistency over locally clever exceptions.

## 6. Practical exploration method

For one conceptual unit:

1. Write its semantic statement in prose.
2. Write the most conventional mathematical formulation you know.
3. List the relevant semantic objects and their types/shapes.
4. Produce at least three representations from different notation families.
5. Reject any form that obscures an essential operational constraint.
6. Compare candidates using the evaluation axes.
7. Prefer Pareto improvements over aggregate scores.
8. Integrate the best candidate into a larger surrounding fragment.
9. Re-evaluate for compositionality and global consistency.
10. Record any new convention in the notation constitution.

Do not optimize an isolated fragment indefinitely.

## 7. Questions that expose a bad local minimum

- Am I preserving a low-level representation that no longer deserves to exist?
- Am I choosing notation because the language can render it rather than because the mathematics wants it?
- Would a domain expert write this object this way on paper?
- Does this formulation expose a law, symmetry, invariant, or decomposition?
- If I changed dimensions or generalized the algorithm, would this notation survive?
- Is a custom operator carrying real semantic structure or merely saving characters?
- Is an index encoding structure that should instead be represented by a type or lexical scope?
- Is a helper function subordinating detail or breaking apart a recognizable equation?
- Is the rendered form locally beautiful but globally inconsistent?
- Is the program readable only because I already know what it is supposed to mean?

## 8. Failure modes

- **Mathematical cosplay:** familiar glyphs without the semantic expectations attached to them.
- **Scalar fossilization:** preserving scalar implementation structure when the natural semantic object is a vector, matrix, tensor, or operator.
- **Vectorization by typography:** making code look vectorized without introducing the corresponding semantic abstraction.
- **Operator proliferation:** too many custom symbols, creating a private dialect.
- **Index explosion:** encoding every semantic dimension as a subscript instead of using types, scope, or structured objects.
- **Abstraction fragmentation:** naming every intermediate until a familiar mathematical relation disappears.
- **Compression pathology:** removing context because the shorter expression looks elegant.
- **Rendering dependence:** source becomes unintelligible unless rendered.
- **Source dependence:** rendering adds no useful mathematical structure and is merely decorative.
- **Local-optimum notation:** a choice is elegant for one line but prevents a coherent notation system across the program.

## 9. Compact review prompt

```text
Review this program as an instance of executable mathematical notation.

Do not compare it mechanically to the local structure of a reference implementation.
Semantic equivalence may legitimately be achieved through abstraction lifting:
scalar -> vector/matrix/tensor, loops -> reductions, explicit indexing -> higher-order
or algebraic structure.

First identify:
1. the denotation of the fragment;
2. the semantic objects and their types/shapes;
3. the current notation family;
4. at least two plausible alternative notation families.

Then evaluate:
- denotational adequacy
- mathematical conventionality
- compositionality
- abstraction integrity
- suggestivity
- algebraic manipulability
- dimensional/shape legibility
- symmetry preservation
- economy
- locality
- source/render dual readability
- scalability
- typographic hierarchy
- executability/auditability

Prefer Pareto improvements. Do not optimize only character count, mathematical
appearance, or similarity to the reference source.

Check global consistency with the notation conventions used elsewhere in the program.
Call out any local choice that would create a bad global precedent.
```

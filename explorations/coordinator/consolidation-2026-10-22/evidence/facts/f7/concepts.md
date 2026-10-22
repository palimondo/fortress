<!-- Concepts that the FACTS clarity pass's chunk f7 (F-90, F-220, F-225, F-226, F-227), after its fix round, uses and that every worker needs, each with the entries that use it and where it should be defined: input for the worker skill's orientation. -->

# Concepts for every worker, chunk f7

The entries name these concepts without defining them, since other entries use them too. Each belongs in the `fortress-repo` skill, not in the revival part that is being rewritten.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| The distance, the checker count | F-90, F-220, F-225; also F-53 | `references/compiler.md` | Chunk f0's `concepts.md` defines the distance, and chunk f5's the count stage. F-53 holds both values and the distance's site list. |
| The interpreter's library | F-90, F-220 | `fortress-repo` core | Chunk f6's `concepts.md` defines it. |
| `Vector`, `Matrix` and the array family's bound | F-90; also F-151, F-264 | `references/library.md` | Chunk f0's `concepts.md` defines the family; F-151 owns the bound. |
| A closed trait | F-227; also F-76, F-151 | `fortress-repo` core, beside `comprises` | Chunk f0's `concepts.md` defines it. F-227 adds what the checker does with one: it replaces a closed trait in an intersection by those of its listed types that no other conjunct excludes, only where the excluding conjunct names no type or inference variable. |
| A self-typed trait, an F-bound | F-225; also P-146 | `fortress-repo` core, "Traits and objects, no classes" | A trait `C[\X\]` whose parameter `X` extends `C[\X\]`, such as `Integral[\I extends Integral[\I\]\]`; the bound `X extends C[\X\]` is its F-bound. In the compiled checker, `self` in its bodies is `C[\X\] & X`. The checker also reads a parameter bounded by a self-typed trait that the trait extends at it, as the `Containment` mixins are; that is a default under review (review-queue item 212). Library traits such as `StandardTotalOrder` are written this way, so a worker who reads `self` in their bodies needs it. |
| A ground type, ground bound | F-227; also P-60 | `references/compiler.md` | A type that holds no type variable, such as `G[\ZZ32\]`. P-60 uses it too. |
| Renaming apart | F-226; also F-43, F-87 | `references/compiler.md`, beside the checker's inference | Giving a method's own static parameters fresh names before they meet the names of its trait or its caller, so that a parameter `R` of the method is not captured by a parameter `R` of the trait. The checker prints the fresh names as `name$i`. |
| Big operators, `__bigOperator` | F-220; also F-228, F-85, F-144 | `references/library.md` | The library function to which a reduction or a comprehension such as `SUM[i <- 1:n] f(i)` desugars, with its reduction and its body. |
| The parallel `do … also do … end` block | F-90 | `fortress-repo` core, "Parallelism and mutable state" | A block whose parts run in parallel; each part must have type `()`, and so has the whole block (`Specification/basic/expressions/also.tex`, "Parallel Do Expressions"). That section of the core lists the loop, the tuple and the arguments as parallel parts, but not this block. |
| The range forms, and which are generators | F-90; also F-82, row 661 | `references/library.md`, beside "Scalar ranges are over `ZZ32` only" | `a:b`, `a#n`, the strided `a:b:c` and `.reverse`. The strided form is declared `Range[\ZZ32\]`, which extends no `Generator`, so the compiled checker refuses `seq(a:b:c)`; a `#` range and its `.reverse` are generators (row 661). |
| A `comprises` clause that lists only `...` | F-225; also F-64 | `fortress-repo` core, "Traits and objects, no classes", beside `comprises {A, B}` | An open list: the trait's extenders are not closed, so the trait is not a closed trait. It may stand only in an api (`Specification/basic/traits.tex`). |
| An inference variable | F-227; also F-232, F-235 | `references/compiler.md`, beside the checker's inference | The checker's placeholder for a static argument that it infers at a call. It is defined today only in the revival part (`references/revival-changes.md`), which is being replaced. |

Concepts that only one entry uses are defined in it: the three array objects that F-90 names, and the normal form's two functions (F-227).

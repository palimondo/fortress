<!-- Concepts that the FACTS clarity pass's chunk f7 (F-90, F-220, F-225, F-226, F-227) uses and that every worker needs, each with the entries that use it and where it should be defined: input for the worker skill's orientation. -->

# Concepts for every worker, chunk f7

The entries name these concepts without defining them, since other entries use them too. Each belongs in the `fortress-repo` skill, not in the revival part that is being rewritten.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| The distance, the checker count | F-90, F-220, F-225; also F-53 | `references/compiler.md` | Chunk f0's `concepts.md` defines the distance, and chunk f5's the count stage. F-53 holds both values and the distance's site list. |
| The interpreter's library | F-90, F-220 | `fortress-repo` core | Chunk f6's `concepts.md` defines it. |
| `Vector`, `Matrix` and the array family's bound | F-90; also F-151, F-264 | `references/library.md` | Chunk f0's `concepts.md` defines the family; F-151 owns the bound. |
| A closed trait | F-227; also F-76, F-151 | `fortress-repo` core, beside `comprises` | Chunk f0's `concepts.md` defines it. F-227 adds what the checker does with one: it replaces a closed trait in an intersection by its listed types, only where the other conjunct names no type variable. |
| A self-typed trait, an F-bound | F-225; also P-146 | `fortress-repo` core, "Traits and objects, no classes" | A trait `C[\X\]` whose parameter `X` extends `C[\X\]`, such as `Integral[\I extends Integral[\I\]\]`; the bound `X extends C[\X\]` is its F-bound. In the compiled checker, `self` in its bodies is also an `X`. Library traits such as `StandardTotalOrder` are written this way, so a worker who reads `self` in their bodies needs it. |
| A ground type, ground bound | F-227; also P-60 | `references/compiler.md` | A type that holds no type variable, such as `G[\ZZ32\]`. P-60 uses it too. |
| Renaming apart | F-226; also F-43, F-87 | `references/compiler.md`, beside the checker's inference | Giving a method's own static parameters fresh names before they meet the names of its trait or its caller, so that a parameter `R` of the method is not captured by a parameter `R` of the trait. The checker prints the fresh names as `name$i`. |
| Big operators, `__bigOperator` | F-220; also F-228, F-85, F-144 | `references/library.md` | The library function to which a reduction or a comprehension such as `SUM[i <- 1:n] f(i)` desugars, with its reduction and its body. |

Concepts that only one entry uses are defined in it: the default vector and matrix objects (F-90) and the normal form's two functions (F-227).

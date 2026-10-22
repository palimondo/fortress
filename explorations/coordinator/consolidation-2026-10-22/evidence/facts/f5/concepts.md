<!-- Concepts that the FACTS clarity pass's chunk f5 (F-64 to F-75, without F-68) uses and that every worker needs, each with the entries that use it and where it should be defined: input for the worker skill's orientation. -->

# Concepts for every worker, chunk f5

The entries name these concepts without defining them, since other entries use them too. Each belongs in the `fortress-repo` skill, not in the revival part that is being rewritten.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| The distance stage and the count stage | F-65, F-66, F-75; also F-53 | `references/compiler.md` | Chunk f0's `concepts.md` defines the distance. The count stage stops at each component's first error; its table is `gate/checker-count.txt`, with a 900-second limit (`checker-count/run.sh`). F-53 holds both current values. |
| A size, and the kinds of static parameter | F-67, F-69; also F-20, F-61, F-146, P-40 | `fortress-repo` core, beside generics | A static parameter is a type, or a `nat`, `int`, `bool`, `dim` or `unit` value. A size is a `nat` parameter, as in an array's length. The compiled checker checks `nat` and `int` and infers them at a call; it does not infer the other three. |
| An arm of an overload set | F-69; also F-68, P-40 | `fortress-repo` core, beside multiple dispatch | One declaration of an overloaded name, as the record calls it. |
| The interpreter's library, the compiled library | F-70, the new entry, F-75 | `fortress-repo` core | Chunk f6's `concepts.md` defines both. |
| A result-only type parameter | the new entry; also F-84, F-78, P-48 | `references/compiler.md` | Chunk f6's `concepts.md` defines it. |
| Walk's numeral, `IntLiteral` | F-73, F-74; also F-79, F-262, F-263, P-76 | `fortress-repo` core, "Numbers are siblings, not a tower" | Chunk f0's `concepts.md` defines it. F-74 now gives walk's numeral by width, `ZZ32`, `ZZ64` or `ZZ`, with walk's class names `Int`, `Long` and `BigNum`. The definition should give both, so that a reader of walk's messages recognises `Int`. |
| Coercion | F-73; also P-74, F-51 | `fortress-repo` core, beside numbers | A conversion that a type declares with `coerce`, which the checker may insert at a call. A declaration applicable only with coercion ranks below one applicable without it. |
| A default waiting for review, the review queue | F-73, F-75 | The short orientation that replaces the revival part | Chunk f0's `concepts.md` defines PLAN items and the review queue. An entry that cites a review-queue item states a choice built at a default, not the curator's ruling. |
| Phase 3's road, parked rows | F-72 | The short orientation | `PLAN.md` lists the rows on phase 3's road with no batch named, and the rows "Off the path, parked", which no batch will take up unless the curator decides. |

Concepts that only one entry uses are defined in it: the stale shadow (F-66), the three `typecase` forms (F-71) and the positional rule (F-75).

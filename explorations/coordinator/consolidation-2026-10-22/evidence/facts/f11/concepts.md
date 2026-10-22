<!-- Concepts that the FACTS clarity pass's chunk f11 (F-118, F-119, F-121 to F-125, F-128 to F-130, and the two new entries) uses and that every worker needs, each with the entries that use it and where it should be defined: input for the worker skill's orientation. -->

# Concepts for every worker, chunk f11

The entries name these concepts without defining them, since other entries use them too. Each belongs in the `fortress-repo` skill, not in the revival part that is being rewritten. The skill already defines walk, the compiled path, the gate and a gated test. Chunks f9 and f10 list the gap ledger, an `XXX` test, the suites, a `where` clause in a `comprises` list, and opening a listed type's variable; F-121 uses the last two.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| Compiler prelude | F-118, F-125, F-129, F-130; also F-126, F-132 | `references/compiler.md` | The compiled path's own small library, `ProjectFortress/LibraryBuiltin/` and `Library/Compiler*.fss`, used until the switch-over; it is not the interpreter's library and lacks some of its declarations. |
| `IntLiteral` | F-118; also F-57, F-151, F-263 | `fortress-repo` core, numbers | The type of an integer numeral before it takes a declared type. |
| Fixed widths, `ZZ` | F-124, F-125, F-?1; also F-132, P-69, P-73 | `fortress-repo` core, numbers | `ZZ32`, `ZZ64`, `NN32` and `NN64` are the fixed-width integer types; `ZZ` is the unbounded integers. |
| The two families of shift | F-124, F-125; also F-130, P-69 | `references/library.md`, numbers | `LSHIFT` and `RSHIFT` are the shifts that P-69 defines at every count; `<<`, `>>` and `<<<` are a separate family with their own rules. How the two families differ must be read in the library before it is written. |
| `narrow` and `widen` | F-124, F-130; also P-69 | `references/library.md`, numbers | The conversions between integer types of two widths. F-124 gives `narrow` from 64 to 32 bits as keeping the low 32 bits; `widen`'s target type must be read in the library before it is written. |
| Cold cache, warm cache | F-119, F-?2; also F-101, F-113 | `references/tests-running.md` | Walk keeps parsed and checked components in a cache; a cold run starts from an empty one. For walk's check of a program's operators against the library's, the entry that matters is the library's parsed-cache entry (gap-ledger row 342): the check runs only when walk analyses the library again. A test of that check runs from an empty cache. |
| Run-time descriptor of a type or size | F-129; also P-41, F-36, F-135 | `references/compiler.md` (the run time) | The object that carries a static argument at run time on the compiled path and answers run-time subtype tests. |
| Coercion | F-128; also P-59 | `fortress-repo` core | A conversion that a type declares with `coerce`, applied at a type check when the value's type does not fit. |
| Tuple and arrow coercion | F-128 (added by the judge, from the second cold read) | `fortress-repo` core, beside coercion | The specification's two derived coercions (`Specification/basic/conversions-coercions.tex`, "Coercions for Tuple and Arrow Types"): a tuple converts element by element, with its own conditions on a varargs element and on keyword elements; a function value converts to another arrow type. |
| C4 | F-?2; also the model program | defined: the `fortress-repo` core's "model program" | The entry names C4's former pair; the core defines C4 as the flat microGPT program. |

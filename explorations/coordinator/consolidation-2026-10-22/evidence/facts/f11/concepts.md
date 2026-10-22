<!-- Concepts that the FACTS clarity pass's chunk f11 (F-118, F-119, F-121 to F-125, F-128 to F-130, and the two new entries) uses and that every worker needs, each with the entries that use it and where it should be defined: input for the worker skill's orientation. -->

# Concepts for every worker, chunk f11

The entries name these concepts without defining them, since other entries use them too. Each belongs in the `fortress-repo` skill, not in the revival part that is being rewritten. The skill already defines walk, the compiled path, the gate and a gated test. Chunks f9 and f10 list the gap ledger, an `XXX` test, the suites, `where` clauses and opening a listed type's variable.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| Compiler prelude | F-118, F-125, F-129, F-130; also F-126, F-132 | `references/compiler.md` | The compiled path's own small library, `ProjectFortress/LibraryBuiltin/` and `Library/Compiler*.fss`, used until the switch-over; it is not the interpreter's library and lacks some of its declarations. |
| `IntLiteral` | F-118; also F-57, F-151, F-263 | `fortress-repo` core, numbers | The compiled checker's type of an integer numeral before it takes a declared type. |
| Fixed widths, `ZZ` | F-124, F-125, F-?1; also F-132, P-69, P-73 | `fortress-repo` core, numbers | `ZZ32`, `ZZ64`, `NN32` and `NN64` are the fixed-width integer types; `ZZ` is the unbounded integers. |
| Cold cache, warm cache | F-119, F-?2; also F-101, F-113 | `references/tests-running.md` | Walk keeps parsed and checked components in a cache; a cold run starts from an empty one. Some checks run only on a cold cache, so a test of them runs from an empty cache. |
| Run-time descriptor of a type or size | F-129; also P-41, F-36, F-135 | `references/compiler.md` (the run time) | The object that carries a static argument at run time on the compiled path and answers run-time subtype tests. |
| Coercion | F-128; also P-59 | `fortress-repo` core | A conversion that a type declares with `coerce`, applied at a type check when the value's type does not fit. |
| C4 | F-?2; also the model program | defined: the `fortress-repo` core's "model program" | The entry names C4's pair; the core defines C4 as the flat microGPT program. |

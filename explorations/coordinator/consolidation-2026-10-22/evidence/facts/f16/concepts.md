<!-- Concepts that the FACTS clarity pass's chunk f16 uses and that every worker needs, each with the entries that use it and where it should be defined: input for the worker skill's orientation. -->

# Concepts for every worker, chunk f16

The entries name these concepts without a full definition, since other entries use them too. Each belongs in the `fortress-repo` skill, not in the revival part that is being rewritten.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| Appendix I and the specification's callouts | F-173, F-174, F-175, F-?1 | `references/specification.md`, or the core's part on the specification | Appendix I (`Specification/appendices/changes.tex`) records each change that the revival made to the text, with its change, rationale, original text and effect. A callout (`\revision`) in a chapter states where an implementation departs from the text, with its gap-ledger row. |
| The type group's papers | F-173, F-174, F-?1, F-223; also P-26, P-45, P-48 | `fortress-repo` core, beside the specification | The overloading papers in `Papers/`: OOPSLA 2011 (overloading with static parameters, its three rules) and POPL 2019 (the dispatcher that instantiates a generic declaration at run time). |
| The three overloading rules: No Duplicates, Return Type, Meet | F-174, F-175, F-223 | `fortress-repo` core, beside overloading | Already listed by chunk f14's `concepts.md`. |
| Closed trait, and covering | F-175 | `fortress-repo` core, beside `comprises` | Already listed by chunk f0's `concepts.md` (a closed trait). Covering: a type covers another when every value of the second is a value of the first (P-60). |
| Native binding, helper, and `builtinPrimitive` | F-180; also P-58, F-32 | `references/library.md` or `references/compiler.md` | A native binding is a library body that calls Java. Walk binds it through a glue class named in `builtinPrimitive("…")`. The compiled path calls static helpers in `nativeHelpers/`. P-58 is to make one form serve both. |
| The compiler prelude | F-173, F-180, F-183 | `references/compiler.md` | The compiled path's own standard library, `CompilerBuiltin` and `CompilerLibrary`, which it links in place of the interpreter's library until the switch-over. |

Concepts that only one entry uses are defined in it: the naked-`Any` rule and the positional restriction (F-174), `NatParam` (F-181), `ZZ32Vector` and `StringVector` (F-183).

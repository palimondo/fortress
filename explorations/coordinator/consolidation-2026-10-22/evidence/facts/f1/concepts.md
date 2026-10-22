<!-- Concepts that the FACTS clarity pass's chunk f1 (F-7, F-12, F-18, F-19, F-20, F-21, F-22) uses and that every worker needs, each with the entries that use it and where it should be defined: input for the worker skill's orientation. -->

# Concepts for every worker, chunk f1

Each concept belongs in the `fortress-repo` skill, not in the revival part that is being rewritten. The skill already defines walk, the compiled path, an instantiation's class and a size's descriptor ("The compiled run time"), the phases ("How a program runs"), and the work-stealing pool ("Parallelism and mutable state").

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| Gap-ledger row | every entry ("row 320") | `fortress-repo` core, where it names the gap ledger (also listed by chunk f2) | "Row N" is the row of `explorations/fortress-gap-ledger.md` with that number; `facts-extract.sh ledger:N` prints it. |
| Size | F-20, F-18; also F-40, F-67, F-129 | `fortress-repo` core, beside the descriptor (also listed by chunk f2) | A `nat` or `int` static parameter, such as an array's length in its type (P-40 defines it). |
| Compiler's prelude | F-12; also F-11 | `fortress-repo` core, "How a program runs" (also listed by chunk f2) | The three files of the compiled path's own library, which `fortress compile` uses today and which the switch-over deletes. The entry names `countedseqloop`, its lowering of a `for` loop. |
| Linker's component repository | F-22 | `references/compiler.md`, beside `fortress link` | The persisted map that `fortress link` and walk read to find the component that implements an api (`linker/Linker.java`, `GraphRepository`). It is not the git repository. Today it falls back to the api's own name. |
| Working Draft | F-21; also F-167 and the specification entries | `references/specification.md`, or the core's line on `Specification/` | The specification of February 2011, kept as `Specification-1.0-frozen/`; `Specification/` is the revival's edited copy. |
| Instantiation exclusion | F-21; also F-167, P-97 | the same place | The specification's rule that no type extends two different instantiations of one generic trait (P-40, P-97). |

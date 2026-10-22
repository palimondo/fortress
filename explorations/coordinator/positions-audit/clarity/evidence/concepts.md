<!-- Concepts that the clarity pass's POSITIONS entries use and that every worker needs, each with the entries that use it and where it should be defined: input for the rewrite of the fortress-repo skill's revival part. -->

# Concepts for every worker

The clarity pass defines a concept inside an entry only when that entry alone uses it. Each concept below is used by several entries or by the skill's parts, so it belongs in the skill, and the entries name it without explaining it.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| microGPT's two programs, and the label C4 | P-29, P-30, P-45 | `fortress-repo` core, beside "the model program, microGPT" | The flat program, C4, in `explorations/run-c4/src/` (`MicroGptFlat*.fss`), and the APL-style program (`MicroGptApl*.fss`). `interpreter.md` and `gate.md` name the files and "the two microGPT programs", and no part gives the label C4. |
| The compiled checker's attempts at a call | P-46, P-49, P-51 | `references/compiler.md` | The checker tries a call without the expected type, then with it, and with coercion only after; it keeps the first attempt that succeeds (P-49). |
| The array design | P-40 | `references/compiler.md` | The compiled path's design for arrays: unboxed `double[]` storage, sizes in the type, a length check where a JVM array is created. It is built in PLAN's phase 5. `compiler.md` already points to the two POSITIONS entries on arrays. |

Concepts that the check found missing but that only one entry uses are defined in that entry: walk's old requirement that some parameter pair exclude (P-45), `widens` (P-74), and the conformance rule for self-typed traits (P-146).

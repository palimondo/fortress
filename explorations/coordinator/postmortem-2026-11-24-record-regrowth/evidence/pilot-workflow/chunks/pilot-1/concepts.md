<!-- Concepts that the FACTS clarity pass's chunk pilot-1 uses without defining, since other entries use them too, each with the entries that use it and where it should be defined for every worker. -->

# Concepts for every worker, chunk pilot-1

The `fortress-repo` skill's glossary already defines walk, the compiled path, the one library, a component, an api, the base, the gate and the harness. Those are not listed. The revival part is being rewritten, so no definition here leans on it.

| Term | Entries | Where to define it | What the definition needs |
|---|---|---|---|
| gap ledger, "row N" | F-374, F-351, F-279, F-157, F-286, F-297 | `fortress-repo` core | The file `explorations/fortress-gap-ledger.md`; one row per known gap between the tree and the specification; "row N" in an entry always names a row there. |
| checker-count stage, distance stage | F-240, F-111, F-286, F-297 | `fortress-repo` core, with the gate | What each stage runs (the compiled checker over the interpreter's library) and what each counts. Where each gate keeps its output (`gate/checker-count.txt`, `gate/distance.txt`). |
| the distance stage's per-site list | F-286, F-297 (the cold reader could not resolve it) | the area part on the gate (`gate.md`) | The list of each error by site that the stage writes; a test that a site stays off it. |
| test corpora | F-111, F-102, F-383 | `fortress-repo` core, or `tests-writing.md` | `ProjectFortress/tests/` (walk's), `compiler_tests/` and `library_tests/` (the compiled path's), and what drives each. |
| `XXX` test, `.test` file, `load_` keys | F-102, F-383 | `tests-writing.md` | An `XXX` name marks a must-fail test; a `.test` file drives a program and states its expected output; the `load_` keys expect a refusal at load. |
| refusal at load | F-102, F-383 | `tests-writing.md` | Walk refuses a program before it runs; what the harness counts as one. |
| transaction, `atomic` block, abort | F-374, F-351 | the area part on the compiler (`compiler.md`), or the run time | An `atomic` block runs as a transaction that commits or aborts and restarts; transactions nest. |
| global lock, a transaction's snapshot | F-351 | `compiler.md`, with the transaction row above | The run time's global lock is a version clock that each commit moves; a transaction's snapshot is the value it read at its start, and a moved lock makes it validate. The cold reader could not find it in the skill. |
| a read's mark for an empty array element | F-351 (the second cold reader could not resolve it) | `compiler.md`, with the transaction row above | A compiled array store's element can hold nothing yet; a read set holds no null, so it records such a read with a mark (`Transaction.EMPTY`), and the store refuses the read. |
| arm of a block | F-351 | `compiler.md` | A part of a block that runs in parallel with the others, such as the iterations of a parallel `for` or the parts of `do ... also do ... end`, each on its own thread. |
| label, `exit`, `LabelExit` | F-351 | `compiler.md` | A `label` block can be left early by `exit`; on the compiled path an exit is a thrown `LabelExit`. |
| `value` object, `SEQV` (`===`) | F-374 | the area part on the library (`library.md`), or the core's Fortress notes | A `value` object compares by its fields, not by identity; `SEQV` is the strict equivalence that `===` names. |
| export check | F-286, F-297 | `compiler.md` | The compiled checker's comparison of a component with the apis it exports; walk has none. |
| abstract member, header | F-286, F-297 | `library.md` | A member written `abstract` in an api; a header is a member's name, parameters and return type without its body. |
| batch's planner | F-374 | `fortress-repo` core, where it says who chooses what | The agent that plans a batch's work and may pick a default that the curator has not ruled on. |
| juxtaposition | F-157 | `fortress-repo` core's Fortress notes | Two expressions side by side are an operator call in Fortress, such as a matrix product. |
| array based above zero, shifted array | F-279 | `library.md` | A Fortress array has a base index per dimension; `shift` gives a view at another base. F-279 defines "shifted" for itself. |

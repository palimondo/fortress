# Judgement of chunk c19, run c-run1 (base c124c6b65)

Applied 10 (rewrites), held 2 (545, 315). No closes, duplicates, pairs or silent rows (`closes.txt`, `dups.txt`, `pairs.txt`, `silent.txt` empty; `final.*` for them empty).

- **565: apply, corrected.** Check FAIL on one phrase only. Correction made from SKEPTIC.md:133 as the check gives it: "or in an object of an instance" -> "or in an object that extends an instance of it" (1168 characters, claim 231).
- **594: apply.** Check passes; pin `CodeGen.java:3212` holds; batch story removed.
- **724: apply.** Check passes; pins re-read at the base (`OverloadSet.java:2574-2578`, `CodeGen.java:4375`, `:4666`, `:6897`).
- **539: apply, corrected.** Check FAIL on lost content: "Compiled: row 537." -> "Compiled, the checker accepts it and the run dies (row 537)."; " over an array list and a list" deleted from the claim to fit (1197 characters, notes 694).
- **550: apply.** Check passes; `:772`, `:1165` hold.
- **723: apply.** Check passes; pins `GenericMethod.java:149`, `:144-145`, `OverloadedFunction.java:163` hold; 317fc0ef5 pin dropped.
- **744: apply, corrected.** Check FAIL on fidelity (528438ac5 is a revival commit, not the team's tree) and an ambiguous compiled sentence: "..., and the team's tree stops so too." removed; "Compiled, the call runs the plain method." -> "Compiled, the explicit call runs the plain overload." (REPORT.md section 7, line 84; 1122 characters).
- **760: apply.** Check passes.
- **779: apply.** Check passes.
- **780: apply, corrected.** Check FAIL: " The same on the base db8fecd22." deleted (a past batch base); "the receiver, `H[\ZZ32\]`." -> "the receiver, `H[\ZZ32\]`, an object extending `Holds[\S\]`; the test expects "round"." (from the test, per the check; 1098 characters).
- **545: hold.** A measure row: its messages predate walk's load check and the checker's overloading check changes; no prober ran it in this pass (no `runs.md`). The check corrected the question's commands (absolute `bin/fortress`) and outcome 1 (`siblings: 492` dropped); the corrected question goes to `queue.md`. The status word (`CONTESTED` vs `NEGATIVE-VERIFIED` for an unsettled text) also touches review-queue item 265, whose default keeps the rows as they are.
- **315: hold.** A measure row: its reproducer is a passing plain walk test, so it does not reproduce the compiled claim; only a compile at the base settles it, and no prober ran it. The check corrected the second outcome (no bisect: close with test `none`, the notes giving both commands and outputs); the corrected question goes to `queue.md`.

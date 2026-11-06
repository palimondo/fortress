# Queue items from chunk c8, run c-run4

- **Row 377, held: does the fifteen-value `stringOps` program still stop the code generator at c124c6b65?** The row's only evidence is a probe run of 2026-09 on climb batch 3's tree; its probes left the tree in ab067d9b6, and `CodeGen.java` has changed by +289 -9 lines since the pin 052a7c3fe (the throw is now at `CodeGen.java:2874`). No prober ran the question in this pass. The program, the command and each outcome's line are in `tmp/ledger-pass/c-run4/c8/questions.md`, "Row 377".
   - Landed: the row's present line (`tmp/ledger-pass/c-run4/c8/evidence/377.md`, the guard's line, sha 5b834e1fd03fc094). Default: the row's present line.
   - The other way: run the recovered `Sk2OldNew.fss` (`git show ab067d9b6^:explorations/compile-ladder/rung-default-rendering/probes/skeptic/Sk2OldNew.fss`), then rewrite with reproducer `none` and the throw at `CodeGen.java:2874`, rewrite to the new failure, or close against the commit that fixed it (candidates d96242f0a, 8833d89c5, c324b841c).
   - Its cost: one compile and run of a 30-line probe, plus up to five narrowing compiles; a few minutes of a prober's time.
   - Home: `tmp/ledger-pass/c-run4/c8/questions.md`, `assessment.md` and `check.md`, row 377; row 377.
   - Needed by: the ledger's repair; the next prober run of the pass.

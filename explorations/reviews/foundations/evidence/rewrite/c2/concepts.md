<!-- Concepts that chunk c2 of the foundations rewrite (P-33, P-12, P-59, P-17, P-84, P-85, P-58) leans on, each with the entries that use it and where it should be defined for every worker; updated after the fix round. -->

# Concepts for chunk c2

| Term | Used by | Where to define it |
|---|---|---|
| the three layers | all seven, by pointer to P-26 | P-26 defines them (chunk c1); `concepts.md` of c1 asks for a `fortress-repo` core glossary term. The cold reader lacked it. |
| the distance and the distance stage (the stage that counts the compiled checker's errors and crashes over the one library's twelve components, and from climb batch 22c the fourteen) | P-33, P-12 | The coordinator skill or the short orientation; F-53 owns the count. The cold reader could not name the twelve. |
| the fourteen components (the distance stage's twelve and `List`'s two imports, `CovariantCollection` and `OneShotFlag`) | P-33, P-12 | F-53, once climb batch 22c adds the two; P-33 defines it in the record. P-37 (c1) names them too. |
| the compile command's own setting (what `Shell.useCompilerLibraries()` sets for `fortress compile`, against the distance stage's setting) | P-33 | F-289 holds it, and P-33 now points to it; the compiler area part. |
| the two zeros (the checker's and the code generator's, over the fourteen) | P-33 (P-37 in c1) | The coordinator skill, beside the switch-over; F-53 and F-34 hold the two counts. |
| the coordinator (the coordinating session that reads POSITIONS and plans the batches) | P-59 | The `fortress-repo` core glossary, one line; `CLAUDE.md` names the coordinating session only. |
| stamping (the class loader's class per instantiation) | P-84 | P-26 defines it (c1), and P-84 now points there. In `fortress-repo`, name it in "The compiled run time", which describes the mechanism without the word, so that it does not collide with the build's `implementation.stamp`. |
| way A4 (the class loader's way to a `double[]` store) | P-84, P-85 | `reviews/array-design-ways.md` defines it; P-84 names the note. No skill needed until the array work starts. |
| decisions A, B, D; the array factory | P-84, P-85 | P-85 defines A, B and D. The cold reader lacked "the array factory" and asked about a decision C; both are in text that this run leaves as it is, for the array area part when the array work starts. |
| `CoercionInvocation` (the node that the checker inserts for a static coercion) | P-12 | The interpreter or checker area part. |
| native binding, `nativeHelpers/` | P-58 | P-58 defines a native binding; the natives area part. |
| climb batch, rung (a batch of agent work toward the compiled path, and one unit of work in it) | P-33, P-58 | The coordinator skill defines both. Added by the judge: the second cold reader, which read only `fortress-repo`, guessed them right from context. A one-line glossary entry in the `fortress-repo` core would serve a worker. |
| walk runs with Scala off (`Shell.java:422`, `setScala(false)`, so the Scala checker is not run) | P-12 | The interpreter area part, beside "The phases" (walk's phase list holds the checker but switches it off). Added by the judge: the second cold reader read it right, but could not tell where the switch is. |
| the checker's zero over the one library (the `fortress-repo` core says "The compiled checker already finds no error in the interpreter's library") | P-33, P-12 | The `fortress-repo` core, "The phases": say that the zero covers the twelve components (F-53), and that F-290 counts the errors outside them. Added by the judge: the second cold reader saw a tension between that sentence and P-33's 38 other components. |

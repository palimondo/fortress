# Chunk c20, judgement (base c124c6b65)

Applied 10 (4 rewrites, 6 keeps), held 2 (547, 555). No closes, duplicates, silent lines or pairs were proposed, and the check found none missed.

- **540, rewrite: apply.** The check passes it: `CodeGen.java:6515` at c124c6b65 is the `(NamedType)receiverType` cast in `forMethodInvocation`; P-60 kept by number; `siblings: 559` right.
- **543, rewrite: apply, corrected.** The check fails it for dropping the old line's "for the curator" with no pointer to the open review; the record gives it exactly (`review-queue.md:58` and `:480`, item 58). Correction in the notes: "the narrower scope is a default (F-76)." became "the narrower scope is a default, review-queue item 58 (F-76).".
- **559, rewrite: apply, corrected.** The check fails route 3: 'AbstractIntersection??' is the message before rung I, the program is a call of `idy`, and walk runs route 3 too (`explorations/compile-ladder/rung-instance-bound/SKEPTIC.md:65`: `SkOverPassAny`, head dies `Intersection??.xlation`, walk `h(3) = 4`). Correction in the notes: the route 3 passage became "Route 3, an overloaded function given to `idy[\X extends Any\]`, 'Intersection??'. Walk runs all three." (row 1194 characters).
- **612, rewrite: apply.** The check passes it: `EvaluatorBase.java:375` and `:397-399` hold at c124c6b65; `siblings: 591` right; row 588 FIXED, its repair story in the history.
- **448, keep: apply.** Check passes; no `paramCount` line changed between `052a7c3fe` and c124c6b65.
- **587, keep: apply.** Check passes; F-141 lists it as a defect with an expected failure, walk XXX test green under gate a12ab5c60.
- **591, keep: apply.** Check passes.
- **616, keep: apply.** Check passes.
- **843, keep: apply.** Check passes; no commit since the row touches its cited files.
- **589, keep: apply.** Check passes; the two `inferByUnification` pins hold, F-141 holds the repair.
- **547, measure: hold.** No prober ran the question of `questions.md` (no `runs.md` for the chunk); the row keeps its line. Queue item 1.
- **555, measure: hold.** No prober ran the question; the row keeps its line. Queue item 2.

# Judgement of c35 (run c-run2), base c124c6b65

All four rows applied; none held. Each check failure came with an exact correction drawn from cited sources, which I verified and made.

- Row 35: apply. Correction: `The errors, in that order:` became `The errors under walk, in that order:`. Source: the probes ran under walk (`explorations/libvector-probes/transcript.txt` at `e879b6a44^`), and `Cannot unify` is walk's message (`FType.java`).
- Row 50: apply. Correction: inserted ` (a phase both paths run; the compiled path was not tried)` after `so it binds no generator variable`. Source: the disambiguator is a shared phase (`ExprDisambiguator.scala:450` is the message).
- Row 58: apply. Correction: added the walk error from `transcript.txt:625-626` at `e879b6a44^`: `Failed to find any matching overload, args = (2.0,__DefaultVector[\Value,3\])`. Status kept beside `silent` (review-queue item 265). final.silent = silent.txt (58 choice), upheld by the check.
- Row 466: apply. Corrections: found-by became `climb batch 7 rung A` (the role is dropped); the notes' mechanism and spec reading were rewritten to the check's text, which now follows `arrays-distributed.tex:71` ("may be initialized at most once"; the footnote's fatal error) and `NativeArray.fss:27-28`, and the old line's `Fix:` is restored; the workaround is shortened to the check's wording. I verified the spec line and the comment directly.

No closes, duplicates or pairs. No question is left to measure, and no row cites an `XXX` test.

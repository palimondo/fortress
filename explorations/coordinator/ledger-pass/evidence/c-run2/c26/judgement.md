# Judgement, chunk c26 (run c-run2, base c124c6b65)

Applied 11 (1 close, 7 rewrites, 3 keeps); held 1 (390).

- **17: apply, close** (FIXED by 3924e7ec3, test none). Check passes: the revised `Specification/basic/trait-parameters.tex`, "Where Clauses", marks the declaration "Not allowed!"; the refusal is what the text requires. Dropped facts have homes (history, F-255, P-62, row 404).
- **390: hold.** The assessment's disposition is a measure (questions.md: does the compiled run still die with `NoSuchMethodError` after `checkApplication`'s rewrite?), and no prober ran it in this run. The row keeps its line; the question is in queue.md.
- **513: apply, keep.** Check passes (`Coercions.java:117` holds the skip at the base).
- **754: apply, rewrite.** Check passes.
- **755: apply, rewrite, one correction:** "refused on the base 3aea3da53 too" became "refused at 3aea3da53 too", the check's note (the line's own pin is c124c6b65, so "the base" misled the cold reader).
- **756: apply, rewrite (CONTESTED kept), one correction:** the check failed the reproducer's findability; appended to the notes, as the check gives it exactly: " Probe: `bin/fortress typecheck` on \"Row 756's program\" in `compile-ladder/plan-22/probes/NOTES.md`." (file exists at the base). Settled-for-close not applicable: the row stays open.
- **777: apply, rewrite.** Check passes.
- **778: apply, keep.** Check passes; the commit-says-fixed signal is false (396e4ed8d lists 778 among walk's departures).
- **805: apply, rewrite, one correction:** the check failed the probe's findability; "Probe: the count stage's `WorldFlip -stop typecheck` on such a call" became "Probe: `WorldFlip -stop typecheck` (`coordinator/tools/checker-count/`) on such a call" (`WorldFlip.java` exists there).
- **831: apply, rewrite.** Check passes; sibling 17 dropped, consistent with 17's close in this pass.
- **868: apply, keep.** Check passes.
- **869: apply, rewrite.** Check passes.

Files: final.dups, final.silent, final.pairs empty (no duplicate, no NEGATIVE-VERIFIED row beside `silent`, no pair; the check upholds all three).

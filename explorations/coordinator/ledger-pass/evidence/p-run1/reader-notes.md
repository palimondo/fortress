<!-- Notes of the Opus worker that built the pilot's page of old and new lines (https://claude.ai/artifact/M8w4CszsacL8u5pC4H2UJm), read as a fresh reader of the 24 landed rows of section 6 after the landing 36045ec72; filed for the pass's blind audit and its results note, not acted on. Written 2026-11-06 by the coordinating session from the worker's report. -->

# The pilot's rows, read after the landing

The page worker read the 24 landed rows of run p-run1 and flagged these points. None was acted on; the blind audit after the pass and the reconcile run read them.

- Row 350: the claim says "on both paths", but the class, "implementation gap (runtime)", names only the compiled run time, and the walk half cites no run.
- Row 327: the claim says the numeral "is taken at ZZ32", while the notes say that, compiled, it keeps its value and the call stops with "Not in range"; the notes also say the file was never run, so the claim rests on a run of the twin file `IntegerChoose2.fss`.
- Row 381: "siblings: 380" was dropped, but row 380, fixed, still says "the compiled side is row 381"; the link now goes one way.
- Rows 349 and 502: both say that P-161 deletes `ZZ`'s `widen`; row 349 still lists the missing `widen` on `ZZ` in its claim and credits that decision only with closing the `narrow` half.
- Row 856: the class is now "deliberate", the status still `NEGATIVE-VERIFIED`, and the notes say the row closes when the forms that raise land; it reads as half defect, half choice.
- Row 792: the status is `CONTESTED` ("until then the row stays CONTESTED"), but the route it gives is already settled.
- The judge upheld the pair 349 and 442 (`p1/final.pairs`); the reconcile run after the pass (`chunks.py --reconcile`) packs such pairs, so it is followed up there, not in the queue.

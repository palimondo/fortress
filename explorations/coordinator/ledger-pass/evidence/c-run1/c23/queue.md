# Queue items from chunk c23, run c-run1

- **Row 853, held: does the compiled checker accept a pair nested only at a `Bottom` instance?** The row is `CONTESTED` by reading (`explorations/reviews/popl2019-rules-map.md`, finding 4): `subEDsolution` solves with `solve`, not `solveToBounds`, so `f(g: Blue -> ZZ32)` may read as more specific than `f[\T extends Red\](g: T -> ZZ32)` at `T = Bottom`. No prober ran the settling compile in this pass. The program, command and each outcome's line are in `tmp/ledger-pass/c-run1/c23/questions.md`, "Row 853". Its cited lines read the same at c124c6b65 (only moved by words, pin 501140f96 unchanged).
   - Landed: the row's present line (`tmp/ledger-pass/c-run1/c23/evidence/853.md`, the guard's line, sha 948f916a1fd210ee). Default: the row's present line.
   - The other way: run the probe; if the compile succeeds, NEGATIVE-VERIFIED with the program as an `XXX` compiled test (`compile_err_contains=Invalid overloading`); if it refuses 'Invalid overloading of f', RETIRED, or rewritten if another rule refuses it.
   - Its cost: one compile and run of a 12-line probe, under a minute of the prober's time.
   - Home: `tmp/ledger-pass/c-run1/c23/questions.md`, `assessment.md` and `check.md`, row 853; `explorations/reviews/popl2019-rules-map.md`, finding 4; row 853.
   - Needed by: the ledger's repair; the next prober run of the pass.

# The binding rules

These five hold for the whole step, whatever the design.

1. Every edit to the original tree starts from a failing test that is added to the test corpus and kept there; the test is seen failing before the fix is made. (The original tree is everything in the repository except `explorations/`, `research/` and the `Specification*/` directories.)
2. The project's full test suites, `ant testFast` (the compiler and library tests, among others) and `ant testSystem` (the interpreter tests), pass on the merged result before anything reaches `main`.
3. Nothing is built or run twice on the same code: when a build or a run has already been done on a given state of the code, its result is reused, not redone.
4. Only what `main` is to hold is committed: the change, its tests, its report. No logs, no captures, no scratch.
5. Every change to the language is written into the specification with a callout at the passage and an entry in its Appendix I (`Specification/appendices/changes.tex`), and the original text is kept.

# Chunk c45, judgement (base c124c6b65)

All 12 rows applied; none held. Keeps that the check passes keep their line (no line in `final.rewrite`).

- 268, rewrite: apply, with the check's two corrections. "so a green suite says nothing of syntax abstraction" -> "so no gated suite runs them" (source: tests-running.md:80, the misc track runs `syntax_abstraction_tests/ForUse.fss`); "beside two `SXX` expected failures" -> "beside the two `SXX` files that the lister below expects to fail" (source: `SyntaxAbstractionJUTestAll.java:40-41`).
- 271, keep: apply (check passes).
- 275, keep: apply (check passes).
- 291, rewrite: apply as written (check passes).
- 702, keep: apply (check passes).
- 67, keep: apply (check passes).
- 119, keep: apply (check passes).
- 121, keep: apply (check passes).
- 123, rewrite: apply, with the check's correction: added "nor in the compiled path's `CompilerLibrary/`; the error is walk's" (source: `git grep TestSuite c124c6b65 -- CompilerLibrary ProjectFortress/LibraryBuiltin` finds nothing). Placed after the specification quote so the sentence reads in order.
- 532, rewrite: apply, with the check's two corrections: the notes replaced whole by the check's text (both tests are in `count-run/unstable.txt:9-10`, which `compare-normalised.py:165-171` reports as UNSTABLE; the stale workaround "or list both with the load-sensitive tests" dropped); found by "climb batch 6.5b rung V's skeptic" -> "climb batch 6.5b rung V" (template line 24: no role).
- 745, keep: apply (check passes).
- 757, rewrite: apply, with the check's two corrections: "`isStale` (`:614`) compares only those dates, never the jar" -> "compares source dates, its dependencies' included, with the cache's and checks a foreign change, never the jar" (source: `GraphRepository.java:614-616`, `stale1`, `stale2`); found by "... rung A's skeptic" -> "climb batch 17 rung A".

Sources of the corrections were re-read at c124c6b65. `final.rewrite` passes `ledger.py check --rows`.
No duplicates, closes or pairs. `final.silent` is `silent.txt` unchanged: each defect/choice reading agrees with the row and the check.

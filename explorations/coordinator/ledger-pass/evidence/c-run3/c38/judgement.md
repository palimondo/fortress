# c38 judgement (run c-run3, base c124c6b65)

Sources: `assessment.md`, `rows.rewrite`, `dups.txt`, `closes.txt` (empty), `questions.md`, `pairs.txt` (empty), `silent.txt` (empty), `cold-read.md`, `mech.md`, `check.md`, `evidence/*.md`. Every correction below is the check's, made exactly as `check.md` words it.

- Row 5 (rewrite): apply, with corrections. (1) Notes: `∑` named as an operator named `SUM`, `Operators.java:2082` (verified: `"∑;"+"SUM;"`). (2) Specification cell: `:20`, `Accumulator ::= $\sum$ ∣ $\prod$ ∣ …` (verified at `reductions.tex:20`).
- Row 6 (keep): apply as kept; the check passes it. No line written.
- Row 81 (rewrite): apply; the check passes it.
- Row 92 (rewrite, absorbs 168): apply, with corrections. (1) The api case bounded: "its component has the same clash, so the api is not shown checked alone". (2) "Met by the model program's `step`, `model` and `rows`."
- Row 147 (rewrite): apply, with correction: the grep names `Library/FortressLibrary.fsi`.
- Row 167 (rewrite): apply, with correction: the `rows`/`block` clashes attributed to row 92 (`explorations/run-c3/gaps.md`, row 163, in the parent of `a0a0c7c99`).
- Row 168 (duplicate of 92): apply; the check passes it given row 92's correction 1, which is made. `final.dups` adds no text (its facts are in row 92's line).
- Row 322 (rewrite): apply, with corrections. (1) Claim: "an `atomic do … end` block as the trailing expression". (2) Notes: "`compiler_tests/XXXTryInArmRungG`, which also meets row 497".
- Row 324 (rewrite): apply, with corrections. (1) "The mechanism, by reading, not measured:". (2) "Workaround: throw before the block."
- Row 497 (keep): apply as kept; the check passes it. No line written.
- Row 526 (rewrite): apply; the check passes it.
- Row 876 (rewrite, CONTESTED kept): apply; the check passes it. Not closed: its question is unsettled.

Closes: none. Pairs: none (assessment and check agree). Silent: none (no `NEGATIVE-VERIFIED` row beside `silent`). Questions to measure: none. `XXX` tests believed to pass: none (`XXXTaskArmLocalSlot`, `XXXTryOperandRungE`, `XXXTryInArmRungG` stand by reading).

Counts: 12 applied (9 rewrites, 2 keeps, 1 duplicate), 0 held.

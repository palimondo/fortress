# Queue items from chunk c21, run c-run3

No row is held, and no `XXX` test of the chunk is believed to pass (`questions.md`).

- **Row 499, question to measure: walk's answer for `XXXGenericPositionalFixed`'s pair since row 159's fix (`6d187d069`).** Row 499 now says "walk's answer since row 159's fix is not measured"; no prober ran it in this pass (optional, not a disposition).
   - Landed: row 499's line from `tmp/ledger-pass/c-run3/c21/final.rewrite`. Default: that line.
   - The other way: run `bin/fortress ProjectFortress/compiler_tests/XXXGenericPositionalFixed.fss` under walk. `fixed`: row 499's notes say "walk answers `fixed`"; `tag`: row 499 says "on both paths"; a refusal at load: a new row (row 159's fix does not cover it).
   - Its cost: one walk run of one test program, about a minute.
   - Home: `tmp/ledger-pass/c-run3/c21/questions.md`, `assessment.md` and `check.md`, row 499; row 499.
   - Needed by: the ledger's repair; the next prober run of the pass.

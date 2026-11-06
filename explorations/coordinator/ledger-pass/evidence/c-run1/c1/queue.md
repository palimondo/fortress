# Queue items from chunk c1, run c-run1

- **Row 772, held: what the compiled path infers for a trait's generic method on a `ZZ32` and an `RR64` since `1bc0a9083`.** The row says `Box[\Object\]`, measured at `5dd54b64b`; `1bc0a9083` (2026-10-30) since bounds an unbounded type parameter by `Any` under `fortress compile`, and `wrap[\T\]` has none, so the value may now be `Box[\Any\]` or gone. No prober ran it in this pass. The program, command and each outcome's line are in `tmp/ledger-pass/c-run1/c1/questions.md`, "Row 772". The reproducer cell names a report, not a program (`CompRowProbe.fss` was never committed), and the rung W sentence is a batch story; both are fixed by any new line.
   - Landed: the row's present line (`tmp/ledger-pass/c-run1/c1/evidence/772.md`, the guard's line, sha 75d62b85366ba789). Default: the row's present line.
   - The other way: run the probe, then keep with reproducer `none` and the command, rewrite to the new value, or close against the commit that moved it.
   - Its cost: one compile and run of a 30-line probe, under a minute of the prober's time.
   - Home: `tmp/ledger-pass/c-run1/c1/questions.md`, `assessment.md` and `check.md`, row 772; `explorations/perf-probes/trait-generic-method-inference/REPORT.md`, sections 1 and 7; row 772.
   - Needed by: the ledger's repair; the next prober run of the pass.

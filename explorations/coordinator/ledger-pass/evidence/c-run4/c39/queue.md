# Queue items from chunk c39 (c-run4, base c124c6b65)

No row held. One question to measure that no prober settled:

- **?. Row 1: does `x[i]^2` lose its first index on the compiled path too, or only under walk?** The row's class says `(walk)` and its mechanism is walk's evaluator (`interpreter/evaluator/Evaluator.java:1181`, `:1380-1381`); no prober compiled the probe `git show e879b6a44^:explorations/gap-ledger-probes/g02.fss` (`m[3,7]^2` beside `(m[7])^2`). The cold read and the check both name the gap (`check.md`, "Row 1", advisory). Default: the row's present line, as applied.
  - Needed by: never; the row is applied, and the answer only adds which paths show the defect.

# Judgement, chunk c17 (run c-run2, base c124c6b65)

Applied 11 (all rewrites), held 1 (465). No closes, no duplicates, no keeps.

- **305: apply.** Check passes.
- **733: apply, corrected.** Check fail 1 (fidelity): the probe ran at 423958063, not 2798e75d5 (`explorations/perf-probes/abstract-sibling-body/REPORT.md:1`, `:5`). Correction made exactly as the check gives: "Probe, run at 2798e75d5:" became "Probe, run at 423958063 (`explorations/perf-probes/abstract-sibling-body/REPORT.md`, section 2):"; section 2 holds the `cd` run (`:262`), which answers the cold read's doubt.
- **837: apply, corrected.** Check fail 1 (cold read): "distance driver's tolerant run" is undefined. Corrections as the check gives: in the claim, "the distance driver's tolerant run then leaves" became "the distance stage, which goes on past the error, then leaves"; in the notes, "The tolerant run's 'Cannot handle (LValue ...'" became "The distance stage's 'Cannot handle (LValue ...'".
- **840: apply.** Check passes.
- **845: apply.** Check passes; silent class `defect` upheld.
- **890: apply.** Check passes; siblings 891 both ways, not a duplicate.
- **891: apply.** Check passes.
- **719: apply.** Check passes.
- **294: apply.** Check passes; silent class `choice` upheld.
- **798: apply, corrected.** Check fail 1 (cold read): "Decided: P-88." gives no content. Correction from POSITIONS.md:98 as the check gives: "Decided: P-88 wants `ReadableArray2` as a library change, not in the vocabulary." Silent class `defect` upheld.
- **808: apply.** Check passes.
- **465: hold.** A question to measure (questions.md); no prober in this run settled it. The check fails outcomes 2 and 3's mapping; the queue item carries the corrected mapping. The row keeps its present line, whose `Array2` example is false at the base (`Library/FortressLibrary.fsi:1729-1730`, since 031c38bbc).

Silent: 845 defect, 294 choice, 798 defect, all upheld (final.silent). Pairs: 733/732 upheld (final.pairs).

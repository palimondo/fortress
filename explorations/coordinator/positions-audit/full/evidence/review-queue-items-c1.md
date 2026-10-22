<!-- The POSITIONS audit's full run, chunk c1: the review-queue item drafted for the part that leaves POSITIONS and that review-queue.md does not already hold (from P-17), in the queue's own form, and the parts of the chunk that the judgement read as defaults but that stay in POSITIONS; nothing is written into review-queue.md. -->

# Review-queue items drafted for chunk c1

Rule 2 of the writer's brief: a part that is an agent's default, landed and waiting for his review, leaves POSITIONS, and gets an item if `explorations/coordinator/review-queue.md` does not already hold it. The judgement (`judgement-c1.md`) read four parts of the chunk as such defaults. One leaves on that ground:
- P-17's "Boxing is measured on microGPT-shaped kernels, not on a scalar loop with literals and a `:=` accumulator, which microGPT never runs." No item holds it: a grep of the queue for "boxing", "kernel" and "scalar loop" finds none. It is drafted below as **Q-?1**.

Three stay in POSITIONS, so they get no item (the reasons are in `corrections-c1.md`):
- P-12's "It comes once walk also takes the static coercions that the checker inserts (P-59)." The option he took for after the switch-over joins the two halves (item 7's option 2), so it is his yes, not a default ("P-12").
- P-19's lineage cleanup, parked. He held the task himself, and PLAN's parked line is its item ("P-19").
- P-26's "The implementers' later word also outweighs unfinished text." It has no source of his, so by rule 5 it stays and goes to him as a question ("P-26", question 1), not to the queue.

"The corrections" is `positions-audit/full/evidence/corrections-c1.md`. The draft ends with the queue's "Needed by" line. The coordinator numbers it.

## For "(c) Routine", "Code generation and the run time"

Routine by the `coordinator` skill's test. It is a text choice inside decided ground: P-7 measures the goal by microGPT, and P-29 makes no performance judgement until microGPT runs compiled. It touches no line of the model, the library, the specification or the implementation, and it can be undone.

Q-?1. **Boxing is measured on microGPT-shaped kernels, not on a scalar loop with literals and a `:=` accumulator, which microGPT's kernels do not run.** A measurement of what boxing costs on the compiled path uses code shaped like microGPT's kernels: the dot product over the flat parameter vector, the matrix product, the row lift (`perf-probes/kernels/REPORT.md`, section 2). It does not use a scalar loop that keeps float literals inside the hot loop and a `:=` accumulator, as the first boxing probe did (`perf-probes/boxing/REPORT.md`, section 2). His only word was one instruction: at 2026-09-15T22:34:55.554Z, on that probe, which the coordinator reported at 21:42:29.833Z, he said that the test seemed to meet an edge case that the microGPT experiments had not met, float literals parsed from strings, and asked for a fairer and better test. The kernels probe did it. P-17 told this as history until the consolidation of 2026-10-13 (`b87a17de5`) kept it "as the rule on what to measure". He was never asked about the rule. The text it stood in said "which microGPT never runs". MicroGPT's kernels run no such loop, but C4's weight loader does: `parseFloat` keeps `m: RR64 := 0.0` and runs `m := 10.0 m + ...` in a `while` loop (`run-c4/src/FlatData.fss:16-30`). So the item says "which microGPT's kernels do not run".
   - Landed: As stated, in P-17 from 2026-10-13 until this audit. The one measurement it describes is the kernels probe of 2026-09-15 (F-11).
   - The other way: No rule of its own. P-7 and P-29 already make microGPT the measure, so the first measurement of phase 6 times microGPT itself, the weight loader's loop included. Or: measure the kernels and the whole program side by side.
   - Its cost: None now. It shapes how phase 6's first measurement is briefed.
   - Home: POSITIONS P-17, its former sentence (POSITIONS-history, P-17; the corrections, "P-17"); `perf-probes/kernels/REPORT.md`, sections 1 and 2; `perf-probes/boxing/REPORT.md`, section 2; F-11; PLAN, "Phase 6. microGPT fast"
   - Needed by: before microGPT runs fast; unboxed arithmetic and the timing against a pure-Java microGPT are PLAN's phase 6 (P-33).

## Changes proposed to items the queue already holds

None. No item of the queue names P-7, P-8, P-9, P-11, P-12, P-16, P-17, P-19, P-25 or P-26 (`pointers.py`, the review-queue lines, in `fix-c1/pointers.txt`).

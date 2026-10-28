<!-- The phase 3 exit review as one process, from 2026-10-24 onward: its six layers in order (the exit and foundations reviews, their judgements, the rejected POSITIONS rewrite, climb batch 22c's record, the salvage, the rewrite's post-mortem), each with what it asked, what it produced, what it left open, and its files by path. Written 2026-10-28 by an Opus worker at the curator's yes; the files stay where they are, and this note is the one place that lists them all. -->

# The phase 3 exit review, as one process

Phase 3 of the plan ended when climb batch 22 landed on 2026-10-24: the compiled checker found no error in the library parts that replace the compiler's own small library. That result is "the zero". Before phase 4, the switch-over, the curator held climb batch 23 at 11:36 UTC on 10-24 and asked for a review of everything. The work then went six layers deep. Each layer started from the one before it.

The files stay in the homes that their kinds have: reviews under `explorations/reviews/`, probes under `explorations/perf-probes/`, the batch under its batch names, the post-mortem under `explorations/coordinator/`. Paths below start at `explorations/`. Each item that waits for the curator's word is in `coordinator/review-queue.md`, items 279 to 290.

## 1. The review

**Asked.** Can the zero be trusted? Do the curator's decisions, and the defaults that agents landed for him, bend the designers' intent? On 10-25 and 10-26 his questions added a second round, the foundations review: do the nine decisions that the revival rests on hold, and in which layer does each have its reason (the language, the team's build on the Java virtual machine, or Java itself)?

**Produced.** Evidence maps and an audit, with no verdicts. The zero is right for what it counts, but four things sit outside it.

**Left open.** Nothing of its own. It fed the two judgements.

**Files.**
- `reviews/phase3-exit/decisions-evidence.md`: the decisions against the designers' word (Opus, 10-24).
- `reviews/phase3-exit/zero-audit.md`: the zero, measured again (Opus, 10-24).
- `perf-probes/export-abstract-codegen/REPORT.md`: row 816's probe, an input from before the hold (Opus, 10-24).
- `reviews/foundations/bound-archaeology.md`: the history of the implicit bound (Sonnet, 10-26).
- `perf-probes/bound-any-compiled/REPORT.md`: the bound `Any` on the compiled path (Opus, 10-26).
- `reviews/foundations/tenets-evidence.md`: the nine decisions' grounds by layer (Opus, 10-26).
- `reviews/foundations/prelude-lens.md`: the library changes against the compiler's small library (Opus, 10-26).

## 2. The judgements

**Asked.** What to correct before phase 4.

**Produced.** The exit judgement of 10-24: one default bends the designers' later word, row 816's reading of an api member written `abstract`; the curator reversed it on 10-25 (P-158). P-75 is to be withdrawn. Six entries carry a wrong reason or a stale sentence. The foundations judgement of 10-26: all nine decisions hold; four entries give a reason from the wrong layer. Both judgements' findings went into the gap ledger and FACTS, and one item into the queue (item 278).

**Left open.** The asks in the queue: items 281 (P-75), 282 (P-58), 283 (the other library parts), 284 (`AnyIntegral`), and 285 to 290 (six entries' texts). The foundations judgement's one-word asks on P-42, P-26 and P-43 belong to the salvage (layer 5).

**Files.**
- `reviews/phase3-exit/judgement.md` (Fable, 10-24).
- `perf-probes/anyintegral-comprises-where/REPORT.md`: the probe that the exit judgement asked for (Opus, 10-24).
- `reviews/foundations/judgement.md` (Fable, 10-26). Its page: https://claude.ai/artifact/6VahEN8k6uySguRuxcTWJk.
- `conversations/02-phase3-exit-foundations.md`: the dialogue of 10-25 18:50 to 10-26 17:40 UTC. It spans layers 1 to 4.

## 3. The rewrite

**Asked.** On 10-26 the curator said yes to new reasons for P-37 and P-26, with the judgement to flag other entries. The coordinator ran the clarity workflow, the tool that rewrites entries so that each reads on its own.

**Produced.** New texts for 13 entries and a trap test, which put four forks to readers of the old and the new texts. The new texts scored 12 of 12. The curator rejected them between 19:08 and 19:26 UTC on 10-26: too long, and full of history. Nothing entered POSITIONS.

**Left open.** The corrections themselves.

**Files.**
- `reviews/foundations/rewrite-results.md`: the results (the coordinator, 10-26).
- `reviews/foundations/evidence/rewrite/`: the workflow run's chunks, the combined apply file and the coordinator's run brief.
- `reviews/foundations/evidence/trap-test/`: the forks, the key, the answers and the grades.
- The rejected texts page: https://claude.ai/artifact/5noPHbJmZg41UWT74HGxno.

## 4. The batch's plan

**Asked.** The curator's framing of 07:30 UTC on 10-26: close phase 3 cleanly, with as many batches as it takes.

**Produced.** Climb batch 22c, four rungs: row 816's repair, the export check reading symbolic operators, `List`'s two imports in the count, and the bound `Any` for `fortress compile`. A Fable review found it ready to launch on the curator's answers.

**Left open.** Its questions 2 and 3, items 279 and 280. Its question 4 lands with its default and is reviewed after the landing. The batch's go.

**Files.**
- `coordinator/CLIMB-BATCH-22c.md`: the record (Opus planner).
- `coordinator/climb-batch-22c-review.md`: the review in place (Fable).
- `compile-ladder/plan-22c/`: the manifest generator and the planner's probes.

## 5. The salvage

**Asked.** On 10-27 at 07:12 UTC: keep the review's sound work, and turn it into small, targeted corrections of the entries that it names.

**Produced.** An inventory of the work since 10-26, the findings per entry (18 entries with findings), and a sort of the findings. The curator refused a plan at 07:47 UTC on 10-27, and on 10-28 he could not decipher the scope ask built on the sort. The hook that let a run brief override the workflow's own briefs was undone.

**Left open.** No correction is written yet. The salvage has no results file. When the corrections run, its results file goes in `reviews/foundations/`, beside this evidence.

**Files.**
- `reviews/foundations/evidence/salvage-inventory.md` (Sonnet, 10-27).
- `reviews/foundations/evidence/salvage-findings.md` (Sonnet, 10-27).
- `reviews/foundations/evidence/salvage-sort.md` (the coordinator, 10-28).

## 6. The post-mortem

**Asked.** On 10-28 at 07:42 UTC: before any correction, why the rewrite failed where the consolidation of 10-21 to 10-22 succeeded, and how to run the corrections now. His corrections of 09:56 and 10:28 UTC narrowed the question: every step up to the launch was right; what bent the brief that the coordinator wrote for the run?

**Produced.** An account of the causes, and evidence files on the timeline, the last consolidation, the tools and skills, the scope, the brief's origin, the coordinator's period on Haiku and row 816, and this process's records.

**Left open.** The corrections run that the account proposes.

**Files.**
- `coordinator/postmortem-2026-10-28/account.md`: the results (Opus, revised).
- `coordinator/postmortem-2026-10-28/evidence/`: `map.md`, `timeline-10-26-to-10-28.md`, `last-consolidation.md`, `tools-and-skills-history.md`, `scope-recheck.md`, `brief-genesis.md`, `haiku-and-row-816.md`, `row-816-recheck.md`, and `exit-review-records.md`, the map from which this note was made.

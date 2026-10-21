<!-- The correction trial of 2026-10-21: the review-queue items drafted for the parts that leave POSITIONS and that review-queue.md does not already hold (from P-10 and P-88), in the queue's own form, and the changes it proposes to items the queue already holds (30, 31 and 37); nothing is written into review-queue.md. -->

# Review-queue items drafted by the correction trial

Rule 2 of the correction trial: a part that is an agent's default, landed and waiting for his review, leaves POSITIONS, and gets an item if `explorations/coordinator/review-queue.md` does not already hold it. Of the parts that leave the ten entries, the queue already holds six:
- P-55's forks 3 and 2: items 30 and 31.
- P-85's element width: item 37.
- P-151's `AnyList` bodies: item 188.
- P-151's object value parameters: item 177.
- P-86's bound: item 31.

Two parts have no item, and are drafted below. The numbers 205 and 206 are provisional: the queue's highest item is 204. "The correction trial" is `positions-audit/trial/evidence/corrections.md`. Both drafts end with the queue's "Needed by" line.

## For "(c) Routine", "How batches run"

205. The microGPT walk check after a batch runs microGPT's APL port, `explorations/apl/mg/MicroGptAplQuick.fss`, beside C4's `MicroGptFlatQuick.fss`. His words on the check (P-30, 2026-10-08T17:49:22.269Z: two forward-and-backward passes, under a minute) name neither program.
   - Landed: Both, at once, in about 56 s for the pair (`explorations/coordinator/tools/mg-run.sh:9`; the `fortress-repo` skill, `references/interpreter.md`, "The model program"). Default: as landed, both programs. The other way: C4's quick program alone. Its cost: One line of `mg-run.sh` and one of the skill.
   - Home: POSITIONS P-10's last clause, "its APL microGPT program stays in the walk check (P-30)", which consolidation chunk P1 wrote at `b87a17de5` from the skill, with no word of his, and which the correction trial strikes with P-10 ("P-10"); P-30
   - Needed by: never; the pair runs under a minute, as P-30 asks, and either way is one line of a script and of the skill.

## For "(b) Consequential", "Sizes and arrays"

Consequential by the `coordinator` skill's test: it touches the library, its api and the specification's library chapter, and it chooses among ways that the record does not settle.

206. **A read-only or immutable matrix.** On 2026-09-24 he asked whether the library has an immutable matrix, since the model's diagonal is read-only (18:25:08.391Z). On 2026-10-20 he asked why there is an immutable vector but no immutable matrix or rank-3 array (13:17:04.645Z). In its message of 18:25:56.634Z on 09-24, before the ask that he agreed to, the coordinator proposed `ReadableArray2` under `Array2`, with the matrix product declared over it, as a library change worth its own ledger row. POSITIONS P-88 carried that proposal, and no row was filed.
   - Landed: Nothing on `main`. Rank 1 has `ImmutableArray1` beside `Array1`, under `ReadableArray1` (`Library/FortressLibrary.fsi:1544`). Ranks 2 and 3 are in a comment, in the api and in the component (item 202). The model's `Diag` is its own object that extends `Matrix` (P-88). Default (the immutable-arrays probe's question 1): (a) rank 1 only, today's behaviour, since nothing uses the others.
   - The other way: (b) A rung from the probe's `ranks23.patch`, about 340 library lines: a standalone `ImmutableArray2` and `ImmutableArray3`, with `freeze` at ranks 2 and 3, which leaves `Array2`, `Array3` and `Matrix` unchanged except for `freeze` (the probe's decision 1; branch `wip/probe-immutable`, `5667c5ae8`: walk runs it, the checker accepts it, the distance stays at 5). (c) A `ReadableArray2` and `ReadableArray3` above both kinds, in rank 1's shape, the coordinator's proposal of 09-24, which also changes `Array2`, `Array3` and `Matrix`.
   - Its cost: (b) about 40 copied lines a rank, and the second export error grows from 43 to 45 entries. (c) is not measured. Under walk, a second `init` of an immutable array's element replaces its value, and that defect holds for any of the ways (the probe's drafted row beside row 466).
   - Home: `perf-probes/immutable-arrays/REPORT.md`, "Decisions", 1, and "Questions for the curator", 1 and 2; item 202; POSITIONS P-88's last sentence, which the correction trial moves here ("P-88"); `process-engineering/library-extension-rule-archaeology.md:198`
   - Needed by: never; the probe finds that the switch-over needs none of its questions, and no PLAN item builds ranks 2 or 3.

## Changes proposed to items the queue already holds

These are not new items. Each is a line that the correction trial's changes make wrong or incomplete, for the coordinator to write when he approves the corrections.

- **Item 30**, "Landed": "built by batch 13 on the standing go" could name the nearer message. At 2026-10-09T15:10:56.122Z he asked whether forks 2 and 3 can go into the next batch, and the coordinator's 15:13:34.608Z reply put them into batch 13 at the judgements' defaults (`judgement.md`, "P-55"). "Home": `P-55, "A size may hold arithmetic, compared by its written ..."` stays as the decision that fork 3 builds on, but P-55 no longer states fork 3. POSITIONS P-85 now names this item for the third question's ground.
- **Item 31**, the same two changes: the 15:10:56 message in "Landed"; P-55 out of "Home", or named only for fork 1. Add one sub-bullet, from P-86's strike and `BOOT.md`, task 1 (the coordinator's text there, checked at the source):
  - Astra's review gave two reasons against one ring bound for the whole family (`reviews/numeric-hierarchy-integration-review.md:47-51`): (a) integers had no ring in its sketch, false since 2026-09-27; (b) a copying operation needs less than an arithmetic one, which is live. C4's `gather` (`run-c4/src/FlatArrays.fsi:51`) and the APL port's `ravel` (`apl/mg/AplMg.fss:12`) take a `Matrix[\T,...\]` with `T extends Number` alone, which the landed bound makes ill formed for the checker. This is by reading, not measured, and the gate cannot see it before the switch-over. POSITIONS P-86, which stated reason (a) alone as a rule, is struck as a one-time approval carried out.
- **Item 37**, "Its cost": "After the switch-over, by his decision." holds for decisions D and A (forks 5 and 6). It does not hold for the element width (fork 4). The width's place after the switch-over is the coordinator's recommendation of 2026-09-25T23:30:06.653Z, which he did not answer; his question of 23:29:15.074Z is the item's own. "Needed by": "P-85 returns these forks after the switch-over" should read "forks 5 and 6", with the width placed by the coordinator's recommendation.

<!-- The POSITIONS audit's full run, chunk c8: the review-queue items drafted for the parts that would leave POSITIONS; none is proposed, and one (Q-?1, P-124's general rule against respelling a failing example) is drafted only for the case where the curator prefers rule 2 to keeping the sentence; nothing is written into review-queue.md. -->

# Review-queue items drafted for chunk c8

The writer's rule 2 sends an agent's default that waits for his review to the review queue. In this chunk, no part has to leave POSITIONS for the queue (`corrections-c8.md`):
- **P-123**'s two defaults were his to take, and he took them with "Batch 5 go". Both were carried out, so nothing waits for his review. The entry is struck (rule 3).
- **P-124**'s general sentence, "A failing example is not respelled for walk ... the implementation is fixed instead", is an agent's extension of his option 1. Rule 2 would move it. I keep it, by rule 0, and put it to him as a question (`corrections-c8.md`, "P-124", question 1). The item below is drafted only for the case where he wants it to wait in the queue instead. The coordinator numbers it.

## For "(c) Routine", "Tests and the team's demos"

Q-?1. **A specification example that fails later is not respelled for walk.**
   - Background: on 2026-10-04 he chose option 1 for `ant testSpecData` ("Yep. Option one.", 20:27:30.337Z, to the coordinator's 20:24:58.453Z question). The target joins the gate at zero red once the five red examples are green. He did not take option 2, a list of known red names, or option 3, the five respelled ("a text change in the revision form, to cover a gap in walk"). Consolidation chunk P3 (`ab933086b`, 2026-10-13) made the refusal of option 3 a rule for every example.
   - Landed: P-124's "A failing example is not respelled for walk ...: the implementation is fixed instead". No example has failed since `369982d85` (130 of 130). Default: as landed, for every example. The other way: the rule covers only the five of 2026-10-04, and a later failure is decided when it comes. Its cost: one sentence; no code.
   - Home: POSITIONS P-124, its third sentence. If this item takes it, P-124 would read: "- P-124 **The specification's examples join the gate at zero red.** `ant testSpecData` runs them under walk as a gate step, and every example must pass, and no list of known red examples is kept. Built." (`positions-audit/full/evidence/corrections-c8.md`, "P-124").
   - Needed by: never. No example fails today, and a failing example stops the gate, so the question comes back then.

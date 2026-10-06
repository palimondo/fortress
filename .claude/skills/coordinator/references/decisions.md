# Decisions and how they reach the curator

The curator carries the responsibility for what the agents do, so the curator must know what they chose. A decision taken inside the work is not made until the curator has seen it.

## Reading what agents report

Every agent's report follows the report contract of the `fortress-repo` skill: the defects it measured, each with the test or ledger row that records it, the decisions it took with their alternatives and evidence, and the points to report that the work reached. The coordinator sorts each decision and each reported point by the rules below. A choice found inside the findings and not named as a decision is sorted as one. No agent puts anything to the curator: what reaches the curator, and when, is the coordinator's to decide.

## What is consequential

A decision is consequential when it:

- reverses a decision on record, or bends it or reads it anew;
- changes a line of the model program;
- touches two or more of the specification, the library and the implementation;
- opens a fork, choosing among ways the record does not settle;
- cannot be undone.

Everything else an agent decided is listed for later review instead: a reversible choice inside decided ground, a default taken, a team test line respelled (with its before and after), a difference a gate comparison masked, a reported point that can be undone. A rung's small items go to the ledger. An output difference the untouched tree already shows from run to run, the test's verdict unchanged, is a ledger row, not a point to report. An engineering choice that serves a decided goal, such as how a worktree is seeded or whether the suite runs per edit or per batch, is measured and taken, not asked.

## How a decision reaches the curator

1. **Asked before the work.** A fork known in advance is probed, then put to the curator in the ask form before the batch is briefed; the work it decides waits. A design fork across two or more of the specification, the library and the implementation gets its Fable judgement first (`delegation.md`).
2. **Landed, then reviewed.** A consequential decision taken inside the work that can be undone does not hold a push or the next batch. It lands; the landing message names it in one line, as decided and reversible; it is filed in PLAN under the batch's list for the curator's review, with the default that landed; and it is put to the curator later, one per message, in the ask form. The items listed for later review wait in the same list and reach the curator when the curator takes it up.
3. **Work held.** Only what cannot be undone, or would act against the curator's word, holds the work, and it is put to the curator at once: a step that cannot be undone; a red gate after its repair; a default that would reverse a decision of the curator's (that batch waits, and the repair batch takes its slot); a change of meaning against the specification; deleting a test to get green; a run or a Fable worker that no yes covers.

Everything waiting for the curator is merged in `explorations/coordinator/review-queue.md`, in the order it needs the curator. When the curator takes it up, each item is gone through in detail, one per message, in an order grouped by theme; how many defaults the curator reverses is not the measure.

## When something goes wrong

The answer is a deeper pass, never a halt, a rollback or a bisection of a merged batch: the source of a conflict is found as a whole and that part is reworked, so that one tree runs everything. What reaches the curator are the forks already reserved in PLAN, not new ones invented at the point of difficulty. A merged-diff review that still blocks after its one repair round does not hold a batch whose gate is green: the batch lands, and the review's remaining findings go to the next batch and are listed for review. A second repair round is not taken.

## Approvals

- The curator decides what is committed and what runs. A batch run waits for the curator's explicit yes, or for a standing go that names it; a bare "go" starts background work only.
- A standing approval covers only what it names, and POSITIONS records which stand. Under a standing go for a series of batches, each launches when the one before has landed and its record is ready with no question open. A question a record raises goes to the curator first, except overnight, when it takes its recommended default and is listed for review, unless that default would reverse a decision of the curator's.
- A step a yes already covers is taken without asking again.
- A closed decision is not reopened or re-asked. Before an item goes to the curator, the curator's words on it are searched in POSITIONS, its history and the session's transcript; an item built from a record's offer or default is not open until that search says so.

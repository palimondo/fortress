<!-- The POSITIONS audit's full run, chunk c4: the review-queue item drafted for the part that leaves POSITIONS by the writer's rule 2 (Q-?1, P-57's sentence on isLeftZero(Unordered)); the coordinator numbers it; nothing is written into review-queue.md. -->

# Review-queue items drafted for chunk c4

The writer's rule 2 sends an agent's default that waits for his review to the review queue. In this chunk two sentences leave POSITIONS by that rule (`corrections-c4.md`):
- **P-60**'s last sentence: the checker's narrower condition (row 543) and walk's check of the clauses (row 551). Items 58 and 15 already hold both, so nothing is drafted for it.
- **P-57**'s "`isLeftZero(Unordered)` is refused under walk.": no open item holds it. The settled list's entry "Row 582, `isLeftZero`, with batch 13's pins of it" (`review-queue.md:1191`) counts it as answered by P-57, and PLAN's batch-13 line counts only the pins. It is drafted below.

By the queue's test, a changed walk value is routine. So the item goes under (c).

## For "(c) Routine", "The library's generators, strings and comparisons"

Q-?1. **`LexicographicReduction.isLeftZero(Unordered)` is refused under walk since row 582's fix.** Before the fix the team's overload `isLeftZero(_:Comparison)` answered `true` for every comparison but `EqualTo`, and so for `Unordered`. His answer on row 582 declared that overload over `TotalComparison`, so that `LessThan` and `GreaterThan` are reached (P-57). `Unordered` extends `Comparison` only (`Library/FortressLibrary.fss:151`), so no declaration takes it now, and walk refuses the call: "Failed to find any matching overload, args = (Unordered)". The question that he answered did not name `Unordered`.
   - Landed: The refusal (climb batch 13's rung O, `9ba86f7da`; its skeptic found it, `compile-ladder/rung-tuple-orders/SKEPTIC.md:142`, `:245`). Default: as landed. The other way: An overload `isLeftZero(_:Unordered)` that keeps the team's `true`. Its cost: One library line and its api line, and a test to pin it. Nothing in the library calls `isLeftZero`; only its three pins do (`ProjectFortress/tests/LibraryMeetDeclarations.fss:33-35`).
   - Home: POSITIONS P-57's history, the sentence "`isLeftZero(Unordered)` is refused under walk." (`positions-audit/full/evidence/corrections-c4.md`, "P-57"); PLAN-history, "Climb batch 13, listed for his review", Extensions and pins of climb batch 13, point 3; PLAN, "Climb batch 13, listed for his review", Extensions and pins of climb batch 13; `compile-ladder/climb-batch-13/RECORD.md:209`; row 582.
   - Needed by: never; nothing in the library calls `isLeftZero`, and no PLAN item edits it.

If this item enters the queue, two lines elsewhere change with it (`corrections-c4.md`, "P-57", pointers): the settled list's entry at `review-queue.md:1191` drops "which names the refused `isLeftZero(Unordered)`" and names this item, and `PLAN.md:382` adds that the refusal waits in this item.

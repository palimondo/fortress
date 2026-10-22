<!-- The judge's items for the review queue from the clarity pass on POSITIONS, chunk p4 of the consolidation of 2026-10-22: no held entry; one question for the curator on an applied entry (P-59), already in the queue as item 221, given here as that item's new text in the form of coordinator/review-queue.md; notes on items and lines of the queue that the applied text touches. -->

# Review-queue items, positions p4

No entry of this chunk is held. `proposals.md` writes one question for the curator on an applied entry, P-59's question 1. It is already in the queue as item 221. The text below replaces item 221's text and keeps its number, so that the queue does not hold the question twice.

221. **"MicroGPT's static types are concrete, each the type of the value itself and not a trait above it, so on microGPT walk's choice and the static choice agree": keep, mark unmeasured, or strike (P-59)?** P-59 accepts that walk chooses a coercion by the value's run-time type, where the specification and the compiled path choose it by the static type. The limit lasts until walk runs the checker on its programs, after the switch-over. The quoted sentence, the last before the entry's state line, says why this limit does not touch microGPT. "Concrete" means that each of microGPT's static types is the type of the value itself. In the coercion chapter's printed example the static type is not: in `c: C = D`, the static type `C` is a trait above `D`, the value's type, and walk answers 4 where the text gives 3 (`XXXCoercionStaticRungC`). The coordinator wrote the premise on the review page that he answered on 2026-09-29 at 14:07 UTC (`reviews/decisions-review/judgement.md:356`), as background, not as the option he took. Nothing has measured it, and it cannot be measured until the compiled path runs microGPT.
   - Landed: The sentence as the entry reads. Default: as it reads, until he answers.
   - The other way: The sentence kept but marked as not measured until the compiled path runs microGPT; or struck.
   - Its cost: One sentence of P-59. No line of PLAN or the skills rests on it (item 221's check of the pointers).
   - Home: POSITIONS P-59; `coordinator/consolidation-2026-10-22/evidence/positions/p4/proposals.md`, "P-59", question 1; `coordinator/positions-audit/full/evidence/corrections-c4.md`, "P-59", question 1; `reviews/decisions-review/judgement.md:354-360`; `ProjectFortress/tests/XXXCoercionStaticRungC.fss`
   - Needed by: never; nothing builds on the sentence, and the compiled path's first run of microGPT (phase 5) is where it can be measured.

## Notes on items and lines already in the queue

- Item 211 (`isLeftZero(Unordered)` under walk) stands. The applied P-57 leaves `Unordered` out, as the audit did. A second cold reader asked what `isLeftZero` answers for a comparison outside `TotalComparison`; that is item 211's question.
- Item 58 (the checker's narrower condition on intersection typing) stands. The applied P-60 states the specification's boundary, declarations with static parameters, and not item 58's narrower one.
- The settled lines for rung C's two points and for items 1 to 34 quote P-59's old titles, "Walk chooses coercions on the value until the switch-over." and "Walk chooses coercions on the value, for now." Both would quote the new title, "Walk chooses a coercion by the run-time value until it runs the checker, after the switch-over." (`proposals.md`, "P-59", pointers).
- The settled line for items 42 and 44 quotes P-54's title opening, "`QQ`'s `ceiling` and `truncate` keep `ZZ` ...", which the applied text keeps. Nothing to change there.

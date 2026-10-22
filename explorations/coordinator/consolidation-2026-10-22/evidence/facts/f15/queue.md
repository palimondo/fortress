<!-- The clarity workflow's review-queue items from FACTS chunk f15 (F-159, F-229, F-162, F-163, F-165, F-166, F-167, F-168, F-169, F-170, F-171, F-172, and the entries split from F-166 and F-172), 2026-10-22, in the form of `explorations/coordinator/review-queue.md`: no held entry, and one item for the decision not taken that proposals.md writes for an applied entry (the coercion example split from F-172). -->

# FACTS chunk f15: items for the review queue

The judge held no entry. One applied entry carries a question, the split of F-172. Number the item when it goes into `coordinator/review-queue.md`. `F15` below is `coordinator/consolidation-2026-10-22/evidence/facts/f15/`.

**Does the specification's coercion example stand as an entry of its own, or go back into F-172 (F-172)?** F-172 is the fact on the specification's integer chapter: `narrow`, the shifts, `GCD` and `LCM`, and the power at a negative exponent. Until 2026-10-22 it also held the coercion example of the chapter "Coercion Resolution". The example's own traits `ZZ32`, `ZZ64` and `ZZ128` now declare the exclusions that the chapter's definitions of rejection and "no less specific" need. The example ran on both paths in a probe, and no gated test runs it. The clarity pass of 2026-10-22 moved the example to a new entry, and moved ℚ's four traits to F-168. Its writer left the other way as a decision not taken: the chunk's assessment allowed either, and the example changes apart from the integer rules.
   - Landed: Two entries: F-172 holds the integer rules, and the new entry holds the coercion example. Default: as they stand.
   - The other way: One entry, F-172, with the integer rules and the coercion example, as before the pass.
   - Its cost: Two entries' wording. Nothing built changes.
   - Home: FACTS F-172 and the new entry; `F15/proposals.md`, "F-?2", the decision not taken; `F15/assessment.md`, "F-172", ownership and disposition; `compile-ladder/rung-spec-integer-rules/decision-record.md`, section 2, the rules, and section 4, decision 6, the example
   - Needed by: never; either way can be undone at any time.

<!-- The FACTS clarity pass of 2026-11-24, chunk inference: the review-queue items that the judge files; no entry is held, so both items are questions that proposals.md writes for applied entries. -->

# Chunk inference: queue

1. **Row 589's repair under walk would change which declaration runs.** Under walk, a generic declaration is passed over at dispatch where its arguments have several minimal common supertypes: `g[\T extends Fruit\](a: T, b: T)` beside `g(a: Any, b: Any)` runs the plain one for `g(Apple, Cherry)`. P-46 makes the generic applicable, at `T = Fruit`, so a repair would run the generic instead. The old F-141 called this the curator's to decide; the clarity pass moved those status words to the history, so the question has no home but this item.
   - Entry: F-141.
   - The default that stands: row 589 stays an expected failure (`XXXDispatchTwoCommonParentsWalk`), not repaired; F-141 says its repair would change which declaration runs.
   - The other way: repair walk's dispatch so the generic is applicable at the bound, as P-46 reads, and accept that some calls run a different declaration.
   - Sources: `explorations/fortress-gap-ledger.md` row 589; F-141; P-46; `compile-ladder/rung-walk-instance/REPORT.md` section 2.
   - Needed by: no planned work.

2. **F-250 points to F-85, and now to F-285, for facts that neither holds.** F-250 cites F-85 for the identity functions' `cast` and the typed `embiggen`. F-85 held neither; it pointed back to F-250. The merge of F-85 into F-285 repoints the pointer to F-285, which does not hold them either.
   - Entry: F-250 (and F-285, the new target of the pointer).
   - The default that stands: the pointer, repointed to F-285 by `record.py`.
   - The other way: F-250 states the identity functions' `cast` and the typed `embiggen` itself and drops the pointer, in the chunk that holds F-250.
   - Sources: F-250 and old F-85 in `explorations/coordinator/FACTS.md`; `proposals.md` and `check.md` in this folder, "F-285".
   - Needed by: no planned work.

<!-- The FACTS clarity pass of 2026-11-24, chunk inference, after its fix round: seventeen entries, of which thirteen are rewritten and four merged, each with its meaning check, the source of each sentence and any question. -->

# Chunk inference: proposals

The clean entries are in `clean.txt`; each is quoted in `proposals.apply` with its note line. They total about 15,900 characters, against about 23,000 before and a budget of 10,200 (17 × 600). The fix round restored conditions, claims and tests that the first round had cut and the check found lost (F-73, F-221, F-364, F-365, F-367, F-141, F-285). Each restored sentence is a limit or a claim that no other entry holds, so the overshoot stays. "Old" below is the entry's own text in `FACTS.md`; a file named with "read" was read for this pass.

## Merges

- **F-55 into F-73.** F-55 repeated F-73, F-137 and F-78. Its conclusion on the two paths is now a sentence of F-73, bounded by row 509. Nothing cites F-55.
- **F-243 into F-242.** F-243 was the history of a count of 13 errors; it goes to the history whole. Nothing cites F-243.
- **F-85 into F-285.** F-85's cast is F-285's claim, now with F-85's reason (row 632). Its `Condition` sentence joins F-285's title. F-81 cites F-85 for the cast, which F-285 holds. F-250 cites F-85 for the identity functions' `cast` and `embiggen`, which neither entry holds; `record.py` will repoint that wrong pointer to F-285. F-250, in another chunk, should hold those itself.
- **F-220 into F-285.** F-220's line is covered by F-228 and by F-53's distance. Nothing cites F-220.

## Per entry

- **F-28.** Meaning: unchanged. Added what the visitor does and what a missing case does (`EvaluatorBase.java:696-698`; the visitor's `defaultCase` raises "Missing visitor", by the check's reading). "Walk has no dimensions": `rung-walk-dispatch/REPORT.md` section 3. No row: the scout.
- **F-73.** Meaning: F-55's two-path sentence is now bounded by row 509 (the paths may differ where a static type is wider than its value), as old F-55 kept the two bases apart. Otherwise unchanged: the candidate sentence, the numeral reading at a tie, row 506's counting rule and the four tests are as in old F-73. "Lone type parameter" points to F-137, which defines it. Moved out: the default of a parameter that numerals alone fix (F-342).
- **F-78.** Meaning: unchanged. Row 507's reason restored ("which the coercion attempt refuses"). Row 559 stated at its ledger scope, every instance at an intersection type. The stale line pointer dropped; the order agrees with `Functionals.scala:1027-1031` (read).
- **F-87.** Meaning: unchanged. The chapter's paragraph and the checker give the same set (`rung-checker-contexts/REPORT.md` sections 1 and 10, by the check). "Application" is now "the call that it desugars to". Cut: the pointers to F-226 and F-70, not about the expected type.
- **F-221.** Meaning: unchanged, the first round's broadening undone: the retry gives a plain-bounded big operator the expected type only where its bound does not fit (old F-221 and old F-59). "Multifix declaration" defined in the sentence.
- **F-59.** Meaning: unchanged. "A sum without generators" and "(P-78)" restored, P-78's own wording. The witness's purpose stated (it picks the identity of `T`). The test `InferBigOperatorUnwritten` is now in F-364.
- **F-364.** Meaning: unchanged. The first round's "is accepted where" overstated; the sentence now says the checker can check the call as written where the big operator alone has an instance (old). "The elements are converted to the instance" and the guard `InferBigOperatorUnwritten` restored. Moved to the history: the one measurement on copies. `MicroGptFlat.fss:38` writes no static argument (read).
- **F-365.** Meaning: unchanged. Restored, as the check required: the arrow type with its own static parameters, the same-name static parameters, and the memo of normalized arrow types (the assessment allowed that clause to move to F-65; F-65 is in another chunk, so it stays here). Rows 1009 and 1010 paired with their outcomes from the ledger. "Untyped binding" given its example, `g = count`. The row-lift sentence says the checker's answer is unmeasured.
- **F-367.** Meaning changed in one clause, to agree with the ledger and F-365. Old: "the compiled checker refuses those forms (row 1021)". New: it refuses the open arrow type and the untyped place, and accepts `Any` (row 1021, "The checker refuses both"; row 1012). Restored: the value's own type, and "for an overloaded `twice` with a generic declaration". Row 1021 marked a design limit against the specification's static error; row 1018 restated from the ledger with its example.
- **F-141.** Meaning: unchanged. D3 and D5 tagged on their rules again, D5 with its candidates (old). Row 616 has its own clause with "which fail the call" (old). Status words to the history.
- **F-242.** Meaning: unchanged. The fusion pairs named again (old). "Commented" is commented-out (`generic-distribute/REPORT.md` section 2); the last sentence now names where the errors go. Conditions read at `FortressLibrary.fss:3704-3706`, the generic at `:3519`.
- **F-248.** Meaning: stated in the present (row 21 fixed, F-253). "Keeps every fused answer" is now "gives the fused answers that the `Any` method gave". The explicit `r.distribute[\L1\](q)` is a commented-out line in `Generator2`, live only in the probe, and fails with an error (`generic-distribute/REPORT.md` sections 1 and 5, by the check).
- **F-285.** Meaning: unchanged, with F-85's `Condition` claim and its row-632 reason joined. "The twelve components" becomes "the components that the distance checks" (fourteen in `run.sh`, the two new ones holding no such form). Restored: the tests `NestedReductionFusion` and `PureListStridedSubscriptWalk`. Row 824's sentence says what goes wrong (a binding declared `List[\Shape\]` refuses the result). `PureList` lies outside `run.sh`'s components (read).

## Decisions not taken

- F-73's ranking sentence: the assessment would move it to F-408, which is in another chunk and does not state it. Kept here.
- F-285's `PureList` sentence: the assessment would move it to F-228, marked keep. Kept here, since it bounds the title's scope.
- F-365's memo clause: the assessment would move it to F-65, in another chunk. Kept here.

## Questions

- For the coordinator: row 589's repair would change which declaration runs. If the curator's decision is still wanted, a review-queue item should name F-141.
- For the coordinator: F-250's pointer to F-85 (identity functions' `cast` and `embiggen`) was wrong before this pass and stays wrong after the merge repoints it to F-285.

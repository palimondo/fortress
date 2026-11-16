<!-- The judge's account of climb batch 32's record-landing (landing 567c36dadc): one line for each change of owed.md that changed a file, by home, with what was held, what goes to the curator and the coordinator, the checks, and what runs next. -->

# The record after climb batch 32's landing

66 changes applied, none held; 27 owed nothing (`owed.md`). `entries-report.md` and `routing-report.md` hold each old and new wording.

## FACTS

- C1, F-53, made false: the sentence that row 731's gap stays open is cut. Ground: row 731 FIXED, `d159b71975`.
- C2, F-240: one clause, the distance stage's 165 s was taken beside `testFast`; no figure changed. Ground: the review, section 4.
- C3, F-58: rows 989, 988 and 474 leave the body; the title and counts stay those of `832f7d0d91`; it says what moved since (lines 82, 41, 77) and that each count is a floor. Ground: `rung-tuple-binding/REPORT.md:104-107`; F-366, F-369.
- C4 to C7, F-59, F-221, F-285, F-341: wording; closed rows 731 and 632 leave; F-285's citations moved by one. No claim changed.
- C10, F-362: row 42 stands at the import list's clause alone; "no test applies the sign to an array". Ground: the review, section 3.
- C11, F-363: "which no test asserts"; why `B.data[5]^2` runs and `B.f()[5]^2` fails. Ground: the review, section 2, S1; `rung-superscript-after/REPORT.md:65`, `:133`.
- C12, F-364: row 1015 named; the base-against-tree counts restated as one observation.
- C13, F-365: the sentence that the model's row lift "has its checker" narrowed to what the test compiles; row 1013 named. Ground: the review, section 3, item 2.
- C14, F-366: a one-sentence title; "P-46 does not word the order, and the worker that built the rule chose subtyping"; the dispatch cache's detail moved out. Ground: the review, finding 2.
- C15, F-367: `pick(twice)` stated as the present behaviour, "no test pins this choice".
- C16, F-368: such a line does not compile, since the code generator has no array literal. Ground: the review, finding 3, by reading.
- C17, F-369: row 1011's whole subject and row 1031 named; row 474 leaves.
- C18, F-280, made false: the title names the `=/=` over `Any`; one sentence on `Equality`'s own `=/=`. Ground: `Library/FortressLibrary.fss:98-103`.
- C19, 28 entries, citations only: F-35, F-44, F-48, F-63, F-78, F-79, F-85, F-121, F-173, F-175, F-235, F-254, F-272, F-276, F-279, F-286, F-302, F-303, F-305, F-306, F-307, F-312, F-324, F-327, F-330, F-332, F-334, F-356. Ground: each old line at the base equals the new line in the worktree.

## POSITIONS

- C23, P-78, made false: "The compiled checker fixes it from neither the generators, the body nor a declared type that receives the value, and refuses every such `SUM` or `PROD` that leaves it out (row 731, a gap of the checker). Row 731's workaround is to write it in every clause form of `SUM` and `PROD`, as in ..." becomes "The compiled checker fixes it from the reduction's expected type, else from the type of its body, where a `SUM` or `PROD` leaves it out (F-364). It is written as in ..."; decision unchanged. Ground: row 731 FIXED, `d159b71975`.
- C24, P-79, made false, cut only: ", and the reductions that leave out the static argument of a big operator whose bound names its own static parameter, such as `SUM`; their repair writes the argument (row 731)" goes; decision unchanged. Ground: row 731 FIXED.
- C25, P-46, made false, cut only: "Rows 973 and 966: walk answers `false` for `u = 0`, and `true` for `u =/= 0`, which follows `=`." goes; decision unchanged. Ground: both rows FIXED, `b190b8eb25`.
- C26, P-173, made false: "rows 973 and 966 hold where walk departs" becomes "row 1016 holds where walk departs, and row 1017 where both paths do"; decision unchanged. Ground: rows.md.
- C20, P-166, a citation: `Library/FortressLibrary.fss:648` becomes `:649`; decision unchanged. P-154 keeps its line: its citations name a commit.

## The ledger

No row changed.

## PLAN

- Rewritten, 11: C38, C43, C44, C46 ("Where we stand"); C48, C50 and the closing paragraph of phase 4 (outside `owed.md`, the same fact as C44); C56, C57; C60, C82.
- New, 12: C47 (climb batch 32's line); C42 (items 86 to 88 under "Pavol's answers"); C88 (three parked lines for sixteen rows); C39, C84, C85, C86, C87 (one line each in the batch's list).
- Built, moved to PLAN-history, 10: C52, C53, C54 (rows 989, 988, 731); C79, C80; the pointers of items 470 and 472 (C64, C68); three lines that pointed to item 51 alone, in the lists of climb batches 8, 14 and 22 (C65).
- Cut to a pointer: 25 lines to 14 pointers (C40, C61 to C63, C69 to C78).
- To read in full: PLAN:13, "Next" (C46), which names no go.

## The review queue

- C39, item 525, reworded, open, consequential: does he confirm fork W, walk has the numeral rule now; default as landed; needed before the next batch.
- C40, item 528, new, consequential: is "the most specific" subtyping; default as landed; needed before the next batch.
- C41, item 529, new, consequential: is rung B's diff to lines 37 to 41 held; default held; needed before the next batch.
- C86, item 545, new, consequential: row 50, the array comprehension; default leave it out; needed with his answer on static sizes. Item 546, new, routine: row 177, `var p = e`; default the rule stays; no planned work.
- C87, items 547 to 550, new, consequential: the model's diffs (`^T` in the helper's api, line 70, line 43 without its type, `∑`); default the model as it is; no planned work.
- C61 to C63, C69 to C78, C84, C85, items 530 to 544, new, routine: the batch's points by rung, the four rulings and the ten small forks; default as landed, except item 539's second part (no default on record) and item 536's first (no row written); no planned work.
- Each "no planned work" above is set by the landing workflow.
- C64, C65, C68, items 470, 51 and 472, moved to (a), "Answered by a landed fix or a closed row": rows 966 and 731 FIXED (`b190b8eb25`, `d159b71975`).
- C66, C67, items 247 and 325, reworded: row 731 leaves; each question stands.
- C89, the head: 217 open, 86 consequential, 131 routine; a group for climb batch 32.

## INDEX and the other notes

No line changed.

## Held

No change of `owed.md` is held. One repair, by the rule of a hold: the routing's fix round for C65 joined two pairs of PLAN lines that it did not mean to touch and dropped a blank line, which failed `plan-moves.py` in `mech-2.md`. I put those four lines and the blank line back from `c0c35b4f9` (the lines on row 559 and rung Q's `unsigned` in climb batch 8's list, on E.worker.2 and R.skeptic.1 in climb batch 22's, and the blank line before climb batch 14's). No word of them differs from the base.

## For the curator

- The POSITIONS changes above, made under his rule of 2026-10-31: P-78, P-79, P-46, P-173, and P-166's citation.
- P-78, a question that the change opens: its requirement asks a reduction to write its argument "where nothing at the call fixes the element type", and the checker now infers it; does it still ask line 43 to write `SUM[\ZZ32\]`? Item 549 holds line 43's diff.
- His word is needed on items 525, 528 and 529 (findings 1 to 3); then 547 to 550, 545 and 546; then 530 to 544.
- Waiting on his answers and unchanged: P-46's sentence on `Any` and P-59 (C27, item 525); P-46's "the most specific" (C28, item 528). F-366's sentence on the worker's choice leaves if he confirms item 528.
- Defaults that the record does not hold: item 539, the index order of a rank-3 literal; item 536, a selector after a superscript.
- Kinds set by the workflow, routine: items 531, 534, 536, 537, 538 (but its part on `pick(twice)`), 539, 540, 541, 542, 543, 546. Consequential from P-87, not stated by the review: 547 to 550.
- "Needed by" set by the workflow: no planned work, items 530 to 544 and 546 to 550.
- No item went to "Answered by a decision of his".

## For the coordinator

- The skill sentences made false or incomplete: `owed.md`, "For the coordinator", first point; and `references/library.md` on row 731, which F-59 and F-364 now contradict.
- The boot note: its "Running" line; "Next" as PLAN:13; `BOOT.md:42-43` are now items 546 and 545; `BOOT.md:51` still says "One run of five rungs". The held list: nothing.
- Departures to confirm: item 525 stays open and not "answered"; items 525, 528 and 529 stand in the head's group "The next batch"; items 86 to 88 stand after 80 to 82; the rulings and the small forks take one item each group; the sixteen rows take three parked lines, row 1005 with the review's own disagreement named.
- Entries past 600 characters that grew: F-58, F-221, F-240, F-280, F-334, F-341, F-362, F-364, F-365, F-367, F-368, F-369, P-173. I applied each: the growth is the clause that its change owes or, in the batch's own drafts, a clause that settles a reading of the cold reader. F-362's sentence on the regenerated parsers (+44) is the least owed.
- Not written, each waiting on a run: F-58's count on the merged tree (review-routed.3); F-367's clause on a declared arrow return type and a field; F-184's case.
- F-366 does not say that walk's half stands at fork W; item 525 names F-366.
- PLAN:768, climb batch 29b's review-routed.2, may be built by `tests/NumeralEqualsNumberWalk`; for the next routing.
- The workflow itself: the routing writer's shell refused `python3`, so its fix round ran no check and broke PLAN's lines; the rest of `owed.md`, "For the coordinator" (the process findings, the landing check's fault, climb batch 31's plan) stands as written there.

## Checks

- cut-only.txt, P-46 and P-79, `words-subset.py`: pass. Over every POSITIONS line: P-78, P-166 and P-173 add words (information).
- `record.py apply final.apply`: pass, 49 entries. No `final.rewrite`, no `rows.add`.
- `record.py check --base c0c35b4f9`: pass.
- `ledger.py check`: pass. `ledger.py landing-check db352c177`: pass, no finding.
- `check-index.sh`: pass.
- `plan-moves.py`: pass; 3 lines to look at, PLAN:12, :91 and :220, which stay (C45, C49, C58).
- `queue-check.py`: pass; 535 items, 23 new.
- `lengths.py`: pass; the 13 entries above grew.
- `git diff --stat`: pass.

## Next

The two commits: the workflow result's `land.commits` gives them as landed on `main`.

`Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/orientation/orientation.js', args: { mode: 'update', out: '/home/user/fortress/explorations/compile-ladder/climb-batch-32/orientation/', stream: 'orientation-b32', facts: ['F-362', 'F-363', 'F-364', 'F-365', 'F-366', 'F-367', 'F-368', 'F-369', 'F-346', 'F-53', 'F-58', 'F-59', 'F-221', 'F-240', 'F-285', 'F-341', 'F-349', 'F-280', 'P-178', 'P-37', 'P-164', 'P-167', 'P-78', 'P-79', 'P-46', 'P-173', 'P-166', 'F-35', 'F-44', 'F-48', 'F-63', 'F-78', 'F-79', 'F-85', 'F-121', 'F-173', 'F-175', 'F-235', 'F-254', 'F-272', 'F-276', 'F-279', 'F-286', 'F-302', 'F-303', 'F-305', 'F-306', 'F-307', 'F-312', 'F-324', 'F-327', 'F-330', 'F-332', 'F-334', 'F-356'] } })`

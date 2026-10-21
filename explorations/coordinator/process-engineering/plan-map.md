<!-- The map of PLAN.md for its consolidation, held for Friday 2026-10-16 after the weekly reset (HELD, 12:46 UTC on 2026-10-14): a Sonnet measurement worker's report of 2026-10-14, read-only, taken from its final text by the coordinator: each section's size, kind and items by status (open, answered, built, stale, rule, undecided), what is held in another home (the review queue, the ledger, the batch records and reviews), the size PLAN would have with only open items, the 15 largest closed or duplicated items, how PLAN grew by date and by kind of commit, and the instructions that add to it (none takes out). Its per-line map was scratch, in the session's scratchpad (`info3.json`), and is not kept here. Every share is an estimate unless marked exact. -->

# PLAN.md mapped for its consolidation

PLAN.md map for Friday's consolidation (read-only; nothing edited or committed; working files only in the session scratchpad).

Units: characters are Unicode characters, 510,030 (510,147 bytes). Item = one line standing alone: 674 non-blank lines, 635 of them 80+ chars, average 755, longest 4,394. Every share below is an ESTIMATE unless a count is marked exact. Status is set per line; a few mixed lines are split by my judgement (marked "mixed" in my map).

Statuses: O open, A answered, B built, S stale, R rule or state in force (no item), U undecided. I added R and U because many lines fit none of your four.

"Duplicated" is given two ways:
- Item-level (dupI): the same claim or question stands in another home. That means a review-queue.md (b)/(c) entry, or a specific (a) entry that restates it, found by its "Home: PLAN:N" line (mapped from PLAN at 046207371 to today's lines). Or a ledger row whose claim the line restates; or at least 70% of a clause's distinctive words standing together in one entry elsewhere (conservative).
- Text-level (dupT): only that last, conservative test. It is the floor.
Pointers are not counted: review-queue "(a) information only" bundles, and RECORD.md "where each is in PLAN".

## 1. Sections (lines | chars | kind | O/A/B/S/R/U % | dupI/dupT %)
```
Preamble (comment, title)          1-6      1,092 provenance        0/0/0/81/19/0 | 13/13
Where we stand                     7-14     1,505 state             0/0/0/12/88/0 | 37/37
The principle for the batches      15-22    2,084 rule (method)     0/0/0/0/100/0 | 20/20
Phase 1. Batch 5                   25-32      744 phase items       0/0/100/0/0/0 | 40/40
Phase 2. Batch 6                   33-54    5,749 phase items       0/0/100/0/0/0 | 40/40
Phase 2b. Repair batch             55-60    2,791 phase items       0/0/100/0/0/0 | 21/21
Phase 3. Checker at a true zero    61-157  92,287 batch lines+rows  21/1/73/4/0/0 | 63/42
Phase 4. The switch-over           158-171  7,563 phase items       92/7/0/0/0/0  | 19/18
Phase 5. microGPT compiles         172-189 10,525 phase items       94/0/6/0/0/0  | 73/46
Phase 6. microGPT fast             190-195    918 phase items       97/0/0/0/3/0  | 45/45
Pavol's answers (items 1-53)       196-363 86,431 curator questions 20/28/49/0/3/0| 79/26
Work that can start now            364-421 28,354 script/workflow measures 5/0/53/1/8/33 | 26/26
Off the path, parked (own lines)   422-503 63,280 parked, routed lines 48/8/11/33/0/0 | 71/19
 N first run list                  504-520  6,965 review list       43/12/6/28/10/0 | 71/38
 6.5b list                         521-537 10,715 review list       41/0/12/41/5/0  | 73/21
 7b list                           538-576 20,303 review list       63/0/21/15/1/0  | 78/23
 8 list                            577-614 23,450 review list       53/9/24/12/1/0  | 79/21
 9 list                            615-649 26,582 review list       74/12/2/11/1/0  | 93/30
 10 list                           650-680 22,644 review list       36/0/43/19/1/0  | 83/16
 11 list                           681-700 16,515 review list       59/10/25/4/2/0  | 89/24
 12 list                           701-722 24,257 review list       80/0/17/2/1/0   | 82/18
 13 list                           723-750 23,603 review list       73/9/15/3/1/0   | 85/24
 14 list                           751-775 21,745 review list       64/31/4/0/1/0   | 20/20
Rule for every edit (2026-09-17)   776-792  3,616 rules kept        0/0/0/0/100/0 | 20/20
Testing techniques                 793-804  1,780 rules kept        0/0/0/0/100/0 | 4/4
Stop conditions                    805-810  1,544 rules kept        0/0/0/0/100/0 | 16/16
What the order of 2026-09-26 replaces 811-830 2,974 history         0/0/0/98/2/0  | 12/12
```
"Off the path, parked" with its ten lists (422-775) is 260,059 chars (O58 A8 B16 S16 R2; dupI 75, dupT 22). The ten lists alone are 196,779 chars (38.6% of PLAN).

How the evidence breaks down:
- **Phases 1, 2, 2b:** built. Batches 5, 6, 6.5 and 6.5b landed (line 53; the `climb-batch-*/RECORD.md` files exist).
- **Phase 3 rows:** each "Row N, for the next ... rung" line is judged by its ledger row, which is FIXED for most (annotated with `ledger.py`). The open ones are rows 480, 487, 488, 547, 551, 555, 591, 592, 612, 616, 645, 665 (abstract half), 678, 680, 681, 685-691, 695, 706, 707, 709, 710.
- **Phases 4-6:** open phase work. Each code-generation row line restates its ledger row (rows 564-566, 571, 573, 594, 624, 643, 533, 578, 579 checked).
- **Pavol's answers:** items 1-12, 14-16, 19, 22-27, 30, 32 and R1-R11 are answered (P-39, 40, 41, 45, 48, 59, 60, 73-80, 89 and others; the item says so). Items 15, 18, 20, 33-36, 39-42, 44, 47-48, 50-51 are built (P-48 → a1b5c253d, P-147 → f9fe5c874, 27cb9e93b, b872d65a1, 74b28e9d4). Open: 12 (second part), 13 forks 2-6, 14, 17, 31, 37, 38, 43, 45, 46, 53. Item 37: P-75 itself says "It waits as PLAN item 37".
- **Review lists N-13:** 87% of their chars are lines that review-queue.md already sorted into (b) 50 consequential, (c) 122 routine or (a) 76 settled. Its header says "PLAN's nine batch lists hold 202 entries: 32 in (b), 95 in (c), 75 in (a)". That whole sorted file is 99K, half the 197K of the lists.
- **Batch 14 list:** not yet sorted into the queue. Seven items rest on "the coordinator's call (2026-10-14, by his rule of 00:12 UTC)", not a POSITIONS entry (lines 625, 321, 755, 756, 759, 763, 771; 9,823 chars). The numerator item says "Accepted by him on 2026-10-14".
- **Contradictions with other homes:**
  - Lines 145-154 say "Batch 15, its record not yet drafted", but CLIMB-BATCH-15.md was drafted at 94b5aaf83 and BOOT.md says the run launched at 10:53 UTC. Marked stale, as is the "Next" bullet.
  - Line 766 (gather.1) is built (3662c84e2).
  - Line 413 is built (9d97fc506).
  - Line 412 is built (pending-script-edit.md header: applied 10-09).
  - Line 417 is verified open (STAGE_BLIND at climb-batch-workflow.js:659-660 lacks `interpreter/env/`).
  - HELD.md still lists PLAN's "Asked 2026-09-27" questions as waiting, while review-queue (a) records them answered.
- **Dangling pointers:** PLAN cites POSITIONS by date 80 times ("POSITIONS 2026-09-29, ..."). POSITIONS is now dateless and numbered, so those need POSITIONS-history.

## 2. Totals
- **By status:** O 207,077 (40.6%) | A 47,503 (9.3%) | B 176,027 (34.5%) | S 50,408 (9.9%) | R 19,522 (3.8%, includes blank lines) | U 9,493 (1.9%). Closed (A+B+S) is 273,938 (53.7%).
- **Open, split:**
  - 28,431 consequential, review-queue (b);
  - 90,190 routine, review-queue (c), "kept as landed unless he says otherwise" (this includes 11.8K of batch 14's list, classed routine by me);
  - 88,456 other (phase items, curator questions, workflow measures).
- **Items by dominant status** (635 items): O 236, B 170, S 88, R 66, A 59, U 16.
- **Duplicated, item-level:** 344,062 (67.5%).
  - Via review-queue entries: 230,263 chars.
  - Via a ledger row's claim: 79,942 chars.
  - By status: O 180K, B 115K, A 27K, S 16K.
  - Closed and duplicated: 158K. Closed and held nowhere else: about 116K; that is the part to move to a history file, or to check in the rung RECORD and REPORT files.
- **Duplicated, text-level (floor):** 136,550 (26.8%). By home, overlapping clause characters: CLIMB-BATCH-*.md 57.8K, ledger 41.7K, post-batch reviews 34.4K, RECORD.md 23.7K, review-queue 14.1K, FACTS 4.7K, POSITIONS 3.8K, fortress-repo skill 2.9K, coordinator skill and manual 2.5K, BOOT/HELD 0.3K.
- **Size with only open items left (ESTIMATE):** open items not held elsewhere keep their text: 30.4K. The 210 open items held elsewhere become pointers of about 120 chars each: 25.2K. Total about 56K (11%).
  - With rules/state (R) and undecided (U) kept: about 85K.
  - If the routine (c) items count as settled by default: about 33K, or about 62K with R and U.
  - The open text held nowhere else is mostly the batch 14 list (13.9K), Phase 4 (6.0K), Phase 5 (4.3K) and Phase 3 (4.3K).

## 3. The 15 largest closed or duplicated items
Home abbreviations: RQ = review-queue.md, P-n = POSITIONS, hashes are commits (all exist).

| # | Section, first words | Chars | Status; other home | Evidence |
|---|---|---|---|---|
| 1 | Answers, "20. The bound `Object` that climb batch 7's rung B wrote" (L223) | 4,395 | built; RQ (a) "Item 20", P-48 | a1b5c253d drops the three written bounds (diff checked) |
| 2 | Answers, "36. Whether an `if` without `else`..." (L275) | 4,071 | built; RQ (a) "Item 36" | 27cb9e93b; row 560 notes |
| 3 | Batch 12 list, "gather.2, from climb batch 12's gather" (L714) | 3,886 | open, routine; RQ c165 (review-queue.md:836), batch 12 RECORD | ledger-tool routes |
| 4 | Phase 3, "10. **Batch 12**" (L118) | 3,681 | built; text 50% in batch-12-review.md, CLIMB-BATCH-12.md | landed 32b88cd3b |
| 5 | Answers, "51. Q1 of climb batch 12's rung W" (L313) | 3,413 | built; RQ b14 (:111), P-147 | f9fe5c874; review-queue.md:18 "Answered 2026-10-13" |
| 6 | Answers, "26. The specification's passages that read a `comprises`..." (L241) | 3,352 | answered; P-60; 29% text in CLIMB-BATCH-7.md | decided 2026-09-29 |
| 7 | Batch 9 list, "Decision D2 of climb batch 9's rung W" (L625) | 3,279 | answered by coordinator's call; RQ b17 (:131), ledger row 424/645 | L755: "review-queue item 17 is settled by P-48" |
| 8 | Answers, "34. The order of the compiled checker's attempts" (L271) | 3,255 | built; P-49; 28% in batch-N review | row 508 FIXED, f3032eed8 |
| 9 | Answers, "52. **Landed** 2026-10-10 outside a batch" (L317) | 3,137 | built 60%, open 40%; RQ (a) item 52, b31 (:220) | 13b record |
| 10 | Phase 3, "9. **Batch 11**" (L114) | 2,982 | built; text 54% in batch-11-review.md, RECORD.md | f9d3ec826 |
| 11 | Answers, "48. Does a `label` expression's body..." (L305) | 2,924 | built; RQ (a) item 48, P-50, P-51 | 054c4bcfd, 0856f3e6a |
| 12 | Phase 3, "12. **Batch 14**" (L133) | 2,731 | built; text 54% in batch-14-review.md, CLIMB-BATCH-14.md | 7c2c7cd4b |
| 13 | Answers, "18. Row 447" (L262) | 2,726 | built; ledger row 447 restated | row 447 FIXED (f3032eed8) |
| 14 | Phase 3, "11. **Batch 13**" (L122) | 2,603 | built; text 48% in review, RECORD, CLIMB-BATCH | 738904f9a |
| 15 | Off the path, "The distance stage's `classify.py`..." (L492) | 2,476 | built; RQ (a), batch-9-review.md | 9d24290fb, row 577 |

## 4. How it grew
Net growth by commit kind. 156 commits touch PLAN (git log --follow). Added 1,016,574 chars, removed 506,544, net +510,030. Over half of everything ever added was later rewritten away.
```
kind (n)                        added    removed   net
rung/gather commits (58)       301,134    86,280  +214,854  (51 rung commits that write items for the curator
                                                   into PLAN: +205,443; 3 gather records +4,701; 4 judge/review repairs +4,710)
landing routing (17)           433,850   207,736  +226,114
review corrections fold (12)    43,353    23,161   +20,192
coordinator's own edits (46)    84,516    60,835   +23,681
record upkeep (11)             119,291   117,893    +1,398  (10-13 renumbering and citation repoints, churn only)
other (12)                      34,430    10,639   +23,791  (first plan, rewrite 09-26, script splices)
```
In your four kinds, by net: gather plus its review fold 235,046 (46%); routing 226,114 (44%); coordinator 23,681 (5%); other 25,189 (5%).

Net by date (all kinds). Landings, in bold, are 92.5% of all growth:
- 09-17 to 09-27: +30,730.
- **09-28 +62,179** (gather 38.6K, routing 26.7K).
- **09-29 +83,197** (gather 30.7K, routing 46.0K).
- **09-30 +28,615.**
- **10-02 +43,779.**
- **10-03 +79,758.**
- 10-04 and 10-08: +1,332 together.
- **10-09 +133,931** (batches 11, 12 and 13 landed the same day; routing 73.0K).
- 10-10 +3,980; 10-12 +1,011; 10-13 +1,039 (gross 117,319, churn only).
- **10-14 +40,479** (batch 14: gather 12.7K, fold 3.2K, routing 23.6K; gross 70.8K).

By month: September +204,721 (gross 382,257); October +305,309 (gross 634,317).

Origin of today's text (git blame -w, ignoring the three mass-rewrite commits): routing 249K (49%), rung/gather 162K (32%), coordinator 53K (10%), review fold 23K (5%), other and upkeep 23K. Phase 3's 92K is 85K routing-origin because each routing pass appends "Fixed by climb batch N's rung X" to old lines. 55 lines (79,519 chars) carry such a fixed/built note; 22 (42,157 chars) say "Answered".

### Instructions that add to PLAN
- gather's rung commits and records: `climb-batch-workflow.md:163` "**Items for the curator.** The gather puts every item a rung, skeptic or judge returned into `PLAN.md`, under "Pavol's answers, in the order they are needed" when work waits on it, else under "Off the path, parked"." Also `climb-batch-workflow.md:33` (commits "the FACTS, PLAN and handover lines") and `climb-batch-workflow.js:1059,1123,1125` (`PLAN_RULE`, step 4 of the gather).
- review: `climb-batch-workflow.md:179` "6. The items for the curator, in `PLAN.md`."; `:184` "A finding settled by tests and records only it routes to the next batch, as `review-routed.N` in `PLAN.md`, with no judge."; `.claude/skills/coordinator/references/batch.md:83` "5. File what the review finds in PLAN."; script `:1199`, `:1217`.
- landing routing: `climb-batch-workflow.md:273` "2. The routing: every open row, record default and item for the curator filed with a batch or as a parked line of `PLAN.md`."; `.claude/skills/coordinator/SKILL.md:47` (PLAN's "listed for his review" under each batch) and `:173` ("the review lists"); `batch.md:34` (the batches run "in PLAN's order").
- coordinator's own edits: `.claude/skills/coordinator/references/road.md:3` "Keep every open question there, in the order it needs deciding, and none only in your context."; `road.md:18` (parked research). `climb-batch-workflow.md:160` retires the handover file into PLAN's first section.

### Instructions that take content out of PLAN
**None found** in the coordinator skill, the manual, or the script. The only dedupe is `climb-batch-workflow.js:1059`: "An item PLAN.md already holds is not written again: name that entry. Several items on one point make one entry." Contrast the record: FACTS and POSITIONS have `record.md:48` ("Run the pass when a worker finishes"), `record.md:64` (a consolidation "before each batch launches") and `climb-batch-workflow.md:274` ("superseded text moved to `FACTS-history.md`"). PLAN has no pass, no history file (only the one for "Where we stand"), and no rule to drop a closed item. The routing step marks stale lines (commit subjects "the stale lines") rather than removing them.

### Why it accumulates
1. Three roles write to it at every landing: the gather per rung, the review, and the coordinator's routing.
2. Nothing removes closed items, so a landed batch's line, its sub-bullets and its list stay.
3. The same item is also written elsewhere: ledger row, rung REPORT/SKEPTIC, RECORD, post-batch review "For Pavol", review-queue. PLAN's version is the longest of them.
4. Removal is costly:
   - review-queue.md has 229 `PLAN:N` line references (already shifted since 046207371).
   - 313 `PLAN.md:N` references are spread over 40+ files.
   - The script reads two PLAN heading names (`PLAN_SECTIONS`, js:1058, checked at :1076).
   - Batch briefs cite "Climb batch 14, listed for his review" (js:144, 204).
   - `SKILL.md:195` reads "its first section" at boot.

## 5. Could not decide
- U bucket, 9,493 chars: workflow/script measures from old reviews (lines 375-377, 380-386, 392, 394, 396 in part, 407-409, 416, 419). The script was redesigned on 2026-10-08, `stopsMet` is gone and the cited `climb-batch-workflow.js:NNNN` lines no longer resolve. Settling each needs a read of the 231K-char script. I verified only 412, 413 and 417.
- Routine (c) items are counted open because review-queue calls them "kept as landed unless he says otherwise". Counted settled, open falls from 207K to 117K.
- Review-queue's classes are as of 2026-10-10; it was updated on 10-14 only for items 1 and 14. Later landings may have closed other (b)/(c) entries beyond the rows I checked.
- Line 424 (revival-story page) is marked stale only from version numbers (v16 in PLAN, v21 in BOOT.md).
- Seven "answered" items rest on the coordinator's call, not a POSITIONS entry; you may not count them as answered.
- Item-level duplication counts the whole PLAN line when its question or status stands elsewhere. PLAN lines are often longer than the review-queue entry (D2: 3,279 vs about 1,150), and the surplus is evidence that also lives in the rung REPORT files.
- Rows 638 and 642 are fixed in the tree but open or CONTESTED in the ledger; I followed the item text.

Per-line map (status, evidence, duplicate flags) for the consolidation: `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/info3.json`. It is scratch, not a deliverable.

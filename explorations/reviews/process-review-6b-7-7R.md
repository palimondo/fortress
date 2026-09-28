<!-- Did the process changes of 2026-09-27 (a mission briefing per rung read first by every role, the skeptic's checks of the library's way, the ledger and sibling sites and the decisions on record, items for Pavol routed into PLAN.md) produce the results they were made for, in the climb batches run since (6b, 7 and 7R), and can the post-batch conformance review stop? Measured against the two notes that prompted the changes, worker-global-decisions.md and worker-context-cost.md, with their definitions and scripts; their figures are cited, not re-measured. Written 2026-09-28 by a read-only review worker at Pavol's request: nothing built, no Fortress program run, batch 7C's run not read. Transcripts read only through bounded scripts. Scripts and captures in process-review-6b-7-7R/. -->

# The process changes of 2026-09-27, measured on batches 6b, 7 and 7R

## The answer

- **Every worker and skeptic now reads its briefing.** All 17 ran it, 11 of them as their first or second tool call. Judges and review repairs did too. The map now reaches 11 of 17 (65%), against 25 of 58 (43%) in batches 3 to 6 and 2 of 12 in batch 6. INDEX reaches 5 of 17, against 2 of 58.
- **The briefing did not replace the agents' own searching.** Searching the tree stayed about a quarter of what an agent costs (23%, against 24%). The briefing added another 9% of the cost on top. Per turn, agents searched about a tenth less.
- **The briefing is bigger than planned.** A rung worker's briefing was 54K tokens on average, not 29K. Read first and re-read every turn, it cost 1.0M ITE per rung worker over its run (ITE, input-token equivalents: tokens weighted by their price, so a cached re-read counts a twentieth of a fresh token), about three times the 358K the cost note projected. A skeptic's slice was cheaper than projected (132K, against 176K).
- **What improved the outcome is the skeptic's new checks.** Skeptics caught 12 of the 17 local misses found inside the batches (the library's own way, the ledger, sibling sites, decisions on record), against 6 of 20 in batches 3 to 6. The merged-diff reviews and judges caught 4 more.
- **Having the record in hand is not using it.** 5 of those 17 misses were of a decision or fact printed in that rung's own briefing. The skeptic caught 4 of them and a review judge the fifth.
- **The kind of miss has not changed.** The same four kinds as before. More were found per rung (2.8 against 1.1), because the skeptics now look for them by name and every batch had a later review; the counts are not like for like.
- **What landed, and what reached you late.** 5 misses landed: 2 reversible design choices routed to your list at the landing, and 3 found only by the later reviews. Batch 6b's items for you never reached the plan, because its script predated the routing step; since batch 7 every structured item reaches it. Lists written outside the structured field still do not (7R's defaults and its rungs' "comes back to Pavol" lists).
- **Re-measuring.** No brief told a worker to verify the record. But the rule that a rung records its failure before its edit made four rungs re-run distance tables the last gate had measured on a byte-identical library: four runs, 87 minutes of machine time, every total identical to the record's.
- **The conformance review cannot stop yet.** The two reviews of these batches cost 6.0M ITE, 4% of what the three batch runs cost, and found 15 points beyond the batches' own checks:
  - 3 local misses no check in the batch caught (0.5 a rung; batch 5 had 0.67);
  - 10 things that fall between batches: rows and items with no batch, a question placed after the batch that decides it (item 25, which decision D's model lines rest on, now before batch N);
  - 2 routes to you that do not exist.
  None blocked a push and none touched a line of the model.
- **What would let it stop:** a routing step at each landing that gives every open row, default and list a batch or a parked line, and puts new rows into the drafted records of later batches. It would have caught about 12 of the 15. After two batches where the review finds nothing that step would have caught, the review can run less often. That is your call (POSITIONS 2026-09-27, reviews after a batch).

## What changed, and which batch ran with what

- **The changes** (`coordinator/POSITIONS.md:124-126`, 2026-09-27; `coordinator/climb-batch-workflow.md:17-21`, `:27`, `:39`, `:53`, `:63`):
  - each rung gets a briefing from the record, printed by `facts-extract.sh`; the rung worker reads all of it, the skeptic, repair and judges the `checks` slice;
  - step 1 of a rung worker is that briefing, worded as a mission briefing;
  - the skeptic's checks 11 and 12 search the ledger and sibling sites and hold the landed text to the decisions on record, and check 5 has it look for the library's way itself;
  - the gather routes every item for Pavol into `PLAN.md` (step 5).
- **Which batch ran with which**, from the commits and each agent's prompt (`process-review-6b-7-7R/prompts.txt`):
  - Batch 6b (rung O, 2026-09-27 08:42 to 14:39 UTC) launched on `5c368175f`. It had the per-rung briefing and the checks slice (`7feff615d`, 07:22). It did not have the mission wording or checks 11 and 12 (`2bfe8f055`, 09:14), nor the routing step (`e84094959`, 09:28). The markers "mission briefing" and "sibling" occur in none of its prompts.
  - Batch 7 (rungs B, H and A; landed 2026-09-28 04:05 UTC) and batch 7R (rungs J and U; 04:32 to 11:59 UTC) had all four.
  - None ran under principle 5's wording on re-measuring (`75b87fee3`, 2026-09-28 07:12), written after both briefs.

## Sources and method

- **Transcripts.** `subagents/workflows/` of this session: batch 6b `wf_08949b8a-a21` and a second launch of rung O cut after six minutes, `wf_2da3e152-2d5`; batch 7 `wf_8a018276-f71`; batch 7R `wf_568733d7-19c`, where rung J was killed (exit 137) and relaunched. 42 agents, every one on the same Opus tier. Roles are the journal's `started` labels.
- **The scope of each comparison is the baseline's.** "Workers and skeptics" are the rung, repair and skeptic agents, cut launches included, as in both notes: 17 here (8 rung workers, 2 repairs, 7 skeptics). Judges, review repairs, reviews, gathers, gates and commits are reported apart.
- **Cost, reused unchanged** from `worker-context-cost/`: `parse.py`, `classify.py`, `calibration.json` (0.41 tokens per result byte plus about 107 a result) and `measure.py`'s billing. ITE are input-token equivalents: every result is billed on every later turn at that turn's cache-read, cache-write or input rate. Nothing was re-fitted.
- **Two extensions** (`process-review-6b-7-7R/measure.py`), both forced by the change:
  - a fifth category, the briefing: a call that runs `facts-extract.sh`, a later read of the scratch file it wrote (agents redirect it to `brief1.txt` and read that back), the harness's saved copy of either, and a later launch's read of an earlier launch's saved briefing;
  - `CLIMB-BATCH-7R.md` counted as a batch record, as `CLIMB-BATCH-7.md` is.
- **Who read what** is counted from tool calls: a direct read is any reading call naming the file; "through the briefing" is a `map:`, `index:`, `positions:` or `ledger:` key, or a bare FACTS title, in the agent's own `facts-extract.sh` calls (`briefkeys.txt`).
- **Findings** use the baseline's definition unchanged (`worker-global-decisions.md`, "Terms"): a choice that contradicts the plan, the library's practice for the same family, the specification elsewhere, a decision on record or something already on record, or a device invented where the library has one, or a decision taken inside a rung that was Pavol's. Each was read at its source: every rung's `SKEPTIC.md`, rung O's `JUDGE.md`, the three `RECORD.md` files with their reviews, the three `JUDGE-review.md` files and 7R's `REPAIR-review.md`, and the two Fable reviews of the batch records. The later conformance reviews, `batch-6b-7-conformance.md` (`bf7e08a45`) and `batch-7R-conformance.md` (`696f949eb`), were read after the in-batch count was made. "Other" findings are counted from the corrections lists and rounded.

## 1. What the agents read

From `process-review-6b-7-7R/summary.txt`, sections 1 and 2.

- **The briefing.**
  - Workers and skeptics: 17 of 17 ran it. 16 read every part the tool announced. The exception is the repair round that did 6b's work: it skimmed an earlier launch's saved copy by its headings. Rung O's third part ran through a helper script, which the script's part count misses.
  - As the first or second tool call: 11 of 17. The other six (rung O's two launches, rung J's two, rung U, the second 6b repair) read the batch record or the branch's state first, and reached the briefing within ten calls.
  - Judges: 4 of 4, three of them as their first call. Batch 7's review judge read its slices rung by rung, after 18 calls of its own, and left one call's second part unread.
  - Review repairs: 3 of 3. Reviews, gathers, gates and commits are not asked to, and did not.
- **The knowledge base, by agent**, through the briefing or directly, against the baseline's 58 workers and skeptics of batches 3 to 6 (`worker-global-decisions.md`, "What the agents read"):
  - map 11 of 17 (65%), against 25 of 58 (43%) and batch 6's 2 of 12. All 8 rung workers got map sections through their briefing, 6 of them also opened a map file. The skeptics' and repairs' slices carry no map key, and 3 of those 9 opened one;
  - INDEX 5 of 17 (29%), against 2 of 58;
  - FACTS 17, POSITIONS 16, the ledger 17 and `Library/` 17 of 17, against 37, 38, 56 and 53 of 58.
- **What the agents still read themselves**, per worker or skeptic, against the baseline's Opus 5.5 column (`worker-context-cost.md` section 1, "What the gathering read"):
  - the batch record: 4.0 calls, 52K bytes, 371K ITE, against 2.7, 28K and 110K. The records grew: `CLIMB-BATCH-7.md` is 248K bytes and `CLIMB-BATCH-7R.md` 136K;
  - other records (the ledger, reports, reviews, POSITIONS): 58K bytes and 377K ITE, against 52K and 198K;
  - FACTS, INDEX and the maps opened directly: 5K bytes and 13K ITE, against 8K and 34K;
  - source 19K bytes, against 42K; the library 28K, against 19K. These batches were mostly library rungs, so this is the work as much as the briefing.

## 2. What reading cost

From `summary.txt`, sections 3 to 5. Means per agent; the baseline's Opus 5.5 rows of `worker-context-cost.md` section 1, and its projected briefing cost (`worker-context-cost/summary.txt`, column `briefI`).

- **Workers and skeptics, 17 agents.**
  - Whole cost 5.89M ITE, against 3.05M. The runs were longer: 165 turns, against 136.
  - Searching (the baseline's "gathering"): 1.35M ITE, 23% of cost, against 746K and 24%.
  - The briefing: 80K bytes, 538K ITE, 9% of cost, against a projected 237K and 8%.
  - The two together: 32% of what these agents cost.
- **Rung workers, 8.**
  - Whole 9.77M, against 5.47M; 229 turns, against 212.
  - Searching 2.45M ITE, 25% of cost, against 1.72M and 31%.
  - The briefing: 97K to 181K bytes, 54K tokens on average (rung J's 76K), against the 29K planned. It cost 1.02M ITE, 10% of cost, against a projected 358K and 7%. A briefing token read first was paid 10 to 32 times over a full run.
  - Searching before the first edit or probe: 28% of the searching calls and 60% of their cost, against 41% and 71%. The briefing took the place of some early orientation.
- **Skeptics, 7.** Searching 459K ITE, 16% of cost, against 309K and 17%. The briefing slice: 37K bytes, 132K ITE, 5%, against a projected 176K and 10%. The slice without `--common` is what made it cheaper.
- **Per turn**, workers and skeptics: 0.45 searching calls and 1.36K bytes, against 0.54 and 1.5K (`worker-context-cost.md` section 3). About a tenth to a sixth less.
- **Totals.** The 17 workers and skeptics cost 100M ITE: searching 22.9M, the briefing 9.2M. All 42 agents cost 139M, the briefing 9.8M of it (7%). Batch 6b's run cost 24.7M, batch 7's 69.5M and 7R's 44.7M (`review_cost.txt`).
- **Against the cost note's reading.** It priced the briefing at 1.5% to 6.5% more than the searching it could remove, and Pavol answered that its worth is in the local decisions it prevents (`worker-context-cost.md`, "How to read these numbers"). Measured now: it removed about a tenth of the searching per turn and added 9% to the cost. Whether it prevented misses cannot be seen directly. What can be seen is in section 4: the misses of things printed in the briefing.

## 3. Findings by batch

Numbered on from the baseline's 39. Kind, who caught it, source, and whether it landed. "In hand" means the item missed was printed in that rung's own briefing (`briefkeys.txt`).

- **Batch 6b** (rung O):
  40. O's first skeptic called numeral-only arithmetic silent in the specification and proposed home 3; `constant.tex:44-51` and `:123-133` settle it, and it is ledger row 325 measured again. *Specification elsewhere; the judge.* `compile-ladder/rung-overflow-natives/JUDGE.md:179`. Not landed.
  41. O's second skeptic, and the gather after it, left the compiled prelude's `MIN # 0` with a note on row 453 instead of a gated test, because "the prelude leaves at the switch-over". The home rule (`POSITIONS.md:34`) gives a settled defect a test, and rung O's own judge had put row 453 in home 2. *Batch rule; merged-diff review, ruled by its judge.* `compile-ladder/climb-batch-6b/JUDGE-review.md:109`. Repaired before the push.
- **Batch 7, rung B:**
  42. B wrote that three variation sites were shown by no distance table before its edit, so a reserved stop was met. Tables on file show all three. *The record not searched, partly in hand (the triage note was in its briefing, its tables not); skeptic.* `compile-ladder/rung-result-bounds/SKEPTIC.md:88`. Withdrawn; the false stop never reached Pavol.
  43. B left a sibling of row 421's slip in the file it edits, the unary `BIG MAX` declared `(T,T)` (`Library/FortressLibrary.fss:3195`). *Sibling site; skeptic.* `:42`. Row 472.
  44. B named row 457's defect for user comprehensions and missed the library's own instance its edit makes ill-typed (`Library/List.fss:179-180`). *Sibling site; skeptic.* `:91`.
- **Batch 7, rung H:**
  45. H missed the library's own device for a partial order that also has `MIN` and `MAX`, and took `TotalComparison`'s shape without putting it as a fork. POSITIONS 2026-09-24 ("a fork put to him names the library's own way first") was in its briefing. *The library's own way, in hand; skeptic.* `compile-ladder/rung-exclusion-remainder/SKEPTIC.md:51`, `:110`. Landed as shape (a); `PLAN.md` item 22.
  46. H opened a row that repeats row 407. *Ledger; skeptic.* `:77`.
  47. H's list of ways for `AnyIntegral`'s clause left out the team's 2008 clause, which a FACTS entry in its briefing names. *The team's own way, in hand; skeptic.* `:108`, `:168`.
  48. H wrote that `SQCAP` is not on batch 8's list; the triage note puts it in batch 8's class. *The record; skeptic.* `:169`.
  49. H did not cite row 341 for the load refusal its sketch way meets. *Ledger; skeptic.* `:171`.
  50. H's worker and skeptic called typecase's binding form settled. The section's revision note against the implementers' grammar is the conflict POSITIONS 2026-09-23 and 2026-09-27 settle toward the implementers; the first was in H's briefing, and rung tryatomic had read the note that way. The merged-diff review missed the weighting too. *Decision on record, in hand; the review's judge.* `compile-ladder/climb-batch-7/JUDGE-review.md:82`. The record corrected before the push; `judge-review.1` parked.
- **Batch 7, rung A:**
  51. A put `fill` and `tabulate` at the diamond's meet, not in the leaf traits answer 10 names, and reported it itself as its decision D1 with the measurement behind it. *Pavol's decision, self-reported; the skeptic judged it no contradiction.* `compile-ladder/rung-tabulate/SKEPTIC.md:142-146`. Landed; a parked `PLAN.md` line for him to confirm.
- **Batch 7R, rung J:**
  52. J wrote that a `BR` site varies from run to run; the FACTS entry in its briefing ("The true distance to the switch-over", rung B's finding) says the family is identical between runs of one setup. *The record contradicted, in hand; skeptic.* `compile-ladder/rung-ranges-zz32/SKEPTIC.md:243`.
  53. J's count of checker names missing from one world stopped at three; there are five more in the other direction. *Sibling sites; skeptic.* `:245`.
  54. J gave row 478 home 3 for a silent specification; `overloading.tex:100-107` settles it, and answer 9 is the reason. *Specification elsewhere; skeptic.* `:246`.
  55. J's skeptic, and the gather after it, left rows 481 and 482 without the gated tests the skeptic's own table gave them, on the argument batch 6b's judge had rejected the day before. *A ruling on record and the batch rule; merged-diff review, ruled by its judge.* `compile-ladder/climb-batch-7R/JUDGE-review.md:44`, `:76`. Repaired before the push.
- **Batch 7R, rung U:**
  56. U put its `nat` question to Pavol without his decision of 2026-09-27 on a size's range, which was in its briefing, and without measuring the compiled path. *Decision on record, in hand; skeptic.* `compile-ladder/rung-spec-ranges/SKEPTIC.md:75`. Corrected; `PLAN.md` item 25.
- **Found only by the later conformance reviews**, rung-level:
  57. Rung O's own site count named ten more natives in the four files it edits, and no open row holds them (row 379 is closed). Batch 6.5 fixes one and leaves its 64-bit twin. *Sibling sites and the ledger.* `reviews/batch-6b-7-conformance.md:296`.
  58. U framed item 25 as a range's bound. The team's checker gives a size used as a value the numeral's type (`KindEnv.scala:67-68`), batch N decides it in code, and decision D's diff rests on one reading of it. *The team's own way.* `reviews/batch-7R-conformance.md:123`. Moved before batch N.
  59. U changed two notations, the factorial property and the midpoint, without weighing the compiler library's `floorAverage`, and its list for Pavol named neither, though the batch record said they come back to him. *The library's own device.* `:130`.
- **Judge-side**, not counted above: rung O's judge gated only the split of row 453 and left the prelude's `#` (item 41's gap; `climb-batch-6b/JUDGE-review.md:115`). Two judges took decisions and listed them for Pavol: batch 7's review judge on the binding form's home, and batch 6b's on `MAX # 1`.
- **Other findings**: about 25 in batch 6b, 30 in batch 7 and 25 in batch 7R. Most are record slips and new defects the skeptics measured.

## 4. Totals against the baseline

- **Found inside the batches: 17 in 6 rungs, 2.8 a rung.** The baseline's Opus 5.5 rungs: 20 in 18, 1.1 a rung; Opus 5: 2.1. With the later reviews' 3, it is 20 in 6 rungs, 3.3 a rung. Detection is not like for like: the skeptics now search for these kinds by name, and every batch here had a later review, where the baseline had one of five.
- **Kinds, all 20** (the baseline's kinds in brackets, Opus 5.5):
  - the library's or the team's own way missed: 4 (45, 47, 58, 59) [5, with the same family];
  - the ledger or the record not searched or contradicted: 5 (42, 46, 48, 49, 52) [4];
  - a decision or ruling on record contradicted or not used: 4 (50, 51, 55, 56) [5, plus Pavol's decision 1];
  - sibling sites left: 4 (43, 44, 53, 57) [with the same family above];
  - other: 3, specification elsewhere (40, 54) and a batch rule (41) [specification 1, batch rules 3, the plan 1].
- **In hand and missed: 5 of 17** (45, 47, 50, 52, 56), 6 with 42's partial case. The baseline expected a briefing to prevent about a third of such misses and not the contradictions of a decision already quoted (`worker-global-decisions.md`, "Cases, Opus 5.5 era"). Here the briefing put the decisions in hand, and the misses of them remained.
- **Who caught them**: skeptics 12 (60% of the 20, against 30%); rung judge 1; merged-diff reviews and their judges 3; the worker itself 1; the later conformance reviews 3.
- **Checks 5, 11 and 12 at work.** H's, A's and J's skeptics wrote them as named sections ("The ledger and the sibling sites", "The decisions on record", "a device the rung did not list"); B's and U's covered them under precedent and the diff. They produced 10 of the skeptics' 12. They missed 50 (H's own check 12 read the binding form as settled) and 55 (J's skeptic wrote the missing test as optional).
- **Escaped every check in the batch: 3 in 6 rungs, 0.5 a rung.** Before 09-17: 0.75; batch 5: 0.67 worker-side, 1.3 with its judges. Small samples; the rate has not clearly fallen.
- **Severity.** Nothing touched a line of the model. The worst is 58: a question for Pavol placed after the batch whose code would answer it, with decision D's model lines resting on one reading.

## 5. What landed, and what reached Pavol late

- **Landed: 5 of 20**, against 3 of 20.
  - 45 (`TotalComparison`'s shape) and 51 (A's placement): reversible choices, each routed into `PLAN.md` in the landing commit.
  - 57, 58 and 59: found after the landing by the conformance reviews, which name a home for each.
- **Routed at the landing.** Batch 7's and 7R's gathers put every item of the structured `forPavol` lists into `PLAN.md` (`compile-ladder/climb-batch-7/RECORD.md`, the rung sections' "Items for Pavol"). Item 21 went to Pavol with batch 7's landing and he answered it the same morning (`POSITIONS.md:130`). Item 24 is now before him (`reviews/before-n-questions.md`, question B). The baseline's common path for late items, a list stopping in a rung's files, is closed for the structured field.
- **Late.**
  - Batch 6b's items (the three range bodies, the reorder not taken, ten test files outside the named ones, the ten natives) stopped in its record. Its script predated the routing step (`batch-6b-7-conformance.md:277`).
  - 7R's section-1 defaults and its rungs' "What comes back to Pavol" lists have no route; J's and U's notation and scope points reached neither `PLAN.md` nor the handover (`batch-7R-conformance.md:157`).
  - Item 25 was filed "before the switch-over" when batch N decides it (58).
- **The opposite failure did not recur.** B's false stop (42) was withdrawn by its skeptic before it reached Pavol. Every reserved stop met was reversible and lifted by `POSITIONS.md:120`; none held a push.

## 6. Re-measuring what the record held

From `process-review-6b-7-7R/reruns.txt`.

- **No brief told a worker to verify the record or to measure every way again.** The briefs cite measurement C, the synthesis and the probes as findings.
- **The rule that a count or distance rung records its failure before its edit** ("the recorded failure is the distance measurement's table before the edit", `CLIMB-BATCH-7.md:313`) made each such rung re-run the base's tables. `Library/` and `ProjectFortress/` had not changed since the landed gate or the distance baseline measured them.
  - Rung A (1,747, 19 minutes), H (1,747, 19 minutes), B (1,747, 35 minutes) and J (940, 14 minutes). Each table is identical to the committed one but for its machine and seconds lines. J's pre-edit count, 22, is identical too.
  - 87 minutes of machine time. Batch 7's three ran at once on a four-core box.
  - Not a repeat: H's pre-edit count adds the `#cache` line, the stage's setting changed at batch 7's launch; A's second base run was its own measure of run-to-run variation (1,745, at load 15).
  - By reading of the calls, not timed: A and H also ran the ladder and microGPT on the base, which the gate compares against its own baseline.
- **Why the record was not enough.** The gate commits a 65-line table of totals. The per-site list a rung needs to call each new site unmasked or caused stays untracked under `tmp/gate-batch-*/distance/`, and each rung committed its own copy, about 600K bytes.
- **This is principle 5's failure in form**: measured again on a tree that had not changed. It came from a rule, not from a brief's wording, and every re-run agreed with the record.

## 7. The conformance reviews: what they found beyond the batches' own checks

- **Cost** (`review_cost.txt`, the same billing): 3.15M ITE and 21 minutes for batches 6b and 7, 2.83M ITE and 23 minutes for 7R. Together 6.0M ITE, 4.3% of the three runs' 139M.
- **Findings beyond the batches' own checks: 15**, 7 and 8.
  - Rung-level misses: 3 (57, 58, 59 above).
  - Between batches, which no check inside a batch looks at:
    - from 6b and 7: rows 450 and 451 with a decided repair and no batch; batch 6.5's rung G not testing H's new clause-binding site; the specification's implicit bound left at `Object` while batch N writes on it; decision D's parked diff no longer applying; the checker's solver quirk with no ledger row;
    - from 7R: row 480 with no batch; the `Character` crash with none; rows 450 and 451 again; row 478 missing from batch 7b's record; the library's two numeral strides missing from batch N's record.
    That is 10.
  - Routes to Pavol that do not exist: 2 (6b's items; 7R's lists and defaults).
- **Severity**: none blocks the switch-over or a push. One decision for Pavol is moved earlier (58). The others are placements: a named batch, a parked line, a sentence in a later batch's record.
- **Against the baseline.** The baseline called the conformance review "the only check that found S's sentence and the unreached decisions" (`worker-global-decisions.md`, measure 1). It still finds what no in-batch check can see: the batch's findings against the rest of the plan. Its rung-level yield is about the same as batch 5's.

## 8. Cases

1. **H: the decisions in hand, and the second reader** (items 45, 47, 50).
   - H's briefing printed POSITIONS 2026-09-24 ("a fork put to him names the library's own way first"), the FACTS entry that names the team's 2008 clause, and POSITIONS 2026-09-23 on weighing the implementers' later word.
   - The worker took `TotalComparison`'s shape without the library's device, listed the ways for `AnyIntegral` without the 2008 clause, and called typecase's binding form settled.
   - The skeptic's checks 5 and 12 caught the first two. Its own check 12 missed the third, and so did the merged-diff review; the review's judge caught it (`climb-batch-7/JUDGE-review.md:59-65`).
   - What it shows: the briefing makes the record available; it does not make a worker apply it. A second reader who checks the text against the decisions does.
2. **B: new ground claimed where the record had it** (42).
   - B called three sites caused, not unmasked, and reported a reserved stop. The tables that show them are in `perf-probes/prelude/distance-triage/`, whose note was in B's briefing.
   - The skeptic found them. Without it, a false stop would have gone to Pavol, which his 09-26 remark on rung D's stop asked to avoid (`POSITIONS.md:114`).
3. **The same rejected argument, twice in two days** (41, 55).
   - On 09-27 batch 6b's review judge rejected "the prelude leaves at the switch-over" as a reason to leave a settled defect without its gated test: "It proves too much" (`climb-batch-6b/JUDGE-review.md:30-35`).
   - On 09-28 7R's skeptic wrote the test for rows 481 and 482 as optional, and the gather copied it; 7R's judge ruled against it by citing 6b's ruling (`climb-batch-7R/JUDGE-review.md:44`).
   - The ruling lives in a batch's `JUDGE-review.md`, which neither the prefix nor a briefing carried. The baseline's case 5 (batch 3.5's "undecided") was the same kind, and its measure 2 asked for judges' process rulings to be indexed.
4. **U's `nat` question, through three layers** (56, 58).
   - U put the question to Pavol without his decision on a size's range, which its briefing printed. The skeptic added the decision and a measurement.
   - The conformance review then showed the question is about a size's value: the team's checker already gives it the numeral's type (`KindEnv.scala:67-68`), batch N's numeral switch decides it in code, and decision D's diff was written around the other reading. So it moves before batch N.
   - Each layer found something the one before could not. The last is the kind only a reader of the whole plan finds.
5. **What went right.**
   - A's worker measured answer 10's placement words, found them wrong, and reported the departure itself (51).
   - J followed the team's own comment on what the range operators "actually want" against the synthesis's shadow (`batch-7R-conformance.md`, "What went right").
   - The Fable reviews of the batch records caught planner-side gaps before launch: the library's own device for `rangeOperators` and ledger row 453 added to 7R's briefings (`coordinator/climb-batch-7R-review.md`, changes 4 and 10), and the library's facts behind batch 7's Q2 (`climb-batch-7-review.md`, change 4). One shape the 7R record prescribed and its review left to the rung, `UniformDistribution`'s parameter, became row 483.

## 9. Measures the evidence supports, each with its cost

1. **Keep the conformance review after each batch for now**, as Pavol's call (POSITIONS 2026-09-27).
   - Cost: about 3M ITE and 22 minutes per batch, 4% of a batch's run.
   - Evidence: 15 findings beyond the batches' own checks in three batches, one of them a question for Pavol moved ahead of the batch that would decide it.
2. **A routing step at each landing**, widening the gather's step 5.
   - It gives every ledger row the batch opens or leaves open a named batch or a parked `PLAN.md` line. It files the batch record's section-1 defaults and each rung's "What comes back to Pavol" list as parked lines. And it adds each new row that touches a drafted later record to that record's briefing keys.
   - Cost: a few minutes of the gather; the planner reads the new rows before its next record.
   - Evidence: about 12 of the 15 review findings are placements or routes. Once two batches' reviews find nothing this step would have caught, the review can run every other batch or on request.
3. **Index the judges' rulings on how a rule applies** as one sentence in the rule's own text in `coordinator/climb-batch-workflow.md`, which the prefix repeats. The first is the three homes and "the prelude leaves at the switch-over".
   - Cost: one sentence per ruling, at the landing.
   - Evidence: 55 repeated 41's rejected argument the next day; the baseline's case 5 was the same.
4. **Hand the landed gate's tables to count and distance rungs as their "before"** when `Library/` and `ProjectFortress/` have not changed. The gate commits its per-site distance list beside its table, and the brief asks only for the "after".
   - Cost: about 600K bytes per landing in the repository. Pavol decides whether the gate's run satisfies test-first for such a rung.
   - Saves: 14 to 35 minutes of machine time per rung (87 minutes in these batches), and the load of three base runs at once.
5. **A reason line on each briefing key**, written by the planner: why the entry is there and what the rung does with it ("cite it in any question about a `nat` parameter").
   - Cost: a few hundred tokens per briefing, and planner time.
   - Evidence: 5 of 17 misses were of items printed in the rung's own 40K to 76K-token briefing. It is untested. A smaller briefing is the other way; the evidence here neither supports nor refutes it.

## What I did not do

- Built nothing and ran no Fortress program. Read batch 7C's journal only for the one `grep` the brief names.
- Did not re-measure the baseline's figures, re-fit its token model, or re-read its eight hand-labelled agents. Every baseline number above is cited from the two notes.
- Did not hand-label these agents' searching as held, primary or new (`worker-context-cost.md` section 4). So how much of today's searching the record already held is not measured.
- Counted "other" findings from the corrections lists, rounded, as the baseline did.
- Did not time the base runs of the ladder and microGPT (section 6), or read the coordinator's own turns.

## Files

`process-review-6b-7-7R/`:
- `agents.py`: the four runs and their 42 agents, from the journals.
- `prompts.py` → `prompts.txt`: each agent's prompt size and the markers of the 09-27 changes.
- `measure.py` → `calls.csv`, `agents.csv`: the baseline's parser, classifier, token fit and billing, with the briefing category.
- `aggregate.py` → `summary.txt`: every figure in sections 1 and 2.
- `briefkeys.py` → `briefkeys.txt`: the keys each rung and skeptic ran.
- `reruns.sh` → `reruns.txt`: section 6.
- `review_cost.py` → `review_cost.txt`: the runs' and the conformance reviews' cost.

Run from the directory, in this order: `python3 prompts.py > prompts.txt; python3 measure.py; python3 aggregate.py > summary.txt; python3 briefkeys.py > briefkeys.txt; bash reruns.sh > reruns.txt; python3 review_cost.py > review_cost.txt`. `measure.py` loads `../worker-context-cost/` for the baseline's code and calibration.

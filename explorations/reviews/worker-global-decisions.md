<!-- Did the batch workers on Opus 5.5 (climb batches 3 to 6) take globally better decisions than the Opus 5 workers (repair batch, batches 1 and 2) and the eight-rung climb before 2026-09-17: every finding of the skeptics, judges, merged-diff reviews and later reviews classified, the cases, what reached Pavol late, and the measures the evidence supports. Written 2026-09-27 by a read-only review worker; nothing was built or run. -->

# Worker myopia by tier: Opus 5 against Opus 5.5

## The answer

- **Better in outcome, same in kind.** Opus 5.5 rungs produced about half as many myopic findings per rung as Opus 5 rungs (20 in 18 rungs against 19 in 9). Far fewer of them landed: 3 of 20 against 13 of 19.
- **The improvement is not the tier's and not the map's.** Map use fell from 23 of 26 workers and skeptics to 25 of 58. In the same week the process changed. From 09-22 forks were probed and decided before a batch was briefed. Briefs grew and quoted POSITIONS. Judges and merged-diff reviews caught 11 of the 20. The evidence cannot separate the tier from these changes.
- **The same myopia is still there.** Opus 5.5 rungs still missed the library's own device for the same family (four cases). They still missed what the ledger already held (four cases). And they contradicted decisions on record, twice even when the brief quoted the decision (five cases).
- **What the lapse cost so far is small.** Nothing touched a line of the model. Three items landed:
  - a sentence of the revised specification that forbids a gate Pavol set;
  - status sentences printed where the team kept them in draft-only notes;
  - one numeric `=` kept on `Number` beyond route A.

  Two decisions never reached him: that `=`, and a judge's ruling on a size's range. Nor did three compiled-path defects a skeptic found. Only batch 5 was reviewed after the fact, so batches 3, 3.5, 4 and 6 may hold more.
- **Measures the evidence supports**, each argued at the end:
  - a conformance review after every batch;
  - a per-rung briefing built from the record as the rung's first step;
  - four more skeptic checks;
  - a gather rule that turns every "For Pavol" item into a PLAN entry.

## Terms

- **Myopic finding** (the brief's definition, used unchanged). A choice that contradicts:
  - the plan;
  - the library's own practice for the same family;
  - the specification elsewhere;
  - a decision on record;
  - something already on record.

  It also covers a device invented where the library has one, and a decision taken inside a rung that was Pavol's.
- **Other finding.** A bug in the rung's code, a defect found that predates the rung, a missed test or gated home, a record slip (a citation, a count, an overclaim), or a process slip.
- **Worker-side.** Written by an agent on the era's Opus tier: the rung worker, its skeptic, the gather, the merged-diff review, the gate repair. **Judge-side**: a judge's own ruling. Judges ran on Fable through batch 3.5 and on Opus 5.5 from batch 4 (`coordinator/climb-batch-workflow.js:48`).
- **The docket.** `coordinator/postmortem-2026-09-19/decisions-for-reapproval.md`, the table of decisions taken without Pavol's yes between 09-19 06:38 and 09-20 10:43. Its rows are cited by line, which is also the row number.

## What the counts rest on, and their limits

- **Tiers, measured from the transcripts.** Workflow agents under `subagents/workflows/`, the `model` field of each agent's first reply:
  - Opus 5: the repair batch (`wf_9777a563-c5e`, `wf_aabc0cb2-d31`), batch 1 (`wf_a29fd04b-a9a`, `wf_3b5a273c-a80`), batch 2 (`wf_d1628adb-2ee`).
  - Opus 5.5: batch 3 (`wf_776d7c2c-6c3`), 3.5 (`wf_207012c9-0ef`), 4 (`wf_f54d0e4b-63d`), 5 (`wf_eb47c103-304`, `wf_88172730-ebe`), 6 (`wf_b262c534-337`).
  - The non-workflow workers switch the same way on 09-22.
  - The eight-rung climb of 09-17 ran its planners, implementers and repairers on the Opus alias (`coordinator/ladder-workflow.js:95-111`). Its transcripts were not read here.
- **Findings.** Read from:
  - each rung's `SKEPTIC.md` and `JUDGE.md`;
  - each batch's `RECORD.md`, `JUDGE-review.md` and `REPAIR-review.md`, and batch 2's `JUDGE-gate.md`;
  - the two 09-17 conformance reviews, `coordinator/repair-batch-review.md` and `reviews/library-scalar-extension-review.md`;
  - batch 5's conformance review (`reviews/batch-5-conformance.md` on branch `review-batch-5`);
  - the docket, and `POSITIONS.md` with its history.
- **Myopic findings are listed one by one below**, and each was read at its source. Other findings are counted from the corrections lists and rounded. Most of them are record slips and newly measured defects.
- **Detection differs by era, and the counts are not like for like.**
  - The Opus 5 batches had the docket, which caught 12 of their 19 myopic findings, all decisions.
  - No docket was made for batches 3 to 6.
  - Batch 5 alone got a conformance review.
  - So the Opus 5.5 count of decisions taken inside rungs is a lower bound.

## What the agents read

Workers and skeptics (rung, repair and skeptic agents, cut launches included), counted from their tool calls. Commands that only write a file are left out:

- **Opus 5**, 26 agents:
  - map 23;
  - FACTS 10;
  - INDEX 8;
  - POSITIONS 0;
  - ledger 23;
  - the library sources under `Library/` 24.
- **Opus 5.5**, 58 agents:
  - map 25;
  - FACTS 37;
  - INDEX 2;
  - POSITIONS 38;
  - ledger 56;
  - `Library/` 53;
  - the 2012 Types chapter 10.
- **Map by batch:** repair 8 of 8, batch 1 11 of 12, batch 2 4 of 6, batch 3 12 of 19, batch 3.5 3 of 7, batch 4 4 of 11, batch 5 4 of 9, batch 6 2 of 12.

**The prefix required one map lookup, and nothing checks it.**
- Every batch's shared prefix carries the same map section, "read the parts your task needs, do not go looking".
- Its rule 1 says to use `spec-to-implementation.md` and `modules-and-phases.md` for "where does this fix belong". No skeptic checks rule 1.
- The prefix never asks for FACTS, INDEX or POSITIONS to be read. INDEX appears only in its "Do NOT edit" list. FACTS appears as a file to cite and not to edit. POSITIONS appears as the source of the decisions the brief quotes.
- What rose is what the briefs quoted. POSITIONS citations in a rung's prompt went from 1 (batches 1 to 3.5) to 5-7 (batches 4 to 6). The prompts grew from 17K characters (repair) to 36-43K (batches 5 and 6).
- Knowledge-base use did not fall overall. It moved from the map and INDEX to FACTS and POSITIONS, following the briefs.

## Findings by batch

### Before 09-17: the eight-rung climb (Opus)

- 12 defects in 8 rungs (`reviews/rung-conformance-1-4.md:231-241`, `reviews/rung-conformance-5-8.md:317-333`). 6 are myopic:
  - rung 2, `HasRank`'s equality changed to identity against the library's array base case;
  - rung 3, the one wrong precedent in `VarCodeGen` followed over the two right ones: a specification violation;
  - rung 4, the exclusion that discharges its overload sitting commented out in the team's text;
  - rung 4, a wrong reason written into the library against its own working `===` overloads;
  - rung 7, a run-time arithmetic helper built without finding the folding phase or the team's comment "Do not enable these until coercion is implemented" (`FortressBuiltin.fss:483-485`);
  - rung 7, a semantics choice against `walk` recorded nowhere.
- All 12 landed. All were found by the 09-17 review. Rung 7's skeptic saw its divergence and did not write it down.

### Opus 5: repair batch, batches 1 and 2 (9 rungs)

Worker-side myopic findings, 19:

- **Repair batch** (R1, R2):
  1. R1 put an eager debug string back on the transactional path. Rung 0 had already guarded the same defect in the file next door (FACTS, ledger row 302). A working program became a stack overflow. *Record contradicted; skeptic.* `compile-ladder/repair-r1-atomic-static/SKEPTIC.md:99-137`.
  2. R1's FACTS line said the compiler tests run on several threads. `experiment/env.sh:6` and `coordinator/iteration-cost.md:126` say one. *Record contradicted; skeptic.* `:147-153`.
  3. R1 made `Transaction.java` the only file in its package to import a library type, and no record named the choice. *The tree's own practice; later review.* `coordinator/repair-batch-review.md` section 5, item 1.
- **Batch 1** (F, M, N, T):
  4. F: `floor` and `ceiling` on floats return a float. The specification's rational chapter returns ℤ. *Pavol's decision, specification elsewhere; docket row 24.* Reversed 09-21 (`coordinator/POSITIONS.md:47`).
  5. F: `round` on floats sends a half to even. *Pavol's decision; docket row 25.* Agreed 09-21 after he asked for the history.
  6. M: the empty `Maybe` spelled as the specification spells it. This made the corpus's `Nothing[\T\]` a static error. *Pavol's decision, against the team's spelling; docket row 26.* Reversed 09-21 (`POSITIONS.md:49`).
  7. M: row 321's gap widened on purpose. *Pavol's decision; docket row 27.* Approved 09-22.
  8. N: `LSHIFT`/`RSHIFT` mask the count. *Pavol's decision; docket row 28.* Reversed 09-22 (`POSITIONS.md:53`).
  9. N: `GCD`/`LCM` nonnegative. *Pavol's decision; docket row 29.* Approved 09-22.
  10. N's precedent search missed the interpreter's `NN32` bodies and the team's reason at `FortressBuiltin.fss:483-485`. That is the comment rung 7 missed, which the shared prefix quotes to every worker in its rule 1. *Team practice, already on record; skeptic.* `compile-ladder/rung-integral-ops/SKEPTIC.md:122`.
  11. T priced a change of rendering as a `.java` rung. It ignored rung F of the same batch, chartered to add `round`/`truncate`. *Plan; skeptic.* `compile-ladder/rung-timing/SKEPTIC.md:86`.
  12. T's precedent search missed the revival's own rendering of elapsed time, eight sites. *Project practice; skeptic.* `:94`.
- **Batch 2** (X, W, B):
  13. X cited `repair-r1-atomic-static/REPORT.md:180` for its shape. The same sentence rejects the approach X took, and X did not engage it. *Record contradicted; skeptic.* `compile-ladder/rung-export-var/SKEPTIC.md:369`.
  14. X repaired row 320 in half and reclassified the other half. *Pavol's decision; docket row 41.* Unanswered, parked to the switch-over.
  15. W: `narrow` out of range throws. Steele's boundary test `tests/UnsignedTest.fss:210-211` asserts truncation, and W's own record names that test (`compile-ladder/rung-int-conversions/record.md:23`). *Team practice, Pavol's decision; docket row 43.* Reversed 09-22 (`POSITIONS.md:56`).
  16. B revived `TryAtomicFailure` from the team's commented block. This makes the name unusable for user code. *Pavol's decision; docket row 44.* The skeptic named the cost. Unanswered.
  17. The gather added a second gated test to the original tree outside any brief, as the skeptic required. *Pavol's decision, what lands; docket row 42.* Unanswered.
  18. The gather refuted row 344 and reclassified row 347. *Pavol's decision, what the ledger asserts; docket row 45.* Unanswered.
  19. The gate repair made the run's own summary its own comparand. *Pavol's decision, the measuring stick; docket row 48.* Not taken.

Judge-side (Fable), not counted above: three decisions.
- N's `-1` guard placed in the `REM` bodies (docket row 30, approved as landed 09-24).
- Rows 352 and 353 landed unrepaired (row 46, unanswered).
- The gate compared by the shards' sum (row 47, agreed 09-26).

Other findings: about 25 in the repair batch, 18 in batch 1 and 18 in batch 2.

### Opus 5.5: batches 3, 3.5, 4, 5 and 6 (18 rungs)

Worker-side myopic findings, 20:

- **Batch 3** (L, P, S, M, C, R):
  20. L claimed the team's tests `XXX3q`/`XXX10p` "cannot serve" and wrote its own test. The skeptic measured the claim false. *Team practice; skeptic.* `compile-ladder/rung-library-defects/SKEPTIC.md:52`.
  21. C wrote that the interpreter does not check a user overloading against the library's. C's own gated run had met a warm cache, which masks that check. Ledger row 341 records the mask. *Record contradicted; skeptic.* `compile-ladder/rung-library-comments/SKEPTIC.md:191`.
  22. C called the specification silent on rank-3 arrays. The draft's margin notes (`aggregate.tex:152-162`) state the intent. *Specification elsewhere; skeptic, as a note.* `:201`.
  23. The gather decided not to place the gated homes the rule asks for, although it had placed three such tests. *Batch rule; merged-diff review, reversed by its judge.* `compile-ladder/climb-batch-3/RECORD.md:80`.
- **Batch 3.5** (B, I):
  24. B's worker, its skeptic and the gather made "undecided" a reason against row 379's gated home. Batch 3's judge had already rejected that reasoning. *Ruling on record; merged-diff review's judge.* `compile-ladder/climb-batch-3.5/JUDGE-review.md:49-51`.
  25. I's site count missed `BigNum$Lcm`, the same `LCM` defect (row 334) in a file the rung edits. *Same family; skeptic.* `compile-ladder/rung-int-semantics-walk/SKEPTIC.md:138`.
- **Batch 4** (C, N, O, K):
  26. N's first pass missed ledger row 21, which covers its method case. *Record; skeptic.* `compile-ladder/rung-nat-checker/SKEPTIC.md:178`.
  27. O priced keeping `walk` wrapping as "nothing else moves". It left out the switch-over, where the compiled path compiles the same library. *Plan; judge.* `compile-ladder/rung-walk-overflow/JUDGE.md:52`.
  28. O missed the team's 2011 prelude wrapping set as the precedent for how code says "wrap" (`CompilerBuiltin.fss:524-538` and its siblings; ledger row 348). *Team practice; judge.* `:57`.
- **Batch 5** (D, S, Z):
  29. S wrote "A where-clause variable may not appear as a static argument in an extends clause". The sentence is broader than the rule, and it forbids the gate Pavol set for row 331 (`POSITIONS.md:49`). *Decision on record; nobody in the batch; the later review.* `reviews/batch-5-conformance.md` on `review-batch-5`, "Row 331" and "Findings that need Pavol" 4.
  30. S's status sentences about the checker print in every build. The team kept such status in draft-only notes. *Team practice, mild; the later review.*
  31. Z counted seven "static arguments are types only" sites. `FreeVarTypes` is the eighth. *Same family; skeptic.* `compile-ladder/rung-size-runtime/SKEPTIC.md:286`, `JUDGE.md:97`.
  32. Z's skeptic proposed its F4 as a new defect. It was already ledger row 76. *Record; the repair worker.* `JUDGE.md:287`.
  33. The gather carried the pre-Z reading into Appendix I. Its own note on row 402 said Z had landed first. *Record; merged-diff review.* `compile-ladder/climb-batch-5/JUDGE-review.md:23`.
  34. Z read "opened only" in the brief as leaving row 408 without its gated home. *Batch rule; merged-diff review.* `:48`.
- **Batch 6** (F, T, R):
  35. F did not make the demos count owed by answer 7's approved judgement. *Decision on record; judge.* `compile-ladder/rung-flat-tower/JUDGE.md:180-181`.
  36. F kept one numeric `=` on `Number`. Route A says "`Number` without its catch-all operators" (`POSITIONS.md:69`). *Pavol's decision; the judge flagged it for him (`:365`).* It is in neither PLAN nor POSITIONS.
  37. T stated the coercion into ℝ64 as "from the numerals ℤ32 holds". Answer 8, which T's own brief quoted, says "`ZZ32` and integer literals" (`POSITIONS.md:107`). *Decision on record; judge.* `compile-ladder/rung-spec-numbers/JUDGE.md:57-81`.
  38. T's skeptic wanted the same restriction kept and the team's Example 1 marked superseded. *Decision on record; judge.* `:64`.
  39. The gather reported three mismatches between T's chapters and the library as "not blocking". The batch record's rule makes them blocking. *Batch rule; merged-diff review.* `compile-ladder/climb-batch-6/RECORD.md:196`.

Judge-side, not counted above: four.
- Batch 3's Fable judge on P struck "keep the rule" as not a live option (`compile-ladder/rung-exclusion-relax/JUDGE.md:36`). Pavol chose it as route A two days later (`POSITIONS.md:69`).
- Batch 3.5's Fable judge took two source repairs outside the batch's file list, and said so to Pavol (`climb-batch-3.5/JUDGE-review.md:214`).
- Batch 5's Opus 5.5 judge decided a size's range (`rung-size-runtime/JUDGE.md:271`).
- The same judge placed the literal emission a second time beside `CodeGen.forIntLiteralExpr` (the later review, "Built twice").

Other findings: about 45 in batch 3, 25 in 3.5, 30 in 4, 25 in 5 and 40 in 6. The skeptics' differentials found many new defects in these batches.

### Totals, by tier and by who caught

- **Worker-side myopic findings per batch:** repair 3, batch 1 9, batch 2 7; batch 3 4, batch 3.5 2, batch 4 3, batch 5 6, batch 6 5.
- **Before 09-17, 8 rungs:** 6 myopic (0.75 a rung), 6 other. All 6 landed. The later review caught all of them.
- **Opus 5, 9 rungs:** 19 myopic (2.1 a rung), about 60 other. Myopic share about 24%.
  - Caught by the skeptic: 6. Caught by a later review: 1. Surfaced by the docket: 12.
  - 13 landed. Pavol reversed 4 and approved 3. Four are still unanswered a week later, five with the judge's row 46. One was not taken.
  - Kinds: decisions that were Pavol's 12, one of them (W's) also against the team's practice; the library's or team's practice 3 more; the record 3; the plan 1.
- **Opus 5.5, 18 rungs:** 20 myopic (1.1 a rung), about 165 other. Myopic share about 11%.
  - Caught by the skeptic: 6. By the repair worker: 1. By the judge: 6. By the merged-diff review: 5. By the later review only: 2.
  - 3 landed (29, 30, 36).
  - Kinds: decisions on record contradicted 5, the library's or team's practice or the same family 5, the record 4, batch rules 3, specification elsewhere 1, the plan 1, Pavol's decision 1.
- **One detector ran on both eras: the conformance review.** It found 6 myopic in 8 rungs before 09-17. In the 3 rungs of batch 5 it found 2 worker-side and 2 judge-side.
  - Per rung, what escaped every earlier check did not fall: 0.75 before, 0.67 worker-side or 1.3 with the judges in batch 5. One batch is a small sample.
  - Severity is lower. Before 09-17 there was a specification violation and an unargued semantics choice. In batch 5 there was one sentence too broad and one form of status note.

## Cases, Opus 5 era

1. **R1's regression** (repair batch).
   - What happened:
     - The brief named rung 0's guard and said "do not fix it again".
     - The worker read that as handled. It did not read it as evidence of the same defect at other sites in the same two files.
     - It put the eager string back, and a program that ran became a stack overflow (`repair-r1-atomic-static/SKEPTIC.md:99-137`, at `:133`: "precedent search, failing on the one precedent that would have caught a regression").
   - Caught by the skeptic and repaired in the batch.
   - A briefing would not have prevented it: the fact was in the brief. A "same defect class in the files you edit" step would have.
2. **N's precedent search** (batch 1). It missed the team's comment at `FortressBuiltin.fss:483-485` (`rung-integral-ops/SKEPTIC.md:122`).
   - That comment is quoted in rule 1 of the prefix N ran under, as rung 7's miss.
   - Caught by the skeptic.
   - A briefing would not have prevented it, since the comment was already in the prompt. The skeptic's precedent check did its job.
3. **W's `narrow`** (batch 2). It throws where Steele's own boundary test asserts truncation.
   - W knew: its record cites the test (`rung-int-conversions/record.md:23`).
   - It chose, the skeptic approved, and it landed.
   - The docket surfaced it on 09-20 (row 43). Pavol reversed it on 09-22 (`POSITIONS.md:56`).
   - A briefing: partly. The team's test is the library's practice. What prevents this class is the 09-22 rule that a fork is probed and decided before the brief.
4. **Three semantics decisions reversed** (batch 1):
   - `floor`/`ceiling` returning a float (row 24);
   - the spec's non-parametric `Nothing` (row 26);
   - masked shift counts (row 28).

   Each was named in a record and approved by its skeptic. F's skeptic argued the specification silent on floats (`rung-rr64-functions/SKEPTIC.md:96-102`). Each reached Pavol only through the docket, and he reversed each (`POSITIONS.md:47`, `:49`, `:53`). A briefing would not have prevented them. These were forks, and forks belong to him.
5. **T's two misses** (batch 1).
   - T priced its alternative without rung F of the same batch (`rung-timing/SKEPTIC.md:86`). A briefing from the batch record would have prevented this.
   - T missed the revival's own rendering precedent (`:94`). No record entry holds it, so a briefing would not have helped.
   - The skeptic caught both.

## Cases, Opus 5.5 era

1. **O's wrap precedent and its cost** (batch 4).
   - O read ledger row 348 (`rung-walk-overflow/REPORT.md:106`). It still missed that the 2011 prelude that row describes is the team's shape for saying "wrap".
   - It copied that row's wrong glyph for wrapping multiplication.
   - It priced keeping `walk` wrapping without the switch-over (`JUDGE.md:52`, `:57`).
   - The judge caught all three. The stop brought the fork to Pavol, and he chose the specification's operators (`POSITIONS.md:81`).
   - A briefing: yes for the switch-over, which is PLAN's phase 4. The precedent needed a "the library's own way" search, which the record alone does not make.
2. **T and its skeptic against answer 8** (batch 6).
   - The brief quoted answer 8. The worker still wrote the narrower rule the interpreter's representation gives.
   - The skeptic argued for keeping it.
   - The judge ruled from POSITIONS and the specification's numeral model (`rung-spec-numbers/JUDGE.md:57-81`).
   - A briefing would not have prevented it, since the decision was in hand. A skeptic check of each cited decision against the landed text would have.
3. **S's where-clause sentence** (batch 5).
   - It forbids the gate Pavol set for row 331 on 09-21 (`POSITIONS.md:49`).
   - The skeptic, the judge and the merged-diff review did not see it as a choice. Only the later conformance review did.
   - It is in the landed specification.
   - A briefing: yes. A list of the decisions that touch the passages the rung revises would have put row 331 beside the sentence.
4. **C's warm cache** (batch 3).
   - The report said the interpreter does not check a user overloading against the library's.
   - Its own gated run had met a warm cache, the mask ledger row 341 records (`rung-library-comments/SKEPTIC.md:191-199`).
   - Caught by the skeptic.
   - A briefing: yes, row 341 by a grep of the ledger for the rung's names.
5. **B's "undecided" reasoning** (batch 3.5).
   - The worker, its skeptic and the gather each used a reason batch 3's judge had already rejected (`climb-batch-3.5/JUDGE-review.md:49-51`).
   - Caught by the review's judge.
   - A briefing: only if judges' rulings on process were indexed. Today they sit in each batch's `JUDGE-review.md`, and neither FACTS nor INDEX carries them.

In round numbers, a briefing from the record would plausibly have prevented:
- about 6 of the 20 Opus 5.5 findings: 21, 24, 26, 29, 32, and 27 through the plan;
- about 3 of the 19 Opus 5 ones: 2, 11, 13.

It would not have prevented:
- the misses of the library's own device (20, 25, 28, 31);
- the contradictions of a decision already quoted in the brief (35, 37, 38);
- the Opus 5 era's forks.

## What went right in the Opus 5.5 era

- P's worker read Naden's `justificationOfRTR.tex` and `exclusion.tick`, which the batch record did not cite (`rung-exclusion-relax/JUDGE.md:26`). Its option to keep the rule was the one Pavol chose. The Fable judge had struck it.
- L found that the batch record's own `comprises` clause contradicts the specification, and brought the count to Pavol (`climb-batch-3/RECORD.md:11`, "Finish").
- D corrected Pavol's own words on `UnsignedTest`'s products, which are exact (`rung-wrap-operators/JUDGE.md:34`).
- S's second skeptic in batch 3 named a switch-over consequence of its finding (`rung-default-rendering/SKEPTIC.md`, "Switch-over consequence").
- Batch 5's conformance review: "The library's way. Yes, throughout" for D, and every item D found reached the next batch.

## What reached Pavol late or not at all

- **Opus 5 era.**
  - Twelve worker-side decisions and three judge decisions reached him only through the docket, written on 09-20 after batch 2 landed. He decided them from 09-21 to 09-26.
  - Four were reversed: `floor`/`ceiling`, `Nothing`, the shifts, `narrow`.
  - Docket rows 41, 42, 44, 45 and 46 are still unanswered, parked in `PLAN.md:117-119`. Row 48 was not taken.
  - Two divergences the specification settles, found by R2's skeptic, were recorded nowhere (`repair-batch-review.md` section 3). Whether the repair judge's `forPavol` field was relayed to him is not on record (the same review, section 4).
- **Opus 5.5 era.**
  - Batch 5's judge decided a size's range and listed it "For Pavol" (`rung-size-runtime/JUDGE.md:271`). It is in neither POSITIONS nor PLAN.
  - Rows 417, 419 and 420 are compiled-path defects on the path of phases 4 to 6. Z's skeptics found them. The handover says the first of them "goes to Pavol" (`microgpt-run-c-handover.md:17`). They are not in PLAN, and not in batch 7's draft on `plan-batch-7`.
  - Nobody saw S's where-clause breadth as a choice, so it never reached him.
  - Batch 5 was pushed before S's reserved stop was answered. Whether he was told is not on record (the batch-5 review).
  - F's `=` on `Number` (item 36) is flagged "For Pavol, out of the loop" and is in neither PLAN nor POSITIONS. Row 434 records only its float half.
  - Batch 3.5's judge told him, in a judge file, that it took two repairs his go did not name. Nothing on record shows he read it.
  - The opposite failure also happened. Rung C's stop (batch 4) and rung D's stop (batch 5) reached him on output differences of line numbers and message order. He said D's "didn't need to be raised up to me" (`POSITIONS.md:114`). Those stops were the brief's rules, not the workers' choices.

The common path for late items: a judge's "For Pavol, out of the loop" section, or a rung's list for him, stops in the rung's files or the handover. No stage moves it into PLAN's queue.

## My reading

This is my reading, not a finding.

- **Better than before 09-17, and better than the Opus 5 batches.** Fewer myopic findings per rung, and far fewer landed. The worst Opus 5 failure, semantics forks decided inside rungs and found by a docket, nearly stopped.
- **The cause is mainly the process, not the tier.** Forks were probed and decided before the brief from 09-22. Briefs grew and quoted the decisions. Of the 20 findings left, judges and merged-diff reviews caught 11.
- **Map use fell with the tier change, and the misses do not trace to the map.** The Opus 5.5 misses are of the ledger, POSITIONS, prior rulings and the code's own precedents. A grep of the map finds neither the 2011 prelude's wrap set, nor the warm-cache mask, nor row 331's gate. A refresh of the map is on `map-refresh`.
- **The same local myopia remains in kind:**
  - the library's own device for the same family missed;
  - the ledger not searched;
  - a decision in hand contradicted.

  The coordinator on Opus 5.5 showed the first of these on 09-26 with `BIG MAX`. That was the diagonal's failure again, and Pavol's "I don't trust your judgement at all on this" (`POSITIONS-history.md:203`). So the tier does not remove it.
- **What escapes every in-batch check has not fallen**: 0.67 to 1.3 a rung in batch 5, against 0.75 before 09-17, on the one detector both eras had. That residual is why a check after the batch is still needed.

## Corrective measures the evidence supports

1. **A conformance review after every batch**, in the form of the 09-17 reviews and batch 5's. It is the only check that found S's sentence and the unreached decisions. The docket did the same job for the Opus 5 batches, and no docket was made after 09-20. Cost: one read-only worker per batch. Batches 3, 3.5, 4 and 6 have had none.
2. **A per-rung mission briefing as the rung's first step**, built from the record, not written by hand. It carries:
   - the ledger rows that a grep for the rung's names and files finds;
   - the POSITIONS entries its brief cites, and any that touch the same passages or declarations;
   - prior judges' rulings on the same rule;
   - the FACTS entries of its area;
   - the map row for the feature.

   Expected yield, from the cases: about a third of the Opus 5.5 findings. It needs judges' process rulings indexed somewhere a grep reaches, in FACTS or the workflow manual.
3. **Four more checks for the skeptic.** Today it checks the provenance block, the diff, the precedent search, the test and the homes.
   - (a) For each decision the brief cites, the landed text says what the decision says. This would have caught 29, 37 and 38.
   - (b) A sibling search: every site of the same defect family, in the edited files and on the other path. This would have caught 25 and 31, and the siblings of batch 3.5's guards.
   - (c) "The library's own way" as a named check, with the team's tests and the 2011 prelude among the places to look. This would have caught 20 and 28.
   - (d) The brief's owed measurements as a checklist. This would have caught 35. Rule 1's map lookup belongs on that list too, since nothing checks it today.
4. **Route every "For Pavol" item at the gather.** Each item in a judge's or rung's list for him becomes an entry in `PLAN.md`'s queue, or the batch does not land. This would have carried the size range, F's `=`, rows 417, 419 and 420, and batch 3.5's two repairs.
5. **Keep the brief's stops narrow.** Two stops of the Opus 5.5 era spent his attention on output noise. Rung D's rule is already fixed in POSITIONS. The same test should be applied to every stop written into a brief.

If the tier question itself matters, only a replay of one brief on both tiers, with the process held fixed, can answer it. The records cannot.

## What I did not do

- Built nothing, ran no program. Edited nothing outside this file.
- Did not read the 09-17 climb's transcripts, or the coordinator's own turns.
- Did not re-verify the "other" counts one by one. They are rounded from the corrections lists.
- Did not check whether the switch-over reaches rows 419 and 420. The batch-5 review states that by reading.

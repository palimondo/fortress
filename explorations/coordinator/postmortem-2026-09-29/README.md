<!-- The post-mortem of the batch practice, opened 2026-09-29 at Pavol's word after batch 6.5b's landing showed 866 committed record files and 46K lines beside about 280 lines of Fortress code: how the batches came to commit scratch, run rituals nobody decided and spend most of their tokens proving and recording rather than changing Fortress, which tier of model did what, and the review that will define a new practice. -->

# Post-mortem of 2026-09-29: the batch practice

Opened at Pavol's word (19:21:03 UTC on 2026-09-29): "The archaeology must be committed. We are now performing a new post-mortem. Mark it with today's date. We are reviewing our procedures like we did previously. All this goes on record so that the failures of the models can be remedied and that the anthropic researchers who think they know what software development is and how software development is solved and be shamed publicly."

## What set it off

Batch 6.5b landed at `e3214cbf1`. Measured from its base `382b9fe7f` to its landing, the change to Fortress itself was about 280 lines of library, interpreter and checker code, 90 lines of specification text and 710 lines of tests. Beside it the batch committed 866 record files, 46K lines: 14 reports (1.9K lines), 228 captured run outputs (37K lines, the largest a 17K-line LaTeX build log), 247 probe programs and test drafts, 377 scripts and small files; 583 of the 866 are named by no report or record. The run took 17 agents, 6.15M tokens by the reviews' measure, and 7 h 43 min (`explorations/reviews/batch-6.5b-review.md`). Pavol's reading (18:25 UTC): "Those are scratch that got committed anyway. … We must adjust our practice. This is unsustainable." "I do not recall that I have voluntarily accepted to be committing all these log files together with the batches." And on the output comparison each rung runs three times over the whole interpreter corpus (18:52 UTC): "why would you have to run it multiple times at the beginning to establish some kind of baseline? … if it's necessary … then we need to redesign how the test suite for Fortress is working."

His points, held while he reads, are the four groups of 18:25 to 18:52 UTC in `../postmortem-2026-09-19/held-list.md`, under "Held while he reads".

## What is here

- `characterization.md`: every batch from git (what each changed in Fortress, what it committed beside that, cited against uncited, its coordinator-record churn and ledger rows), the token spend of every run by stage, and the revival's tests measured against the team's test-suite practice; ten read-only readers of workflow `wf_576bd1f3-f0c`, their sections as returned.
- `measures-6.5b.md`: the coordinator's measurements of batch 6.5b given to Pavol in chat (what it changed in Fortress, what it committed beside that, its tokens by stage, the 18 tests that vary from run to run, all the team's).
- `archaeology-testing.md`: where the testing practice and the skeptic came from, by a Sonnet archaeology worker: Pavol's words on test-first (a failing test written first, seen failing, then the fix, a permanent check, never a captured file), the skeptic as the coordinator's role with an adversarial default, the recorded failure's growth step by step, the reviews that never questioned it, where it drifted with first commits, and his hypothesis that his ask for an adversarial skeptic was the original sin (in part, and not as his request).
- `archaeology.md`: how the batches came to commit probes, captures and logs, and how the corpus-wide output comparison became standing; by a Sonnet archaeology worker, read-only, from both sessions' transcripts and the commit history. Its findings, in short:
  - No message ever asked Pavol whether a rung's probes, captures, build logs and scratch should go to `main`, and no rule says to commit scratch. The practice is the sum of six small steps, each put in by the coordinator or a worker (section 1).
  - On 2026-09-19 at 12:50 he asked "do we need the logs? … text would keep accumulating in the repo. And I don't think it would buy us anything." The coordinator kept the gate's full logs out, which held, and in the same change made ".txt, never .out or .log" the rule for every rung's captures so that `.gitignore` could not catch them, and did not tell him that part stood; its summary to him said "no log files in the repository" (section 8).
  - The output comparison grew from two one-off counts he agreed to (row 330 on 09-21, row 379 on 09-24) into a standing stop with three runs per rung, written by batch 4's planning worker and passed by a Fable review, and copied by every batch since; he was never asked about making it standing (section 5).
  - The Swift and lit discussion of 2026-09-17 recorded "golden output where a value matters", one test at a time (`PLAN.md`, the testing techniques); the corpus-wide comparison is not that practice (section 6).
  - The rung folders grew from 286 files at batch 1 to 850 at 6.5b, 8,923 files and 55 MB under `explorations/compile-ladder/` today, 4,953 of them under `probes/`, against a projection of 2,900 over ten batches that was never shown to him (section 3).

## Which tier did what

Read from the transcripts' model fields on 2026-09-29 by the coordinator.

- The coordinating session `fe616d40` ran on Fable from 2026-09-08 until 2026-09-25 22:58 UTC (Opus 5 for part of 09-18, from about 09:50 to 18:45), and on Opus 5.5 since, the switch at Pavol's request (POSITIONS 2026-09-25). The earlier session `bdff267d` ran on Fable until 11:07 UTC on 2026-09-17 and on Opus 5 from 11:51 to its end at 20:31.
- Committing captures: the rule that a rung's recorded failure is required (the batched-climb plan, 09-17 16:09 to 16:52) and the repair batch's brief putting "probe programs and captured outputs" under `probes/` (09-17 19:22) were the coordinator's, on Opus 5; the first stated reason to commit captures, "Commit the captured outputs … every citation to them … would dangle", was the repair batch's R2 skeptic, on Opus 5 (09-18 23:55); the coordinator, back on Fable, made it systematic in the batch 1 and batch 2 scripts on 09-19 (`cb242a2d8`, `a0fcf0a96`), the `.txt` rule among it, which an Opus 5 review worker had proposed that morning for gate logs only.
- The output comparison: batch 4's planning worker, on Opus 5.5 (09-26 00:34 to 01:07, `aad1f169c`), wrote the second run of the base and the stop on any changed output; a Fable reviewer passed it and made the count a stop no judge may continue past (01:07 to 01:28, `9cef0b17a`); batch 5's planning worker, on Opus 5.5 (`3d5be3142`, 10:26), wrote the three-run form, and a Fable reviewer passed it (10:28); the coordinator was on Opus 5.5. Neither tier asked whether the rule was worth its cost.

## Still to come here

- `review-opus.md` and `review-fable.md`: the two independent reviews proposing a new batch practice (Pavol, 18:42 UTC); his answer to their first decision is POSITIONS 2026-09-29, what a batch commits.
- `synthesis.md`, to come: the new practice, the four remaining questions with defaults for his review, and the lines to change (POSITIONS 2026-09-29, the night's go).
- The cleaning pass of the committed scratch, and his plan of 2026-09-20 that `main` hold only the changes to Fortress while the process record lives on its own branch (POSITIONS 2026-09-20; `PLAN.md`, the cleaner pass of `main`).

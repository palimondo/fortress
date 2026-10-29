<!-- The final report of the post-mortem of 2026-09-29 on the batch practice, written on 2026-10-29 by an Opus worker from the post-mortem's own files, the git history of this folder, the record files that cite it and the session transcript: what it found (committed scratch and a standing output comparison that nobody put to him), what was done (what a batch commits, the synthesis, the script review, climb batch 7b on the new practice, the two cleanings, the four questions settled), where each lesson lives now in the skills and POSITIONS, and what is still open with its home (the cleaner pass of `main`, the answer owed on one test's 50 checks, a held line already answered, the out-of-date README). -->

# The post-mortem of 2026-09-29, the batch practice: final report

## Terms and sources

- **The curator** is Pavol, who directs the revival. **The coordinator** is the long-running Claude Code session that talks to him, briefs workers and keeps the record. **Fable**, **Opus** and **Sonnet** are model tiers.
- **A climb batch** is a Workflow run that makes several changes to the code, each called a rung, and lands them together. In a batch, a rung worker makes the change and its test; **the skeptic** checks the rung; **a judge** rules when the skeptic refuses or a review finding is contested; **the gather** merges the rungs; **the merged-diff review** reads the merged change; **the gate** is the full check of the tree before it lands. **Scratch** is what a worker makes and does not need to keep: logs, captured output, probe programs.
- **The record** is the project's memory in `explorations/`: `POSITIONS.md` (his decisions, each entry with a permanent number such as P-103), `FACTS.md`, `PLAN.md`, the review queue (`review-queue.md`, the items that wait for his word) and the held list (`HELD.md`, the points he raised while reading). An entry removed from POSITIONS keeps its text in `POSITIONS-history.md`.
- **The transcript** is the coordinator's session transcript, `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`; its part up to 2026-10-08 is on the branch `transcripts-blinded`. A time below with no file is a time in it, in UTC.
- A sentence marked **"the writer's judgement"** is this report's own. Everything else is cited.

## 1. What the post-mortem was

- Climb batch 6.5b landed at `e3214cbf1` on 2026-09-29. It changed about 280 lines of library, interpreter and checker code, 90 lines of the specification and 710 lines of tests, and committed 866 record files, 46K lines, beside them. 583 of the 866 were named by no report or record.
- His reading, at 18:25:19: "Those are scratch that got committed anyway." "We must adjust our practice. This is unsustainable." "I do not recall that I have voluntarily accepted to be committing all these log files together with the batches."
- On the comparison of the whole interpreter corpus's output that each rung ran three times, at 18:52:49: "why would you have to run it multiple times at the beginning to establish some kind of baseline?"
- He opened the post-mortem at 19:21:03: "The archaeology must be committed. We are now performing a new post-mortem. Mark it with today's date. We are reviewing our procedures like we did previously. All this goes on record so that the failures of the models can be remedied and that the anthropic researchers who think they know what software development is and how software development is solved and be shamed publicly."
- He gave the night's go at 21:09:04: "I am authorizing you to, to do the synthesis with you and Fable, prepare the script, review it, and make the next run, 7B, run with it. … You can now redeem yourself by fixing this and, and, and showing me that you can be token efficient and not do bullshit jobs that you invented yourself."

Sources:
1. `README.md` of this folder, "What set it off"; `measures-6.5b.md`.
2. Transcript, 2026-09-29 18:25:19, 18:52:49, 19:21:03, 21:09:04.

## 2. What it found

- **No message ever asked him whether a rung's scratch should go to `main`, and no rule said to commit it.** The practice was the sum of six small steps, each made by the coordinator or a worker. On 2026-09-19 he had asked "do we need the logs?"; the coordinator kept the gate's full logs out, and in the same change made `.txt` the suffix for every rung's captures, so that `.gitignore` could not catch them, and did not tell him.
- **The output comparison grew from two one-off counts he agreed to into a standing rule with three runs per rung.** Batch 4's planning worker wrote it, a Fable review passed it, and every batch copied it. He was never asked.
- **The batches committed 15 to 504 lines of record for each changed line of code and specification.** The rung worker spent about half of the tokens; the skeptic, the review loop and the refusal cycle about 36 percent; the gate about 4 percent. The revival's 411 test files departed from the team's practice: names with `Rung<X>`, provenance in assertion messages, and most later edits only moving citations.
- **His testing rule had drifted.** His words on test first meant a failing test written first, seen failing, then the fix, and a permanent check, never a captured file. Step by step, "verify it fails" became a captured and committed record of the failure. His own hypothesis, that his request for an adversarial skeptic was the first cause, holds in part, and not as his request.
- **Each tier introduced and passed practices.** The rule that a rung's recorded failure is required came from the coordinator while it ran on Opus (2026-09-17), and the first stated reason to commit captures from a skeptic on Opus (2026-09-18); the coordinator, back on Fable, made both part of the batch scripts on 2026-09-19; the three-run comparison came from Opus planning workers and was passed by Fable reviewers. "Neither tier asked whether the rule was worth its cost."
- **Two independent reviews, one Opus and one Fable, proposed a new practice.** They agree on five decisions and differ on where scratch goes and which review loops stay.

Sources:
1. `archaeology.md`, its short answer and sections 1, 3, 5, 6 and 8.
2. `characterization.md`; `INDEX.md`, its line for `characterization.md`.
3. `archaeology-testing.md`, sections 1 to 7.
4. `README.md` of this folder, "Which tier did what".
5. `review-opus.md`; `review-fable.md`.

## 3. What was done, and where it landed

- **What a batch commits.** His answer to the reviews' first decision, recorded at 20:43 and 20:48 on 2026-09-29 (`058adf2a5`, `3f1fefbaa`): "the commit discipline in a branch should not be different from what you will be committing to the main. Like don't keep temporary shit around. We are backing up the transcripts anyway from all the workers." This was P-115.
- **Test first.** His statement of what test first is for was added to his rule of 2026-09-17 (`b6d8e39cd`), and the test states the core problem as a clean minimal program, not the probe's shape (`da7771e2e`). Both are in P-102, "Test first, the test kept.", whose history records that on 2026-10-13 the clean minimal test moved on to `fortress-repo/references/tests-writing.md`.
- **The synthesis** (`synthesis.md`, `f846c5fd9`, 21:36), by a Fable worker, set the new practice stage by stage, with defaults for the four questions left open and the exact changes to the batch script, its manual and the protocol.
- **The script's rewrite was reviewed** (`script-review.md`, `c00527126`): two blocking findings and ten smaller ones, fixed in `ce3d0be9f` at 22:49.
- **Climb batch 7b ran on the new practice** and landed at `b0eb41516` (2026-09-30 08:08). Its review: "The new practice held." It committed 20 record files beside its change; every rung that fixed a defect committed its test alone and saw it fail before the fix.
- **The cleaning.** The first cleaning (`9269f7bd2`, 23:16 on 2026-09-29) removed 4,366 committed files. At 05:05:47 on 2026-09-30 he challenged it: "It seems to me that the cleanup operated under faulty premise … Can it come up with more useful cleanup strategy?" A Fable review (`cleanup-review.md`) proposed a rule by kind, and the cleaning by kind (9,926 files, 173 MB removed, 1,080 kept) was merged in `d2d5e83a8` at 08:11 on 2026-09-30. Its commit for `explorations/apl` (`1ee3b0bc5`) removed the input files of the two microGPT check programs, which then could not run; they were restored on 2026-10-02 (`8caa42acd`; ledger row 576).
- **The night's consolidations were reviewed** for lost detail (`consolidation-review.md`, `36e362a31`); six minor losses were repaired (`a38c1e746`).
- **The four questions were settled.** The output comparison: P-103, "The suite's verdict is the check.", in his words of 2026-09-29, recorded on 2026-10-02 (`d39d6fe75`). The review loops: the merged-diff review stays, and a review that still blocks after its repair does not hold a green batch (P-113, removed from POSITIONS on 2026-10-13 into the skill). Test names: new tests are named by topic, settled on 2026-10-02. The cleaning: by kind, as above. The removed entry P-122, "The new batch practice, and what he expects of it.", summed this up and said it was all built.
- **Two later rules came from the same evidence:** the skeptic reads from the worker's transcript whether the test came first, and nothing is built or run twice on the same code (`7266ed23c`, 2026-10-02, with `skeptic-scope-judgement.md`). The `.tex` line numbers were stripped from the tests' messages once (`dc0eee2fe`, 2026-09-30).

Sources:
1. `POSITIONS-history.md`: P-115, P-113 and P-122, each with its block of 2026-10-13 19:58Z; `POSITIONS.md`: P-102, P-103.
2. `reviews/batch-7b-review.md`, lines 1 to 14.
3. Transcript, 2026-09-30 05:05:47; `cleanup.md`; `cleanup-review.md`; this folder's `README.md`, "What is here".
4. `review-queue.md:1783` to `:1791`, the settled items of 2026-10-02.
5. The commits named above.

## 4. What it taught, and where each lesson lives now

On 2026-10-13 the entries P-113, P-115 and P-122 left POSITIONS for the skills; P-102 and P-103 stay in POSITIONS. Each lesson lives here now:

- **Commit no scratch; the transcript keeps how the work was done.** Home: `.claude/skills/fortress-repo/SKILL.md:177`; `fortress-repo/references/committing.md`, the term "scratch" and "What to commit"; the source line `fortress-repo/references/sources.md:285`, which cites `archaeology.md`.
- **The suite's verdict is the check: a value that matters is asserted inside its test, and no run is compared with a saved copy.** Home: P-103; `fortress-repo/SKILL.md:167`. The tool for a one-time count that a decision names, run once on the base and once after the edit: `explorations/coordinator/tools/count-run/` (`fortress-repo/references/gate.md:105`).
- **Test first, the test kept.** Home: P-102; `fortress-repo/SKILL.md`, "Rules for every task".
- **Spend the fewest workers a step needs, and run nothing twice on the same code.** Home: `.claude/skills/coordinator/references/batch.md:41` and `:43`.
- **The skeptic builds nothing and reads from the transcript whether the test came first and failed.** Home: `coordinator/references/batch.md:49`.
- **A cleaning sorts a file by who reads it, not by how it was made, and runs each kept tool once on the cleaned tree before it lands.** Home: `PLAN.md`, "Off the path, parked", "Housekeeping", which takes it from ledger row 576, the two microGPT checks that the cleaning stopped.
- **Never commit a copied directory.** Home: `fortress-repo/references/committing.md:26`; its source, `fortress-repo/references/sources.md:468`, cites `archaeology.md`.
- **Each batch's spend by stage.** Home: `coordinator/references/analysis.md:7`, which points to `characterization.md`.

## 5. What is still open, and where each item lives

- **The cleaner pass of `main`, the post-mortem's last "still to come".** His plan of 2026-09-20: `main` holds only the changes to Fortress, and the whole process record lives on a branch of its own. The synthesis, section 2(d), kept it as part B, "a force-push, done from his machine, after one batch has run clean under the new rules". Home: `PLAN.md`, "Off the path, parked", "Housekeeping"; P-128, "Where the work lives.", in `POSITIONS-history.md`.
- **Why the test `PowChooseLcmRungE` has 50 checks: an answer owed to him.** He asked at 18:25:19 on 2026-09-29 and withdrew the full review of the tests in the same message. Home: review-queue item 156; `HELD.md`, "Held while he reads (2026-09-27)", the line on batch 6.5b.
- **A held line that is answered but still listed.** `HELD.md` still asks to "Dig up the early discussion comparing Fortress's test suite with the Swift compiler's". The writer's judgement: `archaeology.md`, addendum 2, answers it, and `fortress-repo/references/sources.md:148` cites that addendum; the line can go when he next works through the list.
- **This folder's README is out of date.** Its section "Still to come here" lists the two reviews, the synthesis and the cleaning, and all have landed (section 3). The writer's judgement: a short fix for the coordinator; this report does not change the README.

Sources:
1. `synthesis.md`, section 2(d); `PLAN.md:193`; `POSITIONS-history.md`, P-128, the block of 2026-10-13 19:58Z.
2. `review-queue.md`, item 156; `HELD.md`, "Held while he reads (2026-09-27)".
3. `archaeology.md`, addendum 2.
4. This folder's `README.md`, "Still to come here".

<!-- The final report of the post-mortem of the coordinating session's Haiku window, 2026-10-16 20:09 UTC to 2026-10-19 21:04 UTC, written on 2026-10-29 by an Opus worker from the post-mortem's own files, the git history of this folder, the record files that cite it and the session transcript: what it found, where each part of its redo plan landed (the record fixes, the Opus work, asks 1 to 5 answered, four of them as POSITIONS entries on the integer power, sizes, the order of lists and the symbolic operators), where each lesson lives now (the model check, the held-line rule, the quiet-times rule, the git-check switch), and the asks still open with their homes (who decides changes to the coordinator skill, `AnyList`, value parameters under a condition, landing pages, push notifications). -->

# The post-mortem of the Haiku window: final report

## Terms and sources

- **The curator** is Pavol, who directs the revival. **The coordinator** is the long-running Claude Code session that talks to him, briefs workers and keeps the record. **Fable**, **Opus**, **Sonnet** and **Haiku** are model tiers, from the highest to the cheapest. The coordinator is to run on Opus or Fable.
- **The window** is the time from 20:09:30 UTC on 2026-10-16 to 21:04:25 UTC on 2026-10-19, in which the coordinator ran on Haiku.
- **The record** is the project's memory in `explorations/`: `POSITIONS.md` (his decisions, each entry with a permanent number such as P-151), `FACTS.md`, the gap ledger (`explorations/fortress-gap-ledger.md`, one numbered row for each known gap), `PLAN.md`, the review queue (`review-queue.md`, the items that wait for his word), the boot note (`BOOT.md`, what runs now and what waits) and the held list (`HELD.md`, the points he raised while reading).
- **A climb batch** is a Workflow run that makes several changes, called rungs, and lands them together after the gate, the full check of the tree. **The standing go** is his advance permission for the batches of PLAN's phase 3, each launched when the one before has landed. **The switch-over** is the planned move of the compiled path onto the interpreter's library. **The distance** is the count of the compiled checker's errors on that library, which must reach zero before the switch-over.
- **An ask** is one decision put to him in one message, with a default. **The redo plan** is section D of `fable-judgement.md`.
- **The transcript** is the coordinator's session transcript, `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`. A time below with no file is a time in it, in UTC.
- A sentence marked **"the writer's judgement"** is this report's own. Everything else is cited.

## 1. What the post-mortem was

- In the window every reply of the coordinator, 683 messages, ran on Haiku. The curator's phone client had sent the model change with one of his messages, and he says he never chose it. The coordinator did not tell him, and its boot notes kept the line that the session ran on Opus. The workers kept their tiers, so what Haiku wrote is the coordinator's own work: its messages to him, its briefs, its commits, two compaction summaries and version 22 of the revival page.
- He saw it at 21:04:25 on 2026-10-19: "I noticed the model was now Haiku in my UI. Was this the case before, after the boot?" At 21:15:29: "Boot up. Then we must review the whole Haiku window. This is a disaster. I never intentionally switched to Haiku and I have noticed only now. … let's analyze everything and we should probably redo all the writing (report integration, skill updates, etc. where the writer was not an Opus tier) and especially the decisions that were taken by Haiku and there was no Fable review."
- He set the method at 21:38:34: "We need to correct everything that's part of the record and review and access re-doing the design decision that were done on Haiku's recommendation (regardless of my approval — this must me critical review of decisions and consequences)." And at 21:40:04: "So option 1 as you recommended: thorough Opus reviewers, then one Fable pass."
- The folder was written from 21:23 to 22:18 on 2026-10-19: the index into the transcript with two scripts, three Opus reviews of the window in three parts, and the Fable judgement with the redo plan.

Sources:
1. `README.md` of this folder.
2. Transcript, 2026-10-19 21:04:25, 21:15:29, 21:38:34, 21:40:04.
3. `git log -- explorations/coordinator/postmortem-2026-10-19-haiku/`: `12a6e553f` (21:23) to `7a5c4cf13` (22:18).

## 2. What it found

- **Three Opus reviewers judged 86 acts of the coordinator**: 32 on the evening and morning of 16 and 17 October, 35 around climb batches 17 and 18, and 19 on his return on 19 October. Each act has who decided, a verdict and what to redo.
- **The Fable pass kept the code and faulted the words.** Every rung of climb batches 17 and 18 conforms to the record's decisions or to the three principles that settle most design questions (the team's later word, the library as the team wrote it, and what peer languages do), the gates are green and microGPT's quick check passes 7 of 7, so no rung is redone. What was wrong was mostly what the coordinator told him: asks for a go that the standing go already covered, an ask on the integer power that was wrong in fact and in form, and reports that the coordinator called the workers' returned texts when it had changed them.
- **What the three reviewers missed**, in the Fable pass's words, among five points: walk's half of conditional extension (ledger row 774: walk reads an `extends` entry under a `where` clause as holding at every instance) would have landed a departure in walk's values at its default with no word of his; PLAN's phase 3 had carried, since 2026-10-15, a conflict with P-85, "The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D."; and "The record leaned on a held line as his approval": climb batch 17's record cited a point on the held list as his yes.
- **The record had moved off its branch.** On 2026-10-19 at 16:50 the coordinator moved the record to the designated branch alone, against the standing rule that it lands on `main`.

Sources:
1. `part-1-evening-and-morning.md`; `part-2-batches.md`; `part-3-return.md`; `INDEX.md`, their lines.
2. `fable-judgement.md`, sections B, C and D.4.

## 3. What the redo plan did, and where each part landed

- **The record fixes**, the plan's section D.1, landed from 22:23 to 22:38 on 2026-10-19, one commit each, from `ba93d28ec` (the reason and what is still to build of P-152, "Walk and the compiled checker read the exclusion of two generic declarations over their whole parameter types, by existential reduction.") to `ada547c0b` (the report of the probe on ledger row 766, a defect of walk's generic dotted methods, given back its worker's words). Among them: the held line cut from climb batch 17's record (`9565c98ef`), and P-151's `AnyList` filed as review-queue item 188 (`c34bfb465`). The branches `main` and `blinded-fable` were brought to the record's head; when the permission check refused the pushes, he answered at 22:22:33: "I hereby declare I want this."
- **The Opus work**, the plan's section D.2:
  - Batch 18's post-batch review and the digest of where the project stands: `33b88c48d` (`reviews/batch-18-review.md`, `reviews/digest-2026-10-19.md`).
  - The probe that P-152 asks for, on both walk and the checker: `55bbb48ef` (`perf-probes/existential-reduction/`).
  - The record pass for the probe that sorted the checker's errors on symbolic operators: `e043ba41f` (the figures of F-245, the count of the checker's errors with every symbolic operator checked), `a86598454` (the probe's three defects as ledger rows 782 to 784), `86318dc26` (two probe reports replaced by the workers' returned texts).
  - The ask on what an integer raised to a negative power gives, PLAN item 58, rewritten with its review: `472509d97` (`reviews/integer-power-negative-exponent.md`).
  - The probes' unsaved changes saved as patch files: `62bf23368`.
  - The boot note rewritten whole: `8638f54bc`.
  - The skill writer's pass with the two rules (below) and its cold read: `b15c88694`.
  - The cost tally of climb batches 14 to 18: `5bef46d64` (`process-engineering/batch-costs-14-18.md`).
  - The revival page was published again as version 23 on 2026-10-24 (`ef425379e`).
- **The asks**, the plan's section D.3, one a message:
  1. Relaunch the digest and the cost tally that his interrupt had stopped: "Option 1, as recommended, relaunch both." (22:37:38 on 2026-10-19).
  2. The integer power: at 23:55:49 he found that "None of the options seem to fit" and asked for Fable; the Fable judgement (`c302e4613`) recommended a combination, and he said "Yes." at 00:44:34 on 2026-10-20. This is P-153 (`d3b5b812d`), "The integer power splits on the base: an integer base gives an integer or raises an error, and a float or rational base gives the fraction."
  3. The distance's 21 array sites against P-85: after a list of the ways (`de6d5e5c8`) he said at 05:42:24 "I agree with the recommendation. The patch made sense to me." His answer went into P-40, "Sizes are checked, and a size that inference leaves unknown is an error only where it is used." (`4d2aef691`: the vector and matrix operators' unused sizes go by decision E's diff); review-queue item 36 records it as answered in part, for the 17 vector and matrix operators.
  4. Whether a list of partially ordered elements has an order on the checker: "Agreed. We are not designing a new trait at this point." (06:18:00). This is P-154 (`27722cd3f`), "A list is ordered only where its element type is totally ordered."
  5. When the checker checks overloads of symbolic operators such as `+` and `^`: "I'm leaning to option 2 before the switchover. Otherwise, we are just sweeping problems under the rug." (11:52:00). This is P-155 (`f502f5563`), "The compiled checker checks symbolic operators before the switch-over." The plan's default had been "after the switch-over".
- **Asks 6 to 10 are still open** (section 5).

Sources:
1. `fable-judgement.md`, section D.
2. `git log ba93d28ec^..ada547c0b`; the other commits named above.
3. Transcript, 2026-10-19 22:22:33, 22:37:38, 23:55:49; 2026-10-20 00:44:34, 05:42:24, 06:18:00, 11:52:00.
4. `git show 8638f54bc:explorations/coordinator/BOOT.md`, "The redo plan of the post-mortem"; `review-queue.md`, item 36.

## 4. What it taught, and where each lesson lives now

- **The coordinator checks which model serves it, at every boot and after every turn.** He asked at 21:43:32 for a Stop hook that would "mechanically verify that the main coordinator session runs on Opus or Fable tier and raise all hell of it switches to Sonnet or Haiku", and chose option 1 at 21:49:01. Home: the hook `.claude/hooks/model-check.sh` (`156909266`, 22:03 on 2026-10-19; extended on 2026-10-25 by `05a4fdb11`, a check after each compaction); `explorations/coordinator/tools/model-now.sh`; `.claude/skills/coordinator/SKILL.md`, the term "model check" (line 70), step 0 of the boot (line 216) and what to do on the alarm (lines 229 to 233). Its source line: `coordinator/references/sources.md:127`.
- **A held line is never his yes.** Home: `SKILL.md:175` ("Being on the list answers nothing, so never cite a held line as the curator's yes"). He approved it, and the rule of the next point, at 23:32:52: "Yes to both rules." Its source: `coordinator/references/sources.md:130`.
- **While he is away, messages are kept to the minimum, with no running commentary.** It was his point of 19:57 on 2026-10-16, inside the window. Home: `SKILL.md`, "Quiet times", from line 161; its source: `coordinator/references/sources.md:129`.
- **The platform's git-check reminders are switched off at every start.** He asked at 22:17:54: "write a shell script that neutralizes the git-check nagging whenever the platform resets it." Home: `.claude/hooks/git-check-off.sh` (`02ac0fb15`); the term "git-check switch" in `SKILL.md`.
- **The phase-3 batches run on the standing go; an ask for a go that it covers is an error.** Home: `coordinator/references/batch.md`, "The go", line 34.
- **The record lands on `main` by three pushes.** Home: `.claude/skills/fortress-repo/references/committing.md`, "Pushing".
- **A design decision is weighed on its merits, whatever he approved.** This was the post-mortem's own method, at his word of 21:38:34. The writer's judgement: no skill states it as a rule; the three principles in `SKILL.md`, "The curator's role and decisions", are what the Fable pass applied.

## 5. What is still open, and where each item lives

His rule for the order, at 12:58:43 on 2026-10-20: "Regarding the review queue, let's go with the option 1, the 7 by batch 20, which has landed, so now, and we'll decide later what we'll do with the rest after that one." The boot note puts asks 6, 7, 9 and 10 after climb batch 20's review list and the ask on reading INDEX.

- **Ask 6: who decides changes to the coordinator's own skill.** The plan's default is the reviewer's two texts, which add "who decides what" to the first kind of change and tie the second kind to the skill writer's part. Until he answers, no edit of the coordinator skill is made without his yes on its wording. Home: `BOOT.md:59`; `BOOT.md:78`. The lines that the ask names, `SKILL.md:101-102` at the time, are `SKILL.md:113-114` now.
- **Ask 7: the `AnyList` of P-151, "Only the `where`-clause forms that the team wrote down are built", built otherwise than his option's letter.** His option 3 of 16:42 on 2026-10-16 moves `addLeft` and `addRight` into `List`; climb batch 17 kept them in `AnyList`, respelled under the live clause. P-151 still says that they "move into `List` (row 799)". Default: as built, with P-151's sentence changed. Home: review-queue item 188; `BOOT.md:78`.
- **Ask 8: where an object's value parameters fall under a conditional extension.** Default: as repaired, with the members. It waits for the batch that repairs ledger row 773, where the checker lets a member checked under a conditional extension's condition be called where the condition fails. Home: review-queue item 177.
- **Ask 9: a page for each batch's landing.** Default: no page; each landing review carries the cost section of climb batch 15. Home: `BOOT.md:78` only.
- **Ask 10: a push notification names the batch it is about and what it waits on.** Default: yes. The writer's judgement: `SKILL.md:169`, on push notifications, does not say so yet. Home: `BOOT.md:78` only.
- **Whether the type group's paper of 2011 is the reason for P-152.** The record fix `ba93d28ec` replaced P-152's reason, the revival's own text, with the paper; no message of his reviews the new reason. Needed by: never. Home: review-queue item 228.
- **The plan's leftovers that the boot note dropped.** The boot note of 14:04 on 2026-10-20 (`1466bf153`) still listed the reorientation from the digest, ledger row 584's note, old section numbers cited in climb batch 17's record and two rung files, `lists17.py`, and one flag of a cold read. The boot note of 17:19 (`5160e328f`) dropped the list with no commit that closes it. The writer's judgement: the note on row 584 (the compiled checker never checked an overloaded operator whose name is not a word of capitals) is moot, since the row is `FIXED`; the reorientation was overtaken by the answers to asks 3 to 5 and by the phase 3 exit review, run from 2026-10-24 (`explorations/reviews/phase3-exit/README.md`); the writer did not check the section numbers, `lists17.py` or the flag, which have no home now.
- **The post-mortem of the record of 2026-10-20 to 22 carries the same four open asks** (6, 7, 9 and 10) in its `postmortem-2026-10-20-record/REPORT.md`, section 7.

Sources:
1. Transcript, 2026-10-20 12:58:43; `BOOT.md`, "Still open after the asks above" and "Owed, small".
2. `fable-judgement.md`, section D.3, asks 6 to 10.
3. `review-queue.md`, items 177, 188 and 228; `POSITIONS.md`, P-151.
4. `git show 1466bf153 -- explorations/coordinator/BOOT.md`; `git show 5160e328f -- explorations/coordinator/BOOT.md`; `facts-extract.sh 'ledger:584'`.

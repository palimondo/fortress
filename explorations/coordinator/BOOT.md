<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 08:35 UTC on 2026-10-22** (10:35 his time). **At his word of 08:19:30 UTC, refined at 08:28:48, the session runs autonomously** until POSITIONS, FACTS and the `fortress-repo` skill's revival part are consolidated, by the plan below. He is away for long stretches. Five Workflow runs are in flight, and two Opus workers (Agent tool).

## The boot after a compaction, a one-time exception

A light boot, since the work needs the plan, not the whole record. It reads only, in this order:

1. `get_session` with no session ID: the model, as step 0 of the boot says.
2. The two cores: `.claude/skills/coordinator/SKILL.md` and `.claude/skills/fortress-repo/SKILL.md`. Then the coordinator's `references/delegating.md`, `references/skill-rewrite.md` and `references/record.md`.
3. This boot note, whole, then `explorations/coordinator/HELD.md`, whose 10-21 and 10-22 sections hold his rules for this work.
4. `explorations/coordinator/tools/record-clarity/README.md`, and `explorations/reviews/revival-record-synthesis.md` whole (Astra's review, the standard for every stage).

Do not read FACTS, POSITIONS, INDEX or PLAN whole; workers read them. Take this section out after the boot.

## His word of 08:19 and its refinement of 08:28, in short

- The audit and the clarity pilot are approved "as a run": done, finished, applied (stage 1). Only open questions go to the review queue.
- The clarity rewrite runs over the rest of POSITIONS and over FACTS as a Workflow, the process of the skill rewrite of 10-08 (run `wf_185878c8-0fb`, script in the session's `workflows/scripts/fortress-repo-skill-rewrite-wf_185878c8-0fb.js`) and of the pilot, made reusable: `explorations/coordinator/tools/record-clarity/`. The mining workflow stays a tool: `positions-audit/README.md`.
- One pass or two: the clarity writer reads the audit's evidence and starts from its applied corrections, so this run is one pass; when the mining runs again, its correction and the clarity rewrite can be one writer stage (said in the mining README).
- "Built" and "Still to build" lines stay in POSITIONS for now; moving them to PLAN is a possible size saving later.
- The process is encoded in the skills after the runs (stage 5).

## Done

- **Stage 1,** `6b560762f`: the audit's groups 1 to 7 and the pilot's ten entries applied (`positions-audit/apply-2026-10-22/`, its `build.py` and ten apply files); P-16 and P-123 struck; P-27, P-38, P-43, P-90 unchanged, held for his answers; F-39's pointer. POSITIONS has 81 entries.
- **Stage 1's history and queue:** `9c17b3975`, 58 noted blocks (`11-history-notes.apply`: the 25 kept entries' sources, P-10's and P-88's page comments, 46 corrections of blocks naming the wrong commit); `329d866a9`, review-queue items 205 to 234 (the audit's ten drafted items, its 16 questions, the pilot's 4) and the drafts' changes to existing items. Left for later: 11 old blocks that name the wrong commit and no writer listed (P-10, P-67, P-68, P-84, P-88, P-95 to P-98, P-103, P-124, P-125; one more `note --correcting` call), and queue lines that quote old titles (item 60, line 50, settled item 1, the settled entries for P-149, P-50, P-51).
- **Stage 2,** `d56844991`: the clarity workflow, `tools/record-clarity/` (`record-clarity.js`, `writer.md`, `fix.md`, `coldread.md`, `check.md`, `assess.md`, `entries.py`, README); the mining README; the run arguments, `consolidation-2026-10-22/runs.json`. Its script was checked with stub agents for both kinds.

## In flight

- **Five Workflow runs of `tools/record-clarity/record-clarity.js`, launched at 08:34 UTC** (spend epoch 1792658063), their args in `consolidation-2026-10-22/runs.json`, output under `consolidation-2026-10-22/evidence/positions/` and `.../facts/`:
  - `wf_d3e351c0-edc`: positions p1, p2.
  - `wf_9d898834-f5c`: positions p3, p4.
  - `wf_d8fdeed7-8b4`: positions p5, p6.
  - `wf_e98f1b26-a7f`: positions p7, p8.
  - `wf_d4a20e43-e1d`: the FACTS calibration, f0 (F-151, F-261, F-262, F-263, F-264).
  - Estimates of tokens written: the four positions runs about 7M; the calibration about 1M.
  - Do not edit `record-clarity.js` or its briefs while these runs live; to change a brief for the FACTS run, resume nothing from the old version, and launch the new runs after these end.
- **Check-ins** "Consolidation check-in 1" to "4", at 09:20, 10:05, 10:50 and 11:35 UTC (`trig_01BHLM6kPwqAtHFepD8svZS3`, `trig_01CfentvcWNXcEB8mQDqhnPR`, `trig_01RSgn5zyiQbtyvzLUu2oZ1k`, `trig_01RknQ6q4s2DRkUTV2tPFro2`). Arm more, 45 minutes apart, while runs live.

## The plan from here

**After each chunk** (`record-clarity/README.md`, "After a chunk"): read its `proposals.md` and `cold-read-2.md`; apply `proposals.apply` on a copy, `check --base`, then on `main`; commit the record with the chunk's files; file its questions in the queue (a change of meaning that no source settles is not applied); merge its `concepts.md` into `consolidation-2026-10-22/concepts.md`, with the pilot's `positions-audit/clarity/evidence/concepts.md`.

**Stage 4, FACTS.** Read the calibration (`evidence/facts/f0/`): does the assessment pick the right entries, and do the rewrites keep scope and evidence? Fix the briefs if needed, then launch the four `facts` runs of `runs.json` (16 chunks, 193 entries), side by side with what is left of POSITIONS. Estimate about 10M. "Investigate" entries keep their text; their narrow questions go to a list, then to the queue.

**Stage 5, the skill text,** through the skill writer (`skill-writer.sh`, Opus), after stages 3 and 4: `coordinator/references/record.md` (an entry reads on its own; pointers carry a few words; no handles; Astra's FACTS rubric and dispositions; the record pass owns the final wording; the mining and clarity workflows and when to run them); `skill-rewrite.md` and the writer's standing brief (Astra's post-landing rule in place of "each change, with its contradiction and its reason"; the growth loophole closed); her two cold-read questions in `skill-cold-read-brief.md`; the rung brief asks for complete findings, not finished prose (`climb-batch-workflow.js`, `references/batch.md`); the rules held for the skill writer in `HELD.md`. Cold-read each changed part.

**Stage 6, the revival part,** by Astra's "Consolidation procedure", her admission test and her trap check: the reading contract; a budget of 8K to 12K characters; an outline by the concepts workers use; a temporary disposition table for the 54 old entries; the skill writer writes from the outline, with the merged concepts list as input; a preservation check against the table; a cold read of the whole with the core only; the trap questions from `reviews/fortress-pretraining-quiz.md` and `reviews/skills-distillation-audit.md`, answers updated to the current record; the Fable comparison with the approved version (a go in advance); the mapping in `sources.md`; the core's description and the post-landing instruction updated together. Then one more cold read of the rewritten POSITIONS with the new orientation. Estimate about 4M.

**Stage 7:** a report page for him, and a push notification.

## Rules for the run

- No batch runs. A hold (only he can decide, and it blocks the work) goes to him with a push notification; anything else goes to the review queue.
- Watch the spend with `spend.py`; write each run's estimate and epoch here.
- Machine restarts on 10-22 at 00:03, 04:46 and 07:47 UTC: after one, check the tree, resume what it killed (a Workflow by `resumeFromRunId`; an Agent-tool worker by `SendMessage` if its transcript survives, else relaunch with its leftovers).

## Owed, outside this run

- **Review item 31,** the element rule of `Vector` and `Matrix`: the live point of the struck P-86 (C4's `gather` and the APL port's `ravel` only copy, yet the landed rule makes them ask for times; he rejects "add times"). To probe after this run: whether the team's conditional extension fits `Vector` and `Matrix`, given that a member scoped to a condition is unbuilt (row 773); his question of 10-16 at 12:35 UTC asked exactly this.
- Earlier owed work, waiting: the immutable-arrays probe's recommendation (`perf-probes/immutable-arrays/REPORT.md`); the symbolic-operators probe's five questions (`perf-probes/symbolic-operators-2/REPORT.md`); climb batch 20's review list (queue items 31, 29, 95, 112, 113, 165), then the INDEX ask and the post-mortem redo plan's asks 6, 7, 9, 10; housekeeping: three drafted ledger rows, queue items for PLAN's lists of batches 14 to 17, the gather's commit by named paths, old worktrees each checked before removal; `positions-audit/tools/sort.txt`, an untracked output of a scout, to delete.

## The record, the machine, the pages

- **The model:** Opus 5.5 since his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19. Every writer is Opus, at his word of 05:35 UTC on 10-22.
- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. Commit by named paths only, never `-A`, `.` or `-a`.
- **The machine.** The VM last started at 07:47:33 UTC on 2026-10-22, the disk not rolled back; the next stop by the cap is about 20:47 UTC.
- **Pages:** the audit's page, https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb, version 12 (source `scratchpad/auditpage/`: `build.py`, `full.py`, `pilot.py`, `sfa.md`); the drafts page, https://claude.ai/artifact/XXBj1nCCADReEGXspFG2Tg; the revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, its rewrite owed. Publish a page by its file path or its URL after a compaction.

<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 08:21 UTC on 2026-10-22** (10:21 his time), written before a compaction. Nothing runs: no agent, no Workflow, no check-in. **At his word of 08:19:30 UTC, the session runs autonomously after the compaction** until POSITIONS, FACTS and the `fortress-repo` skill's revival part are consolidated, by the plan below. He will be away for long stretches.

## The boot after this compaction, a one-time exception

A light boot, since the work needs the plan, not the whole record. It reads only, in this order:

1. `get_session` with no session ID: the model, as step 0 of the boot says.
2. The two cores: `.claude/skills/coordinator/SKILL.md` and `.claude/skills/fortress-repo/SKILL.md`. Then the coordinator's `references/delegating.md`, `references/skill-rewrite.md` and `references/record.md`.
3. This boot note, whole, then `explorations/coordinator/HELD.md`, whose 10-21 and 10-22 sections hold his rules for this work.
4. `explorations/reviews/revival-record-synthesis.md`, whole: Astra's review, the standard for every stage below.

Do not read FACTS, POSITIONS, INDEX or PLAN whole; workers read them. Take this section out after the boot.

## His word of 08:19:30 UTC on 10-22, in short

- He listened to the clarity pilot fast: the tone is good, and the growth in size is the price of clarity. He approves the audit and the clarity pass "as a run". **The coordinator's reading:** his yes covers the audit's groups 1 to 7 as the page proposes them, and the clarity pass over every entry; the four entries held for his answers (P-27, P-38, P-43, P-90) stay as they are now.
- **Every open question goes to the review queue**, not to him now: the audit's 16, the pilot's 4, and any the runs raise.
- **"Built" and "Still to build" lines stay in POSITIONS for now.** They may belong in PLAN; moving them is a possible size saving later, if the record grows too large for the coordinator's full boot.
- **The process is encoded,** in the skills and as reusable tooling, so that a consolidation can run again when the record drifts: the audit's mining workflow kept as a tool; the clarity rewrite with its cold reader and checker, one workflow for POSITIONS and FACTS with a brief for each, run in parallel.

## The plan, in order

**Stage 1. Apply the audit to POSITIONS.** Groups 1 to 7: the eight `positions-audit/full/evidence/corrections-cN.apply` files and `handles.apply`, without the four held entries' lines; in P-89 keep the bare "Built."; F-39's pointer change with P-123's removal. Test on a copy of the record with `record.py apply` and `check --base`, then on `main`. Then, with `record.py note`: the history lines of the 25 kept entries (each chunk's "History lines" section), of P-10 and P-88 (his page comments of 23:05 and 23:29 UTC on 10-21), and the corrections of old blocks that name the wrong commit (chunks c2, c3, c4, c6). File in `review-queue.md`: the ten drafted items (`review-queue-items-cN.md`), the changes they propose to existing items, the audit's 16 questions (`scratchpad/auditpage/full.py`, `Q`; P-85's two from `trial/evidence/takeaway-check.md`) and the pilot's 4 (`clarity/evidence/pilot/proposals.md`). One commit for the record, one for the queue.

**Stage 2. The reusable tooling,** written by an Opus worker from the files that ran:
- The mining workflow: `positions-audit/full/evidence/workflow.js`, its briefs and `positions-audit/tools/`, generalized into one home with a README (where it lives is the worker's proposal, under `explorations/coordinator/tools/`).
- The clarity workflow: one script, its kind `positions` or `facts`. Per chunk: for FACTS only, an assessment by Astra's rubric first, and only failing entries go on; then the writer (Opus, its prompt the skill writer's standing brief, `skill-writer-brief.md`, then the kind's task, from `clarity/evidence/briefs/task-pilot.md` and `task-pilot-fix.md`); the cold reader (`coldread.md`: the `fortress-repo` core and area parts, never the revival part); the checker (`check.md`); the writer's fix round; a second cold read. Output per chunk: `proposals.md`, `clean.txt`, `proposals.apply`, the reports, and concepts for `clarity/evidence/concepts.md`. Check the script with `tools/workflow-scenarios.js` before a run. At most two agents run in one Workflow, so run several side by side.

**Stage 3. The POSITIONS clarity run.** Every live entry after stage 1, in chunks of about ten: the eight trial entries and the 63 or so others; the pilot's ten get one fix round for `cold-read-2.md`'s blocked phrases. A change of meaning that the checker finds and no source settles is not applied: that part keeps its wording, and its question goes to the queue. Read each chunk's result, then apply it on `main` with `record.py`, one commit per chunk.

**Stage 4. The FACTS assessment,** by Astra's section "For Claude: assess all FACTS, rewrite only failing entries". First a calibration on a few contrasting entries (she names F-261 and F-262 as focused, F-263 and F-264 as dense, and F-151); read it, then the full run over every entry, side by side with stage 3 when the machine allows. A temporary assessment table, one row per entry, with a disposition: keep, reword, reorganize or investigate. Only failing entries are rewritten. An "investigate" entry keeps its text and goes to a list for the narrow question. Apply per chunk, as in stage 3.

**Stage 5. The skill text,** through the skill writer (`skill-writer.sh`, Opus), after stages 3 and 4, so that it encodes what worked:
- `coordinator/references/record.md`: an entry reads on its own; a pointer that stays carries a few words on what it holds; no handle of a past conversation; Astra's FACTS rubric and dispositions; the record pass owns the final wording; how to run the mining and the clarity workflows.
- `coordinator/references/skill-rewrite.md` and the writer's standing brief: Astra's post-landing rule ("A small change to the existing process"), in place of "each change, with its contradiction and its reason"; the growth loophole closed; her two cold-read questions in `skill-cold-read-brief.md`.
- The rung brief: complete findings, not finished prose (`climb-batch-workflow.js`, and `references/batch.md` if it says otherwise).
- The rules held for the skill writer in `HELD.md`'s 10-21 and 10-22 sections.
Cold-read each changed part, as `skill-rewrite.md` says.

**Stage 6. The revival part's consolidation,** by Astra's "Consolidation procedure", her admission test ("Recovered admission rule") and her trap check ("A small test to preserve through consolidation"): the reading contract; a budget of 8K to 12K characters; an outline by the concepts workers use; a temporary disposition table for the 54 old entries; the skill writer writes from the outline, with `clarity/evidence/concepts.md` as input; a preservation check against the table; a cold read of the whole with the core only; the trap questions from `reviews/fortress-pretraining-quiz.md` and `reviews/skills-distillation-audit.md`, answers updated to the current record; the Fable comparison with the approved version (a go in advance, `delegating.md`); the mapping in `sources.md`; the core's description and the post-landing instruction updated together. Then one more cold read of the rewritten POSITIONS, now with the new orientation, to confirm that no entry still needs it or repeats it.

**Stage 7. Report to him:** a page with what changed in each record and skill, the counts, the questions filed, the cost; a push notification.

## Rules for the run

- **Check-ins** with `send_later`, 45 minutes apart, while any run is in flight; at each, resume a killed run (`resumeFromRunId`, the same script and args), commit and push by named paths, reply "." alone.
- **Estimates of tokens written,** to be refined at each stage: stage 3 about 7M; stage 4 about 10M; stages 2, 5 and 6 about 5M together. Watch with `spend.py`; write each run's estimate and epoch here.
- **No batch runs.** A hold (something only he can decide, that blocks the work) goes to him with a push notification; anything else goes to the review queue.
- Machine restarts: three on 10-22 (00:03, 04:46, 07:47 UTC). After one, check the tree and resume what it killed.

## Owed, outside this run

- **Review item 31,** the element rule of `Vector` and `Matrix`: the live point of the struck P-86 (C4's `gather` and the APL port's `ravel` only copy, yet the landed rule makes them ask for times; he rejects "add times"). To probe after this run: whether the team's conditional extension fits `Vector` and `Matrix`, given that a member scoped to a condition is unbuilt (row 773); his question of 10-16 at 12:35 UTC asked exactly this.
- Earlier owed work, waiting: the immutable-arrays probe's recommendation (`perf-probes/immutable-arrays/REPORT.md`); the symbolic-operators probe's five questions (`perf-probes/symbolic-operators-2/REPORT.md`); climb batch 20's review list (queue items 31, 29, 95, 112, 113, 165), then the INDEX ask and the post-mortem redo plan's asks 6, 7, 9, 10; housekeeping: three drafted ledger rows, queue items for PLAN's lists of batches 14 to 17, the gather's commit by named paths, old worktrees each checked before removal; `positions-audit/tools/sort.txt`, an untracked output of a scout, to delete.

## The record, the machine, the pages

- **The model:** Opus 5.5 since his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19. Every writer is Opus, at his word of 05:35 UTC on 10-22.
- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. Commit by named paths only, never `-A`, `.` or `-a`.
- **The machine.** The VM last started at 07:47:33 UTC on 2026-10-22, the disk not rolled back; the next stop by the cap is about 20:47 UTC.
- **Pages:** the audit's page, https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb, version 12 (source `scratchpad/auditpage/`: `build.py`, `full.py`, `pilot.py`, `sfa.md`); the drafts page, https://claude.ai/artifact/XXBj1nCCADReEGXspFG2Tg; the revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, its rewrite owed. Publish a page by its file path or its URL after a compaction.

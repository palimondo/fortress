<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 14:07 UTC on 2026-10-20** (16:07 his time), after the drafts file was pushed.

## The model, first

- The coordinating session runs on Opus 5.5, by his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19; `get_session` showed Opus in both fields at the boot of about 13:58 UTC on 2026-10-20. Check it at every boot with `get_session` (no session ID): `session_context.model` and `external_metadata.last_served_model`.
- From 20:09:30 UTC on 2026-10-16 to then it ran on Haiku 5.5, unseen; the post-mortem is `explorations/coordinator/postmortem-2026-10-19-haiku/`. The model check, `.claude/hooks/model-check.sh`, alarms after a turn on neither Opus nor Fable.

## Running

- **Review item 1 (queue item 31, the bound of `Vector` and `Matrix`): the three drafts and the P-86 scout, word for word with their briefs, are pushed** (`bf8525294`, `explorations/reviews/item31-drafts.md`); its link sent to him at about 14:08 UTC, nothing else (his rule of about 13:20 UTC: no drafts in chat). Waiting for him to read it. The blind Opus kept an ask with options 1, 2a and 2b (default 1, as landed); the not-blind Opus and Fable found nothing left to decide (default: close the item, correct the record). The scout: P-86 is the coordinator's summary of Astra's review (`fbc4c4954`), not his words; its premise false since rung F (`d846e3644`, 2026-09-27); re-created as a standing entry at `bc8902f47` (2026-09-30) with no reason recorded; no answer of his on the bound before today. **Owed on his answer:** P-86's words through `record.py`, and the stale "pending" at `review-queue.md:269-273`, `PLAN.md:164`, P-55, F-151 and `reviews/open-asks-2026-10-16.md:177`; row 729's question (L.worker.1, `PLAN.md:413`) into the queue. Then queue item 29.
- **The symbolic-operators probe** (Opus, `a7cc12f31bb9c0cb6`, brief `scratchpad/haiku-window/brief-symops-probe.md`), P-155's first step; it commits `perf-probes/symbolic-operators-2/`. Its design questions go to him before their rungs. It may still use the base build `/home/user/fortress-base20`; remove that once it returns.
- **The immutable-arrays probe returned** (`af8fed8acdb5f3b00`); the harness refused its report file, so the coordinator committed its returned text word for word with its two patches (`40565a35e`, `perf-probes/immutable-arrays/`). In short: an immutable array is a write-once array for sharing between parallel tasks, and it carries every varargs parameter; microGPT uses one only through `flat`'s varargs; ranks 2 and 3 were never declared by the team; uncommented, walk refuses every program at load; a shadow of both ranks with `freeze` (+337 lines) runs, with the distance unchanged at 5. **Owed:** bring him the result with a recommendation, after review item 1 (it answers his question of about 12:50 UTC); its two drafted ledger rows (a second `init` replaces an immutable element under walk; the distance stage counts a component stopped in name binding as error-free) through `ledger.py`; its question 4 (the stage's blind spot) is a tools change of the coordinator's.
- No check-in is armed. No batch runs.

## What comes next, in order

- His rule for the review list, of about 12:40 UTC: batch 20's items now, one a message; the rest decided after them. Of the seven, 43 is settled by P-79; the six go in the order queue items 31 (review item 1, above), 29, 95, 112, 113, 165.
- Then the INDEX ask (recommend reading INDEX's last 60 lines at boot, and an `index:` search before each brief and each ask; the evidence is `process-engineering/index-use-archaeology.md`), then asks 6, 7 (item 188, against his option 3 of P-151), 9 and 10 of the post-mortem's redo plan; ask 8 waits for row 773's batch.
- Then climb batch 21 (PLAN phase 3, item 19, on the standing go), whose candidates wait on probes first.

## Owed, nothing waiting on it

- Climb batch 20's landing left: queue items for the 58 entries of PLAN's lists of climb batches 14 to 17, which have none, by a worker of their own; the gather's commit by named paths in the batch script (review finding 14); a probe of which team demos run (P-79).
- The post-mortem's redo plan (`fable-judgement.md`, section D) left: the revival page's parts 5 and 6 through batch 18 by an Opus writer, published by URL, with `process-engineering/revival-story.md` to match; the reorientation from the digest; row 584's note; the old section numbers cited in `CLIMB-BATCH-17.md`, `rung-walk-method-sargs/REPORT.md` and `SKEPTIC.md`, and `lists17.py`; flag 12 of the `fortress-repo` cold read for the skill writer.
- `tools/test_ledger.py`, 10 of 13 tests failing at HEAD's own code; four history notes that name `cloud-container`'s old headings.
- Old worktrees: `/home/user/fortress-gather20` (batch 20's gather scratch, 33 changed files, detached), and the probes `fortress-probe-distribute`, `-opsort`, `-p152`, `-power`, `-row766`, `-strings`, `-symops`, `-symops-b`, `-where`, whose shadows are patch files on `main` (`62bf23368`); check each before removal.
- Unanswered by him: the backlog page's items 43, 1, 30 with 33, 14, 17; the measures judgement's next steps; the library-extension bullet; the name for the coordinator-only files (HELD). Sukyoung Ryu's answer to his reply of about 01:30 UTC on 2026-10-13 is awaited.

## The record, the machine, the pages

- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. Commit by named paths only (`git add -- <new paths>`, then `git commit -- <paths>`), never `-A`, `.` or `-a`; while a batch runs, edit nothing tracked in the main tree.
- **The git-check hook** is off by `.claude/hooks/git-check-off.sh`, run at every SessionStart and Stop.
- **The machine.** The VM last started at 11:51:52 UTC on 2026-10-20 (`uptime -s`); the next stop by the cap is about 00:51 UTC on 2026-10-21. 4.0 GB free at 14:04 UTC, after removing the worktrees of batch 20's rungs, the array-sites probe and the immutable-arrays probe (all clean and pushed). Page watches lapse at a restart; none is confirmed since.
- **The revival page,** https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, is version 22, made on Haiku; its rewrite is owed (above). Its source is `scratchpad/revival-page/page.html`.

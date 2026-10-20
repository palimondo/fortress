<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 00:15 UTC on 2026-10-20** (02:15 his time), rewritten whole when batch 19's record went to its Fable review.

## The model, first

- The coordinating session runs on Opus 5.5, by his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19; `get_session` showed Opus at the boot of 00:06 UTC on 2026-10-20. Check it at every boot with `get_session` (no session ID): `session_context.model` and `external_metadata.last_served_model`.
- From 20:09:30 UTC on 2026-10-16 to then it ran on Haiku 5.5, unseen: his iOS client sent `/model claude-haiku-5-5` with his message, and he says he never chose it. The post-mortem is `explorations/coordinator/postmortem-2026-10-19-haiku/` (README, `timeline.txt`, `show.py`, the three Opus reviews, `fable-judgement.md`).
- The model check, `.claude/hooks/model-check.sh`, a Stop hook: a turn on neither Opus nor Fable gets an alarm that must lead the reply, go out as a push notification, and stop all other work. Each run writes `~/.claude/model-check.last`.

## Running

- **The Fable judgement on item 58 is done** (agent `a58bce2ff86787405`, 0.25M; `c302e4613`): `explorations/reviews/integer-power-fable-judgement.md`. No combination rebuilds the tower's power whole: an unsigned exponent and a float or rational base already split; a signed computed exponent splits only as R; a numeral's sign never reaches its type. Its default is E, PLAN item 58's. Ask 2 in its new form put to him at 00:19 UTC on 2026-10-20; waiting on his answer. Its section 9 hands two facts to FACTS (`unsigned` reinterprets bits under walk; a numeral's sign does not reach its type), owed with the record pass.
- **The Fable review of batch 19's record,** on the standing go (Fable, agent `a539742efa78d3d84`, since 00:14 UTC, brief `scratchpad/haiku-window/brief-review19.md`): checks `CLIMB-BATCH-19.md` and `compile-ladder/plan-19/manifest/` against their sources, judges the 16 forks' marking, fixes in place, writes `explorations/coordinator/climb-batch-19-review.md`, commits and pushes. About 0.5M Fable. When it ends: if it raises a consequential question, put it to him before the launch; otherwise splice the manifest (`gen19.py`), build the base build `/home/user/fortress-base19` at the commit after the splice, check the briefings there (the record's section 5), and launch.

## Batch 19

- **The planner is done** (Opus, agent `aed893aa77edc1128`, `8cfe2638d`): `explorations/coordinator/CLIMB-BATCH-19.md`, two rungs, P (P-152 on both paths, rows 740 and 741, from the probe's two patches) and S (the three `String` sites with row 743, F-246); the distance 34 to 31 and the count 30 to 28 expected, neither declared; 16 forks, none marked consequential; `tint` left on the review list (PLAN item 17); row 697 out by the planner's probe; about 3.2M (2.9M to 3.9M) and 3 hours. Its finding with no row is filed as row 785 (`52f8bdffb`).
- It holds out row 774, row 773 with judge-review.1, items 38 and 59, the array sites and item 58's sites, each waiting on an open ask.
- It runs on the standing go for phase 3 (`batch.md`, "The go"), told to him at 22:22 UTC on 2026-10-19 as a notice he can withdraw.

## The redo plan of the post-mortem (`fable-judgement.md`, section D)

- Done: the record fixes, D.1 and D.2 item 3 (`ba93d28ec` to `ada547c0b`); batch 18's post-batch review (`reviews/batch-18-review.md`); the digest of where the project stands (`reviews/digest-2026-10-19.md`); the cost tally (`process-engineering/batch-costs-14-18.md`); row 774 held out of batch 19 in PLAN item 17 (`33b88c48d`); batch 18's landing steps (the review, the writer's pass, both cold reads and the writer's fixes of all 67 flags, `b15c88694`, `475be9b38`); the probe shadows as patch files (`62bf23368`) and the worktrees of batches 17 and 18 removed; the P-152 probe (`55bbb48ef`, `perf-probes/existential-reduction/`); row 716's sentences confirmed true by walk runs.
- The asks, one a message, in D.3's order, each with its default: 1 done (his answer of 22:37 UTC); 2 item 58, put at 23:32 UTC, answered at 23:55 UTC (none of the options fits; a combination may be needed; he wants Fable on it), now with the Fable judgement above; 3 the distance's array sites against P-85 (the digest finds only 17 of the 21 counted apart in the gate's classes, which bears on ask 3's default); 4 rung X's question 2 with item 43; 5 item 38 with item 59's defaults; 6 `SKILL.md:101-102`; 7 P-151's `AnyList` (review-queue item 188); 8 judge-review.1 (review-queue item 177; P-151's "its default taken: with the members" names a default he never gave, fixed with his answer); 9 per-batch landing pages, the tally in hand; 10 a push notification names its batch. His yes to both rules came at 23:32 UTC; they are in `coordinator`'s `SKILL.md` (`b15c88694`).
- Owed by the coordinator: the revival page's parts 5 and 6 through batch 18 by an Opus writer, published by URL, and `process-engineering/revival-story.md` committed to match (D.2 item 7); the reorientation from the digest (D.2 item 10); row 584's note, which `ledger.py` cannot rewrite; the old section numbers of `walk-generic-static/REPORT.md` cited in `CLIMB-BATCH-17.md`, `rung-walk-method-sargs/REPORT.md` and `SKEPTIC.md`, and `lists17.py`.
- Owed to the skill writer's next task: `coordinator`'s `sources.md` still calls the two rules settled by the coordinator, not by his yes of 23:32 UTC; the held rule of 00:04 UTC on cleaning his quoted words (HELD); flag 12 of the `fortress-repo` cold read, not fully settled.
- The P-152 probe's base build `/home/user/fortress-base-p152` is at `ba93d28ec`, not batch 19's base; remove it once batch 19's base build stands.

## The record, the machine, the pages

- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. Six exact allow rules for them (with and without `-q`) are in `.claude/settings.json`'s `permissions.allow`, approved by him in manual mode on 2026-10-19.
- **The git-check hook** is off by `.claude/hooks/git-check-off.sh`, run at every SessionStart and Stop; the launcher's script is kept as `~/.claude/stop-hook-git-check.sh.orig`.
- **The machine.** The VM restarted at 21:04:18 UTC on 2026-10-19 (`uptime -s`); the next stop by the cap is about 10:04 UTC on 2026-10-20. 4.6 GB free at 00:07 UTC. No check-ins are armed. Page watches lapse at a restart; none is confirmed since.
- **His usage at about 00:10 UTC** (his paste): the session limit 24 % used, resetting about 02:10 UTC; the week 37 % for all models and 7 % for Fable, resetting Friday 11:59.
- **The revival page,** https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, is version 22, made on Haiku; part 3 of the post-mortem (entry 15) lists its faults, and its rewrite is owed (above). Its glossary thread (`6e6b8b1c`) waits for his own words for "curator". Its source is `scratchpad/revival-page/page.html`.

## Standing items, nothing waiting on them

- Owed: `tools/test_ledger.py`, 10 of 13 tests failing at HEAD's own code (stale expectations); four history notes that name `cloud-container`'s old headings.
- Unanswered: the coordinator's proposal of 06:20 UTC on 2026-10-16, to read INDEX.md's last 60 lines at boot and search the rest instead of reading it whole (about 76K tokens); told him at about 00:10 UTC on 2026-10-20 that it comes as an ask after the queued ones. The backlog page's items 43, 1, 30 with 33, 14, 17; the measures judgement's next steps; the library-extension bullet; the name for the coordinator-only files (HELD). Sukyoung Ryu's answer to his reply of about 01:30 UTC on 2026-10-13 is awaited.

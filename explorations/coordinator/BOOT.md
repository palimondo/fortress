<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 22:53 UTC on 2026-10-19** (00:53 his time), rewritten whole after the review of the Haiku window.

## The model, first

- The coordinating session runs on Opus 5.5, by his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19. Check it at every boot with `get_session` (no session ID): `session_context.model` and `external_metadata.last_served_model`.
- From 20:09:30 UTC on 2026-10-16 to then it ran on Haiku 5.5, unseen: his iOS client sent `/model claude-haiku-5-5` with his message, and he says he never chose it. The post-mortem is `explorations/coordinator/postmortem-2026-10-19-haiku/` (README, `timeline.txt`, `show.py`, the three Opus reviews, `fable-judgement.md`).
- The model check, `.claude/hooks/model-check.sh`, a Stop hook: a turn on neither Opus nor Fable gets an alarm that must lead the reply, go out as a push notification, and stop all other work. Each run writes `~/.claude/model-check.last`.

## Running

- **The P-152 probe** (Opus, agent `a7bc15c38fddac2ba`, brief `scratchpad/haiku-window/brief-p152.md`, since 22:20 UTC): exclusion read over the whole parameter type on both paths, rows 740 and 741 its tests. It works in `/home/user/fortress-probe-p152` on `wip/probe-p152` and pushes that branch. Estimate about 1.5M. When it ends: bring `explorations/perf-probes/existential-reduction/REPORT.md` and its patches to `main` with an INDEX line, and file its questions by the three principles.
- **The skill writer** on `tmp/skill-writer/task-18.md` (headless, Opus, started 22:52 UTC by `skill-writer.sh new`, shell `blo1wx6ta`, log `tmp/skill-writer/task-18.log`): batch 18's revival changes; the false sentences of batches 17 and 18 (`reviews/batch-18-review.md`, section 6); the model check as the boot's step 0 and the git-check switch in `coordinator` and `cloud-container`; his rule of 19:57 UTC on 2026-10-16 and "a held line is never his yes". It commits on `main` and pushes nothing. When it ends: push by the three pushes, then cold reads (`skill-cold-read-brief.md`) of its parts and of `0707ac9ac`'s, with row 716's one walk run (Fable D.2 item 1), and the flags back to a resumed writer.
- **The item 58 ask rewritten** (Opus, `ab2a309fb3be6eb3c`, `brief-item58.md`): the review `explorations/reviews/integer-power-negative-exponent.md`, uncommitted, and the ask as its final text. When it ends: check it against the record, commit the review, and put the ask to him as ask 2.

## The redo plan of the post-mortem (`fable-judgement.md`, section D)

- Done: the record fixes, D.1 and D.2 item 3 (`ba93d28ec` to `ada547c0b`); batch 18's post-batch review (`reviews/batch-18-review.md`); the digest of where the project stands (`reviews/digest-2026-10-19.md`); the cost tally (`process-engineering/batch-costs-14-18.md`); row 774 held out of batch 19 in PLAN item 17 (`33b88c48d`).
- The asks, one a message, in D.3's order, each with its default: 1 done (the digest and the tally relaunched, his answer of 22:37 UTC); 2 item 58, after its rewrite; 3 the distance's array sites against P-85 (the digest finds only 17 of the 21 counted apart in the gate's classes, which bears on ask 3's default); 4 rung X's question 2 with item 43; 5 item 38 with item 59's defaults; 6 `SKILL.md:101-102`; 7 P-151's `AnyList` (review-queue item 188); 8 judge-review.1 (review-queue item 177; P-151's "its default taken: with the members" names a default he never gave, fixed with his answer); 9 per-batch landing pages, the tally in hand; 10 a push notification names its batch.
- Owed by the coordinator: the probe shadows as patch files in their probe folders and the six `wip/probe-*` branches pushed (D.2 item 5), then the worktrees `/home/user/fortress-probe-*` and `/home/user/fortress-base17`, `-base18`, `-gather17`, `-gather18` removed; the revival page's parts 5 and 6 through batch 18 by an Opus writer, published by URL, and `process-engineering/revival-story.md` committed to match (D.2 item 7); the reorientation from the digest (D.2 item 10); row 584's note, which `ledger.py` cannot rewrite; the old section numbers of `walk-generic-static/REPORT.md` cited in `CLIMB-BATCH-17.md`, `rung-walk-method-sargs/REPORT.md` and `SKEPTIC.md`, and `lists17.py`.
- **Batch 19** runs on the standing go for phase 3 (`batch.md`, "The go"), told to him at 22:22 UTC as a notice he can withdraw, once D.2 item 1 (the writer and the cold reads) and item 3 are done, its record is drafted by PLAN item 17's method and Fable has reviewed it. Row 774 stays out of it until he answers ask 4.

## The record, the machine, the pages

- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. The auto-mode check refused the pushes once (22:08 UTC, "Modify Shared Resources") and passed them after his manual approval; the lasting fix, six exact allow rules for the three pushes in `.claude/settings.json`'s `permissions.allow`, was refused to the coordinator as self-modification and waits for his manual approval.
- **The git-check hook** is off by `.claude/hooks/git-check-off.sh`, run at every SessionStart and Stop (his word, approved in manual mode at 22:19 UTC); the launcher's script is kept as `~/.claude/stop-hook-git-check.sh.orig`.
- **The machine.** The VM restarted at 21:04:18 UTC on 2026-10-19 (`uptime -s`); the next stop by the cap is about 10:04 UTC on 2026-10-20. No check-ins are armed. Page watches lapse at a restart; none is confirmed since.
- **The revival page,** https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, is version 22, made on Haiku; part 3 of the post-mortem (entry 15) lists its faults, and its rewrite is owed (above). Its glossary thread (`6e6b8b1c`) waits for his own words for "curator". Its source is `scratchpad/revival-page/page.html`.

## Standing items, nothing waiting on them

- Owed: `tools/test_ledger.py`, 10 of 13 tests failing at HEAD's own code (stale expectations); four history notes that name `cloud-container`'s old headings.
- Unanswered: the coordinator's proposal of 06:20 UTC on 2026-10-16, to read INDEX.md's last 60 lines at boot and search the rest instead of reading it whole (about 76K tokens). The backlog page's items 43, 1, 30 with 33, 14, 17; the measures judgement's next steps; the library-extension bullet; the name for the coordinator-only files (HELD). Sukyoung Ryu's answer to his reply of about 01:30 UTC on 2026-10-13 is awaited.

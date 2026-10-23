<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 10:52 UTC on 2026-10-23** (12:52 his time). The weekly reset has passed. The compaction of about 10:00 was followed by a full boot. Batch 21's preparation started at 10:08 UTC.

## Running

- **Batch 21's planner**, an Opus Agent-tool worker launched at about 10:08 UTC: drafts `explorations/coordinator/CLIMB-BATCH-21.md` and `explorations/compile-ladder/plan-21/manifest/`, from the five probes (symbolic operators, export check, walk's conditional extension, team demos, rows 793 and 794), commits and pushes them itself. Estimate 2M to 3M written, a guess. Its brief is its launch prompt.
- **The type-decisions review's Fable judgement**, a Fable Agent-tool worker launched at about 10:50 UTC (a go in advance, his word at 08:19 UTC), reading only: writes `explorations/reviews/type-decisions-review/judgement.md`, does not commit. Estimate 0.5M to 1M, a guess. Its evidence map landed at `105b4a46b` (0.70M; six lines that read batch 21's type items as held corrected by the coordinator).
- **Batch 21's base build**, `/home/user/fortress-base21` at `aa5ff2423`, built by the coordinator in the background (log `<scratchpad>/batch21/base-build.log`, done at `EXIT=0`). The planner seeds its probe worktrees from it. At the launch it serves as `args.baseBuild` if the base differs from it only in record files; otherwise build again at the base.

**Check-ins:** "Batch 21 prep check-in 1" at 10:55 UTC and "Batch 21 prep check-in 2" at 11:40 UTC, after the process stop expected about 11:37 UTC. A stop kills both workers; resume each with `SendMessage` from its transcript. The batch's own check-in file, at its launch: `<scratchpad>/batch21/checkins.txt`.

## The go

Batch 21 has his go to launch once its record is written and reviewed by Fable (his word at 10:05 UTC on 10-23). A question that the record raises as consequential still goes to him first, one per message.

## Waiting on him

- Who decides changes to the coordinator skill (the 10-19 post-mortem's ask). Until he answers, no edit of the coordinator skill without his yes on its wording: my word to him at about 00:30 UTC on 10-23.
- Not critical, for the planner and the review queue: the export probe's two questions, `RR64`'s rounding return types and whether `Condition` or `Maybe` extends `ZeroIndexed`.

## Next

- **When the planner ends:** read its report and the record's diff; launch the Fable review of the record in place (a go in advance). Then the coordinator's steps of the manual's "Before the launch" (the base build, a trial seed, the generator's checks, the splice and its commit, the disk, the check-ins), and the launch on his go.
- **When the Fable judgement ends:** read it whole, commit it with an INDEX line, then its write-up for him by an Opus writer, as a page. If it finds that one of batch 21's three type items (P-156, P-157, row 774) should change, bring that to him before the launch. Batch 21 is not held for it otherwise, at his word: the type items are reversible.
- **The ledger repair**, about 180 open rows (`ledger-health-2026-10-22/REPORT.md`), if budget allows; the 40 refused notes first.
- **PLAN's consolidation**, a later cleanup over the weekend beside the climb batches (PLAN, "Work that can start now", item 1).

## Owed, small

- The ledger clarity run's queue items (`ledger-health-2026-10-22/evidence/clarity/l1` to `l5`, `queue.md`), not filed yet; among them the questions on rows 219 and 555.
- One `record.py note --correcting` call for the 11 history blocks that name the wrong commit: P-10, P-67, P-68, P-84, P-88, P-95 to P-98, P-103, P-124, P-125.
- P-91's FACTS pointer from F-123; `oracle-headers.md:47` still names the port.
- Review item 31's probe: whether the team's conditional extension fits `Vector` and `Matrix`, given row 773; he rejects "add times".
- Earlier owed work, waiting: the immutable-arrays probe's recommendation (`perf-probes/immutable-arrays/REPORT.md`, offered to the planner); climb batch 20's review list (queue items 31, 29, 95, 112, 113, 165), then the INDEX ask (INDEX's boot read is 89K; reading its last 60 lines and searching the rest would save about 80K a boot) and the 10-19 post-mortem redo plan's asks 6, 7, 9 and 10; three drafted ledger rows; queue items for PLAN's lists of batches 14 to 17; the gather's commit by named paths; the revival page's rewrite.
- Untracked scratch to delete: the `writer-*.done` markers, the ledger health check's `.tsv` files, `positions-audit/tools/sort.txt`, `tmp/export-rows/` once its tests are written.

## The record, the machine, the pages

- **The model:** Opus 5.5 since his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19. Every writer is Opus, at his word of 05:35 UTC on 10-22.
- **The boot:** the full boot is the default; a light boot only at his word. The compaction hook checks the model with `tools/model-now.sh`, then loads `fortress-repo` and the coordinator skill with the Skill tool.
- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. Commit by named paths only, never `-A`, `.` or `-a`.
- **The week:** reset at 10:00 UTC on 10-23; 0% used by his client then.
- **The machine:** the VM last started at 22:37:03 UTC on 2026-10-22; the next stop by the cap is about 11:37 UTC on 10-23.
- **Pages:** the post-mortem report, https://claude.ai/artifact/F3Gz2ynXQSKEjKXqhNT5is, version 3 (source `scratchpad/pmreport/build.py`, from `REPORT.md`); the audit page, https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb, version 15, for his later review of items 268 to 276 (source `scratchpad/auditpage/`); the drafts page, https://claude.ai/artifact/XXBj1nCCADReEGXspFG2Tg; the revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, its rewrite owed. After a compaction, publish a page by its URL.

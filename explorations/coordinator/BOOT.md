<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 23:35 UTC on 2026-10-22** (01:35 his time). One check-in is armed: "Batch 21 preparation start" at 10:05 UTC on 10-23, after the weekly reset. The post-mortem and record consolidation of 10-20 to 22 are done. Its report landed at `226e3dd97` (`postmortem-2026-10-20-record/REPORT.md`, by the Opus writer from `MAP.md`). It is published as the page https://claude.ai/artifact/F3Gz2ynXQSKEjKXqhNT5is, and the push notification is sent. The batch hold lifts with it, at his word of 22:43. **Running:** at his word of 23:31, the report rewritten in a neutral register for researchers who train later models, not addressed to him: an Opus writer (Agent tool, launched 23:34, spend epoch 1792711998, estimate about 0.3M), brief `postmortem-2026-10-20-record/briefs/writer-2.md`, output `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/REPORT-v2.md` (test -f it). **Then:** read it whole, replace `REPORT.md` with it, commit, republish the page from `scratchpad/pmreport/index.html` (its standfirst made neutral too), so the URL stays. Then move `MAP.md` and `briefs/` into the post-mortem's `evidence/` by `git mv`, as the rule of `record.md` says (`c24fcf50a`), drop their INDEX lines, and fix their citations (`REPORT.md`, the page's link to `MAP.md`).

## Next

- **Climb batch 21's preparation, on defaults** (PLAN, phase 3, item 19), at his word of 22:43: put only critical decisions to him; the launch needs his go. Its probes and planner start after the weekly reset at 10:00 UTC on 10-23 (12:00 his time). The four candidates that wait on his answers do not block it: the symbolic-operators probe's five questions (`perf-probes/symbolic-operators-2/REPORT.md`), row 774's question, review item 177 (row 773) and item 9 (`tint`). The preparation builds from the candidates that need none.
- **The ledger repair**, about 180 open rows (`ledger-health-2026-10-22/REPORT.md`), last, after the reset, if budget allows; the 40 refused notes first.
- **PLAN's consolidation**, a later cleanup over the weekend beside the climb batches (PLAN, "Work that can start now", item 1).

## Owed, small

- The ledger clarity run's queue items (`ledger-health-2026-10-22/evidence/clarity/l1` to `l5`, `queue.md`), not filed yet; among them the questions on rows 219 and 555.
- One `record.py note --correcting` call for the 11 history blocks that name the wrong commit: P-10, P-67, P-68, P-84, P-88, P-95 to P-98, P-103, P-124, P-125.
- P-91's FACTS pointer from F-123; `oracle-headers.md:47` still names the port.
- Review item 31's probe: whether the team's conditional extension fits `Vector` and `Matrix`, given row 773 (a member scoped to its condition is unbuilt); he rejects "add times".
- Earlier owed work, waiting: the immutable-arrays probe's recommendation (`perf-probes/immutable-arrays/REPORT.md`); climb batch 20's review list (queue items 31, 29, 95, 112, 113, 165), then the INDEX ask and the 10-19 post-mortem redo plan's asks 6, 7, 9 and 10; three drafted ledger rows; queue items for PLAN's lists of batches 14 to 17; the gather's commit by named paths; old worktrees, each checked before removal; the revival page's rewrite.
- Untracked scratch to delete: the `writer-*.done` markers, the ledger health check's `.tsv` files, `positions-audit/tools/sort.txt`.

## The record, the machine, the pages

- **The model:** Opus 5.5 since his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19; checked at this boot. Every writer is Opus, at his word of 05:35 UTC on 10-22.
- **The boot:** the full boot is the default; a light boot only at his word (the coordinator skill, "The boot"). The compaction hook loads `fortress-repo`, then the coordinator skill, with the Skill tool.
- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. Commit by named paths only, never `-A`, `.` or `-a`.
- **The week:** about 5M left until the reset at 10:00 UTC on 10-23, an estimate (95% used at 16:35 UTC by his client).
- **The machine:** the VM last started at 22:37:03 UTC on 2026-10-22; the next stop by the cap is about 11:37 UTC on 10-23.
- **Pages:** the post-mortem report, https://claude.ai/artifact/F3Gz2ynXQSKEjKXqhNT5is (source `scratchpad/pmreport/build.py`, from `REPORT.md`); the audit page, https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb, version 15, for his later review of items 268 to 276 (source `scratchpad/auditpage/`: `build.py` with `followup.py`, `final.py`, `full.py`, `pilot.py`); the drafts page, https://claude.ai/artifact/XXBj1nCCADReEGXspFG2Tg; the revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, its rewrite owed. After a compaction, publish a page by its URL.

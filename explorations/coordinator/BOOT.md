<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 13:30 UTC on 2026-10-23** (15:30 his time), written just before the launch of climb batch 21's first run. The weekly reset passed at 10:00 UTC; the compaction of about 10:00 was followed by a full boot.

## Running

- **Climb batch 21, run 1**: the batch workflow (`explorations/coordinator/climb-batch-workflow.js`, its manifest spliced for run 1 in the commit that carries this note), rungs S (the symbolic operators' library fixes), B (the `Index` bound with the tuple rule), X (the self type and the bounds in the overloading check's exclusion test, in rung V's place) and N (array slices based above zero, a list's `=` through `Equality`). Record `explorations/coordinator/CLIMB-BATCH-21.md`; its Fable review `climb-batch-21-review.md`. Estimate about 4.5M written (4.1M to 5.4M), about 4 hours. Base build `/home/user/fortress-base21` at `aa5ff2423` (the code is the base's).
- **The run's ID, its launch arguments and the check-ins' IDs** are in `<scratchpad>/batch21/checkins.txt` and `<scratchpad>/batch21/launch-args.json` (`<scratchpad>` is `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad`). At a boot, read the record's sections for the curator, the run's journal and its agents' transcript times (the coordinator skill's `references/batch.md`, "While it runs"). Say nothing about the batch before that.
- **While it runs:** edit no tracked file in the main tree, this note included, and push nothing to `main`. At a check-in, check the run, resume it if it stopped (`resumeFromRunId`, the arguments byte for byte), and reply "." alone.

## The go

His go of 10:05 UTC on 10-23 ("The launch of batch has a go when the plan is written and reviewed by Fable"), and "Go" at 13:03 after his three answers. Run 2 (climb batch 21b: C, E, D) runs on the standing go of phase 3 once run 1 has landed and its routing is done, if its record raises no consequential question.

## Waiting on him

- Nothing for batch 21. His three answers are in POSITIONS: P-156 (`atMost` kept under `where { I extends Index }`, 12:36 UTC; `Index` beside `Any` and `Object`, 12:46, taking the default: "I have no way how to compare the options") and P-157 (vectors stay additive groups, the checker's exclusion test fixed instead, reversing this morning's answer, 13:03: "That was my original stance").
- Who decides changes to the coordinator skill (the 10-19 post-mortem's ask). Until he answers, no edit of the coordinator skill without his yes on its wording: my word to him at about 00:30 UTC on 10-23.
- Not critical, on the review list: the export probe's two questions, `RR64`'s rounding return types and whether `Condition` or `Maybe` extends `ZeroIndexed` (the record takes no default; their differences stay in the export error).

## Next

- **When run 1 lands:** the landing of `references/batch.md` (sweep the tasks, the FACTS fold, the orientation update, one line per decision, the Opus post-batch review, the routing into PLAN), PLAN's line 13 and item 19 updated for batch 21.
- **Between the runs:** the full-check stage once on run 1's landed tree, 5 expected (the planner measured X's sites apart from S's and B's); the count stage's blind spot, the coordinator's tool fix, as `c21177829` did for the distance stage; run 2's sections re-read against run 1's landed tree; a base build at run 2's base, `/home/user/fortress-base21b`.
- **The type-decisions judgement's write-up for him**, by an Opus writer as a page, with probe A1's result and his three answers.
- **The judgement's other items, for him one per message, after batch 21's landing:** P-75 withdrawn (it contradicts P-74, row 575); P-154's reason corrected (the reconciliation of the team's `LexicographicOrder` body with its `List`); the team's `AnyIntegral comprises Integral[\I\] where [\I\]` probed to close row 487; row 701 a prerequisite of the switch-over (a PLAN line); P-156's "Why" read as the judgement reads it (the bound the team's wish, the tuple rule the revival's departure, which rung B's Appendix I entry already says).
- **The ledger repair**, about 180 open rows (`ledger-health-2026-10-22/REPORT.md`), if budget allows; the 40 refused notes first.
- **PLAN's consolidation**, a later cleanup over the weekend beside the climb batches (PLAN, "Work that can start now", item 1).

## Owed, small

- The ledger clarity run's queue items (`ledger-health-2026-10-22/evidence/clarity/l1` to `l5`, `queue.md`), not filed yet; among them the questions on rows 219 and 555.
- One `record.py note --correcting` call for the 11 history blocks that name the wrong commit: P-10, P-67, P-68, P-84, P-88, P-95 to P-98, P-103, P-124, P-125.
- P-91's FACTS pointer from F-123; `oracle-headers.md:47` still names the port.
- Review item 31's probe: whether the team's conditional extension fits `Vector` and `Matrix`, given row 773; he rejects "add times".
- Earlier owed work, waiting: the immutable-arrays probe's recommendation (`perf-probes/immutable-arrays/REPORT.md`; the planner left it out); climb batch 20's review list (queue items 31, 29, 95, 112, 113, 165), then the INDEX ask (INDEX's boot read is 89K; reading its last 60 lines and searching the rest would save about 80K a boot) and the 10-19 post-mortem redo plan's asks 6, 7, 9 and 10; three drafted ledger rows; queue items for PLAN's lists of batches 14 to 17; the gather's commit by named paths; the revival page's rewrite.
- Untracked scratch: deleted before the launch on 10-23 (the `writer-*.done` markers, the ledger health `.tsv` files, `positions-audit/tools/sort.txt`); `tmp/export-rows/` (ignored) once rows 800 to 802's tests are written in run 2.

## The record, the machine, the pages

- **The model:** Opus 5.5 since his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19. Every writer is Opus, at his word of 05:35 UTC on 10-22.
- **The boot:** the full boot is the default; a light boot only at his word. The compaction hook checks the model with `tools/model-now.sh`, then loads `fortress-repo` and the coordinator skill with the Skill tool.
- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. Commit by named paths only, never `-A`, `.` or `-a`.
- **The week:** reset at 10:00 UTC on 10-23. Written today before the launch, by agents' own counts: the evidence map 0.70M, the Fable judgement 0.39M, the planner about 0.48M in three rounds, probe A1 0.40M, the Fable review 0.49M and its second read 0.13M.
- **The machine:** the session's process last started at 10:01:31 UTC on 2026-10-23 (`ps`); the next stop by the cap is about 23:00 UTC on 10-23.
- **Pages:** the post-mortem report, https://claude.ai/artifact/F3Gz2ynXQSKEjKXqhNT5is, version 3 (source `scratchpad/pmreport/build.py`, from `REPORT.md`); the audit page, https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb, version 15, for his later review of items 268 to 276 (source `scratchpad/auditpage/`); the drafts page, https://claude.ai/artifact/XXBj1nCCADReEGXspFG2Tg; the revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, its rewrite owed. After a compaction, publish a page by its URL.

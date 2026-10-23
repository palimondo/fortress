<!-- The boot note: what is in flight, for the coordinating session after a compaction, a stop or a lost container; the one question waiting on the curator, if one is; and what the session is to do next. Rewritten whole at every change, never appended to; the earlier notes are history, in postmortem-2026-09-19/held-list.md and in git. Read at boot after PLAN.md's first section, before HELD.md. Its own home since 2026-10-12, at the curator's word. -->

# Boot note

**State at 02:00 UTC on 2026-10-23** (04:00 his time). The post-mortem and record consolidation of 10-20 to 22 are done, and the batch hold lifted with its report, at his word of 22:43 on 10-22. The compaction of about 01:40 was followed by a full boot. Batch 21's three probes have all landed.

## Running

Nothing.

**Check-ins:** "Batch 21 preparation start" at 10:05 UTC on 10-23, after the weekly reset.

## Waiting on him

- Who decides changes to the coordinator skill (the 10-19 post-mortem's ask). Until he answers, no edit of the coordinator skill without his yes on its wording: my word to him at about 00:30 UTC on 10-23.
- Not critical, for the planner and the review queue: the export probe's two questions, `RR64`'s rounding return types and whether `Condition` or `Maybe` extends `ZeroIndexed`.

## Landed since the compaction of 23:20 UTC on 10-22

- The demos probe of P-79 (`025b140e8`, `perf-probes/team-demos/`): under walk 30 of the 52 demos that `DemoTests` runs reach their end and 22 stop, 8 by existing rows; most stops are a `ZZ64` from `nanoTime()` meeting an `RR64` (row 791's `asFloat`); with `demos-repairs.patch` all 52 reach their end (22 demo files, row 468's `Library/Generator22D.fss` fix, which needs its test first, and a missing `GenomeUtil2d.fsi`). Nine drafted ledger rows (section 5; row 710 out of date) and four questions (section 9) go to the planner. Its worktree removed.
- The walk probe of row 774 (`7a6e3afe0`, `perf-probes/walk-conditional-extension/`): the fix turns the gate test; with it 10 interpreter tests and 1 specification example go red, by three causes (a list built at a run-time class, `<|1,2|>` a `List[\Int\]`, loses its order, row 364; the library's `=/=` and three-argument `assert` reach a list's `=` only through `LexicographicOrder`, a defect today for any user `=`; P-154's intended loss, QuickCheck); `List` extending `Equality[\List[\E\]\]`, two written `[\ZZ32\]` and QuickCheck keyed by strings clear them. Its four questions (section 11) and its two drafted ledger notes (section 7) go to the planner; the `=/=` defect has no row yet. Its worktree removed.
- The post-mortem report rewritten in a neutral register for researchers (`db6e890c3`), and its section 6 with the cost of each phase (`44f2a2fd9`: workers 58.98M, the coordinator 4.92M, all 63.90M); the page at version 3. Its map and briefs, and the ledger clarity run's chunks, moved into `evidence/` by `git mv`.
- The export check run to its end (`13d80a540`): 115 differences behind the 43 entries; 4h with 19 follow-on api lines keeps the distance at 5 and the entries fall to 20, 4i to 15. Its defects: the distance table shows a library that does not parse as no total, and `errors.py` takes prefix operators (`c21177829`); rows 800 to 802 for the export check (`9d8119024`).
- The skill re-attachment archaeology (`3a7adac8f`): old behaviour, since 08-19.
- The boot's step 0 by `tools/model-now.sh` in place of `get_session` (`db2b751b1`, `404599414`).
- The coordinator skill: a run's working files into `evidence/`, and `--session-id` for every headless run (`c24fcf50a`); a brief-file rule added and taken out again at his word, since the model's habit serves (`5427e7208`).
- The eleven old worktrees, each checked, removed: 7.8 GB free.

## Next

- **Climb batch 21's preparation, on defaults** (PLAN, phase 3, item 19), at his word of 22:43 on 10-22: put only critical decisions to him; the launch needs his go. The planner starts after the reset, from the three probes' reports: `perf-probes/export-check-full/`, `perf-probes/walk-conditional-extension/` and `perf-probes/team-demos/`. For it, besides the candidates: the gated `XXX` tests of rows 800 to 802 (shapes in `tmp/export-rows/`), the checker-count stage's same gap (a library that does not parse reads as its parse-error count), the walk probe's `=/=` row and row 774 note, and the demos probe's nine drafted rows. The candidates that wait on his answers do not block it: the symbolic-operators probe's five questions (`perf-probes/symbolic-operators-2/REPORT.md`), review item 177 (row 773) and item 9 (`tint`).
- **The review of his type decisions as one chain, at the reset beside the planner** (his go at about 07:45 UTC on 10-23, the Fable judgement approved with it; the self-type probe dropped into it): (1) an Opus evidence map, reading only: every POSITIONS decision on types and the library's types, each with his words or the recommendation he took (the POSITIONS audit's trace), the team's latest word (the specification, the 2011 paper, the restart's Types chapter, Welterweight, POPL 2019, the team's library), and which decisions forced which; it reuses `reviews/decisions-review/` of 09-29 and examines the candidate list in `scratchpad/types-review/candidate-tensions.md`; (2) then a Fable judgement of the chain: where it bends the team's intent, the consistent set closest to it, and each change's cost in rungs. Estimate 2M to 3M, a guess. Batch 21 is not held for it, at his word: the subscripts and the vectors are reversible.
- **The ledger repair**, about 180 open rows (`ledger-health-2026-10-22/REPORT.md`), after the reset, if budget allows; the 40 refused notes first.
- **PLAN's consolidation**, a later cleanup over the weekend beside the climb batches (PLAN, "Work that can start now", item 1).

## Owed, small

- The ledger clarity run's queue items (`ledger-health-2026-10-22/evidence/clarity/l1` to `l5`, `queue.md`), not filed yet; among them the questions on rows 219 and 555.
- One `record.py note --correcting` call for the 11 history blocks that name the wrong commit: P-10, P-67, P-68, P-84, P-88, P-95 to P-98, P-103, P-124, P-125.
- P-91's FACTS pointer from F-123; `oracle-headers.md:47` still names the port.
- Review item 31's probe: whether the team's conditional extension fits `Vector` and `Matrix`, given row 773; he rejects "add times".
- Earlier owed work, waiting: the immutable-arrays probe's recommendation (`perf-probes/immutable-arrays/REPORT.md`); climb batch 20's review list (queue items 31, 29, 95, 112, 113, 165), then the INDEX ask (INDEX's boot read is 89K; reading its last 60 lines and searching the rest would save about 80K a boot) and the 10-19 post-mortem redo plan's asks 6, 7, 9 and 10; three drafted ledger rows; queue items for PLAN's lists of batches 14 to 17; the gather's commit by named paths; the revival page's rewrite.
- Untracked scratch to delete: the `writer-*.done` markers, the ledger health check's `.tsv` files, `positions-audit/tools/sort.txt`, `tmp/export-rows/` once its tests are written.

## The record, the machine, the pages

- **The model:** Opus 5.5 since his `/model claude-opus-5-5` at 21:04:25 UTC on 2026-10-19. Every writer is Opus, at his word of 05:35 UTC on 10-22.
- **The boot:** the full boot is the default; a light boot only at his word. The compaction hook checks the model with `tools/model-now.sh`, then loads `fortress-repo` and the coordinator skill with the Skill tool.
- **The record** lands on `main` by `committing.md`'s three pushes: `main`, `main:claude/worker-brief-fable-vnnuv8`, `main:blinded-fable`. Commit by named paths only, never `-A`, `.` or `-a`.
- **The week:** 97% used by his client at about 00:45 UTC on 10-23; the reset is at 10:00 UTC.
- **The machine:** the VM last started at 22:37:03 UTC on 2026-10-22; the next stop by the cap is about 11:37 UTC on 10-23.
- **Pages:** the post-mortem report, https://claude.ai/artifact/F3Gz2ynXQSKEjKXqhNT5is, version 3 (source `scratchpad/pmreport/build.py`, from `REPORT.md`); the audit page, https://claude.ai/artifact/XSW5Pz56938NcmCPg4GMZb, version 15, for his later review of items 268 to 276 (source `scratchpad/auditpage/`); the drafts page, https://claude.ai/artifact/XXBj1nCCADReEGXspFG2Tg; the revival page, https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5, its rewrite owed. After a compaction, publish a page by its URL.

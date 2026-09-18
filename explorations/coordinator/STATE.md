<!-- Where the work stands and what happens next, written 2026-09-18 when the coordinating session's container died and the work moved into another container. Supersedes `explorations/microgpt-run-c-handover.md` as the "where the work stands" slot in the load order; that note remains the state of the microGPT C series and the APL side quest, which are parked. Read after FACTS.md and POSITIONS.md. -->

# Where the work stands — 2026-09-18

## The thread

The compile-path ladder (`explorations/coordinator/PLAN.md`). Eight rungs were
climbed on 2026-09-17 and reviewed for conformance
(`reviews/rung-conformance-1-4.md`, `-5-8.md`); the review found rung 3 a
specification violation and rung 7 an unargued deviation. Those two findings
became **the repair batch**, `explorations/coordinator/REPAIR-BATCH.md`, which is
the next piece of work and is written to be run by a session that was not
present.

The batch was launched once, at 2026-09-17 19:26, and did not finish: the
container died inside the workflow's turn. It must be **re-run from the start**;
its four agents' results are not recoverable. Why, and what else the incident
cost: `explorations/coordinator/remote-container.md`.

## The switch of container

The coordinating session (`bdff267d-…`, transcripts on the orphan branch
`transcripts`) could not be re-provisioned. The work moved into the container of
the blinded Fable run, which already had the checkout and the toolchain:

- this container's session is `fe616d40-…`; its transcripts go to
  `transcripts-blinded`, and that is where they stay — the two lineages are kept
  apart deliberately and joined at analysis time
- the dead session's transcripts are materialised here at
  `/home/user/fortress-transcripts` (296 MB), complete to its last record,
  2026-09-17T20:31:14Z. **Nothing of that session after 20:31 exists anywhere.**
- the branch is `main`; the infrastructure's own branch name for this container,
  `claude/worker-brief-fable-vnnuv8`, is kept pinned to the same commit so a
  re-provision cannot land on a stale tree

## Next actions, in order

1. **Complete the workflow script.** The launched script is committed verbatim as
   `explorations/coordinator/repair-batch-workflow.js`, recovered from the dead
   session's transcript. It ends at the scatter: per rung it runs
   `rung → skeptic → repair → skeptic2` and returns. The four stages that were to
   follow (gather, gate, commit, ledger) were going to be added by resuming the
   run — which is impossible across sessions, because `resumeFromRunId` is
   same-session-only. Write them into the script instead, so one launch finishes
   the batch.
2. **Re-run the batch** per `REPAIR-BATCH.md`: both repairs, k = 2, gate on the
   full pair, one `.java` rule relaxation recorded there. Needs Pavol's explicit
   opt-in, as every workflow does.
3. Optional, and only if the reasoning is wanted rather than the result: distil
   the dead session's transcript tail (from its last compaction to 20:31:14) into
   a note. The decisions it reached are already committed as `2ab1d6d8`
   ("Settle three design questions the first batched trial raised") and in
   `REPAIR-BATCH.md`; the tail would add the reasoning, not the conclusions.

## What was done on 2026-09-18 before this note

The transcript backup was repaired first, because re-running the batch under the
old one would have lost the new agents' transcripts exactly as the last run did:
workflow-agent transcripts are now captured, oversized transcripts split at
64 MiB, and loose objects are packed. Then the mechanism and the recovery
procedure were written down (`remote-container.md`), since neither existed.

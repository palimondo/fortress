# The boot

At session start and after every compaction, before any work and before anything is said to the curator. A hook reminds the session after a compaction; the boot is the coordinator's. A worker whose context is compacted re-reads its brief instead.

## The order

1. `CLAUDE.md`.
2. `explorations/protocol.md`.
3. `explorations/coordinator/FACTS.md`, whole, in one pass, in pages of about 15 to 20 lines: the Read tool's page holds 25K tokens, and the lines are long.
4. `explorations/coordinator/POSITIONS.md`.
5. `explorations/coordinator/INDEX.md`. Then run `explorations/coordinator/check-index.sh` and give every note it reports missing its line.
6. The first section of `explorations/microgpt-run-c-handover.md`.
7. The boot note and the held list, `explorations/coordinator/postmortem-2026-09-19/held-list.md`.

If the boot note says a batch is running: its batch record, `explorations/coordinator/CLIMB-BATCH-<n>.md`, only the sections for the curator, on the choices inside the rungs and on how it is run (the rung sections are the workers' briefs); then the run's `journal.jsonl` and its agents' last transcript timestamps, before anything is said about the run.

## What the boot reads, and what it does not

- The record and nothing else. No directory listings; every command's output bounded.
- It costs about 250K tokens of context, `FACTS.md` about a third of it: the price of full context, paid once per boot.
- Reports, transcripts, ledger rows and source go to a worker that returns a summary.
- Whether a worker still runs is read from the harness's notice at the top of the turn and from `test -f` on the one output path its brief names.
- "Is anything in flight" is answered from the tree and the run's journal, never from what the curator's client shows, which can be stale.
- After a stop of the process, a restart or a lost container, what is on disk and what is pushed are read before anything starts again (the `remote-container` skill).

## After the boot

- The boot is full context: a resumed coordinator knows the project without the curator.
- An order lost to a compaction is found in the record, never asked again. Asking again is the same failure as inventing an order.
- The one question waiting on the curator is the boot note's, if it names one. Nothing else is put to the curator until the record has been searched for the curator's word on it.

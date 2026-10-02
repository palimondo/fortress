<!-- The coordinator's knowledge base, created 2026-09-15 at Pavol's request. Read at every session start and after every compaction, before any work. -->

# The coordinator's knowledge base

Boot, at session start and after every compaction, in this order: `CLAUDE.md`
→ `explorations/protocol.md` → `FACTS.md` (whole, in one pass) →
`POSITIONS.md` → `INDEX.md`, then `check-index.sh` run and every note it
reports missing given its line (Pavol, 2026-09-24) →
`explorations/microgpt-run-c-handover.md`, first section → the boot note
(`postmortem-2026-09-19/held-list.md`, line 7). If the boot note says a batch
is running, its `CLIMB-BATCH-*.md` next, only the sections for Pavol, on the
choices inside the rungs and on how it is run (1, 5 and 6 in batch 6), since
the rung sections are the workers' briefs, and the run's `journal.jsonl` and
its agents' last transcript timestamps before anything is said about it.
Nothing else is read by the
coordinator itself: reports, transcripts, ledger rows and source go to a
worker that returns a summary; whether a worker is still running is read from
the harness's notice at the top of the turn and from `test -f` on the one
output path its brief names, never by listing a directory. The boot read is
full context by Pavol's word: a resumed coordinator knows the project without
him.

The coordinator is two things and keeps two records. As orchestrator it keeps
what a worker or its own next incarnation needs to act: `FACTS.md` (what is
established about the language, the library, the runtime and this container,
each fact in a few lines with its source and its test, the detail left in
the report it cites), `INDEX.md` (one line per
standalone note, searched before any fact is called absent), `PLAN.md` (the
phases, the open issues in the order they need deciding, the parked items),
the handover's first section (where the work stands) and the boot note, whose
one purpose is to tell the post-compaction coordinator what is in flight: what
is running, what to do when it completes, and a question waiting on Pavol if
one is. As executive assistant it keeps what keeps the project on track and
Pavol out of the wall of text: the open issues and their order (`PLAN.md`),
the held list while he reads (`held-list.md`'s own list: each point a line in the coordinator's words with the UTC time of his message, the transcript holding his exact words), and `POSITIONS.md`,
what he has decided and already knows, dated, in his words, so that nothing is
re-asked or re-explained; it is not a log of what he said.

How they are kept:

- `FACTS.md` and `POSITIONS.md` are the optimized build: what is true of the
  tree now, and what he holds now, written timelessly, with no dates, no rung
  or commit names and no account of what changed when or what corrected
  what; `FACTS-history.md` and `POSITIONS-history.md` are the debug build,
  with the full provenance: every earlier text of every entry, verbatim,
  under a dated section, with a comment line saying what became of it, and
  his quotes at their dates. A worker or a coordinator may append an entry
  with a date, a quote, a rung's name or a commit in it, and may correct an
  earlier entry beside it; each consolidation compiles that out: the
  provenance moves to the history and the fact or the position is rewritten
  without it, at full informational fidelity. An entry that changes is
  rewritten in place; no "superseded by", no "corrected", no dated updates
  inside an entry. `FACTS.md` is consolidated before each batch launches,
  since the batch's agents read it; `POSITIONS.md` at each landing or when he
  replaces a decision.
  Before each commit of such a consolidation,
  `tools/check-verbatim.py <base> <file> <history>` shows every entry of the
  file at the base verbatim in the file or in its history.
- One home per thing. His words are written once, in `POSITIONS.md`; every
  other file points to the entry. Nothing is written twice.
- A remark is not a decision, and neither is a one-off go. A change to how we
  work is a protocol line rewritten; a go or a push is written nowhere, the
  launch or the commit being its trace; a question is answered where the
  answer belongs; he is not told about record edits.
- Nothing a resumed coordinator needs is lost: what a `FACTS.md` entry leaves
  out is in the report or record it cites, and its earlier text is verbatim in
  the history.
- The boot note is rewritten whole at every change, never appended to.
- A fact enters in the commit that establishes it; a decision in the next
  commit after he states it. A FACTS entry is cited by its bold title, or by
  its opening words where it has none, and a POSITIONS entry by its bold
  title; a title stays verbatim when the entry is rewritten, and where it no
  longer holds the entry says so and states the present.

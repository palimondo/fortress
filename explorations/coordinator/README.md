<!-- The coordinator's knowledge base, created 2026-09-15 at Pavol's request. Read at every session start and after every compaction, before any work. -->

# The coordinator's knowledge base

Boot, in this order: `CLAUDE.md` → `explorations/protocol.md` → `FACTS.md`
(whole, in one pass) → `POSITIONS.md` → `INDEX.md` →
`explorations/microgpt-run-c-handover.md`, first section → the boot note
(`postmortem-2026-09-19/held-list.md`, line 7). If the boot note says a batch
is running, its `CLIMB-BATCH-*.md` next, and the run's `journal.jsonl` before
anything is said about it. Nothing else is read by the
coordinator itself: reports, transcripts, ledger rows and source go to a
worker that returns a summary; whether a worker is still running is read from
the harness's notice at the top of the turn and from `test -f` on the one
output path its brief names, never by listing a directory. The boot read is
full context by Pavol's word: a resumed coordinator knows the project without
him.

The coordinator is two things and keeps two records. As orchestrator it keeps
what a worker or its own next incarnation needs to act: `FACTS.md` (what is
established about the language, the library, the runtime and this container,
each fact at the length it takes, with its source), `INDEX.md` (one line per
standalone note, searched before any fact is called absent), `PLAN.md` (the
phases, the open issues in the order they need deciding, the parked items),
the handover's first section (where the work stands) and the boot note, whose
one purpose is to tell the post-compaction coordinator what is in flight: what
is running, what to do when it completes, and a question waiting on Pavol if
one is. As executive assistant it keeps what keeps the project on track and
Pavol out of the wall of text: the open issues and their order (`PLAN.md`),
the held list while he reads (`held-list.md`'s own list), and `POSITIONS.md`,
what he has decided and already knows, dated, in his words, so that nothing is
re-asked or re-explained; it is not a log of what he said.

How they are kept:

- These files describe the present. An entry that changes is rewritten in
  place; the old text is in git, and the commit message says what changed and
  why. No "superseded by", no "corrected", no dated updates inside an entry.
  A landed rung's narrative may move to `FACTS-history.md`, verbatim, as
  before.
- One home per thing. His words are written once, in `POSITIONS.md`; every
  other file points to the entry. Nothing is written twice.
- A remark is not a decision, and neither is a one-off go. A change to how we
  work is a protocol line rewritten; a go or a push is written nowhere, the
  launch or the commit being its trace; a question is answered where the
  answer belongs; he is not told about record edits.
- Nothing a resumed coordinator needs is condensed for length.
- The boot note is rewritten whole at every change, never appended to.
- A fact enters in the commit that establishes it; a decision in the next
  commit after he states it. A FACTS entry is cited by its bold title, which
  stays verbatim when the entry is rewritten.

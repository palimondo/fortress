<!-- The coordinating session's boot order, at session start and after every compaction; how the session works, and how the record is kept, is the `coordinator` skill (`.claude/skills/coordinator/`). -->

# The coordinator's boot

At session start and after every compaction, the coordinating session reads these in order. The `coordinator` skill's `SKILL.md`, "The boot", gives this order and the rules around it.

1. `CLAUDE.md`, then the `coordinator` skill's `SKILL.md`.
2. `FACTS.md`, `POSITIONS.md` and `INDEX.md`, each whole. `FACTS.md` is read in pages.
3. `check-index.sh`, run, and an INDEX line added for each note that it reports.
4. `PLAN.md`, its first section.
5. `BOOT.md`, the boot note, then `HELD.md`, the held list.
6. `git log --oneline -15`.
7. If the boot note says that a batch runs: the skill's `references/batch.md`, and what its "While it runs" names.

How the record is kept (FACTS, POSITIONS, their history files, INDEX and the gap ledger) is the skill's record part, `references/record.md`.

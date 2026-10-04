# Fortress revival

This is a revival of Sun/Oracle's **Fortress** programming language (Guy
Steele's HPC language, 2003–2012), an interpreter and a partial JVM compiler.
The curator (@palimondo) decides what gets committed.

## Project goal

Finish what the designers intended, judged by the specification in
`Specification/`, the Working Draft as the revival revises it, not redesign the
language; the measuring stick is one program, microGPT, compiled to bytecode
and running fast (`explorations/coordinator/POSITIONS.md`, "The measuring
stick."). Where the Types chapter of the team's later, unfinished restart of
the specification (`Documentation/Specification/Prose/Language/types.tick`,
2012) covers a topic, it is cited beside `Specification/` as the designers'
later word (`explorations/coordinator/spec-lineage.md`). The plan is
`explorations/coordinator/PLAN.md`; where the work stands is the first section
of `explorations/microgpt-run-c-handover.md`; every known gap, defect and
design limit is a row of `explorations/fortress-gap-ledger.md`.

## How to work here

- Before any build, test run, edit, measurement, commit or agent launch, load
  the `fortress-repo` skill; for the container, the session, restarts and
  agents, the `remote-container` skill.
- The coordinating session follows the boot order of
  `explorations/coordinator/README.md` at session start and after every
  compaction, and works by the `coordinator` skill.

## Layout

- The original Fortress tree is everything not listed below: the historical
  artifact being revived. An edit to it follows the `fortress-repo` skill
  (test first).
- `explorations/`: the revival's experiments, records and writeups.
- `research/`: the Guy Steele corpus. `research/README.md` is a links-only
  index and `research/extracts/` holds working notes; `research/decks/` is
  gitignored (copyrighted PDFs, never committed).
- `Specification/` (the standard, revised) and `Specification-1.0-frozen/`
  (the unrevised Working Draft, never touched).
- `.claude/skills/`: the project skills.

Claims in the 2012 tree's own READMEs (root `README.txt` among them) describe
their era, not the current tree.

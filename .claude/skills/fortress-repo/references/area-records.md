# The gap ledger and the coordinator's records

The record is the project's memory. Read the slice you need and cite what it holds instead of measuring it again. Apart from the coordinator's boot, nobody reads its big files whole.

## Finding things

Print slices of the record, whole entries in bounded parts:

    T=explorations/coordinator/tools/facts-extract.sh
    $T 'WORDS OF A TITLE'            # the FACTS.md entry whose bold title holds them
    $T 'section:HEADING'             # every FACTS.md entry of a section
    $T 'ledger:424'                  # one row of the gap ledger
    $T 'positions:WORDS OF A TITLE'  # one of the curator's decisions
    $T 'index:WORDS'                 # the INDEX.md lines on a topic, one per note
    $T 'map:README.md#Touch this'    # a section of a territory map
    $T 'doc:PATH#HEADING'            # a section of any note, or of a .tex chapter
    $T --check ...                   # where each key matches and its size; --part N continues; --help

The files:

- `explorations/coordinator/FACTS.md`: what is established, each fact with its source and its test, cited by its bold title.
- `explorations/coordinator/POSITIONS.md`: what the curator has decided and already knows. A closed decision is not reopened.
- `explorations/coordinator/INDEX.md`: one line per standalone note. Search it before saying anything is absent.
- `explorations/coordinator/PLAN.md`: the phases and the open issues, in the order they need deciding.
- `explorations/fortress-gap-ledger.md`: the known gaps, one row each.
- `explorations/coordinator/map/`: `README.md` (section 7: what each change reaches, which tests guard it, where the gate is blind), `spec-to-implementation.md` (where a fix belongs), `modules-and-phases.md`, `test-coverage.md`, `design-intent-sources.md` (where the designers' intent is written), `dormant-code.md` (code present and switched off).
- `explorations/repo-internals.md`: architecture, name resolution, cache anatomy, git archaeology. A `git log` of a directory is useless here (the history has parentless roots); use `git log --follow` on a file, or compare contents.
- `explorations/microgpt-run-c-handover.md`, its first section: where the work stands.

The 2012 tree's own READMEs describe their era, not the current tree: check a claim of theirs against the code before acting on it.

## Practices

- A measurement the record holds is cited with its source and never repeated. Measure again only when the tree has changed under it, and say what changed. Measure only what is new.
- Before doing something a new way, search the record for how it was done last time.
- A timing names its machine: `nproc`, the CPU's model and MHz, the load at start, the JDK, `FORTRESS_THREADS`. Only a pair taken in one run measures a difference. No timing of the interpreter is taken.
- A report cites the tree at file:line and quotes results, two to five lines, each with its command. It never cites a file under `tmp/`.

## The gap ledger

- One row per claim, with a status (`POSITIVE-VERIFIED`, `NEGATIVE-VERIFIED`, `NEGATIVE-BOUNDED`, `CONTESTED`, `RETIRED`), a class (`implementation gap`, `library gap vs spec`, `library bug`, `design limit`, `deliberate`, `typesetter`, `packaging`) and how to reproduce it, under sections by area.
- Rows are never renumbered or moved: reports everywhere cite them by number. A new issue gets a new row with a new number; a fixed one is closed in place.
- Rows are the bug reports the work fixes: a fix begins by committing the row's reproduction, as a clean minimal test, to the corpus (`tests-writing.md`).

## FACTS, POSITIONS and the rest

- FACTS and POSITIONS describe the present: no dates, no names of who found what, no "corrected" or "superseded" notes. A wrong line is rewritten in place; the provenance lives in `FACTS-history.md` and `POSITIONS-history.md`. A FACTS entry is the fact, its source and its test in a few lines, under a bold title, pointing to the report that holds the detail.
- One home per thing: the curator's words are written once, in POSITIONS, and everything else points there.
- The record is updated in the same commit as the work that establishes the fact or takes the decision.
- An agent working beside others does not edit `FACTS.md`, `POSITIONS.md`, `PLAN.md`, `INDEX.md`, the ledger, the handover, `CLAUDE.md`, `explorations/protocol.md`, the tools under `explorations/coordinator/tools/`, or `.claude/`: parallel edits of those files conflict. It writes the lines for them in its report (the FACTS entry, the ledger note, the plan line) as finished prose, for whoever folds them in.
- Everything of ours lives under `explorations/`. `research/decks/` holds copyrighted material, is gitignored and is never committed.

## What every report holds

Every agent that finds or decides something, in an exploration or a batch, puts it in its report in this form, whatever else its brief asks for:

- **Defects.** Each defect measured, with its home named: an assertion in a gated test, a gated `XXX` test, a test pinning today's behaviour with a ledger row, or the row alone (`tests-writing.md`, "Where a measured defect goes"). A row is in the ledger's form above, written in the report as finished prose when you may not edit the ledger.
- **Decisions.** Each choice made among alternatives, named as a decision apart from the findings: what was chosen, the alternatives considered, and the evidence, cited. Where the record holds no position, none is invented: say which reading you acted on. A decision left as a line inside the findings counts as not made.
- **Stops met.** Each stop the brief reserves that the work met, listed as met, with its evidence, including one met on part of the work.
- **Nothing more.** The report does not choose which of its items anyone reviews, and the agent asks the curator nothing: an open question goes in the report, as a decision not taken, with its alternatives.

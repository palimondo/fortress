# The record: the gap ledger, FACTS, POSITIONS and the rest

## Finding things

Read only the slice of the record that you need. Do not read the big files whole. This tool prints whole entries, in parts of bounded size:

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

- `explorations/coordinator/FACTS.md`: what is established. Each fact has its source and its test. Cite a fact by its bold title, or by its opening words if it has no title.
- `explorations/coordinator/POSITIONS.md`: what the curator has decided and already knows. Do not reopen a closed decision.
- `explorations/coordinator/INDEX.md`: one line for each standalone note. Search it before you say that anything is absent.
- `explorations/coordinator/PLAN.md`: the phases, and the open issues in the order they need deciding.
- `explorations/fortress-gap-ledger.md`, the gap ledger: the known gaps, one row each.
- `explorations/coordinator/map/`: `README.md` (section 7: what each change reaches, which tests guard it, where the gate is blind), `spec-to-implementation.md` (where a fix belongs), `modules-and-phases.md`, `test-coverage.md`, `design-intent-sources.md` (where the designers' intent is written), `dormant-code.md` (code that is present and switched off).
- `explorations/repo-internals.md`: the architecture, name resolution, the caches, git archaeology.
- `explorations/microgpt-run-c-handover.md`, the handover: its first section says where the work stands.

The 2012 tree's own READMEs describe their era, not the current tree. Check a claim of theirs against the code before you act on it.

## The repository's history

- The repository is a 2018 fork of `sirinath/fortress`, a git conversion of the project's java.net Mercurial repository. Its trunk runs from 2007-01-04 to 2012-08-31 and ends at `a874948ac`.
- The commits after `a874948ac` are the revival's.
- The conversion cut 146 parent links, so a history walk from `HEAD` stops early. A `git log` of a directory is useless here. Use `git log --follow` on a file, or compare contents.
- To find who wrote something, and where the lineage after 2012 comes from, read `research/authorship.md` and `explorations/coordinator/lineage.md`.

## Practices

- Cite a measurement that the record holds, with its source. Do not repeat it. Measure again only if the tree changed under it, and say what changed. Measure only what is new.
- Before you do something in a new way, search the record for how it was done last time.
- Name the machine with every timing: `nproc`, the CPU's model and MHz, the load at start, the JDK, `FORTRESS_THREADS`. Only a pair of timings taken in one run measures a difference.
- In a report, cite the tree at file:line, and quote results, two to five lines, each with its command. Never cite a file under `tmp/`.

## The gap ledger

- Each row is one claim. It has a status (`POSITIVE-VERIFIED`, `NEGATIVE-VERIFIED`, `NEGATIVE-BOUNDED`, `CONTESTED`, `RETIRED`), a class (`implementation gap`, `library gap vs spec`, `library bug`, `design limit`, `deliberate`, `typesetter`, `packaging`) and how to reproduce it. The rows are under sections by area.
- Never renumber or move a row: reports everywhere cite rows by number. Give a new issue a new row with a new number. Close a fixed row in place.
- The rows are the bug reports that the work fixes. A fix of a row starts with its reproduction, written as a test (`tests-writing.md`).

## FACTS, POSITIONS and the rest

- FACTS and POSITIONS describe the present: no dates, no names of who found what, no "corrected" or "superseded" notes. Rewrite a wrong line in place. The provenance goes in `FACTS-history.md` and `POSITIONS-history.md`.
- Write a FACTS entry as the fact, its source and its test in a few lines, under a bold title. Point to the report that holds the detail.
- Write each thing in one place. The curator's words are written once, in POSITIONS. Everything else points there.
- Edit the following only if your brief asks you to, because parallel edits of them conflict: `FACTS.md`, `POSITIONS.md`, `PLAN.md`, `INDEX.md`, the ledger, the handover, `CLAUDE.md`, `explorations/protocol.md`, the tools under `explorations/coordinator/tools/`, and `.claude/`.
- If your brief does not ask, write your lines for them in your report as finished prose: the FACTS entry, the ledger row or note, the plan line, the INDEX line.
- If you may edit FACTS, add a fact in the commit that establishes it. A decision of the curator's enters POSITIONS in the next commit after the curator states it.
- Put new files of the work under `explorations/`.

## Points to report

Your brief can name points to report: kinds of change or finding that the curator wants to review. Examples from earlier briefs: a changed line of a team test, a checker edit inside a change to the library, a changed line of the model program.

- If the work reaches such a point, do what the brief says for it. For example, a brief can say that a site is left with a ledger row instead of a repair.
- Then finish the work.
- If a step cannot be undone, or would reverse a decision on record, do not take it. Put it in your report as a decision not taken, with its alternatives.

## What every report holds

Your brief says where your report goes: a file that it names, your final message, or both. If it names no file, your report is your final message. If you add a standalone note under `explorations/`, write its INDEX line.

If you found or decided something, put it in your report in this form, whatever else your brief asks for:

- **Defects.** Each defect that you measured, and the test or ledger row that records it (`tests-writing.md`, "How a defect is recorded").
- **Decisions.** Each choice that you made among alternatives, as a decision apart from the findings: what you chose, the alternatives, and the evidence, cited. If the record holds no position, do not invent one: say which reading you acted on. A decision left as a line inside the findings counts as not made.
- **Points to report.** Each point that your brief names and the work reached, with its evidence, also one that only part of the work reached.
- **Questions for the curator.** If something needs the curator's decision, list it as a decision not taken, with its alternatives. The reader of your report brings it to the curator. Do not choose which of your items anyone reviews.

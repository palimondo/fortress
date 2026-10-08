# The record and the report

A point to report is a kind of change or finding that the curator wants to review. Your brief names its points to report. Examples: a changed line of a test that the team wrote, a checker edit inside a change to the library, a changed line of the model program.

## The gap ledger

Each row is one claim. It has a status (`POSITIVE-VERIFIED`, `NEGATIVE-VERIFIED`, `NEGATIVE-BOUNDED`, `CONTESTED`, `RETIRED`), a class (`implementation gap`, `library gap vs spec`, `library bug`, `design limit`, `deliberate`, `typesetter`, `packaging`) and how to reproduce it. The rows are under sections by area.

The rows are the bug reports that the work fixes. A fix of a row starts with its reproduction, written as a test (`tests-writing.md`).

Reports everywhere cite rows by number. So never renumber or move a row. Give a new issue a new row with a new number. Close a fixed row in place.

The ledger is large: whole, it is about 400K tokens, and one row can be 12K characters. Never read it whole, and never print whole matching lines from it. To find rows, run the `ledger-find` query with a few words (below). If it reports many more rows, add a word. Then print each row that you need with `ledger:ROW`.

## FACTS and POSITIONS

FACTS and POSITIONS describe the present: no dates, no names of who found what, no "corrected" or "superseded" notes. The provenance goes in `FACTS-history.md` and `POSITIONS-history.md`.

A FACTS entry is the fact, its source and its test in a few lines, under a bold title. It points to the report that holds the detail.

## The repository's history

- The repository is a 2018 fork of `sirinath/fortress`, a git conversion of the project's java.net Mercurial repository. Its trunk runs from 2007-01-04 to 2012-08-31 and ends at `a874948ac`.
- The commits after `a874948ac` are the revival's.
- The conversion cut 146 parent links, so a history walk from `HEAD` stops early. A `git log` of a directory is useless here. Use `git log --follow` on a file, or compare contents.
- To find who wrote something, and where the lineage after 2012 comes from, read `research/authorship.md` and `explorations/coordinator/lineage.md`.

## Reading the record

Read only the slice of the record that you need. Do not read the big files whole. This tool prints whole entries, in parts of bounded size:

    T=explorations/coordinator/tools/facts-extract.sh
    $T 'WORDS OF A TITLE'            # the FACTS.md entry whose bold title holds them
    $T 'section:HEADING'             # every FACTS.md entry of a section
    $T 'ledger-find:WORDS'           # each ledger row that holds every word: number, status, claim's start
    $T 'ledger:424'                  # one row of the gap ledger
    $T 'positions:WORDS OF A TITLE'  # one of the curator's decisions
    $T 'index:WORDS'                 # the INDEX.md lines on a topic, one per note
    $T 'map:README.md#Touch this'    # a section of a territory map
    $T 'doc:PATH#HEADING'            # a section of any note, or of a .tex chapter
    $T --check ...                   # where each key matches and its size; --part N continues; --help

Cite a FACTS entry by its bold title, or by its opening words if it has no title.

## Writing to the record

- Edit the following only if your brief asks you to, because edits by several agents at once collide: `FACTS.md`, `POSITIONS.md`, `PLAN.md`, `INDEX.md`, the ledger, the handover, `CLAUDE.md`, `explorations/protocol.md`, the tools under `explorations/coordinator/tools/`, and `.claude/`.
- If your brief does not ask, write your lines for them in your report as finished prose: the FACTS entry, the ledger row or note, the plan line, the INDEX line.
- If you may edit FACTS, add a fact in the commit that establishes it. A decision of the curator enters POSITIONS in the next commit after the curator states it.
- Rewrite a wrong line of FACTS or POSITIONS in place.
- Write each thing in one place. The curator's words are written once, in POSITIONS. Everything else points there.
- Put new files of the work under `explorations/`. If you add a standalone note there, write its INDEX line.

## Practices

- Cite a measurement that your brief cites or that your own work took, with its source. Take it again only if the code changed under it, and then say what changed.
- Name the machine with every timing: `nproc`, the CPU's model and MHz, the load at start, the JDK, `FORTRESS_THREADS`. Only a pair of timings taken in one run measures a difference.
- In a report, cite the tree at file:line, and quote results, two to five lines, each with its command. Never cite a file under `tmp/`.

## At a point to report

- If the work reaches a point to report, do what the brief says for it. For example, a brief can say that a site is left with a ledger row instead of a repair.
- Then finish the work.
- If a step cannot be undone, or would change a decision of the curator, report it instead. List it as a decision not taken, with its alternatives.

## What every report holds

Your brief says where your report goes: a file that it names, your final message, or both. If it names no file, your report is your final message.

If you found or decided something, put it in your report in this form, whatever else your brief asks for:

- **Defects.** Each defect that you measured, and the test or ledger row that records it (`tests-writing.md`, "How a defect is recorded").
- **Decisions.** Each choice that you made among alternatives, as a decision apart from the findings: what you chose, the alternatives, and the evidence, cited. If no decision of the curator covers it, say so, and say which reading you acted on. A decision left as a line inside the findings counts as not made.
- **Points to report.** Each point that your brief names and the work reached, with its evidence, also one that only part of the work reached.
- **Questions for the curator.** If something needs the curator's decision, list it as a decision not taken, in the form that `exploring.md` gives. The reader of your report brings it to the curator. Do not choose which of your items anyone reviews.

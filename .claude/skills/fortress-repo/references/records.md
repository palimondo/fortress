# The report and the record

## What every report holds

Your brief says where your report goes: a file that it names, your final message, or both. If it names no file, your report is your final message.

A finding is something that your work learned about the tree or the language, and that the record does not hold yet. Examples: a defect, a behaviour that departs from the specification or from a decision of the curator, a measurement. What you did along the way is not a finding, for example the files that you read or edited. Your transcript keeps that.

A point to report is a kind of change or finding that the curator wants to review. Your brief names its points to report. Examples: a changed line of a test that the team wrote, a checker edit inside a change to the library, a changed line of the model program.

Put each of these that you have in your report, in this form, whatever else your brief asks for:

- **Defects.** Each defect that you measured, and the test or ledger row that records it (`tests-writing.md`, "How a defect is recorded").
- **Sentences of the specification made false.** Each sentence of the specification that your change makes false, quoted with its file and line. Such a sentence says what walk or the compiled path does. It is in the effect of an Appendix I entry (`Specification/appendices/changes.tex`), or in a `\revision` or `\note{}` box beside a passage.
- **Decisions.** Each choice that you made among alternatives, as a decision apart from the findings: what you chose, the alternatives, and the evidence, cited. If no decision of the curator covers it, say so, and say which reading you acted on. A decision left as a line inside the findings counts as not made.
- **Points to report.** Each point that your brief names and the work reached, with its evidence, also one that only part of the work reached.
- **Commands.** Each command that you had to work out because this skill does not give it, with what it does.
- **Questions for the curator.** If something needs the curator's decision, list it as a decision not taken, in the form that `exploring.md` gives. The reader of your report brings it to the curator. Do not choose which of your items anyone reviews.

## At a point to report

- If the work reaches a point to report, do what the brief says for it. For example, a brief can say that a defect in the code is recorded in a ledger row and not repaired.
- Then finish the work.
- If a step cannot be undone, or would change a decision of the curator, report it instead. List it as a decision not taken, with its alternatives.

## Timings and citations

- If you take a timing that you will keep, run nothing else beside it. All agents of the session share the machine's cores (the `cloud-container` skill).
- Name the machine with every timing: `nproc`, the CPU's model and MHz, the load at start, the JDK, `FORTRESS_THREADS`. Only a pair of timings taken in one run measures a difference.
- If you take a measurement again because the code changed, say what changed.
- In a report, cite the tree at file:line, and quote results, two to five lines, each with its command. Never cite a file under `tmp/`.

## POSITIONS and FACTS

POSITIONS and FACTS describe the present: no dates, no names of who found what, no "corrected" or "superseded" notes. The history of each entry is in `POSITIONS-history.md` and `FACTS-history.md`, beside them.

A FACTS entry is the fact, its source and its test in a few lines, under a bold title. It points to the report that holds the detail. Cite it by its bold title, or by its opening words if it has no title.

## The gap ledger

The ledger's rows are the bug reports that the work fixes. A fix of a row starts with its reproduction, written as a test (`tests-writing.md`).

A row is one line of eight cells, at most 1,200 characters, in the table of a topic section. Reports cite a row by its number, which it keeps for good. A new issue gets a new row.

- Its status is one of seven words: `POSITIVE-VERIFIED`, `NEGATIVE-VERIFIED`, `NEGATIVE-BOUNDED`, `CONTESTED`, `RETIRED`, `FIXED`, `DUPLICATE`. The last three close a row.
- Its class is a kind and an area, such as `implementation gap (checker)`.
- The earlier text of a changed row is in `explorations/fortress-gap-ledger-history.md`.

Read the ledger only through the queries below: it is too large to read whole.

## Reading the record

Read only the slice of the record that you need. This tool prints whole entries, in parts of bounded size:

    T=explorations/coordinator/tools/facts-extract.sh

- `$T 'positions:WORDS OF A TITLE'` prints one of the curator's decisions. Run it before you choose among ways to do something. If several titles hold the words, it names them.
- `$T 'WORDS OF A TITLE'` prints each FACTS entry whose bold title holds them, and `$T 'section:HEADING'` every entry of a FACTS section. Run one before you investigate a behaviour of the tree, and when your brief or a note names an entry.
- `$T 'index:WORDS'` prints the INDEX lines that hold the words. Run it to find the notes on a topic.
- `$T 'ledger-find:WORDS'` prints one line for each ledger row that holds every word. Run it when you meet a defect, before you investigate it.
- `$T 'ledger:ROW'` prints one row whole. Run it for each row that you need from a find, your brief or a note.
- `$T 'doc:PATH#HEADING'` prints a section of any note, or of a `.tex` chapter, and `$T 'map:FILE#HEADING'` a section of a note under `explorations/coordinator/map/`. Run one when your brief or a note names a section.
- `$T --check QUERY ...` prints only where each query matches and its size. Run it before a query whose size you do not know. `--part N` prints part N of a long output, and `--help` gives the rest.

A word of a query that ends in `*` matches the start of a word. Any other word matches a whole word.

Before you edit a file of the original tree, list the ledger rows that cite it:

    python3 explorations/coordinator/tools/ledger.py find --cites FILE

## Writing to the record

- Add a fact to FACTS in the commit that establishes it. A decision of the curator enters POSITIONS in the next commit after the curator states it.
- Rewrite a wrong line of FACTS or POSITIONS in place.
- Write each thing in one place. The curator's words are written once, in POSITIONS. Everything else points there.
- Put new files of the work under `explorations/`. If you add a standalone note there, write its INDEX line.

Write the gap ledger only with `ledger.py`, which checks each line that it writes against the row template.

    L="python3 explorations/coordinator/tools/ledger.py"

To add a row:

1. Print the row template, about 3 KB: `$T 'doc:explorations/fortress-gap-ledger.md#The row template'`.
2. Write the row as one line in a file under your tree's `tmp/`, with `?` in its number cell.
3. Run `$L add FILE --section TITLE`. It numbers the row and puts it in that section. If the row breaks the template, it adds nothing and prints each rule broken. `$L sections` lists the titles.

To change a row:

- `$L note N TEXT` adds TEXT to the notes of row N.
- `$L duplicate N --of M` makes row N a pointer to row M.
- `$L close N --commit HASH --test NAME` marks row N `FIXED`, by the commit HASH and its test NAME. Run it once that commit is in `HEAD`.

## The repository's history

- The repository is a 2018 fork of `sirinath/fortress`, a git conversion of the project's java.net Mercurial repository. Its trunk runs from 2007-01-04 to 2012-08-31 and ends at `a874948ac`, the team's last commit.
- The commits after `a874948ac` are the revival's. After the tag `sealed-tree`, commit `75cca6683`, the revival began to fix the team's code, test first. Before it, the revival changed mainly the build and the toolchain.
- `git diff a874948ac -- FILE` shows what the revival changed in a file, and `git diff 75cca6683 -- FILE` what it changed after the tag.
- The conversion cut 146 parent links, so a `git log` of a directory stops at a cut and misses the team's earlier commits. Use `git log --follow` on a file, or compare contents.
- To find who wrote something, or where the repository's history after 2012 comes from, read `research/authorship.md` and `explorations/coordinator/lineage.md`.

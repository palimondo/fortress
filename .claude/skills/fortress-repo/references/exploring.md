# Exploring: a question that the record does not settle

The record keeps what earlier workers found, and they met many of the same questions. Workers have called a thing absent or new when the record already held it.

## The choices that are yours

The curator settles every conflict and every question about a decision of the curator. Any other choice is yours only if it meets all four of these conditions:

- It changes only one area.
- It changes no line of the model program.
- It changes no decision of the curator.
- It can be undone.

## Weighing the sources

The type group is the part of the team that built the type checker and the compiler, from 2010 to 2012. Where their late positions disagree with the specification's earlier text, the curator gives the late positions more weight. These positions are:

- the exclusion rule;
- compiled code specialised to each instantiation of a generic, which they kept;
- the compiled number tower, which they flattened in 2011;
- the 2012 write-up on the Return Type Rule (`Papers/Types/journal/`);
- the POPL 2019 paper on symmetric multiple dispatch (`research/extracts/ParkPOPL2019-extract.md`).

The team's later work is outside the original tree. It is in these places:

- `research/extracts/`: the POPL 2019 paper, Steele's talks of 2015 and 2016, and the project's web sites with the post of July 2012 that ended the project;
- the reading of the team's 2012 patents: `explorations/reviews/mie-probes/patents-forest-rule.md`.

If a conflict or a decision not taken needs the designers' reason for a rule, print the row of its design area. WORD is a word of the area, such as `coercion`, `juxtaposition`, `dispatch` or `Arrays`. A word can match several rows, each about 1 to 2 KB.

    explorations/coordinator/tools/facts-extract.sh 'map:design-intent-sources.md#The map, by design area@WORD'

Then open the sources that the row names. Among them are the `\note{}` boxes and the team's written rationale in the Internal Document appendix: `Specification/appendices/FAQ.tex` and `future.tex`. The row also names the later works that speak to its area, after the words "after the repository (§7)". To read what one of them covers and does not cover, print its row of the map's section "After the repository". WORD is a word of its title, such as `Polymorphic`, `patents`, `JuliaCon` or `Wrapping`. A row is about 1 to 2 KB.

    explorations/coordinator/tools/facts-extract.sh 'map:design-intent-sources.md#After the repository@WORD'

When your report describes the team's sources on a question, say which of them is one of the late positions above. If the question is about a type rule, also name each later work that you checked.

## The procedure

1. Search the record with the queries in `records.md`. If two of the team's sources disagree, also load `revival-changes.md`.
2. If the record or `revival-changes.md` settles the question, go back to building. Cite what settles it.
3. If you have evidence against a decision of the curator, read its POSITIONS entry and the notes that it names. If the decision used your evidence, go back to building.
4. Search the original tree. These help: the feature table and the phase map (`compiler.md`, "Before an edit"), the `\note{}` boxes and the map of design areas ("Weighing the sources" above), and the history of a file (`records.md`, "The repository's history").
5. Before you write that something does not exist, search the record for it, INDEX included (`index:WORDS`).
6. Decide whose choice it is, by "The choices that are yours" above.
7. Record each defect that you found as `tests-writing.md`, "How a defect is recorded", says. If you make the choice and repair the defect, that is its item 1. If the question stays open, it is its item 3. Record a finding that is not a defect, such as a fact about the original tree, as `records.md`, "Writing to the record", says.
8. If your brief does not let you edit the ledger, put the ledger row in your report:
   1. Write the row in a file, in the form that `records.md` gives for a new row.
   2. Run `python3 explorations/coordinator/tools/ledger.py check --rows FILE`. It counts the `?` in the number cell as a broken rule. Correct the row until the check names no other rule.
   3. Copy the row into your report.
9. If the question touches a passage of the specification, do as `specification.md`, "When the text and an implementation disagree", says.
10. If the choice is yours, make it. Report it as a decision.
11. If the choice is the curator's, report it as a decision not taken. Give these:
    - the question;
    - each source, and its date ("Weighing the sources" above says what else to note);
    - each possible solution, and what it changes;
    - which solution keeps the current behaviour.
12. If you cannot get some evidence in your task, say in your report what is missing and how to get it.

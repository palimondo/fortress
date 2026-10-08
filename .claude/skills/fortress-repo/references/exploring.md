# Exploring: a question that the record does not settle

The record keeps what earlier workers found, and they met many of the same questions. Workers have called a thing absent or new when the record already held it.

## The choices that are yours

The curator settles every conflict and every question about a decision of the curator. Any other choice is yours only if it meets all four of these conditions:

- It changes only one area.
- It changes no line of the model program.
- It changes no decision of the curator.
- It can be undone.

## The procedure

1. Search the record with the queries in `records.md`. If two of the team's sources disagree, also load `revival-changes.md`.
2. If the record or `revival-changes.md` settles the question, go back to building. Cite what settles it.
3. If you have evidence against a decision of the curator, read its POSITIONS entry and the notes that it names. If the decision used your evidence, go back to building.
4. Search the original tree.
5. Before you write that something does not exist, search the record for it, INDEX included (`index:WORDS`).
6. Record what you found as `tests-writing.md`, "How a defect is recorded", says. For an open question, follow its item 3.
7. If your brief does not let you edit the ledger, put the ledger row in your report:
   1. Write the row in a file, in the form that `records.md` gives for a new row.
   2. Run `python3 explorations/coordinator/tools/ledger.py check --rows FILE`. It counts the `?` in the number cell as a broken rule. Correct the row until the check names no other rule.
   3. Copy the row into your report.
8. If the question touches a passage of the specification, also record what `specification.md` asks for.
9. If the choice is yours, make it. Report it as a decision.
10. If the choice is the curator's, report it as a decision not taken. Give these:
    - the question;
    - each source, and its date (`specification.md`, "Weighing the sources", says what else to note);
    - each possible solution, and what it changes;
    - which solution keeps the current behaviour.
11. If you cannot get some evidence in your task, say in your report what is missing and how to get it.

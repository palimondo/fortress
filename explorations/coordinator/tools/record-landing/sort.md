<!-- The record-landing workflow's sorter brief: run the evidence script, then sort each change that the record owes after a batch's landing by its home, its kind and its weight, into owed.md, before anything is written. -->

# The sorter of the record-landing workflow

You work in the Fortress revival repository. The curator is the person in charge of the project. The record is the project's memory under `explorations/`: `FACTS.md` and `POSITIONS.md` and their histories under `explorations/coordinator/`, the gap ledger `explorations/fortress-gap-ledger.md`, `PLAN.md`, `PLAN-history.md`, the review queue `review-queue.md`, `INDEX.md`, and the notes. An entry is one line of FACTS or POSITIONS under its permanent number, such as F-87 or P-48. A row is one line of the gap ledger under its number.

A batch has landed: its merged work went to `main` at its landing commit. Its post-batch review is committed too. Your launch message names the batch, its base, its landing commit, the worktree and the run's folder. The worktree is this run's own checkout. Its branch takes the run's work, and the coordinator lands that branch later.

## The problem

After a landing the record owes work. The landing made some of its sentences false. The rungs wrote their entries as drafts, as the worker skill tells them: "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." PLAN holds lines that the batch built or answered. Items for the curator wait in PLAN, or in no file. Two writers do this work after you, and each writes only its own homes. A home is the file and the place where a change goes. In an earlier run with no sort, one tool wrote 21 findings into the text of entries, and only 8 of them belonged there. So the sort comes first, before anything is written.

## The question

What does the record owe after this landing, change by change? A change is one thing that the record owes: a sentence or a line to write, cut, move or file, or a finding that needs no change. Write each change as one line of `owed.md` in the run's folder.

## Where the sources are

First run the command that your launch message gives. It is `prepare.sh`. It makes the worktree and writes the evidence into the run's folder. Its six files: `entries.md` (each entry that the batch added or changed, its lines at the base and now, its history blocks with who wrote each, and the report sections that it cites); `rows.md` (each row that the batch opened, closed, rewrote or noted); `cites.md` (each other entry, queue item and INDEX line that names a changed entry or row); `plan.md` (PLAN's headings, the lines that the batch added, the other lines that name a changed entry or row, and the lines that look stale: a line whose own review-queue item is settled, a list of items that disagrees with the queue, a review finding that a later commit names); `checks.md` (the record's checks at the worktree's head); `sources.md` (the queries that print the review's routing part, its findings and its part for the curator, and the batch record's items for the curator and what it left for the coordinator). Read all six, and print every query of `sources.md`. The last part of `entries.md`, "The cited sections", is the entries writer's: open a section of it only where a change's ground turns on it.

You read the record only through `explorations/coordinator/tools/facts-extract.sh`, `record.py` and `ledger.py`, run from the worktree: `cd WORKTREE && explorations/coordinator/tools/facts-extract.sh 'QUERY'`. The main tree, `/home/user/fortress`, can hold a later record than the worktree, so you read none of its record files. You write no entry: entries are written only through `record.py`, from the entries writer's file. Change no file but `owed.md`. Commit nothing.

## Each change

Write each change as one line, in this form:

    - C12 | home: P-N | kind: made false | weight: high | ground: <the rung's commit that closed row N; rows.md, row N> | the batch: not done | the curator's word: no, a sentence brought in line with the tree | writer: entries

- **C-number**: C1, C2 and so on. The writers, the checker and the judge name the change by it.
- **home**: one of nine. A FACTS entry (F-N); a POSITIONS entry (P-N); an entry's history only (a noted block, when the entry stays and its history lacks a fact); a gap-ledger row (row N); a PLAN line (PLAN.md:N, with its heading); a PLAN line moved to PLAN-history; a review-queue item (new, or item N); an INDEX line; a line of another note (PATH:N). Or none.
- **kind**: the pass on an entry that the batch added or changed; made false; stale; past 600 characters; built; answered; a new item for the curator; a new note.
- **weight**: high, a reader would act otherwise; low, wording or a pointer; none, no change, with the reason.
- **ground**: the file and line, the commit, or the review's section that shows the change is owed.
- **the batch**: whether a stage of the batch did it, or a part of it. `entries.md` names who wrote each history block: the gather, the merged-diff review or the commit stage.
- **the curator's word**: whether the change needs it, and why.
- **writer**: `entries` for the homes FACTS, POSITIONS, an entry's history and a row; `routing` for PLAN, PLAN-history, the queue, INDEX and other notes; `none`.

What decides a line:

- Each entry that the batch added or changed gets one change of kind "the pass", whatever else it gets. The rungs wrote it as a draft.
- Each line that `plan.md` lists as looking stale gets one change: stale, built or answered, with its ground, or weight none with the reason that it stays.
- The gate's figures in F-53 and F-240 are the commit stage's. A change keeps them, and a sentence of those entries changes only when the commit stage named it false.
- The gather closes rows. A change closes no row, and `ledger.py landing-check` must stay clean.
- A POSITIONS sentence that the tree made false changes by the fewest words, with no word of the curator: his rule of 2026-10-31. A change of what he decided, where it applies or what it requires needs his word. Name the clause and the landed fact that makes it false.
- Before you call an item for the curator open, search POSITIONS and INDEX for his answer (`positions:WORDS`, `index:WORDS`), and the ledger for a row that holds it (`ledger-find:WORDS`). An item that he answered is of kind "answered", with his word on that item's own question and its time. A default that the coordinator or a batch took is not his answer: that item stays open, of kind "a new item for the curator", with the default as landed.
- A default that the record does not hold is "no default on record". A "Needed by" that neither the batch record nor the review states is set by the workflow: mark it so, since the coordinator confirms it and the curator may change it. Mark a kind, consequential or routine, that neither of them states as "kind set by the workflow", for the same reason.
- A change of weight none stays in the file, with its reason, so that the checker can see that nothing was missed.

End `owed.md` with a section `## For the coordinator`: each change whose home is outside the record, one line each. These are the skill sentences that the batch made false (the review's part on them), the entries for the orientation update, a fault of the batch script or its manual, and any change to the boot note or the held list, which are the coordinator's.

## Your result

Your structured result: the count of changes for each home; the entries for the orientation update, the entries that the landing added or changed; and each change that needs the curator's word, with why, one line each; and a summary in a few lines.

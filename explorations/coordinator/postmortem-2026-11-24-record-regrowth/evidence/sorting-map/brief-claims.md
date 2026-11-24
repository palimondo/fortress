<!-- The brief of the workers that list, for each entry of FACTS, its claims by subject and by kind, as the first step of the sorting map for the batch mode of the record's consolidation; written by the coordinator on 2026-11-24, kept in the repository so that the step can be run again. -->

# Brief: the claims of each entry, by subject and by kind

You work in the Fortress revival repository, `/home/user/fortress`. Load the `fortress-repo` skill (Skill tool) and read its part `references/records.md`; then read the `coordinator` skill's `references/record.md`, sections "What an entry is" and "A consolidation" (`/home/user/fortress/.claude/skills/coordinator/references/record.md`). You only read and write one file for each of your chunks. Change no entry of the record, no tool and no skill. Keep every wait under 240 s.

## The problem

`explorations/coordinator/FACTS.md` holds 339 entries, one line each, under permanent numbers such as `F-87`. The record is to be consolidated, by the method that worked in October 2026. One thing is different now. An entry was written by one task of a batch, and it holds what that task found, whatever the subject. In a sample of 40 entries, 38 hold several claims that answer different questions, and 24 describe a defect that belongs in the gap ledger. The curator, the person in charge, said of such an entry: "what is uniting the things in it under one fact, other than they probably originated from the same batch?"

So before the record is cut into chunks for the writers, it must be sorted: which claim belongs under which subject, which entries say the same thing, which entry must be split and where its parts go. The model is the sorting of the gap ledger on 2026-10-08: first a search for duplicates, as a step of its own, then groups by topic (`explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-by-topic.md`, its sections on the ledger).

Your task is the first step of that sorting, for the chunks that your launch message names. You list what each entry says. You do not rewrite any entry and you do not decide the new order. A later worker groups your lists into one map.

## Your inputs

- The chunks: `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/consolidation/chunks.json` gives each chunk's section and its entries by number. Print an entry with `explorations/coordinator/tools/facts-extract.sh 'F-87'`, or a whole section with `'section:HEADING'` in parts.
- The scouts' files of this morning, one for each chunk, `evidence/consolidation/scout-<chunk>.md` in the same post-mortem folder: for each entry, whether each test, file and ledger row that it cites exists and agrees today. For the chunk `harness`, use `pilot/chunk-harness-gate.md` of the post-mortem folder in its place.
- The list of claims that today's checks found stale, false or unsettled: `evidence/stale-claims.md` in the post-mortem folder, by entry number.
- The gap ledger, through `facts-extract.sh 'ledger:N'` for a row that an entry names.

## What to write, for each entry of your chunks

1. **Its claims.** Each claim that the entry makes, as one plain sentence, in the entry's order. A claim is one thing that can be true or false on its own and can change apart from the others.
2. **For each claim, its subject:** a short label of two to five words that names what the claim is about, such as "the checker: self-typed traits" or "walk: dispatch on declared domains". Use the same label for the same subject across your entries. Start each label with its area: the checker, the code generator, the compiled runtime, walk, the library, the specification, the harness and the gate, the tools, the repository.
3. **For each claim, its kind,** one of:
   - property: an established property of the tree, the language, the library or their tools, which later work builds on;
   - defect: a description of something broken or missing, with the ledger row that it names, if any;
   - history: how the fact came about, such as a date, a batch, a repair, what it replaced;
   - plan: what is built, what is still to build, or what waits for a decision;
   - choice: a choice that a worker made without the curator's word;
   - detail: a measured number, a list of sites, a line number or a command that is needed only while doing the work;
   - tests: a list of test names;
   - pointer: a sentence that only points to another entry, a decision or a report.
4. **For each claim of the kinds property, defect and choice: which other entries of FACTS say the same or overlap,** by number, with the words that overlap in a few words. Search the whole of FACTS for it, not only your chunks: grep for the claim's distinctive names (a test, a class, a method, a row number, a term). Say "none found" where the search finds none, and give the words that you searched for.
5. **What today's checks say of the claim,** from the scout's file and from the list of stale claims: sound, false today, beyond its support, cites a thing that is gone, or unsettled. Copy the finding's source. Judge nothing new.
6. **The entry's shape,** one of: one subject (its claims share one subject label); several subjects (give the labels); mostly a defect; mostly history or plan; about how the project works and not about the tree. And one line: the claim that the entry's bold title states, and whether the body's claims serve that title.

## The form of your file

One file for each chunk: `explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-map/claims-<chunk>.md`. It starts with a header comment that says in one sentence what it is. Then one block for each entry, headed by its number and the first words of its title, with the six points above as short lists. Keep a claim to one sentence. Do not copy the entry's text. At the end of the file, three lists: the subject labels that you used, each with its entries; the pairs or groups of entries that overlap; and the entries that your search could not settle.

Commit each file yourself, by its path, with the skill's footer, and push the three refs as `references/committing.md` of the `fortress-repo` skill says for work on `main`. The folder is an evidence folder, so it needs no INDEX line.

Your final message, at most 12 lines: the files and their commits; the number of entries; how many have one subject and how many have several; the number of claims by kind; the largest groups of overlap; and what you could not settle.

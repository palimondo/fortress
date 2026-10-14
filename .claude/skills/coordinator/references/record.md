# Keeping the record

How workers read the record, and edit it when a brief asks, is `fortress-repo`'s records part.

**history**
: `FACTS-history.md` or `POSITIONS-history.md`. Under each number, one block per change: a provenance line (the time, the kind of change, the report section, the commit, who, why) and the line as it stood before.

**pointer**
: Another entry's number in the sentence that needs it: "It builds P-48."

**pass**
: Your rewrite of what a worker wrote into entries of the form below.

## What an entry is

An entry lets a worker or you act right without opening the report, and says when the report is needed. Its number is permanent and never reused. Its title and text are rewritten freely, since the number is the key.

- A FACTS entry holds, after its number and a bold title that states the fact: the fact as it stands now; what it means for the work, such as what it blocks or which row or decision it bears on; the test that gates it, or its source; the decision it builds, by number; and the report section that holds the detail.
- A POSITIONS entry holds, after its number and a bold title: what the curator decided about the project, and why, in one or two sentences; what it means for the work; and what is still to build, with its PLAN item. It lists no FACTS entries: `P-48+` finds them.
- Quote the curator only where the exact words are the decision. Otherwise condense the words into the position, keeping the part of the rule that cuts. Check the condensed text against the words before you write it. The dictated words go to the history, with their time.
- A count that each landing changes has one entry with its current value, what it counts, the kinds with the largest share, and how to read a move. Other entries give its number. A count from one measurement says so.
- An entry holds one claim that can be kept up to date on its own, with its conditions, exceptions and evidence. Split an entry when its claims answer different questions and change apart. Before you split, look for an entry that already holds the claim, and move the text there.
- If several entries together establish a conclusion that workers keep working out again, state it once, in the entry that owns its subject, with pointers to the others. Add a new entry only if no entry owns it. Keep a reading that nobody has checked in a report.
- Keep an entry near 600 characters. This is a check, not a cap, and no reason to split: an entry may pass it if a question below keeps a sentence.
- Write halfway to ASD-STE100.

Ask of each sentence, and act on the answer:

1. Would the reader do otherwise without it? Keep it.
2. Would the reader misread another sentence without it? Keep it.
3. Does it tell how the fact came about: a date, a batch, a correction? Move it to the history.
4. Is it detail needed only while doing the work: a line number, a list of sites, a timing? Leave it in the report, and name the section.
5. Does another entry or a skill say it? Give that entry's number, or the skill's part.
6. Can a reader new to the project follow every word? Name the kind of each count.

Before you write or check the first entries of a consolidation, read the five worked examples: `facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`, a large read.

## Reading and writing

- `git log -S'F-87' --oneline -- explorations/coordinator/FACTS.md` lists the commits that touched an entry.
- To read a history in depth, or a report's passage, send a Sonnet scout. The provenance lines tell it where to dig.
- `record.py`'s header gives its usage. `add`, `set`, `merge`, `remove` and `apply` write; each needs `--from PATH#HEADING` or `--note WHY`. The tool stamps the time and copies the earlier line to the history.
- Before every commit, run `record.py check --base <the commit before your edits>`. It shows that nothing was lost, and reports each entry over 600 characters.
- Commit the record file and its history together.
- Write a decision into POSITIONS in the next commit after the curator states it. A proposal of yours enters only at the curator's yes.
- The record is public and names models on purpose. Hold nothing back from it for that.

## The pass

Run the pass when a worker finishes, and before the next boot or batch reads FACTS. In a batch, the commit stage runs it, with this part quoted in its prompt. After a lone worker, you run it.

1. Write each new fact as an entry, or rewrite in place the entry that it changes. A rung writes its entries in a file `record.md` in its worktree, and the gather folds them in with `record.py apply`.
2. Give each change its provenance: the report section, the commit, and why.
3. Check each entry against its source, with bounded `grep`s:
   - The cited report section holds what the entry left out.
   - The entry keeps the source's scope: the path (walk or the compiled path), the call form, the range of values and the conditions. Ask: does the entry let a reader conclude more than the evidence shows?
   - If a behaviour changed, each other current entry that states it is updated, or says how it differs.
4. Report each entry over 600 characters, with the question that keeps its extra sentence.

Run the same pass on POSITIONS at each landing, and when the curator replaces a decision.

## A consolidation

A consolidation runs the pass over whole sections. Run it on FACTS before each batch launches, since the batch's workers read it.

- Split each section into chunks of 20 to 32 entries.
- For each chunk, a Sonnet scout gathers each entry's report sections, its commits and the curator's dated words.
- An Opus writer reads this part, the chunk and the scout's file, and writes an apply file. It runs `apply` and `check --base` in its own worktree.
- You apply each file on `main`, run `check --base`, commit and push.
- Check the new entries with Opus workers, not a Fable review: a Fable review tends to keep each entry as it was.
- Have a fresh Opus worker answer a small quiz of decisions from the new entries, on the records at hand, without the curator. The decisions must stay as good, and the worker must follow the pointers when needed. If something critical is lost, find the middle ground entry by entry.

## INDEX and the gap ledger

- Give each new note under `explorations/` one line in INDEX, from its header comment's first sentence.
- The gap ledger keeps its rows in topic sections. A row keeps its number for good. `explorations/coordinator/tools/ledger.py` is the only way to write it. Other views, such as `explorations/apl/lessons.md`, are derived from it.
- Split a rewrite of the ledger among small workers, each with a slice of rows that it can hold. Run a duplicate search first, as its own step.
- Ask the curator before you regroup the ledger's rows or derive its views again.

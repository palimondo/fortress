# Keeping the record

FACTS and POSITIONS are what you and the workers act on. This part holds the form of an entry, how you write it, and the pass that turns a worker's text into entries. How workers read the record, and edit it when a brief asks, is the `fortress-repo` skill's records part.

**history**
: `FACTS-history.md` or `POSITIONS-history.md`. Under each number it holds one block per change: a provenance line (the time, the kind of change, the report section, the commit, who, why) and the line as it stood before.

**pointer**
: Another entry's number in the sentence that needs it: "It builds P-48."

**pass**
: Your rewrite of what a worker wrote into entries of the form below.

## What an entry is

An entry lets a worker or you act right without opening the report, and says when the report is needed. Its number is permanent and never reused. Its title and text are rewritten freely, since the number is the key.

- A FACTS entry holds, after its number and a bold title that states the fact: the fact as it stands now; what it means for the work, such as what it blocks or which row or decision it bears on; the test that gates it, or its source; the decision it builds, by number; and the report section that holds the detail.
- A POSITIONS entry holds, after its number and a bold title: what the curator decided about the project, and why, in one or two sentences; what it means for the work; and what is still to build, with its PLAN item. It lists no FACTS entries: `P-48+` finds them.
- Quote the curator only where the exact words are the decision. Otherwise condense the words into the position, keeping the part of the rule that cuts. Check the condensed text against the words before you write it. The dictated words go to the history, with their time.
- A count that each landing changes has one entry with its current value, what it counts, the kinds that lead, and how to read a move. Other entries give its number. A count from one measurement says so.
- Keep an entry near 600 characters. This is a check, not a cap: an entry may pass it if a question below keeps a sentence. Name that reason in the pass's report.
- Write halfway to ASD-STE100. Say what each number counts.

Ask of each sentence, and act on the answer:

1. Would the reader do otherwise without it? Keep it.
2. Would the reader misread another sentence without it? Keep it.
3. Does it tell how the fact came about: a date, a batch, a correction? Move it to the history.
4. Is it detail needed only while doing the work: a line number, a list of sites, a timing? Leave it in the report, and name the section.
5. Does another entry or a skill say it? Give that entry's number, or the skill's part.
6. Can a reader new to the project follow every word? Name the kind of each count.

Before you write or check the first entries of a consolidation, read the five worked examples: `facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`, a large read.

## Reading an entry

- `facts-extract.sh F-87` prints an entry. `F-87+` adds the entries it points to and those that point to it. `history:F-87` prints its history.
- `index:WORDS` searches INDEX.
- `git log -S'F-87' --oneline -- explorations/coordinator/FACTS.md` lists the commits that touched an entry.
- To read a history in depth, or a report's passage, send a Sonnet scout. Its provenance lines tell the scout where to dig.

## Writing an entry

Write FACTS and POSITIONS only with `explorations/coordinator/tools/record.py`. Its header gives the usage.

- `add`, `set`, `merge`, `remove` and `apply` write. Each needs `--from PATH#HEADING` or `--note WHY`. The tool stamps the time and copies the earlier line to the history.
- `record.py check --base <commit>` shows that nothing was lost since that commit. Run it before every commit. It also reports each entry over 600 characters.
- Commit the record file and its history together, then push.
- Write a decision into POSITIONS in the next commit after the curator states it. A proposal of yours enters only at the curator's yes.
- The record is public and names models on purpose. Hold nothing back from it for that.

## The pass

Run the pass when a worker finishes, and before the next boot or batch reads FACTS. In a batch, the commit stage runs it, with this part quoted in its prompt. After a lone worker, you run it.

1. Write each new fact as an entry, or rewrite in place the entry that it changes. Workers in a batch write their entries in `record.md`, and the gather folds them in with `record.py apply`.
2. Give each change its provenance: the report section, the commit, and why.
3. Check with one bounded `grep` that the cited report section holds what the entry left out.
4. Run `record.py check --base`, and report each entry's size and each one over 600 characters with its reason.

Run the same pass on POSITIONS at each landing, and when the curator replaces a decision.

## A consolidation

A consolidation runs the pass over whole sections. Run it on FACTS before each batch launches, since the batch's workers read it.

- Make a chunk of each section, 20 to 32 entries.
- For each chunk, a Sonnet scout gathers each entry's report sections, its commits and the curator's dated words.
- An Opus writer reads this part, the chunk and the scout's file, and writes an apply file. It runs `apply` and `check --base` in its own worktree.
- You apply each file on `main`, run `check --base`, commit and push.
- Check the result with a small quiz on the records at hand, without the curator: decisions stay as good, and a reader follows the pointers when needed. If something critical is lost, restore it entry by entry.

## INDEX and the gap ledger

- Give each new note under `explorations/` one line in INDEX, from its header comment's first sentence.
- The gap ledger is one file, with its rows in topic sections. A row keeps its number for good. `explorations/coordinator/tools/ledger.py` is the only way to write it. Other views, such as `explorations/apl/lessons.md`, are derived from it.
- Split a rewrite of the ledger among small workers, each with a slice of rows that it can hold. Run a duplicate search first, as its own step.
- Ask the curator before you regroup the ledger's rows or derive its views again.

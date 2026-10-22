# Keeping the record

How workers read the record, and edit it when a brief asks, is `fortress-repo`'s records part.

**history**
: `FACTS-history.md` or `POSITIONS-history.md`. Under each number, one block per change: a provenance line (the time, the kind of change, the report section, the commit, who, why) and the line as it stood before.

**pointer**
: Another entry's number in the sentence that needs it, with a few words on its subject: "It builds P-48, on a type parameter that a call does not fix."

**pass**
: Your rewrite of what a worker wrote into entries of the form below.

## What an entry is

An entry reads on its own. A reader who knows the language, or can look it up in the `fortress-repo` skill, can tell what it says without the conversation or the batch behind it. The entry lets a worker or you act right without opening the report, and says when the report is needed. Its number is permanent and never reused. Its title and text are rewritten freely, since the number is the key.

- A FACTS entry holds, after its number and a bold title that states the fact: what is established now, and under which conditions; what it means for the work, such as what it blocks or which row or decision it bears on; its evidence: the test that gates it, or its source, and whether it was observed, read in the code or inferred; the decision it builds, by number and subject; and the report section that holds the detail.
- A POSITIONS entry holds, after its number and a bold title: what the curator decided about the project, and why, in one or two sentences; where it applies; and what it requires of the work. It may point to a fact that it rests on, in the sentence that needs it. `P-48+` finds every fact that points to it.
- POSITIONS holds only the curator's decisions. A choice that a worker made and landed without the curator's word is a fact about the tree. Its FACTS entry says that a worker chose it, and its review-queue item names that entry.
- An entry states the present, or what holds for all time. It holds no plan and no status: no state words such as "Built." or "Still to build:", no PLAN phase or item, no review-queue item, and no words that it waits for the curator's review. PLAN and the review queue name the entries that their items concern.
- If the tree does not yet do what a decision or the team's design asks, the missing part is a row of the gap ledger. The entry may name it as "row N", with a few words on what the row holds. In an entry, "row N" always names a row of the gap ledger.
- A pointer that stays in an entry carries a few words on what it holds, such as a ledger row's subject. A bare list of numbers goes to the history.
- A handle that only made sense in a past conversation, such as "answer 9", goes to the history.
- Quote the curator only where the exact words are the decision. Otherwise condense the words into the position, keeping the part of the rule that cuts. Check the condensed text against the words before you write it. The dictated words go to the history, with their time.
- A count that each landing changes has one entry with its current value, what it counts, the kinds with the largest share, and how to read a move. Other entries give its number. A count from one measurement says so.
- An entry holds one claim that can be kept up to date on its own, with its conditions, exceptions and evidence. Split an entry when its claims answer different questions and change apart. Before you split, look for an entry that already holds the claim, and move the text there. After a split, grep the record for the old number, and repoint each pointer that meant the claim that moved.
- If several entries together establish a conclusion that workers keep working out again, make it a sentence of the entry that owns its subject, with pointers to the entries it rests on. The pass updates it when one of them changes. Add a new entry only if no entry owns it. Leave a conclusion nobody has checked in its report, out of the entries.
- Keep an entry near 600 characters. This is a check, not a cap, and no reason to split: an entry may pass it if a question below keeps a sentence.
- Write halfway to ASD-STE100.

Ask of each sentence, and act on the answer:

1. Would the reader do otherwise without it? Keep it.
2. Would the reader misread another sentence without it? Keep it.
3. Does it tell how the fact came about: a date, a batch, a correction? Move it to the history.
4. Is it detail needed only while doing the work: a line number, a list of sites, a timing? Leave it in the report, and name the section.
5. Does another entry or a skill say it? Give that entry's number, or the skill's part.
6. Can a reader new to the project follow every word? Name the kind of each count.

In a consolidation of FACTS, judge each entry by six checks. Mark each one pass, fail, or unresolved where evidence is still needed, and quote the passage that fails:

- Scope: the title and the text agree on the path, the conditions and the limits, and claim no more than the evidence shows.
- Present meaning: a reader can tell the current property, or a measurement bounded to its day, without rebuilding a batch's work.
- Evidence: the cited support exists and holds the claim, and the entry states the kind of its evidence and its uncertainty.
- Comprehension: a reader can restate the fact and what it means. Subjects, referents and terms are plain.
- Ownership: the entry has one subject. No repair history or copied count hides it.
- Consistency: entries on the same subject agree, or state their different scopes or their conflict.

An entry that fails scope, evidence or consistency is not kept as it stands: reword it to what its support holds, or investigate where the support is unresolved. A fail of comprehension or ownership asks for a rewrite. Give no score: good prose does not make up for an unsupported claim. Then give the entry one disposition:

- keep: every check passes;
- reword: the meaning holds, but the wording or the stated scope fails;
- reorganize: move detail out, merge the entry into its owner, or split it;
- investigate: the support or the consistency is unresolved. Settle that narrow question before any new wording, and do not delete the fact meanwhile.

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

The pass owns each entry's final wording. A rung writes its findings as draft entries: the claim, its conditions, its evidence and what it means.

1. Write each new fact as an entry, or rewrite in place the entry that it changes. A rung writes its entries in a file `record.md` in its worktree, and the gather folds them in with `record.py apply`.
2. Give each change its provenance: the report section, the commit, and why.
3. Check each entry against its source, with bounded `grep`s:
   - The cited report section holds what the entry left out.
   - The entry keeps the source's scope: the path (walk or the compiled path), the call form (a dotted method call against a top-level call), the range of values and the conditions. Ask: does the entry let a reader conclude more than the evidence shows?
   - If a behaviour changed, grep FACTS for it, linked or not. Each entry that states it is updated, or says how it differs.
4. Cut any plan or status from each entry (above). If the cut text named a PLAN item or a review-queue item, check that the item names the entry.
5. Report each entry over 600 characters, with the question that keeps its extra sentence.

Run the same pass on POSITIONS at each landing, and when the curator replaces a decision.

## A consolidation

A consolidation runs the pass over whole sections. Run it on FACTS before each batch launches, since the batch's workers read it.

- Split each section into chunks of 20 to 32 entries.
- For each chunk, a Sonnet scout gathers each entry's report sections, its commits and the curator's dated words.
- An Opus writer reads this part, the chunk and the scout's file, and writes an apply file. It runs `apply` and `check --base` in its own worktree.
- You apply each file on `main`, run `check --base`, commit and push.
- Have Opus workers check each new entry by the pass's step 3. Run no Fable review of the entries.
- Have a fresh Opus worker answer a small quiz of decisions from the new entries, on the records at hand, without the curator. The decisions must stay as good, and the worker must follow the pointers when needed. If something critical is lost, find the middle ground entry by entry.

## The consolidation tools

Three Workflow scripts make the record and the worker skill readable again when they drift. Each one's README says how to run it and what to do with its output. Put the open questions of their runs on the review queue.

- The mining workflow finds where each POSITIONS entry came from: the curator's words, or an agent's summary or default. Run it on the entries that it has not traced, before the clarity workflow rewrites them. Its README: `explorations/coordinator/positions-audit/README.md`.
- The clarity workflow rewrites POSITIONS or FACTS entries so that each reads on its own. For FACTS, it first judges every entry by the six checks of "What an entry is" (scope, present meaning, evidence, comprehension, ownership and consistency), and rewrites only those marked reword or reorganize. Run it when entries no longer read on their own. Its README: `explorations/coordinator/tools/record-clarity/README.md`.
- The orientation workflow writes `fortress-repo`'s revival part, the short account of how revived Fortress differs from the original, which every worker reads whole. Its consolidate mode rewrites the whole part. Run it when a cold read or the regression quiz shows that the part no longer reads whole, or when an update cannot keep it within the README's budget. Its update mode runs after each landing (`references/batch.md`, "The landing"). Its README: `explorations/coordinator/tools/orientation/README.md`.

## INDEX and the gap ledger

- Give each new note under `explorations/` one line in INDEX, from its header comment's first sentence.
- The gap ledger keeps its rows in topic sections. A row keeps its number for good. `explorations/coordinator/tools/ledger.py` is the only way to write it. Other views, such as `explorations/apl/lessons.md`, are derived from it.
- Split a rewrite of the ledger among small workers, each with a slice of rows that it can hold. Run a duplicate search first, as its own step.
- Ask the curator before you regroup the ledger's rows or derive its views again.

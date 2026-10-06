<!-- The lenses the curator applied while reviewing the fortress-repo skill on its review page (2026-10-05 and 2026-10-06, about 35 comments), each with the issues it found and the fix that satisfied him; written so that a writer agent can apply them to a whole skill at once. -->

# How the curator reads a skill: eight lenses

Each lens is a question the curator asked of a sentence, a rule or a list. Under each: what he found, and the fix he accepted.

## 1. Can a newcomer decode every word?

Words from the record and the batch practice mean nothing to a reader without FACTS, POSITIONS and INDEX in context.

- "stop" for a point the brief wants reviewed: read as a condition that stops the worker. Fix: "points to report".
- "home" of a defect: undefined. Fix: "the test or ledger row that records it".
- "corpus": odd. Fix: "test suite" or "test folder".
- "source" as a verb: unclear. Fix: write the command, `source env.sh`.
- "area-" prefix on part names: noise. Fix: dropped.
- "Change one variable per step": too compressed. Fix: "When you probe or debug, change one thing at a time, so that each result has one cause."
- "switch-over" named without saying what happens at it. Fix: say what happens.

Fix pattern: the plain word, the literal command, or one clause that says what the thing is.

## 2. Can the agent act on it?

- "The curator decides what is committed": an agent cannot ask the curator. Fix: the brief is the one authority; the rule says "your brief says".
- "Do not ask the curator anything": read as a rule against the mechanism that brings questions to him. Fix: say what to do, "list it as a decision not taken, with its alternatives; the reader of your report brings it to the curator".
- "Look for its result on record": an unbounded search. Fix: reuse what the brief cites or your own work ran.
- The report rule read as an order to every worker to write a document. Fix: the report is the named file or the final message; the items are conditional.

Fix pattern: an instruction the reader can carry out from its own context, with its bounds; a positive instruction where a prohibition hides the mechanism.

## 3. Does it agree with the rest of the skill and with his positions?

- Commit authority stated three ways (the curator, the brief, the default). Fix: one authority, the brief, everywhere.
- "Take the specification as the standard" against his position that the team's later sources outweigh earlier ones. Fix: "If the team's own sources disagree, follow the later one ... the specification included."
- Test first "for every edit under the original tree" made agents unsure about specification-only changes. Fix: "every edit of source code".
- "Run a whole suite" rules said one thing in the rules and another in the part.

Fix pattern: one rule per subject, stated once, matching POSITIONS; search the whole skill for the other statements of it.

## 4. Does the reader need it here?

- The definition of "brief": every agent knows its instructions; each use says what the brief decides. Dropped.
- The HANDOVER.md and ZIP rule: history from the session's first upload. Dropped.
- The model-identifier rule: the system prompt carries it. Dropped.
- Part pointers in the terms: the parts list already routes. Dropped.
- The checker count and the distance: the ladder's metrics, run by the workflow's gate; not every worker's business. Moved out; the coordinator skill names them.
- Slogan lead-ins (the titles of his positions copied in): a worker cannot act on a slogan. Dropped.

Fix pattern: drop what the reader already has (system prompt, its own nature, another part), what is history, and what belongs to another layer (the workflow, the coordinator).

## 5. Is the reason there where the rule alone could be misjudged?

- "Do not pipe ant through tail": he could not recall why. Fix: one clause from the source, "if the Bash tool's time limit stops the command, it shows nothing".
- "Do not commit scratch": the `.txt` rename incident. Fix: name what scratch is, forbid the rename, and give the reason in a clause ("each agent's transcript keeps how the work was done").

Fix pattern: one short clause, taken from the source (`sources.md`), never from memory.

## 6. Is it in the register, about halfway to ASD-STE100?

- One sentence carrying a list, a quoted title and a pointer: a regression. Fix: three short sentences, the detail left in the part.
- "tail" said twice, "run" twice: repetition. Fix: "it".
- An essay where a sentence would do; a compound sentence where two would do.
- A rewrite that grew. He wants the same length or shorter.

Fix pattern: one instruction per sentence, imperative, condition before instruction, short; no list folded into a sentence; no repeated noun where a pronoun is clear; detail in the part, the rule in SKILL.md.

## 7. Does the structure follow the reader?

- The parts list is in no order a newcomer meets things. Fix: order it as work in the repository goes.
- A term defined where it is first used, and introduced with its context first.

## 8. Where does this come from, and does its purpose still hold?

He asked the origin of "one variable per step", the no-rerun rule, the tail rule and the scratch rule. Each answer came from `sources.md` and the record, and each rule was then reworded to its purpose: kept, bounded, given its reason, or dropped.

Fix pattern: read the rule's source; keep the purpose; state it so that the purpose is visible.

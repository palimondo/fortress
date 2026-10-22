<!-- The skill writer's task for the POSITIONS clarity pass, pilot of ten entries (2026-10-22): rewrite the entries so that a reader who knows the language but not the conversation can tell what the curator decided; meaning unchanged. -->

This task is not a skill edit. It applies your standing order's register to ten entries of `explorations/coordinator/POSITIONS.md`, the record of the curator's decisions.

## The problem

An audit has just checked each POSITIONS entry against the curator's own messages, and proposed corrections. The curator cannot re-approve the corrected entries, because their wording is too compressed. They lean on handles, short forms and phrasing that make sense only to someone who was in the conversation that produced them. Rewrite the ten entries so that a reader can tell, without that conversation:

- what the curator decided;
- where it applies, and its limits;
- what it requires a worker to do;
- what is still unfinished.

The reader knows the language, or can look its terms up in the `fortress-repo` skill. Keep the meaning.

## Read first

- The standard for this work: `explorations/reviews/revival-record-synthesis.md`, the sections "P45: fidelity and comprehensibility are separate checks" and "For Fable: rewrite positions before consolidating Revival". Follow it.
- What an entry holds: `.claude/skills/coordinator/references/record.md`, "What an entry is".
- Your entries: `explorations/coordinator/positions-audit/clarity/evidence/pilot/entries.md`. For each entry it gives the text now, the text the audit proposes, and the evidence files, with line numbers: the scout's report on the curator's messages behind the entry, with a block of his exact quotes, and the audit's judgement, corrections and takeaway sections. Read the evidence for each entry before you write it.

## How to write each entry

1. Start from the audit's proposed text. Its meaning is what the curator is about to approve. Where the audit's corrections file says a part waits on his answer, keep that part as the audit proposes it, and say so.
2. The bold title states the decision in plain words.
3. Then give its scope and its exact conditions: which programs, types, paths or tools it covers, and what it excludes. Keep every condition that limits the decision.
4. Then give the reason, after "Why:", only if the entry has one from the curator or from the question that he accepted.
5. Then give the state, apart from the decision: "Built.", or "Still to build:" with where the work is tracked. Say in words what each pointer names, such as "gap-ledger row 442" or "P-77, the rule on ranges".
6. Name each thing. Write "microGPT, the model program" where an entry says "the model". Say which call or which checker, when a sentence has two of them. Use no handle that makes sense only in the conversation, such as "answer 9", "ask 3", "item 48" or "decision E", unless a skill defines it.
7. Do not add a claim, a reason or a scope that the sources do not hold. Do not make a claim stronger or broader. Where the sources leave the meaning open, keep the audit's wording for that part, and write a question for the curator.
8. Your standing order says that a rewrite is never longer than the text it replaces. Here clarity comes first: keep each entry near 600 characters as a check, not as a cap.
9. Provenance goes in the apply file's note line, not in `sources.md`.

## Your files

Write them in `explorations/coordinator/positions-audit/clarity/evidence/pilot/`, and commit them:

- `proposals.md`, with a header comment of one sentence. For each entry:
  - the clean entry, first, as it would stand in POSITIONS;
  - "Meaning: unchanged", or each change of meaning that you could not avoid, with its source;
  - the source of each sentence: the curator's message time, or the evidence file and line;
  - any question for the curator.
- `clean.txt`: the clean entries only, one per line, as POSITIONS would hold them. A cold reader gets this file alone.
- `proposals.apply`: for each entry, its line as POSITIONS would hold it, then one indented line `  by: the clarity pass; note: WHY`. The coordinator tests it with the record's tool.

Your report, as your standing order's section 6 asks, adds one line per entry: what made it hard to read, and what you did.

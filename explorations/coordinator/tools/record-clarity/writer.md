<!-- The clarity workflow's writer brief: rewrite record entries (POSITIONS or FACTS) so that a reader who knows the language but never saw the work behind them understands each one; meaning unchanged. From the clarity pilot of 2026-10-22 (positions-audit/clarity/). -->

You are the writer of the clarity pass in the Fortress revival repository, `/home/user/fortress`. First read your standing brief, `explorations/coordinator/skill-writer-brief.md`, sections 1 to 4, and follow them: the register and the writing principles. Its parts on skill files, on being a resumed session and on committing do not apply here: you write record entries, and you commit nothing.

Your launch message gives your kind (`positions` or `facts`), your entries and your folder. Change no tracked file but the files in your folder.

## The problem

The record is the project's memory, under `explorations/coordinator/`. `POSITIONS.md` holds the curator's decisions; the curator is the person in charge of the project. `FACTS.md` holds what is established about the tree. Their entries are too compressed: they lean on handles, short forms and phrasing that make sense only to someone who was in the conversation or the batch that produced them. Rewrite your entries so that a reader who knows the language, or can look its terms up in the `fortress-repo` skill, can tell without that history:

- for a position: what the curator decided, where it applies and its limits, what it requires a worker to do, and what is unfinished;
- for a fact: what is established and under which conditions (path, library, call form, values), what it means for the work and its limits, and its evidence.

Keep the meaning.

## Read first

- The standard: `explorations/reviews/revival-record-synthesis.md`. For positions, its sections "P45: fidelity and comprehensibility are separate checks" and "For Fable: rewrite positions before consolidating Revival". For facts, "For Claude: assess all FACTS, rewrite only failing entries", its entry schema above all.
- What an entry holds: `.claude/skills/coordinator/references/record.md`, "What an entry is".
- Your entries and their evidence:
  - positions: `python3 -I explorations/coordinator/tools/record-clarity/entries.py N...` prints each entry and the provenance audit's evidence: the scout's report on the curator's messages behind it, with his exact quotes, and the audit's judgement, corrections and takeaway sections. Read the evidence before you write an entry.
  - facts: `assessment.md` in your folder holds the assessor's table and, for each entry you are given, what fails and why. `explorations/coordinator/tools/facts-extract.sh 'F-N+'` prints an entry with its linked entries, and `'history:F-N'` its history. Read the report section each entry cites before you change a claim.
  - findings: if your folder holds `findings.md`, a review found faults in some of your entries, each with its ground. Correct each sentence that a finding names from its ground, opened at its source: there, and only there, the meaning changes. Change nothing that no finding names, and let an entry grow only by what its corrections need. Where a finding's only ground is a reviewer's reasoning, or it needs the curator's word, keep the text and write a question for the curator.

## How to write each entry

1. The bold title states the decision or the fact in plain words, no broader than the body.
2. Then its scope and its exact conditions. Keep every condition, exception and limit. A shorter sentence must not lose one.
3. For a position, the reason after "Why:", only if the curator gave one or accepted it in the question, or a finding in `findings.md` gives it with its ground in the team's texts, library or code. For a fact, its evidence: the test, measurement, source reading or report section, and whether it was observed, read in the code or inferred.
4. Keep the state apart: "Built.", or "Still to build:" in one line with where the work is tracked. Keep such lines as they are; do not move them out.
5. Name each thing. Say which call, which checker, which library, which path, when a sentence has two of them. Use no handle of a past conversation or batch ("answer 9", "ask 3", "item 48", "rung C", "decision E") unless a skill defines it.
6. **Pointers.** For each pointer (another entry, a gap-ledger row, a PLAN item, a report), decide first whether it belongs in the entry. If it stays, give it a few words on what it holds, so that a reader can decide whether to follow it without loading it. If it is only provenance, move it to the apply file's note line, where a bare reference is fine.
7. **Concepts.** Define a concept in the entry only if it belongs to this entry alone. List any other concept that a reader needs in `concepts.md` in your folder: the term, the entries that use it, and where it should be defined for every worker (the `fortress-repo` core, an area part, or the short orientation that will replace the revival part). The revival part is being rewritten: do not lean on it.
8. Do not add a claim, a reason or a scope that the sources do not hold. Do not make a claim stronger or broader. Where the sources leave the meaning open, keep the current wording for that part and write a question for the curator.
9. For a fact: keep a historical measurement only if it is stated as that measurement; move repair chronology to the history; link a count that changes at every landing to the entry that owns it. A fact may record an implementation choice made at a default; say so, and never as the curator's ruling.
10. Keep each entry near 600 characters as a check, not a cap. Clarity comes first.

## Your files, in your folder

- `proposals.md`, with a header comment of one sentence. For each entry: the clean entry first, as the record would hold it; then "Meaning: unchanged", or each change of meaning you could not avoid, with its source; then the source of each sentence; then any question for the curator.
- `clean.txt`: the clean entries only, one per line. A cold reader gets this file alone.
- `proposals.apply`: each entry's line, then one indented line `  by: the clarity pass; note: WHY`, with the provenance pointers that left the entry. The coordinator applies it with `record.py`.
- `concepts.md`, as in step 7.

Your final message: the files' paths, and one line per entry on what made it hard to read and what you did.

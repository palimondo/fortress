<!-- The clarity pass's writer brief (2026-10-22): rewrite POSITIONS entries so that a reader who knows the language but not the conversation understands what the curator decided; meaning unchanged. -->

You are an Opus writer in the Fortress revival repository (`/home/user/fortress`). Change no tracked file but the files this brief names. Commit nothing.

**The problem.** `explorations/coordinator/POSITIONS.md` records the decisions of the curator, the person in charge of the project. An audit has just checked each entry against the curator's own messages and proposed corrections. The curator cannot re-approve the corrected entries, because their wording is too compressed: they lean on handles, short forms and phrasing that make sense only to someone who was in the conversation that produced them. Your job is to rewrite the entries named in your launch message so that a reader who knows the language, or can look its terms up in the skills, but never saw the conversation, can tell what the curator decided, where it applies, what it requires, and what is still unfinished. The meaning stays as it is.

**Read first.**
- The reviewer's brief for this work: `git show origin/astra/record-keeping-review:explorations/reviews/revival-record-synthesis.md`, the sections "P45: fidelity and comprehensibility are separate checks" and "For Fable: rewrite positions before consolidating Revival". It is your standard; follow it.
- The register: `explorations/coordinator/skill-writer-brief.md`, section 1, and `explorations/reviews/skills-writing-principles.md`.
- What an entry is: `.claude/skills/coordinator/references/record.md`, "What an entry is".

**Your entries.** For the numbers in your launch message, run `python3 -I explorations/coordinator/positions-audit/clarity/entries.py N...`. It prints each entry's text now, the text the audit proposes, and its evidence: the scout's report on the curator's messages behind it (with a block of his exact quotes), and the audit's judgement, corrections and takeaway sections. Read them. The audit's proposed text is the meaning to keep: the curator is about to approve it. Where the audit's corrections file says a change waits on his answer, keep that part as the audit proposes it and say so.

**How to write each entry.**
1. The bold title states the decision in plain words.
2. Then its scope and its exact conditions: which programs, types, paths (walk, the interpreter; the compiled path) or tools it covers, and what it excludes. Keep every condition that limits the decision. A shorter sentence must not lose one.
3. Then the reason, marked "Why:", only if the entry has one from the curator or from the question he accepted.
4. Then the state, kept apart from the decision: "Built.", or "Still to build: ..." in one line with where the work is tracked (a PLAN phase, a gap-ledger row). Say in words what each pointer is: "gap-ledger row 442", "PLAN, phase 4 (the natives)", "P-77, the rule on ranges".
5. Name each thing. Write "microGPT, the model program" where an entry says "the model"; say which call, which checker, which library, when a sentence has two of them. No handle that only made sense in the conversation: no "answer 9", "ask 3", "item 48", "decision E", "rung C", unless the term is defined where it is used or by a skill.
6. Do not add a claim, a reason or a scope the sources do not hold. Do not make a claim stronger or broader. Where the sources leave the meaning open, keep the audit's wording for that part and write a question for the curator.
7. Keep near 600 characters; it is a check, not a cap. Clarity wins over length.

**Your files**, in `explorations/coordinator/positions-audit/clarity/pilot/`:
- `proposals.md`: for each entry, the clean entry first, as it would stand in POSITIONS; then "Meaning: unchanged", or each change of meaning that you could not avoid, with its source; then the source of each sentence (the curator's message time, or the evidence file and line); then any question for the curator. Write it as you go, and revise it.
- `clean.txt`: the clean entries only, one per line, as POSITIONS would hold them. A cold reader gets this file alone.
- `proposals.apply`: the entry lines for `record.py apply`, each followed by an indented provenance line `  by: the clarity pass; note: WHY`. Test it: copy `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/positions-audit/full/combined/root/` to a scratch folder of your own under `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/clarity/`, keeping its symlinks, and run `explorations/coordinator/tools/record.py apply` and `check --base HEAD` there with `--root`. Never on the real record.

Your final message: the three files' paths, and one line per entry on what made it hard to read and what you did.

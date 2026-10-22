<!-- The skill writer's task of 2026-10-22: document the record's consolidation tools and the rules the curator set for record entries and for the revival part's upkeep, in the coordinator skill and the writer's and cold reader's briefs. -->

# Your task: the record's consolidation tools, in the coordinator skill

The curator set new rules for record entries and built three tools to keep the record and the worker skill readable. He wants them in the skills, so that a later session can run them again when the record drifts. Change the files below; the meaning of every other rule stays.

## Read first

- The three tools' READMEs: `explorations/coordinator/positions-audit/README.md` (the mining workflow: where each POSITIONS entry came from), `explorations/coordinator/tools/record-clarity/README.md` (the clarity workflow: entries rewritten to read on their own, with a writer stream, a cold read, a check, a fix round, a second read and a judge), `explorations/coordinator/tools/orientation/README.md` (the orientation workflow: the `fortress-repo` skill's revival part, consolidated once and updated after each landing).
- The standard behind them: `explorations/reviews/revival-record-synthesis.md`, above all "A small change to the existing process", "Addendum: restore a whole-readable worker orientation", "P45: fidelity and comprehensibility are separate checks", "For Claude: assess all FACTS, rewrite only failing entries" (its entry schema, rubric, dispositions, and "Ownership and minimal instruction changes").
- The curator's words: `explorations/coordinator/HELD.md`, the sections "Held from his page comments (2026-10-22)" and "Held in chat (2026-10-22)".

## The changes

1. `.claude/skills/coordinator/references/record.md`:
   - What an entry is: an entry reads on its own: a reader who knows the language, or can look it up in the `fortress-repo` skill, and never saw the conversation or the batch, can tell what it says (for a position: what the curator decided, where it applies, what it requires, what is unfinished; for a fact: what is established, under which conditions, what it means for the work, and its evidence). A pointer that stays carries a few words on what it holds; a bare reference belongs in the history. No handle of a past conversation. "Built." and "Still to build:" lines stay in POSITIONS for now.
   - The FACTS rubric and its four dispositions, in short, with the pointer to Astra's section.
   - The record pass owns an entry's final wording; a rung reports complete findings, not finished prose.
   - A new short section on the three tools: what each is for, when to run it, and its README.
2. `.claude/skills/coordinator/references/skill-rewrite.md` and `references/batch.md`, "The landing": replace the rule that the writer adds to the revival part "each change, with its contradiction and its reason" by Astra's rule ("A small change to the existing process"): after a landing, run the orientation workflow in update mode on the landing's new and changed FACTS entries; it rewrites the affected explanation in place, within the orientation's budget.
3. `.claude/skills/coordinator/references/delegating.md`: every writer is Opus, at the curator's word (Fable's register is the one he dislikes); a long writing pass runs as writer streams (`writer-stream.sh`), each one headless session resumed while its cache is warm, so that a fix round reuses the context that wrote the text; a judge ends each round once, so that a chunk never loops.
4. `explorations/coordinator/skill-writer-brief.md`: close the growth loophole Astra found: new content that a task asks for competes for space where a part has a budget, as the orientation has.
5. `explorations/coordinator/skill-cold-read-brief.md`: add Astra's two questions ("What would you do differently after reading this section?" and "Does this section contain repair history or detail that changes no action and prevents no misunderstanding?").

Keep each part's register, and add no rule that the curator did not set. Write the provenance lines in each skill's `references/sources.md`, dated 2026-10-22. Commit, and report as your standing order asks.

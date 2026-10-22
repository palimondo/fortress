# Rewriting a skill

The skills are written for a reader new to the repository, which every agent is.

**writer**
: Headless session that makes every edit of the project skills, started and resumed by `explorations/coordinator/tools/skill-writer.sh`, with its standing brief `explorations/coordinator/skill-writer-brief.md`.

**cold read**
: Reading of a rewritten part by a worker given only the skill (`explorations/coordinator/skill-cold-read-brief.md`). It flags each passage that would send it wrong or make it search, with its confidence, and each undefined term.

## The method

1. Draft the outline first, with a home for every rule that moves.
2. Have the writer write each part whole, by the seven principles of `explorations/reviews/skills-writing-principles.md`. A rewrite is never longer than the text that it replaces.
3. Run a cold read. Review its flags, and have the writer fix them.
4. Publish the part as a page. The curator reads it whole.
5. Brief each comment of the curator to the writer, rather than rewrite it yourself. A comment marks a problem area: the writer fixes its paragraph or section, with the whole skill in mind.
6. Settle the writer's minor decisions from the record. Ask the curator only where a rule would change its meaning or a new rule would enter.

- Run `skill-writer.sh new <task-file>` for a fresh writer, and `skill-writer.sh resume <task-file>` for its next task, within the hour. Start a fresh writer after a pass over a whole skill, or after your compaction.
- The writer edits and commits the skill files. You push, and keep the review page in step.
- If a part that the curator approved is written again, have a Fable reviewer compare the two. Where it finds a regression, it writes a synthesis of both, never a wholesale revert.
- After a rule enters a skill from the curator's words, check that the skill caught the meaning, by a cold read or a test.
- If a practice that a skill states is in question, have a Sonnet scout check what the workers actually did. If they found a better way, write that way into the skill.
- Keep batch structure out of `fortress-repo`. The workflow or the brief sets which roles exist, and who builds, checks, commits and pushes.
- After each landing, run the orientation workflow in update mode on the landing's new and changed FACTS entries (`references/record.md`, "The consolidation tools"). It rewrites the affected explanation of `fortress-repo`'s `references/revival-changes.md` in place, within the length budget that the workflow's README gives. Have the writer install what its judge accepts. `fortress-repo`'s `SKILL.md` keeps only what does not change from batch to batch.

## The coordinator skill

This skill is rewritten by a heavier method, since the roles that it holds must not be lost:

- Guide lightly, by a few general principles, among them how to talk to the curator in each situation. Write no set of many small rules that may contradict each other.
- Organize the record as the model organizes knowledge by itself, never against it. This is the rewrite's highest risk.
- Name the session's modes first: here, the six parts.
- Run the baseline interview (`explorations/coordinator/baseline-interview/README.md`) for each new model of this session. Keep only what the model would not do by itself.
- Keep a rule if the failure that it guards against is on record. The interview alone drops nothing.
- Write the list of kept rules into the writer's task. The writer writes from scratch, without reading the old skill. A worker then checks the draft against that list, and the cold read follows.

# Rewriting a skill

The skills are written for a reader new to the repository, which every agent is. A skill is a minimal set: it holds only the change to what the model does by itself, and leans on what its training already does well. Each rule states a goal or a principle, with the benefit that it brings, and the reader applies it with judgement. A rule is not a program of steps and conditions. A principle with its reason reaches the cases that it does not name. Many instructions, each for its own case, conflict, and the reader must then settle which one holds.

**writer**
: Headless session that makes every edit of the project skills, started and resumed by `explorations/coordinator/tools/skill-writer.sh`, with its standing brief `explorations/coordinator/skill-writer-brief.md`.

**cold read**
: Reading of a rewritten part by a worker given only the skill (`explorations/coordinator/skill-cold-read-brief.md`). It flags each passage that would send it wrong or make it search, with its confidence, and each undefined term.

## The method

1. Draft the outline first, with a home for every rule that moves.
2. Have the writer write each part whole, by the seven principles of `explorations/reviews/skills-writing-principles.md`. A rewrite is never longer than the text that it replaces.
3. Run a cold read. Review its flags, and have the writer fix them.
4. For the other skills, publish the part as a page; the curator reads it whole. For `fortress-repo`, publish such a page only for a whole part that waits for the curator's yes. A change that waits for no yes gets no page of its own: it lands, and shows on the page of `fortress-repo` changes (step 7), as every landed change does. For the coordinator skill, land the change after its cold read, or put it on the page of skill drafts, as `SKILL.md`, "The curator's role and decisions", says.
5. Brief each comment of the curator to the writer, rather than rewrite it yourself. A comment marks a problem area: the writer fixes its paragraph or section, with the whole skill in mind.
6. Settle the writer's minor decisions from the record. On the other skills, ask the curator only where a rule would change its meaning or a new rule would enter. On the coordinator skill, `SKILL.md`, "The curator's role and decisions", says what waits.
7. After each change to the coordinator skill or to `fortress-repo` lands, have a worker update that skill's page: the page of skill drafts for the coordinator skill, the page of `fortress-repo` changes for `fortress-repo`. The boot note holds both links. Give the worker the page's URL, and have it publish by that URL. For `cloud-container`, have a worker update the page of step 4 of each part that changed, by the URL in the boot note's "Pages". The record-landing workflow runs this update itself for the changes to `fortress-repo` that follow a landing (`references/batch.md`, "The landing", step 4). The page of skill drafts has two sections, and the page of `fortress-repo` changes has only the first:
   - Landed changes: only the landed changes that the curator has not read, so that no change lands unseen while the curator is away. Every item that the curator finds there is new:
     - If the curator says that they have read the page up to an item, the next update removes that item and every item before it.
     - A landed draft that the curator approved gets no item, unless the landing changed the approved words. Then its item shows only that change, against the approved words.
     - Every other item stays until the curator has read it.

     The item takes the form of a landed item in `SKILL.md`, "Pages", and shows the change against the skill's text before it. It gives the change's reason, which may come from a cold read, a hit of the skills' lint, `explorations/coordinator/tools/skills-lint.py`, or the record entry that the orientation workflow, in update mode, took in. The reason says in plain words what was wrong and what the text now says. It never cites a cold read's flag by its code or number, a judge's ruling by its number, or an item of a task by its number.
   - Proposed changes: the items that wait for the curator's yes. An approved item leaves this section when it lands.

- Run `skill-writer.sh new <task-file>` for a fresh writer, and `skill-writer.sh resume <task-file>` for its next task, within the hour. Start a fresh writer after a pass over a whole skill, or after your compaction.
- The writer edits and commits the skill files. You push, except inside the record-landing workflow, which pushes the writer's commits itself.
- If a part that the curator approved is written again, have a Fable reviewer compare the two. Where it finds a regression, it writes a synthesis of both, never a wholesale revert.
- After a rule enters a skill from the curator's words, check that the skill caught the meaning, by a cold read or a test.
- If a practice that a skill states is in question, have a Sonnet scout check what the workers actually did. If they found a better way, write that way into the skill.
- Keep batch structure out of `fortress-repo`. The workflow or the brief sets which roles exist, and who builds, checks, commits and pushes.
- After each landing, the orientation workflow updates `fortress-repo`'s `references/revival-changes.md` (`references/batch.md`, "The landing", step 4). `fortress-repo`'s `SKILL.md` keeps only what does not change from batch to batch.

## The coordinator skill

This skill is rewritten by a heavier method, since the roles that it holds must not be lost:

- In the list of kept rules that goes into the writer's task (below), put how to talk to the curator in each situation, as a principle.
- Organize the record as the model organizes knowledge by itself, never against it. This is the rewrite's highest risk.
- Name the session's modes first: here, the six parts.
- Run the baseline interview (`explorations/coordinator/baseline-interview/README.md`) for each new model of this session. Keep only what the model would not do by itself.
- Keep a rule if the failure that it guards against is on record. The interview alone drops nothing.
- Write the list of kept rules into the writer's task. The writer writes from scratch, without reading the old skill. A worker then checks the draft against that list, and the cold read follows.
- Have every cold reader of this skill read it as the coordinating session, which uses it, not as a worker new to the repository.

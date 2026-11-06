# Rewriting a skill

The skills are written for a reader new to the repository, which every agent is. A skill is a minimal set: it holds only the change to what the model does by itself, and leans on what its training already does well. Each rule states a goal or a principle, with the benefit that it brings, and the reader applies it with judgement. A rule is not a program of steps and conditions. A principle with its reason reaches the cases that it does not name. Many instructions, each for its own case, conflict, and the reader must then settle which one holds.

**writer**
: Headless session that makes every edit of the project skills, started and resumed by `explorations/coordinator/tools/skill-writer.sh`, with its standing brief `explorations/coordinator/skill-writer-brief.md`.

**cold read**
: Reading of a rewritten part by a worker given only the skill (`explorations/coordinator/skill-cold-read-brief.md`). It flags each passage that would send it wrong or make it search, with its confidence, and each undefined term.

## The method

1. Draft the outline first, with a home for every rule that moves.
2. Have the writer write each part whole, by the seven principles of `explorations/reviews/skills-writing-principles.md`. A rewrite is never longer than the text that it replaces.
3. Run a cold read. Review its flags, and have the writer fix them. Only then have a worker put a change that waits for the curator's yes on the page of skill drafts (step 4).
4. Land the change after its cold read, unless it waits for the curator's yes (`SKILL.md`, "The curator's role and decisions"). Put a change that waits under "Proposed changes" on the page of skill drafts: one item for each section that it rewrites, a whole part included, each with its new text whole, in the form of `SKILL.md`, "Pages".
5. Brief each comment of the curator to the writer, rather than rewrite it yourself. A comment marks a problem area: the writer fixes its paragraph or section, with the whole skill in mind.
6. Settle the writer's minor decisions from the record. `SKILL.md`, "The curator's role and decisions", says which changes wait for the curator, and how a new rule is named.
7. After each change to the coordinator skill or to `fortress-repo` lands, have a worker update that skill's page: the page of skill drafts for the coordinator skill, the page of `fortress-repo` changes for `fortress-repo`. The boot note holds both links. Give the worker the page's URL, and have it publish by that URL. The record-landing workflow runs this update itself for the changes to `fortress-repo` that follow a landing (`references/batch.md`, "The landing", step 4). The page of skill drafts has two sections, and the page of `fortress-repo` changes has only the first:
   - Landed changes: only the landed changes that the curator has not read, so that no change lands unseen while the curator is away. The items stand oldest first, numbered on from the page's last item, so every item that the curator finds there is new:
     - If the curator says, on the page or in chat, that they have read the page up to an item, the next update removes that item and every older item. Before each update, the worker reads every comment thread on the page, sent to Claude or not. A comment on a landed item that only says that the curator read it, such as "LGTM", is such a word, at the comment's time; write the newest such word and its time in the boot note's "Pages" line of that page. Every other comment, a yes on a draft among them, drops no item, and the worker quotes it to you. The page worker and the record-landing workflow's page stage both read it there. You may have the update made at once, without waiting for the next landing.
     - A draft is an item under "Proposed changes" that waits for the curator's yes. Its landing, the commit of the approved words, gets no item, unless it fixed a hit of the skills' lint, `explorations/coordinator/tools/skills-lint.py`, or a wrong path or section name: then one item shows the fix alone. The skill writer first runs the lint and checks the draft's paths and section names; the fix needs no second cold read. Any other change is a change of its own and goes the way its kind goes.
     - Every other item stays until the curator says, on the page or in chat, that they have read it.

     The item takes the form of a landed item in `SKILL.md`, "Pages". It shows the change against the skill's text before it, or, for an approved draft whose words changed at the landing, against the approved words. It gives the change's reason, which may come from a cold read, a hit of the skills' lint, a fix at a draft's landing, or the record entry that the orientation workflow, in update mode, took in. The reason says in plain words what was wrong and what the text now says. It never cites a cold read's flag by its code or number, a judge's ruling by its number, or an item of a task by its number.
   - Proposed changes: the items that wait for the curator's yes. When an approved item lands, a worker takes it off this section.

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

<!-- The skill writer's task of 2026-10-22, 23:06 UTC: the worker skill's core read before the coordinator's, stated where it is seen before the coordinator's core loads, at the curator's word. -->

# Your next task: the order of the cores, stated before the load

The curator's word, in chat on 2026-10-22 (drafted before your last task landed): the point of reading `fortress-repo`'s `SKILL.md` before the coordinator's is that a model gives a glossary a different meaning when the two load in the other order; the prerequisite is about full compression and alignment. A line inside the coordinator's body comes too late to do anything: by then its core is loaded. So state the prerequisite where it is read before the load, and remove the lines that come too late.

In `.claude/skills/coordinator/SKILL.md`:

1. Remove the line that your last task added under `# The coordinating session`: "This skill uses the terms of `fortress-repo`'s `SKILL.md`. Read that file first if it is not in your context."
2. Put the boot's step 1 back to: "`CLAUDE.md`, then this file."
3. In the front matter, start the `description` with this sentence, before "Use this skill in …": "Read `.claude/skills/fortress-repo/SKILL.md` first, before you load this skill, if it is not in your context: this skill builds on its terms." The description is in every session's list of skills, so it is read before the skill loads. Keep the rest of the description as it is; the sentence goes first so that no cut of a long description drops it.

Keep the light boot's paragraph and the bullet "Read nothing that the boot does not name." as they are.

## Also

- `fortress-repo`'s `description` ends "Skip it for session upkeep (compaction, boot notes, reading batch results, scheduling agents: coordinator skill), …". Check whether that sentence would make a model skip reading the file before it loads the coordinator. If it would, add the fewest words that keep the skip for invoking the skill and allow the read of its `SKILL.md` before the coordinator's, and list them in your report. Change nothing else there.
- Do not edit `.claude/settings.json` or any hook.
- Replace the provenance lines of your last task for the order of the cores in `.claude/skills/coordinator/references/sources.md` with one for this change: the curator's word in chat on 2026-10-22, about 23:05 UTC.
- Run `explorations/coordinator/tools/skills-lint.py` on the changed files and keep it clean.
- Commit only the paths that you changed, by name. Do not push.
- Report: each change with its file and line, the lint's result, the commit.

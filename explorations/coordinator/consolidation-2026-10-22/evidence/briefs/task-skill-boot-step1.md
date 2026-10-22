<!-- The skill writer's task of 2026-10-22, about 23:20 UTC: the boot's step 1 removed, at the curator's word. -->

# Your next task: the boot's step 1 goes

The curator's word in chat on 2026-10-22, about 23:19 UTC: the boot's step 1, "`CLAUDE.md`, then this file.", wastes tokens. Claude Code puts `CLAUDE.md` into every session's context by itself, so no session chooses to load it; and a session that reads step 1 has this file loaded already. A model that follows the step reads both again.

In `.claude/skills/coordinator/SKILL.md`, "The boot":

1. Delete step 1.
2. Renumber the steps after it, so that they run 0 to 6.
3. In the light boot's paragraph, change "take steps 0, 1 and 4 to 7, and skip steps 2 and 3" to "take steps 0 and 3 to 6, and skip steps 1 and 2". Keep the rest of the paragraph as it is.
4. Grep both skills and the batch manual, `explorations/coordinator/climb-batch-workflow.md`, for any other reference to a step of the boot by its number, and bring each to the new numbers. List them in your report.

## Also

- Do not edit `.claude/settings.json`, any hook, `CLAUDE.md` or `explorations/coordinator/README.md`.
- Add one provenance line to `.claude/skills/coordinator/references/sources.md`: the curator's word in chat, 2026-10-22, about 23:19 UTC.
- Run `explorations/coordinator/tools/skills-lint.py` on the changed files and keep it clean.
- Commit only the paths that you changed, by name. Do not push.
- Report: each change with its file and line, the lint's result, the commit.

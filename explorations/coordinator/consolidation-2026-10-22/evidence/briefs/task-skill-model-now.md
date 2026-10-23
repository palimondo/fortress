<!-- The skill writer's task of 2026-10-23, about 00:07 UTC: the boot's step 0 by a script in place of get_session, at the curator's yes of 00:06. -->

# Your next task: the boot's step 0 by a script

The curator's yes in chat on 2026-10-23 at 00:06 UTC. The boot's step 0 calls the `get_session` tool, whose answer costs about 6K tokens a boot, most of it the session's list of published pages; the check needs one field. The new script `explorations/coordinator/tools/model-now.sh` prints the model of the current turn's reply, read from the session's transcript as the Stop hook `.claude/hooks/model-check.sh` reads it, in a few tokens; it prints nothing and exits 1 when it finds no transcript or no reply. The compaction hook's text in `.claude/settings.json` already says so; do not edit it.

In `.claude/skills/coordinator/SKILL.md`, "The boot", rewrite step 0 with this content, in the skill's register:

0. Check the serving model: run `explorations/coordinator/tools/model-now.sh`, which prints the model of this turn's reply. If it prints nothing, use the `get_session` tool with no session ID: its `session_context.model` and `external_metadata.last_served_model`. If the model is neither Opus nor Fable, act as on the model check's alarm (below).

Leave the rest of "The boot" as it is. Grep both skills for another mention of `get_session` as the boot's check, and bring it to this step; the `MODEL CHECK FAILED` paragraph keeps `get_session`.

## Also

- Add one provenance line to `.claude/skills/coordinator/references/sources.md`: the curator's yes in chat, 2026-10-23, 00:06 UTC.
- Run `explorations/coordinator/tools/skills-lint.py` on the changed files and keep it clean.
- Commit only the paths that you changed, by name. Do not push.
- Report: each change with its file and line, the lint's result, the commit.

<!-- The skill writer's task of 2026-10-23, about 00:14 UTC: brief files only where a tool reads one or several workers share one, at the curator's yes of 00:13; and the alarm's check by step 0's script. -->

# Your next task: brief files, and the alarm's check

## 1. Brief files only where needed

The curator's yes in chat on 2026-10-23 at 00:13 UTC, to this: keep a brief file only where a tool reads it or several workers share it; put a one-off worker's brief in its launch prompt. The coordinator had committed a brief file for every one-off worker (21 brief files on 10-22), and your last rule in `record.md` listed briefs among a run's working files, which read as "commit every brief".

- In `.claude/skills/coordinator/references/delegating.md`, "What a brief holds", add one bullet with this content: Put a one-off worker's brief in its launch prompt; the transcript keeps it. Write a brief to a file only where a tool reads it from one, such as `skill-writer.sh`, a Workflow script or a writer stream, or where several workers share it.
- In `.claude/skills/coordinator/references/record.md:108`, make "its briefs" read "its brief files", so that the bullet covers only the briefs that the new bullet allows. Change nothing else in it.

## 2. The alarm's check

In `.claude/skills/coordinator/SKILL.md:231`, "do no other work until `get_session` shows Opus or Fable again", make the check step 0's: "until step 0's check shows Opus or Fable again". This is the choice you offered in your last report.

## Also

- Add one provenance line for each change to `.claude/skills/coordinator/references/sources.md`.
- Run `explorations/coordinator/tools/skills-lint.py` on the changed files and keep it clean.
- Commit only the paths that you changed, by name. Do not push.
- Report: each change with its file and line, the lint's result, the commit.

<!-- The skill writer's task of 2026-10-22, 22:55 UTC: the light boot as an optional mode, and the worker skill's core read before the coordinator's, both approved by the curator in chat. -->

# Your next task: the light boot, and the worker skill's core first

The curator approved these texts in chat at 22:54 UTC on 2026-10-22: the light boot, and the order of the cores ("test that fortress-repo core is a pre-requisite for loading the coordinator skill's core as well"). Write them as given, in `.claude/skills/coordinator/SKILL.md`. Change no other meaning.

## 1. The worker skill's core first

- Directly under the heading `# The coordinating session`, before "You talk to the curator, …", add the line: "This skill uses the terms of `fortress-repo`'s `SKILL.md`. Read that file first if it is not in your context."
- In "The boot", step 1 now reads "`CLAUDE.md`, then this file." Make it: "`CLAUDE.md`, then `fortress-repo`'s `SKILL.md`, then this file."

## 2. The light boot

In "The boot", directly after the numbered steps (before the bullets that start "Read nothing else"), add this paragraph:

"**A light boot.** When the curator asks for a light boot, take steps 0, 1 and 4 to 7, and skip steps 2 and 3: FACTS, POSITIONS and INDEX stay unread. Then read the parts of the skills that the work in hand touches, as the boot note names them, if it does. Before you state a fact or a decision, or put anything to the curator, search the record with `facts-extract.sh`. The full boot is the default. The curator's word for a light boot replaces the hook's list of files after a compaction."

Then check the bullet "Read nothing else. List no directory, and bound every command's output." still reads right after the new paragraph; if it reads as if it forbade the light boot's parts, add the fewest words that fix it, and list them in your report.

## Also

- Do not edit `.claude/settings.json` or any hook.
- Add the provenance lines to `.claude/skills/coordinator/references/sources.md`: the curator's approval in chat on 2026-10-22 (the light boot at 22:54 UTC, after its first use at his word "Boot up light" after the compaction of about 16:37 UTC, and the order of the cores in the same message).
- Run `explorations/coordinator/tools/skills-lint.py` on the changed files and keep it clean.
- Commit only the paths that you changed, by name. Do not push.
- Report: each change with its file and line, the lint's result, the commit.

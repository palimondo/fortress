<!-- The skill writer's task of 2026-10-22, about 23:47 UTC: two rules for the coordinator skill, a run's working files into evidence/ by git mv (the curator's word), and a session id for every headless run (the coordinator's finding). -->

# Your next task: two rules for the coordinator skill

## 1. A run's working files go into `evidence/`

The curator's word in chat on 2026-10-21, about 21:27 UTC (`57a451100`, applied at `d245ddeaf`), and his reminder of 2026-10-22, 23:4x UTC, when the coordinator edited `check-index.sh` to let a new folder pass instead.

In `.claude/skills/coordinator/references/record.md`, "INDEX and the gap ledger", after the bullet "Give each new note under `explorations/` one line in INDEX, ...", add one bullet with this content, in the skill's register:

- A run's working files (its briefs, chunks, checks, and the worker reports that its results file draws on) go into an `evidence/` folder beside the results file, moved with `git mv` once the results are judged. Only the results file gets an INDEX line. `check-index.sh` skips evidence folders; never change its list of folder names to let another folder pass.

## 2. Every headless run passes `--session-id`

The coordinator's finding of 2026-10-22, about 23:15 UTC (`e067a7403`): a `claude -p` started from the coordinating session's shell without `--session-id` writes into the coordinating session's own transcript, also with `CLAUDE_CODE_SESSION_ID` unset. Its prompts then read there as the curator's messages, to every tool that reads his messages from the transcript. `skill-writer.sh` already passes one.

In `.claude/skills/coordinator/references/delegating.md`, beside the other rules for a headless session, add one bullet with this content:

- Start every headless session with `--session-id` and a new UUID. Without it, the session writes into your own transcript, where its prompts read as the curator's messages.

## Also

- Add one provenance line for each rule to `.claude/skills/coordinator/references/sources.md`.
- Run `explorations/coordinator/tools/skills-lint.py` on the changed files and keep it clean.
- Commit only the paths that you changed, by name. Do not push.
- Report: each change with its file and line, the lint's result, the commit.

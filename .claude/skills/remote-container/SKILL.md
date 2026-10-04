---
name: remote-container
description: How the cloud container and the Claude Code session running in it behave, as distinct from the repository on it. Covers the machine's limits (CPUs, memory, the disk allowance and why df misleads), the Bash tool's timeout and running long commands in the background, agents (how many run at once, an agent's starting cost, the prompt cache's life and what it means for waits, a project agent type's system prompt shared through the cache, an agent call that returns null, checking a Workflow script), the platform's stop of the session's process about every 13 hours, idle stops, VM restarts, interrupts and what each kills, resuming a Workflow run, continuing or relaunching an Agent-tool worker, send_later check-ins across a stop, the transcript backup and its blind spots, the platform's git-check Stop hook, the compaction hook, the automatic permission check, and a lost container and its recovery. Load it before a long command, an agent launch or a long wait, after any restart, stop, interrupt or compaction, when a tool call is cut off, the disk fills or a step is refused, and when designing a multi-agent workflow.
---

# The container and the session

The session is one process in a cloud container. The platform stops that process about every 13 hours and when the session goes idle, can restart the VM under it, and can lose the container outright. A stop or a restart keeps the disk; a lost container keeps only what was pushed. Running agents survive neither: after a stop they are resumed or relaunched.

## Rules that hold everywhere

- A command that may run longer than a minute or two runs in the background with a log, and is polled in steps under 270 s. Stop only your own processes.
- No single wait outlasts the prompt cache: under five minutes for a subagent, under an hour for the main session.
- Never stop a turn while agents run in the background: it kills them. A message kills nothing.
- After any stop, restart or loss, read what is on disk and what is pushed before starting anything again. A Workflow run is resumed, not relaunched.
- Nothing that takes hours lives only on disk: push as you go (how, for this repository: the `fortress-repo` skill, committing).
- A step the automatic permission check refuses is not pursued by another route or in a later turn.

## Load the part your task touches

- The machine (CPUs, memory, the disk allowance and reading `df`), the Bash tool's timeout, running and polling long commands, stopping processes: `references/machine.md`
- Agents: how many at once, starting cost, the prompt cache and waits, a prompt shared through an agent type, a null result, checking a Workflow script, watching a long run: `references/agents.md`
- The process stops, idle stops, VM restarts and interrupts, what each kills and keeps; check-ins across a stop; resuming a Workflow run; continuing or relaunching an Agent-tool worker: `references/stops-and-resume.md`
- The transcript backup and its blind spots, the platform's git-check Stop hook, the compaction hook, the automatic permission check: `references/hooks-and-permissions.md`
- A lost container: re-provisioning, re-arming the backup, reading another session's transcript, the recovery procedure: `references/container-loss.md`

The repository's own build, tests, caches, worktrees, and committing and pushing are the `fortress-repo` skill.

`references/sources.md` records where each fact in these parts comes from. It is for maintaining this skill. Do not load it for a task.

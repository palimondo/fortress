---
name: claude-session
description: "How a Claude Code session behaves wherever it runs, apart from the machine and the repository. Covers the Bash tool's 2-minute timeout, running a long command (an ant build, a test suite) in the background with a log and polling it, stopping only your own processes, agents (how many run at once, their starting cost, the prompt cache's life, five minutes in an agent and an hour in the main session, and what it means for a wait, a prompt shared through a project agent type, a skill written mid-session, a null agent result, checking a Workflow script, watching a long run), what an interrupt kills, what a stop of its process kills and keeps, resuming a Workflow run, continuing or relaunching an Agent-tool worker, the compaction hook, and the automatic permission check. Load it before a command that may run over a minute, before waiting on a running build, suite or agent, before launching agents or a Workflow, when a tool call is cut off or a step refused, and after an interrupt, a compaction or a restart."
---

# The Claude Code session

A Claude Code session is one process. It holds the main session, the conversation with the curator (the person who curates this restoration and decides what is committed and what the agents are asked to do), and the agents the main session launches. An agent is another Claude working for the session: an Agent-tool worker, launched alone with the Agent tool, or a Workflow agent, launched by a script that the Workflow tool runs. All of them run their commands on the machine the session runs on. A turn is the session's work from a message to its reply.

This skill says how such a session behaves wherever it runs. What holds only on the cloud platform this repository is worked on, the machine's figures, the disk allowance, the platform's own stops of the process and a lost container, is the `cloud-container` skill.

Two things end running work. An interrupt of a turn kills the agents running in the background. A stop of the session's process kills every agent, and keeps the disk and the conversation. After either, the work is taken up again from what is on disk.

## Rules that hold everywhere

- A command that may run longer than a minute or two runs in the background with a log, and is polled in steps under 270 s. Stop only your own processes.
- No single wait outlasts the prompt cache, the API's copy of a conversation's context that the next call reads instead of writing it again: under five minutes in an agent, under an hour in the main session.
- Never stop a turn while agents run in the background: it kills them. A message kills nothing.
- After an interrupt or a stop of the process, read what is on disk before starting anything again. A Workflow run is resumed, not relaunched.
- A step the automatic permission check refuses is not pursued by another route or in a later turn.

## Load the part your task touches

- The Bash tool's timeout, running and polling long commands, sharing the machine with other agents, stopping processes, finding a command again after a stop: `references/long-commands.md`
- Agents: how many run at once, an agent's starting cost, the prompt cache and waits, a prompt shared through a project agent type, a skill written mid-session, a null result, checking a Workflow script, watching a long run: `references/agents.md`
- Interrupts and stops of the process, what each kills and keeps; the rules while agents run; recovering; resuming a Workflow run; continuing or relaunching an Agent-tool worker: `references/interrupts-and-resume.md`
- The compaction hook and the automatic permission check: `references/compaction-and-permissions.md`

The repository's own build, tests, caches, worktrees, and committing and pushing are the `fortress-repo` skill. The cloud platform's machine, disk allowance, network, process stops, check-ins, transcript backup, git-check hook and a lost container are the `cloud-container` skill.

`references/sources.md` records where each fact in these parts comes from. It is for maintaining this skill. Do not load it for a task.

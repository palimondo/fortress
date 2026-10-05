---
name: cloud-container
description: "How the cloud platform this repository is worked on behaves, apart from Claude Code and the repository: the machine (4 CPUs, about 15 GB of memory, no swap, timings that differ between sessions), the disk allowance and why df misleads, a disk full with no space left on device and what to delete, the network proxy and its blocked hosts (web.archive.org, labs.oracle.com), the platform's stop of the session's process about every 13 hours, idle stops and VM restarts, send_later check-ins that keep the session busy across a stop, the transcript backup and its blind spots, reading another session's transcript, the platform's git-check Stop hook, and a lost container: re-provisioning, re-arming the backup, recovering the work. Load it when the disk fills or df looks wrong, when a host cannot be reached, after the session's process was stopped or the VM restarted, before arming check-ins for a long wait, when the backup fails to push, and when a container is lost or a session must go on in another."
---

# The cloud container

On the cloud platform, a Claude Code session (the `claude-session` skill) runs as one process in a cloud container: a virtual machine with its own disk, holding a clone of the branch of the repository the session was created from. The platform stops that process about every 13 hours and when the session goes idle, can restart the VM under it, and can lose the container outright. A stop or a restart keeps the disk; a lost container keeps only what was pushed. Running agents survive neither: after a stop they are resumed or relaunched, as the `claude-session` skill says.

A session run anywhere else, such as in a local container, needs none of this skill.

## Rules that hold everywhere

- Read the room left on the disk from the Avail column of `df -h /`, never from its Size, and check it before a long run.
- Nothing that takes hours lives only on disk: push as you go (how, for this repository: the `fortress-repo` skill, committing).
- After any stop, restart or loss, read what is on disk and what is pushed before starting anything again.
- The git-check hook's reminders are advisory. Work that is not to be committed or pushed yet is never committed or pushed to answer one.

## Load the part your task touches

- The machine (CPUs, memory, timings across sessions, how many agents run at once), the disk allowance and reading `df`, a full disk, the network and its blocked hosts: `references/machine.md`
- The platform's stops of the process (the 13-hour cap, idle stops, VM restarts), telling them apart, what they kill and keep here, check-ins across a stop: `references/stops.md`
- The transcript backup and its blind spots, the platform's git-check Stop hook: `references/hooks.md`
- A lost container: re-provisioning, re-arming the backup, reading another session's transcript, recovering the work: `references/container-loss.md`

How a Claude Code session behaves anywhere (the Bash tool's timeout, long commands, agents and the prompt cache, interrupts and resuming a run, the compaction hook, the permission check) is the `claude-session` skill. The repository's own build, tests, caches, worktrees, and committing and pushing are the `fortress-repo` skill.

`references/sources.md` records where each fact in these parts comes from. It is for maintaining this skill. Do not load it for a task.

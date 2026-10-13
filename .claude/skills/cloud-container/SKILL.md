---
name: cloud-container
description: "How the cloud platform this repository is worked on behaves, apart from Claude Code and the repository: the machine (4 CPUs, about 15 GB of memory, no swap, timings that differ between sessions), the disk allowance and why df misleads, a disk full with no space left on device and what to delete, the network proxy and its blocked hosts (web.archive.org, labs.oracle.com), the platform's stop of the session's process about every 13 hours, idle stops and VM restarts, a VM restart that rolls the disk back, the weekly usage limit stopping a run, send_later check-ins that keep the session busy across a stop, the transcript backup and its blind spots, reading another session's transcript, the platform's git-check Stop hook, and a lost container: re-provisioning, re-arming the backup, recovering the work. Load it when the disk fills or df looks wrong, when a host cannot be reached, after the session's process was stopped or the VM restarted, when commits are missing after a restart, before arming check-ins for a long wait, when the backup fails to push, and when a container is lost or a session must go on in another."
---

# The cloud container

**container**
: Virtual machine with its own disk, on which a cloud session of Claude Code runs. It holds a clone of the branch that the session was created from.

**curator**
: Person in charge of this restoration.

**coordinating session**
: Main session that keeps the project's record and launches its workers.

**process stop**
: End of the session's Claude Code process, by the platform's cap, by idleness or by a VM restart. The platform starts the process again in the same session.

**VM restart**
: Restart of the container's machine under a live session.

**check-in**
: One-shot reminder, armed with `send_later`, that wakes the main session with a message at a set time.

**Stop hook**
: Command that Claude Code runs at the end of every turn of the main session.

The platform stops the session's process about every 13 hours and when the session goes idle. It can restart the VM, sometimes with the disk rolled back, and it can lose the container. Running agents survive none of these. A session in a local container needs none of this skill.

## Rules for every agent

- Read the room left on the disk from the Avail column of `df -h /`, never from its Size. Check it before a long run.
- Push your work as you go. Only what is pushed survives a rollback of the disk or a lost container. `fortress-repo`'s committing part says how.
- After a process stop, a VM restart or a lost container, read what is on disk and what is pushed before you start anything again.
- Treat the git-check hook's reminders as advisory. Never commit or push unready work to answer one.

## The parts

- `references/machine.md`, for every agent: the machine, timings across sessions, agents at once, the disk allowance and a full disk, the blocked hosts.
- `references/stops.md`, for every agent: the kinds of process stop and their signs, a disk rolled back, the weekly usage limit, what a stop keeps here. Its section on check-ins is for the coordinating session.
- `references/hooks.md`, for the coordinating session: the transcript backup and its blind spots, the git-check hook and how to turn it off.
- `references/container-loss.md`, for the coordinating session: re-provisioning, re-arming the backup, reading another session's transcript, recovering the work.

How a Claude Code session behaves anywhere (the Bash tool, long commands, waits and the prompt cache, interrupts, the automatic permission check) is `fortress-repo`'s session part. Running agents and resuming a run are the `coordinator` skill's delegating part.

`references/sources.md` gives the source of each fact in these parts. Use it only to maintain this skill. Do not load it for a task.

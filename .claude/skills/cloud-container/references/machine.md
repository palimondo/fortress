# The machine and the network

## The machine

- 4 CPUs (Intel Xeon; the clock differs between sessions, 2.1 or 2.8 GHz), about 15 GB of memory, no swap. `nproc`, `free -g` and `/proc/cpuinfo` read them.
- Absolute seconds are not comparable across sessions: the same work has run 40 % slower in another session.
- The Workflow harness runs two agents at a time on this machine; more wait for a free slot. Two agents that build share the four cores.

## The disk allowance

`df -h /` misleads. Its Size column is the whole disk, about 250 GB, and most of that is reserved and cannot be written. What the session may use is Used plus Avail, about 37 GB; Use% is taken of that sum. Read the Avail column: it is what is left.

- A full allowance breaks tool output with "no space left on device". Check Avail before a long run, and before seeding worktrees or copying builds.
- What fills it is mostly temporary files the work never deletes. This repository's own culprit, the parser's directories in `/tmp`, and their sweep are in the `fortress-repo` skill (build and caches).
- When it is full: stop your own background processes (the `fortress-repo` skill, its session part) and delete what you created and no longer need (scratch, build output, private caches, finished worktrees). If that is not enough, commit and push, and tell the curator (the person who curates this restoration and decides what is committed) that this session's allowance is spent: a new session starts on a fresh machine.

## The network

Outbound HTTPS goes through the session's proxy. Some hosts are blocked: `web.archive.org` resets the connection and the proxy refuses `labs.oracle.com`. A research PDF from them is uploaded into the session by the curator. An archived page (not a PDF) can be read through a reader relay, as `research/extracts/fortress-websites-wayback.md` describes.

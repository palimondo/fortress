# Sources of this skill (for maintaining it only)

Not for a task: an agent doing work never loads this file. It says where each fact in the parts came from, so that the skill can be re-checked when the container or the platform changes. FACTS entries are named by their bold title or opening words, all in `explorations/coordinator/FACTS.md`, section "The container", unless another section is named (print one with `explorations/coordinator/tools/facts-extract.sh 'TITLE WORDS'`). "remote-container.md" is `explorations/coordinator/remote-container.md`, the coordinator's record of the container, cited by section; "brief-machine" is `explorations/coordinator/process-engineering/blind-brief/machine.md`.

This skill was made on 2026-10-05 by splitting one skill, `remote-container`, along a line the curator drew: this one took what holds only on the cloud platform, the other half what holds of a Claude Code session wherever it runs. A fact with a half of each kind was split, each skill saying its half. The same day, that other skill was folded in and deleted: its worker facts into the `fortress-repo` skill's session part, its facts on running agents and the compaction hook into the `coordinator` skill; this skill's pointers to it now name those homes. The provenance below is that skill's, moved with its facts. Most of those facts were first in the `fortress-repo` skill's machine part, whose sources they keep.

## SKILL.md

- Framing: FACTS "The platform stops the session's process after about 12 hours 58 minutes ...", "The VM can be restarted under a live session ...", "A container can be lost outright"; remote-container.md, opening paragraph.
- Rules: Avail, not Size, checked before a long run: the disk figures read on the machine (`machine.md`, below). Nothing that takes hours only on disk: remote-container.md § Three traps ("Worktree state that is never committed"). Disk and pushes first after a stop, a restart or a loss: FACTS "A restart of the session's own process kills its background runs ...", "A container can be lost outright". The git-check reminders advisory and declined: remote-container.md § How the snapshot works.
- The curator: the role that names the person who curates the restoration and decides what is committed; the skill names the role, never the person (the review of the `remote-container` skill).
- The description (frontmatter): written at the split from the `remote-container` skill's description, which the skill-creator's description optimization had kept as written on 2026-10-04 (its `run_loop` script over 20 trigger queries; the eval set and the scores are in `explorations/reviews/skills-description-optimization.md`). This text has not been through the optimizer yet.

## machine.md

- CPUs, memory, swap: brief-machine:7; `explorations/coordinator/build-cache-exploration.md` header (2.10 GHz) and § 6 (2.80 GHz); `nproc`, `free -g`, `/proc/cpuinfo` read on the machine; remote-container.md § The 2026-09-18 restart (no swap).
- 40 % slower across sessions: FACTS, section "Execution model", "The benchmark numbers on record ...".
- Two agents at a time, two building agents sharing the four cores: brief-machine:7, :29; FACTS "The Workflow harness runs two agents at once on this box". The rule that the harness runs a limited number and queues the rest is the `coordinator` skill's.
- The allowance and `df`: read on the machine. `df -B1 /` gives Size 252 GiB, Used 27 GiB, Avail 10 GiB, Use% 74; `stat -f /` gives 66.05M blocks of 4 KiB, 58.95M free and 2.61M available; `mount` shows ext4 with `resv_strict,resuid=65534`. The free blocks beyond Avail, about 215 GiB, are reserved for another user, so Used plus Avail (Size less the reserve, about 37 GiB) is the allowance whatever Used is. The "no space left on device" failure: FACTS "The disk allowance fills with parser-generation temp directories".
- What to do when it is full: the platform's own documentation page on session resources, read in the session.
- The parser directories as the repository's culprit: the same FACTS entry; their sweep lives in the `fortress-repo` skill's build-and-caches part.
- The network: `curl` from the container on 2026-10-04 (web.archive.org: connection reset; labs.oracle.com: a 502 from the proxy; the relay answered 200); `explorations/repo-internals.md:253-261`; `research/extracts/fortress-websites-wayback.md:11-12`.

## stops.md

- The cap, its log lines, its run lengths, the clock reset: FACTS "The platform stops the session's process after about 12 hours 58 minutes ..."; the `grep` and the JSON fields read from `/tmp/env-manager.log` on the machine.
- Idle stops: the same entry ("short runs of a few minutes to a few hours that end when the session goes idle"). That an idle stop kills what runs in the process is inferred from FACTS "A restart of the session's own process ...", which says it of every restart of the process.
- VM restart: FACTS "The VM can be restarted under a live session ..."; remote-container.md § The 2026-09-18 restart.
- What a stop keeps here beyond any stop of the process: `send_later` on the server: remote-container.md § The 2026-09-18 restart (last paragraph); the git-check hook back: FACTS "The transcript backup fires on the main session's Stop ...". A `nohup` command not surviving a VM restart: a VM restart ends every process (`uptime -s` changes). What any stop of the process kills and keeps is the `fortress-repo` skill's.
- A new session on a fresh machine: the platform's own documentation page on session resources; with only its pushed work and the records carried over, and no resume of another session's run: remote-container.md § Recovering a session whose container died, step 5.
- Check-ins: FACTS "A check-in cadence under an hour is a series of one-shot `send_later` check-ins ..."; POSITIONS "Check-ins and stops."; remote-container.md § Three traps (the check-ins make the Stop hook fire and keep the session cached); the extra one after a predicted stop: FACTS "The platform stops ...". A check-in left to finish its turn: remote-container.md § The 2026-09-19 interrupt.

## hooks.md

- The backup and its blind spots: FACTS "The transcript backup fires on the main session's Stop ..."; remote-container.md § How the snapshot works, § Three traps ("Worktree state that is never committed"); the hook in `~/.claude/settings.json` and the log's last line read on the machine.
- Not stopping a turn while it runs: FACTS "Stopping a turn ..." (its rule); POSITIONS "Check-ins and stops.". The general rule is the `coordinator` skill's.
- The compaction hook also in `~/.claude/settings.json`: remote-container.md § How the snapshot works; the file read on the machine.
- The git-check hook: FACTS "The transcript backup fires ..." (its second half); remote-container.md § How the snapshot works (the reminders advisory and declined). On after every start of the process: the boot note's paragraph on the container (the boot note is line 7 of `explorations/coordinator/postmortem-2026-09-19/held-list.md`); FACTS "The transcript backup fires ...", its second half.
- The permission check refusing the hook's no-op and a trigger that would turn it off: FACTS "The session's automatic permission check refuses a step ...".

## container-loss.md

- Loss and re-provisioning: FACTS "A container can be lost outright"; remote-container.md, opening paragraph, § The branch trap, § The 2026-09-17 incident (recovery in another container).
- Re-arming: remote-container.md § Re-arming it in a fresh container; `explorations/experiment/setup.sh`, its `transcripts` stage; the two hooks in `.claude/settings.json`.
- The lineages: remote-container.md § What is where, § Re-arming it in a fresh container; the Stop hook in this container's `~/.claude/settings.json` names `fortress-transcripts-blinded`.
- Reading: remote-container.md § Reading another session's transcript, § Three traps ("The 100 MiB blob limit", "The workflow-transcript glob").
- Recovering: remote-container.md § Recovering a session whose container died, steps 1-6 (step 5's reason, `resumeFromRunId` working only in the launching session, is the `coordinator` skill's).

## Where the sources disagree or are stale

- Memory: brief-machine says about 15 GB; remote-container.md § The 2026-09-18 restart says 16 GB; `free -g` reads 15.
- CPU clock: 2.10 GHz (the exploration's header, `/proc/cpuinfo` at one reading) and 2.80 GHz (brief-machine:7, the exploration's § 6).
- The disk: FACTS and brief-machine name the allowance without a figure; `explorations/coordinator/process-engineering/design-batch10-ultra-fable.md:438` reads `df` as "10 GB free of 252 GB", the misreading the part warns against.
- The push loop: remote-container.md § How the snapshot works described `autopush.sh` pushing every 4 minutes; FACTS "The push loop pushes `main` every 4 minutes ..." says none runs and the coordinator pushes itself. The file is corrected in place, its earlier text kept in a comment.
- The lineages: remote-container.md § What is where says `transcripts` holds the coordinating sessions and `transcripts-blinded` the blinded run's container; the coordinating session now runs in that container, and its backup goes to `transcripts-blinded`.
- The settings in a fresh container: remote-container.md § How the snapshot works says the home `~/.claude/settings.json` is copied from the tracked one; `setup.sh` adds only the Stop hook to the home file. The part asks for both hooks in the home file.
- Idle stops: what an idle stop kills is not recorded; the part infers it.

## What to re-check when the container or the platform changes

- The machine: `nproc`, `free -g`, and the disk figures (`df -B1 /`, `stat -f /`, `mount`).
- The cap's run length and the log's line format in `/tmp/env-manager.log`.
- The two-agent limit.
- The backup's worktree, branch and hook (`~/.claude/settings.json`), and the git-check hook's state after a restart.
- The scheduler's shortest cron interval and its rate limit.

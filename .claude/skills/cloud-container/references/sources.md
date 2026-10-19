# Sources of this skill (for maintaining it only)

Not for a task: an agent doing work never loads this file. It says where each fact in the parts came from, so that the skill can be re-checked when the container or the platform changes. FACTS entries are named by their bold title or opening words, all in `explorations/coordinator/FACTS.md`, section "The container", unless another section is named (print one with `explorations/coordinator/tools/facts-extract.sh 'TITLE WORDS'`). "remote-container.md" is `explorations/coordinator/remote-container.md`, the coordinator's record of the container, cited by section; "brief-machine" is `explorations/coordinator/process-engineering/blind-brief/machine.md`.

This skill was made on 2026-10-05 by splitting one skill, `remote-container`, along a line the curator drew: this one took what holds only on the cloud platform, the other half what holds of a Claude Code session wherever it runs. A fact with a half of each kind was split, each skill saying its half. The same day, that other skill was folded in and deleted: its worker facts into the `fortress-repo` skill's session part, its facts on running agents and the compaction hook into the `coordinator` skill; this skill's pointers to it now name those homes. The provenance below is that skill's, moved with its facts. Most of those facts were first in the `fortress-repo` skill's machine part, whose sources they keep.

## SKILL.md

- Framing: FACTS "The platform stops the session's process after about 12 hours 58 minutes ...", "The VM can be restarted under a live session ...", "A container can be lost outright"; remote-container.md, opening paragraph.
- Rules: Avail, not Size, checked before a long run: the disk figures read on the machine (`machine.md`, below). Nothing that takes hours only on disk: remote-container.md § Three traps ("Worktree state that is never committed"). Disk and pushes first after a stop, a restart or a loss: FACTS "A restart of the session's own process kills its background runs ...", "A container can be lost outright". The git-check reminders advisory and declined: remote-container.md § How the snapshot works.
- The curator: the role that names the person who curates the restoration and decides what is committed; the skill names the role, never the person (the review of the `remote-container` skill).
- The description (frontmatter): written at the split from the `remote-container` skill's description. The skill-creator's description optimization on 2026-10-05 (`run_loop` over 20 trigger queries, the other two skills present) kept it as written, at 20/20. The eval set and the scores are in `explorations/reviews/skills-description-optimization-2.md`.

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
- The rebuilt container (the coordinator's brief of 2026-10-08): FACTS "A container can be replaced by a fresh one whose clone fails, leaving an empty repository" (the branch read with `get_session`, `session_context.sources`; the empty `.git`, no `ant`; the recovery commands; two sessions refused on one backup branch); `session_context.sources[].git_repository.revision` from the coordinator's brief; setup.sh's about 4 minutes: FACTS "The transcript backup's Stop hook is registered twice in a container set up by `setup.sh`", its last sentence. The sentence that setup.sh re-arms the backup moved from "Re-arming" into the restore steps.
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

## The rewrite of 2026-10-13

The coordinator's task of 2026-10-13, under the curator's approval of the overnight run (17:13 UTC): the skill rewritten whole by the seven principles of `explorations/reviews/skills-writing-principles.md`, the part names and the split kept. FACTS entries are cited by number, at commit `f6bc1aa75`.

- `SKILL.md`: a glossary opens it (container, curator, coordinating session, process stop, VM restart, check-in, Stop hook), replacing the inline definitions; "process stop" is the `coordinator` skill's term. Each part names its reader. The description gains the disk rolled back, the weekly limit, and commits missing after a restart, for the new sections.
- `machine.md`: F-192 (the allowance, checked before a long run), F-195 (two agents at once); the rest re-worded only. "Tell the curator" became "report", since a worker reaches the curator through its report.
- `stops.md`, "What stops the process": F-202, F-196. "A VM restart that rolls the disk back": new, F-197; its page-source half is the `coordinator` skill's core ("Pages"). "The weekly usage limit": new, POSITIONS P-136, "The statement for the public record on the usage limit.", the platform's behaviour only, with the refusal's wording from `explorations/coordinator/usage-metering-2026-09-30.md`, "What happened"; placed in `stops.md` rather than `machine.md`, since it ends a run as a stop does. "Check-ins": F-207, POSITIONS P-127, "Check-ins and stops.".
- `hooks.md`, the backup: F-194; where it is registered and the two passes: new, F-199, `.claude/settings.json:8`, `explorations/experiment/setup.sh:67-75`. Not stopping a turn after a reply: F-200, P-127. The pointer to `remote-container.md` for an unnamed failure: settled by the coordinator's task (a pointer where a reader needs the evidence).
- `hooks.md`, the git-check hook: F-194, F-210. The empty body and its commands: the curator's page comment of 2026-10-12, 15:42 UTC (`explorations/coordinator/HELD.md`), with the technique as `remote-container.md`, "How the snapshot works", records it (a no-op that reads its input and exits 0, the original kept as `stop-hook-git-check.sh.orig`); the `grep -c stop_hook_active` test read from the platform's script on the machine. Telling the curator is the `coordinator` skill's boot.
- `container-loss.md`: F-193, F-198, F-199 (the blank container, setup.sh's 4 minutes). "A lesson about the platform, not a ledger row": new, POSITIONS P-128, "Where the work lives.". The re-arming no longer copies hooks into `~/.claude/settings.json`: the tracked file registers both (F-199). Recovery step 6 names no file of the coordinator's.
- Cut from the parts: dates, session IDs and run lengths beyond the 46,640 s figure; the provenance of the "40 % slower" figure stays in the section on `machine.md` above.

### Where each FACTS entry of "The container" now stands (F-203 aside)

- F-189 (where the process cost is measured): `coordinator`, `references/analysis.md`, "Measuring".
- F-190 (a boot's cost): `coordinator`, `references/analysis.md`, "Measuring".
- F-191 (the Bash tool's ceiling): `fortress-repo`, `session.md`, "The Bash tool and waits", "Long commands"; a timing alone: `records.md`, "Timings and citations".
- F-192 (the parser folders fill the allowance): here, `machine.md`, "The disk allowance"; the sweep: `fortress-repo`, `build-and-caches.md`.
- F-193 (a lost container): here, `container-loss.md`.
- F-194 (the backup, the git-check hook): here, `hooks.md`; the push after every commit: `fortress-repo`, `committing.md`.
- F-195 (two agents at once): here, `machine.md`; the rest: `coordinator`, `references/delegating.md`, "The Workflow tool".
- F-196 (a VM restart, disk intact): here, `stops.md`, "What stops the process"; the resume: `coordinator`, `references/delegating.md`.
- F-197 (the disk rolled back): here, `stops.md`, "A VM restart that rolls the disk back"; the page's source: `coordinator`, core, "Pages".
- F-198 (the empty clone): here, `container-loss.md`, "Re-provisioning".
- F-199 (where the hook is registered): here, `hooks.md`, "The transcript backup", and `container-loss.md`.
- F-200 (an interrupt): `coordinator`, `references/delegating.md`, "Interrupts and process stops"; `fortress-repo`, `session.md`; the seconds after a reply: here, `hooks.md`.
- F-201 (a restart kills the runs): `coordinator`, `references/delegating.md`; `fortress-repo`, `session.md`, "After an interrupt or a stop of the process".
- F-202 (the cap): here, `stops.md`, "What stops the process".
- F-204 (waits and the cache): `fortress-repo`, `session.md`; `coordinator`, `references/delegating.md`.
- F-205 (a headless session's cache): `coordinator`, core, "The facts of this environment", and `references/delegating.md`.
- F-206 (a worker loads `fortress-repo`): `coordinator`, `references/delegating.md`.
- F-207 (the check-in series): here, `stops.md`, "Check-ins".
- F-208 (`agent()` returns null): `coordinator`, `references/delegating.md`, "The Workflow tool".
- F-209 (`node --check`): `coordinator`, `references/delegating.md`, "The Workflow tool".
- F-210 (the permission check): `fortress-repo`, `session.md`; `coordinator`, core; the refused hook step: here, `hooks.md`.
- F-211 (no push loop): `fortress-repo`, `committing.md`, "Pushing"; `coordinator`, core.
- F-212 (Fable and the all-models limits): `coordinator`, `references/delegating.md`.
- F-213 (a push notification): `coordinator`, core, "Quiet times".
- F-214 (a page republished after a compaction): `coordinator`, core, "Pages".
- F-215 (a path on the phone): `coordinator`, core, "The facts of this environment".

## The second cold read's fixes, 2026-10-13

From `cold-read-2.md` (the coordinator's scratchpad, `skill-outline/checks/`), with the coordinator's rulings of 2026-10-13.

- `SKILL.md`: "main session" defined (flag 24); the local-container sentence removed (flag 25); the disk rule points to `machine.md` (flag 26); pushing bounded by the brief (flag 27); the commands after a stop (flag 28); the git-check hook named (flag 29); pointers to other skills by file (flag 30).
- `machine.md`: the Workflow limit (flag 32); worktrees deleted only when pushed (flag 34); a PDF named in the report (flag 35); the reader relay's URL form, from `research/extracts/fortress-websites-wayback.md:9-14` (flag 36).
- `stops.md`: the cap's cause (flag 37); the check-ins' reasons, the cache and the backup, from P-127 and F-207 (flag 38); telling the kinds apart by `duration_ms` and `uptime -s` (flags 39, 40); the rollback's recovery on each branch the session works on, own commits pushed, by the ruling on flag 41; the backup checked after a rollback (flag 42); the page named (flag 43); the limit's sign (flag 44); chaining, the wait, the stop's check-in message, re-arming (flags 45 to 48); the interrupt and the curator's wait, from `remote-container.md`, "The 2026-09-19 interrupt" (flags 49, 50).
- `hooks.md`: when to read `push=` and its good values (flag 51); the lock (flag 52); the query for `remote-container.md` (flag 53); "unverifiable" commits as the script defines them, and declining a reminder, the script's `stop_hook_active` check making the hook fire once (flags 54, 55), read from `~/.claude/stop-hook-git-check.sh`; manual approval named and the switch back (flag 56).
- `hooks.md`: in manual approval every Workflow agent's command waits for the curator, so a batch runs unattended only in auto mode: FACTS F-210, "The session's automatic permission check refuses a step ...", 2026-10-13, placed beside the switch to manual approval that the `coordinator` skill's boot points to.
- `container-loss.md`: flags 57 to 70; the branch check within `fortress-repo`'s pushing rule, by the ruling on flag 59; the small transcript's path `<session>.jsonl` from `explorations/coordinator/transcript-backup/backup_transcripts.py:43-47` (flag 67).
- Not changed: "no swap" (flag 31, no consequence on record); no disk threshold (flag 33, none on record for a run outside the gate, by the ruling); how to wait the scheduler's minute (flag 46, no waiting method on record for the main session).

## The git-check switch, 2026-10-19

- `hooks.md`, "The platform's git-check hook", and `stops.md`, "What a stop kills and keeps here": the switch `.claude/hooks/git-check-off.sh`, run at every SessionStart and Stop from `.claude/settings.json`, which the curator approved on 2026-10-19. It replaced the step by hand and its manual approval. Its behaviour, the `.orig` copy and the missed turn are read from its header comment and body; the `grep -c` test stays from 2026-10-13.

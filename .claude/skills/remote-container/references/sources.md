# Sources of this skill (for maintaining it only)

Not for a task: an agent doing work never loads this file. It says where each fact in the parts came from, so that the skill can be re-checked when the container or the platform changes. FACTS entries are named by their bold title or opening words, all in `explorations/coordinator/FACTS.md`, section "The container", unless another section is named (print one with `explorations/coordinator/tools/facts-extract.sh 'TITLE WORDS'`). "remote-container.md" is `explorations/coordinator/remote-container.md`, cited by section; "brief-machine" is `explorations/coordinator/process-engineering/blind-brief/machine.md`; "the script" is `explorations/coordinator/climb-batch-workflow.js`; "the manual" is `explorations/coordinator/climb-batch-workflow.md`. Most facts here were first in the `fortress-repo` skill's machine and agents parts, whose sources they keep.

## SKILL.md

- Framing: FACTS "The platform stops the session's process after about 12 hours 58 minutes ...", "The VM can be restarted under a live session ...", "A container can be lost outright"; remote-container.md, opening paragraph.
- Rules: background and 270 s: FACTS "An agent that waits longer than the prompt cache lives writes its whole context again at every wake"; the script's prefix "Long commands" (`:960-979`). Stop only your own processes: the same prefix. Never stop a turn, messages kill nothing: FACTS "Stopping a turn kills every background agent alive at that moment ..."; POSITIONS "Check-ins and stops." Disk first, resume not relaunch: FACTS "A restart of the session's own process kills its background runs ...". Nothing that takes hours only on disk: remote-container.md § Three traps ("Worktree state that is never committed"). Refusals: FACTS "The session's automatic permission check refuses a step ...".
- The curator: the role that names the person who curates the restoration and decides what is committed; the skill names the role, never the person (the review of this skill).
- The description (frontmatter): put through the skill-creator's description optimization on 2026-10-04 (its `run_loop` script over 20 trigger queries); it passed every query at the first iteration, so the optimization kept it as written; the eval set and the scores are in `explorations/reviews/skills-description-optimization.md`.

## machine.md

- CPUs, memory, swap: brief-machine:7; `explorations/coordinator/build-cache-exploration.md` header (2.10 GHz) and § 6 (2.80 GHz); `nproc`, `free -g`, `/proc/cpuinfo` read on the machine; remote-container.md § The 2026-09-18 restart (no swap).
- 40 % slower across sessions: FACTS, section "Execution model", "The benchmark numbers on record ...". Run nothing else beside a kept time: FACTS "The Bash tool's 10-minute ceiling kills long runs" ("nothing else running when a number is to be kept").
- Two building agents share the cores: brief-machine:7, :29; FACTS "The Workflow harness runs two agents at once on this box".
- The allowance and `df`: read on the machine. `df -B1 /` gives Size 252 GiB, Used 27 GiB, Avail 10 GiB, Use% 74; `stat -f /` gives 66.05M blocks of 4 KiB, 58.95M free and 2.61M available; `mount` shows ext4 with `resv_strict,resuid=65534`. The free blocks beyond Avail, about 215 GiB, are reserved for another user, so Used plus Avail (Size less the reserve, about 37 GiB) is the allowance whatever Used is. The "no space left on device" failure: FACTS "The disk allowance fills with parser-generation temp directories".
- What to do when it is full: the platform's own documentation page on session resources, read in the session.
- The parser directories as the repository's culprit: the same FACTS entry; their sweep lives in the `fortress-repo` skill's build-and-caches part.
- The Bash tool's timeout: FACTS "The Bash tool's 10-minute ceiling kills long runs"; brief-machine:32; the tool's own description (default 120000 ms, at most 600000). A call moved to the background at the default timeout: seen in the session that wrote this skill (a `grep` over `explorations/` that passed 120 s).
- `run_bg`, `wait_for`, never through `tail`, stopping only your own processes: the script's prefix "Long commands" (`:960-979`).
- `Monitor` for the main session only: FACTS "The Bash tool's 10-minute ceiling ..." (`Monitor`, 1800000 ms) read with the cache-life entry (one hour for the main session, five minutes for a subagent).
- `nohup` commands survive a stop of the process: FACTS "A restart of the session's own process ..." ("shell scripts the workers had started in the background").
- `pkill -f` killing its own call: seen in the session that wrote this skill (the call exited 144 when its pattern was also in its own shell's command line).
- The network: `curl` from the container on 2026-10-04 (web.archive.org: connection reset; labs.oracle.com: a 502 from the proxy; the relay answered 200); `explorations/repo-internals.md:253-261`; `research/extracts/fortress-websites-wayback.md:11-12`.

## agents.md

- Two at a time, the 45K floor, what parallel agents share, the breakpoint, a project agent type shared through the cache, a type not found until the process restarts, an agent with no model: FACTS "The Workflow harness runs two agents at once on this box"; brief-machine:29-30.
- Cost as tokens written: POSITIONS "Estimates in the project's units."; brief-machine:33.
- The cache's life, the rewrite at every wake, the 270 s cap: FACTS "An agent that waits longer than the prompt cache lives ..."; brief-machine:31. Check-ins 45 minutes apart: POSITIONS "Check-ins and stops."
- Null from `agent()`, a retry told what the attempt left: FACTS "`agent()` in a Workflow returns null for an agent the harness marks failed ..."; brief-machine:35.
- The parse check: FACTS "`node --check` does not check the batch script as the Workflow harness parses it ..."; the one-line command composed from it and run on this container's Node against a two-line slip (refused, "Unexpected identifier 's'") and a clean script (parses).
- Watching a long run: POSITIONS "The coordinator watches what it launches."
- A skill written mid-session appearing at once: FACTS "The Workflow harness runs two agents at once on this box", its last sentence.

## stops-and-resume.md

- The cap, its log lines, its run lengths, the clock reset: FACTS "The platform stops the session's process after about 12 hours 58 minutes ..."; the `grep` and the JSON fields read from `/tmp/env-manager.log` on the machine.
- Idle stops: the same entry ("short runs of a few minutes to a few hours that end when the session goes idle"). That an idle stop kills what runs in the process is inferred from FACTS "A restart of the session's own process ...", which says it of every restart of the process.
- VM restart: FACTS "The VM can be restarted under a live session ..."; remote-container.md § The 2026-09-18 restart.
- Interrupts, messages, `/context`, compactions, the two cases not known: FACTS "Stopping a turn kills every background agent alive at that moment ...", "A user interrupt of the coordinating session's turn kills a background Workflow run", "A message ... that arrives while the coordinator is inside a turn kills a running Workflow's agents ..." (does not hold), "A manual compaction issued between turns leaves a running Workflow alive".
- What a stop kills and keeps: FACTS "A restart of the session's own process ..."; `send_later` on the server: remote-container.md § The 2026-09-18 restart (last paragraph); the git-check hook back: FACTS "The transcript backup fires on the main session's Stop ...". A `nohup` command not surviving a VM restart: a VM restart ends every process (`uptime -s` changes).
- The rules while agents run: FACTS "Stopping a turn ..." (its rule); POSITIONS "Check-ins and stops."; remote-container.md § The 2026-09-19 interrupt (a check-in left to finish its turn).
- Check-ins: FACTS "A check-in cadence under an hour is a series of one-shot `send_later` check-ins ..."; POSITIONS "Check-ins and stops."; remote-container.md § Three traps (the check-ins make the Stop hook fire and keep the session cached); the extra one after a predicted stop: FACTS "The platform stops ...".
- Recovering, step 1: FACTS "A restart of the session's own process ..." (shell scripts survive); the manual "The distance stage" (a retry finds its run by its log). Steps 2-4: FACTS "A restart of the session's own process ...", "Stopping a turn ..." (`SendMessage` refused, the relaunch at the curator's explicit ask, the leftovers, the safety filter on a printed transcript tail); remote-container.md § Recovering a session whose container died, step 5.
- Resuming exactly, the wrapped `agent()`, killed agents' leftovers, the journal: FACTS "A restart of the session's own process ..."; the persisted scripts and agent transcripts: remote-container.md § Three traps ("The workflow-transcript glob"); `explorations/coordinator/tools/journal-text.py`.

## hooks-and-permissions.md

- The backup and its blind spots: FACTS "The transcript backup fires on the main session's Stop ..."; remote-container.md § How the snapshot works, § Three traps ("Worktree state that is never committed"); the hook in `~/.claude/settings.json` and the log's last line read on the machine.
- The git-check hook: FACTS "The transcript backup fires ..." (its second half); remote-container.md § How the snapshot works (the reminders advisory and declined).
- The compaction hook: remote-container.md § How the snapshot works; `.claude/settings.json`. A worker re-reading its brief: the manual "Shared prefix" ("If your context is compacted").
- The permission check: FACTS "The session's automatic permission check refuses a step ...".
- The git-check hook on after every start of the process: the boot note's paragraph on the container; FACTS "The transcript backup fires ...", its second half.

## container-loss.md

- Loss and re-provisioning: FACTS "A container can be lost outright"; remote-container.md, opening paragraph, § The branch trap, § The 2026-09-17 incident (recovery in another container).
- Re-arming: remote-container.md § Re-arming it in a fresh container; `explorations/experiment/setup.sh`, its `transcripts` stage; the two hooks in `.claude/settings.json`.
- The lineages: remote-container.md § What is where, § Re-arming it in a fresh container; the Stop hook in this container's `~/.claude/settings.json` names `fortress-transcripts-blinded`.
- Reading: remote-container.md § Reading another session's transcript, § Three traps ("The 100 MiB blob limit", "The workflow-transcript glob").
- Recovering: remote-container.md § Recovering a session whose container died, steps 1-6.

## Where the sources disagree or are stale

- The Bash tool's timeout: FACTS says the ceiling kills a long run; the session that wrote this skill saw a call moved to the background at the default timeout. The part says a call is cut off either way and gives the same how-to.
- `Monitor`: FACTS's Bash entry puts check runs under `Monitor` for up to 30 minutes, a wait that outlasts a subagent's five-minute cache. The part gives it to the main session only.
- Memory: brief-machine says about 15 GB; remote-container.md § The 2026-09-18 restart says 16 GB; `free -g` reads 15.
- CPU clock: 2.10 GHz (the exploration's header, `/proc/cpuinfo` at one reading) and 2.80 GHz (brief-machine:7, the exploration's § 6).
- The disk: FACTS and brief-machine name the allowance without a figure; `explorations/coordinator/process-engineering/design-batch10-ultra-fable.md:438` reads `df` as "10 GB free of 252 GB", the misreading the part warns against.
- The push loop: remote-container.md § How the snapshot works described `autopush.sh` pushing every 4 minutes; FACTS "The push loop pushes `main` every 4 minutes ..." says none runs and the coordinator pushes itself. The file is corrected in place, its earlier text kept in a comment.
- Messages during a turn: remote-container.md § The 2026-09-19 interrupt said not to send while a turn is in flight; its own correction and FACTS say a message kills nothing. Corrected in place the same way.
- The lineages: remote-container.md § What is where says `transcripts` holds the coordinating sessions and `transcripts-blinded` the blinded run's container; the coordinating session now runs in that container, and its backup goes to `transcripts-blinded`.
- The settings in a fresh container: remote-container.md § How the snapshot works says the home `~/.claude/settings.json` is copied from the tracked one; `setup.sh` adds only the Stop hook to the home file. The part asks for both hooks in the home file.
- Idle stops: what an idle stop kills is not recorded; the part infers it.

## What to re-check when the container or the platform changes

- The machine: `nproc`, `free -g`, and the disk figures (`df -B1 /`, `stat -f /`, `mount`).
- The cap's run length and the log's line format in `/tmp/env-manager.log`.
- The two-agent limit, the 45K floor, and the cache's lives (the usage records' `ephemeral_1h_input_tokens` and `ephemeral_5m_input_tokens`).
- The Bash tool's timeouts (its description) and what happens at them.
- The backup's worktree, branch and hook (`~/.claude/settings.json`), and the git-check hook's state after a restart.
- The scheduler's shortest cron interval and its rate limit.

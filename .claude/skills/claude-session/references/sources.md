# Sources of this skill (for maintaining it only)

Not for a task: an agent doing work never loads this file. It says where each fact in the parts came from, so that the skill can be re-checked when Claude Code changes. FACTS entries are named by their bold title or opening words, all in `explorations/coordinator/FACTS.md`, section "The container", unless another section is named (print one with `explorations/coordinator/tools/facts-extract.sh 'TITLE WORDS'`). "remote-container.md" is `explorations/coordinator/remote-container.md`, the coordinator's record of the container, cited by section; "brief-machine" is `explorations/coordinator/process-engineering/blind-brief/machine.md`; "the script" is `explorations/coordinator/climb-batch-workflow.js`; "the manual" is `explorations/coordinator/climb-batch-workflow.md`.

This skill and the `cloud-container` skill were made on 2026-10-05 by splitting one skill, `remote-container`, along a line the curator drew: this one took what holds of a Claude Code session wherever it runs, that one what holds only on the cloud platform. A fact with a half of each kind was split, each skill saying its half. The provenance below is that skill's, moved with its facts. Most of those facts were first in the `fortress-repo` skill's machine and agents parts, whose sources they keep.

## SKILL.md

- Framing: the session as one process with its agents: FACTS "A restart of the session's own process kills its background runs ..."; the two things that end running work: FACTS "Stopping a turn kills every background agent alive at that moment ...", "A restart of the session's own process ...".
- Rules: background and 270 s: FACTS "An agent that waits longer than the prompt cache lives writes its whole context again at every wake"; the script's prefix "Long commands" (`:960-979`). Stop only your own processes: the same prefix. Never stop a turn, messages kill nothing: FACTS "Stopping a turn kills every background agent alive at that moment ..."; POSITIONS "Check-ins and stops." Disk first, resume not relaunch: FACTS "A restart of the session's own process kills its background runs ...". Refusals: FACTS "The session's automatic permission check refuses a step ...".
- The curator: the role that names the person who curates the restoration and decides what is committed; the skill names the role, never the person (the review of the `remote-container` skill).
- The description (frontmatter): written at the split from the `remote-container` skill's description, which the skill-creator's description optimization had kept as written on 2026-10-04 (its `run_loop` script over 20 trigger queries; the eval set and the scores are in `explorations/reviews/skills-description-optimization.md`). This text has not been through the optimizer yet.

## long-commands.md

- The Bash tool's timeout: FACTS "The Bash tool's 10-minute ceiling kills long runs"; brief-machine:32; the tool's own description (default 120000 ms, at most 600000). A call moved to the background at the default timeout: seen in the session that wrote the `remote-container` skill (a `grep` over `explorations/` that passed 120 s), and again in the session that split it.
- `run_bg`, `wait_for`, never through `tail`, stopping only your own processes: the script's prefix "Long commands" (`:960-979`). What the two functions do: read from their code.
- `Monitor` for the main session only: FACTS "The Bash tool's 10-minute ceiling ..." (`Monitor`, 1800000 ms) read with the cache-life entry (one hour for the main session, five minutes for a subagent).
- Two building agents share the cores: brief-machine:7, :29; FACTS "The Workflow harness runs two agents at once on this box". Run nothing else beside a kept time: FACTS "The Bash tool's 10-minute ceiling kills long runs" ("nothing else running when a number is to be kept").
- `pkill -f` killing its own call: seen in the session that wrote the `remote-container` skill (the call exited 144 when its pattern was also in its own shell's command line), and again in the session that split it.
- `nohup` commands survive a stop of the process: FACTS "A restart of the session's own process ..." ("shell scripts the workers had started in the background").

## agents.md

- A limited number at a time, the rest queued, read from one `parallel()` (agents 0 and 1 started together, 2 and 3 after the first pair finished), the 45K floor, what parallel agents share, the breakpoint, a project agent type shared through the cache, a type not found until the process restarts, an agent with no model: FACTS "The Workflow harness runs two agents at once on this box"; brief-machine:29-30. The number itself, two, is the `cloud-container` skill's.
- Cost as tokens written: POSITIONS "Estimates in the project's units."; brief-machine:33.
- The cache's life, the rewrite at every wake, the 270 s cap: FACTS "An agent that waits longer than the prompt cache lives ..."; brief-machine:31. The main session's waits under an hour, by check-ins 45 minutes apart on the cloud platform: POSITIONS "Check-ins and stops." (the check-ins themselves are the `cloud-container` skill's).
- Null from `agent()`, a retry told what the attempt left: FACTS "`agent()` in a Workflow returns null for an agent the harness marks failed ..."; brief-machine:35.
- The parse check: FACTS "`node --check` does not check the batch script as the Workflow harness parses it ..."; the one-line command composed from it and run on the container's Node against a two-line slip (refused, "Unexpected identifier 's'") and a clean script (parses).
- Watching a long run: POSITIONS "The coordinator watches what it launches."
- A skill written mid-session appearing at once: FACTS "The Workflow harness runs two agents at once on this box", its last sentence.

## interrupts-and-resume.md

- Interrupts, messages, `/context`, compactions, the two cases not known: FACTS "Stopping a turn kills every background agent alive at that moment ...", "A user interrupt of the coordinating session's turn kills a background Workflow run", "A message ... that arrives while the coordinator is inside a turn kills a running Workflow's agents ..." (does not hold), "A manual compaction issued between turns leaves a running Workflow alive".
- What a stop of the process kills and keeps: FACTS "A restart of the session's own process ...". The platform's own stops, and what a stop keeps there beyond this (`send_later` reminders, the git-check hook back on), are the `cloud-container` skill's.
- The rules while agents run: FACTS "Stopping a turn ..." (its rule); POSITIONS "Check-ins and stops.". The seconds after a reply: the source names the transcript backup, which is a Stop hook; the part says a Stop hook, and the `cloud-container` skill names the backup.
- Recovering, step 1: FACTS "A restart of the session's own process ..." (shell scripts survive); the manual "The distance stage" (a retry finds its run by its log). Steps 2-3: FACTS "A restart of the session's own process ...", "Stopping a turn ..." (`SendMessage` refused, the relaunch at the curator's explicit ask, the leftovers, the safety filter on a printed transcript tail). Step 4: remote-container.md § Recovering a session whose container died, step 5 (`resumeFromRunId` only in the launching session, a pipeline written whole into one script).
- Resuming exactly, the wrapped `agent()`, killed agents' leftovers, the journal: FACTS "A restart of the session's own process ..."; the persisted scripts and agent transcripts: remote-container.md § Three traps ("The workflow-transcript glob"); `explorations/coordinator/tools/journal-text.py`.

## compaction-and-permissions.md

- The compaction hook: remote-container.md § How the snapshot works; `.claude/settings.json`. A worker re-reading its brief: the manual "Shared prefix" ("If your context is compacted"). That the hook is also in the cloud container's `~/.claude/settings.json` is the `cloud-container` skill's.
- The permission check: FACTS "The session's automatic permission check refuses a step ...". Its second example, a trigger that would turn the git-check hook off, is the `cloud-container` skill's.

## Where the sources disagree or are stale

- The Bash tool's timeout: FACTS says the ceiling kills a long run; the sessions that wrote and split the skill saw a call moved to the background at the default timeout. The part says a call is cut off either way and gives the same how-to.
- `Monitor`: FACTS's Bash entry puts check runs under `Monitor` for up to 30 minutes, a wait that outlasts a subagent's five-minute cache. The part gives it to the main session only.
- Messages during a turn: remote-container.md § The 2026-09-19 interrupt said not to send while a turn is in flight; its own correction and FACTS say a message kills nothing. Corrected in place, its earlier text kept in a comment.
- Measured only on the cloud platform: the cache's lives, the 45K floor and a `nohup` command surviving a stop of the process were all observed there. They are placed here as the harness's own behaviour, by the curator's line for the split; the number of agents at once is placed with the platform, as FACTS names it "on this box".

## What to re-check when Claude Code changes

- The 45K floor and the cache's lives (the usage records' `ephemeral_1h_input_tokens` and `ephemeral_5m_input_tokens`).
- The Bash tool's timeouts (its description) and what happens at them.

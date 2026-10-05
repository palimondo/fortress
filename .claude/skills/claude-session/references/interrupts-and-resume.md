# Interrupts, stops of the process, and resuming

## What ends running work

- **An interrupt.** Stopping the session's turn (the stop button) kills every background agent alive at that moment, Workflow agents and Agent-tool workers alike; the transcript records "[Request interrupted by user]", and a tool in flight "User rejected tool use". A message sent while the session is busy is queued and delivered inside the turn or as the next one, and kills nothing; nor do `/context` and a manual compaction between turns. Not known: whether an automatic compaction mid-turn, or an interrupt while a Stop hook runs (a command the settings have Claude Code run at the end of every turn), kills a live run.
- **A stop of the session's process.** The process can be stopped under a live session and the session resumed (the cloud platform's own stops of it: the `cloud-container` skill). A stop of the process kills every Workflow run and its agents and every Agent-tool worker. It keeps the conversation and the session ID, the disk (worktrees, uncommitted edits, untracked files, logs), the transcripts, and each Workflow run's journal. A command started with `nohup` survives it.

## The rules while agents run

- Send messages at any time; compact between turns.
- Never stop a turn while agents run in the background, including the seconds after a reply while a Stop hook runs.
- After an accidental stop, the run is resumed (below), keeping every agent that had finished.

## Recovering after an interrupt or a stop

1. Read what is on disk before anything else: `git log` and `git status` in each worktree, the logs. Continue at the first step whose log is missing, cut off or failed. A background command may still be running: find it by its log (no `EXIT=` line yet) or by a process under your tree's path, and wait for it instead of starting a second one.
2. A Workflow run is resumed, not relaunched: the same script and the same arguments, byte for byte, with `resumeFromRunId` (the Workflow tool's argument that names the run to resume). Every agent that had finished keeps its result. An unfinished one runs again from its start and finds its tree's leftovers; a relaunch would start every agent again.
3. An Agent-tool worker stopped by a stop of the process continues from its transcript on a `SendMessage`. One killed by an interrupt cannot be resumed: `SendMessage` is refused, and it is relaunched only at the curator's explicit ask. Tell the new worker its predecessor's leftovers in the tree, not its transcript: a worker told to print a predecessor's transcript has been ended by the safety filter.
4. A Workflow run is resumed only in the session that launched it: `resumeFromRunId` does not work from a new session. So a run that a later resume was meant to extend cannot be finished from a new session, and a pipeline is written whole into one script.

## Resuming a Workflow run exactly

- The resume reuses the longest unchanged prefix of the run's `agent()` calls in call order. A base given as a short hash where the launch gave the full one misses from the first call. Where cached calls resolve at once, a script that starts calls as others finish can issue them in another order than the live run did, and misses from there.
- A script changed since the launch is resumed from a copy of it as launched (`git show <commit>:<path>`; the harness also keeps each launched script as `~/.claude/projects/<project>/<session>/workflows/scripts/<name>-<run>.js`). Where the call order would differ, use a copy that wraps `agent()` so that the finished calls are issued in the journal's order of their `started` lines, prompts unchanged.
- A copy that changes only what follows the cached prefix runs the changed call live and nothing before it. A changed prompt is a new key: that call runs live.
- An agent killed mid-work leaves its edits in its tree, uncommitted, and any staged state. Before the resume, either name them in that agent's prompt, so that the live call checks and keeps them, or stash and move them aside, so that it starts clean.
- The journal is `~/.claude/projects/<project>/<session>/subagents/workflows/<run>/journal.jsonl`: one `launched` line, a `started` line per agent call (`key`, `agentId`, `label`, `phase`), and a `result` line with the same key per agent that returned. A resume appends to it; a call run live again under a key it holds gets a second `started` line. `explorations/coordinator/tools/journal-text.py` reads it. The agents' transcripts are `agent-*.jsonl` beside it.

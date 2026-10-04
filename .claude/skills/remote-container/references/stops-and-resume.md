# Stops, restarts, interrupts, and resuming

## What stops running work

- **The process cap.** The platform stops the session's process after about 12 h 58 min of continuous running and restarts it in resume mode within seconds. It is not a crash, not memory and not a message. The next stop is the last start plus 12 h 58 min. The environment manager's log shows every stop and start:

      grep -E 'Received signal|context cancellation|Set session mode' /tmp/env-manager.log | tail

  A stop is a `SIGTERM` ("Received signal, shutting down gracefully"), then "Claude Code stopped due to context cancellation" with the run's length in `duration_ms`, then a "Set session mode for environment" `resume` line, the next start. The cap's runs all last about 46,640 s.
- **An idle stop.** The process also ends when the session goes idle, after runs of a few minutes to a few hours. It runs continuously only while someone or a check-in keeps it busy, so the cap's stops fall in busy stretches.
- **A VM restart.** `uptime -s` changes and the kernel build string may change; the log shows a `SIGTERM` at a run length that is not the cap's. The disk survives.
- **An interrupt.** Stopping the session's turn (the stop button) kills every background agent alive at that moment, Workflow agents and Agent-tool workers alike; the transcript records "[Request interrupted by user]", and a tool in flight "User rejected tool use". A message sent while the session is busy is queued and delivered inside the turn or as the next one, and kills nothing; nor do `/context` and a manual compaction between turns. Not known: whether an automatic compaction mid-turn, or an interrupt while the Stop hook runs, kills a live run.

Any stop or restart resets the clock of the cap.

## What a stop of the process kills and keeps

A stop of the process, by the cap, by idleness or by a VM restart, kills every Workflow run and its agents and every Agent-tool worker. It keeps the conversation and the session ID, the disk (worktrees, uncommitted edits, untracked files, logs), the transcripts, each Workflow run's journal, and `send_later` reminders, which live on the server. A command started with `nohup` survives a stop of the process, not a VM restart. The platform's git-check Stop hook is back on (`hooks-and-permissions.md`).

## The rules while agents run

- Send messages at any time; compact between turns.
- Never stop a turn while agents run in the background, including the seconds after a reply while the transcript backup runs. A check-in that fires during a run is left to finish its turn.
- After an accidental stop, the run is resumed (below), keeping every agent that had finished.

## Check-ins across a stop

A session that must keep running, to watch a run or to back it up, is kept busy by check-ins: one-shot `send_later` reminders, all armed in one turn, 45 minutes apart, so that each wake falls inside the main session's one-hour cache.

- Cron triggers take an hour at the shortest. So the series is of one-shot reminders, not a cron trigger, and not one reminder re-armed by each check-in.
- The scheduler refuses more than about ten trigger creations a minute ("Trigger creation rate limit reached"): wait the minute and continue the series.
- A series ends with its last check-in: a run that outlasts it needs a new series, armed by the last check-in.
- Add one extra check-in a few minutes after the predicted process stop: it resumes what the stop killed.
- Reminders survive a stop and a relaunch: delete or re-arm them to fit.

## Recovering after a stop

1. Read what is on disk and what is pushed before anything else: `git log` and `git status` in each worktree, the logs. Continue at the first step whose log is missing, cut off or failed. A background command may still be running: find it by its log (no `EXIT=` line yet) or by a process under your tree's path, and wait for it instead of starting a second one.
2. A Workflow run is resumed, not relaunched: the same script and the same arguments, byte for byte, with `resumeFromRunId`. Every agent that had finished keeps its result. An unfinished one runs again from its start and finds its tree's leftovers; a relaunch would start every agent again.
3. An Agent-tool worker stopped by a stop of the process continues from its transcript on a `SendMessage`. One killed by an interrupt cannot be resumed: `SendMessage` is refused, and it is relaunched only at the curator's explicit ask. Tell the new worker its predecessor's leftovers in the tree, not its transcript: a worker told to print a predecessor's transcript has been ended by the safety filter.
4. A new session cannot resume another session's run. Its pushed work and the records carry over; nothing else does.

## Resuming a Workflow run exactly

- The resume reuses the longest unchanged prefix of the run's `agent()` calls in call order. A base given as a short hash where the launch gave the full one misses from the first call. Where cached calls resolve at once, a script that starts calls as others finish can issue them in another order than the live run did, and misses from there.
- A script changed since the launch is resumed from a copy of it as launched (`git show <commit>:<path>`; the harness also keeps each launched script as `~/.claude/projects/<project>/<session>/workflows/scripts/<name>-<run>.js`). Where the call order would differ, use a copy that wraps `agent()` so that the finished calls are issued in the journal's order of their `started` lines, prompts unchanged.
- A copy that changes only what follows the cached prefix runs the changed call live and nothing before it. A changed prompt is a new key: that call runs live.
- An agent killed mid-work leaves its edits in its tree, uncommitted, and any staged state. Before the resume, either name them in that agent's prompt, so that the live call checks and keeps them, or stash and move them aside, so that it starts clean.
- The journal is `~/.claude/projects/<project>/<session>/subagents/workflows/<run>/journal.jsonl`: one `launched` line, a `started` line per agent call (`key`, `agentId`, `label`, `phase`), and a `result` line with the same key per agent that returned. A resume appends to it; a call run live again under a key it holds gets a second `started` line. `explorations/coordinator/tools/journal-text.py` reads it. The agents' transcripts are `agent-*.jsonl` beside it.

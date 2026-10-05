# The platform's stops, and check-ins

The platform stops the session's process in three ways. What any stop of the process kills and keeps, and how the work is recovered, is the `fortress-repo` skill's session part; how a run is resumed is the `coordinator` skill's. This part says when the platform's stops come, how to tell them apart, and what they do beyond that.

## What stops the process

- **The process cap.** The platform stops the session's process after about 12 h 58 min of continuous running and restarts it in resume mode within seconds. It is not a crash, not memory and not a message. The next stop is the last start plus 12 h 58 min. The environment manager's log shows every stop and start:

      grep -E 'Received signal|context cancellation|Set session mode' /tmp/env-manager.log | tail

  A stop is a `SIGTERM` ("Received signal, shutting down gracefully"), then "Claude Code stopped due to context cancellation" with the run's length in `duration_ms`, then a "Set session mode for environment" `resume` line, the next start. The cap's runs all last about 46,640 s.
- **An idle stop.** The process also ends when the session goes idle, after runs of a few minutes to a few hours. It runs continuously only while someone or a check-in keeps it busy, so the cap's stops fall in busy stretches.
- **A VM restart.** `uptime -s` changes and the kernel build string may change; the log shows a `SIGTERM` at a run length that is not the cap's. The disk survives.

Any stop or restart resets the clock of the cap.

## What a stop kills and keeps here

A stop of the process, by the cap, by idleness or by a VM restart, kills and keeps what any stop of the process does (the `fortress-repo` skill, its session part). On this platform, besides:

- `send_later` reminders survive: they live on the server.
- A command started with `nohup` survives the cap's stop and an idle stop, not a VM restart, which ends every process.
- The platform's git-check Stop hook is back on (`hooks.md`).

A new session is another matter: it starts on a fresh machine and cannot resume another session's run (the `coordinator` skill, running agents). Its pushed work and the project's records carry over; nothing else does.

## Check-ins across a stop

A check-in is a one-shot reminder armed with `send_later`, which wakes the main session with a message at a set time; the scheduler calls each scheduled message a trigger. A session that must keep running, to watch a run or to back it up (the transcript backup runs only when a turn ends: `hooks.md`), is kept busy by check-ins: all armed in one turn, 45 minutes apart, so that each wake falls inside the main session's one-hour prompt cache (the `fortress-repo` skill, its session part).

- Cron triggers take an hour at the shortest. So the series is of one-shot reminders, not a cron trigger, and not one reminder re-armed by each check-in.
- The scheduler refuses more than about ten trigger creations a minute ("Trigger creation rate limit reached"): wait the minute and continue the series.
- A series ends with its last check-in: a run that outlasts it needs a new series, armed by the last check-in.
- Add one extra check-in a few minutes after the predicted process stop: it resumes what the stop killed.
- Reminders survive a stop and a relaunch: delete or re-arm them to fit.
- A check-in that fires during a run is left to finish its turn.

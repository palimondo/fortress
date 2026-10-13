# The platform's stops, and check-ins

This part says when the platform's stops come, how to tell them apart, and what they do here. What any process stop kills and keeps, and a worker's steps after one, are `fortress-repo`'s session part. How to resume a run is the `coordinator` skill's delegating part.

## What stops the process

- **The cap.** The platform stops the process after about 12 h 58 min of continuous running, and starts it again in resume mode within seconds. It is not a crash, a memory limit or a message. The next stop comes 12 h 58 min after the last start.
- **Idleness.** The process also ends when the session goes idle, after a few minutes to a few hours. It runs continuously only while the curator or a check-in keeps it busy, so the cap's stops fall in busy stretches.
- **A VM restart.** `uptime -s` shows a new boot time, and the kernel's build string may change. The disk usually survives (below).

Every start, after a VM restart too, resets the cap's clock.

The environment manager's log records every stop and start:

    grep -E 'Received signal|context cancellation|Set session mode' /tmp/env-manager.log | tail

A stop is three lines: a `SIGTERM` ("Received signal, shutting down gracefully"), then "Claude Code stopped due to context cancellation" with the run's length in `duration_ms`, then "Set session mode for environment" `resume`, the next start. The cap's runs last about 46,640 s. A VM restart's `SIGTERM` comes at another length.

## A VM restart that rolls the disk back

A VM restart can bring the disk back to an earlier state. Other restarts have kept it whole, and nothing tells in advance which kind comes. So only what is pushed is safe.

The signs of a rollback:

- The local `main` ends at an earlier commit, and the commits made since are on `origin` only. The reflog jumps from that commit to the first commit made after the restart.
- The newer files of the scratchpad and of the tree's `tmp/` are gone, and so are the later lines of the backup's log. The session's own transcript stays whole.

To recover:

1. Run `git fetch`.
2. If you committed after the restart, run `git rebase origin/main`.
3. Push.

The `coordinator` skill rebuilds a page's lost source from the published page.

## The weekly usage limit

When the account's weekly limit on all models is reached, each new agent launch is refused ("You've hit your weekly limit"), and a running Workflow run ends. Later turns and agents may still be served while the usage panel reads the limit as reached. If the limit ended a run, resume it as after a process stop, once turns are served again.

## What a stop kills and keeps here

Any process stop kills and keeps what `fortress-repo`'s session part says. On this platform, also:

- `send_later` reminders survive. They live on the server.
- A command started with `nohup` survives the cap and an idle stop. A VM restart ends every process.
- The git-check hook is back on (`hooks.md`).

A new session is not a process stop. It starts on a fresh machine and cannot resume another session's run. Only its pushed work and the record carry over.

## Check-ins, for the coordinating session

Check-ins keep the session busy across a long run, so that the transcript backup runs at each turn's end (`hooks.md`). Each wake must fall inside the main session's one-hour prompt cache.

- Arm all the check-ins of a series in one turn, 45 minutes apart. Use no cron trigger, whose shortest interval is an hour, and no single reminder that each check-in arms again.
- The scheduler refuses more than about ten trigger creations a minute ("Trigger creation rate limit reached"). If it refuses one, wait the minute and arm the rest.
- A series ends with its last check-in. If the run outlasts it, have the last check-in arm a new series.
- Add one check-in a few minutes after the cap's next stop. It resumes what the stop killed.
- Reminders survive a stop and a relaunch. Delete or re-arm them to fit the run.
- Let the turn that a check-in starts during a run finish.

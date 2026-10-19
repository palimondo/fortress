# The platform's stops, and check-ins

This part says when the platform's stops come, how to tell them apart, and what they do here. What any process stop kills and keeps, and a worker's steps after one, are `fortress-repo`'s `references/session.md`. How to resume a run is the `coordinator` skill's `references/delegating.md`.

## What stops the process

- **The cap.** The platform stops the process after about 12 h 58 min of continuous running, and starts it again in resume mode, the same session, within seconds. No crash, memory limit or message causes it. The next stop comes 12 h 58 min after the last start.
- **Idleness.** The process also ends when the session goes idle, after a few minutes to a few hours. It runs continuously only while the curator or a check-in keeps it busy, so the cap's stops fall in busy stretches.
- **A VM restart.** The machine boots again. The disk usually survives (below).

Every start, after a VM restart too, resets the cap's clock.

The environment manager's log records every stop and start:

    grep -E 'Received signal|context cancellation|Set session mode' /tmp/env-manager.log | tail

A stop is three lines: a `SIGTERM` ("Received signal, shutting down gracefully"), then "Claude Code stopped due to context cancellation" with the run's length in `duration_ms`, then "Set session mode for environment" `resume`, the next start. To tell the kinds apart:

- The cap's stop has a `duration_ms` near 46,640,000.
- An idle stop has a shorter one, and the boot time that `uptime -s` prints stays earlier than the stop.
- After a VM restart, `uptime -s` prints a boot time between the stop and the next start.

## A VM restart that rolls the disk back

A VM restart can bring the disk back to an earlier state. Other restarts have kept it whole, and nothing tells in advance which kind comes. So only what is pushed is safe.

The signs of a rollback:

- The local `main` ends at an earlier commit, and the commits made since are on `origin` only. The reflog jumps from that commit to the first commit made after the restart.
- The newer files of the scratchpad and of the tree's `tmp/` are gone, and so are the later lines of the backup's log. The session's own transcript stays whole.

To recover:

1. Run `git fetch`.
2. On each branch that you work on, `main` included, run `git rebase origin/<branch>`. With no commit after the restart, this moves the branch forward to the pushed commit.
3. Push your own commits, as `fortress-repo`'s `references/committing.md` says.
4. In the coordinating session, after the next turn ends, read the backup's last log line (`hooks.md`).

If the source file of a published Artifact page was lost, the `coordinator` skill says how to rebuild it from the page.

## The weekly usage limit

When the account's weekly limit on all models is reached, each new agent launch is refused ("You've hit your weekly limit"), and a running Workflow run ends. Later, turns and launches can be served again while the usage panel still shows the limit as reached. A launch that succeeds is the sign. If the limit ended a run, resume it as after a process stop.

## What a stop kills and keeps here

Any process stop kills and keeps what `fortress-repo`'s `references/session.md` says. On this platform, also:

- `send_later` reminders survive. They live on the server.
- A command started with `nohup` survives the cap and an idle stop. A VM restart ends every process.
- Each start writes the platform's git-check script again, and the repository's `.claude/hooks/git-check-off.sh` turns it off again (`hooks.md`).

A new session is not a process stop. It starts on a fresh machine and cannot resume another session's run. Only its pushed work and the files of the repository carry over.

## Check-ins, for the coordinating session

Check-ins keep the session busy across a long run. Each wake falls inside the main session's one-hour prompt cache, so it reads the cache instead of writing the whole context again. Each turn's end also runs the transcript backup (`hooks.md`).

- Arm all the check-ins of a series in one turn, 45 minutes apart. Use no cron trigger, whose shortest interval is an hour. Do not chain reminders, each check-in arming the next one.
- The scheduler refuses more than about ten trigger creations a minute ("Trigger creation rate limit reached"). If it refuses one, arm the rest a minute later.
- A series ends with its last check-in. If the run outlasts it, have the last check-in arm a whole new series.
- Add one check-in a few minutes after the cap's next stop, 12 h 58 min after the last start. In its message, tell the session to resume what the stop killed.
- After a stop, or when you relaunch a run, delete or re-arm the reminders to fit the run.
- An interrupt of any turn, one that a check-in started included, kills the run's agents. If the curator means to stop the session while agents run, ask them to wait until the turn has ended and about 10 s more, for the backup's pass.

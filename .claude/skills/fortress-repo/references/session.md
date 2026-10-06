# The Claude Code session: the Bash tool, long commands, waits and stops

The main session and all its agents run their commands on one machine, the session's machine. An agent is another Claude that works for the session: an Agent-tool worker or a Workflow agent.

## The Bash tool

- Every Bash call starts a new shell. Variables and shell functions that one call defines are gone in the next call. In an agent, the working directory is also reset. So set up each call again (`build-and-caches.md`, "Setting up each call").
- The Bash tool's timeout is 2 minutes by default and 10 minutes at most. If a call reaches the timeout, the tool cuts it off: it kills the command, or it moves the command to the background, where you must find it again.

## Long commands

If a command can take more than a minute or two, start it in the background with a log, and poll the log. Do not pipe a long command through `tail`: if the Bash tool's time limit stops the command, `tail` shows nothing. Grep the log instead. Put the log under your tree's `tmp/`.

Define the two functions in each call that uses them:

    run_bg () {      # run_bg <logfile> "<command>"
        nohup bash -c "( $2 ) > '$1' 2>&1; echo EXIT=\$? >> '$1'" >/dev/null 2>&1 &
    }
    wait_for () {    # wait_for <logfile> [max seconds, at most 270]; call again until it returns 0
        local n=0 max=${2:-270}
        case "$max" in ''|*[!0-9]*) max=270 ;; esac ; [ "$max" -gt 270 ] && max=270
        while ! grep -q '^EXIT=' "$1" 2>/dev/null ; do
            sleep 5 ; n=$((n+5))
            [ "$n" -ge "$max" ] && { echo "still running after ${n}s" ; return 1 ; }
        done
        grep -n '^BUILD \|^Total time:\|^EXIT=' "$1"
    }

- `run_bg` starts the command detached. It writes the command's output to the log, then a last line `EXIT=<status>`.
- `wait_for` waits for the `EXIT=` line, for 270 s at most. If the line is there, it prints the log's verdict lines and returns 0. If not, it returns 1: call it again, in a new call.

## Waits and the prompt cache

The prompt cache is the API's copy of a conversation's context. For an agent, it lives five minutes. For the main session, it lives one hour. A call inside that time reads the cache and renews it. The first call after a longer wait writes the whole context again. Late in a long task, that is hundreds of thousands of tokens.

- In an agent, keep every wait under 270 s. Do not chain sleeps in one call past that.
- In the main session, keep every wait under an hour. The main session can also watch a run with the `Monitor` tool.

## Sharing the machine

All agents of the session share the machine's cores. If you take a timing that you will keep, run nothing else beside it. The machine's figures are in the `cloud-container` skill.

## Stopping processes

Your tree is the worktree or directory that your work runs in. Stop or kill only the processes that run under its path.

- To find a process's path, read `readlink /proc/<pid>/cwd`, or the paths in its arguments.
- Kill by process id. Do not kill by a script's name across the machine: other agents run copies of the same scripts.
- Do not use `pkill -f <pattern>`. If the pattern is in your own call's command line, it also matches the shell of that call, and it kills your call.

## Interrupts and stops of the process

- An interrupt is a stop of the session's turn (the stop button). It kills every agent that runs in the background at that moment, Workflow agents and Agent-tool workers alike. A message sent while the session is busy kills nothing.
- A stop of the session's process kills every agent. It keeps the conversation, the disk (worktrees, uncommitted edits, logs) and the transcripts. A command started with `nohup`, as `run_bg` starts it, survives a stop of the process. On the cloud platform, it does not survive a restart of the VM (the `cloud-container` skill).

If your work starts again after an interrupt or a stop:

1. Read what is on disk first: `git log` and `git status` in your tree, and your logs.
2. If a log ends with its `EXIT=` line, or its verdict or table is complete, that step is done. Do not run it again, unless the tree changed after the log was written.
3. If a log has no `EXIT=` line yet, its command may still run. Look for its process under your tree's path. If it runs, wait for it. Do not start a second one.
4. Continue at the first step whose log is missing, cut off or failed.

## The automatic permission check

In auto mode, an automatic check approves each step, not the curator. The check refuses some steps, also after the curator approved them in chat. In manual mode, every command of every agent waits for the curator's approval.

If the check refuses a step:

- Do not try for the same result with another tool, by another route or in a later turn.
- Report the refusal and what was not done because of it. The way through belongs to the curator: a switch of the session to manual approval, or an allow rule for the command (`/permissions`).

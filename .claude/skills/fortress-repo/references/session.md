# The Claude Code session: the Bash tool, long commands, waits and stops

## The Bash tool

If a call reaches the Bash tool's timeout, the tool cuts it off. It kills the command, or it moves the command to the background, where you must find it again.

## Long commands

If a command can take more than a minute or two, start it with `run_bg` and poll its log with `wait_for`. Grep the log for the lines that you need. Every Bash call starts a new shell, so define the two functions in each call that uses them:

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

The prompt cache is the API's copy of a conversation's context. It lives five minutes for an agent and one hour for the main session. A call inside that time reads the cache and renews it. The first call after a longer wait writes the whole context again: late in a long task, hundreds of thousands of tokens.

- In an agent, keep every wait under 270 s. Do not chain sleeps in one call past that.
- In the main session, keep every wait under an hour. The main session can also watch a run with the `Monitor` tool.

## Sharing the machine

All agents of the session share the machine's cores. If you take a timing that you will keep, run nothing else beside it. The machine's figures are in the `cloud-container` skill.

## Stopping processes

Stop or kill only the processes that run under your tree's path.

- To find a process's path, read `readlink /proc/<pid>/cwd`, or the paths in its arguments.
- Kill by process id. Other agents run copies of the same scripts, so do not kill by a script's name.
- Do not use `pkill -f <pattern>`. If the pattern is in your own call's command line, it matches that call's shell too, and it kills your call.

## Interrupts and stops of the process

- An interrupt is a stop of the session's turn (the stop button). It kills every agent that runs in the background at that moment, of the Agent tool or of a Workflow. A message sent while the session is busy kills nothing.
- A stop of the session's process kills every agent. It keeps the conversation, the disk (worktrees, uncommitted edits, logs) and the transcripts. A command started with `nohup`, as `run_bg` starts it, survives the stop. On the cloud platform, such a command does not survive a restart of the VM (the `cloud-container` skill).

If your work starts again after an interrupt or a stop:

1. Read what is on disk first: `git log` and `git status` in your tree, and your logs.
2. If a log ends with its `EXIT=` line, or its verdict or table is complete, and the tree has not changed since, that step is done. Do not run it again.
3. If a log has no `EXIT=` line yet, its command may still run. Look for its process under your tree's path. If it runs, wait for it. Do not start a second one.
4. Continue at the first step whose log is missing, cut off or failed.

## The automatic permission check

In auto mode, an automatic check approves each step. It can refuse a step, also a step that the curator approved in chat.

If the check refuses a step:

- Do not try for the same result with another tool, by another route or in a later turn.
- Report the refusal and what was not done because of it. The way through is the curator's: manual approval for the session, or an allow rule for the command (`/permissions`).

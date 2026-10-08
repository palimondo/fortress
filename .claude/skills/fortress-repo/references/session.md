# The Claude Code session: the Bash tool, long commands, waits and stops

**prompt cache**
: API's copy of a conversation's context. It lives five minutes for an agent and one hour for the main session. Each request to the API within that time reads the cache and renews it. The first request after a longer wait writes the whole context again: late in a long task, hundreds of thousands of tokens.

**interrupt**
: Stop of the session's turn, by the stop button. It kills every agent that runs in the background at that moment, of the Agent tool or of a Workflow.

**stop of the process**
: End of the session's Claude Code process. It kills every agent. It keeps the conversation, the transcripts and the disk: worktrees, uncommitted edits and logs. A command started with `nohup`, as `run_bg` (below) starts it, survives a stop, but not a restart of the machine.

**automatic permission check**
: Check that approves each tool call in auto mode. It can refuse a call, also a call that the curator approved in chat.

## The Bash tool and waits

The Bash tool stops a call at 120 s, unless the call passes a longer `timeout`, at most 600 s. It kills the command, or moves it to the background. It also refuses a command that starts with `sleep N` and goes on to another command, such as `sleep 60; tail build.log`. Wait with `wait_for` instead (below).

- In an agent, keep every wait under 270 s.
- In the main session, keep every wait under an hour. The main session can also watch a run with the `Monitor` tool.

## Long commands

Two shell functions run a long command:

- `run_bg` starts the command detached. It writes the output to the log, then a last line `EXIT=<status>`.
- `wait_for` waits for the `EXIT=` line, for 270 s at most. If the line is there, it prints the log's verdict lines and returns 0: ant's `BUILD` and `Total time:`, JUnit's `OK (`, `FAILURES!!!` and `Tests run:`, and `EXIT=`. If not, it returns 1.

If a command can take more than a minute or two, start it with `run_bg`. Then run `wait_for` until it returns 0, each time in a new Bash call. Give that call a `timeout` above 270 s, such as 300000 ms. Grep the log for the lines that you need. Define both functions in each call that uses them, after the setup lines, whose exports the command inherits:

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
        grep -n '^BUILD \|^Total time:\|^OK (\|^FAILURES!!!\|^Tests run:\|^EXIT=' "$1"
    }

## Stopping processes

Stop only the processes that run under your tree's path. To find a process's path, read `readlink /proc/<pid>/cwd`, or the paths in its arguments.

Kill by process id, with `kill <pid>`. A pattern, as in `pkill -f`, also matches other agents' copies of the same scripts, and your own call's shell, which it then kills.

## After an interrupt or a stop of the process

If your work starts again after an interrupt or a stop of the process:

1. Read what is on disk first: `git log` and `git status` in your tree, and your logs.
2. If a step's log has ended and the tree has not changed since, the step is done. A log has ended if it has its `EXIT=` line, or its verdict or table is complete.
3. If a log has no `EXIT=` line yet, its command may still run. Look for its process under your tree's path. If it runs, wait for it with `wait_for`.
4. Continue at the first step whose log is missing, cut off or failed.

## When the automatic permission check refuses a call

- Do not try for the same result with another tool, by another route or in a later turn.
- Report the refusal and what was not done because of it. The way through is the curator's: manual approval for the session, or an allow rule for the command (`/permissions`).

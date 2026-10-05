# Long commands and processes

## The Bash tool's timeout

The Bash tool's timeout is 2 minutes by default and 10 at most. A call that reaches it is cut off: killed, or moved to the background, where it has to be found again. So a command that may run longer starts in the background with a log, and is polled. Never pipe a long command through `tail`: the verdict is at the end, and you would have to run it again to see it. Grep the log instead.

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

`run_bg` starts the command detached and writes its output to the log, then a last line `EXIT=` with its exit status. `wait_for` waits for that line: it prints the log's verdict lines and returns 0 once the line is there, and returns 1 after its maximum otherwise.

## Waiting

Keep each wait inside the prompt cache's life (`agents.md`). An agent polls in steps under 270 s and never chains sleeps in one call past that, or hands the run to a script and ends its turn. The main session, whose cache lives an hour, can also watch a run with the `Monitor` tool.

## Sharing the machine

Every agent of a session runs its commands on the session's machine. Two agents that build at once share its cores. Run nothing else beside a run whose time is to be kept. The cloud platform's machine and its figures are the `cloud-container` skill.

## Stopping processes

Your own tree is the worktree or directory your work runs in. Stop or kill only processes under its path (`readlink /proc/<pid>/cwd`, or the path in their arguments), never by a script's name across the machine: other agents run copies of the same scripts. Kill by process id. `pkill -f <pattern>` also matches the shell running your own call whenever the pattern is in its command line, and kills the call.

## After a stop of the session's process

A command started with `nohup` survives a stop of the session's process (`interrupts-and-resume.md`; on the cloud platform, not a VM restart: the `cloud-container` skill). After a stop, look for it by its log (no `EXIT=` line yet) or by its process before starting it again.

# The machine and long commands

## The machine

- 4 CPUs (Intel Xeon; the clock differs between sessions, 2.1 or 2.8 GHz), about 15 GB of memory, no swap. `nproc`, `free -g` and `/proc/cpuinfo` read them.
- Absolute seconds are not comparable across sessions: the same work has run 40 % slower in another session. Run nothing else beside a run whose time is to be kept.
- Other agents share the machine: two that build share the four cores.

## The disk allowance

`df -h /` misleads. Its Size column is the whole disk, about 250 GB, and most of that is reserved and cannot be written. What the session may use is Used plus Avail, about 37 GB; Use% is taken of that sum. Read the Avail column: it is what is left.

- A full allowance breaks tool output with "no space left on device". Check Avail before a long run, and before seeding worktrees or copying builds.
- What fills it is mostly temporary files the work never deletes. This repository's own culprit, the parser's directories in `/tmp`, and their sweep are in the `fortress-repo` skill (build and caches).
- When it is full: stop your own background processes and delete what you created and no longer need (scratch, build output, private caches, finished worktrees). If that is not enough, commit and push, and tell the curator that this session's allowance is spent: a new session starts on a fresh machine.

## The network

Outbound HTTPS goes through the session's proxy. Some hosts are blocked: `web.archive.org` resets the connection and the proxy refuses `labs.oracle.com`. A research PDF from them is uploaded into the session by the curator. An archived page (not a PDF) can be read through a reader relay, as `research/extracts/fortress-websites-wayback.md` describes.

## Long commands

The Bash tool's timeout is 2 minutes by default and 10 at most. A call that reaches it is cut off: killed, or moved to the background where it has to be found again. So a command that may run longer starts in the background with a log, and is polled. Never pipe a long command through `tail`: the verdict is at the end, and you would have to run it again to see it. Grep the log instead.

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

Keep each wait inside the prompt cache's life (`agents.md`). A subagent polls in steps under 270 s and never chains sleeps in one call past that, or hands the run to a script and ends its turn. The main session, whose cache lives an hour, can also watch a run with the `Monitor` tool.

A command started with `nohup` survives a stop of the session's process (`stops-and-resume.md`). After a stop, look for it by its log (no `EXIT=` line yet) or by its process before starting it again.

## Stopping processes

Stop or kill only processes under your own tree's path (`readlink /proc/<pid>/cwd`, or the path in their arguments), never by a script's name across the machine: other agents run copies of the same scripts. Kill by process id. `pkill -f <pattern>` also matches the shell running your own call whenever the pattern is in its command line, and kills the call.

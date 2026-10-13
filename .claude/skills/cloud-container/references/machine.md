# The machine and the network

## The machine

- 4 CPUs (Intel Xeon, at 2.1 or 2.8 GHz, which differs between sessions), about 15 GB of memory, and no swap. `nproc`, `free -g` and `/proc/cpuinfo` read them.
- Compare no absolute seconds across sessions: the same work has run 40 % slower in another session.
- The Workflow tool runs two agents at a time on this machine. The others wait for a free slot. Two agents that build share the four cores.

## The disk allowance

`df -h /` misleads. Its Size column is the whole disk, about 250 GB, and most of it is reserved and cannot be written. The session may use Used plus Avail, about 37 GB, and Use% is taken of that sum. Read the Avail column: it is what is left.

- When the allowance is full, tool output fails with "no space left on device". Check Avail before a long run, and before you seed worktrees or copy builds.
- Temporary files that the work never deletes fill it. In this repository, they are mostly the parser's folders in `/tmp`. `fortress-repo`'s build-and-caches part gives their sweep.
- When it is full, stop your own background processes (`fortress-repo`'s session part). Delete what you made and no longer need: scratch, build output, private caches, finished worktrees.
- If that is not enough, commit and push, and report that this session's allowance is spent. A new session starts on a fresh machine.

## The network

Outbound HTTPS goes through the session's proxy, which blocks some hosts. `web.archive.org` resets the connection, and the proxy refuses `labs.oracle.com`.

- A research PDF from these hosts reaches the session only as an upload by the curator.
- To read an archived page that is not a PDF, use a reader relay, as `research/extracts/fortress-websites-wayback.md` says.

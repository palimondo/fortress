# Compaction and the permission check

## The compaction hook

A compaction replaces the conversation so far with a summary, to free the context. A `SessionStart` hook with matcher `compact`, in the tracked `.claude/settings.json`, tells the session after every compaction to boot by `explorations/coordinator/README.md` before anything else: to read the project's records in the order that file gives. That boot is the coordinating session's, the main session that keeps the project's records and launches its workers. A worker whose context is compacted re-reads its brief from the first message of its own transcript instead.

## The automatic permission check

- In auto mode a check, not the curator, approves each step. It refuses some steps even after the curator's go in chat: for example moving an earlier run's outputs back over a later run's. A refused outcome is not pursued by another tool, another route or a later turn.
- The way through is the curator's: a switch of the session to manual approval, or a `/permissions` allow rule for the command.
- In manual mode every agent's commands wait for the curator's approval, so nothing runs unattended; auto mode lets a run go on alone.

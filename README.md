# Session transcripts — Fortress revival

This is an **orphan branch** (no shared history with `main`) holding the raw
Claude Code session transcripts of the Fortress modernization work, kept for
later analysis of the engineering and debugging practices used. It never
merges into `main`; the large JSONL blobs live only in this branch's history.

## Layout

```
projects/<project-slug>/<session-id>.jsonl        main session transcript
projects/<project-slug>/<session-id>/subagents/   delegated-agent transcripts
    agent-<id>.jsonl                              each subagent's own transcript
    agent-<id>.meta.json                          prompt, timing, token counts
reports/probe-and-pin.html                        worked example: a narrated
                                                  debugging report generated
                                                  from this very transcript
reports/HOWTO.md                                  how to generate more reports
                                                  in that style
scripts/backup_transcripts.py                     snapshot + redaction filter
scripts/backup.sh                                 unattended commit-and-push
                                                  wrapper (Stop-hook friendly)
```

The project slug is the working directory with `/` → `-`
(`/home/user/fortress` → `-home-user-fortress`), mirroring the layout of
`~/.claude/projects/` so existing transcript tooling works unchanged.

## Reading the JSONL

One JSON record per line, in chronological order. The fields that matter for
analysis:

- `type` — `user`, `assistant`, or bookkeeping records (`summary` marks a
  context compaction: everything before it was replaced by the summary text
  in the live context, though the raw lines remain here).
- `uuid` / `parentUuid` — records form a chain; `parentUuid` points at the
  record this one responds to. Follow it to reconstruct exact turn order.
- `message.content` — the API content blocks: `text`, `thinking`, `tool_use`
  (name + full input), `tool_result` (paired to its call by `tool_use_id`).
  A `tool_use` and its `tool_result` are the ground truth of every command
  run and every output seen.
- `isSidechain` — `true` on records that belong to a delegated subagent
  conversation rather than the main thread.
- `timestamp` — wall-clock UTC; diffing consecutive timestamps gives real
  build/test wait times.

Two kinds of records are **not** verbatim:

1. **Oversized tool outputs.** Results over the harness cap were persisted to
   a `tool-results/` sidecar directory in the container and appear here as a
   `<persisted-output>` stub carrying the file path and a 2 KB preview. The
   sidecar is deliberately not committed — in this session it held only a
   17.5 MB accidental `grep` dump, bulk `git status`/reset listings from the
   graft, and cached page images of the redacted PDF decks (see below). The
   previews preserve what the assistant actually saw truncated in context.
2. **Redactions** (per repo standing rules, applied by
   `scripts/backup_transcripts.py`): pages of copyrighted PDF decks that were
   read during research sessions (the `research/decks/` never-commit policy),
   and the contents of HANDOVER.md. Each removed block is replaced in place
   by a schema-valid text block starting with `[transcript-backup redaction:`
   that states what was removed, its size, and which rule required it.
   Everything else — prompts, thinking, tool calls, outputs, errors, model
   metadata — is byte-for-byte as recorded.

## Keeping it up to date

`scripts/backup.sh` snapshots all transcripts, commits when anything changed,
and pushes with retry; it is silent, lock-guarded, and always exits 0, so it
can run on every turn as a Claude Code **Stop hook**. The container is
ephemeral — in a fresh session, re-arm with:

```bash
git -C /home/user/fortress worktree add /home/user/fortress-transcripts transcripts
/home/user/fortress-transcripts/scripts/backup.sh   # manual snapshot
```

and (optionally) register `backup.sh` as a Stop hook in
`~/.claude/settings.json` for automatic per-turn snapshots:

```json
{"hooks": {"Stop": [{"hooks": [{"type": "command",
  "command": "/home/user/fortress-transcripts/scripts/backup.sh"}]}]}}
```

Set `KEEP_HANDOVER=1` in the environment to disable the HANDOVER.md
redaction. Snapshot commits are timestamped; because unredacted lines are
copied verbatim and the file is append-mostly, consecutive snapshots diff as
clean appends and push cheaply as deltas.

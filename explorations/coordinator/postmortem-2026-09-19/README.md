# Post-mortem indices for the coordinating session, 2026-09-19 06:38 UTC .. 2026-09-20 05:32 UTC

Built 2026-09-20 by the post-mortem analyst from the live transcript
`/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`
(53.7 MB, 7,750 records, 2026-09-08 .. 2026-09-20) and the session's `subagents/` directory.
Nothing here is committed; the directory is under `tmp/`, which is gitignored.

## The region

From the compaction of 2026-09-19 06:38:20.976 UTC (the summary record; the boundary
record is 2 ms later) to the compaction boundary of 2026-09-20 05:32:47.771 UTC, the one
that immediately precedes Pavol's "Hello coordinator! How are you feeling post compaction?"
(05:33:36). Both boundary records are inside the range. Compaction boundaries inside the
region, with the context size the harness recorded before each (`compactMetadata.preTokens`):

| boundary (UTC)        | context before | summary after | first API call after |
|-----------------------|---------------:|--------------:|---------------------:|
| 2026-09-19 06:38:20   | 273,551 tokens | 16,659 chars  |  74,346 tokens |
| 2026-09-19 09:47:25   | 436,175 tokens | 21,856 chars  |  74,072 tokens |
| 2026-09-19 17:06:26   | 416,266 tokens | 26,542 chars  |  69,243 tokens |
| 2026-09-20 05:32:47   | 350,420 tokens | 20,515 chars  |  75,598 tokens |

All four were manual (`/compact`). The two just outside the region are 2026-09-18 18:38:28
(656,249 before) and 22:54:25 (312,505 before); `compactions.md` lists all six.

## Files

| file | what it is |
|---|---|
| `parse.py` | The streaming parser. Regenerates every index below from the transcript for any time range; usage at the top of the file. One pass over the file, nothing printed but a tally. |
| `turns.tsv` | One row per timestamped record in the region, in file order: timestamp, type, kind, turn number, API-call number, size in characters, output tokens (assistant records, once per API call), first 100 characters. 1,544 rows. |
| `user-messages.md` | Section A: the 43 messages Pavol typed, verbatim, numbered, with timestamp and turn. Section B: the 107 harness-generated inputs, verbatim (scheduled check-ins, task notifications, workers' hand-back messages, stop-hook text, compaction summaries, slash commands and their output, system reminders). |
| `assistant-text.md` | Every assistant text block (146) verbatim, with timestamp, turn and API-call number. Thinking blocks are counted in `turns.tsv` but not reproduced. |
| `tool-calls.tsv` | One row per tool call (237): timestamp, turn, API call, tool, description or first argument (200 chars), input size, duration, result size the model saw, whether the harness persisted the result to a file (stub in context) or cut characters out of its middle, whether the command lists a directory, how many `ls -l` entries the result carries, agent/run id, status, result head. |
| `context.tsv` | One row per API call (267): timestamp, turn, input / cache-read / cache-creation / output tokens, context size (their sum), delta from the previous call, stop reason; a marker row at each compaction boundary. |
| `compactions.md` | Every compaction boundary in the whole transcript: context before, summary size, context at the first call after, Pavol's first message after, the first ten tool calls after. |
| `agents.md` | Every Agent and Workflow launch in the region (19 + 3): id, model, brief size and first line, the task notifications and the hand-back message that answered it, the transcript file's size, record count, time span and output tokens (from `subagents/`, by id). |
| `boots.md` | The first turn after each compaction, call by call, with result sizes, listing flags, and the context size at each API call; totals per boot. This is where the 17:06 boot is measured. |
| `array-work-brief.md` | Question 1's tree-side half: what the array work changed, file by file, with the precedent line for each library change, the tests that gate it, what was only written down, what was measured, and what is still unruled. |
| `array-thread.md` | **Question 1.** Pavol's messages on the array thread from 12:00 verbatim; then every commit in the six array paths with what he was told before it, whether a diff or design was shown, and whether an explicit go preceded it; then the done/committed-versus-document answer. |
| `decision-lists.md` | **Question 2.** The seventeen lists of decisions or options put to him in the region, item by item, each classified his / coordinator's / mixed, with his reaction quoted, and the counts. |
| `script-vs-tactics.md` | **Question 3.** One timeline with the batch-2 process and script work beside the array and `nat` turn, then the order stated plainly and the costs of both threads in agents, minutes and tokens. |
| `review-patterns.md` | **Question 4.** Fifteen review shapes this project has used, each in one line with what it was given, what it returned, when it ran, and what Pavol did with the result. |
| `_get.py` | Helper used to pull a numbered message or assistant block out of the indices; `python3 _get.py u 22,27` or `a 141` or `alist <from> <to>`. |
| `_prior/` | The same indices regenerated for 2026-09-18 00:00 .. 2026-09-19 06:38, used for question 4's "earlier in the same file". |
| `_array-msgs.txt`, `_array-assistant.txt`, `_lists-scan.txt`, `_probe3.txt` | Raw pulls from the first pass; superseded by the four files above, kept for checking. |
| `probe1.txt`, `probe2.txt` | Scratch output from the discovery probes that established the record format; safe to delete. |

## How it was made

`parse.py` streams the JSONL once. It reads every record's `type` (`user`, `assistant`,
`system`, `attachment`; the six other types carry no timestamp and are skipped) and decides a
kind for the `user` records from their fields: `isCompactSummary`; `origin.kind` (`human`,
`task-notification`, `peer`); the first characters of the text for the harness's own
messages (`Stop hook feedback`, `<command-name>`, `<local-command-stdout>`,
`<local-command-caveat>`, `<system-reminder>`, `[Image:`, `[Request interrupted`). A
`task-notification` whose body says `<task-type>queued-remote-notifications</task-type>` is a
`send_later` check-in firing, called `scheduled trigger`. A `peer` message is a worker's
hand-back (`agent message`). Tool results are joined to their tool_use by id; the harness's
`toolUseResult` field supplies the persisted-output path and size, the agent id and model
for an Agent launch, and the run id for a Workflow launch.

A turn, for the `turn` column, starts at every user record that is a typed message, a
scheduled trigger, a task notification, a worker's message, a compaction summary or an
interrupt. An API call is a distinct assistant `message.id`; the harness repeats the same
usage block on each content block of a call, so usage is counted once per id. Context size
at a call is input + cache-read + cache-creation tokens.

To regenerate for another range:

    python3 parse.py --transcript <session>.jsonl --from <ISO> --to <ISO> \
        --subagents <session dir>/subagents --out <dir>

## Known limits

- Tokens are known only per API call (from `usage`). Everything else is measured in
  characters as stored. The one measured ratio: at the 17:07:09 call, 28,410 cache-creation
  tokens covered 68,856 characters of tool results plus the previous call's 782 output
  tokens, about 2.5 characters per token for that batch of markdown and `ls` output.
- The `chars` of a tool result is what the model saw. When the harness persisted the output
  to a file, the model saw a stub of about 2,000 characters and the full size is in the
  `persisted` column; when the harness cut the middle out, the cut size is in
  `harness_cut_chars` and the stored text already lacks it.
- Attachment rows record what the harness rendered (`rendered`), by type. They are the
  harness's system-reminder injections (task reminders, total-token reminders, batching
  reminders, file-change notices); `prompt_snapshot` and `deferred_tools_record` are records
  of the system prompt and tool catalogue, not per-turn injections. Whether a given
  attachment reached the model in a given call is not asserted here; the API-call token
  deltas in `context.tsv` are the ground truth for what entered.
- `hook summary (UI record)` and `local command (UI record)` system rows are UI-level;
  what the model saw of the stop hook is the `stop hook` user rows.
- Durations are result timestamp minus call timestamp. A background Agent's result is its
  launch acknowledgement, so its duration is not its run time; the run time is in
  `agents.md` from the agent's own transcript.
- File order is not strictly timestamp order: a compaction summary record is written a
  few seconds after the `/compact` command record but sits before it in the file.
  `turns.tsv` keeps file order; sort by the first column for time order.
- The subagent transcripts were opened only to count records and sum output tokens; no
  worker transcript was read. The live run `wf_d1628adb-2ee` (launched 05:29:38) was
  only listed by size.

## Model names

The exact model identifiers read from the transcripts are written here by tier name: the coordinator's tier as Fable, the workers' tier as Opus (the `[1m]` context-window suffix dropped). The originals are in the transcripts on the `transcripts-blinded` branch. This follows the reading of protocol §4 recorded in POSITIONS on 2026-09-20.

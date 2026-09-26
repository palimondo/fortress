# Interrupt archaeology: what actually happened at each event

Method: read the main session transcript(s) and the matching `subagents/workflows/<run>/`
directories (`journal.jsonl`, `agent-*.jsonl`) directly with `grep -n` / bounded `python3`
excerpts — never the whole file. Two sources:

- Live session `fe616d40-a9c6-56d7-9da1-7168a172765d`, on disk at
  `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`
  (main transcript) and `.../fe616d40-.../subagents/workflows/<run>/` (workflow dirs).
  This is the container that recovered the 2026-09-17 incident, so its Stop-hook backup
  goes to `transcripts-blinded`, not `transcripts` — confirmed: this session's own snapshot
  is at `transcripts-blinded:projects/-home-user-fortress/fe616d40-....jsonl.parts/`.
- Archived session `bdff267d-67dc-5bb9-b970-8c3dfaa634b6` on the `transcripts` branch,
  materialised read-only at `/home/user/fortress-transcripts/projects/-home-user-fortress/`
  (existing worktree, not created by me; only read from it, nothing written/staged/checked out).

No file in `/home/user/fortress` or any of its worktrees was written, staged, committed or
checked out in the course of this investigation.

## Event 1 — 2026-09-17, run `wf_73833dfb-d25`, two `/compact`s (session `bdff267d`)

Source: `transcripts` branch, `bdff267d-....jsonl.parts/001.jsonl`.

- Line 12910-12911: `Workflow` tool_use `{'scriptPath': '.../ladder-workflow.js', 'args':
  {'maxRungs': 8}}` at **06:00:55.343Z**, tool_result at **06:00:57.311Z**: `"Workflow
  launched in background. Task ID: w68oxu6cy ... Climb the compile-path ladder..."` — this
  is run `wf_73833dfb-d25`.
- Line 12946: `"subtype":"compact_boundary"`, `"timestamp":"2026-09-17T10:47:33.783Z"`,
  `"compactMetadata":{"trigger":"manual","preTokens":442504,...,"durationMs":129688}`
  (≈130 s). Preceded (line ~12944) by the literal `<command-name>/compact</command-name>`
  local-command block at 10:45:24.095Z. Immediately after the boundary, at 10:47:34.203Z,
  Pavol asks (a normal turn, not an interrupt): "Extra brief status report of the
  ladder-workflow progress?" — the coordinator answers by reading `git log`/the workflow
  dir, i.e. business as usual.
- Line 14063: second `compact_boundary`, `"timestamp":"2026-09-17T14:25:25.154Z"`,
  `"trigger":"manual"`, `"preTokens":177831`, `"durationMs":152959` (≈153 s).
- Line 14098-14100: a `task-notification` queued at **14:39:09.591Z**,
  `<tool-use-id>toolu_01KF4F669txiapiBjVunGRRa</tool-use-id>` (the same tool_use id as the
  06:00:55 launch), `<task-id>w68oxu6cy</task-id>`, `<status>completed</status>`, result JSON
  beginning `{"baselinePass":59,"rungs":[{"rung":1,"name":"rung1-equality","commit":
  "1bd8d3ad1",...},{"rung":2,...` — the run's own completion payload, i.e. it ran to
  completion through both compactions.

**Finding:** confirms the record. Both `/compact` boundaries are manual, issued between
turns (immediately preceded by the literal `/compact` command and immediately followed by an
ordinary new turn, not an interrupt marker), and the workflow's own completion notification
carries a populated `rungs` array. Nothing about this event is in dispute.

## Event 2 — 2026-09-19 ~07:46:42, run `wf_a29fd04b-a9a` (climb batch 1, check-in)

Source: live session, main transcript lines 5208-5217; workflow dir
`subagents/workflows/wf_a29fd04b-a9a/`.

**Main transcript** (`fe616d40-....jsonl`):
- Line 5208-5209: `queue-operation` enqueue/dequeue of a scheduled-trigger notification at
  **07:46:30.704-707Z** ("1 unread notification (scheduled trigger...)").
- Line 5210: the notification delivered as a normal user turn at 07:46:30.722Z.
- Line 5211-5212: assistant calls `ReadNotifications` (07:46:36.221Z); tool_result
  (07:46:36.235Z) is the check-in body: *"Check-in on climb batch 1 ... fired at Sat
  2026-09-19 07:46:30 UTC."*
- Line 5216: assistant `thinking` block, empty content, at **07:46:38.697Z** (no tool_use
  emitted yet).
- **Line 5217**: `{"type":"text","text":"[Request interrupted by user]"}`,
  `"timestamp":"2026-09-19T07:46:42.118Z"` — 11.4 s after the check-in fired, mid-thinking,
  with **no tool call in flight** and **no queue-operation immediately before it** (contrast
  with event 4 below, where every genuine message is preceded by an enqueue/dequeue pair).
- Line 5218-5220: the *next* real user turn is a fresh message ("On re-reviewing the
  repair...") delivered **almost two minutes later**, at 07:48:34.100-148Z, with its own
  enqueue/dequeue pair — i.e. a distinct, later event, not the same one that killed the run.

**Workflow dir** `subagents/workflows/wf_a29fd04b-a9a/`:
- `journal.jsonl` (3 lines total): `{"type":"launched"}`, then two `{"type":"started",...,
  "label":"rung:F",...}` / `"label":"rung:M",...}` lines. No `result` line for either agent —
  the journal never advances past `started`.
- `agent-ac7563d634a94a1d5.jsonl` (rung:F), last two lines: an assistant text ending "Rung F
  is landed and pushed. Everything is verified." at 07:45:41.911Z, then
  `{"type":"user","message":{"content":[{"type":"text","text":"[Request interrupted by
  user]"}]}}`, **timestamp `2026-09-19T07:46:42.118Z`** — identical to the millisecond in the
  main transcript.
- `agent-acdf459048ff1d241.jsonl` (rung:M), same pattern, same timestamp
  `2026-09-19T07:46:42.118Z`.

**Finding:** a genuine harness-level interrupt (plain "[Request interrupted by user]", no
tool involved) hit the main turn and both rung agents at the exact same millisecond, 11 s
into a check-in turn, with the coordinator still "thinking" and no message text anywhere
near that timestamp. This matches the FACTS.md account for this date.

## Event 3 — 2026-09-26 ~12:07:47, run `wf_eb47c103-304` (batch 5, first run)

Source: live session, main transcript lines 20405-20436; workflow dir
`subagents/workflows/wf_eb47c103-304/`.

**Main transcript:**
- Line 20407: real user message `"Yes, agreed."` at **12:07:33.636Z** (a deliberate answer,
  already consumed by the turn).
- Line 20409-20410: assistant `thinking` then a `Bash` `tool_use` at **12:07:46.993Z** whose
  command appends "answer 9" to `POSITIONS.md`, `git commit`, then `git push origin main`
  and `git push origin main:claude/worker-brief-fable-vnnuv8` (a decision-recording commit,
  not a check-in — matching FACTS.md's description of what the turn was doing).
- **Line 20411**: tool_result, `"timestamp":"2026-09-26T12:07:47.797Z"`, content: *"The user
  doesn't want to proceed with this tool use. The tool use was rejected... STOP what you are
  doing..."*, `"toolUseResult":"User rejected tool use"`, `"toolDenialKind":"user-rejected"`.
- **Line 20412**: immediately next, `{"type":"text","text":"[Request interrupted by
  user]"}`, `"timestamp":"2026-09-26T12:07:47.799Z"` — 2 ms after the rejection.
- Line 20413-20415: the *next* real message from Pavol, `"Agreed, the judgement's
  recommendation."`, arrives **45 seconds later**, at 12:08:32.167-187Z, with its own
  enqueue/dequeue pair. **No message of any kind is present at 12:07:47.**
- `"toolDenialKind":"user-rejected"` occurs **exactly once** in this entire session's live
  transcript (checked by grepping every `toolDenialKind` value in the file); the other 7
  occurrences are all `"automode-blocked"` (the auto-mode classifier refusing a command),
  an unrelated mechanism.

**Workflow dir** `subagents/workflows/wf_eb47c103-304/`:
- `journal.jsonl` (3 lines): `launched`, `started rung:Z` (agent `acc08abede13f8ffb`),
  `started rung:D` (agent `a1450ad4d12434dcf`). No `result` line for either.
- `agent-a1450ad4d12434dcf.jsonl` (rung:D), last two entries: a tool_result
  `"toolUseResult":"User rejected tool use"`, `"toolDenialKind":"user-rejected"`,
  `"timestamp":"2026-09-26T12:07:47.860Z"`; then `{"text":"[Request interrupted by user for
  tool use]"}`, `"timestamp":"2026-09-26T12:07:47.860Z"`.
- `agent-acc08abede13f8ffb.jsonl` (rung:Z), same pattern:
  `"toolUseResult":"User rejected tool use"` at `12:07:47.875Z`, then `"[Request interrupted
  by user for tool use]"` at `12:07:47.880Z`.
- In the coordinator's own follow-up turn (line 20431, tool_result at 12:08:46.623Z) it ran
  `ps -eo pid,etime,args` and found the rung agents' own OS-level background processes still
  alive as orphans — a `bash -c` wrapping `count-run.sh` at `37:37` elapsed and two `java`
  processes at `07:47` elapsed — i.e. the shell/JVM processes the agents had started kept
  running on the box after the agents themselves were gone; only the agent loop (and the
  journal) died.

**Finding:** at 12:07:47, three things were rejected in the same second: the coordinator's
own pending `Bash` (commit+push) tool call, and each rung agent's own pending tool call —
all recorded with `toolUseResult: "User rejected tool use"` / `toolDenialKind:
"user-rejected"`, immediately followed by `[Request interrupted ... for tool use]`. This is
the tool-permission-denial form of interrupt, not a message: no user text is present at or
near 12:07:47 (the nearest real messages are 14 s before and 45 s after, both already
accounted for). **This directly contradicts the FACTS.md wording that "a message from
Pavol... interrupted a turn"** — the transcript shows a rejected/interrupted in-flight tool
call, the same class of event that killed the 2026-09-19 run (event 2), not a delivered
message (contrast with event 4's `queued_command` mechanism below, which never rejects a
tool and never emits an interrupt marker). This is consistent with the user's own suspicion
of an accidental stop/deny tap on the mobile client, though the transcript format itself
records the *effect* (a rejected tool + an interrupt marker), not the UI action that caused
it, so "stop button" cannot be asserted from the transcript alone — only that it was **not**
a message.

## Event 4 — 2026-09-26 ~16:13, run `wf_88172730-ebe` (batch 5, gather)

Source: live session, main transcript lines ~21270-21300; workflow dir
`subagents/workflows/wf_88172730-ebe/`, gather agent `agent-aaeeca78137768b5b.jsonl`.

**Main transcript:**
- Line 21278: `"attachment":{"type":"queued_command",...,"commandMode":"task-notification",
  "timestamp":"2026-09-26T16:12:51.611Z"}` — a background-agent completion notification,
  explicitly tagged `[SYSTEM NOTIFICATION - NOT USER INPUT]`.
- **Line 21279**: `"attachment":{"type":"queued_command","prompt":"Okay, so it just sounds
  like we had a rule too stringent... do the A. Push it. Commit and push it. We are not
  holding this.","origin":{"kind":"human"},"timestamp":"2026-09-26T16:13:08.785Z",
  "humanTurn":true}`, rendered as: *"The user sent a new message while you were working: ...
  This is how Claude Code surfaces messages the user sends mid-turn — within the running
  turn, often alongside the next tool result, rather than as a separate conversation turn.
  Address the message above as you continue this turn."*
- Surrounding turn: the coordinator's assistant `tool_use` immediately before (12:13:10.383Z,
  a `Bash` checking `date`/`git log`) and its `tool_result` at 16:13:11.607Z carry both queued
  attachments (16:12:51 and 16:13:08) attached to that same tool_result — exactly the
  "alongside the next tool result" delivery the system-reminder describes. The coordinator's
  next assistant turns (16:13:13.953Z thinking, 16:13:16.181Z Bash checking the workflow
  journal, 16:13:21.888Z Bash reading an agent transcript, 16:13:43.950Z Bash …) run
  continuously with no gap and **no interrupt marker anywhere in this window**.

**Workflow dir / gather agent** `agent-aaeeca78137768b5b.jsonl` (`workflowPhase: "Gather"`):
walked every timestamped line from 16:10:00 to 16:16:54; the sequence of
`assistant(tool_use) → user(tool_result) → attachment → attachment → assistant(thinking)` repeats
unbroken straight through 16:13:08.785Z (the message's timestamp) — e.g. lines land at
16:13:02.245Z, 16:13:09.619Z, 16:13:14.378Z, 16:13:21.539Z, 16:13:28.558Z with no pause and no
interrupt text anywhere in this file. `journal.jsonl` for this run shows the gather agent's
`result` line (a long structured result composing `REPORT.md`/`record.md`/`SKEPTIC.md`,
landing commits `e893a3e00`, `3924e7ec3`, `0b1881317`, `601f52736`) followed immediately by
`started` lines for `gate` (agent `aefaeab12a247e11a`) and `review`
(agent `a125db2578cff4c30`) — i.e. the run **continued past the gather and into the next two
phases** after 16:13.

**Finding:** confirms the FACTS.md framing exactly as stated in the question: the message
was surfaced inside the running turn via the `queued_command`/"sent a new message while you
were working" mechanism, no tool call was rejected, no interrupt marker appears anywhere,
and the gather agent (and the run generally) kept working uninterrupted, later starting `gate`
and `review`. This is the clean contrast case: a message delivered mid-turn does **not**
kill a running Workflow's agents.

## Other instances found (main-session interrupts, checked against Workflow spans)

Searching the whole live transcript for genuine top-level interrupt markers (content exactly
`[{"type":"text","text":"[Request interrupted by user...]"}]`, `isSidechain` false) found, in
addition to events 2 and 3:

| line | timestamp (UTC) |
|---|---|
| 10360 | 2026-09-21T21:38:23.769Z |
| 10911 | 2026-09-22T07:18:51.598Z |
| 16164 / 16724 | 2026-09-25T22:31:59.520Z (duplicate entry, same instant) |
| 19082 | 2026-09-26T08:20:06.603Z |

Cross-checked against every `subagents/workflows/wf_*` directory's agent-file mtimes (first
and last record per run):

- `wf_3b5a273c-a80`: 09-19 08:38 – 11:44
- `wf_d1628adb-2ee`: 09-20 06:10 – 10:45
- `wf_776d7c2c-6c3`: 09-22 19:32 – 09-23 01:31
- `wf_207012c9-0ef`: 09-24 00:43 – 04:50
- `wf_f54d0e4b-63d`: 09-26 02:54 – 07:04
- `wf_88172730-ebe`: 09-26 ~12:12 – 16:28 (event 4's run)

None of the four extra interrupt timestamps above falls inside any run's span (21-Sep and
22-Sep-morning interrupts fall in the gap between `wf_3b5a273c-a80` and `wf_d1628adb-2ee`/
`wf_776d7c2c-6c3`; the two 25-Sep-night and 26-Sep-08:20 interrupts fall in the gap between
`wf_207012c9-0ef` (ends 04:50 on 09-24) and `wf_f54d0e4b-63d` (starts 02:54 on 09-26)). So no
additional case of an interrupt coinciding with a live Workflow run was found beyond events 2
and 3.

## Does the transcript format distinguish a stop from a message?

Yes, but only as two different *mechanisms*, not as a labelled "stop button" event:

- **A message delivered mid-turn** (no kill): an `attachment` of `"type":"queued_command"`
  with `"origin":{"kind":"human"}` and `"humanTurn":true`, rendered into the transcript as a
  `system-reminder` beginning *"The user sent a new message while you were working: ...
  Address the message above as you continue this turn."* No tool is rejected, no
  `[Request interrupted...]` text appears, and the running turn (and any Workflow agents)
  continue. Example: event 4, line 21279, 2026-09-26T16:13:08.785Z.

- **An interrupt** (kills every open turn, main and sidechain, at once): a `user` message
  whose content is *only* `{"type":"text","text":"[Request interrupted by user]"}` (if no
  tool call was pending) or `{"type":"text","text":"[Request interrupted by user for tool
  use]"}` immediately after a tool_result of `"toolUseResult":"User rejected tool use"`,
  `"toolDenialKind":"user-rejected"` (if a tool call needed confirmation). No message text
  accompanies either form. Examples: event 2 (plain form, line 5217) and event 3
  (tool-use-denial form, lines 20411-20412 and both rung agents' transcripts).

The transcript never records a UI-level label such as "stop button pressed" or "iOS tap" —
only these two effects. What the evidence rules out is that a *message* was responsible for
events 2 and 3: both are structurally identical to each other (simultaneous marker across the
main turn and every live sidechain agent, no message text within tens of seconds either side)
and structurally distinct from event 4 (a `queued_command` attachment, no rejected tool, no
marker, no effect on the running agents).

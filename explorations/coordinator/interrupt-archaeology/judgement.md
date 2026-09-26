# Judgement: what kills a running Workflow's agents

Judged 2026-09-26 against `interrupt-archaeology/evidence.md`, with every deciding claim
re-checked in the transcripts (session `fe616d40`: live main transcript,
`subagents/agent-*.jsonl`, `subagents/workflows/wf_*/`; session `bdff267d`: `transcripts`
branch, `001.jsonl`). Nothing in `/home/user/fortress` or its worktrees was written.

## 1. Finding

**A turn interrupt kills them, and a message does not.** The interrupt is what the transcript
records as `[Request interrupted by user]`. It kills every background agent in the session at
that instant, and this has held every time it was checked. A message typed while a turn is in
flight is queued and killed nothing, in every case on record. A manual compaction issued
between turns has never killed a run.

| what | cases with background agents alive | agents killed |
|---|---|---|
| turn interrupt | 4: 09-19 07:46:42, 09-22 07:18:51, 09-25 22:31:59, 09-26 12:07:47 | all 7 alive (2 Workflow agents, 2 Agent-tool workers, 1 Agent-tool worker, 2 Workflow agents), each transcript ending on the interrupt marker at the main marker's instant |
| message sent while the coordinator was busy | 11 messages and 3 `/context` commands during 5 live runs, 09-19 to 09-26 | none; every run finished with a result for every agent (`wf_88172730-ebe` still running, 10 of 12 results) |
| manual `/compact` between turns | 5: 09-17 10:47 and 14:25 (`bdff267d`), 09-19 09:47, 09-20 05:32, 09-26 12:26 | none; in this container the agents wrote 40 to 66 records inside each compaction window |

The eleven messages: 09-19 09:22:00 and 09:31:46 (`wf_3b5a273c-a80`); 09-20 06:34:24 and
06:45:39 (`wf_d1628adb-2ee`); 09-22 21:48:12 (`wf_776d7c2c-6c3`); 09-26 01:32:30, 01:33:26 and
01:52:55 (`wf_f54d0e4b-63d`); 09-26 12:25:18 (sent during a compaction), 12:26:41 and 16:13:08
(`wf_88172730-ebe`). Each was enqueued while the coordinator was still busy. It was then
delivered in one of two ways. Most were held until the turn ended and became the next turn,
10 to 102 s later. The 16:13:08 message was delivered inside the running turn, as the
"sent a new message while you were working" attachment. Two of these runs used the same
harness version as a death: 2.1.278 on 09-19 and 09-20, and 2.1.283 on 09-26.

The two deaths had no message:
- **09-19 07:46:42.118.** The check-in turn was 11 s old and still thinking. No message was
  enqueued until 07:48:34, 112 s later.
- **09-26 12:07:47.797/.799.** The coordinator's commit-and-push Bash is recorded
  `"User rejected tool use"`, followed by the interrupt marker. The messages on either side
  are "Yes, agreed." (12:07:33, already delivered) and "Agreed, the judgement's
  recommendation." (12:08:32, 45 s later).

At 12:07:47 rung D's Bash had been running for 2 min 14 s (issued 12:05:33) when it was
recorded "user-rejected". That label is therefore how an interrupt records a tool still in
flight. It is not a separate reply to a permission prompt.

The interrupt also kills background `Agent`-tool workers. On 09-22 two workers died at
07:18:51.590, 8 ms before the main marker. On 09-25 one worker died at 22:31:59.520. At
22:32:42 Pavol wrote: "I accident stopped you, while I was trying to stop text-to-speech."

## 2. How sure, and what the transcripts cannot tell

- **That a message does not kill a run: sure.** There are 11 messages, 10 of them on the same
  harness versions as the deaths (2.1.278, 2.1.283), and neither death has a message nearby. The 09-26 death has the
  nearest one, 14 s before (already delivered) and 45 s after.
- **That the interrupt kills every background agent, Workflow or Agent-tool: sure.** All 7
  agents alive at an interrupt died with it. No agent ever survived one.
- **That the stop button sent the interrupt: likely, not proven.**
  - 09-25: the stop is confirmed in Pavol's own words, and it killed a worker.
  - 09-26 12:07: Pavol asked at 12:09:28 "Did I accidentally press stop?!?" and at 12:10:46
    said the iOS client puts the stop button in the bottom right corner, where it fires under
    his right thumb.
  - 09-19: Pavol said at 09:05 that he had not interrupted. An accidental tap would fit the
    09-26 description, but nothing shows it.
- **What the transcripts record, and what they don't.** They record the effect, the interrupt
  marker and a rejected in-flight tool. They do not record which control sent it, or whether
  any client control other than the stop button sends the same interrupt.
  - One case leaves this open: 09-26 08:20:06. A message had been queued since 08:19:40. The
    interrupt came 26 s later, during the transcript-backup Stop hook, and cancelled that
    hook (`hook_cancelled`, the only one on record). No run was alive.
- **Not tested:** an automatic compaction mid-turn (every compaction on record is manual); an
  interrupt during the Stop hook while a run is alive.

## 3. Where the error came from

At 09:06 on 09-19 the coordinator answered Pavol's "I didn't interrupt you" with "You did not
press anything. On this client a message that lands while a turn is in flight cuts that turn to
deliver itself". The timestamps contradict this, because his message came 112 s after the
interrupt. The claim then entered POSITIONS on 09-20 (`238a61fc8`).

On 09-26 the same inference was committed at 12:09:37 (`a8e035c2d`). That was 9 s after
Pavol's stop-button question and before his 12:10:46 explanation, which the coordinator
accepted at 12:10:56 ("That explains it"). The FACTS entry kept the message version.

## 4. Corrections

Append each correction as written below. Leave the old text in place.

**`explorations/coordinator/FACTS.md:139`**, append:
> Corrected 2026-09-26: this entry said "the Agent tool's workers are not affected"; a background `Agent`-tool worker alive at an interrupt dies with it at the same instant (two at 2026-09-22 07:18:51, one at 2026-09-25 22:31:59 after a stop Pavol reported pressing by accident), and the review worker cited was launched after the interrupt, so it tested nothing; no message caused this death (none was enqueued between the check-in at 07:46:30 and Pavol's next message at 07:48:34, and at 09:05 he said he had pressed nothing); rung F had written its closing text at 07:45:41 without returning its result, so only M was mid-work; the rule covers every turn, not only a check-in (session `fe616d40`, main transcript and `subagents/`).

**`explorations/coordinator/FACTS.md:140`**, append:
> Corrected 2026-09-26: no message caused this death; it was an interrupt, as on 09-19: the turn's pending Bash is recorded "User rejected tool use" at 12:07:47.797 and "[Request interrupted by user]" at .799, and no message was enqueued between "Yes, agreed." (12:07:33, already delivered) and the next one at 12:08:32; at 12:09 Pavol asked whether he had pressed stop by accident and at 12:10 named the iOS stop button under his right thumb. A message sent during a turn is queued, not an interrupt: it is delivered inside the turn (16:13:08 the same day, with `wf_88172730-ebe` working on) or as the next turn, and eleven such messages during live runs from 09-19 to 09-26 killed none. The launch advice that messages are safe was right; this entry's headline, "his message interrupted a turn" and "a message is safe only while the coordinator is idle" are wrong (session `fe616d40`, main transcript 12:07:33-12:10:46 and 16:13:08; `subagents/workflows/wf_eb47c103-304/`).

**`explorations/coordinator/FACTS.md:141`**, append:
> Corrected 2026-09-26: "never send during a turn" is wrong, since a message sent during a turn is queued and kills nothing (the entry above, corrected); and the caveat is closed: three manual compactions in this container fell inside live runs, 09-19 09:47 (`wf_3b5a273c-a80`), 09-20 05:32 (`wf_d1628adb-2ee`) and 09-26 12:26 (`wf_88172730-ebe`), and each run's agents kept writing through the compaction (40 to 66 records inside its window) and went on to their results (session `fe616d40`, `subagents/workflows/`).

**`explorations/coordinator/POSITIONS.md:64`**, append (his position stands; only the bracketed reason is a fact, and it is wrong):
> Corrected 2026-09-26: the bracketed reason is wrong; a message during a turn is queued and does not interrupt it, and what killed the runs of 09-19 and 09-26 was an interrupt of the turn, the second very likely the iOS stop button (FACTS § The container, corrected); whether he still wants the check-in times is his to say.

**`explorations/coordinator/remote-container.md:187-188 and 199-201`**. The first passage says "An `Agent`-tool worker launched afterwards was unaffected": true, but it implies an immunity that does not exist. The second says "do not send while a turn is in flight", which is wrong. Append after line 201:
> *Corrected 2026-09-26:* the interrupt is not a message. What stops a turn, and every background agent with it, Workflow agents and background `Agent`-tool workers alike (two workers at 2026-09-22 07:18:51, one at 2026-09-25 22:31:59), is the interrupt the transcript records as "[Request interrupted by user]"; on 2026-09-26 at 12:07:47 it was very likely the iOS stop button. A message sent while a turn is in flight is queued, delivered inside the turn or as the next turn, and in eleven cases from 09-19 to 09-26 it cut no turn and killed no run. So while a batch runs: send whenever; compact between turns; do not press stop in any turn, not only a check-in.

**`explorations/coordinator/postmortem-2026-09-19/held-list.md:7`**. The parenthesis says "a Workflow run is what a mid-turn interrupt kills", which is overstated. Append:
> Corrected 2026-09-26: a mid-turn interrupt kills background Agent-tool workers too (2026-09-22 07:18:51, 2026-09-25 22:31:59); a message kills neither.

These need no change: `FACTS-history.md:238` and `microgpt-run-c-handover-history.md:127`, which both say "mid-turn interrupt". `protocol.md` does not state the rule.

## 5. The rule for Pavol

Send messages whenever you like while a batch runs, check-in or not. A message waits its turn
and never stops the coordinator or any worker. Compacting between turns is safe too.

What kills the batch is stopping a turn. Stopping any turn kills every batch agent and
background worker in the session. So while the session shows it is working, keep your thumb
off the stop control. That includes about 13 s after each reply appears, while the transcript
backup runs. If you hit stop by accident, say so at once so the batch can be relaunched.

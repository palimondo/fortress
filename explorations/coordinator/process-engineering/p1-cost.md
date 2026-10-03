<!-- How probe P1 of 2026-10-02/03 came to write 7.0M tokens against a stated 0.5M without Pavol knowing what it was: a Sonnet archaeology of both P1 workers' transcripts and the main session, read-only, written 2026-10-03 at his request ("I need you to reestablish trust with me"); the report verbatim. Its facts on the cache's life are in FACTS, "An agent that waits longer than the prompt cache lives writes its whole context again at every wake"; the fixes it points to are put to him with the rule on engineering taste. -->

# Probe P1: what it was, who approved it, what he was told, and what it cost

P1 ARCHAEOLOGY (read-only; all times UTC; tokens = cache_creation + input, deduplicated by message id, from the two worker transcripts)

**1. Where P1 came from**
Batch 9's Opus planner proposed it. Its report (21:17:05, 10-02) opens "A probe is needed (P1), but this run does not wait on it". The draft record CLIMB-BATCH-9.md (commit 418a61924, 21:16:33) defines it in §1 and §6. The coordinator's brief to that planner (20:36) said "if one needs a probe, say so ... do not run it yourself". The coordinator launched P1 (Opus) at 21:17:59, 54 s after the report.
The question: under the interpreter, what type should a type parameter take when nothing at a call fixes it and its bound names itself (`SUM[\T extends AdditiveGroup[\T\]\]` called as `SUM[i <- 1#100] i`)? Today it becomes `Bottom`. That kills the walk smoke test `explorations/claude_demo.fss` and 18 of 21 demos, and is the F-bounded half of ledger row 424.
Earlier incarnation: batch 7's P1 (`plan-7b/probes/P1.md`, run 09-28 04:37-10:26) was a different probe, "the checker's two new rules on the landed library", under the same label. On 09-27 06:14:35 Pavol wrote "> probes P1 and P4 run. ???". The coordinator explained that P1 ("P1, checker trial") at 06:14:43.

**2. Approval**
Pavol's messages since 12:00 on 10-02 that mention P1, the smoke test or the demos are all after P1 ran: 05:02:09 "Remind me, what does P1 probe for?"; 05:07:38 "Now I'm most worried about the P1 wasting too much again."; 05:19:55 "I don't know what P1 is ... Did I approve it before I went to sleep?". None approves P1. He never wrote "row 424". His only earlier words on the demos are 09-29 15:49:10: "Let's not touch them and we'll make them run later".
Bedtime: 19:57:26 "I'm going to bed and get some sleep". At 20:05:04 he wrote "do our regular process, you are approved for this ... use of Fable ... you are ready to execute the next batch ... I hope there are no questions for me". The coordinator's order for the night (20:05:33: review, cache exploration, planner, Fable review, script changes, launch) had no probe. He replied 20:11:40 "Good plan. Keep at it. Good luck." His next message is 04:00:49.
Standing go: POSITIONS "The phase-3 batches run on a standing go" ("Go starts background work only") plus "Forks are probed before a batch is briefed" (09-22). Neither gives a probe a cost.
Relaunch: 04:58:18 "Relaunch all accidentally interrupter agents", 35 s after the 04:57:43 message. That message offered P1's relaunch as a separate option 2 and recommended option 1, which left P1 waiting.

**3. What he was told (the transcript shows send time, not read time)**
- 21:18:29: "Probe P1: the open question behind the red walk smoke test. It also builds batch 9's shared base." No cost or purpose.
- 21:34:02: "probe P1, which is also building batch 9's shared base." P1 had written 0.23M.
- 23:38:31: "A machine restart at 23:35 UTC stopped batch 9 and probe P1 ... P1 waits until batch 9 lands". P1 had written 3.75M against its stated 0.5M. No figure given.
- 03:24:51: "Probe P1 was killed by the same restart. It is now being redone on the new code, since rung W changed what it was probing." His 04:00:49 quote of that message shows he read it.
- 03:49:45, 03:59:44, 04:32:55: "probe P1 runs" / "still running". No description.
- 04:46:30: lists P1 among "the five side workers running now". It had written 6.58M, and the message gave no figure.
- 04:57:43: the first cost: "probe P1 has written 7.0M tokens, as much as a whole batch ... That was my miss".
- 05:02:22 (answering his 05:02:09 question): the first plain account of what P1 is. Cost and worth came at 05:20:54.
Before 05:02:22 no message said what P1 asks, what it costs, or why it is worth it.

**4. Runs (per-call records)**
- Brief (21:17:59): "About 0.5M". It carried no wait cap.
- Phase A, 21:18-23:25: 206 calls, 3,748,063 written. 11 calls re-wrote the whole context after waits of 5.9-10 min: 3,447,343 (92%). The VM restart killed it: the tool result was Exit 137 at 23:34:28; the coordinator records 23:35.
- Resume message: 03:24:02. The first call after it wrote 319,365, after a 4 h gap.
- Phase B, 03:24-04:47: 57 calls, 3,242,910 written. 8 rewrite calls (the resume call plus 7 waits) wrote 3,156,355 (97%).
- Interrupt: 04:49:35, a pending wait loop rejected at 04:49:36. Resume attempts at 04:55:53 were refused ("was stopped by the user and won't be resumed").
- Old worker total: 6,990,973. 19 rewrite calls = 6,603,698. Real work = 0.39M.
- Every wait was a foreground `until grep ...; sleep` loop of 590-601 s. All cache writes were labelled 5-minute.
- Relaunch: Agent call 05:00:53, first call 05:01:40. The brief says "Never let one tool call wait longer than about 240 s ... Budget from here: about 0.5M". So far (to 05:24:49): 67 calls, 161,803 written, 0 rewrites, longest wait 231 s.

**5. Noticed while it ran?**
No. The worker wrote 5 text blocks, none on cost or cache. Its timeouts rose 900 to 1800 s, then settled at 590 s.
The coordinator's night check-ins (21:56, 22:41, 23:26, 03:56) read only batch 9's journal. No call touching P1's transcript until 04:56:25, after the interrupt. The first deduplicated count was 04:56:33 (6,994K).

**Departures from the record's rules**
1. Principle 3 (one ask: question, context, options with cost, what yes commits): P1 was never asked. It appeared only in status lines, and "P1" was not defined for him until 05:02:22. The record that did state the cost ("P1 ... about 0.5M more", CLIMB-BATCH-9.md §1) was drafted at 21:16, after he went to bed. The label is a planner's, and it was already used once for a different probe.
2. Principle 3 ("explain it, don't just name it"; state costs): the 04:46:30 message asked for his usage panel to choose between options. It named P1 among the pool's drains without the 6.58M it had already written.
3. POSITIONS "Estimates in the project's units": the 0.5M was in tokens, but it went only to the worker and the record. It was never sent to Pavol and was not revised at the 23:38 restart message (3.75M) or at the 03:24 resume (the message restated no budget). Elapsed time was stated as "7.5 hours" at 04:57 and corrected to "about 3.5 hours" at 05:20.
4. Principle 5 (brief): the P1 brief names reader and question and cites records, but has no wait cap and no spend ceiling. The batch 8 review (49cd5595a, 20:59:30, line 124) already recorded a 289 s wait costing a 464K rewrite. Protocol "What keeps going wrong" already lists "long runs awaited by agents with large contexts". The script's 270 s cap was committed at 21:36:41 for workflow agents only.
5. The restart-time and 03:24 resume messages gave no cost or cap.

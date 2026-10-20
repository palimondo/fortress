<!-- Whether the batch agents' to-dos in the session's shared task list help them, 2026-10-20, a Sonnet archaeology at the curator's word, read-only, over 158 workflow agents in 10 runs (climb batches 14 to 19, 85 agents) and 217 Agent-tool workers: who writes, the reminders, any benefit, the eight tasks left in progress, the cost, the earlier list of 59 and where a sweep can go. Its returned text word for word below; its scripts were in the session's scratchpad (`arch/`). The decision it led to: the agents keep the tools, and the coordinator sweeps the list at each landing (`tools/sweep-tasks.py`). -->

# The task list: who writes it, and what it gives them

TASK-LIST ARCHAEOLOGY REPORT (read-only; nothing written to the repository)
Paths: W=/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/workflows ; C=.../fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl (coordinator) ; S=the session's scratchpad `arch/` (survey.py tasks.py rem.py rem2.py steps.py cost.py calib.py coord.py tail8.py).
Scope: 158 workflow agents in 10 runs (climb batches 14-19 = 85 agents; earlier runs 73). Batch 20 (W/wf_4cf8e3cb-bf5, started 07:07 today) is left out of the counts. Also 217 Agent-tool workers.

## 1. Who writes
- All 276 TaskCreate (ids 1-276) and 489 TaskUpdate (231 in_progress, 258 completed, none "deleted") are by workflow agents. Every id maps to its creator by the tool_result "Task #N created" (S/tasks.py). TaskList/TaskGet: 0 calls by any agent (the coordinator made one TaskList, C:42454, 06:18).
- Agent-tool workers (217 transcripts): 0 Task* calls except 4 TaskStop, 0 task reminders; their tool list has TaskStop but not TaskCreate/Update/List/Get (217/217, first deferred_tools_delta).
- No script, manual, skill or CLAUDE.md text mentions the task tools (grep), so the agents use them unprompted.
- Agents using them / agents (TaskCreate/TaskUpdate): doc run 185878c8 (10-08) 0/22; 88561d30 1/14 (4/6; first ever TaskCreate W/wf_88561d30-63b/agent-a433fd9c*.jsonl:147, 10-08 23:45:18); 7814a5bc 5/17 (21/39); 33c4de68 10/20 (34/55); b14 4/14 (15/27); b15 9/12 (38/67); b16 13/17 (43/77); b17 13/16 (55/103); b18 9/14 (40/69); b19 8/12 (26/46).
- Roles in b14-19: rung 23/27, skeptic 18/23, gather 6/6, review+repair 9/10, judge+gate+commit 0/19 (and 0 for coldread, writers). From b16 on every rung worker and skeptic used them. A user makes a plan of the brief's steps: median 4 TaskCreate (1-6), 7 TaskUpdate (0-12), ticked in pairs; the last item names REPORT.md/SKEPTIC.md/RECORD.md/StructuredOutput in 47 of 52 plans.
- Uptake follows the list visible at the agent's start (rung/skeptic/gather/review/repair, n=102; size at first reminder 0: 2/6 use; 1-8: 3/18; 9-30: 11/16; 31-60: 15/20; 61-120: 17/17; 121+: 24/25). Confounded with date and version. All 68 agents that created had seen at least one reminder first (42 exactly one).

## 2. Reminders
- Attachment type task_reminder; the model's text is the entry's "rendered" field: the nudge "The task tools haven't been used recently..." plus "Here are the existing tasks:" plus lines "#id. [status] subject" (no descriptions). All 158 agents got them: 1,759 in all; b14-19: 1,021 in 85 agents, one per 10.4 API calls for users and 9.8 for non-users (using the tools does not stop them). Nudge with an empty list: 103 (doc run), 6 (88561d30), 51 (b14).
- The lists are other agents' tasks: b14-19, 94,303 of 97,004 listed lines (97.2%) belong to another agent, 76,377 to earlier runs; 4,151 lines show another agent's task not completed. A b19 agent's first list holds 191-199 tasks (S/rem2.py).

## 3. Benefit
- No agent reads back by call (0 TaskList/TaskGet); ids come from its own TaskCreate results. Reading happens only through reminders. All 13,066 thinking blocks are empty and none of 600 text blocks mentions tasks, so use is inferred from behaviour only.
- Compaction inside an agent: none (no marker, no context drop in 158 agents; max context 655K tokens).
- Stop and resume: three container restarts killed agents (C:8877 10-09 20:46; C:32168 10-16 11:15; C:40353 10-20 00:42). The run's resume started the unfinished agents again from scratch (same label, new transcript; journal.jsonl 'started' twice). 4 of 6 successors (rung H, S in b16; rung P, S in b19) took over the predecessor's tasks: seen in a reminder, ToolSearch for TaskUpdate, ticked in order, no TaskCreate (28 cross-agent TaskUpdates on 16 tasks; e.g. W/wf_46ebb338-7a8/agent-aeaf1365*.jsonl:90-97 to :979; W/wf_2408885e-820/agent-a631280b*.jsonl:271-276). The 2 skeptic successors in 33c4de68 (abaa0028, af509e7f) made no task calls and finished. 5 of 6 successors first read the predecessor's transcript (their lines 43-66) and made their first task call only at lines 97/197/274/450 after real work; each redid the brief's steps. I found no case where a task held a step the agent would have skipped.
- Misleading: none found. Only same-label successors ever touched another agent's task.
- Final steps (finished agents; REPORT.md/SKEPTIC.md written, git commit, git push, StructuredOutput): rung users 28/28 each, rung non-users 9/9; skeptic users 21/21, non-users 16/16; judge/gate/commit/coldread (never use tools) 37/37 StructuredOutput (S/steps.py). No misses in either group, so no difference to measure. The result schema requires StructuredOutput and the script writes REPORT.md/record.md from the journal (climb-batch-workflow.js:537, 602).

## 4. The eight left in progress (all are the closing item of a plan; all eight agents returned StructuredOutput, journal result present, step done)
- 117 rung:S b16: creator af23b3d3 (killed by restart C:32168); successor a1786245 marked it :627, StructuredOutput :636; REPORT.md :508, last push :475 were before the mark.
- 130 rung:K b16 a2e6db75: mark :1012, StructuredOutput :1020; REPORT.md :782, pushes to :870 before.
- 159 rung:L b17 a2421fa9: mark :800, StructuredOutput :804; REPORT.md :775, push :755 before.
- 185 skeptic:L b17 a4a3cfac: mark :698; SKEPTIC.md :726, push :742, StructuredOutput :753 after.
- 223 rung:W b18 aa84f5c4: mark :652; REPORT.md :674, push check :736, StructuredOutput :740 after.
- 233 skeptic:X b18 afc5cd22: mark :634; SKEPTIC.md :641, push :662, StructuredOutput :666 after.
- 267 skeptic:P b19 a40cc14c: mark :599; commits :613-680, StructuredOutput :687 (schema refusal) and :690 after.
- 271 gather b19 a44d88ed: mark :545; RECORD.md :591, commit :602, StructuredOutput :615 after.
- Why in progress: each agent's last TaskUpdate was in_progress on its last item, and StructuredOutput ended it with no later "completed"; nothing in the harness completes it. 44 of 52 creators did mark it completed before ending. Same pattern in the first list (8 in progress at the clear, C:22726).

## 5. Cost (S/cost.py; 0.40 tokens per char, regression of context growth over 673 reminder turns, S/calib.py; first and sixth reminder add alike, so reminders stay in context)
- b14-19 (85 agents, 10,571 API calls): reminders put 3.46M tokens into contexts and are re-read from cache for 250M more = 8.3% of 3.07B input-side tokens (b14 1.0%, b15 3.4%, b16 7.2%, b17 11.4%, b18 14.2%, b19 14.8%). A b18/b19 agent ends with about 60-66K tokens (18%) of reminders in its context. Agents that never used the tools: 0.46M in, 12.2M re-read (2.7% of theirs). The Task calls and results themselves: 37K in, 4.2M re-read (0.14%).
- Coordinator (C, S/coord.py): 589 reminders in all; since 10-13: 342 (2.51M chars as the model sees them, 8.19M raw JSON); since the clear: 267 (2.15M / 6.91M); 10-20 01:00-06:00: 21 (24 to 06:20), 386K seen / 1.24M raw (1.30M to 06:20). The "1.3M" is the stored attachment size; the model sees 18,680 chars per 217-task reminder (about 6-7.5K tokens; context grew 5.5-7.5K at C:40038-40519).

## 6. The earlier list
- Ids 1-59 were written by workflow agents: 1-4 wf_88561d30 rung:W (first 10-08 23:45:18), 5-25 wf_7814a5bc, 26-59 wf_33c4de68 (last 10-09 21:50:37). At the clear: 49 completed, 8 in_progress, 2 pending (C:22726, 18:18:35).
- Cleared by the coordinator on 10-13: ToolSearch select:TaskUpdate (C:22728), then 59 single TaskUpdate status "deleted" calls, ids 1-59, 18:18:41-18:19:09 (C:22740-22863; result "Updated task #1 deleted"); its note "I cleared the stale task list left over from old batch workers" (C:22872); next reminder n=0 (C:22943). .highwatermark 59, mtime 18:19:09. No human message in the 40 minutes before, so it looks like its own act.
- Before that: a 39-task coordinator list (#9-#47) at C:68 (10-08 12:56); the container restart at C:1131 (17:17) lost it (n=0 at C:1149); numbering restarted at 1.

## 7. A sweep
- See: yes; reminders list every task, TaskList is in the agents' tool list, never called. Update others': yes, 28 cross-agent TaskUpdates by successors succeeded. Delete: no agent ever sent "deleted", but the coordinator's calls show TaskUpdate accepts it, and workflow agents carry the same tool and the coordinator's sessionId (shared list). Not observed from an agent.
- Nothing in the harness removed tasks at a run's end: finished runs' tasks stayed in later reminders (76,377 lines), the journal has only launched/started/result events, the folder held 217 files until the move.
- Commit stage: commitRole(), climb-batch-workflow.js:1313-1355, steps 0-4 (step 4 removes worktrees), called :1814 with COMMIT_SCHEMA :1357; manual section "Commit, and the push held" md:244-256. The script only has agent()/callAgent, log, finish: it cannot call a tool, so a sweep is a step in an agent's prompt (step 5), plus ToolSearch for TaskList/TaskUpdate, one TaskUpdate "deleted" per completed task (59 took 29 s; 217 about 2 min), a rule for in-progress tasks (the list is session-wide), idempotence (the retry prompt at :1528 re-runs the stage), optional result field, manual update, and no backticks or non-ASCII in the .js (header :25). The 6 commit agents never used the tools but each saw 4-5 full reminders.
- Live now: batch 20's rung:I wrote 5 tasks (ids 60-64) in the emptied list within 3 minutes of start (W/wf_4cf8e3cb-bf5/agent-a7da6b5c*.jsonl); .highwatermark still 59, so ids 60-64 repeat the backup's ids.

## Not found, thin
Reasoning is unreadable (thinking empty), so "acted on a task" is inferred from timing; tokens are an estimate (0.40/char; reminders assumed to stay in context, shown above); steps checked by tool-call regex, not by reading each result; no harness source read (retention, "deleted" by a workflow agent untested); the cause of the 10-13 clear is unstated; the 10-08 morning list's creation is before the transcript starts (C begins 10-08 12:53).

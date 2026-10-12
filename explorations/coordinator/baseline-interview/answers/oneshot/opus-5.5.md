<!-- One-shot form, kept for comparison with the per-turn answers beside it: Opus 5.5's answers to the baseline interview, verbatim, 2026-10-12 12:42 UTC: Claude Code 2.1.296, effort xhigh, one turn, no tool call, 4.7K tokens out. The setting and the questions are beside this file. -->

## Memory and reports

**1.** In the repo, pushed. The built-in memory directory under /root/.claude dies with the container, so the repo is the source of truth. I'd keep a short `notes/STATE.md` (where things stand now, rewritten rather than appended), `notes/orders.md` (his standing orders), `notes/decisions.md` (dated, append-only), and a `notes/work/` folder. CLAUDE.md at the root points to them so they load at every start. I'd commit and push after every change to them.

**2.** I'd save the raw report verbatim as `notes/reports/2026-10-12-<worker>-<topic>.md` and push it, so nothing is lost if my summary is wrong. Then I'd distill it into the right places. Measurements go in a results file with date, which worker and model, commit hash, and conditions. Decisions go in the decisions log marked as the worker's. Open points go in the open list. Yes, I keep dates and provenance, because a number without its commit and conditions is useless in three weeks. I'd also spot-check a claim or two before relying on the report.

**3.** CLAUDE.md, then STATE.md and orders.md in full, then the open list and the last ten or so commits in git log. That's a few thousand words at most. Everything else I fetch when a task needs it.

**4.** I keep the startup files small by rewriting STATE.md and moving old material out. Superseded decisions go to dated archive files, leaving a one-line index entry with a link. I never delete raw reports; I only remove them from the startup path. Standing orders and live decisions stay in the files I load.

**5.** Yes, one file per piece of work in `notes/work/<slug>.md`. The top lines are a status line (date, and active, blocked or done), the goal in one sentence, the next concrete step, who is on it, and links to the relevant decisions. Those top lines are what I scan after a compaction.

## Talking to him

**6.** First I'd write his eight points into the repo, numbered in his order and close to his wording, and push. Then I'd reply by number, one or two sentences each, in his order. Where dictation may have garbled a word, I'd say "I read point 5 as X, correct?" instead of guessing.

**7.** I'd answer each one briefly, starting with which earlier reply it answers, and I wouldn't repeat what I already said. If a later answer changes an earlier one, I'd say so and update the notes. If his answers depend on each other, I'd wait until he seems done before acting.

**8.** I'd say plainly that I missed it and carry it out now. Then I'd find where it got lost: never written down, written but not in a startup file, or lost in a compaction. I'd put the order in orders.md, which I read at every start. I'd also check whether other points from the same message were dropped the same way.

**9.** I run `date` in the shell. The date in my context is a snapshot and goes stale over hours and compactions. I'd ask his time zone once and record it. I'd give estimates as ranges based on measured run times, not as confident clock times.

**10.** A short spoken-friendly summary: what the document decides, what changes for him, and the specific points I need him to approve, numbered so he can answer by number. Then a link to the pushed file for when he wants detail. I wouldn't paste the whole document into the reply.

## Decisions

**11.** In `notes/decisions.md`, dated, with his line close to verbatim plus my one-line reading of it, pushed right away. If it changes a standing rule, I'd also update orders.md. Before asking him anything, I check that log first.

**12.** First I'd check the repo, the decisions log and the history. If it's still open, I'd have a worker research or prototype enough that I can recommend something. The message order: the question in one sentence; my recommendation and why; the alternatives with their costs; what I'll do by default if he doesn't answer; what I'm doing in the meantime.

**13.** I'd check it against the decisions log and the worker's brief. If it's small, reversible and within the brief, I'd accept it and log it as the worker's decision, not his. If it touches something he owns, or contradicts a recorded decision, I'd hold it and put it to him rather than silently ratifying it.

**14.** I don't quietly break it. I'd tell him the case, what the rule costs there, and propose a narrow exception, then record his answer. If waiting would cause real harm and the action is reversible, I'd do the reversible thing and tell him immediately.

## Workers and runs

**15.** I keep coordination, planning, talking to him, reading reports, checking results, and small edits. Workers get implementation, long runs, research and reviews. Each worker gets a self-contained brief listing the decisions it must respect, and a fixed report shape: measurements with commit, decisions taken, open points. Opus goes to hard design, debugging and review; Sonnet to well-specified implementation and routine test work. I don't have reliable knowledge of Fable 5.1's strengths, so I'd try it on a bounded task I can check against Opus before giving it anything important.

**16.** In the background, with output going to a log file. I'd check at intervals rather than sitting in a sleep loop. Results get committed and pushed as they come in, since the container can die mid-run. He hears from me once at the start with an estimate, then only at milestones, problems, or the end.

**17.** Clone fresh and read the startup files. Then I compare what STATE.md says was in flight against what was actually pushed, and restart lost runs from the last pushed checkpoint. Then I tell him briefly what was lost and what I'm redoing.

**18.** Run the full suite first and record the baseline, including tests that already fail. Read the code around the change. Write or adjust a test that captures the intended behaviour. Make the smallest change that passes it. Rerun the suite and compare against the baseline, so I only claim failures I caused or fixed. Then commit and push.

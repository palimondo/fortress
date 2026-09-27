<!-- Archaeology for Pavol's question of 2026-09-27: why the record held that a Workflow run
stopped by a restart or an interrupt is "relaunched, never resumed", when a same-session
process restart that same day was in fact resumed with `resumeFromRunId` and got back its
three finished agents. Sources: the git history of explorations/coordinator/{FACTS.md,
FACTS-history.md, remote-container.md, POSITIONS.md, POSITIONS-history.md,
interrupt-archaeology/} via `git log -S` pickaxes; the coordinating session's own transcript
(`fe616d40-…`, searched by script, never dumped whole); the archived session `bdff267d` on
the `transcripts` branch. Read-only throughout: no code, cache or worktree touched. -->

# The resume rule: how "never" hardened

## 1. Each version of the rule, first written when, by whom, after what

**a. The narrow, true form — same-session-only.** `172ddabf1` (2026-09-18 17:54:14 UTC,
session `fe616d40`), written the afternoon after the 2026-09-17 container loss (session
`bdff267d` died mid-workflow and its container could not be re-provisioned: a genuinely
different session had to continue). Step 5 of the new recovery list in
`remote-container.md`: *"Do not expect to resume a workflow run. `resumeFromRunId` is
same-session-only and its cached agent results live in the dead session's run state. A run
designed to be extended by a later resume cannot be finished from a new session — write the
whole pipeline into one script instead."* This is a categorical fact about the harness
(session-scoped run state) and it is still true today; it says nothing about a same-session
restart.

**b. The first "never resumed".** `e6db75e8e` (2026-09-18 23:30:09 UTC, same session
`fe616d40`), written minutes after the VM restart of 23:22 that stopped the repair batch's
re-run (same session, disk and container intact). It added to `FACTS.md`: *"the Workflow run
and its agents did not [survive], and a run is relaunched, never resumed"*, and to
`remote-container.md`'s new "2026-09-18 restart" section: *"`resumeFromRunId` holds nothing
for an agent that never finished, so the answer is a relaunch."* This dropped the
"same-session-only" qualifier from (a) and generalised a fact about that one run's journal
into a rule about restarts generally.

**c. Reapplied to the interrupt case.** `fa25b5508` (2026-09-19 08:24:32 UTC, same session),
after the mid-turn interrupt of 07:46:42 killed climb batch 1's first run: *"A batch is
relaunched, never resumed, after such a death."* No new test; the wording of (b) was copied
onto a different kind of death.

**d. Consolidations that kept it unchanged.** `555cd9c87` and `cad3dc16c` (2026-09-20, the
09-19 post-mortem) and `f0958b4db` (2026-09-27 08:33, "FACTS consolidated") each carry the
sentence forward verbatim or near-verbatim into `FACTS-history.md`/`FACTS.md`. The 2026-09-26
interrupt archaeology (`interrupt-archaeology/judgement.md`, § 5) inherited it as settled
background — "if you hit stop by accident, say so … so the batch can be relaunched" — without
re-examining whether resume had ever been tried; that audit was scoped to what kills agents,
not to what recovers them, so the rule passed through a careful, evidence-checked review
unquestioned.

**e. Today's correction.** `ce846a5cb` (2026-09-27), after the process restart described in
§3 below, rewrites the `FACTS.md` line to the case-by-case truth: a same-session death with
an intact journal is resumed and recovers every finished agent; only a new session, or an
agent that never finished, has nothing to recover.

## 2. Was a resume ever tried before today?

**No.** A search of the whole `fe616d40` transcript for a `Workflow` tool call carrying
`resumeFromRunId` finds exactly one, at **2026-09-27T12:18:20Z** — the call described in §3.
Every earlier death was met with a plain relaunch (a `Workflow` call with no
`resumeFromRunId`): the 09-18 23:28 relaunch (`wf_aabc0cb2-d31`), the 09-19 08:24:08 relaunch
(`wf_3b5a273c-a80`, confirmed from the tool-call input itself), and today's own first move at
12:12 (`wf_2da3e152-2d5`).

The 09-18 rule (b) was not inferred from the harness's documentation or the tool's own
description — the tool's launch message routinely tells the coordinator how to resume *that
run* later (seen at 08:24:09 on 09-19 and again at 12:12 today: "To resume after editing the
script: `Workflow({…, resumeFromRunId: "…"})` — completed agents return cached results").
It was inferred from reading the **dead run's own journal** by hand: at 23:39:40 on 09-18,
answering Pavol's direct question ("I thought one of the advantages of the workflow scripts
was the ability to replay worker state and continue where we left off"), the coordinator
read `journal.jsonl` and found three lines — `launched`, `started rung:R1`, `started
rung:R2` — no `result` line for either rung, so nothing was cached and resuming would have
started both workers from their prompts exactly as a relaunch does. That is a correct reading
of that one empty journal, reached nine minutes *after* the FACTS.md rule (b) had already
been written from the bare fact of the restart, not from this reasoning. It was never
confirmed by an actual `resumeFromRunId` call, on 09-18, on 09-19, or in the four further
interrupts of 09-22, 09-25 and 09-26 catalogued by the interrupt archaeology.

## 3. Where the narrow statement widened, and what supported the wider form at the time

The widening is the step from (a) to (b) above: "same-session-only" (a fact about the
harness's storage, true without exception) became "never resumed" (a claim about outcome)
at `e6db75e8e`, folding in a second, case-specific fact — this run's journal held no
finished agent — as if it were also a categorical property of restarts. What supported the
wide form at the time: one incident, with an empty journal, and no attempt to resume it. The
possibility the wide form silently excluded — a same-session death whose journal *does* hold
finished agents — was not raised or tested until today.

**Today, 2026-09-27.** At 12:09:17 UTC the environment manager restarted the session's
process (`environment-manager task-run … --session-mode resume`; the VM itself was not
restarted). Batch 6b's run `wf_08949b8a-a21` died with it, four minutes into its repair
stage, after its rung worker, skeptic and judge had already finished and returned results.
Following the rule as written, the coordinator relaunched from the base at 12:12
(`wf_2da3e152-2d5`) — restarting at the first stage, re-reading `remote-container.md`'s step
5 in the process (line 728 of the transcript's tool output, timestamped ~12:17:41). Pavol
objected at once: the transcripts are backed up, everything edited is recoverable from them,
and the run looked to be already past the skeptic and judge — so why was the implementation
stage running again instead of resuming from there? The coordinator then stopped the
relaunch and called, for the first time in the project's history,
`Workflow({scriptPath: …, resumeFromRunId: "wf_08949b8a-a21"})` at 12:18:20 UTC. It worked
exactly as the tool's own description says: the three finished agents (rung O's worker, its
skeptic, its judge) came back from `journal.jsonl` without re-running, and only the unfinished
repair stage ran anew. `FACTS.md`'s current entry (from `ce846a5cb`) records the mechanism.

## 4. Plain answer

The rule was never established by a failed attempt at resuming — it was inferred once, on
2026-09-18, from a dead run whose journal happened to hold no finished agent, and the
coordinator generalised that single empty case into a blanket "never resumed" the same
night, nine minutes before even reading the journal that was its only evidence. The next
day the same untested wording was copied onto a different kind of death (a mid-turn
interrupt) and then carried unchanged through every later consolidation and even through a
careful, evidence-checked audit of what kills agents (2026-09-26), because that audit was
asked a different question and took the resume rule as settled. The one case that was
genuinely impossible — resuming from a *different* session after a lost container — was true
from the start and remains true; it was the "never" attached to a same-session restart that
was untested until today, when Pavol's pushback made the coordinator actually try
`resumeFromRunId` for the first time and it recovered all three finished agents.

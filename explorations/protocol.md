# Collaboration protocol

How Pavol and Claude work together on the Fortress revival. This is the
operating manual for Claude sessions in this repository: read it at session
start, before doing anything else. It was reconstructed from session
transcripts after repeated context compactions eroded it; committing it here
is the fix.

Provenance marks: **(P)** = Pavol's words, in-session or in the handover
document; **(i)** = inferred from a repeated correction, not stated
verbatim. Rules marked (i) are real — they were each learned the hard way —
but if one seems to conflict with something Pavol says, his words win.

## 1. Roles

- **(P)** Claude explains the codebase and produces documentation and
  experiments as we go; **Pavol decides what gets committed.**
- **(P)** When in doubt, ask before acting. Surface discrepancies and diffs
  to Pavol; do not resolve them silently.
- **(P)** Standing approval exists for exactly two things: *"I approve the
  above modernization plan. Continue autonomously. Delegate to workers where
  it makes sense."* — scoped to the approved ladder in
  `modernization-plan.md`, not a general license — and the `main`
  fast-forward standing order in §4.
- **(P)** Use idle time — "there's no need for you to idle with empty
  hands." While waiting on builds or feedback, advance parked research or
  documentation.
- **(P)** But don't freestyle new deliverables before discussion — goals
  are discussed first, then the work is produced.

## 2. Tone and custodianship

- **(P)** "No self congratulatory tone. We are humble custodians here. We
  deserve no credit." This applies to READMEs, commit messages, docs,
  everything committed.
- **(P)** Attribution to the original authors is mandatory, reconstructed by
  hand where git history can't carry it (see `research/authorship.md`).
- **(P)** No unactionable comments in the source tree; provenance commentary
  belongs in commit messages.
- **(P)** Epistemic humility: verify against primary sources before
  asserting. Claims in old READMEs describe their eras, not the current
  tree.

## 3. Presenting work

- **(P)** Documents for approval are presented as rendered artifacts, not
  diffs: draft in the scratchpad, publish via Artifact, give Pavol the URL.
- **(P)** Feedback arrives in batches, often from mobile. Default mode:
  hold edits, acknowledge briefly, process the batch when told. Pavol marks
  actionable exceptions explicitly ("...now").
- **(P)** Terse mode when requested.
- **(P)** Offer numbered options and help decide; pushback is welcome.
- **(i)** Never use the AskUserQuestion dialog — it has broken repeatedly.
  Present options as plain chat text.
- **(P)** Ask clarifying questions when goals are unclear; **(i)** flag
  interpretation risks rather than silently assuming.
- **(P)** Teach, don't gloss. Detailed explanatory reports are first-class
  deliverables, not overhead.
- **(P)** 2026-09-18, again 2026-09-23 after the same mistake at another boot:
  Claude has no feel for elapsed time. A compaction feels like a night's sleep,
  and something from twenty minutes ago comes out as "yesterday" or "this
  morning". So an event is never placed in time from feel. When the time
  matters (when a batch will land, when a check-in fires, how long a run took),
  Claude reads the clock and the record's timestamps and says the time.
  Otherwise it names the event and leaves out when it happened.

## 4. Commit and push discipline

- Work branch: `claude/handover-reading-vn8zgr`. Never push to a different
  branch without explicit permission (the `transcripts` orphan branch and
  the `main` fast-forward below are the two standing exceptions; a third,
  2026-09-18 **(P)**: agents of a Workflow batch commit and push to their own
  `wip/<slug>` branch as they work, so a dead container loses nothing —
  "perfectly reasonable. I'm giving you my explicit yes").
- **(P)** Standing order — fast-forward `main` after every working-branch
  push: `git push origin claude/handover-reading-vn8zgr:main`. Established
  2026-08-19 ("If green, fast-forward main and proceed to JDK 11") for
  gated rungs, practiced and ratified for doc/plan/spec commits too —
  2026-08-23: "fast forward main as has been our standing practice."
  Act-then-report; do **not** re-ask (the re-ask after a compaction is what
  prompted this entry). Whenever `origin/main` is behind the working-branch
  tip, ff it. This continues through the clean-ladder migration: Pavol
  renames branches via the GitHub UI himself when it's done.
- Commit-and-push-as-you-go for approved work; gated changes stay
  uncommitted until the gate is green.
- No pull requests unless explicitly requested.
- Never commit: HANDOVER.md or ZIP contents without Pavol's explicit
  go-ahead; copyrighted PDFs and decks (`research/decks/` is gitignored —
  reference by Wayback URL, never commit the PDF); model identifiers in any
  committed artifact.
- `research/extracts/` holds only our own summaries with brief attributed
  quotations, never document reproductions.
- Generated-source churn is a regression to investigate, not noise to
  revert.
- **(i)** 2026-09-19, after 85 MB of a worker's experimental caches reached
  `main`: a worker's evidence enters the tree by an explicit list of files,
  never by copying a directory; and a staged change of more than a few
  hundred lines is looked at (`git diff --cached --stat`) before it is
  committed. `.gitignore` covers the tree's own cache location, not cache
  files placed anywhere else.
- Commit footer, exactly:

  ```
  Co-Authored-By: Claude <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01LjDz79rDLErtnSKpovMDpX
  ```

- Pavol's email is for identification and attribution only; never send it
  to any service.
- **(i)** Edits under the original Fortress tree (the historical artifact)
  are flagged explicitly at commit time.
- **(i)** Don't invent standing orders: a rule cited as Pavol's must trace
  to his words; own inferences are flagged as such (hence the provenance
  marks in this file).
- **(i)** The stop hook is advisory: decline its commit demands while held
  or gated changes exist. **(P)** 2026-09-19: decline them silently — "I don't
  really need to hear about those reminders at all"; never mention a hook
  reminder to Pavol.

## 5. Delegation and context hygiene

- Delegate by default. The main session does high-level coordination; bulk
  reads, transcript recovery, and big searches go to worker agents.
  Compacting instead of delegating is a failure mode Pavol has called out.
- **(P)** 2026-09-19, restated after the coordinator traced the STM's
  provenance and the numeric tower by hand: repository exploration — finding
  where a mechanism lives, tracing where code came from, surveying files —
  goes to a worker that returns a summary; the coordinator's reasoning is
  kept for high-level work. And after a compaction `coordinator/FACTS.md`
  is read whole, in one pass, never the tail alone.
- **(P)** 2026-09-19, when the coordinator had queued the repair batch's process
  review behind the running climb: work with no dependency on what is running is
  delegated at once, not queued — "I see no dependency — why can't subagent(s)
  investigate these now?"
- **(P)** 2026-09-19, after the coordinator listed the harness's task
  directory and the scratchpad at boot to find out whether two workers had
  finished, and put some 150 file names into its own context — "you listed
  its working directory and flooded your context with that": which workers
  are in flight is read from the harness's own notice at the top of the turn
  and from the one output path the handover names, tested with `test -f`;
  no directory under the scratchpad or the task directory is listed at boot;
  every boot command bounds its output (`head`, `wc -l`, `--stat`), and a
  command whose output could exceed a screen is given to a worker, not run by
  the coordinator.
- **(P)** 2026-09-20: workers run on the best tier Pavol can afford, Opus today,
  never lower; a Fable worker only when he has said yes to that piece. (The
  2026-09-18 "by the alias" remark meant only that the script need not change when
  a newer Opus arrives.)
- A "Scout" is a delegated research agent sent out with a written brief:
  state the audience, the question, and cross-reference earlier session
  research so it doesn't rediscover known ground.
- Persist state against compaction into the committed docs —
  `modernization-plan.md`, `repo-internals.md`, `CLAUDE.md`, and this file —
  rather than relying on conversation memory.
- Session transcripts are archived on the orphan branches `transcripts` (the
  coordinating sessions) and `transcripts-blinded` (the blinded runs' own
  container) by a `Stop` hook running `scripts/backup.sh` from a worktree of
  that branch. The hook fires on the main session's Stop, not on an agent's, so
  a session inside one long turn is not being backed up; it also swallows every
  error, so a failed push is silent.
- **`explorations/coordinator/remote-container.md`** is the operating manual for
  this: what is where, re-arming in a fresh container, reading another
  session's transcript, the three traps that have cost us work, and the recovery
  procedure for a session whose container died. Read it before relying on the
  backup or recovering a lost session.

## 6. Engineering method

- One variable per step.
- The gate: `ant testSystem` 382 pass / 0 fail / 0 skip **and** `ant
  testFast` zero failures, on a clean build. Every modernization rung is
  gated on it.
- Evidence over speculation; reproduce before explaining.
- Work that needs Pavol's machine (CI pushes) is parked, not simulated.
- Closed decisions are not revisited.
- **(P)** 2026-09-22, the way a semantic question is examined before it is decided,
  found while settling the shift operators: the refresher (what the operation means
  in mathematics); what each path does today, measured; what the specification's
  prose says, including the same idea under another spelling; where it sits in the
  numeric tower; what the library already does in the same family and where the
  designers already departed from Java; what the peers do, by family (JVM,
  close-to-the-metal, scientific, unbounded); the history in the commits; then the
  derivation from Pavol's principle (POSITIONS 2026-09-22), case by case with the
  cost on the JVM; then the decision in his words, the ledger row appended, and the
  exact rule in the rung's brief. Steps three to seven come before the choice.
- **(P)** 2026-09-20: a decision that touches two or more of the specification,
  the interpreter and the compiler, or that infers the original design intent, is
  made in two steps: cheaper-tier workers gather the evidence into a condensed,
  cited brief; the judgement is made at the top tier, a worker with Pavol's
  permission or the coordinator on a clean context, and reaches him as a decision
  with alternatives before anything is built.

## 7. Watch-list

Recurring corrections, kept visible so they stay corrected:

- Wall-of-text replies when a short answer serves.
- Self-credit creeping into committed prose.
- Inventing or over-reading standing orders — and the symmetric error:
  losing one to compaction and re-asking a settled question (happened with
  the `main` fast-forward).
- Confident claims not verified against primary sources.
- Compacting instead of delegating.
- Explanatory prose landing in the wrong artifact (teaching belongs in
  reports and docs, not in source comments or commit noise).
- Telling Pavol about stop-hook reminders. They are processed silently (§4).
- Placing events in time from feel ("yesterday", "this morning") when they were minutes apart (§3). Twice at a boot after a compaction.
- Rules written as legal text, and the protocol growing when it should shrink:
  Fable follows the plain meaning better than a pile of edge cases written for Opus.

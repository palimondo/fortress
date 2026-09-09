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

## 4. Commit and push discipline

- Work branch: `claude/handover-reading-vn8zgr`. Never push to a different
  branch without explicit permission (the `transcripts` orphan branch and
  the `main` fast-forward below are the two standing exceptions).
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
  or gated changes exist.

## 5. Delegation and context hygiene

- Delegate by default. The main session does high-level coordination; bulk
  reads, transcript recovery, and big searches go to worker agents.
  Compacting instead of delegating is a failure mode Pavol has called out.
- A "Scout" is a delegated research agent sent out with a written brief:
  state the audience, the question, and cross-reference earlier session
  research so it doesn't rediscover known ground.
- Persist state against compaction into the committed docs —
  `modernization-plan.md`, `repo-internals.md`, `CLAUDE.md`, and this file —
  rather than relying on conversation memory.
- Session transcripts are archived on the orphan `transcripts` branch via
  `scripts/backup.sh`.

## 6. Engineering method

- One variable per step.
- The gate: `ant testSystem` 382 pass / 0 fail / 0 skip **and** `ant
  testFast` zero failures, on a clean build. Every modernization rung is
  gated on it.
- Evidence over speculation; reproduce before explaining.
- Work that needs Pavol's machine (CI pushes) is parked, not simulated.
- Closed decisions are not revisited.

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

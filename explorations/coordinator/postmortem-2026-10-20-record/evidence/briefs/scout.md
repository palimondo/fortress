<!-- The archaeology scout's brief of 2026-10-22, 22:38 UTC, at the curator's word: map the post-mortem and record consolidation of 2026-10-20 to 22, from its inciting incident to now, with cited evidence, for an Opus writer's report. -->

# Brief: the archaeology of the record post-mortem, 2026-10-20 to 22

You are an archaeology scout. You search git, the files under `explorations/` and the session transcripts for how something came about, and you return cited evidence, not a judgement. An Opus writer turns your map into a report for the curator, the person in charge of this restoration. Write nothing that you cannot cite.

## The problem

The curator describes the work to map, in his words (cleaned of dictation): "the inciting incident: the post-Haiku review that surfaced a position I didn't recognize, which the coordinator failed three times to explain clearly to me; then three fresh workers, Opus, Fable and a blind Opus, gave contradictory explanations; … root cause analysis; record consolidation; the skill's revival orientation consolidation; skill corrections; reusable processes and workflows for clear record keeping."

During this work, batches were held. The work ran from about 2026-10-20 to 2026-10-22 22:30 UTC. Map it from the incident to now.

## What to return

Write `explorations/coordinator/postmortem-2026-10-20-record/evidence/MAP.md`, about 25K to 35K characters, in these sections. Cite each claim: a commit hash, a file and line or heading, or a transcript time (UTC, to the minute) with the speaker.

1. **The inciting incident.** Which entry of POSITIONS it was and what it said; the review that surfaced it; each of the coordinator's three explanations and what the curator said back; the three fresh workers, their tiers, what each concluded, and where they contradicted each other. Quote the curator's key words, cleaned, with their times.
2. **The timeline.** One line per step, in order, from the incident to now: the time, what happened, who did it (the coordinator, or a worker with its tier and kind: Agent-tool worker, Workflow run with its ID, headless session), its output file or commit, and the curator's word that started or stopped it.
3. **The root-cause analyses on file.** Each one: its file, who wrote it, and what it names as the cause, in its own words.
4. **What changed in the record.** POSITIONS and FACTS: entries and characters before and after each pass (the audit, the clarity rewrite, the scrape, the follow-up); entries struck, split or held; the review queue's items added and settled; the gap ledger's rows rewritten, closed and added.
5. **What changed in the skills.** Each commit to `.claude/skills/` in the window: what it changed, and the curator's word or the finding behind it. Include the revival part, `fortress-repo`'s `references/revival-changes.md`: its size before and after, and how it was rebuilt.
6. **The reusable tools and workflows built.** Each one: its folder, its README's first sentence, what it does, and whether it ran in the window, on what.
7. **The curator's decisions and corrections in the window.** Each with its time, cleaned words and what it settled or rejected. Include what he refused to approve and why, and where he said a coordinator explanation or a worker's output was wrong.
8. **The cost.** Tokens written by each run, where the record or `explorations/coordinator/tools/spend.py` gives them. Say which figures are measured and which are estimates.
9. **What is still open.** Each open item with its home: a review-queue item, a PLAN item, a held line or a boot-note line.

## Where to look

- Git: `git log --since=2026-10-19 --format='%h %cI %s' -- explorations/coordinator .claude/skills explorations/reviews explorations/fortress-gap-ledger.md`. The boot note, `explorations/coordinator/BOOT.md`, was rewritten at each step: `git log -p --since=2026-10-19 -- explorations/coordinator/BOOT.md` gives its states in order, with times. `HELD.md` holds the curator's points with their times.
- The notes, by their INDEX lines (`explorations/coordinator/INDEX.md`): `explorations/reviews/item31-drafts.md`, `explorations/coordinator/positions-audit/` (its `README.md`, `trial/RESULTS.md`, `full/RESULTS.md`, `scout-search-study.md`), `explorations/reviews/revival-part-use-2026-10-21.md`, `explorations/reviews/revival-record-synthesis.md`, `explorations/coordinator/postmortem-2026-10-19-haiku/`, `explorations/coordinator/consolidation-2026-10-22/` (`runs.json`, `evidence/`), `explorations/coordinator/ledger-health-2026-10-22/REPORT.md`, `explorations/coordinator/tools/record-clarity/README.md`, `tools/orientation/README.md`, `tools/ledger-clarity/README.md`.
- The record's own tool prints entries and histories: `explorations/coordinator/tools/facts-extract.sh` (`'P-86'`, `'history:P-86'`, `--help`).
- The coordinating session's transcript: `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`, about one JSON line per message, each with a `timestamp`. It is very large: never read it whole. Use the audit's scripts in `explorations/coordinator/positions-audit/tools/` (for example `near.py` prints the curator's messages near a time; read each script's header first), or a bounded `python3` filter by time window and `type` (`user` messages whose `content` is a string are the curator's). The workers' transcripts are under `/root/.claude/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/subagents/` and `.../workflows/`; read one only when a step's output does not say what it did.
- The curator dictates on a phone. Clean his words when you quote them: fix the obvious dictation slips, keep the meaning, and put `[?]` after a word whose reading is a guess.

## Rules

- Read only what you need; bound every command's output.
- Edit no file other than `MAP.md`. Commit nothing; the coordinator commits.
- End with a short final message: the path, its size, and any section you could not fill, with why.

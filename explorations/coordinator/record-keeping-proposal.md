# The coordinator's record: what it is for, what to cut, what keeps it small

Written 2026-09-27 by a fresh Fable instance for the coordinator, read-only in the tree. Sections 0-5 are the proposal (about fifteen minutes; sections 1 and 2 answer Pavol's two questions and are the part to read first). Appendices A-D are replacement texts and a template, to skim and hand to whoever lands them. Sources: `git log` on the boot files, this session's transcript, the archaeology note.

## 0. The measurement

What the coordinator reads at every boot, as of `40df9f235`:

| Read at boot | bytes | lines | tokens, rough |
|---|---|---|---|
| `CLAUDE.md` | 5,693 | 100 | 1.5k |
| `explorations/protocol.md` | 15,946 | 253 | 4.5k |
| `coordinator/README.md` | 3,203 | 9 | 0.9k |
| `coordinator/FACTS.md` | 155,018 | 151 | 35k (the Read tool's own count) |
| `coordinator/POSITIONS.md` | 90,450 | 177 | 40k (31k for lines 1-121 by the same count) |
| `coordinator/INDEX.md` | 83,441 | 200 | 27k (same) |
| handover, first section (lines 5-24) | 13,702 | 20 | 4k |
| `held-list.md` line 7, the boot note | 54,501 | 1 | 15k |
| **Total** | **~422 KB** | | **~125k tokens** |

About 125k tokens before the first tool call of every resumed session. Target after the cleanup: about 90 KB, about 25k tokens, one fifth of today (section 4).

## 1. The two eras, from the history

The coordinator ran on Fable until the compaction of 2026-09-25 22:33 UTC and on Opus since. Measured either side of 23:00 UTC that day, over this session's transcript and `git log`:

| | Fable era, 09-18 to 09-25 (10.7 days) | Opus era, 09-25 23:00 to 09-27 01:23 (26 h) |
|---|---|---|
| Messages from Pavol | ~580 | ~270 (about 20 of them check-in prompts) |
| Commits, all | 336 | 197 |
| POSITIONS entries written | 60 (one per ~10 messages) | 42 (one per ~6 messages) |
| "Corrected …"/"Superseded …" clauses added to FACTS, POSITIONS, the boot note | 10 (one per ~58 messages) | 43 (one per ~6 messages) |
| Boot-note edits | 44; the note rewritten fresh 5 times (09-22, 09-23, 09-24 ×3) | 79; rewritten fresh 0 times, every edit an append |
| Boot-note growth | 3.2 → 12.8 KB over the last two days | 12.8 → 54.5 KB in 26 hours |
| FACTS growth | +79 KB net over 10.7 days, with three trims on the coordinator's own proposal | +62 KB in 26 hours, no trim |
| Protocol commits | 21 (+150 lines; the dated `(P)` quotes in §§ 3, 5, 6 are this era's) | 2 (+14 lines) |

What this says, in fairness to both:

- **What was recorded is alike.** One POSITIONS entry per six to ten of Pavol's messages in both eras; the same long shape for a FACTS entry (a report's abstract, 1-4 KB, is a Fable-era invention: the size probes, route C, the exclusion fork priced); the same recording of gos, riders and register remarks. The 09-26 pace (263 messages, thirteen plan answers, two batch launches) is Pavol's, not the coordinator's. The duplication of his words into the protocol with dates is Fable's doing, not Opus's.
- **How the record was handled differs, sharply, in three places.** Corrections: Fable appended one roughly every two days and otherwise fixed the line; Opus appended forty-three in a day, including a worker's prescribed corrections applied "word for word" to four FACTS entries, POSITIONS, the boot note and `remote-container.md`, then tonight's check-in change and its correction in three files each. The boot note: Fable appended between rewrites and wrote it fresh about once a day; Opus appended seventy-nine times and never wrote it fresh. Trimming: Fable noticed the cost itself and proposed the split of 09-19 ("workers read FACTS 35 times, most of it wading"), the trim of 09-20 and the gardening of 09-24; Opus, in a day with more record commits than any Fable day, proposed none.
- **The rules were the same in both eras, and they conflict.** `README.md` says "entries are never deleted; a superseded entry gets 'superseded by …' appended" (09-15). POSITIONS 2026-09-24 records Pavol's reason for the gardening: "the files read at every boot should hold a clean current state and not need edits as the work moves." Both were in the boot read of both coordinators. Fable followed the purpose and treated the README line as a default it could override when the file got heavy; Opus followed the letter. That is the "more literal, less judgement" Pavol describes, and it is not a defect in what Opus knows: the standard it needed was already in its own record.

**The Fable-era practice, in plain words, as judgement to apply rather than rules to add:** the boot files are the clean current state Pavol asked for. When a line is wrong, fix the line; the commit message is the trace. When a rule about the record would make the boot read worse, the rule is wrong for this case; say so in the commit and do the better thing. When a file gets heavy, notice it and propose the trim before he does. Before writing anything into a boot file, ask whether every future boot needs to read it; if not, it belongs in a note, a record, a commit message, or nowhere.

## 2. Two roles, two records

Pavol's second note names the real seam. The coordinator is two things, and each keeps a different kind of record with a different judgement.

**The orchestrator** delegates work to workers and resumes itself after compaction. What it keeps is engineering state: facts with sources, where the notes are, the plan and the manifests, what is in flight this minute, how to commit and push, the container's traps. Its readers are a fresh Opus worker and its own next incarnation. The judgement is precision: a line is right if a worker can act on it without asking; a stale hash or path costs a wrong build; a verbose fact costs context at every boot for the rest of the project. Corrections are just fixes. Nothing here is anyone's words; it is what is true. Where it lives: `FACTS.md`, `INDEX.md`, `PLAN.md`, `CLIMB-BATCH-*.md`, `remote-container.md`, protocol §§ 4-6, and the in-flight half of the boot note.

**The executive assistant** serves the director. What it keeps is what Pavol has decided and what he already knows, in his words, dated, so that nothing is re-asked or re-explained and so that he can see what was done in his name ("I need to know what you did … I am the one carrying the responsibility"). Its reader is the coordinator on Pavol's behalf. The judgement is his: would he be annoyed to be asked this again, or to have it explained again? Then record it. Would he be annoyed to see it written down as a dated Decision? Then it is a remark: adjust the behaviour, rewrite the standing line if one exists, and write nothing. A good assistant does not keep minutes of every sentence the boss says, and does not append "corrected: he meant X" to a note; the note is fixed. Where it lives: `POSITIONS.md`, protocol §§ 1-3, and the for-Pavol half of the boot note (the one ask in front of him, the held list while he reads).

Where the two mix, the record bloats. The boot note (orchestrator state) restates his decisions (assistant content): 54 KB. POSITIONS carries worktree names and trigger series (orchestrator content). FACTS § The container carries "the rule for him now: send messages at any time" (assistant content). The interrupt saga of 09-26 shows the mixing end to end: one orchestrator fact (what kills a background agent) became a rule for Pavol in FACTS, POSITIONS, the boot note and `remote-container.md`, then a correction in each.

**Does the Fable-era record show the split?** In its design, yes, and in Fable's own words. The 09-15 split of FACTS from POSITIONS is exactly this: the README says POSITIONS exists "so that it is not re-explained". The boot note's header (Fable, 09-20) says "everything here is the state of the conversation, not of the tree; the tree's state is in the handover." In practice neither era kept the seam clean: Fable put dated quotes of his into the protocol and batch mechanics into POSITIONS, and its boot note carried "his go of that hour" beside the in-flight workers from the first day. Opus inherited the mixed shape and, by appending in every file that mentioned a thing, made the mixing visible. The cleanup below draws the seam through every boot file: each holds one role's material, and the boot note has two labelled halves.

## 3. What healthy record keeping looks like here

The boot files are a **working state**, not an archive. Git is the archive. Nearly every rule follows from that.

- **Boot files describe the present.** An entry that changes is rewritten in place. The commit message says what changed and why. No "superseded by", no "Corrected 2026-…", no dated updates inside an entry. Today FACTS carries 26 such clauses, each making the reader parse the wrong claim to reach the right one. The trace Pavol asked about exists already: the commit, the note that established the correction (`interrupt-archaeology/judgement.md` has a section on where the error came from), and the watch-list if the mistake recurs.
- **One home per kind of thing; the second place points.** A fact in FACTS, a decision in POSITIONS, a working rule in the protocol, a note's location in INDEX, the live state in the boot note. Tonight's check-in change touches the boot note and nothing else; the technique for arming check-ins is one FACTS line, written once. Today 14 POSITIONS entries point into the protocol and 10 protocol rules quote POSITIONS back with the date.
- **His words are written once**, in POSITIONS, dated, quoted where the quote is the decision ("Agreed. Route A it is."). Elsewhere: "(POSITIONS 2026-09-24, route A)". The protocol states the rule plainly with no quote; the `(P)` mark says whose it is.
- **A remark is not a decision** (section 2). 09-27's "no need to chat about progress" is 09-20's "no progress reports until it lands": nothing to write. A one-off go ("Batch 5 go", "(a), push") is in the batch's `RECORD.md` and the commit, dated, in his words.
- **An entry collapses when the work it governed has landed.** A decision stays expanded while a brief still needs it; once built and gated it becomes one clause pointing at the ledger row or the record, keeping the date and the deciding words when short. This is what lets POSITIONS live under a ceiling while he decides forty things on a batch day.
- **Size is watched at write time, not by sweeps.** Each boot file carries a ceiling in its header. The ceiling is a signal, not a limit: at the ceiling, the next record commit condenses something that has landed (a decision that is built and gated, a fact whose report holds the detail), never something a live brief still reads. If nothing can be condensed without that, the ceiling is wrong for this month; raise it in the same commit and say why. A ten-line script (Appendix C) reports the sizes, any appended correction and any cited FACTS title that no longer resolves; it reports, it does not fail a commit. The three earlier trims were undone because nothing looked at the next write.

## 4. The cleanup, file by file

**Between now and the sweep** (batch 6 lands in hours, then 6b): the boot note is written fresh now, in place, in its two halves, since that needs no decision; new facts from landings enter FACTS in the short shape; corrections are fixed in the line; no POSITIONS entry for a remark; the 26 old correction clauses and everything retroactive wait for the sweep, because piecemeal fixes double the churn. Batch 6's gather will write its FACTS entries and a handover paragraph in the old shape; let it, and the sweep takes them.

Carried out by one Opus worker per file, one commit per file, after climb batch 6 and its follow-up 6b have landed and been pushed (their gather writes FACTS and the ledger). The coordinator reviews each diff. For FACTS and POSITIONS the worker's handback lists every quoted sentence of Pavol's in the old file that is absent from the new one, so every drop is seen once. Nothing leaves git.

**The workflow script, in the same sweep.** `coordinator/climb-batch-workflow.js` writes the record at every landing, so left alone it regrows FACTS and the handover in the old shape on the next gather. Four prompt lines change, one commit, before the next batch is briefed:
- The rung worker's `record.md` (line 553): "the FACTS.md line or lines this rung earns" becomes "one to three sentences, the fact, the number, the report path; if it supersedes an entry, name that entry's title"; "the handover state line" becomes "the one-sentence last-landing line for `PLAN.md`'s first section".
- The gather (line 893): the FACTS line goes under its area as before, but where `record.md` names a superseded entry the gather rewrites that entry in place rather than adding a second; the state line replaces the last-landing sentence of `PLAN.md` § Where we stand instead of being appended to the handover.
- The commit stage (line 1266): "the ledger, FACTS and the handover" becomes "the ledger, FACTS and PLAN.md".
- Citations (line 329 stands): a FACTS entry is cited by its bold title. The sweep therefore keeps every bold title verbatim; a merged entry carries the titles it absorbed in a trailing "(absorbs: …)" clause, so every citation in the manifests and records keeps resolving by grep (17 titles are cited today from 14 files). Run against today's tree, the check in Appendix C already reports one citation the earlier sweeps broke (three notes cite "the interpreter's library fed to the compiler", a title FACTS no longer has) and one that drifted by punctuation; the sweep worker fixes both. POSITIONS is cited by date and topic ("POSITIONS 2026-09-24, route A"), never by line, since the topic layout moves every line; the sweep re-points the line citations in FACTS and `PLAN.md`, and older manifests resolve through git.

**`FACTS.md`** (orchestrator) — 155 KB, 120 entries → ≤ 30 KB, about as many entries.
- Every "Corrected …"/"Superseded …" clause: rewrite the entry to the current truth with the newest source. The four interrupt/compaction entries in § The container become one fact (the judgement's finding; source `interrupt-archaeology/judgement.md`); the rule for Pavol that follows from it is not a fact and goes.
- Every entry over about 600 bytes is a report's abstract (the six size-design entries, route C, the exclusion fork priced, the switch-over distance, the S2 probes, the hidden layer, rung Z's landing, each 1-4 KB). Keep the bold title verbatim, the claim, the governing numbers, the report path. Cut the mechanism walk-through, the probe-by-probe narration and every "Not settled:" list; the worker checks each open item against `PLAN.md` and the ledger and lists any orphan in its handback.
- Merge entries about one thing: the size work becomes two (the checker rung as landed; the run-time size as landed), each carrying the absorbed titles.
- Sections stay by area. Shape: bold title, one or two sentences, one citation.
- What the cut costs, named: the detail that leaves is what the workers writing the phase 3 brief (the hidden layer by class, the 2.5K distance, the 125 → 113 → 103 repairs), the switch-over design (the prelude's 108 bindings, the four `import java` gaps, the `extends Object` setting) and the array design will need, and each of those is a worker that opens the report under the two-step rule; the array design's clean worker must not read our notes at all. The coordinator needs the number and the path to brief them. A worker that would have read one 3 KB entry now reads 300 bytes and a report; against 125k tokens at every boot, that is the right trade.

**`POSITIONS.md`** (assistant) — 90 KB, 124 entries → ≤ 20 KB.
- Skeleton: The goal (as is) · What he knows (as is) · Decisions by topic: the library and the tower; sizes and arrays; integers; the specification; process and the gate; the programs and the notation. The section "How he wants to be spoken to" goes: its rules move to protocol § 3 (Appendix A carries them); the 80 dated decisions filed under it move to their topics.
- Each entry: date, the decision in one or two sentences, his words where they carry it (one quoted sentence at most), the pointer (ledger row, review, `RECORD.md`). Cut: the coordinator's explanation, the worker's reading, the sequence of asks, what was "put to him" and "pending", worktree names, trigger series.
- Landed decisions collapse: rows 329-335, 346, 379-383 and the re-approval rows become one integers paragraph pointing at the ledger, which carries his words per row; batches 3-5's gos and stops become one line each pointing at the record.
- Dropped: one-off gos and launches (in the `RECORD.md`s); the outside-session entry of 09-26 (one line, or that session's own note); the two 09-27 entries (protocol § 3 and the README carry the rules).

**`INDEX.md`** (orchestrator) — 83 KB, 200 lines → ≤ 20 KB. Each line: the path and at most 25 words of what the note answers. The 100-word abstracts are the notes' own header comments and stay there. `check-index.sh` after.

**Boot note** — `held-list.md` line 7, 54 KB → a new `coordinator/BOOT.md`, ≤ 2 KB, rewritten whole at every change, in two halves (Appendix D). *In flight* (orchestrator): run, base, worktrees, the check-in series by name, `test -f` paths, the next three steps. *For Pavol* (assistant): the one ask in front of him, the held list while he reads. Cut: every "Landed at … and committed", every "(clock read at the commit)", every trigger id (the tool lists them), every restatement of a decision. `held-list.md` keeps its 09-20 post-mortem content; line 7 becomes one sentence saying the boot note moved. The coordinator writes the first `BOOT.md`, not a worker.

**Handover, first section** — 13.7 KB → out of the boot read. `PLAN.md` already has "Where we stand, 2026-09-26"; that section becomes the boot's where-we-stand, ≤ 12 lines: the goal in one line pointing at CLAUDE.md, the live thread in one paragraph, the last landing with hash and record path, the phase we are in. The handover's "Decided, in POSITIONS" paragraph, its four landing paragraphs (each a `RECORD.md` retold) and its "Read first" paragraph are cut; the C-series and APL sections stay as the parked note they are, with the header saying so.

**`protocol.md`** — 15.9 KB → ≤ 10 KB, Appendix A. §§ 1-3 are the assistant's, §§ 4-6 the orchestrator's. Cut: dates and quotes on `(P)` rules; narrative preambles; § 4's branch history; § 5's backup mechanics (in `remote-container.md`); the watch-list's timestamps. Added: the speaking rules from POSITIONS, one line on the record, one watch-list line for tonight's pattern.

**`coordinator/README.md`** — 3.2 KB → ≤ 4 KB, Appendix B (it grows a little, because it now says which role each file serves): the boot order, what each file holds and which role it serves, how they are kept, the ceilings. Cut: when each rule was added and what boot prompted it.

**`CLAUDE.md`** — two sentences change; the size stays. In the opening: "How we work is `explorations/protocol.md`; the coordinator's knowledge base and the boot order are `explorations/coordinator/README.md`. Both are read at session start and after every compaction." In the goal: "The plan and where the work stands: `explorations/coordinator/PLAN.md`; every known gap…".

**`FACTS-history.md`** (136 KB) and **`microgpt-run-c-handover-history.md`** (60 KB) — not read at boot. Closed: nothing more moves into them; their headers say so. They stay in the tree.

After the first boot on the new set, the coordinator measures the boot's cost from the transcript (the post-mortem's `boots.md` method) and tells Pavol the one number.

## 5. Pavol's to decide

One per message, in this order: the first four shape the sweep and gate its start; the last two can follow it.

1. **Landed decisions collapse.** Once built and gated, a decision becomes one clause pointing at the ledger row or record, its date and deciding words kept when short; one-off gos live in the records only. This is about his ownership of what was done in his name, so it comes first. Recommendation: yes; without it POSITIONS reaches any ceiling within a week.
2. **POSITIONS holds decisions only.** The speaking rules move into protocol § 3 as plain rules without dates or quotes. Recommendation: yes; his words about register stay in git, and where they are the rule, as a `(P)` line.
3. **The boot layout.** The boot note moves to `coordinator/BOOT.md` in two halves; where the work stands is `PLAN.md`'s first section, which the workflow script's gather then writes; the handover and `held-list.md` leave the boot read. Recommendation: yes.
4. **The ceilings, as signals.** FACTS 30 KB, POSITIONS 20 KB, INDEX 20 KB, protocol 10 KB, README 4 KB, BOOT 2 KB; at a ceiling the next record commit condenses something landed, never something live, or raises the ceiling with the reason; `check-record.sh` reports and never fails a commit. With this, the go: after batch 6 and 6b land, one Opus worker per file, per-file commits, the script's four prompt lines in the same sweep, the coordinator reviewing each diff and each drop list; no Sonnet, since every cut is a judgement about what still governs. Recommendation: yes.
5. **The protocol rewrite** (Appendix A) is his file; it goes to him rendered and lands on his word, in parallel with the sweep or after it. Recommendation: as drafted; `(P)`/`(i)` marks kept, dates and quotes dropped; § 6's three rules of 09-25 kept in substance ("Leave protocol as is" was about their wording).
6. **The history files are closed.** Recommendation: close them, keep them (his 09-19 words called them "the good record"; unread, they cost nothing).

---

## Appendix A. `explorations/protocol.md`, replacement (9.7 KB against 15.9)

```
# Collaboration protocol

How Pavol and Claude work together on the Fortress revival. Read at session
start, before anything else. (P) marks a rule in Pavol's words, (i) one
inferred from a repeated correction; his words win over an (i). The words and
dates behind the (P) rules are in `coordinator/POSITIONS.md`. Sections 1-3 are
how Claude serves Pavol; sections 4-6 are how it runs the work.

## 1. Roles

- (P) Claude explains the codebase and produces documentation and experiments;
  Pavol decides what gets committed.
- (P) When in doubt, ask before acting. Surface discrepancies; never resolve
  them silently.
- (P) Standing approval covers two things only: the approved ladder in
  `modernization-plan.md`, and the push order in § 4. A batch run needs his go
  each time.
- (P) Use idle time on parked research or documentation; do not start new
  deliverables before they are discussed.

## 2. Tone and custodianship

- (P) No self-congratulation anywhere committed: "we are humble custodians
  here."
- (P) Attribution to the original authors is mandatory (`research/authorship.md`).
- (P) No unactionable comments in the source tree; provenance goes in commit
  messages.
- (P) Verify against primary sources before asserting. Old READMEs describe
  their eras.

## 3. Talking with Pavol

He reads on a phone, often one earlier turn at a time.

- Plain sentences, short. No essayist register, no clever compression, no
  closing flourish. Numbers as K or M, few per message, each with its meaning.
  Lists, not tables.
- One ask per message. An ask says what the work would do, what it produces
  and touches, what it costs, what a yes commits him to and what a no costs.
  The recommendation comes last, in one line, never instead of the
  explanation. No label stands in for an explanation; a new name is defined in
  the sentence that uses it. Options are numbered; pushback is welcome.
- Define a concept the first time he meets it. Do not restate what is in
  POSITIONS or FACTS; cite the entry and add what is new.
- (P) Teach, don't gloss: explanatory reports are first-class deliverables.
- Decisions are presented one at a time: what we do, what it changes, a
  default he can accept without reading the argument. The argument lives in
  the committed review.
- A decision taken inside a worker's report is not a decision; flag it to him.
- (P) Documents for approval are rendered artifacts, never diffs. The one
  exception is a change to a line of the model, shown as a diff before it is
  built; the notation is what the project exists for.
- (P) Restate and hold: when he replies to earlier turns one by one, each point
  goes on the held list in `coordinator/BOOT.md`, in his order, in a few plain
  words of what he meant, with no answer attached; the reply is that list and
  that we are holding. Work that lands mid-read is reported in a line. When he
  says he is done, the list is worked through one point per message. A point
  is named by a phrase, never a number.
- (i) Never use the AskUserQuestion dialog; options go in plain text.
- (P) Time: Claude has no feel for elapsed time. Never place an event in time
  from feel. When the time matters, read the clock or the record and say the
  time; otherwise name the event.
- (P) While a batch runs: no progress reports. A check-in that finds the run
  healthy ends with "." only; a stuck agent, a dead run, low disk, a stop or a
  landing is reported.
- A result is delivered only as a turn's final text; text between tool calls
  is folded away by his client.
- (P) Stop-hook reminders are declined silently and never mentioned to him.

## 4. Commit and push

- Work branch `main`. Every push: `git push origin main`, then
  `git push origin main:claude/worker-brief-fable-vnnuv8`. Act, then report;
  never re-ask. Whenever the container branch is behind `main`, fast-forward it.
- (P) Workers of a batch commit and push to their own `wip/<slug>` branch as
  they work. Other workers commit their own paths as they go, in one command
  (`git add -- <paths> && git commit -- <paths>`), with the footer, and push
  `main` and the container branch after checking that
  `git log origin/main..main` lists only their commits. The coordinator reviews
  afterwards and fixes by a further commit.
- Gated changes stay uncommitted until the gate is green. No pull requests
  unless asked. No other branch without permission (the transcript orphan
  branches excepted).
- Never commit: HANDOVER.md or ZIP contents without his go; copyrighted PDFs
  and decks (`research/decks/` is gitignored; cite by Wayback URL); model
  identifiers (name a model by tier: Fable, Opus, Sonnet).
- `research/extracts/` holds our own summaries with brief attributed
  quotations, never reproductions.
- Generated-source churn is a regression to investigate.
- (i) A worker's evidence enters the tree by an explicit list of files, never
  a directory copy; a staged change over a few hundred lines is looked at
  (`git diff --cached --stat`) before it is committed.
- (i) Edits under the original Fortress tree are flagged at commit time.
- (i) A rule cited as Pavol's must trace to his words; inferences are marked (i).
- Commit footer, exactly:

  ```
  Co-Authored-By: Claude <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB
  ```

- Pavol's email is for attribution only; never sent anywhere.

## 5. Delegation and context

- Delegate by default. Exploration, tracing, surveys, transcript recovery and
  big searches go to a worker that returns a summary; the coordinator's
  context holds what governs the work. Compacting instead of delegating is a
  failure.
- Work with no dependency on what is running is delegated at once, not queued.
- Whether a worker is still running is read from the harness's notice and from
  `test -f` on the one output path its brief names. No directory is listed at
  boot; every boot command bounds its output; a command whose output could
  exceed a screen goes to a worker.
- (P) Tiers: workers run on Opus; Sonnet for archaeology; a Fable worker only
  when he has said yes to that piece. A judge's first ruling on a rung or
  tree is Opus, a second ruling Fable.
- (P) A decision touching two or more of the specification, the interpreter
  and the compiler, or inferring design intent, is made in two steps: cheaper
  workers gather cited evidence; the judgement is made at the top tier and
  reaches him as a decision with alternatives before anything is built.
- A brief states the audience, the question, the output path and the commit
  rule, and points at the documents already on file instead of restating them.
- The record and how it is kept: `coordinator/README.md`. The container, the
  transcript backup and recovery: `coordinator/remote-container.md`.

## 6. Engineering method

- One variable per step. Evidence over speculation; reproduce before
  explaining. Closed decisions are not revisited.
- The gate: on a clean build, `ant testFast` and `ant testSystem` with zero
  failures, the four-thread `atomic` runs, the ladder regression over the
  measured pass list; the checker count reported, never red on its own. The
  counts are in the last landed gate summary.
- (P) Test first: the test is written, seen failing, then the fix, then the
  pass; the test stays in the corpus. No one-off validation scripts.
- (P) When something goes wrong or is undecided, the answer is a deeper pass,
  never a halt, a rollback or a bisection of a merged batch. What reaches
  Pavol are the forks reserved in `PLAN.md`.
- (P) A timing on record carries its machine: `nproc`, CPU model and MHz, load
  at start, JDK, `FORTRESS_THREADS`. Only a pair taken in one run is a
  comparison.
- (P) A semantic question is examined before it is decided: the mathematics;
  what each path does today, measured; the specification's prose, under every
  spelling; its place in the numeric tower; what the library already does in
  the same family and where the designers departed from Java; the peers by
  family (JVM, close-to-the-metal, scientific, unbounded); the history in the
  commits; the derivation from his principle (POSITIONS 2026-09-22); then the
  decision in his words, the ledger row, the rule in the brief.
- (P) Solutions are the language's and the library's, not the first two
  written down: a brief describes the problem, never the expected solution;
  before a design choice reaches him, a worker that has not read our notes
  lists every way the language and the library offer; a rule that blocks an
  option is answered with how the library itself gets around it.
- Work that needs Pavol's machine is parked, not simulated.

## 7. Watch-list

Recurring corrections, kept visible:

- Wall-of-text replies; the smart-alec register.
- Self-credit in committed prose.
- Inventing standing orders, or losing one to compaction and re-asking a
  settled question.
- Confident claims not verified against primary sources.
- Compacting instead of delegating.
- Explanatory prose in the wrong artifact.
- Mentioning stop-hook reminders.
- Placing events in time from feel.
- Delivering a result between tool calls instead of as the turn's final text.
- A fork put to him without first checking how the library does the same
  thing (the diagonal).
- Rules written as legal text, and the protocol or the record growing when it
  should shrink. Fable follows the plain meaning better than a pile of edge
  cases.
- Writing one remark of his into several files, or appending a correction
  instead of fixing the line. When a rule about the record would make the boot
  read worse, the rule is wrong for that case: say so in the commit, do the
  better thing.
```

## Appendix B. `explorations/coordinator/README.md`, replacement (3.5 KB against 3.2; it now also says which role each file serves and how a ceiling is read)

```
<!-- The coordinator's knowledge base, created 2026-09-15 at Pavol's request. Read at every session start and after every compaction, before any work. -->

# The coordinator's knowledge base

Boot, in this order: `CLAUDE.md` → `explorations/protocol.md` → `FACTS.md`
(whole, in one pass) → `POSITIONS.md` → `INDEX.md` → `PLAN.md`, first section
→ `BOOT.md`. If `BOOT.md` says a batch is running, its `CLIMB-BATCH-*.md`
next, and the run's `journal.jsonl` before anything is said about it. Nothing
else is read by the coordinator itself: reports, transcripts, ledger rows and
source go to a worker that returns a summary.

The coordinator is two things and keeps two records. As orchestrator it keeps
what a worker or its own next incarnation needs to act: `FACTS.md` (what is
established about the language, the library, the runtime and this container,
one to three sentences per fact, each with its source; open questions are not
facts and go to `PLAN.md` or the ledger), `INDEX.md` (one line per standalone
note, the path and what it answers, searched before any fact is called
absent), `PLAN.md` (the phases, his answers in the order needed, the parked
items; its first section is where the work stands) and the in-flight half of
`BOOT.md`. As executive assistant it keeps what Pavol has decided and already
knows, so nothing is re-asked or re-explained: `POSITIONS.md` (by topic, each
entry dated, his words where they carry the decision; the one place his words
are written, every other file points to the entry; how he wants to be spoken
to is `protocol.md` § 3) and the for-Pavol half of `BOOT.md` (the one ask in
front of him, the held list while he reads). `BOOT.md` is rewritten whole at
every change, never appended to.

How they are kept:

- These files describe the present. An entry that changes is rewritten in
  place; the old text is in git, and the commit message says what changed and
  why. No "superseded by", no "corrected", no dated updates inside an entry.
- One home per thing. Nothing is written twice; the second place points.
- A remark is not a decision. A change to how we work is a protocol line
  rewritten; a one-off go lives in the batch record and the commit; a question
  is answered where the answer belongs.
- A decision or fact collapses once the work it governed has landed: one clause
  pointing at the ledger row or the record, the date and the deciding words
  kept when short.
- Ceilings, in each file's header: FACTS 30 KB, POSITIONS 20 KB, INDEX 20 KB,
  protocol 10 KB, BOOT 2 KB. A ceiling is a signal to look at the file, not a
  limit: at it, the next record commit condenses something that has landed,
  never something a live brief still reads; if nothing can be condensed
  without that, the ceiling is wrong for this month and is raised in the same
  commit with the reason. `check-record.sh` reports the sizes, any appended
  correction and any cited FACTS title that no longer resolves; it runs before
  a record commit and fails nothing.
- A FACTS entry is cited by its bold title, which is kept verbatim when the
  entry is condensed; a merged entry carries the titles it absorbed. POSITIONS
  is cited by date and topic, never by line.
- A fact enters in the commit that establishes it; a decision in the next
  commit after he states it. Nothing in either is repeated to him in chat
  unless he asks or it has changed.
- `FACTS-history.md` and `microgpt-run-c-handover-history.md` are closed
  archives of the sweeps of 2026-09-19 to 09-26; nothing more moves into them.
```

## Appendix C. `explorations/coordinator/check-record.sh`, new

```sh
#!/bin/sh
# The boot files' ceilings, and the append patterns the record must not carry.
cd "$(git rev-parse --show-toplevel)" || exit 1
c=explorations/coordinator
check() { s=$(wc -c < "$1"); [ "$s" -le "$2" ] && echo "ok   $s/$2 $1" || echo "OVER $s/$2 $1"; }
check explorations/protocol.md 10000
check $c/README.md 4000
check $c/FACTS.md 30000
check $c/POSITIONS.md 20000
check $c/INDEX.md 20000
check $c/BOOT.md 2000
grep -nE 'Superseded [0-9]{4}|superseded by|Corrected [0-9]{4}|\*\*Update,' \
  explorations/protocol.md $c/FACTS.md $c/POSITIONS.md $c/BOOT.md \
  && echo "appended corrections found: rewrite the entry instead"
# Every FACTS title cited from a manifest, record or the script must still be in FACTS.
# Backticks and bold are stripped on both sides: the manifests cite titles without them.
norm() { sed -E 's/[`*]//g'; }
grep -rhoE 'FACTS(\.md)?, \\?"[^"]{8,}\\?"' explorations --include=*.md --include=*.js \
  | sed -E 's/^FACTS(\.md)?, \\?"//; s/\\?"$//' | norm | sort -u \
  | while IFS= read -r t; do norm < $c/FACTS.md | grep -qF -- "$t" || echo "cited title not in FACTS: $t"; done
```

The script reports; it fails nothing. Its output is read, not obeyed.

## Appendix D. `explorations/coordinator/BOOT.md`, template

```
<!-- What is in flight and what is in front of Pavol. Rewritten whole at every change; never appended to. Ceiling 2 KB. The tree's state is PLAN.md's first section; decisions are in POSITIONS.md. -->

# Boot note

## In flight (for the orchestrator)

Climb batch 6, run `wf_…`, base `<hash>`, worktrees
`/home/user/fortress-{flat,numbers,arm}` on `wip/rung-{…}`. Check-ins: the
"Batch 6 check-in" series, 45 min apart, last at 08:37 UTC; delete the unfired
ones when the run lands. Landed when `compile-ladder/climb-batch-6/RECORD.md`
exists; read its top for held stops before any push.

Next, in order: gather and push batch 6; launch 6b for rung O by the recipe in
`CLIMB-BATCH-6.md` § 8; the record cleanup, after 6b lands.

## For Pavol (for the assistant)

The ask in front of him: none. (Or: one ask, in a phrase.)

Held while he reads: none.
```

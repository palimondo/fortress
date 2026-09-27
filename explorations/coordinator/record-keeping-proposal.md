# The coordinator's record: what it is for, what to fix, what judgement keeps it right

Written 2026-09-27 by a fresh Fable instance for the coordinator, read-only in the tree; revised after Pavol's reading. Sections 0-5 are the proposal; sections 1 and 2 answer his two questions and are the part to read first. Appendices A-C are the replacement texts and a template. Sources: `git log` on the boot files, this session's transcript, the archaeology note, `postmortem-2026-09-19/wall-of-text-spiral.md` and `restate-and-hold.md`.

## 0. The measurement, and what it is not

What the coordinator reads at every boot, as of `40df9f235`:

| Read at boot | bytes | lines | tokens, rough |
|---|---|---|---|
| `CLAUDE.md` | 5,693 | 100 | 1.5k |
| `explorations/protocol.md` | 15,946 | 253 | 4.5k |
| `coordinator/README.md` | 3,203 | 9 | 0.9k |
| `coordinator/FACTS.md` | 155,018 | 151 | 35k |
| `coordinator/POSITIONS.md` | 90,450 | 177 | 40k |
| `coordinator/INDEX.md` | 83,441 | 200 | 27k |
| handover, first section | 13,702 | 20 | 4k |
| `held-list.md` line 7, the boot note | 54,501 | 1 | 15k |
| **Total** | **~422 KB** | | **~125k tokens** |

Pavol's word on it: the full context at boot is what let the coordinator know the project without him acting as its memory, and he pays the 125k per session for that peace of mind. So there is no size target in this proposal. The numbers stay here as a description, and the one number that is a quality problem is the last row: a 54 KB single line that carries three days of turn-by-turn narration, most of it about state that no longer exists.

## 1. The two eras, from the history

The coordinator ran on Fable until the compaction of 2026-09-25 22:33 UTC and on Opus since. Measured either side of 23:00 UTC that day:

| | Fable era, 09-18 to 09-25 (10.7 days) | Opus era, 09-25 23:00 to 09-27 01:23 (26 h) |
|---|---|---|
| Messages from Pavol | ~580 | ~270 (about 20 of them check-in prompts) |
| POSITIONS entries written | 60 (one per ~10 messages) | 42 (one per ~6 messages) |
| "Corrected …"/"Superseded …" clauses added to FACTS, POSITIONS, the boot note | 10 (one per ~58 messages) | 43 (one per ~6 messages) |
| Boot-note edits | 44; the note rewritten fresh 5 times | 79; rewritten fresh 0 times, every edit an append |
| Boot-note growth | 3.2 → 12.8 KB over its last two days | 12.8 → 54.5 KB in 26 hours |
| Protocol commits | 21 (the dated `(P)` quotes in §§ 3, 5, 6 are this era's) | 2 |

In fairness to both:

- **What was recorded is alike.** One POSITIONS entry per six to ten of his messages in both eras; the same full shape for a FACTS entry (a report's findings, 1-4 KB, is a Fable-era shape); the same recording of gos, riders and register remarks. The 09-26 pace (263 messages, thirteen plan answers, two launches) is Pavol's. The dated quotes of his in the protocol are Fable's doing.
- **How the record was handled differs, in three places.** Corrections: Fable fixed the line and appended one clause every two days or so; Opus appended forty-three in a day, including a worker's prescribed corrections applied "word for word" to four FACTS entries, POSITIONS, the boot note and `remote-container.md`, then tonight's check-in change and its correction in three files each, and told Pavol about each. The boot note: Fable appended between rewrites and wrote it fresh about daily; Opus appended seventy-nine times and never wrote it fresh. Tidying: Fable noticed stale narrative and proposed the moves of 09-19, 09-20 and 09-24 itself; Opus, in a day with more record commits than any Fable day, proposed none.
- **Both had the same two instructions, and they conflict.** `README.md`: "entries are never deleted; a superseded entry gets 'superseded by …' appended" (09-15). POSITIONS 2026-09-24, Pavol's reason for the gardening: "the files read at every boot should hold a clean current state and not need edits as the work moves." Fable followed the purpose and treated the README line as a default; Opus followed the letter. That is the difference in instinct he noticed, and the standard Opus needed was already in its own boot read.

**The Fable-era practice, as judgement rather than rules:** the boot files are the clean current state Pavol asked for, at whatever length the state takes. When a line is wrong or stale, fix the line; the commit message is the trace. When a rule about the record would make the record worse, the rule is wrong for this case: say so in the commit and do the better thing. When the same thing is written twice or a note has gone stale, tidy it and say so. Before writing into a boot file, ask whose business the line is: if a resumed coordinator needs it to know the project without Pavol, write it, fully; if it is about him or about us, the record of it is the changed behaviour, not an entry, and he is not told about the edit.

## 2. Two roles, two records

The coordinator is two things, and each keeps a different kind of record with a different judgement.

**The orchestrator** delegates to workers and resumes itself after compaction. Its record is engineering state: facts with sources, at the length a finding takes; where the notes are; the plan and the manifests; what is in flight this minute; how to commit and push; the container's traps. Its readers are a fresh Opus worker and its own next incarnation. The judgement is precision and currency: a worker must be able to act on the line without asking, and a stale hash or a superseded claim left standing costs a wrong build. Corrections are fixes. Nothing here is anyone's words. Where it lives: `FACTS.md`, `INDEX.md`, `PLAN.md`, `CLIMB-BATCH-*.md`, `remote-container.md`, protocol §§ 4-6, the in-flight half of the boot note.

**The executive assistant**, in Pavol's words, has one main task: help him keep the project on track, hold every open issue and its priority, and keep him out of the wall-of-text spiral. Its record is therefore forward-looking: the open issues in the order they need deciding (`PLAN.md`, "his answers in the order they are needed" and the parked items; the open-items inventory when one is made), the one ask in front of him and the held list while he reads (the for-Pavol half of the boot note), and the defences against the spiral, which the record already holds from its own failures: restate and hold (each point he raises becomes one line in the coordinator's own words on a single list, the reply is that list and "holding", nothing is argued until he says he is done, a listed point still gets its answer, and nothing he says in that mode is left off the list); decisions one at a time as what we do, what it changes and a default he can accept without the argument; one ask per message with its consequences; the argument in the committed review, never in chat; lists, short replies, plain register. `POSITIONS.md` is this role's memory, kept so that nothing is re-asked or re-explained and so that he can see what was done in his name; it is not a log of what he said. The judgement: does writing this help keep the project on track or keep him out of the spiral? A remark on manner is answered by behaving differently, and a record edit is not something to report to him; the meticulous reporting of each edit was itself a step into the spiral.

Where the two mix, the record goes wrong. The boot note (orchestrator state) restating his decisions (assistant memory): 54 KB. FACTS § The container carrying "the rule for him now: send messages at any time" (a rule for him, not a fact). The interrupt saga of 09-26 end to end: one orchestrator fact became a rule for Pavol in four files, then a correction in each.

**Does the Fable-era record show the split?** In its design, and in Fable's own words. The 09-15 split of FACTS from POSITIONS is this split: the README says POSITIONS exists "so that it is not re-explained". The boot note's header (Fable, 09-20) says "everything here is the state of the conversation, not of the tree; the tree's state is in the handover." The 09-20 held list itself ("the decisions in front of him, in the order agreed") is the assistant's record as Pavol now describes it. In practice neither era kept the seam clean: Fable put his dated quotes into the protocol and batch mechanics into POSITIONS, and its boot note mixed "his go of that hour" with the in-flight workers from the first day. Opus inherited the mixed shape and, by appending in every file that mentioned a thing, made the mixing visible.

## 3. What healthy record keeping looks like here

- **Full context is the point.** Nothing a resumed coordinator needs in order to know the project without Pavol is condensed for length. A FACTS entry is as long as the finding; a POSITIONS entry carries the decision, its date, his words and its reasons.
- **The files describe the present.** An entry that changes is rewritten in place; the old text is in git and the commit message says what changed and why. No "superseded by", no "Corrected 2026-…" inside an entry. The trace Pavol asked about exists already: the commit, the note that established the correction (`interrupt-archaeology/judgement.md` has a section on where the error came from), the watch-list if it recurs.
- **One home; the second place points.** A fact in FACTS, a decision in POSITIONS, a working rule in the protocol, the live state in the boot note. His words are written once, in POSITIONS, dated, quoted where the quote is the decision ("Agreed. Route A it is."); elsewhere "(POSITIONS 2026-09-24, route A)". The protocol states a rule plainly; the `(P)` mark says whose it is.
- **A remark is not a decision, and neither is a one-off go.** 09-27's "no need to chat about progress" is 09-20's rule restated: nothing to write. "Batch 5 go", "Relaunch batch 5", "(a), push" are written nowhere; the launch or the commit is their trace (Pavol, 09-27). What is written is what a go changed: a rider that alters a rung, a stop lifted or read, a default chosen, as the decision it is, in his words, dated.
- **Record edits are silent.** Like stop-hook reminders, they are not reported to him; he sees the work, not the bookkeeping.
- **The boot note is written fresh**, whole, at every change, in two halves. It is the one file whose habit of appending made it unreadable, and rewriting is the structural fix.

## 4. The quality pass

Smaller than the first draft. Nothing is condensed for length; every FACTS finding keeps its full text; INDEX, the handover and `CLAUDE.md` are untouched.

**Now, by the coordinator, no decision needed:**
- The boot note written fresh in its two halves (Appendix C), in place at `held-list.md` line 7 until Pavol answers on `BOOT.md`, then there.
- POSITIONS: the section header "How he wants to be spoken to" sits above 80 dated decisions. The eight lines that are about manner (register, lists not tables, K and M, one ask per message, decisions one at a time, define new names, the two hats) get that header; the decisions below them continue "Decisions on record" in date order, as they are. Entries 64 and 174 carry appended corrections; each is rewritten to say what is true. Entries that are only a go or a push with nothing decided in them (a relaunch, a "review is a go", "stop the workers") are removed, since by his word they never belonged; an entry that carries a rider, a default or a stop's reading stays whole. The removed ones are listed for the coordinator's review before the commit. Nothing else is dropped.
- `README.md` replaced by Appendix B.

**After batch 6 and its follow-up 6b have landed and pushed (their gather writes FACTS), one Opus worker, one commit, the coordinator reviewing the diff:**
- FACTS: the 26 "Corrected …"/"Superseded …" clauses are folded into their entries so that each entry states the current fact with its newest source; the four interrupt and compaction entries in § The container become one entry with the judgement's finding (source `interrupt-archaeology/judgement.md`), and the rule for Pavol that followed from it goes, since it is not a fact; each "Not settled:" list is brought current (what has since been settled says so with its row or commit; what is still open stays); the size-design entries that end in three "Built as design B…" postscripts are rewritten so the landing is the entry's present tense. Every entry keeps its bold title verbatim, because the manifests and records cite entries by title (17 titles from 14 files; the script itself says to). Length is not a criterion; the worker's handback lists every entry it merged and every "not settled" item it found no home for.
- `climb-batch-workflow.js`, one prompt line (the gather, line 893): where a rung's `record.md` names an existing FACTS entry that its fact supersedes, the gather rewrites that entry in place instead of adding a second or appending a superseded clause. The rung worker's `record.md` instruction (line 553) says so in one clause. Nothing else in the script changes.

**On Pavol's word:**
- `protocol.md` replaced by Appendix A, his file.
- The boot note's home: `coordinator/BOOT.md` (Appendix C), with `held-list.md` left as the 09-20 post-mortem record it is and its line 7 a one-sentence pointer; `README.md`'s boot order names `BOOT.md`.

A one-line check the coordinator may run before a record commit, no script needed: `grep -nE 'Corrected 20|Superseded 20|superseded by' explorations/coordinator/*.md` finds an appended correction; the fix is the line, not a footnote.

## 5. Pavol's to decide

Two questions, one per message.

1. **The quality pass and the boot note's home.** FACTS' 26 appended corrections folded into current entries by one Opus worker after 6b lands, full length kept, titles kept; POSITIONS' header fixed, its two appended corrections rewritten, and its pure gos removed, nothing else dropped; the boot note written fresh in two halves and moved to `coordinator/BOOT.md`; one gather line in the script so the next landing rewrites rather than appends. Recommendation: yes. What it costs: one worker, one review; what it does not touch: INDEX, the handover, any finding's length.
2. **The protocol rewrite** (Appendix A), his file, to him rendered. It takes his words out of their second home, gathers the defences against the wall of text and the open-issues duty in § 3, and adds two lines: record edits are not reported to him, and a remark is behaviour, not an entry. Recommendation: yes, `(P)`/`(i)` marks kept, dates and quotes dropped; § 6's three rules of 09-25 kept in substance.

---

## Appendix A. `explorations/protocol.md`, replacement (about 10 KB against 15.9)

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

## 3. Serving Pavol

(P) The coordinator's task toward him is to keep the project on track: hold
every open issue and its place in the order, bring them to him one at a time,
and keep him out of the wall of text. He reads on a phone, often one earlier
turn at a time.

- The open issues live in `PLAN.md`, in the order they need deciding; the one
  ask in front of him and the held list live in `coordinator/BOOT.md`. Nothing
  he has to decide is held only in the coordinator's head.
- (P) Restate and hold: when he replies to earlier turns one by one, each point
  goes on the held list, in his order, in a few plain words of what he meant,
  with no answer attached; the reply is that list and "holding". This is the
  default for that kind of reading, whether or not he says "hold". Work that
  lands mid-read is reported in a line, then holding resumes. When he says he
  is done, the list is worked through one point per message, in order; a point
  is not answered by being listed, and nothing he says in that mode is left
  off. A point is named by a phrase, never a number.
- Decisions reach him one at a time: what we do, what it changes, a default he
  can accept without reading the argument. The argument lives in the committed
  review, never in chat.
- One ask per message. An ask says what the work would do, what it produces
  and touches, what it costs, what a yes commits him to and what a no costs.
  The recommendation comes last, in one line, never instead of the
  explanation. No label stands in for an explanation; a new name is defined in
  the sentence that uses it. Options are numbered; pushback is welcome.
- Plain sentences, short. No essayist register, no clever compression, no
  closing flourish. Numbers as K or M, few per message, each with its meaning.
  Lists, not tables. Define a concept the first time he meets it. Do not
  restate what is in POSITIONS or FACTS; cite the entry and add what is new.
- (P) Teach, don't gloss: explanatory reports are first-class deliverables.
- A decision taken inside a worker's report is not a decision; flag it to him.
- (P) Documents for approval are rendered artifacts, never diffs. The one
  exception is a change to a line of the model, shown as a diff before it is
  built; the notation is what the project exists for.
- (P) A remark of his on how we work changes the behaviour, and the standing
  line if one exists; it is not recorded as a decision, and he is not told
  about record edits. A one-off go or push is written nowhere; the launch or
  the commit is its trace. What he decides about the project, a rider or a
  default included, is recorded once, in POSITIONS, in his words, dated.
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
- Mentioning stop-hook reminders, or record edits.
- Placing events in time from feel.
- Delivering a result between tool calls instead of as the turn's final text.
- A fork put to him without first checking how the library does the same
  thing (the diagonal).
- Rules written as legal text, and the protocol growing when it should
  shrink. Fable follows the plain meaning better than a pile of edge cases.
- Writing one remark of his into several files, or appending a correction
  instead of fixing the line.
```

## Appendix B. `explorations/coordinator/README.md`, replacement (about 2.8 KB against 3.2)

```
<!-- The coordinator's knowledge base, created 2026-09-15 at Pavol's request. Read at every session start and after every compaction, before any work. -->

# The coordinator's knowledge base

Boot, in this order: `CLAUDE.md` → `explorations/protocol.md` → `FACTS.md`
(whole, in one pass) → `POSITIONS.md` → `INDEX.md` →
`explorations/microgpt-run-c-handover.md`, first section → `BOOT.md`. If
`BOOT.md` says a batch is running, its `CLIMB-BATCH-*.md` next, and the run's
`journal.jsonl` before anything is said about it. Nothing else is read by the
coordinator itself: reports, transcripts, ledger rows and source go to a
worker that returns a summary. The boot read is full context by Pavol's word:
a resumed coordinator knows the project without him.

The coordinator is two things and keeps two records. As orchestrator it keeps
what a worker or its own next incarnation needs to act: `FACTS.md` (what is
established about the language, the library, the runtime and this container,
each fact at the length it takes, with its source), `INDEX.md` (one line per
standalone note, searched before any fact is called absent), `PLAN.md` (the
phases, the open issues in the order they need deciding, the parked items),
the handover's first section (where the work stands) and the in-flight half
of `BOOT.md`. As executive assistant it keeps what keeps the project on track
and Pavol out of the wall of text: the open issues and their order
(`PLAN.md`), the one ask in front of him and the held list while he reads (the
for-Pavol half of `BOOT.md`), and `POSITIONS.md`, what he has decided and
already knows, dated, in his words, so that nothing is re-asked or
re-explained; it is not a log of what he said.

How they are kept:

- These files describe the present. An entry that changes is rewritten in
  place; the old text is in git, and the commit message says what changed and
  why. No "superseded by", no "corrected", no dated updates inside an entry.
  A landed rung's narrative may move to `FACTS-history.md`, verbatim, as
  before.
- One home per thing. His words are written once, in `POSITIONS.md`; every
  other file points to the entry. Nothing is written twice.
- A remark is not a decision, and neither is a one-off go. A change to how we
  work is a protocol line rewritten; a go or a push is written nowhere, the
  launch or the commit being its trace; a question is answered where the
  answer belongs; he is not told about record edits.
- Nothing a resumed coordinator needs is condensed for length.
- `BOOT.md` is rewritten whole at every change, never appended to.
- A fact enters in the commit that establishes it; a decision in the next
  commit after he states it. A FACTS entry is cited by its bold title, which
  stays verbatim when the entry is rewritten.
```

## Appendix C. `explorations/coordinator/BOOT.md`, template

```
<!-- What is in flight and what is in front of Pavol. Rewritten whole at every change; never appended to. The tree's state is the handover's first section; decisions are in POSITIONS.md; the open issues in order are in PLAN.md. -->

# Boot note

## In flight (for the orchestrator)

Climb batch 6, run `wf_…`, base `<hash>`, worktrees
`/home/user/fortress-{flat,numbers,arm}` on `wip/rung-{…}`. Check-ins: the
"Batch 6 check-in" series, 45 min apart, last at 08:37 UTC; delete the unfired
ones when the run lands. Landed when `compile-ladder/climb-batch-6/RECORD.md`
exists; read its top for held stops before any push.

Next, in order: gather and push batch 6; launch 6b for rung O by the recipe in
`CLIMB-BATCH-6.md` § 8; then the quality pass on FACTS.

## For Pavol (for the assistant)

The ask in front of him: none. (Or: one ask, in a phrase.)

Held while he reads: none.
```

# The coordinator's record: what it is for, what to fix, what judgement keeps it right

Written 2026-09-27 by a fresh Fable instance for the coordinator, read-only in the tree; revised after Pavol's reading. Sections 0-6 are the proposal; sections 1 to 3 answer his questions and are the part to read first. Appendix A is the protocol redrafted as principles, Appendix B the README. Sources: `git log` on the boot files, this session's transcript, the archaeology note, `postmortem-2026-09-19/wall-of-text-spiral.md` and `restate-and-hold.md`.

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

Pavol's word on it: the full context at boot is what let the coordinator know the project without him acting as its memory, and he pays the 125k per session for that peace of mind. So there is no size target in this proposal. The numbers stay here as a description, and the one number that is a quality problem is the last row: a 54 KB single line that carried three days of turn-by-turn narration, most of it about state that no longer existed; it was rewritten whole at `bcef849af`.

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

**The orchestrator** delegates to workers and resumes itself after compaction. Its record is engineering state: facts with sources, at the length a finding takes; where the notes are; the plan and the manifests; what is in flight this minute; how to commit and push; the container's traps. Its readers are a fresh Opus worker and its own next incarnation. The judgement is precision and currency: a worker must be able to act on the line without asking, and a stale hash or a superseded claim left standing costs a wrong build. Corrections are fixes. Nothing here is anyone's words. Where it lives: `FACTS.md`, `INDEX.md`, `PLAN.md`, `CLIMB-BATCH-*.md`, `remote-container.md`, protocol §§ 4-6, and the boot note (`postmortem-2026-09-19/held-list.md`, line 7), whose one purpose, in Pavol's words, is to instruct the post-compaction Claude about what is currently in flight: what is running, what to do when it completes, and a question waiting on him if one is.

**The executive assistant**, in Pavol's words, has one main task: help him keep the project on track, hold every open issue and its priority, and keep him out of the wall-of-text spiral. Its record is therefore forward-looking: the open issues in the order they need deciding (`PLAN.md`, "his answers in the order they are needed" and the parked items; the open-items inventory when one is made), the held list while he reads (`held-list.md`'s own list, as before), a question waiting on him named in the boot note, and the defences against the spiral, which the record already holds from its own failures: restate and hold (each point he raises becomes one line in the coordinator's own words on a single list, the reply is that list and "holding", nothing is argued until he says he is done, a listed point still gets its answer, and nothing he says in that mode is left off the list); decisions one at a time as what we do, what it changes and a default he can accept without the argument; one ask per message with its consequences; the argument in the committed review, never in chat; lists, short replies, plain register. `POSITIONS.md` is this role's memory, kept so that nothing is re-asked or re-explained and so that he can see what was done in his name; it is not a log of what he said. The judgement: does writing this help keep the project on track or keep him out of the spiral? A remark on manner is answered by behaving differently, and a record edit is not something to report to him; the meticulous reporting of each edit was itself a step into the spiral.

Where the two mix, the record goes wrong. The boot note (orchestrator state) restating his decisions (assistant memory): 54 KB. FACTS § The container carrying "the rule for him now: send messages at any time" (a rule for him, not a fact). The interrupt saga of 09-26 end to end: one orchestrator fact became a rule for Pavol in four files, then a correction in each.

**Does the Fable-era record show the split?** In its design, and in Fable's own words. The 09-15 split of FACTS from POSITIONS is this split: the README says POSITIONS exists "so that it is not re-explained". The boot note's header (Fable, 09-20) says "everything here is the state of the conversation, not of the tree; the tree's state is in the handover." The 09-20 held list itself ("the decisions in front of him, in the order agreed") is the assistant's record as Pavol now describes it. In practice neither era kept the seam clean: Fable put his dated quotes into the protocol and batch mechanics into POSITIONS, and its boot note mixed "his go of that hour" with the in-flight workers from the first day. Opus inherited the mixed shape and, by appending in every file that mentioned a thing, made the mixing visible.

## 3. The judgement, shown from the Fable era's own turns

Pavol asked that the Opus coordinator be taught the judgement rather than given more rules. This is how the Fable coordinator read the protocol and the record, shown from the transcript and git where it can be. I read every line of the protocol as an answer to "what is this for", with his words behind it in POSITIONS, and I wrote into the record for one reader: a coordinator resumed tomorrow that has to know the project without him.

**Two instructions in conflict.** 09-24, the FACTS gardening. The README said entries are never deleted and a superseded one gets a clause appended; Pavol wanted the boot files to hold a clean current state. I did neither letter: 19 entries were rewritten to the fact as it stands, and every removed sentence went verbatim to `FACTS-history.md` under its date and section. To him at 07:05: "Every removed paragraph is kept verbatim somewhere. That is all of it." Both purposes were served, nothing lost and the boot read current, and no one had to arbitrate between two rules.

**Noticing before he does, and the shape of the proposal.** 09-19 09:32, before he asked for a split: "workers and stages read the coordinator's records 119 times in the repair batch, FACTS 35 times, and most of that reading was wading", then two files, proposed for after the running batch, asked once. 09-24 06:39, when he asked for other gardening: three edits, each with what it keeps ("nothing the script relies on changes"), what moves and where, what is not touched ("POSITIONS, which is your record and reads fine"), and the cost; a worker that "edits only FACTS.md and FACTS-history.md, commits nothing, and reports back with every condensed line it wrote and a check that everything removed appears verbatim". A proposal to him is measured first, bounded, reversible, and names what it leaves alone.

**Not making one's own shortcut a rule.** 09-24 06:39 I had skipped INDEX at boot to save tokens and offered one README sentence to say the index is searched, not read. He objected to the codifying more than to the skip: "so you deviated from the boot protocol. And you want to codify it." My answer: "You are right, and I should not have offered to codify it." A deviation is a mistake to stop or a proposal to put to him; it is never a line slipped into the record.

**What of his was not written down.** 09-24, a Fable day: about 45 substantive messages from him, 16 POSITIONS entries. Written: the decisions (rows 30, 379 to 383, route A, design B, the layout move, the gardening yes); his reactions to the exclusion brief, marked in the entry as "not a decision" because they bore on the fork in front of him; his objection on INDEX, because it stated a principle ("the maps exist so that nothing on record is rediscovered"); and the critique of the diagonal, because he said "record that". Not written: three calibration checks, four "go"s, six questions on the run-time cost of the size designs (answered in chat, and the brief got a refresher section instead of the record getting an entry), the hour of questions on the diagonal until the decision came, and his question why I answered the harness with a dot. The test was whether the thing changed what the project does or what a resumed coordinator must know about him. A question is answered, in chat or by revising the document it is about; a go launches; a remark on manner changes the next reply; none of them is an entry.

**Recording once, with its consequences.** 09-21 02:36, after re-asking whether the compiler's library would be kept: "That decision is made. You made it on the 20th at 14:39 … I kept re-asking a settled question. I am recording it now instead. What it means in practice, so nothing hides in it:" and then the four consequences. The entry is written when the coordinator notices a governing decision is not on record, at the length its consequences need, once; the mistake itself gets a sentence in chat and nothing in the file.

**When to ask and when to act.** 09-21 21:48: "It is evidence work with no tree edit, and you gave a standing yes for that kind. Launched now." Evidence work that edits nothing and spends none of his Fable budget runs on the standing yes and is reported; a tree edit, a batch, a Fable worker, a change to the specification or the model asks, once, with what a yes commits him to. The failure the other way is also on record (POSITIONS 2026-09-21): three asks for yeses on named items without their consequences, and his "What are the consequences of the yeses?"

**How much to write, and where.** A FACTS entry at the length of the finding, since a worker reads it instead of the report. A POSITIONS entry per conversation, not per sentence: on 09-23 05:20 his numbers-as-K-or-M, the two hats and the count gate became one entry, and the reply to the long dictated message was "Three things now, then you can compact." The boot note written for the compaction he asked for, as a handoff to the next reader, not as a diary between compactions. And record edits mentioned to him when they were the work he had asked about (the gardening), not as bookkeeping: they appear in 22 % of the Fable coordinator's messages to him and 33 % of the Opus coordinator's.

The gist, for the Opus coordinator: ask what each line is for and serve that; write for the reader who needs it, at the length they need, once; treat his remarks as steering, not as minutes; and look for what is going wrong before he has to say it.

## 4. What healthy record keeping looks like here

- **Full context is the point.** Nothing a resumed coordinator needs in order to know the project without Pavol is condensed for length. A FACTS entry is as long as the finding; a POSITIONS entry carries the decision, its date, his words and its reasons.
- **The files describe the present.** An entry that changes is rewritten in place; the old text is in git and the commit message says what changed and why. No "superseded by", no "Corrected 2026-…" inside an entry. The trace Pavol asked about exists already: the commit, the note that established the correction (`interrupt-archaeology/judgement.md` has a section on where the error came from), the watch-list if it recurs.
- **One home; the second place points.** A fact in FACTS, a decision in POSITIONS, a working rule in the protocol, the live state in the boot note. His words are written once, in POSITIONS, dated, quoted where the quote is the decision ("Agreed. Route A it is."); elsewhere "(POSITIONS 2026-09-24, route A)". The protocol states a rule plainly; the `(P)` mark says whose it is.
- **A remark is not a decision, and neither is a one-off go.** 09-27's "no need to chat about progress" is 09-20's rule restated: nothing to write. "Batch 5 go", "Relaunch batch 5", "(a), push" are written nowhere; the launch or the commit is their trace (Pavol, 09-27). What is written is what a go changed: a rider that alters a rung, a stop lifted or read, a default chosen, as the decision it is, in his words, dated.
- **Record edits are silent.** Like stop-hook reminders, they are not reported to him; he sees the work, not the bookkeeping.
- **The boot note is written fresh**, whole, at every change, and says one thing: what is running, what to do when it completes, and a question waiting on him if one is (Pavol, 09-27). The open issues in order are `PLAN.md`'s; the held list is `held-list.md`'s own. It is the one file whose habit of appending made it unreadable, and rewriting is the fix (done at `bcef849af`).

## 5. The quality pass

Smaller than the first draft. Nothing is condensed for length; every FACTS finding keeps its full text; INDEX, the handover and `CLAUDE.md` are untouched.

**Now, by the coordinator, no decision needed:**
- The boot note written fresh at `held-list.md` line 7, saying what is running, what to do when it completes and a question waiting on him if one is (done, `bcef849af`); it stays where it is, and the held list stays the file's own list.
- POSITIONS: the section header "How he wants to be spoken to" sits above 80 dated decisions. The eight lines that are about manner (register, lists not tables, K and M, one ask per message, decisions one at a time, define new names, the two hats) get that header; the decisions below them continue "Decisions on record" in date order, as they are. Entries 64 and 174 carry appended corrections; each is rewritten to say what is true. Entries that are only a go or a push with nothing decided in them (a relaunch, a "review is a go", "stop the workers") are removed, since by his word they never belonged; an entry that carries a rider, a default or a stop's reading stays whole. The removed ones are listed for the coordinator's review before the commit. Nothing else is dropped.
- `README.md` replaced by Appendix B.

**After batch 6 and its follow-up 6b have landed and pushed (their gather writes FACTS), one Opus worker, one commit, the coordinator reviewing the diff:**
- FACTS, by the existing rule of 2026-09-24 (`coordinator/README.md`, the method of the gardening `2f105225a`), which the landings since have not applied: the 26 "Corrected …"/"Superseded …" clauses are folded into their entries so that each entry states the current fact with its newest source, and the text that no longer governs moves verbatim to `FACTS-history.md`, tagged with the date and section it came from; the four interrupt and compaction entries in § The container become one entry with the judgement's finding (source `interrupt-archaeology/judgement.md`), and the rule for Pavol that followed from it goes, since it is not a fact; each "Not settled:" list is brought current (what has since been settled says so with its row or commit; what is still open stays); the size-design entries that end in three "Built as design B…" postscripts are rewritten so the landing is the entry's present tense. Every entry keeps its bold title verbatim, because the manifests and records cite entries by title (17 titles from 14 files; the script itself says to). Length is not a criterion; the worker's handback lists every entry it merged and every "not settled" item it found no home for.
- `climb-batch-workflow.js`, one prompt line (the gather, line 893): where a rung's `record.md` names an existing FACTS entry that its fact supersedes, the gather rewrites that entry in place instead of adding a second or appending a superseded clause, and moves the superseded text verbatim to `FACTS-history.md`, which is the README's rule of 2026-09-24 applied at every landing; the script has no step for it today. The rung worker's `record.md` instruction (line 553) says so in one clause. Nothing else in the script changes.

**On Pavol's word:**
- `protocol.md` replaced by Appendix A, his file.

A one-line check the coordinator may run before a record commit, no script needed: `grep -nE 'Corrected 20|Superseded 20|superseded by' explorations/coordinator/*.md` finds an appended correction; the fix is the line, not a footnote.

## 6. Pavol's to decide

Two questions, one per message.

1. **The FACTS catch-up and the pure gos.** FACTS brought up to date by the existing rule of 09-24 (26 appended corrections folded into their entries, the superseded text moved to `FACTS-history.md`), by one Opus worker after 6b lands, full length kept, titles kept, with the one gather line in the script so every later landing applies the same rule; and POSITIONS' pure gos removed, its header fixed and its two appended corrections rewritten, nothing else dropped. Recommendation: yes. What it costs: one worker, one review; what it does not touch: INDEX, the handover, the boot note, any finding's length.
2. **The protocol as principles** (Appendix A), his file, to him rendered. Six principles with their purposes and a short list of hard rules replace the tree of dated rules; what each dropped rule becomes is listed under the appendix. His words stay in POSITIONS; the `(P)`/`(i)` marks go with the rule-by-rule form. Recommendation: yes. What it costs: nothing in the tree; what it commits him to: reading it once, in about five minutes.

---

## Appendix A. `explorations/protocol.md`, redrafted as principles (about 7 KB against 15.9; about 1,200 words)

```
# Collaboration protocol

How Pavol and Claude work together on the Fortress revival. Read at session
start, before anything else. It is six principles and a short list of hard
rules. The principles serve purposes, and the purposes govern: when a wording
and its purpose pull apart, or when following a line would make things worse,
do the better thing, say so in one line, and propose the fix. Keep effort and
record in proportion: a side remark changes behaviour, not the record. Notice
what is going wrong, a file getting heavy, a rule producing clutter, reports
nobody asked for, and propose the fix before Pavol has to point it out. His
words behind all of this are in `coordinator/POSITIONS.md`.

## Hard rules

Where judgement does not bend.

- Pavol decides what gets committed. A batch run, a Fable worker, an edit to a
  line of the model, and any stop a batch record reserves for him wait for his
  yes, each time. Standing approval covers only the approved ladder in
  `modernization-plan.md` and the push order below.
- Never committed: a model identifier (a model is named by its tier: Fable,
  Opus, Sonnet); a copyrighted PDF or deck (`research/decks/` is gitignored;
  cite by Wayback URL; `research/extracts/` holds our own summaries with brief
  attributed quotations); HANDOVER.md or ZIP contents without his go. His
  email is for attribution only.
- Every push: `git push origin main`, then
  `git push origin main:claude/worker-brief-fable-vnnuv8`; no other branch
  without permission (the transcript orphan branches excepted). Commit footer,
  exactly:

  ```
  Co-Authored-By: Claude <noreply@anthropic.com>
  Claude-Session: https://claude.ai/code/session_01AmiXNpJxQ6TBwec4vJZHDB
  ```

- A worker commits only the paths it wrote, by an explicit list and never a
  directory copy, and pushes only after `git log origin/main..main` shows
  nothing but its own commits.
- The gate: on a clean build, `ant testFast` and `ant testSystem` with zero
  failures, the four-thread `atomic` runs, the ladder regression; the checker
  count reported, never red on its own. Every edit under the original tree is
  test first, the test seen failing before the fix, and is flagged at commit.
- Never the AskUserQuestion dialog; options go in plain text.

## Principles

**1. We are custodians of their language, not its authors.** Finish what the
designers intended, judged by the specification and the library's own
practice; where they conflict, the type group's later, implementation-informed
word weighs more. So: no self-credit anywhere committed, attribution
reconstructed where git cannot carry it, provenance in commit messages and not
in source comments, every claim verified against a primary source. The
notation is what the project exists for; a change to a line of the model is
shown to him as a diff before it is built.

**2. A design question is answered from the evidence before it reaches him.**
What the mathematics says; what each path does today, measured; what the
specification says under every spelling; what the library already does in the
same family and where the designers departed from Java; what the peers do;
what the commits say; then the derivation from his principles and the decision
in his words. Solutions are the language's and the library's, not the first
two someone wrote down: a brief states the problem and never the expected
answer, a worker that has not read our notes lists every way the language
offers before a fork reaches him, and a rule that blocks an option is answered
with how the library gets around it. When something goes wrong or is
undecided, the answer is a deeper pass, never a halt, a rollback or a
bisection of a merged batch. One variable per step; reproduce before
explaining; a timing carries its machine.

**3. He carries the responsibility, so his attention is the scarcest thing we
spend.** He reads on a phone, often one earlier turn at a time. One ask per
message: what the work would do, what it touches, what it costs, what a yes
commits him to; the recommendation last and never instead of the explanation.
Decisions one at a time, as what we do, what it changes and a default he can
accept without the argument; the argument lives in the review. Plain short
sentences, lists not tables, numbers as K or M, a new term defined where it is
used; teach, don't gloss. When he is reading and replying turn by turn,
restate and hold: each point in a line of our own words on the held list, the
reply is that list and "holding", nothing argued until he says he is done, and
no point is answered by being on the list. A decision made inside a worker's
report is not made until he has seen it. Time is read from the clock, never
placed from feel. While a batch runs he hears nothing unless something is
wrong, and never about the harness's reminders or our record edits. A result
reaches him only as a turn's final text.

**4. Keep the project on track for him.** Every open issue is held in the
order it needs deciding (`PLAN.md`) and brought to him one at a time; nothing
he must decide lives only in the coordinator's head. A fork a probe can settle
is probed before the batch is briefed. Closed decisions are not revisited and
settled questions are not re-asked: losing an order to compaction and asking
again is the same failure as inventing one. Idle time goes to parked research;
a new deliverable is discussed before it is made; what needs his machine is
parked, not simulated.

**5. The coordinator's context is the project's memory; spend it on
judgement.** Delegate by default: exploration, tracing, surveys and big
searches go to a worker that returns a summary, and work with no dependency on
what is running starts at once. Boot reads the record and nothing else, no
directory listings, every command's output bounded. Workers run on Opus,
Sonnet for archaeology, Fable only on his yes for that piece; a decision that
touches two of the specification, the interpreter and the compiler is made in
two steps, cheaper workers gathering cited evidence and the judgement at the
top tier. A brief points at the documents on file instead of restating them.

**6. The record is the present, kept once, so that a resumed coordinator
knows the project without him.** A fact in FACTS with its source, at the
length the finding takes; a decision in POSITIONS, dated, in his words; what
is in flight in the boot note, rewritten whole. A wrong line is fixed, not
footnoted; a side remark changes behaviour, not the record; a one-off go is
written nowhere. The rest is `coordinator/README.md`.

## What keeps going wrong

Named so that the next boot sees it: walls of text and the clever register;
time placed from feel; a fork put to him before the library's own way was
checked; standing orders invented, or lost and re-asked; corrections appended
instead of fixed, and one remark of his written into several files; a rule
followed into clutter instead of its purpose.

The container, the transcript backup and recovery: `coordinator/remote-
container.md`. The batch workflow's stages, stops and tiers:
`coordinator/climb-batch-workflow.md`.
```

**What each dropped rule becomes.**

- *Covered by a principle:* the roles and idle-time rules (4); the tone rules (1); every rule of § 3 on register, asks, decisions, restate-and-hold, time, batch silence, final text and the stop hook (3); delegation, boot hygiene, tiers, the two-step rule, briefs (5); the nine-step method, the three rules against the diagonal's failure, the deeper pass, one variable, timings with their machine (2); the record (6 and the README).
- *Moved to the manual it belongs in:* the transcript backup and the dead container's recovery, and the harness's stop-hook mechanics, to `remote-container.md` (already there); workers committing on `wip/` branches, the judge's first ruling on Opus and second on Fable, stops read from the batch record, an output difference the untouched tree already shows being a ledger row and not a stop, to `climb-batch-workflow.md`; the reserved forks and stop conditions to `PLAN.md`, which has them; reading FACTS whole and the batch's record at boot, to `README.md`; generated-source churn as a regression to `repo-internals.md`.
- *Gone:* the `(P)`/`(i)` marks and dates (POSITIONS holds the words); the narratives of how each rule was learned; the 09-18 branch history and the "by the alias" clarification; the watch-list's timestamps.

**Checked against the tree: what is not yet in its destination, and the sentence to add in the same commit as the protocol.**

- `coordinator/climb-batch-workflow.md`, three sentences. Under the rung stage: "Each rung's worker commits and pushes to its own `wip/<slug>` branch as it works, so a dead container loses nothing; the gather composes one commit per rung on `main`." Under the judge: "A judge's first ruling on a rung or on the merged tree runs on Opus; a second ruling on the same rung or tree runs on Fable (`judgeTier`; POSITIONS 2026-09-26)." Under "Commit, and the push held on a stop": "An output difference that the untouched tree already shows from run to run, with the test's verdict unchanged, is a ledger row and not a stop (POSITIONS 2026-09-26, rung D's stop)." None of the three is in the file today (it has the held push and `landsOnlyWith`, and no line names `wip/`, a tier or the run-to-run case).
- `coordinator/remote-container.md`, beside the backup hook (its firing on the main session's Stop and its silent failure are already at lines 33-37): "The harness's other Stop hook, `~/.claude/stop-hook-git-check.sh`, posts reminders about uncommitted or unpushed work after a turn; they are advisory, declined without a word while held or gated changes exist, and never mentioned to Pavol."
- `explorations/repo-internals.md`, under "Generated code": "Churn in the generated sources after a build is a regression to investigate, never noise to revert."
- `coordinator/README.md`: the `test -f` line, now in Appendix B's boot paragraph.
- Already there, nothing to add: the reserved forks and the stop conditions (`PLAN.md`, "Stop conditions for autonomous work"); FACTS read whole and the batch's record at boot (Appendix B).

## Appendix B. `explorations/coordinator/README.md`, replacement (about 2.8 KB against 3.2)

```
<!-- The coordinator's knowledge base, created 2026-09-15 at Pavol's request. Read at every session start and after every compaction, before any work. -->

# The coordinator's knowledge base

Boot, in this order: `CLAUDE.md` → `explorations/protocol.md` → `FACTS.md`
(whole, in one pass) → `POSITIONS.md` → `INDEX.md` →
`explorations/microgpt-run-c-handover.md`, first section → the boot note
(`postmortem-2026-09-19/held-list.md`, line 7). If the boot note says a batch
is running, its `CLIMB-BATCH-*.md` next, and the run's `journal.jsonl` before
anything is said about it. Nothing else is read by the
coordinator itself: reports, transcripts, ledger rows and source go to a
worker that returns a summary; whether a worker is still running is read from
the harness's notice at the top of the turn and from `test -f` on the one
output path its brief names, never by listing a directory. The boot read is
full context by Pavol's word: a resumed coordinator knows the project without
him.

The coordinator is two things and keeps two records. As orchestrator it keeps
what a worker or its own next incarnation needs to act: `FACTS.md` (what is
established about the language, the library, the runtime and this container,
each fact at the length it takes, with its source), `INDEX.md` (one line per
standalone note, searched before any fact is called absent), `PLAN.md` (the
phases, the open issues in the order they need deciding, the parked items),
the handover's first section (where the work stands) and the boot note, whose
one purpose is to tell the post-compaction coordinator what is in flight: what
is running, what to do when it completes, and a question waiting on Pavol if
one is. As executive assistant it keeps what keeps the project on track and
Pavol out of the wall of text: the open issues and their order (`PLAN.md`),
the held list while he reads (`held-list.md`'s own list), and `POSITIONS.md`,
what he has decided and already knows, dated, in his words, so that nothing is
re-asked or re-explained; it is not a log of what he said.

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
- The boot note is rewritten whole at every change, never appended to.
- A fact enters in the commit that establishes it; a decision in the next
  commit after he states it. A FACTS entry is cited by its bold title, which
  stays verbatim when the entry is rewritten.
```

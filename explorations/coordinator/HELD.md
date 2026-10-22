<!-- The held list: the points the curator raised while reading, turn by turn or on a page, each a line in the coordinator's words with the UTC time of his message, the transcript holding his exact words; and the smaller items he still owns. Worked through one at a time when he says he is done; being on this list answers nothing. Its own home since 2026-10-12, at his word, moved from postmortem-2026-09-19/held-list.md with its sections as they stood. Read at boot after BOOT.md. -->

# Held list

## Held in chat (2026-10-22)

- 05:35 The writer is always Opus: Fable writes in a register he dislikes, and Opus writes better (for the skill writer: the tier rule in `delegating.md`).
- 05:28 A POSITIONS entry must read on its own: a reader who knows the language, or can look it up in the skills, but never saw the conversation, must be able to tell what he decided, where it applies, what it requires and what is unfinished; handles of a past conversation ("answer 9", "item 48") go to the history. Astra's review states the standard (`origin/astra/record-keeping-review`, `explorations/reviews/revival-record-synthesis.md`, "P45: fidelity and comprehensibility are separate checks" and "For Fable: rewrite positions before consolidating Revival") (for the skill writer: `record.md`, what an entry is, and the pass's checks).

## Held from his page comments (2026-10-21)

- 23:29 P-88's `ReadableArray2` sentence stays: he reads it as his own wish for a read-only array trait; his comment is its source. The trial's writer was too aggressive; a sentence with no source of his keeps its text and becomes a question (rule 5 of the writer's brief).
- 23:21 The audit changes as little as it can: an entry that is his and correct stays word for word; only what is factually wrong, not his, or stale is changed (rule 0 of the writer's brief). P-66's "and the sign of `GCD`" is factually wrong (the team's own interpreter bug, fixed by the revival; Java has no integer GCD) and goes; the rest of P-66 stays.
- 23:05 He reverses the strike of P-10: read whole, its sub-language and its APL program in the walk check are a valuable position, and his actionable test was not specific enough. Sharpened: an entry that says what is not pursued or what must keep working is actionable, a closed line of work included; only an observation or the state of one day is not. His comment is the source of the walk-check clause.
- 20:10 An entry of POSITIONS must be actionable: it changes what someone does or decides. A subjective observation (P-18, to be struck after the trial traces it) or a statement of the project's state on one day (P-10) is not a position. The record needs a filter that collects such entries (for the skill writer: `record.md`, what POSITIONS holds).
- 20:16 Where the audit finds a message of his behind an entry that its history does not name, the source goes back into the entry's history, so that the entry can be checked again; written only after he has seen the findings.
- 20:18 P-66, the integer principle, is a correct and precise expression of his position, read whole; his comment is its source if no other is found.
- 20:20 Workers write their own report files and revise them as they go; the coordinator does not stand between them and the file as a scribe (for the skill writer: `delegating.md`, what a brief holds).

## Held in chat (2026-10-21)

- 22:28 A measured number (P-150's 1.8 %) is not his position and does not belong in POSITIONS: a number from one measurement is a fact, held in FACTS (F-234) or its report, and an entry keeps the decision and its reason in plain words, with a pointer. And his later word on an entry's subject updates the entry even where it went into a skill (P-148's timing, loosened to a smoke test on 10-17 at 10:28 and 10:29 UTC, never reached P-148) (for the audit's rules 11 and 12, and the skill writer: `record.md`, what a POSITIONS entry holds).
- 22:24 What a worker can fetch by script, a script fetches: the leads, the message he answered, the pointers, the homes of a status. A launch message names the entry's number and the brief; it never copies record text by hand (for the skill writer: `delegating.md`, what a brief holds). The full audit runs overnight as a Workflow, one brief for every scout and a list of numbers, at more than two agents at once if the machine allows (his opt-in to a Workflow for that run).
- 18:02 Sonnet is enough for archaeology scouting, as the P-86 scout showed; do not spend Opus on such scouts (for the skill writer: the tier rule in `delegating.md`).
- 18:14 Sonnet reads and analyzes (a scout's archaeology, a transcript's search patterns); Opus writes code and scripts, as the better coder. A worker that studies how a task was done returns search instructions as a brief for the Opus worker that writes the scripts, not the scripts themselves (for the skill writer: the tier rule in `delegating.md`).

## Held in chat (2026-10-20)

- 06:45 The batch agents keep the task tools; a step of the landing sweeps the done tasks from the shared list, decided on the evidence of `process-engineering/task-list-archaeology.md` (for the skill writer: the sweep as step 1 of `batch.md`, "The landing", by `tools/sweep-tasks.py`).

## Held in chat (2026-10-16)

- 19:57 On the closing line offering the queued questions "for whenever you want them": a teaser. While he is away, the coordinator keeps its messages to the minimum, gathers evidence and does its work, and sends no running commentary or line he cannot act on (for the skill writer).

- 20:14 On the one difference that stays between walk and the checker (the checker does not check overloads of symbolic operators such as `×`, so for `opr ×` pairs walk applies the rules and the checker does not): can't the two be brought in line? Sorted at 12:42 UTC on 2026-10-17 (`perf-probes/symbolic-operators/SORT.md`): walk's meet check skips them too; 54 of the 205 errors clear by library fixes, 151 need a design choice; waits on PLAN items 38 and 59.

## Held in chat (2026-10-13)

- 09:21 (2026-10-14) He asks to understand, not change, what the preparation and follow-up of a batch cost beside the batch itself (probes, planner, reviews, landing work), and to have it tallied for each batch; first figures by `spend.py` for climb batch 14: the run 4.82M, its preparation about 2.7M (planner with the fold 1.24M, Opus review with its check 1.10M, Fable review 0.38M), its landing work about 1.45M (review 0.61M, routing 0.30M, page 0.24M, record pass 0.20M, the skill writer about 0.1M); batch 15's two probes about 2M; the coordinating session's own tokens not counted. Measured on his follow-up of 10:39 UTC by a Sonnet worker (transcripts of batches 6 to 15): a plan's Fable review alone writes a median of 486K tokens and makes 11.5 changes (n=10); an Opus review 473K to 495K and 10 to 12 changes (n=2), its cached reads about ten times Fable's; the one finished Fable review after Opus (batch 14) 385K and 6 changes, batch 15's still running at 698K; a Fable token weighs three to four times an Opus token against the limits.



## Held from his comments on the principles (2026-10-13)

His nine comments on the first section of https://claude.ai/artifact/17GstfC5tE8dttd8wWRRS6 (version 5), 15:25 to 16:03 UTC, each a thread on the page with his exact words; one line each in the coordinator's words. He stopped at principle 9 to resurface and set a strategy (16:01).

- 16:01 (principle 8) Losing the thread: he thought we were defining how to consolidate the record, and the page mixes in what the coordinator skill does; stops commenting to resurface; the comments go on the held list with a strategy for them.

## Held in chat (2026-10-12)

- 21:00 The name for the coordinator-only files: "the desk" is a stupid name; he has no better one; a brainstorm is wanted before one is chosen.

## Held from his page comments (2026-10-12)

His 19 comments on the sort page https://claude.ai/artifact/WoDrCFWNNso5YeLr9kuwvR, 15:30 to 16:00 UTC, each a thread on the page with his exact words; one line each in the coordinator's words:

- 15:36 Label which part answers which: unclear; wants its context (the scout: 15 September, at his two requests).
- 15:57 A step a yes covers: wants how it arose and its wider context (the scout: the prompting-guides review of 27 September).

## Held while he reads (2026-09-27)

Each point is a line in the coordinator's words with the UTC time of his message in the session transcript (`fe616d40`, backed up on `transcripts-blinded`), which holds his exact words: an index, not a copy. Worked through one at a time when he says he is done reading; being on this list answers nothing.

Also waiting for his answer (PLAN-history.md, "Asked 2026-09-27", moved there by PLAN's consolidation as answered on the review queue's notes): the three worker questions, skeptic checks 11-13 and the gather's filing of items for him, for 6b; the principle 5 review line; a Fable judge overnight.

Reacting to the coordinator's account of batch 6.5b's cost and files (2026-09-29, 18:25 UTC):

- He wants to understand the tests added, e.g. why `PowChooseLcmRungE` has 50 checks; in the same message he withdrew a full review ("Maybe I don't need a full review"), so what is owed is the answer to the 50 checks.

On the output comparison (18:52 UTC):

- Dig up the early discussion comparing Fortress's test suite with the Swift compiler's (lit, expected output written in the test).

Reacting to the blind designs on the design page, before its last section (10:43 UTC):

- Ideally run all the designs on branches for real numbers and to see how the workflows behave.
- Perhaps the best strategy: per batch, a Sonnet content-only brief, then a blind designer custom-designs that batch's workflow.
- Is that the same as today's preparation (Opus planner, Fable review, then the batch)? It adds a cost on top, with the post-batch review run anyway.

After the page's last section (10:59 UTC):

- The decisions the designs raise are not the ones he wanted to weigh: all four designs improve our process under a cost constraint.
- What he is weighing: drop the fixed workflow and always let a Fable or Opus coordinator design an ultracode workflow per batch.

Reading the rewritten `fortress-repo` on the review page (2026-10-09), held for the skill's next revision, no writer task now:

- (04:21 UTC) `references/library.md`, "Designing a change": "Put each extension into this library, outside the compiler's files. This includes an extension that only the model program needs." reads strangely, and he is unsure where it comes from (its source: POSITIONS, "The library's own practice is the standard.", his "all the extensions that [microGPT] invented need to go directly to the standard library in the spirit of the standard library"); at 04:24 UTC he asked for transcript archaeology to give his words their context, done (`process-engineering/library-extension-rule-archaeology.md`, `2ddcb2496`). At 05:20 UTC he said its quotations still contradict his position: he would at most extend the library where it misses an obvious extension, an operation an array or matrix of lower rank has and a higher one lacks (scalar addition on `Matrix`, the shape of `02d09a39f`), and asked for an Opus or Fable re-reading of the conversation around those timestamps; the Opus re-reading (`3cf540c9e`, §7 of the note) found his words support extending the library where its own text has a form for one number type, rank or sibling trait and lacks it for another, the model's need the occasion, not the reason; a model-only form with no precedent stays in the model's components; its revised bullet is in the note's §5.
- (04:29 UTC) `references/library.md`, "Designing a change": "follow the team's proposal, which no program can import (`Library/incomplete/Collection.fss`)" reads strangely; he understands the folder is imported nowhere, and the sentence wants a better ASD-STE100 pass, perhaps "follow the team's unfinished collection design".
- (04:58 UTC) `references/tests-writing.md`, "Where a test goes, and how it passes": "An `XXX` test with such a `.test` file is green if the program loads and runs clean." read to him as a warning that the inversion does not apply; answered on thread `e9eed01e` (it does: green while walk does not refuse). The sentence should say what such a test records, a refusal walk misses, and that it turns red when the fix makes walk refuse. At 05:22 UTC he asked what a clearer text would be; a proposed replacement for the whole bullet is on the thread (the refusal-at-load concept first, then the plain and the `XXX` case, with the rename of both files and the component on promotion).

## Smaller items he still owns

- Done 2026-10-02 by Pavol: the remote `wip/` branches but batch 8's four, and `notes/postmortem-2026-09-19`, deleted.
- 2026-09-21: the two noise commits on `main` (the revert `8fcca6703` of the library-route recording and its undoing `3e85b709c`, both from a misread of an autocorrected message) are left for the cleaner pass on his word ("Eh. OK"); the harness refuses the rewrite here.
- The history rewrite that drops the four verbatim transcript files from main's history: the harness's classifier refused it here; the command is in the conversation of 2026-09-20 (`git filter-branch … -- dc0bc2bd6..main`, then force-push with lease), or it waits for his planned cleaner pass that moves the whole process record to its own branch.
- Ledger row 321 (`asString` rendering), the gate's thread count, rows 346 and 348 from batch 2, the class-name half of row 320 (now live work under one library).
- The Fable spend of this morning's two mistaken workers, which he counts as 1.7 M tokens down the drain; the tier rule is in the `coordinator` skill's delegating part.

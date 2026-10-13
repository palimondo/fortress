<!-- The held list: the points the curator raised while reading, turn by turn or on a page, each a line in the coordinator's words with the UTC time of his message, the transcript holding his exact words; and the smaller items he still owns. Worked through one at a time when he says he is done; being on this list answers nothing. Its own home since 2026-10-12, at his word, moved from postmortem-2026-09-19/held-list.md with its sections as they stood. Read at boot after BOOT.md. -->

# Held list

## Held from his comments on the record store design (2026-10-13)

His eight comments on https://claude.ai/artifact/TjJEBW5xsPP79vaEb8FVMu, 16:46 to 17:08 UTC, each a thread there with his exact words; handed whole to the Fable review of the design.

- 16:46 Does `trace` replace `facts-extract.sh`; does the workers' skill change; how is the format kept compatible; keep each entry one line so a plain grep finds it without the tool.
- 16:54 The ledger's way, taken: the same system everywhere.
- 16:58 Pointers LGTM; are the entries still grouped by topic; no tagging system.
- 17:01 Rebuild the history now from scratch too, in the new register, from primary sources gathered by Sonnet scouts, written by `record.py` with its provenance; nothing relies on the old history; why keep it in its old messy form.
- 17:02 The history block reads like YAML.
- 17:04 Old titles served only to link entries when text was the link; numbers end that need; tonight is a full garbage collection, later only incremental passes after a batch.
- 17:08 Do the kinds merge, move and retitle happen at all; is the history for tracing a code change back to its records through commit messages; torn.

## Held in chat after the path (2026-10-13)

- 16:16 Are the long entries enough to rewrite from, or should Sonnet scouts gather everything related so an Opus writer rewrites each entry from that wider context; how many entries are there; run it as a batch workflow, as earlier rewrites ran (is this reinventing one); a writer with a shared context per section, writing in the halfway ASD-STE100 register; an entry should carry the known consequence that makes it actionable, without growing; there is still no statement of what goes into FACTS or POSITIONS and what is noise, or how a model decides it, whether it is laid down or left to each worker; he is tired and losing the thread.

## Held from his comments on the principles (2026-10-13)

His nine comments on the first section of https://claude.ai/artifact/17GstfC5tE8dttd8wWRRS6 (version 5), 15:25 to 16:03 UTC, each a thread on the page with his exact words; one line each in the coordinator's words. He stopped at principle 9 to resurface and set a strategy (16:01).

- 15:25 (principle 1) Draft the coordinator skill's outline first, so each entry moved out of FACTS or POSITIONS gets a section and nothing is lost in the move.
- 15:32 (principle 2) The history grew as a verbatim copy checked by a script; with numbers, it could be provenance metadata (when, from where, links into the report); one tool call by the coordinator could write the entry and its history part, so nothing is written twice; the record is a flat-file database; build the tooling during the consolidation so the chunk workers and later the coordinator use it; channel the model's instinct to keep a dated project memory into this place; asks whether this needs design help, perhaps a Fable review.
- 15:34 (principle 3) Agrees, but "changes what a worker or the coordinator does next" is not actionable as stated: wants a decision rubric grounded in a few examples, not a list of rules, that taps the model's instincts. 15:38: 600 or 1,000, an entry needs a reason to be large; did not understand the example (is a fact split from its consequence, the consequence sent to the history? that would be wrong).
- 15:46 (principle 4) Good, but not actionable; "kept the 14 and lost what the 14 are" was unreadable until the restored text named the errors: over-compression into numbers; FACTS wants the ASD-STE100-halfway register; error counts that change at every landing may be a different kind of fact, one current value, not one per experiment.
- 15:51 (principle 5) One home is right; copies go stale, pointers cost a lookup and the decision to look; a tool that surfaces a fact with its linked positions in one go, by the links in the metadata, a second-level cache behind the compressed record in context; fears over-engineering.
- 15:56 (principle 7, form) Storing his dictated words verbatim is counterproductive, as the dictation correction on the page shows; the quote paragraph does not belong to reading stages.
- 15:57 (principle 7, content) Good, but a coordinator-skill rule: why in the record part; does it bear on how the record is structured for lookup, or on recording provenance so a Sonnet scout knows where to dig.
- 16:01 (principle 8) Losing the thread: he thought we were defining how to consolidate the record, and the page mixes in what the coordinator skill does; stops commenting to resurface; the comments go on the held list with a strategy for them.
- 16:03 (principle 9) The second sentence ("quote that form in every brief") is unclear; keeping the provenance of ideas (his against the coordinator's) is a real failure mode, but how is it relevant to the consolidation.

## Held in chat and on the Record Rule Draft page (2026-10-13)

Points on how we work, kept here until the coordinator skill holds them (his words, 09:16: they go to the skill, not to POSITIONS). The record-keeping points are in `process-engineering/record-rule-draft.md` Part 5.

- 09:05 What he says about how we work did not reach the record, and several compactions lost it: a lossy compression. Wanted: a principle and a check that the coordinator caught his meaning; his dictation is not the source of truth but is refined into nuggets; a cold read or a test, as for the skills.
- 09:16 FACTS and POSITIONS hold the project only and stay, as briefs point into them; how he and the coordinator work goes to the coordinator skill; meanwhile the held list and the boot note are its scratch; draft the skill's parts and point to them.
- 09:22 The rewrite plan's first steps follow the fortress-repo method (`7ff472848`); 09:23 reuse the record consolidation and a quiz to check the record-keeping principles.
- 09:54 Pages keep the house style (the plan page's CSS); a worker building a page is pointed to it.
- 10:14 The success criterion for a compression: decisions stay as good, and a reader follows the pointers to the report or the history when needed; test it automatically, without him; if something critical is lost, find the middle ground entry by entry.
- 10:20 Tests stay small and on the records at hand; no elaborate evaluation design (an earlier one wasted tokens).
- 10:30 Links matter most in the history, which no one reads whole; how the coordinator lists the positions on a fact or traces an entry's history. Answered by numbered entries, taken at 11:05.
- 14:36 Keeping what was learned before a compaction is the default, not a question; asking it was a do-nothing choice.

## Held in chat (2026-10-12)

- 00:4x (2026-10-13, chat) The main problem with the revival story's last version was expansion he did not ask for, which made it too long to read. An update adds what landed, in the space the document already gives it; a brief for an update caps its length against the version before.
- 00:22 (2026-10-13, page comment on the revival story, part 1) The update should only have brought the story up to date with what landed; it reframed the document in the email's framing, because the coordinator's brief named Prof. Ryu as a second reader and asked for an early part on how the revival treats the team's work. Proposed on the thread: halfway back to version 15's framing (opening and order as before, updates and fact-check corrections kept, "Why now" and his quotes cut, the curation facts as a short later section next to what the revival changed); held until he is done commenting, then one Opus pass.
- 00:06 (2026-10-13, page comment on the revival story) "Decides what gets committed" is not correct: he does not read the code or review each commit. The protocol's first hard rule says it ("Pavol decides what gets committed"); the coordinator rewrite restates his role as the record shows it: he sets the goals and decides the design and process questions put to him.
- 21:00 The name for the coordinator-only files: "the desk" is a stupid name; he has no better one; a brainstorm is wanted before one is chosen.
- 21:00 The handover's first section into PLAN: not convinced; would PLAN then hold two levels of information. Settled by the coordinator as the one state section (BOOT.md), his to overturn.
- 21:00 The lint: not convinced; built from the handles being deleted, how would it catch new names; what do the existing scripts do. Answered in chat (a floor for the known shapes; the reader judges).

## Held from his page comments (2026-10-12)

His 19 comments on the sort page https://claude.ai/artifact/WoDrCFWNNso5YeLr9kuwvR, 15:30 to 16:00 UTC, each a thread on the page with his exact words; one line each in the coordinator's words:

- 15:30 One ask per message is contextual, not a general rule; he wants its full context recovered.
- 15:32 Lists not tables: keep; both models gave him tables, which the iOS client renders as one scrolling line.
- 15:32 The dialog tool: the reason is a timeout of about 60 seconds on iOS, not the interface; the rule is conditional on the client.
- 15:33 Numbers as K or M: he did not recognise the handle; the rule is his own words, 5K and 1.2M instead of spelled-out numbers.
- 15:35 A new term defined: did it come with ASD-STE100; how would the model know what is new to him.
- 15:36 Label which part answers which: unclear; wants its context (the scout: 15 September, at his two requests).
- 15:37 The clock rule: keep; it guards against relative times after a compaction; Opus wrote it and has stayed grounded since; it needs the formulation that worked.
- 15:38 Batch silence: keep; the overnight runs left him a session of progress notes; silence until he asks.
- 15:40 Not told about record edits: wants to know when it arose; "noted" may be fine.
- 15:42 The git-check hook: the empty-body technique is on record; a reset ritual at each restart, told to him, is what he wants.
- 15:44 Restate and hold: keep; the handle is too compressed; it is the guard against the wall-of-text spiral, which is the default.
- 15:46 The Select button: does one sentence carry it; a compressed summary could not.
- 15:48 The wip-branch line: drop unless another instruction needs it; he deletes branches locally when he gets to it.
- 15:53 Model what he knows: keep and expand into a separate file, a profile of what he knows and where his gaps are, built by archaeology; a major task, not for the skill.
- 15:56 He decides what is committed, a bare go: he does not recognise the handle; wants its origin.
- 15:57 A standing approval covers only what it names: reads as a tautology.
- 15:57 A step a yes covers: wants how it arose and its wider context (the scout: the prompting-guides review of 27 September).
- 15:58 The closed-decision search: keep; the trigger to search was needed.
- 16:00 A worker's decision in a report: the fortress-repo skill tells workers which decisions they may take and which to raise; he stopped the review here; the handles are over-compressed; go back to the positions as they work now.

## Held while he reads (2026-09-27)

Each point is a line in the coordinator's words with the UTC time of his message in the session transcript (`fe616d40`, backed up on `transcripts-blinded`), which holds his exact words: an index, not a copy. Worked through one at a time when he says he is done reading; being on this list answers nothing.

Reacting to the coordinator's reply on the gap ledger (07:47 UTC): its purpose, its stale derived views (the worklist and counts, rows 1-310 only), and a proposal to regroup open rows by the plan phase that closes them. His message, 07:57:42 UTC:

- Who writes into the ledger, when, and under which standing instruction.
- Was the ledger sorted by kind before; does it need re-sorting.
- Row numbers stay stable: rows are cited by number.
- Grouping by plan phase may be the wrong principle; the rows are many kinds of technical problem (the ledger's own 16 sections are by area).
- His mental model of the ledger may differ from what it is.
- Unsure about PLAN.md, the big plan file, as the place.
- No go yet on re-deriving the views: he wants to understand the proposal first; he does want the ledger put to good use.

Also waiting for his answer (PLAN.md, "Asked 2026-09-27"): the three worker questions, skeptic checks 11-13 and the gather's filing of items for him, for 6b; the principle 5 review line; a Fable judge overnight.


Reacting to the coordinator's account of batch 6.5b's cost and files (2026-09-29, 18:25 UTC):

- Archaeology: when and why committing captured run outputs, build logs, citation dumps and probe programs with a batch became practice; he does not recall accepting it.
- His rule to weigh: a batch commits the Fortress change and the real findings (report, ledger, plan) only; evidence made for a skeptic or judge stays as scratch for review; the tool calls are already in the transcripts.
- A cleaning pass to remove the committed scratch from the repository.
- Test file names carrying batch and rung suffixes (`RungE`, `RungV`) in a Fortress corpus: unreasonable, or useful for finding them later.
- He wants to understand the tests added, e.g. why `PowChooseLcmRungE` has 50 checks; in the same message he withdrew a full review ("Maybe I don't need a full review"), so what is owed is the answer to the 50 checks.
- Redesign what a batch asks of its workers: trace the practice's origin, discuss, correct the rules, define the new practice; no batch runs before that (7b held).

Continuing (18:42 UTC), a major failure in his words:

- One report characterizing the batch practice: what the tokens are spent on, what artifacts are produced and committed, and whether they add value to the project.
- On it, a review proposing a better practice by an Opus worker, and independently by Fable.
- Archaeology: how we got here, batch by batch from the first, since the process may have drifted.
- The original team's test-suite practice against ours: are we following their principles, or a pretrained cargo cult of writing tests.
- Connect the practice to the top-level output: the landing report, the issues put on file (ledger, facts, plan), the rung reports; what he pays the tokens for.
- Meanwhile a bounded, git-only characterization of each batch as a parallel workflow, one worker per batch, as input for the reviews; no busywork.

On the output comparison (18:52 UTC):

- The Fortress suite is pass or fail; a value that matters belongs in the test as an assertion, so why compare outputs across runs at all; if the comparison is needed, the suite's design needs changing, not a ritual beside it.
- Was the before-and-after output comparison the team's practice or the revival's invention.
- Dig up the early discussion comparing Fortress's test suite with the Swift compiler's (lit, expected output written in the test).

Reacting to the blind designs on the design page, before its last section (10:43 UTC):

- Answered at once: the designers made every estimate themselves, asked for them in item 4 of their brief and given `blind-brief/machine.md`'s prices, so they designed with cost in mind, unlike ultracode's "cost is no constraint".
- Ideally run all the designs on branches for real numbers and to see how the workflows behave.
- The two non-blind designs improve our pipeline: merge the best of Fable's and Opus's into one and run that as a third.
- Is batch 10 representative of the workload (specification, checker, interpreter, library, the hard cases)? Our pipeline was shaped to cover every case met so far; the blind designs optimised this one run.
- Perhaps the best strategy: per batch, a Sonnet content-only brief, then a blind designer custom-designs that batch's workflow.
- Is that the same as today's preparation (Opus planner, Fable review, then the batch)? It adds a cost on top, with the post-batch review run anyway.
- A real experiment compares what each run found, not only its cost: where do our workers get the instruction to grow the gap ledger, are all briefed so, would the blind workflows' workers do the same?
- His model of the briefing: earlier every worker got all of FACTS and POSITIONS to think globally; now preparation picks the relevant entries and a tool run at the worker's start loads them. Is that right; did the blind designers know of it, use it, prepare anything from FACTS and POSITIONS?

After the page's last section (10:59 UTC):

- The decisions the designs raise are not the ones he wanted to weigh: all four designs improve our process under a cost constraint.
- He wants the true ultracode version: Opus and Fable each design an ultracode workflow for batch 10's brief with cost no constraint, design only; then a separate worker estimates each design's cost.
- What he is weighing: drop the fixed workflow and always let a Fable or Opus coordinator design an ultracode workflow per batch.
- His concern: such designers must not reinvent how to move safely and efficiently in this repo (caches, builds, recovery after the container's restarts, how long what takes, when the full suite is needed and when not, running one test, invalidating part of the cache); no dedicated skill holds that knowledge, it sits between FACTS, POSITIONS and the coordinator's files. Does ultracode handle recovery on its own?

Reading the rewritten `fortress-repo` on the review page (2026-10-09), held for the skill's next revision, no writer task now:

- (04:01 UTC) `SKILL.md`, "How a program runs": "If you fix either path, say in your report whether the other has the same defect." may send a worker briefed to fix one path fishing in the other; he reads it as meant for exploring, when a new defect is found. Batch 11's post-batch review measures what it cost.
- (04:21 UTC) `references/library.md`, "Designing a change": "Put each extension into this library, outside the compiler's files. This includes an extension that only the model program needs." reads strangely, and he is unsure where it comes from (its source: POSITIONS, "The library's own practice is the standard.", his "all the extensions that [microGPT] invented need to go directly to the standard library in the spirit of the standard library"); at 04:24 UTC he asked for transcript archaeology to give his words their context, done (`process-engineering/library-extension-rule-archaeology.md`, `2ddcb2496`). At 05:20 UTC he said its quotations still contradict his position: he would at most extend the library where it misses an obvious extension, an operation an array or matrix of lower rank has and a higher one lacks (scalar addition on `Matrix`, the shape of `02d09a39f`), and asked for an Opus or Fable re-reading of the conversation around those timestamps; the Opus re-reading (`3cf540c9e`, §7 of the note) found his words support extending the library where its own text has a form for one number type, rank or sibling trait and lacks it for another, the model's need the occasion, not the reason; a model-only form with no precedent stays in the model's components; its revised bullet is in the note's §5.
- (04:29 UTC) `references/library.md`, "Designing a change": "follow the team's proposal, which no program can import (`Library/incomplete/Collection.fss`)" reads strangely; he understands the folder is imported nowhere, and the sentence wants a better ASD-STE100 pass, perhaps "follow the team's unfinished collection design".
- (04:40 UTC) `references/library.md`, "Editing": the paragraph on a comment after a declaration joining its source span puzzled him; explained on the page thread `b25fac21` (a parser quirk, row 359, that meets only a worker comparing parse trees or messages across a comment edit). At 04:43 and 04:44 UTC he placed it: a ledger fact about the parser (row 359 holds it); the paragraph stays while the defect lives (the next revision may move it to the parser's part, `toolchain.md`) and goes out only with the rung that fixes row 359, which deletes it.
- (04:45 UTC) `references/library.md`: LGTM, with the three points above held for its next revision.
- (04:58 UTC) `references/tests-writing.md`, "Where a test goes, and how it passes": "An `XXX` test with such a `.test` file is green if the program loads and runs clean." read to him as a warning that the inversion does not apply; answered on thread `e9eed01e` (it does: green while walk does not refuse). The sentence should say what such a test records, a refusal walk misses, and that it turns red when the fix makes walk refuse. At 05:22 UTC he asked what a clearer text would be; a proposed replacement for the whole bullet is on the thread (the refusal-at-load concept first, then the plain and the `XXX` case, with the rename of both files and the component on promotion).

## Smaller items he still owns

- Done 2026-10-02 by Pavol: the remote `wip/` branches but batch 8's four, and `notes/postmortem-2026-09-19`, deleted.
- 2026-09-21: the two noise commits on `main` (the revert `8fcca6703` of the library-route recording and its undoing `3e85b709c`, both from a misread of an autocorrected message) are left for the cleaner pass on his word ("Eh. OK"); the harness refuses the rewrite here.
- The history rewrite that drops the four verbatim transcript files from main's history: the harness's classifier refused it here; the command is in the conversation of 2026-09-20 (`git filter-branch … -- dc0bc2bd6..main`, then force-push with lease), or it waits for his planned cleaner pass that moves the whole process record to its own branch.
- Ledger row 321 (`asString` rendering), the gate's thread count, rows 346 and 348 from batch 2, the class-name half of row 320 (now live work under one library).
- The Fable spend of this morning's two mistaken workers, which he counts as 1.7 M tokens down the drain; the tier rule is in protocol §5 and POSITIONS.

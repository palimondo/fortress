<!-- The held list: the points the curator raised while reading, turn by turn or on a page, each a line in the coordinator's words with the UTC time of his message, the transcript holding his exact words; and the smaller items he still owns. Worked through one at a time when he says he is done; being on this list answers nothing. Its own home since 2026-10-12, at his word, moved from postmortem-2026-09-19/held-list.md with its sections as they stood. Read at boot after BOOT.md. -->

# Held list

## Held in chat (2026-10-12)

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

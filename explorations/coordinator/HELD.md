<!-- The held list: the points the curator raised while reading, turn by turn or on a page, each a line in the coordinator's words with the UTC time of his message, the transcript holding his exact words; and the smaller items he still owns. Worked through one at a time when he says he is done; being on this list answers nothing. Its own home since 2026-10-12, at his word, moved from postmortem-2026-09-19/held-list.md with its sections as they stood. Read at boot after BOOT.md. -->

# Held list

## Held in chat (2026-10-13)

- 19:16 (2026-10-14) P-148's rule for the workers, for the skill writer and the batch script before batch 16: a rung that changes the checker measures the change's effect on the checker's time, first makes the change correct, then does a second pass that makes the checker faster without changing its results (the same programs accepted and refused, with the same errors at the same places), and its skeptic checks the time and the results; the skill's text in plain words, as P-148 is; inside the rung, not after the landing. Homes: `fortress-repo` (the rule that binds workers), the script's rung and skeptic prompts and the manual (`climb-batch-workflow.js`, `.md`).
- 09:21 (2026-10-14) He asks to understand, not change, what the preparation and follow-up of a batch cost beside the batch itself (probes, planner, reviews, landing work), and to have it tallied for each batch; first figures by `spend.py` for climb batch 14: the run 4.82M, its preparation about 2.7M (planner with the fold 1.24M, Opus review with its check 1.10M, Fable review 0.38M), its landing work about 1.45M (review 0.61M, routing 0.30M, page 0.24M, record pass 0.20M, the skill writer about 0.1M); batch 15's two probes about 2M; the coordinating session's own tokens not counted. Measured on his follow-up of 10:39 UTC by a Sonnet worker (transcripts of batches 6 to 15): a plan's Fable review alone writes a median of 486K tokens and makes 11.5 changes (n=10); an Opus review 473K to 495K and 10 to 12 changes (n=2), its cached reads about ten times Fable's; the one finished Fable review after Opus (batch 14) 385K and 6 changes, batch 15's still running at 698K; a Fable token weighs three to four times an Opus token against the limits.

## Held from his comments on the principles (2026-10-13)

His nine comments on the first section of https://claude.ai/artifact/17GstfC5tE8dttd8wWRRS6 (version 5), 15:25 to 16:03 UTC, each a thread on the page with his exact words; one line each in the coordinator's words. He stopped at principle 9 to resurface and set a strategy (16:01).

- 16:01 (principle 8) Losing the thread: he thought we were defining how to consolidate the record, and the page mixes in what the coordinator skill does; stops commenting to resurface; the comments go on the held list with a strategy for them.

## Held in chat (2026-10-12)

- 00:22 (2026-10-13, page comment on the revival story, part 1) The update should only have brought the story up to date with what landed; it reframed the document in the email's framing, because the coordinator's brief named Prof. Ryu as a second reader and asked for an early part on how the revival treats the team's work. Proposed on the thread: halfway back to version 15's framing (opening and order as before, updates and fact-check corrections kept, "Why now" and his quotes cut, the curation facts as a short later section next to what the revival changed); held until he is done commenting, then one Opus pass.
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

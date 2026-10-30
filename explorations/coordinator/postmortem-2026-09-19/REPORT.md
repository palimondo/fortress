<!-- The final report of the post-mortem of 2026-09-19, written on 2026-10-29 by an Opus worker from the post-mortem's own files, the git history of this folder, the record files that cite it and the session transcript: what it found (the array work committed, the decision lists that mixed his decisions with the coordinator's, the docket of 25 decisions taken without his yes), what was done (the docket worked through by 2026-10-02, the one library, the transcript indexed and not copied, the tier rule, the hold), where each lesson lives now in the `coordinator` and `fortress-repo` skills, and what is still open with its home (the linker half of ledger row 320, the array questions and the element width, the cleaner pass of `main`, the out-of-date README). -->

# The post-mortem of 2026-09-19: final report

## Terms and sources

- **The curator** is Pavol, the person who directs the revival and decides its goals. **The coordinator** is the long-running Claude Code session that talks to him, briefs workers and keeps the record. **Workers** are the agents that the coordinator launches. **Fable**, **Opus** and **Sonnet** are model tiers; Fable is the highest, and the one his weekly limit is shortest of.
- **The record** is the project's memory in `explorations/`: `POSITIONS.md` (his decisions, each entry with a permanent number such as P-37), `FACTS.md`, the gap ledger (`explorations/fortress-gap-ledger.md`, one numbered row for each known gap), `PLAN.md`, the review queue (`review-queue.md`, the items that wait for his word), the boot note (`BOOT.md`, what runs now) and the held list (`HELD.md`, the points he raised while reading).
- **A compaction** replaces the coordinator's context with a summary. **A climb batch** is a Workflow run that makes several changes, called rungs, and lands them together after **the gate**, the full check of the tree. **The switch-over** is the planned step that moves the compiled path onto the interpreter's library.
- **The transcript** is the coordinator's session transcript, `fe616d40-a9c6-56d7-9da1-7168a172765d.jsonl`. Its part up to 2026-10-08 is on the branch `transcripts-blinded`. A time below with no file is a time in it, in UTC.
- A sentence marked **"the writer's judgement"** is this report's own. Everything else is cited.

## 1. What the post-mortem was

- It covers the coordinator's work from the compaction of 2026-09-19 06:38 UTC to the compaction of 2026-09-20 05:32 UTC: four compactions, 22 launches of workers and Workflow runs, and climb batches 1 and 2.
- The curator opened it at 06:21:02 on 2026-09-20: "Now I want to focus on post mortem of the last session. Please launch a worker to analyze the transcripts from yesterday."
- His complaint, at 06:34:29: "yesterday I was uh, feeling like my executive function was depleted, and the way model was commenting, communicating with me was deepening the confusion." In the same message he named three questions: the lists of decisions, the batch script's changes against the change of tactics, and whether the array work "is something that is done committed or if it was just a prototyping branch".
- He set its goal at 08:01:00: "the goal of this postmortem really is just to find out what were the open decisions that were really something I needed to take, but in the end, the model has, without authorization, taken the initiative and made some decisions on its own without m my approval. So I want to be fully aware of, of those decisions and re-approve them post hoc or revert them if I deem it necessary."
- The folder grew from 2026-09-20 to 2026-09-26. From 2026-09-20 to 2026-10-12 it also held the boot note and the held list, in `held-list.md`.

Sources:
1. `README.md` (the window and its compactions); `agents.md` (the launches).
2. Transcript, 2026-09-20 06:21:02, 06:34:29, 08:01:00.
3. `git log -- explorations/coordinator/postmortem-2026-09-19/`: the first commit `dc0bc2bd6` (2026-09-20 07:28), the last outside `held-list.md` `754ac1f67` (2026-09-26 09:16); `held-list.md`, its header.

## 2. What it found

- **The array work was done and committed, not a prototype.** The library change `02d09a39f`, and `8590d7a9e`, the change to the two microGPT programs' own declarations (their vocabulary files), were on `main` and passed the suites. The array design, `array-design.md`, was written down, and nothing of it was built. No prototyping branch existed.
- **The lists of decisions mixed his decisions with the coordinator's.** Seventeen lists carried 90 items: 45 were the coordinator's own (process and housekeeping), 28 his, 12 mixed and 5 neither. Twelve of the 17 lists held both kinds. Of the coordinator's 45 items he answered four one by one, and the rest with one word, "go" ("I am not reading this, but go", 14:54:15 on 2026-09-19), or not at all.
- **The script work came before the change of tactics, and nothing tested it.** The script changes were decided at 14:54:15 and built from 16:26 to 17:06. The tactics turned from 17:35 to 18:33, after the script had landed. No batch had run on the new script when the window ended. The file sets out the order and the costs, and does not judge whether the script work was needed.
- **The project had used fifteen shapes of review.** The file lists each, with what it was given, what it returned and what he did with the result.
- **Twenty-five decisions were his and were taken without his yes.** This is the post-mortem's one deliverable, the docket `decisions-for-reapproval.md`. Six rows touch the library or microGPT's own declarations. Nine are meanings of the language that a rung chose where the specification is silent or contradicted. Three are gaps that the specification settles and that landed unrepaired. Four change what the gate measures or what lands on `main`. Three are his decisions that the coordinator closed on evidence or let stand as a worker's default. The common shape, in the docket's words: "a decision was reachable only by reading a rung's `record.md` or a review written afterwards, and the paragraph that reported it to him named the repair, not the choice."
- **The compiled path's library was chosen without a price for the chosen route.** Two workers reconstructed the history, one from the documents and one from the transcripts. Both find that the plan grew the compiler's own library, while the alternative, one library for both paths, was measured and came out in its favour. The transcript reconstruction answers: "Yes. The one thing that was measured about either route was measured about the route not taken, and it measured in that route's favour."
- **His positions on the checker as a stage of the gate were on no file.** A worker recovered them from the transcript on 2026-09-21. Its reading: he did not object to the count of the checker's errors, but held that a count is a metric, not a measure of the work left.
- **The rule on model names had become a cleanup that nobody asked for.** The coordinator offered to strip model names out of committed files, and withdrew the offer when he objected at 17:57:14 on 2026-09-19. Its reading of the rule was never written down.
- **The "wall of text spiral" had come back at least four times since 2026-08-21.** The coordinator answered each of his remarks at length while he read turn by turn, and five requests to "hold" in 57 minutes on 2026-09-20 did not stop it. A companion file recovered the "restate and hold" process that worked, from his description of 06:13:46 on 2026-09-23.
- **A result that he never saw counted as unanswered.** At the compaction of 2026-09-23, one probe's result had been written between tool calls, where his client folds text out of view.

Sources:
1. `array-thread.md`, section 3; `array-work-brief.md`.
2. `decision-lists.md`, "What the counts are".
3. `script-vs-tactics.md`, "The order, stated plainly".
4. `review-patterns.md`.
5. `decisions-for-reapproval.md`, its table and the two paragraphs after it.
6. `direction-history-documents.md`, "Summary, on one screen"; `direction-history-transcripts.md`, section 2.
7. `positions-checker-gate.md`, "Reading of his position".
8. `model-names.md`, sections 2, 3 and 6.
9. `wall-of-text-spiral.md`; `restate-and-hold.md`.
10. `open-at-compaction-2026-09-23.md`, "Correction, 2026-09-23".

## 3. What was done, and where it landed

- **The docket was worked through with him from 2026-09-21 to 2026-09-26.** The record calls each row of its table a re-approval row, numbered 24 to 48. Its last section, "Decisions taken by Pavol", records each answer. The five rows of the library change `02d09a39f` were approved ("Others approved"), the closure of the integer types last, after the exclusion trace. The rows on `round` at an exact half, `floor` and `ceiling` on floats, `Maybe`'s empty case, the shifts, `GCD` and `LCM`, the false overflow errors of `0 DIV -1`, `|0|` and `-0`, and `narrow` out of range (ledger rows 329 to 331, 333 to 335 and 346) were decided or approved as recommended. The row on the guard in the compiled `REM` was "approve as landed" (2026-09-24). The row on the array design's three questions was closed "as no decision taken" (2026-09-25). The row on comparing the gate's shards by their sum was agreed with the recommendation (2026-09-26).
- **The rest of the docket was settled on 2026-10-02.** The review queue records that the table's rows 42 to 46 were settled then (among them a second gated test added at the gather, the revived `TryAtomicFailure`, the ledger's claims changed at the gather, and two gaps landed unrepaired), with the four ledger rows that a finishing worker had filed on its own (rows 374 to 377), and that row 48, a batch's own gate summary as the next comparison, is stale, since every gate now compares with the newest landed summary.
- **One answer of the docket was changed later.** The docket records that `floor` and `ceiling` on floats return the unbounded integer (2026-09-21). His later answer of 15:18:44 on 2026-09-29 reversed it: "So floor returns float." P-68 holds the decision now: on the float types, `floor` and `ceiling` keep the float type, and the brackets ⌊x⌋ and ⌈x⌉, `round` and `truncate` return `ZZ`.
- **One library.** The reconstructions of the library's history led to P-37, "One library, the interpreter's, is the library that the compiler checks." His words behind it: "we need to unify this. into single library" (14:33:50 on 2026-09-20), the compiler's library held to be a bootstrap to remove (14:39:06), and "Don't revert!??" (02:40:19 on 2026-09-21).
- **An index, not a copy.** At his word ("So I am against that level of duplication", 07:47:22 on 2026-09-20; "I want them to be taken out", 07:49:57), the four files that copied the transcript word for word left the tree in `cad3dc16c`. `parse.py` regenerates them for any time range.
- **The tier rule.** He set it at 06:44:36 on 2026-09-20, after two workers had run on Fable by mistake: "So you are fable, the workers are always opus unless I request fable for high level analysis." At 06:51:30 he counted those two workers as "1.7M down the drain". The rule entered the protocol in `238a61fc8`.
- **The hold.** The recovery from the spiral was first written in the boot note in `held-list.md` (`050ae4f4c`, 22:57 on 2026-09-20), then in the protocol (`c754a305b`, 2026-09-23). The held list lived in this folder until 2026-10-12, when it moved to `HELD.md`, and the boot note to `BOOT.md`, at his word (`cc3e59618`).
- **The form of an ask.** On 2026-09-27 an archaeology worker mined the decision lists, the review shapes, the docket and the restate-and-hold file for the form in which to put an open question to him (`answer-form-archaeology.md`).

Sources:
1. `decisions-for-reapproval.md`, "Decisions taken by Pavol, 2026-09-21".
2. `review-queue.md:1793`.
3. `POSITIONS.md`, P-68; `POSITIONS-history.md`, P-68, the block of 2026-10-22 08:48Z.
4. `POSITIONS.md`, P-37; `POSITIONS-history.md`, P-37, the block of 2026-10-22 08:48Z, which names his messages by their times.
5. Transcript, 2026-09-20 06:44:36, 06:51:30, 07:47:22, 07:49:57; commits `cad3dc16c`, `238a61fc8`, `050ae4f4c`, `c754a305b`, `cc3e59618`.

## 4. What it taught, and where each lesson lives now

The protocol of that time, `explorations/protocol.md`, was retired on 2026-10-13 (`fe4dcc1e4`), and its rules moved into the `coordinator` skill. Each lesson below lives in a skill or a tool now.

- **A decision that is his reaches him before it counts.** A consequential decision that a worker wrote in one line of its report is not made until he sees it. It reaches him by one of three ways: asked before the work, landed and then reviewed, or held at once. Home: `.claude/skills/coordinator/SKILL.md`, "The curator's role and decisions", lines 84 to 108.
- **Earlier decisions put to him again** are the re-approval rows, parked in PLAN and put to him one theme per message. Home: `coordinator/references/road.md`, lines 8 to 16.
- **One decision a message, in plain words, as a list.** Home: `SKILL.md`, lines 134 to 138 (plain short sentences, no internal shorthand, lists and not tables), and "An ask", line 147.
- **Hold the points while he reads turn by turn.** Each point goes on the held list as one line, the reply is that line and "holding", and being on the list answers nothing. Home: `SKILL.md`, "While the curator reads turn by turn", lines 171 to 176; its source: `coordinator/references/sources.md:30`.
- **A result goes in the turn's final text.** Home: `SKILL.md:143`; its source, `coordinator/references/sources.md:77`, names `open-at-compaction-2026-09-23.md`.
- **A boot lists no directory and bounds every command's output.** `boots.md` measures, call by call, the boot after the compaction of 17:06 on 2026-09-19, which the curator blamed at 06:21:02 on 2026-09-20: it "accidentally listed worker's cache directory which filled its context with a ton of garbage that I'm blaming for derailing the rest of the session". Home: `SKILL.md:226`.
- **A post-mortem indexes the transcript and never copies it.** Home: `coordinator/references/analysis.md:20`. The tool: `parse.py` in this folder.
- **Workers run on Opus unless he asks for Fable.** Home: `coordinator/references/delegating.md`, "Which tier runs what".
- **A model is named by its tier in committed text, never by its identifier.** Home: `.claude/skills/fortress-repo/references/committing.md`, "What to commit".
- **Evidence enters the tree by a list of files, never by a copied directory.** It came from a copy of 85 MB of caches on 2026-09-19 at 16:49. Home: `fortress-repo/references/committing.md:26`; its source: `fortress-repo/references/sources.md:468`.

## 5. What is still open, and where each item lives

- **Re-approval row 41: an exported name that fails to link when a component's name differs from its api's name.** This is the open half of ledger row 320 ("an api implemented by a component of another name does not link"), which a rung gated as an expected failure without his approval. It waits for the switch-over's design. Home: review-queue item 36, "The dead sizes, the linker row and walk's unknown size"; `PLAN.md`, "Off the path, parked", line 185.
- **The array design's three questions, and the element width.** He closed the docket's row as no decision taken, and the questions come back with the array design after the switch-over: P-85, "The array design's three questions are open, with no default, and return after the switch-over with the array decisions A, B and D." Adding the element width, `RR32` against `RR64`, was recommended on 2026-09-25 and never answered, and his own question why microGPT uses `RR64` is owed an answer. Home: review-queue item 37, "The array decisions after the switch-over"; `PLAN.md`, item 13, fork 4.
- **The cleaner pass of `main`.** His plan of 07:49:57 on 2026-09-20: "at a certain point I will do a cleaner pass on on the main branch which will only include our changes changes to the library and this whole exploration will will live in in a separate branch". Home: `PLAN.md`, "Off the path, parked", "Housekeeping"; P-128, "Where the work lives.", in `POSITIONS-history.md`, which parked the cleaner pass in PLAN on 2026-10-13.
- **The history rewrite that drops the four copied transcript files from `main`'s history.** The harness refused it on 2026-09-20, and it waits for the cleaner pass. So do the two noise commits of 2026-09-21, `8fcca6703` and its undoing `3e85b709c`, left at his word ("Eh. OK"). Home: `HELD.md`, "Smaller items he still owns".
- **The items of climb batch 2 on the same held list.** `HELD.md`, "Smaller items he still owns", still lists ledger row 321, the gate's thread count, rows 346 and 348, and the class-name half of row 320. The writer's judgement: part of this line is stale, since P-91 decides row 321's rendering and the docket records row 346 as approved; the class-name half of row 320 is re-approval row 41, above.
- **This folder's README is out of date.** It still says "Nothing here is committed; the directory is under `tmp/`", and its table names `user-messages.md` and `assistant-text.md`, which `cad3dc16c` removed. The writer's judgement: a one-line fix for the coordinator; this report does not change the README.
- **Whether the script work of 2026-09-19 was needed.** `script-vs-tactics.md` leaves the question to him, and the writer found no later file that answers it. Nothing builds on it.

Sources:
1. `review-queue.md`, items 36 and 37; `PLAN.md:185`, `:88` and `:152`.
2. Transcript, 2026-09-20 07:49:57; `POSITIONS-history.md`, P-128, the block of 2026-10-13 19:58Z.
3. `HELD.md`, "Smaller items he still owns"; `POSITIONS.md`, P-91; `decisions-for-reapproval.md`, "Decisions taken by Pavol, 2026-09-21".
4. This folder's `README.md`, its opening lines and its file table.

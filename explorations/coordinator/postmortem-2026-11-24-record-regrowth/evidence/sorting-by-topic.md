<!-- Evidence from git and the coordinating session's transcripts on when FACTS, POSITIONS and the gap ledger were regrouped by topic, how the 2026-10-13 chunks were cut, and how many chunks ran side by side on 2026-10-13 and 2026-10-22; written 2026-11-24 for the curator. -->

# Sorting the record by topic, and the parallel runs

Times are UTC, 2026. Commit hashes are short. "A" is the transcript folder `/home/user/fortress-transcripts-blinded/projects/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d.until-2026-10-08T15-41.jsonl.parts/`. "B" is the same path ending `.until-2026-11-07T23-09.jsonl.parts/`. A cite `A/002:17508` is part 002 of folder A, line 17508. I judge nothing here.

## 1. The answer in short

- No Fable worker was ever given the job of reordering FACTS or POSITIONS by topic, and the entries inside a section were never sorted: they stayed in the order of addition. The Fable "reorder by topic" ask of 09-30 was put to the curator and withdrawn on 10-02 (section 5).
- Three real regroupings by topic or area exist:
  1. FACTS, 09-24 06:47, `2f105225a8`: sections regrouped "by area instead of by event", by an Opus worker (section 3).
  2. POSITIONS, 09-30 05:37, `bc8902f474`: 135 dated entries rewritten and grouped under six `###` themes, by a Fable worker (section 4).
  3. The gap ledger, 10-08 14:06, `ae4f8e38af`: 638 rows sorted into fifteen topic sections in 40 groups, one rewriter per group, in one Workflow run (section 6). This is the closest match to the curator's memory ("one worker works in one area", "shortly before the October pilot"). It is the ledger, not FACTS or POSITIONS.
- On 10-13 nothing was regrouped before the chunks. The chunks were cut from the sections that already stood: FACTS's nine (from 09-24) and POSITIONS's six themes (from 09-30). Two moves happened during the chunks: F-203 into another FACTS section and P-102, P-103, P-123 to P-125 into a new POSITIONS section (section 8).
- Parallel on 10-13: no Workflow. The coordinator launched background Agent calls one by one. At most 4 scouts at once (18:13:03), at most 3 writers at once (18:46 to 18:57), at most 5 scouts and writers together (section 9).
- Parallel on 10-22: POSITIONS ran as 4 Workflow runs of 2 chunks, plus a FACTS calibration run, 5 runs and 9 agents at once (08:34). FACTS ran as 4 runs of 4 chunks, 8 agents at once (10:11). The curator had asked for "four or more" on 10-21 (section 10).

## 2. The curator's words

All times are his message times. Quoted from the transcript, word for word.

- 09-24 06:31:59 (A/001:672), before the FACTS regroup: "While we are gathering, uh, I don't know which of the files, I, I think facts is the one where we have created like a, a historical version and resolved stuff is being moved uh, there. Is, is there any gardening that should be done around that so that you drop the historical background to, to a file that holds it and you get just a cleaner current state?" At 06:35:19 (A/001:684) he answered the coordinator's plan with: "Yes". He wrote nothing on the result. At 06:38:46 (A/001:700) he asked for "Any other gardening opportunities in files that are read on boot up?", and at 07:03:57 (A/001:894) he wrote "I am a bit lost in the gardening".
- 09-30 ~05:25 (quoted whole in the brief, A/002:16581), before the POSITIONS regroup: "That's pretty ridiculous. Send the fable worker who was doing this analysis on to dig deeper. Like the consolidation removed almost nothing. So I guess we are now we have no other choice than to let it review the facts itself in in full and then do its own consolidation. And same with positions [...] Like if you want to keep that provenance record, that goes all into the history files. But the moment you move something from facts, the facts should be written as a description of a status quo. [...] think about it as a compiled compiling an executable. We have a debug mode and an optimized build. So history is the debug mode with full provenance, but the facts and positions should reflect the current state and be written in a sense in, in a timeless manner." This message asks for timeless rewriting. It does not ask for a regroup by topic.
- 09-30 12:01:35 (A/002:17508), the ask for a topic order: "I assume the facts and positions are ordered chronologically in, in a file. If you were to let a fable worker reorder them in order for them to be grouped by topics, can we then see some consolidation opportunities when, when these are next to each other? [...] Like in the can this reordering be done without affecting our, our script that can cite those records for the workers in a batch? I think reordering should be safe operation, right? And then If we decide that a consolidation is possible, then we would again like back them up the originals to the history and create like one superseding record for them." The coordinator answered at 12:03:43 (A/002:17558): "FACTS isn't in date order. It's already grouped by topic, in nine sections, and only within a section are entries in the order they were added. POSITIONS has been grouped by theme since this morning." The git headings agree (section 3 and 4). He did not reply to the offer. At 12:37:56 a summary of his words still reads "Asked whether a Fable worker could reorder FACTS/POSITIONS by topic" (A/002:19187).
- 10-08 09:49:29 (A/003:13282), on the ledger: "maybe it's not keyed by a line number, but that each line starts with a number of the ledger row, and we can freely reorder them. I think this is what we did. Like a consolidation of the record before we unsealed, like after we did the wild exploration of the repo with various toy programs. Then we consolidated them into groups and then they started to accumulate at the back. [...] If it needs, like if sections are used to access a multiple ledger rows, then yes, of course, let's reorganize them again." This is very close to his memory in the question. It is about the ledger.
- 10-10 08:05:10 (B/000:12033): "maybe we need a better path that consolidates the facts and positions by topics. And can can find some duplication between them and unify them." The coordinator at 08:06:01 (B/000:12062): "52 FACTS entries cite POSITIONS, and 36 POSITIONS entries end in 'Built (FACTS, …)'. [...] A consolidation by topic could unify them." No regroup followed. The 10-13 consolidation kept each file's own sections.
- 10-13 16:58 (quoted in the coordinator's note, B/001:3018): "LGTM. Is this still organized? Into sections like group by topics or something ... I worry a little bit that if I don't stop myself now, we could end up with tagging system, which is not, not what I want to go. So maybe it's just a really flat file. ... I think we had it grouped." So on 10-13 he believed the files were already grouped, and they were.
- 10-21 22:24:32 (B/002:6328), on parallelism: "It would be great if you could bump up the parallelism on the workflow to four or more, since the machine will be mostly idle, I think, if we just run two threads." The "at least 4 in parallel" in his memory matches this message and the runs that followed (section 10).
- 10-22 08:28:48 (B/002:8846): "ideally, I would compact you after we have all the tooling ready and the new session is just executing the workflows in parallel to take good use of the machine, like we did with the mining."
- 10-13 22:58:46 (B/001:5852), after the consolidation: "Read the Overnight Run, 13 October. Skimmed the consolidated record and skill. All LGTM."

## 3. FACTS regrouped by area, 09-24 (`2f105225a8`)

Shown. Before: FACTS had 11 to 14 `##` sections named after events or dates, for example "What the conformance review of the eight rungs established (2026-09...)", "The compile-path ladder baseline (2026-09-17, ...)" (`git show 4e4b802535`, `a8f1c50814`). After: nine sections with plain names: Execution model; The checker and the one library; The harness and the gate; Landed semantics; The library's arrays and algebra; The specification and the repository's lineage; The territory map; The container; The ledger (headings at `2f105225a8`, unchanged until 10-13).

Who: an Opus worker, "Garden FACTS.md into history", launched 09-24 06:36:08 (A/001:687) on the coordinator's plan, after his "Yes" at 06:35:19. The coordinator committed it at 06:47:10. Its one regrouping item is item 5 of the brief, word for word:

> 5. Regroup the sections of FACTS.md by area instead of by event, keeping every entry's text as decided above and ordering entries within a section as they were: "Execution model"; "The checker and the one library" (the interpreter's-library-fed-to-the-compiler section, the size design, the exclusion fork, the tower closure, comprises with "...", the memo, the count stage); "The harness and the gate" (test mechanics, the shards, the thread pin, global.map, the XXX shapes, the native-wrapper constraints, the three heaps); "Landed semantics" (the literal wrap, the mutable cell, round, rendering, the integer rules, the reserved names, the four comments, the scalar block); "The library's arrays and algebra"; "The specification and the repository's lineage"; "The territory map"; "The container"; "The ledger". Each section heading is a plain name with no date. The file's first HTML comment line stays; the H1 stays.

The brief's rule for what leaves: "No fact is ever deleted: everything that leaves FACTS.md appears verbatim in FACTS-history.md" and "Do not reword the entries that stay; do not merge entries." The plan the coordinator put to him, with the line "Sections regrouped by area, not by event", is at A/001:675 (06:33:04).

How the topics were chosen: the coordinator named the nine sections and what goes in each in the brief (it had read FACTS whole that morning, A/001:675). The worker was not asked to pick.

Moved, split or merged: only moved, whole. No entry was split or merged. Nineteen entries were condensed, their full text moved verbatim to `FACTS-history.md` (message of `2f105225a8`). The worker placed 11 entries that item 5 did not assign, by its own judgement, and listed them in its report (A/001:764, part 4), for example "Into 'Execution model': the spec's `Nothing` declaration failing on both paths; the exported-function name mismatch; the comment-span absorption; a native raising a Fortress exception under walk." Order inside a section stayed the order of addition.

Identity: the bold title, unchanged. Two cross-references to old headings broke, and the worker listed them (A/001:764, part 4): "(see the prelude section)" at `FACTS.md:20` and "(see the microGPT runs section)" at `FACTS.md:107`. The commit message says "The two cross-references to old headings repointed, and the sources the old headings carried written onto the entries that relied on them."

Check that nothing was lost (A/001:764, part 5): "A script compared the old and new files. The old FACTS-history.md is unchanged as the first part of the new one. The 26 non-empty lines removed from FACTS.md are 19 entries and 7 headings. Each entry appears exactly once, verbatim, in the history additions. Each heading's text appears verbatim in the headings list." The twelve old headings were kept verbatim at the end of the history file.

## 4. POSITIONS grouped by theme, 09-30 (`bc8902f474`)

Shown. Before (`4bdcb9d204`, 09-29 21:59): `## The goal`, `## History he knows`, `## Decisions on record` (134 dated bullets), `## How he wants to be spoken to`, no `###` headings. After: the Decisions on record under six `###` themes, 92 titled entries. Counts at `bc8902f474`: The standard and the sources 8; The one library and the compiled checker 17; Numbers 15; Arrays and the model program 8; The specification's revision 4; How we work 30. The entries before the 09-30 rewrite were in date order: the 09-29 consolidation's four commits were named by date range ("1 of 4: 2026-08-23 to 2026-09-23", `65cc2cce75`, to "4 of 4: 2026-09-27 to 2026-09-29", `4bdcb9d204`).

Who: the Fable worker with agent id `ac140f68118358f88`, the one that had written the consolidation review (`36e362a31`, A/002:16474). The coordinator sent it the task by SendMessage at 05:24:50 (A/002:16581). It worked in its own worktree on the branch `wip/record-rewrite`, because batch 7b was running. It committed `bc8902f47` (POSITIONS), `77f194180` (FACTS) and `7626dd56c` (the rules). It reported at 06:03:08 (A/002:16670). The coordinator merged the branch as `d11dfaf43b` (08:36).

Brief (A/002:16581), the parts on this point. The whole brief is the curator's quote above plus six numbered items. Item 1, on POSITIONS, word for word:

> POSITIONS: state each position he holds as it stands, what we do and why, in plain words. Give each entry a short bold title as its handle. Keep a quote only where his exact words are the position itself, not its provenance. Decisions not yet built keep the detail the coming work needs. The sections "History he knows" and "How he wants to be spoken to" are standing knowledge: rewrite them the same way.

Item 2, the debug build: "Every entry's full current text moves word for word to `FACTS-history.md` / `POSITIONS-history.md`, under a new dated section for this rewrite, in each file's format. Nothing in the history files is changed or deleted. `python3 explorations/coordinator/tools/check-verbatim.py <base> <file> <history>` must show no entry missing." Item 3, lookups: "`facts-extract.sh`'s `positions:DATE WORDS` finds an entry by its first date and head, and falls back to `POSITIONS-history.md` when POSITIONS has no match. [...] Propose, without building it, a title-based `positions:` lookup".

The brief did not ask for a grouping. The worker chose the six themes. The commit message says: "The Decisions on record are grouped by theme under ### headings (the standard and the sources; the one library and the checker; numbers; arrays and the model program; the specification's revision; how we work), which facts-extract reads as the ## section." How it chose them is not written anywhere I found.

Moved, split or merged: all three. The worker's report (A/002:16670): "135 dated entries → titled entries"; "descriptions told twice (rows 379/O/D merged into one overflow entry, rows 380-383 into the shift entry, the size decisions into 'Sizes')". The same report says FACTS kept "160 entries before and after, nine sections unchanged".

Identity: before, a POSITIONS entry was found by its first date and its head (`positions:DATE WORDS`, in the 09-29 brief, A/002:15346). After, by its new bold title, with each old entry kept verbatim in the history under its old section "each under a comment naming the new title(s) that hold its position" (report) and the title lookup falling back to the history. FACTS entries stayed cited by bold title throughout.

Check that nothing was lost: the commit message gives "check-verbatim.py a38c1e746 exits 0 (0 in the file, 135 in the [history])". The brief's check 2 held the batch key script `lists7b.py` to its base result.

The curator's words on the result: nothing found on this regroup. The next relevant message is the 12:01:35 ask of section 2, which assumed the files were chronological.

## 5. The Fable regroup ask of 09-30, withdrawn

- 09-30 12:03:43 (A/002:17558): the coordinator offered "a Fable worker regroup FACTS and POSITIONS by topic": "It would write a topic-ordered draft with every entry copied word for word, checked by the same script as the consolidations. Its main output is a list of candidate merges [...] FACTS itself doesn't change until you pick."
- 09-30 12:21:12 to 12:33:16 (A/002:17664 to 17831): it stayed an "open ask". The limit stopped the Fable pool.
- 10-02 10:17:08 (A/002:19673): "the Fable regrouping ask is withdrawn, to keep Fable's pool." The curator was told at 10:17:30 (A/002:19687): "I am withdrawing the Fable regrouping ask, to keep Fable's pool for the batch reviews." I found no reply from him on it.
- Nothing was launched. No brief for it exists.

## 6. The gap ledger sorted by topic, 10-08 (`ae4f8e38af`)

Shown. This is the step that matches "reorganized the entries to group them by topics" and "one worker works in one area".

- 10-08 09:44:06 (A/003:13278), the coordinator offered option 2, "Re-sort by topic. The workflow is making about 35 topical groups anyway, so they could become the new sections, with rows moved under them and numbers unchanged." The curator's reply of 09:49:29 is in section 2. At 09:49:48 (A/003:13285) the coordinator: "So D6 becomes your option: re-sort by topic."
- Launched 09:58:30 as one Workflow run, script `ledger-rewrite-v2.js` (in `workflows/scripts/` beside the transcripts), run `wf_a2c69d47-bd5`, resumed as `wf_c1d2172f-0b2` after a restart. It finished 14:07:24 (A/003:15409): "groups":40,"failed":[].
- Stages (script `meta`): Tool (build `ledger.py`), Group, Rewrite, Merge. The Group agent's prompt, word for word: "Make 10 to 18 topic sections, each a subject a worker would look up when working in one area of the language or the implementation; choose them from the rows. Inside each section, make groups of 10 to 25 rows that one rewriter can hold together: rows that cite the same files or describe the same mechanism side by side. Keep every sibling group and duplicate group of section 3 inside one group. Every row is in exactly one group." A script function `problems()` refused a grouping that left a row in no group or in two, and sent it back twice.
- Rewrite: "one rewriter per group" (`pipeline(GROUPS, ...)`), 40 groups, each writing only `${DIR}/groups/gNN.md`.
- Moved, merged: 638 rows, "each keeping its number, sorted into fifteen topic sections; 108 closed to one FIXED line, 24 made DUPLICATE pointers, 506 rewritten to the template, none unchanged" (message of `ae4f8e38af`). Row 83 left its own table for its section.
- Identity: the row number. "Rows are cited everywhere by number, never by position" (A/003:13278).
- Check that nothing was lost: `ledger.py check --base 052a7c3fe` verifies "that every row at that commit is the same line now or has its full earlier line in the history file, and that the set of row numbers is unchanged" (script text). The history file holds the full old line of every changed row and every other old line "verbatim in one fenced section". Result in the commit message: "638 rows, 0 fail the template".
- Parallel: one run. The journal of `wf_c1d2172f-0b2` shows 43 agents and at most 2 at once.
- Two rows in two topics: each group's rewriter marked siblings in the notes ("`siblings: N, M` first if there are any") and a confirmed duplicate became a DUPLICATE row pointing to its keeper.

## 7. The 10-13 sections and the numbering

- Entries had no permanent number before 10-13 17:58. FACTS entries were found by bold title (`facts-extract.sh`). POSITIONS entries were found by first date and head until 09-30 and by bold title after.
- `a88e52bf78` (10-13 18:00), message: "each entry's line at a74f5a2b7 is its number (195 and 113 entries)". So F-n and P-n are the line numbers at that commit. That is why the numbers run F-7 to F-219 with gaps. The histories were rebuilt "as a header naming a74f5a2b7 and one numbered block per entry, with its former titles". The tool `record-number.py --verify` checked "each entry is its line there with the number added and its pointers converted".
- FACTS at that commit had the nine sections of 09-24. POSITIONS had its six themes. Neither was reordered. This agrees with the coordinator's word at 09-30 12:03:43.

## 8. How the 10-13 chunks were cut

The rule came from the Opus review of the record-store design, commit `cc9424c2ae` (10-13 17:29), `process-engineering/record-store-review.md`, section 4, and the coordinator took it at 17:31:05 (B/001:3285, "Its plan for the overnight run is good, so I'm following it"). Word for word:

> The chunks are the sections, 20 to 32 entries each. FACTS: "The checker and the one library" in three (63 entries); "Landed semantics" (32); "Execution model" with "The harness and the gate" (41, in two if the writer's context asks); the arrays, the specification, the map and the ledger (32). "The container" waits for the `cloud-container` step [...]. POSITIONS: "The goal", "History he knows", "The standard and the sources" and "The specification's revision" (23); "The one library and the compiled checker" (26); "Numbers" and "Arrays and the model program" with the three staying entries of "How we work" (26). Nine chunks. The evicted entries are not rewritten; they leave whole to the history at the skill's step.

The rule: one chunk is one section, in file order; the one section over 40 entries was cut in thirds by line ranges; sections under 20 entries were joined; entries that were to leave for a skill were kept out of the chunk or left whole. The cut text is in the scripts at 18:00 (B/001:3418) and 18:24 (B/001:3878), copied in `evidence/october-briefs/04-scouts-chunk-script-*.md` and `06-writers-chunk-script-*.md`. The scouts' cut, with the line ranges as written:

| chunk | scope (lines of the file) | entries (scout) | chars before | chars after |
|---|---|---|---|---|
| F2b (pilot) | FACTS 51 to 72, checker section | 22 | 43,529 | 13,135 |
| P2 (pilot) | POSITIONS 36 to 63, "The one library and the compiled checker" | 26 | 26,634 | 13,673 |
| F2a | FACTS 31 to 50, first third of the checker section | 19 | 26,803 | 10,769 |
| F2c | FACTS 73 to 94, last third of the checker section | 22 | 39,738 | 13,158 |
| F3 | FACTS 116 to 148, "Landed semantics" | 32 | 43,868 | 18,423 |
| F4 | FACTS 150 to 186, arrays, specification and lineage, map | 31 | 40,799 | 16,401 |
| F1 | FACTS 6 to 29 "Execution model", 96 to 114 "The harness and the gate", and 203 | 42 | 33,556 | 18,084 |
| P1 | POSITIONS 6 to 12, 15 to 19, 24 to 34, 94 to 98 | 23 | 11,870 | 9,748 |
| P3 | POSITIONS 65 to 81, 83 to 92, 102, 103, 123 to 125 | 28 | 19,230 | 11,553 |

Sources of the counts: the scouts' hand-backs (B/001:3393, 3415, 3552, 3564, 3606, 3703, 3855, 3863, 3893) and the writers' (B/001:3581, 3634, 3920, 3942, 4017, 4038, 4133, 4159, 4198). The chunk budget for each writer was "600 characters times its staying entries" (writers' template, `05b-writers-template-after-edit.md`).

What each worker did, from the templates:
- Scout (Sonnet, template at B/001:3305, `03-scouts-template.md`): one file, at most 1,500 characters per entry: sources and whether they resolve, the commit that established the entry, the entries that cite it, the ledger rows' status, the earlier texts.
- Writer (Opus, template at B/001:3322, `05b-...`): "Write the apply file for `record.py`: each entry of your chunk that stays, rewritten as one line, with its provenance line under it [...]. Merge two entries where one home is the right answer; remove none, since the entries that leave move at a later step." and "Apply it in a worktree of your own, not in the main tree [...] `record.py check --base HEAD` there." Entries over the cap name the decision that needs the extra.
- Briefs, whole: the templates are in `evidence/october-briefs/` (`03`, `05b`) and are short.

Moves across sections during the chunks (an entry that belongs to two topics):
- F-203, the `env.sh` entry, stood in "The container". The F1 brief: "F-203 stays: move it into the section 'The harness and the gate' with a `move` line, since it describes the repository's own script." (B/001:3878). F1's scout scope also names it: "203 (the `env.sh` entry in 'The container')" (B/001:3418).
- P-102, P-103, P-123, P-124, P-125 were in "How we work". The P3 brief: "move them into a new section '### The suites and the gate' just before '### How we work' (if `record.py` cannot make a section by a move, leave them where they are and say so)." The result is `ab933086b8` ("the suites' decisions in a section of their own"): POSITIONS then has seven `###` themes, "The suites and the gate" with 5 entries, "How we work" 36 (headings at `ab933086b8`).
- A part of an entry that belongs to a skill: "Keep a leaving clause at the line's end, nearly word for word, marked '(moves to <its home>)'; it leaves at a later step." (writers' script, B/001:3878), for F-66, F-111, P-19, P-27, P-32, P-33, P-87, P-102, P-103.
- A pointer to an entry in another topic: by number. "A pointer is the target's number, with the first words of its title in quotes where the sentence needs them [...]. Replace every pointer by position ('the next entry', 'above', 'below') with the target's number" (writers' template).
- Entries that duplicate across FACTS and POSITIONS: not merged. The P2 brief: "their FACTS pairs (F-76, F-78, F-141, F-175), whose texts you do not change: point to them by number." (B/001:3483).

Check that nothing was lost on 10-13: `record.py check --base HEAD` (each chunk: "0 failures", for example B/001:3634 for F2b), `FACTS-history.md` and `POSITIONS-history.md` keeping the old line of each entry word for word, and the record test (30 of 30 on the finished record). Details are in `consolidation-of-october.md`, sections 1 and 6. There was no per-entry checker and no Fable review (same file, end of section 1).

## 9. How many ran side by side on 10-13

The coordinator launched each worker with the Agent tool, `run_in_background`, from the coordinating session. No Workflow script. Launch times are those of the Agent calls (B/001:3315 and the lines after). Finish times are the hand-back message times. The overlap below is computed from those times.

- Scouts: F2b 17:45:22 to 17:55:58; P2 17:45:24 to 18:00:15; F1 18:00:28 to 18:09:22; F2a 18:00:29 to 18:12:57; P1 18:00:31 to 18:10:10; F2c 18:09:25 to 18:18:35; F3 18:10:12 to 18:21:04; F4 18:13:01 to 18:25:54; P3 18:13:03 to 18:23:48.
- Writers: F2b 18:01:19 to 18:16:06; P2 18:01:20 to 18:12:25; F2a 18:26:07 to 18:38:32; F2c 18:26:08 to 18:39:29; F3 18:38:41 to 18:55:23; F4 18:39:38 to 18:57:19; F1 18:46:00 to 19:03:36; P1 18:55:33 to 19:07:12; P3 18:57:29 to 19:09:50.
- Most scouts at once: 4 (18:13:03 to 18:16:06, F2c, F3, F4, P3). Most writers at once: 3 (18:46:00 to 18:55:23, F3, F4, F1; and 18:57:29 to 19:03:36, F1, P1, P3). Most scouts and writers together: 5 (18:01:20, 3 scouts and 2 writers; 18:13:03, 4 scouts and 1 writer). The pilot's record-test reader (18:16:51 to 18:45:49) and other jobs ran beside them.
- Pace: three scouts first, then one more launched as each ended ("The F1 scout is done, and I've launched the F2c scout." 18:09:27, B/001:3559). The pilot's two writers ran before the other seven. The coordinator started F2a and F2c "before the pilot test's verdict" (18:26:24, B/001:3915): "To save time I started the F2a and F2c writers before the pilot test's verdict; if the test finds a loss, I'll fix those entries one at a time." On 18:17:28 (B/001:3692) it had written: "The other chunks start when it passes." So the curator's "at least 4 in parallel" holds for the scouts (4), not the writers (3).
- Earlier the same night (02:10 to 05:35), the seven "FACTS slices" ran one at a time, not in parallel: "the rest of FACTS goes in six slices, one at a time, and Fable checks them all at the end" (B/000:18726, 02:42:15). The boot note's plan at 02:12:32 still read "two workers at a time" (B/000:18568). The launches were one after another: slices 2 to 7 at 03:00, 03:27, 03:55, 04:25, 04:53 and 05:19 (B/000:18772, 18847, 18900, 18964, B/001:17, 77).
- What kept two writers from writing the same lines: a writer wrote only an apply file and applied it in its own worktree, `/home/user/rec-<chunk>` ("Do not commit anything, and remove your worktree"). Only the coordinator applied files on `main`, one after another: "Its file gets applied first and P2's second, since P2 retitles entries that F2b may quote." (18:12:43, B/001:3596). It re-checked each file on the newest `main`: F4 reported "`record.py check --base HEAD` exits 0, both on d0eaa01ec and again on the current main, a30a48131 (after chunk F3...)" (B/001:4038). The chunks were disjoint ranges of entries, so no two writers had the same entry.
- Apply order and commits: P2 and F2b `55f1a1352d` (18:16), F2a `0b47fd7335` (18:38), F2c `82c58c9c8e` (18:39), F3 `a30a481315` (18:55), F4 `9ef0b13a8a` (18:57), F1 `f29f7273c7` (19:03), P1 `b87a17de52` (19:07), P3 `ab933086b8` (19:10).

## 10. How many ran side by side on 10-22

Shown by the Workflow calls (B/002) and the run journals under `subagents/workflows/wf_*/` (agent files with their own timestamps).

- 10-21 23:37:35 to :44 (B/002:7076 to 7082), the POSITIONS audit, not the clarity rewrite: 4 Workflow runs of 2 chunks each. The coordinator at 23:10:13 (B/002:6762): "Four Workflows side by side, so eight agents run at once. One Workflow is capped at two by the machine's 4 CPUs." The VM restarted at 00:03 and the four runs were resumed at 00:05 (B/002:7334 to 7337).
- 10-22 08:34:26 to :33 (B/002:9010 to 9014), the clarity rewrite of POSITIONS, first launch: 5 runs. Four runs of 2 chunks (`wf_d3e351c0-edc` p1, p2; `wf_9d898834-f5c` p3, p4; `wf_d8fdeed7-8b4` p5, p6; `wf_e98f1b26-a7f` p7, p8), 8 or 9 entries each, and one run for the FACTS calibration (`wf_d4a20e43-e1d`, f0). The journals show 46 agents, at most 2 at once in each run and at most 9 at once in all (08:34:36). Those runs had no judge; the judge-only runs `wf_a4d6ac30-946`, `wf_89f6e945-3c5` and `wf_cc490bd8-861` were launched at 09:28 (B/002:9345 to 9347).
- 10-22 10:10:51 to 10:11:00 (B/002:9570 to 9573), the clarity rewrite of FACTS: 4 runs of 4 chunks each, 16 chunks of 12 or 13 entries (f1 to f16): `wf_9e43746d-fb4` (f1 to f4), `wf_f594b741-c2e` (f5 to f8), `wf_95cdd15c-0ce` (f9 to f12), `wf_985f41e3-aa4` (f13 to f16). Each run had 28 agents (7 per chunk: assess, writer driver, cold read, check, fix driver, reread, judge), at most 2 at once. All four together: at most 8 at once. They ran 10:11 to 12:12. The coordinator's note at 10:11:25 (B/002:9597): "each its own writer stream (f1, f5, f9, f13), with the judge".
- How the chunks were shared: `runs.json` splits the entries in file order, `fc[4*i:4*i+4]` for the four FACTS runs (B/002:8973), and two chunks to each of four POSITIONS runs. `consolidation-2026-10-22/runs.json` was committed at 08:34 (`d568449911`) before the launch at 08:34:26. The run IDs are in the boot note (B/002:9041), not in `runs.json` (it holds no `wf_`).
- What kept runs from writing the same lines: the script's own comment (`tools/record-clarity/record-clarity.js`): "Every agent writes its own files into out + chunk name + '/'. The judge writes final.apply and queue.md; the coordinator applies final.apply with record.py, files queue.md and commits. Nothing here touches the record." Chunk names p1 to p8 and f0 to f16 are unique across runs. The coordinator applied the runs one by one: `265a607119` (p1 to p4, 09:45), `f1b427c164` (p5 to p8, 09:47), `0ae072be72` (f5 to f8, 11:56), `bb39dbee3c` (f1 to f4, 12:03), `16bbe6072d` (f9 to f12, 12:06; "f10 before f9 for F-203"), `e06bd068e7` (f13 to f16, 12:13). The order rule for a split or merge also shows: "F-268 split out in f3", "F-246 merged into F-259".
- Writer streams: one headless Opus session per run takes its chunks in turn under `flock`. The streams came at `913ba1cbf` (09:29, after the POSITIONS runs had started); the 08:34 POSITIONS runs used one fresh writer per chunk. The coordinator proposed them at 08:37:09 (B/002:9073): "Run one headless Opus writer for each parallel stream."

Against `delegating.md`, "A long writing pass" (read 11-24):
- "four or five runs at once, eight or nine agents, ran to the end on this machine": agrees. 5 runs and 9 agents at 08:34, 4 runs and 8 agents at 10:11. "More has not been tried": agrees; no run of more is in the transcripts.
- "chunks of about ten": agrees. POSITIONS 8 or 9 entries, FACTS 12 or 13, the audit 10 (and 5).
- "Share the chunks evenly among the runs": agrees (2 chunks each, then 4 each).
- "chunks names that differ across all the runs; each chunk writes only into its own folder": agrees.
- "give each run its own `stream` name": differs in form. No call passed `stream`. The script's default is the first chunk's name, which differs per run (f1, f5, f9, f13). The POSITIONS runs of 08:34 had no streams.
- "write each run's exact arguments into `runs.json` before the launch, name it in the boot note": agrees. "After the launch, add each run's ID to it": not done. The IDs went into the boot note, and `runs.json` has none.
- "End each round with one judge": agrees for the FACTS runs. The POSITIONS runs had it added after (09:28).
- "Only you write the record files": agrees. "If a chunk splits or merges an entry that another chunk also changes, apply that chunk first": agrees (f10 before f9).
- The 2-agent cap of one run is in the transcripts (B/002:6370, 22:26:58, and the journals) and in `delegating.md` as "a Workflow run": the skill text says "four or five runs, eight or nine agents", which fits it without stating the cap.
- The 10-13 run is not in that section: it ran without a Workflow, by hand-launched Agent calls, at most 4 scouts or 3 writers at once.

## 11. What I could not find

- A single moment where he "recognized that the record was in chronological order". Closest: 09-30 12:01:35, "I assume the facts and positions are ordered chronologically"; it was an assumption, and the coordinator corrected it the same minute. FACTS had been regrouped by area on 09-24 and POSITIONS by theme on 09-30.
- Any commit that reordered FACTS or POSITIONS entries by topic inside a section. Entries stayed in the order of addition. I found none that moved many lines with few changed words in either file between 09-19 and 10-13, other than the three above (checked by the heading lists at about every sixth commit, not by a diff of every commit).
- How the worker of 09-30 chose the six POSITIONS themes. No brief names them and its report lists them without a reason.
- The curator's words on the results of the 09-24 regroup and the 09-30 POSITIONS regroup. I found none.
- A reply from him to the withdrawn Fable regroup ask. None found.
- His words "at least 4 chunks in parallel" or any message on 10-13 about how many chunks to run at once. The nearest are 10-21 22:24:32 and 10-22 08:28:48 (section 2). On 10-13 the coordinator chose the pace.
- The original of his 09-30 05:25 message as a `user` entry; only its copy in the brief (A/002:16581) was found.
- Whether the per-chunk concurrency on 10-13 was limited by a rule or by the coordinator's choice. No reason is written for starting three scouts first.
- The `sort` of POSITIONS in commit `5094ded2d9` ("the sort method's correction in POSITIONS", 10-12 16:34): it concerns the two sorts of the 73 conduct rules (`process-engineering/rule-sort.md`), not a sort of the record.
- Finish times of the 10-13 agents are the hand-back message times, not the agents' last records.
- Two copies of some transcript spans exist (replays at a seam), for example A/002:16xxx and A/002:18xxx hold the same 09-29 and 09-30 text; I cite the first.

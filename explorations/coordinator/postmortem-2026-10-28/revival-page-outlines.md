<!-- The page "the revival so far" (https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5) as outlines, for the curator's choice of its shape: version 20, the text Professor Sukyoung Ryu received, and version 24, the last publish, part by part with sizes; the drift from 20 to 24 by part and by version; and the hybrid shape of revival-page-drift.md section 8, option 2, made concrete. Written 2026-11-03 from git, the scratch pages and the drift note. -->

# The revival page: outlines of versions 20 and 24, the drift, and the hybrid

Sizes are in characters of the text file, counted per part from its `## ` heading to the next, header and sources included. "Text" is `explorations/coordinator/process-engineering/revival-story.md`. Dates are 2026, UTC.

## Sources

1. Version 20's text: `git show 9556daf62:explorations/coordinator/process-engineering/revival-story.md`, 31,602 bytes. Found in git. Its page HTML (43,453 bytes) is not on disk.
2. Version 24's text: `git show 703d005d1:` the same path, 40,997 bytes. Its page: the scratch file `/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/revivalpage/page.html`, 54,671 bytes, the size `evidence/revival-page-history.md` section 1.2 gives for v23 and v24.
3. Version 22's page: the scratch file `.../revivalpage/index.html`, 47,292 bytes, the size the Artifact listing gave for v22 (same section). v22 has no text commit. `.../revivalpage/index-new.html` (10-24 11:59) has v24's headings.
4. `git diff 9556daf62 703d005d1` on the text; `git log` of the text: v23 is `e62489ef4` and `ef425379e`, v24 is `703d005d1`.
5. `revival-page-drift.md`, sections 3 to 8.
6. His words: `.../scratchpad/timeline/revival-page-words.md` (uncommitted), quoting his messages of 10-10 to 11-03.
7. `explorations/coordinator/PLAN.md`, "Where we stand"; `explorations/reviews/batch-25-review.md`, the run's measures.

## 1. Version 20 (10-13), 31.6K

- Header and glossary, 1.8K: seven words (team, walk, compiled path, checker, library, switch-over, gap ledger).
- Part 1, the start and the exploring era (08-19 to 09-16), 3.2K: the 2012 tree builds again; the microGPT rounds; the other assistants; the blinded and informed runs; the ledger's first 309 rows; the territory map; the sealed tree.
- Part 2, the unsealed tree and the batches (09-17 to 10-10), 7.6K: how a batch works; the first climbs; batches 3 to 10 in one paragraph; 13 main decisions; the checker count and the distance, value by batch through 13b; where the tokens went; the post-mortem of 09-29 on scratch files.
- Part 3, how the record grew, 2.3K: the chart to 10-09, and eight lines on the ledger, FACTS, POSITIONS and INDEX.
- Part 4, since 10-04: the skills and the process, 2.7K: the process-engineering study (builds, one probe, six priced batch designs, the redesigned round); the skill's steps of 10-04 to 10-08; the context study; the ledger's form and rewrite; the climb's pause.
- Part 5, what the revival changed in Fortress, 3.5K: numbers, ranges, arrays and library, walk, checker, code generator and run time; Appendix I at 39 entries; the size of the changes.
- Part 6, the original Fortress and the revival's resolutions, 10.6K: "Custodians, not authors"; the three sources that disagree; the number types as example; what was left as the team had it; 12 resolved contradictions in four groups; where the quiz was right about the original.

## 2. Version 24 (10-24), 41.0K

- Header and glossary, 2.0K: the switch-over line now says the checker accepts the one library since 10-24.
- Part 1, 3.2K: unchanged.
- Part 2 (09-17 to 10-24), 12.4K: v20's frame; 19 decisions; the two values through batch 22; a new paragraph "Batches 14 to 22", one line a batch; a token list for batches 14 to 22; the tokens and the 09-29 post-mortem cut short; a new subsection "Phase 3's end (10-24)" with the zero's three readings and "the curator's call"; "Phase 4's first batch", a draft that waits for his go.
- Part 3, 2.7K: the chart to 10-24; two lines added, on the consolidation of 10-13 and the record at batch 22.
- Part 4, 3.6K: the study and the skill's steps folded to two lines; the ledger to one; new: "The record's post-mortem (10-20 to 10-22)", "A commit outside the batch", "The type-decisions review (10-23)", "No timing of walk".
- Part 5, 4.6K: v20's points plus the integer power, `Index`, the `String` operators, a list's `<`, every operator checked, the self type, conditional `extends`; Appendix I at 42; sizes recounted at `2bff2fe23`.
- Part 6, 12.4K: v20's points plus five resolutions (exclusion as a whole, symbolic operators, the vectors' algebra, the index type, the integer power); walk's `Bottom` cases 4 to 3; 63 edited tests and demos, all 52 demos run.
- The sources of parts 2 to 6 gain record handles (P-79, P-152 to P-157, F-53, F-245, F-258 to F-285).

## 3. The drift, version by version

- **v21 (10-13, page only).** The chart through 10-13. No text change.
- **v22 (10-19, page only, 46.7K).** In part 2: "Batches 14 to 18 followed from 10-14"; one line a batch with its count, distance and review; the count and distance rows through 18; "Tokens written, batches 14 to 18", with agents and hours per batch. Parts 5 and 6 stay at batch 13b (Appendix I 39, 43 tests edited), though his ask of 10-19 named "the changes in the language". The cuts of v20 text are not yet made. Source 3; the drift note's section 4, items 2 and 7.
- **v23 (10-24, text 41.0K).** Everything else in section 2: part 2's batches 19 to 22 and the token list to 22; "Phase 3's end"; "Phase 4's first batch"; six decisions; parts 5 and 6 brought to batch 22; part 4's four new sections; the record handles; the glossary line. It also cuts v20 text he kept on 10-13: in part 2, the rung workers' half and the skeptics' two-fifths, the per-batch tokens after the post-mortem, the six small steps behind the scratch files, batch 7b's 20 files; in part 4, the six priced designs, the redesigned round, the skill's daily steps, the context study, the ledger's archaeology and check. Source 4.
- **v24 (10-24).** The chart carried to 10-24 with its caption; no other text change (`703d005d1`).
- **Net, 20 to 24.** About 5.5K added that the drift note's section 6 removes (batch lines, tokens, status, open asks, the agents' process, handles); about 5K of language changes it keeps; about 1.5K of v20 text it brings back.

Two points weigh most for the shape:

1. The drift entered one landing at a time, as results copied in: v22 after five batches, v23 after four more. Each addition was a live number or status. The hybrid moves that kind of content off the story; option 3 of the drift note keeps adding it there.
2. Her letter links the text on GitHub's `main` (drift note, section 3). Every commit to the text changes what she reads. Under the hybrid, a landing never touches that file.

## 4. The hybrid made concrete

This is the drift note's section 8, option 2, with sections 5 and 7. Items marked "proposed here" are not in the note.

**The story.** The text and the existing page, rebuilt from v20 (`9556daf62`) with the additions of the drift note's section 5. About 37K text, about 49K page.

- Header and glossary: v20's, with the switch-over line of v24. Proposed here: one line that names the status file for today's numbers.
- Part 1: v20's, unchanged.
- Part 2: v20's text, with its tokens and post-mortem lines back; the six new decisions; the count and distance rows to the phase's close; one paragraph of synthesis per closed phase. No per-batch lines, no token list, no status, no open asks.
- Part 3: the chart and its lines to the phase's close.
- Part 4: v20's part 4 as it was. No new sections.
- Part 5: every change a programmer sees, from the diff of `revival-changes.md`.
- Part 6: every resolved contradiction, with its reason.
- Sources by file and section, with no record handles.

**When the story is rewritten.** At a phase's close and at the switch-over, never at a landing. One Opus writer; the coordinator checks the diff against the keep and leave-out lists, publishes by URL to the same page, and commits the text to `main`. Cap: at most 2K more per phase. The first rewrite is the restoration, 0.2M to 0.4M tokens written. Phase 3 has closed since the note was written: PLAN says climb batch 22c (`b81d86b75`, 10-30) closed it, so the restoration can carry phase 3's paragraph.

**The status page**, "the revival now": a separate page and file, at most 2K, replaced whole at each landing. Git keeps its history. It holds:

- the landing it describes: batch, commit, date;
- the phase, and how many of its batches have landed;
- the checker count and the distance at that gate;
- microGPT: the quick walk check's result, and where the compiled path stops;
- the last batch's tokens written and run time;
- the next batch, in one line.

It holds no reasons, no history and no asks. A script writes it from PLAN's "Where we stand", the gate's `summary.txt`, `checker-count.txt` and `distance.txt`, and the review's measures line. The script costs 0.1M to 0.2M once; each landing's run and publish 0.02M to 0.05M. Proposed here: the file sits beside the story as `process-engineering/revival-now.md`.

At climb batch 25's landing it would read (source 7): phase 4, three batches landed, the last climb batch 25 (`11d2d8764`, 11-03); count 0, distance 0; quick walk check 7 of 7 in both programs; on the compiled path all 18 of microGPT's components stop at name resolution, as expected before the switch-over; 6.03M tokens written in 4 h 47 min; next, climb batch 26.

**What it needs from him.** A yes to option 2; the status file's name and whether the story names it; and the skill changes of the drift note's section 7 (a rule in `coordinator` that a phase's close briefs the story's writer, and a step in `references/batch.md`, "The landing", that runs the script).

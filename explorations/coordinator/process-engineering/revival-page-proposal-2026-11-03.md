<!-- A proposal for the new shape of the page "the revival so far" (https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5), after the curator's word of 2026-11-03, 19:4x UTC: its two readers and one job; the story's order, section by section, with each section's source in version 20 or 24, its cuts and its size; how a landing and a phase's close keep it current on the same page, with their costs; its register; and five open choices, each with a recommendation. Written 2026-11-03 from the texts at 9556daf62 and 703d005d1, the outlines and drift notes of postmortem-2026-10-28, and his words. A proposal; nothing is done. -->

# The revival page: a proposal for its new shape

Proposal for the curator, not done. "v20" is the text at `9556daf62`, which Professor Ryu received. "v24" is the text at `703d005d1`, the last publish. Both are `process-engineering/revival-story.md`. Sizes are in characters of the text. The drift note's hybrid (its section 8, option 2) is rejected and not used here.

## 1. The readers and the job

The page has two readers:

- An outsider who knows programming languages and a little of Fortress, such as Professor Ryu. The repository's README is about the language as the team left it. This page is about the revival.
- The curator, who reads it to close his gap on what happened since the tree was unsealed on 17 September.

Its one job: tell what the revival did and why, as a story in plain words, and where it stands now. It stays one page, kept current after each landing and each phase's close.

## 2. The story's order

The story comes first, then two reference parts. Each section ends with its references, by file and section.

1. **Opening** (0.4K). What Fortress was, with a link to the README; what the revival does; its measure, microGPT compiled to bytecode and running fast; the date of the last update. From v20's header. Cut: "for the curator", and the glossary up front, which moves to section 10.
2. **Where it stands** (0.8K, a fixed block). The phase and its aim; the last landing and its date; the checker count and the distance; microGPT under walk and on the compiled path; the next step. New. It replaces v24's "Batches 14 to 22", its token list, "Phase 3's end" and "Phase 4's first batch" (3.2K), status written as prose. Only the script writes it (section 3).
3. **What the revival is, and its rule** (2.2K). The team; the three sources that disagree; custodians, not authors; each change to the specification marked, with the original text in Appendix I. From v24 part 6, "Custodians, not authors" and "The team left three sources that disagree", moved to the front because every later part rests on them. It defines team, walk, compiled path, checker, the one library, the prelude and the switch-over. Its count of the team's edited tests moves to section 8.
4. **Running the 2012 tree again, 19 August to 16 September** (2.0K). The build on current Java; the microGPT ports, 10.9 s a training step against 22 ms in Python; the runs that hunted gaps; the gap ledger; the map; the sealed tree. From v20 part 1, cut from 2.8K: the run letters (B, B2, C to C4), the ledger's row counts per merge, row 148.
5. **How the work runs: phases and batches** (2.2K and the batches chart). The six phases; a batch in plain words, explained once, here; the gate; to land; the two numbers, and why they sometimes rose. The batches chart sits here, and the text explains how to read it. From v20 part 2, "How a batch works", "The plan" and "The checker's errors falling". Cut: the agents' role names (skeptic, judge, repair, gather, merged-diff review), the ladder, the batch names' suffixes in prose (3.5, 6b, 7R, N, 7C), and the lists of the count and the distance by batch (1.1K in v24, 37 lines), which become the chart.
6. **The phases so far** (4.5K now, at most 1.5K more a phase). One chapter for each phase, as synthesis: its aim, its decisions and why, what went wrong, its dates and its number of batches. Chapters: before the plan, 17 to 25 September (test first, one library); phases 1 and 2 (sizes at run time, overflow, the flat number tower); phase 3, 28 September to 30 October (the checker at zero, with the zero's readings in one sentence); phase 4 at its close. From the 19 "main decisions" of v24 part 2, regrouped by phase. Cut: the lines per batch, restarts, held pushes, open asks, "the curator's call", the batch number on each decision.
7. **How the record grew** (2.6K and the record chart). What the record is: the gap ledger, the facts, the decisions and the index of notes. The chart, and text on its shape and its jumps: the ledger's rewrite of 8 October, the consolidation of 13 October, the rewrite of 22 October after each decision was traced to the curator's own words, the scratch files of 29 September, and the written instructions that every agent loads. From v20 part 3 whole, v24 part 3's two added lines, and v20 part 4 cut to the lessons that explain the chart. Cut: the shared build, the 7.0M probe, the six priced designs, the context study, tool names, "A commit outside the batch", "No timing of walk", and the type-decisions review as an event (its finding stays in section 9). They are about tuning the agents. On 13 October he wrote "Nothing about improving the agentic coding has place here!", though v20 kept a short part 4.
8. **What changed for a programmer** (4.1K). v24 part 5 whole, by area, with Appendix I's count and the size of the changes.
9. **The team's sources and the resolutions** (8.2K). From v24 part 6: the number types as the example, "Left as the team had it", and the 17 resolved contradictions in four groups. Cut: "Where the quiz was right about the original" (1.4K), which grades a model's memory. Its two points for a reader fold in: the tower is the team's interpreter library, and the team's walk wrapped on overflow.
10. **Words used on this page** (1.0K). v20's glossary, at the end, for a reader who jumps in.

The whole: about 28K of text and 3K of references, 31K, against v20's 31.6K and v24's 41.0K.

**Terms that go, as internal lingo:** record handles (P-152, F-283); review-queue items; ledger row numbers; rung letters, and the word rung; the agents' role names; "climb batch" (say batch); the ladder; `XXX` test names; tool and workflow names (`ledger.py`, `spend.py`, the orientation and record-landing workflows); commit hashes in the prose (the references keep them). **Terms that stay**, each defined at its first use: batch, phase, gate, land, checker count, distance, walk, compiled path, checker, the one library, the prelude, switch-over, the sealed tree, gap ledger, record, curator.

## 3. Keeping it current on the same page

**At a landing, no prose.** A script replaces three things whole and touches nothing else:

- the "where it stands" block, between two marker comments in the text, filled from PLAN's "Where we stand" (its "Landed" and "Next" items) and the gate's `summary.txt`, `checker-count.txt` and `distance.txt`;
- the batches chart, from `record-growth/landings.csv` (the script adds the landing's row, today kept by hand) and each landing's gate files;
- the record chart, by `measure.py` and `chart.py`, as today.

The captions and the text around the charts hold no live numbers. The coordinator looks at the result, publishes by URL and commits the text and the two images. Cost: the script once, 0.15M to 0.3M tokens written (the record chart's scripts exist; the block and the batches chart are new); each landing, 0.02M to 0.05M.

**At a phase's close, one chapter.** The coordinator briefs one Opus writer with the diff of `revival-changes.md` since the last update, the phase's paragraph in PLAN or PLAN-history, Appendix I's new entries, and section 2 as its keep and leave-out lists. The writer adds the phase's chapter to section 6, the phase's language changes to section 8 and its new resolutions to section 9, and brings the sizes in sections 7 and 8 to the phase's close. A phase adds at most 2.5K; past a cap, the writer rewrites the part shorter. The coordinator checks the diff against the lists. The curator then reads it as a page, each changed section an item with the new words marked, before it lands. Then it is published by URL and committed. Cost: 0.25M to 0.5M a phase.

**Never at a landing, and not at a phase's close:** the earlier chapters, sections 3 and 4, and the resolutions already written. They change only at the curator's word.

**The first rebuild.** One Opus writer, from v20, v24 and this note, writes phase 3's chapter (batch 22c closed the phase on 30 October, PLAN "The phases") and brings sections 8 and 9 to phase 3's close; phase 4's changes wait for its close. The curator reads it as a page; it is published by URL to the same page and committed, so her link on `main` shows it. Cost: the writer 0.3M to 0.5M, his page 0.05M to 0.1M, and the script: about 0.5M to 0.9M in all.

## 4. The register

- Plain full sentences, for a reader who knows programming languages. Halfway to ASD-STE100: active voice, short sentences, one word for one thing. No fragments such as "after 7R: 10".
- No internal shorthand (section 2's list). Each project term defined at its first use.
- Numbers as K or M. Dates as "17 September".
- The team's people and papers named, as v20 names them.
- The synthesis kept: a chapter tells what happened and why, never one batch's results. A landing adds no prose and no copied results.

## 5. Open choices

1. **One chart or two.** Today's page has one chart, the record's growth; its named vertical lines are the batches.
   - (a) Keep that chart alone, and the two lists of numbers as text.
   - (b) Add a batches chart, drawn from those lists, which replaces them.
   - Recommendation: (b). The lists grew one line a landing; a chart that the script redraws keeps the prose fixed.
2. **What the batches chart and the block show after phase 3**, where the count and the distance stay at 0.
   - (a) The two numbers only.
   - (b) Also each phase's own measure: for phase 4, the library's Java bindings that only walk can call, 161 of 449 at batch 25 (PLAN, "Where we stand"). The gate does not write that count yet.
   - Recommendation: (b), with a gate stage that writes it.
3. **The tokens spent.**
   - (a) None.
   - (b) One total a phase in its chapter, and v20's lesson on the prompt cache in one sentence.
   - (c) Per batch, on the batches chart.
   - Recommendation: (b). An outsider asks what the work cost; a list per batch is how v22 drifted.
4. **The names of the agents' tiers.**
   - (a) Name Opus, Sonnet and Fable wherever the story says who did what.
   - (b) Name them once, in section 5, where a batch is explained, and say "an agent" elsewhere.
   - (c) No names.
   - Recommendation: (b).
5. **The resolutions.**
   - (a) One long part inside the story, after the phases.
   - (b) Behind the story, with section 8, as the order above has them; each phase's chapter names the resolutions it made in one line.
   - (c) Spread over the phases' chapters.
   - Recommendation: (b). 8K of resolutions in the middle stops the story for a listener, and her main interest stays whole in one place.

## Sources

- v20 and v24: `git show 9556daf62:` and `703d005d1:explorations/coordinator/process-engineering/revival-story.md`; sizes counted per subsection.
- `postmortem-2026-10-28/revival-page-outlines.md`, sections 1 to 4; `revival-page-drift.md`, sections 4 to 8 (the costs of a writer and a script).
- His words: `HELD.md`, the line of 19:4x on 11-03; his messages of 10-10 06:27, 10-12 22:53 and 10-13 quoted in the drift note, section 2.
- The published page's files: one image, `record-growth.png` (Artifact listing, 11-03).
- `PLAN.md`, "Where we stand" and "The phases"; `compile-ladder/climb-batch-25/gate/`; `process-engineering/record-growth/README.md`, "Files".

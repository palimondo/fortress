<!-- The page "the revival so far" (https://claude.ai/artifact/8Gg1f2ZRXg462qmhcwx1T5): its first purpose in the curator's words, how the purpose moved by version, the version Professor Sukyoung Ryu received, where versions 22 to 24 drifted, and a proposal to restore it. Written 2026-10-28 from evidence/revival-page-history.md and git. -->

# The revival page: its purpose and its drift

Times UTC, his time in brackets. "Text" is `explorations/coordinator/process-engineering/revival-story.md`. "Page" is the published HTML. Sizes are in characters.

## Summary

- You asked for the page on 10-08 for your own learning: a retelling of the batches and a chronology of the changes, to improve the workers' skill. That day you called it the delta from the original Fortress to the revival, to revise after every batch.
- On 10-12 you added a second reader, Professor Ryu, to show the respect for the team's work. The rewrite for her (v17, 77K page) went too far. You sent it back to v15's scope.
- She received v20 of 10-13: text `9556daf62`, 31.6K; page 43.5K. Your letter links the text on GitHub's `main`, so today she would read v24.
- v22 (10-19) and v23 and v24 (10-24, text 41.0K, page 54.7K) drifted: per-batch results and tokens, phase status and open asks, and three new sections on the agents' process. They also cut v15 text that you kept.
- Proposal, not done: rebuild from v20 and add only the language changes and the numbers of batches 14 to 22. Cost about 0.2M to 0.4M tokens written.

## 1. The purpose at the start

Your ask of 10-08 09:25 (11:25):

- "I want, uh, like, a high-level retelling now of like the story of what happened in all of those batches"
- "maybe some kind of chronology of changes in the repo would be helpful at a certain point just to calibrate ourselves"
- "I don't want a report for report's sake. I want it for my personal learning and also derive it for some improvements to the skill for the workers."

v1 came at 10:25 (12:25): seven parts, the last "What this means for the skill". Text 24.2K, page 40.6K.

## 2. How the purpose moved

- v2 to v14 (10-08): house style, glossary, Select buttons, part 6 rewritten at your comments. At 12:30 you named its core: "the most compressed version of our learning of the gaps and our acting on on these gaps, so this is the delta from original report to the current state of revival. It is some kind of a living document that needs to be refreshed or revised after every every batch". At 12:48 the skill's share went to "a separate part resources/revival", now `revival-changes.md`. v14 removed part 7. Text 29.4K, page about 43.0K.
- v15 (10-10): the chart to batch 13. Page 43.6K.
- v16 (10-10, a Sonnet worker): page 64.0K. You: "we always did much more synthesis", and "I am against Sonnet workers touching my artifacts." It was reverted.
- 10-12 22:53 (00:53 on 10-13): the second reader. "Then we should use it as one of references in our email to Ryu." "I want to make it clear the respect we have for the team's work".
- v17 and v18 (10-12 and 10-13): reframed for her. Text 60K, page 77K. You, 10-13: "Rewrite should have just updated the revision to reflect what landed in recent batches. Not reframe the document in the emails framing!"; "Nothing about improving the agentic coding has place here!"; "Focus on Fortress revival as the title says."; "Main problem with the lasted version was expansion in didn't ask for, resulting in TL;DR slop."; "Keep v 15 scope and content with update up to batch 13, plus corrections and approved additions."
- v19 and v20 (10-13): v15's frame through batch 13b, with the Custodians passage you approved and Astra and Sol named plainly. Text 31.6K, page 43.5K.
- v21 (10-13): the chart through 10-13.
- v22 (10-19): page 46.7K, no text commit. Your ask: "We had this revival so far document that included the changes in the language. So that one should be updated".
- v23 and v24 (10-24): text 41.0K, page 54.7K. Your ask: "update it to the current state". At 13:46 (15:46): "The revival so far has not updated the chart."
- 10-28 21:29 (22:29): "Latest updates have drifted from the original intention."

## 3. The version she received

- Letter 1 (drafted 10-10) asked for the report. It had no link to the page.
- Her reply of 10-12 asked who you are and where the work will live. Letter 2, sent 10-13 01:33 (03:33), answered, asked for the report again, "publicly if possible", and linked the text: "A longer account is here", to `blob/main/.../revival-story.md`. The text then was `9556daf62`, the same as page v20.
- v20 has six parts: 1, the start and the exploring era; 2, the unsealed tree and the batches through 13b, with the decisions, the checker count, the distance, where the tokens went and the post-mortem of 09-29; 3, the record's growth, with the chart; 4, the skills and the process since 10-04, as v15 had it; 5, what changed in Fortress for a programmer; 6, the original Fortress and the revival's resolutions, which opens with "Custodians, not authors".
- The link names `main`, and v24's text (`703d005d1`) is on `origin/main`. So the link shows v24 today.

## 4. Where v22 to v24 drifted

1. Batch results copied in, the fault you named in v16. Part 2: "Count 30 to 28, distance 34 to 31. The machine restarted just after the launch, and the run resumed." "Its push waited for the curator's answers (part 4)."
2. A token list per batch, put in at v22 without your yes: "Tokens written, batches 14 to 22, by the run's own count".
3. Status and open asks, which go stale: "Whether it is done is the curator's call; the review's default is done." "Phase 4's first batch, climb batch 23, is drafted and waits for the curator's go."
4. The agents' process, which you ruled out on 10-13: new sections "The record's post-mortem (10-20 to 10-22)" ("The work wrote about 64M tokens."), "A commit outside the batch", "The type-decisions review (10-23)" and "No timing of walk".
5. Record handles in the sources: "P-79 and P-152 to P-157", "F-281 to F-283".
6. Cuts of v15 text that you kept on 10-13, dropped or folded into one line: the context study, the six priced batch designs, the skill's steps of 10-04 to 10-07, and the six small steps behind the scratch files.
7. v22 left out what you asked for. Parts 5 and 6, the language changes, stayed at batch 13b. v23 brought them up to date.

Sources: 1 to 5, `git diff 9556daf62 703d005d1` on the text. 2 and 7, `postmortem-2026-10-19-haiku/part-3-return.md`, entry 15.

## 5. Proposal for the curator, not done

**Base:** v20, text `9556daf62`, as she received it.

**Keep from v22 to v24**, in v20's frame:

- Part 2: the six new decisions (exclusion over the whole parameter types, the integer power, a list's order, symbolic operators checked, the `Index` bound, vectors stay additive groups); the count and distance rows through batch 22; one sentence that phase 3 reached its exit at batch 22 on 10-24, and phases 4 to 6 have not started.
- The glossary's switch-over line.
- Part 3: the chart through 10-24 and its lines on the consolidation of 10-13 and the record at batch 22. You asked for both.
- Part 5: every addition: the integer power, `Index`, the `String` operators, a list's `<`, every operator's overloads checked, the self type, conditional `extends`, Appendix I at 42 entries, the recounted sizes, the respelled demos.
- Part 6: the five new resolutions, walk's three `Bottom` cases, 63 edited tests and demos, all 52 demos running.

**Drop:** items 1 to 5 of section 4. Cite sources by file and section, with no record handles. Put back v20's part 4 and its token and post-mortem text in part 2.

**Result:** about 37K text and 49K page, against 31.6K and 43.5K at v20.

**Steps:**

1. One Opus writer, briefed with this file and the diff above, writes the text and the page. It uses v24's page as the HTML shell, for the house style and the Select buttons.
2. The coordinator checks the page against the keep and drop lists, and publishes it by URL to the same page.
3. The coordinator commits the text to `main`, so her link shows it again.
4. Optional: the text's header states the scope for later updates: Fortress as a language, synthesis not batch results, no agents' process, no status.

**Cost:** about 0.2M to 0.4M tokens written. The writer reads about 60K tokens (two texts, the page shell, the brief and the diff) and writes about 30K. Its context, written again over its turns, gives 0.15M to 0.3M. The check and the publish add 0.05M to 0.1M. A headless writer on 10-21 wrote 0.15M.

Sources: the cost basis, `.claude/skills/coordinator/references/analysis.md` and `postmortem-2026-10-20-record/REPORT.md` line 106.

# Part 2. Before the decision

Sizes are of the text, in characters, from `git diff 9556daf62 703d005d1`. Sections 6 to 8 are proposals for the curator. Nothing is done.

## 6. What the restoration removes

Passages that v22 to v24 added and that go:

- Part 2, "Batches 14 to 22 (10-14 to 10-24)": one line per batch, with counts, distances, a restart and a held push. 1.8K.
- Part 2, "Tokens written, batches 14 to 22": the token list per batch. 0.2K.
- Part 2, "Phase 3's end (10-24)": the zero's three readings and "the curator's call". 0.8K.
- Part 2, "Phase 4's first batch": a draft that waits for the curator's go. 0.4K.
- Part 4, "The record's post-mortem (10-20 to 10-22)". 0.7K.
- Part 4, "A commit outside the batch". 0.3K.
- Part 4, "The type-decisions review (10-23)". Its finding stays in part 2 and part 6. 0.6K.
- Part 4, "No timing of walk". 0.1K.
- The record handles (P-, F-) added to the sources of parts 2 to 6. About 0.6K. The new file names stay.

Total removed: about 5.5K.

The v15 text that v23 cut, and that comes back:

- Part 2, "Where the tokens went": the rung workers' half, and the two-fifths of the skeptics, judges, repairs and reviews; batches 7b to 10 after the post-mortem. 0.2K.
- Part 2, "Where the records went": the six small steps behind the scratch files; batch 7b's 20 record files. 0.2K.
- Part 4: the six priced batch designs, and the redesigned round after a skeptic refuses. 0.2K.
- Part 4: the skill's steps of 10-04 to 10-07, one line each. 0.2K.
- Part 4: the context study, and "The ledger" with its archaeology, check and rewrite. 0.6K.

Total back: about 1.5K. The language additions of section 5 stay, about 5K.

## 7. Keeping the page current as a standing procedure

- **Who.** The coordinator briefs one Opus writer. A Sonnet worker never writes it, at your word of 10-10.
- **When.** At a phase's close, and at the switch-over. Not at each landing.
- **Sources.**
  - The diff of `fortress-repo`'s `revival-changes.md` since the story's last update. The orientation workflow updates it at each landing (`coordinator`, `references/batch.md`, "The landing", step 3).
  - PLAN's first section, "Where we stand".
  - The FACTS and POSITIONS entries that those two name.
  - Appendix I of the specification, and the record-growth chart's data.
- **What it adds.** For parts 5 and 6, each change to the language and each resolved contradiction. For part 2, one paragraph per phase, as synthesis. For part 3, the chart.
- **What it leaves out.** Per-batch results, tokens per batch, status, open asks and the agents' process.
- **Cap.** About 37K of text after the restoration. At most 2K more per phase. If a part would pass its cap, the writer rewrites it shorter instead of adding to it.
- **Check.** Before the coordinator publishes, it compares the diff with the keep and leave-out lists.
- **Into the skills.** With your yes, through `references/skill-rewrite.md`: one rule in `coordinator` that a phase's close briefs the story's writer, and, for option 2, one step in `references/batch.md`, "The landing". The scope also goes into the text's own header, where every writer reads it.

## 8. Restructure, or one story

1. **One story, updated at a phase's close.**
   - Keeps: the shape she received, with nothing live in it.
   - Costs: nothing per landing. About 0.2M to 0.4M tokens written per phase.
   - Risk: the page lags for a whole phase. The batch numbers are only in the batch records.
2. **A hybrid: the story, and a live status page apart from it.**
   - Keeps: option 1's story, unchanged between phases. A separate page and file, "the revival now", replaced whole at each landing. It holds the count, the distance, the phase, the last batch and its tokens, taken from PLAN's first section and the gate summaries. Its cap is 2K. Git keeps its history.
   - Costs: a script that generates the page, about 0.1M to 0.2M tokens written once. Then about 0.02M to 0.05M per landing for the run and the publish. Plus option 1's cost per phase.
   - Risk: one more page to keep. Her link stays on the story's file, so the status is not what she reads.
3. **One story, with a short line added at each landing.**
   - Keeps: an up-to-date page in one place.
   - Costs: about 0.05M to 0.15M per landing for the writer. Plus a fold into synthesis at each phase's close, about 0.2M to 0.4M.
   - Risk: high. This is how v22 to v24 drifted: one landing's results at a time. At 0.5K per landing, a phase of ten landings adds 5K before the fold.

**Recommendation:** option 2. The story she received changes only at a phase's close, and the numbers live on the status page.

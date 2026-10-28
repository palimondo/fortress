<!-- The wording of the skill writer's edits of 2026-10-28 to the coordinator skill, old text beside new for each changed passage, for the curator's yes before they reach main; the edits are on the branch skill/consolidation-tools (commits 6414441c5 and 0da629088, base 3d323a5bf). -->

# The coordinator skill: the changed passages

Each passage gives the old text, then the new. Base `3d323a5bf`; branch `skill/consolidation-tools`, after one cold read and the writer's fixes.

## SKILL.md

**"The standing goal", the delegation bullet.**
- Old: "Give exploration, tracing, transcripts, ledger rows and source to workers. Read a worker's final report yourself."
- New: "Keep your context for decisions. Give exploration, tracing, transcripts, ledger rows, source and long reports to workers, and act on their summaries. Read a final report yourself if it is under about 10K characters. Have a worker condense a longer one into a summary or exact quotes."

**"Talking to the curator", second bullet.**
- Old: "Give advice as instructions, in literal words. Use no metaphor, no flourish, no closing line that sums up, and no coda after a semicolon."
- New: "Give advice as instructions, in literal words. Use no hedge words such as "perhaps", no metaphor, no flourish, no phrase that you coined for a thing, no closing line that sums up, and no coda after a semicolon."

**"Talking to the curator", third bullet.**
- Old: "Use no internal shorthand. Define a term that is new to the curator where you use it, even a common term of the work, such as reshape, outer product, Ring or matrix multiplication."
- New: "Use no internal shorthand, and no number or label from your own reasoning that the curator has not seen. Take as known only the skills' terms, POSITIONS' "History he knows", and what the curator profile (below) grades as known. Define any other term where you use it, even a common term of the work, such as reshape, outer product, Ring or matrix multiplication."

**"An ask", item 2, its opening.**
- Old: "2. The context, in short bullets. Start with a short primer in plain words, with a Fortress example. ..."
- New: "2. The context, in short bullets. Start with where the work stands, what the work that this decision is for must produce, and what it protects against. Then give a short primer in plain words, with a Fortress example. ..." (the rest unchanged)

**"The boot", two new steps after step 6.**
- Old: none.
- New: "7. The parts of the skills that the work in hand needs, as the boot note names them, if it names any, and `references/delegating.md`, always."
- New: "8. If the curator is not away ("Quiet times"), tell them in a few lines where the work stands, what the next launch's work must produce and what it protects against. Leave out a running batch, and what the skills hold."

**"A light boot".**
- Old: "... take steps 0 and 3 to 6, and skip steps 1 and 2: FACTS, POSITIONS and INDEX stay unread. Then read the parts of the skills that the work in hand touches, as the boot note names them, if it does. Before you state ..."
- New: "... take steps 0 and 3 to 8, and skip steps 1 and 2: FACTS, POSITIONS and INDEX stay unread. Before you state ..." (the loading of parts moved into step 7)

## references/record.md

**"What an entry is", the POSITIONS bullet.**
- Old: "A POSITIONS entry holds, after its number and a bold title: what the curator decided about the project, and why, in one or two sentences; where it applies; and what it requires of the work. It may point to a fact that it rests on, ..."
- New: "A POSITIONS entry holds, after its number and a bold title: what the curator decided about the project, and why, in one or two sentences; where it applies; and what it requires of the work. It holds what the curator meant, not their exact words, in the smallest form from which a fresh worker or coordinator, with the skills loaded, decides right. For a decision of design, the why, and each correction of the entry, rests on the design's evidence in the repository: the specification, the team's later word, the library and the code. The curator's words show what they decided. A decision of process or priority keeps the curator's reason. It may point to a fact that it rests on, ..."

**"The pass", its first sentence.**
- Old: "The pass owns each entry's final wording."
- New: "The pass owns the final wording of each entry that a worker's findings change, except the corrections of a review of the entries ("A consolidation")."

**"A consolidation", the whole section.**
- Old: "A consolidation runs the pass over whole sections. Run it on FACTS before each batch launches, since the batch's workers read it."
  - "Split each section into chunks of 20 to 32 entries."
  - "For each chunk, a Sonnet scout gathers each entry's report sections, its commits and the curator's dated words."
  - "An Opus writer reads this part, the chunk and the scout's file, and writes an apply file. It runs `apply` and `check --base` in its own worktree."
  - "You apply each file on `main`, run `check --base`, commit and push."
  - "Have Opus workers check each new entry by the pass's step 3. Run no Fable review of the entries."
  - "Have a fresh Opus worker answer a small quiz of decisions from the new entries, on the records at hand, without the curator. The decisions must stay as good, and the worker must follow the pointers when needed. If something critical is lost, find the middle ground entry by entry."
- New: "A consolidation rewrites whole sections, or corrects what a review of the entries found. Run it on FACTS before each batch launches, since the batch's workers read it. It runs as runs of the consolidation tools (below), chunked by subject. You write and edit no entry text in it."
  - "Run one chunk first. Show its texts to the curator as a page ("Pages", `SKILL.md`), new beside old. Run the other chunks at the curator's word."
  - "After the runs, test the changed entries with the record-test kit (`explorations/coordinator/process-engineering/record-test/`). The decisions must be as good as from the old entries. Where one is worse, find the middle ground in that entry."

**"The consolidation tools", the opening paragraph.**
- Old: "Three Workflow scripts make the record and the worker skill readable again when they drift. Each one's README says how to run it and what to do with its output. Put the open questions of their runs on the review queue."
- New: "Three Workflow scripts make the record and the worker skill readable again when they drift. Each one's README says how to run it and what to do with its output. Give a run only its arguments and the input files that its README names, never rules of your own over the tool's briefs. If those briefs do not fit the job, propose their change to the curator. Put the open questions of their runs on the review queue."

**"The consolidation tools", the mining bullet.**
- Old: "The mining workflow finds where each POSITIONS entry came from: the curator's words, or an agent's summary or default. Run it on ..."
- New: "The mining workflow traces each POSITIONS entry to its source: the curator's words, or an agent's summary or default. Its writer changes as little as it can: only a sentence that is false, stale or not the curator's. Run it on ..."

**"The consolidation tools", the clarity bullet.**
- Old: "The clarity workflow rewrites POSITIONS or FACTS entries so that each reads on its own. For FACTS, it first judges every entry by the six checks ... Run it when entries no longer read on their own. Its README: ..."
- New: "The clarity workflow makes POSITIONS or FACTS entries read on their own, and keeps their meaning. For FACTS, it first judges every entry by the six checks ... Given the findings of a review of the entries, as `findings.md` (its README), it corrects what they name: an entry changes only where a finding names it, and grows only by what the correction needs. Its README: ..."

The orientation bullet is unchanged: it already names its job.

## references/delegating.md

**"Which tier runs what", the Sonnet bullet.**
- Old: "Use Sonnet for archaeology and retrieval only, never for a judgement."
- New: "Use Sonnet for archaeology and retrieval of exact words only, never for a judgement or a summary. Use Opus to turn evidence into reports, and to condense a large report for you."

**"Which tier runs what", the writer bullet, its last sentence.**
- Old: "The curator dislikes Fable's register."
- New: "Fable writes none of these texts as written. It may give its reasoning as corrections to one that Opus writes. Its review of a batch record (`references/batch.md`) may edit that file in place."

**"What a brief holds", the first bullet's first sentence.**
- Old: "The problem, never the expected answer."
- New: "The problem, and the tools and limits that the task needs, never the expected answer or a method to reach it."

## references/skill-rewrite.md

**The opening.**
- Old: "The skills are written for a reader new to the repository, which every agent is."
- New: "The skills are written for a reader new to the repository, which every agent is. Each skill holds few rules: only those that change what the model would do by itself. Many small rules and cases contradict each other, and confuse a reader whose context is long."

**The scout bullet.**
- Old: "If a practice that a skill states is in question, have a Sonnet scout check what the workers actually did."
- New: "If a practice that a skill states is in question, have a Sonnet scout gather what the workers actually did, and an Opus worker judge it."

**"The coordinator skill", first bullet.**
- Old: "Guide lightly, by a few general principles, among them how to talk to the curator in each situation. Write no set of many small rules that may contradict each other."
- New: "Guide lightly, by a few general principles, among them how to talk to the curator in each situation." (the second sentence moved to the opening, for every skill)

## references/sources.md

A new section, "The post-mortem of 2026-10-28", 3.8K characters: one provenance line per change above, and one line for the cold read's fixes. No rule text.

## Sizes, against the base

- `SKILL.md`: 21,776 to 22,573 characters.
- `references/record.md`: 12,158 to 12,941.
- `references/delegating.md`: 8,160 to 8,492.
- `references/skill-rewrite.md`: 3,382 to 3,527.

<!-- The exact words of each rule and check on a FACTS entry's form and length at `9de4c69bc8`, and how those words changed from 2026-10-01 to 2026-11-24, as evidence for the writer of the record-regrowth postmortem (scout file, 2026-11-24). -->

# Rules on an entry's form and length: the words and their history

Scope and method. Texts are read with `git show 9de4c69bc8:PATH`. Histories come from `git log -S`, `git log --follow` and `git diff` between neighbouring commits, bounded. Times are UTC, from the commit dates. Line numbers are the lines at `9de4c69bc8` unless a commit is named. Two numbers that I measured myself (they are not in `series.csv`) are marked "measured here": FACTS at four commits in item 8, and `9de4c69bc8` in item 1. The measure counts lines that start `- F-` or `- **F-`; characters are `len()` of the line.

No file other than this one was written.

## 0. Where the rule lived before 2026-10-13

- `.claude/skills/coordinator/references/record.md` first exists at `7b434aae52` (2026-10-13 19:22, "coordinator skill: written from scratch, a core and six parts"). The commit message: "The core (SKILL.md) holds the standing goal, the curator's role and decisions, ... Six parts hold the modes: delegating, running a batch, planning the road, keeping the record, rewriting a skill, and analysis. references/sources.md gives each rule its source."
- Before it, at `49d78c8cd` (2026-10-13 01:42, before the consolidation), the rules on a FACTS entry's length were these:
  - `explorations/protocol.md:153`: "source and its test, in a few lines with the detail left in the report it" (line breaks as in the file).
  - `explorations/coordinator/README.md:25`: "each fact in a few lines with its source and its test, the detail left in".
  - `.claude/skills/fortress-repo/references/records.md:37`: "A FACTS entry is the fact, its source and its test in a few lines, under a bold title. It points to the report that holds the detail. Cite it by its bold title, or by its opening words if it has no title."
  - `.claude/skills/coordinator/references/roles-and-records.md:9`: "`explorations/coordinator/FACTS.md`: what is established about the language, the library, the run-time and the container, each fact in a few lines with its source and its test, the detail left in the report it cites."
  - `explorations/coordinator/POSITIONS.md:130`: "The record's form: an optimized build and a debug build." It ends "A FACTS entry is the f..." (the same "few lines" rule; the first-draft file `record-rule-draft.md` Part 1 item 3 quotes it whole: "A FACTS entry is the fact, its source and its test in a few lines, pointing to the report or record that holds the detail, a rung's entry too, since rung entries written at full length, about 14 KB a landed batch, are most of FACTS' growth.").
- The "few lines" rule came in on 2026-10-02 at `6a9661477e` (10:54), "A FACTS entry in a few lines: Pavol's option 2, in the batch script's rung and gather prompts, the README, the protocol and POSITIONS (old text to history); boot note". Its message: "The rung worker's record.md carries the FACTS entry it earns as the fact, its source and its test in a few lines, the detail left in its REPORT.md; the gather folds it at that length. The existing rung entries are shortened by one worker before batch 8 launches." The batch script's rung prompt then said: "the FACTS.md entry this rung earns (the fact, its source and its test in a few lines, a few hundred bytes, under a bold title; the detail stays in your REPORT.md, which the entry cites, so do not restate the report)". Its gather step 2 said: "(a longer entry from record.md is cut to that before it is folded)". Both phrases were removed on 2026-10-08 22:20 at `e020159857` ("The climb batch workflow redesigned: the skeptic fixes what it finds, a judge only on a contested fix"); the redesigned rung prompt reads "The FACTS.md entry the rung earns (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md)" and the gather step "after the section's last entry: the fact, its source and its test in a few lines". Neither number (hundred bytes, 600) was in the batch script from then on.
- `record-rule-draft.md` Part 1 item 13 (a note quoted by the draft): `coordinator/process-engineering/facts-consolidation-check.md:175`, "Report every entry over 3,000 characters after the rewrite, with what in it a decision rests on." The draft's gloss: "**Pulls**: the only size bar on record is 3,000 characters." Part 1 item 9 quotes `coordinator/record-keeping-proposal.md:72`: "A FACTS entry at the length of the finding, since a worker reads it instead of the report." and `:78`: "A FACTS entry is as long as the finding". The draft lists these as contradictions of the "few lines" rule (its Part 1.6, "An entry's length", item 4).

## 1. What a FACTS entry must hold (`record.md`, "What an entry is")

### 1a. The text at `9de4c69bc8`

`record.md:18`:

> - A FACTS entry holds, after its number and a bold title that states the fact: what is established now, and under which conditions; what it means for the work, such as what it blocks or which row or decision it bears on; its evidence: the test that gates it, or its source, and whether it was observed, read in the code or inferred; the decision it builds, by number and subject; and the report section that holds the detail.

`record.md:31`:

> - Keep an entry near 600 characters. This is a check, not a cap, and no reason to split: an entry may pass it if a question below keeps a sentence.

`record.md:32`: "- Write halfway to ASD-STE100."

`record.md:34-41` (the six questions):

> Ask of each sentence, and act on the answer:
> 1. Would the reader do otherwise without it? Keep it.
> 2. Would the reader misread another sentence without it? Keep it.
> 3. Does it tell how the fact came about: a date, a batch, a correction? Move it to the history.
> 4. Is it detail needed only while doing the work: a line number, a list of sites, a timing? Leave it in the report, and name the section.
> 5. Does another entry or a skill say it? Give that entry's number, or the skill's part.
> 6. Can a reader new to the project follow every word? Name the kind of each count.

Other bullets of the same section that bear on form (`record.md:16-30`), quoted in part:

- Line 16: "An entry reads on its own. A reader who knows the language, or can look it up in the `fortress-repo` skill, can tell what it says without the conversation or the batch behind it. The entry lets a worker or you act right without opening the report, and says when the report is needed. Its number is permanent and never reused. Its title and text are rewritten freely, since the number is the key."
- Line 23: "An entry states the present, or what holds for all time. It holds no plan and no status: ..."
- Line 25: "A pointer that stays in an entry carries a few words on what it holds, such as a ledger row's subject. A bare list of numbers goes to the history."
- Line 28: "A count that each landing changes has one entry with its current value, what it counts, the kinds with the largest share, and how to read a move. Other entries give its number. A count from one measurement says so."
- Line 29: "An entry holds one claim that can be kept up to date on its own, with its conditions, exceptions and evidence. Split an entry when its claims answer different questions and change apart. Before you split, look for an entry that already holds the claim, and move the text there. After a split, grep the record for the old number, and repoint each pointer that meant the claim that moved."
- Line 30: "If several entries together establish a conclusion that workers keep working out again, make it a sentence of the entry that owns its subject, with pointers to the entries it rests on. The pass updates it when one of them changes. ..."

`record.md:43-57` (the six checks and four dispositions):

> In a consolidation of FACTS, judge each entry by six checks. Mark each one pass, fail, or unresolved where evidence is still needed, and quote the passage that fails:
> - Scope: the title and the text agree on the path, the conditions and the limits, and claim no more than the evidence shows.
> - Present meaning: a reader can tell the current property, or a measurement bounded to its day, without rebuilding a batch's work.
> - Evidence: the cited support exists and holds the claim, and the entry states the kind of its evidence and its uncertainty.
> - Comprehension: a reader can restate the fact and what it means. Subjects, referents and terms are plain.
> - Ownership: the entry has one subject. No repair history or copied count hides it.
> - Consistency: entries on the same subject agree, or state their different scopes or their conflict.
>
> An entry that fails scope, evidence or consistency is not kept as it stands: reword it to what its support holds, or investigate where the support is unresolved. A fail of comprehension or ownership asks for a rewrite. Give no score: good prose does not make up for an unsupported claim. Then give the entry one disposition:
> - keep: every check passes;
> - reword: the meaning holds, but the wording or the stated scope fails;
> - reorganize: move detail out, merge the entry into its owner, or split it;
> - investigate: the support or the consistency is unresolved. Settle that narrow question before any new wording, and do not delete the fact meanwhile.

`record.md:59`: "Before you write or check the first entries of a consolidation, read the five worked examples: `facts-extract.sh 'doc:explorations/coordinator/process-engineering/record-rule-draft.md#Worked examples'`, a large read."

Size of the file the entries live in, at `9de4c69bc8` (measured here): 339 entries, 427,378 characters, median entry 1,198, 299 over 600, 215 over 1,000, longest 4,330. `series.csv` and the task note give 428K, 339 entries, 299 over 600 (agrees).

### 1b. History, part by part

The commits that touched `record.md`, 2026-10-13 on (16 commits by `--follow`; none earlier): `7b434aae52` 10-13 19:22; `f6bc1aa753` 10-13 19:46; `cb9213556b` 10-14 11:43; `c74f01d5a1` 10-14 11:52; `b6f5268e1d` 10-22 09:32; `ef6a0a0263` 10-22 12:22; `6becc28f95` 10-22 14:26; `caaf4f13f3` 10-22 22:20; `c24fcf50ac` 10-22 23:47; `d70d784457` 10-23 00:14; `5427e7208f` 10-23 00:37; `9311b09678` 11-01 23:42; `5114bfeceb` 11-02 22:03; `f898915bce` 11-05 11:15; `8fa68948fb` 11-05 11:23; `e7afa05020` 11-24 00:13.

**The FACTS bullet (line 18).**
- `7b434aae52` (10-13 19:22), the first words: "A FACTS entry holds, after its number and a bold title that states the fact: the fact as it stands now; what it means for the work, such as what it blocks or which row or decision it bears on; the test that gates it, or its source; the decision it builds, by number; and the report section that holds the detail."
- `b6f5268e1d` (10-22 09:32) changed it to: "what is established now, and under which conditions; ... its evidence: the test that gates it, or its source, and whether it was observed, read in the code or inferred; the decision it builds, by number; ..." The commit message: "Coordinator skill: the record's consolidation tools, entries that read on their own, the FACTS checks, the orientation update after a landing, every writer on Opus, writer streams; the writer's and cold reader's briefs". `sources.md:148` gives the reason: "`record.md`, "What an entry is", an entry that reads on its own, and a POSITIONS entry's place of application and requirement: the curator in chat, 2026-10-22, 05:28 UTC (`explorations/coordinator/HELD.md`, its line of that time). The standard: `explorations/reviews/revival-record-synthesis.md`, "P45: fidelity and comprehensibility are separate checks". A FACTS entry's conditions and kind of evidence: the same review, "Entry schema: meaning before format", put in this part by the coordinator's task of 2026-10-22."
- `6becc28f95` (10-22 14:26) added "and subject" after "by number" ("the decision it builds, by number and subject"). `sources.md:173`, item M1: "the pointer's example with its subject".
- No later change to line 18 (the hash of the line is the same from `6becc28f95` to `9de4c69bc8`).
- Neighbouring bullets that were added: "A pointer that stays ...", "A handle that only made sense in a past conversation ... goes to the history" (`b6f5268e1d`; `sources.md:149`: "the curator's page comments of 2026-10-22, 05:49 and 05:51 UTC ... 04:53 and 05:28 UTC"); one claim per entry and a conclusion stated once (`cb9213556b` 10-14 11:43, `sources.md:104`: "from `explorations/reviews/astra-record-keeping-review.md`, section 5; a conclusion stated once in the entry that owns it, section 6 ... The review was forwarded by the curator on 2026-10-14"); no plan or status and "row N" (`ef6a0a0263` 10-22 12:22; `sources.md:160`: "the curator's rule in chat, 2026-10-22, that FACTS and POSITIONS state the present or what holds for all time, that PLAN and the review queue point to the entries and not back, and that "row N" means a row of the gap ledger").

**The length bullet (line 31).**
- First text, `7b434aae52` (10-13 19:22, line 22): "Keep an entry near 600 characters. This is a check, not a cap: an entry may pass it if a question below keeps a sentence. Name that reason in the pass's report." The same file's first "Writing an entry" bullet said: "`record.py check --base <commit>` shows that nothing was lost since that commit. Run it before every commit. It also reports each entry over 600 characters."
- `f6bc1aa753` (10-13 19:46, "the fixes of the kept-list check, the cold read and the trial boot"): "Name that reason in the pass's report." removed from the bullet. "A check, not a cap: an entry may pass it ..." stays.
- `cb9213556b` (10-14 11:43): "This is a check, not a cap, and no reason to split: an entry may pass it if a question below keeps a sentence." This is the form at `9de4c69bc8`. The commit message does not name this change: "coordinator skill: the curator's held feedback of 2026-10-13 and 14, and the record-keeping review ... record.md takes the scope check, one claim per entry, and a conclusion stated once." In the same commit the one-claim bullet was added ("Split an entry when its claims answer different questions and change apart"). `sources.md` has no line that names "no reason to split".
- Was the length ever stated as a cap or a limit in `record.md`? No. Every version from `7b434aae52` says "near 600 characters" and "a check, not a cap". The words "a check, not a cap" are in the first version of the file (10-13 19:22). In the draft they come earlier: `record-rule-draft.md` (see 1c).
- Where `sources.md` names the origin: line 59, "The form of an entry, the questions, the size and the curator's words: `record-rule-draft.md`, Part 2, "What an entry is" and items 5 to 32. The pass: items 43 to 52. Who reads which stage: items 33 to 38." Line 60: "The tool, the reads and the checks: `record.py`'s header; `facts-extract.sh --help`; `record-store-review.md`, sections 2 and 3, which answer HELD 13 to 19 (2026-10-13 16:46 to 17:08)." `sources.md` has no line that mentions 600 or "check, not a cap" by name.

**The six questions.** Present in the first version `7b434aae52` (lines 25-31 there) with the same six sentences as at `9de4c69bc8`. No change in the window (the lines are identical in the diffs I read; the first-version list was copied from the draft, see 1c).

**The six checks and four dispositions.**
- First appear in `b6f5268e1d` (10-22 09:32): "Judge a FACTS entry by six checks. Mark each one pass, fail or unresolved, and quote the passage that fails:" with the six names and "A fail of scope, evidence or consistency blocks the entry. A fail of comprehension or ownership asks for a rewrite. Give no score: good prose does not make up for an unsupported claim. Then give the entry one disposition:" followed by keep, reword, reorganize, investigate ("investigate: the support or the consistency is unresolved. Settle that narrow question before any new wording."). A line followed: "The detail of each check is in `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric"." The commit also added the "consolidation tools" section. `sources.md:151`: "`record.md`, the six checks of a FACTS entry and its four dispositions: `revival-record-synthesis.md`, "Per-entry assessment rubric", put in this part by the coordinator's task of 2026-10-22."
- `6becc28f95` (10-22 14:26, "Skills: fix the cold read's flags on the parts changed on 2026-10-22"): the lead-in became "In a consolidation of FACTS, judge each entry by six checks. Mark each one pass, fail, or unresolved where evidence is still needed, ..."; Evidence became "the cited support exists and holds the claim, and the entry states the kind of its evidence and its uncertainty"; "blocks the entry" became "is not kept as it stands: reword it to what its support holds, or investigate where the support is unresolved"; "investigate" gained "and do not delete the fact meanwhile"; the pointer to the review's rubric was removed. `sources.md:173` names the reasons as flags M3 (the six checks applied in a consolidation of FACTS), M4 and M5 ("the dispositions of a failing entry, "unresolved", the evidence's kind and uncertainty, and "do not delete the fact", from `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", whose pointer is removed").
- No change to the six checks after `6becc28f95`.
- The checks are applied "in a consolidation of FACTS". `record.md:108` ("The consolidation tools", as `f898915bce` 11-05 worded it): the clarity workflow "For FACTS, it first judges every entry by the six checks of "What an entry is", and rewrites only those marked reword or reorganize." The record-landing workflow's briefs do not name the six checks (see item 6).

**Worked examples pointer.** In the first version (`7b434aae52`), unchanged to `9de4c69bc8`.

### 1c. Where the 600 and "check, not a cap" came from (the draft)

`explorations/coordinator/process-engineering/record-rule-draft.md` (first commit `7bb5114b26`, 2026-10-13 09:25; the last, `8cde9406c1`, 17:44). Its "The size" paragraph (lines 144):

> **The size.** About 240 entries stay, and the goal of about 145K characters for both files allows about 600 each. So 600 is a check, not a cap. An entry may pass it when the questions keep a sentence that needs the room. Its writer names, in the chunk's report, the decision or the misreading that the sentence prevents, and shorter entries pay for it: a chunk's total stays under 600 characters times its entries. The record test checks the result: no worse than 27 of 30.

Item 20 (line 286):

> 20. It is a few lines (on record): about 600 characters. (new) The number comes from the goal. About 240 entries stay after the moves to the skills (`coordinator-skill-outline.md`, section 3.1), and about 145K characters for both files allows about 600 each. With every staying entry cut to at most 600 characters and the shorter ones unchanged, the two files would come to about 131K; at most 700, about 148K; at most 1,000, about 191K. So 1,000, which he asked about at 15:38, would miss the goal. (new: measured on the files at `0f1d0d2ed`, with the staying entries of the outline's section 2.7) The measure is a check, not a cap. An entry over it names, in the report of the pass that wrote it, the decision or the misreading that needs the extra, and shorter entries of its chunk pay for it: a chunk's total stays under 600 characters times its entries. FACTS 58 is 707 characters in Part 3 and 811 in its worked example, for decision D. (new; his comment of 15:38: "it needs to have a reason to be that large, because we want that compressed benefits") The boot still reads the whole record, as he set on 2026-09-27. (on record, `coordinator/postmortem-2026-09-27-record-keeping.md:15`) The measure is there because long entries cost decisions too: in the test, the old reader missed row 680 inside the 6.6K distance entry, and two long texts carried a false sentence each, ...

Other words of the draft on length:
- Line 96 (Part 2 summary): "4. The length: item 20. A few lines, with about 600 characters as a check, not a target."
- Item 30 (line 299, for POSITIONS): "The same measure applies: under about 600 characters, as a check. (new)"
- Item 50 (line 328, the pass's report): "It reports each entry's size, each chunk's total against 600 characters times its entries, and each entry still over the measure with the decision or the misreading that needs it. (new)"
- Line 5 (the trial): "If every entry over 600 characters came down to 600 and the rest stayed, FACTS would come to 113K and POSITIONS to 60K." Line 547: "FACTS is 257,739 characters in 195 entries, median 1,149; 161 entries are over 600."
- The draft's marks: "(new)" means the sentence was the draft's; the curator's words are marked "his words". The draft marks the 600 as "(new)" and the "check, not a cap" as "(new)", and quotes the curator's 15:38 comment ("it needs to have a reason to be that large, because we want that compressed benefits"). Line 277, item 11: "A FACTS entry states the current status quo and what it means for the work ... (his words, 09:02: "my optimized build is about capturing the current status quo"; ...)".

What of the draft reached `record.md`: the 600 and "a check, not a cap", and the questions "an entry may pass it if a question below keeps a sentence" reached it. The chunk-total clause ("shorter entries pay for it: a chunk's total stays under 600 characters times its entries") and the report of each chunk's total (item 50) are not in `record.md` at any commit (grep of all 16 versions for "times its entries" and "chunk's total": no hit; I searched with `git show c:record.md | grep`). Also the record test's bar ("no worse than 27 of 30") is not in `record.md`.

## 2. The pass (`record.md`, "The pass")

### 2a. The text at `9de4c69bc8` (lines 71-86)

> ## The pass
>
> Run the pass when a worker finishes, and before the next boot or batch reads FACTS. In a batch, the commit stage runs it, with this part quoted in its prompt. After a lone worker, you run it.
>
> The pass owns each entry's final wording. A rung writes its findings as draft entries: the claim, its conditions, its evidence and what it means.
>
> 1. Write each new fact as an entry, or rewrite in place the entry that it changes. A rung writes its entries in a file `record.md` in its worktree, and the gather folds them in with `record.py apply`.
> 2. Give each change its provenance: the report section, the commit, and why.
> 3. Check each entry against its source, with bounded `grep`s: [three sub-bullets: the cited report section; the source's scope; "If a behaviour changed, grep FACTS for it, linked or not. Each entry that states it is updated, or says how it differs."]
> 4. Cut any plan or status from each entry (above). If the cut text named a PLAN item or a review-queue item, check that the item names the entry.
> 5. Report each entry over 600 characters, with the question that keeps its extra sentence.
>
> Run the same pass on POSITIONS at each landing, and when the curator replaces a decision.

Also line 66 (reading and writing): "Before every commit, run `record.py check --base <the commit before your edits>`. It shows that nothing was lost, and reports each entry over 600 characters."

Who runs the pass, by the text: "In a batch, the commit stage runs it, with this part quoted in its prompt. After a lone worker, you run it." ("you" is the coordinating session.) To whom the report of step 5 goes: not stated. The text says "Report each entry over 600 characters" and names no reader or file.

### 2b. History

- The sentence on who runs it ("Run the pass when a worker finishes, and before the next boot or batch reads FACTS. In a batch, the commit stage runs it, with this part quoted in its prompt. After a lone worker, you run it.") is identical in all 16 versions, `7b434aae52` to `e7afa05020` (I printed its first three lines at ten of the commits). The draft's item 44 is its source: "The pass runs when a worker finishes, and before the next boot or batch reads FACTS. (his words: "there should be some post processing. Pass by the coordinator", and 11:40; that it runs before each batch is on record) In a batch, the commit stage runs it for the coordinator, with this part quoted in its prompt. After a lone worker, the coordinator runs it. (new)" `sources.md:59`: "The pass: items 43 to 52."
- Step 5 history. `7b434aae52` (10-13 19:22) step 4: "Run `record.py check --base`, and report each entry's size and each one over 600 characters with its reason." `f6bc1aa753` (10-13 19:46) step 4: "Report each entry over 600 characters, with the question that keeps its extra sentence." `ef6a0a0263` (10-22 12:22) made it step 5, after the new step 4 ("Cut any plan or status from each entry"). No change after. The report's reader: "not stated" in every version.
- In the first version the pass's step 3 was "Check with one bounded `grep` that the cited report section holds what the entry left out." `cb9213556b` (10-14) made it the three-part check; `b6f5268e1d` and later added "(a dotted method call against a top-level call)" and "grep FACTS for it, linked or not". `sources.md:104`: "'The pass', step 3: the scope check, the related entries and the test question, section 4" of `astra-record-keeping-review.md`.
- "The pass owns each entry's final wording. A rung reports complete findings: ..." came at `b6f5268e1d` (`sources.md:152`: `revival-record-synthesis.md`, "Ownership and minimal instruction changes"). `6becc28f95` changed "reports complete findings ... It writes no finished prose" to "writes its findings as draft entries" (`sources.md:173`, M6: "a rung's draft entries").
- The consolidation section changed the way the pass is run in a consolidation, with the curator involved: `5114bfeceb` (11-02 22:03) replaced "Run it on FACTS before each batch launches, since the batch's workers read it." with "After a batch lands, the record-landing workflow consolidates its entries (`references/batch.md`, "The landing")." (`sources.md:235`: "the record-landing workflow after the review, in place of the check of the fold and the moves of PLAN's lines by hand ...: the same note, rule 17, with rules 18, 19 and 21, redrafted from his page comments of 06:39 and 06:42; accepted 21:20".) `f898915bce` (11-05 11:15) added the pilot bullet ("run a pilot of three or four entries first ... The record-landing workflow takes no pilot, since it lands with no step of yours."), and `e7afa05020` (11-24 00:13) reworded it: "The pilot shows the curator the form: the length, the register, and what belongs in the history. The other checks, the pass's step 3, the tools' cold readers and the quiz, test only the meaning." `sources.md:267`: "a pilot of three or four entries that the curator reads, with none for the record-landing workflow: lesson 6 of the same report, and the curator's word in chat, 2026-10-28, 21:12 UTC." `sources.md:276`: "`record.md`: the pilot's reason as the form it shows, its rest on the curator's go".
- The text of "A consolidation" at `9de4c69bc8` (lines 88-98) has: "In a consolidation, by hand or by the clarity or mining workflow, run a pilot ..."; "Split each section into chunks of 20 to 32 entries."; "For each chunk, a Sonnet scout gathers each entry's report sections, its commits and the curator's dated words."; "An Opus writer reads this part, the chunk and the scout's file, and writes an apply file. It runs `apply` and `check --base` in its own worktree."; "You apply each file on `main`, run `check --base`, commit and push."; "Have Opus workers check each new entry by the pass's step 3. Run no Fable review of the entries."; "Have a fresh Opus worker answer a small quiz of decisions from the new entries ...".

## 3. The workers' rules (`fortress-repo/references/records.md`)

### 3a. The text at `9de4c69bc8`

Line 40:

> Each entry is one line that starts with its permanent number: `F-87` in FACTS, `P-48` in POSITIONS. A FACTS entry is the fact as it stands now, what it means for the work, and the test that fails if the fact stops holding, under a bold title. If no test checks the fact, the entry gives the command and the output that show it. It points to the report section that holds the detail. Cite an entry by its number. If the reader must know what the entry says without printing it, add the first words of its title in quotes: F-87, "The first words ...".

Line 38: "POSITIONS and FACTS describe the present: no dates, no names of who found what, no "corrected" or "superseded" notes. The history of each entry is in `POSITIONS-history.md` and `FACTS-history.md`, beside them. When your work needs the detail of an entry, print the report section that it cites (`$T 'doc:PATH#HEADING'`, below). Read its history only when the tree disagrees with the entry."

Lines 81-82 ("Writing to the record"):

> - Write FACTS and POSITIONS only with `explorations/coordinator/tools/record.py`, never by hand. `add` gives a new entry its number, and `set` rewrites an entry. The tool writes the entry to `FACTS.md` or `POSITIONS.md`, and its earlier text to the history file beside it. It commits nothing: commit both files in one commit. Its header gives its usage.
> - If your brief lets you write FACTS, add each fact as a new entry in the section of its topic, in the commit that establishes it. Put its detail in a section of your report: the file:line citations, the commands with their output, and the measured numbers. Point the entry to that section, by your report's file and the section's heading. If your report is only your final message, hand the fact over instead. Spend no effort on the entry's wording: it is rewritten to the record's form after your work.

Lines 83-88: "If your brief does not let you write FACTS, hand each fact over in the "For FACTS" item of your report, with: the fact as it stands now, in one sentence; what it means for the work; the number that a decision rests on ...; the test that fails if the fact stops holding, or the command and the output that show it; the section of your report that holds the detail." The file states no number of characters (grep for "600" returns nothing in this file).

### 3b. History

- Before the window of the new rule: `records.md:37` at `49d78c8cd` (and `ca492993f7`, 2026-10-07 04:15, "fortress-repo: building and exploring; each part restructured", where the sentence "A FACTS entry is the fact, its source and its test in a few lines, under a bold title. It points to the report that holds the detail." first appears by `git log -S`).
- `4c11b10c3e` (10-13 19:52, "fortress-repo: the record numbered and written with record.py, the third-party port, model tiers, the gate's masks"): "An entry is one line under a permanent number: `F-87` in FACTS, `P-48` in POSITIONS. A FACTS entry is the fact as it stands now, what it means for the work, and the test that gates it, under a bold title. It points to the report section that holds the detail. Cite an entry by its number." Same commit, the bullets: "Add a fact to FACTS in the commit that establishes it, as a new entry in the section of its topic. Put the lines, the sites and the figures in your report, and point the entry to its section. The coordinator rewrites the entry to the record's form when your work finishes." and "If your brief does not let you write FACTS, hand over in a section of your report: each fact as it stands now, in a sentence; what it means for the work; the one number ... ; the test that gates it; and the section of your report that holds the detail." The draft's item 42 and 43 are the source ("The coordinator writes each entry to this form ...").
- `8ca0d7e615` (10-13 20:12, "Skills: the second cold read's fixes, and P-135, F-210 and F-219 moved into their homes"; the message about this file: "records.md defines a fact, writes FACTS by the brief with record.py's numbering and history, hands facts over as a list ..."): "the test that gates it" became "the test that fails if the fact stops holding"; "If no test checks the fact, the entry gives the command and the output that show it." was added; "The coordinator rewrites the entry to the record's form when your work finishes." was replaced by "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." (`git log -S"Spend no effort on the entry's wording"` finds only this commit; `-S"Put its detail in a section of your report"` the same.) "Put its detail in a section of your report: the file:line citations, the commands with their output, and the measured numbers." was added.
- No later commit changed those sentences (`git log -S` on each, only these two commits). Later commits to the file (`ef6a0a0263`, `6becc28f95`, `f6f7de70c3`, `2d5820c89e`, `36ce6e303c`, `c0df8faa1e`, `6415622f91`, `623d6912dd`) concern the ledger tool, the landing check and the orientation update.
- `sources.md` for these rules: the "Spend no effort" sentence is not named in the `sources.md` lines that I searched (`grep -n "records.md"` on the coordinator `sources.md` finds only the `record.md` part). It is quoted by the record-landing briefs (item 6) and by `record-landing-workflow.md:58`.

## 4. `record.py` (`explorations/coordinator/tools/record.py`)

Commits to the file in the window: `a74f5a2b73` (10-13 17:58, "record.py, the record's one writer, and the numbering script, with their tests and facts-extract's number queries") and `a0a30ffe35` (10-22 02:55, "record.py: note N, a noted block that adds to an entry's history without changing the entry ..."). The size code is the same in both.

Text at `9de4c69bc8` (1,356 lines):

- Header, lines 97-100: "It reports, without failing: the entries over 600 characters, the entries without a bold title, and the `--from` paths and the report sections an entry cites (`PATH`, "HEADING") that do not resolve."
- Line 126: `SIZE = 600            # the record rule's measure of an entry; reported, never refused`
- `check()`, lines 1198-1201:
  ```
  if len(e.line) > SIZE:
      over.append('%s %d' % (e.key, len(e.line)))
  ...
  if over:
      reports.append((name, 'size', '%d entries over %d characters: %s' % (len(over), SIZE, ', '.join(over))))
  ```
  It appends to `reports`, not to `fails`.
- `cmd_check()`, lines 1288-1303: failures print as `where: rule: detail`; then "if reports and not a.summary:" it prints `reported, not failing:` and one indented line per report; the last line is `record.py check: FACTS.md N entries, POSITIONS.md N entries; K failures; reported: size 2` (the count of report kinds); `return 1 if fails else 0`. So an entry over 600 characters is printed, listed with its length, and the exit code is 0. With `--summary` the list is not printed and only the final line (`reported: size 2`) remains.
- `SIZE` is used nowhere else: `grep -n SIZE` returns lines 126, 1198 and 1201 only. `cmd_add` (982), `cmd_set` (1000), `cmd_merge` (1017) and `cmd_apply` (1170) and `cmd_note` (1029) hold no length test; the only length-like test in the write path is "an entry is one line; this text has %d" (line 716), which tests lines, not characters.
- Example of the output in a landing: `climb-batch-35b/record-landing/mech-final.md` line 54: "FACTS.md: size: 295 entries over 600 characters: F-7 818, F-9 705, ..." and line 58: "record.py check: FACTS.md 336 entries, POSITIONS.md 106 entries; 0 failures; reported: from 2, size 2".
- The origin of "reported, never refused": `record-store-design.md` / `record-store-review.md` are the design notes; I did not read them for this phrase (not searched).

## 5. The batch script (`climb-batch-workflow.js`, `climb-batch-workflow.md`)

At `9de4c69bc8` the script is 2,175 lines and the manual 347. `git log --since=2026-09-25` lists 118 commits to the script. The sentences below are all the sentences I found that concern FACTS entries, their length, the pass or `record.py check`. I searched the script for `FACTS|record\.md|record\.py|600|the pass|record-landing|entries|entry|draft|characters`. The script contains no "600" for an entry, no "the pass" and no quotation of `record.md`'s "The pass".

### 5a. What a rung's worker is told about its draft entries (line 623, `rungRole`, "What you write")

> - record.md: the record lines the gather folds, each a complete finding: the claim, the conditions under which it holds, its evidence (the file:line, the command with its output, the test) and what it means for the work. Completeness is yours; the record pass owns the final wording. The FACTS.md entry the rung earns (the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md). Each change to an existing ledger row: ...

and line 628: "Do not edit explorations/coordinator/FACTS.md, the gap ledger, PLAN.md, POSITIONS.md, INDEX.md, the handover, the tools under ' + TOOLS + '/, or anything under .claude/: the gather folds your record.md into them, since every rung would conflict on them."

Line 748 (skeptic): "A correction: a sentence of REPORT.md or record.md, a citation, a provenance line, a FACTS entry, ..." The skeptic reads `record.md` as part of the report; the manual's line 137 lists "`record.md` true as written" among the skeptic's checks.

The worker is not told 600, "near 600", `record.py check`, `record.md` of the coordinator skill, or "The pass". It is told "a few lines".

### 5b. The gather (line 1045, step 2 of `gatherRole`)

> 2. Its record, record.md, folded. The FACTS.md entry under the section of its area (the file's README gives the rule), after the section's last entry: the fact, its source and its test in a few lines. Each change to an existing ledger row: ...

The gather's prompt names no `record.py` command for the FACTS entry (the only `record.py` in the script is in the commit stage, 5c). The review stage (line 1130, step 3): "The folded record as a whole: every FACTS line true as written, sourced and checkable; every ledger note, rewrite and new row in place (... landing-check ...); ..." No length check.

### 5c. The commit stage (line 1622, step 1 of `commitRole`)

> Write the landed figures into explorations/coordinator/FACTS.md, numbers only, by python3 ' + TOOLS + '/record.py set N FILE (its header gives the form), FILE the entry's whole new line under ' + LOG_DIR + '/, one call per entry, with --by "climb batch ' + BATCH + ' commit stage" and a --note naming the lines read; the tool writes FACTS-history.md beside it, and python3 ' + TOOLS + '/record.py check --base <the commit before your edits> prints 0 failures before the commit. In F-53, ... In F-240, ...

The commit stage's prompt asks for "0 failures". It does not mention the entries over 600 characters, and it does not quote the pass.

### 5d. The manual (`climb-batch-workflow.md`)

- Line 107: "`record.md` carries, as complete findings, the FACTS entry the rung earns, its ledger notes, the whole new line of each row whose claim its change alters, its new rows, the handover line, and a "Revival change" section, ..."
- Line 110: "The worker does not edit FACTS, the ledger, PLAN, POSITIONS, INDEX, the handover, the tools or `.claude/`: the gather folds `record.md` into them, since every rung would conflict there."
- Line 178: "**The record folded.** The FACTS entry under its area. A ledger note that adds a fact through `ledger.py note`. ..."
- Line 196: "3. The folded record: FACTS lines, `ledger.py landing-check BASE` with no finding, ..."
- Line 273 (commit stage): "It writes the landed figures into FACTS, numbers only, by `record.py set`, one call per entry, `FACTS-history.md` in the same commit: F-53's distance and count, from the two tables, and F-240's two stages' seconds."
- Line 53: "The record's "After the landing" has its forks recorded in FACTS, and only its consequential ones filed in the review queue ..."

### 5e. History in the window

- `6a9661477e` (10-02 10:54): "a few lines, a few hundred bytes" in the rung prompt, and "(a longer entry from record.md is cut to that before it is folded)" in the gather prompt (the commit message: "the gather folds it at that length"). See item 0.
- `e020159857` (10-08 22:20) removed "a few hundred bytes" and "cut to that"; the manual was rewritten to match at `ff4068cd4d` (10-08 22:37, "The batch manual rewritten to the redesigned practice"): "`record.md` carries the FACTS entry the rung earns, its ledger notes and new rows, the handover line, and its entry for the skill's part ...".
- `c9b5beb36b` (10-22 12:16, "Batch workflow: the gather and the review run ledger.py landing-check against the batch's base and fail on any finding; a row's changed claim goes through rewrite; record.md holds complete findings"): added "each a complete finding: the claim, the conditions ... Completeness is yours; the record pass owns the final wording." Its message: "A rung's record.md gives a row's whole new line where its change alters ..." (the commit's stated reason concerns the ledger's rows; the "complete findings" wording came with `revival-record-synthesis.md` "Ownership and minimal instruction changes", the source that `sources.md:152` names for `record.md`.) The manual took it at `ef6a0a0263` (10-22 12:22: `-S"as complete findings"`).
- `40302280cd` (10-30 09:20, "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resumed rung worker is told its earlier launch's head"): added `record.py set N FILE` and `record.py check --base`. The message: "The commit stage's step 1 named FACTS entries by two titles ... It named no tool, though record.py is the only writer of FACTS; climb batch 23's commit stage used record.py set on its own (df71bc585). It left F-240 ... to the coordinator, and F-240 stood false at five landings running ... Step 1 now writes F-53 and F-240 by number, through record.py set, FACTS-history.md in the same commit, record.py check --base before it."
- No commit in the window changed the rung's or the gather's FACTS sentences after `c9b5beb36b` (`git log -S"its source and its test in a few lines"` returns `6a9661477e` only for adds; the sentences at `9de4c69bc8` are those of `e020159857`/`c9b5beb36b`).
- The batch script does not call the record-landing workflow. Its text mentions it twice, as "for the record-landing" in a rung's manifest (lines 283 and 323: "P-174's sentence on row 1124, quoted, for the record-landing."). The coordinator skill's `batch.md` "The landing" runs the workflow (`record.md:90`).

## 6. The record-landing workflow (`explorations/coordinator/tools/record-landing/`)

First commit `f44cf4ec28` (2026-11-02 00:58, "The record-landing workflow, its first version ..."; "Built as the design note says in its section 5, "The smallest first version worth building" (explorations/coordinator/process-engineering/record-landing-workflow.md, 5384a4f35), with the curator's eight defaults (his "yes to all eight" of 2026-11-02, the held list)."). Second: `575d555945` (11-02 02:57, "the comparison's eight fixes in its briefs and scripts"). Runs from climb batch 25 on (task note).

### 6a. Sentences on length, "owes", growth, history, report, and what the judge holds

`README.md` (82 lines at `9de4c69bc8`):
- Line 24: "- `lengths.py` informs: each changed entry's length, and each entry already over 600 that grew, which the judge holds unless the owed clause alone explains the growth."
- Line 20: the mechanical checks include "`record.py check --base`, `ledger.py check`, ... and `lengths.py`."
- Line 5 (the first line of the file's body): "`record-landing.js` does the record's work after a landing, which the coordinator did by hand through a record writer and a routing worker until climb batch 24."
- Line 7 (Sort): "writes `owed.md`, one line per change with its number, its home, its kind, its weight, its ground and its writer".
- The README has no sentence on the pass, "past 600" as a rule, or on growth other than line 24.

`sort.md` (53 lines):
- Line 11: "After a landing the record owes work. The landing made some of its sentences false. The rungs wrote their entries as drafts, as the worker skill tells them: "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." PLAN holds lines that the batch built or answered. ..."
- Line 15: "What does the record owe after this landing, change by change?"
- Line 31: "**kind**: the pass on an entry that the batch added or changed; made false; stale; past 600 characters; built; answered; a new item for the curator; a new note."
- Line 41: "Each entry that the batch added or changed gets one change of kind "the pass", whatever else it gets. The rungs wrote it as a draft."

`entries.md` (54 lines):
- Line 11: "Its rungs wrote their entries as drafts, as the worker skill tells them: "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." The landing also made some sentences of the record false. No stage of the batch rewrites these."
- Line 15: "... so that a reader who knows the language, or can look its terms up in the `fortress-repo` skill, can act right without the batch behind it, and so that it says no more and no less than its ground."
- Line 20: "The rules of an entry: `.claude/skills/coordinator/references/record.md`, its sections "What an entry is" and "The pass". Read both. They are the one home of these rules."
- Lines 34-38 ("Bounds, new evidence and length"):
  > - An entry keeps the commit or the code state that bounds a one-time measurement, as in "measured once on `2bff2fe23`", and its sentence on what the fact blocks or means for the work. Only how the fact came about goes to the history: the date, the batch or the run that found it, a correction.
  > - A change that extends a claim to the landing's batch, as in "from climb batch 22's gate to climb batch 24's", brings that batch's figures into the sentence that the claim rests on, and their source into the entry's Detail. A claim whose figures stop at an earlier batch says more than its evidence.
  > - An entry already past 600 characters grows only by the clause that its change owes. Before you add the clause, move other detail out: to the report that the entry names (question 4 of "What an entry is"), or to a pointer to the `fortress-repo` skill's part that already says it (question 5). Detail that belongs in the skill, and that the skill does not hold, goes to your report, for the skill writer. The judge holds an entry past 600 that grows by more.
- Line 44: "How the fact came about goes in the note, not in the entry: its dates, the batch or the run that found it, a correction."
- Line 48 (`entries-report.md`): "for an entry over 600 characters, the question of "What an entry is" that keeps each sentence past the 600, and for one that grew, what you moved out first".

`check.md` (32 lines):
- Line 27: "**form**: no plan or status in an entry. No account of how the fact came about: the date, the batch or the run that found it, and a correction go to its history. The commit or the code state that bounds a one-time measurement stays in the entry, ... A change that drops either fails form. Each pointer has a few words on what it holds. A sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`, and an entry already past 600 grows only by the clause that its change owes."
- Line 26 (fidelity): "Read the entry's Detail too: a claim that a change extends to the landing's batch needs that batch's figures in the entry and their source in its Detail, or it says more than its evidence."
- Line 20: the checker reads `record.md`, "What an entry is" and "The pass". The checker's four classes are coverage, fidelity, form and routing; the six checks of `record.md` are not named.

`judge.md` (60 lines):
- Line 24: "Apply a change when its final text keeps the meaning of its ground, the checks that bear on it pass, and what the cold reader still raises changes no action. Hold it when it says more or less than its ground, drops a condition, or fails a check, and nothing in the folder settles it. Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth: `lengths.py` in `mech-2.md` names each such entry, and `entries-report.md` says what the writer moved out first. Where `check.md` named a failure and the fix round claims to settle it, read the sentence and its source yourself. You do not rewrite a text: you judge it as it stands."
- Line 28: "A held entry keeps its text: its block stays out of `final.apply`."
- The judge's brief has no sentence on an entry newly written over 600 characters, or on an entry already over 600 that does not grow.
- Line 40, `diff.md`: "Keep it within 10,000 characters. A change that owed nothing, or an entry kept as it stood, gets no line: `owed.md` holds it." The `diff.md` template's "Checks" line: "one line for each check of `mech-final.md`."

`record-landing.js` (357 lines): grep of the script for `600|grew|growth|owe|lengths|history` finds no sentence on an entry's length. The script launches the stages and passes the briefs.

`lengths.py` (46 lines at `9de4c69bc8`). What it measures: for each FACTS or POSITIONS entry whose line in the worktree differs from its line at the base commit `AT`, its characters at AT and now, the difference, and a mark. Thresholds: `SIZE = 600`; the mark is `, grew past 600` when `b > SIZE and n > b` (the entry was over 600 at AT and is longer now), `, over 600` when the new length is over 600, else none. What it prints: `lengths: N entries changed`, one line per entry (`- F-N: B to N characters (+d), mark`), and a last line `lengths: K already over 600 grew: F-N (+d), ...`. Exit code: 0 always ("Information only; exit 0."). Who reads it: `checks.sh` runs it (`step "lengths.py" 0 ...`), copies the last line's list into the summary of `mech-N.md` (`lengths.py: already over 600, and grew: ...`), and the judge reads `mech-2.md`.

An entry that was under 600 at AT and is over 600 now is marked ", over 600" in the rows and is not named in the last line. An entry already over 600 that shrank or stayed the same is marked ", over 600" and not named as grown. An entry new to the record has `b = 0` and is marked ", over 600" if over.

Observed outputs (from the run folders, not from the texts):
- Climb batch 35b: `mech-final.md:19`: "lengths.py: already over 600, and grew: F-26 (+88), F-253 (+200), F-403 (+489), F-406 (+186), P-174 (+74)"; `diff.md:86`: "lengths.py: pass; 5 over 600 grew, each by its owed clause: F-26 +88, F-253 +200, F-403 +489, F-406 +186, P-174 +74; F-375 -101." `diff.md:46`: "C8, F-404: its owed change is a cut (-115 ...), but the fix round's glosses ... grow it 1,284 to 1,334, past 600, and no clause that ..." (held).
- Climb batch 35: `mech-final.md:20`: 14 entries over 600 that grew (F-323 +66, F-324 +85, F-342 +60, F-345 +66, F-351 +6, F-396 +217, F-397 +174, F-398 +254, F-399 +34, F-400 +16, F-401 +23, P-40 +70, P-173 +55, P-174 +270); `diff.md:98`: "lengths.py: pass; 14 over 600 grew, each by its owed clause; F-88 fell to 594."
- Climb batch 34b: `mech-final.md:18`: nine grew (F-24 +86, F-301 +56, F-312 +73, F-332 +12, F-336 +47, F-353 +82, F-381 +115, F-388 +98, F-396 +307); `diff.md:96`: "lengths.py: pass; nine over 600 grew, each by its owed clause, F-353 with the cold reader's 3 characters; F-34 and F-390 shrank."
- `record.py check` in the same runs prints the size list as "reported, not failing" (35b `mech-final.md:54`: "FACTS.md: size: 295 entries over 600 characters", line 58: "FACTS.md 336 entries, POSITIONS.md 106 entries; 0 failures; reported: from 2, size 2").

### 6b. History

- `f44cf4ec28` (11-02 00:58): `sort.md` already had the kind "past 600 characters" and the draft rule ("The rungs wrote their entries as drafts, as the worker skill tells them: "Spend no effort ..."). `entries.md` already had: "for an entry over 600 characters, the question of "What an entry is" that keeps each sentence past the 600". `check.md` form: "an entry past 600 characters only with the question that keeps each sentence past it, named in `entries-report.md`." `lengths.py` (first version): "each changed entry's length before and after ... and whether it stands over the record's 600, the size that record.py reports. Information only; exit 0." `judge.md` and `lengths.py` held no rule on growth. The design note (below) said "The script checks no length and no register."
- `575d555945` (11-02 02:57): added, in `entries.md`, the section "Bounds, new evidence and length" with the bullet "An entry already past 600 characters grows only by the clause that its change owes ..."; in `check.md` "and an entry already past 600 grows only by the clause that its change owes"; in `judge.md` "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth"; in `lengths.py` the mark "grew past 600" and the last line naming each such entry. The commit message, item 5: "judge.md and lengths.py: an entry already over 600 that grew is named, and held unless the owed clause alone explains it; the writer first moves detail to the report or to a pointer to the skill's part." Items 1 and 2: "check.md and entries.md: an entry keeps the commit or code state that bounds a one-time measurement and what the fact blocks; only how the fact came about goes to the history (F-34's loss)." and "a claim extended to the landing's batch brings that batch's figures and their source in the Detail, and the checker reads the Detail (F-240)." The reason named is `record-landing-replay-24.md`, section 7, item 5: "**Length.** `judge.md` and `lengths.py`: an entry already past 600 characters that grows is held unless the owed clause alone explains the growth, and the writer first moves its detail to the report or to the skill's part (question 5 of `coordinator`'s `references/record.md`, "What an entry is"). F-298 grew by 97 characters and F-32 by 140. The hand route cut F-298 by 502 while it added the same row."
- `git log -S"past 600"`, `-S"grows only by the clause"`, `-S"grew past 600"` and `-S"already over 600"` over the directory find only `f44cf4ec28` and `575d555945`. No later commit changed these words (`2dc73945eb`, `a1d0d63c69`, `b18a3a06d8`, `6edff99a78` and the later ones concern landing on main, skills and the page).
- `README.md` line 24 (the `lengths.py` sentence) came in `575d555945` (the `-S"lengths.py"` search finds both commits; the first-version README named `lengths.py` among the checks, the second added the sentence on growth).
- `record-landing-workflow.md` (design note; commits `5384a4f35b` 11-02 00:08, `575d555945`, `b18a3a06d8`, `6edff99a78`): 
  - Line 24: "**Checks.** Fidelity (no more and no less than the source, no lost condition, no default shown as the curator's decision) and comprehension. The script checks no length and no register. After a chunk the coordinator applies `final.apply` with `record.py`, runs `record.py check --base`, commits, and files `queue.md`." (this is in the section on the clarity workflow's design, quoted for comparison.)
  - Line 58: "**The rungs' entries are drafts.** The worker skill says: "Spend no effort on the entry's wording: it is rewritten to the record's form after your work." (`fortress-repo`, `references/records.md`, "Writing to the record"). No stage of the batch rewrites them, and no brief of the script quotes "The pass". At climb batch 24 all 17 entries that the batch added or changed stood over 600 characters at the landing, from 960 to 2,789. The record writer after the landing changed six of them: it cut three for size (F-299 to 1,917, F-308 to 1,740, F-298 to 1,656), and corrected three (F-34, F-240, F-306), which stayed past 600. It did not touch the other 11 (my count, from `FACTS.md` at `25238e60c` and at `85b2998e9`)."
  - Line 76: "4. **The check of form.** Only the curator's read of a small pilot caught length, register, history in an entry and the wrong home."
  - Line 86: the post-batch review's Part 4 lists "entries false, stale or past 600 characters (F-34, F-306 and a sentence of F-240; F-299, F-308 and F-298; clauses of P-73, P-151 and P-156)".
  - Lines 105 and 202: the script's checks include "each changed entry's length before and after."
  - Line 110: the writer's work includes "The pass on each entry that the batch added or changed: its wording, and the question that keeps a sentence past 600."
  - Line 291 (risks): "6. **Entries grow.** The texts of 10-26 grew 1.9 times, and the orientation has passed its budget three times. The length table shows each change. An entry grows only by what its change needs. The judge holds growth that no question keeps."
  - Line 318 (added `575d555945`): "`lengths.py` names each entry over 600 characters that grew, and the judge holds it unless the owed clause alone explains the growth."
  - Line 326 (defaults): "3. **The pass's reach.** Every entry that the batch added or changed (17 at climb batch 24); or only those that the evidence names false, stale or past 600 (nine at climb batch 24, the practice of 10-31). Default: every entry, since the rungs' entries are drafts by the worker skill's rule, and the pass of 10-31 left 11 of the 17 untouched, all past 600. Cost: about 0.1M to 0.2M more a landing, an estimate."
  - Line 66: "`bedc80b01`, 10-26: ... The 13 texts grew to 1.9 times the entries and carried batches, counts and dates. The curator rejected all 13. The run wrote about 2.7M."
- `record-landing-replay-24.md` (commit `b0a2a261c0`, 11-02 02:31): replay of climb batch 24's landing against the hand route. Length figures from it: line 36 "1,202 characters became 1,320 by hand and 1,217 by the workflow"; line 44: "The hand route moves the line numbers, the messages and the typed signature to the skill's `references/compiler.md`, "Natives", and cuts 2,158 characters to 1,656. The workflow keeps them, and the entry grows to 2,255. Its judge applied the growth, with each sentence's question named."; line 49: "2,789 characters became 1,917 by hand and 2,105 by the workflow."; line 57: "2,342 characters became 1,740 by hand and 2,047 by the workflow. The hand route's entry is better on length."; line 63: F-32 "grows from 2,072 to 2,212 characters"; line 216: "`record.py check --base 43cd61b62`: "FACTS.md 241 entries, POSITIONS.md 84 entries; 0 failures; reported: size 2" (196 FACTS and 69 POSITIONS entries over 600 characters)." (hand route) and line 221: "FACTS.md 242 entries ... (197 over 600, F-309 among them)." (workflow).
- Judge's and sorter's rule on POSITIONS, which the judge and entries briefs also hold: the curator's words of 2026-10-31, "you don't need my approval to bring the record in line with reality" (`entries.md:26`, `judge.md:26`; source `HELD.md`, "Held in chat (2026-10-31)", 08:1x UTC).

## 7. The clarity workflow (`explorations/coordinator/tools/record-clarity/`)

Commits in the window: `d568449911` (10-22 08:34, "The clarity workflow as a reusable tool"), `913ba1cbfc` (10-22 09:28), `6026231ff5` (10-22 12:16), `bedc80b01d` (10-26 08:37), `18788035c0` (10-27 22:14, "restored to its form before bedc80b01: no run brief (args.extra) can override its own briefs"), `9a37e8401f` (10-28 20:59), `9a27211250` (10-28 22:38), `f44cf4ec28`, `3747769992`, `9a0f69e01a`.

- `writer.md:36` (the writer's brief, "How to write each entry"): "10. Keep each entry near 600 characters as a check, not a cap. Clarity comes first." Added in the first commit `d568449911` (`git log -S"Keep each entry near 600"`: that commit only). Item 2 (line 28): "Keep every condition, exception and limit. A shorter sentence must not lose one." Item 9 (line 35): "For a fact: keep a historical measurement only if it is stated as that measurement; move repair chronology to the history; link a count that changes at every landing to the entry that owns it. A fact may record an implementation choice made at a default; say so, and never as the curator's ruling."
- `writer.md:26` (item 4, as at `9de4c69bc8`): "Keep the state apart: "Built.", or "Still to build:" in one line with where the work is tracked. Keep such lines as they are; do not move them out." (This is the 10-22 08:19 rule, which the curator reversed at `ef6a0a0263`; the sentence stays in this brief at `9de4c69bc8`, and I did not find a commit that changed it.)
- `writer.md:23` (findings): "the ground's dates, counts, commits and file names go in the apply file's note line, not in the entry" (added `9a27211250`, 10-28 22:38, "The clarity workflow's writer and checker keep a finding's ground out of the entry").
- `assess.md:8-16` (the assessor's brief): the six criteria and the four dispositions, "reorganize: detail to move, a merge with an entry that owns the subject, or a split of claims that change apart".
- `judge.md`: holds or applies by meaning ("the final text keeps the meaning of its sources"); no sentence on length (grep for `600|length|grow|shorter` finds none).
- `check.md`, `fix.md`, `coldread.md`: no sentence on length. `coldread.md:5` limits the cold reader's reading: "Read nothing else: not the record, not its history, not git, not any report. The test is whether the entries stand on their own."
- `README.md`: no sentence on length or 600 (grep for `600|length|size|history|detail|reorganize|move` returns one line, about the assess stage).
- The pilot and the curator's read: `record.md:92` (`f898915bce`/`e7afa05020`): "The pilot shows the curator the form: the length, the register, and what belongs in the history."
- What the clarity workflow did to the size: not in the texts I read. `record-growth/README.md` records that FACTS fell 92K in one commit on 10-02 and 167K on 10-13 (see item 8).

## 8. The October consolidation: target and measured result

There are two October consolidations.

### 8a. The slices of 2026-10-13 02:10 to 05:35 ("consolidated to what a decision needs")

Seven commits: `3072a043a3` (02:10, slice 1), `4feafe6fae` (03:26), `427b98c1b9` (03:54), `920654f120` (04:24), `4c4b14c230` (04:51), `da72754c26` (05:19), `1558a22ede` (05:35). Their notes `facts-slice-1.md` to `facts-slice-7.md` in `process-engineering/`. I grepped the seven for `characters|median|600|target|shorter|size`. None states a length target. Each has a table `## The size` (slices 3 and 5 to 7) with characters, bytes and entries, and states the file's change:
- Slice 1: FACTS 302,356 characters before (`series.csv`, `49d78c8cd`) and 284,554 after (`series.csv` row for `3072a043a`).
- Slice 3 (line 107): "The whole of `FACTS.md` went from 268,971 bytes to 269,075." Slice 5 (line 147): "from 268,198 bytes to 268,412." Slice 6 (line 154): "from 268,412 bytes to 262,891." Slice 7 (line 107): "from 262,891 bytes to 258,669." Slice 7 line 132: "9. **The size fell by 13 %.** Old 191 and 192 grew ... New 200 and 201 are still the longest, at 2.2K and 3.2K".
- The slice notes state their form target as "to what a decision needs" (their headers). They report no median and no count over 600.
- `record-growth/README.md` line 22: "FACTS grew to 352K at batch 7b (09-30), then lost 92K in one commit on 10-02 (the rung entries cut to the fact), after a 55K rewrite on 09-20 and 44K on 09-30." and the "consolidation of 2026-10-12" cutting "15 %" (draft line 5: "where the consolidation of 2026-10-12 cut 15 %").

### 8b. The consolidation by the record rule, 2026-10-13 18:16 to 20:13

The target, in the draft's words (item 20, "The size", and the draft's line 5): "about 145K characters for both files allows about 600 each. So 600 is a check, not a cap." and "If every entry over 600 characters came down to 600 and the rest stayed, FACTS would come to 113K and POSITIONS to 60K." (Both under "(new)".) For the trial (draft line 5): "The trial cuts the ten entries from 36.3K characters to 5.9K, to 16.2 % of their size. The new median of the ten is 0.58K. Nine of the ten are under the measure of about 600 characters. The tenth, FACTS 58, is 707".

The measured result (draft Part 4 and the record test): `record-test/grades-final.md` header: "(FACTS and POSITIONS at `ab933086b`, 361K to 200.6K characters) ... totals X 30, Y 28 of 30"; the record test's README: "grades-final.md: ... X is the finished record and Y the old entries; 30 and 28 of 30." `grades-scenario6.md`: "scenario 6 run again on the final record (124.1K), its entry F-201 replaced by the `coordinator` skill's section that now holds it".
- `record-growth/README.md` line 23: "On 10-13 FACTS went from 257.6K to 90.2K characters and POSITIONS from 103.5K to 33.9K, together 361.1K to 124.1K (-237K), from `12df81e7e`, the commit before the consolidation's first chunk `55f1a1352` (18:16 UTC), to `b67abe3d2` (20:13). The chunks (`55f1a1352` to `ab933086b`) cut 160.6K and the removal of the entries that moved to the skills (`1632b5dfa`, `9dd34a1f2`, `b67abe3d2`) 76.4K."
- The chunk commits (all 2026-10-13): `55f1a1352d` 18:16 (pilot chunks F-51 to F-72, P-37 to P-62); `0b47fd7335` 18:38 (F2a); `82c58c9c8e` 18:39 (F2c); `a30a481315` 18:55 (F3); `9ef0b13a8a` 18:57 (F4); `f29f7273c7` 19:03 (F1); `b87a17de52` 19:07 (P1); `ab933086b8` 19:10 (P3); `1632b5dfa7` 19:59, `9dd34a1f22` 20:01 and `b67abe3d26` 20:13 (entries removed to the skills).
- FACTS, measured here (lines `- F-` / `- **F-`, characters per line):

| commit | time (UTC) | entries | file chars | median entry | over 600 | over 1,000 | longest |
|---|---|---|---|---|---|---|---|
| `12df81e7e` | 10-13, before the first chunk | 195 | 257,608 | 1,139 | 161 | 115 | 6,554 |
| `55f1a1352d` | 18:16 (pilot) | 195 | 227,497 | 989 | 147 | 97 | 4,017 |
| `ab933086b8` | 19:10 (all nine chunks) | 184 | 119,697 | 578 | 59 | 10 | 3,165 |
| `b67abe3d2` | 20:13 (entries removed to the skills) | 157 | 90,179 | 576 | 38 | 0 | 976 |
| `9de4c69bc8` | 11-24 | 339 | 427,378 | 1,198 | 299 | 215 | 4,330 |

  (`series.csv` agrees with the file-character figures: 257,608 → 90,179 at `b67abe3d2`, and 427K at `9de4c69bc8`. The task note gives 339 entries and 299 over 600 for `9de4c69bc8`; this measure agrees.) I did not measure POSITIONS.
- `record-rule-draft.md` Part 4 and its line 544 to 548 (the trial's own numbers): "The ten: 36,317 characters before, 5,878 after, 16.2 %." "FACTS is 257,739 characters in 195 entries, median 1,149; 161 entries are over 600."
- Whether the consolidation's stated target (about 600 each, about 145K for both files) was met: both files together were 124.1K at `b67abe3d2` (the README line above); FACTS alone had 38 entries over 600, longest 976. These are the figures; the texts do not say "met".

## 9. Table: each rule or check, its file, who applies it, and what the text says about an entry over 600 characters

"Not stated" means that the text does not say. Quotes are from the texts above.

| Rule or check | File (at `9de4c69bc8`) | Who or what applies it, by the text | What the text says happens to an entry over 600 characters |
|---|---|---|---|
| What a FACTS entry holds (line 18) | `.claude/skills/coordinator/references/record.md:18` | "you" (the coordinating session) in the pass; in a batch "the commit stage runs it"; the Opus writer of a consolidation | Not stated in this bullet. |
| "Keep an entry near 600 characters. This is a check, not a cap, and no reason to split: an entry may pass it if a question below keeps a sentence." | `record.md:31` | Not stated who; the six questions are asked "of each sentence" | "an entry may pass it if a question below keeps a sentence." Splitting is not a reason. |
| The six questions | `record.md:34-41` | Not stated who; used in "The pass" and by the writers of a consolidation (the draft: "a writer asks of each sentence") | Not stated for length; questions 3 to 5 move a sentence to the history, the report or another entry. |
| The six checks and four dispositions | `record.md:43-57` | "In a consolidation of FACTS" (the clarity workflow's assessor; `record.md:108`) | Not stated; no check names length. |
| The pass, step 5 "Report each entry over 600 characters, with the question that keeps its extra sentence." | `record.md:84` | The commit stage in a batch ("with this part quoted in its prompt"); "you" after a lone worker | The entry is reported with the question that keeps its extra sentence. To whom the report goes: not stated. |
| Pre-commit check | `record.md:66` | "you" ("Before every commit, run `record.py check --base ...`") | "reports each entry over 600 characters." |
| Workers' rule: what a FACTS entry is | `.claude/skills/fortress-repo/references/records.md:40` | A worker that is told to write FACTS, or hands a fact over | No number of characters in the file; "It points to the report section that holds the detail." |
| Workers' rule: "Put its detail in a section of your report ... Spend no effort on the entry's wording: it is rewritten to the record's form after your work." | `records.md:82` | A worker whose brief lets it write FACTS | Not stated. |
| `check` in `record.py` | `explorations/coordinator/tools/record.py:126, 1198-1201, 1288-1303` | A script, run by "you", the commit stage (`40302280cd`), the record-landing's `checks.sh`, a writer in a consolidation | Printed under "reported, not failing:" with each entry's length; exit 0 (`return 1 if fails else 0`); `SIZE` is "reported, never refused". |
| `add`, `set`, `merge`, `remove`, `apply`, `note` in `record.py` | `record.py:982-1170` | A script | No length test in any of them. |
| The rung worker's `record.md` | `climb-batch-workflow.js:623` | A rung's worker | Not stated; told "the fact, its source and its test in a few lines under a bold title, the detail left in REPORT.md" and "Completeness is yours; the record pass owns the final wording." |
| The gather's fold | `climb-batch-workflow.js:1045` | The gather | Not stated; told "the fact, its source and its test in a few lines". Names no `record.py` command for the FACTS entry. |
| The commit stage's FACTS write | `climb-batch-workflow.js:1622` | The commit stage | Not stated; "record.py check --base ... prints 0 failures before the commit." |
| The review's check of the folded record | `climb-batch-workflow.js:1130` | The review stage | Not stated; "every FACTS line true as written, sourced and checkable". |
| Sorter's kind "past 600 characters", and "the pass" on every added or changed entry | `record-landing/sort.md:31, 41` | The record-landing's sorter | The sorter lists the change in `owed.md`; what happens to it is the entries writer's. |
| Entries writer: "An entry already past 600 characters grows only by the clause that its change owes."; `entries-report.md` names, for an entry over 600, "the question ... that keeps each sentence past the 600" | `record-landing/entries.md:38, 48` | The record-landing's entries writer (Opus headless stream), and in its fix round | For an entry already over 600: it may grow only by the owed clause, after other detail is moved out; "The judge holds an entry past 600 that grows by more." For an entry over 600 that does not grow: the writer names the question in its report. |
| Checker's form class | `record-landing/check.md:27` | The record-landing's checker | "A sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`, and an entry already past 600 grows only by the clause that its change owes." |
| `lengths.py` | `record-landing/lengths.py` | A script, run by `checks.sh` after each round and at the end | Prints the entry's length before and after and the mark "over 600" or "grew past 600"; exit 0. |
| The judge's hold | `record-landing/judge.md:24` | The record-landing's judge (Opus) | "Hold an entry already past 600 characters that grows, unless the clause that its change owes alone explains the growth." Held: the block stays out of `final.apply`. An entry over 600 that does not grow, or one new over 600: not stated. |
| The clarity writer's item 10 | `record-clarity/writer.md:36` | The clarity workflow's writer | "Keep each entry near 600 characters as a check, not a cap. Clarity comes first." |
| The clarity judge | `record-clarity/judge.md` | The clarity workflow's judge | Not stated; judges meaning only. |
| The curator's pilot read | `record.md:92` | The curator, on a page of three or four entries | "The pilot shows the curator the form: the length, the register, and what belongs in the history." Not run for the record-landing workflow ("takes no pilot"). |
| The batch script's call of the pass | `climb-batch-workflow.js` | Not applicable | The script does not quote "The pass" and does not mention 600 (`record-landing-workflow.md:58`: "no brief of the script quotes "The pass""). |

## 10. What I searched and did not find

- A line in `sources.md` that names "no reason to split" or the origin of "check, not a cap" by name: none. The only `sources.md` pointers for the size are lines 59 and 60 (the draft's Part 2, items 5 to 32, and `record-store-review.md`).
- A statement of the length as a cap or a limit in `record.md`, `records.md`, `record.py`, the batch script, or the record-landing briefs: none. The word "cap" with an entry's length appears only in "not a cap" (`record.md:31`, `writer.md:36`, draft item 20). The 3,000-character bar is in `facts-consolidation-check.md:175` (quoted by the draft), before the rule.
- The reader of step 5's report: not stated in `record.md` at any commit. In the draft, item 50 and "Its writer names, in the chunk's report, the decision or the misreading that the sentence prevents": the chunk's report.
- A test or check that fails on an entry's length: none found in `record.py`, `lengths.py` (exit 0 always) or the briefs.
- The `record-store-design.md`, `record-store-review.md`, `record-origins-evidence.md` and `HELD.md` words on 600: I read only `HELD.md` by grep for `600|a cap|characters|too long|length` (no line on an entry's length; matches were about the review queue and the revival notes). The other three were not searched for this file.
- The coordinating session's transcript and the curator's words by time on the 600 rule: not searched in this slice (the draft quotes his comment of 15:38 on 2026-10-13: "it needs to have a reason to be that large, because we want that compressed benefits").

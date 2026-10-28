<!-- The account of why the POSITIONS rewrite of 2026-10-26 failed where the consolidation of 2026-10-21 to 22 succeeded, and of how to run the foundations review's corrections now, written on 2026-10-28 by an Opus worker from the map and the evidence files beside it, and revised on 2026-10-28 after the curator's recheck, with its pronouns named, for the coordinator and the curator. -->

# Why the POSITIONS rewrite of 10-26 failed, and how to run the corrections

Times are UTC. From 10-25 the curator's time is UTC+1. Paths start at `explorations/` unless they start at `.claude/`. Five evidence files are cited by short names:

- "timeline": `coordinator/postmortem-2026-10-28/evidence/timeline-10-26-to-10-28.md`, by the time of a message;
- "recheck": `.../evidence/scope-recheck.md`, by section;
- "genesis": `.../evidence/brief-genesis.md`, by section, with the run brief's instructions I1 to I29;
- "consolidation": `.../evidence/last-consolidation.md`, by section;
- "history": `.../evidence/tools-and-skills-history.md`, by section.

"My count" marks a figure that this account measured itself.

## Summary for the coordinator

**The causes, heaviest first.** The steps up to the launch were right (section 1).

1. The coordinator asked the Fable judge for a list of behaviours, then made it binding over the clarity tool's guard. The run brief said "Each rewritten entry must produce every behaviour listed for it" and "Where they differ, this brief wins", through the coordinator's hook. The list carried batch numbers, counts and dates; the coordinator added "the year of each ground". The texts grew to 1.9 times the entries and carried history: the curator's complaints of length and "historical events".
2. A fresh boot wrote the brief eight minutes after a compaction, at 466K. Its plan came from the boot note and its content from the judgement, unchecked against `record.md`. It gives no length cap and no register.
3. The skills name no tool for correcting entries after a review. No rule says that a run gives a tool data, not rules. The lessons that would have stopped it stayed in a tool brief, a README, a commit message and the held list.
4. Nothing caught it before the end: no pilot, no length cap, and a trap test that checks decisions only. It scored 12 of 12 on the rejected texts.
5. After the rejection, four framings in two days. The last was an ask the curator could not read.

**Did the skill changes after the consolidation encode the practice wrongly or too thinly? Too thinly.** The 14 commits of 10-22 and 10-23 to the coordinator skill and `fortress-repo`'s records part are right, but they name what each tool does, not the job it fits: no tool for corrections, no rule 0, no pilot. One cut the only mention of the clarity tool's fidelity check. Only the coordinator's hook changed the tool; the model stayed Opus.

**How to run the corrections.**

- Scope: the 18 entries with findings in `explorations/reviews/foundations/evidence/salvage-findings.md`, every finding.
- Tool: the clarity workflow, kind `positions`, with one change to its own briefs (proposal 0). With `findings.md` in a chunk's folder, the writer corrects each finding by the audit's rules, rule 0 ("change as little as you can") first, and changes nothing else. The checker fails any other change, and any growth beyond need. No run brief.
- Two chunks of nine, by subject. The first runs alone. An Opus page writer shows the curator its texts, old beside new. Then the second.
- Checks: the tool's cold reads, check, fix and judge; `record.py check --base`, a length table and `words-subset.py` on a copy; the trap test of 10-26 again, blind, about 0.8M.
- The coordinator now writes no entry text, edits no judged file, and only copies files, launches, applies with `record.py` at the curator's yes, and commits. About 2.5M to 3.5M tokens written in all, an estimate.

**Decisions for the curator** (section 7): the brief change, or the mining workflow instead; the pilot; whether five findings awaiting the curator's word go into the run as questions; the quiz; three skill proposals.

## 1. What happened, 10-26 to 10-28

All from the timeline unless marked.

- **10-26 07:37 to 08:38: the steps up to the launch** (recheck). The coordinator put two changes to POSITIONS: "Three more wait for the Fable judgement." (07:38:21). The curator approved the two, one library (P-37) and the team's later word (P-26), with the clarity workflow and a trap test: a test of whether a reader acting as the coordinator decides right from the new text where the old text leads wrong (07:42:15). The coordinator stated the extension: "They also cover every other entry that the judgement says bends or lacks its real reason." (07:49:25). The curator assented: "Yeah, this sounds like a solid plan." (07:54:36). The Fable judge was asked "Which entries bend" (08:10:52), and named 12. The compaction carried the rewrites as "already approved" (08:29:38). Each of these steps was right. At 08:37 to 08:38 the coordinator wrote a run brief of 7.7K for 13 entries, hooked it into four stages of the clarity tool (`bedc80b01`), and launched the run.
- **09:26 to 12:13.** Both judges applied all 13 texts; the coordinator edited five. The trap test scored them 12 of 12, the old entries 10 of 12. A page put them to the curator (`reviews/foundations/rewrite-results.md`).
- **19:08 to 19:26.** The curator rejected them, and called the coordinator's proposal to keep two sentences weaseling. The cost was about 2.7M tokens written, against 1.5M estimated.
- **10-27 07:12 to 07:47.** The curator asked to salvage small, targeted corrections, and ruled that Fable writes no text that enters the record as written (`coordinator/HELD.md`, "Held in chat (2026-10-27)"), and refused the coordinator's new plan, which reinvented workflows that exist.
- **22:14 to 23:35.** The hook was undone (`18788035c`). The coordinator said it should write the corrections itself. A Sonnet worker's findings list came in: 40 entries named, 18 with findings.
- **10-28 05:40 to 05:56.** On Opus, the coordinator put a scope ask in the numbers of its own sort. The curator could not read it, and switched the coordinator to Fable.
- **07:37 and 07:42.** The curator ruled for the clarity workflow, chunked, an Opus writer, never the coordinator's hand, over every finding; and asked for this account (`coordinator/HELD.md`, "Held in chat (2026-10-28)").

## 2. What went wrong, and why

### The causes, heaviest first

The causes are what bent the run brief, and what let its texts through.

**1. The run brief made the Fable judgement's list binding, over the tool's guard.** The coordinator's reasoning. The curator had asked for this tool so that the proven process, with its cold reader, would write the entries, not the coordinator with its full context: "you can use for writing it with a code reader" (07:42:15; "code" is "cold", dictated).

- The list was the coordinator's design: its judge brief asked, "For each entry to rewrite", what the new text must make the coordinator do (07:58:56), and the compaction summary carried the plan "per judgement section 7" (genesis §3).
- The run brief set aside the clarity writer's "Keep the meaning." (I4) and made the list binding: "Each rewritten entry must produce every behaviour listed for it" (I5); "A behaviour of section 7 that the text does not produce is a failure" (I27). It reached four stages and said "Where they differ, this brief wins." (I2). The override and its hook (`bedc80b01`) have no source but the coordinator (genesis).
- Section 7 gives up to six behaviours an entry, with batch numbers, counts and dates: "closed by 22c", "is 52 walls now", "his 09-20 class-loader lean". The coordinator added "give the year of each ground it ranks" (I17, no source found).
- My count: the 13 texts hold 21.2K characters against 11.2K in the entries, 1.9 times. The team's later word (P-26) grew from 1.2K to 3.2K, one library (P-37) from 1.1K to 2.9K (`reviews/foundations/evidence/rewrite/combined.apply` against `coordinator/POSITIONS.md`). The years it asked for fit the curator's "historical events".
- The writer was Opus (`reviews/foundations/evidence/salvage-inventory.md`, piece 3). Its first source and target was the 55K Fable judgement. That this carried Fable's register in is my inference; nothing measured it.

**2. A fresh boot wrote the brief from the plan, without the record's rules.** The coordinator's situation (genesis).

- An automatic compaction came at 08:29:38, at 796K. The brief came eight minutes later, at 466K: 124K after the compaction, 17K of skills, 235K of boot reading and 90K of work.
- In the coordinator's words (19:22:55, 19:27:02): "Its plan came from the boot note." and "The fresh session carried the plan out without checking it against `record.md`." Its content came from the judgement and the dialogue.
- The brief names none of the record's rules for an entry: near 600 characters, one or two sentences, ASD-STE100. "keep each entry as short as the behaviours allow" (I7) gives no number.
- At 08:36:59 it planned "a small change so the clarity workflow can carry this run's extra brief, then the brief itself". The hook, the brief, the commit and the launch took 65 seconds.

**3. The tool did not fit the job, and the skills did not say so.** The skills' text and the tools' limits.

- The skill gives the clarity workflow one job: "Run it when entries no longer read on their own." (`.claude/skills/coordinator/references/record.md`, "The consolidation tools"). No tool is named for correcting what a review found.
- On 10-21 to 22 the audit's writer made the content corrections, by rule 0 and its other rules (`coordinator/positions-audit/full/evidence/briefs/writer.md`, "The rules").
- The clarity tool has no input for findings (`record-clarity.js`). The coordinator saw the conflict (I4), and changed the tool without the curator's word: `bedc80b01` cites none (history §2). The skill asks it to propose a fix (rules below).

**4. Nothing caught it before the end.** The coordinator's choices and the tools' limits.

- No pilot: the curator saw all 13 texts at once, after the test.
- No length cap and no length check (`coordinator/BOOT.md`, "Waiting on him").
- The trap test checks decisions only. It passed 12 of 12 (`rewrite-results.md`, "The trap test"). No tool checks register, length against the version before, or history in an entry (my reading of the tool's briefs).
- Both judges held nothing; on 10-22 they held 6 of 65 (consolidation §1, step 13).

**5. After the rejection, four framings.** The coordinator's choices (timeline).

- Keep two sentences (10-26 19:11:14). A new process (10-27 07:31, refused). Write the corrections by its own hand (22:56:47), from "The pass owns each entry's final wording" (`record.md`). An ask in its sort's numbers, "a. Write 1 to 10, and do 11" (10-28 05:40:11), refused as undecipherable.

### The rules the coordinator broke

All but one stood before the consolidation that worked (my check by `git blame` and `git log -S`):

- "If its words would defeat its purpose, do the better thing, say so in one line, and propose a fix." (`SKILL.md`, "The curator's role and decisions").
- "The problem, never the expected answer." and "For an update of a document: a length cap against the version before." (`references/delegating.md`, "What a brief holds", `f6bc1aa75`).
- "An entry states the present, or what holds for all time." (`record.md`, "What an entry is", `ef6a0a026`, 10-22, a lesson of the consolidation). Question 3 there, a date goes "to the history" (`7b434aae5`), and "Keep an entry near 600 characters." (`cb9213556`, 10-14).
- "Use no internal shorthand." (`SKILL.md`, "Talking to the curator"): the ask of 10-28 05:40:11.

### The failures that no rule covered

- A run brief that overrides a tool's own briefs.
- Which tool corrects entries after a review.
- A pilot that the curator reads before a run rewrites many entries.
- A check of length, register and history. The tools check meaning and decisions only.
- Two homes for writing entries: "The pass" and "A consolidation" (`record.md`). The skill does not say which one governs a correction of 18 entries. The coordinator chose the first at 22:56:47 on 10-27; the curator ruled for the second at 07:37 on 10-28.

### What the evidence does not show

A full context does not separate the windows: on 10-22 the clarity runs launched at 489K to 708K, and succeeded (consolidation §1). On both days the coordinator's own writing failed: on 10-22 its explanation and 24 proposals, "horribly vaguely written" (consolidation §3, 16:28:00); on 10-26 the run brief. On 10-22 that writing stayed out of the tools; on 10-26 the hook put it in.

## 3. The last consolidation, its lessons, and where they went

### What it did right that 10-26 did not

1. **Each tool ran on its own briefs.** A launch message held two lines: the brief's path, then the entries and the folder (consolidation §2). The curator shaped the audit's briefs by page comments and gave rule 0 (history §5, `317f24091`).
2. **The tool fit the job.** The audit's writer made the content corrections by rule 0. The clarity writer then kept their meaning (consolidation §1, steps 4 to 13).
3. **A pilot came first, and the curator read it**: ten entries in the audit's trial, ten in the clarity pilot, then "I felt the tone was good." (consolidation §3, 08:19:30).
4. **The writers wrote from the curator's words**: 1,100 quotes, all checked exact (`coordinator/positions-audit/full/RESULTS.md`, "The checks"). On 10-26 the first source was the Fable judgement.
5. **The coordinator's part was mechanical**: apply, check, commit (`coordinator/tools/record-clarity/README.md`, "After a chunk"). On 10-26 it wrote the run brief and edited five judged texts (`combined.apply`, header).
6. **The judges held what they doubted**, with the old text as the default (consolidation §1, step 13; §4, item 9).

### Which lessons reached the skills and tools

Reached: section 4 gives each commit.

Not reached:

- Rule 0: only in the audit's writer brief. The merge of the two writers: only in the audit's README. No run brief overrides a tool's briefs: only in the message of `18788035c`. A pilot that the curator reads first: nowhere.
- A change of this size by tools, never by the coordinator's hand: on the held list (10-28 07:37).
- The record-test kit: no tool's README names it (history §6, "Not found").
- The recipe of 10-13 in `record.md`, "A consolidation" (chunks of 20 to 32, a scout, a writer, a quiz) still stands beside the tools section. The runs of 10-22 followed the tools, and no quiz ran on POSITIONS (consolidation §0).

## 4. Did a change to the skills or tools degrade the coordinator?

Not by wrong text, but by thin text. From 10-22 09:32 to the launch, 14 commits changed the coordinator skill or `fortress-repo`'s records part, the last at 10-23 19:16 (history §6; my reading of the diffs).

- `b6f5268e1` (10-22 09:32): entries that read on their own, the six checks, "The consolidation tools" with the mining workflow first, every writer on Opus, writer streams, one judge a round. Right, but thin (cause 3). The mining workflow only "finds where each POSITIONS entry came from": that its writer corrected by rule 0 is left out. So is what would have stopped 10-26: section 3's "Not reached".
- `ef6a0a026` (12:22): "An entry states the present, or what holds for all time." Right; the 10-26 texts broke it.
- `6becc28f9` (14:26), wording fixes. It cut the clarity bullet's one mention of the tool's fidelity check. Right, and thinner.
- Right, and of no bearing on entries: `caaf4f13f` (a decision may point to a fact), `c24fcf50a` (evidence folders), `a898e1baf` (terms moved, then back), `617b0d94c`, `0cbb4f5c9`, `3c8ee2acc` (load order, light boot), `404599414` (model check), `d70d78445` and its reversal `5427e7208`; in the records part, ledger commands (`ef6a0a026`, `6becc28f9`, `f6f7de70c`, `2d5820c89`).

The rest held: the rules broken on 10-26 (section 2), the consolidation's own rules (`salvage-inventory.md`, piece 3), the tool but for the hook (history §1, §2), and the model.

## 5. How to run the corrections now

### The job and its scope

- Content corrections to the 18 entries that carry findings in `reviews/foundations/evidence/salvage-findings.md`, every finding in it. The 22 entries named with nothing wrong stay out.
- Not in this run: the review's findings outside POSITIONS (`rewrite-results.md`, "Still owed", last bullet). They go their own way afterwards.
- Not sources: the 13 rejected texts, the run brief, the pages of 10-26. The judgement serves only where a finding cites it, for content, never for wording.

### The tool, and the one change it needs

The clarity workflow, kind `positions`, all its stages, with writer streams. As it stands, its writer cannot see the findings, and its checker would fail every correction as a change of meaning. The smallest change is to its own briefs, written once and reviewed by the curator, so that no run carries rules.

**Proposal 0, for the curator's yes.** Add to `coordinator/tools/record-clarity/writer.md`, after "Keep the meaning.":

> **Corrections.** If your folder holds `findings.md`, a review found faults in some of your entries, each with its ground. For each fault, correct the sentence from its ground, move it to the history, or keep it and write a question for the curator, by the rules of the audit's writer brief, rule 0 first (`explorations/coordinator/positions-audit/full/evidence/briefs/writer.md`, "The rules"). Change nothing that no fault names. An entry grows only by what its corrections need.

Add to `check.md`, under step 1:

> If your folder holds `findings.md`: a change that a fault and its ground support is not a fidelity failure. A change that no fault asks for is one. So is growth beyond what the corrections need, and a sentence that tells how a decision came about.

Add to `README.md`, "Running it": "To correct what a review found, copy its findings into each chunk's folder as `findings.md` before the run." `fix.md` and `judge.md` need nothing. The skill writer, on Opus, makes the edit.

### The steps

1. **Chunk by subject**, two chunks of nine, so that entries that share a rule share a writer:
   - first, the team's word and the one library: the specification's revision (P-7), the team's later word (P-26), the library's practice (P-27), one library (P-37), the flat number types (P-43), the self-type idiom (P-146), the integer power (P-153), list order (P-154), abstract members in an exporting component (P-158);
   - second, the bound, the phases, arrays and native calls: walk runs the checker (P-12), unboxed doubles (P-17), the phase order (P-33), the bound `Any` (P-42), native bindings (P-58), walk's coercions (P-59), the `double[]` store (P-84), the open array questions (P-85), symbolic operators (P-155).
2. **The untraced entry.** The audit never traced abstract members (P-158). The README asks for the mining workflow first, but `entries.py` reads only the audit's fixed chunks, so its trail would not reach the writer. The writer uses P-158's history and the findings' grounds. Say so in one line at the launch.
3. **Copy the data**: `salvage-findings.md` into each chunk's folder as `findings.md`.
4. **Run the first chunk alone**, as the pilot. Keep the arguments byte for byte, for a resume:
   `Workflow({ scriptPath: '/home/user/fortress/explorations/coordinator/tools/record-clarity/record-clarity.js', args: { kind: 'positions', out: '/home/user/fortress/explorations/coordinator/consolidation-2026-10-28/evidence/positions/', stream: 'corrections', chunks: [{ name: 'c1', entries: ['P-7', 'P-26', 'P-27', 'P-37', 'P-43', 'P-146', 'P-153', 'P-154', 'P-158'] }] } })`
5. **Mechanical checks**, by a worker on a copy of the record: apply the judge's `final.apply`; `record.py check --base`; each entry's length before and after; `words-subset.py` on the entries whose findings are strikes only.
6. **The curator's read.** An Opus page writer shows the curator the judged texts: the clean entry first, the old one under it, each change with its finding. That read, on tone and length, decides whether the second chunk runs. A change the curator asks for in one entry goes into `findings.md` as a new finding, with the ask's time as its ground, and that entry runs again. A change for every entry goes into the tool's brief, at the curator's yes.
7. **Run the second chunk** the same way, as chunk `c2` with stream `corrections-2` (one stream per run, `delegating.md`), then steps 5 and 6 again.
8. **The quiz**: the trap test of 10-26 again (`reviews/foundations/evidence/trap-test/questions.md`, `key.md`), by the record-test kit (`coordinator/process-engineering/record-test/README.md`). Two detached worktrees, one with the old entries and one with the corrected ones. Remove the foundations review, the conversation note, the kit, this account's folder and the run's folder. One Opus reader in each acts as the coordinating session; one blind Opus grader, as on 10-26 (the kit names Fable), is told the key's slips (`rewrite-results.md`). Pass: no scenario scores lower than with the old entries (10 of 12). About 0.8M tokens written (timeline 09:29 to 09:48).
9. **Apply** at the curator's yes on each text: `record.py apply` on `main` with the judges' files, `check --base`, commit, push. A worker files the judges' `queue.md` items in the review queue.

### The coordinator's part, on Fable

- Copy files, launch, read the judges' final messages and the checks' one-line results, apply with `record.py`, commit.
- Write no entry text, no apply line and no note line. Edit no judged file. Write no run brief: the arguments above are the whole input.
- Cost, an estimate: 1.5M to 2.5M tokens written for the chunks (the 10-26 run wrote 1.62M for 13 entries), 0.8M for the quiz, 0.2M for the page.

## 6. Proposed text for the skills

Each is a proposal for the curator's yes. The skill writer, on Opus, writes it.

**Proposal 1.** `record.md`, "The consolidation tools", the clarity bullet. It replaces "Run it when entries no longer read on their own." with:

> Run it when entries no longer read on their own, and, with a review's findings in each chunk's folder, to correct what the review found (its README).

It adds a tool for the job that had none.

**Proposal 2.** `record.md`, "The consolidation tools", a new last line:

> Give a tool's run its arguments and its data, never rules of your own. If a tool's briefs do not fit the job, say so, and propose the change to the curator.

It adds the rule of `18788035c`, which today lives only in a commit message.

**Proposal 3.** `record.md`, "A consolidation". It replaces the six bullets, the recipe of 10-13, and keeps the line on FACTS before a batch:

> A consolidation, or a correction of more than a few entries, runs as runs of the consolidation tools. You write and edit no entry text in it.
> - Chunk by subject, about ten entries a chunk.
> - Run one chunk first, and show its texts to the curator, old beside new, before the others run.
> - Apply each judge's file with `record.py`, run `check --base`, commit and push.
> - Then test the changed entries with the record-test kit (`process-engineering/record-test/`): the decisions must stay as good.

It settles which part governs: "The pass" for one worker's findings, this part for many entries. It is shorter than the text it replaces.

## 7. Decisions for the curator

None of these is taken.

1. **The tool for the corrections.**
   - a. The clarity workflow, with proposal 0 in its own briefs. Default.
   - b. The mining workflow, its briefs copied to a new folder, with the findings in place of the scouts' reports and the judgement. The clarity tool stays as it is, but there is no fix round and no judge.
   - c. The clarity workflow with a `findings` argument in its script, in place of the file in the folder. It changes the script that the curator had restored at 22:13 on 10-27.
2. **The pilot.**
   - a. The first chunk alone, read by the curator; then the second runs. Default.
   - b. Both chunks in one run, all 18 read by the curator at the end. Faster, and the shape of 10-26.
3. **The findings that read the curator's decisions anew**: the self-type idiom (P-146), the integer power (P-153), list order (P-154); and the yeses the curator still owes on native bindings (P-58) and symbolic operators (P-155).
   - a. In the run: the writer writes a question and no text, and the judge files it in the review queue. Default.
   - b. Out of the run: each is its own ask later, as the coordinator's sort of 10-28 05:38 had it (`reviews/foundations/evidence/salvage-sort.md`).
4. **The quiz.**
   - a. The trap test again, blind, about 0.8M. Default.
   - b. No quiz: the tool's checks and the curator's read only.
5. **Proposals 1 to 3 for the skills**, each yes or no. Default: yes to each, with the skill writer's wording shown to the curator on a page before it lands.

## 8. The quotes that the decisions rest on

- **The curator's go**, 10-26 07:42:15 (timeline): "Yes, to both rewording of or refinements of P37 and P26. But we have like a clarity process workflow that you can use for writing it with a code reader."
- **The run brief** (`reviews/foundations/evidence/rewrite/run-brief.md`): "Where they differ, this brief wins."
- **The clarity writer's guard** (`coordinator/tools/record-clarity/writer.md`): "Keep the meaning." and rule 8: "Do not add a claim, a reason or a scope that the sources do not hold. Do not make a claim stronger or broader."
- **The audit writer's rule 0** (`coordinator/positions-audit/full/evidence/briefs/writer.md`, "The rules"): "Change as little as you can." and "Change only what is factually wrong, not his, or stale".
- **The merge never built** (`coordinator/positions-audit/README.md`, "The mining workflow"): "the correction by the audit's rules and the rewrite for clarity can be one writer stage when the mining runs again."
- **The curator's rejection**, 10-26 19:08:27 (timeline): "It is in the Claude speak. It is not in the ASD-STE100 register. It is not written as a timeless position. It cites things not as principles, but as historical events, things that will go out of date as soon as we make a move in the repo." and "It expands several times over the allotted position length." and "What is the impetus for rewriting this?"
- **The curator's salvage goal**, 10-27 07:12:48 (timeline): "But if there are really other 13 points that need a small targeted corrections, then we should not waste that scout's work or the Opus analysis we did."
- **The curator's refusal of a new process**, 10-27 07:47:43 (timeline): "No. No go. The plan seems to reinvent something for which we already have workflows."
- **The tool restored**, 10-27 22:13:20 (timeline): "Does this mean restoring it to original form that worked well for what it was designed? Yes please, undo the damage." The commit `18788035c`: "no run brief (args.extra) can override its own briefs".
- **The pilot of 10-22**, 08:19:30 (consolidation §3): "I felt the tone was good."
- **The curator's verdict**, 10-28 07:37:43 (consolidation §3): "We already invented this process. We perfected it. It worked well during the last record consolidation. We have probably failed to encode how to use it correctly next time."
- **The curator's rule of 10-28 07:37**, in the coordinator's words on the held list (`coordinator/HELD.md`, "Held in chat (2026-10-28)"): "A batch of entry changes of this size runs through the clarity workflow, chunked, with a specialist Opus writer, never by the coordinator's hand. The scope of the salvage is every issue the review found, not the two changes agreed before".
- **The curator's rule of 10-28 07:26**, the same list, in the coordinator's words: "The skills stay light: no series of rules and cases, which confuse a full context."

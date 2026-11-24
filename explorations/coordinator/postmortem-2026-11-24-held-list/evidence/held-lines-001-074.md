<!-- The held list, lines 1 to 74 of explorations/coordinator/HELD.md at HEAD 642b87f881 (sections "Held in chat (2026-11-24)" to "Held in chat (2026-11-17)"), one verdict per bullet with its evidence: for the coordinator and the curator, for the post-mortem of the held list, written 2026-11-24 by a triage worker. Read only; nothing else changed. -->

# The held list, lines 1 to 74: verdicts

39 bullets in the slice.

- settled: 27
- open: needs his word: 5 (lines 9, 22, 27, 55, 66)
- open: needs work: 3 (lines 31, 47, 63)
- open: waits for the skill writer: 2 (lines 35, 72)
- for analysis: 2 (lines 8, 16)
- unclear: 0

## Open lines, most important first

### Line 22. 08:30 on 11-23, change 42: "Why do you keep pushing [this] forward, inflating skills with workaround instructions..."
- **Raised:** fix walk's defect, do not teach it in the skill as a workaround. He said the same principle before, on 11-08 (row 364). The line holds his exact words.
- **Verdict:** open: needs his word.
- **Evidence:** the case itself is settled. Row 960 is FIXED by `6f0e48f187` (11-23 12:13 UTC, "A numeral with a radix point keeps its leading zeros", climb batch 29 rung N's skeptic). The skill line went in `0cb867d174` (11-23 16:57). `grep 00.5` in `fortress-repo` now finds nothing. The general rule is not settled. On 11-23 at 08:39 the coordinator proposed in chat: "a defect that the skill teaches as a workaround becomes a rung". The process review then turned this into ask A1: "Which rows P-180 binds" (`explorations/reviews/process-dead-ends-2026-11-23.md:104`, three options, recommends 2 then 1). `BOOT.md:64` says: "The ask of 11:5x: which open rows P-180 makes a batch fix ... No answer yet." A1 has no review-queue item (`grep P-180` in the queue finds only items that cite P-180 as their answer). The trap-sentence rule of the record-landing workflow was changed (`403a0e60cb`, process review C1).
- **Owed:** his answer to ask A1, which rows a batch must fix. It also needs a review-queue item as its one home.

### Line 72. 06:4x on 11-17: "His go for run 2 of climb batch 31, at the planner's defaults..."
- **Raised:** do not ask him about a planned batch's forks before the launch. Launch with the planner's defaults, and he reviews them after the landing. The line holds his exact words. The transcript has them at 2026-11-17T06:39:29Z: "Don't delay the launch of batch. Start it with the original planner defaults."
- **Verdict:** open: waits for the skill writer. The rule's scope also needs his word.
- **Evidence:** the record took the routing for forks O3 and O4 (PLAN-history, the section "His challenge on items 513 and 514 and his rule on a planned batch's forks", about line 2858). No skill holds the rule. `grep "planner's default\|original planner\|delay the launch"` finds nothing in `.claude/skills/coordinator/`. `references/batch.md`, "The go", bullet 3, still says: "If a question that the batch record raises is consequential (`SKILL.md`), put it to the curator first. ... While the curator is away, overnight, take a consequential question's recommended default, and launch." That keeps the ask-first that his rule cuts. The coordinator narrowed it to non-consequential forks ("not for a consequential fork that `references/batch.md`, 'The go', puts to him first"). That reading is the coordinator's, not his word. Under it the rule adds nothing to "Otherwise decide it", and the part of his rule that cuts is lost.
- **Owed:** ask him whether his rule covers consequential forks that have a planner's default. Then the skill writer puts the answer into `batch.md`, "The go", with a cold read. This touches "The curator's role and decisions", so the words wait for his yes.

### Line 31. 06:19 on 11-22, change 39: "Mostly LGTM." Walk's tuple comparison should work on tuples of any length.
- **Raised:** walk's `=` on tuples of any length, as the specification defines it (row 923), and the skill's caveats go away. "This is a signal where we should focus impl. energy." The line holds his exact words in part.
- **Verdict:** open: needs work.
- **Evidence:** review-queue item 401 is "Settled or stale ... with P-180, that answers it; row 923 holds the repair" (`review-queue.md:845`). Row 923 is still `NEGATIVE-VERIFIED` (`fortress-gap-ledger.md:463`). No plan names it: `grep 923` in `PLAN.md`, `BOOT.md` and `CLIMB-BATCH-36.md` finds nothing. In chat at 11:29 on 11-23 the coordinator said the specification gives `Tuple` only `Any`'s operators (`Specification/basic-lib/objects.tex:185`).
- **Owed:** a rung that repairs row 923, put in a planned batch.

### Line 35. 06:2x on 11-19: "His objection to the lists in the expected-failure step, a rule on how skills are written..."
- **Raised:** do not write a rule as a list of example cases that grows with each new edge case. Lists that come in through cold-read flags show the fault. The line holds his exact words. The transcript has them at 2026-11-19T06:23:25Z.
- **Verdict:** open: waits for the skill writer.
- **Evidence:** the general principle was already in the skill before his word. `references/skill-rewrite.md:3`: "A rule is not a program of steps and conditions. A principle with its reason reaches the cases that it does not name." It was added in `5114bfeceb` on 11-02. The part of his rule that cuts is the coordinator's sorting of cold-read flags: a flag whose fix is a list of cases is declined, or met with a principle. No skill holds that. `skill-rewrite.md`, "The method", step 3 says only: "Review its flags, and have the writer fix them." The record-landing workflow no longer adds a sentence for each trap (`403a0e60cb`, `record-landing/skill-task.md:16`), which covers a neighbouring part. The step's lists were cut at once (the line's own claim; not checked here).
- **Owed:** one sentence in `skill-rewrite.md`, step 3, with a cold read: a flag whose fix is a list of cases is declined or met with a principle.

### Line 47. 06:23 on 11-17, draft 39: "LGTM, but I worry about the second cut sentence..."
- **Raised:** (1) keep the cut definition of the switch-over. (2) Held at his word, no action now: a review of how the skills have grown, and of how their instructions are split between the router, `SKILL.md` and the parts ("a major imbalance ... that needs an intervention later on"). The line holds his exact words. The transcript has them at 2026-11-17T06:38:15Z.
- **Verdict:** open: needs work, for part (2). Part (1) is settled.
- **Evidence:** (1) `SKILL.md:169` keeps "the switch-over, the move of the compiled path onto the interpreter's library", and `sources.md:442` records draft 39's approval. (2) No home anywhere. `grep "skills' evolution\|distribution of\|imbalance"` in PLAN, the queue, BOOT and INDEX finds nothing. The newest skill-structure reviews under `explorations/reviews/skills-*` are from 10-04 to 10-10.
- **Owed:** the review he held: how the skills' instructions are split between router, `SKILL.md` and parts, with a proposed fix. It needs a home in PLAN's parked list until it runs.

### Line 66. 12:05 on 11-16, note 9: "Before dismissing this as utterly wrong ... can you find a favorable reading..."
- **Raised:** a favourable reading of the introduction's sentences on types that a declaration leaves out. The line holds his exact words.
- **Verdict:** open: needs his word, for two of the three decisions.
- **Evidence:** the answer is `explorations/reviews/omitted-types-intent-2026-11-16.md` (the file exists). Item 553 is settled by P-179 (`review-queue.md:923`). Items 551 and 552 are open, "a decision not taken", with no default on record and "Needed by: no planned work" (`review-queue.md:158`, `:165`). Row 1032 stays CONTESTED until he answers.
- **Owed:** his answer to review-queue items 551 and 552, put when work needs them (row 1032's repair waits on 552).

### Line 27. 07:19 on 11-22, change 40, `value object Byte(b: ZZ32)`: how would a program declare a true `Byte` stored in `byte`, or a `Float16`?
- **Raised:** how the language maps onto JVM primitives, for the speed work. "But we cannot avoid it, if we are to meet our goal." The line holds his exact words in part.
- **Verdict:** open: needs his word (later, at the speed work).
- **Evidence:** it was filed as decision 17 of the speed roadmap, `explorations/reviews/speed-roadmap-2026-11-20.md:39`, in `1e3a81195f` (11-23 09:50). It has no review-queue item. `grep "decision 17\|JVM primitive"` in the queue and PLAN finds nothing. Under `SKILL.md:229`, "A question's home is its review-queue item".
- **Owed:** a review-queue item for decision 17 that names phase 6 as the work that needs it.

### Line 9. 09:2x on 11-24: "His plan for the session: after the skill change he compacts..."
- **Raised:** after the skill change, he compacts and switches the effort from extra high to high on Fable 5.2. It is his plan, not an order to the coordinator.
- **Verdict:** open: needs his word, because it is his own act.
- **Evidence:** the transcript shows no compaction after 09:40 on 11-24. At 09:45 he insisted that the coordinator skill change come before the compaction. Drafts 70, 71 and 73 to 76 landed at 10:03 (`642b87f881`). The boot note was written whole at 09:45 (`40a6086226`). Drafts 77 to 79 and draft 72 still wait.
- **Owed:** tell him that the skill change he asked for has landed, so that he can compact. The line goes away when he does.

### Line 55. 13:17 on 11-16: "His word on the page and on what follows: the discussion becomes..."
- **Raised:** turn the answers page into an actionable plan and close its threads. He also asked how his next export of notes would be handled. The line holds his exact words.
- **Verdict:** open: needs his word, a small one.
- **Evidence:** the coordinator closed all nine threads and gave the plan in chat (transcript 2026-11-16T13:20:37Z). The rewrite of the specification ran (`e2f87bd5eb`). The coordinator's proposal was to keep this page as the one standing answers page and answer only the new notes of his next export. The line marks that proposal as "not yet his word". At 13:34 the coordinator said "I keep it ... unless you say 'delete'". No reply from him follows in the transcript.
- **Owed:** his yes or no on the standing answers page, at his next export of notes.

### Line 63. 12:28 on 11-16: "how do you implement this multiple dynamic dispatch efficiently at runtime?"
- **Raised:** a question of fact about the cost of dispatch on every argument. The line holds his exact words.
- **Verdict:** open: needs work, a small one.
- **Evidence:** it was answered on its thread, from a scout's reading. The line says "no note in the tree". At 13:20 the coordinator promised: "Only the dispatch answer exists on its thread alone; it goes into the repository with the next record update." `grep -rl "performance nightmare\|dispatch efficiently"` under `explorations/` finds only `HELD.md`.
- **Owed:** commit the dispatch answer as a note with an INDEX line, or drop the promise.

### Line 8. 09:4x on 11-24: "For analysis, the coordinator's own entry, beside the lines of 11-23..."
- **Raised:** the coordinator defended the boot note's rule with a premise it had not checked, that it resumes from the note after a process stop. His question: "why didn't you consult it before you were trying to reason about it?"
- **Verdict:** for analysis.
- **Evidence:** no post-mortem covers it. `postmortem-2026-11-24-held-list/evidence/` was empty when this file was written. `postmortem-2026-11-24-record-regrowth` is about FACTS' growth.
- **Owed:** the analysis, with lines 16 and the 11-17 item 513, in a post-mortem.

### Line 16. 12:5x to 13:2x on 11-23: "For analysis, at his words 'You're gaslighting me'..."
- **Raised:** on `Byte(v.asZZ32)`, the coordinator set the record's wording against his memory. It used "take neither side" to defend the record. The line holds his exact words.
- **Verdict:** for analysis.
- **Evidence:** his decisions are written (P-174, P-165, rewritten 11-23, `POSITIONS-history.md:4244`). The process review (`process-dead-ends-2026-11-23.md:135`, dead end 3) analyses only the 11-17 case. It was committed at 11:35 (`021521d809`), before this incident.
- **Owed:** the analysis of this incident beside dead end 3. Also check whether `SKILL.md:158` ("take neither side") needs a guard against being used to defend the record's words.

## Settled lines

- **Line 7. 09:29 on 11-24, "His rule on the boot note, for the skill writer".** His exact words. The rule is in `SKILL.md:264`: "Your context survives a process stop. Write the boot note only for a reader without it ... Rewrite the note whole near the context's limit, before another session takes over, and before you answer a compaction ask." Commits `906bf0c81a` (09:38) and `74420aa895` (09:42). The rule keeps the part that cuts: there is no rewrite at every change.
- **Line 13. 11:2x on 11-23, "His answer on the review queue: 'OMFG. 1.'"** The rule landed in `e7afa05020` (draft B1, approved 11-24): "Every other decision that changes the tree is closed when it lands. FACTS states it" (`SKILL.md:109`), and the queue holds only questions (`SKILL.md:29`). The triage was merged in `249f54adad` (92 consequential items stay).
- **Line 14. 11:2x on 11-23, the Fable process review.** Done: `explorations/reviews/process-dead-ends-2026-11-23.md`, `021521d809`. What followed it: B1 landed (`e7afa05020`). B2 was rejected (`BOOT.md:52`). B3 landed as drafts 70, 71 and 73 to 76 (`642b87f881`); draft 72 waits. B4 (drafts 77 to 79, the held list's exits) is on the skill-drafts page for his yes. Its ask A1 is under line 22.
- **Line 23. 08:27 on 11-23, change 41, the `QQ` caveat.** Answered in chat at 11:29 on 11-23, point 4: "we're in the middle of the switch-over ... the compiler still reads its own prelude, which has no `QQ`."
- **Line 24. 08:13 on 11-22, `asFloat` on every number type.** Answered at 11:29 and 12:53 on 11-23. His decision followed: P-165 ("each built-in number type declares its own conversion into `RR64`, the getter `asRR64`", `POSITIONS.md:101`).
- **Line 25. 07:30 on 11-22, batch 29's paragraph on numerals' `asFloat`.** Answered at 08:39 on 11-23: "You remember right ... the numeral types no `asFloat` ... The skill's sentence now says the eight number types."
- **Line 26. 07:24 on 11-22, define walk's `Infinity` properly.** The library's `infinity` in `Constants` is now what the skill teaches: `revival-changes.md:95`, "To get an `RR64` infinity, write `import Constants.{infinity}`. Test a value `x` with `x.isInfinite`." It was answered at 11:29 on 11-23, point 3. Rows 863 and 980 (item 502, division by zero and an unplaced numeral) are open questions in the queue, but they are separate from this line.
- **Line 28. 07:03 on 11-22, what an `int` parameter is.** Answered at 08:39 on 11-23 from `Specification/basic/trait-parameters.tex:94-95`.
- **Line 29. 06:49 on 11-22, `Byte(v.asZZ32)`.** Decided in P-174 (`POSITIONS.md:107`, rewritten 11-23 14:33, `POSITIONS-history.md:4244`). The library's departures are row 1148. The incident itself is line 16.
- **Line 30. 06:35 on 11-22, `x.isInfinite` and an infinity constant.** As line 26: `revival-changes.md:95`. The answer was given at 11:29 on 11-23.
- **Line 36. 06:2x on 11-19, the comparison of tiers shelved.** His own word closes it. Nothing is owed. `delegating.md:28` keeps Fable work to the four kinds that have a go in advance.
- **Line 40. 15:4x on 11-18, test-first and the skeptic.** In `fortress-repo` `tests-writing.md:94`: "echo a line that starts `Expected failure:` ... If the test passes, or fails another way, find out why and correct it before you make the fix" (`2a442fbf84`, `82bb989f2f`). The skeptic reads it from the transcript (`batch.md:54`; `climb-batch-workflow.js:725`). The skeptic's trim, "smaller in the forms the code around it uses ... Correctness comes first" (`climb-batch-workflow.js:726`, `:750`). There is no ablation rule. The part of his rule that cuts (an unexpected failure is not test-first) is kept.
- **Line 46. 06:25 on 11-17, the page read to draft 40.** Draft 40's approval is recorded at `sources.md:441`. The other comments are lines 47 to 49.
- **Line 48. 06:16 on 11-17, draft 38 rejected.** `SKILL.md:147` keeps the original words exactly: "Write plain short sentences, with contractions, halfway to ASD-STE100".
- **Line 49. 06:14 on 11-17, a script for the FACTS entries that POSITIONS cites.** `explorations/coordinator/tools/positions-facts.sh` (`e13e55a7f0`). Boot step 1 (`SKILL.md:239`) runs it before POSITIONS.
- **Line 56. 13:15 on 11-16, the nine faults of the specification's text.** Fixed in `e2f87bd5eb` (11-16 13:39: "chapter 2, the preface and section 1.1 describe the tree as it is"), then `7975631c9f`, `afea58bcde` and `73213e4be4`, after his later words in the 11-16 section, outside this slice.
- **Line 57. 13:12 on 11-16, the fortress operations.** Parked in PLAN (`c1ff9187d3`). Queue items 554 and 555 are "Settled or stale" (`review-queue.md:924-925`).
- **Line 58. 13:09 on 11-16, plausible goals in chapter 2.** Answered on the thread. His word of 13:12 (line 57) followed.
- **Line 59. 13:08 on 11-16, chapter 2 simple and real.** The fresh-checkout test was run by the specification worker and reported at 13:44 on 11-16 (`e2f87bd5eb`).
- **Line 60. 13:06 on 11-16, "suffix".** Now "file extension" (`Specification/appendices/changes.tex:5936`: "The text says ``file extension'' where the Working Draft said ``suffix''").
- **Line 61. 13:05 on 11-16, bring chapter 2 up to date.** `e2f87bd5eb`, later `73213e4be4`. Item 556 is "Settled or stale" (`review-queue.md:926`).
- **Line 62. 12:31 on 11-16, the fortresses of earlier editions.** Answered from `explorations/reviews/fortresses-intent-2026-11-16.md` (the file exists).
- **Line 64. 12:26 on 11-16, note 10's program.** Answered on the thread with the seven calls run under walk. Nothing is owed.
- **Line 65. 12:13 and 12:16 on 11-16, the preface's list.** Answered from `explorations/reviews/preface-list-provenance-2026-11-16.md`. The list was then corrected in `e2f87bd5eb`.
- **Line 67. 11:52 and 12:10 on 11-16, the answer to note 8.** He was right. The answer was replaced by the omitted-types note (line 66). Nothing is owed beyond line 66.
- **Line 71. 09:0x on 11-17, `Boolean`, `Char`, `String`, and item 513.** The record was brought in line (PLAN-history, about line 2857). Item 512 was decided on 11-17 as P-33 (`review-queue.md:1343`). Item 513 was built by climb batch 34b's rung C (`review-queue.md:1413`).
- **Line 73. 05:5x on 11-17, the switch of models.** Answered at 05:56:39 on 11-17 ("Compact this session now ... Then switch this session to Opus 5.5"). `tier-mode.sh regular` was run at 05:56. The boot at 06:01 ran on Opus 5.5.

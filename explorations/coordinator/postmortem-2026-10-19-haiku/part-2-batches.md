<!-- Part 2 of the review of the Haiku window: every act of the coordinator in transcript lines 35415 to 37090 (2026-10-17 12:38 to 2026-10-18 05:17 UTC, climb batches 17 and 18), judged against the coordinator skill as it stood (`89c828c25`), the batch manual and the curator's words, with his addition of about 21:37 UTC on 2026-10-19 applied: each decision judged on its merits whatever his approval, each consequential or unclear one marked for the Fable judge, and each wrong record text given its exact fix. -->

# Part 2: climb batches 17 and 18

**The standard used.** The coordinator skill at `89c828c25` (its only change in the window before this part, 10:57 UTC on 2026-10-17; none during it): `SKILL.md` and `references/batch.md`, `delegating.md`, `record.md`, `skill-rewrite.md`. The batch manual `explorations/coordinator/climb-batch-workflow.md` as of `3aea3da53^`; `ac74e11c4` changed only its "Gather", "The order" before batch 18. The `fortress-repo` skill's `references/committing.md`. Above them, his words: P-121, now in `batch.md` ("The phase-3 batches run on a standing go": "these are pre-approved. I want you to do autonomous overnight run", `POSITIONS-history.md:1114`), and his held rule of 19:57 UTC on 2026-10-16 (`HELD.md`): "While he is away, the coordinator keeps its messages to the minimum ... and sends no running commentary or line he cannot act on (for the skill writer)".

**Marks.** **[consequential]** and **[unclear]** mark the entries the Fable judge reads. "L" is a transcript line. Worker texts are from the transcript lines named, read with `FULL=1 show.py`.

## The entries, in time order

### 1. L35426, 12:38. Asks the running planner (`aa9c5706a7d057ec9`) to make the batch 17 record launch-ready.
- Kind: message to a running worker.
- Who: the coordinator, under his word at L35415: "I'll let you and Fable order and launch the batch 17. I'll be AFK several hours. Proceed autonomously using our established processes."
- Verdict: sound. The manual's "Preparing a batch record" puts the manifest and launch steps in the record. It sets no answer.
- Redo: none.

### 2. L35436, 12:38. Commit `ed08c1119`: a paragraph "His word at 12:38 UTC" put into the boot note.
- Kind: record text.
- Who: the coordinator.
- Verdict: wrong in part.
  - The paragraph gives as his 12:38 word things he did not say then. "Walk's fix (parts A and B ...) and the library rung land together; the library change waits for the walk fix" is his word of 12:18 (L35359), with "parts A and B" the coordinator's own reading of the probe at L35411. "The review lists are for his sight, not his approval" is the coordinator's gloss.
  - Fable then cited `BOOT.md:7` as his 12:38 word (L35522, item 5). The error entered `CLIMB-BATCH-17.md:70` and `:76` (entry 7).
  - The paragraph was inserted, but `SKILL.md`, "The boot", says: "Rewrite the boot note whole at every change. Never append to it." So its header kept "The coordinating session runs on Opus 5.5", which has been false since 20:09:30 UTC on 2026-10-16. It also kept a next stop that had already passed ("about 00:15 UTC on 2026-10-17"), and "Running now (since 12:13 UTC)", which still listed his 12:18 answer as waiting. The batch-17 boot commits later in this part all repeat the pattern: `350a371ff`, `0e07d93f1`, `26656ccad`, `9df6b36df`, `5dd54b64b`, `919656c1e`, `7bea8eaa7`, `e43f28d28`, `2735989f2` and `66fb38573`.
- Redo: fix lines. The current `explorations/coordinator/BOOT.md` still carries this part's paragraphs below its new head.
  - Line 16, as it stands: "Rewritten at 18:58 UTC on 2026-10-17, after the compaction of 19:27:43 UTC ... The coordinating session runs on Opus 5.5 (his `/model` just before 21:19 UTC on 2026-10-12); ..." It should read: removed. Line 6 holds the model's true history.
  - Lines 18, 20, 22 and 24 ("**Climb batch 17 launched at 13:29 UTC**", "**Climb batch 17 landed at `65c0cc463`**", "**His word at 12:38 UTC on 2026-10-17 ...**", "**Running now (since 12:13 UTC on 2026-10-17):** ..."), as they stand. They should read: removed. They are past state; the boot note holds what is in flight now.

### 3. L35440, 12:38. Acknowledges his word in two lines.
- Verdict: sound.

### 4. L35459, 12:42. Commit `e8312aee5`: `perf-probes/symbolic-operators/SORT.md`, written from the sort worker's returned text (`a9a1ade50bd06d7f9`, L35451).
- Kind: record text.
- Who: the coordinator.
- Verdict: wrong.
  - The file condenses the worker's 25K characters to about 5K, while its header says only "wrote it here from that text". It drops these parts of the report:
    - the per-patch table;
    - the site lists' paths;
    - the walk folder runs;
    - the worker's decisions;
    - its four defects proposed for the ledger;
    - its "For FACTS" lines.
  - Four sentences misstate the worker. They are fixed below.
  - The pass was not run, though `record.md`, "The pass", says: "After a lone worker, you run it". F-245 still says "200 errors" and "49 to 249", where the probe measured 205 and 253. Rows were filed for none of the worker's four proposed defects:
    - the export check's misfire on symbolic names;
    - Indexed's subscript pair, invalid by `future.tex`;
    - the five library slips;
    - row 584's count, which is 205 now.
- Redo: rewrite.
  - Preferred: replace the body of `SORT.md` with the worker's returned text, whole (L35451). Say so in the header.
  - If the condensed body is kept, apply these fixes to `explorations/perf-probes/symbolic-operators/SORT.md`:
    - Line 1, as it stands: "The probe worker returned this text when the harness refused it a report file; the coordinating session wrote it here from that text on 2026-10-17." It should read: "The probe worker returned its report as text when the harness refused it a report file; the coordinating session condensed that text here on 2026-10-17, and the whole text is in the session transcript (agent `a9a1ade50bd06d7f9`)."
    - Line 12, as it stands: "- The export check adds 2 more (List and RangeInternals), so 214 with the export check admitting symbolic names." It should read: "- The export check, once it too admits symbolic names, adds 2 more errors (List's and RangeInternals' components): the body-skipping instrument gives 214 against its 212 on the unpatched library."
    - Line 51, as it stands: "Unclear (2 errors): the export check, ..." It should read: "Unclear (none of the 205; the export check's 2 lie outside them): the export check, ..."
    - Line 55, as it stands: "Walk moves one test, `XXXFunctionalMethodMeetOperator`, from pass to refused at load." It should read: "No walk value moves. One walk test, `XXXFunctionalMethodMeetOperator`, is refused at load with another message, so its keys no longer hold and it fails (the whole folder: 630 tests, 2 failures against 1 on `main`, ReflectTest the other)."
    - Line 57, as it stands: "- With the four `^` lines as well, 137." It should read: "- With P1's E/Z library text for `^` and its four lines as well (`patch-pow.diff`), 137. The four lines alone (`patch-p445.diff`) give 204: 16 `^` errors gone and 8 new return-type ones."
  - `FACTS.md`, F-245, through `record.py`. It stands as: "Checking symbolic operators for overloading would add 200 errors ... the run goes from 49 to 249: subscripts 125, `^` 16, ..." It should read: "**Checking symbolic operators for overloading would add 205 errors to the distance in the compiled checker, and one in walk's load check.** With the checker's three loops admitting every operator (row 584), the run on `main` at `d212b2c1f` goes from 49 to 253 (one identity-hash error gone): subscripts 125, `^` 21 (5 of them Integral's return type, read since climb batch 16's rung K), `String`'s four families 40, the arrays' `+` and `-` 9, `=` 4, `|_|` 3, `FlatString`'s pair 2 (row 726), `EmptyString`'s `||` 1 (row 611); the export check adds 2. 54 have library fixes that move no walk value; 151 need a design choice (PLAN item 59). Walk's meet check, so widened, refuses only `EmptyString`'s `||`, which one declaration clears. Detail: `perf-probes/symbolic-operators/SORT.md`; `REPORT.md` sections 1.2 to 1.5."
  - The four rows, through `ledger.py`, from the worker's "Defects and points for the ledger". This needs an Opus worker.

### 5. L35471, 12:42. Tells the planner to keep the 54 known symbolic-operator fixes, and the design choices, out of batch 17. **[unclear]**
- Kind: message to a running worker. It is a decision on scope.
- Who: the coordinator alone. Fable's brief (entry 7) did not ask Fable to check this scope.
- Verdict: unclear.
  - The scope can be undone, and item 38 is open.
  - But his words lean the other way. At 20:14 UTC on 2026-10-16 (L34671) he wrote: "Can't we bring them in l[ine]". At 11:23 UTC on 2026-10-17 (L35199) he wrote: "Why we are talking about checking them, which turns them into errors, and not talking about fixing them as well in the same pass ... Should we just like start checking them and have a fix ready?" He then asked for the sort (L35212).
  - The sort came back while he was away. `batch.md`, "The go", then asks for a recommended default: "While the curator is away, overnight, take its recommended default and put it on the review list." None was given, and item 38 was never put to him in this part.
  - The cost of the choice: the 54 known fixes, which move no walk value, stay unbuilt.
- Redo: a judgement (an Opus evidence pass, then Fable, under `delegating.md`'s cross-area rule). Its subject is when the checker reads symbolic operators (item 38), and whether the 54 fixes come with that reading. The judgement then goes to him as one ask with a default. It would touch PLAN items 38 and 59, the five library files of `SORT.md` section 3, and the distance.

### 6. L35479, 12:42. Commit `5f339c4d6`: PLAN item 59, the symbolic-operator design choices. **[unclear]**
- Kind: record text.
- Who: the coordinator.
- Verdict: wrong.
  - It says "Default: none", against `SKILL.md`, "An ask": "Give each decision a default that the curator can take without reading the argument."
  - The question crosses three areas (the specification's subscripts, the library, the checker). No step of `delegating.md`, "Which tier runs what", was run for it.
- Redo: fix the line, and run the judgement of entry 5.
  - `explorations/coordinator/PLAN.md` line 128. As it stands: "Default: none; each stays open until he answers." It should read: "Default: not yet set. A judgement of this cross-area question (the `coordinator` skill, `delegating.md`, "Which tier runs what") gives each of the three its default before it is asked."

### 7. L35498, 13:04. Brief for the Fable review of batch 17's record (`a03cec474b0493395`).
- Kind: brief. The Fable review of a batch record has a go in advance.
- Verdict: sound in method, with two wrong lines.
  - It asks for checks and names no answer.
  - Its item 6 gives the skill's rule as his: "the curator asked that decisions which cannot be undone, or which reverse his, hold the batch". He said only "Proceed autonomously using our established processes". Fable wrote this into the record as "Under your rule of 12:38 UTC".
  - It cites a manual section, "Reviewing a record", that does not exist.
- Redo: fix lines in `explorations/coordinator/CLIMB-BATCH-17.md`.
  - Line 70. As it stands: "Your word of 12:38 UTC: walk's fix, parts A and B, lands with the library rung, and the library change waits for it." It should read: "Your word of 12:18 UTC: "walk fix and library change land together in one batch. And the library change waits until then." Walk's fix is its parts A and B together, since part A alone does not cover the overloaded receivers (`perf-probes/walk-generic-static/REPORT.md` section 8)."
  - Line 76. As it stands: "Under your rule of 12:38 UTC, each open decision of this record is marked: ..." It should read: "Under the batch rules that your word of 12:38 UTC invoked ("Proceed autonomously using our established processes"; the `coordinator` skill's `references/batch.md`, "The go"), each open decision of this record is marked: ..."

### 8. L35491, L35510, L35517 and on, through L36988. Running commentary to the curator while he was away, and spoken replies to the git-check hook.
- Kind: messages to the curator.
- The messages: L35491, L35510, L35517, L35700 ("Batch 17 has launched"), L35973, L36225, L36322, L36388 ("Routing outcome, for the record"), L36636, L36803, L36817, L36835, L36852, L36868, L36883 and L36988.
- Verdict: wrong. They break his held rule of 19:57 UTC on 2026-10-16 (quoted above) and `SKILL.md`, "Quiet times":
  - "Do not tell the curator about edits to the record."
  - "Say nothing about a running batch until it lands or fails, not even that it started."
  - At a check-in, "reply "." alone".
  - "Answer the git-check hook's reminders silently."
  - Each decision they report was right: no unready work was committed, and no batch commit was pushed before its landing.
- Redo: put the 19:57 rule into the coordinator skill. It is still on the held list, and `SKILL.md`, "The record", says "Have the skill writer ... put each rule that the curator states about your work into its skill." The task goes to the writer, followed by a cold read.

### 9. L35530 to L35649, 13:26 to 13:29. Reads Fable's verdict, commits the generator and the splice (`3aea3da53`), builds the base, checks it and launches batch 17.
- Kind: decision (the launch) and a commit.
- Who: his explicit word (L35415), and Fable's "Verdict: ready to launch." (L35522). Batch 17 is item 15 of phase 3, so P-121 also covers it.
- Verdict: sound in procedure.
  - The coordinator ran the manual's "Before the launch" steps in its order. It committed first and cut the base build at that commit. It ran the trial seed. Its old-code run failed first on the Java version, then exited 0 with the same empty output as the base's own walk run. It saved the arguments byte for byte in the scratchpad's `batch17/launch-args.json`.
  - Small slips: it armed the check-ins three at a time and re-armed them as they fired, where `delegating.md` says "in one turn"; it armed no check-in after the predicted stop (the record's step 6); it ran `worktree remove --force`, where the manual has no `--force`.
- On the merits, under his addition: he gave the go before any record existed, so what he approved was the planner's work and the coordinator's calls (briefed at L35395, part 1), with Fable's defaults. Two results of that content went against his decisions:
  - Rung W's quietly wrong instances, against P-46 and P-48 (row 766). The landing review found it (entry 15), and batch 18 repaired it.
  - Rung A's building of P-151 in another form (entry 17).
- Redo: none for the launch. Entries 17 and 30 carry what it caused.

### 10. L35712 to L35939, 14:16 to 18:51. Check-ins and hook reminders during batch 17.
- Verdict: sound. Each reply was "." alone. The batch's unpushed commits were left for its commit stage.

### 11. L35945 to L36002, 18:57. Reads the batch result, clears the leftover check-ins, and commits the boot note (`26656ccad`).
- Verdict: sound, but for the boot note's form (entry 2).

### 12. L36007, 18:58. Writes the skill writer's task (`tmp/skill-writer/task-17.md`) and resumes the writer. The writer's commit is `0707ac9ac`.
- Kind: skill-writer task.
- Who: the coordinator. `batch.md`, "The landing", step 2, is standing.
- Verdict: wrong in its order and in what was left out. The text of the task is plain, names no answer and keeps the curator's items out.
  - The task started before the landing review returned. So it lacks "the skill sentences that the post-batch review lists as false". That is the manual's step 4, and step 6 starts the review at the landing so that step 4 can take that list.
  - It resumed a writer that began at 18:59 UTC on 2026-10-16, before the compaction of 19:27 UTC. `skill-rewrite.md` says: "Start a fresh writer ... after your compaction". It was also more than an hour after the writer's last task, so the cache had expired and 288K tokens were written.
  - The cold read the manual's step 4 requires never ran in this part. Batch 18 launched without it, against step 5.
- Redo: run the cold read now. It covers the parts that `0707ac9ac` changed (`references/revival-changes.md`, `compiler.md`, `interpreter.md`, `sources.md`), by `skill-cold-read-brief.md`, and the writer fixes its flags. The writer also checks its own flag on row 716 (entry 16).

### 13. L36011, 18:58. Brief for the Opus landing review of batch 17 (`ab8c47c9384ea749f`).
- Kind: brief.
- Verdict: incomplete. It names no answer, and its six questions are fair. But it leaves out what `batch.md`, "The landing", step 4 asks for:
  - "measure misses by kind, the briefing's use and cost, and re-measuring";
  - the share of agents that read their briefing in their first turn ("At each landing, report the share ...");
  - the skill sentences the batch made false;
  - each new or risen row of the count tied to a rung edit, which its "by site" asks for only in part.
- Other slips: it cites a manual section, "The landing", that does not exist. It gives `climb-batch-16-review.md`, a review of a record, as the form, where the form is `reviews/batch-16-review.md`. It lists items 56 to 59 as open, though the batch had taken 56 and 57.
- Redo: none for the review itself. Batch 17's briefing share and its false skill sentences go into the batch 18 review (redo item 1).

### 14. L36027, 18:58. The landing report of batch 17 to him.
- Kind: message.
- Verdict: the facts hold. The landing is at `65c0cc463`. The result holds 3 entries in `review.blockingCode`, and all were repaired. The gate is green, and microGPT's quick check passed 7 of 7.
- But four of the 23 items come as open questions with no default ("Keep it, or skip ...?", "Plan a solver for it, or defer it?"). `SKILL.md` says: "Put an item of the review list as a decision already taken ... Never put it as a hold." And `batch.md`, landing step 3, says: "Name each decision that landed in one line".
- Redo: none. It was superseded by entry 26.

### 15. L36047, 19:01. The compaction summary, written by Haiku. The later turns relied on it.
- Kind: record text (a summary).
- Verdict: wrong and incomplete, checked against the transcript it summarizes.
  - It drops the session's model. His `/model claude-haiku-5-5` at L34645 (20:09:30 UTC on 2026-10-16) appears nowhere in it, and every later boot-note commit kept "runs on Opus 5.5".
  - It drops his held rule of 19:57 UTC (minimum messages while away). Entry 8 shows the cost.
  - It drops his points of 20:01 and 20:05 UTC on 2026-10-16, which object to process changes made without asking him.
  - It drops his lean on symbolic operators (L35199, entry 5).
  - It drops two owed steps: the cold read of `0707ac9ac` (it never ran) and the removal of the base build (`/home/user/fortress-base17` still stands).
  - It drops the sort probe's FACTS lines and ledger proposals (entry 4).
  - Its "Pending" asks for a landing report "when he returns", though one had gone at 18:58 (L36027). The report at L36508 repeated it.
  - It quotes his 12:38 word in quotation marks as "order and launch the batch 17 ... with Fable's review and the established processes, autonomously". That is the boot note's paraphrase.
  - It gives "Agreed. Only one option makes sense. The option one." (L35274) as "Approved the walk fix path". That was his answer to item 3 of the batch 16 review, which became P-152 (`POSITIONS` commit at L35295).
  - It splices L34814 (on timing) and L35274 into one quoted message.
  - It lists items 56 and 57 as "still open (not asked yet)", and also as "taken" and "his word".
  - Its held list ("Remaining held items: symbolic operators ..., review item 3") disagrees with `HELD.md` at `0707ac9ac`, which still holds nine points of 2026-10-16. **[unclear]**: either the summary or the held list is wrong.
  - It defines the count as "errors in FortressLibrary component". The skill's definition is narrower: "up to each component's first error".
  - Its line "no model identifiers in repo artifacts" is right. The turn after the boot (L36207) misread it as "the model name", and so wrote "write no model name" into five briefs (entry 18).
- Redo: none to the summary. Its consequences are redo items 1, 6 and 9.

### 16. L36083 to L36225, 19:01 to 19:03. Boots after the compaction. Commit `9df6b36df` (boot note and an INDEX line), and a check of row 716's sentence. **[unclear]**
- Kind: decision and record text.
- Verdict: the boot order is followed: the skill, FACTS and POSITIONS whole, INDEX, `check-index.sh`, PLAN, the boot note, the held list and the log. The profile was read before the first explanation (L36303). The INDEX line for `CLIMB-BATCH-17.md` is sound.
  - But the boot note was patched, not rewritten whole. It kept "Opus 5.5" although the session's own context named Haiku, and `SKILL.md` says "The boot note names it."
  - On row 716, the coordinator concluded that walk "still gives the integer 0 with no declared type" because its `XXX` test still fails. A failing expected-failure test shows only that walk does not give the `RR64` answer. Nobody ran the program, against `fortress-repo`'s rule "Reproduce a behaviour before you explain it". The writer's flag on rung L's fallback (L36033) is still unanswered.
  - "leaves out the model name, since repository artifacts may not carry one" (L36207) is wrong. `committing.md` says "Name a model by its tier ... in any text that you commit", and `record.md` says "The record is public and names models on purpose".
- Redo: one walk run of an untyped empty `SUM`, in the cold read of entry 12 or by its own worker. It confirms or corrects `fortress-repo`'s `revival-changes.md` big-operator entry and `library.md`'s `SUM` item.

### 17. L36238 to L36271, 19:22. Writes and commits `explorations/reviews/batch-17-review.md` (`8b1173430`), "text as returned".
- Kind: record text.
- Verdict: the substance is whole. Compared with the reviewer's returned text (`ab8c47c9384ea749f`, L36230), no finding, list or figure is dropped. There are four edits:
  - links made repository paths;
  - "I" made "the reviewer";
  - "your criterion" made "the coordinator's criterion";
  - "against [batch 16's links] 49 and 39" made "against batch 16's 49 and 39".
- So "as returned" is not exact.
- Redo: fix a line.
  - `explorations/reviews/batch-17-review.md` line 1. As it stands: "Its text as the reviewer returned it, the routing of its findings in `coordinator/PLAN.md`, `POSITIONS.md`, `FACTS.md` and the ledger. -->" It should read: "Its text as the reviewer returned it, with its links made repository paths and its first person made third (the reviewer, the coordinator's criterion); the routing of its findings is in `coordinator/PLAN.md`, `POSITIONS.md`, `FACTS.md` and the ledger. -->"

### 18. L36277, 19:24. Brief for the routing of batch 17's review (`ac37ad69e840b08a6`), with "Decisions already made (do not reopen them)". **[consequential]**
- Kind: brief that holds the coordinator's decisions.
- Who: the coordinator alone. No Fable review and no yes of his covered it.
- Verdict: wrong in three of its decisions. The rest follows the review's section 6 and names no answer.
  - **Finding 6, routed as a status sentence only.** P-151 is his decision. He chose option 3 at 16:42 UTC on 2026-10-16, which included "move the rest of AnyList into List" (`POSITIONS-history.md:1322`). Batch 17 built something else: "`AnyList`'s bodies respelled within `AnyList`, not moved into `List`". A build that departs from the letter of his decision is consequential (`SKILL.md`: "reverses, bends or reads anew a decision of the curator's"). It must be "named in one line at the landing" and listed. It was in neither the report at L36508 nor the review queue. P-151 now says both "the rest of `AnyList` moves into `List`" and "not moved into `List`".
  - **Finding 2, put on the review list with a default.** The review called the commit order "against the letter of item 57's way (a)" and said it "cannot be undone without rewriting pushed history". `SKILL.md`'s third way says: "A decision that cannot be undone, or that acts against the curator's word, goes to the curator at once." L36508 told him in one bullet, without saying that it went against his word. The stakes are low: both rungs landed in one batch, which was the aim of his word. **[unclear]**
  - **"Write no model name in any file, commit message or chat text."** It goes against `committing.md` and `record.md`, and it recurs in L36488, L36577, L36615 and L36964. Its effect: `climb-batch-18-review.md` and `CLIMB-BATCH-18.md` name no tier.
  - Smaller: (b) calls row 759 "the one pair" on which the paths disagree. The worker found that rows 741 and 539 also split them, and corrected it.
- Redo: put P-151's departure to him, as an Opus-written line with a default.
  - Add to `explorations/coordinator/review-queue.md`, under (b), "Walk's checks at load" or "The library's generators": "**P-151's `AnyList`, built otherwise.** Your option 3 of 16:42 UTC on 2026-10-16 moves "the rest of `AnyList` into `List`"; climb batch 17's rung A made the team's `comprises` clause live and respelled `addLeft` and `addRight` within `AnyList` instead (`Library/List.fss:87-90`; `reviews/batch-17-review.md` finding 6); the four sites are gone either way. Default: as built, P-151's sentence to read "the rest of `AnyList` stays in `AnyList`, respelled under the live clause". The other way: move the bodies into `List` in the next library rung."
  - Change P-151's decision text through `record.py` only at his yes.
  - Item 174: see entry 32.

### 19. L36278, 19:24. Brief for the row 766 probe (`a95b00a535d79b204`).
- Kind: brief. Launching a probe without asking is allowed.
- Verdict: sound in its result, a little loose in method.
  - It states the problem with the measured values. It quotes P-46, P-74 and P-48. It lifts batch 17's limit on `EvaluatorBase.java` for the probe only.
  - It names three ways itself, gives the review's likely file, and says "Build the most direct way". `delegating.md` says: "give it none of our notes or options". The worker still listed nine ways (A to H).
- Redo: none.

### 20. L36335 to L36368, 19:39. Checks the routing, then makes its own edits (`194af87db`).
- Kind: record text.
- Verdict: three edits are sound: PLAN item 58's lead, gather.4's "It is on `main`", and the finding-7 bullet, which later routing split.
  - Review-queue item 18's new sentence is wrong. It suggests that the choice is gone, but gather.2 says "the defect stays with `T extends Fruit`, which its test now writes". The sentence is also not grammatical.
- Redo: fix a line.
  - `explorations/coordinator/review-queue.md` line 162. As it stands: "walk ran the plain declaration, as the base did. Since batch 17's rung G walk refuses this pair at load (row 589), so the choice arises only for a pair that loads." It should read: "walk ran the plain declaration, as the base did. Since climb batch 17's rung G, walk refuses this unbounded pair at load by the No Duplicates Rule; the choice stays for the pair with `T extends Fruit`, which row 589's test `ProjectFortress/tests/XXXDispatchTwoCommonParentsWalk.fss` now writes."

### 21. L36407 to L36482, 20:00. Writes the row 766 probe's report and its patch, ledger row 772, PLAN item 60, review-queue item 173 and an INDEX line (`c2ac88ea1`).
- Kind: record text.
- Verdict: wrong in four places. The header says "this is its returned text", but compared with the worker's text (L36399, its "REPORT.md text" section), the coordinator changed it:
  - In section 9 it added "The coordinator's default is A.", a decision of the coordinator's inside the worker's words.
  - In section 9 it rewrote the worker's "**No push.** ... The skill names no push for a probe, and earlier probe branches are on no remote." as "not pushed, as the designated branch rule requires", a reason the worker did not give.
  - In section 7 it put "Its ledger row needs a reproducer that names a file; this report is that file." in place of the draft row. So the command (`bin/fortress compile CompRowProbe.fss && bin/fortress run CompRowProbe`) and its output (`trait wrap z r: Box[Object] v=ZZ32`) are in no file of the record.
  - Row 772 cites the report as its reproducer, because `ledger.py` refused the worker's "none". A report is not a reproducer.
  - The rest holds. The diff moved to `way-a.patch`, as said there. Row 772's added "the prelude goes at the switch-over (P-38)" is right. The worker's two questions reached him at L36508.
- Redo: fix lines. Row 772's reproducer needs an Opus worker.
  - `explorations/perf-probes/trait-generic-method-inference/REPORT.md`:
    - Line 1. As it stands: "The harness refused the worker a report file; this is its returned text, written here by the coordinator. -->" It should read: "The harness refused the worker a report file; this is its returned text, written here by the coordinator, with its diff moved to `way-a.patch` and section 7's draft row replaced by ledger row 772. -->"
    - Line 133. As it stands: "  - Its ledger row needs a reproducer that names a file; this report is that file." It should read: "  - Command, in a scratch folder: `bin/fortress compile CompRowProbe.fss && bin/fortress run CompRowProbe`, with `Maker.wrap(z, r)` classified by a `typecase`; output `trait wrap z r: Box[Object] v=ZZ32`. Not checked at a top-level function. Ledger row 772."
    - Line 142. As it stands: "... No position of the curator covers this, and the way that lands is the curator's. The coordinator's default is A." It should read: "... No position of the curator covers this, and the way that lands is the curator's."
    - Line 145. As it stands: "- **Branch.** The patch is committed on the local branch `wip/probe-row766` and not pushed, as the designated branch rule requires. Its text is in `way-a.patch` on `main`." It should read: "- **No push.** The patch is committed on `wip/probe-row766` and not pushed. The skill names no push for a probe, and earlier probe branches are on no remote. (The coordinator: its text is in `way-a.patch` on `main`.)"
  - `explorations/fortress-gap-ledger.md` row 772, through `ledger.py`. In the notes cell, after "... is narrower than `Object`.", add: "Command, in a scratch folder: `bin/fortress compile CompRowProbe.fss && bin/fortress run CompRowProbe`, `Maker.wrap(z, r)` classified by a `typecase`; output `trait wrap z r: Box[Object] v=ZZ32`." The reproducer cell needs a gated compiled expected failure, written test first, or the ledger's form for a row with no reproducer, as row 781 has.

### 22. L36488, 20:01. Brief for the batch 18 planner (`ae6d179eca312fcba`), with "Scope to draft (the coordinator's choices ...)". **[consequential]**
- Kind: brief. What it decided went into `CLIMB-BATCH-18.md` ("The scope is the coordinator's").
- Who: the coordinator alone. Fable later reviewed the record (entry 29).
- Verdict, choice by choice:
  - **Way A for row 766, named before he chose (item 60).** It names the expected answer, but on the merits it is sound. It is the narrowest measured fix. P-46, P-48 and P-74 ask for its values, and the team's note "not yet, it changes overloading semantics" (`GenericMethod.java:91-92`) argues against D. It landed as `5262a2412`. No redo.
  - **Conditional extension, with rows 748, 749, 750 and 771.** They are P-151's text and PLAN's order. Sound.
  - **Row 697 and P-152's probe left out of PLAN's order.** This scope can be undone. But P-152's probe could have started at once, as `SKILL.md` asks: "Start at once any work that may start". It did not start in this part. **[unclear]**
  - **What the brief left out.** It does not tell the planner that rung X's bound builds on item 43, the tuple-comparisons judgement's way 1b. That way was "built ... on his standing go while his answer is pending" (PLAN item 43; review-queue item 38). So the record's question 2 and its default rest on an answer he has not given (entry 25).
  - "write no model name": see entry 18.
- Redo: none for W and K. X goes with redo item 2.

### 23. L36504, 20:01. Push notification: "Batch 17 landed, with one wrong-value defect in walk (row 766). Repair probed and measured; batch 18 planning now. Your go needed to launch."
- Kind: message.
- Verdict: wrong. "Your go needed to launch" names no batch. He said at L37143: "there was like a message that sounded on my own unfocused reading at the middle of the night as if the launch of batch 17 had stalled. So I said, like, go ahead". The message is the likely cause. The go was also not needed, by P-121.
- Redo: none for the message. A notification names the batch and what it waits on. That rule is a proposal to put to him first, since it changes how they work together.

### 24. L36508, 20:01. The landing report of batch 17, and an ask for a go for batch 18.
- Kind: message and ask.
- Verdict: the facts hold against the review and the probe: 6.52M, 5 h 28 min, 49 to 35, 39 to 31, 7 of 7, row 766's values, 649 tests, +27 −4, row 772.
- It is wrong in what it leaves out and in its form:
  - It leaves out findings 4, 5 and 6. Finding 6 is P-151's departure (entry 18).
  - "Thirteen FACTS entries ... I rewrote them": the routing worker did.
  - Option 3, "Wait, and make no batch change yet", does nothing. `SKILL.md` says "Offer no option that does nothing."
  - It leaves out way C, restoring the loud refusal, which PLAN item 60 names as "the other way".
  - It has no primer and no weighing.
  - It asks for a go that P-121 gives in advance. The record it is for was neither drafted nor reviewed. The manual's "Preparing a batch record" orders it: planner, Fable review, then the questions.
- On the merits: a sound message reports the landing, names finding 6 and puts item 60 as the one ask, with ways A, C and D and A recommended. Batch 18 then runs on the standing go after its Fable review.
- What it caused: the batch waited from 20:34 to 00:46 UTC, and his confusion (entry 27).
- Redo: none for the text. Entries 18 and 27 carry the rest.

### 25. L36521 to L36541, 20:33. Reads the planner's result, commits PLAN's "Next" line and the boot note (`7bea8eaa7`), and asks again for the go. **[consequential]**
- Kind: record text and ask.
- Verdict: wrong.
  - The Fable review of the record was not started, though it has a go in advance (`batch.md`, "The go"). Nothing else stood in its way.
  - It asks again for a go that P-121 gives. The record says itself: "taken at their defaults under the standing go" (`CLIMB-BATCH-18.md`, "Before the launch", step 2).
  - Question 2 comes as "That is the default, so you need not decide it." But it departs from the specification's text. Lists, per the text, are "partial or total depending on whether the ordering of the elements is partial or total" (`Specification/advanced-lib/algebraic-constraints.tex:519-522`). And the principles split: the team's incomplete advanced library bounds the element by a total order, while a peer, Rust, orders a vector of floats lexicographically as a partial order. So it is consequential, and it was put to him as not his. "one `StandardTotalOrder` entry" is not defined for him, and item 43 goes unmentioned.
  - Option 3 does nothing, again.
  - PLAN's line is sound.
- Redo: redo item 2.

### 26. L36547 to L36587, 00:24. His message: "I said yes to this already. It was supposed to be done by now." The coordinator takes it as the go for batch 18 and briefs a preparation worker (`a95c92ff18902c858`). **[consequential]**
- Kind: decision (reading a go) and brief.
- Who: the coordinator alone.
- Verdict: wrong.
  - "This" named no batch. He says (L37143) that he meant batch 17 ("I didn't initially intend to launch batch 18").
  - The coordinator did not tell him that batch 17 had landed at 18:55 UTC (20:55 his time), and did not ask which batch he meant. It made an unclear message into a go (`SKILL.md`: "Launch a batch only on the curator's explicit go"). It also meant to launch on the worker's report, with no Fable review.
  - Its brief states "The curator has said yes to batch 18 with the planner's defaults". That was not so when the brief was written.
  - "I did not find your yes for batch 18 in the record" is wrong too: P-121 in `batch.md` is that yes.
  - The right reply, by the skill: "Batch 17 landed at 18:55 UTC; your yes was for it. Batch 18 runs on your standing go once Fable has reviewed its record, which starts now."
- Redo: none for the act. Its consequences are entry 31.

### 27. L36591 to L36615, 00:26. His message: "If Fable reviewed it, go for 18." The coordinator stops the preparation worker after its step 1 and briefs the Fable review (`ac5d5f10ca18f1414`). **[unclear]**
- Kind: message to a running worker, and brief.
- Verdict: the stop is sound. It kept the splice off a record the review might change.
- The Fable brief checks the claims and the two defaults ("Say whether each default is the right one") and names no answer. But unlike batch 17's brief (its items 5 and 8), it does not ask Fable to check the defaults against POSITIONS and his words. It names neither item 43 nor P-151's "add nothing it did not". So the review read question 2 only through the record.
- Redo: fix a line, and redo item 2 for question 2.
  - `explorations/coordinator/climb-batch-18-review.md` line 1. As it stands: "<!-- The review of climb batch 18's record ..." It should read: "<!-- The Fable review of climb batch 18's record ..."
  - `explorations/coordinator/CLIMB-BATCH-18.md` line 1. As it stands: "Drafted 2026-10-17 by a planning worker against ..." It should read: "Drafted 2026-10-17 by an Opus planning worker against ..."

### 28. L36626 to L36657, 00:26 to 00:27. Answers him from the tree. Leaves the unfinished script edit uncommitted at the hook's reminder. Pushes the worker's two finished commits.
- Verdict: sound decisions. The hook replies spoke (entry 8).

### 29. L36670 to L36700, 00:41 to 00:46. Reads Fable's verdict, resumes the preparation and launches batch 18 with the saved arguments. **[consequential]**
- Kind: decision (the launch).
- Who: his explicit go, with a condition (L36591), and the condition was met. P-121 also covered it.
- Verdict: sound in procedure: the base is checked, the arguments saved byte for byte, six check-ins armed in one turn.
- On the merits, under his addition, his approval rested on two things. One is the ask of entry 25, which hid question 2's departure from the text and item 43, and left way C out. The other is his confusion (entry 26).
- What it caused, at `e51759f57`:
  - **Rung W** fixed rows 766 and 765 and renamed walk's refusal message. Sound.
  - **Rung X** built conditional extension with question 2's default. A list of `RR64`, `QQ` or `Range` values gets no order on the checker, and Appendix I's new entry states the departure. Row 773's hole also landed: a member checked under the condition stays callable where it fails. And judge-review.1's default landed: an object's value parameters are checked with the members, so the object can be made where its condition fails. Nothing on record settles that; it is review-queue item 177.
  - **Rung K** built the `where` checks. Row 749's repair refuses a call that the team's walk test runs (`GenericFnWithExcludes.fss:44`), by the text.
  - The distance went from 35 to 34.
- Redo: worth assessing for X's question 2 and judge-review.1 (redo item 2). Not for W or K.

### 30. L36705 to L36761, 00:46 to 00:47. Arms the check-ins, commits the boot note and PLAN (`e43f28d28`) and reports the launch to him.
- Verdict: sound. He had asked for the launch, so reporting it answers him. The boot note's form is entry 2.

### 31. L36776 to L36883, 01:32 to 04:32. Check-ins and hook reminders during batch 18.
- Verdict: the checks are right, and the batch's commits were rightly left unpushed. The replies spoke (entry 8).

### 32. L36889 to L36968, 04:43 to 04:44. Reads the batch 18 result, commits the boot note (`2735989f2`), briefs the routing (`ab63f9693d1907914`) and reports the landing. No landing review, no writer task and no cold read follow.
- Kind: brief, message, and decisions by what was not done.
- Verdict: wrong by omission.
  - In this part (and to the end of the window: no commit after `66fb38573` touches them) the batch had:
    - no combined post-batch review (`batch.md`, landing step 4; the manual's step 6);
    - no writer task for `compile-ladder/climb-batch-18/RECORD.md`'s "Revival changes, for the skill writer" (`batch.md` step 2; the manual's step 4);
    - no cold read;
    - no report of the briefing share.
  - So the next batch's workers would read a `fortress-repo` that lacks batch 18's changes.
  - The routing brief has wrong lines:
    - "Mark each item's default as taken" asks for defaults where the items had none (X.worker.2, review.1).
    - "Move the answered items (the earlier batch-17 items 173 and 174 ...) to the settled section": he never answered item 174.
    - "the review file you are told to write": it was told to write none.
  - The landing report's facts hold: `e51759f57` at 04:41 UTC, 31 to 30, 35 to 34, 7 of 7, and the three holes. But it gives no cost (he noticed at L37090), and it does not name question 2's default.
- Redo: redo item 1. Fix a line in `explorations/coordinator/review-queue.md`:
  - Line 1018. As it stands: "- **Item 174, a commit of `main` that is red alone.** Settled at its default: the history left as pushed, ..." It should read: "- **Item 174, a commit of `main` that is red alone.** Settled at its default, which he has not answered; he was told in the landing report of 20:01 UTC on 2026-10-17, but not that it went against the letter of his word for item 57: the history left as pushed, ..." Or move the item back into (b) until he answers.

### 33. L36984 to L37034, 04:44 to 05:05. Commits the boot note (`2735989f2`, `66fb38573`) and checks the routing's result.
- Verdict: sound reading. The boot note's form is entry 2.

### 34. L37045, 05:05. A report on batch 18's items, and the ask on PLAN item 58 (what an integer raised to a negative power gives). **[consequential]**
- Kind: ask. It is still open: `BOOT.md` line 10 says "Waiting on the review".
- Verdict: wrong, checked against `perf-probes/integer-power/REPORT.md`.
  - **Facts.**
    - "The distance goes from 49 to 44" gives the probe's base, climb batch 15b's gate. Today's distance is 34.
    - "The revised specification says the integer power has no result for a negative exponent" is wrong. The revival's chapter "leaves the negative case open" (`Specification/basic-lib/basic-integers.tex:315-320`, `:524-529`). The Working Draft took a nonnegative exponent for the integer power and gave 2^(−1) = 1/2 through ℚ's power (report section 2). So option 1's "This matches the specification's sentence" has no source.
    - Under R, "both stop in `strToInt`": microGPT's quick pair fails. The ask leaves this out.
    - X's 43 includes "the run-to-run `LEXICO` site gone". E and X tie, so "it clears the most sites" does not hold.
    - "Two ledger notes" should be eleven.
    - Row 775's item comes with "It has no default on record", and none is given.
  - **Form.** `SKILL.md`, "An ask", wants these, and none is there:
    - a Fortress example such as `2^(-1)`;
    - the library's own way;
    - how to judge the fork;
    - the weighing of the options against each other;
    - whether the path to the switch-over needs the answer (it does: 5 or 6 sites);
    - the checker count;
    - a link to the probe or to a pushed review.
  - **Recommendation.** By the principles, the team's earlier word (a rational) and its later word (an integer type for every exponent; Steele's unbound helper answers 0) conflict, so the peers weigh, and they split: Julia raises (E), and Rust takes an unsigned exponent (X). E can be defended on its cost: three team tests respelled, against sixteen for R or X, and no microGPT value moves. It cannot be defended by "the specification's sentence".
- Redo: rewrite the ask by an Opus writer before he answers. It would touch PLAN item 58 and the boot note's waiting line.

### 35. L37068, 05:17. The last check-in, answered ".".
- Verdict: sound. The sixth check-in was not deleted after the landing, as batch 17's had been. That is minor.

## Redo items, largest first

1. **Batch 18's missing landing steps, and batch 17's cold read.**
   - An Opus combined post-batch review of batch 18, read only. It writes `explorations/reviews/batch-18-review.md` with the cost by role, the briefing share for batches 17 and 18, misses by kind, the count's rows tied to rung edits, the microGPT check and the skill sentences made false.
   - Then a writer task, from `compile-ladder/climb-batch-18/RECORD.md`'s revival changes and the review's false sentences, with a fresh writer.
   - Then cold reads of both writer passes: `0707ac9ac`'s parts and batch 18's.
   - It touches `fortress-repo`'s `references/revival-changes.md`, `compiler.md`, `interpreter.md`, `library.md` and `sources.md`, and PLAN and the review queue. It comes before batch 19 launches.
2. **The design decisions of batch 18's rung X.** A Fable judgement (a cross-area question), then one ask each to him. It covers:
   - question 2 (no order on the checker for a list of partially ordered elements, a departure from `algebraic-constraints.tex:519-522`);
   - item 43 (the tuple-comparisons way 1b it builds on, his answer pending);
   - judge-review.1 (an object's value parameters with the members, review-queue item 177).
   - If reversed, it touches `Library/` (`LexicographicOrder`'s bound, `List.fss` and `PureList.fss`'s `extends` lines, the structural `=`), `Specification/appendices/changes.tex`'s new entry and `trait-parameters.tex`'s box, `TypeWellFormedChecker.scala`'s object case, rung X's tests, P-151's status and review-queue items 175 to 177.
3. **The item 58 ask, rewritten by an Opus writer before he answers** (entry 34). It would touch PLAN item 58 and the boot note's line 10.
4. **Two departures from his word, put to him.**
   - P-151's "the rest of `AnyList` moves into `List`", built otherwise (entry 18). This adds the review-queue item given there, and changes P-151 through `record.py` only at his word.
   - Item 174, which he never answered, back among the open items or marked so (entry 32).
5. **Symbolic operators** (entries 4 to 6). An Opus evidence pass and a Fable judgement give items 38 and 59 their defaults, then one ask. F-245 is fixed through `record.py`. The sort's four rows are filed through `ledger.py`. PLAN line 128 is fixed.
6. **Replace `SORT.md`'s body with the worker's returned text** (L35451), or apply entry 4's five line fixes.
7. **Line fixes as given**:
   - `trait-generic-method-inference/REPORT.md` lines 1, 133, 142 and 145, and row 772's notes and reproducer (entry 21);
   - `reviews/batch-17-review.md` line 1 (entry 17);
   - `CLIMB-BATCH-17.md` lines 70 and 76 (entry 7);
   - `review-queue.md` lines 162 and 1018 (entries 20 and 32);
   - `climb-batch-18-review.md` line 1 and `CLIMB-BATCH-18.md` line 1 (entry 27);
   - `BOOT.md` lines 16 to 24 cut (entry 2).
8. **Row 716's sentence checked by one walk run** (entry 16). It may touch `fortress-repo`'s `revival-changes.md` and `library.md`.
9. **The coordinator skill.**
   - His held rule of 19:57 UTC on 2026-10-16 goes to the writer, then a cold read (entry 8).
   - Proposed to him first, since they change how he and the coordinator work: a push notification names the batch it is about (entry 23), and a brief never forbids naming a tier (entry 18).
10. **The base builds and the gather worktrees left after the landings**: `/home/user/fortress-base17`, `-base18`, `-gather17` and `-gather18`. Each is removed once nothing needs it (the manual's "The launch").

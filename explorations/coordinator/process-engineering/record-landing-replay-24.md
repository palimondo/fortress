<!-- The comparison of the record-landing workflow's replay of climb batch 24's landing (branch record/landing-24-replay, commits 474c5869a and cae6180ac, run 2026-11-02 00:59 to 02:04 UTC) with the record work that landed by hand on 2026-10-31 (be3b07aac, 08cc69e2d, b49631cb4, 85b2998e9), change by change, written 2026-11-02 by an Opus worker for the coordinating session, reading only: the method; FACTS and POSITIONS entry by entry, with the three POSITIONS cuts against the curator's rule of 2026-10-31; PLAN, PLAN-history, the review queue and INDEX; what each route put to the curator; the four record checks run on each head; the cost and the time; a verdict with the fixes owed before the live run at climb batch 25's landing; and what of the replay's branch is worth landing on main. -->

# The record-landing workflow's replay of climb batch 24's landing, against the hand route

## In short

- **Verdict.** The workflow's record is about as good as the hand route's, not better. It reaches further: it found a stale entry (F-220), a fact that a probe handed over (F-309), three stale queue items (264, 309, 321) and two open points for the coordinator that the hand route missed. On the shared work it is weaker: four of the six FACTS entries that both changed are weaker in evidence or form (F-34, F-240, F-298, F-308), it missed seven PLAN lines that were stale at the base, it filed Question 1 as answered when the coordinator, not the curator, answered it, and it set four items routine without telling anyone. It held nothing and changed no decision.
- **Checks.** Both heads pass `record.py check`, `ledger.py check`, `ledger.py landing-check b0f6cd6b7` and `check-index.sh` (section 5).
- **Cost.** 2.06M tokens written in all: 1.45M for the six agents in the run's folder and 0.61M for the two headless writers. The hand route's two workers wrote 0.63M, and the design's estimate was 0.9M to 1.7M. The run took 65 minutes, against 31 (section 6).
- **Before the live run at climb batch 25:** eight fixes to the briefs and scripts (section 7), the first four on the record's quality.
- **To land on main:** F-309, F-220's one sentence and the three queue items. Two more points go to the coordinator: the `drandom` row that is still unfiled, and the skill's reading of row 814. The rest stays on the branch (section 8).

## 1. Method

- **The two sides.** The hand route is the change from `43cd61b62` to `85b2998e9` on `main`, by file. Four of the nine commits in that range are the hand route's record work: `be3b07aac` (FACTS, POSITIONS and their histories), `08cc69e2d` (two notes), `b49631cb4` (PLAN, PLAN-history, the queue, the boot note) and `85b2998e9` (INDEX). The other five touch none of these files: `53a84b2e6`, `ca542e07e` and `f00fd0c2b` change the `fortress-repo` skill, `6d4e58a3b` adds the orientation run's folder, and `7abc5c21c` changes the batch script and its manual (`git log --format=%h 43cd61b62..85b2998e9 -- <file>` for each record file). No commit since `85b2998e9` has touched FACTS, POSITIONS, PLAN, PLAN-history or the review queue, so main holds the hand route's text of each today.
- The workflow's side is `git -C /home/user/fortress-landing-24-replay diff 43cd61b62 cae6180ac`, and its run folder `explorations/compile-ladder/climb-batch-24/record-landing/` on that branch: `owed.md`, `diff.md`, `check.md`, `cold-read.md`, `entries-report.md`, `routing-report.md` and the writers' logs.
- **Entries.** I took each FACTS and POSITIONS line at `43cd61b62`, `85b2998e9` and `cae6180ac`, and compared the three versions sentence by sentence. I compared their histories' provenance lines too.
- **PLAN and PLAN-history.** I compared the lines that each route added to PLAN-history exactly, and the lines that each added or rewrote in PLAN by `diff` against the base.
- **The queue.** I extracted each new item's question, part ((a), (b) or (c)), section, default and "Needed by", and matched the two routes' items by content, not by number. A word diff of each older item shows which items each route changed.
- **Sources.** I checked the replay's new claims against their sources: the review's Part 4, the hard-set and `CHOOSE` probes, the shared-state audit, F-53, and rows 336, 814 and 848.
- **What each route told the curator.** For the hand route, I read the coordinator's messages of 2026-10-31 at 16:21, 16:55 and 17:29 UTC in the session's transcript. For the workflow, I read `diff.md`'s "Held", "For the curator" and "For the coordinator".
- **Checks.** I ran the four checks on each head in two scratch checkouts. Each is a fresh repository that reads the main repository's objects through an alternates file, checked out at `85b2998e9` or at `cae6180ac`. Neither tree was touched.
- **Cost.** I ran `explorations/coordinator/tools/spend.py 0` on the run's agent folder, and on the two writer streams' transcripts under `/root/.claude/projects/-home-user-fortress-landing-24-replay/`. I took the times from each transcript's first and last message.
- **One limit of the replay.** The replay's tree is `43cd61b62`, so it cannot see `7abc5c21c`, which landed at 17:07 UTC during the hand route's run and built five of the review's script findings. Where a difference comes from that commit, I say so, and I do not count it as a miss.

## 2. FACTS and POSITIONS

Both routes changed nine entries: F-34, F-240, F-298, F-299, F-306, F-308, P-73, P-151 and P-156. Only the workflow changed eleven more and added F-309. No entry was changed by the hand route alone. FACTS.md shrank by 1,829 bytes on the hand route's side, and by 775 on the workflow's (1,757 without the new F-309). POSITIONS.md shrank by 180 and by 294 bytes.

### Entries both routes changed

- **F-34, the code generator's 52 refusals.**
  - Meaning agrees. The 52 are a past measurement, four of them stopped first at a `where` clause in their own header, which the code generator now compiles (F-181), and the present count is unmeasured.
  - Scope and evidence differ. The hand route bounds the measurement by its code state: "on climb batch 22's code", "Measured once on `2bff2fe23`", and "On climb batch 21b's base (`aa5c67d48`)". The workflow writes "measured once before it compiled a `where` clause" and "Measured once on an earlier base", and leaves the commits to the history. Its checker asked for this, by its rule "no date, batch or commit in an entry" (`check.md`, C18).
  - The workflow also drops what the fact blocks. The hand route keeps "all four open, so after the switch-over the code generator still stands between the library and bytecode". The workflow has no such sentence, and its "Each kind has a ledger row" now also covers the `where` kind, whose half of row 701 is built.
  - The hand route's entry is better. 1,202 characters became 1,320 by hand and 1,217 by the workflow.
- **F-240, the stages' times.**
  - Meaning agrees: no batch from 22 to 24 moved the count stage beyond noise.
  - Evidence differs. The hand route extends the evidence to climb batch 24's rung runs: "took 129 to 181 s, at loads of up to 10.73" (the review, section 2). It also adds `reviews/batch-24-review.md`, section 2, to the Detail.
  - The workflow only changes "to climb batch 23's" to "to climb batch 24's". The clause after the colon still gives only the runs of climb batches 22c and 23, and the Detail cites no source of climb batch 24. The claim reaches further than the evidence that the entry cites.
  - The hand route's entry is better.
- **F-298, the compiled rewrite of a `builtinPrimitive` body.**
  - Meaning and scope agree. Both add row 865: the rewrite does not reach a local function or an object expression's method. Both say that a compile refuses a glue string and a declaration with a varargs parameter: the hand route as "which a compile refuses", the workflow with the message 'Variable builtinPrimitive is not defined.'.
  - Form differs. The hand route moves the line numbers, the messages and the typed signature to the skill's `references/compiler.md`, "Natives", and cuts 2,158 characters to 1,656. The workflow keeps them, and the entry grows to 2,255. Its judge applied the growth, with each sentence's question named.
- **F-299, walk's loader for a helper string.**
  - Meaning agrees. Both cut the call chain and the line numbers.
  - Ownership of the count differs. The hand route keeps "173 of the one library's 449 live bindings name one" in the title, with a short list by type. The workflow moves the count and the list to F-32, and points there ("F-32 counts these bindings").
  - The hand route adds "a helper binding of a `FlatString` method would stop every program at load", which the review supports (Part 3, item 7).
  - Each route's pointers agree with its own choice. 2,789 characters became 1,917 by hand and 2,105 by the workflow.
- **F-306, `ZZ64`'s and `ZZ`'s bindings.**
  - Both make the same fix: `REM` and `MOD` by zero are row 336 on `ZZ64` and row 848 on `ZZ`.
  - The workflow also rewords the title to "20 of trait `ZZ64`'s native bindings and 16 of trait `ZZ`'s", so that it does not read as all of each trait's bindings (`ZZ64`'s `CHOOSE` is a 21st, F-305). It also cuts the line numbers.
  - Equal in meaning. The workflow's title is a little more exact.
- **F-308, the six transfers.**
  - Meaning and scope agree. The transfers are identities, so the checker accepts the composition whatever the helper computes, and only the guards check that each binding names the unsigned helper. Six of the 82 bindings over these types stay on glue classes. Both drop "the count and the distance stay 0 and 0", which F-53 holds.
  - Form differs. The hand route names the six bindings with their rows (326, 860, 861), and gives the skill's `compiler.md` for the transfers' names. The workflow keeps the six transfers' names in the entry, and writes "four behind rows 326, 860 and 861".
  - 2,342 characters became 1,740 by hand and 2,047 by the workflow. The hand route's entry is better on length.
- **P-73, P-151 and P-156:** below, against his rule.

### Entries only the workflow changed

- **F-24.** "So a division by zero elsewhere ends the run (rows 336, 848)" becomes "so `REM` and `MOD` by zero on these five types end the run (rows 336, 848)". This is correct: the two rows together cover the five types. The six test names become the pattern `tests/<T>DivisionByZeroWalk.fss`, which no grep finds. The value is low, since climb batch 25's rung R moves `REM` and `MOD` onto new helpers and changes the entry again.
- **F-32.** It now owns the count: 276 on glue classes and 173 on helpers, with the 173 by declaring type (they add up to 173). It adds "The 276 are the 158, the 78, and 40 of the first two kinds", cuts the matching commit `a1f8c4b8b`, and grows from 2,072 to 2,212 characters. Its Detail adds the review's section 6. This is better ownership of a count by the record's rule. It is a reorganization, not a correction.
- **F-132.** The compiled `CHOOSE` sentence now comes before "Its known gaps". No claim changed.
- **F-181.** The title holds only the `where` clause. The contract refusal (row 701) and the three forms that still fail (rows 307, 812, 867) move to the body. It grows from 1,592 to 1,604 characters.
- **F-220.** "The distance stage finds no error at the line, and the checker count's three errors (F-53) do not include it" becomes "The distance stage and the checker count find no error at the line (F-53)". This is right: F-53 gives the count as 0, and did at the base too. The hand route missed it, and main still has the stale sentence.
- **F-281, F-303, F-304, F-305 and F-307.** Line numbers and lists of sites go to their reports.
  - F-303 also drops its sentence on walk's refusal before the rung, and points to F-32 for the count.
  - F-304 puts row 862 in its title.
  - F-305 gives the sweep in the probe's words: "the helpers agree with the exact value and with walk's glue classes" (`plan-24/probes/choose.md:13`).
  - No claim changed.
- **F-309, new.** "`ForeignJava` reads every public method of a helper class once per JVM, at the first import of any of them, and keeps that reading", and each compile writes the class's wrapper anew. So a helper's Fortress type must not depend on which binding names it. It cites no test.
  - It is the hard-set probe's own hand-over for FACTS, item (a) (`compile-ladder/plan-24/probes/hard-set.md:122`), with its evidence in section 4.2, "2a" (runs 2a-1 to 2a-3, and `javap`).
  - The review's Part 4 did not list it, so the hand route, which worked from Part 4, did not see it. Main has no such entry. The probe's items (b) and (c) are not facts of the present tree, and neither route wrote them.

### The three POSITIONS cuts, against his rule of 2026-10-31

His rule (`HELD.md`, "Held in chat (2026-10-31)", 08:1x UTC): "you don't need my approval to bring the record in line with reality". The briefs read it as the fewest words, with no decision changed.

- **P-73.** Both routes cut "and at `CHOOSE` (row 521)", five words, and the two lines are identical. Both pass.
- **P-151.**
  - The hand route replaces "Row 701: the code generator's half." with "F-181 holds the code generator's half.", so the entry still says where that half stands. This is a swap, not a cut, and `words-subset.py` would refuse it.
  - The workflow cuts the sentence, six words.
  - Neither changes the decision. The workflow's is the fewest words. The hand route's keeps a pointer that the record's rule allows ("It may point to a fact that it rests on").
- **P-156, the `BoundedRange` clause.** Both cut the same clause: "after the switch-over the code generator's refusal of a method with a `where` clause stops it too, as it stops `SumReduction`'s two `distribute`s (row 701)".
- **P-156, the Why.**
  - The hand route changes one word: "the code generator refuses a `where` clause" becomes "refused". So both of the decision's reasons for not taking `I excludes Range[\I\]` stay in the entry, and the second is marked as past.
  - The workflow cuts that reason, twelve words, and the decision then stands on one reason in the entry.
  - Neither changes what he decided. The hand route keeps the decision's recorded reasons with one word. The workflow's cut drops one of them, which its judge named as a question for him (`diff.md`, C31). Both told him that the reason no longer holds: the hand route in the landing report of 17:29 UTC on 2026-10-31, the workflow in `diff.md`'s "For the curator".
  - I prefer the hand route's reading here: a reason that lapsed stays part of why he decided, until he says otherwise.

## 3. PLAN, PLAN-history, the review queue and INDEX

### PLAN-history: the lines moved

- Both routes moved under "Climb batch 24's landing, 2026-10-31". The hand route moved 37 lines, and the workflow 29. All 29 of the workflow's lines are among the hand route's 37, word for word (`comm` of the two sets of added lines).
- The eight that only the hand route moved:
  - **Answered before the base, missed by the workflow (five).** Climb batch 22c's gather.2 (queue item 296), and climb batch 23's Question 1 (306), Question 2 (307), forks 5 and 2 (308) and gather.2 (312). All five items were already in (a) at `43cd61b62`, so their PLAN lines were stale at the base.
  - **Stale before the base, missed by the workflow (one).** "His answers needed before the switch-over" still listed item 308, which was in (a). The hand route rewrote the line without 308 and with its new 339. The workflow left it as it was, although its own queue head now lists its item 337 before the switch-over. So its PLAN and its queue disagree.
  - **A built half before the base, missed by the workflow (one).** Climb batch 23's finding 2: `40302280c`, an ancestor of the base, built the rung workers' half. The hand route wrote that in.
  - **A built half after the base, not a miss (one).** Climb batch 22c's finding 5: the gather's half was built by `7abc5c21c`.
- For the same reason, the hand route moved climb batch 20's finding 13 and climb batch 23's finding 8 as built by `7abc5c21c`. The workflow kept them as "met again", which is right for its tree.

### PLAN: the lines rewritten and added

- **Both routes** rewrote these lines to the same effect:
  - the four lines of "Where we stand";
  - climb batch 24's line as built, and a new line for climb batch 25;
  - the natives line and its sub-lines (173 and 276; 97 of the 104; way 2b's 76 of the 82; the 27 under the probe's Q2 and Q3; the families that wait, without the built ones);
  - the compiled-defects line without `CHOOSE`;
  - the code generator's line with the 52 in the past;
  - a new line for row 862;
  - item 63 cut to a pointer;
  - the `where`-clauses line without the code generator's half;
  - climb batch 24's list for his review, with a line for each new queue item.
- **Placement differs, coverage does not:**
  - rows 864 and 872: the hand route puts them in "The families that wait", the workflow on lines of their own;
  - rows 868 to 870: the hand route on a line of their own in phase 3's candidates, the workflow in the `where`-clauses line;
  - row 701's contract half: the hand route on its own rewritten line, the workflow in the code generator's line.
- **Only the workflow** added lines for the review's findings 3, 4 and 5 under "Work that can start now". On main, `7abc5c21c` built all three, so the difference comes from the replay's base.
- **Question 1's line** points to an open item 327 in the hand route, and to an item 327 in (a) in the workflow (below).

### The review queue: the items filed, by content

The hand route filed items 326 to 343: 16 open, 2 in (a). The workflow filed 326 to 341: 15 open, 1 in (a). Below, the hand route's number comes first and the workflow's second. Kinds: (b) is consequential, (c) routine.

- **Question 2, way 2b and its cost:** 326 and 326, both (b), default as landed.
  - The hand route's "Needed by": before the next batch that moves a binding over `NN32`, `NN64` or `Char`, counted under "a named later piece of work".
  - The workflow's: the next batch, climb batch 25, if it moves such a binding, counted under the next batch.
  - The workflow's count was the more exact one: climb batch 25's record meets item 326 (`CLIMB-BATCH-25.md:45`).
- **Question 1, the two bindings over `String`:** the hand route's 327 is open, (b), "Does he take it?", default as landed, needed by never. The workflow's 327 is in (a), "Answered by a decision of his", citing his "all defaults" of 08:21 UTC on item 310.
  - The batch record says the coordinator answered it at its default (`CLIMB-BATCH-24.md`, "Question 1", "Answered: option 1 ... by the coordinator at 09:4x UTC"), and calls it consequential, since his two sentences split on these two bindings. The review lists it among the items "For him, with defaults" (Part 4, step 5).
  - So the hand route is right. The workflow closes a consequential decision that he has not seen.
- **The forks 1 to 18:** 328 and 328, both (c), as landed, never.
- **The points for his sight:** 329 and 329, both (c), never.
- **Rung G's seven test files outside its lists:** 330 and 330, both (c), as landed, never.
- **The hard-set probe's Q2 (the 27) and Q3 (P-58's bare form):** 331, 332 and 331, 332, all (b), no default on record, needed before the batch that moves any of the 27. They agree.
- **The `CHOOSE` property, false at `m = n = −1`:** 333 (b) and 333 (c), both with no default on record, needed by never. The kinds differ.
- **The compiled `drandom`:** 334 (b) and 334 (c). Both give the audit's default, "(b), with the draft row filed", needed by never. The kinds differ. No route filed that row, and main has none (`facts-extract.sh 'ledger-find:drandom'` finds no row).
- **The systematic check of the natives' shared state:** 335 and 335, both (c).
  - The hand route gives the default "neither part built, as today", and the "Needed by" "before N3's new helpers".
  - The workflow gives "No default on record", needed by never.
  - The audit gives no default for this question (`reviews/natives-shared-state-audit.md`, section 6, "For the report's reader", question 2), so the workflow's default is the faithful one.
- **F.worker.1, NaN or IEEE 754's infinity (row 863):** 336 and 336, both (b), in different sections. The defaults are the same, the row as it is, `CONTESTED`. Needed by never.
- **K.worker.1 (P-73's clause) and gather.1 (P-151 and P-156):** the hand route filed 337 and 342 in (a), told under his rule. The workflow filed no item, and moved their PLAN lines as answered by his rule. Each choice leaves a trace: the queue in one, PLAN-history and `diff.md` in the other.
- **Z.worker.1, walk's `unsigned` of a negative integer:** 338 (b) and 337 (c).
  - Both give the default "none on record; today's values stand".
  - The hand route's "Needed by": with his answer on the integer conversions. The workflow's: before the switch-over, with item 20.
  - The kinds and the "Needed by" differ.
- **S.worker.1, `char` outside the code points (row 857):** 339 (b) and 338 (c).
  - Both keep today's behaviour as the default.
  - The hand route's "Needed by": before the switch-over, when the compiled `char` takes the one library's answer. The workflow's: never.
  - The kinds and the "Needed by" differ. The hand route's reason holds, since the two libraries disagree.
- **Item 63's question, the declaring type by its declaration:** 340 and 339, both (b), no default, needed before `FlatString`'s five bindings move. They agree.
- **G.skeptic.1, row 867:** 341 and 340, both (b), as landed, never. They agree.
- **H.worker.1, the rewrite's limits:** 343 and 341, both (c), with the next rung that edits the rewrite. The hand route's "Needed by" is never, the workflow's is that rung.

### The queue's older items and its head

- **Both routes** moved item 182 to (a), since rung G rewrote row 701, and brought item 310 to climb batch 25 with Question 1's pointer.
- **Only the workflow** brought three more items to the tree. Main still has all three as they were:
  - item 309: "the 428 glue strings" becomes 276, with F-32. This is one of the two items that, by the review, the count of 0 still rests on;
  - item 321: since rung G the code generator compiles a declaration's own `where` clause;
  - item 264: "a minute" becomes "150 s", with F-240.
- **The head.** The hand route counts 303 open items, 105 consequential and 198 routine, with none needed by the next batch. The workflow counts 302 open, 100 consequential and 202 routine, with item 326 needed by the next batch. Each route's `queue-check.py` or recount agrees with its own items.

### INDEX, the two notes and the boot note

- **INDEX.** Both added the same seven lines for `coordinator/postmortem-2026-10-28/`, at the same place. One line differs by backticks round a commit hash, and two lines stand in the other order.
- **`RECORD.md:173` and the map's B.12:** identical changes.
- **The boot note.** The hand route repointed one PLAN citation. The workflow leaves the boot note to the coordinator by design, and lists its slips for the coordinator (`diff.md`, C113).

### What one route did and the other missed

The hand route did these, and the workflow missed them:
- six PLAN lines stale at the base (five answered review-list lines, and the switch-over list);
- the built half of climb batch 23's finding 2 (`40302280c`);
- Question 1 kept open for his review;
- F-34's measurement bounds and its sentence on what it blocks;
- F-240's evidence for climb batch 24;
- shorter F-298 and F-308.

The workflow did these, and the hand route missed them:
- F-220;
- F-309;
- queue items 264, 309 and 321;
- item 326 counted as needed by climb batch 25;
- the audit's unfiled `drandom` row, named to the coordinator;
- the skill's reading of row 814, named to the coordinator. `fortress-repo`'s `references/compiler.md:109` says that the compiled path does not leave out an infix operator that an `except` clause lists. Row 814 and F-281 say that this holds on both paths. Main still has the sentence.

## 4. What went to the curator

- **The workflow held nothing.** It applied 89 of the 117 changes in `owed.md`; 8 owed nothing and 20 were for the coordinator.
- **The workflow's "For the curator" in `diff.md`:**
  - the four POSITIONS changes, with their old and new words, for the landing report;
  - P-156's decision now resting on one reason, as a question;
  - Question 2 first, with its cost;
  - the defaults that the record does not hold (items 331, 332, 333, 335, 339 and 337);
  - each "Needed by" that the workflow set (326; 328 to 330, 333 to 336, 338 and 340 never; 337 before the switch-over);
  - one kind that it set, item 336 as consequential.
- **What the workflow did not name to him:**
  - the routine kinds that its sorter set for items 333, 334, 337 and 338, where the hand route set consequential;
  - item 327's move to (a). The README asks the coordinator to confirm "each kind that the workflow set", and the judge names neither these kinds nor this move.
- **The hand route** put three messages to him on 2026-10-31:
  - 16:21 UTC: the landing, with the decisions taken at their defaults;
  - 16:55 UTC: Question 2's cost, as the review's one new point;
  - 17:29 UTC: the landing report. It named the three POSITIONS changes in words, with P-156's lapsed reason ("in case you want to weigh `I excludes Range[\I\]` again"), the queue items 326 to 343, and the 37 lines moved.
- **What the hand route did not name to him:** the four "Needed by" values that its routing worker set (the design note, section 2, names items 326, 335, 338 and 339), the kinds, or which defaults the record does not hold.
- On what he needs to see, the workflow's list is the more complete, except for Question 1, which it closed.

## 5. The checks on each head

Each check ran on its head in a scratch checkout, with that head's own tools. The tools are the same at both heads (`git diff --stat 85b2998e9 cae6180ac` on them is empty).

- **The hand route, at `85b2998e9`:**
  - `record.py check --base 43cd61b62`: "FACTS.md 241 entries, POSITIONS.md 84 entries; 0 failures; reported: size 2" (196 FACTS and 69 POSITIONS entries over 600 characters).
  - `ledger.py check`: "871 rows, 0 fail the template".
  - `ledger.py landing-check b0f6cd6b7`: "b0f6cd6b7..HEAD: no finding".
  - `check-index.sh`: "notes missing from INDEX.md (0)", "index lines naming a file that does not exist (0)", and one prose path that resolves nowhere, the same on both heads.
- **The workflow, at `cae6180ac`:**
  - `record.py check --base 43cd61b62`: "FACTS.md 242 entries, POSITIONS.md 84 entries; 0 failures; reported: size 2" (197 over 600, F-309 among them).
  - `ledger.py check`: "871 rows, 0 fail the template".
  - `ledger.py landing-check b0f6cd6b7`: "no finding".
  - `check-index.sh`: the same output as the hand route's, apart from the head's hash.
- The workflow also ran its own scripts (`mech-final.md`), and all passed: `words-subset.py` on the three cuts, `plan-moves.py`, `queue-check.py` and `lengths.py`. The hand route had no such checks. Even so, `plan-moves.py` did not find the six stale lines, and `queue-check.py` did not find the move of Question 1. Neither script looks for those.
- The replay's worktree is not clean after the run. `diff.md` was rewritten after the commit to add the two hashes, and six `.done` markers are untracked (`git -C /home/user/fortress-landing-24-replay status --short`).

## 6. The cost and the time

Tokens written, input plus cache creation, one count per message id, by `spend.py`:

- **The six agents in the run's folder** (`wf_9284ce63-4a1/`), 1.45M in all:
  - the sorter, Opus, 87 calls: 370K, against an estimate of 150K to 250K;
  - the write round's driver, Sonnet, 6 calls: 197K, against 60K to 100K;
  - the checker, Opus, 84 calls: 351K, against 120K to 200K;
  - the cold reader, Opus, 12 calls: 207K, against 50K to 80K;
  - the fix round's driver, Sonnet, 5 calls: 68K, against 60K to 100K;
  - the judge, Opus, 62 calls: 260K, against 120K to 200K.
- **The two headless Opus writers,** whose transcripts are outside the run's folder, 0.61M in all:
  - the entries writer (`d9a21b9b`), 67 calls: 206K in its first round, against 120K to 300K, and 50K in the fix round;
  - the routing writer (`dcd2925e`), 135 calls: 327K in its first round, against 200K to 350K, and 23K in the fix round. The two fix rounds together came to 73K, against 50K to 120K.
- **The whole run:** 2.06M. That is 0.36M over the design's top of 1.7M, and 3.3 times the hand route's 0.63M for its two workers (207K and 427K). The hand route's coordinator also wrote up to 0.17M, on Fable, and not all of it was record work.
- **Where the excess is:**
  - The write round's driver waited for the writers in two calls of 9 and 8 minutes, longer than the subagent cache's five minutes. So it wrote its 65K context again twice, 130K of its 197K.
  - Each workflow agent's first call writes about 51K of context: five of the six agents, about 255K.
  - The cold reader's last call came after a generation of 5 minutes 45 seconds, and wrote 104K again.
  - The sorter, the checker and the judge made 62 to 87 calls each on a growing context, with no large cache miss.
  - The writers stayed within their estimates.
- **The coordinator's reading.** `diff.md` is 24.9K characters, against the design's estimate of 5K to 10K.
- **The time.** The run took 65 minutes, from the sorter's first call at 00:59:47 to the judge's last at 02:04:30 UTC on 2026-11-02. The hand route's two workers took 31 minutes side by side, 16:55 to 17:26 UTC on 2026-10-31, after the coordinator's two briefs. The stages:
  - the sort, 18 minutes;
  - the write, 17.5;
  - the check, 16;
  - the fix, 2.5;
  - the judge, 11.
  The design's estimate was 1 to 1.5 hours.

## 7. Verdict, and what to fix before the live run at climb batch 25

**Verdict.**
- The workflow's record is as good as the hand route's overall. It is better in reach: the pass on all the batch's entries, the cross-reading of stale items, and the points named for the coordinator and the curator. It is worse in the quality of the shared entries and in PLAN's older stale lines.
- No difference changes a decision, and both heads pass every check. The errors that matter are on the workflow's side: Question 1 closed without his word, and four kinds set in silence.
- The workflow is fit for the live run once the first four fixes below are in its briefs and scripts. The other four lower the cost.

**The fixes:**
1. **`check.md`, its form rule** ("no date, batch or commit in an entry", line 26). Keep the commit or code state that bounds a one-time measurement, and the sentence on what a fact blocks. Move to the history only how the fact came about. This is `coordinator`'s `references/record.md`: "a measurement bounded to its day", and "what it means for the work, such as what it blocks". The same line belongs in `entries.md`. It caused F-34's and F-32's losses.
2. **An owed sentence that reaches a new batch carries that batch's evidence.** `entries.md` and `check.md`: when a writer extends a claim to the landing's batch, it adds that batch's figures and their source to the entry's Detail, and the checker's fidelity check reads the Detail. This is F-240's case.
3. **Stale PLAN lines from earlier landings.** `evidence.py` or `plan-moves.py`: list each PLAN review-list line whose queue item is already in (a), and each list of item numbers in PLAN, such as "His answers needed before the switch-over", against the queue head's lists. The sorter then files each as stale. This finds the six lines that the replay missed.
4. **A move to (a) "Answered by a decision of his".** In `routing.md`, and as a check in `queue-check.py`: the move cites his word on that item's own question. An answer that the coordinator or a batch took at a default stays open, landed and then reviewed (`coordinator` skill, "The curator's role and decisions", way 2). `judge.md`: "For the curator" names each move to (a) with the answer it cites, and every kind that the sort set where no source states one, routine or consequential. This covers Question 1 and items 333, 334, 337 and 338.
5. **Length.** `judge.md` and `lengths.py`: an entry already past 600 characters that grows is held unless the owed clause alone explains the growth, and the writer first moves its detail to the report or to the skill's part (question 5 of `coordinator`'s `references/record.md`, "What an entry is"). F-298 grew by 97 characters and F-32 by 140. The hand route cut F-298 by 502 while it added the same row.
6. **The drivers' waits.** `drive.sh` or the driver's prompt: wait in steps under five minutes, so that the cache stays warm. This saves about 130K a landing.
7. **The cold read.** It cost 207K and found three points that the checker did not find. Have it write its report in parts, or drop it at a landing (the design's lever, risk 9). `diff.md`: cut the "nothing owed" lines and give PLAN's moves as counts with pointers, toward the design's 5K to 10K.
8. **`final.sh` and the stream.**
   - Leave the worktree clean: no rewrite of `diff.md` after the commit, and the `.done` markers under an ignored `tmp/`.
   - Name the model in the provenance's "by" ("by climb batch 24 landing workflow (Opus)"), since the record names models on purpose.
   - The headless writers ran in a workspace that Claude Code did not trust. It ignored the six allow entries of `.claude/settings.json`, and the entries writer reports that it could not run `record.py` or its scripts (`entries-1.log`). So `record.apply` was first checked by `checks.sh`. This is a permission setting, for the curator to decide (trust the worktree's path, or run the stream from a trusted path). It is not a change to a brief.

## 8. What of the replay's branch to land on main, for the coordinator

Main still has the hand route's text of every file that the two routes share, so a cherry-pick of either commit conflicts. Land each item by `record.py set` or `add` on main, citing this note and the replay's run folder at `cae6180ac`, and edit the queue items by hand.

**Worth landing:**
1. **F-309, the `ForeignJava` reading once per JVM**, as the replay wrote it, under the next free number. It is the probe's own hand-over (`hard-set.md:122`, item (a)), with its evidence (section 4.2, "2a"). It bears on any later way that types a helper by its binding, and on climb batch 25's rung U, which widens the rewrite's transfer.
2. **F-220's one sentence:** "The distance stage and the checker count find no error at the line (F-53)."
3. **Review-queue items 309, 321 and 264**, brought to the tree as the replay did: 276 for 428, the code generator now compiling a declaration's own `where` clause, and 150 s.

**For the coordinator, not from the branch:**
4. File the shared-state audit's draft row for the compiled `drandom` (`reviews/natives-shared-state-audit.md`, section 3.2, `CONTESTED`) with `ledger.py add`. Item 334's default in both routes says it is filed, and no row exists.
5. Give the skill writer `references/compiler.md:109`, which reads row 814 as a gap of the compiled path only. Row 814 and F-281 say that it holds on both paths.

**Optional, and better left to climb batch 25's live run,** which passes over these entries again as the batch moves more bindings:
- F-32's ownership of both counts, with F-299's and F-303's pointers;
- F-24;
- F-181's title;
- F-306's title;
- the line-number cuts in F-281, F-303, F-304, F-305 and F-307;
- F-132's reordering.

**Not to land:**
- F-34, F-240, F-298, F-299 and F-308: the hand route's text is better or equal;
- P-151 and P-156: both texts are within his rule, and the hand route's keeps P-156's reasons;
- item 327 in (a);
- the replay's kinds and its "Needed by" for 335, 337 and 338;
- the replay's PLAN lines: the hand route's stand, and `7abc5c21c` built the review's findings 3 to 5.

**Keep the branch** `record/landing-24-replay` until the curator has read this comparison. This note cites its files at `cae6180ac`.

## What I did not do

- I changed no file in either tree except this note and its INDEX line, and I did not push.
- I ran only the four record checks, `spend.py`, `facts-extract.sh`, `ledger.py show`, `git` and `grep`. The two scratch checkouts are under the session's scratchpad and borrow the main repository's objects through an alternates file.
- A first attempt with `git clone --shared` began to copy objects, so I stopped it and removed it.
- I read no worker's final report from 2026-10-31. Its essentials are in the commit messages, which I cite.

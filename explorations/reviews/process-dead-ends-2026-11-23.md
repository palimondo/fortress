<!-- A review of the Fortress revival's development process for dead ends in its flows of information and decisions: nine stores that fill faster than anyone empties them, each with its measured growth, its cost and a proposed fix, written for the curator on 2026-11-23. -->

# Dead ends in the flows of information and decisions, 2026-11-23

Read on `main` at `6a36bd3e6e`, at 11:3x UTC on 2026-11-23, while climb batch 35's run 1 ran. Nothing was built or run. No transcript was read: the evidence is the skills, the workflows' briefs, the record and git.

## For the curator

A dead end is a store that takes items in and has no working way to let them out.

One cause is behind most of them. Each landing runs a workflow that writes into six stores for you. Nothing but your word takes an item out. The workflow writes about 17 queue items and 11 page items a day. You answered about 3 queue items and read about 3 page items a day. The stores can only grow.

The landing's bookkeeping also costs more than the batch. Climb batch 34b's run wrote 2.0M tokens. The landing work before it wrote 4.1M.

The dead ends, in order of what they cost you:

1. **The review queue.** In 16 days, 266 items went in and about 64 went out. 185 of the 270 open items are defaults that a batch already landed. They are news, not questions.
   - Fix: a landed default is closed when it lands. You get one short report for each landing that says what changed in the language. Only a real question enters the queue, with the work that waits for it.
   - This is your "1" of today, taken one step further: the queue stops holding landed defaults at all. It needs your yes.
2. **The page of `fortress-repo` changes.** It got 172 new items in 16 days. You read 41. Most items are a sentence brought in line with the tree, not a new rule.
   - Fix: the page shows only a new rule or a changed rule. Every other change is one line with its commit. An item leaves at the next landing whether you read it or not.
   - It gives up your sight of each wording change of the worker skill. It needs your yes.
3. **The same item in up to six files.** A waiting item is copied into the batch's record, PLAN's review list, the queue's body, the queue's head, a docket and the boot note. The copies drift. On 11-17 a stale copy made the coordinator ask you a closed question (item 513).
   - Fix: one home for a question. PLAN's 37 review lists and the queue's head section go. A new sort edits the queue; it does not write a new file.
   - It needs your yes, since it changes the review list.
4. **A defect becomes a skill sentence, not a fix.** The landing workflow tells the skill writer to add a sentence for each new trap. Nothing tells a planner to fix the row. Open ledger rows went from 489 to 553 in 18 days. The worker skill grew by a quarter.
   - Fix: P-180, which you decided today, plus three mechanics: the writer adds no trap sentence; the planner gives each rung the open rows of the files that it edits; closing a row lists the skill lines to delete.
   - One point is yours: which rows P-180 binds. Options are below.
5. **Nothing teaches you what landed.** The cleanup of 11-05 wrote 117 landed decisions as "material for a page that he reads". The page was never built. You said on 11-10 that you are not learning much yet.
   - Fix: the landing report of fix 1 is that channel. It replaces the learning file.
   - It is part of fix 1.
6. **Sorts and reviews that end as a file.** The docket of 11-15 found 99 items to close and 11 contradictions. Eight days later they are still in the boot note as owed.
   - Fix: a worker that sorts a store edits the store, on a branch, as today's triage does. The coordinator lands the branch.
   - The coordinator's own change.
7. **The boot note's lists of owed work.** Some lines are 30 days old. The note is for state, and it has no step that does the work.
   - Fix: owed work goes to one housekeeping list. A housekeeping worker empties it at each landing. A line that survives two landings is done or dropped, with one line to you.
   - This is the housekeeping batch that you asked for today. The coordinator's own change.
8. **The held list.** It holds 80K characters and is read at every boot. A line leaves only at a trim.
   - Fix: each line names its exit when it is written: a decision in POSITIONS, a task for the skill writer, or an answer in chat. The line leaves when that happens.
   - It needs your yes, since it changes the held list.
9. **Stores that only cost tokens.** The skill's `sources.md` (357K) is larger than the skill. FACTS (403K) is read whole after a boot. PLAN's "Where we stand" is 15K in five bullets.
   - Fix: provenance goes in the commit message; FACTS is read by query; "Where we stand" is rewritten short at each landing.
   - The coordinator's own change.

One finding would change a decision of yours: P-180's scope (finding 4). Four fixes change how you and the coordinator work, and wait for your yes: 1 (with 5), 2, 3 and 8. The rest are the coordinator's.

## The common cause

The record-landing workflow (`explorations/coordinator/tools/record-landing/`) runs after every landing with "no step of yours between" (`coordinator/references/batch.md`, "The landing", step 4). It is the inflow of five stores at once:

- the review queue and PLAN's review list, by its routing writer (`routing.md`, "A queue item": "Each item for the curator that no file holds becomes one");
- the `fortress-repo` skill, by its skill task and the orientation update;
- the page of `fortress-repo` changes, one item for each skill change;
- FACTS, PLAN's "Where we stand", INDEX.

Each of these stores has an exit that needs the curator: a queue item leaves "only with his word on that same item" (`routing.md`, "A move to (a)"); a page item "stays until the curator says ... that they have read it" (`skill-rewrite.md`, step 7). So the inflow is automatic and runs at the machine's speed, and the exit is manual and runs at one message a time on a phone. No rule sets a size at which the inflow stops.

The cost in tokens written, from the post-batch reviews' own spans (`explorations/reviews/batch-34b-review.md:144-146`, `batch-34-review.md:155`):

- landing work after climb batch 33: 4.80M; after 33b: 4.42M; after 34: 4.05M;
- of 34's 4.05M: the record 1.64M, the orientation update 1.40M, the skill step 0.28M, the page of `fortress-repo` changes 0.50M, the revival page 0.23M;
- climb batch 34b's whole run: 1.97M.

## The measurements

All from git, on `main`. The loop for the queue:

    f=explorations/coordinator/review-queue.md
    for h in $(git log --reverse --format=%h -- $f); do
      echo "$(git log -1 --format=%cI $h) $(git cat-file -s $h:$f) $(git show $h:$f | grep -m1 -o '\*\*Counts\*\*[^:]*')"; done

**The review queue**, open items (consequential + routine) and the file's size:

- 2026-10-20: 179 (49 + 130), 161K
- 2026-10-30: 298 (104 + 194), 438K
- 2026-11-03: 312 (107 + 205), 483K
- 2026-11-05, after the cleanup: 65 (43 + 22), 228K
- 2026-11-10: 185 (74 + 111), 428K
- 2026-11-17: 247 (92 + 155), 566K
- 2026-11-21: 270 (93 + 177), 624K

Since the cleanup the item numbers ran from 354 to 620: 266 new items in 16 days. The exits, from the counts in the headings of section (a) at `bd06be5b80` and at `8965c32e03`: "Answered by a decision of his" 63 to 109 (46, of which 35 by 11-10); "Reviewed by him as landed" 0 to 3; "Answered by a landed fix or a closed row" 43 to 58 (15). The queue's own head counts 185 of the 270 under "Climb batch N's defaults, for his review" (batches 26 to 34). The decision docket of 11-15 sorted the 200 items then open: 14 "now" (8 questions), 32 before the switch-over, 7 for speed, 141 "whenever: nothing waits on you", 6 stale.

**The page of `fortress-repo` changes**, from the saved versions in `<scratchpad>/fortress-repo-page/` (`grep -o '<section' FILE | wc -l`, less the fixed sections) and the scout's `<scratchpad>/page-archaeology/evidence.md`:

- 11-07: 12 items, 55K; 11-10: 173K; 11-16: 261K; 11-19: 135 items, 557K; 11-23: 145 items, 649K; the next item's number is 184.
- His "read" words: changes 37 and 38 on 11-08; up to 41 on 11-23.
- `git log --since=2026-11-05 --oneline -- .claude/skills/fortress-repo | wc -l`: 66 commits, 21 of them a cold read's fixes.

**The `fortress-repo` skill** without `sources.md` (`git ls-tree -r -l COMMIT -- .claude/skills/fortress-repo`): 185K on 11-05, 204K on 11-10, 230K on 11-20, 234K on 11-23. `compiler.md`: 28.5K to 47.8K. `revival-changes.md`: 19.8K to 34.1K, where the orientation workflow's README gives a budget of 8K to 12K. `sources.md`: 258K to 357K.

**The gap ledger** (`ledger.py count`; the same count over `git show COMMIT:explorations/fortress-gap-ledger.md` by status cell):

- 11-05: 894 rows; 259 fixed; 489 open (448 `NEGATIVE-VERIFIED`, 12 `NEGATIVE-BOUNDED`, 29 `CONTESTED`).
- 11-23: 1102 rows; 397 fixed; 553 open (481, 32, 40).
- Open rows by number (`ledger.py heads`): 95 of rows 0 to 199, 94 of 200 to 399, 85 of 400 to 599, 83 of 600 to 799, 109 of 800 to 999, 87 of 1000 on. An old row is as likely to be open as a new one: age does not close rows.

**The other stores** (`git cat-file -s COMMIT:PATH` on 11-05 and on 11-23): PLAN 203K to 325K, of which "Off the path, parked" is 225K and 484 lines, with 37 lists "listed for his review"; FACTS 290K to 403K (253 to 326 entries, so 1.2K an entry against the 600-character check); the held list 57K, 129K on 11-16 before a trim, 81K now; the boot note 18K, rewritten in 1,008 commits. First dates of lines still in the boot note (`git log --reverse --format=%cs -S'WORDS' -- explorations/coordinator/BOOT.md | head -1`): the Fable judge's effort 10-20, P-75 10-23, the letter, `huge-methods.py` and the compression of three skill parts 11-10, the docket's 99 closable items 11-15.

## The findings, sorted by what each needs

### A. Would change a decision of the curator's: an ask, with options

**A1. Which rows P-180 binds (finding 4).** P-180 says that "a batch fixes the defects that make walk and the compiled path behave differently or depart from the specification". 553 rows are open, and a batch opens about 20 and closes about 14 beside its main work (208 opened and 138 fixed in 18 days). The entry does not say which of them a batch takes, so a planner cannot tell when the rule is met. The inventory (`explorations/compile-ladder/plan-35/probes/skill-workarounds.md`) counts 98 skill passages whose fix needs no decision, 17 of them with no row yet.

1. By the files in hand: each rung fixes the open rows that cite the files it edits and need no decision, or says in its report why one stays. The planner lists them in the rung's section. Costs each rung some of its budget; reaches every area in time; needs no extra batch.
2. By the skill: only the 98 passages of the inventory, in housekeeping batches, until the skill teaches no workaround. Then P-180 is met. Bounded and countable; leaves the 400 rows that no passage names as they are.
3. By a balance: a batch may not open more rows than it closes. The strongest reading; it can stop a batch that finds many defects, which punishes finding them.

How they weigh: 2 ends the symptom that he met and stops there; 1 changes the planning for good at a small cost per rung; 3 turns a measure into a gate. Recommendation: 2 first, as the housekeeping batch already in planning, and 1 as the standing rule after it; report 3's balance at each landing and gate nothing on it.

### B. Change how the curator and the coordinator work: for his yes to the exact words

**B1. The review queue holds landed defaults as open items (dead ends 1 and 5).**

- Enters: at each landing, the sorter and the routing writer file every fork taken at a default, every reserved point reached, every difference that the gate's comparison hid, every rewritten line of a team test (`batch.md`, "The checker count and the distance", "Reserved points and repairs"; `sort.md`: "A default that the coordinator or a batch took is not his answer: that item stays open").
- Kept: the queue's body, its head section, PLAN's review list.
- Consumed: by the curator, one per message (`SKILL.md`, way 2: "Put it to the curator later, one per message").
- Exit: his word on that item. In 16 days, 3 items left as "reviewed by him as landed".
- Cost: his attention and trust (his words of 11-02 and of today); wrong asks from stale copies (B3); about 1.6M tokens a landing for the record step; and the real questions, 8 on 11-15, are hidden among 200.
- The mismatch is in the rule, not in its execution. Way 2 treats a default as a debt that only he can clear. His own words of 06:4x on 11-17 treat it as news: "when they land, I'll review them". A review of news needs a report, not a queue.
- **Fix.** (1) In `SKILL.md`, "The curator's role and decisions", way 2 becomes: a decision that can be undone lands and is closed; FACTS states it, with the words that a worker chose it; the landing report names it. (2) The landing report is one message for each landing, a list of at most about ten lines in plain words, each "what a program does differently now", most consequential first, with the FACTS number; the rest is a count. He answers a line by its number if he objects, and that objection is the only thing that opens an item. (3) The queue holds only questions: no default on record, or consequential, each with the named work that needs it. `sort.md` and `routing.md` change their "stays open" rule to "closed as landed, named in the report"; `queue-check.py` refuses a new item whose default is "as landed" unless it is consequential. (4) The 185 landed defaults now open go to the triage on `wip/queue-triage` as "closed as landed", and their accounts into one catch-up report by theme, in place of the learning file.
- Protects: his sight of the questions that the work waits on, and his learning. Costs: he no longer has a list in which each default waits for an explicit yes; a default that he would have overturned stands until he reads its line in a report. Every such default can be undone by definition, so the loss is rework, not a wrong tree.

**B2. The page of `fortress-repo` changes (dead end 2).**

- Enters: one item for each landed change of the worker skill; about 11 a day. Exit: his "read" word.
- The rule's stated purpose is in the coordinator skill: "A change that nobody reads can weaken how you and the curator work together, and nobody notices." That is true of the coordinator skill. A sentence of `compiler.md` brought in line with a closed row weakens nothing between him and the coordinator.
- **Fix.** In `skill-rewrite.md`, step 7, and `record-landing/page.md`: the page of `fortress-repo` changes holds an item only for a new rule or a change of a rule's meaning, which the writer already names as such. Every other change is one line in a list at the page's foot, with its commit's link. An item leaves at the second landing after its own, read or not; git keeps it. With finding C1 the inflow itself falls.
- Protects: his notice of a changed rule. Gives up: the page as a full, pending log of the worker skill. Saves about 0.5M tokens a landing.

**B3. One item in up to six files (dead end 3).**

- The copies: the batch's `RECORD.md`, "Items for the curator"; PLAN, "Climb batch N, listed for his review" (a paragraph each); PLAN, "Pavol's answers"; the queue's body; the queue's head, "When each item is needed" (66K); a docket; the boot note's "What waits for him", whose item 7 names about 40 items.
- They drift, and the cost is wrong asks. On 11-17 the coordinator put item 513 to him as open, from PLAN's "Where we stand" and the queue's head, both stale; the item's own text said "Not open". His words: "tell me whether point 2 isn't you gaslighting me again" (held list, 11-17, 09:0x). The docket of 11-15 lists eleven places "where the queue contradicts the record".
- **Fix.** The `coordinator` skill's rule "Keep one home for each thing" applied to questions: the queue, once it holds only questions (B1), is their one home, short enough to need no head section and no docket. PLAN's 37 review lists move to `PLAN-history.md` in one move and the routing writes no new one; PLAN's "Pavol's answers" becomes one pointer; the boot note's "What waits for him" names the next question only. `routing.md` loses its "line cut to a pointer" and review-list steps.
- Gives up: PLAN as a place to see a batch's items together; `RECORD.md` and the post-batch review keep that view.

**B4. The held list (dead end 8).** It is read at every boot (81K, about 30K tokens). A line leaves when the skill writer has put it into a skill "at the next opportunity", or at a trim (233 lines to 88 on 11-16). Lines hold his words, the coordinator's reading of them, the answer given and the work started, so a line cannot be judged done at a glance. **Fix:** when a line is written it names one exit: a POSITIONS entry (written in the next commit, as `record.md` already asks), a task for the skill writer (filed at once in the writer's task list), or "answered in chat". The line leaves at the first boot-note rewrite after its exit; git and the transcript keep the words. A line with no exit after two landings is put to him as a question or dropped with one line. Gives up: the held list as a diary.

### C. The coordinator's own: no decision changes

**C1. The workflow's rule that makes a trap a skill sentence (dead end 4).** `record-landing/skill-task.md`, step 2: "If the data names a trap or a wall of a row that the part has no sentence for, and a worker who follows the part would fall into it, add one sentence where the part keeps its traps." The cold read adds more: it flags what would "make it search", and the fix of such a flag is a new sentence (21 of 66 commits; his objection of 06:2x on 11-19). Nothing in the planner's brief reads the ledger for rows to fix: a row gets a rung only if the post-batch review's list "for the batch after" or a PLAN line names it, and the inventory found PLAN lines that leave a row "with the next rung that edits" a file, which names no rung. **Fix:** (1) delete that sentence of `skill-task.md`; a worker already lists the rows that cite a file before it edits the file (`fortress-repo`, "Rules for every task"), so the ledger is the home of traps and the skill is not. (2) The planner's brief gains one step: `ledger.py find --open --cites FILE` for each file a rung names, into the rung's section. (3) `ledger.py close N` prints each skill line that names row N, and `landing-check` fails while a closed row is named in the skill; this gives a skill passage its exit. (4) A `CONTESTED` row (29 to 40 in 18 days) is a question for him kept outside the queue: `landing-check` reports a `CONTESTED` row that no queue item names. This carries out P-180 and needs no word beyond A1.

**C2. Sorts and reviews that end as a file (dead end 6).** The learning file of 11-05 (117 items, no page, one commit); the coordinator's work file (53 items, 17 marked skipped, no commit since 11-05); the dockets of 11-10 and 11-15 (the second's 99 closable and 6 stale items still owed in the boot note); the curator's profile, read after every boot and last changed on 10-16. Each is a correct analysis whose application is a second task that nobody starts, because the coordinator starts only work that has a go or that a workflow runs. **Fix:** in `delegating.md`, "What a brief holds": a worker that sorts or audits a store makes the edits on a branch and reports the diff; a file of proposals is asked for only where the edits need the curator's word. Retire the two dockets and the work file into the triage now running. Update the profile from his page comments, or stop reading it.

**C3. The boot note as a backlog (dead end 7).** The skill defines it as "the one home of state". It also holds "Owed by the coordinator" (six groups) and the older list of what waits for him. No step consumes either. **Fix:** owed work moves to one housekeeping list (the work file's form), and the record-landing workflow gains a last stage, or the coordinator launches one Opus worker at each landing, that does every line it can and reports the rest. A line that outlives two landings is done or dropped. His question of 08:4x today, "Can you plan a batch for such housekeeping chores?", is the go for the first one.

**C4. Stores that only cost tokens (dead end 9).** `sources.md` gets a line for each skill change and is read by nobody whole; the commit message can hold the same provenance, and `git log -S` finds it. Keep it only for a rule that comes from the curator's words. FACTS is read whole at the first landing after a boot (about 140K tokens); read what the landing changed, and query the rest. PLAN's "Where we stand" grows a clause at each landing; have the routing writer rewrite it whole within a stated size. The orientation update costs 1.4M tokens a landing to keep a part that is at three times its budget: run its consolidate mode once, after the housekeeping batch has removed the workaround passages.

### D. Confirmed: one line each

- The batch workflow's own flow (planner, Fable review, rungs, skeptics, judges, gather, gate) has consumers at every step; its measures fall from batch to batch.
- The post-batch review's list "for the batch after" reaches the next planner; it is the one path by which a finding reliably becomes work.
- The page of skill drafts works: 42 items, read up to 40, nothing waiting.
- The held list's rule "being on the list answers nothing" is kept in the record.
- His decisions reach POSITIONS in the next commit, with their words in the history (P-178, P-180).

## What this review did not do

- It read no transcript, so it does not know how many asks were put to him each day, only how many items closed.
- It did not open the published pages; the page's counts are from the saved sources in the scratchpad.
- It did not read the batch script (234K), only its manual's sections on the landing and `batch.md`.
- The triage on `wip/queue-triage` was running; its result may already do part of B1 and B3.

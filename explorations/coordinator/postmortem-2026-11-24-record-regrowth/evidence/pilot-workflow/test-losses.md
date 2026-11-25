<!-- What the reader of the clarity workflow's new entries lost in the test of decisions of 2026-11-24 (scenarios 5 and 8), traced sentence by sentence to the old entries, the new entries, POSITIONS, the ledger and PLAN, with the smallest repair, and what this test and the hand writers' test show together; written from the brief `../sorting-map/brief-pilot-test-losses.md`. -->

# What the new entries lost in the test of decisions

## The answer

The new entries lost nothing that a worker needs in the two scenarios where the scores differ. The reader of the new entries (Y, 32 of 36) lost one point in scenario 5 and two in scenario 8. The reader of the old entries (X, 35) lost none there.

- **Scenario 8 is a control.** Its two entries, F-229 and F-151, are not among the pilot's 23, so the two readers had them word for word alike. Neither copy's entries hold the fact that Y missed, the default of the curator's question in PLAN. Row 729 names that PLAN item in both copies. Y quoted the pointer and did not open it.
- **Scenario 5.** The fact that Y missed is that rows 587, 591 and 612 are the rung's work. Both texts of F-141 hold these rows, and so does P-48, which Y printed. The pilot cut one phrase that bears on it: "the curator's to decide" on row 589. In the old text, that phrase set the one held defect apart from the four that need no decision. Y found the same hold through row 589 and still did not name the four. The grader calls this Y's own error, and I agree.

So no entry needs a repair for these losses. The cut in F-141 left one pointer stale: row 589 still says "F-141 holds the repair for the curator". The smallest repair is in that row: "F-141" becomes "PLAN", and the new words fit the row as it stands. The whole run needs the same follow-through. When a cut or a merge moves a claim out of an entry, grep the ledger, PLAN and the review queue for the entry's number.

Over the two tests together (section "The two tests together"), the readers of the new entries trail by six points. None of them traces to a sentence that a consolidation cut. Three of them come from scenarios where both copies had the same text. The gap looks like the readers', not the entries'. With one reader per copy, the tests cannot show this. Two readers on the same copy can.

## How I checked

- **The copies.** The copies are gone (`runs.json`, "note"). Copy p was `2d1614aaee`, and copy q was `2d1614aaee` with the two `final.apply` files applied (`runs.json`, the last run's `applies`). On `main`, `git diff --stat 2d1614aaee HEAD` prints nothing for FACTS, POSITIONS, the ledger, PLAN and the review queue. So I read the old entries, and every file other than the new entries, on `main`.
- **The new entries.** The two apply files hold 23 entries. I compared the `- F-N ` lines with a short Python script. Each of the 26 entries quoted in `test/questions-p.md` matches `main`. In `test/questions-q.md`, six entries match their apply line (F-374, F-240, F-141, F-221, F-279 and F-383), and the other 20 match `main`.
- **What each reader read.** The "Sources" line under each answer in `test/grade/answers-X.md` and `answers-Y.md`. X had the old entries, and Y the new.

## Scenario 5: walk's departures from the instance rule (X 2, Y 1)

1. **What Y missed.** Y decided the four listed behaviours well, and decided (b) and (c) better than X. But it did not name rows 587, 591 and 612, the departures from P-48 that no decision holds, as the rung's work. It ended: "So none of the four is mine to change on this brief's words alone. ... I would ask the coordinator whether the brief meant something beyond these, since 'wherever it departs' meets only held items here" (`answers-Y.md:71`).
2. **The sentences that carried X.** X's (d) reads: "But F-141 and the row say that its repair 'changes which declaration runs, the curator's to decide'. ... The open defects that need no decision belong to this rung by P-180 if they cite my files: rows 591, 612, 616 and 587. That is where the rung's work goes." (`answers-X.md:98`). Three sentences of the record carry that step:
   - the old F-141's list of defects, which ends "a generic passed over at dispatch when its arguments have several minimal common supertypes (row 589), whose repair changes which declaration runs, the curator's to decide";
   - P-180: "Each rung fixes the open ledger rows that cite the files that it edits and need no decision" (`POSITIONS.md:32`);
   - P-48's last sentence, which the grader names: "Rows 587, 591 and 612: three cases in which walk still gives `Bottom`." (`POSITIONS.md:47`).
3. **In the old entries and not the new?** The rows are in both texts. The new F-141 keeps every defect with its row: "two bounds that walk cannot meet (row 591); ... `Bottom` kept for a bound only from above ... (row 612), and for a parameter that only an untyped function expression's result fixes (row 587)". P-48 and P-180 are the same in both copies, and Y printed P-48 (its Sources line).
   - **What the new text cut.** It cut "the curator's to decide" on row 589, so the clause now ends "whose repair would change which declaration runs". The apply note sends the phrase to the history as status words (`chunks/inference/final.apply:34`). Item 1 of the chunk's `queue.md` proposes a review-queue item for it, but neither copy held that item.
   - **Where a reader finds the hold.** Row 589's notes say "F-141 holds the repair for the curator". PLAN lists the row under "Climb batch 9, listed for his review", with "default the base's choice, gated" (`PLAN.md:376`). The learning file keeps it as item 18 at that default (`review-queue-learning-2026-11-05.md:99-101`).
   - **What Y found.** Y reached the hold through row 589: "F-141 and row 589 both say the repair is held for the curator" (`answers-Y.md:69`). So Y had both halves of X's step: the list of defects, and the one defect that is held. It did not take the step, and it did not find P-180. The loss is the reader's.
4. **Repair.** None in F-141.
   - **The rule.** The phrase was cut under the rule of "What an entry is" that an entry "holds no plan and no status: ... no words that it waits for the curator's review" (`coordinator/references/record.md:23`). The rule is right here. The phrase goes stale when the curator answers, and PLAN and the learning file already hold the question with its default.
   - **Its use.** The use was incomplete in one place. Row 589 still names F-141 as the entry that holds the repair for the curator, and Y repeated this: it said F-141 holds what the new F-141 no longer says.
   - **The smallest repair** is in the row. In its notes, "F-141 holds the repair for the curator" becomes "PLAN holds the repair for the curator". The row has 1,188 of its 1,200 characters, and its notes 688 of their 700. The new words are one character shorter, so the change fits without other cuts.
   - **The queue item.** Item 1 of `queue.md` says that the question "has no home but this item". That is not so: `PLAN.md:376` holds it. So do not file that item.

**The key, and the grader's doubts.** Items 1 and 2 of the grader's section 5 say two things about the key: it is wrong on (b), which the curator answered at way 11 (`CLIMB-BATCH-11.md:60`), and it leaves out that row 613 holds (c) "Open for the curator". On those two points, Y is right and X is not: X takes (b) to him again, and says that (c) "has no row of its own" (grades.md:96). The key's rubric lets neither cost X a point. If the key were corrected as the grader says, each reader would have one fault in this scenario, and the one point between them rests on what the rubric weighs. Also, the scenario asks "For each of the four, decide". The rows that the key scores are a fifth item, which the scenario does not ask for.

## Scenario 8: an array of `Number` (X 3, Y 1)

1. **What Y missed.** The default of the question on record. Y wrote "Default: no default on record for row 729 (PLAN, L.worker.1)" (`answers-Y.md:131`), and so cited the very item that gives a default. It also said that the curator "accepted" the bound, though F-151 says only that the bound is the judgement's default (grades.md:153).
2. **The sentence that carried X.** `PLAN.md:478`, L.worker.1 of climb batch 15's rung L: "Default: the text as it stands, the departure listed for a later text rung; its ledger row is 729, `CONTESTED`, the plain array pinned by `ArrayFactoryAbstractNumber`." X quotes it in its draft question (`answers-X.md:183`), though it calls it "review queue item 478" (the grader's one slip, grades.md:151). The way to it is row 729's notes: "no decision says which gives way (PLAN, L.worker.1)".
3. **In the old entries and not the new?** In neither. F-229 and F-151 are not among the pilot's entries, and the two copies quote them word for word alike. Neither entry holds the PLAN item. Row 729 names it in both copies. Y quoted that very clause in its answer to the curator (`answers-Y.md:120`) and did not open PLAN. So this scenario is a control: the same text, and two points of difference that come from the readers alone. In the hand writers' test, both readers found `PLAN.md:478` through the same row (`../pilot-2/test-losses.md`, "What the losses have in common").
4. **Repair.** None.

**The key.** No doubt of the grader's bears on this loss: its section 5 has no item on scenario 8.

## What the losses have in common

In both scenarios, Y had the missed fact in hand, or one pointer away, and stopped short of it:

- In scenario 5, it answered the four items asked, and did not take P-48's `Bottom` rows as the rung's work.
- In scenario 8, it cited "(PLAN, L.worker.1)" and said what that item holds without reading it.

Neither loss traces to a sentence that the pilot cut. Only one cut touches either scenario: row 589's hold in F-141. After that cut, the fact was still reachable through the row, and the reader reached it. What the cut did break is a pointer from outside FACTS into the entry: row 589's "F-141 holds".

## The two tests together

The readers of the new entries scored 33 and 32 of 36, and the readers of the old entries 36 and 35. The two traces account for all six points of the gap:

| Test | Scenario | Points | The entries in the two copies | The fact that was missed |
|---|---|---|---|---|
| hand writers' | 3 | 1 | rewritten (F-374, F-179) | in neither text: PLAN's condition in phase 6 |
| hand writers' | 6 | 1 | rewritten (F-228, F-221) | in neither text: row 510's clause, through a pointer that both texts keep |
| hand writers' | 7 | 1 (on the grader's reading; 0 under the key as written) | the same | in neither text: review-queue item 562 |
| workflow's | 5 | 1 | rewritten (F-141) | in both texts: the rows, and P-48 |
| workflow's | 8 | 2 | the same | in neither text: PLAN's L.worker.1, through row 729 |

So no point traces to a sentence that a consolidation cut. Three of the six points come from scenarios whose two copies held the same text. Both pilots rewrote the entries of the same six scenarios: 3, 4, 5, 6, 9 and 12 (a comparison of the two copies' entry lines in each test). Over those twelve pairs of answers, the two readers differ in three. Over the twelve pairs whose entries were the same, they differ in two. Readers differ about as often where the text is the same as where it differs. That points to the readers, not the entries.

**What the two traces cannot rule out.** Two things lean the other way.

- Both times, the lower reader had the new copy. The unit here is the reader, not the scenario, since one weak reader loses several points. With one reader per copy in each of two tests, the chance that both lower readers had the new copy is one in four, if the copy does not matter.
- Scenario 5 is the one place where a cut lines up with a miss. Three readers had an F-141 that kept "the curator's to decide" on row 589: both readers of the hand test, and X here. All three named the free defects as the rung's work. The one reader whose F-141 lacked the phrase did not. That reader reached the same hold through the row, so the phrase is not the missed fact. But one reader cannot tell a cut's effect from a reader's.
- More generally, a trace sees only facts. It cannot see an effect on how a reader searches.

**What would settle it** is a measure of how far two readers differ on the same copy, which neither test has. Run the same twelve scenarios with two fresh readers on copy p and two on copy q, and have one grader score all four answers blind. If the two readers of one copy differ by about three points, then a three-point gap between the copies is the readers'. Another way is a crossover: each of two readers gets three of the six rewritten scenarios in the new text and the other three in the old, mirrored between them, so that each reader is its own control.

Either way, keep the trace of each loss as the test of the entries. The skill's rule turns on a lost fact ("If something critical is lost, find the middle ground entry by entry"), and a count of points only shows where to trace.

## Beside the losses: pointers into the entries from outside FACTS

When `record.py` merges an entry, it repoints the pointers inside FACTS (`record.py:804-822`), but nothing repoints the ledger, PLAN or the review queue. Two pointers of this pilot are stale for that reason:

- Row 589's "F-141 holds the repair for the curator" (above).
- Review-queue item 188's "F-243 holds climb batch 17's departure" (`review-queue.md:552`). The pilot merges F-243 into F-242 and sends its text to the history.

The grep for each changed entry's number that "What an entry is" asks for after a split (`coordinator/references/record.md:29`) would find both. Run it over the ledger, PLAN and the queue as well as FACTS.

## For the report's form

- **Defects:** none in the tree.
- **Decisions.**
  1. I read copy q's entries from the two apply files and copy p's from `main`, after I checked that the record's files on `main` are unchanged since the copies' base.
  2. For scenario 5, I judge the loss to be the reader's, though one cut phrase bears on it. The reason: the reader reached the same hold through the row that it names, and it had the missed rows in both texts and in P-48.
  3. I propose the rewording of row 589 and write no row, as the brief says.
- **For FACTS:** none.
- **Commands worked out.**
  - A Python comparison of the `^- (F-\d+) ` lines of the filled questions against `main`'s FACTS and the apply files.
  - A Python length check of row 589 with the new words. `ledger.py note --check` sizes an addition to the notes, not a replacement of words in them.
- **Questions for the curator (decisions not taken).**
  1. When a cut or a merge moves a claim out of an entry, should the whole run also repoint each ledger row, PLAN line and review-queue item that names the entry for that claim? The cases are row 589 and item 188, above. Ways: a step in the clarity workflow's judge, or at the coordinator's apply, that greps the ledger, PLAN and the queue for each changed entry's number; or leave the stale pointers, which cost no point in this test. No default on record; `record.py` repoints only inside FACTS. Sources: this report; row 589; `record.py:804-822`.
  2. Should his go for the whole record wait on a measure of how far two readers differ on the same copy (two readers for each copy)? Ways: run it once before the go; or go on the traces, which found no lost fact in either test. No default on record.

<!-- What the reader of the hand writers' new entries lost in the test of decisions of 2026-11-24 (scenarios 3, 6 and 7), traced sentence by sentence to the old entries, the new entries, the ledger, PLAN and the review queue, with the smallest repair; written from the brief `../sorting-map/brief-pilot-test-losses.md`. -->

# What the new entries lost in the test of decisions

## The answer

The new entries lost nothing in the three scenarios where the scores differ. In each, the fact that the reader of the new entries (X) missed was in neither the old nor the new entries. It is a question or a condition of the curator's that is still open, and the record keeps it in PLAN, in the review queue or in a ledger row's notes. The reader of the old entries (Y) found each one by its own search. In scenario 7 the two readers had the same two entries, word for word, so that point of difference is the readers' alone. No entry of the pilot needs a repair for these losses.

The three losses share one weakness, which the record had before the consolidation too. The way from a fact to the curator's open question runs backward: PLAN and the review queue name the row or the entry, but the row that the entry names does not name the item. Where a row names it, as row 729 names PLAN's L.worker.1, both readers found it (scenario 8). The smallest repair is a note on three ledger rows and a rewrite of the notes of two more, not a change to any entry. It is not a condition for the whole run.

Beside the three losses, one rule of the writers' brief cut a part of the entry that "What an entry is" requires: the decision that a fact builds. The test did not measure it. It is at the end, with its repair.

## How I checked

- The copies. Today `/home/user/record-test-p` and `/home/user/record-test-q` differ only in `explorations/coordinator/FACTS.md` and `FACTS-history.md` (`diff -rq --exclude=.git`). The ledger, PLAN, the review queue and POSITIONS are the same in both, and the same as on `main` now (`git diff --stat 2d1614aaee HEAD` on the four files prints nothing). Copy q's `FACTS.md` was written again at 23:47:33, after this test's results were copied (commit `fb98e9265d`, 23:46), and its F-374 is not the hand pilot's. So I read the new entries from the two work trees: copy q had `main`'s FACTS with the 19 entry lines that `/home/user/rec-pilot-1` changes and the 29 that `/home/user/rec-pilot-2` changes or merges away. Each of the 25 entries quoted in `../pilot-hand/test/questions-q.md` matches its tree word for word, and each in `questions-p.md` matches `main` (a Python comparison of the entry lines).
- The entries of the three scenarios. F-374 and F-179 (scenario 3) are round 1's; F-228 and F-221 (scenario 6) are round 2's. F-373 and F-401 (scenario 7) are not among the pilot's entries: they are the same in both copies.
- The old record as a whole. A grep of `main`'s FACTS for "PLAN", "review-queue", "item 562", "item 100", "B.worker.1" and "phase 6" finds none of the three facts in any entry. "PLAN" occurs once, in F-352, on another subject.
- What each reader read: the "Sources" line under each answer in `../pilot-hand/test/grade/answers-X.md` and `answers-Y.md`.

## Scenario 3: a rung on the transaction check of `var` fields (X 1, Y 2)

1. **What X missed.** It did not find the curator's condition on row 641. So it offered him a rung that changes `BaseTask.inATransaction` and `VarCodeGen`: "A measurement rung, possibly followed by a check that costs less but means the same" (`answers-X.md:68`). The plan says that the checks wait until transactional memory is described to him (grades.md:30). The rest of X's answer met the key: the cell's status, the shared variable code, the unmeasured field, walk apart.
2. **The sentence that carried Y.** `PLAN.md:130`, phase 6, the line on row 641: "What the specification's `atomic` requires of a variable no transaction can reach, and how the code generator leaves those out, is to be understood first, and the role of the transactional memory in the design described to him before the checks change: he has said that he has no knowledge of software transactional memory and finds the decisions on it hard to judge". Y: "The plan already says what must come first. ... So I would not cut a code rung for the next batch" (`answers-Y.md:43`), from "`explorations/coordinator/PLAN.md:120-135`" in its sources.
3. **In the old entries and not the new?** No, in neither. The old F-374 ends its sentence "outside `atomic` too (row 641)", the new one "(row 641: the check's measured cost)"; neither names PLAN, and F-179, old or new, does not touch row 641. The key agrees: its row for the condition says "none" in the entry column (`key.md:66`). The pointers do not reach it either. Row 641's notes end "Not measured: four threads, code inside `atomic`, microGPT, a `var` field. Compiled path only ..." and name no PLAN line, and F-374's report, `compile-ladder/rung-atomic-expr-field/REPORT.md`, holds neither "PLAN" nor "curator" (grep). PLAN's line names row 641 but not F-374. A reader reaches it only by a search of PLAN for "641", as Y did. X searched POSITIONS for "transaction, atomic and var field" and found "no decision on record" (`answers-X.md:81`).
4. **Repair.** None in the entries. The difference is the readers'.

The key: no doubt of the grader's bears on this loss. Under a strict reading of the scenario's sources line, X also loses its sources point, since it does not cite PLAN (grades.md:117, :150).

## Scenario 6: an empty sum under walk (X 1, Y 2)

1. **What X missed.** It did not say that whether walk gives a call's argument, or an undirected empty reduction, a type before the switch-over is already the curator's question. It wrote: "Nothing needs to go to the curator: P-78 already decides the written form" (`answers-X.md:142`), which answers another question. Its rewrites, its rows and its "no walk edit" were right.
2. **The sentence that carried Y.** Row 510's notes: "Repair: pass the declared type into the call's inference (`LHSEvaluator`, `BuildEnvironments`); whether before the switch-over (P-12) is the curator's." With P-12 (`POSITIONS.md:12`): "Walk is not changed for this before the switch-over." Y: "Row 510 says whether that comes before the switch-over is the curator's, and P-12 places it at Q-walk ... The question exists already (row 510; P-12)" (`answers-Y.md:95`). The key's own source is `PLAN.md:475`, B.worker.1 and B.skeptic.1 of climb batch 15's rung B: "Accept it as walk's limit until the switch-over, ... or keep it a defect for a later rung that gives walk a static type there? No default on record". Neither reader cited that line.
3. **In the old entries and not the new?** No. Both texts of F-228 hold, word for word, "a clause form that is a call's argument gets no declared type (rows 510, 705)", and so point to row 510. X opened row 510 (its sources: "`'ledger:510'`") and did not use its last clause. Neither text names PLAN's line or P-12. Both cite `compile-ladder/rung-walk-elements/REPORT.md` sections 1, 5 and 10; the question is in its section 12, question 1 (`:408`), which neither cites.
   What round 2 changed in the two entries does not touch the question. F-228 lost "It builds P-48" and gained "The coordinator chose this rule among the ways that a probe measured"; "(F-143)" became "(F-141)"; "Still wrong, each a ledger row" became "Defects". F-221 lost "It builds P-51 under P-49". P-48, P-49 and P-51 say nothing about walk's typing before the switch-over (`facts-extract.sh 'P-48'`, `'P-49'`, `'P-51'`).
4. **Repair.** None in the entries. The sentence was in X's hands through a pointer that both texts keep.

The key, and the grader's doubts. The grader holds that the key should accept `SUM[\RR64\][...]`, P-78's written static argument and row 716's own workaround, which X preferred, and that the open question is also held in row 510's notes with P-12 (grades.md:146). So X's main choice was better grounded than the key's, and its one miss is a sentence that it had read. One doubt of my own: the key says that "row 716 and `PLAN.md`" hold the curator's question (`key.md:137`). Row 716 does not: its notes end "Workaround: write the static argument, or declare the value's type." and name no PLAN line.

## Scenario 7: a rung on `label` and `exit` (X 1, Y 2; 1 and 1 under the key as written)

1. **What X missed.** It did not find review-queue item 562. So it drafted three new questions for the curator, and wrote for row 1040 "Default: none on record" (`answers-X.md:178`). Its reading of row 1040, that the team's tests catch a late exit and so a fix moves row 1041, is right (grades.md:58).
2. **The sentence that carried Y.** `review-queue.md:111`: "**562.** Finding 2 of the review, three answers on `exit` (rows 1042, 1040, 1041 and 890; fork L1; PLAN's item 100): the specification's reading on all three, with walk repaired, or walk's reading on the first two. Default: as landed". With `PLAN.md:150`, item 100. Y: "All three rows are one open question for the curator: review-queue item 562 and PLAN's item 100" (`answers-Y.md:108`).
3. **In the old entries and not the new?** No. F-373 and F-401 are not among the pilot's entries, and the two copies quote them word for word alike. Neither holds the item: F-373 says "the curator has not decided them". The rows that they name, 1040, 1041, 1042 and 890, do not name the item (`facts-extract.sh 'ledger:N'`). F-373 cites its report's "What changed and why" and "Points to report reached"; the questions are under "Questions for the curator" (`compile-ladder/rung-label-exit/REPORT.md:135`). F-401's report names item 562 at `compile-ladder/rung-exit-out-of-atomic/REPORT.md:129` and `:234`, in sections that F-401 does not cite. The item itself names both entries in its "Home" (`review-queue.md:729`: "F-373; F-401"), so a search of the queue for "F-373" or "1040" finds it. Y searched the queue; X did not (its sources name no queue or PLAN file).
4. **Repair.** None in the entries. This scenario is a control: the two readers had the same text, and one point of difference came from the readers alone.

The key, and the grader's doubts. The key says that the specification settles row 1040 and that the rung may bring walk to the compiled answer. The grader holds that item 562 puts 1040 in the curator's question too, and that the team's own tests catch a late exit as `LabelException` (grades.md:145). Under the key as written, both readers score 1 here (grades.md:60, :117), and the loss exists only under the grader's correction of the key.

## What the losses have in common

Each lost fact is the curator's open question or condition on a row: row 641's condition in PLAN's phase 6, row 716's question in PLAN's list for climb batch 15, rows 1040 to 1042 in review-queue item 562. "What an entry is" keeps such status out of an entry ("no PLAN phase or item, no review-queue item"), and the old entries held none of the three either. So the entries cannot carry the reader there; a row or a search must. The reader of the old entries searched PLAN and the review queue by row number; the reader of the new entries searched POSITIONS. Where a row names the PLAN item, both readers got there: row 729's notes say "no decision says which gives way (PLAN, L.worker.1)", and in scenario 8 both readers found `PLAN.md:478` through it and scored 2 (grades.md:65-67). With one reader for each copy, a gap of three points is within what scenario 7 shows two readers differ by on the same text.

The grader proposed one sentence for each of F-374, F-228 and F-373, each naming the PLAN line or the review-queue item (grades.md:127, :132, :133). That would break the rule above, and the rule is right here: the item closes when the curator answers, and the entry would then be stale. The row is where the record already keeps such a pointer (rows 510 and 729).

## The smallest repair, if he wants the way made forward

Not a repair of the pilot: the old record lacked the same pointers. One note per row, in the register of row 729's. `ledger.py note N TEXT --check` (writes nothing) gives the room:

| Row | Note | Room |
|---|---|---|
| 716 | "Whether walk's limit or a defect: the curator's question, no default (PLAN, B.worker.1 of climb batch 15's rung B)." | fits; the notes keep 40 characters |
| 1040 | "The curator's question: review-queue item 562, default as landed." | fits; 10 left |
| 1042 | the same as 1040 | fits; 23 left |
| 1041 | the same as 1040 | does not fit: the notes have 2 characters left, and the note needs 64 more; a `rewrite` must shorten them first, for example by quoting the compiled message without its class name and citing `Evaluator.java` without its folder |
| 641 | "The checks change only after the curator's condition in PLAN, phase 6: what `atomic` requires, described to him." | does not fit: the notes have 5 characters left, and the note needs 108 more; a `rewrite` must first leave the sentence of raw timings ("Measured on `8f0bc7389` at one thread ...") to the report that the row cites, since the claim keeps the 64 % and the 9 to 15 % |

Row 510 already holds its clause. A worker's skill could also say: grep PLAN and the review queue for each row that a brief names. That is a change to the skill, not to the record, and it is the curator's to weigh.

## Beside the losses: the decision that a fact builds

"What an entry is" says that a FACTS entry holds "the decision it builds, by number and subject" (`coordinator/references/record.md:18`), and its own example of a pointer is "It builds P-48, on a type parameter that a call does not fix." (`:9`). The writers' brief says the opposite: "A fact does not point back at the decision that it builds. Leave out a sentence such as 'It builds P-45'." (`../sorting-map/brief-pilot.md:30`). The writers followed their brief. Round 2 left out the sentence in F-59, F-73, F-78, F-87, F-114, F-141, F-173, F-221, F-228, F-273 and F-285 (each old text's "It builds", "It states" or "It follows" sentence, or F-87's "The `label` contexts build P-50"; a comparison of the P-numbers in each old and new line), and round 1 left out "(P-103)" from F-108's sentence that F-102 took (`round-1.md:560`). The query that finds every fact that builds a decision, which "What an entry is" names, loses them:

    facts-extract.sh --check 'P-48+'                               ... pointed to by 9 (F-59, F-78, F-84, F-265, F-141, F-228, F-173, F-271, F-273)
    facts-extract.sh --root /home/user/rec-pilot-2 --check 'P-48+' ... pointed to by 4 (F-59, F-84, F-265, F-271)

No scenario of this test turned on it: no reader needed a fact's decision to decide. It matters when the curator changes a decision and the pass must find the facts that rest on it. Here the brief's rule, not "What an entry is", was at fault. The repair: strike line 30 from the writers' brief before the whole run, and put back each left-out pointer as one clause, such as F-228's "It builds P-48, the instance rule."

## For the report's form

- **Defects:** none in the tree.
- **Decisions.** (1) I took copy q's entries from the two work trees, not from copy q, which now holds other texts (above). (2) For scenario 6, I give row 510 with P-12 as the sentence that carried Y, since Y cited them, and `PLAN.md:475` as the key's source.
- **For FACTS:** none.
- **Commands worked out.** A Python comparison of `^- (F-\d+) ` lines across `FACTS.md` files, to tell which entries each copy and each work tree changed; `ledger.py note N TEXT --check`, to size a proposed note without writing it.
- **Questions for the curator (decisions not taken).**
  - Should rows 641, 716, 1040, 1041 and 1042 name the PLAN line or the review-queue item that holds the curator's question on them? Sources: this report; row 729 and scenario 8 as the working case. Ways: the notes above (two rows need a rewrite); or a line in the workers' skill to search PLAN and the queue by row; or nothing. Nothing keeps today's record.
  - Should the whole run keep the decision that each fact builds, as "What an entry is" says, and drop line 30 of the writers' brief? Ways: keep the pointers (the definition, and `P-N+` works); or keep the brief's rule (shorter entries, and `P-N+` finds fewer facts). The pilot as written follows the brief's rule.

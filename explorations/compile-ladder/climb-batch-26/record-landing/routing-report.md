<!-- The routing writer's report for climb batch 26's record landing: one line per routing change of owed.md, with what was done in PLAN, PLAN-history, the review queue, INDEX and the maps, and its ground. -->

# The routing of climb batch 26's landing

The line numbers are those of the worktree's files before this routing (`61f1c6a93`). Every line that left PLAN or changed in it stands word for word in `PLAN-history.md`, under "## Climb batch 26's landing, 2026-11-05" (the date of `a12ab5c60`) and the heading that it stood under. A check by `git diff` and `comm` finds 28 lines taken out of PLAN, each among the lines that PLAN-history gained, and no line lost from PLAN-history. I could not run `plan-moves.py`, `queue-check.py` or `check-index.sh`: this session may not run `python3` or a shell script. I counted the queue's sections and head by hand (below).

## The changes

- C35, `PLAN.md:9`, "Runs": rewritten, to climb batch 26 and `reviews/batch-26-review.md`, section 5; old text moved. Ground: the review, section 5, 7 of 7 for both programs.
- C36, `PLAN.md:10`, "The live thread": rewritten, to climb batch 26's gate (`a12ab5c60`), 306 and 143, the 304 of 306 helper strings that the stages read (F-321, row 895), the code generator's 38 in 10 kinds on rung L's tree with the merged tree not measured, and P-160's first step (F-318); old text moved. Ground: F-53, F-299, F-32, F-34, F-318; the review, sections 1 and 6.
- C37, `PLAN.md:11`, "Landed": rewritten, climb batches 23 to 26; old text moved.
- C38, `PLAN.md:12`, "Next": rewritten, to the landing, the record-landing and the next batch by the review's "The steps due before the next batch", 5; old text moved. The line says that the ledger's repair waits on items 265 and 267, which the queue holds open.
- C39, `PLAN.md:45`: cut to one line, landed 2026-11-05 at `a12ab5c60`, with its review; old text moved.
- C40, `PLAN.md:47`, N1 and N2: rewritten, the text on items 310 and 340's wait taken out; old text moved.
- C41, `PLAN.md:79`, the phase's close: rewritten, four batches, 23 to 26; old text moved.
- C42, PLAN, phase 4: a new line after climb batch 26's line, P-160's second step, the next batch's, with item 357 beside it. Ground: P-160; `CLIMB-BATCH-26.md`, "After the landing"; the review's Part 4.
- C44 and C48, `PLAN.md:53`, the N5 line: rewritten, with row 368 beside row 874 and the note on the compiled carrier of `FlatString` (fork 23), a FACTS entry once measured; old text moved. Ground: the review's Part 4, "Two notes owed", (ii), and row 368's line.
- C45, `PLAN.md:64`, the names line: rewritten, with the divergence of fork 21 (`NamingCzar.java:488` against `StaticNativeApp.java:70`) and item 360; old text moved. The new FACTS entry of C18 has no number yet, so the line does not cite it (for the coordinator, below).
- C46, PLAN, phase 4: a new line after the code generator's line, row 304's three forms (F-320). Ground: the review's Part 4, row 304.
- C47, PLAN, phase 4: a new line after P-68's line, row 440, with the next rung that edits `QQ`'s comparisons. Ground: the review's Part 4, row 440; F-319.
- C49, PLAN, phase 4: a new line after the line on `System` (`PLAN.md:61`), `getProperty` at an empty name, with `System`'s rung beside row 895. The new ledger row (C32) has no number yet, so the line does not cite it (for the coordinator, below).
- C53, `PLAN.md:138-140`, item 62 and its group heading: moved. A line under "Climb batch 26, listed for his review" names items 310 and 340, default as landed.
- C54, `PLAN.md:142-144`, item 63 and its group heading: moved, as C53; the same line holds it.
- C55, `PLAN.md:148`, item 64: filed as item 355, in (b), "Code generation and the run time"; the PLAN line cut to a pointer; old text moved. Kind consequential, as owed.md sets it. "Needed by" as the batch record's group heading states it.
- C56, `PLAN.md:645`, W.skeptic.1: filed as item 356, in (b), "Overloading and the Meet Rule"; PLAN line cut to a pointer; old text moved.
- C57, `PLAN.md:646`, W.skeptic.2: filed as item 357, in (b), "Walk's checks at load", with finding A's ways (a) and (b); PLAN line cut to a pointer; old text moved.
- C58, `PLAN.md:647`, S.worker.1: filed as item 358, in (c), "The specification's text"; PLAN line cut to a pointer; old text moved.
- C59, `PLAN.md:648`, S.worker.2: filed as item 359, in (c), "Numbers and numerals"; PLAN line cut to a pointer; old text moved.
- C60, `PLAN.md:649`, T.worker.2: filed as item 360, in (b), "Walk's checks at load"; PLAN line cut to a pointer; old text moved.
- C61, `PLAN.md:650`, T.worker.3: filed as item 361, in (b), "The library's generators, strings and comparisons"; PLAN line cut to a pointer; old text moved.
- C62, `PLAN.md:651`, gather.1: left word for word. Its work is the skill writer's; the line goes to PLAN-history once the skill update lands (owed.md).
- C63, `PLAN.md:652`, gather.2: moved. Its fixes are made at this landing: the maps (C84 to C86), items 62 and 63 (C53, C54), the line on row 672 (C76), and P-159's sentence, which is the entries writer's (C27). If C27 does not land, this line comes back.
- C64, `PLAN.md:643`, the group's opening: rewritten in climb batch 25's form, with the items from the review, the pointer to PLAN-history and the sentence on the items with no default on record; old text moved.
- C65: filed as item 362, in (b), "Code generation and the run time", and a line under "Climb batch 26, listed for his review".
- C66: filed as item 363, in (c), a new theme "The library's generators, strings and comparisons", and a PLAN line.
- C67: filed as item 364, in (c), the same new theme, and a PLAN line.
- C68: filed as item 365, in (c), "How batches run", and a PLAN line, as climb batch 25's list has one for its forks.
- C69: filed as item 366, in (c), "How batches run", with finding B's correction and split 7's values, and a PLAN line.
- C70: filed as item 367, in (c), "Code generation and the run time", and a PLAN line.
- C71, review-queue item 310: rewritten. Its "Landed" is now rung T's pairs at the Fable judge's default, option (b) with (c) and the three refinements, row 846 narrowed; "The other way" is the loader's flattening; its "Needed by" is new. It stays open in (b), and its "His word" line stays as written. In the head it moved to the new group of climb batch 26's defaults.
- C72, review-queue item 340: rewritten, "Landed" as rung T built it, "Its cost" and "Home" brought in line, a new "Needed by". It stays open in (b); in the head it moved to the new group.
- C73, review-queue item 331: rewritten in two places: `get` and `javaIndexOf` moved with rung T, and `FlatString`'s `=` and `flatConcat` stay for this item (fork 18, item 363); "Landed" says that all of the 25 but those two still name glue classes. "Home" names climb batch 26's fork 18. The item's question is unchanged.
- C74, review-queue item 284: one sentence added to "Landed": row 804 is fixed since `c41c3d2b0` (F-318), so the measurement is due, and it has not run. The default and the clause's fate are unchanged.
- C75, the queue's head: the counts rewritten (78 open, 49 consequential, 29 routine); "Before the ledger's repair" brought in line with the landing; "Climb batch 26 and the natives' batches" renamed "The next batch and the natives' batches", with 357, 361 and 363 in and 310 and 340 out; 355 and 360 added to "Before the switch-over"; 356 added to "Parked rungs" ("The last three"); a new group, "Climb batch 26's defaults, for his review; no planned work waits on them", with 310, 340, 362, 358, 359, 364, 365, 366 and 367. The section's opening paragraph names items 355 to 367.
- C76, `PLAN.md:392`, climb batch 13's line on row 672: moved (P-159; row 672 closed by `3eabf8435`; item 24 already in (a)).
- C77, `PLAN.md:529`, climb batch 21's X.skeptic.3: moved (row 804 fixed by `c41c3d2b0`).
- C78, `PLAN.md:609`, climb batch 24's Question 1: moved (rung T moved the two bindings; item 327 in (a)).
- C79, `PLAN.md:77`: rewritten to the queue's group "Before the switch-over": items 2, 21, 30, 35, 36, 39, 108, 212, 229, 230, 281, 295, 319, 339, 355 and 360; item 20 named with the integer conversions. "the thirteen of them that it read" became "those of them that it read", since I cannot tell how many of the thirteen stay. Old text moved.
- C84, `map/compile-path-walkthrough.md:469`: rewritten: a local function compiles through `forLetFn` as a closure (F-320).
- C85, `map/compile-path-walkthrough.md:475-476`: rewritten: since rung L a local function compiles as a closure, but for three forms (F-320; ledger 304).
- C86, `map/spec-to-implementation.md:201`: rewritten: `CodeGen.forLetFn` compiles a local function as a closure, but for three forms; status "works (both), but for three compiled forms of local function".
- C87, `INDEX.md:569`: repointed. `PLAN.md:328` at `0fea3898e` was the line on whether a user may extend `Number`, now under PLAN's "Climb batch 9, listed for his review"; the citation names that heading.

## The fix round

Each failure that `check.md` names in my homes, fixed as it corrects it. `mech-1.md` found no failure in them. After the fixes, `git diff 61f1c6a93` still takes 28 lines out of PLAN, each in PLAN-history word for word, and PLAN-history loses none.

- C45: F-322 added to PLAN's names line, and to item 360's "Home".
- C47: PLAN's row 440 line now reads "where the rationals chapter gives `false` and `Unordered` (F-319; row 440)".
- C49: PLAN's `getProperty` line now reads "under walk: at `""` on climb batch 26's base already, and at an `EmptyString` since its rung T". The row is still not filed (C32), so the line has no row number yet.
- C56: item 356's "The other way" now cites `SKEPTIC.md:74` for the yes or no and marks the two readings as the routing's; "Its cost: Not sized by any source."
- C59: item 359 now reads "where the rationals chapter gives `false` and `Unordered` (F-319)".
- C75: the head's line for 358 now reads "No default on record; as landed, it stays."; the group's opening reads "Each landed as it stands, at its default where it has one".
- C76: PLAN-history's opening now reads "by his P-159 of 2026-11-05".
- C85: `compile-path-walkthrough.md` names the varargs form beside the three: "(ledger 304), and a varargs one, which stops at 'Can't compile VarArgs yet' (ledger 624) (F-320)".
- C86: `spec-to-implementation.md:201`: "but for four forms (F-320)", status "interp works / comp partial", rows "304, 624".

## Changes not in owed.md

- `PLAN.md:606`, the header of climb batch 24's list: its last sentence named item 63 under "Pavol's answers", which this routing moved. Rewritten: item 340 landed at the Fable judge's default with rung T and is under climb batch 26's list. Old text moved.
- `PLAN.md:588`, the header of climb batch 23's list: its sentence named item 62 under "Pavol's answers". Rewritten in the same way, to item 310. Old text moved.

## Each "Needed by" that I set

Each is marked "(set by the landing workflow)" in its item.
- 356: the next rung that edits the checker's overloading check.
- 357: before P-160's second step, from the review's way (b).
- 358, 359, 362, 364, 365, 366, 367: no planned work.
- 360: before the switch-over's names batch, from the review's note (i).
- 361: with item 332, before the batch that moves the rest of the 109.
- 363: with item 331.
- 310 and 340: no planned work; each old "Needed by" had passed.

Item 355's "Needed by" is the batch record's ("Before the switch-over's checker reads `System`").

## The kinds that owed.md marks as set by the workflow

Consequential: 355, 356, 360, 361, 362. Routine: 358, 359, 363, 364, 365, 366, 367. Item 357 is consequential by the review's own words ("a finding that would change a decision of his").

## Items moved to (a)

None. Items 310 and 340 landed at a judge's default, not at his word, so they stay open in (b).

## Defaults that the record does not hold

- Items 355, 356 and 358 have no default on record, and say so. For 355 the review's proposal is named as the review's, not as a default.
- Item 356's "The other way" (yes or no on the rule) and "Its cost" are my reading of the question as the skeptic put it; no source states them.
- Item 355's cost of ways (2) and (3) is not sized by any source, and the item says so.

## For the coordinator

- The boot note: `BOOT.md:16`, `:24`, `:32` and `:43` cite PLAN by line number, and those lines have moved (checks.md). The boot note's landing chain wants this run's result.
- The held list: no change found.
- The new FACTS entry for note (i) is F-322; the fix round cites it. The new ledger row for `getProperty` at an empty name (C32) is still not filed. Once it is, add its number to PLAN's line "With `System`'s rung, beside row 895".
- F-322 stands at the end of "The checker and the one library", not beside F-298 and F-299 (`check.md`, C18): move it or leave it.
- Review-queue items 265 and 267 still say, in "Needed by", that PLAN puts the ledger's repair before climb batch 26. That batch landed without it. No source says where the repair now stands, so I left both lines as they were. The head's group line and PLAN's "Next" say that the repair waits on the two items.
- gather.2 left PLAN on the ground that every one of its fixes lands now. P-159's sentence is the entries writer's change C27. If C27 does not land, gather.2 goes back to PLAN.
- I could not run `plan-moves.py`, `queue-check.py` or `check-index.sh` in this session. The mechanical checks of the fix round will run them.

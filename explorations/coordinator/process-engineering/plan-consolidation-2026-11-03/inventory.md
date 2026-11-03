<!-- The inventory that PLAN's third consolidation works from, written 2026-11-03 by an Opus worker at the coordinator's brief, read-only at `8ab0dcd48`: for each of the 504 items of PLAN.md outside "Where we stand" and the rules kept at its end, its verdict (closed; open with its text in another home; open with no other home) with its ground; the review lists of lines 259 to 680 against the review queue's items; the counts and characters per section and PLAN's size after the pass; the shape of the writing pass as a workflow run, with its chunks, tools, checks and an estimate; a proposed cut of "Where we stand"; and the choices the method leaves, each with a recommendation. Nothing in PLAN, PLAN-history or the review queue was changed. -->

# PLAN's third consolidation: the inventory

## How to read it

The base is `main` at `8ab0dcd48` (2026-11-03). Every line number below is a line of `explorations/coordinator/PLAN.md` at that commit (`git show 8ab0dcd48:explorations/coordinator/PLAN.md`). PLAN is 250,775 characters there; the 504 non-blank lines from line 15 to line 702 hold 233,692 of them. An item is one non-blank line, as in the map of the first consolidation (`process-engineering/plan-map.md`, "Units"); a sub-bullet is its own item.

The method is the one PLAN's header comment states (`PLAN.md:1`), which the batch manual's routing step restates (`coordinator/climb-batch-workflow.md:281`, step 2), applied at `ad56edb62` (2026-10-15, from `aa3747948`) and at `19cc0223f` (2026-10-30, from `96c642df9`): a closed item (answered, built or stale) moves word for word to `PLAN-history.md` under the heading it stood under; an open item whose text stands in another home (a review-queue item, a ledger row, a FACTS or POSITIONS entry) is cut to one line with what is asked, its default and a pointer, its old text going to PLAN-history word for word too; an open item with no other home stays as written.

Each line gets one of eight marks, which the counts in section 3 and the appendix use:

- **M**, closed: it moves word for word.
- **S**, closed but kept as a one-line summary, by the precedents named in choice 3 (a built phase's line, a landed batch's line in an open phase).
- **D**, open, but a duplicate of another PLAN line that holds the same text or more: it moves word for word, and the other line stays (choice 6).
- **P**, open, its text in another home, and already one line: it stays.
- **H**, open, its text in another home, not yet cut: its old text moves and a one-line pointer replaces it.
- **X**, split: a closed or cut part moves, an open part with no other home stays (the old line moves whole, as `plan-moves.py` requires, and a new line keeps the open part).
- **N**, open with no other home: it stays as written.
- **K**, section text, a sub-heading line or a rule in force: it stays, sometimes with a citation corrected.

Where a verdict rests on a judgement that the record does not settle, its line says "Judgement:" and gives the reading I lean to.

### The sources and how they were read

- The review queue (`coordinator/review-queue.md`) was parsed into its numbered items: 107 in part (b), 205 in part (c), 312 open, as its own count says (`review-queue.md:7`), and the numbered entries of part (a). A PLAN line's home in the queue is the item it names ("Review-queue item N") or the item whose "Home:" line names the line by its list heading and first words.
- Each ledger row that a line cites was read by its status in `python3 explorations/coordinator/tools/ledger.py heads`, and the rows that decide a verdict by `ledger.py show N`.
- FACTS and POSITIONS entries were read with `explorations/coordinator/tools/facts-extract.sh` (`'F-53'`, `'P-79'`, `'history:P-79'` and so on), and the review lists' asks about POSITIONS text were checked against the drafted corrections applied at `71720ae94` (`reviews/phase3-exit/corrections-draft.md`, items 1 to 12).
- `python3 explorations/coordinator/tools/record-landing/plan-moves.py --root /home/user/fortress --base 8ab0dcd48 --stale-at 8ab0dcd48` prints one LOOK line, for line 192 (`40302280c` names its finding); it cannot see a commit that builds a finding without naming it, such as `888712bb6` for line 188.
- The record's measurements are cited as found and not taken again.

### Rules I applied where the record leaves a choice

These are the defaults of section 6's choices 1, 2, 4 and 5; the counts follow them.

- A line whose queue item is open stays open, even where the item looks settled (items 162 and 187); those items are listed for the queue's cleanup (choice 1).
- A coordinator's call stays open until he reviews it, as `tools/record-landing/queue-check.py` keeps open an item whose default was taken "by the coordinator" or "at its default" (`tools/record-landing/README.md`, the check's paragraph). A line that only tells him something already done, says "nothing waits" and asks nothing is closed, as the queue's part (a) "Information only" treats such lines; a list of points for his sight stays open, as the queue's items 316, 329 and 353 hold such lists open (choice 2).
- A batch record (`coordinator/CLIMB-BATCH-N.md`, `compile-ladder/climb-batch-N/RECORD.md`) or a review is not a home: the method names only the queue, the ledger, FACTS and POSITIONS (choice 4).
- A line whose question is settled but whose leftover sits in another queue item is closed (item 165, with item 267 holding the rest; choice 5).

### Out of scope

"Where we stand" (lines 7 to 14) is section 5's. The three sections after line 702, "The rule for every edit under the sealed tree" (lines 703 to 719), "Testing techniques" (720 to 731) and "Stop conditions" (732 to 736), 15,376 characters with the header and title, are rules kept: the first consolidation kept them unchanged (`ad56edb62`, its message: "the rules kept are unchanged"). The brief names the first of the three as PLAN's last section; the other two are the same kind (choice 9).

## 1. The items, section by section

Each line gives the PLAN line, its first words, what the pass does with it, and the ground. In the batch lists, the lines that point to an open queue item and are already one line are grouped at the end of their list, as line → item.

### The principle for the batches (lines 17 to 21)

3 lines: 1 closed, 0 open with a home elsewhere, 0 open with no other home, 2 section text or rules.

- Line 17 (Every batch lands with the specification, the library and both…): stays. Rule in force: every batch lands with the specification, the library and both paths agreeing. No other home states it as a rule of the plan; it stays.
- Line 19 (Two rules of the batch machinery shape the order: two rungs in…): stays. Rule in force, the two batch rules. Its citation `coordinator/climb-batch-workflow.js:465` no longer reaches batch rule 1, which now stands at `climb-batch-workflow.js:1303`; the writer repoints it. Its last sentence (the wrapping operators and the flattening in different batches, rung O's check) is phase 2's history and can move.
- Line 21 (How a phase-3 batch's content is chosen (the coordinator's…): moves. Closed, stale: it says how a phase-3 batch is chosen from the distance's per-site list, and phase 3 closed at climb batch 22c (`b81d86b75`; PLAN line 39), with the distance at 0 (F-53) and `distance-sites.tsv` holding its header alone (PLAN line 9). Phase 4's batches are planned from the natives' families (PLAN line 48). Judgement: the record does not say whether the piles method stands for phase 4; I lean to moving the paragraph and keeping, if he wants it, one sentence of the general method (no target size, Fable review of the record, a question only where pile 2 needs his word).

### Phase 1. Batch 5: what is decided and shares nothing (line 27)

1 line: 1 closed, 0 open with a home elsewhere, 0 open with no other home, 0 section text or rules.

- Line 27 (Built: climb batch 5's rungs Z (the run-time sizes, design B)…): stays, as a summary. Closed (built: climb batch 5, `ab914b6e0`); already one line that points to `PLAN-history.md`. Kept as the phase's summary line, as the consolidation of 2026-10-30 kept phase 3's paragraph (commit `19cc0223f`).

### Phase 2. Batch 6: the tower flips, the specification with it (line 31)

1 line: 1 closed, 0 open with a home elsewhere, 0 open with no other home, 0 section text or rules.

- Line 31 (Built: climb batch 6 (F, the flat tower; T, the number…): stays, as a summary. Closed (built: climb batches 6 and 6b, `7278e11f7`, `917bb7b32`); one summary line, kept by the same precedent.

### Phase 2b. The repair batch from the conformance reviews (line 35)

1 line: 1 closed, 0 open with a home elsewhere, 0 open with no other home, 0 section text or rules.

- Line 35 (The repair batch from the reviews of the landed batches, which…): stays, as a summary. Closed (built: climb batches 6.5 and 6.5b, `d9c62446e`, `e3214cbf1`); one summary line, kept by the same precedent.

### Phase 3. The checker at a true zero (lines 39 to 41)

2 lines: 1 closed, 1 open with a home elsewhere, 0 open with no other home, 0 section text or rules.

- Line 39 (Built: climb batches 7 to 22c, twenty-one batch lines, with…): stays, as a summary. Closed (built: phase 3 closed at `b81d86b75`); the paragraph written at the consolidation of 2026-10-30 (`19cc0223f`) as the phase's summary. Kept.
- Line 41 (The zero over the fourteen rests on one reading he has not…): stays. Open, home review-queue item 295 (consequential), row 844 (`CONTESTED`); already one line. The same reading stands in "Where we stand" and in line 618; it stays as the phase's one pointer.

### Phase 4. The switch-over (lines 45 to 84)

35 lines: 4 closed, 14 open with a home elsewhere, 15 open with no other home, 2 section text or rules.

- Line 45 (Climb batch 23 (C and W of `coordinator/CLIMB-BATCH-23.md`)…): stays, as a summary. Closed (built: climb batch 23 landed at `df71bc585`; `reviews/batch-23-review.md`). The routing rule keeps a landed batch's own line in its phase as one line (`coordinator/climb-batch-workflow.md:281`, step 2), so it stays while phase 4 is open; see choice 3.
- Line 46 (Climb batch 24 (F, K, Z, S, W, G and H of…): stays, as a summary. Closed (built: climb batch 24 at `25238e60c`). Kept as its one line, as line 45.
- Line 47 (Climb batch 25 (D, P, A, R, U, N and C of…): stays, as a summary. Closed (built: climb batch 25 at `11d2d8764`). Kept as its one line, as line 45.
- Line 48 (Climb batch 26, phase 4's fourth batch, the natives' next…): stays. Open, the next batch, not yet planned; no other home (the boot note names it, but the boot note is no home by the method).
- Line 49 (The natives, first in the phase by P-33's order, and the third…): stays. Open, the natives' step as a whole; its counts stand in F-32 and F-299, but the plan (R5's steps, the gating by the interpreter suite) has no other home.
- Line 50 (N0, the mechanism: built by climb batch 23 (phase 4's first…): moves. Closed (built: N0 by climb batch 23, `df71bc585`; F-298, F-299). Line 45 and line 49 already say it; it moves.
- Line 51 (N1 and N2, A's 154 and B's 59: of these 213, 104 can name their…): is cut to one line. Open: what moved stands in F-299, F-303 and F-305 to F-307; the 7 left wait on review-queue items 327 and 310 (over `String`, row 846) and 340 (`FlatString`'s five); B's 23 with names the prelude gives another helper stand in row 348 and F-32. Cut to one line with those pointers.
- Line 52 (The 109 that cannot name their helper as a bare string: `Char`…): is cut to one line. Open: the 76 and 5 moved stand in F-308, F-313 and F-311; the way for the 25 left is review-queue item 331, the bare form's reach item 332, way 2b's cost item 326; `ZZ32`'s `big` is in item 331. Cut to one line.
- Line 53 (The families that wait on a known obstacle, each with its home…): is cut to one line. Open: each family that waits has its home: review-queue item 354 and row 861 (`Char`'s `asExprString`); items 310 and 327 and row 846 (over `String`); item 340 and row 864 (`FlatString`'s five); row 872; row 849 and item 311 (varargs). Cut to one line of pointers.
- Line 54 (The compiled defects that climb batch 6.5b's rung E gated go…): is cut to one line. Open: rows 523, 524 and 525 (`NEGATIVE-VERIFIED`) hold the compiled powers and name their `XXX` tests, and review-queue item 214 (routine) holds the default. Cut to one line.
- Line 55 (Asked: `widen` of a `ZZ` too large for `ZZ64` (row 502), which…): is cut to one line. Open: review-queue item 20 (consequential) and row 502. It asks the same as "Pavol's answers", item 31 (line 131), word for word in substance; cut to one line, or drop it in favour of item 31 (choice 6).
- Line 56 (N3, C's 158: the 133 that need a new helper, sized at 132…): stays. Open, plan step N3 with its sizes (`perf-probes/prelude/natives-shape.md`, section 3) and what climb batch 25 moved (`reviews/batch-25-review.md`, section 6); row 881 has its own row. No other home for the plan; stays.
- Line 57 (N4, D1's 36, the I/O objects: a Java-backed writer type and…): stays. Open, plan step N4; no other home.
- Line 58 (N5, on the switch-over day, inside the names batch: the…): stays. Open, plan step N5; its rows (874, 578) and P-76 hold parts, item 308 (settled) the world test; the step itself has no other home.
- Line 59 (D2's 42 wait: `NativeArray` with decision A (phase 5; P-84…): stays. Open, D2's 42; P-84, P-85 and F-32 hold the parts; one short line.
- Line 61 (The code generator over the one library (F-34): under the…): is split. Open: the 47 refusals in 11 kinds stand in F-34, and each kind and each new row its ledger row (304, 624, 733, 818, 819, 822, 888 to 892, 875, 832; item 350 for row 890); the plan (the code generator cleared before the prelude goes, P-37; the second zero) has no other home. The row descriptions can be cut to their numbers; the plan sentences stay. Kept after the pass: about 900 characters.
- Line 62 (Row 701, the code generator's refusal of a function or method…): is cut to one line. Open: rows 701, 812 and 867 (`NEGATIVE-VERIFIED`), review-queue item 341, row 307; F-181 for the built half. Cut to one line.
- Line 63 (Row 862, from climb batch 24's rung F: on the compiled path a…): is cut to one line. Open: row 862 and F-304 hold it whole. Cut to one line.
- Line 64 (The limits of the natives' rewrite that stand, probed by climb…): is cut to one line. Open: rows 882, 883, 884 and 886 hold the four limits, review-queue item 347 row 885. Cut to one line.
- Line 65 (Row 321: once the compiled path reads the one library, every…): is split. Open, two halves: row 321 holds the overflow (cut to its pointer); the ask on the compiled tuple rendering, with the judgement's default (`reviews/phase3-exit/judgement.md`, item 14), has no home ("No such row is filed yet"; review-queue item 190 asks a neighbouring question on `Tuple`, not this one). The ask stays as written. Kept after the pass: about 650 characters.
- Line 66 (The components that microGPT imports outside the distance…): is cut to one line. Open: P-33 now holds the rule word for word in substance (`System` by the switch-over, the others before the first program that needs them, at the latest before walk runs the checker; F-290, F-293); the 31 errors measured stand in `coordinator/CLIMB-BATCH-23.md`, section 4. Cut to one line.
- Line 67 (Asked: is `CompilerSystem`, the compiler's fourth library file…): is split. Open, two asks: the first is review-queue item 319 (consequential), cut to its pointer; the second, whether `getProgramArgsPrim` moves by the switch-over or with `NativeArray`, is "Asked beside it, not in the item" and has no home. The second stays as written. Kept after the pass: about 600 characters.
- Line 69 (The names, the switch-over itself (P-33, P-37): the…): stays. Open, the names batch's plan (P-33, P-37, P-38 and rows 348, 381, 383, 320, 41, 813, 814; F-296); the plan has no other home.
- Line 70 (The compiler prelude's own defects retire with it, each gated…): is cut to one line. Open: rows 453, 479, 481, 528 and 529 hold the prelude's defects and P-38 the rule that they retire with it; the `XXXRR32EqualityRungV` respelling is in row 528's line. Cut to one line of pointers. Judgement: low; it is also a step of the names batch, and the writer may keep its first clause.
- Line 71 (`GCD` and `LCM` on the compiled path's `ZZ`, nonnegative and…): stays. Open: P-70 holds the rule and F-314 the helpers that both paths now run; "no row holds `ZZ`'s" compiled half. Short; stays.
- Line 72 (Row 579, the switch-over's library work: against the one…): stays. Open, row 579; already cut to its row at the consolidation of 2026-10-30.
- Line 73 (Row 480: in the one-library world the checker's `case` without…): stays. Open, row 480; already cut to its row on 2026-10-30. Line 253 says the same in fewer words (choice 6).
- Line 74 (From the generic-`distribute` probe…): stays. Open: the generic-`distribute` probe's class-loader death (`perf-probes/generic-distribute/REPORT.md`, section 7) has no row of its own, only "row 495's family".
- Line 75 (Asked: a checked narrowing. After the prelude's checked…): stays. Open, the checked-narrowing ask with the review's default; "No row; his answer is not on record", and the review queue holds no item for it. Stays as written.
- Line 77 (After the names, P-68's library rung for row 330, and beside it…): is cut to one line. Open: P-68 now holds the rung (row 330: one library rung after the switch-over that first counts the interpreter tests whose output changes) and P-54 `QQ`'s ruling. `RR32`'s four sites of climb batch 6.5b's rung V (`FortressBuiltin.fsi:112`, `:114-116`) are not in P-68; the cut line keeps them.
- Line 78 (Q-walk, the walk half of the numeral switch (P-76…): stays. Open, Q-walk's plan (P-76, P-12, P-59; its asks review-queue items 27, 34, 80, 81, 90, 91, 95, 209, 232 and 252, the same list as the queue's "Q-walk" line); the plan has no other home.
- Line 79 (Row 578, for Q-walk (`reviews/batch-8-review.md`, Part 3)…): stays. Open, row 578; already its row's line.
- Line 81 (From climb batch 22c's review, finding 9: rung O's speed pass…): stays. Open, a step for the next rung that edits `OverloadingChecker.scala` (`reviews/batch-22c-review.md`, Part 1, split 7); no row or item holds it.
- Line 82 (His answers needed before the switch-over: review-queue items…): stays. A pointer to the queue's "Needed before the switch-over": its seventeen items match the queue's list one for one (`review-queue.md`, "When each item is needed").
- Line 84 (The phase carries out P-37: one library, the interpreter's, is…): stays. The phase's paragraph. Its citation of review-queue item 306 now names a settled item (part (a), his "all defaults" of 08:21 UTC on 2026-10-31; P-39 holds the rule); the writer may cite P-39 instead.

### Phase 5. microGPT compiles (lines 88 to 102)

14 lines: 0 closed, 8 open with a home elsewhere, 4 open with no other home, 2 section text or rules.

- Line 88 (The model's static types (decision D). As written today…): stays. Open, decision D's line as rewritten on 2026-10-30 (P-87, F-58, `reviews/decision-d-diff.md`; fork 5 is review-queue item 37). The plan has no other home.
- Line 89 (microGPT's array helpers need `I extends Index` before the…): stays. Open, a pointer to "Pavol's answers", item 61 (line 167), which has no other home. Stays as the pointer.
- Line 90 (Row 533, the model's numeral powers refused as an ambiguous…): stays. Open, row 533 and review-queue items 29 and 277; already a pointer line.
- Line 91 (The components that microGPT imports outside the distance…): stays. Open, a pointer to phase 4's line on the components outside the distance (line 66; P-33).
- Line 92 (Row 731's checker gap, a generic big operator's static…): stays. Open, row 731, review-queue item 51, F-285, P-78; already a pointer line.
- Line 93 (Whether the team's `AnyIntegral comprises Integral[\I\] where`…): stays. Open, review-queue item 284 (consequential), row 487.
- Line 94 (The array design: P-85's three questions, open with no default…): stays. Open, the array design's line: P-85, P-84, P-17, P-40 and review-queue items 229, 230, 30, 31, 37 and 320 hold its parts; the line is the plan's statement of the order.
- Line 95 (The read-only matrix trait that P-88 wants for microGPT's…): stays. Open, review-queue item 248 (routine) and P-88; "a gap-ledger row of its own still to be filed".
- Line 96 (`map` and `ivmap` redeclared at `Vector`'s and `Matrix`'s…): stays. Open, the judgement's item 15 (`reviews/phase3-exit/judgement.md`); no row or item.
- Line 97 (The compiled dispatcher receives the call's static return type…): stays. Open, the compiled dispatcher's step (P-48; rows 538, 699, 706); the step has no other home.
- Line 98 (The code generator's other gaps on microGPT's path, each row…): stays. Open, "each row its own home" (rows 304, 340, 537, 540, 495, 496, 499, 497, 322; review-queue item 159). Already a list of pointers.
- Line 99 (The code generator's gaps on generic and functional methods…): stays. Open, rows 559, 564, 565, 594, 566, 571, 573, 643, 724, 815, 624; review-queue item 158.
- Line 100 (His answers needed before microGPT compiles: review-queue items…): stays. A pointer to the queue's "Before microGPT compiles": its 22 items match the queue's list one for one, items 323 to 325 among them (the boot note's leftover that line 98 lacked them is done).
- Line 102 (The phase's order is P-33's: microGPT's static types, the array…): stays. The phase's order (P-33).

### Phase 6. microGPT fast (lines 106 to 111)

6 lines: 0 closed, 0 open with a home elsewhere, 5 open with no other home, 1 section text or rules.

- Line 106 (Unboxed arithmetic chosen by static type in generated code…): stays. Open, decision B (P-17, F-11).
- Line 107 (The transaction checks around mutable variables (row 641): the…): stays. Open, row 641 (`NEGATIVE-BOUNDED`) and `perf-probes/transactions/REPORT.md`; his words of 2026-09-19 on transactional memory are cited from `curator-profile/evidence.md:293`, not from POSITIONS.
- Line 108 (The casts of F-264, one run-time type test per operation, are…): stays. Open, the judgement's item 15 and section 5.3.
- Line 109 (The instance rule's cost in the invariant case, "relatively low…): stays. Open, the POPL 2019 paper's cost note.
- Line 110 (Timing against a pure-Java microGPT, the baseline that P-7…): stays. Open, the pure-Java baseline of P-7 and compiled parallelism.
- Line 111 (His answers needed before microGPT runs fast: review-queue…): stays. A pointer to the queue's "Before it runs fast": items 22, 205 and 250, as the queue lists them.

### Pavol's answers, in the order they are needed (lines 115 to 167)

30 lines: 0 closed, 16 open with a home elsewhere, 2 open with no other home, 12 section text or rules.

- Line 115 (One per message, as usual. Each has its recommendation or the…): stays. Section text.
- Line 117 (Before the switch-over): stays. Sub-heading.
- Line 119 (12. The dead sizes' diff: its 17 vector and matrix operators…): is split. Open, review-queue item 36 (consequential): the 9 unused sizes and row 41 with the switch-over's design. Its first clause (the 17 operators answered at 05:42 UTC on 2026-10-20, P-40, built by climb batch 20's rung A, F-264) is closed and moves; the line is cut to its open half. Kept after the pass: about 260 characters.
- Line 121 (Before batch 7b, raised 2026-09-27): stays. Sub-heading "Before batch 7b, raised 2026-09-27", which review-queue item 41 calls stale (its "Needed by": never). The writer gives item 14 the queue's point, "never", or moves it under "For his review; nothing waits on them".
- Line 123 (14. The sentence batch 5's rung S wrote, that a `where`-clause…): stays. Open, review-queue item 41 (consequential). Already one line. Stays, under a corrected sub-heading.
- Line 125 (Before the switch-over, raised by climb batch 6's rung R…): stays. Sub-heading.
- Line 127 (17. Row 446: a call whose argument's static type lies above a…): stays. Open, review-queue item 35 (consequential), row 446.
- Line 129 (Before the switch-over, raised by climb batch 6.5…): stays. Sub-heading.
- Line 131 (31. `widen` of a `ZZ` too large for `ZZ64`: keep the low 64…): stays. Open, review-queue item 20 (consequential), rows 349 and 502. Phase 4's line 55 asks the same; one of the two can go (choice 6).
- Line 133 (Before the switch-over, raised by climb batch 8…): stays. Sub-heading.
- Line 135 (37. R9 against answer 8: `NN32` coerced into `RR64` (P-75)…): stays. Open, review-queue item 21 (consequential), row 575 (`CONTESTED`), P-75.
- Line 136 (With the coercion, whichever way builds it: the specification's…): stays. Open, a sub-bullet of item 37: the two sentences to reword with the coercion; review-queue item 21 names both passages (`conversions-coercions.tex`, "Principles of Coercion"; `numbers.tex`, "Rational Numbers"). Stays with item 37, or folds into its line.
- Line 138 (Before the switch-over, raised by climb batch 10…): stays. Sub-heading; the blank line after it is a stray.
- Line 141 (45. A generator's size (row 629): built at the judgement's ways…): stays. Open, review-queue item 39 (consequential); row 629 is `FIXED`, F-93 holds what was built.
- Line 143 (Before the switch-over's bindings over `String` move, raised by…): stays. Sub-heading.
- Line 145 (62. W.worker.1 and W.skeptic.1 of climb batch 23's rung W (row…): stays. Open, review-queue item 310 (consequential), row 846.
- Line 147 (Before `FlatString`'s five bindings move onto helpers, raised…): stays. Sub-heading.
- Line 149 (63. W.worker.1 and W.skeptic.1 of climb batch 24's rung W: when…): stays. Open, review-queue item 340 (consequential).
- Line 151 (For his review; nothing waits on them): stays. Sub-heading.
- Line 153 (Item 22, `TotalComparison` extending `StandardMinMax` (P-98)…): stays. Open, review-queue item 109 (routine), P-98.
- Line 154 (Item 30's clause that a declaration the static call selected…): stays. Open, review-queue item 3 (consequential).
- Line 156 (After the switch-over): stays. Sub-heading.
- Line 158 (13. The array questions of phase 5, six forks in the order the…): stays. Open, item 13's head: P-85 and review-queue items 30, 31 and 37.
- Line 159 (2. The bound of `Vector` and `Matrix`: built at the judgement's…): stays. Open, fork 2, review-queue item 31 (consequential), F-151.
- Line 160 (3. A size known only at run time: built at 4a, the judgement's…): is split. Open, fork 3, review-queue item 30 (consequential), F-270. Its second half, row 682's type face since climb batch 17's rung A (A.worker.3, `XXXOpenTypeOverloadChecker.fss:10-11`), is not in item 30; it stands in row 682 (`CONTESTED`) only if the row's notes hold it, which I did not check. It stays until item 30 gains it. Kept after the pass: about 622 characters.
- Line 161 (4. The element width (`RR64` as written, or `RR32`); every type…): stays. Open, fork 4, review-queue item 37.
- Line 162 (5. The model's sized types (decision D): the re-based diff, 21…): stays. Open, fork 5, review-queue item 37.
- Line 163 (6. What puts `double[]` under the generic traits (decision A)…): stays. Open, fork 6, review-queue item 37.
- Line 165 (Before microGPT compiles, raised by climb batch 21…): stays. Sub-heading.
- Line 167 (61. B.worker.3 and B.skeptic.3 of climb batch 21's rung B…): stays. Open, item 61, with no other home: the review queue holds no item for it (its "Before microGPT compiles" list does not name it), and no FACTS or POSITIONS entry states the `I extends Index` change of the model's vocabulary. Stays as written.

### Work that can start now, with no decision (lines 171 to 192)

20 lines: 1 closed, 0 open with a home elsewhere, 18 open with no other home, 1 section text or rules.

- Line 171 (Script, workflow and tool changes that the post-batch reviews…): stays. Section text.
- Line 173 (PLAN's own consolidation. The record consolidation of…): stays. Open: this consolidation itself. It closes when the writing pass lands and moves then, under the pass's heading.
- Line 174 (Climb batch 12's review, finding 8 and measure 5: `STAGE_BLIND`…): stays. Open, not built: `STAGE_BLIND` (`coordinator/climb-batch-workflow.js:746-747`) still lacks `interpreter/env/` and `interpreter/Driver.java`. Its citation `:659-660` no longer resolves; the writer repoints it.
- Line 175 (Climb batch 11's review, finding 8: the gate's `# machine` line…): is split. Open, the gate's `# machine` line (the closing docket, `closing-docket-2026-11-03.md`, item 4 of its smaller items, names it still open). Its last sentence (item 165's routes built, `1ac7028b4`) is closed and moves. Kept after the pass: about 230 characters.
- Line 176 (Climb batch 16's review, finding 2, the review's proposal: the…): stays. Open, the review's proposal; no commit names climb batch 16's finding 2 (`plan-moves.py --stale-at`, its finding test, flags none), and the manual's "Gather" holds no such sentence.
- Line 178 (Climb batch 17's review, finding 7, minor, its second half…): stays. Open: `ProjectFortress/tests/XXXExpectedTypeFixRungT.fss` line 1 is still `(*) explorations/compile-ladder/rung-spec-inference/REPORT.md`. Its second half (the team's comment, `372b9bf6a`) is closed and could move.
- Line 179 (Climb batch 20's review, finding 9, the review's proposal: the…): stays. Open, not adopted: lines 574 and 590 say so.
- Line 180 (Climb batch 20's review, finding 11, the review's proposal…): stays. Open, not built: the skeptic's `kind` enum is still `['correction', 'defect']` (`climb-batch-workflow.js:1090`); its citation `:787` no longer resolves.
- Line 181 (Climb batch 20's review, finding 14, the review's proposal: the…): stays. Open, the review's proposal; no commit names the finding.
- Line 182 (Climb batch 20's review, finding 15, the review's proposal…): stays. Open, the review's proposal; no commit names the finding.
- Line 183 (Climb batch 21's review, finding 2, the review's proposal: the…): stays. Open, the review's proposal; no commit names the finding.
- Line 184 (Climb batch 21's review, finding 3, the review's proposal: the…): stays. Open, the review's proposal; no commit names the finding.
- Line 185 (Climb batch 21's review, finding 10, and climb batch 21b's…): stays. Open, the reviews' proposals for `tools/batch-measures.py`; no commit names them.
- Line 186 (Climb batch 21b's review, finding 6, the review's proposal: the…): stays. Open, the review's proposal; no commit names the finding.
- Line 187 (Climb batch 21b's review, finding 7, the review's proposal: the…): stays. Open, "not built in the manual" by its own words; climb batches 22 to 25 ran the demos at the gather by their records.
- Line 188 (Climb batch 22's review, finding 7, the review's proposal: a…): moves. Closed (built): the script worker's `888712bb6` of 2026-11-03 writes the proposal into the manual's "After the rungs" (a row whose test is the checker count or the distance stage closes on the rung's run, and the gather runs no stage for it; `coordinator/BOOT.md` line 11). `plan-moves.py` cannot flag it, since that commit names climb batch 25's findings, not climb batch 22's finding 7.
- Line 189 (Climb batch 22c's review, finding 2, the review's proposal: a…): stays. Open, the review's proposal; no commit names the finding.
- Line 190 (Climb batch 22c's review, finding 5, the review's two other…): is split. Open in part: the gather's half of the second proposal is built (`7abc5c21c`, the line says so); `888712bb6` makes a planner's base probe the worker's before, near but not the same as the first proposal (one base timing before the launch, each worker citing it). Judgement: I lean to keeping the first proposal and the repair's half open, and moving the built half's sentences. Kept after the pass: about 900 characters.
- Line 191 (Climb batch 22c's review, finding 11, the review's proposal…): stays. Open, the review's proposal for the skeptic brief; no commit names it.
- Line 192 (Climb batch 23's review, finding 2, the review's proposal: a…): is split. Open in part: the rung workers' half is built (`40302280c`) and the skeptics' half too, by `888712bb6` (the skeptic's brief gains its resume line; `climb-batch-workflow.md`, "A resume after a kill"); what stays is the gather's resume on a dirty tree, which waits for his yes on `delegating.md:61`'s wording. `plan-moves.py` flags this line by `40302280c`. Cut to that open half. Kept after the pass: about 500 characters.

### Off the path, parked (lines 196 to 234)

38 lines: 1 closed, 35 open with a home elsewhere, 1 open with no other home, 1 section text or rules.

- Line 196 (None of these blocks a batch or the switch-over. The default is…): stays. Section text. Its "re-approval rows" sentence names row 41 (`POSITIVE-VERIFIED`), which item 12 also carries.
- Line 198 (The library's algebraic layer (P-28), with two matrix ideas…): is cut to one line. Open: P-28 now holds the algebraic layer and both matrix ideas of 13:01 UTC on 2026-10-16. Not in P-28: the identity matrix as a view, which he raised, and "Off microGPT's path: C4 uses no ring property". Cut to one line that points to P-28 and keeps the identity matrix (judgement: the identity-matrix idea has no other home).
- Line 199 (Raised by climb batch 6's rung T, the number chapters, none…): stays. Open, review-queue items 25 and 27 (consequential); row 443.
- Line 200 (The specification's saturating operators, such as ⊞…): is cut to one line. Open: row 348's note holds the wait beside the switch-over's respelling, and P-73 the overflow rule; no batch holds the step. Cut to one line with those pointers.
- Line 201 (Row 331's bare `Nothing` re-gated on type inference, in place…): stays. Open, review-queue item 167 (routine), row 331, P-90.
- Line 202 (Row 360, a numeral within half an ulp of a tie, which rounds as…): stays. Open, review-queue item 28 (consequential), row 360.
- Line 203 (The root README's line on `Specification-1.0-frozen/`…): stays. Open, review-queue items 169 and 170 (routine), P-19, F-165.
- Line 204 (Housekeeping: the remote `wip/` branches (deleted by Pavol on…): is split. Mixed: the branches part is closed (deleted on 2026-10-02; the closing docket, item 21: "The `wip/` branches were deleted on 10-02"; the queue's (a), "Struck on 2026-10-02 and still struck", names the branches, the cleaner pass and the skill-extraction session as struck from the review list); the skill-extraction session is done (the skills exist; `history:P-132`). The cleaner pass and its three rules (who reads a file, the reads of every kept tool, cancelling commits dropped together) have no other home, since P-128 left POSITIONS; they stay. Judgement: the queue's "struck" settles the item as a question for him, not the work; I lean to keeping the cleaner pass's rules as one line. Kept after the pass: about 900 characters.
- Line 205 (Climb batch 7's rung H's repair of the `Condition` site: a…): stays. Open, review-queue item 111 (routine), row 458.
- Line 206 (`LessThan`'s and `GreaterThan`'s `CMP` answer the converse of…): stays. Open, review-queue item 110 (routine), rows 456 and 457.
- Line 207 (`fill` and `tabulate` sit where the array diamond meets…): is split. Open, review-queue item 112 (routine); its second sentence, A.worker.2's question whether the item's wording needs restating, was answered by the queue's restating (line 545: "Restated in the queue"). Cut to its first sentence and the pointer. Kept after the pass: about 230 characters.
- Line 208 (The factories' function forms are named `tabulatedArray1` to…): stays. Open, review-queue item 113 (routine).
- Line 209 (Climb batch 7R's rung J restated row 452's test to a `ZZ32`…): stays. Open, review-queue item 154 (routine).
- Line 210 (Climb batch 7R's rung U respelled over `ZZ32` a third passage…): stays. Open, review-queue item 141 (routine).
- Line 211 (`checkDeclComprises`'s header comment lists the eligibility…): stays. Open, review-queue item 168 (routine).
- Line 212 (The `comprises` check he approved, landed by climb batch 7C's…): stays. Open, review-queue item 13 (consequential), rows 489 and 490, F-72.
- Line 213 (Climb batch 7C's rung X's three wording decisions in the…): stays. Open, review-queue item 139 (routine).
- Line 214 (Climb batch 7R's rung U's two notations: ℤ's factorial as the…): stays. Open, review-queue item 140 (routine).
- Line 215 (Taken as a default by the conversion judgement and listed with…): stays. Open, review-queue item 85 (routine), row 509.
- Line 216 (Climb batch 6.5's rung G's dispatch change answers differently…): stays. Open, review-queue item 159 (routine), row 499.
- Line 217 (Climb batch 6.5's rung P made ℚ's listing extend the four…): stays. Open, review-queue item 142 (routine).
- Line 218 (Climb batch 6.5's rung P stated `narrow` on `ZZ` (rows 349 and…): stays. Open, review-queue item 143 (routine).
- Line 219 (Row 500: three `shift` properties of the integer chapter are…): stays. Open, review-queue item 144 (routine), row 500.
- Line 220 (Climb batch 6.5's rung P showed its first `XXX` walk test red…): stays. Open, review-queue item 155 (routine).
- Line 221 (Climb batch 6.5's rung P's met stop: the overview says a…): stays. Open, review-queue item 145 (routine), row 442.
- Line 222 (A numeral too large for every declaration of a call is refused…): stays. Open, review-queue item 96 (routine).
- Line 223 (How climb batch N's rung I ranks a generic declaration among…): stays. Open, review-queue item 52 (routine).
- Line 224 (Rung I's fallback for a call no attempt keeps: the first…): stays. Open, review-queue item 53 (routine).
- Line 225 (Climb batch N's rung K edited `Init.java`, outside its record's…): stays. Open, review-queue item 160 (routine).
- Line 226 (`Coercions.addSource` under walk leaves a generic `coerce` out…): stays. Open, review-queue item 86 (routine).
- Line 227 (Answer 8's promotion reaches user-declared coercions under…): stays. Open, review-queue item 87 (routine).
- Line 228 (The kinds of static parameter climb batch N's rung T's chapter…): stays. Open, review-queue item 146 (routine).
- Line 229 (Row 325's faces: a numeral converts only into a type that holds…): stays. Open, review-queue item 97 (routine), row 325.
- Line 230 (Climb batch N's rung T's six text decisions in the inference…): stays. Open, review-queue item 147 (routine).
- Line 231 (The compiled path has no strided range (row 514), and against…): stays. Open, review-queue item 108 (routine), rows 514 and 661.
- Line 232 (Climb batch N's gated inference gaps, off the path until the…): stays. Open, review-queue item 54 (routine), rows 506, 507, 511 and 513.
- Line 233 (The team's demos are kept running as the tree changes (P-79): a…): moves. Closed: its work was built by climb batch 21b's rung D (F-283; rows 670, 710, 791, 449, 464 and 468 closed), its rule is P-79, its two questions are settled (review-queue items 43 and 151, by P-79), and its last sentence is stale since P-79 was rewritten at his go (`71720ae94`, review-queue item 289). What is left, row 731's demo half and row 817, is line 240's, word for word in substance.
- Line 234 (Row 845, from climb batch 23's rung C's skeptic: under walk a…): is cut to one line. Open, review-queue item 313 (routine), row 845, F-180, F-298. Line 634 points to the same item; cut to one line or drop in favour of line 634 (choice 6).

### Phase 3's candidates at its end (lines 238 to 257)

17 lines: 0 closed, 15 open with a home elsewhere, 0 open with no other home, 2 section text or rules.

- Line 238 (Moved here word for word at climb batch 22's landing, which…): is split. Section text: its first two sentences (the move of 2026-10-24) stay; its closed asides (row 782 closed with `bb3925156`, row 759 closed with `1bc0a9083`) can go, since rows 782 and 759 are `FIXED`. Kept after the pass: about 550 characters.
- Line 240 (The team's demos (P-79; the demos' entry under "Off the path…): is cut to one line. Open: the built part (climb batch 21b's rung D; F-283) is closed; what is left is row 731's demo half and row 817 (`NEGATIVE-BOUNDED`), held by review-queue items 247 and 51 and by P-79. Cut to one line with those pointers.
- Line 241 (Walk's half of conditional extension (row 774; P-154): out of…): is cut to one line. Open: row 774, P-154 (which now names the wait), review-queue items 76, 153, 224 and 246. Cut to one line.
- Line 242 (Rows 868, 869 and 870, from climb batch 24's rung G's skeptic…): is cut to one line. Open: rows 868, 869 and 870 hold the three defects with their tests. Cut to one line.
- Line 243 (Row 773, the members of a conditional extension scoped to the…): stays. Open, row 773 and review-queue item 177 (consequential).
- Line 244 (Row 808, opened by climb batch 21's rung N: under walk every…): is cut to one line. Open: row 808 holds the defect and its one-line fix as tried; line 565 asks the same. Cut to one line (choice 6 for the pair).
- Line 245 (Row 806, opened by climb batch 21's rung B's skeptic, for the…): is cut to one line. Open: rows 806 and 611 with their tests; review-queue item 260 (routine) for the walk run; rows 779, 780, 787, 788 beside them. Cut to one line.
- Line 246 (A name-binding rung for rows 813 and 814, opened by climb batch…): is cut to one line. Open: rows 813 and 814 with their tests; phase 4's names line (line 69) names them too. Cut to one line.
- Line 247 (Held for his answer: `tint` (row 786; review-queue item 9)…): stays. Open, review-queue item 9 (consequential), row 786 (`CONTESTED`).
- Line 248 (The other candidates of item 18, each with what it waits on…): is cut to one line. Open: a list of rows each its own home, with the full text in `coordinator/CLIMB-BATCH-20.md`, section 4, and `PLAN-history.md`; rows 759 and 775 of it are `FIXED`. Cut to one line that names the record's section and the rows still open.
- Line 249 (Not candidates: rows 698 (the switch-over), 699, 706 and 537…): stays. Open, a short line of rows each with its phase (698, 699, 706, 537, 705). Stays, or folds into line 248.
- Line 251 (Rows on phase 3's road with no batch named, each row its own…): stays. Sub-heading text.
- Line 253 (Row 480: the compiled checker's `case` without a comparison…): moves, as a duplicate. Open in substance, but a duplicate within PLAN: row 480 and phase 4's line 73 say it in full. Moves word for word (choice 6).
- Line 254 (Row 487: the compiled checker checks a `comprises` clause at…): stays. Open, row 487, F-72 and review-queue item 284. Already one line.
- Line 255 (`where` clauses: only the forms the team wrote down are built…): is split. Mixed: the parts built by climb batches 17, 18 and 24 (rows 677, 433, 636, 436's fallback, 634, 748, 749, 750, 753, 771, F-250, F-251, F-255, F-256, F-181) are closed and move; what is left (rows 773, 774, 777, 470, 868 to 870, 812, 701, 331, 436; review-queue items 177 and 178; P-90, P-78) is each in its row or item. Cut to one line of those pointers. Kept after the pass: about 450 characters.
- Line 256 (Keyword parameters on both paths, parked beside `where` clauses…): stays. Open, row 652.
- Line 257 (Row 404, the `covariant` keyword's hole: the compiled checker…): stays. Open, row 404 and P-62; the two expected-failure tests are still owed (row 404's reproducer is `none`). Already one line.

### Climb batch N's first run, listed for his review (lines 261 to 268)

7 lines: 0 closed, 6 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 261, the list's head: stays.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 263 → 89 (c); 264 → 90 (c); 265 → 91 (c); 266 → 92 (c); 267 → 93 (c); 268 → 148 (c). Each stays as it is.

### Climb batch 6.5b, listed for his review (lines 272 to 278)

6 lines: 0 closed, 5 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 272, the list's head: stays.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 274 → 98 (c); 275 → 34 (b); 276 → 99 (c); 277 → 102 (c); 278 → 100 (c). Each stays as it is.

### Climb batch 7b, listed for his review (lines 282 to 301)

19 lines: 0 closed, 18 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 282, the list's head: stays.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 284 → 57 (c); 285 → 58 (c); 286 → 59 (c); 287 → 7 (b); 288 → 60 (c); 289 → 8 (b); 290 → 9 (b); 291 → 133 (c); 292 → 134 (c); 293 → 135 (c); 294 → 136 (c); 295 → 6 (b); 296 → 10 (b); 297 → 79 (c); 298 → 15 (b); 299 → 77 (c); 300 → 61 (c); 301 → 11 (b). Each stays as it is.

### Climb batch 8, listed for his review (lines 305 to 320)

15 lines: 0 closed, 14 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 305, the list's head: stays.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 307 → 2 (b); 308 → 158 (c); 309 → 51 (c); 310 → 94 (c); 311 → 95 (c); 312 → 22 (b); 313 → 160 (c); 314 → 63 (c); 315 → 64 (c); 316 → 6 (b); 317 → 61 (c); 318 → 11 (b); 319 → 114 (c); 320 → 115 (c). Each stays as it is.

### Climb batch 9, listed for his review (lines 324 to 347)

23 lines: 0 closed, 22 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 324, the list's head: stays.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 326 → 80 (c); 327 → 81 (c); 328 → 81 (c); 329 → 4 (b); 330 → 4 (b), 82 (c); 331 → 18 (b); 332 → 149 (c); 333 → 160 (c); 334 → 88 (c); 335 → 15 (b); 336 → 15 (b); 337 → 68 (c); 338 → 23 (b); 339 → 103 (c); 340 → 104 (c); 341 → 116 (c); 342 → 117 (c); 343 → 118 (c); 344 → 119 (c); 345 → 56 (c); 346 → 120 (c); 347 → 160 (c). Each stays as it is.

### Climb batch 10, listed for his review (lines 351 to 363)

12 lines: 0 closed, 11 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 351, the list's head: stays.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 353 → 121 (c); 354 → 121 (c); 355 → 122 (c); 356 → 81 (c), 82 (c); 357 → 69 (c); 358 → 70 (c); 359 → 150 (c); 360 → 56 (c); 361 → 138 (c); 362 → 65 (c); 363 → 160 (c). Each stays as it is.

### Climb batch 11, listed for his review (lines 367 to 377)

10 lines: 1 closed, 8 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 367, the list's head: stays.
- Line 377 (gather.1, climb batch 11's gather: the gap ledger's tool has no…): moves. Closed: its question, `ledger.py`'s missing routes, is review-queue item 165, settled in part (a) by the routes built at `1ac7028b4`; the notes still unwritten wait for the ledger's full pass, review-queue item 267, which holds that rest. Moves (choice 5).

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 369 → 83 (c); 370 → 19 (b); 371 → 44 (b); 372 → 66 (c); 373 → 71 (c); 374 → 105 (c); 375 → 106 (c); 376 → 107 (c). Each stays as it is.

### Climb batch 12, listed for his review (lines 381 to 393)

12 lines: 1 closed, 10 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 381, the list's head: stays.
- Line 391 (gather.2, climb batch 12's gather, beside climb batch 11's…): moves. Closed, as line 377: item 165 settled (`1ac7028b4`), the rest in item 267. Its three rows are settled too: row 642 and row 535 are `FIXED`; row 653's reproducer is item 267's.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 383 → 5 (b); 384 → 137 (c); 385 → 55 (c); 386 → 125 (c); 387 → 108 (c); 388 → 157 (c); 389 → 73 (c); 390 → 161 (c); 392 → 72 (c); 393 → 127 (c), 126 (c), 43 (a). Each stays as it is.

### Climb batch 13, listed for his review (lines 397 to 415)

18 lines: 0 closed, 17 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 397, the list's head: stays.
- Line 399 (How is the checker count's zero read once every api row is 0?…): stays. Open, home review-queue item 162 (routine), by the queue's class (choice 1). Its "Since climb batch 15b the count is 39" is stale, the count being 0 since climb batch 22c (F-53), and item 162 looks settled for the same reason; listed for the queue's cleanup (section 2).
- Line 414 (Extensions and pins of climb batch 13: rung O's lazy `LEXICO`…): stays. Open, home review-queue items 127 and 213 (routine and consequential). Its "(item 38)" names the queue's old number of item 213, which the writer corrects (choice 11), and its `isLeftZero` clause is settled by P-57 (the queue's part (a), "Row 582").

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 400 → 24 (b); 401 → 128 (c); 402 → 129 (c); 403 → 130 (c); 404 → 131 (c); 405 → 132 (c); 406 → 32 (b); 407 → 101 (c); 408 → 152 (c); 409 → 74 (c); 410 → 75 (c); 411 → 84 (c); 412 → 76 (c); 413 → 153 (c); 415 → 160 (c). Each stays as it is.

### Climb batch 14, listed for his review (lines 419 to 434)

15 lines: 1 closed, 5 open with a home elsewhere, 8 open with no other home, 1 section text or rules.

- Line 419, the list's head: stays.
- Line 421 (A.worker.1 and A.skeptic.1 of climb batch 14's rung A: P-51's…): is cut to one line. Open: review-queue item 51 (routine) holds the reach as landed, with the same example (`s: ZZ32 = BIG LAST[j <- lo#n] (3 j)`) and `InferBigOperatorExpectedType`; row 731 the F-bounded refusal. Judgement: item 51 does not put "does P-51 reach this" as a question; I lean to cutting the line to a pointer to item 51 and P-51, and adding the question to item 51 in the queue's cleanup.
- Line 422 (A.worker.2 and A.skeptic.2 of climb batch 14's rung A: the…): stays. Open, no other home: forks 2, 4 and 5 of the argument retry, as built, with fork 5's reading against the patch (`coordinator/CLIMB-BATCH-14.md:91-94`, `rung-argument-context/SKEPTIC.md:54`).
- Line 423 (A.worker.3 and A.skeptic.4 of climb batch 14's rung A: walk…): is cut to one line. Open: row 705 holds the defect and P-59 the closing step (walk takes the checker's static types at the switch-over); the default is the coordinator's call of 2026-10-14, which stays open by the queue's rule (choice 2). Cut to one line.
- Line 424 (A.skeptic.3 of climb batch 14's rung A: should the argument…): is cut to one line. Open: P-51 retries only a call with inferred static arguments, and the chapter says so (`inference.tex:150`); the line asks whether to widen P-51. Cut to one line with P-51 as its home.
- Line 425 (P.worker.1 and P.skeptic.1 of climb batch 14's rung P…): moves. Closed: review-queue item 165, settled (`1ac7028b4`, `ledger.py rewrite` sets a reproducer); the notes left wait in item 267.
- Line 426 (P.worker.2 and P.skeptic.2 of climb batch 14's rung P, for his…): stays. Open, "for his sight only": walk refuses a negative exponent in a size. P-153 rules on integer powers as values, not on sizes, so no entry holds it.
- Line 427 (W.worker.1 and W.skeptic.2 of climb batch 14's rung W: measure…): stays. Open, no row ("no row was written"); `Random`'s two proxies are named among item 18's candidates (line 248; `coordinator/CLIMB-BATCH-20.md`, section 4), which is no home by the method.
- Line 428 (S.worker.1 and S.skeptic.1 of climb batch 14's rung S: the…): is cut to one line. Open: review-queue item 212 (consequential) holds it, with P-146; its home cites this entry. Cut to one line.
- Line 429 (review.2, from climb batch 14's merged-diff review: the box on…): is cut to one line. Open, a step owed: row 706 holds walk's departure, and phase 5's line 97 already names the step ("the next rung that edits Appendix I's `revival-dispatch` names beside row 538"). Cut to one line, or drop for line 97.
- Line 430 (Rung S's three readings, written into normative text with no…): stays. Open, no other home: rung S's three readings written into the specification (`1c32ccffd`); "It holds nothing".
- Line 431 (Team declarations that climb batch 14's rung W changed to…): stays. Open, no other home: the team declarations rung W changed (rows 668 and 669 `FIXED`), the coordinator's call of 2026-10-14. A coordinator's call stays open until he reviews it (choice 2; `tools/record-landing/queue-check.py`'s rule).
- Line 432 (Rung A changes the value of a compiled program that ran before…): stays. Open, no other home: rung A's changed value and its paragraph of the inference chapter (`0856f3e6a`).
- Line 433 (Two pins of the revival's tests that climb batch 14 changed…): stays. Open, no other home: two pins changed. Its last clause, row 535's reproducer cell naming the old path, is now settable by `ledger.py rewrite` (item 165).
- Line 434 (A specification file outside rung P's section, which the batch…): stays. Open, no other home: the revision box of `future.tex` (`3ba2d005f`).

### Climb batch 15, listed for his review (lines 438 to 461)

23 lines: 4 closed, 4 open with a home elsewhere, 14 open with no other home, 1 section text or rules.

- Line 438, the list's head: stays.
- Line 440 (Call 1, below: walk fixes an unwritten reduction's type…): is cut to one line. Open: review-queue item 210 (consequential) holds call 1, with P-48's history; line 453 is the same call in full. Cut to one line, merged with line 453.
- Line 441 (B.worker.1 and B.skeptic.1 of climb batch 15's rung B: an empty…): stays. Open: row 716 (`NEGATIVE-VERIFIED`) holds the defect, not the question (walk's limit until the switch-over, or a defect for a later rung); no default on record; no queue item.
- Line 442 (Calls 2 and 5, below, as built: a declared type reaches a local…): moves, as a duplicate. A summary of calls 2 and 5, which lines 454 and 457 state in full. Moves as a duplicate within PLAN (choice 6).
- Line 443 (C.skeptic.2 of climb batch 15's rung C: may the analyzer's…): stays. Open, no other home: the normal form's change for row 712, no default beyond the expansion kept.
- Line 444 (C.skeptic.1 of climb batch 15's rung C, with X.worker.1…): stays. Open: row 713 (`CONTESTED`) holds walk's refusal; the two questions (P-157's reach for the checker; whether walk follows) are in no queue item.
- Line 445 (L.worker.1 of climb batch 15's rung L: the specification's…): stays. Open: row 729 (`CONTESTED`) holds the departure; the question to him, the text's sentence or the library's bound, is in no queue item.
- Line 446 (Rung L's witness, not the probe's patch: `array1` and `array2`…): stays. Open, no other home (row 721 holds walk's plain array; the team lines changed are the point).
- Line 447 (L.worker.2 of climb batch 15's rung L: a key repeated with the…): stays. Open, no other home: a map comprehension's repeated key with the same value.
- Line 448 (Rung O's choices: an unreadable covering body counts as none…): stays. Open, no other home: rung O's choices (`59b1d0a4d`).
- Line 449 (`FlatString`'s api declares exactly the pair row 726 names…): moves. Closed, stale: climb batch 19's rung S dropped the pair from `FlatString`'s api (F-259; line 529, review-queue item 191), and row 726 is `FIXED` since climb batch 21b's rung C.
- Line 450 (B.worker.2 and B.skeptic.2 of climb batch 15's rung B: the team…): stays. Open: the team's disabled fusion; `coordinator/map/dormant-code.md` does not name `nestedGeneratorOpportunity` (grep: none), so the review's default is not done.
- Line 451 (Calls 3, 4 and 6 to 9, below, for his sight: row 685 closed and…): moves, as a duplicate. A summary of calls 3, 4 and 6 to 9, which lines 455 to 461 state. Moves as a duplicate within PLAN.
- Line 452 (gather.1 of climb batch 15's gather: seven of the records'…): moves. Closed: review-queue item 165 settled (`1ac7028b4`); the notes still unwritten wait in item 267, and their texts stand in each batch's `RECORD.md`, "Ledger notes not written". Moves (choice 5).
- Line 453 (Call 1, rung B: walk fixes an unwritten clause form's parameter…): is cut to one line. Open: review-queue item 210 (consequential). Cut to one line.
- Line 454 (Call 2, rung B: way 7 reaches a declared variable or return…): stays. Open, the coordinator's call 2 as built; row 510 holds the general repair. Stays (choice 2).
- Line 455 (Call 3, rung L: row 685 closed with its claim and class…): stays. Open, the coordinator's call 3, built (`a0f839ad7`); rows 685 and 720 are `FIXED`. Stays while calls wait for his review (choice 2); closed if he takes the calls.
- Line 456 (Call 4, rung C: the checker probe's sibling patch in the…): stays. Open, the coordinator's call 4, built (`f237148ac`); row 711 `FIXED`. As line 455.
- Line 457 (Call 5, rung B: walk's collector in the one library is an…): stays. Open, the coordinator's call 5, built. As line 455.
- Line 458 (Call 6, rung B: item 53, `__bigOperator`'s `body(i)` typed…): moves. Closed: review-queue item 17 is settled in part (a) by P-48 ("applied by climb batch 15's call 6 and built by its rung B, `20474c144`"); rows 703, 645, 646 and 662 are `FIXED`.
- Line 459 (Call 7, rung L: row 704, `IntMap`'s `UPLUS` by the library's…): stays. Open, the coordinator's call 7; row 704 `FIXED`. As line 455.
- Line 460 (Call 8, rung O: row 708, walk refuses where its search for a…): moves. Closed: the call follows P-147 ("P-147 has walk agree with the checker"), and row 708 is `FIXED`. Judgement: it is still a coordinator's call; I lean to closed, since his decision P-147 dictates it.
- Line 461 (Call 9, rung O: rows 707 and 709, PLAN's lines for the next…): stays. Open, the coordinator's call 9; rows 707 and 709 `FIXED`, 726 `FIXED`, 725 open. As line 455.

### Climb batch 15b, listed for his review (lines 465 to 467)

2 lines: 1 closed, 0 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 465, the list's head: stays.
- Line 467 (Q1: land the walker split as its own rung ahead of row 680's…): moves. Closed, stale: how to land the walker split and row 680's line; both landed under one gate at his word (`compile-ladder/climb-batch-15b/RECORD.md`), so the only other way now is a history rewrite. Judgement: a coordinator's call; I lean to closed.

### Climb batch 16, listed for his review (lines 471 to 479)

8 lines: 2 closed, 3 open with a home elsewhere, 2 open with no other home, 1 section text or rules.

- Line 471, the list's head: stays. Its "then the timing rule the review proposed" is stale: the timed pairs were dropped at his word (`PLAN-history.md`, "The timed pairs of the walk check dropped, 2026-10-23"), and review-queue item 239 still names this list as its PLAN home.
- Line 473 (Walk's `if` takes a `Maybe` clause as true or false (gather.2…): is cut to one line. Open: F-239 states walk's `if` on a `Maybe` and row 746 the departure. Cut to one line.
- Line 474 (A static argument that breaks the callee's bound is reported…): is cut to one line. Open: F-237 states the report once at each call. Cut to one line.
- Line 475 (The checker's top-level overload check reads a component's own…): moves. Closed (built): climb batch 17's rung C (`091ec54df`), row 739 `FIXED`.
- Line 476 (Row 488's last moving error is row 737 (S.worker.2…): moves. Closed (built): row 737 repaired by climb batch 17's rung C (`091ec54df`), row 737 `FIXED`, row 488 its duplicate.
- Line 477 (The long-method guard lists five methods that nothing checked…): is cut to one line. Open: F-236 states the long-method guard and its list. Cut to one line.
- Line 478 (The coordinator's calls 1, 2, 3 and 5 as built…): stays. Open, the coordinator's calls 1, 2, 3 and 5 as built. Stays (choice 2).
- Line 479 (The batch's points, for his sight…): stays. Open, the batch's points for his sight; no queue item (the queue holds such points only from climb batch 19 on).

### Climb batch 17, listed for his review (lines 483 to 497)

14 lines: 4 closed, 2 open with a home elsewhere, 7 open with no other home, 1 section text or rules.

- Line 483, the list's head: stays.
- Line 485 (L.worker.2 and L.skeptic.2 of climb batch 17's rung L…): stays. Open, no other home: `MIMapReduceReduction` kept, retyped or removed.
- Line 486 (A.worker.1 of climb batch 17's rung A: the checker opens a…): is cut to one line. Open: row 751 holds the defect; the line asks only when to repair it. Cut to one line.
- Line 487 (A.worker.2 of climb batch 17's rung A: the parent rule is…): stays. Open: row 752 holds the limit, not the question which way the two kinds agree.
- Line 488 (A.skeptic.1 of climb batch 17's rung A, with the merged-diff…): is split. Open in part: the judge's fork is closed, built the other way by climb batch 18's rung K (row 771 `FIXED`, `396e4ed8d`; F-256), and moves; the main question (do the team's other commented clauses become live under P-151) has no home, but for `AnyIntegral`, review-queue item 284. Kept after the pass: about 1100 characters.
- Line 489 (A.skeptic.2 of climb batch 17's rung A: both extender checks…): is cut to one line. Open in part: the checker's half is `FIXED` (row 753, `396e4ed8d`); walk's half is row 754. Cut to one line.
- Line 490 (G.skeptic.1 of climb batch 17's rung G: the team's expected…): stays. Open, no other home: the team's `XXXGenericOverload` tests under P-45.
- Line 491 (C.worker.1 and C.skeptic.1 of climb batch 17's rung C: neither…): stays. Open: row 767 holds the deferred defect; the question, a solver of sizes, is in no item.
- Line 492 (C.worker.2 and C.skeptic.2 of climb batch 17's rung C: where a…): stays. Open, no other home: no api declaration taken where several fit.
- Line 493 (C.skeptic.3 of climb batch 17's rung C: row 737's rule of equal…): stays. Open, no other home: row 737's rule and row 769.
- Line 494 (gather.2 of climb batch 17's gather: row 589's claim names…): moves. Closed: row 589's claim now names `g[\T extends Fruit\](a: T, b: T)` (ledger row 589), the edit of the claim that the line asked for.
- Line 495 (gather.3 of climb batch 17's gather: the gather marked P-45's…): moves. Closed, stale: the scrape of 2026-10-22 took every "Still to build" out of POSITIONS (`382289832`), so P-45 and P-151 hold no such line now.
- Line 496 (gather.4 of climb batch 17's gather, for his sight: rung L's…): moves. Closed: review-queue item 174, "a commit of `main` that is red alone", is settled in part (a) at its default.
- Line 497 (judge-review.3 of climb batch 17's merged-diff review, for the…): moves. Closed: F-252 now defines a declaration with static parameters of its own in the narrower words the judge recommended. Judgement: I read the entry, not its history; the writer checks `facts-extract.sh 'history:F-252'` before the move.

### Climb batch 18, listed for his review (lines 501 to 513)

12 lines: 1 closed, 10 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 501, the list's head: stays.
- Line 512 (gather.1 of climb batch 18's gather: eleven of the records'…): moves. Closed: item 165 settled; its notes' texts are in `compile-ladder/climb-batch-18/RECORD.md:140-155` and their writing in item 267.
- Line 513 (gather.3 of climb batch 18's gather: row 539's claim quotes…): stays. Open, home review-queue item 187 (routine), by the queue's class (choice 1). Its ask is done: row 539's claim now quotes "fails the Meet Rule" (ledger row 539), so item 187 looks settled; listed for the queue's cleanup.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 503 → 175 (b); 504 → 176 (b); 505 → 177 (b); 506 → 178 (b); 507 → 179 (c); 508 → 180 (c); 509 → 181 (c); 510 → 184 (c); 511 → 185 (c). Each stays as it is.

### Climb batch 19, listed for his review (lines 517 to 535)

10 lines: 0 closed, 7 open with a home elsewhere, 2 open with no other home, 1 section text or rules.

- Line 517, the list's head: stays.
- Line 519 (P.worker.1 and P.skeptic.1 of climb batch 19's rung P: `tint`…): is cut to one line. Open: review-queue item 9 (consequential) holds `tint` and names this entry as a home; row 786. Not yet cut: the line does not name its item. Cut to one line.
- Line 521 (gather.2 of climb batch 19's gather: the specification declares…): is cut to one line. Open: review-queue item 190 (consequential), "`extends Any` read as `Object`", whose home is this entry and the review's entry on it (line 527). Cut to one line.
- Line 523 (review-routed.1 of climb batch 19's merged-diff review, for the…): stays. Open, a test owed: row 789's reproducer is still `none`. Its condition, a `ledger.py` route for a reproducer (item 165), is met since `1ac7028b4`. No other home.
- Line 525 (review-routed.2 of climb batch 19's merged-diff review, for the…): stays. Open, a test owed: row 786's reproducer is walk's test only. No other home.
- Line 527 (The post-batch review on gather.2…): is cut to one line. Open: review-queue item 190 (its home: "gather.2 and the post-batch review's entry on it"). Cut, merged with line 521.
- Line 529 (review.1 of climb batch 19's merged-diff review: rung S dropped…): is cut to one line. Open: review-queue item 191 (routine). Cut to one line.
- Line 531 (Rung P's words in…): is cut to one line. Open: review-queue item 192 (routine). Already short; cut to the queue's form.
- Line 533 (The record's sixteen forks, taken at their defaults…): is cut to one line. Open: review-queue item 193 (routine). Cut to one line.
- Line 535 (microGPT's APL port stops at the same compile phase with a new…): is cut to one line. Open: review-queue item 194 (routine). Cut to one line.

### Climb batch 20, listed for his review (lines 539 to 554)

15 lines: 3 closed, 11 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 539, the list's head: stays.
- Line 544 (A.worker.1 and A.skeptic.1 of climb batch 20's rung A: which…): moves. Closed: rows 793 and 794 are `FIXED` (climb batch 21's rung N, `ff19305cc`), so which batch fixes them is moot.
- Line 547 (gather.1 of climb batch 20's gather: five ledger notes refused…): moves. Closed: item 165 settled; the rest in item 267.
- Line 554 (review.1, and gather.3 with review.2, which held the push…): moves. Closed: answered by him at about 11:50 UTC on 2026-10-20 (P-79), and I.worker.2 built by climb batch 21b's rung D (row 791 `FIXED`); the line says so.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 541 → 195 (c); 542 → 196 (c); 543 → 197 (c); 545 → 112 (c); 546 → 198 (c); 548 → 200 (c); 549 → 201 (c); 550 → 29 (b); 551 → 202 (c); 552 → 203 (c); 553 → 204 (c). Each stays as it is.

### Climb batch 21, listed for his review (lines 558 to 577)

19 lines: 3 closed, 5 open with a home elsewhere, 10 open with no other home, 1 section text or rules.

- Line 558, the list's head: stays. Its last clause, that the export probe's question 2 is needed before the switch-over, is stale: it was built at `8dd64e8fc` and the distance is 0 (F-53); the writer drops the clause.
- Line 560 (X.skeptic.3 of climb batch 21's rung X: walk's half of the…): stays. Open: row 804 holds walk's refusal; the question of its status (`NEGATIVE-VERIFIED` under P-157, or `CONTESTED` as row 713) is in no item.
- Line 561 (X.worker.3 and X.skeptic.4 of climb batch 21's rung X: row 584…): moves. Closed: told, not asked; row 584 rewritten, "Nothing waits" (choice 2).
- Line 562 (B.worker.1 and B.skeptic.1 of climb batch 21's rung B: should…): is cut to one line. Open: row 805 holds the refusal with the review's default, recorded and not repaired. Cut to one line.
- Line 563 (B.worker.2 and B.skeptic.2 of climb batch 21's rung B: a type…): stays. Open, no other home: a type that extends only `Index` made an `Object`.
- Line 564 (B.worker.4 and B.skeptic.4 of climb batch 21's rung B: walk's…): stays. Open, no other home: walk's tuple exclusion, the dual.
- Line 565 (N.worker.1 and N.skeptic.1 of climb batch 21's rung N: row…): is cut to one line. Open: row 808 holds the defect and its one-line fix; line 244 says the same. Cut to one line, or drop for line 244 (choice 6).
- Line 566 (N.worker.2 and N.skeptic.2 of climb batch 21's rung N: row…): is cut to one line. Open: row 807 holds the defect and both ways; the default (chosen when walk gets static types, P-12) goes into the line. Cut to one line.
- Line 567 (gather.1 of climb batch 21's gather: the order the rungs landed…): moves. Closed: told, not asked; "Nothing waits; reversible" (choice 2).
- Line 568 (gather.2 of climb batch 21's gather: main-text sentences of the…): stays. Open, no other home: the main-text sentences the gather corrected under P-146, P-157 and P-156.
- Line 569 (gather.3 of climb batch 21's gather: the gather composed its…): moves. Closed: told, not asked; "nothing waits" (choice 2).
- Line 570 (review.1 of climb batch 21's merged-diff review: ledger rows…): is cut to one line. Open: its default is the ledger's full pass, review-queue item 267. Cut to one line.
- Line 571 (The record's run-1 forks, taken at their defaults…): stays. Open, no other home: climb batch 21's run-1 forks. The queue holds such lists from climb batch 19 on (items 193, 203, 302, 315, 328, 352), not climb batch 21's.
- Line 572 (The record's six defaults already taken, on his review list…): is split. Open in part: its default 2 is built (row 809), and its last sentence is settled, since P-154 now names the wait (review-queue item 287, settled). The rest stays. Kept after the pass: about 520 characters.
- Line 573 (The record's points for his sight, run 1's part…): stays. Open, no other home: run 1's points for his sight.
- Line 574 (The three sites the gate's comparisons hid as moved by lines…): stays. Open, no other home: three sites moved by lines alone.
- Line 575 (Item 46, `__bigOperator2`'s fused arm (row 632, one site of the…): is cut to one line. Open: review-queue item 40 (consequential), built at `bd00ad997`, row 632 `FIXED`. Cut to one line.
- Line 576 (The export probe's question 1…): stays. Open: the coordinator's call under P-68, revised by climb batch 22's fork 3 and built at `8dd64e8fc`. Judgement: P-68 decides the target types, but the interim `ZZ64` is the call's; I lean to open (choice 2), and to moving its revised history clauses.
- Line 577 (The export probe's question 2 (the same section): which of…): stays. Open: the coordinator's call, told to him at about 20:35 UTC on 2026-10-23, built at `8dd64e8fc`; no answer of his on record. Stays (choice 2).

### Climb batch 21b, listed for his review (lines 581 to 590)

9 lines: 1 closed, 2 open with a home elsewhere, 5 open with no other home, 1 section text or rules.

- Line 581, the list's head: stays.
- Line 583 (E.worker.1 and E.skeptic.2 of climb batch 21b's rung E, one…): stays. Open, no other home: the abstract-field reading of the export rule; its other halves are row 842 and line 622.
- Line 584 (D.worker.1 and D.skeptic.1 of climb batch 21b's rung D, one…): is cut to one line. Open: review-queue item 247 (consequential), row 817. Cut to one line.
- Line 585 (review.1 of climb batch 21b's merged-diff review: walk's source…): stays. Open, no other home: walk's comment at `OverloadedFunction.java:1894-1895`, for the next change of that file.
- Line 586 (review-routed.1 of climb batch 21b's merged-diff review: a test…): is cut to one line. Open: row 481's notes hold the owed test, by the line's own words. Cut to one line.
- Line 587 (P-79's list of the demos known to fail, his text, is stale…): moves. Closed: P-79 was rewritten at his go of 08:19 UTC on 2026-10-31 (`71720ae94`), narrowed to `trips.fss` and row 731, as the default asked; review-queue item 289, settled.
- Line 588 (The record's run-2 forks, taken at their defaults…): stays. Open, no other home: run 2's forks (no queue item for climb batch 21b's forks).
- Line 589 (The record's points for his sight, run 2's part…): stays. Open, no other home: run 2's points for his sight.
- Line 590 (The difference the gate's comparisons hid: the export site's…): stays. Open, no other home: the export site's message.

### Climb batch 22, listed for his review (lines 594 to 605)

11 lines: 1 closed, 3 open with a home elsewhere, 6 open with no other home, 1 section text or rules.

- Line 594, the list's head: stays. Its sentence that P-68's and P-79's false sentences go to him as asks is stale: both were rewritten at his go of 08:19 UTC on 2026-10-31 (`71720ae94`; review-queue items 289 and 290, settled). The writer drops it.
- Line 596 (E.worker.1 and E.skeptic.1 of climb batch 22's rung E, one…): moves. Closed: P-68 was rewritten at his go of 08:19 UTC on 2026-10-31 (`71720ae94`; review-queue item 290, settled): "today `truncate` is `ZZ64` on both paths".
- Line 597 (E.worker.2, E.skeptic.2 and gather.1 of climb batch 22, one…): is split. Open: row 533's part is review-queue item 29; rows 188 and 283 carry the "Not reproduced at 64386618b" notes, but the question whether to close or retire them is in no item. The row 533 clause is cut; the rest stays. Kept after the pass: about 800 characters.
- Line 598 (R.worker.1 and R.skeptic.3 of climb batch 22's rung R, one…): is cut to one line. Open: review-queue item 51 (routine), whose home cites this entry; row 731. Cut to one line.
- Line 599 (R.skeptic.1 of climb batch 22's rung R: Appendix I's rationale…): stays. Open, no other home: Appendix I's rationale sentence.
- Line 600 (R.skeptic.2 of climb batch 22's rung R: row 825 (`CONTESTED`)…): is cut to one line. Open: row 825 (`CONTESTED`) holds the question that needs a ruling, as a contested row does. Cut to one line.
- Line 601 (R.worker.2 and R.skeptic.4 of climb batch 22's rung R, one…): is cut to one line. Open: row 824 and its test hold it. Cut to one line.
- Line 602 (review.1 of climb batch 22's merged-diff review: under walk…): stays. Open, no other home: `rangeContains` past the bounds; no row or test.
- Line 603 (review-routed.1 of climb batch 22's merged-diff review, a test…): stays. Open, no other home: a test's citation to correct.
- Line 604 (The record's forks, taken at their defaults…): stays. Open, no other home: climb batch 22's forks (no queue item).
- Line 605 (The record's points for his sight…): stays. Open, no other home: climb batch 22's points for his sight.

### Climb batch 22c, listed for his review (lines 609 to 627)

18 lines: 0 closed, 14 open with a home elsewhere, 3 open with no other home, 1 section text or rules.

- Line 609, the list's head: stays.
- Line 620 (review-routed.1 of climb batch 22c's merged-diff review, a test…): stays. Open, a test owed: row 839's reproducer is still `none`. No other home.
- Line 621 (review-routed.2 of climb batch 22c's merged-diff review, a test…): stays. Open, a test owed: row 838's reproducer is still `none`. No other home.
- Line 622 (judge-review.1 of climb batch 22c's merged-diff review's judge…): stays. Open, a probe owed: three departures by reading, "no ledger row holds"; no item.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 611 → 291 (b); 612 → 292 (b); 613 → 293 (b); 614 → 298 (c); 615 → 294 (b); 616 → 299 (c); 617 → 300 (c); 618 → 295 (b); 619 → 301 (c); 623 → 297 (b); 624 → 302 (c); 625 → 303 (c); 626 → 304 (c); 627 → 305 (c). Each stays as it is.

### Climb batch 23, listed for his review (lines 631 to 641)

10 lines: 2 closed, 7 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 631, the list's head: stays.
- Line 637 (review-routed.1 of climb batch 23's merged-diff review, a step…): moves. Closed (built): climb batch 25's rung U probed the limit and filed it as row 884 ("a component that imports a grammar is not rewritten"; `f7a33b97b`; phase 4's line 64); review-queue item 343, settled, calls the steps moot.
- Line 638 (The post-batch review's finding 5…): moves. Closed (built): rung U probed the other limits and filed rows 882 and 883 (`f7a33b97b`; line 64); item 343, settled.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 633 → 309 (b); 634 → 313 (c); 635 → 314 (c); 636 → 311 (b); 639 → 315 (c); 640 → 316 (c); 641 → 317 (c). Each stays as it is.

### Climb batch 24, listed for his review (lines 645 to 661)

16 lines: 0 closed, 14 open with a home elsewhere, 1 open with no other home, 1 section text or rules.

- Line 645, the list's head: stays.
- Line 653 (review-routed.3 of climb batch 24's merged-diff review, a test…): stays. Open, a test owed: row 871's reproducer is still `none`. No other home.

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 647 → 326 (b); 648 → 327 (b); 649 → 336 (b); 650 → 338 (b); 651 → 339 (b); 652 → 341 (b); 654 → 328 (c); 655 → 329 (c); 656 → 330 (c); 657 → 331 (b); 658 → 332 (b); 659 → 333 (b); 660 → 334 (b); 661 → 335 (c). Each stays as it is.

### Climb batch 25, listed for his review (lines 665 to 679)

14 lines: 1 closed, 12 open with a home elsewhere, 0 open with no other home, 1 section text or rules.

- Line 665, the list's head: stays.
- Line 676 (gather.2 of climb batch 25, told, not asked: four sentences of…): moves. Closed (built): the skill writer rewrote the four sentences after the landing (`597537f2e`, "the area parts after climb batch 25's landing", and its cold read `f11ad4602`).

Lines open with their home in the review queue and already one line, each naming its item, which stays open in the queue (line → item, (b) consequential, (c) routine): 667 → 344 (b); 668 → 345 (c); 669 → 346 (c); 670 → 347 (c); 671 → 348 (b); 672 → 349 (c); 673 → 350 (c); 674 → 351 (c); 675 → 353 (c); 677 → 352 (c); 678 → 353 (c); 679 → 354 (b). Each stays as it is.

### Not classified, to check (lines 683 to 701)

18 lines: 7 closed, 0 open with a home elsewhere, 10 open with no other home, 1 section text or rules.

- Line 683 (Workflow measures of the post-batch reviews that were not built…): stays. Section text. It goes when its lines are settled.
- Line 685 (Climb batch 7C's review, measure 3: an approved or measured…): stays. Not checked against the manual; no commit names climb batch 7C's measure 3. Judgement: I lean to open, and to a reader of `coordinator` skill's `references/batch.md` deciding in one pass with the other lines here.
- Line 686 (Measure 4: a parked line that files a rung's list for him says…): moves. Judgement: I lean to closed, stale: the landing message no longer carries lists, since the routing files every item of a batch with it or as a parked line (`climb-batch-workflow.md:281`, step 2), and "listed for his review" sections name their record's list.
- Line 687 (Staggering the rungs' comparison passes or capping concurrent…): moves. Judgement: the first part is moot, as the line says (the batches no longer compare suite outputs); the `BATCH` spelling I did not check; row 532 (`NEGATIVE-VERIFIED`) holds the runner limit. I lean to moving the line, row 532 being its home.
- Line 688 (The coordinator's practice since climb batch 6.5b: when he…): stays. Not checked: no sentence of the `coordinator` skill on his switch to manual approval (grep "manual approval": none). Judgement: open.
- Line 689 (Climb batch 6.5b's review, Part 3 and measure 6: the…): moves. Judgement: I lean to closed, built: the script's four-thread stage greps `# atomic ` lines (7 hits in `climb-batch-workflow.js`) and writes `# repair-tests total` (1 hit); the ladder stage under his rule of 2026-09-28 I did not check.
- Line 690 (Climb batch 6.5's review, measure 1: a rung's new compiled…): stays. Not built (no "suite-shaped" run in the script, the manual or the skill). Judgement: open, or stale if the gate's suites at four threads count; I lean to open.
- Line 691 (Measure 2: a review's "before the next launch" item lands…): stays. Not checked. Judgement: open.
- Line 692 (Measure 4: a briefing key's reason line names what to take from…): stays. Not built: a briefing key in the script is a bare query, with no reason line (`climb-batch-workflow.js:464-469`, batch 25's rung R). Judgement: open, or superseded by the skill's rule that a worker reads the record through `facts-extract.sh`; I lean to open.
- Line 693 (Measure 5: a probe that reads `ProjectFortress/build` or…): stays. Not checked against the skill. Judgement: open.
- Line 694 (Climb batch 7b's review, finding 10: the post-batch review's…): moves. Judgement: I lean to closed, built: `explorations/coordinator/tools/batch-measures.py` and `tools/spend.py` exist and the post-batch reviews run the first (`climb-batch-workflow.md`, the review's paragraph after "After the landing").
- Line 695 (Climb batch 8's review, finding 3: a decision that adds a…): stays. Not built: the manual's "Preparing a batch record" holds no probe of what a coercion makes ambiguous (grep "ambiguous": none). Judgement: open.
- Line 696 (Climb batch 8's review, finding 6, its review half: the review…): stays. Not checked. Judgement: open.
- Line 697 (Climb batch 10's review, finding 3: each type the record names…): stays. Not checked; it falls with the compiler's library at the switch-over (P-37). Judgement: open until then.
- Line 698 (Climb batch 10's review, finding 4: no development run of the…): moves. Judgement: I lean to closed, built: the manual's "The checker count, and a rung whose test is that stage" makes a `testIsStage` rung's before the last landed table, run once after the edit (`climb-batch-workflow.md:236`).
- Line 699 (Climb batch 10's review, finding 5: the gather lists for him…): moves. Judgement: I lean to closed, stale: `stopsMet` is gone from the script (no hit), and the routing now files every row a batch opens (`climb-batch-workflow.md:281`).
- Line 700 (Climb batch 12's review, measures 2 to 4: the gather writes a…): moves. Judgement: I lean to closed, stale: the routing files every row and item (step 2), and the cold read it names is gone since climb batch 14, by its own words.
- Line 701 (Climb batch 13's review, measures 2 to 5…): stays. Not checked: four measures of climb batch 13's review. Judgement: open; the reader of line 685 settles it with the others.

## 2. The review lists against the review queue

The 24 lists "listed for his review" (lines 259 to 680) hold 294 entries below their heads. 200 of them name an open queue item or are named by one: the lists of climb batches N to 13 (cut to one line each at the first consolidation, `ad56edb62`), 18, 20 and 22c to 25 (cut by the routing since), and seven of climb batch 19's nine. The queue holds none of the entries of climb batches 15b, 16 and 17, and few of 14, 15, 21, 21b and 22: of those eight lists' 93 entries, 7 have a queue item that holds their text (lines 421, 428, 440, 453, 575, 584 and 598), and 3 more point to item 267 for a leftover (lines 425, 452 and 570). The queue's header names every batch it took in (`review-queue.md:1`); from climb batch 22c on, the routing numbered each list's items in the queue (the routing commits `9e8159379`, `19605be4a`, `b49631cb4` and `784104683`). Climb batches 18 to 20 went into the queue at their routings (items 175 to 204); the lists of climb batches 14 to 17 and 21 to 22 were routed into PLAN only.

The lines whose item is open and which are already one line say nothing that their item does not, but for the few named below, and those add only a name or an example: a test's name, an exception's name, the team's declared types. None adds a question, a default or a cost. The seven lines of climb batch 19's list that the queue holds, and line 428 of climb batch 14's, are held whole by a queue item that names them as its home, but are not yet cut (the pass cuts them). Line 414 names "(item 38)", the queue's old number of what is now item 213.

The queue items that look settled though open, for the queue's cleanup: item 162 (line 399; the checker count reached a true zero at phase 3's close, F-53) and item 187 (line 513; row 539's claim now quotes "fails the Meet Rule"). Review-queue item 239 (routine) names "Climb batch 16, listed for his review" as its PLAN home, but that list no longer holds the timing entry (`PLAN-history.md`, "The timed pairs of the walk check dropped, 2026-10-23").

List by list, with each entry's queue item (line → item):

- **Climb batch N's first run, listed for his review** (lines 261 to 268), 6 entries. In the queue: 263 → 89; 264 → 90; 265 → 91; 266 → 92; 267 → 93; 268 → 148. What PLAN's line says that its item does not: line 265, the example `getter zero(): ZZ32 = 0` and that the body then returns no `IntLiteral`; line 268, the file `compile-ladder/rung-integer-minmax/probes/for-pavol.txt` and the pair's name, `XXXMaxNN32IntoZZ64RungM`.
- **Climb batch 6.5b, listed for his review** (lines 272 to 278), 5 entries. In the queue: 274 → 98; 275 → 34; 276 → 99; 277 → 102; 278 → 100. What PLAN's line says that its item does not: line 276, the exception's name, `NegativeArraySizeException`, where the item says "a raw Java exception".
- **Climb batch 7b, listed for his review** (lines 282 to 301), 18 entries. In the queue: 284 → 57; 285 → 58; 286 → 59; 287 → 7; 288 → 60; 289 → 8; 290 → 9; 291 → 133; 292 → 134; 293 → 135; 294 → 136; 295 → 6; 296 → 10; 297 → 79; 298 → 15; 299 → 77; 300 → 61; 301 → 11. Every line with a queue item says nothing that its item does not.
- **Climb batch 8, listed for his review** (lines 305 to 320), 14 entries. In the queue: 307 → 2; 308 → 158; 309 → 51; 310 → 94; 311 → 95; 312 → 22; 313 → 160; 314 → 63; 315 → 64; 316 → 6; 317 → 61; 318 → 11; 319 → 114; 320 → 115. What PLAN's line says that its item does not: line 318, the text's own way, which moves only `(a:Any, self)`; item 11 calls it "the way batch 8 did not take".
- **Climb batch 9, listed for his review** (lines 324 to 347), 22 entries. In the queue: 326 → 80; 327 → 81; 328 → 81; 329 → 4; 330 → 4, 82; 331 → 18; 332 → 149; 333 → 160; 334 → 88; 335 → 15; 336 → 15; 337 → 68; 338 → 23; 339 → 103; 340 → 104; 341 → 116; 342 → 117; 343 → 118; 344 → 119; 345 → 56; 346 → 120; 347 → 160. What PLAN's line says that its item does not: line 333, the rows 567, 593 and 594 and the judge's decision J2; item 160 names only "batch 9's two compiler tests and walk files"; line 347, the two tests' names, `XXXVarargsNoTrailingArgument` and `XXXFieldBesideInheritedGetter`.
- **Climb batch 10, listed for his review** (lines 351 to 363), 11 entries. In the queue: 353 → 121; 354 → 121; 355 → 122; 356 → 81, 82; 357 → 69; 358 → 70; 359 → 150; 360 → 56; 361 → 138; 362 → 65; 363 → 160. Every line with a queue item says nothing that its item does not.
- **Climb batch 11, listed for his review** (lines 367 to 377), 9 entries. In the queue: 369 → 83; 370 → 19; 371 → 44; 372 → 66; 373 → 71; 374 → 105; 375 → 106; 376 → 107; 377 → 165, 267 (the line closed). What PLAN's line says that its item does not: line 375, the team's declared types by name, `RangeWithLeft` and `RangeWithRight`.
- **Climb batch 12, listed for his review** (lines 381 to 393), 11 entries. In the queue: 383 → 5; 384 → 137; 385 → 55; 386 → 125; 387 → 108; 388 → 157; 389 → 73; 390 → 161; 391 → 165, 267 (the line closed); 392 → 72; 393 → 127, 126, 43. What PLAN's line says that its item does not: line 393, that the demo line respelled was `HeapShakedown.fss`; its third point is review-queue item 43, settled in part (a) by P-79, so the line's third clause is closed.
- **Climb batch 13, listed for his review** (lines 397 to 415), 17 entries. In the queue: 399 → 162; 400 → 24; 401 → 128; 402 → 129; 403 → 130; 404 → 131; 405 → 132; 406 → 32; 407 → 101; 408 → 152; 409 → 74; 410 → 75; 411 → 84; 412 → 76; 413 → 153; 414 → 127, 213; 415 → 160. What PLAN's line says that its item does not: line 399, that the count was 39 "since climb batch 15b", which is stale: the count is 0 since climb batch 22c (F-53). Item 162 itself looks settled, since the count reached a true zero at phase 3's close; listed for the queue's cleanup; line 414, that the `isLeftZero` pins are answered by P-57 (part (a), "Row 582"); its pointer "(item 38)" names the queue's old number, now item 213 (its title says "this list's item 38 until 2026-10-20"), which the writer corrects; line 415, the call's place, `ComponentWrapper.registerObjectExprs`, where item 160 names the file.
- **Climb batch 14, listed for his review** (lines 419 to 434), 14 entries. In the queue: 421 → 51; 425 → 165, 267 (the line closed); 428 → 212. No queue item (11): 422 (no home), 423 (home elsewhere), 424 (home elsewhere), 426 (no home), 427 (no home), 429 (home elsewhere), 430 (no home), 431 (no home), 432 (no home), 433 (no home), 434 (no home). Not yet cut, though the queue holds the text: 421, 428. Every line with a queue item says nothing that its item does not.
- **Climb batch 15, listed for his review** (lines 438 to 461), 22 entries. In the queue: 440 → 210; 452 → 165, 267 (the line closed); 453 → 210. No queue item (19): 441 (no home), 442 (duplicate), 443 (no home), 444 (no home), 445 (no home), 446 (no home), 447 (no home), 448 (no home), 449 (closed), 450 (no home), 451 (duplicate), 454 (no home), 455 (no home), 456 (no home), 457 (no home), 458 (closed), 459 (no home), 460 (closed), 461 (no home). Not yet cut, though the queue holds the text: 440, 453. Every line with a queue item says nothing that its item does not.
- **Climb batch 15b, listed for his review** (lines 465 to 467), 1 entries. No queue item (1): 467 (closed).
- **Climb batch 16, listed for his review** (lines 471 to 479), 7 entries. No queue item (7): 473 (home elsewhere), 474 (home elsewhere), 475 (closed), 476 (closed), 477 (home elsewhere), 478 (no home), 479 (no home).
- **Climb batch 17, listed for his review** (lines 483 to 497), 13 entries. No queue item (13): 485 (no home), 486 (home elsewhere), 487 (no home), 488 (split), 489 (home elsewhere), 490 (no home), 491 (no home), 492 (no home), 493 (no home), 494 (closed), 495 (closed), 496 (closed), 497 (closed).
- **Climb batch 18, listed for his review** (lines 501 to 513), 11 entries. In the queue: 503 → 175; 504 → 176; 505 → 177; 506 → 178; 507 → 179; 508 → 180; 509 → 181; 510 → 184; 511 → 185; 512 → 165, 267 (the line closed); 513 → 187. What PLAN's line says that its item does not: line 513, nothing; but its claim is stale: row 539's claim now quotes "fails the Meet Rule" (ledger row 539), so item 187 looks settled. Listed for the queue's cleanup; the line stays a pointer until then.
- **Climb batch 19, listed for his review** (lines 517 to 535), 9 entries. In the queue: 519 → 9; 521 → 190; 527 → 190; 529 → 191; 531 → 192; 533 → 193; 535 → 194. No queue item (2): 523 (no home), 525 (no home). Not yet cut, though the queue holds the text: 519, 521, 527, 529, 531, 533, 535. Every line with a queue item says nothing that its item does not.
- **Climb batch 20, listed for his review** (lines 539 to 554), 14 entries. In the queue: 541 → 195; 542 → 196; 543 → 197; 545 → 112; 546 → 198; 547 → 165, 267 (the line closed); 548 → 200; 549 → 201; 550 → 29; 551 → 202; 552 → 203; 553 → 204. No queue item (2): 544 (closed), 554 (closed). Every line with a queue item says nothing that its item does not.
- **Climb batch 21, listed for his review** (lines 558 to 577), 18 entries. In the queue: 570 → 267; 575 → 40. No queue item (16): 560 (no home), 561 (closed), 562 (home elsewhere), 563 (no home), 564 (no home), 565 (home elsewhere), 566 (home elsewhere), 567 (closed), 568 (no home), 569 (closed), 571 (no home), 572 (split), 573 (no home), 574 (no home), 576 (no home), 577 (no home). Not yet cut, though the queue holds the text: 570, 575. Every line with a queue item says nothing that its item does not.
- **Climb batch 21b, listed for his review** (lines 581 to 590), 8 entries. In the queue: 584 → 247. No queue item (7): 583 (no home), 585 (no home), 586 (home elsewhere), 587 (closed), 588 (no home), 589 (no home), 590 (no home). Not yet cut, though the queue holds the text: 584. Every line with a queue item says nothing that its item does not.
- **Climb batch 22, listed for his review** (lines 594 to 605), 10 entries. In the queue: 598 → 51. No queue item (9): 596 (closed), 597 (split), 599 (no home), 600 (home elsewhere), 601 (home elsewhere), 602 (no home), 603 (no home), 604 (no home), 605 (no home). Not yet cut, though the queue holds the text: 598. Every line with a queue item says nothing that its item does not.
- **Climb batch 22c, listed for his review** (lines 609 to 627), 17 entries. In the queue: 611 → 291; 612 → 292; 613 → 293; 614 → 298; 615 → 294; 616 → 299; 617 → 300; 618 → 295; 619 → 301; 623 → 297; 624 → 302; 625 → 303; 626 → 304; 627 → 305. No queue item (3): 620 (no home), 621 (no home), 622 (no home). Every line with a queue item says nothing that its item does not.
- **Climb batch 23, listed for his review** (lines 631 to 641), 9 entries. In the queue: 633 → 309; 634 → 313; 635 → 314; 636 → 311; 639 → 315; 640 → 316; 641 → 317. No queue item (2): 637 (closed), 638 (closed). Every line with a queue item says nothing that its item does not.
- **Climb batch 24, listed for his review** (lines 645 to 661), 15 entries. In the queue: 647 → 326; 648 → 327; 649 → 336; 650 → 338; 651 → 339; 652 → 341; 654 → 328; 655 → 329; 656 → 330; 657 → 331; 658 → 332; 659 → 333; 660 → 334; 661 → 335. No queue item (1): 653 (no home). Every line with a queue item says nothing that its item does not.
- **Climb batch 25, listed for his review** (lines 665 to 679), 13 entries. In the queue: 667 → 344; 668 → 345; 669 → 346; 670 → 347; 671 → 348; 672 → 349; 673 → 350; 674 → 351; 675 → 353; 677 → 352; 678 → 353; 679 → 354. No queue item (1): 676 (closed). Every line with a queue item says nothing that its item does not.

## 3. The counts, and PLAN's size after the pass

"Closed" counts the lines marked M and S; "Open, home" those marked P, H and D; "Open, no home" those marked N; "Text, rules" those marked K; a split line (X) is counted by the part that stays. "Moved to PLAN-history" is the old text of every line that leaves PLAN or changes (M, D, H and X), since `plan-moves.py` asks every such line word for word in PLAN-history. "After the pass" counts a cut line at 220 characters, the length of the one-line pointers that the lists of climb batches 22c to 25 already use, and a split line at the part that the line's entry gives. Characters are Unicode characters with the line's newline.

| Section (PLAN lines) | Items | Closed | Open, home | Open, no home | Text, rules | Characters now | Moved to PLAN-history | After the pass |
|---|---|---|---|---|---|---|---|---|
| The principle for the batches (17-21) | 3 | 1 | 0 | 0 | 2 | 2,047 | 1,495 | 552 |
| Phase 1. Batch 5: what is decided and shares nothing (27-27) | 1 | 1 | 0 | 0 | 0 | 336 | 0 | 336 |
| Phase 2. Batch 6: the tower flips, the specification with it (31-31) | 1 | 1 | 0 | 0 | 0 | 408 | 0 | 408 |
| Phase 2b. The repair batch from the conformance reviews (35-35) | 1 | 1 | 0 | 0 | 0 | 447 | 0 | 447 |
| Phase 3. The checker at a true zero (39-41) | 2 | 1 | 1 | 0 | 0 | 1,253 | 0 | 1,253 |
| Phase 4. The switch-over (45-84) | 35 | 4 | 14 | 15 | 2 | 26,367 | 13,863 | 17,074 |
| Phase 5. microGPT compiles (88-102) | 14 | 0 | 8 | 4 | 2 | 6,221 | 0 | 6,221 |
| Phase 6. microGPT fast (106-111) | 6 | 0 | 0 | 5 | 1 | 1,612 | 0 | 1,612 |
| Pavol's answers, in the order they are needed (115-167) | 30 | 0 | 16 | 2 | 12 | 6,982 | 1,184 | 6,680 |
| Work that can start now, with no decision (171-192) | 20 | 1 | 0 | 18 | 1 | 12,891 | 5,027 | 9,494 |
| Off the path, parked (196-234) | 38 | 1 | 35 | 1 | 1 | 11,462 | 4,533 | 8,719 |
| Phase 3's candidates at its end (238-257) | 17 | 0 | 15 | 0 | 2 | 9,053 | 7,860 | 3,733 |
| Climb batch N's first run, listed for his review (261-268) | 7 | 0 | 6 | 0 | 1 | 1,860 | 0 | 1,860 |
| Climb batch 6.5b, listed for his review (272-278) | 6 | 0 | 5 | 0 | 1 | 1,473 | 0 | 1,473 |
| Climb batch 7b, listed for his review (282-301) | 19 | 0 | 18 | 0 | 1 | 3,505 | 0 | 3,505 |
| Climb batch 8, listed for his review (305-320) | 15 | 0 | 14 | 0 | 1 | 2,950 | 0 | 2,950 |
| Climb batch 9, listed for his review (324-347) | 23 | 0 | 22 | 0 | 1 | 4,435 | 0 | 4,435 |
| Climb batch 10, listed for his review (351-363) | 12 | 0 | 11 | 0 | 1 | 2,182 | 0 | 2,182 |
| Climb batch 11, listed for his review (367-377) | 10 | 1 | 8 | 0 | 1 | 1,959 | 498 | 1,461 |
| Climb batch 12, listed for his review (381-393) | 12 | 1 | 10 | 0 | 1 | 2,911 | 440 | 2,471 |
| Climb batch 13, listed for his review (397-415) | 18 | 0 | 17 | 0 | 1 | 3,336 | 0 | 3,336 |
| Climb batch 14, listed for his review (419-434) | 15 | 1 | 5 | 8 | 1 | 15,339 | 5,297 | 11,142 |
| Climb batch 15, listed for his review (438-461) | 23 | 4 | 4 | 14 | 1 | 16,335 | 5,213 | 11,527 |
| Climb batch 15b, listed for his review (465-467) | 2 | 1 | 0 | 0 | 1 | 652 | 264 | 388 |
| Climb batch 16, listed for his review (471-479) | 8 | 2 | 3 | 2 | 1 | 3,073 | 1,313 | 2,310 |
| Climb batch 17, listed for his review (483-497) | 14 | 4 | 2 | 7 | 1 | 11,821 | 7,086 | 6,275 |
| Climb batch 18, listed for his review (501-513) | 12 | 1 | 10 | 0 | 1 | 4,892 | 943 | 3,949 |
| Climb batch 19, listed for his review (517-535) | 10 | 0 | 7 | 2 | 1 | 5,757 | 3,954 | 3,343 |
| Climb batch 20, listed for his review (539-554) | 15 | 3 | 11 | 0 | 1 | 5,165 | 1,129 | 4,036 |
| Climb batch 21, listed for his review (558-577) | 19 | 3 | 5 | 10 | 1 | 16,468 | 6,958 | 11,130 |
| Climb batch 21b, listed for his review (581-590) | 9 | 1 | 2 | 5 | 1 | 7,629 | 1,841 | 6,228 |
| Climb batch 22, listed for his review (594-605) | 11 | 1 | 3 | 6 | 1 | 11,444 | 4,598 | 8,306 |
| Climb batch 22c, listed for his review (609-627) | 18 | 0 | 14 | 3 | 1 | 8,782 | 0 | 8,782 |
| Climb batch 23, listed for his review (631-641) | 10 | 2 | 7 | 0 | 1 | 6,049 | 2,061 | 3,988 |
| Climb batch 24, listed for his review (645-661) | 16 | 0 | 14 | 1 | 1 | 7,738 | 0 | 7,738 |
| Climb batch 25, listed for his review (665-679) | 14 | 1 | 12 | 0 | 1 | 4,586 | 588 | 3,998 |
| Not classified, to check (683-701) | 18 | 7 | 0 | 10 | 1 | 4,272 | 1,739 | 2,533 |
| **All, lines 15 to 702** | 504 | 44 | 299 | 113 | 48 | 233,692 | 77,884 | 175,875 |

By mark: 37 lines move (M, 22,697 characters), 3 move as duplicates (D, 583), 50 are cut (H, 35,477 before, about 10,900 after), 15 are split (X, 19,127 before, about 9,200 after); 7 closed lines stay as summaries (S, 3,971), 243 pointer lines stay (P, 57,889), 102 lines with no other home stay (N, 75,109) and 47 lines of text and rules stay (K, 18,839).

PLAN after the pass, estimated: 175,875 characters of these lines, 15,376 for the header, the title, "Where we stand" and the three sections of rules at the end, and about 1,700 for headings and blank lines: about 193,000 characters, against 250,775 now (23 % less). PLAN-history gains about 78,000 characters and its headings. With "Where we stand" cut as section 5 proposes (6,543 to 2,151 characters), about 188,600.

What stays is mostly two kinds: the 243 pointer lines already in the method's cut form (57,889), and the 102 open lines with no other home (75,109). Of the second, 55 lines (51,574 characters) are entries of the review lists: 49 (45,125) of the lists of climb batches 14 to 17 and 21 to 22, which the queue never took in (section 2), and 6 tests or a probe owed for a later batch (lines 523, 525, 620, 621, 622 and 653, 6,449). Two choices of section 6 decide most of what is left: giving those 55 entries a home in the queue (choice 7) would bring PLAN to about 153,500 characters, and then collapsing each of the 24 lists into one line of queue numbers, about 300 characters, after the queue's cleanup (choice 8) to about 98,000; trimming the 24 lists' heads to one sentence each (14,865 characters) would save some 11,000 more.

## 4. The writing pass as a workflow run

### What is mechanical and what needs a writer

Of the 105 lines that change, 40 (M and D) only move: a script copies each word for word to PLAN-history and deletes it from PLAN. The other 65 (H and X) also move whole, and each needs one new line written in its place, about 20,000 characters of new text in all, with about ten small edits of lines that stay (the stale citations of lines 19, 84, 121, 174, 180, 414, 471, 558 and 594, and PLAN's header comment). So the pass is a small writing job over a large mechanical one, and the mechanical part should cost no tokens.

### The tools

- **A new short script** for the mechanical part, about 80 lines of Python beside `tools/record-landing/plan-moves.py`: it reads the appendix of this inventory (the lines by mark), and on a worktree at the base (a) appends under a new heading of PLAN-history, "Moved at the consolidation of 2026-11-0N, from `BASE`", one "###" heading for each heading the lines stood under, as the consolidation of 2026-10-30 did (`PLAN-history.md:1381`), with every M, D, H and X line word for word in PLAN's order; (b) deletes the M and D lines from PLAN; (c) leaves each H and X line in place for the writer, marked. A line that stays but is edited (a citation corrected) also leaves its old text in PLAN-history, by the same rule of `plan-moves.py`; the script copies those ten too. None of the existing tools does this: the clarity workflow (`tools/record-clarity/record-clarity.js`) writes `record.py` apply files for FACTS and POSITIONS entries, its judge and cold readers built for entries; the orientation workflow (`tools/orientation/`) writes the `fortress-repo` skill's revival part; the record-landing workflow (`tools/record-landing/record-landing.js`) is the nearest, since its routing writer edits PLAN, PLAN-history and the queue in a worktree (`routing.md`) and its `checks.sh` runs `plan-moves.py`, `queue-check.py` and `check-index.sh`, but it takes a batch's evidence and number as its input.
- **The writer: `tools/record-clarity/writer-stream.sh`**, as it is. A stream is one headless Opus session that takes its chunks in turn, resumed while its cache is warm, so a chunk's fix round costs a fraction of a fresh read (`record-clarity/README.md`, "The writer stream"). Its tools are enough for this job: Edit on PLAN in the worktree, `facts-extract.sh` for entries, rows (`'ledger:N'`) and INDEX, and `git show` and `git grep`. It lacks `record.py`, `ledger.py` and the checks (the boot note's leftover, `BOOT.md`, "Next", item 2), which this pass does not need, since it writes no entry and no row. Its standing brief is the skill writer's (`skill-writer-brief.md`, 6,100 characters); each task adds a short brief: the chunk's lines, their inventory entries, the 220-character form of a cut line with its opening ids kept, and "write nothing but the lines named".
- **The run** in the record-landing workflow's shape, smaller: a Workflow script, or the coordinator driving the steps by hand, since there are only four chunks: `prepare.sh`'s worktree and branch, `drive.sh`'s two streams side by side (the machine runs two agents at once, `record-clarity/README.md`), the mechanical checks after each round, one checker, one fix round, and the landing's two commits.

### The chunks and their order

0. His go, after the closing docket's page, which comes first in his order (`BOOT.md`, item 0 (a) and (b)).
1. The worktree at `main`'s head; the script's mechanical move; commit 1 on the branch; the checks below. No tokens.
2. Two writer streams side by side, two chunks each, each chunk about 11,000 to 15,000 characters of old lines:
   - Stream 1, chunk A: phase 4 and "Pavol's answers" (H 51, 52, 53, 54, 55, 62, 63, 64, 66, 70, 77; X 61, 65, 67, 119, 160; with the edits of lines 19, 84 and 121): 16 lines, 14,760 characters.
   - Stream 1, chunk B: "Work that can start now", "Off the path, parked" and "Phase 3's candidates at its end" (X 175, 190, 192, 204, 207, 238, 255; H 198, 200, 234, 240, 241, 242, 244, 245, 246, 248; with the edits of lines 174 and 180): 17 lines, 14,976 characters.
   - Stream 2, chunk C: the lists of climb batches 14 to 17 (H 421, 423, 424, 428, 429, 440, 453, 473, 474, 477, 486, 489; X 488): 13 lines, 10,842 characters.
   - Stream 2, chunk D: the lists of climb batches 19 to 22 (H 519, 521, 527, 529, 531, 533, 535, 562, 565, 566, 570, 575, 584, 586, 598, 600, 601; X 572, 597; with the edits of lines 414, 471, 558 and 594): 19 lines, 14,026 characters.
3. One checker, a fresh Opus agent with this inventory and the branch's diff: coverage (every line of the appendix done as marked), fidelity (each new line says what its home says, and no more), the form (one line, the opening ids kept, the default stated where the old line had one).
4. One fix round in each stream, on the checker's report.
5. The edges: the queue's "Home: PLAN, ..." pointers that name a line that moved, repointed to PLAN-history by heading and first words, as the first consolidation repointed 229 (`ad56edb62`, its message); PLAN's header comment gains a sentence with the base commit, as the two before did ("a line citation PLAN.md:N made before it reads from that commit"), since 289 files of the record cite PLAN by line (1,416 citations, `grep -rho 'PLAN\.md:[0-9]\+' explorations .claude`); line 173, "PLAN's own consolidation", moves under the pass's heading; INDEX gains the pass's results note if one is written.
6. Commit 2 on the branch; the checks again; land on `main` and push.

### The checks after each chunk

- **The moved text, word for word**: `python3 explorations/coordinator/tools/record-landing/plan-moves.py --root WT --base AT` fails a line out of PLAN that is not among PLAN-history's new lines as many times as it went, and a line that PLAN-history lost; its LOOK lines list what still looks stale.
- **The count of what moved**: the characters of the lines removed from PLAN (`git diff AT -- explorations/coordinator/PLAN.md`, its `-` lines) against those added to PLAN-history less its new headings, and both against this inventory's table of section 3, section by section; any line marked M or D still in PLAN, or any marked P, N or K gone, is a failure.
- **The pointers**: a new short check (a few dozen lines, or a mode of `plan-moves.py`): each review-queue item that a new line names is in part (b) or (c), each row is not `FIXED`, `DUPLICATE` or `RETIRED` by `ledger.py heads`, each F- and P- number exists (`facts-extract.sh --check`), and each cut line still opens with the ids or words that the queue's homes cite.
- **The headings that scripts read** stay as they are: `PLAN_SECTIONS` (`coordinator/climb-batch-workflow.js:1158`), "Climb batch 24, listed for his review" in two briefings (`:511`, `:537`), and "Where we stand", which the boot reads; a grep.
- **After step 5**: `python3 explorations/coordinator/tools/record-landing/queue-check.py` on the repointed queue, and `explorations/coordinator/check-index.sh`.
- **The record's own checks**, `record.py check --base AT` and `ledger.py landing-check BASE`, only as a guard at the end: by this inventory the pass writes no FACTS, POSITIONS or ledger line, so each should report nothing.

### Tokens written, estimated

- The mechanical script: written once by a worker with its test on a copy, about 40,000 to 60,000; its run, none.
- The writer streams: a fresh session reads its standing brief, the task, the chunk's old lines and inventory entries, and the homes it cites (about 5,000 to 15,000 tokens of queue items, rows and entries per chunk); the first task of each stream about 40,000 written, the resumed second about 25,000, the fix round about 15,000 each: about 130,000 for the two streams.
- The checker: the diff (about 25,000 tokens of old and new lines), the inventory's sections (about 25,000) and spot reads of homes: about 70,000 to 90,000.
- The edges of step 5 (the queue's homes, the header, INDEX): a short worker or the coordinator, about 30,000 to 50,000.
- The coordinator's review of the landed diff: about 40,000.

In all about 300,000 tokens written, between 250,000 and 400,000. Choice 7, if taken before the pass, adds a worker that files 49 queue items in the queue's form (each with "Landed", "The other way", "Its cost", "Home" and "Needed by", read from the rung reports), about 250,000 to 400,000 more, and about 20,000 for the stream to cut those lines.

## 5. "Where we stand", what it repeats, and a proposed cut

The section is lines 7 to 13: five bullets of 6,524 characters, 6,543 with its heading and the blank line after it. The figure of about 24K in the brief that asked for this section is not what the file holds at `8ab0dcd48`; the whole of lines 1 to 14, with the header comment and the title, is 8,436.

### What it repeats, sentence by sentence

- **Runs** (line 9, 1,139 characters). The walk check's 7 of 7 at every landing from climb batch 11 to 25 repeats the gates' `summary.txt` files (`compile-ladder/climb-batch-18/gate/summary.txt` to `climb-batch-25/gate/summary.txt`, their `# microgpt-walk` lines) and the reviews it cites; no FACTS entry holds it. "At climb batch 25's landing ... `MOD` and `nanoTime` run through helpers" repeats F-312 and F-314, the '7 PASS, 0 FAIL of 7' `reviews/batch-25-review.md`, section 5, and the 52 demos F-283 and `compile-ladder/climb-batch-25/RECORD.md`, "The tests on the merged tree". "Its seconds are not compared" repeats `PLAN-history.md`, "The timed pairs of the walk check dropped, 2026-10-23".
- **Stops** (line 10, 214). The 18 components at name resolution repeat F-97 (the ladder stage compiles them and holds them at the phase disambiguate), under "The harness and the gate".
- **The live thread** (line 11, 3,501). "One library ... becomes the library the compiler checks" is P-37. The gate's distance and count of 0 over the fourteen, '#crash none', repeat F-53, F-288 and F-289 and the gate's folder; "the count's table is climb batch 24's byte for byte" repeats `reviews/batch-25-review.md`, section 1. The seven rungs' 115 bindings, rung by rung, repeat `coordinator/CLIMB-BATCH-25.md` and `compile-ladder/climb-batch-25/RECORD.md` and the entries F-303, F-310, F-311, F-312, F-313 and F-314, with the rows they closed (336, 848, 326, 860, 873). "288 of the library's 449 live bindings name helpers and 161 still name glue classes" repeats F-299 and F-32; the `DivisionByZero` sentence F-24 and F-312. The code generator's three walls and its 47 refusals in 11 kinds repeat F-315 and F-34. The stages' seconds repeat F-240. "Its tables and `distance-sites.tsv` ... are the next batch's comparands" repeats the batch manual's gate (`coordinator/climb-batch-workflow.md`, "The checker count, and a rung whose test is that stage"). The 93 bindings read through the transfers repeat F-308 and review-queue item 326; the glue strings read as calls repeat climb batch 23's fork 3, review-queue item 309; the zero resting on row 844's reading repeats review-queue item 295 and phase 3's line 41; forks 5 and 2 "his since his 'all defaults'" repeat item 308, settled. Row 731's gap repeats F-285 and F-53. The library's other components repeat P-33, F-290 and phase 4's line 66. Only its last sentence, where the records and reviews are and where this section's earlier texts are, is a pointer of its own.
- **Landed** (line 12, 768). It repeats PLAN's own phase lines 27, 31, 35 and 39 and phase 4's lines 45 to 47, with their commits.
- **Next** (line 13, 902). It is stale at `8ab0dcd48`: FACTS and POSITIONS after the review were written at `9342ddbb2` ("F-32's IntLiteral count, F-240's cause, F-315's method half and finally, P-38's title"); the orientation update ran with nothing to install (`coordinator/BOOT.md`, its line on run `wf_437ba8aa-fe9`); the skill writer rewrote the area parts and their cold read followed (`597537f2e`, `f11ad4602`); the script's changes for the review's findings 1, 2 and 6 landed at `888712bb6`. What comes next is his goal of 07:1x UTC on 2026-11-03, the record in order before climb batch 26 (`BOOT.md`, item 0), which the bullet does not name.

### The proposed text, whole

It keeps what a boot needs, where the work stands, the live thread's measure, what waits on him under it, and the next step, and puts a pointer where the text repeats a home. It is 2,151 characters with its heading, against 6,543. The proposal replaces lines 7 to 13; the old text goes to PLAN-history word for word, as the routing has done for this section at each landing.

The text, from its heading to the end of its "Next" bullet:

```markdown
## Where we stand

- **Runs.** microGPT runs under walk: its quick walk check gave both programs 7 of 7 at every landing from climb batch 11 to climb batch 25 (each gate's `summary.txt`, its `# microgpt-walk` line; `reviews/batch-25-review.md`, section 5), and all 52 team demos reach their end (F-283). Walk is not timed (`coordinator/PLAN-history.md`, "The timed pairs of the walk check dropped, 2026-10-23"). On the compiled path microGPT's 18 components stop at name resolution until the switch-over (F-97).
- **The live thread.** Phase 4, the switch-over: one library, the interpreter's, becomes the library the compiler checks (P-37), the natives first (P-33). At the last landed gate, climb batch 25's (`11d2d8764`), the distance is 0 and the checker count 0 over the fourteen components (F-53; `compile-ladder/climb-batch-25/gate/`), 288 of the library's 449 live bindings name helpers of `nativeHelpers/` and 161 still name glue classes (F-299, F-32), and the code generator refuses 47 declarations in 11 kinds (F-34). The readings under that zero that wait for his word are review-queue items 295, 309 and 326 (row 844; F-308); row 731's checker gap stays for user programs and the team demos (F-285). What each batch moved is in its record and its review (`compile-ladder/climb-batch-*/RECORD.md`, `reviews/batch-*-review.md`); this section's earlier texts are in `microgpt-run-c-handover-history.md` and `coordinator/PLAN-history.md`.
- **Landed.** Phases 1 to 3 whole, phase 3 closed by climb batch 22c (`b81d86b75`); of phase 4, climb batches 23 to 25 (phase 4's first three lines). Their items for him are in `coordinator/review-queue.md` and in their lists below.
- **Next.** His goal of 07:1x UTC on 2026-11-03 (`coordinator/BOOT.md`, item 0): the record in order first (the closing docket, this plan's consolidation, the review queue's cleanup, the skills' minimal pass, the record's asks and the ledger's repair), then climb batch 26, phase 4's fourth batch, with its record, the Fable review and his go (phase 4's fourth line; the `coordinator` skill's `references/batch.md`, "The go"). What is in flight is `coordinator/BOOT.md`.
```

The cut drops the rung-by-rung account of climb batch 25 (in its record and F-303 to F-315), the stages' seconds (F-240), the comparands' sentence, the readings settled by item 308 and the "Next" steps that are done. It keeps the three open readings under the zero by their items, since a boot that plans the switch-over needs to know that the zero rests on them. Whether the boot note or this section carries "Next" is choice 13.

## 6. The choices the method leaves

Each with its options and my recommendation. The inventory's marks follow the recommendation of choices 1, 2, 4, 5 and 6; the others change no mark.

1. **A PLAN line whose queue item is open, but settled by the evidence** (items 162 and 187; lines 399 and 513). Options: (a) the line follows the queue's class and stays a pointer until the queue's cleanup closes the item; (b) the pass moves the line now and repoints the item's home. Recommend (a): the queue's cleanup comes next in his order (`BOOT.md`, item 0 (c)), and moving the line first leaves the queue's home naming a line that is gone. The two items go to the cleanup with their ground (section 2).
2. **A default taken by the coordinator, and a line that only tells him something.** Options: (a) a coordinator's call is open until he reviews it, as `tools/record-landing/queue-check.py` keeps open an item whose default was taken "by the coordinator" or "at its default"; (b) a call that follows a decision of his (P-147 for line 460) or a done act with nothing asked is closed. Recommend (a) for calls, with (b) where his decision dictates the call (line 460) or the line says that nothing waits and asks nothing (lines 561, 567, 569). The calls kept open are lines 423, 431, 454 to 457, 459, 461, 478, 576 and 577 (442 and 451 summarise some of them). If he takes the calls wholesale, those eleven lines close (6,918 characters).
3. **A closed line that a phase keeps as its summary** (lines 27, 31, 35 and 39, the built phases; lines 45 to 47, the landed batches of phase 4). Options: (a) keep each as one line, by the routing rule ("The batch's own line in its phase becomes one line, with its landing commit and its review", `climb-batch-workflow.md:281`) and by the 2026-10-30 consolidation, which kept phase 3's paragraph; (b) move them all, since "Where we stand" names the landed batches. Recommend (a), with lines 45 to 47 cut to their commit and review, about 150 characters each.
4. **A batch record or a review as a home.** The records (`coordinator/CLIMB-BATCH-N.md`, `compile-ladder/climb-batch-N/RECORD.md`) and the reviews hold the full text of the forks, points and calls that the review lists summarise. Options: (a) not homes, as the method names only the queue, the ledger, FACTS and POSITIONS; (b) homes, so that the lists' forks and points lines are cut to pointers. Recommend (a): the queue is where his review is tracked and counted, and a record is not kept current as items are answered.
5. **A line whose question is settled and whose leftover is another queue item's** (item 165, settled by `1ac7028b4`, with item 267 holding the ledger notes still unwritten; lines 377, 391, 425, 452, 512 and 547). Options: (a) move all six, item 267 standing on its own; (b) cut each to a pointer to item 267; (c) one line for item 267 under "Work that can start now". Recommend (a): item 267 already names item 165 and the reports that hold the notes.
6. **Duplicates within PLAN.** Pairs that say the same: lines 55 and 131 (`widen`, item 20); 73 and 253 (row 480); 244 and 565 (row 808); 234 and 634 (row 845, item 313); 429 and 97 (row 706's step); 440 and 453 (call 1, item 210); 521 and 527 (item 190); 442 and 451, summaries of the calls under them. Options: (a) keep both, as pointers; (b) keep one, in the place where the work meets it. Recommend (b): keep the phase's line or the answers' item, and the list entry whose id the queue's home cites; move the other word for word. The inventory marks 253, 442 and 451 as duplicates and leaves the other pairs to the writer, cut to pointers.
7. **Giving a home to the 49 open entries of the lists of climb batches 14 to 17 and 21 to 22**, which the queue never took in (section 2), though from climb batch 22c on the routing files every such item in the queue. Options: (a) leave them as written, by the method's letter; (b) a worker files them as queue items in the queue's form before the pass, and the pass cuts them (PLAN about 153,500 characters; about 250,000 to 400,000 tokens more); (c) the queue's cleanup files them as its first step, and the next routing cuts them. Recommend (c): the cleanup reads the queue whole anyway and will propose a close or a keep for each, so filing them there costs one reading, and many of them (forks and points at their defaults, calls on built work) may close at once rather than become items.
8. **One line per review list.** Options: (a) one line per entry, as the method and the routing write them; (b) after the queue's cleanup, each list becomes one line naming its open items (PLAN about 98,000 characters with choice 7). Recommend (a) for this pass and (b) as a question for him after the cleanup: the queue's homes cite each entry by its list and first words (section 4, the pointers' check), and the lists are where a batch's brief points (`climb-batch-workflow.js:511`, `:537`).
9. **The rules at the end.** The brief names "the sealed-tree rule" as PLAN's last section, but two more sections follow it, "Testing techniques" (lines 720 to 731) and "Stop conditions" (732 to 736). Options: (a) keep all three, as the first consolidation did; (b) check each rule against the skills, where most now live. Recommend (a) for this pass and (b) for the skills' minimal pass that follows (`BOOT.md`, item 0 (d)).
10. **The "Not classified" lines** (683 to 701), whose status the first consolidation did not settle. Options: (a) take this inventory's leans (7 closed, 10 open); (b) one reader checks the 17 against the batch manual and the `coordinator` skill in one pass before the writing pass, about 60,000 tokens. Recommend (b) for the ten that I lean open but did not check (lines 685, 688, 690 to 693, 695 to 697 and 701), and (a) for the seven that the script or the manual already answers.
11. **Stale citations and words inside lines that stay** (`climb-batch-workflow.js:465`, `:659-660`, `:787` in lines 19, 174 and 180; "(item 38)" in line 414; line 121's sub-heading; review-queue item 306 in line 84; the stale clauses of the list heads 471, 558 and 594). Options: (a) fix them in the pass, each old line going to PLAN-history; (b) leave them, since PLAN's header says that a citation reads from its commit. Recommend (a): ten lines, a few hundred characters, and each misleads a reader at boot.
12. **Line 21, the phase-3 batch method.** Options: (a) move it, phase 3 being closed; (b) keep a sentence of the general method (piles, no target size, the Fable review of the record). Recommend (a), and ask him whether the piles method is still the planner's for phase 4, since `coordinator`'s `references/batch.md` does not state it.
13. **Where "Next" lives.** "Where we stand"'s last bullet repeats the boot note, which is rewritten at every change (`BOOT.md:1`). Options: (a) keep a one-sentence "Next" pointing to `BOOT.md`, as section 5 proposes; (b) drop it and let the boot note carry it alone. Recommend (a): PLAN's first section is read before the boot note, and one sentence costs little.
14. **A split line** (marked X). Options: (a) the old line moves whole and a new line holds the open part; (b) the open part stays as an edited line. Both put the old line in PLAN-history, since `plan-moves.py` fails a changed line that is not there. Recommend (a), with the new line in the cut form, so that every line that stays reads as the method's one line.
15. **The order against the queue's cleanup.** Options: (a) this pass first, as his goal of 07:1x orders (`BOOT.md`, item 0); (b) the queue's cleanup first, so that the pass moves what it closes. Recommend (a), as he ordered: the cleanup can close items, and the routing then moves their pointers, a few lines each, without a second pass.

## Appendix: the lines by mark, for the script

Every non-blank line of PLAN from line 15 to line 702 at `8ab0dcd48`, by its mark in section 1. A split line's kept part is in its entry.

- M, closed, moves (37 lines): 21, 50, 188, 233, 377, 391, 425, 449, 452, 458, 460, 467, 475, 476, 494, 495, 496, 497, 512, 544, 547, 554, 561, 567, 569, 587, 596, 637, 638, 676, 686, 687, 689, 694, 698, 699, 700.
- D, a duplicate within PLAN, moves (3 lines): 253, 442, 451.
- H, open, home elsewhere, to cut to one line (50 lines): 51, 52, 53, 54, 55, 62, 63, 64, 66, 70, 77, 198, 200, 234, 240, 241, 242, 244, 245, 246, 248, 421, 423, 424, 428, 429, 440, 453, 473, 474, 477, 486, 489, 519, 521, 527, 529, 531, 533, 535, 562, 565, 566, 570, 575, 584, 586, 598, 600, 601.
- X, split (15 lines): 61, 65, 67, 119, 160, 175, 190, 192, 204, 207, 238, 255, 488, 572, 597.
- S, closed, kept as a summary (7 lines): 27, 31, 35, 39, 45, 46, 47.
- P, open, home elsewhere, already one line (243 lines): 41, 72, 73, 79, 89, 90, 91, 92, 93, 95, 98, 99, 123, 127, 131, 135, 136, 141, 145, 149, 153, 154, 158, 159, 161, 162, 163, 199, 201, 202, 203, 205, 206, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 243, 247, 249, 254, 256, 257, 263, 264, 265, 266, 267, 268, 274, 275, 276, 277, 278, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 353, 354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 369, 370, 371, 372, 373, 374, 375, 376, 383, 384, 385, 386, 387, 388, 389, 390, 392, 393, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 503, 504, 505, 506, 507, 508, 509, 510, 511, 513, 541, 542, 543, 545, 546, 548, 549, 550, 551, 552, 553, 611, 612, 613, 614, 615, 616, 617, 618, 619, 623, 624, 625, 626, 627, 633, 634, 635, 636, 639, 640, 641, 647, 648, 649, 650, 651, 652, 654, 655, 656, 657, 658, 659, 660, 661, 667, 668, 669, 670, 671, 672, 673, 674, 675, 677, 678, 679.
- N, open, no other home, stays (102 lines): 48, 49, 56, 57, 58, 59, 69, 71, 74, 75, 78, 81, 88, 94, 96, 97, 106, 107, 108, 109, 110, 167, 173, 174, 176, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 189, 191, 422, 426, 427, 430, 431, 432, 433, 434, 441, 443, 444, 445, 446, 447, 448, 450, 454, 455, 456, 457, 459, 461, 478, 479, 485, 487, 490, 491, 492, 493, 523, 525, 560, 563, 564, 568, 571, 573, 574, 576, 577, 583, 585, 588, 589, 590, 599, 602, 603, 604, 605, 620, 621, 622, 653, 685, 688, 690, 691, 692, 693, 695, 696, 697, 701.
- K, section text or rule, stays (47 lines): 17, 19, 82, 84, 100, 102, 111, 115, 117, 121, 125, 129, 133, 138, 143, 147, 151, 156, 165, 171, 196, 251, 261, 272, 282, 305, 324, 351, 367, 381, 397, 419, 438, 465, 471, 483, 501, 517, 539, 558, 581, 594, 609, 631, 645, 665, 683.

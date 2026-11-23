<!-- The record-landing workflow's check of climb batch 35's first round: each change of owed.md, pass or each failure with its class, passage, source and correction, against the worktree's diff from AT (efb603dce), then the failures of mech-1.md. -->

# The check of climb batch 35's record-landing, round 1

Read: `owed.md`; `entries-report.md`, `routing-report.md`, `record.apply`, `rows.rewrite`, `rows.add`; `mech-1.md`; `git -C /home/user/fortress-landing-35 diff efb603dce -- explorations/ ':!explorations/coordinator/PLAN-history.md'` (word diffs of FACTS, POSITIONS, the ledger, PLAN and the queue); the history blocks of the changed entries; the review (`reviews/batch-35-review.md`, Parts 1, 4 and 5, sections 2, 3 and 6, "The steps due before run 2"); `REPAIR-gate.md`, "The site", "Tests" and "Deviations from the ruling"; `RECORD.md`'s lines on row 594; the rung reports' lines on R.worker.1 and W.reserved.4. Code read at the landing, `git show 0a83a70498:<file>`, for every re-anchored citation.

Totals: 232 changes; 223 pass; 9 fail, with 11 failures: form 5, fidelity 4, coverage 1, routing 1.

## FACTS, POSITIONS, their histories and the ledger

### C1: pass
Weight none, writer none. F-53 is unchanged in the diff.

### C2: pass
Weight none, writer none.

### C3: pass
F-88, 646 to 594 characters. Before: "The code generator compiles `override` by the same reading, and the checker refuses one that overrides nothing (F-400)." After: "The code generator compiles `override` by the same reading (F-400)." F-400's title holds the refusal and "by the checker's table of what an override keeps from being inherited", so "by the same reading" is grounded. Keeping it over the sort's shorter words is the writer's choice, under 600.

### C4: pass
Weight none, writer none. F-240's text is unchanged in the diff.

### C5: pass
A noted block in F-240's history only; the entry's figures are unchanged. "climb batches 34 and 34b ran on 2.10 GHz" is the review's own words (section 6, "The stages' seconds, and the machine"); the 73 to 75 s against "about 90 s" is the review's Part 1, "Corrections owed".

### C6: pass
Weight none, writer none (F-268's re-anchor).

### C7: pass
Weight none, writer none (F-292).

### C8: pass
Weight none, writer none (F-302's re-anchor).

### C9: pass
Weight none, writer none (F-315).

### C10: pass
F-351. Before: "throws the exit on (F-401), a commit that fails taking the abort path, and throws everything else on". After: "throws the exit on, or takes the abort path where that commit fails (F-401), and throws everything else on". The sort's wording, the verb given, nothing else changed (+6).

### C11: pass
Weight none, writer none (F-363).

### C12: pass
Weight none, writer none (F-369).

### C13: pass
Weight none, writer none (F-372).

### C14: pass
Weight none, writer none (F-373).

### C15: pass
Weight none, writer none (F-387).

### C16: pass
Weight none, writer none (F-393).

### C17: pass
F-397. Added "a folded `+` takes its value's digits. A worker chose this at a default, since no coercion reads a folded constant's numbers (P-174)": `PLAN.md:936` at AT ("where a folded `+` and an integer operand kept so take their value's digits"; "Default: as it is, as landed; no coercion reads a folded constant's numbers (P-174)"). "It builds P-174's digit count." names the decision that the entry builds, as an entry holds (`record.md`, "What an entry is"); the rung's report gives it ("where P-174 and `literals.tex:101` make `n` 3"). The default is stated as a worker's, not his.

### C18: pass
F-398. Added: "Where such a right side does not convert to the names' types, walk's message names the temporary, not the name, as 'Type mismatch binding (5,6) ... to *tuple_<span> (type (NN32,String))'; a worker left it so at a default." Source: `rung-walk-subscript-tuple-binding/JUDGE.md:57` ("Where a typed tuple binding's right side is not a tuple expression and does not convert, the message names the temporary"); "such a right side" takes "any other right side" of the sentence before, which is that condition. The entry grew by that clause only (+222).

### C19: pass
F-399. "with self in local 0 ... order.", "the dispatch method", "It does not reach two forms:". Meaning unchanged; row 594's clause kept (RECORD, "Left for the coordinator").

### C20: pass
F-400. One sentence of four rows is now three sentences; each clause is kept, the row-1107 clause word for word as the repair narrowed it.

### C21: pass
F-401. "so such a late exit also commits the atomic blocks it passes (row 1041)": a statement of the tree, no word of his; the question is item 562's (C95).

### C22: pass
Weight none, writer none. P-165 is unchanged in the diff.

### C23: pass
Weight none, writer none. P-174 changes only in its last sentence (C24).

### C24: fail
P-174, its last sentence. After the change: "Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause. The tree departs too, with no row yet, where the numeral coercions of the one library and of many tests call a getter on the four numbers, as `v.asZZ32`, and where the checker and the literals chapter read each of the four as a `ZZ` value wherever it stands (F-342, F-345)."

What he decided, where it applies and what it requires, before and after (unchanged; only the pointer to the departures grows):
- Decided, before and after: "A numeral's type exists only at compile time: the Working Draft's `NaturalNumeral` or, with a radix point, `RadixPointNumeral`, below `Numeral`, with its four numbers as static parameters".
- Applies, before and after: "every number type, the library's too, takes a numeral through a coercion generic over the four numbers".
- Requires, before and after: "A coercion's body is a computation at compile time, with no method invocation: a number used as a value there converts where it stands, as a numeral does (P-173), into the type that its place fixes ... where nothing fixes a type, it is an exact integer, `ZZ`."

The departures are grounded: `Library/FortressLibrary.fss:388-389`, `:847`, `:954`, `:1065` (owed C24); "many tests": at `0a83a70498`, a getter on the four numbers stands within the numeral coercions of 18 test files by `git grep` (6 under `tests/`, among them `RadixPointLeadingZerosWalk.fss:6`, `n.asZZ32`; 12 under `compiler_tests/`, among them `RadixPointLeadingZerosCompiled.fss:6`, `bigToZZ64(n).asZZ32`), so the words hold beside the writer's count of thirteen.

- **form.** Passage: "with no row yet". "Yet" says that a row is to come, a plan; an entry holds "no plan and no status" (`record.md`, "What an entry is"). That no row holds the departure is the present and stays. Correction: "The tree departs too, with no row, where ...". The coordinator replaces "with no row" by the rows when the next planner files them (owed, "For the coordinator").

### C25: pass
P-40. Before: "a numeral type's four static parameters have none, and read as values are `ZZ` (P-174)". After: "a numeral type's four static parameters have none, and read as values convert where they stand, as a numeral does, a `ZZ` where nothing fixes a type (P-174)". The sort's words exactly. The clause restates P-174, and follows his "YES!!" of 13:0x UTC on 2026-11-23 to "a static number in the coercion's body converts where it stands, the way a numeral does" (POSITIONS-history, P-174, the block of 14:33Z). P-40's own decision, before and after: "Sizes are checked, and a size that inference leaves unknown is an error only where it is used"; where it applies: "a `nat` or `int` static parameter", the bound "for the sizes of arrays, vectors and matrices"; what it requires: "refuses a size beyond `NN32` or `ZZ32`", the JVM length check. Unchanged. The restated clause lacked "in a coercion's body" before the change too, so its reach is the same.

### C26: pass
P-173. Before: "and a `ZZ` where it is one of a numeral type's four numbers (P-174)". After: "and, where it is one of a numeral type's four numbers, converts where it stands, a `ZZ` where nothing fixes a type (P-174)". The sort's words; same ground as C25. P-173's decision ("A numeral converts where it stands ..."), its reach (every numeral, and a literal after the fold) and its requirement (exact or one rounding; the defaults `ZZ32`, `ZZ64`, `ZZ`, `RR64`) are unchanged.

### C27: fail
F-342. After: "It builds P-173's checker, P-174's written-only rule and P-40's size value, but not P-174's four numbers, which P-174 converts where they stand (no row yet);". Meaning holds the ground (owed C27); the sentence before, the checker's `ZZ` reading, is kept.
- **form.** Passage: "(no row yet)". As C24. Correction: "(no row)".

### C28: fail
F-345. After: "every number type's coercion generic over the four numbers, read as `ZZ` and folded, one value per place, where P-174 converts each of the four where it stands (no row yet)."
- **fidelity.** Passage: "one value per place, where P-174 converts each of the four where it stands". Next to "place", the clause reads as a relative clause, "the place where P-174 converts", and the departure is not said. Source: owed C28, "One clause: the text's reading of the four numbers as `ZZ` values departs from P-174 since its rewrite". Correction: "..., read as `ZZ` and folded, one value per place; P-174 instead converts each of the four where it stands (no row)."
- **form.** Passage: "(no row yet)". As C24. Correction: in the clause above.

### C29: fail
F-323. After: "another number type writes `asFloat(x)`, where P-165 names the getter `x.asRR64`, which no type declares (no row yet)." Meaning holds owed C29: the tree's sentence stays, the pointer says how P-165 differs.
- **form.** Passage: "(no row yet)". As C24. Correction: "(no row)".

### C30: fail
F-324. After: "It builds P-160's second step and P-165, but for P-165's name: the types declare `asFloat`, not the getter `asRR64` (no row yet)." Meaning holds owed C30.
- **form.** Passage: "(no row yet)". As C24. Correction: "(no row)".

### C31: pass
F-396. Before: "The library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first." After: "The track compiles the fourteen first since its programs use them. The checker's choice at a tie among the most specific declarations follows the JVM's identity-hash order (row 935), but a tie that self's type makes in a trait whose `comprises` clause lists types keeps the trait's own declaration in any order (row 1100)." The sort's two facts; the third clause names the tie that "the checker's other ties" excepts (REPAIR, "The repair"), so the growth (+217) is the change's own.

### C32: pass
F-354's history only. "a second instance": the review's Part 1, "Corrections owed" ("the red gate is its second instance") and section 3 ("as F-354 foresaw"). The note keeps the site, the checker's tie, apart from row 996's order. The entry's text is unchanged.

### C33: pass
F-281, `OverloadingChecker.scala:766-773` to `:828-831`: at `0a83a70498` those lines hold `def isCheckedName` and its cases (read).

### C34: pass
F-366, `Functionals.scala:1117` to `:1143`: at `0a83a70498` line 1143 is `numeralAttempt.flatMap(resolved(_, true)).orElse(resolved(es, false))` (read). `record.py check` reports, not failing, that its history note's quoted `:1117` is "no file" (below).

### C35: pass
Writer none: the close is the coordinator's (owed, "For the coordinator"). `ledger.py landing-check` still prints no finding.

### C36: pass
Row 1100, notes 664, row 1185. Added: "The test guards that fix only under `-XX:hashCode=0`: in the default hash mode it passed on the unfixed code, 'OK (3 tests)'." Source: REPAIR, "Tests" ("it passed before the fix, 'OK (3 tests)'"); the review's finding 3, its second way. For the coordinator: `ledger.py close 1100` (C35) puts a closed row's notes into the history ("notes `fixed HASH; full text: history, row N`", the ledger's head), so after the close no live row or entry says that the gated test does not guard the fix in the default hash mode. Finding 3's first way, a test that fixes the order, has no home yet.

### C37: fail
The new row in section 5 (`rows.add`).
- **coverage.** The row is not in the ledger: `ledger.py add` refused it, "notes-length: 707 characters; at most 700" (`mech-1.md`, "ledger.py add, row line 1 of rows.add"). Correction: cut the notes to 700 or fewer; the correction under fidelity gives a text of 698.
- **fidelity.** Passage: status `NEGATIVE-VERIFIED`, reproducer `none`, and "Source: `climb-batch-35/REPAIR-gate.md`, "Deviations from the ruling", 3." The status says that the reproducer confirms the claim, and the ledger's head asks a row with reproducer `none` for "the command and its output, or the probe's old path, in the notes". Deviations 3 holds the specification's reading, not a run. The run that shows the trait's declaration kept at the tie is REPAIR's "The site" (the instrumented copy of `Functionals.scala` at the 38 calls; the reversed copy with the fix, "the 14 calls at `QQ`"). Correction, four edits to the notes (707 to 698 characters):
  - "In such a trait self has the trait's type met with the listed types'" becomes "In such a trait self is the trait met with the listed types";
  - "applies at self and is the more specific" becomes "applies at self and is more specific";
  - "so the call's static type is the trait's return type, wider" becomes "so the call takes the trait's return type, wider";
  - "Source: `climb-batch-35/REPAIR-gate.md`, "Deviations from the ruling", 3." becomes "Source: `climb-batch-35/REPAIR-gate.md`, "The site" and "Deviations from the ruling", 3."
  The claim, the class, the citation and "Neither library has such a pair" (Deviations 3: "No such pair is in either library's tie sites") stand.

### C38: fail
Row 815, row 1195, notes 688. Added after the workaround: "Workaround: call through a value typed as the trait. Since `b7b5b0c02b` so does a call on `self` in the trait: '\=width{...}(SelfGetterValueProbe$Solid)' (`climb-batch-35/REPAIR-gate.md`, "Deviations from the ruling", 4)."
- **fidelity.** Passage: "Since `b7b5b0c02b` so does a call on `self` in the trait". It does not say that the call dies, and after the workaround and "it runs ... through a `Q`-typed value" it can read as a second form that runs. Source: owed C38 and REPAIR, "Deviations", 4: the probe "died ... 'java.lang.NoSuchMethodError: ... `\=width{...}(SelfGetterValueProbe$Solid)`'". Correction: "Since `b7b5b0c02b` a call on `self` in the trait dies too: '\=width{...}(SelfGetterValueProbe$Solid)' (...)" (row 1196, notes 689).
The cut sentence "So did the one library's QQ and Ratio `denominator`: `(Ratio)` once FortressLibrary was compiled again alone, a VerifyError in `isFinite`." is right to go: since `b7b5b0c02b` that tie keeps `QQ`'s declaration in every order (REPAIR, "The repair"), so its `(Ratio)` and its `VerifyError` no longer occur; the history keeps it.

### C39: pass
Row 935, notes 691. "a tie keeps the first minimal candidate in it (`Functionals.scala:831-836`, row 929), but one that self's type makes in a trait that comprises types keeps the trait's own (row 1100, since `b7b5b0c02b`)": the ground's exception. The shuffle numbers and the base build's path are condensed with the history marker. Aside, not this round's: `Functionals.scala:831-836` holds a doc comment at `13f4fdea7` and at the landing alike (the batch did not move it), not the tie's code; a re-anchor for the record's upkeep.

### C40: pass
Row 594, notes 693. "Not the dispatch method's site: since its fix (`1db0e878c8`, row 573) the reproducer dies with the same message." RECORD:190 ("still failing, with the same `NoSuchMethodError`, at a site other than the dispatch method").

### C41: pass
Twelve rows re-anchored, each read at `0a83a70498`: row 406 `CodeGen.java:6795-6817` (the `BoolArg` branch to the throw), 526 `:2478` (`forTry`), 724 `:4989`, `:5331`, `:8682`, 889 `:6760`, 983 `:5563` (`getFreeVars`), 995 `:6388-6394`, 1088 `:7291-7316` (`emitBodyGivenBy`), 1103 `:5182-5188` (`forClinit`), 119 `DesugarerVisitor.java:1576`, `:1594-1598`, 470 `Functionals.scala:1774`, 764 `:1735`, 835 `OverloadingChecker.scala:910-914`. Rows 377, 480, 876 and 1043 are kept with a reason (entries-report): each citation stands in a sentence bounded "at c124c6b65" or "at c1ce2a35e1" (read in the rows).

### C42: pass
Weight none, writer none.

### C43: pass
Weight none, writer none.

## PLAN, PLAN-history, the queue, INDEX and other notes

### C44: pass
"Runs.": climb batch 35's run 1 added to the walk check (the review, section 6) and to the demos' merged trees (RECORD:43).

### C45: pass
"The live thread.": the last landed gate is climb batch 35's (`0a83a70498`, run 1 of `coordinator/CLIMB-BATCH-35.md`, its gate on `b7b5b0c02b`), distance 0 and count 0, no crash row, `compile-ladder/climb-batch-35/gate/`; what run 1 built, F-397 to F-401; the eight rows closed and row 1100 fixed, not closed. Item 295's clause became "the export check's comparison ... is landed and not consequential (F-294)". The section 1 pointer, "What the two paths still do differently after this run", stands at `reviews/batch-35-review.md:47`.

### C46: pass
"Landed.": phase 4's first seventeen lines, the last at `0a83a70498` on 2026-11-23.

### C47: pass
"Probed": the clause on item 521 is gone. The writer also brought item 514's and items 516 and 518's clauses in line; each is in the queue's part (a) since the triage (514 settled by item 513; 516 not consequential, F-379; 518 settled by P-68), so the edits are grounded. `mech-1.md` LOOK `PLAN.md:12` (items 371, 372, 512, 513, 515, 577): owed C47 gives the reason the line stays; the line names each as answered or in part (a).

### C48: pass
"Next.": the run 1 landing on his go of 08:4x UTC, the review `efb603dce1`, the steps before run 2 as owed lists them, the list for the batch after as phase 4's climb batch 35 line with row 1098's default before it, item 608 held in two batches; the clauses on items 265, 267, 518, 572 and 597 gone; items 586, 592, 525 and 529 kept.

### C49: pass
Phase 3's zero: "landed, and not consequential, since the three principles point one way; F-294 states it, and P-180 makes the text's departure a repair". The triage's verdict on item 295; nothing is stated as his word.

### C50: pass
Climb batch 35's line after climb batch 34b's, in the form owed gives; its list for the batch after is the review's Part 5 word for word ("Climb batch 34b's list stands, ...: rows 994 and 1091, then `Arr` and `Dot` as run tests, then rows 1098 to 1103, without row 1100"; then rows 1105 with 1104, 1110 and 1111, row 935's order with row 996's, 1106 to 1109, review-routed.1's test, row 594). Rows 1104, 1108, 1109, 1110 and 1111 have their home.

### C51: pass
Climb batch 34b's line: row 1100 "left the list, fixed by climb batch 35's gate repair (`b7b5b0c02b`)".

### C52: pass
F-34's line: the refusals are rows 1091 and 1099, row 1100 fixed by `b7b5b0c02b`.

### C53: pass
The rehearsal's line: row 1100 fixed; item 522 replaced by row 996 in the list for the batch after; items 516 and 518 replaced by F-379 (O1) and P-68 with row 1000 (O3); items 572 and 577 kept as built and answered.

### C54: pass
The merge's line: item 578 replaced by F-372 to F-377, items 516 and 518 by F-379 and row 1000; item 577 kept as answered.

### C55: pass
The names line: the pointer to item 360 is gone, F-322 stays.

### C56: pass
Fork N11's line stays; "Review-queue item 475." is gone.

### C57: pass
Items 80 and 81 left the Q-walk line's list. `mech-1.md` LOOK `PLAN.md:97` (item 91): the line stays as the Q-walk line, which owed C57 names as the home, and it names item 91 as "closed at the cleanup of 2026-11-05: settled", as owed C57 quotes it.

### C58: pass
Item 390's clause became "row 921 is fixed (`4445d848b`; F-283)", the verdict's own words.

### C59: pass
"His answers needed before the switch-over" lists 2, 21, 30, 35, 36, 39, 212, 229, 230, 281, 319, 339, 374, 450, 455, 460 and 477, the seventeen of the queue's "Before the switch-over"; the clause on item 572 is gone.

### C60: pass
Rows 571 and 573 left phase 5's list: row 571 fixed (F-372), row 573 closed by rung S (`1db0e878c8`; F-399); row 815 named as climb batch 35b's rung M's.

### C61: pass
Item 58 is gone. The writer added item 545, which the queue's "Before microGPT compiles" holds (its twelfth item); grounded.

### C62: pass
Item 71 moved; stale by P-180, the triage's verdict on item 375.

### C63: pass
Item 72 moved; stale by P-180, the triage's verdict on item 376.

### C64: pass
Item 96 moved, built by `1db0e878c8` (rows 573 and 1038 closed; F-399), with its group line, under which no item stayed.

### C65: pass
Weight none, writer none: item 100 already points to item 562.

### C66: pass
Items 91 to 95 moved, answered, by his words cited with their times in owed C66 (553: P-179, 15:3x UTC on 2026-11-16; 554, 555 and 557: 13:12 UTC; 556: 13:05 UTC); items 89 and 90 and their group line stay.

### C67: pass
Writer none. `mech-1.md` LOOK `PLAN.md:241` (`40302280cd`): owed C67 gives the reason the line stays, the commit built the rung worker's resume only and the gather's half waits for his word.

### C68: pass
The strided range (parked): "Review-queue item 108." is gone; "row 661's repair, which P-180 makes due".

### C69: pass
The fortress operations (parked): "Review-queue items 554 and 555." is gone; his words of 13:12 UTC on 2026-11-16 answered both.

### C70: pass
Walk's conditional extension: item 76 left the list of items that wait on the rung; items 153, 224 and 246 stay.

### C71: pass
Item 18's other candidates: the pointer to the climb batch 31b line and item 589 became "row 697 holds the reserved points that rung O reached, whose repair P-180 makes due".

### C72: pass
`where` clauses: the pointer to item 178 is gone; row 773 and item 177 stay.

### C73: pass
Climb batch 11's `override` question moved, built by `d56eb8a882` (row 650 closed; F-400).

### C74: pass
Q2 of climb batch 12's rung W moved, built by `d56eb8a882` (row 653 closed; F-400).

### C75: pass
N.worker.3 (row 981) moved, stale: item 503 settled by P-180 and his go of 08:4x UTC; row 981 and CB35's rung L hold the work.

### C76: pass
Climb batch 30's forks moved, stale: item 508 not consequential (F-348, F-350, F-351); items 489 and 503 settled.

### C77: pass
Moved, built by `f8b05668eb` (row 1026 closed; F-398), with rows 1029 and 152.

### C78: pass
Moved, stale: items 532, 535, 541 settled and 544 not consequential.

### C79: pass
Moved, built by `e8b20935d5` (row 1039 closed; F-401).

### C80: pass
Row 1053's line moved, stale: item 576 settled, climb batch 35b's rung M repairs it.

### C81: pass
Climb batch 31's forks of run 1 moved, stale: item 578 not consequential (F-372 to F-377).

### C82: pass
Rows 1057 and 1058's line moved, stale: item 585 settled, climb batch 35b's rung L repairs them.

### C83: pass
Climb batch 33's forks of run 1 moved, stale: item 595 not consequential; items 571, 590 and 594 too.

### C84: pass
Weight none, writer none.

### C85: pass
W.judge.1: "Default: as landed, row 1105 open with its expected failure, its repair first in the list for the batch after, by P-180 (phase 4, climb batch 35's line)". The review's Part 4 and Part 5.

### C86: pass
Weight none, writer none.

### C87: pass
Weight none, writer none; the team's note at `traits.tex:15-16` is in owed's "For the coordinator".

### C88: pass
O.worker.2 rewritten as told: P-151 settles it, the checker's refusal a gap that P-180 repairs, row 1107 in the list for the batch after with rows 1106, 1108 and 1109. The review's Part 1, finding 4, and section 2 (P-151's words). P-151 is cited as a decision, not as his word on this item.

### C89: pass
A.worker.1 cut to a line: what is asked ("Keep the commit as part of the answer on `exit`, or discard the writes?"), its default ("as landed, the commit") and its home (review-queue item 562, with item 100); its old text is in PLAN-history.

### C90: pass
gather.1's `PLAN.md:149`, `:428`, `:445`, `:844` now name the four lines in PLAN-history's new section by heading.

### C91: pass
Weight none, writer none.

### C92: pass
Weight none, writer none.

### C93: pass
judge-gate.2 moved, stale: the briefs are the coordinator's (the review, section 2, citing the `coordinator` skill's `references/batch.md`, "The workflow"); the coordinator's choice is in both reports' "For the coordinator".

### C94: pass
judge-gate.3: "P-180 makes the remaining orders a rung (review-queue item 574, in part (a)): row 935's order by the declarations' spans, with rows 499, 1046 and 1047's tests, and row 996's order beside it. Default: that rung, in the list for the batch after". Item 574's verdict and the review's Part 5; no default invented.

### C95: pass
Item 562 gains A.worker.1 in its text, "Landed", "The other way", "Its cost" ("not sized by any source") and "Home", and its head line; default "as landed, the commit included"; "Needed by" unchanged ("no planned work; one of climb batch 35's forks that wait for him"). It stays open in (b).

### C96: pass
Item 592's "Home" gains rows 964 and 963, with CB35's "After the landing".

### C97: pass
Weight none, writer none.

### C98: pass
Item 473: "Since climb batch 35's rung R, both paths keep a radix-point numeral's digits as written (`6f0e48f187`; row 960 closed; F-397)"; "Home" now "rows 960 and 969, both closed". Its question stands.

### C99: pass
Item 608's "Landed" gains its second batch (the review, section 4); its head line "held in its first two batches"; it stays open.

### C100: fail
The queue's head group is now "The batch after climb batch 35b" (PLAN, "Next", and phase 4's climb batch 35 line).
- **routing.** Passage, item 616 in (b): "Needed by: the batch after climb batch 34b, whose item 2 is row 1098 once it has its default (PLAN, "Where we stand", "Next"; `reviews/batch-34b-review.md`, Part 5, item 2)." Climb batch 35 was the batch after climb batch 34b, and it landed without row 1098; the review's Part 5 carries climb batch 34b's list, row 1098 in it, to the batch after climb batch 35b, and PLAN's "Next" no longer numbers it "item 2". So the item's "Needed by" names a batch that has passed and disagrees with its group in the head. (Owed C100 said to leave the item as it was; the review it cites gives otherwise.) Correction: "Needed by: the batch after climb batch 35b, whose list holds row 1098 once it has its default (PLAN, "Where we stand", "Next", and phase 4, climb batch 35's line; `reviews/batch-35-review.md`, Part 5)."

### C101: pass
Weight none, writer none. Its choice, no queue items for the forks and the eleven entries, is named for the coordinator in both reports.

### C102: pass
Weight none, writer none.

### C103: pass
Weight none, writer none; INDEX is unchanged and `check-index.sh` passes.

### C104: pass
Weight none, writer none.

### C105: fail
PLAN-history's new section "## Climb batch 35's landing, 2026-11-23": `plan-moves.py` passes (175 lines out of PLAN, each under its own heading).
- **fidelity.** Passage, the section's opening list: "Moved whole: the lines that the batch built (item 96 under "Pavol's answers"; the batch 11 question on `override`; Q2 of climb batch 12's rung W; the lines on rows 1026 and 1039; T.worker.2 of climb batch 28; gather.1 of climb batch 31)". Climb batch 35 did not build the last two: T.worker.2 of climb batch 28 (`PLAN.md:751` at AT) was built by climb batch 33b's rung R (`90ee716db`; F-391), and gather.1 of climb batch 31 (`PLAN.md:858`) by climb batch 33's rung Q (`1f6c166b0d`; F-385). Source: owed C149 and C199, the triage's verdicts on items 423 and 572. Correction: take "T.worker.2 of climb batch 28; gather.1 of climb batch 31" out of that parenthesis; the list's last clause, "each line of the lists "listed for his review" whose own review-queue item left at the triage", already holds both.

## The PLAN lines whose queue item left at the triage

Each line below is gone from PLAN, and `plan-moves.py` finds its words under the landing's heading and its own heading. The move's reason is the verdict that owed.md quotes; the routing writer filed no queue item and moved none to (a).

### C106: pass

PLAN.md:345 ("Climb batch 7b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 58 in part (a) since the triage, settled; the move is stale by that verdict.

### C107: pass

PLAN.md:383 ("Climb batch 9, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 80 in part (a) since the triage, settled; the move is stale by that verdict.

### C108: pass

PLAN.md:384 ("Climb batch 9, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 81 in part (a) since the triage, settled; the move is stale by that verdict.

### C109: pass

PLAN.md:385 ("Climb batch 9, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 81 in part (a) since the triage, settled; the move is stale by that verdict.

### C110: pass

PLAN.md:443 ("Climb batch 12, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 108 in part (a) since the triage, settled; the move is stale by that verdict.

### C111: pass

PLAN.md:466 ("Climb batch 13, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 76 in part (a) since the triage, settled; the move is stale by that verdict.

### C112: pass

PLAN.md:542 ("Climb batch 18, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 178 in part (a) since the triage, settled; the move is stale by that verdict.

### C113: pass

PLAN.md:564 ("Climb batch 19, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 192 in part (a) since the triage, settled; the move is stale by that verdict.

### C114: pass

PLAN.md:640 ("Climb batch 22c, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 295 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C115: pass

PLAN.md:677 ("Climb batch 24, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 335 in part (a) since the triage, settled; the move is stale by that verdict.

### C116: pass

PLAN.md:701 ("Climb batch 26, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 358 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C117: pass

PLAN.md:702 ("Climb batch 26, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 359 in part (a) since the triage, settled; the move is stale by that verdict.

### C118: pass

PLAN.md:703 ("Climb batch 26, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 360 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C119: pass

PLAN.md:706 ("Climb batch 26, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 310 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C120: pass

PLAN.md:707 ("Climb batch 26, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 364 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C121: pass

PLAN.md:708 ("Climb batch 26, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 365 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C122: pass

PLAN.md:709 ("Climb batch 26, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 366 in part (a) since the triage, settled; the move is stale by that verdict.

### C123: pass

PLAN.md:710 ("Climb batch 26, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 367 in part (a) since the triage, settled; the move is stale by that verdict.

### C124: pass

PLAN.md:716 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 379 in part (a) since the triage, settled; the move is stale by that verdict.

### C125: pass

PLAN.md:717 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 380 in part (a) since the triage, settled; the move is stale by that verdict.

### C126: pass

PLAN.md:718 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 381 in part (a) since the triage, settled; the move is stale by that verdict.

### C127: pass

PLAN.md:719 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 382 in part (a) since the triage, settled; the move is stale by that verdict.

### C128: pass

PLAN.md:720 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 383 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C129: pass

PLAN.md:721 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 384 in part (a) since the triage, settled; the move is stale by that verdict.

### C130: pass

PLAN.md:723 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 386 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C131: pass

PLAN.md:724 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 387 in part (a) since the triage, settled; the move is stale by that verdict.

### C132: pass

PLAN.md:725 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 401 in part (a) since the triage, settled; the move is stale by that verdict.

### C133: pass

PLAN.md:726 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 388 in part (a) since the triage, settled; the move is stale by that verdict.

### C134: pass

PLAN.md:727 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 389 in part (a) since the triage, settled; the move is stale by that verdict.

### C135: pass

PLAN.md:728 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 390 in part (a) since the triage, settled; the move is stale by that verdict.

### C136: pass

PLAN.md:729 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 391 in part (a) since the triage, settled; the move is stale by that verdict.

### C137: pass

PLAN.md:730 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 392 in part (a) since the triage, settled; the move is stale by that verdict.

### C138: pass

PLAN.md:731 ("Climb batch 27, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 405 in part (a) since the triage, settled; the move is stale by that verdict.

### C139: pass

PLAN.md:739 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 410 in part (a) since the triage, settled; the move is stale by that verdict.

### C140: pass

PLAN.md:740 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 411 in part (a) since the triage, settled; the move is stale by that verdict.

### C141: pass

PLAN.md:741 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 412 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C142: pass

PLAN.md:742 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 414 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C143: pass

PLAN.md:743 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 415 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C144: pass

PLAN.md:744 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 416 in part (a) since the triage, settled; the move is stale by that verdict.

### C145: pass

PLAN.md:745 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 417 in part (a) since the triage, settled; the move is stale by that verdict.

### C146: pass

PLAN.md:746 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 418 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C147: pass

PLAN.md:748 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 420 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C148: pass

PLAN.md:749 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 421 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C149: pass

PLAN.md:751 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 423 in part (a) since the triage, settled; the move is built, by `90ee716db` (climb batch 33b's rung R; F-391). PLAN-history's new paragraph names this line among "the lines that the batch built": see C105.

### C150: pass

PLAN.md:752 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 424 in part (a) since the triage, settled; the move is stale by that verdict.

### C151: pass

PLAN.md:753 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 426 in part (a) since the triage, settled; the move is stale by that verdict.

### C152: pass

PLAN.md:754 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 427 in part (a) since the triage, settled; the move is stale by that verdict.

### C153: pass

PLAN.md:755 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 428 in part (a) since the triage, settled; the move is stale by that verdict.

### C154: pass

PLAN.md:756 ("Climb batch 28, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 436 in part (a) since the triage, settled; the move is stale by that verdict.

### C155: pass

PLAN.md:762 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 447 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C156: pass

PLAN.md:764 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 451 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C157: pass

PLAN.md:765 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 452 in part (a) since the triage, settled; the move is stale by that verdict.

### C158: pass

PLAN.md:766 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 453 in part (a) since the triage, settled; the move is stale by that verdict.

### C159: pass

PLAN.md:767 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 454 in part (a) since the triage, settled; the move is stale by that verdict.

### C160: pass

PLAN.md:769 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 457 in part (a) since the triage, settled; the move is stale by that verdict.

### C161: pass

PLAN.md:773 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 462 in part (a) since the triage, settled; the move is stale by that verdict.

### C162: pass

PLAN.md:775 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 464 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C163: pass

PLAN.md:776 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 465 in part (a) since the triage, settled; the move is stale by that verdict.

### C164: pass

PLAN.md:778 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 467 in part (a) since the triage, settled; the move is stale by that verdict.

### C165: pass

PLAN.md:782 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 474 in part (a) since the triage, settled; the move is stale by that verdict.

### C166: pass

PLAN.md:784 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 474 in part (a) since the triage, settled; the move is stale by that verdict.

### C167: pass

PLAN.md:785 ("Climb batch 29, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 486 in part (a) since the triage, settled; the move is stale by that verdict.

### C168: pass

PLAN.md:791 ("Climb batch 29b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 490 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C169: pass

PLAN.md:793 ("Climb batch 29b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 492 in part (a) since the triage, settled; the move is stale by that verdict.

### C170: pass

PLAN.md:794 ("Climb batch 29b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 494 in part (a) since the triage, settled; the move is stale by that verdict.

### C171: pass

PLAN.md:795 ("Climb batch 29b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 495 in part (a) since the triage, settled; the move is stale by that verdict.

### C172: pass

PLAN.md:797 ("Climb batch 29b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 496 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C173: pass

PLAN.md:798 ("Climb batch 29b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 497 in part (a) since the triage, settled; the move is stale by that verdict.

### C174: pass

PLAN.md:799 ("Climb batch 29b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 498 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C175: pass

PLAN.md:800 ("Climb batch 29b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 499 in part (a) since the triage, settled; the move is stale by that verdict.

### C176: pass

PLAN.md:811 ("Climb batch 30, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 506 in part (a) since the triage, settled; the move is stale by that verdict.

### C177: pass

PLAN.md:812 ("Climb batch 30, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 507 in part (a) since the triage, settled; the move is stale by that verdict.

### C178: pass

PLAN.md:820 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 531 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C179: pass

PLAN.md:821 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 532 in part (a) since the triage, settled; the move is stale by that verdict.

### C180: pass

PLAN.md:822 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 536 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C181: pass

PLAN.md:823 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 534 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C182: pass

PLAN.md:824 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 535 in part (a) since the triage, settled; the move is stale by that verdict.

### C183: pass

PLAN.md:825 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 537 in part (a) since the triage, settled; the move is stale by that verdict.

### C184: pass

PLAN.md:826 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 538 in part (a) since the triage, settled; the move is stale by that verdict.

### C185: pass

PLAN.md:829 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 541 in part (a) since the triage, settled; the move is stale by that verdict.

### C186: pass

PLAN.md:830 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 542 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C187: pass

PLAN.md:833 ("Climb batch 32, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 543 in part (a) since the triage, settled; the move is stale by that verdict.

### C188: pass

PLAN.md:843 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 560 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C189: pass

PLAN.md:846 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 563 in part (a) since the triage, settled; the move is stale by that verdict.

### C190: pass

PLAN.md:847 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 563 in part (a) since the triage, settled; the move is stale by that verdict.

### C191: pass

PLAN.md:850 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 565 in part (a) since the triage, settled; the move is stale by that verdict.

### C192: pass

PLAN.md:851 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 566 in part (a) since the triage, settled; the move is stale by that verdict.

### C193: pass

PLAN.md:852 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 567 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C194: pass

PLAN.md:853 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 568 in part (a) since the triage, settled; the move is stale by that verdict.

### C195: pass

PLAN.md:854 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 568 in part (a) since the triage, settled; the move is stale by that verdict.

### C196: pass

PLAN.md:855 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 569 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C197: pass

PLAN.md:856 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 570 in part (a) since the triage, settled; the move is stale by that verdict.

### C198: pass

PLAN.md:857 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 571 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C199: pass

PLAN.md:858 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 572 in part (a) since the triage, settled; the move is built, by `1f6c166b0d` (climb batch 33's rung Q; F-385). PLAN-history's new paragraph names this line among "the lines that the batch built": see C105.

### C200: pass

PLAN.md:861 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 573 in part (a) since the triage, settled; the move is stale by that verdict.

### C201: pass

PLAN.md:862 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 574 in part (a) since the triage, settled; the move is stale by that verdict.

### C202: pass

PLAN.md:863 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 574 in part (a) since the triage, settled; the move is stale by that verdict.

### C203: pass

PLAN.md:864 ("Climb batch 31, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 575 in part (a) since the triage, settled; the move is stale by that verdict.

### C204: pass

PLAN.md:873 ("Climb batch 31b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 580 in part (a) since the triage, settled; the move is stale by that verdict.

### C205: pass

PLAN.md:874 ("Climb batch 31b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 581 in part (a) since the triage, settled; the move is stale by that verdict.

### C206: pass

PLAN.md:875 ("Climb batch 31b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 582 in part (a) since the triage, settled; the move is stale by that verdict.

### C207: pass

PLAN.md:876 ("Climb batch 31b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 583 in part (a) since the triage, settled; the move is stale by that verdict.

### C208: pass

PLAN.md:877 ("Climb batch 31b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 584 in part (a) since the triage, settled; the move is stale by that verdict.

### C209: pass

PLAN.md:880 ("Climb batch 31b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 518 in part (a) since the triage, settled; the move is stale by that verdict.

### C210: pass

PLAN.md:881 ("Climb batch 31b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 588 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C211: pass

PLAN.md:882 ("Climb batch 31b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 589 in part (a) since the triage, settled; the move is stale by that verdict.

### C212: pass

PLAN.md:888 ("Climb batch 33, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 590 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C213: pass

PLAN.md:889 ("Climb batch 33, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 591 in part (a) since the triage, settled; the move is stale by that verdict.

### C214: pass

PLAN.md:892 ("Climb batch 33, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 594 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C215: pass

PLAN.md:893 ("Climb batch 33, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 571 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C216: pass

PLAN.md:895 ("Climb batch 33, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 596 in part (a) since the triage, settled; the move is stale by that verdict.

### C217: pass

PLAN.md:904 ("Climb batch 33b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 600 in part (a) since the triage, settled; the move is stale by that verdict.

### C218: pass

PLAN.md:905 ("Climb batch 33b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 602 in part (a) since the triage, settled; the move is stale by that verdict.

### C219: pass

PLAN.md:906 ("Climb batch 33b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 603 in part (a) since the triage, settled; the move is stale by that verdict.

### C220: pass

PLAN.md:907 ("Climb batch 33b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 604 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C221: pass

PLAN.md:913 ("Climb batch 34, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 609 in part (a) since the triage, settled; the move is stale by that verdict.

### C222: pass

PLAN.md:914 ("Climb batch 34, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 610 in part (a) since the triage, settled; the move is stale by that verdict.

### C223: pass

PLAN.md:915 ("Climb batch 34, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 611 in part (a) since the triage, settled; the move is stale by that verdict.

### C224: pass

PLAN.md:916 ("Climb batch 34, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 613 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C225: pass

PLAN.md:917 ("Climb batch 34, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 612 in part (a) since the triage, settled; the move is stale by that verdict.

### C226: pass

PLAN.md:918 ("Climb batch 34, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 614 in part (a) since the triage, settled; the move is stale by that verdict.

### C227: pass

PLAN.md:919 ("Climb batch 34, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 615 in part (a) since the triage, settled; the move is stale by that verdict.

### C228: pass

PLAN.md:920 ("Climb batch 34, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 606 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C229: pass

PLAN.md:928 ("Climb batch 34b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 617 in part (a) since the triage, not consequential; the move is stale by that verdict.

### C230: pass

PLAN.md:929 ("Climb batch 34b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 618 in part (a) since the triage, settled; the move is stale by that verdict.

### C231: pass

PLAN.md:930 ("Climb batch 34b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 619 in part (a) since the triage, settled; the move is stale by that verdict.

### C232: pass

PLAN.md:931 ("Climb batch 34b, listed for his review") is out of PLAN (it stood there at AT) and stands in PLAN-history word for word (`plan-moves.py` passes). Its reason, `owed.md`: review-queue item 620 in part (a) since the triage, not consequential; the move is stale by that verdict.


## The failures of mech-1.md

- `ledger.py add`, row line 1 of `rows.add`: FAIL, "notes-length: 707 characters; at most 700". Cause: the new row's notes, 7 characters over; the row is not in the ledger. Change: C37 (its correction gives notes of 698).
- `queue-check.py`: FAIL, two head lines ("the head says "**Counts**, 92 open items, all consequential:"" and "the lines under it add up to 0"). Cause: the tool parses "N open items, N consequential and N routine" and lines "- X: N (N consequential, N routine)", while the head since the triage (`14fc69873f`) reads "92 open items, all consequential:" with lines "- X: N." (`queue-check.py:117`, `:123`); the head at AT has the same form, so the same two lines fail there. The counts hold: 92 open in (b), 0 in (c), and 1 + 17 + 4 + 12 + 7 + 51 = 92. Change: none of this round's; C100 renamed one head line without changing a count. The tool or the head's form is the coordinator's.
- `words-subset.py`, every POSITIONS line of `record.apply`: exit 1, information. Cause: P-174, P-40 and P-173 add words, not cut-only, as `entries-report.md` says. Changes: C24, C25, C26.
- `record.py check`, reported, not failing: "FACTS-history.md:9618: from: F-366: :1117 is no file". Cause: C34's provenance note quotes the old citation as a bare `:1117`. Change: C34; no correction owed.
- `record.py check`, reported, not failing: "POSITIONS-history.md:3666: from: P-169: no heading of ... HELD.md holds "Held in chat (2026-11-07)"". Cause: a line that stood at AT (the history had 4,252 lines there, and this round only appended after them). Change: none.
- `lengths.py`: pass; 14 entries over 600 grew, each by the clause its change owes (C10, C17 to C21, C24 to C31); F-88 fell to 594 (C3).
- `plan-moves.py`: pass; its three LOOK lines are answered under C47 (`PLAN.md:12`), C57 (`PLAN.md:97`) and C67 (`PLAN.md:241`).

<!-- The record-landing checker's verdict on climb batch 27's first round: each change of owed.md, pass or each failure with its class, passage, source and correction, then the mechanical checks of mech-1.md. -->

# The check of climb batch 27's record-landing, round 1

Read against `owed.md`, the worktree's `git diff 38887293f -- explorations/ ':!explorations/coordinator/PLAN-history.md'`, `entries-report.md`, `routing-report.md`, `mech-1.md` and the sources each change names. 123 changes: 107 pass, 16 fail (13 fidelity failures, 6 routing failures, no coverage or form failure).

## FACTS: the pass on the batch's entries

**C1, F-53: pass.** Every sentence and the gate's figures stand (0 and 0, climb batch 27's gate); the one added clause is C17's.

**C2, F-240: pass.** The figures stand as the commit stage wrote them: 80 s, 144 s, `FortressLibrary` 90 s, load 0.28, against 246 s (182 s) at 0.34.

**C3, F-283: 2 failures.**
- fidelity. Passage: "`Generator2Demo` draws its arrays by `random`, so one stop of it in a run is not a regression." Source: `REPAIR-review.md`, "2. The demos": the stop was "`IntegerOverflow` at `Library/FortressLibrary.fss:3566:27-29`, the join `a b` of `ProdReduction`", and the arrays are random, "so its products differ from run to run"; the entry before read "a product of them raised `IntegerOverflow` in `PROD` ..., so a single stop of it is not a regression". The new sentence drops the kind of stop, so any stop of the demo reads as no regression. Correction: "`Generator2Demo` draws its arrays by `random`, so a product of them can overflow in `PROD`, and one such `IntegerOverflow` stop in a run is not a regression."
- fidelity. Passage: "its output, measured once on the code that `4445d848b` committed, is 'demos: 52 run, 52 reached their end'". Source: the same section: "First run, 10:44Z to 11:02Z: 'demos: 52 run, 51 reached their end'" and "Second run of the driver, 11:11Z to 11:33Z: 'demos: 52 run, 52 reached their end'". The driver ran twice on that code, so "measured once" is not so. Correction: drop "measured once": "its output on the code that `4445d848b` committed is 'demos: 52 run, 52 reached their end'". The stop sentence above covers the first run; the bounding commit stays.

**C4, F-323: pass.** The rung's own count, superseded, gives way to "F-299 and F-32 give the library's counts of bindings."

**C5, F-324: pass.** Kept; its clauses match `rung-number-open/REPORT.md`, "What changed and why" ([S5]); only its history gains C29's note.

**C6, F-325: pass.** Kept but for C12.

**C7, F-326: pass.** Kept; rows 908 and 923 as rows.md has them.

**C8, F-327: pass.** "(F-299, F-32 change by 16)" became "among F-299's helper bindings"; the plan clause is gone.

**C9, F-328: pass.** Kept.

**C10, F-329: pass.** The Detail names "Old against new: every code point in six forms", the heading of [S11].

**C11, F-330: pass.** Kept; `FileWriteStream`'s reason is row 926's.

## FACTS: sentences that the landing made false or stale

**C12, F-325: pass.** "Under walk the assumption stays on a bound value (row 919), a tuple under one cannot be taken apart (row 920), and a generic method on an assumed receiver stops (row 922); an overloaded one runs (`tests/AsIfOverloadedMethodWalk`)": row 921 FIXED by `4445d848b`, its reproducer `ProjectFortress/tests/AsIfOverloadedMethodWalk.fss` (rows.md), the other three open; each pointer says what its row holds.

**C13, F-240: pass.** "which no batch moved beyond noise" cut, the fewest words; the new sentence, "Both stages about halved at climb batch 27's gate, and no run measured why: ... neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause", is the review's section 2 ("Both stages about halved. No run measured why. ... neither is shown to be the cause"); the Detail gains that section.

**C14, F-54: 1 failure.**
- fidelity. Passage: "no gate's `distance.txt` from climb batch 24's to 27's holds `#class` rows." Source: the distance table's writer prints a class row only for a class that occurs: `explorations/coordinator/tools/distance/table.py:22`, "#class <code> <n> <name>  in classify.py's order, the classes that occur", and `:112`, `if cc[code]: print("#class\t..."`. Over the gates (`for d in explorations/compile-ladder/climb-batch-2*/gate/distance.txt; do grep -c '^#class' $d; grep '^#total' $d; done`): climb batches 20, 21 and 21b, 3 `#class` rows each at '#total 5'; 22, 22c and 23 to 27, 0 rows at '#total 0'. So the rows are absent because the distance is 0, since climb batch 22; the review's "an older slip" (section 7, point 6) is not one. The new sentence lets a reader conclude that the gate stopped classing, and the old sentence it replaces, "The `#class` rows of each gate's `distance.txt` hold the count of each class", was true with that condition. Correction: "The `#class` rows of a gate's `distance.txt` hold the count of each class that occurs, such as X1 ..., BR ..., and OT ...; `explorations/coordinator/tools/distance/classify.py` assigns them, and at a distance of 0 there are none (`tools/distance/table.py:112`)." The crash sentence, the F-233 pointer and the Detail stand.

**C15, F-281: 1 failure.**
- fidelity. Passage: the title's "the distance with two crash rows in `value object Char` (row 929)" and "by the stages ('#total 0' with two `#crash` rows; '#total 0', '#crash none')". Source: the figures are climb batch 27's gate's (the review, section 1, its two `#crash` rows and the count's '#crash none'), but the Detail is only "`compile-ladder/rung-symbolic-check/REPORT.md` sections 1, 3 and 5", which holds the rung's own figures. By the brief, a claim extended to the landing's batch needs its source in the Detail. Correction: the Detail gains "`reviews/batch-27-review.md`, section 1". The title and figures stand.

**C16, F-288: 1 failure.**
- fidelity. Passage: "Over the fourteen, the stage reads '#total 0', with two `#crash` rows in the `FortressBuiltin` component (F-54)." Source: the Detail is only "`compile-ladder/rung-list-imports/REPORT.md`, sections 1 to 3", the rung's figures; the two crash rows are climb batch 27's gate's (the review, section 1; section 7, point 6). Correction: the Detail gains "`reviews/batch-27-review.md`, section 1". The title's "finds no error in them, though its check of `value object Char` does not finish (row 929)" stands.

**C17, F-53: pass.** One clause added, "At that gate its check of `value object Char` did not finish, so the 0 holds no completed check of that declaration's body (F-54; row 929, the checker's crash)", pointing to F-54's rows and row 929, as the sort allows; every other sentence and figure stands.

**C18, F-32: pass.** 102 of 443 and F-299's 341 (RECORD.md, "The count of the bindings"); "`println` writes through `stdOut`, a plain Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330)" matches F-330; the bounded classification at `a1f8c4b8b` stays; the Detail gains the count's section.

**C19, F-299: pass.** 341 of 443 and 102; the loader's table for `stringOps.typeName` and `equality.sEquiv` (F-328); `FlatString`'s 13. The counts by type are the rungs' own tables added up, and they check: I's 16 (ZZ32 3, ZZ64 3, ZZ 4, NN32 3, NN64 3, `rung-natives-shift-power/REPORT.md`), F's 9 (`Float` 57 to 62, `RR32` 50 to 51, `random`, `FlatString` 11 to 13, `rung-natives-float-number/REPORT.md`, section 1), C 1, A 2, W 7; 306 + 35 = 341. The one new sentence past 600 characters, "The 341 by type: ..." (845, from 780), is kept by question 1 in `entries-report.md`.

**C20, F-57: pass.** "which it prints by those names (F-328)".

**C21, F-308: 2 failures.**
- fidelity. Passage: the title's "`NN32`'s 27, `NN64`'s 24, `UnsignedLong`'s 3 and `Char`'s 40 bindings name their helpers" and "All 94 bindings over these types name helpers". Source: F-299 as this run wrote it, "`NN32` 30, `NN64` 27, `UnsignedLong` 3 and `Char` 40 (F-308, F-313, F-327)"; rung I's report, "What changed and why", three new bare bindings each at `NN32` and `NN64` (`simpleUnsignedIntArith.unsignedIntBitLeftShift(int,int):int` ...) and "At `NN32` and `NN64` the rewrite passes `self` and the result through the transfers of F-308". The six are inside F-308's subject, so the two entries now disagree, and owed C21 asks for "the 94 by the gather's count". The writer's decision 2 says no source settles it; that report does. Correction: the title "`NN32`'s 30, `NN64`'s 27, `UnsignedLong`'s 3 and `Char`'s 40"; "All 100 bindings over these types name helpers, ..."; and the guards' sentence "each of them but `Char`'s `asExprString` and F-327's six shifts and powers, which its own tests check, names the unsigned helper", so that "those 93" keeps its referent.
- fidelity. Passage: "`Char`'s 40". Source: the 40 is the gather's count of the merged tree (C +1), but the Detail names only `rung-natives-hard/REPORT.md` and its `SKEPTIC.md`. Correction: the Detail gains "`compile-ladder/climb-batch-27/RECORD.md`, \"The count of the bindings\"".

**C22, F-131: pass.** "`Number` declares no `=`; each type declares one at each type it coerces from or into (F-324)"; row 434 FIXED.

**C23, F-151: 1 failure.**
- fidelity. Passage: "and the checker finds no error in them (F-53); no report says what now makes them exclude." Source: the entry before gave the exclusion to the element type, "so an element type excludes `String`"; owed C23, "the sentence says only what F-324 and the tree show". "them exclude" makes the juxtapositions the subject of the exclusion, and "no report says" states the record, not the evidence. Correction: "...and the checker finds no error in them (F-53); no run measures what now keeps a scalar `T` apart from `String`." The rest of the change stands (no `comprises` clause, F-324; the norm at the eight types). The writer's question 1 for the curator, whether `String`'s own `excludes { Number, Char, AnyMultiplicativeRing }` (`Library/FortressLibrary.fsi:2524`) gives it, is a question of fact for a probe, not a decision of his: it goes to the coordinator, not to his list.

**C24, F-311: pass.** "as each type's own `asFloat` declares in its api (F-324)"; the abstract's pointer struck; the bindings' moved line numbers left to the report (question 4), noted in the history.

**C25, F-318: pass.** "with `Number`'s `comprises` clause removed, in a scratch copy before F-324 removed it from the library": the code state bounds the measurement.

**C26, F-34: 1 failure.**
- fidelity. Passage: "the type assumption (row 818, now only a dispatched call with an assumption at some of its arguments; F-325)". Source: F-325, "A dispatched call with an assumption beside an argument that is not one is refused ...; so are a generic method on an assumed receiver and an overloaded generic function"; row 818's notes (rows.md), "Also refused: a call of another component's overloaded function, a functional method whose `self` is not first, a generic method on an assumed receiver (XXXAsIfGenericMethodCompiled) and an overloaded generic function (XXXAsIfGenericFunctionCompiled)". "only" drops the refused forms beside the partial call, and "now" tells the change. Correction: "the type assumption (row 818, the forms that F-325 lists as refused)". The added "The count on today's code, with F-325's forms compiled, is not measured." and the bound "Measured once, on `dbf4825e0`'s code" stand.

**C27, F-29: pass.** "three team tests and two demos whose objects extend `Exception` directly (row 596)", as row 596 now reads; the repairs stay his.

**C28, F-123: pass.** "through the prelude's `Object`, ... (row 321), though not through the one library's `Object`, whose `asString` is `self.ilkName`", row 321's rewritten claim.

**C29, F-324's history: pass.** The noted block holds the review's three facts (no `SKEPTIC.md`, no journal line, N landed on its judge's reading of the diff); the entry is unchanged.

## POSITIONS

**C30, P-160: pass.** Before: "Then the clause is removed from `Library/FortressLibrary.fss` and `.fsi`; ... and the tests that lean on the clause are repaired." After: "Then the clause was removed from `Library/FortressLibrary.fss` and `.fsi` (F-324); ... and the tests that leaned on the clause were repaired." What he decided (the clause goes, so a program may declare its own number type below `Number`), where (the one library's `Number`, `AnyIntegral`'s clause kept) and what it requires (the two steps, first walk's) are the same; tense and the F-324 pointer only.

**C31, P-163: pass.** `:615` to `:665` and `:460-464` to `:460-466`, each checked in the tree (`FortressBuiltin.fss:665`, `Literal.rats:460-466`); the sentence on row 861's close and the three counts, a plan carried out, cut. The decision, its reach and its requirement are the same.

**C32, P-165: 2 failures.**
- fidelity. Passage: before, "The vector norm takes a bound that promises a float; climb batch 27's rung chooses its form as a fork with a default, which its review list shows."; after, "The vector norm takes a bound that promises a float; its form landed at a worker's default, the norm at each of the eight number types by its own `asFloat` (F-324)." Source: the default is the batch record's, not a worker's: `coordinator/CLIMB-BATCH-27.md:519`, "34. **N8. The vector norm at each of the eight number types.** Default: ...", and `:428`, "P-165 sends this fork to the review list with its default"; review-queue item 393 files it. The new text also drops "which its review list shows", the requirement that the form go to his review list. Correction: "The vector norm takes a bound that promises a float; its form is the default of a fork on his review list: the norm at each of the eight number types, each by its own `asFloat` (F-324)."
- fidelity. Passage: "The specification's sentence changes with the rung." cut. Source: what P-165 requires loses its clause on the specification; owed C32, "changed, `Specification/basic-lib/numbers.tex:46-54` with an Appendix I entry"; the tree's sentence, "written \EXP{\VAR{asFloat}(x)} with the method that each of these types declares; \TYP{Number} itself declares no conversion", with `\revision{revival-asfloat}`. P-166 keeps its own clause on the specification in the present. Correction: "The specification's sentence follows (`Specification/basic-lib/numbers.tex:46-54`)."

**C33, P-166: 1 failure.**
- fidelity. Passage: "`QQ`'s object `Ratio` (`Library/FortressLibrary.fss:648`) is a `value object` too (F-326)." Source: F-326 names no `Ratio` ("Both paths answer `SEQV` by the specification's rule: ... value objects of one type field by field ..."); the line citation holds the claim (`value object Ratio(num: ZZ, den: ZZ) extends { QQ }` at `:648`, checked by the writer). The pointer gives a support that does not hold it, a wrong premise in a POSITIONS entry. Correction: drop "(F-326)". The rest, before "a plain object today, becomes a `value object` too (row 911 ...)" and "in the rung that fixes what `SEQV` means (P-162)", after the same decision and requirement, stands.

**C34, P-167: pass.** "which removes one native and, once the compiled path reads the one library, the compiled stack overflow of row 321" keeps row 321's condition; "the rung works out the way", built (F-328), cut. Decision, reach and requirement the same.

**C35, P-168: pass.** "(rows 906 and 907; the prelude's own `===` keeps row 908 until the switch-over)" as row 908 now reads; "A program with a `value object CC64` tests it on both paths beside the review's 14 cases (F-326)": `tests/ValueObjectCC64Walk.fss` and `compiler_tests/StrictEquivalenceRuleCompiled.fss` both hold `CC64` (`grep -c CC64`: 9 and 3), and "it" is `SEQV`, which the compiled test checks; the compiled `=` that waits (fork E9) is PLAN's stress-test line, not P-168's.

**C36, P-164: pass.** Weight none; unchanged (word diff: identical).

**C37, P-39: pass.** Weight none; unchanged.

## The gap ledger

**C38, row 52: pass.** The claim's "but only under the illegal `extends Number`" and the note's "It works only because walk never checks `comprises` (row 22)" rewritten by its ground, "`Number` has no `comprises` clause (P-160), so a program's type may extend it"; status `POSITIVE-VERIFIED` kept, no close; the probe's commit kept; the old line in the ledger's history.

**C39, row 929: pass.** Weight none; filed at `38887293f`.

## PLAN: "Where we stand" and phase 4

**C40, PLAN.md:9: pass.** "to climb batch 27", the review's section 5; "(F-283; row 921)".

**C41, PLAN.md:10: pass.** Climb batch 27's gate with its two crash rows (F-54; row 929), 341 of 443 and 102, the code generator's `asif` (F-325), P-160's two steps (F-318, F-324); "Neither stage reads `System`'s two helper strings" in place of a count the record does not hold for the merged tree.

**C42, PLAN.md:11: pass.**

**C43, PLAN.md:12: pass.** The go of 10:4x that the routing writer could not find in the held list is in `coordinator/BOOT.md:20`: "**Climb batch 28, on his go of 10:4x** (\"Do the fable review and then launch the next batch\")"; forks I2 and W1 place P-161's rung and the reader rung in climb batch 28 (`CLIMB-BATCH-27.md:524`, `:547`); item 354 no longer named.

**C44, phase 4's new line: pass.** As the review's Part 4 words it.

**C45, PLAN.md:46 to history: pass.** Built, `a97d60dc6` (F-324).

**C46, PLAN.md:47: pass.** "Since climb batch 27, 341 of the 443 live bindings name helpers and 102 still name glue classes (F-299, F-32)."

**C47, PLAN.md:48: pass.** The clause rewritten to the built state with F-323; the old text in history.

**C48, PLAN.md:49 to history: pass.** Built by `0122a399a`, `e4872ad93`, `5ae581c4a`, `598331c0d`; the one-line remainder keeps `ZZ32`'s `big` with P-161's rung.

**C49, PLAN.md:50 to history: pass.** Built by `598331c0d`; the kept line holds only the compiled `=` waiting (fork E9) and the pointer to phase 5.

**C50, PLAN.md:51: pass.** `0122a399a`.

**C51, PLAN.md:52: pass.** `e4872ad93`.

**C52, PLAN.md:53: pass.** `fc860b655`.

**C53, PLAN.md:54: pass.** "rows 872, 915 and 927, a `Char` past U+FFFF".

**C54, PLAN.md:57 to history: pass.** `c21780408`; `FileWriteStream` to the reader rung's line.

**C55, PLAN.md:58: pass.** The reader rung takes `FileWriteStream` and its 5 bindings (row 926; item 373); "F-32's 143 becomes 107" became "(F-32 holds the count)".

**C56, PLAN.md:62: pass.** Row 818 narrowed by rung G, as its claim reads; the merged tree not measured.

**C57, PLAN.md:67: pass.** The built half's old text is in history; what stays, "Row 321 holds the stack overflow of the prelude's `Object` only, which goes with the prelude", keeps the open row filed in PLAN beside the tuple question, which stays word for word. The routing report should give that reason for keeping a row-321 clause where owed.md moves the half.

**C58, PLAN.md:88: pass.** "Its first five batches, climb batches 23 to 27, landed".

## PLAN: "Pavol's answers" and the lists for his review

**C59, PLAN.md:124 to history: pass.** Built, `0122a399a` and `e4872ad93`, his answer P-162.

**C60, PLAN.md:128 to history: pass.** Built, `fc860b655`, P-163.

**C61, PLAN.md:138 to history: pass.** Answered by his go of 14:0x UTC on 2026-11-07, cited with its time (`HELD.md:26`).

**C62, PLAN.md:681: pass.** "The questions that wait on him are items 68 to 72 above, review-queue items 377 and 373 to 376."

**C63, PLAN.md:696 to history: pass.** gather.3's stale lines are this run's; no commit can be named before this run's own, which carries the move.

**C64, PLAN.md:630 to history: 1 failure.**
- routing. Passage: `routing-report.md`, "C64 | `PLAN.md:630` | moved | P-161, item 338 in (a)."; PLAN-history's paragraph, "Z.worker.1 (P-161)". Source: the rule, an answered move cites his word on that item with its time; owed C64, "his \"OPtIoN 6! The one sane option.\" at 05:51 UTC on 2026-11-06 (`review-queue.md:1015`)". Correction: the reason, in the report and in PLAN-history's "Answered:" list, "his word of 05:51 UTC on 2026-11-06, \"OPtIoN 6! The one sane option.\" (P-161; review-queue item 338 in (a))".

**C65, PLAN.md:637 to history: 1 failure.**
- routing. Passage: "C65 | `PLAN.md:637` | moved | P-162, item 331 in (a)."; PLAN-history, "the hard-set probe's Q2 and Q3 (P-162)". Source: owed C65, "P-162, his decision between 08:5x and 09:3x UTC on 2026-11-06 (`review-queue.md:1016`)". Correction: "his decision between 08:5x and 09:3x UTC on 2026-11-06 (P-162; item 331 in (a))", in both places.

**C66, PLAN.md:638 to history: 1 failure.**
- routing. Passage: "C66 | `PLAN.md:638` | moved | P-162, item 332 in (a)." Source: owed C66, the same decision of 08:5x to 09:3x UTC on 2026-11-06 (`review-queue.md:1017`). Correction: as C65, with item 332.

**C67, PLAN.md:645: pass.** "Nothing on the path waits on them"; row 861's form pointed to the new history section.

**C68, PLAN.md:658 to history: 1 failure.**
- routing. Passage: "C68 | `PLAN.md:658` | moved | P-163, item 354 in (a)."; PLAN-history, "row 861's form (P-163)". Source: owed C68, "his \"regarding the char question, I guess D\" at about 10:1x UTC on 2026-11-06 (`review-queue.md:1019`)". Correction: "his word of about 10:1x UTC on 2026-11-06, \"regarding the char question, I guess D\" (P-163; item 354 in (a))", in both places.

**C69, PLAN.md:669 to history: 1 failure.**
- routing. Passage: "C69 | `PLAN.md:669` | moved | P-162, item 361 in (a)."; PLAN-history, "T.worker.3 (P-162)". Source: owed C69, the decision of 08:5x to 09:3x UTC on 2026-11-06 (`review-queue.md:1018`). Correction: as C65, with item 361.

**C70, PLAN.md:673 to history: pass.** Built, `e4872ad93` (F-323).

## The review queue: the batch's items for the curator

**C71, item 373: 1 failure.**
- routing. Passage: `PLAN.md:130`, "Default: as landed, it moves with the reader rung (fork W5 not taken). Review-queue item 373."; the queue's head, `review-queue.md:29`, "Default: as landed, it moves with the reader rung (fork W5 not taken)." Source: the review, Part 1, split 1, "No default on record."; fork W5's own default was "taken" (`CLIMB-BATCH-27.md:551`), which the rung did not follow; item 373's body, "Default: no default on record for the fork; as landed, it moves with the reader rung."; the routing report's "Defaults that the record does not hold", 373. The two lines file as a default what the rung did. Correction: both lines, as 377's: "No default on record for fork W5; as landed, it moves with the reader rung." The body, its kind (consequential), theme and "Needed by" stand.

**C72, item 374: pass.** No default on record; before the switch-over; consequential.

**C73, item 375: pass.** Refused, fork G2; before the switch-over; routine.

**C74, item 376: pass.**

**C75, item 377: pass.** "No default on record for the disk; as landed, the coordinator freed it and moved S and T to climb batch 28", the coordinator's call kept apart from his word; before the next batch.

**C76, item 378: pass.** In (a), his go of 05:5x UTC on 2026-11-07 quoted with its time (`HELD.md`).

**C77 to C89, items 379 to 391: pass.** Each PLAN line cut to its pointer, each item with what is asked or told, its default as PLAN held it, its "Needed by" (no planned work, 390 before the batch that fixes row 919, set by the workflow) and the kind owed.md gives (390 consequential, the rest routine).

**C90 to C98, items 392 to 400: pass.** One PLAN line naming them, one item per rung, each at the record's defaults; 397 says W5 not taken.

**C99, item 401: pass.** Fork E7 with row 923, beside E.worker.2's line.

**C100, item 402: pass.** "a default that it took, not his word".

**C101, item 371: pass.** Its "Needed by" before the switch-over and its head line in that group, as fork E6 states; its default, "decide with the switch-over batch (fork E6)", is the record's fork E6, not invented; P-162 never placed it with rung E. Open.

**C102, item 363: pass.** To (a), "Answered by a landed fix", `e4872ad93` (F-323).

**C103, item 372: pass.** Its Landed line with fork A3 and `5ae581c4a`; "the five public, as landed" is fork A3's default ("Default: so, item 372's default", `CLIMB-BATCH-27.md:562`). Open.

**C104, the queue's head: pass.** 107 open, 48 consequential, 59 routine (`queue-check.py`, `mech-1.md`); 377, 403 and 373 with the next batch; 371 and 374 to 376 before the switch-over; the new group of 26 with 390 named. The head line of 373 is C71's failure.

**C105, item 403: pass.** His go's half cited with its time; "Default: (i), the record's"; before the next batch's gate; consequential.

**C106, item 404: pass.** "No default on record"; his go read for the hold alone.

**C107, item 405: pass.**

## PLAN: the open rows that the batch filed with no line

**C108, PLAN.md:81, rows 919, 920 and 922: 1 failure.**
- fidelity. Passage: "whether row 919 comes before the rest is review-queue item 390." Source: item 390, "**Was row 921 the right one to fix first, before row 919?** ... Default: as repaired, row 919 open for a later batch." and "Needed by: before the batch that fixes row 919". The item asks about row 921 against row 919, not row 919 against the rest. Correction: "item 390 holds judge.1's note that row 921 was fixed before row 919, which the batch that fixes row 919 builds on." The rest of the line stands.

**C109, PLAN.md, row 929: pass.** The row's claim and way through, with item 403.

## Other notes

**C110, `RECORD.md:158`: pass.** A dated note after the paragraph, the record's text kept.

**C111, `RECORD.md:256`: pass.** A dated note after the paragraph, the record's text kept.

**C112, `map/spec-to-implementation.md:259`: pass.** `CodeGen.java:6428` `forAsIfExpr`, `:6545` `assumedReceiverCall`, `:6566` `assumedArgumentsCall`, checked; `TypeAscriptionDesugarer.java:21` is `forAsExpr` only.

**C113, `perf-probes/codegen-distance/REPORT.md`: pass.** Weight none; untouched.

**C114, the two decision reviews: pass.** Weight none; untouched.

## Checked, and nothing owed

**C115 to C123: pass.** Weight none, writer none; no file of theirs changed.

## The mechanical checks of mech-1.md

No check failed. The lines that report:
- words-subset.py, POSITIONS, exit 1 (information): P-160's tense and F-324 (C30, pass); P-163's two line numbers (C31, pass); P-165's norm sentence (C32, fails on its source and its cut); P-166's line and F-326 (C33, fails on the pointer); P-167's condition (C34, pass); P-168's rows and test sentence (C35, pass).
- lengths.py, 17 entries over 600 that grew: each growth is its change's own clause, F-32 C18, F-34 C26, F-53 C17, F-54 C14, F-123 C28, F-151 C23, F-240 C13, F-281 C15, F-288 C16, F-299 C19, F-308 C21, F-318 C25, F-325 C12, F-329 C10, P-160 C30, P-167 C34, P-168 C35; C14's correction changes F-54's `#class` clause, and C15, C16 and C21 add a Detail pointer each.
- plan-moves.py, two LOOK lines: `PLAN.md:79` (item 91, closed with its reason, C120) and `:199` (`40302280c`, the line's subject still waiting, C121), each kept with owed.md's reason.
- check-index.sh, two prose paths that resolve nowhere: INDEX is unchanged by this run, so no change of it owns them.

## Seen outside owed.md, for the coordinator

- F-310's "The 51st, `^` at a `Float` exponent, still names a glue class" is false since `e4872ad93`: `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:333-334` binds `opr ^(self, b:Float):RR64` to `simpleFloatArith.floatPowDouble`; F-299 now reads `RR32` 51.
- F-306's "trait `ZZ64`'s 26 and trait `ZZ`'s 22 native bindings name helpers" against F-299's 29 and 26 since rung I (`0122a399a`).
- The review's "an older slip" for F-54's `#class` rows (section 7, point 6) is the table's rule, not a slip (C14).

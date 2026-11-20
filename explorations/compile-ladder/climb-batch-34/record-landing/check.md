<!-- The record-landing workflow's check of climb batch 34's first round: each change of owed.md against its ground, for coverage, fidelity, form and routing, with each failure's correction, then the mechanical checks of mech-1.md. -->

# The check of round 1, climb batch 34

Read: `owed.md`; `entries-report.md`, `routing-report.md`, `record.apply`, `mech-1.md`; `git diff f7c6c2cae -- explorations/ ':!explorations/coordinator/PLAN-history.md'` in the worktree, and PLAN-history's new head (its reasons only); the sources each change cites: `reviews/batch-34-review.md`, `plan-34/probes/measure-285efad802.txt`, `rung-label-local-verify/REPORT.md:85-118`, `rung-type-variable-receiver/REPORT.md`, "What changed and why", `CLIMB-BATCH-34.md` sections 2 and 4, rows 818, 874 and 1092 to 1097 (`rows.md`, `ledger.py show`), P-146, P-157, P-102 and its history, `HELD.md` "Held in chat (2026-11-18)", `CodeGen.java:7266-7356` and `NamingCzar.java:606-614` at the worktree, and his messages by `curator-profile/show.py` (2026-11-18T15:49, 2026-11-20T14:36, 14:44, 14:48).

Result: 72 pass, 5 fail, with 6 failures, all of fidelity. Coverage, form and routing find no failure.

## The entries (writer: entries)

**C1, C2, C3 (F-34)**: pass. The title and body state the count on `285efad802` by the script (0 refused, 754 emitted, no component failure) and by `String`'s real compile without the patch ('compile exit=0', both calls to the `(String, String)` body), as `measure-285efad802.txt` gives; `ba3c7c876d`'s 2, of which the script counted 1; the caveats kept (row 874's patch, the skip of the dispatch methods, no emitted class run, no test); the patch needed while the payload table has no rows for the one library's seven (`NamingCzar.java:606-614` names them: `ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`, `NN32`, `RR32`), the `sed` a no-op; "on the code of `285efad802`" and "Measured once on each code" bound the measure; the Detail cites the measure file. C3's counts of `d3747846c1` and `c3b16ef2d1` are in the history note.

**C4, C5, C7, C8, C9, C12, C13**: pass, weight none. F-53's and F-240's gate figures are unchanged (F-53 not touched; F-240 only noted).

**C6 (F-240's history)**: pass. The note gives the review's section 5 (17:06 restart, 2.30 GHz before, 2.10 GHz after, `testFast` 11 min 45 s against 7 min 53 s, so no figure compares with climb batch 33b's); F-240's text is unchanged.

**C10, C11 (F-325)**: fail, two failures. C11 passes (2580 to 2384 characters; the questions named).
- fidelity. Passage, the title: "at a call of an overloaded function or operator of its component where only some dispatched arguments are assumptions, and as a value; the other partial calls stay refused." Source: the entry's own body ("a partial call whose own dispatch would hold a functional method"; "a generic declaration at or below the resolved one"), the review's section 1, P (`CodeGen.java:7310-7311`, `:7351-7352`) and `CodeGen.java:7266-7356`: both refusals are inside `partiallyAssumedCall`, that is inside the very form the title says compiles. So "the other partial calls" does not cover them, and the title lets a reader conclude that every partial call of an overloaded function of the component compiles. The report's "the title names every compiled form" and its account of the replaced clause rest on this. Correction: end the title "...and as a value; the other partial calls stay refused, and so does such a call where a declaration at or below the resolved one is generic or its own dispatch would hold a functional method."
- fidelity. Passage: "Row 818's notes name each refused form's `XXX` test." Source: row 818 (`rows.md`): `XXXAsIfPartialMethodCompiled` is its reproducer, not in its notes; the six others are in its notes (the writer's own report says so). Correction: "Row 818 names each refused form's `XXX` test, in its reproducer and its notes."

**C14, C15 (F-392)**: pass. The title names the code generator; the skeptic's `where` clause (`54c56dc6e9`) is kept as rung T's "What changed and why" gives it ("a method's own `where` clause ... where the method has no static parameters of its own"); the cut Detail section is not needed for the mechanism, which "What changed and why" holds.

**C16, C17 (F-393)**: pass. The verifier's figure is bounded to one run of the rehearsal tree with the rehearsal's hacks (rung L's scratch copy, `rehearsal-34.patch` less row 1078's stand-in, `REPORT.md:87`) and given whole ('TOTAL classes 1092 methods 9477 refused 2 templates skipped 1092', `REPORT.md:115`); +5 characters is the owed clause.

**C18, C19, C20 (F-394)**: pass. The title bounds the check to a getter declared in a trait or an object, "but not in an object expression (row 1097)", as row 1097's claim and notes give; the object expression's 'Can't compile ObjectExpr' (row 375) is kept; the library's half of rung G is one clause (`NN32`'s two and thirteen more, the review's section 1, G); the walk effect goes to the history, which owed C18 allows; +87 characters after a move of about 330 is the owed clauses.

**C21, C22 (F-395)**: pass. The Detail path starts `compile-ladder/`.

**C23 (F-225)**: fail, one failure. Form passes: the moves to the history are of dates and a repair (question 3), and +111 characters is less than the owed title clause and body sentence.
- fidelity. Passage: the title's "save in the overloading check's exclusion test (F-277) and in the Return Type check of a dotted method redeclared below the trait (row 1094)", followed by "It builds P-146.", and the body's new sentence, which names neither decision. Source: owed C23 ("F-225 names row 1094 as the departure"); the review, Part 1, "Corrections owed" ("P-146 and P-157 hold; the tree departs from them at row 1094") and section 1, G ("That departs from P-146 ... and P-157"); P-146: "The method signatures keep the plain trait type. Only the overloading check's exclusion test reads `self` in a signature as `C[\X\] & X` (P-157)"; P-157: "specificity and the Return Type Rule keep the plain signatures". The new text sets the second exception beside the first, which P-146 decides, under "It builds P-146", so a reader can take the departure as decided. Correction: end the body's new sentence "...; a getter so redeclared reads the plain type and compiles (F-394). That reading of a dotted method departs from P-146 and P-157, which keep the plain signatures for the Return Type Rule (row 1094)."

**C24 (P-102's history)**: fail, one failure. P-102 is unchanged, before and after the same: "**Test first, the test kept.** Every edit of source code in the original tree starts from a failing test. The worker adds the test to the test suite, sees it fail, makes the fix, and sees it pass. ..." (decision, reach and requirement unchanged). His quotes in the note match his message of 2026-11-18T15:49:11.126Z word for word.
- fidelity. Passage: "The rule stands in the fortress-repo skill's references/tests-writing.md, "The order", step 2, and in the batch manual's skeptic check 2". Source: the review, section 3 ("the manual's "Skeptic" (`53e7e33eec`), whose check 2 accepts "the failure stated before the first run, or the one the section names"") and A1 ("a fallback that his words do not have"); `climb-batch-workflow.md:128`. The note drops the fallback, so it shows the form as built (C61's default, way 1) as his rule. Correction: "The rule stands in the fortress-repo skill's references/tests-writing.md, "The order", step 2; the batch manual's skeptic check 2 also accepts the failure that the section names, a fallback that his words do not have (climb-batch-workflow.md:128)."

**C25, C26, C27, C28**: pass, writer none.

## PLAN, PLAN-history, the queue and the map (writer: routing)

**C29, C30, C31 (`PLAN.md:9-11`)**: pass. C30's partial-call clause is owed C30's own wording, with F-325 as its pointer.

**C32**: pass, weight none.

**C33 (`PLAN.md:13`, "Next")**: fail, one failure. The rest passes (the measure `8f7604e42c`, run 2 after the updates and the manifest worker, step 3's pieces owed, item 608 holding no launch, item 597's default as `CLIMB-BATCH-34.md` section 2 states it).
- fidelity. Passage: "on his go of 14:3x UTC that day, ..., and "Both runs" at 14:5x". Source: `show.py 2026-11-20T14:44`: "That's good. Both runs. ..." at 14:44:55.177Z; the go, "Go to launch", is 14:36:33.147Z. The error is in the ground (owed C33; the review, "For the curator", :409). Correction: "and "Both runs" at 14:44".

**C34, C47 (`PLAN.md:57`)**: pass. One line, its landing commit and its review; rows 1093, 1094 and 1097 join item 3.

**C35, C36, C38, C40, C77 (`PLAN.md:70`, `:72`, `:74`, `:101`, `:99`)**: pass. C35's "row 874's wrappers are the one wall" agrees with row 874 (the converters for the one library's types) and rung C's step 3.

**C37, C39, C41, C44**: pass, weight none.

**C42, C43 (`PLAN.md:143-144`)**: pass. Item 71 is the review's section 2 text word for word.

**C45, C46 (`PLAN.md:876`, `:907`, `:296`)**: pass. Items 2 and 3 of `CLIMB-BATCH-34.md`'s list hold rows 1054, 1055, 1056 and 1088 as the lines say; row 1092's "Default: parked" is the section's own default (its opening), and the roadmap's section 8, "Gaps" (`speed-roadmap-2026-11-20.md:227`), holds the row.

**C48, C49, C50 (`PLAN.md:912`, `:915`, `:921`)**: pass. G.worker.1 is rewritten as told, the departure from P-146 and P-157 named, its repair with item 3.

**C51 (`PLAN.md:922`, finding A1)**: fail, one failure. Its three ways, recommendation, default and "holds no launch" match the review's A1 and item 608.
- fidelity. Passage: "five reports and three skeptic files claimed a statement that the transcripts do not hold; four of the claims were corrected after the landing (`f7c6c2caec`)". Source: the review, section 3 ("five false claims made, four corrected by the skeptics ..., and four left on `main`") and Part 1, finding 1; item 608's own text ("the skeptics corrected four, and `f7c6c2caec` corrected the other four after the landing"). The line leaves the other four unaccounted, so a reader takes them as still standing. Correction: "...; the skeptics corrected four of the claims, and `f7c6c2caec` the other four after the landing."

**C52 (PLAN-history)**: pass. 21 lines moved under 7 headings, the 21 that `routing-report.md` names; the head gives each a reason ("Rewritten to the landing"; "No line moved whole").

**C53 to C58 (items 375, 376, 400, 584, 602, 603, 597)**: pass. 375 restated as the review's section 2, its "Landed:", "The other way" and Home as owed, its Needed by item 3 (set by the workflow), its head line moved with the counts in line; 597's "if the fourteen components then compile to jars" is owed C58's ground ("once run 2 compiles them to jars").

**C59 to C68 (items 606 to 615)**: pass. Each new item has its question, its default and its "Needed by"; no default is invented (the routing report lists each "other way" and its source); 607 moves to (a) on his word on fork L1 at 14:3x (14:36:33Z), which P-102's history block of 14:38Z holds; 610 stays open as told, with owed C63's "Needed by", the alternative named in the report.

**C69 (the queue's head and Counts)**: pass. 259 + 9 open = 268, consequential 93 + 1 (608) = 94, routine 174; "Before the switch-over" 22 (19, 3) with 375 out; `queue-check.py` passes.

**C70 to C74**: pass, writer none.

**C75 (the map's `asif` row)**: pass. Each member cited without a line number.

**C76**: pass, writer none: the coordinator's.

## The mechanical checks of round 1

- No check of `mech-1.md` fails.
- `plan-moves.py`'s five LOOK lines, numbered in the new PLAN (one line higher past `:57`): `:12` is owed C32, `:72` (old `:71`) C36, `:73` (old `:72`) C37, `:95` (old `:94`) C39, `:250` (old `:249`) C44; each has its reason in `owed.md`, so none fails coverage.
- `lengths.py`'s growth past 600: F-225 +111 (C23), F-393 +5 (C16), F-394 +87 (C18, C19), each by the clause its change owes.
- `record.py check`'s report of `POSITIONS-history.md:3666` (`HELD.md`, "Held in chat (2026-11-07)") is older than the batch (owed, "For the coordinator").

## For the coordinator

- The review's "For the curator" (`reviews/batch-34-review.md:409`) and `owed.md`'s C33 give "Both runs" at 14:5x; his message is at 14:44:55Z.

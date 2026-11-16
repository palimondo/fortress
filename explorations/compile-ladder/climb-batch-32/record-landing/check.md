<!-- The checker's report on the first round of the record-landing run for climb batch 32: each change of `owed.md` against its ground, for coverage, fidelity, form and routing, with each failure's correction, and the mechanical checks' notes. -->

# The check of round 1, climb batch 32

91 changes pass and 2 fail: C65 (coverage) and C88 (fidelity). No failure of form or of routing.

## The changes

- **C1**: pass. F-53: the one false sentence is cut; every other sentence and both figures (distance 0, count 0) are as before.
- **C2**: pass. F-240: one clause, "and beside the first minutes of `testFast`, so its time is one under load", and its Detail pointer; the review, section 4 (`batch-32-review.md:146`) and `:282`, holds it. No figure changed (95 s, 165 s, 102 s, 0.31, 128 s, 83 s, 0.14).
- **C3**: pass. F-58: the title and every count stay; rows 989, 988 and 474 leave the body; line 41's site gone and line 77's new one are in `compile-ladder/rung-tuple-binding/REPORT.md:104-107`, which the Detail now names; "No run has counted the sites since `832f7d0d91`" keeps the code state that bounds the count. Remark, no failure: "The checker stops a block at its first failing statement, so each count is a floor" now stands with no row; the two probe notes give it by row 474, which is FIXED, and what holds it is row 474's former note (rows.md, row 474: "on other variables a failing operator reports its error, then ends the block"). No run after the batch shows it; the count on the merged tree (review-routed.3) will.
- **C4**: pass. F-59: "(F-364; row 731, closed)" to "(F-364)", and "Walk runs such a call: it instantiates" to "Walk instantiates"; no claim changed.
- **C5**: pass. F-221: "an F-bounded one" to "one whose bound names its parameter"; the review's point on a call's argument is left to F-364, which states it ("A call's argument has no expected type where the call is accepted without one (P-51), so a reduction there runs at its body's type"). The report names it as left, with that reason.
- **C6**: pass. F-285: rows 731 and 632 leave the body (both FIXED); each repointed citation of `FortressLibrary.fss` holds its text in the worktree (`:4581`, `:4587`, `:2720`, `:3106`, `:3111`, `:4765`, `:4782`, `:1586`, `:2740`, checked).
- **C7**: pass. F-341: two sentences reworded, no claim changed. Remark, no failure: "at its default, or at a declaration strictly below that its own coercion reaches (F-366)" no longer says by itself which of the two runs, as "unless" did; F-366's title says it, and F-349 has the same form.
- **C8**: pass. Weight none.
- **C9**: pass. F-349 kept with no line; the report gives the reason, and its last sentence agrees with F-366.
- **C10**: pass. F-362: row 42 now stands at the import list's clause alone, as the row's claim is; "no test applies the sign to an array" is the review's, section 3.
- **C11**: pass. F-363: "which no test asserts" is the review's (Part 1, "Three behaviours landed with no test that pins them"); "For the work:" is gone.
- **C12**: pass. F-364: row 1015's clause matches the row; the base-against-tree counts leave for "Observed once, in copies with the argument removed"; "the library and the model still write it (F-285, F-59)" replaces the closed row.
- **C13**: pass. F-365: row 1013's clause matches the row (accepted, dead at run time). The narrowed sentence on the row lift is not named in `owed.md`; its ground is the review, section 3, item 2, "No test compiles a generic function passed to a generic callee whose sizes the other argument fixes", and the report names it.
- **C14**: pass. F-366: one-sentence title; "P-46 does not word the order, and the worker that built the rule chose subtyping" is the form that `record.md` asks of a worker's choice, and its ground is the review, finding 2. The citations hold. Remark for the coordinator, no failure: the entry does not say that walk's half stands at the coordinator's fork W (the report's decision not taken 2); item 525 names F-366.
- **C15**: pass. F-367: "for an overloaded `twice` with a generic declaration ... which no test pins" is `batch-32-review.md:73` and `:274`. The clause on a declared arrow return type and a field is left, with the reason that `owed.md` gives.
- **C16**: pass. F-368: "the code generator compiles no array literal ..., so such a line does not compile" is the review's finding 3, which the review has by reading, not by a compile (`batch-32-review.md:478`); the entry gives the skill's part as its source.
- **C17**: pass. F-369: "Every compiled top-level variable is initialized at its first read, not at load as under walk" is `rung-tuple-binding/REPORT.md:77` and `:179`; row 1031's clause matches the row.
- **C18**: pass. F-280: the title's "over `Any`" and the new sentence agree with `Library/FortressLibrary.fss:98-103`; `:308` is the three-argument `assert`.
- **C19**: pass. 28 entries, citations only. I compared every backticked line citation of a file that `db352c177..c0c35b4f9` changed, in both record files, base line against worktree line, by a script: each repointed citation holds at its new line the text that the old line held, and no entry outside the 28, F-280, F-285 and P-166 cites a line whose text changed, but for the entries that the gather wrote on the landed tree (F-349, F-363, F-365 to F-369). The report gives its count against the review's (28 and two, F-48 added).
- **C20**: pass. P-166: `:648` to `:649`, `value object Ratio`. P-154 left, with its reason: its two citations name commit `a874948ac`, whose lines do not move.
- **C21**: pass. Weight none.
- **C22**: pass. Weight none.
- **C23**: pass. P-78. Before: "The compiled checker fixes it from neither the generators, the body nor a declared type that receives the value, and refuses every such `SUM` or `PROD` that leaves it out (row 731, a gap of the checker). Row 731's workaround is to write it in every clause form of `SUM` and `PROD`, as in `SUM[\ZZ32\][j <- 0#n] f(j)`." After: "The compiled checker fixes it from the reduction's expected type, else from the type of its body, where a `SUM` or `PROD` leaves it out (F-364). It is written as in `SUM[\ZZ32\][j <- 0#n] f(j)`." The decision ("one generic reduction each ..., and take their identity from the static argument"), its reach and its requirement ("A reduction written with generators writes its static argument where nothing at the call fixes the element type.") are word for word the same. The new sentence is F-364's title; its conditions (the call as written tried first, row 1008's difference between the paths) are behind the pointer. The report puts the tension with the requirement to the curator as its question 1, and does not settle it.
- **C24**: pass. P-79, words cut only. Before: "The compiled checker refuses `trips.fss` (row 817), and the reductions that leave out the static argument ...; their repair writes the argument (row 731)." After: "The compiled checker refuses `trips.fss` (row 817)." The decision ("Every team demo is kept running as the tree changes"), its reach and its requirement are the same; nothing new is claimed.
- **C25**: pass. P-46, words cut only: "Rows 973 and 966: walk answers `false` for `u = 0`, and `true` for `u =/= 0`, which follows `=`." is gone. The sentence on `Any` and "the most specific" are untouched (C27, C28).
- **C26**: pass. P-173. Before: "(P-46 gives the rule and its ground; rows 973 and 966 hold where walk departs)". After: "(P-46 gives the rule and its ground; row 1016 holds where walk departs, and row 1017 where both paths do)". Both rows are as the ledger has them; the decision, its reach and its requirement are the same.
- **C27**: pass. Weight none.
- **C28**: pass. Weight none.
- **C29**: pass. Weight none.
- **C30**: pass. Weight none.
- **C31**: pass. Weight none.
- **C32**: pass. Weight none.
- **C33**: pass. Weight none.
- **C34**: pass. Weight none.
- **C35**: pass. Weight none.
- **C36**: pass. Weight none.
- **C37**: pass. Weight none.
- **C38**: pass. PLAN:9. `climb-batch-32/gate/summary.txt:148-151` gives 7 of 7 twice; RECORD.md:55 gives "52 run, 52 reached their end".
- **C39**: pass. Item 525 stays open in (b), reworded: what is asked (confirm, or take walk's half back), default as landed, "Needed by" from the review's steps, 1. It says "No word of his is on the fork itself" and shows the default as the coordinator's reading. His two quoted phrases are in `history:P-46` as quoted. Head line, PLAN:149 (item 86) and the group's line are there.
- **C40**: pass. Item 528, in (b): the question, both ways, default as landed, the review's recommendation shown as the review's; the three examples are `batch-32-review.md:63`.
- **C41**: pass. Item 529, in (b): default 3a, "which changes nothing"; it says that the review has the code generator's refusal by reading.
- **C42**: pass. PLAN items 86 to 88, each a pointer with its default and its queue item. They stand after items 80 to 82, not after 85; the report names the departure for the coordinator.
- **C43**: pass. PLAN:10.
- **C44**: pass. PLAN:11.
- **C45**: pass. Weight none; PLAN:12 is the first LOOK line below.
- **C46**: pass. PLAN:13: it names no go and no answer of his; the kept sentences are word for word.
- **C47**: pass. PLAN:52.
- **C48**: pass. PLAN:53: "at his request of 2026-11-15" is `CLIMB-BATCH-32.md:1`, `:471` and `:698`; the old line is in PLAN-history, reason built (`b190b8eb25`, `060f3ec096`).
- **C49**: pass. Weight none; PLAN:91 is the second LOOK line below.
- **C50**: pass. PLAN:95.
- **C51**: pass. Weight none.
- **C52**: pass. Moved; reason built, row 989 FIXED by `b190b8eb25`.
- **C53**: pass. Moved; reason built, row 988 FIXED by `060f3ec096`.
- **C54**: pass. Moved; reason built, row 731 FIXED by `d159b71975`; the probe over the demos stays at PLAN:269.
- **C55**: pass. Weight none.
- **C56**: pass. PLAN:269.
- **C57**: pass. PLAN:279: 731 and 758 left the list.
- **C58**: pass. Weight none; PLAN:220 is the third LOOK line below.
- **C59**: pass. Weight none.
- **C60**: pass. PLAN:790.
- **C61**: pass. Its item has the question, the default as PLAN's old line gave it, and "Needed by: no planned work (set by the landing workflow)".
- **C62**: pass. Its item has the question, the default as PLAN's old line gave it, and "Needed by: no planned work (set by the landing workflow)".
- **C63**: pass. Its item has the question, the default as PLAN's old line gave it, and "Needed by: no planned work (set by the landing workflow)".
- **C64**: pass. Item 470 to (a), reason built (`b190b8eb25`, row 966 closed); the entry says that the way built is the record's fork N3 and that item 544 puts it to him, so the batch's default is not shown as his word. Its PLAN pointer is in PLAN-history.
- **C65**: **fail, coverage.** Item 51 goes to (a) with its reason (built, `d159b71975`), and the way built is put to him as item 533. But three PLAN lines point to item 51, and `plan-moves.py` lists each to look at.
  - The passage: `PLAN.md:445`, under "Climb batch 14, listed for his review": "A.worker.1 and A.skeptic.1 of climb batch 14's rung A: P-51's retry reaches a reduction's big operator ... Does P-51's wording reach this? Default: as built. Review-queue item 51; P-51."
  - The source: `mech-1.md`, "LOOK PLAN.md:445 ... settled: its own review-queue item is in (a): 51". `owed.md` C59 gives a reason for the other two (old `:330` and `:585`, now `:337` and `:592`: a past batch's list, kept as written); it does not name old `:438`, and the routing report names none of the three.
  - The correction: the routing writer either moves `PLAN.md:445` to PLAN-history, under the landing's heading and "Climb batch 14, listed for his review", as it moved the pointers of items 470 and 472, or adds to its report the reason that it stays. The line's own question, whether P-51's wording reaches a plain-bounded reduction's big operator, is not what row 731's close answers: if the line moves, item 51's entry in (a) says in one clause where that half stands (F-221: built, and it builds P-51). `:337` and `:592` then take the same treatment, or the report repeats C59's reason for them; `:337` still says "an F-bounded one is still refused".
- **C66**: pass. Item 247, five places; the question stands with row 817 alone, and "which demos it now accepts is not measured".
- **C67**: pass. Item 325, one clause and its home list.
- **C68**: pass. Item 472 to (a), reason: row 966 closed by `b190b8eb25`, the file now the passing test.
- **C69**: pass. Item 533.
- **C70**: pass. Item 534, four parts, each with PLAN's old default.
- **C71**: pass. Item 535; it gives the review's reading of `initialization.tex:29-30` as the review's.
- **C72**: pass. Item 536; its first part's default is "none written", as PLAN's old line had it.
- **C73**: pass. Item 537.
- **C74**: pass. Item 538.
- **C75**: pass. Item 539; its second part says "No default on record".
- **C76**: pass. Item 540. D.worker.3's old line gave no default in words; "as landed" is what `owed.md` sets, and the item states what landed (the note in row 152).
- **C77**: pass. Item 541.
- **C78**: pass. Item 542.
- **C79**: pass. gather.3 moved; its default, "each entry to be read whole at the record's landing", is done by C3 to C7 of this run, which has no commit yet. What it left open is under "For the coordinator".
- **C80**: pass. review.1 moved; its default, "each reworded at the record's landing", is done by C23 to C26.
- **C81**: pass. Weight none.
- **C82**: pass. PLAN:807.
- **C83**: pass. Weight none.
- **C84**: pass. Item 543, told, with its line in PLAN's group.
- **C85**: pass. Item 544, with its line in PLAN's group.
- **C86**: pass. Items 545 and 546; the ways, the costs and the defaults are the record's (`CLIMB-BATCH-32.md:276-284`, `:465`).
- **C87**: pass. Items 547 to 550; each default is "the model as it is", which changes nothing, and each kind is reported as set from P-87.
- **C88**: **fail, fidelity.** The three parked lines hold the sixteen rows, each with words that match its row.
  - The passage: `PLAN.md:261`, "Rows that climb batch 32 opened on the compiled path, offered to climb batch 31's planner as walls that a test against the prelude shows (`reviews/batch-32-review.md`, Part 4 and Part 5; ...): ... row 1005, a subscript followed by a superscript stops the compile."
  - The source: the review's Part 5 says the opposite of row 1005: "Rows 1005, 1007, 1009, 1010, 1012 and 1015 are the checker's and no wall of the rehearsal: the batch after." Only Part 4 puts row 1005 with climb batch 31's planner. The line cites both parts for all six rows. The disagreement is the review's own, and `owed.md` C88 followed Part 4.
  - The correction: after row 1005's words, one clause: "which Part 5 puts with the batch after, as the checker's". No row moves.
- **C89**: pass. The head: 217 open, 86 consequential, 131 routine, which `queue-check.py` confirms; each group's count follows its items (the next batch 9, before the switch-over 22, parked rungs 10, climb batch 29's 26, climb batch 32's 21). Items 525, 528 and 529 stand in "The next batch", and the report names that departure.
- **C90**: pass. Weight none.
- **C91**: pass. Weight none.
- **C92**: pass. Weight none.
- **C93**: pass. Weight none.

## Outside `owed.md`

- `PLAN.md:97`, "Its first ten batches, climb batches 23 to 30 and climb batch 32, landed": the same fact as C44, reported by the routing writer. Pass.
- The entries writer's question 1, whether P-78's requirement still asks line 43 to write `SUM[\ZZ32\]`, is in its report only. Item 549 names P-78 in its home. For the coordinator.

## `mech-1.md`

Every check passes. The lines that report without failing, each with its cause:

- `words-subset.py` over every POSITIONS line, exit 1 (information): P-78 adds the words of its new sentence (C23); P-166 adds `649` (C20); P-173 adds the words of its clause (C26). P-46 and P-79 add none (C25, C24).
- `lengths.py`, 12 entries past 600 that grew: F-58 +23 (C3, after the per-file breakdown moved out), F-221 +1 (C5), F-240 +115 (C2, the clause and its pointer), F-280 +145 (C18), F-334 +2 (C19, longer line numbers), F-362 +52 (C10), F-364 +79 (C12, row 1015), F-365 +150 (C13, row 1013 and the narrowed sentence), F-367 +83 (C15), F-368 +99 (C16), F-369 +110 (C17, rows 1011 and 1031), P-173 +27 (C26). Each is the clause that its change owes.
- LOOK `PLAN.md:12`: stays, by C45.
- LOOK `PLAN.md:91`: stays, by C49.
- LOOK `PLAN.md:220`: stays, by C58.
- LOOK `PLAN.md:337`: stays, by C59 (old `:330`); see C65.
- LOOK `PLAN.md:445`: neither moved nor given a reason; C65's failure.
- LOOK `PLAN.md:592`: stays, by C59 (old `:585`); see C65.

## What I read outside the brief's tools

- One script read the worktree's `FACTS.md` and `POSITIONS.md` for backticked line citations only (C19, C20).
- One `grep` of the worktree's `POSITIONS-history.md` for the two quoted phrases of item 525.

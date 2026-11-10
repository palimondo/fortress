<!-- The record-landing workflow's check of round 1 for climb batch 30 (base 9d0147ff9e, landing d89fc0fda4, worktree at f592b7c0f): each change of owed.md as pass, or each failure with its class, its passage, the source that shows it and its correction, then the lines of mech-1.md. -->

# The check of round 1, climb batch 30

90 changes: 85 pass, 5 fail. By class: fidelity 4 (C3, C6, C37, C75), coverage 1 (C39), form 0, routing 0. No mechanical check fails.

How I read: `owed.md` whole; both reports; `mech-1.md`; the worktree's diff from `f592b7c0f` for FACTS, POSITIONS, the ledger, PLAN, the review queue and the two maps; the 12 rewritten entries of weight above low or with new sentences through `facts-extract.sh`; the code, the review and the reports that the new sentences cite. The seven re-anchored ranges (C13 to C17) I compared by `diff` of the old range at the base with the new range in the worktree: each is the same text.

## The entries writer's changes

### C1, F-53
Pass. Weight none; the entry is not in `record.apply`, and the diff does not touch it.

### C2, F-240
Pass. Weight none; not touched.

### C3, F-19
Fail, fidelity (low).
- Passage: "F-350 gives the calls that the analyzer does not mark, and the joins."
- Source: F-350 as applied names one kind of such call, "The analyzer marks no call written in the prelude's files ... (row 982)". The other kind, a call of a function declared later in the file, is in no entry: it is this run's new row 987 (C24; `mech-1.md`, "row 987"). So the pointer promises more than F-350 holds.
- Correction: "F-350 gives the joins; rows 982 and 987 hold the calls that the analyzer does not mark, those written in the prelude's files and those of a function declared later in the file."

The rest passes: "chunks of at most 16 elements" agrees with `Library/RangeInternals.fss:1321`, `:1338` (`0 <= (hi DOTMINUS lo) < grainSize`), and `:1498-1585` is the strided range's `generate` and `loop`, as RECORD.md's "Points to report", P, has them.

### C4, F-134
Pass. The closed row left; "a named `typecase` clause there has no gated test" stays.

### C5, F-347
Pass.

### C6, F-348
Fail, fidelity (low).
- Passage: "A compiled program's start takes about 40 ms more for it: 249 to 313 ms against 214 to 263 ms, measured once on rung N's code, which landed as `f36a651243`."
- Source: `reviews/batch-30-review.md:82`, "about 40 ms more (five runs twice: new 249 to 313 ms, old 214 to 263 ms; the skeptic's finding 6)". The entry drops the sample, and "measured once" beside two ranges reads as one run each; it does not say that the second range is the code before.
- Correction: "A compiled program's start takes about 40 ms more for it: 249 to 313 ms against 214 to 263 ms before, five runs twice, on rung N's code, which landed as `f36a651243`."

The rest passes. The arguments set first is `runtimeSystem/MainWrapper.java:94`, before `initializeInRootTask` at `:95`. The growth, +135, is the two facts that C6 owes, and the mechanism that left is in the report's section 1.

### C7, F-349
Pass. "(a probe, no test)" is the skeptic's `SkChain` (`compile-ladder/rung-numeral-leftovers/SKEPTIC.md:24`); "wherever the relation has no cycle" is its correction 3 (`:43`).

### C8, F-350
Pass. "splits only a range of more than `grainSize`, 16, elements" agrees with the code and with the review's finding 1 ("Only a range of 17 or more splits"). "By reading, not run" is the review's own bound, and the Detail names its section. The widths are at `MicroGptFlat.fss:17`. The growth, +330, is the sentence that C8 owes.

### C9, F-351
Pass. The title states two facts of the body. The seven closed rows left; row 984 keeps its words.

### C10, F-57
Pass. Ground: rows.md, row 967, FIXED; the review, section 1, rung N, "Walk".

### C11, F-341
Pass. The clause on the infinity, the sentence on the load check with row 981, the six tests and the report's section are what C11 owes; row 981 as the ledger holds it agrees ("refuses the same type in an `extends` clause or as a static argument at load"). The growth, +532, holds nothing else.

### C12, F-283
Pass.

### C13, F-175
Pass. `changes.tex:3346-3542` at the base is `:3345-3541` now, `:3612-3619` is `:3611-3618`, and `:1616-1619` did not move.

### C14, F-268
Pass. `CodeGen.java:6250-6255` is `:6318-6323`.

### C15, F-302
Pass. `:5527-5534` is `:5595-5602`.

### C16, F-315
Pass. `:3029-3031` is `:3087-3089`.

### C17, F-337
Pass. `InstantiatingClassloader.java:2897-2919` is `:2969-2991`.

### C18, P-175
Pass.
- Before: "and splits down to single elements (`Library/RangeInternals.fss:1308-1342`); the code generator evaluates a call's arguments in order (F-19, row 951), under the team's comment "Why isn't this parallel???" (`compiler/codegen/CodeGen.java:7068`), so every `SUM`, `DOT` and `BIG MAX` of microGPT would run its bodies one at a time once compiled programs run the one library." and "which the compiled path does not do (`CodeGen.genParallelExprs` joins on the normal path only, row 947; ... section 7.1)."
- After: "and split down to single elements when he decided (`Library/RangeInternals.fss:1312-1350`); the code generator evaluated a call's arguments in order, under the team's comment "Why isn't this parallel???", so every `SUM`, `DOT` and `BIG MAX` of microGPT would have run its bodies one at a time once compiled programs ran the one library." and "which the compiled path did not do then (`CodeGen.genParallelExprs` joined on the normal path only; ... section 7.1); F-350 gives what the tree does now."
- What he decided (the title), where it applies and what it requires ("The split stops at a chunk that runs efficiently in sequence", "It needs a group of forked arms to join every arm before it completes abruptly") are the same words before and after. The four clauses that the tree made false are in the past, and nothing says that the tree now meets the requirement, so C22's two questions stay open.

### C19, P-174
Pass.
- Before: "Rows 960 and 974 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written as a static argument or as a type that an object or a trait extends."
- After: "Rows 960 and 981 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written in a `comprises` clause."
- The decision, its reach and its requirement are untouched; row 981's claim is those words.

### C20, P-176
Pass.
- Before: "Rows 957 and 971 hold where the tree departs: a place whose type names a type parameter, and a coercion that spawns a task."
- After: "Row 957 holds where the tree departs: a place whose type names a type parameter."
- "filled when the class loads" and "walk runs that coercion at the place's first evaluation" stand as he worded them.

### C24, row 987
Pass. The claim and the notes hold what the skeptic of rung P wrote under "Which calls count" and what the parallelism review holds on every named call; "by reading, not run" is its bound; `ledger.py add` and `ledger.py check` pass. The status, `CONTESTED` against `NEGATIVE-BOUNDED`, is the writer's decision not taken, for the coordinator.

## Changes of weight none or with no writer

C21, C22, C23, C25, C34, C60, C82, C83, C84, C85, C86, C87, C88, C89, C90: pass, each by its line in `owed.md`. PLAN.md:84 (C34) and :204 (C88) are the two lines that `plan-moves.py` lists to look at, and `owed.md` gives the reason that each stays.

## The routing writer's changes

### C26, PLAN "Runs"
Pass. "51 of 52 ... and all 52 in two more runs" is RECORD.md's, as the list's gather.2 held it.

### C27, PLAN "The live thread"
Pass.

### C28, PLAN "Landed"
Pass.

### C29, PLAN "Next"
Pass. It states the three findings at their defaults, his numeral answer to POSITIONS by a record writer, and climb batch 30b on his go of 07:4x; it invents no go. The dropped sentence on the Fable review stands in the queue's head ("Each launch needs his go, after the Fable review of its record").

### C30, the batch's line
Pass.

### C31, PLAN:61
Pass.

### C32, PLAN:66
Pass. Moved as built by `f36a651243` (PLAN-history, the landing's heading).

### C33, PLAN:71
Pass. Built by `76b21f4981`.

### C35, PLAN:89
Pass.

### C36, PLAN:91
Pass.

### C37, PLAN:106
Fail, fidelity.
- Passage: "A local, a `typecase` or a `try` in a `do … also` arm or in a forked argument compiles since climb batch 30's rung P (row 497, closed)".
- Source: F-134 as it stands, "a local and a `try` with a named `catch` clause compile (`compiler_tests/TaskArmLocalSlot`, `TryInArmRungG`); a named `typecase` clause there has no gated test", and PLAN's own review-routed.1 line (C60), which owes that test to rung Y. The line says of the `typecase` more than its evidence, and the old line did not name it.
- Correction: "A local or a `try` in a `do … also` arm or in a forked argument compiles since climb batch 30's rung P (row 497, closed; F-134); a named `typecase` clause there has no gated test, which rung Y adds ("Climb batch 30, listed for his review", review-routed.1)".

### C38, PLAN:119
Pass, with C39's correction: its "the analyzer's judgement ... with its two defects" takes "row 987".

### C39, the three parked lines
Fail, coverage.
- Passage: "The parallelism analyzer's two defects, for the first batch after the switch-over ... Review-queue item 501."
- Source: `owed.md`, C39, "the analyzer's line states its row and finding 3's question"; `mech-1.md`, "row 987, in "11. Parallelism, exceptions and control flow""; the routing report, "The analyzer's row has no number yet". The line names no row, so the row has no home in PLAN by its number.
- Cause: the routing writer wrote before `rows.add` was applied.
- Correction: open the line with "Row 987:", and put "row 987" into PLAN's phase 6 line (C38) and into item 501's "Home" (C51).

The lines of rows 983 and 640 pass.

### C40, item 74 moved
Pass. Built by `594da41299`; the group line went with it.

### C41, item 408 to (a)
Pass. By the closed row 933 and its commit, under "Answered by a landed fix or a closed row", not as his answer.

### C42, item 76 moved
Pass. His go of 07:4x UTC on 2026-11-10, read at `BOOT.md` of `4f66eaab35`, line 13.

### C43, item 449 to (a)
Pass. His go is on the item's own question, which batch comes next, and is quoted with its time and its source.

### C44, item 77 moved
Pass.

### C45, item 487 to (a)
Pass. His answer of 11:3x is on this item (`HELD.md:21`), quoted with its time.

### C46, items 78 and 79 moved
Pass. Moved as built by rung N; the paragraph of climb batch 29b's list says "built the repairs", not answered, and items 488 and 489 stay open.

### C47, item 488
Pass. Open in (b); what is asked, the four ways, "Default: as landed, fork N1", which the text gives to the coordinator, and "Needed by" as the review's step 1 has it. The 40 ms line is the review's.

### C48, items 80 to 82
Pass. Each names its default as landed and its queue item; the group line gives "Before the next batch, or at the defaults as landed".

### C49, item 489
Pass. Open, told, default as landed, "No answer of his is on record". Its move to (c) follows the kind that `owed.md` set; the review lists fork N2 among "The decisions consequential for him", so the kind is the coordinator's to confirm, as both `owed.md` and the routing report say.

### C50, item 500
Pass. Ways, costs and the bound "by reading" are the review's finding 1 (`reviews/batch-30-review.md:208-211`).

### C51, item 501
Pass, with C39's correction: its "Home" takes row 987.

### C52, PLAN:769
Pass.

### C53, item 502
Pass. "No default on record; as landed, `Infinity` on both paths."

### C54, item 503
Pass. Its "Needed by" is the line it took over, "no planned work (set by the landing workflow)".

### C55, item 504
Pass.

### C56, item 505
Pass.

### C57, item 506
Pass. "No default on record."

### C58, item 507
Pass.

### C59, PLAN:776 moved
Pass. Its reason in PLAN-history is "Done by this landing's record pass", which is C18 to C20 of this run; no commit holds them until the run commits.

### C61, PLAN:767
Pass.

### C62, item 508
Pass.

### C63, items 83 and 84, 509 and 510
Pass. The ways are those of the parallelism review's "Questions for the curator", D1 and D2 (`:366-375`); each says "No default on record" and "not yet asked".

### C64, item 85 and item 511
Pass. Row 876 as the ledger holds it; "No default on record".

### C65, C66, item 413
Pass. Built by `594da41299`; rows 934, 937 and 888 closed.

### C67, item 418
Pass. Open in (c), told; the default is named as what rung X landed by fork X5, with the other way; no word of his is claimed.

### C68, C69, item 425
Pass. Moot by the two closed rows and `594da41299`.

### C70, item 459
Pass. Open; the default is named as what climb batch 30 landed; "He has not answered the question."

### C71, item 457
Pass.

### C72, item 470
Pass.

### C73, C74, item 493
Pass. By row 974 and `f36a651243`; item 503 holds what stands.

### C75, item 495
Fail, fidelity.
- Passage: the item's opening, unchanged: "Walk's `Numerals.object` (...`Numerals.java:301-316`) builds the library's `NaturalNumeral` object by a constructor that no longer exists. It is reached only through `Coercions.withNumeralObjects` ...; `bestMatchForNumerals` calls it at each call ... `isNumeralObject` and `sameValue` ..., called by `FOrdinaryObject.seqv` at every `SEQV` ..., test for objects that no program makes. The class comment of `Numerals` ... still describes the field numerals."
- Source: RECORD.md, "Points to report", N (`:118`): each of these is deleted, and the class comment is rewritten; the item's own "Landed" line says so. The opening states them as present, against its "Landed" line. The routing report names this and leaves it.
- Correction: put the opening's sentences on walk's code in the past, under "Until climb batch 30's rung N (`f36a651243`)", and keep in the present only what is left: the comment in `CodeGen.java` and, if they still stand, the prelude's comments and the test's messages that the opening names; the writer reads those three in the tree and states each as left or gone.

The PLAN line and the head's line pass; "walk's `IntLiteral` and `FloatLiteral` glue stays until the names batch" is PLAN's line on fork N11.

### C76, PLAN:758 moved
Pass. Built by rung N, `f36a651243`, under PLAN-history's first reason line.

### C77, PLAN:759
Pass.

### C78, items 450, 461 and 462
Pass.

### C79, "When each item is needed"
Pass. I counted: 179 open, plus 12 new, less 6 to (a), is 185; consequential 70 + 8 - 3 - 1 is 74; routine 109 + 5 - 3 is 111; the groups' and the sections' counts agree with the items, and `queue-check.py` passes.

### C80, the homes
Pass. Items 408, 413, 425, 449, 487, 488, 489 and 493 each name PLAN-history, "Climb batch 30's landing, 2026-11-10", with the heading and the item.

### C81, the two maps
Pass. `MainWrapper.java:94` sets the arguments, `:30-46` and `:95` initialize the classes, `:96-98` invoke `main`.

## The lines of mech-1.md

No check fails. The lines that give information:

- `words-subset.py`, exit 1: P-175, P-174 and P-176 each add words. Cause: C18, C19 and C20 put sentences in the past and name row 981 and F-350; none is a cut-only change, and `cut-only.txt` is empty. The added words are those of the passages quoted above.
- `lengths.py`: F-283 (+10) is C12's pointer; F-341 (+532) is C11's two facts with their tests; F-348 (+135) is C6's two facts; F-350 (+330) is C8's sentence. Each is what its change owes.
- `plan-moves.py`, LOOK PLAN.md:84: it names item 91, in (a), among open ones. C34: the line already marks the item closed, so it stays.
- `plan-moves.py`, LOOK PLAN.md:204: commit `40302280cd` names the finding. C88: that commit is before the base and left the question to the curator, so the line stays.
- `ledger.py add`: the new row is 987, which C39's correction puts into PLAN and item 501.

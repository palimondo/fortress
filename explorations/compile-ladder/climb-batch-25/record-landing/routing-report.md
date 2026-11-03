<!-- The routing writer's report for climb batch 25's record landing: what each routing change of owed.md became in PLAN, PLAN-history, the review queue and INDEX, with the "Needed by" lines and kinds set here, the item moved to (a), the defaults the record does not hold, and the changes left for the coordinator. -->

# The routing of climb batch 25's landing

Fix round: `check.md` failed C27 (fidelity, twice), C44, C46 and C47 (routing: no commit named) and C45 (routing, and the header of climb batch 24's list left false). Each is fixed below in its line. `mech-1.md` passes `plan-moves.py`, `queue-check.py` and `check-index.sh`; its one LOOK line, `PLAN.md:192`, stays by C43. `cold-read.md` reads the entries writer's text only. After the fixes, `git diff --color-moved` shows all 32 removed PLAN lines as moved into PLAN-history.

Files changed: `explorations/coordinator/PLAN.md`, `PLAN-history.md`, `review-queue.md` and `INDEX.md`. PLAN-history has a new section, "Climb batch 25's landing, 2026-11-03" (the date of `11d2d8764`). Each line that left PLAN or changed in it stands there word for word, under the heading it stood under. `git diff --color-moved` showed all 31 removed PLAN lines of the first round as moved into PLAN-history. I could not run `plan-moves.py`, `queue-check.py` or `check-index.sh`: this session may not run Python or those scripts without approval.

## One line per change

- C26 | `PLAN.md:9` "Runs" | rewritten: climb batch 11 to 25, the gate's `summary.txt` to climb batch 25, the landing's '7 PASS, 0 FAIL of 7' and the 52 demos; old text moved | review section 5; `RECORD.md`, "The tests on the merged tree".
- C27 | `PLAN.md:11` "The live thread" | rewritten: climb batch 25's gate (`11d2d8764`), 288 read as calls, the seven rungs' 115, 288 and 161, `DIV`, `REM` and `MOD` raising, the code generator's three walls and 47 in 11 kinds, about 160 s and 271 s, the 93 through the transfers; old text moved | review sections 1, 2 and 6; F-24, F-32, F-34, F-240, F-299, F-303, F-308, F-310 to F-315. Fix round: rung N's 18 now named as F-314 gives them (the integer divisors, `NN64`'s and `ZZ`'s `CHOOSE`, `ZZ`'s `cmp` and `nanoTime`), and rung C's `test` now "a function or a method declared `test`", the method half pointing to item 349 (check.md, C27).
- C28 | `PLAN.md:12` "Landed" | rewritten: phase 4's first three batches, climb batch 25 at `11d2d8764`; old text moved | BOOT.md, "Climb batch 25, landed".
- C29 | `PLAN.md:13` "Next" | rewritten: the landing's steps (FACTS and POSITIONS after the review, the orientation update with the skill sentences, the script's findings 1, 2 and 6), then climb batch 26; old text moved | review Part 4, "The steps due before the next batch".
- C30 | `PLAN.md:47` | rewritten as one line: climb batch 25 landed 2026-11-03 at `11d2d8764` on his go of 22:0x UTC on 2026-11-02, item 326 at its default, the count 0 and the distance 0 with 288 read as calls, its review; and a new line `:48` for climb batch 26, phase 4's fourth, not yet planned, from review step 6 and `CLIMB-BATCH-25.md`, "After the landing"; old text moved | review Part 4.
- C31 | `PLAN.md:49` (was `:48`), the natives line | rewritten: "Since climb batch 25, 288 bindings name helpers and 161 still name glue classes (F-299, F-32)."; old line moved | review section 6.
- C33 | `PLAN.md:52` (was `:51`), the 109 | rewritten: rungs U and A moved five more of the 82, so one is left; rung A moved `Int`'s and `RR32`'s `asFloat` of the 27, so 25; `ZZ32`'s `big` fits `makeZZfromZZ32` (`CLIMB-BATCH-25.md:410`; item 331); old line moved | review finding 3; F-311, F-313.
- C35 | `PLAN.md:56` (was `:55`), N3 | rewritten: `IntLiteral`'s 25 and so 133 others (158 less 25), 108 of 158 moved with the review's split by rung, and row 881 with the library's integer operators, a later family or N3's rest; old line moved | review section 6, finding 5, Part 4, "New rows".
- C36 | `PLAN.md:58` (was `:57`), N5 | rewritten: 29 `IntLiteral` bindings, 4 of A and 25 of C; row 874 with N5 (part of C40); old line moved | review finding 5; `FortressBuiltin.fss:486-563`.
- C37 | `PLAN.md:61` (was `:60`), the code generator | rewritten: 47 in 11 kinds over the fourteen (F-34), against 50 in 14 on the base, climb batch 22's 52 kept as history; rows 820, 821 and 823 closed; rows 888 to 892 with the next code-generator rungs, row 890 pointing to item 350; row 875 with the kinds; "it has not been measured over the fourteen" cut; old line moved | review Part 4; F-34; rows.md.
- C38 | `PLAN-history.md` | new section "## Climb batch 25's landing, 2026-11-03", with its summary paragraph and the old texts under "Where we stand", "Phase 4. The switch-over", "Phase 5. microGPT compiles", "Work that can start now, with no decision", "Climb batch 24, listed for his review" and "Climb batch 25, listed for his review" | the form of "Climb batch 24's landing, 2026-10-31".
- C39 | `PLAN.md:62` (was `:61`), row 701 | rewritten: "the 47 refusals in 11 kinds (F-34;"; old line moved | F-34.
- C40 | `PLAN.md:56`, `:58`, `:61` and a new line `:64` | row 881 in N3's line; row 874 in N5's line; rows 875, 888, 889, 891 and 892 in the code generator's line (C37); a new line, "The limits of the natives' rewrite that stand", for rows 882, 883, 884 and 886, with row 885 pointing to item 347 | review Part 4, "New rows".
- C42 | `PLAN.md:100` (was `:98`) | rewritten: items 323, 324 and 325 added, as the queue's "Before microGPT compiles" holds them; old line moved | plan.md, LOOK.
- C43 | `PLAN.md:192` (was `:190`) | one sentence added: the skeptics' half is not built, skeptic P's second launch redid its work and 229K was lost; old line moved | review finding 2.
- C44 | `PLAN.md:651`, H.worker.1 | moved to PLAN-history as stale, its question made moot by the landed change `f7a33b97b` (rung U), which took the steps; item 343 moved to (a) (C65) | review Part 4; `f7a33b97b`.
- C45 | `PLAN.md:652`, the rewrite's limits | moved to PLAN-history as built by `f7a33b97b` (rung U), which probed the limits and filed rows 882 to 886; the rows that stand got the line of C40. Fix round: climb batch 24's list header (`PLAN.md:645`) said that the tests and the step owed keep their text there; it now says that only review-routed.3 does, and that review-routed.1 and .2 and the rewrite's limits, built by `f7a33b97b`, are in PLAN-history; the old header moved word for word (check.md, C45) | review Part 4; rows.md, rows 882 to 886; `f7a33b97b`.
- C46 | `PLAN.md:653`, review-routed.1 | moved to PLAN-history as built by `f7a33b97b` (rung U), which added `XXXNativeHelperLocalFunctionCompiled.test`, row 865's reproducer | rows.md, row 865; `f7a33b97b`.
- C47 | `PLAN.md:654`, review-routed.2 | moved to PLAN-history as built by `f7a33b97b` (rung U), which added `XXXObjectExtendsZZ32Compiled.test`, row 866's reproducer | rows.md, row 866; `f7a33b97b`.
- C48 | `PLAN.md:647` (was `:645`), Question 2 of climb batch 24 | one sentence added: the cost reaches `UnsignedLong`'s three bindings, 93 in all; the line stays, item 326 open; old line moved | review split 7; F-308.
- C49 | `PLAN.md:667`; queue item 344, (b) "Numbers and numerals" | `PLAN.md:669` cut to a pointer; filed as item 344, default today's values | review split 2.
- C50 | `PLAN.md:668`; item 345, (c) "Numbers and numerals" | cut to a pointer; filed as item 345, default both as landed | review split 6.
- C51 | `PLAN.md:669`; item 346, (c) "Numbers and numerals" | cut to a pointer; filed as item 346, default the team's two families | review split 6.
- C52 | `PLAN.md:670`; item 347, (c) "The checker's typing and inference" | cut to a pointer; filed as item 347, default refused as landed | review split 7.
- C53 | `PLAN.md:671`; item 348, (b) "The specification's text", after item 333 | cut to a pointer; filed as item 348, default the glue's 1 | review split 5.
- C54 | `PLAN.md:672`; item 349, (c) "Code generation and the run time" | cut to a pointer; filed as item 349, default the wider guard | review split 3.
- C55 | `PLAN.md:673`; item 350, (c) "Code generation and the run time" | cut to a pointer; filed as item 350, default recorded and not fixed | review split 4.
- C56 | `PLAN.md:674`; item 351, (c) "How batches run" | cut to a pointer; filed as item 351, no default on record | review Part 4, "a setting of his".
- C57 | `PLAN.md:675`, gather.1 | cut to a pointer to item 353; its text is in item 353 | review Part 4.
- C59 | new line `PLAN.md:677`; item 352, (c) "How batches run" | filed as item 352 in the form of item 328: forks 1 to 17, the three put first (forks 3, 6 and 5), fork 5's reading of P-38 (split 1) | review finding 3, Part 4.
- C60 | new line `PLAN.md:678`; item 353, (c) "How batches run" | filed as item 353 in the form of item 329, with gather.1 | review finding 3; `RECORD.md`, "Points to report".
- C61 | new line `PLAN.md:679`; item 354, (b) "The library's generators, strings and comparisons" | filed as item 354, no default on record | review finding 3; `CLIMB-BATCH-25.md`, "After the landing"; row 861.
- C62 | queue item 331 | rewritten in place: the title at 25; rung A's two `asFloat`s named (`d2501afef`; F-311); the planner's finding on `ZZ32`'s `big` added to the item, not as a new item; "Landed: Nothing: the 25 still name glue classes (F-32)."; `CLIMB-BATCH-25.md:410` in its home | review finding 3; `CLIMB-BATCH-25.md:410`.
- C63 | queue item 309 | rewritten: "each of the 161 glue strings left since climb batch 25"; its "Its cost" line at 161 too | F-32.
- C64 | queue item 326 | left open in (b): its body names climb batch 25's launch at this default and the cost at `UnsignedLong`'s three; "Landed" at 93 bindings, 76 and 17; review split 7 in its home; "Needed by: never (set by the landing workflow)" | the sort's rule: no word of his on the item's own question is on record (`positions:transfer`, `index:326`).
- C65 | queue item 343 | moved to (a), "Answered by a landed fix or a closed row", as stale by the landing, with `f7a33b97b` and rows 865 and 882 to 886 | review Part 4.
- C66 | `review-queue.md:5`, `:7-13`, `:15`, `:32-33`, `:43` | the routing chain extended to climb batch 25's landing; the counts at 312 open, 107 consequential and 205 routine; "The next batch" now climb batch 26, phase 4's fourth; the next-batch paragraph names 310, 340, 331, 332, 338 and 354, and a new "At climb batch 25's landing" sentence; the named pieces: 310's batch now climb batch 26's, 326's line out, a line for 354 in; "Moved to (a) at climb batch 25's landing: 343"; the section counts in the headings | review finding 3 and Part 4.
- C68 | `INDEX.md`, last line | an INDEX line for `explorations/coordinator/process-engineering/skill-drafts-2026-11-02.md`, from its header comment, which is one sentence | checks.md, `check-index.sh`.

### Edits beyond owed.md, with their reason

- `PLAN.md:84`, phase 4's closing paragraph: "Its first two batches, climb batches 23 and 24, landed" became "Its first three batches, climb batches 23 to 25, landed"; old text moved. The line was false after the landing.
- `PLAN.md:657` (was `:659`), the hard-set probe's Q2 in climb batch 24's list: "the 27 ... of climb batch 24" became 25, with `ZZ32`'s `big`; old line moved. The same count as C62.
- Queue item 310's "Needed by": "climb batch 25's planner ... its third line" became climb batch 26's and its fourth line, as in the head's line for 310 (C66).
- Climb batch 25's list header, `PLAN.md:665`: rewritten to the pointer form of climb batch 24's list, and to name the forks, the points and row 861's form; old text moved.

## The counts

Open: 302 + 11 new − 343 = 312. Consequential: 104 + 344, 348, 354 = 107. Routine: 198 + 8 new − 343 = 205. By "Needed by": the next batch 0; named pieces 40 (326 out, 354 in; 18 consequential, 22 routine); the switch-over 17; microGPT compiles 22; microGPT fast 3; never 230 (220 + 326 + ten new − 343; 59 consequential, 171 routine). Section counts: (b) "Numbers and numerals" 20, "The library's generators, strings and comparisons" 10, "The specification's text" 12; (c) "The checker's typing and inference" 15, "Numbers and numerals" 17, "Code generation and the run time" 8, "How batches run" 25 (−343, +351 to 353); (a) "Answered by a landed fix or a closed row" 43. The head's older block of 2026-10-10 counts is not changed (the boot note lists it as stale already).

## "Needed by" lines set here, each marked "(set by the landing workflow)"

- Items 344 to 353: never. The record says none of the batch's items holds work on the path (`RECORD.md`, "Items for the curator"), and neither the record nor the review gives a point.
- Item 354: before the batch that moves `Char`'s `asExprString`.
- Item 326: never, since climb batch 25 was the batch that its old line named.

## Kinds set here (owed.md marks each as set by the workflow)

- Consequential: 344 (the team's code against IEEE 754's reading), 348 (a value against the specification's text), 354 (a value of walk's library against its helper's).
- Routine: 345, 346, 347, 349, 350, 351, 352, 353.

## Moved to (a)

- Item 343, to "Answered by a landed fix or a closed row", by `f7a33b97b` (rung U), which probed the rewrite's limits, filed rows 882 to 886 and wrote row 865's test. No word of his is cited; the item says it is stale by the landing and named to him.
- No item went to "Answered by a decision of his".

## Defaults the record does not hold

- Item 351, the allow rule: no default on record, as `PLAN.md:676` said.
- Item 354, row 861's form: no default on record (`ledger-find:861` gives the row only).

## Decisions not taken

- Item 326: left open, by the sort. The other way: close it as answered by his go of 22:0x UTC on 2026-11-02, as the review and the boot note say. That is the coordinator's to decide (owed.md, "For the coordinator").
- Item 331's finding on `ZZ32`'s `big`: written into item 331. The other way: a new item beside it. One item keeps the question of the 25 in one home.
- Items 352 and 353 sit under (c) "How batches run", as 328 and 329 do. Item 347 sits under (c) "The checker's typing and inference", beside item 326's theme; the other home is "Code generation and the run time". Item 348 sits under (b) "The specification's text", beside item 333; the other home is "Numbers and numerals".
- Climb batch 25's list: the nine lines `:669` to `:677` were cut to pointers, as at climb batch 24's landing. The other way: each line kept whole with its item number added. The routing rule cuts a line whose whole text another home holds.

## For the coordinator

- `BOOT.md:12`, `:22`, `:30` cite `PLAN.md:669-678`; the list is now `PLAN.md:663-679`, its first item at `:667`. `BOOT.md:34` cites `PLAN.md:98`; that line is now `:100`, and its lack of 323 to 325 is fixed.
- `BOOT.md`, "Waiting on him": climb batch 25's items now have review-queue numbers, 344 to 354.
- `BOOT.md`, "Next", 3: "close item 326 as taken at his go". The item stays open here (C64); your call.
- Item 335's "Needed by", "before N3's new helpers", is stale: climb batch 25 wrote N3's first helpers with the item at its default (fork 8). Not in owed.md, so not changed.
- Item 354 is the one item of this batch that a batch needs. "Pavol's answers, in the order they are needed" has no line for it; climb batch 24's routing put item 340 there, as item 63, for the same kind of need.
- The held list: no change found.

<!-- The routing writer's report for climb batch 36's record-landing: each change of owed.md whose writer is routing, with the file, what was done and its ground, then the "Needed by" lines set, the items for (a), the defaults and the changes for the coordinator. -->

# The routing of climb batch 36's landing

Every file is in the worktree `/home/user/fortress-landing-36`. Line numbers are those of the file at `99035e231` unless the line says "now".

## The changes

- C53 | `PLAN.md:9`, "Runs." | rewritten | The walk check's span now ends at climb batch 36. The sentence on what does not run is replaced: a varargs call, a reduction over a range and `=` of two strings run (`OneLibraryVarargsArguments`, `OneLibraryRangeReduction`, `OneLibraryRunStringEquality`; F-396); `println` of a number does not (row 1098), nor a reduction over a zip of two lists (row 1137), and a `Vector` still stops (rows 643 and 1138). Old text in PLAN-history. Ground: the review, Part 4; rows.md, rows 994, 1091, 1099, 1137, 1138; RECORD:180 ("what still stops a vector (row 643)").
- C54 | `PLAN.md:10`, "The live thread." | rewritten | "At the last landed gate, climb batch 36's (`61b50cd34a`, run 1 of `coordinator/CLIMB-BATCH-36.md`, its gate on `b99b95517d`)", with `compile-ladder/climb-batch-36/gate/`; the review's section 1 added first to "What the two paths still do differently". The gate commit is from `gate/summary.txt`, "the gate ran on b99b95517". Old text in PLAN-history.
- C55 | `PLAN.md:11`, "Landed." | rewritten | "both runs of climb batch 35, and climb batch 36's run 1 (phase 4's first nineteen lines), the last at `61b50cd34a` on 2026-11-24". Old text in PLAN-history.
- C56 | `PLAN.md:13`, "Next." | rewritten | Run 1 landed with its go and review (`d649882e0f`); run 2, climb batch 36b, waits for his go; the review's due steps before its launch; the list for the batch after on climb batch 36's line; a pointer to item 419. The sentences on row 1098 (item 616), on rows 744 and 1120, and on item 608 stay. Old text in PLAN-history.
- C57 | `PLAN.md`, now `:61`, phase 4 | a new line | "- **Climb batch 36**, phase 4's nineteenth batch, landed 2026-11-24 at `61b50cd34a`, run 1 ... Its run 2 is climb batch 36b, rungs F, Y, B and T." Then the review's Part 5 list in its order (rows 1136; 780, the `Both` set's row, 1133, 1134, 1135; 1132, 1131; 1137, 1138, 643, the `assert` crash's row; 770, 1094; row 724's clause), then CB36's list for the later batch. Fix round: the two rows that C49 and C50 filed are now named by number, row 1139 (the `Both` set) and row 1140 (the `assert` crash), as `mech-1.md` gives them. Ground: the review, Part 4 and Part 5; CB36, "After the landing". Form checked against `revival-page/update.py`'s `LANDED` and `RUN_2`.
- C58 | `PLAN.md:60`, climb batch 35b's line | rewritten | It gains one sentence: what climb batch 36's run 1 took from its list. Fix round: the rest is now split: run 2's, climb batch 36b (rows 1101 to 1103, 1110, 1111 and 1121, and P-165's getter), or in climb batch 36's list; review-routed.1's test stays with its own line. Old text in PLAN-history.
- C59 | `PLAN.md:73`, F-34's line | rewritten | Rows 1091 and 1099 closed by rung C (`3a0bae976`), row 1100 by rung K (`da5f70777`); what stands now is a closure class that fails the verifier and a bridge to a method that does not exist (rows 1137 and 1138; F-396). Old text in PLAN-history.
- C60 | `PLAN.md:74`, varargs | rewritten | A varargs call runs since rung C closed rows 1091 and 994; the run test `XXXOneLibraryRunVarargs` waits on row 1098 (item 616). Row 1086 stays. Old text in PLAN-history.
- C61 | `PLAN.md:75`, the rehearsal's walls | rewritten | Row 994 left the walls "that stand"; rows 1091, 1099 and 994 closed by rung C, row 1100 by rung K; "row 994 is item 1 of the list for the batch after" replaced by its closing. Also row 996's pointer now names climb batch 36's line, since climb batch 35b's list is past. Old text in PLAN-history.
- C62 | `PLAN.md:120`, phase 5 | rewritten | Row 770 "stays open, now the export check's, in the list for the batch after (phase 4, climb batch 36's line)". Old text in PLAN-history.
- C63 | `PLAN.md:153`, item 101 | rewritten | The premise now says that `=` of two `RR32` values overflows the stack and `c = 0` is refused statically since rung K (fork K8, with item 621). The question and its default are unchanged. Old text in PLAN-history.
- C64 | `PLAN.md:98` | left | Weight none, as owed.md gives.
- C65 | `PLAN.md:242` | left | Weight none, as owed.md gives.
- C66 | `PLAN.md:694`, climb batch 28's K.worker.1 | rewritten | The question is now the rule that decides a tie; as landed, the declarations' places (fork K4; F-408); his words of 07:0x reject the order of writing; "No default on record"; the pointer to item 419 stays. Old text in PLAN-history.
- C67 | `PLAN.md:797`, judge-gate.3 | cut to row 996's half | The checker's half is built by rung K (rows 935 and 1100, closed); the line keeps row 996's order, in the later batch's list on climb batch 36's line. Old text in PLAN-history.
- C68 | `PLAN.md:807` | moved | To PLAN-history, under "Climb batch 35b, listed for his review". Row 1124 closed by rung G (`df5948e7b`).
- C69 | `PLAN.md:808` | moved | The same. Row 1125 closed by rung G (`df5948e7b`).
- C70 | `PLAN.md:809` | moved | The same. Its clauses written by rung G (`df5948e7b`) and the judge's repair (`6a0f7ffc62`). Fix round: PLAN-history's lead names `df5948e7b` for all three.
- C71 | the other PLAN lines that name a changed row | left | Weight none, as owed.md gives.
- C72 | `PLAN.md:813`, the group's lead | rewritten | The lead says that the items that an entry settles, or that only inform him, left at the landing, with a pointer to the landing's section of PLAN-history, and that two pointers stay. The heading `:811` is unchanged. Old lead in PLAN-history.
- C73 | `PLAN.md:814` | moved | Settled by P-174 and P-46.
- C74 | `PLAN.md:815` | moved | Settled by P-180.
- C75 | `PLAN.md:816` | moved | Settled by P-174 and P-180.
- C76 | `PLAN.md:817` | moved | Answered by his words of 23:30 UTC on 2026-11-23 and 07:0x UTC on 2026-11-24: the error stands in the unit too. Row 1136 is first in the list for the batch after.
- C77 | `PLAN.md:818` | moved | A told item, closed as landed; row 770 holds it.
- C78 | `PLAN.md:819` | moved | A told item, closed as landed; row 1094 holds it.
- C79 | `review-queue.md` item 419 (b) and its head line | rewritten as his question | Title: "Which rule of the language decides a tie among a call's most specific declarations, or is such a tie a static error (rows 935 and 1136)?" The body quotes his words of 07:0x. "Landed": fork K4 since `da5f70777` (F-334, F-408), with what the order still decides. "The other way": a rule of the language, or a static error, as the coordinator's nine-question review sets out. "Its cost": not sized. "Home" adds both PLAN lines, CB36's fork K4, F-408, row 1136 and the review's section 3. "Needed by": set by the landing workflow. Its head line moved from "No planned work" to "The batch after climb batch 36". The section "Overloading and the Meet Rule" still counts 10. A new PLAN pointer line for fork K4 was added under "Climb batch 36, listed for his review", now `PLAN.md:813`.
- C80 | `PLAN.md:820`, K.skeptic.2 | cut to item 621's pointer | Now one line: fork K1 with K.skeptic.2 (row 879): the question, its default, row 879's reopening if he takes the other way, "Review-queue item 621." Fix round: "row 879 reopens" became "a new row opens if he takes the other way", as row 879's note (C48) and `ledger.py`'s rule have it. Old text in PLAN-history.
- C81 | `PLAN.md:821`, review.1 | moved | P-60's last sentence is changed at this landing (C42).
- C82 | `review-queue.md` item 621 (b) and its head line | rewritten | "Landed" gains `da5f70777`. "Its cost": rows 1112, 1127 and 879 closed, and row 770 stays open, since the export check still refuses its api. "Home" gains F-408, row 879 and the PLAN pointer; fix round: row 879's clause reads "a new row opens if he takes the other way", as in C80. "Needed by": set by the landing workflow. Its head line moved to "The batch after climb batch 36"; "as climb batch 36 lands it" became "landed it".
- C83 | item 621 (head line and body, three places) and `CLIMB-BATCH-36.md:3`, `:258`, `:391`, `:406`, `:407`, `:425` | rewritten | "the team's sentence of 2012" became "the Working Draft's sentence of February 2011"; `:258` "a sentence that the team added to the specification in 2012" became "a sentence of the specification's Working Draft of February 2011"; `:406` "the team's next sentence, of 2012," became "the Working Draft's next sentence, of February 2011,". Ground: the review, Part 1, finding 6; `references/specification.md:6`.
- C84 | `review-queue.md:7-20`, the head; item 616 | rewritten | The groups "The batch after climb batch 35b" and "Climb batch 36's landing" became one, "The batch after climb batch 36" (3: items 616, 419 and 621). "No planned work" went from 51 to 50. The total stays 93. Item 616's "Needed by" now names the batch after climb batch 36, set by the landing workflow.
- C85 | `PLAN.md:822`, judge-review.1 | moved | Settled by the skill's rule (`references/specification.md:22`); row 724's clause is in the list for the batch after.
- C86 | item 586 (b) | rewritten | The premise: `=` of two `RR32` values overflows the stack (row 528); since rung K, `c = 0` is refused statically, 'Ambiguous coercion in call to operator =' (fork K8), and compiles again if item 621 goes the other way. The question and its default are unchanged.
- C87 | item 58 (a) | rewritten | "row 543 held the change to it (P-180), which climb batch 36's rung K built (`da5f70777`; row 543 closed)."
- C88 | item 503 (a) | rewritten | "Climb batch 36's rung G refuses the other three forms at load (`df5948e7b`; row 1124 closed); row 1135 holds a numeral type written as a static parameter's bound or a `typecase` arm's type, which walk still runs."
- C89 | item 493 (a) | rewritten | "(row 1124)" became "(row 1135)".
- C90 | item 323 (b) | rewritten | Row 543 left the cost's list of rows that stay for phase 5; it is now named as closed by rung K (`da5f70777`).
- C91 | the other queue items | left | Weight none, as owed.md gives.
- C92 | INDEX | left | Nothing owed: `checks.md` lists no note without its line.
- C93 | `climb-batch-36-review.md` | left | Weight none: a review stands as written.

PLAN-history gained the section "## Climb batch 36's landing, 2026-11-24". It holds the 25 lines that left PLAN or changed in it, word for word, under their PLAN headings. PLAN lost 25 lines and gained 14 (`git diff --stat`).

## "Needed by" lines that I set

- Item 419: "the batch after climb batch 36, whose first item repairs row 1136 (PLAN, phase 4, climb batch 36's line) (set by the landing workflow)."
- Item 621: "the batch after climb batch 36, whose list repairs row 1094's dotted form by the signature rule that fork K1 gives (PLAN, phase 4, climb batch 36's line) (set by the landing workflow)."
- Item 616: "the batch after climb batch 36, whose list holds row 1098 once it has its default (PLAN, "Where we stand", "Next", and phase 4, climb batch 36's line; `coordinator/CLIMB-BATCH-36.md`, "What the batch leaves out") (set by the landing workflow)." Its old batch, the one after climb batch 35b, has run.

## Kinds that owed.md marks as set by the workflow

- C79: fork K4 routed as his question. The planner's record and the review judged it not consequential. His words of 07:0x ask for the question, so the sort routes it as consequential.

## Items moved to (a)

None. No word of his on item 419 or item 621 is on record. If the coordinator's ask files his K4 question under a new number, item 419 moves to (a), "Answered by a decision of his", with his words of 07:0x on its own question.

## Defaults that the record does not hold

- Item 419 and its two PLAN lines say "No default on record". Fork K4's default landed, and his words reject the order of writing, so no default stands that he has not rejected. I invented none.

## Checks not run

- `plan-moves.py`, `queue-check.py` and `check-index.sh` need approval in this session, so I did not run them. I checked by hand: PLAN's 25 removed lines match the 25 copied into PLAN-history (`git diff --stat`); the head's counts add up to 93; the group "Overloading and the Meet Rule" still holds 10 items.

## Changes for the coordinator

- `BOOT.md`'s "Next" names the batch after climb batch 35b, which is past. It should name run 2 of climb batch 36 next, then the batch after on climb batch 36's line.
- `HELD.md` gains the POSITIONS changes that the entries writer makes (P-174, P-60, P-45).
- The landing's one line names the told items K.worker.2, K.worker.3 and judge-review.1 as closed as landed (C77, C78, C85).
- To confirm: the three "Needed by" lines above, and C79's kind.
- To confirm (C76): the reading that his words of 23:30 UTC on 2026-11-23 and 07:0x UTC on 2026-11-24 answer K.worker.1 and K.skeptic.1, the error standing in the unit too. On that reading the line left PLAN.

## The fix round

`check.md` named eight failures in my homes; each is fixed as it corrects it:
- C57: rows 1139 and 1140 named by number.
- C58: the rest of the list split between run 2 and climb batch 36's line; review-routed.1's test stays with its own line.
- C68, C69, C70: `df5948e7b` named in PLAN-history's lead and in this report.
- C76: the reading to confirm added under "Changes for the coordinator".
- C80, C82: "a new row opens if he takes the other way", in PLAN and item 621.

`mech-1.md` shows every check passing. Its LOOK lines `PLAN.md:99` and `:243` are C64 and C65, which stay. `cold-read.md` reads the entries writer's text, not mine.

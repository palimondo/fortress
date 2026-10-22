<!-- The POSITIONS audit's full run, chunk c3: the review-queue items drafted for the parts that leave POSITIONS and that review-queue.md does not already hold (from P-46 and P-48), in the queue's own form, and the changes the chunk's corrections propose to items the queue already holds (17, 67 and 165); nothing is written into review-queue.md. -->

# Review-queue items drafted for chunk c3

Rule 2 of the writer's brief: a part that is an agent's default, landed and waiting for his review, leaves POSITIONS, and gets an item if `explorations/coordinator/review-queue.md` does not already hold it. Four parts of the chunk leave on that ground:
- P-45's "The judgement's smaller choices took the record's defaults, listed for his review in `PLAN.md`." The overloading judgement's section 10 lists seven (`reviews/overloading-judgement.md`). Items 1 to 3 were the batches' order, carried out. Item 4, the implicit bound, is his decision P-42. Item 5, walk and an unused unknown size, is **item 36**. Item 6, `seq`'s device, is settled (row 556, fixed by batch 8's rung O; the queue's "Answered by a landed fix"). Item 7, Naden's instantiation, is **item 67**. The positional rule's scope, which answer 9 leaves for his review, is **item 60**. No new item.
- P-49's order of attempts. The entry does not state the third attempt; **item 2** holds it. No new item, and P-49 is unchanged.
- P-46's numeral tie rule: no item holds it. Item 96 holds one reading of it (a numeral too large for every declaration), and item 85 another default of the same judgement. It is drafted below as **Q-?1**.
- P-48's reading built by climb batch 15 (call 1): no item holds it. PLAN, "Climb batch 15, listed for his review", lists it twice, and item 17 (settled) names it as "the call for his review". It is drafted below as **Q-?2**.

"The corrections" is `positions-audit/full/evidence/corrections-c3.md`. Each draft ends with the queue's "Needed by" line. The coordinator numbers them.

## For "(c) Routine", "Numbers and numerals"

Routine by the `coordinator` skill's test. It reverses no decision of his: his yes of 2026-09-28 took the judgement's two decisions and left its defaults listed. It follows what the team's walk already did with a numeral, the narrowest of `ZZ32`, `ZZ64` and `ZZ` that holds it, and most peers, which default an integer literal to their plain integer type, Kotlin widening it by its value (`coordinator/CLIMB-BATCH-N.md`, Q1, its peers). It touches no line of microGPT, since no range of the model meets the case once ranges are over `ZZ32`. And it can be undone.

Q-?1. **A numeral whose conversions tie is read as `ZZ32`, or as `ZZ64` or `ZZ` by its value.** Where the types to which a numeral converts are incomparable, as `ZZ32` and `NN32` are, the numeral is read as a `ZZ32`, or as a `ZZ64` or a `ZZ` when its value does not fit, in the choice among declarations and in the instantiation of a type parameter that only numerals fix (`Specification/basic/inference.tex`, "A Numeral Whose Conversions Tie"). It is the conversion judgement's Q1 default, one of those "taken as defaults, listed for your review" (`reviews/conversion-overloading-judgement.md`, sections 3 and 4). His "C-O. Both recommendations for batch N accepted." at 2026-09-28T19:06:50.868Z took the judgement's decisions 1 and 2, not its defaults. P-46 stated the rule until this audit, labelled a default by `54208c796` and unlabelled since `bc8902f47`.
   - Landed: As stated. The compiled checker builds it, climb batch N's rung I (PLAN-history, "Climb batch N's first run, listed for his review", the line on rung I's reading of Q1's default); walk takes it with Q-walk. Item 96 holds rung I's one reading past the text: a numeral too large for every declaration is refused.
   - The other way: Refuse such a call as ambiguous, as the specification's coercion resolution does for every other tie; or another default type (Haskell defaults an integer literal to `Integer`, Julia to a 64-bit `Int`).
   - Its cost: The inference chapter's section and rung I's check rewritten. The calls that only the default resolves, such as the library's `widen(0)` in its identity functions, would then need a written type (`coordinator/CLIMB-BATCH-N.md`, Q1).
   - Home: POSITIONS P-46, its former sentence on the numeral (POSITIONS-history, P-46; the corrections, "P-46"); `reviews/conversion-overloading-judgement.md`, sections 3 and 4; `coordinator/CLIMB-BATCH-N.md`, Q1; PLAN-history, "Climb batch N's first run, listed for his review"; PLAN, phase 4, Q-walk; item 96
   - Needed by: before Q-walk; Q-walk builds the default into walk's `narrowest` and `bestMatchWithCoercion` (PLAN, phase 4).

## For "(b) Consequential", "Walk's choice of declaration and instance"

Consequential by the `coordinator` skill's first test: it reads anew the letter of a decision of his. The batch record says so itself: "Call 1 reads past the letter of one, P-48's last clause" (`coordinator/CLIMB-BATCH-15.md`, section 2). It can be undone, so it landed and waits for review, the skill's second way.

Q-?2. **Walk fixes an unwritten reduction's type parameter by its elements.** At a reduction or a comprehension that writes no static argument, climb batch 15's rung B has walk fix the big operator's parameter by the declared type of the expression's value, else by the join of its elements' run-time types, else at the bound, in place of `BottomType` (the walk probe's way 6 + 7, `perf-probes/walk-plain-bound/REPORT.md`, section 1). It is the coordinator's call 1 of climb batch 15. The call reads P-48's "never ... the value's type alone" as not reaching a parameter that the desugaring fixes by the expression's type `N`, for which walk's elements stand in, and P-59, walk's coercion by the value, as covering this choice too. He has not seen it. Item 17 was settled by the coordinator under P-48 on 2026-10-14, after his message of 07:10:28.105Z, in which he did not recall the question.
   - Landed: As built (`20474c144`; F-228). Walk values that change, each to the specification's: an empty unwritten list comprehension is a `List[\Any\]`; `xs: List[\ZZ32\] = <| 2 k | k <- 0#3 |>` runs where walk refused it; `emptyRSum(0)`, declared `RR64`, is `0.0` where it was the integer `0`; `Set`'s unwritten `BIG UNION` runs where it stopped. Not yet before him: a hint that does not fit falls back quietly to the unhinted instance, so `u: Number = SUM[j <- 0#3] j` is `3 : Int`.
   - The other way: P-48's letter, the walk probe's way 4: such a parameter takes its bound under walk.
   - Its cost: Seven tests and one specification example red, each a value that the specification gives (`coordinator/CLIMB-BATCH-15.md`, section 2, call 1).
   - Home: POSITIONS P-48, its former sentence "Built under walk for a reduction or comprehension that writes no static argument by climb batch 15 (`20474c144`)." (POSITIONS-history, P-48; the corrections, "P-48"); PLAN, "Climb batch 15, listed for his review", Call 1, below, and Call 1, rung B; `coordinator/CLIMB-BATCH-15.md`, section 2, call 1; F-228; item 17 (settled)
   - Needed by: never by PLAN, which schedules no change to walk's instance for an unwritten clause form; kind: it reads P-48 past its letter, so by the skill's first test it is consequential.

## Changes proposed to items the queue already holds

These are not new items. Each is a line that the corrections make incomplete, for the coordinator to write when he approves them.

- **Item 17** (settled, under "Answered by a decision of his"): "call 1 is the call for his review, both under PLAN's "Climb batch 15, listed for his review"". It could add: "and drafted item Q-?2".
- **Item 67**, "Home": "POSITIONS, answer 9". P-45 no longer names the judgement's smaller choices, so the home would read "POSITIONS-history, P-45, its former sentence on the judgement's smaller choices". Item 36 does not cite P-45 and needs nothing.
- **Item 165**: it holds the ledger notes that `ledger.py` refuses, row 642's state among them by PLAN, "Climb batch 12, listed for his review", gather.2. Since P-50 no longer states that row 642 stays `CONTESTED`, the item could name P-50's former last sentence (POSITIONS-history, P-50) beside gather.2.
- **Item 2** needs nothing: its home cites P-49's title, which is unchanged.

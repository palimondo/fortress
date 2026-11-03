<!-- The record-landing checker's verdict on climb batch 25's first round: for each change of owed.md, pass, or each failure with its class, the passage, the source and the correction. -->

# The check of climb batch 25's record landing, round 1

AT `c3a16b0bc`, landing `11d2d8764`, base `97a416b18`. The diff read: `git -C /home/user/fortress-landing-25 diff c3a16b0bc -- explorations/ ':!explorations/coordinator/PLAN-history.md'`, with the reasons for each PLAN move taken from `routing-report.md`.

## FACTS and POSITIONS

- **C1, F-24: pass.** The claim that was said twice is now said once: "so `DIV`, `REM` and `MOD` by zero on `ZZ32` ... raise `DivisionByZero` (F-299, F-306, F-308, F-312)". "Its four siblings" now reads as `<type>DivisionByZeroWalk.fss` and `<type>RemainderByZeroWalk.fss` for the five types. Nothing is lost.
- **C2, F-32: pass.** "29 are object `IntLiteral`'s (`FortressBuiltin.fss:486-563`), 4 among the 154 and 25 among the 158" agrees with review finding 5 and `CLIMB-BATCH-25.md:610`. The false list of kinds is cut along with it.
- **C3, F-34: pass.** The old bound was "after climb batch 25's rung C with ... planner's control". The new one is "once, on climb batch 25's base (`97a416b18`) with the code generator as landed". The two are the same code state: the only commit between base and landing that touches `compiler/codegen/` is rung C's `8833d89c5` (`git log 97a416b18..11d2d8764 -- .../codegen/`). The "173" is the base's count of helper strings. Climb batch 22's 52 went to the history, and the measurement keeps its code state.
- **C4, F-53: pass** (weight none). The entry is unchanged in the diff.
- **C5, F-118: fail, fidelity.** Passage, old title: "and the compiled path prints a large unsigned value unsigned, but it cannot compare ...". New title: "and a large `NN32` or `NN64` value prints unsigned, but the compiled path cannot compare ...". The printing clause has lost its condition, the compiled path. Its ground, F-313 and `compiler_tests/UnsignedPrintingCompiled`, holds only for the compiled path, and the entry's body still says "The compiled path prints an `NN32` or `NN64` value ...". Correction: keep the path in the clause, for example "A numeral's value reaches the compiled world intact, and the compiled path prints a large `NN32` or `NN64` value unsigned, but it cannot compare a numeral beyond `ZZ64` with another numeral."
- **C6, F-125: pass.** "where the specification gives 0" is row 887's claim (rows.md). The test pointer that was cut is the row's reproducer.
- **C7, F-240: pass.** The added sentence stays within its ground, review section 2 (9 s against 53 s, one run each, no measured cause). 160 s, 271 s, 205 s, 0.59, 198 s, 152 s and 1.84 are unchanged. Detail gains `reviews/batch-25-review.md`, section 2. The rung runs of 129 to 181 s were cut, as C22 allows, and `reviews/batch-24-review.md`, which the Detail names, holds them.
- **C8, F-268: fail, form.** The entry was already past 600 characters (611) and grew to 616 (`lengths.py`), yet C8 owes wording only and no clause. Correction: bring it back to 611 characters or fewer, for example by keeping "emits" in the title and "(row 889)" as written now, or by cutting "compiles ... in" back to "emits ... of".
- **C9, F-298: pass** (kept; the writer's choice of no split is stated).
- **C10, F-299: pass** (kept). "`RR32` 50 (F-310, its `asFloat` F-311)" now agrees with F-310's "50 of ... 51".
- **C11, F-303: pass.** Only "over item 331" was cut, a queue item, which does not belong in an entry.
- **C12, F-305: pass** (kept).
- **C13, F-306: pass** (kept).
- **C14, F-308: pass.** New: "Of the 94 bindings over these types, `UnsignedLong`'s `asFloat` at `RR64` among them, only `Char`'s `asExprString` stays on a glue class (row 861)." The misreading is gone. The writer notes that owed.md credits the move to the wrong rung: rung U moved `UnsignedLong`'s `asFloat` (F-313), not rung A. That is the sorter's error and changes no text.
- **C15, F-310: pass.** The title states the count once: "50 of value object `RR32`'s 51 native bindings name helpers". The body has 49 on `simpleFloatArith`, the 50th `asFloat` (F-311) and the 51st `^` at `Float`. This agrees with review section 6 (P 49) and with F-299.
- **C16, F-311: pass.** The Detail now has the `compile-ladder/...` form. "Climb batch 23's fork 12" went to the history.
- **C17, F-312: fail, form.** The entry was past 600 characters (1298) and grew by 9 to 1307, yet C17 owes nothing: "holds against rows 336 and 848 FIXED". The growth is "626 operand pairs print the old code's values." in place of "626 printed pairs are the old code's." Correction: keep the old sentence, or a rewording no longer than it.
- **C18, F-313: pass** (kept).
- **C19, F-314: pass.** The 18 line citations are now a pointer to the report's table, with words on what it holds. "Share one unsigned Euclid's algorithm" means the same as before, and the writer checked it in the code.
- **C20, F-315: fail, form (two failures).**
  1. The cut sentence "`test stringifyChars` stops next at a call of a varargs function (row 624)" is what the fact blocks: the library's `test` declaration still does not compile. The new pointer "F-34 gives what the code generator still refuses in the library" does not say this, and the brief's form rule keeps such a sentence. Correction: put it back, for example "The library's `test stringifyChars` stops next at a varargs call (row 624)."
  2. The entry was past 600 characters (866) and grew by 366. Part of the growth is not owed by C20 (owed.md: the method half, and the `forbid` path skipping `finally`): "and so does the compiled `try` when it passes on an exception that no clause takes". Row 890 holds that clause, but the clause belongs to the row. Correction: cut the clause back to "It throws before the `finally` clause runs (row 890)." The rest stands within its ground: the method half (review split 3, `CodeGen.java:2947-2949`, "one probe, and no test gates it") and the `finally` order (row 890).
- **C21, P-38: pass.** Before: "The compiler prelude's defects are not repaired: they go with it at the switch-over." After: "The compiler prelude's own text is not repaired: its defects go with it at the switch-over. A helper of `nativeHelpers/` that the one library binds is fixed for the one library, and the prelude's value moves with it (F-313)."
  - What he decided is the same: the prelude's defects go with it at the switch-over.
  - Where it applies is narrowed to the prelude's own text, as owed.md and review finding 4 have it. The new sentence is the review's wording.
  - What it requires is the same: the `Maybe` block and the `REM` guard as landed, then rows 348, 381 and 383 and `XXXShiftDeclRungI`. The body is unchanged.
  - The change rests on his rule of 2026-10-31, and the POSITIONS-history block cites it. The entries report asks him the question.
  - One slip in the report, not in the entry: `entries-report.md` gives "578 to 702", and `lengths.py` gives 562 to 702.
- **C22, C23: pass** (weight none).

## The gap ledger

- **C24, C25: pass** (weight none). `ledger.py check` and `landing-check` both pass.

## PLAN

- **C26, "Runs": pass.** The range now runs to climb batch 25. '7 PASS, 0 FAIL of 7' and "the first at which microGPT's `MOD` and `nanoTime` run through helpers" are review section 5, which cites `summary.txt:120`, `:122`. The 52 demos come from `RECORD.md`.
- **C27, "The live thread": fail, fidelity (two failures).**
  1. "and 18 integer divisors with `nanoTime` (rung N; F-314)" says more than its ground. Rung N's 18 (review section 6, N 18; F-314, "name 18 new helpers") include `nanoTime` and `ZZ`'s `cmp`, which is no divisor, and the line reads as 18 divisors plus `nanoTime`. Correction: "and 18 more, the integer divisors, `NN64`'s and `ZZ`'s `CHOOSE`, `ZZ`'s `cmp` and `nanoTime` (rung N; F-314)", or "rung N's 18, `nanoTime` among them".
  2. "a function declared `test` (rung C; F-315 ...)" says less than F-315 as rewritten: "a function or a method declared `test`". The method half is item 349's question. Correction: "a function or a method declared `test` (rung C; F-315; the method half review-queue item 349)".
  - The rest holds: 288 and 161, the 115 by rung, the 47 in 11 kinds, about 160 s and 271 s with the review's "no measured difference", and the 93 through the transfers.
- **C28, "Landed": pass.**
- **C29, "Next": pass.** It holds the steps due by review Part 4, steps 2 to 6, and then climb batch 26.
- **C30, phase 4's line: pass.** The line for climb batch 26 matches review step 6 word for word, item by item.
- **C31: pass.** 288 and 161.
- **C32: pass** (weight none).
- **C33, the 109: pass.** One left of the 82, and 25 of the 27. `ZZ32`'s `big` cites `CLIMB-BATCH-25.md:410`, the line that holds `makeZZfromZZ32`. owed.md's `:610` is the record's "After the landing", so the routing writer's line is the correct one.
- **C34: pass** (weight none).
- **C35, N3: pass.** 133 and 25 make 158. 108 is P 49, D 28, N 18, R 10, A 2, U 1. Row 881 has its home.
- **C36, N5: pass.** 29, of which 4 are of A and 25 of C. Row 874 has its home (part of C40).
- **C37, the code generator: pass.** 47 in 11 kinds against 50 in 14, and 52 kept as history. Rows 820, 821 and 823 are closed. Rows 888 to 892 and 875 match rows.md (for example row 890's claim, row 891's verification failure). The false "not measured over the fourteen" is cut.
- **C38, PLAN-history: pass.** `plan-moves.py` passes, and the section's head names each move with the rung commits.
- **C39, row 701: pass.**
- **C40, the new rows' homes: pass.** 881 is in N3, 874 in N5, 875 and 888 to 892 in the code-generator line, and 882, 883, 884 and 886 in a line of their own, with 885 pointing to item 347.
- **C41: pass** (weight none).
- **C42, phase 5's list: pass.** 323, 324 and 325 are added.
- **C43, `PLAN.md:192`: pass.** The clause on the skeptics' half is review finding 2 (`:330-332`): the VM restart, the programs written again, 229K lost. This is the LOOK line of `mech-1.md`, and owed.md gives its reason to stay.
- **C44, H.worker.1: fail, routing.** The move's reason in `routing-report.md` is "review Part 4", and it names no landed change. The rule asks for "stale, by a decision or a landed change". The change is `f7a33b97b`, rung U, which item 343's (a) entry names. Correction: add `f7a33b97b` to the report's C44 line.
- **C45, the rewrite's limits: fail, routing and fidelity.**
  - Routing: the reason "review Part 4; rows.md, rows 882 to 886" names no commit, and the rule is "built, by a named commit". Correction: "built by `f7a33b97b` (rung U)".
  - Fidelity: the move made a sentence of climb batch 24's list header false. `PLAN.md:643` (now near `:645`) still reads "The tests and the step owed (review-routed.1 to .3, and the rewrite's limits) are work for a later batch, not questions, and keep their text here". Only review-routed.3 is left; the routing report lists this for the coordinator, not as done. Correction: fewest words, for example "The test owed (review-routed.3) is work for a later batch, not a question, and keeps its text here; review-routed.1 and .2 and the rewrite's limits, built by rung U (`f7a33b97b`), are in `PLAN-history.md`, "Climb batch 25's landing, 2026-11-03"". The old sentence moves word for word.
- **C46, review-routed.1: fail, routing.** The reason "rows.md, row 865" names no commit. The test came in at `f7a33b97b` (`git log 97a416b18..11d2d8764 -- .../XXXNativeHelperLocalFunctionCompiled.test`). Correction: name `f7a33b97b`.
- **C47, review-routed.2: fail, routing.** As C46. `XXXObjectExtendsZZ32Compiled.test` came in at `f7a33b97b`. Correction: name it.
- **C48, Question 2: pass.**
- **C49 to C56, items 344 to 351: pass.** Each has what is asked, its default (351: "no default on record"), its "Needed by" marked "(set by the landing workflow)", and its section. 344 and 348 are in (b), consequential, and the others are in (c).
- **C57, gather.1: pass.** It is cut to a pointer, and its text is in item 353.
- **C58: pass** (weight none). It is kept word for word.
- **C59, item 352: pass.** Forks 1 to 17, the three put first, and fork 5's reading of P-38. Default as landed. Needed by never.
- **C60, item 353: pass.**
- **C61, item 354: pass.** "No default on record". Needed by the batch that moves `Char`'s `asExprString`, marked as set. It is in (b). It has no line under "Pavol's answers, in the order they are needed", and the routing report names that for the coordinator. owed.md did not ask for one.
- **C62, item 331: pass.** The 25, `d2501afef`, and the `big` finding at `CLIMB-BATCH-25.md:410`.
- **C63, item 309: pass.** 161, twice.
- **C64, item 326: pass.** It stays open, as the sort's rule says, with no word of his claimed. "Landed" is at 93 (76 and 17). "Needed by: never (set by the landing workflow)". The default that he did not answer is not shown as his answer.
- **C65, item 343: pass.** It moved to (a), "Answered by a landed fix", as stale by `f7a33b97b`, "not answered by him; named to him".
- **C66, the head: pass.** `queue-check.py` passes: 312, 107 and 205. The routing report's sums agree.
- **C67: pass** (weight none).

## INDEX and other notes

- **C68: pass.** The INDEX line for `process-engineering/skill-drafts-2026-11-02.md` is there, and `check-index.sh` passes.
- **C69, C70: pass** (weight none).

## Notes, not failures

- Errors in owed.md: C14 credits `UnsignedLong`'s `asFloat` to rung A where rung U moved it. C33 and C62 cite `CLIMB-BATCH-25.md:610` for `ZZ32`'s `big`, which is at `:410`. The writers' texts are right.
- Left for the coordinator by the routing report and not owed: BOOT.md's pointers to `PLAN.md:669-678` and `:98`; item 335's stale "Needed by"; a line for item 354 under "Pavol's answers, in the order they are needed".

## The mechanical checks of `mech-1.md`

No check fails. The lines given for information:

- words-subset.py on P-38, exit 1: P-38 adds words, by C21. `cut-only.txt` is rightly empty.
- plan-moves.py LOOK `PLAN.md:192`: the line stays, by C43, with its clause added. owed.md gives the reason.
- lengths.py, already over 600 characters and grew: F-240 +136 (C7, owed); F-268 +5 (C8, not owed, fails form); F-312 +9 (C17, not owed, fails form); F-315 +366 (C20, partly not owed, fails form).

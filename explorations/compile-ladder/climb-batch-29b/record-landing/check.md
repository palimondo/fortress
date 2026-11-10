<!-- The record-landing checker's round-1 check for climb batch 29b (base b5b0f82c1, landing a2be3e9e1, worktree at f629cd2dd): each change of owed.md, pass or each failure by class with its passage, its source and its correction, then the mechanical checks of mech-1.md. -->

# The check of climb batch 29b's record-landing, round 1

Read: `owed.md` whole; `entries-report.md`, `routing-report.md`, `mech-1.md`; the worktree's `git diff f629cd2dd -- explorations/ ':!explorations/coordinator/PLAN-history.md'`, entry by entry (FACTS, POSITIONS, ledger, PLAN, review queue, maps, FACTS-history); the rows of `rows.md` that the changes name; the entries through `facts-extract.sh`. Every re-anchored line citation was compared, line by line, between the base `b5b0f82c1` and the worktree: each new line holds what the old one held at the base. A scan of every FACTS and POSITIONS citation of a file that the batch changed found one that still names a base line (C60).

Counts: 135 changes; 123 pass; 12 fail, with 13 failures: coverage 2, fidelity 5, form 4, routing 2.

## FACTS: the passes

### C1, F-53: pass
Weight none. The entry is unchanged and the gate's figures stand.

### C2, F-57: pass
New: "no coercion from a numeral into the type parameter `T` itself can be declared, since such a coercion is refused as a cyclic hierarchy". The ground gave the two fixes. The writer made both: "the type parameter `T`", and "generic" dropped. It grows by 5, the clause that the change owes.

### C3, F-79: pass
Kept. The ground says that the entry need not carry row 442's prelude half.

### C4, F-112: pass
Kept, as the ground gives.

### C5, F-118: pass
New: "becomes its default through that type's own coercion, which the checker inserts (`Functionals.scala`, `defaultNumeral`); only a numeral that the checker leaves without a coercion reaches the code generator's fallback, a `ZZ32`, `ZZ64` or `ZZ` by exact bit length (`CodeGen.java`, `forIntLiteralExpr`), and which numerals do is not measured." This is what the ground holds: correction B, and section 1, item 3. `Functionals.scala:1027-1028` was read: `defaultNumeral` converts through `numeralInto`. The cuts that offset the growth are row 328's leftover and a parenthesis that F-341 holds, and the provenance line names both.

### C6, F-168; C7, F-169; C8, F-173; C9, F-175: pass
Each is kept, as its ground gives.

### C10, F-240: pass
Weight none. The text and every figure are unchanged.

### C11, F-262: pass
New: "That no overload can tell the two exponents apart is by reading." This scopes "by reading" to the overload claim, as the ground asks.

### C12, F-272; C13, F-340: pass
Each is kept. No sentence of F-340 is past 600 characters.

### C14, F-341: fail (form)
- Passage: "(row 973; no test pins it)". The old text was "(row 973; a walk program on climb batch 29b's merged tree printed 'h = 0.5: false', no test pins it)".
- Source: the brief's rule of form, "the commit or the code state that bounds a one-time measurement stays in the entry ... A change that drops either fails form". `h = 0.5` being `false` was seen once, and no test pins it. F-341's history block of 00:31Z names that tree as "climb batch 29b's merged tree at 17e93a7da8". The batch's name goes to the history, but the code state is the only bound of the observation, and the change dropped it. The entry now gives no kind of evidence for the claim (`record.md`, "What an entry is": "whether it was observed").
- Correction: "(row 973; observed once at `17e93a7da8`, no test pins it)".

### C15, F-342: fail (form)
- Passage: the entry's second sentence, 1,048 characters, "Where no place's type has a coercion from the numeral's type (an untyped binding, ... (`scala_src/typechecker/staticenv/KindEnv.scala`, `getType`)."
- Source: the brief's rule of form, "A sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`". The report gives "Keep, no line. Each clause is a condition of the checker's rule or a test that gates it." It names no question, and it does not say that the sentence is past 600 characters.
- Correction: split the sentence at its semicolons into sentences of one subject each, none past 600: the places that take the default; the range refusals; the written-only rule; the size value. Otherwise, name in `entries-report.md` the question of `record.md`, "What an entry is", that keeps the sentence whole.

### C16, F-345: fail (form)
- Passage: the entry's second sentence, 1,236 characters, "The literals chapter gives a numeral a numeral type that exists only at compile time, ... whose Effects name each departure of the two implementations with its row."
- Source: the same rule. The report gives "Keep, no line. Each clause names one chapter's text with its file and lines." It names no question.
- Correction: split the sentence by chapter: literals, constant, numbers, binary, Appendix I. Otherwise, name the question that keeps it whole.

### C17, F-346: pass
- New title: "Under walk the library's `=` and `=/=` over `Any` meet a numeral at its default, so a number and a numeral of one value answer both as if the values differed."
- New body: "Under walk `u = 0` is `false` and `u =/= 0` is `true` ..., and so are `q = 0.5` and `q =/= 0.5` ...; So walk's `=/=` stays `NOT (e = e')`."
- This is the ground: rows 966 and 973 as rewritten. The `opr-overview.tex` clause goes with the old title, as the ground says.

### C18, F-347: pass
- The title is limited to "whose type names no type parameter", which is row 957's case, as the ground asks.
- The spawn sentence is widened to the parallelism analyzer's rule. `ParallelismAnalyzer.java:44` was read: `ARG_THRESHOLD = 2`.
- The workaround stays, as what the fact means for a worker.
- The method names that were cut are in `rung-static-numerals/REPORT.md` section 1, at lines 30, 54 and 58. The net growth is less than the widened clause.

## FACTS: sentences made false, and a history

### C19, F-131: pass
New: "below `Numeral` lie the numeral types `NaturalNumeral` and `RadixPointNumeral`, which each of the eight converts from (F-79)", and "each number type declares one at each number type it coerces from or into (F-324)". `FortressLibrary.fsi:457-465` holds no `comprises` clause.

### C20, F-324: pass
The title now reads "at each number type", as the ground asks.

### C21, F-180: pass
- The example is dropped.
- `NamingCzar.java:365-368` holds the one-library branch at the landing, the same lines as `:371-374` at the base.
- The count is bounded to its one `javap` reading, "before `nativeHelpers/simpleIntLiteralArith.java` was deleted".

### C22, F-128: pass
New: "a coercion with its own static parameter, unless it is a numeral coercion (row 513)". This is the claim of row 513 as rewritten.

### C23, F-129: fail (fidelity; form)
- Passage: "or, beyond 31 bits, `FZZ32.makeSize` of its digits, which raises 'Not in range for ZZ32' (`runtimeSystem/MethodInstantiater.java:225-237`, by reading)".
- Fidelity: "raises" leaves out what row 962 and F-140 state about this raise: it is a `java.lang.Error`, at run time, "which no `catch` sees". A reader can take it for a Fortress exception that a `catch` handles. The code agrees with the row: `FZZ32.java:26-30` has `throw new Error("Not in range for ZZ32: " + s)`.
- Form: the ground's clause is "the class loader stamps it as a `ZZ32`, `FZZ32.make` of an `int`, or `FZZ32.makeSize` of its digits beyond 31 bits". The raise clause is more than the change owes. It grows an entry already past 600, by +162, and it restates row 962 and F-140 without a pointer to either (question 5).
- Correction: "..., or, beyond 31 bits, `FZZ32.makeSize` of its digits, a `java.lang.Error` at run time (row 962) (`runtimeSystem/MethodInstantiater.java:225-237`, by reading)". The other way is to drop the raise clause and keep "(row 962)".

### C24, F-240's history: pass
The note gives 00:12:52 and 00:13:09 and the understated start load. Its provenance line says that the figures and sentences are unchanged.

## FACTS: line citations moved by the hunks

Each pair below was compared between the base and the worktree. Each new line, or range, holds what the old one held at the base.

### C25, F-301 to C28, F-44: pass
- C25: `FZZ32.java:32-34`, `make`.
- C26: `:775`, `:671`, `CodeGen.java:5527-5534`; `:380` and `:356` hold the same lines at the base and the worktree.
- C27: `:1364`.
- C28: `:1064`, `:5087-5095`.

### C29, F-58: pass
The writer departed from the sort, and the departure stands. At the base, `RR64`'s two `^` lines were `:367-368`, and they are `:365-366` at the landing. Both were read. The sort's `:367-368` would name `sin` and `cos`. The entry's "`^(self, b:Number)`" was already false at the base, and the writer reports it as a decision not taken.

### C30 to C35: pass
F-63 `:1017` and `:398`; F-74 `:126`, `:129`, `:196`; F-78 `:781-785`; F-85 `:1585`; F-268 `:6250-6255`; F-276 `:2671-2690`.

### C36, F-279; C37, F-285: pass
For F-285, the writer re-anchored seven citations of `FortressLibrary.fss` beyond the sort's two. Each was compared, and each holds its declaration: `:2719`, `:3105`, `:3110`, `:4764`, `:4781`, `:1585`, `:2739`.

### C38 to C50: pass
- F-286 `:2592-2667` and `:4511-4647`; F-303 `:4705`; F-305 `:844` and `:953`.
- F-306 `:877-984` and `:1088-1194`. Each range runs from its `trait` line to its `end`, and lines inside each range were lost.
- F-307, all nine.
- F-311 `numbers.tex:61`; F-312, all five; F-315 `:3029-3031`; F-321 `:337-338`; F-327, both; F-330, all three; F-332 `:1998-2018`; F-334, all four.

## POSITIONS

### C51, P-173: pass
- Before: "A place fixes a type when its declared type has a coercion from the numeral type, as the eight number types have and a program's own type may (P-174), or is a numeral type;"
- After: "... and a program's own type may (P-174);"
- What he decided, unchanged: a numeral converts where it stands; at a place that fixes a type, it converts into that type from its exact value; elsewhere, it converts into the machine default.
- What it requires, unchanged: the conversion is exact or rounds once, and a numeral out of range is refused statically.
- Where it applies: the clause cut is the one that the record names for this workflow ("P-174 rules the second out ... The record writer brings P-173 in line", `CLIMB-BATCH-29b.md:412`). The review's correction A names it too. Under P-174, a numeral type is written only as a parameter's type, and the patch refuses a binding at one. The words-subset check passes for this cut-only line.

### C52, P-174: fail (fidelity)
- Before: "Rows 969 and 970 hold the tree's run-time numeral with its four numbers as fields."
- After: "Rows 960 and 974 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written outside a parameter's type."
- What he decided, where it applies and what it requires are unchanged. Row 442 is left out, and the writer's question explains why: whether the prelude's lack is a departure turns on P-37's exception, and that is his to say (C62, C88). This is no failure.
- Failure, passage: "walk running a numeral type written outside a parameter's type".
- Source: row 974's claim is narrower: "a numeral type written as a type that an object or a trait extends, or as a static argument, loads and runs". Its notes say that walk refuses a numeral type where a numeral meets it, "as a variable, a field or a declared return type of a numeral type ('Type mismatch binding 3')". So walk does not run every numeral type written outside a parameter's type. P-174's own rule is also narrower than "a parameter's type": it says "a coercion's or an operator's parameter type".
- Correction: "... and walk running a numeral type written as a static argument or as a type that an object or a trait extends."

### C53, P-176: pass
- Before: "Rows 969 and 970 hold where the tree departs."
- After: "Rows 957 and 971 hold where the tree departs: a place whose type names a type parameter, and a coercion that spawns a task."
- This names the departures that correction A gives. One value per place, made once, a constant or a `static final` field, is unchanged.

### C54, P-76: pass
- Before: "the name that the compiler's prelude and the interpreter's library give the type".
- After: "... gave the type".
- The change is one verb, the fewest words. The decision is unchanged: `NaturalNumeral`, exact into the five integer types and `QQ`, one rounding into `RR64` and `RR32`.

### C55, P-172: pass
- Before: "`RadixPointNumeral` (P-174), which holds the numeral's exact value:" and "as the compiler's prelude declares its `FloatLiteral` (`LibraryBuiltin/CompilerBuiltin.fss:996`)".
- After: "`RadixPointNumeral` (P-174):" and "as the compiler's prelude declares it (`LibraryBuiltin/CompilerBuiltin.fss:890`)".
- `:890` was read: it is `trait RadixPointNumeral`. The decision, exact into `QQ` and one rounding into `RR64` and `RR32` on both paths, is unchanged.

### C56, P-165; C57, P-171: pass
- P-165: `numbers.tex:58-75`, whose first and last lines are the same as `:56-73`'s at the base, and `CompilerBuiltin.fss:509`, `trait Number excludes { String }`.
- P-171: `constant.tex:129-133`, the same text as at the base.
- These are pointers only. Each decision is unchanged.

### C58, P-154: pass
The writer departed from the sort, and the departure stands. The citation is `a874948ac:Library/FortressLibrary.fss:1735-1741`, pinned to the team's commit. At `a874948ac`, those lines are `trait LexicographicOrder` and its `CMP`. The writer's report names this as left, with its reason.

### C59, P-163: pass
`FortressBuiltin.fss:594`, the `charToExprString` binding, which is the base's `:598`.

### C60, P-166: fail (coverage)
- Passage: "(`LibraryBuiltin/FortressBuiltin.fss:544`, `.fsi:200`)".
- Source: the same hunks moved `FortressBuiltin.fsi:200`, `value object BigNum extends ZZ end` at the base, to `:196`. C31 maps that same line for F-74, and line 200 now reads `end`. The pointer change re-anchored `.fss:548` and `FortressLibrary.fss:655`, but not this one. The sort missed it, and the scan of all citations found no other.
- Correction: "`.fsi:196`". This is a pointer under his rule of 2026-10-31, and it is named to him with C56 to C61.

### C61, P-175: pass
`CodeGen.java:7068` holds "Why isn't this parallel???".

### C62, P-37; C63, P-176: pass
Weight none. Each waits for his word, and no writer is assigned.

## The gap ledger

### C64, row 971: pass
- The claim is widened to "an operator or an argument list over two calls of the program's own functions spawns, as `small(n) - small(m)` does".
- The notes hold the analyzer's rule (`:44`, `:158-212`) and the class load before the pool (`MainWrapper.java:61-64` at `a2be3e9e1d`). They also hold the run at 1 and at 4 threads, P-174's example by reading, and the workaround. Each of these is from the review's Findings, 1.
- The status is unchanged.

### C65, row 960: fail (fidelity)
- Passage: "A new reproducer is owed: a program's coercion over `RadixPointNumeral[\n, m, r, v\]` that returns `n` for `00.5`, asserting 3."
- Source: the ground's condition says when the reproducer is owed: "for the next batch that edits walk's numerals or the parser's float text" (the review, Part 4, "960: a note"). `entries-report.md` says that this condition "is left to PLAN". No PLAN line holds it, and no queue item does: `PLAN.md` names row 960 only in item 473's line. So the condition is lost.
- Correction: write the condition in the note: "A new reproducer is owed, for the next batch that edits walk's numerals or the parser's float text: ...". If the note's size forbids it, the routing writer files a line under "Climb batch 29b, listed for his review" beside review-routed.1 and .2, as climb batch 29's review-routed.1 held row 968's owed expected failure.

### C66, row 442: pass
- `FortressLibrary.fss:389` is `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])` on `RR64`.
- `NumeralFoldFloats.fss:11` is `h: RR32 = 16777217.0`.
- The sentence that was cut to fit the row is in its history.

## PLAN: "Where we stand" and phase 4

### C67, PLAN.md:9; C68, :10; C69, :11: pass
- C67: "7 of 7 ... to climb batch 29b" and "52 of 52 on climb batch 29b's merged tree", from the review, section 7 and "Confirmations".
- C68: climb batch 29b's gate at `a2be3e9e1`, and the differences in the review's section 2.
- C69: "climb batches 23 to 29b (phase 4's first eight lines), climb batch 29b at `a2be3e9e1`".

### C70, :12: pass
It names this record-landing, then his answers to findings 1, 2 and 3 and item 77 (queue items 449 and 487 to 489), then the next batch, by finding 3's option (a) or else by phase 4. This is the review's "The steps due before the next batch", 1 to 5. The sentences on item 74 and on items 265 and 267 stand.

### C71, the new batch line: pass
"Climb batch 29b, phase 4's eighth batch, landed 2026-11-10 at `a2be3e9e1`; its review is `reviews/batch-29b-review.md`."

### C72, C73, C74, forks F5 to F7 to PLAN-history: pass
Answered. The routing report gives item 482 in (a), his words of 16:40 and 17:14 UTC on 2026-11-09. The (a) entry quotes both. They are built by `a26e74f5c`.

### C75, :91: pass
"Its first eight batches, climb batches 23 to 29b, landed".

### C76, the new line on the one library's numeral coercions: pass
The ground's claim, placed beside the names batch, where the F5 to F7 lines stood.

### C77, the new line on row 971: fail (fidelity)
- Passage: "Fork A6's default, the task pool started before the program's classes load (`.../MainWrapper.java:61-64`), is not built".
- Source: the record's fork A6 (`CLIMB-BATCH-29b.md:206`) has two defaults. One is "Its default, for when it is built, stays the probe's way (a), the task pool started before the program's classes load". The other is the batch's: "**Default: left as the row, with its workaround**". The review's (a) says "Build fork A6's own default next ... the fork's own default for when it is built". The line drops "for when it is built". Item 78 under "Pavol's answers", and queue item 488, then give "Default: fork A6's, as landed, way (c)". A reader finds two different "fork A6's default" in one PLAN.
- Correction: "Fork A6's default for when it is built, the task pool started before the program's classes load (...), is not built".

## PLAN: "Pavol's answers" and "Off the path", with the queue's new items

### C78, item 75 and its group line to PLAN-history: fail (coverage)
- The move stands. It is answered: item 448 in (a), his word of 17:28 UTC on 2026-11-09, and built by `a26e74f5c`. Rows 961 and 968 were closed at `c6ef2f0b8`.
- Failure, passage: `PLAN.md:719`, the paragraph of "Climb batch 29, listed for his review": "The ones that wait on him before the switch-over are under 'Pavol's answers' above, with items 75 and 76, which come before the next batch."
- Source: after this move, no item 75 is under "Pavol's answers". `routing-report.md`, "For the coordinator", names the sentence as stale and leaves it, "since no change names it". This move made it stale.
- Correction: "... with item 76, which comes before the next batch." The text that it replaces goes to PLAN-history, as for the other changed lines.

### C79, item 76: pass
The rewrite lists the rows that stand (958, 962, 963, 966, 967, 446, 974, 442, 971, 973) and the rows closed or narrowed. It gives ways (a) to (c), "No default on record", and the review's recommendation. Its group line, "Before the next batch", gives its "Needed by".

### C80, item 77: pass
"Review-queue item 487." was added. For the group line, see C86.

### C81, :89: pass
It takes out 476 and 482, both in (a), and so lists the queue's 27. The tail now names item 77's 487.

### C82, :85; C83, :75; C84, :209: pass
No writer is assigned. `owed.md` gives the reason that each stays. This covers `plan-moves.py`'s LOOK lines :85 and :211, the worktree's number for :209.

### C85, the new group with items 78 and 79: pass
Each item gives what is asked, its ways, a default ("fork A6's, as landed, way (c)"; "(b), as landed (rung A's decision 11)") and the review's recommendation. The group line gives "before the next batch".

### C86, queue item 487: fail (routing)
- The item itself passes. It gives the question, ways (a) to (c), "Default: the probe's state, as landed", which is a default that the batch took, so the item stays open, and "Needed by: before the next batch".
- Failure, passage: in PLAN, item 77 still stands under the group line "Before the switch-over, raised by climb batch 29b's rungs".
- Source: its queue item, and `PLAN.md:89`'s tail ("item 77's, review-queue item 487, before the next batch"), say that it is needed before the next batch. In "Pavol's answers, in the order they are needed", it now sits under a "Before the switch-over" heading, between two "Before the next batch" groups. `routing-report.md` names the question and keeps it, citing item 75's precedent. Item 75 was answered, and no reader of PLAN now has that precedent before them.
- Correction: the group line reads "Before the next batch, raised by climb batch 29b's rungs (...)". The other way is to move item 77 into C85's group, and to say in that group's line that it also holds the rungs' item.

### C87, queue item 488; C88, queue item 489: pass
- Each gives what is asked, its ways and its default as the record holds it. 488's is fork A6's, way (c). 489's is (b), rung A's decision 11.
- Each gives "Needed by: before the next batch" and is consequential by the review.
- 488's (a) "in the next batch that touches numerals" is the review's recommendation.

### C89, C91, C92, C98, the lines of items 443, 456, 458 and 478 to PLAN-history: pass
Answered. Each is his confirmation of 16:02 UTC on 2026-11-09, and for 478 also his words of 13:22. Each is quoted in its (a) entry.

### C90, :721, item 450: fail (fidelity)
- Passage: "is P-174's 'once per class, when the class loads' the component's class, and is a place whose type names a type parameter ... one value for each instance".
- Source: P-174 holds no such words. P-176 holds the class load: "into a `static final` field filled when the class loads". Queue item 450 names P-176. The rewrite kept a quote that P-174 lost when it was rewritten to the static numerals.
- Correction: "is P-176's 'filled when the class loads' the component's class, ...".

### C93, :733; C94, :741; C95, :745: pass
- C93: "keeps its own numeral type, as `NaturalNumeral[\1,10,7\]`", from row 963.
- C94: "`u = 0` is `false` under walk too, so the question stands beside item 77".
- C95: "the text says that `Literal` is not built, the radix being the static argument `r`". `literals.tex:146-159` was read.

### C96, review-routed.1 of climb batch 29 to PLAN-history: fail (routing)
- Passage, `routing-report.md`: "C96, C97 ... moved to PLAN-history. Ground: row 968 is FIXED; row 973 makes the respelling's `true` false."
- Source: the routing rule, "built, by a named commit". C96 is a move of kind built, and its reason names no commit. `owed.md` gives `a26e74f5c8`, row 968's repair, and `c6ef2f0b80`, the commit that closes row 968.
- Correction: the report's reason for C96 reads "built: row 968's repair by `a26e74f5c8`, the row closed at `c6ef2f0b80`, its reproducer `tests/NumeralStaticDesignWalk.fss` passing".

### C97, review-routed.2 of climb batch 29 to PLAN-history: pass
Stale, by the landed change: the pairs were deleted, and row 973 holds the effect. The messages of `NumeralTypesWalk.fss:41-42` go to item 495 (C107).

### C99, :754-761: pass
- The paragraph takes the list's form.
- Lines :756 to :761 become one line each, with what is asked, the default and the queue item, by the routing's rule for an item that has another home. Their earlier text is in PLAN-history.
- The ledger citations `:570` and `:492` become rows 581 and 694.
- Lines :763 and :764 stand as work lines.

### C100 to C105, queue items 490 to 495: pass
- Each gives what is asked, its default as landed, and its "Needed by". The workflow sets this to "no planned work", except for 495, which takes its line's default.
- The kinds match `owed.md`.

### C106, review.3 to PLAN-history: pass
Built, by this run's C21 and C25 to C50. `mech-1.md` shows `record.py apply` rewriting F-180 and all 26 entries, so the report's condition ("holds only if ... land") is met. The move lands in the same commit as those entries.

### C107, review.1's additions: pass
Item 495 holds the class comment of `Numerals` (`:46-57`), `bestMatchForNumerals` (`OverloadedFunction.java:2306-2309`), `FOrdinaryObject.seqv` at every `SEQV`, `CodeGen.java:6482`'s comment, and the messages at `NumeralTypesWalk.fss:41-42`.

### C108 to C111, queue items 496 to 499 and their PLAN lines: pass
- 496 names the departures as the review's Part 4 names them, "A5 and A6 not built" among them. Its "Needed by" is before the switch-over, set by the workflow.
- 497 gives his words of "15:xx to 16:3x", as the record has them (`CLIMB-BATCH-29b.md`, section 2).
- 498 gives "No default on record".
- 499 lists the nine prelude lines.

## The review queue: items already in it

### C112, the head: pass
- The counts are 179, 70 and 109, and "The next batch" is 7 (6, 1). The new group holds 10 (0, 10).
- The prose names 487 to 499, and the lines for 449, 450, 462, 470, 473 and 479.
- `queue-check.py` passes.
- The change from "climb batch 29's gate" to "climb batch 29b's gate" for 403 has its ground: the review's "Confirmations".

### C113, item 449: pass
It is re-scoped to finding 3, with rows 961, 968 and 362 closed and 957 narrowed, and ways (a) to (c). Its "Needed by" stands.

### C114, item 450: pass
- Since `a26e74f5c`, a place whose type names no type variable is one object.
- A place at a type parameter is evaluated at each use, and fork A5 is not built.
- The citation `:7189` becomes the method's name.

### C115, item 462; C116, item 470; C117, item 473: pass
- C115: its title "keeps `IntLiteral`" changed.
- C116: "`=/=` answers as `NOT (e = e')`", beside item 487.
- C117: "`Literal[\v\]` not built", with its "Needed by" tail on row 969 dropped, since that rewrite landed.

### C118, item 477; C119, item 475; C120, item 479: pass
- C118: in the past tense, with row 969 closed.
- C119: N7 to N10 went with row 969, and N11 stays.
- C120: "C6 built by climb batch 29b", with rows 961 and 968 closed.

### C121, item 448; C122, the homes of items 443, 456, 458, 478 and 482: pass
- C121: built by `a26e74f5c`, and its home is PLAN-history. His decision and words are unchanged.
- C122: each home names PLAN-history's dated heading and the heading the line stood under.

## Other notes

### C123, `map/spec-to-implementation.md`: pass
Each cell that names the prelude's `IntLiteral` or `FloatLiteral` says that the type is gone since `a26e74f5c`.

### C124, `map/dormant-code.md`: pass
`binary.tex:3000-3081` and `conversions-coercions.tex:275-281, 622-624, 852-859` each hold, at the landing, what the base's lines held.

### C125: pass
Weight none.

## Checked, and nothing owed

### C126 to C135: pass
Weight none, and no writer is assigned.

## The mechanical checks of `mech-1.md`

No check fails. The lines that need a cause:

- `words-subset.py`, every POSITIONS line, exit 1: information, not a failure. The cause is that the POSITIONS lines that are not cut-only add words by design: P-174 (C52), P-176 (C53), P-76 (C54), P-172 (C55), P-165 (C56), P-171 (C57), P-163 (C59), P-166 (C60) and P-175 (C61). P-173's cut-only line passes (C51).
- `lengths.py`, entries already over 600 that grew:
  - F-57 +5 (C2), F-118 +133 (C5), F-128 +33 (C22), F-262 +53 (C11), F-324 +7 (C20), F-347 +79 (C18), P-174 +58 (C52) and P-176 +78 (C53): each grows by its owed clause.
  - F-129 +162 (C23) also grows by the raise clause, which the change does not owe: see C23.
- `plan-moves.py` LOOK `PLAN.md:85`: Q-walk stays, by C82.
- `plan-moves.py` LOOK `PLAN.md:211` (`:209` at f629cd2dd): climb batch 23's finding 2 stays, by C84.

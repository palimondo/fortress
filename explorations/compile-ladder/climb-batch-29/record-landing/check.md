<!-- The record-landing checker's report for climb batch 29 (base b430f9f42, landing 7daf51fe8, worktree at fa630b65f): each change of owed.md, pass or each failure with its class, the passage, its source and the correction, then the failures of mech-1.md. -->

# The check of climb batch 29's record-landing, round 1

196 changes: 173 pass, 23 fail (coverage 2, fidelity 6, form 6, routing 9). The worktree's changes were read with `git diff fa630b65f -- explorations/ ':!explorations/coordinator/PLAN-history.md'`. Every moved line citation of C24, C38, C42 to C46, C48 to C73 and C79 to C81, C86 to C88 was compared line by line at `b430f9f42` and `7daf51fe8`: each new line holds the old line's text, except where `owed.md` says the old line was already stale at the base (F-74's, P-166's and P-163's `FortressBuiltin` lines, whose new lines hold the cited declarations).

## FACTS: the pass (C1 to C37)

- **C1, F-32: form.**
  - Passage: "Of the 449, 29 were the object `IntLiteral`'s, 4 among the 154 and 25 among the 158; they left the one library with it (F-79)."
  - Source: the old text gave the pointer its words, "whose place the numeral types `NaturalNumeral` and `RadixPointNumeral` take (F-79; row 578)"; F-79 holds the numeral types, not the leaving. A pointer carries a few words on what it holds (`record.md`, "What an entry is").
  - Correction: "they left the one library with it, for the numeral types of F-79."
- **C2, F-53: pass.** Unchanged; the gate's figures stand as the commit stage wrote them.
- **C3, F-55: pass.** Kept; `ZZ32` agrees with F-344.
- **C4, F-57: pass.** Reordered only; "measured on an earlier library (F-79)" keeps the measurement's bound in plain words, the handle "the numeral switch" gone.
- **C5, F-73: pass.** The clause now reads as row 506's note ("A lone parameter that numerals alone fix takes their default, its one choice"), no longer as a third refusal.
- **C6, F-74: pass.** With C38.
- **C7, F-79: pass.** The title no longer says that each type converts from both numeral types; the body follows [S6]'s table.
- **C8, F-84: pass.** Kept.
- **C9, F-118: fidelity.**
  - Passage: "The compiled path prints an `NN32` or `NN64` value above its type's signed half unsigned (F-313; ...). So `lt(18446744073709551615, 5)` for `lt(a: IntLiteral, b: IntLiteral): Boolean = a < b` fails with `Not in range for ZZ64` (row 328)".
  - Source: the cut sentence, "It compares two `IntLiteral` values at `ZZ64`, so", was the premise of the failure (rows.md, row 328). Now "So" ties the failure to the unsigned printing, a cause that no source gives (the pass's question 2).
  - Correction: put back "It compares two `IntLiteral` values at `ZZ64`, so" in place of "So".
- **C10, F-123: pass.** Kept.
- **C11, F-131: pass.** Kept.
- **C12, F-137: pass.** Kept, its last sentence named for investigation in the report (see "Beyond owed.md").
- **C13, F-138: pass.**
- **C14, F-140: pass.**
- **C15, F-151: pass.** "It landed when the curator said to land it." went to the history.
- **C16, F-228: pass.**
- **C17, F-229: form.**
  - Passage: "the `cast` of the `ZZ32` vector to an array of `Int` would throw `CastError` (row 722)."
  - Source: rows.md, row 722, is `openRange`'s cast at `Int` (FIXED, `12292add2`), not `array1`'s; the cut words "as `openRange` did" told what the row holds. The rest of the cut correctly went to the history.
  - Correction: "(row 722, the same cast in `openRange`)".
- **C18, F-240: pass.** Its line is unchanged; its figures stand.
- **C19, F-249: pass.**
- **C20, F-253: pass.**
- **C21, F-262: fidelity.**
  - Passage: "and fold `^` by an integer numeral (F-339), but leave an integer base at a negative exponent".
  - Source: F-339, "`^` by an integer numeral up to 4096"; the old text, "an integer exponent of magnitude at most 4096". The sentence now states the fold without its bound. The title's new example (`x^16`, `x^(-16)`) is right, by the fold at `IntegerLiteralFoldingVisitor.java:292-302`.
  - Correction: "fold `^` by an integer numeral up to 4096 (F-339)".
- **C22, F-263: pass.**
- **C23, F-278: form.**
  - Passage: its sentence "The checker and walk read the library's trait by its qualified name, ... which the checker refuses (row 806)." is 817 characters.
  - Source: the brief's form rule: a sentence past 600 characters stays only with the question that keeps it, named in `entries-report.md`. The report's C23 line names none.
  - Correction: name the question that keeps it in the report, or split it at its semicolons.
- **C24, F-285: pass.** Row 824's new scope as rows.md gives it; the nine `FortressLibrary.fss` lines verified; the growth of 45 is the owed clause.
- **C25, F-299: pass.** Kept; its 1008-character by-type sentence is named with its reason (question 5 and process finding 11).
- **C26, F-304: pass.** The team's roundings and "(row 862, fixed)" went to the history; 579 characters.
- **C27, F-326: pass.**
- **C28, F-328: pass.**
- **C29, F-331: pass.**
- **C30, F-339: pass.**
- **C31, F-340: pass.**
- **C32, F-341: pass.** "`h = 0.5` is `true` for `h: QQ = 1/2`" is the review's split 13 case, which runs the pair.
- **C33, F-342: form.**
  - Passage: its sentence "Where no place's type has a coercion from the numeral's type ... a `nat` or `int` parameter read as a value is a `ZZ32`." is 812 characters.
  - Source: the brief's form rule; the report's C33 line, "Keep.", names no question.
  - Correction: name the question in the report, or split it at its semicolons.
- **C34, F-343: pass.**
- **C35, F-344: pass.**
- **C36, F-345: form.**
  - Passage: its sentence "The literals chapter gives `Numeral` comprising ... whose Effects name each departure with its row." is 680 characters.
  - Source: the brief's form rule; the report's C35 to C37 line names no question.
  - Correction: name the question in the report, or split it at its semicolons.
- **C37, F-346: pass.**

## FACTS: sentences that the landing made false or stale (C38 to C71)

- **C38, F-74: pass.** Cut: "F-74 is why P-76's walk half waits; F-79 is the library half, built." The title's "it stays so until walk has the checker's static types, since without them a list of numerals and a generic's static argument take their types from the values" is cut too. F-341 ("a type parameter that several numerals fix takes the narrowest default holding them all") and F-344 (static arguments read at the trait, `<|1, 2, 3|>` an `ArrayList[\ZZ32\]`) make that clause false. "(P-173)" is the decided default. `:128`, `:131`, `:200` hold `Int`, `Long` and `BigNum`. Probe Q measured a design not taken, and it went to the history with its Detail pointer kept.
- **C39, F-169: pass.** "a numeral the Working Draft's types `NaturalNumeral` and `RadixPointNumeral` below `Numeral`, with the numeral's four numbers as fields (P-174, F-345)" follows F-345 and his words of 22:3x (`HELD.md:23`). `literals.tex:139` opens `revival-numerals`.
- **C40, F-122: form.**
  - Passage: "On both paths a numeral with a radix point at `round`, `floor`, `ceiling` or `truncate` converts into `RR64`, so one within half an ulp of a tie rounds as its nearest double, as P-172 decides: `round(2.50000000000000001)` is 2 (the guard `tests/RoundNearTieNumeral.fss`)."
  - Source: the entry was already past 600, and it grew by 111 (`mech-1.md`, lengths.py). The owed clause is only that P-172 and P-173 decide it, with its guard (owed.md, C40). The conversion into `RR64` and the example are P-172's own sentence (question 5). P-172's round sentence is the coordinator's reading of P-173's tie rule, still under "To tell him when he is back" (`BOOT.md`). So the pointer should name P-173's tie reading.
  - Correction: "On both paths, a numeral within half an ulp of a tie rounds as its nearest double, not as the rational that it denotes, by P-173's tie reading (P-172; the guard `tests/RoundNearTieNumeral.fss`)."
- **C41, F-128: pass.** "a value other than a numeral at a declared return (row 387; a numeral converts there, F-341)" follows row 387's note. The growth of 65 is the owed clause.
- **C42, F-327: pass.** 374 (F-299). Both ranges are verified. Its 640-character sentence predates this pointer change.
- **C43, F-173: pass.** Lines verified.
- **C44, F-272: pass.** Lines verified.
- **C45, F-78: pass.** Lines verified.
- **C46, F-334: pass.** Lines verified.
- **C47, F-240's history: pass.** The note gives the review's correction, distance beside `testFast` and the 08:00:44 probe, and count against 108 s to 123 s. F-240's line and figures are unchanged.
- **C48 to C71: pass, each.** F-35, F-44, F-58, F-63, F-85, F-102, F-168, F-170, F-175, F-268, F-276, F-279, F-283, F-286, F-302, F-303, F-305, F-306, F-307, F-311, F-312, F-315, F-330 and F-332: every new line holds the base line's text. F-170's range end `:60` is right, since base `:54-58` is now `:54-60`. F-303's 785-character and F-312's 608-character sentences predate these pointer changes.

## POSITIONS (C72 to C85)

- **C72, P-165: pass.**
  - Before: "`RR32`, `RR64` and `NaturalNumeral` (P-174) each declare `asFloat`" and "(`Specification/basic-lib/numbers.tex:46-54`)".
  - After: "`RR32`, `RR64`, `NaturalNumeral` and `RadixPointNumeral` (P-174) each declare `asFloat`" and "(`...numbers.tex:56-73`)".
  - Decided (`asFloat` leaves `Number`; each built-in number type keeps its own), where (every concrete type) and required (`asFloat(x)` unchanged): the same. The list follows the tree (`FortressLibrary.fsi:489`). His word of 09:3x is "with every edit the batch asks (P-165 included)" (`BOOT.md`). It is his to confirm by item 478. The range `:56-73` holds the base's `:46-54`, the revival-asfloat callout now at `:70-73`.
- **C73, P-171: pass.** Before `constant.tex:81-85`, after `:118-122`: the same passage ("The only operation on literals that produces a new literal ...").
- **C74, P-76: pass.**
  - Before: "Walk gaps: a numeral at an `NN32` or `NN64` binding (row 454), a numeral beyond `ZZ32`'s range at an `RR64` binding (row 443), and coercion through tuple and varargs parameters (rows 395 and 511)."
  - After: "Walk gaps: coercion through tuple and varargs parameters (rows 395 and 511)."
  - A cut only (words-subset pass). The decision, its reach and its requirement are the same.
- **C75, P-172: pass.**
  - Before: "on both paths (row 862: the compiled path rounds two or three times)", "at a binding, a parameter and a field," and "(`FortressBuiltin.fsi:44`)".
  - After: "on both paths.", "at a binding, a parameter, a field and a declared return type," and "(`FortressBuiltin.fsi:44` at `b430f9f42`)".
  - The places grow by one to P-173's reach, "walk converts from the exact value at the same places", and to F-341's. The decision (exact `QQ`, one rounding into `RR64` and `RR32`) and its requirement are the same.
- **C76, P-173: pass.** Before "`1/2 = 0.5` is `true` through `QQ`'s `=` pair,"; after "`1/2 = 0.5` is `true`,". A cut only. The answer and his default "a comparison of literals alone folds" stand.
- **C77, P-169: pass.** Before "leave the library with those two types" and "are Fortress text over its `asZZ` (F-331)."; after "left the library with those two types" and "left with it.". The decision, no carrier for the numerals' bindings, is the same.
- **C78, P-154: pass.**
  - Before: "Row 774: walk's half, since walk still gives every list an order; it waits until walk runs the checker (P-12) or row 364, walk's typing of a generic at its argument's run-time class, is fixed."
  - After: "Row 774: walk's half, since walk still gives every list an order."
  - The condition he set is met (row 364 FIXED). Row 774's note still has walk give every list an order.
- **C79, P-166: pass.** `:548`, `.fsi:200` (`value object BigNum extends ZZ`), `:655` (`Ratio`).
- **C80, P-163: pass.** `:598` names `simpleChar.charToExprString`.
- **C81, P-175: pass.** `:7062` holds the team's comment.
- **C82 to C85: pass, each.** Writer none, and P-174 and P-168 are unchanged.

## The gap ledger (C86 to C89)

- **C86, row 893: pass.** `changes.tex:4291-4292` is in the entry "The type of self in a trait with a self-type parameter", P-146's, whose Effect says that walk "loads a declaration that the paragraph refuses".
- **C87, row 961: pass.** `:373-377 at 7daf51fe8` is the prefix-minus fold.
- **C88, row 965: pass.** `:2707` holds `opr ||(a:Any, b:String)`.
- **C89, row 579: coverage.**
  - Passage: rows.rewrite's "Repair: `Integral`'s api states the three; the case of a numeral is not measured."
  - Source: `mech-1.md`, "ledger-clarity/apply.py rows.rewrite": "refused: rewrite 579 ... notes-length: 703 characters; at most 700". The row is unchanged in the ledger, and the report does not name it as left.
  - Correction: "Repair: `Integral`'s api states the three; a numeral's case is not measured." (698 characters). Then apply it again.

## PLAN: "Where we stand", phases 4 and 5, "Off the path" (C90 to C126)

- **C90, PLAN.md:9: pass.**
- **C91, :10: pass.** "Climb batch 29 built the numeral design ... on both paths" is the review's own title ("the literals built on both paths"), with section 7 named for the differences. "no merged tree since climb batch 26's rung L is measured" restates the review, section 6: "its count on today's code is still not measured".
- **C92, :11: pass.**
- **C93, :12: fidelity.**
  - Passage: "the raise-string resolver and what the natives review's order of work leaves before the names batch (`reviews/natives-remainder-2026-11-07.md`, section 5), or first one small batch for the differences that both paths can test today (the same review's step 5)".
  - Source: "the same review" reads as the natives review just named. The batch-29 review's step 5 ("The steps due before the next batch") says only "by finding 4's option (a) if he takes it". The small batch is Findings, 4, option (a).
  - Correction: "(`reviews/batch-29-review.md`, Findings, 4, option (a))".
- **C94, :48: pass.**
- **C95, :49: pass.**
- **C96, :54: coverage.**
  - Passage: "; `IntLiteral`'s 25 are gone, its 8 conversions and comparisons moved in climb batch 28's rung V (F-331) and the other 17 removed with the type in climb batch 29 (F-32)".
  - Source: owed.md, C96: "the clause to PLAN-history, the line cut to N3's open part (the 133, row 881)". The built clause stays, rewritten as an account of how the 25 left, and the report gives no reason for that.
  - Correction: cut the line to "N3, C's 158: the 133 that need a new helper, sized at 132 helpers ... (`natives-shape.md`, section 3)." The old text is already in PLAN-history.
- **C97, :56: pass.** What stays, "It holds no numeral binding since climb batch 29 (F-32).", states N5's present scope.
- **C98, the batch's line to PLAN-history: routing.**
  - Passage: routing-report.md, "C98 to C104 ... moved ... | the review, 'For the curator'; RECORD.md, 'The landed commits'".
  - Source: a move for "built" names its commit. A list of commits is not a named one.
  - Correction: name `7daf51fe8`, the landing of the six rungs.
- **C99: routing.** As C98. Correction: name N's `3de571bac7` and C's `53a6074ed7`.
- **C100: routing.** As C98. Correction: name F's `955cad76df`.
- **C101: routing.** As C98. Correction: name N's `3de571bac7`.
- **C102: routing.** As C98. Correction: name G's `12292add28`.
- **C103: routing.** As C98. Correction: name S's `e53480fc6e`.
- **C104: routing.** As C98. Correction: name T's `4978a9b16e`.
- **C105, :69: pass.**
- **C106, :72: pass.** Fork F5 as the record gives it.
- **C107, :73: fidelity.**
  - Passage: "since the prelude declares no pair at a number type, so the answers agree until then".
  - Source: `CLIMB-BATCH-29.md`, section 3, fork F6: "so no compiled test can show it before then, and after it a pair's body converts the numeral object correctly unfolded". No source says that the answers agree.
  - Correction: replace "so the answers agree until then" with "so no compiled test can show it before then, and after it a pair's body converts the numeral object correctly unfolded".
- **C108, :74: pass.** "since the prelude has no `QQ`" is fork F7's.
- **C109, :75: pass.**
- **C110, :255: pass.**
- **C111, :77: pass.**
- **C112, :79: pass.**
- **C113, :85: fidelity.**
  - Passage: "as climb batch 29's rung N built it (`3de571bac7`), which closed rows 443 and 486".
  - Source: rows.md, row 486: "fixed `53a6074ed`", rung C's commit (C133: "built by C, fork C5 (row 486 FIXED)"). Row 443 is N's, `3de571bac`. The rest passes: "walk's numeral is never a value of a numeral type" is cut, since walk passes the numeral object to a coercion (F-341). Item 91 needed nothing, which clears the LOOK.
  - Correction: "as climb batch 29's rung N built it (`3de571bac7`), which closed row 443; rung C's `53a6074ed7` closed row 486".
- **C114, row 578's line: pass.** Built, `3de571bac7`.
- **C115, :89: pass.** It gains 450, 455, 460, 470, 476, 477 and 482, as the queue's group does, and names 448 apart.
- **C116, :104: pass.**
- **C117, :108: pass.**
- **C118: pass.** Weight none. The LOOK on PLAN.md:205 has owed.md's reason.
- **C119, row 360's line: routing.**
  - Passage: routing-report.md, "moved: row 360's line, answered | P-173; row 360 closed."
  - Source: an "answered" move needs his word on that same item, cited with its time, and the report gives no time. His 12:4x word left row 360 "for later" (`HELD.md`). The round sentence that applies P-173's tie rule to it is the coordinator's (`40680b856d`), still under "To tell him when he is back" (`BOOT.md`). So no word of his is on this item.
  - Correction: give the reason as stale by a landed change: row 360 FIXED by `69427e942`, settled by P-173.
- **C120, row 325's line: pass.** Built, `53a6074ed7`.
- **C121, :249: pass.**
- **C122, :258: pass.**
- **C123, :273: pass.**
- **C124, :444: pass.**
- **C125, :445: pass.**
- **C126, :547: pass.**

## PLAN's review lists and the queue's new items (C127 to C179)

- **C127, item 75 and queue item 448: pass.** It gives the question, "No default on record beyond the fork's, which the landed tree departs from", and "Needed by" as the review states it.
- **C128, item 76 and queue item 449: pass.**
- **C129, the list's first paragraph: routing.**
  - Passage: routing-report.md, "C129 | old PLAN.md:713 | moved: the list's first paragraph."
  - Source: each move has its reason. This one has none.
  - Correction: "stale, by the landed rungs (`7daf51fe8`): each of the ten defaults is built (C130 to C139), so 'wanted before its rung lands' is past".
- **C130 to C134, items 438 to 442 to (a): pass, each.** `HELD.md:22`, 23:3x: "yes to the Fable judgement's six repairs ... and the coordinator's defaults for its open items". So it is his word on each item, and each (a) entry cites it with its time and the entry that now states it.
- **C135, item 443: pass.**
- **C136 to C138, items 444 to 446 to (a): pass, each.** As C130.
- **C139, item 447: pass.**
- **C140, the list's paragraph: pass.** It takes the form of climb batch 28's paragraph, "Each is reversible." included, which the record's section 3 supports: "Each default can be undone".
- **C141 to C168: pass, each.** Items 450 to 477. Each gives the question, the default as landed or "No default on record" where `owed.md` says so (452, 459, 461, 468, 469), "Needed by" marked where the workflow set it, the section by its kind, and the PLAN pointer line.
- **C169, item 478: fidelity.**
  - Passage: "P-165's list names `NaturalNumeral` and not `RadixPointNumeral`."
  - Source: P-165 as this run wrote it (C72): "`NaturalNumeral` and `RadixPointNumeral` (P-174) each declare `asFloat`". The item states as present a text that the same landing replaced.
  - Correction: "P-165's list named `NaturalNumeral` and not `RadixPointNumeral` until this landing added it, under his rule of 2026-10-31; his to confirm here."
- **C170 to C177: pass, each.** Items 479 to 486 and the two PLAN lines.
- **C178, C179: pass.** Weight none.

## The queue's items already in it (C180 to C187)

- **C180, the head: pass.**
  - The prose names this routing.
  - The counts: 173 open, 72 consequential, 101 routine (queue-check pass).
  - 448 and 449 come before the next batch, and 403 before the next batch's gate.
  - The numeral group holds 443 and 447 only.
  - Seven items join "Before the switch-over", and the new group holds the other 30.
- **C181, item 403: pass.**
- **C182, item 406: pass.**
- **C183, item 437: pass.**
- **C184, item 224: pass.**
- **C185, item 76: pass.**
- **C186, item 372: pass.** Lines verified.
- **C187, item 380: pass.**

## Other notes, and nothing owed (C188 to C196)

- **C188 to C196: pass, each.** Weight none. INDEX is unchanged, and check-index finds no note without a line.

## The failures of mech-1.md

- ledger-clarity/apply.py rows.rewrite, FAIL: row 579 refused, notes 703 > 700. Cause: the clause that C89 added. Change: C89.
- words-subset.py, every POSITIONS line, exit 1 (information): each added word is owed: P-165 by C72, P-171 by C73, P-172 by C75, P-169 by C77, P-166, P-163 and P-175 by C79 to C81. No failure.
- lengths.py, grew past 600:
  - F-122 +111: beyond its owed clause, the failure of C40.
  - F-128 +65 (C41), F-169 +7 (C39), F-285 +45 (C24), P-165 +21 (C72): owed.
  - F-305, F-306, F-312 +1 (C64, C65, C68) and P-171 +2 (C73): a pointer's digits.
- plan-moves.py LOOK PLAN.md:85: stays by C113's ground, item 91 already named closed with its reason. Covered.
- plan-moves.py LOOK PLAN.md:205: stays by C118's ground. Covered.
- check-index.sh, 2 prose paths that resolve nowhere: older than this run, which left INDEX unchanged. No failure.

## Beyond owed.md, for the coordinator (not failures of this round)

- The entries writer named four passages that the sort did not list:
  - F-137's last sentence cites P-76 for a reading that P-76 no longer states.
  - F-276's `"ab" || "cd"` example is now folded before walk.
  - P-76's "the name that the compiler's prelude and the interpreter's library give the type" is false since N. The fewest words: "the name that the compiler's prelude gives the type".
  - P-172's "`1/2 = 0.5` is `true`" is the same folded comparison as C76.
  
  Each waits for a sort line. F-137's waits for an investigation first.
- The routing writer's two changes beyond owed.md stand: phase 4's closing paragraph (":91") and the bare-numerals line moved with its reason (item 444 in (a), rung N's respelling). Its report gives that line as "old PLAN.md:168". The diff's hunk is `-166`.

<!-- The record-landing workflow's evidence of PLAN.md at 61f1c6a93: its headings, the lines that the batch added (4d27fbcc5..a12ab5c60) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

# PLAN.md

Print a section with `facts-extract.sh 'doc:explorations/coordinator/PLAN.md#HEADING'`, from the worktree.

## Its headings, with their lines

- 7: Where we stand (7 lines)
- 14: The principle for the batches (6 lines)
- 20: The phases (2 lines)
  - 22: Phase 1. Batch 5: what is decided and shares nothing (4 lines)
  - 26: Phase 2. Batch 6: the tower flips, the specification with it (4 lines)
  - 30: Phase 2b. The repair batch from the conformance reviews (4 lines)
  - 34: Phase 3. The checker at a true zero (6 lines)
  - 40: Phase 4. The switch-over (41 lines)
  - 81: Phase 5. microGPT compiles (18 lines)
  - 99: Phase 6. microGPT fast (9 lines)
- 108: Pavol's answers, in the order they are needed (60 lines)
- 168: Work that can start now, with no decision (23 lines)
- 191: Off the path, parked (40 lines)
  - 231: Phase 3's candidates at its end (22 lines)
  - 253: Climb batch N's first run, listed for his review (11 lines)
  - 264: Climb batch 6.5b, listed for his review (10 lines)
  - 274: Climb batch 7b, listed for his review (23 lines)
  - 297: Climb batch 8, listed for his review (19 lines)
  - 316: Climb batch 9, listed for his review (27 lines)
  - 343: Climb batch 10, listed for his review (16 lines)
  - 359: Climb batch 11, listed for his review (13 lines)
  - 372: Climb batch 12, listed for his review (15 lines)
  - 387: Climb batch 13, listed for his review (22 lines)
  - 409: Climb batch 14, listed for his review (17 lines)
  - 426: Climb batch 15, listed for his review (20 lines)
  - 446: Climb batch 15b, listed for his review (4 lines)
  - 450: Climb batch 16, listed for his review (10 lines)
  - 460: Climb batch 17, listed for his review (14 lines)
  - 474: Climb batch 18, listed for his review (15 lines)
  - 489: Climb batch 19, listed for his review (20 lines)
  - 509: Climb batch 20, listed for his review (16 lines)
  - 525: Climb batch 21, listed for his review (19 lines)
  - 544: Climb batch 21b, listed for his review (12 lines)
  - 556: Climb batch 22, listed for his review (14 lines)
  - 570: Climb batch 22c, listed for his review (22 lines)
  - 592: Climb batch 23, listed for his review (12 lines)
  - 604: Climb batch 24, listed for his review (20 lines)
  - 624: Climb batch 25, listed for his review (17 lines)
  - 641: Climb batch 26, listed for his review (13 lines)
  - 654: Not classified, to check (13 lines)
- 667: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 684: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 696: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, 4d27fbcc5..a12ab5c60

- PLAN.md:10, under "Where we stand":

- **The live thread.** Phase 4, the switch-over: one library, the interpreter's, becomes the library the compiler checks (P-37), the natives first (P-33). At the last landed gate, climb batch 25's (`11d2d8764`), the distance is 0 and the checker count 0 over the fourteen components (F-53; `compile-ladder/climb-batch-25/gate/`), 288 of the library's 449 live bindings name helpers of `nativeHelpers/` and 161 still name glue classes, 306 and 143 since climb batch 26's rung T (F-299, F-32), and the code generator refuses 38 declarations in 10 kinds on climb batch 26's rung L tree, local functions compiled (F-34, F-320). Of the readings under that zero, review-queue item 295 waits for his word, and items 309 and 326 are closed at the cleanup of 2026-11-05 (learning) (row 844; F-308); row 731's checker gap stays for user programs and the team demos (F-285). What each batch moved is in its record and its review (`compile-ladder/climb-batch-*/RECORD.md`, `reviews/batch-*-review.md`); this section's earlier texts are in `microgpt-run-c-handover-history.md` and `coordinator/PLAN-history.md`.

- PLAN.md:45, under "The phases > Phase 4. The switch-over":

- **Climb batch 26**, phase 4's fourth batch, run on a reduced scope (`coordinator/CLIMB-BATCH-26.md`: rungs W, S, L and T), gathered on `main` at `4f4bba6d6` with its gate to run (`compile-ladder/climb-batch-26/RECORD.md`). It was planned from climb batch 25's post-batch review (`reviews/batch-25-review.md`, "The steps due before the next batch", 6) and its record (`coordinator/CLIMB-BATCH-25.md`, "After the landing"): the string family after items 310 and 340; the rest of the 109 after items 331 and 332; `ZZ`'s conversions after the answer on the integer conversions; `Char`'s `asExprString` after row 861's answer (review-queue item 354); the literals with N5; and the next code-generator rung, the local functions first, after its probe (row 304). It was launched after climb batch 25's skill steps (`coordinator/climb-batch-workflow.md`, "After the landing: the coordinator's routing", steps 4 and 5), with the Fable review of its record and his go.

- PLAN.md:46, under "The phases > Phase 4. The switch-over":

- The natives, first in the phase by P-33's order, and the third of the three steps that `perf-probes/prelude/REPORT.md` named (F-61). Every native binding becomes a `builtinPrimitive` call naming a static helper of `nativeHelpers/`, which both paths run (P-58), since the compiled path cannot reuse walk's glue classes (F-32). The one library's 449 live bindings, sorted at `a1f8c4b8b` before any moved: A, 154 that the compiled prelude already binds at the same owner and signature; B, 59 whose helper exists but no binding names it under that name and signature; C, 158 that need a new helper; D1, 36 methods of the native I/O objects; D2, 42 with no compiled analogue (F-32; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes"). Since climb batch 26, 306 bindings name helpers and 143 still name glue classes (F-299, F-32). The steps are R5's (`perf-probes/prelude/natives-shape.md`, section 3), sized there at nine rungs in about three gated batches on the earlier count of 424, each family gated by the interpreter suite:

- PLAN.md:47, under "The phases > Phase 4. The switch-over":

  - N1 and N2, A's 154 and B's 59: those moved are in F-299, F-303 and F-305 to F-307; those that waited on review-queue items 310 (over `String`, row 846) and 340 (`FlatString`'s five) moved with climb batch 26's rung T, the string family's 18 (F-299), `FlatString`'s `=` and `flatConcat` at a `Char` left on glue with item 331; B's 23 with a name the prelude gives another helper are in row 348 and F-32.

- PLAN.md:49, under "The phases > Phase 4. The switch-over":

  - The families that wait on a known obstacle, each with its home: `Char`'s `asExprString` (review-queue item 354, row 861); row 872; varargs (row 849, review-queue item 311 (closed at the cleanup of 2026-11-05: learning)).

- PLAN.md:56, under "The phases > Phase 4. The switch-over":

- The code generator over the one library (F-34): under the switch-over's setting it refuses 38 declarations of the fourteen components in 10 kinds (climb batch 26's rung L tree), each kind in its ledger row: rows 624, 733, 818, 819 and 822; rows 888 to 892, from climb batch 25's rung C, with row 890 in review-queue item 350 (closed at the cleanup of 2026-11-05: settled); row 875, which its planner filed; and row 832 beside them. The library must emit, not only check, before the compiled tests can run against it, so they are cleared before the prelude is deleted with its tests kept (P-37; `reviews/phase3-exit/judgement.md`, section 2.4): several rungs, which the planner sizes from the kinds (the same, section 5.2, item 6). The judgement calls this phase 4's second zero, the code generator's over the same components as the checker's (section 6). Code-generator work goes on beside P-33's order (P-33).

- PLAN.md:93, under "The phases > Phase 5. microGPT compiles":

- The code generator's other gaps on microGPT's path, each row its own home: the APL base's `typecase` (row 340), by reading (C4's two local functions in `step` have the shapes that compile since climb batch 26's rung L, F-320; row 304 holds the forms still refused); the 37 microGPT sites that reach `Number`'s catch-alls, re-measured (inventory B1 step 19, B2); two generic declarations of one name with different bounds, the compiled dispatch that P-46 needs (row 537; defect 3 of `reviews/overloading-judgement.md`, section 3.7); a method call on a result typed by an intersection, the method's owner found among the conjuncts and the checker's typing not weakened (row 540); generic dotted methods' dispatch (row 495), a dispatcher that is not a template (row 496), and row 499's answers, repaired beside row 496's (review-queue item 159 (closed at the cleanup of 2026-11-05: settled)); and a local of a `do … also` arm in slot 0 of the task's `compute` (row 497), with row 322's `try … catch` in an arm, though C4 and the APL sources hold no `also`.

- PLAN.md:146, under "Pavol's answers, in the order they are needed":

Before the switch-over's checker reads `System`, raised by climb batch 26 (`compile-ladder/climb-batch-26/RECORD.md`):

- PLAN.md:148, under "Pavol's answers, in the order they are needed":

64. T.worker.1 and T.skeptic.1 of climb batch 26's rung T (row 895): `System`'s `getEnvironment` and `getProperty` (`Library/System.fss:41`, `:51`) name helpers of `nativeHelpers/systemOps`, whose `getArgs` answers an `FStringVector` that the checker maps to `FortressBuiltin.StringVector`, which the interpreter's prelude does not declare; so they stop wherever the checker reads `System`, at the switch-over at the latest. Move the two helpers to another class, declare `StringVector` in the interpreter's prelude, or move `getArgs` out of `systemOps`? No default on record. Evidence: `compile-ladder/rung-string-natives/REPORT.md:175`; F-321.

- PLAN.md:641, under "Off the path, parked > Climb batch 26, listed for his review":

### Climb batch 26, listed for his review

- PLAN.md:643, under "Off the path, parked > Climb batch 26, listed for his review":

The items for him that climb batch 26 (`coordinator/CLIMB-BATCH-26.md`, rungs W, S, L and T, phase 4's fourth batch on a reduced scope: walk's half of row 804, the overview's NaN sentences, the code generator's local functions and the string family) left (`compile-ladder/climb-batch-26/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"). Each is reversible, and the default is what landed.

- PLAN.md:645, under "Off the path, parked > Climb batch 26, listed for his review":

- W.skeptic.1 of climb batch 26's rung W (row 894, `CONTESTED`): is `checkFancyRule`, the compiled checker's refusal of a top-level function more specific than a functional method of its name, a rule of the language? `advanced/overloading.tex` applies only the Meet Rule for functions to such a pair, and walk now loads it (`ProjectFortress/tests/GenericInsideTraitMethodWalk.fss`). No default on record. Evidence: `compile-ladder/rung-walk-vector-scalar/SKEPTIC.md:74`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:413-424`.

- PLAN.md:646, under "Off the path, parked > Climb batch 26, listed for his review":

- W.skeptic.2 of climb batch 26's rung W (row 893): should walk's load check apply P-146's extender rule, now that its overloading check reads `self` of a self-typed trait as `C[\X\] & X` and so relies on it? Default: P-146's "walk is unchanged", the gap gated by `ProjectFortress/tests/XXXSelfTypeExtenderOtherTypeWalk.fss`. Evidence: `compile-ladder/rung-walk-vector-scalar/SKEPTIC.md:75`; `Specification/basic/traits.tex:306-312`.

- PLAN.md:647, under "Off the path, parked > Climb batch 26, listed for his review":

- S.worker.1 and S.skeptic.1 of climb batch 26's rung S: `Documentation/Specification/Prose/Language/Operators/operator-overview.tick:274-278`, the team's later restart of the specification, still says that a rational comparison throws `RationalComparisonError` at 1/0 or 0/0 and a float comparison `FloatingComparisonError` at a NaN, against the revised `Specification/basic/operators/opr-overview.tex` (P-159); does that copy take the same revision, or stay as the team left its unfinished restart? No default on record; as landed, it stays. Evidence: `compile-ladder/rung-spec-nan-comparison/REPORT.md:102`.

- PLAN.md:648, under "Off the path, parked > Climb batch 26, listed for his review":

- S.worker.2 and S.skeptic.2 of climb batch 26's rung S, told, not asked: row 440's change went in as its whole new line by `ledger.py rewrite`, not as the note the brief asked for, since the row's notes cell held 676 of its 700 characters; the new line names `<=` and `>=` beside `=` and `CMP`. Default: as landed. Evidence: `compile-ladder/rung-spec-nan-comparison/REPORT.md:117`.

- PLAN.md:649, under "Off the path, parked > Climb batch 26, listed for his review":

- T.worker.2 and T.skeptic.2 of climb batch 26's rung T (fork 21, taken): walk refuses at load a helper parameter declared `String` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:70`), while the checker reads a helper's Java `String` as `String` (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:488`), so the stages accept a binding that walk refuses. Default: as landed, the step taken. Evidence: `compile-ladder/rung-string-natives/REPORT.md:208`.

- PLAN.md:650, under "Off the path, parked > Climb batch 26, listed for his review":

- T.worker.3 and T.skeptic.3 of climb batch 26's rung T (fork 19): does review-queue item 332 cover the pair, a public bare native over `FlatString` beside a public overload over `String` that flattens (`Library/FortressLibrary.fss:4628-4644`; `Library/System.fss:41-56`)? Default: as landed, each native public and bare under the overload's own name. Evidence: `compile-ladder/rung-string-natives/REPORT.md:207`; review-queue item 332, under "Climb batch 24, listed for his review".

- PLAN.md:651, under "Off the path, parked > Climb batch 26, listed for his review":

- gather.1 of climb batch 26, told, not asked: the sentences of the `fortress-repo` skill that the batch made false, which the batch writes no skill text to correct, rung W's skeptic's item on `interpreter.md:43` among them: `.claude/skills/fortress-repo/references/interpreter.md:43` and `:53` and `references/revival-changes.md:43` (W: walk now reads an own generic beside a self-typed trait's functional method, and loads row 804's shape), `references/interpreter.md:95`, `:99`, `:102`, `:107` and `:116` (T: a helper parameter declared `String` is refused, the library's `FlatString` carries `self`), and `references/compiler.md:41` (L: a local function compiles but in row 304's three forms). Default: left for the skill writer. Evidence: `compile-ladder/rung-walk-vector-scalar/REPORT.md:104-111`; `compile-ladder/rung-string-natives/REPORT.md:181-191`; `compile-ladder/rung-codegen-local-functions/REPORT.md:93-101`.

- PLAN.md:652, under "Off the path, parked > Climb batch 26, listed for his review":

- gather.2 of climb batch 26, told, not asked: sentences outside the rungs' files that the gather left for the coordinator's routing: `coordinator/map/compile-path-walkthrough.md:469` and `:475-476` and `coordinator/map/spec-to-implementation.md:201`, which say the code generator refuses every local function (L); items 62 and 63 under "Pavol's answers", whose bindings over `String` and `FlatString`'s five moved in rung T at the Fable judge's default; the climb batch 13 entry on row 672, which closed; and P-159 in `POSITIONS.md`, which still says the overview's two sentences "are to be revised", now revised. Default: as the routing moves them; POSITIONS is his to edit. Evidence: `compile-ladder/rung-codegen-local-functions/REPORT.md:93-101`; `compile-ladder/rung-spec-nan-comparison/REPORT.md:98-106`; `coordinator/POSITIONS.md:90`.


## The lines added after the landing, a12ab5c60..61f1c6a93

None.

## The other lines that name a changed entry or row

- PLAN.md:36, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:52, under "The phases > Phase 4. The switch-over", 221 characters, names F-32: - N4, D1's 36, the I/O objects: a Java-backed writer type and `stdOut` first, since every program's `println` writes through `Writer`'s natives (F-32), then `File`'s 15 and `Reader`'s 10 (`natives-shape.md`, section 3).
- PLAN.md:54, under "The phases > Phase 4. The switch-over", 144 characters, names F-32: P-84, P-85), and `Thread`, `Reflect` and `printTaskTrace`, off microGPT's path (F-32).
- PLAN.md:57, under "The phases > Phase 4. The switch-over", 328 characters, names F-181: F-181 holds the built `where` half.
- PLAN.md:62, under "The phases > Phase 4. The switch-over", 754 characters, names F-32: F-32), which `natives-shape.md` puts with `NativeArray` after the switch-over (section 3).
- PLAN.md:140, under "Pavol's answers, in the order they are needed", 469 characters, names row 846: W.worker.1 and W.skeptic.1 of climb batch 23's rung W (row 846): under walk a native bound over `String`, glue class or helper alike, receives a non-flat string's type name in place of its characters; | the next family that moves such a binding meets row 846.
- PLAN.md:392, under "Off the path, parked > Climb batch 13, listed for his review", 218 characters, names row 672: - Which passage governs a float compared with a NaN, and so the tuples' answer (row 672, `CONTESTED`)? Default `false`, as `RR64`'s own `<` answers.
- PLAN.md:529, under "Off the path, parked > Climb batch 21, listed for his review", 809 characters, names row 804: - X.skeptic.3 of climb batch 21's rung X: walk's half of the vector pairs (row 804).
- PLAN.md:601, under "Off the path, parked > Climb batch 23, listed for his review", 436 characters, names row 846: `compile-ladder/climb-batch-23/RECORD.md`, "Points to report"), with walk's `ZZ32` `DIV` by zero raising `DivisionByZero` and the two quiet values that a program's own helper binding can now give (rows 846 and 847).

## The lines that look stale at 61f1c6a93

From `plan-moves.py --stale-at 61f1c6a93`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:48, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 326. The line: - The 109 that cannot name their helper as a bare string: the 76 and the 5 moved are in F-308, F-313 and F-311. The way for each of the 25 left, `ZZ32`'s `big` 
LOOK PLAN.md:73, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, the walk half of the numeral switch (P-76; `reviews/numeral-switch-judgement.md` section 4.4), in the batch whose step gives walk the checker's static
LOOK PLAN.md:77, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 194. The line: - His answers needed before the switch-over: review-queue items 2, 20, 21, 30, 35, 36, 39, 108, 194 (closed at the cleanup of 2026-11-05: settled), 212, 214 (cl
LOOK PLAN.md:152, under "Pavol's answers, in the order they are needed": settled: its own review-queue item is in (a): 109. The line: - Item 22, `TotalComparison` extending `StandardMinMax` (P-98), explained in more detail when he has the energy. Review-queue item 109 (closed at the cleanup of
LOOK PLAN.md:189, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280c "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on 
LOOK PLAN.md:198, under "Off the path, parked": settled: its own review-queue item is in (a): 167. The line: - Row 331's bare `Nothing` re-gated on type inference, in place of the gate on `where` clauses that P-90 sets, and the decisions judgement's candidate rows 2, 3
LOOK PLAN.md:199, under "Off the path, parked": settled: its own review-queue item is in (a): 28. The line: - Row 360, a numeral within half an ulp of a tie, which rounds as its nearest double on both paths; default as both paths do it, gated. Review-queue item 28 (cl
LOOK PLAN.md:202, under "Off the path, parked": settled: its own review-queue item is in (a): 111. The line: - Climb batch 7's rung H's repair of the `Condition` site: a program's own `p1 ANDCOND p2` of two relational predicates is no longer a relational predicate unde
LOOK PLAN.md:203, under "Off the path, parked": settled: its own review-queue item is in (a): 110. The line: - `LessThan`'s and `GreaterThan`'s `CMP` answer the converse of their own `<` (row 456), and `LEXICO Unordered` answers `Unordered` (row 457); not repaired, sin
LOOK PLAN.md:204, under "Off the path, parked": settled: its own review-queue item is in (a): 112. The line: - `fill` and `tabulate` sit where the array diamond meets, `StandardMutableArrayType` and `ImmutableArray1`, not in each leaf trait answer 10 names; his to conf
LOOK PLAN.md:205, under "Off the path, parked": settled: its own review-queue item is in (a): 113. The line: - The factories' function forms are named `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`; his to change, 4 declarations and 8 calls; default as la
LOOK PLAN.md:206, under "Off the path, parked": settled: its own review-queue item is in (a): 154. The line: - Climb batch 7R's rung J restated row 452's test to a `ZZ32` range of converted bounds and renamed it `RangeSizeRungO.fss`; default as landed. Review-queue ite
LOOK PLAN.md:207, under "Off the path, parked": settled: its own review-queue item is in (a): 141. The line: - Climb batch 7R's rung U respelled over `ZZ32` a third passage, the adapted `BlockedRange` of `Specification/advanced/parallelism-locality/defining-generators.
LOOK PLAN.md:208, under "Off the path, parked": settled: its own review-queue item is in (a): 168. The line: - `checkDeclComprises`'s header comment lists the eligibility rule's three cases, not the fourth climb batch 7C's rung Y added; the rung recommends a two-line a
LOOK PLAN.md:209, under "Off the path, parked": settled: its own review-queue item is in (a): 13. The line: - The `comprises` check he approved, landed by climb batch 7C's rung Y, decides by names (rows 489 and 490; F-72): by how an extender spells its type variable, 
LOOK PLAN.md:210, under "Off the path, parked": settled: its own review-queue item is in (a): 139. The line: - Climb batch 7C's rung X's three wording decisions in the `comprises` text (D1, D2, D8), and `SkTwoLevel`, which the text and both checkers refuse while walk r
LOOK PLAN.md:211, under "Off the path, parked": settled: its own review-queue item is in (a): 140. The line: - Climb batch 7R's rung U's two notations: ℤ's factorial as the recurrence `0! = 1`, `(m+1)! = (m+1) m!`, and the midpoint `lo + (hi − lo) DIV 2` without the te
LOOK PLAN.md:212, under "Off the path, parked": settled: its own review-queue item is in (a): 85. The line: - Taken as a default by the conversion judgement and listed with items 28 and 29: walk promotes from run-time types, so where a variable is declared wider than 
LOOK PLAN.md:213, under "Off the path, parked": settled: its own review-queue item is in (a): 159. The line: - Climb batch 6.5's rung G's dispatch change answers differently for a class it was not measured on (`SkPosBox`, `SkPosFixed`), a defect of the template dispatc
LOOK PLAN.md:214, under "Off the path, parked": settled: its own review-queue item is in (a): 142. The line: - Climb batch 6.5's rung P made ℚ's listing extend the four algebraic traits the library declares on `QQ`, with a sentence on where their laws hold; default as 
LOOK PLAN.md:215, under "Off the path, parked": settled: its own review-queue item is in (a): 143. The line: - Climb batch 6.5's rung P stated `narrow` on `ZZ` (rows 349 and 442) and reworded `MaybeRungM`'s comment; default as landed. Review-queue item 143 (closed at t
LOOK PLAN.md:216, under "Off the path, parked": settled: its own review-queue item is in (a): 144. The line: - Row 500: three `shift` properties of the integer chapter are wrong or garbled, the Working Draft's; left for whoever gives the library these methods. Review-q
LOOK PLAN.md:217, under "Off the path, parked": settled: its own review-queue item is in (a): 155. The line: - Climb batch 6.5's rung P showed its first `XXX` walk test red on a control copy, not on a local fix of `QQ`'s `=`; default as landed. Review-queue item 155 (c
LOOK PLAN.md:218, under "Off the path, parked": settled: its own review-queue item is in (a): 145. The line: - Climb batch 6.5's rung P's met stop: the overview says a fixed-size `GCD` or `LCM` result the type cannot hold raises `IntegerOverflow`; walk does on `NN32` a
LOOK PLAN.md:219, under "Off the path, parked": settled: its own review-queue item is in (a): 96. The line: - A numeral too large for every declaration of a call is refused, climb batch N's rung I's reading of Q1's default; default as landed. Review-queue item 96 (clo
LOOK PLAN.md:220, under "Off the path, parked": settled: its own review-queue item is in (a): 52. The line: - How climb batch N's rung I ranks a generic declaration among those applicable only with coercion, a judge's decision under a silent text; default as landed. R
LOOK PLAN.md:221, under "Off the path, parked": settled: its own review-queue item is in (a): 53. The line: - Rung I's fallback for a call no attempt keeps: the first attempt that holds a candidate; default as landed. Review-queue item 53 (closed at the cleanup of 202
LOOK PLAN.md:222, under "Off the path, parked": settled: its own review-queue item is in (a): 160. The line: - Climb batch N's rung K edited `Init.java`, outside its record's list, to call `Coercions.reset()`, the team's idiom for a static cache; default as landed. Rev
LOOK PLAN.md:223, under "Off the path, parked": settled: its own review-queue item is in (a): 86. The line: - `Coercions.addSource` under walk leaves a generic `coerce` out of the sources it ranks, so a choice between two coercions into a generic trait can only be amb
LOOK PLAN.md:224, under "Off the pa
... (cut at 8000 of 54005 characters)

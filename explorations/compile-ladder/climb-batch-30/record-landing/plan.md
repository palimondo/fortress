<!-- The record-landing workflow's evidence of PLAN.md at f592b7c0f: its headings, the lines that the batch added (9d0147ff9..d89fc0fda) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

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
  - 40: Phase 4. The switch-over (53 lines)
  - 93: Phase 5. microGPT compiles (19 lines)
  - 112: Phase 6. microGPT fast (10 lines)
- 122: Pavol's answers, in the order they are needed (68 lines)
- 190: Work that can start now, with no decision (23 lines)
- 213: Off the path, parked (37 lines)
  - 250: Phase 3's candidates at its end (24 lines)
  - 274: Climb batch N's first run, listed for his review (9 lines)
  - 283: Climb batch 6.5b, listed for his review (10 lines)
  - 293: Climb batch 7b, listed for his review (23 lines)
  - 316: Climb batch 8, listed for his review (18 lines)
  - 334: Climb batch 9, listed for his review (27 lines)
  - 361: Climb batch 10, listed for his review (16 lines)
  - 377: Climb batch 11, listed for his review (13 lines)
  - 390: Climb batch 12, listed for his review (15 lines)
  - 405: Climb batch 13, listed for his review (21 lines)
  - 426: Climb batch 14, listed for his review (17 lines)
  - 443: Climb batch 15, listed for his review (20 lines)
  - 463: Climb batch 15b, listed for his review (4 lines)
  - 467: Climb batch 16, listed for his review (10 lines)
  - 477: Climb batch 17, listed for his review (14 lines)
  - 491: Climb batch 18, listed for his review (15 lines)
  - 506: Climb batch 19, listed for his review (20 lines)
  - 526: Climb batch 20, listed for his review (16 lines)
  - 542: Climb batch 21, listed for his review (18 lines)
  - 560: Climb batch 21b, listed for his review (12 lines)
  - 572: Climb batch 22, listed for his review (14 lines)
  - 586: Climb batch 22c, listed for his review (22 lines)
  - 608: Climb batch 23, listed for his review (12 lines)
  - 620: Climb batch 24, listed for his review (16 lines)
  - 636: Climb batch 25, listed for his review (16 lines)
  - 652: Climb batch 26, listed for his review (17 lines)
  - 669: Climb batch 27, listed for his review (22 lines)
  - 691: Climb batch 28, listed for his review (26 lines)
  - 717: Climb batch 29, listed for his review (31 lines)
  - 748: Climb batch 29b, listed for his review (17 lines)
  - 765: Climb batch 30, listed for his review (14 lines)
  - 779: Not classified, to check (13 lines)
- 792: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 809: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 821: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, 9d0147ff9..d89fc0fda

- PLAN.md:765, under "Off the path, parked > Climb batch 30, listed for his review":

### Climb batch 30, listed for his review

- PLAN.md:767, under "Off the path, parked > Climb batch 30, listed for his review":

The items for him that climb batch 30's first run (`coordinator/CLIMB-BATCH-30.md`, rungs N, P and X landed of three: the numerals' leftovers, forked arms and arguments on the compiled path, and the compiled transaction) left (`compile-ladder/climb-batch-30/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"). None holds the push or a batch. One line for each point, opening with the ids it holds: what is asked or told, its default, and its evidence.

- PLAN.md:769, under "Off the path, parked > Climb batch 30, listed for his review":

- N.worker.1 and N.skeptic.1 of climb batch 30's rung N (rows 971 and 979, closed): a compiled program now initializes the class of its component, and of each component whose declarations its classes name, before `run` starts, in a root task on a pool of one thread; the JVM initialized an imported component's class at its first use. What moves is the coercion at a numeral's place, which in an imported component now runs before the program's first line, and each program's start costs about 40 ms more. Keep it, or initialize at first use and repair row 979 in `BaseTask`? Default: as landed (fork N1). Evidence: `ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java:30-46`, `runtimeSystem/InstantiatingClassloader.java:185-248`; `compile-ladder/rung-numeral-leftovers/REPORT.md:228`, `SKEPTIC.md`.

- PLAN.md:770, under "Off the path, parked > Climb batch 30, listed for his review":

- N.worker.2 and N.skeptic.2 of climb batch 30's rung N (row 980, CONTESTED): is a numeral with a radix point that rounds to an infinity where nothing fixes a type refused? Both paths print `Infinity` for `x = 1.5 TIMES 10^400` and for the operand in `(1.5 TIMES 10^400) + d`; the text speaks only of a place that fixes a type (`Specification/basic/expressions/literals.tex:209-210`). No default on record; as landed, the infinity. Evidence: `compile-ladder/rung-numeral-leftovers/REPORT.md:218`, `:229`.

- PLAN.md:771, under "Off the path, parked > Climb batch 30, listed for his review":

- N.worker.3 and N.skeptic.3 of climb batch 30's rung N, with gather.1 of its gather, a text mismatch the decisions do not settle (row 981): is walk to refuse at load the other written forms of a numeral type? It refuses a variable's, a field's and a return type only when a numeral meets them (`ProjectFortress/tests/NumeralTypeNoValueWalk.test`), and runs a `comprises` clause (`ProjectFortress/tests/XXXNumeralTypeComprisedWalk.fss`); the checker refuses every form but a parameter's type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:67-72`). The text stands, and its Effect names row 981 among the departures (`Specification/appendices/changes.tex:5302-5303`). Default: as landed; walk refuses them with its checker after the switch-over (P-12). Evidence: `compile-ladder/rung-numeral-leftovers/REPORT.md:230`.

- PLAN.md:772, under "Off the path, parked > Climb batch 30, listed for his review":

- X.worker.1 and X.skeptic.1 of climb batch 30's rung X (row 984): should a nested `atomic` block be atomic with respect to a plain write that another thread of its outer block makes outside a nested block? The text asks for it (`Specification/basic/expressions/atomic.tex:72-75`); a nested block that reads `u` twice beside an arm of the outer block that assigns `u` sees two values, 'SAW u = 0 then 1355' in two of three compiled runs at four threads, and walk none. It is row 948's question one level down. Default: open, recorded and not repaired, with row 948. Evidence: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-248`, `:286-290`; `compile-ladder/rung-compiled-transaction/REPORT.md:174`, `:182`.

- PLAN.md:773, under "Off the path, parked > Climb batch 30, listed for his review":

- X.worker.2 and X.skeptic.2 of climb batch 30's rung X, told, to confirm or reverse: a nested compiled block that an exception leaves now hands its reads to its parent, and where they no longer hold the block starts again in place of throwing. The hand-over's result, no lost update, is settled by the text (`Specification/basic/expressions/atomic.tex:38-41`) and tested (`ProjectFortress/compiler_tests/AtomicNestedReadsKeptCompiled.test`); the restart in place of the throw is the open part, on which the specification is silent. Default: as landed. Evidence: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:314-318`; `runtimeSystem/BaseTask.java:301-307`.

- PLAN.md:774, under "Off the path, parked > Climb batch 30, listed for his review":

- X.skeptic.3 of climb batch 30's rung X (row 985): walk, this rung's reference, loses other blocks' commits where an outer block assigns from what its nested block read, x = 109 of 1,100 at four threads; when is walk repaired? No default on record; as landed, the row and the expected failure `ProjectFortress/tests/XXXAtomicNestedReadsKeptWalk.fss:1`. Evidence: `ProjectFortress/src/com/sun/fortress/interpreter/env/ValueNode.java:66-68`, `:98-99`; `explorations/fortress-gap-ledger.md`, row 985.

- PLAN.md:775, under "Off the path, parked > Climb batch 30, listed for his review":

- gather.2 of climb batch 30's gather, told (row 986): the team demo `Generator2Demo` stopped once with `IntegerOverflow` in the gather's run of the 52 demos on the merged tree, 51 of 52 reaching their end; it multiplies each prefix of 400 random numbers from -5 to 4 (`ProjectFortress/demos/Generator2Demo.fss:62`, `:121`), and two more runs on the merged tree and one on the base reached their end. It is not the batch's: `PROD` of a list of sixty `4`s stops with the same error at the same line on the base and on the merged tree. Default: the row stands open, and a run of the demos that stops there is run again. Evidence: `explorations/fortress-gap-ledger.md`, row 986; `compile-ladder/climb-batch-30/RECORD.md`, "The tests on the merged tree".

- PLAN.md:776, under "Off the path, parked > Climb batch 30, listed for his review":

- review.1 of climb batch 30's merged-diff review, told, for the coordinator's record pass: three decisions on record describe as a departure of the tree what the batch repaired. P-175 says "the code generator evaluates a call's arguments in order (F-19, row 951)", "which the compiled path does not do (`CodeGen.genParallelExprs` joins on the normal path only, row 947" and "splits down to single elements"; P-174 says "Rows 960 and 974 hold where the tree departs"; P-176 says "Rows 957 and 971 hold where the tree departs". Rows 951, 947, 974 and 971 are closed (`explorations/fortress-gap-ledger.md`), and the decisions themselves stand. Default: the coordinator rewrites the three sentences with `record.py`, since POSITIONS is not a review's to write. Evidence: `explorations/coordinator/POSITIONS.md:31`, `:105`, `:106`; `compile-ladder/climb-batch-30/RECORD.md`, "Left for the coordinator and the skill writer".

- PLAN.md:777, under "Off the path, parked > Climb batch 30, listed for his review":

- review-routed.1 of climb batch 30's merged-diff review, for the next batch, holding nothing: row 497 is closed on `ProjectFortress/compiler_tests/TaskArmLocalSlot.test`, a local in an arm, with `TryInArmRungG`, a `catch` name in an arm, but its note names two more cases that no gated test holds: a named `typecase` clause in an arm after the first, and a local that a nested `also` reads (`explorations/fortress-gap-ledger-history.md`, row 497's last line; P's skeptic ran a `typecase` in a forked argument only as a probe, `compile-ladder/rung-forked-arguments/SKEPTIC.md:21`). The step owed: one compiled test with both cases, seen passing at one thread and at four.


## The lines added after the landing, d89fc0fda..f592b7c0f

None.

## The other lines that name a changed entry or row

- PLAN.md:10, under "Where we stand", 2249 characters, names F-53: At the last landed gate, climb batch 29b's (`a2be3e9e1`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53;
- PLAN.md:36, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:61, under "The phases > Phase 4. The switch-over", 1162 characters, names row 888: rows 888 to 892, from climb batch 25's rung C, with row 890 in review-queue item 350 (closed at the cleanup of 2026-11-05: settled);
- PLAN.md:66, under "The phases > Phase 4. The switch-over", 1015 characters, names row 971: - Row 971, from climb batch 29b's rung A: on the compiled path a numeral coercion that spawns a task fails its class's load, since the class's static initializer fills each place before the task pool starts ('ClassCastException: class java.lang.Thread cannot be cast to class com.sun.fortress.runtimeSystem.FortressTaskRunner').
- PLAN.md:71, under "The phases > Phase 4. The switch-over", 222 characters, names rows 947, 951: - Not in climb batch 29, for the budget (his go of 23:3x UTC on 2026-11-08): the parallelism review's repairs N1 and N5 (rows 947 and 951), which phase 6's line on parallel reductions places around the switch-over (P-175).
- PLAN.md:78, under "The phases > Phase 4. The switch-over", 286 characters, names row 442: row 442 holds the same for `NN32` and `NN64` only, and no row holds `ZZ`'s.
- PLAN.md:106, under "The phases > Phase 5. microGPT compiles", 1055 characters, names rows 322, 497: and a local of a `do … also` arm in slot 0 of the task's `compute` (row 497), with row 322's `try … catch` in an arm, though C4 and the APL sources hold no `also`.
- PLAN.md:119, under "The phases > Phase 6. microGPT fast", 1002 characters, names rows 947, 951: row 947, the review's N1). | row 951, the review's N5), and the one library's parallel range stops its split at a grain size, his "right forking constants" (`Library/RangeInternals.fss:1308-1342`), measured on compiled reductions at one and four threads (P-29).
- PLAN.md:134, under "Pavol's answers, in the order they are needed", 220 characters, names row 933: The compiled transaction livelocks when a block reads its own write across a nested commit (row 933): which rung repairs it, and does the repair hold any switch-over step? No default on record.
- PLAN.md:138, under "Pavol's answers, in the order they are needed", 737 characters, names rows 958, 967, 974: One small numerals batch next, for findings 1 and 2, row 974, rows 963, 967 and 958, and item 77 with row 966 if he answers item 77 first;
- PLAN.md:146, under "Pavol's answers, in the order they are needed", 731 characters, names row 971: Finding 1 (row 971): on the compiled path a numeral coercion whose body puts two calls of the program's own functions in one operator or one argument list fails its class's load, so P-176's "filled when the class loads" fails there, while walk runs it (phase 4, the line on row 971). | (c) leave it to the switch-over's start-up work, with the workaround in the skill and row 971's claim widened.
- PLAN.md:148, under "Pavol's answers, in the order they are needed", 659 characters, names row 442: Finding 2 (row 442): the prelude's `RR64` and `RR32` take no integer numeral, so `x: RR64 = 3` is refused on the compiled path and binds `3.0` under walk, while P-37's exception for the numerals exists so that both paths treat a numeral alike.
- PLAN.md:238, under "Off the path, parked", 323 characters, names row 442: walk does on `NN32` and `NN64`, the compiled half comes at the switch-over (row 442);
- PLAN.md:281, under "Off the path, parked > Climb batch N's first run, listed for his review", 301 characters, names row 442: - Rung M's list, on file (`compile-ladder/rung-integer-minmax/probes/for-pavol.txt`): its one point with no line, the home-2 pair `XXXMaxNN32IntoZZ64RungM` outside its record's files, for row 442's face;
- PLAN.md:699, under "Off the path, parked > Climb batch 28, listed for his review", 222 characters, names rows 888, 934: - A.skeptic.1 of climb batch 28's rung A (row 934): which rung of the code generator takes the outer handler's catch of a nested `atomic` block's abort, with row 888's `forTry`? No default on record.
- PLAN.md:700, under "Off the path, parked > Climb batch 28, listed for his review", 266 characters, names row 466: - A.worker.2 and A.skeptic.5 of climb batch 28's rung A (row 466): under walk an immutable array's second initialisation keeps the first value;
- PLAN.md:704, under "Off the path, parked > Climb batch 28, listed for his review", 198 characters, names row 466: Default: left under row 466.
- PLAN.md:711, under "Off the path, parked > Climb batch 28, listed for his review", 161 characters, names rows 934, 937: - gather.2 of climb batch 28 (rows 934 and 937): two rows of one mechanism, or one a duplicate of the other? Default: two rows, as landed.
- PLAN.md:728, under "Off the path, parked > Climb batch 29, listed for his review", 216 characters, names row 958: - N.worker.3 of climb batch 29's rung N, told: an `RR32` operand beside a numeral runs `RR32`'s operator, and a float numeral to the left runs `RR64`'s under walk (row 958).
- PLAN.md:729, under "Off the path, parked > Climb batch 29, listed for his review", 437 characters, names row 967: - N.skeptic.2 of climb batch 29's rung N and gather.2 of its gather (row 967): under walk a numeral that rounds to an infinity of `RR32` or `RR64` converts to `Infinity`, where rung T's text and rung C's checker make it a static error;
- PLAN.md:744, under "Off the path, parked > Climb batch 29, listed for his review", 404 characters, names row 960: - gather.5 of climb batch 29's gather (row 960): the Working Draft's `Literal[\v\]`, which climb batch 29's rung T folded into the digit count;
- PLAN.md:755, under "Off the path, parked > Climb batch 29b, listed for his review", 350 characters, names row 974: - gather.2 of climb batch 29b's gather (row 974): the text writes a numeral type only as a parameter's type, and the compiled checker refuses one written as a static argument or as a type that a trait or an object extends, but walk runs both.
- PLAN.md:758, under "Off the path, parked > Climb batch 29b, listed for his review", 486 characters, names row 974: ...- review-routed.1 of climb batch 29b's merged-diff review, a test file to change, not a question, for the next batch that edits walk's load checks or row 974: `ProjectFortress/tests/XXXNumeralTypeWrittenWalk.fss:5-9` holds both forms of row 974 in one program, so a walk that refused only `object O extends NaturalNumeral[\1, 10, 3\]` at load would turn it red an... | ...ch 29b's merged-diff review, a test file to change, not a question, for the next batch that edits walk's load checks or row 974: `ProjectFortress/tests/XXXNumeralTypeWrittenWalk.fss:5-9` holds both forms of row 974 in one program, so a walk that refused only `object O extends NaturalNumeral[\1, 10, 3\]` at load would turn it red and close the row while `Wrap[\NaturalNumeral[\1, 10, 3\]\](3)` still runs;...

## The lines that look stale at f592b7c0f

From `plan-moves.py --stale-at f592b7c0f`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:85, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:211, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on

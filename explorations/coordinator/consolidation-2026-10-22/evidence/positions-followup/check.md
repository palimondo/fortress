<!-- The check of the POSITIONS follow-up of 2026-10-22 (proposals.apply, proposals.md, rows-new.md beside this file) before the curator reviews it: each changed entry against POSITIONS.md and FACTS.md at d4d454f9d, its history, the audit's evidence, his dated words and the tree; each drafted row against its evidence and the ledger. Nothing applied, filed or committed. -->

# Check of the POSITIONS follow-up

The base is `d4d454f9d`, which is `HEAD`. Each proposed line was compared word by word with the entry as it stands (a word diff of each line), and with its history (`facts-extract.sh 'history:P-N'`), the audit's evidence (`record-clarity/entries.py`, then the scout reports and judgements that it names), the curator's quotes in those reports, and the tree. The drafted rows were checked against the files and commands that their notes cite, re-run through `ledger.py check --rows` (all eight: `1 rows, 0 fail the template`), and searched for with `ledger-find`. No build and no test was run.

## Counts

- **Entries:** 27 changed (24 POSITIONS, 3 FACTS). 20 pass. 7 have failures: P-151, F-78 and P-45 on fidelity; P-32 and P-73 on accuracy; P-30 on a stale pointer outside the record; P-58 in its provenance note only.
- **Moves:** 6 agents' choices leave POSITIONS. All 6 stand in FACTS or a row. One (P-49's to F-78) stands without the mark of whose choice it is (under F-78). One move goes the other way: P-151's new text brings an agent's default into POSITIONS (under P-151).
- **Drafted rows:** 8. Each states a real gap, and none is already a row. 5 pass. 3 have a false or misleading sentence (NEW-2, NEW-5, NEW-6).

## Failures

### P-151

- **Passage:** "A method's `where` condition clears four of the fusion's six type errors, and the team's commented-out generic `distribute`, after a measurement of it, the other two (F-242: as the team wrote it, it only moves the two errors; the form in the tree, with its result over its own `K`, clears them)."
- **What fails:**
  - The sentence still says that the team's commented-out `distribute` clears the other two errors. Its own parenthesis then says that it does not. The cold reader's contradiction is now inside one sentence.
  - The `K` form is an agent's default. His only word on it is "HOLD" (2026-10-16T20:09:30.180Z), answering "whether the team's generic distribute returns its result over its own element type (default yes)". So the parenthesis brings into POSITIONS an agent's choice that he has not approved, against the follow-up's own rule.
  - The provenance note says the sentence gives "F-242's result, without the K form". The line does name the `K` form.
- **Source:** his option 3 of 2026-10-16T15:55:06.719Z, taken at 16:42: "Keep the fusion, and measure the team's commented fix for its last 2 errors" (`positions-audit/trial/evidence/P-151.md`, lines 3 and 17). F-242: "The team's commented text ... only moves the two errors to the generic."
- **Correction:** "A method's `where` condition clears four of the fusion's six type errors; for the other two, the team's commented-out generic `distribute` is the fix measured (F-242 holds the measurement: as the team wrote it, it only moves them)." The form that clears them stays in F-242 alone.
- The rest of the entry passes. "(row NEW-8)" and the departure's move to F-243 are checked under "Moves" and "NEW-8".

### F-78

- **Passage:** "It builds P-48 and P-49. Where the call has an expected type, its attempts come in this order: subtyping without the expected type, kept when its result converts to it; subtyping with the expected type; coercion with it; and coercion without it."
- **What fails:** the order matches the tree (`scala_src/typechecker/impls/Functionals.scala:733-737`; `rung-instance-bound/decision-record.md`, D4). But the entry does not say which attempts P-49 decides. After the change, P-49 says that coercion with the expected type comes after the first attempt. F-78 puts subtyping with the expected type in between. So the two entries disagree, and neither states the disagreement. "It builds P-48 and P-49" then reads as his approval of all four attempts. Review-queue item 2 records this misreading: "a cold reader of P-49 took the fourth as approved". F-270, in the same proposal, does state its conflict with P-85. FACTS marks other such choices too: F-75, "the rung's choices"; F-141, "defaults of the walk-instance rung's decision record".
- **Source:** review-queue item 2: "His decision ... names two: by subtyping without the expected type first, then by coercion with it. Batch 8's rung I kept a third ... It also kept a fourth". `coordinator` skill, `references/record.md`, "What an entry is", Consistency.
- **Correction:** after the order sentence: "P-49 decides the first and the third; the second and the fourth are the instance-bound rung's choice (its decision record, D4)."

### P-45

- **Passage:** "The compiled checker enforces it (F-75 gives its form and scope)."
- **What fails:** this says more than the tree does. The rule is "their static parameters must line up position by position". The checker tests it only when the two declarations have the same number of static parameters of their own. Otherwise it accepts the pair: `if (xo.isEmpty || xo.size != yo.size) return true` (`scala_src/overloading/OverloadingOracle.scala:164`). F-75 calls that scope "the rung's choices", and review-queue item 60 holds it. The parenthesis does not undo "enforces it".
- **Correction:** "The compiled checker enforces it in a narrower scope, which F-75 gives."
- The rewording of rows 779 and 780 passes. It matches row 779's claim, which also covers an object.
- **Note:** the cold reader also asked whether walk enforces the rule. The line answers only for the checker.

### P-32

- **Passage:** "The coordinator reads FACTS and `INDEX.md` whole when it starts a session, and gives each worker's brief a mission briefing from the territory map, not the whole map."
- **What fails:**
  - The entry now gives the coordinator's way of reading the maps as part of his decision. The current entry gives it as the coordinator skill's.
  - "When it starts a session" is too narrow. The boot runs "At session start and after each compaction" (`coordinator` skill, `SKILL.md:214`).
  - In a batch, the planner gives each rung its mission briefing (`references/batch.md:44`).
  - His words support the index read whole ("The index being read full is the mechanism against this.", 2026-10-20T12:07:28.821Z). They support the briefing too ("Maybe the worker doesn't need the full global map, but it needs a mission briefing from the map.", 2026-09-27T06:31:31.170Z). No quote of his asks for FACTS to be read whole.
- **Correction:** "The coordinator skill's boot reads FACTS and `INDEX.md` whole, at the start of each session and after each compaction, and each worker's brief carries a mission briefing from the territory map, not the whole map."

### P-73

- **Passage:** "On the compiled path the rule holds as the specification's (P-25, the standard), and the compiled powers depart from it (rows 523 to 525)."
- **What fails:** the list of departures is not complete. F-132, which the entry already cites, also names the compiled `CHOOSE`, which dies with a raw `ArrayIndexOutOfBoundsException` past its helper's table (row 521; `34 CHOOSE 17` on `ZZ32` does not fit and raises no `IntegerOverflow`). Read as it is written, the line says that only the powers depart. The provenance note has the same gap ("the compiled path's departures rows 523 to 525 (F-132)").
- **Correction:** "...and the compiled path departs from it at `^` (rows 523 to 525) and at `CHOOSE` (row 521)."
- "The decision is walk's" passes: the ask of 2026-09-24T09:00:30.281Z was "the specification's rule on `walk`". The reach to the compiled path through P-25 is an inference from two entries, not a new decision, and the line says so. "(row NEW-5)" passes.

### P-30

- **Passage:** the title, "after a batch" changed to "after each batch".
- **What fails:** `explorations/coordinator/climb-batch-workflow.md:248` cites the entry by its title in quotes: P-30, "The check of microGPT under walk after a batch must take less than a minute.". `record.py` refreshes quoted pointer words only inside FACTS and POSITIONS, so this quote would no longer open the title.
- **Correction:** keep "after a batch" in the title (the body already says "The commit stage of each batch"), or change line 248 in the commit that applies.
- The body passes. His words support "only about two forward-and-backward passes ... not a full training": "I would have said like run two backward forward passes" (2026-10-08T17:49:22.269Z) and "Not a full training that takes ages." (16:20:06.948Z).
- **Notes:**
  - "The minute is the curator's goal for what the check runs: only about two ... passes" joins two of his statements into one sentence that reads awkwardly. The minute is the goal ("it needs to run under a minute, okay? That's the goal."). The two passes are what he would run. "The minute is the curator's goal, for a check that runs only about two ..." says the same thing more plainly.
  - "The commit stage ..., the step that lands its changes": the workflow says that the gather lands the approved rungs, and that the commit stage "lands the gate's tables, runs the quick microGPT walk check and pushes" (`climb-batch-workflow.md`, intro and "Commit, and the push held"). By the worker skill's sense of "land", which includes the push, the line holds.

### P-58 (provenance only)

- The line passes. "From the step that moves a binding, the compiled checker checks it against the helper's Java signature" is what option 1 of 2026-10-10T00:17:43.858Z means. That option is key (b) of the probe: "The stages read each family's calls from the rung that changes its strings, exactly as under way 2" (`perf-probes/prelude/natives-binding-probe.md:113-116`, `:210-215`).
- **What fails:** the provenance note cites `reviews/item35-natives-binding.md:111` alone. That line is way 2's checker bullet, the form that was not taken. Under way 1, the same review says "Until it lands, the checker reads the strings as data". A reviewer who opens only the cited line finds the other way.
- **Correction:** "the checking said as `item35-natives-binding.md:111` gives it for way 2, which key (b) of `natives-binding-probe.md:113-116` carries over to way 1 under his option 1".

## Drafted rows that fail

### NEW-2 (P-17)

- **Passage (claim):** "the code generator emits no `dadd` or `dmul`, so a compiled `RR64` loop holds no primitive double arithmetic".
- **What fails:** the second half is false. The compiled `opr +(self, other:RR64)` is `jDoubleAdd(self,other)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:938`), an `import java` of `simpleDoubleArith.doubleAdd`, `return a + b` on two `double`s (`nativeHelpers/simpleDoubleArith.java:24-26`). The native interface unboxes each `FRR64` with `getValue ()D` and boxes the result with `make (D)` (`compiler/nativeInterface/FortressMethodAdapter.java:144`). So the arithmetic is primitive. What is boxed is every value between two operations. The first half holds: `git grep -i -E 'DADD|DMUL'` on `compiler/codegen` prints nothing.
- **Correction (claim, under 300 characters):** "the code generator boxes every number: an `RR64` value is an `FRR64` object between any two operations, and each operator unboxes its operands, calls a static helper that does the primitive `double` operation, and boxes the result, so no compiled `RR64` variable, field or element is a primitive". In the notes, cite `CompilerBuiltin.fss:938`, `simpleDoubleArith.java:24-26` and `FortressMethodAdapter.java:144` beside the grep.
- The row is a real gap and not a duplicate. Row 306, `POSITIVE-VERIFIED`, holds the measured cost. Row 302 is `FIXED`. `ledger-find` on `FRR64`, `dadd`, `double arithmetic` and `unbox*` finds no row of the gap.

### NEW-5 (P-73)

- **Passage (notes):** "`BOXPLUS` stands only in `Library/Pairs.fss`, on its own run ranges."
- **What fails:** `Library/incomplete/basic/Fortress.Number.fsi:87-88` names `BOXPLUS`, `BOXMINUS`, `BOXDOT` and `BOXTIMES` too, as operator arguments of `CommutativeRing[\ZZ,...\]` in the team's unloaded draft. The compiler prelude names them as well (row 348).
- **Correction:** "Outside the compiler prelude (row 348), `BOXPLUS` stands in `Library/Pairs.fss`, on its own run ranges, and in the unloaded draft `Library/incomplete/basic/Fortress.Number.fsi:87-88`."
- The claim holds: the four prelude files of the one library hold none of the four names, and none of `⊞ ⊟ ⊡ ⊠` (grep). The specification's text holds too (`Specification/basic/operators/opr-overview.tex`, lines 174-175 and 207-208). The row is not a duplicate. Row 348's claim is the compiler prelude's inverted spellings, and row 429's is unary ∔. Only their notes mention the missing family.

### NEW-6 (P-84)

- **Passage (claim):** "the compiled run time has no unboxed array store: none of its classes holds an `RR64` array as a Java `double[]`, and its only vector classes are `FZZ32Vector` and `FStringVector`".
- **What fails:**
  - `FZZ32Vector` is an unboxed array store, over an `int[]` (`compiler/runtimeValues/FZZ32Vector.java:18`). The claim's first clause contradicts its last. `reviews/array-design-ways.md`, section 3, says "The only unboxed stores are two hand-written Java classes, `FZZ32Vector` over an `int[]` and `FStringVector`".
  - The notes' "Walk holds an immutable `RR64` array in a `double[]` (`PrimImmutableRR64Array.java:40`)" misleads. The class exists, but nothing selects it. Only `ProjectFortress/LibraryBuiltin/NativeArray.fss:43-48` names it (`git grep PrimImmutableRR64Array -- Library ProjectFortress/LibraryBuiltin ProjectFortress/tests`). The same section says: "No library file names it; nothing selects it."
- **Correction (claim):** "the compiled run time has no unboxed `RR64` array store: none of its classes holds a Java `double[]`, and its only array classes are `FZZ32Vector`, over an `int[]`, and `FStringVector`". **Correction (notes):** "Walk has the team's one unboxed store, `PrimImmutableRR64Array` over a `double[]` (`NativeArray.fss:43`; `PrimImmutableRR64Array.java:40`), which no library factory selects (`reviews/array-design-ways.md`, section 3)."
- The row is a real gap and not a duplicate. Row 305 says that the compiled path has no array type, and row 306 gives the cost. `ledger-find` on `double`, `unboxed store` and `array store` finds none.

## Entries that pass

- **P-12.** The added row sentence states the unbuilt step only and adds no decision. The tree agrees: walk's branch, `Shell.java:420-424`, never calls `setTypeChecking(true)`; the default is `fortress.compile.typecheck`, false (`Shell.java:1275`); and `StaticChecker.java:166` checks only when the flag is on.
- **P-17.** "(row NEW-2)" is the only change. The row itself fails (above).
- **P-25.** "P-97 holds how the revision uses the first two" is right: P-97 names exclusion and `covariant` only. "As `Specification/basic/types-vals-vars.tex` already says of `BottomType`" holds at lines 106-107. The coordinator's ask of 2026-09-26T07:56:16.747Z named the three topics, and he took it ("Agreed.", 08:01:03.475Z).
- **P-33.** His approval stays: in "Yes, this order and workers are go." (2026-09-26T09:04:41.396Z) he took the 08:40:51.388Z list, which made row 41, ledger row 320's open half, "part of the switch-over's design". What goes is history (the repair batch, carried out as phase 2b) and the agent's gating, which F-22 holds ("Gated by the expected failure `compiler_tests/XXXExportVarRungXLinked.test` (row 320)"). Row 320's claim is the open half alone.
- **P-39.** The batch's gate is steps 1 to 7, the worker skill's seven (`references/gate.md:3`), then "8. The checker count, and 9. the distance" (`climb-batch-workflow.md`, "Gate"). The manifest's per-rung fields include `expectedCheckerCrash` ("The manifest and the scatter"). His decision is unchanged.
- **P-40.** The 17 operators' sizes are gone in the tree (`git show e487cec2d -- Library/FortressLibrary.fsi`, for example `opr DOT[\ T ..., nat n \]`), so the present tense is right. He took the patch: "I agree with the recommendation. The patch made sense to me." (2026-10-20T05:42:24.706Z).
- **P-46.** Only the agent's sentence goes. His decisions remain: "C-O. Both recommendations for batch N accepted." (2026-09-28T19:06:50.868Z), and inference with coercion on both paths ("Agreed.", 2026-09-27T19:30:05.855Z).
- **P-48.** "Always will" was the coordinator's option text, not his words. He wrote "So I don't know what the option man means ... I will trust the team's work" (2026-09-29T17:34:18.956Z), so dropping the forecast loses nothing of his. The row 591 parenthesis moves to F-141, which lists row 591 among walk's defects "each with an expected failure". **Note:** the open question in proposals.md, whether walk takes the instance rule once it has static types, names no review-queue item, unlike the other points not fixed.
- **P-49.** The two sentences that go are the rung's attempts. What stays is his decision as review-queue item 2 gives it. Their move fails under F-78.
- **P-54.** "After the switch-over, `QQ` follows the float ruling" keeps his "first make it pass and then we'll later make it consistent with the ruling on float" (2026-10-09T07:28:28.361Z). The timing was already in the entry. The detail matches P-68.
- **P-58.** The line passes, as given above. Row NEW-4's claim holds: `NativeApp.java:164-203` loads the string with `Class.forName` and casts it to `NativeApp`. Row 309 is the compiled half.
- **P-60.** The requirement placed before "Why" is part of his yes, which took "Astra's three points" (2026-09-29T11:25:37.094Z; `judgement-c4.md`, "P-60"). The tree agrees (F-76: "a coverage check used only in overload checking, not in its subtype test"). Row 543's claim, the intersection typing refused when any declaration of the family has static parameters, is the part narrower than P-60, which F-76 calls a default. Row 551 is walk's half.
- **P-75.** "Not a worker's" follows from `fortress-repo` `references/exploring.md:7-11` (a choice that changes a decision of the curator is not the worker's). Row 575 is `CONTESTED`, "Not built ... for the curator".
- **P-78.** The first sentence is now his answer 7 word for word ("A clause form whose element type nothing at the call fixes writes its static argument"). The checker's part matches row 731: an F-bounded big operator in an unwritten clause form "has no instance". **Note:** "So every clause form of `SUM` and `PROD` writes it" is row 731's workaround, said in the voice of the rule. "Row 731's workaround is to write it in every clause form of `SUM` and `PROD`" would keep the two apart, which is what the cold reader asked for.
- **P-79.** No suite or gate step runs `ProjectFortress/demos/`: no hit in `build.xml`, the gate part or the gate functions, and batch 20's own brief says "No suite runs them". The batch sentence keeps his "maintain them all in running state" (2026-10-20T11:52:00.829Z).
- **P-84.** Decision A, "how an `RR64` array made through the library's generic array traits gets that store", is the question of `reviews/array-design-ways.md`, section 3: "What makes a `Vector[\RR64, 16\]` hold a `double[]` while a `Vector[\T, 16\]` of another `T` keeps a boxed store?" "(row NEW-6)" passes. The row fails (above).
- **P-85.** Decision A is reworded as in P-84. Way 4a moves to F-270. "The whole preparation" stays open, with review-queue item 230.
- **P-88.** "(row NEW-7)" only. The sentence is kept by his page comment of 2026-10-21 23:29 UTC (history).
- **P-96.** "S1" occurs nowhere else in POSITIONS, FACTS or the worker skill. 33 Appendix I entries say "The same under route~C." (`Specification/appendices/changes.tex`), so the added alternative describes the practice.
- **F-137.** "Walk, which has no static types" is P-46's own reason, moved. Dropping "a default" is consistent with review-queue item 85: its other way, "Record the split in the text", is done here ("the two paths instantiate differently (row 509)"), and the item says "Needed by: never".
- **F-270.** It states the conflict with P-85 ("P-85 leaves the array design's three questions open with no default ... way 4a is the one way built on it"), as the record part's Consistency check asks.

## The moves

| Choice | From | Now in | Stands? |
|---|---|---|---|
| Row 320's open half gated as an expected failure, not fixed | P-33 | F-22 ("Gated by ... `XXXExportVarRungXLinked.test` (row 320)"); F-120, the fixed half | yes |
| Walk promotes from run-time types | P-46 | F-137 | yes |
| Walk keeps `Bottom` for row 591 | P-48 | F-141 ("Defects, each with an expected failure: ... (row 591)") | yes |
| The checker's second and fourth attempts | P-49 | F-78, extended | yes, but unmarked (failure under F-78) |
| Way 4a, a run-time size read as fixed for the call | P-85 | F-270, with the conflict stated | yes |
| `addLeft` and `addRight` respelled in `AnyList` | P-151 | F-243 ("with its bodies respelled within `AnyList` and none moved into `List`"); row NEW-8 | yes |

Against the rule: P-151's parenthesis brings the `K` form of `distribute`, an agent's default under his "HOLD", into POSITIONS (failure under P-151).

## Drafted rows that pass

Each was searched with `ledger-find`, and no row holds its claim.

- **NEW-1 (P-12).** The tree claims hold (above). Searches: `walk typecheck`, `walk static types`, `static coercions`, `setTypeChecking`, `no static types`, `interpreter programs`. Row 69 is the `typecheck` command; row 19 is coercion declarations, with walk's run-time choice only in its notes.
- **NEW-3 (P-54).** The bodies are at `Library/FortressLibrary.fss:649-655`. All of them are declared `ZZ`, and `ceiling` and `truncate` throw `DivisionByZero` at denominator 0. The test `NumberOrderListDeclarations.fss:22-31` pins the six raises. `\revision{revival-rational-rounding}` is at `numbers.tex:474`. `deliberate (library)` with `NEGATIVE-VERIFIED` follows the ledger's practice (rows 141, 145, 509, 543, 592, 746). Row 330's claim is the float types only, and row 635 is `FIXED`.
- **NEW-4 (P-58).** The claim holds by reading, which the row says. `git grep -h -o 'builtinPrimitive("com.sun.fortress.[a-zA-Z]*'` prints `412 builtinPrimitive("com.sun.fortress.interpreter`. Row 309's claim is the compiled path's.
- **NEW-7 (P-88).** `Library/FortressLibrary.fsi:1591-1593` has `Array1` extend `ReadableArray1`, and `:1695-1697` has `Array2` extend `Indexed1`, `Indexed2`, `Rank2` and `StandardMutableArrayType` only. There is no `ReadableArray2`. `Diag` is at `run-c4/src/FlatArrays.fss:36`. Searches: `read-only`, `ReadableArray*`, `immutable matrix`, `Diag` (rows 214, 219, 299, none of the gap).
- **NEW-8 (P-151).** `Library/List.fsi:55-60` and `List.fss:89-90` hold the two methods in `AnyList`. `CONTESTED` fits review-queue item 188, which says that "no worker makes the move before he answers" and that "no later rung is built on the respelling", the row's own words. Row 636, the only `AnyList` row besides 752, is `FIXED`.

## Other notes

- "Batch" is defined three times, in three wordings: P-30 ("a set of agents' changes that land together"), P-39 ("a set of tasks, each called a rung, that agents build at once and land together") and P-79 (as P-30). The record part's question 5 ("Does another entry ... say it? Give that entry's number") suggests one definition, in P-39, with the other two pointing to it.
- Pointers from POSITIONS to FACTS that the follow-up adds: P-45 to F-75, and P-60 to F-76. The record part says that a POSITIONS entry "lists no FACTS entries". Each of these is one pointer in the sentence that needs it, as in P-12 (F-9) and P-17 (F-11), not a list. The curator may still want to know about them.

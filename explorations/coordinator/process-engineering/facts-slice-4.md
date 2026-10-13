<!-- The fourth slice of FACTS's consolidation to what a decision needs, written 2026-10-13: the 35 entries of "Landed semantics", what each became, the titles changed and their citations, the line references corrected, the sizes, and the points for the checker. -->

# FACTS, fourth slice: Landed semantics, lines 117 to 151

The base is `427b98c1b`. The slice was lines 117 to 151 of `explorations/coordinator/FACTS.md`, the whole section "Landed semantics", 35 entries. It is now lines 117 to 148, 32 entries. Two pairs were merged and one entry moved whole to the history; 24 were rewritten in place and 8 stand verbatim. Every earlier text is verbatim in `explorations/coordinator/FACTS-history.md`, under "Rewritten 2026-10-13, Landed semantics consolidated to what a decision needs", each after a comment line that says what became of it. No entry outside the slice changed.

## What each entry became

Old line, new line, what it became, the main cut and where that detail lives.

1. 117 → 117, the mutable-variable cell, kept with its opening words. Cut: the verifier failure as history, restated as what compiles now, and the removed probe directory; the report's decision 1 cited. Added: the cell's gated tests, and that none runs a mutable variable of arrow type.
2. 118 → 118, retitled (the title was dated), with 119 merged in. The code's lines and the gating test `IntLiteralWrapRepairR2` named.
3. 119 → merged into 118. Its title narrated a repair. Its fact (an `IntLiteral` result held in an `NN64` prints signed, row 326) stays as one sentence. Cut: the removed skeptic capture; walk's answer is cited from the report's "The failure-mode question".
4. 120 → 119, the scalar extension, kept with its opening words. The `Number` clause is now quoted as it reads, with `RR32` and `IntLiteral`. Cut: the cold-cache runs of `MicroGptFlatCheck` and `MicroGptAplCheck`, a measurement, with the removed `run-c4/cold-cache/repair/`; row 341's notes hold C4's fixed failure and its test. Row 341's open half is now named on its sentence.
5. 121 → 120, export of a mutable variable, title kept. Lines re-read.
6. 122 → 121, the four library comments, kept under its opening words "Four comments in the interpreter's library record". "The specification makes that spelling no valid clause" no longer held. The entry now states what the specification and the checker say, with their lines, and leaves the question open (below).
7. 123 → 122, `round`, verbatim.
8. 124 → 123, default rendering, kept. The gating test `DefaultRenderRungS` named, from row 321's notes.
9. 125 → 124, the compiled integer rules, verbatim.
10. 126 → 125, the interpreter's integer rules, kept. `ZZ32`'s shifts re-read.
11. 127 → merged into 130 (old 133). Its title's "the wrapping operators no running library declares" no longer held, as its own text said. Its sites and the reversed compiled spellings (row 348) were already old 133's. `LinearCongruential`'s defect moved there. The team's 2007 draft is in `reviews/wrap-dependent-code.md` section 8, the plain operators' overflow in new 132, and the range bodies (row 450) in new 132 and 133.
12. 128 → 126, functional-method names reserved, title kept. `shift`'s lines re-read; "came with the library's colliding parameters renamed", an account of a change, restated as the library's present spelling.
13. 129 → 127, `RangePrototype`'s stride, verbatim.
14. 130 → 128, walk's coercion, title kept. Lines re-read, among them the specification's "no less specific" relation, which had moved 33 lines.
15. 131 → moved whole to the history. Its title said "... does not hold". The check has landed, stated by new 132 (rows 379, 403), and the code that relied on the wrap uses the wrapping operators, stated by new 130. The count that found the reliance is in `compile-ladder/rung-walk-overflow/REPORT.md` and `JUDGE.md`, the route in `reviews/wrap-dependent-code.md` section 10.
16. 132 → 129, the run-time size descriptor, title kept. `RTTIsize.of` and the serial counter named where they are. Cut: "at one and four threads", the rung's runs.
17. 133 → 130, the wrapping operators, title kept, old 127 merged in. Lines re-read; the review and the specification's lines for wraparound arithmetic cited.
18. 134 → 131, the flat tower, title kept. `Number`'s clause quoted with `IntLiteral`; the api's span re-read. "A clause form no argument fixes writing its static argument" no longer held (row 424 fixed), and `XXXUnwrittenSumRungF.fss` is gone (deleted in `369982d85`; its case is gated by `UnwrittenReductionWalk.fss`).
19. 135 → 132, walk's overflow, verbatim.
20. 136 → 133, scalar ranges over `ZZ32`, title kept. Lines re-read; the removed `respell.py` dropped. Rows 477 and 483 (fixed) left the open list. Class RG and the split `::` bodies left it too: the last landed gate's table has no class RG (`compile-ladder/climb-batch-13b/gate/distance.txt`), and the per-site list has no error at the split `::` (`compile-ladder/gate/distance-sites.tsv`).
21. 137 → 134, typecase and catch bindings, verbatim.
22. 138 → 135, tasks in generic declarations, verbatim.
23. 139 → 136, generic arms of a template dispatcher, verbatim. Its line reference holds.
24. 140 → 137, walk's inference with coercion, title kept. Lines re-read.
25. 141 → 138, each integer type's `MIN`, `MAX`, `MINMAX`, title kept. "Open: `Integral`'s `MAXNUM` and `MINNUM` ... tie" no longer held: row 517 is fixed, each integer type declaring its own (`IntegerMaxNumMinNum.fss`, which `9d2e4c856` made from `XXXIntegerMaxNumRungM.fss`). Lines re-read.
26. 142 → 139, `RR32` a sibling, title kept. Lines re-read.
27. 143 → 140, sizes beyond `NN32` or `ZZ32`, title kept. Cut: the sentence on the last landed gate, which named batch 13's gate. It is the stale item that slices 1 and 3 listed; see the points.
28. 144 → 141, walk's unfixed type parameter, title kept. `instanceOf` re-read. `XXXInferContravariantWalk.fss` is `InferContravariantWalk.fss` since `833420ce4` (row 588 fixed), and new 142 names it. Each departure's test is named with its row.
29. 145 → 142, walk's Meet Rule at load, title kept. The residues' expected failures are named, from the reproducer cells of rows 611, 612 and 616.
30. 146 → 143, the open type parameter, title kept. Cut: "rows 645 to 649 opened", restated as the rows open now, and two accounts of change, "the same on the base" and "Row 473 no longer shows it", row 473 being fixed and stated by new 144. Cut: the two `Holder[\OPEN\]` examples, held in `tests/OpenTupleDispatchWalk.fss` and the skeptic's `SkOpenDispatch`. Each residue is named with its row, and row 663 as contested.
31. 147 → 144, identity-less reductions, title kept. Cut: "Row 628's 13 sites are off the distance", held in REPORT; "already did" now reads in the present.
32. 148 → 145, walk's load refusals, title kept. Cut: the count of stand-ins per load, held in `compile-ladder/rung-walk-load-checks/REPORT.md` section 4.
33. 149 → 146, arithmetic in a size, title kept. Lines re-read. The tests are sorted: `XXXNatArithPowerWalk` is row 676's expected failure and `XXXNatOpenRun` row 307's pin, each beside its row.
34. 150 → 147, walk's strict-subtype `override`, title kept. Cut: the count of 146 generic declarations, held in REPORT section 4, and "sharpened", an account of a change.
35. 151 → 148, a `where` bound under walk, verbatim.

D2, the bare name in old 146 and 147, now names its record (`compile-ladder/rung-walk-instance/decision-record.md`). Old 144 already defined D2, D3 and D5.

## The titles changed

| Old line | Old title | New title |
|---|---|---|
| 118 | **A numeral's value reaches the compiled world intact as of the repair batch of 2026-09-18.** | **A numeral's value reaches the compiled world intact** |
| 119 | **The repair turns one loud failure into a quiet value, and the value it prints is wrong even though the value it holds is right.** | merged into new 118 |
| 122 | untitled, "Four comments in the interpreter's library record the tower closure's unwritable clause ..." | untitled, "Four comments in the interpreter's library record the tower closure's clause in the team's spelling ..." |
| 127 | **What relies on fixed-width wrapping under `walk`, and the wrapping operators no running library declares** | merged into new 130, "The specification's wrapping operators ∔, ∸ and ⨰ are declared in the interpreter's library ..." |
| 131 | **Under `walk`, the interpreter's library and five of the team's tests rely on fixed-width wrapping, so row 379's overflow check in the ten natives cannot land alone** does not hold | moved to the history |

Kept verbatim: the other 30 titles or opening words. New 118 keeps the old title's opening words. New 121 keeps "Four comments in the interpreter's library record", the words that citations quote.

## The citations

Each old title was searched with `git grep -F` on a distinctive part of it, across `explorations/` and `.claude/`: "as of the repair batch of 2026-09-18", "A numeral's value reaches the compiled", "loud failure into a quiet value", "the value it prints is wrong", "What relies on fixed-width wrapping", "no running library declares", "so row 379's overflow check in the ten natives", "cannot land alone", "Four comments in the interpreter" and "tower closure's unwritable clause".

Updated in live files: none. No live file cites a changed title. FACTS, POSITIONS, PLAN, INDEX, HELD, `explorations/protocol.md`, the coordinator's README, the workflow's `.md` and `.js`, and `tools/` hold none of the strings.

Needed no change, since the titles they quote stand: `POSITIONS.md:73` cites new 130 and new 132; `climb-batch-workflow.js:296` cites new 129 and new 140; `:554` cites new 145; `PLAN.md:697` and `:698` cite new 144, and `:699` new 145. Inside FACTS, lines 18, 20, 33 and 36 cite new 129, line 55 cites new 141, lines 59 and 114 new 143, lines 67, 161 and 178 new 146, and line 184 new 128. The slice's own citations of its entries quote titles that stand.

Left as they are, since they are history: `compile-ladder/repair-r2-literal-wrap/record.md:16` and `:19`, `compile-ladder/rung-wrap-operators/record.md:7` and `:11`, `compile-ladder/rung-walk-overflow/record.md:11`, `compile-ladder/climb-batch-5/RECORD.md:104`, `compile-ladder/climb-batch-6b/RECORD.md:106`, `compile-ladder/plan-6.5/manifest/lists65.py:122`, `coordinator/CLIMB-BATCH-6.5.md:589` and `:981`, `coordinator/CLIMB-BATCH-N.md:1214` and `:1478` (whose words, "A numeral's value reaches the compiled world intact", still match), `process-engineering/fortress-changes-chronology.md:98`, `:141` and `:279`, `process-engineering/record-growth/`, the slice reports, and `FACTS-history.md`.

In `BOOT.md` and under `.claude/skills/`, for the coordinator. None cites a changed title:

- `explorations/coordinator/BOOT.md:22` says that "the record's claim that the team's commented spelling `comprises Integral[\I\] where [\I\]` is no valid clause may no longer hold (FACTS under Landed semantics, the comments entry ...)". New 121 no longer makes that claim. It states the specification's text and the checker's code, and says that no decision settles the question.
- `explorations/coordinator/BOOT.md:12` names this slice "Landed semantics (about 44K)", a section, not a title.
- `.claude/skills/fortress-repo/references/sources.md:35` cites new 129's title, `:166`, `:230` and `:304` new 126's, `:196` new 142's, `:424` new 131's, `:425` new 128's, `:539` and `:558` new 143's, and `:540` new 141's. All stand.
- `.claude/skills/fortress-repo/references/library.md:24` describes the wrapping operators in its own words, not as a citation.

## The question that stays open

Slice 2's point 1 asks whether the team's commented spelling `comprises Integral[\I\] where [\I\]` is a valid clause under the specification as revised since `7fd8fddc8`. New 121 states only this:

- The specification: `Specification/basic/traits.tex:238-246` lets a listed type be an instantiation whose static variables are static parameters of `T` "or a `where`-clause variable of the declaration of `T`", "which the listed type then holds at every value of". Its one example is a `nat` variable (`NatParam`). The revision box at `:274-276` says the same and names `NatParam`'s restored clause.
- The checker: it binds a type `where`-clause variable as a type parameter and a `nat` or `int` one as a size (`scala_src/typechecker/staticenv/KindEnv.scala:117-131`). When it reads a comprises clause, it opens only the `nat` and `int` `where`-clause variables (`TypeAnalyzer.whereSizes`, `scala_src/types/TypeAnalyzer.scala:781-797`, read by `typechecker/TypeHierarchyChecker.scala:237-245`). A type `where`-clause variable is not opened (row 636, whose notes quote the team's `comprises List[\E\] where [\E\]` comment, `Library/List.fsi:56`).

No run of that spelling is on record, and this task ran none. Whether the text admits a type variable there, and so whether the comment's "NOT YET" still holds, is the curator's question, not decided.

## The line references corrected

Every `file:line` of the slice was printed and read. For each one I also compared the cited lines with the tree at the commit that first wrote the citation; where the text had moved, I found it again by its content. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. By old line:

- 117: `runtimeValues/MutableFValue.java` named under `compiler/`; `:18-32` and `Transaction.java:20,27-28,144,152,226` hold. Dropped: `compile-ladder/repair-r1-atomic-static/probes/P15LocalArrow.fss` and `P16LocalArrowTask.fss`, removed from the tree (`ls` lists `JUDGE.md`, `REPORT.md`, `SKEPTIC.md`, `record.md`, `run-subset.sh`, `subset.txt`).
- 118: `literals.tex:83-86` holds. Added: `CodeGen.java:3889-3923` (`forIntLiteralExpr`) and `FIntLiteral.java:85-95` (`asNN64`).
- 119: `nativeHelpers/simpleIntLiteralArith.java:31-32` → `:19-22` (`fromBigInteger`); `FNN64.java:20` holds. Dropped: `compile-ladder/repair-r2-literal-wrap/probes/skeptic/s3.fss`, removed.
- 120: `Library/FortressLibrary.fss:4756-4766` and `.fsi:2691-2701` hold; `.fss:360-361` → `:380-381`; `:655` → `:675`; `:336-339` → `:356-359`; `:2851` → `:2891`. Dropped: `run-c4/cold-cache/repair/`, removed (`ls run-c4/cold-cache/` lists `CAPTURES.md`, `ROWS.md`, `operators`).
- 121: `STypeChecker.scala:345-350` holds; `impls/Operators.scala:444` → `:467`; `CodeGen.java:5985-5998` → `:6042-6051`; `importedVarIsMutable:5960-5967` → `:5996-6003`.
- 122: `FortressLibrary.fss:661` → `:681`; `.fsi:441` → `:444` (slice 2's stale item); `.fss:2852-2857` → `:2892-2897`; `.fsi:1799-1804` → `:1807-1812`; `.fss:4714-4719` → `:4750-4755`; `.fsi:2673-2678` → `:2685-2690`; `.fss:4723-4725` → `:4759-4761`; `.fsi:2682-2684` → `:2694-2696`. Added: `traits.tex:238-246`, `:274-276`, `KindEnv.scala:117-131`, `TypeAnalyzer.scala:781-797`, `TypeHierarchyChecker.scala:237-245`, `Library/List.fsi:56`.
- 123: `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:132-134` hold.
- 124: `CompilerBuiltin.fss:355` and `stringOps.java:74-86` hold.
- 125: `simpleIntArith.java:353-362`, `simpleLongArith.java:322-331`, `CompilerBuiltin.fss:659`, `:879` and `simpleArbitraryPrecisionArith.java:93-102` hold.
- 126: `FortressLibrary.fss:688-691` → `:793-796` (`ZZ32`'s shifts, now taking an `AnyIntegral` count); `.fsi:491-492` → `:574-575`. `BigNum.java:247` holds, a line of `shiftLeft` (`:240-254`).
- 127: `opr-overview.tex:172-176`, `:205-209` and `Random.fss:235` hold (moved into new 130).
- 128: `ExprDisambiguator.scala:745-763` and `declarations.tex:426-461`, `:533` hold; `FortressLibrary.fsi:544` → `:675`; `.fss:885-886` → `:1067-1068`.
- 129: `RangePrototype.fss:66`, `:171` hold.
- 130: `OverloadedFunction.java:1187` → `:1477` (`bestMatchWithCoercion`); `conversions-coercions.tex:477-484` → `:510-517` (the "no less specific" relation, which the citation named when it was written at `b628871a2`).
- 132: `InstantiatingClassloader.java:2744-2752` → `:2751-2759` (the factory's dictionary pattern); `MethodInstantiater.java:225-241` holds; `RTHelpers.java:160-170` holds, but it is the hash that reads the serial numbers, and the counter is `compiler/runtimeValues/RTTI.java:20`, now cited beside it. Added: `RTTIsize.java:24-33`.
- 133: `FortressLibrary.fss:666-674` → `:699-707`; `.fsi:440-448` → `:450-458`; `.fss:941-958` → `:1019-1036`; `IntMap.fss:675-676` → `:717-718`. `Random.fss:241`, `ChunkedSparseArray.fss:76`, `HeapShakedown.fss:117` and `operators.tex:27-29` hold. Added: `Random.fss:222`, `:252-253`.
- 134: `FortressLibrary.fsi:281-611` → `:286-677` (`Number` through `ZZ`).
- 135: `Int.java:98-128`, `:328-384`, `Long.java:112-142`, `NN32.java:103-129`, `:149-162`, `UnsignedLong.java:104-130`, `:297-335` and `HeapShakedown.fss:128` hold.
- 136: `FortressLibrary.fsi:2277-2335` → `:2288-2347`; `.fsi:2163-2164` → `:2171-2172`; `.fss:3788-3789` → `:3843-3844`; `RangeInternals.fss:1023` → `:1273`, `:1103-1124` → `:1357-1378`, `:1194-1196` → `:1458-1460`, `:1329-1370` → `:1593-1634`, `:1475-1486` → `:1749-1760` (each block identical to its text when cited); `Functionals.scala:866-883` → `:1224-1241`; `Types.java:133-139` → `:142-148`. `RangeInternals.fsi:42-46` holds. Dropped: `compile-ladder/rung-ranges-zz32/respell.py`, removed.
- 139: `OverloadSet.java:1342-1353` holds.
- 140: `EvaluatorBase.java:61-66` → `:64-69`; `:257-511` → `:308-593` (`inferWithCoercion` with its comment, through `narrowest`). `Init.java:44` holds.
- 141: `FortressLibrary.fss:285-288` → `:290-293`. `:661-662` and `:628-631` went with the open sentence (`Integral`'s `MAXNUM` is now at `:694-695`, `QQ`'s at `:656-659`). Added: `:752-753`.
- 142: `FortressBuiltin.fsi:47-48`, `.fss:203-204` and `numbers.tex:27-56` hold; `FortressLibrary.fsi:282`, `:291-296` → `:296-301`; `.fss:387-392` → `:410-415`; `.fss:367`, `:370` → `:389`, `:392` (the `RR32` arms of `Number`'s `=`).
- 143: `TypeWellFormedChecker.scala:43-84`, `EvalType.java:449-455`, `:468-480`, `:258-260`, `:270-273` and `BaseEnv.java:630` hold.
- 144: `EvaluatorBase.java:156-188` → `:149-208` (`instanceOf` with its comment).
- 146: `EvaluatorBase.java:184-194` holds.
- 147: `FortressLibrary.fss:3083-3186`, `.fsi:1874-1929` and `.fss:1311` hold.
- 148: `Constructor.java:425-486`, `:569-632`, `BuildEnvironments.java:874`, `:1044-1081`, `Driver.java:243-245`, `CUWrapper.java:272-284` and `Pairs.fss:78-87` hold.
- 149: `TypeAnalyzer.scala:368-378` → `:376-386`; `:266-278` → `:273-285`; `:742-787` → `:771-816`. `Formula.scala:101-139`, `TypeWellFormedChecker.scala:48-51`, `Naming.java:1205-1253`, `InstantiationMap.java:393-394`, `NamingCzar.java:1904-1905`, `NatReflect.fsi:23`, `.fss:24`, `KindEnv.scala:124-132`, `Functionals.scala:327-339`, `TypeHierarchyChecker.scala:237-245`, `:336-341` and `BuildEnvironments.java:946-955`, `:1380-1405` hold.
- 150: `Constructor.java:569-632`, `:591`, `:599`, `:600`, `:634-666`, `BuildEnvironments.java:886-899`, `:592`, `:875`, `ComponentWrapper.java:186` and `ExprFactory.java:1127` hold; `FortressLibrary.fss:3627` holds and went with the cut count.
- 151: `SymbolicType.java:46-63`, `FTraitOrObject.java:76-80` and `FTypeTop.java:26` hold.

Every record path the new slice cites exists (`ls`).

## The ledger, the tests and the last landed gate

- No entry of the slice said that no ledger row holds a defect. New 130 now says so of `LinearCongruential`'s wrong numbers for a modulus that is not a power of two, after `ledger-find:LinearCongruential`, `ledger-find:Random.fss` (row 668 only, another defect) and `ledger-find:random* modul*`. In the ledger's history, `LinearCongruential` appears only as a site that relied on wrapping (rows 379, 403).
- Rows read for their status: the slice named as open rows that are fixed: 477 and 483 in old 136, and 517 in old 141. Row 649's refusal is gated by `AbstractOverrideUndefinedWalk`. Rows 663, 682 and 683 are `CONTESTED`; new 143 says so of 663, and new 146 already calls 682 and 683 unsettled.
- `XXX` tests, by their `.test` files, or by their source and header where a walk test has none. Refusals, green now: `XXXExportVarRungXFrozen`, `XXXNatAmbigChecker`, `XXXNatRangeChecker`, `XXXNatArithRangeChecker`, `XXXNatArithFormChecker`, `XXXNatOpenKeepChecker`, and walk's `XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk`, `XXXNatArithSumWalk` and `XXXRangeWideRungJ`. Expected failures of open rows: `XXXRoundNearTieNumeral` (360), `XXXEmptyGroupSumRungF` (436), `XXXRangeInRungJ` and `XXXRangeEqRungJ` (479, 481), `XXXSeqMidpointRungO` and `XXXSeqHashBoundsRungO` (453), `XXXGenericPositionalBox` and `XXXGenericPositionalFixed` (499), `XXXDispatchMethodArmRungG` (495), `XXXMaxNN32IntoZZ64RungM` (442), `XXXRR32EqualityRungV` (528), the walk departures of rows 486, 510, 511, 513, 522, 587, 589, 591, 592, 612, 616, 645, 646, 662 and 676, and the load checks' residues of rows 444, 611, 665, 666 and 693. `XXXCoercionStaticRungC` and `XXXCoercionStaticNarrowRungC` are expected failures of a decided departure, POSITIONS, "Walk chooses coercions on the value, for now". Pins of an open defect's present failure: `XXXFortToStringRungS` (321), `XXXShiftDeclRungI` (383), `XXXExtremumRungJ` (482) and `XXXNatOpenRun` (307), each a compile or run exception.
- Three tests that the old text named are gone. `XXXUnwrittenSumRungF.fss` was deleted in `369982d85`, and `UnwrittenReductionWalk.fss` gates its case. `XXXIntegerMaxNumRungM.fss` is `IntegerMaxNumMinNum.fss` since `9d2e4c856`. `XXXInferContravariantWalk.fss` is `InferContravariantWalk.fss` since `833420ce4`.
- The last landed gate: one sentence of the slice named it, old 143's, with batch 13's figures (compiler track 1,114, distance 105). At batch 13b's gate those are 1,118 and 85, with `testSystem` 580, the library track 86 and the count 1 unchanged (`compile-ladder/climb-batch-13b/gate/summary.txt`, `checker-count.txt`, `distance.txt`). The sentence is cut, not updated (point 5).

## Earlier slices' stale items in this slice

- Slice 1's base line 149, and slice 3's `FACTS.md:143`: the last landed gate in old 143. Settled by the cut.
- Slice 1's list of titles that no longer hold: its base line 137 is old 131. Settled by the move.
- Slice 2's new 122: the comment lines `.fss:681` and `.fsi:444`, corrected. The sentence on the specification's reading is replaced by what the specification and the checker say, and the question is left open (above).

## The size

| | Characters | Bytes | Entries |
|---|---|---|---|
| Before, lines 117 to 151 at `427b98c1b` | 44,496 | 44,544 | 35 |
| After, lines 117 to 148 | 43,637 | 43,667 | 32 |

Characters count each line with its newline. The whole of `FACTS.md` went from 269,075 bytes to 268,198.

## The script

`python3 explorations/coordinator/tools/check-verbatim.py 427b98c1b explorations/coordinator/FACTS.md explorations/coordinator/FACTS-history.md`, exit 0:

```
entries in explorations/coordinator/FACTS.md at 427b98c1b: 203 (269075 bytes); now 268198 bytes
  verbatim in the file now:        176
  verbatim in the history file:    27
  in both (should be 0):           0 []
  in neither (should be 0):        0
moved to history (old line numbers): 117 118 119 120 121 122 124 126 127 128 130 131 132 133 134 136 140 141 142 143 144 145 146 147 148 149 150
```

## Points for the checker

1. **The slice shrank by 2%.** As in slice 3, these entries were written in batches 9 to 13b and are mostly current. The cuts were measurement sentences, removed paths, stale open lists and accounts of change. Against them stand the additions the brief asks for: gating tests named, each test sorted by kind and set beside its row, and new 121's statement of the specification and the checker. Further cuts were possible: new 145's two-order example of row 444, new 137's list of inferred types, and new 146's line-by-line account of what the checker opens. I kept them, since each states how a path behaves.
2. **Two merges and one move.** Old 119 went into old 118: both state how a numeral's value reaches the compiled world, and 119 is its consequence for `NN64`. Old 127 went into old 133: both state which code wraps and with what, and 127's title was false. Old 131 moved whole, since new 130 and new 132 state all of it. Another option was to keep 119 as its own entry, retitled to row 326's fact.
3. **New 121 cites a process report from FACTS.** Its last sentence points to `coordinator/process-engineering/facts-slice-2.md`, point 1, for the open question. Another option was to say only "no decision of the curator settles it", or to point to BOOT. The sentences on the specification and the checker were read, not run; the checker's answer to the spelling itself is not measured.
4. **Claims that rest on a report, not on a run in this task.** New 117's "compiles and runs" rests on repair R1's probes (`REPORT.md`, "The recorded pass"), which left the tree. New 118's "walk refuses that coercion" rests on repair R2's skeptic capture, also gone. New 117's "No gated test runs a mutable variable of arrow type compiled" rests on a grep of `compiler_tests/`, `other_compiler_tests/` and `library_tests/`. The one hit, `compiler_tests/Compiled9.p.fss:19`, `var t_f : IntLiteral->Boolean`, is named only by `AfterTypeChecking.test`, which stops at the checker.
5. **The gate sentence in old 143 is cut, not updated.** Its subject was the gate, not sizes, and the count and the distance are stated by "The true distance to the switch-over ..." and "The checker-count stage's table". Another option was to keep it with batch 13b's figures, but it would go stale at the next landing. The suite counts at 13b are in the summary above.
6. **`LinearCongruential` has no ledger row.** New 130 says so, and I opened none, since this task writes only the record's text. Opening one is the coordinator's call.
7. **Two citations left as they were, though they are loose.** `BigNum.java:247` is one line of `shiftLeft` (`:240-254`), and `TypeWellFormedChecker.scala:43-84` starts at a blank line, with the checks at `:44-89`. Neither has drifted since it was written. "PLAN item 25" in new 140 is shorthand: PLAN names item 25 only in passing (`PLAN.md:71`, `:511`), and POSITIONS-history holds its definition.
8. **Old 136's open list.** Class RG and the split `::` bodies left it on two pieces of evidence: batch 13b's table has no class RG, and the per-site list has no error at a split `::`. I did not trace which batch cleared them. `opr ::(l:ZZ32,s:ZZ32)` now writes through `leftScalarRange` (`Library/FortressLibrary.fss:4086`).
9. **Titles kept that carry a frame.** New 132's "as the specification says" and new 130's "that meant to wrap" still hold as statements. `POSITIONS.md:73` cites both, so they stay.

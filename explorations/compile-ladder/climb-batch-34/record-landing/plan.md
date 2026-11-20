<!-- The record-landing workflow's evidence of PLAN.md at f7c6c2cae: its headings, the lines that the batch added (639eef180..285efad80) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

# PLAN.md

Print a section with `facts-extract.sh 'doc:explorations/coordinator/PLAN.md#HEADING'`, from the worktree.

## Its headings, with their lines

- 7: Where we stand (8 lines)
- 15: The principle for the batches (6 lines)
- 21: The phases (2 lines)
  - 23: Phase 1. Batch 5: what is decided and shares nothing (4 lines)
  - 27: Phase 2. Batch 6: the tower flips, the specification with it (4 lines)
  - 31: Phase 2b. The repair batch from the conformance reviews (4 lines)
  - 35: Phase 3. The checker at a true zero (6 lines)
  - 41: Phase 4. The switch-over (61 lines)
  - 102: Phase 5. microGPT compiles (20 lines)
  - 122: Phase 6. microGPT fast (13 lines)
- 135: Pavol's answers, in the order they are needed (93 lines)
- 228: Work that can start now, with no decision (23 lines)
- 251: Off the path, parked (45 lines)
  - 296: Phase 3's candidates at its end (23 lines)
  - 319: Climb batch N's first run, listed for his review (9 lines)
  - 328: Climb batch 6.5b, listed for his review (10 lines)
  - 338: Climb batch 7b, listed for his review (21 lines)
  - 359: Climb batch 8, listed for his review (17 lines)
  - 376: Climb batch 9, listed for his review (27 lines)
  - 403: Climb batch 10, listed for his review (16 lines)
  - 419: Climb batch 11, listed for his review (13 lines)
  - 432: Climb batch 12, listed for his review (15 lines)
  - 447: Climb batch 13, listed for his review (21 lines)
  - 468: Climb batch 14, listed for his review (16 lines)
  - 484: Climb batch 15, listed for his review (20 lines)
  - 504: Climb batch 15b, listed for his review (4 lines)
  - 508: Climb batch 16, listed for his review (10 lines)
  - 518: Climb batch 17, listed for his review (14 lines)
  - 532: Climb batch 18, listed for his review (15 lines)
  - 547: Climb batch 19, listed for his review (20 lines)
  - 567: Climb batch 20, listed for his review (16 lines)
  - 583: Climb batch 21, listed for his review (18 lines)
  - 601: Climb batch 21b, listed for his review (12 lines)
  - 613: Climb batch 22, listed for his review (13 lines)
  - 626: Climb batch 22c, listed for his review (22 lines)
  - 648: Climb batch 23, listed for his review (12 lines)
  - 660: Climb batch 24, listed for his review (16 lines)
  - 676: Climb batch 25, listed for his review (16 lines)
  - 692: Climb batch 26, listed for his review (17 lines)
  - 709: Climb batch 27, listed for his review (22 lines)
  - 731: Climb batch 28, listed for his review (24 lines)
  - 755: Climb batch 29, listed for his review (29 lines)
  - 784: Climb batch 29b, listed for his review (15 lines)
  - 799: Climb batch 30, listed for his review (14 lines)
  - 813: Climb batch 32, listed for his review (22 lines)
  - 835: Climb batch 31, listed for his review (30 lines)
  - 865: Climb batch 31b, listed for his review (16 lines)
  - 881: Climb batch 33, listed for his review (15 lines)
  - 896: Climb batch 33b, listed for his review (12 lines)
  - 908: Climb batch 34, listed for his review (12 lines)
  - 920: Not classified, to check (13 lines)
- 933: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 950: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 962: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, 639eef180..285efad80

- PLAN.md:56, under "The phases > Phase 4. The switch-over":

- **Climb batch 33b**, phase 4's fourteenth batch, landed 2026-11-18 at `ba3c7c876d`, run 2 of climb batch 33, rungs N, W, G and R on run 1's landed tree, with its forks at the planner's defaults on his go of about 17:13 UTC on 2026-11-17; its review is `reviews/batch-33b-review.md`. Its review changes the list for the batch after (Part 5): fork N4, with G's varargs indices (`CodeGen.java:8014`) and the numeral sites (`:4717`), joins item 1; row 1076, the one refused declaration, is item 2; varargs' and row 315's run tests, `XXXOneLibraryRunVarargs` and `XXXOneLibraryRunConditionalReduction`, with row 1086, are item 3; rows 1080, 1084 and 1088 and row 1085's build or refusal join item 5, row 1080 beside rows 1054 to 1056 and row 1088 beside row 818; and row 1087, the prelude's, goes with item 6.

- PLAN.md:901, under "Off the path, parked > Climb batch 33b, listed for his review":

- N.skeptic.1, N.judge.1 and N.judge.2 of climb batch 33b's rung N (row 1082): what does a built-in number type's name denote as a value, as in `x: Object = ZZ32`? `objects.tex` makes an object declaration without value parameters a singleton, which does not fit a type with many values; walk on the one library answers the type's zero ('ZZ32 0', 'RR64 0.0'); on the base the checker refused the name, 'Variable 'ZZ32' not found.'. The ways: (a) a static error on both paths, one rung, with row 1082 `CONTESTED` until then; (b) the type's zero on both paths, one rung; (c) the code generator's wall, 'Can't compile the number type ZZ32 as a value yet', until one is chosen. The one library's seven meet the same question when they take form 2 (fork N4). Default: (c), as landed, the judge upholding the skeptic's fix `eabbfc918b`, and row 1082 `NEGATIVE-VERIFIED` with its expected failure, a status the judge took. Evidence: `Specification/basic/objects.tex:212-217`; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7025-7029`; `ProjectFortress/compiler_tests/XXXNumberTypeAsValueCompiled.test:3`; `explorations/compile-ladder/rung-number-payload-objects/JUDGE.md`. Review-queue item 599.

- PLAN.md:903, under "Off the path, parked > Climb batch 33b, listed for his review":

- G.worker.1 of climb batch 33b's rung G, with fork N4, told: under the selection, each index of a varargs array is made as `FZZ32.make(j)`, the code generator's one conversion of a JVM int to a `ZZ32`, where `init`'s descriptor names `fortress/FortressLibrary$ZZ32`; the one library's numeral sites have the same mismatch today, passing `FZZ` values to `coerce_ZZ32?natural`. The review places the varargs indices and the numeral sites in the rung of fork N4, item 1 of the list for the batch after, since that rung's test needs `println`, whose varargs reach them: a step of the plan, not a question. Default: so, with fork N4's rung; row 1062 names the mismatch. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:8013-8015`, `:4672-4678`, `:4717`. Review-queue item 601.

- PLAN.md:905, under "Off the path, parked > Climb batch 33b, listed for his review":

- Rung R of climb batch 33b, its reserved points, each a change of which declaration a call or a dispatch method reaches, each landed at its default (as landed). R.reserved.1: a compiled call at a type assumption of an imported api's trait whose method has a body there, on an object that overrides it, ran the object's body on the base ('pd') and runs the trait's after ('sd'), as walk does and as `Specification/basic/expressions/type-annotation.tex:45-54` gives (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7214`, `:7255`; `ProjectFortress/compiler_tests/AsIfApiTraitOverrideCompiled.test:1`). The same change turns one form that compiled into a stop, told: a call at an assumption of an imported api's generic trait whose method's parameter has the trait's type parameter, the prelude's `Equality[\T\]` among them, ran the object's override on the base and now stops the code generator, 'Can't find the body that ... gives ...' (row 1088, with item 5 of the list for the batch after, beside row 818). R.reserved.2: at the prelude's `String`, `("ab" asif String) < ("cd" asif String)` printed true on the base, from `JavaString`'s body, and prints false after, from the prelude's placeholder body (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:393`; row 1089, which goes with the prelude). R.reserved.3: beside a local trait of the simple name of an imported api's trait, the compiled dispatch of the api trait's functional method `tag(O, L)` died on the base, 'StackOverflowError', and reaches the api trait's body after, as walk does (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:148-163`; `ProjectFortress/compiler_tests/ApiTraitShadowedNameCompiled.test:1`). Review-queue item 603.

- PLAN.md:908, under "Off the path, parked > Climb batch 34, listed for his review":

### Climb batch 34, listed for his review

- PLAN.md:910, under "Off the path, parked > Climb batch 34, listed for his review":

The items for him that climb batch 34, run 1 of `coordinator/CLIMB-BATCH-34.md` (rungs T, P, L, G and F, all five landed), left (`compile-ladder/climb-batch-34/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"), and the reserved points its rungs reached, each landed at its default. None holds a launch.

- PLAN.md:912, under "Off the path, parked > Climb batch 34, listed for his review":

- P.judge.1 of climb batch 34's rung P (row 818), told: a decision taken where nothing on record settles it. A call with a type assumption at some of its dispatched arguments whose own dispatch among some of the declarations would hold a functional method is refused with the base's message, 'Can't compile a dispatched call whose arguments are not all type assumptions', where the worker's code ran a declaration that the assumption excludes ('Leaf picks Leaf' against walk's 'Leaf picks Named'); the judge upheld the skeptic's refusal, by fork P2's default and the code generator's own refusal where the receiver dispatches too. The other way builds it, with an arm that calls the functional method's body past its receiver's dispatch (`OverloadSet.invokeParticularMethod`), a change to how every dispatch arm reaches an object's or a trait's method; the library writes no such call, and the refusal is wider than needed where an object declares the method once. Default: refused, as landed. Item 71 under "Pavol's answers" asks of row 818's partial form, which rung P now compiles for an overloaded function of the component, by fork P1. Evidence: `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7351-7352`; `ProjectFortress/compiler_tests/XXXAsIfPartialWithFunctionalMethodCompiled.test:1-3`; `explorations/compile-ladder/rung-partial-assumption/JUDGE.md`, "For the curator".

- PLAN.md:913, under "Off the path, parked > Climb batch 34, listed for his review":

- G.worker.1 of climb batch 34's rung G (row 1094): repair in a later rung the method form of the Return Type Rule's check below a self-typed trait? The check reads a dotted method's receiver from the index's self type, so an object's dotted method that redeclares a self-typed trait's method at the same parameter types with a narrower return type is refused, on the base and after the rung, where P-146 and P-157 keep the trait's plain type for the Return Type Rule; a getter so redeclared now compiles. The Effect of `Specification/appendices/changes.tex:4441-4455` names the row as its departure. Default: refused, as landed, with the expected failure; a program declares such a method at the trait's return type. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:214`, `:733-734`; `ProjectFortress/compiler_tests/XXXSelfTypedMethodNarrowedReturn.test:1-3`.

- PLAN.md:914, under "Off the path, parked > Climb batch 34, listed for his review":

- G.worker.3 of climb batch 34's rung G (row 1095): repair now `Random`'s proxy objects, whose getters answer `Maybe[\T\]` while they extend `RandomGen[\U\]`, and `Sparse`'s `indexValuePairs` at `Generator`, or leave them until a stage checks those components? They are outside the fourteen components that the stages check and compile in no test. Default: left, as landed, with the row. Evidence: `Library/Random.fss:155-184`; `Library/Sparse.fss:26`, `:124`, `:168`; `explorations/compile-ladder/rung-widening-getter/REPORT.md:101`.

- PLAN.md:915, under "Off the path, parked > Climb batch 34, listed for his review":

- G.worker.4 of climb batch 34's rung G (row 1096), told: the automatic permission check refused the run of the distance stage's driver from the base build over the library's 40 other components, so the three crashes of the overloading stage in `Format`, `Generator2` and `PureList` are not shown to be older than the rung; no frame of their traces is in the rung's change. If he wants it shown, that run needs his approval. Default: not run, the row `NEGATIVE-BOUNDED`. Evidence: `explorations/compile-ladder/rung-widening-getter/REPORT.md:101`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:129`, `:215`, `:416`.

- PLAN.md:916, under "Off the path, parked > Climb batch 34, listed for his review":

- Rung G of climb batch 34, its reserved point, landed at its default (as landed). G.reserved.1: twenty-one lines of the libraries changed beyond `NN32`'s two, eight of them in the bodies of six getters, so that thirteen more getter declarations, of nine getters (the four ranges' `indexValuePairs` declared in both `RangeInternals.fsi` and `RangeInternals.fss`), answer the type of the getter that each keeps from being inherited. Under walk two answers change: the index-value pairs of a range of rank 2 or 3 take a subscript, where the base stopped with 'Cannot find definition for method _[_]', and `ArrayList`'s `extractLeft` makes a `Just[\(E,List[\E\])\]`, as `List.fsi` declares, so a `typecase` on it answers otherwise; the other walk answers the skeptic compared are equal. Evidence: `Library/RangeInternals.fss:1400-1401`, `:1436-1437`, `:1658-1659`, `:1693-1694`; `Library/List.fss:264-280`; `ProjectFortress/tests/RangeBodiesWalk.fss:17-20`; `explorations/compile-ladder/rung-widening-getter/SKEPTIC.md:56`, `:59`.

- PLAN.md:917, under "Off the path, parked > Climb batch 34, listed for his review":

- gather.1 of climb batch 34's gather (row 818), told: item 71 under "Pavol's answers" asks whether the code generator should compile a call with an assumption at some of its dispatched arguments as the declaration that the checker resolves, with the default "refused, fork G2, as landed"; rung P now compiles such a call of an overloaded function of the component by fork P1, a dispatch on the other arguments' run-time types among the declarations that take the assumed types, with the batch's go, so item 71's default is no longer as landed. The item's text is left as it stands. Default: as landed, item 71 to be restated or closed by him. Evidence: `explorations/coordinator/PLAN.md:142`; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7326-7366`; `ProjectFortress/compiler_tests/AsIfPartialDispatchCompiled.test:1-4`.

- PLAN.md:918, under "Off the path, parked > Climb batch 34, listed for his review":

- gather.2 of climb batch 34's gather (row 1094), told: the gather changed one sentence of the specification that no rung edited: the Effect of the self-typed trait's entry in Appendix I, which said that the compiled checker keeps `T` in the signatures that the Return Type Rule reads, now names row 1094 as its departure, as rung G's report left to the gather. It states what the code does, so it is no text mismatch. Default: as landed. Evidence: `Specification/appendices/changes.tex:4452-4455`; `explorations/compile-ladder/rung-widening-getter/REPORT.md:128`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:214`, `:733-734`.


## The lines added after the landing, 285efad80..f7c6c2cae

None.

## The other lines that name a changed entry or row

- PLAN.md:9, under "Where we stand", 1641 characters, names F-352: no matrix, none of the library's own array algebra and no microGPT (F-352).
- PLAN.md:10, under "Where we stand", 5444 characters, names F-34, F-53, F-325, F-369 and row 1076: At the last landed gate, climb batch 33b's (`ba3c7c876d`, run 2 of climb batch 33, its gate on `f9acd7f6c2`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row (F-53; | and the compiled top-level tuple binding (F-369). | The code generator refuses 1 declaration of the fourteen components on climb batch 33b's landed code, `__bigOperator2` (row 1076), against 13 in 4 kinds on climb batch 33's run 1, measured on a patched scratch tree, since on the tree as it stands it stops three components whole at row 874 (F-34; | Since climb batch 27's rung G it compiles a type assumption at a receiver, at a call whose every dispatched argument is one, and as a value, and since climb batch 28's rung T an object whose first supertrait is an imported api's trait (row 733) (F-320, F-325, F-338).
- PLAN.md:12, under "Where we stand", 3449 characters, names F-352: The rehearsal of the switch-over met sixteen walls on the way to three small compiled programs against the one library (F-352;
- PLAN.md:13, under "Where we stand", 1757 characters, names F-34: F-34).
- PLAN.md:37, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:55, under "The phases > Phase 4. The switch-over", 826 characters, names row 1073: and rows 1071, 1072, 1073, 1074 and 1075 with item 5, the checker's other gaps.
- PLAN.md:64, under "The phases > Phase 4. The switch-over", 2226 characters, names F-352: the rehearsal carried it in `FJavaString` by a hack, and its class cannot be stubbed in Java under the component's name (F-352;
- PLAN.md:69, under "The phases > Phase 4. The switch-over", 2482 characters, names F-34 and row 1076: ...- The code generator over the one library (F-34): under the switch-over's setting it refuses 1 declaration of the fourteen components in 1 kind on climb batch 33b's landed code (`ba3c7c876d`), `FortressLibrary`'s `__bigOperator2` (row 1076), 753 emitted, ... | ... the one library (F-34): under the switch-over's setting it refuses 1 declaration of the fourteen components in 1 kind on climb batch 33b's landed code (`ba3c7c876d`), `FortressLibrary`'s `__bigOperator2` (row 1076), 753 emitted, with no component failure, against 13 in 4 kinds on climb batch 33's run 1 (`d3747846c1`) and 17 in 5 kinds on climb batch 31b's (`c3b16ef2d1`) (`compile-ladder/plan-33/probes/measure-ba3c7c...
- PLAN.md:71, under "The phases > Phase 4. The switch-over", 3141 characters, names F-352 and row 993: - What the rehearsal met and no other line of this phase holds (F-352; | `NN32`'s two getters (row 993); | The carriers come first in climb batch 33's list for the batch after, by rung N's machinery, and rows 874, 993 and 994 are that batch's (`coordinator/CLIMB-BATCH-33.md`, "For the batch after, in this order", 1 and 4).
- PLAN.md:73, under "The phases > Phase 4. The switch-over", 428 characters, names F-34: - Row 304, with the code generator's later rungs, beside F-34's kinds: since climb batch 26's rung L the code generator compiles a local function, but refuses three forms that the specification allows, a local function with static parameters of its own, two of one name in a block, and the `atomic` modifier, each with its `XXX` test (F-320).
- PLAN.md:142, under "Pavol's answers, in the order they are needed", 216 characters, names row 818: Should the code generator compile a call with an assumption at some of its dispatched arguments as the declaration that the checker resolves (row 818)? Default: refused, fork G2, as landed.
- PLAN.md:302, under "Off the path, parked > Phase 3's candidates at its end", 222 characters, names row 870: - Rows 868, 869 and 870, from climb batch 24's rung G's skeptic: walk's defects of `where` clauses that the compiled path reads, each row with its `XXX` test;
- PLAN.md:315, under "Off the path, parked > Phase 3's candidates at its end", 449 characters, names row 870: rows 774, 777, 470, 868 to 870 and 701;
- PLAN.md:455, under "Off the path, parked > Climb batch 13, listed for his review", 205 characters, names row 674: - Row 674: the api's advice for an `Indexed`'s range subscript reads `r` as positions for bounds above 0;
- PLAN.md:867, under "Off the path, parked > Climb batch 31b, listed for his review", 1234 characters, names row 1057: then, from its post-batch review (`reviews/batch-31b-review.md`, Part 4), the lines that the group lacked: rows 1054 to 1060, the record's forks of run 2, and the reserved points that rung O reached.
- PLAN.md:874, under "Off the path, parked > Climb batch 31b, listed for his review", 534 characters, names row 818: Default: with row 818, item 5 of climb batch 33's list for the batch after (`coordinator/CLIMB-BATCH-33.md`, "For the batch after, in this order");
- PLAN.md:875, under "Off the path, parked > Climb batch 31b, listed for his review", 354 characters, names row 1057: - Rows 1057 and 1058 of climb batch 31b, told: under walk two generic dotted methods of one name that differ in their number of parameters fail at a call, and a valid generic-beside-plain pair whose generic result is a tuple that holds the type parameter is refused at load.
- PLAN.md:898, under "Off the path, parked > Climb batch 33b, listed for his review", 817 characters, names row 1088: then, from its post-batch review (`reviews/batch-33b-review.md`, Part 4), the lines that the group lacked: the form that rung R turned into a stop (row 1088) and the record's forks of run 2.

## The lines that look stale at f7c6c2cae

From `plan-moves.py --stale-at f7c6c2cae`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:12, under "Where we stand": list: it names items in (a) among open ones: 371, 372, 512, 515, 577. The line: - **Probed, 2026-11-10 to 2026-11-13; nothing landed.** Eight probes and reviews ran outside any batch, each in scratch or by reading. The rehearsal of the swit
LOOK PLAN.md:71, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - What the rehearsal met and no other line of this phase holds (F-352; `compile-ladder/plan-31/probes/switch-rehearsal.md`, section 6). Walls that only the swit
LOOK PLAN.md:72, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 577. The line: - The merge of the five number types with their objects, before the switch-over, on both paths (P-178; row 1003): each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64
LOOK PLAN.md:94, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:249, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on

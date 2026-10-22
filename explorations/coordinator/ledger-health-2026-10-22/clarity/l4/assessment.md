<!-- The ledger clarity run's chunk l4 (rows 539, 546, 550, 555, 570, 571, 585, 589, 591, 638, 639, 653): each row judged by the record rubric's six checks at d4d454f9d, with its disposition and the evidence read. -->

# Chunk l4: assessment

Base: `d4d454f9d` (HEAD). Nothing was built or run; every finding below comes from reading the tree, the commits, the batch records and the record. Marks: P pass, F fail, U unresolved. Sc scope, Pr present meaning, Ev evidence, Co comprehension, Ow ownership, Cn consistency.

| Row | Sc | Pr | Ev | Co | Ow | Cn | Disposition |
|---|---|---|---|---|---|---|---|
| 539 | F | F | F | F | P | F | rewrite |
| 546 | P | F | P | F | P | P | rewrite |
| 550 | P | F | F | P | P | F | rewrite |
| 555 | F | F | U | P | F | F | investigate |
| 570 | P | F | F | P | P | F | rewrite |
| 571 | P | F | P | F | P | P | rewrite |
| 585 | P | F | F | F | P | F | rewrite |
| 589 | F | F | F | P | P | F | rewrite |
| 591 | P | P | F | P | P | P | rewrite |
| 638 | F | F | F | P | P | F | close |
| 639 | P | F | F | F | P | P | rewrite |
| 653 | F | F | P | P | F | F | rewrite |

Counts: keep 0, rewrite 10, close 1, investigate 1.

## Row 539

- Sc F: the claim quotes "gives 'at least one pair of parameters must have excluding types'" for the whole set. Walk reads two own generics on their declared domains (`genericPairValid`, `OverloadedFunction.java:894`). It refuses only `m[\P\]` beside `m[\Q\]`, and by `ruleFailure`'s MEET message, "fails the Meet Rule" (`:833-837`). The batch 17 and 18 refused notes say the same (`climb-batch-18/RECORD.md:147`, history marker text "only m[\P\] beside m[\Q\] is refused").
- Pr F: "rung W's lift reads only a generic beside a plain declaration", and the after-marker text "Climb batch 17 rung G: ...".
- Ev F: "Two generic declarations keep walk's parameter-by-parameter check (`OverloadedFunction.java:727`, at 052a7c3fe), which refuses at `:552`". At HEAD the pair is read again by `genericPairValid`, and `matchApart` has moved from `:1088` to `:1294`. The mechanism holds: `genericMeetCovered` (`:1154`) needs `matchApart` (`:1171`), which matches only equal types, a static parameter, or instances of one generic (`:1294-1313`). So `ArraySeq[\P\]` against `Seq[\Q\]` fails. `domainsExcludeTogether` (`:936`) finds no exclusion. That is the batch 19 refused note (`climb-batch-19/RECORD.md:127`).
- Co F: "rung W's lift" is undefined.
- Ow P.
- Cn F: siblings 159 and 373 are both FIXED, while FACTS F-257 groups this row with 550, 416 and 779 ("valid pairs that walk refuses"). F-252 states the mechanism ("both are instances of one generic type whose static arguments match in the same way (row 539)"). Appendix I names the row (`appendices/changes.tex:2873`). Row 537 holds the compiled half and `XXXOverloadExistentialMeet`.
- Signals: commit-says-fixed (`4c4b14c23`) is a false positive. That commit renamed the file and made this row's test an expected failure.
- Evidence read: `OverloadedFunction.java:520-600`, `:750-1000`, `:1135-1320`; `tests/XXXOverloadExistentialMeetWalk.fss`; `compiler_tests/XXXOverloadExistentialMeet.{fss,test}`; rows 159, 373, 416, 537, 550, 779, 787; F-174, F-252, F-257; P-45's line (POSITIONS:42); the refused notes of batches 18 and 19; PLAN review-queue item 77.

## Row 546

- Sc P: the guard at `OverloadingOracle.scala:190`, `if (hs.isEmpty || !ground(fa) || !ground(ga) || !hs.forall(ground)) return false`, is unchanged. The one change since 052a7c3fe is at `:326`. `XXXComprisesMeetGenericFunctions.test` asserts 'Invalid overloading of tag'.
- Pr F: "Rung C's coverage check", and "since climb batch 8's rung O is accepted compiled".
- Ev P.
- Co F: the claim names its example as "row 492's example made generic", and row 492 is FIXED (signal row-cites-closed). "Rung C" is undefined.
- Ow P.
- Cn P: F-76 ("Open: coverage refuses a pair when a declaration that it compares has static parameters (row 546)") and Appendix I (`changes.tex:3457`) agree. Row 566 holds the functional-method form.
- Evidence read: `OverloadingOracle.scala:170-200`, `git diff 052a7c3fe` of that file; `compiler_tests/XXXComprisesMeetGenericFunctions.{fss,test}`, `XXXComprisesMeetGenericTrait.{fss,test}`; rows 492, 543, 547, 566; F-76, FACTS:212; `reviews/comprises-type-level-proof-addendum.md` section heading.

## Row 550

- Sc P: the claim still holds by reading. `validOnDeclaredDomains` (`OverloadedFunction.java:790`) tests `p.getRange().subtypeOf(g.getRange())` with `T` symbolic, so `ZZ64` is not below `T`.
- Pr F: the notes quote "The refusal is 'with generic type, at least one pair of parameters must have excluding types'". The pair is now read on its declared domains, and the message is "fails the Return Type Rule" (batch 18 refused note, `climb-batch-18/RECORD.md:149`; `ruleFailure`, `:824-831`).
- Ev F: `validOnDeclaredDomains` is pinned at `:752`, and is `:767` (its test `:790`) now.
- Co P.
- Ow P.
- Cn F: sibling 552 is FIXED (signal siblings-closed). The open siblings that FACTS names together are 539 and 779 (F-257). PLAN keeps it as review-queue item 79, "default gated". The two-generic path reads every instance (`returnRuleAtEveryInstance`, `:1085`), and the generic-beside-plain path does not. The new notes say so.
- Evidence read: `OverloadedFunction.java:767-800`, `:803-840`, `:894-920`; `tests/XXXGenericBesidePlainReturnParam.fss`, `XXXGenericBesidePlainReturnRule.fss`, `GenericBesidePlainReturnRuleWalk.{fss,test}`; row 552; F-257.

## Row 555 (investigate; `questions.md`)

- Sc F: the claim, "fails when the parameter's bound mentions itself", rests on one program, `RpFJoin`. There `Apple` is below `Red extends Cmp[\Red\]` and `Round extends Cmp[\Round\]` (`plan-9/probes/P1.md:47`). Such an `Apple` extends two instances of `Cmp`, which the exclusion rule forbids (P-43). Walk loads it only because it applies no instantiation exclusion (row 416). Under the rule, an F-bound admits at most one common supertype of the arguments. So the claim generalizes from an ill-formed program.
- Pr F: "Fixed half (669b77d03, climb batch 9, rung W; ...)".
- Ev U: reproducer `none`. It was last measured in plan-9's P1 probe (batch 10), before batches 13 to 20 changed walk's inference (`git log -- EvaluatorBase.java`: `833420ce4`, `369982d85`, `20474c144`, `9879d4386`, `5262a2412`). Whether a well-formed program fails needs a run.
- Co P.
- Ow F: the notes carry the fixed half's story alongside the open half.
- Cn F: "The specification does not settle an F-bounded parameter (P1 unanswered)". P1 is answered for a parameter that nothing fixes (F-143, row 424 FIXED), and this row's parameter is fixed by its arguments. The batch 11 refused note (`climb-batch-11/RECORD.md:137`) says P1 does not reach it. P-46 settles applicability: "A generic declaration applies if some type within its bounds takes the arguments".
- Evidence read: `EvaluatorBase.java:350-402`, `:838-916`, `:1015-1055`; `compile-ladder/rung-walk-instance/REPORT.md` section 12; `plan-9/probes/P1.md:47`, `:76`; `reviews/p1-judgement.md` header; F-77, F-141, F-143; P-43, P-46, P-48; rows 416, 424, 589, 591.

## Row 570

- Sc P.
- Pr F: "Before `70d5486f9` the checker refused the pair at the top level by the function rule".
- Ev F: the loop is pinned at `OverloadingChecker.scala:331`, and is `:367-368` now (`typeConses`). The team's comment is pinned at `AbstractMethodChecker.scala:150`, `:160`, and is `:217` now. "walk prints `A` (row 544)" is false: walk refuses the pair at load, 'Invalid overloading of pick' (row 618 FIXED by `369982d85`; `tests/FunctionalMethodMeetObjectExpressionWalk.test`). The batch 11 refused note (`climb-batch-11/RECORD.md:139`) says so.
- Co P.
- Ow P.
- Cn F: sibling 618 is FIXED and row 544 is FIXED, but the notes give walk's old behaviour. F-80 ("Unchecked: a pair that only an object expression provides (row 570)") agrees with the claim.
- Evidence read: `OverloadingChecker.scala:60-118`, `:245-275`, `:360-380`; `AbstractMethodChecker.scala:52`, `:71`, `:213-251`; `compiler_tests/XXXFunctionalMethodMeetObjectExpression.{fss,test}`; rows 375, 544, 618; F-80.

## Row 571

- Sc P.
- Pr F: "Reachable since climb batch 8's rung O, whose rule accepts the program; the base's checker refused it. Beside rows 564 to 566, the other code-generation defects rung O's acceptance reaches."
- Ev P: `XXXFunctionalMethodMeetNarrowedSelfNotFirst.test` asserts `run_out_does_not_contain=REACHED`, and `FunctionalMethodMeetNarrowedSelfNotFirstLink.test` links it. The measurements are in `rung-overloading-checker/SKEPTIC.md` sections 2 and 3, and the cover route is item 7 of `rung-checker-overloading/SKEPTIC.md` section 2. The batch 11 refused note folds in.
- Co F: "rung O" is undefined.
- Ow P.
- Cn P: siblings 564, 565 and 566 are open.
- Evidence read: the test pair and its `.fss`; both skeptic files at the lines cited; rows 564, 565, 566, 617.

## Row 585

- Sc P: the four pairs stand (`FortressLibrary.fsi:2502-2503`, `:2509-2510`, `:2515-2516`, `:2521-2522`; component `:4411-4443`).
- Pr F: "Juxtaposition's became three top-level operators".
- Ev F: the api lines are pinned at `:2479-2498` and the component at `:4262-4294`, at 052a7c3fe; juxtaposition is pinned at `:4327-4329`, and is `:4476-4478` now. "FlatString's api adds `opr ||(a:FlatString, self)` (`FlatString.fsi:20`; row 726), omitting `DelegatedIndexed` (`.fss:34`): one distance export error" is false. `FlatString.fsi:16-21` declares `extends { String, DelegatedIndexed[\Char, ZZ32\] }` and no such `||` (F-259; batch 19 refused note, `climb-batch-19/RECORD.md:131`).
- Co F: "that device (PLAN item 38)": PLAN item 38 is the decision to check symbolic operators before the switch-over (P-155), not the juxtaposition device. "their 40 full-check errors" has no clear referent.
- Ow P.
- Cn F: F-245 now counts String's four families at 40 and says FlatString's pair is cleared. The row still counts FlatString's export error. F-81 agrees with the claim.
- Evidence read: `Library/FortressLibrary.fsi:2490-2525`, `.fss:4405-4480`; `Library/FlatString.fsi`; F-81, F-245, F-249, F-259; PLAN items 38 and the review line on `String`'s juxtaposition (`PLAN.md:292`, `:423`); rows 545, 584, 611, 726.

## Row 589

- Sc F: the claim's example `g[\T\](a: T, b: T)` beside `g(a: Any, b: Any)` is now refused at load: the two declared domains are equal (`6d187d069`, which also changed the test to `T extends Fruit`; after-marker text "Climb batch 17 rung G: refused at load; the test now bounds T by Fruit").
- Pr F: the after-marker story.
- Ev F: the pins are `OverloadedFunction.java:1556` and `:1671`, and are `:2309` (in `bestMatchInternal`) and `:2497` (in `instanceHolding`) now. The mechanism holds: both call the public `inferByUnification`, which passes `bounded = false` (`EvaluatorBase.java:838-841`).
- Co P.
- Ow P.
- Cn F: the notes say "the change is the curator's to decide", and F-141 says the same ("whose repair changes which declaration runs, the curator's to decide"). P-46 reads as settling applicability: "A generic declaration applies if some type within its bounds takes the arguments." `Fruit` takes `Apple` and `Cherry`, and the test asserts that the generic runs. The new notes give both, so the conflict is explicit. The coordinator may ask the curator whether P-46 settles F-141's open point.
- Signals: record-says-fixed (F-141) is a false positive. F-141 lists the row as a defect.
- Evidence read: `OverloadedFunction.java:2190-2330`, `:2480-2520`; `EvaluatorBase.java:830-900`; `tests/XXXDispatchTwoCommonParentsWalk.fss`, `InferTwoCommonParentsWalk.fss`; F-77, F-141; P-46, P-48.

## Row 591

- Sc P.
- Pr P.
- Ev F: the pins `EvaluatorBase.java:363-366`, `:173-174` and `:288` carry no commit and have moved. At `d4d454f9d` they are the catch that adds the parameter to the rechecks (`:907-916`), `instanceOf`'s skip (`:375`), and `boundAtInstances`' meet (`:497`). `FType.java:338-348` and `TypeLatticeOps.java:38-43` hold. `XXXInferSeveralBoundsWalk.fss` holds the claim's cases (`witnessRed`, `witnessRound`, `pick2`).
- Co P.
- Ow P.
- Cn P: F-141 and POSITIONS P-48's line ("walk's `Bottom` for row 591 kept without the curator's word") agree. Sibling 424 is FIXED and is dropped; 587, 612 and 616 are the open siblings of F-141's list.
- The batch 13 refused note concerns `d3d31b5b2`, which is not in HEAD's history (`git merge-base --is-ancestor` fails). It has no home in the row.
- Signals: record-says-fixed (F-141) is a false positive.
- Evidence read: `FType.java:336-350`; `TypeLatticeOps.java:30-46`; `EvaluatorBase.java:350-402`, `:478-500`, `:898-925`; the test; rows 424, 587, 612, 616.

## Row 638 (close; `closes.txt`)

- Sc F: "is left at five sites of the library and three revival tests". `b872d65a1` ("five throws get their argument ... (rows 633 and 638)") gave `ForbiddenException(CallerViolation)` to the five library sites and the two revival witnesses. The row's probe, `grep -rn 'throw ForbiddenException' --include=*.fss Library ProjectFortress/tests`, now finds bare throws only at the team's `tests/QuickCheckTest.fss:39` (unchanged since the team, by `git log --follow`; a witness in a typecase, never called) and the commented-out `ReflectTest.fss:143`.
- Pr F, Ev F: as above, the row's sites are pinned before the fix.
- Co P.
- Ow P.
- Cn F: row 633, fixed by the same commit, is FIXED. The batch 11 refused note (`climb-batch-11/RECORD.md:148`) says "Close with test `none`", and `ledger.py close` now takes `none` with `--note`.
- Evidence read: `git show b872d65a1` (the throws' diff); the grep; `Library/FortressLibrary.fsi:1141`; row 633.

## Row 639

- Sc P: `FileTests.java:382-385` holds the rule and its `QuickCheckTest` exemption; `fail` prints `FAIL: ` at `FortressLibrary.fss:55`.
- Pr F: "rung N's change of `assert` and `deny` on values that are not objects, ... before and ... after".
- Ev F: the reproducer cell names a report, `explorations/compile-ladder/rung-number-order-slips/REPORT.md`, which is not a test or a probe; the cell should be `none`. "the probe `SkAssert.fss` (not in git)" is a probe that never was in the tree (signal path-gone); the report names it `ProbeAssertAny` (section 7). The rule's lines are pinned at `:381-384`, and are `:382-385` now.
- Co F: "rung N" is undefined, and the after-marker text "Array2's offset too: Array2SubscriptInBounds holds in-bounds only" names no subject. It means that `oops`, the arrays' bounds check (`FortressLibrary.fss:1904`), calls `fail`, so no test holds an out-of-bounds message (row 679's `offset`).
- Ow P.
- Cn P.
- Evidence read: `FileTests.java:96-175`, `:370-392`, `:466-500`; `FortressLibrary.fss:53-56`, `:297-330`, `:1904-1907`; `rung-number-order-slips/REPORT.md` section 7; `tests/Array2SubscriptInBounds.fss`; commit `604d0e23c`; row 679.

## Row 653

- Sc F: the claim says "walk runs it and the compiled checker type checks it", under class `implementation gap (checker)`. Walk refuses such an `override` at load (`Constructor.java:699`, "has the modifier override and does not override any inherited declaration"; `tests/OverrideNothingWalk.fss`, `OverrideEqualTypesWalk.fss`, `OverrideNothingGenericWalk.fss`, `OverrideNothingGenericTraitWalk.fss`). The open walk cases are rows 665 and 693.
- Pr F: "Walk's half fixed 8803d2f45: refused at load ...".
- Ev P: the checker has no such refusal. No "does not override" message is under `scala_src/`, and the only read of `mods.isOverride` widens what a type inherits (`STypesUtil.scala:1701`). The traits chapter's sentence is `traits.tex:670-671`. Typecheck exit 0 was last measured on rung C's tree (`rung-checker-overloading/SKEPTIC.md` section 2, item 4).
- Co P.
- Ow F: the notes hold walk's repair and its test, which belong to the closed walk half.
- Cn F: revival-changes ("the checker accepts such an `override` (row 653)") agrees only with the checker half. The batch 12 and 13 refused notes (walk's reproducer, and `7ea90f57d`'s strict subtype) have their homes in tests `OverrideNothingWalk` and `OverrideEqualTypesWalk` and in row 665.
- Evidence read: `Constructor.java:699`; the grep of `scala_src/` for `isOverride` and "does not override"; `STypesUtil.scala:1680-1720`; `traits.tex:670-671`; the walk tests named; rows 610, 614, 650, 665, 693; `climb-batch-12/RECORD.md:164`, `climb-batch-13/RECORD.md:185`.

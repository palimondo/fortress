<!-- The ledger clarity run's chunk l4: the checker's verdict on each rewritten row, the close and the investigate question, against the tree at e30e72115 (the writer's base d4d454f9d plus record-only commits). -->

# Chunk l4: check

Tree: `e30e72115` (HEAD). `git diff --stat d4d454f9d HEAD` touches only `explorations/coordinator/BOOT.md` and `explorations/coordinator/evidence/positions-followup/`, so every pin "at d4d454f9d" holds at HEAD. Nothing was built or run.

Form: `ledger.py check --rows rows.rewrite` passes all ten lines. On scratch copies of the ledger and its history (`--ledger`, `--history`), the ten `ledger.py rewrite` calls apply and `ledger.py check` reports 793 rows, 0 failing; the close of row 638 applies as `closes.txt` writes it. Row 539 is exactly 1,200 characters.

Verdicts: pass 9 (539, 546, 550, 570, 571, 585, 589, 638 close, 639); fail 3 (555 question, 591, 653).

## Row 539: pass

- `matchApart` is `OverloadedFunction.java:1294`, called from `genericMeetCovered` at `:1171`; it matches equal types, a static parameter, or instances of one generic type (`:1295-1311`), and reads no supertype. `domainsExcludeTogether` is `:936`. Pair (1,2) reaches `genericPairValid`'s Meet branch (`:912-913`), and `ruleFailure`'s MEET text is "fails the Meet Rule" (`:833-837`); the batch 18 refused note says the same (`climb-batch-18/RECORD.md:147`). Pairs (1,3) and (2,3) are nested and read by the Return Type branch, so "the other two pairs load" holds by reading; F-252 states the reading, the old line's after-marker text states the result.
- Appendix I: `changes.tex:2873` ("refuses that example (row~539)") lies in "Overloading with static parameters" (`:2715`). Row 537 holds the compiled run's death and `XXXOverloadExistentialMeet`. Siblings 416, 550, 779 match F-257.
- Present, reproducer (`tests/XXXOverloadExistentialMeetWalk.fss`, the three declarations as claimed), form: pass. The paper's page (p. 11:13) is left to the history.

## Row 546: pass

- `coversOverlap` is `OverloadingOracle.scala:188`; the guard returning false for any declaration with static parameters is `:190`, and its comment (`:177`) states that scope. The proof addendum's "Source and scope" excludes quantified generic overloads.
- `XXXComprisesMeetGenericFunctions.test` asserts `compile_err_contains=Invalid overloading of tag`; its program is the spec's S/T/U/V/W example (`advanced/overloading.tex:346-370`) made generic. `ComprisesMeetCompiled.test` compiles, links and runs PASS. Row 566 holds the functional-method form and `XXXComprisesMeetGenericTrait`. Appendix I `changes.tex:3457` lies in "The Meet Rule for traits with comprises clauses" (`:3383`).

## Row 550: pass

- `validOnDeclaredDomains` starts `OverloadedFunction.java:767`; `:790` is `if (plainInside) return p.getRange().subtypeOf(g.getRange()) ? VALID : returnTypeRule(...)`, so `ZZ64` against the symbolic `T` gives the Return Type refusal, "fails the Return Type Rule" (`:824-831`; batch 18 refused note, `climb-batch-18/RECORD.md:149`). `returnRuleAtEveryInstance` is `:1085`.
- `tests/XXXGenericBesidePlainReturnParam.fss` holds the claim's pair; `tests/XXXGenericBesidePlainReturnRule.fss` holds the invalid `ident` pair ("Must be refused at load").

## Row 555 (investigate): fail, in the question

The disposition and the question hold: `plan-9/probes/P1.md:47` gives `RpFJoin` with `Round extends Cmp[\Round\]`, so `Apple` is below `Cmp[\Red\]` and `Cmp[\Round\]`; P-43 and F-44 keep the exclusion rule, and revival-changes ("Walk applies no instantiation exclusion (row 416). So it runs such a type") makes row 416 the record's home for walk loading it; `climb-batch-11/RECORD.md:137` says P1 does not reach a parameter the arguments fix. `L4FJoinOneBound` is well formed and its only bound-meeting candidate is `Red`.

- Failure: the branch "If `L4FJoinOneBound` prints `fF`" says "`ledger.py duplicate 555 --of 416 --add` and a note ...". Row 416 is 1,179 characters with 697 of 700 in its notes (`ledger.py show 416`). Run on a scratch copy, `duplicate 555 --of 416 --add "<the note>"` is refused: "row-length: 1315 characters; at most 1200 / notes-length: 831 characters; at most 700". Correction: in that branch, first `ledger.py rewrite 416` with the note folded into its notes within the limits, then `ledger.py duplicate 555 --of 416` without `--add`.

## Row 570: pass

- `typeConses` loop: `OverloadingChecker.scala:367-368`. The team's comment "the eventual plan is to lift all object expressions to become top-level objects": `AbstractMethodChecker.scala:217`.
- `XXXFunctionalMethodMeetObjectExpression.test` asserts `compile_exception_contains=emitDesc of type AND(A,B) failed`, which also shows the checker passed it. `tests/FunctionalMethodMeetObjectExpressionWalk.test` asserts `load_exception_contains=Invalid overloading of pick` on the same program. Rows 618 and 544 are FIXED and left out; 375 is the open sibling.

## Row 571: pass

- `XXXFunctionalMethodMeetNarrowedSelfNotFirst.test` asserts `run_out_does_not_contain=REACHED`; `FunctionalMethodMeetNarrowedSelfNotFirstLink.test` runs `link` on it. `rung-overloading-checker/SKEPTIC.md:76`, `:80`, `:96`, `:116` give `SkSelfMid` "pick?1", `SkNarrowLast` "pick?2", walk `C`, `A`; `:79` the forms that run. `rung-checker-overloading/SKEPTIC.md` section 2, item 7 (`:72-77`) gives "mark?1". Siblings 564, 565, 566 are open.

## Row 585: pass

- `grep -n 'opr.*(a:Any, self)' Library/FortressLibrary.fsi` prints `2502`, `2510`, `2516`, `2522`; String's four families run `.fsi:2496-2522`, `.fss:4411-4443`; juxtaposition's three top-level operators are `.fss:4476-4478`.
- `rung-library-meets/REPORT.md` section 7 (`:131`): JuxtProbe gives "Invalid overloading of juxtaposition", of `DOT`, of `foo`, "and nothing for `||`". F-245 counts String's four families at 40; `perf-probes/symbolic-operators-2/REPORT.md:79` shows the three-top-level-operators way clearing them (40, 40). F-249 and row 545 support the last clause. The FlatString export error, now false (F-259; `FlatString.fsi:16-21`), is dropped.

## Row 589: pass

- `bestMatchInternal` starts `OverloadedFunction.java:2289`, its unification is `:2309`; `instanceHolding` starts `:2492`, its unification `:2497`; both call the public `inferByUnification`, which passes `bounded = false` (`EvaluatorBase.java:838-841`). Without `bounded`, `BoundingIntervals.joinPut` leaves the join of several minimal common supertypes to the lattice (`EvaluatorBase.java:124-151`). `declaredBelow` (`:2515`) calls `instanceHolding` (`:2518`), so the repair reaches the load check as said.
- `tests/XXXDispatchTwoCommonParentsWalk.fss` is the claim's program (`T extends Fruit`, `Red` and `Round` below `Fruit`); `InferTwoCommonParentsWalk.fss` asserts `either(Apple, Cherry)` gives "generic" beside the `ZZ32` declaration. P-46 ("A generic declaration applies if some type within its bounds takes the arguments") and F-141 ("the curator's to decide") are both stated.

## Row 591: fail

Pins hold: `FType.java:338-348` (meet empty for unrelated types), `TypeLatticeOps.java:38-43` (`bug` at `:42`), `EvaluatorBase.java:907-916` (catch, `rechecks.add` at `:914`), `:375` (`instanceOf`'s skip), `:497` (`boundAtInstances`' meet). The test holds `witnessRed`, `witnessRound` and `pick2`.

- Failure (a true case of the open defect lost from the row): the old notes' "`co2B[\T extends { Red, Round }\](g: T -> ZZ32)` given a function of a `Red` stays at `BottomType` too" is dropped, and the new claim ("where nothing at a call fixes it") no longer covers it: `co2B`'s parameter is fixable, bounded by its argument only from above (`EvaluatorBase.java:351-358`, `:369-375`; the `rechecks` pass skips a fixed parameter, `:393-397`). Its only home would be the history. Appendix I says walk still instantiates at `BottomType` a from-above parameter "declared with several bounds that it cannot meet" (`changes.tex:2028-2033`), `rung-walk-meet/REPORT.md:144` and `:240` route `co2B` to this row ("note on row 591"), and its skeptic notes the test holds no function-argument form (`rung-walk-meet/SKEPTIC.md:164`). Correction: widen the claim to "where nothing at a call fixes it or an argument bounds it only from above" and restore `co2B` in the notes. A line that passes `ledger.py check --rows` (1,196 characters, claim 298, notes 689):

  `| 591 | under walk, a type parameter declared with two bounds neither of which is a subtype of the other is instantiated at `BottomType` where nothing at a call fixes it or an argument bounds it only from above, and as a lone parameter its call fails over arguments with no narrowest named common supertype | NEGATIVE-VERIFIED | implementation gap (walk) | `basic/inference.tex`, "The Static Arguments of a Call" | `ProjectFortress/tests/XXXInferSeveralBoundsWalk.fss` | climb batch 9 rung W, its skeptic | siblings: 555, 587, 612, 616. `co2B[\T extends { Red, Round }\](g: T -> ZZ32)` given a function of a `Red` stays at `BottomType`, as the test's `witnessRed` does; `pick2[\T extends { Red, Round }\](Apple, Cherry)` stops, 'Cannot unify Red ... with Round'. `FType.meet` of such bounds is empty (`FType.java:338-348`), so `TypeLatticeOps.meet` calls `bug` (`TypeLatticeOps.java:38-43`); the catch files it among the `rechecks` (`EvaluatorBase.java:907-916`), `instanceOf` skips it (`:375`), `boundAtInstances` fails the same meet (`:497`), at d4d454f9d. With a narrowest named common supertype below both bounds the lone call runs at it; P-48: the intersection. full text: history, row 591 |`

## Row 638 (close): pass

- `b872d65a1` is an ancestor of HEAD (`git merge-base --is-ancestor`). Its diff gives `ForbiddenException(CallerViolation)` to `QuickCheck.fss` (two), `Reflect.fss` (two), `ReflectiveQuickCheck.fss` (one), `InferUnfixedBoundWalk.fss:8` and `XXXInferSeveralBoundsWalk.fss:10`. The row's probe, `grep -rn 'throw ForbiddenException' --include=*.fss Library ProjectFortress/tests`, now finds the bare form only at `tests/QuickCheckTest.fss:39` (`git blame`: David Chase, 2012, inside a `typecase` on a function value, not called) and the commented-out `ReflectTest.fss:143`.
- Test `none` with `--note` is what `ledger.py close` requires when no test asserts it; no gated program reaches the throws, as the batch 11 refused note says (`climb-batch-11/RECORD.md:148`). The command in `closes.txt` applies on a scratch copy.

## Row 639: pass

- The rule: `FileTests.java:382-385` (`anyFails = ! f.contains("QuickCheckTest") && (... "fail" ... "FAIL" ... rc != 0)`). `fail` prints "FAIL: " at `FortressLibrary.fss:55`; `assert` (`:297`, `:302`, `:307`) and `deny` (`:321`, `:323`, `:325`) reach it, and `oops` (`:1904`) does. The probe output 'FAIL: (1,2) =/= (1,3); m' is `rung-number-order-slips/REPORT.md:148`, section 7; the probe file (`ProbeAssertAny`, and the old `SkAssert`) is in neither the tree nor git, so reproducer `none` with the call and its output in the notes fits the template. `tests/Array2SubscriptInBounds.fss` holds in-bounds subscripts only.

## Row 653: fail

Holds: `traits.tex:670-671` (section "Method Declarations", `:413`); walk's refusal `Constructor.java:699`, gated by `tests/OverrideNothingWalk.test` (`load_exception_contains=does not override any inherited declaration`, the claim's program); rows 650, 665, 693 as said; `rung-checker-overloading/SKEPTIC.md` section 2, item 4 (`typecheck` exit 0). No refusal of an `override` exists on the compiled path: `isOverride` is read only at `STypesUtil.scala:1701` (grep of `ProjectFortress/src` outside `interpreter/`).

- Failure (mechanism stated backwards): "The checker reads `override` only to widen what a type inherits (`...STypesUtil.scala:1701`, ...)". At `:1701`, inside `providedAndOverridden` (`:1683`), an own declaration with `override` whose parameter types are above an inherited one's makes `excludes` answer `Some(false)`, and `providedBy` then filters that inherited declaration out (`:1719-1723`, `by.isEmpty`): the doc comment says o "keeps that type from inheriting a declaration p" (`:1679-1681`), and the comment at `:1694` says the same. So the read narrows what a type inherits. Correction: "The checker reads `override` only to let a wider declaration hide an inherited one (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1701`, at d4d454f9d), and refuses none." With that sentence the line passes `ledger.py check --rows` (1,152 characters, notes 698).

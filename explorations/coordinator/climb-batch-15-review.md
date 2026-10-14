<!-- The top-tier review of climb batch 15's draft record (`coordinator/CLIMB-BATCH-15.md` at `94b5aaf83`, with its manifest generator `compile-ladder/plan-15/manifest/`: `lists15.py`, `gen15.py`, `check15.js`), made in place on 2026-10-14 on the curator's standing pre-approval of such reviews (the `coordinator` skill's `references/batch.md`, "The go"), against `main` at `287bb24e2`, whose one commit since the draft touches only `BOOT.md`; `Library/`, `ProjectFortress/`, `Specification/`, `Documentation/`, `build.xml` and `bin/` are byte for byte those of `7c2c7cd4b`, climb batch 14's gate commit, and of the two probes' bases `11bea64a0` and `873d65f0c` (`git diff --stat <commit> HEAD` over those paths is empty for each), so batch 14's landed tables and per-site list (54 rows) describe the base. The record's one question, Q1, was settled by the coordinator before this review (its brief): the walk rung's collector helpers are implementation hooks, not an extension of the library's api; the record now carries it as the coordinator's call 5. Nothing built or run but the generator's own checks (`lists15.py`, `gen15.py` and `check15.js`, writing to the session's scratchpad only), `coordinator/tools/workflow-scenarios.js` on the spliced scratch copy, and `git apply --check` and `git apply` of the five probe patches in a scratch copy of their eleven files. Every other check is a read of the tree, a `git` or `grep` over it, this review's scratch script for functional methods at two `self` positions, the extract tool on POSITIONS and FACTS by number, `ledger.py heads` and `show` on each row the record names, the landed tables under `compile-ladder/climb-batch-14/gate/`, and the per-site list `compile-ladder/gate/distance-sites.tsv` grouped by file, line and message. One reason per change, each with its evidence; then what was checked and found right, what was weighed and left as drafted, and what reaches a decision of the curator. Written for the coordinating session first, then the curator (on a phone; short sentences, lists), then the batch's workers. -->

# Climb batch 15: the review's reasons

The record's header names this note; the coordinator diffs the record and the generator against `94b5aaf83` and folds what it accepts. Section and call numbers are the record's as amended. The generator's checks pass on the reviewed record:

- `lists15.py`: `bad lists 0`; B 45 keys and 11 checks, C 34 and 9, L 21 and 8, O 26 and 11.
- `gen15.py`: the block, 377 lines by its count.
- `check15.js` on the scratch splice: 0 problems; rungs B, C, L, O; scatter B C O L.
- `workflow-scenarios.js` on the spliced copy: 49 scenarios ok, 0 problems.

The same four ran on the draft first, with the same verdicts (L 18 keys and 7 checks, O 25 and 10; 373 lines). The tracked script still carries batch 14's block, which the coordinator's step 4 replaces (`check15.js --write`).

## 1. Changes made, one reason each

1. **Header.** The review sentence, in the form batch 14's record carries (`coordinator/CLIMB-BATCH-14.md:1`): what reviewed the draft, against which `main`, what landed since (`git log 94b5aaf83..HEAD`: `287bb24e2`, `BOOT.md` only), and Q1's settlement.

2. **Q1 written as the coordinator's call 5.** The brief records the coordinator's settlement: the collector helpers sit beside `__bigOperator` and the other double-underscore functions the implementation calls by name, and they are not an extension of the library's api, so the rule that reserves extensions to the curator (`process-engineering/library-extension-rule-archaeology.md` §5, point 4) does not reach them.
   - The tree agrees with "not the api": the patch adds the ten declarations to `Library/FortressLibrary.fss` only (`perf-probes/walk-plain-bound/patches/wayDE-elements-expected-body.patch`, its first hunk), while the api declares the hooks `__generate`, `__bigOperator` and `__cond` (`Library/FortressLibrary.fsi:845`, `:851`, `:895`).
   - The record's default is kept: as the probe built them, each typed so that the checker accepts it.
   - Places: section 2's opening; the Q1 subsection becomes call 5 among the probe calls; batch 14's calls are renumbered 6 to 9; B's answers line and its library-additions bullet; the routing line after the landing ("calls 1 to 5"). Nothing in the generator named Q1.

3. **Call 1 names the clause of P-48 it reads past, and P-59's scope.** The draft said that no call bends a decision and that "P-59 accepts walk's value-based stand-in".
   - P-48 ends "never the arguments' union or the value's type alone". Way 6 instantiates at the join of the elements' run-time types. The walk probe named this as "Its one reading to confirm" (`perf-probes/walk-plain-bound/REPORT.md` section 1, and question 1 in section 9).
   - P-59 is "Walk chooses coercions on the value until the switch-over" (item 16), not static arguments.
   - So call 1 and B's answers line now say how the call reads each, and section 2's line says that call 1 reads past the letter of P-48. The P-59 reason line in `lists15.py` says the same. The call itself is unchanged. "For Pavol" lists it.

4. **Rung O: the library does declare one pair at two `self` positions.** The draft said "By reading no library trait declares such a pair".
   - This review's scratch script over `Library/` and `ProjectFortress/LibraryBuiltin/` finds `object FlatString`'s `opr ||(self, b:FlatString)` and `opr ||(a:FlatString, self)` (`Library/FlatString.fsi:17`, `:20`). Both domains are `(FlatString, FlatString)`, which is row 707's plain shape. The second line is row 585's api line, which the component lacks (PLAN item 38).
   - The script also finds `String`'s `||`, `|||`, `//` and `///`, which pair `(self, b:Any)` with `(a:Any, self)` (`FortressLibrary.fsi:2488-2514`). These are not equivalent. Its other hits are calls in bodies.
   - The checker never reaches FlatString's pair. `isDeclaredName` admits an operator only by `validOp` (`OverloadingChecker.scala:720-724`), and `validOp` refuses a two-character name of one repeated character (`nodes_util/NodeUtil.java:1475`). That is row 584.
   - So the draft's conclusion, no site, stands, but for another reason. O must also not widen the check. An error in any api stops the type-check phase before it checks a component (`compiler/phases/TypeCheckPhase.java:45-46`), so a refused FlatString api would replace the count's total with that api's error.
   - The test folders hold one more pair, `rat`'s `OTIMES` in `tests/fmTest2.fss` and `fmTest3.fss`, `(rat, ZZ32)` beside `(ZZ32, rat)`. It is not equivalent, and these are walk tests. The compiled folders hold only row 707's own test.
   - Places: O's Rows, Distance sites and notes (row 584). O's briefing and checks gain `ledger:584`.

5. **Rung L's box revision is recorded in its Appendix I entry, beside O's Effect.** The draft gave L `future.tex` alone ("L edits future.tex only").
   - The S1 form records each change in its entry (P-96; the skill's `references/specification.md`, "Changing the text").
   - The box on Jan's example has its revisions recorded in the Change of "Overloading with static parameters": "the box on Jan's example in the internal document gives that rule as its reason" (`Specification/appendices/changes.tex:2398-2401`, written by climb batch 14's rung P, `3ba2d005f`, when it corrected the same box). The entry's Original text keeps the box's earlier reason (`:2559-2561`).
   - So L amends that Change and that Original text, and O amends the same entry's Effect (`:2497-2502`). These are different paragraphs, 100 lines apart, and no declaration. Batch 14's review counted Appendix I entries as the unit; here one entry is shared.
   - Places: L's Specification and Files; the overlaps of B, L and O; "how they meet"; the intro. L's briefing gains the entry.

6. **Rung L: the specification speaks to a repeated key in a map comprehension.** The draft said "The specification is silent on IntMap".
   - That is true of `IntMap` itself. But `Specification/basic/expressions/comprehensions.tex:76-80` says that a map comprehension whose key repeats with a different value throws `KeyOverlap`.
   - The library's `Map` comprehension throws on any repeated key ("Complain about duplicates", `Library/Map.fss:161-168`). `addNew` throws whenever the key is already mapped (`Library/IntMap.fss:300-301`, `:488-490`).
   - So the repeated-key throw that row 704's repair brings to `IntMap` comprehensions is the specification's answer for a different value, and the library's own `Map` precedent for an equal one. It stays a point to report.
   - Places: L's answers line, Rows and Specification, with this evidence. L's tests gain an `IntMap` comprehension whose key repeats with a different value, asserted to throw. L's briefing gains the comprehensions section (in its checks too) and `Map`'s `fromCopiedArray` body.

7. **Rung B: each entry's Change and way back go stale too.** The draft listed the Effects and D2's paragraph only.
   - Both entries record each revision of their box in the Change: "Reductions whose element type nothing fixes" at `changes.tex:1024-1031`, and "The inference of a call's static arguments" at `:1785-1795`.
   - The first entry's way back says that reversing the revision of 9 October "returns such a parameter to BottomType" (`:1048-1052`), which B's change makes incomplete.
   - Places: B's Specification and Files.

8. **Rung B: the patch clears its two hints, where it should restore them.** In `Evaluator.bigOperatorByElements`, the `finally` calls `elementTypeHint.remove()` and `expectedTypeHint.remove()`. The patch's `expectedFor` instead restores the value it found (`BuildLetEnvironments`, `FunctionClosure`). So a clause form evaluated inside another's big operator clears the enclosing one's hint. One sentence in B's hint bullet.

9. **Rung B: the collector's hardest declaration to type is named.**
   - `__ElemsReduction.join(a: __ElemsAny, b: __ElemsAny)` calls `__elemsJoin(a, b)`, whose parameters are `__Elems[\A\]` and `__Elems[\B\]` (the patch).
   - A `typecase` clause names types and binds no type parameter (`Specification/basic/expressions/typecase.tex:66-69`). So no typecase can recover an operand's element type, and the join reaches it only through a method of `__Elems[\T\]`.
   - One sentence in B's library-additions bullet. The design stays B's.

10. **Line numbers.**
    - `trait BigOperator` is at `Library/FortressLibrary.fsi:1943-1947` (getters `:1944-1946`), and `ActualReduction`'s `lift` at `:1880`. The draft had `:1940-1944`, 13b's lines; batch 14 added three api lines above (`git diff --stat d96bc7776 7c2c7cd4b -- Library/FortressLibrary.fsi`: 3 insertions).
    - `Array3`'s two run-time-size calls are the `__subarray` calls at `:2954-2955` and `:2964-2966`. The draft had `:2955`, `:2966`, from the row's note.

## 2. Checked and found right

- **The base.** `git diff --stat` over the six paths is empty from `7c2c7cd4b`, `06448ebf2`, `11bea64a0` and `873d65f0c` to `287bb24e2`.

- **The landed tables.**
  - `distance.txt`: `#total 54`.
    - Kinds: return-type 2, wellformed 8, typecheck 41, export 3.
    - Units: FlatString 1, FortressLibrary 48, List 5.
    - Two crash rows: `FnDecl :1312-1316` ('Missing parameter type for i' at `:1314:10`) and `TraitDecl :2886-2999` (`TryChecker` at `:2922.13`).
    - `#seconds 1714`, FortressLibrary 954.
  - `checker-count.txt`: every api 0, `#total 1`, `#locations 1`, `#crash none`, `#shadow` matching.
  - `summary.txt`:
    - compiler 1,173, library 86, othercompiler 263, `specdata` 130;
    - system 153, 151, 148 and 152 (604), testSystem 4 min 6 s;
    - 42 atomic lines.

- **The 54 by row,** from the per-site list grouped by line and message:
  - **The arrays, 26:**
    - row 685, `:2464` and `:2837`, two each;
    - row 686, `:2493`;
    - 14 bodies typed by their parent trait: `:2405`, `:2407`, `:2408`, `:2409`, `:2411`, `:2466`, `:2468`, `:2709`, `:2711`, `:2712`, `:2713`, `:2773`, `:2778`, `:2840`;
    - 3 branches: `:2430`, `:2441`, `:2816`;
    - 2 export errors at `:12`;
    - row 678, `:2567` and `:2571`.
  - **The other items, 12:**
    - the power: `:642` three times, `:643`, `:4407`, `:4423`;
    - row 585: `FlatString.fss:12`, `:4260`, `:4261`;
    - row 634, `:1942`; row 632, `:1342`; row 631, `:3578`.
  - **The `where` clauses, 12:**
    - row 433: `:3268`, `:3274`, `:3284`, `:3286` and the two `distribute` return-type errors;
    - row 636: `List.fss:88`, `:89`, `:90`, `:179`;
    - row 436: `:3230`, `:3247`.
  - **Row 425, 3:** `:4235`, `:4241`, `List.fss:146`.
  - **Row 488, 1:** `:130`.
  - They sum to 54. Less C's 1 and L's 4, 49 remain: 21, 12, 12, 3 and 1, as the record says.

- **The count's rise to about 39, by reading.**
  - `StaticChecker.checkCompilationUnit` returns after the second well-formedness pass when there are errors (`compiler/StaticChecker.java:268-272`). That is before the overloading check (`:275`) and the export check (`:283`). So the component's count holds its 36 typecheck and 8 wellformed errors, and not its 2 return-type or 2 export errors.
  - An error both passes report, such as `:3284` and `:3286`, counts once, since `MultipleStaticError` keeps one error per message (`exceptions/MultipleStaticError.java:31-39`).
  - So the count is 44, less C's 1 and L's 4: 39. F-53 calls this rise no regression, and P-39 says the count is never red.

- **The count stage and its limit.**
  - `run.sh` runs the checker under `timeout -k 10 900` and exits with no table when no total prints (`tools/checker-count/run.sh:69-75`). `checker_compare` is red on "NO TOTAL" (`climb-batch-workflow.js:1408`). `#crash` reads only the overloading checker's crashes (`run.sh:88-92`).
  - The count stage's shadow is `StaticChecker.java` alone. The distance stage's shadows are `StaticChecker`, `TypeCheckPhase`, `DesugarPhase`, `CodeGenerationPhase`, `CodeGen`, `Desugarer` and `NodeComparator` (`tools/distance/run.sh:98-108`). No rung edits any of them.
  - The gate's run over the merged tree should be about C's second run, plus B's collector and L's 16 lines:
    - O's coverage split runs only where an abstract method is not below the union of its covers, which no library object meets (the distance's abstract-method kind is 0);
    - O's duplicate test adds no comparison, since `oracle.equiv` is already evaluated before the self-position test (`OverloadingChecker.scala:441`);
    - C's union cases are in C's own runs.
  - Batch 14's figures: 303 s on L's tree, and under 5 minutes in the gate (`reviews/batch-14-review.md:38`); the component to the old `:1311` took 108 s of 371 s (`perf-probes/checker-speed/REPORT.md` section 7). The probe's 2,185 s against the gate's 1,714 s is the record's 27 %.

- **The patches, in a scratch copy of their eleven files at `HEAD`.**
  - `git apply --check` accepts each alone. All five apply in order with every hunk clean: the normal form, the sibling, row 680, row 685, then the walk patch.
  - Their sizes are 24, 25, 16, 46 and 392 lines, over the files the record lists.
  - The walk patch's library hunk ends at `__replayOf` before `__bigOperator2`'s comment. The factories patch touches `:2448-2457` and `:2820-2829` only. So B and L share no hunk.

- **The planner's risks.**
  - *The thread-local hints.* `expectedFor` is keyed by its node. It is set and restored on one thread around a body whose tail that thread evaluates, so a task stolen during a join sets and restores its own value inside the join. The two unkeyed hints are the risk, and the record's bullet asks the rung to carry them or to justify them (change 8 adds the clearing).
  - *The collector.* As written it is refused by reading: `r.empty()` on `Any`, `u(v)` applying `Any`, `desugaredClauses` typed `Any`, an untyped `fn (r, u)`. The record asks B to type it, with walk's values kept (change 9 names the join).
  - *The count's time.* Above.

- **Lines the record cites, read at the base:**
  - `FortressLibrary.fss`:
    - `:1312-1316`, `:1314`;
    - `:2451` and `:2823`, the team's TODO;
    - `:2452-2456`, call `:2454`; `:2824-2828`, call `:2826`;
    - `:2464` (`vector`), `:2837` (`matrix`), `:2493`;
    - `:2886`, `:2922`;
    - `:3229-3262` (`additiveIdentity`, `multiplicativeIdentity`).
  - `.fsi:296`, `:394`, `:446`; `FortressBuiltin.fsi:47`.
  - `IntMap.fsi:12`, `:82`; `Map.fsi:104`; `PrefixSet.fsi:33`.
  - `IntMap.fss`:
    - `:339-340`, `:488-490`, `:517-518`, `:520`, `:521-524`;
    - `:586-610` (`nodeNode`; a node's key is a split key and values live in singletons, so the recursion reaches a node and a singleton);
    - `:727-730`, `:732`.
  - `IntMapUplusSingleton.fss:24-25`, the two today's-value lines, catching `UncheckedException`.
  - Walk:
    - `EvaluatorBase.java:143-147` and `:170`;
    - `Evaluator.java:695`;
    - `BuildLetEnvironments.java:80`;
    - `FunctionClosure.java:199`;
    - `OverloadedFunction.java:868`, `:890`, `:894`, `:1025`, `:1411-1432` (`:1414`, `:1430`);
    - `GenericFunctionOrConstructor.java:49-58`;
    - `Constructor.java:479-540` (`:501-503`, `:514`, `:517`).
  - The checker:
    - `OverloadingChecker.scala:430-455`, `:441`;
    - `OverloadSet.java:409-411`;
    - `AbstractMethodChecker.scala:81-122`, `:107`;
    - `TypeAnalyzer.scala`: `:159-164` the trait split, `:165-166` the union rule, `:692-713`, `:832`;
    - `Decls.scala:408-414`;
    - `Formula.scala:640`; `Functionals.scala:755`;
    - `TypeWellFormedChecker.scala:137`, `:158-165`, `:183`.
  - The hooks: `WellKnownNames.java:61-69`; `Reflect.java:65-72`.
  - `git blame`: `OverloadingChecker.scala:441`, `normConjunct` `:692-698`, `array1` `:2452-2456`, `IntMap.fss:520`, `:732` and `IntMap.fsi:82` are the team's (`5a68404fd`), as section 2's list of team declarations says.

- **The specification.**
  - `inference.tex:265`, `:362-377` (`:367-369`, the counterpart of `N`), and `:104` (inference never instantiates at `BottomType`).
  - `reductions.tex:30-37` (walk's half), `:38-44` (the checker's half).
  - `changes.tex`:
    - `:1004` and `:1068-1074`, `:1666` and `:1852-1857`, `:1977-1985`;
    - `:2362` and `:2406-2409`, `:2497-2502`;
    - `:2748` and `:2876-2881`, `:2882-2886`;
    - `:3305` and `:3317-3333`, rows 620 to 622 as history.
  - `future.tex:257-264`.
  - `defining-generators.tex`, figure `generatedExpressions` at `:148-198`.
  - `overloading.tex:548-549`; `traits.tex:627-648`; `functions.tex:598`, mutual recursion.
  - `trait-parameters.tex`, "Type Parameters".
  - Greps for the sentences each rung makes false:
    - B: `row~645`, `row~662` and `row~424`, at the record's places and in the two Changes (change 7);
    - C: no `row~680` and no `row~686` to `row~690` in the text; "TryChecker" only as history (`:3327`);
    - L: `array1` only at `future.tex:242-262` (the box and the team's commented pair), `advanced/overloading.tex:152-153` and `changes.tex:2600-2601`, which stay true;
    - O: "does not settle", "malformed overload set" and "split a tuple" only at the three Effects named.

- **Decisions and facts, by number,** say what the record quotes or reads:
  - P-26, P-27, P-48, P-59 (read as change 3 says), P-60, P-85 (L's arms keep every store, so none of its three questions is answered), P-95, P-96, P-103, P-124, P-147;
  - F-27, F-42, F-53, F-54, F-94, F-141 (D2), F-143, F-145, F-220.
  - PLAN: "The principle for the batches" (`:15-21`); phase 3 item 13's candidates, each placed in section 4's last list; items 52 and 53; and "Climb batch 14, listed for his review", with the calls on item 53 (L.worker.2), row 704 (L.skeptic.3), row 705 (A.worker.3) and row 708 (W.skeptic.1), gather.1, review.2 and review-routed.1, as the record cites them.

- **The ledger,** by `ledger.py heads`:
  - open as the record reads them: 20, 364, 373, 425, 433, 436, 438, 441, 444, 445, 488, 510, 537, 577, 584, 585, 612, 616, 631, 632, 634, 636, 638, 645, 646, 650, 652, 653, 661, 662, 665, 670, 673, 677, 678, 680, 681, 685 to 687, 689 to 691, 697 to 710;
  - `FIXED`: 424, 518, 574, 617, 671, 688 and 696;
  - `CONTESTED`: 663;
  - `NEGATIVE-BOUNDED`: 695.
  - The highest row is 710.
  - Row 680's claim and note are as the record quotes them. So is row 685's: its class is `implementation gap (checker)`, which L's `--class` corrects; `close` takes `--claim` and `--class`. Row 424's note names D2. Row 703's reproducer is `none`.

- **Tests and paths.**
  - Every test the record names exists. The keys are as given:
    - `XXXNoDuplicatesRuleSelfPositions.test` on the code generator's message;
    - `XXXAbstractMethodCoveredPairs.test` on 'has no concrete implementation in the object Joiner', its `run()` with four asserts and `PASS`;
    - `XXXAbstractMethodCoverUnsettledWalk.test` `load_exception_contains`;
    - the four `TwoBoundsClosedTrait` tests on the messages C's Rows give.
  - The harness takes `typecheck` (`compiler_tests/AfterTypeChecking.test`). The team keys a reference cycle refusal as an `XXX` compile test (`compiler_tests/XXX5bn.test`), the shape of C's third test.
  - `LocalFunctionSiblingInLoop`, `LocalFunctionSiblingCall` and `BoundsGround` are free. So are the four worktree paths, `fortress-base15`, `fortress-seedcheck`, the four `wip/rung-*` branches and the rung folders.

- **The batch's rules.**
  - No declaration is two rungs':
    - B: walk's `instanceOf`, `for_RewriteFnApp`, `forLocalVarDecl`, the three `applyInnerPossiblyGeneric`, and `__bigOperator` with the new declarations after it, `IntMap`'s `BIG {|->}` in api and component;
    - C: `normConjunct`, `pSubInner` and the `SLetFn` case;
    - L: `array1`, `array2` and `NodeIM`'s `UPLUS` with a `SingletonIM`;
    - O: `checkOverloading`, `checkObjectDeclaration` with a helper, and `definedBelow`.
  - In the text: B has two entries and its boxes; O has two Effects; L has `future.tex` and the Change of O's entry (change 5).
  - No rung builds on another. C's second count run writes B's line for that run only, and C lands on its own runs.
  - Every rung's tests come first.
  - No rung is blind to the stages: each edits `Library/` or `scala_src/`, outside `STAGE_BLIND` (`climb-batch-workflow.js:749-750`). So each runs both stages, as each section asks.

- **The manifest.**
  - Slugs and worktrees are distinct.
  - The minutes, 130, 110, 100 and 70, give the scatter B C O L.
  - `testIsStage` is set for L alone; B and C declare the count 1; no gate step, `testSpecData` running from batch 14's summary; no `LEDGER_FROM`.
  - The cost's parts sum: workers 0.6M, 0.45M, 0.45M and 0.3M (1.8M); skeptics 4 × 341K plus B's (about 1.4M); the fixed roles 1.12M (`reviews/batch-14-review.md` section 2). That is about 4.3M.

## 3. Weighed and left as drafted

- **B's briefing prints 142,679 bytes, about 59,300 tokens,** 1.6 times batch 14's largest (S's 86,823 bytes, `lists14.py`). Each key is one the section cites. The largest are the inference entry B amends (24 KB) and the patch B applies (20 KB). Left.
- **C's second count run against the script's "The after runs once, on your final code"** (`climb-batch-workflow.js:763`). It measures another code state, the one line written for that run only, and the section says why. No text asks a skeptic to repeat it (`check15.js`'s re-run check passes). Left.
- **B holding `body(i)` after a run past 690 s** leaves a final tree that its tables did not measure. The tables of the gate on the merged tree are the record, and the report gives the time and the table. Left.
- **The 690 s guard.** The gate runs the count at its step 8, with the distance running in the background since step 2 (`climb-batch-workflow.js:1342-1345`, `:1393`). The 27 % margin was measured under heavier load (12 to 19). Left.
- **L's eight arms and P-85.** The array design's three questions stay open: every store is the one it was (`__DefaultVector` through `vector`, `PrimitiveArray`, `__DefaultArray2`). Left.
- **The ledger section's "Notes" list is narrower than section 3's "Notes, not repairs"** (rows 510, 364, 671, 574, 617 and now 584). The latter are for the rung's reading, and the gather writes the former. Left.
- **Section 2's title, "Your questions, in the order they block the batch",** now heads no question. It is kept as the record's form; its first line says none is open.
- **For the coordinator, outside this review's files:**
  - an INDEX line for this note;
  - step 1's edit of the script's handover lines (gather.1), still at `climb-batch-workflow.js:1211`;
  - after the landing, the PLAN entries for calls 1 to 5, as the record's last section lists them.

## For Pavol

No question is open, and nothing reverses a decision of yours. One call reads past the letter of one; it is listed here with its evidence.

- **Walk fixes a reduction's or comprehension's unwritten type parameter by its elements (call 1, rung B).**
  - P-48 says the instance is "never the arguments' union or the value's type alone". Under walk, `<| 2 k | k <- 0#3 |>` would now take its element type from the elements' run-time types.
  - The walk probe named this as the one reading to confirm.
  - The coordinator's bases:
    - the specification writes such a clause form with the expression's type `N` (`defining-generators.tex`, figure `generatedExpressions`), so the parameter is fixed, not open;
    - walk has no static types, and its elements stand in for `N`, as your answer to P1 already does for `SUM` (F-143; `inference.tex:367-369`);
    - P-59, which lets walk choose coercions by the value until the switch-over, read by analogy;
    - microGPT writes every static argument, so it is untouched.
  - Default: as called, way 6 + 7. Three expected failures pass (rows 645, 646 and 662), and `body(i)` gets its type.
  - The other way: way 5, the open type. No test changes, `body(i)` still lands, and rows 645, 646 and 662 stay open.
  - Reversible: the hints in walk's instantiation, and D2's line.
- **Not bent, listed:**
  - call 5, the collector's ten helpers, implementation hooks outside the api, by the coordinator;
  - `array1[\Number,2\]()` a plain array (L);
  - an `IntMap` comprehension with a repeated key throwing `KeyOverlap`. That is the specification's answer when the values differ (`comprehensions.tex:76-80`), and what `Map`'s comprehension already does (L);
  - `IntMap`'s `BIG {|->}` result declared as `Map`'s (B);
  - row 708's call, which reverses a worker's decision of batch 14, not yours.

**Ready to launch** once the coordinator makes step 1's edit, splices the block (`check15.js --write`), runs the scenarios on the spliced script and commits; the second review in place follows, as the boot note plans. The distance expected after the batch is about 49: 54, less C's 1 and L's 4, give or take row 488's 2 to 4. The count is about 39 if B's `body(i)` and C's row 680 line both land, else 1.

## 4. The top-tier review before the launch

Made in place on 2026-10-14 against `main` at `1cf03d1ea`, whose three commits since the first review (`a92e32ca0`) are `3662c84e2` and `324df02c1`, the batch script's handover lines and its manual (step 1 of "Before the launch", made), and `1cf03d1ea`, `BOOT.md`; `Library/`, `ProjectFortress/`, `Specification/`, `Documentation/`, `build.xml` and `bin/` are still byte for byte those of `7c2c7cd4b` (`git diff --stat 7c2c7cd4b HEAD` over them is empty), so batch 14's tables and the per-site list (54 rows) describe the base. Nothing built or run but the generator's checks and the scenarios, each into the scratchpad: `lists15.py` (`bad lists 0`; after change 1 B 46 keys, C 34, L 21, O 26), `gen15.py` (378 lines by its count), `check15.js` on the scratch splice (0 problems; rungs B, C, L, O; scatter B C O L), `workflow-scenarios.js` on the spliced copy of the script at `324df02c1`'s fix (49 ok, 0 problems); and `git apply --check` and `git apply` of the five probe patches in a scratch git copy of their eleven files at `HEAD` (each alone clean; all five in the record's order clean, 276 insertions and 18 deletions). Every other check is a read of the tree, a `git` or `grep` over it, the extract tool on POSITIONS and FACTS by number and on the 33 ledger rows the record names, the landed tables, and the per-site list grouped by message. The tracked script's block was not written; the coordinator's step 4 splices it. Section and call numbers are the record's.

### Changes, one reason each

1. **B's hint window named, with its lines.** The record asked B to carry the hint or to justify a thread-local, and named the work-stealing risk; it did not say where the window is. The patch reads both hints in `inferAndInstantiateGenericFunction` (its hunk `@@ -451,6 +511,38 @@`), called from `applyInnerPossiblyGeneric` before the operator's body is evaluated; the nullary `BIG OP()` forks nothing before that (`evalExprListParallel` evaluates in line when `sz < 2`, `Evaluator.java:342-343`); so the window is the body's evaluation, library code whose calls of two or more arguments become `TupleTask`s that are forked and joined when `TupleTask.worthSpawning()` (`Evaluator.java:337-353`, `tasks/TupleTask.java:120`), and a ForkJoin worker that joins runs other tasks meanwhile. One sentence in B's hints bullet, and one briefing key with its reason (`lists15.py`, B 45 to 46 keys; `facts-extract.sh --check` one place, `Evaluator.java:337-363`).
2. **The one uncollected path named.** B's bullet on `__bigOperator2` asked whether its bound stands. The desugarer emits `__bigOperator` and `__bigOperator2` only (`compiler/desugarer/PreDisambiguationDesugaringVisitor.java:404-416`; a grep of `compiler/` for `bigOperatorSugar` finds nothing), so `__bigOperatorSugar` (`FortressLibrary.fss:1309-1310`) is reached by no program, and `__bigOperator2`'s two nullary operators are the one inferred big-operator calls that another node's hint could reach. One clause.
3. **What else reads the normal form, for C.** The brief's question; the record named the Return Type Rule's meet only. `normalize` (`TypeAnalyzer.scala:559`) is read by `meet` and `join` (`:79`, `:81`), `equivalent` (`:337`), the exclusion oracle (`typechecker/ExclusionOracle.scala:66`), the schema analyzer the overloading and abstract-method checkers use (`types/TypeSchemaAnalyzer.scala:228`, `:348`, `:370`, `:424`; O's `tsa.subtypeED` and `joinED` at `AbstractMethodChecker.scala:106-107`) and the inference's solution (`useful/STypesUtil.scala:1041`). The probe's distance run covers the first two patches' effect on them (no new site, `#kind overloading 0`); the sibling's is C's own runs' to show. One sentence in C's Rows.
4. **The gate's count run has a shape the two guards measure only in parts.** B guards one run, the api and the component to row 680's crash without C's normal form; C guards two, the api under the normal form with the component to `:1314`, then with the whole component. Where C holds row 680's line and B lands `body(i)`, the gate's run is B's shape with C's api; where both land, C's second run's with B's collector and L's eight arms. One sentence in section 5's checker-count bullet, so that the coordinator reads B's time with C's api time before the gate.
5. **Header.** The second review's sentence, in batch 14's form (`CLIMB-BATCH-14.md:1`).

The record is 82,888 bytes, from 81,190.

### Checked and found right

- **The first review's ten changes,** each read at its lines: Q1 as call 5 (`WellKnownNames.java:61-69`, `FortressLibrary.fsi:845`, `:851`, `:895`; `Reflect.java:65-72`); call 1's clause of P-48 and P-59's scope (the entries by number); O's `FlatString` pair (`FlatString.fsi:17`, `:20`; the component declares `||` at `(self, b: FlatString)`, `(self, b: String)` and `(self, b: Char)` only, `FlatString.fss:119-147`; `validOp` refuses `||` at `NodeUtil.java:1475`; `isDeclaredName` at `OverloadingChecker.scala:720-724`; `TypeCheckPhase.java:45-46`); L's entry (`changes.tex:2398-2401`, `:2406-2409`, `:2497-2502`, `:2559-2561`) and the repeated key (`comprehensions.tex:76-80`; `Map.fss:161-168`; `IntMap.fss:300-301`, `:488-490`); B's Changes and way back (`changes.tex:1024-1031`, `:1048-1052`, `:1785-1795`); the patch's `remove()` against `expectedFor`'s restore (its `Evaluator.java` hunk, `:176-177` of the patch, against `BuildLetEnvironments` and `FunctionClosure`); `__elemsJoin`'s parameters and the `typecase` grammar (`typecase.tex:66-69`, a clause names types and binds none); `BigOperator` at `.fsi:1943-1947`, `lift` at `:1880`, `Array3`'s `__subarray` calls at `:2954-2955` and `:2964-2966`.
- **The three closest readings.**
  - *Rung B as briefed.* Way 6 + 7 is the specification's desugaring with `N` read at run time: the figure writes `<| e | gs |>` of type `List[\E\]` with `BIG <|[\E\]|>` (`defining-generators.tex:154-197`); the patch unifies the declared type with the result's `O` first (`resultTypeOf`: the second static argument of `Comprehension` and `BigOperator`, the first of `BigReduction`), else the elements' join with the element type `I` (`elementTypeOf`), else `instanceOf` takes the bound, D2's line gone (`bounds = bounded`): P-48's order. The collector's join `__elemsJoin[\T, A extends T, B extends T\]` takes `T` by walk's D3 rule (F-141), the arguments' type, here their join (the probe's `PListMixed`, `Number`); `__ElemsReduction.join` tests `__ElemsNone` first, so an empty clause form yields `__ElemsNone`, no `GenericTypeInstance`, no hint, the bound. `expectedFor` is keyed by its node and restored, so it survives a helped task; the two unkeyed hints do not (the first review's change 8, change 1 here). What the collection costs beyond the probe's measurement, by reading: one `__ElemsOne` per element and one `__ElemsTwo` per join kept until the replay, and the replay a second walk of that tree; over a sequential generator the tree is left-deep, but `NaiveSeqGenerator.generate` already composes one closure per element and applies the chain (`FortressLibrary.fss:3817-3830`), so that depth is the one walk bears today; no short circuit is lost (no library generator calls `isLeftZero`, the probe's section 7); the clause body runs once, in the collection, and `o.body` with `r.lift` once, in the replay, so effects run once and in order; the interpreter suite's time is the measure, which the record asks for.
  - *Rung C against the papers.* The expansion of a closed trait in `normConjunct` is the implementation's (the team's `a874948ac`), not the 2011 figures': `fig-subtype.tick` reads a bound variable by `Δ(X) <: T` and an intersection on the right as a conjunction, and neither it nor `fig-meet.tick` reads `comprises`; exclusion alone does (`fig-exclusion.tick:115-119`, every listed type excluding). Not expanding over a variable gives up completeness only, never soundness: an intersection on the left is below `U` where a conjunct is or the conjuncts exclude (the figure's rule), and the un-expanded `K ∩ R[$T]` still answers `T <: K` through `Δ(T)` and `$T = T` through `R`. It keeps POPL 2019's matching condition, no type parameter inside a union the checker builds (extract section 6). The sibling's inference-variable case states the constraint as one upper bound, which it is; its type-variable case adds `Δ(X) <: T` to the split, the bound-variable rule, with the type-variable case's history entry (`TypeAnalyzer.scala:185`) and only when not negated, where that case refuses negation (`:194-196`). The solver's instance at the union is "the intersection of the upper bounds" (extract section 4), P-48's words; `OR(A,B)` is within `K` by the union-on-the-left rule. Row 680: `primeFunctionals(fnIndices, makeTryChecker(this))` at `Decls.scala:414`, `newChecker` built at `:411` from the same indices; the recursive case gets the cycle checker's message, the team's own (`compiler_tests/XXX5bn.test`).
  - *The count stage.* `StaticChecker.checkCompilationUnit` adds the well-formedness errors to the type checker's and returns if any (`:268-272`), before the overloading check (`:275`) and the export check (`:283`): the whole component's count is its typecheck and wellformed sites, 36 (the list's 41 less `List.fss`'s 5) and 8 (all `FortressLibrary`), 44, less C's `:2493` and L's four, 39; the return-type 2 and export 3 are not reached. `run.sh`: `timeout -k 10 900` (`:69`), no table without a total (`:72-75`), `#crash` the overloading checker's alone (`:88-92`), the overloading memo off (`:54`, `:70`; row 688's fix is the ground cache, another switch). The script: `NO TOTAL` returns 1 (`:1408`), `COUNT UP` is a line (`:1409`), step 8's run with the distance running since step 2. A crash at `:2922` with `body(i)` typed is one error, `Shell.compilerPhases` wrapping an `InterpreterBug` as one `WrappedException` (`Shell.java:994-995`), so B's declared 1 holds either way. The 27 % is 2,185 against 1,714.
- **The landed tables and the 54.** `distance.txt` `#total 54`, kinds return-type 2, wellformed 8, typecheck 41, export 3; `checker-count.txt` twelve apis at 0, `#total 1`, `#crash none`, `#shadow` matching. The per-site list grouped by message: export 3, return-type 2, typecheck 41 (`Array1` bodies 9, `Array2` 5, four messages at 2, nineteen at 1), wellformed 8 (`Vector` 2, `Matrix` 2, the four reduction pairs). Less C's 1 and L's 4: 49, as the record says.
- **The patches.** The normal form's hunk at `TypeAnalyzer.scala:690-703`, the sibling's before `:165`, row 680's at `Decls.scala:410-418`, the factories' at `FortressLibrary.fss:2448-2457` and `:2820-2829` (eight arms each, the `else` arms kept), the walk patch's sixteen hunks over nine files, its library hunk ending before `__bigOperator2`'s comment. B and L share no hunk.
- **Lines the record cites, read at the base,** beyond the first review's list: `FortressLibrary.fss:1312-1316` (`body(i): L` at `:1314`), `:2493` (`SQRT asFloat(squaredNorm(me))`), `:2886`, `:2922`, `:3229-3262`; `.fsi:286-287` (`Number comprises { RR64, RR32, QQ, AnyIntegral, IntLiteral }`); `IntMap.fss:339-340`, `:517-524`, `:586-610`, `:727-732`; `IntMap.fsi:12`, `:82`; `Map.fsi:104`; `PrefixSet.fsi:33`; `IntMapUplusSingleton.fss:24-25`; `EvaluatorBase.java:143-147`, `:170`; `Evaluator.java:695`; `BuildLetEnvironments.java:80`; `FunctionClosure.java:199`; `OverloadedFunction.java:868`, `:890`, `:894`, `:1025`, `:1414`, `:1430`; `GenericFunctionOrConstructor.java:52`, `:55`; `Constructor.java:479-540`, `:501-503`, `:514`, `:517`; `OverloadingChecker.scala:430-455`, `:441`, `:446-448` (the message without self); `AbstractMethodChecker.scala:81-122`, `:107`; `TypeAnalyzer.scala:159-166`, `:692-713`, `:832`; `Decls.scala:408-414`; `OverloadSet.java:409-411`; `MultipleStaticError.java:31-39`.
- **The specification.** `inference.tex:104-105`, `:265`, `:362-377`; `reductions.tex:30-44`; `comprehensions.tex:76-80`; `defining-generators.tex:148-198`; `functions.tex:578`; `overloading.tex:548-549`; `traits.tex:627-648`; `trait-parameters.tex:39`; `future.tex:257-264`; `changes.tex:1004`, `:1068-1074`, `:1666`, `:1852-1857`, `:1977-1985`, `:2362`, `:2748`, `:2876-2886`, `:3305`, `:3317-3333`. Greps: no `row~646`, `row~20`, `row~703`, `row~680`, `row~685`, `row~704` or `row~686` to `row~690` anywhere in `Specification/`; a reduction running "on the types of its elements" is at `reductions.tex:35` and `changes.tex:1029`, `:1046`, `:1856`, `:1980`, each in a passage B's section lists.
- **Decisions, facts, PLAN.** P-26, P-27, P-48, P-59, P-60, P-85, P-95, P-96, P-103, P-124, P-147; F-27, F-42, F-53, F-54, F-94, F-141, F-143, F-145, F-220: each says what the record and the briefings' reasons say. PLAN's "The principle for the batches" (`:15-21`); item 13's candidates (`:145-154`), each placed; item 53 (`:321`); the "Climb batch 14, listed for his review" entries L.worker.2 (`:755`), L.skeptic.3 (`:756`), A.worker.3 (`:759`), W.skeptic.1 (`:763`) and review-routed.1 (`:768`), each with the coordinator's call as the record quotes it. `rung-walk-coverage/REPORT.md` sections 6, 10 and 11 (decision 2) say what O's section and its briefing's reasons say.
- **The ledger.** The 33 rows read whole; the statuses as the first review lists them; row 685's class `implementation gap (checker)`, row 703's reproducer `none`, row 680's note "A compiler-world program of the same shape typechecks", row 584's `validOp`, row 585's `FlatString.fsi:20`, row 704's `:520` and `:340`.
- **Tests, names, paths.** Every test the record names exists with the key it gives; the row 708 program calls `g(O, P1, P1, P1, P1, P1)`, so as an `XXX` walk test it is green while the object loads and red once walk refuses, as the skill's "How `XXX` works" reads, and its promotion keeps its `load_exception_contains` key; `LocalFunctionSiblingInLoop`, `LocalFunctionSiblingCall` and `BoundsGround` are free, as are the four worktrees, `fortress-base15`, `fortress-seedcheck` and the `wip/rung-*` branches; the twelve `repro/` and 24 `probes/` files are present.
- **The rules and the manifest.** As the first review found them; no two rungs on one declaration, none building on another, tests first, no rung blind to the stages; check15's re-run regex passes on the amended sections.

### Weighed and left as drafted

- **`__bigOperator2` under D2 lifted.** The probe's `PNested2` is the fused shape and printed `ArrayList[\Int\]` under 6 + 7, where the fused path at the bound would build at `Any`; so either the desugarer did not fuse it or the path is right. The record asks B to say whether the bound stands, which covers it. Left.
- **The 690 s guard and the api's time.** With row 680 held the gate's run is B's shape with C's api (change 4); the normal form makes variable-bounded meets smaller, so the api check should not slow, a reading. Left, with change 4's sentence.
- **C declares 1 while the api check could gain an error under the normal form.** The probe's distance run checked the twelve apis with every stage under the first two patches, `#kind overloading 0`, no new site; an api error would hide the component (`TypeCheckPhase.java:45-46`) and show as a changed table, reported and never red. Left.
- **O's split and C's union cases.** The two new `pSubInner` cases fire on a type variable or an inference variable directly below a union; O's test compares a tuple domain with a union of tuples (`AbstractMethodChecker.scala:107`), where neither fires, and the union's normal form is `normDisjunct`'s, which C does not touch. They meet in the tracks, as the record says. Left.
- **B's briefing, 144,245 bytes after change 1** (from 142,679). Left, as the first review left it.
- **The first review's "once the coordinator makes step 1's edit".** Made (`3662c84e2`, `324df02c1`); the header says so.

### For Pavol

Nothing new. The one call that reads past the letter of a decision of yours is the one the first review lists: walk fixes an unwritten clause form's parameter by its elements (call 1, rung B), against P-48's "never ... the value's type alone", read as not reaching a parameter the desugaring fixes by `N`; its bases, default, other way and reversibility are as that section gives them. The batch's other defaults are listed there as not bent, and this review found no other.

**Ready to launch** once the coordinator splices the block (`check15.js --write`), runs the scenarios on the spliced script and commits; the tracked script still carries batch 14's block. The distance expected after the batch is about 49 (54, less C's 1 and L's 4, give or take row 488's 2 to 4), the count about 39 if B's `body(i)` and C's row 680 line both land, else 1.

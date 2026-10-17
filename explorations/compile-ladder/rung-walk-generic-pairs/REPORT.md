# Rung G of climb batch 17: walk's load check reads every pair of generic declarations by the checker's rules

- problem: walk refused two generic functions unless a parameter pair excluded (row 159, `explorations/fortress-gap-ledger.md:299`), and loaded two declarations whose declared domains are equal (rows 742 and 549, `explorations/fortress-gap-ledger.md:351`, `:340`); the five tests of section 2 were red on the base through the harness.
- spec: `Specification/basic/overloading.tex:100-110` (a declaration with static parameters is read over its instances and compared on the parameter types it declares; the rules are in `Specification/advanced/overloading.tex:531-575`, "Declarations with Static Parameters").
- precedent: `genericPairValid`, climb batch 16's reading of a withdrawn pair on its declared domains (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:842`, at the base `:801`), and the generic-beside-plain branch of `validOnDeclaredDomains`, which refuses `plainInside && genInside` (at the base `:781-783`).
- deviation: the refusal of equal declared domains reads a pair that the parameter check passed, which no precedent reads, and gives the team's message for equal parameter lists (`OverloadedFunction.java:628`, the team's `:573` at `a874948ac`) for two lists that differ as written (`OverloadedFunction.java:533-540`).
- historical: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java`, `Specification/advanced/overloading.tex`, `Specification/appendices/changes.tex` (each a file of the 2012 tree; every line changed in them is the revival's).

## 1. What changed and why

P-45 decides that walk's load check reads every pair of generic declarations on their declared domains by the checker's rules, with no parameter pair required to exclude (row 159). Climb batch 16 built that reading only for a pair some parameter pair of which had excluded in walk's reading of each at a symbolic instantiation and then had the exclusion withdrawn (F-238). This rung widens it to every pair, and adds the No Duplicates Rule for the pairs that the parameter check orders wrongly (rows 742 and 549).

In `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java` (commit `b5a497c04`):

- `validOnDeclaredDomains` (`:750-793`) reads a pair of two own generics that the parameter check refuses by `genericPairValid` whether or not an exclusion was withdrawn: `return genericPairValid(o1, o2, all);` (`:766`) in place of `return withdrawn && genericPairValid(o1, o2, all);`. `genericPairValid` (`:842`) is unchanged: refused where each declared domain lies inside the other (No Duplicates), valid where one lies inside the other and its return type is below at the holding instance (Return Type), else valid where a third declaration below both holds the overlap (`genericMeetCovered`, Meet).
- `completeOverloadingCheck` (`:528-540`): a pair that the check passes without an excluding parameter is read again by `sameDeclaredDomains` (`:795-822`, with `declaredInside`, `:824-832`): where one at least is an own generic and the other an own generic or a declaration without static parameters, and each declared domain lies inside the other (each generic's over its own instances, by `instanceHolding`), the pair is refused, "Overloading of ... and ... fails because their parameter lists have the same types". The parameter check reads a type parameter `T` as strictly below its bound `Wide` and sets `p1better`, so it orders `tie[\T extends Wide\](a: T, b: T)` before `tie(a: Wide, b: Wide)` or `tie[\T extends Wide\](a: Wide, b: Wide)`, though at the bound the two declared domains are one.
- The `withdrawn` field, its reset and its one assignment go, since nothing reads it now (at the base `:310-312`, `:340`, `:479`).
- The two comments that climb batch 16's judge left (`explorations/compile-ladder/climb-batch-16/JUDGE-review.md:136-138`) read F-238's reading: the loop's comment (`:464-466`), "Read each at a symbolic instantiation of its static parameters, shared where both declare the same ones", and `validOnDeclaredDomains`'s comment (`:757-761`), which now says that every refused pair of two own generics is read on its declared domains. The field's comment (at the base `:310-311`) went with the field.

The object-type shortcut (`:437-443`, `:509`, row 697's) and rung W's `bestMatchWithCoercion` and `bestMatchInternal` are untouched; a three-way merge with `origin/wip/rung-walk-method-sargs` is clean (`git merge-tree --write-tree HEAD origin/wip/rung-walk-method-sargs` exits 0).

The specification's two revival sentences on these rows are edited (section 4).

## 2. The tests, failing and passing

Promoted, each renamed with `git mv` before the edit and committed in `8747b68cb`:

| expected failure | promoted to | key |
|---|---|---|
| `XXXDispatchRenamedArmWalkRungG` (row 159) | `DispatchRenamedGenericArmWalk` | none (loads and dispatches) |
| `XXXDispatchSwappedArmWalkRungG` (row 159) | `DispatchSwappedGenericArmWalk` | none |
| `XXXGenericBesideGenericSameDomain` (row 742) | `GenericBesideGenericSameDomain` | `load_exception_contains=fails because their parameter lists have the same types`, kept |
| `XXXGenericBesidePlainSameDomain` (row 549) | `GenericBesidePlainSameDomain` | the same key, kept |

New: `GenericPairNestedBoundsWalk`, the specification's allowed pair `ident[\T extends Shape\]` beside `ident[\T extends Round\]` (`Specification/advanced/overloading.tex:608-614`) with a dispatching pair of the same shape, `which`; and `GenericMethodBesideConditionedMethodWalk`, the guard for rung L's library: a trait's generic `distribute[\K\](r: ActRed[\R,K\]): Pair[\K\]` inherited beside an object's plain `distribute(r: Mx[\T\])` under `where { T extends Ranked }`, asserted to load and to run the plain one.

The failing run, on the base's code, 15:40:17 to 15:40:29 UTC, before the edit was first built (the build ran 15:42:39 to 15:43:40):

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-generic-pairs/h-base \
        ProjectFortress/tests/DispatchRenamedGenericArmWalk.fss ProjectFortress/tests/DispatchSwappedGenericArmWalk.fss \
        ProjectFortress/tests/GenericBesideGenericSameDomain.fss ProjectFortress/tests/GenericBesideGenericSameDomain.test \
        ProjectFortress/tests/GenericBesidePlainSameDomain.fss ProjectFortress/tests/GenericBesidePlainSameDomain.test \
        ProjectFortress/tests/GenericPairNestedBoundsWalk.fss ProjectFortress/tests/GenericMethodBesideConditionedMethodWalk.fss

    grab[\X\](t:Tag[\X\]):Marker[\X\]tmp/rung-walk-generic-pairs/h-base/tests/DispatchRenamedGenericArmWalk.fss:16:1-47 have parameters
    with generic type, at least one pair of parameters must have excluding types
     Missing expected refusal at load
    FAILURES!!!
    Tests run: 6,  Failures: 5,  Errors: 0

The guard was the one green test of that run (`. interpret .../GenericMethodBesideConditionedMethodWalk`, `PASS`, `OK (time = 470ms)`).

The passing run, after the last change of code, 15:44:01 UTC, the same harness over the six files, the four keyed `.test` files and every test the brief names to keep its verdict (`GenericBoundsNoMeetWalk`, `NoDuplicatesRuleWalk`, `NoDuplicatesRuleSizeWalk`, `GenericOverloadInstancesApartWalk`, `GenericBoundsMeetWalk`, `GenericFBoundsMeetWalk`, `GenericPairExcludingWalk`, `GenericSizePairNestedWalk`, `ShuffleTest`, `TwoTraitsNoMeetWalk`, `DispatchCrossingMeetWalk`, `XXXGenericPairExcludesTogetherWalk`, `XXXReturnRuleObjectParamWalk`, `XXXDottedMethodMeetBothBodiesWalk`), with `XXXOverloadExistentialMeetWalk`, `XXXGenericBesidePlainReturnParam`, `XXXGenericBesidePlainReturnRule`, `XXXDispatchGenericMethodBesidePlain`, `GenericBesidePlainOverlapShapes`, `GenericBesidePlainTwoBounds` and `LibraryOverloadFamilies`:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/rung-walk-generic-pairs/h-new <the 27 programs and their .test files>
    OK (27 tests)

The suites, once on the final code (the code state of `b5a497c04`):

    ant testSystem      Tests run: 158 / 154 / 157 / 163, Failures: 0, Errors: 0 (632 in all); BUILD SUCCESSFUL; Total time: 3 minutes 53 seconds
    ant testSpecData    Tests run: 130, Failures: 0, Errors: 0; BUILD SUCCESSFUL; Total time: 55 seconds

The last landed gate's system total is 629 (`explorations/compile-ladder/climb-batch-16/gate/summary.txt`); this tree adds two files to `ProjectFortress/tests/` and runs 632 cases, every `.fss` of the folder and `concurrentPrinting`. The third case of the rise is not traced; a count that rises is not red (the skill's `gate.md`).

No `XXX` test is added, so no deliberate fix was shown red.

## 3. Where the fix belongs, and the precedent

The place is walk's load check, `OverloadComparisonResult.completeOverloadingCheck` and `validOnDeclaredDomains` (`explorations/coordinator/map/spec-to-implementation.md:214`, `values/OverloadedFunction.java`; an edit under `interpreter/` changes walk only, the skill's `interpreter.md`). The compiled path never reaches the file: outside `interpreter/`, `grep -rln 'OverloadedFunction\b' ProjectFortress/src/com/sun/fortress` finds only a comment, `scala_src/typechecker/AbstractMethodChecker.scala:124`.

The precedent is the file's own reading of declared domains. It has two sites that read own generics on their declared domains: the load check's `validOnDeclaredDomains` (`:763-793`), whose generic-generic branch was the one limited to withdrawn pairs and is widened here, and the dispatcher's `moreSpecificDeclaration` (`:2179`, by `declaredBelow`, `:2158`), which already reads every pair; so the promoted pairs dispatch to the more specific arm once they load (`DispatchRenamedGenericArmWalk` asserts `SubM[Blue]` and `TagM[Blue]`).

Ways the code offered for the equal-domains refusal: re-reading every passed pair by `genericPairValid` whole; a test of mutual inclusion only; and a change to the parameter check's reading of `T` against its bound (`:484-498`). Section 9 gives the choice.

## 4. What the specification settles

`Specification/advanced/overloading.tex:545-560` states the No Duplicates, Meet and Return Type Rules on declared domains read over every instance, `:536-539` that a declaration with static parameters is read as one declaration ranging over its instances, and `:608-614` allows the pair `ident[\T extends Shape\](x: T): T` beside `ident[\T extends Round\](x: T): T`. So the specification settles all three rows: the renamed and swapped arms and the nested bounds are valid (one inside the other, return types fitting), and `tie` beside `tie` at the bound is refused (each applicable to every call to which the other is). No normative sentence changes.

Edited, in the revision text, since the sentences said what walk does:

- `Specification/advanced/overloading.tex:626-629`, in the box `revival-overloading`: "Neither implementation runs the pair allowed above today: the interpreter refuses it at load, ... (row~159 ...), and the compiled code generator fails on it (row~537)" becomes "The interpreter runs the pair allowed above, reading two declarations with static parameters on their declared domains, each over its own instances, where no pair of their parameter types excludes each other; the compiled code generator fails on it (row~537 of the revival's gap ledger)."
- `Specification/appendices/changes.tex:2612-2618`, the Effect of "Overloading with static parameters": the interpreter's refusal of every pair without an excluding parameter (row 159), save the withdrawn ones, becomes its reading of such pairs on the declared domains by the rules, with the limit that keeps row 539's example refused.
- `Specification/appendices/changes.tex:2634-2638`: "it loads a declaration whose parameter types are its static parameters beside one whose parameter types are their bounds, a plain one (row~549) or one ... (row~742), and runs one of the two" becomes that the interpreter refuses those pairs too.

The specification builds: `cd Specification/fortress && ./ant genSource && ./ant tex` ended `BUILD SUCCESSFUL` twice, and `grep -c "LaTeX Warning: Reference\|multiply defined\|^! Undefined control sequence" Specification/fortress/fortress.log` printed 0 (section 10 on the skill's own grep). The build's files were removed with `git clean -fXq -- Specification`.

## 5. Old against new

Each program run under walk from the rung's scratch folder, new with `bin/fortress`, old with `old-fortress.sh /home/user/fortress-base17 <tree>/tmp/old-caches` (or an empty private folder where a cold cache is named):

| program | base | this tree |
|---|---|---|
| `which`/`ident`, nested bounds (`GenericPairNestedBoundsWalk`) | refused, 'at least one pair of parameters must have excluding types' | loads; `round`, `shape`; `ident` returns its argument |
| `f[\T extends Shape\](x: T): Shape` beside `f[\U extends Round\](x: U): U` | refused, the same | loads; `Circle`, `Square` |
| `f[\T extends Shape\](x: T): T` beside `f[\U extends Round\](x: U): Shape` (Return Type Rule broken) | refused | refused, the same message |
| `g[\T extends A\](x: T, y: ZZ32)` beside `g[\U extends B\](x: U, y: ZZ32)`, with or without `g(x: Both, y: ZZ32)` (Meet Rule broken) | refused | refused, the same |
| `h[\T extends Number\](x: T, y: T)` beside `h(x: Number, y: Number)` | loads, prints `generic` | refused, 'fails because their parameter lists have the same types' |
| `m[\P\](x: ArraySeq[\P\])` beside `m[\R extends Num\](z: ArraySeq[\R\])` | refused | loads; `array of num`, `array` |
| `m[\Q extends Num\](y: Seq[\Q\])` beside `m[\R extends Num\](z: ArraySeq[\R\])` | refused | loads; `array of num`, `seq of num` |
| the three `m` of `XXXOverloadExistentialMeetWalk` (row 539) | refused at `m[\Q\]` beside `m[\P\]` | refused at the same pair (section 6) |
| `k[\I\](a: Array[\RR64,I\])` beside `k[\nat n\](v: Vector[\RR64,n\])` | refused | loads; `vector`, `any rank` |
| `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])` | refused | refused, the same (row 416) |
| row 159's `mul`/`opr ×` pair, `[\I\](Array[\RR64,I\], Array[\RR64,I\])` beside `[\nat s, nat r, nat c\](Vector[\RR64,s\], Matrix[\RR64,r,c\])` | refused | refused, the same (row 740) |
| `explorations/apl/mg/elemwise_nat_probe.fss`, cold | refused at its own `×` pair, Array beside Matrix | its own pair passes; refused at its `×[\T extends Number, I\]` beside the library's `MultiplicativeRing.×(self, other: T)` (`Library/FortressLibrary.fss:374`), the generic message (row 341) |
| a program's `opr MAX[\I\](s: RR64, a: Array[\RR64,I\])` and `opr MAX[\I\](a: Array[\RR64,I\], s: RR64)` beside the library's, cold | loads; `102.0`, `202.0`, `5` | the same |
| a program importing `Relation`, `Tuple`, `Generator22D` and `Set`, which no gated test imports but `Set` | loads | loads, the same output |
| a program importing `PrefixMap` | refused, `BIG CUP` of `Library/PrefixSet.fss:425` beside `Library/PrefixMap.fss:419`, 'fails because their parameter lists have the same types' | refused, the same (row 101) |

microGPT under walk, `explorations/coordinator/tools/mg-run.sh tmp/rung-walk-generic-pairs/mg G17` on the final code:

    MicroGptFlatQuick: VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS / rc=0 secs=41
    MicroGptAplQuick:  VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS / rc=0 secs=51

The reading of microGPT's components (`explorations/run-c4/src/`, `explorations/apl/mg/`): their overloaded names of one arity are `opr /` (two, `FlatArrays.fsi:16-17`), `transpose` (two, `:29-30`), `rows` (four, `:45-48`) in the flat model, and `opr ×` (three), `opr /` (four), `transpose` (two) and `rows` (three) in `FlatArrays2.fsi:56-68`, `:92-93`, `:126-128`. Each set loaded before and loads after; the quick pair shows it. No verdict moves. The `Diag` workaround (row 159's) stays needed: the model's earlier pair of `opr ×` over `Array[\RR64,I\]` twice beside `Vector[\RR64,s\]` and `Matrix[\RR64,r,c\]` excludes only together, through the one `I` that `Vector` and `Matrix` fix differently, which is row 740's shape and P-152's to build. No model line changes.

The demos: `ProjectFortress/demos/` has two families of top-level declarations with a generic one among them, `assertStr` and `chkPop` in `ArrayListLong.fss:16-55` and `PureListLong.fss:16-55`; each pair differs in arity or at a parameter whose types exclude (`ZZ32` beside `Boolean`), so neither reaches the changed code. By reading, no demo's verdict moves.

## 6. Defects and their homes

- Row 159, walk's refusal of two generic functions without an excluding parameter: home 1, repaired; `DispatchRenamedGenericArmWalk`, `DispatchSwappedGenericArmWalk`, `GenericPairNestedBoundsWalk`. The row's named example, the `opr ×` pair, stays refused: it is row 740's shape (section 5).
- Row 742, two generic declarations of equal declared domains loaded: home 1; `GenericBesideGenericSameDomain`.
- Row 549, a generic declaration beside a plain one of equal declared domains loaded: home 1; `GenericBesidePlainSameDomain`.
- Row 539, the paper's set refused: home 2, its expected failure `XXXOverloadExistentialMeetWalk` keeps its verdict. Its cause narrows: two of its three pairs now load, and `m[\P\](x: ArraySeq[\P\])` beside `m[\Q extends Num\](y: Seq[\Q\])` is refused because `genericMeetCovered` matches the two domains only where the parameter types are instances of one generic type or static parameters (`matchApart`, `OverloadedFunction.java:1010`), so `ArraySeq[\P\]` against `Seq[\Q\]` finds no overlap to hold. A note.
- Row 416, no instantiation exclusion in walk's check: home 2, unchanged; its generic form, `h[\I\](a: Array[\RR64,I\])` beside `h[\J\](a: Array[\ZZ32,J\])`, is refused before and after, now through the same `matchApart` limit (no exclusion is read, and the two element types do not match). The row is at its limit, so the case goes to F-155's correction in `record.md`.
- Row 101, nullary big operators of two components: home 3, unchanged; `PrefixMap` alone is refused, since it imports `PrefixSet`, before and after. A note.
- Row 341, a program's operator declarations checked with the library's: unchanged; `elemwise_nat_probe` now passes its own pair and stops there. Its notes are full; recorded here only.
- Rows 740, 741 and 697: unchanged (`XXXGenericPairExcludesTogetherWalk`, `GenericPairExcludingWalk` and `XXXReturnRuleObjectParamWalk` keep their verdicts). Notes on 740 and 741; 697's notes are full.

No new row.

## 7. Sentences made false

Of the specification: the three edited in section 4, `Specification/advanced/overloading.tex:626-629` and `Specification/appendices/changes.tex:2612-2617` and `:2633-2638` as they stood on the base. No other sentence of `Specification/` or `Documentation/` describes walk's check of generic pairs (`grep -rn 'row~159\|row~742\|row~549\|excluding types' Specification Documentation` found only those).

Of the record and the skill, for the gather (`record.md` gives the corrections):

- F-238 (`explorations/coordinator/FACTS.md:163`): "A pair the old reading did not find excluding keeps its refusal (row 159)."
- F-223 (`explorations/coordinator/FACTS.md:195`): walk "loads and runs one of a generic declaration beside one whose parameter types are its bounds, a plain one (row 549) or a generic one whose parameter types mention none of its static parameters (row 742)", and "walk's two departures by `tests/XXXGenericBesidePlainSameDomain` and `XXXGenericBesideGenericSameDomain`".
- F-155 (`explorations/coordinator/FACTS.md:173`): "or a rank-specialised declaration beside an index-generic one, are refused at load" is now false where the rank-specialised one lies inside the index-generic one.
- P-45 (`explorations/coordinator/POSITIONS.md:44`): "Still to build: walk's load check over every pair, PLAN phase 3 item 15" is now built.
- The skill's `references/interpreter.md:38` ("It accepts them if their declared domains order a generic declaration and a plain one ... except in the three cases") and `references/revival-changes.md:43-50` ("walk loads two generic declarations whose declared domains are equal (ledger row 742)"): the writer's, from `record.md`'s "Revival change".

## 8. Points to report

- A specification example that walk newly loads: the allowed pair of `Specification/advanced/overloading.tex:608-614`, in `ProjectFortress/tests/GenericPairNestedBoundsWalk.fss:14-15`; landed. No declaration of the library, team test, demo or extracted specification example is refused: `ant testSystem` 632 with 0 failures, `ant testSpecData` 130 with 0, the demos by reading (section 5).
- microGPT's components: no verdict moves; the quick pair passes 7 of 7 each; the model's earlier `opr ×` pair is row 740's shape and stays refused (section 5).
- A walk test whose verdict changes beyond the four promotions and the two new tests: none (`ant testSystem`, every shard 0 failures).
- The team lines changed in walk's pair check: none. Every changed line of `OverloadedFunction.java` is the revival's (`git blame` of the base: `9879d4386` and `8f7e183d4`); the team's `overloadOk` (`:547-566`) is unchanged. The two comments are at `:464-466` and `:757-761`.
- Every sentence made false, and the specification sentences edited: sections 7 and 4.
- A walk edit beyond the one file named, or any checker or library edit: none.

## 9. Decisions

1. **The equal-domains refusal tests mutual inclusion only.** Chosen: `sameDeclaredDomains`, for a pair the check passes without an excluding parameter. Not taken: reading every passed pair by `genericPairValid` whole, which would also re-check the Return Type and Meet Rules on pairs the parameter check orders, and could refuse library pairs where `instanceHolding`'s inference fails (it refuses on an exception); changing the parameter check's reading of `T` against its bound (`:484-498`), the team's lines, which every other pair rests on. Evidence: the brief's "read on its declared domains too, and refused with the message of equal parameter types"; at a symbolic position the check's "better" is the declared domains' "inside or equal" (a type parameter is below `X` exactly when its bound is), so only equality is missed.
2. **Its scope is one own generic beside an own generic or a declaration without static parameters**, the pairs `validOnDeclaredDomains` reads. Not taken: generic functional methods and generic dotted methods, which walk compares on the instance a call makes (`ownGeneric`'s comment, `:2084-2091`).
3. **Its message is the team's for equal parameter lists**, emitted directly. Not taken: the generic message "with generic type, at least one pair of parameters must have excluding types", which names the wrong cause; setting the comparison's flags so that `describeOverloadingFailure` prints it. Evidence: the keys of rows 742 and 549 (`GenericBesideGenericSameDomain.test`, `GenericBesidePlainSameDomain.test`).
4. **The `withdrawn` flag is removed**, not kept unused. Not taken: keeping it for a later reader. Evidence: after the widening nothing reads it; it was the revival's (`9879d4386`).
5. **The Meet Rule's search is not widened** to match a parameter type against another generic type's supertypes (row 539), nor does the check add instantiation exclusion (row 416). Not taken: either, each a change of a reading the brief does not name. Evidence: the brief's "as genericPairValid does for a withdrawn pair"; the two rows stay open with their tests.
6. **The specification's edits are the box's sentence and the Effect's two clauses**, with no decision record and no new "Original text". Not taken: the four-part form with a `decision-record.md`, which is for a change of the language's text; here only sentences on what walk does change, and the brief asks for no decision record ("A decision record if your section asks for one").
7. **The promoted names**: `DispatchRenamedGenericArmWalk` and `DispatchSwappedGenericArmWalk` by their topic, the two same-domain tests by their names without the prefix. Their comment lines that pointed to `climb-batch-6.5/RECORD.md`, and `(row 549)` in one comment, became topic lines (the skill's `tests-writing.md`, "Names, comments, citations"); every assertion is kept. These are the revival's tests, not the team's.
8. **The new nested-bounds test is the specification's own example with a dispatching twin**, since `ident` returns its argument under either arm and so cannot show which one ran.
9. **The guard calls only the object's plain `distribute`**: a call that only the generic dotted method fits fails on the base for row 21's reason (rung W's), and the guard must be green before and after.

No decision of the curator is changed; none is open.

## 10. Commands

- The skill's check of a specification build, `grep -c 'Reference .* undefined\|multiply defined\|Undefined control sequence' Specification/fortress/fortress.log`, printed 42 on this build: every hit is the log's echo of the macro text `x@warning {Reference `#1' on page \thepage \space undefined}}{}`. `grep -c "LaTeX Warning: Reference\|multiply defined\|^! Undefined control sequence"` counts only the warnings, and printed 0.
- An empty private folder named to `old-fortress.sh` runs the old code with a cold cache: the script copies the base's caches only into a folder that does not exist yet.

## 11. The checker count, the distance and the ladder

Every path this rung changes is under `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/`, `ProjectFortress/tests/`, `Specification/` or `explorations/` (`git diff --name-only 3aea3da53f57c9062d2b9a9bab4e5d14060a088f` and `git status --short`), so neither stage can move, and neither ran.

The ladder subset is empty: no file of the baseline's `raw/` names walk's check, its messages or `interpreter/evaluator` (`grep -rl 'OverloadedFunction\|must have excluding types\|parameter lists have the same types\|interpreter/evaluator' explorations/compile-ladder/baseline-2026-09-19/raw` prints nothing), and the compiled path does not load the file (section 3).

<!-- This file is the scout's evidence for chunk checker-2 (FACTS entries F-63 to F-92, section "The checker and the one library") of the FACTS consolidation of 2026-11-24: sources, commit, citations, what exists today, where else the same is said, the curator's words. Gathered with facts-extract.sh, grep, ls and git; no judgment. Every entry's first history block is `numbered`, commit a74f5a2b7 (2026-10-13 17:58Z, a renumbering); the dated rewrites, not the number, carry its later history. Report paths `compile-ladder/...` and `reviews/...` are under explorations/. -->

## F-63
1. Sources: compile-ladder/rung-library-defects/REPORT.md: file ok; "Summary" ok, "Decisions" ok, "Defects and their homes" ok
2. Commit: first block numbered, commit `a74f5a2b7`; no earlier texts listed
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: Library/FortressLibrary.fsi:1008 `trait Condition[\E\] extends {ZeroIndexed, SequentialGenerator}` found; :397 `comprises { ... }` found (QQ). No test or ledger row named.
5. Said elsewhere: No skill text. F-286 and F-297 list `splitWithOffsets`/`split` among String members the component's trait lacked; F-396/F-377 name `QQ comprises { Ratio }`.
6. Curator's words: none in the history

## F-64
1. Sources: compile-ladder/rung-library-defects/REPORT.md: file ok; "Defects and their homes" ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1223, 2620
3. Cited by: FACTS/POSITIONS: F-63, F-72; skills: none
4. Exists today: compiler_tests/XXX3q.test, XXX10p.test found. Row 354: NEGATIVE-VERIFIED (`facts-extract.sh ledger:354`; claim agrees: refuses every api-declared type extending an ellipsis-comprises trait). Specification/basic/traits.tex found, heading `Trait Declarations` at :31.
5. Said elsewhere: revival-changes.md:38 "`T` has no `comprises` clause, or one that lists only `...`;" (different rule). F-72: "This rule leaves the ellipsis refusal of F-64 (row 354, open) as it was." F-282 lists test `ExportComprisesEllipsisAbstract`.
6. Curator's words: none in the history

## F-65
1. Sources: compile-ladder/rung-analyzer-memo/REPORT.md: file ok; "Why the memo changes no answer" ok; reviews/row-488-probe.md: file ok; "The answer" ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 753, 1226, 1627
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: TraitTable.scala:116-121 holds parentsMemo, excludesClauseMemo, `ProjectProperties.getBoolean("fortress.analyzer.clauses.cache", true)` at :117. The literal FORTRESS_ANALYZER_CLAUSES_CACHE is NOT FOUND in ProjectFortress/src (`grep -rn ANALYZER_CLAUSES_CACHE ProjectFortress/src ProjectFortress/astgen bin` empty); the report REPORT.md:65 says the env form comes from StringMap dots-to-underscores. F-240 (cited in entry) exists.
5. Said elsewhere: F-255: "the inherited `excludes` clauses (`TypeAnalyzer.excludesClause`). None of these readers moved a result on the library". F-43 and F-80 speak of the overloading memo (a different memo).
6. Curator's words: none in the history

## F-66
1. Sources: coordinator/climb-batch-workflow.md: file ok; "The checker count, and a rung whose test is that stage" ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 478, 631, 670, 722, 756, 819, 887, 997, 1025, 1229, 1831, 1896, 2035, 2142, 2252, 2348, 2416
3. Cited by: FACTS/POSITIONS: F-53, P-39; skills: coordinator/references/sources.md
4. Exists today: explorations/coordinator/tools/checker-count/run.sh and shadow-src/.../compiler/StaticChecker.java found; tracked ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java found. run.sh:35-65 describe the `#shadow` line and checksum. gate/checker-count.txt: found under explorations/compile-ladder/climb-batch-N/gate/ (e.g. climb-batch-36/gate/ holds checker-count.txt, distance.txt, summary.txt); explorations/compile-ladder/gate/ holds distance-sites.tsv and suite-compiled.tsv, no checker-count.txt. climb-batch-workflow.md:248 heading found.
5. Said elsewhere: F-53: "that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`". P-39: "the field `expectedCheckerCrash` of the batch's manifest". references/compiler.md:4 and :273 describe checker-count/run.sh.
6. Curator's words: none in the history

## F-67
1. Sources: compile-ladder/rung-nat-checker/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 481, 1232, 1630, 2285, 2623
3. Cited by: FACTS/POSITIONS: F-20, F-36, F-61, P-84; skills: none
4. Exists today: compiler_tests NatInferredChecker, NatWrittenChecker, NatMethodChecker, NatExportChecker, XXXNatBoolChecker, XXXNatMismatchChecker all found. Row 406: NEGATIVE-VERIFIED (claim 'open' agrees; ledger text: boolean arguments not compared, `Flag[\true\]`/`Flag[\false\]` passes the checker). F-146 and F-69 cited.
5. Said elsewhere: F-48: "Two boolean arguments count as no exclusion: `object F extends { Flag[\true\], Flag[\false\] }` passes the checker and dies in code generation (row 406". F-167 also names row 406. F-69 carries the 'Could not infer static argument' message.
6. Curator's words: none in the history

## F-68
1. Sources: compile-ladder/rung-nat-checker/REPORT.md: file ok; sec 5 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1235, 1633, 2626
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: compiler_tests NatOverrideChecker, XXXNatRetSizeChecker found. Papers/Types/overloading-check.tick found.
5. Said elsewhere: F-38: "The checker's return-type rule compares the arms' own sizes (row 410)" (row 410 FIXED). F-35 describes the `subarray` methods with `nat o`; F-90 mentions `__ImmutableSubArray1`.
6. Curator's words: none in the history

## F-69
1. Sources: compile-ladder/rung-unknown-size-arm/REPORT.md: file ok; sec 10 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1241, 1639, 2632
3. Cited by: FACTS/POSITIONS: F-50, F-67; skills: none
4. Exists today: compiler_tests NatKnownSizeArm found; XXXNatUnknownSize* found (6 files). Rows: 400 NEGATIVE-VERIFIED, 446 NEGATIVE-VERIFIED (entry says both open; agrees; entry says rows have no test).
5. Said elsewhere: F-67 gives the same message: "A call that leaves a size unknown is refused, 'Could not infer static argument ... without context'; F-69 gives when an overload set is refused". F-50 cites F-69. No skill text.
6. Curator's words: none in the history

## F-70
1. Sources: compile-ladder/rung-checker-contexts/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; no earlier texts listed
3. Cited by: FACTS/POSITIONS: F-87; skills: none
4. Exists today: compiler_tests/MethodStaticArgsBoundNamesOther* found (4 files). Row 470 NEGATIVE-VERIFIED (agrees: open); row 651 FIXED (agrees: fixed). Also cites rung-checker-contexts/REPORT.md section 6 (file found; `## 6. Programs run old against new` exists).
5. Said elsewhere: references/compiler.md:174 "'No such method F.n.'. Walk runs the call (ledger row 1093)" (a different case: bound names `F extends H`). F-291: "are refused, or pass unchecked where the static argument is written (row 470)". F-59 and F-87 cross-cite.
6. Curator's words: none in the history

## F-71
1. Sources: compile-ladder/rung-exclusion-remainder/REPORT.md: file ok; sec 15 ok
2. Commit: first block numbered, commit `a74f5a2b7`; no earlier texts listed
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: Specification/basic/expressions/typecase.tex:15 holds `\note{This section should be revised according to the changes in the pattern matching proposal.}` (found). Row 460: NEGATIVE-VERIFIED (entry says 'Row 460 records both refusals'; ledger claim agrees). No test named.
5. Said elsewhere: references/compiler.md:148 "Bind the selector to a variable first, as `x = 7`, then write `typecase x of ...`". F-382: "An element of a tuple of names, as `(x, y) =>`, is the team's binding form and binds". F-134 (cited) not grepped.
6. Curator's words: none in the history

## F-72
1. Sources: compile-ladder/rung-comprises-checker/REPORT.md: file ok; sec 6 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 725, 1250, 1648, 1834, 1899, 2041, 2145, 2255, 2351, 2641
3. Cited by: FACTS/POSITIONS: F-62; skills: none
4. Exists today: compiler_tests/ComprisesGenericSubtrait found (2 files). Rows 354, 487, 489, 490 all NEGATIVE-VERIFIED (entry says 487 hole, 489 and 490 open; agrees).
5. Said elsewhere: F-76: "so a type in another component below a generic subtrait escapes it (row 487)". F-29: "`XXX` tests of rows 487 (a type of another component below a generic subtrait of a closed trait)". P-44 holds the decision.
6. Curator's words: "by the scrape: status and planning references deleted, at the curator's word of 2026-10-22" (block 2026-10-22 12:37Z, FACTS-history.md); no verbatim quote

## F-73
1. Sources: compile-ladder/rung-inference-checker/REPORT.md: file ok; sec 3.2 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 822, 1253, 1651, 1837, 2655
3. Cited by: FACTS/POSITIONS: F-51, F-55; skills: fortress-repo/references/sources.md
4. Exists today: compiler_tests NatLitArgChecker, CoercionGenericFnCompiledRungC, InferCoercionShapes, XXXInferAmbiguousCoercion found. Rows 506, 507 NEGATIVE-VERIFIED (entry says open-ish refusals; agrees). F-342 cited.
5. Said elsewhere: revival-changes.md:103 "Promotion instantiates a generic declaration at the narrowest type into which all its arguments coerce (P-74)" and "both paths stop: 'Ambiguous coercion'". F-55: "takes the narrowest type into which its arguments convert"; F-173 same rule restated. compiler.md:134 'Ambiguous coercion in call to operator ='.
6. Curator's words: "by the scrape: status and planning references deleted, at the curator's word of 2026-10-22" (block 2026-10-22 12:37Z, FACTS-history.md); no verbatim quote

## F-74
1. Sources: compile-ladder/rung-numeral-types/REPORT.md: file ok; "What changed and why" ok; reviews/numeral-switch-judgement.md: file ok; sec 2 ok, sec 3 ok
2. Commit: first block numbered, commit `a74f5a2b7`; no earlier texts listed
3. Cited by: FACTS/POSITIONS: F-118, F-262, F-263, P-76; skills: fortress-repo/references/sources.md
4. Exists today: No test named. Row 962: CONTESTED (entry: 'where P-173 makes it a ZZ32 (F-140; row 962)'). reviews/numeral-switch-judgement.md found, sections 2 and 3 ok. FACTS history: its 2026-11-17 10:04Z block says rung O made the five number types objects (F-379) and removed walk's native objects.
5. Said elsewhere: revival-changes.md:93 "A numeral converts where it stands (P-173)." and :97 "Such a parameter of 2^31 or more is a `ZZ64` under walk". F-73: "that reading builds P-173's rule for a tied integer numeral". F-342, F-140, F-344 cited.
6. Curator's words: none in the history

## F-75
1. Sources: compile-ladder/rung-return-type-rule/decision-record.md: file ok; sec 1 ok, sec 2 ok; compile-ladder/rung-return-rule-object/REPORT.md: file ok; "What changed and why" ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1551, 1657, 2661
3. Cited by: FACTS/POSITIONS: F-50, F-242, P-45; skills: fortress-repo/references/sources.md
4. Exists today: compiler_tests OverloadGeneric* (6), OverloadBoundNamesForced, OverloadReturnObjectDomain, XXXOverloadReturnEveryInstance, XXXOverloadReturnObjectDomainOtherType, XXXOverloadGenericObjectDomainByPosition, XXXOverloadPermutedStaticParams, XXXOverloadReturnTupleDomain all found. Row 542 FIXED (agrees), row 1048 NEGATIVE-VERIFIED (agrees: open). Papers/Types found as directory.
5. Said elsewhere: compiler.md:173 "`Circle` an object (ledger row 1048). Walk loads and runs the pair." F-50: "also refuses some pairs that the paper accepts, by its Return Type Rule and by its positional rule". F-376 and F-361 name row 542; F-44 and F-275 treat the Return Type Rule.
6. Curator's words: "by the scrape: status and planning references deleted, at the curator's word of 2026-10-22" (block 2026-10-22 12:37Z, FACTS-history.md); no verbatim quote

## F-76
1. Sources: compile-ladder/rung-return-type-rule/decision-record.md: file ok; sec 3 ok, sec 4 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1554, 1660, 2664
3. Cited by: FACTS/POSITIONS: P-60; skills: fortress-repo/references/sources.md
4. Exists today: compiler_tests/*Comprises* found (69), *CoverageReturn* found. Rows 487, 546 NEGATIVE-VERIFIED; 547 CONTESTED; 559 NEGATIVE-VERIFIED (entry calls them open; 547 is CONTESTED, not stated by the entry). Specification overloading.tex:282 `The Meet Rule for Functions` found; changes.tex:3688 `revival-meet` label found. Last history block 2026-11-24 08:12Z (batch 36).
5. Said elsewhere: F-408 "gives how it decides, refuses or keeps any other tie" (entry's own pointer) and names `CoverageReturnGenericFamily`; F-386 names `CoverageReturnMethodCall`. compiler.md:160 states row 559 ('Unable to read serialized data for Intersection??').
6. Curator's words: "by the scrape: status and planning references deleted, at the curator's word of 2026-10-22" (block 2026-10-22 12:37Z, FACTS-history.md); no verbatim quote

## F-77
1. Sources: compile-ladder/rung-overload-families/REPORT.md: file ok; sec 4 ok
2. Commit: first block numbered, commit `a74f5a2b7`; no earlier texts listed
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: tests/LibraryOverloadFamilies.fss found. Rows 555 CONTESTED, 589 NEGATIVE-VERIFIED (entry only cites them). P-98 and P-45 cited.
5. Said elsewhere: revival-changes.md:24 "`excludes { Number }`, or, where the trait itself extends `Number`, `excludes { HasRank }`". F-141: "dispatch when its arguments have several minimal common supertypes (row 589), whose repair changes which declaration runs, the curator's to decide". F-44 mentions `TotalComparison extends StandardMinMax`.
6. Curator's words: none in the history

## F-78
1. Sources: compile-ladder/rung-instance-bound/REPORT.md: file ok; sec 1 ok, sec 7 ok; compile-ladder/rung-instance-bound/decision-record.md: file ok; 
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1843, 2044, 2086, 2148, 2221, 2670
3. Cited by: FACTS/POSITIONS: F-55; skills: fortress-repo/references/sources.md
4. Exists today: compiler_tests InferResultOnly* (16) and InferContextKeepsFit found. Functionals.scala:962-966 found but holds `counted` and `holds` helpers, comments on attempts by subtyping/coercion; the four-attempt order itself is not stated in those lines (`sed -n 962,966p`). decision-record.md D4 found at :57 (its words: 'subtyping without the context, then subtyping with it, then coercion with it, then coercion without it'). Rows 507 NEGATIVE-VERIFIED, 541 FIXED, 559 NEGATIVE-VERIFIED.
5. Said elsewhere: revival-changes.md:68 "The checker takes the intersection of its upper bounds, narrowed by the expected type". F-84 and F-271 restate it; compiler.md:160 states row 559. F-87 cites InferResultOnly*.
6. Curator's words: "by the scrape: status and planning references deleted, at the curator's word of 2026-10-22" (block 2026-10-22 12:37Z, FACTS-history.md); no verbatim quote

## F-79
1. Sources: compile-ladder/rung-static-numerals/REPORT.md: file ok; "1. What changed and why" ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1846, 1905, 2673
3. Cited by: FACTS/POSITIONS: F-32, F-57, F-74, F-299, F-131, F-304; skills: fortress-repo/references/sources.md
4. Exists today: Library/FortressLibrary.fsi:456-464 holds Numeral, AnyNaturalNumeral, AnyRadixPointNumeral, NaturalNumeral, RadixPointNumeral (found). compiler/Types.java:85-95 INT_LITERAL/FLOAT_LITERAL name NaturalNumeral/RadixPointNumeral under both library setups (found). tests/NumeralTypesWalk.fss, NumeralOwnTypeWalk.fss, NumeralStaticDesignWalk.fss found. History: 2026-11-17 10:04Z block, rung O made the number types objects.
5. Said elsewhere: revival-changes.md:93 "A numeral's own type is `NaturalNumeral[\n, r, v\]`, or `RadixPointNumeral[\n, m, r, v\]` with a radix point (P-174)." F-57 and F-342 say the same; compiler.md:145,148 and interpreter.md:29 mention them.
6. Curator's words: none in the history

## F-80
1. Sources: compile-ladder/rung-overloading-checker/REPORT.md: file ok; sec 5 ok, sec 7 ok; compile-ladder/rung-checker-abstract-callsite/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1849, 2105, 2676
3. Cited by: FACTS/POSITIONS: F-77; skills: fortress-repo/references/sources.md
4. Exists today: compiler_tests FunctionalMethodMeet*, XXXFunctionalMethodMeetAbstractSibling, XXXFunctionalMethodMeetOperatorChecker, XXXNoDuplicatesRuleAbstract found. Row 570 NEGATIVE-VERIFIED (agrees: unchecked).
5. Said elsewhere: interpreter.md:61 "the No Duplicates Rule, the Meet Rule and the Return Type Rule" (walk's). F-142 (walk's twin): "Gated by `tests/FunctionalMethodMeet*`". F-276 and F-399 name FunctionalMethodMeet tests; F-252, F-257, F-274 hold the No Duplicates Rule.
6. Curator's words: none in the history

## F-81
1. Sources: compile-ladder/rung-library-meets/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1852, 1908, 2269, 2679
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: tests/LibraryMeetDeclarations.fss found. No ledger row named. F-245, F-276, F-278, F-281, F-85 cited.
5. Said elsewhere: F-276 "String's four concatenation families are three top-level operators each, as juxtaposition's are". F-85 and F-285: `__bigOperator2`'s fused arm casts to `O0`. library.md:16 mentions `__bigOperator2` (different point).
6. Curator's words: none in the history

## F-82
1. Sources: compile-ladder/rung-range-meets/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 1911, 2113, 2202, 2318, 2354, 2682
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: tests/RangeDeclarations.fss found. Rows 580 FIXED (agrees), 603 NEGATIVE-VERIFIED (agrees: open library bug). F-89, F-278 cited.
5. Said elsewhere: No other place states row 603's `SimpleReversedIndexed(mapped(seq(1,3,5,7)))` string (`grep -rn SimpleMappedSeqIndexed` over FACTS and skills: no hit outside F-82). F-89 holds the ranks' kinds.
6. Curator's words: none in the history

## F-83
1. Sources: compile-ladder/rung-string-slips/REPORT.md: file ok; sec 4 ok, sec 8 ok
2. Commit: first block numbered, commit `a74f5a2b7`; no earlier texts listed
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: tests/StringPieces.fss, tests/XXXSubscriptImplicitStridedRange.fss found; Library/String.fss, Library/FlatString.fss found. Rows 607, 609 NEGATIVE-VERIFIED (agree: open library bugs). F-53, F-259, F-286 cited.
5. Said elsewhere: F-286 and F-297 list `rangeContains` and `splitWithOffsets` among String members the component's trait lacked. F-90: "`tests/StringPieces.fss` and `tests/NumberOrderListDeclarations.fss` check the `String` and `QQ` parts".
6. Curator's words: none in the history

## F-84
1. Sources: compile-ladder/rung-number-order-slips/REPORT.md: file ok; sec 1 ok, sec 4 ok, sec 5 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 2227, 2266, 2688
3. Cited by: FACTS/POSITIONS: F-265; skills: none
4. Exists today: tests/NumberOrderListDeclarations.fss found; Library/CompilerLibrary.fsi:33 `fail(s: String): Zilch` found (agrees); commit 0886e9654 exists (`git cat-file -t`: commit); Library/FortressLibrary.fsi:1264 `object MatchFailure extends UncheckedException` (agrees). Row 590 FIXED (agrees). Not checked: research/extracts/ParkPOPL2019.txt:437-438, the 2012 Types chapter. Last history block 2026-11-09 08:18Z made it true again after landed rungs.
5. Said elsewhere: F-90: "`tests/StringPieces.fss` and `tests/NumberOrderListDeclarations.fss` check the `String` and `QQ` parts". F-265 cites F-84. P-48 (cited) holds the result-only parameter rule; revival-changes.md:68 states it. No other place mentions `Zilch` or `MatchFailure`.
6. Curator's words: "by the scrape: status and planning references deleted, at the curator's word of 2026-10-22" (block 2026-10-22 12:37Z, FACTS-history.md); no verbatim quote

## F-85
1. Sources: compile-ladder/rung-generator-slips/REPORT.md: file ok; sec 5 ok, sec 8 ok; compile-ladder/rung-body-arguments/REPORT.md: file ok; sec 9 ok
2. Commit: first block numbered, commit `a74f5a2b7`; no earlier texts listed
3. Cited by: FACTS/POSITIONS: F-81, F-250; skills: none
4. Exists today: Library/FortressLibrary.fss:1670 `cast[\O0\]((outer'.unwrap)(gg'.generate2...` found (agrees). tests/GeneratorDeclarations.fss, NestedReductionFusion.fss found. Rows 628, 629, 632 FIXED (entry says cleared; agrees). F-250, F-93, F-144, F-264, F-53 cited.
5. Said elsewhere: F-81: "`__bigOperator2`'s fused branch, whose arm's type the `typecase` cannot show, casts its result to the declared `O0` (F-85)". F-285: "`__bigOperator2`'s fused arm casts its result to `O0`". F-248 and F-253 name the two tests.
6. Curator's words: none in the history

## F-86
1. Sources: compile-ladder/rung-checker-defects/REPORT.md: file ok; sec 4 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 2047, 2357, 2694
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: compiler_tests Varargs* (11 files, includes XXXVarargs*) found. Row 604 NEGATIVE-VERIFIED (entry cites it for refusal under the prelude; agrees). Specification/basic/overloading.tex:246 `Applicability for Functionals with Varargs and Keyword Parameters` found. F-390 cited.
5. Said elsewhere: compiler.md:45 "it refuses a varargs parameter: 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray'". F-320 repeats it. F-390: "passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]`".
6. Curator's words: none in the history

## F-87
1. Sources: compile-ladder/rung-checker-contexts/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 2108, 2192, 2296, 2697
3. Cited by: FACTS/POSITIONS: F-55, F-56, P-50; skills: coordinator/SKILL.md, coordinator/references/record.md, fortress-repo/references/records.md, fortress-repo/references/sources.md
4. Exists today: compiler_tests InferResultOnly* (16, includes InferResultOnlyLabelBody.test) found; Infer*Context found (e.g. InferCallArgumentContext). Specification/basic/inference.tex found; `The Static Arguments of a Call` is a section (:45); "The expected type" is not a section or paragraph heading there (`grep -nE '\\(sub)*section|\\paragraph'` finds two sections). No rows named. F-221, F-226, F-70 cited. Last history block 2026-11-17 07:11Z.
5. Said elsewhere: revival-changes.md:68,74,122,124 and library.md:25 speak of the expected type. F-56: "keeps the expected type, for inferring the call's static arguments, at a call written `f(x)`". F-55, F-73, F-78, F-84, F-221, F-364 also mention it.
6. Curator's words: none in the history

## F-88
1. Sources: compile-ladder/rung-checker-overloading/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists line 2700
3. Cited by: FACTS/POSITIONS: F-80; skills: fortress-repo/references/sources.md
4. Exists today: compiler_tests Override* found (10). No rows named. F-400 cited. Last history block 2026-11-23 16:08Z (batch 35).
5. Said elsewhere: F-147 (walk's twin): "Gated by `tests/Override*Walk.fss` and `AbstractOverrideUndefinedWalk`". compiler.md:173 "The checker also applies the rule where a type redeclares an inherited getter".
6. Curator's words: none in the history

## F-89
1. Sources: compile-ladder/rung-range-types/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 2151, 2703
3. Cited by: FACTS/POSITIONS: F-82; skills: none
4. Exists today: tests/RangeKindBodies.fss found. No rows named. F-82 cites F-89 for the ranks' kinds.
5. Said elsewhere: No place besides F-89 mentions `BoundedRange2D` or `RangeKindBodies` (`grep` over FACTS and skills).
6. Curator's words: none in the history

## F-90
1. Sources: compile-ladder/rung-library-slips/REPORT.md: file ok; sec 1 ok, sec 6 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 2419, 2706
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: tests/TransposedMatrixAndFreeze.fss, IntegerOrderNumerals.fss, StringPieces.fss, NumberOrderListDeclarations.fss found; Library/FortressLibrary.fsi found. Row 661 NEGATIVE-VERIFIED (agrees: open). F-151, F-264, F-53 cited. P-53, P-54 cited.
5. Said elsewhere: F-264: "The factory branches are those of `__builtinFactory1`, `__immutableFactory1` and `__builtinFactory2` ... each cast to its factor". F-83: `String`'s `left`/`right` not restated (F-83 names only `rangeContains`). No skill text on `SUFFIX_SUM`.
6. Curator's words: none in the history

## F-91
1. Sources: compile-ladder/rung-range-kinds/REPORT.md: file ok; sec 1 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists line 2709
3. Cited by: FACTS/POSITIONS: none; skills: none
4. Exists today: tests/RangeNarrowKinds.fss found. Row 416 NEGATIVE-VERIFIED (agrees: walk's defect). P-52, P-56 cited.
5. Said elsewhere: P-52: "`narrowToRange` on a range of rank 2 or 3 checks containment corner by corner." Row 416: revival-changes.md:28 and interpreter.md:71 ("`g(b: Tg[\3\])` beside `g(b: Tg[\4\])` (ledger row 416)"); F-44, F-129 also.
6. Curator's words: none in the history

## F-92
1. Sources: compile-ladder/rung-tuple-orders/REPORT.md: file ok; sec 1 ok, sec 6 ok
2. Commit: first block numbered, commit `a74f5a2b7`; header lists lines 2277, 2360
3. Cited by: FACTS/POSITIONS: none; skills: fortress-repo/references/sources.md
4. Exists today: tests/TupleOrder* found (7). Row 511 NEGATIVE-VERIFIED (agrees). 
5. Said elsewhere: revival-changes.md:55 "**Pairs and triples are ordered only where each element type extends `StandardPartialOrder`.**" and "(1,2) < (1,2.5) (row 511)". F-137 names row 511; F-168 names StandardPartialOrder.
6. Curator's words: none in the history

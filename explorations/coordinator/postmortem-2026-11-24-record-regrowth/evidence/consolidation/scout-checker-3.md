<!-- Scout evidence for chunk checker-3 (section "The checker and the one library", 30 entries F-93 to F-278) of the FACTS consolidation of 2026-11-24: for each entry its sources, commit, citers, what exists today, where else it is said, and the curator's words; evidence only, no opinion on cuts. Gathered with facts-extract.sh, git log -S, git ls-files and grep on the tree at HEAD. -->

Notes for all blocks. "Src OK" = file exists and each cited numbered heading exists (checked against the file's `#` lines). Commit: the history's own first-block commit where it names one, else `git log -S'- F-N **' -- FACTS.md` first add. Cited by: FACTS entries / POSITIONS / `.claude/skills/` (only `references/sources.md` line, the skill maintenance file, ever matches; SKILL.md and the other references never name these numbers). Said elsewhere: grep of `.claude/skills/fortress-repo/` and FACTS. Curator: no history of any entry holds a quote of the curator; the only mention is the provenance "by the scrape: status and planning references deleted, at the curator's word of 2026-10-22" (2026-10-22 12:37Z), on F-93, F-225, F-245, F-250, F-251, F-255, F-256.

## F-93
Src: compile-ladder/rung-generator-size/REPORT.md §1, §6: OK.
Commit: numbered a74f5a2b7 (2026-10-13 17:58Z); first add a88e52bf78.
Cited by: F-85 ("F-93 how library code reads a generator's size and index (row 629)"); P none; skills none.
Exists: tests/GeneratorSize.fss found (also RelationalPredicateTargets.fss, IndexValuePairsDefault.fss, named in history). Row 629 (history only): FIXED.
Said elsewhere: grep 'SimpleIndexValuePairs', 'counted default', 'RelationalPredicate': none.
Curator: scrape line above (7 entries).

## F-94
Src: rung-array-bound/REPORT.md §1, §9; rung-checker-bounds/REPORT.md §1: OK.
Commit: numbered a74f5a2b7; first add a88e52bf78.
Cited by: none (F, P, skills).
Exists: compiler_tests `OverloadTwoBoundsClosed*` and `*TwoBoundsClosedTrait`: found (16 files). Rows 686, 687, 688, 689, 690: all FIXED (agrees).
Said elsewhere: F-227 "so a call through a parameter bounded by a closed trait ... checks (rows 686, 687, 689, 690 and 711)"; F-151: "the norm's `squaredNorm(me)` (F-227)"; F-90: "declare the array family's bound `T extends { Number, MultiplicativeRing[\T\] }`, which F-151 owns".
Curator: none.

## F-220
Src: rung-walk-elements/REPORT.md §6: OK (history cites rung-library-followups/REPORT.md "2. `__bigOperator`'s `body(i)`: written, run, held": OK).
Commit: first add 604d0e23cb (2026-10-14).
Cited by: none.
Exists: `Library/FortressLibrary.fss:1511` `body(i: I): L = r.lift((o.body)(i))`: found. No row.
Said elsewhere: F-228 "the library types `__bigOperator`'s local function `body(i: I)` at the element type `I`"; library.md:16 on `__bigOperator`.
Curator: none.

## F-221
Src: rung-argument-context/REPORT.md §1, §5, §8: OK; SKEPTIC.md beside it exists (its findings are numbered in text, not headings).
Commit: first add 0856f3e6a9.
Cited by: F-59, F-87; sources.md:794.
Exists: compiler_tests `InferCallArgument*`, `InferBigOperatorExpectedType`: found. Row 705: NEGATIVE-VERIFIED (agrees: "Walk gives such an argument no expected type").
Said elsewhere: F-87 "call against each declaration's parameter type, as P-51 decides (F-221)"; F-292 names XXXInferCallArgumentControls.
Curator: none.

## F-225
Src: rung-self-type/REPORT.md §1, §2, §4, §7; rung-self-type-exclusion/REPORT.md §1: OK. Also cites Papers/Types/journal/justificationOfRTR.tex:626-630, Library/CompilerAlgebra.fsi, commit 655e65d53 (not checked).
Commit: first add 1c32ccffdb; history: scrape rewrite 2026-10-22 12:37Z.
Cited by: F-277, F-408; P-146; sources.md:793,810,820,1355,1491,1492.
Exists: compiler_tests `SelfType*`/`XXXSelfType*`: found (43 files). Rows: 355 NEGATIVE-VERIFIED (entry: refused "rightly", agrees); 695, 1050, 1051, 1052 FIXED (agree); 1094 NEGATIVE-VERIFIED (entry names it as a departure; agrees). F-377, F-385, F-394 not read.
Said elsewhere: revival-changes.md:36 "**In a self-typed trait the checker types `self` as the trait met with the implementing type.**"; F-394 "a dotted method so redeclared below a self-typed trait still reads the trait's rec..."; F-318, F-277 repeat the exclusion-test reading.
Curator: scrape line.

## F-226
Src: rung-overloading-checker/REPORT.md §6; rung-checker-expected-type/REPORT.md §1: OK.
Commit: first add cf20f71d0b (2026-10-14 11:39).
Cited by: F-87.
Exists: compiler_tests `InheritedMethodStaticParamSameName`, `InheritedMethodByNameStaticParamSameName`, `MethodStaticArgReceiverSameName`: found. `scala_src/useful/STypesUtil.scala` found. Rows 561, 627: FIXED (agree).
Said elsewhere: F-87 "F-226 gives how it renames an inherited method's static parameters at a call". grep 'commonInheritedMethods': none elsewhere.
Curator: none.

## F-227
Src: rung-checker-bounds/REPORT.md §1, §6: OK.
Commit: first add f237148ac1 (2026-10-14 14:58).
Cited by: F-94, F-151.
Exists: compiler_tests `*TwoBoundsClosedTrait`, `*TwoGroundBounds*ClosedTrait`, `OverloadTwoBoundsClosedTraitExclusion`: found; tests/OverloadTwoBoundsClosedTraitExclusionWalk found. `TypeAnalyzer.scala` found. Rows 686, 687, 689, 690, 711 FIXED; 712 NEGATIVE-VERIFIED ("open defect", agrees); 713 CONTESTED (agrees).
Said elsewhere: F-94 "one cause, the normal form's expansion of the closed trait over a conjunct that names the variable, which F-227 gives"; F-277 "row 713's pair is accepted and runs, and walk refuses it at load"; F-76 on closed traits.
Curator: none.

## F-231
Src: perf-probes/checker-speed-2/REPORT.md §2, §6 (history §1 "In short"): OK.
Commit: a0205c127 (history); first add dfc92d9a55.
Cited by: F-236; sources.md:671.
Exists: `WalkerJUTest.java` found (scala_src/nodes/); generated FortressAst.scala found; `WALKER_CASES_PER_METHOD` in astgen/ScalaAstGenerator.java:626-650 found. Row 680 FIXED.
Said elsewhere: compiler.md:263 "`Walker` ... is split into methods under 8,000 bytes of bytecode. HotSpot does not compile a longer method, and the walker runs on every node. `MethodSizeJUTest` fails if..."; F-236 "`WalkerJUTest` still guards `Walker` (F-231)".
Curator: none.

## F-232
Src: rung-ast-hashes/REPORT.md §4.2 to §4.4: OK.
Commit: first add dfc92d9a55; history: perf-probes/checker-speed-2/REPORT.md "9. Row 488...".
Cited by: F-254; sources.md:671.
Exists: build.xml:698-716 found (comment "Hash each node apart from the JVM's identity hashes"); `NodeHash.java`, `NodeHashJUTest.java`, `OmittedReturnTypeFromApi` found; NodeFactory.java:1166-1184 `new Object()` id found; `_WrappedFValue.java:170-177` found. Rows 430 NEGATIVE-VERIFIED, 737 FIXED (agree).
Said elsewhere: F-354 "in an order that follows the JVM's identity hashes (row 996)"; F-408 "no longer follow the JVM's identity hashes".
Curator: none.

## F-233
Src: compile-ladder/rung-checker-bounds/REPORT.md §6: OK (history: climb-batch-15b/RECORD.md "What landed").
Commit: e4dabaa0c (history); first add dfc92d9a55.
Cited by: F-53, F-54, F-231.
Exists: compiler_tests `LocalFunctionSiblingInLoop`, `LocalFunctionSiblingCall`, `XXXLocalFunctionRecursiveUntypedReturn`: found. Row 680 FIXED.
Said elsewhere: F-231 "the repair that lets the checker check a block's local functions (row 680; F-233)"; F-53 "nothing crashes (F-233)".
Curator: none.

## F-235
Src: rung-solver-speed/REPORT.md §1, §4, §6, §7: OK.
Commit: first add ee6bfcb8d4 (2026-10-16 17:27).
Cited by: F-231, F-240.
Exists: ReductionMemoJUTest.scala, ExclusionMemoJUTest.scala, TraitTableMemoJUTest.scala found (scala, not .java). Switches `fortress.analyzer.reduce.cache` (TypeAnalyzer.scala:633), `.exclusion.cache` (:430), `.typecons.cache` (TraitTable.scala:37): found. Entry's cited lines (TypeAnalyzer 601-621, 412-443, 994-1024; TraitTable 150-156, 34-68) not checked.
Said elsewhere: F-65 memo of `TypeAnalyzer.parents` (different memo); F-43 overloading memo; compiler.md:277 "If the pass reuses an answer that the checker computed earlier, as a memo does, audit it".
Curator: none.

## F-236
Src: rung-solver-speed/REPORT.md §8: OK.
Commit: first add ee6bfcb8d4.
Cited by: none.
Exists: MethodSizeJUTest.java (tests/unit_tests/) found; `grep -c 'listed("'` = 12; the twelve named in the entry match its list (NodeReader.readNode, 3 pCharLiteralContent$1, ExprDisambiguator.walk, Misc.checkExprMisc, HygienicRenamer.walk, MagicNumbers.<clinit>, 4 DirectedRoundingTestData).
Said elsewhere: compiler.md:263 "`MethodSizeJUTest` fails if a method of the build grows past the limit, except the methods that its source lists in `listed(...)` entries"; compiler.md:280; F-231.
Curator: none.

## F-237
Src: rung-checker-abstract-callsite/REPORT.md §1, §6: OK; SKEPTIC.md §5.1, §5.2 (headings "5.1 A call held by a local variable...", "5.2 A second call...") and JUDGE.md exist.
Commit: first add c23b85fdc2 (2026-10-16 17:32).
Cited by: none.
Exists: compiler_tests `XXXStaticArgBoundAtCall*`, `XXXStaticArgBoundNestedCall`, `XXXIllFormedTypeAtDeclarationOnce`: found. `TypeWellFormedChecker.scala` found. Row 776 NEGATIVE-VERIFIED (agrees, "still open").
Said elsewhere: grep 'TypeWellFormedChecker', 'ill-formed': nothing stating the same (F-184, F-121 use "ill-formed" for other cases).
Curator: none.

## F-240
Src: reviews/batch-16, -17, -21b, -22, -22c, -23, -24, -25, -26, -27, -31, -32 review.md at the cited section numbers: all OK. Also compile-ladder/climb-batch-36/gate/distance.txt exists (`#total 0`); climb-batch-36 is the newest gate directory. Times (65 s, 117 s) are not in a file I read.
Commit: f98ad813f (history, 2026-10-16 19:13Z); first add 7a58250bfe. History: 41 blocks (a time log, rewritten each batch).
Cited by: F-65, F-231; sources.md:1101.
Exists: no test, no ledger row named.
Said elsewhere: F-65 "626 at the distance stage and 75 at the count stage. With the memo off, the count stage's 900-second limit stopped it"; F-231 "count stage from 911 s to about 340 s ... F-240 gives the stages' times now"; F-235 "count stage went from 437 s to 97 s"; F-277 "the count stage under it is 98".
Curator: none.

## F-242
Src: perf-probes/where-clauses/REPORT.md A.1, A.2.1 (history: "A.8 Decisions, defects, hand-overs (Part A)"); perf-probes/generic-distribute/REPORT.md §3, §4: OK.
Commit: first add 7a58250bfe (2026-10-16 19:13).
Cited by: F-243, F-250; P-151.
Exists: no test named. Row 433 FIXED (agrees "Row 433, fixed"). F-75, F-250 not re-read.
Said elsewhere: F-243 "The method condition and the generic `distribute` clear the fusion pairs' 6 (F-242)"; F-250 "F-242's (the generic `distribute`, and the `where` conditions on `SumReduction`'s `distribute` overloads for `MAX` and `MIN`)".
Curator: none.

## F-243
Src: perf-probes/where-clauses/REPORT.md A.0, A.1, A.4, B.0, B.3; reviews/batch-17-review.md §2: OK.
Commit: first add 7a58250bfe.
Cited by: none.
Exists: no test named. Rows 436 NEGATIVE-VERIFIED (class: walk, an empty SUM ends in `CastError`; the entry says the cast at the fallbacks "clears 2 (row 436)" distance errors); 634 FIXED (agrees "cleared").
Said elsewhere: F-242 (fusion pairs' 6), F-251 ("the distance went from 49 to 45, row 636's four sites"), F-255 ("cleared the distance's site of `LexicographicOrder`'s `a CMP b`"), F-85 (casts at the fallbacks).
Curator: none.

## F-244
Src: perf-probes/where-clauses/REPORT.md B.1, B.3, B.6: OK.
Commit: first add 7a58250bfe.
Cited by: none.
Exists: no test named. Rows 748 FIXED, 775 FIXED, 751 and 752 NEGATIVE-VERIFIED ("two other open rows", agrees), 773 NEGATIVE-VERIFIED (agrees "stands").
Said elsewhere: revival-changes.md:81 "Walk and the compiled runtime apply a conditional extension without its condition (row 774). Walk runs a dotted call that breaks a method's condition (row 777)."; F-255 (row 773), F-256 (row 748), F-251 (Amin and Tate's unsoundness example refused).
Curator: none.

## F-245
Src: rung-symbolic-check/REPORT.md §5; climb-batch-21/RECORD.md "The tests on the merged tree"; reviews/batch-21-review.md §1; perf-probes/symbolic-operators-2/REPORT.md §0, §2; symbolic-operators/REPORT.md §1.5: OK.
Commit: first add 7a58250bfe; history 11 blocks.
Cited by: F-81, F-142, F-276, F-278, F-281.
Exists: `perf-probes/symbolic-operators-2/run-shadow.sh`: checked as named in entry, entry itself says its edits "no longer match the tree". Row 611 NEGATIVE-VERIFIED (agrees, walk skips symbolic operators); 809 FIXED (agrees). climb-batch-36/gate/distance.txt `#total 0` (entry: "gives 0 since climb batch 22").
Said elsewhere: F-276 "the full check went 191 to 137, the 54 of F-245 gone"; F-277 "(191 to 183...)"; F-278 "(191 to 67 with this change alone, on climb batch 21's base, F-245)".
Curator: scrape line.

## F-250
Src: rung-library-distribute/REPORT.md §1 (history "7. The count and the distance"): OK.
Commit: first add 2b1cd8e639 (2026-10-17 17:35).
Cited by: F-85, F-242, F-244; sources.md:794,801.
Exists: compiler_tests `WhereBoundMethodChecker`, `XXXWhereBoundFunctionCall`: found. Row 470 NEGATIVE-VERIFIED (agrees "A hole remains").
Said elsewhere: F-256 "These checks moved no site..." and F-256 on where constraints at a dotted call; F-244 "F-250 (row 470) and F-256 give the constraints that the checker does not yet read"; F-70 "not one written at a top-level function call".
Curator: scrape line.

## F-251
Src: rung-anylist-comprises/REPORT.md ("What changed and why", "The test first, then the fix" headings; entry gives no section numbers): OK.
Commit: first add 24db899faa (2026-10-17 17:38).
Cited by: F-121, F-243, F-244, F-270; sources.md:726,794,801.
Exists: compiler_tests `OpenTypeChecker`, `XXXOpenTypeEscapeChecker`, `XXXOpenTypeTwoChecker`, `XXXOpenTypeBoundEvidenceChecker`; tests `OpenTypeWalk`, `AnyListElementTypeWalk`: found. Row 636 FIXED (agrees; row names fix 24db899fa, 49 to 45); row 752 NEGATIVE-VERIFIED (agrees).
Said elsewhere: compiler.md:184 "at a `where`-clause variable, as `NatParam comprises ...` or `AnyList comprises List[\E\] where [\E\]`: at a call, the checker gives the variable a fresh size or type"; F-243, F-244, F-270 ("An opened size is not known to differ from any size").
Curator: scrape line.

## F-254
Src: rung-checker-four-rows/REPORT.md §1, §5: OK.
Commit: first add 091ec54dfd (2026-10-17 17:46).
Cited by: F-232, F-370; sources.md:730,797.
Exists: compiler_tests `OmittedReturnTypeFromApi`, `OmittedMethodReturnTypeFromApi`: found. ApiTypeExtractor.scala (260 lines) found, `ExportChecker.equalTypes` at :195, :199; Library/FortressLibrary.fss:131 is `BIG LEXICO` text. Row 737 (F-232) FIXED.
Said elsewhere: F-370 "read in `scala_src/typechecker/ApiTypeExtractor.scala:52-188`. No test gates the whole: `compiler_tests/OmittedReturnTypeFromApi` gates the return type"; F-232.
Curator: none.

## F-255
Src: rung-checker-conditional-extension/REPORT.md §1, §6, §10: OK.
Commit: first add 372b9bf6a3 (2026-10-18 03:11); history 8 blocks.
Cited by: F-84, F-181, F-243, F-244; sources.md:714,715,725,793,794,801,812.
Exists: compiler_tests `CondExtendChecker`, `XXXCondExtend*Checker`, `CondExtendInheritedMember`, tests `XXXConditionalExtensionTypeTestWalk`: found. Library/List.fss:106-107 and :124-128 match the entry. Rows 773, 774, 781 NEGATIVE-VERIFIED (agree "open").
Said elsewhere: revival-changes.md:76 "The type extends the parent only where they hold, as `List[\E\]` extends `LexicographicOrder[\List[\E\],E\] where { E extends StandardTotalOrder[\E\] }`."; revival-changes.md:81 (row 774); F-400 (row 1106, 1107).
Curator: scrape line.

## F-256
Src: rung-checker-where-checks/REPORT.md §1, §6; SKEPTIC.md beside it exists: OK.
Commit: first add 396e4ed8da (2026-10-18 03:15).
Cited by: F-244, F-250, F-251; sources.md:713,724,794,801.
Exists: compiler_tests `XXXWhereBoundDottedCallChecker`, `WhereVariableBoundCallChecker`, `XXXWhereConstraintTypeUseChecker`, `XXXWhereConstraintExtendsChecker`, `XXXComprisesWhereBoundExtenderChecker`, `OpenTypeWhereConstraintChecker`, `XXXComprisesWhereConstraintExtenderChecker`, `OpenTypeWhereSelfBoundChecker`: found. Rows 470, 777, 778 NEGATIVE-VERIFIED (agree "open").
Said elsewhere: revival-changes.md:81 "Walk runs a dotted call that breaks a method's condition (row 777)."; F-250 "F-256 holds where the checker reads the constraints at a dotted call"; F-70.
Curator: scrape line.

## F-265
Src: compile-ladder/rung-result-bounds/REPORT.md §10: OK.
Commit: first add 0ae072be72 (2026-10-22 11:56), split from F-70.
Cited by: none.
Exists: Library/FortressLibrary.fss:33,39,49,65,69,72 each `extends Any` (cast, instanceOf, identity, shared, localize, copy): found. `git grep -nE '\[\\[^\\]*extends +Object' -- Library ProjectFortress/LibraryBuiltin` prints nothing (agrees). Specs `SpecData/examples/basic/Fun.Decl.fss:19`, `other_compiler_tests/Go1a.fss:15`: not checked. Row 471 NEGATIVE-VERIFIED, reproducer `none` (agrees "no test").
Said elsewhere: interpreter.md:136 "...stops there with the same message, as an `InterpreterBug` (ledger row 864)"; interpreter.md:85 "`f[\T extends Any\](x: T)`"; F-174, F-291 on `extends Any`.
Curator: none.

## F-266
Src: Specification/appendices/changes.tex `\subsection{The type of a parameter that a declaration leaves out}` at line 4091: OK.
Commit: first add bb39dbee3c (2026-10-22 12:03), split from F-42.
Cited by: F-370; sources.md:797.
Exists: compiler_tests `XXXLocalFunctionUntypedParam`, `XXXLocalFunctionUntypedParamInLoop`: found. `STypeEnv.scala` is at scala_src/typechecker/staticenv/; lines :75 and :200 hold "Missing parameter type for" (agrees). Rows 620, 621 FIXED (agree); 405 NEGATIVE-VERIFIED; 1032 CONTESTED (entry states its Java exception without that).
Said elsewhere: revival-changes.md:136 "**Write every parameter type.** The compiled checker refuses a parameter without a type, "Missing parameter type for", unless the exported api's declaration gives the type."; F-370.
Curator: none.

## F-267
Src: reviews/spec-refused-examples-judgement.md §4: OK.
Commit: first add bb39dbee3c, split from F-48.
Cited by: none.
Exists: AbstractMethodChecker.scala:100-101 found (filter on `meth2.name == meth.name` and selfPosition). Probes `OprSingle`, `OprInstancesOplus`: not in git ls-files by those names (entry says no ledger row or test holds it).
Said elsewhere: F-39 "An operator static argument is a name substituted when the declaration is instantiated, on both paths and by the specification; no code reads it at run time."
Curator: none.

## F-268
Src: rung-codegen-walls/REPORT.md "1. What changed, and why", "5. Programs run old against new, and the probes": OK.
Commit: first add bb39dbee3c, split from F-48; 13 blocks.
Cited by: none (F-315 and F-34 name the same tests and "refuses none"); sources.md:1007,1023.
Exists: compiler_tests `ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`: found. NOT FOUND: `CodeGen.java:6781-6785` holds `Naming.arrowRTTIclass`/`factory` and the `SelfType` branch; `grep -n 'AnyType\$Any\$RTTIc' CodeGen.java` finds nothing (only the `AnyType` import and :6004). Row 889 NEGATIVE-VERIFIED (agrees).
Said elsewhere: F-315 "Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, ..."; F-34 on what the code generator still refuses.
Curator: none.

## F-276
Src: rung-symbolic-library/REPORT.md §1, §3, §4: OK.
Commit: first add 557cabb040 (2026-10-23 16:45).
Cited by: F-81, F-245, F-249, F-259.
Exists: tests/StringConcatenationFamiliesWalk.fss, tests/XXXFunctionalMethodMeetOperator.fss: found. FortressLibrary.fsi:2662-2681 holds `||`, `|||`, `//`, `///` at (Any,String), (String,String), (String,Any); String.fsi:17-19, :29-31 not read. Row 342 NEGATIVE-VERIFIED: about walk's cache ("skips the check on a component it reads back"), its text does not say the library is analysed afresh.
Said elsewhere: F-249 "...is a `FlatString` of depth 0 ... as it was while `String`'s abstract `opr ||(self, b:String)` stood (F-276)"; F-245 "the library's known fixes clear 54 (F-276)".
Curator: none.

## F-277
Src: rung-self-type-exclusion/REPORT.md §1, §2, §4: OK.
Commit: first add 64fa505c4e (2026-10-23 16:49).
Cited by: F-225, F-227, F-245, F-258; sources.md:820,823,834.
Exists: compiler_tests `Exclusion*` (18), `XXXExclusion*`, `OverloadTwoBoundsClosedTraitExclusion`: found. `OverloadingChecker.scala`, `TypeSchemaAnalyzer.scala` (`meetEmptyWithBounds` at :533), `OverloadingOracle.scala:367`: found. Rows 713, 786 CONTESTED (agree).
Said elsewhere: F-258 "`meetEmptyWithBounds`, which reads each static parameter at the top of the meet as its declared bounds (`OverloadingOracle.scala:367`, `TypeSchemaAnalyzer.scala:533`; F-277)"; F-225 "save in the overloading check's exclusion test (F-277)"; F-318; revival-changes.md:43.
Curator: none.

## F-278
Src: rung-index-bound/REPORT.md §1, §5, §6: OK.
Commit: first add 1538873603 (2026-10-23 16:53).
Cited by: F-81, F-82, F-245, F-259; sources.md:821,824,1190,1196.
Exists: tests/TupleIndexBoundWalk.fss, tests/TupleIndexExclusionWalk.fss (+ .test): found. FortressLibrary.fsi:2180 reads "It extends Any, not Object, so a tuple of...". Rows 805, 806 NEGATIVE-VERIFIED (agree "open").
Said elsewhere: F-82 "The pairs of `Indexed`'s three subscripts have no meet in the ranges and need none since the index bound (F-278)"; F-81 "valid since the index bound (F-278)"; revival-changes.md:48 on `Index`.
Curator: none.

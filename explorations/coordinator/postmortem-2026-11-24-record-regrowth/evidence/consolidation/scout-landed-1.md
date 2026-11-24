<!-- Scout evidence for the chunk `landed-1` ("Landed semantics", 31 entries F-117 to F-148 of FACTS) of the FACTS consolidation of 2026-11-24, gathered by a Sonnet scout under `scout-brief.md`; evidence of the run, not a note. -->

Conventions. Report paths are under `explorations/`; test names are under `ProjectFortress/tests`, `compiler_tests` or `library_tests`. "OK" means the file and the heading (or the numbered section's heading) exist, checked with the heading lists of the files (`facts-extract.sh --check` takes only the heading text). Every entry was numbered by commit `a74f5a2b7`, 2026-10-13 17:58Z ("by record-number.py"), so Commit says only that unless another block is given. "sources.md" is `.claude/skills/fortress-repo/references/sources.md`, the skill's maintenance file. The scrape blocks of 2026-10-22 12:37Z say "at the curator's word of 2026-10-22" with no quote; Words says "scrape" for them. Ledger statuses are from `fortress-gap-ledger.md` rows now.

## F-117
1 Sources: compile-ladder/repair-r1-atomic-static/REPORT.md sec 1 "The cell's payload type is the language's top type, not `FValue`", sec 4 "The gated test is the concurrent one…": OK.
2 Commit: a74f5a2b7; first rewrite 2026-10-13 18:55Z.
3 Cited by: no FACTS, POSITIONS or skill entry.
4 Exists: `compiler_tests/AtomicTopLevel*Var` (AtomicTopLevelVar, AtomicTopLevelObjectVar) found; `MutableTopLevelVarInLoop` found; `compiler/runtimeValues/MutableFValue.java:18` is `volatile fortress.AnyType.Any value;`. No ledger row.
5 Elsewhere: compiler.md:103 "The compiled code keeps each mutable variable in a cell (`compiler/runtimeValues/MutableFValue.java`)" (no cell type). `grep -c 'AnyType.Any'` of FACTS and skills: 0 outside F-117.
6 Words: none.

## F-118
1 Sources: compile-ladder/repair-r2-literal-wrap/REPORT.md "The failure-mode question": OK. compile-ladder/rung-static-numerals/REPORT.md "1. What changed and why": file OK, heading cited in history provenance (not re-checked by `--check`).
2 Commit: a74f5a2b7; 12 history blocks (largest of the chunk), last 2026-11-10 02:26Z.
3 Cited by: no FACTS, POSITIONS or skill entry.
4 Exists: `compiler_tests/IntLiteralWrapRepairR2`, `compiler_tests/UnsignedPrintingCompiled` found. `defaultNumeral`: `scala_src/typechecker/impls/Functionals.scala:1374` (def), `STypeChecker.scala:454` (decl); `CodeGen.java:4757 forIntLiteralExpr` found. Rows: none named. Entry names F-74, F-313, F-340, F-341, F-342, F-347.
5 Elsewhere: F-340 "(`compiler/codegen/CodeGen.java`, `forIntLiteralExpr`, `forFloatLiteralExpr`)"; F-313 "Test: `compiler_tests/UnsignedPrintingCompiled`, …". Skills: revival-changes.md:97 "Elsewhere the numeral takes its default: `ZZ32`, or `ZZ64` or `ZZ` where its value does not fit".
6 Words: scrape 2026-10-22 12:37Z ("at the curator's word of 2026-10-22").

## F-119
1 Sources: reviews/library-scalar-extension-review.md ("change 1"): file OK.
2 Commit: a74f5a2b7.
3 Cited by: F-269, F-151, F-317 (no POSITIONS, no skill).
4 Exists: `tests/ArrayScalarExtension.fss`, `tests/ArrayOperatorsBesideLibrary.fss` found; `test_library/ArrayOperatorVocabulary` (.fss, .fsi) found. No ledger row.
5 Elsewhere: F-269 "which C4 dropped when F-119's scalar extension took its place (row 341)"; F-318 "walk loads and runs `BooleanOps`, `ArrayScalarExtension`, `ArrayOperatorsBesideLibrary`…". Skills: no hit for "scalar extension".
6 Words: none.

## F-120
1 Sources: compile-ladder/rung-export-var/REPORT.md "What the rung landed": OK.
2 Commit: a74f5a2b7.
3 Cited by: no FACTS, POSITIONS or skill entry.
4 Exists: `compiler_tests/ExportVarRungX.test`, `XXXExportVarRungXFrozen.test` found. No ledger row.
5 Elsewhere: F-22 "Gated by the expected failure `compiler_tests/XXXExportVarRungXLinked.test` (row 320)" (same rung's neighbour). Skills: no hit.
6 Words: none.

## F-121
1 Sources: coordinator/process-engineering/facts-slice-2.md "Points for the checker" (point 1 at :145): OK. perf-probes/anyintegral-comprises-where/REPORT.md sec 1 "The variants and the stages", sec 5 "Defects and findings (none is in the ledger)": OK.
2 Commit: a74f5a2b7; 7 blocks, last 2026-11-16 06:44Z.
3 Cited by: F-171 (no POSITIONS or skill line).
4 Exists: row 831 NEGATIVE-VERIFIED "the front end of both paths refuses, 'X is undefined.'…": agrees. F-62, F-146, F-251, P-44, P-151 named. `TypeAnalyzer.scala:1032` is inside `parents(t).flatMap` of `ancestors` (found).
5 Elsewhere: F-171 "Whether the team's commented `comprises Integral[\I\] where [\I\]` is valid is open (F-121)." revival-changes.md:30 "so a generic trait need not be listed if every type below it is below a listed type, as `Integral[\I\]` below `AnyIntegral`."
6 Words: history line 1198 "No decision of the curator settles whether the team's spelling is a valid clause"; scrape 2026-10-22 12:37Z.

## F-122
1 Sources: compile-ladder/rung-round-half-even/REPORT.md "What landed", "Differentials": OK.
2 Commit: a74f5a2b7; 6 blocks.
3 Cited by: no FACTS, POSITIONS or skill entry (P-172, P-173 are named in it).
4 Exists: `tests/RoundHalfEvenRungR.fss`, `tests/RoundNearTieNumeral.fss`, `library_tests/RR64FunctionsRungF.fss` found. `interpreter/glue/prim/RR32.java:326` is `return (long) Math.rint((double) x);`; `nativeHelpers/simpleDoubleArith.java:148-150` is `doubleRound` with `(long) Math.rint(a)`. No ledger row.
5 Elsewhere: none (grep "RoundHalfEven", "half to the even", "exact half": 0 in FACTS and skills).
6 Words: scrape 2026-10-22 12:37Z.

## F-123
1 Sources: compile-ladder/rung-default-rendering/REPORT.md "Defects and their homes": OK.
2 Commit: a74f5a2b7; 7 blocks.
3 Cited by: no FACTS, POSITIONS or skill entry.
4 Exists: `compiler_tests/DefaultRenderRungS`, `compiler_tests/LiteralDefaultCompiled`, `tests/LanguageTypeInstancesWalk` found. Rows 321 and 363 both NEGATIVE-VERIFIED: agree ("open" in the entry). F-341, F-342, F-344 named.
5 Elsewhere: F-183 "assert its rendering (`compiler_tests/DefaultRenderRungS`)". Skills: compiler.md:50-51 list other `asString` failures (rows 1101, 1102), not this one.
6 Words: scrape 2026-10-22 12:37Z.

## F-124
1 Sources: compile-ladder/rung-int-semantics-compiled/REPORT.md sec 1 "What the rung did": OK.
2 Commit: a74f5a2b7; 3 blocks.
3 Cited by: no FACTS, POSITIONS or skill entry.
4 Exists: `compiler_tests/IntSemanticsRungB.fss`, `library_tests/Integer3.fss` found. Row 386 FIXED ("on the compiled path, the unbounded `ZZ`'s `<<<` raised a raw `java.lang.ArithmeticException`…"): the entry states the repaired behaviour, agrees. `Math.multiplyExact` on `ZZ64`: found in `nativeHelpers/simpleLongArith.java`.
5 Elsewhere: F-125 and F-132 state the walk counterpart ("`LSHIFT` gives 0 and `RSHIFT` the sign"); F-327 "keep `LSHIFT`, `RSHIFT` and `^` over `AnyIntegral`". Skills: none.
6 Words: none.

## F-125
1 Sources: compile-ladder/rung-int-semantics-walk/REPORT.md sec 4.3 "The fixed widths, and how the count is read", sec 4.4 "The unbounded ZZ": OK.
2 Commit: a74f5a2b7; 5 blocks.
3 Cited by: F-132, F-126 (no POSITIONS line; entry itself names P-69).
4 Exists: `tests/IntSemanticsRungI.fss` found. No ledger row.
5 Elsewhere: F-124 (compiled twin, same words); F-132 "the shifts `LSHIFT` and `RSHIFT`, which lose the bits shifted out (F-125)"; F-24 "Gated by the `overflows(...)` assertions of `tests/IntSemanticsRungI.fss`". Skills: none.
6 Words: none.

## F-126
1 Sources: compile-ladder/rung-int-semantics-walk/JUDGE.md sec 3 "What the specification settles, and how": OK. Same rung's REPORT.md sec 5 "The `shift` declaration: the collision, and the renames the specification requires": OK. `references/library.md` = the skill file: exists.
2 Commit: a74f5a2b7; 2 blocks.
3 Cited by: F-125 (no POSITIONS).
4 Exists: no test, row or file named beyond the above.
5 Elsewhere: SKILL.md:131 "A functional method's name is reserved in every program that imports it, so do not name a variable after it."; library.md:35 "A new functional method reserves its name: the phase that binds names then refuses each program that names a variable or a parameter after it."
6 Words: none.

## F-128
1 Sources: compile-ladder/rung-interp-coercion/REPORT.md sec 1 "What changed", sec 5 "Decisions", sec 9 "Defect homes and the rows": OK. compile-ladder/rung-closure-name-once/SKEPTIC.md ("3. My programs"): file OK, a "## 3" heading not checked.
2 Commit: a74f5a2b7; 8 blocks.
3 Cited by: no FACTS or POSITIONS line; sources.md:795, :1190, :1193, :1467.
4 Exists: `tests/Coercion*RungC.fss` found (CoercionBindRungC, CoercionCallRungC, CoercionGenericFnRungC, …; more in `compiler_tests/`). Rows 387, 395, 513, 1083, 1084 all NEGATIVE-VERIFIED: agree with "not converted"; row 1084 text "dies when called" agrees with "not to a function type of no parameters". F-341 named.
5 Elsewhere: interpreter.md:30 "A body with a declared return type is not converted by coercion, except a numeral … (ledger row 387)"; revival-changes.md:103 "Walk converts a value other than a numeral at a call, a typed binding and an assignment, and chooses the coercion by the run-time value".
6 Words: scrape 2026-10-22 12:37Z.

## F-129
1 Sources: compile-ladder/rung-size-runtime/REPORT.md sec 1 "What changed", sec 9 "Defect homes and the rows": OK.
2 Commit: a74f5a2b7; 6 blocks.
3 Cited by: F-18, F-20, F-36, F-40 (F-135 is cited by it); P-41 (POSITIONS line 40); sources.md:794.
4 Exists: `compiler_tests/NatRt*` found (NatRtBigSize, NatRtCase, …); `tests/NatReflectTest.fss` found. `runtimeSystem/MethodInstantiater.java:225-237` found (natMethod branch, comment "a size read as a value is a ZZ32 (P-173)"). Rows 307, 408, 413, 414 NEGATIVE-VERIFIED: agree. Row 962 is CONTESTED; the entry cites it without saying contested (F-140 says "contested"). Row 416 named; not looked up.
5 Elsewhere: SKILL.md:90 "a size as a descriptor from `RTTIsize.of`"; revival-changes.md:83 "the runtime carries each as a descriptor"; F-36 "which takes its descriptor from `RTTIsize.of` (F-129)".
6 Words: scrape 2026-10-22 12:37Z.

## F-130
1 Sources: compile-ladder/rung-wrap-operators/REPORT.md sec 2 "What changed on the branch": OK. reviews/wrap-dependent-code.md: file OK.
2 Commit: a74f5a2b7; 4 blocks.
3 Cited by: F-132 (no POSITIONS line; entry names P-73).
4 Exists: `tests/WrapOperatorsRungD.fss` found. Rows 348 and 700 NEGATIVE-VERIFIED: agree.
5 Elsewhere: library.md:24 "For arithmetic that wraps on overflow, use the wrapping operators ∔ `DOTPLUS`, ∸ `DOTMINUS` and ⨰ `DOTTIMES`."; F-132 "the wrapping operators (F-130)".
6 Words: scrape 2026-10-22 12:37Z.

## F-131
1 Sources: compile-ladder/rung-flat-tower/REPORT.md sec 5 "The edit: the tower and the coercions", sec 17 "Defects measured, and their homes": OK.
2 Commit: a74f5a2b7; 7 blocks.
3 Cited by: F-61, F-168 (no POSITIONS line; entry names P-43, P-74, P-75); sources.md:795, :1090, :1190.
4 Exists: `tests/FlatTowerRungF.fss` found. Row 436 NEGATIVE-VERIFIED ("an empty or filtered `SUM` over an additive group that is not a number type ends in `CastError`"): agrees. F-79, F-139, F-324, F-341, F-342, F-344 named.
5 Elsewhere: SKILL.md:134 "`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64` are siblings under `Number`. None is a subtype of another"; revival-changes.md:89 "**The number types are flat siblings (P-43).**"; F-168 "The eight number types are siblings under `Number` (F-131)."
6 Words: scrape 2026-10-22 12:37Z; history line 4075 "how to build it waits for the curator's choice" (P-75, older text).

## F-132
1 Sources: compile-ladder/rung-overflow-natives/REPORT.md sec 13 "Defects and their homes": OK. compile-ladder/rung-size-range/REPORT.md sec 12 "Every defect measured, and its home": OK.
2 Commit: a74f5a2b7; 6 blocks.
3 Cited by: F-24, F-316; P-73 (POSITIONS line 90); sources.md:1137.
4 Exists: `tests/FixedWidthOverflowRungB.fss`, `tests/PowChooseLcmRungE.fss` found. Rows 453, 523, 524, 525 NEGATIVE-VERIFIED: agree. F-125, F-130, F-305, F-331 named.
5 Elsewhere: SKILL.md:134 "Overflow raises `IntegerOverflow`, but an expression of numerals alone folds exactly"; revival-changes.md:101 "`2147483647 + 1` is the `ZZ64` 2147483648, not an `IntegerOverflow`". F-124 and F-125 state the shift part.
6 Words: scrape 2026-10-22 12:37Z.

## F-133
1 Sources: compile-ladder/rung-ranges-zz32/REPORT.md sec 4 "The edit", sec 10 "Every measured defect and its home": OK.
2 Commit: a74f5a2b7; 4 blocks.
3 Cited by: no FACTS or skill entry; POSITIONS none (entry names P-77).
4 Exists: `tests/RangeZZ32RungJ.fss`, `RangeBoundsRungO.fss`, `SeqRangeTopRungO.fss`, `RangeEmptyHashRungO.fss` found. Rows 479, 480, 481, 514, 522 NEGATIVE-VERIFIED: agree.
5 Elsewhere: library.md:22 "Scalar ranges are over `ZZ32` only. A range over another integer type is a static error, and walk stops when it builds one."; F-90 "a strided range `a:b:c` is declared `Range[\ZZ32\]`, which is no generator".
6 Words: scrape 2026-10-22 12:37Z.

## F-134
1 Sources: compile-ladder/rung-generic-runtime/REPORT.md sec 1 "What is fixed", sec 10 "Every measured defect and its home": OK.
2 Commit: a74f5a2b7; 4 blocks.
3 Cited by: F-71 (no POSITIONS, no skill).
4 Exists: `compiler_tests/TypecaseBindRungG`, `CastBindRungG`, `TaskArmLocalSlot`, `TryInArmRungG`, `library_tests/ClauseBindingRungB` found. Rows 340 and 498 NEGATIVE-VERIFIED: agree ("open").
5 Elsewhere: F-71 "So write the clause-binding form, as the library does (F-134)". Skills: no hit for "TypecaseBind" or "CastBind".
6 Words: none.

## F-135
1 Sources: compile-ladder/rung-generic-runtime/REPORT.md sec 1 "What is fixed": OK.
2 Commit: a74f5a2b7; 4 blocks.
3 Cited by: F-129 (no POSITIONS, no skill).
4 Exists: `compiler_tests/NatRtTask`, `NatRtMethBoth` found. No ledger row.
5 Elsewhere: F-129 "Closures and tasks capture a size as a free static parameter (F-135)"; tests-writing.md:128 names `compiler_tests/NatRtTask` as a promoted test (no claim about tasks).
6 Words: none.

## F-136
1 Sources: compile-ladder/rung-generic-runtime/REPORT.md sec 7 "The edits", sec 9 "The dispatch change's reach and its remainder": OK.
2 Commit: a74f5a2b7; 5 blocks.
3 Cited by: F-45, F-46 (no POSITIONS, no skill).
4 Exists: `compiler_tests/Dispatch*ArmRungG` found (DispatchRenamedArmRungG, DispatchMethodArmRungGLink, …); `GenericBesidePlainZZ32.test` found. Rows 493, 494 FIXED: agree ("both are fixed"). Rows 495, 496, 499 NEGATIVE-VERIFIED: agree. F-45, F-388 named.
5 Elsewhere: F-45 "The call at the dispatcher's static arguments is built for template dispatchers (F-136)". Skills: SKILL.md:90 describes the template class, not the dispatcher.
6 Words: scrape 2026-10-22 12:37Z.

## F-137
1 Sources: compile-ladder/rung-inference-walk/REPORT.md sec 2 "What changed", sec 9 "Every measured defect's home": OK.
2 Commit: a74f5a2b7; 6 blocks.
3 Cited by: F-51, F-55, F-141 (no POSITIONS line names F-137; entry names P-46, P-74, P-76; no skill).
4 Exists: `tests/InferCoercionRungK.fss` found. Rows 509, 510, 511 NEGATIVE-VERIFIED: agree. F-141, F-228, F-341, F-342 named.
5 Elsewhere: F-55 "So a mixed-width call takes the narrowest type into which its arguments convert, as P-74 decides. F-73 gives the checker's rule and F-137 walk's"; revival-changes.md:103 "Promotion instantiates a generic declaration at the narrowest type into which all its arguments coerce (P-74)."
6 Words: 2026-10-22 22:14Z (history line 4145), "applied at the curator's word of 22:12 UTC on 2026-10-22, \"apply all the improvements drafted\", without his review of each change"; line 4099 (older) "a default that waits for the curator's review (review-queue item 85, named in P-46)"; scrape 12:37Z.

## F-138
1 Sources: compile-ladder/rung-integer-minmax/REPORT.md sec 1 "What changed", sec 9 "The compiled path, and the one divergence": OK.
2 Commit: a74f5a2b7; 3 blocks.
3 Cited by: no FACTS, POSITIONS or skill entry (entry names P-47).
4 Exists: `tests/IntegerMinMaxRungM.fss`, `tests/IntegerMaxNumMinNum.fss`, `tests/NumeralWithNN32.fss` found. Row 442 NEGATIVE-VERIFIED ("…`^` on `ZZ64`, shifts, `GCD` and `LCM` on `NN32`/`NN64`"): the text I read does not name MIN or MAX or "NN32 with ZZ32 answers ZZ"; I did not find that claim in the row's first 330 characters.
5 Elsewhere: none (grep "MAXNUM", "IntegerMinMaxRungM": 0 in FACTS and skills).
6 Words: none.

## F-139
1 Sources: compile-ladder/rung-rr32-sibling/REPORT.md sec 1 "What changed", sec 11 "Every defect measured, and its home": OK.
2 Commit: a74f5a2b7; 4 blocks.
3 Cited by: F-131 (no POSITIONS, no skill line naming F-139).
4 Exists: `tests/RR32SiblingRungV.fss` found. Rows 387, 528, 529 NEGATIVE-VERIFIED: agree. F-79 named by F-131.
5 Elsewhere: F-131 "`RR64` converts from `RR32` too (F-139)"; F-79 "`RR64` and `RR32` from both by one rounding"; SKILL.md:134 and revival-changes.md:89 list `RR32` among the siblings.
6 Words: none.

## F-140
1 Sources: compile-ladder/rung-size-range/REPORT.md sec 6 "The edit", sec 12 "Every defect measured, and its home": OK.
2 Commit: a74f5a2b7; 6 blocks.
3 Cited by: F-74, F-222; P-40 (POSITIONS line 39); sources.md:1190, :1193.
4 Exists: `tests/NatBigSizeWalk.fss`, `XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk`, `XXXNatArithSumWalk` found; `compiler_tests/XXXNatRangeChecker`, `XXXNatArithRangeChecker`, `NatRtBigSize` found. Rows 527, 675 NEGATIVE-VERIFIED, 962 CONTESTED: agree ("contested" stated). F-222, F-342, P-173 named.
5 Elsewhere: F-129 states the row 962 error ("a `java.lang.Error` at run time that no `catch` sees"); F-146 "The compiled class loader can make a size outside its kind's range, as a `nat` above 4294967295, where walk refuses it (row 675)."
6 Words: none.

## F-141
1 Sources: compile-ladder/rung-walk-instance/REPORT.md sec 2 "The rule as built under walk": OK. Same rung's decision-record.md sec 2 "The decisions taken inside the rung": OK. compile-ladder/rung-walk-elements/REPORT.md sec 1 "What changed and why": OK. compile-ladder/rung-walk-meet/REPORT.md sec 1 "What changed": OK.
2 Commit: a74f5a2b7; 5 blocks.
3 Cited by: F-137 (no POSITIONS; entry names P-48); sources.md:794.
4 Exists: `tests/Infer*Walk.fss` found (InferContravariantWalk, InferLoneBoundWalk, …). Rows 587, 589, 591, 592, 612, 616 NEGATIVE-VERIFIED: agree ("defects"). F-137, F-143, F-228 named.
5 Elsewhere: revival-changes.md:68 "**A type parameter that a call does not fix takes its bound, not Scala's `Nothing` (P-48).**"; F-137 "With no narrowest candidate, the parameter takes its bound where every argument is below the bound (F-141)"; F-228 "where an F-bounded parameter stays open".
6 Words: history line 4105 (older text) names "the curator's review" for review-queue items 210, 80 and 18 ("the curator's to decide"); scrape 12:37Z.

## F-142
1 Sources: compile-ladder/rung-walk-meet/REPORT.md sec 1 "What changed", sec 7 "Every measured defect and its home": OK. `references/interpreter.md` = the skill file: exists.
2 Commit: a74f5a2b7; 4 blocks.
3 Cited by: F-7, F-245, F-145; sources.md:855.
4 Exists: `tests/FunctionalMethodMeet*` found (FunctionalMethodMeetGenericObjectExpressionWalk, …; more in `compiler_tests/`). Row 611 NEGATIVE-VERIFIED: agrees. F-145, F-245, F-281 named; `d212b2c1f` not checked.
5 Elsewhere: F-7 "F-142 (the Meet Rule for Functional Methods)"; F-145 "its check of the Meet Rule for Functional Methods is F-142's"; interpreter.md:68-69 on walk's load checks of functional methods (row 779).
6 Words: none.

## F-143
1 Sources: compile-ladder/rung-walk-open-param/REPORT.md sec 1 "What changed and why", sec 11 "Defects, each with its home": OK. Same rung's SKEPTIC.md sec 3 "Finding, and what I did with it" item 3 (the open-dispatch probe): OK. compile-ladder/rung-body-arguments/SKEPTIC.md sec 3: OK.
2 Commit: a74f5a2b7; 5 blocks.
3 Cited by: F-59, F-114, F-141, F-228; sources.md:794, :810, :1311.
4 Exists: `tests/InferUnfixedFBoundedWalk.fss`, `OpenTupleDispatchWalk.fss`, `OpenParameterListComprehensionWalk.fss` found. `Library/List.fss:179` is the `cast[\CovariantCollection[\T\]\](cc)` line. Rows 663, 825 CONTESTED, 716 NEGATIVE-VERIFIED: agree ("contested" stated for 663 and 825).
5 Elsewhere: revival-changes.md:68 "Under walk, a parameter whose bound names itself stays open, printed `OPEN`, as in `BoxU[\OPEN\]`."; F-114 "they pass only because walk leaves that parameter open (F-143; row 424, fixed)".
6 Words: none.

## F-144
1 Sources: compile-ladder/rung-reduction-types/REPORT.md sec 1 "What changed and why", sec 8 "Defects and their homes": OK. compile-ladder/rung-walk-elements/REPORT.md sec 7 "Old against new": OK.
2 Commit: a74f5a2b7; 3 blocks.
3 Cited by: F-85; sources.md:796.
4 Exists: `tests/UnwrittenBigMinMaxWalk`, `UnwrittenTupleMinMaxWalk`, `UnwrittenBigOperatorsWalk`, `UnwrittenComprehensionElementsWalk`, `ReductionSimpleJoinAtAnyWalk` found. Row 665 NEGATIVE-VERIFIED: its text is about the load check of an inherited abstract method that "skips generic objects" (same row F-145 cites for generic objects); the entry cites it for a reduction with static parameters that "stops at its first join".
5 Elsewhere: revival-changes.md:130 "extend `AssociativeReduction[\R\]`, whose `simpleJoin` takes and answers `R`."; F-85 "how the reductions without an identity are typed at their element type (row 628)".
6 Words: none.

## F-145
1 Sources: compile-ladder/rung-walk-coverage/REPORT.md sec 1 "What changed and why", sec 6 "What walk now refuses and accepts": OK. compile-ladder/rung-duplicates-coverage/REPORT.md sec 1 "What changed, and why", sec 8 "Points to report": OK.
2 Commit: a74f5a2b7; 6 blocks.
3 Cited by: F-7, F-142; sources.md:793 (entry names P-147).
4 Exists: `tests/AbstractMethod*Walk` found (AbstractMethodCoverUnsettledWalk, AbstractMethodCoveredWalk, …); `compiler_tests/AbstractMethodCoveredPairs` found. Rows 665, 725, 728 NEGATIVE-VERIFIED: agree.
5 Elsewhere: revival-changes.md:34 "Walk refuses at load an object without static parameters that leaves one uncovered. Walk skips this check for a generic object (row 665)."; F-7 "F-145 (uncovered abstract methods and `override`)"; F-142 "Meet Rule" cross-reference.
6 Words: none.

## F-146
1 Sources: compile-ladder/rung-size-expressions/REPORT.md sec 1 "What changed and why", sec 12 "Defects and their homes": OK. The quoted "Item 15, 15a with its part (b)" is bold text at line 16 inside sec 1, not a heading.
2 Commit: a74f5a2b7; 5 blocks.
3 Cited by: F-67, F-251, F-121, F-176; P-55 (POSITIONS line 54).
4 Exists: `compiler_tests/NatArith*` found (NatArithBeyondRun, NatArithClass, …). Rows 675, 767 NEGATIVE-VERIFIED, 683 CONTESTED: agree. F-176, row 675, P-55 named.
5 Elsewhere: F-176 "**The specification allows arithmetic in a size, and two size arguments are identical when they are written alike once each operation…**"; revival-changes.md:83 "**Sizes are compared by their written form (P-55).**"
6 Words: none.

## F-147
1 Sources: compile-ladder/rung-walk-override/REPORT.md sec 1 "What changed, and why": OK. `references/interpreter.md` = the skill file: exists. `Specification/basic/traits.tex:585-589`: lines found, text "…is equal to the parameter type of a method declaration".
2 Commit: a74f5a2b7; 3 blocks.
3 Cited by: F-145; sources.md:793.
4 Exists: `tests/Override*Walk.fss` found; `AbstractOverrideUndefinedWalk`, `OverrideGenericInstanceEqualTypesWalk` found. Rows 614, 649 FIXED (entry cites them as the refusal's evidence, agrees); row 693 NEGATIVE-VERIFIED: agrees.
5 Elsewhere: interpreter.md:89 "override` at an inherited declaration's own parameter types overrides nothing."; revival-changes.md:32 "**`override` widens.** An `override` overrides an inherited declaration only where the inherited parameter types are strictly narrower than its own."; F-400 "the checker refuses an `override` that overrides nothing".
6 Words: none.

## F-148
1 Sources: compile-ladder/rung-walk-override/SKEPTIC.md sec 3 "My fixes": OK.
2 Commit: a74f5a2b7; 2 blocks.
3 Cited by: no FACTS, POSITIONS or skill entry.
4 Exists: `tests/WhereBoundOverloadWalk.fss`, `tests/OverrideAfterWhereBoundWalk.fss` found. No ledger row.
5 Elsewhere: revival-changes.md:76 on conditional extension with a `where` clause (different rule); F-250/F-256/F-181 state the compiled checker's where-bound tests (`WhereBound*`), not walk's list rule.
6 Words: none.

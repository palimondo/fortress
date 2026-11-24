<!-- Scout evidence for the landed-2 chunk of the FACTS consolidation of 2026-11-24 ("Landed semantics", 31 entries F-222 to F-347): for each entry, its report sources, establishing commit, citations, what exists today, where else the skill and FACTS say the same, and the curator's words; evidence of the run, not a note. -->

### F-222
1. Sources: cl/rung-popl-examples/REPORT.md (file ok; #3 ok, #6 ok).
2. Commit: 3ba2d005ff 2026-10-14; history block 1 2026-10-14 04:44Z.
3. Cited by: FACTS F-140, F-176; POSITIONS none; skills sources.md:794.
4. Exists today: tests found NatArithPowerWalk; none not found; rows now: 675 NEGATIVE-VERIFIED; entry's words agree. Tests: the wildcard `NatPower*Walk` matches NatPowerNegativeExponentWalk, NatPowerOutOfRangeWalk, NatPowerOverflowWalk (`ls ProjectFortress/tests/NatPower*Walk*`).
5. Said elsewhere: revival-changes.md:83 "Walk refuses a negative exponent. The class loader computes a size without checking its kind, and stops on a negative exponent with a Java exception (row 675)."
6. Curator: none in the history.

### F-228
1. Sources: cl/rung-walk-elements/REPORT.md (file ok; #1 ok, #5 ok, #10 ok); cl/rung-walk-overload-if/REPORT.md (file ok; "Row 718" ok, #1 ok).
2. Commit: 20474c1449 2026-10-14; history block 1 2026-10-14 15:00Z.
3. Cited by: FACTS F-59, F-220, F-141, F-143, F-144; POSITIONS none; skills sources.md:796/1198.
4. Exists today: tests found UnwrittenListMapComprehensionWalk, ComprehensionTypedBindingWalk, UnwrittenSetBigOperatorsWalk, UnwrittenEmptyFloatSumWalk, IntMapComprehensionTypedWalk, UserBigOperatorResultTraitWalk; none not found; rows now: 510 NEGATIVE-VERIFIED, 705 NEGATIVE-VERIFIED, 716 NEGATIVE-VERIFIED, 717 NEGATIVE-VERIFIED, 718 FIXED; entry's words agree.
5. Said elsewhere: revival-changes.md:122 "Walk instantiates a reduction at its value's declared type: a local variable's, or a top-level or local function's return type, also where the clause form ends a block."; revival-changes.md:124 "raises `IntegerOverflow` under walk only"
6. Curator: none in the history.

### F-230
1. Sources: Specification/basic/expressions/comprehensions.tex (file ok; "Comprehensions" ok); cl/rung-library-factories/REPORT.md (file ok; #1 ok, #6 ok).
2. Commit: a0f839ad7e 2026-10-14; history block 1 2026-10-14 15:02Z.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: tests found IntMapUplusSingleton, IntMapUplusManyEntry, IntMapComprehensionRepeatedKey; none not found; files found IntMap.fss, Map.fss, comprehensions.tex. Not said elsewhere: `grep -rn "KeyOverlap\|UPLUS\|IntMap" .claude/skills/fortress-repo/references/revival-changes.md` finds nothing, though sources.md:654 cites a revival-changes.md section "`UPLUS` of `IntMap`s on a shared key".
5. Said elsewhere: none found.
6. Curator: none in the history.

### F-239
1. Sources: cl/rung-walk-overload-if/REPORT.md (file ok; "Row 673" ok, #1 ok).
2. Commit: 9879d43860 2026-10-16; history block 1 2026-10-16 17:36Z.
3. Cited by: FACTS F-7; POSITIONS none; skills sources.md:797.
4. Exists today: tests found IfClauseObjectWalk, IfClauseNumberWalk, IfClauseStringWalk; none not found; files found if.tex; rows now: 746 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: revival-changes.md:134 "Besides a `Boolean`, walk takes a `Maybe` as an `if` condition, `Just` as true and `Nothing` as false."
6. Curator: 2026-10-22 12:37Z (history): "applied ... at the curator's word of 2026-10-22" (scrape deleting status and planning references); entry text: "a default, the coordinator's call at climb batch 16".

### F-248
1. Sources: perf-probes/generic-distribute/REPORT.md (file ok; #5 ok).
2. Commit: 7a58250bfe 2026-10-16; history block 1 2026-10-16 19:13Z.
3. Cited by: FACTS F-253; POSITIONS none; skills sources.md:728.
4. Exists today: tests found none; none not found; rows now: 744 NEGATIVE-VERIFIED; entry's words agree. No "Gated by" list. Tests named in the prose, found: tests/GeneratorDeclarations.fss, tests/NestedReductionFusion.fss; microGPT quick pair found (explorations/run-c4/src/MicroGptFlatQuick.fss, explorations/apl/mg/MicroGptAplQuick.fss).
5. Said elsewhere: none found. Not found: `grep -n "distribute\|fusion" references/revival-changes.md` is empty, though sources.md:728 cites a revival-changes.md section "The fusion of `SUM` with `MAX` and `MIN`"; FACTS F-242 and F-253 name `distribute` in other contexts.
6. Curator: none in the history.

### F-249
1. Sources: cl/rung-symbolic-library/REPORT.md (file ok; #12 ok); perf-probes/symbolic-operators/REPORT.md (file ok; #2.2 ok, #2.4 ok).
2. Commit: 7a58250bfe 2026-10-16; history block 1 2026-10-16 19:13Z.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: tests found StringConcatenationFamiliesWalk; none not found; files found String.fsi, StringConcatenationFamiliesWalk.fss.
5. Said elsewhere: none found. Related: F-276 and F-259 (`String`'s `||` over `Any`); no skill sentence found (`grep -rn "Concatenable" .claude/skills/fortress-repo` empty).
6. Curator: none in the history.

### F-252
1. Sources: cl/rung-walk-generic-pairs/REPORT.md (file ok; #1 ok, #5 ok); cl/rung-walk-overload-if/REPORT.md (file ok; "Row 373" ok, #1 ok, #9 ok).
2. Commit: 6d187d0697 2026-10-17; history block 1 2026-10-17 17:40Z.
3. Cited by: FACTS F-27, F-253, F-257, F-155; POSITIONS none; skills sources.md:710/711/721/732/748/792.
4. Exists today: tests found DispatchRenamedGenericArmWalk, DispatchSwappedGenericArmWalk, GenericPairNestedBoundsWalk, XXXOverloadExistentialMeetWalk, GenericBoundsNoMeetWalk, NoDuplicatesRuleWalk, NoDuplicatesRuleSizeWalk, GenericOverloadInstancesApartWalk, GenericBoundsMeetWalk, GenericFBoundsMeetWalk, GenericPairExcludingWalk, GenericSizePairNestedWalk, ShuffleTest, GenericPairExcludesTogetherWalk; none not found; rows now: 416 NEGATIVE-VERIFIED, 539 NEGATIVE-VERIFIED, 787 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: interpreter.md:61 "two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if `comprises` clauses cover the overlap."; F-27 "Walk's load check reads again two kinds of overload pair that its parameter-by-parameter check refuses, and accepts those that pass: a generic declara"
6. Curator: none in the history.

### F-253
1. Sources: cl/rung-walk-method-sargs/REPORT.md (file ok; #1 ok, #2 ok); cl/rung-walk-trait-method-bounds/REPORT.md (file ok; #1 ok, #4 ok); cl/rung-walk-trait-method-bounds/SKEPTIC.md (file ok; #3 ok).
2. Commit: 743eb52862 2026-10-17; history block 1 2026-10-17 17:43Z.
3. Cited by: FACTS F-26, F-252; POSITIONS none; skills sources.md:712/723/1606/1651.
4. Exists today: tests found MethodStaticArgInference, MethodStaticArgOverloadedReceiver, MethodStaticArgDeclaredDomain, NestedReductionFusion, TraitGenericMethodInference, InheritedGenericFunctionalMethodBesidePlain; none not found; files found MethodStaticArgInference.fss; rows now: 1134 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: interpreter.md:14 "At a call of a generic function, walk infers the static arguments from the run-time types of the arguments (`interpreter/evaluator/EvaluatorBase."; revival-changes.md:15 "Walk chooses by declared parameter types, never by the order of the declarations.** It compares declared domains where one lies strictly inside the other."
6. Curator: none in the history.

### F-257
1. Sources: cl/rung-walk-trait-method-bounds/REPORT.md (file ok; #1 ok, #3 ok).
2. Commit: 5262a2412a 2026-10-18; history block 1 2026-10-18 03:16Z.
3. Cited by: FACTS F-252, F-274, F-275; POSITIONS none; skills sources.md:710/721/792.
4. Exists today: tests found GenericReturnRuleInvariantWalk, GenericReturnRuleOuterParamWalk, GenericBesidePlainReturnRuleWalk, GenericPairTupleReturnWalk, GenericOverloadInstancesApartWalk, GenericBoundsNoMeetWalk, GenericBesidePlainNoMeetWalk, NoDuplicatesRuleWalk, NoDuplicatesRuleSizeWalk; none not found; rows now: 539 NEGATIVE-VERIFIED, 779 NEGATIVE-VERIFIED, 780 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: interpreter.md:61 "two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if `comprises` clauses cover the overlap."; F-27 "Walk's load check reads again two kinds of overload pair that its parameter-by-parameter check refuses, and accepts those that pass: a generic declara"
6. Curator: none in the history.

### F-258
1. Sources: cl/rung-existential-reduction/REPORT.md (file ok; #2 ok, #5 ok, #7 ok).
2. Commit: 14e91723f2 2026-10-20; history block 1 2026-10-20 02:43Z.
3. Cited by: FACTS F-27, F-252; POSITIONS none; skills sources.md:738/739/747/792.
4. Exists today: tests found GenericPairExcludesTogetherWalk, GenericPairForcedObjectApartWalk, GenericPairExcludesTogether, GenericPairSharedSupertypeExclusion, GenericPairFreeArgumentWalk, GenericPairObjectSupertypeOverlapWalk, XXXGenericPairFreeArgument; none not found; files found OverloadedFunction.java, OverloadingOracle.scala, TypeSchemaAnalyzer.scala; rows now: 786 CONTESTED, 787 NEGATIVE-VERIFIED, 788 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: (FACTS F-274  not matched)
6. Curator: none in the history.

### F-259
1. Sources: cl/rung-string-conversion/REPORT.md (file ok; #1 ok, #4 ok, #5 ok).
2. Commit: 4190069c4d 2026-10-20; history block 1 2026-10-20 02:47Z.
3. Cited by: FACTS F-83; POSITIONS none; skills sources.md:740/741.
4. Exists today: tests found ExtendsAnyIsObjectWalk, ExtendsAnyIsObject, ConcatAnyOnLeftWalk; none not found; files found ExtendsAnyIsObject.test, ConcatAnyOnLeftWalk.fss, ExtendsAnyIsObjectWalk.fss.
5. Said elsewhere: none found. Not found in revival-changes.md: `grep -n "extends .Any" references/revival-changes.md` empty, though sources.md:740 cites its section "An object or trait declared `extends Any`".
6. Curator: none in the history.

### F-261
1. Sources: reviews/integer-power-fable-judgement.md (file ok; #8 ok, #9 ok).
2. Commit: 36d53bdd68 2026-10-20; history block 1 2026-10-20 03:59Z.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: tests found none; none not found. The entry names no test ("No test checks it").
5. Said elsewhere: none found. No other place: `grep -rn unsigned` hits only unrelated lines (F-308, F-311, F-312, interpreter and compiler notes).
6. Curator: none in the history.

### F-262
1. Sources: reviews/integer-power-fable-judgement.md (file ok; #9 ok).
2. Commit: 36d53bdd68 2026-10-20; history block 1 2026-10-20 03:59Z.
3. Cited by: FACTS F-263; POSITIONS none; skills sources.md:795/1192.
4. Exists today: tests found none; none not found; files found lexical-structure.tex, IntegerLiteralFoldingVisitor.java, NegativeNumeralOwnType.test, Misc.scala, NumeralStaticDesignWalk.fss. The entry names no test.
5. Said elsewhere: revival-changes.md:101 "folds exactly before the checker, on both paths (P-173)."; revival-changes.md:114 "At a negative exponent, 1 and -1 give their power, 0 raises `DivisionByZero`, and other bases raise `IntegerOverflow`."
6. Curator: none in the history.

### F-263
1. Sources: cl/rung-integer-power/REPORT.md (file ok; #1 ok, #2 ok, #4 ok); perf-probes/integer-power/REPORT.md (file ok; #1.6 ok).
2. Commit: 5ad4a9957d 2026-10-20; history block 1 2026-10-20 08:34Z.
3. Cited by: FACTS F-84, F-172; POSITIONS none; skills sources.md:759/760/795.
4. Exists today: tests found IntegerPowerContractWalk, QQPowerExponent, XXXIntegerPowerContractCompiled; none not found; files found XXXIntegerPowerContractCompiled.test, IntegerPowerContractWalk.fss, QQPowerExponent.fss; rows now: 441 NEGATIVE-VERIFIED, 523 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: revival-changes.md:114 "At a negative exponent, 1 and -1 give their power, 0 raises `DivisionByZero`, and other bases raise `IntegerOverflow`."; F-172 "The specification's integer chapter states the library's integer rules." (revival-changes.md:114 also holds P-153 text.)
6. Curator: 2026-10-22 12:37Z (history): "at the curator's word of 2026-10-22" (same scrape).

### F-270
1. Sources: cl/rung-size-expressions/REPORT.md (file ok; "Fork 3, way 4a, under Q13.3" NOT FOUND, #1 ok, #12 ok).
2. Commit: e06bd068e7 2026-10-22; history block 1 2026-10-22 12:13Z, split from F-146.
3. Cited by: FACTS none; POSITIONS none; skills sources.md:794/801/988/995.
4. Exists today: tests found NatOpenChecker, NatOpenWalk, NatOpenUnlistedExtender; none not found; rows now: 307 NEGATIVE-VERIFIED, 682 CONTESTED; entry's words agree. Heading "Fork 3, way 4a, under Q13.3": `facts-extract.sh --check` NOT FOUND as a heading; it is a bold lead at REPORT.md:23, inside section 1.
5. Said elsewhere: revival-changes.md:85 "A size known only at run time comes from `reflect` in `NatReflect.fsi`."; compiler.md:184 "A `comprises` clause that lists a type at a `where`-clause variable, as `NatParam comprises { N[\n\] } where [\ nat n \]` or `AnyList comprises List[\E\] where [\E\]`: at a call, the checker gives the variable a fresh size or type"
6. Curator: 2026-10-22 12:37Z: "at the curator's word of 2026-10-22" (scrape). 2026-10-22 22:14Z: "applied at the curator's word of 22:12 UTC on 2026-10-22, \"apply all the improvements drafted\", without his review of each change".

### F-274
1. Sources: cl/rung-walk-generic-pairs/REPORT.md (file ok; #1 ok, #5 ok); cl/rung-existential-reduction/REPORT.md (file ok; #5 ok).
2. Commit: e06bd068e7 2026-10-22; history block 1 2026-10-22 12:13Z, split from F-252.
3. Cited by: FACTS F-252, F-257; POSITIONS none; skills sources.md:792.
4. Exists today: tests found GenericBesideGenericSameDomain, GenericBesidePlainSameDomain, NoDuplicatesRuleWalk, NoDuplicatesRuleSizeWalk; none not found; files found XXXNoDuplicatesRuleUnboundedBesideAny.test; rows now: 759 FIXED; entry's words agree. Row 759 FIXED (`1bc0a9083`); the entry names `compiler_tests/XXXNoDuplicatesRuleUnboundedBesideAny.test` (found; `ls ProjectFortress/compiler_tests/*NoDuplicatesRuleUnboundedBesideAny*` gives that .test and NoDuplicatesRuleUnboundedBesideAny.fss, the row's reproducer).
5. Said elsewhere: interpreter.md:61 "two declarations of one name that its parameter-by-parameter check cannot order. It accepts them if `comprises` clauses cover the overlap."; (FACTS F-257  not matched)
6. Curator: none in the history.

### F-275
1. Sources: cl/rung-walk-generic-pairs/SKEPTIC.md (file ok; #2 ok).
2. Commit: e06bd068e7 2026-10-22; history block 1 2026-10-22 12:13Z, split from F-252.
3. Cited by: FACTS F-252; POSITIONS none; skills sources.md:792.
4. Exists today: tests found GenericReturnRuleOuterParamWalk, GenericReturnRuleInvariantWalk, GenericReturnRuleHoldsWalk; none not found.
5. Said elsewhere: interpreter.md:75 "It loads a generic top-level function whose declared domain lies inside that of a self-typed trait's functional method of the same name, where the Return Type Rule holds."; compiler.md:173 "The Return Type Rule: the checker refuses a pair of declarations that the rule accepts: a generic declaration beside one without static parameters whose domain is a tuple of object types, as `ident[\T\](x: T): T` beside `ident(x: "
6. Curator: none in the history.

### F-280
1. Sources: cl/rung-slices-list-equality/REPORT.md (file ok; #1 ok, #2 ok).
2. Commit: ff19305cca 2026-10-23; history block 1 2026-10-23 16:54Z.
3. Cited by: FACTS none; POSITIONS none; skills sources.md:827/1307.
4. Exists today: tests found XXXNotEqualOwnEquality, ListEqualityElementwise; none not found; files found FortressLibrary.fss, List.fsi; rows now: 807 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: tests-writing.md:32 "It and `=/=` call a type's own `=` only if the type extends a `FortressLibrary` trait that declares `=`, such as `Equality` (ledger row 807)."
6. Curator: none in the history.

### F-304
1. Sources: Specification/basic/expressions/literals.tex (file ok; "Literals" ok); cl/rung-natives-float/REPORT.md (file ok; "Defects, each with its home" ok).
2. Commit: 5ecb7a841b 2026-10-31; history block 1 2026-10-31 15:12Z.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: tests found FloatNumeralOneRounding; none not found; files found literals.tex, FloatNumeralOneRounding.test.
5. Said elsewhere: revival-changes.md:95 "At a number type, the numeral converts from its exact value: exactly into the five integer types and `QQ`, and with one rounding into `RR64` and `RR32` (P-76, P-172)."; F-340 "On the compiled path a folded constant at a typed place of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `RR64` or `RR32` is that type's constant, a float rou"
6. Curator: none in the history.

### F-305
1. Sources: cl/rung-natives-choose/REPORT.md (file ok; #1 ok, #2 ok, #5 ok).
2. Commit: 71249bf556 2026-10-31; history block 1 2026-10-31 15:15Z.
3. Cited by: FACTS F-299, F-132; POSITIONS none; skills none.
4. Exists today: tests found ChooseHelperWalk, ChooseHelperZZ64Walk, ChooseHelperCompiled, ChooseHelperZZ64Compiled, ChooseTableCompiledRungE, ChooseZZ32Walk, ChooseZZ64Walk; none not found; files found FortressLibrary.fss, simpleIntArith.java, ChooseHelperWalk.fss, ChooseHelperZZ64Walk.fss, ChooseZZ32Walk.fss, ChooseZZ64Walk.fss.
5. Said elsewhere: none found. None found: `grep -rn "OverflowingChoose"` hits only F-305; F-314 and F-306 name other CHOOSE bindings.
6. Curator: none in the history.

### F-316
1. Sources: cl/rung-int-semantics-walk/REPORT.md (file ok; #4.2 ok, #7 ok).
2. Commit: f2251f9372 2026-11-05; history block 1 2026-11-05 15:26Z, split from F-125.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: tests found IntSemanticsRungI, PowChooseLcmRungE; none not found; files found IntSemanticsRungI.fss, PowChooseLcmRungE.fss, RangePrototype.fss, XXXChooseZZOutOfRangeWalk.fss; rows now: 334 FIXED, 337 FIXED, 385 FIXED, 887 NEGATIVE-VERIFIED; entry's words agree. `GCD`, `LCM`, `CHOOSE` in the entry are operators, not tests.
5. Said elsewhere: none found. None found: `grep -rn "0 LCM 0\|nonnegative"` hits only F-316 and unrelated shifts (F-124, F-125).
6. Curator: none in the history.

### F-318
1. Sources: cl/rung-walk-vector-scalar/REPORT.md (file ok; #1 ok, #2 ok, #4 ok).
2. Commit: c41c3d2b06 2026-11-05; history block 1 2026-11-05 21:35Z.
3. Cited by: FACTS F-277, F-252, F-257; POSITIONS P-160; skills sources.md:1042/1049/1063/1275/1422.
4. Exists today: tests found ExclusionVectorScalarWalk, ExclusionArrayScalarLibraryShapeWalk, GenericBesideTraitMethodInsideWalk, GenericInsideTraitMethodWalk, ExclusionVectorScalarOverlapWalk, GenericInsideTraitMethodReturnRuleWalk; none not found; files found OverloadedFunction.java; rows now: 893 NEGATIVE-VERIFIED, 894 CONTESTED, 999 NEGATIVE-BOUNDED; entry's words agree.
5. Said elsewhere: interpreter.md:75 "It loads a generic top-level function whose declared domain lies inside that of a self-typed trait's functional method of the same name, where the Return Type Rule holds."; interpreter.md:74 "It does not refuse a type that extends a self-typed trait `T[\A\]` and is not an `A` (`revival-changes."
6. Curator: none in the history.

### F-324
1. Sources: cl/rung-number-open/REPORT.md (file ok).
2. Commit: a97d60dc60 2026-11-07; history block 1 2026-11-07 09:44Z.
3. Cited by: FACTS F-240, F-311, F-131, F-318, F-151; POSITIONS P-160, P-165; skills revival-changes.md:112, sources.md:1086/1090/1116/1239/1570.
4. Exists today: tests found NumberOwnTypeNoAsFloatWalk, NumberEqualityOwnTypeWalk, NumberMixedEqualityWalk, VectorNormElementTypesWalk, NumberOwnTypeArrayWalk, NumberOpenTraitPlusBesideArrayWalk, ReflectiveQuickCheckTest; none not found; files found FortressLibrary.fss.
5. Said elsewhere: revival-changes.md:112 "`Number` declares nothing (P-165).** Each of the eight number types converts into `RR64` by its own getter, `x.asRR64`."
6. Curator: none in the history.

### F-326
1. Sources: cl/rung-seqv-meaning/REPORT.md (file ok).
2. Commit: 598331c0d2 2026-11-07; history block 1 2026-11-07 09:46Z.
3. Cited by: FACTS none; POSITIONS P-168; skills sources.md:1087/1097/1098/1099/1197.
4. Exists today: tests found StrictEquivalenceRuleWalk, ValueObjectCC64Walk, StrictEquivalenceRuleCompiled; none not found; files found StrictEquivalenceRuleCompiled.fss, StrictEquivalenceRuleWalk.fss, ValueObjectCC64Walk.fss; rows now: 908 NEGATIVE-VERIFIED, 923 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: revival-changes.md:57 "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)."; compiler.md:95 "The `value` modifier adds the mark interface `ValueObjectMark` to the object's class."
6. Curator: 2026-11-08 15:24Z (history): "the curator at 15:0x UTC asked that accidental divergences of the implementations from the specification not be recorded as language features".

### F-329
1. Sources: cl/rung-char-expr-string/REPORT.md (file ok; "Old against new: every code point in six" ok).
2. Commit: fc860b6556 2026-11-07; history block 1 2026-11-07 09:49Z.
3. Cited by: FACTS F-308; POSITIONS none; skills none.
4. Exists today: tests found NativeHelperFamilyCharWalk, NativeHelperFamilyCharCompiled, CharExprStringReadBack, XXXCharLiteralSupplementary; none not found; files found Literal.rats; rows now: 924 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: none found. None found: `grep -rn "FFFF\|charToExprString"` hits only F-308, F-323 (other topics).
6. Curator: none in the history.

### F-331
1. Sources: cl/rung-integer-conversions/REPORT.md (file ok; "What changed and why" ok).
2. Commit: 45868b1137 2026-11-08; history block 1 2026-11-08 07:31Z.
3. Cited by: FACTS F-299, F-307, F-132; POSITIONS none; skills sources.md:1137/1165.
4. Exists today: tests found IntegerConversionsWalk, IntegerConversionHelpersCompiled, XXXZZNarrowRungP; none not found; rows now: 349 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: revival-changes.md:110 "An integer converts to another integer type by a checked getter or by a low-bits function (P-161).** To convert a value, write a getter, as `x."
6. Curator: none in the history.

### F-339
1. Sources: cl/rung-literal-fold/REPORT.md (file ok; "What changed and why" ok).
2. Commit: 955cad76df 2026-11-09; history block 1 2026-11-09 06:58Z.
3. Cited by: FACTS F-262; POSITIONS none; skills sources.md:1192/1193/1204/1206/1212/1220/1226.
4. Exists today: tests found NumeralFoldWalk, LiteralFoldCompiled, NumeralFoldJUTest; none not found; files found LiteralFoldCompiled.test, PhaseOrder.java, NumeralFoldWalk.fss. `NumeralFoldJUTest` is a Java class (compiler/desugarer/NumeralFoldJUTest.java).
5. Said elsewhere: revival-changes.md:101 "An expression of numerals alone folds exactly before the checker, on both paths (P-173)."
6. Curator: none in the history.

### F-340
1. Sources: cl/rung-literal-fold/REPORT.md (file ok; "What changed and why" ok); cl/rung-static-numerals/REPORT.md (file ok).
2. Commit: 955cad76df 2026-11-09; history block 1 2026-11-09 06:58Z.
3. Cited by: FACTS F-118, F-304; POSITIONS none; skills sources.md:1193/1210/1221/1238.
4. Exists today: tests found FloatNumeralOneRounding, NumeralCoercionOnceCompiled, NumeralCoercionRaisesCompiled, NumeralFoldFloats; none not found; files found CodeGen.java, CoercionDesugarer.scala, FloatNumeralOneRounding.test, NumeralFoldFloats.test; rows now: 957 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: compiler.md:93 "It runs a program's own `coerce` from a numeral once for each place where the numeral is written, in the component class's static initializer, except where the place's type names a type parameter (below)."
6. Curator: none in the history.

### F-341
1. Sources: cl/rung-numeral-types/REPORT.md (file ok; "What changed and why" ok); cl/rung-static-numerals/REPORT.md (file ok); cl/rung-numeral-leftovers/REPORT.md (file ok); cl/rung-walk-load-check-generic-numeral/REPORT.md (file ok; "Row 981: a numeral type in a comprises c" ok); cl/rung-walk-bounds-tuple-numeral-type/REPORT.md (file ok).
2. Commit: 3de571bac7 2026-11-09; history block 1 2026-11-09 07:05Z.
3. Cited by: FACTS F-57, F-74, F-79, F-118, F-123, F-128, F-131, F-262, F-326; POSITIONS none; skills sources.md:1190/1193/1207/1234/1237/1238/1239/1269/1569/1653.
4. Exists today: tests found NumeralTypesWalk, NumeralOwnTypeWalk, NumeralNoCoercionRefusedWalk, NumeralAtReturnWalk, NumeralWhereRefusedWalk, NumeralFoldedConstantLibraryWalk, NumeralRoundsToInfinityWalk, NumeralPointRoundsToInfinityWalk, NumeralPointRoundsToInfinityAtParameterWalk, NumeralFoldedRoundsToInfinityWalk; none not found; files found Numerals.java, NumeralTypesWalk.fss; rows now: 1135 NEGATIVE-VERIFIED; entry's words agree.
5. Said elsewhere: revival-changes.md:93 "A numeral converts where it stands (P-173).** A numeral's own type is `NaturalNumeral[\n, r, v\]`, or `RadixPointNumeral[\n, m, r, v\]` with a radix point (P-174)."; interpreter.md:29 "A numeral type written as a static parameter's bound or a `typecase` arm's type loads and runs, as in `bnd[\T extends NaturalNumeral[\1, 10, 3\]\](x: ZZ32): ZZ32 = x` (ledger row 1135)."
6. Curator: none in the history.

### F-343
1. Sources: cl/rung-string-literals/REPORT.md (file ok; #1 ok, #4 ok, #8 ok).
2. Commit: e53480fc6e 2026-11-09; history block 1 2026-11-09 07:10Z.
3. Cited by: FACTS F-249, F-326; POSITIONS none; skills sources.md:1192/1193/1197/1208/1209/1212/1223.
4. Exists today: tests found StringLiteralIdentityWalk, StringLiteralIdentityCompiled; none not found; files found PreTypeCheckDesugaringVisitor.java, StringLiteralIdentityCompiled.test, Evaluator.java, equalityRule.java, StringLiteralIdentityWalk.fss, FString.java.
5. Said elsewhere: revival-changes.md:64 "Two string literals of one text are one object (P-171)."
6. Curator: none in the history.

### F-347
1. Sources: cl/rung-static-numerals/REPORT.md (file ok).
2. Commit: a26e74f5c8 2026-11-09; history block 1 2026-11-09 23:29Z.
3. Cited by: FACTS F-118, F-340; POSITIONS none; skills sources.md:1569/1653.
4. Exists today: tests found NumeralCoercionFoldJUTest, NumeralFoldIntegers, NumeralFoldFloats, NumeralAcrossComponent, NumeralMinusOnceCompiled, NumeralCoercionOnceCompiled; none not found; files found CodeGen.java, NumeralCoercionFold.java; rows now: 957 NEGATIVE-VERIFIED; entry's words agree. `NumeralCoercionFoldJUTest` is a Java class (compiler/desugarer/); library_tests/NumeralFoldIntegers and NumeralFoldFloats found.
5. Said elsewhere: (FACTS F-407  not matched)
6. Curator: none in the history.

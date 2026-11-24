<!-- Scout evidence for chunk landed-3 (30 entries of FACTS, section "Landed semantics") of the FACTS consolidation of 2026-11-24, gathered for the Opus writer; evidence of the run, not a note. Facts only, no judgment. Key: [ok] = file and heading exist (facts-extract.sh --check 'doc:PATH#HEADING'); report paths are under explorations/; "fr/" = .claude/skills/fortress-repo/; fr/sources.md is the skill's maintenance map, not a statement of the fact. "Commit" = the history's first block, then the first commit any block names (the first block names none unless said). Row statuses are ledger:N now; for every row an entry calls fixed the status is FIXED, and for every row it calls a limit or gap the status is open (NEGATIVE-VERIFIED, NEGATIVE-BOUNDED or CONTESTED), so the entries' words and the rows agree. Line citations inside entries (file:line) were not checked. -->

### F-349
1 Sources: compile-ladder/rung-numeral-leftovers/REPORT.md "1. What changed and why" ok
2 Commit: first block 2026-11-10 11:39Z (no commit named); first commit named in history: d89fc0fda at 2026-11-10 13:49Z
3 Cited by: no FACTS/POSITIONS entry; skills: fr/sources.md:1286
4 Exists: found 3: conversions-coercions.tex, OverloadedFunction.java, NumeralLeftOfRR32Walk; not found: none. Rows: none named. 
5 Said elsewhere: fr/revival-changes.md:103 "Where several declarations apply only by coercion and none is more specific, both paths stop: \"Ambiguous coercion\"."; fr/compiler.md:134 "'Ambiguous coercion in call to operator ='" (RR32, row 528). F-366 restates the numeral rule that F-349 defers to.
6 Curator: none in history
### F-362
1 Sources: compile-ladder/rung-parser-declarations/REPORT.md "What changed and why" ok; compile-ladder/rung-parser-declarations/REPORT.md "Programs run old against new" ok
2 Commit: first block 2026-11-16 04:24Z (no commit named); first commit named in history: 567c36dad at 2026-11-16 06:44Z
3 Cited by: no FACTS/POSITIONS entry; skills: none
4 Exists: found 8: Fortress.java, TemplateParser.java, MicroGptFlat.fss, FlatArrays.fsi, SumSignAccumulator.fss, ApiPostfixExponentOp.fss, SumSignAccumulatorCompiled.test, ApiPostfixExponentOpCompiled.test; not found: none. Rows: 42 NEGATIVE-VERIFIED. 
5 Said elsewhere: F-58 and F-59 name SUM/PROD at the model's lines; no skill file names the sign (grep '∑' in fr/references and SKILL.md: no hit).
6 Curator: 2026-11-16 07:45Z block: "by the diffs that the curator approved on 2026-11-16" (no quote of his words).
### F-363
1 Sources: compile-ladder/rung-superscript-after/REPORT.md "Each form on the base and after" ok; compile-ladder/rung-superscript-after/REPORT.md "The trees" ok
2 Commit: first block 2026-11-16 04:27Z (no commit named); first commit named in history: 567c36dad at 2026-11-16 06:44Z
3 Cited by: no FACTS/POSITIONS entry; skills: none
4 Exists: found 9: Expression.rats, SubscriptThenSuperscriptCompiled, Evaluator.java, SuperscriptAfterDottedAccess.fss, SuperscriptAfterParenthesisedCall.fss, SuperscriptAfterCallRefused.fss, SuperscriptAfterDottedAccessCompiled.test, SuperscriptAfterParenthesisedCallCompiled.test, XXXSuperscriptAfterCallRefusedCompiled.test; not found: .test. Rows: none named. (`.test` is a fragment of the entry's list 'with its `.test`', not a file.)
5 Said elsewhere: fr/tests-writing.md:34 "It can follow a dotted access or a subscript: `p.wq^T` is `(p.wq)^T`, and `x[5]^2` is `(x[5])^2`. After a call, parenthesise first, as `(f(x))^T`: `f(x)^T` is a static error."; F-387 (compiled `x[5]^2`), F-398 (walk subscript math item).
6 Curator: none in history
### F-366
1 Sources: compile-ladder/rung-numeral-most-specific/REPORT.md "1. What changed and why" ok; compile-ladder/rung-numeral-most-specific/REPORT.md "5. Points to report" ok
2 Commit: first block 2026-11-16 04:32Z (no commit named); first commit named in history: 567c36dad at 2026-11-16 06:44Z
3 Cited by: F-58 F-280 F-341 F-349; skills: fr/sources.md:1305, fr/sources.md:1306, fr/sources.md:1307, fr/sources.md:1317, fr/sources.md:1329, fr/sources.md:1335
4 Exists: found 9: FortressLibrary.fss, Functionals.scala, OverloadedFunction.java, NumeralMostSpecificCompiled, NumeralEqualsNumberCompiled, NumeralTieDefaultCompiled, NumeralMostSpecificWalk, NumeralEqualsNumberWalk, NotEqualNumeral; not found: none. Rows: 528 NEGATIVE-VERIFIED, 1016 NEGATIVE-VERIFIED, 1017 NEGATIVE-VERIFIED, 1059 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/revival-changes.md:105 "a call with a numeral runs the declaration that fits the numeral's default type, unless the numeral's coercion reaches another declaration whose declared parameter types are strict subtypes of the first one's."; fr/compiler.md:134 (rows 1059, 528); F-349 and F-341 restate parts; F-58, F-280 cite it.
6 Curator: 2026-11-16 07:45Z (block text; review of the batch's choice, from HELD.md "Held in chat (2026-11-16)"): he said "Good. Makes sense. Same with point 3, 4." The block says it is a review, not a stated decision; POSITIONS unchanged.
### F-367
1 Sources: compile-ladder/rung-generic-function-value/REPORT.md "The rule as built" ok; compile-ladder/rung-generic-function-value/REPORT.md "Runs to report, not tests" ok
2 Commit: first block 2026-11-16 04:35Z (no commit named); first commit named in history: 567c36dad at 2026-11-16 06:44Z
3 Cited by: no FACTS/POSITIONS entry; skills: none
4 Exists: found 7: FTypeGenericArrow.java, Fcn.java, EvaluatorBase.java, OverloadedFunction.java, GenericFunctionAsValueWalk.fss, GenericFunctionRowLiftWalk.fss, GenericFunctionAssignedWalk.fss; not found: none. Rows: 1018 NEGATIVE-VERIFIED, 1019 NEGATIVE-VERIFIED, 1020 NEGATIVE-VERIFIED, 1021 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/interpreter.md:16 "A generic function passed as a value takes its instance from the arrow type that receives it: a parameter, a local variable declared with the type, or an assignment."; F-365 is the checker's side ("instantiates a reference to a generic function by the arrow type that receives it").
6 Curator: none in history
### F-369
1 Sources: compile-ladder/rung-tuple-binding/REPORT.md "What changed and why" ok; compile-ladder/rung-tuple-binding/REPORT.md "The binding as compiled" ok
2 Commit: first block 2026-11-16 04:37Z (no commit named); first commit named in history: 567c36dad at 2026-11-16 06:44Z
3 Cited by: F-58 F-398; skills: none
4 Exists: found 10: Decls.scala, Decls.scala, CodeGen.java, MicroGptFlat.fss, LocalTupleBindingMixedTypes, XXXLocalTupleBindingMixedRefused, TopLevelTupleBindingCompiled.test, TopLevelTupleBindingImport.test, TopLevelTupleBindingMixedTypes.test, XXXTopLevelTupleBindingType.test; not found: none. Rows: 1011 NEGATIVE-BOUNDED, 1029 FIXED, 1031 FIXED. 
5 Said elsewhere: F-398 (walk binds a tuple binding's names from one run of its right side); F-58 (beta1 m site); fr/compiler.md:145 on tuple bindings to case/try numerals (row 1074, other point); no skill line states the top-level tuple binding.
6 Curator: none in history
### F-372
1 Sources: compile-ladder/rung-method-forwarders/REPORT.md "What changed and why" ok
2 Commit: first block 2026-11-17 02:47Z (no commit named); first commit named in history: 7858d0e97 at 2026-11-17 07:11Z
3 Cited by: no FACTS/POSITIONS entry; skills: fr/sources.md:1365, fr/sources.md:1366
4 Exists: found 6: StandardMinMax (as a name in FortressLibrary.fss), StandardTotalOrder (as a name in PrefixMap.fss), TraitOwnMethodBesideInheritedCompiled, ApiTraitMethodNotFirstCompiled, TraitMethodDiamondRedeclaredCompiled, FunctionalMethodMeetNarrowedSelfNotFirst; not found: none. Rows: 571 FIXED, 732 FIXED, 990 FIXED, 1037 NEGATIVE-VERIFIED. StandardMinMax and StandardTotalOrder: found in Library/FortressLibrary.fss:262 (grep; the tracked-file name check missed them, they are traits, not files).
5 Said elsewhere: no hit in fr/references or SKILL.md for 'forwarder' or 'inherited method'; F-399 (dispatch method reads each argument at its own local) is the entry's cited neighbour.
6 Curator: none in history
### F-373
1 Sources: compile-ladder/rung-label-exit/REPORT.md "What changed and why" ok; compile-ladder/rung-label-exit/REPORT.md "Points to report reached" ok
2 Commit: first block 2026-11-17 02:50Z (no commit named); first commit named in history: 7858d0e97 at 2026-11-17 07:11Z
3 Cited by: no FACTS/POSITIONS entry; skills: fr/sources.md:1363, fr/sources.md:1365
4 Exists: found 4: LabelExit, LabelExit.java, Exception, LabelExitCompiled; not found: none. Rows: 81 FIXED, 322 NEGATIVE-VERIFIED, 340 NEGATIVE-VERIFIED, 890 NEGATIVE-VERIFIED, 1040 NEGATIVE-VERIFIED, 1041 CONTESTED, 1042 CONTESTED. `Exception` is a type, not a path.
5 Said elsewhere: fr/compiler.md:151 "An `exit` that runs after its `label` block has completed, from a function made in the block, ends a compiled program with the Java exception `LabelExit`, which no `catch` clause takes. Under walk, a `catch` clause of the library's `LabelException` takes it. ... (ledger row 1041)." (entry says row 1040: walk's `catch` of `Exception` takes the exit); F-401 (exit out of atomic).
6 Curator: none in history
### F-374
1 Sources: compile-ladder/rung-atomic-expr-field/REPORT.md "What changed and why" ok; compile-ladder/rung-atomic-expr-field/REPORT.md "The bytecode" ok
2 Commit: first block 2026-11-17 02:50Z (no commit named); first commit named in history: 7858d0e97 at 2026-11-17 07:11Z
3 Cited by: no FACTS/POSITIONS entry; skills: fr/sources.md:1363, fr/sources.md:1364, fr/sources.md:1365
4 Exists: found 5: MutableFValue, Lazy.fss, AtomicFieldCompiled, VarFieldCapturedCompiled, AtomicExprCompiled; not found: none. Rows: 112 NEGATIVE-VERIFIED, 319 FIXED, 322 NEGATIVE-VERIFIED, 641 NEGATIVE-BOUNDED, 875 FIXED, 1043 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/compiler.md:103 "an object's `var` field in a cell that the object holds"; compiler.md:152 "two `value` objects with a `var` field, built alike, are not strictly equivalent: `V(1) === V(1)` is `false` (ledger row 112)."; SKILL.md:124 "the compiled code tracks each mutable variable that the block reads or writes, an object's `var` field among them."
6 Curator: none in history
### F-375
1 Sources: compile-ladder/rung-walk-value-bound/REPORT.md "What changed and why" ok; compile-ladder/rung-walk-value-bound/REPORT.md "Programs run old against new" ok; compile-ladder/rung-number-objects/REPORT.md "Every pair that walk refuses at load after the change and loaded before" ok; compile-ladder/rung-number-objects/REPORT.md "Programs run old against new" ok; compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md "Row 1058: a tuple result at object arguments (fork L2)" ok
2 Commit: first block 2026-11-17 02:51Z (no commit named); first commit named in history: 7858d0e97 at 2026-11-17 07:11Z
3 Cited by: F-252 F-257; skills: fr/sources.md:1368
4 Exists: found 7: GenericBesidePlainObjectReturnRuleWalk.fss, GenericBesidePlainObjectValidWalk.fss, GenericBesidePlainEveryInstanceWalk.fss, TraitGenericMethodValueBoundWalk.fss, OverloadedGenericValueBoundWalk.fss, NonValueBelowValueTypeWalk.fss, GenericBesidePlainTupleReturnWalk.fss; not found: none. Rows: 550 FIXED, 697 NEGATIVE-VERIFIED, 997 FIXED, 998 FIXED, 1044 NEGATIVE-VERIFIED, 1058 FIXED. 
5 Said elsewhere: fr/interpreter.md:61 (walk refuses pairs 'fails the Return Type Rule' / 'Meet Rule'); fr/compiler.md:173 (checker refuses a generic beside a tuple-of-objects declaration that walk loads, row 1048); F-252, F-257 cite it.
6 Curator: none in history
### F-377
1 Sources: compile-ladder/rung-comprises-cast/REPORT.md "What changed and why" ok; compile-ladder/rung-self-arm-closure/REPORT.md "1. What changed and why" ok; reviews/model-comparison/probe-2026-11-18.md "Point 1" ok; reviews/model-comparison/probe-2026-11-18.md "Point 2" ok; compile-ladder/rung-checker-most-specific/REPORT.md "What changed and why" ok
2 Commit: first block 2026-11-17 02:54Z (no commit named); first commit named in history: 7858d0e97 at 2026-11-17 07:11Z
3 Cited by: F-225 F-408 F-406; skills: fr/sources.md:1355, fr/sources.md:1421, fr/sources.md:1447
4 Exists: found 12: TraitSelfType, StandardTotalOrder (as a name in PrefixMap.fss), ComprisesValueAtListedTypeCompiled, ComprisesValueAtConditionalArmRun, ComprisesValueFromClosureRun, SelfTypeReturnSelfRun, SelfTypeReturnSelfAtTraitRun, SelfTypeArmRun, SelfTypeFromClosureRun, VarFieldAssignedSubtypeRun, ComprisesSelfListedTypeCompiled, ComprisesSelfAbstractFunctionalMethodCall; not found: none. Rows: 307 NEGATIVE-VERIFIED, 695 FIXED, 991 FIXED, 1050 FIXED, 1051 FIXED, 1070 NEGATIVE-VERIFIED. StandardTotalOrder is a trait in Library/FortressLibrary.fss.
5 Said elsewhere: fr/revival-changes.md:41 "One shape fails the JVM's verification when its class loads: a `typecase` with `self` in one arm and another value in the other (row 1070)."; F-408, F-406, F-225 cite it.
6 Curator: none in history
### F-378
1 Sources: compile-ladder/rung-tuple-parameter/REPORT.md "The convention as built" ok
2 Commit: first block 2026-11-17 09:14Z (no commit named); first commit named in history: 00dd16a89 at 2026-11-17 11:49Z
3 Cited by: no FACTS/POSITIONS entry; skills: fr/compiler.md:135, fr/sources.md:1402, fr/sources.md:1414
4 Exists: found 1: TupleIndexMethodCompiled.test; not found: none. Rows: 1054 NEGATIVE-VERIFIED, 1055 NEGATIVE-VERIFIED, 1056 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/compiler.md:135 "A parameter of a declared tuple type is one JVM parameter for each element (F-378). So in a `VerifyError`, the method's descriptor lists each element of a tuple parameter as a parameter of its own."
6 Curator: none in history
### F-380
1 Sources: compile-ladder/rung-numeral-block-end/REPORT.md "What changed and why" ok; compile-ladder/rung-numeral-block-end/SKEPTIC.md "Findings and fixes" ok
2 Commit: first block 2026-11-17 09:20Z (no commit named); first commit named in history: 00dd16a89 at 2026-11-17 11:49Z
3 Cited by: no FACTS/POSITIONS entry; skills: fr/sources.md:1402
4 Exists: found 6: NumeralEndsBlockAfterDeclarationCompiled, BlockEndsInTupleOfNumeralCompiled, TupleBindingIfBranchesCompiled, NumeralJoinBeyondRange.fss, XXXNumeralJoinBeyondRange.test, NumeralEndsUntypedBlockCompiled; not found: none. Rows: 1060 FIXED, 1074 NEGATIVE-VERIFIED, 1075 NEGATIVE-VERIFIED. 
5 Said elsewhere: no skill line states the compiled path's numeral at a block's end; fr/compiler.md:145 states rows 1074/1075's refusals (try ending in numerals; case/try numeral tuples at an untyped tuple binding); revival-changes.md:122 is walk's rule for a numeral's declared type, a related point.
6 Curator: none in history
### F-382
1 Sources: compile-ladder/rung-typecase-unbound-arm/REPORT.md "1. What changed and why" ok
2 Commit: first block 2026-11-17 21:29Z (no commit named); first commit named in history: d3747846c at 2026-11-18 00:16Z
3 Cited by: F-361 F-379; skills: fr/sources.md:1423, fr/sources.md:1447
4 Exists: found 7: TypeDisambiguator.java, TypecaseUndefinedArmWalk.fss, TypecaseUndefinedNameInArmTypeWalk.fss, TypecaseTypeParamArmWalk.fss, XXXTypecaseUndefinedArmCompiled, XXXTypecaseUndefinedNameInArmTypeCompiled, TypecaseTypeParamArmCompiled; not found: none. Rows: 1064 CONTESTED. 
5 Said elsewhere: fr/revival-changes.md:91 states row 1064 ("under walk `(NoSuchType, ZZ32) =>` takes `(\"s\", 3)`") and that an undefined type is 'Float is undefined.' on both paths; F-361 and F-379 cite F-382.
6 Curator: none in history
### F-384
1 Sources: compile-ladder/rung-kind-env-generic/REPORT.md "What changed and why" ok; compile-ladder/rung-kind-env-generic/REPORT.md "The one library's four declarations" ok
2 Commit: first block 2026-11-17 21:31Z (no commit named); first commit named in history: d3747846c at 2026-11-18 00:16Z
3 Cited by: F-281 F-181; skills: fr/sources.md:1433
4 Exists: found 4: CodeGen.java, ComprisesWhereMemberCompiled.test, TypecaseGenericArmsCompiled.test, TypecaseTupleNamesCompiled.test; not found: none. Rows: 812 FIXED, 822 FIXED, 1066 FIXED, 1067 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/compiler.md:157 "Where a `typecase` clause types its binder at a trait above the selector's object type, a method call on the binder fails the JVM's verification ... (ledger row 1067)."; F-386 (intersection cast the entry names); F-281, F-181 cite it.
6 Curator: none in history
### F-385
1 Sources: compile-ladder/rung-self-arm-closure/REPORT.md "1. What changed and why" ok; reviews/batch-33-review.md "2. The decisions that landed at a default" ok
2 Commit: first block 2026-11-17 21:34Z (no commit named); first commit named in history: d3747846c at 2026-11-18 00:16Z
3 Cited by: F-225; skills: fr/sources.md:1421, fr/sources.md:1431, fr/sources.md:1445, fr/sources.md:1447
4 Exists: found 2: MethodInstantiater.java, SelfTypeParameterReceiverRun; not found: none. Rows: 1052 FIXED. 
5 Said elsewhere: fr/revival-changes.md:41 "For a generic object that lists `T` first in its `extends` clause, no test covers such a body (row 1052)." (row 1052 is FIXED; the entry's second limit is a generic object); F-225 cites it.
6 Curator: none in history
### F-386
1 Sources: compile-ladder/rung-intersection-receiver/REPORT.md "1. What changed and why" ok; compile-ladder/rung-intersection-receiver/REPORT.md "5. Programs run old against new" ok
2 Commit: first block 2026-11-17 21:36Z (no commit named); first commit named in history: d3747846c at 2026-11-18 00:16Z
3 Cited by: F-76 F-384; skills: none
4 Exists: found 2: CoverageReturnMethodCall.test, TypecaseBinderMethodCall.test; not found: none. Rows: 1072 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/compiler.md:158 "The checker refuses a call on `x'` of a method of `X`'s bound ... (ledger row 1072). Call it on the selector"; compiler.md:160 on a function expression typed by an intersection (row 559); revival-changes.md:41 on `self`'s intersection type; F-76, F-384 cite it.
6 Curator: none in history
### F-387
1 Sources: compile-ladder/rung-checker-small-gaps/REPORT.md "What changed and why" ok
2 Commit: first block 2026-11-17 21:38Z (no commit named); first commit named in history: d3747846c at 2026-11-18 00:16Z
3 Cited by: F-363 F-398; skills: fr/sources.md:1435
4 Exists: found 2: Operators.scala, SubscriptThenSuperscriptCompiled.test; not found: none. Rows: none named. 
5 Said elsewhere: fr/tests-writing.md:34 "`x[5]^2` is `(x[5])^2`."; F-363 and F-398 cite it.
6 Curator: none in history
### F-388
1 Sources: compile-ladder/rung-number-payload-objects/REPORT.md "The design as built (a point to report)" ok; compile-ladder/rung-first-run-one-library/REPORT.md "The design as built (a point to report)" ok
2 Commit: first block 2026-11-18 05:30Z (no commit named); first commit named in history: 295c215c2 at 2026-11-21 02:36Z
3 Cited by: F-301 F-302 F-353 F-390 F-136 F-379; skills: fr/sources.md:1455, fr/sources.md:1462, fr/sources.md:1463, fr/sources.md:1464, fr/sources.md:1466, fr/sources.md:1473, fr/sources.md:1514, fr/sources.md:1517
4 Exists: found 5: CompilerBuiltin, LibraryNames, NumberObjectsCompiled.test, XXXNumberTypeExtendRefusedCompiled.test, ComprisesMeetGenericTrait.test; not found: F<T>. Rows: 1081 CONTESTED, 1082 NEGATIVE-VERIFIED. `F<T>` is a placeholder; the payload classes FZZ32, FZZ64, FZZ, FNN32, FNN64, FRR32, FRR64 exist in compiler/runtimeValues/ (ls).
5 Said elsewhere: fr/compiler.md:21 names the payload classes (`FZZ32`, `FRR64`), "payload classes, which hold the JVM value, as `FRR64` holds a `double`"; compiler.md:43 "a built-in number type named as a value ... 'Can't compile the number type ZZ32 as a value yet' (ledger row 1082)"; compiler.md:148 on row 1081; F-301, F-302, F-353, F-390, F-136, F-379 cite it.
6 Curator: none in history
### F-389
1 Sources: compile-ladder/rung-closure-name-once/REPORT.md "4. The naming as built" ok
2 Commit: first block 2026-11-18 05:34Z (no commit named); first commit named in history: ba3c7c876 at 2026-11-18 08:14Z
3 Cited by: no FACTS/POSITIONS entry; skills: none
4 Exists: found 4: LexicographicOrder (as a name in PureList.fss), ConditionalReductionCompiled.test, ArrowCoercionFnExprCompiled.test, OneLibraryConditionalReduction.test; not found: none. Rows: none named. 
5 Said elsewhere: no hit in fr/references or SKILL.md for closure naming ('closure.*name', '#2', 'gensym'); F-34 is the measure the entry names (the one library's `LexicographicOrder`).
6 Curator: none in history
### F-397
1 Sources: compile-ladder/rung-radix-point-leading-zeros/REPORT.md "What changed and why" ok; compile-ladder/rung-radix-point-leading-zeros/REPORT.md "Every reader of the node's text, and what it now sees" ok
2 Commit: first block 2026-11-23 12:12Z (no commit named); first commit named in history: 0a83a7049 at 2026-11-23 16:08Z
3 Cited by: no FACTS/POSITIONS entry; skills: none
4 Exists: found 4: ExprFactory.java, NumeralNumbers.java, RadixPointLeadingZerosWalk.fss, RadixPointLeadingZerosCompiled.test; not found: none. Rows: none named. 
5 Said elsewhere: fr/revival-changes.md:93 "`n` the digit count, `m` the count of digits after the point, `r` the radix, and `v` the digits read as one integer in that radix, so `3.125` is a `RadixPointNumeral[\4, 3, 10, 3125\]`." (no mention of leading zeros); fr/compiler.md:146 and interpreter.md:28 are about a radix-point numeral rounding to Infinity.
6 Curator: none in history
### F-398
1 Sources: compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md "What changed and why" ok; compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md "Old against new" ok
2 Commit: first block 2026-11-23 12:17Z (no commit named); first commit named in history: 0a83a7049 at 2026-11-23 16:08Z
3 Cited by: F-363 F-369 F-387; skills: none
4 Exists: found 6: Evaluator.java, DesugarerVisitor.java, SubscriptThenSuperscriptWalk.fss, TopLevelTupleBindingOnceWalk.fss, FieldTupleBindingOnceWalk.fss, TupleBindingNumeralTypesWalk.fss; not found: none. Rows: 1105 NEGATIVE-VERIFIED. 
5 Said elsewhere: no skill line for tuple bindings under walk; fr/tests-writing.md:34 "`x[5]^2` is `(x[5])^2`"; F-387 (compiled subscript math item), F-369 (compiled top-level tuple binding); F-363, F-369, F-387 cite it.
6 Curator: none in history
### F-399
1 Sources: compile-ladder/rung-self-not-first-dispatch/REPORT.md "What changed and why" ok
2 Commit: first block 2026-11-23 12:17Z (no commit named); first commit named in history: 0a83a7049 at 2026-11-23 16:08Z
3 Cited by: F-372; skills: none
4 Exists: found 6: ForTraitOrObject (as a name in OverloadSet.java), OverloadSet.java, FunctionalMethodOverloadSelfLast, FunctionalMethodCoverSelfSecond, FunctionalMethodSelfSecondReceiverTested, FunctionalMethodMeetNarrowedSelfNotFirst; not found: none. Rows: 594 NEGATIVE-VERIFIED, 724 NEGATIVE-VERIFIED. 
5 Said elsewhere: no hit in fr/references or SKILL.md for 'dispatch method' + 'self'; F-372 cites F-399 ("its dispatch method reads each argument at its own local (F-399)").
6 Curator: none in history
### F-400
1 Sources: compile-ladder/rung-override-compiled/REPORT.md "What changed and why" ok
2 Commit: first block 2026-11-23 12:20Z (no commit named); first commit named in history: 0a83a7049 at 2026-11-23 16:08Z
3 Cited by: F-88 F-292 F-315; skills: fr/sources.md:1567, fr/sources.md:1580
4 Exists: found 6: STypesUtil.scala, CodeGen.java, OverloadingChecker.scala, OverrideModifierCodeGeneration, OverrideBridgesCompiled, XXXOverrideNothingCompiled; not found: none. Rows: 1106 NEGATIVE-VERIFIED, 1107 NEGATIVE-VERIFIED, 1108 NEGATIVE-VERIFIED, 1109 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/compiler.md:84 "It refuses an `override` of or by a method with static parameters of its own ... (ledger row 1106)."; fr/revival-changes.md:32 "`override` widens. An `override` overrides an inherited declaration only where the inherited parameter types are strictly narrower than its own."; F-88, F-292, F-315 cite it.
6 Curator: none in history
### F-401
1 Sources: compile-ladder/rung-exit-out-of-atomic/REPORT.md "What changed and why" ok; compile-ladder/rung-exit-out-of-atomic/REPORT.md "The tests: failing on the base, passing after" ok
2 Commit: first block 2026-11-23 12:21Z (no commit named); first commit named in history: 0a83a7049 at 2026-11-23 16:08Z
3 Cited by: F-351 F-373; skills: fr/sources.md:1574
4 Exists: found 8: LabelExit, BaseTask.java, LabelException, FortressTaskRunner.java, RuntimeException (as a name in FortressMethodAdapter.java), atomic.tex, ExitOutOfAtomicWalk.fss, ExitOutOfAtomicCompiled; not found: none. Rows: 1041 CONTESTED, 1110 NEGATIVE-VERIFIED, 1111 NEGATIVE-VERIFIED. LabelExit, LabelException are classes (found as names).
5 Said elsewhere: fr/compiler.md:151 "An `exit` that runs after its `label` block has completed ... (ledger row 1041)"; compiler.md:139 "A `try`'s `finally` clause does not run when one of these leaves the `try` block: an `exit`, ..." (row 890); F-373 states the compiled exit and cites F-401; F-351 (compiled transaction) cites it.
6 Curator: none in history
### F-402
1 Sources: coordinator/CLIMB-BATCH-29.md "The three points with no default on record" ok
2 Commit: first block 2026-11-23 17:36Z (no commit named); none named in any block
3 Cited by: no FACTS/POSITIONS entry; skills: none
4 Exists: found 5: constant.tex, IntegerLiteralFoldingVisitor.java, NumeralFoldWalk.fss, LiteralFoldCompiled.test, NumeralFoldJUTest; not found: none. Rows: none named. 
5 Said elsewhere: fr/revival-changes.md:64 "Two string literals joined by `||` fold into one"; revival-changes.md:101 "`||` of string literals folds into one literal (P-171)." (strings only; no skill line for two natural numerals joined by `||`).
6 Curator: none in history
### F-403
1 Sources: compile-ladder/rung-boolean-equivalence/REPORT.md "What changed and why" ok; compile-ladder/rung-boolean-equivalence/REPORT.md "Row 184's own program, and the other programs" ok
2 Commit: first block 2026-11-23 20:03Z (no commit named); first commit named in history: 1caac80b3 at 2026-11-23 21:55Z
3 Cited by: no FACTS/POSITIONS entry; skills: fr/sources.md:1599
4 Exists: found 3: Fortress.NegatedOperators.tex, BooleanEquivalenceWalk.fss, OneLibraryBooleanEquivalence.test; not found: none. Rows: 1118 NEGATIVE-VERIFIED, 1121 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/revival-changes.md:57 "The operator `≡` (IDENTICAL TO, `EQV` or `EQUIV`) is a different one: logical equivalence on booleans. The interpreter's library declares it and its negation `≢` (`NEQV`) for booleans only, so on other values each is a type error."
6 Curator: no quote of his words: block 2026-11-23 21:55Z cites "the curator's go of 08:4x UTC on 2026-11-23" (took fork E1's default without deciding it) and "his choice of 11:2x UTC on 2026-11-23" (the review queue's rule).
### F-405
1 Sources: compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md "What changed and why" ok; compile-ladder/rung-walk-load-check-generic-numeral/REPORT.md "Programs run old against new" ok; compile-ladder/rung-walk-bounds-tuple-numeral-type/REPORT.md "1. What changed and why" ok
2 Commit: first block 2026-11-23 20:07Z (no commit named); first commit named in history: 61b50cd34 at 2026-11-24 08:12Z
3 Cited by: F-26 F-253; skills: fr/sources.md:1651, fr/sources.md:1652
4 Exists: found 5: Constructor.java, GenericMethodOverloadArity.fss, GenericMethodOverloadSetWalk.fss, GenericOverloadStaticArgKindsWalk.fss, GenericMethodBoundsDifferWalk.fss; not found: none. Rows: 744 NEGATIVE-VERIFIED, 780 NEGATIVE-VERIFIED, 1123 NEGATIVE-VERIFIED, 1126 NEGATIVE-VERIFIED, 1133 NEGATIVE-VERIFIED, 1134 NEGATIVE-VERIFIED, 1139 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/interpreter.md:136 "Walk checks the binding of a dotted method of a generic trait or object only when the program makes an instance, at run time. ... (ledger row 864)."; F-26 and F-253 cite it.
6 Curator: none in history
### F-406
1 Sources: compile-ladder/rung-compiled-missing-methods/REPORT.md "1. What changed and why" ok; compile-ladder/rung-compiled-missing-methods/REPORT.md "5. Programs run on the old code and on the new" ok
2 Commit: first block 2026-11-23 20:08Z (no commit named); first commit named in history: 1caac80b3 at 2026-11-23 21:55Z
3 Cited by: F-377; skills: none
4 Exists: found 5: FortressLibrary, VarFieldAssignedSubtypeRun, FunctionalMethodComprisedObject, ComprisesSelfAbstractFunctionalMethodCall, CoercionAnyOverloadRungC; not found: none. Rows: none named. FortressLibrary is Library/FortressLibrary.fss.
5 Said elsewhere: no hit in fr/references or SKILL.md for 'setter' + 'overload method' as the entry states it; F-377 cites F-406 (assignment to a `var` field), F-408 (comprised object's functional method).
6 Curator: no quote of his words: block 2026-11-23 21:55Z cites "the curator's go of 08:4x UTC on 2026-11-23" which took the default "without deciding it".
### F-407
1 Sources: compile-ladder/rung-numeral-coercion-body/REPORT.md "What changed and why" ok
2 Commit: first block 2026-11-24 05:35Z (no commit named); first commit named in history: 61b50cd34 at 2026-11-24 08:12Z
3 Cited by: F-342 F-341 F-347; skills: fr/sources.md:1653, fr/sources.md:1668
4 Exists: found 6: Numerals.java, NumeralCoercionBodyWalk.fss, NumeralCoercionNumberRangeWalk.fss, NumeralCoercionNumberAtCallWalk.fss, NumeralCoercionBodyCompiled, XXXNumeralCoercionNumberRangeCompiled.test; not found: none. Rows: 1131 NEGATIVE-VERIFIED, 1132 NEGATIVE-VERIFIED. 
5 Said elsewhere: fr/revival-changes.md:93 "A numeral converts where it stands (P-173)." (numeral's own type and its numbers; coercion body not stated there); F-341, F-342, F-347 cite it.
6 Curator: none in history

<!-- scout output for chunk inference; entries read at 2d1614aaee; retrieval only. Lines may end in … where cut to fit 1,500 characters. -->

## F-28

Title: "Walk instantiates a generic declaration declared to return `Any`."; entry 413 chars.
Cited: tests/GenericReturningAny.fss: exists; compile-ladder/rung-walk-dispatch/REPORT.md: exists; MakeInferenceSpecific: found ProjectFortress/src/com/sun/fortress/interpreter/evaluator/MakeInferenceSpecific.java
Rows: row 157: FIXED
Detail: compile-ladder/rung-walk-dispatch/REPORT.md -> ## 3. Precedent search
Commits (-S "Walk instantiates a generic declaration"): first 8f7e183d49 2026-09-30 Walk chooses between a generic declaration and a plain one on their declared domains, di ; last 8f7e183d49 2026-09-30 Walk chooses between a generic declaration and a plain one on their declared domains, di (1 hits)
History blocks (2): L93 2026-10-13 17:58Z 0c, L1669 2026-10-13 19:03Z 523c
Title-words "Walk instantiates a generic" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-28: FACTS none; POSITIONS none

## F-51

Title: "A generic call converts a narrower argument for a parameter typed by a"; entry 623 chars.
Cited: tests/InferCoercionRungK: exists; compiler_tests/InferCoercionShapes: exists; reviews/numeric-hierarchy-integration-review/row388-container-probe.md: exists; ZZ32: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ZZ32.java ProjectFortress/tests/ZZ32RemainderByZero; RR64: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR64.java ProjectFortress/library_tests/RR64Functio
Rows: row 388: FIXED
Detail: reviews/numeric-hierarchy-integration-review/row388-container-probe.md -> (no section named)
Detail extra: the probe note row388-container-probe.md has no numbered sections; cite by file.
Commits (-S "A generic call converts a"): first 55f1a1352d 2026-10-13 FACTS and POSITIONS: the pilot chunks consolidated, F-51 to F-72 and P-37 to P-62 ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation's five chunks (4 hits)
History blocks (3): L177 2026-10-13 17:58Z 0c, L789 2026-10-13 18:16Z 1388c, L3371 2026-10-22 12:03Z 564c
Title-words "A generic call converts" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-51: FACTS none; POSITIONS none

## F-55

Title: "Static arguments are inferred with coercion on both paths: the compile"; entry 956 chars.
Cited: compiler_tests/InferCoercionShapes: exists; tests/InferCoercionRungK: exists; compile-ladder/rung-inference-checker/REPORT.md: exists; compile-ladder/rung-inference-walk/REPORT.md: exists; T: found ProjectFortress/src/com/sun/fortress/parser/templateparser/TemplateParser.rats ProjectFortress/src/com/sun/for; ZZ32: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ZZ32.java ProjectFortress/tests/ZZ32RemainderByZero
Rows: row 510: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-inference-checker/REPORT.md -> ### 3.2 The attempts, and what each one does | compile-ladder/rung-inference-walk/REPORT.md -> ## 2. What changed; ## 9. Every measured defect's home
Commits (-S "Static arguments are inferred with"): first 4feafe6fae 2026-10-13 FACTS: the checker section's second slice consolidated to what a decision needs ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation's five chunks (4 hits)
History blocks (7): L193 2026-10-13 17:58Z 0c, L815 2026-10-13 18:16Z 4187c, L2013 2026-10-14 04:41Z 714c, L2089 2026-10-14 06:09Z 800c, L3407 2026-10-22 12:03Z 646c, L4759 2026-10-30 01:25Z 994c, L6463 2026-11-09 07:14Z 954c
Title-words "Static arguments are inferred" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-55: FACTS none; POSITIONS none

## F-56

Title: "The compiled checker keeps the expected type, for inferring the call's"; entry 584 chars.
Cited: scala_src/typechecker/impls/Operators.scala: exists; compiler_tests/InferCoercionShapes: exists; reviews/numerics-plan-coordinator/measure-D.md: exists
Detail: reviews/numerics-plan-coordinator/measure-D.md -> ## 1. The shadow
Commits (-S "The compiled checker keeps the"): first 55f1a1352d 2026-10-13 FACTS and POSITIONS: the pilot chunks consolidated, F-51 to F-72 and P-37 to P-62 ; last 55f1a1352d 2026-10-13 FACTS and POSITIONS: the pilot chunks consolidated, F-51 to F-72 and P-37 to P-62 (1 hits)
History blocks (5): L197 2026-10-13 17:58Z 0c, L821 2026-10-13 18:16Z 2202c, L2019 2026-10-14 04:41Z 589c, L2095 2026-10-14 06:09Z 610c, L3413 2026-10-22 12:03Z 568c
Title-words "The compiled checker keeps" in FACTS lines: none; in POSITIONS lines: 42(P-43)
Cited by number F-56: FACTS none; POSITIONS none

## F-59

Title: "`SUM` and `PROD` take their identity from the static argument, and the"; entry 1582 chars.
Cited: compiler_tests/WitnessIdentityRungG: exists; compiler_tests/InferBigOperatorSelfBound: exists; reviews/sum-replacement-judgement.md: exists; ZZ32: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ZZ32.java ProjectFortress/tests/ZZ32RemainderByZero; InferBigOperatorUnwritten: found ProjectFortress/compiler_tests/InferBigOperatorUnwritten.test ProjectFortress/compiler_tests/InferBigOperatorU
Detail: reviews/sum-replacement-judgement.md -> ## 5. What each path does with each option; ## 2. The terms, once
Commits (-S "`SUM` and `PROD` take their"): first 55f1a1352d 2026-10-13 FACTS and POSITIONS: the pilot chunks consolidated, F-51 to F-72 and P-37 to P-62 ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation's five chunks (3 hits)
History blocks (8): L209 2026-10-13 17:58Z 0c, L839 2026-10-13 18:16Z 2156c, L2313 2026-10-15 00:47Z 675c, L3431 2026-10-22 12:03Z 675c, L4513 2026-10-24 03:41Z 1329c, L7511 2026-11-16 04:41Z 1389c, L7583 2026-11-16 06:44Z 1479c, L7835 2026-11-16 07:45Z 1444c
Title-words "SUM and PROD take" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-59: FACTS 173(F-364); POSITIONS none

## F-60

Title: "The coercions between number types carry a sum's zero and a product's "; entry 697 chars.
Cited: tests/simpleSum: exists; reviews/flattening-questions-ways.md: exists; reviews/max-min-identities-judgement.md: exists; ZZ: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ZZ64.java ProjectFortress/src/com/sun/fortress/inte; QQ: found ProjectFortress/tests/QQPowerExponent.fss; EmptyReduction: no file
Detail: reviews/max-min-identities-judgement.md -> ## 1. The answer to his question; ## 2. What the library already does in this family
Commits (-S "The coercions between number types"): first 8b5c0fde9f 2026-09-26 Ledger rows 421-429, the max-min judgement's fact and its index line ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation's five chunks (3 hits)
History blocks (3): L213 2026-10-13 17:58Z 0c, L845 2026-10-13 18:16Z 1424c, L3437 2026-10-22 12:03Z 547c
Title-words "The coercions between number" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-60: FACTS none; POSITIONS 95(P-78)

## F-73

Title: "The compiled checker infers a generic's static arguments with coercion"; entry 1452 chars.
Cited: compiler_tests/NatLitArgChecker: exists; compile-ladder/rung-inference-checker/REPORT.md: exists; T: found ProjectFortress/src/com/sun/fortress/parser/templateparser/TemplateParser.rats ProjectFortress/src/com/sun/for; Object: found ProjectFortress/src/com/sun/fortress/parser_util/ObjectHeader.java ProjectFortress/src/com/sun/fortress/nodes…
Rows: row 506: NEGATIVE-VERIFIED; row 507: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-inference-checker/REPORT.md -> ### 3.2 The attempts, and what each one does
Commits (-S "The compiled checker infers a"): first cb3cbb683d 2026-09-26 The flattening questions' note: INDEX and FACTS, with the prelude's history corrected ; last 82c58c9c8e 2026-10-13 FACTS: chunk F2c consolidated, F-73 to F…
History blocks (7): L265 2026-10-13 17:58Z 0c, L1037 2026-10-13 18:39Z 2284c, L3047 2026-10-22 11:56Z 584c, L3939 2026-10-22 12:37Z 1312c, L6347 2026-11-08 23:47Z 1252c, L6425 2026-11-09 07:08Z 1286c, L6631 2026-11-09 11:00Z 1456c
Title-words "The compiled checker infers" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-73: FACTS 56(F-51), 60(F-55); POSITIONS none

## F-78

Title: "The compiled checker instantiates a type parameter that nothing at a c"; entry 1262 chars.
Cited: compiler_tests/InferResultOnly*: found ProjectFortress/compiler_tests/InferResultOnlyCoerced.fss ProjectFortress/compiler_tests/InferResultOnlyAny.test ProjectFortress/compiler_tests/InferResultOnlyAfterLocalDecl.test; compile-ladder/rung-instance-bound/REPORT.md: exists;…
Rows: row 507: NEGATIVE-VERIFIED; row 541: FIXED; row 559: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-instance-bound/REPORT.md -> ## 1. What changed; ## 7. What the specification settles, by row, and each defect's home | compile-ladder/rung-instance-b…
Detail extra: decision-record.md holds "**D4. The order: subtyping without the context, then subtyping with it, then coercion with it, then coercion without it.**" under "## 2. Decisions taken inside the rung"; Functionals.scala:962-966 e…
Commits (-S "The compiled checker instantiates a"): first f3032eed83 2026-10-02 The compiled checker binds a type parameter nothing at a call fixes to its bounds under  ; last d52210a0…
History blocks (7): L285 2026-10-13 17:58Z 0c, L1067 2026-10-13 18:39Z 2027c, L4137 2026-10-22 22:14Z 592c, L6221 2026-11-08 10:30Z 1262c, L6731 2026-11-09 11:00Z 1262c, L7141 2026-11-…
Title-words "The compiled checker instantiates" in FACTS lines: 173(F-364), 174(F-365); in POSITIONS lines: none
Cited by number F-78: FACTS 60(F-55); POSITIONS none

## F-85

Title: "In the interpreter's library, the rung's repairs of the generator, con"; entry 1353 chars.
Cited: Library/FortressLibrary.fss: exists; tests/GeneratorDeclarations.fss: exists; tests/NestedReductionFusion.fss: exists; compile-ladder/rung-generator-slips/REPORT.md: exists; compile-ladder/rung-body-arguments/REPORT.md: exists; Condition: found ProjectFortress/compiler_tes…
Rows: row 628: FIXED; row 629: FIXED; row 632: FIXED
Detail: compile-ladder/rung-generator-slips/REPORT.md -> ## 5. The repairs, each with its precedent and the way not taken; ## 8. The sites left, each with its row | compile-ladder/rung-body-argume…
Commits (-S "In the interpreter's library, the"): first a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories rebuilt, pointers by t ; last a88e52bf78…
History blocks (10): L313 2026-10-13 17:58Z 0c, L1109 2026-10-13 18:39Z 1599c, L2559 2026-10-17 18:17Z 578c, L3107 2026-10-22 11:56Z 771c, L4501 2026-10-24 03:41Z 1009c, L6227 2026-11-08 10:30Z 1353c, L6767 2…
Title-words "In the interpreter's library," in FACTS lines: 80(F-75), 84(F-79), 86(F-81), 87(F-82), 88(F-83), 89(F-84), 95(F-90), 229(F-133), 308(F-151)…
Cited by number F-85: FACTS 86(F-81), 116(F-250); POSITIONS none

## F-87

Title: "Besides the contexts that it already had, such as a typed declaration'"; entry 1228 chars.
Cited: Specification/basic/inference.tex: exists; compiler_tests/InferResultOnly*: found ProjectFortress/compiler_tests/InferResultOnlyCoerced.fss ProjectFortress/compiler_tests/InferResultOnlyAny.test ProjectFortress/compiler_tests/InferResultOnlyAfterLocalDecl.test; compile-ladder/rung-checker-contexts/REPORT.md: exists; InferResultOnlyLabelBody: found ProjectFortress/compiler_tests/InferResultOnlyLabelBody.fss ProjectFortress/compiler_tests/InferResultOnlyLabe
Detail: compile-ladder/rung-checker-contexts/REPORT.md -> ## 1. What changed, and why
Commits (-S "Besides the contexts that it"): first 0ae072be72 2026-10-22 FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259) ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation's five chunks (3 hits)
History blocks (8): L321 2026-10-13 17:58Z 0c, L1121 2026-10-13 18:39Z 3286c, L2025 2026-10-14 04:41Z 688c, L2031 2026-10-14 04:41Z 784c, L2101 2026-10-14 06:09Z 785c, L2171 2026-10-14 11:39Z 679c, L3119 2026-10-22 11:56Z 726c, L8011 2026-11-17 07:11Z 1269c
Title-words "Besides the contexts that" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-87: FACTS 1, 60(F-55), 61(F-56); POSITIONS 49(P-50)

## F-220

Title: "`__bigOperator`'s local function `body` declares its parameter's type,"; entry 493 chars.
Cited: Library/FortressLibrary.fss: exists; compile-ladder/rung-walk-elements/REPORT.md: exists
Detail: compile-ladder/rung-walk-elements/REPORT.md -> ## 6. Suites, the count, the distance and the ladder
Detail extra: rung-argument-context/SKEPTIC.md exists; "### Finding 5 (a correction): a chosen declaration changed, and no test showed it".
Commits (-S "`__bigOperator`'s local function `body` declares"): first 604d0e23cb 2026-10-14 IntMap's node map SYMDIFF a singleton keeps its other entries, Array2's offset takes Arr ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation's five chunks (3 hits)
History blocks (6): L2005 2026-10-14 04:38Z 0c, L2107 2026-10-14 06:09Z 1057c, L2221 2026-10-14 15:00Z 620c, L2295 2026-10-15 00:14Z 351c, L3131 2026-10-22 11:56Z 320c, L5233 2026-11-02 02:40Z 528c
Title-words "__bigOperator's local function body" in FACTS lines: 246(F-228); in POSITIONS lines: none
Cited by number F-220: FACTS none; POSITIONS none

## F-221

Title: "The compiled checker retries a call written as another call's argument"; entry 860 chars.
Cited: compiler_tests/InferCallArgument*: found ProjectFortress/compiler_tests/InferCallArgumentMultifix.test ProjectFortress/compiler_tests/InferCallArgumentOverloaded.test ProjectFortress/compiler_tests/InferCallArgumentWrittenStaticArgs.test; compile-ladder/rung-argument-context/REPORT.md: exists; SKEPTIC.md: MISSING; InferBigOperatorExpectedTy…
Rows: row 705: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-argument-context/REPORT.md -> ## 1. What changed, and why; ## 5. Old against new; ## 8. Points to report | SKEPTIC.md -> (no section named)
Detail headings (where-clauses): "## A.1 The thirteen errors, traced"; "### A.2.1 Row 433: remove the `MAX`/`MIN` fusion with `SUM`".
Commits (-S "The compiled checker retries a"): first 15a6d4365a 2026-10-14 FACTS: the record pass after climb batch 14, the twelve entries cut to the form and F-22 ; last 15a6d4365a 2026-10-14 FACTS: the record pass after climb b…
History blocks (5): L2009 2026-10-14 04:41Z 0c, L2113 2026-10-14 06:09Z 2068c, L2319 2026-10-15 00:47Z 827c, L7517 2026-11-16 04:41Z 827c, L7631 2026-11-16 06:44Z 859c
Title-words "The compiled checker retries" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-221: FACTS 64(F-59), 92(F-87); POSITIONS none

## F-242

Title: "`SUM`'s fusion pairs with `MAX` and `MIN` hold no site of the distance"; entry 1056 chars.
Cited: perf-probes/where-clauses/REPORT.md: exists; perf-probes/generic-distribute/REPORT.md: exists; SumReduction: no file; ActualReduction: no file; K: found ProjectFortress/src/com/sun/fortress/parser/Keyword.rats ProjectFortress/src/com/sun/fortress/parser/templatep; MaxSumReductionPair: no file; MinSumReductionPair: no file; Generator2: found…
Detail: perf-probes/where-clauses/REPORT.md -> (no section named) | perf-probes/generic-distribute/REPORT.md -> ## 3. The checker on the bound-free shape; ## 4. The distance stage, per variant
Detail headings (where-clauses): "## A.0 In short"; "## A.1 The thirteen errors, traced"; "## A.4 The distance with all three edits"; "## B.0 In short"; "## B.3 Conditional extension, by the accepted rule".
Commits (-S "`SUM`'s fusion pairs with `MAX`"): first 7a58250bfe 2026-10-16 FACTS and POSITIONS after climb batch 16's landing and the probes of 2026-10-16 ; last 7a58250bfe 2026-10-16 FACTS and POSITIONS after climb batch 16's l…
History blocks (3): L2459 2026-10-16 19:13Z 0c, L2619 2026-10-17 19:33Z 595c, L3179 2026-10-22 11:56Z 620c
Title-words "SUM's fusion pairs with" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-242: FACTS 113(F-243), 116(F-250); POSITIONS 65(P-151)

## F-243

Title: "The 13 errors that were filed as waiting on `where` clauses, 13 of the"; entry 1159 chars.
Cited: perf-probes/where-clauses/REPORT.md: exists; reviews/batch-17-review.md: exists; List: found ProjectFortress/src/com/sun/fortress/scala_src/useful/Lists.scala ProjectFortress/src/com/sun/fortress/useful/
Rows: row 436: NEGATIVE-VERIFIED; row 634: FIXED
Detail: perf-probes/where-clauses/REPORT.md -> (no section named) | reviews/batch-17-review.md -> ## 2. The distance and the count
Commits (-S "The 13 errors that were"): first 0ae072be72 2026-10-22 FACTS: clarity chunks f5 to f8 applied as judged (F-246 merged into F-259) ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation's five chunks (3 hits)
History blocks (4): L2463 2026-10-16 19:13Z 0c, L2625 2026-10-17 19:33Z 561c, L2685 2026-10-18 04:56Z 773c, L3185 2026-10-22 11:56Z 797c
Title-words "The 13 errors that" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-243: FACTS none; POSITIONS none

## F-285

Title: "The interpreter's library writes the static argument of every clause f"; entry 1683 chars.
Cited: Library/FortressLibrary.fss: exists; Library/List.fss: exists; Library/PureList.fss: exists; explorations/coordinator/tools/distance/run.sh: exists; tests/WrittenReductionArgumentsWalk: exists; tests/NestedReductionFusion: exists; tests/PureListStridedSubscriptWalk: exists; compile-ladder/rung-body-arguments/REPORT.md: exists; String: found…
Rows: row 824: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-body-arguments/REPORT.md -> ## 3. Where the fix belongs, and the precedent search; ## 5. Walk, old against new; ## 7. The same defect in PureList; ## 9. The distance, site by site
Commits (-S "The interpreter's library writes the"): first bd00ad997d 2026-10-24 Row 731's three library sites write their static argument, and __bigOperator2's fused ar ; last bd00ad997d 2026-10-24 Row 731's three library sites …
History blocks (10): L4519 2026-10-24 03:41Z 0c, L4823 2026-10-30 01:32Z 1622c, L6269 2026-11-08 10:30Z 1622c, L6475 2026-11-09 07:14Z 1622c, L6683 2026-11-09 11:00Z 1619c, L7171 2026-11-10 02:26Z 1664c, L7523 2026-11-16 04:41Z 1664c, L7679 2026-11-16 06:44Z …
Title-words "The interpreter's library writes" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-285: FACTS 64(F-59), 173(F-364); POSITIONS none

## F-344

Title: "Under walk, a value of the four string objects is read at its trait wh"; entry 850 chars.
Cited: interpreter/evaluator/types/LanguageTypes.java: exists; tests/LanguageTypeInstancesWalk: exists; compile-ladder/rung-walk-language-types/REPORT.md: exists; FlatString: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FlatString.java ProjectFortress/tests/FlatStringSpl; CatString: no file; EmptyString: no file; SubString: no …
Detail: compile-ladder/rung-walk-language-types/REPORT.md -> "What changed and why": heading "## What changed and why"
Commits (-S "Under walk, a value of"): first 12292add28 2026-11-09 Read a number or string value at its trait in walk's inference and messages ; last 12292add28 2026-11-09 Read a number or string value at its trait in walk's infe…
History blocks (2): L6493 2026-11-09 07:14Z 0c, L8129 2026-11-17 09:18Z 1091c
Title-words "Under walk, a value" in FACTS lines: 54(F-49); in POSITIONS lines: none
Cited by number F-344: FACTS 79(F-74), 160(F-328), 220(F-123), 227(F-131); POSITIONS none

## F-364

Title: "The compiled checker instantiates a reduction that writes no static ar"; entry 2102 chars.
Cited: scala_src/typechecker/impls/Functionals.scala: exists; explorations/run-c4/src/MicroGptFlat.fss: exists; compiler_tests/InferBigOperatorSelfBound: exists; compiler_tests/InferBigOperatorExpectedType: exists; compile-ladder/rung-static-argument-inferred/REPORT.md: exists; InferBigOperatorUnwritten: found ProjectFortress/compiler_tests/InferB…
Rows: row 731: FIXED; row 1007: NEGATIVE-VERIFIED; row 1008: NEGATIVE-VERIFIED; row 1015: NEGATIVE-BOUNDED
Detail: compile-ladder/rung-static-argument-inferred/REPORT.md -> "Step 1, row 731: the reduction": heading "### Step 1, row 731: the reduction"; "5. Old against new": heading "## 5. Old against new"; "7. The stages and the checker's time": heading "## 7. The stages and the checker's time"
Commits (-S "The compiled checker instantiates a"): first f3032eed83 2026-10-02 The compiled checker binds a type parameter nothing at a call fixes to its bounds under  ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to…
History blocks (3): L7469 2026-11-16 04:29Z 0c, L7781 2026-11-16 06:44Z 1908c, L7829 2026-11-16 07:45Z 2033c
Title-words "The compiled checker instantiates" in FACTS lines: 83(F-78), 174(F-365); in POSITIONS lines: none
Cited by number F-364: FACTS 63(F-58), 64(F-59), 101(F-221), 130(F-285); POSITIONS 95(P-78)

## F-365

Title: "The compiled checker instantiates a reference to a generic function by"; entry 2423 chars.
Cited: scala_src/typechecker/impls/Functionals.scala: exists; scala_src/types/TypeAnalyzer.scala: exists; scala_src/typechecker/CoercionOracle.scala: exists; TypeAnalyzer.scala: found ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala; compiler_tests/GenericFunctionAsValueCompiled: exists; compile-ladder/rung-static-argument-i…
Rows: row 758: FIXED; row 1009: NEGATIVE-VERIFIED; row 1010: NEGATIVE-VERIFIED; row 1012: NEGATIVE-VERIFIED; row 1013: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-static-argument-inferred/REPORT.md -> "Step 2, row 758: the reference to a generic function": heading "### Step 2, row 758: the reference to a generic function"; "5. Old against new": heading "## 5. Old against new"
Commits (-S "The compiled checker instantiates a"): first f3032eed83 2026-10-02 The compiled checker binds a type parameter nothing at a call fixes to its bounds under  ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to…
History blocks (2): L7473 2026-11-16 04:29Z 0c, L7787 2026-11-16 06:44Z 2265c
Title-words "The compiled checker instantiates" in FACTS lines: 83(F-78), 173(F-364); in POSITIONS lines: none
Cited by number F-365: FACTS none; POSITIONS none

## F-114

Title: "`ant testSpecData` runs 130 of the specification's 133 extracted examp"; entry 535 chars.
Cited: SpecData/examples/basic: exists; library/: found ProjectFortress ProjectFortress/not_working_library_tests ProjectFortress/not_working_library_tests/EqualityBug2.fss; SpecDataJUTest: found ProjectFortress/src/com/sun/fortress/tests/unit_tests/SpecDataJUTest.java
Rows: row 424: FIXED
Detail: none cited
Commits (-S "`ant testSpecData` runs 130 of"): first 93725eea36 2026-10-04 FACTS: testSpecData measured, 5 of 130 red, one cause (an unwritten static argument on a ; last d52210a046 2026-11-24 FACTS and POSITIONS restored to their state before the consolidation's five chunks (5 hits)
History blocks (2): L421 2026-10-13 17:58Z 0c, L1789 2026-10-13 19:03Z 1176c
Title-words "ant testSpecData runs 130" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-114: FACTS 333(F-170); POSITIONS 133(P-124)

## F-137

Title: "Under `walk`, a generic call's static arguments are inferred with coer"; entry 1449 chars.
Cited: tests/InferCoercionRungK.fss: exists; compile-ladder/rung-inference-walk/REPORT.md: exists; ZZ32: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ZZ32.java ProjectFortress/tests/ZZ32RemainderByZero; ZZ64: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ZZ64.java ProjectFortress/tests/ZZ64RemainderByZero; RR64: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/RR64.java ProjectFortress/library_tests/RR64Functio
Rows: row 509: NEGATIVE-VERIFIED; row 510: NEGATIVE-VERIFIED; row 511: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-inference-walk/REPORT.md -> ## 2. What changed; ## 9. Every measured defect's home
Commits (-S "Under `walk`, a generic call's"): first a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories rebuilt, pointers by t ; last a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories rebuilt, pointers by t (1 hits)
History blocks (6): L505 2026-10-13 17:58Z 0c, L1291 2026-10-13 18:55Z 2132c, L3657 2026-10-22 12:06Z 773c, L4095 2026-10-22 12:37Z 1681c, L4143 2026-10-22 22:14Z 1596c, L6523 2026-11-09 08:18Z 1613c
Title-words "Under walk, a generic" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-137: FACTS 56(F-51), 60(F-55), 237(F-141); POSITIONS none

## F-141

Title: "Under `walk`, a type parameter that nothing at a call fixes takes its "; entry 2282 chars.
Cited: tests/Infer*Walk.fss: found ProjectFortress/tests/InferredIntegerBindingWalk.fss ProjectFortress/tests/InferUnfixedFBoundedWalk.fss ProjectFortress/tests/InferLoneBoundWalk.fss; compile-ladder/rung-walk-instance/REPORT.md: exists; decision-record.md: MISSING; compile-ladde…
Rows: row 587: NEGATIVE-VERIFIED; row 589: NEGATIVE-VERIFIED; row 591: NEGATIVE-VERIFIED; row 592: NEGATIVE-VERIFIED; row 612: NEGATIVE-VERIFIED; row 616: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-walk-instance/REPORT.md -> ## 2. The rule as built under walk | decision-record.md -> ## 2. The decisions taken inside the rung | compile-ladder/rung-walk-elements/REPORT.md -> ## 1. What changed and why | co…
Commits (-S "Under `walk`, a type parameter"): first 669b77d03d 2026-10-03 Walk instantiates a type parameter that nothing at a call fixes at its declared bound, t ; last e06bd068e7 20…
History blocks (5): L521 2026-10-13 17:58Z 0c, L1315 2026-10-13 18:55Z 2450c, L2209 2026-10-14 15:00Z 976c, L3663 2026-10-22 12:06Z 11…
Title-words "Under walk, a type" in FACTS lines: 60(F-55), 239(F-143), 316(F-229); in POSITIONS lines: none
Cited by number F-141: FACTS 233(F-137); POSITIONS none

## F-143

Title: "Under walk, a type parameter whose bound mentions itself and that noth"; entry 1851 chars.
Cited: Library/List.fss: exists; tests/InferUnfixedFBoundedWalk.fss: exists; OpenTupleDispatchWalk.fss: found ProjectFortress/tests/OpenTupleDispatchWalk.fss; OpenParameterListComprehensionWalk.fss: found ProjectFortress/tests/OpenParameterListComprehensionWalk.fss; compile-ladder/rung-walk-open-param/REPORT.md: exists; SKEPTIC.md: MISSING; compil…
Rows: row 663: CONTESTED; row 716: NEGATIVE-VERIFIED; row 825: CONTESTED
Detail: compile-ladder/rung-walk-open-param/REPORT.md -> ## 1. What changed and why; ## 11. Defects, each with its home | SKEPTIC.md -> ## 3. Findings and corrections | compile-ladder/rung-body-arguments/SKEPTIC.md -> ## 3. Finding, and what I did with it
Commits (-S "Under walk, a type parameter"): first e06bd068e7 2026-10-22 FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comm ; last e06bd068e7 2026-10-22 FACTS: clarity chunks f13 to f16 appli…
History blocks (5): L529 2026-10-13 17:58Z 0c, L1327 2026-10-13 18:55Z 2470c, L2215 2026-10-14 15:00Z 778c, L3675 2026-10-22 12:13Z 825c, L4507 2026-10-24 03:41Z 1402c
Title-words "Under walk, a type" in FACTS lines: 60(F-55), 237(F-141), 316(F-229); in POSITIONS lines: none
Cited by number F-143: FACTS 64(F-59), 204(F-114), 237(F-141), 246(F-228); POSITIONS none

## F-144

Title: "The identity-less reductions are typed at their element type: `Associa"; entry 1412 chars.
Cited: tests/UnwrittenBigMinMaxWalk: exists; compile-ladder/rung-reduction-types/REPORT.md: exists; compile-ladder/rung-walk-elements/REPORT.md: exists; R: found ProjectFortress/src/com/sun/fortress/syntax_abstractions/phases/RewriteTransformerNames.java ProjectFortress/s; AssociativeReduction: no file; Maybe: found ProjectFortress/not_working_lib…
Rows: row 665: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-reduction-types/REPORT.md -> ## 1. What changed and why; ## 8. Defects and their homes | compile-ladder/rung-walk-elements/REPORT.md -> ## 7. Old against new
Commits (-S "The identity-less reductions are typed"): first aadd02f236 2026-10-09 The identity-less reductions are typed at their element type: simpleJoin at R, every lif ; last a30a481315 2026-10-13 FACTS: chunk F3 consolidated…
History blocks (3): L533 2026-10-13 17:58Z 0c, L1333 2026-10-13 18:55Z 1864c, L3681 2026-10-22 12:13Z 733c
Title-words "The identity-less reductions are" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-144: FACTS 90(F-85); POSITIONS none

## F-228

Title: "Under walk, a reduction or a comprehension that writes no static argum"; entry 2330 chars.
Cited: tests/UnwrittenListMapComprehensionWalk: exists; compile-ladder/rung-walk-elements/REPORT.md: exists; compile-ladder/rung-walk-overload-if/REPORT.md: exists; ZZ32: found ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ZZ32.java ProjectFortress/tests/ZZ32RemainderByZero; RR64: found ProjectFortress/src/com/sun/fortress/interpreter…
Rows: row 510: NEGATIVE-VERIFIED; row 716: NEGATIVE-VERIFIED; row 717: NEGATIVE-VERIFIED; row 718: FIXED
Detail: compile-ladder/rung-walk-elements/REPORT.md -> ## 1. What changed and why; ## 5. The design | compile-ladder/rung-walk-overload-if/REPORT.md -> ## 1. What changed and why; "Row 718": heading "### Row 718: a user big operator's declared result"
Commits (-S "Under walk, a reduction or"): first 20474c1449 2026-10-14 Walk instantiates the big operator of a reduction or comprehension that writes no static ; last 20474c1449 2026-10-14 Walk instantiates the big operator of a …
History blocks (6): L2205 2026-10-14 15:00Z 0c, L2253 2026-10-14 15:25Z 1306c, L2385 2026-10-16 17:36Z 1306c, L3697 2026-10-22 12:13Z 1551c, L6469 2026-11-09 07:14Z 2308c, L6547 2026-11-09 08:18Z 2335c
Title-words "Under walk, a reduction" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-228: FACTS 64(F-59), 100(F-220), 237(F-141), 239(F-143), 240(F-144); POSITIONS none

## F-248

Title: "Under walk, the team's generic `distribute` over `K`, with the `Any` m"; entry 745 chars.
Cited: perf-probes/generic-distribute/REPORT.md: exists; K: found ProjectFortress/src/com/sun/fortress/parser/Keyword.rats ProjectFortress/src/com/sun/fortress/parser/templatep; GeneratorDeclarations: found ProjectFortress/tests/GeneratorDeclarations.fss; NestedReductionFusion: found ProjectFortress/tests/NestedReductionFusion.fss
Rows: row 21: FIXED; row 744: NEGATIVE-VERIFIED
Detail: perf-probes/generic-distribute/REPORT.md -> ## 5. Walk
Commits (-S "Under walk, the team's generic"): first 7a58250bfe 2026-10-16 FACTS and POSITIONS after climb batch 16's landing and the probes of 2026-10-16 ; last 7a58250bfe 2026-10-16 FACTS and POSITIONS after climb batch 16's landing and the probes of 2026-10-16 (1 hits)
History blocks (2): L2483 2026-10-16 19:13Z 0c, L2531 2026-10-17 17:43Z 595c
Title-words "Under walk, the team's" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-248: FACTS 252(F-253); POSITIONS none

## F-367

Title: "Under walk a generic function is a value, received at the arrow type o"; entry 1957 chars.
Cited: interpreter/evaluator/types/FTypeGenericArrow.java: exists; interpreter/evaluator/values/Fcn.java: exists; interpreter/evaluator/EvaluatorBase.java: exists; interpreter/evaluator/values/OverloadedFunction.java: exists; tests/GenericFunctionAsValueWalk.fss: exists; GenericFunctionRowLiftWalk.fss: found ProjectFortress/tests/GenericFunctionRo…
Rows: row 1018: NEGATIVE-VERIFIED; row 1019: NEGATIVE-VERIFIED; row 1020: NEGATIVE-VERIFIED; row 1021: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-generic-function-value/REPORT.md -> "The rule as built": heading "## The rule as built"; "Runs to report, not tests": heading "## Runs to report, not tests"
Commits (-S "Under walk a generic function"): first 754a0f29d8 2026-11-16 Under walk a generic function passed as a value is instantiated at the arrow type that r ; last 754a0f29d8 2026-11-16 Under walk a generic function passed …
History blocks (3): L7499 2026-11-16 04:35Z 0c, L7799 2026-11-16 06:44Z 1868c, L8077 2026-11-17 07:11Z 1957c
Title-words "Under walk a generic" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-367: FACTS none; POSITIONS none

## F-173

Title: "The specification's type-inference chapter states the rule that the co"; entry 1718 chars.
Cited: compiler_tests/XXXInferPromoteNN32: exists; Specification/basic/inference.tex: exists; compiler_tests/InferLone*: found ProjectFortress/compiler_tests/InferLoneUnbounded.fss ProjectFortress/compiler_tests/InferLoneUnionClosedTrait.fss ProjectFortress/compiler_tests/InferLoneUnbounded.test; tests/InferLone*Walk.fss: found ProjectFortress/tes…
Rows: row 442: NEGATIVE-VERIFIED; row 587: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-instance-bound/REPORT.md -> (no section named)
Detail extra: Specification/basic/inference.tex exists (lines 45-125 cited); rung-instance-bound/REPORT.md cited with "the bound rule", no section named.
Commits (-S "The specification's type-inference chapter states"): first a88e52bf78 2026-10-13 The record numbered: F-7 to F-219 and P-7 to P-145, the histories rebuilt, pointers by t ; last a88e52bf78 2026-10-13 The record number…
History blocks (9): L633 2026-10-13 17:58Z 0c, L1483 2026-10-13 18:57Z 2226c, L3795 2026-10-22 12:13Z 707c, L4771 2026-10-30 01:25Z 1852c, L4853 2026-10-30 01:32Z 1718c, L6719 2026-11-09 11:00Z 1718c, L6945 2026-11-09 23:32Z 1718c, L7619 2026-11-16 06:44Z 171…
Title-words "The specification's type-inference chapter" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-173: FACTS 332(F-169), 343(F-273); POSITIONS none

## F-271

Title: "The type group's POPL 2019 paper gives P-48's instance rule, and its s"; entry 734 chars.
Cited: reviews/decisions-review/popl-recheck.md: exists; research/extracts/ParkPOPL2019-extract.md: exists
Detail: research/extracts/ParkPOPL2019-extract.md -> ## 6. What it proves and what it leaves open; ## 8. Bearing on the decisions on record
Commits (-S "The type group's POPL 2019"): first e06bd068e7 2026-10-22 FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comm ; last e06bd068e7 2026-10-22 FACTS: clarity chunks f13 to f16 applied as judged (nine entries held; f14's header comm (1 hits)
History blocks (1): L3751 2026-10-22 12:13Z 0c
Title-words "The type group's POPL" in FACTS lines: 329(F-166), 344(F-300); in POSITIONS lines: none
Cited by number F-271: FACTS 329(F-166); POSITIONS none

## F-273

Title: "The specification gives the run-time instance of a generic declaration"; entry 1324 chars.
Cited: compiler_tests/XXXGenericInstanceUnfixed: exists; Specification/basic/overloading.tex: exists; compile-ladder/rung-spec-overloading/decision-record.md: exists; X: found ProjectFortress/one_library_tests/XXXOneLibraryVarargsGenericOverloaded.fss ProjectFortress/one_library_tests/
Rows: row 496: NEGATIVE-VERIFIED; row 538: NEGATIVE-VERIFIED
Detail: compile-ladder/rung-spec-overloading/decision-record.md -> ## 5. The dispatch sentence (item 30 and the paper's instance rule); ## 6. The inference chapter (batch N's review, finding 1; the paper's instance r
Detail extra: Specification/basic/overloading.tex exists (312-349); rung-spec-overloading/decision-record.md sections 5 and 6 as above.
Commits (-S "The specification gives the run-time"): first 576b4c287c 2026-09-30 The specification's overloading chapters state the 2011 model the checker runs: overload ; last d4ddb06c4e 2026-10-02 FACTS: the rung entries shortened to the fact, its source and its test (Pavol's option 2 (3 hits)
History blocks (1): L3813 2026-10-22 12:13Z 0c
Title-words "The specification gives the" in FACTS lines: none; in POSITIONS lines: none
Cited by number F-273: FACTS none; POSITIONS none

## F-300

Title: "The type group's POPL 2019 paper, its technical report and the report'"; entry 865 chars.
Cited: Papers/Variance/: exists; paper.tex: named inside Papers/Variance/ (not checked as a path); research/extracts/: exists; Papers/Variance/README.md: exists
Detail: Papers/Variance/README.md -> "Permission and licence": heading "## Permission and licence"
Commits (-S "The type group's POPL 2019"): first c040df4881 2026-10-30 P-26: the POPL 2019 paper with its technical report, the team's last word and work, kept ; last c040df4881 2026-10-30 P-26: the POPL 2019 paper with its technical report, the team's last word and work, kept (1 hits)
History blocks (1): L4983 2026-10-30 09:39Z 0c
Title-words "The type group's POPL" in FACTS lines: 329(F-166), 341(F-271); in POSITIONS lines: none
Cited by number F-300: FACTS none; POSITIONS none

## The sorting map's lines for these entries

Data from the sorting map, /home/user/fortress-pilot/explorations/coordinator/postmortem-2026-11-24-record-regrowth/evidence/sorting-map/map.json (MAP.md beside it, sections 3 to 5), and the claims files beside it. For each entry: the map's line, which gives its disposition; the subjects of its claims, each with the entry that owns it; where each part goes; its claims as the claims file numbers them. Each other entry is marked as in this chunk or not.

### F-28
- The map's line: F-28 · rewritten in place: "walk: static-argument inference" (owner F-141) · out: history 2 · defects: no row named (3).
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: W-infer "walk: static-argument inference", owner F-141 (claims 1, 2, 3, 4).
- Claims to move out of the entry, by kind: history 2; tests 4.
- Defect: claim 3, ledger row .
- Its claims, from claims-exec.md, word for word:

~~~
### F-28, "Walk instantiates a generic declaration declared to return `Any`."

1. Claims
   - C1. Walk instantiates a generic declaration declared to return `Any`. Subject: walk: generic instantiation. Kind: property.
   - C2. `MakeInferenceSpecific` treats `Any` as a trait type (row 157, fixed). Kind: history.
   - C3. Its visitor has no case for 11 of 18 concrete type classes, of which only the dimension forms can be a return type. Subject: walk: generic instantiation. Kind: defect (no row).
   - C4. Gated by `GenericReturningAny.fss`. Kind: tests.
2. Overlaps: C1-C3: none found (searched "MakeInferenceSpecific", "row 157", "returning `Any`").
3. Checks: sound (scout: test found; row 157 FIXED).
4. Shape: one subject. Title matches; C3 is a residual defect without a row.
~~~

### F-51
- The map's line: F-51 · merged into F-73: one case of F-73's inference with coercion · parts: "the library: the array element bound and algebra" (2) to F-151.
- Shape: one subject. Disposition: merged. Merged into F-73 (in this chunk): one case of F-73's inference with coercion.
- Subjects of its claims: C-infer "the checker: static-argument inference", owner F-73 (claims 1, 3, 4); L-bound "the library: the array element bound and algebra", owner F-151 (claims 2).
- A part goes to another entry: claim 2, subject "the library: the array element bound and algebra", owner F-151, to F-151 (not in this chunk, chunk arrays).
- Claims to move out of the entry, by kind: tests 4.
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-55 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-173 (in this chunk), F-271 (in this chunk), F-273 (in this chunk).
- Its claims, from claims-checker-1.md, word for word:

~~~
## F-51 "A generic call converts a narrower argument"

Claims:
1. A generic call converts a narrower argument for a parameter typed by a type variable that another argument fixes, on both paths (row 388, fixed). *the checker: static-argument inference* (and walk) | property
2. So under walk the library's array-scalar and matrix-scalar operators take a `ZZ32` scalar with `RR64` elements. *the library: array-scalar operators* | property
3. F-73 and F-137 give each path's rule. *the checker: static-argument inference* | pointer
4. `InferCoercionRungK`, `InferCoercionShapes`. *the checker: static-argument inference* | tests

Overlap:
- 1: F-55 (inference with coercion on both paths), F-73, F-137. Searched "InferCoercionRungK", "InferCoercionShapes", "row 388".
- 2: none found. Searched "array-scalar".

Checks: tests found (`InferCoercionRungK` is a `.fss` with no `.test`); row 388 FIXED, agrees (S1). No SC finding.

Shape: one subject (the checker: static-argument inference, with walk's twin). Title: narrower argument converted; the body serves it.
~~~

### F-55
- The map's line: F-55 · merged into F-73: it repeats F-73 and F-137 · defects: row 510 (4).
- Shape: one subject. Disposition: merged. Merged into F-73 (in this chunk): it repeats F-73 and F-137.
- Subjects of its claims: C-infer "the checker: static-argument inference", owner F-73 (claims 1, 2, 3, 5); W-infer "walk: static-argument inference", owner F-141 (claims 4).
- Defect: claim 4, ledger row 510.
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-173 (in this chunk), F-271 (in this chunk), F-273 (in this chunk).
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-114 (in this chunk), F-131 (not in this chunk, chunk integers), F-137 (in this chunk), F-141 (in this chunk), F-143 (in this chunk), F-144 (in this chunk), F-170 (not in this chunk, chunk arrays), F-221 (in this chunk), F-228 (in this chunk), F-344 (in this chunk).
- Its claims, from claims-checker-1.md, word for word:

~~~
## F-55 "Static arguments are inferred with coercion on both paths"

Claims:
1. Static arguments are inferred with coercion on both paths: the checker from static types and the expected type, walk from run-time types. *the checker: static-argument inference* (and walk) | property
2. A mixed-width call takes the narrowest type into which its arguments convert (P-74). *the checker: static-argument inference* | property
3. F-73, F-137 and F-87 give the rules and contexts. *the checker: static-argument inference* | pointer
4. Under walk a typed binding does not fix a call's static arguments, so `a: BoxK[\ZZ64\] = wrapK(3)` is refused (row 510). *walk: static-argument inference* | defect (row 510)
5. A parameter with no written bound is bounded by `Any` on both paths, so an unfixed one takes `Any`. *the checker: static-argument inference* | pointer (F-78)

Overlap:
- 1, 2: F-73, F-137, F-51, F-173. Searched "narrowest", "P-74".
- 4: F-137 (row 510). Searched "row 510".
- 5: F-296 (`fortress compile` bounds an unbounded parameter by `Any`), F-78. Searched "bounded by `Any`".

Checks: tests found; row 510 NEGATIVE-VERIFIED, agrees (S1). No SC finding.

Shape: one subject (the checker: static-argument inference, with walk's twin), much of it pointers. Title: inference with coercion on both paths; the body serves it, and repeats F-73 and F-137.
~~~

### F-56
- The map's line: F-56 · merged into F-87: one context of F-87's list · out: detail 2.
- Shape: one subject. Disposition: merged. Merged into F-87 (in this chunk): one context of F-87's list.
- Subjects of its claims: C-expected "the checker: the expected type", owner F-87 (claims 1, 2, 3).
- Claims to move out of the entry, by kind: detail 2; tests 3.
- Group of overlap O31, "The expected type": the contexts that give a call its expected type; with F-87 (in this chunk), F-221 (in this chunk), F-364 (in this chunk).
- Its claims, from claims-checker-1.md, word for word:

~~~
## F-56 "The compiled checker keeps the expected type ... at a call written `f(x)`"

Claims:
1. The checker keeps the expected type for inference at a call written `f(x)`, which the parser builds as a tight juxtaposition, and at a method call and an operator. *the checker: expected type* | property
2. Only desugarings reach the `fnApp = true` path of `Operators.scala:88-90`, so an edit of that path alone changes nothing for `f(x)`. *the checker: expected type* | detail
3. `InferCoercionShapes`. *the checker: expected type* | tests

Overlap:
- 1: F-87 (lists the other contexts). Searched "tight juxtaposition", "expected type".

Checks: `Operators.scala:88-90` agrees; test found (S1). No SC finding.

Shape: one subject (the checker: expected type). Title: expected type kept at `f(x)`; the body serves it.
~~~

### F-59
- The map's line: F-59 · rewritten in place: "the library: reductions, their identities and static arguments" (owner) · check: cites a thing that is gone.
- Shape: several subjects. Disposition: rewritten.
- Subjects of its claims: L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 1, 5, 6); C-expected "the checker: the expected type", owner F-87 (claims 2, 3, 7); W-reduce "walk: reduction instantiation", owner F-228 (claims 4).
- Claims to move out of the entry, by kind: tests 7.
- Today's checks: cites a thing that is gone or moved.
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-60 (in this chunk), F-81 (not in this chunk, chunk arrays), F-85 (in this chunk), F-144 (in this chunk), F-159 (not in this chunk, chunk arrays), F-220 (in this chunk), F-221 (in this chunk), F-228 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-285 (in this chunk), F-364 (in this chunk).
- Group of overlap O86, "The sum sign at the model's lines": microGPT's sum lines; with F-58 (not in this chunk, chunk runtime), F-362 (not in this chunk, chunk classes).
- Group of overlap O95, "Witness typecase and the factories": a factory's typecase on a witness and the Number case; with F-57 (not in this chunk, chunk numerals), F-159 (not in this chunk, chunk arrays), F-229 (not in this chunk, chunk arrays).
- Its claims, from claims-checker-1.md, word for word:

~~~
## F-59 "`SUM` and `PROD` take their identity from the static argument"

Claims:
1. `SUM` and `PROD` take their identity from the static argument, by a witness `typecase` (P-78). *the library: reductions' identities* | property
2. The checker writes an unwritten static argument of a self-bounded big operator as the reduction's expected type, else its body's type. *the checker: reductions' static arguments* | pointer (F-364)
3. A plain-bounded big operator takes its bound, or the expected type where the bound does not fit. *the checker: reductions' static arguments* | pointer (F-221)
4. Walk instantiates the big operator at its value's declared type, else its elements' join, else leaves it open. *walk: reductions' static arguments* | pointer (F-228, F-143)
5. C4's one clause-form sum writes no static argument and both paths sum at `ZZ32`; the team's tests and the library write it. *the model program: reductions* | property (pointer F-285)
6. `SUM e` over a collection and `x DOT y` need none. *the library: reductions' identities* | property
7. `WitnessIdentityRungG`, `InferBigOperatorUnwritten`, `InferBigOperatorSelfBound`. *the checker: reductions' static arguments* | tests

Overlap:
- 1: F-57, F-159, F-229 (witness `typecase`), F-60. Searched "witness", "identity".
- 5, 6: F-364 ("the model's one clause-form sum does not (F-59)"), F-285. Searched "BIG MAX", "P-78", "SUM".

Checks: tests found (S1). "Table 2" is a bold line, not a heading: cites a thing that is gone (SC, F-59). `sources.md` cites F-59 for the reductions rule, should cite F-364, P-78 and F-285 (SC, skill sentences).

Shape: several subjects (the library: reductions' identities; the checker and walk: reductions' static arguments; the model program). Title: identity from the static argument and the checker's inference of it; claims 2 to 4 restate F-364, F-221, F-228.
~~~

### F-60
- The map's line: F-60 · stays as it is: "the library: reductions, their identities and static arguments" (owner F-59).
- Shape: one subject. Disposition: stays.
- Subjects of its claims: L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 1, 2, 3, 4, 5).
- Claims to move out of the entry, by kind: tests 4.
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-59 (in this chunk), F-81 (not in this chunk, chunk arrays), F-85 (in this chunk), F-144 (in this chunk), F-159 (not in this chunk, chunk arrays), F-220 (in this chunk), F-221 (in this chunk), F-228 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-285 (in this chunk), F-364 (in this chunk).
- Its claims, from claims-checker-1.md, word for word:

~~~
## F-60 "The coercions between number types carry a sum's zero and a product's one"

Claims:
1. Coercions between number types carry a sum's zero and a product's one into every wider type, on both paths. *the library: reductions' identities* | property
2. They do not carry a maximum's identity, the type's least element; `ZZ` and `QQ` have none. *the library: reductions' identities* | property
3. The generic `BIG MAX` and `BIG MIN` have no identity, so an empty one raises `EmptyReduction`. *the library: reductions' identities* | property
4. `tests/simpleSum` asserts it for `BIG MIN`; `BIG MAX` raised under walk when measured. *the library: reductions' identities* | tests (and detail)
5. A reduction makes its identity at its own type (P-78). *the library: reductions' identities* | pointer

Overlap:
- 3: F-144 (the identity-less reductions are typed at their element type). Searched "EmptyReduction", "BIG MAX", "identity".

Checks: `simpleSum.fss` found, not run (S1). No SC finding.

Shape: one subject (the library: reductions' identities). Title: coercions carry zero and one but not a max's identity; the body serves it.
~~~

### F-73
- The map's line: F-73 · split: keeps "the checker: static-argument inference" (owner) · parts: "the checker: choice among a call's declarations" (3) to F-408; "the checker: numeral defaults and types" (5) to F-342 · out: detail 2 · defects: row 507 (6); row 506 (7).
- Shape: one subject. Disposition: split.
- Subjects of its claims: C-infer "the checker: static-argument inference", owner F-73 (claims 1, 2, 6, 7, 8); C-choice "the checker: choice among a call's declarations", owner F-408 (claims 3); C-num "the checker: numeral defaults and types", owner F-342 (claims 4, 5).
- A part goes to another entry: claim 3, subject "the checker: choice among a call's declarations", owner F-408, to F-408 (not in this chunk, chunk export).
- A part goes to another entry: claim 5, subject "the checker: numeral defaults and types", owner F-342, to F-342 (not in this chunk, chunk numerals).
- Claims to move out of the entry, by kind: detail 2; tests 8.
- Defect: claim 6, ledger row 507.
- Defect: claim 7, ledger row 506.
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-55 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-173 (in this chunk), F-271 (in this chunk), F-273 (in this chunk).
- Group of overlap O32, "A numeral's default": the default where nothing fixes a type, by value under walk, through its coercion compiled; with F-57 (not in this chunk, chunk numerals), F-74 (not in this chunk, chunk numerals), F-79 (not in this chunk, chunk numerals), F-118 (not in this chunk, chunk numerals), F-123 (not in this chunk, chunk numerals), F-131 (not in this chunk, chunk integers), F-140 (not in this chunk, chunk sizes), F-262 (not in this chunk, chunk numerals), F-263 (not in this chunk, chunk integers), F-304 (not in this chunk, chunk numerals), F-326 (not in this chunk, chunk integers), F-339 (not in this chunk, chunk numerals), F-340 (not in this chunk, chunk numerals), F-341 (not in this chunk, chunk numerals), F-342 (not in this chunk, chunk numerals), F-345 (not in this chunk, chunk numerals), F-347 (not in this chunk, chunk numerals), F-366 (not in this chunk, chunk numerals), F-402 (not in this chunk, chunk numerals), F-407 (not in this chunk, chunk numerals).
- Sent here by the map: claim 3 of F-84 (not in this chunk, chunk arrays), subject "the checker: static-argument inference", owner F-73.
- Its claims, from claims-checker-2.md, word for word:

~~~
## F-73 "The compiled checker infers a generic's static arguments with coercion"

Claims:
1. A type parameter that is the whole type of each parameter it occurs in takes the narrowest type that all its arguments convert into and its bound permits (P-74, P-49). *the checker: static-argument inference* | property
2. It looks among the arguments' types, their coercion targets and its bound, the bound only when a trait other than `Object` or `Any`. *the checker: static-argument inference* | detail
3. A coerced declaration ranks below one that needs no coercion; a tie among coerced ones is refused, "Ambiguous coercion", outside three cases. *the checker: overload choice with coercion* | property
4. A parameter fixed by numerals alone takes the narrowest default holding them. *the checker: numerals* | pointer (F-342)
5. Where tied declarations differ only at numeral positions, the checker reads the numeral as `ZZ32`, `ZZ64` or `ZZ` (P-173). *the checker: numerals* | property
6. The coercion attempt refuses a call with an untyped function argument (row 507). *the checker: static-argument inference* | defect (row 507)
7. It refuses a call beyond 64 combinations of candidate types (row 506). *the checker: static-argument inference* | defect (row 506)
8. Four tests. *the checker: static-argument inference* | tests

Overlap:
- 1: F-55, F-51, F-137 (walk's twin), F-173. Searched "narrowest", "P-74", "NatLitArgChecker".
- 3: F-349 (walk's choice among coerced declarations). Searched "Ambiguous coercion".
- 5: F-74, F-342, F-407 (P-173). Searched "P-173".
- 6: F-78 (row 507). Searched "row 507".
- 7: none found. Searched "row 506".

Checks: tests found; rows 506, 507 NEGATIVE-VERIFIED, agree (S2). No SC finding.

Shape: one subject (the checker: static-argument inference), with numeral and ranking rules beside it. Title: inference with coercion; the body serves it.
~~~

### F-78
- The map's line: F-78 · rewritten in place: "the checker: static-argument inference" (owner F-73) · defects: row 559 (6) · check: cites a thing that is gone.
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: C-infer "the checker: static-argument inference", owner F-73 (claims 1, 2, 3, 4, 5, 7); G-selfcast "the code generator: casts of self and intersection receivers", owner F-377 (claims 6).
- Claims to move out of the entry, by kind: tests 7.
- Defect: claim 6, ledger row 559.
- Today's checks: cites a thing that is gone or moved.
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-55 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-173 (in this chunk), F-271 (in this chunk), F-273 (in this chunk).
- Its claims, from claims-checker-2.md, word for word:

~~~
## F-78 "The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds"

Claims:
1. A type parameter that nothing at a call fixes takes the intersection of its upper bounds, never `BottomType` (P-48). *the checker: static-argument inference* | property
2. Where the call has an expected type, its attempts are: subtyping without it, subtyping with it, coercion with it, coercion without it. *the checker: static-argument inference* | property
3. The second lets a call whose untyped function argument only the expected type fixes check, since the coercion attempt cannot (row 507). *the checker: static-argument inference* | property (row 507)
4. P-49 decides the first and the third; the second and the fourth are the instance-bound rung's choice (D4). *the checker: static-argument inference* | choice
5. An argument of intersection type fixes a parameter at the whole intersection (row 541). *the checker: static-argument inference* | property (row 541 fixed)
6. The run time has no class for an intersection, so such an instance dies as it loads (row 559). *the compiled runtime: intersection types* | defect (row 559)
7. `InferResultOnly*`, `InferContextKeepsFit`. *the checker: static-argument inference* | tests

Overlap:
- 1: F-84 (P-48 "the intersection of its upper bounds"), F-141 and F-143 (walk's twins), F-173, F-271. Searched "BottomType", "P-48", "intersection".
- 2: F-87 (contexts of the expected type). Searched "D4", "InferResultOnly".
- 3: F-73 (row 507). Searched "row 507".
- 4: none found. Searched "D4", "an agent's choice".
- 6: F-76 (row 559). Searched "row 559".

Checks: tests found; rows 507 NEGATIVE-VERIFIED, 541 FIXED, 559 NEGATIVE-VERIFIED (S2). `Functionals.scala:962-966` does not hold the attempt order: cites a thing that is gone (SC, F-78; S2).

Shape: one subject (the checker: static-argument inference), with one run-time defect. Title: the instance at the bounds and the order of attempts; the body serves it.
~~~

### F-85
- The map's line: F-85 · rewritten in place: "the library: reductions, their identities and static arguments" (owner F-59) · out: history 5.
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 1, 2, 4, 5, 6); H-values "the gate: the values of the checker count and the distance", owner F-53 (claims 3).
- Claims to move out of the entry, by kind: history 5; tests 6.
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-59 (in this chunk), F-60 (in this chunk), F-81 (not in this chunk, chunk arrays), F-144 (in this chunk), F-159 (not in this chunk, chunk arrays), F-220 (in this chunk), F-221 (in this chunk), F-228 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-285 (in this chunk), F-364 (in this chunk).
- Group of overlap O45, "Repairs in forms the library uses": one rung's repairs; with F-83 (not in this chunk, chunk arrays), F-84 (not in this chunk, chunk arrays).
- Group of overlap O49, "Fusion and the generic distribute": the fusion pairs, the method condition, the casts at the fallbacks; with F-242 (in this chunk), F-243 (in this chunk), F-248 (in this chunk), F-250 (not in this chunk, chunk comprises), F-253 (not in this chunk, chunk overloading).
- Its claims, from claims-checker-2.md, word for word:

~~~
## F-85 "In the interpreter's library, the rung's repairs of the generator, condition, reduction and nested-generator declarations"

Claims:
1. The rung's repairs of the generator, condition, reduction and nested-generator declarations are in forms the library already uses. *the library: generators and reductions* | choice
2. `__bigOperator2`'s fused branch passes its result through `cast[\O0\]` (`FortressLibrary.fss:1670`), so the checker no longer types it `OR(I0,O0)` (row 632). *the library: generators and reductions* | property
3. No site of these declarations is on the distance. *the harness and the gate: checker count and distance* | pointer (F-53)
4. Each `Condition` body that calls `cond` writes its static argument. *the library: generators and reductions* | property
5. The sites left were cleared by other work, held by F-250, F-93 (row 629) and F-144 (row 628). *the library: generators and reductions* | history
6. `GeneratorDeclarations.fss`, `NestedReductionFusion.fss`, and the distance stage. *the library: generators and reductions* | tests

Overlap:
- 2: F-285 ("`__bigOperator2`'s fused arm casts its result to `O0`"), F-81, F-264 (the cast device). Searched "__bigOperator2", "cast[\O0\]", "row 632".
- 1: F-83, F-84. Searched "forms that the library already uses".
- 4: none found. Searched "cond[".

Checks: `FortressLibrary.fss:1670` agrees; tests found; rows 628, 629, 632 FIXED, agree (S2). No SC finding.

Shape: one subject (the library: generators and reductions), with history. Title: repairs in known forms and the `cast[\O0\]`; the body serves it, and claim 2 repeats F-285.
~~~

### F-87
- The map's line: F-87 · rewritten in place: "the checker: the expected type" (owner) · check: cites a thing that is gone.
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: C-expected "the checker: the expected type", owner F-87 (claims 1, 3, 4, 5, 7); S-infer "the specification: type inference", owner F-173 (claims 2); C-infer "the checker: static-argument inference", owner F-73 (claims 6).
- Claims to move out of the entry, by kind: tests 7.
- Today's checks: cites a thing that is gone or moved.
- Group of overlap O31, "The expected type": the contexts that give a call its expected type; with F-56 (in this chunk), F-221 (in this chunk), F-364 (in this chunk).
- Its claims, from claims-checker-2.md, word for word:

~~~
## F-87 "Besides the contexts that it already had ... the compiled checker gives a call its expected type in ..."

Claims:
1. The checker gives a call its expected type in an `if` without `else`, a block's last expression, a `typecase` clause, a juxtaposition, a repeated operator, a `label` body and its `exit` values, and another call's argument by retry. *the checker: expected type* | property
2. The inference chapter lists every context. *the specification: inference* | pointer
3. In a juxtaposition or repeated operator, the expression's expected type goes to the application it makes. *the checker: expected type* | property
4. The `label` contexts build P-50. *the checker: expected type* | pointer
5. At another call's argument it retries the enclosing call per declaration (P-51, F-221). *the checker: expected type* | pointer
6. F-226 and F-70 hold related rules. *the checker: static-argument inference* | pointer
7. `InferResultOnly*`, `Infer*Context`. *the checker: expected type* | tests

Overlap:
- 1: F-56 (expected type at `f(x)`, method calls, operators), F-221 (the retry), F-364. Searched "if` without `else", "expected type", "P-51".

Checks: tests found; `inference.tex` section found (S2). "The expected type" is no heading of `inference.tex`: cites a thing that is gone (SC, F-87; S2).

Shape: one subject (the checker: expected type). Title: the list of contexts; the body serves it.
~~~

### F-220
- The map's line: F-220 · merged into F-285: one line of the library that F-285 and F-228 cover · cut: copied gate value (2).
- Shape: one subject. Disposition: merged. Merged into F-285 (in this chunk): one line of the library that F-285 and F-228 cover.
- Subjects of its claims: L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 1, 3, 4); H-values "the gate: the values of the checker count and the distance", owner F-53 (claims 2).
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-59 (in this chunk), F-60 (in this chunk), F-81 (not in this chunk, chunk arrays), F-85 (in this chunk), F-144 (in this chunk), F-159 (not in this chunk, chunk arrays), F-221 (in this chunk), F-228 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-285 (in this chunk), F-364 (in this chunk).
- Its claims, from claims-checker-3.md, word for word:

~~~
## F-220 "`__bigOperator`'s local function `body` declares its parameter's type"

1. `__bigOperator`'s local `body` is declared `body(i: I): L` in `Library/FortressLibrary.fss`. — *the library: big operator static arguments*; kind: **property**; overlap: F-228 ("the library types `__bigOperator`'s local function `body(i: I)` at the element type `I`"); checks: line found at `:1511` (scout).
2. The compiled checker accepts the line; the distance and count find no error there. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-53 (distance and count at 0); checks: sound (scout).
3. F-228 holds how walk runs a reduction without a static argument. — kind: **pointer**.
4. Detail in `rung-walk-elements/REPORT.md` section 6. — kind: **pointer**.

- Shape: one subject (the library: big operator static arguments), with a copied gate count.
- Title: claim 1 with claim 2; the body serves it, and is mostly pointers.
~~~

### F-221
- The map's line: F-221 · rewritten in place: "the checker: the expected type" (owner F-87) · defects: row 705 (5).
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: C-expected "the checker: the expected type", owner F-87 (claims 1, 2, 3, 4, 6, 7); W-reduce "walk: reduction instantiation", owner F-228 (claims 5).
- Claims to move out of the entry, by kind: tests 6.
- Defect: claim 5, ledger row 705.
- Group of overlap O31, "The expected type": the contexts that give a call its expected type; with F-56 (in this chunk), F-87 (in this chunk), F-364 (in this chunk).
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-59 (in this chunk), F-60 (in this chunk), F-81 (not in this chunk, chunk arrays), F-85 (in this chunk), F-144 (in this chunk), F-159 (not in this chunk, chunk arrays), F-220 (in this chunk), F-228 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-285 (in this chunk), F-364 (in this chunk).
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-55 (in this chunk), F-114 (in this chunk), F-131 (not in this chunk, chunk integers), F-137 (in this chunk), F-141 (in this chunk), F-143 (in this chunk), F-144 (in this chunk), F-170 (not in this chunk, chunk arrays), F-228 (in this chunk), F-344 (in this chunk).
- Its claims, from claims-checker-3.md, word for word:

~~~
## F-221 "The compiled checker retries a call written as another call's argument"

1. The checker retries an argument call against each enclosing declaration's parameter type, only where the enclosing call is not accepted otherwise. — *the checker: expected type and inference*; kind: **property**; overlap: F-87 ("by a retry of the enclosing call, another call's argument ... as P-51 decides (F-221)"); checks: sound (scout).
2. It builds P-51 under P-49, so a declaration that accepts the call as written is never passed over. — kind: **pointer** (to decisions).
3. A plain-bounded big operator, an argument of `__bigOperator`, takes the reduction's expected type; a self-bounded one takes it, else its body's. — *the checker: expected type and inference*; kind: **property**; overlap: F-59 (same sentence on plain and self-bounded big operators), F-364 (inference of an unwritten argument); checks: sound (scout).
4. A chain `a OPLUS b OPLUS c` that only the retry makes acceptable to a multifix declaration now runs it, not the binary one. — *the checker: expected type and inference*; kind: **property**; overlap: none found (searched "multifix"); checks: sound (scout).
5. Walk gives such an argument no expected type (row 705). — *walk: expected types*; kind: **defect** (row 705); overlap: none found (searched "row 705"); checks: row 705 NEGATIVE-VERIFIED, agrees (scout).
6. Gated by `InferCallArgument*` and `InferBigOperatorExpectedType`. — kind: **tests**; checks: found (scout).
7. Detail in `rung-argument-context` report and its `SKEPTIC.md`. — kind: **pointer**.

- Shape: one subject (the checker: expected type and inference), with a walk defect.
- Title: claim 1; the body serves it.
~~~

### F-242
- The map's line: F-242 · rewritten in place: "the library: reductions, their identities and static arguments" (owner F-59) · out: history 5, 7.
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 1, 2, 3, 4, 5, 6, 7, 8).
- Claims to move out of the entry, by kind: history 5, 7.
- Group of overlap O49, "Fusion and the generic distribute": the fusion pairs, the method condition, the casts at the fallbacks; with F-85 (in this chunk), F-243 (in this chunk), F-248 (in this chunk), F-250 (not in this chunk, chunk comprises), F-253 (not in this chunk, chunk overloading).
- Its claims, from claims-checker-3.md, word for word:

~~~
## F-242 "`SUM`'s fusion pairs with `MAX` and `MIN` hold no site of the distance"

1. `SUM`'s fusion pairs with `MAX` and `MIN` hold no distance site. — *the library: reductions and fusion*; kind: **property**; overlap: F-243 ("The method condition and the generic `distribute` clear the fusion pairs' 6 (F-242)"); checks: sound (scout).
2. A `where` condition on each of `SumReduction`'s two `distribute` overloads clears their four unmet bounds. — *the library: reductions and fusion*; kind: **property**; overlap: F-250 ("the `where` conditions on `SumReduction`'s `distribute` overloads for `MAX` and `MIN`"); checks: sound (scout).
3. `ActualReduction`'s generic `distribute`, result over its own `K`, clears their two return-type errors. — *the library: reductions and fusion*; kind: **property**; overlap: F-250 ("the generic `distribute`"); checks: sound (scout).
4. The fusion pairs are `MaxSumReductionPair`, `MinSumReductionPair` and the two overloads, for one-pass max or min of sums. — *the library: reductions and fusion*; kind: **property**; overlap: none found (searched `MaxSumReductionPair`); checks: sound (scout).
5. The team's commented text with `PossibleReductionPair[\R\]` would only move the two errors to the generic. — *the library: reductions and fusion*; kind: **history**.
6. The fusion stays (P-151). — kind: **pointer** (to a decision).
7. Row 433 is fixed, and F-250 gives the landing and test. — kind: **history**; checks: row 433 FIXED (scout).
8. Detail in two perf-probe reports. — kind: **pointer**.

- Shape: one subject (the library: reductions and fusion).
- Title: claims 1 to 3; the body serves it. No test named (scout).
~~~

### F-243
- The map's line: F-243 · merged into F-242: the history of the fusion pairs that F-242 holds · out: history 1, 4, 6.
- Shape: mostly history or plan. Disposition: merged. Merged into F-242 (in this chunk): the history of the fusion pairs that F-242 holds.
- Subjects of its claims: H-values "the gate: the values of the checker count and the distance", owner F-53 (claims 1); L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 2, 4, 6, 7); L-anylist "the library: AnyList and List", owner new (claims 3, 5).
- Claims to move out of the entry, by kind: history 1, 4, 6.
- Group of overlap O49, "Fusion and the generic distribute": the fusion pairs, the method condition, the casts at the fallbacks; with F-85 (in this chunk), F-242 (in this chunk), F-248 (in this chunk), F-250 (not in this chunk, chunk comprises), F-253 (not in this chunk, chunk overloading).
- Group of overlap O50, "AnyList and List": the comprises ... where clause and conditional LexicographicOrder; with F-251 (not in this chunk, chunk comprises), F-255 (not in this chunk, chunk comprises).
- Its claims, from claims-checker-3.md, word for word:

~~~
## F-243 "The 13 errors that were filed as waiting on `where` clauses ... are all cleared"

1. The 13 distance errors filed as waiting on `where` clauses, at the gates of batches 15b and 16, are all cleared. — *the harness and the gate: distance and count*; kind: **history**.
2. The fusion pairs' 6 by the method condition and generic `distribute` (F-242). — *the library: reductions and fusion*; kind: **pointer**.
3. `AnyList`'s 4 by its `comprises ... where [\E\]` clause made live, its bodies respelled within `AnyList` (F-251). — *the library: AnyList*; kind: **pointer**.
4. 2 by a `cast` at `additiveIdentity`'s and `multiplicativeIdentity`'s fallbacks (row 436). — *the library: reductions and fusion*; kind: **history**; checks: row 436 is about walk's empty `SUM` ending in `CastError` (NEGATIVE-VERIFIED), cited here for a distance site (scout).
5. The list comparisons' site by conditional extension, `ZeroIndexed[\E\]` and element-wise `=` outside the condition (F-255; row 634). — *the library: AnyList*; kind: **pointer**; checks: row 634 FIXED (scout).
6. Library edits without new language would also have cleared 12 of them. — *the library: reductions and fusion*; kind: **history** (a counterfactual of the probe).
7. Detail in the where-clauses probe and batch 17's review. — kind: **pointer**.

- Shape: mostly history or plan.
- Title: claim 1, a history of 13 errors; the body is a breakdown that points to F-242, F-251, F-255 and F-85. No test named (scout).
~~~

### F-285
- The map's line: F-285 · split: keeps "the library: reductions, their identities and static arguments" (owner F-59) · parts: "walk: reduction instantiation" (9, 10) to F-228 · out: detail 4 · cut: copied gate value (7) · defects: row 824 (10) · check: false today.
- Shape: one subject. Disposition: split.
- Subjects of its claims: L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 1, 2, 3, 4, 5, 6, 11, 12); H-values "the gate: the values of the checker count and the distance", owner F-53 (claims 7); C-expected "the checker: the expected type", owner F-87 (claims 8); W-reduce "walk: reduction instantiation", owner F-228 (claims 9, 10).
- A part goes to another entry: claims 9, 10, subject "walk: reduction instantiation", owner F-228, to F-228 (in this chunk).
- Claims to move out of the entry, by kind: detail 4; tests 11.
- Defect: claim 10, ledger row 824.
- Today's checks: false today.
- Group of overlap O28, "The checker count and the distance": the values at the last gate, the fourteen against the twelve, how the stages run; with F-42 (not in this chunk, chunk export), F-43 (not in this chunk, chunk export), F-53 (not in this chunk, chunk export), F-54 (not in this chunk, chunk export), F-61 (not in this chunk, chunk runtime), F-66 (not in this chunk, chunk export), F-111 (not in this chunk, chunk export), F-245 (not in this chunk, chunk overloading), F-281 (not in this chunk, chunk overloading), F-287 (not in this chunk, chunk export), F-288 (not in this chunk, chunk export), F-289 (not in this chunk, chunk export), F-290 (not in this chunk, chunk export), F-295 (not in this chunk, chunk export), F-296 (not in this chunk, chunk overloading).
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-59 (in this chunk), F-60 (in this chunk), F-81 (not in this chunk, chunk arrays), F-85 (in this chunk), F-144 (in this chunk), F-159 (not in this chunk, chunk arrays), F-220 (in this chunk), F-221 (in this chunk), F-228 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-364 (in this chunk).
- Its claims, from claims-checker-4.md, word for word:

~~~
## F-285 "The interpreter's library writes the static argument of every clause form whose big operator's bound names its parameter"

1. The library writes the static argument of every clause form whose big operator's bound names its parameter, and of every list comprehension, in the components the distance checks. — *the library: big operator static arguments*; kind: **property**; overlap: F-59 ("so does the interpreter's library at its own sites (F-285)"); checks: stale: "twelve components", where `run.sh` lists 14 (false today).
2. `__bigOperator2`'s fused arm casts its result to `O0`. — *the library: big operator static arguments*; kind: **property**; overlap: F-85 (same cast, "passes its result through `cast[\O0\]`"); checks: `:1670` agrees (scout).
3. It follows P-78. — kind: **pointer**.
4. The sites: `BIG MIN[\ZZ32\]` in `upto` and `beyond`, `<|[\E\] ...|>` in `List`'s range subscript, `SUM[\T\]` and `SUM[\ZZ32\]` lines, `transpose`. — *the library: big operator static arguments*; kind: **detail**; checks: every line agrees (scout).
5. The clause forms left unwritten are of plain-bounded big operators (`BIG ||`, `BIG AND`, `BIG OR`), taken at their bound, or of `BIG LEXICO`, which has none. — *the library: big operator static arguments*; kind: **property**; overlap: F-59 and F-221 (a plain bound is taken at its bound); checks: sound (scout).
6. The fused arm uses the library's cast device (F-264), as `__builtinFactory1`'s `N[\0\]` arm does. — *the library: big operator static arguments*; kind: **property**; overlap: F-85 (F-264's device); checks: `:2824` agrees (scout).
7. So the distance holds no site of an unwritten argument or of the fused arm. — *the harness and the gate: distance and count*; kind: **property**; overlap: F-85, F-53; checks: sound (scout).
8. The checker now infers such an argument (F-364); the library's sites stay written. — *the checker: expected type and inference*; kind: **pointer**.
9. Under walk the written comprehension makes `List`'s strided subscript answer a `List[\E\]`. — *walk: reduction instantiation*; kind: **property**; overlap: F-228 (walk instantiates by a declared type); checks: sound (scout).
10. `PureList`'s strided subscript answers objects at their run-time types, and `ZZ32` or `String` lists at their element type (row 824). — *walk: reduction instantiation*; kind: **defect** (row 824); overlap: none found (searched "row 824", `PureList`); checks: row 824 NEGATIVE-VERIFIED (scout).
11. Tests: the distance stage and three walk tests. — kind: **tests**; checks: found (scout).
12. Detail in `rung-body-arguments` report. — kind: **pointer**.

- Shape: one subject (the library: big operator static arguments), with walk's view.
- Title: claims 1 and 2; the body serves it. Claim 2 is said in F-85.
~~~

### F-344
- The map's line: F-344 · split: keeps "walk: static-argument inference" (owner F-141) · parts: "both paths: a value's printed form and type name" (2, 6) to F-123 · out: detail 3.
- Shape: several subjects. Disposition: split.
- Subjects of its claims: W-infer "walk: static-argument inference", owner F-141 (claims 1, 3, 4, 5, 7, 8); B-print "both paths: a value's printed form and type name", owner F-123 (claims 2, 6).
- A part goes to another entry: claims 2, 6, subject "both paths: a value's printed form and type name", owner F-123, to F-123 (not in this chunk, chunk numerals).
- Claims to move out of the entry, by kind: detail 3; tests 7.
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-55 (in this chunk), F-114 (in this chunk), F-131 (not in this chunk, chunk integers), F-137 (in this chunk), F-141 (in this chunk), F-143 (in this chunk), F-144 (in this chunk), F-170 (not in this chunk, chunk arrays), F-221 (in this chunk), F-228 (in this chunk).
- Group of overlap O68, "Walk's type text": a value's type name and ilk; with F-123 (not in this chunk, chunk numerals), F-328 (not in this chunk, chunk natives).
- Its claims, from claims-checker-5.md, word for word:

~~~
## F-344, "Under walk, a value of the four string objects is read at its trait where walk infers a static argument ..."

- Claims:
  1. [property] {walk: generic instantiation} Where walk infers a static argument, a value of `FlatString`, `CatString`, `EmptyString` or `SubString` is read as `String`, also inside tuple types.
  2. [property] {walk: type names and ilk} Walk's type text prints each of the four by its trait.
  3. [detail] {walk: generic instantiation} Told by its declaring component (`LanguageTypes.java:13-33`), at `EvaluatorBase`'s three reads and `FTraitOrObject.toString`.
  4. [property] {walk: generic instantiation} So `Cell("s")` is a `Cell[\String\]`, and `Cell(3)` a `Cell[\ZZ32\]`, `<|1, 2, 3|>` an `ArrayList[\ZZ32\]`.
  5. [pointer] Numbers need no such reading since the five are objects (F-379).
  6. [property] {walk: type names and ilk} The ilk still names a string object by its own name.
  7. [tests] {walk: generic instantiation} `tests/LanguageTypeInstancesWalk`.
  8. [pointer] Detail in `rung-walk-language-types/REPORT.md`.
- Overlaps:
  - 1, 4: F-123 ("`Cell(3)` is a `Cell[\ZZ32\]` (`tests/LanguageTypeInstancesWalk`" [Cell(]); F-74 (walk infers `Box(3)` at the value object); F-328 ("walk instantiates a generic at its trait (F-344)").
  - 6: F-328 claim 4 [ilk, FlatString].
- Checks: all found (scout 4). No stale finding.
- Shape: several subjects: walk: generic instantiation; walk: type names and ilk.
- Title: states both; the body serves it.
~~~

### F-364
- The map's line: F-364 · split: keeps "the checker: the expected type" (owner F-87) · parts: "the library: reductions, their identities and static arguments" (5) to F-59 · out: history 9; detail 10 · defects: row 1008 (6); row 1007 (7); row 1015 (8).
- Shape: one subject. Disposition: split.
- Subjects of its claims: C-expected "the checker: the expected type", owner F-87 (claims 1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12); L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 5).
- A part goes to another entry: claim 5, subject "the library: reductions, their identities and static arguments", owner F-59, to F-59 (in this chunk).
- Claims to move out of the entry, by kind: history 9; detail 10; tests 11.
- Defect: claim 6, ledger row 1008.
- Defect: claim 7, ledger row 1007.
- Defect: claim 8, ledger row 1015.
- Group of overlap O31, "The expected type": the contexts that give a call its expected type; with F-56 (in this chunk), F-87 (in this chunk), F-221 (in this chunk).
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-59 (in this chunk), F-60 (in this chunk), F-81 (not in this chunk, chunk arrays), F-85 (in this chunk), F-144 (in this chunk), F-159 (not in this chunk, chunk arrays), F-220 (in this chunk), F-221 (in this chunk), F-228 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-285 (in this chunk).
- Its claims, from claims-checker-5.md, word for word:

~~~
## F-364, "The compiled checker instantiates a reduction that writes no static argument by its expected type ..."

- Claims:
  1. [property] {the checker: reduction inference} For a reduction with no written static argument, the checker first checks the call as written, then writes the argument as the expected type, then as the body's type, within the bounds, taking the first form that is accepted and converts.
  2. [property] {the checker: reduction inference} A reduction accepted as written is unchanged, and the elements are converted to the instance.
  3. [property] {the checker: reduction inference} A call's argument has no expected type where the call is accepted without one (P-51), so a reduction there runs at its body's type.
  4. [property] {the checker: reduction inference} `SUM`, `PROD`, `BIG MIN` and `BIG MAX` need no written static argument for the checker.
  5. [property] {the library: reduction sites} The library still writes it (F-285), and the model's one clause-form sum does not (F-59).
  6. [defect] {the checker: reduction inference} The two paths give such a reduction different instances at a method's return type, a field, a top-level variable and an assignment (row 1008).
  7. [defect] {the checker: reduction inference} A big operator with two or more static parameters is refused (row 1007).
  8. [defect] {the checker: reduction inference} Where the bound names its parameter, a type error in an unwritten reduction's body is reported as the big operator's refusal (row 1015).
  9. [history] {the checker: reduction inference} Observed once in copies without the argument: the library's two `BIG MIN` sites, its list comprehension and the model's sum give no error.
  10. [detail] {the checker: reduction inference} `reductionApplication` in `Functionals.scala`; `MicroGptFlat.fss:38`.
  11. [tests] {the checker: reduction inference} `InferBigOperatorSelfBound`; guards `InferBigOperatorExpectedType`, `InferBigOperatorUnwritten`.
  12. [pointer] Detail in `rung-static-argument-inferred/REPORT.md`.
- Overlaps:
  - 1, 4: F-59 ("the compiled checker takes an unwritten one from the reduction's expected type, else from the type of its body"); F-221 ("one whose bound names its parameter takes that type, else its body's (F-364)") [F-364, expected type].
  - 3: F-56, F-78 (expected type at a call) [expected type].
  - 5: F-285 ("The checker now infers such an unwritten argument itself (F-364); the library's sites stay written"); F-58 (line 38's sum) [F-364].
  - 6, 7, 8: none found [row 1008, row 1007, row 1015]; the skill's `revival-changes.md:122` on the two paths (scout 5).
- Checks: all found; row 731 FIXED, rows 1007, 1008 NEGATIVE-VERIFIED and 1015 NEGATIVE-BOUNDED, agree; line 38 not checked (scout 4). Stale lists a skill pointer (`sources.md` cites F-59 where F-364 is meant), not a finding on this entry.
- Shape: one subject (the checker: reduction inference), with defects and a library pointer.
- Title: states the rule; the body serves it.
~~~

### F-365
- The map's line: F-365 · split: keeps "the checker: the expected type" (owner F-87) · parts: "the checker: speed, memos and memory" (7) to F-65 · out: plan 8 · defects: rows 1009, 1010 (9); rows 1012, 1013 (10).
- Shape: one subject. Disposition: split.
- Subjects of its claims: C-expected "the checker: the expected type", owner F-87 (claims 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12); C-speed "the checker: speed, memos and memory", owner F-65 (claims 7).
- A part goes to another entry: claim 7, subject "the checker: speed, memos and memory", owner F-65, to F-65 (not in this chunk, chunk export).
- Claims to move out of the entry, by kind: plan 8; tests 11.
- Defect: claim 9, ledger rows 1009, 1010.
- Defect: claim 10, ledger rows 1012, 1013.
- Group of overlap O67, "A generic function as a value": the arrow type that receives it, on each path; with F-367 (in this chunk).
- Its claims, from claims-checker-5.md, word for word:

~~~
## F-365, "The compiled checker instantiates a reference to a generic function by the arrow type that receives it ..."

- Claims:
  1. [property] {the checker: generic function as value} A reference with one generic declaration, no written static arguments and an expected arrow type takes the static arguments that make its instance a subtype of that type.
  2. [property] {the checker: generic function as value} As an argument it is typed again in the retry with each candidate's parameter type (`retypable`).
  3. [property] {the checker: generic function as value} A static parameter that the arrow's domain does not fix is refused, with a message naming it.
  4. [property] {the checker: generic function as value} An arrow type that carries its own static parameters is a subtype of no arrow type and coerces to nothing.
  5. [property] {the checker: generic function as value} The applied value of an untyped binding is refused with a message.
  6. [property] {the checker: generic function as value} A function's own static parameter counts as unbound also where the kind environment holds its name for another declaration (`carriesOwnStaticParams`).
  7. [property] {the checker: memos} The memo of normalized arrow types keys an arrow type by its static parameters too.
  8. [plan] {the checker: generic function as value} No test compiles the model's row-lift form, `rows(rmsn, x)`, a generic callee whose sizes its other argument fixes.
  9. [defect] {the checker: generic function as value} A name with several declarations of which one is generic (row 1009), and an untyped binding never applied (row 1010), are still refused or stopped.
  10. [defect] {the checker: generic function as value} A reference at a non-arrow expected type (row 1012) and a generic trait's functional method passed inside the trait (row 1013) are accepted and dead at run time.
  11. [tests] {the checker: generic function as value} Four tests, `GenericFunctionAsValue*`.
  12. [pointer] Detail in `rung-static-argument-inferred/REPORT.md`, step 2.
- Overlaps:
  - 1: F-367 (walk's side: "Under walk a generic function is a value, received at the arrow type of its parameter or variable" [F-367, generic function]); the skill's `compiler.md:154` (scout 5).
  - 6: F-384 ("The code generator's kind environment holds the static parameters in scope", another phase) [kind env].
  - 7: F-235 (the checker's memos) [memo]; none for the arrow memo.
  - 9, 10: none found [row 1009, row 1010, row 1012, row 1013].
- Checks: all found; `instantiatedReference` not grepped; rows 758 FIXED, 1009, 1010, 1012, 1013 NEGATIVE-VERIFIED, agree (scout 4). No stale finding.
- Shape: one subject (the checker: generic function as value), with a memo claim (7).
- Title: states the rule and the refusal; the body serves it.
~~~

### F-114
- The map's line: F-114 · split: keeps "the harness: the specification's examples" (owner) · parts: "walk: static-argument inference" (4) to F-141 · check: false today, unsettled.
- Shape: one subject. Disposition: split.
- Subjects of its claims: H-specex "the harness: the specification's examples", owner F-114 (claims 1, 2, 3, 5); W-infer "walk: static-argument inference", owner F-141 (claims 4).
- A part goes to another entry: claim 4, subject "walk: static-argument inference", owner F-141, to F-141 (in this chunk).
- Today's checks: false today; unsettled, to investigate.
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-55 (in this chunk), F-131 (not in this chunk, chunk integers), F-137 (in this chunk), F-141 (in this chunk), F-143 (in this chunk), F-144 (in this chunk), F-170 (not in this chunk, chunk arrays), F-221 (in this chunk), F-228 (in this chunk), F-344 (in this chunk).
- Its claims, from claims-harness.md, word for word:

~~~
### F-114, "`ant testSpecData` runs 130 of the specification's 133 extracted examples under walk ..."

1. Claims
   - C1. `ant testSpecData` runs 130 of the specification's 133 extracted examples under walk, as a gate step, and all pass. Subject: the harness and the gate: specification examples. Kind: property.
   - C2. `SpecDataJUTest` runs `basic`, `preliminaries` and `advanced`, not `library/`'s three, and `testFast` excludes it. Subject: the harness and the gate: specification examples. Kind: property.
   - C3. It builds P-124. Kind: pointer.
   - C4. Five examples write no static argument on a generic big operator with an F-bound and pass only because walk leaves it open (F-143; row 424 fixed). Subject: walk: open F-bounded parameters. Kind: property.
   - C5. The count and time are in the last gate's `summary.txt`. Kind: pointer.
2. Overlaps: C1-C2: F-170 [`ant testSpecData`, a gate step, runs both ZZ64 range examples]; P-124; skill `tests-running.md:24` (pilot). C4: F-143 [F-bound left open], F-228 [join of run-time types, F-bounded stays open]. Searched "row 424": only F-114.
3. Checks: C1-C2 false today: 135 examples, five in `library/`, since `73213e4be4`; the 130 run still holds (stale; pilot). C4 unsettled: not checked again, may pass by F-228's join now (stale; followups "Open"). P-124 says every example must pass while `library/`'s five run in no suite (followups "Open").
4. Shape: one subject (specification examples) with C4 beside it. Title: 130 of 133 pass; false today in the 133.
~~~

### F-137
- The map's line: F-137 · rewritten in place: "walk: static-argument inference" (owner F-141) · out: detail 3 · defects: row 509 (5); rows 510, 511 (6); no row named (7).
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: W-infer "walk: static-argument inference", owner F-141 (claims 1, 2, 3, 4, 5, 6, 7, 8, 9).
- Claims to move out of the entry, by kind: detail 3; tests 8.
- Defect: claim 5, ledger row 509.
- Defect: claim 6, ledger rows 510, 511.
- Defect: claim 7, ledger row .
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-55 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-173 (in this chunk), F-271 (in this chunk), F-273 (in this chunk).
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-55 (in this chunk), F-114 (in this chunk), F-131 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-144 (in this chunk), F-170 (not in this chunk, chunk arrays), F-221 (in this chunk), F-228 (in this chunk), F-344 (in this chunk).
- Group of overlap O78, "Walk's dispatch and inference for generic methods": rows 1134, 21, 744; with F-26 (not in this chunk, chunk overloading), F-141 (in this chunk), F-248 (in this chunk), F-253 (not in this chunk, chunk overloading), F-405 (not in this chunk, chunk overloading).
- Its claims, from claims-landed-1.md, word for word:

~~~
## F-137, "Under `walk`, a generic call's static arguments are inferred with coercion"

- Claims:
  - c1 · property · walk: static argument inference · Under walk a generic call's static arguments are inferred with coercion by P-74's promotion, also for the declaration an overloaded call chooses (P-46).
  - c2 · property · walk: static argument inference · A lone type parameter takes the narrowest of its arguments' run-time types, their coercion targets and its bounds that admits every argument.
  - c3 · detail · walk: static argument inference · So `ZZ32` with `ZZ64` gives `ZZ64`, and `ZZ64` with `RR64` gives the declared bound.
  - c4 · property · walk: static argument inference · With no narrowest candidate it takes its bound where every argument is below it (F-141), else the join.
  - c5 · defect · walk: static argument inference · Since walk promotes from run-time types, the two paths instantiate differently where a static type is wider than its value (row 509).
  - c6 · defect · walk: static argument inference · The rule misses a static argument that only the result mentions, at a typed binding (row 510), and a varargs or tuple parameter over mixed widths (row 511).
  - c7 · defect · walk: static argument inference · By inference, not measured, it misses a `ZZ32`-fitting numeral for a parameter whose bound a `ZZ32` neither extends nor coerces into (P-76).
  - c8 · tests · walk: static argument inference · Gated by `InferCoercionRungK.fss`.
  - c9 · pointer · · Detail in `rung-inference-walk/REPORT.md`.
- Overlap:
  - c1: F-55 ("Static arguments are inferred with coercion on both paths ... F-137 walk's"), F-73 (the checker's rule), F-173 (the specification's rule). Searched `InferCoercionRungK`, `P-74`, `narrowest`.
  - c2: F-141 (the lone type parameter's definition), F-73, F-173 (the same rule for the checker and the specification). Searched `lone type parameter`, `narrowest`.
  - c4: F-141 (whole claim). Searched `its bound`.
  - c5: none found (searched `row 509`).
  - c6: F-55 (row 510's program), F-92 (row 511). Searched `row 510`, `row 511`.
  - c7: none found (searched `P-76`).
- Checks: no finding. Scout: the test found; rows 509, 510, 511 agree. History (scout's Words): applied at the curator's word "apply all the improvements drafted", 2026-10-22, without review of each change.
- Shape: one subject. Title: walk infers with coercion; the body serves it.
~~~

### F-141
- The map's line: F-141 · split: keeps "walk: static-argument inference" (owner) · parts: "walk: reduction instantiation" (6, 7) to F-228 · out: plan 14 · defects: rows 591, 616 (10); row 612 (11); row 587 (12); row 589 (13).
- Shape: several subjects. Disposition: split.
- Subjects of its claims: W-infer "walk: static-argument inference", owner F-141 (claims 1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 13, 14, 15, 16); W-reduce "walk: reduction instantiation", owner F-228 (claims 6, 7).
- A part goes to another entry: claims 6, 7, subject "walk: reduction instantiation", owner F-228, to F-228 (in this chunk).
- Claims to move out of the entry, by kind: plan 14; tests 15.
- Defect: claim 10, ledger rows 591, 616.
- Defect: claim 11, ledger row 612.
- Defect: claim 12, ledger row 587.
- Defect: claim 13, ledger row 589.
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-55 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-143 (in this chunk), F-173 (in this chunk), F-271 (in this chunk), F-273 (in this chunk).
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-55 (in this chunk), F-114 (in this chunk), F-131 (not in this chunk, chunk integers), F-137 (in this chunk), F-143 (in this chunk), F-144 (in this chunk), F-170 (not in this chunk, chunk arrays), F-221 (in this chunk), F-228 (in this chunk), F-344 (in this chunk).
- Group of overlap O78, "Walk's dispatch and inference for generic methods": rows 1134, 21, 744; with F-26 (not in this chunk, chunk overloading), F-137 (in this chunk), F-248 (in this chunk), F-253 (not in this chunk, chunk overloading), F-405 (not in this chunk, chunk overloading).
- Sent here by the map: claim 8 of F-18 (not in this chunk, chunk sizes), subject "walk: static-argument inference", owner F-141.
- Sent here by the map: claim 5 of F-123 (not in this chunk, chunk numerals), subject "walk: static-argument inference", owner F-141.
- Sent here by the map: claim 6 of F-341 (not in this chunk, chunk numerals), subject "walk: static-argument inference", owner F-141.
- Sent here by the map: claim 6 of F-229 (not in this chunk, chunk arrays), subject "walk: static-argument inference", owner F-141.
- Its claims, from claims-landed-1.md, word for word:

~~~
## F-141, "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound"

- Claims:
  - c1 · property · walk: static argument inference · Under walk a type parameter that nothing at a call fixes takes its declared bound.
  - c2 · pointer · · It builds P-48.
  - c3 · property · walk: static argument inference · A lone one with no narrowest candidate takes its bound where every argument is below it, else the join (F-137).
  - c4 · property · walk: static argument inference · A parameter seen only in function domains an odd number of arrows deep is bounded from above and takes the meet of its bound and the arguments' bounds.
  - c5 · pointer · · An F-bounded parameter stays open (F-143).
  - c6 · property · walk: reduction instantiation · A reduction or comprehension with no static argument is fixed by its value's declared type, else its elements' join (F-228).
  - c7 · choice · walk: reduction instantiation · That rule is the coordinator's call.
  - c8 · choice · walk: static argument inference · By default D3, a parameter that only another fixed parameter's bound mentions takes that parameter's instance (row 592).
  - c9 · choice · walk: static argument inference · By default D5, a lone one whose bound mentions a static parameter takes the arguments' narrowest common supertype, never its bound.
  - c10 · defect · walk: static argument inference · Two bounds walk cannot meet (row 591), and two upper bounds from two function arguments (row 616), fail.
  - c11 · defect · walk: static argument inference · A bound only from above that mentions another static parameter keeps `Bottom` (row 612).
  - c12 · defect · walk: static argument inference · A parameter that only an untyped function expression's result fixes takes `Bottom` (row 587).
  - c13 · defect · walk: static argument inference · A generic is passed over at dispatch when its arguments have several minimal common supertypes (row 589).
  - c14 · plan · walk: static argument inference · Row 589's repair changes which declaration runs, and is the curator's to decide.
  - c15 · tests · walk: static argument inference · Gated by `tests/Infer*Walk.fss`.
  - c16 · pointer · · Detail in `rung-walk-instance`, `rung-walk-elements`, `rung-walk-meet` reports.
- Overlap:
  - c1: the skill (revival-changes.md:68, P-48); F-78 (the checker's rule: the intersection of upper bounds); F-55 ("a parameter that nothing fixes takes `Any`"); F-173. Searched `its bound`, `declared bound`.
  - c3: F-137 (whole), F-173 ("at its bound where no argument type is narrowest, on both paths"). Searched `lone type parameter`, `narrowest`.
  - c4: none found (searched `arrows deep`, `meet of its declared bound`).
  - c6: F-228 (whole), F-143. Searched `reduction or comprehension`.
  - c7: F-228 ("decision 6"); none other found (searched `coordinator's call`: F-239 uses it for another subject).
  - c8, c9: none found (searched `D3`, `D5`, `row 592`).
  - c10, c11: none found (searched `row 591`, `row 612`, `row 616`).
  - c12: F-173 ("the return type `BottomType` that walk gives a function expression that declares none (row 587)"). Searched `row 587`, `BottomType`.
  - c13: none found (searched `row 589`).
- Checks: no finding. Scout: tests found; rows 587, 589, 591, 592, 612, 616 agree.
- Shape: several subjects (walk: static argument inference; walk: reduction instantiation), with choices and a decision to take. Title: an unfixed parameter takes its bound; the body serves it but carries F-137's and F-228's rules and five defects.
~~~

### F-143
- The map's line: F-143 · merged into F-141: the exception, an F-bounded parameter left open, of F-141's rule; its reduction claims go to F-228 · parts: "walk: reduction instantiation" (2, 3) to F-228 · out: detail 5 · defects: row 716 (3); row 663 (4); row 825 (6).
- Shape: one subject. Disposition: merged. Merged into F-141 (in this chunk): the exception, an F-bounded parameter left open, of F-141's rule; its reduction claims go to F-228.
- Subjects of its claims: W-infer "walk: static-argument inference", owner F-141 (claims 1, 4, 5, 6, 7, 8); W-reduce "walk: reduction instantiation", owner F-228 (claims 2, 3).
- A part goes to another entry: claims 2, 3, subject "walk: reduction instantiation", owner F-228, to F-228 (in this chunk).
- Claims to move out of the entry, by kind: detail 5; tests 7.
- Defect: claim 3, ledger row 716.
- Defect: claim 4, ledger row 663.
- Defect: claim 6, ledger row 825.
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-55 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-173 (in this chunk), F-271 (in this chunk), F-273 (in this chunk).
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-55 (in this chunk), F-114 (in this chunk), F-131 (not in this chunk, chunk integers), F-137 (in this chunk), F-141 (in this chunk), F-144 (in this chunk), F-170 (not in this chunk, chunk arrays), F-221 (in this chunk), F-228 (in this chunk), F-344 (in this chunk).
- Its claims, from claims-landed-1.md, word for word:

~~~
## F-143, "Under walk, a type parameter whose bound mentions itself ... is left open"

- Claims:
  - c1 · property · walk: open F-bounded parameter · Under walk an F-bounded type parameter that nothing at a call fixes is left open, printed `OPEN`, below every type.
  - c2 · property · walk: reduction instantiation · A reduction or comprehension is first instantiated by its declared type or its elements' join (F-228), so the open parameter reaches only the cases neither fixes.
  - c3 · defect · walk: reduction instantiation · An empty `SUM` or `PROD` that no declared type directs takes `ZZ32`'s identity whatever its body's type (row 716).
  - c4 · defect · walk: open F-bounded parameter · Among overloads, a tuple, arrow or generic type holding the open type admits no more than at `BottomType`, so `pick(x: (T,T))` does not take `(1, 2)` beside `pick(x: Any)` (row 663, contested).
  - c5 · detail · walk: open F-bounded parameter · In a skeptic's probe, a method over an open `T` was the most specific and chosen for every argument; no gated test holds it.
  - c6 · defect · walk: open F-bounded parameter · A list comprehension at such an open parameter, and `List`'s strided range subscript on such a list, end in `CastError` at `List.fss:179` (row 825, contested).
  - c7 · tests · walk: open F-bounded parameter · Gated by `InferUnfixedFBoundedWalk`, `OpenTupleDispatchWalk`, `OpenParameterListComprehensionWalk`.
  - c8 · pointer · · Detail in `rung-walk-open-param` and `rung-body-arguments` reports.
- Overlap:
  - c1: the skill (revival-changes.md:68, SKILL.md "Under walk, one whose bound names the parameter itself stays open"); F-141 c5, F-228 ("an F-bounded parameter stays open"); F-114 (examples pass by the open parameter). Searched `F-bound`, `OPEN`, `stays open`.
  - c2: F-228 (whole), F-141 c6. Searched `elements' join`.
  - c3: F-228 (row 716). Searched `row 716`.
  - c4: none found (searched `row 663`).
  - c6: none found (searched `row 825`, `List.fss:179`).
- Checks: no finding. Scout: tests found; `List.fss:179` is the cast line; rows 663, 825 CONTESTED and 716 NEGATIVE-VERIFIED agree, contested stated. Stale lists for F-114 that its examples may now pass by F-228's join, unsettled.
- Shape: one subject, with F-228's rule repeated (c2, c3). Title: an F-bounded parameter is left open; the body serves it.
~~~

### F-144
- The map's line: F-144 · split: keeps "walk: reduction instantiation" (owner F-228) · parts: "the library: reductions, their identities and static arguments" (1, 4) to F-59 · out: detail 7 · defects: row 665 (3) · check: a row's status disagrees.
- Shape: several subjects. Disposition: split.
- Subjects of its claims: L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 1, 4); W-reduce "walk: reduction instantiation", owner F-228 (claims 2, 3, 5, 6, 7, 8, 9).
- A part goes to another entry: claims 1, 4, subject "the library: reductions, their identities and static arguments", owner F-59, to F-59 (in this chunk).
- Claims to move out of the entry, by kind: detail 7; tests 8.
- Defect: claim 3, ledger row 665.
- Today's checks: a ledger row's status disagrees.
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-59 (in this chunk), F-60 (in this chunk), F-81 (not in this chunk, chunk arrays), F-85 (in this chunk), F-159 (not in this chunk, chunk arrays), F-220 (in this chunk), F-221 (in this chunk), F-228 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-285 (in this chunk), F-364 (in this chunk).
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-55 (in this chunk), F-114 (in this chunk), F-131 (not in this chunk, chunk integers), F-137 (in this chunk), F-141 (in this chunk), F-143 (in this chunk), F-170 (not in this chunk, chunk arrays), F-221 (in this chunk), F-228 (in this chunk), F-344 (in this chunk).
- Its claims, from claims-landed-1.md, word for word:

~~~
## F-144, "The identity-less reductions are typed at their element type"

- Claims:
  - c1 · property · the library: identity-less reductions · `AssociativeReduction[\R\]` lifts to `Maybe[\R\]`, and its `simpleJoin` and every `lift` take `R`.
  - c2 · property · walk: identity-less reductions · Walk refuses at load a reduction extending `AssociativeReduction` whose `simpleJoin` is at `Any`.
  - c3 · defect · walk: identity-less reductions · One with static parameters escapes that check and stops at its first join (row 665).
  - c4 · property · the library: identity-less reductions · A static argument that names the lifted type is `Maybe[\R\]`; with `AnyMaybe` the program stops under walk.
  - c5 · property · walk: identity-less reductions · With the element type unwritten, `BIG MINMAX` and the four tuple forms run under walk.
  - c6 · pointer · · A plain-bounded monoid operator with no static argument is instantiated as F-228 says, so `List`'s `BIG CONCAT` runs.
  - c7 · detail · walk: identity-less reductions · `BIG SQCUP` and `BIG SQCAP` ran in one measurement each with no test; `PrefixSet`'s `BIG UNION` and `PureList`'s `BIG CONCAT` were not measured.
  - c8 · tests · walk: identity-less reductions · Gated by `UnwrittenBigMinMaxWalk`, `UnwrittenTupleMinMaxWalk`, `UnwrittenBigOperatorsWalk`, `UnwrittenComprehensionElementsWalk`, `ReductionSimpleJoinAtAnyWalk`.
  - c9 · pointer · · Detail in `rung-reduction-types` and `rung-walk-elements` reports.
- Overlap:
  - c1: F-85 ("how the reductions without an identity are typed at their element type (row 628)"); the skill (revival-changes.md:130). Searched `AssociativeReduction`, `simpleJoin`, `identity`.
  - c2: none found (searched `simpleJoin`, `ReductionSimpleJoinAtAny`).
  - c3: F-145 (row 665: generic objects skip the cover check). Searched `row 665`.
  - c4: none found (searched `AnyMaybe`: F-44 names it for another subject).
  - c5: none found (searched `BIG MINMAX`, `MIN_MAX`).
- Checks: stale: "row 665's text is about the load check of an inherited abstract method that 'skips generic objects'; the entry cites it for a reduction with static parameters that 'stops at its first join'. Kind: a ledger row's status disagrees. Source: scout-landed-1.md, F-144, Exists."
- Shape: several subjects (the library: identity-less reductions; walk: identity-less reductions). Title: the reductions are typed at the element type; the body serves it.
~~~

### F-228
- The map's line: F-228 · split: keeps "walk: reduction instantiation" (owner) · parts: "the library: reductions, their identities and static arguments" (6) to F-59 · out: history 7 · defects: row 716 (8); row 717 (9); rows 510, 705 (10).
- Shape: one subject. Disposition: split.
- Subjects of its claims: W-reduce "walk: reduction instantiation", owner F-228 (claims 1, 2, 3, 4, 5, 7, 8, 9, 10, 11, 12); L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 6).
- A part goes to another entry: claim 6, subject "the library: reductions, their identities and static arguments", owner F-59, to F-59 (in this chunk).
- Claims to move out of the entry, by kind: history 7; tests 11.
- Defect: claim 8, ledger row 716.
- Defect: claim 9, ledger row 717.
- Defect: claim 10, ledger rows 510, 705.
- Group of overlap O36, "Reductions' static arguments and identities": SUM's identity from its static argument, the written arguments, the casts at the fallbacks; with F-57 (not in this chunk, chunk numerals), F-58 (not in this chunk, chunk runtime), F-59 (in this chunk), F-60 (in this chunk), F-81 (not in this chunk, chunk arrays), F-85 (in this chunk), F-144 (in this chunk), F-159 (not in this chunk, chunk arrays), F-220 (in this chunk), F-221 (in this chunk), F-229 (not in this chunk, chunk arrays), F-264 (not in this chunk, chunk arrays), F-285 (in this chunk), F-364 (in this chunk).
- Group of overlap O37, "Reduction instantiation under walk": the declared type, the join, the bound and the open F-bound (rows 510, 705, 716, 717); with F-55 (in this chunk), F-114 (in this chunk), F-131 (not in this chunk, chunk integers), F-137 (in this chunk), F-141 (in this chunk), F-143 (in this chunk), F-144 (in this chunk), F-170 (not in this chunk, chunk arrays), F-221 (in this chunk), F-344 (in this chunk).
- Sent here by the map: claims 9, 10 of F-131 (not in this chunk, chunk integers), subject "walk: reduction instantiation", owner F-228.
- Its claims, from claims-landed-2.md, word for word:

~~~
## F-228, "Under walk, a reduction or a comprehension that writes no static argument instantiates its big operator"

- Claims:
  - c1 · property · walk: reduction instantiation · Under walk a reduction or comprehension with no static argument instantiates its big operator by a declared type, else its elements' join, else its bound, an F-bounded parameter staying open.
  - c2 · pointer · · It builds P-48.
  - c3 · property · walk: reduction instantiation · The declared type is a local variable's or a function's declared return type, also where the clause form ends a block; eight other contexts do not direct it.
  - c4 · property · walk: reduction instantiation · Otherwise the clauses run once into `__elemsOf`, which keeps the elements in order at their join, and the reduction runs over them, each body once.
  - c5 · property · walk: reduction instantiation · A type or join that does not fit falls back to the bound, or open for an F-bound (F-143), so a `SUM` of `ZZ32` and `RR64` runs each `+` at its operands' types.
  - c6 · property · the library: big operator bodies · So instantiated, the library types `__bigOperator`'s local `body(i: I)` at the element type `I`.
  - c7 · history · walk: reduction instantiation · A big operator whose declared result is a trait of its own is read through the trait it extends (row 718, fixed).
  - c8 · defect · walk: reduction instantiation · An empty clause form that no declared type directs takes its bound or stays open (row 716).
  - c9 · defect · walk: reduction instantiation · A comprehension that no declared type reaches is built at its elements' join, which a declared `List[\Shape\]` of `Circle`s refuses (row 717).
  - c10 · defect · walk: reduction instantiation · A clause form that is a call's argument gets no declared type (rows 510, 705).
  - c11 · tests · walk: reduction instantiation · Gated by seven tests, `UnwrittenListMapComprehensionWalk` to `UserBigOperatorResultTraitWalk`.
  - c12 · pointer · · Detail in `rung-walk-elements/REPORT.md` (decision 6) and `rung-walk-overload-if/REPORT.md`.
- Overlap:
  - c1: F-141 ("A reduction or comprehension that writes no static argument fixes its big operator's parameter by the declared type of its value, else by its elements' join (F-228)"), F-143, F-144, the skill (SKILL.md and revival-changes.md:122). Searched `reduction or comprehension`, `join of`, `elements' join`.
  - c3: the skill (revival-changes.md:122). Searched `declared return type`.
  - c4: none found (searched `__elemsOf`).
  - c5: F-143 (open F-bound reaches only these cases). Searched `F-bound`.
  - c6: none found (searched `__bigOperator`: F-85 names `__bigOperator2`'s fused branch, another subject).
  - c8: F-143 ("an empty `SUM` or `PROD` that no declared type directs, which takes `ZZ32`'s identity", row 716). Searched `row 716`.
  - c9: none found (searched `row 717`).
  - c10: F-137 (row 510), F-221 ("Walk gives such an argument no expected type (row 705)"), F-55 (row 510). Searched `row 510`, `row 705`.
- Checks: no finding. Scout: tests found; rows 510, 705, 716, 717 agree, 718 FIXED agrees.
- Shape: one subject (walk: reduction instantiation). Title: the three-step instantiation; the body serves it.
~~~

### F-248
- The map's line: F-248 · merged into F-242: a probe of the generic distribute beside F-242's fusion pairs · out: history 4 · defects: row 21 (3); row 744 (5).
- Shape: mostly history or plan. Disposition: merged. Merged into F-242 (in this chunk): a probe of the generic distribute beside F-242's fusion pairs.
- Subjects of its claims: L-reduce "the library: reductions, their identities and static arguments", owner F-59 (claims 1, 2, 5, 6); W-domains "walk: dispatch on declared domains", owner F-26 (claims 3, 4).
- Claims to move out of the entry, by kind: history 4.
- Defect: claim 3, ledger row 21.
- Defect: claim 5, ledger row 744.
- Group of overlap O49, "Fusion and the generic distribute": the fusion pairs, the method condition, the casts at the fallbacks; with F-85 (in this chunk), F-242 (in this chunk), F-243 (in this chunk), F-250 (not in this chunk, chunk comprises), F-253 (not in this chunk, chunk overloading).
- Group of overlap O78, "Walk's dispatch and inference for generic methods": rows 1134, 21, 744; with F-26 (not in this chunk, chunk overloading), F-137 (in this chunk), F-141 (in this chunk), F-253 (not in this chunk, chunk overloading), F-405 (not in this chunk, chunk overloading).
- Its claims, from claims-landed-2.md, word for word:

~~~
## F-248, "Under walk, the team's generic `distribute` over `K`, with the `Any` method gone, keeps every fused answer"

- Claims:
  - c1 · property · the library: generic distribute · Under walk the team's generic `distribute` over `K`, the `Any` method gone, keeps every fused answer.
  - c2 · property · the library: generic distribute · `GeneratorDeclarations` and microGPT's quick pair keep their answers, and `MAX`/`MIN` over `SUM` and `SUM` over `PROD` still fuse.
  - c3 · defect · walk: generic method inference · A `SUM` of `SUM`s over a generator of generators stops without walk's inference of a generic method's static arguments (row 21).
  - c4 · history · walk: generic method inference · With that inference, on the tree that holds both, `NestedReductionFusion`'s `SUM` of `SUM`s is 11.
  - c5 · defect · the library: generic distribute · The team's explicit `r.distribute[\L1\](q)` stops every fused pair (row 744).
  - c6 · pointer · · Detail in `perf-probes/generic-distribute/REPORT.md` section 5.
- Overlap:
  - c1, c2: F-242 (`ActualReduction`'s generic `distribute`, clearing the fusion pairs' errors), F-243, F-250 (the library edits of the generic `distribute`), F-85 (`GeneratorDeclarations` and `NestedReductionFusion` run the arm fused). Searched `distribute`, `fus`.
  - c3: F-253 ("This inference lets the team's generic `distribute` over `K` run nested reductions under walk (F-248)"); F-20 cites row 21 for "Cannot unify". Searched `row 21`, `NestedReductionFusion`.
  - c5: F-405 (row 744, for another subject). Searched `row 744`.
- Checks: no finding. Scout: no "Gated by" list; `GeneratorDeclarations.fss`, `NestedReductionFusion.fss` and the quick pair found; row 744 agrees. Row 21 is stated as open in c3 while c4 says the tree holds the inference (F-253); the scout did not check row 21.
- Shape: mostly history or plan (a probe's result), with two subjects (the library: generic distribute; walk: generic method inference). Title: the generic `distribute` keeps every fused answer; the body serves it, but c3 depends on F-253's later inference.
~~~

### F-367
- The map's line: F-367 · rewritten in place: "walk: a generic function as a value" (owner) · out: detail 10 · defects: row 1021 (5); row 1019 (7); row 1018 (8); row 1020 (9).
- Shape: one subject. Disposition: rewritten.
- Subjects of its claims: W-genval "walk: a generic function as a value", owner F-367 (claims 1, 2, 3, 4, 6, 7, 8, 10, 11, 12); C-expected "the checker: the expected type", owner F-87 (claims 5); G-local "the code generator: local functions", owner F-320 (claims 9).
- Claims to move out of the entry, by kind: detail 10; tests 11.
- Defect: claim 5, ledger row 1021.
- Defect: claim 7, ledger row 1019.
- Defect: claim 8, ledger row 1018.
- Defect: claim 9, ledger row 1020.
- Group of overlap O67, "A generic function as a value": the arrow type that receives it, on each path; with F-365 (in this chunk).
- Its claims, from claims-landed-3.md, word for word:

~~~
## F-367 "Under walk a generic function is a value, received at the arrow type of its parameter or variable"

Claims:
1. Under walk a function with static parameters has a type of its own as a value (`FTypeGenericArrow`), below `Any` and below each arrow type it can be received at — walk: generic function as a value — property
2. A parameter, a local variable declared with an arrow type, and a variable of arrow type at an assignment receive the instance that a direct call with arguments of the arrow's domain types runs — walk: generic function as a value — property
3. A generic callee's static parameters are fixed by its other arguments first, so `rows(rmsn, x)` runs with a sized `rmsn` — walk: generic function as a value — property
4. Where the arrow type leaves a static parameter open, and at `Any`, a type parameter or an untyped place, the value stays generic and each application infers its static arguments — walk: generic function as a value — property
5. The compiled checker refuses those open forms (row 1021) — the checker: generic function as a value — defect (row 1021)
6. An overloaded name keeps its whole overload set as a value, with its generic overloads, so `pick(twice)` runs the `pick` declared over an arrow type, not `pick(x: Any)`; no test pins this — walk: generic function as a value — property
7. An immutable top-level variable keeps the generic value (row 1019) — walk: generic function as a value — defect (row 1019)
8. A callee's type parameter fixed only by a value's run-time type refuses the function (row 1018) — walk: generic function as a value — defect (row 1018)
9. A function declared in a block with static parameters of its own does not run under walk, called or passed (row 1020) — walk: local generic functions — defect (row 1020)
10. Source names `Fcn.received`, `EvaluatorBase.instanceReceivedAt`, `OverloadedFunction.java:3067` — walk: generic function as a value — detail
11. Tests: three walk tests — walk: generic function as a value — tests
12. Detail in `rung-generic-function-value/REPORT.md` — walk: generic function as a value — pointer

Overlap:
- 1 to 4, 6: F-365 (the checker's side: "instantiates a reference to a generic function by the arrow type that receives it"). Searched [GenericFunction], [FTypeGenericArrow], [generic function … value], [instanceReceivedAt]. Skill: `interpreter.md:16`.
- 5: F-365 (its own refusals, `XXXGenericFunctionAsValueOpen`). Searched [row 1021].
- 7, 8, 9: none found. Searched [row 1018], [row 1019], [row 1020].

Checks: sound as checked; rows 1018 to 1021 NEGATIVE-VERIFIED agree.

Shape: one subject (walk: generic function as a value), with four gaps, one of them the checker's.
Title: a generic function as a value under walk, received at an arrow type; the body serves it.
~~~

### F-173
- The map's line: F-173 · rewritten in place: "the specification: type inference" (owner) · defects: row 442 (7); row 587 (8).
- Shape: several subjects. Disposition: rewritten.
- Subjects of its claims: S-infer "the specification: type inference", owner F-173 (claims 1, 2, 3, 4, 5, 6, 9, 10); C-infer "the checker: static-argument inference", owner F-73 (claims 7); W-infer "walk: static-argument inference", owner F-141 (claims 8).
- Claims to move out of the entry, by kind: tests 9.
- Defect: claim 7, ledger row 442.
- Defect: claim 8, ledger row 587.
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-55 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-271 (in this chunk), F-273 (in this chunk).
- Sent here by the map: claim 2 of F-266 (not in this chunk, chunk export), subject "the specification: type inference", owner F-173.
- Its claims, from claims-spec.md, word for word:

~~~
## F-173 "The specification's type-inference chapter states the rule that the compiled checker builds"

Claims:
1. The type-inference chapter states the rule that the compiled checker builds: the declaration is chosen first, then its static arguments are inferred — the specification: type inference — property
2. It states P-46, P-48 and P-49 — the specification: type inference — pointer
3. A type parameter that a parameter's type mentions inside another type is fixed by the argument at that position — the specification: type inference — property
4. One that is the whole declared type of one or more parameters, and that nothing else fixes, takes the narrowest type within its bounds that every such argument has or converts into: `ZZ64` for a `ZZ32` and an `NN32` — the specification: type inference — property
5. Where there is none and no numeral settles the tie, it takes its bound, narrowed by the expected type's need of the return type (P-48); so does a type parameter that nothing fixes — the specification: type inference — property
6. Inference never gives a type parameter `BottomType` — the specification: type inference — property
7. The compiled prelude lacks the coercion of `NN32` into `ZZ64`, so a `ZZ32` and an `NN32` instantiate at `ZZ`; no callout names this (row 442, `XXXInferPromoteNN32`) — the checker: type inference — defect (row 442)
8. The callouts at `inference.tex:285-347` and `:448-512` give walk's departures, such as the return type `BottomType` of a function expression that declares none (row 587) — walk: type inference — defect (row 587)
9. Plain tests gate the bound rule for a lone type parameter on both paths: `InferLone*` — the specification: type inference — tests
10. Detail in `rung-instance-bound/REPORT.md` and `inference.tex:45-125` — the specification: type inference — pointer

Overlap:
- 1, 3, 4, 5: F-55 ("a mixed-width call takes the narrowest type into which its arguments convert, as P-74 decides"); F-73 ("takes the narrowest type that every one of its arguments converts into and its bound"); F-78 (the checker instantiates at the intersection of upper bounds, never `BottomType`); F-137, F-141 (walk's inference). Searched [narrowest type], [P-46], [InferLone].
- 6: F-78 ("never `BottomType`"). Searched [BottomType].
- 7: F-138 ("Compiled, `NN32` with `ZZ32` or `ZZ64` answers `ZZ` (row 442)"). Searched [row 442], [XXXInferPromoteNN32].
- 8: F-141 ("which takes `Bottom` (row 587)"). Searched [row 587].
- Skill: `revival-changes.md:68`.

Checks: sound as checked; rows 442 and 587 NEGATIVE-VERIFIED agree.

Shape: several subjects (the specification: type inference; the checker: type inference; walk: type inference).
Title: the inference chapter states the checker's rule; claims 1 to 6 serve it, claims 7 and 8 list departures held also in F-138 and F-141.
~~~

### F-271
- The map's line: F-271 · stays as it is: "the repository: the type group's papers" (owner).
- Shape: one subject. Disposition: stays.
- Subjects of its claims: P-papers "the repository: the type group's papers", owner F-271 (claims 1, 2, 3, 4, 5, 6).
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-55 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-173 (in this chunk), F-273 (in this chunk).
- Group of overlap O92, "The POPL 2019 paper": P-48's instance rule; with F-166 (not in this chunk, chunk harness), F-273 (in this chunk), F-300 (in this chunk).
- Sent here by the map: claim 4 of F-359 (not in this chunk, chunk integers), subject "the repository: the type group's papers", owner F-271.
- Its claims, from claims-spec.md, word for word:

~~~
## F-271 "The type group's POPL 2019 paper gives P-48's instance rule, and its soundness proof does not cover the library's F-bounded functions"

Claims:
1. The type group's POPL 2019 paper gives P-48's instance rule: a type parameter that a call's arguments do not fix takes the intersection of its upper bounds — the repository: the type group's papers — property
2. The paper is later than both the specification and the team's restart (F-166) — the repository: the type group's papers — property
3. Its calculus does not let a method type parameter occur in an upper bound, so F-bounded method parameters, as in `SUM` and `BIG MAX`, are outside its soundness proof — the repository: the type group's papers — property
4. It also leaves out top-level functions and functional methods, among other limits — the repository: the type group's papers — property
5. `reviews/decisions-review/popl-recheck.md` checks the curator's decisions against the paper — the repository: the type group's papers — pointer
6. Detail in `ParkPOPL2019-extract.md` sections 6 and 8 — the repository: the type group's papers — pointer

Overlap:
- 1: F-78 (the checker instantiates at the intersection of upper bounds); F-84 ("P-48 gives it the intersection of its upper bounds"); F-273 (the specification's run-time instance by the paper's rule). Searched [POPL 2019], [intersection of its upper bounds].
- 2: F-166 ("The type group's POPL 2019 paper is later than both (F-271)"). Searched [POPL 2019].
- 3: F-141, F-228 ("An F-bounded parameter stays open" under walk). Searched [F-bounded].
- 4: none found. Searched [functional methods] with [paper], [calculus].

Checks: sound as checked.

Shape: one subject (the repository: the type group's papers).
Title: the paper gives P-48's rule, and its proof does not cover F-bounded functions; the body serves both halves.
~~~

### F-273
- The map's line: F-273 · split: keeps "the specification: type inference" (owner F-173) · parts: "walk: static-argument inference" (6) to F-141 · defects: row 538 (7); row 496 (8).
- Shape: several subjects. Disposition: split.
- Subjects of its claims: S-infer "the specification: type inference", owner F-173 (claims 1, 2, 3, 4, 5, 9); W-infer "walk: static-argument inference", owner F-141 (claims 6); G-tmpl "the code generator: template dispatchers and generic arms", owner F-136 (claims 7, 8).
- A part goes to another entry: claim 6, subject "walk: static-argument inference", owner F-141, to F-141 (in this chunk).
- Defect: claim 7, ledger row 538.
- Defect: claim 8, ledger row 496.
- Group of overlap O30, "Inference with coercion and the instance at the bounds": P-48's instance, the intersection of the bounds, rows 388, 507, 510, 511, 559, 587; with F-51 (in this chunk), F-55 (in this chunk), F-73 (in this chunk), F-76 (not in this chunk, chunk overloading), F-78 (in this chunk), F-84 (not in this chunk, chunk arrays), F-92 (not in this chunk, chunk arrays), F-136 (not in this chunk, chunk sizes), F-137 (in this chunk), F-138 (not in this chunk, chunk integers), F-141 (in this chunk), F-143 (in this chunk), F-173 (in this chunk), F-271 (in this chunk).
- Group of overlap O75, "Template dispatchers": an arm called at the dispatcher (row 496); with F-45 (not in this chunk, chunk comprises), F-136 (not in this chunk, chunk sizes).
- Group of overlap O92, "The POPL 2019 paper": P-48's instance rule; with F-166 (not in this chunk, chunk harness), F-271 (in this chunk), F-300 (in this chunk).
- Its claims, from claims-spec.md, word for word:

~~~
## F-273 "The specification gives the run-time instance of a generic declaration that dispatch reaches, and that the static call did not select, by the POPL 2019 paper's rule"

Claims:
1. The specification gives the run-time instance of a generic declaration that dispatch reaches, and that the static call did not select, by the POPL 2019 paper's rule — the specification: type inference — property
2. It builds P-48 — the specification: type inference — pointer
3. A declaration that the static call selected runs at the instance inferred for the call (F-173) — the specification: type inference — pointer
4. Where an argument's value fixes a type parameter, as a value of `Tag[\X\]` fixes `X`, the rule and both paths agree — the specification: type inference — property
5. Where a type parameter is a parameter's whole type, the argument's run-time type only bounds it from below; the rule gives it its declared bound, narrowed by the call's static type's need of the return type — the specification: type inference — property
6. The dispatch paragraph's callout says both paths take the argument's run-time type there instead; walk always will, having no static types (P-48) — walk: run-time instance of generics — property
7. The compiled path does so because its dispatcher is not given the call's static type (row 538, `XXXGenericInstanceUnfixed`) — the code generator: run-time instance of generics — defect (row 538)
8. The compiled path does not yet run the paragraph's second example, a generic declaration beside a plain one, reached through an argument of static type `Any` (row 496) — the code generator: run-time instance of generics — defect (row 496)
9. Detail: `overloading.tex:312-349`, and `rung-spec-overloading/decision-record.md` sections 5 and 6 — the specification: type inference — pointer

Overlap:
- 1, 4, 5: F-173 (the declaration the static call selected); F-271 (the paper's instance rule); F-55 ("walk from their run-time types"). Searched [dispatch reaches], [run-time type only bounds], [POPL 2019].
- 6: F-55, F-137, F-141 (walk's inference from run-time types). Searched [run-time type].
- 7: none found. Searched [row 538], [XXXGenericInstanceUnfixed].
- 8: F-136 ("through an argument of static type `Any` at a program's object (row 496), still die with `ClassCastException`"). Searched [row 496].

Checks: sound as checked; rows 538 and 496 NEGATIVE-VERIFIED agree.

Shape: several subjects (the specification: type inference; walk: run-time instance of generics; the code generator: run-time instance of generics).
Title: the specification's run-time instance by the paper's rule; claims 1 to 5 serve it, claims 6 to 8 give each path's departure.
~~~

### F-300
- The map's line: F-300 · not about the tree: `Papers/Variance/README.md` holds the detail.
- Shape: not about the tree. Disposition: not about the tree.
- Subjects of its claims: P-papers "the repository: the type group's papers", owner F-271 (claims 1, 2, 3, 4, 5, 6).
- Group of overlap O92, "The POPL 2019 paper": P-48's instance rule; with F-166 (not in this chunk, chunk harness), F-271 (in this chunk), F-273 (in this chunk).
- Its claims, from claims-spec.md, word for word:

~~~
## F-300 "The type group's POPL 2019 paper, its technical report and the report's LaTeX sources are in `Papers/Variance/`"

Claims:
1. The POPL 2019 paper, its technical report and the report's LaTeX sources are in `Papers/Variance/` — the repository: the type group's papers — property
2. The paper (Park, Hong, Steele and Ryu, doi:10.1145/3290324) is `3290324-popl19w.pdf`, under the CC BY-NC 4.0 licence that its first page prints — the repository: the type group's papers — property
3. The technical report, with the formalization in its appendices, is `3290324-popl19-TR.pdf`; the report and its sources are included with Sukyoung Ryu's permission, and the report prints no licence — the repository: the type group's papers — property
4. ACM's `acmart.cls` and `ACM-Reference-Format.bst` there carry ACM's own terms — the repository: the type group's papers — property
5. The working notes on the paper, its full text and its talk's transcript stay in `research/extracts/` — the repository: the type group's papers — property
6. Read in the tree; detail in `Papers/Variance/README.md`, "Permission and licence" — the repository: the type group's papers — pointer

Overlap:
- 1 to 5: none found. Searched [Papers/Variance], [licence], [license] (F-46 hit: "licenses that identification", unrelated).

Checks: sound as checked: every named file found.

Shape: about how the project works and not about the tree's code: one subject (the repository: the type group's papers).
Title: where the paper, report and sources are; the body serves it, with their licences.
~~~


<!-- An audit, read only, of the tests that climb batch 32 added (2026-11-16, by a Fable worker at the curator's question whether the batch's workers kept to the testing procedure): each of its 50 tests judged needed, a repeat, too weak or wrong, against its rung's report and the gap ledger, with a sample of 20 of climb batch 29's tests judged the same way. -->

# Audit of the tests that climb batch 32 added

Read only: no build and no test was run. The trees read are `567c36dadc` (batch 32, base `db352c1776`) and `7daf51fe8a` (batch 29, base `f56d6516c4`).

## The answer

- The workers and skeptics of batch 32 kept to the testing procedure. I found no test written to raise a count.
- A "test" here is one walk program under `ProjectFortress/tests/` (with its `.test` file if it has one), or one compiled `.test` file with the programs it names. A run-time pair (a plain `...Link.test` and an `XXX...test` over one program) is one test.
- By that unit batch 32 added 50 tests: 26 walk and 24 compiled. My file counts differ from the brief's: 28 `.test` files under `compiler_tests/` (12 with `XXX`) and 5 under `tests/`, not 44 and 25.
- Verdicts for batch 32: 48 needed (96%), 2 repeat another test (4%), 0 assert too little, 0 wrong.
- Verdicts for the batch 29 sample: 20 needed of 20 (100%).
- The two repeats:
  - `compiler_tests/XXXSuperscriptAfterCallRefusedCompiled.test` (rung S's worker) repeats the team's `compiler_tests/XXX1al.test`. Both pin the checker's refusal of a call followed directly by a superscript, with the same message. The new one passed on the base's code.
  - `tests/XXXInitializerCallReadsLaterMutableWalk.fss` (rung D's worker, row 1027) repeats `tests/XXXTopLevelVarForwardRead.fss` (rung B's worker, row 1023). Both fail with the same message, and row 1023's notes give one cause that covers both. The two workers ran in separate worktrees and could not see each other's test. The gather saw the kinship and kept both.
- Of the 84 tests that the gate gained, 73 are the batch's: its 28 compiled `.test` files make 47 JUnit cases (a case is one `compile`, `link` or `run` command), and its 26 walk programs make 26. The other 11 are compiled cases from commits between the batch 30 gate and the base (11 `.test` files, the numeral tests). I did not check those 11.
- Three kinds of test make the count look larger than the changes. Each is the procedure's own form:
  - 20 are `XXX` expected failures. An `XXX` expected failure is a test that asserts the specification's answer and fails today; it pins an open defect. Each of the 20 has its own ledger row (rows 1005 to 1031), one to one.
  - 5 are right refusals in the compiled folder's form: an `XXX`-named `.test` over a plain-named program, green when the compile fails with the named message. They are not expected failures.
  - 7 compiled tests are the twin of a walk test (tests 3, 4, 8, 9, 10, 22 and 23 below). Walk and the compiled path share no code after the phases, so I did not count a twin on the other path as a repeat.
- Test first: every rung's report quotes the failing run on the base's code before the first build, and each skeptic confirmed it from the worker's transcript. The journal's `recordedFailure` field holds the same run for all seven workers, and `failureWasRecorded` is true for all seven skeptics.
- Three plain tests have no failing run because they guard behaviour that the base already had: `tests/SuperscriptAfterCallRefused`, `compiler_tests/SuperscriptAfterParenthesisedCallCompiled` and the repeat `XXXSuperscriptAfterCallRefusedCompiled`. The batch's plan asked for the first two (`explorations/coordinator/CLIMB-BATCH-32.md:521`). The procedure allows a guard.

### Did the practice change against batch 29?

- In purpose: no difference that I can find. Both batches write one test per repaired row, one `XXX` test per deferred defect with its row, and show the first `XXX` test red once.
- In who writes: the same. In batch 32 the skeptics wrote 16 of the 50 tests (5 plain for their own fixes, 11 `XXX` for defects their programs met). In the batch 29 sample the skeptics or the gather wrote 8 of 20.
- In kind: batch 32 has more expected failures, 20 of 50 (40%), against 7 of 20 (35%) in the sample. Each is a real defect with a row, so this is more defects recorded, not padding. Rung D alone has 6 of the 20, rung B 4.
- In form, two differences, both of the workers and both in how a test is written, not in what it asserts:
  - Comment lines. In six of the seven rungs of batch 32 the skeptic found tests with more than one comment line and cut them to one (RECORD.md of batch 32, the skeptics' commits). The batch 29 record holds no such finding.
  - A copied header. Seven of rung S's new programs start with the team's notice "Copyright 2012, Oracle and/or its affiliates". They were written in 2026. No test that batch 29 added has it. The skeptic did not flag it.
- Both repeats are the workers'. No skeptic's test repeats another.

### What reading could not settle

- Whether rows 1014 and 1030 are one defect. `XXXNumeralEndsBlockAfterDeclarationCompiled` (rung C's skeptic) and `XXXBlockEndsInTupleOfNumeralCompiled` (rung D's skeptic) both die with `NoClassDefFoundError: fortress/CompilerBuiltin$v` at a numeral that ends a block. The rows' controls differ, and neither row names the other. I counted both as needed.
- Whether a fix of row 1023 also turns row 1027's test red. I judged it a repeat from row 1023's notes; only a run of the fix proves it.
- Whether `tests/GenericFunctionRowLiftWalk.fss` exercises code that `GenericFunctionAsValueWalk`'s `appNM` case does not. Both pass a function generic in a size to a callee generic in two sizes. It is the model program's form, so I counted it needed.
- Whether each `XXX` program fails for its row's reason. I matched the row's quoted message against the test's key and the skeptic's quoted run; I ran nothing.
- The 40 tests of batch 29 outside the sample.
- Not a test verdict, but seen: rung C recorded four deferred defects as a ledger row only (rows 1007, 1009, 1010, 1011; `rung-static-argument-inferred/REPORT.md:221-225`), and rows 1012 and 1015 likewise. For rows 1009 and 1010 the report's reason is that the refusal or crash is today's answer; the procedure's third way asks for a test of today's behaviour where one can pass.

## Each test of batch 32

Paths: `tests/` and `compiler_tests/` are under `ProjectFortress/`; `rung-.../` is under `explorations/compile-ladder/`; "ledger" is `explorations/fortress-gap-ledger.md`. "Failed on the base" means the report quotes the harness's failing run on the base's code before the edit was built.

### Rung P, `rung-parser-declarations` (rows 133 and 5)

1. `tests/ApiPostfixExponentOp.fss` (worker). Needed. Asserts five values of a postfix exponent operator declared in an api (`:8-15`). Row 133. Failed on the base: `Syntax Error` in the api (`rung-parser-declarations/REPORT.md:25-33`). No earlier test declares such an operator in an api (search of `.fsi` files in the test folders).
2. `tests/SumSignAccumulator.fss` (worker). Needed. Asserts 25 values of reductions and declarations written with the signs U+2211 and U+220F (`:18-45`). Row 5. Failed on the base (`REPORT.md:25-33`). The only earlier file with the sign is `tests/NativeHelperWriterWalk.fss`, not a reduction.
3. `compiler_tests/ApiPostfixExponentOpCompiled.test` (worker). Needed. The compiled path of test 1, three values (`.fss:8-12`). Failed on the base, 6 of 6 cases (`REPORT.md:35-44`).
4. `compiler_tests/SumSignAccumulatorCompiled.test` (worker). Needed. The compiled path of test 2, eleven values (`.fss:15-26`). Failed on the base (`REPORT.md:35-44`).

### Rung S, `rung-superscript-after` (rows 84 and 158)

5. `tests/SuperscriptAfterDottedAccess.fss` (worker). Needed. Eighteen values of a superscript after a dotted access (`:42-60`). Row 84. Failed before the grammar edit (`rung-superscript-after/REPORT.md:28-33`). No earlier test has the form (search for `.name^`).
6. `tests/SuperscriptAfterParenthesisedCall.fss` (worker). Needed. Six values (`:24-29`). Row 158. Failed on the base (`REPORT.md:19-26`).
7. `tests/SuperscriptAfterCallRefused.fss` with `.test` (worker). Needed, as a guard. Pins walk's refusal of `f(3)^T` (`.fss:21`, `.test:1`), the check that the rung's walk edit sits beside. It passed on the base (`REPORT.md:25`), as the plan asked (`CLIMB-BATCH-32.md:521`). No earlier test holds that message.
8. `compiler_tests/SuperscriptAfterDottedAccessCompiled.test` (worker). Needed. The compiled path of test 5. Failed on the base (`REPORT.md:35-42`).
9. `compiler_tests/SuperscriptAfterParenthesisedCallCompiled.test` (worker). Needed, as a guard. The compiled values that walk must now equal. It passed on the base (`REPORT.md:44`); the plan asked for it. No earlier compiled test asserts `(f(x))^T` or `(f(x))!`.
10. `compiler_tests/XXXSuperscriptAfterCallRefusedCompiled.test` over `SuperscriptAfterCallRefusedCompiled.fss` (worker). Repeats `compiler_tests/XXX1al.test`. The team's test refuses `f(a)^b` (`Compiled1.al.fss:15`) with 'Item at this location must be an expression, not an operator.'; the new one refuses `f(3)^T` (`.fss:21`) with the same message (`.test:3`). It passed on the base (`REPORT.md:44`), and the rung changed nothing in the checker. The report names another test as its model, not `XXX1al` (`REPORT.md:64`).
11. `compiler_tests/XXXSubscriptThenSuperscriptCompiled.test` (worker). Needed. Expected failure, row 1005: `x[5]^2` stops the checker, '** bug! Result of typechecking still contains intermediate nodes' (`.test:3`, the row's message). No earlier test holds that message.
12. `tests/XXXPostfixAfterExponentiation.fss` (skeptic). Needed. Expected failure, row 1006: `n^2!` and `n^T!` are refused under walk (`:12-13`). Shown green on the base and the head, and red when respelled (`rung-superscript-after/SKEPTIC.md`, finding 2).

### Rung C, `rung-static-argument-inferred` (rows 731 and 758)

13. `compiler_tests/InferBigOperatorSelfBound.test` (worker). Needed. Five values and, for each, the type the reduction ran at (`.fss:33-54`). Row 731. Failed on the base (`rung-static-argument-inferred/REPORT.md:46-52`). The two earlier `InferBigOperator...` tests have a plain bound (`Number`, `ZZ32`), not a bound that names its own parameter.
14. `compiler_tests/GenericFunctionAsValueCompiled.test` (worker). Needed. Four values (`.fss:17-22`). Row 758. Failed on the base: 'T is not in the kind env' (`REPORT.md:54-60`).
15. `compiler_tests/XXXGenericFunctionAsValueOpenCompiled.test` over `GenericFunctionAsValueOpenCompiled.fss` (worker). Needed. A right refusal: an arrow type that leaves a static parameter open (`.fss:9`, `.test:3`). On the base it was a crash, so the test failed (`REPORT.md:54-60`). Shown red once.
16. `compiler_tests/XXXGenericFunctionAsValueUntypedCompiled.test` over `GenericFunctionAsValueUntypedCompiled.fss` (worker). Needed. A right refusal: an untyped binding, applied (`.fss:9-11`). On the base a Java error. The earlier `XXXNatUnknownSizeFnValue` differs: its name is overloaded with a declaration over `Any`, and it pins another message.
17. `compiler_tests/GenericFunctionAsValueSameNameCompiled.test` (skeptic). Needed. Three values for the skeptic's fix `804445961c` (`.fss:18-20`). Failed on the worker's head, `NoSuchMethodError` (`rung-static-argument-inferred/SKEPTIC.md:66-70`).
18. `compiler_tests/XXXFunctionalMethodValueGenericTraitCompiled.test` with `FunctionalMethodValueGenericTraitCompiledLink.test` (skeptic). Needed. Expected failure, row 1013: links and dies with `NoSuchMethodError` (`.fss:15`).
19. `compiler_tests/XXXNumeralEndsBlockAfterDeclarationCompiled.test` with its `Link.test` (skeptic). Needed. Expected failure, row 1014 (ledger `:1033`). Shown both ways (`SKEPTIC.md:82`). Possibly one defect with test 49; not settled.
20. `tests/XXXReductionDeclaredTypeMethodWalk.fss` (worker). Needed. Expected failure, row 1008 (ledger `:765`): a sum in a method declared `RR64` overflows in `ZZ32` (`:8`, `:12`). The row names four places; the test pins the method. `tests/UnwrittenReductionWalk.fss` covers a local variable and a function's return, not a method.

### Rung N, `rung-numeral-most-specific` (rows 973, 966, 975, 976, 989, 390)

21. `tests/NumeralMostSpecificWalk.fss` (worker; five assertions by the skeptic, `:52-57`). Needed. Twenty values. Rows 975 and 976 and the skeptic's fix `0af1421748`. Failed on the base (`rung-numeral-most-specific/REPORT.md:48-56`); the skeptic's five failed on the worker's head (`SKEPTIC.md:60`). No overlap with `NumeralEqualsNumberWalk`, `NotEqualNumeral` or `NumeralDispatchCacheWalk`.
22. `compiler_tests/NumeralMostSpecificCompiled.test` (worker). Needed. Ten values (`.fss:25-34`). Row 390's numeral case. Failed on the base, `NoSuchMethodError` (`REPORT.md:39-46`). Two assertions were added after the failing run as guards, and the report says so (`REPORT.md:37`).
23. `compiler_tests/NumeralTieDefaultCompiled.test` (worker). Needed. One value (`.fss:15`). Row 989. Failed on the base: 'Ambiguous coercion' (`REPORT.md:44`). The walk test asserts the same call on the other path (`NumeralMostSpecificWalk.fss:45`).
24. `tests/XXXNumeralBesideAnyWalk.fss` (worker). Needed. Expected failure, row 1016 (`:11-12`). Shown both ways (`REPORT.md:66`). The compiled test 22 asserts the same call and passes there (`.fss:29`): the other path.
25. `tests/XXXNumeralBesideTypeParameterWalk.fss` (skeptic). Needed. Expected failure, row 1017 (ledger `:690`; `:9`). The row says both paths; only walk has a test.

### Rung F, `rung-generic-function-value` (row 156)

26. `tests/GenericFunctionAsValueWalk.fss` (worker). Needed. Nineteen values (`:36-69`). Row 156's three failures. Failed on the base (`rung-generic-function-value/REPORT.md:34-42`).
27. `tests/GenericFunctionRowLiftWalk.fss` (worker). Needed. Six values (`:25-33`), the model program's form of row 156. Failed on the base (`REPORT.md:34-42`). Its mechanism is near test 26's `appNM` case (`GenericFunctionAsValueWalk.fss:48-49`); see "could not settle".
28. `tests/GenericFunctionAssignedWalk.fss` (skeptic). Needed. Five values for the skeptic's fix `4c66c28fbc` (`:20-34`). Failed on the worker's head and on the base (`rung-generic-function-value/SKEPTIC.md:34`).
29. `tests/XXXGenericFunctionAtTypeParameterWalk.fss` (worker). Needed. Expected failure, row 1018 (`:12-13`). Shown both ways (`REPORT.md:81`).
30. `tests/XXXGenericFunctionTopLevelVariableWalk.fss` with `.test` (worker). Needed. Expected failure, row 1019: the program should be refused at load and is not (`.fss:8-12`, `.test:1`).
31. `tests/XXXLocalGenericFunctionWalk.fss` (skeptic). Needed. Expected failure, row 1020: 'Missing type T' (`:8-10`). Shown both ways (`SKEPTIC.md:37`). The only earlier program of the form is `not_passing_yet/localGeneric.fss`, which no suite runs.

### Rung B, `rung-toplevel-array-literal` (row 142)

32. `tests/TopLevelArrayLiteral.fss` (worker). Needed. About thirty values over ranks 1 to 3 and five element types (`:36-84`). Row 142. Failed on the base (`rung-toplevel-array-literal/REPORT.md:28-33`). Rank 3 is asserted only as equal to the block's literal, and the report says why (`REPORT.md:62`).
33. `tests/TopLevelArrayLiteralSize.fss` with `.test` (worker). Needed. A refusal with a key that the base's message does not hold (`.test:1`; `REPORT.md:64`). Failed on the base.
34. `tests/TopLevelArrayLiteralElement.fss` with `.test` (worker). Needed. A refusal that names the element (`.test:1`); the rung's first build printed `null` there (`REPORT.md`, defect 2). Failed on the base.
35. `tests/ObjectFieldArrayLiteral.fss` (skeptic). Needed. Seven values (`:17-25`): the edit reaches an object's fields, which no test of the worker held. Failed on the base, 1 of 4 (`rung-toplevel-array-literal/SKEPTIC.md:40-44`).
36. `tests/XXXTopLevelVarForwardRead.fss` (worker). Needed. Expected failure, row 1023 (ledger `:356`; `:5-9`). Shown both ways (`REPORT.md`, defect 4). The earlier `tests/InitOrderWithMutable.fss` passes because its reader is untyped and only printed (row 1023's notes).
37. `tests/XXXBlockArrayLiteralSize.fss` with `.test` (skeptic). Needed. Expected failure, row 1022 (`.fss:6`).
38. `tests/XXXArrayLiteralLocalVar.fss` (skeptic). Needed. Expected failure, row 1024: 'Cannot assign to immutable t' (`:7-8`).
39. `tests/XXXArrayLiteralAssigned.fss` (skeptic). Needed. Expected failure, row 1025 (`:8`). `tests/XXXArrayLiteralArgRungC.fss` (row 49) is a literal with no declared type, another case.

### Rung D, `rung-tuple-binding` (rows 988 and 474)

40. `compiler_tests/TopLevelTupleBindingCompiled.test` (worker). Needed. Sixteen values, the last that the right side runs once (`.fss:26-43`). Row 988. Failed on the base (`rung-tuple-binding/REPORT.md:28-34`). The team's `tests/TupleBinding.fss` and `TupleBinding2.fss` are walk tests.
41. `compiler_tests/XXXTopLevelTupleBindingType.test` over `TopLevelTupleBindingType.fss` (worker). Needed. A right refusal: a name of an untyped tuple binding used at another type (`.fss:8`, `.test:3`). Row 474. Failed on the base on the code generator's throw (`REPORT.md:30-34`, `:64`).
42. `compiler_tests/TopLevelTupleBindingImport.test` with `TopLevelTupleBindingApi.fsi` and `.fss` (worker). Needed. Four values through an api (`.fss:7-11`). Failed on the base (`REPORT.md:36-41`).
43. `compiler_tests/TopLevelTupleBindingMixedTypes.test` (skeptic). Needed. Four values for the skeptic's fix `a29032ee89` (`.fss:14-17`). Failed on the worker's head, `VerifyError` (`rung-tuple-binding/SKEPTIC.md:60-66`).
44. `compiler_tests/XXXTopLevelTupleBindingMixedRefused.test` over `TopLevelTupleBindingMixedRefused.fss` (skeptic). Needed. A right refusal for the same fix (`.fss:5`, `.test:3`). Failed on the worker's head (`SKEPTIC.md:62-63`). The team's `XXX15c.test` refuses a tuple expression on the right side; this is a call, the case the fix adds.
45. `tests/XXXTopLevelTupleBindingOnceWalk.fss` (worker). Needed. Expected failure, row 1026: walk runs the right side three times (`:14-16`). Shown both ways (`REPORT.md`, after the defects table). Test 40 asserts the same on the compiled path, where it passes.
46. `tests/XXXInitializerCallReadsLaterMutableWalk.fss` (worker). Repeats test 36, `tests/XXXTopLevelVarForwardRead.fss`. Row 1027 (ledger `:358`) and row 1023 (ledger `:356`) quote the same message, 'Failed to find any matching overload, args = (thunk'. Row 1023's notes give the cause: a later mutable variable's cell is passed on unforced by a plain reference. Here the plain reference `counter + 1` is in a function that the initializer calls (`:5-8`); there `late + 1` is in the initializer itself. The gather reworded row 1027 against row 1023 and kept both tests (RECORD.md of batch 32, `:93`).
47. `compiler_tests/XXXTopLevelVarByAssignExport.test` with its `.fsi` and `.fss` (worker). Needed. Expected failure, row 1028: 'due to different modifiers' (`.test:3`, `.fss:4`). The team's `XXX1an.test` is a true mismatch, another case.
48. `compiler_tests/XXXLocalTupleBindingMixedTypes.test` with `LocalTupleBindingMixedTypesLink.test` (skeptic). Needed. Expected failure, row 1029: the local form of test 43, which the fix left (`.fss:9`). Shown both ways (`SKEPTIC.md:82`).
49. `compiler_tests/XXXBlockEndsInTupleOfNumeralCompiled.test` with its `Link.test` (skeptic). Needed. Expected failure, row 1030 (ledger `:361`; `.fss:5`). Possibly one defect with test 19; not settled.
50. `compiler_tests/XXXTupleBindingIfBranchesCompiled.test` (skeptic). Needed. Expected failure, row 1031: 'Error trying to close method scope' (`.test:3`, `.fss:8`). The three earlier tests with that message (`XXXTryCompareCoerceRungE`, `XXXTupleClauseSpreadRungG`, `XXXTypecaseBodyCoerceRungG`) are other constructs (rows 340, 819).

## The sample of batch 29

Every third name, in name order, of the 60 names that batch 29 added (its 26 walk programs and its 34 `.test` files). All 20 fall on different tests. Texts read at `7daf51fe8a`. All 20: needed.

1. `compiler_tests/LiteralDefaultCompiled.test` (rung C's worker). Needed. A numeral's default type at each untyped place. Failed on the base (`rung-numeral-checker/REPORT.md:47-51`).
2. `compiler_tests/NatValueZZ32Compiled.test` (rung C's worker). Needed. Two values. Failed on the base (`REPORT.md:52`).
3. `compiler_tests/XXXNumeralCoercionGenericTypeCompiled.test` with its `Link.test` (rung F's skeptic). Needed. Expected failure, row 957 (`rung-literal-fold/SKEPTIC.md:90`).
4. `compiler_tests/XXXNumeralDivByZeroCompiled.test` with its `Link.test` (rung F's worker). Needed. Expected failure, row 318; shown both ways (`rung-literal-fold/REPORT.md:137`). `tests/NumeralFoldWalk.fss:55-59` asserts the same on walk, where it passes.
5. `compiler_tests/XXXCharacterBeforeStringConcatenationCompiled.test` (rung S's worker). Needed. Expected failure, row 965; shown both ways (`rung-string-literals/REPORT.md:74`).
6. `compiler_tests/XXXLiteralTypeUnwritable.test` over `LiteralTypeUnwritable.fss` (rung C's worker). Needed. A right refusal, each line checked by a pattern. Failed on the base (`rung-numeral-checker/REPORT.md:47-49`).
7. `compiler_tests/XXXNumeralBeyondRangeInTuple.test` over `NumeralBeyondRangeInTuple.fss` (rung C's skeptic). Needed. A right refusal for the skeptic's fix `b212f67a0e`. Failed on the worker's head (`rung-numeral-checker/SKEPTIC.md:71`). The worker's `XXXNumeralBeyondZZ32Range` is a numeral alone, not in a tuple.
8. `compiler_tests/XXXNumeralTypecaseSelector.test` (rung C's skeptic). Needed. Expected failure, row 963 (`SKEPTIC.md:79`).
9. `tests/LanguageTypeRefusedBindingWalk.fss` with `.test` (rung G's worker). Needed. The message names the value's type as `ZZ32` (`rung-walk-language-types/REPORT.md:71`).
10. `tests/NatValueZZ32Walk.fss` with `.test` (rung C's worker). Needed. One value and one refusal; the walk path of sample 2.
11. `tests/NumeralAtReturnOutOfRangeWalk.fss` with `.test` (rung N's skeptic). Needed. For the skeptic's fix `953d050966`. Failed on the worker's head: 'Missing expected refusal at load' (`rung-numeral-types/SKEPTIC.md:53`). `NumeralOutOfRangeWalk` is the binding, not the return type.
12. `tests/NumeralDispatchCacheWalk.fss` (rung N's skeptic). Needed. Two values for the skeptic's fix `6408011e9b`. Failed on the worker's head (`SKEPTIC.md:52`).
13. `tests/NumeralNoCoercionRefusedWalk.fss` with `.test` (rung N's worker). Needed. A refusal. Run on the base (`rung-numeral-types/REPORT.md:45-58`).
14. `tests/NumeralOutOfRangeNN32Walk.fss` with `.test` (rung N's skeptic). Needed. For the skeptic's fix `794f7d908e`: `NN32` was looked up in the wrong table. Failed on the worker's head (`SKEPTIC.md:50`).
15. `tests/NumeralOwnTypeWalk.fss` (rung N's worker). Needed. About fifty values of a program's own types taking numerals. Failed on the base (`REPORT.md:45-47`).
16. `tests/StringLiteralIdentityWalk.fss` (rung S's worker). Needed. Ten values. Failed on the base (`rung-string-literals/REPORT.md:34-36`). No earlier test compares two literals by `SEQV`.
17. `tests/XXXNumeralFoldNoPrefixMinusWalk.fss` (rung F's worker). Needed. Expected failure, row 956.
18. `tests/XXXNumeralRoundsToInfinityWalk.fss` with `.test` (the gather). Needed. Expected failure, row 967; shown both ways (RECORD.md of batch 29, `:45`).
19. `tests/XXXTypecaseUndefinedArmWalk.fss` with `.test` (rung N's worker). Needed. Expected failure, row 959 (`rung-numeral-types/REPORT.md:156`).
20. `tests/ZZOneGetterWalk.fss` (rung F's skeptic wrote it as `XXXZZOneGetterWalk`, row 387; promoted inside the batch). Needed. Three values. Shown both ways as an expected failure (`rung-literal-fold/SKEPTIC.md:91`).

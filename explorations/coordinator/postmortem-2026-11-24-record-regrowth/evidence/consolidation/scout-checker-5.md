<!-- Scout evidence for chunk checker-5 of the FACTS consolidation of 2026-11-24: one block per entry of the chunk (F-325 to F-409, 28 entries), gathered with facts-extract.sh, ls, grep and the ledger queries; it judges nothing and proposes no cut. -->

# Scout evidence: checker-5

### F-325
1. Sources: `explorations/compile-ladder/rung-partial-assumption/REPORT.md` "What changed and why": file, heading found; `rung-codegen-asif/REPORT.md`: file found (no heading cited).
2. Commit: first block (added 2026-11-07 09:45Z) names none; first commit in history `a2f0b5cf2` (2026-11-07 15:12Z); latest rewrite `285efad80` (2026-11-20).
3. Cited by: FACTS F-34; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: all found: tests AsIfCallsCompiled, AsIfPartialCallCompiled, AsIfPartialDispatchCompiled, AsIfCallsWalk, AsIfOverloadedMethodWalk; CodeGen.java, OverloadSet.java and their 6 named methods (grep -rF). Rows 818, 919, 920, 922: NEGATIVE-VERIFIED, agree (entry calls them refused or open); row 818 names XXXAsIfPartial{Method,Receiver,DottedArg,WithFunctionalMethod}Compiled, all exist.
5. Said elsewhere: `.claude/skills/fortress-repo/references/compiler.md:67` "It stops with 'Can't compile a dispatched call whose arguments are not all type assumptions' in these forms (ledger row 818):"; `compiler.md:63` "at a dotted call's receiver, `(r asif T).m(a)`, where every argument is an assumption or `T` has one method `m`"; compiler.md:76-79 lists the generic, other-component and overloaded-generic refusals.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-327
1. Sources: `explorations/compile-ladder/rung-natives-shift-power/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-07 09:46Z) none; first commit `a2f0b5cf2` (2026-11-07 15:12Z); latest `f56d6516c` (2026-11-08).
3. Cited by: FACTS F-299, F-308; POSITIONS none; skills none.
4. Exists today: found: Library/FortressLibrary.fss, ProjectFortress/LibraryBuiltin/FortressBuiltin.fss, tests/NativeHelperShiftPowerWalk, compiler_tests/NativeHelperFamilyShiftPowerCompiled. No ledger rows named. Line cites (:800-845, :234-260) not checked.
5. Said elsewhere: no place states it: grep -F shiftCount in skills and FACTS finds nothing; LSHIFT hits F-124, F-125, F-132, F-172 (other topics). F-299 counts its 16 bindings.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-328
1. Sources: `explorations/compile-ladder/rung-any-carrier/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-07 09:47Z) none; first commit `f56d6516c` (2026-11-08 10:30Z).
3. Cited by: FACTS F-299; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: found: NativeApp.java, prim/ObjectPrims.java, tests/AnyNativesIntrinsicWalk, compiler_tests/AnyNativesIntrinsicCompiled. No ledger rows. Cited entries F-335, F-344, F-379 exist.
5. Said elsewhere: F-299 (FACTS.md:142): "eight by the table `OWN_OPERATIONS` of `interpreter/glue/NativeApp.java`, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335)"; F-335 (FACTS.md:165): "Walk's loader maps the six names to its glue by its table `OWN_OPERATIONS`".
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-330
1. Sources: `explorations/compile-ladder/rung-io-writer/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-07 09:51Z) none; first commit `f56d6516c` (2026-11-08 10:30Z); line cites re-anchored `7daf51fe8` (2026-11-09).
3. Cited by: FACTS F-32, F-299; POSITIONS P-164; skills: `references/sources.md` only.
4. Exists today: found: Library/FortressLibrary.fss, Writer.fss, Writer.fsi, NamingCzar.java, StaticNativeApp.java, tests/NativeHelperWriterWalk, compiler_tests/NativeHelperFamilyWriterCompiled. No ledger rows. Line cites not checked.
5. Said elsewhere: F-32 (FACTS.md:38): "`println` writes through `stdOut`, a plain Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330)"; `.claude/skills/fortress-repo/references/interpreter.md:121`: "`JavaBufferedWriter` and `JavaBufferedReader`, the library's writer and reader traits, in `compiler/runtimeValues/FortressBufferedWriter` and `FortressBufferedReader`".
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-332
1. Sources: `explorations/compile-ladder/rung-io-reader/REPORT.md` "What changed and why": found; `rung-io-reader/JUDGE.md`: file found (heading "For the curator" appears in history only).
2. Commit: first block (2026-11-08 07:34Z) none; first commit `f56d6516c` (2026-11-08 10:30Z).
3. Cited by: FACTS F-290, F-299, F-330; POSITIONS P-164; skills: `references/sources.md` only.
4. Exists today: found: Library/File.fss, Writer.fss, FortressLibrary.fss, StaticNativeApp.java, tests/NativeHelperReaderWalk, compiler_tests/NativeHelperFamilyReaderCompiled, FileOpsRaiseCaughtCompiled. No ledger rows.
5. Said elsewhere: F-330 (FACTS.md:161): "`FileWriteStream` is a plain `WriteStream` over `JavaBufferedWriter` too, with its `flush` (F-332)"; `.claude/skills/fortress-repo/references/interpreter.md:121` as for F-330.
6. Curator's words: none. History 2026-11-23 17:36Z (a record worker, Opus) says queue item 412 "left the review queue ... as not consequential"; not the curator's words.

### F-333
1. Sources: `explorations/compile-ladder/rung-array-store/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-08 07:36Z) none; no commit in any block of its history.
3. Cited by: FACTS F-32, F-299; POSITIONS P-169; skills: `references/sources.md` only.
4. Exists today: found: ArrayStoreWalk, ArrayStoreRR64Walk, ArrayInitOnceWalk, ArrayOpsMisspeltWalk, compiler/runtimeValues/ArrayStoreJUTest; glue classes PrimitiveArray.java, PrimImmutableArray.java, PrimImmutableRR64Array.java still in tree (entry says they stay). Row 466 NEGATIVE-VERIFIED (a second initialization is silently ignored), agrees.
5. Said elsewhere: `.claude/skills/fortress-repo/references/compiler.md:103`: "it also tracks each element of the one library's arrays, by array and index: `compiler/runtimeValues/FortressArrayStore"; F-140 (FACTS.md:236) names `makeJavaArrayStore` (row 527). No place restates the walk's `AtomicArray` answer.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-334
1. Sources: `explorations/compile-ladder/rung-checker-partial-order/REPORT.md`: file found (no heading cited).
2. Commit: first block (2026-11-08 07:37Z) none; first commit `7daf51fe8` (2026-11-09 11:00Z); later `a2be3e9e1`, `567c36dad`.
3. Cited by: FACTS F-53, F-54; POSITIONS none; skills none.
4. Exists today: found: PartialOrderJUTest, compiler_tests/PartialOrderCandidatesCompiled, TieAmongMostSpecificCompiled, scala_src/useful/PartialOrder.scala, CoercionOracle.scala, Formula.scala, Functionals.scala. No ledger rows.
5. Said elsewhere: no place states it: grep -F "linear extension", "32 candidates" find nothing; `revival-changes.md:55` and F-92, F-168 name StandardPartialOrder (walk's tuples, other topic).
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-335
1. Sources: `explorations/compile-ladder/rung-runtime-threads/REPORT.md`: file found (no heading cited).
2. Commit: first block (2026-11-08 07:39Z) none; first commit `f56d6516c` (2026-11-08 10:30Z).
3. Cited by: FACTS F-32, F-299, F-328; POSITIONS P-167, P-169; skills none.
4. Exists today: found: nativeHelpers/runtime.java, NativeApp.java, tests/RuntimeOwnOperationsWalk, compiler_tests/RuntimeOwnOperationsCompiled. Row 82 NEGATIVE-VERIFIED (spawn's thread handle has no methods on the compiled path); its notes say each of Thread's four raises FailCalled "sp..."; agrees.
5. Said elsewhere: F-32 (FACTS.md:38): "`Thread`'s four, `abort` and `printTaskTrace` name `runtime` helpers (F-335)"; F-299 (FACTS.md:142) as for F-328; `interpreter.md:148` names `nativeHelpers/runtime.java:53`, which raises `FailCalled` (helper raises, not the binding).
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-336
1. Sources: `explorations/compile-ladder/rung-first-run-one-library/REPORT.md` "The design as built (a point to report)": found; `rung-runtime-threads/REPORT.md`: file found.
2. Commit: first block (2026-11-08 07:39Z) none; first commit `f56d6516c` (2026-11-08 10:30Z).
3. Cited by: FACTS F-24, F-312, F-332, F-353; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: found: compiler/runtimeValues/Utility.java, compiler_tests/HelperRaiseMessageCompiled, one_library_tests/OneLibraryCatchHelperRaises.test. Row 1103 NEGATIVE-VERIFIED (a helper's raise is a second instance of the object), agrees.
5. Said elsewhere: `.claude/skills/fortress-repo/references/interpreter.md:148`: "A helper runs on both paths, so it raises an exception as compiled code does: `throw Utility.makeFortressException(\"DivisionByZero\")`"; `.claude/skills/fortress-repo/references/compiler.md:153`: "an exception object without value parameters that a helper raises is a second instance of the object" (row 1103); F-24 (FACTS.md:18) and F-312 (FACTS.md:150) restate the `LibraryNames` mapping.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-337
1. Sources: `explorations/compile-ladder/rung-system-natives/REPORT.md` "The static, and the loader": found.
2. Commit: first block (2026-11-08 07:41Z) none; first commit `f56d6516c` (2026-11-08 10:30Z).
3. Cited by: FACTS F-32, F-299, F-321; POSITIONS P-170; skills none.
4. Exists today: found: runtimeSystem/InstantiatingClassloader.java, compiler_tests/NativeHelperProgramArgsCompiled, NativeHelperProgramArgsPassedCompiled. `mustUseSystemLoader` (named in history) not checked. No ledger rows.
5. Said elsewhere: F-321 (FACTS.md:155): "its `args` names `programArgs` (F-337)"; `compiler.md:102` says the revival changed `InstantiatingClassloader.java` for sizes, a lock and the call opcode (not the helper-loading rule).
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-338
1. Sources: `explorations/compile-ladder/rung-codegen-trait-table/REPORT.md`: file found (no heading cited).
2. Commit: first block (2026-11-08 07:44Z) none; first commit `ba3c7c876` (2026-11-18 08:14Z).
3. Cited by: FACTS none (F-352, F-391 name the trait table in other words); POSITIONS none; skills none.
4. Exists today: found: compiler_tests/TraitTableApiTraitCompiled. No ledger rows.
5. Said elsewhere: F-391 (title): "The code generator gathers a trait's methods with entries that name each trait as the trait table finds it, so a method of an imported api's trait is found by its api" (same area, not the same sentence); `compiler.md:165` row 1087 is a checker crash (other topic).
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-342
1. Sources: `explorations/compile-ladder/rung-numeral-checker/REPORT.md` "1. What changed and why": found.
2. Commit: first block (2026-11-09 07:08Z) none; first commit `a2be3e9e1` (2026-11-10 02:26Z); latest `0a83a7049` (climb batch 35).
3. Cited by: FACTS F-57, F-73, F-118, F-123, F-131, F-140, F-262, F-278; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: found: LiteralDefaultCompiled, NatValueZZ32Compiled, NumeralStaticDesignCompiled, XXXLiteralTypeUnwritable, XXXNumeralBeyondRangeInTuple, XXXNumeralBeyondZZ32Range, XXXNumeralJoinBeyondRange, XXXNumeralTypeExtendedRefused (all .test), KindEnv.scala. Row 963 NEGATIVE-VERIFIED (a typecase selector keeps its numeral type), agrees.
5. Said elsewhere: F-57 (FACTS.md:62): "The checker types a numeral by its own numeral type, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[...]`"; entry cites P-173, P-174 as the decisions it builds. No skill file states the default rule (grep "out of range" finds only F-124).
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-344
1. Sources: `explorations/compile-ladder/rung-walk-language-types/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-09 07:14Z) none; no commit in any block.
3. Cited by: FACTS F-74, F-123, F-131, F-328; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: found: interpreter/evaluator/types/LanguageTypes.java, tests/LanguageTypeInstancesWalk. No ledger rows.
5. Said elsewhere: F-328 (FACTS.md:160): "though walk instantiates a generic at its trait (F-344)"; no other place states the four-string-objects reading (grep "four string objects", "LanguageTypes" in skills and FACTS: no hit).
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-352
1. Sources: `explorations/compile-ladder/plan-31/probes/switch-rehearsal.md` "2. The walls, in the order met": found; `plan-31/probes/model-closure-check.md` "4. The checker's time for one program": found.
2. Commit: first block (2026-11-13 23:38Z) none; first commit `7858d0e97` (2026-11-17 07:11Z).
3. Cited by: FACTS F-58, F-353, F-358; POSITIONS P-33; skills none.
4. Exists today: both probe files found. Rows (status now): 81, 315, 624, 732, 866, 874, 942, 990, 991, 992, 993, 994 FIXED; 995 NEGATIVE-BOUNDED. Entry says each is fixed since (624 under the selection) and 995 holds for carried types other than payload-class objects: agrees. 995's claim matches.
5. Said elsewhere: `.claude/skills/fortress-repo/references/compiler.md:193`: "The command chooses the library. Walk and `test` call `Shell.useInterpreterLibraries()`. Every other command calls `useCompilerLibraries()`."; F-9 (FACTS.md:8) title: "unless `FORTRESS_LIBRARY=one` selects the one library"; F-381 states the selection.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-353
1. Sources: `explorations/compile-ladder/plan-31/probes/probe-y.md` "1. What ran": found.
2. Commit: first block (2026-11-13 23:38Z) none; first commit `d3747846c` (2026-11-18 00:16Z).
3. Cited by: FACTS none; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: probe-y.md found. Row 1101 NEGATIVE-VERIFIED (`u.asString` at a ZZ32-bounded parameter against the one library), agrees. Entry's 137-of-876 sample and 105 raise strings not rechecked.
5. Said elsewhere: F-396 (title, FACTS.md:183): "The one library compiles to jars over a second set of run-time classes"; F-388 (FACTS.md:294) on `LibraryNames` and the payload classes; `compiler.md:32` ("The runtime's classes ..." under the selection).
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-364
1. Sources: `explorations/compile-ladder/rung-static-argument-inferred/REPORT.md` "Step 1, row 731: the reduction": found.
2. Commit: first block (2026-11-16 04:29Z) none; first commit `567c36dad` (2026-11-16 06:44Z).
3. Cited by: FACTS F-58, F-59, F-221, F-285; POSITIONS P-78; skills: `references/sources.md` only.
4. Exists today: found: InferBigOperatorUnwritten, InferBigOperatorExpectedType, InferBigOperatorSelfBound, Functionals.scala, explorations/run-c4/src/MicroGptFlat.fss. Rows: 731 FIXED; 1007, 1008 NEGATIVE-VERIFIED; 1015 NEGATIVE-BOUNDED; agree. Line 38 of MicroGptFlat.fss not checked.
5. Said elsewhere: `.claude/skills/fortress-repo/references/revival-changes.md:122`: "Where a reduction's bound names its parameter, as for `SUM`, `PROD`, `BIG MAX` and `BIG MIN`, the two paths fix an unwritten static argument from different places."; F-59 title (FACTS.md:64): "the compiled checker takes an unwritten one from the reduction's expected type, else from the type of its body"; walk side F-141, F-220, F-228.
6. Curator's words: history 2026-11-16 07:45Z (`5ba4f78ed`): "the diff that the curator approved on 2026-11-16" (the model's sum without its static argument); a reference, no quote, no time.

### F-365
1. Sources: `explorations/compile-ladder/rung-static-argument-inferred/REPORT.md` "Step 2, row 758: the reference to a generic function": found.
2. Commit: first block (2026-11-16 04:29Z) none; first commit `567c36dad` (2026-11-16 06:44Z).
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: found: GenericFunctionAsValueCompiled, GenericFunctionAsValueSameNameCompiled, XXXGenericFunctionAsValueOpenCompiled, XXXGenericFunctionAsValueUntypedCompiled, Functionals.scala, CoercionOracle.scala, TypeAnalyzer.scala; `instantiatedReference` not grepped. Rows: 758 FIXED; 1009, 1010, 1012, 1013 NEGATIVE-VERIFIED; agree.
5. Said elsewhere: `.claude/skills/fortress-repo/references/compiler.md:154`: "A reference to a generic function with one declaration, as `count[\F extends Object\](b: Box[\F\]): ZZ32`, takes its instance from the arrow type that receives it."; `.claude/skills/fortress-repo/references/interpreter.md:16` states walk's rule ("A generic function passed as a value takes its instance from the arrow type that receives it").
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-370
1. Sources: `explorations/reviews/omitted-types-intent-2026-11-16.md` "2. The api states the types. Built on both paths.": found.
2. Commit: first block (2026-11-16 12:29Z): commit `a55274470`.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: found: scala_src/typechecker/ApiTypeExtractor.scala (`:52-188` not checked). Rows: 841, 405 NEGATIVE-VERIFIED agree; 1032 is CONTESTED, while the entry states its Java exception as plain fact (row says "Contested: the text asks to infer the..."; check `facts-extract.sh ledger:1032`).
5. Said elsewhere: `.claude/skills/fortress-repo/references/revival-changes.md:136`: "Write every parameter type. The compiled checker refuses a parameter without a type, \"Missing parameter type for\", unless the exported api's declaration gives the type."; F-254 (FACTS.md:118) on the return type from the api.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-376
1. Sources: `explorations/compile-ladder/rung-return-rule-object/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-17 02:52Z) none; first commit `7858d0e97` (2026-11-17 07:11Z).
3. Cited by: FACTS F-75; POSITIONS none; skills none.
4. Exists today: found: compiler_tests/OverloadReturnObjectDomain. Row 699 NEGATIVE-VERIFIED (a dispatcher whose range is no static parameter has no such cast), agrees. Tokens Box, keep(self) are code examples, not files.
5. Said elsewhere: no place states the dispatcher's cast: grep -i cast finds F-12, F-358, compiler.md:137 (other topics). `compiler.md:173` states the Return Type Rule refusal of a generic beside an object-type declaration, as a limit.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-381
1. Sources: `explorations/compile-ladder/rung-library-selector/REPORT.md` "What changed and why": found; `rung-first-run-one-library/REPORT.md` "The tests: the failing runs on the base, the passing run": found.
2. Commit: first block (2026-11-17 21:27Z) none; first commit `d3747846c` (2026-11-18 00:16Z).
3. Cited by: FACTS F-9, F-293, F-352, F-353, F-390; POSITIONS P-33; skills: `references/sources.md` only.
4. Exists today: found: OneLibraryRunHello.test, OneLibraryPrintBig.test, OneLibraryHalf.test, XXXOneLibraryRunHalf.test; build.xml targets testOneLibrary (line 1176) and testFast exist (`ant ...` tokens are commands, not files). No ledger rows (XXXOneLibraryRunHalf is row 1098's test).
5. Said elsewhere: `.claude/skills/fortress-repo/references/build-and-caches.md:73`: "With `FORTRESS_LIBRARY=one`, a run that names no private caches folder uses `default_repository/caches-one` in place of `default_repository/caches`"; `SKILL.md:98` repeats it; F-9 (FACTS.md:8); F-404 (FACTS.md:211) on `build-one`.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-390
1. Sources: `explorations/compile-ladder/rung-varargs/REPORT.md` "The convention as built": found; `rung-first-run-one-library/REPORT.md` "The run tests (a point to report)": found; `explorations/reviews/batch-33b-review.md`: file found.
2. Commit: first block (2026-11-18 05:36Z) none; first commit `ba3c7c876` (2026-11-18 08:14Z).
3. Cited by: FACTS F-86, F-315, F-320, F-352; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: found: XXXOneLibraryRunVarargs.test, XXXVarargsMethodCodeGeneration.test, compiler_tests/XXXVarargsCodeGeneration.test; glob one_library_tests/OneLibraryVarargs*.test matches 7 files (ls). Rows: 1085, 1086 NEGATIVE-VERIFIED agree; 1098 CONTESTED (entry gives its println case as a plain exception).
5. Said elsewhere: `.claude/skills/fortress-repo/references/compiler.md:45`: "Against the compiler's prelude, it refuses a varargs parameter: 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, ...'"; F-86 (FACTS.md:91) is the checker side.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-391
1. Sources: `explorations/compile-ladder/rung-api-method-index/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-18 05:39Z) none; no commit in any block.
3. Cited by: FACTS F-338, F-352; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: found: ApiTraitShadowedNameCompiled, AsIfApiTraitCompiled, AsIfApiTraitOverrideCompiled, IntersectionApiTraitCompiled, ApiTraitOverloadCompiled (.test), one_library_tests/OneLibraryArray1.test; `CodeGen.hasBodyInItsTrait` not grepped. Row 1088 NEGATIVE-VERIFIED, agrees.
5. Said elsewhere: F-352 (FACTS.md:171): "the search stays, and no compiled test reaches it, F-391"; F-338 (title) covers the api trait as first supertrait.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-392
1. Sources: `explorations/compile-ladder/rung-type-variable-receiver/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-20 17:52Z) none; first commit `285efad80` (2026-11-20 20:48Z).
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: found: compiler_tests/TypeVariableReceiverGenericMethod. Row 1093 NEGATIVE-VERIFIED (checker refuses a call on a type variable bounded by another), agrees.
5. Said elsewhere: `.claude/skills/fortress-repo/references/compiler.md:174`: "A method call through a type variable whose bound is another type variable: the checker refuses `x.n()` with `x: F` in `chained[\H extends Gen, F extends H\]`" (row 1093).
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-393
1. Sources: `explorations/compile-ladder/rung-label-local-verify/REPORT.md` "The cause, by the bytecode": found.
2. Commit: first block (2026-11-20 17:56Z) none; first commit `285efad80` (2026-11-20 20:48Z).
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists today: found: compiler_tests/BlockBindingScopeCompiled, CodeGen.java; `compile-ladder/plan-34/probes/rehearsal-34.patch` not checked. Rows: 983 NEGATIVE-BOUNDED, 1054 NEGATIVE-VERIFIED, 1078 FIXED (entry refers to "its stand-in for row 1078" without saying the row is fixed now).
5. Said elsewhere: no place states it: grep "Bad local" in skills and FACTS finds nothing; F-376 (FACTS.md:176) has a different VerifyError ('Bad return type').
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-394
1. Sources: `explorations/compile-ladder/rung-widening-getter/REPORT.md` "What changed and why": found; `rung-widening-getter/SKEPTIC.md` "My programs, old code against new": found.
2. Commit: first block (2026-11-20 17:58Z) none; first commit `285efad80` (2026-11-20 20:48Z); later `explorations/reviews/batch-34-review.md`.
3. Cited by: FACTS F-225; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: found: compiler_tests/SelfTypedGetterNarrowedReturn, XXXGetterReturnTypeNotSubtype, XXXInferredGetterReturnTypeNotSubtype. Rows 375, 1094, 1095, 1097 NEGATIVE-VERIFIED, agree.
5. Said elsewhere: F-225 (FACTS.md:102): "a getter so redeclared reads the plain type and compiles (F-394)" and "The Return Type check reads `self` as `C[\X\] & X` ... so it refuses a narrower return type"; `revival-changes.md:43` on `self` as the intersection.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-396
1. Sources: `explorations/compile-ladder/rung-first-run-one-library/REPORT.md` "The design as built (a point to report)": found; `rung-one-library-run-walls/REPORT.md`: file found.
2. Commit: first block (2026-11-21 00:07Z) none; first commit `295c215c2` (2026-11-21 02:36Z).
3. Cited by: FACTS F-34, F-336, F-352, F-353, F-381, F-388, F-390; POSITIONS none; skills: `references/sources.md` only.
4. Exists today: found: OneLibraryRunHello, OneLibraryArr, OneLibraryRangeReduction, OneLibraryRunStringEquality, OneLibraryVarargsArguments, OneLibraryCatchHelperRaises, OneLibraryComponents (.test), OneLibraryJUTest.java, Library/FlatString.fss. Rows 643, 1101, 1103, 1137, 1138, 1140 NEGATIVE-VERIFIED; 1102 NEGATIVE-BOUNDED; 1098 CONTESTED; entry lists each as a departure from walk, agrees (1098 not marked contested).
5. Said elsewhere: F-34 (FACTS.md:39): "The test that checks this count of refused declarations is `one_library_tests/OneLibraryComponents.test`"; `.claude/skills/fortress-repo/references/library.md:54` names the same test; F-353 describes the second-set mechanism.
6. Curator's words: none in the history (provenance lines checked with grep -i curator)

### F-408
1. Sources: `explorations/compile-ladder/rung-checker-most-specific/REPORT.md` "What changed and why": found.
2. Commit: first block (2026-11-24 05:41Z) none; first commit `61b50cd34` (2026-11-24 08:12Z).
3. Cited by: FACTS F-76, F-232, F-334, F-376, F-377, F-396, F-406; POSITIONS none; skills none.
4. Exists today: found: ComprisesFunctionalMethodNarrowedReturn, ComprisesSelfListedTypeCompiled, CoverageReturnGenericFamily, OverloadGenericObjectTwoParams, GenericTiesDeclaredCompiled. Rows 1136, 1143, 1145 NEGATIVE-VERIFIED, agree.
5. Said elsewhere: F-334 on candidate order (partial order, not places); no skill file states the order by place (grep "first by place": no hit); `revival-changes.md:15`: "Walk chooses by declared parameter types, never by the order of the declarations."
6. Curator's words: history 2026-11-24 08:12Z, quoting the curator's words of 07:0x UTC on 2026-11-24 (BOOT.md:11 at 99035e231): "File order cannot decide! There must be a language rule that decides definitively or its static error!" (review-queue item 419).

### F-409
1. Sources: `Specification/basic/traits.tex` "Method Declarations": found; `rung-one-library-run-walls/REPORT.md` "What changed and why": found; bare `SKEPTIC.md` is `rung-one-library-run-walls/SKEPTIC.md`, file found, heading not checked.
2. Commit: first block (2026-11-24 05:43Z) none; first commit `61b50cd34` (2026-11-24 08:12Z).
3. Cited by: FACTS F-390; POSITIONS none; skills none.
4. Exists today: found: compiler_tests/TraitBridgesWrittenOnce.test, one_library_tests/OneLibraryArr, OneLibraryDot, OneLibraryRangeReduction, OneLibraryVarargsArguments (.test), CodeGenClassWriter.java. No ledger rows.
5. Said elsewhere: no place states it: F-352 (FACTS.md:171) lists the earlier cases "a method written twice (row 990)"; F-390 cites F-409 for "each class holding a method once".
6. Curator's words: none in the history (provenance lines checked with grep -i curator)


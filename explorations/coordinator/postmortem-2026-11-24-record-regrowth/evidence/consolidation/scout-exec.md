<!-- Evidence of the `exec` chunk (29 entries, F-7 to F-395, section "Execution model") of the FACTS consolidation of 2026-11-24, gathered by a scout for the Opus writer; it judges nothing and rewrites nothing. Paths: R=explorations/, S=ProjectFortress/src/com/sun/fortress/, T=ProjectFortress/tests/, CT=ProjectFortress/compiler_tests/. "Heading ok" = the report section exists (checked by grep of the headings; `facts-extract.sh --check doc:` agrees where run). Commit = first history block, or `git log -S` where that block names none. "Cited by" lists FACTS entries, POSITIONS entries and skill files (only `references/sources.md` names any F-number there); none = grep of `F-N\b` found nothing. Ledger status read from explorations/fortress-gap-ledger.md. -->

### F-7
1. Sources: R/repo-internals.md "The two worlds" (ok, :97-123). Skill pointers: interpreter.md "What walk checks", SKILL.md "How a program runs" (exist).
2. Commit: a74f5a2b7 (numbered 2026-10-13 17:58Z).
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: R/repo-internals.md found. No ledger row.
5. Said elsewhere: SKILL.md:72 "5. Check the static types. Walk's phase list holds this phase, but walk switches it off."
6. Curator: none.

### F-9
1. Sources: none cited (rows 69, 833; P-12).
2. Commit: a74f5a2b7; rewritten 8ab10d9de.
3. Cited by: FACTS none; POSITIONS P-12; skills sources.md:1434.
4. Exists: Library/CompilerLibrary.fsi found; S/Shell.java found, `useCompilerLibraries` at :377; S/compiler/StaticChecker.java:228-229 found, holds "The Java version of the type checker is gone now." Row 69 NEGATIVE-VERIFIED, agrees (row cites Shell.java:455-457, StaticChecker.java:229; `f(i: Index)` passes under FORTRESS_LIBRARY=one). Row 833 NEGATIVE-VERIFIED, agrees.
5. Said elsewhere: compiler.md:193 "The command chooses the library. Walk and `test` call `Shell.useInterpreterLibraries()`. Every other command calls `useCompilerLibraries()`."; F-289, F-293 name `useCompilerLibraries`.
6. Curator: none.

### F-11
1. Sources: R/perf-probes/kernels/REPORT.md "2. The three microGPT-shaped kernels", "4. What the shares are, for microGPT-shaped code" (ok); R/perf-probes/helper-calls/REPORT.md "4. Where the cost sits" (ok).
2. Commit: a74f5a2b7.
3. Cited by: FACTS F-12, F-18, F-358; POSITIONS P-17; skills none.
4. Exists: row 305 NEGATIVE-VERIFIED ("the compiled path has no array type"), agrees. F-301, F-302 exist.
5. Said elsewhere: SKILL.md:94 "A number is a boxed object, also inside a specialised class: under either library, an `RR64`'s class extends `FRR64`"; F-18 "stamping alone keeps every number boxed (F-11)".
6. Curator: none.

### F-12
1. Sources: R/compile-ladder/rung0/REPORT.md "The four timings" (ok); R/perf-probes/boxing/REPORT.md sections "4. The bytecode: "boxed" shown, not inferred", "5. What the numbers settle" (ok).
2. Commit: a74f5a2b7 (rewritten from F-12 to F-15 merged in 2026-10-13 19:03Z; reorganized 2026-10-22 12:03Z).
3. Cited by: FACTS F-358; POSITIONS none; skills none.
4. Exists: no test or row named. Names F-11, F-40, F-301 only.
5. Said elsewhere: compiler.md:103 "The compiled code keeps each mutable variable in a cell (`compiler/runtimeValues/MutableFValue.java`) ... Before each read and write of the cell, the generated code asks `BaseTask.inATransaction()`"; F-40 "a transaction check on each read and write of a local"; F-374.
6. Curator: none.

### F-17
1. Sources: R/perf-probes/boxing/REPORT.md "1. How it was run" (ok).
2. Commit: a74f5a2b7; rewritten 36f5723d6.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: no test named; build-and-caches.md "The library order" cited (file found).
5. Said elsewhere: build-and-caches.md:93 "Before the first compiled run, check that `default_repository/caches/bytecode_cache/` holds five jars".
6. Curator: none.

### F-18
1. Sources: R/perf-probes/nat/java.md "1. The change, and the name it produces"; R/coordinator/array-design.md "2. What the compiled world has" (probe 1 itself is in "9. The probes behind §2 and §6", not in section 2); R/reviews/array-design-ways.md "3. Question 2, decision A..." (way A4 inside). All headings ok.
2. Commit: a74f5a2b7; rewritten 8ab10d9de; again 2026-10-26 08:53Z.
3. Cited by: FACTS none; POSITIONS P-84; skills none.
4. Exists: S/runtimeSystem/InstantiatingClassloader.java:168-172 holds `if (false) { // Here will go all the magic expando-stuff.` (found); S/compiler/optimization/Unbox.java found; S/compiler/runtimeValues/RTTIsize.java found.
5. Said elsewhere: SKILL.md:90 "A generic declaration is compiled once, as a template class. The first time that a program uses an instantiation, such as `Box[\RR64\]`, the class loader makes its class."
6. Curator: none.

### F-19
1. Sources: R/compile-ladder/rung-forked-arguments/REPORT.md "What changed and why", "Points to report reached" (ok). Spec: Specification/basic/expressions/for.tex (36 lines, cites :28-32), tuple-expr.tex (24 lines, cites :23-24), operator-app.tex (90), evaluation/parallelism.tex (168; :88-90 holds "a Fortress implementation may choose to serialize portions of any group of implicit threads") all found.
2. Commit: a74f5a2b7; rewritten 8ab10d9de; d89fc0fda (batch 30).
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: S/compiler/codegen/ParallelismAnalyzer.java, S/interpreter/evaluator/tasks/TupleTask.java found; Library/RangeInternals.fss:1498-1585 is the strided `generate` (found); row 982 NEGATIVE-BOUNDED, agrees; row 987 CONTESTED, agrees ("by reading, not run"). `FORTRESS_LOOP_CHUNK`, `forkIfProfitable`: not grepped.
5. Said elsewhere: SKILL.md:111 "Fortress evaluates in parallel by default, not in Java's left-to-right order. The iterations of a `for` loop, the elements of a tuple..."; F-350 says the same on arguments and joins.
6. Curator: none.

### F-20
1. Sources: none cited; spec Specification/basic/trait-parameters.tex:96 "These parameters are instantiated at runtime with numeric values." (found).
2. Commit: a74f5a2b7; rewritten 8ab10d9de.
3. Cited by: FACTS F-40; POSITIONS none; skills none.
4. Exists: row 214 POSITIVE-VERIFIED agrees; row 23 NEGATIVE-VERIFIED agrees (`T[n]` refuses, `T[3]` takes); row 254 NEGATIVE-VERIFIED agrees ("ProgramError no catch clause takes").
5. Said elsewhere: F-154 "the stop reads "Failed to find any matching overload"... It is a `ProgramError`"; F-343 same message for another call.
6. Curator: none.

### F-21
1. Sources: R/compile-ladder/rung-maybe/REPORT.md "5. The decision"; R/reviews/spec-refused-examples.md "What was found" (E4 at :65) (both ok). Doc cited: Specification-1.0-frozen/basic-lib/convenience.tex:40 found; the line there is a TeX comment, `%object Nothing extends Maybe[\T\] excludes Just[\T\] where {T extends Object}`.
2. Commit: a74f5a2b7; rewritten 6823d52b6 (2026-10-13 19:03Z).
3. Cited by: FACTS none; POSITIONS none (P-90 named in the entry text only); skills none.
4. Exists: row 17 FIXED (3924e7ec3); its notes: both paths refuse the covariance idiom, "T is undefined", spec marks it "Not allowed" (P-97). F-21 says "as row 17 holds for a trait", agrees in substance.
5. Said elsewhere: F-184 "So a bare `Nothing` compiles only against the compiled prelude's own `Nothing` (row 331, P-90)."
6. Curator: history block 2026-10-22 12:37Z "status and planning references deleted, at the curator's word of 2026-10-22" (no quote of his words).

### F-22
1. Sources: R/compile-ladder/rung-export-var/REPORT.md "The measurement that separates them" (ok).
2. Commit: a74f5a2b7; rewritten 4e4b80253.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: CT/XXXExportVarRungXLinked.test and .fss found; S/linker/Linker.java found (`whoIsImplementingMyAPI` not grepped). Row 320 NEGATIVE-VERIFIED, agrees.
5. Said elsewhere: compiler.md:166 "An api and the component that implements it must have the same name. If there is none, the link fails ("Could not find an implementation for API")".
6. Curator: none.

### F-23
1. Sources: R/compile-ladder/rung-library-comments/REPORT.md "6. Defects measured, and their homes" (ok; D1 at :229).
2. Commit: a74f5a2b7; rewritten c2b4e2c95.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: row 359 NEGATIVE-BOUNDED, agrees (span runs to end of following comments).
5. Said elsewhere: library.md:62 "A comment after a declaration that ends in an expression or a type becomes part of that declaration's source span. It also becomes part of the unambiguous name made from..."
6. Curator: none.

### F-24
1. Sources: R/compile-ladder/rung-int-semantics-walk/REPORT.md "4.1 The catchable throw, measured first" (ok).
2. Commit: a74f5a2b7; rewritten d6faad28f; 11 history blocks, last 2026-11 (file :9392).
3. Cited by: FACTS F-306, F-312; POSITIONS none; skills sources.md:933, :1012, :1026, :1521.
4. Exists: T/IntSemanticsRungI.fss, NativeHelperRaiseWalk.fss, and ZZ32, ZZ64, ZZ, NN32, NN64 `<type>DivisionByZeroWalk.fss` and `RemainderByZeroWalk.fss`: all 12 found. Row 347 FIXED, agrees. F-299, F-306, F-308, F-312, F-336 exist.
5. Said elsewhere: interpreter.md:143 "A glue class raises a Fortress exception that a `catch` sees by throwing a `FortressError` that holds the exception's object. `ZZ32.overflow()`..."; F-299 "raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`".
6. Curator: none.

### F-25
1. Sources: R/compile-ladder/rung-generic-runtime/REPORT.md "1. What is fixed", "12. Decisions, each with the ways not taken" (ok).
2. Commit: a74f5a2b7.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: CT/FirstLoadThreadsRungG.fss and .test found. Row 417 FIXED, agrees.
5. Said elsewhere: compiler.md:102 "The revival has changed it for sizes, for the lock on a class's first load (ledger row 417)"; compiler.md:232 "do the four-thread atomic runs (`gate.md`)".
6. Curator: none.

### F-26
1. Sources: R/compile-ladder/rung-walk-dispatch/REPORT.md "5.1 Dispatch on declared domains (answer 9; defect 1)", "5.2 Rung K's inference, and the converted call dispatched again...", "5.5 Row 478: the cache key gains the bounds" (ok).
2. Commit: a74f5a2b7; rewritten 8f7e183d4.
3. Cited by: FACTS none; POSITIONS P-45 (named in the entry); skills sources.md:711, :712, :721, :723, :792, :1606, :1651, :1652.
4. Exists: T/DispatchDeclaredDomain.fss, DispatchConvertedAgain.fss found. Row 1134 NEGATIVE-VERIFIED, agrees (trait's dropped, object's kept). Row 478 FIXED (8f7e183d4); entry's "where clauses differ ... (row 478)" agrees with the row's note that a `where` clause is not in the cache key.
5. Said elsewhere: interpreter.md:61 and :68 "At load, it does not check two functional methods of a generic trait or object on their declared domains. It compares them at each call"; F-27, F-252, F-253 on declared domains.
6. Curator: none.

### F-27
1. Sources: R/compile-ladder/rung-walk-dispatch/REPORT.md "5.3 The load check for a generic declaration beside a plain one...", "5.4 Row 492's walk half: covering declarations read through the `comprises` clauses..." (ok). Names research/extracts/ParkPOPL2019-extract.md (found).
2. Commit: a74f5a2b7.
3. Cited by: FACTS F-159, F-257; POSITIONS none (P-46, P-60 in text); skills none.
4. Exists: T/ComprisesMeetWalk.fss found; GenericBesidePlain* found only under CT/ (GenericBesidePlainZZ32.fss, GenericBesidePlainStaticLink.test, GenericBesidePlainInvalidSetCallType.fss), none under T/. Row 539 NEGATIVE-VERIFIED, agrees.
5. Said elsewhere: interpreter.md:61 "It accepts them if `comprises` clauses cover the overlap"; interpreter.md:70 "It refuses a pair whose overlap it finds only through an instance of a supertype, also where a third declaration covers the overlap (ledger row 539)."
6. Curator: none.

### F-28
1. Sources: R/compile-ladder/rung-walk-dispatch/REPORT.md "3. Precedent search" (ok; the entry also says section 3).
2. Commit: a74f5a2b7; rewritten 8f7e183d4.
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: T/GenericReturningAny.fss found; S/interpreter/evaluator/MakeInferenceSpecific.java found. Row 157 FIXED, agrees.
5. Said elsewhere: rung report section "5.6 Row 157: `forAnyType`"; no skill or FACTS sentence found by grep of `forAnyType|MakeInferenceSpecific`.
6. Curator: none.

### F-29
1. Sources: R/compile-ladder/rung-walk-load-check/REPORT.md "5. Row 551: the closure check" (ok). Spec: Specification/basic/traits.tex found.
2. Commit: a74f5a2b7; clarity pass 2026-10-22 12:03Z.
3. Cited by: FACTS F-7, F-102; POSITIONS none; skills none.
4. Exists: T/ComprisesUnlistedExtender.fss+.test, ComprisesGenericChildUnlistedExtender.fss+.test found; XXX tests of rows 487, 551, 597, 598: XXXComprisesGenericChildAcrossComponents, XXXComprisesLibraryTraitUnlistedExtender, XXXComprisesObjectExpressionUnlisted, XXXComprisesListedTypeExtendsEachInstance found. Rows 487, 551, 595, 596, 597, 598 all NEGATIVE-VERIFIED, agree.
5. Said elsewhere: revival-changes.md:30 "A `comprises` clause speaks of values (P-60)."; F-7 names F-29 for `comprises` clauses; interpreter.md "What walk checks" (not quoted).
6. Curator: none.

### F-269
1. Sources: R/reviews/library-scalar-extension-review.md "Change 1" (not run); R/compile-ladder/rung-library-comments/REPORT.md "4. The specification, comment by comment" (ok).
2. Commit: 16bbe6072d (2026-10-22, "clarity chunks f9 to f12"); history 2026-10-22 12:06Z.
3. Cited by: FACTS F-119; POSITIONS none; skills sources.md:824, :836.
4. Exists: R/apl/mg/elemwise_nat_probe.fss found. Row 341 FIXED (entry: C4 "dropped" the pair, agrees); row 342 NEGATIVE-VERIFIED, agrees (cache entry written before the check; row cites ComponentWrapper.java:112).
5. Said elsewhere: F-119 "Walk checks such overloads against the library's only on a cold cache (F-269)"; interpreter.md:158 cold/warm cache times only.
6. Curator: block 2026-10-22 12:37Z "status and planning references deleted, at the curator's word of 2026-10-22".

### F-291
1. Sources: R/perf-probes/bound-any-compiled/REPORT.md "The shapes by setting", "What the class loader makes" (ok); "For FACTS" exists.
2. Commit: 0d2206c5fe (2026-10-26 "foundations review's findings filed").
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: S/Shell.java:378 is `setExtendsObjectPreDesugaring(false)`, first line of `useCompilerLibraries` (:377), which F-289 also says. Rows: 339 NEGATIVE-VERIFIED agrees; 1056 NEGATIVE-VERIFIED agrees; 832 FIXED agrees ("fixed since"); 470 NEGATIVE-VERIFIED agrees. No gated test (entry says so); F-292 named.
5. Said elsewhere: interpreter.md:85 "an overloaded function with one parameter of type `T`, where `T extends Any` is written"; F-265 "Six functions of `FortressLibrary` write the bound `extends Any`".
6. Curator: none.

### F-301
1. Sources: R/perf-probes/helper-calls/REPORT.md "7. For the report", "2. What the code generator emits" (ok; sections 2 to 5 cited).
2. Commit: 70e335bf12 (2026-10-31); report commit 999a1f6d2.
3. Cited by: FACTS F-11, F-40, F-298, F-302; POSITIONS P-162; skills none.
4. Exists: R/perf-probes/helper-calls/HelperCalls.fss found. S/compiler/runtimeValues/FZZ32.java:40-48 found (`make` calls `Make.MAKE.invokeExact`, agrees). DISAGREES by line: S/compiler/nativeInterface/FortressMethodAdapter.java:303-327 does not hold the wrapper (`sed -n 296,300p` shows `throw new Error("No Fortress type (yet) for foreign Java type descriptor")`); the getValue/make table is at :173-186 (file is 378 lines).
5. Said elsewhere: build-and-caches.md:67 "`nativewrapper_cache/`: the wrappers for the Java classes that an api imports with `import java`."; F-40 "a native helper's call is inlined whole and costs nothing".
6. Curator: none.

### F-302
1. Sources: R/perf-probes/helper-calls/REPORT.md "7. For the report", "4. Where the cost sits" (ok).
2. Commit: 70e335bf12 (2026-10-31); 999a1f6d2.
3. Cited by: FACTS F-11; POSITIONS P-162; skills none.
4. Exists: S/compiler/runtimeValues/FZZ32.java:22 `public abstract class FZZ32 extends FValue` agrees. DISAGREES by line: S/compiler/codegen/CodeGen.java:6047-6054 now holds `emitErasedClassFor` (`sed -n 6046,6048p`); the springboard class is built from :6092 (`grep -n springboard`).
5. Said elsewhere: F-11 "as long as C2's inline depth reaches each box's constructor chain (F-302)"; no other sentence on `MaxInlineLevel`.
6. Curator: none. History has 14 blocks (file :5009 to :9496, 22 KB).

### F-348
1. Sources: R/compile-ladder/rung-numeral-leftovers/REPORT.md "1. What changed and why", "10. Points to report" (ok); R/reviews/batch-30-review.md "2. The three forks that landed at a default" (ok).
2. Commit: f36a651243 (2026-11-10).
3. Cited by: FACTS F-347; POSITIONS none; skills sources.md:1283, :1294.
4. Exists: S/runtimeSystem/MainWrapper.java:30-46, :92-95 (`initializeInRootTask`, "The program's arguments are set first") and FortressExecutable.java:113-141 (`initializeInRootTask`) agree; InstantiatingClassloader.java found (:185-248 not read). CT/NumeralCoercionSpawnCompiled(.fss,.test) and NumeralCoercionSpawnImported(.fss,.test) found.
5. Said elsewhere: compiler.md:93 "The runtime initializes the class of each component that the program's classes name before `run()`, in one task."; F-340, F-347.
6. Curator: none.

### F-350
1. Sources: R/compile-ladder/rung-forked-arguments/REPORT.md "What changed and why", "Points to report reached"; R/reviews/batch-30-review.md "2. The three forks..." (ok).
2. Commit: 76b21f4981 (2026-11-10); rewritten d89fc0fda.
3. Cited by: FACTS F-19, F-356; POSITIONS P-175; skills sources.md:1284, :1288, :1295.
4. Exists: S/runtimeSystem/BaseTask.java:113-131 holds the arm-join comment and `joinIfForked` (:117) agrees. Library/RangeInternals.fss:20 `private grainSize: ZZ32 = 16`, :1320 and :1337 use it, agrees. CT/AlsoArmThrowsJoinsCompiled, CT/CallArgumentsForkCompiled found; T/ParRangeGrainWalk.fss found. Row 982 NEGATIVE-BOUNDED agrees. R/run-c4/src/MicroGptFlat.fss:17 `(16, 16, 4, 4, 27, 26)` agrees with "16, 16, 4 and 4".
5. Said elsewhere: compiler.md:140 "To fork is to run as tasks that can run at once. A call's arguments and an operator's operands fork, as the rule says, where two or more of them are calls"; F-19 repeats the join and fork points.
6. Curator: none.

### F-351
1. Sources: R/compile-ladder/rung-compiled-transaction/REPORT.md "What changed and why" (ok).
2. Commit: 594da41299 (2026-11-10); rewritten 2026-11-23 12:59Z (batch 35 review).
3. Cited by: FACTS none (F-401 is cited by it); POSITIONS none; skills none.
4. Exists: Transaction.java:228-367 (file 372 lines; :228 `TXReadLocation`) and BaseTask.java:295-322 (`leaveTransaction` at :295) agree. DRIFT: CodeGen.java:2148-2180 `forAtomicBlock` is now `forAtomicBlockHelper` :2142 and `forAtomicBlock` :2155; `forTry` is :2485 (entry says :2490-2494). Tests found: CT/AtomicOwnWriteNestedCompiled, AtomicNestedSameBodyCompiled, NestedAtomicAbortCompiled, AtomicNestedViewCompiled, AtomicSharedReadsCompiled, AtomicThrowRevertsCompiled, AtomicNestedReadsKeptCompiled, NestedTryInnerCatch; ArrayStoreJUTest is at S/compiler/runtimeValues/ArrayStoreJUTest.java (not under T/). Row 984 NEGATIVE-VERIFIED agrees.
5. Said elsewhere: F-401 "Compiled, the block's handler `BaseTask.leaveTransaction` commits on a `LabelExit`"; compiler.md:141 and :232 touch atomic, no restatement.
6. Curator: none.

### F-355
1. Sources: R/java-baseline/REPORT.md "4. Timings of the baseline", "5. Vectorisation: what HotSpot did with the baseline's loops" (ok); R/java-baseline/python-comparison.md "1. The answer" (ok).
2. Commit: 5064f7f80b (2026-11-13); block says from "9. For the record".
3. Cited by: FACTS F-356, F-357; POSITIONS none (P-7 in text); skills none.
4. Exists: R/java-baseline/run.sh found (usage line lists run, bench, parse, steps, kernels, scale).
5. Said elsewhere: only F-356, F-357 and F-358 point at java-baseline; no skill sentence.
6. Curator: none.

### F-356
1. Sources: R/java-baseline/REPORT.md "6. Fork/join: the baseline in the shape of the library and the compiled runtime" (ok).
2. Commit: 5064f7f80b (2026-11-13); changed 2026-11 (:7763, :8318).
3. Cited by: FACTS none; POSITIONS none (P-175 in text); skills none.
4. Exists: Library/RangeInternals.fss:20 `grainSize = 16` agrees; Library/FortressLibrary.fss:3129 `mul[\ nat s2 \](other: Matrix...)` start of the cited matrix product (found). run.sh has `steps`, `kernels`, `scale`.
5. Said elsewhere: F-350 "the one library's parallel `ZZ32` range splits only a range of more than `grainSize`, 16, elements".
6. Curator: none.

### F-357
1. Sources: R/java-baseline/REPORT.md "3. What could not be matched, and what was chosen" (ok).
2. Commit: 5064f7f80b (2026-11-13).
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: R/run-c4/src/FlatData.fss found; R/java-baseline/FlatData.java:23 `static double parseFloat` found; `run.sh parse` found (runs `Probes parse`).
5. Said elsewhere: F-355 "so a port ... as the Java baseline does (F-355)" names the port; no other sentence on parseFloat.
6. Curator: none.

### F-358
1. Sources: R/compile-ladder/plan-31/probes/switch-rehearsal.md "5. One timing"; R/reviews/plan-review-2026-11-10.md "7.3 What the first compiled timing says, and what it cannot say"; R/java-baseline/REPORT.md "7. The rehearsal's loop" (all ok).
2. Commit: 5064f7f80b (2026-11-13).
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: row 641 NEGATIVE-BOUNDED, agrees (row: transaction check 9 to 15% of a scalar accumulator loop). F-352 (the scratch tree) exists, FACTS.md:34 region.
5. Said elsewhere: F-11 (6.3×, 6.5× boxing); F-12 (the same loop's costs); F-352 cites the switch-rehearsal sections 2 and 4.
6. Curator: none.

### F-395
1. Sources: R/compile-ladder/rung-flatstring-name/REPORT.md "1. What changed and why" (ok).
2. Commit: 3e19933c65 (2026-11-20).
3. Cited by: FACTS none; POSITIONS none; skills none.
4. Exists: S/interpreter/evaluator/BuildNativeEnvironment.java:161-163 and BuildEnvironments.java:531-533 agree (both apply the `NativeConstructor` with empty args); Library/FlatString.fss found; Library/Reflect.fss:365-367 comment and `emptyCollection: ReflectCollection = ReflectCollection()` agree; T/NativeStringsReadyAtLoadWalk.fss found. Row 1082 NEGATIVE-VERIFIED agrees.
5. Said elsewhere: grep of the skills and FACTS for "native singleton", "NativeStringsReady", "registers ... constructor" found no other place.
6. Curator: none.

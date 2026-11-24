<!-- Scout evidence for chunk checker-4 (30 entries of FACTS, "The checker and the one library", F-281 to F-323) of the FACTS consolidation of 2026-11-24: for each entry its sources, commit, citers, what exists today, where else it is said, and the curator's words; gathered at HEAD f33bbf5549, no judgement, no edits. Abbreviations: cl = explorations/compile-ladder, rv = explorations/reviews, ct = ProjectFortress/compiler_tests, tt = ProjectFortress/tests, SK = .claude/skills/fortress-repo/references, ledger = `facts-extract.sh 'ledger:N'`. "Sections ok" = every cited section number or quoted heading is a heading of the file (script over `grep '^#'`). Commit = first commit adding the entry line, `git log -S'- F-N **' -- explorations/coordinator/FACTS.md | tail -1`. "sources.md" = SK/sources.md, the skill's maintenance file. Curator's words: `facts-extract.sh 'history:F-N'` grepped for curator|decision|said|told|asked gives no curator quote for any of the 30, so item 6 says none except where a block names a P-number. -->

## F-281
1. Sources: cl/rung-symbolic-check/REPORT.md sections 1, 3, 5 ok; rv/batch-28-review.md section 1 ok.
2. Commit: 108ab82d63 (2026-10-23); first block "added from rung-symbolic-check REPORT, '12. For FACTS'", 10 blocks.
3. Cited by: F-80 F-81 F-240 F-244 F-245 F-276 F-278 F-142 F-223; no POSITIONS; skills: sources.md:856, :1001 only.
4. Exists: found in ct/: ComprisesWhereFunctionalMethodChecker.fss, ImportExceptOverload.fss, OperatorPrefixInfixImport.fss, XXXComprisesWhereFunctionalMethodBounds.fss, XXXSymbolicOperatorOverloadUnrelated.fss; OverloadingChecker.scala:828 is `def isCheckedName` (entry :828-831); `selfComprised` is in scala_src/types/TypeAnalyzer.scala. Rows: 812 FIXED (agrees "fixed"), 813 NEGATIVE-VERIFIED, 814 NEGATIVE-VERIFIED (agree).
5. Said elsewhere: F-287 "It admits a name by `isCheckedName`..."; F-245 and F-240 cite the distance stage as the full check; SK has no sentence on isCheckedName (`grep -F isCheckedName SK/*.md` empty).
6. Curator: none.

## F-282
1. Sources: cl/rung-export-align/REPORT.md 1, 5, 6; rung-export-last 1, 2; rung-string-members 5; rung-abstract-declared 1, 5; rung-checker-small-gaps/REPORT.md "What changed and why", item 4 (heading ok; item "18-4. Row 1028" present).
2. Commit: 031c38bbcf (2026-10-23); first block from rung-export-align REPORT "5. Suites and stages"; 10 blocks.
3. Cited by: F-286; skills: sources.md:859, :881, :891.
4. Exists: found: ct/ExportAbstractGetterField, ExportAbstractMemberBodyless, ExportAbstractMemberDefined, ExportComprisesEllipsisAbstract, ExportVarFieldMatchesField, ExportVarObjectParameter, TopLevelVarByAssignExport, XXXExportAbstractMemberAbsent, XXXExportAbstractMemberOtherHeader, XXXExportFieldName, XXXExportMemberName; tt/ExportAlignedMembersWalk.fss. Rows: 839 NEGATIVE-VERIFIED (agrees: names not compared), 1028 FIXED (agrees).
5. Said elsewhere: SK/library.md:44-48 "The compiled checker's export check matches each api member with a component member of the same name and header" with the field, value-parameter ("by its type and its modifiers other than `var`, but not by its name"), getter and "Another member written `abstract`" bullets; SK/compiler.md:168 "The export check compares no value parameter's name"; F-297 states the abstract rule.
6. Curator: none quoted; the 2026-10-25 block points to his decision P-158 (P-158 exists: "A member that an api writes `abstract` is declared in the component that exports the api").

## F-285
1. Sources: cl/rung-body-arguments/REPORT.md sections 3, 5, 7, 9 ok.
2. Commit: bd00ad997d (2026-10-24); first block from the REPORT "16. For FACTS", lines re-anchored; 10 blocks.
3. Cited by: F-59 F-364; skills: sources.md:1318, :1334.
4. Exists: found tt/WrittenReductionArgumentsWalk, NestedReductionFusion, PureListStridedSubscriptWalk (.fss); tools/distance/run.sh. Lines checked: FortressLibrary.fss:4665, :4671 `BIG MIN[\ZZ32\]`; :2804, :3190, :3195 `SUM[\T\]`; :4849, :4866 `SUM[\ZZ32\]`; :1670 `cast[\O0\]`; :2824 `N[\0\] => cast[...]`; List.fss:151 `<|[\E\] self[i] | i <- r |>`, :504 transpose; PureList.fss:73 `<| self[i] | i <- r |>`: all agree. Row 824 NEGATIVE-VERIFIED (agrees). The entry says "twelve components"; run.sh COMPONENTS lists 14 (F-288 says fourteen).
5. Said elsewhere: SK/SKILL.md:133 "Walk instantiates a reduction or a comprehension without static arguments at the type declared for its value"; F-364 "The checker now infers such an unwritten argument itself" (cited in the entry); P-78 named.
6. Curator: none.

## F-286
1. Sources: cl/rung-string-members/REPORT.md sections 1, 2, 5 ok.
2. Commit: c8e013fafa (2026-10-24); 7 blocks; first from the REPORT "1. What changed and why".
3. Cited by: F-83 F-282; skills: none.
4. Exists: tt/StringMembersPromisedWalk.fss found. FortressLibrary.fsi:2583 and .fss:4596 are `trait String extends {...}` (ranges not walked). List.fsi:55 is a comment line ("should not be necessary in the presence of true type"); `trait AnyList excludes { Number, HasRank, String }` is at List.fsi:57 (sed -n 50,60p). Row 607 NEGATIVE-VERIFIED (agrees "carries row 607's miss").
5. Said elsewhere: F-282 "`String`'s api writes `abstract` on the members its component's trait leaves without a body or does not declare, and its `excludes` clause is the component's (F-286)"; F-297 lists String's depth, isBalanced, verify, rangeContains, splitWithOffsets, split, balanced; F-83 cites it.
6. Curator: none.

## F-287
1. Sources: cl/rung-export-operators/REPORT.md sections 1, 2, 5 ok (entry says "5.3"; section 5 exists).
2. Commit: e21ab5389e (2026-10-24, the phase 3 exit review's audit); first block from rv/phase3-exit/zero-audit.md "A.4"; 3 blocks; history text once read "157 ... 148 match, 9 differ, the export check reads none of them".
3. Cited by: F-281 F-282; skills: none.
4. Exists: found ct/XXXExportOperatorHeader, ExportOperatorMatch; ExportChecker.scala:278 `if overloadingChecker.isCheckedName(f) && isDeclarationName(...)` and :600 `isDeclarationName` doc comment agree. Rows 834 CONTESTED, 835 NEGATIVE-VERIFIED, 836 CONTESTED (entry words: "refused at the api's header, which the text accepts" for 834).
5. Said elsewhere: F-282 "it reads every top-level operator under its declared name (F-287)"; F-281 "the export check reads every operator too, each under its declared name only (F-287)".
6. Curator: none.

## F-288
1. Sources: cl/rung-list-imports/REPORT.md sections 1 to 3 ok; rv/batch-28-review.md section 1 ok.
2. Commit: e21ab5389e (2026-10-24); first block from zero-audit "A.2 Scope"; 5 blocks.
3. Cited by: F-53 F-290; skills: none.
4. Exists: found tt/CovariantCollectionArmsWalk.fss, ct/ExportVarObjectParameter, tools/distance/run.sh (:87-90 is the COMPONENTS list, 14 files, CovariantCollection and OneShotFlag last). List.fss:13 `import OneShotFlag`, :15 `import CovariantCollection`, :178 `opr BIG <|[\T\]|>`, :253 OneShot fields: agree. Row 839 NEGATIVE-VERIFIED (agrees).
5. Said elsewhere: F-290 "are among the distance's fourteen components since climb batch 22c, at 0 there (F-288)"; F-53 names CovariantCollection; F-285, F-287, F-289, F-290 say "the twelve" for the same stage.
6. Curator: none.

## F-289
1. Sources: cl/rung-bound-any/REPORT.md section 6 ok.
2. Commit: e21ab5389e (2026-10-24); first block from zero-audit "A.3"; 4 blocks (the 2026-10-26 block rewrites from perf-probes/bound-any-compiled/REPORT.md).
3. Cited by: F-296; skills: none.
4. Exists: Shell.java:378 `setExtendsObjectPreDesugaring(false);` agrees; DistanceMulti.java:79-92 is `compileCommandExtendsObject()` (agrees); tools/distance/run.sh found (setting any|walk|compile at :85).
5. Said elsewhere: F-296 "The distance stage's default setting, `compile`, reads that line at each run and gives 0, `#crash none` (F-289)"; P-42 (named in F-296); SK/SKILL.md:133 "An unbounded type parameter is bounded by `Any`".
6. Curator: none.

## F-290
1. Sources: cl/plan-31/probes/model-closure-check.md "1. The counts" ok; rv/phase3-exit/zero-audit.md "A.2 Scope" ok; cl/rung-system-natives/REPORT.md "The checker over System" ok; rv/batch-28-review.md section 6 ok.
2. Commit: e21ab5389e (2026-10-24); first block from zero-audit "A.2"; 4 blocks.
3. Cited by: P-12 P-33; skills: none.
4. Exists: Library/Avl.fss found; row 830 NEGATIVE-VERIFIED (agrees: stops at name binding on both paths). Entry says "No test checks it". Library/File, FileSupport, GeneratorLibrary (.fsi and .fss) found. Counts (624, 92, 25) are of batch 22's code, not re-measured here.
5. Said elsewhere: F-288 (CovariantCollection, OneShotFlag at 0); F-321 (System reads no error); F-332 (File a plain component); F-352 holds "624".
6. Curator: none.

## F-292
1. Sources: cl/rung-bound-any/REPORT.md sections 2, 9 ok.
2. Commit: 0d2206c5fe (2026-10-26); first block from perf-probes/bound-any-compiled/REPORT.md; 4 blocks (2026-10-30 block: counts are rung B's tree's).
3. Cited by: F-291; skills: none.
4. Exists: found ct/ImplicitBoundAny, XXX6bu.test, XXX6bv.test, XXXInferCallArgumentControls, XXXOverrideGenericReturnTypeNotSubtype, CoercionGenericFnCompiledRungC; `XXXImplicitBoundAny` not found (entry says promoted: `ls ProjectFortress/compiler_tests | grep ImplicitBoundAny` gives ImplicitBoundAny.fss/.test only). `grep -l CompilerSystem compiler_tests/*.fss` gives 27 files; the entry says 23 `.test` files (`grep -l CompilerSystem compiler_tests/*.test` gives 0). Test counts (86/263/1318) not re-run.
5. Said elsewhere: F-293 "27 programs of `compiler_tests/` and one of `other_compiler_tests/` import it"; F-400 named for the override refusal; F-296 same bound-Any change.
6. Curator: none.

## F-293
1. Sources: rv/phase3-exit/zero-audit.md "A.2 Scope" ok.
2. Commit: 8c99e258ef (2026-10-29, POSITIONS corrected from the phase 3 exit review); first block "added" by the corrections' final writer; 4 blocks.
3. Cited by: P-33 P-37; skills: none.
4. Exists: Library/CompilerSystem.fsi and .fss found; compiler_tests/ and other_compiler_tests/ found; 27 compiler_tests .fss and 1 other_compiler_tests file name CompilerSystem (agrees with the entry); F-381 and `WellKnownNames.useCompilerLibraries` named.
5. Said elsewhere: SK/compiler.md:32 "`Library/CompilerSystem.fss` is the compiled path's `System`"; SK/build-and-caches.md:91-125 compiles it; F-292, F-321 name it.
6. Curator: none.

## F-294
1. Sources: none by report; cites Specification-1.0-frozen/basic/components/source-code.tex:380-385, Specification/.../source-code.tex:381-399, apis.tex:252-256, Appendix I "An abstract method of an exported trait" (Specification/appendices/changes.tex:4764 subsection exists).
2. Commit: 8c99e258ef (2026-10-29); 4 blocks.
3. Cited by: P-158; skills: none.
4. Exists: frozen :380-385 reads "for each field declaration and non-abstract method declaration in the exported declaration, a satisfying declaration"; revised :381 starts the same clause (agrees); apis.tex:252 "A matching definition of a declaration d" found. Rows 834 CONTESTED, 839 NEGATIVE-VERIFIED, 842 NEGATIVE-VERIFIED, 844 CONTESTED (entry: "departs in four ways" via these rows; agrees).
5. Said elsewhere: F-297 states the same rule ("asks the component to declare each member its api writes `abstract`"); SK/library.md:47-48 "Another member written `abstract`: by a component member at the api's header, with a body or without one."; F-282.
6. Curator: none; the rule follows P-158.

## F-296
1. Sources: cl/rung-bound-any/REPORT.md sections 5, 6 ok.
2. Commit: 1bc0a9083f (2026-10-30); first block by climb batch 22c's gather; 4 blocks.
3. Cited by: none in FACTS or POSITIONS; skills: sources.md:909.
4. Exists: found ct/ImplicitBoundAny; Shell.java:378 `setExtendsObjectPreDesugaring(false);` agrees; CompilerBuiltin.fsi:37 `abstract opr || (self, b:Object): String`, :55 `print(x:Object)`, :61 `println(x:Object)` agree. Entry: "twelve commands of Shell.java:411-469"; `grep -n 'useCompilerLibraries()' Shell.java` gives lines 377 385 386 415 422 427 437 440 443 446 449 453 460 465 471 496 501 872 873 1119 1120, so 11 call lines lie in 411-469 (12 with :471). Rows 339 NEGATIVE-VERIFIED ("stays open" agrees), 759 FIXED, 832 FIXED (agree).
5. Said elsewhere: F-289 (distance reads the same line); P-42 "A type parameter declared without a bound has the implicit bound `Any`, not `Object`"; SK/SKILL.md:133 "An unbounded type parameter is bounded by `Any`"; SK/compiler.md:193 "Every other command calls `useCompilerLibraries()`".
6. Curator: none.

## F-297
1. Sources: cl/rung-abstract-declared/REPORT.md sections 1, 3, 5 ok; JUDGE.md section 1 ok.
2. Commit: cc47b637d8 (2026-10-30); first block by climb batch 22c's gather; 2 blocks.
3. Cited by: F-282; skills: sources.md:912.
4. Exists: found ct/ExportAbstractGetterField, ExportAbstractMemberBodyless, ExportAbstractMemberDefined, XXXExportAbstractMemberAbsent, XXXExportAbstractMemberOtherHeader; ExportChecker.scala:831 `if ( inAPI.length > inComp.length )`, :863 `equalAbstractMember`, :867 field/getter case agree; Specification/basic/traits.tex:722 "Traits may also include abstract field declarations" agrees. Rows 841, 842 NEGATIVE-VERIFIED (agree).
5. Said elsewhere: SK/library.md:46-48 "A getter written `abstract` ... by a component getter at its header, or by a component field of its name and type that is neither `hidden` nor `private`. A `hidden` field has no getter."; F-282, F-294.
6. Curator: none (the rule is P-158).

## F-298
1. Sources: cl/rung-natives-compiled/REPORT.md "What changed and why" ok; SK/compiler.md "Natives" ok (heading at :105).
2. Commit: 98b04d371e (2026-10-30); first block by climb batch 23's gather; 8 blocks.
3. Cited by: F-32 F-299 F-308 F-322 F-111 F-180; skills: sources.md:934, :935, :1009.
4. Exists: found ct/NativeHelperBindingCompiled, XXXNativeHelperMisfitCompiled, XXXNativeHelperMisspeltCompiled, XXXNativeHelperOutsidePackageCompiled, XXXNativeHelperLocalFunctionCompiled; src/.../nativeHelpers/ dir and compiler/BuiltinPrimitiveRewriter.java found. `NamingCzarJUTest.testForeignOneLibrary` not searched. Rows 845, 865, 882, 883, 884, 885, 886 NEGATIVE-VERIFIED, 849 CONTESTED (entry gives 849 as a refusal case without a status word).
5. Said elsewhere: SK/compiler.md:107 "A body `builtinPrimitive("com.sun.fortress.nativeHelpers.Class.method")` binds one such method, a helper, too. In a compile, at the parse, the compiled path, and not walk, rewrites the body as a call of the method through a generated `import java`"; :108-111 the messages and rows 849, 865; :112 the repository switch (row 882); :114-123 count/distance differences (rows 849, 884).
6. Curator: none (builds P-58).

## F-299
1. Sources: cl/rung-number-objects, rung-natives-walk, rung-natives-self, rung-string-natives REPORTs "What changed and why" ok; cl/climb-batch-28/RECORD.md "The count of the bindings" ok; SK/interpreter.md "Natives" ok.
2. Commit: 640acb4a17 (2026-10-30); first block by climb batch 23's gather; 23 blocks (history rewritten with counts 97/449, now 373/401).
3. Cited by: F-24 F-32 F-303 F-307 F-308 F-310 F-322 F-323 F-327 F-331 F-332 F-333 F-336 F-111 F-180, P-162, P-169; skills: interpreter.md:116, sources.md (10 lines).
4. Exists: found interpreter/glue/StaticNativeApp.java, NativeApp.java, tt/NativeHelperBindingWalk, NativeHelperRaiseWalk, ZZ32DivisionByZeroWalk, NativeHelperFamilyZZ32Walk, NativeHelperCarriedSelfFlatStringWalk, NativeHelperStringRopeWalk, NativeHelperMisspeltWalk, NativeHelperMisfitWalk, NativeHelperUncarriedWalk, NativeHelperNonFlatStringWalk, ct/NativeHelperFamilyStringCompiled. Count today, `grep -rn 'builtinPrimitive("com.sun.fortress.nativeHelpers' Library ProjectFortress/LibraryBuiltin --include=*.fss | wc -l`: 372; without the package: 402 (entry: 373 of 401). Rows 551, 846, 864 NEGATIVE-VERIFIED.
5. Said elsewhere: SK/interpreter.md:114-124 "A helper: a public static method of a class under `nativeHelpers/` ... `interpreter/glue/StaticNativeApp.java` calls it by reflection, with a method's `self` first"; carried types :120-121; refusal messages; F-303 and F-310 state the double and float carriers.
6. Curator: none (builds P-58).

## F-303
1. Sources: cl/rung-natives-float, rung-natives-float-bits, rung-number-objects REPORTs "What changed and why" ok.
2. Commit: 5ecb7a841b (2026-10-31); first block by climb batch 24 gather; 9 blocks (opened as "Float's 30 native bindings").
3. Cited by: F-299 F-311; skills: sources.md:1388.
4. Exists: found tt/NativeHelperFloatCarriedWalk, NativeHelperFamilyFloatWalk, NativeHelperFamilyFloatBitsWalk, ct/NativeHelperFamilyFloatCompiled, NativeHelperFamilyFloatBitsCompiled, nativeHelpers/simpleDoubleArith.java. StaticNativeApp.java:64 `if (t.equals("RR64")) return double.class;` agrees; FortressLibrary.fss:384 `value object RR64`, :4790 `fromRawBits(a:ZZ64):RR64 = builtinPrimitive(...` agree (:384-576 range not walked).
5. Said elsewhere: SK/interpreter.md:120 "`ZZ32`, `NN32` and `Char` in `int`; `ZZ64` and `NN64` in `long`; `RR64` in `double`; `RR32` in `float`"; F-310 "walk carries a declared `RR32` in a `float`"; F-311 "walk carries an `RR64` in a `double` (F-303)".
6. Curator: none.

## F-306
1. Sources: cl/rung-natives-integers/REPORT.md "What changed and why" ok.
2. Commit: 3308aad550 (2026-10-31); first block by climb batch 24 gather; 13 blocks (opened as "ZZ64's 20 and ZZ's 16").
3. Cited by: F-24 F-299; skills: none.
4. Exists: found tt/NativeHelperFamilyIntegersWalk, ZZ64DivisionByZeroWalk, ZZDivisionByZeroWalk, ct/NativeHelperFamilyIntegersCompiled; FortressLibrary.fss:951 `value object ZZ64`, :1170 `value object ZZ` agree. Row 348 NEGATIVE-VERIFIED (agrees).
5. Said elsewhere: F-312 "`REM` and `MOD` ... name helpers ... and throw `DivisionByZero`"; SK/interpreter.md:148 "`DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raise `DivisionByZero`"; F-299 counts ZZ64 31, ZZ 28.
6. Curator: none.

## F-307
1. Sources: cl/rung-natives-small/REPORT.md "What changed and why" ok.
2. Commit: ca14986282 (2026-10-31); first block by climb batch 24 gather; 8 blocks.
3. Cited by: F-299; skills: sources.md:1051, :1137.
4. Exists: found tt/NativeHelperFamilySmallWalk, ct/NativeHelperFamilySmallCompiled, Library/FortressLibrary.fss, LibraryBuiltin/FortressBuiltin.fss; NamingCzar.java:371 `if (isResultType && method_name.equals("charMakeCharacterWithSpecialCompilerHack...` (special names run :371-380 in the file; SK/compiler.md:127 cites the same code as `NamingCzar.java:373-384`, `:494-503`). Row 857 NEGATIVE-VERIFIED (agrees).
5. Said elsewhere: SK/compiler.md:127 "reads `int` as `NN32` or `Char`, and `long` as `NN64`, only for six transfer helpers with fixed names"; SK/revival-changes.md:110 "The low-bits functions `narrow`, `widen`, `signed`, `unsigned` and `big` keep the low bits and never raise"; F-308, F-331.
6. Curator: none.

## F-308
1. Sources: cl/climb-batch-27/RECORD.md "The count of the bindings" ok; rung-natives-hard/REPORT.md "1. What changed and why" ok; SKEPTIC.md "The failure mode" ok; SK/compiler.md "Natives" ok.
2. Commit: b71495ca44 (2026-10-31); first block by climb batch 24 gather; 10 blocks.
3. Cited by: F-24 F-298 F-299 F-312; skills: sources.md:969, :979, :1009.
4. Exists: found ct/NativeHelperTransferCompiled, NativeHelperFamilyNN64Compiled, NativeHelperFamilyCharCompiled, NativeHelperFamilyAsFloatCompiled, NativeHelperFamilyUnsignedCompiled; tt/NativeHelperFamilyNN32Walk, NN32DivisionByZeroWalk (others checked by the same script, none missing). Rows 885, 886 NEGATIVE-VERIFIED (agree). Counts (30, 30, 40, 100) not re-counted.
5. Said elsewhere: SK/compiler.md:127 "The checker ... reads `int` as `NN32` or `Char` ... only for six transfer helpers with fixed names ... So the checker accepts such a binding whatever helper it names, a signed one included, as `simpleIntArith.intLT` for `NN32`'s `<`." (same example as the entry); F-312, F-313 repeat the transfers.
6. Curator: none.

## F-309
1. Sources: cl/plan-24/probes/hard-set.md section 4 ok (the entry's "4.2, '2a'": section 4 exists; the file's line 10 and 20 hold "2a").
2. Commit: d9f2fdfd0a (2026-11-02, climb batch 24's landing); 1 history block, no gather author.
3. Cited by: none (FACTS, POSITIONS, skills).
4. Exists: found src/.../repository/ForeignJava.java; nativewrapper_cache found at default_repository/caches/nativewrapper_cache. Entry says "No test checks it".
5. Said elsewhere: SK/build-and-caches.md:57 "after a change to a native helper's signature, its old wrapper stays in `nativewrapper_cache/`, and the run links the old signature"; SK/compiler.md:109 `NamingCzar.fortressTypeForForeignJavaType`; F-322, F-180 name ForeignJava.
6. Curator: none.

## F-310
1. Sources: cl/rung-natives-rr32/REPORT.md "What changed and why" ok.
2. Commit: 43f1300228 (2026-11-03); first block by climb batch 25 gather; 5 blocks (opened as "RR32's 49 bindings call 46 new helpers").
3. Cited by: F-299; skills: none.
4. Exists: found tt/NativeHelperFamilyRR32Walk, ct/NativeHelperFamilyRR32Compiled; StaticNativeApp.java:65 `if (t.equals("RR32")) return float.class;` agrees; nativeHelpers/simpleFloatArith.java found.
5. Said elsewhere: SK/interpreter.md:120 "`RR64` in `double`; `RR32` in `float`"; F-303; F-299 "`RR32` 51 (F-310, its `asFloat` F-311)".
6. Curator: none.

## F-311
1. Sources: cl/rung-natives-asfloat/REPORT.md "What changed and why" ok.
2. Commit: d2501afefe (2026-11-03); first block by climb batch 25 gather; 6 blocks.
3. Cited by: F-299 F-310; skills: sources.md:1090.
4. Exists: found ct/NativeHelperFamilyAsFloatCompiled, tt/NativeHelperFamilyAsFloatWalk; Specification numbers.tex:61 "is explicit, written asFloat(x) with the method that each of th..." agrees.
5. Said elsewhere: SK/revival-changes.md:112 "The one library departs: each declares `asFloat(self): RR64` instead, so write `asFloat(x)` (F-324)"; SK/library.md:23 "`ZZ64` converts into `RR64` only explicitly, by `asFloat`"; F-324, F-323.
6. Curator: none.

## F-312
1. Sources: cl/rung-natives-remainders/REPORT.md "What changed and why" ok.
2. Commit: 41830b90cf (2026-11-03); first block by climb batch 25 gather; 7 blocks.
3. Cited by: F-24 F-299 F-306; skills: sources.md:1012, :1026, :1521.
4. Exists: found tt/ZZ32RemainderByZeroWalk, ZZ64RemainderByZeroWalk, NN32RemainderByZeroWalk, NN64RemainderByZeroWalk, ZZRemainderByZeroWalk, NativeHelperFamilyRemainderWalk, ct/NativeHelperFamilyRemainderCompiled. Lines: FortressLibrary.fss:910 `opr REM(self,b:ZZ32)`, :1022 ZZ64, :1130 NN64, :1248 ZZ; FortressBuiltin.fss:328 `opr REM(self,b:NN32)` agree.
5. Said elsewhere: SK/interpreter.md:148 "`DIV`, `REM` and `MOD` by zero on `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` raise `DivisionByZero` in t..."; F-306, F-299.
6. Curator: none.

## F-313
1. Sources: cl/rung-natives-unsigned/REPORT.md "1. What changed and why" ok.
2. Commit: f7a33b97bc (2026-11-03); first block by climb batch 25 gather; 2 blocks.
3. Cited by: F-299 F-118 F-305, P-38; skills: sources.md:1008, :1009, :1022.
4. Exists: found ct/UnsignedPrintingCompiled, UnsignedLongToStringHelperCompiled, NN64WrappingNegationHelperCompiled, NativeHelperFamilyUnsignedCompiled, tt/NativeHelperFamilyUnsignedWalk; BuiltinPrimitiveRewriter.java:189 `if (desc.equals("J") && declared.equals("NN64"))` agrees. Row 886 NEGATIVE-VERIFIED (agrees).
5. Said elsewhere: SK/compiler.md:127 (six transfers); SK/revival-changes.md:91 "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist"; F-314 and F-312 name `simpleUnsignedLongArith`.
6. Curator: none.

## F-314
1. Sources: cl/rung-natives-divisors/REPORT.md "1. What changed and why" ok; "5. Old against new" (second quoted heading) not checked by the script (file has 10 numbered sections).
2. Commit: d85bac271c (2026-11-03); first block by climb batch 25 gather; 3 blocks.
3. Cited by: F-32 F-299 F-306; skills: none.
4. Exists: found tt/NativeHelperFamilyDivisorsWalk, ct/NativeHelperFamilyDivisorsCompiled. Rows 75 NEGATIVE-VERIFIED (nanoTime type differs; agrees), 887 NEGATIVE-VERIFIED (CHOOSE 1 where zero rule gives 0; agrees). P-58, P-70, P-73 exist.
5. Said elsewhere: P-70 "`GCD` and `LCM` give nonnegative results"; SK/revival-changes.md:101 "`DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE` and `MINMAX` over integers"; F-306 (ZZ `CHOOSE`, `cmp`), F-299 (`nanoTime`).
6. Curator: none.

## F-315
1. Sources: cl/rung-codegen-walls/REPORT.md sections 1, 2, 5 ok; rv/batch-25-review.md "Where the text, the brief or the principles split" ok.
2. Commit: 8833d89c5f (2026-11-03); first block by climb batch 25 gather; 14 blocks.
3. Cited by: none in FACTS or POSITIONS; skills: sources.md:1007, :1010, :1023, :1025.
4. Exists: found ct/ExtendsGenericAtAnyCompiled.test, ForbidClauseCompiled.test, TestModifierCompiled.test, XXXFinallyOnEscape.test. CodeGen.java:3462-3465 is `index++;` in a parameter loop; `fnDeclCompilableModifiers` is at :3469 and used at :3544 (`grep -n fnDeclCompilableModifiers CodeGen.java`). Rows 889, 890 NEGATIVE-VERIFIED (agree "still refused"; row 890 "finally does not run").
5. Said elsewhere: SK/compiler.md:139 "A `try`'s `forbid` clause lists exception types: an exception of a listed type that no `catch` clause took ..."; compiler.md:84 "a trait or object that extends a generic trait compiles with `Any` as the static argument"; F-374 names forbid.
6. Curator: none.

## F-320
1. Sources: cl/rung-codegen-local-functions/REPORT.md sections 1, 5 ok.
2. Commit: d96242f0af (2026-11-05); first block by climb batch 26 gather; 5 blocks.
3. Cited by: F-181; skills: sources.md:1052, :1059.
4. Exists: found ct/LocalFunctionCallCompiled, LocalFunctionValueCompiled, LocalFunctionRecursiveCompiled, LocalFunctionCaptureCompiled, LocalFunctionGenericContextCompiled, XXXLocalFunctionGenericCompiled, XXXLocalFunctionOverloadedCompiled, XXXLocalFunctionAtomicCompiled (.test); tt/LocalFunction{Call,Value,Recursive,Capture,GenericContext}Walk.fss. Row 304 NEGATIVE-VERIFIED (agrees). Measure on `dbf4825e0` not re-run.
5. Said elsewhere: SK/compiler.md:55-58 "It compiles a local function as a closure, also one that calls itself or another local function of its block. It refuses ..." with the three messages; F-390 (varargs under the one library) named in the entry; F-34 measure.
6. Curator: none.

## F-321
1. Sources: cl/rung-string-natives/REPORT.md "A site that came, and went" ok; cl/rung-system-natives/REPORT.md "The checker over System" ok.
2. Commit: 93884be8d3 (2026-11-05); first block by climb batch 26 gather; 7 blocks (a 2026-11-06 block rewrites after "a site that came, and went").
3. Cited by: F-290, P-164, P-170; skills: SK/compiler.md:129, sources.md:1053, :1060, :1151.
4. Exists: systemOps.java:24 `public static FStringVector getArgs()`, NamingCzar.java:339 maps the FStringVector descriptor, Library/CompilerSystem.fss:13 `import java ...systemOps.getArgs => jGetArgs` agree; Library/FlatString.fss found. `ls Library/CompilerSystem.fss` found.
5. Said elsewhere: SK/compiler.md:129 "`nativeHelpers/systemOps` is such a class: its `getArgs` answers `StringVector`, so the message is 'FortressBuiltin.StringVector is undefined.' (F-321)"; SK/compiler.md:86 prelude has `StringVector`; F-337 ("`args` names `programArgs`").
6. Curator: none.

## F-322
1. Sources: cl/rung-string-natives/REPORT.md "Decisions" ok (entry: item 2); rv/string-natives-2026-11-05.md found (file only).
2. Commit: 410c84ed94 (2026-11-06, record landing of climb batch 26); 1 history block by the landing workflow.
3. Cited by: none (FACTS, POSITIONS, skills).
4. Exists: NamingCzar.java:472 `oneLibraryForeignJavaTranslations` (`grep -n` in compiler/NamingCzar.java) found. Entry says "Read in the code"; no test.
5. Said elsewhere: SK/compiler.md:123 "The checker reads a helper's Java types as the interpreter's library's types: `String` as `String`, not `JavaString`"; SK/interpreter.md:121 "`FlatString` and `JavaString` in `String`, and `String` too, except as a parameter other than `self`"; F-299 (walk refuses a `String` parameter), F-336 and F-343 mention JavaString.
6. Curator: none.

## F-323
1. Sources: cl/rung-natives-float-number/REPORT.md sections 1, 5, 6 ok.
2. Commit: e4872ad938 (2026-11-07); first block by climb batch 27 gather; 4 blocks.
3. Cited by: F-299 F-310; skills: none.
4. Exists: found tt/NativeHelperFloatMixedWalk, NativeHelperRationalArgumentWalk, ct/NativeHelperFamilyFloatMixedCompiled. P-162, P-165 exist (P-165 "`asFloat` and the `=` built on it leave `trait Number`"). Row 872 NEGATIVE-VERIFIED (agrees). Entry says "no row" for the missing `x.asRR64` getter.
5. Said elsewhere: SK/revival-changes.md:112 "each of the eight number types converts into `RR64` by its own getter, `x.asRR64`. The one library departs: each declares `asFloat(self): RR64` instead"; SK/compiler.md:144 "Write `i.asRR64` for a `ZZ32` value `i`" (prelude); F-324.
6. Curator: none.

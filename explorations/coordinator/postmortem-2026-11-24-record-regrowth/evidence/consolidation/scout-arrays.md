<!-- Scout evidence for the `arrays` chunk (F-151..F-185 as listed in chunks.json) of the FACTS consolidation of 2026-11-24: for each entry, where its detail lives, its commit, who cites it, what it names that exists today, where else it is said, and the curator's words. Gathered by a Sonnet scout; no judgement, no rewrite. Heading checks by `facts-extract.sh --check doc:PATH#HEADING` (a bare number matches the section numbered so). Paths under `explorations/` unless full. -->

## F-151
1. Sources: reviews/array-fork2-judgement.md (file ok; 2.5, 2.9, 4 ok; "way 3" not checked as heading).
2. Commit: a74f5a2b7 (numbered 2026-10-13 17:58Z; 7 later rewrites, last 7daf51fe8).
3. Cited by: F-90, F-229. Skills: none.
4. Exists: tests/ArrayElementAlgebra.fss found. Names F-324, F-53, F-227, F-119 (entries, not checked).
5. Said elsewhere: F-94 "The compiled checker checks the array family under the bound `T extends { Number, MultiplicativeRing[\T\] }`"; F-90 "declare the array family's bound ... which F-151 owns"; F-229 "`Vector[\Number,n\]` is not well-formed under the element bound".
6. Curator: history 2026-10-22 12:37Z "by the scrape: status and planning references deleted, at the curator's word of 2026-10-22"; 2026-11-09 11:00Z moved out "It landed when the curator said to land it."

## F-152
1. Sources: reviews/array-design-ways.md, section 2 ok (lines 38-96, 3 matches).
2. Commit: a74f5a2b7.
3. Cited by: none. Skills: none.
4. Exists: rows (`ledger:N`): 24 NEGATIVE-VERIFIED (T^n refused under walk; agrees); 109 NEGATIVE-VERIFIED (Matrix no elementwise product); 292 NEGATIVE-VERIFIED (rank 3 no algebra; agrees); 293 NEGATIVE-VERIFIED (no elementwise x, by design; agrees); 371 NEGATIVE-VERIFIED (excludes not checked against extends under walk; agrees).
5. Said elsewhere: F-151 and FACTS:309 only; no other place states Vector/Matrix are the only algebraic arrays (grep 'only array trait', 'Array3` has no algebra').
6. Curator: none in history.

## F-154
1. Sources: apl/mg/NOTES-swap.md, "What the shared nats catch" ok (lines 70-118; the entry adds ": the mismatch probe", not matched as a longer heading).
2. Commit: a74f5a2b7 (3 blocks).
3. Cited by: none. Skills: none.
4. Exists: row 254 NEGATIVE-VERIFIED, "mismatched DOT ... fails as Failed to find any matching overload, a ProgramError" (agrees).
5. Said elsewhere: F-20 "product, of a 2x3 matrix by a 2x3 matrix, whose inner sizes differ, is a `ProgramError`, 'Failed to find any matching overload', that no `catch` takes (row 254)".
6. Curator: none.

## F-155
1. Sources: apl/mg/NOTES-swap.md, "Departures, each with its evidence" ok (120-195); compile-ladder/rung-walk-generic-pairs/REPORT.md section 5 ok.
2. Commit: a74f5a2b7 (5 blocks).
3. Cited by: F-269, F-252.
4. Exists: apl/mg/elemwise_nat_probe.fss found. Rows: 416 NEGATIVE-VERIFIED (walk applies no instantiation exclusion: g(Tg[\3\]) beside g(Tg[\4\]) refused; agrees); 341 FIXED (library operator overloads checked with the library's own; entry says the probe's x "is refused beside the library's MultiplicativeRing.x (row 341)" without saying fixed).
5. Said elsewhere: interpreter.md:61 "If neither does, it is 'are unrelated (neither subtype, excludes, nor equal)'"; interpreter.md:68 'at least one pair of parameters must have excluding types' (row 780); F-269 "It refuses the Matrix-specialised elementwise x of apl/mg/elemwise_nat_probe.fss (F-155)"; F-257.
6. Curator: none.

## F-156
1. Sources: run-c4/probes/vocabulary/REPORT.md ok; heading "question 5" NOT FOUND as heading (`--check doc:...REPORT.md#5`): it is item (5) bold line under "## The five questions"; "section A" ok ("## A. The table", lines 1-99 match).
2. Commit: a74f5a2b7 (3 blocks; earlier title was about the scalar-extension block, now F-317/F-119).
3. Cited by: none. Skills: none.
4. Exists: explorations/run-c4/src/FlatArrays.fsi found. `grep -n -i -E '\b(reshape|ravel|gather|outer|plane)\b' Library/*.fsi`: only comments on BIG OUTER generators (FortressLibrary.fsi:869-964); no array reshape/plane/gather/ravel declaration (agrees). Names references/library.md (found).
5. Said elsewhere: none found (grep reshape|ravel|gather).
6. Curator: none.

## F-157
1. Sources: reviews/c4-flatarrays-review.md section 1 ok; run-c4/probes/vocabulary/diag-override.md "Result" and "Timings against row 299" ok.
2. Commit: a74f5a2b7 (3 blocks).
3. Cited by: none.
4. Exists: commit b176a4b79 found. Rows: 298 POSITIVE-VERIFIED (own row view costs five times a six-line user view; agrees); 299 POSITIVE-VERIFIED (13-54x; entry says 13x, 58-63x, "row 299, which says 54": entry notes the difference); 58 NEGATIVE-VERIFIED (named in entry text list only).
5. Said elsewhere: F-90 names `TransposedMatrix` as part of the family; no other place states the view idiom.
6. Curator: none.

## F-158
1. Sources: compile-ladder/rung-tabulate/REPORT.md section 2 ok (25-49).
2. Commit: a74f5a2b7 (4 blocks).
3. Cited by: F-49, F-264.
4. Exists: tests/TabulateRungA.fss found. Row 467 FIXED (checker refuses `copy` at StandardMutableArrayType by Meet Rule); entry says "so `copy` is declared on the meet too (row 467)": consistent with fixed.
5. Said elsewhere: library.md:27 "An array's `fill` takes a value, and its `tabulate` a function of the index ... The factories that take a function are `tabulatedArray1` to `tabulatedArray3` and `tabulatedVector`."; F-264 "Vector and Matrix redeclare those two at their own type (F-158)".
6. Curator: none.

## F-159
1. Sources: reviews/array-design-ways.md sections 0, 3 (section 3 ok, lines 98-140; "0" not checked).
2. Commit: a74f5a2b7 (4 blocks; latest rewrite 2026-11-08 02:17Z).
3. Cited by: none. Skills: none.
4. Exists: commit 84aef6a4f found (probes said to be in history before it). Names P-84, P-85, F-27, F-229 (not checked). No row named.
5. Said elsewhere: F-57 "the witness `typecase` ... give a `T` on both paths"; F-59 "with a witness `typecase`, a `typecase` over a `() -> T` function"; F-229 "chosen by a `typecase` over a witness of their result type".
6. Curator: history 2026-11-08 02:17Z "at the curator's word of 02:0x UTC on 2026-11-08, which widened P-84 to every number type's unboxed store and decision A of P-85 with it".

## F-229
1. Sources: compile-ladder/rung-library-factories/REPORT.md sections 1, 3, 4 ok (history also cites its "11. For the curator").
2. Commit: none named; first block 2026-10-14 15:02Z "added", by climb batch 15 gather.
3. Cited by: F-151, F-159. Skills: references/sources.md:795, :1190 (the maintenance file only).
4. Exists: tests ArrayInferredElementVectorWalk, ArrayFactoryNumberTypes, ArrayFactoryAbstractNumber found (ProjectFortress/tests/*.fss). Rows: 729 CONTESTED (agrees, "contested"); 722 FIXED (entry cites it as a past failure of the cast in openRange; consistent). F-379 names the removed `Int`.
5. Said elsewhere: revival-changes.md:99 "The library's factories `array1` and `array2` give a `Vector` or a `Matrix` only at the eight number types; at a program's own number type they give a plain array."; F-151 "`array1` and `array2` have no branch for `Number`"; F-159 "take a witness of their result type, not of the element type, for the reason F-229 gives".
6. Curator: none.

## F-264
1. Sources: compile-ladder/rung-array-sites/REPORT.md sections 1, 5 ok; SKEPTIC.md sections 2, 3 ok.
2. Commit: none named; first block 2026-10-20 08:40Z "added", climb batch 20 gather.
3. Cited by: F-85, F-90, F-285, F-158. Skills: sources.md:761.
4. Exists: tests/VectorMatrixCastsWalk.fss found; Library/FortressLibrary.fss:33 `cast[\T extends Any\](x:Any):T` found (cited :33-37). Names F-158.
5. Said elsewhere: F-90 names `replica` and `freeze` in a test; F-134 and F-250 and F-333 mention `cast[\T\]` for other sites only.
6. Curator: none.

## F-279
1. Sources: compile-ladder/rung-slices-list-equality/REPORT.md sections 1, 5 ok.
2. Commit: none named; 2026-10-23 16:54Z "added", climb batch 21 gather (8 history blocks).
3. Cited by: none.
4. Exists: FortressLibrary.fss lines cited all hold what is said: :2999 `SubArray2[...](self,m0,o0-b0,m1,o1-b1)`, :3401 SubArray3 with o-b, :3380 `subarray[\0,s0,0,s1,0,s2,b0,b1,b2\](1,1,1)`, :2711 `subarray[\0,s0,b0\](1)`, :3083 `(o0', o1') = index(on0 - bo0, on1 - bo1)`. Tests Array2SliceAtNonzeroBase, Array3SliceAtNonzeroBase, XXXArray2ShiftedSlice found. Row 808 NEGATIVE-VERIFIED, "every subscript of a shifted Array2 reads the wrong elements" (agrees).
5. Said elsewhere: none (grep SubArray2, NonzeroBase, ShiftedSlice).
6. Curator: none.

## F-284
1. Sources: compile-ladder/rung-team-demos/REPORT.md section 2 ok.
2. Commit: none named; 2026-10-23 22:46Z "added", climb batch 21b gather (1 block).
3. Cited by: none. Skills: sources.md:844.
4. Exists: Library/Generator22D.fss:144 `ss0 = (s0 (s0+1)) DIV 2`, :145 same, :150 `ss(n) = ((n-1) n) DIV 2` found; tests/Generator22DRects.fss found; Specification/basic/operators/opr-overview.tex:125-128 states integer / gives a rational (found).
5. Said elsewhere: none.
6. Curator: none.

## F-317
1. Sources: reviews/array-design-ways.md section 9 ok (320-325).
2. Commit: none named; 2026-11-05 15:26Z "added" by the coordinator's record worker, split from F-156, review-queue item 259 of 40826f355.
3. Cited by: none.
4. Exists: commits 353818213 (2008-07-28, "Immutable arrays of unboxed RR64."), c2b4e2c95 (2026-09-23), 581356f32 (2026-09-28) found. The comment is at Library/FortressLibrary.fsi:2854-2865 ("the checker sees only Array[\T,I\], so the rank and size of a sized argument are lost"). Names F-119.
5. Said elsewhere: compiler.md:96 "An array of `RR64` values is to be stored as an unboxed `double[]`. The code generator does not build it yet."; FACTS:347 cites another Maessen commit (`76c267f987`) on the number traits.
6. Curator: none.

## F-361
1. Sources: compile-ladder/plan-31/probes/number-object-merge.md "Measurements" and "Obstacles, in the order met" ok.
2. Commit: none named; 2026-11-13 23:38Z "added" by record writer (6 blocks).
3. Cited by: none.
4. Exists: commit 832f7d0d91 found. Test `XXXGenericBesidePlainReturnParam`: not found (`find ProjectFortress -name '*GenericBesidePlainReturnParam*'` gives tests/GenericBesidePlainReturnParam.fss, promoted 2026-11-17, f6e24650e7). Rows 550, 998, 997, 542, 959 all FIXED (agrees with "fixed since"). Names F-379, F-382.
5. Said elsewhere: F-75 and F-375 "With the five number types merged with their objects (P-178, F-379)"; F-379 (the landed state). F-352 and F-353 use other "scratch tree" probes.
6. Curator: none.

## F-368
1. Sources: compile-ladder/rung-toplevel-array-literal/REPORT.md "What changed and why" ok; references/compiler.md ok (compiler.md:42 lists "an array literal, such as `[1 2 3]`" among what the code generator cannot compile). History also cites reviews/batch-32-review.md "Findings that would change a decision of the curator's" (ok, 241-268).
2. Commit: none in first block (2026-11-16 04:36Z "added", climb batch 32 gather); rewrite 567c36dad.
3. Cited by: none.
4. Exists: tests ObjectFieldArrayLiteral, TopLevelArrayLiteral, TopLevelArrayLiteralSize, TopLevelArrayLiteralElement found. Code found: LHSEvaluator.java:160 `topLevelArray`, :126 `libraryArray`; LazilyEvaluatedCell.java:73; BuildEnvironments.java:794. Rows 49, 1022, 1024, 1025 all NEGATIVE-VERIFIED (agree).
5. Said elsewhere: interpreter.md:34 "A `var` declared in a block with an array type and bound to an array literal ... is immutable ... (ledger row 1024)"; interpreter.md:35 "An array literal assigned to a variable ... is not built into an array" (row 1025).
6. Curator: none.

## F-379
1. Sources: compile-ladder/rung-number-objects/REPORT.md "What changed and why", "What a program sees differently" ok.
2. Commit: none named; 2026-11-17 09:18Z "added", climb batch 31b gather (6 blocks).
3. Cited by: F-74, F-75, F-328, F-344, F-375, F-229, F-361. Skills: sources.md:1387, :1388, :1404, :1423, :1455.
4. Exists: Library/FortressLibrary.fss :384 (RR64), :846 (ZZ32), :951 (ZZ64), :1063 (NN64), :1170 (ZZ) each `value object` found; BuildEnvironments.java:459 holds `NATIVE_NUMBER_OBJECTS` list of the five; interpreter/glue/prim/ZZ32.java found; tests NumberTypesAreObjectsWalk, NumberTypeExtendRefusedWalk found. Rows: 959 FIXED, 550 FIXED (agree); 1044 NEGATIVE-VERIFIED, 697 NEGATIVE-VERIFIED (entry says invalid pairs load; agrees).
5. Said elsewhere: revival-changes.md:89 "In both libraries, seven are value objects (P-178): `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64`. In the interpreter's library, `QQ` is a trait"; compiler.md:34 "its seven number types are each one `value object`".
6. Curator: none.

## F-179
1. Sources: coordinator/map/modules-and-phases.md "B.11 The runtime" ok (421-439).
2. Commit: a74f5a2b7 (2 blocks).
3. Cited by: none. Skills: none.
4. Exists: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/tasks, .../evaluator/transactions and .../runtimeSystem found. Row 302 FIXED ("compiled, the scalar RR64 loop bench1 runs 156x primitive Java ... the eager inATransaction debug message ~34 %", fixed 53362cb88 and 42d51c474); entry says "row 302's fix is in the compiled copy only" (consistent).
5. Said elsewhere: SKILL.md:111 "Tasks, transactions and the pool are built twice, independently: for walk in `interpreter/evaluator/tasks/`, and for the compiled path in `runtimeSystem/`."; compiler.md:13 "`runtimeSystem/`: `InstantiatingClassloader`, tasks and transactions."
6. Curator: none.

## F-180
1. Sources: compile-ladder/rung-natives-compiled/SKEPTIC.md "My programs, old against new" ok; perf-probes/prelude/natives-shape.md section 1 ok; perf-probes/prelude/natives-binding-probe.md sections 1, 2 ok.
2. Commit: a74f5a2b7 (8 blocks).
3. Cited by: F-298. Skills: sources.md:942, :959.
4. Exists: interpreter/env/ForeignComponentWrapper.java and ClosureMaker.java found; repository/GraphRepository.java:957 `foreignJava.processJavaImport(comp, i, ins)` found; compiler/NamingCzar.java:367-370 `oneLibraryTypeForForeignJavaType` found. NOT FOUND: `gap5-helper-raise.patch` (`find . -name gap5-helper-raise.patch -not -path './.git/*'`, no output); `nativeHelpers/simpleIntLiteralArith.java` (only ProjectFortress/build/.../simpleIntLiteralArith.class; entry says it was deleted). Row 845 NEGATIVE-VERIFIED (walk component with `import java` of a nativeHelpers method does not run; agrees).
5. Said elsewhere: interpreter.md:141 "An `import java` written in a `.fss` file is wired under walk but unfinished, and no test uses it."; compiler.md:107-109 (builtinPrimitive rewritten to a generated `import java`); F-298, F-299, F-301 ("a written `import java` alias call compile to the same bytes").
6. Curator: none.

## F-181
1. Sources: compile-ladder/rung-codegen-where/REPORT.md sections 1, 2, 5 ok; references/compiler.md "What the compiled path cannot compile yet" (file ok, heading not checked).
2. Commit: a74f5a2b7 (11 blocks; rewrite 5b11849c6 2026-10-18).
3. Cited by: P-151. Skills: sources.md:987.
4. Exists: compiler_tests WhereBoundFunctionCompiled, WhereBoundMethodCompiled, WhereBoundObjectCompiled, WhereBoundTraitMethodCompiled, ComprisesWhereFunctionalMethodCompiled, XXXFunctionContractCodeGeneration, XXXNatOpenRun, XXXWhereVariableCallCompiled all found (.fss and .test). Rows: 701, 781, 774, 307, 867 NEGATIVE-VERIFIED (agree); 812 FIXED (entry says fixed).
5. Said elsewhere: compiler.md:84 "It compiles a declaration whose own header or `extends` entry has a `where` clause, and emits nothing for the clause."; interpreter.md:73, :91 on `where` under walk's check.
6. Curator: none.

## F-182
1. Sources: none cited as a report section; cites explorations/aliases-units-report.md:98-101 (found; shows walk, typecheck and compile all print "bug! Not yet implemented: TypeAlias").
2. Commit: a74f5a2b7 (3 blocks).
3. Cited by: none. Skills: none.
4. Exists: scala_src/typechecker/IndexBuilder.scala:187-189 `case d:TypeAlias`, `TestDecl`, `PropertyDecl` => bug("Not yet implemented: " + d) found. Rows: 18, 121, 122 NEGATIVE-VERIFIED (agree); 120 POSITIVE-VERIFIED (test functions run under `fortress test`).
5. Said elsewhere: SKILL.md:137 "**Specified, but not built:** dimensions and units, `property` declarations, regions and complex numbers."
6. Curator: none.

## F-183
1. Sources: compiler-probes/vectors/vectors.md sections 1, 3, 6, 7 ok.
2. Commit: a74f5a2b7 (3 blocks).
3. Cited by: none. Skills: none.
4. Exists: ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:529 `trait ZZ32Vector`, :548 `trait StringVector` found; compiler_tests DefaultRenderRungS, Compiled2, XXXVecCtorLoad found. Row 408 NEGATIVE-VERIFIED (ZZ32Vector to a generic object's constructor fails at load with NoClassDefFoundError FZZ32Vector$RTTIc; agrees in effect).
5. Said elsewhere: compiler.md:86 "The compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`."; F-129 "a `ZZ32Vector` passed to a generic constructor fails at load (row 408)"; F-321 on `StringVector`.
6. Curator: none.

## F-184
1. Sources: compiler-probes/maybe-inference/inference.md (file ok, no heading cited).
2. Commit: a74f5a2b7 (2 blocks).
3. Cited by: none. Skills: none.
4. Exists: row 331 NEGATIVE-VERIFIED (compiled prelude declares Maybe's empty case as non-parametric `Nothing`; agrees). Names P-90.
5. Said elsewhere: none states the same (F-21 is the Working Draft's bare `Nothing`, refused on both paths).
6. Curator: none.

## F-185
1. Sources: coordinator/map/test-coverage.md A.1, A.4, C.1 ok.
2. Commit: a74f5a2b7 (2 blocks).
3. Cited by: none. Skills: none.
4. Exists: `comm -12` of `ls tests` and `ls other_compiler_tests`: 11 shared names (Exception, atomic0-5, nestedTransactions1-3, typecaseBlockTest); with compiler_tests: none (agrees). ProjectFortress/default_repository/configuration:51 `fortress.unittests.noopt=true` found. The commented-out multi-threaded half is in src/.../tests/unit_tests/TestTask.java:43-44 (TransactionJUTest.java has no comment; it holds one test). "121 .fss files run in no test": not recounted.
5. Said elsewhere: test-coverage.md:125 "`tests/` and `compiler_tests/` share **no** file name at all; `tests/` and `other_compiler_tests/` share 11 names"; test-coverage.md:186 on TestTask.java:43-44; tests-writing.md:53 "`other_compiler_tests/`: the team's compiled tests that do not fit the `CompiledN` series."
6. Curator: none.

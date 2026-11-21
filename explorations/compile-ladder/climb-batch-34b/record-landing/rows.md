<!-- The record-landing workflow's evidence of the gap ledger: each row that a1c244be3..00bde0ee4 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- closed as FIXED: 874, 1062
- rewritten: 994, 995, 1091
- noted: 1017, 1079
- opened: 1098, 1099, 1100, 1101, 1102, 1103

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 874, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: in the one library's world the code generator refuses the whole of FortressLibrary and FortressBuiltin at the wrappers of the helper classes their …
- Claim at the base: in the one library's world the code generator refuses the whole of FortressLibrary and FortressBuiltin at the wrappers of the helper classes their bindings name: 'Can't generate header for method parse with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String'
- Reproducer: `ProjectFortress/one_library_tests/OneLibraryComponents.test`
- Notes now: fixed `f6469d96e`; full text: history, row 874
- The notes gained: fixed `f6469d96e`; full text: history, row 874; they lost: siblings: 368. CodeGenerationPhase makes a wrapper for each method of each class that the rewrite's synthetic import names (repository/ForeignJava.java:807); FortressMethodAdapter.toImplFFFF finds no converter for a one-library type such as FortressLibrary$String or FortressLibrary$ZZ32 (compiler/nativeInterface/FortressMethodAdapter.java:250-268 at 25238e60c), as perf-probes/helper-calls/REPOR...

## Row 994, rewritten (claim, reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the dispatch method of a generic overloaded function of a default library's component names the component's class without the package `fortress`: its first call dies, 'NoClassDefFoundError: FortressLibrary'; seen in the one library at `seq`, `\|xs\|`, and `=` and `<` of strings or `=` of booleans
- Claim at the base: the dispatch method of a generic overloaded function of a default library's component names the component's class without the package `fortress`, so its first call dies, 'NoClassDefFoundError: FortressLibrary'; seen for the one library's `seq` in a tree switched onto it
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryRunStringEquality.test
- Notes now: siblings: 320, 1091. `OverloadSet` builds the owner of a generic function's instance table and its template class's name from the api's bare name at four places (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:904`, `:1361`, `:1724`, `:1728`, at 832f7d0d91); every other place asks `NamingCzar.javaPackageClassForApi`. At 1c62991e66, with the verifier on, the reproducer dies so at `t = "abcd"`, an instance of the library's generic `=` over `StandardPartialOrder`; with it off, `OneLibraryVarargsCount.fss` dies so at `\|xs\|`. Repair shown in the rehearsal (W11): the four places call `javaPackageClassForApi`.
- The notes gained: 320, 1091. `OverloadSet` builds the owner of a generic function's instance table and its template class's name from the api's bare name at four places (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:904`, `:1361`, `:1724`, `:1728`, at 832f7d0d91); every other place asks `NamingCzar.javaPackageClassForApi`. At 1c62991e66, with the verifier on, the reproducer dies so at `t = "abcd"`, an instance of the library's generic `=` over `StandardPartialOrder`; with it off, `OneLibraryVarargsCount.fss` dies so at `\|xs\|`. Repair shown in the rehearsal (W11): the four places call `javaPackageClassForApi`.; they lost: 320. `OverloadSet` builds the owner of a generic function's instance table and its template class's name from the api's bare name at four places (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:904`, `:1361`, `:1724`, `:1728`, at 832f7d0d91); every other place asks `NamingCzar.javaPackageClassForApi`. Seen only in the rehearsal's scratch tree (`explorations/compile-ladder/plan-3...

## Row 995, rewritten (claim, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: on the compiled path a type that a hand-written class carries, other than an object over a payload class, has two names at run time: its `RTTIc` holds the trait's interface, descriptors the carrier, so a static argument inferred from a value's run-time type makes another instance
- Claim at the base: on the compiled path a type that a hand-written class carries, other than the seven number types, has two names at run time: its `RTTIc` holds the trait's interface, descriptors the carrier, so a static argument inferred from a value's run-time type makes another instance than compiled code names
- Reproducer: none
- Notes now: siblings: 874, 866, 566, 496. An object over a payload class has one name, its RTTI named by the payload class (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6306-6312`): the prelude's seven number types, and the one library's seven with its `Boolean`, `Char` and `FlatString` (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:637-655` at f3439cf7ce); tests `ComprisesMeetGenericTrait`, `GenericBesidePlainZZ32`. The prelude's `Boolean`, `Character` and `JavaString`, both libraries' readers and writers, and the one library's stores keep two names; no program shows it. First seen switched onto the one library (`plan-31/probes/switch-rehearsal.md`, W12).
- The notes gained: An object over a payload class has one name, its RTTI named by the payload class (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6306-6312`): the prelude's seven number types, and the one library's seven with its `Boolean`, `Char` and `FlatString` (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:637-655` at f3439cf7ce); tests `ComprisesMeetGenericTrait`, `GenericBesidePlainZZ32`. The prelude's `Boolean`, `Character` and `JavaString`, both libraries' readers and writers, and the one library's stores keep two names; no program shows it. First seen switched onto the one library (`plan-31/probes/switch-rehearsal.md`,; they lost: Each of the seven number types is a value object whose class extends its payload class, its RTTI named by the payload class (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6301`); tests `ComprisesMeetGenericTrait`, `GenericBesidePlainZZ32`, whose casts on the base's code named `⟦fortress\|CompilerBuiltin%ZZ32⟧`. The other carried types, `Boolean`, `Character`, `JavaString`...

## Row 1017, noted

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on both paths a numeral beside a declaration whose parameter is a type parameter without a bound does not go to a more specific one that its own coercion reaches: `g(5)` for `g[\T\](x: T)` beside `g(x: NN32)` runs the generic declaration at `ZZ32`, where beside `k(x: Any)` it runs `k(x: NN32)`
- Reproducer: `ProjectFortress/tests/XXXNumeralBesideTypeParameterWalk.fss`
- Notes now: siblings: 973. Both paths seek a declaration below the fitting one only where that one has the numeral at a parameter not of its default type, and read the instance's type, `ZZ32`, not the declared `T` (`open`, `scala_src/typechecker/impls/Functionals.scala:827-831`; `OverloadedFunction.belowByNumerals`, `:2378-2385`, at 5e436b5b19). Walk and the compiled run on the prelude print `generic` (compiled: a probe, not kept). Under walk `va(5)` for `va(xs: Any...)` beside `va(x: NN32)` prints `anys` (compiled: F-390; under the selection it does not run yet, row 1091). The repair reaches every numeral at a generic declaration (P-148). Workaround: `n: NN32 = 5`, then `g(n)`.
- The notes gained: run yet, row 1091).; they lost: run, row 1062).

## Row 1062, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: a program compiled against the one library under `FORTRESS_LIBRARY=one` does not run: the one library has no jars, and the run dies at its first …
- Claim at the base: a program compiled against the one library under `FORTRESS_LIBRARY=one` does not run: the one library has no jars, and the run dies at its first library class, 'NoClassDefFoundError: fortress/FortressLibrary$String', before `run()` prints
- Reproducer: `ProjectFortress/one_library_tests/OneLibraryRunHello.test`
- Notes now: fixed `f6469d96e`; full text: history, row 1062
- The notes gained: fixed `f6469d96e`; full text: history, row 1062; they lost: siblings: 874, 624, 315, 1061. The compile writes only the program's jar, `default_repository/caches-one/bytecode_cache/OneLibraryHalf.jar`; no compile writes the one library's (F-34): row 874 stops `FortressLibrary` and `FortressBuiltin` at the wrappers. F-352's second kind of walls (rows 995, 994, 993) follow. The code generator makes the one library's `ZZ32` from a JVM int as `FZZ32.make`, w...

## Row 1079, noted

- Section: 15. Performance and program shape. Status: NEGATIVE-BOUNDED. Class: design limit (library).
- Claim: compiled, `array1[\RR64,n\]` makes the `Array1` classes of all eight number types at each new size `n`, since its `typecase` tests one arm after another, `RR64` last, and each test loads its arm's classes: 269 classes made for the arrays page's `Dot`, 153 for `Arr`
- Reproducer: explorations/reviews/arrays-primer-2026-11-17.md
- Notes now: Seen once, in the page's scratch tree (the reproducer, sections 6 and 11), by the loader's flag `fortress.bytecodes.expanded.directory`, which saves the classes it makes. `array1` (`Library/FortressLibrary.fss:2845-2856`; F-229) tests `__thrower[\Array1[\T,0,s0\]\]` against `() -> Array1[\X,0,s0\]` for the eight number types in turn, `ZZ32` first. `Dot`, over `Array1[\RR64,0,1000\]`, made `Array1⟦X,0,1000⟧` for all eight; `Arr`, at `ZZ32`, only `Array1⟦FZZ32,0,8⟧`. A size is part of an instance class's name, so each new size pays again. Its time is not measured. Not reproducible on main yet, where `Arr` and `Dot` stop at rows 994 and 1091 against the one library. The compiled path only.
- The notes gained: main yet, where `Arr` and `Dot` stop at rows 994 and 1091 against the one library.; they lost: main, where no program runs against the one library (row 1062).

## Row 1091, rewritten (claim, status, reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED at the base, NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: against the one library a trait's class of default methods holds a method twice with one descriptor, its own and one inherited from a generic trait at its own type, so it fails to load with the verifier on: 'ClassFormatError: Duplicate method name', as `Vector`'s `-` and `ImmutableArray1`'s `copy`
- Claim at the base: against the one library the template class of `Vector`'s default methods holds the prefix `-` twice with one descriptor, its own and the one inherited from `AdditiveGroup`, so each instance fails to load with the verifier on: 'ClassFormatError: Duplicate method name "-☞0"'
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryRunVarargs.test
- Notes now: siblings: 990, 571, 994, 1099. `Vector`'s `opr -(self)` (`Library/FortressLibrary.fss:2799`) beside `AdditiveGroup`'s; `ImmutableArray1`'s `copy()` (`:2667`) beside `StandardImmutableArrayType`'s `copy():T` (`:2584`). Each varargs call's array is an `ImmutableArray1`, so no program that calls a varargs declaration runs (f3439cf7ce); with the verifier off the JVM does not check it, and the program dies at row 994. Two small programs of `Vector`'s shape ran against the prelude. The compiled path only.
- The notes gained: 571, 994, 1099. `Vector`'s `opr -(self)` (`Library/FortressLibrary.fss:2799`) beside `AdditiveGroup`'s; `ImmutableArray1`'s `copy()` (`:2667`) beside `StandardImmutableArrayType`'s `copy():T` (`:2584`). Each varargs call's array is an `ImmutableArray1`, so no program that calls a varargs declaration runs (f3439cf7ce); with the verifier off the JVM does not check it, and the program dies at row 994. Two small programs of `Vector`'s shape; they lost: 571. `Library/FortressLibrary.fss:2799` in `trait Vector` (`:2784`). Seen in the planner's scratch tree on ba3c7c876d's code with `plan-34/probes/rehearsal-34.patch` (wall 7); with the verifier off both programs run. Two small programs of a self-typed trait's `-` with a body beside a generic trait's own `-`

## Row 1098, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: CONTESTED. Class: implementation gap (codegen).
- Claim: on the compiled path a call of an api function that its component implements only by a declaration of wider parameter type dies, 'NoSuchMethodError', naming the api's declaration: `println(q)` for `q: QQ` names the one library's `println(a:Number)`, met by `println(a:Any)`
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryRunHalf.test
- Notes: siblings: 834, 769. The export check drops an api declaration that another of its overloads covers (`uncoveredDeclarations`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:281-285` at 1f8a67251d); the text asks a set of declarations whose parameter types' union is the exported one's (`source-code.tex:356-361`), a team note beside it a wider one (`:364-369`). Not decided: the text's rule, or the check's with a bridge. `Library/FortressLibrary.fsi:2725-2730` against `.fss:4798-4810`. The prelude too: an api `pick(x: ZZ32)` and `pick(x: Object)`, a component `pick(x: Object)`, `pick(3)` dies; walk prints 1.

## Row 1099, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: against the one library the class of `FullScalarRange`'s default methods holds `narrowToRange` twice at one descriptor, a bridge for each parent declaring it at a wider return type, so it fails to load with the verifier on: 'ClassFormatError: Duplicate method name "narrowToRange"'
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryRunConditionalReduction.test
- Notes: siblings: 1091, 990, 790. `trait FullScalarRange` (`Library/RangeInternals.fss:1008-1010`) extends three `ScalarRangeWith…` traits and `FullRange[\ZZ32\]`; in `RangeInternals.jar` (javap of `RangeInternals$FullScalarRange$DefaultTraitMethods`, 1f8a67251d) the two methods `narrowToRange(Range⟦FZZ32⟧): BoundedRange⟦FZZ32⟧` are alike, each calling the interface's `narrowToRange` answering `FullRange⟦FZZ32⟧`. With the verifier off the program dies at row 994. The compiled path only.

## Row 1100, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: the dispatch method of the one library's `denominator(self)`, abstract in `QQ`, a body in `Ratio`, takes `Ratio` as its parameter type when `FortressLibrary` compiles after other programs in one JVM, and `QQ`'s default methods fail verification: 'VerifyError: Bad type on operand stack' in `isFinite`
- Reproducer: none
- Notes: siblings: 1047, 499. `Library/FortressLibrary.fss:643`, `:729`. `ant testFast`'s onelibrary track on 1f8a67251d, the components compiled after the track's program tests: every run test died, 'Type 'fortress/FortressLibrary$QQ' (current frame, stack[0]) is not assignable to 'fortress/FortressLibrary$Ratio'', isFinite's `invokestatic` of `denominator{…643…,…729…}` at `(Lfortress/FortressLibrary$Ratio;)`; compiled first in a fresh JVM (junit.sh, and the track from f3439cf7ce, which compiles the components first) it takes `QQ`. Not traced further.

## Row 1101, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: against the one library a compiled generic body's `u.asString`, for `u` of a type parameter bounded by `ZZ32`, dies, 'NoSuchMethodError: 'fortress.FortressLibrary$String ...FZZ32.asString()'': the payload class answers `asString` only at the prelude's `String`
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryRunGenericAsString.test
- Notes: siblings: 321, 1102. Generic code calls a number's getter on the payload class; `FZZ32.asString` answers `FJavaString` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:27`), compiled against the first set's `FValue`, whose `asString` answers the prelude's `String`; the second set's answers `FValue` (`ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/FValue.java:27`, at 1c62991e66). Against the prelude the call runs (`compiler_tests/Compiled17a`); walk prints `<5>`. The second set's `asString` typed at the library's `String` runs it in a scratch run, but makes `FValue.toString` recurse on a `CatString` (1102). The compiled path only.

## Row 1102, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED. Class: implementation gap (runtime).
- Claim: against the one library a compiled program's uncaught exception is reported with the run time's placeholder, 'FortressException: class fortress.FortressLibrary$IntegerOverflow with string Bogus value from FValue.asString()', where the prelude's report gives the exception's `asString`
- Reproducer: ProjectFortress/one_library_tests/OneLibraryUncaughtRaise.test
- Notes: siblings: 1101, 321. The second set's `FException` calls `FValue.asString()` (`ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/FException.java:27`, `:35`, at 1c62991e66), typed at `FValue`; the exception's getter answers the library's `String`, so it overrides nothing: so does every Java `toString` of a one-library value. The specification does not say how a program's abrupt completion is reported (`basic/evaluation/completion.tex`). Typed at the library's `String`, a scratch run reports 'with string Integer Overflow', but a caught `fail` of a 481-character string dies of `StackOverflowError`: a `CatString`'s `asString` is itself (`Library/FortressLibrary.fss:4599`).

## Row 1103, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: on the compiled path an exception object without value parameters that a helper raises is a second instance of the object, so a caught `IntegerOverflow` or the one library's `FileNotFoundException` is not `SEQV` the object; walk gives the object itself
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryRunHelperRaiseSingleton.test
- Notes: siblings: 1102. `Utility.makeFortressException(name)` makes the exception by its constructor without parameters (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/Utility.java:66-69`, at 1c62991e66), as on the base for the prelude, and the rung's fallback for an object without a constructor over `String` does the same (`:49-51`); the code generator keeps an object's one instance in its static field `ONLY` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5100-5106`). The prelude too: a compiled `catch e IntegerOverflow => e SEQV IntegerOverflow` answers false on the base and on the head; walk answers true. The compiled path only.

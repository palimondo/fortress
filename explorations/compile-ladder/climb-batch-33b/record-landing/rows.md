<!-- The record-landing workflow's evidence of the gap ledger: each row that c79985147..8c13a52ec opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 304, 1062
- closed as FIXED: 315, 566, 624, 698, 866, 940, 942, 1003, 1061
- rewritten: 496, 995
- opened: 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 304, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator compiles a local function as a closure, but refuses three forms that the specification allows: a local function with static parameters of its own, two local functions of one name in a block, and the `atomic` modifier
- Reproducer: `ProjectFortress/compiler_tests/XXXLocalFunctionGenericCompiled.test`
- Notes now: siblings: 701, 865. `CodeGen.forLetFn` throws 'Can't compile a local function with static parameters of its own yet', 'Can't compile overloaded local functions yet' and 'Can't compile a local function with this modifier yet' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3588-3592` at d96242f0a), after the checker passes each program. Other reproducers: `XXXLocalFunctionOverloadedCompiled.test`, `XXXLocalFunctionAtomicCompiled.test`. Also refused there: a helper binding (row 865), a contract (row 701). Walk: only without static parameters (row 1020). Workaround: lift the function to component level, or give each overload its own name.
- The notes gained: 701, 865. `CodeGen.forLetFn` throws 'Can't compile a local function with static parameters of its own yet', 'Can't compile overloaded local functions yet' and 'Can't compile a local function with this modifier yet' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3588-3592` at d96242f0a), after the checker passes each program. Other reproducers: `XXXLocalFunctionOverloadedCompiled.test`, `XXXLocalFunctionAtomicCompiled.test`. Also refused there:; they lost: 624, 701, 865. `CodeGen.forLetFn` throws 'Can't compile a local function with static parameters of its own yet', 'Can't compile overloaded local functions yet' and 'Can't compile a local function with this modifier yet' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3588-3592` at d96242f0a), after the checker passes each program. Other reproducers: `XXXLocalFunctionOverloa...

## Row 315, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-BOUNDED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator writes two closure classes under one name where two function expressions share a source position, and the compile dies with …
- Claim at the base: the code generator writes two closure classes under one name where two function expressions share a source position, and the compile dies with `ZipException: duplicate entry`: the one library's `LexicographicOrder` and `List`, at `BIG AND [(a,b) <- self.zip[\E\](other)] a = b`
- Reproducer: `ProjectFortress/one_library_tests/OneLibraryConditionalReduction.test`
- Notes now: fixed `5af98dbca`; the thunk of a conditional operator's right operand, or of a binding if's else part, and a reduction's outer closure shared the reduction's span; a later function expression at a span takes #2, #3; compiler_tests/ConditionalReductionCompiled.test runs the form under the prelude, a program's own conditional operator over a SUM, and compiler_tests/ArrowCoercionFnExprCompiled.test an arrow coercion's function expression around a function expression argument; full text: history, row 315
- The notes gained: fixed `5af98dbca`; the thunk of a conditional operator's right operand, or of a binding if's else part, and a reduction's outer closure shared the reduction's span; a later function expression at a span takes #2, #3; compiler_tests/ConditionalReductionCompiled.test runs the form under the prelude, a program's own conditional operator over a SUM, and compiler_tests/ArrowCoercionFnExprCompiled.test an arrow coercion's function expression around a function expression argument;; they lost: siblings: 565. The name comes from the source position alone (`NamingCzar.gensymArrowClassName`, `compiler/NamingCzar.java:892`). At 84f1c37190 only the library's two sites show it, under the measure: 'duplicate entry: FortressLibrary$\=fn@2227\!12-52??.class' (`Library/List.fss:128` alike); which two nodes share the span is not traced, and the prelude cannot write the form (no `zip`, no `BIG A...

## Row 496, rewritten (claim, reproducer, notes)

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a generic declaration beside a plain one dies compiled when reached through an argument of static type `Any`: `grab[\X\](t: Tag[\X\]): Marker[\X\]` beside `grab(a: Any)`, at a program's object `Red`, casting to `Marker⟦X⟧`
- Claim at the base: a generic declaration beside a plain one dies compiled when reached through an argument of static type `Any`: `peek[\X\](t: Tag[\X\])` beside `peek(a: Any)` on the `ZZ32` spelling, `grab[\X\](t: Tag[\X\]): Marker[\X\]` beside `grab(a: Any)` casting to `Marker⟦X⟧`
- Reproducer: `ProjectFortress/compiler_tests/XXXGenericBesidePlainStatic.test`
- Notes now: siblings: 495, 538, 699, 995. The specification and walk run the generic declaration. The dispatcher is not a template, so its arms are not called at the template's parameters (`OverloadSet.java:1402-1413`), and it is not passed the static return type (`:2048` at c124c6b65; PLAN phase 5). At `ZZ32`, `peek[\X\](t: Tag[\X\])` beside `peek(a: Any)` runs the generic declaration (`GenericBesidePlainZZ32`). Also: `k(x: ZZ64): ZZ64` beside `k[\T\](x: T): T` called at `ZZ32` dies at load, 'VerifyError: Bad return type' (`explorations/compile-ladder/rung-inference-checker/probes/skeptic/S2CtxConvWinsZ.fss`, in the parent of `ab067d9b6`); walk refuses that set. full text: history, row 496
- The notes gained: 699, 995. The specification and walk run the generic declaration. The dispatcher is not a template, so its arms are not called at the template's parameters (`OverloadSet.java:1402-1413`), and it is not passed the static return type (`:2048` at c124c6b65; PLAN phase 5). At `ZZ32`, `peek[\X\](t: Tag[\X\])` beside `peek(a: Any)` runs the generic declaration (`GenericBesidePlainZZ32`).; they lost: 699. The specification and walk run the generic declaration. The dispatcher is not a template, so its arms are not called at the template's parameters (`OverloadSet.java:1342-1353`), and it is not passed the static return type (`:2048` at c124c6b65; PLAN phase 5). How a call resolved to the plain declaration reaches the generic one is not traced. Also gated: `XXXGenericBesidePlainStatic`.

## Row 566, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the compiled dispatch among functional methods of traits with static parameters casts the argument to the wrong instance and dies with …
- Claim at the base: the compiled dispatch among functional methods of traits with static parameters casts the argument to the wrong instance and dies with `ClassCastException`
- Reproducer: `ProjectFortress/compiler_tests/ComprisesMeetGenericTrait.test`
- Notes now: fixed `75f9f2fbf`; passes under the default hash mode and under -XX:hashCode=0 (fork N5); full text: history, row 566
- The notes gained: fixed `75f9f2fbf`; passes under the default hash mode and under -XX:hashCode=0 (fork N5);; they lost: siblings: 546, 571. Row 546's family as functional methods (`tag(self)` in each trait, `object Vo extends V[\ZZ32\]`), which the checker accepts and which links (`ComprisesMeetGenericTraitLink`), dies with 'ClassCastException: class ...$Vo cannot be cast to class ...$\=V?fortress\|CompilerBuiltin\%ZZ32?'; walk prints 'tag(s) = 3' and 'PASS'. Not traced.

## Row 624, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator does not compile a function or a method with a varargs parameter: a top-level function stops with "Can't compile VarArgs yet", a …
- Claim at the base: the code generator does not compile a function or a method with a varargs parameter: a top-level function stops with "Can't compile VarArgs yet", a trait method with `OptionUnwrapException`
- Reproducer: `ProjectFortress/one_library_tests/OneLibraryVarargsCount.test`
- Notes now: fixed `e9bc2ed3e`; under the selection; OneLibraryVarargsOverloaded, OneLibraryVarargsMethod, OneLibraryVarargsOperator and OneLibraryVarargsLocalFunction beside it. Against the compiler's prelude, which declares no ImmutableArray (P-37), the code generator still refuses a varargs declaration, 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, the type of a varargs parameter' (compiler_tests/XXXVarargsCodeGeneration.test, XXXVarargsMethodCodeGeneration.test). Under the selection, an overloaded varargs method, or a generic varargs function, beside another of its name with as many parameters still stops (row 1086); full text: history, row 624
- The notes gained: fixed `e9bc2ed3e`; under the selection; OneLibraryVarargsOverloaded, OneLibraryVarargsMethod, OneLibraryVarargsOperator and OneLibraryVarargsLocalFunction beside it. Against the compiler's prelude, which declares no ImmutableArray (P-37), the code generator still refuses a varargs declaration, 'Can't compile VarArgs yet: the library in use, CompilerLibrary, declares no ImmutableArray, the type of a varargs parameter' (compiler_tests/XXXVarargsCodeGeneration.test, XXXVarargsMethodCodeGeneration.test). Under the selection, an overloaded varargs method, or a generic varargs function, beside another of its name with as many parameters still stops (row 1086);; they lost: siblings: 304, 604. `NamingCzar` throws it (`compiler/NamingCzar.java:1308`, `:1318`, `:1458`, `:1569` at c124c6b65), and `CodeGen.forLetFn` for a local function (`CodeGen.java:3597`); for a method `jvmSignatureFor` unwraps every parameter's type (`NamingCzar.java:945`). `XXXVarargsMethodCodeGeneration` holds a trait's method. A varargs call stops its caller too: the one library's `test stringi...

## Row 698, closed as FIXED

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (prelude).
- Claim: the compiler prelude's `trait ZZ32` lists no `comprises` clause, so `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)` over a user trait `List` is …
- Claim at the base: the compiler prelude's `trait ZZ32` lists no `comprises` clause, so `add(a: ZZ32, b: ZZ32)` beside `add(a: List, b: List)` over a user trait `List` is refused by the compiled Meet Rule, where walk, on the one library whose `ZZ32` is an object, runs the pair
- Reproducer: `ProjectFortress/compiler_tests/OverloadZZ32BesideUserTraitCompiled.test`
- Notes now: fixed `75f9f2fbf`; full text: history, row 698
- The notes gained: fixed `75f9f2fbf`; full text: history, row 698; they lost: siblings: 866. 'Invalid overloading of add in component ...: (List, List)->List ... and (ZZ32, ZZ32)->ZZ32', the talk's slide 2 set (`explorations/reviews/popl2019-examples.md`). The prelude declares `trait ZZ32 ... excludes { ZZ64, RR32, RR64 }` with no `comprises` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`, at c124c6b65); the one library declares `value object ZZ32` (`Library/F...

## Row 866, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (prelude).
- Claim: on the compiled path, a program's object that extends `ZZ32` compiles, and its run dies when the object's class loads: `MyNum + 1`, for `object MyNum …
- Claim at the base: on the compiled path, a program's object that extends `ZZ32` compiles, and its run dies when the object's class loads: `MyNum + 1`, for `object MyNum extends ZZ32`, ends 'IncompatibleClassChangeError: class ...$MyNum can not implement ...FZZ32, because it is not an interface'
- Reproducer: `ProjectFortress/compiler_tests/XXXNumberTypeExtendRefusedCompiled.test`
- Notes now: fixed `75f9f2fbf`; full text: history, row 866
- The notes gained: fixed `75f9f2fbf`; full text: history, row 866; they lost: siblings: 551, 698. The prelude's `trait ZZ32` lists no `comprises` clause (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`), so the checker takes the extender; `FZZ32` is a class (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14`, at c124c6b65). The one library's `ZZ32` is a `value object` (`Library/FortressLibrary.fsi:572`), so walk refuses such an object at...

## Row 940, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator stops, 'Not in the trait table: S', at a type assumption of an imported api's trait that declares the called method twice or more: …
- Claim at the base: the code generator stops, 'Not in the trait table: S', at a type assumption of an imported api's trait that declares the called method twice or more: a functional call whose arguments are all assumptions, as `tag(O asif S, "d" asif String)`, or a dotted call at an assumed receiver
- Reproducer: `ProjectFortress/compiler_tests/AsIfApiTraitCompiled.test`
- Notes now: fixed `90ee716db`; full text: history, row 940
- The notes gained: fixed `90ee716db`; full text: history, row 940; they lost: siblings: 733, 941, 942. `methodsNamed` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6469` at 157323e51) gathers the assumed trait's methods with `STypesUtil.allMethodsNotIdenticallyCovered`, whose entries for the trait's own declarations lack the api; `removeIdenticallyCoveredMethods` compares two of one name (`STypesUtil.scala:1587`), and the trait table, over the comp...

## Row 942, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator stops, 'Not in the trait table: B', on an object that declares a functional method beside one of its name that it inherits, with a …
- Claim at the base: the code generator stops, 'Not in the trait table: B', on an object that declares a functional method beside one of its name that it inherits, with a body, from an imported api's trait, the two overloading validly, as `tag(self, n: ZZ32)` in `object O extends B` beside `B`'s `tag(self, s: String)`
- Reproducer: `ProjectFortress/compiler_tests/ApiTraitOverloadCompiled.test`
- Notes now: fixed `90ee716db`; full text: history, row 942
- The notes gained: fixed `90ee716db`; full text: history, row 942; they lost: siblings: 733, 732, 940. Stack: `TypeAnalyzer.typeCons` ← `OverloadingOracle.lteq` ← `OverloadSet.fLessSpecThanG` (`ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:532`) ← `OverloadSet.split` ← `CodeGen.generateTopLevelOverloads` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7168` at 157323e51) ← `forObjectDeclPrePass` (`:4677`), before `dumpMethodChaining`...

## Row 995, rewritten (claim, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: on the compiled path a type that a hand-written class carries, other than the seven number types, has two names at run time: its `RTTIc` holds the trait's interface, descriptors the carrier, so a static argument inferred from a value's run-time type makes another instance than compiled code names
- Claim at the base: on the compiled path a type that a hand-written class carries has two names at run time: its `RTTIc` holds the trait's interface, and compiled descriptors name the carrier class, so a static argument inferred from a value's run-time type makes another instantiation than the one compiled code names
- Reproducer: none
- Notes now: siblings: 874, 866, 566, 496. Each of the seven number types is a value object whose class extends its payload class, its RTTI named by the payload class (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6301`); tests `ComprisesMeetGenericTrait`, `GenericBesidePlainZZ32`, whose casts on the base's code named `⟦fortress\|CompilerBuiltin%ZZ32⟧`. The other carried types, `Boolean`, `Character`, `JavaString` and the rest (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:589-602`), keep the two names; no program shows it for them. First seen switched onto the one library (`explorations/compile-ladder/plan-31/probes/switch-rehearsal.md`, W12).
- The notes gained: 866, 566, 496. Each of the seven number types is a value object whose class extends its payload class, its RTTI named by the payload class (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6301`); tests `ComprisesMeetGenericTrait`, `GenericBesidePlainZZ32`, whose casts on the base's code named `⟦fortress\|CompilerBuiltin%ZZ32⟧`. The other carried types, `Boolean`, `Character`, `JavaString` and the rest (`ProjectFortress/src/com/sun/fortress/compiler/NamingCzar.java:589-602`), keep the two names; no program shows it for them. First seen switched onto the one library (`explorations/compile-ladder/plan-31/probes/switch-rehearsal.md`, W12).; they lost: 866. `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5999` (`cnb.classDesc`), at 832f7d0d91. Seen only in a scratch tree switched onto the one library, whose tables made `FZZ32` the carrier of `ZZ32` (`explorations/compile-ladder/plan-31/probes/switch-rehearsal.md`, W12): the dispatch of the generic `seq` infers `E` from a range's `Generator[\ZZ32\]`, 'ClassCastException: …...

## Row 1003, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: design limit (prelude).
- Claim: the compiler's prelude declares each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` as an open trait, not as the one `value object` of P-178 that the one …
- Claim at the base: the compiler's prelude declares each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` as an open trait, not as the one `value object` of P-178 that the one library and walk declare
- Reproducer: `ProjectFortress/compiler_tests/NumberObjectsCompiled.test`
- Notes now: fixed `75f9f2fbf`; full text: history, row 1003
- The notes gained: fixed `75f9f2fbf`; full text: history, row 1003; they lost: siblings: 866, 698, 1000, 542, 959. The prelude's traits: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103`, `:147`, `:210`, `:332`, `:401`, at 046c410c43; a program's object below `ZZ32` compiles against them (row 866). The one library's objects: `Library/FortressLibrary.fss:384`, `:846`, `:951`, `:1063`, `:1170`, walk's values made by the classes of their names (`ProjectFortress/src/co...

## Row 1061, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: with the compile command switched onto the one library, a program that names one of its generic traits stops the code generator, 'Not in the trait …
- Claim at the base: with the compile command switched onto the one library, a program that names one of its generic traits stops the code generator, 'Not in the trait table: Array1', for `a = array1[\ZZ32, 8\]()`: a method entry names the trait without its api
- Reproducer: `ProjectFortress/one_library_tests/OneLibraryArray1.test`
- Notes now: fixed `90ee716db`; full text: history, row 1061
- The notes gained: fixed `90ee716db`; full text: history, row 1061; they lost: siblings: 940, 942. Stack: `TypeAnalyzer.typeCons` ← `normalize` ← `lteq` ← `STypesUtil.removeIdenticallyCoveredMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1584-1588`, at c3b16ef2d1). Seen with probe Y's two lines of the selector alone and a private caches folder, where a program of one `println`, and one that binds a `QQ`, compile. With the trait table's s...

## Row 1062, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a program compiled against the one library under `FORTRESS_LIBRARY=one` does not run: the one library has no jars, and the run dies at its first library class, 'NoClassDefFoundError: fortress/FortressLibrary$String', before `run()` prints
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryRunHalf.test
- Notes now: siblings: 874, 624, 315, 1061. The compile writes only the program's jar, `default_repository/caches-one/bytecode_cache/OneLibraryHalf.jar`; no compile writes the one library's (F-34): row 874 stops `FortressLibrary` and `FortressBuiltin` at the wrappers. F-352's second kind of walls (rows 995, 994, 993) follow. The code generator makes the one library's `ZZ32` from a JVM int as `FZZ32.make`, where its descriptors name `FortressLibrary$ZZ32` (fork N4). `bin/run_classpath` takes the caches folder of the selection, so a run without it finds no jar: 'Could not load OneLibraryHalf'. `one_library_tests/XXXOneLibraryRunConditionalReduction.test` and `XXXOneLibraryRunVarargs.test` fail so.
- The notes gained: wrappers. F-352's second kind of walls (rows 995, 994, 993) follow. The code generator makes the one library's `ZZ32` from a JVM int as `FZZ32.make`, where its descriptors name `FortressLibrary$ZZ32` (fork N4). `bin/run_classpath` takes the caches folder of the selection, so a run without it finds no jar: 'Could not load OneLibraryHalf'. `one_library_tests/XXXOneLibraryRunConditionalReduction.test` and `XXXOneLibraryRunVarargs.test` fail so.; they lost: wrappers, and rows 624 and 315 stand on `println`'s path. F-352's second kind of walls (rows 995, 866, 942, 994, 993) follow. `bin/run_classpath` takes the caches folder of the selection, so a run without it finds no jar: 'Could not load OneLibraryHalf'.

## Row 1080, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a tuple expression written as the argument of a function whose one parameter has type `Any` stops the code generator: `f((k, k))` for `f(x: Any)` ends 'Error trying to close method scope'
- Reproducer: `ProjectFortress/compiler_tests/XXXTupleArgumentAtAnyCompiled.test`
- Notes: siblings: 819, 805. The same on the base's code (c799851472) and on rung N's tree. The tuple bound first, `p: Any = (k, k)` and then `f(p)`, compiles and runs. Walk runs the call. Not traced.

## Row 1081, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: CONTESTED. Class: implementation gap (checker).
- Claim: the compiled checker refuses as unreachable a `typecase` clause whose type the selector's static type excludes, where the specification's `typecase` section names no such static error: for `x: ZZ32`, an object, a clause at a program's trait `Shape` gives 'The typecase clause, Shape, is unreachable.'
- Reproducer: `ProjectFortress/compiler_tests/XXXTypecaseArmExcludedRefused.test`
- Notes: siblings: 963, 1064. The section's note answers "No" to making a clause that follows a more specific one a static error; it says nothing of a clause that the selector's type excludes, so the rules do not decide. The program compiled and printed 'integer' on the base's code, where the prelude's `ZZ32` was a trait; walk runs it and prints 'integer'. The test asserts today's refusal.

## Row 1082, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a built-in number type named as a value does not compile: `x: Object = ZZ32` stops the code generator, 'Can't compile the number type ZZ32 as a value yet', where the type, a value object without value parameters, is a singleton declaration
- Reproducer: `ProjectFortress/compiler_tests/XXXNumberTypeAsValueCompiled.test`
- Notes: siblings: 866, 1003. A payload object's class has no field that holds a sole value (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `forObjectDeclPrePass`, `isSingletonObject`), so `forVarRef` refuses its name. Before that refusal, at rung N's head f7ad195d7b, the program compiled and its run died, 'NoSuchFieldError: Class fortress.CompilerBuiltin$ZZ32 does not have member field ...FZZ32 ONLY'; on the base's code (c799851472) the checker refused it, 'Variable 'ZZ32' not found.'. Walk answers the type's zero: `ZZ32` prints 0, `RR64` 0.0. Which value the name denotes is not settled.

## Row 1083, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a function argument whose arrow type coerces to its parameter's arrow type is not converted, and the call fails: `callWide(f: ZZ32 -> ZZ64, x: ZZ32)` on `inc(y: ZZ32): ZZ32`, 'Unification error: Closure/Constructor for callWide param 1'
- Reproducer: ProjectFortress/tests/XXXArrowCoercionFnArgument.fss
- Notes: siblings: 395. F-128 names the arrow coercion among the conversions that walk's code does not make. Walk on the base's code and on rung W's alike: '(f:ZZ32->ZZ64) got arg inc(y:FortressLibrary.ZZ32):FortressLibrary.ZZ32 ZZ32->ZZ32'. The compiled path converts it, wrapping the argument in `fn x => coerce(f(x))` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala:184`): 5, also for a function expression argument (`compiler_tests/ArrowCoercionFnExprCompiled.test`), but not to a type of no parameters (row 1084). Workaround: declare the function at the parameter's arrow type.

## Row 1084, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a function whose arrow type of no parameters coerces to its parameter's, as `() -> ZZ32` at `() -> ZZ64`, dies when called: the coercion's function expression reads its own parameter as a top-level variable, 'NoClassDefFoundError: XXXArrowCoercionThunk$CoercionDesugarer#1'
- Reproducer: ProjectFortress/compiler_tests/XXXArrowCoercionThunk.test
- Notes: siblings: 315. The coercion desugarer wraps the argument in `fn x => coerce(f(x))`, `x` of the domain type (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala:165`, `:184`); at the domain `()` the wrapper's `apply` reads `x` as a member of the component's class; not traced further. The base's code and rung W's alike; at one parameter the coercion runs (`compiler_tests/ArrowCoercionFnExprCompiled.test`). Walk refuses the call (row 1083). A conditional operator's thunk of a reduction so coerced puts three function expressions at one span, which compile on rung W's code. Workaround: declare the function at the parameter's arrow type.

## Row 1085, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: a spread argument to a varargs parameter, `f(1, ys...)`, is dropped on both paths: walk and the compiled path call the declaration with the arguments before it only, so `count(1, ys...)` counts 1 where `ys` holds two
- Reproducer: ProjectFortress/tests/XXXVarargsSpreadArgument.fss
- Notes: siblings: 624. The parser keeps the spread part (`parser/DelimitedExpr.rats:180-186`); walk evaluates only an argument tuple's plain elements (`interpreter/evaluator/Evaluator.java:1471-1473` at c799851472), and the compiled checker's `getArgList` takes only them (`scala_src/typechecker/impls/Functionals.scala:87`), so the code generator never meets one. Under walk the test prints 'FAIL: a ZZ32: 1 =/= a ZZ32: 3'. Workaround: pass the elements as arguments.

## Row 1086, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator stops with `OptionUnwrapException` on a varargs declaration beside another of its name with as many parameters, where the declaration is a trait's or object's method or has static parameters: its dispatch method does not read it by the expansion rule
- Reproducer: ProjectFortress/one_library_tests/XXXOneLibraryVarargsMethodOverloaded.test
- Notes: siblings: 624. `CodeGen.partitionByArgCount` expands only a top-level varargs function without static parameters (`OverloadSet.VarargsExpansion.expands`, `ProjectFortress/src/com/sun/fortress/compiler/OverloadSet.java:222`), and `partitionByMethodArgCount` none; the unexpanded member reaches `OverloadSet.overloadedParamType` (`:918`, a method) or `sParamTaggedTypeFromParam` (`:912`, a generic function), which unwrap the varargs parameter's absent declared type. Other reproducer: `XXXOneLibraryVarargsGenericOverloaded.test`. Walk runs the method form and refuses the generic form at load. Workaround: give the varargs declaration its own name.

## Row 1087, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: under the compiler's prelude, a matrix type `RR64[n,n]` at a declared return type crashes the compiled checker, 'Not in the trait table: CompilerLibrary.Array2': the type names an `Array2` that the prelude does not declare
- Reproducer: `ProjectFortress/tests/wrongOverload.fss`
- Notes: siblings: 626. `cd ProjectFortress && ../bin/fortress compile tests/wrongOverload.fss` (the team's walk test; `mkMatrix[\nat n\]() : RR64[n,n]`, `:45`): 'RuntimeException: Not in the trait table: CompilerLibrary.Array2', the file's first error in the compile ladder since its baseline. The name carries its api, so the trait table's search by the prelude's names does not apply (`TraitTable.scala:105`). With `FORTRESS_LIBRARY=one` the checker reaches the program and reports static errors, 'Ill-formed type: Matrix[\N,n,m\]' first. Until the switch-over.

## Row 1088, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator stops at a call at an assumption of a generic trait of a method whose parameter has the trait's type parameter, as `stamp(Q asif Tagged[\String\], s asif String)` for `stamp(self, x: T)` in `Tagged[\T\]`: 'Can't find the body that Tagged[\String\] gives stamp at ...'
- Reproducer: `ProjectFortress/compiler_tests/XXXAsIfGenericTraitParamCompiled.test`
- Notes: siblings: 818, 940. So too a dotted call, `(Q asif Tagged[\String\]).seal(s asif String)`; a method whose parameters do not name `T` compiles. `emitBodyGivenBy` (`CodeGen.java:7200-7225`) finds the body, whose signature differs from the call's; not traced further. The base stops so at a local trait; at an imported api's generic trait it ran the object's override, and since rung R's `hasBodyInItsTrait` it stops so, also at the prelude's `Equality[\T\]`: '... CompilerAlgebra.Equality[\Pt\] gives = at (LSkAsIfPrelude$Pt;)'. Walk prints `Tagged stamp`.

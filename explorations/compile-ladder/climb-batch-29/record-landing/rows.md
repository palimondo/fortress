<!-- The record-landing workflow's evidence of the gap ledger: each row that b430f9f42..fa630b65f opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- closed as FIXED: 20, 79, 325, 338, 361, 364, 432, 443, 454, 484, 486, 578, 721, 722, 862, 943, 944, 945, 946, 954, 955
- noted: 49, 96, 142, 156, 371, 372, 387, 390, 446, 705, 774, 923
- rewritten: 272, 318, 328, 360, 362, 471, 506, 510, 527, 675, 717, 824, 846
- opened: 956, 957, 958, 959, 960, 961, 962, 963, 964, 965, 966, 967, 968

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 20, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, a list display takes its element type from its elements' run-time types, and `List` is invariant: `<\|1.0, 1.0\|>` is a …
- Claim at the base: under walk, a list display takes its element type from its elements' run-time classes, and `List` is invariant: `<\|1.0, 1.0\|>` is a `List[\FloatLiteral\]`, which a binding or a parameter declared `List[\RR64\]` refuses, so a display of numerals needs its static argument, `<\|[\RR64\] 1.0, 1.0\|>`
- Reproducer: none
- Notes now: fixed `12292add2`; with rung N's default a float numeral is an RR64 value under walk and rung G reads it at RR64, so on the merged tree l: List[\RR64\] = <\|1.0, 1.0\|> binds and SUM <\|1.5, 2.5\|> is 4.0 (the gather's probe); no gated test, since the batch's rule forbids asserting a static argument of a generic built from a numeral under walk; full text: history, row 20
- The notes gained: fixed `12292add2`; with rung N's default a float numeral is an RR64 value under walk and rung G reads it at RR64, so on the merged tree l: List[\RR64\] = <\|1.0, 1.0\|> binds and SUM <\|1.5, 2.5\|> is 4.0 (the gather's probe); no gated test, since the batch's rule forbids asserting a static argument of a generic built from a numeral under walk;; they lost: siblings: 96, 432, 510, 705, 717. A display calls `opr <\|[\E\] xs: E... \|>` (`Library/List.fsi:112`); walk takes `E` as the join of the elements' run-time types (row 511), a float numeral's being `FloatLiteral` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44`), an integer's `Int` (F-74), and a declared type does not fix it (row 510). Objects join to their trait: `<\| a, c, o \|>` is a...

## Row 49, noted

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: an array literal with no declared type is not built into an array under walk: an untyped binding fails with `Can't infer element type for array construction`, and a literal in argument position is passed on as a paste, an `IUOTuple` never built into an array
- Reproducer: `ProjectFortress/tests/XXXArrayLiteralArgRungC.fss`
- Notes now: siblings: 104, 142. `LHSEvaluator.forLValue` builds the array only from a declared type; with none it reports the error, the join of the element types left as a comment (`LHSEvaluator.java:140-145`, at c124c6b65). `Evaluator.forArrayElements` returns the paste, an `IUOTuple` (`Evaluator.java:854-861`), so `3 - [1 2]` fails dispatch with `(1,2): (ZZ32,ZZ32)`. `RR64` elements fail as a user type's do. The specification types the literal `Arrayk[\T, 0, n0, …, 0, nk-1\]` (`Array1` to `Array3` in the library), `T` the union of the element types. Workaround: a literal-sized type, `x: ZZ32[2] = [1 2]` or `sc: Vector[\RR64,3\] = [1.0 2.0 3.0]`. full text: history, row 49
- The notes gained: (ZZ32,ZZ32)`.; they lost: (Int,Int)`.

## Row 79, closed as FIXED

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: on the compiled path an integer numeral where nothing fixes a type stays an `IntLiteral`, not P-173's `ZZ32`, so it takes no `ZZ32` clause of a …
- Claim at the base: on the compiled path an integer numeral where nothing fixes a type stays an `IntLiteral`, not P-173's `ZZ32`, so it takes no `ZZ32` clause of a `typecase` and no `ZZ32` overload: `7` at `x: Object` answers `other`, and `ee(5)` runs `ee(x: Any)`, not `ee[\nat n\](x: ZZ32)`; walk gives `ZZ32` and 1
- Reproducer: `ProjectFortress/compiler_tests/LiteralDefaultCompiled.test`
- Notes now: fixed `53a6074ed`; full text: history, row 79
- The notes gained: fixed `53a6074ed`;; they lost: siblings: 946. The checker types a numeral `IntLiteral` by its form (F-57) and keeps that type at `Object` and `Any`; `ee(5)` takes `ee(x: Any)` by subtyping before any coercion (P-49), as does `ee(a)` for `a: Any = 5`, a `ZZ32` by P-173. Walk types the numeral by its value (F-74), as P-173 asks (P-76). At f03e6c1175 a probe of `shown(7)`, `shown(x: Object)` a `typecase` with `ZZ32`, `String` a...

## Row 96, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: a map or list comprehension whose values are two `nat` instantiations of one generic object fails inside the library's covariant collection
- Reproducer: none
- Notes now: siblings: 20. `FAIL: Singleton[\(String,__DefaultMatrix[\RR64,2,3\])\] APPCOV Singleton[\(String,__DefaultMatrix[\RR64,4,3\])\] have no common supertype!`, raised from `Library/CovariantCollection.fss:43`. In the probe (a) and (d) fail, (b) `BIG UNION` and (c) a fold work; also `explorations/run-b/probes/worker/w05_mapcompr.fss`. Explicit static arguments do not help; with uniform shapes the comprehension works, and `update` accepts any shapes. Workaround: build the record by a fold of `union` (row 134). Probe `explorations/run-b/probes/c18_map_of_shapes.fss`, in the parent of `ed6dafb52`. full text: history, row 96
- The notes gained: Singleton[\(String,__DefaultMatrix[\RR64,2,3\])\] APPCOV Singleton[\(String,__DefaultMatrix[\RR64,4,3\])\]; they lost: Singleton[\(FlatString,__DefaultMatrix[\RR64,2,3\])\] APPCOV Singleton[\(FlatString,__DefaultMatrix[\RR64,4,3\])\]

## Row 142, noted

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: a typed array literal as a **top-level** declaration is bound as a tuple: `shp: Vector[\ZZ32,9\] = [27 16 27 …]` fails with `Type mismatch binding (27,16,…)`, while the same declaration inside a function body works
- Reproducer: none
- Notes now: siblings: 49, 104. At top level the literal is never built into an array: `BuildEnvironments.forVarDecl4` checks the evaluated paste against the declared type (`BuildEnvironments.java:780-794` at c124c6b65); only `LHSEvaluator.forLValue`, in a body, builds it. `shp: Vector[\ZZ32,3\] = [27 16 27]` gives `Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) ... to shp (type Vector[\ZZ32,3\])`, `p08b` the same with `RR64[9]`, `p08c` (commas) `Operator [_] is not defined.`; `p08d`, in a body, prints it. Workaround: `array[\ZZ32\](9).tabulate(fn …)`, or the literal in a function. Probes `explorations/run-c/probes/p08a_literal.fss` to `p08d`, in the parent of `4ebf80aec`. full text: history, row 142
- The notes gained: (`BuildEnvironments.java:780-794` at c124c6b65); only `LHSEvaluator.forLValue`, in a body, builds it. `shp: Vector[\ZZ32,3\] = [27 16 27]` gives `Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) ... to shp (type Vector[\ZZ32,3\])`, `p08b` the same with `RR64[9]`, `p08c` (commas) `Operator [_] is not defined.`; `p08d`, in a body, prints it.; they lost: (`BuildEnvironments.java:780-794`, at c124c6b65); only `LHSEvaluator.forLValue`, in a body, builds it. `p08a` gives `Type mismatch binding (27,16,…): (Int,Int,…) (type (Int,Int,…)) to shp (type Vector[\ZZ32,9\])`, `p08b` the same with `RR64[9]`, `p08c` (commas) `Operator [_] is not defined.`; `p08d`, in a function body, prints the array.

## Row 156, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a `nat`-generic function is not a value: passed as an argument it fails at the call with `Unification error: … of type null` (a plain callee), `Argument halfG … has no type information` (a `nat`-generic callee with an arrow-typed parameter) or a Java `NullPointerException`
- Reproducer: none
- Notes now: siblings: 165, 758. A generic function value has no type: `type()` returns a null `ftype` (`interpreter/evaluator/values/Fcn.java:67-71`), so it can neither be checked against a parameter type (`EvaluatorBase.java:941`) nor key the callee's instantiation cache; the NPE (a callee generic in two `nat`s) is in `FValue$AsTypesList.compare` (`interpreter/evaluator/values/FValue.java:141`) from `applyInnerPossiblyGeneric` (`GenericFunctionOrConstructor.java:52`). A plain function passes. Workaround: pass a plain function, declared over runtime-sized `Array[\RR64,ZZ32\]` rather than `nat`-generic, to a receiver with an arrow-typed parameter (row 171). probe and full text: history, row 156
- The notes gained: (`EvaluatorBase.java:941`); they lost: (`EvaluatorBase.java:939`)

## Row 272, rewritten (claim, notes)

- Section: 13. Syntax extension: grammars, templates and sub-languages. Status: POSITIVE-VERIFIED. Class: —.
- Claim: repetition `*`/`+` works and splices into a template with `**`, also into a list literal that writes no static type where its elements are integers
- Claim at the base: repetition `*`/`+` works and splices into a template with `**`, but only into a list literal that carries an explicit static type
- Reproducer: none
- Notes now: `sumc⦇ 1 2 3 4 ⦈` → `10` and `sumc⦇ 7 ⦈` → `7` from `<[ sumOf3(<\|[\ZZ32\] (n1), ns** \|>) ]>`. Without `[\ZZ32\]`, `sum⦇ 1 2 3 4 ⦈` gives `10` as well, each element read at its trait (`interpreter/evaluator/types/LanguageTypes.java`); a display of float numerals, a `List[\FloatLiteral\]`, still needs `[\RR64\]` (row 20). Row 197 uses the same splice for an index list of any arity, and names what it cannot carry (an elided axis, row 274). Probes `explorations/apl-probes/b06c_repeat.fss` (typed, works) and `b06a_repeat.fss` (untyped, works), in the parent of 7c3218956. full text: history, row 272
- The notes gained: `[\ZZ32\]`, `sum⦇ 1 2 3 4 ⦈` gives `10` as well, each element read at its trait (`interpreter/evaluator/types/LanguageTypes.java`); a display of float numerals, a `List[\FloatLiteral\]`, still needs `[\RR64\]` (row 20). Row 197 uses the same splice for an index list of any arity, and names what it cannot carry (an elided axis, row 274). Probes `explorations/apl-probes/b06c_repeat.fss` (typed, works) and `b06a_repeat.fss` (untyped, works),; they lost: `[\ZZ32\]` it is `Unification error: Closure/Constructor for sumOf param 1 (xs:List[\ZZ32\]) got arg ArrayList[\Int\] of type ArrayList[\Int\]`, row 20's mechanism (an aggregate's element type comes from the elements' run-time class, and `List` is invariant). Row 197 uses the same splice for an index list of any arity, and names what it cannot carry (an elided axis, row 274). Probes `exploratio...

## Row 318, rewritten (spec, reproducer, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: on the compiled path 21 operators of `IntLiteral` (`DOT`, `CROSS`, `DIV`, bitwise, boxed and dotted forms, `\|self\|`, `MINMAX`, `CHOOSE`, `even`, `odd`) throw `CompilerFailureDetectedAtRunTime`; the overload blocks coercion to `ZZ32`, so one on two undeclared integer literals compiles and throws
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralDivByZeroCompiled.test`
- Notes now: siblings: 328, 954, 955. The stubs are `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:896-928` at c124c6b65; `grep -c 'throw Compiler'` there prints 21. The numeral fold leaves `n DIV 0` and the wrapping, saturating and bitwise operators of two numerals (climb batch 29 rung F), so `1 DIV 0` reaches its stub where `DivisionByZero` is the answer. Fixed half: unary and binary `-`, `+` and juxtaposition call `nativeHelpers/simpleIntLiteralArith.java` (`NamingCzar.java:343`), asserted by `IntLiteralArithRung7.test`. Fix: the switch-over (P-38). Workaround: declare the binding `ZZ32` or `ZZ64`, or apply `.asZZ32`. full text: history, row 318
- The notes gained: 328, 954, 955. The stubs are `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:896-928` at c124c6b65; `grep -c 'throw Compiler'` there prints 21. The numeral fold leaves `n DIV 0` and the wrapping, saturating and bitwise operators of two numerals (climb batch 29 rung F), so `1 DIV 0` reaches its stub where `DivisionByZero` is the answer. Fixed half: unary and binary `-`, `+` and juxtaposition call `nativeHelpers/simpleIntLiteralArith.java` (`NamingCzar.java:343`),; they lost: 328. The stubs are `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:896-928` at c124c6b65: `DOT`, `BOXDOT`, `CROSS`, `BOXCROSS`, `DOTCROSS`, `BOXPLUS`, `DOTPLUS`, `BOXMINUS` and `DOTMINUS` (each unary and binary), `DIV`, `\|self\|`, `BITAND`, `BITOR`, `BITXOR`, `BITNOT`, `MINMAX`, `CHOOSE`, `even`, `odd`; `grep -c 'throw Compiler'` there prints 21; no test runs one. Fixed half: unary and bin...

## Row 325, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: a numeral outside a bounded integer type is a run-time error on the compiled path where the specification makes it a static one: `a: ZZ32 = …
- Claim at the base: a numeral outside a bounded integer type is a run-time error on the compiled path where the specification makes it a static one: `a: ZZ32 = 4294967295` compiles clean and raises `Not in range for ZZ32` at run time
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralBeyondZZ32Range.test`
- Notes now: fixed `53a6074ed`; also NumeralBeyondWidthMax.test and XXXNumeralBeyondRangeInTuple.test (the skeptic's b212f67a0e), an element of a tuple at a tuple type; full text: history, row 325
- The notes gained: fixed `53a6074ed`; also NumeralBeyondWidthMax.test and XXXNumeralBeyondRangeInTuple.test (the skeptic's b212f67a0e), an element of a tuple at a tuple type;; they lost: The checker gives every numeral the one flat type `Types.INT_LITERAL` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:468-470` at 052a7c3fe) and the compiler world's `trait IntLiteral` has no static parameter (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390-396`), so no static type carries the value. Walk refuses it at the point of use. The same failure com...

## Row 328, rewritten (claim, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: on the compiled path, until the switch-over, two `IntLiteral` values compare at `ZZ64`, so comparing one outside `ZZ64` throws where the specification requires an answer: `lt(a: IntLiteral, b: IntLiteral): Boolean = a < b` dies at `lt(18446744073709551615, 5)` with `Not in range for ZZ64`
- Claim at the base: `IntLiteral` comparison on the compiled path is performed at `ZZ64`, so comparing a numeral outside `ZZ64` throws where the specification requires an answer: `a = 18446744073709551615` then `a < 5` dies with `Not in range for ZZ64`
- Reproducer: none
- Notes now: `trait IntLiteral`'s six comparisons are each `self.asZZ64 <op> other.asZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:912-917` at c124c6b65), and `FIntLiteral.asZZ64` raises for a numeral carried as a decimal string (`compiler/runtimeValues/FIntLiteral.java:74-77`). Since climb batch 29 an untyped binding takes the numeral's default and numerals alone fold (F-342, F-339), so `a = 18446744073709551615` then `a < 5` answers `false`; only a parameter written `IntLiteral` holds such a value. Probes at 1d50c6bbbf, compiled and run: 'a < 5: false'; `lt` 'java.lang.Error: Not in range for ZZ64: 18446744073709551615'. No test pins it (F-118). full text: history, row 328
- The notes gained: (`compiler/runtimeValues/FIntLiteral.java:74-77`). Since climb batch 29 an untyped binding takes the numeral's default and numerals alone fold (F-342, F-339), so `a = 18446744073709551615` then `a < 5` answers `false`; only a parameter written `IntLiteral` holds such a value. Probes at 1d50c6bbbf, compiled and run: 'a < 5: false'; `lt` 'java.lang.Error: Not in range for ZZ64: 18446744073709551615'. No test pins it (F-118).; they lost: (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java:74-77`, message at `:63-65`). Walk prints `false`. No test pins it (F-118). Old probe `explorations/compiler-probes/p37.fss`, in the parent of c69cb2064; its outputs `explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/p37.walk.skeptic` and `p37.compiled.skeptic`, in the parent of ab067d9b6.

## Row 338, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: `walk` refuses `d: ZZ32 = -2147483648`, which is in range for the type, with `RHS expression type Long is not assignable to LHS type ZZ32`, where the …
- Claim at the base: `walk` refuses `d: ZZ32 = -2147483648`, which is in range for the type, with `RHS expression type Long is not assignable to LHS type ZZ32`, where the compiled path accepts it and prints the value
- Reproducer: `ProjectFortress/tests/NumeralFoldWalk.fss`
- Notes now: fixed `955cad76d`; the numeral fold makes -2147483648 one ZZ32 numeral under walk (climb batch 29 rung F); on the merged tree d: ZZ32 = -2147483648 binds and prints -2147483648 (the gather's probe); full text: history, row 338
- The notes gained: fixed `955cad76d`; the numeral fold makes -2147483648 one ZZ32 numeral under walk (climb batch 29 rung F); on the merged tree d: ZZ32 = -2147483648 binds and prints -2147483648 (the gather's probe);; they lost: Workaround, the only spelling of the minimum that works on both paths: `-2147483647 - 1`, as the library's `minimum` getters do (`Library/FortressLibrary.fss:736`, `:826` at c124c6b65). Not yet established: where walk decides the numeral's type (the message names `Long`: the negation is typed before the assignment), and whether `ZZ64 = -9223372036854775808` is refused too. Of the five negative...

## Row 360, rewritten (reproducer, notes)

- Section: 7. Numerals, floats and comparisons. Status: FIXED. Class: library gap vs spec (library).
- Claim: a numeral with a radix point is rounded, floored, ceiled and truncated as its nearest double, not as the rational it denotes, on both paths: …
- Reproducer: `ProjectFortress/tests/RoundNearTieNumeral.fss`
- Notes now: fixed `69427e942`; settled by P-173: at the argument of round, floor, ceiling or truncate a numeral with a radix point converts into QQ, RR32 or RR64, a tie that reads RR64, so round(2.50000000000000001) is 2 and round(3.49999999999999999) is 4, as both paths answer; tests/RoundNearTieNumeral.fss guards 2, 0, 4 and 2 for its four numerals; full text: history, row 360
- The notes gained: answer; tests/RoundNearTieNumeral.fss guards 2, 0, 4 and 2 for its four numerals;; they lost: answer at f03e6c1175; tests/XXXRoundNearTieNumeral.fss asserts the rational's 3 and 3, which P-173 drops;

## Row 361, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: `walk` throws `NumberFormatException` on any floating-point use of a radix-point numeral with an explicit radix-ten specifier: `round(2.5_10)` fails …
- Claim at the base: `walk` throws `NumberFormatException` on any floating-point use of a radix-point numeral with an explicit radix-ten specifier: `round(2.5_10)` fails with `For input string: "2.5_10"`, where the compiled path answers 2
- Reproducer: `ProjectFortress/tests/RadixTenPointNumeral.fss`
- Notes now: fixed `3de571bac`; full text: history, row 361
- The notes gained: fixed `3de571bac`;; they lost: siblings: 360, 862. `FFloatLiteral`'s constructor keeps the numeral's whole text whenever `denomBase == 10` (`interpreter/evaluator/values/FFloatLiteral.java:28` at c124c6b65), and `getFloat`'s `Double.valueOf` rejects the `_10` suffix (`:40`). `interpreter/evaluator/Evaluator.java:1632` already passes the parts (`intPart`, `numerator`, `denomBase`, `denomPower`). A fix of row 360 reads the sam...

## Row 362, rewritten (claim, reproducer, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: the compiled path throws `NullPointerException` when it renders a float numeral's own value: inside a program's `coerce(x: FloatLiteral)`, `"" x` fails; a float numeral where nothing fixes a type is an `RR64`, so `println(2.5)`, `"…" 2.5` and `(1.1_2).asString` render
- Claim at the base: the compiled path throws `NullPointerException` when it renders a floating-point numeral: `println(2.5)`, `"…" 2.5` and `(1.1_2).asString` fail where walk prints them, and a typed `RR64` binding of the same numeral prints on both paths
- Reproducer: `ProjectFortress/compiler_tests/XXXFloatLiteralValuePrint.test`
- Notes now: siblings: 321, 862. The runtime `FFloatLiteral.asString()` is `return null; /* replaced in generated code */` (`compiler/runtimeValues/FFloatLiteral.java:52-53`) and the prelude's `trait FloatLiteral` declares no `asString`, so a `FloatLiteral` value fails where it is rendered, as in `String`'s juxtaposition. Only a parameter of type `FloatLiteral` holds such a value now, and the compiled coercion runs in the component class's initializer, before `run()` (climb batch 29 rung F); `NumeralPrintRungR` guards the bare numeral. A runtime class, not a prelude declaration. Workaround: bind it to an `RR64`. full text: history, row 362
- The notes gained: (`compiler/runtimeValues/FFloatLiteral.java:52-53`) and the prelude's `trait FloatLiteral` declares no `asString`, so a `FloatLiteral` value fails where it is rendered, as in `String`'s juxtaposition. Only a parameter of type `FloatLiteral` holds such a value now, and the compiled coercion runs in the component class's initializer, before `run()` (climb batch 29 rung F); `NumeralPrintRungR` guards the bare numeral. A runtime class, not a prelude declaration.; they lost: (`compiler/runtimeValues/FFloatLiteral.java:52-54`) and the prelude's `trait FloatLiteral` declares no `asString`, so `println(x:Object)` fails. The team's `FIntLiteral.asString` makes a string (`FIntLiteral.java:57-61`). Probe of 2026-11-08 (`RadixComp.fss`, at 8cde0b2c4f): `(1.1_2).asString` dies in `CompilerBuiltin.\|\|`, `Cannot invoke "fortress.CompilerBuiltin$Object.asString()" because "<...

## Row 364, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: **walk infers a generic object's static argument from the argument's run-time class**: for `object Cell[\T extends Any\](v: T) end`, `Cell("s")` …
- Claim at the base: **walk infers a generic object's static argument from the argument's run-time class**: for `object Cell[\T extends Any\](v: T) end`, `Cell("s")` prints `Cell[\FlatString\]`, where the compiled path prints `Cell[\String\]`; `Cell(3)` prints `Cell[\ZZ32\]` but is a `Cell[\Int\]`
- Reproducer: `ProjectFortress/tests/LanguageTypeInstancesWalk.fss`
- Notes now: fixed `12292add2`; full text: history, row 364
- The notes gained: fixed `12292add2`;; they lost: The inference takes each argument's run-time type (`interpreter/evaluator/EvaluatorBase.java:602` at d4d454f9d); a lone `T` takes the narrowest (`:645`). Walk's ilk names `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` by their traits, also in static arguments (`tests/AnyNativesIntrinsicWalk`), so only the text changed: a `Cell[\Int\]` dispatches past `Cell[\ZZ32\]` to `Any` (F-74), and wal...

## Row 371, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an `excludes` clause is not checked against an `extends` clause: `object Both extends { A, B }` with `trait A excludes { B }` runs, as do the generic and size forms, where the compiled checker refuses each
- Reproducer: none
- Notes now: siblings: 293, 551. Walk skips `TypeHierarchyChecker` (`ProjectFortress/src/com/sun/fortress/compiler/StaticChecker.java:166-190`), which refuses with 'Types A and B exclude each other' (`TypeHierarchyChecker.scala:298-300` at d4d454f9d) and 'Type Both excludes A but it extends A' (`:307-308`). Fix: that check under walk, or one where walk orders a trait's extends (`FTraitOrObject.java:237-252`). Forms that run: `U[\T\] excludes { V[\T\] }`; `Vec[\3\]`, `Vec[\4\]` (row 414); `trait Tx extends Any excludes { Object }`, whose object is an `Object`; row 293's `Matrix` and `MultiplicativeRing` carrier, whose `+` fails, 'has neither body nor def instanceof Method'. full text: history, row 371
- The notes gained: (`FTraitOrObject.java:237-252`).; they lost: (`FTraitOrObject.java:236-251`).

## Row 372, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a cyclic trait hierarchy, `trait X extends Y end` with `trait Y extends X end`, overflows the stack with no source location instead of being diagnosed
- Reproducer: none
- Notes now: siblings: 407. Walk dies with `StackOverflowError`: the topological sort recurses on `getExtends()` with no in-progress mark (`interpreter/evaluator/types/FTraitOrObject.java:245-247` at c124c6b65). `X[\T\] extends Y[\T\]` and `trait T[\X extends N\] extends T[\N\]` overflow alike. The compiled checker refuses each, 'Cyclic type hierarchy' (`TypeHierarchyChecker.scala:199-200`). Fix: a visiting mark in `visitTrait` (`FTraitOrObject.java:237-252`). Probes `explorations/compile-ladder/rung-analyzer-memo/probes/skeptic/SkWalkCyclePlain.fss`, `explorations/compile-ladder/rung-spec-route-a/probes/skeptic/SkSelfExtBound.fss`, in the parent of ab067d9b6. full text: history, row 372
- The notes gained: (`FTraitOrObject.java:237-252`).; they lost: (`FTraitOrObject.java:236-251`).

## Row 387, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under `walk`, a body whose return type is declared is not converted by coercion: `r(): Wide = NarrowOf(3)` returns the `NarrowOf`, and `r().big` ends the run with "Cannot find definition for method", where the compiled run converts and answers `3`
- Reproducer: `ProjectFortress/tests/XXXCoercionReturnRungC.fss`
- Notes now: siblings: 153. The team switched the interpreter's return check off: `if (true \|\| t.typeMatch(x)) return x;` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java:45` at c124c6b65), so a return converts nothing: `retR64(x: RR32): RR64 = x` answers `1.5 : RR32`. A numeral at a declared return type converts there (climb batch 29 rung N), so `ZZ`'s `zero` and `one` getters, whose bodies the numeral fold makes numerals, answer `ZZ` values (`ProjectFortress/tests/ZZOneGetterWalk.fss`). Workaround: write the value at the declared type (`1.0 headDim`). full text: history, row 387
- The notes gained: siblings: 153. The team switched the interpreter's return check off: `if (true \|\| t.typeMatch(x)) return x;` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java:45` at c124c6b65), so a return converts nothing: `retR64(x: RR32): RR64 = x` answers `1.5 : RR32`. A numeral at a declared return type converts there (climb batch 29 rung N), so `ZZ`'s `zero` and `one` getters, whose bodies the numeral fold makes numerals, answer `ZZ` values (`ProjectFortress/tests/ZZOneGetterWalk.fss`).; they lost: The team switched the interpreter's return check off: `if (true \|\| t.typeMatch(x)) return x;` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Simple_fcn.java:45` at c124c6b65), shared by function expressions, so a return converts nothing. Walk converts at a binding, field, element and argument, not here: `retR64(x: RR32): RR64 = x` answers `1.5 : RR32`, and `ret(): ZZ64 =...

## Row 390, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on the compiled path, an overloaded call that one declaration takes without coercion and another only with it dies with `NoSuchMethodError`: with `p(x: Wide)`, `p(x: Any)` and a `coerce` in `Wide`, `p(NarrowOf(1))` names a dispatcher, `=p{...}(Any)`, that is never emitted
- Reproducer: `ProjectFortress/compiler_tests/XXXCoercionAnyOverloadRungC.test`
- Notes now: The test prints REACHED, then 'NoSuchMethodError: ... \=p{...}(fortress.AnyType$Any)': the call names a dispatcher over both declarations at `Any`. The specification drops the candidates applicable only with coercion; where the pair is kept is not located: the checker's `typedApplication` (`scala_src/typechecker/impls/Functionals.scala:650`) tries coercion-free fits first. Without the `coerce` it prints `p(Any)`, as walk does. A numeral reaches it where its default does not fit the narrower declaration as it is: `t3(3)` for `t3(a: Number)` beside `t3(a: ZZ64)`, the same error; `g1(5)` for `g1(y: Object)` beside `g1(y: ZZ32)` prints `g1 ZZ32` (P-173). full text: history, row 390
- The notes gained: where its default does not fit the narrower declaration as it is: `t3(3)` for `t3(a: Number)` beside `t3(a: ZZ64)`, the same error; `g1(5)` for `g1(y: Object)` beside `g1(y: ZZ32)` prints `g1 ZZ32` (P-173).; they lost: with no user coercion: `g1(5)` for `g1(y: Object)` beside `g1(y: ZZ32)`, and `h(Circle, 3)` for `h[\T extends Shape\](x: T, y: ZZ32)` beside `h(x: Circle, y: Any)` and `h(x: Circle, y: ZZ32)`, the same error.

## Row 432, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: **under `walk`, a bare big operator over a list literal of numerals is refused**: `SUM <\|1, 2, 3\|>`, `PROD <\|1, 2, 3\|>`, `SUM <\|1.5, 2.5\|>` and …
- Claim at the base: **under `walk`, a bare big operator over a list literal of numerals is refused**: `SUM <\|1, 2, 3\|>`, `PROD <\|1, 2, 3\|>`, `SUM <\|1.5, 2.5\|>` and `SUM <\| n^2 \| n <- 1#3 \|>` are "Failed to find any matching overload, args = (ArrayList[\Int\])" (or `FloatLiteral`)
- Reproducer: `ProjectFortress/tests/LanguageTypeInstancesWalk.fss`
- Notes now: fixed `12292add2`; full text: history, row 432
- The notes gained: fixed `12292add2`;; they lost: siblings: 20. At c124c6b65, each in a component that imports `List`, the four and `BIG MAX <\|1, 2, 3\|>` stop rc=1 with that message. Walk takes the list's element type from its elements' run-time class (row 20), `Int`, an `AdditiveGroup[\ZZ32\]` and not an `AdditiveGroup[\Int\]`, so the F-bound fails; `Int` fixes `T` through `BIG +`'s `Generator[\T\]` parameter, so F-228's join does not apply...

## Row 443, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: walk does not convert an integer numeral outside `ZZ32`'s range into `RR64`: `s: RR64 = 3000000000` is refused with `RHS expression type Long is not …
- Claim at the base: walk does not convert an integer numeral outside `ZZ32`'s range into `RR64`: `s: RR64 = 3000000000` is refused with `RHS expression type Long is not assignable to LHS type RR64`, where the specification makes it hold the float `3000000000.0`
- Reproducer: `ProjectFortress/tests/NumeralBeyondZZ32AtRR64.fss`
- Notes now: fixed `3de571bac`; full text: history, row 443
- The notes gained: fixed `3de571bac`;; they lost: siblings: 454. Walk gives a numeral inside `ZZ32`'s range an `Int` and a larger one a `Long` or a big integer (`interpreter/evaluator/values/FIntLiteral.java:40-56`), and `RR64` coerces only from `ZZ32`, `RR32` and `IntLiteral` (`Library/FortressLibrary.fsi:302-304` at c124c6b65), which no walk numeral is (P-76). The fix sits at walk's conversion at a typed binding or parameter, which must know...

## Row 446, noted

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: a call whose argument's static type lies above a sized arm's domain, with a size the call cannot fix, compiles, and at run time both paths run that arm with no size; where the arm reads its size the compiled run dies with a Java `NumberFormatException`
- Reproducer: none
- Notes now: siblings: 400. `ee[\nat n\](x: ZZ32): ZZ32 = n` beside `ee(x: Any): ZZ32 = 2`: `ee(a)` for `a: Any` holding a `ZZ32`, and `ee(5)`, its numeral read at `ee(x: Any)` and made a `ZZ32` (`scala_src/typechecker/impls/Functionals.scala:288-292` at b3a0639603), die compiled with 'NumberFormatException: For input string: "n"' (`MethodInstantiater.java:227` at `c124c6b65`); walk gives 'undefined variable [n]'; at the base `ee(5)` gave 2. P-40's refusal reads only the arm chosen for the argument's static type. Workaround: write the static argument. Probe `explorations/compile-ladder/rung-unknown-size-arm/probes/skeptic/SkDynZZ32Val.fss`, in the parent of `ab067d9b6`; full text: history, row 446
- The notes gained: n` beside `ee(x: Any): ZZ32 = 2`: `ee(a)` for `a: Any` holding a `ZZ32`, and `ee(5)`, its numeral read at `ee(x: Any)` and made a `ZZ32` (`scala_src/typechecker/impls/Functionals.scala:288-292` at b3a0639603), die compiled with 'NumberFormatException: For input string: "n"' (`MethodInstantiater.java:227` at `c124c6b65`); walk gives 'undefined variable [n]'; at the base `ee(5)` gave 2. P-40's refusal reads only the arm chosen for the argument's static type.; they lost: 1` beside `ee(x: Any): ZZ32 = 2`, `ee(a)` with `a: Any` holding a `ZZ32`, prints 1 on both paths; with the body `= n` walk gives 'undefined variable [n]', compiled 'NumberFormatException: For input string: "n"' where the class loader reads the size's text as a numeral (`MethodInstantiater.java:227` at `c124c6b65`). The checker's refusal of an unfixed size (P-40) reads only the arm chosen for th...

## Row 454, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library gap vs spec (library).
- Claim: against the one library, walk refuses a numeral at a typed binding of `NN32` or `NN64`, and walk and the compiled checker refuse a radix-point numeral …
- Claim at the base: against the one library, walk refuses a numeral at a typed binding of `NN32` or `NN64`, and walk and the compiled checker refuse a radix-point numeral at one of `RR32`: walk says `RHS expression type Int is not assignable to LHS type NN32`
- Reproducer: `ProjectFortress/tests/NumeralTypesWalk.fss`
- Notes now: fixed `3de571bac`; full text: history, row 454
- The notes gained: fixed `3de571bac`;; they lost: siblings: 443. Walk's numeral is an `Int` (`interpreter/evaluator/values/FIntLiteral.java:40-56`), from which neither `NN32` nor `NN64` declares a coercion; the one library's `FloatLiteral` is an object below `RR64` (`LibraryBuiltin/FortressBuiltin.fsi:44`) and `RR32` declares no `coerce` from it. The integer half waits for walk to have the checker's static types (P-76). Workaround: `unsigned(3...

## Row 471, rewritten (claim, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an argument whose type is a tuple, `()` or an arrow, at a parameter typed by a type variable bounded by `Object`, stops the program with an `InterpreterBug`, not a type error: `k((1, 2))` for `k[\T extends Object\](x: T): T` gives "** bug! Meet((ZZ32,ZZ32), Object) not a singleton: []"
- Claim at the base: under walk, an argument whose type is a tuple, `()` or an arrow, at a parameter typed by a type variable bounded by `Object`, stops the program with an `InterpreterBug`, not a type error: `k((1, 2))` for `k[\T extends Object\](x: T): T` gives "** bug! Meet((Int,Int), Object) not a singleton: []"
- Reproducer: none
- Notes now: `k(())` gives "Meet((), Object)", an arrow "Meet(ZZ32->BOTTOM, Object)". The `Index` bound stops too, at an argument that is no `Index`: `ident((1, "a"))` for `ident[\I extends Index\](x: I): I` gives 'Meet((ZZ32,String), Index)', `ident("a")` 'Meet(String, Index)', `ident(())` 'Meet((), Index)'. Walk installs a written bound as an upper bound before it unifies the arguments (`abm.meetPut`, `EvaluatorBase.java:907`), so `TypeLatticeOps.java:42` finds the meet empty. The verdict is right, since a tuple, `()` or an arrow is no `Object`; the message is an internal bug's, as row 184's. The specification does not say how a run reports an ill-typed program. full text: history, row 471
- The notes gained: 'Meet((ZZ32,String), Index)', `ident("a")` 'Meet(String, Index)', `ident(())` 'Meet((), Index)'. Walk installs a written bound as an upper bound before it unifies the arguments (`abm.meetPut`, `EvaluatorBase.java:907`),; they lost: 'Meet((Int,FlatString), Index)', `ident("a")` 'Meet(FlatString, Index)', `ident(())` 'Meet((), Index)'. Walk installs a written bound as an upper bound before it unifies the arguments (`abm.meetPut`, `EvaluatorBase.java:905`),

## Row 484, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under `walk`, an `NN32` operator with a numeral answers a `ZZ64`, not the `NN32` the specification gives: `u + 1`, `u MAX 1` and `u MAXNUM 1` for an …
- Claim at the base: under `walk`, an `NN32` operator with a numeral answers a `ZZ64`, not the `NN32` the specification gives: `u + 1`, `u MAX 1` and `u MAXNUM 1` for an `NN32` `u`
- Reproducer: `ProjectFortress/tests/NumeralWithNN32.fss`
- Notes now: fixed `3de571bac`; full text: history, row 484
- The notes gained: fixed `3de571bac`;; they lost: Walk's numeral is a `ZZ32` value (F-74), and `ZZ64` coerces from both `ZZ32` and `NN32` (`Library/FortressLibrary.fss:821-822` at c124c6b65), so the call resolves at `ZZ64`; an `NN64` with a numeral answers a `ZZ` in the same way (`:994`, `:997`). Each integer type declares its own `MIN`, `MAX`, `MAXNUM` and `MINNUM` (F-138; `ProjectFortress/tests/IntegerMinMaxRungM.fss`), so the call runs `ZZ6...

## Row 486, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker accepts `u: NN32 = n` for a `nat n`, and the run answers 3, where P-173 makes a `nat` parameter used as a value a `ZZ32`, from …
- Claim at the base: the compiled checker accepts `u: NN32 = n` for a `nat n`, and the run answers 3, where P-173 makes a `nat` parameter used as a value a `ZZ32`, from which `NN32` has no coercion; walk refuses it when it runs, 'RHS expression type Int is not assignable to LHS type NN32', and binds `u: ZZ32 = n`
- Reproducer: `ProjectFortress/compiler_tests/NatValueZZ32Compiled.test`
- Notes now: fixed `53a6074ed`; also XXXNatValueNN32Refused.test and tests/NatValueZZ32Walk.fss; full text: history, row 486
- The notes gained: fixed `53a6074ed`; also XXXNatValueNN32Refused.test and tests/NatValueZZ32Walk.fss;; they lost: siblings: 454. The checker types a `nat` or `int` parameter read as a value `IntLiteral` (`scala_src/typechecker/staticenv/KindEnv.scala:69-70`, at f03e6c1175), which `NN32` coerces from; the code generator builds an `IntLiteral` constant (`compiler/codegen/CodeGen.java:6338-6340`). P-173 contradicts the cited sentence for Appendix I. Walk's value is `Int`, `ZZ32`'s value object (`interpreter/e...

## Row 506, rewritten (claim, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: **the compiled checker's coercion attempt tries at most 64 combinations of the types it chooses for a generic's lone type parameters, and refuses a call beyond them**: `g4(z, z, z, z, z)` for a `ZZ32` `z` with `g4[\A, B, C, D\](a: A, b: B, c: C, d: D, m: ZZ64)` is refused
- Claim at the base: **the compiled checker's coercion attempt tries at most 64 combinations of the types it chooses for a generic's lone type parameters, and refuses a call beyond them**: `g3(1, 2, 3, 4)` with `g3[\A, B, C\](a: A, b: B, c: C, m: ZZ64)` is refused
- Reproducer: `ProjectFortress/compiler_tests/XXXInferComboCap.fss`
- Notes now: siblings: 507. The cap is `combos.size > 64` (`scala_src/typechecker/impls/Functionals.scala:394` at fa13e6383c). A lone parameter that numerals alone fix takes their default, its one choice, so `g3(1, 2, 3, 4)` is accepted. A `ZZ32` argument has four choices on the prelude (none, `ZZ32`, `ZZ64`, `ZZ`), so three such parameters make 64 and pass, and four make 256. The choices of independent lone parameters could be made one parameter at a time, except that the expected type couples them (`context` in `constraint`). Workaround: write the static arguments. full text: history, row 506
- The notes gained: (`scala_src/typechecker/impls/Functionals.scala:394` at fa13e6383c). A lone parameter that numerals alone fix takes their default, its one choice, so `g3(1, 2, 3, 4)` is accepted. A `ZZ32` argument has four choices on the prelude (none, `ZZ32`, `ZZ64`, `ZZ`), so three such parameters make 64 and pass, and four make 256. The choices of independent lone parameters could be made one parameter at a time, except that the expected type couples them (`context` in `constraint`).; they lost: at `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:370`. `g2(1, 2, 4)` and `g3(z, z, z, 4)` for a `ZZ32` `z` are accepted. Under the one library, where a numeral has seven coercion targets, each such parameter has nine choices (none, the numeral's type, its seven targets), so two exceed the cap (by reading). The choices of independent lone parameters could be...

## Row 510, rewritten (claim, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under `walk`, a typed binding does not fix a static argument that only a call's result mentions: `a: BoxK[\ZZ64\] = wrapK(3)` is refused, 'RHS expression type BoxK[\ZZ32\] is not assignable to LHS type BoxK[\ZZ64\]', and a method's `a: BoxT[\ZZ64\] = Fac.mk()` takes `BoxT[\Any\]`
- Claim at the base: under `walk`, a typed binding does not fix a static argument that only a call's result mentions: `a: BoxK[\ZZ64\] = wrapK(3)` is refused, 'RHS expression type BoxK[\Int\] is not assignable to LHS type BoxK[\ZZ64\]', and a method's `a: BoxT[\ZZ64\] = Fac.mk()` takes `BoxT[\Any\]`
- Reproducer: `ProjectFortress/tests/XXXInferExpectedTypeRungK.fss`
- Notes now: siblings: 705, 706. `i: ZZ64 = idK(3)` answers `3 : ZZ64`, since the binding converts a result that is the type parameter itself, and no coercion converts a `BoxK[\ZZ32\]` (F-55). The method form is `XXXExpectedTypeFixRungT`, which also asserts an assignment and a field declaration. A clause form takes the binding's declared type (F-228); a generic call does not. The compiled checker fixes `T = ZZ64`. Repair: pass the declared type into the call's inference (`LHSEvaluator`, `BuildEnvironments`); whether before the switch-over (P-12) is the curator's. Workaround: `wrapK[\ZZ64\](3)`. full text: history, row 510
- The notes gained: `BoxK[\ZZ32\]`; they lost: `BoxK[\Int\]`

## Row 527, rewritten (claim)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: under walk an array of a static size from 2^31 to 2^32-1 stops at its store's factory, where no catch sees it: `array1[\ZZ32, 3000000000\](7)` ends with 'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type ZZ64' at `NativeArray.fss:16`
- Claim at the base: under walk an array of a static size from 2^31 to 2^32-1 stops at its store's factory, where no catch sees it: `array1[\ZZ32, 3000000000\](7)` ends with 'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type Long' at `NativeArray.fss:16`
- Reproducer: none

## Row 578, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, the object `IntLiteral`'s own arithmetic answers a `ZZ32`, against its declared `IntLiteral`: `x + x` prints `0 ZZ32` and `x + 1` `1 ZZ32`
- Reproducer: none
- Notes now: fixed `3de571bac`; the object IntLiteral left the one library with its arithmetic, and its test IntLiteralValue.fss with it (climb batch 29 rung N); full text: history, row 578
- The notes gained: fixed `3de571bac`; the object IntLiteral left the one library with its arithmetic, and its test IntLiteralValue.fss with it (climb batch 29 rung N);; they lost: The name `IntLiteral` is the value `FIntLiteral.ZERO` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/IntLiteral.java:34-37`), and its natives return `FIntLiteral.make` of the result, which normalises to an `Int` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`); `x TIMES x`, `x^x`, `x.zero` and `x.one` answer at `ZZ32` alike. The one libr...

## Row 675, rewritten (claim, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: the compiled class loader makes a size computed at instantiation beyond its kind: with `prev[\nat k\](): ZZ64 = sz64[\k - 1\](Box[\k - 1\](0))`, `prev[\0\]()` answers -1, where walk refuses a `nat` below 0 when it binds it
- Claim at the base: the compiled class loader makes a size computed at instantiation beyond its kind: with `next[\nat k\](): ZZ64 = sz64[\k + 1\](Box[\k + 1\](0))`, `next[\4294967295\]()` answers 4294967296, where walk refuses a `nat` above 4294967295 when it binds it
- Reproducer: `ProjectFortress/compiler_tests/NatArithBeyondRun.test`
- Notes now: siblings: 962. `Naming.foldSize` (`runtimeSystem/Naming.java:1238-1257` at c124c6b65) computes exactly and checks no kind: a `nat` and an `int` share one spelling, `Naming.XL_INTNAT` (`compiler/NamingCzar.java:1951`). The checker checks a size folded from numerals (`XXXNatArithRangeChecker`) but not one computed from static parameters. The test asserts today's value, red on a fix. Above 4294967295 too: `next[\4294967295\]()` over `k + 1` makes 4294967296, whose read as a value now raises (962). A power it cannot compute stops the run: `Box[\2^k\]` at k = 5000 (NumberFormatException). Walk refuses each (`interpreter/evaluator/EvalType.java:252-260`).
- The notes gained: siblings: 962. `Naming.foldSize` (`runtimeSystem/Naming.java:1238-1257` at c124c6b65) computes exactly and checks no kind: a `nat` and an `int` share one spelling, `Naming.XL_INTNAT` (`compiler/NamingCzar.java:1951`). The checker checks a size folded from numerals (`XXXNatArithRangeChecker`) but not one computed from static parameters. The test asserts today's value, red on a fix. Above 4294967295 too: `next[\4294967295\]()` over `k + 1` makes 4294967296, whose read as a value now raises (962). A power it cannot compute stops the run: `Box[\2^k\]` at k = 5000 (NumberFormatException). Walk refuses each (`interpreter/evaluator/EvalType.java:252-260`).; they lost: `Naming.foldSize` (`runtimeSystem/Naming.java:1238-1257` at c124c6b65) computes exactly and checks no kind: a `nat` and an `int` share one spelling, `Naming.XL_INTNAT` (`compiler/NamingCzar.java:1951`). The checker checks a size folded from numerals (`XXXNatArithRangeChecker`) but not one computed from static parameters. The test asserts today's value, red on a fix. Below 0 too: `getn(NBox[\i -...

## Row 705, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a call written as another call's argument gets no expected type, so a static argument only its result mentions takes its bound: `takesBox64(mk())` with `mk[\T\](): BoxT[\T\]` fails at run time, 'got arg BoxT[\Any\]'
- Reproducer: `ProjectFortress/tests/XXXInferCallArgumentWalk.fss`
- Notes now: siblings: 510. 'Unification error: Closure/Constructor for takesBox64 param 1 (b:BoxT[\ZZ64\]) got arg BoxT[\Any\]' at `XXXInferCallArgumentWalk.fss:15`; `takesBox64(wrapT(3))` gets `BoxT[\ZZ32\]` the same way. Walk infers a call's static arguments at dispatch from its arguments' run-time types and fixes none by an expected type. Where another declaration accepts the argument at its bound, walk runs it: `s: String = f(mk())` runs `f(x: Any): Any`, not `f(b: BoxT[\ZZ64\])`. The compiled checker retries such an argument against each declaration's parameter type (`impls/Functionals.scala`, `retypedApplication`; row 455, fixed). Workaround: write the static argument, `mk[\ZZ64\]()`.
- The notes gained: `BoxT[\ZZ32\]`; they lost: `BoxT[\Int\]`

## Row 717, rewritten (claim, reproducer, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a comprehension with no static argument inside another clause form whose instance a declared type fixes is built at its elements' run-time types, which the outer's element type refuses: `zs: List[\Shape\] = BIG CONCAT[ys <- xss] <\| y \| y <- ys \|>` stops where `ys` holds `Circle`s
- Claim at the base: under walk, a comprehension with no static argument that is the body of another clause form whose instance a declared type fixes is built at its elements' run-time class, which the outer's element type refuses: `zs: List[\ZZ32\] = BIG CONCAT[ys <- xss] <\| 2 y \| y <- ys \|>` stops
- Reproducer: `ProjectFortress/tests/XXXNestedComprehensionObjectElementsWalk.fss`
- Notes now: siblings: 20, 510, 705. 'Unification error: Closure/Constructor for body param 1 (i:List[\Shape\]) got arg ArrayList[\Circle\]'. The declared type instantiates the outer `BIG CONCAT` at `Shape` (F-228), while the inner comprehension, which no declared type reaches, is built at its elements' join, `Circle`, and `List` is invariant. A value of the five native number objects or the four string objects is read at its trait (`LanguageTypes.java`), so the integer case holds (`tests/NestedComprehensionDeclaredTypeWalk`). The specification gives the inner one the type `List[\Shape\]` of its expression. Workaround: `<\|[\Shape\] y \| y <- ys \|>`.
- The notes gained: 'Unification error: Closure/Constructor for body param 1 (i:List[\Shape\]) got arg ArrayList[\Circle\]'. The declared type instantiates the outer `BIG CONCAT` at `Shape` (F-228), while the inner comprehension, which no declared type reaches, is built at its elements' join, `Circle`, and `List` is invariant. A value of the five native number objects or the four string objects is read at its trait (`LanguageTypes.java`), so the integer case holds (`tests/NestedComprehensionDeclaredTypeWalk`). The specification gives the inner one the type `List[\Shape\]` of its expression. Workaround: `<\|[\Shape\]; they lost: With `xss = <\|<\|1, 2\|>, <\|3\|>\|>`: 'Unification error: Closure/Constructor for body param 1 (i:List[\ZZ32\]) got arg ArrayList[\Int\] of type ArrayList[\Int\]'. The declared type instantiates the outer `BIG CONCAT` at `ZZ32` (F-228), while the inner comprehension, which no declared type reaches, is built at its elements' run-time class `Int` (as row 20 states for a list display), and `List...

## Row 721, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, `array[\T\]`, `array1` and `array2` at a `T` that walk instantiates at a value's run-time class give a plain array where the …
- Claim at the base: under walk, `array[\T\]`, `array1` and `array2` at a `T` that walk instantiates at a value's run-time class give a plain array where the specification, instantiating the number type, gives a vector: `filled(z)` for `filled[\T\](x: T) = array[\T\](3).fill(x)` and `z: ZZ32`
- Reproducer: `ProjectFortress/tests/ArrayInferredElementVectorWalk.fss`
- Notes now: fixed `12292add2`; full text: history, row 721
- The notes gained: fixed `12292add2`; full text: history, row 721; they lost: siblings: 364, 729. Walk instantiates `T` at `Int`, the run-time class walk gives a `ZZ32` value (row 364), and at the classes of `ZZ64` and `RR64` values alike; the factories' `typecase` over a witness of their result type (`Library/FortressLibrary.fss:2597-2608`, `:2984-2995`) matches only the eight number types exactly, and `Vector[\Int,n\]` is not well-formed, so the result is plain and `fi...

## Row 722, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, `openRange[\I\]()` at an `I` that walk instantiates at `Int` from a `ZZ32` value throws `CastError` at its container `cast`, where the …
- Claim at the base: under walk, `openRange[\I\]()` at an `I` that walk instantiates at `Int` from a `ZZ32` value throws `CastError` at its container `cast`, where the specification, instantiating `ZZ32`, gives a `ZZ32` open range: `openAt(z)` for `openAt[\I\](x: I) = openRange[\I\]()`
- Reproducer: `ProjectFortress/tests/OpenRangeInferredIndexWalk.fss`
- Notes now: fixed `12292add2`; full text: history, row 722
- The notes gained: fixed `12292add2`; full text: history, row 722; they lost: siblings: 364. `openRange`'s `typecase __thrower[\I\]` (`Library/FortressLibrary.fss:4225-4230` at c124c6b65) matches `() -> Int` (`Int`: the one type `ZZ32` comprises, F-229) against its `() -> ZZ32` arm, and the `cast` of the `ZZ32` range to `OpenRange[\Int\]` fails: "CastError" at `:4227:23-58`. A witness of the result type, as `array1` takes, would not throw. Workaround: write it, `openAt[\...

## Row 774, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: walk, and the compiled run time, read an `extends` entry under a `where` clause as holding at every instance: `Box[\ZZ32\](1)` passes a type test against `Shows` for `object Box[\E\](x: E) extends { Shows where { E extends Shows } }`
- Reproducer: `ProjectFortress/tests/XXXConditionalExtensionTypeTestWalk.fss`
- Notes now: siblings: 773, 701. Walk reads the extension without its clause (`Constructor.boundsUnread`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:725-737` at db8fecd22). Compiled, `typecase v of Shows => true else => false end` prints `true` for `Box[\ZZ32\](1)`. So walk gives `List`'s conditional `<` to a list of tuples or floats, to which the checker gives no order. `List` extends `Equality[\List[\E\]\]` unconditionally (`Library/List.fsi:69`), so its `=` stays element-wise once walk reads the clause. Displays of integers or strings are built at `ZZ32` or `String` (`tests/LanguageTypeInstancesWalk`), so by reading they keep `<`. full text: history, row 774
- The notes gained: (`Constructor.boundsUnread`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:725-737` at db8fecd22). Compiled, `typecase v of Shows => true else => false end` prints `true` for `Box[\ZZ32\](1)`. So walk gives `List`'s conditional `<` to a list of tuples or floats, to which the checker gives no order. `List` extends `Equality[\List[\E\]\]` unconditionally (`Library/List.fsi:69`), so its `=` stays element-wise once walk reads the clause. Displays of integers or strings are built at `ZZ32` or `String` (`tests/LanguageTypeInstancesWalk`), so by reading they keep `<`. full text: history, row 774; they lost: (`Constructor.boundsUnread` and its comment, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:725-737` at db8fecd22). Compiled, `typecase v of Shows => true else => false end` prints `true` for `Box[\ZZ32\](1)`: the code generator compiles the declaration, whose class extends `Shows` at every instance. So walk gives `List`'s conditional `<` to a list of tuples...

## Row 824, rewritten (claim, reproducer, notes)

- Section: 8. Generators, reductions and ranges. Status: NEGATIVE-VERIFIED. Class: library bug (library).
- Claim: under walk, a pure list's range subscript at a stride other than 1 answers a list of its elements' run-time types: for `l = <\|[\Shape\] Circle, Circle, Circle, Circle, Circle \|>` of `PureList`, `l[0:4:2]` is a `PureList[\Circle\]`, which a binding declared `List[\Shape\]` refuses
- Claim at the base: under walk, a pure list's range subscript at a stride other than 1 answers a list of its elements' run-time class: for `l = <\|[\ZZ32\] 10, 11, 12, 13, 14, 15 \|>` of `PureList`, `l[0:4:2]` is a `PureList[\Int\]`, which a binding declared `List[\ZZ32\]` refuses
- Reproducer: `ProjectFortress/tests/XXXPureListStridedSubscriptObjectsWalk.fss`
- Notes now: siblings: 20, 717, 731, 825. Its comprehension `<\| self[i] \| i <- r \|>` (`Library/PureList.fss:73`) writes no static argument, and a method's return type does not direct it under walk (F-228), so it takes the join of the elements' run-time types: 'RHS expression type PureList[\Circle\] is not assignable to LHS type List[\Shape\]'. A value of the five native number objects or the four string objects is read at its trait (`LanguageTypes.java`), so lists of `ZZ32` or `String` answer at their element type (`tests/PureListStridedSubscriptWalk`). `List`'s subscript writes it, `<\|[\E\] self[i] \| i <- r \|>` (`Library/List.fss:151`). Workaround: write `[\E\]` the same way.
- The notes gained: types: 'RHS expression type PureList[\Circle\] is not assignable to LHS type List[\Shape\]'. A value of the five native number objects or the four string objects is read at its trait (`LanguageTypes.java`), so lists of `ZZ32` or `String` answer at their element type (`tests/PureListStridedSubscriptWalk`). `List`'s subscript writes it, `<\|[\E\] self[i] \| i <- r \|>` (`Library/List.fss:151`).; they lost: classes. `List`'s subscript writes it, `<\|[\E\] self[i] \| i <- r \|>` (`Library/List.fss:151`), and answers a `List[\E\]` (`WrittenReductionArgumentsWalk`). Stride 1 runs through `drop` and `take`.

## Row 846, rewritten (claim, notes)

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a native that a program binds over `String` to a glue class receives a non-flat string's type text, not its characters: `env(name: String, d: String)` bound to `StringPrim$GetEnvironment` answers `String` at an unset name and a string made by `\|\|`
- Claim at the base: under walk, a native that a program binds over `String` to a glue class receives a non-flat string's type name, not its characters: `p(a:String):()` bound to `StringPrim$PrintlnWithThread` prints ' Thread 26: CatString' at a string made by `\|\|`
- Reproducer: `ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss`
- Notes now: siblings: 877, 897. `StringPrim$PrintlnWithThread` receives the same text. The glue's `Util.SS2B` and `S2V` take `v.getString()` (`interpreter/glue/prim/Util.java:254`, `:286`), which `FObject.getString` answers with `type().toString()` (`interpreter/evaluator/values/FObject.java:33-35`), a string object's text being `String` (`interpreter/evaluator/types/FTraitOrObject.java:184-193`); `NativeApp` hands a glue class walk's values as they come (`interpreter/glue/NativeApp.java:175`). A helper bound in a method of the trait `String` would get the same text through `getString()` (`StaticNativeApp.java:294`). Workaround: flatten first, or bind over `FlatString`. full text: history, row 846
- The notes gained: `StringPrim$PrintlnWithThread` receives the same text. The glue's `Util.SS2B` and `S2V` take `v.getString()` (`interpreter/glue/prim/Util.java:254`, `:286`), which `FObject.getString` answers with `type().toString()` (`interpreter/evaluator/values/FObject.java:33-35`), a string object's text being `String` (`interpreter/evaluator/types/FTraitOrObject.java:184-193`); `NativeApp` hands a glue class walk's values as they come (`interpreter/glue/NativeApp.java:175`). A helper bound in a method of the trait `String` would get the same text through `getString()` (`StaticNativeApp.java:294`). Workaround: flatten first, or bind over `FlatString`. full text: history, row 846; they lost: `StringPrim$GetEnvironment` answers `CatString` too. The glue's `Util.SS2B` and `S2V` take `v.getString()` (`interpreter/glue/prim/Util.java:254`, `:286`), which `FObject.getString` answers with `type().toString()` (`interpreter/evaluator/values/FObject.java:33-35`); `NativeApp` hands a glue class walk's values as they come (`interpreter/glue/NativeApp.java:149`). A helper parameter declared `S...

## Row 862, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings, not one: `0.9999999999999999` is the double `1.0` and …
- Claim at the base: on the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings, not one: `0.9999999999999999` is the double `1.0` and `1.2246467991473532` is `1.224646799147353`; walk gives each its nearest double
- Reproducer: `ProjectFortress/compiler_tests/FloatNumeralOneRounding.test`
- Notes now: fixed `955cad76d`; full text: history, row 862
- The notes gained: fixed `955cad76d`; full text: history, row 862; they lost: siblings: 360, 361, 362. `CodeGen.forFloatLiteralExpr` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1997-2007` at c124c6b65) emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` into `FFloatLiteral.make(double)`; `make(String)`, whose `Double.valueOf` rounds once (`compiler/runtimeValues/FFloatLiteral.java:44-46`), has no caller. Walk...

## Row 923, noted

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: design limit (library).
- Claim: the library declares `=` on pairs and triples only, so a tuple of four or more elements compares by the fallback `a SEQV b`: under walk two such tuples whose strings are equal but built apart are not equal, `(s1, 1, 2, 3) = (s2, 1, 2, 3)` is `false` for `s1 = s2`
- Reproducer: `ProjectFortress/tests/StrictEquivalenceRuleWalk.fss`
- Notes now: `opr =[\A,B\]` and `opr =[\A,B,C\]` over tuples (`Library/FortressLibrary.fss:4775`, `:4831`); a longer tuple reaches `opr =(a:Any, b:Any) = a SEQV b` (`:96`), element by element (`interpreter/evaluator/values/FTupleLike.java:78`), and strings are reference objects (P-168). The test asserts the pair and the triple `true` and the 4-tuple `false`. Before strings were reference objects walk answered `true`. Workaround: compare the elements, or nest a pair or triple. Compiled: the prelude declares no tuple `=`. Two string literals of one text are one object (P-171), so `("ab", 1, 2, 3) = ("ab", 1, 2, 3)` is `true` (climb batch 29 rung S, a probe); the test builds its strings at run time.
- The notes gained: Two string literals of one text are one object (P-171), so `("ab", 1, 2, 3) = ("ab", 1, 2, 3)` is `true` (climb batch 29 rung S, a probe); the test builds its strings at run time.

## Row 943, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library gap vs spec (library).
- Claim: under walk a float numeral bound to an `RR64` variable, parameter or field stays a `FloatLiteral`, not `SEQV` a computed `RR64` of the same bits: `y …
- Claim at the base: under walk a float numeral bound to an `RR64` variable, parameter or field stays a `FloatLiteral`, not `SEQV` a computed `RR64` of the same bits: `y SEQV x` is `false` for `y: RR64 = 0.5`, `x: RR64 = 0.25 + 0.25`, and `V(0.5) = V(x)` for a field; compiled too after the switch-over, by reading
- Reproducer: `ProjectFortress/tests/NumeralTypesWalk.fss`
- Notes now: fixed `3de571bac`; full text: history, row 943
- The notes gained: fixed `3de571bac`; full text: history, row 943; they lost: siblings: 20, 454, 862. The one library declares `value object FloatLiteral extends RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44` at 157323e5), so no coercion runs. The prelude's `FloatLiteral` excludes `RR64`, which coerces from it (`CompilerBuiltin.fss:932`, `:996`), so compiled `y SEQV x` is `true` today; on the one library the checker inserts no coercion. The test's `:32` a...

## Row 944, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library gap vs spec (library).
- Claim: a numeral with a radix point does not convert to `QQ`, against the specification's coercion of compound numerals to rationals: under walk `q: QQ = …
- Claim at the base: a numeral with a radix point does not convert to `QQ`, against the specification's coercion of compound numerals to rationals: under walk `q: QQ = 0.5` stops, 'RHS expression type FloatLiteral is not assignable to LHS type QQ', and `1/2 = 0.5` is `false`; the compiled path's prelude has no `QQ`
- Reproducer: `ProjectFortress/tests/NumeralTypesWalk.fss`
- Notes now: fixed `3de571bac`; full text: history, row 944
- The notes gained: fixed `3de571bac`; full text: history, row 944; they lost: siblings: 360, 454. The text: 'Library define coercions from numerals to integers (for simple numerals) and rational numbers (for compound numerals)'; a compound numeral holds a '.' (`basic/lexical-structure.tex`, "Numerals"). `QQ` declares no `coerce` from `FloatLiteral`, which the one library declares below `RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44` at 157323e5), and no c...

## Row 945, closed as FIXED

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: each evaluation of a string literal makes a new string object, on both paths, so `"ab" SEQV "ab"` is `false`, and so is `f() SEQV f()` for `f(): …
- Claim at the base: each evaluation of a string literal makes a new string object, on both paths, so `"ab" SEQV "ab"` is `false`, and so is `f() SEQV f()` for `f(): String = "ab"`, where two string literals of one text are one object
- Reproducer: `ProjectFortress/tests/StringLiteralIdentityWalk.fss`
- Notes now: fixed `e53480fc6`; the compiled half: ProjectFortress/compiler_tests/StringLiteralIdentityCompiled.test; full text: history, row 945
- The notes gained: fixed `e53480fc6`; the compiled half: ProjectFortress/compiler_tests/StringLiteralIdentityCompiled.test; full text: history, row 945; they lost: Walk: `FString.make(x.getText())` at each evaluation (`interpreter/evaluator/Evaluator.java:1018-1020` at 157323e5); `FString.seqv` is identity (`values/FString.java:35-38`). Compiled: `ldc` then `FJavaString.make`, a new wrapper each time (`compiler/codegen/CodeGen.java:5268-5277`), compared by reference (`nativeHelpers/equalityRule.java:33`, `:62`); row 908 holds the prelude's `===`. By readi...

## Row 946, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: on the compiled path a variable bound from an integer numeral reads as a `ZZ32` at a numeral tie whatever its value: for `bigN = 3000000000` and `g` …
- Claim at the base: on the compiled path a variable bound from an integer numeral reads as a `ZZ32` at a numeral tie whatever its value: for `bigN = 3000000000` and `g` over `ZZ32`, `NN32`, `ZZ64`, `g(bigN)` picks `g(ZZ32)` and dies at run time, where `g(3000000000)` picks `g(ZZ64)`
- Reproducer: `ProjectFortress/compiler_tests/LiteralDefaultCompiled.test`
- Notes now: fixed `53a6074ed`; also LiteralDefaultResultCompiled.test (the skeptic's f5f4c57922), a variable bound from a function's result; full text: history, row 946
- The notes gained: fixed `53a6074ed`; also LiteralDefaultResultCompiled.test (the skeptic's f5f4c57922), a variable bound from a function's result; full text: history, row 946; they lost: siblings: 325, 391. `isNumeral` takes any expression of type `IntLiteral` (`scala_src/typechecker/impls/Functionals.scala:418-421` at 157323e5), but `numeralReading` reads values only from `IntLiteralExpr` nodes, so a variable's list is empty and reads `ZZ32` (`:428-436`); the coercion then raises `java.lang.Error: Not in range for ZZ32: 3000000000`, which no `catch` sees. Walk answers `g ZZ64`...

## Row 954, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path the numeral fold stops `fortress compile` at a `CHOOSE` of two numerals with `k` outside `0..n`: `3 CHOOSE 5` throws …
- Claim at the base: on the compiled path the numeral fold stops `fortress compile` at a `CHOOSE` of two numerals with `k` outside `0..n`: `3 CHOOSE 5` throws `CompilerError` "Integer Literal folding: Need to do something for factorial of negative values", where the specification's answer is `0`, which walk prints
- Reproducer: `ProjectFortress/compiler_tests/LiteralFoldCompiled.test`
- Notes now: fixed `955cad76d`; also NumeralFoldJUTest.testChooseOutsideItsRangeIsZero and tests/NumeralFoldWalk.fss; full text: history, row 954
- The notes gained: fixed `955cad76d`; also NumeralFoldJUTest.testChooseOutsideItsRangeIsZero and tests/NumeralFoldWalk.fss; full text: history, row 954; they lost: siblings: 318, 887. `choose` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:51-56` at 8cde0b2c4f) divides three factorials and `factorial_aux` (`:38-45`) throws at a negative argument, so the fold of `CHOOSE` (`:89-90`) throws wherever `n < 0`, `k < 0` or `k > n`. The phase is in `compilerPhaseOrder` only (`compiler/phases/PhaseOrder.java:137-147`):...

## Row 955, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path the numeral fold folds the wraparound and saturating `DOTPLUS`, `BOXPLUS`, `DOTMINUS` and `BOXMINUS` of two numerals as exact `+` …
- Claim at the base: on the compiled path the numeral fold folds the wraparound and saturating `DOTPLUS`, `BOXPLUS`, `DOTMINUS` and `BOXMINUS` of two numerals as exact `+` and `-`: `a: ZZ32 = 2147483647 BOXPLUS 1` compiles, and its run dies with `java.lang.Error` "Not in range for ZZ32: 2147483648"
- Reproducer: none
- Notes now: fixed `955cad76d`; its test is the unit test NumeralFoldJUTest (testWrappingAndSaturatingOperatorsAreLeft, ProjectFortress/src/com/sun/fortress/compiler/desugarer/NumeralFoldJUTest.java), outside the test folders; ant testOnly -DtestPattern=NumeralFoldJUTest on the merged tree: Tests run: 9, Failures: 0; full text: history, row 955
- The notes gained: fixed `955cad76d`; its test is the unit test NumeralFoldJUTest (testWrappingAndSaturatingOperatorsAreLeft, ProjectFortress/src/com/sun/fortress/compiler/desugarer/NumeralFoldJUTest.java), outside the test folders; ant testOnly -DtestPattern=NumeralFoldJUTest on the merged tree: Tests run: 9, Failures: 0; full text: history, row 955; they lost: siblings: 318, 325, 348, 797. `foldBinaryOperator` (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:63-66` at 8cde0b2c4f) takes ⊞ and ∔ as `+`, ⊟ and ∸ as `-`, so the width the operator needs is lost: by the specification ∔ wraps, ⊞ saturates and neither overflows; the compiler prelude's ⊞ wraps (row 348). The phase is in `compilerPhaseOrder` only (`co...

## Row 956, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the numeral fold leaves an expression of numerals alone as written where the form of its result needs an operator that its component writes nowhere: in a component with no prefix minus, `0.1 - 0.3` runs as two roundings and a difference, `-0.19999999999999998`, not the numeral `-0.2`
- Reproducer: `ProjectFortress/tests/XXXNumeralFoldNoPrefixMinusWalk.fss`
- Notes: siblings: 954, 955. The fold writes a negative result with a radix point as prefix minus on a numeral, and a quotient as `n / d`, reusing an operator reference written in the component, whose overloadings the disambiguator gave (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java`, `forComponent`, at 8e4ca7b070); with none it leaves the expression. It also leaves `p.0 / d` with `p` or `d` beyond 2^53, a power whose exponent times its base's bits passes 65536, and a `CHOOSE` with `min(k, n - k)` beyond 4096 or `n` beyond 64 bits. Both paths. Workaround: a prefix minus written anywhere in the component.

## Row 957, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a numeral at a program's own generic type calls the program's coercion at each evaluation of its site: for `site(): Gen[\String\] = 3`, two calls of `site()` give two objects, where a numeral at a program's type is one object per site (P-174)
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralCoercionGenericTypeCompiled.test`
- Notes: siblings: 318. The once-per-site call takes a coercion without static arguments into a trait type without static arguments (`numeralCoercionSiteDesc`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, at 5c68eb91ac); `coerce_Gen[\String\]` has one, so the call stays at the site. A site whose type names a type parameter of its generic declaration, as `m(): Gen[\T\] = 3` in `object Box[\T\]`, has no one class to hold its object. Workaround: bind the value once, at a top-level variable.

## Row 958, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a float numeral to the left of an `RR32` operand runs `RR64`'s operator, not `RR32`'s, where the same numeral to the right runs `RR32`'s: for `a: RR32 = narrow(1.5)`, `2.5 + a` and `2.5 a` are `RR64`, `a + 2.5` and `a 2.5` are `RR32`
- Reproducer: `ProjectFortress/tests/XXXNumeralLeftOfRR32Walk.fss`
- Notes: Both declarations apply by one coercion, the numeral into `RR32` or the `RR32` into `RR64`, and `RR32`'s is the more specific. Walk's candidate for `RR64`'s `+` has the self type `RR64 & Float`, the method's instance for the numeral's default, and walk's coercion-based specificity (`Coercions.noLessSpecific`) finds no coercion into an intersection, so the two tie and the tie reads the numerals at their defaults (`OverloadedFunction.bestMatchForNumerals`). Probe: 'TIE Ambiguous coercion, args = (2.5:RR64,1.5:RR32)'. An integer numeral on either side runs `RR32`'s.

## Row 959, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value: with no `IntLiteral` declared, `typecase v of IntLiteral => ... ZZ32 => ... end` takes the first arm for a `ZZ32`
- Reproducer: `ProjectFortress/tests/XXXTypecaseUndefinedArmWalk.fss`
- Notes: The parser makes the arm `Id =>` a `VarType` (`parser/DelimitedExpr.rats:241-248`), and no phase of either path reports the undefined name: the compiled path on the base compiles and runs the test's program, 'the undefined arm', 'PASS'. Met when `IntLiteral` left the one library: `tests/IntegerConversionsWalk.fss`'s `shown` printed '-2147483648 : IntLiteral' for the `ZZ32` -2^31 ('FAIL: J24/0:-2147483648 : IntLiteral =/= J18/0:-2147483648 : ZZ32'), and `tests/IntegerPowerContractWalk.fss` '1 : IntLiteral' for a `ZZ32` 1, until the arms were removed. A type name elsewhere, as `theType[\IntLiteral\]()`, is refused: 'IntLiteral is undefined.'

## Row 960, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: a numeral with a radix point loses all but one of its leading zeros before walk reads its four numbers: `00.5`'s numeral object has 2 digits, where the Working Draft counts 3; an integer numeral keeps them, `007` has 3
- Reproducer: `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss`
- Notes: `ExprFactory.makeFloatLiteralExpr` trims leading zeroes from the text it keeps (`ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1640-1643`), and walk counts the digits of that text (`interpreter/evaluator/values/Numerals.java`, `radixPoint`); `makeIntLiteralExpr` trims none. Only a program's coercion that reads `digits` sees it.

## Row 961, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on the compiled path a negative integer numeral at a program's own number type reaches the type's `coerce(x: IntLiteral)` signed, where P-173 and P-174 make it prefix `-` on the coercion of the natural numeral and refuse it at a type without `-`: `t: Tally = -3` calls the coercion with -3
- Reproducer: `ProjectFortress/compiler_tests/XXXNegativeNumeralOwnType.test`
- Notes: The integer literal fold makes `-3` one negative `IntLiteralExpr` before the checker (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:148-153`), and keeps no reference to the prefix operator that the checker would apply to the program's coercion of `3`. Until the switch-over the prelude's `IntLiteral` carries the sign, so the coercion reads -3 exactly; the difference shows once the coercion reads a numeral's four numbers. Workaround: none needed before the switch-over. Walk's half, through the same fold: row 968.

## Row 962, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: CONTESTED. Class: implementation gap (codegen).
- Claim: on the compiled path a `nat` or `int` parameter of size 2^31 or more read as a value raises `java.lang.Error`, 'Not in range for ZZ32', at run time, which no `catch` sees: `sz64[\nat k\](b: Box[\k\]): ZZ64 = k` dies at `Box[\2147483648\](0)`, since a size read as a value is a `ZZ32` (P-173, P-40)
- Reproducer: none
- Notes: siblings: 675, 325. The code generator converts the class loader's `IntLiteral` constant by `FIntLiteral.asZZ32` (`compiler/codegen/CodeGen.java:6364` at fa13e6383c), which throws `outOfRange` (`compiler/runtimeValues/FIntLiteral.java:63-71`). Open: whether such a read is refused where the class loads, raises `IntegerOverflow`, or is not a `ZZ32`. Probe: `NatRtBigSize` before its respelling, compiled and run at 7bd7c7dfc7: '2147483647', then 'java.lang.Error: Not in range for ZZ32: 2147483648'. Workaround: read the size through its type, by dispatch on `Box[\n\]`. Walk reads such a size as a ZZ64 (F-140): sizeValue[\3000000000\]() typed ZZ64 at 1d50c6bbbf.

## Row 963, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on the compiled path a numeral as a `typecase`'s selector keeps its own type `IntLiteral`, where P-173 gives it its default: `typecase 7 of ZZ32 => ...` is refused, 'The typecase clause, ZZ32, is unreachable.', where walk takes the `ZZ32` clause
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralTypecaseSelector.test`
- Notes: siblings: 79. The selector is checked with no expected type and no default (`scala_src/typechecker/impls/Misc.scala:660` at b212f67a0e). The default there changes two team tests: the pinned span of `XXX5r.test`'s unreachable clauses, and `XXXPatternMatchingc.test`, whose `typecase (3, 4) of (x, y: ZZ32)` becomes reachable and then stops the code generator (964). Workaround: bind the selector to a variable first.

## Row 964, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator stops with a Java `RuntimeException`, 'typcase match failure!', on a `typecase` clause whose tuple pattern binds an element without a type: `typecase p of (x, y: ZZ32) => ...` for `p: (ZZ32, ZZ32)`
- Reproducer: `ProjectFortress/compiler_tests/XXXTypecasePatternUntypedBinder.test`
- Notes: siblings: 498. `CodeGen.getType(TypeOrPattern)` takes a `PlainPattern` only with a type and a `TypePattern`, and throws on any other binding (`compiler/codegen/CodeGen.java:2166-2186` at b212f67a0e); the checker accepts the clause. The base stops the same way. Workaround: give each binder a type, `(x: ZZ32, y: ZZ32)`.

## Row 965, opened

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: on the compiled path, until the switch-over, the prelude declares `String`'s `\|\|` with the string first only, so a `Character` value joined by `\|\|` with a string is refused: `c \|\| s` for `c: Character`, `s: String` gives '… is not applicable to an argument of type (Character, String)'
- Reproducer: `ProjectFortress/compiler_tests/XXXCharacterBeforeStringConcatenationCompiled.test`
- Notes: `opr \|\|(self, b:Object)` (`LibraryBuiltin/CompilerBuiltin.fsi:37`); the one library declares `opr \|\|(a:Any, b:String)` (`Library/FortressLibrary.fsi:2662`), and walk runs `c \|\| s`. Two literals, `'a' \|\| "bc"`, compile, because the fold of a concatenation of literals makes them one string literal before the checker (`compiler/desugarer/PreTypeCheckDesugaringVisitor.java`); the base refused them with the same message. Ends at the switch-over, when the prelude goes (P-37).

## Row 966, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (library).
- Claim: under walk, the library's `=/=` between a number and a numeral is `true` where their `=` is: `u =/= 0` for a zero `u` of `NN32`, `NN64` or `RR32`, and `q =/= 0.5` for `q: QQ = 1/2`, since `=/=` over `Any` takes the numeral at its default before it calls `=`
- Reproducer: `ProjectFortress/tests/XXXNotEqualNumeral.fss`
- Notes: siblings: 807. `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98` at b430f9f428) has no pair beside the `=` pairs (P-165), so `=` gets the numeral at its default (P-173), with which these types declare no `=`, and `SEQV` answers `false`. At b430f9f428 walk answers `u = 0` `false` too; rung N's pairs make it `true`. Compiled, the prelude's `opr =/=(self, other: NN32)` converts the numeral: `u =/= 0` is `false` at b430f9f428. Fix: a `=/=` beside each `=` pair, or `=/=` on each number type as `NOT (self = other)`. Workaround: `NOT (u = 0)`

## Row 967, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a numeral that rounds to an infinity at a typed place of `RR32` or `RR64` converts to `Infinity` with no error: `wide: RR32 = 340282356779733661637539395458142568448` prints `Infinity`, where the specification makes it a static error
- Reproducer: `ProjectFortress/tests/XXXNumeralRoundsToInfinityWalk.fss`
- Notes: siblings: 325. Walk converts through the place type's coercion from the numeral type, which rounds by IEEE's rule in `simpleDoubleArith.numeralToFloat` and `numeralToDouble` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:268-290`); its range check covers the bounded integer types only (`interpreter/evaluator/values/Numerals.java`, `inRange`). The compiled checker refuses it, 'The numeral ... rounds to infinity in RR32.' (`scala_src/typechecker/CoercionOracle.scala:476-483`). P-173 does not say whether `Infinity` is its one rounding. Walk refuses an integer numeral outside an integer type's range when the place is evaluated. Workaround: write a finite value.

## Row 968, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a negative integer constant at a program's own number type reaches its `coerce(x: NaturalNumeral)` as a natural numeral of negative value, where the specification makes it prefix `-` on the coercion's result for the natural numeral: `t: Tally = -3` passes `NaturalNumeral(1, 10, -3)`
- Reproducer: none
- Notes: siblings: 961, 956. Since climb batch 29 the numeral fold runs in walk's phase order too and makes `-3`, or `5 - 8`, one `IntLiteralExpr` of value -3 (`compiler/desugarer/IntegerLiteralFoldingVisitor.java`, class comment); walk's numeral site keeps that value as its digit value and counts the digits of the text without the sign (`interpreter/evaluator/values/Numerals.java:160-179`, `integer`), so the object's `asString` is '7', and a type without `-` takes the numeral. Probe at 1d50c6bbbf, `bin/fortress walk` on a scratch program: `t: Tally = -3` printed 't 1 -3', `t: Tally = 5 - 8` 't 1 -3', `w: Written = -3` 'w 7'. Workaround: none.

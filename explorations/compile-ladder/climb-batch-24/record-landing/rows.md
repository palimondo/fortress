<!-- The record-landing workflow's evidence of the gap ledger: each row that b0f6cd6b7..43cd61b62 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 307, 677, 846
- rewritten: 336, 701, 812, 848, 856, 857, 860
- closed as FIXED: 521, 847, 855
- opened: 862, 863, 864, 865, 866, 867, 868, 869, 870, 871, 872

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 307, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: **the compiled checker refuses by name to infer a `bool`, `dim` or `unit` static parameter**, and a size made from a number known only at run time does not run compiled: `ProjectFortress/tests/NatReflectTest.fss` stops at load
- Reproducer: `ProjectFortress/compiler_tests/XXXNatBoolChecker.test`
- Notes now: siblings: 761, 763, 764. `makeInferenceArg` throws '… bool static parameter b is not supported by the type checker.' (`STypesUtil.scala:585-606` at `63e420a33`) at the declaration's parameter, not the call, hiding the component's other errors; `nat` and `int` ones are inferred. Walk does not unify a `bool` one. `NatReflectTest` stops in the class loader, 'Unable to read serialized data for NatReflect$N??' (at `a1a75716a` and `9d323883f`). A trait whose `comprises` clause binds a `where`-clause size compiles; a call that opens its value to the size fails verification, a `VerifyError` (`compiler_tests/XXXNatOpenRun.test`, with `NatOpenRunLink.test`). full text: history, row 307
- The notes gained: 761, 763, 764. `makeInferenceArg` throws '… bool static parameter b is not supported by the type checker.' (`STypesUtil.scala:585-606` at `63e420a33`) at the declaration's parameter, not the call, hiding the component's other errors; `nat` and `int` ones are inferred. Walk does not unify a `bool` one. `NatReflectTest` stops in the class loader, 'Unable to read serialized data for NatReflect$N??' (at `a1a75716a` and `9d323883f`). A trait whose `comprises` clause binds a `where`-clause size compiles; a call that opens its value to the size fails verification, a `VerifyError` (`compiler_tests/XXXNatOpenRun.test`, with `NatOpenRunLink.test`).; they lost: 701, 761, 763, 764. `makeInferenceArg` throws '… bool static parameter b is not supported by the type checker.' (`STypesUtil.scala:585-606` at `63e420a33`) at the declaration's parameter, not the call, hiding the component's other errors; `nat` and `int` ones are inferred. Walk does not unify a `bool` one. `NatReflectTest` stops in the class loader, 'Unable to read serialized data for NatReflec...

## Row 336, rewritten (claim, reproducer, notes)

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, `REM` and `MOD` by zero on `ZZ32` and `ZZ64` end the run with a Java `ArithmeticException` that no Fortress `catch` sees: `widen(8) REM widen(0)` in a `try` catching `DivisionByZero` ends the run, where the compiled path raises `DivisionByZero`
- Claim at the base: under walk, `REM` and `MOD` by zero on `ZZ32`, `DIV`, `REM` and `MOD` by zero on `ZZ64`, and `DIV` by zero on `ZZ` end the run with a Java `ArithmeticException` that no Fortress `catch` sees: `8 REM 0` in a `try` catching `Exception` ends the run, where the compiled path raises `DivisionByZero`
- Reproducer: XXXZZ64RemainderByZeroWalk
- Notes now: siblings: 848. No zero test in their glue classes, at b0f6cd6b7: `Int$Rem` ends in `x % y` (`interpreter/glue/prim/Int.java:132`), `Long$Rem` in `x % y` (`Long.java:146`); both `MOD`s reach `Int.mod`'s `xi % yi` (`Int.java:389`). Walk makes a native's Java exception a `ProgramError` (F-24). `DIV` on `ZZ32`, `ZZ64` and `ZZ` names a helper whose raise walk translates (`ZZ32DivisionByZeroWalk`, `ZZ64DivisionByZeroWalk`, `ZZDivisionByZeroWalk`). Fix: each on a helper, or a zero test throwing `Int.divisionByZero()` (`Int.java:263-266`). full text: history, row 336
- The notes gained: siblings: 848. No zero test in their glue classes, at b0f6cd6b7: `Int$Rem` ends in `x % y` (`interpreter/glue/prim/Int.java:132`), `Long$Rem` in `x % y` (`Long.java:146`); both `MOD`s reach `Int.mod`'s `xi % yi` (`Int.java:389`). Walk makes a native's Java exception a `ProgramError` (F-24). `DIV` on `ZZ32`, `ZZ64` and `ZZ` names a helper whose raise walk translates (`ZZ32DivisionByZeroWalk`, `ZZ64DivisionByZeroWalk`, `ZZDivisionByZeroWalk`). Fix: each on a; they lost: No zero test in their glue classes, at e74428c71: `Int$Rem` ends in `x % y` (`interpreter/glue/prim/Int.java:132`), `Long$Div` and `Long$Rem` in `x / y` and `x % y` (`Long.java:140`, `:146`); both `MOD`s reach `Int.mod`'s `xi % yi` (`Int.java:389`); `BigNum$Div` is `x.divide(y)` (`BigNum.java:160`). Walk makes a native's Java exception a `ProgramError` (F-24). `ZZ32`'s `DIV` names `simpleIntAri...

## Row 521, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: the compiled `CHOOSE` on `ZZ32`, `ZZ64` and `NN32` dies with a raw `java.lang.ArrayIndexOutOfBoundsException` when `k` is past its helper's safe-bound …
- Claim at the base: the compiled `CHOOSE` on `ZZ32`, `ZZ64` and `NN32` dies with a raw `java.lang.ArrayIndexOutOfBoundsException` when `k` is past its helper's safe-bound table: `34 CHOOSE 17` on `ZZ32`, `68 CHOOSE 34` on `ZZ64`
- Reproducer: `ProjectFortress/compiler_tests/ChooseTableCompiledRungE.test`
- Notes now: fixed `71249bf55`; full text: history, row 521
- The notes gained: fixed `71249bf55`;; they lost: `simpleIntArith.intOverflowingChoose` indexes `maxIntChooseSafeN[k-2]` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:211`), 15 entries (`:126-127`); `simpleLongArith.longOverflowingChoose` indexes `maxLongChooseSafeN[k-2]` (`simpleLongArith.java:185`), 32 entries, and serves `NN32`. Walk's glue raises `IntegerOverflow` (row 520), so `ZZ32`'s `CHOOSE` stays on `Int$Cho...

## Row 677, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: FIXED. Class: implementation gap (checker).
- Claim: the compiled checker reads no where-clause constraint as a bound: in `g[\U\](u: U): String where { U extends T } = u.f()` the call `u.f()` is refused, …
- Reproducer: `ProjectFortress/compiler_tests/WhereBoundMethodChecker.test`
- Notes now: fixed `2b1cd8e63`; climb batch 17 rung L (cdd25b95d on its branch): `KindEnv.constraintBounds` and the fold in `makeArrowFromFunctional`. Its program, once `XXXWhereBoundChecker`, compiles and runs as `WhereBoundFunctionCompiled`. A call that breaks a function's own constraint is refused (`XXXWhereBoundFunctionCall`). Left: the dotted call (row 748), a `where`-clause variable's constraint (row 749), and a trait's or object's own constraint where its type is used (row 750).; full text: history, row 677
- The notes gained: Its program, once `XXXWhereBoundChecker`, compiles and runs as `WhereBoundFunctionCompiled`.; they lost: The reproducer `XXXWhereBoundChecker` now stops in the code generator and is keyed on row 701's wall.

## Row 701, rewritten (claim, spec, reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator refuses a function or method declaration with a contract (`requires`, `ensures`, `invariant`): `forFnDecl` stops with "Don't know how to compile this kind of FnDecl"; walk runs the contract, and a broken `requires` raises `CallerViolation`
- Claim at the base: the code generator refuses a function, object or trait declaration whose own header carries a `where` clause, and a function with a contract: `forFnDecl` stops with "Don't know how to compile this kind of FnDecl", `forObjectDeclPrePass` and `forTraitDecl` with "Can't compile …"
- Reproducer: `ProjectFortress/compiler_tests/XXXFunctionContractCodeGeneration.test`
- Notes now: siblings: 304, 650, 781, 823. Guard: `header.getContract().isNone()` in `forFnDecl` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2971` at b0f6cd6b7); the object and trait guards hold the same condition (`:4109`, `:5029`), which no program reaches, as the disambiguator drops a trait's or object's contract (row 781). A declaration whose own header carries a `where` clause compiles, and nothing is emitted for its constraints, the checker's (`compiler_tests/WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`); a `where`-clause variable's call dies (row 867). F-181.
- The notes gained: 781, 823. Guard: `header.getContract().isNone()` in `forFnDecl` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2971` at b0f6cd6b7); the object and trait guards hold the same condition (`:4109`, `:5029`), which no program reaches, as the disambiguator drops a trait's or object's contract (row 781). A declaration whose own header carries a `where` clause compiles, and nothing is emitted for its constraints, the checker's (`compiler_tests/WhereBoundFunctionCompiled`, `WhereBoundMethodCompiled`, `WhereBoundObjectCompiled`, `WhereBoundTraitMethodCompiled`, `ComprisesWhereFunctionalMethodCompiled`); a `where`-clause variable's call dies (row 867). F-181.; they lost: 677, 774, 781, 823. Guards: `CodeGen.java:2967-2971`, `:4107-4109`, `:5027-5029` at cdb84fba5. An object's `where` and a contract stop it by reading, not run; an `extends` entry's `where` compiles (row 774). Walk runs them. F-181. In the twelve, five walls, four of them lines the revival added to clear checker errors: `SumReduction`'s `distribute`s (`Library/FortressLibrary.fss:3445-3447`), `Bo...

## Row 812, rewritten (claim, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator crashes on a generic trait that defines a member of a trait listing a type at a type `where`-clause variable in its `comprises` clause: `ComprisesWhereFunctionalMethodChecker`, compiled, stops 'E is not in the kind env [][]'
- Claim at the base: the code generator crashes, before its refusal of a `where` clause (row 701), on a generic trait that defines a member of a trait listing a type at a type `where`-clause variable in its `comprises` clause: `ComprisesWhereFunctionalMethodChecker`, compiled, stops 'E is not in the kind env [][]'
- Reproducer: none
- Notes now: siblings: 809, 775. `fortress compile -debug stacktrace` of the program: 'E is not in the kind env [][]' at the object's `extends C[\E\]`, from `TypeAnalyzer.lteq` in `STypesUtil.removeIdenticallyCoveredMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1587` at ed4782762), called by `CodeGen.<init>` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:485`), whose analyzer binds no static parameter of the extender. A dotted member gives the same. With the body in the object only, it compiles and runs (`compile-ladder/rung-codegen-where/REPORT.md`, 5). Hidden on the base by 809. Walk runs it. No gated test: a crash.
- The notes gained: 775. `fortress compile -debug stacktrace` of the program: 'E is not in the kind env [][]' at the object's `extends C[\E\]`, from `TypeAnalyzer.lteq` in `STypesUtil.removeIdenticallyCoveredMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1587` at ed4782762), called by `CodeGen.<init>` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:485`), whose analyzer binds no static parameter of the extender. A dotted member gives the same. With the body in the object only, it compiles and runs (`compile-ladder/rung-codegen-where/REPORT.md`, 5).; they lost: 701, 775. `bin/fortress compile -debug stacktrace` of a copy of the test's program: 'E is not in the kind env [][]' at the object's `extends C[\E\]`, from `TypeAnalyzer.lteq` in `STypesUtil.removeIdenticallyCoveredMethods` (`ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1587` at ed4782762), called by `CodeGen.<init>` (`ProjectFortress/src/com/sun/fortress/compiler/codeg...

## Row 846, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a native bound over `String`, glue class or `nativeHelpers` helper alike, receives a non-flat string's type name, not its characters: `slen(s)`, for `slen(a:String):ZZ32` bound to `simpleConcatenate.nativeStrlen` and a 52-character `s` made by `\|\|`, answers 9, the length of `CatString`
- Reproducer: `ProjectFortress/tests/NativeHelperNonFlatStringWalk.fss`
- Notes now: `StaticNativeApp.unbox` takes `v.getString()` for a Java `String` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:231`), as glue's `Util.SS2B` and `S2V` do (`interpreter/glue/prim/Util.java:254`, `:286`); `FObject.getString` answers `type().toString()` (`interpreter/evaluator/values/FObject.java:33-35`). A probe: the glue binding `printWithThread(s)` prints ' Thread 26: CatString'. The library's natives over strings take `FlatString`, but `printThreadInfo`, `printWithThread`, `printlnWithThread` (`Library/FortressLibrary.fss:4628-4632`) and `getProperty` (`Library/System.fss:45`). Fix: flatten the argument first, or bind over `FlatString`.
- The notes gained: (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:231`),; they lost: (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:199`),

## Row 847, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, a `builtinPrimitive` string naming a helper loads in a method of a type that no Java type carries, where no overload fits: `len(): ZZ32` …
- Claim at the base: under walk, a `builtinPrimitive` string naming a helper loads in a method of a type that no Java type carries, where no overload fits: `len(): ZZ32` in a program's `object Ob`, bound to `simpleConcatenate.nativeStrlen`, answers 2, the length of `Ob`; over an `int` helper, an `InterpreterBug`
- Reproducer: `ProjectFortress/tests/NativeHelperUncarriedSelfWalk.fss`
- Notes now: fixed `9f65d60e2`; full text: history, row 847
- The notes gained: fixed `9f65d60e2`; full text: history, row 847; they lost: siblings: 846. `StaticNativeApp.find` checks a `self` slot's Java type only for being one it carries (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:119-121`, at 188ed7834): the loader is not told the type that declares the method (climb batch 23, fork 9; `interpreter/evaluator/values/FunctionClosure.java:47-66`). `unbox` then reads the object's `getString()`, its t...

## Row 848, rewritten (claim, reproducer, notes)

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, `REM` and `MOD` by zero on `NN32`, `NN64` and `ZZ` end the run with a Java `ArithmeticException` that no Fortress `catch` sees: `unsigned(7) REM unsigned(0)` in a `try` catching `DivisionByZero` ends the run
- Claim at the base: under walk, `DIV`, `REM` and `MOD` by zero on `NN32` and `NN64`, and `REM` and `MOD` by zero on `ZZ`, end the run with a Java `ArithmeticException` that no Fortress `catch` sees: `unsigned(7) DIV unsigned(0)` in a `try` catching `DivisionByZero` ends the run
- Reproducer: `ProjectFortress/tests/XXXNN32RemainderByZeroWalk.fss`
- Notes now: siblings: 336. `DIV` by zero on `NN32` and `NN64` throws `DivisionByZero` (`NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`): their bindings name helpers that raise it (`nativeHelpers/simpleUnsignedIntArith.java:61-62`, `simpleUnsignedLongArith.java:75-76`). No zero test in the glue classes still bound: `NN32$Rem` and `$Mod` (`interpreter/glue/prim/NN32.java:137-141`, `:164-168`), `UnsignedLong$Rem` and `$Mod` (`UnsignedLong.java:138-142`, `:164-168`), `BigNum$Rem` (`BigNum.java:166`) and `BigNum$Mod` (`:205`), at b0f6cd6b7. Fix: each on a helper that raises, or a zero test throwing `Int.divisionByZero()` (`Int.java:263-266`).
- The notes gained: `DIV` by zero on `NN32` and `NN64` throws `DivisionByZero` (`NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`): their bindings name helpers that raise it (`nativeHelpers/simpleUnsignedIntArith.java:61-62`, `simpleUnsignedLongArith.java:75-76`). No zero test in the glue classes still bound: `NN32$Rem` and `$Mod` (`interpreter/glue/prim/NN32.java:137-141`, `:164-168`), `UnsignedLong$Rem` and `$Mod` (`UnsignedLong.java:138-142`, `:164-168`), `BigNum$Rem` (`BigNum.java:166`) and `BigNum$Mod` (`:205`), at b0f6cd6b7. Fix: each on a helper that raises,; they lost: No zero test in their glue classes, at 188ed7834: `NN32$Div`, `$Rem` and `$Mod` (`interpreter/glue/prim/NN32.java:133`, `:139`, `:167`), `UnsignedLong$Div`, `$Rem` and `$Mod` (`UnsignedLong.java:134`, `:140`, `:167`), `BigNum$Rem` (`BigNum.java:166`, 'BigInteger divide by zero') and `BigNum$Mod` (`:205`, 'BigInteger: modulus not positive'); the old code alike. `bin/fortress P.fss` on eight prog...

## Row 855, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: the compiled `ZZ32` `CHOOSE` helper and its `ZZ64` sibling share one static scratch array across calls, so calls in parallel corrupt each other: in a …
- Claim at the base: the compiled `ZZ32` `CHOOSE` helper and its `ZZ64` sibling share one static scratch array across calls, so calls in parallel corrupt each other: in a parallel loop, `n CHOOSE 2` for `n` from 46342 to 65536 gives wrong values, a false `IntegerOverflow` or a raw `UnknownError`
- Reproducer: `ProjectFortress/compiler_tests/ChooseHelperCompiled.test`
- Notes now: fixed `71249bf55`; full text: history, row 855
- The notes gained: fixed `71249bf55`; full text: history, row 855; they lost: siblings: 521. `simpleIntArith.intSlowCautiousChoose` fills and divides the static `tempIntChooseArray` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:121`, `:163`, `:183`, at 40f08d22e); `intOverflowingChoose` calls it for every `n` above its safe-bound table (`:211-212`); `simpleLongArith.tempLongChooseArray` (`:105`) likewise serves `ZZ64` and `NN32`. Compiled at fo...

## Row 856, rewritten (reproducer, notes)

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, `signed` of an `NN32` or `NN64` above its signed half wraps to a negative value, with no `IntegerOverflow`: `signed(unsigned(-1))` is `-1` on `NN32` and on `NN64`, and `signed` of the `NN32` 2^31 is `-2147483648`
- Reproducer: `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss`
- Notes now: siblings: 502, 858. The bindings (`LibraryBuiltin/FortressBuiltin.fss:469`, `Library/FortressLibrary.fss:985`) name helpers that return their `int` or `long` as is (`nativeHelpers/simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`), as the glue classes `NN32$ToInt` and `UnsignedLong$ToLong` did. The compiler's prelude binds the same helpers (`LibraryBuiltin/CompilerBuiltin.fss:816`, `:880`), so the compiled path wraps too: a compiled probe printed '-1', '-2147483648', '-1'. The specification names only `narrow`'s wrap (`basic-lib/basic-integers.tex`, "Integers"); keep the low bits or raise is row 502's question, for `widen`.
- The notes gained: 502, 858. The bindings (`LibraryBuiltin/FortressBuiltin.fss:469`, `Library/FortressLibrary.fss:985`) name helpers that return their `int` or `long` as is (`nativeHelpers/simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`), as the glue classes `NN32$ToInt` and `UnsignedLong$ToLong` did. The compiler's prelude binds the same helpers (`LibraryBuiltin/CompilerBuiltin.fss:816`, `:880`), so the compiled path wraps too: a compiled probe printed '-1', '-2147483648', '-1'.; they lost: 502. The glue classes `NN32$ToInt` and `UnsignedLong$ToLong` return their `int` or `long` as is (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/NN32.java:239-243`, `UnsignedLong.java:239-243`, at 1f5c49b4f), and so do the helpers that climb batch 24's rung S moves the two bindings onto (`nativeHelpers/simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`). `bin/fortr...

## Row 857, rewritten (reproducer, notes)

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, `char` takes a negative code point or one past U+10FFFF and answers a `Char` that holds it, with no exception: `char(-1).codePoint` is `-1` and `char(1114112).codePoint` is `1114112`
- Reproducer: `ProjectFortress/tests/CharCodePointOutOfRangeWalk.fss`
- Notes now: `char` (`Library/FortressLibrary.fss:4540`) names a helper that returns its `int` as is (`nativeHelpers/simpleChar.java:63`), as the glue class `Char$Chr` did. The api: "we don't presently deal gracefully with %Char%s outside the 16-bit plane" (`Library/FortressLibrary.fsi:2578-2580`). The compiler's prelude has no `char`; its `makeCharacter` raises `IntegerOverflow` outside 0 to 1114111, "Really should be IndexOutOfRange" (`LibraryBuiltin/CompilerBuiltin.fss:1058-1062`, `:1638-1639`): a compiled probe printed 'makeCharacter(-1): IntegerOverflow'. A compiled binding of the helper itself passes -1 and 1114112. The specification names no conversion from an integer to a `Char`.
- The notes gained: `char` (`Library/FortressLibrary.fss:4540`) names a helper that returns its `int` as is (`nativeHelpers/simpleChar.java:63`), as the glue class `Char$Chr` did. The api: "we don't presently deal gracefully with %Char%s outside the 16-bit plane" (`Library/FortressLibrary.fsi:2578-2580`). The compiler's prelude has no `char`; its `makeCharacter` raises `IntegerOverflow` outside 0 to 1114111, "Really should be IndexOutOfRange" (`LibraryBuiltin/CompilerBuiltin.fss:1058-1062`, `:1638-1639`): a compiled probe printed 'makeCharacter(-1): IntegerOverflow'. A compiled binding of the helper itself passes -1 and 1114112.; they lost: `Char$Chr` returns its `int` as is (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Char.java:165-169`, at 1f5c49b4f), and so does the helper that climb batch 24's rung S moves `char` onto (`nativeHelpers/simpleChar.java:63`). The api says of `char` that "we don't presently deal gracefully with %Char%s outside the 16-bit plane" (`Library/FortressLibrary.fsi:2578-2580`). `bin/fortres...

## Row 860, rewritten (reproducer, notes)

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: the `NN64` helper `simpleUnsignedLongArith.unsignedLongWrappingNeg` answers its operand, where the wraparound negation of `x` is `0 ∸ x`: under walk with `NN64`'s prefix `DOTMINUS` bound to it, `DOTMINUS` of 2^64-1 gives 18446744073709551615, and walk's glue 1
- Reproducer: `ProjectFortress/compiler_tests/XXXNN64WrappingNegationHelperCompiled.test`
- Notes now: siblings: 348. Its body is `return a;` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:106-108`); its `int` sibling `unsignedIntWrappingNeg` is `-a` (`simpleUnsignedIntArith.java:101-103`); walk's `UnsignedLong$WrappingNegate` is `Unsigned.subtract(0, x)` (`interpreter/glue/prim/UnsignedLong.java:365-369`), which `NN64`'s prefix `DOTMINUS` still names (`Library/FortressLibrary.fss:936-937`). The prelude calls it for `NN64`'s prefix `BOXMINUS` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:832`). Compiled, a declaration over `NN64` bound to it links (`NN64WrappingNegationHelperCompiledLink`) and gives 1 for the negation of 1.
- The notes gained: (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:106-108`); its `int` sibling `unsignedIntWrappingNeg` is `-a` (`simpleUnsignedIntArith.java:101-103`); walk's `UnsignedLong$WrappingNegate` is `Unsigned.subtract(0, x)` (`interpreter/glue/prim/UnsignedLong.java:365-369`), which `NN64`'s prefix `DOTMINUS` still names (`Library/FortressLibrary.fss:936-937`). The prelude calls it for `NN64`'s prefix `BOXMINUS` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:832`). Compiled, a declaration over `NN64` bound to it links (`NN64WrappingNegationHelperCompiledLink`) and gives 1 for the negation of 1.; they lost: (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:106-108`, at 1f5c49b4f); its `int` sibling `unsignedIntWrappingNeg` is `-a` (`simpleUnsignedIntArith.java:101-103`); walk's `UnsignedLong$WrappingNegate` is `Unsigned.subtract(0, x)` (`interpreter/glue/prim/UnsignedLong.java:365-369`). The prelude calls it for `NN64`'s prefix `BOXMINUS` (`ProjectFortress/LibraryBu...

## Row 862, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings, not one: `0.9999999999999999` is the double `1.0` and `1.2246467991473532` is `1.224646799147353`; walk gives each its nearest double
- Reproducer: `ProjectFortress/compiler_tests/XXXFloatNumeralOneRounding.test`
- Notes: siblings: 360, 361, 362. `CodeGen.forFloatLiteralExpr` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1994-2004` at b0f6cd6b7) emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` into `FFloatLiteral.make(double)`; `make(String)`, whose `Double.valueOf` rounds once (`compiler/runtimeValues/FFloatLiteral.java:44-46`), has no caller. Walk keeps a radix-ten numeral's text and reads it with `Double.valueOf` (`interpreter/evaluator/values/FFloatLiteral.java:26-41`), and, by reading, uses the same sum for another radix. Workaround: a numeral with a zero integer part and at most 15 digits after the point.

## Row 863, opened

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED. Class: library gap vs spec (specification).
- Claim: the specification says a floating-point division by zero "produces a NaN value according to the rules of IEEE 754", whose rule gives an infinity for a nonzero dividend; both paths give `1.0/0.0` as `Infinity` and `1.0/-0.0` as `-Infinity`, and the team's `Constants` defines `infinity` as `1.0 / 0.0`
- Reproducer: `ProjectFortress/tests/realArith.fss`
- Notes: The sentence is `Specification/basic/operators/opr-overview.tex:167-168`, as in the Working Draft; the overflow sentence above it gives an infinity "according to the rules of IEEE 754" (`:157-158`). Both paths divide by Java's `/`: `simpleDoubleArith.doubleDiv` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:36-38`), which walk's `Float` and the compiled `RR64` (`CompilerBuiltin.fss:947`) bind. `Library/Constants.fss:17` and `realArith.fss:78` rely on the infinity, as at a874948ac. 0/0 is NaN on either reading. Which clause governs is open.

## Row 864, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a `builtinPrimitive` helper bound in a dotted method of a generic trait or object that no Java type carries is refused only where an instance's method is made, not at load: a program that makes no instance loads and runs, and one that makes one stops there
- Reproducer: `ProjectFortress/tests/NativeHelperUncarriedSelfGenericObjectWalk.fss`
- Notes: siblings: 847. The check of `self` (`interpreter/glue/StaticNativeApp.java:137-141`, at d1228e1f0) runs where a closure is made; an instance's dotted methods get theirs when the instance is made (`interpreter/evaluator/values/MethodClosure.java:36`). `println("before"); println(Box[\ZZ32\](3).len())` prints 'before', then stops: 'no Java type carries Box, the type of self.', an `InterpreterBug`. A generic trait's functional method and a method with static parameters of its own are refused at load. Fix: check a generic type's helper bindings where it is declared.

## Row 865, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: on the compiled path, a `builtinPrimitive` string naming a helper in a local function or an object expression's method is not rewritten into a helper call: `g(x: ZZ32): ZZ32` bound to `simpleIntArith.intNeg` in a block stops 'Variable builtinPrimitive is not defined.', where walk answers `g(4)` -4
- Reproducer: none
- Notes: siblings: 849. `BuiltinPrimitiveRewriter.rewrite` reaches a component's declarations and its traits' and objects' members only (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:51`, `:66-85`, at d1228e1f0); `builtinPrimitive`'s comment has the compiler rewrite the body (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`). `bin/fortress compile` of a `run()` declaring that `g` and printing `g(4)`, old and new code: 'Variable builtinPrimitive is not defined.', rc 255; walk prints 'local -4'. An object expression's method so bound gets the same message. No library binding is in either. Owed: a compiled `XXX` test. Fix: rewrite such a body too.

## Row 866, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: on the compiled path, a program's object that extends `ZZ32` compiles, and its run dies at class load: `MyNum + 1`, for `object MyNum extends ZZ32`, ends 'IncompatibleClassChangeError: class ...$MyNum can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface'
- Reproducer: none
- Notes: siblings: 551, 698. The prelude's `trait ZZ32` lists no `comprises` clause (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`), so the checker takes the extender; the run time's `FZZ32` is a class (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14`, at d1228e1f0). The one library's `ZZ32 comprises { Int }` (`Library/FortressLibrary.fsi:536-538`), and the specification makes `ZZ32` the set of 32-bit integers. `bin/fortress compile` exits 0 and `run` 1, on the old and the new code. Under walk the program loads (row 551), and `MyNum + 1` ends 'getInt not implemented for FOrdinaryObject'. Owed: a compiled `XXX` pair. Fix: refuse the extender.

## Row 867, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: compiled, a call of a function or method whose own `where` clause introduces a `where`-clause variable links and dies, `NoClassDefFoundError` ('wrong name'): `g(O, P)` for `g[\U, V\](u: U, v: V): String where [\nat n\]{U extends {X[\n\]}, V extends {Y[\n\]}}`
- Reproducer: `ProjectFortress/compiler_tests/XXXWhereVariableCallCompiled.test`
- Notes: siblings: 701, 749, 307. The call names the instance at the checker's static arguments, `O`, `P` and the inferred `n`, `1`; the template carries the declaration's own static parameters only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/FnNameInfo.java:99` at e1ab927ad), so the class loader names the class it makes at `O` and `P`. A method, `Q.m(O)` for `m[\U\](u: U): String where [\nat n\]{U extends {X[\n\]}}` in `object Q`, does the same. Until rung G the code generator refused both, 'Don't know how to compile this kind of FnDecl.' Walk runs the function, 'OP'; the method, row 868. Link test: `WhereVariableCallCompiledLink.test`.

## Row 868, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object's method whose own `where` clause introduces a `where`-clause variable stops at the clause, 'Missing type n': `m[\U\](u: U): String where [\nat n\]{U extends {X[\n\]}}` in `object Q`, with `Q.m(O)` for `O extends X[\1\]`
- Reproducer: `ProjectFortress/tests/XXXWhereVariableMethodWalk.fss`
- Notes: siblings: 755, 760, 867. The same clause on a top-level function runs, 'OP' for `g(O, P)`; with `where { U extends T }` the method runs. The compiled checker accepts the method; compiled, its call dies (row 867). Walk is the same on the base, b0f6cd6b7.

## Row 869, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object or trait whose own `where` clause introduces a `where`-clause variable is refused at its use: `W[\O\](O)` for `object W[\U\](u: U) where [\nat n\]{U extends {X[\n\]}}`, with `O extends X[\1\]`, stops 'O must subtype X[\n\]'
- Reproducer: `ProjectFortress/tests/XXXWhereVariableObjectWalk.fss`
- Notes: siblings: 750, 754, 777, 868. A trait does the same at `S[\O\](O)` for `trait Shelf[\U\] where [\nat n\]{U extends {X[\n\]}}` and `object S[\U\](u: U) extends Shelf[\U\]`. P-151 lists neither form among those built; the compiled checker accepts both, and since rung G both run compiled, 'w O' and 'shelf O'. With `where { U extends T }` the object runs under walk. Walk is the same on the base, b0f6cd6b7.

## Row 870, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object extending a generic trait whose generic dotted method has a `where` clause on the trait's static parameter stops, 'ClassCastException: … FTypeObject cannot be cast to … SymbolicInstantiatedType': `mixed[\U\](u: U): String where { T extends Named }` in `trait Pair[\T\]`
- Reproducer: `ProjectFortress/tests/XXXGenericMethodTraitWhereWalk.fss`
- Notes: siblings: 762. It stops in `SingleFcn.createSymbolicInstantiation` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/SingleFcn.java:231` at e1ab927ad), called by `Constructor.finishInitializing` (`Constructor.java:216`), row 762's site. With the clause on the method's own parameter, `where { U extends Named }`, it runs, 'own dog'. Compiled, since rung G, it runs, 'mixed cat'. Walk is the same on the base, b0f6cd6b7.

## Row 871, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker's overloading check reads no `where` constraint on a function's own static parameter as a bound: it accepts `pick[\U\](u: U): String where { U extends Named }` beside `pick(z: ZZ32): String`, which it refuses, 'Invalid overloading of pick', with `U extends Named` in the header
- Reproducer: none
- Notes: siblings: 677, 787, 537. By P-151 a `where` condition on a function's own static parameters bounds them, so each pair is its header twin. Compiled, the `where` pair runs since rung G as walk does, 'named cat', 'int'; the header pair: 'Invalid overloading of pick … [\U extends Named\]U->String'. The other way, `h[\U\](u: U): String where { U extends A }` beside the same with `B`, `A excludes { B }`, is refused, 'There are multiple declarations of h with the same parameter type: U', as walk refuses it; with the bounds in the header the checker accepts it (then row 537). No gated test can pass while the checker accepts the first pair.

## Row 872, opened

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: `Char`'s `asString` of a character past U+FFFF answers the one-character string of its low 16 bits, under walk's glue, the helper `simpleChar.charToString` and the compiled prelude alike: `char(66560).asString`, U+10400, equals `char(1024).asString`, U+0400
- Reproducer: `ProjectFortress/tests/CharAsStringSupplementaryWalk.fss`
- Notes: Walk's glue `Char$ToString` is `String.valueOf((char) val)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FChar.java:100-102`); the helper that `Char`'s `asString` names since rung H is `Character.toString((char)x)`, "This implementation is incorrect for supplementary characters!" (`nativeHelpers/simpleChar.java:16-19`); the prelude's `Character` `asString` calls it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1065`). The api: "we don't presently deal gracefully with %Char%s outside the 16-bit plane" (`Library/FortressLibrary.fsi:2578-2580`). The test passes on the old code and the new; a compiled program, 'true' for U+10400 and for U+1F600.

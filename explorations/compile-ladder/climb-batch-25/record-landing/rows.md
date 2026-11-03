<!-- The record-landing workflow's evidence of the gap ledger: each row that 97a416b18..c3a16b0bc opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 75, 454, 529, 624, 650, 856
- closed as FIXED: 326, 336, 820, 821, 823, 848, 860, 873
- rewritten: 865, 866
- opened: 880, 881, 882, 883, 884, 885, 886, 887, 888, 889, 890, 891, 892

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 75, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: `nanoTime()` has a different type on the two paths, `RR64` compiled and `ZZ64` under walk, so a program that passes its result where a `ZZ64` is expected does not compile
- Reproducer: `explorations/tparallel.fss`
- Notes now: Compiled, the program's `ms(t0, t1)`, declared over `ZZ64`, is refused: `(ZZ64, ZZ64)->ZZ64 is not applicable to an argument of type (RR64, RR64)`. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:23` declares `nanoTime(): RR64` (body `CompilerBuiltin.fss:352`); `Library/FortressLibrary.fsi:2547` at `63e420a33`, from which the specification's section is typeset, declares `ZZ64`. The prelude is deleted at the switch-over, when the compiled path takes the interpreter's library. `Library/FortressLibrary.fss:4522`'s `nanoTime():ZZ64` names `simpleLongArith.longNanoTime`, a Java `long`, which the checker reads as `ZZ64`; the prelude's `RR64` one stays.
- The notes gained: `Library/FortressLibrary.fss:4522`'s `nanoTime():ZZ64` names `simpleLongArith.longNanoTime`, a Java `long`, which the checker reads as `ZZ64`; the prelude's `RR64` one stays.

## Row 326, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: the compiled path renders an `NN32` or `NN64` value above its type's signed half as negative: `n32: NN32 = 4294967295` and `n64: NN64 = …
- Claim at the base: the compiled path renders an `NN32` or `NN64` value above its type's signed half as negative: `n32: NN32 = 4294967295` and `n64: NN64 = 18446744073709551615` both print `-1`, though the values are right
- Reproducer: `ProjectFortress/compiler_tests/UnsignedPrintingCompiled.test`
- Notes now: fixed `f7a33b97b`; full text: history, row 326
- The notes gained: fixed `f7a33b97b`;; they lost: At 052a7c3fe. `NN32`: the runtime class's `asString`, `String.valueOf` of a signed `int` (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FNN32.java:20`), shadows the prelude getter (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:759`), whose native masks. `NN64`: the getter (`:825`) runs, but its native is `Long.toString(x)` (`nativeHelpers/simpleUnsignedLongArith.java:23-25`...

## Row 336, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, `REM` and `MOD` by zero on `ZZ32` and `ZZ64` end the run with a Java `ArithmeticException` that no Fortress `catch` sees: `widen(8) REM …
- Claim at the base: under walk, `REM` and `MOD` by zero on `ZZ32` and `ZZ64` end the run with a Java `ArithmeticException` that no Fortress `catch` sees: `widen(8) REM widen(0)` in a `try` catching `DivisionByZero` ends the run, where the compiled path raises `DivisionByZero`
- Reproducer: `ProjectFortress/tests/ZZ64RemainderByZeroWalk.fss`
- Notes now: fixed `41830b90c`; full text: history, row 336
- The notes gained: fixed `41830b90c`;; they lost: siblings: 848. No zero test in their glue classes, at b0f6cd6b7: `Int$Rem` ends in `x % y` (`interpreter/glue/prim/Int.java:132`), `Long$Rem` in `x % y` (`Long.java:146`); both `MOD`s reach `Int.mod`'s `xi % yi` (`Int.java:389`). Walk makes a native's Java exception a `ProgramError` (F-24). `DIV` on `ZZ32`, `ZZ64` and `ZZ` names a helper whose raise walk translates (`ZZ32DivisionByZeroWalk`, `Z...

## Row 454, noted

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (library).
- Claim: against the one library, walk refuses a numeral at a typed binding of `NN32` or `NN64`, and both paths refuse a radix-point numeral at one of `RR32`: walk says `RHS expression type Int is not assignable to LHS type NN32`
- Reproducer: none
- Notes now: siblings: 443. Walk's numeral is an `Int` (`interpreter/evaluator/values/FIntLiteral.java:40-56`), from which neither `NN32` nor `NN64` declares a coercion; the one library's `FloatLiteral` is an object below `RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44`) and `RR32` declares no `coerce` from it. Walk's integer half waits for Q-walk (POSITIONS, the numeral switch). Workaround for `NN32`: `unsigned(3)`. `compiler_tests/NativeHelperFamilyRR32Compiled.fss` writes `RR32` values as radix-point numerals, which the compiler prelude converts (`LibraryBuiltin/CompilerBuiltin.fss:993`); against the one library it needs `narrow`. full text: history, row 454
- The notes gained: (`interpreter/evaluator/values/FIntLiteral.java:40-56`), from which neither `NN32` nor `NN64` declares a coercion; the one library's `FloatLiteral` is an object below `RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44`) and `RR32` declares no `coerce` from it. Walk's integer half waits for Q-walk (POSITIONS, the numeral switch). Workaround for `NN32`: `unsigned(3)`. `compiler_tests/NativeHelperFamilyRR32Compiled.fss` writes `RR32` values as radix-point numerals, which the compiler prelude converts (`LibraryBuiltin/CompilerBuiltin.fss:993`); against the one library it needs `narrow`.; they lost: (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FIntLiteral.java:40-56`), from which neither `NN32` nor `NN64` declares a coercion; the one library's `FloatLiteral` is an object below `RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:44`) and `RR32` declares no `coerce` from it. Climb batch 8 rung Q fixed the integer half on the compiled side; walk's waits for Q-wa...

## Row 529, noted

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: on the compiled path `RR32` with `RR32` answers an `RR64`: `a + b`, `a - b`, `a / b`, `a MIN b`, `a MAX b`, `SQRT a` and `a^2` for two `RR32` values are `RR64`, where walk on the one library answers `RR32`
- Reproducer: none
- Notes now: siblings: 528. At 052a7c3fe the prelude's `RR32` declares no arithmetic, order or `MIN`/`MAX` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:992-994`), so both operands convert by `RR64`'s `coerce(x: RR32)` (`:933`) and `RR64`'s operator runs. Mixed `RR32` and `RR64` agree on both paths. `a MINMAX f` does not compile, the prelude declaring `MINMAX` only on the integer types; walk answers `(1.5, 3.0) : RR64`. Closes at the switch-over. A negated radix-point numeral is refused at `RR32` too: `e: RR32 = -0.0`, 'Right-hand side has type RR64, but declared type is RR32.', the prelude's `FloatLiteral` declaring no prefix `-` (`CompilerBuiltin.fsi:479`); full text: history, row 529
- The notes gained: A negated radix-point numeral is refused at `RR32` too: `e: RR32 = -0.0`, 'Right-hand side has type RR64, but declared type is RR32.', the prelude's `FloatLiteral` declaring no prefix `-` (`CompilerBuiltin.fsi:479`);; they lost: Probes `explorations/compile-ladder/rung-rr32-sibling/probes/comp/RR32Comp.comp.txt` and `probes/skeptic/SkDiffC.comp.txt`, in the parent of ab067d9b6;

## Row 624, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator does not compile a function or a method with a varargs parameter: a top-level function stops with "Can't compile VarArgs yet", a trait method with `OptionUnwrapException`
- Reproducer: `ProjectFortress/compiler_tests/XXXVarargsCodeGeneration.test`
- Notes now: `NamingCzar` throws it (`compiler/NamingCzar.java:1262`, `:1272`, `:1412`, `:1523`); for a method `jvmSignatureFor` unwraps every parameter's type (`:899`), from `CodeGen.dumpTraitMethodSigs`. `trait Tagger`'s `tag(x: String, rest: ZZ32...)`, called with 0, 1 and 6 extra arguments, fails to compile where walk prints `abc` (`XXXVarargsMethodCodeGeneration`). A call of a varargs function stops its caller too: the one library's `test stringifyChars()` (`Library/String.fss:337`) calling `assert`, 'Can't compile VarArgs yet' from `CodeGen.resolveMethodAndSignature`. Walk binds the parameter to an `ImmutableArray1`. full text: history, row 624
- The notes gained: (`:899`), from `CodeGen.dumpTraitMethodSigs`. `trait Tagger`'s `tag(x: String, rest: ZZ32...)`, called with 0, 1 and 6 extra arguments, fails to compile where walk prints `abc` (`XXXVarargsMethodCodeGeneration`). A call of a varargs function stops its caller too: the one library's `test stringifyChars()` (`Library/String.fss:337`) calling `assert`, 'Can't compile VarArgs yet' from `CodeGen.resolveMethodAndSignature`. Walk binds the parameter to an `ImmutableArray1`.; they lost: (`NamingCzar.java:899`), called from `CodeGen.dumpTraitMethodSigs` (`compiler/codegen/CodeGen.java:6826`). `trait Tagger` with `tag(x: String, rest: ZZ32...): String = x`, called `T.tag("a") T.tag("b", z) T.tag("c", z, z, z, z, z, z)`, type checks and fails to compile, where walk prints `abc` (`XXXVarargsMethodCodeGeneration`). The JVM signature has no varargs form; walk binds the parameter to...

## Row 650, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator refuses a method declaration with the modifier `override`, "Don't know how to compile this kind of FnDecl", so the team's `tests/disp0.fss`, which the compiled checker accepts, does not compile
- Reproducer: `ProjectFortress/compiler_tests/XXXOverrideModifierCodeGeneration.test`
- Notes now: siblings: 610, 823. `CodeGen.fnDeclCompilableModifiers` holds the getter, setter, `io`, `private`, `abstract` and `test` modifiers only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2947-2949` after climb batch 25's rung C), and `forFnDecl` calls `sayWhat` on a declaration with any other (`:3016-3025`). The chapter's draft note says the modifier is not yet supported. Whether the compiled dispatch then leaves out a declaration a type does not provide is not measured. Walk prints `f PASS` and `g PASS`.
- The notes gained: `private`, `abstract` and `test` modifiers only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2947-2949` after climb batch 25's rung C), and `forFnDecl` calls `sayWhat` on a declaration with any other (`:3016-3025`).; they lost: `private` and `abstract` modifiers only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2897-2899` at 83b1cae78), and `forFnDecl` calls `sayWhat` on a declaration with any other (`:2966-2976`).

## Row 820, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator stops on a trait or object whose `extends` clause gives a generic trait the static argument `Any`, 'Only handling some static args …
- Claim at the base: the code generator stops on a trait or object whose `extends` clause gives a generic trait the static argument `Any`, 'Only handling some static args of generic types in extends clause'; the one library's `MIMapReduceReduction` and `TrivialOpenRange` are refused
- Reproducer: `ProjectFortress/compiler_tests/ExtendsGenericAtAnyCompiled.test`
- Notes now: fixed `8833d89c5`; full text: history, row 820
- The notes gained: fixed `8833d89c5`; full text: history, row 820; they lost: siblings: 411. `generateTypeReference`'s `AnyType`, `BottomType`, `SelfType` and `AbbreviatedType` branches are empty and fall through to the throw (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5786-5805` at 32242b80d), so by reading `Bottom`, `Self` or an abbreviated type there stops it too, not measured. Probe, compiled under the compiler's prelude: `trait Holder[\T ext...

## Row 821, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator compiles no `try` with a `forbid` clause: `forTry` throws 'NYI: Forbid clauses are not yet implemented', so the one library's …
- Claim at the base: the code generator compiles no `try` with a `forbid` clause: `forTry` throws 'NYI: Forbid clauses are not yet implemented', so the one library's `shouldRaise` (`Library/FortressLibrary.fss:339`), which the checker passes, is refused
- Reproducer: `ProjectFortress/compiler_tests/ForbidClauseCompiled.test`
- Notes now: fixed `8833d89c5`; full text: history, row 821
- The notes gained: fixed `8833d89c5`; full text: history, row 821; they lost: `forTry` throws when the forbid list is not empty (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2029-2030` at 32242b80d). Measured on the library only, by the probe's code generation per declaration with the checker's failures caught (its sections 1 and 3): the twelve components hold one such `try`, `shouldRaise`'s `forbid Exception` at `:345`. Not reproduced apart from t...

## Row 823, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: the code generator refuses a function declared with the modifier `test`, 'Don't know how to compile this kind of FnDecl', since its modifier guard …
- Claim at the base: the code generator refuses a function declared with the modifier `test`, 'Don't know how to compile this kind of FnDecl', since its modifier guard does not hold `test`: the one library's `test stringifyChars()` (`Library/String.fss:337`) is refused
- Reproducer: `ProjectFortress/compiler_tests/TestModifierCompiled.test`
- Notes now: fixed `8833d89c5`; full text: history, row 823
- The notes gained: fixed `8833d89c5`; full text: history, row 823; they lost: siblings: 650, 120. `fnDeclCompilableModifiers` holds the getter, setter, `io`, `private` and `abstract` modifiers only (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2897-2899` at 32242b80d), and `forFnDecl` refuses a declaration with any other (`:2972`, `:2976`): row 650's guard, whose claim and test name `override` only. Measured on the library only, by the probe's code...

## Row 848, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, `REM` and `MOD` by zero on `NN32`, `NN64` and `ZZ` end the run with a Java `ArithmeticException` that no Fortress `catch` sees: …
- Claim at the base: under walk, `REM` and `MOD` by zero on `NN32`, `NN64` and `ZZ` end the run with a Java `ArithmeticException` that no Fortress `catch` sees: `unsigned(7) REM unsigned(0)` in a `try` catching `DivisionByZero` ends the run
- Reproducer: `ProjectFortress/tests/NN32RemainderByZeroWalk.fss`
- Notes now: fixed `41830b90c`; full text: history, row 848
- The notes gained: fixed `41830b90c`; full text: history, row 848; they lost: siblings: 336. `DIV` by zero on `NN32` and `NN64` throws `DivisionByZero` (`NN32DivisionByZeroWalk`, `NN64DivisionByZeroWalk`): their bindings name helpers that raise it (`nativeHelpers/simpleUnsignedIntArith.java:61-62`, `simpleUnsignedLongArith.java:75-76`). No zero test in the glue classes still bound: `NN32$Rem` and `$Mod` (`interpreter/glue/prim/NN32.java:137-141`, `:164-168`), `UnsignedLo...

## Row 856, noted

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, `signed` of an `NN32` or `NN64` above its signed half wraps to a negative value, with no `IntegerOverflow`: `signed(unsigned(-1))` is `-1` on `NN32` and on `NN64`, and `signed` of the `NN32` 2^31 is `-2147483648`
- Reproducer: `ProjectFortress/tests/SignedAboveSignedRangeWalk.fss`
- Notes now: siblings: 502, 858. The bindings (`LibraryBuiltin/FortressBuiltin.fss:469`, `Library/FortressLibrary.fss:985`) name helpers that return their `int` or `long` as is (`nativeHelpers/simpleUnsignedIntArith.java:242`, `simpleUnsignedLongArith.java:246`), as the glue classes `NN32$ToInt` and `UnsignedLong$ToLong` did. The compiler's prelude binds the same helpers (`LibraryBuiltin/CompilerBuiltin.fss:816`, `:880`), so the compiled path wraps too: a compiled probe printed '-1', '-2147483648', '-1'. The specification names only `narrow`'s wrap (`basic-lib/basic-integers.tex`, "Integers"); keep the low bits or raise is row 502's question, for `widen`.
- The notes gained: (`nativeHelpers/simpleUnsignedIntArith.java:242`, `simpleUnsignedLongArith.java:246`),; they lost: (`nativeHelpers/simpleUnsignedIntArith.java:231`, `simpleUnsignedLongArith.java:228`),

## Row 860, closed as FIXED

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: the `NN64` helper `simpleUnsignedLongArith.unsignedLongWrappingNeg` answers its operand, where the wraparound negation of `x` is `0 ∸ x`: under walk …
- Claim at the base: the `NN64` helper `simpleUnsignedLongArith.unsignedLongWrappingNeg` answers its operand, where the wraparound negation of `x` is `0 ∸ x`: under walk with `NN64`'s prefix `DOTMINUS` bound to it, `DOTMINUS` of 2^64-1 gives 18446744073709551615, and walk's glue 1
- Reproducer: `ProjectFortress/compiler_tests/NN64WrappingNegationHelperCompiled.test`
- Notes now: fixed `f7a33b97b`; full text: history, row 860
- The notes gained: fixed `f7a33b97b`; full text: history, row 860; they lost: siblings: 348. Its body is `return a;` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleUnsignedLongArith.java:106-108`); its `int` sibling `unsignedIntWrappingNeg` is `-a` (`simpleUnsignedIntArith.java:101-103`); walk's `UnsignedLong$WrappingNegate` is `Unsigned.subtract(0, x)` (`interpreter/glue/prim/UnsignedLong.java:365-369`), which `NN64`'s prefix `DOTMINUS` still names (`Library...

## Row 865, rewritten (reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: on the compiled path, a `builtinPrimitive` string naming a helper in a local function or an object expression's method is not rewritten into a helper call: `g(x: ZZ32): ZZ32` bound to `simpleIntArith.intNeg` in a block stops 'Variable builtinPrimitive is not defined.', where walk answers `g(4)` -4
- Reproducer: `ProjectFortress/compiler_tests/XXXNativeHelperLocalFunctionCompiled.test`
- Notes now: siblings: 849. `BuiltinPrimitiveRewriter.rewrite` reaches a component's declarations and its traits' and objects' members only (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:51`, `:66-85`, at d1228e1f0); `builtinPrimitive`'s comment has the compiler rewrite the body (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:14-29`). With `g` declared at the top level the same program compiles and prints -4. An object expression's method so bound gets the same message. No library binding is in either. Fix: rewrite such a body too.
- The notes gained: With `g` declared at the top level the same program compiles and prints -4. An object expression's method so bound gets the same message. No library binding is in either.; they lost: `bin/fortress compile` of a `run()` declaring that `g` and printing `g(4)`, old and new code: 'Variable builtinPrimitive is not defined.', rc 255; walk prints 'local -4'. An object expression's method so bound gets the same message. No library binding is in either. Owed: a compiled `XXX` test.

## Row 866, rewritten (claim, reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: on the compiled path, a program's object that extends `ZZ32` compiles, and its run dies when the object's class loads: `MyNum + 1`, for `object MyNum extends ZZ32`, ends 'IncompatibleClassChangeError: class ...$MyNum can not implement ...FZZ32, because it is not an interface'
- Claim at the base: on the compiled path, a program's object that extends `ZZ32` compiles, and its run dies at class load: `MyNum + 1`, for `object MyNum extends ZZ32`, ends 'IncompatibleClassChangeError: class ...$MyNum can not implement com.sun.fortress.compiler.runtimeValues.FZZ32, because it is not an interface'
- Reproducer: `ProjectFortress/compiler_tests/XXXObjectExtendsZZ32Compiled.test`
- Notes now: siblings: 551, 698. The prelude's `trait ZZ32` lists no `comprises` clause (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:210`), so the checker takes the extender; `FZZ32` is a class (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14`, at d1228e1f0). The one library's `ZZ32 comprises { Int }` (`Library/FortressLibrary.fsi:536-538`), and the specification makes `ZZ32` the 32-bit integers. The link passes (`ObjectExtendsZZ32CompiledLink`); the run prints the line before `MyNum`'s first use, or none if `MyNum` declares a functional method. Under walk it loads (row 551), and `MyNum + 1` ends 'getInt not implemented for FOrdinaryObject'. Fix: refuse the extender.
- The notes gained: `FZZ32` is a class (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14`, at d1228e1f0). The one library's `ZZ32 comprises { Int }` (`Library/FortressLibrary.fsi:536-538`), and the specification makes `ZZ32` the 32-bit integers. The link passes (`ObjectExtendsZZ32CompiledLink`); the run prints the line before `MyNum`'s first use, or none if `MyNum` declares a functional method. Under walk it loads (row 551), and `MyNum + 1` ends 'getInt not implemented for FOrdinaryObject'.; they lost: the run time's `FZZ32` is a class (`ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FZZ32.java:14`, at d1228e1f0). The one library's `ZZ32 comprises { Int }` (`Library/FortressLibrary.fsi:536-538`), and the specification makes `ZZ32` the set of 32-bit integers. `bin/fortress compile` exits 0 and `run` 1, on the old and the new code. Under walk the program loads (row 551), and `MyNum...

## Row 873, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled path's rewrite gives no transfer to an argument declared UnsignedLong, walk's object of NN64, so the checker refuses a binding in value …
- Claim at the base: the compiled path's rewrite gives no transfer to an argument declared UnsignedLong, walk's object of NN64, so the checker refuses a binding in value object UnsignedLong to an NN64 helper: 'ZZ64->String is not applicable to an argument of type UnsignedLong.'
- Reproducer: `explorations/coordinator/tools/distance/run.sh`
- Notes now: fixed `f7a33b97b`; full text: history, row 873
- The notes gained: fixed `f7a33b97b`; full text: history, row 873; they lost: siblings: 326, 860. BuiltinPrimitiveRewriter.transfer gives the NN64 transfers to a declared NN64 only (ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:189 at 25238e60c); with UnsignedLong's asString, asExprString and asFloat moved to simpleUnsignedLongArith, the distance stage gave '#total 3' at ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:479, :481, :483; wit...

## Row 880, opened

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED. Class: library bug (library).
- Claim: `nextUp` of `-0.0` is `0.0` and `nextDown` of `0.0` is `-0.0`, each equal to its argument, on `Float` (`RR64`) and `RR32`, where the apis' "next higher IEEE float" and IEEE 754-2008's nextUp give the smallest signed subnormal (`4.9E-324`, `1.4E-45`); under walk, by glue classes and helpers alike
- Reproducer: `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss`
- Notes: `DirectedRounding.nextUp` answers `0.0` for the bits of `-0.0` and `nextDown(x)` is `-nextUp(-x)` (`ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127`, the `float` twin `:25-41`); the helpers `doubleNextUp`, `doubleNextDown`, `floatNextUp` and `floatNextDown` call it, and a compiled program's own binding of them prints the same. Java's `Math.nextUp(-0.0)` is `4.9E-324`. The apis' comments: `Library/FortressLibrary.fsi:323-326`, `LibraryBuiltin/FortressBuiltin.fsi:65`; the specification names no `nextUp`. `0.0` follows `-0.0` in IEEE 754-2008's totalOrder, which the team may have meant. No directed rounding reaches the case. Which reading governs is open.

## Row 881, opened

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (library).
- Claim: `DIVREM` and `DIVMOD`, which the operators chapter specifies on the integers as the pair of quotient and remainder of the truncating and of the floor division, are declared by neither library: `m DIVREM two` on `ZZ32` is refused, 'Operator DIVREM is not defined.', under walk and on the compiled path
- Reproducer: XXXDivRemDivModWalk
- Notes: siblings: 792. At 97a416b18 no `opr DIVREM` or `opr DIVMOD` in `Library/` or `ProjectFortress/LibraryBuiltin/` (`git grep -n DIVREM`), but for `Library/incomplete/basic/Fortress.Number.fsi:130-131`, which no build reads. The same refusal on the compiled path (`bin/fortress compile` of the test's program). Workaround: `(a DIV b, a REM b)`, and for `DIVMOD` the floor quotient `(a - a MOD b) DIV b` with `a MOD b`.

## Row 882, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: the natives' rewrite is switched by one static flag that the JVM's newest repository sets, so `fortress parse` and `fortress api`, which make none, rewrite only after a compile in the same JVM: a misspelt helper string parses 'Ok' alone, and after a compile 'builtinPrimitive names no static helper'
- Reproducer: none
- Notes: siblings: 849, 865. `BuiltinPrimitiveRewriter.setEnabled` (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:46-48`) is called by `Shell.specificRepository` for each repository (`ProjectFortress/src/com/sun/fortress/Shell.java:101-107`); `parse` and `api` parse with none (`Shell.java:561`, `:702`). `bin/fortress junit` of a `parse` and an `api` .test of `f(x: ZZ32): ZZ32` bound to `simpleIntArith.intNegg`: alone 'OK (2 tests)'; after a `compile` .test of a good binding, 'Tests run: 3, Failures: 2'. A gated test's verdict would hang on the suite's shuffled order, so none pins it.

## Row 883, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: design limit (parser).
- Claim: on the compiled path, a component whose text names a `nativeHelpers` helper is parsed whole four times for one compile, each time with its pre-parse, where a component without one is parsed whole once
- Reproducer: none
- Notes: For such a file `Parser.importCollector` parses the whole component, rewritten (`ProjectFortress/src/com/sun/fortress/compiler/Parser.java:157-159`); `GraphRepository.readCUFor` calls it (`ProjectFortress/src/com/sun/fortress/repository/GraphRepository.java:1025`), and `macroParse` calls it again (`Parser.java:117`) and then parses the file (`:132`). An instrumented copy of `Parser` printing each `parseCU` and `preParser` call, `fortress compile` of a new component with one binding: 4 full parses and 4 pre-parses; of one without: 1 full parse, 1 pre-parse and 3 import-only parses. A cost, not a wrong answer: no program observes it.

## Row 884, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: on the compiled path, a `builtinPrimitive` helper string in a component that imports a grammar is not rewritten into a helper call: with row 289's shims, `f(x: ZZ32): ZZ32` bound to `simpleIntArith.intNeg` beside `import TwiceP.{...}` stops 'Variable builtinPrimitive is not defined.'
- Reproducer: none
- Notes: siblings: 849, 865, 288. `Parser.macroParse` parses such a component with `parseWithGrammars` (`ProjectFortress/src/com/sun/fortress/compiler/Parser.java:135`, `:262-285`), which applies no `BuiltinPrimitiveRewriter.rewrite`, unlike `parseFileConvertExn` (`:329`). Without the shims, row 288's wall stops the compile first, so no gated test reaches it. The shims are `git show fc89ee7a5^:explorations/perf-probes/grammar-compile/shim/` `FortressLibrary`, `List` and `TwiceP`; from their folder `fortress compile` gives 'File ProbeGrammarShimHelper.fss has 1 error.', rc 255, where their `a02p_twice` prints 42 and 6. Walk prints -4 beside `import For.{...}`. No library component imports a grammar.

## Row 885, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: CONTESTED. Class: design limit (parser).
- Claim: on the compiled path, a binding over `NN32`, `NN64` or `Char` to a helper with two methods of one name and arity gets no transfer, and the checker refuses it: `bazN(n: NN32): JavaString` on `simpleOverload.baz`, 'ZZ32->JavaString is not applicable to an argument of type NN32.', walk prints 'baz -1'
- Reproducer: `ProjectFortress/compiler_tests/XXXNativeHelperOverloadedNN32Compiled.test`
- Notes: siblings: 849. The transfers are composed only where `BuiltinPrimitiveRewriter.soleMethod` finds one method (`ProjectFortress/src/com/sun/fortress/compiler/BuiltinPrimitiveRewriter.java:135-145`, `:196-206`); `simpleOverload.baz` takes a `String` or an `int`. Walk takes the overload whose Java types carry the declared types (F-299). The same declaration over `ZZ32` compiles (`NativeHelperBindingCompiled`). Contested: no decision says whether such a binding must compile, and F-308 states the limit. No library binding names an overloaded helper.

## Row 886, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: on the compiled path, the natives' rewrite reads a declared type by its simple name, so a program's own trait `Char` takes the library's character transfer and its own trait `UnsignedLong` the `NN64` argument transfer, and the checker refuses the binding by the transfer
- Reproducer: `ProjectFortress/compiler_tests/XXXNativeHelperOwnCharCompiled.test`
- Notes: `BuiltinPrimitiveRewriter.simpleName` reads a trait type's name only (`compiler/BuiltinPrimitiveRewriter.java:169-173`); `transfer` matches `Char` or `Character` (`:186-188`) and, at an argument, `UnsignedLong` (`:189-190`). `code(c: Char): ZZ32` at `simpleIntArith.intNeg`: 'Character->ZZ32 is not applicable to an argument of type Char.'; `code(u: UnsignedLong): ZZ64` at `simpleLongArith.longNeg`: 'NN64->ZZ64 is not applicable ...' (`XXXNativeHelperOwnUnsignedLongCompiled.test`), where the base gave 'ZZ64->ZZ64 ...'. A refusal is right: no Java type carries the program's type. A program cannot name its own `NN32` on the compiled path, nor `Char` under walk.

## Row 887, opened

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: `ZZ`'s `CHOOSE` answers `1` where the specification's zero rule gives `0`, at `k < 0` or `k > n` for a natural `n`: `3 CHOOSE 5`, `0 CHOOSE 1` and `5 CHOOSE -1` are `1` under walk and through its helper compiled, where the fixed widths give `0`
- Reproducer: `ProjectFortress/tests/XXXChooseZZOutOfRangeWalk.fss`
- Notes: siblings: 337. `simpleArbitraryPrecisionArith.choose` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleArbitraryPrecisionArith.java:164-177`), copied from `BigNum.choose` (`interpreter/glue/prim/BigNum.java:326-345`), swaps `k` with `n - k` where `n - k < k`, so a negative `k` gives its loop no step and the result stays `1`; a negative `n` gives `1` too. The fixed widths' helpers return `0` first (`simpleIntArith.java:218`). Repair: `0` where `k < 0` or `k > n` at a natural `n`; a negative `n` is review-queue item 333's. Compiled, a program's own binding of the helper prints `1` at `3 CHOOSE 5`.

## Row 888, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a `try` nested in another `try` in one body is matched against the outer `try`'s `catch` clause first: an exception that both clauses take is caught by the outer one, and one that only the inner one takes leaves the body uncaught
- Reproducer: `ProjectFortress/compiler_tests/XXXNestedTryInnerCatch.test`
- Notes: `CodeGen.forTry` writes its exception-table entry before it visits its body (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2032` at 97a416b18), so the inner `try`'s entry comes after the outer one's over the same range, and the JVM takes the first entry that covers the throw. On the old code a probe of the test's two functions printed `outer`, then ended with 'FortressException: class NestedTryProbe$Boom'; walk prints `inner` twice (`tests/NestedTryInnerCatchWalk.fss`). Link test: `compiler_tests/NestedTryInnerCatchLink.test`. Workaround: the inner `try` in a function of its own.

## Row 889, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator crashes with a `NullPointerException` on a trait or object whose `extends` clause gives a generic trait a tuple static argument that holds `Any`, as `object PairHolder extends Holder[\(Any, ZZ32)\]`, which the checker accepts
- Reproducer: `ProjectFortress/compiler_tests/XXXExtendsGenericAtTupleOfAny.test`
- Notes: siblings: 820. `generateTypeReference`'s tuple branch passes an element that is neither a trait type nor a type variable back to itself with a null name (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5747` at 97a416b18), which `NamingCzar.repairedApiName` dereferences (`compiler/NamingCzar.java:1720`): 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null', on the old code and after climb batch 25's rung C. The arrow branch makes the same call (`:5774`), not measured.

## Row 890, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a `try`'s `finally` clause does not run when an exception leaves the `try` block: one that no `catch` clause takes is passed on, and one the `forbid` clause lists is thrown on as a `ForbiddenException`, both before the `finally` clause runs
- Reproducer: `ProjectFortress/compiler_tests/XXXFinallyOnEscape.test`
- Notes: `CodeGen.forTry` emits the `finally` block only after the label that the body's normal completion and a taken `catch` clause reach; the rethrow (`ATHROW`) and `throwForbiddenException` throw before it (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2075-2085` after climb batch 25's rung C). On the old code a `catch` that misses and a `finally` that appends to a log leave the log empty; walk prints `finally` (`tests/FinallyOnEscapeWalk.fss`). The `forbid` half is climb batch 25's rung C's path, the same order. Link test: `compiler_tests/FinallyOnEscapeLink.test`.

## Row 891, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a function holding a `try` with a `finally` clause and no `catch` or `forbid` clause, whose block can throw, fails verification at class load: `VerifyError: Bad return type`, the handler's `FException` left on the stack
- Reproducer: `ProjectFortress/compiler_tests/XXXTryFinallyNoCatch.test`
- Notes: siblings: 890. `CodeGen.forTry` installs its handler whatever the clauses, and with neither a `catch` nor a `forbid` clause emits no rethrow, so the handler falls into the `finally` block with the exception on the stack (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2077-2085` after climb batch 25's rung C, the same at 97a416b18). On the old code and after the rung: 'Type 'com/sun/fortress/compiler/runtimeValues/FException' (current frame, stack[0]) is not assignable to 'com/sun/fortress/compiler/runtimeValues/FVoid''; walk passes the exception on after the `finally` clause (`tests/TryFinallyNoCatchWalk.fss`). Link test: `compiler_tests/TryFinallyNoCatchLink.test`.

## Row 892, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: neither the compiled checker nor walk refuses a non-test function that calls a function declared `test`, which the tests chapter's note makes a static error: `run()` calling `test t(): () = println("in test")` compiles and runs on the compiled path after climb batch 25's rung C, and runs under walk
- Reproducer: none
- Notes: siblings: 823, 120. No gated test can pass while it shows: an `XXX` compile test of a program that compiles is red ('Saw wrong failure'). The chapter's note: "it is a static error for a non-test to refer to any test". On the old code the compile stops at row 823's guard, 'Don't know how to compile this kind of FnDecl. node = t():()'; on the rung's code `bin/fortress compile TestCallDiff.fss && bin/fortress run TestCallDiff` prints 'in test', 'DONE', and walk prints the same on both codes.

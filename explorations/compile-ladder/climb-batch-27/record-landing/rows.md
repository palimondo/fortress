<!-- The record-landing workflow's evidence of the gap ledger: each row that ed8652dc0..38887293f opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- closed as FIXED: 113, 434, 861, 897, 898, 899, 903, 906, 907, 909, 910, 911, 916
- rewritten: 321, 364, 596, 818, 908
- noted: 441, 442, 551, 872, 901, 902, 915
- opened: 918, 919, 920, 921, 922, 923, 924, 925, 926, 927, 928, 929

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 113, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: `SEQV` (`===`) on two value objects compares only the fields that the object body declares; with none, it answers `true` for unequal objects
- Reproducer: `ProjectFortress/tests/StrictEquivalenceRuleWalk.fss`
- Notes now: fixed `598331c0d`; full text: history, row 113
- The notes gained: fixed `598331c0d`;; they lost: `VPlain(1,2) SEQV VPlain(1,3) = true` and `P(1.0) === P(2.0) : true`, while `1.0 === 2.0 : false`. `FOrdinaryObject.seqv` (`FOrdinaryObject.java:46-57`) walks `ftype.getFieldNames()`, and `FTypeObject`'s constructor adds the constructor parameters to `fields` only inside its `if (v instanceof VarDecl)` branch (`FTypeObject.java:53-63`). Workaround: declare one field in the body (`VField(1,2) SE...

## Row 321, rewritten (claim, notes)

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: **an object declaring or inheriting a zero-argument member `toString` cannot be rendered on the compiled path through the prelude's `Object`: it recurses until the stack overflows**; walk prints its type name, and the one library's `Object`, whose `asString` is `self.ilkName`, does not overflow
- Claim at the base: **an object declaring or inheriting a zero-argument Fortress member named `toString` cannot be rendered on the compiled path: it recurses until the stack overflows**; walk prints its type name
- Reproducer: `ProjectFortress/compiler_tests/XXXFortToStringRungS.test`
- Notes now: The prelude's default `asString` is `jDefaultAsString(self)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355`), bound to `defaultAsString`, whose `hasOwnToString` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:112-122`) answers true, so `a.toString()` reaches `FValue.toString`, `this.asString().toString()` (`compiler/runtimeValues/FValue.java:25-27`). An `asString` over `stringOps.typeName` beside a `toString` member prints the type name (`compiler_tests/AnyNativesIntrinsicCompiled`). Ends with the prelude at the switch-over. Workaround: give the member another name. full text: history, row 321
- The notes gained: The prelude's default `asString` is `jDefaultAsString(self)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355`), bound to `defaultAsString`, whose `hasOwnToString` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:112-122`) answers true, so `a.toString()` reaches `FValue.toString`, `this.asString().toString()` (`compiler/runtimeValues/FValue.java:25-27`). An `asString` over `stringOps.typeName` beside a `toString` member prints the type name (`compiler_tests/AnyNativesIntrinsicCompiled`). Ends with the prelude at the switch-over.; they lost: Codegen emits the member as `toString()Lfortress/CompilerBuiltin$String;`. The default `asString` is `jDefaultAsString(self)` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:355` at c124c6b65), bound to `defaultAsString`, whose `hasOwnToString` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/stringOps.java:108-118`) answers true, so `a.toString()` (`:109`) reaches `FValue.toString`, `...

## Row 364, rewritten (claim, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: **walk infers a generic object's static argument from the argument's run-time class**: for `object Cell[\T extends Any\](v: T) end`, `Cell("s")` prints `Cell[\FlatString\]`, where the compiled path prints `Cell[\String\]`; `Cell(3)` prints `Cell[\ZZ32\]` but is a `Cell[\Int\]`
- Claim at the base: **walk infers a generic object's static argument from the argument's run-time class**: for `object Cell[\T extends Any\](v: T) end`, `Cell("s")` prints `Cell[\FlatString\]` and `Cell(3)` `Cell[\Int\]`, where the compiled path prints `Cell[\String\]` and `Cell[\IntLiteral\]`
- Reproducer: `ProjectFortress/tests/XXXInferredStaticArgRungS.fss`
- Notes now: The inference takes each argument's run-time type (`interpreter/evaluator/EvaluatorBase.java:602` at d4d454f9d); a lone `T` takes the narrowest (`:645`). Walk's ilk names `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` by their traits, also in static arguments (`tests/AnyNativesIntrinsicWalk`), so only the text changed: a `Cell[\Int\]` dispatches past `Cell[\ZZ32\]` to `Any` (F-74), and walk refuses `a: BoxT[\ZZ32\] = BoxT(z)`, "RHS expression type BoxT[\Int\] is not assignable" (`XXXInferredIntBindingRungT`). Workaround: `Cell[\String\]("s")`. full text: history, row 364
- The notes gained: The inference takes each argument's run-time type (`interpreter/evaluator/EvaluatorBase.java:602` at d4d454f9d); a lone `T` takes the narrowest (`:645`). Walk's ilk names `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` by their traits, also in static arguments (`tests/AnyNativesIntrinsicWalk`), so only the text changed: a `Cell[\Int\]` dispatches past `Cell[\ZZ32\]` to `Any` (F-74), and walk refuses `a: BoxT[\ZZ32\] = BoxT(z)`, "RHS expression type BoxT[\Int\] is not assignable" (`XXXInferredIntBindingRungT`).; they lost: By reading: the inference takes each argument's run-time type (`interpreter/evaluator/EvaluatorBase.java:602` at d4d454f9d); a lone `T` takes the narrowest (`:645`). A generic dotted method's lone `T` too: `O.wrap(z)` for `wrap[\T\](x: T): Box[\T\]`, `z: ZZ32`, gives `Box[\Int\]`. Only the string case is asserted: a numeral's type, `NaturalNumeral[\n,10,v\]`, is on neither path. Walk refuses `a...

## Row 434, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: design limit (library).
- Claim: `Number`'s `=` between a float and an exact number compares after `asFloat`, so it calls unequal values equal and is not transitive: `1/3 = …
- Claim at the base: `Number`'s `=` between a float and an exact number compares after `asFloat`, so it calls unequal values equal and is not transitive: `1/3 = asFloat(1/3)` is `true`, and so is `((widen(1) LSHIFT 60) + widen(1)) = asFloat(widen(1) LSHIFT 60)`
- Reproducer: `ProjectFortress/tests/NumberMixedEqualityWalk.fss`
- Notes now: fixed `a97d60dc6`; full text: history, row 434
- The notes gained: fixed `a97d60dc6`;; they lost: `Number`'s one `opr =` (`Library/FortressLibrary.fss:386-392` at c124c6b65) compares a pair with an `RR64` or `RR32` side by `asFloat(self) = asFloat(other)` and two exact numbers as rationals; its doc comment (`:383-385`) states the rule. Comparing a float by its exact rational value is transitive but needs a float-to-rational conversion the library lacks; the curator chose to keep the `asFloa...

## Row 441, noted

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: on the compiled path, the `ZZ32` `^` at a negative exponent breaks the integer power's contract: `2^(-1)` answers `0` and `0^(-1)` throws a raw `java.lang.RuntimeException` that no Fortress `catch` sees, where P-153 raises `IntegerOverflow` and `DivisionByZero`
- Reproducer: `ProjectFortress/compiler_tests/XXXIntegerPowerContractCompiled.test`
- Notes now: siblings: 523, 524, 525. The prelude binds `^` as `jIntExp` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744`) to `simpleIntArith.intExp`, which casts `Math.pow` to `int` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:415-421`): a fraction truncates to 0, and `0^(-1)` takes the overflow branch. Walk follows P-153 (`IntegerPowerContractWalk`). Closes at the switch-over (P-38): the one library binds `ZZ32`'s `^` at a `ZZ32` exponent to `simpleIntArith.intPower`, which follows P-153 on both paths (`NativeHelperFamilyShiftPowerCompiled`). Workaround: a float base, `2.0^(-1)`. full text: history, row 441
- The notes gained: The prelude binds `^` as `jIntExp` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744`) to `simpleIntArith.intExp`, which casts `Math.pow` to `int` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:415-421`): a fraction truncates to 0, and `0^(-1)` takes the overflow branch. Walk follows P-153 (`IntegerPowerContractWalk`). Closes at the switch-over (P-38): the one library binds `ZZ32`'s `^` at a `ZZ32` exponent to `simpleIntArith.intPower`, which follows P-153 on both paths (`NativeHelperFamilyShiftPowerCompiled`).; they lost: `^` is bound as `jIntExp` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:744`, at de6d905f5) to `simpleIntArith.intExp`, which casts `Math.pow` to `int` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleIntArith.java:415-421`): a fraction truncates to 0, and `0^(-1)` is infinite and takes the overflow branch. The bases 1 and -1 give their power. Walk follows P-153 (`IntegerPowerC...

## Row 442, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: the compiled path's prelude lacks conversions and operations the revised number chapters state: `ZZ32` and integer numerals into `RR64`, `NN32` into `ZZ64`, `RR64`'s `check`/`check_star`, `/` on `ZZ32`, `^` on `ZZ64`, shifts, `GCD` and `LCM` on `NN32`/`NN64`
- Reproducer: `ProjectFortress/compiler_tests/XXXInferPromoteNN32.test`
- Notes now: siblings: 349. Closes at the switch-over (POSITIONS, "The library route."). `RR64` coerces from `FloatLiteral` and `RR32` only, `ZZ64` from `IntLiteral` and `ZZ32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`, `:147-149`). `ZZ`, `ZZ64`, `NN64` lack `asRR64` and `asFloat`; `StandardTotalOrder` (`Library/CompilerAlgebra.fsi:16-22`) lacks `MIN`/`MAX`. The one library binds `NN32`'s and `NN64`'s shifts at a signed count and `ZZ64`'s `^` to new helpers that both paths run (`NativeHelperFamilyShiftPowerCompiled`). Also gated: `XXXNNShiftRungP`, `XXXNNGcdLcmRungP`, `XXXMaxNN32IntoZZ64RungM`. full text: history, row 442
- The notes gained: 349. Closes at the switch-over (POSITIONS, "The library route."). `RR64` coerces from `FloatLiteral` and `RR32` only, `ZZ64` from `IntLiteral` and `ZZ32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`, `:147-149`). `ZZ`, `ZZ64`, `NN64` lack `asRR64` and `asFloat`; `StandardTotalOrder` (`Library/CompilerAlgebra.fsi:16-22`) lacks `MIN`/`MAX`. The one library binds `NN32`'s and `NN64`'s shifts at a signed count and `ZZ64`'s `^` to new helpers that both paths run (`NativeHelperFamilyShiftPowerCompiled`).; they lost: 349 (`narrow` of a `ZZ`). Closes at the switch-over (POSITIONS, "The library route."). `RR64` coerces from `FloatLiteral` and `RR32` only, `ZZ64` from `IntLiteral` and `ZZ32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`, `:147-149`): `half(3)` for an `RR64` parameter is refused, and `MAX` or promotion of an `NN32` with a `ZZ32` gives `ZZ`, not `ZZ64`. `ZZ`, `ZZ64`, `NN64`...

## Row 551, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, the load check does not check a `comprises` clause declared outside the main component, so a type below none of its listed types loads and can dispatch to whichever of two incomparable declarations was written first
- Reproducer: `ProjectFortress/tests/XXXComprisesLibraryTraitUnlistedExtender.fss`
- Notes now: siblings: 487, 595, 596, 597, 598. Main component's half fixed `7ed2a8387` (climb batch 9, rung K); `checkComprisesClauses` skips another unit's clause (`BuildEnvironments.java:1191`). `S comprises { U, V }`, `T comprises { V, W }`, `U excludes W`, `V extends { S, T }`, `object Z extends { S, T }`, `f(S)`, `f(T)`, `f(V)` in a component of their own: `f(Z)` prints `f(S)` (`SkNonMain551`, `explorations/compile-ladder/rung-walk-load-check/SKEPTIC.md` section 3). The reproducer's `object Value extends AnyIntegral`, below none of `AnyIntegral`'s listed types, loads and prints `Value`. A fix revises Appendix I's "The traits that extend a closed trait". full text: history, row 551
- The notes gained: The reproducer's `object Value extends AnyIntegral`, below none of `AnyIntegral`'s listed types, loads and prints `Value`.; they lost: Row 22's `object Value extends Number` loads; compiled it prints `Value`, the prelude's `Number` being open (`CompilerBuiltin.fss:510`).

## Row 596, rewritten (claim, spec, notes)

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: library bug (tests).
- Claim: three team tests and two demos declare objects extending the library's `Exception` directly, below none of its listed types: `tests/extendException.fss:17`, `atomicList.fss:24`, `typeTests.fss:15`, `demos/tictactoe.fss:29`, `newtictactoe.fss:26`
- Claim at the base: four team tests and two demos declare objects extending the library's `Number` or `Exception` directly, below none of their listed types: `tests/extendNumber.fss:17`, `extendException.fss:17`, `atomicList.fss:24`, `typeTests.fss:15`, `demos/tictactoe.fss:29`, `newtictactoe.fss:26`
- Reproducer: none
- Notes now: siblings: 595, 551. Walk loads them (row 551); the compiled checker over the one library refuses them, as would a walk check reading the library's clauses (`explorations/compile-ladder/rung-walk-load-check/REPORT.md` section 5, `:199`). The repair, a team-test edit, is the curator's: extend `UncheckedException`. `tests/extendNumber.fss`, once the row's fourth program, needs none: `Number` has no `comprises` clause (P-160). full text: history, row 596
- The notes gained: `UncheckedException`. `tests/extendNumber.fss`, once the row's fourth program, needs none: `Number` has no `comprises` clause (P-160).; they lost: `UncheckedException`; `extendNumber` needs none: P-160 removes `Number`'s clause (`Library/FortressLibrary.fss:380-381`), which the compiled prelude lacks (`CompilerBuiltin.fss:510`).

## Row 818, rewritten (claim, reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator refuses a dispatched call that has a type assumption at some of its dispatched arguments but not at all, as `pair(Leaf asif Named, Leaf)` beside overloads at `Named` and at `Leaf`: "Can't compile a dispatched call whose arguments are not all type assumptions"
- Claim at the base: the code generator compiles no type assumption, `e asif T`: it has no case for `AsIfExpr` and stops, "Can't compile AsIfExpr"; declarations of the one library that the checker passes are refused at it, `SequentialGenerator`'s `asString` (`Library/FortressLibrary.fss:1496`) among them
- Reproducer: XXXAsIfPartialCallCompiled
- Notes now: The other forms compile (AsIfCallsCompiled): at a receiver, the static body that the assumed trait's `DefaultTraitMethods` class holds; at a call whose every dispatched argument is an assumption, the declaration the checker resolves; elsewhere the value (`CodeGen.java`, `assumedReceiverCall`, `assumedArgumentsCall`, `forAsIfExpr`). Also refused: a call of another component's overloaded function, a functional method whose `self` is not first, a generic method on an assumed receiver (XXXAsIfGenericMethodCompiled) and an overloaded generic function (XXXAsIfGenericFunctionCompiled). The library's `String.fss:67`, `:69` (`concatAndBalanceIfNecessary(s1 asif String, s2)`) are of the refused form.
- The notes gained: The other forms compile (AsIfCallsCompiled): at a receiver, the static body that the assumed trait's `DefaultTraitMethods` class holds; at a call whose every dispatched argument is an assumption, the declaration the checker resolves; elsewhere the value (`CodeGen.java`, `assumedReceiverCall`, `assumedArgumentsCall`, `forAsIfExpr`). Also refused: a call of another component's overloaded function, a functional method whose `self` is not first, a generic method on an assumed receiver (XXXAsIfGenericMethodCompiled) and an overloaded generic function (XXXAsIfGenericFunctionCompiled). The library's `String.fss:67`, `:69` (`concatAndBalanceIfNecessary(s1 asif String, s2)`) are of the refused form.; they lost: `CodeGen.defaultCase` throws `sayWhat` for a node it has no visitor for (`compiler/codegen/CodeGen.java:1675-1677` at c124c6b65). Probe AsIfProbe.fss, uncommitted, under the compiler's prelude: `trait Named getter name(): String = "Named" end`, `object Leaf extends Named getter name(): String = "Leaf" end`, `run():() = println((Leaf asif Named).name)`: 'AsIfProbe.fss:11:25-35: Can't compile AsI...

## Row 861, closed as FIXED

- Section: 10. Strings, maps and printing. Status: CONTESTED at the base, FIXED. Class: implementation gap (runtime).
- Claim: walk's `Char` `asExprString` and the compiled path's helper write a character outside ASCII differently: for `char(233)` walk's glue gives `'\'0e9''` …
- Claim at the base: walk's `Char` `asExprString` and the compiled path's helper write a character outside ASCII differently: for `char(233)` walk's glue gives `'\'0e9''` and `simpleChar.charToExprString` gives `'é 00e9'`; for `char(128512)`, `'\'0f600''` and `'1f600'`
- Reproducer: `ProjectFortress/tests/NativeHelperFamilyCharWalk.fss`
- Notes now: fixed `fc860b655`; settled by P-163, option (d) of the review char-asexprstring-2026-11-06; full text: history, row 861
- The notes gained: fixed `fc860b655`; settled by P-163, option (d) of the review char-asexprstring-2026-11-06; full text: history, row 861; they lost: Walk's `Char$ToExprString` is `FChar.toString`, `"'" + Unprinter.enQuote(getString()) + "'"` (`interpreter/glue/prim/Char.java:177-181`, `interpreter/evaluator/values/FChar.java:104-106`); the helper, which the prelude binds, writes the character and its hex code, or the code alone past U+FFFF (`nativeHelpers/simpleChar.java:21-44`). They agree only at printable ASCII other than `\` and `"`, an...

## Row 872, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: `Char`'s `asString` of a character past U+FFFF answers the one-character string of its low 16 bits, under walk's glue, the helper `simpleChar.charToString` and the compiled prelude alike: `char(66560).asString`, U+10400, equals `char(1024).asString`, U+0400
- Reproducer: `ProjectFortress/tests/CharAsStringSupplementaryWalk.fss`
- Notes now: Walk's glue `Char$ToString` is `String.valueOf((char) val)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FChar.java:100-102`); the helper `Char`'s `asString` names is `Character.toString((char)x)` (`nativeHelpers/simpleChar.java:16-19`); the prelude's `Character` `asString` calls it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1065`). `FlatString.javaIndexOf` names `stringOps.indexOf`, which searches for the code point: in `"a" \|\| char(128512).asString \|\| "b"` it answers -1 for `char(128512)`, where the glue's low 16 bits answered 1. A compiled program: 'true' for U+10400 and for U+1F600. flatConcat at a Char too: simpleConcatenate.nativeConcatenateChar.
- The notes gained: flatConcat at a Char too: simpleConcatenate.nativeConcatenateChar.

## Row 897, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, three glue natives over `Number` cannot read a `QQ`: `random(1/3)` and `atan2(0.5 + 0.5, 1/3)` end the run with 'getFloat not implemented …
- Claim at the base: under walk, three glue natives over `Number` cannot read a `QQ`: `random(1/3)` and `atan2(0.5 + 0.5, 1/3)` end the run with 'getFloat not implemented for FOrdinaryObject', an `InterpreterBug`, and `printThreadInfo(1/3)` prints 'operating on value Ratio', the type's name
- Reproducer: `ProjectFortress/tests/NativeHelperRationalArgumentWalk.fss`
- Notes now: fixed `e4872ad93`; full text: history, row 897
- The notes gained: fixed `e4872ad93`; full text: history, row 897; they lost: siblings: 846. `random(a:Number)` (`Library/FortressLibrary.fss:4537`), `printThreadInfo(a:Number)` (`:4633`) and `Float`'s `atan2(self,x:Number)` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:176-177`) name `Float$Random`, `StringPrim$PrintThreadInfo` and `Float$ATan2`, which read a Java value; a library object gets `FValue.getFloat`'s throw (`interpreter/evaluator/values/FValue.java:74...

## Row 898, closed as FIXED

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (parser).
- Claim: the parser's hexadecimal character literal reads no code of six digits and no lower-case five-digit code whose first four are decimal digits: …
- Claim at the base: the parser's hexadecimal character literal reads no code of six digits and no lower-case five-digit code whose first four are decimal digits: `'10FFFF'` and `'1000a'` (U+1000A) are refused, "a numeral contains letters and does not have a radix specifier", while `'1000A'` reads 65546
- Reproducer: `ProjectFortress/tests/CharExprStringReadBack.fss`
- Notes now: fixed `fc860b655`; full text: history, row 898
- The notes gained: fixed `fc860b655`; full text: history, row 898; they lost: `UnicodeHexChar` (`ProjectFortress/src/com/sun/fortress/parser/Literal.rats:460-464`, at c141e7f6a) tries four or five digits before `10` and four, and commits to the first choice that matches: `10FFF` of `10FFFF`, `1000` of `1000a` (the optional fifth is upper case in the first choice). The specification allows four or more digits. The review's sweep: plane 16 (65.5K) fails in either case, and...

## Row 899, closed as FIXED

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, `BufferedWriter`'s `asString` stops the run: "Missing value: $under in environment", at `Library/Writer.fss:53:54-57`
- Reproducer: `ProjectFortress/tests/NativeHelperWriterWalk.fss`
- Notes now: fixed `c21780408`; full text: history, row 899
- The notes gained: fixed `c21780408`; full text: history, row 899; they lost: `object BufferedWriter(under: WriteStream, size: ZZ32)` has `getter asString(): String = "BufferedWriter on " under.asString` (`Library/Writer.fss:52-53`, at c141e7f6a); it is a native object, whose value parameter is bound as no field. `bin/fortress` on `b = BufferedWriter(Writer("tmp/review-rows/buf-out.txt"), 8)` then `println(b.asString)`: 'ProgramError: …Library/Writer.fss:53:54-57: Missin...

## Row 901, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: library bug (library).
- Claim: the one library's `FileWriteStream` has no `flush()`, though `Library/File.fsi:131` declares it: under walk `o.flush()` stops the run, "Cannot find definition for method flush given receiver <Write handle to …>"
- Reproducer: none
- Notes now: siblings: 841, 900. `object FileWriteStream` in `Library/File.fss:66` declares no `flush`, at c141e7f6a; walk does not check a component against its api (row 841). Extending `WriteStream` (row 900) asks for it too: `abstract flush()`, `Library/Stream.fsi:64`. `bin/fortress` on `o = FileWriteStream("out"); o.write("x\n"); o.flush()`: the error quoted, rc=1. The writer rung of climb batch 27 left `FileWriteStream` on its glue, since an object of a native component holds no field under walk (row 926); the fix waits for the reader rung, which ends `File`'s nativeness.
- The notes gained: The writer rung of climb batch 27 left `FileWriteStream` on its glue, since an object of a native component holds no field under walk (row 926); the fix waits for the reader rung, which ends `File`'s nativeness.

## Row 902, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, opening a missing file stops the run with an error that no `catch` sees: `FileReadStream("…/no-such-file.txt")` inside a `try` whose `catch` names `IOFailure` ends 'ProgramError: … FileNotFound: …', rc=1
- Reproducer: none
- Notes now: siblings: 903. The glue answers `error("FileNotFound: " + name)` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FileReadStream.java:43-44`, at c141e7f6a), a walk error, not a Fortress exception. `bin/fortress` on that `try`: 'FileNotFound: tmp/review-rows/no-such-file.txt', and 'after the try' never printed. The compiled helpers raise `fortress.CompilerBuiltin$FileNotFoundException` (`nativeHelpers/fileOps.java:37`, `:82`). `Writer(name)` now raises the library's `FileNotFoundException`, which a `catch` sees (`tests/NativeHelperWriterWalk`); `FileWriteStream`'s glue still answers the walk error (`interpreter/glue/prim/FileWriteStream.java:43-44`).
- The notes gained: `Writer(name)` now raises the library's `FileNotFoundException`, which a `catch` sees (`tests/NativeHelperWriterWalk`); `FileWriteStream`'s glue still answers the walk error (`interpreter/glue/prim/FileWriteStream.java:43-44`).

## Row 903, closed as FIXED

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library gap vs spec (library).
- Claim: the one library declares no `FileNotFoundException`, which the file helpers raise (`fortress.CompilerBuiltin$FileNotFoundException`, …
- Claim at the base: the one library declares no `FileNotFoundException`, which the file helpers raise (`fortress.CompilerBuiltin$FileNotFoundException`, `nativeHelpers/fileOps.java:37`, `:82`); walk turns a helper's raise into the library's object of that name, so a file opened through a helper cannot raise its error
- Reproducer: `ProjectFortress/tests/NativeHelperWriterWalk.fss`
- Notes now: fixed `c21780408`; full text: history, row 903
- The notes gained: fixed `c21780408`; full text: history, row 903; they lost: siblings: 902. `grep -rn FileNotFoundException Library/*.fsi Library/*.fss ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` prints only a comment, `Library/CompilerLibrary.fss:173`, at c141e7f6a; the one library declares `IOFailure` as a singleton (`Library/FortressLibrary.fsi:1201`); the prelude declares `FileNotFoundException` with a message. Walk maps a raise by name (`interpreter/glue/St...

## Row 906, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: on the compiled path `SEQV` (`===`) compares two value objects by reference, so the `value` modifier has no effect on it: for `value object Vpt(a: …
- Claim at the base: on the compiled path `SEQV` (`===`) compares two value objects by reference, so the `value` modifier has no effect on it: for `value object Vpt(a: ZZ32, b: ZZ32)`, `Vpt(1,2) === Vpt(1,2)` is `false`
- Reproducer: `ProjectFortress/compiler_tests/StrictEquivalenceRuleCompiled.test`
- Notes now: fixed `598331c0d`; full text: history, row 906
- The notes gained: fixed `598331c0d`; full text: history, row 906; they lost: Compiled scratch program: `value Vpt(1,2) SEQV Vpt(1,2): false`, `v1 SEQV v1: true`, as for a plain `object Rpt`. The prelude's `opr ===(a:Any, b:Any) = jSEQUIV(a,b)` (`Library/CompilerLibrary.fss:63`, family `:62-71`, at caa0ffc61) binds `equality.sEquiv`, which is `a == b` (`nativeHelpers/equality.java:14-19`). Walk's departure is row 113.

## Row 907, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: on the compiled path `SEQV` (`===`) compares two equal tuples by reference, where the rule compares them element by element: `t1 === t2` for `t1, t2: …
- Claim at the base: on the compiled path `SEQV` (`===`) compares two equal tuples by reference, where the rule compares them element by element: `t1 === t2` for `t1, t2: (ZZ32, ZZ32) = (1, 2)` is `false`
- Reproducer: `ProjectFortress/compiler_tests/StrictEquivalenceRuleCompiled.test`
- Notes now: fixed `598331c0d`; full text: history, row 907
- The notes gained: fixed `598331c0d`; full text: history, row 907; they lost: siblings: 906. A tuple is a value object (`basic/objects.tex`, "Objects"). Compiled scratch program: `tuple (1,2) SEQV (1,2): false`. No member of the prelude's `===` family takes a tuple, so the call reaches `opr ===(a:Any, b:Any) = jSEQUIV(a,b)` (`Library/CompilerLibrary.fss:63`, at caa0ffc61), whose `equality.sEquiv` is `a == b` (`nativeHelpers/equality.java:14-19`). Walk answers `true` (`FT...

## Row 908, rewritten (claim, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: on the compiled path, until the switch-over, the prelude's `opr ===` at `RR64` and at `RR32` answers two floats by `=`, not by their bit patterns: `0.0 === -0.0` is `true` and a NaN `===` itself is `false`, though the helper `equality.sEquiv` compares floats by their bits
- Claim at the base: on the compiled path `SEQV` (`===`) on two floats is `=`, not a comparison of bit patterns: `0.0 === -0.0` is `true` and a NaN `===` itself is `false`; walk answers both by the rule
- Reproducer: none
- Notes now: The rule: "two binary words are strictly equivalent if and only if they contain the same bit pattern". The prelude declares `opr ===(a:RR64, b:RR64) = a=b` and the same for `RR32` (`Library/CompilerLibrary.fss:66-67`), and answers first; P-38 keeps its text until the prelude goes. The helper, bound at `Any`, answers `0.0`/`-0.0` `false` and a NaN with itself `true` (`compiler_tests/StrictEquivalenceRuleCompiled.fss`). Walk answers by the rule. Ends at the switch-over, when the one library's `SEQV` names the helper (P-167).
- The notes gained: The prelude declares `opr ===(a:RR64, b:RR64) = a=b` and the same for `RR32` (`Library/CompilerLibrary.fss:66-67`), and answers first; P-38 keeps its text until the prelude goes. The helper, bound at `Any`, answers `0.0`/`-0.0` `false` and a NaN with itself `true` (`compiler_tests/StrictEquivalenceRuleCompiled.fss`). Walk answers by the rule. Ends at the switch-over, when the one library's `SEQV` names the helper (P-167).; they lost: Compiled scratch program, `RR64` variables, `nan = zero / zero`: `1/nz: -Infinity`, `0.0 SEQV -0.0: true`, `NaN SEQV NaN: false`. The prelude declares `opr ===(a:RR64, b:RR64) = a=b` and the same for `RR32` (`Library/CompilerLibrary.fss:66-67`, at caa0ffc61). Walk, the same values: `0.0 SEQV -0.0: false`, `NaN SEQV NaN: true`.

## Row 909, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk `SEQV` answers `true` for numbers of different types and for tuples of them: `3 SEQV 3.0`, `x SEQV z` for `x: ZZ32 = 3`, `z: ZZ64 = 3`, and …
- Claim at the base: under walk `SEQV` answers `true` for numbers of different types and for tuples of them: `3 SEQV 3.0`, `x SEQV z` for `x: ZZ32 = 3`, `z: ZZ64 = 3`, and `(1,2) SEQV (1,2.0)`, where values of different types are never equivalent
- Reproducer: `ProjectFortress/tests/StrictEquivalenceRuleWalk.fss`
- Notes now: fixed `598331c0d`; full text: history, row 909
- The notes gained: fixed `598331c0d`; full text: history, row 909; they lost: Walk scratch program: `3 SEQV 3.0: true`, `3 SEQV w (w: ZZ64): true`, `ZZ32 3 SEQV RR64 3.0: true`, `(1,2) SEQV (1,2.0): true`, `(x,x) SEQV (z,r): true`. `FInt.seqv` accepts an `FLong`, `FFloat` or `FFloatLiteral` and compares the values (`interpreter/evaluator/values/FInt.java:53-61`, at caa0ffc61); `FTupleLike.seqv` compares element by element (`FTupleLike.java:71-81`). The compiled path answ...

## Row 910, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library gap vs spec (library).
- Claim: the library declares the numeral objects `FloatLiteral` and `IntLiteral` as plain objects, not `value object`, though the specification lists numeric …
- Claim at the base: the library declares the numeral objects `FloatLiteral` and `IntLiteral` as plain objects, not `value object`, though the specification lists numeric literals among the value objects and the library's other number objects are value objects
- Reproducer: `ProjectFortress/tests/StrictEquivalenceRuleWalk.fss`
- Notes now: fixed `598331c0d`; full text: history, row 910
- The notes gained: fixed `598331c0d`; full text: history, row 910; they lost: By reading, at caa0ffc61: `object FloatLiteral extends RR64` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:196`) and `object IntLiteral extends Number` (`:486`), beside `value object Float`, `RR32`, `Int`, `Long`, `NN32`, `UnsignedLong` and `BigNum` (`:54`, `:205`, `:369`, `:378`, `:387`, `:475`, `:565`). The chapter: "booleans, numeric literals, IEEE floating-point numbers, and integers...

## Row 911, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library gap vs spec (library).
- Claim: `QQ`'s `Ratio` is declared a plain object, not `value object`, while `ZZ`'s `BigNum` is a `value object`; the specification's list makes …
- Claim at the base: `QQ`'s `Ratio` is declared a plain object, not `value object`, while `ZZ`'s `BigNum` is a `value object`; the specification's list makes arbitrary-precision numbers reference objects, so the two library declarations of its arbitrary-precision numbers disagree
- Reproducer: `ProjectFortress/tests/StrictEquivalenceRuleWalk.fss`
- Notes now: fixed `598331c0d`; full text: history, row 911
- The notes gained: fixed `598331c0d`; full text: history, row 911; they lost: siblings: 910. By reading, at caa0ffc61: `object Ratio(num: ZZ, den: ZZ) extends { QQ }` (`Library/FortressLibrary.fss:664`) and `value object BigNum extends ZZ` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:565`). The chapter: "Reference objects include arbitrary-precision numbers", and also "integers are value objects". Settled by P-166, the curator's decision of 2026-11-06: `Ratio` be...

## Row 915, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: `\|\|` of a string and a `Char` past U+FFFF keeps only the character's low 16 bits: under walk `"x" \|\| '1F600'` is two units, `x` and U+F600, and compiled the same
- Reproducer: none
- Notes now: siblings: 872. Walk: `FlatString`'s `\|\|(self, b:Char)` calls `flatConcat(self, b)`, bound to the glue `FlatString$Concat`, which takes `other.getString()`, and `FChar.getString` is `String.valueOf((char) val)` (`Library/FlatString.fss:96-97`, `:144-149`; `interpreter/glue/prim/FlatString.java:173-178`; `interpreter/evaluator/values/FChar.java:97-102`, at 1176c7979). Compiled: `JavaString`'s `\|\|` takes `b.asString`, row 872's helper (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:432`). Workaround: join the two surrogates as `Char`s, `("x" \|\| e[1]) \|\| e[2]`. `bin/fortress` on `"x" \|\| '1F600'`, each unit's code point: '120 62976'. flatConcat: now nativeConcatenateChar, same.
- The notes gained: flatConcat: now nativeConcatenateChar, same.

## Row 916, closed as FIXED

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: library gap vs spec (library).
- Claim: top-level `match(regex:FlatString, some:FlatString)` has no overload over `String`, so walk refuses a rope, a `SubString` or a program's own string at …
- Claim at the base: top-level `match(regex:FlatString, some:FlatString)` has no overload over `String`, so walk refuses a rope, a `SubString` or a program's own string at the call: `match("abc.*", c)` for a rope `c` of 52 characters stops: 'Closure/Constructor for match parameter 2 (some:FlatString) got type CatString'
- Reproducer: `ProjectFortress/tests/AnyNativesIntrinsicWalk.fss`
- Notes now: fixed `5ae581c4a`; Repaired by match(regex:String, some:String) flattening both arguments by typecase on the pair of asFlatStrings, Library/FortressLibrary.fss:4718-4722, .fsi:2653; its repair settled by the coordinator's rider of 2026-11-07 under the curator's rule of a batch's scope (climb batch 27, fork A6).; full text: history, row 916
- The notes gained: fixed `5ae581c4a`; Repaired by match(regex:String, some:String) flattening both arguments by typecase on the pair of asFlatStrings, Library/FortressLibrary.fss:4718-4722, .fsi:2653; its repair settled by the coordinator's rider of 2026-11-07 under the curator's rule of a batch's scope (climb batch 27, fork A6).; full text: history, row 916; they lost: siblings: 846. Only the native over `FlatString` is declared (`Library/FortressLibrary.fss:4615`, `.fsi:2576`, at 4ea5167e0), unlike the five natives over `FlatString` beside overloads over `String` that flatten by `typecase` on `asFlatString` (F-299; `printlnWithThread`, `:4640-4644`). A `SubString` gives 'got type SubString', the review's `Rep` 'got type Rep'; `match("abc.*", c.asFlatString)`...

## Row 918, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker over the one library accepts a program's trait that declares its own functional `+` and excludes neither `Number` nor arrays beside the library's `+` between an array and a number, a pair that it refuses inside one component and walk refuses at load
- Reproducer: `ProjectFortress/tests/NumberOpenTraitPlusBesideArrayWalk.fss`
- Notes: With `Number` open, walk's load check: 'fails the Meet Rule: neither is found to be more specific than the other or to exclude it' (the reproducer, `Library/FortressLibrary.fss:5061`). The count stage's driver over the reproducer: '### rc=0'; over a copy with the library's `opr +` declared in the program as `PLUS`: 'Invalid overloading of PLUS in component OpenPlusControl', 1 error. `tests/CoercionOverloadRungC.fss:6` now excludes `Number`. Its compiled half waits for the switch-over.

## Row 919, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a type assumption outlives its enclosing call: bound to a name, `n = Leaf asif Named`, or as an `if` branch's value, the value keeps the assumed type, so `n.name` runs `Named`'s getter and `who(n)` the overload at `Named`
- Reproducer: XXXAsIfBoundWalk
- Notes: Walk wraps the value in an `FAsIf` (`interpreter/evaluator/Evaluator.java:109-116`) and a local binding keeps the wrapper. A parameter drops it: `caption(Leaf asif Named)` reads `Leaf`'s getter in the body (AsIfCallsWalk). A probe printing `n.name` and `who(n)` printed `Named` and `Named`. The compiled path gives the value (AsIfCallsCompiled). Library forms: `ReflectiveQuickCheck.fss:78`, `:94`, `:256`, `:313` bind an assumption to a name. The demo turnersParaffins0's keys `0 asif ZZ32` reach `Library/Map.fss:165` wrapped, through the varargs tuples of `Map.fsi:100`: `NonPrimitive.java:117-126` strips only top-level arguments. The demo runs since row 921's fix.

## Row 920, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a binding cannot take apart a tuple under a type assumption: `(a, k) = (Leaf, 3) asif (Named, ZZ32)` stops, "RHS does not yield a tuple"
- Reproducer: XXXAsIfTupleWalk
- Notes: The message is `interpreter/evaluator/BuildLetEnvironments.java:106`: the `FAsIf` wrapper (`interpreter/evaluator/values/FAsIf.java`) is no tuple. The compiled path takes the tuple apart (AsIfCallsCompiled). The library puts an assumption on a tuple as a comprehension's element (`String.fss:468`, `:471`).

## Row 921, opened

- Section: 4. Operators and overloading under walk. Status: FIXED. Class: implementation gap (walk).
- Claim: under walk an overloaded dotted method called on an assumed receiver stops: `(Leaf asif Named).pick(Leaf asif Named)`, with `pick` at `Named` and at …
- Reproducer: `ProjectFortress/tests/AsIfOverloadedMethodWalk.fss`
- Notes: fixed `4445d848b`; fixed in `interpreter/evaluator/values/DottedMethodApplication.java:96-97`, `:119-138`: the assumed trait's overloads gathered into an OverloadedMethod; turnersParaffins0 reaches its end; full text: history, row 921

## Row 922, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a generic method called on an assumed receiver stops: `(Leaf asif Named).gm[\String\]("a")`, with `gm[\X extends Object\](x: X)` in trait `Named` and overridden in object `Leaf`, gives 'Unexpected Selection result in Juxt of FnRef of Selection'
- Reproducer: XXXAsIfGenericMethodWalk
- Notes: Measured on the base `ed8652dc0` with the old code tool; walk is unchanged by the rung. The compiled path refuses the same call, 'Can't compile a type assumption at the receiver of a generic method yet' (XXXAsIfGenericMethodCompiled). A method without static parameters on an assumed receiver runs under walk (AsIfCallsWalk).

## Row 923, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: design limit (library).
- Claim: the library declares `=` on pairs and triples only, so a tuple of four or more elements compares by the fallback `a SEQV b`: under walk two such tuples whose strings are equal but built apart are not equal, `(s1, 1, 2, 3) = (s2, 1, 2, 3)` is `false` for `s1 = s2`
- Reproducer: `ProjectFortress/tests/StrictEquivalenceRuleWalk.fss`
- Notes: `opr =[\A,B\]` and `opr =[\A,B,C\]` over tuples (`Library/FortressLibrary.fss:4775`, `:4831`); a longer tuple reaches `opr =(a:Any, b:Any) = a SEQV b` (`:96`), element by element (`interpreter/evaluator/values/FTupleLike.java:78`), and strings are reference objects (P-168). The test asserts the pair and the triple `true` and the 4-tuple `false`. Before strings were reference objects walk answered `true`. Workaround: compare the elements, or nest a pair or triple. Compiled: the prelude declares no tuple `=`.

## Row 924, opened

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: the parser reads one 16-bit unit as the character of a character literal, so a character past U+FFFF written as itself is refused, alone, `'😀'`, or followed by a space and its code, `'😀 1f600'`: "Syntax Error"; its code alone, `'1f600'`, reads 128512
- Reproducer: XXXCharLiteralSupplementary
- Notes: The single-character and redundant choices of `CharLiteralContent` take `a1:(!InvalidCharLiteralContent _)`, one Java `char` (`ProjectFortress/src/com/sun/fortress/parser/Literal.rats:447`, `:453`), so a supplementary character's high surrogate is read alone and the low one stands where the space or the closing mark must be. A sweep with `Parser.parseString` of the form 'character, space, code' refused every code point of plane 1 (65,536) and of a sample of planes 2 to 15 (131,072). `Char`'s `asExprString` writes the code alone past U+FFFF, so its text reads back.

## Row 925, opened

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: a character literal of a short name that the parser lists and that begins with two hexadecimal digits of one case, as `'BETA'`, `'delta'`, `'CAP'` or `'DEL'`, is refused: "Syntax Error: a hexadecimal character literal has fewer than four hexadecimal digits"; `'ALPHA'` reads 913
- Reproducer: XXXCharLiteralShortName
- Notes: `CharLiteralContent` tries `UnicodeCharLiteralContent` before the names (`ProjectFortress/src/com/sun/fortress/parser/Literal.rats:198-200`); `UnicodeHexChar`'s `ErrorProduction2` (`:473-477`) takes the two digits and commits. Eleven names: BETA DELTA beta delta CAP CAPCAP CENTS DEGREES DEL CBRT DASHV. `Parser.parseString` of `c = 'BETA'` on the base's and rung C's classes: the message above both times.

## Row 926, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-BOUNDED. Class: design limit (walk).
- Claim: under walk, no object of a `native component` can be a plain Fortress object: walk builds each one through a glue class of its name and evaluates its fields once, without the object, so `FileWriteStream` cannot hold its Java writer in a field while `File` stays native
- Reproducer: none
- Notes: `CUWrapper` builds every native component by `BuildNativeEnvironment` (`ProjectFortress/src/com/sun/fortress/interpreter/env/CUWrapper.java:122`), whose `forObjectDecl1` makes each object's constructor from the class `<package>.<Name>` (`interpreter/evaluator/BuildNativeEnvironment.java:99-150`); `NativeConstructor.initializeSelfEnv` evaluates the fields once per constructor (`interpreter/evaluator/values/NativeConstructor.java:71-88`), at 85236bf98. A probe `FileWriteStream` in `Library/File.fss` with the field `under: JavaBufferedWriter = makeJavaBufferedWriter(fileName)`: 'File.fss:67:56-62: undefined variable [$self]', rc=1. Way through: end `File`'s nativeness, the reader rung's step.

## Row 927, opened

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: a `Char` past U+FFFF written through a `Writer` keeps only its low 16 bits: under walk `w.write(char(128512))` to a file reads back as U+F600, on the glue before the writer moved and on `fileOps.jbwWriteChar` after
- Reproducer: XXXWriterCharSupplementaryWalk
- Notes: siblings: 915. `jbwWriteChar` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/fileOps.java:100`) calls `FortressBufferedWriter.write(int)`, which calls `java.io.BufferedWriter.write(int)`, one 16-bit unit (`compiler/runtimeValues/FortressBufferedWriter.java:38-40`), at 85236bf98; the glue took `FChar.getString`, `String.valueOf((char) val)` (row 915). The old and the new code wrote the same bytes, 'ed 84 9e', for `stdOut.write(char(119070))` and to a file (probe `WriterOldNew.fss`). Workaround: write the character as a string literal.

## Row 928, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: design limit (library).
- Claim: under walk, a program's object that extends `JavaBufferedWriter` loads, and its first call of an inherited `write`, `flush` or `close` stops, since those are natives over a Java writer and the trait has no `comprises` clause to name its private native object
- Reproducer: none
- Notes: siblings: 551. The trait (`Library/FortressLibrary.fss:1948-1957`) has no `comprises` clause, unlike `ZZ32`'s `comprises { Int }` (`Library/FortressLibrary.fsi:553`), since its native object `JavaBufferedWriterObject` is private to `FortressBuiltin` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:790`); the loader's `unbox` refuses any other value (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:292-295`). Probe `object Fake extends JavaBufferedWriter end` with `Fake.write("x")`: 'No Java FortressBufferedWriter carries Fake', rc=1; on the base, 'JavaBufferedWriter is undefined.'. Workaround: a program's own writer extends `WriteStream`.

## Row 929, opened (changed after the landing)

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker crashes, 'Comparison method violates its general contract!', at a call with 32 or more applicable candidates: it sorts them by `moreSpecific`, a partial order, with `sortWith`, and Java's TimSort refuses some orders; on climb batch 27's tree, `x = -1` in `Char`'s `digit`
- Reproducer: explorations/coordinator/tools/distance/run.sh
- Notes: siblings: `Functionals.scala:728`, `CoercionOracle.scala:255`, `Formula.scala:609`. `Functionals.scala:761`, at a2f0b5cf2: `Ordering.fromLessThan` reads incomparable candidates as equal, which is not transitive; TimSort checks only on 32 or more. `FortressBuiltin.fss:692` meets 33 candidates of `=`, 24 of them rung N's pairs; their order is the hash order of the overloadings' names (`ExprDisambiguator.scala:870-874`), which hold declaration lines, so one blank line at `FortressBuiltin.fss:14` hides it. The distance's two `#crash` rows; the stage keeps `Char` unchecked. Way through: order by rank, at a cost in time.

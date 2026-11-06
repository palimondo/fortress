<!-- The record-landing workflow's evidence of the gap ledger: each row that 4d27fbcc5..61f1c6a93 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 76, 368, 497, 872
- rewritten: 304, 440, 846
- closed as FIXED: 672, 804
- opened: 893, 894, 895

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 76, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: library bug (prelude).
- Claim: G6 — string juxtaposition inserts spaces on the compiled path, silently changing almost every program's output
- Reproducer: `ProjectFortress/compiler_tests/XXXJuxtConcatRungS.test`
- Notes now: One token: `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:406` defines `String` juxtaposition as `self \|\|\| b`, the concatenation that inserts a space, where `Library/FortressLibrary.fss:4328-4329` use `\|\|`. Walk `k=5`, compiled `k= 5`. The chapter makes juxtaposition with a string on the left concatenation, `\|\|` with no separator. The ladder file `tests/simplify1.fss`, which the code generator now compiles, prints FAIL by this row: its `joinString(a, b) = a b` answers "cat dog". Link test `ProjectFortress/compiler_tests/JuxtConcatRungSLink.test`; the expected failure goes red on a local fix of the token. Rows 314 and 316 avoid it by writing `\|\|`. full text: history, row 76
- The notes gained: `k=5`, compiled `k= 5`. The chapter makes juxtaposition with a string on the left concatenation, `\|\|` with no separator. The ladder file `tests/simplify1.fss`, which the code generator now compiles, prints FAIL by this row: its `joinString(a, b) = a b` answers "cat dog". Link test `ProjectFortress/compiler_tests/JuxtConcatRungSLink.test`; the expected failure goes red on a local fix of the token. Rows 314 and 316 avoid it by writing `\|\|`.; they lost: `[15.0]`, `[<Box>]`, `k=5`; compiled `[ 15.0 ]`, `[< Box >]`, `k= 5`. The chapter's introduction makes juxtaposition with a string on the left concatenation, and concatenation is `\|\|` with no separator. Link test `ProjectFortress/compiler_tests/JuxtConcatRungSLink.test`; the expected failure goes red on a local fix of the token. Rows 314 and 316 avoid it by writing `\|\|`. Probe `explorations...

## Row 304, rewritten (claim, spec, reproducer, notes)

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator compiles a local function as a closure, but refuses three forms that the specification allows: a local function with static parameters of its own, two local functions of one name in a block, and the `atomic` modifier
- Claim at the base: the code generator cannot compile a **local function**, `Can't compile LetFn`; the same program with the function at component level compiles and runs
- Reproducer: `ProjectFortress/compiler_tests/XXXLocalFunctionGenericCompiled.test`
- Notes now: `CodeGen.forLetFn` throws 'Can't compile a local function with static parameters of its own yet', 'Can't compile overloaded local functions yet' and 'Can't compile a local function with this modifier yet' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3588-3592` at dbf4825e0), after the checker passes each program. Other reproducers: `XXXLocalFunctionOverloadedCompiled.test`, `XXXLocalFunctionAtomicCompiled.test`. Also refused: a varargs parameter (row 624), a helper binding (row 865), a contract (row 701). Walk runs local functions. Workaround: lift the function to component level, or give each overload its own name.
- The notes gained: `CodeGen.forLetFn` throws 'Can't compile a local function with static parameters of its own yet', 'Can't compile overloaded local functions yet' and 'Can't compile a local function with this modifier yet' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3588-3592` at dbf4825e0), after the checker passes each program. Other reproducers: `XXXLocalFunctionOverloadedCompiled.test`, `XXXLocalFunctionAtomicCompiled.test`. Also refused: a varargs parameter (row 624), a helper binding (row 865), a contract (row 701). Walk runs local functions. Workaround: lift the function to component level, or give each overload its own name.; they lost: siblings: 81, 312. `CodeGen.sayWhat` throws it (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1555` at 052a7c3fe): row 81's `sayWhat` on another construct; row 312, the refusal one construct away, is closed. An expression block's elements include local function declarations. Walk runs the probe (48.4 s). Workaround: lift the function to component level, as row 303's fair l...

## Row 368, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the native-wrapper generator refuses an imported Java class if any of its methods, private ones included, has a parameter or result type with no Fortress counterpart, and names no method
- Reproducer: none
- Notes now: Adding `private static boolean hasOwnToString(Class<?> c)` to `nativeHelpers/stringOps.java` fails the rebuild of `CompilerBuiltin`, `java.lang.Error: No Fortress type (yet) for foreign Java type descriptor 'Ljava/lang/Class;'`, imported by no Fortress source. `FortressTransformer` reads the whole class (`compiler/nativeInterface/FortressTransformer.java:53`); `FortressMethodAdapter.visitMethod` wraps all but `<init>`, `<clinit>` and unsayable descriptors (`FortressMethodAdapter.java:215-225`); `toImplFFFF` throws for an unmapped type (`:250-258`). Workaround: give each private helper a mappable signature. siblings: 895, the checker's whole-class read. full text: history, row 368
- The notes gained: signature. siblings: 895, the checker's whole-class read.; they lost: signature (`hasOwnToString(fortress.AnyType.Any a)`).

## Row 440, rewritten (claim, spec, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (library).
- Claim: under `walk`, `QQ` answers 0/0 compared with itself with `true` for `=`, `<=` and `>=`, and with `EqualTo` for `CMP`, where the specification makes 0/0 unordered with itself, so that the five comparisons are false and `CMP` answers `Unordered`
- Claim at the base: under `walk`, `QQ` answers `0/0 = 0/0` with `true` and `0/0 CMP 0/0` with `EqualTo`, where the specification makes 0/0 unordered with itself, so that the five comparisons are false and `CMP` answers `Unordered`
- Reproducer: `ProjectFortress/tests/XXXRationalUnorderedRungP.fss`
- Notes now: `QQ`'s `opr =` (`Library/FortressLibrary.fss:597-598` at 4d27fbcc5) compares numerators and denominators, under the team's comment "0/0 = 0/0 is supposed to be true (//unlike// the behavior of floating-point NaN)" (`:596`); its `<=` and `>=` (`:605`, `:607`) and `StandardPartialOrder`'s `CMP` (`:224-229`) answer from it, while `0/0 < 0/0` is `false` and `0/0 CMP 1` `Unordered`. `MIN`, `MAX` and `MINMAX` (`:610-619`), `MINNUM` and `MAXNUM` (`:658-661`) find 0/0 by `=`. The prelude has no `QQ`. `<=`, `>=`: '0/0 <= 0/0 true 0/0 >= 0/0 true' (`NanQQ.fss` at a3252d568). Full text: history, row 440
- The notes gained: (`Library/FortressLibrary.fss:597-598` at 4d27fbcc5) compares numerators and denominators, under the team's comment "0/0 = 0/0 is supposed to be true (//unlike// the behavior of floating-point NaN)" (`:596`); its `<=` and `>=` (`:605`, `:607`) and `StandardPartialOrder`'s `CMP` (`:224-229`) answer from it, while `0/0 < 0/0` is `false` and `0/0 CMP 1` `Unordered`. `MIN`, `MAX` and `MINMAX` (`:610-619`), `MINNUM` and `MAXNUM` (`:658-661`) find 0/0 by `=`. The prelude has no `QQ`. `<=`, `>=`: '0/0 <= 0/0 true 0/0 >= 0/0 true' (`NanQQ.fss` at a3252d568). Full; they lost: (`Library/FortressLibrary.fss:594-595` at 052a7c3fe) compares numerators and denominators, under the team's comment "0/0 = 0/0 is supposed to be true (//unlike// the behavior of floating-point NaN)" (`:593`); `StandardPartialOrder`'s `CMP` (`:221-226`) answers `EqualTo` from it, while `0/0 < 0/0` is `false` and `0/0 CMP 1` `Unordered`. `MIN`, `MAX`, `MINMAX` (`:607-616`), `MINNUM` and `MAXNUM`...

## Row 497, noted

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: a local declared in a `do … also` arm takes local slot 0 of the task's `compute`, the slot of `this`, so a later read of a variable the arm captured fails verification: `VerifyError: Bad type on operand stack`
- Reproducer: `ProjectFortress/compiler_tests/XXXTaskArmLocalSlot.test`
- Notes now: `CodeGen.generateTaskCompute` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5014`) never calls `mv.reserveSlot0()`, as `forFnExpr`'s `apply` does. Met by a local in an arm, by a local a nested `also` reads, and by a named `typecase` clause or a `catch` name in an arm (`XXXTryInArmRungG`, with row 322). Not met by a local function called from both arms, or calling itself from both with its locals declared before the block (`compiler_tests/LocalFunctionGenericContextCompiled`). Walk is right at 1 and 4 threads. Link test: `TaskArmLocalSlotLink.test`. full text: history, row 497
- The notes gained: (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:5014`) never calls `mv.reserveSlot0()`, as `forFnExpr`'s `apply` does. Met by a local in an arm, by a local a nested `also` reads, and by a named `typecase` clause or a `catch` name in an arm (`XXXTryInArmRungG`, with row 322). Not met by a local function called from both arms, or calling itself from both with its locals declared before the block (`compiler_tests/LocalFunctionGenericContextCompiled`).; they lost: (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4739-4763`) opens the method with `visitCode` (`:4742`) and never calls `mv.reserveSlot0()`, as `forFnExpr`'s `apply` does (`:3509`). Met by a plain `j: ZZ32 = 2` in an arm (`locals: { FZZ32 }`), by a local a nested `also` reads, and, since rung G binds a clause's name as a local, by a named `typecase` clause (`locals: { Wrap...

## Row 672, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED at the base, FIXED. Class: library gap vs spec (library).
- Claim: a float compared with a NaN by `<`, `<=`, `>` or `>=` answers `false` on both paths, where `opr-overview.tex` says the comparison throws …
- Claim at the base: a float compared with a NaN by `<`, `<=`, `>` or `>=` answers `false` on both paths, where `opr-overview.tex` says the comparison throws `FloatingComparisonError`; the specification's `QQ` gives `false` at 0/0 "for compatibility with floating-point arithmetic"
- Reproducer: `ProjectFortress/tests/ComparisonAtNaNWalk.fss`
- Notes now: fixed `3eabf8435`; settled by P-159: the overview's float and rational sentences revised in Appendix I's form to false and Unordered; full text: history, row 672
- The notes gained: fixed `3eabf8435`; settled by P-159: the overview's float and rational sentences revised in Appendix I's form to false and Unordered; full text: history, row 672; they lost: siblings: 440, 634. Walk's `RR64` compares through `asFloat` (`Library/FortressLibrary.fss:442-445` at 636d687b3), Java's comparison; compiled, `nan < 1.0` and `nan >= 1.0` print `false` (probe `NanLess.fss` on 4f84f330a). Both libraries declare `FloatingComparisonError` (`Library/FortressLibrary.fsi:1154`, `Library/CompilerLibrary.fsi:99`) and nothing throws it. The tuples' `Unordered => false...

## Row 804, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: walk refuses at load, 'with generic type, at least one pair of parameters must have excluding types', a program's generic operators between an array …
- Claim at the base: walk refuses at load, 'with generic type, at least one pair of parameters must have excluding types', a program's generic operators between an array of a number type and a number, on either side, beside a self-typed additive group's own operator, which the compiled checker accepts and runs (P-157)
- Reproducer: `ProjectFortress/tests/ExclusionVectorScalarWalk.fss`
- Notes now: fixed `c41c3d2b0`; full text: history, row 804
- The notes gained: fixed `c41c3d2b0`;; they lost: siblings: 539, 713, 779. Walk reads `self` as `AddG[\T\] & {T}` but, where a parameter type is generic, asks a pair of parameter types that exclude (`OverloadedFunction.java:553-554` at 00f2e1bdc): it takes neither the equality of the static parameters that the bounds force nor the exclusion at it. The library's own pairs (`FortressLibrary.fss:4928` against `:361` at 6aa8d3509) load: walk prove...

## Row 846, rewritten (claim, reproducer, notes)

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a native that a program binds over `String` to a glue class receives a non-flat string's type name, not its characters: `p(a:String):()` bound to `StringPrim$PrintlnWithThread` prints ' Thread 26: CatString' at a string made by `\|\|`
- Claim at the base: under walk, a native bound over `String`, glue class or `nativeHelpers` helper alike, receives a non-flat string's type name, not its characters: `slen(s)`, for `slen(a:String):ZZ32` bound to `simpleConcatenate.nativeStrlen` and a 52-character `s` made by `\|\|`, answers 9, the length of `CatString`
- Reproducer: `ProjectFortress/tests/NativeGlueNonFlatStringWalk.fss`
- Notes now: `StringPrim$GetEnvironment` answers `CatString` too. The glue's `Util.SS2B` and `S2V` take `v.getString()` (`interpreter/glue/prim/Util.java:254`, `:286`), which `FObject.getString` answers with `type().toString()` (`interpreter/evaluator/values/FObject.java:33-35`); `NativeApp` hands a glue class walk's values as they come (`interpreter/glue/NativeApp.java:208-212`). A helper parameter declared `String` is refused at load (`interpreter/glue/StaticNativeApp.java:70`, `:178`), which `ProjectFortress/tests/NativeHelperNonFlatStringWalk.fss` checks. No binding of the library is over `String`. Fix: flatten the argument first, or bind over `FlatString`.
- The notes gained: `StringPrim$GetEnvironment` answers `CatString` too. The glue's `Util.SS2B` and `S2V` take `v.getString()` (`interpreter/glue/prim/Util.java:254`, `:286`), which `FObject.getString` answers with `type().toString()` (`interpreter/evaluator/values/FObject.java:33-35`); `NativeApp` hands a glue class walk's values as they come (`interpreter/glue/NativeApp.java:208-212`). A helper parameter declared `String` is refused at load (`interpreter/glue/StaticNativeApp.java:70`, `:178`), which `ProjectFortress/tests/NativeHelperNonFlatStringWalk.fss` checks. No binding of the library is over `String`.; they lost: `StaticNativeApp.unbox` takes `v.getString()` for a Java `String` (`ProjectFortress/src/com/sun/fortress/interpreter/glue/StaticNativeApp.java:231`), as glue's `Util.SS2B` and `S2V` do (`interpreter/glue/prim/Util.java:254`, `:286`); `FObject.getString` answers `type().toString()` (`interpreter/evaluator/values/FObject.java:33-35`). A probe: the glue binding `printWithThread(s)` prints ' Thread...

## Row 872, noted

- Section: 10. Strings, maps and printing. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: `Char`'s `asString` of a character past U+FFFF answers the one-character string of its low 16 bits, under walk's glue, the helper `simpleChar.charToString` and the compiled prelude alike: `char(66560).asString`, U+10400, equals `char(1024).asString`, U+0400
- Reproducer: `ProjectFortress/tests/CharAsStringSupplementaryWalk.fss`
- Notes now: Walk's glue `Char$ToString` is `String.valueOf((char) val)` (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FChar.java:100-102`); the helper `Char`'s `asString` names is `Character.toString((char)x)` (`nativeHelpers/simpleChar.java:16-19`); the prelude's `Character` `asString` calls it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1065`). `FlatString.javaIndexOf` names `stringOps.indexOf`, which searches for the code point: in `"a" \|\| char(128512).asString \|\| "b"` it answers -1 for `char(128512)`, where the glue's low 16 bits answered 1. A compiled program: 'true' for U+10400 and for U+1F600.
- The notes gained: `Char`'s `asString` names is `Character.toString((char)x)` (`nativeHelpers/simpleChar.java:16-19`); the prelude's `Character` `asString` calls it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1065`). `FlatString.javaIndexOf` names `stringOps.indexOf`, which searches for the code point: in `"a" \|\| char(128512).asString \|\| "b"` it answers -1 for `char(128512)`, where the glue's low 16 bits answered 1. A compiled program:; they lost: that `Char`'s `asString` names since rung H is `Character.toString((char)x)`, "This implementation is incorrect for supplementary characters!" (`nativeHelpers/simpleChar.java:16-19`); the prelude's `Character` `asString` calls it (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:1065`). The api: "we don't presently deal gracefully with %Char%s outside the 16-bit plane" (`Library/FortressLibr...

## Row 893, opened

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object that extends a self-typed trait at a type it is not a subtype of loads, a static error by the specification; walk's load check reads that trait's `self` as `C[\X\] & X`, so a call that the trait's operator and a generic array operator both fit runs one of them
- Reproducer: `ProjectFortress/tests/XXXSelfTypeExtenderOtherTypeWalk.fss`
- Notes: siblings: 804. `object Bad extends { Arry[\Rr\], AddG[\Rr\] }` beside `MINUS[\T extends { Numb, AddG[\T\] }\](x: Arry[\T\], y: T)`: `Bad MINUS Rr` prints 'array minus number', where `AddG[\Rr\]`'s `MINUS` fits too and neither is more specific. At 4d27fbcc5 walk refused the program at load, 'with generic type, at least one pair of parameters must have excluding types'; since rung W it loads (`selfTypeParameter`, `OverloadedFunction.java:845-867` at aee91971e). Walk applies no extender rule of P-146 (`Specification/appendices/changes.tex:4105-4106`); the checker refuses `Bad`, 'whose self parameter is Rr, but Bad is not a subtype of Rr.'

## Row 894, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: CONTESTED. Class: implementation gap (checker).
- Claim: the compiled checker refuses, 'Overload violation: the declaration of top-level function PLUS ... is more specific than the declaration of the functional method PLUS', a generic function inside a self-typed trait's functional method's declared domain whose return type holds, which walk loads
- Reproducer: `ProjectFortress/tests/GenericInsideTraitMethodWalk.fss`
- Notes: siblings: 739, 804. `PLUS[\T extends AddG[\T\]\](x: Sub[\T\], y: T): T` beside `AddG`'s `opr PLUS(self, other: T): T`, `Sub[\T\] extends AddG[\T\]`: the Return Type Rule holds at every instance; walk loads it since rung W and runs each object's own `PLUS`. The checker's `checkFancyRule` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:413-424` at aee91971e) refuses every top-level function more specific than a functional method of its name, a rule that `advanced/overloading.tex` does not state; contested: no decision says whether it is a rule of the language (`reviews/popl2019-rules-map.md`, section 18).

## Row 895, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: checked against the interpreter's prelude, a binding that names any helper of `nativeHelpers/systemOps` stops its component with 'FortressBuiltin.StringVector is undefined.': the checker reads the whole class, and `systemOps.getArgs` answers an `FStringVector`
- Reproducer: none
- Notes: siblings: 368. `getArgs` (`ProjectFortress/src/com/sun/fortress/nativeHelpers/systemOps.java:29`, at 8b6fca9b5); `NamingCzar` maps `FStringVector` to `FortressBuiltin.StringVector` (`compiler/NamingCzar.java:339-340`), which the interpreter's `FortressBuiltin` does not declare. The distance stage with `Library/FlatString.fss:25-26` naming `systemOps.lineSeparator`: 'FortressBuiltin.StringVector is undefined.', 'File FlatString.fss has 1 error.', '#total none: 1 target(s) stopped'. `System`'s `getEnvironment` and `getProperty` name `systemOps` (`Library/System.fss:41`, `:51`); neither stage reads `System`. Workaround: name a helper of another class.

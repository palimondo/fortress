<!-- The record-landing workflow's evidence of the gap ledger: each row that b5b0f82c1..f629cd2dd opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- rewritten: 80, 82, 513, 514, 694, 957, 959, 960, 963, 966, 971
- noted: 314, 316, 442, 581, 652, 691, 769, 893, 962
- closed as FIXED: 318, 328, 362, 961, 968, 969, 970, 972
- opened: 973, 974

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 80, rewritten (reproducer, notes)

- Section: 11. Parallelism, exceptions and control flow. Status: FIXED. Class: implementation gap (prelude).
- Claim: `case x of <int literal>` compiles clean and throws at run time
- Reproducer: none
- Notes now: fixed 54861b62a (ladder rung 6); its test, `ProjectFortress/library_tests/IntLiteralRung6.test`, left with the prelude's `IntLiteral` in a26e74f5c8, which deleted that type; the `IntLiteral` arithmetic family is row 318; closing this row opened row 317; full text: history, row 80
- The notes gained: its test, `ProjectFortress/library_tests/IntLiteralRung6.test`, left with the prelude's `IntLiteral` in a26e74f5c8, which deleted that type;

## Row 82, rewritten (claim)

- Section: 11. Parallelism, exceptions and control flow. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: on the compiled path `spawn` yields a thread handle with no methods: `t.val()` fails with `No such method Thread[\NaturalNumeral[\2,10,42\]\].val.`
- Claim at the base: on the compiled path `spawn` yields a thread handle with no methods: `t.val()` fails with `No such method Thread[\IntLiteral\].val.`
- Reproducer: none

## Row 314, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: the compiled path's prelude lacks the specification's comparing `assert(x: Any, y: Any, failMsg: Any...)` and its `deny`, declaring them only at `ZZ32`, `String` and `Character`, so a call such as `assert(3 IN C, true, "...")` is refused: `Could not check call to function assert`
- Reproducer: none
- Notes now: siblings: 604. `Library/CompilerLibrary.fsi:45-58` declare `assert` at `(ZZ32, ZZ32)` and `(String, String)`, with or without a message, and at `(Character, Character, String)`, and `deny` at the three-argument shapes; a `(Boolean, Boolean, String)` call, a pair of objects or a second message value is refused, as in the team's four `objectCC_*mutVar*` tests (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv:315-318`). The `Any` form cannot be copied: `opr ===` over `Any` compares boxes, and a varargs parameter's use is refused there (row 604). Workaround: `assert(3 IN C, "...")` (`:36`). full text: history, row 314
- The notes gained: nothing; they lost: an `Any` parameter blocks the `IntLiteral`-to-`ZZ32` coercion,

## Row 316, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: the compiled path's `String` declares `\|\|`, `\|\|\|`, `//` and `juxtaposition` with `self` on the left only, so `1 \|\| "a"` is refused on the compiled path, where walk answers `1a`, and `1 "a"` meets the same one-sided form
- Reproducer: none
- Notes now: siblings: 76. `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:37-40` declare each as `opr OP(self, b:Object)`: `(String, Object)->String is not applicable to an argument of type (NaturalNumeral[\1,10,1\], String)`. Walk's library has top-level `opr \|\|(a:Any, b:String)` and its kin, as for `juxtaposition`. The compiled `//` puts `makeCharacter(10)` between its operands (`CompilerBuiltin.fss:407`), where walk's `newline` is `lineSeparator` (`Library/String.fss:578`). The prelude goes at the switch-over. Probe `SkCompiledLeft.fss`, never committed: `explorations/compile-ladder/rung-library-meets/SKEPTIC.md` section 5. full text: history, row 316
- The notes gained: (NaturalNumeral[\1,10,1\],; they lost: (IntLiteral,

## Row 318, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (prelude).
- Claim: on the compiled path 21 operators of `IntLiteral` (`DOT`, `CROSS`, `DIV`, bitwise, boxed and dotted forms, `\|self\|`, `MINMAX`, `CHOOSE`, `even`, …
- Claim at the base: on the compiled path 21 operators of `IntLiteral` (`DOT`, `CROSS`, `DIV`, bitwise, boxed and dotted forms, `\|self\|`, `MINMAX`, `CHOOSE`, `even`, `odd`) throw `CompilerFailureDetectedAtRunTime`; the overload blocks coercion to `ZZ32`, so one on two undeclared integer literals compiles and throws
- Reproducer: `ProjectFortress/compiler_tests/NumeralDivByZeroCompiled.test`
- Notes now: fixed `a26e74f5c`; full text: history, row 318
- The notes gained: fixed `a26e74f5c`;; they lost: siblings: 328, 954, 955. The stubs are `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:896-928` at c124c6b65; `grep -c 'throw Compiler'` there prints 21. The numeral fold leaves `n DIV 0` and the wrapping, saturating and bitwise operators of two numerals (climb batch 29 rung F), so `1 DIV 0` reaches its stub where `DivisionByZero` is the answer. Fixed half: unary and binary `-`, `+` and jux...

## Row 328, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (prelude).
- Claim: on the compiled path, until the switch-over, two `IntLiteral` values compare at `ZZ64`, so comparing one outside `ZZ64` throws where the specification …
- Claim at the base: on the compiled path, until the switch-over, two `IntLiteral` values compare at `ZZ64`, so comparing one outside `ZZ64` throws where the specification requires an answer: `lt(a: IntLiteral, b: IntLiteral): Boolean = a < b` dies at `lt(18446744073709551615, 5)` with `Not in range for ZZ64`
- Reproducer: none
- Notes now: fixed `a26e74f5c`; the prelude's IntLiteral, whose comparisons the row holds, is gone with the static numerals: lt(a: IntLiteral, b: IntLiteral) is refused, 'IntLiteral is undefined.', and a = 18446744073709551615 then a < 5 answers false (rung A's skeptic, program 9); full text: history, row 328
- The notes gained: fixed `a26e74f5c`; the prelude's IntLiteral, whose comparisons the row holds, is gone with the static numerals: lt(a: IntLiteral, b: IntLiteral) is refused, 'IntLiteral is undefined.', and a = 18446744073709551615 then a < 5 answers false (rung A's skeptic, program 9);; they lost: `trait IntLiteral`'s six comparisons are each `self.asZZ64 <op> other.asZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:912-917` at c124c6b65), and `FIntLiteral.asZZ64` raises for a numeral carried as a decimal string (`compiler/runtimeValues/FIntLiteral.java:74-77`). Since climb batch 29 an untyped binding takes the numeral's default and numerals alone fold (F-342, F-339), so `a = 1...

## Row 362, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (runtime).
- Claim: the compiled path throws `NullPointerException` when it renders a float numeral's own value: inside a program's `coerce(x: FloatLiteral)`, `"" x` …
- Claim at the base: the compiled path throws `NullPointerException` when it renders a float numeral's own value: inside a program's `coerce(x: FloatLiteral)`, `"" x` fails; a float numeral where nothing fixes a type is an `RR64`, so `println(2.5)`, `"…" 2.5` and `(1.1_2).asString` render
- Reproducer: `ProjectFortress/compiler_tests/FloatLiteralValuePrint.test`
- Notes now: fixed `a26e74f5c`; full text: history, row 362
- The notes gained: fixed `a26e74f5c`;; they lost: siblings: 321, 862. The runtime `FFloatLiteral.asString()` is `return null; /* replaced in generated code */` (`compiler/runtimeValues/FFloatLiteral.java:52-53`) and the prelude's `trait FloatLiteral` declares no `asString`, so a `FloatLiteral` value fails where it is rendered, as in `String`'s juxtaposition. Only a parameter of type `FloatLiteral` holds such a value now, and the compiled coerc...

## Row 442, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (prelude).
- Claim: the compiled path's prelude lacks conversions and operations the revised number chapters state: `ZZ32` and integer numerals into `RR64`, `NN32` into `ZZ64`, `RR64`'s `check`/`check_star`, `/` on `ZZ32`, `^` on `ZZ64`, shifts, `GCD` and `LCM` on `NN32`/`NN64`
- Reproducer: `ProjectFortress/compiler_tests/XXXInferPromoteNN32.test`
- Notes now: siblings: 349. Closes at the switch-over (POSITIONS, "The library route."). `RR64` coerces from `RadixPointNumeral` and `RR32` only, `ZZ64` from `NaturalNumeral` and `ZZ32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:401-403`, `:147-149`). `ZZ`, `ZZ64`, `NN64` lack `asRR64` and `asFloat`; `StandardTotalOrder` (`Library/CompilerAlgebra.fsi:16-22`) lacks `MIN`/`MAX`. The one library binds `NN32`'s and `NN64`'s shifts at a signed count and `ZZ64`'s `^` to new helpers that both paths run (`NativeHelperFamilyShiftPowerCompiled`). Also gated: `XXXNNShiftRungP`, `XXXNNGcdLcmRungP`, `XXXMaxNN32IntoZZ64RungM`. full text: history, row 442
- The notes gained: `RadixPointNumeral` and `RR32` only, `ZZ64` from `NaturalNumeral` and `ZZ32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:401-403`,; they lost: `FloatLiteral` and `RR32` only, `ZZ64` from `IntLiteral` and `ZZ32` only (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:433-435`,

## Row 513, rewritten (claim, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under `walk`, a generic trait's coercion that declares its own static parameter is not applied, unless it is a numeral coercion: `fR(x: WideR[\ZZ32\])` with a `TagROf[\String\]`, where `trait WideR[\T\]` declares `coerce[\S\](x: TagR[\S\])`, is refused, "Unification error"; the compiled run converts
- Claim at the base: under `walk`, a generic trait's coercion that declares its own static parameter is not applied: `fR(x: WideR[\ZZ32\])` with a `TagROf[\String\]`, where `trait WideR[\T\]` declares `coerce[\S\](x: TagR[\S\])`, is refused, "Unification error"; the compiled run converts
- Reproducer: `ProjectFortress/tests/XXXCoercionOwnStaticRungK.fss`
- Notes now: siblings: 389. The lifted coercion's static parameters are the trait's followed by its own (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionLifter.scala:151-153`); `Coercions.genericCoercionFor` skips one whose static parameters outnumber the target's, so `coercionFor` infers from the value alone and fails. A coercion generic over a numeral's four numbers, as `Gen[\T\]`'s, walk applies through `Coercions.numeralCoercions` with the four numbers bound as values (`tests/NumeralGenericOwnTypeWalk.fss`). The checker fixes the leading ones from the target's arguments, the rest from the value.
- The notes gained: target's, so `coercionFor` infers from the value alone and fails. A coercion generic over a numeral's four numbers, as `Gen[\T\]`'s, walk applies through `Coercions.numeralCoercions` with the four numbers bound as values (`tests/NumeralGenericOwnTypeWalk.fss`). The checker fixes the leading ones from the target's arguments, the rest from the value.; they lost: target's (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:117`), so `coercionFor` infers from the value alone and fails. The checker fixes the leading ones from the target's arguments, the rest from the value (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:217-220`). No declaration of the library or the tests has such a coercio...

## Row 514, rewritten (claim)

- Section: 8. Generators, reductions and ranges. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (prelude).
- Claim: the compiled path has no strided range: `seq(0:10:3)` is refused by the checker, "(ZZ32, ZZ32)->Range is not applicable to an argument of type (Range, NaturalNumeral[\1,10,3\])", while walk runs it (4 elements)
- Claim at the base: the compiled path has no strided range: `seq(0:10:3)` is refused by the checker, "(ZZ32, ZZ32)->Range is not applicable to an argument of type (Range, IntLiteral)", while walk runs it (4 elements)
- Reproducer: `ProjectFortress/compiler_tests/XXXStridedRangeRungT.fss`

## Row 581, noted

- Section: 6. Integer arithmetic. Status: NEGATIVE-VERIFIED. Class: library gap vs spec (library).
- Claim: under the compiled checker over the one library, `(3).minimum` and `(3).maximum` are refused, "IntLiteral has no getter called minimum"
- Reproducer: none
- Notes now: Does not reproduce at b5b0f82c13 or on climb batch 29b's merged tree: `WorldFlip -stop check` (`explorations/coordinator/tools/checker-count/`, the count stage's driver) of a program printing `(3).minimum` and `(3).maximum` ends rc 0 with no error, where `(3).noSuchGetterHere` is refused, 'NaturalNumeral[\1,10,3\] has no getter called noSuchGetterHere' (at b5b0f82c13 'NaturalNumeral has no getter ...'). They are `ZZ32`'s getters (`Library/FortressLibrary.fsi:542-543`, at de6d905f5). Rung Q's check of `base` (0 errors) against `edit3` (2 errors): `explorations/compile-ladder/rung-numeral-library/SKEPTIC.md:100`. full text: history, row 581
- The notes gained: Does not reproduce at b5b0f82c13 or on climb batch 29b's merged tree: `WorldFlip -stop check` (`explorations/coordinator/tools/checker-count/`, the count stage's driver) of a program printing `(3).minimum` and `(3).maximum` ends rc 0 with no error, where `(3).noSuchGetterHere` is refused, 'NaturalNumeral[\1,10,3\] has no getter called noSuchGetterHere' (at b5b0f82c13 'NaturalNumeral has no getter ...'). They are `ZZ32`'s getters (`Library/FortressLibrary.fsi:542-543`, at de6d905f5). Rung Q's check of `base` (0 errors) against `edit3` (2 errors):; they lost: They are `ZZ32`'s getters (`Library/FortressLibrary.fsi:542-543`, at de6d905f5), which a numeral reached as a `ZZ32` before rung Q; neither the one library's `IntLiteral` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:179`) nor the compiler library's (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:390-431`) declares them. The open question is whether a numeral has range bounds at all...

## Row 652, noted

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: keyword parameters are built on neither path: the compiled checker reads a keyword parameter as a positional one, so a call that leaves out its argument is refused, and refuses one written without a type; walk stops on such a call
- Reproducer: `ProjectFortress/compiler_tests/XXXKeywordParamOmitted.test`
- Notes now: siblings: 405. `k(x: ZZ32, y: ZZ32 = 3)` called as `k(4)`: compiled, 'Could not check call to function k - (ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type NaturalNumeral[\1,10,4\].'; with `y = 3`, 'Missing parameter type for y' (`STypeEnv.scala:199-200`), where `functions.tex:171-172` takes the type of the default expression; walk, 'InterpreterBug ... The number of parameters (2) does not match with the number of arguments (1).' The chapter's draft note says keyword parameters are not supported yet.
- The notes gained: NaturalNumeral[\1,10,4\].';; they lost: IntLiteral.';

## Row 691, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker accepts a call of a generic function with more arguments than parameters and the code drops the extra ones: `g(a, a, a, a)` for `g[\T\](a: K, b: K, c: K)` runs `g(a, a, a)`; a tight juxtaposition `a(b)(c)(d)` runs a generic ternary `opr juxtaposition` on `a`, `b`, `c`
- Reproducer: none
- Notes now: Under the bound `Any`, `q = id((3, 4))` for `id[\T\](x: T): T` binds the pair and `q + 1` is refused, '(ZZ32, ZZ32)->ZZ32 is not applicable to an argument of type ((NaturalNumeral[\1,10,3\], NaturalNumeral[\1,10,4\]), NaturalNumeral[\1,10,1\])', where `Object` ran `id(3)`; with `T extends Object` written, `idO((z, w))` still runs `idO(z)` (rung-bound-any's SKEPTIC.md). A non-generic `g` is refused. Measured on a1a75716a: `g` returning `900 + 100 a.i + 10 b.i + c.i`, `a.i = 1`, prints `1011`; `(a(b)(c)(d)).i` prints `1023`, where binary applications give `1234`. Walk stops: 'The number of parameters (3) does not match with the number of arguments (4).' full text: history, row 691
- The notes gained: ((NaturalNumeral[\1,10,3\], NaturalNumeral[\1,10,4\]), NaturalNumeral[\1,10,1\])', where `Object` ran `id(3)`; with `T extends Object` written, `idO((z, w))` still runs `idO(z)` (rung-bound-any's SKEPTIC.md). A non-generic `g` is refused. Measured on a1a75716a: `g` returning `900 + 100 a.i + 10 b.i + c.i`, `a.i = 1`, prints `1011`; `(a(b)(c)(d)).i` prints `1023`, where binary applications give `1234`. Walk stops: 'The number of parameters (3) does not match with the number of arguments (4).'; they lost: ((IntLiteral, IntLiteral), IntLiteral)', where `Object` ran `id(3)`; with `T extends Object` written, `idO((z, w))` still runs `idO(z)` (`compile-ladder/rung-bound-any/SKEPTIC.md`). A non-generic `g(a: K, b: K, c: K)` is refused. Measured on a1a75716a: `g` returning `900 + 100 a.i + 10 b.i + c.i`, `a.i = 1`, prints `1011`; `(a(b)(c)(d)).i` prints `1023`, where binary applications give `1234`. W...

## Row 694, rewritten (claim, notes)

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker's choice for a dotted call whose numeral arguments need a coercion keeps a declaration that the receiver's `override` overrides: with object `B`'s `override f(x: Number, y: NN32)` over trait `A`'s `f(x: NN32, y: NN32)`, `B.f(3, 4)` is refused as an ambiguous coercion
- Claim at the base: the compiled checker's choice for a dotted call whose numeral arguments need a coercion keeps a declaration that the receiver's `override` overrides: with object `B`'s `override f(x: Number, y: ZZ32)` over trait `A`'s `f(x: ZZ32, y: ZZ32)`, `B.f(3, 4)` is refused as an ambiguous coercion
- Reproducer: none
- Notes now: siblings: 391, 610, 650, 653. `bin/fortress typecheck` on climb batch 29b's merged tree, rc=255: 'Ambiguous coercion in method invocation B.f: of the declarations applicable to an argument of type (NaturalNumeral[\1,10,3\], NaturalNumeral[\1,10,4\]) only by coercion, none is more specific than every other: (NN32, NN32)->Any; (Number, NN32)->String.' At `ZZ32`, the numerals' default, the call checks and the override is chosen: with `A`'s `f(x: ZZ32, y: ZZ32): Any`, `s: String = B.f(3, 4)` checks, as with `ZZ32` arguments. Walk prints `B`. A `typecheck` test needs no code generator, so row 650 does not stop a reproducer.
- The notes gained: on climb batch 29b's merged tree, rc=255: 'Ambiguous coercion in method invocation B.f: of the declarations applicable to an argument of type (NaturalNumeral[\1,10,3\], NaturalNumeral[\1,10,4\]) only by coercion, none is more specific than every other: (NN32, NN32)->Any; (Number, NN32)->String.' At `ZZ32`, the numerals' default, the call checks and the override is chosen: with `A`'s `f(x: ZZ32, y: ZZ32): Any`, `s: String = B.f(3, 4)` checks, as with `ZZ32` arguments.; they lost: at c124c6b65, rc=255: 'Ambiguous coercion in method invocation B.f: of the declarations applicable to an argument of type (IntLiteral, IntLiteral) only by coercion, none is more specific than every other: (ZZ32, ZZ32)->String; (Number, ZZ32)->String.', the same message as without `override` on a1a75716a. There, with `ZZ32` arguments the override drops `A`'s `f`: `f(x: ZZ32, y: ZZ32): Any` besid...

## Row 769, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled export check refuses an exported function satisfied by a set of declarations: `pick(q: Q): ZZ32` with `trait Q comprises { R1, R2 }`, met by `pick(r: R1): ZZ32` and `pick(r: R2): ZZ32`, is refused, 'does not define all declarations', where walk runs the program
- Reproducer: `ProjectFortress/compiler_tests/XXXExportSetOfDeclarations.test`
- Notes now: siblings: 834, 835. `existsMatching` asks of each api declaration one component declaration with an equal header (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/ExportChecker.scala:431-437`, `:290` at c124c6b65); the text asks a set the union of whose parameter types is the exported one's (`source-code.tex:356-361`), and the union of R1 and R2 is Q (`basic/types-vals-vars.tex`, "Intersection and Union Types"). A left-out return type is taken only from the api declaration of the function's own parameter types, so a member of such a set that leaves its return type out takes none (its body's type, `ZZ32`, measured). Workaround: export `pick(q: Q)` itself.
- The notes gained: `ZZ32`,; they lost: IntLiteral,

## Row 893, noted

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an object that extends a self-typed trait at a type it is not a subtype of loads, a static error by the specification; walk's load check reads that trait's `self` as `C[\X\] & X`, so a call that the trait's operator and a generic array operator both fit runs one of them
- Reproducer: `ProjectFortress/tests/XXXSelfTypeExtenderOtherTypeWalk.fss`
- Notes now: siblings: 804. `object Bad extends { Arry[\Rr\], AddG[\Rr\] }` beside `MINUS[\T extends { Numb, AddG[\T\] }\](x: Arry[\T\], y: T)`: `Bad MINUS Rr` prints 'array minus number', where `AddG[\Rr\]`'s `MINUS` fits too and neither is more specific. Walk's exclusion test reads the self parameter so (`selfTypeParameter`, `OverloadedFunction.java:845-867` at c124c6b65), and walk applies no extender rule of P-146 (`Specification/appendices/changes.tex:4308-4309`); the checker refuses `Bad`, 'whose self parameter is Rr, but Bad is not a subtype of Rr.'
- The notes gained: (`Specification/appendices/changes.tex:4308-4309`);; they lost: (`Specification/appendices/changes.tex:4291-4292`);

## Row 957, rewritten (claim, reproducer, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: on the compiled path a numeral at a place whose type names a type parameter of its generic declaration calls the coercion's method at each evaluation: in `object Box[\T\]`, `m(): Gen[\T\] = 3` gives two objects for two calls at one instance's type, where P-176 has one value for each instance
- Claim at the base: on the compiled path a numeral at a program's own generic type calls the program's coercion at each evaluation of its site: for `site(): Gen[\String\] = 3`, two calls of `site()` give two objects, where a numeral at a program's type is one object per site (P-174)
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralGenericPlaceCompiled.test`
- Notes now: siblings: 971. A place whose type names no type variable, as `site(): Gen[\RR64\] = 3`, is one object (`compiler_tests/NumeralCoercionGenericTypeCompiled.test`). `numeralCoercionSiteDesc` (`compiler/codegen/CodeGen.java`) leaves a place whose type mentions a type variable to `emitNumeralCoercionCall` at each evaluation, since its value differs by instance and the component class holds one field per place; one value per instance needs a static field in each instantiation of the generic class, filled when it loads. Workaround: bind the value once, at a top-level variable of an instance type.
- The notes gained: 971. A place whose type names no type variable, as `site(): Gen[\RR64\] = 3`, is one object (`compiler_tests/NumeralCoercionGenericTypeCompiled.test`). `numeralCoercionSiteDesc` (`compiler/codegen/CodeGen.java`) leaves a place whose type mentions a type variable to `emitNumeralCoercionCall` at each evaluation, since its value differs by instance and the component class holds one field per place; one value per instance needs a static field in each instantiation of the generic class, filled when it loads. Workaround: bind the value once, at a top-level variable of an instance type.; they lost: 318. The once-per-site call takes a coercion without static arguments into a trait type without static arguments (`numeralCoercionSiteDesc`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, at 5c68eb91ac); `coerce_Gen[\String\]` has one, so the call stays at the site. A site whose type names a type parameter of its generic declaration, as `m(): Gen[\T\] = 3` in `object Box[...

## Row 959, rewritten (claim, notes)

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value: neither library declares `IntLiteral`, and `typecase v of IntLiteral => ... ZZ32 => ... end` takes the first arm for a `ZZ32`
- Claim at the base: on both paths a `typecase` arm that names a type no declaration defines loads, compiles and matches every value: with no `IntLiteral` declared, `typecase v of IntLiteral => ... ZZ32 => ... end` takes the first arm for a `ZZ32`
- Reproducer: `ProjectFortress/tests/XXXTypecaseUndefinedArmWalk.fss`
- Notes now: The parser makes the arm `Id =>` a `VarType` (`parser/DelimitedExpr.rats:241-248`), and no phase of either path reports the undefined name: on climb batch 29b's merged tree a program of that `typecase` compiles and runs, 'the IntLiteral arm', 'PASS', and walk prints the same. Met when `IntLiteral` left the one library: `tests/IntegerConversionsWalk.fss`'s `shown` printed '-2147483648 : IntLiteral' for the `ZZ32` -2^31, until the arms were removed. A type name elsewhere, as `theType[\IntLiteral\]()`, is refused: 'IntLiteral is undefined.'
- The notes gained: on climb batch 29b's merged tree a program of that `typecase` compiles and runs, 'the IntLiteral arm', 'PASS', and walk prints the same. Met when `IntLiteral` left the one library: `tests/IntegerConversionsWalk.fss`'s `shown` printed '-2147483648 : IntLiteral' for the `ZZ32` -2^31,; they lost: the compiled path on the base compiles and runs the test's program, 'the undefined arm', 'PASS'. Met when `IntLiteral` left the one library: `tests/IntegerConversionsWalk.fss`'s `shown` printed '-2147483648 : IntLiteral' for the `ZZ32` -2^31 ('FAIL: J24/0:-2147483648 : IntLiteral =/= J18/0:-2147483648 : ZZ32'), and `tests/IntegerPowerContractWalk.fss` '1 : IntLiteral' for a `ZZ32` 1,

## Row 960, rewritten (claim, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: a numeral with a radix point loses all but one of its leading zeros before its four numbers are read: `00.5`'s digit count `n` is 2, where the Working Draft counts 3; an integer numeral keeps them, `007` has 3
- Claim at the base: a numeral with a radix point loses all but one of its leading zeros before walk reads its four numbers: `00.5`'s numeral object has 2 digits, where the Working Draft counts 3; an integer numeral keeps them, `007` has 3
- Reproducer: `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss`
- Notes now: `ExprFactory.makeFloatLiteralExpr` trims leading zeroes from the text it keeps (`ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1640-1643`), and both paths count the digits of that text (`nodes_util/NumeralNumbers.java`, `of`), so the checker's `RadixPointNumeral[\n, m, r, v\]` and walk's binding of `n` both see 2; `makeIntLiteralExpr` trims none. Only a program's coercion that reads `n` sees it.
- The notes gained: both paths count the digits of that text (`nodes_util/NumeralNumbers.java`, `of`), so the checker's `RadixPointNumeral[\n, m, r, v\]` and walk's binding of `n` both see 2; `makeIntLiteralExpr` trims none. Only a program's coercion that reads `n`; they lost: walk counts the digits of that text (`interpreter/evaluator/values/Numerals.java`, `radixPoint`); `makeIntLiteralExpr` trims none. Only a program's coercion that reads `digits`

## Row 961, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: on the compiled path a negative integer numeral at a program's own number type reaches the type's `coerce(x: IntLiteral)` signed, where P-173 and …
- Claim at the base: on the compiled path a negative integer numeral at a program's own number type reaches the type's `coerce(x: IntLiteral)` signed, where P-173 and P-174 make it prefix `-` on the coercion of the natural numeral and refuse it at a type without `-`: `t: Tally = -3` calls the coercion with -3
- Reproducer: `ProjectFortress/compiler_tests/NegativeNumeralOwnType.test`
- Notes now: fixed `a26e74f5c`; full text: history, row 961
- The notes gained: fixed `a26e74f5c`; full text: history, row 961; they lost: The integer literal fold makes `-3` one negative `IntLiteralExpr` before the checker (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:373-377` at 7daf51fe8), and keeps no reference to the prefix operator that the checker would apply to the program's coercion of `3`. Until the switch-over the prelude's `IntLiteral` carries the sign, so the coercion reads -3 exactly; the difference shows on...

## Row 962, noted

- Section: 2. Types: generics, static parameters, inference and coercion. Status: CONTESTED. Class: implementation gap (codegen).
- Claim: on the compiled path a `nat` or `int` parameter of size 2^31 or more read as a value raises `java.lang.Error`, 'Not in range for ZZ32', at run time, which no `catch` sees: `sz64[\nat k\](b: Box[\k\]): ZZ64 = k` dies at `Box[\2147483648\](0)`, since a size read as a value is a `ZZ32` (P-173, P-40)
- Reproducer: none
- Notes now: siblings: 675, 325. The class loader stamps a size read as a value as `FZZ32.makeSize` of its digits (`runtimeSystem/MethodInstantiater.java`, `natMethod`), which throws for more than 31 bits (`compiler/runtimeValues/FZZ32.java:26-30` at 8ec860f0b7). A numeral coercion's four numbers are not sizes at run time: its method takes them as `ZZ` values. Open: whether such a read is refused where the class loads, raises `IntegerOverflow`, or is not a `ZZ32`. Workaround: read the size through its type, by dispatch on `Box[\n\]`. Walk reads such a size as a ZZ64 (F-140).
- The notes gained: class loader stamps a size read as a value as `FZZ32.makeSize` of its digits (`runtimeSystem/MethodInstantiater.java`, `natMethod`), which throws for more than 31 bits (`compiler/runtimeValues/FZZ32.java:26-30` at 8ec860f0b7). A numeral coercion's four numbers are not sizes at run time: its method takes them as `ZZ` values. Open: whether such a read is refused where the class loads, raises `IntegerOverflow`, or is not a `ZZ32`. Workaround: read the size through its type, by dispatch on `Box[\n\]`. Walk reads such a size as a ZZ64 (F-140).; they lost: code generator converts the class loader's `IntLiteral` constant by `FIntLiteral.asZZ32` (`compiler/codegen/CodeGen.java:6364` at fa13e6383c), which throws `outOfRange` (`compiler/runtimeValues/FIntLiteral.java:63-71`). Open: whether such a read is refused where the class loads, raises `IntegerOverflow`, or is not a `ZZ32`. Probe: `NatRtBigSize` before its respelling, compiled and run at 7bd7c7...

## Row 963, rewritten (claim, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on the compiled path a numeral as a `typecase`'s selector keeps its own type, `NaturalNumeral[\1,10,7\]`, where P-173 gives it its default: `typecase 7 of ZZ32 => ...` is refused, 'The typecase clause, ZZ32, is unreachable.', where walk takes the `ZZ32` clause
- Claim at the base: on the compiled path a numeral as a `typecase`'s selector keeps its own type `IntLiteral`, where P-173 gives it its default: `typecase 7 of ZZ32 => ...` is refused, 'The typecase clause, ZZ32, is unreachable.', where walk takes the `ZZ32` clause
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralTypecaseSelector.test`
- Notes now: siblings: 79. The selector is checked with no expected type and no default (`scala_src/typechecker/impls/Misc.scala`, the `typecase` case). The default there changes two team tests: the pinned span of `XXX5r.test`'s unreachable clauses, and `XXXPatternMatchingc.test`, whose `typecase (3, 4) of (x, y: ZZ32)` becomes reachable and then stops the code generator (964). Workaround: bind the selector to a variable first.
- The notes gained: (`scala_src/typechecker/impls/Misc.scala`, the `typecase` case).; they lost: (`scala_src/typechecker/impls/Misc.scala:660` at b212f67a0e).

## Row 966, rewritten (claim, notes)

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED. Class: implementation gap (library).
- Claim: under walk, the library's `=/=` between a number and a numeral is `true` where the numbers are equal: `u =/= 0` for a zero `u` of `NN32`, `NN64` or `RR32`, since `=/=` over `Any` takes the numeral at its default and `=` answers `false` there, as `u = 0` does (973)
- Claim at the base: under walk, the library's `=/=` between a number and a numeral is `true` where their `=` is: `u =/= 0` for a zero `u` of `NN32`, `NN64` or `RR32`, and `q =/= 0.5` for `q: QQ = 1/2`, since `=/=` over `Any` takes the numeral at its default before it calls `=`
- Reproducer: `ProjectFortress/tests/XXXNotEqualNumeral.fss`
- Notes now: siblings: 807, 973. `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98` at b430f9f428) gets the numeral at its default (P-173), and since the field numerals' `=` pairs are gone (P-174), `u = 0` is `false` under walk too, so `u =/= 0` is `true`. Compiled, the prelude's `opr =/=(self, other: NN32)` converts the numeral: `u =/= 0` is `false`. Workaround: bind the numeral at the type first, `z: NN32 = 0`, then `u =/= z`.
- The notes gained: 807, 973. `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98` at b430f9f428) gets the numeral at its default (P-173), and since the field numerals' `=` pairs are gone (P-174), `u = 0` is `false` under walk too, so `u =/= 0` is `true`. Compiled, the prelude's `opr =/=(self, other: NN32)` converts the numeral: `u =/= 0` is `false`. Workaround: bind the numeral at the type first, `z: NN32 = 0`, then `u =/= z`.; they lost: 807. `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98` at b430f9f428) has no pair beside the `=` pairs (P-165), so `=` gets the numeral at its default (P-173), with which these types declare no `=`, and `SEQV` answers `false`. At b430f9f428 walk answers `u = 0` `false` too; rung N's pairs make it `true`. Compiled, the prelude's `opr =/=(self, other: NN32)` converts the numer...

## Row 968, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk a negative integer constant at a program's own number type reaches its `coerce(x: NaturalNumeral)` as a natural numeral of negative value, …
- Claim at the base: under walk a negative integer constant at a program's own number type reaches its `coerce(x: NaturalNumeral)` as a natural numeral of negative value, where the specification makes it prefix `-` on the coercion's result for the natural numeral: `t: Tally = -3` passes `NaturalNumeral(1, 10, -3)`
- Reproducer: `ProjectFortress/tests/NumeralStaticDesignWalk.fss`
- Notes now: fixed `a26e74f5c`; full text: history, row 968
- The notes gained: fixed `a26e74f5c`; full text: history, row 968; they lost: siblings: 961, 956. Since climb batch 29 the numeral fold runs in walk's phase order too and makes `-3`, or `5 - 8`, one `IntLiteralExpr` of value -3 (`compiler/desugarer/IntegerLiteralFoldingVisitor.java`, class comment); walk's numeral site keeps that value as its digit value and counts the digits of the text without the sign (`interpreter/evaluator/values/Numerals.java:160-179`, `integer`),...

## Row 969, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (library).
- Claim: the one library and walk give a numeral a run-time value object whose fields are its four numbers, with getters, `asFloat`, `asString` and `=` pairs, …
- Claim at the base: the one library and walk give a numeral a run-time value object whose fields are its four numbers, with getters, `asFloat`, `asString` and `=` pairs, where P-174 makes them static parameters of a type that exists only at compile time: a program's `coerce(x: RadixPointNumeral)` reads `x.digitValue`
- Reproducer: `ProjectFortress/tests/NumeralOwnTypeWalk.fss`
- Notes now: fixed `a26e74f5c`; full text: history, row 969
- The notes gained: fixed `a26e74f5c`; full text: history, row 969; they lost: siblings: 970, 961, 968, 957, 513. `Library/FortressLibrary.fsi:454-494` at 88d5d260e4: `trait Numeral` with four abstract getters, `value object NaturalNumeral(digits, radix, digitValue)` and `RadixPointNumeral(digits, fractionDigits, radix, digitValue)`, each with `asString`, `asFloat` and `=` at the number types; no coercion is generic over the four numbers. Walk builds the object once per s...

## Row 970, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: on the compiled path a numeral at a program's own type reaches its `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)` against the prelude, without …
- Claim at the base: on the compiled path a numeral at a program's own type reaches its `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)` against the prelude, without the four numbers, where P-174 has a coercion generic over them as static parameters, folded once per place; the checker holds no `nat` above 32 bits
- Reproducer: `ProjectFortress/compiler_tests/NumeralCoercionOnceCompiled.test`
- Notes now: fixed `a26e74f5c`; full text: history, row 970
- The notes gained: fixed `a26e74f5c`; full text: history, row 970; they lost: siblings: 969, 957, 961, 962, 675. The prelude declares `trait IntLiteral` and `trait FloatLiteral` (`LibraryBuiltin/CompilerBuiltin.fss:883`, `:996` at 88d5d260e4), and the checker types a numeral by them under the prelude (`compiler/Types.java`, F-79). The checker refuses a `nat` above 4294967295 (F-140), so a 10-digit `v` is no static argument; the class loader replaces a size read as a valu...

## Row 971, rewritten (claim, reproducer, notes)

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (runtime).
- Claim: on the compiled path a numeral's coercion that spawns a task, as `Cell(part(1) \|\| part(2))` does, fails the load of the component's class: the static initializer fills each place before the task pool starts, `ClassCastException: Thread cannot be cast to FortressTaskRunner`
- Claim at the base: on the compiled path a numeral site's coercion that spawns a task, as `Cell(part(1) \|\| part(2))` does, fails the load of the component's class: its static initializer runs on the main thread before the task pool, `ClassCastException: Thread cannot be cast to FortressTaskRunner`
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralCoercionSpawnCompiled.test`
- Notes now: siblings: 313, 957. `MainWrapper.main` loads the component class with `Class.forName(whatToRun, true, icl)` before `main` starts the task pool (`runtimeSystem/MainWrapper.java:61-63` at b5b0f82c13); `<clinit>` calls each place's `numeral$init$k`, which calls the coercion's method of the four numbers (`compiler/codegen/CodeGen.java`, `emitNumeralSiteInitializers`), whose body keeps the parallelism analyzer's spawns; a spawned operand reaches `BaseTask.getCurrentTask` (`runtimeSystem/BaseTask.java:241`). `NumeralStaticDesignCompiled`'s `Written` coercion failed so before its operands were bound. Workaround: bind the operands to locals first.
- The notes gained: (`runtimeSystem/MainWrapper.java:61-63` at b5b0f82c13); `<clinit>` calls each place's `numeral$init$k`, which calls the coercion's method of the four numbers (`compiler/codegen/CodeGen.java`, `emitNumeralSiteInitializers`), whose body keeps the parallelism analyzer's spawns; a spawned operand reaches `BaseTask.getCurrentTask` (`runtimeSystem/BaseTask.java:241`). `NumeralStaticDesignCompiled`'s `Written` coercion failed so before its operands were bound.; they lost: (`ProjectFortress/src/com/sun/fortress/runtimeSystem/MainWrapper.java:61-63` at dd00743d9e); `emitNumeralCoercionSites` emits each site's call in `<clinit>` (`compiler/codegen/CodeGen.java`); a spawned operand reaches `BaseTask.getCurrentTask` (`runtimeSystem/BaseTask.java:241`). Probe at dd00743d9e, `object Cell(s: String)` with `coerce(x: IntLiteral) = Cell(part(1) \|\| part(2))` and `made():...

## Row 972, closed as FIXED

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (codegen).
- Claim: on the compiled path a library component with a generic overloaded top-level function stores its inference cache tables into a class named without its …
- Claim at the base: on the compiled path a library component with a generic overloaded top-level function stores its inference cache tables into a class named without its package: `fortress.CompilerBuiltin.<clinit>` fails, `NoClassDefFoundError: CompilerBuiltin`, and every compiled program dies
- Reproducer: `ProjectFortress/compiler_tests/NumeralStaticDesignCompiled.test`
- Notes now: fixed `a26e74f5c`; full text: history, row 972
- The notes gained: fixed `a26e74f5c`; full text: history, row 972; they lost: The component class's static initializer names the owner of each table's `putstatic` as `Naming.dotToSep(x.getName().getText())` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1979` at dd00743d9e), while `cw` writes the field into `packageAndClassName`, which for a library component is `fortress/<Name>`; a program's component has no package, so the two agree there. No libr...

## Row 973, opened

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED. Class: implementation gap (walk).
- Claim: under walk a number and a numeral of one value are not `=` where the numeral reaches its type only by conversion: `u = 0` and `0 = u` are `false` for a zero `u` of `NN32` or `NN64`, `f = 0` for an `RR32` zero and `h = 0.5` for `h: QQ = 1/2`, where the design fixes the numeral at the other's type
- Reproducer: `ProjectFortress/tests/XXXNumeralEqualsNumberWalk.fss`
- Notes: siblings: 966, 807. With no `=` pairs (P-174), `u = 0` meets the library's `=` over `Any`, which the numeral's default `ZZ32` fits as it is, and `NN32`'s `=`, reached by conversion (`h = 0.5`: `RR64`, `QQ`'s); walk keeps a declaration that fits as it is (`OverloadedFunction.bestMatchForNumeralsInternal`), and `SEQV` of an `NN32` and a `ZZ32` is `false`. Open: the static numerals probe's question 1 (draft-numerals.md, section 13), the curator's: (a) conversion first where more specific, (b) `false`, (c) the pairs kept. Compiled: `true`, the prelude has no `=` over `Any`. `h = 0.5` measured on 29b's merged tree. Workaround: `z: NN32 = 0`, then `u = z`.

## Row 974, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a numeral type written as a type that an object or a trait extends, or as a static argument, loads and runs: `object O extends NaturalNumeral[\1, 10, 3\]` and `Wrap[\NaturalNumeral[\1, 10, 3\]\](3)` run, where the text makes each a static error (P-174)
- Reproducer: `ProjectFortress/tests/XXXNumeralTypeWrittenWalk.fss`
- Notes: siblings: 893, 973. Walk has no static types (P-12): it refuses a numeral type only where a numeral meets it when a place runs, as a variable, a field or a declared return type of a numeral type ('Type mismatch binding 3', `tests/NumeralTypeNoValueWalk.fss`). The compiled checker refuses both forms, 'NaturalNumeral cannot be written in a program except as a parameter's type.' (`compiler_tests/LiteralTypeUnwritable.fss`, `NumeralTypeExtendedRefused.fss`). Measured on climb batch 29b's merged tree.

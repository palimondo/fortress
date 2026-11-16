<!-- The record-landing workflow's evidence of the gap ledger: each row that db352c177..c0c35b4f9 opened, closed, rewrote or noted, with its claim, written by evidence.py. -->

# The rows that the range changed

- noted: 1, 152, 304, 323
- closed as FIXED: 5, 84, 133, 142, 156, 158, 474, 731, 758, 966, 973, 975, 976, 988, 989
- rewritten: 42, 301, 390
- opened: 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031

Print a row whole with `facts-extract.sh 'ledger:N'`, from the worktree.

## Row 1, noted

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: `x[i][j]` and `x[i]^2` are grammatical, but walk invokes a subscript followed by a subscript or a superscript without its first index: one index fails with `args = ()`, more silently give the wrong element
- Reproducer: none
- Notes now: siblings: 84. Such a primary parses as a `MathPrimary` (not `SubscriptExpr`); its subscript goes to `evalAndInvokeMethod` (`interpreter/evaluator/Evaluator.java:1181`), whose `evalInvocationArgs` (`:1064`, `:1380-1381`) takes `exprs.subList(1,…)`, right for a juxtaposition list, wrong for a subscript list. `m[3,7]^2` prints `11449`, `(m[7])^2`, not `1075369` (probe `explorations/gap-ledger-probes/g02.fss`, in the parent of `e879b6a44`). The spec forbids only `x^2[i]`. Workarounds: `(x[i])[j]`, `(x[i])^2`, or bind first, as `explorations/apl/base/AplCore.fss:1859` does (`rk = rs[k]`). probe and After a dotted call the same form, `B.f()[5]^2`, parses and fails so too. full text: history, row 1
- The notes gained: After a dotted call the same form, `B.f()[5]^2`, parses and fails so too.

## Row 5, closed as FIXED

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (parser).
- Claim: U+2211 `∑` lexes as a prefix operator, never as an accumulator; only ASCII `SUM` is a big operator
- Reproducer: `ProjectFortress/tests/SumSignAccumulator.fss`
- Notes now: fixed `5c8055dee`; full text: history, row 5
- The notes gained: fixed `5c8055dee`; full text: history, row 5; they lost: `Operator prefix SUM is not defined.` The grammar's `Accumulator` takes the keyword `SUM`, which matches the ASCII letters only, and has no `∑` alternative (`ProjectFortress/src/com/sun/fortress/parser/Symbol.rats:252`, `:260-261`), so `∑`, an operator named `SUM` (`ProjectFortress/src/com/sun/fortress/parser_util/precedence_resolver/Operators.java:2082`), is read as a prefix operator. Fortify...

## Row 42, rewritten (claim, notes)

- Section: 8. Generators, reductions and ranges. Status: NEGATIVE-VERIFIED. Class: implementation gap (parser).
- Claim: `except { opr SUM }` and `except { opr ∑ }` are each a syntax error, in an import's list as in its `except` list; `except { opr BIG + }` leaves out `SUM` (row 41)
- Claim at the base: `except { opr SUM }` is a syntax error; `except { opr ∑ }` parses, and what it leaves out is not measured; `except { opr BIG + }` leaves out `SUM` (row 41)
- Reproducer: none
- Notes now: siblings: 814. The import's `SimpleName` takes `opr (BIG)? (Encloser / Op)` with no `SUM` alternative (`ProjectFortress/src/com/sun/fortress/parser/Identifier.rats:95-104` at 285255aa77), though `SingleOp` gives one for declarations (`parser/Parameter.rats:129`). U+2211 and U+220F are read as `SUM` and `PROD` and are no `Op` (`parser/Symbol.rats:175-181`): `except { opr ∑ }` is a `Syntax Error` at the sign. Workaround: `except { opr BIG + }` (row 41). Probes `explorations/sum-probes/p20_except_spelling_sum.fss` and `explorations/fable-review-probes/RvwExceptSigma.fss`, in the parent of `e879b6a44`.
- The notes gained: 285255aa77), though `SingleOp` gives one for declarations (`parser/Parameter.rats:129`). U+2211 and U+220F are read as `SUM` and `PROD` and are no `Op` (`parser/Symbol.rats:175-181`): `except { opr ∑ }` is a `Syntax Error` at the sign.; they lost: c124c6b65), though `SingleOp` gives one for declarations, `SUM` as `BIG +` (`ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:129`).

## Row 84, closed as FIXED

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (parser).
- Claim: a superscript may not follow a dotted access: `x.v^T`, `B.data^T`, `B.n^2`, `B.data^*`, and the same after a getter or a method call, give a bare …
- Claim at the base: a superscript may not follow a dotted access: `x.v^T`, `B.data^T`, `B.n^2`, `B.data^*`, and the same after a getter or a method call, give a bare `Syntax Error` at the `^`; a postfix `!` there works (`B.data!`)
- Reproducer: `ProjectFortress/tests/SuperscriptAfterDottedAccess.fss`
- Notes now: fixed `a10f1cd59`; full text: history, row 84
- The notes gained: fixed `a10f1cd59`;; they lost: siblings: 1. `PrimaryItem` tries `LeftAssociatedPrimary` before `MathPrimary` (`ProjectFortress/src/com/sun/fortress/parser/Expression.rats:384-386`); `LeftAssociatedPrimary` (`:388-434`) admits `Subscripting*`, `ParenthesisDelimited*` and `Selector*` but no `MathItem`, and exponentiation is a `MathItem` (`:651-656`) that attaches only to a `MathPrimary` (`:463-465`), which a dotted form never...

## Row 133, closed as FIXED

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (parser).
- Claim: a postfix operator declaration whose symbol is an exponent operator, `opr (self)^T` or `opr (A: Mat)^T`, is a `Syntax Error` in an API, while the same …
- Claim at the base: a postfix operator declaration whose symbol is an exponent operator, `opr (self)^T` or `opr (A: Mat)^T`, is a `Syntax Error` in an API, while the same declaration parses in a component
- Reproducer: `ProjectFortress/tests/ApiPostfixExponentOp.fss`
- Notes now: fixed `5c8055dee`; full text: history, row 133
- The notes gained: fixed `5c8055dee`;; they lost: The component rule: `(Op / ExponentOp / caret …)` (`ProjectFortress/src/com/sun/fortress/parser/Parameter.rats:141-142`); the API rule `(Op / ExponentOp caret …)`, no `/` before `caret` (`parser/Parameter.rats:171-172`), so its postfix must be an `ExponentOp` then a caret, which `^T` (`exponentOp`, `parser/Symbol.rats:104-106`) never is; the error is at column 1 of the next line. A plain postfi...

## Row 142, closed as FIXED

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: a typed array literal as a **top-level** declaration is bound as a tuple: `shp: Vector[\ZZ32,9\] = [27 16 27 …]` fails with `Type mismatch binding …
- Claim at the base: a typed array literal as a **top-level** declaration is bound as a tuple: `shp: Vector[\ZZ32,9\] = [27 16 27 …]` fails with `Type mismatch binding (27,16,…)`, while the same declaration inside a function body works
- Reproducer: `ProjectFortress/tests/TopLevelArrayLiteral.fss`
- Notes now: fixed `d58333512`; full text: history, row 142
- The notes gained: fixed `d58333512`;; they lost: siblings: 49, 104. At top level the literal is never built into an array: `BuildEnvironments.forVarDecl4` checks the evaluated paste against the declared type (`BuildEnvironments.java:780-794` at c124c6b65); only `LHSEvaluator.forLValue`, in a body, builds it. `shp: Vector[\ZZ32,3\] = [27 16 27]` gives `Type mismatch binding (27,16,27): (ZZ32,ZZ32,ZZ32) ... to shp (type Vector[\ZZ32,3\])`, `p08...

## Row 152, noted

- Section: 3. Traits, objects and components. Status: POSITIVE-VERIFIED. Class: —.
- Claim: top-level values are initialised at component load in declaration order, including a tuple binding whose right-hand side reads a file (`(corpusTokens, corpusLengths) = loadCorpus(corpusPath)`) and a matrix built by a function declared above it (`causalMask`); functions declared later use them
- Reproducer: `explorations/run-c/src/MicroGptFlat.fss`
- Notes now: Run from `explorations/run-c/src/`: `microgpt flat \| params 4192 \| corpus 2000 x 17 \| batch 1, 5 steps`, then `step 1 loss 3.3659669475848513` … `step 5 loss 3.2208830897506235`, the committed check's goldens; the corpus loads once, on import as on run. A top-level tuple binding of literals, untyped (`(nEmbd, blockSize, nHead, headDim, vocabSize, bosId) = (16, 16, 4, 4, 27, 26)`) or typed (`(a: ZZ32, b: RR64) = (3, 2.5)`), binds every name: `(1) 16 16 4 4 27 26`, `(3) 3 2.5` (probe `explorations/run-c/probes/q04d_toplevel.fss`, in the parent of `4ebf80aec`). under walk the right side of such a binding runs once for each name and once more (row 1026); full text: history, row 152
- The notes gained: under walk the right side of such a binding runs once for each name and once more (row 1026);

## Row 156, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, a `nat`-generic function is not a value: passed as an argument it fails at the call with `Unification error: … of type null` (a plain …
- Claim at the base: under walk, a `nat`-generic function is not a value: passed as an argument it fails at the call with `Unification error: … of type null` (a plain callee), `Argument halfG … has no type information` (a `nat`-generic callee with an arrow-typed parameter) or a Java `NullPointerException`
- Reproducer: `ProjectFortress/tests/GenericFunctionAsValueWalk.fss`
- Notes now: fixed `754a0f29d`; full text: history, row 156
- The notes gained: fixed `754a0f29d`;; they lost: siblings: 165, 758. A generic function value has no type: `type()` returns a null `ftype` (`interpreter/evaluator/values/Fcn.java:67-71`), so it can neither be checked against a parameter type (`EvaluatorBase.java:941`) nor key the callee's instantiation cache; the NPE (a callee generic in two `nat`s) is in `FValue$AsTypesList.compare` (`interpreter/evaluator/values/FValue.java:141`) from `appl...

## Row 158, closed as FIXED

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (walk).
- Claim: a parenthesised call followed by `^T`, `(onehot(ks, 5))^T dx` or `((onehot(ks, 5))^T) dx`, is refused like row 144's call-then-postfix, though the …
- Claim at the base: a parenthesised call followed by `^T`, `(onehot(ks, 5))^T dx` or `((onehot(ks, 5))^T) dx`, is refused like row 144's call-then-postfix, though the grammar makes a parenthesised expression a `Primary` that an `ExponentOp` may follow
- Reproducer: `ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss`
- Notes now: fixed `a10f1cd59`; full text: history, row 158
- The notes gained: fixed `a10f1cd59`;; they lost: siblings: 144. `Syntax Error: a function argument should not be immediately followed by a non-expression element.`, its span on the call: walk's postfix branch tests for a tight juxtaposition (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:970-971`), not for parentheses, and refuses it (`Evaluator.java:1322-1326`). Workarounds: `transpose(onehot(ks, 5)) dx`, `(onehot...

## Row 301, rewritten (claim, notes)

- Section: 1. Syntax: lexing, expressions and declarations. Status: POSITIVE-VERIFIED. Class: —.
- Claim: a dotted method call may follow a call where a postfix operator may not: `onehot(ks, 5).t() dx` runs, where `onehot(ks, 5)^T dx` is row 144's static error; in parentheses the call takes the operator, `(onehot(ks, 5))^T dx`
- Claim at the base: a dotted method call may follow a call where a postfix operator may not: `onehot(ks, 5).t() dx` runs, where `onehot(ks, 5)^T dx` is row 144's static error and `(onehot(ks, 5))^T dx` row 158's
- Reproducer: none
- Notes now: The rule names non-expression elements, and a dotted call is a `Primary`. A workaround of row 144 beside binding first, a `transpose` function and parentheses around the call (`ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss`): none is needed when the library has the method. The output's two lines are identical to the `transpose` spelling. Probe `explorations/run-c4/probes/vocabulary/v17_calldot.fss`, in the parent of `11bf69c39`. full text: history, row 301
- The notes gained: A workaround of row 144 beside binding first, a `transpose` function and parentheses around the call (`ProjectFortress/tests/SuperscriptAfterParenthesisedCall.fss`): none; they lost: The workaround rows 144 and 158 lack: neither binding first nor a `transpose` function

## Row 304, noted

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: the code generator compiles a local function as a closure, but refuses three forms that the specification allows: a local function with static parameters of its own, two local functions of one name in a block, and the `atomic` modifier
- Reproducer: `ProjectFortress/compiler_tests/XXXLocalFunctionGenericCompiled.test`
- Notes now: siblings: 624, 701, 865. `CodeGen.forLetFn` throws 'Can't compile a local function with static parameters of its own yet', 'Can't compile overloaded local functions yet' and 'Can't compile a local function with this modifier yet' (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:3588-3592` at d96242f0a), after the checker passes each program. Other reproducers: `XXXLocalFunctionOverloadedCompiled.test`, `XXXLocalFunctionAtomicCompiled.test`. Also refused there: varargs (row 624), a helper binding (row 865), a contract (row 701). Walk: only without static parameters (row 1020). Workaround: lift the function to component level, or give each overload its own name.
- The notes gained: there: varargs (row 624), a helper binding (row 865), a contract (row 701). Walk: only without static parameters (row 1020).; they lost: in a local function: a varargs parameter (row 624), a helper binding (row 865), a contract (row 701). Walk runs local functions.

## Row 323, noted

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: **`walk` rejects a singleton object's field initializer that reads a top-level *mutable* variable declared later in the component**, which the compiled path runs: `ProgramError: Attempt to find type of uninitialized variable: thunk (IntLiteralExpr …)` at the field's own line
- Reproducer: none
- Notes now: Controls: with the later variable immutable (`d: ZZ32 = 5` for `d: ZZ32 := 5`) walk accepts the program, and `ProjectFortress/tests/InitOrderWithMutable.fss` shows walk accepts a *top-level* initializer reading a later mutable variable; the failure is specific to a singleton object's field. Compiled: `a = 11 b = 10 c = 12 Holder.f = 5 d = 5`. Probes `explorations/compile-ladder/repair-r1-atomic-static/probes/skeptic/SK5InitFwd.fss` and `SK26InitFwdImmutable.fss` (the control), in the parent of `ab067d9b6`. A typed or computing top-level reader of a later mutable variable fails too (row 1023). full text: history, row 323
- The notes gained: A typed or computing top-level reader of a later mutable variable fails too (row 1023).

## Row 390, rewritten (claim, notes)

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on the compiled path, an overloaded call that one declaration takes without coercion and another only by a value's coercion dies with `NoSuchMethodError`: with `p(x: Wide)`, `p(x: Any)` and a `coerce` in `Wide`, `p(NarrowOf(1))` names a dispatcher, `=p{...}(Any)`, that is never emitted
- Claim at the base: on the compiled path, an overloaded call that one declaration takes without coercion and another only with it dies with `NoSuchMethodError`: with `p(x: Wide)`, `p(x: Any)` and a `coerce` in `Wide`, `p(NarrowOf(1))` names a dispatcher, `=p{...}(Any)`, that is never emitted
- Reproducer: `ProjectFortress/compiler_tests/XXXCoercionAnyOverloadRungC.test`
- Notes now: The test prints REACHED, then 'NoSuchMethodError: ... \=p{...}(fortress.AnyType$Any)'. By reading: a declaration without static parameters is checked once with its coercions, so the attempt by subtyping keeps `p(x: Wide)` among the candidates behind `p(x: Any)` (`scala_src/typechecker/impls/Functionals.scala:744-747`, `:941` at 5466455249), and the call names a dispatcher over both at `Any`. Without the `coerce` it prints `p(Any)`, as walk does. A numeral does not reach it: `k(5)` for `k(x: Any)` beside `k(x: NN32)` prints `nn32` (`compiler_tests/NumeralMostSpecificCompiled`). full text: history, row 390
- The notes gained: \=p{...}(fortress.AnyType$Any)'. By reading: a declaration without static parameters is checked once with its coercions, so the attempt by subtyping keeps `p(x: Wide)` among the candidates behind `p(x: Any)` (`scala_src/typechecker/impls/Functionals.scala:744-747`, `:941` at 5466455249), and the call names a dispatcher over both at `Any`. Without the `coerce` it prints `p(Any)`, as walk does. A numeral does not reach it: `k(5)` for `k(x: Any)` beside `k(x: NN32)` prints `nn32` (`compiler_tests/NumeralMostSpecificCompiled`).; they lost: \=p{...}(fortress.AnyType$Any)': the call names a dispatcher over both declarations at `Any`. The specification drops the candidates applicable only with coercion; where the pair is kept is not located: the checker's `typedApplication` (`scala_src/typechecker/impls/Functionals.scala:650`) tries coercion-free fits first. Without the `coerce` it prints `p(Any)`, as walk does. A numeral reaches it...

## Row 474, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: **the compiled checker types each variable of a top-level tuple binding so that it is accepted anywhere, and an operator applied to one ends its …
- Claim at the base: **the compiled checker types each variable of a top-level tuple binding so that it is accepted anywhere, and an operator applied to one ends its block's check with no error**
- Reproducer: `ProjectFortress/compiler_tests/XXXTopLevelTupleBindingType.test`
- Notes now: fixed `060f3ec09`; full text: history, row 474
- The notes gained: fixed `060f3ec09`;; they lost: With `(…, headDim, …) = (16, 16, 4, 4, 27, 26)` and `(…, beta1, …) = (10.0^(-5), 0.01, 0.85, …)` at top level, `z: String = headDim` and `zz0: ZZ32 = beta1` pass; `w = 1.0 headDim` and `y = beta1 x` end their block's check, so a later error goes unreported; on other variables a failing operator reports its error, then ends the block. A single top-level binding or a local tuple binding is typed...

## Row 731, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: **the compiled checker fixes a generic big operator's static parameter in an unwritten clause form by its bound or the expected type only, never from …
- Claim at the base: **the compiled checker fixes a generic big operator's static parameter in an unwritten clause form by its bound or the expected type only, never from the clauses**: one whose bound names the parameter, as `SUM`'s, `PROD`'s and `BIG MIN`'s do, has no instance, and the reduction is refused
- Reproducer: `ProjectFortress/compiler_tests/InferBigOperatorSelfBound.test`
- Notes now: fixed `d159b7197`; full text: history, row 731
- The notes gained: fixed `d159b7197`; full text: history, row 731; they lost: siblings: 716, 817. `fortress compile` of `compiler_tests/InferBigOperatorExpectedType.fss` with its bound `Number` made `StandardTotalOrder[\T\]` reads '... is not applicable to an argument of type ().', rc 255 (`compile-ladder/rung-argument-context/REPORT.md:115`). A plain-bounded one takes the expected type only where its type at the bound does not fit (that test; `InferBigOperatorUnwritten`...

## Row 758, closed as FIXED

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker crashes on a generic function passed as a value: `useOne(count)`, for `count[\F extends Object\](b: Box[\F\]): ZZ32` and …
- Claim at the base: the compiled checker crashes on a generic function passed as a value: `useOne(count)`, for `count[\F extends Object\](b: Box[\F\]): ZZ32` and `useOne(g: Box[\ZZ32\] -> ZZ32): ZZ32`, stops with 'F is not in the kind env [][][]'
- Reproducer: `ProjectFortress/compiler_tests/GenericFunctionAsValueCompiled.test`
- Notes now: fixed `d159b7197`; full text: history, row 758
- The notes gained: fixed `d159b7197`; full text: history, row 758; they lost: siblings: 156. Under `bin/fortress typecheck`, `TypeAnalyzer.staticParam` calls `bug` when the callee's own parameter `F` is missing from the kind environment (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:1077`). Walk refuses the call as row 156 gives for a `nat`-generic function: 'Unification error: Closure/Constructor for useOne param 1 (g:Box[\ZZ32\]->ZZ32) got ar...

## Row 966, closed as FIXED

- Section: 4. Operators and overloading under walk. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (library).
- Claim: under walk, the library's `=/=` between a number and a numeral is `true` where the numbers are equal: `u =/= 0` for a zero `u` of `NN32`, `NN64` or …
- Claim at the base: under walk, the library's `=/=` between a number and a numeral is `true` where the numbers are equal: `u =/= 0` for a zero `u` of `NN32`, `NN64` or `RR32`, since `=/=` over `Any` takes the numeral at its default and `=` answers `false` there, as `u = 0` does (973)
- Reproducer: `ProjectFortress/tests/NotEqualNumeral.fss`
- Notes now: fixed `b190b8eb2`; full text: history, row 966
- The notes gained: fixed `b190b8eb2`; full text: history, row 966; they lost: siblings: 807, 973. `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98` at b430f9f428) gets the numeral at its default (P-173), and since the field numerals' `=` pairs are gone (P-174), `u = 0` is `false` under walk too, so `u =/= 0` is `true`. Compiled, the prelude's `opr =/=(self, other: NN32)` converts the numeral: `u =/= 0` is `false`. Workaround: bind the numeral at the t...

## Row 973, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk a number and a numeral of one value are not `=` where the numeral reaches its type only by conversion: `u = 0` and `0 = u` are `false` for …
- Claim at the base: under walk a number and a numeral of one value are not `=` where the numeral reaches its type only by conversion: `u = 0` and `0 = u` are `false` for a zero `u` of `NN32` or `NN64`, `f = 0` for an `RR32` zero and `h = 0.5` for `h: QQ = 1/2`, where the design fixes the numeral at the other's type
- Reproducer: `ProjectFortress/tests/NumeralEqualsNumberWalk.fss`
- Notes now: fixed `b190b8eb2`; settled by P-46: a numeral at a call goes to the most specific declaration that takes it; full text: history, row 973
- The notes gained: fixed `b190b8eb2`; settled by P-46: a numeral at a call goes to the most specific declaration that takes it; full text: history, row 973; they lost: siblings: 966, 807. With no `=` pairs (P-174), `u = 0` meets the library's `=` over `Any`, which the numeral's default `ZZ32` fits as it is, and `NN32`'s `=`, reached by conversion (`h = 0.5`: `RR64`, `QQ`'s); walk keeps a declaration that fits as it is (`OverloadedFunction.bestMatchForNumeralsInternal`), and `SEQV` of an `NN32` and a `ZZ32` is `false`. Open: the static numerals probe's questio...

## Row 975, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, a `case` clause that is a numeral does not match a number of equal value whose type the numeral reaches only by conversion: `case u of 0 …
- Claim at the base: under walk, a `case` clause that is a numeral does not match a number of equal value whose type the numeral reaches only by conversion: `case u of 0 => "zero"; else => "other" end` answers `"other"` for a zero `u: NN32`, where a clause compares by `=` and the design has `u = 0` `true`
- Reproducer: `ProjectFortress/tests/NumeralMostSpecificWalk.fss`
- Notes now: fixed `b190b8eb2`; settled by P-46; full text: history, row 975
- The notes gained: fixed `b190b8eb2`; settled by P-46; full text: history, row 975; they lost: siblings: 973, 966. Row 973's cause: the clause compares by `=`, which meets the library's `=` over `Any` with the numeral at its default `ZZ32` (`OverloadedFunction.bestMatchForNumeralsInternal`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2311-2340` at 6694ddb4cf), and `SEQV` of an `NN32` and a `ZZ32` is `false`. Open with 973: the way to `true`...

## Row 976, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: CONTESTED at the base, FIXED. Class: implementation gap (walk).
- Claim: under walk, a program's own number type is not `=` to a numeral of its value: `y = 7` and `7 = y` are `false` for `y: Byte = 7`, where `Byte` is a …
- Claim at the base: under walk, a program's own number type is not `=` to a numeral of its value: `y = 7` and `7 = y` are `false` for `y: Byte = 7`, where `Byte` is a value object with a numeral coercion and its own `=`, and the design fixes the numeral at the other operand's type
- Reproducer: `ProjectFortress/tests/NumeralMostSpecificWalk.fss`
- Notes now: fixed `b190b8eb2`; settled by P-46; full text: history, row 976
- The notes gained: fixed `b190b8eb2`; settled by P-46; full text: history, row 976; they lost: siblings: 973, 807. Row 973's defect, which names only the library's types. Open with 973: the way to `true` is the curator's. Compiled on the prelude both are `true`. Against the one library the checker chooses `=` over `(Any, Any)` for `y = 7` and makes the numeral a `ZZ32`, without an error, so by reading the compiled answer is `false` after the switch-over. Measured by a probe, not kept: wa...

## Row 988, closed as FIXED

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: on the compiled path a top-level tuple binding whose names are used, `(nEmbd, blockSize) = (16, 4)` with `println(nEmbd)`, stops the compile, '** bug! …
- Claim at the base: on the compiled path a top-level tuple binding whose names are used, `(nEmbd, blockSize) = (16, 4)` with `println(nEmbd)`, stops the compile, '** bug! Result of typechecking still contains intermediate nodes.'; walk prints 16 and 4
- Reproducer: `ProjectFortress/compiler_tests/TopLevelTupleBindingCompiled.test`
- Notes now: fixed `060f3ec09`; full text: history, row 988
- The notes gained: fixed `060f3ec09`; full text: history, row 988; they lost: siblings: 474, 175. Under the compiler's prelude, `fortress compile` at 832f7d0d91 and at 84f1c37190; the single-binding form `nEmbd = 16; blockSize = 4` compiles and runs (`SingleTop.fss` beside it). Behind the stop the code generator has no case: `forVarDeclPrePass` throws 'VarDecl … tupled lhs not handled' where the left side has more than one name (`ProjectFortress/src/com/sun/fortress/comp...

## Row 989, closed as FIXED

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED at the base, FIXED. Class: implementation gap (checker).
- Claim: the compiled checker refuses a float numeral beside a value that two declarations reach only by coercion, as `1.0 s` for `s: ZZ32` against the one …
- Claim at the base: the compiled checker refuses a float numeral beside a value that two declarations reach only by coercion, as `1.0 s` for `s: ZZ32` against the one library, an ambiguous coercion between `RR64`'s and `QQ`'s juxtaposition; walk runs it at `RR64`
- Reproducer: `ProjectFortress/compiler_tests/NumeralTieDefaultCompiled.test`
- Notes now: fixed `b190b8eb2`; full text: history, row 989
- The notes gained: fixed `b190b8eb2`; full text: history, row 989; they lost: siblings: 533, 579, 973. Against the one library, by the distance stage's driver (`plan-31/probes/model-closure/NumeralLine.fss`): 'Ambiguous coercion in call to operator juxtaposition: … (RadixPointNumeral[\2,1,10,10\], ZZ32) only by coercion, none is more specific than every other: ((RR64 & {Float}), RR64)->RR64; (QQ, QQ)->QQ.' It is `explorations/run-c4/src/MicroGptFlat.fss:82` and `MicroGpt...

## Row 1003, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: design limit (library).
- Claim: the tree declares each of `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` twice over, not as the one `value object` of P-178: the one library as a trait that comprises one native object (`Int`, `Long`, `BigNum`, `UnsignedLong`, `Float`), the compiler's prelude as an open trait
- Reproducer: `explorations/compile-ladder/plan-31/probes/number-object-merge.md`
- Notes: siblings: 866, 698, 551, 997, 998, 1000, 542, 959. `Library/FortressLibrary.fss:383-386`, `:775-777`, `:877-879`, `:986-988`, `:1088-1090`; the objects, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:61`, `:379`, `:388`, `:533`, `:544`; the prelude, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:103`, `:147`, `:210`, `:332`, `:401`. The probe merged the five in a scratch tree at 832f7d0d91: 12 files, 258 lines added, 308 deleted; checker count 0, distance 0, both microGPT quick checks 7 of 7, `ant testSystem` 829 of 830, the other row 550's `XXX` test passing. Its estimate: rows 997 and 998 first, then the merge, then row 542. No batch holds it.

## Row 1004, opened

- Section: 14. Contracts, tests and tools. Status: NEGATIVE-BOUNDED. Class: implementation gap (tests).
- Claim: the expected failure of `tests/XXXAtomicNestedReadsKeptWalk.fss` (row 985) depends on a race: in a run of `ant testSystem` the program can keep every update, print `PASS` and turn the suite red
- Reproducer: none
- Notes: siblings: 985. One run of `ant testSystem` at 285255aa77, four shards at four threads on four cores, load about 5: `interpret …/tests/XXXAtomicNestedReadsKeptWalk`, `PASS`, `Missing expected failure`, the suite's one failure of 832 (`Tests run: 207, Failures: 1`). Three runs of the test alone through `explorations/compile-ladder/rung-inference-walk/harness-one.sh` then gave `Saw expected failure`. The change under test edits only the parser's grammar, which the program's text does not reach. Not tried: the rate of the miss, a longer loop in the test.

## Row 1005, opened

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on the compiled path a subscript followed by a superscript, `x[5]^2`, `(B.f())[5]^2` or `B.f()[5]^2`, stops the compile: '** bug! Result of typechecking still contains intermediate nodes.'
- Reproducer: `ProjectFortress/compiler_tests/XXXSubscriptThenSuperscriptCompiled.test`
- Notes: siblings: 1, 84. The parser builds a `MathPrimary` of two math items, a subscripting and an exponentiation (`ProjectFortress/src/com/sun/fortress/parser/Expression.rats:478-488`, at `21045c6c65`), and the checker leaves it in the tree; a single item, `x[5]` or `x^2`, is simplified by the parser and compiles. Walk fails on the same forms as row 1 says. A subscript inside a dotted primary is not such an item, so `B.data[5]^2` compiles and runs. Workaround: `(x[5])^2`, or bind the element first.

## Row 1006, opened

- Section: 1. Syntax: lexing, expressions and declarations. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a postfix operator directly after an exponentiation, `n^2!` or `n^T!`, is refused, where the reassociation applies the operator to the power and the compiled path runs it
- Reproducer: `ProjectFortress/tests/XXXPostfixAfterExponentiation.fss`
- Notes: siblings: 158. `Syntax Error: an exponentiation should not be immediately followed by a non-expression element.`: walk's postfix branch refuses an operand that is an exponentiation (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:971-974`, at `21045c6c65`). The section makes an error only of an exponentiation followed by a subscripting or an exponentiation. Compiled, `n^2!` is `1009` and `n^T!` is `1103` for `opr (x: ZZ32)!` adding 1000 and `^T` adding 100. After a dot, `B.n^2!`, the same on each path. Workaround: `(n^2)!`.

## Row 1007, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses an unwritten clause form of a big operator with two or more static parameters that nothing fixes, as `mm = BIG MIN_MAX[j <- 0#3] pr(j)` for `pr(j: ZZ32): (ZZ32, ZZ32)`: 'is not applicable to an argument of type ()'
- Reproducer: none
- Notes: siblings: 470. The checker writes a reduction's static argument only for a big operator with one static parameter, a type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:656-666` at e5c519a425): a written list shorter than the parameters instantiates only the first, and the second then stops the checker, 'U is not in the kind env'. `DistanceMulti -order check -setting any` on the two lines in a component: 'Could not check call to operator BIG MIN_MAX - [\T extends StandardMinMax[\T\], U extends StandardMinMax[\U\]\]()->Comprehension[...] is not applicable to an argument of type ().' Walk prints `(0,0)`. Workaround: write both static arguments.

## Row 1008, opened

- Section: 8. Generators, reductions and ranges. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a reduction that writes no static argument is not instantiated by the declared type of a method's return, a field, a top-level variable or an assigned variable, as the checker instantiates it: `meth(): RR64 = SUM[j <- 0#4] huge(j)` over `ZZ32` elements of 2^30 raises `IntegerOverflow`
- Reproducer: `ProjectFortress/tests/XXXReductionDeclaredTypeMethodWalk.fss`
- Notes: siblings: 716, 717. Walk reads a declared type only at a local variable and a top-level or local function's return type (F-228), where the sum gives 4.294967296E9; elsewhere it sums at its elements' join, `ZZ32`, and converts after. The checker gives the reduction its expected type in each of these places and sums in `RR64` (`reductionApplication`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:634` at e5c519a425). A call's argument is summed in the body's type on both. Under walk a getter, a field and an assignment overflow too, and a top-level variable stops the load. Workaround: write `SUM[\RR64\]`.

## Row 1009, opened

- Section: 5. Overloading on the compiled path: checker and dispatch. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker refuses a reference, as a value, to a name with several declarations of which one has static parameters, unless one without them fits the receiving arrow type: `useOne(len)` for `len[\T extends Object\](b: Box[\T\])` beside `len[\T extends Object\](p: Pair[\T\])`
- Reproducer: none
- Notes: siblings: 448, 156. The checker instantiates a reference to a generic function by the arrow type that receives it only where the name has one declaration (`instantiatedReference`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:746` at e5c519a425): a functional reference holds one list of static arguments for all its declarations. `fortress compile`: 'Could not check call to function useOne - Box[\ZZ32\]->ZZ32->ZZ32 is not applicable to an argument of type AND(Pair[\T\]->ZZ32,Box[\T\]->ZZ32).' Behind it the code generator has no case for an overloaded function as a value (row 448). Workaround: pass a function of one declaration that calls the name.

## Row 1010, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker stops, 'F is not in the kind env', on a variable bound without a type to a reference to a generic function and never applied: `g = count` for `count[\F extends Object\](b: Box[\F\]): ZZ32`; where `g` is applied it refuses the call with a message
- Reproducer: none
- Notes: siblings: 156. The reference has no receiving arrow type and keeps the function's type with its static parameters; the well-formedness pass then reads `Box[\F\]` outside the function (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:310` at e5c519a425). `fortress compile` of `run(): () = do g = count; println("unused") end`: 'F is not in the kind env [][][]'. An application `g(Box[\ZZ32\](z))` is refused first, 'The applicand is the value of a generic function that no arrow type received' (`compiler_tests/XXXGenericFunctionAsValueUntypedCompiled`). The refusal belongs at the binding, in `impls/Decls.scala`. Workaround: declare the variable's arrow type.

## Row 1011, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: on the compiled path, an assignment to a top-level mutable variable made while a later top-level variable is initialised is not seen by a read before its first use: with `var s: String = "init"` and `top: ZZ32 = setIt()`, where `setIt` assigns "set" to `s`, `run` prints `init`; walk `set`
- Reproducer: none
- Notes: siblings: 313, 152. `fortress compile` and `run` of the three declarations, with `after: String = s` after `top` and `run(): () = do println(s); println(after); println(top) end`, print `init`, `init`, `1` at e5c519a425; `bin/fortress` under walk prints `set`, `set`, `1`. With `top` read first in `run`, as `assert(top, 1, "top")` before the read of `s`, the compiled program reads `set`. So the initialiser seems to run at the variable's first read, as a singleton object's field initialiser does (row 313); the component class's initialisation was not read. Workaround: read the initialised variable before the state that its initialiser writes.

## Row 1012, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker accepts a reference to a generic function whose expected type is not an arrow type, as `p(count)` for `p(x: Any)` and `count[\F extends Object\](b: Box[\F\]): ZZ32`, and the compiled run dies with `NoClassDefFoundError: F$RTTIc`
- Reproducer: none
- Notes: siblings: 758, 156. The section's paragraph on a reference to a generic function makes a reference with no expected arrow type a static error. The reference keeps the function's type with its static parameters (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1695` at e5c519a425), and an arrow type is below `Any`. `fortress compile` exits 0 on db352c1776 and at e5c519a425; `fortress run`: 'java.lang.NoClassDefFoundError: F$RTTIc'. No gated test passes while it shows: an `XXX` compile test of a program that compiles is red. Workaround: write the static argument, `p(count[\ZZ32\])`.

## Row 1013, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: compiled, a functional method of a generic trait named as a value inside the trait and passed at an arrow type links and dies at run time with `NoSuchMethodError`: `useFm(fm, self, x)` in `trait Tr[\T extends Object\]` for `fm(self, x: T): ZZ32`
- Reproducer: `ProjectFortress/compiler_tests/XXXFunctionalMethodValueGenericTraitCompiled.test`
- Notes: siblings: 594, 643, 448. The checker accepts the call: the method's arrow type carries the trait's static parameter as a lifted one, which the trait's kind environment binds (`ProjectFortress/src/com/sun/fortress/scala_src/types/TypeAnalyzer.scala:323`). The run, on db352c1776 and at e5c519a425: "NoSuchMethodError: 'FZZ32 X.fm(X$Tr[FZZ32], FZZ32)'", the class names shortened here. Walk was not run. No workaround tried.

## Row 1014, opened

- Section: 12. The compiled path: constructs, crashes and the switch-over. Status: NEGATIVE-VERIFIED. Class: implementation gap (codegen).
- Claim: compiled, a numeral that ends a block after a local declaration, in a function declared to return `ZZ32`, links and dies at run time with `NoClassDefFoundError: fortress/CompilerBuiltin$v`: `four(): ZZ32 = do`, `k: ZZ32 = 3`, `4`, `end` on four lines
- Reproducer: `ProjectFortress/compiler_tests/XXXNumeralEndsBlockAfterDeclarationCompiled.test`
- Notes: siblings: 957. The same on db352c1776 and at e5c519a425. A block that ends in the variable, `k`, runs, and so does `do`, `println("h")`, `4`, `end`, a statement before the numeral. So the failure is the numeral's coercion at the block's expected type after a declaration; the class named is the coercion's `nat v` parameter. The code generator was not read. Workaround: end the block with a variable.

## Row 1015, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-BOUNDED. Class: implementation gap (checker).
- Claim: the compiled checker reports a type error in the body of a reduction that writes no static argument, over a big operator whose bound names its own parameter, as the big operator's refusal, 'is not applicable to an argument of type ()', and not as the body's error
- Reproducer: none
- Notes: siblings: 731. `e = BIG LAST[j <- Upto(3)] (j + "a")` over the big operator of `compiler_tests/InferBigOperatorSelfBound`: 'Could not check call to operator BIG LAST - [\T extends CompilerAlgebra.Equality[\T\]\]()->Red[\T\] is not applicable to an argument of type ().' and nothing of `+`; with the bound `Number` the message holds 'Could not check call to operator +'. The body is read in a try checker, which drops its errors (`reductionBodyType`, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:700` at e5c519a425), and the refusal is then the unwritten call's. Workaround: write the static argument to read the body's error.

## Row 1016, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: design limit (walk).
- Claim: under walk a numeral beside a value whose static type is `Any` is converted by the value's run-time type: for `a: Any` holding a zero `NN32`, `a = 0` is `true` and `same(a, 0)` runs `same(a: NN32, b: NN32)`, where the text gives the numeral its default, so `false` and `same(a: Any, b: Any)`
- Reproducer: `ProjectFortress/tests/XXXNumeralBesideAnyWalk.fss`
- Notes: siblings: 19, 973. Walk has no static types (P-12), so its choice for a call with a numeral reads the arguments' values (`OverloadedFunction.belowByNumerals`, `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2372` at 5466455249). The compiled checker gives the numeral its default: `same(a, 0)` prints `any` on the prelude (`compiler_tests/NumeralMostSpecificCompiled`), and against the one library the numeral of `a = 0` is a `ZZ32`. It ends when walk runs the checker (P-59). To compare at the default under walk, bind the numeral first: `z = 0`, then `a = z`.

## Row 1017, opened

- Section: 7. Numerals, floats and comparisons. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: on both paths a numeral beside a declaration whose parameter is a type parameter without a bound does not go to a more specific one that its own coercion reaches: `g(5)` for `g[\T\](x: T)` beside `g(x: NN32)` runs the generic declaration at `ZZ32`, where beside `k(x: Any)` it runs `k(x: NN32)`
- Reproducer: `ProjectFortress/tests/XXXNumeralBesideTypeParameterWalk.fss`
- Notes: siblings: 973. Both paths seek a declaration below the fitting one only where that one has the numeral at a parameter not of its default type, and read the instance's type, `ZZ32`, not the declared `T` (`open`, `scala_src/typechecker/impls/Functionals.scala:827-831`; `OverloadedFunction.belowByNumerals`, `:2378-2385`, at 5e436b5b19). Walk and the compiled run on the prelude print `generic` (compiled: a probe, not kept). Under walk `va(5)` for `va(xs: Any...)` beside `va(x: NN32)` prints `anys` (compiled: row 624). The repair reaches every numeral at a generic declaration (P-148). Workaround: `n: NN32 = 5`, then `g(n)`.

## Row 1018, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a generic function is refused at an arrow type over the callee's own type parameter where another argument fixes that parameter: `appT(half, v)`, for `appT[\T\](f: T -> T, x: T)`, `half[\nat n\](x: Vector[\RR64,n\]): Vector[\RR64,n\]` and `v: Vector[\RR64,3\]`
- Reproducer: `ProjectFortress/tests/XXXGenericFunctionAtTypeParameterWalk.fss`
- Notes: siblings: 156, 705. Walk fixes `T` by the run-time type of `x`, `__DefaultVector[\RR64,3\]`, since a generic function constrains no static parameter of its callee (`interpreter/evaluator/EvaluatorBase.java`, `unifyArgument`); `half` at 3 returns a `Vector[\RR64,3\]`, which is no `__DefaultVector[\RR64,3\]`, so no instance fits: 'Unification error: Closure/Constructor for appT param 1 (f:__DefaultVector[\RR64,3\]->__DefaultVector[\RR64,3\]) got arg half... of type half[\n\]'. A function without static parameters passes: its arrow type joins into `T`. Workaround: write the static argument, `appT(half[\3\], v)`, or the callee's, `appT[\Vector[\RR64,3\]\](half, v)`.

## Row 1019, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, an immutable top-level variable of arrow type keeps a generic function as it is, not its instance at that type: for a top-level `g: Vector[\RR64,3\] -> Vector[\RR64,3\] = half`, `g(w)` runs for a `w: Vector[\RR64,2\]`
- Reproducer: `ProjectFortress/tests/XXXGenericFunctionTopLevelVariableWalk.fss`
- Notes: siblings: 156. A parameter, a local variable declared with the type, an assignment and a mutable top-level variable receive the instance (`values/NonPrimitive.java`, `buildEnvFromParams`; `BaseEnv.java`, `putVariable` and `assignValue`), and refuse the call: 'Closure/Constructor for half param 1 (x:Vector[\RR64,3\]) got arg __DefaultVector[\RR64,2\]'. The immutable top-level binding is a lazily evaluated cell whose value is only checked against the declared type (`interpreter/evaluator/BuildEnvironments.java`, `forVarDecl1` and `forVarDecl4`). Repair: `Fcn.received` where that cell's value is checked.

## Row 1020, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk, a function declared in a block with static parameters of its own stops where it is declared, 'Missing type T': `loc[\T\](x: T): T = x` in the body of `run`, whether it is then called or passed
- Reproducer: `ProjectFortress/tests/XXXLocalGenericFunctionWalk.fss`
- Notes: siblings: 156, 304. The error names the position of the declared return type, before any call: 'XXXLocalGenericFunctionWalk.fss:8:21: Missing type T'. The same on the base `db352c1776`. Row 304's note "Walk runs local functions" holds for a local function without static parameters only. Workaround: declare the function at the top level.

## Row 1021, opened

- Section: 2. Types: generics, static parameters, inference and coercion. Status: NEGATIVE-VERIFIED. Class: design limit (walk).
- Claim: under walk a reference to a generic function that no arrow type receives, or whose receiving arrow type leaves a static parameter open, runs and is instantiated at each application, where the text makes it a static error: `g = half; g(v); g(w)` prints both sizes
- Reproducer: none
- Notes: siblings: 156, 1010, 1012. Walk has no static types (P-12): at an untyped place, at `Any` and at a type parameter the value stays generic, and each application infers its static arguments from its arguments' run-time types (`interpreter/evaluator/EvaluatorBase.java`, `leavesOpen`). Runs of that rung's report, "Runs to report, not tests": for `half[\nat n\](x: Vector[\RR64,n\])`, `g = half; println(g(v)); println(g(w))` prints '[0#3][ 4.0 4.0 4.0 ]' and '[0#2][ 2.0 3.0 ]', on the base too; `useTag(tag, z)` for `tag[\nat k\](x: ZZ32)` stops at the application, 'undefined variable [k]'. The checker refuses both. It ends when walk runs the checker.

## Row 1022, opened

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk an array literal bound in a block to a declared array type of another size is not refused: `a: ZZ32[4] = [27 16 27]` binds an array of three elements, and `a[1]` is 16; the same declaration at the top level is refused
- Reproducer: `ProjectFortress/tests/XXXBlockArrayLiteralSize.fss`
- Notes: siblings: 49, 104. `LHSEvaluator.forLValue` stores the array that `libraryArray` builds at the literal's own extents and never compares it with the declared type (`LHSEvaluator.java:204-206` at 06b90ba6cf); the top-level binding checks it in `BuildEnvironments.forVarDecl4`, 'Type mismatch binding __DefaultVector[\ZZ32,3\] ... to shp (type Array1[\ZZ32,0,4\])' (test `TopLevelArrayLiteralSize`). Command: `bin/fortress BodyBad.fss`, whose `run()` is `a: ZZ32[4] = [27 16 27]` then `println(a[1])`, prints `16` and exits 0. The test binds in a block inside a top-level initializer, so that the refusal is one at load. The compiled prelude has no array type.

## Row 1023, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a top-level initializer that reads a mutable top-level variable declared later fails at load: `early: ZZ32 = late + 1` above `var late: ZZ32 = 3` gives `Failed to find any matching overload, args = (thunk (IntLiteralExpr …`; the compiled path prints 4
- Reproducer: `ProjectFortress/tests/XXXTopLevelVarForwardRead.fss`
- Notes: siblings: 323. Before its own initialization a mutable variable's reference cell holds a `LazilyEvaluatedCell` (`BuildEnvironments.java:722-723` at 06b90ba6cf) that a plain reference passes on unforced: `early: ZZ32 = late` gives 'Attempt to find type of uninitialized variable: thunk', `var early: ZZ32 = late` the same. A subscript or a method call on the variable forces the cell, so `var first: ZZ32 = tally[0]` above `var tally: ZZ32[2] = [5 6]` is 5. `tests/InitOrderWithMutable.fss` passes because its reader is untyped and only printed. Workaround: declare the mutable variable first, or make the later one immutable.

## Row 1024, opened

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a `var` variable declared in a block with an array type and bound to an array literal is bound immutable: `var t: ZZ32[2] = [5 6]` then `t := u`, `u` an array of that type, stops with `Cannot assign to immutable t`; the same declaration at the top level is mutable
- Reproducer: `ProjectFortress/tests/XXXArrayLiteralLocalVar.fss`
- Notes: siblings: 49, 104, 142. `LHSEvaluator.forLValue` stores the built array with `putValue`, whatever the declaration's mutability (`LHSEvaluator.java:204-206` at 06b90ba6cf); its arm for a value that is no paste stores a variable. `t: ZZ32[2] := [5 6]` does the same. Assigning an element, `t[0] := 9`, works. Workaround: bind the literal to an immutable name and initialize the `var` from it.

## Row 1025, opened

- Section: 9. Arrays, vectors and matrices. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk an array literal assigned to a variable of an array type is not built into an array: `t := [7 8]` for `var t: ZZ32[2]` stops with `Type mismatch assigning (7,8): (ZZ32,ZZ32) (type (ZZ32,ZZ32)) to t (type Array1[\ZZ32,0,2\])`
- Reproducer: `ProjectFortress/tests/XXXArrayLiteralAssigned.fss`
- Notes: siblings: 49, 104, 142. Only a declaration builds the paste: `LHSEvaluator.forLValue` in a block, the variable's cell and `BuildEnvironments.forVarDecl4` at the top level; an assignment compares the paste with the variable's type. The same at a top-level `var` and at a local one. Workaround: bind the literal to an immutable name of the type and assign the name.

## Row 1026, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk the right side of a top-level tuple binding is evaluated once for each name and once more: `(first, second) = pairOnce()` runs `pairOnce` three times, and the names hold elements of different runs
- Reproducer: ProjectFortress/tests/XXXTopLevelTupleBindingOnceWalk.fss
- Notes: siblings: 152. `DesugarerVisitor.forVarDecl` binds a temporary to the right side, then initializes each name from a field reference on the right side itself, not on the temporary (`ProjectFortress/src/com/sun/fortress/interpreter/rewrite/DesugarerVisitor.java:865-875`, at db352c1776). With a counter in `pairOnce`, `calls` is 3, `first` 2 and `second` 30; three names give four runs. A tuple of literals shows only its cost. The compiled path evaluates once (`compiler_tests/TopLevelTupleBindingCompiled`). Workaround: bind the call to one name, `pair = pairOnce()`, then `(first, second) = pair`.

## Row 1027, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (walk).
- Claim: under walk a top-level initializer whose call reads a mutable top-level variable declared later fails: `early = next()` before `var counter: ZZ32 = 5`, with `next(): ZZ32 = counter + 1`, 'Failed to find any matching overload, args = (thunk …'
- Reproducer: ProjectFortress/tests/XXXInitializerCallReadsLaterMutableWalk.fss
- Notes: siblings: 323, 1023. The specification lets an initializer refer to a variable declared later. Walk runs an untyped initializer that only names a later mutable variable (`ProjectFortress/tests/InitOrderWithMutable.fss`; row 1023 for a typed one); read in the body of a function that the initializer calls, the variable's unevaluated thunk reaches the operator. With the later variable immutable walk prints 6, as the compiled path does in both forms. At db352c1776. Workaround: declare the mutable variable before the initializer that reaches it.

## Row 1028, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled export check does not match a top-level variable that a component declares mutable by `:=` against the api's `var` declaration: `tally: ZZ32 := 0` under `var tally: ZZ32`, 'Unmatched declarations … due to different modifiers'
- Reproducer: ProjectFortress/compiler_tests/XXXTopLevelVarByAssignExport.test
- Notes: siblings: 844. The specification: the modifier `var` is optional when `:=` is used. The export check compares the declarations' modifiers, and `:=` sets the variable mutable without the modifier. The same for a tuple binding, `(a, b): (ZZ32, ZZ32) := (0, 9)`. Walk runs a program that imports such a variable. At db352c1776. Workaround: write `var` in the component.

## Row 1029, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-VERIFIED. Class: implementation gap (checker).
- Claim: the compiled checker does not check a declared type of a local tuple binding's name against its element where other names declare none and the right side is no tuple expression: `(total: ZZ64, part) = two()`, `two(): (ZZ32, ZZ32)`, compiles and stops at run time with a `ClassCastException`
- Reproducer: ProjectFortress/compiler_tests/XXXLocalTupleBindingMixedTypes.test
- Notes: siblings: 474. Where only some names declare a type, the case types the names without one from the right side and keeps the others unchecked (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:425-430`; the same at db352c1776); `(e: String, f) = two()` compiles and prints 7. Walk converts or refuses, 'RHS expression type ZZ32 is not assignable to LHS type String'. The top-level form checks the right side again against each name's type (`Decls.scala:324-336`, `compiler_tests/TopLevelTupleBindingMixedTypes`). Workaround: declare every name's type, or none.

## Row 1030, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: on the compiled path a function whose body is a block that ends in a tuple with a numeral element, at a declared tuple return type, fails at run time: `pair(k: ZZ32): (ZZ32, ZZ32) = do (1, k) end`, 'NoClassDefFoundError: fortress/CompilerBuiltin$v' in `coerce_ZZ32`; walk gives the pair
- Reproducer: ProjectFortress/compiler_tests/XXXBlockEndsInTupleOfNumeralCompiled.test
- Notes: It fails so at db352c1776. The same tuple as the whole body, `flat(k: ZZ32): (ZZ32, ZZ32) = (1, k)`, runs, and so does a tuple of numerals alone in a block. The stack names the numeral's coercion called as a function value, `coerce_ZZ32[\1,10,1\]` as an arrow from `NaturalNumeral[\n,r,v\]`, so the block's tuple seems to convert by the tuple coercion with the numeral's coercion uninstantiated; not traced further. Kin: `nest(): ((ZZ32, ZZ32), String) = ((10, 20), "s")` stops with a `ClassCastException` of an `FZZ32` to a numeral type, at db352c1776 too. Workaround: bind the numeral to a typed variable first.

## Row 1031, opened

- Section: 3. Traits, objects and components. Status: NEGATIVE-BOUNDED. Class: implementation gap (codegen).
- Claim: a tuple binding with declared types whose right side is an `if` with tuple branches stops the code generator: `(m, n): (ZZ32, ZZ32) = if flag then (1, 2) else (3, 4) end`, 'Error trying to close method scope' in a block, an `ArrayIndexOutOfBoundsException` of ASM's `Frame.merge` at the top level
- Reproducer: ProjectFortress/compiler_tests/XXXTupleBindingIfBranchesCompiled.test
- Notes: siblings: 340, 819. The local form fails so at db352c1776. Without declared types the same binding compiles and prints 3, local and top-level, and so does `(m, n): (ZZ64, ZZ32) = if flag then two() else two() end`; a single `x: ZZ64 = if flag then 1 else 3 end` compiles. So the fault needs the declared tuple type pushed into branches that are tuple expressions; the mechanism was not traced. Walk prints 3. Workaround: leave the names untyped, or bind each branch's tuple first.

# Climb batch 29, rung F: the numeral fold on both paths, typed-place constants rounded once, a program's numeral coercion once per site

- problem: the fold ran on the compiled path only and stopped the compile at `3 CHOOSE 5`, took `BOXPLUS` as `+`, and a float numeral became an `RR64` by two or three roundings: `explorations/compile-ladder/plan-29/PROBES.md:28-46` (probes 2 and 3); rows 862, 954, 955 (`explorations/fortress-gap-ledger.md:628`, `:638`, `:639`)
- spec: `Specification/basic/expressions/constant.tex:39-93` ("Types of Static Expressions"); `Specification/basic/expressions/literals.tex:182-193` (a static rational expression converted with at most one rounding)
- precedent: the team's fold, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:58-174` at b430f9f428; the prototype's typed constants, `explorations/compile-ladder/plan-29/probes/literal-default.patch:697-855`; the code generator's static fields set in a class's static initializer, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1926-1986` and `:4821-4845` at b430f9f428; an operator reference remade from a written one, `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1997-2020`
- deviation: a program's numeral sites are initialized in the component class's static initializer, whatever class holds the site (`CodeGen.java:7200-7220`)
- deviation: the component class's static initializer is emitted after the component's declarations, not before (`CodeGen.java:1936-2003`)
- deviation: a juxtaposition of numerals alone folds as their product, beside `DOT` and `TIMES` (`IntegerLiteralFoldingVisitor.java:416-434`)
- deviation: the comparisons, `MIN` and `MAX` fold over radix-point operands too, exactly (`IntegerLiteralFoldingVisitor.java:304-310`)
- deviation: a folded form that needs a prefix minus or a `/` reuses one written in the component, and the expression is left as written where the component writes none (`IntegerLiteralFoldingVisitor.java:95-114`, `:174-185`; NEW-F-2)
- deviation: the compiled test harness gains the key `run_exits_nonzero` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:595-606`)
- historical: `ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java`, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java`, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`, `ProjectFortress/compiler_tests/Compiled7.Print17.fss`, `ProjectFortress/tests/sequivTest.fss`

## What changed and why

Commits on `wip/rung-literal-fold`: `8e4ca7b070` (the fold, the phase order, the typed constants, the once-per-site call, the harness key, the tests), `f58c027526` (five tests respelled with typed operands), `1bf56ffa92` (`XXXNumeralFoldNoPrefixMinusWalk`). The code is `8e4ca7b070`'s; the two later commits change tests only.

**The phase order** (`PhaseOrder.java:125-136`). Walk's order was PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, TYPECHECK (switched off under walk), DESUGAR, OVERLOADREWRITE_FOR_INTERPRETER. It now has INTEGERLITERALFOLDING after PRETYPECHECKDESUGAR, as the compiler's order has had it: PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, INTEGERLITERALFOLDING, TYPECHECK, DESUGAR, OVERLOADREWRITE, CODEGEN (unchanged). The count and distance stages run the compiler's order up to TYPECHECK (`explorations/coordinator/tools/checker-count/run.sh`, header), so they read the folded library.

**The fold** (`IntegerLiteralFoldingVisitor.java`, rewritten). An expression of numerals alone, or of the forms the fold writes, folds exactly into a `Constant` (numerator, positive denominator in lowest terms, and a kind: integer, quotient, radix point). The kind sets the default P-173 gives: a radix point among the operands makes the result a radix-point constant, else a `/` makes it a quotient, else it is an integer.

The operators folded, each over integer and radix-point operands unless said, by canonical name through `PrecedenceMap.canon` (`:80-87`):
- `+`, `-`; multiplication `DOT`, `TIMES` (canonical `BY`, as `×`), and a juxtaposition of numerals alone (`:417-434`): exact rational arithmetic.
- `/` by a nonzero numeral: a quotient, or a radix-point constant where an operand has a radix point.
- `^` by an integer numeral of magnitude at most 4096; an integer base takes no negative exponent (P-153: such a power raises at run time); a radix-point or quotient base takes one, so `10.0^(-5)` is `0.00001`.
- prefix `-` and `|_|`.
- `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `MINMAX`: integers only, with the answers of `simpleIntArith` and `simpleArbitraryPrecisionArith` (`DIV` truncates, `REM` has the dividend's sign, `MOD` the divisor's, `GCD` is nonnegative, `LCM` of a zero is 0); `CHOOSE` folds where 0 ≤ k ≤ n and gives 0 otherwise, as walk's `ZZ32` answers (`tests/ChooseZZ32Walk.fss:36-37`).
- `MIN`, `MAX` and the comparisons `<`, `<=`, `>`, `>=`, `=`, `NE`, binary or chained (`:392-407`), into the chosen operand or a boolean.
- `||` of two natural numerals of one radix, as written (`:336-364`): their digits joined, leading zeros kept, in that radix.

The operators left alone, with their reasons (fork F2):
- `BOXPLUS`, `DOTPLUS`, `BOXMINUS`, `DOTMINUS` (binary and prefix), `BOXDOT`, `BOXCROSS`, `DOTCROSS`, `DOTTIMES`: their meaning needs a width; the base took the first four as `+` and `-` (row 955).
- `BITAND`, `BITOR`, `BITXOR`, `BITNOT`, `AND`, `OR`, `XOR`, prefix `NOT`, `LSHIFT`, `RSHIFT`, `<<`, `>>`: bitwise operators and shifts need a width; the base folded `AND`, `OR`, `XOR` and prefix `NOT` as bitwise operations on the exact value.
- a division by zero: `/`, `DIV`, `REM`, `MOD` by 0 stay as written, so the run raises; the base folded `n DIV 0` into `CompilerBuiltin.Infinity`, `NegativeInfinity` or `UndefinedNumber` (`IntegerLiteralFoldingVisitor.java:69-74` at b430f9f428).
- a result that IEEE arithmetic could make `-0.0`: `-(0.0)`, a zero product of radix-point kind with a negative factor (`0.0 DOT -1`), and `0.0 / -3` (`StrictEquivalenceRuleWalk.fss:30` asserts `0.0` and `-0.0` differ).
- every other operator.

The forms of a folded result (fork F1), each with an example from `NumeralFoldJUTest`:
- an integer numeral: `2147483647 + 1` is `2147483648`, `2^40` is `1099511627776`, `65536 65536` is `4294967296`; negative as a numeral node with a negative value, the form F-262 states: `-2147483648`.
- a decimal radix-point numeral, where the denominator divides a power of ten: `0.1 + 0.2` is `0.3`, `0.5 + 0.5` is `1.0`, `10.0^(-5)` is `0.00001`, `0.5 MAX 1` is `1.0`; negative as prefix minus on it: `0.1 - 0.3` is `-(0.2)`.
- the reduced quotient of two integer numerals, for operands without a radix point: `7/2` is `7 / 2`, `14/4` is `7 / 2`, `6/3` is `2 / 1`, `(1/3) + (1/6)` is `1 / 2`.
- `p.0 / d` where an operand has a radix point and the denominator does not divide a power of ten, `p` and `d` both exact doubles (below 2^53): `0.1 / 3` is `1.0 / 30`; at an `RR64` place its one rounding is IEEE division of two exact doubles.
- a boolean: `0.3 = 0.1 + 0.2` is `true`; `(1/3) < 0.3333333333333333` is `false`.
- a written operand, where the result is that operand: `2.50 MAX 1` is the numeral `2.50` as written, so its digits reach a program's coercion.
- `3 MINMAX 5` is the tuple `(3, 5)`; `deadc_16 || 0de_16` is the natural numeral `deadc0de_16`.

A form that needs a prefix minus or a `/` reuses a reference that the component writes: a reference carries the overloadings the disambiguator gave it, and the prefix minus's differ from the infix minus's (the dump of `bin/fortress grammar -out` on a program with both: the prefix reference's `_newOverloadings` name the unary declarations, `CompilerBuiltin.fsi:340`, `:399`, `:280`, the infix one's the binary ones, `:405`, `:440`, `:160`). Where the component writes none, the expression is left as written: NEW-F-2.

**The typed-place constants** (fork F8, the prototype's step 3). `CoercionDesugarer.foldsTo` (`CoercionDesugarer.scala:28-55`, `:94-95`) turns the coercion of a numeral into a library number type into the numeral typed at that type: an integer numeral in the range of `ZZ32`, `ZZ64`, `NN32` or `NN64`, any integer numeral into `ZZ`, any numeral into `RR64` or `RR32`. `QQ` is not folded (fork F7). Out of range, the coercion call stays and raises at run time. The code generator (`CodeGen.java:2049-2072`, `:4234-4313`) emits the typed numeral as that type's constant: `FZZ32.make(int)`, `FNN32.make(int)`, `FZZ64.make(long)`, `FNN64.make(long)`, `FZZ.make(String)`, `FRR64.make(double)`, `FRR32.make(float)`. A float is one rounding of the exact rational (`roundToDouble`, `roundToFloat`): a quotient of at least 56 (or 28) bits with a sticky bit, rounded to nearest even by `BigInteger.doubleValue` (or `floatValue`), then scaled by `Math.scalb`. A numeral still of its own type gets the same one-rounded double in `FFloatLiteral.make(double)`. A probe (`RoundCheck.java`, a scratch program) compared `roundToDouble` and `roundToFloat` with `BigDecimal.doubleValue` and `floatValue` on 200,000 random decimals of up to 30 digits: `random decimals: 200000, double mismatches 0, float mismatches 0`.

Row 862's numerals, compiled, `x: RR64 = …` printed (`Row862.fss`, a scratch program, old code then new):

    == old Row862
    x =  1.0
    y =  1.224646799147353
    r =  0.7742526428202697
    == new Row862
    x =  0.9999999999999999
    y =  1.2246467991473533
    r =  0.7742526428202698

`Double.parseDouble` gives `0.9999999999999999`, `1.2246467991473533` and `0.7742526428202698` for the three numerals.

**A program's coercion once per site** (fork F5; `CodeGen.java:7155-7220`). Where the code generator meets the call of a program's coercion (a `FnRef` named `coerce_…`, without static arguments, not a local function) on a numeral still of its own type, whose result is a trait type without static arguments outside the libraries, in a component outside the libraries, it registers the site: the result is kept in a public static final field `numeral$coercion$N` of the component's class, and the site reads it by `GETSTATIC`. The component's static initializer, now emitted after the declarations and after the generic-function caching tables, calls each registered coercion once and stores its result (`emitNumeralCoercionSites`). So:
- where the class holds the result: a static field of the component's class, one per site, for every site of the component, in a top-level function, an object's or trait's method, a closure or a generic template;
- when the call runs: when the component's class is initialized, its first use; for the main component, before `run()` starts (`NumeralCoercionOnceCompiled`: `coerce`, `coerce`, `start`, `PASS`);
- a raising coercion: the component class's initialization fails, the program stops before `run()` with exit code 1, and the stack names the class's static initializer, `at NumeralCoercionRaisesCompiled.<clinit>(…NumeralCoercionRaisesCompiled.fss:13)`.

The coercion receives today's compiled numeral value, of the prelude's `IntLiteral` or `FloatLiteral`; its four numbers wait for the one library's numeral objects (fork F5). A library type's coercion of a numeral that `foldsTo` leaves (out of range) stays called at the site.

**The harness key.** A plain compiled run test fails on a non-zero exit (`FileTests.java:595-606`), so no plain test could show a load that fails. `run_exits_nonzero=true` makes a non-zero exit the expected one; the other `run_` keys still apply. `NumeralCoercionRaisesCompiled.test` uses it with `run_out_equals=coerce\n` and `run_err_contains=NumeralCoercionRaisesCompiled.<clinit>`.

**The tests.**
- `ProjectFortress/tests/NumeralFoldWalk.fss`: under walk, `2147483647 + 1` a `ZZ64` equal to 2147483648, `-2147483648` a `ZZ32`, `2^40`, `65536 65536`, `65536 DOT 65536`, `0.1 + 0.2 = 0.3`, `7/2` a `QQ`, `3 CHOOSE 5`, `5 CHOOSE (-1)`, `10 CHOOSE 3`, `deadc_16 || 0de_16 = deadc0de_16`, `(1/3) + (1/6) = 1/2`, `(-7) / 2` a `QQ`, `0.1 - 0.3 = -0.2`, `10.0^(-5) = 0.00001`, `0.3 = 0.1 + 0.2`, and `1 DIV 0` raising `DivisionByZero`. Types asserted by `typecase` are P-173's defaults, no static argument and no message.
- `ProjectFortress/compiler_tests/LiteralFoldCompiled.fss` and `.test`: `3 + 4`, `2^40` at `ZZ64`, `0.77425264282026984` at `RR64` equal to `0.7742526428202698`, `0.1 + 0.2` at `RR64` equal to `0.3`, `3 CHOOSE 5` compiling and giving 0, `10 CHOOSE 3`, `deadc_16 || 0de_16` at `ZZ64`.
- `ProjectFortress/src/com/sun/fortress/compiler/desugarer/NumeralFoldJUTest.java`: the operators left alone, a division by zero left, the negative zeros left, `CHOOSE` outside its range, and each form above.
- `FloatNumeralOneRounding` (promoted from `XXXFloatNumeralOneRounding`, three files, with row 862's second numeral added).
- `NumeralCoercionOnceCompiled`: two evaluations of one site `SEQV`, two sites not, and the coercion's print once per site, before `run()` starts (`run_out_equals=coerce\ncoerce\nstart\nPASS\n`).
- `NumeralCoercionRaisesCompiled`: a coercion that raises fails the load.
- `XXXNumeralDivByZeroCompiled` with `NumeralDivByZeroCompiledLink.test` (NEW-F-1) and `XXXNumeralFoldNoPrefixMinusWalk` (NEW-F-2).

## The failing runs and the passing runs

The failing runs, on the base's code, each ending before the edit was first built (the edit was first built by `ant compileAll` at about 2026-11-09T03:01):

`explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-literal-fold/h1 ProjectFortress/tests/NumeralFoldWalk.fss ProjectFortress/tests/ChooseZZ32Walk.fss ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss`, 2026-11-09T02:52:56Z, tree b430f9f428 unedited:

    . interpret tmp/rung-literal-fold/h1/tests/NumeralFoldWalk
     UNEXPECTED exception
    FortressException: IntegerOverflow
    Tests run: 3,  Failures: 1,  Errors: 0

`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base ProjectFortress/compiler_tests FloatNumeralOneRoundingLink.test FloatNumeralOneRounding.test LiteralFoldCompiled.test NumeralCoercionOnceCompiled.test NumeralCoercionRaisesCompiled.test`, 2026-11-09T02:53:16Z:

    . link ProjectFortress/compiler_tests/LiteralFoldCompiled
    com.sun.fortress.exceptions.CompilerError: Integer Literal folding: Need to do something for factorial of negative values
    F. run ProjectFortress/compiler_tests/FloatNumeralOneRounding (272ms) FAIL:  0.9999999999999999 rounds to the double below 1.0
    F. run ProjectFortress/compiler_tests/NumeralCoercionOnceCompiled (338ms) start
    Tests run: 9,  Failures: 5,  Errors: 0

`ant testOnly -DtestPattern=NumeralFoldJUTest`, 2026-11-09T02:53:32Z, the base's code with the test class added:

    [junit]   testWrappingAndSaturatingOperatorsAreLeft(com.sun.fortress.compiler.desugarer.NumeralFoldJUTest) FAIL
    [junit]   testChooseOutsideItsRangeIsZero(com.sun.fortress.compiler.desugarer.NumeralFoldJUTest) FAIL
    [junit] Tests run: 5, Failures: 3, Errors: 1, Skipped: 0, Time elapsed: 0.235 sec

The tests were then extended, and their final texts were run on the old code (`worktrees.md`, "Running the old code"):

`FORTRESS_HOME=/home/user/fortress-base29 /home/user/fortress-base29/explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-literal-fold/old-harness ProjectFortress/tests/NumeralFoldWalk.fss ProjectFortress/tests/ChooseZZ32Walk.fss ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss`, 2026-11-09T03:07:55Z:

    . interpret …/old-harness/tests/NumeralFoldWalk
     UNEXPECTED exception
    FortressException: IntegerOverflow
    Tests run: 3,  Failures: 1,  Errors: 0

`explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base29 <tree>/tmp/old-caches junit <tree>/ProjectFortress/compiler_tests/LiteralFoldCompiled.test <tree>/ProjectFortress/compiler_tests/NumeralCoercionRaisesCompiled.test <tree>/ProjectFortress/compiler_tests/NumeralDivByZeroCompiledLink.test <tree>/ProjectFortress/compiler_tests/XXXNumeralDivByZeroCompiled.test`, 2026-11-09T03:05:40Z:

        Right-hand side has type OR(IntLiteral,Infinity), but declared type is ZZ32.
    F. run …/NumeralCoercionRaisesCompiled (544ms) start
    coerce
    Tests run: 6,  Failures: 5,  Errors: 0

`java -cp "<scratch>:$(FORTRESS_HOME=/home/user/fortress-base29 /home/user/fortress-base29/bin/fortress_classpath | tail -1)" junit.textui.TestRunner com.sun.fortress.compiler.desugarer.NumeralFoldJUTest`, the final test compiled against the base build's classes, 2026-11-09T03:07:42Z:

    1) testChooseOutsideItsRangeIsZero(com.sun.fortress.compiler.desugarer.NumeralFoldJUTest)com.sun.fortress.exceptions.CompilerError: Integer Literal folding: Need to do something for factorial of negative values
    5) testRadixPointResultsAreDecimals(com.sun.fortress.compiler.desugarer.NumeralFoldJUTest)junit.framework.AssertionFailedError: 0.1 + 0.2 folds into a numeral with a radix point, not a OpExpr
    Tests run: 9,  Failures: 7,  Errors: 1

The passing runs, the last runs after the last change of code (`8e4ca7b070`'s code; the tree at `f58c027526` and `1bf56ffa92`):

`explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/rung-literal-fold/h3 ProjectFortress/tests/NumeralFoldWalk.fss ProjectFortress/tests/XXXNumeralFoldNoPrefixMinusWalk.fss ProjectFortress/tests/ChooseZZ32Walk.fss ProjectFortress/tests/NativeHelperFamilyZZ32Walk.fss ProjectFortress/tests/NativeHelperFamilyDivisorsWalk.fss ProjectFortress/tests/AnyNativesIntrinsicWalk.fss ProjectFortress/tests/StrictEquivalenceRuleWalk.fss ProjectFortress/tests/sequivTest.fss`, 2026-11-09T03:34:54Z: `OK (8 tests)`.

`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests FloatNumeralOneRoundingLink.test FloatNumeralOneRounding.test LiteralFoldCompiled.test NumeralCoercionOnceCompiled.test NumeralCoercionRaisesCompiled.test NumeralDivByZeroCompiledLink.test XXXNumeralDivByZeroCompiled.test Print17.test`, 2026-11-09T03:35:17Z: `OK (14 tests)`.

`ant testOnly -DtestPattern=NumeralFoldJUTest`: `[junit] Tests run: 9, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.261 sec`.

The first `XXX` test, `XXXNumeralDivByZeroCompiled`, seen as an expected failure (`Saw expected failure (Exit code != 0)` in the final run above) and red for one run with `1 DIV 0` replaced by `-7`, then restored (`junit.sh xxxred ProjectFortress/compiler_tests NumeralDivByZeroCompiledLink.test XXXNumeralDivByZeroCompiled.test`):

    . run ProjectFortress/compiler_tests/XXXNumeralDivByZeroCompiled (529ms) REACHED
    PASS
    Did not see expected failure
    Tests run: 2,  Failures: 1,  Errors: 0

## Where the fix belongs, and the precedent search

The fold is the compiler's phase INTEGERLITERALFOLDING (`compiler/IntegerLiteralfolder.java`, `compiler/phases/IntegerLiteralFoldingPhase.java`), a desugaring before the checker that walk now runs too (`explorations/coordinator/map/modules-and-phases.md`, B.5: the desugaring phases are shared, Shell's switches choose the visitors). Walk evaluates the folded tree as it is; walk's evaluator is not edited. The typed-place constant is the coercion desugarer's, which only the compiled path runs (`references/interpreter.md`, "Where a fix of walk belongs": walk turns off coercion desugaring), and the code generator's literal methods. The once-per-site call is the code generator's.

Precedents counted: the team's fold has one result form for integers, `ExprFactory.makeIntLiteralExpr(info, value)`, used at 12 places in `foldBinaryOperator` and 3 in `forOpExprOnly` at b430f9f428; the new fold keeps it for integers. The code generator keeps a value computed once in a static field set by a static initializer in three ways: the component class's caching tables (`CodeGen.java:1926-1986` at the base), the trait and object classes' `initializedStaticFields_TO` (`:4821-4845`, three registrations at `:2629`, `:4575`, `:4773`), and a top-level variable's singleton class, set when that class loads at its first use (`:6242-6275`). The new sites follow the first, in the component class. The library's own way does not apply: no library source is edited.

Ways the language and the code offer, and the one chosen (decisions below):
- the folded negative radix-point result: a negative numeral node, prefix minus built from the infix minus's reference, prefix minus reused from the component (chosen);
- the once-per-site call: in the class that holds the site, in a lazy holder class per site, in the component class (chosen);
- the raising coercion's test: an `XXX` name on a designed failure, a JUnit test compiling a program, a harness key (chosen).

## What the specification settles

The Working Draft folds static expressions of literals and operators (`Specification-1.0-frozen/basic/expressions/constant.tex`, "Static Expressions"; current `Specification/basic/expressions/constant.tex:39-93`), has a radix-point numeral denote its rational value, and converts a static rational expression to a float with at most one rounding (`literals.tex:182-193`). It concatenates two natural numerals of one radix into one (`constant.tex:81-88`). It does not say how a folded value is written in the tree, which P-173 (a signed constant with three defaults) and fork F1 settle, nor when a program's coercion runs, which P-174 settles ("once per class, when the class loads"). `CHOOSE` outside `0..n` is 0 for `ZZ32` (`Specification/basic-lib/basic-integers.tex`, "Integers"; `tests/ChooseZZ32Walk.fss`).

## Programs run old against new

`FoldWalkAnswers.fss` (scratch), under walk, `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base29 <tree>/tmp/old-caches FoldWalkAnswers.fss` and the tree's `bin/fortress FoldWalkAnswers.fss` with an empty private caches folder; each walk answer the fold changes:

    old: 2147483647 + 1 = IntegerOverflow          new: 2147483647 + 1 = 2147483648
    old: 2^40 = IntegerOverflow                    new: 2^40 = 1099511627776
    old: 65536 65536 = IntegerOverflow             new: 65536 65536 = 4294967296
    old: 65536 DOT 65536 = IntegerOverflow         new: 65536 DOT 65536 = 4294967296
    old: 65536 LCM 65537 = IntegerOverflow         new: 65536 LCM 65537 = 4295032832
    old: 0.1 + 0.2 = 0.30000000000000004           new: 0.1 + 0.2 = 0.3
    old: 0.1 - 0.3 = -0.19999999999999998          new: 0.1 - 0.3 = -0.2
    old: 10.0^(-5) = 1.0E-5                        new: 10.0^(-5) = 0.00001
    old: 0.3 = 0.1 + 0.2 is false                  new: 0.3 = 0.1 + 0.2 is true
    old: -2147483648 is a ZZ32: false              new: -2147483648 is a ZZ32: true

Unchanged: `0.1 / 3 = 0.03333333333333333`, `7/2 = 7/2`, `3 CHOOSE 5 = 0`. Also changed under walk: a typed binding of numerals alone, as `r: RR64 = 1.5 + 1.5`, is now a numeral at `RR64`, which walk keeps as a `FloatLiteral` (row 943), not a computed `RR64`; `deadc_16 || 0de_16` is `3735929054` where it had no `||`.

The planner's probes and row 862's numerals, compiled, old then new (`old-fortress.sh … compile|run`, then the tree's `bin/fortress compile|run`):

    == old FoldChoose
    Exception in thread "main" com.sun.fortress.exceptions.CompilerError: Integer Literal folding: Need to do something for factorial of negative values
    == new FoldChoose
    3 CHOOSE 5 =  0
    == old FoldWrap
    java.lang.Error: java.lang.Error: Not in range for ZZ32: 2147483648
    == new FoldWrap
    FortressException: class fortress.CompilerBuiltin$CompilerFailureDetectedAtRunTime with string Compiler failure detected at runtime

and `Row862.fss` above. `CoerceOnce.fss` (scratch), compiled on the base: `start`, `coerce  3`, `coerce  3`, `coerce  4`, `a SEQV b  false`.

## The whole suites

Both on `8e4ca7b070`'s code, once each (fork 2).

`ant testSystem` (log under the tree's `tmp/`, line numbers at the base): `Tests run: 197, Failures: 1`, `202, 2`, `199, 0`, `194, 1`, `BUILD FAILED`, `Total time: 5 minutes 36 seconds`; 792 tests, 791 at climb batch 28's gate plus `NumeralFoldWalk`. The four failures, each an operation on numerals alone that the test meant as fixed-width or computed arithmetic, now folded:
- `tests/NativeHelperFamilyDivisorsWalk.fss:77`, "FAIL: ZZ32 65536 LCM 65537 overflows";
- `tests/AnyNativesIntrinsicWalk.fss:19`, `r: RR64 = 1.5 + 1.5`: "FAIL: J12/0:FloatLiteral =/= J4/0:RR64; a computed RR64's ilk";
- `tests/StrictEquivalenceRuleWalk.fss:26`, `one: RR64 = 1.5 + 1.5`: "FAIL: a Boolean: true =/= a Boolean: false; a float numeral bound to RR64 and a computed RR64 of the same bits differ in type";
- `tests/sequivTest.fss:31` (the team's), `c : RR64 = 5.0 + 40.0`: "FAIL: 45.0 SEQV 45.0:" at `nequiv(b,c)` (`:58`).

`ant testQuick`: `Tests run: 86, Failures: 0` (library), `263, 0` (othercompiler), `1484, 1` (compiler; 1475 at climb batch 28's gate plus nine cases of this rung's files), `BUILD FAILED`, `Total time: 6 minutes 47 seconds`. The one failure: `compiler_tests/Compiled7.Print17.fss` (the team's), `println((23.0 - 6.0).asString)`: the fold makes `23.0 - 6.0` the numeral `17.0`, whose compiled `asString` is null (row 362), `java.lang.NullPointerException: Cannot invoke "fortress.CompilerBuiltin$Object.asString()" because "x" is null`.

The five were respelled with typed operands in `f58c027526`, and each passes on the old code and the new (`harness-one.sh` on both, `OK (4 tests)` each; `old-fortress.sh … junit …/Print17.test` and the final run above, `17.0`). Each line before and after:
- `tests/NativeHelperFamilyDivisorsWalk.fss`: `assert((46341 LCM 46340).asString, …)` → `assert((z46341 LCM 46340).asString, …)` and `assert(ovZ32(fn () => 65536 LCM 65537), …)` → `assert(ovZ32(fn () => z65536 LCM 65537), …)`, with `z46341: ZZ32 = 46341` and `z65536: ZZ32 = 65536` added after `z18: ZZ32 = 18`.
- `tests/AnyNativesIntrinsicWalk.fss:19`: `r: RR64 = 1.5 + 1.5` → `r: RR64 = asFloat(3)`.
- `tests/StrictEquivalenceRuleWalk.fss:26`: `one: RR64 = 1.5 + 1.5` → `one: RR64 = asFloat(3)`, in place, so that line 32, which rung N changes, keeps its number.
- `tests/sequivTest.fss:31`: `c : RR64 = 5.0 + 40.0` → `c : RR64 = asFloat(5) + 40.0`, in place, so that lines 58 and 94, which rung N changes, keep their numbers.
- `compiler_tests/Compiled7.Print17.fss:20`: `println((23.0 - 6.0).asString)` → `x: RR64 = 23.0` and `println((x - 6.0).asString)`.

`NativeHelperFamilyZZ32Walk.fss` and `ChooseZZ32Walk.fss` were respelled before the suites (`8e4ca7b070`):
- `NativeHelperFamilyZZ32Walk.fss`, after `m: ZZ32 = -1`: added `three: ZZ32 = 3`, `four: ZZ32 = 4`, `seven: ZZ32 = 7`, `n46340: ZZ32 = 46340`, `n65536: ZZ32 = 65536`. Before → after: `:17` `assert(3 = 3, true, "=")` → `assert(three = 3, …)`; `:18` `assert(3 = 4, …)` → `assert(three = 4, …)`; `:19` `assert(3 < 4, …)` → `assert(three < 4, …)`; `:20` `assert(4 < 3, …)` → `assert(four < 3, …)`; `:30` `assert(46340 DOT 46340, …)` → `assert(n46340 DOT 46340, …)`; `:31` `assert(overflows(fn () => 65536 DOT 65536), "DOT overflows")` → `assert(overflows(fn () => n65536 DOT 65536), "DOT overflows")`; `:32` `assert(7 TIMES 6, …)` → `assert(seven TIMES 6, …)`; `:33` `… 65536 TIMES 65536 …` → `… n65536 TIMES 65536 …`; `:34` `assert(7 6, …)` → `assert(seven 6, …)`; `:35` `… 65536 65536 …` → `… n65536 65536 …`; `:37` `assert(7 DIV 2, …)` → `assert(seven DIV 2, …)`; `:38` `assert((-7) DIV 2, …)` → `assert((-seven) DIV 2, …)`. Probe 2 saw only `:31` fail, the first assertion the fold breaks; `:33` and `:35` fail after it, and the others pass folded but would no longer reach the bindings they test.
- `ChooseZZ32Walk.fss`: added `chooseZZ32(n: ZZ32, k: ZZ32): ZZ32 = n CHOOSE k`; `:18-30` and `:34-36`, each `assert(A CHOOSE B, R, msg)` of two numerals → `assert(chooseZZ32(A, B), R, msg)` (as `assert(10 CHOOSE 3, 120, …)` → `assert(chooseZZ32(10, 3), 120, …)`, `assert((-5) CHOOSE 2, 0, …)` → `assert(chooseZZ32(-5, 2), 0, …)`); messages kept.

## The stages

Both on `f58c027526`, whose code is `8e4ca7b070`'s; no change of code followed either stage's start.

The count, `explorations/coordinator/tools/checker-count/run.sh tmp/rung-literal-fold/checker-count-postedit.txt tmp/rung-literal-fold/cc-post`, against `explorations/compile-ladder/climb-batch-28/gate/checker-count.txt`: `diff` prints nothing; the table's `#total 0`, `#locations 0`, `#crash none`.

The distance, `explorations/coordinator/tools/distance/run.sh tmp/rung-literal-fold/distance-postedit.txt tmp/rung-literal-fold/dist-post` (209 s, FortressLibrary 142 s), then `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-28/gate/distance.txt tmp/rung-literal-fold/distance-postedit.txt`: `DISTANCE SAME   0`. The run's `errors.tsv` holds no site, as `explorations/compile-ladder/gate/distance-sites.tsv` holds none: no site moved.

No checker Scala is edited, so P-148's timing does not apply.

## The ladder subset

The code generator's change reaches every compiled program, so the subset is the baseline's whole pass list, 85 programs, and the eighteen microGPT components (`gate.md`, "The ladder regression", the drivers copied under `tmp/rung-literal-fold/ladder/`). `ladder_compare explorations/compile-ladder/baseline-2026-09-19 <D>` prints nothing; `diff <(mg_phases …/baseline-2026-09-19/microgpt-phase.md) <(mg_phases <D>/microgpt-phase.md)` prints nothing; the phases of `<D>/ladder.tsv` equal those of the newest landed `explorations/compile-ladder/climb-batch-28/gate/ladder/ladder.tsv`.

## The demos

DEMOS_PLACEHOLDER

## Sentences made false

- F-262: "the compiled path folds `prefix -` on a numeral into a numeral of that type before the checker, and does not fold `^` (`IntegerLiteralFoldingVisitor.java:58-107`, `:152-153`). Walk's numeral is an `Int` (F-74)." Both paths now fold, `^` by an integer exponent folds, and walk evaluates a negative numeral node (`-2147483648` a `ZZ32`). Its title still holds: `10^(-16)` is left as written, an integer base at a negative exponent.
- F-118: "The code generator carries a numeral as an `int`, a `long` or its decimal string, by its exact bit length." A numeral that the coercion desugarer types at a library number type is now that type's constant (`FZZ32.make(int)`, …, `FRR64.make(double)` rounded once); a numeral of its own type is still carried so.
- `Specification/basic/expressions/constant.tex:81-82`: "The only operation on literals that produces a new literal (as opposed to a constant) is concatenation". The fold writes the result of any folded operation as a numeral (fork F1), which a program's coercion receives as a written numeral; the two concatenations it states hold.
- `Specification/basic/expressions/constant.tex:49-58`, the type of a constant expression encoding its value (`IntegerConstant[\false, 3+5\]`): false before this change on both paths and after it; no constant trait is built.
- `Specification/basic/expressions/literals.tex:187-190`, "the compiler performs the rational arithmetic exactly and then converts the result to a floating-point value, thus incurring at most one floating-point rounding error": made true for an expression of numerals alone on both paths, but for NEW-F-2's cases, where it stays false; the team's note beside it (`:193-196`) is unchanged.
- No Appendix I Effect names the fold, its operators or the code generator's float constant (`grep -n -i 'fold\|rounding' Specification/appendices/changes.tex`: only `:4110`, the sizes entry, whose folding of numerals in a size is the checker's, and `:3946-3987`, the rounding of an infinite rational).

## Points to report

- The operators folded and those left alone, with reasons, and the forms with examples: "The fold", above.
- The phase order before and after, and each walk answer the fold changes: "The phase order" and "Programs run old against new", above.
- The two repaired defects with their tests and rows: row 954, `3 CHOOSE 5` (`LiteralFoldCompiled`, `NumeralFoldJUTest.testChooseOutsideItsRangeIsZero`, `NumeralFoldWalk`, `ChooseZZ32Walk`); row 955, the wrapping and saturating operators (`NumeralFoldJUTest.testWrappingAndSaturatingOperatorsAreLeft`). A third, without a row: `n DIV 0` of numerals folded into `CompilerBuiltin.Infinity` (`NumeralFoldJUTest.testDivisionByZeroIsLeft`; its run-time answer is NEW-F-1).
- The typed-place constants, the rounding as written and row 862's numerals before and after: "The typed-place constants", above.
- The once-per-class call as compiled: "A program's coercion once per site", above; the class is the component's (a deviation).
- `NativeHelperFamilyZZ32Walk.fss:31` and `ChooseZZ32Walk.fss`, each line before and after: "The whole suites", above, with `:17-20`, `:30`, `:32-35`, `:37-38` beside `:31`.
- The count and distance tables on the final tree: 0 and 0, the same tables as climb batch 28's gate, no site.
- Each test whose verdict changes in the suites: the four walk tests and `Compiled7.Print17`, red on `8e4ca7b070` and green after the respelling; `XXXFloatNumeralOneRounding` promoted; new: `NumeralFoldWalk`, `LiteralFoldCompiled`, `NumeralCoercionOnceCompiled`, `NumeralCoercionRaisesCompiled`, `NumeralDivByZeroCompiledLink`, `XXXNumeralDivByZeroCompiled`, `XXXNumeralFoldNoPrefixMinusWalk`, `NumeralFoldJUTest`.
- Every sentence made false: above.
- Files edited beyond those named: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java` (the harness key, `:595-605`); the team's `compiler_tests/Compiled7.Print17.fss:20` and `tests/sequivTest.fss:31`; the revival's `tests/NativeHelperFamilyDivisorsWalk.fss`, `AnyNativesIntrinsicWalk.fss`, `StrictEquivalenceRuleWalk.fss`. No edit of the checker's Scala under `typechecker/`, of the library or of the prelude.

## Decisions

1. **A juxtaposition of numerals alone folds as their product.** Ways not taken: leave `Juxt` nodes, as the base and the prototype did (neither met one: a juxtaposition is a `Juxt` node, not an `OpExpr`, before the checker, `bin/fortress grammar -out` on `d = 3 4`). Evidence: the library's juxtaposition of two numbers is multiplication (`Library/FortressLibrary.fsi:603-605`), and P-173 folds an expression of numerals alone, so `65536 65536` beside `65536 DOT 65536` would otherwise overflow where the other folds. A `Juxt` marked as a function application is left.
2. **The comparisons, `MIN` and `MAX` fold over radix-point and quotient operands too, exactly.** Ways not taken: integers only (the prototype, `literal-default.md`, step 3). Evidence: the brief's list ("`MIN`, `MAX` and the comparisons"); P-173's "folds exactly". Its consequence: `0.1 = 0.1000000000000000000001` folds to `false`, where the two numerals' `RR64` defaults are the same double (a question for the curator).
3. **A form that needs a prefix minus or a `/` reuses one that the component writes, and the expression is left where none is written.** Ways not taken: a negative radix-point numeral node (against fork F1's prefix minus and the judgement's repair 3, a numeral nobody wrote); a prefix-minus reference made from the infix minus's by changing fixities, as `ExprFactory.makeInfixOpExpr` does for juxtaposition (its `newOverloadings` would name the binary declarations, shown by the dump above); a reference resolved afresh (the fold phase has no disambiguating environment, `IntegerLiteralfolder.foldComponents` takes the components only). NEW-F-2 records the gap.
4. **Limits on what folds:** `p.0 / d` only where `p` and `d` are exact doubles, so that its `RR64` is one rounding; a power only where its exponent times its base's bits is at most 65536 (the prototype's guard); `CHOOSE` only where `min(k, n - k)` is at most 4096 and `n` has at most 64 bits. Ways not taken: unbounded folds, which could make megabit constants at compile time.
5. **The base's folds of `AND`, `OR`, `XOR`, prefix `NOT`, prefix `BOXMINUS` and `DOTMINUS`, and of `n DIV 0` into `Infinity`, are dropped** (fork F2: bitwise operators, widths, a division by zero stay as written). Way not taken: keep them. Consequence on the compiled path until the switch-over: NEW-F-1.
6. **A chain of comparisons folds only where every operand is a numeral and every operator a comparison.** Way not taken: the base's partial fold, which also threw `CompilerError` "One of the link in a chained expression produced something other than a boolean literal during folding" at a non-comparison link (`IntegerLiteralFoldingVisitor.java:131` at b430f9f428).
7. **A program's numeral sites live in the component class and are set by its static initializer.** Ways not taken: in the class that holds each site (the component's static initializer was emitted before its declarations, closures and template instantiations have no static initializer of the code generator's, and a generic object's instantiation would call the coercion once per instantiation, more than one object per site); a lazy holder class per site, the code generator's way for a top-level variable (`CodeGen.java:6242-6275`), which calls the coercion at the site's first evaluation, not when a class loads. Evidence: P-174's "once per class, when the class loads, one object per site".
8. **The libraries' components and the coercions into the libraries' types are not hoisted.** Evidence: fork F8 keeps the call of an out-of-range numeral's library coercion, which raises at the site; a library type's coercion receiving a numeral `foldsTo` leaves is that case.
9. **The harness key `run_exits_nonzero`.** Ways not taken: an `XXX` name on a designed failure (the `XXX` prefix marks a defect); a JUnit test that compiles and loads a program. Precedent: walk's `load_exception_contains` key for a refusal at load (`tests-writing.md`).
10. **Typed operands by typed locals in the revival's tests, in place in the team's `sequivTest.fss` and in `StrictEquivalenceRuleWalk.fss`**, where an added line would move lines rung N edits; `Compiled7.Print17.fss` takes one added line. Way not taken: leave the tests to fail on this tree and pass on the merged tree (the brief: each rung's tests pass on its own tree).
11. **`ChooseZZ32Walk` calls a typed helper, `chooseZZ32(n, k)`.** Way not taken: sixteen typed locals.
12. **`NumeralFoldWalk` asserts `ZZ64`, `ZZ32` and `QQ` by `typecase`**, the defaults P-173 fixes for the values folded, and no static argument or message (the batch's rules 1 and 2).
13. **The demos run once after the last change of code**, as `tests-running.md` asks for a phase both paths run; the brief leaves the 52 to the gather on the merged tree, and this run is this tree's.
14. **No ledger row is written for row 362's new case** (a folded float expression at a compiled receiver, `Compiled7.Print17`): the row is at 1,193 of its 1,200 characters, and rung C rewrites it (fork C7); record.md hands the fact to the gather.

## Defects and their homes

- Row 954, the fold's `CHOOSE` crash: home 1, repaired, `LiteralFoldCompiled` and `NumeralFoldJUTest`.
- Row 955, the wrapping and saturating operators folded as `+` and `-`: home 1, `NumeralFoldJUTest`.
- Row 862, two or three roundings: home 1, `FloatNumeralOneRounding` (promoted).
- `n DIV 0` of numerals folded into `CompilerBuiltin.Infinity` on the compiled path (measured: the old run's "Right-hand side has type OR(IntLiteral,Infinity)"): home 1, `NumeralFoldJUTest.testDivisionByZeroIsLeft`.
- A program's coercion from a numeral called at each evaluation, one site giving distinct objects (`CoerceOnce.fss` on the base): home 1, `NumeralCoercionOnceCompiled`.
- NEW-F-1, an operation the fold leaves on two numerals raising `CompilerFailureDetectedAtRunTime` on the compiled path: home 2, `XXXNumeralDivByZeroCompiled`; the specification's answer is `DivisionByZero`; until the switch-over, since no rung edits the prelude.
- NEW-F-2, an expression of numerals alone left unfolded where the component writes no prefix minus (or `/`): home 2, `XXXNumeralFoldNoPrefixMinusWalk`; the Working Draft settles the exact fold.
- Row 362 meets more programs: a float expression folded into a numeral at a compiled receiver; home: row 362's own `XXXNumeralPrintRungR`, which rung C's default turns red on the merged tree (fork C7).

## For FACTS

See `record.md`.

## Commands worked out

- `bin/fortress grammar -out FILE P.fss`: the tree after the grammar phase, just before the fold, with each operator reference's overloadings (`Shell.compilerPhases`, `-out`).
- `java -cp "<dir>:$(FORTRESS_HOME=<base-build> <base-build>/bin/fortress_classpath | tail -1)" junit.textui.TestRunner <class>`: a unit test compiled into a scratch folder run on the base build's classes, the old code of a `*JUTest`.

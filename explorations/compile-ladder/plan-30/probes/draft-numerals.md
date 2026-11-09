<!-- The static numerals built for real, a prototype on both paths with its measurements, by an Opus worker for the curator's design of numerals, 2026-11-09, on the base dd00743d9e (base build /home/user/fortress-base30): the one library's numeral types as static-parameter traits, every number type's coercion generic over the four numbers, the checker, the code generator, the runtime, the prelude without IntLiteral and FloatLiteral, and walk; count and distance stay 0 and 0; the code is not committed, its patch is draft-numerals.patch beside this report. -->

# The static numerals, built: a prototype on both paths

The design is the curator's, the static numerals: section 3 of `explorations/coordinator/postmortem-2026-11-09-numerals/design-snapshot.md`, with sections 4 and 11. Batch 29 built another design, the field numerals: run-time value objects with the four numbers as fields and getters (`explorations/reviews/numeral-fidelity-2026-11-09.md`, section 2). This probe builds the static numerals in a worktree, on both paths, and measures what they cost. Nothing here weighs one design against the other.

- Base: `dd00743d9e`, `main`'s head when the probe started. Base build: `/home/user/fortress-base30`, built in place by `references/worktrees.md`. Worktree: `/home/user/fortress-proto-draft`, detached, seeded from it ("seeded from /home/user/fortress-base30 (dd00743d9e) in 3 s"). The worktree is removed at the end; its whole change is `draft-numerals.patch`, `git diff dd00743d9e` with the new files added by `git add -N`.
- Machine: `nproc` 4, Intel Xeon @ 2.10 GHz, 2100 MHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`; load at the first count 0.35, 0.57, 0.27 (`uptime`).
- Disk before the base build: `df -P /home/user` printed 20617500 1K-blocks available; after seeding, 20031136. A built tree is about 1.5 GB (`du -sh --exclude=.git /home/user/fortress`), so both trees left more than 14 G.
- Citations of the tree are at `dd00743d9e` unless they name the patch; the patch's code is cited by file and method, since the worktree is gone.

## 1. Where the snapshot and the record differ

The probe followed the snapshot in each case.

- P-173 says a place fixes a type when its declared type "is a numeral type". The snapshot's point 1 and section 4 give a numeral type no value at run time, and P-174 says a numeral type is written only as a coercion's or an operator's parameter type. Built: a binding at a numeral type is refused on both paths (`tests/NumeralTypeNoValueWalk.fss`, `compiler_tests/LiteralTypeUnwritable.fss`).
- A static expression at a program's own type: the snapshot's section 11 says in one bullet "only through a coercion from `ZZ32` or `QQ`" and in its last bullet "through a coercion from `QQ` or `ZZ`"; P-174 says "through its coercion from the folded value's type, such as `QQ` for `1/2`". Built: through the coercion from the folded value's default type, `ZZ32`, `ZZ64` or `ZZ` by its value, `QQ` for a quotient, `RR64` with a radix point.
- Row 486, which the brief and the snapshot's section 11 name as standing in walk's way, is `FIXED` (`53a6074ed`) and is about the compiled checker. Walk reads a `nat` used as a value already, as a `ZZ32`, or a `ZZ64` from 2^31 (F-140). What stood in walk's way was elsewhere (section 6).
- The snapshot's section 2 quotes the Draft's `NaturalNumeral[\n,10,v\]` with three static parameters and `RadixPointNumeral[\n,m,10,v\]` with four; P-174 gives the four numbers to both. Built: the Draft's arities, `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]`; a coercion from a natural numeral reads `m` as 0 by not having it.

## 2. Step 1: the base build

- Commands, from `references/worktrees.md`: `git worktree add --detach /home/user/fortress-base30 dd00743d9e`, then in it `ant compileAll`, the library order and `bin/fortress ProjectFortress/tests/BooleanOps.fss`, in the background with a log. Output: "BUILD SUCCESSFUL / Total time: 47 seconds / EXIT=0", and the five jars `fortress.AnyType.jar`, `fortress.CompilerBuiltin.jar`, `fortress.CompilerLibrary.jar`, `fortress.CompilerAlgebra.jar`, `CompilerSystem.jar`; `git status --porcelain` printed nothing.
- `explorations/coordinator/tools/seed-worktree.sh /home/user/fortress-base30 /home/user/fortress-proto-draft - dd00743d9e`.
- The base's checker, timed by `references/compiler.md`, "The checker's time": `time explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`, run from the base build: "#total 0 / #locations 0 / #crash none", "real 1m44.733s".
- The base's distance stage, `explorations/coordinator/tools/distance/run.sh <out> <scratch>`, from the base build: "#total 0 / #crash none / #seconds 161 FortressLibrary 102".

## 3. Step 2: the one library

What was built (`Library/FortressLibrary.fsi`, `.fss`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `.fss`):

- The field numerals' two value objects, with their four getters, `asString`, `asFloat` and the 22 `=` pairs, are gone, with the two private helpers only `asString` used (`numeralDigits`, `numeralSuffix`). The `^` overloads on a numeral exponent (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`) are gone too: a numeral exponent converts at `^`'s other declarations.
- In their place, five traits with no members:

      trait Numeral extends Number end
      trait AnyNaturalNumeral extends Numeral excludes { AnyRadixPointNumeral } end
      trait AnyRadixPointNumeral extends Numeral end
      trait NaturalNumeral[\nat n, nat r, nat v\] extends AnyNaturalNumeral end
      trait RadixPointNumeral[\nat n, nat m, nat r, nat v\] extends AnyRadixPointNumeral end

  The two `Any` traits exist only so that a type's coercion from each numeral type overloads with the other: two instantiations of different generic traits do not exclude each other otherwise. The library's own way for this is `AnyIntegral` above `Integral[\I\]`.
- Each of the eight number types takes a numeral by a coercion generic over the four numbers, whose body computes the value from them, as `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = v.asZZ32` at `ZZ32`, `= Ratio(v, 1)` and `coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\]) = v / r^(m.asZZ32)` at `QQ`, and `= numeralRR64(v, r.asZZ32, m.asZZ32)` at `RR64`, the library's one-rounding helper. `AnyIntegral`'s coercion chooses `ZZ32`, `ZZ64` or `ZZ` from `v`.
- Lines: `git diff dd00743d9e --shortstat` over the four files: "4 files changed, 42 insertions(+), 145 deletions(-)".

Measured after this step, with the base's checker:

- Count stage: no total. "checker-count: the run printed no error total (rc=1)"; its output, `ClassCastException: class scala.runtime.BoxedUnit cannot be cast to class com.sun.fortress.nodes.IntExpr`, from `STypesUtil$outFinder` (`scala_src/useful/STypesUtil.scala:2151-2159`): the base checker types a numeral by the plain `NaturalNumeral`, cannot infer a generic coercion's sizes from it, leaves a size inference variable in the checked library, and the post-check walker returns `Unit` at an `IntExpr` position instead of reporting it. Row 291 holds the same crash from another trigger; its notes have 29 characters left, so this trigger is here only.
- Distance stage: "#total 8", one or two in each of six components, and six crash rows, each that `ClassCastException`.

## 4. Step 3: the checker

What was built:

- A numeral's type carries its four numbers as static arguments, `v` at any size: `3.125` is `RadixPointNumeral[\4,3,10,3125\]`, `3000000000` is `NaturalNumeral[\10,10,3000000000\]` (`impls/Misc.scala`, the literal cases; `compiler/Types.java`, `numeralType`). The four numbers come from one new helper that both paths and the code generator use, `nodes_util/NumeralNumbers.java`, a port of batch 29's reading in `Numerals.java`. The analyzer compares sizes by their `BigInteger` values already (`scala_src/typechecker/Formula.scala:120-131`), so `v` beyond 32 bits needed no change there. The kind check refused it: "Ill-formed static argument: 9223372036854775807", eight errors in five places; a numeral type's arguments and a numeral coercion's static arguments are now exempt (`TypeWellFormedChecker.scala`).
- Inference of a generic coercion's static arguments from the numeral's type is the checker's own static-argument inference (`CoercionOracle.checkCoercionTrait`, `inferStaticParams`); it worked unchanged. `getCoercionTargetsFrom`, which skipped every generic coercion, now admits one generic over a numeral's four numbers (`CoercionOracle.scala`), so a numeral still promotes a generic call (P-74).
- The range refusal as a static error: a coercion's `where` clause of size comparisons, as `where { v < 256 }`, is computed exactly at the inferred four numbers; a coercion whose clause fails is not a candidate, and the refusal reads "The numeral 300 does not meet the where clause of the coercion to Byte." (`CoercionOracle.whereHolds`, `numeralRefusal`). Only comparisons of sizes are read; any other constraint is left to the checks that read it. At the eight library types the range refusal is batch 29's, by the value (`NumeralConversion.outOfRange`), not by a `where` clause (section 12, decision 6).
- Inside a coercion over a numeral type, the four numbers read as values are `ZZ`, exact integers; elsewhere a `nat` read as a value stays a `ZZ32` (P-173): `KindEnv.getType` and `markExact`, set from the declaration's parameter type in `impls/Decls.scala`.
- A numeral has no sign. The fold (`compiler/desugarer/IntegerLiteralFoldingVisitor.java`) now marks its results by their text: prefix minus on a numeral as written keeps the written text after `-`, any other folded constant is written in parentheses, `(5)`. A radix-point numeral under a minus is folded the same way, its node holding the magnitude so that `-0.0` keeps its sign where it converts. At a library type the signed value converts directly, as before, so `-2147483648` at `ZZ32` folds exactly first. At a program's own type a negative constant is the type's own prefix minus on the coercion of the numeral as written: the checker checks that minus on a stand-in of the type and puts the coercion in its place (`STypeChecker.scala`, `coercions.negator`), with the component's own disambiguated prefix minus, which the fold now records per component (`prefixMinusOf`). A type without a prefix minus refuses it: "The numeral -3 at Plain needs a prefix minus on Plain, which it does not declare." Any other folded constant reaches a program's type only through its default's type (`CoercionOracle.buildCoercion`; `defaultFits` does the rest).
- P-173's default where nothing fixes a type is kept as it is. Two places changed because two numerals now have two types: an `if`, `case`, `try` or block whose results are numerals, alone or beside values that already fit, converts each numeral branch at the expected type in place (`numeralJoinInto`, `joinInto`, the `if`'s winning-clause path in `impls/Misc.scala`), and a tuple of numerals converts element by element in place (`buildCoercion`). Before, the checker coerced such a join or tuple as a whole, which ran a numeral's coercion at run time on an `IntLiteral` value; the static numerals have no value to run it on.
- Lines: `scala_src` and `compiler/Types.java`, "8 files changed, 316 insertions(+), 32 deletions(-)"; the fold and `NumeralNumbers.java`, "2 files changed, 161 insertions(+), 6 deletions(-)".

Measured (count and distance stages over the one library, timed by `references/compiler.md`): the first run after the change, "#total 9 / #locations 5" (1m10.783s), the eight kind errors and one tuple join; then "#total 0 / #locations 0 / #crash none", "real 1m43.093s". The final runs are in section 8.

## 5. Step 4: the code generator, the runtime and the prelude

What was built:

- At a built-in target, batch 29's fold to a JVM constant is kept: the coercion desugarer retypes the numeral at the library type and the code generator emits the constant (`CoercionDesugarer.foldsTo`; `CodeGen.forIntLiteralExpr`, `forFloatLiteralExpr`). The checker now finds that coercion through the library's generic coercion, so the type check of the conversion is the common mechanism; the fold itself is recognised by the target type, not by evaluating the coercion's body (decision 3). A negated radix-point numeral is negated after its one rounding, so `-0.0` is IEEE's negative zero.
- At a program's own type, the coercion generic over the four numbers is inlined at its site: the code generator takes the lifted coercion's body from the component, replaces each of the four numbers read as a value by its constant, a `ZZ`, and each static parameter of the coercion's type by the site's static argument, and compiles the body in the component class's static initializer into a `static final` field that the site reads (`CodeGen.inlinedNumeralCoercion`, `numeralCoercionDecl`, `emitNumeralCoercionSites`). No class is made per numeral, and the class loader stamps nothing for `v`, so `RTTIsize.of`'s `int` does not stand in the way of a 20-digit `v`. Why inlining and not one method that takes the four numbers as values: the body is already typed with the four numbers as `ZZ` values, so substituting constants needs no new method, signature or call; and a coercion of a generic type, `Gen[\T\]`, takes its type argument by the same substitution (`StaticTypeReplacer`, keeping the callee references' own generic schemas). Its limit: the coercion must be declared in the same component (section 10).
- A site at a program's generic type is now hoisted too, where its type names no type variable: `site(): Gen[\RR64\] = 3` gives one object per place (row 957's case; `numeralCoercionSiteDesc`).
- `-3` at a program's type compiles as the type's `-` on the hoisted coercion; the minus itself runs at each evaluation (section 10).
- The prelude (P-37's exception for the numerals, his words at 17:1x UTC on 11-09): the same five traits, `Numeral extends Number` with an `excludes` list of the prelude's number types, since they have no `comprises` clauses; the coercions of `ZZ`, `ZZ64`, `ZZ32`, `NN32`, `NN64`, `RR64` and `RR32` in the generic form, their bodies through the prelude's own helpers (`bigOverflowingToLong`, `numeralToDouble`, `numeralToFloat`). `IntLiteral` and `FloatLiteral` are gone, with the `simpleIntLiteralArith` import. The prelude's own code wrote getters on numerals, `(1).asZZ` and `(1).asNN32` (`LibraryBuiltin/CompilerBuiltin.fss:561-570`, `:814`, `:816`, `:750`, `:752`); they are respelled with the prelude's helpers or a typed binding.
- The runtime: a size read as a value no longer goes through an `IntLiteral`. The class loader stamps it as a `ZZ32`, `FZZ32.make`, or for a size beyond `ZZ32` `FZZ32.makeSize`, which raises the error of row 962 as before (`runtimeSystem/MethodInstantiater.java`, `natMethod`; `compiler/runtimeValues/FZZ32.java`), and the code generator reads it without `asZZ32` (`CodeGen.forVarRef`). A numeral that no place typed compiles as its default constant, not as an `IntLiteral` (`forIntLiteralExpr`). `nativeHelpers/equalityRule.java` loses its two literal branches.
- Lines: code generator "1 file changed, 118 insertions(+), 40 deletions(-)"; runtime "3 files changed, 16 insertions(+), 22 deletions(-)"; prelude "2 files changed, 51 insertions(+), 130 deletions(-)".

What stood in the way, and how it was passed:

- The prelude's overloading check refused each type's two coercions, `[\nat n, nat r, nat v\]NaturalNumeral[\n,r,v\]->ZZ` beside `ZZ32->ZZ` ("Invalid overloading of coerce_ZZ in API CompilerBuiltin"): its number traits do not exclude a trait. The `excludes` list settled it.
- Every compiled program died at the prelude's own static initializer, `NoClassDefFoundError: CompilerBuiltin` (`fortress run hello`): a component with a generic overloaded top-level function stores its inference cache tables into a class named without its package (`CodeGen.java:1979`). The prelude's coercions are the first such functions in a library component. Fixed in the patch; filed as row 972.
- A coercion body that spawns, as `digitsOf(...) || hexDigit(...)`, fails the class's load: the static initializer runs on the main thread before the task pool (`MainWrapper.java:61-63`), `ClassCastException: Thread cannot be cast to FortressTaskRunner`. Batch 29's hoisted sites fail the same way on the base (probe below). Not fixed; the test binds its operands first; filed as row 971.
- A numeral in a join or a tuple was coerced as a whole at run time (section 4); fixed in the checker.

The probe for row 971, on the base's code: a program `object Cell(s: String)` with `coerce(x: IntLiteral) = Cell(part(1) || part(2))` and `made(): Cell = 3`, compiled and run with `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base30 <tmp>/old-caches compile|run`:

    Exception in thread "main" java.lang.ExceptionInInitializerError
    Caused by: java.lang.ClassCastException: class java.lang.Thread cannot be cast to class com.sun.fortress.runtimeSystem.FortressTaskRunner

## 6. Step 5: walk

What was built (`interpreter/evaluator/values/Numerals.java`, `Coercions.java`):

- A numeral still evaluates to its default, carrying its site and four numbers (batch 29's `Site`, read now through `NumeralNumbers`). At a place that fixes a type, walk finds that type's coercion generic over the numeral's kind of numeral type, checks its `where` clause at the four numbers, and runs its body once for the site and the type, with the four numbers bound as `ZZ` values and the coercion type's own static parameters bound to the target's; the parameter is bound to `()`, since no numeral value exists (`Numerals.numeralCoercion`, `convert`; `Coercions.numeralCoercions`). The eight library types go through their own generic coercions in the same way; at one of them a negative integer constant hands the coercion its folded signed value as `v`, so `-2147483648` converts exactly.
- A negative constant at a program's type, and any negated radix-point numeral, is the type's own `prefix -` on the coercion's result, applied once for the place; a type without one refuses it, 'Type mismatch binding -3'. A folded static expression reaches a program's type through its default's type, as on the compiled path. `Numerals.object` and the numeral run-time type are gone (`numeralType` answers null), so no numeral object exists.
- Row 486 did not stand in the way (section 1). What did: walk's `IntNat` holds a `long` (`interpreter/evaluator/types/IntNat.java`), and walk refuses a size above `NN32` when it binds one (`EvalType.java:252-262`), so a 20-digit `v` cannot be a walk size. Walk's way around it: the four numbers are never sizes; they are bound as values in the coercion's environment, which is what the coercion's body reads. A second obstacle: an environment extended before it is blessed is refused, 'Internal error, attempt to copy environment still under construction' (`env/BetterEnv.java:110-114`); the two environments are blessed after their bindings. A third: walk keys a prefix operator as `prefix -` (`OprUtil.fixityDecorator`).
- Walk converts a numeral when dispatch asks whether a declaration admits it, so a coercion that raises raises there; the range check reads the signed value, so `NN64`'s coercion is never asked about `-3`.
- Lines: "2 files changed, 218 insertions(+), 58 deletions(-)".

## 7. Step 6: the tests

Each was written first and seen failing through the harness on the base's code, before any edit of the library or the code; then passing on the last code state. The commands: `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tmp> <files>` for walk, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests <files>` for the compiled tests.

The failing runs on the base (`dd00743d9e`):

    walk, 7 files: Tests run: 7,  Failures: 7,  Errors: 0
      tests/NumeralOwnTypeWalk.fss:10:45-73:
        Incorrect number of static arguments for type 'FortressLibrary.RadixPointNumeral': provided 4, expected 0
    compiled, 14 files: Tests run: 18,  Failures: 17,  Errors: 0

The passing runs come from the gate's suites on the final code (section 8), and before them from these runs: walk "OK (2 tests)" for `NumeralStaticDesignWalk` and the new `XXX`, after "Tests run: 7, Failures: 1" when only `u = 0` still failed; compiled "OK (21 tests)" for the new and rewritten compiled tests, then "Tests run: 45, Failures: 4" and, after the respelling and promotion below, the suite.

Walk tests (`ProjectFortress/tests/`):

- `NumeralOwnTypeWalk.fss`, rewritten from the field numerals' form to coercions over `n, m, r, v`: `CC64` from `3 + 4 i` and `3.78 + 3.243 i`, with `i` a constant of the type; the interval `Iv` at `0.1`, `0.5` and the Draft's `3.1415926535897932384`, which it encloses one ulp wide; `BF16` at `1.00390625000000000001`, one rounding from the exact value to `0x3F81`, where rounding through a double first gives `0x3F80`, and at the midpoint `1.00390625`; `Dec(unscaled: ZZ, scale: ZZ32)` receiving `3.14159` as 314159 and 5; the round trip `Written`, `C.8_16` printed back from the four constants by the type's own code; the radix cases as `Parts`, "3 2 16 256" for `1.00_16`; one object per place for a reference type. The type's helper for one rounding is the library's native `simpleDoubleArith.numeralToDouble`, which the test binds itself.
- `NumeralStaticDesignWalk.fss`, new: `t: Tally = -3` through `Tally`'s own minus, its coercion seeing `3`; `c: CC64 = -3 - 4 i` through `CC64`'s unary and binary minus; `-3.5` at `CC64`; `-2147483648` at `ZZ32`; `r: RR64 = -0.0`, IEEE's negative zero, `1/r` negative and infinite; `site(): Gen[\RR64\] = 3`, one object per place, two places two objects; `h: Half = 10/20` through `Half`'s coercion from `QQ`; `0.1_2 SEQV 0.5`; `NOT (0.1 = 0.1_16)`; `q: QQ = 0.1` exactly 1/10; `f: RR64 = 0.1` rounded once, raw bits 4591870180066957722; `y: Byte = 255` under `where { v < 256 }`; `x = 3` a `ZZ32`; `Cell(3)` a `Cell[\ZZ32\]`; `typeOf(3)` "ZZ32" and `typeOf(0.5)` "RR64", no numeral type.
- Refusals, each with a `.test` key: `NumeralWhereRefusedWalk` ('Type mismatch binding 300'), `NumeralNegativeNoMinusRefusedWalk` (`-3` at a type without a minus), `NumeralStaticExprRefusedWalk` (`10/20` at a type without a coercion from `QQ`), `NumeralTypeNoValueWalk` (a variable of a numeral type). Under walk they refuse when the place runs, as P-176 says until walk runs the checker (P-12).
- `XXXNumeralEqualsNumberWalk.fss`, new, the design's answer to `u = 0` and its kin under walk (section 13, question 1). Seen working both ways: as it is, "OK Saw expected exception"; with `u = 0` changed to `u = u` for one run, "FAILURES!!! Tests run: 1, Failures: 1".
- `NumeralGenericOwnTypeWalk.fss` and `NumeralAtReturnWalk.fss`, rewritten to the generic form.
- `NumberMixedEqualityWalk.fss` lines 70, 71, 110 and 111 (`w0 = 0`, `0 = w0` for an `NN64`, `u0 = 0`, `0 = u0` for an `NN32`), and `NumeralTypesWalk.fss` lines 78, 80, 82 and 84 (`u0 = 0`, `v0 = 0`, `f0 = 0`, `0 = u0`), are moved into `XXXNumeralEqualsNumberWalk.fss`, which asserts each of them. All are revival tests of batch 29.
- microGPT's quick checks are unchanged under walk (section 8).

Compiled tests (`ProjectFortress/compiler_tests/`, `library_tests/`):

- `NumeralStaticDesignCompiled.fss`, new, the same cases where the prelude can express them: `CC64` from `3 + 4 i`, `3.78 + 3.243 i`, `-3 - 4 i` and `-3.5`; `Dec` from `3.14159`; `BF16` both cases, by `ZZ` arithmetic; `Written` printing `C.8_16`; `Tally` at `-3`; `-2147483648`; `-0.0`; `Gen[\RR64\]` one object per place; the byte type at 255; `0.1_2 SEQV 0.5`; `0.1 = 0.1_16` false; `u = 0` for `u: NN32`; `x = 3` a `ZZ32`; `Cell(3)`. The interval and the `QQ` cases are not compiled: the prelude has no `QQ`, `rawBits` or `nextUp` until the switch-over.
- Refusals at compile time: `XXXNumeralWhereRefusedCompiled.test` ("The numeral 300 does not meet the where clause of the coercion to Byte."), `XXXNumeralNegativeNoMinusCompiled.test`, `XXXNumeralStaticExprRefusedCompiled.test` (`2 + 3` at a type without a coercion from `ZZ32`); `z: ZZ32 = 3000000000` keeps batch 29's `XXXNumeralBeyondZZ32Range.test`; a numeral type as a variable's type keeps `XXXLiteralTypeUnwritable.test`, respelled. A refusal test's `.test` name carries `XXX`, as the tree's own do.
- Rewritten from `coerce(x: IntLiteral)` to the generic form, their values kept: `LiteralDefaultCompiled`, `LiteralTypeUnwritable`, `NumeralCoercionOnceCompiled`, `NumeralCoercionRaisesCompiled`. In compiled tests a four-number value reads through the prelude's own helper, `bigToZZ64(v).asZZ32`, since the prelude's `ZZ` has no `asZZ32` and its `signed` does not apply to `ZZ`.
- Promoted, since the change repairs their defects (rows 957, 961, 362 and 318): `XXXNumeralCoercionGenericTypeCompiled`, `XXXNegativeNumeralOwnType`, `XXXFloatLiteralValuePrint` (now the round trip `2.5` from the four numbers) and `XXXNumeralDivByZeroCompiled` lose their prefix, each as a pair of `NameLink.test` and `Name.test` with `run_out_contains=PASS`.
- `src/com/sun/fortress/compiler/desugarer/NumeralFoldJUTest.java`, the fold's unit test (batch 29, `955cad76df`), pins the fold's output text; nine of its assertions follow the fold's new marking: a computed numeral is written in parentheses, `(0.3)` for `0.1 + 0.2`, except a quotient's integer operand, and `-(0.0)` folds into the numeral `-0.0` as written instead of staying an operation. It failed in the gate's `misc` track ("Tests run: 9, Failures: 3") and passes after (`ant testOnly -DtestPattern=NumeralFoldJUTest`: "Tests run: 9, Failures: 0").
- `library_tests/IntLiteralRung6` and `IntLiteralArithRung7` are deleted: revival ladder tests (`54861b62ad`, `2027f519b9`) of the prelude's run-time `IntLiteral` comparisons and arithmetic, a type the design removes.
- Fifteen tests pin checker messages that named `IntLiteral`; the messages now name the numeral's type, or lose the prelude's `IntLiteral` `+` from a list of candidates, and two now differ in more than the name. Respelled, each keeping what it checks: team tests `XXX3u`, `XXX5an`, `XXX5be`, `XXX6at`, `XXX6bi`, `XXX9ad`, `XXX9af`, `XXX9h`, `XXX9q`, `XXX10a`, `XXX10c`, `XXXApplicationErrors`; revival tests `XXXInferLambdaArg`, `XXXLiteralNoCoercionRefused`, `XXXStridedRangeRungT`. For example, `XXX10a.test`: "Function body has type IntLiteral, but declared return type is ()." became "Function body has type OR(NaturalNumeral[\1,10,3\],NaturalNumeral[\1,10,5\]), but declared return type is ()."; `XXX6at.test` loses its candidate line for `IntLiteral`'s own `+`; `XXX9q.test` reports 9 errors for 8, since two numerals of different values in one `if` without `else` now give two messages where one `IntLiteral` gave one.

## 8. The gate's stages

One script ran the stages one after another in the worktree, with nothing else beside them: the count, `time explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`; the distance, `explorations/coordinator/tools/distance/run.sh <out> <scratch>`; `ant testFast`; `ant testSystem`; and microGPT's quick checks, `explorations/coordinator/tools/mg-run.sh <dir> proto 1`. Machine as in the header; load at the start of the second round 1.08, 2.00, 3.03, of the third 1.93, 4.20, 4.18 (`uptime`).

The second round, on the code before the last fix:

- Count: "#total 0 / #locations 0 / #crash none", "real 1m43.621s"; the base "real 1m44.733s". Its table equals the base's line for line, paths masked.
- Distance: "#total 0 / #crash none / #seconds 159 FortressLibrary 98"; the base "#seconds 161 FortressLibrary 102".
- `ant testFast`: compiler "Tests run: 1515, Failures: 5"; library "Tests run: 82, Failures: 0"; othercompiler "Tests run: 263, Failures: 0"; misc, `NumeralFoldJUTest` "Tests run: 9, Failures: 3" (section 7). The compiler track's five: the team tests `Compiled3.u` and `Compiled6.bi`, "Saw wrong failure. compile", whose pinned lists of candidates for `+` named the prelude's `(IntLiteral, IntLiteral)->IntLiteral`; and `NumeralDivByZeroCompiled` three times, its link failing with "Error trying to close method scope" and `ArrayIndexOutOfBoundsException`: the numeral `-7` in a `catch` clause beside `1 DIV 0`, a join the checker still coerced as a whole.
- `ant testSystem`, the walk suite: four shards, "Tests run: 207", "205", "202", "205", each "Failures: 0, Errors: 0", 819 tests.
- microGPT: `MicroGptFlatQuick` and `MicroGptAplQuick` each "VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS", `mg rc=0`.

The fix after it: the checker converts a numeral in a `try`'s result positions in place, as in an `if` (`Functionals.numeralResult`, `joinInto`, 12 lines); `XXX3u.test` and `XXX6bi.test` lose the `IntLiteral` candidate line; the unit test is rewritten (section 7). Checked: `junit.sh` over `NumeralDivByZeroCompiledLink.test`, `NumeralDivByZeroCompiled.test`, `XXX3u.test` and `XXX6bi.test`, "PASS", "OK (5 tests)"; `ant testOnly -DtestPattern=NumeralFoldJUTest`, "Tests run: 9, Failures: 0".

The third round, on the final code, the count, the distance and `ant testFast`. The walk suite and microGPT's quick checks were not run again: the fix is in the compiled checker, which walk switches off (`.claude/skills/fortress-repo/SKILL.md`, "The phases"), and in test files of the compiled path and a unit test, which neither reads.

- Count: "#total 0 / #locations 0 / #crash none", "real 1m40.981s"; its table equals the base's, paths masked.
- Distance: "#total 0 / #crash none / #seconds 163 FortressLibrary 100".
- `ant testFast`: compiler "Tests run: 1515, Failures: 0, Errors: 0"; library "Tests run: 82, Failures: 0"; othercompiler "Tests run: 263, Failures: 0"; misc, every class "Failures: 0", `NumeralFoldJUTest` "Tests run: 9, Failures: 0"; "BUILD SUCCESSFUL", 6 minutes 26 seconds.

The checker's time, by these runs: the count stage 1m44.733s on the base, 1m43.621s and 1m40.981s on the change; the distance stage 161 s on the base, 159 s and 163 s on the change. One run each; the differences are within the spread of the change's own two runs.

Flips against the base, by name and line:

- Walk suite: no test flips to failing. Eight assertions move out of two revival tests into `XXXNumeralEqualsNumberWalk.fss`, which expects their failure: `NumberMixedEqualityWalk.fss` lines 70, 71, 110 and 111, and `NumeralTypesWalk.fss` lines 78, 80, 82 and 84 (section 7; question 1).
- From expected failure to passing, each renamed without `XXX`: `NumeralCoercionGenericTypeCompiled` (row 957), `NegativeNumeralOwnType` (row 961), `FloatLiteralValuePrint` (row 362), `NumeralDivByZeroCompiled` (row 318).
- Deleted: `library_tests/IntLiteralRung6` and `IntLiteralArithRung7`, revival tests of the prelude's `IntLiteral`.
- New: walk `NumeralStaticDesignWalk`, `NumeralWhereRefusedWalk`, `NumeralNegativeNoMinusRefusedWalk`, `NumeralStaticExprRefusedWalk`, `NumeralTypeNoValueWalk`, `XXXNumeralEqualsNumberWalk`; compiled `NumeralStaticDesignCompiled`, `XXXNumeralWhereRefusedCompiled`, `XXXNumeralNegativeNoMinusCompiled`, `XXXNumeralStaticExprRefusedCompiled`.
- Team tests that change, all `compiler_tests/` pins of a checker message, each still expecting its failure, lines of the `.test` file at `dd00743d9e`: `XXX3u` 16 (deleted); `XXX6bi` 16 (deleted); `XXX5an` 17, 19, 21; `XXX5be` 15; `XXX6at` 18-25, 35; `XXX9ad` 20; `XXX9af` 20; `XXX9h` 15; `XXX9q` 15, 17, 19, 21, 23, 25, 27, 29-30 (two lines added); `XXX10a` 15, 17, 19; `XXX10c` 19; `XXXApplicationErrors` 19, 21, 24-25. In each, `IntLiteral` becomes the numeral's own type, as `NaturalNumeral[\1,10,3\]`, or the candidate `(IntLiteral, IntLiteral)->IntLiteral` goes.
- Revival tests rewritten, their values kept: sections 7 and 6.

## 9. What the whole design costs, by area

Lines are `git diff dd00743d9e --shortstat` over each area of the patch; rungs are my estimate in rungs of a batch, where batch 29 built the field numerals in rungs C, N, F and T.

- The one library: 4 files, 42 insertions, 145 deletions. Half a rung; it is most of rung N's text again, smaller.
- The prelude, under P-37's exception: 2 files, 51 insertions, 130 deletions. Half a rung, with the runtime.
- The checker: 8 files, 316 insertions, 32 deletions; with the fold and `NumeralNumbers.java`, 2 files, 161 insertions, 6 deletions. Two rungs: the numeral types and the `where` clause, and the sign and the joins.
- The code generator: 1 file, 118 insertions, 40 deletions; the runtime: 3 files, 16 insertions, 22 deletions. One rung.
- Walk: 2 files, 218 insertions, 58 deletions. One rung.
- Tests: walk 15 files, 220 insertions, 47 deletions; compiled 45 files, 283 insertions, 91 deletions; library 4 files deleted, 155 lines; the fold's unit test 9 lines changed. One rung, most of it the thirteen respelled pins and the promotions.
- In all: 87 files, 1434 insertions, 735 deletions; about six rungs, one batch. What section 10 leaves would add about two rungs, and the specification's revision (Appendix I, `literals.tex`) a third.
- The checker's time is unchanged within noise: the count stage over the one library took 1m44.733s on the base and 1m43.621s and 1m40.981s on the change, and the distance stage 161 s, and 159 s and 163 s (section 8).
- The library types' speed: at a built-in target the code is batch 29's fold to a JVM constant, unchanged; walk runs the library's coercion body once per place and type, cached by the site. No speed was measured (walk's timing is not taken, `references/interpreter.md`).

## 10. What was not built

- A coercion declared in another component than the numeral's site, on the compiled path: the code generator inlines only a coercion it finds in the component it compiles (`numeralCoercionDecl`). Elsewhere the call stays at its site and the class loader instantiates the generic coercion, one class per numeral, with `v` among the stamped sizes, which `RTTIsize.of` holds as an `int`. Neither the one-method form nor a wider `RTTIsize` was built; no test reaches it.
- A site whose type names a type variable, as `m(): Gen[\T\] = 3` in `object Box[\T\]` (row 957's second case): not hoisted, as before.
- The type's `-` on a negative constant at a program's type runs at each evaluation on the compiled path; only the coercion is hoisted, where P-176 has the `-` run in the `static final` too. Under walk the whole constant is made once for the place.
- Under walk, `u = 0` for `u: NN32` and its kin give `false` (section 13, question 1). The compiled path gives `true` only because the prelude declares no `=` over `Any`.
- Under walk, a `where` clause refuses only when the place runs (P-176 until P-12), and a numeral type written as a variable's type is refused only when its binding runs.
- A numeral in a `case` expression's winning clause, an `if` without `else` or a `try` with a `finally` clause is converted by the old path, not in place; no test reached it.
- Only `where` comparisons of sizes are read; `where { v < 256 }`-style arithmetic is read with `+`, `-`, `^` and multiplication only.
- The specification is not revised: `Specification/basic/expressions/literals.tex` still states the field numerals (F-345), and Appendix I has no entry for the static numerals.
- Rows the prototype repairs but cannot close, since it lands nothing: 318, 362, 957 (first case), 961, 968, 969, 970, and row 513 for a numeral coercion.

## 11. Findings the record does not hold

- Row 971 (filed): on the compiled path a numeral site's coercion that spawns a task fails the load of the component's class, since the static initializer runs before the task pool; batch 29's sites fail so on the base (the probe in section 5).
- Row 972 (filed): a library component with a generic overloaded top-level function stores its inference cache tables into a class named without its package, and every compiled program dies at its static initializer. No library component has one today.
- Row 291's crash, `BoxedUnit cannot be cast` in the post-check walker, has a second trigger: a size inference variable left in a checked library (section 3). Not filed: the row's notes have 29 characters left; the trigger needs the probe's library to show.
- Walk's sizes are `long` (`IntNat.java`), and walk refuses a size above `NN32` when it binds one (`EvalType.java:252-262`); the record holds the second (F-140), not the first as the limit of a numeral's `v`.
- The checker coerces an `if`'s non-winning clauses, and a tuple of numerals at a tuple type, as whole expressions (`impls/Misc.scala:556-564`, `CoercionOracle.checkCoercionTuple`), so with batch 29's `IntLiteral` a numeral there was coerced at run time. Not a defect today; it matters only once numerals have no run-time value.
- The prelude's own code writes getters on numerals, `(1).asZZ` and `(1).asNN32` (`LibraryBuiltin/CompilerBuiltin.fss:561-570`, `:750`, `:752`, `:814`, `:816`).

## 12. Decisions

1. The hierarchy, where the Draft is silent ("We need to describe the Numeral type hierarchy", `Specification-1.0-frozen/basic/expressions/literals.tex:93-95`, kept in the revived `Specification/basic/expressions/literals.tex:123-126`): `Numeral` below `Number`, the record's "a sibling of the number types under `Number`" (`references/revival-changes.md`, "Numbers"); `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]` at the Draft's arities, below two `Any` traits that exclude each other. Not taken: the Draft's `NaturalNumeralWithExplicitRadix` and `RadixPointNumeralWithExplicitRadix` (the radix is `r`, as P-174 has it), its `Literal[\v\]`, and a generic `Numeral[\n,m,r,v\]` above both, which the exclusion rule forbids beside the two generic traits; `Numeral excludes { Number }`, which the promotion of P-74 cannot use: with it the team's `compiler_tests/InferO2Num` failed, one of the four failures of section 7's run of 45 tests. This is a decision not taken for the curator too (question 4).
2. The four numbers read as values inside a numeral coercion are `ZZ`; elsewhere a `nat` stays a `ZZ32` (P-173). The brief's "exact integers"; the alternative, every `nat` value a `ZZ`, changes P-173 and its tests.
3. At a built-in target the compiled fold is batch 29's, recognised by the target type; the checker reaches it through the library's generic coercion. The alternative, evaluating the library coercion's body at compile time, needs an evaluator in the compiler. Under walk the library's coercion body runs, as for any type.
4. On the compiled path the coercion is inlined at its site, not compiled as one method that takes the four numbers as values (section 5 gives why).
5. The fold marks its results by their text, `-3` and `(5)`, so that the checker, the code generator and walk tell a numeral as written from a negated one and from a folded static expression. The alternative, a field on the node, changes `Fortress.ast`.
6. At the library's eight types the range refusal stays batch 29's, by the value, not a `where` clause on each library coercion: `-2147483648` at `ZZ32` is a negative constant, which a `where` over `v` cannot see.
7. Under walk the parameter of a numeral coercion is bound to `()`, and the conversion runs when dispatch first asks whether a declaration admits the numeral.
8. The prelude keeps no `IntLiteral`; a size read as a value reaches the code as a `ZZ32`, with row 962's error kept.
9. The eight walk assertions of `u = 0` and its kin move to an `XXX` test that asserts the snapshot's answer, since the snapshot's section 11 states it; the compiled path's test keeps `u = 0`.

## 13. Questions for the curator, as decisions not taken

1. `u = 0` for `u: NN32`, under walk, and on the compiled path after the switch-over.
   - The question: with the `=` pairs over the numeral types deleted, `u = 0` meets two declarations: the library's `=` over `Any`, which the numeral's default `ZZ32` fits as it is, and `NN32`'s own `=`, which the numeral reaches by its conversion. Which runs?
   - Sources: the snapshot's section 11 (confirmed 11-09, 15:xx to 16:3x UTC): "the checker fixes `0` at `NN32` from the other operand and folds it"; the tree's rule "A conversion never changes which declaration runs when one already fits" (`.claude/skills/fortress-repo/SKILL.md`, "Fortress as a language"), which walk applies (`OverloadedFunction.bestMatchForNumeralsInternal`); P-173's `gg(5, w)` (P-49).
   - Solutions: (a) a numeral reaches a declaration by its conversion before one it fits only at its default, where that declaration is more specific; this changes the tree's rule, and walk's dispatch; (b) `u = 0` is `false`, strict equivalence of an `NN32` and a `ZZ32`; (c) the `=` pairs stay, against "It was a wrong choice and it gets deleted".
   - Current behaviour: in the tree today the `=` pairs give `true`; with the prototype walk gives `false` and the compiled path `true`, since the prelude has no `=` over `Any`. Built: the compiled answer; walk's is the `XXX` test.
2. The library's own types and "a separate way in the compiler for the shipped numerics".
   - The question: the library's eight types take a numeral by the same generic coercion, and the checker finds it so; but the compiled fold to a JVM constant is recognised by the target type, and the range refusal is by the value, not a `where` clause. Is that the hole his words name, or the folding of a constructor call whose result is a JVM `int`?
   - Sources: the snapshot's section 11, first bullet; decisions 3 and 6.
   - Solutions: (a) keep it; (b) `where` clauses on the library coercions, with a reading of a negative constant's sign (`-2147483648` at `ZZ32` must fit); (c) a compile-time evaluator of the library coercions' bodies.
   - Current behaviour: (a), as batch 29 built it.
3. A folded static expression at a program's own type.
   - The question: through which coercion does `10/20`, or `2 + 3`, reach a program's type?
   - Sources: the snapshot's section 11, one bullet "only through a coercion from `ZZ32` or `QQ`" and its last "through a coercion from `QQ` or `ZZ`" (both 11-09, 15:xx to 16:3x UTC); P-174, "through its coercion from the folded value's type, such as `QQ` for `1/2`" (section 1).
   - Solutions: (a) from the folded value's default type, `ZZ32`, `ZZ64` or `ZZ` by its value, `QQ` for a quotient, `RR64` with a radix point; (b) from `ZZ` for an integer, whatever its value, and `QQ` for the rest; (c) from `ZZ32` or `QQ` only.
   - Current behaviour: in the tree today the fold writes a constant as a numeral (`IntegerLiteralFoldingVisitor.written`), so it reaches a program's type through the type's coercion from the numeral type, as a numeral does; built: (a).
4. The numeral type hierarchy.
   - The question: which traits are the numeral types, and may a program extend them?
   - Sources: the Draft's note "We need to describe the Numeral type hierarchy" (`Specification-1.0-frozen/basic/expressions/literals.tex:93-95`, 2009); its `Numeral[\n,m,r,v\]`, `NaturalNumeralWithExplicitRadix` and `Literal[\v\]` (`:83-129`); P-174, the four numbers.
   - Solutions: (a) the probe's five traits (decision 1); (b) the Draft's six types, which the rule that no type extends two instantiations of one generic trait refuses for `Numeral[\n,m,r,v\]` above both kinds; (c) (a) with `comprises` clauses, so that no program extends them, not tried.
   - Current behaviour: the tree's field numerals have three traits without static parameters; built: (a).
5. A coercion that spawns, at a place on the compiled path (row 971).
   - The question: where does a site's coercion run, given that a component's static initializer runs before the task pool?
   - Sources: P-176, "into a `static final` field filled when the class loads"; `MainWrapper.java:61-63`.
   - Solutions: (a) start the task pool before the program's classes load; (b) fill each site at its first use, on the task that reaches it, which changes P-176's "filled when the class loads"; (c) run the static initializer's coercions on the pool.
   - Current behaviour: the class's load fails, on the base and with the prototype; nothing was changed.
6. A coercion declared in another component than the numeral's site, on the compiled path.
   - The question: how does the compiled path apply a generic coercion whose body it cannot inline?
   - Sources: P-176; the snapshot's section 9, question 3, "What does `v` of a 20-digit numeral need in the checker, and in the class loader's stamped constants (F-129)?"; `RTTIsize.of`, which holds a size as an `int` (section 10).
   - Solutions: (a) one method per coercion that takes the four numbers as `ZZ` values, called once per place; (b) the class loader's instantiation, one class per numeral, with `RTTIsize` widened to a `BigInteger`; (c) inlining across components from the analyzed cache.
   - Current behaviour: the call stays at its site and is instantiated by the class loader; no test reaches it.

## 14. Where the Draft is silent, and what was chosen

- The hierarchy (`Specification/basic/expressions/literals.tex:123-126`, the team's note): decision 1.
- When a coercion runs: the Draft says nothing (the snapshot's section 2); P-176: once per place, at load on the compiled path, at the first evaluation under walk.
- The four numbers of a numeral with trailing zeros: as written, `3.14150` is 314150 and 5, batch 29's reading kept (`NumeralNumbers.of`).
- A radix indicator: the Draft's `...WithExplicitRadix` types are not built; `r` carries the radix, as P-174 has it.
- The sign: the Draft's natural numeral has no sign; the curator's 23:10 on 11-08 and repair 3 give the rest (P-174).

## 15. Commands worked out

- To see a compiled refusal of the base's code on a scratch program: `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base30 <worktree>/tmp/old-caches compile P.fss`, then `run P`.
- To respell compile-error pins that named `IntLiteral`: a script compiled each test's component, matched each pinned message line to the new one by its location, checked that the two are equal once `NaturalNumeral[\...\]` and `OR(...)` of them read back as `IntLiteral`, and wrote the new text with each backslash doubled for the property file. It is scratch, not committed; `XXX6at` and `XXX9q`, whose messages differ in more than the name, were rebuilt by hand from the new output.

## 16. For FACTS

None. The two defects are ledger rows 971 and 972; the prototype's measurements are of uncommitted code.

## 17. Defects

- Row 971: a numeral site's coercion that spawns a task fails the load of the component's class on the compiled path; on the base too (section 5).
- Row 972: a library component's generic overloaded top-level function stores its inference cache tables into a class named without its package (section 5); fixed in the patch, so the row stays open until a change lands.
- Row 291's crash has a second trigger (section 11); not filed, for the row's length.
- The prototype's own defects, each fixed in the patch before the gate's last round: a numeral in a join or a tuple coerced as a whole at run time (section 4), and the same in a `try`'s `catch` clause, which the gate's second round found (`NumeralDivByZeroCompiled`, section 8).

## 18. Sentences of the specification made false

The patch makes these false; they state the field numerals, which batch 29 built (F-345, row 969):

- `Specification/basic/expressions/literals.tex:109-113`: "\Library\ declare these numbers as the getters \VAR{digits}, \VAR{fractionDigits}, \VAR{radix} and \VAR{digitValue} of \TYP{Numeral} ... They are fields of the numeral's value, not static parameters of its type: the three numeral types have no static parameters."
- `literals.tex:179-181`: "A place \emph{fixes a type} for a numeral when the type declared there declares a coercion from the numeral's type, ... or is a numeral type itself." The patch refuses a binding at a numeral type (section 1).
- `literals.tex:227-229`: "Inside the body of a coercion, two values of a numeral type are equal, and strictly equivalent, when their values $v/r^m$ are equal". With the static numerals a coercion's parameter has no value; the body reads the four numbers.
- `literals.tex:139-152`, the `\revision` box: "The revival decided on 8~November 2026 that the four numbers are fields of the numeral's value".
- `Specification/appendices/changes.tex:5005-5012`, the Change of `revival-numerals`: "its value holds the four numbers ... as the getters \VAR{digits}, \VAR{fractionDigits}, \VAR{radix} and \VAR{digitValue}"; and `:5013-5014`: "\secref{types-libraries} names \TYP{Numeral}, without static arguments".

## 19. Points to report

- The hierarchy, as a decision not taken: decision 1 and question 4.
- The method-or-inline choice: inline (decision 4, section 5).
- Row 486: not fixed, since it is `FIXED` and about the checker; walk's way around its real obstacle, the `long` sizes, is to bind the four numbers as values (sections 1 and 6).
- Where the snapshot and the entries differ: section 1.
- Where the Draft is silent: section 14.
- Each flip by name and line, with the team tests that change: section 8.
- The tests of the brief's list that could not be built on the compiled path (the interval, the `QQ` cases): section 7.

## Summary

The static numerals were built on both paths in a worktree of `dd00743d9e`; the uncommitted change is `draft-numerals.patch`, 87 files, 1434 insertions, 735 deletions.

- The one library: `NaturalNumeral[\n, r, v\]` and `RadixPointNumeral[\n, m, r, v\]` under `Numeral`, and a coercion generic over the four numbers on each of the eight number types. The field numerals, their getters and the `=` pairs are gone. The hierarchy is a decision not taken.
- The checker: a numeral's type carries its four numbers, `v` at any size; the checker's own inference finds the coercion's static arguments; a `where` clause over them is computed exactly and refuses as a static error; P-173's default stands. Joins and tuples of numerals convert in place.
- The code generator and the runtime: a built-in target keeps batch 29's fold to a JVM constant, `-3` and `-2147483648` folded first. At a program's type the generic coercion is inlined once per place into a `static final`, `v` a `ZZ` constant, with no class per numeral and the type's `-` for negatives. The prelude carries the same declarations; `IntLiteral` and `FloatLiteral` are gone.
- Walk: each place converts at its first evaluation, from the four numbers bound as values; `-3` goes through the type's own `prefix -`; `Numerals.object` is gone. Row 486 did not stand in the way. Walk's `long` sizes did, and binding the four numbers as values goes around them.
- On the final code: count 0 (1m40.981s, base 1m44.733s); distance 0 (163 s, base 161 s); `ant testFast` passing (1515, 82 and 263 tests). The walk suite passed, 819 tests, and microGPT's quick checks 7 of 7 each, both before the last fix, which only the compiled checker runs.
- Cost: about six rungs (section 9); section 10's gaps and the specification add about three.
- Not built: a coercion declared in another component, on the compiled path; a site whose type names a type variable; the minus hoisted with the coercion. Under walk, `u = 0` gives `false` and refusals come at run time.
- Filed: rows 971 (a spawning coercion fails its class's load) and 972 (cache tables in a class without its package).
- Six questions for the curator (section 13): `u = 0`; the library's types and the fold by target type; a static expression's path; the hierarchy; a spawning coercion; a coercion from another component.

# Rung E: a numeral at the end of a block at a declared type, on the compiled path

- problem: ledger rows 1014 and 1030, a compiled block that ends in a numeral after a local declaration, or in a tuple with a numeral element, dies with 'NoClassDefFoundError: fortress/CompilerBuiltin$v' (explorations/fortress-gap-ledger.md:1048, explorations/fortress-gap-ledger.md:362)
- spec: a block's value and type are those of its last expression (Specification/basic/expressions/blocks.tex:54-56), and a tuple's coercion is distributed element by element (Specification/basic/conversions-coercions.tex:829-830); a numeral converts where it stands (P-173)
- precedent: the checker's join that converts each numeral of a result position at a declared type, with cases for a block, `do`, `if`, `case` and `try` (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1340-1363 at 647163a9c4), and the coercion oracle's tuple that holds a numeral, converted element by element where it stands (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:189-196)
- deviation: the join's new tuple case builds the coercion of an element that is neither a numeral result nor of the element's type, as the oracle's tuple case does and the join's other cases do not (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1374-1377); none from the specification's spelling
- historical: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala and Specification/appendices/changes.tex, both in the team's tree at a874948ac

## What changed and why

The base is 647163a9c4. The rung's commits on `wip/rung-numeral-block-end`: `7fb38bbe30` (the checker's edit and the tests), `20fe9f78c5` (Appendix I's sentence), `19e7e678e8` (the refusal test widened to `RR64`, and its new name in that sentence). One launch worked the rung.

**The cause as found.** A function's body is checked by `checkExpr(body, rt, ...)` (`scala_src/typechecker/impls/Decls.scala:230`). The block passes the expected type to its last element without converting it (`impls/Misc.scala:435`), and after a local declaration that last element is a `LocalVarDecl` (or a `LetFn`) whose own body is the rest of the block. So the block's type is the numeral's own type, `NaturalNumeral[\1,10,4\]`, and `STypeChecker.checkExpr` falls to its conversion (`scala_src/typechecker/STypeChecker.scala:538-539`): first `numeralJoinInto`, the join that converts each numeral of a result position where it stands, then `coercions.buildCoercion` of the whole expression. The join's test of whether a result position is a numeral, `numeralResult`, and its rewrite, `joinInto` (`impls/Functionals.scala:1304-1313`, `:1334-1385`), had cases for a block, `do`, `if`, `case` and `try`, and none for a `LocalVarDecl`, a `LetFn` or a tuple. So `buildCoercion` wrapped the whole `do` block in a `TraitCoercionInvocation` (the type-checked tree of `four()`, dumped by `fortress typecheck -out`, shows `(FnDecl ... _body=(Some _value=(TraitCoercionInvocation ... _arg=(Do ...`), and for a block that ends in `(1, k)` a `TupleCoercionInvocation` around the whole block. The coercion desugarer writes `_RewriteFnApp(coerce_ZZ32[\1,10,4\], block)` (`compiler/desugarer/CoercionDesugarer.scala:97-100`), or binds the tuple to fresh variables and calls the coercion on a variable (`:112-145`). The code generator folds a numeral's coercion only where its argument is the numeral itself (`numeralCoercionSiteDesc` and `isNumeralCoercionCall`, `compiler/codegen/CodeGen.java:7551-7574`); on a block or a variable it takes `emitFnApp`, whose call of a reference with static arguments is a closure call (`useClosure`, `CodeGen.java:7808-7819`), and `forFnRef` writes the reference as a function value: a `GETSTATIC` of the closure of the generic coercion at its uninstantiated arrow type, `NaturalNumeral[\n,r,v\] -> ZZ32` (`CodeGen.java:4147`). The run then loads that closure, whose body reads the static parameter `v` as a class, `fortress/CompilerBuiltin$v`. A typed binding does not take that path because `k: ZZ32 = 3` checks its right side, the numeral itself, at the declared type (`impls/Decls.scala:407`), so the coercion's argument is the numeral and the code generator folds it into a constant.

The bytecode of `four()` on the base (`javap -c -p Four.class`, the jar of `bin/fortress compile Four.fss` on the base's code):

    0: getstatic     #44  // Field "fortress/CompilerBuiltin?$coerce_ZZ32?1,10,4??$\\=?Arrow?fortress\\|CompilerBuiltin\\%NaturalNumeral?n,r,v?,...FZZ32?"...
    8: iconst_4
   12: invokeinterface #58,  2  // InterfaceMethod "\\=Arrow?...NaturalNumeral?1,10,4?,...FZZ32?".apply:(...)
   17: areturn

and on the edit:

    5: iconst_4
    6: invokestatic  #44  // Method com/sun/fortress/compiler/runtimeValues/FZZ32.make:(I)Lcom/sun/fortress/compiler/runtimeValues/FZZ32;
    9: areturn

**The repair** (`impls/Functionals.scala:1312-1313`, `:1366-1381`). `numeralResult` reads a `LocalVarDecl` or `LetFn` by its body (`SLetExpr`) and a plain tuple by its elements. `joinInto` converts a `LocalVarDecl`'s or `LetFn`'s non-empty body as it converts a block, and a plain tuple at a tuple type of the same length element by element: an element that is a numeral result by the join, one of the element's type as it is, any other by `coercions.buildCoercion`, the oracle's own tuple case (`CoercionOracle.scala:193-194`). At a type that is not such a tuple type, a tuple stays as it is where it has the type, as it did before (`joinInto`'s last case), and the join fails otherwise. So the numeral converts where it stands, as a typed binding does, at every place that runs the join: a declared return type, a typed binding, a parameter (`impls/Functionals.scala:411`, `:500`), and the other branches of an `if` whose type is one branch's (`impls/Misc.scala:563`).

## The tests, failing and passing

The failing runs ended at 07:58:29Z; the edit was first built at 07:59:40Z (`ant compileAll`, `tmp/` log, `Caches ... started again, empty`), then the library order.

Promoted, with their cases (each `XXX` file renamed with `git mv`, each `Link.test` changed to the plain component):

- `compiler_tests/NumeralEndsBlockAfterDeclarationCompiled` (row 1014): an integer numeral at `ZZ32`, a float at `RR64`, `-4`, a numeral after a local function, an `if` whose branches are numerals, and a block as an argument at a parameter's type.
- `compiler_tests/BlockEndsInTupleOfNumeralCompiled` (row 1030): `pair(k)` of the row, the row's kin `nest(): ((ZZ32, ZZ32), String) = ((10, 20), "s")`, a block ending in a tuple as an argument at a tuple parameter, and a tuple branch at the type of an `if`'s other branch.
- `compiler_tests/TupleBindingIfBranchesCompiled` (row 1031): the row's binding in a block, and at the top level.

The failing runs, on the base's code before the first build, through the harness:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-promoted ProjectFortress/compiler_tests NumeralEndsBlockAfterDeclarationCompiledLink.test NumeralEndsBlockAfterDeclarationCompiled.test BlockEndsInTupleOfNumeralCompiledLink.test BlockEndsInTupleOfNumeralCompiled.test    (2026-11-17T07:57:58Z)
    ProjectFortress/compiler_tests/NumeralEndsBlockAfterDeclarationCompiled.fss:27:16-30:4: Error trying to close method scope.
    F. run ProjectFortress/compiler_tests/BlockEndsInTupleOfNumeralCompiled (530ms) java.lang.NoClassDefFoundError
    Caused by: java.lang.NoClassDefFoundError: fortress/CompilerBuiltin$v
    Tests run: 6,  Failures: 4,  Errors: 0

The `if` form stops the compile of the first test (row 340's message, `:27` is `pick()`), so each other case ran alone, one component each, from `tmp/`:

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base-variants tmp/rung-numeral-block-end/base-variants VariantFourLink.test VariantFour.test ... VariantNestLink.test VariantNest.test    (2026-11-17T07:58:09Z)
    . run .../VariantFour (457ms) java.lang.NoClassDefFoundError          (and VariantHalf, VariantMinusFour, VariantAfterLocalFunction: the same)
    Caused by: java.lang.NoClassDefFoundError: fortress/CompilerBuiltin$v
    Caused by: java.lang.ClassCastException: class com.sun.fortress.compiler.runtimeValues.FZZ32 cannot be cast to class fortress.CompilerBuiltin$NaturalNumeral?2,10,10? ...   (VariantNest)
    Tests run: 15,  Failures: 5,  Errors: 0

Cases added after the edit was built, and row 1031's promoted test, on the old code (`old-fortress.sh`, the base build `/home/user/fortress-base36`):

    $ explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base36 $PWD/tmp/old-caches junit $PWD/ProjectFortress/compiler_tests/TupleBindingIfBranchesCompiled.test    (2026-11-17T08:02:58Z)
    java.lang.ArrayIndexOutOfBoundsException: Index 1 out of bounds for length 1
    Tests run: 2,  Failures: 2,  Errors: 0
    $ explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base36 $PWD/tmp/old-caches junit <VariantArgument, VariantTupleArgument, VariantIfOtherBranch pairs> <the two promoted pairs>    (2026-11-17T08:04:07Z)
    F. run .../VariantArgument (489ms) java.lang.NoClassDefFoundError
    F. run .../VariantTupleArgument (505ms) java.lang.NoClassDefFoundError
    F. run .../VariantIfOtherBranch (557ms) java.lang.NoClassDefFoundError
    Tests run: 15,  Failures: 7,  Errors: 0

The in-block form of row 1031 failed on the base as its `XXX` test expected ('Error trying to close method scope', `junit.sh base-kin`, 07:58:25Z, `OK (5 tests)`).

The passing run, the last after the last change of code (the code is `7fb38bbe30`'s; later commits change tests and prose):

    $ ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh final ProjectFortress/compiler_tests <the 15 files below>    (2026-11-17T08:26:29Z)
    OK (19 tests)

The 15 files: the three promoted tests with their `Link.test` files, `NumeralEqualsNumberCompiled.test`, `XXXNumeralNotEqualsFloatCompiled.test`, `NumeralEqualsRR32CompiledLink.test` with `XXXNumeralEqualsRR32Compiled.test`, `NumeralEndsUntypedBlockCompiledLink.test` with `XXXNumeralEndsUntypedBlockCompiled.test`, and the kin `XXXAtomicExprNumeralArms.test`, `AtomicExprNumeralBodyLink.test` with `XXXAtomicExprNumeralBody.test`, `XXXLabelNumeralValueCompiled.test`.

**The kin, by a run each** (`junit.sh edit-kin`, 08:01:07Z, and `final`):

- `XXXTupleBindingIfBranchesCompiled` (row 1031) compiled and ran: 'Saw failure, but did not satisfy compile_exception_contains', then `bin/fortress run` printed `PASS`. Promoted, above.
- `XXXAtomicExprNumeralArms` (row 1043): unchanged, 'NaturalNumeral cannot be written in a program except as a parameter's type.', `Saw expected failure`.
- `XXXAtomicExprNumeralBody` (row 1043): unchanged, 'java.lang.VerifyError: Inconsistent stackmap frames at branch target 3', `Saw expected failure (Exit code != 0)`.
- `XXXLabelNumeralValueCompiled` (row 340's label case): unchanged, the compile stops with 'Error trying to close method scope', `OK Saw expected exception`.

The join reaches neither: an atomic expression and a `label` are no result position of it, and the brief builds nothing more for them.

**The compiled test of `u = 0`** (fork E2), from `plan-31/probes/planner/PEqNum.fss`:

- `compiler_tests/NumeralEqualsNumberCompiled`: for a zero `u` of `NN32` and of `NN64`, `u = 0` is `true` and `u =/= 0` is `false`; `. run ... (463ms) PASS`. These pass on the base, as the brief says; the test has no failing run.
- `compiler_tests/NumeralNotEqualsFloatCompiled.fss` with `XXXNumeralNotEqualsFloatCompiled.test` (`compile`, `compile_err_contains=Could not check call to operator NE`), the folder's form for a refusal (as `XXXNumeralNegativeNoMinusCompiled.test` over `NumeralNegativeNoMinusCompiled.fss`): `c =/= 0` for `c: RR32` is refused, and so is `r =/= 0` for `r: RR64`, which I met while trying a workaround: the prelude's `RR64` declares no `=/=` either (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:893-953`). The run prints the message at `:7:17` and at `:9:17`, `Saw expected failure`.
- `compiler_tests/XXXNumeralEqualsRR32Compiled` with `NumeralEqualsRR32CompiledLink.test`: `c = 0` for `c: RR32` compiles, links and dies with 'java.lang.StackOverflowError' after `REACHED`, `Saw expected failure (Exit code != 0)`. It asserts `true`. The first `XXX` test that the rung adds, shown red on a deliberate fix: with `assert(c = 0, ...)` removed for one run, `junit.sh xxx-deliberate` gave `1) ...XXXNumeralEqualsRR32Compiled(...TestTest)junit.framework.AssertionFailedError` and `Tests run: 2,  Failures: 1`; the file was restored (`cmp` equal).

The Effect's sentence (`Specification/appendices/changes.tex:5435-5442` on the base) said: "Both implementations answer u = 0 true, and u =/= 0 false, for a zero u of NN32, NN64 or RR32; ...". It now says (`changes.tex:5435-5453`) that the interpreter does so at the three types and the compiled path at `NN32` and `NN64`, and that at `RR32` the compiled path's own library declares no `=/=` and takes its `=` from its `Equality`, which calls its `===`, whose declaration at `RR32` calls `=` (`Library/CompilerAlgebra.fss:26`, `Library/CompilerLibrary.fss:67`), so the checker refuses `c =/= 0` and `c = 0` overflows the stack, with rows NEW-E-1 and 528 and the two tests named. The prelude is not changed (P-37).

## Where the fix belongs, and the precedent

The feature table's row for coercions (`explorations/coordinator/map/spec-to-implementation.md:288`) puts the coercion's place in the checker (`CoercionOracle.scala`) and its call in `desugarer/CoercionDesugarer.scala`; no coercion node reaches the code generator. The place that decides where a numeral's coercion stands is the checker's conversion at an expected type, `STypeChecker.checkExpr` (`STypeChecker.scala:538-539`), whose first step is the join of `Functionals.scala`. The ways:

1. **The checker's join, `numeralResult` and `joinInto`** (chosen): the place that already converts a numeral where it stands at a declared type, for five result positions; a block after a declaration and a tuple are two more.
2. The code generator's reference to the coercion as a value (`forFnRef`, `forFunctionalRef`), the brief's other place: no numeral value exists when the program runs, so a reference to the coercion has nothing to take; and it would run the coercion at each evaluation, against P-176's one value per place.
3. The code generator's `for_RewriteFnApp`/`emitFnApp`, pushing the call into the block's last element: a rewrite of the tree in the code generator, in members the brief does not name.
4. The coercion desugarer, pushing a coercion of a block into its last element: a file the brief does not name, which would also have to undo the tuple coercion's binding to fresh variables.
5. The checker's `Block` case (`Misc.scala:435`) or `LocalVarDecl` case (`Decls.scala:349-437`) converting the last element at the expected type: it would convert at every expected type, a hint included, and move messages, where the join converts only where the whole fails to fit.

The precedent's file holds five functions that walk a join's result positions: `defaultNumeral` (`:1259`), `tupleJoin` (`:1277`), `numeralResult` (`:1304`), `joinNumerals` (`:1318`) and `joinInto` (`:1334`). The edit adds the two forms to the two that serve a declared type. The three that serve a place that fixes no type, `defaultNumeral` through `joinNumerals` and `tupleJoin`, have the same gap and stay as they are (decision 4).

## What the specification settles

`blocks.tex`, "Do Expressions": the block's value and type are those of its last expression, so `four()` is the numeral 4 at `ZZ32`. `conversions-coercions.tex`, "Coercions for Tuple and Arrow Types": a tuple's coercion is invoked element by element, and an element whose type is already a subtype is left. P-173: a numeral converts where its place fixes a type, a declared return type among them, and takes its default elsewhere; P-176: one value for each place, made once. The specification is silent on whether the prelude's `RR32` and `RR64` declare `=/=`; `opr-overview.tex`, "GCD, LCM, and CHOOSE Operators", defines `e =/= e'` as `NOT (e = e')`.

## Programs run on the old code and on the new

Each compiled with `bin/fortress compile` and run with `bin/fortress run`, on the old code through `old-fortress.sh` (or on the tree before the first build), and on the edit:

| program | old | new |
|---|---|---|
| `Four.fss`, row 1014's program | 'NoClassDefFoundError: fortress/CompilerBuiltin$v' | `4` |
| `PRunsToday.fss`: a tuple of a numeral as an argument, a typed tuple binding, a tuple body, `(1, 2.5)` at `(ZZ32, RR64)`, an `if` of numerals at `ZZ32`, `do 5 end`, a block with a statement before its numeral, an untyped block after a declaration, untyped and `ZZ64` `if`s of numerals | `8 9 8 1 2.5 1 5 stmt 6 4 1 1` | the same output; `javap -c -p` of its three classes the same |
| `PBytecode.fss`: `five(): ZZ32 = do 5 end`, `six(): ZZ32 = 6`, `half(): RR64 = 0.5` | `5 6 0.5`; `five()` is `iconst_5`, `FZZ32.make`, `areturn` | the same; the `javap` the same but for the source path |
| `PTopTuple.fss`, row 1031 at the top level | the compile stops, `ArrayIndexOutOfBoundsException: Index 1 out of bounds for length 1` | `3` |
| `PIfTuple.fss`, `x = if flag then (1, k) else (j, k) end` | 'NoClassDefFoundError: fortress/CompilerBuiltin$v' | `REACHED`, `8` |
| `PArg.fss`, `PArg2.fss`, a block as an argument | 'NoClassDefFoundError: fortress/CompilerBuiltin$v' | `5`, `8` |
| `tests/TupleBinding.fss`, `TupleBinding2.fss`, `Variable.VarWTypes.fss` (the ladder subset) | pass | pass, the same output |
| `PUntyped2.fss`, `x = do k: ZZ32 = 3; 4 end`, `println(x)` | `4` | `4` (unchanged: a place that fixes no type) |
| `PUntyped.fss`, `PUntyped3.fss`, the same blocks then converted or taken apart | NoClassDefFoundError; ClassCastException | the same (row NEW-E-2) |

So no numeral at a place that runs on the base takes another value or type on the edit (the reserved point): `PRunsToday` and `PBytecode`, the places that run today next to the ones the join now reaches, compile to the same bytecode.

## Whole suites, the stages, the timing and the ladder

**`ant testFast`**, once, on `7fb38bbe30` (the checker's Scala changed; the brief's section asks for testFast, which holds testQuick's three tracks): `BUILD SUCCESSFUL`, `Total time: 11 minutes 4 seconds`; `CompilerJUTest` 1677 tests, 0 failures (run 1's gate: 1667; the rung adds 10 cases), `LibraryJUTest` 86, 0, `OtherCompilerJUTest` 263, 0, every misc class 0 failures. It ran on `7fb38bbe30`'s tree, before `19e7e678e8` widened the refusal test to `RR64` and renamed it (one compile case before and after); the widened test ran in `final`.

**The count stage**, on the final code (head `20fe9f78c5`, the code of `7fb38bbe30`; `19e7e678e8` after it changed tests and prose only), `explorations/coordinator/tools/checker-count/run.sh tmp/rung-numeral-block-end/checker-count-postedit.txt tmp/rung-numeral-block-end/cc-post`: `#total 0`, `#locations 0`, `#crash none`. `diff explorations/compile-ladder/climb-batch-31/gate/checker-count.txt tmp/rung-numeral-block-end/checker-count-postedit.txt` prints nothing.

**The distance stage**, on the same code, `explorations/coordinator/tools/distance/run.sh tmp/rung-numeral-block-end/distance-postedit.txt tmp/rung-numeral-block-end/dist-post`: `#total 0`, every `#kind` 0, `#crash none`, `#seconds 193`, `#shadow every shadow edit matched the tracked sources`. `explorations/coordinator/tools/distance/compare.sh explorations/compile-ladder/climb-batch-31/gate/distance.txt tmp/rung-numeral-block-end/distance-postedit.txt` prints `DISTANCE SAME   0`. The site list `dist-post/errors.tsv` and the gate's `explorations/compile-ladder/gate/distance-sites.tsv` hold their header line only: no site moved.

**The checker's time (P-148)**, one session, nothing else of mine beside either run; nproc 4, Intel Xeon @ 2.10GHz, 2100 MHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`; another rung's suite ran on the machine (load 4.28 at the base's start, 4.08 at the change's):

- `base`, the count stage on the base build's code (`/home/user/fortress-base36`, a commit whose code is the base's), timed after the edit was made in my tree: `real 1m49.547s`.
- `change`, the count stage's run above on the final code: `real 1m38.421s`.
- The tables: `diff` of `base.txt` and `checker-count-postedit.txt` prints nothing. The two `run.txt` files, each tree's path and scratch path replaced by one word, are equal (33 lines each, `diff` prints nothing).
- The second pass: a JFR profile of the count stage's checker on the final code (`JAVA_TOOL_OPTIONS=-XX:StartFlightRecording=filename=.../count-%p.jfr,settings=profile`, its table equal to the change's). Of 6,876 execution samples, 3 have `numeralResult`, `joinInto` or `numeralJoinInto` on the stack. The top frames (`jfr view hot-methods`): `Walker.walkCases7$` 7.71 %, `BoxesRunTime.equals2` 4.03 %, `Walker.walkCases4` 3.96 %, `List.prependedAll` 3.96 %, `Walker.walkCases5` 3.50 %. The profile shows no gain in the rung's code, so the pass changed nothing, and `change`'s results stand for `pass`'s; no memo was added, so there is no audit.

**The ladder subset** (`gate.md`, "The ladder regression", the drivers copied under `tmp/rung-numeral-block-end/ladder/`): no first error of the baseline's `ladder.tsv` names a numeral's coercion, `CompilerBuiltin$v` or row 340's message; the files whose first error names the code generator's tuple binding at declared types are `tests/TupleBinding.fss`, `TupleBinding2.fss` and `Variable.VarWTypes.fss` (baseline phase `codegen`, 'VarDecl ... at tupled lhs not handled.'). None is in the gate's ladder (`climb-batch-31/gate/ladder/ladder.tsv`). On the edit all three `pass`: UP against the baseline. They pass on the old code too, with the same output (`old-fortress.sh` compile and run, `diff` of the run outputs with `Operation took` masked prints nothing), so the move predates the rung.

**The demos and microGPT** were not run (the brief: the gather runs the demos, the commit stage the microGPT quick checks). The edit is the compiled checker's only; walk does not run it.

## Sentences made false

- `Specification/appendices/changes.tex:5435-5442` on the base, the Effect of `revival-numerals`, for `RR32` on the compiled path: narrowed (above).
- None other in `Specification/`: `grep` of `Specification/` for rows 1014, 1030, 1031 and `CompilerBuiltin$v` finds nothing, and the Effect's other sentences on the compiled path's numerals stand.
- Outside the specification, for the gather: the skill's `references/compiler.md:112` says that the body block of a function with a declared return type dies with `NoClassDefFoundError: fortress/CompilerBuiltin$v` when it ends in a numeral after a local declaration or in a tuple with a numeral element (rows 1014, 1030). Both now run. What stays is NEW-E-2, the same block at a binding without a declared type.

## Points to report

1. **The cause as found**: in the checker, `Functionals.numeralResult` and `Functionals.joinInto` (`scala_src/typechecker/impls/Functionals.scala:1304-1313`, `:1334-1385`) had no case for a `LocalVarDecl`, a `LetFn` or a tuple, so `STypeChecker.checkExpr` (`STypeChecker.scala:538-539`) wrapped the whole block in the coercion, which `CoercionDesugarer.desugarTraitCoercion` (`CoercionDesugarer.scala:97-100`) wrote as a call on the block, and which `CodeGen.emitFnApp` (`CodeGen.java:7808-7819`) and `CodeGen.forFnRef` (`CodeGen.java:4147`) compiled as a call of the generic coercion's closure at its uninstantiated arrow type. A typed binding checks the numeral itself at its type (`impls/Decls.scala:407`), so its coercion's argument is the numeral, which the code generator folds (`CodeGen.java:7551-7574`).
2. **Rows 1014 and 1030**: each test fails on the base and passes after (above). **Row 1031**: its test passes after, and is promoted with the top-level form beside the block form.
3. **The three kin of rows 1043 and 340**: `XXXAtomicExprNumeralArms`, `XXXAtomicExprNumeralBody` and `XXXLabelNumeralValueCompiled` are unchanged, with the messages above.
4. **The compiled test of `u = 0` and `u =/= 0`**: `true` and `false` at `NN32` and `NN64` (`NumeralEqualsNumberCompiled`); at `RR32` the refusal 'Could not check call to operator NE' (`XXXNumeralNotEqualsFloatCompiled.test`, which also holds the same refusal at `RR64`), and the expected failure 'java.lang.StackOverflowError' of `c = 0` (`XXXNumeralEqualsRR32Compiled`); the Effect's sentence before and after, above.
5. **The bytecode of a function that returns a numeral with no local declaration before it**: `five(): ZZ32 = do 5 end` is `iconst_5`, `FZZ32.make`, `areturn` before and after; `six()` and `half()`, and the three classes of `PRunsToday`, are the same before and after by `javap -c -p`.
6. **The two stages** on the final tree: count 0 and distance 0 with `#crash none`, both equal to run 1's gate; the checker's time 109.5 s on the base and 98.4 s on the change, one run each, with identical results.
7. **A file edited beyond those named**: none. The edits are `scala_src/typechecker/impls/Functionals.scala`, the tests, and the named sentence of `changes.tex`.

None holds the push: no step was taken that cannot be undone or that acts against a decision on record.

## Decisions

1. **The repair is in the checker's join** (`Functionals.numeralResult` and `joinInto`), fork E1's checker half. Ways not taken: the code generator's `forFnRef`/`forFunctionalRef`, `for_RewriteFnApp`/`emitFnApp`, the coercion desugarer, and the checker's `Block` or `LocalVarDecl` case (above, "Where the fix belongs"). Evidence: the dumped tree, and the join's five existing result positions.
2. **A tuple converts element by element in the join**, an element that is neither a numeral result nor of its type by `coercions.buildCoercion`, as the oracle's tuple case does (`CoercionOracle.scala:193-194`). Way not taken: extending the oracle's tuple case to nested tuples, which reaches no tuple at a block's end, since the oracle is called on the whole block. At a type that is not a tuple type of the same length the join keeps the old reading (a tuple of the type stays), so that no place that runs today changes.
3. **The `if` form is in the promoted test**, not in a separate expected failure: the repair reaches it (`pick()` passes).
4. **The default at a place that fixes no type is not repaired** (`defaultNumeral`, `joinNumerals`, `tupleJoin`). Way not taken: the same two cases there, which would make `x = do k: ZZ32 = 3; 4 end` a `ZZ32` where it is a `NaturalNumeral[\1,10,4\]` today and runs (`println(x)` prints 4): a type that a numeral takes at a place that runs today, the section's reserved point. Recorded as NEW-E-2 with `XXXNumeralEndsUntypedBlockCompiled`.
5. **Cases beyond the brief's list in the promoted tests**: a numeral after a local function, a block as an argument, a block ending in a tuple as an argument, a tuple branch at an `if`'s other branch, row 1031's top-level form. Each failed on the base (runs above) and the repair reaches it, so each is home 1, in the test of its kind. Way not taken: leaving them out, which would leave measured defects without a home.
6. **`=` at `RR32` is row 528, not a new row**: row 528 holds `a = b` over `RR32` under the prelude, with a stale mechanism (`AbstractMethodError`); its test now dies with `StackOverflowError` (`junit.sh rr32-528`: `java.lang.StackOverflowError`, `Saw expected failure`). Its line is rewritten. Way not taken: the brief's NEW-E-2 for it, a second row for one defect. NEW-E-2 is the untyped block instead.
7. **The refusal test covers `RR64` too**, renamed `NumeralNotEqualsFloatCompiled`: the gap at `RR64` was met while trying a workaround and needs a home; both cases end together at the switch-over. Way not taken: a separate test for `RR64`.
8. **The refusal test is written in the folder's form for a refusal**, an `XXX`-named `.test` file over a plain-named component. Way not taken: a plain `.test` with `compile_err_contains`, which no compiled folder uses (`grep -l compile_err` over the plain `.test` files finds none).
9. **The timing's `change` run is the stage's after run**, timed. Way not taken: a third run. The `base` run was taken after the edit, on the base build's own code.
10. **Appendix I's Effect is narrowed with no `\revision` box and no decision record**: the language's text does not change, only the Effect's statement of what the implementations do (`specification.md`, "When the text and an implementation disagree").

## Defects and their homes

- Row 1014, a numeral that ends a block after a local declaration at a declared type: home 1, `NumeralEndsBlockAfterDeclarationCompiled`.
- Row 1030, a block that ends in a tuple with a numeral element, and its kin `nest()`: home 1, `BlockEndsInTupleOfNumeralCompiled`.
- Row 1031, a tuple binding with declared types over an `if` with tuple branches, in a block and at the top level: home 1, `TupleBindingIfBranchesCompiled`.
- The same blocks as a call's argument, and a tuple branch at an `if`'s other branch (no row held them; the same cause): home 1, in the two promoted tests.
- NEW-E-1, `=/=` at `RR32` and `RR64` refused under the prelude: home 3 (the specification does not say what the prelude declares; P-37 adds nothing to it), `XXXNumeralNotEqualsFloatCompiled.test`, which asserts today's refusal, and the new row.
- Row 528, `=` at `RR32` overflows the stack under the prelude: home 2, `XXXNumeralEqualsRR32Compiled` beside the row's own `XXXRR32EqualityRungV`; the row's line rewritten.
- NEW-E-2, the block after a local declaration at a binding without a declared type keeps its numeral type: home 2 (blocks.tex and P-173 settle it), `XXXNumeralEndsUntypedBlockCompiled` and the new row.
- Rows 1043 and 340's label case: unchanged; their tests stand.

## For FACTS

**A numeral at the end of a block, or in a tuple, converts where it stands on the compiled path.** At a declared type (a return type, a typed binding, a parameter, an `if`'s other branch) the compiled checker converts a numeral that ends a block after a local declaration, and each numeral element of a tuple, by the type's own coercion of the numeral itself, so the code generator folds it into a constant; at a place that fixes no type, a block after a local declaration keeps its numeral's own type (NEW-E-2). What it means: the workaround of binding such a numeral to a typed variable first is no longer needed at a declared type. Tests: `compiler_tests/NumeralEndsBlockAfterDeclarationCompiled`, `BlockEndsInTupleOfNumeralCompiled`, `TupleBindingIfBranchesCompiled`; `XXXNumeralEndsUntypedBlockCompiled`. Detail: this report, "What changed and why".

## Commands worked out

- The checker's tree of a program: `bin/fortress typecheck -out P.tc.tfs P.fss` writes the type-checked tree as text, coercion nodes included.
- A JFR profile of the count stage without editing its script: `JAVA_TOOL_OPTIONS="-XX:StartFlightRecording=filename=<dir>/count-%p.jfr,settings=profile" explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`; `%p` keeps `javac`'s recording apart from the checker's, and `jfr view hot-methods <file>` gives the top frames.

## Questions for the curator

None.

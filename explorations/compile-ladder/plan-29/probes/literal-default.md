<!-- Reading B's compiled side built in a prototype and measured, for the curator's decision on a numeral where nothing fixes a type, by an Opus worker for climb batch 29's planning, 2026-11-08, on the base `8cde0b2c4f` (base build `/home/user/fortress-base29`): the one library's `FloatLiteral` apart with its literal `=` pairs dropped, the checker's default at untyped bindings, `Any` parameters, static arguments, receivers and ties with the literal types unwritable, the fold of numeral expressions and of a numeral's coercion into a constant rounded once, `IntLiteral`'s 21 glue bindings removed, and a numeral's own default ranking as no coercion; count and distance stay 0 and 0, 27 compiled and 4 library tests fail against the gate's none, walk fails 71 of 791 on the library change alone, and with the pairs dropped the library's comparisons with a numeral reach the `=` over `Any`; the code is not committed, its patch is `literal-default.patch` beside this report. -->

# Reading B, built: a numeral's default on the compiled path

**What was asked.** Build reading B's compiled side as `explorations/reviews/literal-fork-2026-11-08.md` §4.2 and §6.3 (rungs 2 to 4) lay it out, in four steps, measuring after each, with test programs written first; then measure the lines, the count and distance stages, the checker's time, the compiled suites, the walk suite after the library change, the library's own numerals that the default retypes, and microGPT. The coordinator added, during the work: a program's own number type (`CC64`), an interval type, a bfloat16 type, and, by reading, a hybrid that lets a program's type receive a numeral's exact value (sections 6 and 7).

**Trees, tools, files.**
- Base: `8cde0b2c4f`, main's head when the work started. The base build is `/home/user/fortress-base29`, made by `references/worktrees.md` (`ant compileAll` 50 s, the library order, `bin/fortress ProjectFortress/tests/BooleanOps.fss`, `git status --porcelain` empty, 282 MB). `df -P /home/user` before it: 21,477,916 KB available. It is kept for batch 29.
- The prototype ran in `/home/user/fortress-proto-b`, seeded from it by `seed-worktree.sh` in 4 s, and only there. The worktree and its caches are removed; the patch keeps the code.
- Machine for every run: `nproc` 4, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1` except the suites (4).
- The checker against the one library was read through the count stage's driver, `explorations/coordinator/tools/checker-count/WorldFlip.java`, with `-stop check`, as the review did (§3.1); a static type is read from a refused binding `s: String = e`.
- The prototype prints where it applied a default when the environment sets `FORTRESS_LITERAL_TRACE` (`LiteralDefaults` in `Functionals.scala`, in the patch): one line `LITERAL-DEFAULT <span> <type> at <place>` for each default that the checked component keeps. Section 5 is built from those lines.
- Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. Every claim about the prototype's code cites the patch; lines in `Library/` are the worktree's after the step named.

## 1. What I built, step by step

The steps are cumulative. The lines are `git diff --stat` in the worktree after each step (section 3.1 gives the areas).

### Step 1, the library: `FloatLiteral` apart, its coercions, the float tie rule, the literal `=` pairs dropped

- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and `.fss`: `value object FloatLiteral extends RR64` becomes `value object FloatLiteral extends Number`, which declares its own `asFloat(self): Float` (P-165). It stays an object, not the prelude's trait: walk makes `FFloatLiteral` values through its native constructor `interpreter/glue/prim/FloatLiteral.java` and calls its three glue bindings (section 4.5). An object excludes every type it does not extend, so `excludes { RR32, RR64 }` holds without the clause.
- `RR64` (`Library/FortressLibrary.fsi`, `.fss`): `comprises { Float }`, and `coerce(x: FloatLiteral) = asFloat(x)`, one rounding (walk's `FFloatLiteral.getFloat` is `Double.valueOf` of the text).
- `QQ`: `coerce(x: FloatLiteral) = numeralRatio(x.asString)`, exact: a new private function of 14 lines reads the decimal text into `n / d`.
- `RR32`: `coerce(x: FloatLiteral) = narrow(asFloat(x))`. Under walk this rounds twice; the compiled path folds it with one rounding (step 3). One rounding under walk needs a float parse of the text, which no helper has (`nativeHelpers` has `simpleDoubleArith.parseDouble` only).
- The `=` pairs over the literal types dropped, 15 in each of the api and the component: `RR64`'s, `QQ`'s, `ZZ32`'s, `ZZ64`'s, `NN64`'s, `ZZ`'s and `NN32`'s `opr =(self, b: IntLiteral)`, and `IntLiteral`'s own eight. No `=` pair over `FloatLiteral` was added.
- The float tie rule, in the checker (`impls/Functionals.scala`, `isNumeral` and `numeralReading`): a numeral with a radix point counts as a numeral at a tie and reads as `RR64`. I put it in step 1 because the library change alone makes ties (step 1a below).
- `Float`'s `asFloat(self)` returns `RR64` instead of `Float` (`FortressBuiltin.fss:82`): with `RR64` comprising `Float` alone the checker reads the two domains as equal and asks each return type to fit the other (step 1b below).
- Lines: 5 files, +46 −41 (the library 4 files, the checker's tie rule 19 lines of `Functionals.scala`).

### Step 2, the checker: the default at each kind of place, the literal types unwritable

All in `scala_src/typechecker/` (the patch):
- `defaultNumeral` (`impls/Functionals.scala`): an expression whose type is `IntLiteral` or `FloatLiteral` becomes a coercion to `ZZ32`, or `ZZ64` or `ZZ` by its value, or `RR64`, through `numeralReading` and `coercions.buildCoercion`. It is applied:
  - at an untyped binding, top level and local, one variable or several (`impls/Decls.scala`, the four sites the review names);
  - at a parameter that the numeral fits without conversion, `Any`, `Object`, `Number`, where the default fits too (`defaultAtUnfixed`): in `checkApplicableWithoutInference`, in its `AnyType` domain branch (a lone `Any` parameter skipped the argument loop), and after inference in the coercion attempt;
  - at a static argument that numerals alone fix: such a parameter's candidate types are the default alone (no context) or no literal type (with a context), a numeral at a bare static parameter takes its default before the subtyping inference (no context), and a subtyping inference that still yields a literal static argument is refused so that the coercion attempt reads it;
  - at a dotted receiver written as a numeral, `(3).zero`, where the default type has the member (`defaultReceiver`); where it has not, the numeral stays, because the prelude itself writes `(1).asNN32` (`LibraryBuiltin/CompilerBuiltin.fss:812`, `:814`) and `ZZ32` there has no `asNN32`;
  - at a tie (`numeralTie`): each numeral read at its default, the candidates that the arguments so read fit without coercion, then those where only the numerals' positions fit without it.
- The default ranks as no coercion: `counted` (`Functionals.scala`) and `moreSpecificCandidate` (`useful/STypesUtil.scala`) skip a coercion that `LiteralDefaults` made.
- A typed place whose type declares no coercion from the literal type but one from its default takes the default, then that coercion (`viaDefault` in `CoercionOracle.buildCoercion`). This is what lets a program's own type take a numeral (section 6).
- `IntLiteral` and `FloatLiteral` cannot be written outside the library's own files (`TypeWellFormedChecker.scala`): "IntLiteral cannot be written in a program: a numeral has its own type only while the checker types the program." A file counts as the library's when its path holds `/Library/` or `/LibraryBuiltin/`; a type is written by the program when its span's file is the unit's own.
- Joins (`if`, `case`) are not built: an untyped binding of a join of numerals coerces the whole expression, so its branches still make literal values.
- Lines: the whole tree 11 files +231 −59 after step 2.

### Step 3, the fold

- `compiler/desugarer/IntegerLiteralFoldingVisitor.java` (the phase before the checker): an expression of numerals alone folds exactly into one numeral, the Working Draft's static expressions (`Specification-1.0-frozen/basic/expressions/constant.tex`, "Static Expressions"; `literals.tex:163-173`): `+`, `-`, multiplication, `/` by a nonzero numeral, `^` by an integer numeral (an integer base takes no negative exponent; exponents beyond 4096 do not fold), and a prefix `-` on a float numeral. A result that IEEE arithmetic could make a negative zero does not fold, so `-0.0` stays `-(0.0)` (`StrictEquivalenceRuleCompiled` asserts `0.0` and `-0.0` are not `SEQV`). A result with a radix point, or a quotient, is a numeral with a radix point: in decimal where the denominator divides a power of ten (`10.0^(-5)` becomes `0.00001`), else with the denominator as its base (`1/3`). The visitor's earlier integer folds (comparisons, `DIV`, `MIN`) stay.
- `compiler/desugarer/CoercionDesugarer.scala`: a coercion of a numeral into `ZZ32`, `ZZ64`, `NN32` or `NN64` within the type's range, into `ZZ`, or into `RR64` or `RR32` becomes the numeral typed at that type (`CoercionDesugarer.foldsTo`). Out of range, the coercion call stays, and raises at run time as today.
- `compiler/codegen/CodeGen.java`: `forIntLiteralExpr` and `forFloatLiteralExpr` emit a typed numeral's constant, `FZZ32.make(int)`, `FZZ64.make(long)`, `FNN32`, `FNN64`, `FZZ.make(String)`, `FRR64.make(double)`, `FRR32.make(float)`, the floats by one rounding of the exact rational (`roundToDouble`, `roundToFloat`: a quotient of at least 56 or 28 bits with a sticky bit, rounded by `BigInteger.doubleValue`/`floatValue`, scaled by `Math.scalb`). A numeral still of its own type gets the same one-rounded double (row 862). `QQ` is not folded: the prelude has no `QQ` to test it against, so a numeral at a `QQ` place still calls the coercion with a literal value.
- `compiler_tests/XXXFloatNumeralOneRounding` promoted to `FloatNumeralOneRounding` (three files, as `tests-writing.md`, "Promoting an XXX test", says).
- Lines: the fold 3 files +206 −5.

### Step 4, `IntLiteral`'s glue and run-time arithmetic removed from the one library

- `FortressBuiltin.fsi` and `.fss`: `value object IntLiteral` becomes `trait IntLiteral extends Number excludes { AnyIntegral, QQ, RR64 }` with `zero`, `one`, the five conversions as Fortress text over an abstract `asZZ`, `asString`, `asExprString` and `asFloat(self): RR64 = asFloat(self.asZZ)`. Its 21 glue bindings (`ToZZ`, `AsFloat` and the 19 operators on `interpreter/glue/prim/IntLiteral`) and every operator and comparison go (the script counted 21 `glue.prim.IntLiteral$` strings removed).
- `AnyIntegral`'s `coerce(x: IntLiteral)` compares `x.asZZ`, not `x`, since `IntLiteral` has no comparisons left.
- `FloatLiteral`'s 3 stay (section 4.5).
- Lines after step 4: the library 4 files +39 −139.

### Step 5, not in the brief: a numeral's coercion into its own default ranks as no coercion

Section 5 found that after step 4 the one library's `r=0` for `r: ZZ` reaches the `=` over `Any`. Step 5 marks a coercion of a numeral into its default type, built anywhere by `buildCoercion`, as no coercion (`CoercionOracle.defaultName`, `LiteralDefaults.mark`), so that `ZZ`'s `opr =(self, b: ZZ32)` fits `r = 0` as it is and, being more specific, is chosen. About 20 lines in `CoercionOracle.scala` and `Functionals.scala`. Its measurements are section 4's last rows.

## 2. The tests, written first

New compiled tests, under `ProjectFortress/compiler_tests/` (in the patch):
- `LiteralDefaultCompiled` (`link`, `run`): `x = 3` a `ZZ32`, `y = 0.5` an `RR64` (top level and local), `bigN = 3000000000` a `ZZ64`, `Cell(3)`, `Cell(x)` a `Cell[\ZZ32\]` and `Cell(0.5)` a `Cell[\RR64\]` (read by dispatch on `kind(c: Cell[\ZZ32\])` beside `kind(c: Any)`), `f(3)` and `f(0.5)` at `Any`, `pick(3, 4)` a `ZZ32,ZZ32`, `3 SEQV z`, `x SEQV z`, `y SEQV w` true (by `equality.sEquiv` bound at `Any`), `g(bigN)` and `g(3000000000)` both `g ZZ64` (row 946). Types are read with `stringOps.typeName` bound at `Any`, as `AnyNativesIntrinsicCompiled` does.
- `LiteralFoldCompiled`: `3 + 4` a `ZZ32` at `Any`, `2^40` a `ZZ64` equal to `1099511627776`, `1/2 = 0.5`, and the 17-digit `0.77425264282026984` at `RR64` and untyped, equal to the double `0.7742526428202698` (today's code generator gives `0.7742526428202697`; found by a scratch search over random 17-digit numerals).
- `XXXLiteralTypeUnwritable` (`compile`, `compile_err_contains`): `x: IntLiteral = 5` refused.
- `LiteralOwnNumberCompiled`: section 6.
- The prelude has no lists, no `QQ`, no coercion from `IntLiteral` or `ZZ32` into `RR64`, so `<|1,2,3|>`, `q: QQ = 0.5`, `1 - b` and `1.0 s` cannot be compiled tests before the switch-over. I checked them on the one library's checker instead (section 4.4), with a probe program that the report quotes and the patch does not hold.

The failing run, on the base's code, before any edit (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fail0 ProjectFortress/compiler_tests LiteralDefaultCompiled.test LiteralFoldCompiled.test XXXLiteralTypeUnwritable.test FloatNumeralOneRoundingLink.test XXXFloatNumeralOneRounding.test`):

    . run ProjectFortress/compiler_tests/LiteralDefaultCompiled (401ms) FAIL:  IntLiteral =/= ZZ32; x = 3 binds a ZZ32
    . link ProjectFortress/compiler_tests/LiteralFoldCompiled ProjectFortress/compiler_tests/LiteralFoldCompiled.fss:15:10-12:
        - (RR64, RR64)->RR64 is not applicable to an argument of type (IntLiteral, IntLiteral).
    2) ProjectFortress/compiler_tests/XXXLiteralTypeUnwritable(...)AssertionFailedError: Saw wrong failure. compile
    Tests run: 7,  Failures: 4,  Errors: 0

and `LiteralOwnNumberCompiled` on the base (`junit.sh fail1`): "`LiteralOwnNumberCompiled.fss:13:13: Right-hand side has type IntLiteral, but declared type is CC64.`", five such, "File LiteralOwnNumberCompiled.fss has 5 errors."

The passing run, after step 3, with the promoted test (`junit.sh q7` over the same files and `LiteralOwnNumberCompiled.test`): "`OK (10 tests)`"; after step 5 (`junit.sh chk5`): "`OK (10 tests)`".

## 3. Lines

### 3.1 By area, after step 5 (`git diff --stat 8cde0b2c4f`)

- The checker (`scala_src/`, `STypesUtil.scala` included): 7 files, +219 −25. The review's estimate was 80 to 120 lines (§4.2). The excess is the static-argument and tie cases (section 1, step 2), each of which a measured test needed.
- The fold (`compiler/desugarer/`, `compiler/codegen/`): 3 files, +206 −5. The estimate was 65 to 105 lines plus the fold of numeral expressions (§4.2).
- The library (`Library/`, `LibraryBuiltin/`): 4 files, +39 −139.
- The tests (`compiler_tests/`): 15 files, +151 −12: 4 new compiled tests (8 files), the promotion (3 files), and 3 existing tests respelled (section 4.3).
- In all, 29 files, +615 −181 (`git diff 8cde0b2c4f --stat`, the new tests marked with `git add -N`).

### 3.2 By step

    step 1:  5 files changed, 46 insertions(+), 41 deletions(-)
    step 2: 11 files changed, 231 insertions(+), 59 deletions(-)
    step 3: 17 files changed, 442 insertions(+), 69 deletions(-)
    step 4: 17 files changed, 454 insertions(+), 173 deletions(-)
    step 5: 20 files changed, 475 insertions(+), 180 deletions(-)

(tracked files only; the new test files are in the patch through `git add -N`).

## 4. Measurements

### 4.1 The count stage and the distance stage

The record's last figures: 0 and 0 at climb batch 28's gate (F-53). Commands, from the worktree's root after the setup lines: `explorations/coordinator/tools/checker-count/run.sh tmp/count/<N>.txt tmp/count/<N>` and `explorations/coordinator/tools/distance/run.sh tmp/dist/<N>.txt tmp/dist/<N>`.

- **Base** (the worktree before any edit): count `#total 0`, `#locations 0`; distance `#total 0`, "`#seconds 193 FortressLibrary 119`".
- **Step 1a, the library alone, before the tie rule**: count `#total 2`, two ties at `0.0/0.0` (`Library/FortressLibrary.fss:3672`, `:3679` at the base, `BIG MINNUM` and `BIG MAXNUM`):

      Library/FortressLibrary.fss:3686:75-80:
          Ambiguous coercion in call to operator /: of the declarations applicable to an argument of type (FloatLiteral, FloatLiteral) only by coercion, none is more specific than every other: (RR32, RR32)->RR32; ((QQ & {Ratio}), QQ)->QQ.

- **Step 1b, with the float tie rule**: count 0; distance `#total 1`:

      return-type	asFloat	-	component FortressBuiltin	overloading	FortressBuiltin.fss:82,FortressLibrary.fsi:322	For asFloat, the return type of (RR64 & {Float})->RR64 @ FortressLibrary.fsi:322:5-32 should be a subtype of the return type of Float->Float @ FortressBuiltin.fss:82:5-83:40

- **Step 1c, `Float`'s `asFloat` at `RR64`**: count 0; distance 0 ("`#seconds 179`").
- **Step 2, the checker**: count 0, distance 0 ("`#seconds 171 FortressLibrary 108`").
- **Step 3, the fold**: count 0, distance 0 ("`#seconds 170`"). The fold of numeral expressions runs before the checker in both stages (`WorldFlip -stop check` and `DistanceMulti -order check` both run INTEGERLITERALFOLDING), so both read it; it changed neither total.
- **Step 4, the glue removal**: count 0, distance 0 ("`#seconds 164 FortressLibrary 103`").
- **Step 5**: count 0, distance 0 (4.6).

On the way, an intermediate checker state gave a count of 38: `i=0` for `i: ZZ32` in the library tied between `ZZ32`'s `=` and `ZZ64`'s `=(self, b: NN32)` once the default at `Any` ranked as a coercion ("Ambiguous coercion in call to operator =: ... (ZZ32, IntLiteral) ...", 17 locations). The tie rule of step 2 and the ranking of the default as no coercion removed them; the numbers above are the final code of each step.

### 4.2 The checker's time

`time explorations/coordinator/tools/checker-count/run.sh $W/tmp/count/$N.txt $W/tmp/count/$N`, one run each, nothing else of mine running:
- `base` (before any edit, load 0.10 at start): "`real 2m2.389s`, `user 3m13.907s`".
- `change` (after step 2's final code, the load at its start not recorded): "`real 1m52.286s`, `user 2m57.041s`".
- After step 3: "`real 1m46.824s`". Earlier runs of intermediate states took 46 s to 83 s; the run-to-run noise is larger than any difference. No slowdown of several times.
- I made no second pass for speed and took no profile (`compiler.md`, "The checker's time", steps 3 to 5): this is a prototype, not a change to land.

### 4.3 The compiled suites

Before: the last landed gate, `explorations/compile-ladder/climb-batch-28/gate/summary.txt` (`f56d6516c4`), holds for the base: `git diff --name-only f56d6516c4 8cde0b2c4f -- ProjectFortress Library build.xml`, without test files, prints nothing. Its rows: `fast-compiler/CompilerJUTest 1475 0`, `fast-library/LibraryJUTest 86 0`, `fast-othercompiler/OtherCompilerJUTest 263 0`, the misc track 0 failures.

After step 2 (`ant testFast`, log `testFast-chk2f`):

    [junit] Tests run: 1482, Failures: 37, Errors: 0   (compiler)
    [junit] Tests run: 86, Failures: 4, Errors: 0      (library)
    [junit] Tests run: 263, Failures: 0, Errors: 0     (othercompiler)
    BUILD FAILED

After step 3: compiler "`Tests run: 1483, Failures: 35`" (`LiteralFoldCompiled`'s two cases pass, and the promoted test runs one case more), library 86 and 4, othercompiler 263 and 0. One misc case errored, `ArrayStoreJUTest.testFourTasksAddIntoOneElementInsideAtomic`, at 60 s under the four tracks' load; alone (`ant testOnly -DtestPattern=ArrayStoreJUTest`) "`Tests run: 6, Failures: 0, Errors: 0`". No code of the prototype reaches it. Step 4 changes only the one library, which no compiled test reads before the switch-over, so I did not run the compiled suites after it. Step 5: see 4.6.

What flips or breaks, against the review's prediction (§4.3, §6.3):
- **Predicted, as predicted.**
  - `InferCoercionShapes:72`, `pick(3, 4)`: "`FAIL: ZZ32,ZZ32 =/= IntLiteral,IntLiteral`" (`junit.sh pred`, after the respelling below).
  - `InferO2Num:20`, `op(1, 2)`: "`FAIL: op generic[ZZ32,ZZ32] =/= op generic[IntLiteral,IntLiteral]`".
  - `XXXApplicationErrors.test` (`Compiled7.ApplicationErrors`): its pinned "No such method IntLiteral.foo." and "x: IntLiteral after argument inference" change: "Saw wrong failure. compile".
  - The seven team tests that write `IntLiteral`: `Compiled5.ah:17`, `5.aj:18-19`, `5.ak:21`, `6.az:15`, `9.g:18-19`, `9.j:17`, `9.p:18-19`, `:26`, each "IntLiteral cannot be written in a program".
- **Predicted, otherwise than predicted.**
  - `InferO2Pos:18`, `gg(5, w)`: the review predicted `gg plain[ZZ32,ZZ64]`; the prototype gives "`gg generic[ZZ32,ZZ64]`", and `:19`, `ee(5)`, gives `1` where the test asserts `2`. The declaration with a `ZZ32` parameter, `gg[\T extends Number\](x: ZZ32, y: T)` and `ee[\nat n\](x: ZZ32)`, now runs instead of the one over `Any`. Under B the numeral is a `ZZ32`, so both declarations fit it as it is, and the narrower wins. The test's message says "a declaration that fits the call as it is runs" (P-49), which both now do. I respelled `:18` to the review's prediction, so the patch's `InferO2Pos` fails, and I did not isolate which part of step 2 makes the choice (section 9).
- **Not predicted.**
  - Two more team tests write `IntLiteral`: `Compiled9.t:24`, `:37` and `Compiled9.u:27`.
  - Two more team tests pin a numeral's type in a message: `XXX6at.test` (`Compiled6.at.fss:29`, `:33`, a tuple assignment's "of type IntLiteral" becomes "of type ZZ32") and `XXX6bw.test` (`Compiled6.bw.fss:17`, `b = 1` then `a := b`: "Could not assign an expression of type ZZ32 to variable a of type String").
  - Eight of the revival's tests name `IntLiteral` in a `typecase` arm of a helper, which is now refused before their asserts run: `InferCoercionShapes:44`, `InferO2Meet:11`, `InferO2Num:10`, `InferO2Pos:12`, `InferO2Z64:10`, `InferOpAnyZW:10`, `InferResultOnlyLabelBody:9`, `XXXNumeralBeyondWidthMax:9`; and in `library_tests/`, `IntLiteralArithRung7:35`, `IntLiteralRung6:41`, which write `IntLiteral` as a type. I respelled the arm in the three predicted tests only (`IntLiteral => "IntLiteral"` became `Boolean => "Boolean"`, keeping the lines), and set `InferCoercionShapes:72` and `InferO2Num:20` to the measured `ZZ32` answers; both then pass (`junit.sh pred2`).
  - `XXXInferComboCap` turns red: "Saw wrong failure. compile". Row 506's refusal beyond 64 combinations no longer triggers for four numerals, since a parameter that numerals alone fix has one candidate type, its default.
  - `XXXNumeralPrintRungR` turns red: "Did not see expected failure"; the run prints "`a numeral juxtaposed:  2.5`". Row 362's `NullPointerException` on rendering a float numeral does not arise, since `2.5` at the prelude's `Object` parameter is now an `RR64`.
  - `XXXFloatNumeralOneRounding`, promoted (row 862).

### 4.4 The checker against the one library: B's answers

`LitBOne.fss` (scratch), checked by `WorldFlip -stop check` after step 3 (`wf.sh chk3`), each line a refused `s: String = e` or a typed binding:

    :15 x = 3              Right-hand side has type ZZ32
    :16 y = 0.5            ... RR64
    :17 bigN = 3000000000  ... ZZ64
    :19 l4 = <|1, 2, 3|>   ... List.List[\ZZ32\]
    :20 Cell(3)            ... Cell[\ZZ32\]
    :21 Cell(0.5)          ... Cell[\RR64\]
    :22 x + 1              ... ZZ32
    :23 y + 0.25           ... RR64
    :24 1 - b              ... RR64            (b = 0.9)
    :25 1.0 s              ... RR64            (s: ZZ32)
    :29 (3).zero           ... ZZ32
    :32 q: QQ = 0.5, then q   ... QQ
    :33 qy: QQ = y         Right-hand side has type RR64, but declared type is QQ.

and the trace for `h = (1/2 = 0.5)`: "`LITERAL-DEFAULT LitBOne.fss:34:8-10 RR64 at parameter Any of (Any, Any)->Boolean`" and the same at `:34:14-15`: the fold makes `1/2` the numeral `0.5`, both sides default to `RR64` at the `=` over `Any`, and `SEQV` of two equal doubles is `true` (by reading; no compiled run on the one library exists). `3 + 4`, `2^40`, `1/2`, `7/2` and `10.0^(-5)` are each a single numeral after the fold: at the refused `String` binding they show their own type (`IntLiteral`, `IntLiteral`, `FloatLiteral`, `FloatLiteral`, `FloatLiteral`), the numeral's type while the checker types it. Before the fold (step 2), `1/2` and `7/2` were `QQ`. So with the fold, `x = 7/2` is an `RR64` `3.5`, where the one library gives a `QQ` today (section 10, decision 4).

Before (the review, at `157323e5`, §3.4): `x` `IntLiteral`, `y` `FloatLiteral`, `<|1, 2, 3|>` `List[\IntLiteral\]`, `Cell(3)` `Cell[\IntLiteral\]`, `x + 1` `IntLiteral`, the ties `RR64`, `q: QQ = y` refused with `FloatLiteral`.

### 4.5 Walk

`ant testSystem` once, after step 1b (the library change, the float tie rule being checker-only), log `testSystem-lib1b`:

    [junit] Tests run: 197, Failures: 12 ... Tests run: 194, Failures: 22 ... Tests run: 195, Failures: 20 ... Tests run: 205, Failures: 17
    BUILD FAILED

71 of 791 tests fail. The gate's were 791 and 0. Their messages are almost all walk's "Ambiguous coercion": walk has no float tie rule, and with `FloatLiteral` apart `0.5 + 0.25`, `-0.5`, `2.0 n`, `x^2` and `3 0.5` each fit `RR64`'s, `QQ`'s and `RR32`'s declarations by coercion (counted from the log: 108 lines hold "mbiguous"; the commonest are `/`, prefix `-`, juxtaposition, `^` and `+`). A few fail an assertion instead. The 71: `AnyNativesIntrinsicWalk ArrayElementAlgebra ArrayFactoryAbstractNumber ArrayOperatorsBesideLibrary ArrayScalarExtension ArrayStoreRR64Walk ArrayStoreWalk Brackets ComparisonAtNaNWalk CovCollTest CovariantTest ExportAlignedMembersWalk FlatTowerRungF FloatNextUpSignedZeroWalk GeneratorDeclarations InferUnfixedFBoundedWalk IntLiteralValue IntegerPowerContractWalk LibraryOverloadFamilies NativeHelperBindingWalk NativeHelperFamilyAsFloatWalk NativeHelperFamilyFloatBitsWalk NativeHelperFamilyFloatWalk NativeHelperFamilyRR32Walk NativeHelperFamilyZZ32Walk NativeHelperFloatCarriedWalk NativeHelperFloatMixedWalk NativeHelperRationalArgumentWalk NumberEqualityOwnTypeWalk NumberMixedEqualityWalk NumberOrderListDeclarations NumberPrintTest NumeralTest QuickCheckTest RR32MixedRungF RR32SiblingRungV ReflectTest ReflectiveQuickCheckTest ResultBoundsRungB RoundHalfEvenRungR SkipListTest StrictEquivalenceRuleWalk TabulateRungA TimingTests TupleIndexBoundWalk TupleOrderBounds UnwrittenEmptyFloatSumWalk VectorMatrixCastsWalk VectorNormElementTypesWalk WordCountSmall asifTest caseTest commonSuper compoundArray expTest formatTest generatorTest genericTest3 juxtTwice nativeTestFn oprTests quicksortTest realArith sequivTest simpleBig simpleExp simpleSum stringJuxt testRR32 typecaseSelf vectorOps`. So the library half of `FloatLiteral` apart cannot land without walk's float tie rule (the review's A rung 2 and B rung 2 both name it); B's walk rung 5 (F-c) would make most of these moot.

After step 4, the walk tests that name the literal types (`harness-one.sh tmp/h4` over 12 files): 6 fail. `IntLiteralValue:20`, `NumberMixedEqualityWalk:7`, `IntegerPowerContractWalk:94` and `IntLiteralTextWalk:17` stop with "`undefined variable [IntLiteral]`", the object being gone; `IntLiteralTextWalk` is the only one of them not already among the 71. `FlatTowerRungF:72` ("Ambiguous coercion, args = (3: ZZ32,0.5)") and `NumberPrintTest` fail as after step 1. `XXXextendIntLiteral` and `XXXextendFloatLiteral` still see their expected exception; `ReflectiveNumberTypes`, `IntegerConversionsWalk`, `setMakerTest0` and `TupleOrderMixedRefused.test` pass.

What walk still needs `FloatLiteral`'s 3 for: walk evaluates a float numeral to an `FFloatLiteral` (`interpreter/evaluator/Evaluator.java:1632`), whose run-time type is the object `FloatLiteral`, made by the native constructor `interpreter/glue/prim/FloatLiteral.java`. Its `asString` and `asExprString` (`FloatLiteral$ToString`) print a bare numeral as written, which `NumberPrintTest:16` asserts, and its `asFloat` (`FloatLiteral$AsFloat`) is what `RR64`'s and `RR32`'s new coercions call, and what `QQ`'s reads through `asString`. Until walk's float default lands (B's rung 5, F-c or the place-by-place way), every walk float numeral is such a value, so the three cannot go.

### 4.6 Step 5

Step 5's own measurements, with the code final:
- Count 0 ("`real 1m46.366s`"), distance 0 ("`#seconds 181 FortressLibrary 115`").
- The one-library probe `LitBOne.fss` gives the same types as after step 3 (`diff` of the two outputs, trace lines aside, prints nothing).
- My tests: "`OK (10 tests)`" (`junit.sh chk5`).
- The default sites of `FortressLibrary` fall from 81 to 46, the `=` over `Any` from 65 to 18 (section 5).
- `ant testFast`: compiler "`Tests run: 1483, Failures: 27`", library "`Tests run: 86, Failures: 4`", othercompiler "`Tests run: 263, Failures: 0`", the misc track clean. The 8 fewer failures than after step 3 are the three respelled tests (`InferCoercionShapes` and `InferO2Num` pass; `InferO2Pos` keeps 1, its `run`, section 4.3); no other compiled test changed its verdict between step 3 and step 5.
- The failures after step 5, by test: `Compiled5.ah`, `5.aj`, `5.ak`, `6.az`, `9.g`, `9.j`, `9.p`, `9.t`, `9.u` (the literal types written), `Compiled6.at`, `Compiled6.bw`, `Compiled7.ApplicationErrors` (pinned texts), `InferO2Meet`, `InferO2Z64`, `InferOpAnyZW`, `InferResultOnlyLabelBody`, `XXXNumeralBeyondWidthMax` (an `IntLiteral` arm in a helper), `InferO2Pos` (the choice of section 4.3), `XXXInferComboCap`, `XXXNumeralPrintRungR`; in `library_tests/`, `IntLiteralArithRung7` and `IntLiteralRung6`.

### 4.7 microGPT

Measured once, after step 4, on the compiled path (the prelude), each component compiled from its own directory with a private copy of the worktree's caches, as the gate's `microgpt-phase.sh` does (scratch `mg.sh`):

    explorations/run-c4/src  FlatArrays.fsi  rc=255  Array is undefined.
    explorations/run-c4/src  MicroGptFlat.fss  rc=255  DelegatedIndexed is undefined.
    explorations/apl/mg  AplMg.fss  rc=255  Vector is undefined.
    explorations/apl/mg  MicroGptApl.fss  rc=255  ImmutableArray is undefined.

All 18 end with rc 255 at name resolution ("X is undefined"), the phase `disambiguate` that the baseline's `microgpt-phase.md` gives for every one (F-97). The disambiguator runs before the fold and the checker, so nothing of the prototype reaches them; the first message differs from the baseline's in some files (`MicroGptFlat.fss`: "DelegatedIndexed is undefined", the baseline "ImmutableArray is undefined"), which is the order of the same phase's errors.

Against the one library (`WorldFlip -stop check`, after step 4, with the trace):
- `MicroGptFlat.fss` stops in its own api before its numerals: "`explorations/run-c4/src/FlatArrays.fsi:15:15-27: Ill-formed type: Array[\RR64,I\] The static argument I does not satisfy the corresponding bound Index.`" (P-156's bound, which the model's `FlatArrays.fsi` does not write). No default site printed.
- `MicroGptApl.fss`, which imports a DSL grammar, ends in the driver: "`java.lang.IllegalArgumentException: Parameter 'apiName' to the IdOrOpOrAnonymousName constructor was null`".

So I could check none of the model's numerals under B. By reading, the review's §5.1 stands: its untyped bindings (flat `:17-18`, `bsz = 1`, APL `:112` `sf = 1.0 s`) take `ZZ32` and `RR64`; `1 - beta1`, `beta1^t`, `1.0 headDim` and `1.0 s` read `RR64` by the float tie rule (4.4 shows `1 - b` and `1.0 s`); and the fold makes `10.0^(-5)` and `10.0^(-8)` the numerals `0.00001` and `0.00000001`, each rounded once to `RR64`, the double that `Math.pow(10.0, -5.0)` gives (review §5.1). No line of either program needs a change.

## 5. The library's own numerals that the default retypes

From the checker's output, `FORTRESS_LITERAL_TRACE=1 java ... WorldFlip -stop check <component>`, on the `FortressLibrary` component, and on `String` at step 2:

- `Library/String.fss:21`, `maxFib = 46`: "`ZZ32 at an untyped binding`", the one the review named; and `:314`, `:315`, `assert(self.depth, 0, self)`, `assert(self.size, 0, self)`: "`ZZ32 at parameter Any of (Any, Any, Any...)->()`".
- `Library/FortressLibrary.fss`, after step 4: 81 sites.
  - 65 at "`parameter Any of (Any, Any)->Boolean`", the `=` over `Any` (`FortressLibrary.fsi:69`), or the `=/=` beside it: the `=` pairs over `IntLiteral` being dropped, these 65 comparisons of a value with a numeral reach it, and the numeral takes `ZZ32` there. Among them are comparisons of a `ZZ` with a numeral in `QQ`'s and `ZZ`'s own code: `:554` `if r=0 then (q,1)` (`r = nl MOD dl`, `ZZ`), `:602` `(b=0 AND d=0 AND a=-1 AND c=1)` in `QQ`'s `<`, `:650`, `:655`, `:665`, `:666` `denominator(self) = 0`, `:1163` `if g=0` in `ZZ`'s `/` (`g = self GCD other`). The rest compare `ZZ32` values and `nat` parameters used as values (`s0=0`, `i=0`, `|self| = 0`).
  - 14 at an untyped temporary of the chain desugarer, as `0 <= r < s0` (`:2550`, `:2863`, `:2864`, `:3282` to `:3284`, `:4554`, `:4748`).
  - 2 at `cast[\T\](0)`, `cast[\T\](1)` (`:3587`, `:3604`), the `else` arms of `additiveIdentity` and `multiplicativeIdentity`, so a type other than the eight listed gets a `ZZ32` cast to `T`.
- After step 5: 46 sites: 18 at the `=` or `=/=` over `Any`, 14 chain temporaries, 12 at "`parameter Any of (String, Any)->String`" (string juxtaposition of `nat` parameters, `:2532`, `:2840`, `:3250`), 2 at `cast`. The `ZZ` comparisons `:545`, `:554`, `:602`, `:622`, `:650`, `:655`, `:665` and `:1163` no longer reach the `=` over `Any`; `:585` and `:666` (`=/=` of a `ZZ` with `0`) still do.

What a `ZZ` compared with a `ZZ32` default at the `=` over `Any` answers, by reading: the compiled dispatch tests the arguments' run-time types from the most specific declaration to the least (`SKILL.md`, "The compiled runtime"), so `r = 0` with `r: ZZ` and `0: ZZ32` reaches `ZZ`'s `opr =(self, b: ZZ32)` (`FortressLibrary.fsi`, one of P-165's 42) and compares values. A type with no `=` pair at `ZZ32`, which `NN32`, `NN64` and `RR32` are, since they take no coercion from `ZZ32` (P-74; `FortressBuiltin.fsi`, their coercions and `=` pairs), falls to `SEQV` and answers `false` for `u = 0`. Under A with the pairs dropped (step 1's checker), each such comparison passes an `IntLiteral` at run time, for which no pair is left, so it answers `SEQV` against a literal value, `false`. So, by reading: with the pairs dropped, A breaks every comparison of a value with an integer numeral that reaches the `=` over `Any`; B keeps those whose left type takes `ZZ32` by coercion, and breaks `NN32`, `NN64` and `RR32` against an integer numeral. No compiled run on the one library exists to show it.

The other 12 components of the distance stage were not traced (section 8).

## 6. A program's own number type, an interval and bfloat16

**The question.** Today a program may declare `coerce(x: IntLiteral)` on its own type (the Working Draft's reason for numeral types, `Specification-1.0-frozen/basic/expressions/literals.tex:132-148`). Under B, with the literal types unwritable and no literal value at run time, what does such a type need?

**Under B, as built:** the type declares coercions from the default types, and a numeral at a place of that type takes its default, then that coercion (`viaDefault`). `LiteralOwnNumberCompiled` asserts it, and passes from step 2:
- `a: CC64 = 3` arrives through `coerce(x: ZZ32)` as "`ZZ32 3`";
- `3000000000` through `coerce(x: ZZ64)`;
- the 20-digit `12345678901234567890` through `coerce(x: ZZ)`, exactly;
- `0.5` through `coerce(x: RR64)`;
- the Working Draft's own example `3.1415926535897932384` (`literals.tex:137`) through `coerce(x: RR64)` as "`RR64 3.141592653589793`": the digits past the double are gone before the program's coercion runs, the loss the Working Draft gives as its reason for numeral types ("converting it immediately to a floating-point number may lose precision", `:136-138`);
- an interval `Iv` and a bfloat16 `BF16` with `coerce(x: RR64)` receive the double nearest the numeral: `0.1` arrives as the double `0.1`, and `1.00390625000000000001` as the double `1.00390625`, `1 + 2^-8`, exactly the bfloat16 midpoint (asserted by `SEQV` against typed `RR64` bindings).

**Today, under A.** Measured three ways:
- The compiled path, on the base (`old-fortress.sh /home/user/fortress-base29 ... compile`, scratch `OwnLitInt`, `OwnLitFloat`): `coerce(x: IntLiteral)` receives "`IntLiteral 12345678901234567890`", exact. A type with `coerce(x: FloatLiteral)` receives the literal, but the prelude's `FloatLiteral` offers only `asRR32` and `asRR64` (`CompilerBuiltin.fss:996-999`), so it reads "`FloatLiteral 3.141592653589793`" and, in `UserTyToday`, "`FloatLiteral read as 1.00390625`": on the compiled path today a program's type cannot read a float numeral's exact value either. A program cannot declare both coercions on one type: "Invalid overloading of coerce_CC64 ... FloatLiteral->CC64 ... and IntLiteral->CC64", since the prelude's two literal traits do not exclude each other (`OwnLitToday`, base).
- After step 2, the same programs are refused: "IntLiteral cannot be written in a program".
- Walk on the base, which runs the one library's A (`old-fortress.sh /home/user/fortress-base29 <caches> UserTyWalk.fss`), where `FloatLiteral`'s `asString` gives the text and the program reads its exact value from it:

      U1 Iv(0.1) lo 0.09999999999999999 hi 0.1
      U2 Iv(0.5) lo 0.5 hi 0.5
      U3 BF16(1.00390625000000000001) exact 0x3F81
      U4 the double of it 1.00390625000000000001 then bf16 0x3F80
      U5 BF16(1.00390625) exact 0x3F80

  The interval encloses `1/10` between the two neighbouring doubles and `1/2` as a point. The bfloat16 coercion rounds once from the exact value to `0x3F81` (`1.0078125`); through the double it ties at the midpoint and rounds to even, `0x3F80` (`1.0`): double rounding, shown. (U4 prints the source text because a float numeral at `RR64` stays a `FloatLiteral` under walk, row 943; its bits are the double's.)

**What B leaves such a type, by reading.** From a double `d` an interval can only widen to `[d.nextDown, d.nextUp]`, two ulps where one suffices, and it cannot tell an exact numeral (`0.5`) from a rounded one, so it widens those too. A bfloat16 coercion cannot recover the numeral's side of a midpoint, so it double-rounds whenever the double lands on a bfloat16 midpoint, as `1.00390625000000000001` does. The prelude's `RR64` has neither `nextUp` nor `nextDown` (its members, `CompilerBuiltin.fss`), so before the switch-over the compiled interval cannot even widen.

## 7. Two designs that give a program's type the exact value, by reading

### 7.1 A hybrid

**The hybrid.** B's default where nothing fixes a type; but a program's own type may still declare `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)` and receives the exact literal, so that a literal value exists at run time only as the argument of such a coercion. This is Haskell's `fromInteger` and `fromRational` for a user's type beside B's (Swift's) default elsewhere; Swift's `ExpressibleByFloatLiteral` hands a `Double` and loses (the coordinator's framing, from their documentation as I know it, not run here).

**What it keeps of B's gains.**
- No literal value at an untyped place, in a generic, at `SEQV`, or in the library's own number types, whose coercions the fold still makes constants. `Cell(3)` a `Cell[\ZZ32\]`, `x SEQV z` true, row 946 gone.
- `IntLiteral`'s 19 operator bindings stay deleted. Of the 24, the literal's accessors that a program's coercion reads must stay, with P-169's compiled carrier: `IntLiteral`'s `asZZ` (`ToZZ`; the other conversions are Fortress text over it) and, optionally, `asFloat` (`AsFloat`, which can be Fortress text over `asZZ`); `FloatLiteral`'s 3; and an accessor for the exact value, which none of the 24 gives (below). So 4 or 5 bindings and one or two new getters, against 24 under A and 3 (walk's, until its rung) under B.

**The accessors.** The Working Draft's four parameters (`literals.tex:110-129`, `RadixPointNumeral[\n, m, r, v\]`): for a numeral with a radix point, the digit count `n`, the count after the point `m`, the radix `r`, and the digits read as one integer in that radix `v`; for an integer numeral, the radix and the value. As getters, not static parameters:
- the one library: `FloatLiteral` declares `getter digits(): ZZ32`, `getter fractionDigits(): ZZ32`, `getter radix(): ZZ32`, `getter digitValue(): ZZ`, and, derived in Fortress, `numerator(self): ZZ` and `denominator(self): ZZ` reduced (`v / r^m`); `IntLiteral` declares `getter radix(): ZZ32` beside `asZZ`. About 10 lines of api and 10 of component, 4 or 5 of them bindings.
- walk's `FFloatLiteral`: its constructor receives the parts (`interpreter/evaluator/values/FFloatLiteral.java:26`, `intPart`, `numerator`, `denomBase`, `denomPower`) but keeps only the text for radix ten and, for any other radix, the text of the nearest double (`:28-31`). It must keep the four fields, and the text, and answer the getters: about 20 lines, plus a glue class for the four getters, or helpers by P-169's device, about 30 lines.
- the code generator's literal node: `FloatLiteralExpr` holds `text`, `intPart`, `numerator`, `denomBase` and `denomPower` (`astgen/Fortress.ast:748-751`), from which `n`, `m`, `r` and `v` follow (`v = intPart · r^m + numerator` where `denomBase = r`, `denomPower = m`; `n` from the text's digits). `forFloatLiteralExpr` must pass them to the compiled `FFloatLiteral`, which today keeps only the text or a double (`compiler/runtimeValues/FFloatLiteral.java`), at a place where the literal stays one; about 15 lines in `CodeGen` and 25 in the class.

**What the checker and the fold do differently.**
- The checker: `IntLiteral` and `FloatLiteral` stay writable only as the parameter type of a `coerce` declaration, and inside its body; the well-formedness check grows by that exception, about 10 lines. At a typed place whose type declares a coercion from the literal type, that coercion is the conversion, before `viaDefault`; today's `buildCoercion` already tries it first.
- The fold: unchanged for the library's number types; it must not fold a program's coercion, which receives the literal value that `forFloatLiteralExpr` and `forIntLiteralExpr` build in their own-type branches, as today.

**The three tests, by reading.**
- *A round trip,* `C.8_16` in and `"C.8_16"` out through a program's coercion: passes if the coercion reads the text (`asString`, kept) or rebuilds it from `n = 2`, `m = 1`, `r = 16`, `v = 0xC8`: "C8" with the point after `n - m` digits, then `_16`. It fails today on walk, which keeps for radix 16 only the nearest double's text (`FFloatLiteral.java:28-31`), and on the compiled path, which hands the coercion a double. A spelling that the four parameters do not hold, a digit-group separator or a radix word, round-trips only through the text.
- *A decimal type* `Dec(unscaled: ZZ, scale: ZZ32)` receiving `3.14159` as `314159` and `5`: passes from `v` and `m` exactly. From a reduced numerator and denominator alone it passes for `3.14159` (`314159/100000` is reduced) but not for `3.14150`, which reduces to `6283/2000` and loses the written scale.
- *`SEQV` by value across radices,* `0.1_2 SEQV 0.5` true and `0.1 = 0.1_16` false: at top level both numerals sit at `Any` and take `RR64`, so `0.5 SEQV 0.5` is true and `0.1 = 0.0625` is false, under B and the hybrid alike (by reading, from 4.4's `1/2 = 0.5`). Between two literal values, inside a coercion's body, `SEQV` must compare the reduced value, not the stored parts: walk's `FFloatLiteral.seqv` compares the nearest doubles (`FFloatLiteral.java:43-48`, marked "HACK"), so it calls two numerals of one double equivalent; the compiled `equality.sEquiv` has no case for `FFloatLiteral`. Both need a reduced-rational comparison, about 5 lines each.

### 7.2 The Working Draft's way: the four numbers as static parameters, by reading

**The design.** A numeral with a radix point has the type `RadixPointNumeral[\n, m, r, v\]` (`Specification-1.0-frozen/basic/expressions/literals.tex:110-129`), and a program's type declares `coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\])`, whose body reads `n`, `m`, `r` and `v` as values. Reading B's default still applies where nothing fixes a type, so these types live only in the checker; a coercion instantiated for a numeral is realised as the compiled path realises every generic, a class per instantiation with the static arguments stamped in (F-129: "A size read as a value is a constant that the class loader replaces by the numeral").

**What each part must change.**
- *The checker, the numeral's type.* `Misc.scala:468-473` types every numeral as the one `Types.INT_LITERAL` or `Types.FLOAT_LITERAL`; it would type it as the family's instance with four size arguments from the node's parts (`FloatLiteralExpr`'s `intPart`, `numerator`, `denomBase`, `denomPower`, and the digit count from its text). Every test of the literal type by equivalence, `isLiteralType`, `isNumeral`, `numeralReading`, `getCoercionTargetsFrom` (which keeps only coercing traits without static parameters, `CoercionOracle.scala`) and the prototype's default, becomes a test of membership in the family. The library's own `coerce(x: FloatLiteral)` and `coerce(x: IntLiteral)` keep working only if each instance extends a plain `FloatLiteral` or `IntLiteral`, as the Working Draft's "Every numeral also has type `Numeral[\n,m,r,v\]`" (`:127-129`) suggests. About 100 to 200 lines, not sized closer.
- *The checker, the generic coercion.* The compiled path already converts through a coercion with its own static parameter (row 513: "the compiled run converts"), and the coercion oracle instantiates such arrows. Inferring four `nat` arguments from an argument type that writes them is the ordinary inference of F-67. Not tried here.
- *Sizes beyond 32 bits.* A `nat` is an `NN32` value (`SKILL.md`, "Static parameters"), and the checker checks each size against its kind (P-55); `v` of a 20-digit numeral, or of `3.1415926535897932384`, is far beyond it. The checker needs a size kind of arbitrary precision, or `v` split into digits; the class loader already carries a size as a string (`RTTIsize`'s `size` field, `compiler/runtimeValues/RTTIsize.java`) and computes one without checking its kind (row 675, F-146), so its descriptors would hold, but its stamped constant would not (next).
- *The stamped constant.* A size read as a value compiles to `CONST.Nat.<size>`, which the loader replaces by "the IntLiteral of the instantiated number" (`CodeGen.java`, the comment before the `natMethod` call, `:6354` at the base), typed `descFortressIntLiteral`. So today a size read as a value is an `IntLiteral` value at run time; under B it must become a typed constant, `ZZ` for `v`, `ZZ32` for the others, in the loader's `MethodInstantiater`. Not sized.
- *A static range check,* `where { v < 256 }`: no such `where` form is built. P-151 builds three, all of them `T extends SomeTrait` constraints or type variables; a boolean constraint over sizes is not among them (`revival-changes.md`, "Three `where` forms are built"). It would be a fourth form, checked at each instantiation, not sized. With it, an out-of-range numeral is refused at compile time, which the hybrid cannot do.
- *Walk.* Walk has no static types; a `nat` used as a value is an `Int` (row 486), and walk does not apply a coercion with its own static parameter (row 513). It would instantiate the coercion per numeral at run time from `FFloatLiteral`'s parts, which it does not keep (7.1). Waits on P-12; not sized.

**What it gains over the hybrid.** No literal value at run time even for a program's type: the coercion's body sees four constants. No glue binding and no compiled carrier for the literal's accessors, so all 24 can go once walk's rung lands. A static range check, given the fourth `where` form.

**What it costs beyond the hybrid.** The literal types become generic families in the checker; a size kind beyond 32 bits in the checker; typed size constants in the class loader; a boolean `where` form; and walk's instantiation per numeral after P-12. One specialised class per numeral value used at such a type.

**The three tests, by reading.**
- *Round trip* `C.8_16`: passes; the body rebuilds "C.8" from `n = 2`, `m = 1`, `r = 16`, `v = 200` and appends `_16`. A digit-group separator or a radix word does not survive, since no static parameter holds the text.
- *Decimal* `Dec(314159, 5)` from `3.14159`: passes, `v` and `m`; and `3.14150` keeps its scale 5, which a reduced numerator and denominator lose.
- *`SEQV` across radices*: at top level the numerals take `RR64` by B's default, so `0.1_2 SEQV 0.5` is true and `0.1 = 0.1_16` false, as under the hybrid. Two values of the literal types themselves never meet at run time here; as types, `RadixPointNumeral[\2,1,2,1\]` and `RadixPointNumeral[\2,1,10,5\]` differ, so a `SEQV` between them, were one to arise, would be `false` by P-168's rule that values of different types are never equivalent.

## 8. What I could not build or measure

- **No compiled run on the one library.** Every one-library answer in this report is the checker's static type (section 4.4); the run-time answers of section 5 are by reading. The switch-over is not done.
- **Joins** (`if`, `case` of numerals at an untyped binding) and **tuples** of numerals as one argument at `Any` are not built: the whole expression is coerced, so the branches still make literal values.
- **`QQ`'s fold**: a numeral at a `QQ` place still calls the coercion with a literal value; the prelude has no `QQ` to test against.
- **`nat` parameters used as values** are expressions of type `IntLiteral` (the code generator builds them as `IntLiteral` constants, the comment at `CodeGen.java:6339` at the base); the default coerces them at run time, so a literal value still exists there. Section 5's string-juxtaposition sites are of this kind.
- **The 12 other components'** default sites: `WorldFlip` given the 14 files in one run printed only `FortressLibrary`'s (81 lines), and the distance stage printed none of the trace (its run captures standard error, but no `LITERAL-DEFAULT` line appeared); I traced `String` alone and did not run the other 12 one by one.
- **The demos** (`tests-running.md`, "Outside the gate") were not run: the library change edits walk's library, and walk's float ties already fail 71 tests, so the driver's verdict would carry no news about B.
- **The specification's text** for B (review §5.3) is not written: this is a prototype.
- **Timing beyond the smoke test**: no profile, no second pass.

## 9. Defects found

- **The `=` pairs over `IntLiteral` dropped breaks the one library's comparisons with a numeral under A, and `NN32`'s, `NN64`'s and `RR32`'s against an integer numeral under B**, by reading (section 5). A defect of the brief's sub-choice, not of the tree; under B it needs either the pairs kept and folded, or `=` pairs from `ZZ32` into the unsigned types, which P-74 forbids as implicit coercions. Recorded here only: no gated test can show it before the switch-over (`tests-writing.md`, "How a defect is recorded", item 3; its row is for the curator's decision, below).
- **`InferO2Pos:18`, `:19` choose the declaration with the `ZZ32` parameter**, not the review's predicted one over `Any` (4.3). Not isolated: it may be B's correct answer (the numeral is a `ZZ32`) or a side effect of the step-2 tie rule or the pre-default at a bare static parameter.
- **Walk loads `FloatLiteral` apart from `RR64` with no float tie rule**, so 71 tests fail (4.5); predicted by both readings' rung 2, measured here.
- Defects of the prototype found and repaired on the way, each by a measured failure: the unwritable check firing on the prelude's own generated names and on relative library paths ("Internally generated library name ... IntLiteral cannot be written in a program"); the default at `Any` ranking as a coercion (count 38); `Cell(0.5)` taking `RR32` as the narrowest candidate; a lone `Any` parameter skipping the default; the expected type ignored by the pre-default (`InferCoercionShapes:74`, `:76`, `InferLooseJuxtContext:12`, `InferCallArgumentContext:15`, all passing after the repair); the receiver default refusing the prelude's `(1).asNN32`.
- No new ledger row: the patch is not landed, and row 946 (which B resolves) and rows 362, 506 and 862 (which the patch changes) are the record's already.

## 10. Decisions (mine; no decision of the curator covers them)

1. `FloatLiteral` stays a `value object` extending `Number`, not the prelude's trait, because walk's run-time values need an object (4.5). Alternative: a trait with walk's object below it, which walk's native constructor does not support by reading.
2. The receiver default applies only where the default type has the member, so the prelude's `(1).asNN32` keeps compiling with a literal receiver. Alternative: the default always, which needs the prelude edited, against `compiler.md`.
3. A typed place whose type has no coercion from the literal type takes the default and then its own coercion (`viaDefault`), a chain of two conversions for numerals only. Alternative: refuse `c: CC64 = 3` unless `CC64` names the literal type, which B makes unwritable.
4. The fold makes a quotient of numerals a numeral with a radix point, so `x = 7/2` defaults to `RR64`, not `QQ`. Alternative: a folded quotient defaults to `QQ`; then `1/2 = 0.5` compares a `QQ` with an `RR64` and is `false` unless the fold also folds the comparison.
5. A float numeral whose fold could give `-0.0` does not fold.
6. Step 5, a numeral's coercion into its own default ranking as none, was added after the brief's four steps because section 5 showed the library's `ZZ` comparisons at the `=` over `Any`; it is measured on its own.
7. The literal types count as written by the library in any file under `Library/` or `LibraryBuiltin/`; `Library/Constants.fsi:16-17` (`pi: FloatLiteral`) keeps its type, so `pi` is a literal value at run time under B. Alternative: `pi: RR64`.

## 11. Questions for the curator (decisions not taken)

1. **The `=` pairs over the literal types.** Sources: P-165 and P-172 give each coercion its pair; the brief drops the pairs over the literal types under B. Ways: (a) drop them, as built: `u = 0` for `u: NN32`, `NN64` or `RR32` answers `false` (section 5); (b) keep them, and fold the pair's conversion of a numeral into a constant, so that no literal value reaches run time (the review §3.6's second sub-choice); (c) drop them and declare `=` pairs from `ZZ32` into `NN32` and `NN64` without a coercion. Today's behaviour (A, base) keeps them.
2. **`gg(5, w)` and `ee(5)`** (`InferO2Pos:18`, `:19`): under B, does the declaration with a `ZZ32` parameter run (as built), or the one over `Any` (the review's prediction, P-49's wording)? Today: the one over `Any`.
3. **A program's own number type.** Ways: B as built (coercions from the default types; a 20-digit numeral arrives exact as a `ZZ`, a float numeral as a double, section 6); the hybrid of 7.1 (the literal types writable as a coercion's parameter, 4 or 5 of the 24 bindings kept, the accessors added); the Working Draft's static-parameter design of 7.2 (no literal value at run time, a size kind beyond 32 bits, a boolean `where` form); or A. Today, on the compiled path, a program's type receives an integer numeral exactly and a float numeral only as a double (6); on walk, exactly.
4. **`x = 7/2`** with the fold: `RR64` (as built) or `QQ` (today's one library).
5. **`IntLiteral` writable.** As built, unwritable: 9 team tests and 10 of the revival's break (4.3), and the team's `XXXApplicationErrors`, `XXX6at` and `XXX6bw` pinned texts change. Today: writable.

## Summary

I built reading B's compiled side in a worktree seeded from the new base build `/home/user/fortress-base29` (`8cde0b2c4f`, kept), in four steps and a fifth: `FloatLiteral` apart in the one library, with exact and one-rounding coercions and the literal `=` pairs dropped; the checker's default at untyped bindings, `Any` parameters, numeral-fixed static arguments, receivers and ties, the literal types unwritable; the fold of numeral expressions and of a numeral's coercion into a constant rounded once; `IntLiteral`'s 21 glue bindings removed; a numeral's own default ranking as no coercion. The new tests fail on the base and pass after step 3.

Measured:
- Count and distance: 0 and 0 at the base and after each step's final code; the library alone gave 2 ties and then a return-type error, both repaired in step 1. The checker's time: 122 s at the base, 112 s after.
- Lines: the checker +219 −25, the fold +206 −5, the library +39 −139.
- Compiled suites (1475/86/263 passing before): at the end 27 compiler and 4 library failures, none from the fold. The predicted flips occur (`InferCoercionShapes:72`, `InferO2Num:20`, `XXXApplicationErrors`, seven team tests); beyond them, two more team tests writing `IntLiteral`, two pinned messages, ten revival tests naming it in a helper, `XXXInferComboCap` and `XXXNumeralPrintRungR` red (rows 506, 362), and `InferO2Pos` choosing otherwise than predicted.
- Walk after the library change alone: 71 of 791 fail, for want of a float tie rule.
- The library's numerals: 81 default sites in `FortressLibrary`, 65 at the `=` over `Any`; with the pairs dropped A breaks those comparisons, and B breaks `NN32`, `NN64` and `RR32` against an integer numeral (by reading).
- A program's own type under B receives a float numeral as a double: an interval cannot be tight, and bfloat16 double-rounds (`0x3F80` against the exact `0x3F81`, on walk at the base).
- microGPT: all 18 components still stop at name resolution; against the one library the flat program stops at its own `Index` bound.

By reading only: a hybrid keeping the exact value for a program's coercion (4 or 5 of the 24 bindings), and the Working Draft's static-parameter design (no run-time literal value, but a size kind beyond 32 bits and a new `where` form). Unbuilt: joins, `QQ`'s fold, `nat` values, a compiled run on the one library, the specification.

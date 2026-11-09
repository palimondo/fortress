# Batch 29 numeral fidelity: the batch's own text and the landed code, on file

Scout: exact text with path:line, no judgement. Repo /home/user/fortress, base b430f9f428, last commit 7daf51fe8a (landed 2026-11-09).
Commands: `sed -n A,Bp FILE` with line numbers added by awk (helper ex.sh beside this file); `grep -n '^#'` for headings; `git diff b430f9f428 7daf51fe8a -- PATH`; `git show 7daf51fe8a:PATH`; `grep -n`; a python script over result.json.
Paths below are relative to /home/user/fortress. Long lines are kept whole.

# 1. Before the launch
## 1.1 Prototype probe: explorations/compile-ladder/plan-29/probes/literal-default.md

#### headings of explorations/compile-ladder/plan-29/probes/literal-default.md
```
3:# Reading B, built: a numeral's default on the compiled path
15:## 1. What I built, step by step
19:### Step 1, the library: `FloatLiteral` apart, its coercions, the float tie rule, the literal `=` pairs dropped
30:### Step 2, the checker: the default at each kind of place, the literal types unwritable
45:### Step 3, the fold
53:### Step 4, `IntLiteral`'s glue and run-time arithmetic removed from the one library
60:### Step 5, not in the brief: a numeral's coercion into its own default ranks as no coercion
64:## 2. The tests, written first
85:## 3. Lines
87:### 3.1 By area, after step 5 (`git diff --stat 8cde0b2c4f`)
95:### 3.2 By step
105:## 4. Measurements
107:### 4.1 The count stage and the distance stage
129:### 4.2 The checker's time
137:### 4.3 The compiled suites
166:### 4.4 The checker against the one library: B's answers
188:### 4.5 Walk
201:### 4.6 Step 5
211:### 4.7 microGPT
228:## 5. The library's own numerals that the default retypes
243:## 6. A program's own number type, an interval and bfloat16
270:## 7. Two designs that give a program's type the exact value, by reading
272:### 7.1 A hybrid
294:### 7.2 The Working Draft's way: the four numbers as static parameters, by reading
315:## 8. What I could not build or measure
326:## 9. Defects found
334:## 10. Decisions (mine; no decision of the curator covers them)
344:## 11. Questions for the curator (decisions not taken)
352:## Summary
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:1-17
```
1: <!-- Reading B's compiled side built in a prototype and measured, for the curator's decision on a numeral where nothing fixes a type, by an Opus worker for climb batch 29's planning, 2026-11-08, on the base `8cde0b2c4f` (base build `/home/user/fortress-base29`): the one library's `FloatLiteral` apart with its literal `=` pairs dropped, the checker's default at untyped bindings, `Any` parameters, static arguments, receivers and ties with the literal types unwritable, the fold of numeral expressions and of a numeral's coercion into a constant rounded once, `IntLiteral`'s 21 glue bindings removed, and a numeral's own default ranking as no coercion; count and distance stay 0 and 0, 27 compiled and 4 library tests fail against the gate's none, walk fails 71 of 791 on the library change alone, and with the pairs dropped the library's comparisons with a numeral reach the `=` over `Any`; the code is not committed, its patch is `literal-default.patch` beside this report. -->
2: 
3: # Reading B, built: a numeral's default on the compiled path
4: 
5: **What was asked.** Build reading B's compiled side as `explorations/reviews/literal-fork-2026-11-08.md` §4.2 and §6.3 (rungs 2 to 4) lay it out, in four steps, measuring after each, with test programs written first; then measure the lines, the count and distance stages, the checker's time, the compiled suites, the walk suite after the library change, the library's own numerals that the default retypes, and microGPT. The coordinator added, during the work: a program's own number type (`CC64`), an interval type, a bfloat16 type, and, by reading, a hybrid that lets a program's type receive a numeral's exact value (sections 6 and 7).
6: 
7: **Trees, tools, files.**
8: - Base: `8cde0b2c4f`, main's head when the work started. The base build is `/home/user/fortress-base29`, made by `references/worktrees.md` (`ant compileAll` 50 s, the library order, `bin/fortress ProjectFortress/tests/BooleanOps.fss`, `git status --porcelain` empty, 282 MB). `df -P /home/user` before it: 21,477,916 KB available. It is kept for batch 29.
9: - The prototype ran in `/home/user/fortress-proto-b`, seeded from it by `seed-worktree.sh` in 4 s, and only there. The worktree and its caches are removed; the patch keeps the code.
10: - Machine for every run: `nproc` 4, Intel Xeon @ 2.10 GHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1` except the suites (4).
11: - The checker against the one library was read through the count stage's driver, `explorations/coordinator/tools/checker-count/WorldFlip.java`, with `-stop check`, as the review did (§3.1); a static type is read from a refused binding `s: String = e`.
12: - The prototype prints where it applied a default when the environment sets `FORTRESS_LITERAL_TRACE` (`LiteralDefaults` in `Functionals.scala`, in the patch): one line `LITERAL-DEFAULT <span> <type> at <place>` for each default that the checked component keeps. Section 5 is built from those lines.
13: - Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. Every claim about the prototype's code cites the patch; lines in `Library/` are the worktree's after the step named.
14: 
15: ## 1. What I built, step by step
16: 
17: The steps are cumulative. The lines are `git diff --stat` in the worktree after each step (section 3.1 gives the areas).
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:19-28
```
19: ### Step 1, the library: `FloatLiteral` apart, its coercions, the float tie rule, the literal `=` pairs dropped
20: 
21: - `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` and `.fss`: `value object FloatLiteral extends RR64` becomes `value object FloatLiteral extends Number`, which declares its own `asFloat(self): Float` (P-165). It stays an object, not the prelude's trait: walk makes `FFloatLiteral` values through its native constructor `interpreter/glue/prim/FloatLiteral.java` and calls its three glue bindings (section 4.5). An object excludes every type it does not extend, so `excludes { RR32, RR64 }` holds without the clause.
22: - `RR64` (`Library/FortressLibrary.fsi`, `.fss`): `comprises { Float }`, and `coerce(x: FloatLiteral) = asFloat(x)`, one rounding (walk's `FFloatLiteral.getFloat` is `Double.valueOf` of the text).
23: - `QQ`: `coerce(x: FloatLiteral) = numeralRatio(x.asString)`, exact: a new private function of 14 lines reads the decimal text into `n / d`.
24: - `RR32`: `coerce(x: FloatLiteral) = narrow(asFloat(x))`. Under walk this rounds twice; the compiled path folds it with one rounding (step 3). One rounding under walk needs a float parse of the text, which no helper has (`nativeHelpers` has `simpleDoubleArith.parseDouble` only).
25: - The `=` pairs over the literal types dropped, 15 in each of the api and the component: `RR64`'s, `QQ`'s, `ZZ32`'s, `ZZ64`'s, `NN64`'s, `ZZ`'s and `NN32`'s `opr =(self, b: IntLiteral)`, and `IntLiteral`'s own eight. No `=` pair over `FloatLiteral` was added.
26: - The float tie rule, in the checker (`impls/Functionals.scala`, `isNumeral` and `numeralReading`): a numeral with a radix point counts as a numeral at a tie and reads as `RR64`. I put it in step 1 because the library change alone makes ties (step 1a below).
27: - `Float`'s `asFloat(self)` returns `RR64` instead of `Float` (`FortressBuiltin.fss:82`): with `RR64` comprising `Float` alone the checker reads the two domains as equal and asks each return type to fit the other (step 1b below).
28: - Lines: 5 files, +46 −41 (the library 4 files, the checker's tie rule 19 lines of `Functionals.scala`).
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:30-43
```
30: ### Step 2, the checker: the default at each kind of place, the literal types unwritable
31: 
32: All in `scala_src/typechecker/` (the patch):
33: - `defaultNumeral` (`impls/Functionals.scala`): an expression whose type is `IntLiteral` or `FloatLiteral` becomes a coercion to `ZZ32`, or `ZZ64` or `ZZ` by its value, or `RR64`, through `numeralReading` and `coercions.buildCoercion`. It is applied:
34:   - at an untyped binding, top level and local, one variable or several (`impls/Decls.scala`, the four sites the review names);
35:   - at a parameter that the numeral fits without conversion, `Any`, `Object`, `Number`, where the default fits too (`defaultAtUnfixed`): in `checkApplicableWithoutInference`, in its `AnyType` domain branch (a lone `Any` parameter skipped the argument loop), and after inference in the coercion attempt;
36:   - at a static argument that numerals alone fix: such a parameter's candidate types are the default alone (no context) or no literal type (with a context), a numeral at a bare static parameter takes its default before the subtyping inference (no context), and a subtyping inference that still yields a literal static argument is refused so that the coercion attempt reads it;
37:   - at a dotted receiver written as a numeral, `(3).zero`, where the default type has the member (`defaultReceiver`); where it has not, the numeral stays, because the prelude itself writes `(1).asNN32` (`LibraryBuiltin/CompilerBuiltin.fss:812`, `:814`) and `ZZ32` there has no `asNN32`;
38:   - at a tie (`numeralTie`): each numeral read at its default, the candidates that the arguments so read fit without coercion, then those where only the numerals' positions fit without it.
39: - The default ranks as no coercion: `counted` (`Functionals.scala`) and `moreSpecificCandidate` (`useful/STypesUtil.scala`) skip a coercion that `LiteralDefaults` made.
40: - A typed place whose type declares no coercion from the literal type but one from its default takes the default, then that coercion (`viaDefault` in `CoercionOracle.buildCoercion`). This is what lets a program's own type take a numeral (section 6).
41: - `IntLiteral` and `FloatLiteral` cannot be written outside the library's own files (`TypeWellFormedChecker.scala`): "IntLiteral cannot be written in a program: a numeral has its own type only while the checker types the program." A file counts as the library's when its path holds `/Library/` or `/LibraryBuiltin/`; a type is written by the program when its span's file is the unit's own.
42: - Joins (`if`, `case`) are not built: an untyped binding of a join of numerals coerces the whole expression, so its branches still make literal values.
43: - Lines: the whole tree 11 files +231 −59 after step 2.
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:53-62
```
53: ### Step 4, `IntLiteral`'s glue and run-time arithmetic removed from the one library
54: 
55: - `FortressBuiltin.fsi` and `.fss`: `value object IntLiteral` becomes `trait IntLiteral extends Number excludes { AnyIntegral, QQ, RR64 }` with `zero`, `one`, the five conversions as Fortress text over an abstract `asZZ`, `asString`, `asExprString` and `asFloat(self): RR64 = asFloat(self.asZZ)`. Its 21 glue bindings (`ToZZ`, `AsFloat` and the 19 operators on `interpreter/glue/prim/IntLiteral`) and every operator and comparison go (the script counted 21 `glue.prim.IntLiteral$` strings removed).
56: - `AnyIntegral`'s `coerce(x: IntLiteral)` compares `x.asZZ`, not `x`, since `IntLiteral` has no comparisons left.
57: - `FloatLiteral`'s 3 stay (section 4.5).
58: - Lines after step 4: the library 4 files +39 −139.
59: 
60: ### Step 5, not in the brief: a numeral's coercion into its own default ranks as no coercion
61: 
62: Section 5 found that after step 4 the one library's `r=0` for `r: ZZ` reaches the `=` over `Any`. Step 5 marks a coercion of a numeral into its default type, built anywhere by `buildCoercion`, as no coercion (`CoercionOracle.defaultName`, `LiteralDefaults.mark`), so that `ZZ`'s `opr =(self, b: ZZ32)` fits `r = 0` as it is and, being more specific, is chosen. About 20 lines in `CoercionOracle.scala` and `Functionals.scala`. Its measurements are section 4's last rows.
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:188-199
```
188: ### 4.5 Walk
189: 
190: `ant testSystem` once, after step 1b (the library change, the float tie rule being checker-only), log `testSystem-lib1b`:
191: 
192:     [junit] Tests run: 197, Failures: 12 ... Tests run: 194, Failures: 22 ... Tests run: 195, Failures: 20 ... Tests run: 205, Failures: 17
193:     BUILD FAILED
194: 
195: 71 of 791 tests fail. The gate's were 791 and 0. Their messages are almost all walk's "Ambiguous coercion": walk has no float tie rule, and with `FloatLiteral` apart `0.5 + 0.25`, `-0.5`, `2.0 n`, `x^2` and `3 0.5` each fit `RR64`'s, `QQ`'s and `RR32`'s declarations by coercion (counted from the log: 108 lines hold "mbiguous"; the commonest are `/`, prefix `-`, juxtaposition, `^` and `+`). A few fail an assertion instead. The 71: `AnyNativesIntrinsicWalk ArrayElementAlgebra ArrayFactoryAbstractNumber ArrayOperatorsBesideLibrary ArrayScalarExtension ArrayStoreRR64Walk ArrayStoreWalk Brackets ComparisonAtNaNWalk CovCollTest CovariantTest ExportAlignedMembersWalk FlatTowerRungF FloatNextUpSignedZeroWalk GeneratorDeclarations InferUnfixedFBoundedWalk IntLiteralValue IntegerPowerContractWalk LibraryOverloadFamilies NativeHelperBindingWalk NativeHelperFamilyAsFloatWalk NativeHelperFamilyFloatBitsWalk NativeHelperFamilyFloatWalk NativeHelperFamilyRR32Walk NativeHelperFamilyZZ32Walk NativeHelperFloatCarriedWalk NativeHelperFloatMixedWalk NativeHelperRationalArgumentWalk NumberEqualityOwnTypeWalk NumberMixedEqualityWalk NumberOrderListDeclarations NumberPrintTest NumeralTest QuickCheckTest RR32MixedRungF RR32SiblingRungV ReflectTest ReflectiveQuickCheckTest ResultBoundsRungB RoundHalfEvenRungR SkipListTest StrictEquivalenceRuleWalk TabulateRungA TimingTests TupleIndexBoundWalk TupleOrderBounds UnwrittenEmptyFloatSumWalk VectorMatrixCastsWalk VectorNormElementTypesWalk WordCountSmall asifTest caseTest commonSuper compoundArray expTest formatTest generatorTest genericTest3 juxtTwice nativeTestFn oprTests quicksortTest realArith sequivTest simpleBig simpleExp simpleSum stringJuxt testRR32 typecaseSelf vectorOps`. So the library half of `FloatLiteral` apart cannot land without walk's float tie rule (the review's A rung 2 and B rung 2 both name it); B's walk rung 5 (F-c) would make most of these moot.
196: 
197: After step 4, the walk tests that name the literal types (`harness-one.sh tmp/h4` over 12 files): 6 fail. `IntLiteralValue:20`, `NumberMixedEqualityWalk:7`, `IntegerPowerContractWalk:94` and `IntLiteralTextWalk:17` stop with "`undefined variable [IntLiteral]`", the object being gone; `IntLiteralTextWalk` is the only one of them not already among the 71. `FlatTowerRungF:72` ("Ambiguous coercion, args = (3: ZZ32,0.5)") and `NumberPrintTest` fail as after step 1. `XXXextendIntLiteral` and `XXXextendFloatLiteral` still see their expected exception; `ReflectiveNumberTypes`, `IntegerConversionsWalk`, `setMakerTest0` and `TupleOrderMixedRefused.test` pass.
198: 
199: What walk still needs `FloatLiteral`'s 3 for: walk evaluates a float numeral to an `FFloatLiteral` (`interpreter/evaluator/Evaluator.java:1632`), whose run-time type is the object `FloatLiteral`, made by the native constructor `interpreter/glue/prim/FloatLiteral.java`. Its `asString` and `asExprString` (`FloatLiteral$ToString`) print a bare numeral as written, which `NumberPrintTest:16` asserts, and its `asFloat` (`FloatLiteral$AsFloat`) is what `RR64`'s and `RR32`'s new coercions call, and what `QQ`'s reads through `asString`. Until walk's float default lands (B's rung 5, F-c or the place-by-place way), every walk float numeral is such a value, so the three cannot go.
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:243-268
```
243: ## 6. A program's own number type, an interval and bfloat16
244: 
245: **The question.** Today a program may declare `coerce(x: IntLiteral)` on its own type (the Working Draft's reason for numeral types, `Specification-1.0-frozen/basic/expressions/literals.tex:132-148`). Under B, with the literal types unwritable and no literal value at run time, what does such a type need?
246: 
247: **Under B, as built:** the type declares coercions from the default types, and a numeral at a place of that type takes its default, then that coercion (`viaDefault`). `LiteralOwnNumberCompiled` asserts it, and passes from step 2:
248: - `a: CC64 = 3` arrives through `coerce(x: ZZ32)` as "`ZZ32 3`";
249: - `3000000000` through `coerce(x: ZZ64)`;
250: - the 20-digit `12345678901234567890` through `coerce(x: ZZ)`, exactly;
251: - `0.5` through `coerce(x: RR64)`;
252: - the Working Draft's own example `3.1415926535897932384` (`literals.tex:137`) through `coerce(x: RR64)` as "`RR64 3.141592653589793`": the digits past the double are gone before the program's coercion runs, the loss the Working Draft gives as its reason for numeral types ("converting it immediately to a floating-point number may lose precision", `:136-138`);
253: - an interval `Iv` and a bfloat16 `BF16` with `coerce(x: RR64)` receive the double nearest the numeral: `0.1` arrives as the double `0.1`, and `1.00390625000000000001` as the double `1.00390625`, `1 + 2^-8`, exactly the bfloat16 midpoint (asserted by `SEQV` against typed `RR64` bindings).
254: 
255: **Today, under A.** Measured three ways:
256: - The compiled path, on the base (`old-fortress.sh /home/user/fortress-base29 ... compile`, scratch `OwnLitInt`, `OwnLitFloat`): `coerce(x: IntLiteral)` receives "`IntLiteral 12345678901234567890`", exact. A type with `coerce(x: FloatLiteral)` receives the literal, but the prelude's `FloatLiteral` offers only `asRR32` and `asRR64` (`CompilerBuiltin.fss:996-999`), so it reads "`FloatLiteral 3.141592653589793`" and, in `UserTyToday`, "`FloatLiteral read as 1.00390625`": on the compiled path today a program's type cannot read a float numeral's exact value either. A program cannot declare both coercions on one type: "Invalid overloading of coerce_CC64 ... FloatLiteral->CC64 ... and IntLiteral->CC64", since the prelude's two literal traits do not exclude each other (`OwnLitToday`, base).
257: - After step 2, the same programs are refused: "IntLiteral cannot be written in a program".
258: - Walk on the base, which runs the one library's A (`old-fortress.sh /home/user/fortress-base29 <caches> UserTyWalk.fss`), where `FloatLiteral`'s `asString` gives the text and the program reads its exact value from it:
259: 
260:       U1 Iv(0.1) lo 0.09999999999999999 hi 0.1
261:       U2 Iv(0.5) lo 0.5 hi 0.5
262:       U3 BF16(1.00390625000000000001) exact 0x3F81
263:       U4 the double of it 1.00390625000000000001 then bf16 0x3F80
264:       U5 BF16(1.00390625) exact 0x3F80
265: 
266:   The interval encloses `1/10` between the two neighbouring doubles and `1/2` as a point. The bfloat16 coercion rounds once from the exact value to `0x3F81` (`1.0078125`); through the double it ties at the midpoint and rounds to even, `0x3F80` (`1.0`): double rounding, shown. (U4 prints the source text because a float numeral at `RR64` stays a `FloatLiteral` under walk, row 943; its bits are the double's.)
267: 
268: **What B leaves such a type, by reading.** From a double `d` an interval can only widen to `[d.nextDown, d.nextUp]`, two ulps where one suffices, and it cannot tell an exact numeral (`0.5`) from a rounded one, so it widens those too. A bfloat16 coercion cannot recover the numeral's side of a midpoint, so it double-rounds whenever the double lands on a bfloat16 midpoint, as `1.00390625000000000001` does. The prelude's `RR64` has neither `nextUp` nor `nextDown` (its members, `CompilerBuiltin.fss`), so before the switch-over the compiled interval cannot even widen.
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:270-281
```
270: ## 7. Two designs that give a program's type the exact value, by reading
271: 
272: ### 7.1 A hybrid
273: 
274: **The hybrid.** B's default where nothing fixes a type; but a program's own type may still declare `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)` and receives the exact literal, so that a literal value exists at run time only as the argument of such a coercion. This is Haskell's `fromInteger` and `fromRational` for a user's type beside B's (Swift's) default elsewhere; Swift's `ExpressibleByFloatLiteral` hands a `Double` and loses (the coordinator's framing, from their documentation as I know it, not run here).
275: 
276: **What it keeps of B's gains.**
277: - No literal value at an untyped place, in a generic, at `SEQV`, or in the library's own number types, whose coercions the fold still makes constants. `Cell(3)` a `Cell[\ZZ32\]`, `x SEQV z` true, row 946 gone.
278: - `IntLiteral`'s 19 operator bindings stay deleted. Of the 24, the literal's accessors that a program's coercion reads must stay, with P-169's compiled carrier: `IntLiteral`'s `asZZ` (`ToZZ`; the other conversions are Fortress text over it) and, optionally, `asFloat` (`AsFloat`, which can be Fortress text over `asZZ`); `FloatLiteral`'s 3; and an accessor for the exact value, which none of the 24 gives (below). So 4 or 5 bindings and one or two new getters, against 24 under A and 3 (walk's, until its rung) under B.
279: 
280: **The accessors.** The Working Draft's four parameters (`literals.tex:110-129`, `RadixPointNumeral[\n, m, r, v\]`): for a numeral with a radix point, the digit count `n`, the count after the point `m`, the radix `r`, and the digits read as one integer in that radix `v`; for an integer numeral, the radix and the value. As getters, not static parameters:
281: - the one library: `FloatLiteral` declares `getter digits(): ZZ32`, `getter fractionDigits(): ZZ32`, `getter radix(): ZZ32`, `getter digitValue(): ZZ`, and, derived in Fortress, `numerator(self): ZZ` and `denominator(self): ZZ` reduced (`v / r^m`); `IntLiteral` declares `getter radix(): ZZ32` beside `asZZ`. About 10 lines of api and 10 of component, 4 or 5 of them bindings.
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:334-343
```
334: ## 10. Decisions (mine; no decision of the curator covers them)
335: 
336: 1. `FloatLiteral` stays a `value object` extending `Number`, not the prelude's trait, because walk's run-time values need an object (4.5). Alternative: a trait with walk's object below it, which walk's native constructor does not support by reading.
337: 2. The receiver default applies only where the default type has the member, so the prelude's `(1).asNN32` keeps compiling with a literal receiver. Alternative: the default always, which needs the prelude edited, against `compiler.md`.
338: 3. A typed place whose type has no coercion from the literal type takes the default and then its own coercion (`viaDefault`), a chain of two conversions for numerals only. Alternative: refuse `c: CC64 = 3` unless `CC64` names the literal type, which B makes unwritable.
339: 4. The fold makes a quotient of numerals a numeral with a radix point, so `x = 7/2` defaults to `RR64`, not `QQ`. Alternative: a folded quotient defaults to `QQ`; then `1/2 = 0.5` compares a `QQ` with an `RR64` and is `false` unless the fold also folds the comparison.
340: 5. A float numeral whose fold could give `-0.0` does not fold.
341: 6. Step 5, a numeral's coercion into its own default ranking as none, was added after the brief's four steps because section 5 showed the library's `ZZ` comparisons at the `=` over `Any`; it is measured on its own.
342: 7. The literal types count as written by the library in any file under `Library/` or `LibraryBuiltin/`; `Library/Constants.fsi:16-17` (`pi: FloatLiteral`) keeps its type, so `pi` is a literal value at run time under B. Alternative: `pi: RR64`.
343: 
```

#### explorations/compile-ladder/plan-29/probes/literal-default.md:344-350
```
344: ## 11. Questions for the curator (decisions not taken)
345: 
346: 1. **The `=` pairs over the literal types.** Sources: P-165 and P-172 give each coercion its pair; the brief drops the pairs over the literal types under B. Ways: (a) drop them, as built: `u = 0` for `u: NN32`, `NN64` or `RR32` answers `false` (section 5); (b) keep them, and fold the pair's conversion of a numeral into a constant, so that no literal value reaches run time (the review §3.6's second sub-choice); (c) drop them and declare `=` pairs from `ZZ32` into `NN32` and `NN64` without a coercion. Today's behaviour (A, base) keeps them.
347: 2. **`gg(5, w)` and `ee(5)`** (`InferO2Pos:18`, `:19`): under B, does the declaration with a `ZZ32` parameter run (as built), or the one over `Any` (the review's prediction, P-49's wording)? Today: the one over `Any`.
348: 3. **A program's own number type.** Ways: B as built (coercions from the default types; a 20-digit numeral arrives exact as a `ZZ`, a float numeral as a double, section 6); the hybrid of 7.1 (the literal types writable as a coercion's parameter, 4 or 5 of the 24 bindings kept, the accessors added); the Working Draft's static-parameter design of 7.2 (no literal value at run time, a size kind beyond 32 bits, a boolean `where` form); or A. Today, on the compiled path, a program's type receives an integer numeral exactly and a float numeral only as a double (6); on walk, exactly.
349: 4. **`x = 7/2`** with the fold: `RR64` (as built) or `QQ` (today's one library).
350: 5. **`IntLiteral` writable.** As built, unwritable: 9 team tests and 10 of the revival's break (4.3), and the team's `XXXApplicationErrors`, `XXX6at` and `XXX6bw` pinned texts change. Today: writable.
```

## 1.2 Planner's probes: explorations/compile-ladder/plan-29/PROBES.md

#### headings of explorations/compile-ladder/plan-29/PROBES.md
```
3:# Climb batch 29: the planner's probes
7:## Probe 1. The `=` pairs over the numeral types kept, on the prototype
28:## Probe 2. The fold phase in walk's phase order, at the base
40:## Probe 3. Two defects of the base's fold, on the compiled path
48:## Probe 4. The lines that name the two literal types
52:## Not run
```

#### explorations/compile-ladder/plan-29/PROBES.md:7-26
```
7: ## Probe 1. The `=` pairs over the numeral types kept, on the prototype
8: 
9: **Why.** The prototype dropped the 15 `=` pairs over the literal types, and with them `u = 0` for a `u` of `NN32`, `NN64` or `RR32` fell to the `=` over `Any` (`probes/literal-default.md`, section 5). P-173 keeps the pairs, "their conversion of a numeral folded", and P-172 gives `QQ`, `RR64` and `RR32` the pair that goes with each coercion from a float numeral. No measurement of the checker with the pairs kept existed, and the prototype's step 5 (a numeral's coercion into its own default ranked as no coercion) and its chained coercion (`viaDefault`, refused by review-queue item 439's default) were built for the case the pairs answer.
10: 
11: **What was built.** `git apply probes/literal-default.patch`, then the delta `probes/pairs-kept.patch` on it (41 lines in, 6 out):
12: - 1a: the library's hunks only. The 15 pairs over `IntLiteral` restored at their old places, both ways: `opr =(self, b:IntLiteral)` in `RR64`, `QQ`, `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32`, each `do c: T = b; (self = c) end`, and on the prototype's `trait IntLiteral` the seven reversed, `opr =(self, b:T) = do c: T = self; (c = b) end`; new pairs over `FloatLiteral` in `RR64`, `QQ` and `RR32`, and the three reversed on the object `FloatLiteral`. A first placement, right after each type's `coerce`, was refused before the checker: 53 errors, "Coercion declarations should come first." and "Field/getter/setter declarations should come before method declarations." (`Library/FortressLibrary.fss:392:5-40` and on): a pair goes after the getters, where the library had it.
13: - 1b: also `CoercionOracle.buildCoercion` without step 5's mark and without `viaDefault`, so `buildCoercion` returns the coercion it checked and nothing else.
14: 
15: **The program**, `probes/LitPairs.fss`: `u: NN32`, `v: NN64`, `r: RR32`, `q: QQ`, `z: ZZ`, `i: ZZ32` and `w: RR64` compared with numerals (`u = 0`, `v = 0`, `r = 0`, `r = 0.5`, `q = 0.5`, `z = 0`, `i = 0`, `w = 0.5`) and `h = (1/2 = 0.5)`, checked by the count stage's driver with the prototype's trace, from the tree's root:
16: 
17:     CP=$(bin/fortress_classpath | tail -1)
18:     FORTRESS_LITERAL_TRACE=1 java -Xmx4g -Xss64m -Dfortress.caches=$PWD/tmp/wf1 -cp tmp/p1/count/classes:$CP WorldFlip -stop check tmp/probe/LitPairs.fss
19: 
20: A `LITERAL-DEFAULT` line names each numeral that took its default; a numeral at a pair's numeral-typed parameter prints none.
21: 
22: **Results.**
23: - **1a.** Count `#total 0`, `#locations 0`, `#crash none`, `real 1m52.846s` (`explorations/coordinator/tools/checker-count/run.sh tmp/p1/count.txt tmp/p1/count`). Distance `#total 0`, every kind 0, `#crash none`, `real 2m48.452s`. The trace printed one line: "`LitPairs.fss:9:13 ZZ32 at parameter Any of (Any, Any)->Boolean`", the `0` of `r = 0`. Every other comparison chose its pair. `RR32` declares no coercion from an integer numeral (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:48-60` at the base declares none), so no pair holds `r = 0`, which answers `SEQV` of an `RR32` and a `ZZ32`, `false` for `r = 0.0` too. P-76 has `RR32` convert from an integer numeral with one rounding: the coercion and its pair are rung N's.
24: - **1b.** Count `#total 0`, `#locations 0`, `#crash none`, `real 1m47.643s`. Distance `#total 0`, `#crash none`, `#seconds 185 FortressLibrary 114` (1a: `#seconds 166 FortressLibrary 104`). The trace printed the same line for `r = 0`, and two more for `h`'s numerals, "`LitPairs.fss:19:8-10 RR64 at parameter Any of (Any, Any)->Boolean`" and `:19:14-15`: the prototype's fold makes `1/2` the numeral `0.5`, and without step 5 the two numerals meet at the `=` over `Any`, `SEQV` of two equal doubles, `true`. With step 5 they met at a pair. Under the record's fold (fork F1) `1/2` stays the quotient of two integer numerals, a `QQ`, and `QQ`'s pair answers. Every other comparison chose its pair, as in 1a.
25: - **What it means.** With the pairs kept, the one library checks clean with neither step 5 nor the chain, and the comparisons the prototype lost come back to their types: rung C builds neither (forks C2 and C4), rung N keeps every pair and adds `RR32`'s (fork N9). The prototype's step 5 changed no compiled test's verdict (`probes/literal-default.md`, section 4.6). The Fable review of the record changed fork C4 after this probe: rung C keeps step 5 in its narrow form, a numeral's conversion into its own default ranked as no coercion, so that `gg(5, w)` runs the `ZZ32` declaration statically, by P-173's reading of P-49; the chain stays out (`coordinator/climb-batch-29-review.md`).
26: 
```

#### explorations/compile-ladder/plan-29/PROBES.md:28-38
```
28: ## Probe 2. The fold phase in walk's phase order, at the base
29: 
30: **Why.** P-173's fold runs "before the checker" and walk is to answer as the compiled path does; the fold phase, `INTEGERLITERALFOLDING`, is in `PhaseOrder.compilerPhaseOrder` only (`ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java:137-147`). No run had put it in walk's order.
31: 
32: **What was built.** On the clean seeded tree, one line, `INTEGERLITERALFOLDING,` after `PRETYPECHECKDESUGAR,` in `interpreterPhaseOrder` (`PhaseOrder.java:125-133`), then `ant compileAll` (47 s) and `ant testSystem` once.
33: 
34: **Results.** `Tests run: 197, Failures: 0`; `194, 1`; `195, 0`; `205, 1`: 789 of 791 pass, against the last gate's 791 of 791 on this code (`compile-ladder/climb-batch-28/gate/summary.txt`). The two:
35: - `tests/NativeHelperFamilyZZ32Walk.fss:31`, `assert(overflows(fn () => 65536 DOT 65536), "DOT overflows")`: "FAIL: DOT overflows". The fold makes the product the numeral 4294967296, which walk evaluates as a `ZZ64`, so nothing overflows: P-173's answer for numerals alone. The test means `ZZ32`'s `DOT`; its operands are to be typed.
36: - `tests/ChooseZZ32Walk.fss`: "UNEXPECTED exception": the visitor's `CHOOSE` fold throws at `3 CHOOSE 5`, `5 CHOOSE (-1)` and `(-5) CHOOSE 2` (probe 3).
37: 
38: So the phase runs under walk as it is, the library folds as the compiled path's does, and only operations on numerals alone change.
```

#### explorations/compile-ladder/plan-29/PROBES.md:40-46
```
40: ## Probe 3. Two defects of the base's fold, on the compiled path
41: 
42: `probes/FoldChoose.fss` (`println("3 CHOOSE 5 = " (3 CHOOSE 5))`) and `probes/FoldWrap.fss` (`a: ZZ32 = 2147483647 BOXPLUS 1`), each compiled and run with the old code, `explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base29 <worktree>/tmp/old-caches compile|run|walk`:
43: - `FoldChoose`: the compile stops, "Exception in thread "main" com.sun.fortress.exceptions.CompilerError: Integer Literal folding: Need to do something for factorial of negative values" (`IntegerLiteralFoldingVisitor.java:38-55`, `choose` by three factorials, and `:89-90`). Walk prints `3 CHOOSE 5 = 0`, `ZZ32`'s answer.
44: - `FoldWrap`: it compiles; the run dies, "java.lang.Error: Not in range for ZZ32: 2147483648". The visitor folds `+`, `BOXPLUS` and `DOTPLUS` alike as exact addition (`:63-64`), and `-` with `BOXMINUS` and `DOTMINUS` (`:65-66`), so a wrapping or saturating operator on numerals loses its meaning at a typed place. Walk refuses the program, "Operator ? is not defined": the one library declares no `BOXPLUS` at `ZZ32`.
45: 
46: No ledger row holds either (`facts-extract.sh 'ledger-find:fold'`, `'ledger-find:CHOOSE'`). Both are rung F's to repair (fork F2); the record hands them to the record writer as rows.
```

#### explorations/compile-ladder/plan-29/PROBES.md:48-50
```
48: ## Probe 4. The lines that name the two literal types
49: 
50: `grep -cw 'IntLiteral\|FloatLiteral'` at the base: `Library/FortressLibrary.fsi` 18, `.fss` 18; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi` 38, `.fss` 63; `Library/Constants.fsi` 2, `.fss` 2; `Library/ReflectiveQuickCheck.fss` 2 (`theType[\IntLiteral\]`, a static argument). `FortressBuiltin.fss` holds 24 `glue.prim.IntLiteral$` and `glue.prim.FloatLiteral$` strings. The tests that name either type: 12 files under `ProjectFortress/tests/` and 38 under `compiler_tests/` and `library_tests/` (`git grep -l 'IntLiteral\b\|FloatLiteral\b'`), the prototype's section 4.3 among them.
```

## 1.3 Batch record: explorations/coordinator/CLIMB-BATCH-29.md

### Section 3, the forks' preamble, and rung N forks (N1 to N12)

#### explorations/coordinator/CLIMB-BATCH-29.md:326-330
```
326: **Consequential** means what the `coordinator` skill's `SKILL.md`, "The curator's role and decisions", gives: it reverses, bends or reads anew a decision of his; it touches microGPT's lines, speed or readability; it chooses among ways that the record does not settle, where the three principles split or are silent; or it cannot be undone.
327: 
328: ### The consequential forks
329: 
330: N1 (the numeral types as value objects with fields), N4 (point 3, `RadixPointNumeral`'s `asFloat`), and F5 to F7 taken together are in section 2. Each is below with its rung, at its default.
```

#### explorations/coordinator/CLIMB-BATCH-29.md:349-360
```
349: 9. **N1 (consequential). The numeral types as plain value objects with Fortress fields, in `Library/FortressLibrary.fsi` and `.fss` beside `Ratio`.** `trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }` declares the four getters abstract; `value object NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral`, whose `fractionDigits` is 0; `value object RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral`. No binding: walk builds one by its constructor, found as walk's loader finds the library's exceptions (`interpreter/glue/StaticNativeApp.java:281-286`, `getRootValue`). In `FortressBuiltin`, a native component, an object holds no field under walk (the mechanism of row 926, `BuildNativeEnvironment`; the row itself is closed, for `File`, which ceased to be native), so they leave it. The way not taken: section 2.
350: 10. **N2. The checker's names switch by library**, as `CHARACTER` does (`compiler/Types.java:78-91`): `INT_LITERAL` and `FLOAT_LITERAL` name the prelude's `IntLiteral` and `FloatLiteral` under the compiler's libraries and `FortressLibrary`'s `NaturalNumeral` and `RadixPointNumeral` under the one library. Default: so. The way not taken: rename the prelude's two traits, an edit of the prelude (P-37).
351: 11. **N3. The getters' names and types:** `digits`, `fractionDigits`, `radix`, `digitValue`, the names the prototype proposed (section 7.1), `ZZ32` for the first three and `ZZ` for the value, which a 20-digit numeral needs; `Numeral` extends `Number`, as `IntLiteral` does today, so the library's `excludes` clauses and P-160's Meet Rule readings stand with the names changed. Default: so. The ways not taken: the Draft's letters `n`, `m`, `r`, `v`, which the specification keeps beside each name; `Numeral` outside `Number`.
352: 12. **N4 (consequential; point 3). `RadixPointNumeral` declares `asFloat`, by one rounding, as `NaturalNumeral` does.** Section 2.
353: 13. **N5. One rounding by a new pair of helpers,** a rational `v / r^m` correctly rounded to a double and to a float, in an existing helper class of the float arithmetic or a new one, bound by P-58's form, called by `RR64`'s and `RR32`'s coercions and by both numeral types' `asFloat`; walk's Java conversions call the same Java methods, so the two paths round alike. The prototype's `roundToDouble` and `roundToFloat` in the code generator are the precedent (its section 1, step 3). Default: so. The way not taken: `QQ`'s `asFloat`, `asFloat(num) / asFloat(den)` (`Library/FortressLibrary.fss:656`), which rounds up to three times.
354: 14. **N6. Walk's choice of a declaration reads a numeral argument as the checker does.** A declaration whose parameter at that position is the numeral's own type, or its default, fits the numeral as it is, and the default ranks as no coercion; the most specific of those that fit as they are wins (P-49); if none fits, the coercion attempt runs, and a tie that only numerals make reads each at its default (`Specification/basic/inference.tex`, "A Numeral Whose Conversions Tie", widened by P-173 to float numerals, which read `RR64`). So `x + 1` runs `ZZ32`'s `+` as today, `u = 0` for `u: NN32` runs `NN32`'s pair, `1.0 s` runs `RR64`'s juxtaposition, and `1/2 = 0.5` runs `QQ`'s pair. Default: so. The way not taken: walk's float numeral an `RR64` at evaluation, way F-c, which his default of item 446 declined.
355: 15. **N7. Where walk converts, and how.** At a chosen declaration's parameter, a typed binding, a field and a declared return type, the checker's places, a numeral converts from its exact value: into the eight number types in walk's Java, by the same conversion as the library's coercion, a numeral out of the type's range refused at the place when it runs, as walk refuses one at a binding today (row 325's walk half); into a numeral type as the numeral object; into a program's type through its coercion from the numeral type, called with the numeral object, its result kept for the site so that a site gives one object (review-queue item 440's default); else refused. Elsewhere, an untyped binding, `Any`, `Object`, `Number` or an unbounded type parameter, it takes its default, as F-74 gives it for integers today. A type parameter that several numerals fix takes the narrowest default holding them all, by a hook at the head of `EvaluatorBase.inferAndInstantiateGenericFunction` (`EvaluatorBase.java:72-94`), not at its three reads of a value's type, which are G's. Default: so. The ways not taken: a numeral object at every evaluation, which every `i + 1` would pay; conversion at bindings and fields only, as P-172's text names, which would leave a return of `QQ`, `RR32`, `NN32` or `NN64` unconverted.
356: 16. **N8. The pairs, kept and completed.** Every coercion from a numeral type has its pair both ways: the eight number types each with `NaturalNumeral`, `RR32` gaining its coercion from it (P-76; probe 1), and `QQ`, `RR64` and `RR32` each with `RadixPointNumeral`: 11 coercions, 11 pairs at the number types and 11 at the numeral types, each pair's body converting and comparing as the library's do today (`Library/FortressLibrary.fss:418`). Default: so. Under walk a pair's body runs with the numeral object; on the compiled path its fold waits for the switch-over (fork F6).
357: 17. **N9. SEQV of two numeral objects inside a coercion's body compares their reduced values,** `digitValue / radix^fractionDigits`, so `2.5` and `2.50` are strictly equivalent there and `0.1_2` and `0.5` are too (P-168's one exception; review-queue item 445's default); walk's rule for value objects field by field takes the two types as its exception. Default: so.
358: 18. **N10. A numeral object prints as the Draft writes a numeral,** its digits in its radix with the radix point after `digits - fractionDigits` of them and `_r` where the radix is not ten, so `C.8_16` in gives `C.8_16` out (the judgement's appendix); a numeral that took its default prints as its type does, `"" 2.50` giving `2.5`. Default: so.
359: 19. **N11. Walk's glue classes of the two objects stay in the tree, unused,** `interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java`, as climb batch 28's rung R left its own (its fork R3); walk's value classes `FIntLiteral` and `FFloatLiteral` are N's to keep, rework or replace. Default: so; the removal is the names batch's clean-up.
360: 20. **N12. The tests whose answer the design drops.** `tests/XXXRoundNearTieNumeral.fss` asserts 3 and 3 for `round(2.50000000000000001)` and `round(3.49999999999999999)`, where P-173's tie reading gives 2 and 4 on both paths (row 360, closed): it becomes a plain guard under a name of its topic that asserts 2 and 4, by `tests-writing.md`'s promotion steps. `tests/IntLiteralValue.fss` goes with row 578 and the object. `XXXNumeralFloatRungP` (row 443), `XXXNumeralWithNN32` (row 484) and `XXXRadixTenPointNumeral` (row 361) are promoted where your change makes them pass. `XXXextendIntLiteral` and `XXXextendFloatLiteral` name the new types, still refused. Default: so.
```
### Rung C forks (C1 to C8)

#### explorations/coordinator/CLIMB-BATCH-29.md:364-371
```
364: 21. **C1. Where the default applies:** exactly P-173's places that fix no type, an untyped binding, a parameter of `Any`, `Object`, `Number` or an unbounded type parameter, a static argument that numerals alone fix, a dotted receiver, and the branches of an `if` or `case` at an untyped binding, which the prototype did not build and the judgement's repair 4 names. Default: so; the prototype's receiver rule, the default only where it has the member, stays (its decision 2).
365: 22. **C2 (point 1). The written-only rule:** a numeral type written as a variable's, field's or return type, or as a static argument, is refused in a program, "IntLiteral cannot be written in a program" in the prototype's words, renamed for both names; files under `Library/` and `ProjectFortress/LibraryBuiltin/` are exempt, since the prelude writes `IntLiteral` as return types and no rung edits it (P-37), and N's library writes the numeral types as parameter types only, which its skeptic checks by grep. The rule reads written types, so `t = x` inside a coercion's body binds `t` at the numeral type (review-queue item 443). Default: so. The way not taken: a check of inferred types too.
366: 23. **C3. The static range refusal** (row 325; item 438): a numeral converted at an integer place outside the type's range is refused, and so is a numeral whose one rounding into `RR64` or `RR32` is an infinity. Default: so; P-173 says "a numeral outside the type's range", not only an integer's.
367: 24. **C4. No chain; a numeral's conversion into its own default ranks as no coercion wherever it lands.** `CoercionOracle.buildCoercion` returns the coercion it checks, without the prototype's `viaDefault`: a program's type with no coercion from the numeral type refuses a numeral (item 439's default). A numeral fits as it is a parameter of its own default type, as it fits `Any`, `Object`, `Number` or an unbounded type parameter (fork C1), and its conversion into any other type ranks as a coercion: so `ee[\nat n\](x: ZZ32)` and `ee(x: Any)` both fit `ee(5)` as it is and the narrower runs (fork C8), P-173's reading of P-49, and the rule walk's dispatch keeps (fork N6). This is the prototype's step 5 in its narrow form, the mark in `buildCoercion` of a numeral's coercion into its default (its section 1, step 5); probe 1 measured the one library clean with it and the pairs (1a, count 0 and distance 0) and without it (1b), and the prototype measured that it changed no compiled test's verdict (its section 4.6). Default: so. The way not taken, the record's as drafted: the default ranked as a coercion at a parameter of exactly the default type, which leaves the checker's static choice at `ee(x: Any)` while the run answers 1 (the prototype, section 4.3), and splits the checker's rule from walk's.
368: 25. **C5. A size read as a value is a `ZZ32`** (row 486; item 441; P-40): `KindEnv.getType` answers `ZZ32` for a `nat` or `int` parameter (`scala_src/typechecker/staticenv/KindEnv.scala:66-72`), and the code generator converts the class loader's constant, which it builds as an `IntLiteral` (`compiler/codegen/CodeGen.java:6336-6345`), to a `ZZ32` where the size is read. `tests/XXXNatValueNN32RungK.fss` asserts the `NN32` binding that P-173 drops: it becomes a test of P-173's answer, the `ZZ32` binding 3 and the `NN32` binding refused, with a substring of walk's message that names no class, since G changes walk's type text. Default: so.
369: 26. **C6. A negative constant at a program's type** reaches it as prefix `-` on the program's coercion of the natural numeral, so the program's coercion sees the four numbers of a written numeral only (the judgement's repair 3, which he took); a program's type with no `-` refuses it. Default: so. Today's fold already makes a negative integer node (F-262), so C meets it on its own tree.
370: 27. **C7. Rows 362 and 506.** Their `XXX` tests turn red under the default (the prototype, section 4.3): a bare float numeral at the prelude's `Object` is an `RR64`, and four numerals no longer reach the cap. Default: promote or rewrite each by what remains, closing the row or giving its whole new line in `record.md`.
371: 28. **C8. `InferO2Pos.fss:18-19`:** `gg(5, w)` runs `gg[\T extends Number\](x: ZZ32, y: T)` and `ee(5)` gives 1, P-173's answer (P-49: both declarations fit the default as it is, and the narrower wins). Default: respell the two lines to it.
```
### Rung F forks (F1 to F8)

#### explorations/coordinator/CLIMB-BATCH-29.md:375-382
```
375: 29. **F1. The forms of a folded result,** each a numeral as written or an operation on such numerals, so that a program's coercion sees the four numbers of a written numeral only (repair 3): an integer as an integer numeral, negative as today's negative node (F-262); a result of operands among which one has a radix point, whose denominator divides a power of ten, as a decimal radix-point numeral (`0.1 + 0.2` is `0.3`), negative as prefix `-` on it; any other quotient as the reduced quotient of two numerals: `n / d` of two integer numerals for operands without a radix point (`7/2` is `7 / 2`), so that it is a `QQ` where nothing fixes a type, and `p.0 / d` where one has a radix point (`0.1/3` is `1.0 / 30`), so that the float tie reads it `RR64`; and at an `RR64` place the quotient's one rounding is IEEE division of two exact doubles, exact while both fit 53 bits. Default: so. The way not taken: the prototype's numeral in the denominator's radix, `1/3` a radix-3 numeral, which defaults to `RR64` against item 442's `QQ` and hands a program's coercion a numeral nobody wrote.
376: 30. **F2. What the fold leaves alone, and the two repairs** (probe 3): the operators whose meaning needs a width, the wrapping and saturating `BOXPLUS`, `DOTPLUS`, `BOXMINUS`, `DOTMINUS`, `BOXDOT`, `BOXCROSS` and `DOTCROSS`, the bitwise operators and the shifts, are not folded, so their operands take their types and the operator its meaning; `CHOOSE` folds where 0 ≤ k ≤ n and gives 0 otherwise, as walk's `ZZ32` answers; a division by zero and a result that IEEE arithmetic could make `-0.0` stay as written, as the prototype kept them. Default: so.
377: 31. **F3. The fold runs in walk's phase order too,** after `PRETYPECHECKDESUGAR`, as in the compiler's (`compiler/phases/PhaseOrder.java:125-147`), so `2147483647 + 1` is the `ZZ64` 2147483648 and `-2147483648` a `ZZ32` on both paths; `NativeHelperFamilyZZ32Walk.fss:31` and `ChooseZZ32Walk.fss` get typed operands where they mean `ZZ32` arithmetic (probe 2). Default: so.
378: 32. **F4 (point 2). Two natural numerals of one radix joined by `||` fold into one natural numeral,** whose digits are both numerals' digits in order, leading zeros kept (`Specification-1.0-frozen/basic/expressions/constant.tex:80-82`). Default: so. The ways not taken: dropped, so that `deadc_16 || 0de_16` finds no `||`; given a written size, which no library declares.
379: 33. **F5. A program's coercion from a numeral type, on the compiled path, is called once per class, when the class loads,** and each evaluation of the site reads the result, one object per site (item 440); a coercion that raises fails the class's load. Until the switch-over the coercion receives today's compiled numeral value, of the prelude's `IntLiteral` or `FloatLiteral`, and its four numbers wait for the one library's numeral objects, a line for the names batch. Default: so.
380: 34. **F6. The pairs' fold on the compiled path waits for the switch-over.** P-173 folds "their conversion of a numeral"; the prelude declares no pair at a number type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:916` is `IntLiteral`'s own), so no compiled test can show it before then, and after it a pair's body converts the numeral object correctly unfolded. Default: so, with a PLAN line for the names batch.
381: 35. **F7. A numeral at a `QQ` place is not folded on the compiled path,** since the prelude has no `QQ` to test against (the prototype, step 3); the compiled `SEQV` of two numeral values by their reduced value waits for the switch-over too. Default: so.
382: 36. **F8. Typed-place constants as the prototype built them,** `CoercionDesugarer.foldsTo` and the code generator's one rounding (the prototype, step 3), with `XXXFloatNumeralOneRounding` promoted (row 862); a numeral out of range keeps its coercion call, which C refuses statically on the merged tree. Default: so.
```

### Section 4, rung N 'What you build'

#### explorations/coordinator/CLIMB-BATCH-29.md:421-430
```
421: **What you build.**
422: - The tests first (below).
423: - `Library/FortressLibrary.fsi` and `.fss`, beside `value object Ratio` (`.fss:648`): `trait Numeral` and the two value objects, their getters, `asFloat` on both (fork N4), `asString` (fork N10), and the conversions in Fortress over the fields: `digitValue` into the integer types by their checked getters, `Ratio(digitValue, radix^fractionDigits)` reduced into `QQ`, the helper pair into `RR64` and `RR32` (fork N5).
424: - In each number type, the coercion from each numeral type it converts from, renamed or new, and its pair, both ways (fork N8): `RR64` (`FortressLibrary.fsi:295-297`, `.fss:387-389`, the pair at `.fss:418`), `QQ` (`.fsi:399-404`, `.fss:563`, `:582`), `AnyIntegral` (`.fsi:451`, `.fss:661`), `NN64`, `ZZ32`, `ZZ64` and `ZZ` (`.fsi:498-499`, `:563`, `:637-639`, `:712-716` and their bodies), `NN32` (`FortressBuiltin.fsi:134`, `:144`, `.fss:431`, `:454`) and `RR32` (`FortressBuiltin.fsi:47`, `.fss:217`), which gains both. `RR64 comprises { Float }`; `Float`'s `asFloat(self): RR64` (`FortressBuiltin.fss:82`; the prototype, step 1c); `NN32`'s `^` over the numeral (`FortressBuiltin.fsi:185`).
425: - `value object IntLiteral` and `value object FloatLiteral` removed from `FortressBuiltin.fsi` and `.fss`, with their 24 glue bindings; every other line that names either type renamed or dropped (probe 4: 18, 18, 38 and 63 lines in the four prelude files of the one library), the `excludes` clauses among them; `Library/Constants.fsi:16-17` and `.fss` at `RR64`; `Library/ReflectiveQuickCheck.fss:40` and `:157`, whose `theType[\IntLiteral\]` C's rule refuses, at the numeral's default.
426: - The helper pair (fork N5), in `ProjectFortress/src/com/sun/fortress/nativeHelpers/`, with the library's bindings and walk's carriers (F-299).
427: - `ProjectFortress/src/com/sun/fortress/compiler/Types.java`: `INT_LITERAL` and `FLOAT_LITERAL` switched by library (fork N2). `scala_src/typechecker/impls/Functionals.scala`, `isNumeral` and `numeralReading` (`:419-436`) only: a numeral with a radix point counts as a numeral at a tie and reads as `RR64` (the prototype, step 1). Nothing else of the checker: rung C builds the default.
428: - Walk, under `ProjectFortress/src/com/sun/fortress/interpreter/`: `Evaluator.forIntLiteralExpr` and `forFloatLiteralExpr` (`evaluator/Evaluator.java:1631-1637`), walk's numeral values, its choice of a declaration for a numeral argument (fork N6), its conversions at a parameter, a binding, a field and a return (fork N7; `LHSEvaluator.java:218-226` is the binding's), the hook at the head of `EvaluatorBase.inferAndInstantiateGenericFunction` (`:72-94`), the numeral object built where a parameter of a numeral type or a program's coercion receives it, and `SEQV` of two numeral objects (fork N9). A numeral out of range at a typed place raises there when it runs.
429: - Not yours: the checker's default and refusals (C); the fold and the code generator (F); walk's reads of a value's type at inference and walk's type text in messages (G); strings (S); the specification and Appendix I's natives effect (T, the gather).
430: 
```
### Section 4, rung C 'What you build'

#### explorations/coordinator/CLIMB-BATCH-29.md:469-479
```
469: **What you build.**
470: - The tests first (below).
471: - From the prototype's step 2 (PROTO `Step 2, the checker`; the patch's `scala_src/` files, which you apply by hand where they fit): `defaultNumeral` and its sites, `Decls.scala`'s four untyped bindings, `Functionals.scala`'s `Any`, static-argument, receiver and tie sites, the joins (fork C1), the narrowest default for a type parameter that several numerals fix: `pick(3, 3000000000)` a `ZZ64` on the prelude, which declares no coercion into `RR64` from an integer numeral, and `<|3000000000, 0.5|>` a `List[\RR64\]` against the one library, read by the count stage's driver as the prototype read its answers (its section 4.4), not a gated test.
472: - `TypeWellFormedChecker.scala`: the written-only rule (fork C2).
473: - The range refusal (fork C3) where the checker converts a numeral at a typed place.
474: - `CoercionOracle.buildCoercion` without the prototype's chain, `viaDefault`; its mark of a numeral's coercion into its default as no coercion kept, the prototype's step 5 (fork C4).
475: - `scala_src/typechecker/staticenv/KindEnv.scala:66-72` and `compiler/codegen/CodeGen.java:6336-6345`, the size read as a value (fork C5).
476: - A negative numeral constant at a program's type (fork C6).
477: - The compiled tests that the default flips or breaks, by the prototype's section 4.3, each respelled to keep what it checks and named in your report: the nine team tests that write `IntLiteral` (`Compiled5.ah:17`, `5.aj:18-19`, `5.ak:21`, `6.az:15`, `9.g:18-19`, `9.j:17`, `9.p:18-19` and `:26`, `9.t:24` and `:37`, `9.u:27`), at the types they mean; the pinned texts of `XXX6at.test`, `XXX6bw.test` and `XXXApplicationErrors.test`; the eight revival tests' `IntLiteral` arms (`InferCoercionShapes:44`, `InferO2Meet:11`, `InferO2Num:10`, `InferO2Pos:12`, `InferO2Z64:10`, `InferOpAnyZW:10`, `InferResultOnlyLabelBody:9`, `XXXNumeralBeyondWidthMax:9`); `library_tests/IntLiteralArithRung7:35` and `IntLiteralRung6:41`; `InferCoercionShapes:72` and `InferO2Num:20` to `ZZ32`; `InferO2Pos:18-19` (fork C8); `XXXInferComboCap` and `XXXNumeralPrintRungR` (fork C7). Find any other by `git grep -w IntLiteral` and the suite.
478: - Not yours: the library, walk and the checker's names and tie (N); the fold and the constants (F); the prelude.
479: 
```
### Section 4, rung F 'What you build'

#### explorations/coordinator/CLIMB-BATCH-29.md:513-521
```
513: **What you build.**
514: - The tests first (below).
515: - `compiler/phases/PhaseOrder.java`: the fold in `interpreterPhaseOrder` after `PRETYPECHECKDESUGAR` (fork F3).
516: - `compiler/desugarer/IntegerLiteralFoldingVisitor.java`: the fold of numerals alone, integer and radix-point operands, `+`, `-`, multiplication, `/` by a nonzero numeral, `^` by an integer numeral (exponents beyond 4096 left), prefix `-`, `|_|`, `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `MIN`, `MAX` and the comparisons, into the forms of fork F1; what it leaves and the two repairs (fork F2); the concatenation of two natural numerals (fork F4).
517: - `compiler/desugarer/CoercionDesugarer.scala` and `compiler/codegen/CodeGen.java`, `forFloatLiteralExpr` (`:2035-2045`) and `forIntLiteralExpr` (`:4207`): typed-place constants rounded once (fork F8; the prototype, step 3).
518: - `CodeGen.java`: a program's coercion from a numeral type called once per class, when the class loads (fork F5).
519: - `NativeHelperFamilyZZ32Walk.fss:31` and `ChooseZZ32Walk.fss`: typed operands where they mean `ZZ32` arithmetic (probe 2).
520: - Not yours: the checker under `scala_src/typechecker/` (C, N); the library and walk's evaluator (N); the string fold (S); the pairs' fold and the compiled numeral `SEQV` (forks F6, F7).
521: 
```

## 1.4 Fable review: explorations/coordinator/climb-batch-29-review.md, section 1 whole

#### explorations/coordinator/climb-batch-29-review.md:5-35
```
5: ## 1. For the curator
6: 
7: **Verdict: ready to launch, with every consequential fork and every point with no default at the default this review recommends; no default reverses a decision on record, and one fork as drafted, C4, read P-173's `gg(5, w)` otherwise than P-173 does and is corrected below.** The record describes the tree it was drafted against: `main`'s code at `d2703377b0` is the base build's `8cde0b2c4f`, and the 32 commits since the base touch `explorations/` only (`git diff --name-only 8cde0b2c4f HEAD | grep -v '^explorations/'` prints nothing). Every file, declaration, line, row, decision, item, commit and specification passage that the six sections cite is where the record says, on this code: `isNumeral` and `numeralReading` at `Functionals.scala:419-437`; the head of `inferAndInstantiateGenericFunction` at `EvaluatorBase.java:72-94` and its three reads of a value's type at `:602`, `:782-785` and `:936`; `forStringLiteralExpr` at `Evaluator.java:1018-1020` and the two literal methods at `:1631-1637`; the binding's conversion at `LHSEvaluator.java:218-226`; `forFloatLiteralExpr` at `CodeGen.java:2035-2045`, `forIntLiteralExpr` at `:4207` and `isSizeInValuePosition` at `:6336-6345`; `KindEnv.getType` at `:66-72`; the two phase orders at `PhaseOrder.java:125-133` and `:137-147`; the fold's `factorial_aux`, `choose`, the `+`/`-` lines and `CHOOSE` at `IntegerLiteralFoldingVisitor.java:38-56`, `:63-66`, `:89-90`; `FString.seqv` at `:35-38`; `equalityRule.sEquiv` at `:32-64`; `traitOf` at `ObjectPrims.java:61-77`; `raised` with `getRootValue` at `StaticNativeApp.java:281-286`; the switch of names at `Types.java:78-91`; the team's comment at `FIntLiteral.java:21-23`; `FloatLiteral` at `FortressBuiltin.fss:208-215` with its `asFloat` at `:213-214`, `IntLiteral` at `:549-629`, `Float`'s `asFloat` at `:82`, `RR32` at `:217`, `NN32`'s coercion and pair at `:431` and `:454`; the api's `FloatLiteral` at `:44`, `RR32` at `:47`, `NN32` at `:134` and `:144`, its `^` at `:185`; `Ratio` at `FortressLibrary.fss:648`, `RR64`'s coercions at `:387-389` and pair at `:418`, `QQ`'s at `:563` and `:582`, `AnyIntegral`'s at `:661`, `QQ`'s `asFloat` at `:656`, `RR64 comprises { Float, FloatLiteral }` at `:386` and `.fsi:294`; the api's coercions at `.fsi:295-297`, `:399-404`, `:451`, `:498-499`, `:563`, `:637-639`, `:712-716`; `pi` and `e` at `Constants.fsi:16-17`; `theType[\IntLiteral\]` at `ReflectiveQuickCheck.fss:40` and `:157`; the prelude's `BOXPLUS` throw at `CompilerBuiltin.fss:901`, `IntLiteral`'s own `=` at `:916`, `trait FloatLiteral` at `:996`, and no `QQ` in it; every team and revival test line that the rungs respell (section 3); the Working Draft's `literals.tex:83-129`, `:132-148`, `:163-176`, `constant.tex:75-82`, `binary.tex:1620` and `:1659-1662`, `trait-parameters.tex:84-86`; the specification's `literals.tex:132-148`, `:149-165`, `:166-176`, `constant.tex:44-74` and `:81-88`, `numbers.tex:40-54`, `conversions-coercions.tex:74-90` and `:98-101`, `inference.tex:183-187` and `:299-317`, `objects.tex:50-60`, `binary.tex:906-911` and `:1118-1132`, `trait-parameters.tex:97-99`, `changes.tex:2764`, `:3729-3822`, `:4416` and `:4673-4674`, and the five Appendix I entries that fork T1 names. The 121 briefing keys of section 1 as corrected, with the repeats across rungs (119 as drafted; 90 distinct, 86 of them outside this record and its probes) each match one place by `facts-extract.sh --check` on `main`. The counts hold: 18, 18, 38, 63, 2, 2 and 2 lines naming the two types in the seven library files, 24 glue strings in `FortressBuiltin.fss`, 791 walk tests (205, 195, 197 and 194) and 1,475, 86, 263 and 130 at climb batch 28's gate; the cost's sums (3.0M, 2.3M, 1.3M and 0.3M, about 6.8M) and its evidence lines against climb batch 28's review; the prototype's 122 s and 112 s, probe 1's 113 s and 108 s; the disk (21,425,372 KB free now by `df -P`, 20.4 G, floor 13 G for six rungs). No two rungs change one declaration, no rung needs another's result but as `landsOnlyWith` says, and the shared-line table holds against this code, with one adjacency named below (section 3).
8: 
9: **The changes made, in the record** (section 2 gives each its reason):
10: 
11: - Fork C4 and its three echoes (section 2's reason 3, C's blurb in section 1, C's "What you build"): the prototype's step 5 stays in its narrow form, a numeral's conversion into its own default ranked as no coercion, so that `ee(5)` and `gg(5, w)` run the `ZZ32` declaration by P-173's reading of P-49 on the checker as under walk (fork N6); the chain, `viaDefault`, stays out. C's briefing key for probe 1 now says the library is clean with step 5 and without it.
12: - Rows 954 and 955, the planner's two fold defects filed tonight (`2f4b3d7d01`), put where the record named "two rows filed by plan": section 2's "Before the batch runs", section 5's "Rows filed by plan", section 6's step 2 and "The ledger", F's "Rows", and F's briefing in section 1, which gains `ledger:954` and `ledger:955` as checks (21 keys, 12 checks).
13: - Rung S's two sentences that named the skill's `revival-changes.md` by its file name, one point to report in section 1 and the "Specification" paragraph of its section, now describe the sentences made false: the skill's sentences that walk and the compiled path depart from P-171's answer at a string literal (row 945).
14: - Fork F1's forms of a folded quotient, worded by the operands rather than the value, with the three examples `0.1 + 0.2` is `0.3`, `7/2` is `7 / 2`, `0.1/3` is `1.0 / 30`.
15: - Fork N1's ground for placing the objects in `FortressLibrary`: row 926 is closed, for `File`, and its mechanism stands for `FortressBuiltin`.
16: - C's "Overlaps by file" and section 4's shared-file table: C puts no new function within five lines of `Functionals.scala:419-437`, where the prototype's `isLiteralType` went and where N edits.
17: - T's citation of the two concatenations, `constant.tex:81-88`, not `:75-85`.
18: - The three points with no default, forks N1 and F5 to F7, the header and "Before the batch runs" name this review's recommendation; the disk line says that `fortress-base28` is gone.
19: 
20: **The points with no default on record and the consequential forks, each with this review's recommendation, which stands by your go of 23:3x.**
21: 
22: - **N1, the numeral types as plain value objects with Fortress fields: this review recommends the default.** P-174's words are a constructor with fields: "the four numbers ... are fields of the value, not static parameters", and "Coerce is just invocation of the numeric type constructor that gets the constants from the parser"; the library's own form for a value with parts is `value object Ratio(num: ZZ, den: ZZ)` (`FortressLibrary.fss:648`). The team's two libraries held their numerals in Java because they were run-time values with arithmetic, which P-173's fold retires: on the compiled path no numeral object exists at run time but at a program's own coercion, once per class (fork F5), and under walk only at a pair's parameter or a program's coercion, where P-29 makes walk's speed no measure. A trait over Java-held values would keep four or five bindings where P-169 removes 24 and would need a carrier of the four numbers on both paths (the prototype's section 7.1); fields need none, and the four getters are the api either way, so the fork can be undone. No third way serves the goal better.
23: - **N4, `RadixPointNumeral` declares `asFloat`: this review recommends yes, by one rounding.** P-165's list named `IntLiteral` from its first text of 2026-11-06 (`history:P-165`), when `FloatLiteral` extended `RR64` and had `RR64`'s `asFloat` and its own (`FortressBuiltin.fss:213-214`); the rewrite of 23:47Z changed the name only, so the list's silence on the float numeral is history, not a choice. Dropping it would change `asFloat(x)` at a concrete type, against P-165's own sentence, and a program's coercion body may want the one-rounded double, `coerce(x: RadixPointNumeral) = T(x.asFloat)`. It reads P-165's list anew, so it is consequential and goes on your list; the record writer adds `RadixPointNumeral` to P-165's list, your word to confirm.
24: - **F5 to F7, the three pieces that reach the compiled path only at the switch-over: this review recommends the defaults, each with its PLAN line for the names batch.** P-37 forbids the prelude any declaration, and the prelude declares no `QQ`, no `=` pair at a number type (`CompilerBuiltin.fss:916` is `IntLiteral`'s own) and a `FloatLiteral` with `asRR32` and `asRR64` only (`:996-999`), so before the switch-over no compiled program can observe the four numbers, a pair's fold or a numeral at a `QQ` place; the deferral changes nothing observable and each piece is one rung at the names batch. Your words of 15:0x, the two implementations doing the same thing even before the switch-over, are served where both paths can show it: the default, the fold, one rounding, the static range refusal and the once-per-class call, which F builds and tests now with a printing coercion. Not consequential; P-173's "their conversion of a numeral folded" has nothing to fold on the prelude, so no reversal.
25: - **C2, `t = x` inside a coercion's body binds `t` at the numeral type: this review recommends yes.** P-174's rule is about what a program writes, and the body already holds the value through its parameter; a check over inferred types would add checker code (P-148) and protect nothing, since `x` itself passes to any `Any` parameter; the team's later word, the prelude, binds `IntLiteral` anywhere, and nothing speaks against. One point for your sight, not a change: an inferred return type escapes the written-only rule the same way, `g(x: NaturalNumeral) = x` returning the numeral type, so `y = g(3)` binds a numeral value; P-174's "never as a return type" can be read of written types, as fork C2 reads it, and a rung can widen the rule later.
26: - **F4, two natural numerals of one radix joined by `||` fold into one: this review recommends folded, as drafted.** The Working Draft's sentence (`constant.tex:75-82`) is the team's one word, the 2012 restart's expression chapters say nothing of it (no "concatenat" in `Documentation/Specification/Prose/Language/Expressions/*.tick`), and neither implementation contradicts it: run at the base, `deadc_16 || 0de_16` under walk finds no `||` at all, "Failed to find any matching overload, args = (912092: ZZ32,222: ZZ32)", since the library's `||` is over strings, a string with a number or a tuple, and nothing else (`FortressLibrary.fsi:2641-2664`). So the fold adds what no path has and changes no program that runs today; the `||` that P-174 drops is the binary chapter's, between a bit sequence and a numeral (`binary.tex:1659-1662`), another operator. Neither model program holds `||` (`grep -c` prints 0 for both). Not consequential.
27: 
28: **The other forks that are consequential by the skill's test, each landing at its default on your list.** I weighed the 46 against it (section 4). Two more than the record's three: **C4 as drafted** read P-173's `gg(5, w)` anew, the mechanism rather than the outcome, and is corrected to P-173's reading (section 2, change 1). **N3, the getters' names** `digits`, `fractionDigits`, `radix` and `digitValue`: the record is silent and the three principles are silent on a getter's name, since the Draft's `n`, `m`, `r`, `v` name static parameters, not members, so by the letter of the test the fork is consequential; its default follows the library's way of naming a getter after what it answers (`numerator`, `denominator`, `asZZ32`), the specification keeps the Draft's letters beside each name (fork N3), and the names can be changed at one rung. None reverses, bends or reads anew a decision of yours, none touches a model line, the model's compiled speed or its readability (both programs change no line and, by reading, no bit; the judgement's appendix), and each can be undone.
29: 
30: **The record's points for you hold as written** (section 2, "Points the batch lists for him"): the team's lines, `NumberPrintTest.fss:16` and `:31`, `sequivTest.fss:58` and `:94` (back to the team's `equiv`, which the revival changed to `nequiv` at `598331c0d2`), `LongStringTests.fss:121` and `:141`, and the twelve compiled tests of fork 5, each a line for your sight after the landing (review-queue item 444); the rung split against PLAN's areas (fork 1); what walk and the compiled path do differently; the two new Appendix I entries and the four revised. Two points this review adds: the inferred return type under C2, above, and that `tests/XXXRoundNearTieNumeral.fss` asserts 3, 1 and 3 for three numerals near a tie, where P-173's tie reading gives 2, 0 and 4 on both paths (fork N12; row 360 closed by P-173).
31: 
32: **The defaults the batch takes, on your review list.** Forks 1 to 46 each follow a decision on record (P-173, P-174, P-76, P-172, P-171, P-165, P-168, P-169, P-40, P-48, P-49, P-37, P-96, P-148), his go of 23:3x (way A, G1), his word of 07:51 (G3), a review-queue default (items 438 to 446), a probe's finding (probes 1 to 4), a row's named fix, the library's own way (`Ratio`'s form; the getters' names; `CHOOSE`'s 0), the judgement's repairs that he took (C6, F1's signed constant), or the batch workflow's practice (forks 2, 3, 4, 7, 8, N11, C7, G4, S1, T3), and each can be undone.
33: 
34: **Notes for the coordinator, outside this review's files.** The generator `compile-ladder/plan-29/manifest/` was being written beside this review and was not read beyond its header; its keys are those of section 1 as corrected here: F gains `ledger:954` and `ledger:955` as checks with the reason lines of section 1, C's reason for `PROBES Probe 1. The` changes, and S's point to report on the sentences made false is reworded; no key changes otherwise, and all 121 match one place. The planner's `PROBES.md`, probe 1, "What it means", still says that rung C builds neither step 5 nor the chain; the record now keeps step 5 in its narrow form, and the probe note was not edited. The probe program and caches of this review are under `/tmp/fable-review-29/`, outside the tree. The cost reads as plausible: 6.8M for six rungs is 1.1M a rung against climb batch 28's 0.95M a landed rung, right for N, the largest rung yet, and for C's three count runs; the skeptics at 0.28M to 0.5M follow that batch's mean of 357K with N's and C's above it. Nothing was written to the original tree; `git status --porcelain` after this review's edits shows only its two files.
35: 
```

# 2. The landing

## 2.1 explorations/compile-ladder/climb-batch-29/RECORD.md

#### headings of explorations/compile-ladder/climb-batch-29/RECORD.md
```
3:# Climb batch 29: the gather's record
11:## The landed commits
24:## The rungs applied, in order
37:## Conflicts
41:## The tests on the merged tree
55:## The count of the bindings
59:## Rows opened
80:## Rows closed
92:## Each rung: the skeptic's fixes and rulings, and the gather's corrections
101:## Files written from the journal
105:## Not landed
109:## Handover lines
118:## Points to report
187:### Text mismatches
193:## Items for the curator, and where each is in `PLAN.md`
211:## Left for the coordinator and the skill writer
217:## Revival changes, for the skill writer
219:### F (`rung-literal-fold`, `955cad76df`)
228:### N (`rung-numeral-types`, `3de571bac7`)
234:### C (`rung-numeral-checker`, `53a6074ed7`)
243:### S (`rung-string-literals`, `e53480fc6e`)
249:### G (`rung-walk-language-types`, `12292add28`)
255:### T (`rung-literals-spec`, `4978a9b16e`)
```
### Passages on the numeral types (the lines that name them are listed by grep -n -i 'numeral|asFloat|IntLiteral|FloatLiteral'; the passages follow whole)

#### explorations/compile-ladder/climb-batch-29/RECORD.md:1-24
```
1: <!-- Climb batch 29's gather record: the rungs F, N, C, S, G and T applied on main in that order, their commits, the rows opened and closed, the merged tree's tests, the demos and the specification's build, the points to report, the items for the curator and where each is in PLAN.md, and each rung's revival change for the skill writer. -->
2: 
3: # Climb batch 29: the gather's record
4: 
5: Written at the gather stage of climb batch 29 (2026-11-09), the batch of `explorations/coordinator/CLIMB-BATCH-29.md`, phase 4's seventh batch, the switch-over: the literals, on `main` from the base `b430f9f42800e98b0c9848edd654a78b0808dd15`. All six rungs were approved, N and T after the judge's ruling, and all six landed.
6: 
7: **Preconditions.** `git status --porcelain` printed nothing, and `b430f9f428` is an ancestor of `HEAD` (`git merge-base --is-ancestor`, exit 0; `HEAD` was `b430f9f428` itself).
8: 
9: **Scratch.** The patches are `tmp/gather/<slug>.patch` in the main tree, each `git diff b430f9f42800e98b0c9848edd654a78b0808dd15...<branch>`. Each patch was applied on `main` with `git apply --3way --index`, its record folded and its commit made before the next. Every branch is left as it was.
10: 
11: ## The landed commits
12: 
13: | Rung | Slug | Branch head | Commit on `main` |
14: |---|---|---|---|
15: | F | `rung-literal-fold` | `e5a0a63ba7` | `955cad76df` |
16: | N | `rung-numeral-types` | `e461c79d7d` | `3de571bac7` |
17: | C | `rung-numeral-checker` | `812890150a` | `53a6074ed7` |
18: | S | `rung-string-literals` | `b20793b504` | `e53480fc6e` |
19: | G | `rung-walk-language-types` | `4d7b731800` | `12292add28` |
20: | T | `rung-literals-spec` | `c569335d69` | `4978a9b16e` |
21: 
22: The rows' close is ``a711ca76ba`, after the gather's repair of one expected failure's key on the merged tree, `8d93b7d196``, "Close the rows climb batch 29 fixed"; this record is the commit after it.
23: 
24: ## The rungs applied, in order
```

#### explorations/compile-ladder/climb-batch-29/RECORD.md:59-78
```
59: ## Rows opened
60: 
61: | Row | Placeholder | Rung | Section | Claim, in short |
62: |---|---|---|---|---|
63: | 956 | NEW-F-2 | F | 7 | the fold leaves numerals alone unfolded where its result needs a prefix minus or `/` the component writes nowhere |
64: | 957 | NEW-F-3 | F (skeptic) | 7 | compiled, a numeral at a program's own generic type calls the coercion at each evaluation |
65: | 958 | NEW-N-1 | N | 7 | under walk a float numeral to the left of an `RR32` runs `RR64`'s operator |
66: | 959 | NEW-N-2 | N | 4 | a `typecase` arm naming an undefined type loads and matches every value, on both paths |
67: | 960 | NEW-N-3 | N (skeptic) | 7 | a radix-point numeral keeps one leading zero only before walk reads its four numbers |
68: | 961 | NEW-C-1 | C | 7 | compiled, a negative numeral reaches a program's `coerce(x: IntLiteral)` signed |
69: | 962 | NEW-C-2 | C | 2 | compiled, a size of 2^31 or more read as a value raises `java.lang.Error` (CONTESTED) |
70: | 963 | NEW-C-3 | C (skeptic) | 7 | compiled, a numeral as a `typecase`'s selector keeps `IntLiteral` |
71: | 964 | NEW-C-4 | C (skeptic) | 12 | the code generator stops on a `typecase` tuple pattern with an untyped binder |
72: | 965 | NEW-S-1 | S | 10 | compiled, until the switch-over, a `Character` value before `||` and a string is refused |
73: | 966 | NEW-T-1 | T | 4 | under walk the library's `=/=` at a numeral is `true` where its `=` is |
74: | 967 | gather.2 | the gather (T's commit) | 7 | under walk a numeral that rounds to an infinity at `RR32` or `RR64` converts to `Infinity`, where the text makes it a static error |
75: 
76: NEW-F-1 is row 318 (F's skeptic), not added; row 318 rewritten. Each placeholder was replaced by its number in the rung's REPORT.md, SKEPTIC.md and JUDGE.md, in the ledger's rows (675, 963) and in Appendix I (`changes.tex:5163`), before the rung's commit; JUDGE.md's line on T's placeholder itself (`compile-ladder/rung-literals-spec/JUDGE.md:55`) and F's SKEPTIC.md lines on NEW-F-1 being row 318 keep the placeholder they describe.
77: 
78: Rows rewritten or noted, each whole line through `ledger.py rewrite` or `note`: F's 318 and 387 (387 again in N's commit, the getters repaired); N's 360 (its reproducer the promoted guard); C's 362, 506, 675, 390 and 446, and 675 and 963 for their placeholders; S's note on 923; G's 20, 510, 717, 774, 824, 846, 49, 96, 142, 272, 471, 527, 705, 156, 371 and 372, with 156's and 471's `EvaluatorBase.java` lines moved one more by N's hunk; not G's 432 and 338 lines (both rows close) nor 591 (gather.6).
```

#### explorations/compile-ladder/climb-batch-29/RECORD.md:80-100
```
80: ## Rows closed
81: 
82: Each by its rung's commit on `main` and its test, which passed on the merged tree in the runs above:
83: 
84: - F `955cad76df`: 862 `FloatNumeralOneRounding`; 954 `LiteralFoldCompiled`; 955 `none`, its test the unit test `NumeralFoldJUTest`, outside the test folders that `ledger.py` takes; 338 `NumeralFoldWalk.fss`, by the fold of `-2147483648` (gather.3).
85: - N `3de571bac7`: 943, 944 and 454 `NumeralTypesWalk.fss`; 443 `NumeralBeyondZZ32AtRR64.fss`; 484 `NumeralWithNN32.fss`; 361 `RadixTenPointNumeral.fss`; 578 `none`, the object `IntLiteral` gone with its test. Row 360 was already FIXED; its line now names `RoundNearTieNumeral.fss`.
86: - C `53a6074ed7`: 79 `LiteralDefaultCompiled.test`; 946 the same, with `LiteralDefaultResultCompiled.test` (`f5f4c57922`) in its note; 486 `NatValueZZ32Compiled.test`, with `XXXNatValueNN32Refused.test` and `tests/NatValueZZ32Walk.fss`; 325 `XXXNumeralBeyondZZ32Range.test`, with `NumeralBeyondWidthMax.test` and `XXXNumeralBeyondRangeInTuple.test` (`b212f67a0e`).
87: - S `e53480fc6e`: 945 `StringLiteralIdentityWalk.fss`, the compiled half `StringLiteralIdentityCompiled.test` in its note.
88: - G `12292add28`: 364 and 432 `LanguageTypeInstancesWalk.fss`, 432's float case by the probe above; 721 `ArrayInferredElementVectorWalk.fss`; 722 `OpenRangeInferredIndexWalk.fss`; 20 `none`, by the probe above, since the batch's first rule forbids a test asserting a static argument of a generic built from a numeral under walk (gather.4).
89: 
90: `ledger.py landing-check b430f9f42800e98b0c9848edd654a78b0808dd15` printed 'no finding' before the close commit `a711ca76ba`; `record.py check --base b430f9f428`: '0 failures'.
91: 
92: ## Each rung: the skeptic's fixes and rulings, and the gather's corrections
93: 
94: - **F.** Skeptic: `c68437686d`, a defect (one rounding below the least normal value); `5fdaeab699`, a correction (the generic-type site and the ZZ getters, two expected failures); `5c68eb91ac`, a correction (the unit test's comments); `61abbd8d7f`, a correction (NEW-F-1 is row 318; rows 387 and NEW-F-3; the skill sentences). No ruling. Gather: rows 318 and 387 rewritten, 956 and 957 added; F-339, F-340 added, F-262 and F-118 rewritten; its left item 2, `XXXZZOneGetterWalk`, promoted in N's commit, since N's `953d050966` stays.
95: - **N.** Skeptic: `a5f3cab523`, a correction (test comments); `e3f9f07dfb`, a defect (`radixPoint`'s radix 1); `794f7d908e`, a defect (`inRange` at `NN32`); `43d019ed3b`, a defect (a generic own type's coercion); `6408011e9b`, a defect (the dispatch caches' key); `953d050966`, a defect (a numeral at a declared return type), contested and upheld by the judge (`compile-ladder/rung-numeral-types/JUDGE.md`), no revert; `55de601879`, a correction (NEW-N-2 on both paths, NEW-N-3, two sentences made false); `2690c5aa15`, a correction (the questions carried). Gather: row 360 rewritten, 958 to 960 added, 387 rewritten; F-341 added, F-57, F-74, F-79, F-118, F-299, F-32 and F-328 rewritten; the natives effect and `revival-rr32`'s Effect revised (`changes.tex:2706-2715`).
96: - **C.** Skeptic: `f5f4c57922`, a defect (the default at a result with no declared return type); `b212f67a0e`, a defect (the range refusal at a tuple's elements); `c4c17302e6`, a correction (two expected failures, record corrections); `76efb477a7`, a correction (moved citations). No ruling. Gather: its left items, rows 390 and 446 rewritten, 963 in section 7 and 964 in section 12, and the closes of 946 and 325 naming the skeptic's tests; rows 362, 506 and 675 rewritten, 961 and 962 added; F-342 added, F-57 and F-73 rewritten; `revival-index`'s numeral sentence corrected (`changes.tex:4442-4446`); N's `Functionals.scala` citation re-anchored.
97: - **S.** Skeptic: `91762b1a68`, a defect (three tests the fold made pass without checking `||`); `a8c2d0b2a7`, a correction (the skill citation, F-249, moved lines). No ruling. Gather: row 923 noted, 965 added; F-343 added, F-249 rewritten; N's `Evaluator.java` citation re-anchored.
98: - **G.** Skeptic: `8cf51d2117`, a correction (row 20's test); `06fcd043b6`, a correction (the open rows whose walk text the change renames, row 272, four sentences made false); `703dec12d3`, a correction (moved lines). No ruling. Gather: its left item 1, the natives effect's `String` sentence (`changes.tex:4720`); left item 2 not needed, since row 338 closes by F's fold; the rows above; F-344 added, F-74, F-328, F-229, F-55, F-228, F-285, F-123 and F-253 rewritten; its `EvaluatorBase.java` citations moved one by N's hunk.
99: - **T.** Skeptic: `8a2b7ae816`, a correction (the string Effect's compiled answer); `11e753f17c`, a correction (one application per place); `4fe2cb1ab3`, a correction (the constant's kind from its operands); `1184add1d9`, a defect (the `=/=` departure), contested and upheld by the judge (`compile-ladder/rung-literals-spec/JUDGE.md`), no revert. Gather: its left items, the citations of REPORT.md set on `main`'s lines, row 966 filed and its number put into `changes.tex:5163`, `preamble.tex`'s list corrected (static expressions beyond the folds; `Numeral` no longer among the types not supported), row 945 closed by S; T's REPORT.md's other sentences made false corrected: `types-vals-vars.tex`'s `Numeral[\n,m,r,v\]` (section `types-libraries`) with a callout to `revival-numerals`, which gains it in its Affected sections, its Change and its Original text (`Specification-1.0-frozen/basic/types-vals-vars.tex:494-500`), `ranges.tex:55-58`'s box (a `nat` value a `ZZ32` on both paths), `revival-expected-contexts` (`wrap` at the numeral's default, `changes.tex:2605`); in `revival-numerals`' Effect the compiled coercion's class corrected to rung F's component class (`:5185-5189`), the interpreter's range sentence to the integer numerals with row 967, and the merged tree's departures named with their rows 956 to 963 (`:5190-5202`); row 967 with `XXXNumeralRoundsToInfinityWalk` (gather.2); F-345 and F-346 added.
100: 
```

#### explorations/compile-ladder/climb-batch-29/RECORD.md:105-117
```
105: ## Not landed
106: 
107: None: every rung of this batch was approved and landed.
108: 
109: ## Handover lines
110: 
111: - **F** (`955cad76df`): Rung F (`wip/rung-literal-fold`, head `1bf56ffa92` before its report): walk runs the numeral fold; numerals alone fold exactly on both paths into the forms of fork F1, with the operators of fork F2 left; `CHOOSE` and the wrapping operators repaired (rows 954, 955); typed-place constants rounded once (row 862); a program's numeral coercion once per site in the component class's static initializer; harness key `run_exits_nonzero`; seven tests respelled with typed operands; count 0 and distance 0 on its tree, the ladder subset unmoved, the 52 demos reaching their end; row 318 and row 956 with their `XXX` tests. The skeptic's: `c68437686d`, a numeral below the least normal value rounded once into `RR64` and `RR32`; `XXXNumeralCoercionGenericTypeCompiled` (row 957) and `XXXZZOneGetterWalk` (row 387, reached by walk's library); rows 318 and 387 rewritten.
112: - **N** (`3de571bac7`): Rung N landed the numeral types `NaturalNumeral` and `RadixPointNumeral` below `Numeral` in the one library with each number type's coercions and pairs, removed `IntLiteral` and `FloatLiteral` with their 24 glue bindings, and made walk convert a numeral where its place fixes a type; rows 943, 944, 454, 443, 484, 361 and 578 close, row 958 and row 959 are filed, and `TupleOrderMixedRefused` waits for rung G's key.
113: - **C** (`53a6074ed7`): Rung C landed the compiled checker's numerals: the default where nothing fixes a type, the narrowest default for a type parameter numerals alone fix, the numeral types written only as a parameter's type, a numeral out of range refused, a size read as a value a ZZ32; count and distance 0 and 0; C6 (a negative numeral at a program's type as prefix minus) not built, row 961.
114: - **S** (`e53480fc6e`): Rung S (P-171) is on `wip/rung-string-literals`: walk interns a string literal's text and compares flat strings by their carried Java strings, `equality.sEquiv` compares two `FJavaString`s' carried strings by `==`, and `PRETYPECHECKDESUGAR` folds `||` of string and character literals into one literal on both paths; row 945 closes, row 965 opens (the prelude refuses a `Character` value before `||`), six revival tests build their strings at run time, the stages stay 0 and 0, and the 52 demos reach their end.
115: - **G** (`12292add28`): Rung G of climb batch 29 lands row 364's way A: walk reads a value of `Int`, `Long`, `BigNum`, `Float`, `UnsignedLong` and of the four string objects at `ZZ32`, `ZZ64`, `ZZ`, `RR64`, `NN64` and `String` where it infers a static argument, also inside tuples (`interpreter/evaluator/types/LanguageTypes.java`, at `EvaluatorBase`'s three reads), and prints the nine by their traits in every type text (`FTraitOrObject.toString`); the ilk keeps a string object's name; rows 364, 721, 722 and 432's integer cases close, 717, 824 and 20 narrow, 510 and 846 renamed, and with the skeptic's lines 49, 96, 142, 338, 471, 527 and 705 renamed and 272's limit lifted for integer elements; six `XXX` tests promoted, two new; `ant testSystem` 793, 0 failures; stage-blind.
116: - **T** (`4978a9b16e`): Rung T wrote P-173, P-174, P-76, P-172 and P-171 into the specification in the revision form: the literals chapter's `NaturalNumeral` and `RadixPointNumeral` below `Numeral` with the four numbers as fields, the conversion where a place fixes a type and the default elsewhere, a program's type through its coercion once per place; the constant chapter's fold and both concatenations built; the coercion chapter's default beside coercion; the inference chapter's numeral section widened; a string literal one object; eight binary-chapter callouts and one at `nat` parameters; Appendix I's `revival-numerals` and `revival-string-literals`, four entries revised; the build clean; row 966 (`=/=` at a numeral, a departure of the library from `e =/= e'` being `NOT (e = e')`, with its `XXX` test) and the `Index` place to the curator.
117: 
```

#### explorations/compile-ladder/climb-batch-29/RECORD.md:118-133
```
118: ## Points to report
119: 
120: Each landed rung's points, from its worker's list and its skeptic's, the evidence merged; none holds the push (each `holdsPush` false, `cannotBeUndone` false). Lines cited at a rung's branch are its own; the gather re-anchored the ones an earlier rung's hunk moved (above).
121: 
122: **F** (`955cad76df`):
123: - The operators folded and those left alone, with reasons, and the forms of a folded result: `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:80-87`, `:274-333`, `:366-434`; `NumeralFoldJUTest` (9 tests OK, also on the merged tree); `compile-ladder/rung-literal-fold/REPORT.md`, "What changed and why".
124: - The phase order of both paths before and after, and each walk answer the fold changes: `ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java:130`; REPORT.md, "Programs run old against new" ('old: 2147483647 + 1 = IntegerOverflow' / 'new: 2147483647 + 1 = 2147483648'), with walk's library lines (`Library/FortressLibrary.fss:1093-1095` at the base among them).
125: - The two repaired defects with their tests and rows: row 954 (`LiteralFoldCompiled`, `NumeralFoldJUTest.testChooseOutsideItsRangeIsZero`), row 955 (`NumeralFoldJUTest.testWrappingAndSaturatingOperatorsAreLeft`); a third without a row, `n DIV 0` folded into `CompilerBuiltin.Infinity` at the base (`NumeralFoldJUTest.testDivisionByZeroIsLeft`).
126: - The typed-place constants, the rounding as written, row 862's numerals before and after: `compiler/desugarer/CoercionDesugarer.scala:28-55`, `:94-95`; `compiler/codegen/CodeGen.java`, `roundToDouble` and `roundToFloat` (`:4251` on `main`), as fixed in `c68437686d`; 'x =  1.0' / 'x =  0.9999999999999999'.
127: - The once-per-class call as compiled: a static field `numeral$coercion$N` of the component class, set in its static initializer (`CodeGen.java:7189-7234` on `main`, `numeralCoercionSiteDesc`); `NumeralCoercionOnceCompiled` 'coerce coerce start PASS'; `NumeralCoercionRaisesCompiled` '<clinit>', exit 1; generic program types not covered (row 957). The class read as the component's, put to the curator (F.worker.1).
128: - `NativeHelperFamilyZZ32Walk.fss` and `ChooseZZ32Walk.fss` as changed, each line before and after: REPORT.md, "The whole suites".
129: - The count and distance tables: count '#total 0', equal to climb batch 28's gate; distance 'DISTANCE SAME   0'; not rerun after the skeptic's fix, which neither stage reads.
130: - Each test whose verdict changed: `NativeHelperFamilyDivisorsWalk.fss:77`, `AnyNativesIntrinsicWalk.fss:19`, `StrictEquivalenceRuleWalk.fss:26`, `sequivTest.fss:31` (testSystem) and `Compiled7.Print17.fss:20` (testQuick), all respelled in `f58c027526`; the skeptic's new expected failures `XXXNumeralCoercionGenericTypeCompiled` and `XXXZZOneGetterWalk` (the latter promoted by the gather in N's commit).
131: - Every sentence made false: F-262, F-118 (rewritten by the gather), `Specification/basic/expressions/constant.tex:81-82` (rewritten by rung T), `literals.tex:187-190` (made true but for row 956), the skill's `SKILL.md:77` with its phase list `:65-73` and `references/interpreter.md:25` (the skill writer's).
132: - A file edited beyond those named: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:595-606` (`run_exits_nonzero`); the team's `ProjectFortress/compiler_tests/Compiled7.Print17.fss:20-21` and `ProjectFortress/tests/sequivTest.fss:31`; the revival tests named above. No edit of the checker's Scala, the library or the prelude.
133: 
```

#### explorations/compile-ladder/climb-batch-29/RECORD.md:134-160
```
134: **N** (`3de571bac7`):
135: - The library's declarations as written: `Numeral`, the two objects, their getters, `asFloat`, `asString`, each coercion and pair: `Library/FortressLibrary.fsi:454-494`; `Library/FortressLibrary.fss:386-390`, `:419-420`, `:565-569`, `:588-589`, `:668-728` at the rung's branch (`:669-728` on `main` hold the same declarations), `:829`, `:845`, `:935`, `:956`, `:1045`, `:1064`, `:1155`, `:1175`; `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:208-215`, `:258-259`, `:430`, `:453`.
136: - The new helpers, their Java signatures and bindings, and the answers at the edges of one rounding: `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:264-307` (`numeralToDouble` `:268`, `numeralToFloat` `:279`); `Library/FortressLibrary.fss:669-670`; `FortressBuiltin.fss:209-210`; `java -cp .:ProjectFortress/build Edges`: 'tie 1+2^-53 (to even, 1.0) double 1.0 bits 3ff0000000000000 = parseDouble', 'subnormal, the least double 4.9E-324 bits 1 = parseDouble'; `bin/fortress` on Big1: 'Big1 RR32 16777217 1.6777216E7', 'Big1 RR32 above max Infinity' (row 967).
137: - Walk's rule for a numeral argument and each place it converts: `interpreter/evaluator/values/OverloadedFunction.java:2306-2342` (`bestMatchForNumerals`); `values/Coercions.java:96-118` (`numeralCoercionFor`); `values/Numerals.java`; `LHSEvaluator.java:115`, `:220-230`; `NonPrimitive.java:247`, `:272`; `FunctionClosure.java:212-221`; `MethodClosure.java:85-89`; `EvaluatorBase.java:90`; the skeptic's `radixPoint`, `inRange`, `Keys` and `rangeKey`, `atReturn`, `instantiatedCoercions`.
138: - Each line of the library that named `IntLiteral` or `FloatLiteral`, before and after, and the glue classes: REPORT.md, "What changed and why"; `FortressBuiltin.fsi:199-246` and `.fss:549-629` at the base removed; `Library/Constants.fsi:16-17`; `Library/ReflectiveQuickCheck.fss:40`; `interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java` left unused. The gather's count of the one library's strings: 424 at the base (372 helpers, 52 glue), 402 on `main` (374 helpers, 28 glue, `Reflect`'s).
139: - Each team test line changed: `ProjectFortress/tests/NumberPrintTest.fss:16` '"3.1415926535897932384000000000001"' to '"3.141592653589793"', `:31` 'IntLiteral => println "IntLiteral"' dropped; `sequivTest.fss:58` 'nequiv(b,c)' to 'equiv(b,c)', `:94` 'nequiv((a,b),(a,c))' to 'equiv((a,b),(a,c))'; `XXXextendIntLiteral.fss:15` and `XXXextendFloatLiteral.fss:15` to the new types.
140: - Each revival test respelled, promoted or removed, with its row: `XXXNumeralFloatRungP` to `NumeralBeyondZZ32AtRR64` (443), `XXXNumeralWithNN32` to `NumeralWithNN32` (484), `XXXRadixTenPointNumeral` to `RadixTenPointNumeral` (361), `XXXRoundNearTieNumeral` to `RoundNearTieNumeral` (360), `IntLiteralValue` removed (578), `StrictEquivalenceRuleWalk.fss:32` to true (943), `RR32SiblingRungV.fss:50`, `:52`, `:55` to `RR32` and `:51` into `XXXNumeralLeftOfRR32Walk` (958); the skeptic's comment lines (`a5f3cab523`) and new tests `NumeralGenericOwnTypeWalk`, `NumeralOutOfRangeNN32Walk`, `NumeralDispatchCacheWalk`, `NumeralAtReturnWalk`, `NumeralAtReturnOutOfRangeWalk`, `NumeralAtReturnNoCoercionWalk`, `XXXRadixPointLeadingZerosWalk` (960); the gather's promotion `XXXZZOneGetterWalk` to `ZZOneGetterWalk` (387).
141: - The count and distance tables and the count's seconds (P-148): on `e3adeedb64` '#total 0', '#locations 0', '#crash none', 'real 1m58.010s' (base 122 s); the skeptic's base 'real 1m55.003s', change 'real 2m2.581s'; distance 'DISTANCE SAME   0'; an earlier '#total 2' at `Library/FortressLibrary.fss:4839`, repaired by `e3adeedb64` (N.worker.1). Not rerun after the skeptic's walk-only fixes; the gate's tables are the record.
142: - Each test whose verdict changes: `ant testSystem` after the skeptic's last fix, 803 tests, 'Tests run: 202, Failures: 1', `TupleOrderMixedRefused` alone, rung G's key; on the merged tree it passes (the gather's run, below). `ant testQuick`: no verdict moves.
143: - Every sentence made false: `Specification/basic/expressions/literals.tex:149-165` and `conversions-coercions.tex:84-88` (rewritten by rung T), `changes.tex`'s `revival-asfloat` and `revival-numeral-type` (rung T), `revival-index` (the gather, C's commit), the natives effect (the gather, N's commit); F-57, F-74, F-79, F-118, F-299, F-328 and F-32 (the gather); the skill's `revival-changes.md:48`, `:89`, `:95` (the skill writer's).
144: - A file edited beyond those named: `Library/FortressLibrary.fss:4839-4840` (`strToFloat`'s `ZZ32` base); within walk only the numeral classes; no edit of the prelude, the code generator, or the checker beyond `Types.java` and `Functionals.scala`'s two functions.
145: - Deviation from fork N7's default: the conversion into the eight number types by the library's coercion, not walk's Java (`Coercions.java:96-118`), N.worker.2.
146: 
147: **C** (`53a6074ed7`):
148: - Each place where the checker applies the default, and each place it does not: `scala_src/typechecker/impls/Decls.scala:223-225`, `:254`, `:291`, `:345`, `:386`; `impls/Functionals.scala:198`, `:279`, `:385`, `:410`, `:490`, `:512`, `:1016`, `:1078`, `:1093`, `:1105`, `:1121`, `:1567` at the rung's branch; `STypeChecker.scala:506-510`; `impls/Misc.scala:347`; not at a `typecase`'s selector (`impls/Misc.scala:660`, row 963) nor at an expression of a numeral type (P-173).
149: - The rule for a type parameter that several numerals fix: `impls/Functionals.scala:998` (`numeralDefault`), `:385`, `:1141-1146` at the branch; `LiteralDefaultCompiled.fss:70-71`: `pick(3, 4)` 'ZZ32,ZZ32', `pick(3, 3000000000)` 'ZZ64,ZZ64'; the skeptic's `pk(3, 0.5)` on the prelude 'ZZ32,RR64'; `WorldFlip -stop check`: `<|3000000000, 0.5|>` 'List.List[\RR64\]'.
150: - The written-only rule: `scala_src/typechecker/TypeWellFormedChecker.scala:48-73`, `:293`; refused as a `typecase` arm, in `asif`, in `extends`, inside a tuple or arrow parameter type; any function's parameter allowed, broader than P-174 read narrowly (C.skeptic.5); `LiteralTypeUnwritable.fss:10`.
151: - The range refusal: `scala_src/typechecker/CoercionOracle.scala:459-483` (ZZ32, ZZ64, NN32, NN64; infinity in RR64 and RR32; a tuple's elements by the skeptic's fix); `STypeChecker.scala:513-514`; tests `XXXNumeralBeyondZZ32Range.test`, `XXXNumeralBeyondRangeInTuple.test`.
152: - The `nat` value: `scala_src/typechecker/staticenv/KindEnv.scala:71-72`, `:112`; `compiler/codegen/CodeGen.java:6342-6365` at the rung's branch (`:6460-6483` on `main`, below rung F's hunks); `NatValueZZ32Compiled` ('u: ZZ32 = n' answers 3); `XXXNatValueNN32Refused.test` ('Right-hand side has type ZZ32, but declared type is NN32.').
153: - Each team test line changed: `Compiled5.ah`, `5.aj`, `5.ak`, `6.az`, `9.g`, `9.j`, `9.p`, `9.t`, `9.u`, and the pinned texts of `XXX6at` and `XXX6bw`, in `compile-ladder/rung-numeral-checker/REPORT.md`, section 3; `XXXApplicationErrors.test` unchanged and green; the skeptic changed no team test.
154: - Each revival test respelled, promoted or rewritten, with its row: REPORT.md section 3; the skeptic's `choose(b: Boolean, lo: IntLiteral, hi: IntLiteral)` in `ProjectFortress/library_tests/IntLiteralArithRung7.fss:35-36` and `IntLiteralRung6.fss:41-42` (C.skeptic.5); `XXXInferComboCap.fss:1` (row 506).
155: - The count and distance tables and P-148's runs: count at `7bd7c7dfc7` '#total 0', 'real 2m12.521s' against the prototype's 122 s; the skeptic's base 'real 2m3.233s', head 'real 1m49.905s'; profile top frames `Walker.walkCases*` (37 %), the change under 0.3 %; no pass run; distance 'DISTANCE SAME   0'; no stage after the skeptic's two checker fixes, the gate's tables the record.
156: - Each test whose verdict changes in `ant testQuick`: on `fe5d146a86` 'Tests run: 1487, Failures: 4', respelled in `fa13e6383c`; the skeptic's final 'Tests run: 1491, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL'; with the reverted `typecase` default 'Tests run: 1490, Failures: 2'.
157: - Every sentence made false: F-57, F-73 (the gather), F-79 (rewritten at N); `Specification/basic/inference.tex:183-187`, `:299-317` and `literals.tex:160` (rung T); `revival-index` (the gather); the skill's `SKILL.md:132`, `revival-changes.md:48`, `:89` (the skill writer's).
158: - A file edited beyond those named: `compiler_tests/NativeHelperFamilyAsFloatCompiled.fss:15`, `:35`, `NatArithBeyondRun.fss` and `.test`, `NatRtBigSize.fss:8-25` (`fa13e6383c`), `tests/NatValueZZ32Walk.test`; no edit of the library, walk or the prelude.
159: 
160: **S** (`e53480fc6e`):
```

#### explorations/compile-ladder/climb-batch-29/RECORD.md:161-165
```
161: - Walk's and the compiled code as changed: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1018-1021`; `interpreter/evaluator/values/FString.java:35-39`; `nativeHelpers/equalityRule.java:11`, `:62-66`; the code generator unchanged at `compiler/codegen/CodeGen.java:5386-5395` on `main` (`:5268-5277` at the base, moved by rung F's hunks).
162: - The fold as written, its phase, what it folds and leaves: `compiler/desugarer/PreTypeCheckDesugaringVisitor.java:133-138`, `:207-245` (`foldLiteralConcatenation`), phase PRETYPECHECKDESUGAR; it leaves a variable or call operand, two character literals first (S.worker.1), a supplementary character, `||x||`, `BIG ||`, juxtaposition and numerals.
163: - The tests' answers on both paths before and after; `compiler_regressions/seqv.fss:22` prints 'PASS 'cat'==='cat'' before and after: REPORT.md section 4.
164: - Each library concatenation of literals the fold now folds: none; only literal `||` call at `Library/List.fss:118`, `Map.fss:279`, `PrefixSet.fss:48`, `PureList.fss:53`, `Set.fss:212`.
165: - The count and distance tables: on `9d69d02ee0` (code `de7c4fdd00`) count equal to climb batch 28's gate, '#total 0'; 'DISTANCE SAME   0', '#seconds 180'.
```

#### explorations/compile-ladder/climb-batch-29/RECORD.md:187-215
```
187: ### Text mismatches
188: 
189: - Rung T's text (`Specification/basic/expressions/literals.tex:189-190`, "It is a static error if the numeral's value lies outside the range of that type, or rounds to an infinity there") and rung N's walk, which converts such a numeral to `Infinity` at a typed place with no error: no decision on record settles which is meant (N.skeptic.2 asks it), so the text stands as T wrote it; walk's departure has row 967 and the gated expected failure `ProjectFortress/tests/XXXNumeralRoundsToInfinityWalk.fss`, which asserts the text's rule, and `revival-numerals`' Effect names the row (`Specification/appendices/changes.tex:5168-5171`), all in T's commit (gather.2; the curator's entry is N.skeptic.2's, `PLAN.md:737`). Rung C's checker agrees with the text (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:476-483`).
190: - Not a mismatch, an Effect corrected to the code: `revival-numerals`' Effect said the compiled code applies a program's coercion "when the class that holds the place is loaded"; rung F's code applies it in the component class's static initializer (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7189-7234`), so the sentence now says so (`changes.tex:5185-5189`). The main text says only "once, not at each evaluation of the place" (`literals.tex:219-222`), which F's code keeps but at a program's generic type (row 957, named).
191: - T's own sentences that no rung's section stated, read against the merged tree: '6/3 is a QQ and 0.5 + 0.5 an RR64' (`constant.tex:94-95`), borne out by walk ('6/3 QQ true 0.5+0.5 RR64 true'); "\TYP{Literal} into the digit count" (`literals.tex:149`) against P-174's wording, put to the curator (gather.5).
192: 
193: ## Items for the curator, and where each is in `PLAN.md`
194: 
195: One asks for an answer before work on the path goes on and is under "Pavol's answers, in the order they are needed", in the new group "Before the switch-over, raised by climb batch 29's rung C" before "Before the switch-over:" (`PLAN.md:138-140`); the rest are under "Off the path, parked", appended to "Climb batch 29, listed for his review" (`PLAN.md:711`) after its paragraph "The items for him that climb batch 29's rungs left" (`PLAN.md:726`). Each rung's entries were written in its own commit, the gather's in T's.
196: 
197: - C.skeptic.3 (row 961): item 75, "C.skeptic.3 of climb batch 29's rung C (row 961): fork C6's default ..." (`PLAN.md:140`).
198: - F.worker.1 and F.skeptic.1 (row 957): "F.worker.1 and F.skeptic.1 of climb batch 29's rung F (row 957): P-174's "once per class ..." (`PLAN.md:728`).
199: - F.worker.2 and F.skeptic.3: "F.worker.2 and F.skeptic.3 of climb batch 29's rung F: a comparison of radix-point numerals folds exactly ..." (`PLAN.md:729`).
200: - F.worker.3 (row 956): (`PLAN.md:730`). F.worker.4: (`PLAN.md:731`). F.skeptic.2 (row 387): (`PLAN.md:732`).
201: - N.worker.1: (`PLAN.md:733`). N.worker.2: (`PLAN.md:734`). N.worker.3: (`PLAN.md:735`). N.skeptic.1: (`PLAN.md:736`).
202: - N.skeptic.2 and gather.2 (row 967): "N.skeptic.2 of climb batch 29's rung N and gather.2 of its gather (row 967) ..." (`PLAN.md:737`).
203: - C.worker.1 and C.skeptic.1 (row 446, beside item 17): (`PLAN.md:738`). C.worker.2 and C.skeptic.2 (row 962): (`PLAN.md:739`). C.skeptic.4 (row 963): (`PLAN.md:740`). C.skeptic.5: (`PLAN.md:741`).
204: - S.worker.1 and S.skeptic.1: (`PLAN.md:742`).
205: - G.worker.1 and G.skeptic.1: (`PLAN.md:743`). G.worker.2 and G.skeptic.4: (`PLAN.md:744`). G.worker.3, G.worker.4 and G.skeptic.4: (`PLAN.md:745`). G.skeptic.2: (`PLAN.md:746`). G.skeptic.3: (`PLAN.md:747`).
206: - T.worker.1, T.skeptic.1 and T.judge.2 (row 966): (`PLAN.md:748`). T.worker.2 and T.skeptic.2: (`PLAN.md:749`). T.judge.1 and T.judge.3: (`PLAN.md:750`).
207: - gather.1 (the order): (`PLAN.md:751`). gather.3 (row 338): (`PLAN.md:752`). gather.4 (row 20): (`PLAN.md:753`). gather.5 (`Literal`'s fold): (`PLAN.md:754`). gather.6 (row 591): (`PLAN.md:755`).
208: 
209: None is unrouted.
210: 
211: ## Left for the coordinator and the skill writer
212: 
213: - PLAN's "Where we stand" still gives climb batch 28's count of the bindings, "372 of the library's 424 live bindings"; on `main` it is 374 of 402, 28 glue (above). The coordinator keeps that section.
214: - The skill's sentences made false, which the batch writes no text to correct: F's `.claude/skills/fortress-repo/SKILL.md:77` with its phase list `:65-73` and `references/interpreter.md:25`; N's `references/revival-changes.md:48`, `:89`, `:95` and `"Traits and objects"` ('Walk departs from both answers (rows 943, 945)'), `interpreter.md`'s "How walk evaluates a program", `tests-writing.md`'s "Under walk, a numeral does not bind to `NN32` or `NN64` ... (ledger row 454)" and `library.md`'s "as for `IntLiteral`'s bindings"; C's `SKILL.md:132` ("`nat` is an `NN32` value"), `revival-changes.md:48`, `:89`; S's `references/interpreter.md:22`, `:126`, `references/compiler.md:106`, `references/revival-changes.md:62`; G's `references/interpreter.md:23`, `:126`, `references/revival-changes.md:48`, `:89`; F's new harness key `run_exits_nonzero` for `tests-writing.md` (F.worker.4).
215: - FACTS entries that cite lines the batch moved, beyond the rungs' own (for the record landing): F-78's and F-334's `Functionals.scala` lines (`:718`, `:738-742`), which N's and C's hunks moved.
```

#### explorations/compile-ladder/climb-batch-29/RECORD.md:217-242
```
217: ## Revival changes, for the skill writer
218: 
219: ### F (`rung-literal-fold`, `955cad76df`)
220: 
221: **The change.**
222: - The team's compiled path folds integer numerals before the checker, and walk folds nothing (`ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java:125-147` at b430f9f428: the fold is in `compilerPhaseOrder` only). The team's fold folds integers only, takes `BOXPLUS`, `DOTPLUS`, `BOXMINUS` and `DOTMINUS` as `+` and `-`, folds `AND`, `OR`, `XOR` and prefix `NOT` bitwise, folds `n DIV 0` into `Infinity`, and throws at a `CHOOSE` outside `0..n` (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:38-109`, `:152-157` at b430f9f428). The tree now folds an expression of numerals alone, integer and radix-point, exactly on both paths, into a numeral as written or an operation on numerals, leaves the operators whose meaning needs a width and a division by zero, and gives `CHOOSE` outside `0..n` the value 0 (tests `ProjectFortress/tests/NumeralFoldWalk.fss`, `ProjectFortress/compiler_tests/LiteralFoldCompiled.test`, `NumeralFoldJUTest`). So under walk `2147483647 + 1` is 2147483648 and `0.1 + 0.2` is `0.3`. The reason: the Working Draft's static expressions of literals and operators denote exact values, and a static rational expression in a floating-point computation incurs at most one rounding (`Specification-1.0-frozen/basic/expressions/literals.tex:163-173`; `constant.tex`, "Static Expressions"); measured: the team's fold stops the compile at `3 CHOOSE 5` ("Integer Literal folding: Need to do something for factorial of negative values") and makes `a: ZZ32 = 2147483647 BOXPLUS 1` die with "Not in range for ZZ32: 2147483648".
223: - The team's code generator makes a radix-point numeral's double as `intPart.doubleValue() + numerator.doubleValue() / Math.pow(base, power)` (`compiler/codegen/CodeGen.java:2035-2045` at b430f9f428), two or three roundings: `x: RR64 = 0.9999999999999999` was 1.0. The tree rounds the exact value once, and a numeral at a typed place of `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `RR64` or `RR32` is that type's constant (tests `FloatNumeralOneRounding`, `LiteralFoldCompiled`). The reason: the Draft's one rounding (above).
224: - The team's compiled program calls its own coercion from a numeral at each evaluation of the numeral's site, so one site gave distinct reference objects (a probe on the base: `start`, `coerce  3`, `coerce  3`, `coerce  4`, `a SEQV b  false`). The tree calls it once per site, when the component's class is initialized, and every evaluation reads the one result, except at a program's own generic type (row 957); a coercion that raises stops the program before `run()` (tests `NumeralCoercionOnceCompiled`, `NumeralCoercionRaisesCompiled`). The reason: a numeral is one constant of the program text, and each construction of a reference object is a new object (`Specification/basic/objects.tex:51-53`), so a call at each evaluation made one written numeral many objects.
225: 
226: **Provenance.** P-173 (an expression of numerals alone folds exactly before the checker into a signed constant with three defaults), P-174 (a program's coercion called once per class, when the class loads, one object per site; review-queue item 440), P-172 (one rounding into `RR64` and `RR32`); the judgement's repair 3 (a program's coercion sees the four numbers of a written numeral only); climb batch 29's forks F1 to F8 (the forms, the operators left, the fold in walk's order, the concatenation, the once-per-class call, the pairs' and `QQ`'s compiled fold waiting for the switch-over, the typed-place constants), item 442 (`x = 7/2` a `QQ`); probes 2 and 3 of the batch's planner; rows 862, 954, 955.
227: 
228: ### N (`rung-numeral-types`, `3de571bac7`)
229: 
230: **The change.** The team's library gave a numeral the interpreter's own objects: `value object IntLiteral extends { Number }` with 21 glue bindings and `value object FloatLiteral extends RR64` with 3 (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:199-246`, `:44` at the base), and the team's walk evaluated an integer numeral to a `ZZ32`, `ZZ64` or `ZZ` value by its value and a radix-point numeral to a `FloatLiteral` holding its text (`interpreter/evaluator/Evaluator.java:1631-1637` and `values/FFloatLiteral.java:21-33` at the base), so a float numeral stayed a `FloatLiteral` at an `RR64` binding and no number type but `RR64` received it. The tree now declares `trait Numeral` and the value objects `NaturalNumeral(digits, radix, digitValue)` and `RadixPointNumeral(digits, fractionDigits, radix, digitValue)` (`Library/FortressLibrary.fsi:454-494`); each of the eight number types converts from them, exactly or by one rounding, with an `=` pair both ways; and walk evaluates a numeral to its default, a `ZZ32`, `ZZ64`, `ZZ` or `RR64`, converting it from its four numbers where a binding, parameter, field or return type fixes a type, so `q: QQ = 0.1` is 1/10 and `y: RR64 = 0.5` is `SEQV` a computed 0.5 (`ProjectFortress/tests/NumeralTypesWalk.fss`), and a program's type receives the numeral object through `coerce(x: RadixPointNumeral)` (`ProjectFortress/tests/NumeralOwnTypeWalk.fss`). The reason: the Working Draft gives numerals types of their own because "converting it immediately to a floating-point number may lose precision" and because "This approach allows library designers to decide how numerals should interact with other types of objects by defining coercion operations" (`Specification-1.0-frozen/basic/expressions/literals.tex:132-148`), with the four numbers `n`, `m`, `r`, `v` (`:83-129`); and on the base walk refused `q: QQ = 0.5` ('RHS expression type FloatLiteral is not assignable to LHS type QQ'), answered `false` to `1/2 = 0.5`, and refused `s: RR64 = 3000000000` ('RHS expression type Long is not assignable to LHS type RR64'), `u: NN32 = 5` and `r: RR32 = 0.1`.
231: 
232: **Provenance.** P-174, P-76, P-172 and P-173's walk half, with P-165, P-168 and P-169; the forks N1 to N12 of climb batch 29 at their defaults, but for N7's conversion into the eight number types, which runs the library's own coercion rather than a Java conversion (REPORT.md, "Decisions"); climb batch 29, rung N.
233: 
234: ### C (`rung-numeral-checker`, `53a6074ed7`)
235: 
236: **The change.**
237: - The team's checker gave every numeral the one type `IntLiteral` or `FloatLiteral` and kept it wherever nothing converted it (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:468-473`), and gave a `nat` or `int` parameter read as a value the type `IntLiteral` (`scala_src/typechecker/staticenv/KindEnv.scala:69-70` before the change); its tests wrote `IntLiteral` as a variable's and a return type (`ProjectFortress/compiler_tests/Compiled5.ah.fss:17`, `Compiled9.g.fss:18`), and a numeral outside a type's range compiled and failed when it ran.
238: - The tree now converts a numeral where nothing fixes a type into `ZZ32`, or `ZZ64` or `ZZ` by its value, or `RR64` with a radix point, a type parameter that numerals alone fix into the narrowest of these holding them all (`compiler_tests/LiteralDefaultCompiled`); refuses `IntLiteral` and `FloatLiteral` written in a program other than as a parameter's type (`XXXLiteralTypeUnwritable.test`); refuses a numeral outside a bounded number type's range, or rounding to an infinity, statically (`XXXNumeralBeyondZZ32Range.test`); and reads a size used as a value as a `ZZ32` (`NatValueZZ32Compiled`, `XXXNatValueNN32Refused.test`).
239: - The reason: under the one type, `bigN = 3000000000` read as a `ZZ32` at a tie and died when it ran ('java.lang.Error: Not in range for ZZ32: 3000000000'), `a: ZZ32 = 4294967295` compiled and raised at run time, and `7` at a parameter of type `Object` took no `ZZ32` clause where the interpreter took it; the Working Draft gives numerals types of their own so that a library decides by coercions how they meet other types (`Specification-1.0-frozen/basic/expressions/literals.tex:141-145`), which a place that declares no coercion does not use.
240: 
241: **Provenance.** P-173 (a numeral converts where it stands, else into its default; the narrowest default; out of range refused), P-174 (a numeral type written only as a parameter type; no coercion, no numeral), P-40 (a size used as a number is a `ZZ32`), P-49; climb batch 29's forks C1 to C8, with C4 as the batch review changed it; climb batch 29, rung C.
242: 
```

## 2.2 Rung reports (what changed and why; decisions). SKEPTIC and JUDGE: their fixes, differences and rulings, as they hold no 'What changed' section

### Rung N: explorations/compile-ladder/rung-numeral-types

#### explorations/compile-ladder/rung-numeral-types/REPORT.md:1-40
```
1: # Rung N, rung-numeral-types: the numeral types NaturalNumeral and RadixPointNumeral below Numeral, each number type's coercions and = pairs, the 24 glue bindings gone, and walk's numerals converted where they stand
2: 
3: - problem: walk keeps a float numeral at `RR64` a `FloatLiteral` (row 943, `explorations/fortress-gap-ledger.md:635`), `QQ` takes no float numeral (row 944, `:636`), `NN32`, `NN64` and `RR32` refuse numerals (row 454, `:610`), `RR64` refuses 3000000000 (row 443, `:609`), `u + 1` at `NN32` is a `ZZ64` (row 484, `:156`), `round(2.5_10)` throws (row 361, `:602`), and `IntLiteral`'s own arithmetic answers a `ZZ32` (row 578, `:620`)
4: - spec: `Specification-1.0-frozen/basic/expressions/literals.tex:132-148` (numerals have their own types, which libraries convert by coercions) and `:83-129` (the four numbers); `Specification/basic/expressions/literals.tex:145-153`
5: - precedent: `value object Ratio(num: ZZ, den: ZZ) extends { QQ }` (`Library/FortressLibrary.fss:648` at the base), the prototype's library step (`explorations/compile-ladder/plan-29/probes/literal-default.patch:1-400`), and `Types.CHARACTER`'s switch by library (`ProjectFortress/src/com/sun/fortress/compiler/Types.java:78-91` at the base)
6: - deviation: walk converts a numeral into the eight number types through the library's own coercion, called once per site and type, not by a Java conversion per type (fork N7) (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:88-115`); `RR32`'s rounding binding sits in `FortressBuiltin`, beside `RR32`, and `RR64`'s and the numerals' in `FortressLibrary` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:208-210`, `Library/FortressLibrary.fss:668-670`); `strToFloat` gains a `ZZ32` base, a line beyond the declarations the brief names (`Library/FortressLibrary.fss:4839-4840`)
7: - historical: `Library/FortressLibrary.fsi`, `Library/FortressLibrary.fss`, `Library/Constants.fsi`, `Library/Constants.fss`, `Library/ReflectiveQuickCheck.fss`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`, `compiler/Types.java`, `scala_src/typechecker/impls/Functionals.scala`, `nativeHelpers/simpleDoubleArith.java`, `interpreter/env/LazilyEvaluatedCell.java`, `interpreter/evaluator/{BaseEnv,Evaluator,EvaluatorBase,Init,LHSEvaluator}.java`, `interpreter/evaluator/values/{FBigNum,FFloat,FInt,FLong,FOrdinaryObject,FunctionClosure,GenericFunctionOrConstructor,MethodClosure,NonPrimitive,OverloadedFunction,OverloadedMethod}.java` (under `ProjectFortress/src/com/sun/fortress/`), and the team's tests `ProjectFortress/tests/NumberPrintTest.fss`, `sequivTest.fss`, `XXXextendIntLiteral.fss`, `XXXextendFloatLiteral.fss`
8: 
9: Commits on `wip/rung-numeral-types`: `f7b46ce742` (the tests, before any edit), `9e259096a9` (the library, walk and the checker), `d541ae9682` (the test changes and walk's inference hook), `e3adeedb64` (`strToFloat`'s base and the XXX test of an undefined `typecase` arm). Every stage and suite named below ran on the commit it names.
10: 
11: ## What changed and why
12: 
13: **The library.** `Library/FortressLibrary.fsi:454-494` and `.fss:668-721` declare, beside `Ratio`, `trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }` with the four getters abstract (`digits`, `fractionDigits` and `radix` at `ZZ32`, `digitValue` at `ZZ`), and the value objects `NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ)`, whose `fractionDigits` is 0, and `RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ)`. Each has `asString`, the numeral as the Working Draft writes one (its digits in its radix, at least `digits` of them, upper case, the radix point after `digits - fractionDigits` of them, `_r` where the radix is not ten), `asFloat(self): RR64` by one rounding, and its reversed `=` pairs: `NaturalNumeral` at the eight number types, `RadixPointNumeral` at `RR64`, `QQ` and `RR32`, each `do c: T = self; (c = b) end` as the library writes its pairs (`.fss:418` at the base). The number types' coercions, renamed or new, each with its pair:
14: 
15: | type | coercions from the numeral types, and their bodies | pair |
16: |---|---|---|
17: | `RR64` | `coerce(x: NaturalNumeral) = asFloat(x)`, `coerce(x: RadixPointNumeral) = asFloat(x)` (`.fss:389-390`) | both (`.fss:419-420`) |
18: | `QQ` | `Ratio(x.digitValue, 1)`; `x.digitValue / r^(x.fractionDigits)` for `r: ZZ = big(x.radix)`, reduced by `ZZ`'s `/` (`.fss:565-569`) | both (`.fss:588-589`) |
19: | `AnyIntegral` | `ZZ32`, `ZZ64` or `ZZ` by the value, which is never negative (`.fss:723-728`) | none, as at the base |
20: | `ZZ32`, `ZZ64`, `NN64`, `ZZ` | `x.digitValue.asZZ32`, `.asZZ64`, `.asNN64`, `x.digitValue` (`.fss:829`, `:935`, `:1045`, `:1155`) | `NaturalNumeral` (`:845`, `:956`, `:1064`, `:1175`) |
21: | `NN32` | `x.digitValue.asNN32` (`FortressBuiltin.fss:430`) | `NaturalNumeral` (`:453`) |
22: | `RR32` | `numeralRR32(x.digitValue, x.radix, 0)` and `numeralRR32(x.digitValue, x.radix, x.fractionDigits)` (`FortressBuiltin.fss:214-215`) | both, new (`:258-259`) |
23: 
24: `RR64` comprises `{ Float }` (`.fsi:294`); `Float`'s `asFloat(self): RR64` (`FortressBuiltin.fss:82`); the `^` over the numeral in `ZZ32`, `ZZ64`, `NN64`, `ZZ` and `NN32` renamed, its body `self^(b.digitValue.asZZ32)`; `pi` and `e` at `RR64` (`Library/Constants.fsi:16-17`, `.fss:15-16`); `ReflectiveQuickCheck.fss:40` chooses `theType[\ZZ32\]()` where it chose `IntLiteral`, and the arm `theType[\IntLiteral\]() => Just[\AnyGen\](genZZ32)` (`:157` at the base), which repeated the `ZZ32` arm above it, is dropped. `value object IntLiteral` and `value object FloatLiteral` leave `FortressBuiltin.fsi` and `.fss` with their 24 glue bindings; no line of the one library names either now. The glue classes `interpreter/glue/prim/IntLiteral.java` and `FloatLiteral.java`, and walk's `FIntLiteral` and `FFloatLiteral`, stay in the tree, unused (fork N11).
25: 
26: **The helper pair** (`ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:264-307`): `public static double numeralToDouble(BigInteger v, int r, int m)` and `public static float numeralToFloat(BigInteger v, int r, int m)`, the value `v / r^m` rounded once to the nearest double or float, ties to even, subnormals included, by an integer quotient at the format's last significand bit and its remainder; two private helpers (`lsbExponent`, `roundedQuotient`) whose types all map to Fortress, as the wrapper generator needs. The bindings: `private numeralRR64(v: ZZ, r: ZZ32, m: ZZ32): RR64` in `FortressLibrary.fss:668-670`, which both numerals' `asFloat` call, and `private numeralRR32(v: ZZ, r: ZZ32, m: ZZ32): RR32` in `FortressBuiltin.fss:208-210`, which `RR32`'s coercions call; walk carries `ZZ` in `BigInteger`, `ZZ32` in `int`, `RR64` in `double` and `RR32` in `float` (F-299). Walk's default for a radix-point numeral calls `numeralToDouble` in Java (`Numerals.java`), so the default and `RR64`'s coercion round alike.
27: 
28: **Walk's numerals** (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java`, new). `Evaluator.forIntLiteralExpr` and `forFloatLiteralExpr` (`Evaluator.java:1636`, `:1632`) return the value of the numeral's site, made once: its default, a subclass of `FInt`, `FLong`, `FBigNum` or `FFloat` (their constructors opened to the package) that carries a `Site` with the four numbers. The digits as written come from the numeral's text, since the node keeps the value and not the trailing zeros (`3.14150` has `digitValue` 314150, `fractionDigits` 5). The places:
29: 
30: - a typed binding, a field and an assignment (`LHSEvaluator.java:115`, `:220-230`, `BaseEnv.java:332`, `LazilyEvaluatedCell.java:69`), a parameter (`NonPrimitive.java:247`, `:272`), and a declared return type (`FunctionClosure.java:212-221`, `MethodClosure.java:85-89`, `Numerals.atReturn`): where the default does not fit the type, `Coercions.coerce` makes a numeral the numeral object at a numeral type, else converts it through the place type's coercion whose parameter type is the narrowest holding the numeral type, with no chain through the default (`Coercions.java:59`, `:88-115`, `:268`); the result is kept for the site and type (`Numerals.converted`), so a site gives one object of a reference type; a store keeps the default alone (`Numerals.plain`, deep for tuples);
31: - an integer numeral outside an integer type's range is not converted, so the place refuses it as walk refused one at a binding before: 'Type mismatch binding 3000000000' (`Numerals.inRange`);
32: - dispatch (`OverloadedFunction.java:2278-2342`, `:2712`): a declaration fits a numeral as it is where its parameter is the numeral's own type or admits its default; of those, the one that the defaults alone fit, unless the own-type fit's domain lies strictly below it; with no fit, the coercion attempt, each numeral converting only from its own type; and a tie among those, an ambiguous coercion, reads each numeral at its default; a functional method chosen at a numeral's own type receives the numeral object before walk finds the method on it (`Coercions.withNumeralObjects`). The three dispatch caches key a numeral apart from a value of its default type (`Numerals.keys`; `OverloadedFunction.java:99`, `OverloadedMethod.java:29`, `GenericFunctionOrConstructor.java:24`);
33: - the head of `EvaluatorBase.inferAndInstantiateGenericFunction` (`EvaluatorBase.java:90`): the inference reads each numeral at its default, and where the numerals at one type parameter's positions include a radix point, one beyond `ZZ32` by a `ZZ32` stand-in, so that walk's promotion gives `RR64`; the call's numerals then convert at the instance;
34: - `SEQV` (`FOrdinaryObject.java:48-49`): two numeral objects compare by `digitValue / radix^fractionDigits`, reduced, across both numeral types;
35: - `Init.java:46` empties the sites between runs.
36: 
37: **The checker.** `Types.INT_LITERAL` and `FLOAT_LITERAL` are no longer final and switch with the libraries, as `CHARACTER` does: the prelude's `IntLiteral` and `FloatLiteral` under the compiler's, `FortressLibrary`'s `NaturalNumeral` and `RadixPointNumeral` under the one library (`Types.java:61-62`, `:75-95`). `Functionals.isNumeral` counts a numeral with a radix point, and `numeralReading` reads one as `RR64` (`Functionals.scala`, `isNumeral` and `numeralReading`), the prototype's tie rule, written inside the two functions and with no new function, since rung C adds functions near them.
38: 
39: **`strToFloat`** (`Library/FortressLibrary.fss:4839-4840`): its `10^k` and `10^(|frac|)` became `ten^k` for `ten: ZZ32 = 10`. Without it the count stage found two errors there ("The stages").
40: 
```

#### explorations/compile-ladder/rung-numeral-types/REPORT.md:95-102
```
95: ## Where the fix belongs, and the precedent
96: 
97: The feature map's row for numerals (`explorations/coordinator/map/spec-to-implementation.md:166`) names walk's `Evaluator.forIntLiteralExpr` and `forFloatLiteralExpr` and the checker's typing of a numeral in `Misc.scala`; its coercion row (`:288`), which finds no coercion under `interpreter/`, is stale: walk converts at dispatch in `OverloadedFunction.bestMatchWithCoercion` and at bindings through `Coercions` (`fortress-repo`, `interpreter.md`, "Where a fix of walk belongs"), where the numeral's conversion went. The library's own way for a value with parts is a value object with fields, `Ratio` (`Library/FortressLibrary.fss:648`); for names that differ between libraries, `Types.useCompilerLibraries` and `useFortressLibraries` (`Types.java:78-91`). The prototype is the precedent of the library change (`plan-29/probes/literal-default.md`, "Step 1, the library"); I renamed its two types, made them objects with fields, kept every pair (probe 1) and added `RR32`'s. Of the base library's 21 `IntLiteral` and 3 `FloatLiteral` glue bindings none stays; of its other 36 lines in the four prelude files that named either type, each is renamed or dropped (`grep -c` of the base's four files: 18, 18, 38, 63 lines, now 0). The ways the language and the library offer for the two types: value objects with fields (taken, fork N1); traits with walk's native objects and compiled classes below them and the getters on helpers (the prototype's and the team's form, not taken, fork N1); and for walk's numeral: its default carrying the four numbers (taken), a numeral object at every evaluation (not taken, fork N7), or a syntactic reading of the literal node at each place (not taken: dispatch receives values, not expressions).
98: 
99: ## What the specification settles
100: 
101: The Working Draft settles the types and the four numbers (`Specification-1.0-frozen/basic/expressions/literals.tex:83-148`); the revised text gives every number type a coercion from the numeral (`Specification/basic/expressions/literals.tex:145-153`) and the tie rule (`Specification/basic/inference.tex`, "A Numeral Whose Conversions Tie"), which P-173 widens to the radix point. The default, the narrowest default for a type parameter, and the reduced-value `SEQV` are P-173's and P-168's, not yet the specification's text (rung T's).
102: 
```

#### explorations/compile-ladder/rung-numeral-types/REPORT.md:118-157
```
118: ## Points to report
119: 
120: - The library's declarations as written: "What changed and why", the table and `Library/FortressLibrary.fsi:454-494`.
121: - The helpers, their signatures and bindings: `simpleDoubleArith.java:264-307`, `FortressLibrary.fss:668-670`, `FortressBuiltin.fss:208-210`; their edges: "Programs run old against new".
122: - Walk's rule for a numeral argument (`OverloadedFunction.java:2295-2342`), the classes changed (`Numerals`, `Coercions`, `OverloadedFunction`, `OverloadedMethod`, `GenericFunctionOrConstructor`, `NonPrimitive`, `FunctionClosure`, `MethodClosure`, `FOrdinaryObject`, `FInt`, `FLong`, `FBigNum`, `FFloat`, `Evaluator`, `EvaluatorBase`, `LHSEvaluator`, `BaseEnv`, `LazilyEvaluatedCell`, `Init`) and the places it converts: "What changed and why".
123: - The library's lines that named `IntLiteral` or `FloatLiteral`: each in the table above, before as `coerce(x: IntLiteral)`, `opr =(self, b:IntLiteral)`, `opr ^(self, b:IntLiteral)`, `comprises { Float, FloatLiteral }`, `pi : FloatLiteral`, `theType[\IntLiteral\]`; the two objects deleted; the glue classes left.
124: - The team's test lines changed: `tests/NumberPrintTest.fss:16` 'assert("" 3.1415926535897932384000000000001, "3.1415926535897932384000000000001")' to '... "3.141592653589793")' (a bare numeral prints as its double, P-172); `:31` 'IntLiteral => println "IntLiteral"' dropped (the numeral at `x: Number` takes its default, and the type is gone); `tests/sequivTest.fss:58` 'nequiv(b,c)' to the team's 'equiv(b,c)' and `:94` 'nequiv((a,b),(a,c))' to the team's 'equiv((a,b),(a,c))' (`b: RR64 = 45.0` is now an `RR64`); `tests/XXXextendIntLiteral.fss:15` 'object Mumble() extends { IntLiteral }' to '{ NaturalNumeral }' and `XXXextendFloatLiteral.fss:15` '{ FloatLiteral }' to '{ RadixPointNumeral }', still refused. `tests/setMakerTest0.fss:16`, a comment naming `IntLiteral`, is unchanged.
125: - The revival's tests: `XXXNumeralFloatRungP` promoted to `NumeralBeyondZZ32AtRR64` (row 443), `XXXNumeralWithNN32` to `NumeralWithNN32` (row 484), `XXXRadixTenPointNumeral` to `RadixTenPointNumeral` (row 361); `XXXRoundNearTieNumeral` to the guard `RoundNearTieNumeral`, asserting 2, 0, 4 and 2 where it asserted 3, 1, 3 and 2 (row 360, fork N12); `IntLiteralValue` removed (row 578); `IntLiteralTextWalk` renamed `ZZ32BigEndsWalk`, its 13 assertions on the object `IntLiteral` dropped with the object, its two on `big` kept; `StrictEquivalenceRuleWalk.fss:32` `false` to `true` (row 943); `FlatTowerRungF.fss:100`, `:101`, `:104`, `:109`, `:113` '0.0 : FloatLiteral' (and '1.0') to 'RR64'; `NumberMixedEqualityWalk.fss` the object `x = IntLiteral` replaced by the numeral 0 at its 7 bindings and 32 comparisons, messages naming `NaturalNumeral`; `IntegerConversionsWalk.fss:7` and `IntegerPowerContractWalk.fss:23` the `typecase` arm `IntLiteral` dropped; `IntegerPowerContractWalk.fss:93-97` the object's own power `numeralType()` dropped with the object (row 578); `ReflectiveNumberTypes.fss:12` `found(theType[\IntLiteral\]())` dropped, the chooser's slot now `ZZ32`, which `:13` asserts; `RR32SiblingRungV.fss:50`, `:52` and `:55`, 'RR32 + a float numeral by RR64's +' and the two beside it, to `RR32`, since `RR32` now converts from either numeral and its operator is the more specific; its `:51`, `2.5 + a`, moved into `XXXNumeralLeftOfRR32Walk` (row 958).
126: - The count table and the distance table on `e3adeedb64`, the count's 118 s: "The stages".
127: - The verdicts that moved in `ant testSystem`: on `9e259096a9`, before the test changes, 16 of 795 failed: the 14 the brief names (`IntegerConversionsWalk`, `IntegerPowerContractWalk`, `ReflectiveNumberTypes`, `StrictEquivalenceRuleWalk`, `FlatTowerRungF`, `IntLiteralTextWalk`, `NumberMixedEqualityWalk`, `sequivTest`, `NumberPrintTest`, `IntLiteralValue`, the three `XXX` tests now passing, and `TupleOrderMixedRefused`), `RR32SiblingRungV` (above), and the team's `commonSuper` ('Unification error: Closure/Constructor for f param 2 (y:Float) got arg 5: ZZ32 of type Int'), a defect of my first inference hook, which read both numerals of `f(13.0, 5)` as `RR64` values, so that walk inferred the object `Float`; the hook now leaves walk's promotion to give `RR64`, and `commonSuper` passes unchanged. On `d541ae9682`, only `TupleOrderMixedRefused` fails, rung G's. `ant testQuick`: no verdict moves.
128: - Files beyond those named: under `interpreter/`, the classes listed above, all walk's numerals; `Library/FortressLibrary.fss:4839-4840`, `strToFloat`; no edit of the prelude, the code generator, or the checker beyond `Types.java`, `isNumeral` and `numeralReading`.
129: 
130: ## Decisions
131: 
132: 1. **Walk's numeral is its default, a subclass of `FInt`, `FLong`, `FBigNum` or `FFloat` carrying the four numbers, one value per site, and every store keeps the default alone.** Ways not taken: the numeral object at every evaluation (fork N7's way not taken: every `i + 1` would dispatch by coercion); a reading of the literal node at each place, which dispatch cannot do, since it receives values. Evidence: `x + 1` dispatches as before (walk suite), `y = 0.1` then a `QQ` place sees the plain `RR64`.
133: 2. **Into the eight number types walk converts through the library's own coercion from the numeral type, called with the numeral object and kept for the site and type, not by a Java conversion per type.** The way not taken: fork N7's 'in walk's Java, by the same conversion as the library's coercion'. Evidence: the conversion is the library's by construction, one code path for the eight and a program's type; a site pays once. The integer types' range is checked in Java first, so an out-of-range numeral is refused with walk's binding message ('Type mismatch binding 3000000000', `NumeralOutOfRangeWalk`) rather than the coercion's `IntegerOverflow`. No decision on record covers the way; I acted on the brief's intent, the same value.
134: 3. **Dispatch: the own-type fit, the default compared, the coercion attempt from the own type only, and a tie read at the defaults only on an ambiguous coercion.** Ways not taken: retrying at the defaults whenever no declaration applies, which would chain a numeral through its default into a program's `coerce(x: ZZ32)` (C4 refuses it; `NumeralNoCoercionRefusedWalk`); preferring the own-type fit always, which runs `ZZ32`'s `=(self, b: NaturalNumeral)` for `x = 0` through a Fortress object where `=(ZZ32, ZZ32)` fits. Evidence: fork N6, P-49.
135: 4. **The dispatch caches' key adds, for a numeral, the bottom type, its default's type and its numeral type.** Ways not taken: a second cache for numeral calls; no caching of them. Evidence: `u = 0` and `u = z` for a `ZZ32 z` choose different declarations at the same types.
136: 5. **The inference hook reads numerals at their defaults and, beside a radix point, a numeral beyond `ZZ32` by a `ZZ32` stand-in.** The way not taken, my first: each numeral of the group as an `RR64` value, under which walk infers the object `Float` and the team's `commonSuper` failed. Evidence: `second(0.5, 3000000000)` is the `RR64` 3000000000.0, `commonSuper` passes.
137: 6. **The return conversion in `FunctionClosure` and `MethodClosure`, at a declared return type only; elsewhere the default.** Walk checks no return type, so a numeral that does not convert there is its default. The way not taken: conversion at bindings and fields only (fork N7's).
138: 7. **The helpers in `simpleDoubleArith`, over `(BigInteger v, int r, int m)`.** Ways not taken: a new class; `QQ`'s `asFloat`, which rounds up to three times (fork N5). `RR32`'s binding is in `FortressBuiltin` beside `RR32`, since a private function of `FortressLibrary` is not visible there; `RR64`'s in `FortressLibrary`.
139: 8. **`NaturalNumeral` declares only N3's four numbers, `asString`, `asFloat` and its pairs**, not `IntLiteral`'s `asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `zero` and `one`; the coercions read `digitValue`'s checked getters. The way not taken: the prototype's trait kept those getters.
140: 9. **`RadixPointNumeral`'s four numbers come from its text where the text's digits and the node's value agree.** The way not taken: the node's `intPart`, `numerator` and `denomPower`, which drop trailing zeros (`Dec(3.14150)` read 31415).
141: 10. **Two numeral objects compare by reduced value across both numeral types**, so `2 SEQV 2.0` between two numeral objects is `true`. The way not taken: within one numeral type only. Evidence: P-168 names 'two values of a numeral type'.
142: 11. **The checker's tie rule inline in `isNumeral` and `numeralReading`**, without the prototype's `isLiteralType`, which rung C may add beside them.
143: 12. **`strToFloat`'s base typed `ZZ32`.** The way not taken: leaving the two count errors to rung C's step 5 on the merged tree. Evidence: the count before was 0, and the stage on this tree alone must trace each site to an edit; the line means `ZZ32` arithmetic.
144: 13. **`RR32SiblingRungV`'s three lines to `RR32`, and its `2.5 + a` into an `XXX` test.** The way not taken: asserting walk's `RR64` for `2.5 + a`, a known departure. Evidence: both declarations apply by one coercion and `RR32`'s is the more specific (`conversions-coercions.tex`, "Coercion Resolution").
145: 14. **No profile for P-148's second pass.** The change adds one type equivalence to each `isNumeral` call, and the count ran 118 s against the base's 122 s; a profile would show nothing to take.
146: 15. **My own ladder subset is the eight programs that write a radix-point numeral**, since no recorded first error names a touched name.
147: 16. **`ReflectiveQuickCheck.fss`'s second `IntLiteral` arm dropped**, not respelled `ZZ32`, which would repeat the arm above it.
148: 
149: ## Defects, each with its home
150: 
151: - Rows 943, 944, 454, 443, 484, 361: home 1, repaired, by the tests named in `record.md`, "The ledger".
152: - Row 578: repaired by removal: the object and its arithmetic left the library; its test removed (fork N12).
153: - `commonSuper`'s failure under my first hook: home 1, repaired before landing; the team's test is its guard, and `NumeralTypesWalk`'s `second(13.0, 5)`.
154: - The count's two errors at `strToFloat`: home 1, repaired by the library line; the count stage is its check.
155: - A float numeral left of an `RR32` runs `RR64`'s operator (row 958): home 2, `ProjectFortress/tests/XXXNumeralLeftOfRR32Walk.fss`, shown green as it is and red with its expectation set to walk's answer for one run.
156: - A `typecase` arm that names an undefined type matches every value (row 959): home 2, `ProjectFortress/tests/XXXTypecaseUndefinedArmWalk.fss` with its `.test` key, green while walk loads it.
157: 
```

#### explorations/compile-ladder/rung-numeral-types/SKEPTIC.md:42-78
```
42: ## Fixes
43: 
44: Each seen failing through `harness-one.sh` before its edit and passing after; one build of the fixes A to D (`ant compileAll` 05:42:41, 'BUILD SUCCESSFUL'), and one more for B2 (05:52:43).
45: 
46: | commit | finding | kind | test, failing then passing | settled by |
47: |---|---|---|---|---|
48: | `a5f3cab523` | six tests with more than one comment line or a pointer to a record (`NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `RoundNearTieNumeral.fss`, `NumeralBeyondZZ32AtRR64.fss`, `RadixTenPointNumeral.fss`, `NumeralWithNN32.fss`) | correction | no assertion changes | `tests-writing.md`, "Names, comments, citations" |
49: | `e3f9f07dfb` | `Numerals.radixPoint` took the radix from the node, whose base the parser sets to 1 where every digit after the point is 0 (`nodes_util/ExprFactory.java`, `makeFloatLiteralExpr`): `3.0` was (2, 0, 1, 3), and `asString` of `2.0`'s object looped (`Library/FortressLibrary.fss`, `numeralDigits` divides by 1) | defect | `NumeralOwnTypeWalk`: on `9e1f796efe` 'FAIL: J7/0:2 0 1 3 =/= J9/0:2 1 10 30'; after 'OK (6 tests)' | P-174, "The four numbers are the digit count `n`, the digits after the radix point `m`, the radix `r`, and the digits read as one integer in that radix `v`" (`POSITIONS.md:105`) |
50: | `794f7d908e` | `Numerals.inRange` looked NN32 up among FortressLibrary's root types, which do not hold FortressBuiltin's NN32, so no numeral was out of NN32's range | defect | `NumeralOutOfRangeNN32Walk` with `load_exception_contains=Type mismatch binding 5000000000`: on `9e1f796efe` 'Refused at load, but did not satisfy load_exception_contains', 'FortressException: IntegerOverflow'; after ' OK Saw expected refusal at load' | the section: "A numeral out of range at a typed place raises there when it runs"; fork N7, "a numeral out of the type's range refused at the place when it runs, as walk refuses one at a binding today" (`explorations/coordinator/CLIMB-BATCH-29.md:355`) |
51: | `43d019ed3b` | `Coercions.numeralCoercionFor` read no generic type's coercions; now through `instantiatedCoercions`, shared with `genericCoercionFor`; CoercedCall's doc comment back above its class | defect | `NumeralGenericOwnTypeWalk`: on `9e1f796efe` 'RHS expression type Int is not assignable to LHS type Tagged[\String\]'; after 'OK (6 tests)' | P-174, "a program's own number type receives a numeral through its coercion from that type"; fork N7, "into a program's type through its coercion from the numeral type" (`CLIMB-BATCH-29.md:355`) |
52: | `6408011e9b` | the dispatch caches' key (`Numerals.keys`) omitted the one value-dependent part of a numeral's choice, whether NN32 (ZZ64 default) or NN64 (ZZ default) holds it | defect | `NumeralDispatchCacheWalk`: on the build of A to D, before this edit, 'FortressException: IntegerOverflow', 'Tests run: 1,  Failures: 1'; after 'OK (30 tests)' | the rung's decision 4, whose key is to tell apart calls that choose differently; "If any answer differs, the reuse is wrong" (fortress-repo, `compiler.md`, "The checker's time") |
53: | `953d050966` | `Numerals.atReturn` kept a numeral's default where the declared return type took it in no way, and swallowed the coercion's exception | defect, **contested** | `NumeralAtReturnWalk`, `NumeralAtReturnOutOfRangeWalk`, `NumeralAtReturnNoCoercionWalk`: on `9e1f796efe` 'FAIL: twelve(): Digit = 12 raises the coercion's FailCalled', ' Missing expected refusal at load' twice; after 'OK (6 tests)' | (contested) |
54: | `55de601879` | row 959 shows on both paths; row 960 and its `XXX` test; two sentences of the skill made false | correction | `XXXRadixPointLeadingZerosWalk`: 'OK Saw expected exception' as it is, ' Missing expected failure ' changed for one run | the base's compiled run above |
55: | `2690c5aa15` | the report lacked its questions for the curator | correction | | `records.md`, "What every report holds" |
56: 
57: The failing runs of A to D: `harness-one.sh <scratch>` over the six new or extended files on the worker's head's build, 'Tests run: 6,  Failures: 6'; after: 'OK (6 tests)'. All the rung's 23 tests and my 7, after the last fix: 'OK (30 tests)'. On the old code (the base build's harness), `NumeralOutOfRangeNN32Walk` and `NumeralDispatchCacheWalk` pass, the base refusing the NN32 binding and choosing `QQ` for both calls, and the rest fail as their types are undefined: 'Tests run: 8,  Failures: 5'.
58: 
59: **The suite.** `ant testSystem` after the last fix, on the code `953d050966` commits: 'Tests run: 202, Failures: 1', '198, Failures: 0', '203, Failures: 0', '200, Failures: 0', 803 tests, 'BUILD FAILED' by `TupleOrderMixedRefused` alone, rung G's key (fork G4), as on the worker's tree. My fixes change no checker or shared phase, so no `ant testQuick`; the demos are the gather's.
60: 
61: ## The contested fix
62: 
63: `953d050966`, a numeral at a declared return type (`Numerals.atReturn`, called from `FunctionClosure` and `MethodClosure`).
64: 
65: - The worker's argument (`REPORT.md`, "Decisions", 6): "The return conversion in `FunctionClosure` and `MethodClosure`, at a declared return type only; elsewhere the default. Walk checks no return type, so a numeral that does not convert there is its default."
66: - Mine: the section says "A numeral out of range at a typed place raises there when it runs", and fork N7, the record's default for walk's places, names the return among them and says what happens where the numeral does not convert: "At a chosen declaration's parameter, a typed binding, a field and a declared return type, the checker's places, a numeral converts from its exact value: into the eight number types ..., a numeral out of the type's range refused at the place when it runs, as walk refuses one at a binding today (row 325's walk half); into a numeral type as the numeral object; into a program's type through its coercion from the numeral type ...; else refused" (`explorations/coordinator/CLIMB-BATCH-29.md:355`). As built, `wide(): ZZ32 = 3000000000` answered a `ZZ64`, and the catch of every `FortressException` turned a program's raising coercion into the numeral's default; the binding, the field and the parameter refuse or raise in each case. The fix converts as the binding does and raises 'Type mismatch returning ...' where nothing converts the numeral; a value that holds no numeral is returned unchecked, as before. The suite's verdicts do not move.
67: 
68: ## Questions for the curator
69: 
70: - P-168's one exception reads "two values of a numeral type inside a coercion's body are strictly equivalent when their reduced values are equal"; the rung compares a `NaturalNumeral` and a `RadixPointNumeral` so too (its decision 10), so `2` and `2.0` inside a body are `SEQV`, where the rule's first sentence says values of different types never are. Is the exception within one numeral type, or across both? Evidence: `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java:48-49`, `POSITIONS.md:101`.
71: - A numeral beyond the largest finite `RR32` or `RR64` converts to `Infinity` at a typed place under walk with no error: `s: RR32 = 340282356779733661637539395458142568448` prints 'Big1 RR32 above max Infinity' (`bin/fortress` on the rung's build), and `simpleDoubleArith.numeralToFloat` rounds so by IEEE's rule. Is such a numeral "outside the type's range" (P-173, `POSITIONS.md:104`), refused statically and raising under walk as an out-of-range integer numeral does, or is `Infinity` its one rounding?
72: 
73: ## Where I differ from the worker's account
74: 
75: - Decision 6 (the return): fixed, contested, above.
76: - Decision 4 (the caches' key): its key missed the numeral's range at NN32 and NN64 (`6408011e9b`).
77: - Decision 9 (the four numbers from the text): the radix came from the node, 1 for an all-zero fraction (`e3f9f07dfb`).
78: - "What changed and why", the places: 'an integer numeral outside an integer type's range is not converted' held for ZZ32, ZZ64 and NN64 only until `794f7d908e`.
```

#### explorations/compile-ladder/rung-numeral-types/JUDGE.md:1-30
```
1: # Rung N, rung-numeral-types: the judge's ruling
2: 
3: One fix was contested: `953d050966`, a numeral at a declared return type (`Numerals.atReturn`, called from `FunctionClosure` and `MethodClosure`). Ruling: **upheld**. The rung **stands** as the branch holds it; no revert.
4: 
5: ## The fix
6: 
7: At the worker's head, `Numerals.atReturn` converted a numeral whose default does not match the declared return type through `Coercions.coerce`, returned the default where `coerce` answered null, and caught every `FortressException` of the conversion to return the default (`git show 953d050966 -- ProjectFortress/src`, the removed lines `catch (FortressException ex) { // the default stands }`). The fix returns the conversion, raises 'Type mismatch returning ...' where `coerce` answers null, and lets the coercion's own exception leave the call (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:345-355`). A value that holds no numeral is returned unchecked, as before (`:346`).
8: 
9: ## The ruling
10: 
11: The record settles the point, and it settles it the skeptic's way.
12: 
13: - Fork N7, the batch record's default for walk's places, names the declared return type among them and says what happens where the numeral does not convert: "At a chosen declaration's parameter, a typed binding, a field and a declared return type, the checker's places, a numeral converts from its exact value: ... a numeral out of the type's range refused at the place when it runs, as walk refuses one at a binding today (row 325's walk half); ... into a program's type through its coercion from the numeral type ...; else refused" (`explorations/coordinator/CLIMB-BATCH-29.md:355`). The rung's section adds: "A numeral out of range at a typed place raises there when it runs" (`CLIMB-BATCH-29.md:428`).
14: - P-173: "a numeral outside the type's range is refused statically; walk converts from the exact value at the same places, place by place" (`POSITIONS.md:104`). P-174: "A program's type with no coercion from the numeral type refuses a numeral" (`POSITIONS.md:105`).
15: - The specification counts a declared return type as a coercion context of the same standing as a typed variable and a parameter: "the right-hand sides of variable and field declarations where the left-hand sides have declared types", "arguments to functionals and constructors where the corresponding parameters have declared types", "body expressions of functionals and constructors where the return types are declared" (`Specification/basic/conversions-coercions.tex:118-127`). So a return is not a place that fixes no type, and the default, which P-173 gives only where nothing fixes a type, does not apply there.
16: - The library's own way at walk's other typed places is to refuse what does not convert and to let a coercion's exception propagate: the binding (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/LHSEvaluator.java:221-227`, 'RHS expression type ... is not assignable', and `:235-237`, which rethrows), the parameter (`evaluator/values/NonPrimitive.java:256-270`, `unificationError`), the assignment (`evaluator/BaseEnv.java:313-327`, 'Type mismatch assigning'). The rung's own binding tests assert the same two refusals the fix's tests assert at a return: `NumeralOutOfRangeWalk` ('Type mismatch binding 3000000000') and `NumeralNoCoercionRefusedWalk` ('Type mismatch binding 3'). As built, the return was the one place that turned these into a value: `wide(): ZZ32 = 3000000000` answered a `ZZ64`, `made(): OnlyZ = 3` a `ZZ32` though `OnlyZ`'s one coercion is from `ZZ32` (fork C4's no chain), and a program's coercion that threw `FailCalled` answered the numeral's default.
17: 
18: ## Each side's claims
19: 
20: - The worker, right: walk checks no return type of a value in general (`FunctionClosure.java:209-221` returns the body's value unchecked unless it holds a numeral), and a return without a declared type takes the default (fork N7, "Elsewhere, an untyped binding, ... it takes its default"). The fix keeps both.
21: - The worker, wrong: "so a numeral that does not convert there is its default" (`REPORT.md:137`). Walk's general want of return checks is not the rule for a numeral, which fork N7 decides separately and refuses at the place; nothing on record lets a conversion's exception be swallowed. `REPORT.md:137`'s second sentence no longer describes the code; this ruling and `SKEPTIC.md`, "The contested fix", hold the account that does.
22: - The skeptic, right on every claim it makes: the citations of fork N7 and of the section are exact, the three cases fail on the worker's head and pass after (`SKEPTIC.md`, "Fixes": "'FAIL: twelve(): Digit = 12 raises the coercion's FailCalled', ' Missing expected refusal at load' twice; after 'OK (6 tests)'"), and the suite's verdicts do not move (`SKEPTIC.md`, "The suite": "803 tests, 'BUILD FAILED' by `TupleOrderMixedRefused` alone, rung G's key").
23: 
24: ## The fix's reach
25: 
26: The refusal fires only where a value holding a numeral meets a declared return type that neither matches its default nor converts it; every such program the checker refuses statically (P-173 for range, P-174 and fork C4 for a type without a coercion from the numeral type), so no well-typed program changes. No line of the one library returns a bare numeral at a type other than a number type: `grep -rnE '\)\s*:\s*[A-Z][A-Za-z0-9]*\s*=\s*-?[0-9][0-9_.]*\s*$' Library/*.fss ProjectFortress/LibraryBuiltin/*.fss`, less the eight number types, prints one line, `Library/FortressLibrary.fss:3872: empty(): T = 0`, inside the comment that opens at `:3868`. The fix's tests keep the batch's rules: their message substrings name no class, and they assert no static argument. The fix stays in walk's numerals (`Numerals.java`, a file of the rung), outside rung G's lines of `EvaluatorBase.java` and rung S's of `Evaluator.java`.
27: 
28: ## Decision
29: 
30: Stands. The fix lands with the rung.
```

### Rung C: explorations/compile-ladder/rung-numeral-checker

#### explorations/compile-ladder/rung-numeral-checker/REPORT.md:1-42
```
1: <!-- Climb batch 29, rung C (rung-numeral-checker): the compiled checker's numerals by P-173, P-174 and P-40: the default where nothing fixes a type, the narrowest default for a type parameter that several numerals fix, the numeral types written only as a parameter's type, a numeral out of range refused statically, a size read as a value a ZZ32; rows 79, 946, 486 and 325 close, 362, 506 and 675 are rewritten, two rows are new. -->
2: 
3: # Rung C: the checker's numerals
4: 
5: - problem: the checker types a numeral `IntLiteral` or `FloatLiteral` by its form and keeps that type wherever nothing converts it (F-57), so `x = 3` is an `IntLiteral` on the compiled path: `explorations/coordinator/FACTS.md:54`
6: - spec: P-173 and P-174 (`explorations/coordinator/POSITIONS.md:104`, `:105`); the specification's tie rule, which the default widens: `Specification/basic/inference.tex:299-317`
7: - precedent: the planner's prototype, step 2 (`explorations/compile-ladder/plan-29/probes/literal-default.patch:973-1432`), and the base's numeral reading at a tie (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:459`)
8: - deviation: no `viaDefault` chain and no trace object (`LiteralDefaults`); a coercion into the default recognised by its form, not marked in a table; the written-only rule allows a parameter's type and names both types; joins, tuples, the range refusal, the unfixed-size fallback and the nat value added: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:410`
9: - historical: `scala_src/typechecker/impls/Functionals.scala`, `impls/Decls.scala`, `impls/Misc.scala`, `CoercionOracle.scala`, `TypeWellFormedChecker.scala`, `STypeChecker.scala`, `staticenv/KindEnv.scala`, `scala_src/useful/STypesUtil.scala`, `compiler/codegen/CodeGen.java`; the team's tests `Compiled5.ah`, `5.aj`, `5.ak`, `6.az`, `9.g`, `9.j`, `9.p`, `9.t`, `9.u` and `XXX6at.test`, `XXX6bw.test`: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1`
10: 
11: Java and Scala paths below are under `ProjectFortress/src/com/sun/fortress/`. Line numbers are the tree's at `fa13e6383c`.
12: 
13: ## 1. What changed and why
14: 
15: The commits: `7bd7c7dfc7` (the change and its tests), `fe5d146a86` (the `XXX` test of the one fork not built, row 961), `fa13e6383c` (three revival tests the suite showed broken, respelled). The code of `7bd7c7dfc7` is the final code; the later commits change tests only.
16: 
17: **The default (P-173, fork C1).** A numeral, an `IntLiteralExpr` or `FloatLiteralExpr` node as written or as the fold made it, where nothing fixes a type converts into its default: `ZZ32`, or `ZZ64` or `ZZ` by its value, `RR64` with a radix point. The default applies to a numeral node, never to an expression of a numeral type, so `t = x` inside `coerce(x: IntLiteral)` stays an `IntLiteral`. The sites:
18: 
19: - an untyped binding, top level and local, one variable or several (`scala_src/typechecker/impls/Decls.scala:252`, `:289`, `:343`, `:384`), through `defaultNumeral` (`impls/Functionals.scala:1016`): a numeral alone; each element of a tuple on its own; the branches of an `if` with `else`, a `case`, a block's last expression or a one-block `do`, when every result is a numeral, together into the narrowest default holding them all (`joinNumerals`, `joinInto`, `:1030`, `:1046`);
20: - a parameter or a typed place whose type holds the numeral without conversion and fixes no type, `Any`, `Object`, `Number`, where the default fits too (`defaultAtUnfixed`, `:1078`): in `checkApplicableWithoutInference` (`:490`), its `Any`-domain branch (`:512`), after the subtyping inference (`:279`), in the coercion attempt (`:410`), and at every typed binding, assignment, field and return through `STypeChecker.checkExpr` (`scala_src/typechecker/STypeChecker.scala:506`);
21: - a parameter or typed place whose type declares no coercion from the numeral's type but holds its default, as `Index` holds `ZZ32` (`defaultFits`, `:1093`; `STypeChecker.scala:510`, `Functionals.scala:411`, `:491`);
22: - a type parameter that numerals alone fix, with no expected type: before the subtyping inference (`preDefault`, `:1121`, called at `:198`), and as the coercion attempt's one choice for that parameter (`:385`), the narrowest default holding every value (`numeralDefault`, `:998`), with the attempt's ordinary choices as a fallback where the default finds no candidate (`:417-423`);
23: - a dotted receiver written as a numeral, where the default type has the member (`defaultReceiver`, `:1105`; called at `:1360` and `impls/Misc.scala:347`), the prototype's receiver rule, so the prelude's `(1).asNN32` keeps its numeral.
24: 
25: It does not apply: at a parameter of a numeral's own type (`isNumeralType`, `:989`), which a coercion's or an operator's parameter is; at a place whose type declares a coercion from the numeral's type (the eight number types on the one library, the prelude's six, a program's type with `coerce(x: IntLiteral)`), where that coercion runs; at a type parameter that a non-numeral argument also fixes, or another parameter type mentions, or the expected type fixes, which the inference sets as before (P-74); to a join with a non-numeral branch; to an `if` without `else`.
26: 
27: **The ranking (fork C4, the prototype's step 5 in its narrow form).** A numeral's coercion into its own default ranks as no coercion wherever it is built: `NumeralConversion.isDefault` and `counts` (`scala_src/typechecker/CoercionOracle.scala:432`, `:439`), read by `counted` (`impls/Functionals.scala:742`) and by `moreSpecificCandidate` (`scala_src/useful/STypesUtil.scala:1147-1148`). It is read from the coercion's form, a `TraitCoercionInvocation` of a numeral node into the library type of its default's name, not from a table of marked nodes, so it holds for every copy of the node and keeps no state. Before the subtyping inference a numeral at a parameter of exactly its default type takes that coercion (`preDefault`), so `ee[\nat n\](x: ZZ32)` fits `ee(5)` as it is. So `gg(5, w)` runs `gg[\T extends Number\](x: ZZ32, y: T)` and the narrower declaration is the checker's static choice, P-173's reading of P-49 (fork C8).
28: 
29: **The narrowest default (fork C1, P-173).** `pick(3, 3000000000)` is `pick[\ZZ64\]` on the prelude (`LiteralDefaultCompiled`); on the one library, read by the count stage's driver, `<|3000000000, 0.5|>` is a `List[\RR64\]` (section 4).
30: 
31: **The written-only rule (P-174, fork C2).** `TypeWellFormedChecker` refuses `IntLiteral` or `FloatLiteral` written in a program's file anywhere but as the whole type of a parameter of a function, method, coercion, operator or function expression: "IntLiteral cannot be written in a program except as a parameter's type." (`scala_src/typechecker/TypeWellFormedChecker.scala:293`). An object's value parameter is a field, and is refused. Files under `Library/` and `LibraryBuiltin/` are exempt. A type that the checker infers from such a parameter keeps the parameter type's span and is not refused: the rule reads written types (`parameterTypeSpans`, `:48`; `numeralTypeWritten`, `:67`). The names are read from `Types.INT_LITERAL` and `Types.FLOAT_LITERAL`, so N's switch of the names by library carries the rule to `NaturalNumeral` and `RadixPointNumeral`.
32: 
33: **No chain (fork C4).** `buildCoercion` returns the coercion it checks (`CoercionOracle.scala:171`), without the prototype's `viaDefault`: `c: CC64 = 3` for a `CC64` with only `coerce(x: ZZ32)` is refused, "Right-hand side has type IntLiteral, but declared type is CC64." (`XXXLiteralNoCoercionRefused`). `defaultFits` does not chain either: it takes the default only where the default is a subtype of the place's type.
34: 
35: **The range refusal (fork C3, row 325).** `NumeralConversion.outOfRange` (`CoercionOracle.scala:459`): an integer numeral outside `ZZ32`, `ZZ64`, `NN32` or `NN64`, and an integer or float numeral whose one rounding into `RR64` or `RR32` is an infinity, has no coercion into that library type (`:172`). At a typed place the checker signals "The numeral 4294967295 is out of range for ZZ32, whose values are -2147483648 to 2147483647." or "The numeral … rounds to infinity in RR64." at the numeral (`STypeChecker.scala:513`); at a call that no candidate fits, each such numeral against each candidate's parameter type, beside the call's own error (`signalNumeralRanges`, `impls/Functionals.scala:1169`, called at `:795`). At an overloaded call, a candidate whose parameter cannot hold the numeral is not applicable, so `z MAX 3000000000` for a `ZZ32` `z` runs `ZZ64`'s `MAX` (`NumeralBeyondWidthMax`, promoted).
36: 
37: **The size read as a value (P-40, fork C5, row 486).** `KindEnv.getType` answers `ZZ32` for a `nat` or `int` parameter (`scala_src/typechecker/staticenv/KindEnv.scala:71-72`), the prelude's `CompilerBuiltin.ZZ32` or the one library's `FortressLibrary.ZZ32` (`sizeValueType`, `:112`); the code generator reads such a value where its type is `ZZ32` and converts the class loader's `IntLiteral` constant by `asZZ32` (`compiler/codegen/CodeGen.java:6342-6364`). So `u: NN32 = n` is refused, "Right-hand side has type ZZ32, but declared type is NN32.", and `v = n` is a `ZZ32`.
38: 
39: **A size the default leaves unknown.** A declaration that only the default at a parameter of its default type makes applicable, and whose size the call then leaves unknown, is checked as the numeral is, without the default (`impls/Functionals.scala:288-292`), so `ee(5)` is not refused by P-40's rule for an unfixed size: section 9, decision 6.
40: 
41: **A static argument of a numeral's own type.** A subtyping inference that a numeral argument fixes at the numeral's own type is left to the attempt with coercion, which reads the numeral by its default (`:172`), where no argument is a function expression still unchecked; `Compiled5.bu`'s `gapply(fn (x) => x + 1, 5)` needed that condition (section 3).
42: 
```

#### explorations/compile-ladder/rung-numeral-checker/REPORT.md:116-151
```
116: ## 8. Defects, each with its home
117: 
118: - Rows 79, 946, 486 and 325: home 1, repaired, by `LiteralDefaultCompiled` (79, 946), `NatValueZZ32Compiled`, `XXXNatValueNN32Refused.test` and `tests/NatValueZZ32Walk` (486), `XXXNumeralBeyondZZ32Range.test` and `NumeralBeyondWidthMax` (325).
119: - Row 362, narrowed: what remains is a `FloatLiteral` value rendered inside a program's coercion; home 2, `XXXFloatLiteralValuePrint` (the specification settles that a numeral renders), its row's whole new line in `record.md`.
120: - Row 506, rewritten by what remains: numerals no longer reach the cap; four `ZZ32` arguments do. Home 2 as before, `XXXInferComboCap` rewritten.
121: - Row 675, its reproducer's example moved below zero, since the read above `NN32` now raises; home 3 as before (the test asserts today's value).
122: - row 961, a negative numeral at a program's type reaching its coercion signed: home 2, `XXXNegativeNumeralOwnType` (P-173 and P-174 settle it).
123: - row 962, a size of 2^31 or more read as a value raising `java.lang.Error`: home 3, the row only, since a run that dies passes no gated test that asserts today's behaviour, and nothing settles what the read should do; the probe is `NatRtBigSize` before its respelling ("2147483647", then "java.lang.Error: Not in range for ZZ32: 2147483648", `junit.sh q1` at `fe5d146a86`).
124: - An error's text, not a defect of acceptance: where an expected type rejects every instance, a call whose static argument a numeral fixes at the numeral's own type now reports that no declaration applies, where the base reported the instance's type against the expected one (section 4). Recorded here only.
125: 
126: ## 9. Decisions
127: 
128: 1. **The default recognised by the coercion's form.** A `TraitCoercionInvocation` of a numeral node into the library type named by its default ranks as no coercion (`NumeralConversion.isDefault`). Ways not taken: the prototype's identity table `LiteralDefaults` (`literal-default.patch:1137-1166`), which keeps every marked node for the JVM's life and misses a copied node; a flag on the node, which the AST does not carry. Evidence: the ranking reads the node it is handed (`STypesUtil.scala:1147`).
129: 2. **The written-only rule allows a parameter's whole type, and nothing else.** Ways not taken: the prototype's refusal everywhere ("cannot be written in a program: a numeral has its own type only while the checker types the program"), which P-174's coercions from the numeral types contradict; the rule over inferred types too, which fork C2 declines; a parameter's type anywhere inside, as `Maybe[\IntLiteral\]`, which writes a static argument. An object's value parameter counts as a field. Evidence: fork C2; P-174.
130: 3. **The default where a place's type has no coercion from the numeral's type but holds its default (`defaultFits`)**, so `fi(3)` passes at `Index` and a float numeral at the prelude's `Number`. Way not taken: the default only at `Any`, `Object` and `Number`, the prototype's. Evidence: the judgement's repair 1, "every other type, and no type, takes the default" (`reviews/literal-design-judgement-2026-11-08.md`, section 1), which P-173's text follows.
131: 4. **Joins and tuples at an untyped binding**, through the result positions, and the join's numerals at their narrowest default together. Ways not taken: the prototype's coercion of the whole join, whose branches keep literal values; a join's branches each at its own default, which the judgement's repair 4 declines. Evidence: fork C1.
132: 5. **The range refusal as "no coercion", with the message at typed places and beside a call that no candidate fits.** Ways not taken: a coercion built and an error signalled, which would make an overloaded call refuse `z MAX 3000000000` instead of choosing `ZZ64`'s; the message only at typed places. Evidence: fork C3; `NumeralBeyondWidthMax`'s assertion, "a numeral converts only into a type that holds its value".
133: 6. **A size left unknown after the default is checked without the default.** `ee[\nat n\](x: ZZ32)` fits `ee(5)` as it is by fork C4, but leaves `n` unknown, and P-40 refuses a call whose chosen declaration has a size it cannot fix. The checker so checks the declaration without the default, by subtyping, where it does not apply: `ee(x: Any)` is the static choice, the default makes the argument a `ZZ32`, and the compiled dispatch, which tests run-time types, runs `ee[\nat n\]`, so `ee(5)` gives 1 (`LiteralDefaultCompiled`, `InferO2Pos`). Ways not taken: the static choice of `ee[\nat n\]`, refused by P-40's rule ("Could not infer static argument nat n without context.", the first build of the change); the default not ranked as no coercion at a generic's parameter, which would leave `gg(5, w)` at the plain declaration. No decision of the curator covers the case where P-40 and fork C4 meet; a question below.
134: 7. **The written-only message**: "IntLiteral cannot be written in a program except as a parameter's type." Way not taken: the prototype's text, now false. Evidence: fork C2, "renamed for both names".
135: 8. **C6 not built** (row 961). The integer literal fold makes `-3` one node before the checker and keeps no reference to the prefix operator, so the checker cannot apply the program's `-` without a reference the disambiguator makes (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:148-153`). Ways not taken: a fresh operator reference built in the checker, which the disambiguator's binding of operators does not reach; refusing a negative numeral at every program's type, which would refuse `c: CC64 = -3` where the type declares `-` too. Until the switch-over the prelude's `IntLiteral` carries the sign, so the coercion reads -3 exactly.
136: 9. **The tests' respellings**: the prototype's `Boolean` arm; the team tests at `ZZ32`, the type their comments name; the nat tests read through types where a value cannot hold the size.
137: 10. **No speed pass**: the profile shows the change in under 0.3 % of the samples.
138: 
139: ## 10. Points to report
140: 
141: - The default's sites, and where it does not apply: section 1.
142: - The narrowest default: `numeralDefault` over the numerals a parameter collects (`impls/Functionals.scala:998`, `:385`, `:1141-1146`): `pick(3, 3000000000)` "ZZ64,ZZ64", `pick(3, 4)` "ZZ32,ZZ32" (`LiteralDefaultCompiled`); `<|3000000000, 0.5|>` `List[\RR64\]` and `pick(3, 0.5)` RR64 on the one library (section 4).
143: - The written-only rule's message and reach: section 1; inferred bindings in a coercion's body pass (`LiteralTypeUnwritable.fss:10`, `LiteralDefaultCompiled.fss:32`).
144: - The range refusal's messages and types: section 1; `XXXNumeralBeyondZZ32Range.test`.
145: - The nat value: `KindEnv.scala:71-72`, `:112`; `CodeGen.java:6342-6364`; row 486's program compiled: `u: ZZ32 = n` answers 3 and `v = n` is a `ZZ32` (`NatValueZZ32Compiled`), `u: NN32 = n` refused (`XXXNatValueNN32Refused.test`).
146: - Each test line changed: section 3.
147: - The count and distance tables, P-148's runs and profile: sections 5 and 6.
148: - The tests whose verdict changes in `ant testQuick`: against the gate, `NativeHelperFamilyAsFloatCompiled`, `NatArithBeyondRun`, `NatRtBigSize` (respelled), and, before their changes, `XXXInferComboCap`, `XXXNumeralPrintRungR`, `XXXNumeralBeyondWidthMax`, `XXX6at`, `XXX6bw`, the nine team tests, `InferO2Pos`, `InferO2Num`, `InferCoercionShapes` and the helpers with an `IntLiteral` arm (measured by `junit.sh p2`).
149: - Sentences made false: section 11.
150: - Files beyond those named: `compiler_tests/NativeHelperFamilyAsFloatCompiled.fss`, `NatArithBeyondRun.fss` and `.test`, `NatRtBigSize.fss` (respelled), `ProjectFortress/tests/NatValueZZ32Walk.test`. No edit of the library, walk or the prelude.
151: 
```

#### explorations/compile-ladder/rung-numeral-checker/SKEPTIC.md:68-84
```
68: ## 6. Fixes
69: 
70: **Fix 1, `f5f4c57922` (defect, settled).** The default did not reach a numeral that a function, method, local function or function expression returns with no declared return type: the body is typed by `newChecker.checkExpr(body)` (`impls/Decls.scala`, FnDecl) and `this.extend(params).checkExpr(body)` (`impls/Functionals.scala`, FnExpr) with no default, and the result type is read from the body (the Thunker reads the checked body's type, `scala_src/typechecker/Thunker.scala:166-170`). So row 946's crash stays reachable through `v = bigOne()`. Settled by P-173 (`explorations/coordinator/POSITIONS.md:104`): "`Any`, `Object`, `Number`, an unbounded type parameter and no declared type take the default", and by row 946, which the rung closes. Ways: the two body sites (taken, `impls/Decls.scala:223-225`, not for a coercion, whose result is its type; `impls/Functionals.scala:1567`); the call site of such a function (not taken: the call is an expression of numeral type, to which P-173 says the default never applies). Test `compiler_tests/LiteralDefaultResultCompiled`:
71: - failing on the worker's head, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh skfail1 ProjectFortress/compiler_tests LiteralDefaultResultCompiled.test XXXNumeralBeyondRangeInTuple.test` (it then held a `typecase` line, dropped below): "Tests run: 3,  Failures: 3"; as committed, on the old code, `old-fortress.sh /home/user/fortress-base29 <tree>/tmp/rung-numeral-checker/skeptic/old-caches junit .../LiteralDefaultResultCompiled.test ...`: "FAIL:  IntLiteral =/= ZZ32; a function's numeral result with no declared return type is a ZZ32", "Tests run: 4,  Failures: 2";
72: - passing on the final code, `junit.sh skpass2 ... LiteralDefaultResultCompiled.test XXXNumeralBeyondRangeInTuple.test XXXNumeralTypecaseSelector.test XXX5r.test XXXPatternMatchingc.test LiteralDefaultCompiled.test XXXNumeralBeyondZZ32Range.test`: ". run ProjectFortress/compiler_tests/LiteralDefaultResultCompiled (552ms) PASS", "OK (9 tests)".
73: The two library tests whose `pick` relied on an untyped result staying an `IntLiteral` (the worker's respelling) now reach the prelude's `IntLiteral` operators through `choose(b: Boolean, lo: IntLiteral, hi: IntLiteral)` (`library_tests/IntLiteralArithRung7.fss:35-36`, `IntLiteralRung6.fss:41-42`); a probe prints "pick IntLiteral pick0 ZZ32" (the old code: "pick IntLiteral pick0 IntLiteral"). This writes `IntLiteral` as a plain function's parameter type, which the checker allows and the batch's rule for tests ("only as a coercion's parameter type") does not: a point below.
74: 
75: **Fix 2, `b212f67a0e` (defect, settled).** The range refusal read a numeral only by itself. A tuple at a tuple-typed place is converted by one `TupleCoercionInvocation`, whose element coercions `checkCoercionTuple` builds for dummy arguments (`scala_src/typechecker/CoercionOracle.scala:301-361`), so `t: (ZZ32, ZZ32) = (1, 3000000000)` and a return type `(ZZ32, ZZ32)` compiled and raised at run time: row 325's defect, which the rung closes. Settled by P-173: "a numeral outside the type's range is refused statically", and fork C3. Ways: `NumeralConversion.outOfRangeAt` reads a tuple expression at a tuple type element by element and `STypeChecker` signals at the element (taken, `CoercionOracle.scala:459-466`, `STypeChecker.scala:513-514`); the oracle's tuple coercion given the element expressions (not taken: it builds every coercion for dummies, a larger change). Test `compiler_tests/XXXNumeralBeyondRangeInTuple.test` over `NumeralBeyondRangeInTuple`: failing on the worker's head (`junit.sh skfail1`): "Saw failure, but did not satisfy compile_err_WImatches", "Saw wrong failure. compile"; on the old code (the same run as above), the same; passing on the final code (`junit.sh skpass1`): "NumeralBeyondRangeInTuple.fss:6:25-33: The numeral 3000000000 is out of range for ZZ32, whose values are -2147483648 to 2147483647.", "... :11:29: The numeral -5 is out of range for NN32, whose values are 0 to 4294967295.", " Saw expected failure", "OK (3 tests)".
76: 
77: **The whole suite after the last fix**, `ant testQuick` on the final code (the code of `b212f67a0e`): "Tests run: 86, Failures: 0" (library), "Tests run: 263, Failures: 0" (othercompiler), "Tests run: 1491, Failures: 0, Errors: 0" (compiler), "BUILD SUCCESSFUL". 1491 is the worker's 1487 and the four cases of the skeptic's three `.test` files then in the tree; `XXXTypecasePatternUntypedBinder.test`, added after, passed alone (`junit.sh skxxx1`: " OK Saw expected exception", "OK (2 tests)").
78: 
79: **Not fixed: a numeral as a `typecase`'s selector (row 963, home 2).** The skeptic built the default at the selector (`impls/Misc.scala:660`) too; `ant testQuick` then gave "Tests run: 1490, Failures: 2": `XXX5r.test` ("Saw failure, but did not satisfy compile_err_equals": its pinned clauses' span became `Compiled5.r.fss:16:3-.../CompilerBuiltin.fsi:210:9`) and `XXXPatternMatchingc.test` ("UNEXPECTED exception", "java.lang.RuntimeException: typcase match failure!" at `CodeGen.getType`, `CodeGen.java:2181`), whose `typecase (3, 4) of (x, y: ZZ32)` the default makes reachable. That moves two team tests and turns a static refusal into a code-generator stop, so the site is reverted and recorded: `compiler_tests/XXXNumeralTypecaseSelector.test` (green on the old and the final code: "The typecase clause, ZZ32, is unreachable.", " Saw expected failure") and row 963; the code generator's stop on an untyped pattern binder, on the base too (`old-fortress.sh ... junit .../XXXTypecasePatternUntypedBinder.test`: "java.lang.RuntimeException: typcase match failure!", " OK Saw expected exception"), is `XXXTypecasePatternUntypedBinder.test` and row 964.
80: 
81: **Corrections**, `c4c17302e6` and `76efb477a7`: the two expected-failure tests above; `XXXInferComboCap.fss`'s comment, which pointed to a record (tests-writing.md, "Names, comments, citations"), now says what it checks; record.md's findings 1 and 5 name the fixes and row 963, rows 946 and 325 their added tests, rows 390 and 446 rewritten, row 963 and row 964 added, finding 1's `Decls.scala` lines moved two down by fix 1.
82: 
83: Contested: none. Neither fix changes a behaviour the report argues for: the report's list of places where the default does not apply (REPORT.md section 1) names neither a result with no declared return type nor a tuple element, and the worker's respelling of the two library tests used the untyped result without arguing for it.
84: 
```

#### explorations/compile-ladder/rung-numeral-checker/SKEPTIC.md:105-107
```
105: ## Verdict
106: 
107: **Approved**, with the two fixes, both settled, and the corrections. The count and distance tables are those of the worker's head.
```

### Rung F: explorations/compile-ladder/rung-literal-fold

#### explorations/compile-ladder/rung-literal-fold/REPORT.md:1-81
```
1: # Climb batch 29, rung F: the numeral fold on both paths, typed-place constants rounded once, a program's numeral coercion once per site
2: 
3: - problem: the fold ran on the compiled path only and stopped the compile at `3 CHOOSE 5`, took `BOXPLUS` as `+`, and a float numeral became an `RR64` by two or three roundings: `explorations/compile-ladder/plan-29/PROBES.md:28-46` (probes 2 and 3); rows 862, 954, 955 (`explorations/fortress-gap-ledger.md:628`, `:638`, `:639`)
4: - spec: `Specification/basic/expressions/constant.tex:39-93` ("Types of Static Expressions"); `Specification/basic/expressions/literals.tex:182-193` (a static rational expression converted with at most one rounding)
5: - precedent: the team's fold, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:58-174` at b430f9f428; the prototype's typed constants, `explorations/compile-ladder/plan-29/probes/literal-default.patch:697-855`; the code generator's static fields set in a class's static initializer, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:1926-1986` and `:4821-4845` at b430f9f428; an operator reference remade from a written one, `ProjectFortress/src/com/sun/fortress/nodes_util/ExprFactory.java:1997-2020`
6: - deviation: a program's numeral sites are initialized in the component class's static initializer, whatever class holds the site (`CodeGen.java:7214-7234`)
7: - deviation: the component class's static initializer is emitted after the component's declarations, not before (`CodeGen.java:1936-2003`)
8: - deviation: a juxtaposition of numerals alone folds as their product, beside `DOT` and `TIMES` (`IntegerLiteralFoldingVisitor.java:416-434`)
9: - deviation: the comparisons, `MIN` and `MAX` fold over radix-point operands too, exactly (`IntegerLiteralFoldingVisitor.java:304-310`)
10: - deviation: a folded form that needs a prefix minus or a `/` reuses one written in the component, and the expression is left as written where the component writes none (`IntegerLiteralFoldingVisitor.java:95-114`, `:174-185`; row 956)
11: - deviation: the compiled test harness gains the key `run_exits_nonzero` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:595-606`)
12: - historical: `ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java`, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java`, `ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`, `ProjectFortress/compiler_tests/Compiled7.Print17.fss`, `ProjectFortress/tests/sequivTest.fss`
13: 
14: ## What changed and why
15: 
16: Commits on `wip/rung-literal-fold`: `8e4ca7b070` (the fold, the phase order, the typed constants, the once-per-site call, the harness key, the tests), `f58c027526` (five tests respelled with typed operands), `1bf56ffa92` (`XXXNumeralFoldNoPrefixMinusWalk`). The code is `8e4ca7b070`'s; the two later commits change tests only.
17: 
18: **The phase order** (`PhaseOrder.java:125-136`). Walk's order was PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, TYPECHECK (switched off under walk), DESUGAR, OVERLOADREWRITE_FOR_INTERPRETER. It now has INTEGERLITERALFOLDING after PRETYPECHECKDESUGAR, as the compiler's order has had it: PREDISAMBIGUATEDESUGAR, DISAMBIGUATE, GRAMMAR, PRETYPECHECKDESUGAR, INTEGERLITERALFOLDING, TYPECHECK, DESUGAR, OVERLOADREWRITE, CODEGEN (unchanged). The count and distance stages run the compiler's order up to TYPECHECK (`explorations/coordinator/tools/checker-count/run.sh`, header), so they read the folded library.
19: 
20: **The fold** (`IntegerLiteralFoldingVisitor.java`, rewritten). An expression of numerals alone, or of the forms the fold writes, folds exactly into a `Constant` (numerator, positive denominator in lowest terms, and a kind: integer, quotient, radix point). The kind sets the default P-173 gives: a radix point among the operands makes the result a radix-point constant, else a `/` makes it a quotient, else it is an integer.
21: 
22: The operators folded, each over integer and radix-point operands unless said, by canonical name through `PrecedenceMap.canon` (`:80-87`):
23: - `+`, `-`; multiplication `DOT`, `TIMES` (canonical `BY`, as `×`), and a juxtaposition of numerals alone (`:416-434`): exact rational arithmetic.
24: - `/` by a nonzero numeral: a quotient, or a radix-point constant where an operand has a radix point.
25: - `^` by an integer numeral of magnitude at most 4096; an integer base takes no negative exponent (P-153: such a power raises at run time); a radix-point or quotient base takes one, so `10.0^(-5)` is `0.00001`.
26: - prefix `-` and `|_|`.
27: - `DIV`, `REM`, `MOD`, `GCD`, `LCM`, `CHOOSE`, `MINMAX`: integers only, with the answers of `simpleIntArith` and `simpleArbitraryPrecisionArith` (`DIV` truncates, `REM` has the dividend's sign, `MOD` the divisor's, `GCD` is nonnegative, `LCM` of a zero is 0); `CHOOSE` folds where 0 ≤ k ≤ n and gives 0 otherwise, as walk's `ZZ32` answers (`ProjectFortress/tests/ChooseZZ32Walk.fss:36-37` at b430f9f428).
28: - `MIN`, `MAX` and the comparisons `<`, `<=`, `>`, `>=`, `=`, `NE`, binary or chained (`:392-407`), into the chosen operand or a boolean.
29: - `||` of two natural numerals of one radix, as written (`:336-364`): their digits joined, leading zeros kept, in that radix.
30: 
31: The operators left alone, with their reasons (fork F2):
32: - `BOXPLUS`, `DOTPLUS`, `BOXMINUS`, `DOTMINUS` (binary and prefix), `BOXDOT`, `BOXCROSS`, `DOTCROSS`, `DOTTIMES`: their meaning needs a width; the base took the first four as `+` and `-` (row 955).
33: - `BITAND`, `BITOR`, `BITXOR`, `BITNOT`, `AND`, `OR`, `XOR`, prefix `NOT`, `LSHIFT`, `RSHIFT`, `<<`, `>>`: bitwise operators and shifts need a width; the base folded `AND`, `OR`, `XOR` and prefix `NOT` as bitwise operations on the exact value.
34: - a division by zero: `/`, `DIV`, `REM`, `MOD` by 0 stay as written, so the run raises; the base folded `n DIV 0` into `CompilerBuiltin.Infinity`, `NegativeInfinity` or `UndefinedNumber` (`IntegerLiteralFoldingVisitor.java:69-74` at b430f9f428).
35: - a result that IEEE arithmetic could make `-0.0`: `-(0.0)`, a zero product of radix-point kind with a negative factor (`0.0 DOT -1`), and `0.0 / -3` (`StrictEquivalenceRuleWalk.fss:30` asserts `0.0` and `-0.0` differ).
36: - every other operator.
37: 
38: The forms of a folded result (fork F1), each with an example from `NumeralFoldJUTest`:
39: - an integer numeral: `2147483647 + 1` is `2147483648`, `2^40` is `1099511627776`, `65536 65536` is `4294967296`; negative as a numeral node with a negative value, the form F-262 states: `-2147483648`.
40: - a decimal radix-point numeral, where the denominator divides a power of ten: `0.1 + 0.2` is `0.3`, `0.5 + 0.5` is `1.0`, `10.0^(-5)` is `0.00001`, `0.5 MAX 1` is `1.0`; negative as prefix minus on it: `0.1 - 0.3` is `-(0.2)`.
41: - the reduced quotient of two integer numerals, for operands without a radix point: `7/2` is `7 / 2`, `14/4` is `7 / 2`, `6/3` is `2 / 1`, `(1/3) + (1/6)` is `1 / 2`.
42: - `p.0 / d` where an operand has a radix point and the denominator does not divide a power of ten, `p` and `d` both exact doubles (below 2^53): `0.1 / 3` is `1.0 / 30`; at an `RR64` place its one rounding is IEEE division of two exact doubles.
43: - a boolean: `0.3 = 0.1 + 0.2` is `true`; `(1/3) < 0.3333333333333333` is `false`.
44: - a written operand, where the result is that operand: `2.50 MAX 1` is the numeral `2.50` as written, so its digits reach a program's coercion.
45: - `3 MINMAX 5` is the tuple `(3, 5)`; `deadc_16 || 0de_16` is the natural numeral `deadc0de_16`.
46: 
47: A form that needs a prefix minus or a `/` reuses a reference that the component writes: a reference carries the overloadings the disambiguator gave it, and the prefix minus's differ from the infix minus's (the dump of `bin/fortress grammar -out` on a program with both: the prefix reference's `_newOverloadings` name the unary declarations, `CompilerBuiltin.fsi:340`, `:399`, `:280`, the infix one's the binary ones, `:405`, `:440`, `:160`). Where the component writes none, the expression is left as written: row 956.
48: 
49: **The typed-place constants** (fork F8, the prototype's step 3). `CoercionDesugarer.foldsTo` (`CoercionDesugarer.scala:28-55`, `:94-95`) turns the coercion of a numeral into a library number type into the numeral typed at that type: an integer numeral in the range of `ZZ32`, `ZZ64`, `NN32` or `NN64`, any integer numeral into `ZZ`, any numeral into `RR64` or `RR32`. `QQ` is not folded (fork F7). Out of range, the coercion call stays and raises at run time. The code generator (`CodeGen.java:2049-2072`, `:4234-4327`) emits the typed numeral as that type's constant: `FZZ32.make(int)`, `FNN32.make(int)`, `FZZ64.make(long)`, `FNN64.make(long)`, `FZZ.make(String)`, `FRR64.make(double)`, `FRR32.make(float)`. A float is one rounding of the exact rational (`roundToDouble`, `roundToFloat`): since the skeptic's fix `c68437686d`, the quotient is rounded to nearest even at the unit in the last place of the result, the least subnormal's at the least, from a guard bit and a sticky bit, and scaled exactly by `Math.scalb`. The rung's first form rounded a quotient of at least 56 (or 28) bits to 53 (or 24) by `BigInteger.doubleValue` (or `floatValue`) and then scaled it, which rounds a second time where the result is subnormal (`SKEPTIC.md`). A numeral still of its own type gets the same one-rounded double in `FFloatLiteral.make(double)`. A probe (`RoundCheck.java`, a scratch program) compared `roundToDouble` and `roundToFloat` with `BigDecimal.doubleValue` and `floatValue` on 200,000 random decimals of up to 30 digits: `random decimals: 200000, double mismatches 0, float mismatches 0`. Those decimals lay in the normal range; in the subnormal range the first form gave `random subnormal-range decimals: 200000, double mismatches 1155, float mismatches 0` and missed (2.5 + 2^-60) ulps of the least subnormal by one ulp in both types (`SKEPTIC.md`).
50: 
51: Row 862's numerals, compiled, `x: RR64 = …` printed (`Row862.fss`, a scratch program, old code then new):
52: 
53:     == old Row862
54:     x =  1.0
55:     y =  1.224646799147353
56:     r =  0.7742526428202697
57:     == new Row862
58:     x =  0.9999999999999999
59:     y =  1.2246467991473533
60:     r =  0.7742526428202698
61: 
62: `Double.parseDouble` gives `0.9999999999999999`, `1.2246467991473533` and `0.7742526428202698` for the three numerals.
63: 
64: **A program's coercion once per site** (fork F5; `CodeGen.java:7169-7234`). Where the code generator meets the call of a program's coercion (a `FnRef` named `coerce_…`, without static arguments, not a local function) on a numeral still of its own type, whose result is a trait type without static arguments outside the libraries, in a component outside the libraries, it registers the site: the result is kept in a public static final field `numeral$coercion$N` of the component's class, and the site reads it by `GETSTATIC`. The component's static initializer, now emitted after the declarations and after the generic-function caching tables, calls each registered coercion once and stores its result (`emitNumeralCoercionSites`). So:
65: - where the class holds the result: a static field of the component's class, one per site, for every site of the component, in a top-level function, an object's or trait's method, a closure or a generic template;
66: - when the call runs: when the component's class is initialized, its first use; for the main component, before `run()` starts (`NumeralCoercionOnceCompiled`: `coerce`, `coerce`, `start`, `PASS`);
67: - a raising coercion: the component class's initialization fails, the program stops before `run()` with exit code 1, and the stack names the class's static initializer, `at NumeralCoercionRaisesCompiled.<clinit>(…NumeralCoercionRaisesCompiled.fss:13)`.
68: 
69: The coercion receives today's compiled numeral value, of the prelude's `IntLiteral` or `FloatLiteral`; its four numbers wait for the one library's numeral objects (fork F5). A library type's coercion of a numeral that `foldsTo` leaves (out of range) stays called at the site.
70: 
71: **The harness key.** A plain compiled run test fails on a non-zero exit (`FileTests.java:595-606`), so no plain test could show a load that fails. `run_exits_nonzero=true` makes a non-zero exit the expected one; the other `run_` keys still apply. `NumeralCoercionRaisesCompiled.test` uses it with `run_out_equals=coerce\n` and `run_err_contains=NumeralCoercionRaisesCompiled.<clinit>`.
72: 
73: **The tests.**
74: - `ProjectFortress/tests/NumeralFoldWalk.fss`: under walk, `2147483647 + 1` a `ZZ64` equal to 2147483648, `-2147483648` a `ZZ32`, `2^40`, `65536 65536`, `65536 DOT 65536`, `0.1 + 0.2 = 0.3`, `7/2` a `QQ`, `3 CHOOSE 5`, `5 CHOOSE (-1)`, `10 CHOOSE 3`, `deadc_16 || 0de_16 = deadc0de_16`, `(1/3) + (1/6) = 1/2`, `(-7) / 2` a `QQ`, `0.1 - 0.3 = -0.2`, `10.0^(-5) = 0.00001`, `0.3 = 0.1 + 0.2`, and `1 DIV 0` raising `DivisionByZero`. Types asserted by `typecase` are P-173's defaults, no static argument and no message.
75: - `ProjectFortress/compiler_tests/LiteralFoldCompiled.fss` and `.test`: `3 + 4`, `2^40` at `ZZ64`, `0.77425264282026984` at `RR64` equal to `0.7742526428202698`, `0.1 + 0.2` at `RR64` equal to `0.3`, `3 CHOOSE 5` compiling and giving 0, `10 CHOOSE 3`, `deadc_16 || 0de_16` at `ZZ64`.
76: - `ProjectFortress/src/com/sun/fortress/compiler/desugarer/NumeralFoldJUTest.java`: the operators left alone, a division by zero left, the negative zeros left, `CHOOSE` outside its range, and each form above.
77: - `FloatNumeralOneRounding` (promoted from `XXXFloatNumeralOneRounding`, three files, with row 862's second numeral added).
78: - `NumeralCoercionOnceCompiled`: two evaluations of one site `SEQV`, two sites not, and the coercion's print once per site, before `run()` starts (`run_out_equals=coerce\ncoerce\nstart\nPASS\n`).
79: - `NumeralCoercionRaisesCompiled`: a coercion that raises fails the load.
80: - `XXXNumeralDivByZeroCompiled` with `NumeralDivByZeroCompiledLink.test` (row 318) and `XXXNumeralFoldNoPrefixMinusWalk` (row 956).
81: 
```

#### explorations/compile-ladder/rung-literal-fold/REPORT.md:244-287
```
244: ## Points to report
245: 
246: - The operators folded and those left alone, with reasons, and the forms with examples: "The fold", above.
247: - The phase order before and after, and each walk answer the fold changes: "The phase order" and "Programs run old against new", above, the library's places and `ZZ`'s getters among them.
248: - The two repaired defects with their tests and rows: row 954, `3 CHOOSE 5` (`LiteralFoldCompiled`, `NumeralFoldJUTest.testChooseOutsideItsRangeIsZero`, `NumeralFoldWalk`, `ChooseZZ32Walk`); row 955, the wrapping and saturating operators (`NumeralFoldJUTest.testWrappingAndSaturatingOperatorsAreLeft`). A third, without a row: `n DIV 0` of numerals folded into `CompilerBuiltin.Infinity` (`NumeralFoldJUTest.testDivisionByZeroIsLeft`; its run-time answer is row 318).
249: - The typed-place constants, the rounding as written and row 862's numerals before and after: "The typed-place constants", above.
250: - The once-per-class call as compiled: "A program's coercion once per site", above; the class is the component's (a deviation).
251: - `NativeHelperFamilyZZ32Walk.fss:31` and `ChooseZZ32Walk.fss`, each line before and after: "The whole suites", above, with `:17-20`, `:30`, `:32-35`, `:37-38` beside `:31`.
252: - The count and distance tables on the final tree: 0 and 0, the same tables as climb batch 28's gate, no site.
253: - Each test whose verdict changes in the suites: the four walk tests and `Compiled7.Print17`, red on `8e4ca7b070` and green after the respelling; `XXXFloatNumeralOneRounding` promoted; new: `NumeralFoldWalk`, `LiteralFoldCompiled`, `NumeralCoercionOnceCompiled`, `NumeralCoercionRaisesCompiled`, `NumeralDivByZeroCompiledLink`, `XXXNumeralDivByZeroCompiled`, `XXXNumeralFoldNoPrefixMinusWalk`, `NumeralFoldJUTest`.
254: - Every sentence made false: above.
255: - Files edited beyond those named: `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java` (the harness key, `:595-606`); the team's `compiler_tests/Compiled7.Print17.fss:20` and `tests/sequivTest.fss:31`; the revival's `tests/NativeHelperFamilyDivisorsWalk.fss`, `AnyNativesIntrinsicWalk.fss`, `StrictEquivalenceRuleWalk.fss`. No edit of the checker's Scala under `typechecker/`, of the library or of the prelude.
256: 
257: ## Decisions
258: 
259: 1. **A juxtaposition of numerals alone folds as their product.** Ways not taken: leave `Juxt` nodes, as the base and the prototype did (neither met one: a juxtaposition is a `Juxt` node, not an `OpExpr`, before the checker, `bin/fortress grammar -out` on `d = 3 4`). Evidence: the library's juxtaposition of two numbers is multiplication (`Library/FortressLibrary.fsi:603-605`), and P-173 folds an expression of numerals alone, so `65536 65536` beside `65536 DOT 65536` would otherwise overflow where the other folds. A `Juxt` marked as a function application is left.
260: 2. **The comparisons, `MIN` and `MAX` fold over radix-point and quotient operands too, exactly.** Ways not taken: integers only (the prototype, `literal-default.md`, step 3). Evidence: the brief's list ("`MIN`, `MAX` and the comparisons"); P-173's "folds exactly". Its consequence: `0.1 = 0.1000000000000000000001` folds to `false`, where the two numerals' `RR64` defaults are the same double (a question for the curator).
261: 3. **A form that needs a prefix minus or a `/` reuses one that the component writes, and the expression is left where none is written.** Ways not taken: a negative radix-point numeral node (against fork F1's prefix minus and the judgement's repair 3, a numeral nobody wrote); a prefix-minus reference made from the infix minus's by changing fixities, as `ExprFactory.makeInfixOpExpr` does for juxtaposition (its `newOverloadings` would name the binary declarations, shown by the dump above); a reference resolved afresh (the fold phase has no disambiguating environment, `IntegerLiteralfolder.foldComponents` takes the components only). row 956 records the gap.
262: 4. **Limits on what folds:** `p.0 / d` only where `p` and `d` are exact doubles, so that its `RR64` is one rounding; a power only where its exponent times its base's bits is at most 65536 (the prototype's guard); `CHOOSE` only where `min(k, n - k)` is at most 4096 and `n` has at most 64 bits. Ways not taken: unbounded folds, which could make megabit constants at compile time.
263: 5. **The base's folds of `AND`, `OR`, `XOR`, prefix `NOT`, prefix `BOXMINUS` and `DOTMINUS`, and of `n DIV 0` into `Infinity`, are dropped** (fork F2: bitwise operators, widths, a division by zero stay as written). Way not taken: keep them. Consequence on the compiled path until the switch-over: row 318.
264: 6. **A chain of comparisons folds only where every operand is a numeral and every operator a comparison.** Way not taken: the base's partial fold, which also threw `CompilerError` "One of the link in a chained expression produced something other than a boolean literal during folding" at a non-comparison link (`IntegerLiteralFoldingVisitor.java:131` at b430f9f428).
265: 7. **A program's numeral sites live in the component class and are set by its static initializer.** Ways not taken: in the class that holds each site (the component's static initializer was emitted before its declarations, closures and template instantiations have no static initializer of the code generator's, and a generic object's instantiation would call the coercion once per instantiation, more than one object per site); a lazy holder class per site, the code generator's way for a top-level variable (`CodeGen.java:6242-6275`), which calls the coercion at the site's first evaluation, not when a class loads. Evidence: P-174's "once per class, when the class loads, one object per site".
266: 8. **The libraries' components and the coercions into the libraries' types are not hoisted.** Evidence: fork F8 keeps the call of an out-of-range numeral's library coercion, which raises at the site; a library type's coercion receiving a numeral `foldsTo` leaves is that case.
267: 9. **The harness key `run_exits_nonzero`.** Ways not taken: an `XXX` name on a designed failure (the `XXX` prefix marks a defect); a JUnit test that compiles and loads a program. Precedent: walk's `load_exception_contains` key for a refusal at load (`tests-writing.md`).
268: 10. **Typed operands by typed locals in the revival's tests, in place in the team's `sequivTest.fss` and in `StrictEquivalenceRuleWalk.fss`**, where an added line would move lines rung N edits; `Compiled7.Print17.fss` takes one added line. Way not taken: leave the tests to fail on this tree and pass on the merged tree (the brief: each rung's tests pass on its own tree).
269: 11. **`ChooseZZ32Walk` calls a typed helper, `chooseZZ32(n, k)`.** Way not taken: sixteen typed locals.
270: 12. **`NumeralFoldWalk` asserts `ZZ64`, `ZZ32` and `QQ` by `typecase`**, the defaults P-173 fixes for the values folded, and no static argument or message (the batch's rules 1 and 2).
271: 13. **The demos run once after the last change of code**, as `tests-running.md` asks for a phase both paths run; the brief leaves the 52 to the gather on the merged tree, and this run is this tree's.
272: 14. **No ledger row is written for row 362's new case** (a folded float expression at a compiled receiver, `Compiled7.Print17`): the row is at 1,193 of its 1,200 characters, and rung C rewrites it (fork C7); record.md hands the fact to the gather.
273: 
274: ## Defects and their homes
275: 
276: - Row 954, the fold's `CHOOSE` crash: home 1, repaired, `LiteralFoldCompiled` and `NumeralFoldJUTest`.
277: - Row 955, the wrapping and saturating operators folded as `+` and `-`: home 1, `NumeralFoldJUTest`.
278: - Row 862, two or three roundings: home 1, `FloatNumeralOneRounding` (promoted).
279: - `n DIV 0` of numerals folded into `CompilerBuiltin.Infinity` on the compiled path (measured: the old run's "Right-hand side has type OR(IntLiteral,Infinity)"): home 1, `NumeralFoldJUTest.testDivisionByZeroIsLeft`.
280: - A program's coercion from a numeral called at each evaluation, one site giving distinct objects (`CoerceOnce.fss` on the base): home 1, `NumeralCoercionOnceCompiled`.
281: - row 318, an operation the fold leaves on two numerals raising `CompilerFailureDetectedAtRunTime` on the compiled path: home 2, `XXXNumeralDivByZeroCompiled`; the specification's answer is `DivisionByZero`; until the switch-over, since no rung edits the prelude. It is row 318's defect, whose stubs are these bodies; record.md gives row 318's whole new line, with this test as its reproducer, in place of a new row (the skeptic's correction).
282: - row 956, an expression of numerals alone left unfolded where the component writes no prefix minus (or `/`): home 2, `XXXNumeralFoldNoPrefixMinusWalk`; the Working Draft settles the exact fold.
283: - Row 362 meets more programs: a float expression folded into a numeral at a compiled receiver; home: row 362's own `XXXNumeralPrintRungR`, which rung C's default turns red on the merged tree (fork C7).
284: - A numeral below the least normal value rounded twice into `RR64` or `RR32` by the rung's first `roundToDouble` and `roundToFloat`: home 1, repaired by the skeptic's `c68437686d`, `FloatNumeralOneRounding`.
285: - row 957, a numeral at a program's own generic type calling the coercion at each evaluation of its site, so one site gives two objects: home 2, `XXXNumeralCoercionGenericTypeCompiled` with `NumeralCoercionGenericTypeCompiledLink.test` (the skeptic's).
286: - Row 387 reached by walk's library: `ZZ`'s `zero` and `one` getters folded into the numeral `0` and returned as a `ZZ32`: home 2, `XXXZZOneGetterWalk` (the skeptic's); record.md gives row 387's whole new line.
287: 
```

#### explorations/compile-ladder/rung-literal-fold/SKEPTIC.md:69-101
```
69: ## The fix
70: 
71: **A numeral below the least normal value rounded twice into `RR64` and `RR32`** (`c68437686d`, a defect of the change). The rung's `roundToDouble` and `roundToFloat` (`ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:4247-4271` at `b01f04bda3`) rounded the quotient to 53 (or 24) bits by `BigInteger.doubleValue` (`floatValue`) and scaled it by `Math.scalb`, which rounds again where the result is subnormal. Settled by P-172 (`explorations/coordinator/POSITIONS.md:103`): "into `RR64` or `RR32` a numeral rounds once, to the type's nearest value, on both paths". The helpers now find the unit in the last place of the result, the least subnormal's at the least (`ulpExponent`), round the quotient there to nearest even from a guard and a sticky bit (`roundedSignificand`), and scale exactly (`CodeGen.java:4247-4285`). The ways: this; `BigDecimal.doubleValue` of the decimal, which reaches only radix-ten numerals and not a folded `p.0 / d`; `Double.valueOf` of the text, likewise. Test: `FloatNumeralOneRounding.fss` gains an `RR32` numeral and an `RR64` numeral just above the midpoint of two subnormal values, the `RR32` value read by its raw bits through `simpleFloatArith.floatRawBits` (the prelude's `RR32` has no `=`, row 528: my first form of the assertion died with "java.lang.AbstractMethodError: Receiver class com.sun.fortress.compiler.runtimeValues.FRR32 does not define or inherit an implementation of the resolved method 'abstract ... =?0").
72: 
73: On the worker's head, before the edit, `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh head ProjectFortress/compiler_tests FloatNumeralOneRoundingLink.test FloatNumeralOneRounding.test` (06:27:02, the `RR64` assertion first) and `... head3 ...` (06:28:03, the final order):
74: 
75:     . run ProjectFortress/compiler_tests/FloatNumeralOneRounding (289ms) FAIL:  a numeral just above the midpoint of two subnormal RR64 values rounds once, up
76:     Tests run: 3,  Failures: 1,  Errors: 0
77:     . run ProjectFortress/compiler_tests/FloatNumeralOneRounding (335ms) FAIL:  2 =/= 3; a numeral just above the midpoint of two subnormal RR32 values rounds once, up
78:     Tests run: 3,  Failures: 1,  Errors: 0
79: 
80: After the fix, built by `ant compileAll` and the library order (06:30:41 to 06:31:53, "BUILD SUCCESSFUL", five jars), `ONE_JVM=1 ... junit.sh fix ProjectFortress/compiler_tests FloatNumeralOneRoundingLink.test FloatNumeralOneRounding.test LiteralFoldCompiled.test NumeralCoercionOnceCompiled.test NumeralCoercionRaisesCompiled.test NumeralDivByZeroCompiledLink.test XXXNumeralDivByZeroCompiled.test NumeralCoercionGenericTypeCompiledLink.test XXXNumeralCoercionGenericTypeCompiled.test Print17.test` (06:32:07):
81: 
82:     . run ProjectFortress/compiler_tests/FloatNumeralOneRounding (318ms) PASS
83:     OK (16 tests)
84: 
85: and `ant testOnly -DtestPattern=NumeralFoldJUTest` (06:33:40): `[junit] Tests run: 9, Failures: 0, Errors: 0, Skipped: 0`. The fix is the code generator's, not the checker's, walk's or a shared phase's, so it needs no whole suite (`tests-running.md`, "When to run a whole suite"); the gate runs every suite on the merged tree.
86: 
87: ## Corrections
88: 
89: - **Two `XXX` tests** (`5fdaeab699`), each a defect I measured, home 2:
90:   - `compiler_tests/XXXNumeralCoercionGenericTypeCompiled.test` with `NumeralCoercionGenericTypeCompiledLink.test`: a numeral at a program's own generic type is one object per site (P-174); the rung's once-per-site call takes only a coercion without static arguments into a type without them (`CodeGen.java:7189-7204`, `numeralCoercionSiteDesc`), so `site(): Gen[\String\] = 3` calls the coercion at each evaluation. row 957 in record.md. Seen through the harness on the fix: "REACHED / FAIL:  two evaluations of one site are one object / Saw expected failure (Exit code != 0)"; with `Gen`'s static parameter removed for one run, then restored (`junit.sh xxxred ...`): "REACHED / PASS / Did not see expected failure / Tests run: 2,  Failures: 1".
91:   - `tests/XXXZZOneGetterWalk.fss`: under walk `ZZ`'s `zero` and `one` answer `ZZ` values (P-173: a numeral converts into the type its place fixes); the fold makes their bodies the numeral `0`, which walk returns unconverted (row 387). `harness-one.sh` on the fix (06:32:37): "FAIL: ZZ's zero is a ZZ / OK Saw expected exception"; with `big(0)` and `big(1)` in place of the getters for one run, then restored: "FAILURES!!! / Tests run: 1,  Failures: 1"; on the old code (`FORTRESS_HOME=/home/user/fortress-base29 .../harness-one.sh`, 06:33:12) as written: "FAILURES!!! / Tests run: 1,  Failures: 1", so the base answers `ZZ`: the regression is the fold's.
92: - **`NumeralFoldJUTest.java`'s comments** cut to one line (`5c68eb91ac`); its run above.
93: - **record.md and REPORT.md** (`61abbd8d7f`): NEW-F-1 is row 318's defect, whose stubs `CompilerBuiltin.fss:896-928` it names, and row 318's reproducer was `none`: record.md gives row 318's whole new line with `XXXNumeralDivByZeroCompiled.test` as its reproducer in place of a new row; row 387's whole new line (the library case), and row 957, each linted by `python3 explorations/coordinator/tools/ledger.py check --rows tmp/rung-literal-fold/skeptic/rows.txt` ("only the number rule fails", for row 957); findings 9 and 10, a question for the curator; the report's account of the rounding helpers and its 200,000-decimal probe, which lay in the normal range; the walk answers the fold changes in walk's library and two more; the homes of the defects I measured; two sentences of the skill made false (`SKILL.md:77` with its phase list, `references/interpreter.md:25`); the CodeGen citations my fix moved.
94: 
95: ## Where I differ from the worker
96: 
97: None of its decisions. Its account of its own ledger search ("No baseline error names the fold"; the rows it wrote) missed row 318, which holds NEW-F-1's defect; and its probe of the rounding helpers sampled only the normal range.
98: 
99: ## Failure modes
100: 
101: Loud failures that become values, each by the decided design: `2147483647 + 1`, `2^40` and `65536 DOT 65536` under walk, from `IntegerOverflow` to the `ZZ64` value (P-173); `3 CHOOSE 5` compiled, from a `CompilerError` to 0 (row 954, the specification's zero rule); `12 || 34` under walk, from a failed dispatch to `1234` (fork F4). A loud failure that changes its form: under walk `a: ZZ32 = 2147483647 + 1` stops with "RHS expression type Long is not assignable to LHS type ZZ32", which no `catch IntegerOverflow` takes, where it raised `IntegerOverflow` (P-173 refuses it statically; rung C's checker and rung N's walk). A program's coercion that raises now fails the component class's load instead of the site's evaluation (fork F5). One quiet change of value, not by design: under walk `big(5).one LSHIFT 40` is `0` where it was `1099511627776` (row 387, `XXXZZOneGetterWalk`); rung N's contested fix `953d050966`, a numeral at a declared return type converted there, repairs it on the merged tree if it is kept.
```

### Rung T: explorations/compile-ladder/rung-literals-spec

#### explorations/compile-ladder/rung-literals-spec/REPORT.md:1-34
```
1: # Rung T: the specification of the numeral types, their conversion and default, the fold, and a string literal as one object (rung-literals-spec)
2: 
3: - problem: the specification still gave a numeral the type `IntLiteral`, said that walk gives it `ZZ32` until it runs the checker and that numerals are not directly converted, and said nothing of the default, the fold's result or a string literal's identity (`Specification/basic/expressions/literals.tex:132-165` at b430f9f428; `basic/conversions-coercions.tex:74-90`; `basic/inference.tex:183-187`, `:299-317`), against P-173, P-174, P-76, P-172 and P-171 (`explorations/coordinator/CLIMB-BATCH-29.md:613-617`)
4: - spec: `Specification-1.0-frozen/basic/expressions/literals.tex:83-148` (the Working Draft's numeral types and "Numerals are not directly converted"), the governing passage this rung revises; `Specification/basic/expressions/literals.tex:98-235` after the change
5: - precedent: the revision form of Appendix I's latest entry, "The conversions between the integer types" (`Specification/appendices/changes.tex:4890-4961` at b430f9f428), and climb batch 28's rung V, whose specification change put its reasoning in its report and wrote no decision record (`explorations/compile-ladder/rung-integer-conversions/REPORT.md:1`)
6: - deviation: no `decision-record.md` (`fortress-repo`'s `specification.md`, part 4): the brief's section asks for none and allows nothing else under `explorations/`, so this report holds the full reasoning, and the new entries cite it (`Specification/appendices/changes.tex:5123-5126`)
7: - deviation: the section title "A Numeral Whose Conversions Tie" is kept over a section now wider than ties, since ledger rows and rung N's fork N6 cite it by title (`Specification/basic/inference.tex:302`)
8: - historical: `Specification/advanced-lib/binary.tex`, `Specification/appendices/changes.tex`, `Specification/basic-lib/numbers.tex`, `Specification/basic/conversions-coercions.tex`, `Specification/basic/expressions/constant.tex`, `Specification/basic/expressions/literals.tex`, `Specification/basic/inference.tex`, `Specification/basic/objects.tex`, `Specification/basic/trait-parameters.tex` (each present at `a874948ac`; `Specification/basic/expressions/literals.tex:1`)
9: 
10: Commit on `wip/rung-literals-spec`: fcf9b18219 (the specification, 9 files, +844 −106). The worktree was seeded by `seed-worktree.sh` (exit 0, 3 s).
11: 
12: ## What changed and why
13: 
14: The decided design (P-173, P-174, P-76, P-172, P-171, P-165, P-40) is written into the specification in the revision form (P-96), with two new Appendix I entries and four revised. T writes the decided design, not the rungs' code (fork T3); the rungs' forks whose behaviour the text states are N1-N12, C1-C8, F1-F8 and S1-S2 (`CLIMB-BATCH-29.md:347-395`).
15: 
16: Passage by passage (the full reasoning P-96 asks for; each original is quoted in the entry named):
17: 
18: 1. **A string literal, one object** (`Specification/basic/expressions/literals.tex:72-86`, box `:83` to `revival-string-literals`). New: two literals of one text denote one object; a string built at run time is another object unless the operation answers an existing string; strings stay reference objects; a concatenation of literals is a literal. Reason: P-171. Original: none (the Draft is silent; `Specification-1.0-frozen/basic/expressions/literals.tex:57` stands). Way back: each evaluation constructs a new string.
19: 2. **The numeral types** (`literals.tex:98-118`, `:134-150`, box `:139` to `revival-numerals`). New: `Numeral` comprises `NaturalNumeral` and `RadixPointNumeral`; the four numbers `n`, `m`, `r`, `v` are fields, the getters `digits`, `fractionDigits`, `radix`, `digitValue` (`ZZ32`, `ZZ32`, `ZZ32`, `ZZ`); the explicit-radix types fold into the radix, `Literal[\v\]` into the digit count; the team's two draft notes stand and the box answers them. Reason: P-174, fork N1, N3; the judgement's "Changed in form: `:83-129`" (`reviews/literal-design-judgement-2026-11-08.md:24-29`). Original: `Specification-1.0-frozen/basic/expressions/literals.tex:83-86`, `:104-129`. Way back: static parameters again, which no library can declare.
20: 3. **"Numerals are not directly converted"** (`literals.tex:156-163` rewritten; `:164-171` the Draft's `:141-148` kept as written). New: a numeral is converted where it stands, into the type its place fixes, and not before. Reason: P-173; the judgement keeps `:141-148` and contradicts `:132-141` at places that fix no type. Original: `Specification-1.0-frozen/basic/expressions/literals.tex:132-141`, quoted in `revival-numerals`.
21: 4. **The conversion and the default** (`literals.tex:172-235`, box `:230`, replacing the box `revival-numeral-type` of `:149-165` at b430f9f428). New: each of the eight number types coerces from `NaturalNumeral`, `QQ`, `RR64`, `RR32` from `RadixPointNumeral`, exact or one rounding; a place fixes a type when its declared type declares a coercion from the numeral's type or is a numeral type; the places named; the default `ZZ32`, `ZZ64` or `ZZ` by value, `RR64` with a radix point, at an untyped binding, `Any`, `Object`, `Number`, a type parameter without a bound; out of range or rounding to an infinity a static error (fork C3); the default for a numeral only, never an expression of a numeral type; a program's type through its own coercion, refused without one (no chain, fork C4), seeing the four numbers as written, a negative constant through prefix `-` (fork C6), applied once per place, one object per place; a numeral type written only as a parameter type (fork C2), so `pi` and `e` are `RR64`; inside a coercion's body equal and `SEQV` by `v/r^m` (fork N9). Reason: P-173, P-174, P-76, P-172. Way back: in the `revival-numerals` Rationale.
22: 5. **Static rational expressions** (`literals.tex:239-274`, kept, box `:268`): the fold on both paths, `x = 7/2` a `QQ`, `1/2 = 0.5`, at most one rounding. Reason: P-173, F1, F3.
23: 6. **The constant traits and the fold** (`Specification/basic/expressions/constant.tex:80-110`, box `:101`). The Draft's list of trait groups stands; new paragraph: `library` declares no constant trait; an expression of numerals and operators folds exactly into a signed constant, its forms (F1), its three defaults, the operators left alone (F2). Reason: P-173 and the judgement's repair 3; "Changed in form: `constant.tex:44-74`". Original: `Specification-1.0-frozen/basic/expressions/constant.tex:44-56`, quoted. Way back: constant traits declared with static arguments.
24: 7. **The two concatenations** (`constant.tex:113-133`, boxes `:121` to `revival-string-literals` and `:128` to `revival-numerals`): kept, now built (S1, F4). Original: `Specification-1.0-frozen/basic/expressions/constant.tex:75-82`, which stands.
25: 8. **The coercions of the number types** (`Specification/basic-lib/numbers.tex:40-69`, box `:62`): `QQ`, `RR64`, `RR32` from both numeral types, the integer types from `NaturalNumeral`, exact or one rounding, each with its `=` pair (N8), `asFloat` on both numeral types (P-165, fork N4). The original is the revival's own text (`numbers.tex:43` at b430f9f428), quoted in `revival-numerals`.
26: 9. **The box on integers in floating-point expressions** (`Specification/basic/conversions-coercions.tex:84-88`, inside the box `revival-int-float`): `NaturalNumeral` for `IntLiteral`; the checker against the one library and walk convert an integer numeral at `RR64` whatever its value; the sentence on the prelude stands. Original: the revival's own `conversions-coercions.tex:84-88`, quoted.
27: 10. **The default beside coercion** (`conversions-coercions.tex:105-124`, box `:119`): the default is not a coercion; a numeral is applicable without coercion to a parameter of its default type and to one that fixes no type, its conversion into any other type a coercion, so `h(5)` takes `h(x: ZZ32)` over `h(x: Any)` (C4, P-49); a program's type without the coercion refuses it. The Draft's `conversions-coercions.tex:78-81` stands (the judgement's "Changed in form: `:98-101`").
28: 11. **`id(3)`** (`Specification/basic/inference.tex:183-190`, box `:188`): instantiated at the default `ZZ32`, the result coerced (C1).
29: 12. **The numeral section widened** (`inference.tex:305-350`, box `:345`): the default at every place that fixes no type, the receiver whose member the default declares (C1), the narrowest default for a type parameter that several numerals fix (`pick(3, 3000000000)` at `ZZ64`, `<|3000000000, 0.5|>` a `List[\RR64\]`) and for the branches of an `if` or `case` at an untyped binding, the float tie read `RR64`, `round(2.50000000000000001)` 2 (P-172, N12).
30: 13. **String literal, objects chapter** (`Specification/basic/objects.tex:66-74`, box `:71`): one sentence and a box (P-171).
31: 14. **A `nat` parameter used as a value** (`Specification/basic/trait-parameters.tex:105-113`): the text stands; the box says that a `nat` used as a value is a `ZZ32` (P-40, P-173, C5) and quotes what it contradicts by pointing to the entry (fork T2).
32: 15. **The binary chapter** (`Specification/advanced-lib/binary.tex:925`, `:1146`, `:1752`, `:1781`, `:1907`, `:2143`, `:2172`, `:2348`): eight boxes, one after each typeset group over `NaturalNumeral` (the Draft's `:905-914`, `:1117-1135`, `:1674-1735`, `:1750`, `:1860-1868`, `:2006-2099`, `:2114`, `:2271-2281`); the text stands (fork T2).
33: 16. **Appendix I** (`Specification/appendices/changes.tex`): the new entries `revival-numerals` (`:4983-5333`) and `revival-string-literals` (`:5335-5411`), before "Passages not yet revised"; the entries `revival-numeral-type`, `revival-inference`, `revival-asfloat` and `revival-object-kinds` revised (below). The natives effect (`:4693-4694`, the base's `:4673-4674`) is the gather's (fork 4).
34: 
```

#### explorations/compile-ladder/rung-literals-spec/REPORT.md:111-152
```
111: ## Points to report
112: 
113: - Each passage revised, its callout and entry: the sixteen above, with the boxes at `literals.tex:83`, `:139`, `:230`, `:268`; `constant.tex:101`, `:121`, `:128`; `numbers.tex:62`; `conversions-coercions.tex:119`; `inference.tex:188`, `:345`; `objects.tex:71`; `trait-parameters.tex:105`; `binary.tex:925`, `:1146`, `:1752`, `:1781`, `:1907`, `:2143`, `:2172`, `:2348`; each entry's parts above.
114: - Each sentence of the Working Draft that the design contradicts, quoted:
115:   - `Specification-1.0-frozen/basic/expressions/literals.tex:132-134`: "Numerals are not directly converted to any of the number types because, as in common mathematical usage, we expect them to be polymorphic." (at places that fix no type; with `:135-140`, "converting it immediately to a floating-point number may lose precision").
116:   - `Specification-1.0-frozen/basic/trait-parameters.tex:83-86`: "A \KWD{nat} parameter may be used to instantiate other \KWD{nat} parameters, or to appear in any context that a variable of type \EXP{\mathbb{N}32} can appear, except that it cannot be assigned to."
117:   - `Specification-1.0-frozen/advanced-lib/binary.tex:1620-1621`: "coerce[\nat m,nat radix,nat q,nat k,nat v\](x: NaturalNumeral[\m,radix,v\]) where { radix = 2^q, q DOT m = n DOT 2^bk }", and `:1659-1662`: "opr || [\nat m,nat radix,nat q,nat k,nat v\](self, other: NaturalNumeral[\m,radix,v\]): LinearSequence[\BinaryWord[\b\],n+k\] where { radix = 2^q, q DOT m = k DOT 2^b }" with its mirror; and the same shape at `:839-848`, `:1112-1135`, `:1748-1750`, `:1858-1868`, `:1923`, `:1985-1988`, `:2112-2114`, `:2268-2281`.
118:   - Changed in form, not contradicted: `literals.tex:83-129` (the numeral types), `constant.tex:44-56` (the constant traits), `conversions-coercions.tex:78-81` (coercion only at exactly the type, the default beside it).
119: - The specification's build: both `BUILD SUCCESSFUL` lines (`209`, `20701` of the build log), warnings 0 by the skill's grep, 715 pages.
120: - Each existing entry or box revised, before and after: above.
121: - A file edited beyond those named: none; the nine files are the section's.
122: - A sentence written that the rungs' sections do not support: the inequality, `u ≠ 0` true for a zero `u` of `NN32`, `NN64` or `RR32` and `q ≠ 0.5` true for `q: QQ = 1/2` (`changes.tex:5155-5163`; `changes.tex:3802-3809` for `NN32` and `NN64`). No rung's section states it; it follows by reading from P-173 (a numeral at `Any` takes the default) and `Library/FortressLibrary.fss:98` (`opr =/=(a:Any, b:Any):Boolean = NOT (a=b)`, no pairs), and the walk probes above show the same answers at the base. It replaces the base's sentence "Inequality is not converted", which P-173 makes false.
123: 
124: ## Decisions
125: 
126: 1. **The section title "A Numeral Whose Conversions Tie" kept, its content widened.** Not taken: a new title, such as "The Default of a Numeral". Evidence: ledger rows and `CLIMB-BATCH-29.md:354` (fork N6) cite the title; `specification.md`, "Citing it", asks that a renaming update every citation.
127: 2. **No `decision-record.md`; the reasoning in this report.** Not taken: a decision record (`specification.md`, part 4). Evidence: the brief, "A decision record if your section asks for one. Nothing else under explorations/", and the section asks for none; climb batch 28's V wrote none.
128: 3. **One box after each typeset group over `NaturalNumeral` in the binary chapter, eight in all, in two forms (coercion, `||`) and a combined one.** Not taken: one box per chapter section (three), or one per typeset line (sixteen). Evidence: fork T2 lists `:906-911` and `:1118-1132` apart, and "any other that `grep -n NaturalNumeral` shows typeset".
129: 4. **The literals box `revival-numeral-type` replaced by the box `revival-numerals`, the old entry kept as the record of 29 September with its Change and Effect revised.** Not taken: two boxes at the passage, one per entry; rewriting the old entry whole into the new. Evidence: the brief, "the box revival-numeral-type (:149-165) rewritten"; fork T1 revises that entry "where their Effects become false".
130: 5. **The Draft's text rewritten only in the literals chapter (`:83-140`); elsewhere it stands with a box** (`constant.tex`'s list, `conversions-coercions.tex:98-103`, `trait-parameters.tex:97-104`, the binary chapter). Not taken: rewriting those too. Evidence: the brief's "What you build" and fork T2 ("keep their text").
131: 6. **The Draft's `literals.tex:141-148` kept verbatim, from "Therefore, numerals have their own types".** Not taken: rewriting the whole paragraph. Evidence: the judgement's section 3, "Kept as written: ... `:141-148`".
132: 7. **Only the named files edited; other sentences made false listed for the gather.** Not taken: correcting `ranges.tex:55-58`, `types-vals-vars.tex:572-578`, `revival-index`. Evidence: the brief's step 11 and "Files. `Specification/` only, the chapters named".
133: 8. **The inequality written into the two Effects as the design's answer.** Not taken: keeping "Inequality is not converted", which P-173 makes false; leaving the case out; stating it as a departure with a row. Evidence: `specification.md`, "so that no disagreement between the text and an implementation stays hidden"; the probes; P-173's places. It goes to the curator as a question and to the record as row 966.
134: 9. **`RadixPointNumeral`'s `asFloat` stated without a dated decision** ("declares asFloat as the number types and the other numeral type do", `numbers.tex:68-69`), and the numeral concatenation "built as written" (`constant.tex:128-133`). Not taken: attributing them to the decision of 8 November. Evidence: fork N4 is point 3's default, a reading of P-165's list (`CLIMB-BATCH-29.md:288`), and fork F4 point 2's default (`:286`), neither a POSITIONS sentence.
135: 10. **The dates.** 8 November 2026 for P-171, P-173 and P-174 (`POSITIONS-history.md`, the entries of 2026-11-08), and 28 September 2026 for a `nat` value converting to `ZZ32` (`changes.tex:2124-2128`, the revival's own record of it). Not taken: no dates, which every other entry gives.
136: 11. **The `revival-int-float` box says "the compiled type checker, against the library, and the interpreter"**, not "both implementations". Evidence: the box's own last sentence, that the compiled path's own library declares no coercion into `RR64` from an integer numeral (`conversions-coercions.tex:89-91`).
137: 12. **The new entries placed at the end of the revival section, before "Passages not yet revised".** Not taken: beside `revival-numeral-type`. Evidence: the latest entries are appended there (`changes.tex:4742`, `:4816`, `:4890` at b430f9f428).
138: 13. **Examples chosen from the batch's tests and the judgement's appendix** (`x = 3`, `bigN`, `Cell(3)`, `q: QQ = 0.1`, `deadc_16`, `7/2`, `0.1 + 0.2 = 0.3`, `2147483647 + 1`, `round(2.50000000000000001)`, `h(5)`), and `007` for the digit count with leading zeros. Not taken: the Draft's `6.0221415 × 10^23` as a folded example, since F's fold list names `^` and multiplication without saying `×` at a power (`CLIMB-BATCH-29.md:516`).
139: 
140: ## Defects, each with its home
141: 
142: - `u =/= 0` true for a zero `u` of `NN32`, `NN64` or `RR32`, and `q =/= 0.5` true for `q: QQ = 1/2`, under walk at the base and on both paths by P-173. Home 3: the question is open (the decided text gives `true`, against the `=` pairs' `true` for `u = 0`), so a test of today's answer and a row; this rung may not edit tests, so the row 966 with reproducer `none` and the probe's output in its notes; the rung that next works there (the gather's repair or the names batch) writes the test.
143: 
144: ## For FACTS
145: 
146: - **The specification states the decided numeral design.** `Specification/basic/expressions/literals.tex:98-235` gives the numeral types with their four numbers as fields, the conversion where a place fixes a type and the default elsewhere; `inference.tex:305-350` the default's places, the narrowest default and the float tie; `constant.tex:80-110` the fold; Appendix I's `revival-numerals` and `revival-string-literals` (`changes.tex:4993-5459`). Test: the specification's build, `ant genSource` and `ant tex`, 0 warnings. Detail: this report, "What changed and why".
147: - **The library's `=/=` over `Any` meets a numeral at its default.** Under walk at b430f9f428, `u =/= 0` is `true` for zero `u` of `NN32`, `NN64` and `RR32`, and `q =/= 0.5` for `q: QQ = 1/2`, since `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) has no pairs; P-173 gives the compiled path the same. Command and output: this report, "Programs run, old against new". Row row 966.
148: 
149: ## Commands
150: 
151: None worked out beyond the skill's: the build is `specification.md`'s.
152: 
```

#### explorations/compile-ladder/rung-literals-spec/SKEPTIC.md:49-82
```
49: ## Findings and fixes
50: 
51: 1. **Contested (`1184add1d9`). The Effects stated a departure as the design's answer.** `revival-numerals` (`changes.tex:5143-5150` at `fcf9b18219`) and `revival-numeral-type` (`:3796-3802`) said that the top-level `≠` gives `u ≠ 0` `true` for a zero `u` of `NN32`, `NN64` or `RR32`, and `q ≠ 0.5` `true` for `q: QQ = 1/2`, though the pairs make `u = 0` and `q = 0.5` `true`. The specification settles it the other way: "The expression \EXP{e \neq e'} is semantically equivalent to the expression \EXP{\neg(e = e')}" (`Specification/basic/operators/opr-overview.tex:272-273`), and "The infix operator \EXP{\neq} applies \EXP{\neg} to the result of \EXP{=} on the same operands" (`Specification/basic-lib/Fortress.NegatedOperators.tex:46-47`, `operator-NE`, which `numbers.tex:404` names for `≠` on the number types). The compiled path at the base answers `u =/= 0` `false` (above), through the prelude's `opr =/=(self, other: NN32)` and the like on each integer type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:230`, `:300`, `:360`). So the library's `opr =/=(a:Any, b:Any) = NOT (a=b)` (`Library/FortressLibrary.fss:98`) departs; rung N adds no `=/=` (its `Library/FortressLibrary.fss` has only `:98` and `QQ`'s own `:590`). The ways: (a) keep the text, the worker's; (b) name the departure in both Effects with its row and a home-2 `XXX` test; (c) repair the library, which is N's declaration space and outside this rung. I took (b): both Effects now name it (`changes.tex:3802-3803`, `:5144-5156`), the second also saying that the prelude answers `false`; `ProjectFortress/tests/XXXNotEqualNumeral.fss` asserts the specification's answer; row 966 in `record.md` is rewritten as `NEGATIVE-VERIFIED`, `implementation gap (library)`, with the test as its reproducer and 807 as its sibling, and the record's finding 3 and its FACTS line say the same (they had the compiled path "at Any" reaching "the = pair"; it reaches the prelude's per-type `=/=`). The test through the harness on the old code:
52: 
53:        FORTRESS_HOME=/home/user/fortress-base29 .../rung-inference-walk/harness-one.sh .../tmp/old-harness .../ProjectFortress/tests/XXXNotEqualNumeral.fss
54:        FAIL: opr-overview.tex, the sentence on e =/= e' that closes subsection "GCD, LCM, and CHOOSE Operators": e =/= e' is NOT (e = e'), and numbers.tex, section "Rational Numbers": a zero NN32 = 0
55:         OK Saw expected exception
56:        OK (1 test)
57: 
58:    on the head (`explorations/compile-ladder/rung-inference-walk/harness-one.sh tmp/h-head ProjectFortress/tests/XXXNotEqualNumeral.fss`): ' OK Saw expected exception', 'OK (1 test)'; and changed for one run to assert the departure (`assert(u =/= 0, ...)` and the like, a copy under `tmp/`), red: 'PASS', ' Missing expected failure ', 'Tests run: 1,  Failures: 1,  Errors: 0'. It fails on the merged tree too, where `u = 0` is `true` by N's pairs and `u =/= 0` stays `true`.
59:    - *The worker's argument* (REPORT.md, "Decisions", 8): the inequality written into the two Effects as the design's answer, since P-173 converts a numeral at `Any` into its default and the library's `=/=` has no pairs; "Not taken: ... stating it as a departure with a row. Evidence: `specification.md`, 'so that no disagreement between the text and an implementation stays hidden'; the probes; P-173's places"; and the question to the curator, ways (a) to (c).
60:    - *Mine*: the disagreement the worker exposes is one between the library and the specification's own `≠`, which no decision changes; P-173 says where a numeral converts, not that `≠` stops being `¬(=)`. `specification.md`, "Changing the text": "The effect names each departure ... with its ledger row." The prelude, the team's later word, declares `=/=` per type and answers `false`. It is contested by the brief's rule (a): the worker argued for the text I changed.
61: 
62: 2. **Settled (`8a2b7ae816`). `revival-string-literals`' Effect said both paths answered `"ab" SEQV "ab"` `false`.** The compiled program answers `true` at the base, by text (above; row 908), and only the helper the one library binds answered `false` (row 945's probe). The sentence now says so (`changes.tex:5386-5388`), beside the Effect's own sentence on row 908. Settled by `specification.md`, "Then the text claims no more than holds", and the run above. No test: prose; the build below.
63: 
64: 3. **Settled (`11e753f17c`). "two places yield two objects"** (`literals.tex:221-222` at `fcf9b18219`). P-174 gives "one object per site", the coercion called once for each site; two sites' results are two objects only if the coercion makes new ones, and two string literals of one text, the sentence's own comparison, are one object (P-171). Now "each place has its own application of the coercion" (`literals.tex:222`). Settled by P-174's sentence and fork F5 ("each evaluation of the site reads the result, one object per site", `CLIMB-BATCH-29.md:379`).
65: 
66: 4. **Settled (`4fe2cb1ab3`). The signed constant's kind by value.** `constant.tex:81-91` at `fcf9b18219` listed "an integer" first, so `0.5 + 0.5` read both as an integer (default `ZZ32`) and as "a constant computed from a numeral with a radix point" (default `RR64`), and `6/3` as an integer. P-173: the constant "defaults as an integer numeral, as a `QQ` for a quotient, or as an `RR64` with a radix point"; fork F1 writes "a result of operands among which one has a radix point" as a radix-point numeral (`CLIMB-BATCH-29.md:375`); rung F's fold joins its `Kind` over the operands (`ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:56`, `:158`, `:163-167`, `:200-206` on `wip/rung-literal-fold`). The text now gives the kind by the operands, with `6/3` a `QQ` and `0.5 + 0.5` an `RR64` (`constant.tex:81-97`). Settled by P-173's sentence.
67: 
68: The specification's build after my last edit, `( cd Specification/fortress && ./ant genSource && ./ant tex )` under `nohup nice -n 19`:
69: 
70:     209:BUILD SUCCESSFUL
71:     20734:BUILD SUCCESSFUL
72:     20736:EXIT=0
73: 
74: The skill's warning grep on `fortress.log` printed `0`, `grep -c '^! [A-Z]'` `0`, "Output written on fortress.pdf (715 pages, 2474886 bytes)"; the departure prints as "departs from Section 34.1.4, by which ̸= applies ¬ to the result of = on the same operands". The build's files were removed with `git clean -fXq -- Specification`. No suite: my fix adds a walk test and edits no Java or Scala.
75: 
76: ## Where I differ from the worker's account, unchanged in REPORT.md
77: 
78: - Decision 8 and question 1: above.
79: - Question 2 says "The revised text names only the decided places". It does not: "Where nothing fixes a type" (`literals.tex:191`) is the complement of the places that fix one, and `conversions-coercions.tex:105-108` says the default "applies where coercion does not: where the declared type is a supertype of the default", so `f(3)` at `Index` takes `ZZ32`. That is way (a), and it is on record: the judgement's repair 1, "every other type, and no type, takes the default" (`explorations/reviews/literal-design-judgement-2026-11-08.md:9`), which P-173's headline keeps ("where nothing fixes one, into the machine default"), and rung C built it (`defaultFits`, `explorations/compile-ladder/rung-numeral-checker/REPORT.md:21`, `:130` on its branch). I left the text, which agrees with the record; `revival-index` (`changes.tex:4436-4439` now) is the worker's listed sentence for the gather.
80: - The box at `literals.tex:139` and the Change of `revival-numerals` say the explicit-radix types "fold into the radix, and \TYP{Literal} into the digit count"; P-174 and the judgement say all three "fold into the radix field". The worker's wording is the clearer account of where `Literal`'s fact (no leading zeros) goes, so I left it; it is a sentence the decision does not state in its words, listed as a point.
81: - The defect's home: 2, not 3; and the compiled path at the base answers `u =/= 0` `false`, so "on both paths by P-173" holds only after the switch-over.
82: 
```

#### explorations/compile-ladder/rung-literals-spec/JUDGE.md:1-56
```
1: # Judge's ruling on rung T (rung-literals-spec): the contested fix
2: 
3: Head judged: `a3a982814f` (the skeptic's verdict on `1184add1d9`). One fix was contested, `1184add1d9`, by rule (a) of the skeptic's brief: the worker's report argued for the behaviour the fix changes (REPORT.md, "Decisions", 8, and "Questions for the curator", 1). I built nothing and ran nothing; every point below is a line of the tree or of the record.
4: 
5: ## The fix
6: 
7: `1184add1d9` rewrites two sentences of Appendix I and adds one test:
8: 
9: - `revival-numerals`' Effect (`Specification/appendices/changes.tex:5144-5156`) and `revival-numeral-type`'s (`:3796-3803`) no longer state, as the design's answer, that `u ≠ 0` is `true` for a zero `u` of `NN32`, `NN64` or `RR32` and `q ≠ 0.5` is `true` for `q: QQ = 1/2`. They state it as a departure of the library's top-level `≠` from `operator-NE`, with its row (row 966 in `record.md`, rewritten from CONTESTED, design limit, to NEGATIVE-VERIFIED, implementation gap), and add that the compiled path's own library answers `false`.
10: - `ProjectFortress/tests/XXXNotEqualNumeral.fss`, a home-2 expected failure that asserts the specification's answer, `NOT (u =/= 0)` and its three siblings.
11: 
12: ## Ruling: upheld
13: 
14: **The specification settles the answer, and no decision on record changes it.**
15: 
16: - "The expression \EXP{e \neq e'} is semantically equivalent to the expression \EXP{\neg(e = e')}" (`Specification/basic/operators/opr-overview.tex:272-273`; the Working Draft of February 2011, `Specification-1.0-frozen/basic/operators/opr-overview.tex:262`). "The infix operator \EXP{\neq} applies \EXP{\neg} to the result of \EXP{=} on the same operands" (`Specification/basic-lib/Fortress.NegatedOperators.tex:46-47`, `operator-NE`; the same in the Draft). The number chapters point to it for every number type: `Specification/basic-lib/basic-integers.tex:668` and `numbers.tex:404`, "For \EXP{\neq} \see{operator-NE}."
17: - The rung's own text makes `u = 0` `true` at every number type: "Each type that coerces from a numeral type declares \EXP{=} with it ... so that \EXP{u = 0} is \VAR{true} for a zero \VAR{u} of any of the eight types" (`Specification/basic-lib/numbers.tex:51-54`), as P-173 keeps the pairs ("The library's `=` pairs over the numeral types stay") and P-172 gives `1/2 = 0.5` `true`. With `operator-NE` standing, the text must then give `u ≠ 0` `false`. The worker's Effects gave it `true` with no word of `operator-NE`, so the specification contradicted itself in two places that no callout linked.
18: - P-173 says where a numeral converts: "`Any`, `Object`, `Number`, an unbounded type parameter and no declared type take the default." It says nothing of `≠`; neither do P-165, P-168 or P-174. The `true` is what P-173 makes of one library declaration, `opr =/=(a:Any, b:Any):Boolean = NOT (a=b)` (`Library/FortressLibrary.fss:98`), which receives the numeral at `Any`, defaults it, and so does not apply `=` "on the same operands". That is the library departing from `operator-NE`, not the design revising it. Stating it as the design's answer is a sentence the decided design does not state, the section's one reserved point ("Reserved points. A sentence the decided design does not state."), which the worker itself listed (REPORT.md, "Points to report": "A sentence written that the rungs' sections do not support: the inequality").
19: - POSITIONS P-25: "`Specification/` stays the standard". Where the text and an implementation disagree and a source settles which side is right, the other side is the departure, named in the entry's effect with its ledger row (`fortress-repo`, `specification.md`, "Changing the text: the revision form", part 1: "The effect names each departure ... with its ledger row"; "When the text and an implementation disagree").
20: 
21: **The home is 2, as the skeptic says.** `tests-writing.md`, "How a defect is recorded": home 2 is a deferred defect "the specification settles", with "a gated `XXX` test that asserts the specification's answer"; home 3 is for one where "the specification is silent or a conflict leaves it open". It is not silent (above).
22: 
23: **The precedent is exact.** Row 807 is the same defect of the same declaration at another argument: "the library's `=/=` ... compare[s] by identity two values whose own `=` no `FortressLibrary` trait declares: ... `P(1) = P(1)` and `P(1) =/= P(1)` are both `true`", NEGATIVE-VERIFIED, implementation gap (library), cited to `basic/operators/opr-overview.tex`, "GCD, LCM, and CHOOSE Operators", with `ProjectFortress/tests/XXXNotEqualOwnEquality.fss` (`explorations/fortress-gap-ledger.md:423`). Climb batch 21 filed it so at its fork 10, "the `=/=` defect filed with its expected failure", landed as taken (`explorations/coordinator/PLAN.md:542`, under "Climb batch 21, listed for his review"). The skeptic's test follows that file's form, its messages citing the same sentence by file and section.
24: 
25: **The path.** `ProjectFortress/tests/` is outside the section's files ("Files. `Specification/` only"). The worker was right that it could not write the test (`tests-writing.md:87`: a brief that does not let you edit there writes the row, and "the change that next works there writes the test"). The skeptic's brief lets it: "A test of a defect you find ... goes in the test folder for its kind ..., whatever the section's list of files says; where that list lacks the folder, the test's path goes in pointsReached". SKEPTIC.md lists it ("Points to report": "A file edited beyond those named: `ProjectFortress/tests/XXXNotEqualNumeral.fss` (mine)"). The same form landed in climb batch 20's rung A ("a file edited beyond those named: `ProjectFortress/tests/XXXArray2SliceAtNonzeroBase.fss` ... the gated home of the defect", `444f370184`). No rung's tree names the file (SKEPTIC.md, "What I checked", 10), and a new test file changes no declaration.
26: 
27: **The test.** It was seen failing through the harness on the base's code and red when changed for one run to assert the departure (SKEPTIC.md, finding 1: "OK Saw expected exception", "OK (1 test)"; then "PASS", "Missing expected failure", "Tests run: 1,  Failures: 1,  Errors: 0"). It stays an expected failure on the merged tree by reading: rung N adds `=` pairs and no `=/=`, so `u =/= 0` still reaches `FortressLibrary.fss:98`, where the numeral defaults to `ZZ32` and `NN32` declares no `=` with `ZZ32`. It keeps the batch's five rules: its operands are typed, it asserts no static argument, no message and no string `SEQV`.
28: 
29: ## Which claims were right
30: 
31: The worker, right:
32: - P-173 converts a numeral at `Any` into its default, and the library's `=/=` is declared at `(Any, Any)` with no pairs (`Library/FortressLibrary.fss:98`); so walk answers `true`, as its probes at the base measured (REPORT.md, "Programs run, old against new").
33: - The base's "Inequality is not converted" (`changes.tex:3779` at `b430f9f428`), which gave the compiled checker's `≠` an unconverted `IntLiteral` that reached the `=` pair, is false under P-173 and had to go.
34: - It could not itself write the test (`tests-writing.md:87`).
35: 
36: The worker, wrong:
37: - That the inequality is "the design's answer". No decision states it, and `opr-overview.tex:272-273` and `operator-NE` state the opposite. Its own evidence, `specification.md`'s "so that no disagreement between the text and an implementation stays hidden", argues for naming the departure, which its text did not: it hid a disagreement between two passages of the text.
38: - Home 3. The specification is not silent (above).
39: 
40: The skeptic, right:
41: - The specification settles it (`opr-overview.tex:272-273`; `Fortress.NegatedOperators.tex:46-47`).
42: - The prelude, until the switch-over, declares `≠` on each integer type (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:230`, `:300`, `:360`), and its compiled run at the base printed "NN32 u = 0: true", "NN32 u =/= 0: false" (SKEPTIC.md, "The programs").
43: - `QQ` already declares `opr =/=(self, other:QQ):Boolean = NOT (self = other)` (`Library/FortressLibrary.fss:583`); row 807 is the sibling.
44: - The library's repair is not this rung's: `FortressLibrary.fss` is N's file and outside T's.
45: 
46: The skeptic, imprecise, without effect on the ruling:
47: - "`numbers.tex:404` names for the number types": that line is in the rationals section; the integers' pointer is `basic-integers.tex:668`. Both point to `operator-NE`, so the claim holds.
48: 
49: ## Decision: stands
50: 
51: No revert. The rung lands as the branch holds it at `a3a982814f`, with this file.
52: 
53: ## For the gather
54: 
55: 1. `changes.tex:5152` cites "row~NEW-T-1 of the revival's gap ledger". When the gather files NEW-T-1 (row 966) with `ledger.py add`, it replaces that placeholder in Appendix I too, as climb batch 23's gather did for NEW-W-1 to NEW-W-3 ("their placeholders replaced in Appendix I and the rung's files", `640acb4a17`).
56: 2. row 966's notes (`record.md:23`) give two fixes: "a `=/=` beside each `=` pair, or `=/=` on each number type as `NOT (self = other)`". By the text, the second, with an operand of the number type, is not chosen for `u =/= 0` while `=/=(a:Any, b:Any)` stands. A numeral is applicable without coercion only "to a parameter of its default type and to a parameter of a type that fixes no type for it", and any other conversion is a coercion (`Specification/basic/conversions-coercions.tex:108-111`). A call takes a declaration applicable without coercion before it considers coercion (`:496-499`). `QQ`'s own `=/=` (`FortressLibrary.fss:583`) did not change walk's `q =/= 0.5` at the base (REPORT.md, "Programs run, old against new": "QQ q =/= 0.5: true"), which agrees with this. So the row's second way should name a numeral-type operand, or a change of the `Any` declaration. The rung that repairs row 966 measures it. This is a note in a row, not the specification's text, so it holds no landing.
```

## 2.3 Batch result: /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch29/result.json (python3 -I script; each item whole, index is the list position)

### rungs[].worker.decisions, all six rungs (N, C, F, G, S, T), every item whole

#### rungs[N] rung-numeral-types worker.decisions
- [0] Walk's numeral is its default (a subclass of FInt, FLong, FBigNum or FFloat) carrying the four numbers, one value per site, and every store keeps the default alone (Numerals.plain). Not taken: a numeral object at every evaluation (fork N7's way not taken); a reading of the literal node at each place, which dispatch cannot do since it receives values. Evidence: walk suite on d541ae9682, only rung G's test fails.
- [1] Into the eight number types walk converts through the library's own coercion from the numeral type, called with the numeral object and kept per site and type (Coercions.java:88-115, Numerals.converted), with Java range checks for the integer types first so an out-of-range numeral is refused with walk's binding message. Not taken: fork N7's Java conversion per type. Evidence: same value by construction; NumeralOutOfRangeWalk 'Type mismatch binding 3000000000'. A deviation from the fork's default, reversible.
- [2] Dispatch: own-type fit or default fit as is, the defaults' best unless the own-type fit lies strictly below it, then the coercion attempt from the numeral's own type only, and a retry at the defaults only on an ambiguous coercion (OverloadedFunction.java:2295-2342). Not taken: retrying at the defaults whenever nothing applies (a chain, which C4 refuses; NumeralNoCoercionRefusedWalk); always preferring the own-type fit (a Fortress object for every x = 0).
- [3] The three dispatch caches key a numeral as (Bottom, its default's type, its numeral type) (Numerals.keys). Not taken: a separate cache; no cache for numeral calls.
- [4] Inference hook at the head of inferAndInstantiateGenericFunction: numerals at their defaults, and beside a radix point an integer numeral beyond ZZ32 read by a ZZ32 stand-in so walk's promotion gives RR64. Not taken (my first version): every numeral of the group as an RR64 value, under which walk inferred the object Float and the team's commonSuper failed.
- [5] Return conversion at a declared return type in FunctionClosure and MethodClosure; elsewhere the default. Not taken: bindings and fields only.
- [6] Helper pair numeralToDouble/numeralToFloat(BigInteger v, int r, int m) in simpleDoubleArith; RR32's binding numeralRR32 in FortressBuiltin beside RR32, RR64's numeralRR64 in FortressLibrary. Not taken: a new helper class; QQ's asFloat (up to three roundings, fork N5).
- [7] NaturalNumeral declares only fork N3's four numbers, asString, asFloat and its pairs; not IntLiteral's asZZ32, asZZ64, asNN32, asNN64, zero, one; the coercions read digitValue's checked getters.
- [8] RadixPointNumeral's four numbers come from its written text where they agree with the node's value. Not taken: the node's fields, which drop trailing zeros (Dec(3.14150) read 31415).
- [9] Numeral objects compare by reduced value across both numeral types (FOrdinaryObject.java:48-49). Not taken: within one numeral type only. Evidence: P-168 names 'two values of a numeral type'.
- [10] The checker's float tie rule written inside isNumeral and numeralReading with no new function. Not taken: the prototype's isLiteralType helper, which rung C may add beside them.
- [11] strToFloat's powers of ten given a ZZ32 base (FortressLibrary.fss:4839-4840). Not taken: leaving the count's two errors there for rung C's narrow step 5 on the merged tree. Evidence: count #total 2 at :4839 on d541ae9682, 0 on e3adeedb64.
- [12] RR32SiblingRungV.fss:50, :52, :55 respelled to RR32 (the numeral now converts into RR32, whose operator is the more specific), and its :51 2.5 + a moved into XXXNumeralLeftOfRR32Walk. Not taken: asserting walk's RR64 for 2.5 + a, a known departure (NEW-N-1).
- [13] No profile for P-148's second pass: one equivalence added per isNumeral call, count 118 s against the base's 122 s. Not taken: a JFR profile.
- [14] My ladder subset is the eight pass-list programs that write a radix-point numeral, since no recorded first error names a touched name. Not taken: an empty subset.
- [15] ReflectiveQuickCheck.fss's second IntLiteral arm (:157 at the base) dropped. Not taken: respelled ZZ32, a repeat of the arm above it.
- [16] IntLiteralTextWalk renamed ZZ32BigEndsWalk with its two big assertions kept; ReflectiveNumberTypes.fss:12 and IntegerPowerContractWalk's numeralType() dropped with the object. Not taken: keeping names and assertions about a removed object.

#### rungs[C] rung-numeral-checker worker.decisions
- [0] The default recognised by the coercion's form (NumeralConversion.isDefault, CoercionOracle.scala:432): a TraitCoercionInvocation of a numeral node into the library type of its default's name ranks as no coercion. Not taken: the prototype's identity table LiteralDefaults (literal-default.patch:1137-1166), which keeps nodes for the JVM's life and misses copies; a flag on the node, which the AST lacks.
- [1] The written-only rule allows a parameter's whole type only (TypeWellFormedChecker.scala:293), an object's value parameter counted a field. Not taken: the prototype's refusal everywhere, which P-174's coercions from the numeral types contradict; the rule over inferred types (fork C2 declines); a numeral type anywhere inside a parameter's type, which writes a static argument.
- [2] The default also where a place's type declares no coercion from the numeral's type but holds its default (defaultFits), so fi(3) passes at Index. Not taken: the default only at Any, Object, Number (the prototype's). Evidence: the judgement's repair 1, 'every other type, and no type, takes the default'.
- [3] Joins and tuples at an untyped binding: a tuple's elements each, an all-numeral if/case/block join's branches together at their narrowest default. Not taken: the prototype's coercion of the whole join; each branch at its own default (repair 4 declines). Evidence: fork C1.
- [4] The range refusal as no coercion (CoercionOracle.scala:172), with its message at typed places and beside a call no candidate fits. Not taken: a coercion built and an error signalled, which would refuse z MAX 3000000000 instead of choosing ZZ64's MAX; the message only at typed places. Evidence: fork C3; NumeralBeyondWidthMax's assertion.
- [5] A declaration that only the default at a parameter of its default type makes applicable, and whose size stays unknown, is checked without the default (Functionals.scala:288-292): ee(5) statically chooses ee(x: Any) and the run gives 1 by the compiled dispatch. Not taken: the static choice ee[\nat n\], which P-40's unfixed-size rule refuses ('Could not infer static argument nat n without context.', the first build); the default not ranked as no coercion at a generic's parameter, which leaves gg(5, w) at the plain declaration. No decision covers where P-40 and fork C4 meet: forCurator 1.
- [6] The message 'IntLiteral cannot be written in a program except as a parameter's type.' for both names. Not taken: the prototype's text, now false.
- [7] C6 (a negative numeral at a program's type as prefix - on the natural numeral's coercion) not built; recorded as NEW-C-1 with XXXNegativeNumeralOwnType. The fold makes -3 one IntLiteralExpr before the checker and keeps no reference to the prefix operator (IntegerLiteralFoldingVisitor.java:148-153). Not taken: a fresh operator reference built in the checker, which the disambiguator's binding does not reach; refusing every negative numeral at a program's type, which refuses types that declare -.
- [8] Refusal tests in the team's form: an XXX-named .test over a plain component (precedent XXXBoundCheckSameNameTwoScopes.test), since a plain compiled test is red on any compile error. Not taken: a plain-named .test, which the harness cannot make green on a refusal.
- [9] Respellings: the prototype's Boolean arm for the IntLiteral typecase arms (keeps lines); the team tests at ZZ32, the type their comments name; library_tests' pick with its return type elided so it stays IntLiteral; NativeHelperFamilyAsFloatCompiled's RR32 infinity by narrowing an RR64; NatRtBigSize's sizes beyond ZZ32 by run-time dispatch on Box's type; NatArithBeyondRun at the row's below-zero case. Not taken: dropping the checks.
- [10] Row 506 rewritten with g4(z, z, z, z, z), four ZZ32 arguments (256 combinations), what still reaches the cap. Not taken: closing the row, since the cap stands.
- [11] Row 362 narrowed to a FloatLiteral value rendered inside a program's coercion (XXXFloatLiteralValuePrint), the claim's programs promoted to NumeralPrintRungR. Not taken: closing the row, since FFloatLiteral.asString still returns null.
- [12] No speed pass: the JFR profile puts the change's functions in under 0.3 % of 8,422 samples. Not taken: a memo of the default's type per trait table, with no gain to show.

#### rungs[F] rung-literal-fold worker.decisions
- [0] A juxtaposition of numerals alone folds as their product. Not taken: leave Juxt nodes as the base and the prototype did (a juxtaposition is a Juxt, not an OpExpr, before the checker). Evidence: Library/FortressLibrary.fsi:603-605 (juxtaposition at ZZ32 beside DOT and TIMES); P-173's numerals alone; otherwise 65536 65536 overflows while 65536 DOT 65536 folds.
- [1] Comparisons, MIN and MAX fold over radix-point and quotient operands too, exactly. Not taken: integers only (the prototype, literal-default.md step 3). Evidence: the brief's operator list; P-173 'folds exactly'. Consequence 0.1 = 0.1000000000000000000001 folds false (put to the curator).
- [2] A folded form needing a prefix minus or a / reuses an operator reference the component writes (pre-pass in forComponent), else the expression is left as written. Not taken: a negative radix-point numeral node (against fork F1 and repair 3); a prefix ref made from the infix minus by changing fixities as ExprFactory.makeInfixOpExpr does (its newOverloadings name the binary declarations, shown by bin/fortress grammar -out); resolving afresh (the fold phase has no disambiguating environment). Gap recorded as NEW-F-2.
- [3] Fold limits: p.0 / d only with p and d exact doubles; a power only where exponent times base bits is at most 65536 (the prototype's guard) and the exponent at most 4096; CHOOSE only where min(k, n-k) <= 4096 and n has at most 64 bits. Not taken: unbounded folds (megabit compile-time constants).
- [4] The base's folds of AND, OR, XOR, prefix NOT, prefix BOXMINUS/DOTMINUS and n DIV 0 into CompilerBuiltin.Infinity are dropped (fork F2). Not taken: keep them. Consequence until the switch-over: NEW-F-1.
- [5] A chain of comparisons folds only when every operand is a numeral and every operator a comparison. Not taken: the base's partial fold, which threw CompilerError at a non-comparison link (IntegerLiteralFoldingVisitor.java:131 at b430f9f428).
- [6] A program's numeral sites are static fields of the component class set in its static initializer, emitted after the declarations. Not taken: the class holding each site (closures and template instantiations have no such initializer; a generic object's instantiations would call once each, more than one object per site); a lazy holder class per site, the code generator's top-level-variable idiom (CodeGen.java:6242-6275 at base), which calls at first evaluation, not at a class's load. Evidence: P-174 'once per class, when the class loads, one object per site'.
- [7] Library components and coercions into library types are not hoisted. Evidence: fork F8 keeps an out-of-range numeral's library coercion call, which raises at the site.
- [8] A harness key run_exits_nonzero in FileTests.TestTest for the raising coercion's test. Not taken: an XXX name on a designed failure; a JUnit test that compiles and loads a program. Precedent: walk's load_exception_contains key.
- [9] Typed operands: typed locals in revival tests; in place (asFloat(5) + 40.0, asFloat(3)) in sequivTest.fss and StrictEquivalenceRuleWalk.fss so rung N's lines 58, 94 and 32 keep their numbers; one added line in Compiled7.Print17.fss. Not taken: leaving tests that fail on this tree and pass on the merged tree.
- [10] ChooseZZ32Walk calls a typed helper chooseZZ32(n, k). Not taken: sixteen typed locals.
- [11] NumeralFoldWalk asserts ZZ64, ZZ32 and QQ by typecase (P-173's defaults), no static argument and no message (the batch's rules 1 and 2). Not taken: asserting static arguments or message text.
- [12] No write to row 362 for the folded-receiver case: the row is at 1,193 of 1,200 characters and rung C rewrites it (fork C7); handed to the gather in record.md. Not taken: a whole new line of row 362 conflicting with C's.
- [13] The ladder subset is the whole baseline pass list (85) plus the 18 microGPT components, since the code generator change reaches every compiled program. Not taken: a subset selected by first-error text (no baseline error names the fold).
- [14] The 52 demos run once after the last code change (tests-running.md for a shared phase). Not taken: leaving them to the gather only.
- [15] Compiled DIV by zero of numerals recorded as an XXX test (home 2, NEW-F-1) rather than repaired in the prelude, which no rung edits (P-37, fork 6).

#### rungs[G] rung-walk-language-types worker.decisions
- [0] Way A, the trait read at inference's three reads (fork G1); not B (instances made at the trait at the four factories, identifies two nameable types, types-vals-vars.tex:51-52), C (Int and ZZ32 instances equal in subtyping), D (FInt.type() the trait; changes every dispatch and native self, against F-74), E (wait for P-12), F (expected type into inference, row 510's repair), G (write the argument). Evidence: the review section 2; CLIMB-BATCH-29.md:386.
- [1] Helper form: a table name -> (trait, declaring component), the trait found as the FTypeTrait of that name among the object's transitive supertypes (LanguageTypes.java:30-41, :62-80). Not the single extends entry (FlatString extends {String, DelegatedIndexed}, Library/FlatString.fss:34; CatString reaches String only through Concatenable, Library/String.fss:33, :75); not a lookup in the library's environment (ties the helper to the library's load); not names alone (would map a program's own FlatString, row 877's case).
- [2] Tuples mapped element by element through FTypeTuple.make (fork G2's 'also inside tuples'); generic instances not mapped inside, so a written Cell[\Int\] stays its own type (way B not taken).
- [3] FloatLiteral not mapped (fork G2): N gives a float numeral its default; Cell(0.5) stays Cell[\FloatLiteral\] on this tree, as the checker gives it (F-57).
- [4] Type text changed at FTraitOrObject.toString (fork G3), not at message sites, not at FType.toString, not by editing values/FObject.getString (outside the rung's files).
- [5] The ilk keeps a string object's own name (ObjectPrims.java:64, getName()), the five numbers at their traits as before; the way not taken, ilk 'String' for the four, breaks team test tests/StringTests.fss:82 ('FlatString', 5a68404fd) and tests/StringPieces.fss:34, :41, :45, :50, :110, and contradicts F-328's string names.
- [6] NativeGlueNonFlatStringWalk.fss:13 respelled 'String' (the glue's new text for a CatString, row 846's home-3 test as it stands); the way not taken, keep 'CatString' by making FObject.getString print the object's name, an edit of values/FObject.java beyond the rung's files.
- [7] EvaluatorBase.java:660 and :766 left reading the class: the brief names three reads; by reading they are reached only where the three already decide or cannot (REPORT, 'Where the fix belongs').
- [8] Fork G3's 'a type a program names keeps its name' read as name and identity (getName, typecase arm Int still matches 3, probe P4), not text: one text per type object, so a written Int prints ZZ32 ('(x:Generator[\ZZ32\]) got arg ArrayList[\ZZ32\]' for the base's LongStringTests on new code). Way not taken: written-ness on each type text, which no type object carries.
- [9] The refused binding's message as its own test with load_exception_contains at top level (walk's refusal is a Java error no catch sees); key '(type ZZ32) to s (type String)' names no class.
- [10] LanguageTypeInstancesWalk asserts the numeral cases the rung section lists (Cell(3), instanceOf Cell[ZZ32] of Cell(3), Just(3), SUM <|1, 2, 3|>, typeOf(3)) beside computed twins, though the batch's first rule asks no test to assert a numeral-built generic's argument under walk: that rule is for rungs that meet G's change (CLIMB-BATCH-29.md:657) and N's default makes such a numeral ZZ32 before inference on the merged tree (fork N7, :355). Way not taken: computed values only, leaving row 364's own example unasserted.
- [11] Rows 717 and 824 narrowed, not closed: the mechanism remains for a program's objects of an extender (probes P6, P7), which the specification settles (comprehensions.tex, 'Comprehensions'); each got a gated XXX test (home 2).
- [12] Row 432 closed with LanguageTypeInstancesWalk where the merged tree passes SUM <|1.5, 2.5|> (N's default), else rewritten with its narrowed line; row 721 closed though filled(0.5) stays plain on this tree (N's float numeral); the brief says both close and this tree measures their integer and computed cases.
- [13] Promoted names by topic: InferredIntegerBindingWalk, ArrayInferredElementVectorWalk, OpenRangeInferredIndexWalk, NestedComprehensionDeclaredTypeWalk, InferredStringStaticArgWalk, PureListStridedSubscriptWalk; no collision in either corpus or ProjectFortress/src/com/sun/fortress/.
- [14] LongStringTests.fss:121 and :141 respelled Generator[ZZ32] (fork G5), each value kept.
- [15] Reflect.java not edited: Reflect$ToString reads ty.toString (Reflect.java:434-437), so the text change reaches it; typeOf still returns the value's own type, so typeOf(3) = theType[ZZ32] stays false (making typeOf answer the trait would be way B's identification).

#### rungs[S] rung-string-literals worker.decisions
- [0] Walk's identity: intern the literal's text with String.intern() in Evaluator.forStringLiteralExpr, and compare the carried Java strings by == in FString.seqv, as P-171 words it. Ways not taken: the review's protoS, a ConcurrentHashMap from text to one FString, with wrapper identity kept (reviews/literals-2026-11-08.md, 6.1); one FString cached on the tree node.
- [1] Compiled identity: way (i), equalityRule.java:62-66 compares two FJavaStrings' carried strings by == and relies on ldc interning (P-171). Way not taken: (ii), an intern table at each literal site in CodeGen.java:5268-5277.
- [2] Where the fold runs: inside PreTypeCheckDesugaringVisitor (PRETYPECHECKDESUGAR), at the end of forOpExpr and in forAmbiguousMultifixOpExpr's plain branch, per fork S1 (42). Ways not taken: IntegerLiteralFoldingVisitor or PhaseOrder.java, which the brief gives to F; a separate visitor class called from PreTypeCheckDesugarer.desugarComponent, which would walk every tree a second time.
- [3] What the fold folds: infix || and its multifix chain, every operand a string literal or a character literal in the BMP, with a string literal among the first two, joined left to right. Ways not taken: 'a' || 'b', which walk refuses on both old and new code ('Failed to find any matching overload, args = ('a','b')'), so a fold would turn a refusal into a value; juxtaposition, which constant.tex:81-85 does not name; folding only with the string first, which would leave 'a' || "bc", a mix that constant.tex:83-84 names.
- [4] A supplementary character is left to the run time. Ways not taken: appendCodePoint, which would give a different text than the unfolded run, since simpleConcatenate.java:20-22 casts to char (found by reading, not measured); copying the cast into the fold.
- [5] The operator is named by the OpRef's original name '||' and its infix or multifix fixity, the way IntegerLiteralFoldingVisitor names operators by text. Way not taken: folding only where every declaration the OpRef lists belongs to a library.
- [6] The folded literal keeps the expression's span, parenthesised flag and type. So a long concatenation of literals is one flat string, not a rope.
- [7] Five revival tests and a compiled guard built their strings by || of literals. They now join a literal with a variable and keep every value they check. Ways not taken: changing their expected values, which would drop their checks of strings built apart; writing CatString(...) out, which needs an import and tests no ||. The brief said the guards would stay 'as they stand', but row 945's notes had predicted that StrictEquivalenceRuleWalk.fss:43, :48, :51 and StrictEquivalenceRuleCompiled.fss:38 would flip.
- [8] The character-first assertions joined the plain tests after the fix and were seen failing on the old code through the harness. Way not taken: a separate test.
- [9] NEW-S-1 is recorded by home 3: an XXX compile test with compile_err_contains plus a new row. The specification's library chapters declare no String || (grep -rn 'opr ||' Specification/basic-lib Specification/library finds only the integer norms). In this corpus a plain test whose compile fails is red (FileTests.java:394-425). Way not taken: leaving the prelude refusal unrecorded because the switch-over ends it.
- [10] Variable names (cdText, dText, ropeTail1, ropeTail2, upperText, digitText) avoid the library getter upper (FortressLibrary.fsi:2437) and rung N's digits. A grep found no competing declaration of any added name.
- [11] The suites ran once on the final code state, de7c4fdd00. After testSystem, only tests changed: the four failing rope tests were respelled and re-run through the harness on old and new code, and the suite was not run a second time.

#### rungs[T] rung-literals-spec worker.decisions
- [0] Kept the section title 'A Numeral Whose Conversions Tie' and its label, widening its content; not taken: a new title such as 'The Default of a Numeral'. Evidence: ledger rows and CLIMB-BATCH-29.md:354 (fork N6) cite the title; specification.md, 'Citing it', asks a renaming to update every citation.
- [1] No decision-record.md; the full reasoning (P-96 part 4) is in REPORT.md, which the new entries cite (changes.tex:5111-5114); not taken: a decision record per specification.md part 4. Evidence: the brief, 'A decision record if your section asks for one. Nothing else under explorations/', and the section asks for none; climb batch 28's rung V wrote none (explorations/compile-ladder/rung-integer-conversions/ holds REPORT.md and SKEPTIC.md).
- [2] One callout after each typeset group over NaturalNumeral in binary.tex, eight in all (binary.tex:925, :1146, :1752, :1781, :1907, :2143, :2172, :2348); not taken: one per chapter section (three) or one per typeset line (sixteen). Evidence: fork T2 lists :906-911 and :1118-1132 apart, plus 'any other that grep -n NaturalNumeral shows typeset'.
- [3] Replaced the literals box revival-numeral-type with the box revival-numerals (literals.tex:230) and kept the old entry as the record of 29 September 2026 with its Change and Effect revised; not taken: two boxes at the passage, or rewriting the old entry whole into the new. Evidence: the brief, 'the box revival-numeral-type (:149-165) rewritten'; fork T1, entries 'revised where their Effects become false'.
- [4] Rewrote the Working Draft's text only in the literals chapter (:83-140) and kept it with boxes elsewhere (constant.tex's trait list, conversions-coercions.tex:98-103, trait-parameters.tex:97-104, binary.tex); not taken: rewriting those. Evidence: the brief's 'What you build' and fork T2, 'keep their text'.
- [5] Kept the Draft's literals.tex:141-148 verbatim from 'Therefore, numerals have their own types'; not taken: rewriting the whole paragraph. Evidence: the judgement's section 3, 'Kept as written: ... :141-148'.
- [6] Edited only the nine named files and listed the other sentences the design makes false for the gather (ranges.tex:55-58, types-vals-vars.tex:572-578, changes.tex:4435-4438, :4693-4694, :2706-2708, :2603-2607, preamble.tex:100-102); not taken: correcting them here. Evidence: the brief's step 11 and 'Files. Specification/ only, the chapters named'.
- [7] Wrote the inequality consequence (u =/= 0 true for a zero NN32, NN64 or RR32 u; q =/= 0.5 true for q: QQ = 1/2) into the Effects of revival-numerals (changes.tex:5143-5150) and revival-numeral-type (:3796-3802); not taken: keeping 'Inequality is not converted', which P-173 makes false; omitting the case; recording it as a departure. Evidence: specification.md, 'so that no disagreement between the text and an implementation stays hidden'; walk probes at the base; P-173's list of places that take the default; Library/FortressLibrary.fss:98.
- [8] Stated RadixPointNumeral's asFloat (numbers.tex:68-69) and the numeral concatenation (constant.tex:128-133) without a dated decision; not taken: attributing them to the decision of 8 November 2026. Evidence: fork N4 is point 3's default reading P-165's list (CLIMB-BATCH-29.md:288), fork F4 point 2's default (:286), neither a POSITIONS sentence.
- [9] Dated the decisions 8 November 2026 (P-171, P-173, P-174; POSITIONS-history.md entries of 2026-11-08) and 28 September 2026 for a nat value converting to ZZ32 (changes.tex:2124-2128); not taken: undated callouts, which no other entry uses.
- [10] Wrote the revival-int-float box as 'the compiled type checker, against the library, and the interpreter convert', not 'both implementations'. Evidence: the box's own last sentence that the compiled path's own library declares no coercion into RR64 from an integer numeral (conversions-coercions.tex:89-91).
- [11] Placed the two new entries at the end of the revival section, before 'Passages not yet revised'; not taken: beside revival-numeral-type. Evidence: the latest entries are appended there (changes.tex:4742, :4816, :4890 at b430f9f428).
- [12] Chose examples from the batch's tests and the judgement's appendix (x = 3, bigN, Cell(3), q: QQ = 0.1, deadc_16, 7/2, 0.1 + 0.2 = 0.3, 2147483647 + 1, round(2.50000000000000001), h(5)) and 007 for leading zeros; not taken: the Draft's 6.0221415 x 10^23 as a folded example, since F's fold list does not name x at a power (CLIMB-BATCH-29.md:516).
- [13] Counted the fourteen coercions between number types on the base's apis and took eleven from the numeral types from fork N8 for revival-asfloat's Effect (changes.tex:2781-2785); not taken: keeping '21', which counted IntLiteral's seven, or stating no count.

### forCurator items: top-level forCurator (46 items), those whose text names a numeral type, asFloat, a coercion from a numeral, or the run time
- forCurator[0] id=N.worker.1 inPlan=True: A numeral base beside a non-numeral exponent, `10^k` for `k: ZZ32`, is ambiguous to the checker once RR32 converts from NaturalNumeral (P-76): RR32's `^(self, b: AnyIntegral)`, NN32's and ZZ32's `^` tie and the numeral tie rule does not apply since the exponent's declared types differ. Should the checker's numeral tie rule cover it, or is rung C's narrow step 5 (fork C4) the intended settlement? Evidence: count on d541ae9682, '#total 2' at Library/FortressLibrary.fss:4839; my rung typed strToFloat's base instead (Library/FortressLibrary.fss:4839-4840).
- forCurator[1] id=N.worker.2 inPlan=True: Fork N7's default said walk converts a numeral into the eight number types 'in walk's Java'; the rung calls the library's own coercion from the numeral type with the numeral object, once per site and type, which gives the same value by construction. Is that acceptable as built? Evidence: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:88-115, Numerals.java (converted).
- forCurator[2] id=N.worker.3 inPlan=True: With RR32 converting from both numeral types, `a + 2.5`, `a + 2` and `a MAX 2.5` for an RR32 `a` now run RR32's operator, where the revival's test asserted RR64's; the rung reads this as P-76's and P-172's consequence (RR32's declaration is the more specific). Evidence: ProjectFortress/tests/RR32SiblingRungV.fss:50, :52, :55.
- forCurator[3] id=N.skeptic.1 inPlan=True: P-168's one exception says 'two values of a numeral type inside a coercion's body are strictly equivalent when their reduced values are equal'. The rung applies it across NaturalNumeral and RadixPointNumeral (worker's decision 10), so 2 and 2.0 inside a body are SEQV; P-168's first rule says values of different types never are. Is the exception within one numeral type, or across both? Evidence: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java:48-49; explorations/coordinator/POSITIONS.md:101.
- forCurator[4] id=N.skeptic.2 inPlan=True: A float numeral beyond the largest finite RR32 or RR64 becomes Infinity at a typed place under walk, with no error: s: RR32 = 340282356779733661637539395458142568448 printed 'Big1 RR32 above max Infinity' (bin/fortress on the rung's build), as simpleDoubleArith.numeralToFloat rounds by IEEE's rule (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:264-307). Is such a numeral 'outside the type's range' under P-173 (explorations/coordinator/POSITIONS.md:104), refused statically and raising under walk as an out-of-range integer numeral does? Or is Infinity its one rounding?
- forCurator[6] id=C.worker.2 inPlan=True: A nat or int size of 2^31 or more read as a value (NEW-C-2) raises java.lang.Error 'Not in range for ZZ32', which no catch sees (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6364; compiler/runtimeValues/FIntLiteral.java:63-71). Ways: a refusal when the class loads; IntegerOverflow; a ZZ64 where the value does not fit, which P-173's 'a nat parameter used as a value is a ZZ32' declines.
- forCurator[7] id=C.skeptic.1 inPlan=True: Question 1 (the worker's): where P-40's unfixed size meets fork C4. The call is ee(5), for ee[\nat n\](x: ZZ32) beside ee(x: Any). The worker built way (a): the static choice is ee(x: Any) and the compiled dispatch runs the sized arm. Evidence: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:288-291; ProjectFortress/compiler_tests/LiteralDefaultCompiled.fss:78.
The skeptic's addition: under (a), a sized arm whose body reads n dies. The head's `ee[\nat n\](e: ZZ32): ZZ32 = n` with ee(5) gives 'java.lang.NumberFormatException: For input string: "n"' where the base answered 2, and walk gives 'undefined variable [n]'. That is row 446's defect, rewritten in explorations/compile-ladder/rung-numeral-checker/record.md.
The ways: (a) as built; (b) refuse ee(5) as P-40 refuses ez(z) for a ZZ32 z ('Could not infer static argument nat n without context.', on both codes), against fork C8's 'ee(5) gives 1' (explorations/coordinator/CLIMB-BATCH-29.md:371); (c) an unused size not counted as unfixed.
- forCurator[8] id=C.skeptic.2 inPlan=True: Question 2 (the worker's): NEW-C-2. A nat or int size of 2^31 or more, read as a value, raises java.lang.Error. Evidence: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6364; compiler/runtimeValues/FIntLiteral.java:63-71.
- forCurator[9] id=C.skeptic.3 inPlan=True: Fork C6's default is not built (NEW-C-1, compiler_tests/XXXNegativeNumeralOwnType). The fork's default (explorations/coordinator/CLIMB-BATCH-29.md:369) has a negative constant reach a program's type as prefix minus on its coercion of the natural numeral. But the fold that makes -3 one node keeps no reference to the prefix operator (ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:148-153), and the fold is rung F's. Ways: F's fold keeps the operator's reference for a numeral at a program's type; the checker builds one; or NEW-C-1 stands until the switch-over.
- forCurator[10] id=C.skeptic.4 inPlan=True: NEW-C-3: a numeral as a typecase's selector keeps IntLiteral (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:660; compiler_tests/XXXNumeralTypecaseSelector.test). P-173 gives it its default, but the default there changes two team tests. In compiler_tests/XXX5r.test the pinned span of the unreachable clauses moves. In compiler_tests/XXXPatternMatchingc.test, `typecase (3, 4) of (x, y: ZZ32)` becomes reachable, and the code generator then stops with 'typcase match failure!' (compiler/codegen/CodeGen.java:2181, NEW-C-4). Ways: build the default with the two team tests respelled and the pattern wall's test kept; or leave it as recorded.
- forCurator[11] id=C.skeptic.5 inPlan=True: The written-only rule as built allows IntLiteral and FloatLiteral as any parameter's whole type (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:48-73). P-174 reads 'written only as a parameter type, of a coercion or an operator' (explorations/coordinator/POSITIONS.md:105), and the batch's rule for tests says 'only as a coercion's parameter type'. The skeptic's respelling of the two prelude-IntLiteral library tests (ProjectFortress/library_tests/IntLiteralArithRung7.fss:36, IntLiteralRung6.fss:42) relies on the broader reading. Ways: keep it; or narrow the rule to coercions and operators, after which those two tests have no way to hold two IntLiteral values at once.
- forCurator[12] id=F.worker.1 inPlan=True: P-174's 'once per class, when the class loads': the rung reads the class as the component's. Its static initializer sets every site's field, whatever class holds the site (a top-level function, an object's method, a closure, a generic template). Read as the class holding the site, a generic object's instantiations would each call the coercion, giving more than one object per site. Evidence: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7155-7220, :1936-2003.
- forCurator[13] id=F.worker.2 inPlan=True: A comparison of radix-point numerals folds exactly, so 0.1 = 0.1000000000000000000001 is false, though the two numerals' RR64 defaults are the same double. P-173 folds numerals alone exactly and does not single out comparisons. Evidence: ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:304-310.
- forCurator[16] id=F.skeptic.1 inPlan=True: A numeral at a program's own generic type (NEW-F-3). For a closed site such as Gen[\String\], the component class could hold its one object, as it does for a type without static arguments. For a site whose type names a type parameter of its declaration, such as m(): Gen[\T\] = 3 in object Box[\T\], is it one object per site, or one per instantiation held by the instantiated class? P-174 names neither. Evidence: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7189-7204; ProjectFortress/compiler_tests/XXXNumeralCoercionGenericTypeCompiled.fss:11.
- forCurator[17] id=F.skeptic.2 inPlan=True: The fold changes walk's library: ZZ's zero and one getters (Library/FortressLibrary.fss:1093-1095) become a ZZ32 under walk on rung F's tree (row 387, ProjectFortress/tests/XXXZZOneGetterWalk.fss). Whether the merged tree repairs it depends on the ruling on rung N's contested fix 953d050966 (a numeral at a declared return type converted there).
- forCurator[18] id=F.skeptic.3 inPlan=True: The worker's question confirmed by my program: an exact comparison of radix-point numerals folds 0.1 = 0.1000000000000000000001 to false, where the base answered true (tmp program FoldEdges.fss; ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:304-310).
- forCurator[21] id=G.worker.3 inPlan=True: The batch rule 'assert no static argument of a generic built from a numeral under walk' (CLIMB-BATCH-29.md:657) against the rung section's own test list: LanguageTypeInstancesWalk asserts Cell(3), Just(3), SUM <|1, 2, 3|> and typeOf(3) (ProjectFortress/tests/LanguageTypeInstancesWalk.fss:22, :26, :28, :30, :34), relying on N's default (fork N7, CLIMB-BATCH-29.md:355) to keep them ZZ32 on the merged tree; if N's tree differs, those lines fail at the gather.
- forCurator[22] id=G.worker.4 inPlan=True: Rows 432 and 721 close on the merged tree only if N's default makes a float numeral an RR64 before inference: on this tree SUM <|1.5, 2.5|> stops 'Failed to find any matching overload, args = (ArrayList[\FloatLiteral\])' and filled(0.5) is a plain array (REPORT.md, probe P5).
- forCurator[26] id=G.skeptic.4 inPlan=True: The worker's questions 2 to 4 stand as it put them: the ilk of the four string objects against P-167 (ObjectPrims.java:64; team test tests/StringTests.fss:82); the numeral assertions of LanguageTypeInstancesWalk.fss:22, :25, :27, :29 and :37 against the batch's first rule (CLIMB-BATCH-29.md:657), which the rung's own test list settles and N's head hook (its REPORT.md:33) keeps ZZ32 on the merged tree by reading; and rows 432 and 721's float halves resting on N.
- forCurator[27] id=S.worker.1 inPlan=True: Does Specification/basic/expressions/constant.tex:83-84, 'One may concatenate mixed string and character literals, producing a string literal', include two character literals, 'a' || 'b'? Neither library declares || on two characters, and walk refuses it at run time on old and new code ('Failed to find any matching overload, args = ('a','b')'). So the fold leaves it (PreTypeCheckDesugaringVisitor.java:229). Folding it would need a declaration, or the specification's word, that the result is a string.
- forCurator[29] id=T.worker.1 inPlan=True: The inequality at a numeral (NEW-T-1): P-173 converts a numeral at Any into its default, so the library's =/= over Any (Library/FortressLibrary.fss:98, 'opr =/=(a:Any, b:Any):Boolean = NOT (a=b)') answers true for u =/= 0 with a zero u of NN32, NN64 or RR32, and for q =/= 0.5 with q: QQ = 1/2, while u = 0 and q = 0.5 are true through the = pairs (P-165, fork N8). Walk at b430f9f428 already answers so ('NN32 u =/= 0: true', 'RR32 r =/= 0: true', 'QQ q =/= 0.5: true'). Ways: (a) keep it, as the text now states (Specification/appendices/changes.tex:5143-5150); (b) declare a =/= pair beside each = pair; (c) declare =/= on each number type as NOT (self = other) so the fallback reaches the pairs.
- forCurator[30] id=T.worker.2 inPlan=True: A numeral at a library type that P-173's lists do not name: P-173 lists the places that fix a type (a coercion from the numeral type, or a numeral type) and those that take the default (Any, Object, Number, an unbounded type parameter, no declared type); P-174 refuses a numeral at 'a program's type' without a coercion. A library trait such as Index (f(3) for f(x: Index)), or a bounded type parameter such as T extends Integral[T] that a numeral alone does not fix, is in neither list; revival-index says the checker refuses f(3) at Index (Specification/appendices/changes.tex:4435-4438). Ways: (a) the default wherever the default type is a subtype of the declared type, Index among them; (b) refused, as a program's type is. The revised text names only the decided places.
- forCurator[31] id=T.skeptic.1 inPlan=True: Inequality at a numeral (the worker's question 1). If the judge keeps 1184add1d9, the specification settles this: e =/= e' is NOT (e = e') (Specification/basic/operators/opr-overview.tex:272-273). The open part is then the library's repair, and that choice belongs to a later library rung, not the curator. The two ways are an =/= beside each = pair, or =/= on each number type as NOT (self = other); QQ already uses the second (Library/FortressLibrary.fss:583), and the prelude declares =/= on each integer type (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:230, :300, :360). If the judge reverts it, the worker's three ways stand.
- forCurator[32] id=T.skeptic.2 inPlan=True: A numeral at Index (the worker's question 2) is narrower than the worker put it. The revised text gives the default at every type that does not fix one: literals.tex:191 'Where nothing fixes a type'; conversions-coercions.tex:105-108 'where the declared type is a supertype of the default'. The worker's report says the text 'names only the decided places', but the text states way (a). The judgement's repair 1, 'every other type, and no type, takes the default' (explorations/reviews/literal-design-judgement-2026-11-08.md:9), supports way (a), and rung C built it ('defaultFits', explorations/compile-ladder/rung-numeral-checker/REPORT.md:21, :130 on wip/rung-numeral-checker). What is left: confirming (a), and revival-index's sentence that the checker refuses f(3) at Index (Specification/appendices/changes.tex:4436-4439), which the gather revises.
- forCurator[34] id=T.judge.2 inPlan=True: For the gather, and the rung that repairs NEW-T-1: the row's notes (explorations/compile-ladder/rung-literals-spec/record.md:23) offer, as the second way, '=/= on each number type as NOT (self = other)'. With an operand of the number type, that declaration is not chosen for u =/= 0 while =/=(a:Any, b:Any) stands. A numeral is applicable without coercion only at its default type or a type that fixes none (Specification/basic/conversions-coercions.tex:108-111), and a call takes a declaration applicable without coercion first (:496-499). QQ's own =/= (Library/FortressLibrary.fss:583) left walk's 'QQ q =/= 0.5: true' at the base (REPORT.md, 'Programs run, old against new'), which agrees. The repair needs a numeral-type operand beside each = pair, or a change to the Any declaration. This is a note in a row and holds no landing.
- forCurator[35] id=T.judge.3 inPlan=True: Point reached, by the skeptic's fix and listed in SKEPTIC.md: a file outside the section's 'Specification/ only', ProjectFortress/tests/XXXNotEqualNumeral.fss, a home-2 expected failure. It is reversible and does not hold the push.
- forCurator[37] id=gather.2 inPlan=True: A text mismatch that no decision settles. Rung T's text says a numeral that rounds to an infinity at its type is a static error (Specification/basic/expressions/literals.tex:189-190), and rung C's checker refuses it (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:476-483). Rung N's walk converts it to Infinity with no error: on the merged tree, wide: RR32 = 340282356779733661637539395458142568448 printed 'Infinity' (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:268-290). The text stands. Walk's departure is filed as row 967, with the gated expected failure ProjectFortress/tests/XXXNumeralRoundsToInfinityWalk.fss, and is named in revival-numerals' Effect (Specification/appendices/changes.tex:5168-5171), all in T's commit 4978a9b16e. It joins N.skeptic.2's question.
- forCurator[38] id=gather.3 inPlan=True: Told: row 338 (walk refused d: ZZ32 = -2147483648) is closed by rung F's commit 955cad76df with test ProjectFortress/tests/NumeralFoldWalk.fss, although F's list of closed rows did not name it. F's fold makes -2147483648 one ZZ32 numeral (NumeralFoldWalk.fss:24-25). On the merged tree the binding printed '338 -2147483648'. Evidence: explorations/compile-ladder/climb-batch-29/RECORD.md:79-90.
- forCurator[39] id=gather.4 inPlan=True: Told: row 20 (a list display of float numerals refused at List[\RR64\] under walk), as G narrowed it, was closed by G's commit 12292add28 with test none. On the merged tree l: List[\RR64\] = <|1.0, 1.0|> binds and SUM <|1.5, 2.5|> printed 4.0, but the batch's first rule for tests forbids asserting a static argument of a generic built from a numeral under walk, so no test was written. Row 432 closes with LanguageTypeInstancesWalk on the same probe. Evidence: explorations/compile-ladder/climb-batch-29/RECORD.md:41-53, :79-90.
- forCurator[40] id=gather.5 inPlan=True: Rung T's text says the Working Draft's Literal[\v\] folds into the digit count (Specification/basic/expressions/literals.tex:149, and revival-numerals' Change). P-174 says the explicit-radix variants and Literal[\v\] fold into the radix field (explorations/coordinator/POSITIONS.md:105). Which wording is meant? Default: T's text, as landed. Walk keeps only one leading zero of a radix-point numeral (row 960).
- forCurator[42] id=review.1 inPlan=True: review.1: under walk, a negative constant at a program's own number type reaches its coercion as NaturalNumeral(1, 10, -3). The cause is rung F's fold in walk's phase order (PhaseOrder.java:130) together with rung N's numeral site (Numerals.java:160-179). The object's asString is '7', and a type without `-` takes the numeral. literals.tex:215-218 makes it prefix `-` on the coercion's result, and Appendix I's Effect names only the compiled half (changes.tex:5194-5196, row 961). Filed as row 968 and joined to PLAN item 75 (C.skeptic.3). The Effect sentence is in blockingCode.
- forCurator[43] id=review.2 inPlan=True: review.2: under walk a nat or int size of 2^31 or more read as a value is a ZZ64 (F-140; on the merged tree `sizeValue[\3000000000\]()` typed ZZ64), which P-173 declines. The revival-numerals Effect (changes.tex:5145-5148, :5196-5198) and the gather's ranges.tex:55-58 box say both implementations give ZZ32. Noted on row 962 and joined to PLAN's C.worker.2/C.skeptic.2 entry. The text's correction is in blockingCode.
- forCurator[44] id=review-routed.1 inPlan=True: review-routed.1 (explorations/coordinator/PLAN.md, 'Climb batch 29, listed for his review'): row 968 (explorations/fortress-gap-ledger.md, section 7) has reproducer none. The next batch that edits walk's numerals or the numeral fold writes the gated expected failure ProjectFortress/tests/XXXNegativeNumeralOwnTypeWalk.fss. It asserts the answer of literals.tex:215-218: a negative constant at a program's type without `-` is refused, and with `-` it reaches the type as `-(coerce(3))`. That test then becomes row 968's reproducer (home 2).
- forCurator[45] id=review-routed.2 inPlan=True: review-routed.2 (PLAN.md, same section): rung F folds a comparison of numerals alone (F-339), so ProjectFortress/tests/NumeralTypesWalk.fss:41-42, `assert(1/2 = 0.5, "1/2 = 0.5 through QQ's = with the float numeral")` and its reverse, become `true` before walk runs. On the merged tree they no longer reach the `=` pairs between QQ and RadixPointNumeral that they name, which is the same vacuity that rung S's skeptic repaired in 91762b1a68. The next batch that edits walk's numerals or the fold respells them with a QQ variable, keeping the values checked. On the merged tree `half: QQ = 1/2` printed 'half = 0.5: true' and '0.5 = half: true'.

### rungs[].worker.forCurator, same filter
- rungs[N].worker.forCurator[0]: A numeral base beside a non-numeral exponent, `10^k` for `k: ZZ32`, is ambiguous to the checker once RR32 converts from NaturalNumeral (P-76): RR32's `^(self, b: AnyIntegral)`, NN32's and ZZ32's `^` tie and the numeral tie rule does not apply since the exponent's declared types differ. Should the checker's numeral tie rule cover it, or is rung C's narrow step 5 (fork C4) the intended settlement? Evidence: count on d541ae9682, '#total 2' at Library/FortressLibrary.fss:4839; my rung typed strToFloat's base instead (Library/FortressLibrary.fss:4839-4840).
- rungs[N].worker.forCurator[1]: Fork N7's default said walk converts a numeral into the eight number types 'in walk's Java'; the rung calls the library's own coercion from the numeral type with the numeral object, once per site and type, which gives the same value by construction. Is that acceptable as built? Evidence: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:88-115, Numerals.java (converted).
- rungs[N].worker.forCurator[2]: With RR32 converting from both numeral types, `a + 2.5`, `a + 2` and `a MAX 2.5` for an RR32 `a` now run RR32's operator, where the revival's test asserted RR64's; the rung reads this as P-76's and P-172's consequence (RR32's declaration is the more specific). Evidence: ProjectFortress/tests/RR32SiblingRungV.fss:50, :52, :55.
- rungs[C].worker.forCurator[1]: A nat or int size of 2^31 or more read as a value (NEW-C-2) raises java.lang.Error 'Not in range for ZZ32', which no catch sees (ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6364; compiler/runtimeValues/FIntLiteral.java:63-71). Ways: a refusal when the class loads; IntegerOverflow; a ZZ64 where the value does not fit, which P-173's 'a nat parameter used as a value is a ZZ32' declines.
- rungs[F].worker.forCurator[0]: P-174's 'once per class, when the class loads': the rung reads the class as the component's. Its static initializer sets every site's field, whatever class holds the site (a top-level function, an object's method, a closure, a generic template). Read as the class holding the site, a generic object's instantiations would each call the coercion, giving more than one object per site. Evidence: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7155-7220, :1936-2003.
- rungs[F].worker.forCurator[1]: A comparison of radix-point numerals folds exactly, so 0.1 = 0.1000000000000000000001 is false, though the two numerals' RR64 defaults are the same double. P-173 folds numerals alone exactly and does not single out comparisons. Evidence: ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:304-310.
- rungs[G].worker.forCurator[2]: The batch rule 'assert no static argument of a generic built from a numeral under walk' (CLIMB-BATCH-29.md:657) against the rung section's own test list: LanguageTypeInstancesWalk asserts Cell(3), Just(3), SUM <|1, 2, 3|> and typeOf(3) (ProjectFortress/tests/LanguageTypeInstancesWalk.fss:22, :26, :28, :30, :34), relying on N's default (fork N7, CLIMB-BATCH-29.md:355) to keep them ZZ32 on the merged tree; if N's tree differs, those lines fail at the gather.
- rungs[G].worker.forCurator[3]: Rows 432 and 721 close on the merged tree only if N's default makes a float numeral an RR64 before inference: on this tree SUM <|1.5, 2.5|> stops 'Failed to find any matching overload, args = (ArrayList[\FloatLiteral\])' and filled(0.5) is a plain array (REPORT.md, probe P5).
- rungs[S].worker.forCurator[0]: Does Specification/basic/expressions/constant.tex:83-84, 'One may concatenate mixed string and character literals, producing a string literal', include two character literals, 'a' || 'b'? Neither library declares || on two characters, and walk refuses it at run time on old and new code ('Failed to find any matching overload, args = ('a','b')'). So the fold leaves it (PreTypeCheckDesugaringVisitor.java:229). Folding it would need a declaration, or the specification's word, that the result is a string.
- rungs[T].worker.forCurator[0]: The inequality at a numeral (NEW-T-1): P-173 converts a numeral at Any into its default, so the library's =/= over Any (Library/FortressLibrary.fss:98, 'opr =/=(a:Any, b:Any):Boolean = NOT (a=b)') answers true for u =/= 0 with a zero u of NN32, NN64 or RR32, and for q =/= 0.5 with q: QQ = 1/2, while u = 0 and q = 0.5 are true through the = pairs (P-165, fork N8). Walk at b430f9f428 already answers so ('NN32 u =/= 0: true', 'RR32 r =/= 0: true', 'QQ q =/= 0.5: true'). Ways: (a) keep it, as the text now states (Specification/appendices/changes.tex:5143-5150); (b) declare a =/= pair beside each = pair; (c) declare =/= on each number type as NOT (self = other) so the fallback reaches the pairs.
- rungs[T].worker.forCurator[1]: A numeral at a library type that P-173's lists do not name: P-173 lists the places that fix a type (a coercion from the numeral type, or a numeral type) and those that take the default (Any, Object, Number, an unbounded type parameter, no declared type); P-174 refuses a numeral at 'a program's type' without a coercion. A library trait such as Index (f(3) for f(x: Index)), or a bounded type parameter such as T extends Integral[T] that a numeral alone does not fix, is in neither list; revival-index says the checker refuses f(3) at Index (Specification/appendices/changes.tex:4435-4438). Ways: (a) the default wherever the default type is a subtype of the declared type, Index among them; (b) refused, as a program's type is. The revised text names only the decided places.

### gather.forCurator, review.forCurator, other forCurator lists, same filter
- gather.forCurator[1]: A text mismatch that no decision settles. Rung T's text says a numeral that rounds to an infinity at its type is a static error (Specification/basic/expressions/literals.tex:189-190), and rung C's checker refuses it (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:476-483). Rung N's walk converts it to Infinity with no error: on the merged tree, wide: RR32 = 340282356779733661637539395458142568448 printed 'Infinity' (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:268-290). The text stands. Walk's departure is filed as row 967, with the gated expected failure ProjectFortress/tests/XXXNumeralRoundsToInfinityWalk.fss, and is named in revival-numerals' Effect (Specification/appendices/changes.tex:5168-5171), all in T's commit 4978a9b16e. It joins N.skeptic.2's question.
- gather.forCurator[2]: Told: row 338 (walk refused d: ZZ32 = -2147483648) is closed by rung F's commit 955cad76df with test ProjectFortress/tests/NumeralFoldWalk.fss, although F's list of closed rows did not name it. F's fold makes -2147483648 one ZZ32 numeral (NumeralFoldWalk.fss:24-25). On the merged tree the binding printed '338 -2147483648'. Evidence: explorations/compile-ladder/climb-batch-29/RECORD.md:79-90.
- gather.forCurator[3]: Told: row 20 (a list display of float numerals refused at List[\RR64\] under walk), as G narrowed it, was closed by G's commit 12292add28 with test none. On the merged tree l: List[\RR64\] = <|1.0, 1.0|> binds and SUM <|1.5, 2.5|> printed 4.0, but the batch's first rule for tests forbids asserting a static argument of a generic built from a numeral under walk, so no test was written. Row 432 closes with LanguageTypeInstancesWalk on the same probe. Evidence: explorations/compile-ladder/climb-batch-29/RECORD.md:41-53, :79-90.
- gather.forCurator[4]: Rung T's text says the Working Draft's Literal[\v\] folds into the digit count (Specification/basic/expressions/literals.tex:149, and revival-numerals' Change). P-174 says the explicit-radix variants and Literal[\v\] fold into the radix field (explorations/coordinator/POSITIONS.md:105). Which wording is meant? Default: T's text, as landed. Walk keeps only one leading zero of a radix-point numeral (row 960).
- review.forCurator[0]: review.1: under walk, a negative constant at a program's own number type reaches its coercion as NaturalNumeral(1, 10, -3). The cause is rung F's fold in walk's phase order (PhaseOrder.java:130) together with rung N's numeral site (Numerals.java:160-179). The object's asString is '7', and a type without `-` takes the numeral. literals.tex:215-218 makes it prefix `-` on the coercion's result, and Appendix I's Effect names only the compiled half (changes.tex:5194-5196, row 961). Filed as row 968 and joined to PLAN item 75 (C.skeptic.3). The Effect sentence is in blockingCode.
- review.forCurator[1]: review.2: under walk a nat or int size of 2^31 or more read as a value is a ZZ64 (F-140; on the merged tree `sizeValue[\3000000000\]()` typed ZZ64), which P-173 declines. The revival-numerals Effect (changes.tex:5145-5148, :5196-5198) and the gather's ranges.tex:55-58 box say both implementations give ZZ32. Noted on row 962 and joined to PLAN's C.worker.2/C.skeptic.2 entry. The text's correction is in blockingCode.
- rungs[N].verdict.forCurator[0]: P-168's one exception says 'two values of a numeral type inside a coercion's body are strictly equivalent when their reduced values are equal'. The rung applies it across NaturalNumeral and RadixPointNumeral (worker's decision 10), so 2 and 2.0 inside a body are SEQV; P-168's first rule says values of different types never are. Is the exception within one numeral type, or across both? Evidence: ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java:48-49; explorations/coordinator/POSITIONS.md:101.
- rungs[N].verdict.forCurator[1]: A float numeral beyond the largest finite RR32 or RR64 becomes Infinity at a typed place under walk, with no error: s: RR32 = 340282356779733661637539395458142568448 printed 'Big1 RR32 above max Infinity' (bin/fortress on the rung's build), as simpleDoubleArith.numeralToFloat rounds by IEEE's rule (ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:264-307). Is such a numeral 'outside the type's range' under P-173 (explorations/coordinator/POSITIONS.md:104), refused statically and raising under walk as an out-of-range integer numeral does? Or is Infinity its one rounding?
- rungs[C].verdict.forCurator[0]: Question 1 (the worker's): where P-40's unfixed size meets fork C4. The call is ee(5), for ee[\nat n\](x: ZZ32) beside ee(x: Any). The worker built way (a): the static choice is ee(x: Any) and the compiled dispatch runs the sized arm. Evidence: ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:288-291; ProjectFortress/compiler_tests/LiteralDefaultCompiled.fss:78.
The skeptic's addition: under (a), a sized arm whose body reads n dies. The head's `ee[\nat n\](e: ZZ32): ZZ32 = n` with ee(5) gives 'java.lang.NumberFormatException: For input string: "n"' where the base answered 2, and walk gives 'undefined variable [n]'. That is row 446's defect, rewritten in explorations/compile-ladder/rung-numeral-checker/record.md.
The ways: (a) as built; (b) refuse ee(5) as P-40 refuses ez(z) for a ZZ32 z ('Could not infer static argument nat n without context.', on both codes), against fork C8's 'ee(5) gives 1' (explorations/coordinator/CLIMB-BATCH-29.md:371); (c) an unused size not counted as unfixed.
- rungs[C].verdict.forCurator[1]: Question 2 (the worker's): NEW-C-2. A nat or int size of 2^31 or more, read as a value, raises java.lang.Error. Evidence: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6364; compiler/runtimeValues/FIntLiteral.java:63-71.
- rungs[C].verdict.forCurator[2]: Fork C6's default is not built (NEW-C-1, compiler_tests/XXXNegativeNumeralOwnType). The fork's default (explorations/coordinator/CLIMB-BATCH-29.md:369) has a negative constant reach a program's type as prefix minus on its coercion of the natural numeral. But the fold that makes -3 one node keeps no reference to the prefix operator (ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:148-153), and the fold is rung F's. Ways: F's fold keeps the operator's reference for a numeral at a program's type; the checker builds one; or NEW-C-1 stands until the switch-over.
- rungs[C].verdict.forCurator[3]: NEW-C-3: a numeral as a typecase's selector keeps IntLiteral (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:660; compiler_tests/XXXNumeralTypecaseSelector.test). P-173 gives it its default, but the default there changes two team tests. In compiler_tests/XXX5r.test the pinned span of the unreachable clauses moves. In compiler_tests/XXXPatternMatchingc.test, `typecase (3, 4) of (x, y: ZZ32)` becomes reachable, and the code generator then stops with 'typcase match failure!' (compiler/codegen/CodeGen.java:2181, NEW-C-4). Ways: build the default with the two team tests respelled and the pattern wall's test kept; or leave it as recorded.
- rungs[C].verdict.forCurator[4]: The written-only rule as built allows IntLiteral and FloatLiteral as any parameter's whole type (ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:48-73). P-174 reads 'written only as a parameter type, of a coercion or an operator' (explorations/coordinator/POSITIONS.md:105), and the batch's rule for tests says 'only as a coercion's parameter type'. The skeptic's respelling of the two prelude-IntLiteral library tests (ProjectFortress/library_tests/IntLiteralArithRung7.fss:36, IntLiteralRung6.fss:42) relies on the broader reading. Ways: keep it; or narrow the rule to coercions and operators, after which those two tests have no way to hold two IntLiteral values at once.
- rungs[F].verdict.forCurator[0]: A numeral at a program's own generic type (NEW-F-3). For a closed site such as Gen[\String\], the component class could hold its one object, as it does for a type without static arguments. For a site whose type names a type parameter of its declaration, such as m(): Gen[\T\] = 3 in object Box[\T\], is it one object per site, or one per instantiation held by the instantiated class? P-174 names neither. Evidence: ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7189-7204; ProjectFortress/compiler_tests/XXXNumeralCoercionGenericTypeCompiled.fss:11.
- rungs[F].verdict.forCurator[1]: The fold changes walk's library: ZZ's zero and one getters (Library/FortressLibrary.fss:1093-1095) become a ZZ32 under walk on rung F's tree (row 387, ProjectFortress/tests/XXXZZOneGetterWalk.fss). Whether the merged tree repairs it depends on the ruling on rung N's contested fix 953d050966 (a numeral at a declared return type converted there).
- rungs[F].verdict.forCurator[2]: The worker's question confirmed by my program: an exact comparison of radix-point numerals folds 0.1 = 0.1000000000000000000001 to false, where the base answered true (tmp program FoldEdges.fss; ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:304-310).
- rungs[G].verdict.forCurator[3]: The worker's questions 2 to 4 stand as it put them: the ilk of the four string objects against P-167 (ObjectPrims.java:64; team test tests/StringTests.fss:82); the numeral assertions of LanguageTypeInstancesWalk.fss:22, :25, :27, :29 and :37 against the batch's first rule (CLIMB-BATCH-29.md:657), which the rung's own test list settles and N's head hook (its REPORT.md:33) keeps ZZ32 on the merged tree by reading; and rows 432 and 721's float halves resting on N.
- rungs[T].verdict.forCurator[0]: Inequality at a numeral (the worker's question 1). If the judge keeps 1184add1d9, the specification settles this: e =/= e' is NOT (e = e') (Specification/basic/operators/opr-overview.tex:272-273). The open part is then the library's repair, and that choice belongs to a later library rung, not the curator. The two ways are an =/= beside each = pair, or =/= on each number type as NOT (self = other); QQ already uses the second (Library/FortressLibrary.fss:583), and the prelude declares =/= on each integer type (ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:230, :300, :360). If the judge reverts it, the worker's three ways stand.
- rungs[T].verdict.forCurator[1]: A numeral at Index (the worker's question 2) is narrower than the worker put it. The revised text gives the default at every type that does not fix one: literals.tex:191 'Where nothing fixes a type'; conversions-coercions.tex:105-108 'where the declared type is a supertype of the default'. The worker's report says the text 'names only the decided places', but the text states way (a). The judgement's repair 1, 'every other type, and no type, takes the default' (explorations/reviews/literal-design-judgement-2026-11-08.md:9), supports way (a), and rung C built it ('defaultFits', explorations/compile-ladder/rung-numeral-checker/REPORT.md:21, :130 on wip/rung-numeral-checker). What is left: confirming (a), and revival-index's sentence that the checker refuses f(3) at Index (Specification/appendices/changes.tex:4436-4439), which the gather revises.

# 3. The code as landed (git diff b430f9f428 7daf51fe8a; files at 7daf51fe8a)

## 3.1 Library/FortressLibrary.fsi and .fss

####  at 7daf51fe8a, Library/FortressLibrary.fsi:452-492
```
452: end
453: 
454: (** A numeral's own type (\secref{literals}).  Its four numbers are the
455:     digit count %digits%, the digits after the radix point %fractionDigits%,
456:     the radix %radix%, and the digits read as one integer in that radix,
457:     %digitValue%.  A numeral type is written only as a parameter type. **)
458: trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }
459:     abstract getter digits(): ZZ32
460:     abstract getter fractionDigits(): ZZ32
461:     abstract getter radix(): ZZ32
462:     abstract getter digitValue(): ZZ
463: end
464: 
465: (** A numeral without a radix point. **)
466: value object NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral
467:     getter fractionDigits(): ZZ32
468:     (** The numeral as the Working Draft writes one: its digits in its radix,
469:         and %_r% where the radix %r% is not ten. **)
470:     getter asString(): String
471:     (** The value as a float, by one rounding. **)
472:     asFloat(self): RR64
473:     opr =(self, b:RR64):Boolean
474:     opr =(self, b:QQ):Boolean
475:     opr =(self, b:ZZ):Boolean
476:     opr =(self, b:ZZ64):Boolean
477:     opr =(self, b:NN64):Boolean
478:     opr =(self, b:ZZ32):Boolean
479:     opr =(self, b:NN32):Boolean
480:     opr =(self, b:RR32):Boolean
481: end
482: 
483: (** A numeral with a radix point. **)
484: value object RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral
485:     (** The numeral as the Working Draft writes one, with the radix point
486:         after %digits - fractionDigits% of its digits. **)
487:     getter asString(): String
488:     (** The value as a float, by one rounding. **)
489:     asFloat(self): RR64
490:     opr =(self, b:RR64):Boolean
491:     opr =(self, b:QQ):Boolean
492:     opr =(self, b:RR32):Boolean
```

####  at 7daf51fe8a, Library/FortressLibrary.fss:668-722
```
668: (* One rounding of a numeral's value into a float. *)
669: private numeralRR64(v: ZZ, r: ZZ32, m: ZZ32): RR64 =
670:     builtinPrimitive("com.sun.fortress.nativeHelpers.simpleDoubleArith.numeralToDouble")
671: 
672: trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }
673:     abstract getter digits(): ZZ32
674:     abstract getter fractionDigits(): ZZ32
675:     abstract getter radix(): ZZ32
676:     abstract getter digitValue(): ZZ
677: end
678: 
679: (* The digits of a numeral's value in its radix, at least n of them, upper case. *)
680: private numeralDigits(v: ZZ, r: ZZ32, n: ZZ32): String = do
681:     var s: String := ""
682:     var k: ZZ := v
683:     var i: ZZ32 := 0
684:     radix: ZZ = big(r)
685:     while k > big(0) OR i < n do
686:         d: ZZ32 = (k MOD radix).asZZ32
687:         s := "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"[d] || s
688:         k := k DIV radix
689:         i += 1
690:     end
691:     s
692:   end
693: 
694: private numeralSuffix(r: ZZ32): String = if r = 10 then "" else "_" || r.asString end
695: 
696: value object NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral
697:     getter fractionDigits(): ZZ32 = 0
698:     getter asString(): String = numeralDigits(digitValue, radix, digits) || numeralSuffix(radix)
699:     asFloat(self): RR64 = numeralRR64(digitValue, radix, 0)
700:     opr =(self, b:RR64):Boolean = do c: RR64 = self; (c = b) end
701:     opr =(self, b:QQ):Boolean = do c: QQ = self; (c = b) end
702:     opr =(self, b:ZZ):Boolean = do c: ZZ = self; (c = b) end
703:     opr =(self, b:ZZ64):Boolean = do c: ZZ64 = self; (c = b) end
704:     opr =(self, b:NN64):Boolean = do c: NN64 = self; (c = b) end
705:     opr =(self, b:ZZ32):Boolean = do c: ZZ32 = self; (c = b) end
706:     opr =(self, b:NN32):Boolean = do c: NN32 = self; (c = b) end
707:     opr =(self, b:RR32):Boolean = do c: RR32 = self; (c = b) end
708: end
709: 
710: value object RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral
711:     getter asString(): String = do
712:         t = numeralDigits(digitValue, radix, digits)
713:         w = digits - fractionDigits
714:         t[0#w] || "." || t[w#fractionDigits] || numeralSuffix(radix)
715:       end
716:     asFloat(self): RR64 = numeralRR64(digitValue, radix, fractionDigits)
717:     opr =(self, b:RR64):Boolean = do c: RR64 = self; (c = b) end
718:     opr =(self, b:QQ):Boolean = do c: QQ = self; (c = b) end
719:     opr =(self, b:RR32):Boolean = do c: RR32 = self; (c = b) end
720: end
721: 
722: trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }
```

Sample of one number type's coercions from the numeral types and its = pairs: RR64 (fss), ZZ32 (fss), QQ (fss), with the api's lines for RR64/ZZ32 listed under the greps below.

#### RR64: coercions and pairs at 7daf51fe8a, Library/FortressLibrary.fss:385-391
```
385:         excludes { QQ, AnyIntegral, RR32 }
386:         comprises { Float }
387:     coerce(x: ZZ32) = asFloat(x)
388:     coerce(x: RR32) = asFloat(x)
389:     coerce(x: NaturalNumeral) = asFloat(x)
390:     coerce(x: RadixPointNumeral) = asFloat(x)
391:     getter zero(): RR64 = 0.0
```

#### RR64: pairs at 7daf51fe8a, Library/FortressLibrary.fss:417-421
```
417:     opr =(self, b:ZZ32):Boolean = do c: RR64 = b; (self = c) end
418:     opr =(self, b:RR32):Boolean = do c: RR64 = b; (self = c) end
419:     opr =(self, b:NaturalNumeral):Boolean = do c: RR64 = b; (self = c) end
420:     opr =(self, b:RadixPointNumeral):Boolean = do c: RR64 = b; (self = c) end
421:     opr <(self, b:RR64):Boolean = asFloat(self) < asFloat(b)
```

#### ZZ32: coercion at 7daf51fe8a, Library/FortressLibrary.fss:826-830
```
826: trait ZZ32 extends { AnyIntegral, Integral[\ZZ32\], Index }
827:         excludes { ZZ64, ZZ, NN64, NN32 }
828:         comprises { Int }
829:     coerce(x: NaturalNumeral) = x.digitValue.asZZ32
830:     getter zero(): ZZ32 = 0
```

#### ZZ32: pair at 7daf51fe8a, Library/FortressLibrary.fss:845-846
```
845:     opr =(self, b:NaturalNumeral):Boolean = do c: ZZ32 = b; (self = c) end
846:     opr =(self, b:RR64):Boolean = do c: RR64 = self; (c = b) end
```

#### QQ: coercions at 7daf51fe8a, Library/FortressLibrary.fss:563-570
```
563:     coerce(x: NN64) = Ratio(x, 1)
564:     coerce(x: ZZ) = Ratio(x, 1)
565:     coerce(x: NaturalNumeral) = Ratio(x.digitValue, 1)
566:     coerce(x: RadixPointNumeral) = do
567:         r: ZZ = big(x.radix)
568:         x.digitValue / r^(x.fractionDigits)
569:       end
570:     getter zero(): QQ = Ratio(0, 1)
```

#### AnyIntegral: coerce at 7daf51fe8a, Library/FortressLibrary.fss:722-730
```
722: trait AnyIntegral extends { Number } comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }
723:     coerce(x: NaturalNumeral) = do
724:         z = x.digitValue
725:         if z <= big(2147483647) then z.asZZ32
726:         elif z <= big(9223372036854775807) then z.asZZ64
727:         else z end
728:       end
729: end
730:         (** \vspace{-4ex} NOT YET: %comprises Integral[\I\] where [\I\]% *)
```

#### RR64 api at 7daf51fe8a, Library/FortressLibrary.fsi:295-299
```
295:     coerce(x: ZZ32)
296:     coerce(x: RR32)
297:     coerce(x: NaturalNumeral)
298:     coerce(x: RadixPointNumeral)
299:     getter zero(): RR64
```

#### RR64 api pairs at 7daf51fe8a, Library/FortressLibrary.fsi:324-328
```
324:     opr =(self, b:ZZ32):Boolean
325:     opr =(self, b:RR32):Boolean
326:     opr =(self, b:NaturalNumeral):Boolean
327:     opr =(self, b:RadixPointNumeral):Boolean
328:     opr <(self, b:RR64):Boolean
```

#### QQ api at 7daf51fe8a, Library/FortressLibrary.fsi:404-408
```
404:     coerce(x: NN64)
405:     coerce(x: ZZ)
406:     coerce(x: NaturalNumeral)
407:     coerce(x: RadixPointNumeral)
408:     getter zero(): QQ
```

#### QQ api pairs at 7daf51fe8a, Library/FortressLibrary.fsi:423-427
```
423:     opr =(self, b:NN64):Boolean
424:     opr =(self, b:ZZ):Boolean
425:     opr =(self, b:NaturalNumeral):Boolean
426:     opr =(self, b:RadixPointNumeral):Boolean
427:     opr =/=(self, other:QQ):Boolean
```

#### Every line naming NaturalNumeral, RadixPointNumeral or Numeral (grep -n -w), count and line numbers, at 7daf51fe8a
- Library/FortressLibrary.fsi: 24 lines: 297 298 326 327 406 407 425 426 458 466 484 496 544 556 595 608 626 668 684 704 744 761 776 815 
- Library/FortressLibrary.fss: 24 lines: 389 390 419 420 565 566 588 589 672 696 710 723 829 845 915 935 956 1026 1045 1064 1131 1155 1175 1251 

#### Other Library files that name either type or the old literal types at 7daf51fe8a (git grep -n -w)
```
Library/CompilerLibrary.fsi:43:    identity and an %Any% parameter suppresses the coercion from %IntLiteral%
Library/CompilerLibrary.fss:93:(*) and an Any parameter suppresses the IntLiteral coercion that a call such as
```

#### Library/ diff of the files other than FortressLibrary (Constants, ReflectiveQuickCheck)

#### git diff b430f9f428 7daf51fe8a -- Library/Constants.fsi Library/Constants.fss Library/ReflectiveQuickCheck.fss
```diff
diff --git a/Library/Constants.fsi b/Library/Constants.fsi
--- a/Library/Constants.fsi
+++ b/Library/Constants.fsi
@@ -13,8 +13,8 @@ api Constants
 
 (** Useful floating-point constants. *)
 
-pi : FloatLiteral
-e : FloatLiteral
+pi : RR64
+e : RR64
 infinity : RR64
 
 end
diff --git a/Library/Constants.fss b/Library/Constants.fss
--- a/Library/Constants.fss
+++ b/Library/Constants.fss
@@ -12,8 +12,8 @@
 component Constants
 export Constants
 
-pi : FloatLiteral = 3.141592653589793 (* Double whose sin is closest to 0 *)
-e : FloatLiteral = 2.718281828459045 (* Double nearest to e; = exp(1.0) on JDK 8+ *)
+pi : RR64 = 3.141592653589793 (* Double whose sin is closest to 0 *)
+e : RR64 = 2.718281828459045 (* Double nearest to e; = exp(1.0) on JDK 8+ *)
 infinity : RR64 = 1.0 / 0.0
 
 end
diff --git a/Library/ReflectiveQuickCheck.fss b/Library/ReflectiveQuickCheck.fss
--- a/Library/ReflectiveQuickCheck.fss
+++ b/Library/ReflectiveQuickCheck.fss
@@ -37,7 +37,7 @@ object genType(top:Type) extends Gen[\Type\]
                     1 => theType[\RR32\]()
                     2 => theType[\QQ\]()
                     3 => theType[\AnyIntegral\]()
-                    4 => theType[\IntLiteral\]()
+                    4 => theType[\ZZ32\]()
                 end
             genType(t).generate(c)
         elif subtypes <- top.typeComprises then
@@ -154,7 +154,6 @@ trait ReflectiveArbitrary extends DefaultArbitrary
                 theType[\Boolean\]() => Just[\AnyGen\](genBoolean)
                 (*) The order does matter!
                 theType[\ZZ32\]() => Just[\AnyGen\](genZZ32)
-                theType[\IntLiteral\]() => Just[\AnyGen\](genZZ32)
                 theType[\ZZ64\]() => Just[\AnyGen\](genZZ64)
                 theType[\ZZ\]() => Just[\AnyGen\](genZZ)
                 theType[\NN64\]() => Just[\AnyGen\](genZZ)
```

## 3.2 ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi and .fss

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi
```diff
diff --git a/ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi b/ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi
--- a/ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi
+++ b/ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi
@@ -41,11 +41,10 @@ end
 value object Float extends RR64
 end
 
-value object FloatLiteral extends RR64
-end
-
 value object RR32 extends { Number, StandardPartialOrder[\RR32\], StandardMinMax[\RR32\],
                             AdditiveGroup[\RR32\], MultiplicativeRing[\RR32\] }
+    coerce(x: NaturalNumeral)
+    coerce(x: RadixPointNumeral)
     (** returns true if the value is an IEEE NaN **)
     getter isNaN(): Boolean
     (** returns true if the value is an IEEE infinity **)
@@ -70,6 +69,8 @@ value object RR32 extends { Number, StandardPartialOrder[\RR32\], StandardMinMax
     asFloat(self): RR64
     opr =(self, b:RR32):Boolean
     opr =(self, b:RR64):Boolean
+    opr =(self, b:NaturalNumeral):Boolean
+    opr =(self, b:RadixPointNumeral):Boolean
     opr =/=(self, b:RR32):Boolean
     opr <(self, b:RR32):Boolean
     opr <=(self, b:RR32):Boolean
@@ -131,7 +132,7 @@ value object Long extends ZZ64
 end
 
 value object NN32 extends { AnyIntegral, Integral[\NN32\] }
-    coerce(x: IntLiteral)
+    coerce(x: NaturalNumeral)
     getter asZZ32(): ZZ32
     getter asZZ64(): ZZ64
     getter asNN32(): NN32
@@ -141,7 +142,7 @@ value object NN32 extends { AnyIntegral, Integral[\NN32\] }
     opr |self| : NN32
     asFloat(self): RR64
     opr =(self, b:NN32):Boolean
-    opr =(self, b:IntLiteral):Boolean
+    opr =(self, b:NaturalNumeral):Boolean
     opr =(self, b:QQ):Boolean
     opr =(self, b:ZZ):Boolean
     opr =(self, b:ZZ64):Boolean
@@ -182,7 +183,7 @@ value object NN32 extends { AnyIntegral, Integral[\NN32\] }
     opr BITNOT(self):NN32
     opr ^(self, b:ZZ32):NN32
     opr ^(self, b:AnyIntegral):NN32
-    opr ^(self, b:IntLiteral):NN32
+    opr ^(self, b:NaturalNumeral):NN32
     opr /(self, other:NN32):QQ
     numerator(self): ZZ
     widen(self):NN64
@@ -196,58 +197,6 @@ end
 value object UnsignedLong extends NN64
 end
 
-value object IntLiteral extends { Number }
-    getter zero(): IntLiteral
-    getter one(): IntLiteral
-    getter asZZ32(): ZZ32
-    getter asZZ64(): ZZ64
-    getter asNN32(): NN32
-    getter asNN64(): NN64
-    getter asZZ(): ZZ
-    opr |self| : IntLiteral
-    asFloat(self): Float
-    opr =(self, b: IntLiteral):Boolean
-    opr =(self, b:RR64):Boolean
-    opr =(self, b:QQ):Boolean
-    opr =(self, b:ZZ):Boolean
-    opr =(self, b:ZZ64):Boolean
-    opr =(self, b:NN64):Boolean
-    opr =(self, b:ZZ32):Boolean
-    opr =(self, b:NN32):Boolean
-    opr <(self, other:IntLiteral): Boolean
-    opr <=(self, other:IntLiteral): Boolean
-    opr >(self, other:IntLiteral): Boolean
-    opr >=(self, other:IntLiteral): Boolean
-    opr CMP(self, other:IntLiteral): TotalComparison
-
-    opr -(self): IntLiteral
-    opr +(self, b: IntLiteral): IntLiteral
-    opr -(self, b: IntLiteral): IntLiteral
-    opr DOT(self, b: IntLiteral): IntLiteral
-    opr juxtaposition(self, b: IntLiteral): IntLiteral
-    opr TIMES(self, b: IntLiteral): IntLiteral
-    opr DIV(self, b: IntLiteral): IntLiteral
-    opr REM(self, b: IntLiteral): IntLiteral
-    opr MOD(self, b: IntLiteral): IntLiteral
-    opr GCD(self, b: IntLiteral): IntLiteral
-    opr LCM(self, b: IntLiteral): IntLiteral
-    opr CHOOSE(self, b: IntLiteral): IntLiteral
-    opr BITAND(self, b: IntLiteral): IntLiteral
-    opr BITOR(self, b: IntLiteral): IntLiteral
-    opr BITXOR(self, b: IntLiteral): IntLiteral
-    opr LSHIFT(self, b:AnyIntegral): IntLiteral
-    opr RSHIFT(self, b:AnyIntegral): IntLiteral
-    opr BITNOT(self): IntLiteral
-    opr ^(self, b:AnyIntegral):IntLiteral
-    opr ^(self, b: IntLiteral): IntLiteral
-    opr DIVIDES(self, b: IntLiteral): Boolean
-    floor(self): IntLiteral
-    ceiling(self): IntLiteral
-    truncate(self): IntLiteral
-    even(self): Boolean
-    odd(self): Boolean
-end
-
 value object BigNum extends ZZ end
 
 value object Boolean
```

#### FortressBuiltin.fss: the removed objects, in full, are the '-' lines of this diff; the lines of the new text follow it

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
```diff
diff --git a/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss b/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
--- a/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
+++ b/ProjectFortress/LibraryBuiltin/FortressBuiltin.fss
@@ -79,7 +79,7 @@ value object Float extends RR64
     (** next lower IEEE float **)
     getter nextDown():RR64 =
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleNextDown")
-    asFloat(self): Float = self
+    asFloat(self): RR64 = self
     (** returns a value of type RR32 **)
     narrow(self): RR32 =
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleToFloat")
@@ -205,17 +205,14 @@ value object Float extends RR64
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleDoubleArith.doubleRound")
 end
 
-value object FloatLiteral extends RR64
-    getter asString(): String =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.FloatLiteral$ToString")
-    getter asExprString(): String =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.FloatLiteral$ToString")
-    asFloat(self): Float =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.FloatLiteral$AsFloat")
-end
+(* One rounding of a numeral's value into an RR32. *)
+private numeralRR32(v: ZZ, r: ZZ32, m: ZZ32): RR32 =
+    builtinPrimitive("com.sun.fortress.nativeHelpers.simpleDoubleArith.numeralToFloat")
 
 value object RR32 extends { Number, StandardPartialOrder[\RR32\], StandardMinMax[\RR32\],
                             AdditiveGroup[\RR32\], MultiplicativeRing[\RR32\] }
+    coerce(x: NaturalNumeral) = numeralRR32(x.digitValue, x.radix, 0)
+    coerce(x: RadixPointNumeral) = numeralRR32(x.digitValue, x.radix, x.fractionDigits)
     getter zero(): RR32 = narrow(0.0)
     getter one(): RR32 = narrow(1.0)
     getter asString(): String =
@@ -258,6 +255,8 @@ value object RR32 extends { Number, StandardPartialOrder[\RR32\], StandardMinMax
     opr =(self, b:RR32):Boolean =
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleFloatArith.floatEQ")
     opr =(self, b:RR64):Boolean = do c: RR64 = self; (c = b) end
+    opr =(self, b:NaturalNumeral):Boolean = do c: RR32 = b; (self = c) end
+    opr =(self, b:RadixPointNumeral):Boolean = do c: RR32 = b; (self = c) end
     opr =/=(self, b:RR32):Boolean =
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleFloatArith.floatNE")
     opr <(self, b:RR32):Boolean =
@@ -428,7 +427,7 @@ private exponentNN32(b:AnyIntegral):ZZ32 =
     end
 
 value object NN32 extends { AnyIntegral, Integral[\NN32\] }
-    coerce(x: IntLiteral) = x.asNN32
+    coerce(x: NaturalNumeral) = x.digitValue.asNN32
     getter zero(): Number = unsigned(0)
     getter one(): Number = unsigned(1)
     getter asString(): String =
@@ -451,7 +450,7 @@ value object NN32 extends { AnyIntegral, Integral[\NN32\] }
     opr |self| : NN32 = self
     opr =(self, b:NN32):Boolean =
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleUnsignedIntArith.unsignedIntEQ")
-    opr =(self, b:IntLiteral):Boolean = do c: NN32 = b; (self = c) end
+    opr =(self, b:NaturalNumeral):Boolean = do c: NN32 = b; (self = c) end
     opr =(self, b:QQ):Boolean = do c: QQ = self; (c = b) end
     opr =(self, b:ZZ):Boolean = do c: ZZ = self; (c = b) end
     opr =(self, b:ZZ64):Boolean = do c: ZZ64 = self; (c = b) end
@@ -521,7 +520,7 @@ value object NN32 extends { AnyIntegral, Integral[\NN32\] }
     opr ^(self, b:ZZ32):NN32 =
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleUnsignedIntArith.unsignedIntPower")
     opr ^(self, b:AnyIntegral):NN32 = self^(exponentNN32(b))
-    opr ^(self, b:IntLiteral):NN32 = self^(b.asZZ32)
+    opr ^(self, b:NaturalNumeral):NN32 = self^(b.digitValue.asZZ32)
     widen(self):NN64 =
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleUnsignedIntArith.toLong")
     partitionL(self):NN32 =
@@ -546,88 +545,6 @@ value object UnsignedLong extends NN64
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleUnsignedLongArith.unsignedLongToDouble")
 end
 
-value object IntLiteral extends Number
-    getter zero(): IntLiteral = 0
-    getter one(): IntLiteral = 1
-    getter asZZ32(): ZZ32 = self.asZZ.asZZ32
-    getter asZZ64(): ZZ64 = self.asZZ.asZZ64
-    getter asNN32(): NN32 = self.asZZ.asNN32
-    getter asNN64(): NN64 = self.asZZ.asNN64
-    getter asZZ(): ZZ =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$ToZZ")
-    getter asString(): String = self.asZZ.asString
-    getter asExprString(): String = self.asZZ.asString
-
-    asFloat(self): Float =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$AsFloat")
-
-    opr |self| : IntLiteral = if self>=0 then self else -self end
-    opr =(self, b: IntLiteral):Boolean = self.asZZ = b.asZZ
-    opr =(self, b:RR64):Boolean = do c: RR64 = self; (c = b) end
-    opr =(self, b:QQ):Boolean = do c: QQ = self; (c = b) end
-    opr =(self, b:ZZ):Boolean = do c: ZZ = self; (c = b) end
-    opr =(self, b:ZZ64):Boolean = do c: ZZ64 = self; (c = b) end
-    opr =(self, b:NN64):Boolean = do c: NN64 = self; (c = b) end
-    opr =(self, b:ZZ32):Boolean = do c: ZZ32 = self; (c = b) end
-    opr =(self, b:NN32):Boolean = do c: NN32 = self; (c = b) end
-    opr <(self, other:IntLiteral): Boolean = self.cmp(other) < 0
-    opr <=(self, other:IntLiteral): Boolean = self.cmp(other) <= 0
-    opr >(self, other:IntLiteral): Boolean = self.cmp(other) > 0
-    opr >=(self, other:IntLiteral): Boolean = self.cmp(other) >= 0
-    opr CMP(self, other:IntLiteral): TotalComparison = self.cmp(other) CMP 0
-    cmp(b:IntLiteral): ZZ32 = do
-        x = self.asZZ
-        y = b.asZZ
-        if x < y then -1 elif y < x then 1 else 0 end
-      end
-
-    opr -(self): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Negate")
-    opr +(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Add")
-    opr -(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Sub")
-    opr DOT(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Mul")
-    opr juxtaposition(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Mul")
-    opr TIMES(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Mul")
-    opr DIV(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Div")
-    opr REM(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Rem")
-    opr MOD(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Mod")
-    opr GCD(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Gcd")
-    opr LCM(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Lcm")
-    opr CHOOSE(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Choose")
-    opr BITAND(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$BitAnd")
-    opr BITOR(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$BitOr")
-    opr BITXOR(self, b: IntLiteral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$BitXor")
-    opr LSHIFT(self, b:AnyIntegral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$LShift")
-    opr RSHIFT(self, b:AnyIntegral): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$RShift")
-    opr BITNOT(self): IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$BitNot")
-    opr ^(self, b:AnyIntegral):IntLiteral =
-        builtinPrimitive("com.sun.fortress.interpreter.glue.prim.IntLiteral$Pow")
-    opr ^(self, b: IntLiteral): IntLiteral = self^(b.asZZ32)
-    opr DIVIDES(self, b: IntLiteral): Boolean = self.asZZ DIVIDES b.asZZ
-    floor(self): IntLiteral = self
-    ceiling(self): IntLiteral = self
-    truncate(self): IntLiteral = self
-    even(self): Boolean = even(self.asZZ)
-    odd(self): Boolean = odd(self.asZZ)
-end
-
 value object BigNum extends ZZ
     getter asString(): String =
         builtinPrimitive("com.sun.fortress.nativeHelpers.simpleArbitraryPrecisionArith.toString")
```

#### Lines at 7daf51fe8a naming the numeral types or the removed ones, in FortressBuiltin.fsi/.fss (grep -n -w)
```
ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:46:    coerce(x: NaturalNumeral)
ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:47:    coerce(x: RadixPointNumeral)
ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:72:    opr =(self, b:NaturalNumeral):Boolean
ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:73:    opr =(self, b:RadixPointNumeral):Boolean
ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:135:    coerce(x: NaturalNumeral)
ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:145:    opr =(self, b:NaturalNumeral):Boolean
ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:186:    opr ^(self, b:NaturalNumeral):NN32
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:214:    coerce(x: NaturalNumeral) = numeralRR32(x.digitValue, x.radix, 0)
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:215:    coerce(x: RadixPointNumeral) = numeralRR32(x.digitValue, x.radix, x.fractionDigits)
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:258:    opr =(self, b:NaturalNumeral):Boolean = do c: RR32 = b; (self = c) end
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:259:    opr =(self, b:RadixPointNumeral):Boolean = do c: RR32 = b; (self = c) end
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:430:    coerce(x: NaturalNumeral) = x.digitValue.asNN32
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:453:    opr =(self, b:NaturalNumeral):Boolean = do c: NN32 = b; (self = c) end
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:523:    opr ^(self, b:NaturalNumeral):NN32 = self^(b.digitValue.asZZ32)
```

## 3.3 Walk

#### header comment and Site/Numeral declarations at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:36-74
```
36:  * the digits after the radix point, its radix, and its digits read as one
37:  * integer.  Where a place fixes a type the numeral converts there from those
38:  * numbers: into a numeral type as the library's NaturalNumeral or
39:  * RadixPointNumeral object, and into any other type through that type's
40:  * coercion from the numeral type, called with that object; a site gives one
41:  * value at each type.  Elsewhere the numeral is its default, and a binding
42:  * keeps the default alone (plain).
43:  */
44: public final class Numerals {
45: 
46:     private Numerals() {
47:     }
48: 
49:     /** A numeral's value at its default. */
50:     public interface Numeral {
51:         Site site();
52:     }
53: 
54:     /** One numeral of the program: its four numbers, its default, and what it converts to. */
55:     public static final class Site {
56:         final int digits;
57:         final int fractionDigits;
58:         final int radix;
59:         final BigInteger digitValue;
60:         final boolean radixPoint;
61:         FValue value;
62:         FValue plain;
63:         private FValue object;
64:         private final Map<FType, FValue> converted = new HashMap<FType, FValue>();
65: 
66:         Site(int digits, int fractionDigits, int radix, BigInteger digitValue, boolean radixPoint) {
67:             this.digits = digits;
68:             this.fractionDigits = fractionDigits;
69:             this.radix = radix;
70:             this.digitValue = digitValue;
71:             this.radixPoint = radixPoint;
72:         }
73:     }
74: 
```

#### the four numeral classes at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:75-126
```
75:     static final class IntNumeral extends FInt implements Numeral {
76:         private final Site site;
77: 
78:         IntNumeral(int x, Site s) {
79:             super(x);
80:             site = s;
81:         }
82: 
83:         public Site site() {
84:             return site;
85:         }
86:     }
87: 
88:     static final class LongNumeral extends FLong implements Numeral {
89:         private final Site site;
90: 
91:         LongNumeral(long x, Site s) {
92:             super(x);
93:             site = s;
94:         }
95: 
96:         public Site site() {
97:             return site;
98:         }
99:     }
100: 
101:     static final class BigNumeral extends FBigNum implements Numeral {
102:         private final Site site;
103: 
104:         BigNumeral(BigInteger x, Site s) {
105:             super(x);
106:             site = s;
107:         }
108: 
109:         public Site site() {
110:             return site;
111:         }
112:     }
113: 
114:     static final class FloatNumeral extends FFloat implements Numeral {
115:         private final Site site;
116: 
117:         FloatNumeral(double x, Site s) {
118:             super(x);
119:             site = s;
120:         }
121: 
122:         public Site site() {
123:             return site;
124:         }
125:     }
126: 
```

#### integer(): an integer numeral at its site at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:158-180
```
158: 
159:     /** The value of the integer numeral x at its site. */
160:     public static FValue integer(IntLiteralExpr x) {
161:         synchronized (Numerals.class) {
162:             Site s = sites.get(x);
163:             if (s != null) return s.value;
164:             BigInteger v = x.getIntVal();
165:             s = new Site(Math.max(1, digitPart(x.getText()).length()), 0, radixOf(x.getText()), v, false);
166:             if (v.compareTo(INT_MIN) >= 0 && v.compareTo(INT_MAX) <= 0) {
167:                 s.value = new IntNumeral(v.intValue(), s);
168:                 s.plain = FInt.make(v.intValue());
169:             } else if (v.compareTo(LONG_MIN) >= 0 && v.compareTo(LONG_MAX) <= 0) {
170:                 s.value = new LongNumeral(v.longValue(), s);
171:                 s.plain = FLong.make(v.longValue());
172:             } else {
173:                 s.value = new BigNumeral(v, s);
174:                 s.plain = FBigNum.make(v);
175:             }
176:             sites.put(x, s);
177:             return s.value;
178:         }
179:     }
180: 
```

#### radixPoint(): a numeral with a radix point at its site at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:181-219
```
181:     /** The value of the numeral with a radix point x at its site. */
182:     public static FValue radixPoint(FloatLiteralExpr x) {
183:         synchronized (Numerals.class) {
184:             Site s = sites.get(x);
185:             if (s != null) return s.value;
186:             // The radix as written: the node's base is 1 where every digit after the point is 0.
187:             int r = radixOf(x.getText());
188:             int m = x.getDenomPower();
189:             BigInteger v = x.getIntPart().multiply(BigInteger.valueOf(r).pow(m)).add(x.getNumerator());
190:             int n = Math.max(1, digitPart(x.getText()).length());
191:             // The digits as written: the node keeps the value, not the trailing zeros.
192:             String t = x.getText().replace("'", "").replace("\u202F", "");
193:             int under = t.indexOf('_');
194:             String written = under >= 0 ? t.substring(0, under) : t;
195:             int point = written.indexOf('.');
196:             if (point >= 0) {
197:                 String digits = written.substring(0, point) + written.substring(point + 1);
198:                 if (r == 12) digits = digits.replace('x', 'A').replace('X', 'A').replace('e', 'B').replace('E', 'B');
199:                 try {
200:                     BigInteger w = new BigInteger(digits, r);
201:                     int wm = written.length() - point - 1;
202:                     if (w.multiply(BigInteger.valueOf(r).pow(m)).equals(v.multiply(BigInteger.valueOf(r).pow(wm)))) {
203:                         v = w;
204:                         m = wm;
205:                         n = digits.length();
206:                     }
207:                 }
208:                 catch (NumberFormatException ex) {
209:                     // the node's numbers stand
210:                 }
211:             }
212:             s = new Site(n, m, r, v, true);
213:             double d = simpleDoubleArith.numeralToDouble(v, r, m);
214:             s.value = new FloatNumeral(d, s);
215:             s.plain = FFloat.make(d);
216:             sites.put(x, s);
217:             return s.value;
218:         }
219:     }
```

#### numeralType, fitsAsIs, object (the numeral object constructed at run time) at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:279-311
```
279: 
280:     /** The numeral's own type, NaturalNumeral or RadixPointNumeral, or null where the library has none. */
281:     public static FType numeralType(FValue v) {
282:         if (!(v instanceof Numeral)) return null;
283:         return libraryType(((Numeral) v).site().radixPoint ? "RadixPointNumeral" : "NaturalNumeral");
284:     }
285: 
286:     /** v is a numeral whose own type fits t as it is. */
287:     public static boolean fitsAsIs(FType t, FValue v) {
288:         FType nt = numeralType(v);
289:         return nt != null && !(t instanceof BottomType) && nt.subtypeOf(t);
290:     }
291: 
292:     /** The library's NaturalNumeral or RadixPointNumeral object of the numeral v, one for its site. */
293:     public static FValue object(FValue v) {
294:         Site s = ((Numeral) v).site();
295:         synchronized (s) {
296:             if (s.object == null) {
297:                 List<FValue> args = new ArrayList<FValue>(4);
298:                 args.add(FInt.make(s.digits));
299:                 if (s.radixPoint) args.add(FInt.make(s.fractionDigits));
300:                 args.add(FInt.make(s.radix));
301:                 args.add(FBigNum.make(s.digitValue));
302:                 Fcn c = (Fcn) library().getRootValue(s.radixPoint ? "RadixPointNumeral" : "NaturalNumeral");
303:                 s.object = c.applyToArgs(args);
304:             }
305:             return s.object;
306:         }
307:     }
308: 
309:     /**
310:      * Whether the numeral v is inside the range of target, where target is
311:      * one of the library's integer types; true for every other type.
```

#### inRange, converted at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:313-340
```
313:     static boolean inRange(FType target, FValue v) {
314:         Site s = ((Numeral) v).site();
315:         String n = target.getName();
316:         BigInteger lo, hi;
317:         if (n.equals("ZZ32")) { lo = INT_MIN; hi = INT_MAX; }
318:         else if (n.equals("ZZ64")) { lo = LONG_MIN; hi = LONG_MAX; }
319:         else if (n.equals("NN32")) { lo = BigInteger.ZERO; hi = NN32_MAX; }
320:         else if (n.equals("NN64")) { lo = BigInteger.ZERO; hi = NN64_MAX; }
321:         else return true;
322:         if (target != (n.equals("NN32") ? nn32Type() : libraryType(n))) return true;
323:         return s.digitValue.compareTo(lo) >= 0 && s.digitValue.compareTo(hi) <= 0;
324:     }
325: 
326:     /** The numeral v converted to target by c, one value for its site at each type. */
327:     static FValue converted(FValue v, FType target, SingleFcn c) {
328:         Site s = ((Numeral) v).site();
329:         synchronized (s) {
330:             FValue r = s.converted.get(target);
331:             if (r == null) {
332:                 r = c.applyInnerPossiblyGeneric(java.util.Collections.singletonList(v));
333:                 s.converted.put(target, r);
334:             }
335:             return r;
336:         }
337:     }
338: 
339:     /**
340:      * The value a function declared with the return type range answers, where
```

#### numeral-object test, field reads, sameValue at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:405-456
```
405:     }
406: 
407:     /** Whether o is the library's NaturalNumeral or RadixPointNumeral object. */
408:     static boolean isNumeralObject(FValue o) {
409:         if (!(o instanceof FObject)) return false;
410:         FType t = o.type();
411:         String n = t.getName();
412:         if (!n.equals("NaturalNumeral") && !n.equals("RadixPointNumeral")) return false;
413:         return t == libraryType(n);
414:     }
415: 
416:     /** The value of the field name of o, which a getter of the same name may hide from select. */
417:     private static FValue fieldValue(FObject o, String name) {
418:         FValue f = null;
419:         try {
420:             f = o.selectField(name);
421:         }
422:         catch (RuntimeException ex) {
423:             f = null;
424:         }
425:         return f != null ? f : o.select(name);
426:     }
427: 
428:     private static BigInteger field(FObject o, String name) {
429:         return fieldValue(o, name).getBigInteger();
430:     }
431: 
432:     private static int intField(FObject o, String name) {
433:         return fieldValue(o, name).getInt();
434:     }
435: 
436:     /**
437:      * Two numeral objects are strictly equivalent when their values are
438:      * equal: digitValue / radix^fractionDigits, reduced.
439:      */
440:     static boolean sameValue(FObject a, FObject b) {
441:         BigInteger va = field(a, "digitValue"), vb = field(b, "digitValue");
442:         BigInteger da = BigInteger.valueOf(intField(a, "radix")).pow(fractionDigits(a));
443:         BigInteger db = BigInteger.valueOf(intField(b, "radix")).pow(fractionDigits(b));
444:         return va.multiply(db).equals(vb.multiply(da));
445:     }
446: 
447:     private static int fractionDigits(FObject o) {
448:         return o.type().getName().equals("RadixPointNumeral") ? intField(o, "fractionDigits") : 0;
449:     }
450: 
451:     /**
452:      * The dispatch caches' key of an argument list: each argument's type, and
453:      * for a numeral the bottom type, its default's type, its own type and its
454:      * range, so that a numeral and a value of its default type have different
455:      * keys, and so do two numerals of one default that an unsigned type of
456:      * its width holds and does not.
```

#### the evaluator's two numeral entries at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1630-1638
```
1630:     }
1631: 
1632:     public FValue forFloatLiteralExpr(FloatLiteralExpr x) {
1633:         return Numerals.radixPoint(x);
1634:     }
1635: 
1636:     public FValue forIntLiteralExpr(IntLiteralExpr x) {
1637:         return Numerals.integer(x);
1638:     }
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java b/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java
--- a/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java
+++ b/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java
@@ -56,6 +56,7 @@ public final class Coercions {
      * with the target's own static arguments first.
      */
     static SingleFcn coercionFor(FType target, FValue v) {
+        if (Numerals.isNumeral(v)) return numeralCoercionFor(target, v);
         if (target instanceof GenericTypeInstance) {
             SingleFcn g = genericCoercionFor((GenericTypeInstance) target, v);
             if (g != null) return g;
@@ -85,11 +86,43 @@ public final class Coercions {
     }
 
     /**
-     * The most specific of the generic target's lifted coercions, each
-     * instantiated with the target's static arguments, that applies to v
-     * without a coercion; or null.
+     * The coercion to target from the numeral v's own type, NaturalNumeral or
+     * RadixPointNumeral: the one of target's coercions whose parameter type
+     * is the narrowest that holds the numeral type, which it receives as the
+     * numeral object; or null, also where v is outside target's range when
+     * target is an integer type.  A numeral does not reach target through a
+     * coercion from its default, since coercions do not chain.
      */
-    private static SingleFcn genericCoercionFor(GenericTypeInstance target, FValue v) {
+    private static SingleFcn numeralCoercionFor(FType target, FValue v) {
+        FType nt = Numerals.numeralType(v);
+        if (nt == null || !Numerals.inRange(target, v)) return null;
+        List<SingleFcn> fs = new ArrayList<SingleFcn>();
+        if (target instanceof GenericTypeInstance) {
+            fs.addAll(instantiatedCoercions((GenericTypeInstance) target));
+        } else {
+            Fcn lifted = liftedCoercions(target);
+            if (lifted instanceof OverloadedFunction) {
+                for (Overload o : ((OverloadedFunction) lifted).getOverloads()) fs.add(o.getFn());
+            } else if (lifted instanceof SingleFcn) {
+                fs.add((SingleFcn) lifted);
+            }
+        }
+        SingleFcn best = null;
+        for (SingleFcn f : fs) {
+            if (f instanceof GenericFunctionOrMethod) continue;
+            List<FType> d = f.getDomain();
+            if (d.size() != 1 || !nt.subtypeOf(d.get(0))) continue;
+            if (best == null || d.get(0).subtypeOf(best.getDomain().get(0))) best = f;
+        }
+        return best;
+    }
+
+    /**
+     * The generic target's lifted coercions, each instantiated with the
+     * target's static arguments.
+     */
+    private static List<SingleFcn> instantiatedCoercions(GenericTypeInstance target) {
+        List<SingleFcn> res = new ArrayList<SingleFcn>();
         FTypeGeneric generic = target.getGeneric();
         String name = NamingCzar.LIFTED_COERCION_PREFIX + generic.getName();
         Fcn lifted = null;
@@ -101,7 +134,7 @@ public final class Coercions {
                 break;
             }
         }
-        if (lifted == null) return null;
+        if (lifted == null) return res;
         List<GenericFunctionOrMethod> generics = new ArrayList<GenericFunctionOrMethod>();
         if (lifted instanceof OverloadedFunction) {
             for (Overload o : ((OverloadedFunction) lifted).getOverloads()) {
@@ -111,17 +144,27 @@ public final class Coercions {
             generics.add((GenericFunctionOrMethod) lifted);
         }
         List<FType> targs = target.getTypeParams();
-        List<FValue> args = Collections.singletonList(v);
-        SingleFcn best = null;
         for (GenericFunctionOrMethod g : generics) {
             if (g.getStaticParams().size() != targs.size()) continue;
-            SingleFcn f;
             try {
-                f = g.typeApply(targs);
+                res.add(g.typeApply(targs));
             }
             catch (FortressException ex) {
-                continue;
+                // not an instance at these static arguments
             }
+        }
+        return res;
+    }
+
+    /**
+     * The most specific of the generic target's lifted coercions, each
+     * instantiated with the target's static arguments, that applies to v
+     * without a coercion; or null.
+     */
+    private static SingleFcn genericCoercionFor(GenericTypeInstance target, FValue v) {
+        List<FValue> args = Collections.singletonList(v);
+        SingleFcn best = null;
+        for (SingleFcn f : instantiatedCoercions(target)) {
             List<FValue> fargs = f.fixupArgCount(args);
             if (fargs == null || !OverloadedFunction.argsMatchTypes(fargs, f.getDomain())) continue;
             if (best == null || FTypeTuple.moreSpecificThan(f.getDomain(), best.getDomain())) best = f;
@@ -134,7 +177,7 @@ public final class Coercions {
      * by element).
      */
     public static boolean admits(FType t, FValue v) {
-        if (t.typeMatch(v)) return true;
+        if (t.typeMatch(v) || Numerals.fitsAsIs(t, v)) return true;
         if (t instanceof FTypeTuple) {
             if (!(v instanceof FTuple)) return false;
             List<FType> types = ((FTypeTuple) t).getTypes();
@@ -222,7 +265,8 @@ public final class Coercions {
      * v converted by the coercion c to target.
      */
     static FValue apply(SingleFcn c, FType target, FValue v) {
-        FValue r = c.applyInnerPossiblyGeneric(Collections.singletonList(v));
+        FValue r = Numerals.isNumeral(v) ? Numerals.converted(v, target, c)
+                                         : c.applyInnerPossiblyGeneric(Collections.singletonList(v));
         if (!target.typeMatch(r)) {
             return error(errorMsg("Coercion ", c, " to ", target, " returned ", r, " of type ", r.type()));
         }
@@ -235,6 +279,7 @@ public final class Coercions {
      */
     public static FValue coerce(FType target, FValue v) {
         if (target instanceof FTypeTuple) return coerceTuple((FTypeTuple) target, v);
+        if (Numerals.fitsAsIs(target, v)) return Numerals.object(v);
         SingleFcn c = coercionFor(target, v);
         return c == null ? null : apply(c, target, v);
     }
@@ -337,6 +382,30 @@ public final class Coercions {
         return differ;
     }
 
+    /**
+     * target itself, or, where some argument is a numeral at a parameter that
+     * its own numeral type fits and its default does not, a call that makes
+     * each such numeral its numeral object and dispatches the arguments again,
+     * so that a functional method of the numeral type is found on that object.
+     */
+    static SingleFcn withNumeralObjects(SingleFcn target, List<FValue> args, OverloadedFunction owner) {
+        if (target instanceof CoercedCall) return target;   // its converted arguments are dispatched again
+        List<FValue> oargs = target.fixupArgCount(args);
+        if (oargs == null) return target;
+        List<FType> domain = target.getDomain();
+        boolean[] objects = new boolean[oargs.size()];
+        boolean any = false;
+        for (int j = 0; j < oargs.size(); j++) {
+            FType t = Useful.clampedGet(domain, j).deRest();
+            FValue a = oargs.get(j);
+            if (Numerals.isNumeral(a) && !t.typeMatch(a) && Numerals.fitsAsIs(t, a)) {
+                objects[j] = true;
+                any = true;
+            }
+        }
+        return any ? new CoercedCall(target, new SingleFcn[oargs.size()], owner, objects) : target;
+    }
+
     /**
      * The coercions for each argument position of an overloaded call, chosen
      * by the argument types and kept in the per-argument-type cache: for each
@@ -348,12 +417,18 @@ public final class Coercions {
         private final SingleFcn target;
         private final SingleFcn[] coercions;
         private final OverloadedFunction owner;
+        private final boolean[] objects;   // the positions of numerals that become their numeral objects, or null
 
         CoercedCall(SingleFcn target, SingleFcn[] coercions, OverloadedFunction owner) {
+            this(target, coercions, owner, null);
+        }
+
+        CoercedCall(SingleFcn target, SingleFcn[] coercions, OverloadedFunction owner, boolean[] objects) {
             super(target.getWithin());
             this.target = target;
             this.coercions = coercions;
             this.owner = owner;
+            this.objects = objects;
         }
 
         int arity() {
@@ -365,7 +440,9 @@ public final class Coercions {
             List<FValue> res = new ArrayList<FValue>(oargs);
             List<FType> domain = target.getDomain();
             for (int j = 0; j < coercions.length; j++) {
-                if (coercions[j] != null) {
+                if (objects != null && objects[j]) {
+                    res.set(j, Numerals.object(oargs.get(j)));
+                } else if (coercions[j] != null) {
                     res.set(j, apply(coercions[j], Useful.clampedGet(domain, j).deRest(), oargs.get(j)));
                 }
             }
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java b/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java
--- a/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java
+++ b/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java
@@ -96,7 +96,7 @@ public class OverloadedFunction extends Fcn implements Factory1P<List<FType>, Fc
     }
 
     BATreeEC<List<FValue>, List<FType>, SingleFcn> cache =
-            new BATreeEC<List<FValue>, List<FType>, SingleFcn>(FValue.asTypesList);
+            new BATreeEC<List<FValue>, List<FType>, SingleFcn>(Numerals.keys);
 
     @Override
     public boolean needsInference() {
@@ -2275,6 +2275,8 @@ public class OverloadedFunction extends Fcn implements Factory1P<List<FType>, Fc
     public SingleFcn bestMatch(List<FValue> args, List<Overload> someOverloads) throws Error {
         if (!finishedSecond && InstantiationLock.L.isHeldByCurrentThread()) bug("Cannot call before 'setFinished()'");
 
+        if (Numerals.anyNumeral(args)) return bestMatchForNumerals(args, someOverloads);
+
         SingleFcn best = bestMatchInternal(args, someOverloads, true);
         if (best == null) {
             best = bestMatchWithCoercion(args, someOverloads);
@@ -2290,6 +2292,54 @@ public class OverloadedFunction extends Fcn implements Factory1P<List<FType>, Fc
         return best;
     }
 
+    /**
+     * The best match where some argument is a numeral, read as the checker
+     * reads one.  A declaration fits a numeral as it is where its parameter is
+     * the numeral's own type or admits its default, and the default ranks as
+     * no coercion: of the declarations that fit as they are, the most
+     * specific, unless the one that the defaults alone fit is no less
+     * specific.  Where none fits as it is, the coercion attempt runs, each
+     * numeral converting from its own type; and a tie among the declarations
+     * that it finds, which only the numerals make, reads each numeral at its
+     * default (inference.tex, "A Numeral Whose Conversions Tie").
+     */
+    private SingleFcn bestMatchForNumerals(List<FValue> args, List<Overload> someOverloads) {
+        SingleFcn f = bestMatchForNumeralsInternal(args, someOverloads);
+        return this instanceof OverloadedMethod ? f : Coercions.withNumeralObjects(f, args, this);
+    }
+
+    private SingleFcn bestMatchForNumeralsInternal(List<FValue> args, List<Overload> someOverloads) {
+        List<FValue> plain = Numerals.plain(args);
+        SingleFcn best = bestMatchInternal(args, someOverloads, true);
+        if (best != null) {
+            SingleFcn atDefault = bestMatchInternal(plain, someOverloads, true);
+            if (atDefault == null || atDefault == best) return best;
+            List<FType> bd = best.getDomain();
+            List<FType> dd = atDefault.getDomain();
+            boolean below = bd.size() == dd.size() && FTypeTuple.make(bd).subtypeOf(FTypeTuple.make(dd)) &&
+                            !FTypeTuple.make(dd).subtypeOf(FTypeTuple.make(bd));
+            return below ? best : atDefault;
+        }
+        try {
+            best = bestMatchWithCoercion(args, someOverloads);
+        }
+        catch (FortressException tie) {
+            try {
+                return bestMatch(plain, someOverloads);
+            }
+            catch (FortressException ex) {
+                throw tie;
+            }
+        }
+        if (best == null) {
+            error(errorMsg("Failed to find any matching overload, args = ",
+                           Useful.listInParens(args),
+                           ", overload = ",
+                           this));
+        }
+        return best;
+    }
+
     /**
      * The most specific overload applicable to args without coercion, or null.
      */
@@ -2659,7 +2709,7 @@ public class OverloadedFunction extends Fcn implements Factory1P<List<FType>, Fc
             FValue a = args.get(j);
             FType t = Useful.clampedGet(l, j).deRest();
             try {
-                if (!t.typeMatch(a)) {
+                if (!t.typeMatch(a) && !Numerals.fitsAsIs(t, a)) {
                     return false;
                 }
             }
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java b/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java
--- a/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java
+++ b/ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java
@@ -45,6 +45,8 @@ public class FOrdinaryObject extends FObject {
     }
 
     public boolean seqv(FValue v) {
+        // two numeral values are strictly equivalent by their values, reduced
+        if (Numerals.isNumeralObject(this) && Numerals.isNumeralObject(v)) return Numerals.sameValue(this, (FObject) v);
         if (!(ftype.isValueType())) return false;
         if (!(v instanceof FOrdinaryObject)) return false;
         FOrdinaryObject o = (FOrdinaryObject) v;
```

## 3.4 The compiled path

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/compiler/Types.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/compiler/Types.java b/ProjectFortress/src/com/sun/fortress/compiler/Types.java
--- a/ProjectFortress/src/com/sun/fortress/compiler/Types.java
+++ b/ProjectFortress/src/com/sun/fortress/compiler/Types.java
@@ -58,8 +58,8 @@ public final class Types {
     public static final ArrowType BOTTOM_ARROW = NodeFactory.makeArrowType(NodeFactory.typeSpan, ANY, BOTTOM);
 
     public static final TupleType VOID = NodeFactory.makeVoidType(span);
-    public static final TraitType FLOAT_LITERAL = makeTraitType(span, fortressBuiltin(), "FloatLiteral");
-    public static final TraitType INT_LITERAL = makeTraitType(span, fortressBuiltin(), "IntLiteral");
+    public static TraitType FLOAT_LITERAL = makeTraitType(span, fortressBuiltin(), "FloatLiteral");
+    public static TraitType INT_LITERAL = makeTraitType(span, fortressBuiltin(), "IntLiteral");
     public static final TraitType ZZ32 = makeTraitType(span, fortressLibrary(), "ZZ32");
     public static final TraitType BOOLEAN = makeTraitType(span, fortressBuiltin(), "Boolean");
     public static TraitType CHARACTER = makeTraitType(span, fortressBuiltin(), "Character");
@@ -72,8 +72,9 @@ public final class Types {
     /**
      * It's necessary to set STRING when using the compiler libraries because the location of String
      * in the compiler libraries differs from its location in the full libraries.
-     * Similarly for JavaString and Exception and CheckedException, and for the character type,
-     * which the full libraries name Char.
+     * Similarly for JavaString and Exception and CheckedException, for the character type,
+     * which the full libraries name Char, and for the two numeral types, which the full
+     * libraries name NaturalNumeral and RadixPointNumeral.
      */
     public static void useCompilerLibraries() {
         CHARACTER = makeTraitType(span, fortressBuiltin(), "Character");
@@ -81,6 +82,8 @@ public final class Types {
         JAVASTRING = makeTraitType(span, fortressBuiltin(), "JavaString");
         EXCEPTION = makeTraitType(span, fortressBuiltin(), "Exception");
         CHECKED_EXCEPTION = makeTraitType(span, fortressBuiltin(), "CheckedException");
+        INT_LITERAL = makeTraitType(span, fortressBuiltin(), "IntLiteral");
+        FLOAT_LITERAL = makeTraitType(span, fortressBuiltin(), "FloatLiteral");
     }
     public static void useFortressLibraries() {
         CHARACTER = makeTraitType(span, fortressBuiltin(), "Char");
@@ -88,6 +91,8 @@ public final class Types {
         JAVASTRING = makeTraitType(span, fortressLibrary(), "JavaString");
         EXCEPTION = makeTraitType(span, fortressLibrary(), "Exception");
         CHECKED_EXCEPTION = makeTraitType(span, fortressLibrary(), "CheckedException");
+        INT_LITERAL = makeTraitType(span, fortressLibrary(), "NaturalNumeral");
+        FLOAT_LITERAL = makeTraitType(span, fortressLibrary(), "RadixPointNumeral");
     }
 
     public static void useTypeCheckerLibraries() {
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java b/ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java
--- a/ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java
+++ b/ProjectFortress/src/com/sun/fortress/compiler/phases/PhaseOrder.java
@@ -127,6 +127,7 @@ public enum PhaseOrder {
             DISAMBIGUATE,
             GRAMMAR,
             PRETYPECHECKDESUGAR,
+            INTEGERLITERALFOLDING,
             TYPECHECK,
             DESUGAR,
             OVERLOADREWRITE_FOR_INTERPRETER
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala b/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala
--- a/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala
+++ b/ProjectFortress/src/com/sun/fortress/compiler/desugarer/CoercionDesugarer.scala
@@ -25,6 +25,35 @@ import com.sun.fortress.scala_src.useful.SExprUtil._
 import com.sun.fortress.scala_src.useful.STypesUtil._
 import com.sun.fortress.useful.Useful
 
+/**
+ * A coercion of a numeral into a library number type whose constant the code
+ * generator emits folds into the numeral typed at that type: an integer
+ * numeral in the range of ZZ32, ZZ64, NN32 or NN64, any integer numeral into
+ * ZZ, and any numeral into RR64 or RR32, which the code generator rounds once
+ * from its exact value. A numeral out of range keeps its coercion call.
+ */
+object CoercionDesugarer {
+  private val ranges = Map("ZZ32" -> (BigInt(Int.MinValue), BigInt(Int.MaxValue)),
+                           "ZZ64" -> (BigInt(Long.MinValue), BigInt(Long.MaxValue)),
+                           "NN32" -> (BigInt(0), BigInt(4294967295L)),
+                           "NN64" -> (BigInt(0), (BigInt(1) << 64) - 1))
+  private val libraries = Set("CompilerBuiltin", "FortressBuiltin", "FortressLibrary")
+  def foldsTo(e: Expr, t: Type): Boolean = t match {
+    case tt: TraitType if tt.getArgs.isEmpty && tt.getName.getApiName.isSome &&
+                          libraries(tt.getName.getApiName.unwrap.getText) =>
+      val name = tt.getName.getText
+      e match {
+        case i: IntLiteralExpr =>
+          val v = BigInt(i.getIntVal)
+          name == "ZZ" || name == "RR64" || name == "RR32" ||
+          ranges.get(name).exists { case (lo, hi) => lo <= v && v <= hi }
+        case _: FloatLiteralExpr => name == "RR64" || name == "RR32"
+        case _ => false
+      }
+    case _ => false
+  }
+}
+
 /**
  * Desugars all CoercionInvocation nodes into function applications or
  * expressions composed thereof. No CoercionInvocation nodes of any kind will
@@ -62,7 +91,8 @@ class CoercionDesugarer extends Walker {
    */
   protected def desugarTraitCoercion(coercion: TraitCoercionInvocation, expr: Expr): Expr = {
     val STraitCoercionInvocation(info, _, toType, fnRef) = coercion
-    addType(EF.make_RewriteFnApp(info.getSpan, fnRef, expr), toType)
+    if (CoercionDesugarer.foldsTo(expr, toType)) addType(expr, toType)
+    else addType(EF.make_RewriteFnApp(info.getSpan, fnRef, expr), toType)
   }
 
   /**
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java b/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java
--- a/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java
+++ b/ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java
@@ -16,6 +16,7 @@ import java.io.FileOutputStream;
 import java.io.IOException;
 import java.math.BigInteger;
 import java.util.ArrayList;
+import java.util.Arrays;
 import java.util.Collections;
 import java.util.Comparator;
 import java.util.HashMap;
@@ -279,6 +280,13 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
      * Null if not in a trait or object scope.
      */
     private List<InitializedStaticField> initializedStaticFields_TO;
+
+    /**
+     * The numeral sites at a program's own type in this component, which the
+     * component's class initializes when it loads (forNumeralCoercionSite).
+     * One list for the component, shared by every nested code generator.
+     */
+    private List<NumeralCoercionSite> numeralCoercionSites;
     
     
     /**
@@ -383,6 +391,7 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
         
         this.initializedStaticFields_TO = c.initializedStaticFields_TO;
         this.initializedInstanceFields_O = c.initializedInstanceFields_O;
+        this.numeralCoercionSites = c.numeralCoercionSites;
       
         this.component = c.component;
         this.ci = c.ci;
@@ -395,6 +404,7 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
                    FreeVarTypes fvt, ComponentIndex ci, GlobalEnvironment env) {
         component = c;
         localFunctionNames = new HashSet<String>();
+        numeralCoercionSites = new ArrayList<NumeralCoercionSite>();
         packageAndClassName = NamingCzar.javaPackageClassForApi(c.getName());
         String dotted = NamingCzar.javaPackageClassForApi(c.getName(), ".");
         JarOutputStream jos;
@@ -1923,7 +1933,12 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
             }
         }
 
-        // Static initializer for this class.
+        for ( Decl d : x.getDecls() ) {
+            d.accept(this);
+        }
+
+        // Static initializer for this class, emitted after the declarations, whose
+        // numeral sites at a program's type it initializes (forNumeralCoercionSite).
         // Since all top-level fields and singleton objects are singleton inner classes,
         // this does nothing for these.
         mv = cw.visitCGMethod(ACC_STATIC,
@@ -1982,11 +1997,10 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
             }
         }
         
+        // After the caching tables, which a coercion's body may read.
+        emitNumeralCoercionSites();
+
         voidEpilogue();
-        
-        for ( Decl d : x.getDecls() ) {
-            d.accept(this);
-        }
 
         //        System.out.println("About to print parallelism table for " + packageAndClassName);
         //        pa.printTable();
@@ -2034,9 +2048,22 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
     // truncate, but we want to warn if we lose bits I expect).
     public void forFloatLiteralExpr(FloatLiteralExpr x) {
         debug("forFloatLiteral ", x);
-        double val = x.getIntPart().doubleValue() +
-            (x.getNumerator().doubleValue() /
-             Math.pow(x.getDenomBase(), x.getDenomPower()));
+        BigInteger den = BigInteger.valueOf(x.getDenomBase()).pow(x.getDenomPower());
+        BigInteger num = x.getIntPart().multiply(den).add(x.getNumerator());
+        String typed = numeralTarget(x);
+        if (typed.equals("RR32")) {
+            mv.visitLdcInsn(Float.valueOf(roundToFloat(num, den)));
+            mv.visitMethodInsn(INVOKESTATIC, NamingCzar.internalFortressRR32, NamingCzar.make,
+                               Naming.makeMethodDesc(NamingCzar.descFloat, NamingCzar.descFortressRR32));
+            return;
+        }
+        double val = roundToDouble(num, den);
+        if (typed.equals("RR64")) {
+            mv.visitLdcInsn(Double.valueOf(val));
+            mv.visitMethodInsn(INVOKESTATIC, NamingCzar.internalFortressRR64, NamingCzar.make,
+                               Naming.makeMethodDesc(NamingCzar.descDouble, NamingCzar.descFortressRR64));
+            return;
+        }
         mv.visitLdcInsn(val);
         mv.visitMethodInsn(INVOKESTATIC,
                            NamingCzar.internalFortressFloatLiteral, NamingCzar.make,
@@ -4204,9 +4231,100 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
         // No longer need to set up alias table; rely on ForeignJava exclusively instead.
     }
 
+    /**
+     * The library number type at which the coercion desugarer typed a numeral
+     * (CoercionDesugarer.foldsTo), or "" for a numeral of its own type.
+     */
+    private static String numeralTarget(Expr x) {
+        Option<Type> t = x.getInfo().getExprType();
+        if (t.isSome() && t.unwrap() instanceof TraitType) {
+            TraitType tt = (TraitType) t.unwrap();
+            if (tt.getArgs().isEmpty()) return tt.getName().getText();
+        }
+        return "";
+    }
+
+    /**
+     * The double nearest the rational n/d, d positive, by one rounding, to
+     * nearest even, a subnormal one included.
+     */
+    static double roundToDouble(BigInteger n, BigInteger d) {
+        if (n.signum() == 0) return 0.0;
+        BigInteger m = n.abs();
+        int u = ulpExponent(m, d, 53, -1074);
+        double v = Math.scalb((double) roundedSignificand(m, d, u), u);
+        return n.signum() < 0 ? -v : v;
+    }
+
+    /** The float nearest the rational n/d, d positive, by one rounding, as roundToDouble. */
+    static float roundToFloat(BigInteger n, BigInteger d) {
+        if (n.signum() == 0) return 0.0f;
+        BigInteger m = n.abs();
+        int u = ulpExponent(m, d, 24, -149);
+        float v = Math.scalb((float) roundedSignificand(m, d, u), u);
+        return n.signum() < 0 ? -v : v;
+    }
+
+    /**
+     * The exponent of the unit in the last place of m/d, m and d positive, at
+     * the given precision in bits, and at least the least subnormal's.
+     */
+    private static int ulpExponent(BigInteger m, BigInteger d, int precision, int least) {
+        int e = m.bitLength() - d.bitLength();
+        if (e >= 0 ? m.compareTo(d.shiftLeft(e)) < 0 : m.shiftLeft(-e).compareTo(d) < 0) e--;
+        return Math.max(e - (precision - 1), least);
+    }
+
+    /** m/d over 2^u, rounded to the nearest integer, ties to even, from a guard bit and a sticky bit. */
+    private static long roundedSignificand(BigInteger m, BigInteger d, int u) {
+        int s = 2 - u;
+        BigInteger[] qr = (s >= 0 ? m.shiftLeft(s) : m).divideAndRemainder(s >= 0 ? d : d.shiftLeft(-s));
+        long q = qr[0].longValue() | (qr[1].signum() == 0 ? 0 : 1);
+        long r = q >> 2, rest = q & 3;
+        return (rest > 2 || (rest == 2 && (r & 1) == 1)) ? r + 1 : r;
+    }
+
     public void forIntLiteralExpr(IntLiteralExpr x) {
         debug("forIntLiteral ", x);
         BigInteger bi = x.getIntVal();
+        String typed = numeralTarget(x);
+        if (typed.equals("ZZ32") || typed.equals("NN32")) {
+            boolean zz = typed.equals("ZZ32");
+            addLineNumberInfo(x);
+            pushInteger(bi.intValue());
+            mv.visitMethodInsn(INVOKESTATIC, zz ? NamingCzar.internalFortressZZ32 : NamingCzar.internalFortressNN32, NamingCzar.make,
+                               Naming.makeMethodDesc(NamingCzar.descInt, zz ? NamingCzar.descFortressZZ32 : NamingCzar.descFortressNN32));
+            return;
+        }
+        if (typed.equals("ZZ64") || typed.equals("NN64")) {
+            boolean zz = typed.equals("ZZ64");
+            addLineNumberInfo(x);
+            mv.visitLdcInsn(Long.valueOf(bi.longValue()));
+            mv.visitMethodInsn(INVOKESTATIC, zz ? NamingCzar.internalFortressZZ64 : NamingCzar.internalFortressNN64, NamingCzar.make,
+                               Naming.makeMethodDesc(NamingCzar.descLong, zz ? NamingCzar.descFortressZZ64 : NamingCzar.descFortressNN64));
+            return;
+        }
+        if (typed.equals("ZZ")) {
+            addLineNumberInfo(x);
+            mv.visitLdcInsn(bi.toString());
+            mv.visitMethodInsn(INVOKESTATIC, NamingCzar.internalFortressZZ, NamingCzar.make,
+                               Naming.makeMethodDesc(NamingCzar.descString, NamingCzar.descFortressZZ));
+            return;
+        }
+        if (typed.equals("RR64")) {
+            addLineNumberInfo(x);
+            mv.visitLdcInsn(Double.valueOf(roundToDouble(bi, BigInteger.ONE)));
+            mv.visitMethodInsn(INVOKESTATIC, NamingCzar.internalFortressRR64, NamingCzar.make,
+                               Naming.makeMethodDesc(NamingCzar.descDouble, NamingCzar.descFortressRR64));
+            return;
+        }
+        if (typed.equals("RR32")) {
+            addLineNumberInfo(x);
+            mv.visitLdcInsn(Float.valueOf(roundToFloat(bi, BigInteger.ONE)));
+            mv.visitMethodInsn(INVOKESTATIC, NamingCzar.internalFortressRR32, NamingCzar.make,
+                               Naming.makeMethodDesc(NamingCzar.descFloat, NamingCzar.descFortressRR32));
+            return;
+        }
         // bitLength() counts no sign bit, so l <= 31 is exactly the int range
         // and l <= 63 exactly the long range, for both signs.
         int l = bi.bitLength();
@@ -6336,14 +6454,16 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
 
     /**
      * A nat or int static parameter read as a value: the checker types it
-     * IntLiteral (KindEnv.getType), and it is neither a local, nor api-qualified,
+     * ZZ32 (KindEnv.getType), and it is neither a local, nor api-qualified,
      * nor a top-level variable of this component.
      */
     private boolean isSizeInValuePosition(VarRef v, Id id) {
         if (id.getApiName().isSome()) return false;
         if (ci.variables().containsKey(id)) return false;
         Option<Type> ot = NodeUtil.getExprType(v);
-        return ot.isSome() && ot.unwrap().equals(com.sun.fortress.compiler.Types.INT_LITERAL);
+        return ot.isSome() && ot.unwrap() instanceof TraitType &&
+            ((TraitType) ot.unwrap()).getName().getText().equals("ZZ32") &&
+            ((TraitType) ot.unwrap()).getArgs().isEmpty();
     }
 
     public void forVarRef(VarRef v) {
@@ -6352,12 +6472,15 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
         VarCodeGen vcg = getLocalVarOrNull(id, lsargs);
         if (vcg == null && isSizeInValuePosition(v, id)) {
             // The loader replaces CONST.Nat.<size> by the IntLiteral of the
-            // instantiated number (MethodInstantiater.visitMethodInsn).
+            // instantiated number (MethodInstantiater.visitMethodInsn); a size
+            // used as a value is a ZZ32.
             addLineNumberInfo(v);
             String loadNat = Naming.opForString(Naming.natMethod,
                     Naming.LEFT_OXFORD + id.getText() + Naming.RIGHT_OXFORD);
             mv.visitMethodInsn(INVOKESTATIC, Naming.magicInterpClass, loadNat,
                     "()" + NamingCzar.descFortressIntLiteral);
+            mv.visitMethodInsn(INVOKEVIRTUAL, NamingCzar.internalFortressIntLiteral, "asZZ32",
+                    "()" + NamingCzar.descFortressZZ32);
             return;
         }
         if (vcg == null) {
@@ -7048,10 +7171,74 @@ public class CodeGen extends NodeAbstractVisitor_void implements Opcodes {
                            Naming.APPLY_METHOD, sig);
     }
 
+    /** A numeral site at a program's own type: its call, and the static field of the component's class that holds the result. */
+    private static final class NumeralCoercionSite {
+        final _RewriteFnApp app;
+        final String field;
+        final String desc;
+        NumeralCoercionSite(_RewriteFnApp app, String field, String desc) {
+            this.app = app; this.field = field; this.desc = desc;
+        }
+    }
+
+    /** The components of the libraries, whose coercions from a numeral the sites leave called at each evaluation. */
+    private static final Set<String> LIBRARY_APIS = new HashSet<String>(Arrays.asList(
+        "AnyType", "CompilerBuiltin", "CompilerLibrary", "CompilerAlgebra", "CompilerSystem",
+        "FortressBuiltin", "FortressLibrary"));
+
+    /**
+     * The JVM descriptor of the result where x is a numeral at a program's own
+     * type, the call of the program's coercion on a numeral of its own type;
+     * null for any other application.
+     */
+    private String numeralCoercionSiteDesc(_RewriteFnApp x) {
+        Expr fn = x.getFunction();
+        Expr arg = x.getArgument();
+        if (!(fn instanceof FnRef)) return null;
+        FnRef ref = (FnRef) fn;
+        if (!ref.getStaticArgs().isEmpty() || localFunctionOrNull(ref) != null) return null;
+        if (!(arg instanceof IntLiteralExpr || arg instanceof FloatLiteralExpr) || !numeralTarget(arg).matches("IntLiteral|FloatLiteral")) return null;
+        if (!ref.getOriginalName().getText().startsWith(NamingCzar.LIFTED_COERCION_PREFIX)) return null;
+        if (LIBRARY_APIS.contains(component.getName().getText())) return null;
+        Option<Type> ft = ref.getInfo().getExprType();
+        if (ft.isNone() || !(ft.unwrap() instanceof ArrowType)) return null;
+        Type range = ((ArrowType) ft.unwrap()).getRange();
+        if (!(range instanceof TraitType) || !((TraitType) range).getArgs().isEmpty()) return null;
+        Option<APIName> api = ((TraitType) range).getName().getApiName();
+        if (api.isSome() && LIBRARY_APIS.contains(api.unwrap().getText())) return null;
+        return NamingCzar.jvmBoxedTypeDesc(range, thisApi());
+    }
+
+    /**
+     * Each site of a numeral at a program's own type is one object (P-174):
+     * the component's class calls the program's coercion once for the site,
+     * in its static initializer, when it loads, and keeps the result in a
+     * static field that each evaluation of the site reads. A coercion that
+     * raises fails the load of the component's class.
+     */
+    private void emitNumeralCoercionSites() {
+        for (NumeralCoercionSite site : numeralCoercionSites) {
+            cw.visitField(ACC_PUBLIC + ACC_STATIC + ACC_FINAL, site.field, site.desc, null, null);
+            emitFnApp(site.app);
+            mv.visitFieldInsn(PUTSTATIC, packageAndClassName, site.field, site.desc);
+        }
+    }
+
     public void for_RewriteFnApp(_RewriteFnApp x) {
         debug("for_RewriteFnApp ", x,
                      " args = ", x.getArgument(), " function = ", x.getFunction(),
               " function class = ", x.getFunction());
+        String siteDesc = numeralCoercionSiteDesc(x);
+        if (siteDesc != null) {
+            String field = "numeral$coercion$" + numeralCoercionSites.size();
+            numeralCoercionSites.add(new NumeralCoercionSite(x, field, siteDesc));
+            mv.visitFieldInsn(GETSTATIC, packageAndClassName, field, siteDesc);
+            return;
+        }
+        emitFnApp(x);
+    }
+
+    private void emitFnApp(_RewriteFnApp x) {
         // This is a little weird.  If a function takes no arguments the parser gives me a void literal expr
         // however I don't want to be putting a void literal on the stack because it gets in the way.
         int savedParamCount = paramCount;
```

#### header comment at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:36-56
```
36: import static com.sun.fortress.exceptions.InterpreterBug.bug;
37: 
38: /**
39:  * Folds an expression of numerals alone, before the checker, exactly into a
40:  * numeral as written or an operation on such numerals (the Working Draft's
41:  * static expressions: constant.tex, "Types of Static Expressions";
42:  * literals.tex, "Literals"). An integer result is an integer numeral, negative
43:  * as a numeral node with a negative value; a result of operands among which one
44:  * has a radix point is a decimal numeral with a radix point where its
45:  * denominator divides a power of ten, negative as prefix minus on it; any other
46:  * quotient is the quotient of two numerals, n / d for operands without a radix
47:  * point and p.0 / d where one has one. The operators whose meaning needs a
48:  * width (the wrapping and saturating ones, the bitwise ones and the shifts), a
49:  * division by zero, and a result that IEEE arithmetic could make a negative
50:  * zero are left as written. Two natural numerals of one radix joined by ||
51:  * fold into one natural numeral of that radix.
52:  */
53: public class IntegerLiteralFoldingVisitor extends NodeUpdateVisitor {
54: 
55: 	/** The kind of a constant, which sets its default: an integer numeral, a QQ, or an RR64. */
56: 	private enum Kind { INTEGER, QUOTIENT, RADIX_POINT }
```

#### constant kinds and folded forms at 7daf51fe8a, ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:55-90
```
55: 	/** The kind of a constant, which sets its default: an integer numeral, a QQ, or an RR64. */
56: 	private enum Kind { INTEGER, QUOTIENT, RADIX_POINT }
57: 
58: 	/** An exact value, numerator and positive denominator in lowest terms, with its kind. */
59: 	private static final class Constant {
60: 		final BigInteger num;
61: 		final BigInteger den;
62: 		final Kind kind;
63: 		Constant(BigInteger n, BigInteger d, Kind k) {
64: 			if (d.signum() < 0) { n = n.negate(); d = d.negate(); }
65: 			BigInteger g = n.gcd(d);
66: 			if (g.signum() != 0 && !g.equals(BigInteger.ONE)) { n = n.divide(g); d = d.divide(g); }
67: 			num = n; den = d; kind = k;
68: 		}
69: 		boolean isInteger() { return den.equals(BigInteger.ONE); }
70: 		int compareTo(Constant o) { return num.multiply(o.den).compareTo(o.num.multiply(den)); }
71: 	}
72: 
73: 	private static String canon(String s) { return PrecedenceMap.ONLY.canon(s); }
74: 
75: 	private static Set<String> canonSet(String... spellings) {
76: 		Set<String> r = new HashSet<String>();
77: 		for (String s : spellings) r.add(canon(s));
78: 		return r;
79: 	}
80: 
81: 	private static final String PLUS = canon("+"), MINUS = canon("-"), SLASH = canon("/"),
82: 		POWER = canon("^"), DIV = canon("DIV"), REM = canon("REM"), MOD = canon("MOD"),
83: 		GCD = canon("GCD"), LCM = canon("LCM"), CHOOSE = canon("CHOOSE"), MIN = canon("MIN"),
84: 		MAX = canon("MAX"), MINMAX = canon("MINMAX"), CONCAT = canon("||");
85: 	private static final Set<String> TIMES = canonSet("DOT", "TIMES", "·", "×");
86: 	private static final Set<String> COMPARISONS = canonSet("<", "<=", ">", ">=", "=", "NE");
87: 	private static final BigInteger MAX_EXPONENT = BigInteger.valueOf(4096);
88: 	private static final BigInteger TWO = BigInteger.valueOf(2), FIVE = BigInteger.valueOf(5);
89: 	private static final BigInteger DOUBLE_EXACT = BigInteger.ONE.shiftLeft(53);
90: 
```

#### IntegerLiteralFoldingVisitor.java: the diff has 526 changed lines; its method list at 7daf51fe8a (class and method declarations, grep -n)
```
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala
@@ -13,6 +13,7 @@ package com.sun.fortress.scala_src.typechecker
 
 import _root_.java.util.ArrayList
 import com.sun.fortress.compiler.GlobalEnvironment
+import com.sun.fortress.compiler.Types
 import com.sun.fortress.compiler.index.CompilationUnitIndex
 import com.sun.fortress.compiler.index.TraitIndex
 import com.sun.fortress.compiler.typechecker.StaticTypeReplacer
@@ -34,6 +35,42 @@ class TypeWellFormedChecker(compilation_unit: CompilationUnitIndex,
   val errors = new ArrayList[StaticError]()
   var analyzer = typeAnalyzer
 
+  // A numeral's own type is written in a program only as the type of a
+  // parameter of a function, method, coercion, operator or function
+  // expression; the library's own files are exempt. A type that the checker
+  // infers from such a parameter keeps the parameter type's span, and is not
+  // written where it stands.
+  private val unitFile = NodeUtil.getSpan(compilation_unit.ast).getFileName
+  private val libraryUnit = {
+    val f = "/" + unitFile.replace('\\', '/')
+    f.contains("/LibraryBuiltin/") || f.contains("/Library/")
+  }
+  private lazy val parameterTypeSpans: Set[String] = {
+    var spans = Set[String]()
+    def add(ps: List[Param]) = ps.foreach {
+      case SParam(_, _, _, idType, _, varargsType) =>
+        (idType.toList ++ varargsType.toList).foreach(t => spans += NodeUtil.getSpan(t).toString)
+    }
+    object finder extends Walker {
+      override def walk(node: Any): Any = {
+        node match {
+          case SFnDecl(_, SFnHeader(_, _, _, _, _, _, params, _), _, _, _) => add(params)
+          case SFnExpr(_, SFnHeader(_, _, _, _, _, _, params, _), _) => add(params)
+          case _ =>
+        }
+        super.walk(node)
+      }
+    }
+    finder.walk(compilation_unit.ast)
+    spans
+  }
+  private def numeralTypeWritten(t: TraitType, name: Id): Boolean =
+    !libraryUnit &&
+    (name.getText == Types.INT_LITERAL.getName.getText || name.getText == Types.FLOAT_LITERAL.getName.getText) &&
+    NodeUtil.getSpan(t).getFileName == unitFile &&
+    toOption(name.getApiName).forall(a => Set("CompilerBuiltin", "CompilerLibrary", "FortressBuiltin", "FortressLibrary")(a.getText)) &&
+    !parameterTypeSpans(NodeUtil.getSpan(t).toString)
+
   def check() = {
     walk(compilation_unit.ast)
     // An error placed at an expression, at each place that holds no other place of the same
@@ -253,6 +290,8 @@ class TypeWellFormedChecker(compilation_unit: CompilationUnitIndex,
       case t@STraitSelfType(_, named, tys) => walk(named); tys.foreach(walk)
       case t@SObjectExprType(_, tys) => tys.foreach(walk)
       case t@STraitType(_, name, sargs, _) =>
+      if (numeralTypeWritten(t, name))
+        error(name.getText + " cannot be written in a program except as a parameter's type.", t)
       getTypes(name) match {
         case si:TraitIndex => // Trait name should be defined.
         // Static arguments should satisfy the corresponding bounds.
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala
@@ -163,9 +163,14 @@ class CoercionOracle(traits: TraitTable,
   /** Determines if T ~~> U. */
   def coercesTo(t: Type, u: Type): Boolean = checkCoercion(t, u, None).isSome
 
-  /** Determines if e:T ~~> U and if so returns the FnRefs for that coercion. */
-  def buildCoercion(e: Expr, u: Type): Option[CoercionInvocation]
-    = checkCoercion(getType(e).get, u, Some(e)).flatMap(o => o)
+  /**
+   * Determines if e:T ~~> U and if so returns the FnRefs for that coercion.
+   * A numeral outside the range of U, one of the library's bounded number
+   * types, has none.
+   */
+  def buildCoercion(e: Expr, u: Type): Option[CoercionInvocation] =
+    if (NumeralConversion.outOfRange(e, u).isDefined) None
+    else checkCoercion(getType(e).get, u, Some(e)).flatMap(o => o)
 
   /** Determines if T ~~> U and possibly builds a coercion. */
   private def checkCoercion(t: Type,
@@ -393,3 +398,95 @@ class CoercionOracle(traits: TraitTable,
   }
 
 }
+
+/**
+ * A numeral's conversions as the checker reads them: its default type, where
+ * nothing fixes a type, ZZ32, or ZZ64 or ZZ when its value does not fit, and
+ * RR64 with a radix point; a coercion of a numeral into its default type,
+ * which ranks as no coercion wherever it is built; and a numeral outside the
+ * range of the library's bounded number type that its place fixes, which has
+ * no conversion there.
+ */
+object NumeralConversion {
+
+  /** Whether the expression is a numeral, as written or as the fold made it. */
+  def isNumeral(e: Expr): Boolean = e match {
+    case _: IntLiteralExpr | _: FloatLiteralExpr => true
+    case _ => false
+  }
+
+  /** The name of the default type of an integer numeral of this value. */
+  def integerDefaultName(v: java.math.BigInteger): String = {
+    val l = v.bitLength
+    if (l < 32) "ZZ32" else if (l < 64) "ZZ64" else "ZZ"
+  }
+
+  /** The name of a numeral's default type. */
+  def defaultName(e: Expr): Option[String] = e match {
+    case i: IntLiteralExpr => Some(integerDefaultName(i.getIntVal))
+    case _: FloatLiteralExpr => Some("RR64")
+    case _ => None
+  }
+
+  /** Whether the expression is a coercion of a numeral into its own default type. */
+  def isDefault(e: Expr): Boolean = e match {
+    case c: TraitCoercionInvocation =>
+      defaultName(c.getArg).exists(_ == c.getToType.getName.getText) && libraryType(c.getToType)
+    case _ => false
+  }
+
+  /** Whether the coercion is one the call needs: not a numeral's conversion into its default. */
+  def counts(e: Expr): Boolean = e.isInstanceOf[CoercionInvocation] && !isDefault(e)
+
+  private val libraryApis = Set("CompilerBuiltin", "CompilerLibrary", "FortressBuiltin", "FortressLibrary")
+
+  /** Whether the trait type is one the library declares, not a program's of the same name. */
+  private def libraryType(t: TraitType): Boolean =
+    toOption(t.getName.getApiName).forall(a => libraryApis(a.getText))
+
+  private def big(n: Long) = java.math.BigInteger.valueOf(n)
+  private val integerRanges: Map[String, (java.math.BigInteger, java.math.BigInteger)] = Map(
+    "ZZ32" -> (big(Int.MinValue), big(Int.MaxValue)),
+    "ZZ64" -> (big(Long.MinValue), big(Long.MaxValue)),
+    "NN32" -> (java.math.BigInteger.ZERO, big(4294967295L)),
+    "NN64" -> (java.math.BigInteger.ZERO, java.math.BigInteger.ONE.shiftLeft(64).subtract(java.math.BigInteger.ONE)))
+
+  /**
+   * The refusal of a numeral at a place of a bounded number type that cannot
+   * hold it: an integer numeral outside ZZ32, ZZ64, NN32 or NN64, and a
+   * numeral whose one rounding into RR64 or RR32 is an infinity.
+   */
+  def outOfRange(e: Expr, u: Type): Option[String] = outOfRangeAt(e, u).map(_._2)
+
+  /** The numeral that outOfRange refuses, the expression itself or an element of a tuple at a tuple type, and the refusal. */
+  def outOfRangeAt(e: Expr, u: Type): Option[(Expr, String)] = (e, u) match {
+    case (STupleExpr(_, es, None, Nil, _), STupleType(_, us, None, Nil)) if es.size == us.size =>
+      es.zip(us).flatMap { case (x, t) => outOfRangeAt(x, t) }.headOption
+    case _ => numeralOutOfRange(e, u).map((e, _))
+  }
+
+  private def numeralOutOfRange(e: Expr, u: Type): Option[String] = (e, u) match {
+    case (i: IntLiteralExpr, t: TraitType) if libraryType(t) =>
+      val name = t.getName.getText
+      val v = i.getIntVal
+      integerRanges.get(name) match {
+        case Some((lo, hi)) if v.compareTo(lo) < 0 || v.compareTo(hi) > 0 =>
+          Some("The numeral %s is out of range for %s, whose values are %s to %s.".format(v, name, lo, hi))
+        case Some(_) => None
+        case None => roundsToInfinity(new java.math.BigDecimal(v), name).map(_ =>
+          "The numeral %s rounds to infinity in %s.".format(v, name))
+      }
+    case (f: FloatLiteralExpr, t: TraitType) if libraryType(t) =>
+      // The fraction is below one, so it does not carry the integer part past
+      // the largest finite value's rounding boundary, an integer.
+      roundsToInfinity(new java.math.BigDecimal(f.getIntPart), t.getName.getText).map(name =>
+        "The numeral %s rounds to infinity in %s.".format(f.getText, name))
+    case _ => None
+  }
+
+  private def roundsToInfinity(v: java.math.BigDecimal, name: String): Option[String] = name match {
+    case "RR64" if v.doubleValue.isInfinite => Some(name)
+    case "RR32" if v.floatValue.isInfinite => Some(name)
+    case _ => None
+  }
+}
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala
@@ -164,8 +164,15 @@ trait Functionals { self: STypeChecker with Common =>
       if (hasStaticParams(liftedArrow))
         if (coerce || promote.isDefined)
           checkApplicableWithCoercion(liftedArrow, preCandidate, context, args, promote)
-        else
-          checkApplicableWithInference(liftedArrow, preCandidate, context, args)
+        else checkApplicableWithInference(liftedArrow, preCandidate, context, args) match {
+          // A static argument that a numeral fixes at the numeral's own type is
+          // left to the attempt with coercion, which reads the numeral by its
+          // default, where that attempt can check the call: where no argument
+          // is a function expression still unchecked.
+          case Left(c) if args.forall(_.isLeft) && numeralFixesOwnType(c, args) =>
+            Right(errorFactory.makeNotApplicableError(arrow, args))
+          case r => r
+        }
       else
         checkApplicableWithoutInference(liftedArrow, preCandidate, args)
 
@@ -183,11 +190,12 @@ trait Functionals { self: STypeChecker with Common =>
           arrow: ArrowType,
           preCandidate: PreAppCandidate,
           context: Option[Type],
-          args: List[Either[Expr, FnExpr]])
+          args0: List[Either[Expr, FnExpr]])
           (implicit errorFactory: ApplicationErrorFactory)
            : Either[AppCandidate, OverloadingError] = {
 
     val originalArrow = preCandidate.arrow
+    val args = preDefault(arrow, context, args0)
 
     // Try to check the unchecked args, constructing a new list of
     // (checked, unchecked) arg pairs.
@@ -268,14 +276,19 @@ trait Functionals { self: STypeChecker with Common =>
         // We've reached a fixed point and all args are checked!
         Left(AppCandidate(resultArrow,
                           sargs,
-                          newArgs.map(_.left.get),
+                          defaultAtUnfixedEach(newArgs.map(_.left.get), resultArrow.getDomain),
                           preCandidate.overloading,
                           preCandidate.fnl))
       }
     }
 
-    // Do the recursion to check the args.
-    recurOnArgs(args)
+    // Do the recursion to check the args. A declaration that only a numeral's
+    // default at a parameter of its default type made applicable, and whose
+    // size the call then leaves unknown, is checked as the numeral is.
+    recurOnArgs(args) match {
+      case Right(NoContextError(_, _, Some(_))) if !(args eq args0) => recurOnArgs(args0)
+      case r => r
+    }
   }
 
   /**
@@ -354,20 +367,30 @@ trait Functionals { self: STypeChecker with Common =>
                     flatMap(sp => toListFromImmutable(sp.getExtendsClause)).
                     filter(b => b.isInstanceOf[TraitType] && mentioned(b).isEmpty &&
                                 !Set("Object", "Any")(b.asInstanceOf[TraitType].getName.getText))
-      (ts ++ ts.flatMap(coercions.getCoercionTargetsFrom(_)) ++ bound).distinct
+      val all = (ts ++ ts.flatMap(coercions.getCoercionTargetsFrom(_)) ++ bound).distinct
+      // A numeral's own type is no static argument that the numeral fixes.
+      if (own(n).exists(p => NumeralConversion.isNumeral(p._2))) all.filterNot(isNumeralType) else all
     }
-    val choices: List[List[Option[Type]]] = chosen.map { n =>
+    // A parameter that numerals alone fix, with no expected type, takes the
+    // narrowest default that holds them all; where no candidate is found so,
+    // it is chosen as any other parameter.
+    def numeralsAlone(n: IdOrOp) = own(n).nonEmpty && own(n).forall(p => NumeralConversion.isNumeral(p._2))
+    val byDefault = context.isEmpty && promote.isEmpty && chosen.exists(numeralsAlone)
+    def choicesOf(useDefault: Boolean): List[List[Option[Type]]] = chosen.map { n =>
       promote match {
         case Some(sargs) => valueOf(sargs, n) match {
           case Some(_: UnionType) => None :: named(n).map(Some(_))
           case v => List(v)
         }
+        case None if useDefault && numeralsAlone(n) => numeralDefault(own(n).map(_._2)).toList.map(Some(_))
         case None => None :: named(n).map(Some(_))
       }
     }
     if (promote.isDefined && !chosen.exists(n => valueOf(promote.get, n).exists(_.isInstanceOf[UnionType])))
       return notApplicable
-    val combos = choices.foldRight(List(List[Option[Type]]())) { (cs, acc) => for (c <- cs; m <- acc) yield c :: m }
+    def combosOf(choices: List[List[Option[Type]]]) =
+      choices.foldRight(List(List[Option[Type]]())) { (cs, acc) => for (c <- cs; m <- acc) yield c :: m }
+    val combos = combosOf(choicesOf(byDefault))
     if (combos.size > 64) return notApplicable
     def attempt(combo: List[Option[Type]]): Option[AppCandidate] = {
       val pick = Map(chosen.zip(combo): _*)
@@ -384,13 +407,20 @@ trait Functionals { self: STypeChecker with Common =>
         inferStaticParamsHelper(arrow, constraint, false, true, true).getOrElse(return None)
       if (hasInferenceVars(resultArrow) || hasSizeInferenceVars(sargs)) return None
       val newArgs = zipWithDomain(checked.zip(argTypes), resultArrow.getDomain).map { case ((e, a), p) =>
-        if (isSubtype(a, p)) e else coercions.buildCoercion(e, p).getOrElse(return None)
+        if (isSubtype(a, p)) defaultAtUnfixed(e, p)
+        else coercions.buildCoercion(e, p).orElse(defaultFits(e, p)).getOrElse(return None)
       }
       val newArgTypes = newArgs.zip(checked.zip(argTypes)).map { case (n, (e, a)) => if (n eq e) a else getType(n).get }
       if (!isSubtype(NF.makeMaybeTupleType(NF.typeSpan, toJavaList(newArgTypes)), resultArrow.getDomain)) return None
       Some(AppCandidate(resultArrow, sargs, newArgs, preCandidate.overloading, preCandidate.fnl))
     }
-    val found = combos.flatMap(attempt(_))
+    val found = combos.flatMap(attempt(_)) match {
+      case Nil if byDefault =>
+        val plain = combosOf(choicesOf(false))
+        if (plain.size > 64) return notApplicable
+        plain.flatMap(attempt(_))
+      case f => f
+    }
     def noWider(a: AppCandidate, b: AppCandidate) = chosen.forall { n =>
       (valueOf(a.sargs, n), valueOf(b.sargs, n)) match {
         case (Some(s), Some(t)) => coercions.noLessSpecific(s, t)
@@ -415,25 +445,33 @@ trait Functionals { self: STypeChecker with Common =>
     }
   }
 
-  /** Whether the expression is a numeral, or a size used as a value, which the checker types as one. */
+  /**
+   * Whether the expression is a numeral, with or without a radix point, or a
+   * size used as a value, which the checker types as one.
+   */
   def isNumeral(e: Expr): Boolean = getType(e) match {
-    case Some(t) => Formula.isTrue(analyzer.equivalent(t, Types.INT_LITERAL))
+    case Some(t) => Formula.isTrue(analyzer.equivalent(t, Types.INT_LITERAL)) ||
+                    Formula.isTrue(analyzer.equivalent(t, Types.FLOAT_LITERAL))
     case None => false
   }
 
   /**
    * The type numerals are read as when nothing narrower fixes them: ZZ32, or
-   * ZZ64 or ZZ when a numeral's value does not fit; the supertype or coercion
-   * target of the numeral type with that name.
+   * ZZ64 or ZZ when a numeral's value does not fit, and RR64 when one has a
+   * radix point; the supertype or coercion target of the numeral type with
+   * that name.
    */
   def numeralReading(es: List[Expr]): Option[Type] = {
     val big = es.collect { case l: IntLiteralExpr => l.getIntVal }
+    val point = es.exists(e => getType(e).exists(t => Formula.isTrue(analyzer.equivalent(t, Types.FLOAT_LITERAL))))
     val name =
-      if (big.forall(v => v.bitLength < 32)) "ZZ32"
+      if (point) "RR64"
+      else if (big.forall(v => v.bitLength < 32)) "ZZ32"
       else if (big.forall(v => v.bitLength < 64)) "ZZ64"
       else "ZZ"
-    (analyzer.ancestors(Types.INT_LITERAL).toList.collect { case t: TraitType => t } ++
-     coercions.getCoercionTargetsFrom(Types.INT_LITERAL)).find(_.getName.getText == name)
+    val from = if (point) Types.FLOAT_LITERAL else Types.INT_LITERAL
+    (analyzer.ancestors(from).toList.collect { case t: TraitType => t } ++
+     coercions.getCoercionTargetsFrom(from)).find(_.getName.getText == name)
   }
 
   /**
@@ -457,8 +495,8 @@ trait Functionals { self: STypeChecker with Common =>
       // to the param type, this is a NotApplicableError.
       case (Left(checked), paramType) =>
         if (isSubtype(getType(checked).get, paramType))
-          (Left(checked), None)
-        else coercions.buildCoercion(checked, paramType) match {
+          (Left(defaultAtUnfixed(checked, paramType)), None)
+        else coercions.buildCoercion(checked, paramType).orElse(defaultFits(checked, paramType)) match {
           case Some(coercion) => (Left(coercion), None)
           case None =>
             return Right(errorFactory.makeNotApplicableError(originalArrow, args))
@@ -479,7 +517,10 @@ trait Functionals { self: STypeChecker with Common =>
     // Make sure that all the args were checked. If any remain unchecked, gather
     // up all the inference errors into an overloading error.
     val (newArgs, maybeErrors) = arrow.getDomain match {
-          case _:AnyType => (args, None)
+          case d:AnyType => (args.map {
+                               case Left(e) => Left(defaultAtUnfixed(e, d))
+                               case a => a
+                             }, None)
           case _ => (newArgsAndErrors).unzip
         }
     if (newArgs.count(_.isRight) != 0) {
@@ -706,7 +747,7 @@ trait Functionals { self: STypeChecker with Common =>
     }
     def candidatesOf(es: Attempt): List[Ranked] = es.collect { case (Left(c), d, p) => (c, d, p) }
     // A coercion the call needs, not one the promotion introduced.
-    def counted(c: Ranked) = !c._3 && c._1.args.exists(_.isInstanceOf[CoercionInvocation])
+    def counted(c: Ranked) = !c._3 && c._1.args.exists(NumeralConversion.counts)
     // An attempt by subtyping holds the candidates that fit the call without a
     // coercion it needs; an attempt with coercion holds all it finds.
     def holds(es: Attempt, coerce: Boolean) =
@@ -755,9 +796,11 @@ trait Functionals { self: STypeChecker with Common =>
     val candidates = candidatesOf(es)
     val overloadingErrors = es.collect { case (Right(e), _, _) => e }
 
-    // If there were no candidates, report errors.
+    // If there were no candidates, report errors, and each numeral outside
+    // the range of a parameter type that would take it.
     if (candidates.isEmpty) {
       errors.signal(errorFactory.makeApplicationError(overloadingErrors))
+      signalNumeralRanges(preCandidates, args)
       return None
     }
 
@@ -950,6 +993,197 @@ trait Functionals { self: STypeChecker with Common =>
                 format(kind, normalize(getArgType(args)), tied.map(_.toString).mkString("; ")))
   }
 
+  /** Whether the type is a numeral's own type. */
+  def isNumeralType(t: Type): Boolean =
+    Formula.isTrue(analyzer.equivalent(t, Types.INT_LITERAL)) ||
+    Formula.isTrue(analyzer.equivalent(t, Types.FLOAT_LITERAL))
+
+  /**
+   * The narrowest default type that holds every numeral of es: RR64 where one
+   * has a radix point, its supertype or coercion target of that name, and
+   * otherwise numeralReading's ZZ32, ZZ64 or ZZ by their values.
+   */
+  def numeralDefault(es: List[Expr]): Option[Type] =
+    if (es.exists(_.isInstanceOf[FloatLiteralExpr]))
+      (analyzer.ancestors(Types.FLOAT_LITERAL).toList.collect { case t: TraitType => t } ++
+       coercions.getCoercionTargetsFrom(Types.FLOAT_LITERAL)).find(_.getName.getText == "RR64")
+    else numeralReading(es)
+
+  /** The numeral converted into the type t: as it is where it is one, else by its coercion. */
+  private def numeralInto(e: Expr, t: Type): Option[Expr] =
+    if (isSubtype(getType(e).get, t)) Some(e) else coercions.buildCoercion(e, t)
+
+  /**
+   * The expression with each numeral in its result positions converted into
+   * its default: a numeral alone, each element of a tuple on its own, and the
+   * branches of an if or case expression, or of a block's last expression,
+   * all numerals, together, into the narrowest default that holds them all.
+   * Any other expression is returned as it is: the default applies to a
+   * numeral, never to an expression of a numeral's type.
+   */
+  def defaultNumeral(e: Expr): Expr = e match {
+    case n if NumeralConversion.isNumeral(n) => numeralDefault(List(n)).flatMap(numeralInto(n, _)).getOrElse(n)
+    case t@STupleExpr(SExprInfo(span, paren, _), es, None, Nil, inApp) =>
+      val nes = es.map(defaultNumeral)
+      if (nes.zip(es).forall(p => p._1 eq p._2) || nes.exists(getType(_).isEmpty)) t
+      else STupleExpr(SExprInfo(span, paren, Some(NF.makeTupleType(span, toJavaList(nes.map(getType(_).get))))),
+                      nes, None, Nil, inApp)
+    case _ => joinNumerals(e) match {
+      case Some(ns) if ns.nonEmpty => numeralDefault(ns).flatMap(joinInto(e, _)).getOrElse(e)
+      case _ => e
+    }
+  }
+
+  /** The numerals in the result positions of a join whose every result is a numeral. */
+  private def joinNumerals(e: Expr): Option[List[Expr]] = {
+    def all(bs: List[Expr]): Option[List[Expr]] = {
+      val rs = bs.map(joinNumerals)
+      if (rs.forall(_.isDefined)) Some(rs.flatMap(_.get)) else None
+    }
+    e match {
+      case n if NumeralConversion.isNumeral(n) => Some(List(n))
+      case SBlock(_, _, _, _, es) if es.nonEmpty => joinNumerals(es.last)
+      case SDo(_, List(front)) => joinNumerals(front)
+      case SIf(_, clauses, Some(els)) => all(els :: clauses.map(_.getBody))
+      case SCaseExpr(_, _, _, _, _, clauses, els) if clauses.nonEmpty => all(els.toList ++ clauses.map(_.getBody))
+      case _ => None
+    }
+  }
+
+  /** The join with each numeral in its result positions converted into d, and its type d. */
+  private def joinInto(e: Expr, d: Type): Option[Expr] = {
+    def block(b: Block): Option[Block] = joinInto(b, d).map(_.asInstanceOf[Block])
+    def each[A](as: List[A], f: A => Option[A]): Option[List[A]] = {
+      val rs = as.map(f)
+      if (rs.forall(_.isDefined)) Some(rs.map(_.get)) else None
+    }
+    e match {
+      case n if NumeralConversion.isNumeral(n) => numeralInto(n, d)
+      case SBlock(SExprInfo(sp, p, _), loc, at, wd, es) =>
+        joinInto(es.last, d).map(l => SBlock(SExprInfo(sp, p, Some(d)), loc, at, wd, es.init :+ l))
+      case SDo(SExprInfo(sp, p, _), List(front)) =>
+        block(front).map(f => SDo(SExprInfo(sp, p, Some(d)), List(f)))
+      case SIf(SExprInfo(sp, p, _), clauses, Some(els)) =>
+        for (ne <- block(els);
+             ncs <- each(clauses, (c: IfClause) => c match {
+               case SIfClause(i, t, b) => block(b).map(SIfClause(i, t, _)) }))
+          yield SIf(SExprInfo(sp, p, Some(d)), ncs, Some(ne))
+      case SCaseExpr(SExprInfo(sp, p, _), param, cmp, eq, in, clauses, els) =>
+        for (ne <- each(els.toList, block);
+             ncs <- each(clauses, (c: CaseClause) => c match {
+               case SCaseClause(i, m, b, o) => block(b).map(SCaseClause(i, m, _, o)) }))
+          yield SCaseExpr(SExprInfo(sp, p, Some(d)), param, cmp, eq, in, ncs, ne.headOption)
+      case _ => None
+    }
+  }
+
+  /** Whether a numeral's default could change the expression. */
+  private def mayDefault(e: Expr): Boolean = e match {
+    case _: IntLiteralExpr | _: FloatLiteralExpr | _: TupleExpr | _: If | _: CaseExpr | _: Do => true
+    case _ => false
+  }
+
+  def defaultAtUnfixed(e: Expr, p: Type): Expr =
+    if (!mayDefault(e) || isNumeralType(p)) e
+    else {
+      val d = defaultNumeral(e)
+      if ((d ne e) && getType(d).exists(isSubtype(_, p))) d else e
+    }
+
+  /** defaultAtUnfixed for each argument at its parameter type. */
+  private def defaultAtUnfixedEach(args: List[Expr], domain: Type): List[Expr] =
+    if (!args.exists(mayDefault)) args
+    else {
+      val ps = zipWithDomain(args, domain)
+      if (ps.size != args.size) args else ps.map { case (e, p) => defaultAtUnfixed(e, p) }
+    }
+
+  def defaultFits(e: Expr, p: Type): Option[Expr] =
+    if (!mayDefault(e)) None
+    else {
+      val d = defaultNumeral(e)
+      if ((d ne e) && getType(d).exists(isSubtype(_, p))) Some(d) else None
+    }
+
+  /**
+   * A numeral written as a dotted receiver takes its default where the
+   * default type has the member; otherwise it stays, as for the prelude's
+   * own (1).asNN32.
+   */
+  def defaultReceiver(e: Expr, has: Type => Boolean): Expr =
+    if (!NumeralConversion.isNumeral(e)) e
+    else {
+      val d = defaultNumeral(e)
+      if ((d ne e) && getType(d).exists(has)) d else e
+    }
+
+  /**
+   * The arguments of a call before its inference by subtyping, each numeral
+   * given its default where nothing else fixes a type: at a parameter whose
+   * type is a bare type parameter that numerals alone fix and no other
+   * parameter type mentions, with no expected type, the narrowest default
+   * that holds them all; and at a parameter of the numeral's own default
+   * type, that default, which ranks as no coercion, so that the declaration
+   * fits the numeral as it is.
+   */
+  private def preDefault(arrow: ArrowType,
+                         context: Option[Type],
+                         args: List[Either[Expr, FnExpr]]): List[Either[Expr, FnExpr]] = {
+    if (!args.exists(_.left.toOption.exists(NumeralConversion.isNumeral))) return args
+    val domain = zipWithDomain(args, arrow.getDomain)
+    if (domain.size != args.size) return args
+    val sparams = getStaticParams(arrow).filter(sp => !sp.isLifted && sp.getKind.isInstanceOf[KindType]).
+                    map(_.getName).toSet[IdOrOp]
+    def bare(d: Type): Option[IdOrOp] = d match {
+      case v: VarType if sparams(v.getName) => Some(v.getName)
+      case _ => None
+    }
+    var elsewhere = Set[IdOrOp]()
+    object finder extends Walker {
+      override def walk(node: Any): Any = node match {
+        case v: VarType => elsewhere += v.getName; node
+        case _ => super.walk(node)
+      }
+    }
+    domain.foreach { case (_, d) => if (bare(d).isEmpty) finder(d) }
+    val groups: Map[IdOrOp, Type] =
+      if (context.isDefined) Map()
+      else domain.flatMap(p => bare(p._2)).distinct.filterNot(elsewhere).flatMap { n =>
+        val at = domain.collect { case (a, d) if bare(d) == Some(n) => a }
+        if (at.forall(_.left.toOption.exists(NumeralConversion.isNumeral)))
+          numeralDefault(at.map(_.left.get)).map(n -> _)
+        else None
+      }.toMap
+    domain.map {
+      case (Left(e), d) if NumeralConversion.isNumeral(e) => bare(d) match {
+        case Some(n) => Left(groups.get(n).flatMap(numeralInto(e, _)).getOrElse(e))
+        case None => d match {
+          case t: TraitType if NumeralConversion.defaultName(e).exists(_ == t.getName.getText) &&
+                               t.getArgs.isEmpty =>
+            Left(coercions.buildCoercion(e, t).filter(NumeralConversion.isDefault).getOrElse(e))
+          case _ => Left(e)
+        }
+      }
+      case (a, _) => a
+    }
+  }
+
+  /** Whether a numeral argument fixed a static argument of the candidate at the numeral's own type. */
+  private def numeralFixesOwnType(c: AppCandidate, args: List[Either[Expr, FnExpr]]): Boolean =
+    args.exists(_.left.toOption.exists(NumeralConversion.isNumeral)) &&
+    c.sargs.exists { case STypeArg(_, _, t) => isNumeralType(t); case _ => false }
+
+  /** Signal each numeral argument outside the range of a parameter type of a candidate. */
+  private def signalNumeralRanges(preCandidates: List[PreAppCandidate], args: List[Either[Expr, FnExpr]]): scala.Unit = {
+    if (!args.exists(_.left.toOption.exists(NumeralConversion.isNumeral))) return
+    val ranges = preCandidates.flatMap { pc =>
+      zipWithDomain(args, pc.arrow.getDomain).collect {
+        case (Left(e), p) if NumeralConversion.isNumeral(e) => NumeralConversion.outOfRange(e, p).map((e, _))
+      }.flatten
+    }
+    ranges.distinct.foreach { case (e, m) => signal(e, m) }
+  }
+
   /**
    * Given a receiver type and a method name, return the list of all the arrow types for each
    * method overloading. Ignores any arrows that were for getters or setters.
@@ -1131,7 +1365,8 @@ trait Functionals { self: STypeChecker with Common =>
     }
 
     case SMethodInvocation(SExprInfo(span, paren, _), obj, method, sargs, arg, _, _) =>{
-      val checkedObj = checkExpr(obj)
+      val checkedObj = defaultReceiver(checkExpr(obj),
+        t => getCandidatesForMethod(t, method, sargs, expr).exists(_.nonEmpty))
       val recvrType = getType(checkedObj).getOrElse(return expr)
       val preCandidates = getCandidatesForMethod(recvrType, method, sargs, expr).getOrElse(return expr)
       if (preCandidates.isEmpty) {
@@ -1337,7 +1572,7 @@ trait Functionals { self: STypeChecker with Common =>
                                          errorString("Function body",
                                                      "declared return"))
         case None =>
-          this.extend(params).checkExpr(body)
+          defaultNumeral(this.extend(params).checkExpr(body))
       }
 
       val range = declaredRetType.getOrElse(getType(checkedBody).getOrElse(return expr))
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala
@@ -221,7 +221,9 @@ trait Decls { self: STypeChecker with Common =>
                                                                 "declared return")))
 
         case None =>
-          val newBody = newChecker.checkExpr(body)
+          val newBody =
+            if (NU.isCoercion(f)) newChecker.checkExpr(body)
+            else newChecker.defaultNumeral(newChecker.checkExpr(body))
           val rt = if (NU.isCoercion(f)) None else getType(newBody)
           (rt, newBody)
       }
@@ -249,7 +251,7 @@ trait Decls { self: STypeChecker with Common =>
             }
             case None => lv match {
               case SLValue(info, name, mods, None, mut) =>
-                val newR = checkExpr(r, None)
+                val newR = defaultNumeral(checkExpr(r, None))
                 (SLValue(info, name, mods,
                          Some(getType(newR).getOrElse(return node)), mut),
                  newR)
@@ -286,7 +288,7 @@ trait Decls { self: STypeChecker with Common =>
         // from that.
         case None =>
           // Check the RHS.
-          val newRhs = checkExpr(rhs, None)
+          val newRhs = defaultNumeral(checkExpr(rhs, None))
           val rhsType = getType(newRhs).getOrElse(return node)
           // Get all the LHSes and their corresponding RHS type.
           val lhsAndRhsTypes = lhses match {
@@ -340,7 +342,7 @@ trait Decls { self: STypeChecker with Common =>
             }
             case None => lv match {
               case SLValue(info, name, mods, None, mut) =>
-                val newR = checkExpr(r, None)
+                val newR = defaultNumeral(checkExpr(r, None))
                 (SLValue(info, name, mods,
                          Some(getType(newR).getOrElse(return expr)), mut),
                  newR)
@@ -381,7 +383,7 @@ trait Decls { self: STypeChecker with Common =>
         // from that.
         case None =>
           // Check the RHS.
-          val newRhs = checkExpr(rhs, None)
+          val newRhs = defaultNumeral(checkExpr(rhs, None))
           val rhsType = getType(newRhs).getOrElse(return expr)
           // Get all the LHSes and their corresponding RHS type.
           val lhsAndRhsTypes = lhses match {
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/staticenv/KindEnv.scala
@@ -12,6 +12,7 @@
 package com.sun.fortress.scala_src.typechecker.staticenv
 
 import com.sun.fortress.compiler.Types
+import com.sun.fortress.compiler.WellKnownNames
 import com.sun.fortress.nodes._
 import com.sun.fortress.nodes_util.{NodeFactory => NF}
 import com.sun.fortress.scala_src.nodes._
@@ -66,8 +67,9 @@ abstract sealed class KindEnv extends StaticEnv[StaticParam] {
   def getType(x: Name): Option[Type] = lookup(x).flatMap(b =>
     b.sparam.getKind match {
       case _:KindBool => Some(Types.BOOLEAN)
-      case _:KindInt => Some(Types.INT_LITERAL)
-      case _:KindNat => Some(Types.INT_LITERAL)
+      // A size used as a value is a ZZ32.
+      case _:KindInt => Some(KindEnv.sizeValueType)
+      case _:KindNat => Some(KindEnv.sizeValueType)
       case _ => None
     })
 
@@ -102,6 +104,17 @@ object KindEnv extends StaticEnvCompanion[StaticParam] {
   /** My type. */
   type Env = KindEnv
 
+  /**
+   * The type of a nat or int static parameter used as a value: ZZ32, which
+   * the compiler's prelude declares in its builtin api and the one library in
+   * its library api.
+   */
+  def sizeValueType: Type =
+    NF.makeTraitType(NF.makeId(NF.internalSpan,
+                               if (WellKnownNames.areCompilerLibraries) WellKnownNames.fortressBuiltin
+                               else WellKnownNames.fortressLibrary,
+                               "ZZ32"))
+
   /** My binding type. */
   type EnvBinding = KindBinding
 
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala b/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala
--- a/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala
@@ -1143,8 +1143,9 @@ object STypesUtil {
     }
 
     // Determine if a coercion occurred.
-    val coercion1 = !promoted1 && args1.exists(_.isInstanceOf[CoercionInvocation])
-    val coercion2 = !promoted2 && args2.exists(_.isInstanceOf[CoercionInvocation])
+    // A numeral's conversion into its default type is no coercion here.
+    val coercion1 = !promoted1 && args1.exists(com.sun.fortress.scala_src.typechecker.NumeralConversion.counts)
+    val coercion2 = !promoted2 && args2.exists(com.sun.fortress.scala_src.typechecker.NumeralConversion.counts)
     lazy val d1 = declared1.getOrElse(candidate1.arrow)
     lazy val d2 = declared2.getOrElse(candidate2.arrow)
 
```

#### STypeChecker.scala and Misc.scala diffs (the checker files the batch also changed)

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/STypeChecker.scala
@@ -417,6 +417,32 @@ abstract class STypeChecker(val current: CompilationUnitIndex,
    */
   def checkExpr(expr: Expr, expected: Option[Type]): Expr
 
+  /**
+   * A numeral where nothing fixes a type, at an untyped binding, takes its
+   * default; so does each numeral of a tuple and the branches of a join
+   * (Functionals).
+   */
+  def defaultNumeral(e: Expr): Expr
+
+  /**
+   * A numeral at a place of type p that holds it without conversion and does
+   * not fix a type, as Any, Object or Number do, takes its default there,
+   * where the default fits p too (Functionals).
+   */
+  def defaultAtUnfixed(e: Expr, p: Type): Expr
+
+  /**
+   * A numeral at a place of type p that declares no coercion from the
+   * numeral's type: its default, where the default fits p (Functionals).
+   */
+  def defaultFits(e: Expr, p: Type): Option[Expr]
+
+  /**
+   * A numeral written as a dotted receiver takes its default where the
+   * default type has the member (Functionals).
+   */
+  def defaultReceiver(e: Expr, has: Type => Boolean): Expr
+
   // ---------------------------------------------------------------------------
   // CONCRETE DEFINITIONS ------------------------------------------------------
 
@@ -477,16 +503,21 @@ abstract class STypeChecker(val current: CompilationUnitIndex,
                           msgAndLoc: Option[(String, HasAt)]): Expr = {
     val checkedExpr = checkExpr(expr, Some(expected))
     getType(checkedExpr) match {
-      case Some(typ) if isSubtype(typ, expected) => checkedExpr
+      case Some(typ) if isSubtype(typ, expected) => defaultAtUnfixed(checkedExpr, expected)
       case Some(typ) =>
-        // Try to build a coercion of checkedExpr to the expected type.
-        coercions.buildCoercion(checkedExpr, expected).getOrElse {
+        // Try to build a coercion of checkedExpr to the expected type, or, for
+        // a numeral at a type that declares none from its own, its default.
+        coercions.buildCoercion(checkedExpr, expected).orElse(defaultFits(checkedExpr, expected)).getOrElse {
           msgAndLoc match {
             case Some((message, location)) =>
-              val someE = Some(expected)
-              val checkedExpr2 = checkExpr(expr, someE) // Repeat calculation for debugging
-              val checkedExpr3 = checkExpr(expr, someE) // Repeat calculation for debugging
-              signal(location, message.format(normalize(typ), normalize(expected)))
+              NumeralConversion.outOfRangeAt(checkedExpr, expected) match {
+                case Some((at, range)) => signal(at, range)
+                case None =>
+                  val someE = Some(expected)
+                  val checkedExpr2 = checkExpr(expr, someE) // Repeat calculation for debugging
+                  val checkedExpr3 = checkExpr(expr, someE) // Repeat calculation for debugging
+                  signal(location, message.format(normalize(typ), normalize(expected)))
+              }
             case None =>
           }
           expr
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala
--- a/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala
+++ b/ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala
@@ -344,7 +344,7 @@ trait Misc { self: STypeChecker with Common =>
   def checkExprMisc(expr: Expr, expected: Option[Type]): Expr = expr match {
 
     case fr@SFieldRef(SExprInfo(span, parens, _),obj,field) => {
-      val checkedObj = checkExpr(obj)
+      val checkedObj = defaultReceiver(checkExpr(obj), t => getGetterType(field, t).isDefined)
       val recvrType = getType(checkedObj).getOrElse(return expr)
       val fieldType = getGetterType(field, recvrType)
       fieldType match {
```

#### nativeHelpers/simpleDoubleArith.java (the rounding helpers both numeral types' asFloat and the RR64/RR32 coercions call)

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java b/ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java
--- a/ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java
+++ b/ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java
@@ -261,4 +261,48 @@ public class simpleDoubleArith {
         return Double.longBitsToDouble(a);
     }
 
+    /**
+     * A numeral's value v / r^m, for v not negative, rounded once to the
+     * nearest double, ties to even.
+     */
+    public static double numeralToDouble(java.math.BigInteger v, int r, int m) {
+        if (v.signum() == 0) return 0.0;
+        java.math.BigInteger den = java.math.BigInteger.valueOf(r).pow(m);
+        int lsb = lsbExponent(v, den, 53, -1074);
+        return Math.scalb(roundedQuotient(v, den, lsb).doubleValue(), lsb);
+    }
+
+    /**
+     * A numeral's value v / r^m, for v not negative, rounded once to the
+     * nearest float, ties to even.
+     */
+    public static float numeralToFloat(java.math.BigInteger v, int r, int m) {
+        if (v.signum() == 0) return 0.0f;
+        java.math.BigInteger den = java.math.BigInteger.valueOf(r).pow(m);
+        int lsb = lsbExponent(v, den, 24, -149);
+        return Math.scalb(roundedQuotient(v, den, lsb).floatValue(), lsb);
+    }
+
+    /**
+     * The exponent of the last significand bit of num / den in a binary
+     * format of p significand bits whose least subnormal is 2^least.
+     */
+    private static int lsbExponent(java.math.BigInteger num, java.math.BigInteger den, int p, int least) {
+        int e = num.bitLength() - den.bitLength();
+        boolean atLeast = e >= 0 ? num.compareTo(den.shiftLeft(e)) >= 0 : num.shiftLeft(-e).compareTo(den) >= 0;
+        int top = atLeast ? e : e - 1;
+        return Math.max(top - (p - 1), least);
+    }
+
+    /** num / den / 2^lsb rounded to the nearest integer, ties to even. */
+    private static java.math.BigInteger roundedQuotient(java.math.BigInteger num, java.math.BigInteger den, int lsb) {
+        java.math.BigInteger n = lsb <= 0 ? num.shiftLeft(-lsb) : num;
+        java.math.BigInteger d = lsb <= 0 ? den : den.shiftLeft(lsb);
+        java.math.BigInteger[] qr = n.divideAndRemainder(d);
+        int c = qr[1].shiftLeft(1).compareTo(d);
+        java.math.BigInteger q = qr[0];
+        if (c > 0 || (c == 0 && q.testBit(0))) q = q.add(java.math.BigInteger.ONE);
+        return q;
+    }
+
 }
```

## 3.5 Greps at 7daf51fe8a

#### asFloat declared or called on a numeral type, Library/ and ProjectFortress/src/ (git grep -n asFloat | grep -i numeral), and the numeral-related lines near it
```
Library/FortressLibrary.fss:389:    coerce(x: NaturalNumeral) = asFloat(x)
Library/FortressLibrary.fss:390:    coerce(x: RadixPointNumeral) = asFloat(x)
Library/FortressLibrary.fss:699:    asFloat(self): RR64 = numeralRR64(digitValue, radix, 0)
Library/FortressLibrary.fss:716:    asFloat(self): RR64 = numeralRR64(digitValue, radix, fractionDigits)
```
All other asFloat lines: Library/ 91 lines, ProjectFortress/src 3 lines (comments of the nativeHelpers for ZZ, ZZ64, NN64); none on a numeral type. Also the numeral helpers by name:
```
Library/FortressLibrary.fss:669:private numeralRR64(v: ZZ, r: ZZ32, m: ZZ32): RR64 =
Library/FortressLibrary.fss:670:    builtinPrimitive("com.sun.fortress.nativeHelpers.simpleDoubleArith.numeralToDouble")
Library/FortressLibrary.fss:699:    asFloat(self): RR64 = numeralRR64(digitValue, radix, 0)
Library/FortressLibrary.fss:716:    asFloat(self): RR64 = numeralRR64(digitValue, radix, fractionDigits)
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:209:private numeralRR32(v: ZZ, r: ZZ32, m: ZZ32): RR32 =
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:210:    builtinPrimitive("com.sun.fortress.nativeHelpers.simpleDoubleArith.numeralToFloat")
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:214:    coerce(x: NaturalNumeral) = numeralRR32(x.digitValue, x.radix, 0)
ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:215:    coerce(x: RadixPointNumeral) = numeralRR32(x.digitValue, x.radix, x.fractionDigits)
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:213:            double d = simpleDoubleArith.numeralToDouble(v, r, m);
ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:268:    public static double numeralToDouble(java.math.BigInteger v, int r, int m) {
ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:279:    public static float numeralToFloat(java.math.BigInteger v, int r, int m) {
```

#### where a numeral object is constructed at run time: the library's constructors named in src (git grep -n 'NaturalNumeral\|RadixPointNumeral' ProjectFortress/src), and calls of Numerals.object / Numerals.integer / Numerals.radixPoint
```
ProjectFortress/src/com/sun/fortress/compiler/Types.java:77:     * libraries name NaturalNumeral and RadixPointNumeral.
ProjectFortress/src/com/sun/fortress/compiler/Types.java:94:        INT_LITERAL = makeTraitType(span, fortressLibrary(), "NaturalNumeral");
ProjectFortress/src/com/sun/fortress/compiler/Types.java:95:        FLOAT_LITERAL = makeTraitType(span, fortressLibrary(), "RadixPointNumeral");
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:89:     * The coercion to target from the numeral v's own type, NaturalNumeral or
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:90:     * RadixPointNumeral: the one of target's coercions whose parameter type
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:38: * numbers: into a numeral type as the library's NaturalNumeral or
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:39: * RadixPointNumeral object, and into any other type through that type's
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:280:    /** The numeral's own type, NaturalNumeral or RadixPointNumeral, or null where the library has none. */
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:283:        return libraryType(((Numeral) v).site().radixPoint ? "RadixPointNumeral" : "NaturalNumeral");
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:292:    /** The library's NaturalNumeral or RadixPointNumeral object of the numeral v, one for its site. */
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:302:                Fcn c = (Fcn) library().getRootValue(s.radixPoint ? "RadixPointNumeral" : "NaturalNumeral");
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:407:    /** Whether o is the library's NaturalNumeral or RadixPointNumeral object. */
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:412:        if (!n.equals("NaturalNumeral") && !n.equals("RadixPointNumeral")) return false;
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:448:        return o.type().getName().equals("RadixPointNumeral") ? intField(o, "fractionDigits") : 0;
---
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1633:        return Numerals.radixPoint(x);
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/Evaluator.java:1637:        return Numerals.integer(x);
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:282:        if (Numerals.fitsAsIs(target, v)) return Numerals.object(v);
ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:444:                    res.set(j, Numerals.object(oargs.get(j)));
---
Library/FortressLibrary.fsi:466:value object NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral
Library/FortressLibrary.fsi:484:value object RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral
Library/FortressLibrary.fss:696:value object NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral
Library/FortressLibrary.fss:710:value object RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ) extends Numeral
```

#### the compiled path's numeral values (prelude's IntLiteral/FloatLiteral, unchanged by the batch): git diff --stat of runtimeValues and of the prelude
```
(empty above means unchanged)
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java b/ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java
--- a/ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java
+++ b/ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java
@@ -11,19 +11,15 @@
 
 package com.sun.fortress.interpreter.glue.prim;
 
-import com.sun.fortress.interpreter.evaluator.Environment;
-import com.sun.fortress.interpreter.evaluator.types.FTraitOrObjectOrGeneric;
+import com.sun.fortress.interpreter.evaluator.types.FTraitOrObject;
 import com.sun.fortress.interpreter.evaluator.types.FType;
 import com.sun.fortress.interpreter.evaluator.types.FTypeArrow;
-import com.sun.fortress.interpreter.evaluator.types.FTypeObject;
 import com.sun.fortress.interpreter.evaluator.types.FTypeTuple;
 import com.sun.fortress.interpreter.evaluator.types.GenericTypeInstance;
+import com.sun.fortress.interpreter.evaluator.types.LanguageTypes;
 import com.sun.fortress.interpreter.evaluator.values.FObject;
 import com.sun.fortress.interpreter.evaluator.values.FString;
 import com.sun.fortress.interpreter.glue.NativeMeth0;
-import com.sun.fortress.nodes.Component;
-import com.sun.fortress.nodes_util.NodeUtil;
-import com.sun.fortress.useful.HasAt;
 
 /**
  * Functions from String.
@@ -50,38 +46,13 @@ public class ObjectPrims {
         }
     }
 
-    /** The component that declares the native number objects. */
-    static final java.lang.String NUMBERS_COMPONENT = "FortressBuiltin";
-
-    /**
-     * The trait that a native number object of the library stands for, or null: Int, Long, BigNum,
-     * Float and UnsignedLong of FortressBuiltin, told by the component that declares them, so that a
-     * program's own type of one of these names keeps its name.
-     */
-    static java.lang.String traitOf(FType t) {
-        if (!(t instanceof FTypeObject) || t instanceof GenericTypeInstance) return null;
-        java.lang.String n = t.getName();
-        java.lang.String trait =
-            "Int".equals(n) ? "ZZ32" : "Long".equals(n) ? "ZZ64" : "BigNum".equals(n) ? "ZZ"
-            : "Float".equals(n) ? "RR64" : "UnsignedLong".equals(n) ? "NN64" : null;
-        if (trait == null) return null;
-        Environment e = ((FTraitOrObjectOrGeneric) t).getWithin();
-        if (e == null) return null;
-        try {
-            HasAt at = (e.isTopLevel() ? e : e.getTopLevel()).getAt();
-            return at instanceof Component
-                && NUMBERS_COMPONENT.equals(NodeUtil.nameString(((Component) at).getName())) ? trait : null;
-        } catch (RuntimeException x) {    // an environment with no top level
-            return null;
-        }
-    }
-
     /**
-     * The type's text, as FType.toString gives it, with each native number object of the library
-     * named by its trait, at the top level and inside static arguments, tuples and arrows.
+     * The type's text, with each native number object of the library named by its trait, at the top
+     * level and inside static arguments, tuples and arrows, and every other trait or object, the
+     * library's string objects among them, by its own name.
      */
     static java.lang.String ilk(FType t) {
-        java.lang.String trait = traitOf(t);
+        java.lang.String trait = LanguageTypes.numberTraitName(t);
         if (trait != null) return trait;
         if (t instanceof GenericTypeInstance)
             return t.getName() + "[\\" + ilks(((GenericTypeInstance) t).getTypeParamsForName()) + "\\]";
@@ -90,6 +61,7 @@ public class ObjectPrims {
             FTypeArrow a = (FTypeArrow) t;
             return ilk(a.getDomain()) + "->" + ilk(a.getRange());
         }
+        if (t instanceof FTraitOrObject) return t.getName();
         return t.toString();
     }
 
```

#### git diff b430f9f428 7daf51fe8a -- ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java
```diff
diff --git a/ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java b/ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java
--- a/ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java
+++ b/ProjectFortress/src/com/sun/fortress/nativeHelpers/equalityRule.java
@@ -8,6 +8,7 @@ import com.sun.fortress.compiler.runtimeValues.FBoolean;
 import com.sun.fortress.compiler.runtimeValues.FCharacter;
 import com.sun.fortress.compiler.runtimeValues.FFloatLiteral;
 import com.sun.fortress.compiler.runtimeValues.FIntLiteral;
+import com.sun.fortress.compiler.runtimeValues.FJavaString;
 import com.sun.fortress.compiler.runtimeValues.FNN32;
 import com.sun.fortress.compiler.runtimeValues.FNN64;
 import com.sun.fortress.compiler.runtimeValues.FRR32;
@@ -59,7 +60,10 @@ final class equalityRule {
             return Double.doubleToRawLongBits(((FFloatLiteral) a).asRR64().getValue())
                 == Double.doubleToRawLongBits(((FFloatLiteral) b).asRR64().getValue());
         if (a instanceof ValueObjectMark) return fields(ca, a, b);
-        // Every other value, a string among them, is a reference object.
+        // A string is a reference object, one with the Java string it carries:
+        // two string literals of one text carry one interned Java string.
+        if (a instanceof FJavaString) return ((FJavaString) a).getValue() == ((FJavaString) b).getValue();
+        // Every other value is a reference object.
         return false;
     }
 
```

# 4. The record: explorations/coordinator/FACTS.md, git diff -U0 b430f9f428 7daf51fe8a, entries naming a numeral type

`git diff --stat b430f9f428 7daf51fe8a -- explorations/coordinator/FACTS.md explorations/coordinator/POSITIONS.md` lists FACTS.md only (37 insertions, 29 deletions): POSITIONS.md did not change.

OLD (b430f9f428:FACTS.md:30) - F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that 52 of the one library's 424 live native bindings still name.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 372 that name one, and the 52 by type). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 29 were object `IntLiteral`'s (`FortressBuiltin.fss:549-629`), 4 among the 154 and 25 among the 158. Its 8 conversions and comparisons are Fortress text over its `asZZ` (F-331). Its other 21 cannot move yet, since their helpers take and answer the compiled path's `IntLiteral`, which walk's values cannot be, and walk reaches no `IntLiteral` native while its numeral is an `Int` (P-76; row 578). `println` writes through `stdOut`, a plain Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330). MicroGPT's `nanoTime` names a helper (F-314), and so does `System`'s `args`, which `System` builds as it loads (F-337). Of the 42 with no compiled analogue, `NativeArray`'s 7 name `arrayOps` helpers (F-333), `Thread`'s four, `abort` and `printTaskTrace` name `runtime` helpers (F-335), `getProgramArgsPrim` is deleted (P-170), and `Reflect`'s 28, off microGPT's path, name glue classes. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

NEW (7daf51fe8a:FACTS.md:30) - F-32 **The compiled path cannot reuse walk's glue classes, the Java classes that 28 of the one library's 402 live native bindings still name.** A native binding is a library body `builtinPrimitive("…")`; its string names a glue class, which takes walk's boxed values, or a static helper of `nativeHelpers/`, over plain Java values, which both paths call (F-298; F-299 holds the 374 that name one, and the 28 by type). Matched against those helpers at `a1f8c4b8b`, before any binding moved, the 449 were: 154 whose operation the compiler's prelude already binds to a helper at the same owner and signature, so only the binding's string changes, to name that helper (P-58); 59 whose helper exists, but no binding names it under that name and signature, 23 of them under a name that the compiler's prelude gives to another helper, such as the 12 wrapping operators (row 348); 158 that need a new helper; and 78 that need more, 36 methods of native I/O objects and 42 with no compiled analogue. Of the 449, 29 were object `IntLiteral`'s (`FortressBuiltin.fss:549-629` at `a1f8c4b8b`), 4 among the 154 and 25 among the 158; its 8 conversions and comparisons were then Fortress text over its `asZZ`. Its other 21, and `FloatLiteral`'s 3, left the one library with the two objects, whose place the numeral types `NaturalNumeral` and `RadixPointNumeral` take (F-79; row 578). `println` writes through `stdOut`, a plain Fortress `Writer` over `JavaBufferedWriter`, whose natives name `fileOps` helpers (F-330). MicroGPT's `nanoTime` names a helper (F-314), and so does `System`'s `args`, which `System` builds as it loads (F-337). Of the 42 with no compiled analogue, `NativeArray`'s 7 name `arrayOps` helpers (F-333), `Thread`'s four, `abort` and `printTaskTrace` name `runtime` helpers (F-335), `getProgramArgsPrim` is deleted (P-170), and `Reflect`'s 28, off microGPT's path, name glue classes. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `perf-probes/prelude/natives-shape.md` section 2; `coordinator/CLIMB-BATCH-23.md`, section 4, "The planner's probes", "On the new base" and "The count".

OLD (b430f9f428:FACTS.md:54) - F-57 **A numeral's type depends on the path and on the library in scope, and in generic code only the getters `x.zero` and `x.one` and the witness `typecase` give a `T` on both paths.** The witness `typecase` is a `typecase` over a function of type `() -> T`, with one clause for each number type (P-78). The checker types a numeral `IntLiteral` or `FloatLiteral` by its form, as the builtin library in scope declares those types (F-79). Walk types an integer numeral by its magnitude, as a `ZZ32`, `ZZ64` or `ZZ`, which it prints by those names (F-328). In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy. A numeral bound to `NN32` or `NN64` fails under walk, and `1.5` bound to `RR32` fails on both paths (row 454). Neither path refuses an out-of-range numeral statically: the compiled run raises `Not in range for ZZ32` at run time, and walk refuses it when it runs, at the typed binding it does not fit (row 325). Walk also refuses, against the specification, a numeral beyond `ZZ32`'s range bound to `RR64`, which should hold the float (row 443). Detail: `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2, measured before the numeral switch (F-79); `x.zero` by reading, not measured.

NEW (7daf51fe8a:FACTS.md:54) - F-57 **A numeral's type depends on the path and on the library in scope, and in generic code only the getters `x.zero` and `x.one` and the witness `typecase` give a `T` on both paths.** The witness `typecase` is a `typecase` over a function of type `() -> T`, with one clause for each number type (P-78). The checker types a numeral by its form, `IntLiteral` or `FloatLiteral` under the compiler's prelude and `NaturalNumeral` or `RadixPointNumeral` under the one library (F-79), and converts it into its default where nothing fixes a type (F-342). Walk gives an integer numeral where nothing fixes a type its default by its magnitude, a `ZZ32`, `ZZ64` or `ZZ`, which it prints by those names, and converts it where its place fixes a type (F-341). In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk: no coercion from a numeral into an arbitrary such `T` can be declared, since a generic coercion is refused as a cyclic hierarchy. The checker refuses a numeral outside a bounded number type's range, or rounding to an infinity, statically, and walk refuses an integer numeral out of range when it runs, at the place it does not fit (F-342, F-341). Detail: `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2, measured before the numeral switch (F-79); `x.zero` by reading, not measured.

OLD (b430f9f428:FACTS.md:71) - F-74 **Under walk, an integer numeral takes its type from its value: a `ZZ32` if it fits 32 bits, a `ZZ64` if it fits 64 bits, a `ZZ` above that; it stays so until walk has the checker's static types, since without them a list of numerals and a generic's static argument take their types from the values.** Its run-time type is the library's value object `Int`, `Long` or `BigNum`, below `ZZ32`, `ZZ64` and `ZZ` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`, `:128`, `:223`). Walk instantiates a generic at it, so a `Box[\Int\]` is a type apart from `Box[\ZZ32\]` and dispatches past it (row 364). F-74 is why P-76's walk half waits; F-79 is the library half, built. Probe Q (`compile-ladder/plan-n/probe-q/PROBE-Q.md`) measured walk with every integer numeral an `IntLiteral`, the numeral's own type in the library. It ran before climb batch N's second run and before the library half landed. Alone, the switch changed 59 test verdicts. With four devices (a numeral at an `AnyIntegral` parameter read as `ZZ32`, `ZZ64` or `ZZ`, a tuple of numerals converted at dispatch, `asif` converting, a varargs list converted at dispatch), the library loaded and both microGPT checks kept their values, but 24 passing interpreter tests failed: 6 by design, 3 of them team tests that assert a `ZZ32`; 9 for want of static types (rows 364, 510); and 9 walk gaps. A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above (row 486; F-140). Detail: `reviews/numeral-switch-judgement.md` sections 2 and 3.

NEW (7daf51fe8a:FACTS.md:71) - F-74 **Under walk, an integer numeral takes its type from its value: a `ZZ32` if it fits 32 bits, a `ZZ64` if it fits 64 bits, a `ZZ` above that; it stays so until walk has the checker's static types, since without them a list of numerals and a generic's static argument take their types from the values.** Where a place fixes a type, walk converts the numeral from its four numbers (F-341). Its run-time type is the library's value object `Int`, `Long` or `BigNum`, below `ZZ32`, `ZZ64` and `ZZ` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fsi:125`, `:128`, `:223`). Walk reads it at its trait where it infers a static argument, so `Box(3)` is a `Box[\ZZ32\]` (F-344). F-74 is why P-76's walk half waits; F-79 is the library half, built. Probe Q (`compile-ladder/plan-n/probe-q/PROBE-Q.md`) measured walk with every integer numeral an `IntLiteral`, the numeral's own type in the library. It ran before climb batch N's second run and before the library half landed. Alone, the switch changed 59 test verdicts. With four devices (a numeral at an `AnyIntegral` parameter read as `ZZ32`, `ZZ64` or `ZZ`, a tuple of numerals converted at dispatch, `asif` converting, a varargs list converted at dispatch), the library loaded and both microGPT checks kept their values, but 24 passing interpreter tests failed: 6 by design, 3 of them team tests that assert a `ZZ32`; 9 for want of static types (rows 364, 510); and 9 walk gaps. A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above, where P-173 makes it a `ZZ32` (F-140; row 962). Detail: `reviews/numeral-switch-judgement.md` sections 2 and 3.

OLD (b430f9f428:FACTS.md:76) - F-79 **In the interpreter's library, `IntLiteral`, the type that the compiled checker gives an integer numeral, is declared on the model of the compiler's prelude: a sibling of the number types under `Number`, which each integer type, `QQ`, `RR64` and `AnyIntegral` convert from by coercion.** It builds the library half of P-76. Under walk a numeral is still a `ZZ32`, `ZZ64` or `ZZ`, so no numeral reaches these declarations until walk's half is built (F-74). `IntLiteral` declares itself the members of `Integral[\I\]` that a numeral could not reach, among them the getters `zero` and `one`, `odd`, `even`, `floor` and `DIVIDES`. There are three reasons: for some, no declaration of `Integral` applies to a sibling type even with coercion; for others, the declarations that apply by coercion tie; and a getter must be the type's own member. Each integer type declares its own comparisons, `CMP`, `MAXNUM` and `MINNUM`, and a `^` with an `IntLiteral` exponent. Without them, a typed integer with a numeral operand ties between a declaration inherited from a generic trait and the same operator's own declarations in `ZZ64`, `QQ` and `RR64`. The compiled checker refuses `(3).minimum` and `(3).maximum`, `ZZ32`'s getters (row 581). Gated under walk by `tests/IntegerOrderNumerals.fss`, which checks each integer type's own comparisons, `MAXNUM` and `MINNUM`. Detail: `compile-ladder/rung-numeral-library/REPORT.md` sections 4 and 6.

NEW (7daf51fe8a:FACTS.md:76) - F-79 **In the interpreter's library, the numeral types are `NaturalNumeral` and `RadixPointNumeral`, value objects below `trait Numeral`, a sibling of the number types under `Number`, whose fields are the four numbers, and each of the eight number types converts from them with an `=` pair both ways.** It builds P-174, P-76 and P-172 in the one library (`Library/FortressLibrary.fsi`, `Numeral`): the five integer types and `QQ` convert from `NaturalNumeral` exactly, `QQ` from `RadixPointNumeral` as `digitValue / radix^fractionDigits`, and `RR64` and `RR32` from both by one rounding through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`; `RR64` comprises `Float` alone. The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under the one library and the prelude's `IntLiteral` and `FloatLiteral` under the compiler's (`compiler/Types.java`). Under walk a numeral reaches these declarations where its place fixes a type (F-341). The compiled checker refuses `(3).minimum` and `(3).maximum`, `ZZ32`'s getters (row 581). Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, and the count stage's 0. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

OLD (b430f9f428:FACTS.md:81) - F-84 **In the interpreter's library, the result-only type parameters of `fail`, `builtinPrimitive` and `List`'s comprehension operator `BIG <|[\T\]|>` are unbounded, as the team declared them, and the same rung repaired 25 of the compiled checker's 60 one-off error sites in numbers, orderings, `List` and natives, each by a declared type, a body or an api header, in forms that the library already uses.** A result-only parameter occurs only in the result type. P-48 gives it the intersection of its upper bounds, narrowed by the expected type, so where `()` is expected its instance is `()`. The rung also made `MatchFailure` an unchecked exception: it extends `UncheckedException` (row 590). The sites that it left have rows (report section 5). Limit: under walk the name `IntLiteral` also denotes a value, a zero that no numeral reaches, and its arithmetic answers a `ZZ32` against its declared `IntLiteral` (row 578). F-263 holds the integer powers' types, and F-255 `List`'s ordering. The compiler's prelude has instead `fail(s: String): Zilch` (`Library/CompilerLibrary.fsi:33`), a declared bottom result that Steele put in place of the generic `fail` in `0886e9654` (2011-06-13), and it does not bind the one library, since the team's later word makes `Bottom` inexpressible in a program (the 2012 Types chapter; POPL 2019, `research/extracts/ParkPOPL2019.txt:437-438`) and binds an unfixed parameter by its bounds and the expected type, P-48's rule; walk cannot evaluate `Zilch`. Gated under walk by `tests/NumberOrderListDeclarations.fss`. Detail: `compile-ladder/rung-number-order-slips/REPORT.md` sections 1, 4 and 5.

OLD (b430f9f428:FACTS.md:119) - F-278 **The library's subscripts over a generic index type are a valid overloading at every instance: the index parameter is bounded by `Index`, which `ZZ32` extends and the ranges exclude, and a tuple type whose element types are all `Index` types is an `Index`, outside `Object`, on both paths.** Under the full check of symbolic operators the 124 subscript errors of F-245 are gone and none comes (191 to 67 with this change alone, on climb batch 21's base, F-245); the stock count (3) and distance (5) do not move. The checker and walk read the library's trait by its qualified name, so a program's own `Index` is not it, though walk refuses a program's own top-level type named `Index` as ambiguous with the library's ('Type name may refer to: Index, FortressLibrary.Index'), as it refuses one named `Indexed`; `()` is no `Index` on either path; a type that extends only `Index` is an `Object`; a program's generic over an indexed type's index parameter must bound it by `Index` for the checker; a numeral is no `Index` to the checker (an `IntLiteral`); the checker refuses a tuple expression at a function over `Index` (row 805); walk loads a function over `Index` beside one over a tuple type whose elements neither lie below nor exclude `Index`, which the checker refuses (row 806). Gated by `tests/TupleIndexBoundWalk.fss` and, for walk's exclusion, `tests/TupleIndexExclusionWalk.fss` with its `.test`; the checker's half by the distance stage, which checks every operator (F-281). Detail: `compile-ladder/rung-index-bound/REPORT.md` sections 1, 5 and 6.

OLD (b430f9f428:FACTS.md:134) - F-299 **Walk loads a `builtinPrimitive` string that names a static helper of `nativeHelpers/` beside its glue classes, and 372 of the one library's 424 live bindings name one.** It builds P-58, "Every native binding is a ...", whose compiled half F-298 gives. The loader (`interpreter/glue/StaticNativeApp.java`) calls the overload whose Java types carry the declared types, `self` first, and raises a helper's `fortress.<Api>$<Name>` as the library's `<Name>`. It refuses at load a string that names no helper or fits none, and a declared type that no Java type carries, `self`'s among them, read from the declaring type. For 15 names it runs walk's own operations instead and loads no helper: eight by the table `OWN_OPERATIONS` of `interpreter/glue/NativeApp.java`, `stringOps.typeName` and `equality.sEquiv` (F-328) and `runtime`'s six (F-335), and `arrayOps`' seven by one rule (F-333). The library's own `FlatString`, identified by the component that declares it, carries `self` in a Java `String`; a program's own type named `FlatString` or `JavaString` carries none. The `fortress-repo` skill's `references/interpreter.md`, "Natives", gives the carriers, the messages, the refusal of a helper parameter declared `String`, and the loader's departures (rows 864, 551 and 846). The 372 by type: `ZZ32` 29 and `Int` 3, `ZZ64` 31 and `ZZ` 28 (F-306, F-327, F-331; their `CHOOSE` F-305, `REM` and `MOD` F-312, divisors F-314), `Float` 62 and the top-level `fromRawBits` (F-303, F-323), `RR32` 51 (F-310, its `asFloat` F-311), the `asFloat`s of `Long` and `BigNum` 2 (F-311), the small rest 8 (F-307), and `NN32` 30, `NN64` 28, `UnsignedLong` 3 and `Char` 40 (F-308, F-313, F-327, F-331), the top-level `nanoTime` (F-314) and `random` (F-323), `Object`'s `ilkName` and `SEQV` over `Any` (F-328), `JavaBufferedWriter`'s 7 (F-330), `JavaBufferedReader`'s 10 (F-332), the array stores' 7 (F-333), `runtime`'s 6 (F-335), `System`'s `args` 2 (F-337), and the string family's 20: `FlatString`'s 13 methods; `natLineSeparator`; `match`; and `printThreadInfo`, `printWithThread`, `printlnWithThread`, `getEnvironment` and `getProperty`, each a native over `FlatString` beside an overload over `String` that flattens in a `typecase`. The other 52 name glue classes: `IntLiteral`'s 21, `FloatLiteral`'s 3 and `Reflect`'s 28 (F-32). Test: `tests/NativeHelperBindingWalk.fss`, `NativeHelperRaiseWalk`, `ZZ32DivisionByZeroWalk`, `NativeHelperFamilyZZ32Walk`, `NativeHelperCarriedSelfFlatStringWalk`, `NativeHelperStringRopeWalk`, `compiler_tests/NativeHelperFamilyStringCompiled`, and the refusals `NativeHelperMisspeltWalk`, `NativeHelperMisfitWalk`, `NativeHelperUncarriedWalk`, `NativeHelperUncarriedSelf*Walk` and `NativeHelperNonFlatStringWalk`; the entries of the other families name their own tests. Detail: `compile-ladder/climb-batch-28/RECORD.md`, "The count of the bindings"; `compile-ladder/rung-natives-walk/REPORT.md`, "What changed and why"; `compile-ladder/rung-natives-self/REPORT.md`, "What changed and why"; `compile-ladder/rung-string-natives/REPORT.md`, "What changed and why".

OLD (b430f9f428:FACTS.md:152) - F-328 **Walk answers the compiled helpers `stringOps.typeName` and `equality.sEquiv` with its own operations, and its ilk names the five native number objects by their traits.** The one library binds `Object.ilkName` to `stringOps.typeName` and `SEQV` over `Any` to `equality.sEquiv` (P-58's form); walk's loader maps the two names, before it looks for a helper, to `ObjectPrims$ClassName` and `AnyPrim$SEquiv` (`interpreter/glue/NativeApp.java`, `OWN_OPERATIONS`, a table that holds `runtime`'s six names too, F-335), so it never loads the two helpers. `Object.asString` is `self.ilkName`. Walk's ilk prints `Int`, `Long`, `BigNum`, `Float` and `UnsignedLong` of `FortressBuiltin` as `ZZ32`, `ZZ64`, `ZZ`, `RR64` and `NN64`, also inside static arguments, tuples and arrows; other types, strings, `Char`, `Ratio`, `FloatLiteral` among them, keep their names, and walk still instantiates generics at the run-time class (F-74). Tests: `tests/AnyNativesIntrinsicWalk`, `compiler_tests/AnyNativesIntrinsicCompiled`. Detail: `compile-ladder/rung-any-carrier/REPORT.md`, "What changed and why".

NEW (7daf51fe8a:FACTS.md:161) - F-342 **The compiled checker converts a numeral where nothing fixes a type into its default, refuses one out of range, and refuses a numeral type written other than as a parameter's type.** Where no place's type has a coercion from the numeral's type or is a numeral type (an untyped binding, `Any`, `Object`, `Number`, an unbounded type parameter, a receiver, a join, a result with no declared return type), a numeral becomes a `ZZ32`, or a `ZZ64` or `ZZ` by its value, or an `RR64` with a radix point; a type parameter that numerals alone fix takes the narrowest default holding them all; the conversion into the default ranks as no coercion; a numeral outside a bounded number type's range, or rounding to an infinity, is a static error, also as a tuple's element at a tuple type; a program's type with no coercion from the numeral's type refuses a numeral; `IntLiteral` and `FloatLiteral` are written in a program only as a parameter's type; a `nat` or `int` parameter read as a value is a `ZZ32`. It builds P-173's checker, P-174's written-only rule and P-40's size value; a `typecase`'s selector keeps the numeral's type (row 963). Tests: `compiler_tests/LiteralDefaultCompiled`, `LiteralDefaultResultCompiled`, `XXXLiteralTypeUnwritable.test`, `XXXNumeralBeyondZZ32Range.test`, `XXXNumeralBeyondRangeInTuple.test`, `NatValueZZ32Compiled`. Detail: `compile-ladder/rung-numeral-checker/REPORT.md`, "1. What changed and why".

OLD (b430f9f428:FACTS.md:187) - F-118 **A numeral's value reaches the compiled world intact, and the compiled path prints a large `NN32` or `NN64` value unsigned, but it cannot compare a numeral beyond `ZZ64` with another numeral.** The code generator carries a numeral as an `int`, a `long` or its decimal string, by its exact bit length. So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk refuses a numeral bound to `NN32` or `NN64`, F-57). The compiled path prints an `NN32` or `NN64` value above its type's signed half unsigned (F-313; test `compiler_tests/UnsignedPrintingCompiled`). It compares two `IntLiteral`s at `ZZ64`, so `a = 18446744073709551615` then `a < 5` fails with `Not in range for ZZ64` (row 328), which no test pins. An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it. Walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

NEW (7daf51fe8a:FACTS.md:189) - F-118 **A numeral's value reaches the compiled world intact, and the compiled path prints a large `NN32` or `NN64` value unsigned, but it cannot compare a numeral beyond `ZZ64` with another numeral.** The code generator carries a numeral of its own type as an `int`, a `long` or its decimal string, by its exact bit length, and a numeral that the coercion desugarer types at a library number type as that type's constant (F-340). So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk converts a numeral bound to `NN32` or `NN64`, F-341). The compiled path prints an `NN32` or `NN64` value above its type's signed half unsigned (F-313; test `compiler_tests/UnsignedPrintingCompiled`). It compares two `IntLiteral` values at `ZZ64`, so `lt(18446744073709551615, 5)` for `lt(a: IntLiteral, b: IntLiteral): Boolean = a < b` fails with `Not in range for ZZ64` (row 328), which no test pins; an untyped binding of such a numeral is a `ZZ`, its default (F-342). An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it. Walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

OLD (b430f9f428:FACTS.md:199) - F-131 **The one library's number tower is flat.** It builds P-43. `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and `IntLiteral` are siblings under `Number`. `IntLiteral` is the type that the library declares for an integer numeral. The compiled checker gives a numeral that type; walk still gives it `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit (P-76). Each wider integer type converts from each narrower one, and `RR64` from a `ZZ32` and an `IntLiteral`; a `ZZ64` goes into `RR64` only when written out (P-74). `QQ` converts from the five integer types and `IntLiteral`, and `RR64` converts from `RR32` too (F-139). `NN32` does not yet convert into `RR64`: P-75 decides that it will. `Number` declares no `=`; each type declares one at each type it coerces from or into (F-324). Under walk, a big operator over a list of numerals, with no static argument on either, such as `SUM <|1, 2, 3|>`, finds no matching overload at run time (row 432), and an empty `SUM` over an additive group that is not a number dies (row 436). Gated by `tests/FlatTowerRungF.fss` for every type but `RR32` and `IntLiteral`: that none is another's subtype, their coercions and `=`. `RR32`'s place is gated with F-139, and `IntLiteral`'s with F-79. Detail: `compile-ladder/rung-flat-tower/REPORT.md` sections 5 and 17.

NEW (7daf51fe8a:FACTS.md:201) - F-131 **The one library's number tower is flat.** It builds P-43. `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and the numerals' trait `Numeral` are siblings under `Number`; `Numeral` comprises `NaturalNumeral` and `RadixPointNumeral`, the types that the library declares for a numeral, from which each of the eight converts (F-79). The compiled checker gives a numeral its numeral type and converts it where it stands (F-342); walk gives it its default, `ZZ32`, or `ZZ64` or `ZZ` when its value does not fit, and converts it where its place fixes a type (F-341). Each wider integer type converts from each narrower one, and `RR64` from a `ZZ32`; a `ZZ64` goes into `RR64` only when written out (P-74). `QQ` converts from the five integer types, and `RR64` converts from `RR32` too (F-139). `NN32` does not yet convert into `RR64`: P-75 decides that it will. `Number` declares no `=`; each type declares one at each type it coerces from or into (F-324). Under walk `SUM <|1, 2, 3|>`, with no static argument, is 6, its list read at `ZZ32` (F-344), and an empty `SUM` over an additive group that is not a number dies (row 436). Gated by `tests/FlatTowerRungF.fss` for every type but `RR32` and the numeral types: that none is another's subtype, their coercions and `=`. `RR32`'s place is gated with F-139, and the numeral types' with F-79. Detail: `compile-ladder/rung-flat-tower/REPORT.md` sections 5 and 17.

OLD (b430f9f428:FACTS.md:208) - F-140 **A size beyond `NN32` or `ZZ32` is refused by the compiled checker when it is a literal or folded from literals, and by walk when it binds one; walk reads a size exactly.** It builds P-40. The checker refuses such a size outside its kind: 0 to 4294967295 for `nat`, and `ZZ32`'s range for `int`. Walk refuses it at run time, where it binds the size to a static parameter. Walk reads and computes a size exactly, with no wrap: it reads a size used as a value as a `ZZ32` up to 2^31-1 and as a `ZZ64` above. The checker types such a value `IntLiteral`. The compiled class loader checks no size that it computes at instantiation: `next[\nat k\]()`, which builds a `Box[\k + 1\]`, answers 4294967296 at `k = 4294967295` (gap-ledger row 675; F-222). Gated by `tests/NatBigSizeWalk` for walk's reading. The refusals are gated by `compiler_tests/XXXNatRangeChecker`, `XXXNatArithRangeChecker` and `NatRtBigSize`, and by `tests/XXXNatBeyondNN32Walk`, `XXXIntBeyondZZ32Walk`, `XXXIntBelowZZ32Walk`, `XXXNatArithProductWalk` and `XXXNatArithSumWalk`; each `XXX` test passes because its program is refused. Open under walk: an array of a static size from 2^31 to 2^32-1 stops at its store's factory, 'Closure/Constructor for makeJavaArrayStore parameter 1 (n:ZZ32) got type Long', where no catch sees it (row 527). Also open, as notes on row 325 (a numeral outside a bounded integer type): on the compiled path a `nat` size above `ZZ32`'s range, used where a `ZZ32` is needed, as in a range, fails at run time, as a numeral beyond `ZZ32` does, and neither P-40 nor the specification says where such a size is refused; and under walk a `ZZ32`-declared return passes such a size on as a `ZZ64`. Detail: `compile-ladder/rung-size-range/REPORT.md` sections 6 and 12.

OLD (b430f9f428:FACTS.md:229) - F-262 **A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell `10^16` from `10^(-16)`.** The numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`). The checker types every integer numeral `IntLiteral` (`Misc.scala:468-469`); the compiled path folds `prefix -` on a numeral into a numeral of that type before the checker, and does not fold `^` (`IntegerLiteralFoldingVisitor.java:58-107`, `:152-153`). Walk's numeral is an `Int` (F-74). By reading. Detail: `reviews/integer-power-fable-judgement.md` section 9.

OLD (b430f9f428:FACTS.md:230) - F-263 **In the interpreter's library each integer power is declared to answer its base's own type; under walk, at a negative exponent, the bases 1 and -1 give their exact power, a base of 0 raises `DivisionByZero`, and any other base raises `IntegerOverflow`.** It builds P-153. Under walk the power answers its base's type and follows these rules at `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, with an exponent of any integer type, including a `ZZ` exponent too large for 64 bits, such as 2^70. Under walk a numeral is a `ZZ32` value (F-74), so `2^(-1)` raises `IntegerOverflow`. `IntLiteral` is the type that the compiled checker gives an integer numeral (F-262). Under walk the name `IntLiteral` also denotes a value, a zero that no numeral reaches. Its power follows the same rules, but answers a `ZZ32`, as all its arithmetic does, against its declared `IntLiteral`: a gap of walk (row 578). `QQ`'s power takes an exponent of any integer type. For a fraction, write a float or rational base: `2.0^(-1)` is 0.5, and `(2/3)^(-1)` is `3/2`. The compiled checker accepts the library's own uses of these powers (the distance stage). microGPT's only integer power is in the library's `strToInt`, always at a nonnegative exponent. The compiled path's own library does not follow these rules. At a negative exponent its `ZZ32` power gives 0 at every base but 0, 1 and -1, and a raw Java `RuntimeException` at a base of 0 (row 441). P-153 lists this, with that power's overflow, which throws a raw Java exception that no Fortress `catch` sees, or saturates quietly (row 523). Tests: `tests/IntegerPowerContractWalk.fss`, `tests/QQPowerExponent.fss`; on the compiled path, the expected failure `compiler_tests/XXXIntegerPowerContractCompiled.test`. Detail: `compile-ladder/rung-integer-power/REPORT.md` sections 1, 2 and 4 (the change, the tests, the checker's sites); `perf-probes/integer-power/REPORT.md` section 1.6 (microGPT's powers).

NEW (7daf51fe8a:FACTS.md:231) - F-262 **A numeral's sign does not reach its type on either path, so no overload on a numeral exponent's type can tell `10^16` from `10^(-16)`.** The numeral itself has no sign (`Specification/basic/lexical-structure.tex:1053-1080`). The checker types every integer numeral by its numeral type, `IntLiteral` under the compiler's prelude and `NaturalNumeral` under the one library (`Misc.scala:468-469`), before it converts it (F-342); both paths fold `prefix -` on a numeral into a numeral node with a negative value before the checker, and fold `^` by an integer exponent of magnitude at most 4096 where the exponent is not negative or the base is a radix-point or quotient constant; an integer base at a negative exponent is left, so `10^(-16)` stays an operation whose exponent is a numeral (`compiler/desugarer/IntegerLiteralFoldingVisitor.java:292-302`). Walk's numeral is its default, an `Int` value read at `ZZ32` (F-74, F-341); a negative constant at a program's own type reaches its coercion as a `NaturalNumeral` of negative value under walk (row 968), and with its sign on the compiled path (row 961). By reading. Detail: `reviews/integer-power-fable-judgement.md` section 9.

OLD (b430f9f428:FACTS.md:235) - F-304 **On the compiled path a numeral with a radix point becomes its `RR64` by two or three roundings, not one, so a numeral of 16 or 17 significant digits can become a neighbouring double; walk rounds once.** `CodeGen.forFloatLiteralExpr` emits `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` (`compiler/codegen/CodeGen.java:2035-2045`), so compiled `0.9999999999999999` is 1.0; walk reads a radix-ten numeral's text with `Double.valueOf`. The specification asks "at most one floating-point rounding error" (`basic/expressions/literals.tex:187-190`). A compiled test compares such a double by its string, or uses a numeral with a zero integer part and at most 15 digits after the point. Test: `compiler_tests/XXXFloatNumeralOneRounding` (row 862). Detail: `compile-ladder/rung-natives-float/REPORT.md`, "Defects, each with its home".

NEW (7daf51fe8a:FACTS.md:237) - F-304 **On both paths a numeral with a radix point becomes its `RR64` or `RR32` by one rounding of its exact value.** The compiled `CodeGen.forFloatLiteralExpr` rounds the exact quotient once (`roundToDouble`, `roundToFloat`; F-340), where the team's code emitted `intPart.doubleValue() + numerator.doubleValue() / Math.pow(denomBase, denomPower)` (`compiler/codegen/CodeGen.java:2035-2045` at b430f9f428), two or three roundings, so that compiled `0.9999999999999999` was 1.0; walk rounds once through `simpleDoubleArith.numeralToDouble` and `numeralToFloat` (F-79). The specification asks "at most one floating-point rounding error" (`basic/expressions/literals.tex`, "Literals"). Test: `compiler_tests/FloatNumeralOneRounding.test` (row 862, fixed). Detail: `compile-ladder/rung-natives-float/REPORT.md`, "Defects, each with its home".

OLD (b430f9f428:FACTS.md:240) - F-326 **Both paths answer `SEQV` by the specification's rule: values of different types never equivalent, value objects of one type field by field, floats by their bits, reference objects and strings only with themselves.** Walk in its value classes and `FTypeObject`'s field list; the compiled path in `equality.sEquiv`, which reads a `value` object by the mark `runtimeValues.ValueObjectMark` that the code generator adds to its class, and compares tuples element by element. Until the switch-over a compiled `===` reaches the prelude's family first, which answers `ZZ32`, `ZZ64`, `RR32` and `RR64` values, strings and booleans by `=` (P-38, row 908). Under walk a float numeral bound to `RR64` stays a `FloatLiteral`, not `SEQV` a computed `RR64`, a defect against P-172's conversion at a declared `RR64` (row 943); a tuple of four or more compares by `SEQV` (row 923). Tests: `tests/StrictEquivalenceRuleWalk.fss`, `tests/ValueObjectCC64Walk.fss`, `compiler_tests/StrictEquivalenceRuleCompiled.fss`. Detail: `compile-ladder/rung-seqv-meaning/REPORT.md`.

OLD (b430f9f428:FACTS.md:242) - F-331 **The integer types convert by checked `as…` getters that raise `IntegerOverflow`, `bitsAs…` getters for the bits, and the low-bits names on every type where they apply, and `ZZ` converts out only by its getters.** On `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, the getters `asZZ32`, `asZZ64`, `asNN32`, `asNN64` and `asZZ` keep the value or raise `IntegerOverflow`. Of the 25, 5 are identities, 7 equal the coercions, and 13 can raise: 8 of them are Fortress bodies or compositions, and 5 are bare helper bindings. `bitsAsNN32` of `ZZ32` and `bitsAsNN64` of `ZZ64` equal `unsigned`, and `bitsAsZZ32` of `NN32` and `bitsAsZZ64` of `NN64` equal `signed`. `narrow`, `widen`, `signed`, `unsigned` and `big` keep the bits, each on every type where it applies; on a value that already has its result type, as `widen` of a `ZZ64`, each returns the value. `ZZ` has `big` only. `IntLiteral`'s `asZZ32`, `asZZ64`, `asNN32`, `asNN64`, `asString`, `asExprString`, `=` and `cmp` are Fortress over its `asZZ`. Meaning: under walk no conversion goes through a coercion, and `narrow(z)` of a `ZZ` finds no declaration (write `z.asZZ32`); until the switch-over the compiled prelude has 8 of the 25 getters and no `big` (row 349). F-299 counts the bindings. Tests: `tests/IntegerConversionsWalk`, `tests/IntLiteralTextWalk`, `compiler_tests/IntegerConversionHelpersCompiled`, `compiler_tests/XXXZZNarrowRungP`. Detail: `compile-ladder/rung-integer-conversions/REPORT.md`, "What changed and why".

NEW (7daf51fe8a:FACTS.md:247) - F-341 **Walk's numeral is its default, carrying the numeral's four numbers, and converts from them where its place fixes a type.** An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by its value, a radix-point numeral the `RR64` nearest its value, one value per site (`interpreter/evaluator/values/Numerals.java`). At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion it converts through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, called with the numeral object, one result per site and type; a numeral out of the type's range, or at a type with no coercion from it, is refused there when it runs; a store keeps its default alone. Dispatch fits it as it is at its own type or its default, then by its own type's coercions only, and reads a tie at the default; a type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is 1/10, `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `1/2 = 0.5` is `true`. Tests: `ProjectFortress/tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`. Detail: `compile-ladder/rung-numeral-types/REPORT.md`, "What changed and why".

OLD (b430f9f428:FACTS.md:245) - F-151 **In the interpreter's library, `Vector`, `Matrix` and their factories and operators bound their element type by `T extends { Number, MultiplicativeRing[\T\] }`.** `Number` declares no arithmetic, so the compiled checker accepts the bodies' arithmetic only through `MultiplicativeRing[\T\]`. `Number` stays in the bound, though it has no `comprises` clause now (F-324). The four juxtapositions of a vector or a matrix with a scalar `T`, in either order, stand beside the library's juxtapositions with a `String`, and the checker finds no error in them (F-53); no run measures what now keeps a scalar `T` apart from `String`. The vector norm is declared at each of the eight number types, by its own `asFloat` (F-324). The eight number types meet the bound. `Number` itself and the numeral type `IntLiteral` do not, since neither is a ring at its own type. So `Vector[\Number,n\]` is not a well-formed type, and `array1` and `array2` have no branch for `Number`: called at `Number`, they give a plain array at run time, not a vector or a matrix (F-229). The checker accepts a call whose argument's type is built from the caller's own type parameter under the same bound, such as the norm's `squaredNorm(me)` (F-227). The scalar extension, the eight operators between an array and a scalar, has bounds of its own, also with `Number` (F-119). Gated under walk by `tests/ArrayElementAlgebra.fss`. The bound is the default that `reviews/array-fork2-judgement.md` recommended. It landed when the curator said to land it. Detail: that judgement, sections 2.5 (what `Number`'s `comprises` clause gives), 2.9, way 3 (the ring alone, measured) and 4 (the bound and its cost).

NEW (7daf51fe8a:FACTS.md:287) - F-345 **The specification states the decided numeral design and P-171's string literals in the revision form.** The literals chapter gives `Numeral` comprising `NaturalNumeral` and `RadixPointNumeral`, the four numbers as fields, the conversion where a place fixes a type, the default elsewhere, a program's type through its own coercion once per place, and the numeral types written only as parameter types (`Specification/basic/expressions/literals.tex`); the constant chapter's fold into a signed constant with three defaults (`constant.tex`); the coercion chapter's default beside coercion; the inference chapter's numeral section; and Appendix I's `revival-numerals` and `revival-string-literals` (`Specification/appendices/changes.tex`), whose Effects name each departure with its row. Test: the specification's build (`ant genSource`, `ant tex`), 0 warnings by the skill's grep. Detail: `compile-ladder/rung-literals-spec/REPORT.md`, "What changed and why".


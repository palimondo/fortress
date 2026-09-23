<!-- Written 2026-09-23 by a delegated worker for Pavol's choice between the two routes on the compiled checker's multiple instantiation exclusion. This note prices route A of ../multiple-instantiation-exclusion.md § 8, "keep the rule"; the sibling note scope-call-site-dispatch.md prices "drop the rule". Measured on main a0617d672, JDK 25, FORTRESS_THREADS=1. Nothing tracked was modified. The interpreter probes ran under walk with private caches. The run-time survey is a classpath shadow of eight interpreter sources, made by keep/nestprobe/make-shadow.py and put ahead of ProjectFortress/build. The checker count is the gate's own driver run on library copies made by keep/make-flat-lib.py. Commands and captures are in keep/. -->

# The price of keeping the rule: the tower flattened, what depends on the nesting, what the interpreter needs

Terms.
- **Nested tower**: today's library. `ZZ32 <: ZZ64 <: ZZ <: AnyIntegral <: QQ <: RR64 <: Number`, and each level carries the self-typed algebra traits at its own type.
- **Flat tower**: the compiler prelude's shape. The numeric types are siblings under a `Number` without algebra, and widening is a `coerce` declaration.
- **Leaf**: the tower type an object belongs to directly: `Int` and `IntLiteral` → `ZZ32`, `Long` → `ZZ64`, `BigNum` → `ZZ`, `UnsignedLong` → `NN64`, `Ratio` → `QQ`, `Float` and `FloatLiteral` → `RR64`.
- **Dependent site**: a place in a program where a type check passes only because of the nesting.

**The short answer.**
- **The flat tower is 14 declaration headers** in the library's four core files (§ 1). The 10 objects that only inherit an instantiation keep their text. The algebra moves to the leaves, widening becomes `coerce`, and `Number`'s catch-alls go.
- **The nesting carries weight under walk.** A run-time survey over the 392 test files finds 235 dependent sites in 19 library files and 994 in the text of 75 test files (§ 2).
  - 160 of the library sites and 207 of the test sites certainly need a conversion.
  - 15 inherited methods need restating on the leaves.
  - One library line, `FortressLibrary.fss:4121`, is reached by every test expected to pass.
- **The interpreter has no coercion, but its phase order already turns every `coerce` into a callable `coerce_<trait>`** (§ 3). Calling them at dispatch and at typed bindings is about 150-200 lines in six files. It would resolve coercions at run time, where the specification resolves them statically.
- **Converting by hand instead** means the sites counted above, and the same again in every new program.
- **The compiled side's own tests widen by coercion, never by hand.**
- **The flat tower takes the checker count from 103 to 22** (§ 5): all 61 exclusion errors go. The count is still masked by `FortressLibrary.fsi:2526`, and it does not reach the library's bodies.

## 1. What "flat" means for this library

The rule only bites where a type adds its own instantiation of a self-typed trait below a type that already has one. `ZZ32 extends ZZ64` is refused because `ZZ32` adds `Integral[\ZZ32\]` beside `ZZ64`'s `Integral[\ZZ64\]`. An object that adds nothing is legal under the rule: `Int extends ZZ32`, `Long`, `UnsignedLong`, `IntLiteral`, `BigNum`, and also `RR32 extends RR64`. So 14 declaration headers change. 12 of them are among the review's 23 declarations with errors (§ 5 there): all but the 10 objects and `Maybe`, whose errors go with `AnyMaybe`'s fix. The other two are `Number` and `RR64`, which have no errors but must take or give up the algebra. The 10 objects and `Maybe` keep their text. The rewrite is `keep/flat-tower-sketch.fsi`, and `keep/make-flat-lib.py` applies exactly those headers to copies.
- **The `extends` clauses that go**: `Number extends` its four self-typed traits, `QQ extends RR64`, `AnyIntegral extends QQ`, `ZZ64 extends ZZ`, `NN64 extends ZZ`, `ZZ32 extends ZZ64`, `NN32 extends NN64`, and `Integral[\I\] extends AnyIntegral`. Also `StandardTotalOrder[\TotalComparison\]` on `TotalComparison` (the prelude's own edit, `CompilerBuiltin.fss:1521-1523`), `Equality[\AnyMaybe\]` on `AnyMaybe`, and the five `DistributesOver` markers on `SumReduction` and `ProdReduction`.
- **The `excludes` clauses that come**: each integer leaf excludes its integer siblings. `RR64` and `QQ` exclude each other and `AnyIntegral`, as the prelude's `ZZ32 … excludes { ZZ64, RR32, RR64 }` does (`CompilerBuiltin.fss:659`).
- **Where the algebra sits**: on the leaves only, as in the prelude. Each integer leaf extends `AnyIntegral` and `Integral[\Self\]`. `Integral[\I\]` extends `StandardTotalOrder[\I\]` and `AdditiveGroup[\I\]`, no longer `AnyIntegral`. `RR64` and `QQ` extend `StandardPartialOrder`, `StandardMinMax`, `AdditiveGroup` and `MultiplicativeRing`, each at their own type. `Number` keeps only the two markers, `AnyAdditiveGroup` and `AnyMultiplicativeRing`. They carry no methods, so the arrays' `excludes AnyMultiplicativeRing` stays true of every number (`FortressLibrary.fss:2195`, `:2503`, `:2670`).
- **Why not on `Number` only**: an integer that extends `Integral[\ZZ32\]` gets `Equality[\ZZ32\]` through `StandardTotalOrder`, beside `Number`'s `Equality[\Number\]`. So under "Number only", no integer could be `Integral`. The ranges' bound `I extends Integral[\I\]` (92 lines of `RangeInternals.fsi`) would then admit nothing.
- **What `Number` loses**: its operator and function declarations, 52 in the api and 57 in the component, the catch-alls such as `opr +(self, b:Number): RR64 = asFloat(self) + asFloat(b)` (`FortressLibrary.fss:379`). Two reasons, both from the prelude's choice:
  - A catch-all applies without coercion to every mixed call. The specification tries coercion only when no declaration applies without it (`conversions-coercions.tex:454-458`), so `x + 1` with `x: ZZ64` would go to float arithmetic, not to `ZZ64`'s `+`.
  - The catch-all returns `RR64`. Once `ZZ32` is not below `RR64`, that result breaks the return type rule against each leaf's own `+`.
- **Widening**: `coerce` on the wider type. `ZZ64` takes a `ZZ32`; `ZZ` takes the four fixed widths; `NN64` takes an `NN32`. `QQ` and `RR64` take the five integer leaves, and `RR64` also takes a `QQ`. The prelude has the first three groups (`CompilerBuiltin.fss:514-518`, `:575-576`, `:816-817`). It has no coercion from an integer into a float.
- **`comprises` clauses**: each leaf comprises its own objects only (`QQ`'s component clause becomes `{ Ratio }`, and the api keeps `{ ... }`), and `Number` has none, as in the prelude. `AnyIntegral comprises { ZZ, ZZ64, ZZ32, NN64, NN32 }` becomes well formed, because the five leaves now extend it directly. With it go the family E error at `FortressLibrary.fsi:409-411`, its `NOT YET` comment, and the five-line `isEligibleToExtend` accommodation approved on 2026-09-21 (`POSITIONS.md:48`).
- **Methods a leaf inherits today** have to be restated on the leaf, or once on `Integral[\I\]`. The survey of § 2 finds 15 such method names that the tests use.

## 2. What depends on the nesting, measured

Method. A text grep gives candidates. A run-time survey then gives the dependent sites. The survey is `keep/nestprobe/NestProbe.java`, with hooks in `FType.typeMatch` (parameters, typed bindings), `LHSEvaluator` (typed local declarations), `Evaluator.forTypecase`, and `MethodClosure.applyMethod` (the trait that defined the body that runs). It records every check that passes only through the nesting, with its call site, and it changes no behaviour. All 392 `.fss` files in `ProjectFortress/tests/` ran under it (`keep/nestprobe/run-tests.sh`).

The survey counts a site once, whatever the number of tests that reach it. It splits the sites by what the flat library would need there:
- **A conversion at the site**: a value reaches a declared type above its leaf; or a mixed call is answered by a wider leaf's method (`ZZ64`'s `+` with an `Int` as `self`); or one of `Number`'s catch-alls runs.
- **Only a method restated on the leaf**: the leaf lacks a method it inherits today, such as `QQ`'s `=/=` for an `Int`. The parameter check of that same inherited method at that site counts here too, because the restated method takes the leaf's own type.

Captures: `keep/nestprobe/survey-summary.txt`, and one row per site in `survey-sites.tsv`.

**(a) The library.**
- **Text candidates**: 212 lines outside the tower's own declarations name `ZZ64`, `ZZ`, `QQ`, `RR64`, `NN64` or `AnyIntegral`, in 16 library files. 36 of them are in `FortressLibrary.fss`. `FortressBuiltin.fss` has none outside its numeric objects.
- **What the tests execute**: 235 dependent sites in 19 library files, none in `FortressBuiltin.fss`.
  - **190 need a conversion.** 160 certainly: 44 in `FortressLibrary.fss` and 116 in the other files. 30 more if the float operand's partner is an integer; these are `Number`'s catch-alls on floats, which run today for a `Float` with a `FloatLiteral`, and `RR64`'s own arithmetic fixes that case in the library.
  - **45 need only a restated method.**
- **`Library/FortressLibrary.fss`, 90 sites, by line**: `35` (`cast[\T\]`'s `typecase` at `T = ZZ`), `52` (`COMPOSE`), `297` (`assert(x, y)`'s `x =/= y`, reached by 78 tests), `367`, `451`, `461` (`Number`'s and `RR64`'s own bodies calling `Number`'s comparisons on floats), `475-521` (`simplestRationalBetween`), `532-596` (`QQ`'s bodies), `607` (`Ratio.asFloat`), `632` (`Integral.DIVIDES`), `710-720` (`ZZ64`), `838-894` (`ZZ`);
  `1336`, `1750`, `1827-1994` (array bodies given an integer where a float element is declared), `2197-2278` (`Vector`), `2505-2570` (`Matrix`), `3040` (`SumReduction.join`), `4121` (`__globalTimeInformation: ZZ64 := 0`), `4509-4519` (the scalar-extension block).
- **The other library files, 145 sites**: `Map` 32, `IntMap` 19, `Set` 18, `Format` 18, `Random` 14, `QuickCheck` 12, `Sparse` 8, `Timing` 6, `RangeInternals` 4, `List` 4, `ChunkedSparseArray` 3, and one each in seven more. Six further sites are in `test_library/ArrayOperatorVocabulary.fss` and in interpreter-generated code.
- **The methods to restate** are 24 (method, leaf) pairs over 15 names (`survey-methods.tsv`): from `QQ`, `/`, `=/=`, `floor`, `ceiling`, `truncate`, `MINNUM` and `MAXNUM`; from `ZZ`, `/`, `numerator`, `odd`, `even`, `cmp` and `widen`; from `ZZ64`, `narrow` and `big`; and `SQRT` on `RR64`.

**(b) The tests.**
- **By grep**: 49 of the 392 `ProjectFortress/tests/*.fss` name a type above `ZZ32`, or mix an integer and a float literal in one arithmetic expression. 47 name such a type and 8 bind an integer literal to one.
- **By the survey**: 994 dependent sites in the text of 75 test files.
  - **336 need a conversion**, in 49 files. 207 of them certainly, in 35 files. The rest are the float catch-alls above.
  - **658 need only a restated method.** 599 of them are `RationalTest.fss`'s integer `/`; that file has 703 sites in all.
  - **Sampled to confirm** (`survey-sites.tsv`): `3 + 5 / 4` (`DivPrecedence.fss:18`), `1+BITNOT xfoo` with `xfoo: ZZ` (`UnsignedTest.fss:51`), `(1 + SQRT 5) / 2` (`fib13.fss:15`), and `fib13[\ZZ64\](20)` binding the literal to a `ZZ64` (`:28`).
- **What a run reaches**: every test expected to pass reaches `FortressLibrary.fss:4121`: 357 of the 392 runs. The 35 that do not are all `XXX` expected-failure tests. So one library line stops the whole suite until it is converted. Beyond that line, 143 tests reach a dependent site, and 109 reach one that certainly needs a conversion.
- **`library_tests/`**: 12 of its 40 `.fss` name a type above `ZZ32`, and 9 bind an integer literal to one. They are compiled-path tests, and they rely on coercion (§ 3).

**(c) The "Hack to permit any Number to work non-parametrically" and the `DistributesOver` markers.**
- **The hack**: `SumReduction.join(a: Number, b: Number): Number = a+b` and `empty(): Number = 0` (`FortressLibrary.fss:3039-3040`, and `ProdReduction` at `:3062-3063`) work only through `Number`'s catch-all `+` and the nesting. The survey sees `:3040` run it for `RR64` and `ZZ32` values. The flat `Number` has no `+`, so the compiled checker cannot type `a+b` on `Number`, and three replacements are open:
  - a parametric reduction lifted to `Maybe`, as `MinReduction[\T extends StandardMin[\T\]\]` already is (`:3115`). A sum over an empty generator then has no identity: today it is `0`.
  - One reduction per leaf, eight of them, picked by a `SUM` overload per element type.
  - The identity passed in by the caller.

  The prelude has no `SUM`, so it gives no precedent.
- **The `DistributesOver` markers are read nowhere.** Their only reader is commented out (`Generator2.fss:59-70`). Distributivity is decided by the `distribute(r)` methods (`FortressLibrary.fss:3041-3048`, `:3064-3065`) through `distributes(q, r)` (`Generator2.fss:73`). So they go, and nothing replaces them. A marker wanted later would be one non-generic trait per fact, the library's own `AnyMultiplicativeRing` pattern.

## 3. What the interpreter needs

The probes use a flat two-level tower in the prelude's shape: `trait Wide extends { Num, Equality[\Wide\] } excludes { Narrow }` with `coerce(x: Narrow)`, beside `Narrow`. Under walk, a `Narrow` fails at each of the three kinds of check:
- `f(x: Wide)`, not overloaded: "Unification error: Closure/Constructor for f param 1 (x:Wide) got arg NarrowOf" (`keep/FlatCall.walk.txt:4-5`).
- `g(Wide)` beside `g(String)`: "Failed to find any matching overload, args = (NarrowOf)" (`keep/FlatOverload.walk.txt:5`).
- `w: Wide = NarrowOf(3)`: "RHS expression type NarrowOf is not assignable to LHS type Wide" (`keep/FlatBind.walk.txt:4`).

The library's own nesting takes the same calls today: `h(3)` for `h(x: ZZ64)`, `k(3)` for `k(x: RR64)` and `q: QQ = z` all run (`keep/FlatExplicit.walk.txt:3-5`).

**Remedy (i), coercion in the interpreter.** The coercions are already there to be called. The interpreter's phase order runs the disambiguator's `CoercionLifter` (`compiler/Disambiguator.java:287-288`), which turns each trait's `coerce` into a top-level function `coerce_<trait>` (`NamingCzar.java:106`, `:1708-1710`). `FlatLifted` calls `coerce_Wide(n)` by hand under walk, and the call works (`keep/FlatLifted.walk.txt:2`). What is missing is the decision to call them:
- `OverloadedFunction.bestMatch` (`interpreter/evaluator/values/OverloadedFunction.java:787-801`), where the team left "TODO add checks for COERCE, right here." (`:791`). It needs a second pass when no overload applies: the overloads applicable with coercion, the most specific one (`conversions-coercions.tex:515-535`), and the plan kept in the per-argument-type cache (`:760-776`). Overloaded methods go through the same function (`OverloadedMethod.java:50`). About 80 lines.
- A single closure: `NonPrimitive.buildEnvFromParams` (`NonPrimitive.java:242-255`) and `typecheckParams` (`:147`, `:164`).
- The typed bindings: `LHSEvaluator.java:97` and `:215`, `BuildEnvironments.java:224`, `:753` and `:774`, and `BaseEnv.java:314`. With the three `NonPrimitive` sites, that is nine sites at about 5 lines each. The specification's third context, a declared return type (`conversions-coercions.tex:98-110`), would be a new check: the interpreter records it (`FunctionClosure.java:41`) but never tests a result against it.
- A helper that finds `coerce_<T>` in the environment where `T` is declared, tests it and applies it: about 40 lines. `FType.typeMatch` (`FType.java:108-113`) is the one test all these sites share. In total, about 150-200 lines of Java in six files (seven with the return check), plus tests.
- Not covered: generic inference (`EvaluatorBase.inferAndInstantiateGenericFunction`). With mixed widths it infers a join, and the join of `ZZ32` and `ZZ64` in a flat tower is `AnyIntegral`, for example in `lo:hi`. What the interpreter then does with that join is not measured.
- The semantics would differ from the specification's. It resolves coercion statically: "Notice that coercion is resolved statically. … the statically chosen coercion is applied at run time" (`conversions-coercions.tex:567-570`). Its own example has `c: C = D` and `f(c)`, where `D` is both a `B` and a `C`. The call "resolves to the declaration f(A) despite the fact that the declaration f(B) is applicable to the dynamic call f(D) and does not require coercion" (`:572-604`). An interpreter that coerces at run time would call `f(B)`. The compiled path would follow the specification, and the two paths would answer differently.

**Remedy (ii), explicit widening at each dependent site**:
- `survey-summary.txt` counts the sites. They are 160 certain library sites and 207 in the tests, in 35 test files, plus up to 159 float catch-all sites (30 in the library, 129 in the tests) where the partner is an integer. With them come the 15 methods restated on the leaves, which are library work under either remedy.
- **Each literal bound to a wider type needs a spelling**: `widen(0)` for `ZZ64`, `big(0)` for `ZZ`, `0.0` for `RR64`. The interpreter makes every literal within `ZZ32`'s range an `Int` (`FIntLiteral.make`, `FIntLiteral.java:40-56`). It has no way to write a small literal of another width.
- **Mixed widths need a `widen` or `asFloat` at the call.**
- **The cost is paid again in every future program.** That includes the ones the one library exists to serve: microGPT's `(step 1.0) / (numSteps 1.0)` (`explorations/microgpt.fss:243`).

**The compiled side's precedent is coercion, never widening by hand.** `library_tests/Integer.test` compiles and runs `Integer1-4`, `IntegerChoose1-2`, `ShiftTest`, `ShiftTest2` and `AverageTest` against the prelude. They write `three: ZZ64 = 3` (`Integer2.fss:18`). They pass `i`, a `ZZ32` from `0:7`, to `testLongAverage(x: ZZ64, y: ZZ64)` (`AverageTest.fss:108`). They compute `longSeed BOXCROSS intMult` (`ZZ64` by `ZZ32`, `:128`) and `unsignedLongSeed BOXCROSS unsignedIntMult` (`NN64` by `NN32`, `:138`). Every one of these goes through the prelude's `coerce` (`CompilerBuiltin.fss:575-576`, `:816-817`, and the `IntLiteral` ones). Of the 40 `.fss` in `library_tests/`, 12 name a type wider than `ZZ32`, and 9 bind an integer literal to one. None converts by hand.

## 4. What the flat shape forecloses or changes

- **The specification's `Empty extends List[\T\]`** (`Specification/basic/trait-parameters.tex:384-397`). Keeping the rule refuses it on the compiled path, whatever the tower looks like; the flat tower neither helps nor hurts it. Under walk it stays accepted (`MieDecl.walk.txt`).
- **The specification's promotion story.** The mathematical sets nest by subtyping: "ℤ (ZZ) is the set of integers (it is a subtype of ℚ and ℤ*)" (`basic-lib/basic-integers.tex:28-29`), and ℚ "is a subtype of ℝ and ℚ*" (`basic-lib/numbers.tex:36-37`). Between machine types, widening is coercion:
  - "it is convenient to be able to use an integer-valued expression in a floating-point expression even though its type is not a subtype of any floating-point type. Fortress supports the automatic conversion of integer values to floating-point values (the technical term for this kind of automatic conversion is coercion)" (`basic/conversions-coercions.tex:61-66`).
  - The only example with `ZZ32` and `ZZ64` declares `trait ZZ32 end` and `trait ZZ64 coerce(z: ZZ32) = … end`: "the call f(ZZ32) resolves to the declaration f(ZZ64) because ZZ64 ≺ ZZ128, which follows from the fact that ZZ64 coerces to ZZ128" (`:549-565`).
  - The libraries "define coercions from numerals to integers (for simple numerals) and rational numbers (for compound numerals)" (`basic/expressions/literals.tex:146-148`). The chapter's own note says "Widening and where clauses are not yet supported." (`:15`).
  - No sentence in `Specification/` makes `ZZ32` a subtype of `ZZ64`, or `QQ` a subtype of `RR64`: a grep of every `.tex` finds the fixed widths only in that example and in examples of other things. So for those two links the flat shape's mechanism is the specification's own. What the flat shape loses against the specification is `ZZ <: QQ`. Both carry `StandardPartialOrder` at their own type, which is Naden's open case: "more work needs to be done in order to understand how to best support the numerical hierarchy" (`justificationOfRTR.tex:631-632`).
- **`Number` bounds in C4 and the array vocabulary** (`FACTS.md:94`). `T extends Number` stays valid, because every leaf is still a `Number`. Two things change:
  - **Arithmetic between leaves needs a coercion or a conversion.** The scalar-extension block and the `Vector` and `Matrix` bodies are among § 2's library sites; at `FortressLibrary.fss:2212` and `:2570`, an `Int` reaches a declared `RR64` element.
  - **One gain:** `RR64` extends `AdditiveGroup[\RR64\]`, so the specification's bound `T extends AdditiveGroup[\T\]`, which the shipped `RR64` fails (`FACTS.md:98`), becomes usable.
- **microGPT.** The survey on `explorations/microgpt.fss` ran 50 of its 250 training steps and found 37 dependent sites in its text (`keep/nestprobe/showcase-microgpt-sites.tsv`). All 37 go through `Number`'s catch-alls.
  - **7 mix an integer with a float**: the `n 1.0` idiom (`:86`, `:241`, `:243`, `:250-251`), `(… - 48) / 100.0` (`:63`), and `SQRT(hd 1.0)` (`:208`). They need a coercion from the integer, or `asFloat`.
  - **30 are floats only.** `var grad: RR64 := 0.0` (`:17`) stores a `FloatLiteral`, and adding it to a `Float` goes through `Number`'s `+`: 941K calls at `:50` alone. `RR64`'s own arithmetic in the library fixes these 30.
- **Row 330** (`POSITIONS.md:49`: "ℤ sits under ℚ under ℝ64 in the tower, so an integer result goes back into float arithmetic by promotion"). In the flat shape `ZZ` is under neither, so there is no promotion by subtyping.
  - The promotion survives only as the sketch's `RR64` `coerce(x: ZZ)`. The prelude does not have that coercion today.
  - On the compiled path it is static: in `floor(x) + y` with `y: RR64`, no `+` applies without coercion, and `RR64`'s applies once `floor(x)` is coerced.
  - Under walk the promotion needs remedy (i). With remedy (ii) the program writes `asFloat(floor(x))`.
  - Whether the compiled checker coerces a functional method's `self` position is not measured.
  - The other half of the reasoning is untouched: `ZZ` is unbounded and cannot overflow.

## 5. The checker count under the flat shape, measured

`keep/count-variant.sh` runs the gate's own driver, checker shadow and table (`coordinator/tools/checker-count/`) on library copies whose directory shadows the tree's `FortressLibrary` and `FortressBuiltin` (`Shell.sourcePath`, `Shell.java:1175-1188`). Each copy has a fresh private cache. `keep/count-diff.py` compares the errors one by one, setting aside the copy's shifted line numbers (`keep/count/`).
- **The unchanged copy: 103**, the gate's table (`table-L0.txt`).
- **The flat copy: 22** (`table-FLAT.txt`, `diff-L0-FLAT.txt`).
  - **82 go**: all 61 hierarchy errors that `checkP` caused (35 family A, 26 family B); both family E comprises errors (`.fsi:409`, `:411`); and 19 overloading errors in `RangeInternals.fsi` (7 `combine2D`, 7 `combine3D` and 5 `CAP` pairs), by a mechanism not traced.
  - **1 appears**: `IN` at `RangeInternals.fsi:429` against `:505`, also not traced.
  - **21 stay**: 17 overloading errors in `RangeInternals.fsi`, 3 return-type errors (`:257`, `:259`, `:319` against `BoundedRange`), and the family A error at `FortressLibrary.fsi:2526` (`excludes Condition[\()\]`).
- **The flat copy that keeps `Number`'s 52 declarations also gives 22** (`table-FLATN.txt`). The `FortressLibrary` api still stops at its hierarchy stage on `:2526`, so its overloading check never examines them.
- **The 22 is masked, as the 103 is.**
  - Repairing `:2526` took that api from 2 errors to 260 in the zero probe (`perf-probes/nat/zero.md` § 3).
  - The component is never type-checked, so none of § 2's sites is counted.
  - `NativeArray` still crashes the overloading checker.
- **For comparison**, relaxing `checkP` gave 93 → 33 on the older tree (`perf-probes/prelude/exclusion-trace.md` § 5). `scope-call-site-dispatch.md` prices the other route on this tree.

## 6. The size, and what is not settled

- **The library rewrite** has five parts:
  - **The 14 headers**: 58 changed lines in `FortressLibrary.fsi` and 62 in `FortressLibrary.fss` (the `FLATN` copy), plus one line in each `FortressBuiltin` file.
  - **What `Number` gives up and `RR64` takes on**: `Number`'s 52 api declarations and 57 bodies go; `RR64` gets its own arithmetic and the float functions. That is what a `Float` meeting a `FloatLiteral` uses today, including microGPT's 30 float-only sites.
  - **The 15 restated methods**, most once on `Integral[\I\]`.
  - **Smaller pieces**: `ZZ`'s `/` returning `Ratio(a, 1)`, and `TotalComparison`'s inherited `MIN`, `MAX`, `<=` and `>=` written by hand.
  - **A new `SUM` and `PROD`** (§ 2c).
- **The interpreter remedy this price assumes is (i), coercion**: about 150-200 lines in six files, plus tests. It is the compiled side's own mechanism, and it keeps today's programs as written. Remedy (ii) would edit 160 library sites and 207 test sites in 35 files now, plus up to 159 float sites, and it would do the same to every new program. The price of (i) is § 3's divergence: coercion chosen at run time, where the specification and the compiled path choose it statically.
- **The tests that change**:
  - **Under (i), no test text by design, but some results can change.** In the nested tower a declared wider type converts nothing. `x: ZZ64 = 2147483647` holds an `Int`, and `x + 1` prints `-2147483648` (`keep/NestedWidth.walk.txt:2-3`). A coercion makes it a `Long`. How many tests print such a result was not measured. One site needs a conversion regardless: the `typecase` at `FortressLibrary.fss:35`, because `typecase` is not among the coercion contexts (`conversions-coercions.tex:98-110`).
  - Under (ii), the 35 to 49 test files of § 2.
  - Both need new interpreter tests for coercion, and a compiled test for the integer-to-float coercion.
- **In the project's units**: two rungs, each gated on the full suite (the repair batch's gate run was 739 s, `microgpt-run-c-handover.md`). The interpreter rung for remedy (i) lands first or with the library rung, because the flat library cannot pass the gate without it: `FortressLibrary.fss:4121` alone stops every test. The checker needs no change, and its count falls to 22.
- **Not settled**:
  - Generic inference over mixed widths, where a flat tower's join is `AnyIntegral` or `Number` (`lo:hi`).
  - Whether the compiled checker coerces a functional method's `self` position.
  - The library code that no test runs: the text grep's 212 candidate lines bound it.
  - The component's type check under the flat tower, which no count reaches yet.
  - The mechanism behind the 19 `RangeInternals` errors that go and the one that appears.
  - Which of the three replacements for the reductions' hack to take.

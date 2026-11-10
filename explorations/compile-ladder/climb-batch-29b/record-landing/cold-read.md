# Cold read of clean.txt (16 entries)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and term lookups in the skill's `references/` (`library.md`, `compiler.md`, `interpreter.md`, `specification.md`, `records.md`, `tests-writing.md`); not `revival-changes.md` or `sources.md`, and nothing of the record. Where an entry disagrees with a line of the skill, that is noted under **Could not resolve**, since a worker reads both.

## F-57 — a numeral's type by path and library; what gives a `T` in generic code

- **Established:** The checker gives a numeral its own numeral type, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]`, and converts it to a default where nothing fixes a type. Walk instead gives an integer numeral a default by magnitude (`ZZ32`, `ZZ64` or `ZZ`, printed under those names), converting it where its place fixes a type. In code generic over `T extends Integral[\T\]`, a numeral cannot be used as a `T`: `x + 1` is refused by the checker (though walk runs it), because a coercion from a numeral into a type parameter cannot be declared at all — it is refused as a cyclic hierarchy. The only ways to get a `T` that both paths accept are the getters `x.zero` and `x.one` and a "witness `typecase`" (a `typecase` over a function of type `() -> T` with a clause per number type, P-78). Out-of-range numerals, or ones that round to an infinity: the checker refuses statically; walk refuses an out-of-range integer numeral at run time where it does not fit.
- **Conditions:** Generic code over `T extends Integral[\T\]`; both paths. The getters need a value `x: T` already in hand. Walk's run-time refusal is stated for integer numerals only.
- **Consequence:** In generic numeric code, do not write a numeral where a `T` is needed; write `x.zero` / `x.one`, or the witness `typecase` when no `T` value is at hand. A program that walk runs may still fail the checker here.
- **Evidence:** `perf-probes/prelude/distance-triage.md` §2.3; `reviews/numerics-plan-coordinator/evidence-B.md` §§3.1, 4.1, 6.2, measured on an earlier library (F-79); `x.zero` by reading, not measured. Code cited: `compiler/Types.java`, `useCompilerLibraries`, `useFortressLibraries`.
- **Could not resolve:**
  - "witness `typecase`": how a `typecase` over a *function* value of type `() -> T` yields a `T` — does it match the function's arrow type (`() -> ZZ32`, …) and call it in the clause? Language concept I lack; P-78 is not given, and the skill does not cover it.
  - "refused as a cyclic hierarchy": why declaring a coercion into `T` makes a cycle, and where one would try to declare it (in `Integral[\T\]`? in the program?). Unclear wording, and a checker concept I lack.
  - Headline "depends … on the library in scope": the body says both the compiler's prelude and the one library declare the same numeral types, so I cannot find what differs by library now. Possibly it held only on the "earlier library" the evidence measured. Unclear wording.
  - "measured on an earlier library": which of the entry's claims still hold on the current library is not said.
  - `x.one`: only `x.zero` is marked "by reading"; whether `x.one` was measured is not said.
  - What walk's `x + 1` does in the generic case (which value, which type) is not said; only that it "runs".
  - `useFortressLibraries`: the skill (`compiler.md`) names the call `useInterpreterLibraries()`. Possibly a different method; unclear which is meant.

## F-118 — a numeral's value reaches compiled code intact; large `NN32`/`NN64` print unsigned

- **Established:** On the compiled path a numeral keeps its exact value. Where no place types it, the checker inserts its default type's own coercion (`defaultNumeral`). Only a numeral the checker leaves with no coercion reaches the code generator's fallback (`forIntLiteralExpr`), which picks `ZZ32`, `ZZ64` or `ZZ` by bit length; which numerals take that route is unmeasured. A folded constant typed at a library number type is that type's constant (F-340); a numeral at a number type is its coercion folded to a constant or made once for the place (F-347). So `4294967295` and `18446744073709551615` keep their values; an untyped binding of the second is a `ZZ`. The compiled path prints an `NN32`/`NN64` value above the signed half as unsigned.
- **Conditions:** Compiled path. The values are gated at `ZZ`, `ZZ64`, `NN32` and `NN64`. The fallback route is unmeasured.
- **Consequence:** A worker can rely on large literals at these four types keeping their value compiled, and on unsigned printing of large `NN32`/`NN64`. Do not rely on the fallback's choice for any particular numeral.
- **Evidence:** Tests `compiler_tests/IntLiteralWrapRepairR2` (values) and `compiler_tests/UnsignedPrintingCompiled` (printing, F-313); code `Functionals.scala` `defaultNumeral`, `CodeGen.java` `forIntLiteralExpr`; detail `compile-ladder/repair-r2-literal-wrap/REPORT.md` and `compile-ladder/rung-static-numerals/REPORT.md` §1.
- **Could not resolve:**
  - "as walk does at `ZZ` and `ZZ64` (F-341)": the two numerals are listed in the order (2^32−1, 2^64−1) and the types in the order (`ZZ`, `ZZ64`); I read it as "walk also keeps them, at `ZZ64` and `ZZ` respectively", or as "walk keeps them when they are at `ZZ` or `ZZ64`". Whether walk keeps them at `NN32`/`NN64` is not said. Unclear wording.
  - Whether walk also prints large `NN32`/`NN64` unsigned is not said.
  - "the coercion desugarer": not defined in the skill; I take it to be the desugaring pass that inserts coercions. Term I lack.
  - "made once for the place": I take it from F-347 to mean a `static final` filled at class load.

## F-262 — a numeral's sign does not reach its type; `x^16` vs `x^(-16)`

- **Established:** A numeral has no sign, and its type does not carry one. The checker types every integer numeral as `NaturalNumeral[\n, r, v\]` (no sign in the static arguments) under both libraries. Both paths fold `prefix -` on a numeral into a numeral node of negative value before the checker, and fold `^` of numerals by an integer numeral up to 4096, but an integer base to a negative exponent is not folded: `10^16` is a numeral, `10^(-16)` stays an operation whose exponent is a numeral. Under walk the exponent is its default, read at `ZZ32`. So `x^16` and `x^(-16)` have exponents of the same type on both paths, and no overload on the exponent's type can tell them apart. A negated numeral at a program's own type is that type's prefix `-` applied to the coercion's result for the positive numeral, on both paths.
- **Conditions:** Integer numerals as exponents; both paths. The headline conclusion (no overload can tell) is by reading, not measured. The fold of `^` holds up to 4096.
- **Consequence:** Do not design an overload of `^` (or any operator) that distinguishes a positive from a negative numeral argument by type; branch on the value at run time instead.
- **Evidence:** `Specification/basic/lexical-structure.tex:1053-1080`; `scala_src/typechecker/impls/Misc.scala:469-472`; `compiler/desugarer/IntegerLiteralFoldingVisitor.java:315-325`; tests `tests/NumeralStaticDesignWalk.fss`, `compiler_tests/NegativeNumeralOwnType.test` (for the program-type minus); detail `reviews/integer-power-fable-judgement.md` §9.
- **Could not resolve:**
  - "fold `prefix -` on a numeral into a numeral node of negative value" against "the numeral itself has no sign" and "a negated numeral at a program's own type is the type's own prefix `-` applied to the coercion's result": if the fold already made a negative numeral node, I cannot see at which point the `-` is split off again to run the type's own `-`. Unclear wording.
  - Conflict with the skill: `interpreter.md` (row 968) and `compiler.md` (row 961) say a negative constant at a program's own type reaches its coercion *with* its sign, as -3. This entry says, on both paths, it is the type's `-` on the coercion of 3. I cannot tell which holds now.
  - "up to 4096": the exponent up to 4096, or the result? I read the exponent. Unclear wording.
  - "an `Int` value read at `ZZ32`": what `Int` is (a Java `int`? walk's value class?) is not said. Term I lack.

## F-341 — walk's numeral: its default, carrying the four numbers, converted where its place fixes a type

- **Established:** Under walk an integer numeral evaluates to `ZZ32`, `ZZ64` or `ZZ` by its value, and a radix-point numeral to the nearest `RR64`, one value per site, but the value also carries the numeral's four numbers. At a typed binding, an assignment, a field, a parameter, a declared return type and a coercion, walk converts it through the place type's coercion from `NaturalNumeral` or `RadixPointNumeral`, run with the four numbers as `ZZ` values, keeping one result per site and type. A folded constant at a library number type converts from its exact value without running the coercion. Walk refuses, at run time at that place, a numeral out of range, at a type with no coercion from it, or outside its coercion's `where` clause. In dispatch, walk first tries the numeral at its default type, then only the numeral type's own coercions, and resolves a tie in favour of the default. Several numerals fixing one type parameter give it the narrowest default holding them all. Examples: `q: QQ = 0.1` is exactly 1/10; `y: RR64 = 0.5` is identical to a computed 0.5; but `h = 0.5` is `false` for `h: QQ = 1/2`, since the library's `=` over `Any` takes the numeral at its default `RR64` (row 973).
- **Conditions:** Walk only. The `h = 0.5` result is pinned by no test.
- **Consequence:** Under walk a worker can rely on exact conversion at those six kinds of place; must not compare a non-default number to a bare numeral with `=` and expect equality by value; should expect refusals only when the place runs.
- **Evidence:** Tests `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`, `NumeralWhereRefusedWalk.fss`, `NumeralFoldedConstantLibraryWalk.fss`; code `interpreter/evaluator/values/Numerals.java`; detail `compile-ladder/rung-numeral-types/REPORT.md` and `compile-ladder/rung-static-numerals/REPORT.md` §1.
- **Could not resolve:**
  - "a store keeps its default alone": I cannot tell what a "store" is (an array `put`? a write into a mutable cell? a field write?) or how it differs from "an assignment", which is listed as converting. Unclear wording.
  - "and a coercion" as a place that converts: an explicit coercion call? the argument of a `coerce` declaration? Unclear wording.
  - "by its own type's coercions only": the numeral type's coercions (those *from* `NaturalNumeral`), rather than coercions from the default type, is my reading; it can be read the other way. Unclear wording.
  - `SEQV`: not defined in the skill beyond being the fallback comparison (`tests-writing.md`); I take it as identity/structural equality. Language concept I lack.
  - "one result per site and type" here versus P-176's "one value per place": a site evaluated at several types seems to get several results. Not a contradiction I can settle.

## F-346 — walk's `=` and `=/=` over `Any` meet a numeral at its default

- **Established:** Under walk, for a zero `u` of `NN32`, `NN64` or `RR32`, `u = 0` is `false` and `u =/= 0` is `true`; likewise `q = 0.5` is `false` and `q =/= 0.5` is `true` for `q: QQ = 1/2`. The cause: no `=` is declared between a numeral type and a number type (P-174), so `=` takes the numeral at its default (row 973), and `=/=` is defined as `NOT (a=b)` over `Any`, so it follows (row 966). Walk's `=/=` is to remain `NOT (e = e')`. The compiled path, until the switch-over, answers `false` for `u =/= 0` through the prelude's `=/=` on each integer type.
- **Conditions:** Walk; the listed types (by my inference, types with no `=` at the default `ZZ32`/`RR64`). Compiled answer stated for integer types only, and only until the switch-over.
- **Consequence:** Under walk, do not compare a value of these types with a bare numeral by `=` or `=/=`; bind the numeral at the value's type first. The two `XXX` tests are expected failures that record the defect.
- **Evidence:** `Library/FortressLibrary.fss:98`; tests `ProjectFortress/tests/XXXNotEqualNumeral.fss` (expected failure) and `XXXNumeralEqualsNumberWalk.fss` (`u = 0`); detail `compile-ladder/rung-literals-spec/REPORT.md` and `compile-ladder/rung-static-numerals/REPORT.md` §11.
- **Could not resolve:**
  - "So walk's `=/=` stays `NOT (e = e')`": a decision not to special-case `=/=`, or a plain observation? Unclear wording.
  - Why `ZZ64`, `ZZ` and `RR64` are not affected is not said; I inferred it from F-324 (an `=` at each type a number type coerces from), which the entry does not cite.
  - What the compiled path answers for `RR32` and `QQ` is not said.
  - Conflict with the skill: `interpreter.md` (row 966) advises writing `NOT (u = 0)` in place of `u =/= 0`; by this entry `u = 0` is also `false`, so `NOT (u = 0)` is also wrong. I cannot tell which a worker should follow.
  - The fix the entry implies (bind the numeral at the type, or an `=` pair with the numeral type) is not stated.

## F-347 — a compiled numeral's place is one value made before the program runs

- **Established:** On the compiled path, each place of a numeral whose type names no type parameter holds one value built before the program runs. The code generator folds the body of the place type's numeral coercion (library's or program's) over a fragment it can evaluate: constants, bound names, natives over the built-in types' representations, and calls of functions and methods within the fragment. If the fold ends in a JVM `int`, `long`, `float` or `double`, the place is a JVM constant; otherwise it is a `static final` filled once by calling the coercion's method (`coerce_T№natural` or `coerce_T№point`) with the four numbers as `ZZ` values. That method is compiled once, in the declaring component, and called from any component; a program type's minus on a negative constant runs once with it. A place whose type names a type parameter calls the method at every evaluation (row 957). A coercion body with two calls of the program's own functions in one operator or argument list (as `small(n) - small(m)`) spawns a task, and the spawn makes the class fail to load (row 971). Under walk, a folded constant at a library type converts from its exact value.
- **Conditions:** Compiled path; places whose type names no type parameter. The two departures are rows 957 and 971.
- **Consequence:** In a coercion body, bind the operands to locals before combining two calls of program functions. At a generic type, expect the coercion to run on each evaluation (the skill says: bind the value once at a top-level variable). A raising coercion stops the program at class load.
- **Evidence:** Code `compiler/codegen/NumeralCoercionFold.java`, `compiler/codegen/CodeGen.java`; tests `compiler/desugarer/NumeralCoercionFoldJUTest`, `library_tests/NumeralFoldIntegers`, `NumeralFoldFloats`, `compiler_tests/NumeralAcrossComponent`, `NumeralMinusOnceCompiled`, `NumeralCoercionOnceCompiled`; detail `compile-ladder/rung-static-numerals/REPORT.md` §1.
- **Could not resolve:**
  - "else": does the `static final` route also cover a fold that leaves the fragment before reaching a value (not only a fold that ends in a non-primitive, such as `QQ`)? I read it so, but the sentence pairs "else" only with the result's kind. Unclear wording.
  - "a program type's minus on a negative constant runs once with it": runs once in the same static initializer? Clear enough, but whether this means the negative constant reaches the coercion signed (skill `compiler.md`, row 961) or as `-` on the coercion of the positive numeral (F-262, P-174) is not said.
  - "the four numbers": for an integer numeral, `NaturalNumeral` has three static parameters (`n, r, v`); what the fourth is for the natural method (m = 0?) is not said.
  - The last sentence (walk's folded constant) seems to belong to F-341; its role here is unclear.

## F-131 — the one library's number tower is flat

- **Established:** In the one library, `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR64`, `RR32` and the trait `Numeral` are siblings under `Number` — no subtyping among them. `NaturalNumeral` and `RadixPointNumeral` lie below `Numeral`, and each of the eight converts from them. Coercions: each wider integer type from each narrower one; `RR64` from `ZZ32` and from `RR32`; `ZZ64` into `RR64` only explicitly; `QQ` from the five integer types. `NN32` into `RR64` is decided (P-75) but not yet built. `Number` declares no `=`; each number type declares an `=` at each type it coerces from or into. Under walk `SUM <|1, 2, 3|>` with no static argument is 6 (list read at `ZZ32`); an empty `SUM` over an additive group that is not a number dies (row 436).
- **Conditions:** The one library. The test gates every type except `RR32` and the numeral types; those are gated with F-139 and F-79.
- **Consequence:** Never rely on subtyping between number types; rely only on the listed coercions, and convert `ZZ64` to `RR64` explicitly. `NN32` to `RR64` is still to build.
- **Evidence:** Test `tests/FlatTowerRungF.fss` (no type is another's subtype; their coercions and `=`); detail `compile-ladder/rung-flat-tower/REPORT.md` §§5, 17.
- **Could not resolve:**
  - "each wider integer type converts from each narrower one": widths among signed and unsigned types (is `ZZ64` wider than `NN32`? `NN64` than `ZZ32`? `ZZ32` than `NN32`?) are not given. Unclear wording.
  - "only when written out (P-74)": I read "explicitly, by `asFloat`", from `library.md`; the entry alone leaves it open (written out how?).
  - From this entry's list I count 14 coercions between number types; F-324 speaks of 21. I cannot reconstruct the other seven.
  - "dies": at run time, how? `library.md` says `CastError`; the entry does not.

## F-324 — `Number` declares nothing; each number type declares its own `asFloat` and `=`

- **Established:** In the one library, `Number`'s `comprises` clause, `asFloat`, `=` and `exactValue` are removed. Nine types declare `asFloat` in their apis. 42 declarations give a pair of `=` for each of 21 coercions, so two numbers of different types compare by value where a coercion joins them directly, and otherwise by the fallback `a SEQV b` or by a written `asFloat(x) = y`. The vector norm is declared at each of the eight types. The reflective generator chooses among the five types formerly listed in the `comprises` clause. A program's own number type compares by its own `=` or by the fallback.
- **Conditions:** The one library (walk today). It builds P-160's second step and P-165.
- **Consequence:** A program's own number type that needs value equality must declare its own `=` (and, per `tests-writing.md`, extend `Equality`). Comparing two library numbers of types with no coercion between them is identity, not value, unless written via `asFloat`.
- **Evidence:** `Library/FortressLibrary.fss:380-381`, `.fsi:288-289`; tests `tests/NumberOwnTypeNoAsFloatWalk`, `NumberEqualityOwnTypeWalk`, `NumberMixedEqualityWalk`, `VectorNormElementTypesWalk`, `NumberOwnTypeArrayWalk`, `NumberOpenTraitPlusBesideArrayWalk`, the team's `ReflectiveQuickCheckTest`; detail `compile-ladder/rung-number-open/REPORT.md`.
- **Could not resolve:**
  - "the nine types": eight number types are named everywhere; the ninth is not said. If it is a numeral type, it contradicts P-174 ("a numeral type has no … `asFloat`"). Unclear wording.
  - "the 21 coercions": which they are is not listed, and F-131's list gives me 14.
  - "the reflective generator" and "the five former listed types": I take the generator to be the QuickCheck-style test generator, and the five to be those once listed in `Number`'s `comprises`; neither is said. Terms I lack.
  - "struck": I read removed from the text.

## F-180 — `import java` under walk: wired, four gaps, unused; `builtinPrimitive` chosen instead

- **Established:** Walk has machinery for `import java` (`ForeignComponentWrapper`, `ClosureMaker`), but four gaps stop it, and no test uses it. In a probe, six small Java patches closed the five gaps then present (two patches for gap 4), after which a component with two `import java` declarations printed under walk what the compiled path prints. Gap 1 (the type table) is now closed in the tree: `NamingCzar.fortressTypeForForeignJavaType` (three arguments) reads a Java type as the one library's, so a component with one such import now stops at gap 3, "Non-top-level reference to imported …" (row 845). P-58 chose a different mechanism, a `builtinPrimitive("…")` body naming a static Java method in `nativeHelpers/`; both its compiled half (F-298) and walk's half (F-299) are built. For any binding both paths share: (1) a helper raises by naming a compiled-prelude class such as `fortress.CompilerBuiltin$IntegerOverflow`; walk's `builtinPrimitive` loader translates this into the library's exception, but via `import java` walk ends with `FortressImplementationError` unless the probe's gap-5 patch is applied; (2) by reading, a helper whose parameters or results are compiled-path classes (e.g. `FZZ32Vector`) cannot take walk's values — the probe's closure converts only Java numbers, booleans, strings and `BigInteger`; 50 such parameters or results were counted once with `javap`; walk's loader refuses such a binding at load.
- **Conditions:** Walk; written `import java`. The count of 50 dates from before `nativeHelpers/simpleIntLiteralArith.java` was deleted.
- **Consequence:** Bind natives by `builtinPrimitive`, not `import java`. A shared helper should raise only exceptions both libraries declare and use only Java numbers, booleans, strings or `BigInteger` in its signature.
- **Evidence:** Code `repository/GraphRepository.java:957`, `compiler/NamingCzar.java:365-368`; detail `perf-probes/prelude/natives-shape.md` §1, `perf-probes/prelude/natives-binding-probe.md` §1 (its §2 measures the `import java` form), `compile-ladder/rung-natives-compiled/SKEPTIC.md`.
- **Could not resolve:**
  - Gaps 2, 4 and 5 are not described (gap 5 only by its patch's name); gap 2 is never mentioned, and "now stops at gap 3" leaves open whether gap 2 comes later or no longer stops anything. Unclear wording.
  - "in walk's world": I read it as "when the interpreter's library is selected"; not defined in the skill. Term I lack.
  - "the probe's patch for gap 5 (`gap5-helper-raise.patch`)": where the patch lives, and whether it is applied anywhere, is not said.
  - "a binding whose declared type no Java type carries": I read "whose declared Fortress type has no Java counterpart the closure converts"; the phrase reads awkwardly. Unclear wording.
  - Whether the 50 still stands after the deletion is not said.

## F-128 — walk converts by coercion at three kinds of type check

- **Established:** Walk converts a value by coercion at three kinds of check: a parameter (varargs included); an overloaded call that no declaration fits without coercion, which walk then dispatches again; and a typed binding or assignment. The coercion is chosen by the run-time value (P-59). Measured as not converted: a non-numeral value at a declared return (row 387; a numeral does convert there, F-341); a coercion with its own static parameter, unless it is a numeral coercion (row 513); an overloaded function's tuple parameter, or a tuple-typed field (row 395). By the code, unmeasured, not converted: a varargs or keyword element of the specification's tuple coercion, and the specification's arrow coercion.
- **Conditions:** Walk only.
- **Consequence:** Under walk, write a value at its declared return type, and do not rely on coercion into tuple parameters, tuple fields, or arrow types.
- **Evidence:** Tests `tests/Coercion*RungC.fss`; detail `compile-ladder/rung-interp-coercion/REPORT.md` §§1, 5, 9.
- **Could not resolve:**
  - "a varargs parameter included" against P-76's "Walk gaps: coercion through tuple and varargs parameters (rows 395 and 511)": one says a varargs parameter converts, the other that it is a gap. Perhaps they mean different things (the parameter as a whole vs its elements), but neither says so. Unclear wording.
  - Fields: F-341 lists a field among the places a numeral converts; here fields appear only as "a tuple-typed field" not converting. Whether a non-tuple field converts (as a constructor parameter?) is not said.
  - "the specification's tuple coercion … its arrow coercion": the specification's rules for coercion on tuple and arrow types; not in the skill. Language concept I lack.

## F-129 — a size at run time is a descriptor from `RTTIsize.of`

- **Established:** On the compiled path, each size value (such as the 3 of `Vec[\3\]`) has one run-time descriptor from `RTTIsize.of`; in a run-time subtype test a size is a supertype only of an equal size. A size read as a value is a `ZZ32` that the class loader writes in: `FZZ32.make` of an `int`, or beyond 31 bits `FZZ32.makeSize` of its digits, which raises "Not in range for ZZ32" (by reading). Closures and tasks capture a size as a free static parameter. A program whose sizes are all known at compile time loads, dispatches and runs compiled. Open cases: a size made from a number known only at run time does not run (`tests/NatReflectTest.fss` stops at load, row 307); a `ZZ32Vector` passed to a generic constructor fails at load (row 408); a dispatched overload arm whose static parameter has a concrete generic bound stops the compile in its sized form and dies at load in its type form (row 413); an object extending two instantiations of one trait, one at a static parameter, passes the checker and dies at load (row 414). Walk, unlike the compiled path, refuses at load `g(b: Tg[\3\])` beside `g(b: Tg[\4\])` (row 416), because its overloading check applies no exclusion of instantiations.
- **Conditions:** Compiled path, sizes known at compile time; the listed open cases excepted. The `makeSize` raise is by reading.
- **Consequence:** Keep sizes static in compiled programs; avoid the four open shapes. Do not overload on two size instantiations if the program must also run under walk.
- **Evidence:** `runtimeSystem/MethodInstantiater.java:225-237` (by reading); tests `compiler_tests/NatRt*`; detail `compile-ladder/rung-size-runtime/REPORT.md` §§1, 9. It builds P-41; capture is F-135.
- **Could not resolve:**
  - "in its sized form … in its type form": I read "when the static parameter is a size" vs "when it is a type", but "a static parameter [that] has a concrete generic bound" fits only a type parameter, so the "sized form" is unclear. Unclear wording.
  - "a concrete generic bound": a bound that is a generic type at concrete arguments, such as `T extends List[\ZZ32\]`? My guess. Unclear wording.
  - "beyond 31 bits … raises": does every size ≥ 2^31 read as a value raise, or only some? The skill (`compiler.md`, row 962) says it raises a `java.lang.Error` no `catch` sees; the entry does not say whether a `catch` sees "Not in range for ZZ32".

## P-173 — a numeral converts where it stands; the default where nothing fixes a type

- **Decided:** A numeral converts at its site. Where its place fixes a type, it converts at compile time, from its exact value, into that type. Where nothing fixes a type, it becomes the machine default: `ZZ32`, or `ZZ64` / `ZZ` when the value does not fit; `RR64` for a radix-point numeral. An expression of numerals alone first folds exactly into a signed constant, which then defaults like a numeral (`QQ` for a quotient). Exact defaults (`ZZ`, `QQ`) were declined, because microGPT's untyped hyperparameters would become rationals and every untyped index would need `asZZ32`.
- **Applies:** A place fixes a type when its declared type has a coercion from the numeral type (the eight number types; a program's own type may, P-174). `Any`, `Object`, `Number`, an unbounded type parameter and no declared type take the default. Limits: the default is only for a numeral (a literal after the fold), never for an expression of a numeral type. A `nat` parameter used as a value is a `ZZ32` where it is a size (P-40), and a `ZZ` where it is one of a numeral type's four numbers (P-174). A type parameter that several numerals fix takes the narrowest default holding all values (`RR64` if any has a radix point). A float numeral whose conversions into `QQ` and `RR64` tie reads `RR64`. At a typed place the conversion is exact or rounds once (P-76, P-172); out of range is refused statically. Walk does the same conversions, place by place, from the exact value, until it runs the checker (P-12). Examples: `x = 3` is `ZZ32` and `x SEQV z` is `true` for `z: ZZ32 = 3`; `bigN = 3000000000` is `ZZ64` (row 946); `x = 7/2` is `QQ`; `1/2 = 0.5` is `true`; `-2147483648` folds to a `ZZ32`; `gg(5, w)` with `gg` at `(ZZ32, T)` and `(Any, Any)` runs the `ZZ32` one (P-49).
- **Requires:** Workers must convert at the place, exactly or with one rounding; must give the stated defaults where no type is fixed; must not default an expression of a numeral type; must refuse out-of-range numerals statically. It bends P-26 at two points, accepted by the curator: the numeral types' names and static parameters follow the Working Draft, and places with no fixed type default instead of keeping the numeral's own type as the compiler's prelude does. The Draft's contradicted text goes to Appendix I: numerals "not directly converted" and "polymorphic" (`Specification-1.0-frozen/basic/expressions/literals.tex:132-141`), and a `nat` parameter usable wherever an `NN32` variable is (`basic/trait-parameters.tex:84-86`).
- **Unfinished:** The Appendix I entries ("for Appendix I"). Walk's checker (P-12), after which walk's interim place-by-place conversion changes. Row 946 is cited only as an example; what remains to build is not otherwise stated.
- **Could not resolve:**
  - P-26: what it says is not given; I infer something like "follow the compiler's prelude as the team's later word", but cannot confirm. The "bend" is then hard to weigh. Unclear without the record.
  - "walk converts … before it runs the checker (P-12)": "before" in time (walk converts, then checks) or "until" (an interim, until walk runs the checker)? P-176 says "until", so I read that. Unclear wording.
  - "each numeral converting into it exactly" for a type parameter whose narrowest default is `RR64`: a radix-point numeral into `RR64` generally rounds, so "exactly" seems wrong there. Unclear wording.
  - "conversions into `QQ` and `RR64` tie": a tie in overload resolution (both coercions equally specific)? I read it so; P-172 extends it to a tie among `QQ`, `RR32` and `RR64`. Language concept I lack.
  - "What it keeps and changes in form: the judgement's section 3, but for the numeral types' form, which P-174 holds": I cannot tell what is kept and what is changed without the judgement. Unclear wording.
  - "P-174 names the binary chapter's, which it leaves out": I read "P-174 names the binary chapter's contradicted text for Appendix I"; the sentence is elliptical.
  - The `gg(5, w)` example: what `w` is and why `T` matters is not said, though the conclusion is clear.

## P-174 — a numeral's type exists only at compile time; every number type takes it through a coercion

- **Decided:** A numeral's type is the Working Draft's `NaturalNumeral` (or `RadixPointNumeral` with a radix point), below `Numeral`, with its four numbers as static parameters: digit count `n`, digits after the point `m`, radix `r`, and the digits read as one integer `v` (so `3.125` is `RadixPointNumeral[\4, 3, 10, 3125\]`). The four are naturals of any size and are exact `ZZ` values when read in a coercion's body. Every number type, the library's included, takes a numeral through a coercion generic over the four numbers, whose body calls the type's constructor on values computed from them; the compiler instantiates and folds it (P-176). No numeral value exists at run time: a numeral type has no getters, `asFloat`, `asString` or `=` with a number type, and may be written only as a coercion's or an operator's parameter type. A numeral has no sign: at a program's type, `-3` is that type's prefix `-` on the coercion of `3`, and a type without `-` refuses it. Any other expression of numerals alone folds first (P-173) and reaches such a type only through its coercion from the folded value's type (e.g. `QQ` for `1/2`), since coercions do not chain. The binary chapter's numeral coercion and `opr ||` are left out.
- **Applies:** Both paths, every number type. The `NN32` bound of P-40 is for sizes, not for the four numbers.
- **Requires:** Declare number types' numeral coercions generic over the four numbers; do not give a numeral type getters, `asFloat`, `asString` or `=` with a number type; write a numeral type only as a coercion's or operator's parameter type; a program type that accepts `1/2` needs a coercion from `QQ`.
- **Unfinished:** Rows 960 (the digit count of `00.5`) and 974 (walk runs a numeral type written outside a parameter's type) are where the tree departs.
- **Could not resolve:**
  - "with its four numbers as static parameters": `NaturalNumeral[\n, r, v\]` (F-57, F-262) has three. Whether an integer numeral has an implicit `m = 0`, or has three numbers, is not said. Unclear wording.
  - Conflict with the skill: `interpreter.md` (row 968) and `compiler.md` (row 961) say a negative constant at a program's own type reaches its coercion with its sign; this entry says it is the type's `-` on the coercion of the positive numeral. Rows 961 and 968 are not among the departures listed here (960, 974). I cannot tell which holds now.
  - "No numeral value exists when a program runs" against F-341, where walk's value carries the four numbers, and `interpreter.md` (row 960), where walk's numeral has a `digits` getter. I read these as departures, but only row 960 is named; walk carrying the four numbers is not.
  - "an operator's parameter type": which operators may take a numeral type (e.g. `^`, per F-262)? Not said.
  - "Rows 960 and 974 hold where the tree departs": I read "record". Fine.

## P-176 — a numeral at a place is one value, the same on both paths, made once

- **Decided:** A numeral at a place denotes one value, identical on both paths and built once. The compiler folds the coercion instantiated for the numeral: an `int`, `long`, `float` or `double` result is a class-file constant; otherwise (e.g. `QQ`, a program's type) the constructor call on the constants runs once per place into a `static final` filled at class load, together with a program type's own `-` on the numeral. Walk fixes the coercion's static arguments from the four numbers, runs it at the place's first evaluation, and keeps the result for the place; it refuses a numeral only when the place runs, until it runs the checker (P-12). Reason: a numeral is a program constant, and a field filled once at load is the closest a JVM class file comes to an object constant.
- **Applies:** Every numeral place, both paths. Before the switch-over, the compiler's prelude carries this design too (P-37).
- **Requires:** Do not re-run a numeral's coercion per evaluation; build the value once per place. The prelude must implement it before the switch-over.
- **Unfinished:** Rows 957 (a place whose type names a type parameter runs the coercion each time) and 971 (a coercion that spawns a task) are departures. Walk's checker (P-12).
- **Could not resolve:**
  - "the compiler's prelude carries this design (P-37)" against the skill's rule (`compiler.md`) "Do not add a declaration to the three prelude files": I read P-37 as an exception, but P-37's content is not given.
  - "the same on both paths": the value, yes, but the time differs (compiled at class load, walk at first evaluation), so a raising coercion stops a compiled program before `run()` and a walk program only at the place. Whether that difference is accepted is not said.
  - "keeps the result for the place" against F-341's "one result per site and type". Not settled.

## P-76 — an integer numeral has the Draft's type `NaturalNumeral`

- **Decided:** An integer numeral's type is `NaturalNumeral` (P-174), which each of the eight number types converts from: exactly into the five integer types and `QQ`, with one rounding into `RR64` and `RR32`. Where nothing fixes a type it is `ZZ32`, or `ZZ64` / `ZZ` when it does not fit (P-173). `NaturalNumeral` replaces `IntLiteral` (the name both the compiler's prelude and the interpreter's library used), and `IntLiteral`'s own arithmetic is dropped, since expressions of numerals alone fold before the checker.
- **Applies:** Both paths. Walk, until it runs the checker (P-12), converts from the exact value at each place that fixes a type, and otherwise evaluates at its default.
- **Requires:** Do not use or extend `IntLiteral` or its arithmetic; convert at the place.
- **Unfinished:** Walk's coercion through tuple and varargs parameters (rows 395, 511).
- **Could not resolve:**
  - "before it runs the checker": read as "until", as in P-173.
  - Conflict with the skill: `compiler.md` (row 963) says a `typecase` selector numeral still has the type `IntLiteral` on the compiled path. So `IntLiteral` is not entirely gone; this entry does not list row 963 among the unfinished parts.
  - "varargs parameters" as a walk gap against F-128's "a varargs parameter included" (see F-128).
  - "exactly into the five integer types": exact only within range; the refusal out of range is in P-173, not here. Clear with P-173.

## P-172 — a radix-point numeral has the Draft's type `RadixPointNumeral`

- **Decided:** A numeral with a radix point has type `RadixPointNumeral` (P-174). `QQ` converts from it exactly (`3.125` is `3125/1000`; `q: QQ = 0.5` binds; `1/2 = 0.5` is `true`); `RR64` and `RR32` convert from it with one rounding to the nearest value, on both paths. Where nothing fixes a type it is an `RR64` (P-173): `Cell(0.5)` is a `Cell[\RR64\]`, and a bare numeral prints as that double, so `"" 2.50` is `"2.5"`. `RadixPointNumeral` stands beside the number types, as the compiler's prelude declares it, replacing the interpreter library's `value object FloatLiteral extends RR64`. At `round`, `floor`, `ceiling` or `truncate` a numeral converts into `RR64` (P-173's tie rule), so `round(2.50000000000000001)` is 2. Reason: the Working Draft keeps numerals unconverted so as not to lose precision, gives 3.125 the rational value 3125/1000, and allows at most one floating-point rounding; the curator reads it as: nothing lost in `QQ`, one rounding into a fixed-size float.
- **Applies:** Both paths. Walk converts from the exact value where the place fixes a type: a binding, a parameter, a field, a declared return type (so `y: RR64 = 0.5` is `SEQV` a computed `0.25 + 0.25`). By reading, no line of microGPT changes and its numerals keep their bits.
- **Requires:** Convert exactly into `QQ` and with one rounding into the floats; default to `RR64`; print a bare numeral as its double; do not keep `FloatLiteral` as a subtype of `RR64`.
- **Unfinished:** The specification's literals chapter and the coercions of `basic-lib/numbers.tex:43`, with an Appendix I entry, in the revision form (P-96). The team's `tests/NumberPrintTest.fss:16`, which asserts a numeral prints as written, changes.
- **Could not resolve:**
  - "changes" for `NumberPrintTest.fss:16`: has changed, or is to change? Tense is ambiguous. Likewise "follow" for the specification chapters; I read both as still to do.
  - "P-173's reading of a tie among `QQ`, `RR32` and `RR64`": P-173 states a tie between `QQ` and `RR64` only. Whether `RR32` is part of the same rule is not said there. Unclear wording.
  - `round(2.50000000000000001)` is 2: the nearest double is 2.5, so `round(2.5)` must give 2, which implies half-to-even (or half-down) rounding in `round`; the rule is not stated. Language/library detail I lack.
  - "stands beside the number types" against F-131's "below `Numeral`", with `Numeral` a sibling of the number types: I read "beside" loosely, as "not a subtype of any number type".
  - Walk's list of converting places (binding, parameter, field, declared return) omits the assignment and coercion that F-341 lists. Probably not exhaustive here; not said.
  - "at `b430f9f42`": a commit at which `FortressBuiltin.fsi:44` held `FloatLiteral`; clear enough.

## Summary

- F-57: blocked by "witness `typecase`" (a `typecase` over a `() -> T` function), "refused as a cyclic hierarchy", and what "depends on the library in scope" means now that both libraries declare the numeral types.
- F-118: mostly clear; "as walk does at `ZZ` and `ZZ64`" pairs two numerals with two types in unclear order; walk's printing of large `NN32`/`NN64` not said.
- F-262: blocked by folding `-` into a negative numeral node yet applying the type's own `-` to the positive coercion; conflicts with the skill's rows 961/968 (negative constant reaches the coercion signed).
- F-341: mostly clear; "a store keeps its default alone" unreadable; "and a coercion" as a place unclear.
- F-346: clear on behaviour; the skill's advice `NOT (u = 0)` (row 966) is wrong by this entry, since `u = 0` is also `false`; no workaround given.
- F-347: clear; "else" does not say whether a fold that leaves the fragment also goes to `static final`; the fourth number of a natural numeral unclear.
- F-131: mostly clear; "wider"/"narrower" among signed and unsigned not defined; its coercions count 14 against F-324's 21.
- F-324: blocked by "the nine types" (the ninth would contradict P-174 if a numeral type) and the unlisted 21 coercions.
- F-180: mostly clear on what to do; gaps 2, 4 and 5 not described; "walk's world" undefined.
- F-128: clear, except "a varargs parameter included" against P-76's varargs gap (row 511).
- F-129: mostly clear; "sized form … type form" and "concrete generic bound" unclear.
- P-173: mostly clear on the rule; P-26 unknown; "before it runs the checker" (before vs until); "converting into it exactly" at `RR64`; the closing "keeps and changes in form" sentence opaque.
- P-174: clear on the design; "four numbers" against `NaturalNumeral`'s three parameters; sign rule conflicts with the skill's rows 961/968, which are not listed as departures.
- P-176: clear; prelude "carries this design" against the skill's "do not add a declaration to the prelude" (P-37 unknown).
- P-76: clear; `IntLiteral` survives at a `typecase` selector (skill, row 963), not listed as unfinished; varargs gap against F-128.
- P-172: clear; tense of "changes"/"follow"; tie among three types against P-173's two; `round`'s half-way rule unstated.

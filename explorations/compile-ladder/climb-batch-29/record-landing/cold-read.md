# Cold read: climb batch 29, record landing (clean.txt)

File read: `/home/user/fortress-landing-29/explorations/compile-ladder/climb-batch-29/record-landing/clean.txt` (59 lines: 45 facts, 10 positions, then 4 gap-ledger rows, which I read with the fact headings).
Context used: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and term look-ups in `references/compiler.md` and `references/library.md`. Nothing else.

## F-32

- **Established:** The compiled path cannot call walk's glue classes, because a glue class takes walk's boxed values. A native binding (`builtinPrimitive("...")`) that both paths can run names a static helper of `nativeHelpers/`, over plain Java values. Of the one library's 402 live bindings, 374 name a helper and 28 still name a glue class. A breakdown taken earlier, at `a1f8c4b8b`, of 449 bindings: 154 needed only their string changed to the helper the prelude already binds; 59 had a helper, but not under that name and signature (23 of them because the prelude uses the name for another helper, such as the 12 wrapping operators); 158 needed a new helper; 78 needed more than that (36 methods of native I/O objects, 42 with no compiled analogue). 29 of the 449 belonged to `IntLiteral` and left with it. Where some named bindings stand now: `println` goes through `stdOut`, whose natives name `fileOps` helpers; `nanoTime` and `System`'s `args` name helpers; of the 42, `NativeArray`'s 7 name `arrayOps` helpers, `Thread`'s four, `abort` and `printTaskTrace` name `runtime` helpers, `getProgramArgsPrim` is deleted, and `Reflect`'s 28 still name glue classes.
- **Conditions:** The 449 split is the state at `a1f8c4b8b`, before any binding moved; the current split (374 and 28) is in F-299. `Reflect` is off microGPT's path.
- **Consequence:** Bind a native to a `nativeHelpers/` helper, never to a glue class, if the compiled path must run it. The glue bindings left are `Reflect`'s, which microGPT does not reach, so (my inference) they do not stand between microGPT and the switch-over.
- **Evidence:** A match of every binding against the helpers at `a1f8c4b8b`; F-298, F-299, F-314, F-330, F-333, F-335, F-337, P-170; detail in `compile-ladder/climb-batch-28/RECORD.md`, `perf-probes/prelude/natives-shape.md` section 2, `coordinator/CLIMB-BATCH-23.md` section 4.
- **Could not resolve:**
  - Whether `Reflect`'s 28 are the title's 28. The numbers match, but the entry never says so. Unclear wording.
  - "F-299 holds ... the 28 by type": by the type the binding belongs to, or by the kind of glue class? Unclear wording.
  - 449 down to 402: the 29 `IntLiteral` bindings and `getProgramArgsPrim` account for 30, leaving 419; the other 17 are not explained. Unclear wording (or a missing step).
  - "59 whose helper exists, but no binding names it under that name and signature": whose name, the operation's or the helper's? Unclear wording.
  - "78 that need more": more than a new helper, but what (a compiled object for an I/O value?) is not said. Unclear wording.
  - "`runtime` helpers": a class named `runtime` under `nativeHelpers/`, or code of `runtimeSystem/`? Unclear wording.
  - "live" bindings: as against what (commented out, unreachable)? Unclear wording; minor.

## F-73

- **Established:** When the compiled checker infers a generic function's static arguments, it allows coercion. For a type parameter that is the whole type of every parameter it appears in (as `T` in `pick[\T\](x: T, y: T)`), it picks the narrowest type that every argument converts into and that the bound allows. Candidates are the arguments' types, their coercion targets, and the bound, the bound only if it is a trait type other than `Object` or `Any`. Among overloads, one that needs a coercion ranks below one that does not. A tie among coerced overloads is refused as "Ambiguous coercion", except in three narrow cases. A type parameter fixed only by numerals, with no expected type, takes the narrowest default that holds all of them. When tied overloads differ only at positions where the call passes a numeral, the numeral is read as `ZZ32` (`ZZ64` or `ZZ` if too large); this is how P-173's tie rule is built. The coercion attempt refuses a call with an untyped function argument (row 507), and a call with more than 64 combinations of candidate types (row 506).
- **Conditions:** The compiled checker only. Only a type parameter that is a parameter's whole type, not one nested inside it (as `List[\T\]`). The 64-combination limit; a lone parameter fixed only by numerals counts as one choice.
- **Consequence:** A worker can expect `pick(a, b)` with arguments of different number types to infer the common coercion target, and should expect a refusal for a tie of coerced overloads, for an untyped function argument, and beyond 64 combinations; in those cases (my inference) write the static arguments or type the function argument.
- **Evidence:** Gated by `compiler_tests/NatLitArgChecker`, `CoercionGenericFnCompiledRungC`, `InferCoercionShapes`, and `XXXInferAmbiguousCoercion` for the tie; detail in `compile-ladder/rung-inference-checker/REPORT.md` section 3.2. It builds P-74 and P-49.
- **Could not resolve:**
  - "outside three narrow cases": the cases are not named, so a worker cannot tell from the entry whether a given tie is accepted. Unclear wording (the entry does not stand alone here).
  - "The coercion attempt refuses a call": is the call then a static error, or does only the coercing inference give up and the call goes on to other rules? Two readings. Unclear wording.
  - "a lone parameter that numerals alone fix counts one choice": a type parameter that occurs in one value parameter only, or a value parameter? Unclear wording.
  - "narrowest", among sibling number types with no subtyping: I take it as the type that the other candidates coerce into, but the entry does not define the order. Language concept I lack (not in the skill).
  - "untyped function argument": I take it as a function literal without parameter types (`fn x => ...`). Unclear wording; minor.

## F-57

- **Established:** A numeral's type depends on the path and on the library. The checker types a numeral by its form: `IntLiteral` or `FloatLiteral` under the compiler's prelude, `NaturalNumeral` or `RadixPointNumeral` under the one library, and converts it to its default where nothing fixes a type. Walk gives an integer numeral with no fixed type `ZZ32`, `ZZ64` or `ZZ` by magnitude, and converts it where its place fixes a type. In generic code, the only ways to get a value of type `T` that work on both paths are the getters `x.zero` and `x.one` and the witness `typecase` (a `typecase` over a function of type `() -> T`, one clause per number type). In code generic over `T extends Integral[\T\]`, `x + 1` fails the checker but runs under walk, since no coercion from a numeral into an arbitrary `T` can be declared: a generic coercion is refused as a cyclic hierarchy. Out-of-range numerals, or ones rounding to infinity, are refused statically by the checker for a bounded number type; walk refuses an out-of-range integer numeral at run time, where it does not fit.
- **Conditions:** Generic numeric code. The checker's typing differs between the two libraries until the switch-over.
- **Consequence:** In generic numeric code, do not write a numeral where a `T` is needed; use `x.zero`, `x.one` or the witness `typecase`. A program that runs under walk may still fail the checker on such a numeral.
- **Evidence:** `perf-probes/prelude/distance-triage.md` section 2.3; `reviews/numerics-plan-coordinator/evidence-B.md` sections 3.1, 4.1 and 6.2, measured on an earlier library; `x.zero` by reading, not measured. P-78, F-79, F-341, F-342.
- **Could not resolve:**
  - "the witness `typecase`": how a `typecase` over a function of type `() -> T` yields a `T`, and what a clause looks like. Language concept I lack (not in the skill); P-78 may hold it.
  - "measured on an earlier library": which claims were measured on it, and whether they still hold on the current one, is not said. Unclear wording.
  - "give a `T`": I read it as "produce a value of type `T`". Unclear wording; minor.

## F-74

- **Established:** Under walk, an integer numeral where nothing fixes a type is a `ZZ32` if it fits 32 bits, a `ZZ64` if it fits 64, a `ZZ` above (P-173). Where a place fixes a type, walk converts the numeral from its four numbers. Its run-time type is the value object `Int`, `Long` or `BigNum`, below `ZZ32`, `ZZ64` and `ZZ`. When walk infers a static argument it reads the numeral at its trait, so `Box(3)` is a `Box[\ZZ32\]` and `<|1, 2, 3|>` an `ArrayList[\ZZ32\]`. A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above, though P-173 makes it a `ZZ32` (row 962).
- **Conditions:** Walk only. The size case is a known deviation from P-173 (my reading, below).
- **Consequence:** Under walk, expect a large unfixed numeral to change type with its value, and expect inferred static arguments at the trait (`ZZ32`), not the run-time object (`Int`).
- **Evidence:** `FortressBuiltin.fsi:128`, `:131`, `:200`; `compile-ladder/rung-numeral-types/REPORT.md`; `reviews/numeral-switch-judgement.md` sections 2 and 3, a probe of an earlier design; F-140, F-341, F-344, row 962.
- **Could not resolve:**
  - "its four numbers": the four are not listed here or in the skill; F-79 names only `digitValue`, `radix` and `fractionDigits`. Concept I lack.
  - "where P-173 makes it a `ZZ32`": either walk today deviates from P-173, which wants every size value a `ZZ32` (a gap, row 962), or P-173 makes it a `ZZ32` in some cases only. I read the first. Unclear wording.
  - "A size used as a value is a `ZZ32`": the skill says a `nat` size is an `NN32` value. The entry and the skill seem to disagree on a size value's type. Unclear wording, or a conflict.

## F-79

- **Established:** In the one library, the numeral types are two value objects, `NaturalNumeral` and `RadixPointNumeral`, under `trait Numeral`, which is a sibling of the number types under `Number`; their fields are the four numbers. All eight number types convert from `NaturalNumeral`; `QQ`, `RR64` and `RR32` also from `RadixPointNumeral`. Each conversion comes with an `=` pair both ways. The five integer types and `QQ` convert exactly (`QQ` from `RadixPointNumeral` as `digitValue / radix^fractionDigits`); `RR64` and `RR32` round once, through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`. `RR64` comprises `Float` alone. The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under the one library and `IntLiteral`/`FloatLiteral` under the prelude. Under walk a numeral reaches these declarations where its place fixes a type. Gap: the compiled checker refuses `(3).minimum` and `(3).maximum` (row 581).
- **Conditions:** The one library; the prelude's names until the switch-over.
- **Consequence:** A worker can rely on these conversions and their rounding; `ZZ32`'s getters on a numeral are refused by the checker (row 581).
- **Evidence:** `Library/FortressLibrary.fsi`, `Numeral`; `compiler/Types.java`; tests `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, and the count stage's total of 0; `compile-ladder/rung-numeral-types/REPORT.md`. It builds P-174, P-76 and P-172.
- **Could not resolve:**
  - "the four numbers": not listed (three are named in passing). Concept I lack; not in the skill.
  - "an `=` pair both ways": equality operators with the numeral first and with the number first, or a conversion paired with its reverse? Two readings. Unclear wording.
  - Row 581's conditions: under the one library only, or under the prelude too? Not said. Unclear wording.

## F-118

- **Established:** On the compiled path a numeral keeps its exact value: the code generator carries a numeral typed at its own numeral type as an `int`, a `long` or a decimal string, by its bit length, and a numeral typed at a library number type as that type's constant. So `4294967295` and `18446744073709551615` keep their values, as walk keeps them at its defaults. The compiled path prints an `NN32` or `NN64` value above its signed half as unsigned. But it compares two values of the prelude's numeral type `IntLiteral` at `ZZ64`, so `lt(a: IntLiteral, b: IntLiteral) = a < b` called with `18446744073709551615` fails with `Not in range for ZZ64` (row 328). An untyped binding of such a numeral is a `ZZ`. Arithmetic on `IntLiteral` values of 64 bits or more keeps its value compiled, where walk stops with `IntegerOverflow`.
- **Conditions:** The compiled path, under the compiler's prelude (where `IntLiteral` is the numeral type), so until the switch-over. The comparison failure only for a value beyond `ZZ64`.
- **Consequence:** Do not compare `IntLiteral` parameters beyond `ZZ64` on the compiled path; type such a value at `ZZ` or a library type. Expect walk and the compiled path to disagree on wide `IntLiteral` arithmetic.
- **Evidence:** Gated for numerals at `ZZ`, `ZZ64`, `NN32`, `NN64` by `compiler_tests/IntLiteralWrapRepairR2`; unsigned printing by `compiler_tests/UnsignedPrintingCompiled` (F-313); the comparison failure (row 328) and the wide arithmetic are not pinned by any test, the latter seen only in the report's probe; `compile-ladder/repair-r2-literal-wrap/REPORT.md`. F-340, F-341, F-342, F-132.
- **Could not resolve:**
  - "So `lt(...)` fails": the "So" follows the sentence on unsigned printing, but the failure follows from the title's comparison at `ZZ64`, not from printing. Unclear wording.
  - "Walk stops the same program at `x + x`": no program with `x + x` is shown; I infer an `IntLiteral` parameter `x` doubled. Unclear wording.
  - "as walk does at `ZZ` and `ZZ64`": listed in the reverse order of the two numerals (`4294967295` is walk's `ZZ64`, the other its `ZZ`). Unclear wording; minor.
  - "a numeral of its own type": I read it as "typed at its numeral type", not at a number type. Unclear wording.

## F-151

- **Established:** In the interpreter's library, `Vector`, `Matrix` and their factories and operators bound the element type by `T extends { Number, MultiplicativeRing[\T\] }`. The checker accepts the bodies' arithmetic only through `MultiplicativeRing[\T\]`, since `Number` declares none; `Number` stays in the bound, though it no longer has a `comprises` clause. The eight number types meet the bound; `Number` and the numeral types do not, since none is a ring at its own type. So `Vector[\Number,n\]` is ill-formed, and `array1` and `array2` called at `Number` give a plain array. The four juxtapositions of a vector or matrix with a scalar `T` coexist with the library's juxtapositions with a `String`, and the checker finds no error there, but nothing measured shows what keeps a scalar `T` apart from a `String`. The norm is declared at each number type by its own `asFloat`. The checker accepts a call whose argument type is built from the caller's own type parameter under the same bound (`squaredNorm(me)`). The eight array-scalar operators have their own bounds, also with `Number`.
- **Conditions:** The interpreter's library. Element types outside the eight number types do not make vectors.
- **Consequence:** Give vector and matrix code an element type among the eight number types, and bound generic code by the same pair; do not expect `Vector[\Number,n\]`.
- **Evidence:** Gated under walk by `tests/ArrayElementAlgebra.fss`; the bound is the default recommended in `reviews/array-fork2-judgement.md` (sections 2.5, 2.9, way 3, 4); F-324, F-53, F-229, F-227, F-119.
- **Could not resolve:**
  - What role `Number` still plays in the bound, now that it has no arithmetic and no `comprises` clause. Not said. Unclear wording.
  - "no run measures what now keeps a scalar `T` apart from `String`": is this an open risk (an overload pair the checker should refuse), or only an unmeasured reason? Unclear wording.
  - "way 3 (the ring alone, measured)": a section label of the judgement; meaningless without it. Unclear wording; minor.

## F-229

- **Established:** `array1` and `array2` return a vector or a matrix only at the eight number types, chosen by a `typecase` over a witness of their result type; at any other element type (`Number`, `AnyIntegral`, others) they return a plain array. Each branch builds the array at its type and returns it through `cast`. Since `Array1` and `Array2` are invariant, a branch matches only its own type exactly. The witness is of the result type, not the element type, because at `T = Int` a witness `() -> Int` would match the `ZZ32` branch, and casting that `ZZ32` vector to an array of `Int` throws `CastError` (row 722). Under walk a type parameter inferred from a `ZZ32`, `ZZ64` or `RR64` value is that type, so it gets a vector. The specification makes an array of `Number` elements a vector (row 729, contested).
- **Conditions:** The eight number types exactly. The run-time behaviour is gated under walk only; the compiled checker's acceptance is measured by the distance stage, which reports but does not fail the gate.
- **Consequence:** To get a vector or matrix from `array1`/`array2`, use an exact number type; at an abstract type expect a plain array. A compiled refusal of this code would not turn the gate red.
- **Evidence:** `tests/ArrayFactoryNumberTypes`, `ArrayFactoryAbstractNumber`, `tests/ArrayInferredElementVectorWalk` under walk; the distance stage; `compile-ladder/rung-library-factories/REPORT.md` sections 1, 3, 4.
- **Could not resolve:**
  - "in `additiveIdentity`'s shape": a pattern of a library function I do not know. Not in the skill. Concept I lack.
  - "a witness of their result type": I take it as a function of type `() -> Array1[\T,n\]` (or the matrix type), as F-57's witness `typecase`, but the entry does not say. Concept I lack.
  - "(row 729, contested)": `references/records.md` lists `CONTESTED` as a ledger status, but defines it only through the row template, which I may not read; so what it asks of a worker (follow the library, or the specification?) is not clear. Unclear wording.
  - "`AnyIntegral`": a library trait not in the skill. Concept I lack; minor.
  - Whether the compiled path, at run time, does the same as walk. Not said. Unclear wording.

## F-262

- **Established:** A numeral's sign never reaches its type, on either path, so no overload on a numeral exponent's type can tell `x^16` from `x^(-16)`. A numeral has no sign in the specification. The checker types every integer numeral as `IntLiteral` (prelude) or `NaturalNumeral` (one library) before converting it. Both paths fold `prefix -` on a numeral into a numeral node of negative value before the checker, and fold `^` by an integer numeral, but not at a negative exponent: `10^16` becomes a numeral, `10^(-16)` stays an operation with a numeral exponent. Walk's numeral is its default, an `Int` read at `ZZ32`. A negative constant at a program's own number type reaches that type's coercion as a `NaturalNumeral` of negative value under walk (row 968), and with its sign on the compiled path (row 961).
- **Conditions:** Both paths; both libraries.
- **Consequence:** A design that picks an overload by a numeral exponent's sign cannot work; the sign must be tested on the value.
- **Evidence:** By reading, no run: `Specification/basic/lexical-structure.tex:1053-1080`; `Misc.scala:468-469`; `compiler/desugarer/IntegerLiteralFoldingVisitor.java:292-302`; `reviews/integer-power-fable-judgement.md` section 9. F-74, F-339, F-341, F-342.
- **Could not resolve:**
  - "fold `^` by an integer numeral": must the base be a numeral too (as in `10^16`), or any integer? The example has a numeral base. Unclear wording; minor.

## F-278

- **Established:** The library's subscripts over a generic index type form a valid overloading at every instance. The index parameter is bounded by `Index`: `ZZ32` extends it, the ranges exclude it, and a tuple type whose elements are all `Index` types is an `Index`, outside `Object`, on both paths. With this change the 124 subscript errors of F-245 went (191 to 67 on climb batch 21's base) and none came. Both the checker and walk read the library's `Index` by qualified name, so a program's own `Index` is a different type; walk refuses a program's top-level type named `Index` (or `Indexed`) as ambiguous. `()` is not an `Index`. A type that extends only `Index` is an `Object`. A program's generic over an indexed type's index parameter must bound it by `Index` for the checker. A numeral at `Index` takes its default, `ZZ32`, on both paths. Gaps: the checker refuses a tuple expression at a function over `Index` (row 805); walk loads a function over `Index` beside one over a tuple type whose elements neither lie below nor exclude `Index`, which the checker refuses (row 806).
- **Conditions:** Both paths, except the two gaps named. The error counts are on climb batch 21's base.
- **Consequence:** Bound an index type parameter by `Index`; do not name a top-level type `Index` or `Indexed`; do not pass a tuple expression to a function over `Index` on the compiled path.
- **Evidence:** `tests/TupleIndexBoundWalk.fss`, `tests/TupleIndexExclusionWalk.fss` with its `.test`; the distance stage, which checks every operator (F-281); `compile-ladder/rung-index-bound/REPORT.md` sections 1, 5, 6; Appendix I's `revival-index`.
- **Could not resolve:**
  - "Under the full check of symbolic operators": a checker mode or setting not in the skill. I guess it is the distance stage's check of every operator (F-281). Concept I lack.
  - "191 to 67": a total of which errors, in which run? Unclear wording.
  - "ranges exclude it": the library's range types declare `excludes Index`, or the bound keeps them out? Unclear wording; minor.

## F-285

- **Established:** In the components that the distance stage checks, the interpreter's library writes the static argument of every big-operator clause form whose operator's bound names its own parameter (as `SUM[\T\]`, `BIG MIN[\ZZ32\]`), and of every list comprehension (`<|[\E\] self[i] | i <- r |>`); this is P-78's workaround for row 731. Left unwritten are big operators with a plain bound (`BIG ||`, `BIG AND`, `BIG OR`), which the checker takes at their bound, and `BIG LEXICO`, which has no static parameter. `__bigOperator2`'s fused arm casts its result to `O0`, through the library's cast device for an arm whose type the `typecase` cannot show, as `__builtinFactory1`'s `N[\0\]` arm does. So the distance stage meets no site of rows 731 and 632, but row 731's checker gap remains for user programs and the team's demos. Under walk, `List`'s strided subscript now answers a `List[\E\]`; `PureList`'s answers objects at their run-time types, but `ZZ32` or `String` elements at the element type (row 824).
- **Conditions:** The library's own sites only; user programs still meet row 731 (write the static argument, as `references/library.md` already says).
- **Consequence:** When writing library code with such a reduction or comprehension, write its static argument; for an arm whose type `typecase` cannot show, use the cast device.
- **Evidence:** File and line citations in `Library/FortressLibrary.fss` and `Library/List.fss`, `Library/PureList.fss:73`; tests: the distance stage (`explorations/coordinator/tools/distance/run.sh`, its typecheck kind 0), `tests/WrittenReductionArgumentsWalk`, `tests/NestedReductionFusion`, `tests/PureListStridedSubscriptWalk`; `compile-ladder/rung-body-arguments/REPORT.md` sections 3, 5, 7, 9; F-264.
- **Could not resolve:**
  - "the twelve components the distance checks": `references/compiler.md` says the distance stage checks fourteen components. Unclear wording, or a conflict.
  - "clause form" and "whose big operator's bound names its parameter": I read a big operator with generator clauses, whose type parameter has a self-referring bound (`T extends AdditiveGroup[\T\]`). Concept I lack (not in the skill).
  - "`__bigOperator2`'s fused arm": `references/library.md` says no desugaring calls `__bigOperator2`, so what reaches this arm, and what it fuses, is not said. Unclear wording.
  - "the library's cast device" and "an arm whose type the `typecase` cannot show": concept I lack; F-264 holds it.
  - "row 632": its subject is not given. Unclear wording.
  - "its typecheck kind 0": I read "the distance stage's count of errors of kind typecheck is 0". Unclear wording; minor.
  - The `PureList` sentence: is answering objects at their run-time types a gap (row 824) to avoid, or accepted? Unclear wording.

## F-304

- **Established:** On both paths, a numeral with a radix point becomes its `RR64` or `RR32` by a single rounding of its exact value, as the specification asks ("at most one floating-point rounding error"). The compiled path rounds the exact quotient once in `CodeGen.forFloatLiteralExpr`; walk rounds once through `simpleDoubleArith.numeralToDouble` and `numeralToFloat`.
- **Conditions:** Both paths; `RR64` and `RR32`.
- **Consequence:** A worker can rely on correctly rounded float numerals on both paths.
- **Evidence:** `compiler_tests/FloatNumeralOneRounding.test`; `basic/expressions/literals.tex`, "Literals"; `compile-ladder/rung-natives-float/REPORT.md`; F-340, F-79.
- **Could not resolve:**
  - Only a compiled test is named; whether walk's half is gated (perhaps by F-79's tests) is not said. Unclear wording; minor.

## F-341

- **Established:** Walk's numeral is a value at its default type that carries the numeral's four numbers. An integer numeral is a `ZZ32`, `ZZ64` or `ZZ` by value; a radix-point numeral is the nearest `RR64`; one value per source site. Where a place fixes a type (a typed binding, an assignment, a field, a parameter, a declared return type, a coercion), walk converts through that type's coercion from `NaturalNumeral` or `RadixPointNumeral`, called with the numeral object, one result per site and type. Out of range, or at a type with no such coercion, the numeral is refused there when it runs. A store keeps the default alone. Dispatch first fits the numeral as it is, at its own type or its default, then by its own type's coercions only, and breaks a tie at the default. A type parameter that several numerals fix takes the narrowest default holding them all. So `q: QQ = 0.1` is exactly 1/10, `y: RR64 = 0.5` is `SEQV` a computed 0.5, and `h = 0.5` is `true` for `h: QQ = 1/2`.
- **Conditions:** Walk only. Refusals are at run time, at the place.
- **Consequence:** Under walk, a numeral's value depends on where it stands: give it a typed place to get an exact `QQ` or a range check; an untyped numeral stays at its default.
- **Evidence:** `interpreter/evaluator/values/Numerals.java`; tests `tests/NumeralTypesWalk.fss`, `NumeralOwnTypeWalk.fss`, `NumeralNoCoercionRefusedWalk.fss`, `NumeralAtReturnWalk.fss`; `compile-ladder/rung-numeral-types/REPORT.md`.
- **Could not resolve:**
  - "the numeral's four numbers": not listed. Concept I lack.
  - "a store keeps its default alone": what is a store here (an array element's `put`, a write to an untyped variable?), and is it a gap? Unclear wording.
  - "at its own type or its default, then by its own type's coercions only": "its own type" is `NaturalNumeral`/`RadixPointNumeral`, but coercions are declared in the target types, so "its own type's coercions" reads two ways (coercions from the numeral type, or coercions that the numeral type declares). Unclear wording.
  - "`SEQV`": an operator not in the skill. P-171, later in the file, shows it is object identity; F-341 alone does not say so. Concept I lack (resolved only by another entry).
  - "`h = 0.5` is `true`": here `=` is an equality test, though the skill gives `x = e` as a declaration. Readable from context, but two readings at first sight. Unclear wording; minor.

## F-169

- **Established:** The team's Working Draft never wrote static-argument inference, never named the type that a library gives an integer numeral, and never named a range's integer type, and its later restart adds nothing on these. Its inference chapter is a heading and notes; it described numeral types such as `NaturalNumeral[\n,10,v\]` and said libraries define coercions from numerals to integers and rationals, but a note leaves the numeral types' hierarchy undescribed. So the current specification's text on these three topics is the revival's own: it states F-173's inference rule and F-170's ranges, and puts `NaturalNumeral` and `RadixPointNumeral` below `Numeral`, with the four numbers as fields.
- **Conditions:** The three topics only.
- **Consequence:** A citation of the specification on these topics cites the revival, not the team; a worker must not present it as the team's design.
- **Evidence:** `reviews/numerics-plan-coordinator/evidence-B.md` sections 1 and 2; `Specification-1.0-frozen/basic/expressions/literals.tex:87-96` and `:132-148`; `Specification/basic/expressions/literals.tex:139` (`revival-numerals`); P-174, F-345, F-173, F-170.
- **Could not resolve:**
  - "the Working Draft": I take it to be `Specification-1.0-frozen/`, from the citation, but the entry does not say. Unclear wording.
  - "The later restart": a later document or effort of the team, not named or located. Unclear wording.
  - "the numeral's four numbers": not listed; the Working Draft's `NaturalNumeral[\n,10,v\]` shows three static arguments. Concept I lack.

## F-122

- **Established:** `round` of an `RR64` or `RR32` sends an exact half to the even integer on both paths. NaN gives 0; a value beyond the `ZZ64` range saturates to its bounds. A radix-point numeral given to `round`, `floor`, `ceiling` or `truncate` first converts into `RR64`, so one within half an ulp of a tie rounds as its nearest double does: `round(2.50000000000000001)` is 2 (P-172).
- **Conditions:** Both paths. NaN and saturation are observed and read, not gated.
- **Consequence:** Expect banker's rounding; do not rely on a numeral's digits beyond double precision near a tie; NaN and saturation have no guard test.
- **Evidence:** Ties gated under walk by `tests/RoundHalfEvenRungR.fss`, compiled for `RR64` by `library_tests/RR64FunctionsRungF.fss`; compiled `RR32` ties seen in a probe; the near-tie numeral by `tests/RoundNearTieNumeral.fss`; NaN and saturation seen in a walk probe and a compiled differential and read in `Float.java:384`, `RR32.java:326`, `simpleDoubleArith.java:132-134`; `compile-ladder/rung-round-half-even/REPORT.md`.
- **Could not resolve:** Nothing.

## F-128

- **Established:** Walk applies a coercion at three kinds of type check: a parameter (varargs included); an overloaded call that no declaration fits without coercion, which walk then dispatches again with coercion; and a typed binding or assignment. Walk picks the coercion by the run-time value (P-59). Measured as not converted: a non-numeral value at a declared return type (row 387), a coercion that has its own static parameter (row 513), and an overloaded function's tuple parameter or a tuple-typed field (row 395). Not converted by the code, not measured: a varargs or keyword element of the specification's tuple coercion, and its arrow coercion.
- **Conditions:** Walk only. The listed places are gaps.
- **Consequence:** Under walk, rely on coercion only at the three checks; at a return, a tuple parameter or field, or through a generic coercion, convert explicitly.
- **Evidence:** Gated by `tests/Coercion*RungC.fss`; `compile-ladder/rung-interp-coercion/REPORT.md` sections 1, 5, 9; F-341.
- **Could not resolve:**
  - "the specification's tuple coercion, and its arrow coercion", and a tuple's "keyword element": coercion of tuples elementwise and of function types, as I guess, but not in the skill. Concept I lack.

## F-327

- **Established:** For `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, the shifts `LSHIFT` and `RSHIFT`, the power `^` over an `AnyIntegral` count or exponent (and `ZZ`'s `shift`) are plain Fortress code that converts the count or exponent and calls a public bare `builtinPrimitive` binding with a narrow header: a `ZZ32` count for `ZZ32`, `NN32` and `ZZ`, a `ZZ64` count for `ZZ64` and `NN64`, and a `ZZ32` exponent; these bindings are declared in the api. Private Fortress functions (`shiftCount32`, `shiftCount64`, `powerCount32`, `countNN32`, `exponentNN32`) reproduce the old glue's behaviour: `Int.shiftCount`'s saturation and `Int.powCount`'s sign and parity, with a `ZZ` count or exponent clamped in `ZZ` and read by `.asZZ32`. Ten helpers are new and five existed. The walk test's expected values are the glue's. So the 16 bindings are among F-299's 374 that name a helper, a `ZZ32` count or exponent goes straight to its binding, and P-69 and P-153 hold on both paths here.
- **Conditions:** These five types and these operators.
- **Consequence:** Shifts and powers no longer need walk's glue; a worker can call the bare bindings directly with a `ZZ32` (or `ZZ64`) argument.
- **Evidence:** `Library/FortressLibrary.fss:780-825`, `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:401-427`; tests `tests/NativeHelperShiftPowerWalk`, `compiler_tests/NativeHelperFamilyShiftPowerCompiled`; `compile-ladder/rung-natives-shift-power/REPORT.md`.
- **Could not resolve:**
  - "Ten new helpers and five existing" makes 15, but "the 16 bindings": is one helper bound twice, or is a count wrong? Unclear wording.
  - "public bare binding" and "narrow header": I read a public declaration whose body is only `builtinPrimitive(...)`, with a concrete parameter type. Unclear wording; not in the skill.
  - "`Int.powCount`'s sign and parity": what sign and parity rule (of a negative exponent?) is kept. Unclear wording.
  - "P-69 and P-153 hold": what they decide is not given here. Unclear wording.

## F-173

- **Established:** The specification's inference chapter states the rule that the compiled checker builds (P-46, P-48, P-49): first the declaration is chosen, then its static arguments are inferred. A type parameter mentioned inside a parameter's type (`List[\T\]`) is fixed by the argument at that position. One that is the whole type of one or more parameters, and nothing else fixes, takes the narrowest type within its bounds that every such argument has or converts into: `ZZ64` for a `ZZ32` and an `NN32`. If there is none, and no numeral settles the tie, it takes its bound, narrowed by what the expected type requires of the return type; so does one that neither an argument nor the expected type fixes. Inference never gives `BottomType`. The compiled path departs from the chapter, among other ways: its prelude lacks `NN32`'s coercion into `ZZ64`, so `ZZ32` and `NN32` give `ZZ`, and no callout says so (row 442). The chapter's callouts give walk's departures, such as the `BottomType` return walk gives a function expression with no declared return type (row 587).
- **Conditions:** The chapter's rule; the departures are listed only in part ("among others").
- **Consequence:** Cite `Specification/basic/inference.tex` as the rule; on the compiled path, until the switch-over, expect `ZZ` for a `ZZ32` with an `NN32`.
- **Evidence:** Tests `compiler_tests/InferLone*`, `tests/InferLone*Walk.fss` on both paths; `compiler_tests/XXXInferPromoteNN32` (row 442); `compile-ladder/rung-instance-bound/REPORT.md`; `Specification/basic/inference.tex:45-122`, `:237-299`, `:395-456`.
- **Could not resolve:**
  - "no numeral settles the tie": a tie between which candidates, when there is no narrowest type? Unclear wording.
  - "narrowed by what the call's expected type requires of the return type": the bound intersected with the expected type, or replaced by it? Unclear wording.
  - "the declaration is chosen first, then its static arguments are inferred": F-73 ranks coerced declarations by the inference's result, which reads as the two steps mixing. I cannot tell if they conflict. Unclear wording.
  - "among others": the other departures are not listed or pointed to. Unclear wording.

## F-272

- **Established:** The specification's "Coercion Resolution" example, over its own traits `ZZ32`, `ZZ64` and `ZZ128`, declares `ZZ32 excludes { ZZ64, ZZ128 }` and `ZZ64 excludes { ZZ128 }`, which the chapter's definitions need: `T` rejects `U` when every type that coerces to `T` excludes `U`; `T` is no less specific than `U` when it is a subtype of `U`, or excludes, coerces to and rejects it. So which declaration is more specific depends on exclusions. A probe with the traits renamed `S32`, `S64`, `S128` ran the revised example on both paths: `f(S32Of)` chose `f` on `S64` and gave 1.
- **Conditions:** The example as revised; its printed form is not gated.
- **Consequence:** When types coerce into one another, declare their exclusions, or the more-specific choice fails.
- **Evidence:** The probe; row 394 (fixed) and its walk test `tests/CoercionMostSpecificRungC.fss`, over three traits of the example's shape; `compile-ladder/rung-spec-integer-rules/decision-record.md` section 4, decision 6; `Specification/basic/conversions-coercions.tex:521-537` and `:601` onward.
- **Could not resolve:**
  - "the revised example": revised by the revival? Did the team's example lack the exclusions? The title says "declares" in the present. Unclear wording.
  - "`S32Of`": I take it as a value of type `S32`. Unclear wording; minor.

## F-78

- **Established:** The compiled checker instantiates a type parameter that nothing at a call fixes at the intersection of its upper bounds, never `BottomType`. With an expected type, it tries the call in this order: subtyping without the expected type (kept if its result converts to it), subtyping with it, coercion with it, coercion without it. The second lets a call type-check whose untyped function argument only the expected type fixes, which the coercion attempt cannot check (row 507). P-49 decides the first and third steps; the second and fourth are the instance-bound rung's own choice (decision D4). An argument of intersection type fixes a parameter at the whole intersection, not one conjunct (row 541). The run time has no class for an intersection type, so such an instance fails when it loads (row 559).
- **Conditions:** The compiled checker. The second and fourth steps are an agent's choice, not the curator's.
- **Consequence:** Avoid inferring a type parameter at an intersection on the compiled path: it type-checks but dies at load. The order's second and fourth steps are open to new evidence (my inference, since no position fixes them).
- **Evidence:** Gated by `compiler_tests/InferResultOnly*` and `InferContextKeepsFit`; `compile-ladder/rung-instance-bound/REPORT.md` sections 1, 7; the order by reading, `decision-record.md` D4, `scala_src/typechecker/impls/Functionals.scala:779-783`. It builds P-48 and P-49.
- **Could not resolve:**
  - Row 541: is fixing at the whole intersection a gap or the intended rule? Unclear wording.
  - "such an instance": an instantiation of a generic at an intersection type. Unclear wording; minor.

## F-334

- **Established:** The compiled checker orders a call's candidates, a coercion's candidates and a trait's ancestors by a linear extension of their partial order, comparing each pair once, so no call with 32 or more candidates stops it any more. A tie among the most specific candidates keeps the first minimal candidate in the call's order of overloadings, an order that depends on the build as well as on the program (row 935). On the one library the results equal those of the sort this replaced, and the distance stage now checks `value object Char` to its end with no crash.
- **Conditions:** The compiled checker. The tie result can vary with the build.
- **Consequence:** Large overload sets no longer crash the checker; do not rely on which candidate wins a tie among most specific ones.
- **Evidence:** `scala_src/useful/PartialOrder.scala` (`minimal`, `linear`) at the cited lines of `Functionals.scala`, `CoercionOracle.scala`, `Formula.scala`; tests `compiler_tests/PartialOrderCandidatesCompiled`, `TieAmongMostSpecificCompiled`, `PartialOrderJUTest`, the distance stage (`#crash none`); `compile-ladder/rung-checker-partial-order/REPORT.md` sections 1, 2, 6, 8.
- **Could not resolve:**
  - "so no call stops it at 32 candidates or more": why 32 and what "stops" was (a crash of the old sort) is not said. Unclear wording.
  - "which follows the build as well as the program": in what way the build changes the order (file order, hash order?). Unclear wording.

## F-35

- **Established:** The `FortressLibrary` api has 9 declarations with a dead size, a size parameter that occurs in none of the declaration's parameter types or return type: the three one-dimensional `subarray` methods (`nat o`), the two- and three-dimensional `subarray` (`nat o0`, `o1`; `o0` to `o2`), and the traits `Rank`, `Indexed1`, `Indexed2`, `Indexed3`, whose `nat n` is in no member's type but tells `Rank[\1\]` from `Rank[\2\]`. The component's `subarray` bodies read the offsets as values. The api checks clean, since a size that reaches no type, name or value is no error (P-40). A census of 2026-09-21 found 25 and missed one; the 17 vector and matrix operators have since lost their sizes. If a component declares a function without the api's dead size, the export checker reports the api's declaration as missing, because it compares static-parameter lists by length, name and kind.
- **Conditions:** The `FortressLibrary` api, now.
- **Consequence:** Keep a dead size in the component's declaration as in the api, or the export check reports the declaration missing.
- **Evidence:** `FortressLibrary.fsi:1400`; `perf-probes/nat/REPORT.md` sections 2 and 7; P-40.
- **Could not resolve:** Nothing.

## F-44

- **Established:** The compiled checker enforces the multiple instantiation exclusion rule (no type extends two different instantiations of one generic trait) and relies on it: with the rule relaxed alone, the Return Type Rule lets a program through that dies with `IncompatibleClassChangeError`. The team's JVM type mapping relies on it too, so that a template-expanded class can carry the type relations as Java ones. Walk applies no such rule: it accepts a type that extends two instantiations, and its overloading check does not treat two instantiations as excluding (row 416). P-43 keeps the rule. The one library meets it through the flat number types and three changes of `952892a00`: `TotalComparison` extends `Comparison` and `StandardMinMax[\TotalComparison\]` instead of `StandardTotalOrder[\TotalComparison\]`; `AnyMaybe` extends `AnyUniqueItem` alone; `andCondCombine` picks `andRelCond` by a `typecase` instead of a second `ANDCOND`. So under walk `p1 ANDCOND p2` of two relational predicates is no longer itself a relational predicate (row 458). The distance stage finds no exclusion error.
- **Conditions:** The checker and the compiled run time; walk does not apply it.
- **Consequence:** Never make a type extend two instantiations of one generic trait, even though walk accepts it; library changes must keep the rule.
- **Evidence:** `OverloadingOracle.scala:81-105` and the probe `ProbeMIEPick`; `Papers/Implementation/TypeMapping.tex:125` (read); `reviews/multiple-instantiation-exclusion.md` sections 1 to 3; the cited lines of `FortressLibrary.fsi` and `.fss`; F-48, F-53, P-43.
- **Could not resolve:**
  - "relational predicates, conditions built from a relation over a generator, which `filter` fuses": what such a predicate is and what fusing does. Concept I lack (not in the skill).
  - Row 458's effect: is it only a lost optimisation of `filter`, or a change in result? Unclear wording.
  - "the Return Type Rule": I take it as the skill's rule that the more specific overload's return type must fit the other's. Unclear wording; minor.

## F-58

- **Established:** On an earlier library, microGPT's flat program C4 had 26 errors of its own under the compiled checker, none from a numeral's type: 15 arrays without sizes (`Array[\RR64,ZZ32\]` where the library wants `Vector`, `Matrix` or `Array3`), 5 numeral powers such as `10.0^(-5)` refused as ambiguous (row 533), and 6 small slips. With decision D's diff, which sizes the arrays (P-87), 14 remained: the 5 powers, 3 `DOT` calls that failed on the api's unused sizes, 1 bridge (`adam`'s) that passes arrays sized only at run time, and 5 slips. Since then the operators' unused sizes are gone, so by reading the 3 `DOT` refusals are cleared, and `RR64` now declares `^(self, b:AnyIntegral)` beside `^(self, b:Number)`; the distance stage's driver checks `10.0^(-5)` and `10.0^(-8)` with no error, so row 533's tie does not reproduce there. Each count is a floor, since the checker stops a block at its first failing statement (row 474).
- **Conditions:** The counts are of an earlier library; today's count for C4 is not given.
- **Consequence:** Expect C4's compiled errors now to be mostly the `adam` bridge and small slips, but measure: the counts are floors and partly cleared by reading only.
- **Evidence:** `reviews/array-design-ways.md` section 2; `compile-ladder/rung-integer-power/REPORT.md` section 7; `compile-ladder/rung-export-last/SKEPTIC.md` section 3; `Library/FortressLibrary.fsi:285`, `:369-370`; F-35.
- **Could not resolve:**
  - "decision D's diff": D of which decision list? Only P-87 locates it. Unclear wording.
  - "1 bridge, `adam`'s": what a bridge is in the model program. Unclear wording.
  - "the component's header": which of the two `^` declarations is the component's header (I guess `^(self, b:Number)`), and what that implies. Unclear wording.
  - Whether the powers still fail in C4 itself, as opposed to the driver's component. Not said. Unclear wording.

## F-63

- **Established:** The one library's api now declares `String`'s `split` and `splitWithOffsets` once, as abstract; declares no `zip` in `List`, so the inherited `ZeroIndexed.zip` serves; has `Condition.map` (the sequential generator trait's) return `Condition[\G\]`, the component's type; and closes `QQ` with `comprises { ... }`. The earlier forms (the pair declared twice, `List`'s own `zip[\F\](other: List[\F\])`) made the checker refuse the api, as measured. Other repairs tried gave the same count; the kept forms follow the specification's export rules. The `Condition.map` error was seen only under a checker change that did not land, otherwise read from the export check's code. `QQ`'s clause lists no type because its one value type, `Ratio`, is private, and an api may leave out a private type only by `...`. No api type extends `QQ`, so F-64's refusal does not arise.
- **Conditions:** The one library's api. The `Condition.map` edit is not gated.
- **Consequence:** Keep these forms; a worker adding a type that extends `QQ` would meet F-64's refusal (my inference).
- **Evidence:** `Library/FortressLibrary.fsi:1053`, `:400`; `compile-ladder/rung-library-defects/REPORT.md`, "Summary", "Decisions", "Defects and their homes".
- **Could not resolve:**
  - "read the same count": the same error count as the kept forms, I assume. Unclear wording; minor.

## F-85

- **Established:** The generator-slips rung repaired the interpreter library's generator, condition, reduction and nested-generator declarations that the compiled checker refused, in forms the library already uses. `__bigOperator2`'s fused branch, the `typecase` branch that runs a nested big operator through `generate2`, passes its result through `cast[\O0\]`, the library's device for an arm whose type the `typecase` cannot show; so the checker no longer types its body as `OR(I0,O0)` where `O0` is declared (row 632), and the distance stage holds no site of these declarations. Each `Condition` method body that calls `cond` writes the call's result type as its static argument (`cond[\Maybe[\G\]\]`). Sites the rung left were cleared by other work (F-250, F-93 with row 629, F-144 with row 628).
- **Conditions:** The interpreter's library.
- **Consequence:** For a `typecase` arm whose type cannot be shown, use `cast[\T\]`; write `cond`'s static argument in such bodies.
- **Evidence:** `Library/FortressLibrary.fss:1644`; `tests/GeneratorDeclarations.fss` and `tests/NestedReductionFusion.fss` run the fused arm; the cast by the distance stage; `compile-ladder/rung-generator-slips/REPORT.md` sections 5, 8; `compile-ladder/rung-body-arguments/REPORT.md` section 9; F-264, F-53.
- **Could not resolve:**
  - "`OR(I0,O0)`": I read a union type that the checker formed of the two type parameters, but the skill has no such type. Concept I lack.
  - This entry and F-285 state the fused arm's cast twice, in different words ("branch" here, "arm" there). Not unclear, but a reader may wonder if they are two casts. Unclear wording; minor.

## F-102

- **Established:** A file of `ProjectFortress/tests/` whose name starts with `XXX` is an expected-failure test: `SystemJUTest` requires it to fail, and the suite goes red if it passes. It needs a `.test` file only to name a refusal at load, as any program there does. An `XXX` test that imports an api with its component takes them from `ProjectFortress/test_library/`, so it needs no new api folder. The compiled corpora have a different rule (F-103).
- **Conditions:** The interpreter corpus, `ProjectFortress/tests/`.
- **Consequence:** To pin a walk defect, add an `XXX*.fss` there; add a `.test` only for a load refusal; put imported apis in `test_library/`.
- **Evidence:** `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:783-785` and `:394-412`; the skill's `tests-writing.md`, "How `XXX` works"; F-29.
- **Could not resolve:** Nothing.

## F-168

- **Established:** The specification's number chapters now describe the flat library, and the advanced chapter on rational quantities is kept word for word under a callout that marks it superseded. The eight number types are siblings under `Number`; they convert by the library's coercions, and every other conversion is explicit (`asFloat(x)`). The sign-refined types, such as positive ℚ, are gone; a program tests a value's sign at run time (P-80). ℚ holds +∞, −∞ and 0/0, and is declared neither a field nor a total order. `QQ` extends `StandardPartialOrder`, `StandardMinMax`, `AdditiveGroup` and `MultiplicativeRing`, whose laws hold for the finite rationals.
- **Conditions:** The specification's number chapters; F-172 holds the integer chapter's rules.
- **Consequence:** Cite the basic number chapters, not the advanced rational chapter; do not use sign-refined types; do not treat `QQ` as totally ordered.
- **Evidence:** `compile-ladder/rung-spec-numbers/decision-record.md` section 3; `Specification/basic-lib/numbers.tex:243-248`; `Specification/advanced-lib/numbers-advanced.tex:14`; F-131, P-74, P-80.
- **Could not resolve:** Nothing.

## F-170

- **Established:** The specification's ranges are over ℤ32, and its own examples of ranges over wider integer types are rewritten. An integer numeral, or a `nat` or `int` parameter, as an operand of an explicit range (`a` or `n` in `a#n`) converts to ℤ32 (row 485, fixed). An operand of any other integer type is a static error. A loop whose counter must be wider runs over a ℤ32 range and widens each element. The two examples that built `ZZ64` ranges now run over ℤ32.
- **Conditions:** Explicit ranges in the specification and the language.
- **Consequence:** Write ranges over `ZZ32`; widen inside the loop for a wider counter.
- **Evidence:** `ant testSpecData`, a gate step, runs both examples (F-114); `compile-ladder/rung-spec-ranges/decision-record.md` sections 2, 3; `Specification/basic/expressions/ranges.tex:42-60`, `:90-111`.
- **Could not resolve:** Nothing.

## F-175

- **Established:** The specification reads a `comprises` clause at the level of values (every value has a listed type) in every passage; Appendix I records the change (P-60). A call whose argument's static type stands between two closed traits runs the declaration that covers its value. Where its declarations have no static parameters, the call's type is the intersection of its most specific declarations' return types. Appendix I names five compiled-path departures: the checker checks a `comprises` clause only at the closed trait's immediate subtypes (row 487); the code generator crashes on a method call on a result typed by that intersection (row 540); with static parameters anywhere in the overload set, the checker types such a call by one most specific declaration, a deliberate choice (row 543); the checker refuses the Meet Rule's example for closed traits when its declarations have static parameters (row 546); the checker's verdict can depend on the components compiled earlier in the same JVM (row 547).
- **Conditions:** The specification; the compiled path departs at the five rows.
- **Consequence:** On the compiled path, avoid calling a method on an intersection-typed result of such a call (row 540), and expect order-dependent verdicts (row 547).
- **Evidence:** `Specification/appendices/changes.tex:3338-3534`, `:1616-1619`, `:3604-3611`; `compile-ladder/rung-spec-overloading/decision-record.md` sections 8, 9.
- **Could not resolve:**
  - "a call whose argument's static type stands between two closed traits": between in what sense (a supertype of both, a type the two closed traits jointly cover?). Unclear wording.
  - "a deliberate choice" (row 543): whose choice, the team's, the curator's, or an agent's? Unclear wording.

## F-268

- **Established:** The code generator emits `Any` as a static argument in an `extends` clause (as `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY`), but crashes on a tuple static argument that holds `Any`: `Holder[\(Any, ZZ32)\]` stops it with a null `id_or_op` in `IdOrOp.getApiName()` (row 889).
- **Conditions:** The compiled path; a tuple static argument containing `Any` (in an `extends` clause, by the test's name).
- **Consequence:** On the compiled path, do not extend a generic at a tuple that holds `Any`; `Any` alone is fine.
- **Evidence:** `CodeGen.java:6242-6247`; `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`; `compile-ladder/rung-codegen-walls/REPORT.md` sections 1 and 5.
- **Could not resolve:**
  - Whether the crash is limited to `extends` clauses or covers any tuple static argument holding `Any`. The title does not say. Unclear wording; minor.

## F-276

- **Established:** Each of `String`'s four concatenation families, `||`, `|||`, `//` and `///`, is three top-level operators, at `(Any, String)`, `(String, String)` and `(String, Any)`, as juxtaposition's are. The `(String, String)` `||` reaches `FlatString`'s and `Concatenable`'s own `||` by `typecase`, as String's api states, so under walk `"ab" || "cd"` stays a flat string of depth 0. Together with the known fixes (`EmptyString`'s meet, `Integral`'s and `ZZ`'s `=`, String's api extending `DelegatedIndexed`, `Maybe`'s `|self|` and subscript meets, `Float`'s `|self| : RR64` and `^` meet, and the api's six vector and matrix `+` and `-` removed), the full check of symbolic operators went from 191 to 137 on climb batch 21's base: the 54 errors of F-245 gone, none new; the stock count stayed 3 and the distance 5. Under walk, a program's own trait with a functional `||`, `|||`, `//` or `///` that can meet `String` needs `excludes { String }` or a declaration at the meet (row 342).
- **Conditions:** The one library; the counts on climb batch 21's base.
- **Consequence:** A program's trait that declares one of these operators functionally must exclude `String` or declare the meet, or walk refuses it.
- **Evidence:** `Library/FortressLibrary.fsi:2707-2726`, `Library/String.fsi:17-19`, `:29-31`; tests `tests/StringConcatenationFamiliesWalk.fss`, `tests/XXXFunctionalMethodMeetOperator.fss`, the distance stage (F-281); `compile-ladder/rung-symbolic-library/REPORT.md` sections 1, 3, 4.
- **Could not resolve:**
  - "the full check of symbolic operators": a checker mode not in the skill (also in F-278). Concept I lack.
  - "the stock count stayed 3": the count stage on an unchanged checker, or something else? Unclear wording.
  - "where walk analyses the library afresh": does walk refuse the program only when it re-analyses the library (an empty cache), and accept it otherwise? Two readings. Unclear wording.
  - "the meet": I take it as an overload declared at the intersection of the two parameter types, as the skill's overloading rule says. Unclear wording; minor.

## F-279

- **Established:** Under walk, an `Array2` or `Array3` whose index base is above zero slices like a 0-based one, because `Array2.subarray` and `Array3.subarray` give their 0-based views the offset less the base, and `Array3`'s `[:]` passes its base, as `Array1`'s methods do. The exception is a shifted `Array2`: `SubArray2`'s own `subarray` subtracts the output base instead of its own (row 808), so a slice of a shifted `Array2` reads the wrong elements, and a shift of a slice, a column, a row or a shifted `Array2` ends in Java's `ArrayIndexOutOfBoundsException`.
- **Conditions:** Walk; `Array2` and `Array3`; the shifted `Array2` case is a gap.
- **Consequence:** Under walk, slice nonzero-based arrays freely, but do not slice or shift a shifted `Array2`, or shift a slice, column or row.
- **Evidence:** `Library/FortressLibrary.fss:2973`, `:3375`, `:3354`, `:2685`, `:3057`; tests `Array2SliceAtNonzeroBase`, `Array3SliceAtNonzeroBase`, `XXXArray2ShiftedSlice`; `compile-ladder/rung-slices-list-equality/REPORT.md` sections 1, 5.
- **Could not resolve:**
  - "a shifted `Array2`" and "a shift of a slice": what a shift is (a method that moves the base?), not in the skill. Concept I lack.
  - "the output base instead of its own": whose output (the new view's)? Unclear wording; minor.

## F-283

- **Established:** All 52 programs of the team's `DemoTests` reach their end under walk: run one at a time from `ProjectFortress/demos`, each exits 0 and prints no "fail" within 600 s, on empty input, with `wordcount2` run from the tree's root and `tennisRanking` given the three files that `FileTests.java:809-818` names. The demos are in no suite, so a batch that changes walk or its library runs them again (P-79). `Generator2Demo` can overflow in `PROD` from random arrays; one such `IntegerOverflow` in a run is not a regression. The compiled checker still refuses `trips.fss` (row 817).
- **Conditions:** Walk; the stated way of running them.
- **Consequence:** A batch that changes walk or its library must run the demos with the driver, and may excuse one `Generator2Demo` overflow.
- **Evidence:** Not gated; the driver in `compile-ladder/rung-team-demos/REPORT.md` section 13, whose output at `4445d848b` was 'demos: 52 run, 52 reached their end'; that report section 3; `compile-ladder/climb-batch-27/REPAIR-review.md` section 2.
- **Could not resolve:** Nothing.

## F-286

- **Established:** The api's `String` marks `abstract` every member that the component's trait leaves without a body, 14 in all (`size`, `depth`, `asFlatString`, `isBalanced`, `verify`, `asDebugStringIndented`, `get`, `uncheckedSubstring`, `rangeContains`, `splitWithOffsets`, `split`, `balanced`, `opr ||(self, c:Char)`, `writeOn`), and `FlatString`, `CatString`, `EmptyString` and `SubString` each define all 14 under walk. `String`'s `excludes` clause is `{ Number, Char, AnyMultiplicativeRing }` in both api and component; `AnyList` states its own exclusion of `String`. So `String` has no entry in the `FortressLibrary` export error. `CatString`'s `rangeContains` answers what its flat halves answer, so it inherits row 607's miss.
- **Conditions:** The one library.
- **Consequence:** A new string object must define all 14; the export check of `String` is clean.
- **Evidence:** `Library/FortressLibrary.fsi:2628-2703`, `Library/FortressLibrary.fss:4570-4706`, `Library/List.fsi:55`; `ProjectFortress/tests/StringMembersPromisedWalk.fss`; the distance stage's per-site list; `compile-ladder/rung-string-members/REPORT.md` sections 1, 2, 5; F-282.
- **Could not resolve:**
  - "row 607's miss": what `rangeContains` gets wrong is not said. Unclear wording.

## F-302

- **Established:** On the compiled path, HotSpot's C2 removes a temporary number box only if the box's constructor chain inlines. At JDK 25's default `MaxInlineLevel=15`, a frame at depth d inlines when d is at most 16. The prelude's `+` reaches `Object.<init>` under its result's box at depth 12 from the loop (a top-level binding at 10), so an operator called from more than 4 further inlined frames keeps its temporary boxes. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration. By reading, the one library's `ZZ32` springboard chain (`ZZ32`, `AnyIntegral`, `Number`, `AnyAdditiveGroup`, `Object`, `Any`) is two classes longer than the prelude's (`ZZ32`, `Number`, `Object`, `Any`), since a springboard extends the springboard of its trait's first `extends` entry; if `FZZ32` extends the one library's springboard after the switch-over, the margin falls to 2 frames.
- **Conditions:** "Those loops" (see below); JDK 25 defaults; observed once (F-301); the switch-over margin is not measured.
- **Consequence:** Keep hot operators shallow; after the switch-over, expect boxes to survive in loops with more than 2 further inlined frames unless the springboard chain is shortened (my inference).
- **Evidence:** One observation (F-301); the lowered-limit run; `Library/FortressLibrary.fss:826`, `:722`, `:380`, `:356`; `LibraryBuiltin/CompilerBuiltin.fsi:210`; `compiler/codegen/CodeGen.java:5519-5526`; `perf-probes/helper-calls/REPORT.md` sections 3, 4.
- **Could not resolve:**
  - "In those loops": the entry opens on loops that it never names (F-301's, I guess). The entry does not stand alone here. Unclear wording.
  - The title's "C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default": either C2's limit in these loops is 12, or the chain needs 12 of the 16 allowed. The body supports the second. Two readings. Unclear wording.
  - "springboard": a class of the code generator's mapping of traits, not in the skill. Concept I lack.
  - "bytes per iteration": allocated bytes, I assume. Unclear wording; minor.

## F-303

- **Established:** Walk carries a value declared `Float` in a Java `double`, as it carries `RR64`, so a helper binding whose parameter or result is declared `Float` loads (before, walk refused it: 'no Java type carries the declared type of parameter a.'). 57 of `Float`'s 62 bindings, and the top-level `fromRawBits`, now name `simpleDoubleArith` helpers: 30 over existing helpers (`asString`, `asExprString`, `|self|`, five comparisons, unary `-`, `+`, `-`, `DOT`, `TIMES`, juxtaposition, `/`, `SQRT`, `^` at `Float` and `RR64` exponents, eight elementary functions, `floor`, `ceiling`, `truncate`, `round`), 27 over new one-line helpers (`isNaN`, `isInfinite`, `rawBits`, `nextUp`, `nextDown`, `narrow`, `=/=`, `MIN`, `MAX`, 18 directed roundings), and `fromRawBits` over a 28th. Every value under walk is the glue classes'. The other 5 still name glue classes: `^` at `RR32` and at `AnyIntegral`, `atan2`, and the floor and ceiling brackets.
- **Conditions:** Walk's loader; the 5 glue bindings remain.
- **Consequence:** A worker may declare a helper binding over `Float`; the 5 remaining `Float` glue bindings still need helpers before the compiled path can run them.
- **Evidence:** `interpreter/glue/StaticNativeApp.java:64`; `LibraryBuiltin/FortressBuiltin.fss:61-206`, `:163-201`; `Library/FortressLibrary.fss:4764`; `nativeHelpers/simpleDoubleArith.java:136-246`; tests `tests/NativeHelperFloatCarriedWalk.fss`, `tests/NativeHelperFamilyFloatWalk.fss`, `tests/NativeHelperFamilyFloatBitsWalk.fss`, `compiler_tests/NativeHelperFamilyFloatCompiled`, `compiler_tests/NativeHelperFamilyFloatBitsCompiled`; the two rung reports.
- **Could not resolve:**
  - How these 5 glue bindings square with F-32, where (as I read it) the only glue bindings left are `Reflect`'s 28. Unclear wording, or a conflict between the two entries.

## F-305

- **Established:** `CHOOSE` on `ZZ32` and `ZZ64` names a helper on both paths (`simpleIntArith.intOverflowingChoose`, `simpleLongArith.longOverflowingChoose`, which the prelude binds too). `NN32`'s compiled `CHOOSE` goes through the `ZZ64` helper; its one-library binding names `simpleUnsignedIntArith.unsignedIntOverflowingChoose`. The helpers are exact, raise `IntegerOverflow` where the coefficient does not fit (every pair past their safe-bound tables, from `34 CHOOSE 17` on `ZZ32` and `68 CHOOSE 34` on `ZZ64`), and give each slow-path call its own scratch array, so parallel calls no longer corrupt each other. A sweep of 64,649,240 `ZZ64` pairs and 6,023,925 `ZZ32` pairs matched the exact values and walk's glue. It builds P-73.
- **Conditions:** Both paths.
- **Consequence:** `CHOOSE` is safe in parallel code and either exact or `IntegerOverflow`.
- **Evidence:** `Library/FortressLibrary.fss:896`, `:1007`; `nativeHelpers/simpleIntArith.java:174-175`, `:222-225`; `simpleLongArith.java:153-154`, `:200-203`; tests `tests/ChooseHelperWalk.fss`, `tests/ChooseHelperZZ64Walk.fss`, `compiler_tests/ChooseHelperCompiled`, `ChooseHelperZZ64Compiled`, `ChooseTableCompiledRungE`, guards `tests/ChooseZZ32Walk.fss`, `tests/ChooseZZ64Walk.fss`; `compile-ladder/rung-natives-choose/REPORT.md` sections 1, 2, 5.
- **Could not resolve:**
  - "Past their safe-bound tables every coefficient overflows": not every coefficient past `n = 34` overflows (`100 CHOOSE 1` fits), so I read "every pair outside the tables' safe bounds". Unclear wording.
  - "Swept against the exact value, ... give walk's glue arithmetic": the sweep compared the helpers with the exact value, with the glue, or both? Unclear wording.
  - "through the `NN32` transfer (F-313)": a mechanism not in the skill. Concept I lack.

## F-306

- **Established:** Under walk, trait `ZZ64`'s 26 and trait `ZZ`'s 22 native bindings now name helpers of `nativeHelpers/` and give every value the glue gave. The 48 name 29 helpers that the prelude binds for the same operations (in `simpleLongArith`, `simpleIntArith`, `simpleUnsignedLongArith`, `simpleArbitraryPrecisionArith`) and 11 new ones: four of `REM` and `MOD`, and seven of the divisors, `ZZ`'s `CHOOSE` and `cmp`. `ZZ64`'s four wrapping bindings name the wrapping helpers that the prelude binds under its `BOX` spellings (row 348). `DIV`, `REM` and `MOD` by zero raise the library's `DivisionByZero`. A `ZZ` helper takes only a `BigNum` value, since walk unboxes a `BigInteger` by `getBigInteger`; walk's coercions convert another integer operand first.
- **Conditions:** Walk; also tested compiled.
- **Consequence:** These bindings need no glue; a worker writing a `ZZ` helper must take a `BigNum` argument (my reading).
- **Evidence:** `Library/FortressLibrary.fss:930-1039`, `:1145-1253`; tests `tests/NativeHelperFamilyIntegersWalk.fss`, `tests/ZZ64DivisionByZeroWalk.fss`, `tests/ZZDivisionByZeroWalk.fss`, `compiler_tests/NativeHelperFamilyIntegersCompiled`; `compile-ladder/rung-natives-integers/REPORT.md`; F-24, F-312, F-314.
- **Could not resolve:**
  - "seven of the divisors, `ZZ`'s `CHOOSE` and `cmp`": which operations are "the divisors" (`gcd`, `lcm`, `DIVIDES`?), and how the seven split. Unclear wording.
  - "under its `BOX` spellings": the prelude's names for the wrapping operators, I guess. Concept I lack.
  - "A `ZZ` helper takes only a `BigNum` value": the Fortress value type `BigNum`, or the Java type of the helper's parameter? Unclear wording.

## F-307

- **Established:** The last eight small native bindings now name `nativeHelpers/` helpers and keep walk's values: `Long`'s and `BigNum`'s `asString` and `asExprString`, `NN32`'s and `NN64`'s `signed`, `Char`'s `codePoint` and the top-level `char`. The four over `NN32`, `NN64` and `Char` name the special names that the checker reads at those types. `signed` above the signed half wraps, as a low-bits name does; `char` keeps a code point outside 0 to 1114111, as the glue did (row 857). The top-level `printlnWithThread` and `getProperty` are natives over `FlatString` on helpers, beside overloads over `String` that flatten their argument.
- **Conditions:** Both paths, by the tests named.
- **Consequence:** Do not rely on `char` to reject an invalid code point (row 857).
- **Evidence:** `LibraryBuiltin/FortressBuiltin.fss:391`, `:393`, `:528`, `:549`, `:551`, `:599`; `Library/FortressLibrary.fss:1136`, `:4769`; `compiler/NamingCzar.java:375-386`; tests `tests/NativeHelperFamilySmallWalk.fss`, `compiler_tests/NativeHelperFamilySmallCompiled`; `compile-ladder/rung-natives-small/REPORT.md`; F-331, F-299.
- **Could not resolve:**
  - "The small rest": a group label from the record; I read "the remaining few bindings". Unclear wording.
  - "the special names that the checker reads at those types": what these names are and why the checker needs them. Concept I lack.
  - "as a low-bits name does (F-331)": what a low-bits name is. Concept I lack.

## F-311

- **Established:** `asFloat` of `Int`, `RR32`, `NN32`, `Long` and `BigNum` answers `RR64`, as each type's `asFloat` is declared in its api, and names the helpers `intToDouble`, `floatToDouble`, `unsignedIntToDouble`, `longToDouble` (new, `(double) a`) and `toDouble` (new, `a.doubleValue()`). Walk's values are unchanged. With the team's declared result `Float`, the checker refused the move to a helper ('Function body has type RR64, but declared return type is Float.'); walk carries both types in a `double` and answers the same `Float` object either way.
- **Conditions:** Both paths, by the tests.
- **Consequence:** Treat `asFloat`'s result as `RR64`.
- **Evidence:** `numbers.tex:59`; tests `tests/NativeHelperFamilyAsFloatWalk`, `compiler_tests/NativeHelperFamilyAsFloatCompiled`; `compile-ladder/rung-natives-asfloat/REPORT.md`; F-303, F-324.
- **Could not resolve:** Nothing.

## F-312

- **Established:** `REM` and `MOD` on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ` name `nativeHelpers/` helpers on both paths (ten bindings: `intRem`/`intMod`, `longRem`/`longMod`, `unsignedIntRem`/`unsignedIntMod`, `unsignedLongRem`/`unsignedLongMod`, `rem`/`mod`), keep the glue's values, and throw `DivisionByZero` at a zero divisor. `REM` is the remainder of truncating division; `MOD` that of floor division, with the divisor's sign; on the natural types `MOD` equals `REM`. The helpers raise `fortress.CompilerBuiltin$DivisionByZero`, which walk raises as the library's `DivisionByZero`. 626 printed pairs equal the old code's.
- **Conditions:** Both paths; the unsigned-long helpers through F-308's transfers.
- **Consequence:** A worker can rely on these semantics and catch `DivisionByZero` from them.
- **Evidence:** `Library/FortressLibrary.fss:888-891`, `:999-1002`, `:1104-1107`, `:1221-1224`; `FortressBuiltin.fss:496-499`; tests `tests/ZZ32RemainderByZeroWalk` and its four siblings, `NativeHelperFamilyRemainderWalk`, `compiler_tests/NativeHelperFamilyRemainderCompiled`; `compile-ladder/rung-natives-remainders/REPORT.md`; F-24.
- **Could not resolve:**
  - "through the transfers of F-308": a mechanism not in the skill (also F-305's "`NN32` transfer"). Concept I lack.

## F-315

- **Established:** The code generator now compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or method declared `test`. A `forbid`-listed exception that no `catch` took is rethrown as a `ForbiddenException` chained to it, built by the library's constructor, but the `finally` clause does not run (row 890). The modifier guard admits `test`; a `test` method compiled and ran in one probe. Still refused: `Bottom`, `Self` or an abbreviated type as that static argument, a tuple holding `Any` (row 889), and `override` (row 650). The library's `test stringifyChars` stops next at a varargs call (row 624).
- **Conditions:** The compiled path. The `test` modifier is not gated; the skipped `finally` is a gap.
- **Consequence:** On the compiled path, do not rely on `finally` after a forbidden exception, and do not write `override`.
- **Evidence:** `CodeGen.java:3015-3017` (read); tests `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`, `XXXFinallyOnEscape.test`; `compile-ladder/rung-codegen-walls/REPORT.md` sections 1, 2, 5; `reviews/batch-25-review.md` items 3, 4; F-34.
- **Could not resolve:**
  - "an abbreviated type": a type alias, I guess; not in the skill. Concept I lack; minor.
  - "`TestModifierCompiled.test`" is listed as a test while the body says "no test gates it" for a `test` method: does the test cover only `test` functions? Unclear wording.

## F-330

- **Established:** Walk holds a value of `FortressLibrary`'s trait `JavaBufferedWriter` as a Java `FortressBufferedWriter`; `stdOut`, `stdErr`, `Writer` and `BufferedWriter` are plain Fortress objects over it. The trait's `write`s, `flush`, `close`, and its three factories (a file name, standard output, standard error) are natives on `nativeHelpers/fileOps`. Walk's loader maps the trait by name through `FortressBuiltin`'s private native object `JavaBufferedWriterObject`; the checker's walk-world table reads `FortressBufferedWriter` and `FortressBufferedReader` as the one library's traits. A missing file raises the library's `FileNotFoundException`, which a `catch` sees. `FileWriteStream` is likewise a plain `WriteStream` over `JavaBufferedWriter`.
- **Conditions:** The one library; tested on both paths.
- **Consequence:** Output goes through Fortress code over `fileOps` helpers, so `println` needs no glue (with F-32).
- **Evidence:** `Library/FortressLibrary.fss:2046-2055`, `:2068-2073`; `interpreter/glue/StaticNativeApp.java:70`; `compiler/NamingCzar.java:492-493`; tests `tests/NativeHelperWriterWalk`, `compiler_tests/NativeHelperFamilyWriterCompiled`; `compile-ladder/rung-io-writer/REPORT.md`; F-332.
- **Could not resolve:**
  - "walk's loader carries the trait by its name through ... `JavaBufferedWriterObject`": how a private native object makes the loader carry a trait. Concept I lack.
  - "the checker's walk-world table": a table in `NamingCzar` not in the skill. Concept I lack.

## F-332

- **Established:** Walk holds a `JavaBufferedReader` as a Java `FortressBufferedReader`; `FileReadStream`, `Reader`, `stdIn` and `FileWriteStream` are plain Fortress objects over the Java-backed traits `JavaBufferedReader` and `JavaBufferedWriter`, each holding the Java-backed value in its field `under`. The reader trait's eight methods and two factories (a file name, standard input) are natives on `nativeHelpers/fileOps`. `uncheckedReadChar` answers -1 at the end, by the reader's `eof`, since `jbrRead` answers 0 there. A missing file raises `FileNotFoundException`, and a read after `consume` raises `IOFailure`; a `catch` sees each on both paths, since a compiled helper's raise builds the prelude's exception.
- **Conditions:** Both paths; the compiled exception is the prelude's until the switch-over.
- **Consequence:** Input needs no glue; catch `FileNotFoundException` and `IOFailure` on both paths.
- **Evidence:** `Library/FortressLibrary.fss:2057-2077`; `interpreter/glue/StaticNativeApp.java:71`; tests `tests/NativeHelperReaderWalk`, `compiler_tests/NativeHelperFamilyReaderCompiled`, `compiler_tests/FileOpsRaiseCaughtCompiled`; `compile-ladder/rung-io-reader/REPORT.md`; F-299, F-336.
- **Could not resolve:**
  - "`File` and `Reader` are plain components": `Reader` is also named as an object in the title; is the component `Reader` meant, or the object? Unclear wording.
  - "a read after `consume`": what `consume` does (close the stream?). Concept I lack; minor.

## P-165

- **Decided:** `trait Number` no longer declares `asFloat` or the `=` built on it; each built-in number type (`ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32`, `RR64`) and each numeral type declares its own `asFloat` into `RR64`. Two numbers of different types compare by `=` only where a coercion carries one into the other (P-74); otherwise the program writes the conversion, `asFloat(x) = y`. The vector norm is declared at each of the eight number types by its own `asFloat` (the default of a fork still on the curator's review list). `Float`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` are declared at `RR64`, reached by coercion from `ZZ32`, `RR32` and numerals. The specification follows. Reason: the team's prelude declares `Number` empty, the specification's sentence putting `asFloat` on `Number` is the revival's own, and the curator's rule drops an early idea of the interpreter's library that the specification does not ground and the later prelude eliminated; with `Number` open to programs (P-160), an abstract `asFloat` would force, say, a complex number to invent a float and compare by it.
- **Applies:** The library's number types, and code generic over `Number`. P-74's rule (exact conversions implicit, lossy ones written) stands.
- **Requires:** Do not call `asFloat` or a cross-type `=` on a value typed only `Number`; write `asFloat` explicitly where no coercion relates the two types; do not put `asFloat` back on `Number`.
- **Unfinished:** The norm's form is a fork's default awaiting the curator's review (my reading of "on his review list").
- **Could not resolve:**
  - "The vector norm takes a bound that promises a float": which bound (a trait in the library?) is not named. Unclear wording.
  - "`Float`'s `^` at a `Number` exponent ... are declared at `RR64`": is the exponent now `RR64`, or the method moved to `RR64`? F-58 says `RR64` still declares `^(self, b:Number)`. Two readings, perhaps a conflict between the two entries. Unclear wording.
  - "his review list": the curator's, I assume; where it lives and whether the fork is open is not said. Unclear wording.
  - "The specification's sentence follows": already revised, or to be revised? Unclear wording; minor.

## P-171

- **Decided:** Two string literals with the same text are one object on both paths, and a concatenation of two string literals is folded into one literal. Strings stay reference objects whose text equality is their own `=` (P-168). So `"ab" SEQV "ab"` is `true` (also for one literal evaluated twice), and `("foo" || "bar") SEQV "foobar"` is `true` by the fold; a string built at run time is not `SEQV` an equal literal, unless Java returns the same object (as `substring(0, length)` does), and then both paths say `true`. Walk interns each literal's text (`String.intern()`) and compares two flat strings' Java strings by `==`; the compiled path loads literals with `ldc` (interned by the JVM) and `equality.sEquiv` compares the wrapped Java strings by `==`. The specification gains a sentence, in the revision form, that a literal denotes one object, also for a folded concatenation. Reason: every team source on literals makes equal literals one value, and Java, Kotlin, Scala and Clojure give equal literals one object.
- **Applies:** String literals and folded concatenations of literals, on both paths; not strings built at run time.
- **Requires:** Compare string text with `=`, never `SEQV`, except for literal identity; do not rely on `SEQV` between a run-time string and a literal.
- **Unfinished:** Not stated (see below on the specification's sentence).
- **Could not resolve:**
  - "The specification gains ... a sentence": already added or still to add? Unclear wording.
  - "in the revision form (P-96)": the form in which the revival marks a revision of the specification. Concept I lack (not in the skill).
  - "`compiler_regressions/seqv.fss:22` ... passes on the one library as written": F-302 says nothing compiles against the one library yet, so how (under walk?) this test passes there is not said. Unclear wording, or a conflict.
  - "way S-b with its compiled way (i), and way S-d": labels of the review. Unclear wording; minor.

## P-76

- **Decided:** An integer numeral has the Working Draft's type `NaturalNumeral` (P-174), which all eight number types convert from: exactly into the five integer types and `QQ`, with one rounding into `RR64` and `RR32`. Where nothing fixes a type it is a `ZZ32`, or a `ZZ64` or `ZZ` when too large (P-173). `NaturalNumeral` replaces `IntLiteral`, the name both the prelude and the interpreter's library gave the type, and `IntLiteral`'s own arithmetic goes, since an expression of numerals alone folds before the checker. Walk converts an integer numeral from its exact value at each place that fixes a type, and elsewhere evaluates it at its default.
- **Applies:** Integer numerals, both paths; walk does this "before it runs the checker" (P-12).
- **Requires:** Do not write code against `IntLiteral` or its arithmetic for the one library; expect a numeral to take the type its place fixes.
- **Unfinished:** Walk's coercion through tuple and varargs parameters (rows 395, 511). The compiled path keeps the prelude's `IntLiteral` until the switch-over (from F-118 and row 961, not this entry).
- **Could not resolve:**
  - "Walk, before it runs the checker (P-12)": walk does not run the checker (the skill). Does this mean "until walk runs the checker", as P-12 may plan, or a step in walk's phases? Two readings. Unclear wording.
  - "Walk gaps: coercion through ... varargs parameters (row 511)": F-128 says walk does coerce at a varargs parameter. The two entries seem to disagree, unless row 511 is about numerals only. Unclear wording, or a conflict.
  - "the Working Draft": as in F-169, I take it to be `Specification-1.0-frozen/`. Unclear wording; minor.

## P-172

- **Decided:** A numeral with a radix point has the Working Draft's type `RadixPointNumeral`, which holds its exact value: `QQ` converts from it exactly, `RR64` and `RR32` with one rounding to the nearest value, on both paths. So `3.125` is the `QQ` `3125/1000`, `q: QQ = 0.5` binds, and `1/2 = 0.5` is `true`. `QQ`, `RR64` and `RR32` each declare the pair of `=` that goes with each coercion. Where nothing fixes a type it is an `RR64` (P-173): `Cell(0.5)` is a `Cell[\RR64\]`, and a bare numeral prints as that double (`"" 2.50` is `"2.5"`), so the team's `tests/NumberPrintTest.fss:16` changes. `RadixPointNumeral` stands beside the number types, as the prelude's `FloatLiteral` does, replacing the interpreter library's `value object FloatLiteral extends RR64`. Walk converts from the exact value at a binding, a parameter, a field and a declared return type, so `y: RR64 = 0.5` is `SEQV` a computed `0.25 + 0.25`. At `round`, `floor`, `ceiling` or `truncate` a numeral converts into `RR64`, by P-173's reading of a tie among `QQ`, `RR32` and `RR64`, so `round(2.50000000000000001)` is 2. No microGPT line changes. Reason: the Working Draft keeps a numeral unconverted to avoid losing precision, gives `3.125` the rational value, and allows at most one rounding; the curator reads it as "nothing lost in `QQ`, one rounding into a fixed-size float".
- **Applies:** Radix-point numerals, both paths.
- **Requires:** Expect a bare radix-point numeral to be an `RR64` and to print as a double; write a `QQ` place to keep a numeral exact.
- **Unfinished:** The specification's literals chapter, the coercions of `basic-lib/numbers.tex:43` and an Appendix I entry "follow"; whether they are written is not said.
- **Could not resolve:**
  - "the team's `tests/NumberPrintTest.fss:16` ... changes": has it been changed, or must a worker change it? Unclear wording.
  - "the pair of `=` that goes with each coercion": both argument orders of `=` between the numeral type and the number type, I take it, as in F-79. Unclear wording.
  - "by reading its numerals keep their bits": microGPT's float numerals give the same doubles as before, by reading only. Readable; minor.

## P-173

- **Decided:** A numeral converts where it stands. Where its place fixes a type, it converts into that type from its exact value, at compile time; where nothing fixes one, into the machine default: `ZZ32`, or `ZZ64` or `ZZ` when too large, and `RR64` with a radix point. A place fixes a type when its declared type has a coercion from the numeral type (the eight number types, and a program's own type may) or is a numeral type; `Any`, `Object`, `Number`, an unbounded type parameter and no declared type take the default. So `x = 3` is a `ZZ32`; `bigN = 3000000000` is a `ZZ64` (row 946). The default applies to a numeral (a literal after the fold), never to an expression of a numeral type; a `nat` parameter used as a value is a `ZZ32` (P-40). A type parameter that several numerals fix takes the narrowest default holding every value (an `RR64` if any has a radix point). A float numeral whose conversions into `QQ` and `RR64` tie reads `RR64`. At a typed place the conversion is exact or rounds once; out of range is refused statically; walk converts at the same places at run time. An expression of numerals alone folds exactly, before the checker, into a signed constant that defaults as an integer, a `QQ` for a quotient, or an `RR64` with a radix point: `x = 7/2` is a `QQ`, `-2147483648` is a `ZZ32`. `gg(5, w)`, over `(ZZ32, T)` and `(Any, Any)`, runs the `ZZ32` one. Reason: it completes the Working Draft's design, where a library decides by coercions how numerals meet other types; it bends P-26 in the numeral types' names and at places that fix no type, by the curator's right to finish the specification. Exact defaults (`ZZ` and `QQ`) were declined, because microGPT's untyped hyperparameters would become rationals and every untyped index would need `asZZ32`.
- **Applies:** Every numeral, both paths; walk at run time, place by place.
- **Requires:** Rely on these defaults; type a place to get another type; do not expect a numeral at `Any`, `Number` or an unbounded type parameter to keep a numeral type.
- **Unfinished:** Appendix I must record the Working Draft text it contradicts ("not directly converted", "polymorphic", and a `nat` parameter usable as an `NN32` variable); whether this is done is not said. Known gaps elsewhere: rows 961 and 962 (from other entries), and row 946 here.
- **Could not resolve:**
  - "each numeral converting into it exactly": a radix-point numeral such as `0.1` does not convert exactly into `RR64`, which the same sentence makes the default. Two readings (exact for integers only, or exact within the type's precision). Unclear wording.
  - "`bigN = 3000000000` is a `ZZ64` at its binding (row 946)": is row 946 the gap that this example meets, or a record of the rule? Unclear wording.
  - "a `nat` parameter used as a value is a `ZZ32`": the skill says a `nat` size is an `NN32` value, and F-74 says walk gives a `ZZ64` above 2^31-1 (row 962). Unclear wording against the skill.
  - "The library's `=` pairs over the numeral types stay, their conversion of a numeral folded": I cannot parse the second half. Unclear wording.
  - "before it runs the checker (P-12)": as in P-76. Two readings. Unclear wording.
  - "It bends P-26": what P-26 decides is given only in passing ("the team's later word"). Unclear wording.
  - "P-174 names the binary chapter's": which chapter is "the binary chapter". Unclear wording.
  - "in the two places ... where the compiler's prelude, the team's later word, keeps the numeral's own type": readable. Nothing more.

## P-169

- **Decided:** The runtime's own 13 native bindings (the arrays' store, 7; threads with `abort` and the task trace, 6) name compiled helpers, which walk's loader answers with walk's own operations (P-167's device). Each keeps P-58's form, a bare `builtinPrimitive("...")` naming a `nativeHelpers/` helper that the compiled path runs; but walk's loader answers the name with walk's glue, so walk keeps its `AtomicArray` store and its `spawn`: for these names P-58's walk half bends. Two compiled shapes. Arrays (`PrimitiveArray`, `PrimImmutableArray`, `PrimImmutableRR64Array`): a store trait in `FortressLibrary` whose bindings name helpers of a new `nativeHelpers/arrayOps` over a compiled class holding the elements (P-164's device); `PrimitiveArray` and `PrimImmutableArray` leave the native component and hold the store in a field, and walk's native object below the trait holds an `AtomicArray`; `PrimImmutableRR64Array`'s two bindings are on a compiled `double[]` class that no factory chooses until array decision A. The compiled store is an `Object[]`, and the compiled transaction tracks reads and writes by array and index (`TXReadSlot`, `TXWriteSlot`), since P-84 stores number arrays unboxed. Threads, `abort`, task trace: helpers in a `nativeHelpers` class over the compiled runtime, as `nativeHelpers/runtime.java`; `Thread`'s `val`, `wait`, `ready` and `stop` raise until the code generator compiles `spawn` (row 82). The numerals' 24 bindings and `IntLiteral`'s other 8 left with their types, so no carrier is designed for them. A test on both paths holds the halves together. Reason: every array, vector, varargs list and `args` of the one library rests on these two array objects, and a body left on glue would make a compiled program raise at its first array; walk's loader carries no element, `Thread` or literal, and an `Object` carrier would take walk's array writes out of walk's transactions.
- **Applies:** These 13 bindings only; walk keeps its own operations for them.
- **Requires:** Bind these through the named helpers; do not move walk onto the compiled helpers for them; key compiled `atomic` tracking of arrays by array and index.
- **Unfinished:** `spawn` in the code generator (row 82), after which `Thread`'s four methods work compiled; the unboxed `RR64` array awaits array decision A (P-84, P-85).
- **Could not resolve:**
  - "P-167's device" and "P-164's device": partly described here, but what each device is in full is not. Concept I lack (from the record).
  - "walk's loader answers the name with walk's glue": how one name is mapped to two implementations. Unclear wording.
  - "The compiled store is an `Object[]`" beside "P-84 stores every number type's array unboxed": how both hold now (is the unboxed store future, after decision A?). Unclear wording.
  - "an array of objects keeps one box an element, not two": readable once the above is settled. Minor.
  - "array decision A" and "carrier": record terms not in the skill. Concept I lack.

## P-154

- **Decided:** A `List` is ordered only where its element type is totally ordered: it extends its lexicographic order only where the element type extends `StandardTotalOrder`, by conditional extension (P-151). Floats and `QQ` are only partially ordered (NaN and `QQ`'s 0/0 compare with nothing), so on the compiled checker a list of floats or of `QQ` has no `<`, `CMP` or other comparison, but keeps `=`. A pair of floats stays ordered, a mismatch the curator accepts. No lexicographic trait over partially ordered elements is added now. Reason: the team's `LexicographicOrder` computes `CMP` as a total comparison, yet the team's `List` extended it at every element type; the team's own `where` form reconciles the two.
- **Applies:** `List` in the one library; the compiled checker.
- **Requires:** Do not compare lists of floats or of `QQ`; do not add a partial-order lexicographic trait without a new decision.
- **Unfinished:** Walk still gives every list an order (row 774). The tuples' own rule is not decided.
- **Could not resolve:**
  - "A pair of floats stays ordered" beside "The tuples' own rule is not decided here": is a pair ordered today (and left so), or is that the open question? Unclear wording.

## P-166

- **Decided:** `ZZ`'s and `QQ`'s values are value objects: the library declares `value object BigNum extends ZZ` and `QQ`'s `Ratio` as a `value object`. So two `ZZ` values built apart are `SEQV` when their integers are equal (by comparing their bits), and two equal rationals likewise. The specification's sentence "Reference objects include arbitrary-precision numbers" in `basic/objects.tex` is revised to list them among the value objects, in the revision form, with one Appendix I entry. Reason: the library's `value` declaration is the deliberate word, and the curator's rule brings the specification's example in line with the code there.
- **Applies:** `ZZ` and `QQ` values, both paths.
- **Requires:** Treat `ZZ` and `QQ` values as value objects; do not rely on identity telling equal values apart.
- **Unfinished:** Whether the specification's revision is written is not said ("is revised").
- **Could not resolve:**
  - "the curator's rule": which rule (named elsewhere?) is not given. Unclear wording.
  - "in the revision form (P-96)": as in P-171. Concept I lack.

## P-163

- **Decided:** `Char`'s `asExprString` writes, for every code point, a text that reads back as the same character, completing the compiled helper's form. The helper `nativeHelpers/simpleChar.charToExprString` escapes `"` and `\` as `'\"'` and `'\\'`, writes a printable character as itself with its code (`'é 00e9'`, the redundant form Steele built in 2011), and writes the code alone where the parser cannot read the character (controls, U+201C, U+201D, U+2028, U+2029, surrogates). Walk's binding names the same helper, so both paths write the same text. The parser tries its longer choices of hexadecimal digits first, so a six-digit code reads back. The specification's list of character-literal forms is revised, in the revision form, to name the redundant form, with an Appendix I entry. Reason: the library's contract ("will equal self") holds at every code point only with the code alone or with this form; this form is the team's later word; other languages write a printable character as itself. The compiled text changes at about 2K code points and walk's at every code point outside printable ASCII; no library code, suite test or model line calls it.
- **Applies:** `Char`'s `asExprString`, both paths.
- **Requires:** Expect this output format; keep walk's binding on the helper.
- **Unfinished:** Not stated; whether the specification is revised is not said.
- **Could not resolve:**
  - "writes a printable character as itself with its code" beside "walk's [text changes] at every code point outside printable ASCII": does printable ASCII (`'a'`) get the redundant form `'a 0061'`, or stay as itself? Two readings. Unclear wording.
  - "with his own two escape cases reached": I cannot tell what this means. Unclear wording.
  - "the peers": other languages, I guess. Unclear wording; minor.

## P-175

- **Decided:** On the compiled path, a call's arguments run in parallel where `ParallelismAnalyzer` judges them worth a task, as a tuple's elements do, so a reduction's two halves run in parallel; and the one library's parallel range stops its split at a grain size, a chunk that runs efficiently in sequence, not at single elements. Today the range joins its halves as the arguments of one call (`red.join(loop'(lo, mid-1), loop'(mid, hi))`) and splits to single elements, while the code generator evaluates a call's arguments in order (row 951), so every `SUM`, `DOT` and `BIG MAX` of microGPT would run its bodies one at a time once compiled programs use the one library. The decision needs a group of forked arms to join every arm before it completes abruptly, which the compiled path does not do (row 947). Declined: the library binding the halves as a tuple, and leaving reductions sequential. Reason: the specification runs each argument of a call in an implicit thread, walk forks a call's arguments, and the model's parallelism is its reductions.
- **Applies:** The compiled path's calls, and the one library's range.
- **Requires:** Do not rebind the halves as a tuple, and do not make reductions sequential; build parallel argument evaluation in the code generator and a grain size in the range.
- **Unfinished:** All of it, as I read it: parallel arguments in the code generator (row 951), joining every arm on abrupt completion (row 947), and the grain size in `RangeInternals`.
- **Could not resolve:**
  - "in his words, 'you need the right forking constants'": whose words, the curator's or Steele's (named in the same sentence)? Unclear wording.
  - The grain size: no value or rule for choosing it is given. Unclear wording.
  - "It needs a group of forked arms to join every arm before it completes abruptly": "it" is the decision (or the group)? I read: a fork group must join all its arms before it ends abruptly. Unclear wording; minor.

## Row 893 (gap ledger)

- **Established:** Under walk, an object that extends a self-typed trait at a type it is not a subtype of still loads, though the specification makes it a static error. Walk's load check reads that trait's `self` as `C[\X\] & X`, so where the trait's operator and a generic array operator both fit a call, walk runs one of them instead of refusing the ambiguity. Example: `object Bad extends { Arry[\Rr\], AddG[\Rr\] }` beside `MINUS[\T extends { Numb, AddG[\T\] }\](x: Arry[\T\], y: T)`: `Bad MINUS Rr` prints 'array minus number', though `AddG[\Rr\]`'s `MINUS` fits too and neither is more specific. The compiled checker refuses `Bad`.
- **Conditions:** Walk only; status `NEGATIVE-VERIFIED`; class implementation gap (walk).
- **Consequence:** Do not rely on walk to refuse such an extender; the checker does. Walk applies no extender rule of P-146.
- **Evidence:** `ProjectFortress/tests/XXXSelfTypeExtenderOtherTypeWalk.fss`; `OverloadedFunction.java:845-867` (`selfTypeParameter`) at `c124c6b65`; `Specification/appendices/changes.tex:4291-4292`; `basic/traits.tex`, "Trait Declarations"; found by climb batch 26 rung W's skeptic; sibling row 804.
- **Could not resolve:**
  - "`NEGATIVE-VERIFIED`": `references/records.md` lists it as a status but defines it only in the row template, which I may not read. Concept I lack (a record term).
  - "self-typed trait" and "`C[\X\] & X`": a trait whose static parameter names its extender, as `AddG[\T\]`, I guess; the skill does not define it. Concept I lack.
  - `Arry`, `AddG`, `Numb`, `Rr`: the probe's own short names, not the library's. Readable from the example; minor.

## Row 961 (gap ledger)

- **Established:** On the compiled path, a negative integer numeral at a program's own number type reaches that type's `coerce(x: IntLiteral)` as a signed value: `t: Tally = -3` calls the coercion with -3. P-173 and P-174 instead make it prefix `-` applied to the coercion of the natural numeral `3`, refused at a type without `-`. The cause: the integer literal fold makes `-3` one negative `IntLiteralExpr` before the checker and keeps no trace of the prefix operator. Until the switch-over the prelude's `IntLiteral` carries the sign, so the coercion reads -3 exactly; the difference shows once the coercion reads a numeral's four numbers.
- **Conditions:** The compiled path; a program's own number type; status `NEGATIVE-VERIFIED`; class implementation gap (checker). Walk's half is row 968.
- **Consequence:** No workaround needed before the switch-over; at the switch-over the fold must keep the prefix `-` for a typed place.
- **Evidence:** `ProjectFortress/compiler_tests/XXXNegativeNumeralOwnType.test`; `compiler/desugarer/IntegerLiteralFoldingVisitor.java:373-377` at `7daf51fe8`; `Specification/basic/expressions/literals.tex`, "Literals"; found by climb batch 29 rung C.
- **Could not resolve:**
  - P-173 says "An expression of numerals alone folds exactly before the checker into a signed constant", with no exception for a typed place; this row says P-173 makes `-3` at a program's type a prefix `-` on the coercion of `3`. The rule for a typed place lives in P-174, which the file does not hold. A reader of P-173 alone would call the present behaviour correct. Unclear wording across entries.
  - "a numeral's four numbers": as in F-74 and F-79. Concept I lack.

## Row 965 (gap ledger)

- **Established:** On the compiled path, until the switch-over, the prelude declares `String`'s `||` with the string first only (`opr ||(self, b:Object)`), so `c || s` for `c: Character`, `s: String` is refused ('... is not applicable to an argument of type (Character, String)'). The one library declares `opr ||(a:Any, b:String)`, and walk runs `c || s`. Two literals, `'a' || "bc"`, compile, because the fold of a concatenation of literals makes one string literal before the checker; the base refused them with the same message.
- **Conditions:** The compiled path under the prelude; status `NEGATIVE-VERIFIED`; class implementation gap (prelude); the specification is silent.
- **Consequence:** On the compiled path, put the string first or convert the character; the gap ends at the switch-over (P-37), so no prelude edit (as the skill forbids editing the prelude).
- **Evidence:** `ProjectFortress/compiler_tests/XXXCharacterBeforeStringConcatenationCompiled.test`; `LibraryBuiltin/CompilerBuiltin.fsi:37`; `Library/FortressLibrary.fsi:2707`; `compiler/desugarer/PreTypeCheckDesugaringVisitor.java`; found by climb batch 29 rung S.
- **Could not resolve:**
  - "`Character`": the one library's type is `Char` (F-286, F-307); I take `Character` to be the prelude's name, but the row does not say. Unclear wording; minor.

## Row 579 (gap ledger)

- **Established:** Against the one library, the compiled checker refuses the floor and ceiling brackets of a `ZZ32` and of a numeral as an ambiguous coercion, and types `round` of a `ZZ32` at `QQ`'s `ZZ`. The cause: `Integral`'s body declares both brackets and `round(self)`, but its api does not, so only `RR64`'s and `QQ`'s declarations apply ("Ambiguous coercion ... (RR64 & {Float, FloatLiteral})->ZZ64; QQ->ZZ." and "Function body has type ZZ, but declared return type is ZZ32.").
- **Conditions:** The compiled checker against the one library; status `NEGATIVE-VERIFIED`; class library gap vs spec (library); no gated program meets it before the switch-over; no test.
- **Consequence:** The repair is for `Integral`'s api to state the three declarations; a worker who needs these on the compiled path after the switch-over must make that edit, with a test first.
- **Evidence:** `Library/FortressLibrary.fss:725-727` at `c124c6b65`, `Library/FortressLibrary.fsi:449`; the probe `explorations/reviews/numerics-plan-coordinator/probes-B/check.sh FloorBracketCk` at `base` and `edit3` (`84aef6a4f^`), 5 errors each; `explorations/compile-ladder/rung-numeral-library/REPORT.md` section 6; `Specification/basic-lib/basic-integers.tex`, "Integers"; found by climb batch 8 rung Q's skeptic and repair round.
- **Could not resolve:**
  - The description says the brackets "of a numeral" are refused, but the note says "the case of a numeral is not measured". Does that refer to the refusal or to the repair's effect? Two readings. Unclear wording.
  - "Repair: `Integral`'s api states the three": done or proposed? The status and "none" for a test suggest proposed. Unclear wording.
  - "`base` and `edit3` (`84aef6a4f^`), 5 errors each": which commit each label names, and why both give 5 (the edit did not help?). Unclear wording.
  - The quoted message names `FloatLiteral`, which P-172 replaced; the measurement predates that change, so whether the message still reads so is not said. Unclear wording; minor.
  - "full text: history, row 579": the row is cut short and its rest is in the ledger's history, which I may not read. Unclear wording (the row does not stand alone).

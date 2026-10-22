# Cold read: facts/f0 (F-151, F-263, F-264)

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed `references/` only (searched: `library.md`, `compiler.md`, `interpreter.md`, `records.md`, `tests-writing.md`, `gate.md` and the rest except `revival-changes.md` and `sources.md`).

## F-151 "`Vector`, `Matrix` and their factories and operators bound their element type ..."

**Established:** Every `Vector` and `Matrix` type, and every factory and operator that makes or works on them, requires its element type `T` to be both a `Number` and a `MultiplicativeRing[\T\]`. The two halves do different jobs. `MultiplicativeRing[\T\]` is what lets the compiled checker accept the arithmetic in the bodies, because `Number` itself declares no `+`, `*` and so on. `Number` is kept because its `comprises` clause lists a fixed set of types, so any `T` under the bound is excluded from `String` and from the array types. That exclusion is the only thing that makes the "mirror pairs" valid overloads: the pair of declarations taking (array, scalar) and (scalar, array). Without it the two would overlap and neither would be more specific. A side effect is that `Number` does not satisfy the bound, because `Number` is not a `MultiplicativeRing[\Number\]`. So `Vector[\Number,n\]` is not a legal type, and the factories `array1` and `array2` give a plain array when the element type is `Number`, not a `Vector` or a `Matrix`. The checker also accepts a generic function that passes a value typed with its own `T` to another function with the same bound, for example the norm calling `squaredNorm`.

**Conditions:** It holds for the element types of `Vector` and `Matrix` and of their factories and operators. The entry does not say whether this is the interpreter's library, the compiler's prelude, or both (F-264, a fact on the same types, says "the interpreter's library"). It also does not list which element types meet the bound. The claims about the checker hold for the compiled checker. The test runs under walk. The bound is provisional: it is the default answer to an open design question, not the curator's ruling.

**Consequence:** A worker must not remove `Number` from the bound, or the mirror pairs stop being valid overloads. A worker must not remove `MultiplicativeRing[\T\]`, or the checker refuses the bodies' arithmetic. The worker must not expect a `Vector` or `Matrix` with element type `Number`: at `Number` the factories give a plain array. The worker must not treat the bound as a decision of the curator. The other option, a separate bound for each operation, is still open, and the bound may change after his review.

**Evidence:** `tests/ArrayElementAlgebra.fss` under walk. The detail is in `reviews/array-fork2-judgement.md` sections 2.5 and 4. Cross-references: F-119, F-229, F-227; PLAN item 13, fork 2; review-queue item 31. The entry names no test or run for its claims about the compiled checker. The walk test is the only check it names.

**Could not resolve:**
- "the scalar extension's mirror pairs": "scalar extension" is not in the skill. I read it as the library's overloads that apply a scalar operation across an array, and "mirror pairs" as the (array, scalar) and (scalar, array) declarations. This is a language/library concept I lack, though the gloss "an array and a scalar in either order" mostly fills it in.
- Why the exclusion of `String` matters for the mirror pairs (the arrays part I can infer, the `String` part I cannot). This is unclear wording, or a library fact the entry does not give.
- "its `comprises` clause is closed": the skill describes `comprises` but never says a clause can be open or closed. This is a language concept I lack, though it is inferable.
- "built at the default of the array design's question on it": the array design and its question are named nowhere I may read. "PLAN" and "review queue" are not defined in the skill. The wording is unclear: I can tell that it is provisional, but not what the question is.
- "is not well formed ... give a plain array": the entry does not say whether this is static (the checker) or what walk does at run time, or both. The wording reads two ways.
- "a call whose argument carries the caller's type parameter": I read "carries" as "has a type built from". This is minor unclear wording.

## F-263 "In the interpreter's library each integer power is declared to answer its base's own type ..."

**Established:** In the interpreter's library, `x^e` with an integer base has its base's type as its declared result type (for example, a `ZZ32` base gives a `ZZ32`, whatever the exponent's type). Under walk, at a negative exponent, the result is as follows. A base of 1 gives 1. A base of -1 gives ±1, exactly. A base of 0 raises `DivisionByZero`. Any other base raises `IntegerOverflow`, because the true result is a fraction that no integer type can hold. This holds for the bases `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, with an exponent of any integer type. A numeral is a `ZZ32` under walk, so `2^(-1)` raises `IntegerOverflow`. `IntLiteral`, the compiled checker's type for an integer numeral, follows the same rules under walk, but its power gives a `ZZ32`, like all its arithmetic (row 578). `QQ`'s power takes an exponent of any integer type. To get a fraction, use a float or rational base: `2.0^(-1)` is 0.5, and `(2/3)^(-1)` is `3/2`. The compiled checker accepts the library's own uses of these powers. microGPT has one integer power, in `strToInt`, and its exponent is never negative. The compiled path's own library differs. At a negative exponent its power gives 0, or a raw Java exception at a base of 0 (row 441), and its overflow is also wrong (row 523). Both are still to build under P-153.

**Conditions:** These are the interpreter's library rules under walk. The compiled path uses its own prelude until the switch-over, and does not follow them. The rules are about negative exponents. The `IntLiteral` case answers `ZZ32`, not its base's own type, so it is an exception to the title.

**Consequence:** A worker who needs a fractional result must use an `RR` or `QQ` base, never an integer base with a negative exponent. The worker can rely on the walk behaviour stated above. A worker must not rely on the compiled path's integer power at a negative exponent, or on its overflow, until P-153's remaining parts are built. When the compiled path is fixed, the expected failure `compiler_tests/XXXIntegerPowerContractCompiled.test` should flip. microGPT does not depend on any of the negative-exponent rules.

**Evidence:** `tests/IntegerPowerContractWalk.fss` and `tests/QQPowerExponent.fss` under walk. The expected failure `compiler_tests/XXXIntegerPowerContractCompiled.test` on the compiled path. "The distance stage" for the checker's acceptance. The detail is in `compile-ladder/rung-integer-power/REPORT.md` sections 1, 2 and 4, and `perf-probes/integer-power/REPORT.md` section 1.6. Rows 578, 441 and 523. F-74 and F-262. P-153.

**Could not resolve:**
- "Under walk the value named `IntLiteral`": I cannot tell what this is. Under walk a numeral is a `ZZ32` (the previous sentence), so which value is "named `IntLiteral`"? It could be a value of type `IntLiteral` made some other way, or a library declaration literally named `IntLiteral`. The wording is unclear. I also cannot tell whether "its power answers a `ZZ32` value" is a defect (row 578) or intended.
- "the distance stage": not defined in the skill. The skill defines the count stage (`compiler.md`), not a distance stage. This is a term I lack and could not find.
- "an exponent of any integer type, one beyond 64 bits included": it is unclear whether this means a type wider than 64 bits (`ZZ`) or an exponent value that does not fit in 64 bits. The wording reads two ways.
- "at a negative exponent its power gives 0": it is unclear whether this covers the bases 1 and -1 too on the compiled path, so that `1^(-1)` is 0. The wording reads two ways.
- "that power's overflow (row 523)": the entry does not say what goes wrong at overflow on the compiled path. The wording is unclear (it points to the row only).
- `QQ`'s behaviour at a base of 0 with a negative exponent is not stated. This is a gap, not ambiguous wording.

## F-264 "In the interpreter's library, nine `Vector` and `Matrix` operators, three factory arms and `Array2`'s column and row subscripts get their declared type through the function `cast`."

**Established:** In the interpreter's library, several places produce a value whose static type is too general (`Array1` or `Array2`). Each wraps the value in `cast[\T\](x)` to give it the declared type. `cast` returns `x` if it has type `T` and raises `CastError` if not (`Library/FortressLibrary.fss:33-37`). There are three groups of these places:
- The nine operators: `Vector`'s `+`, binary `-`, unary `-`, `scale` and `pmul`, and `Matrix`'s `+`, binary `-`, unary `-` and `scale`. Each builds its result with the inherited `map` or `ivmap`. These are typed `Array1` or `Array2` and build through `replica`, the method that makes an array of the same layout.
- The base-0 arms of `__builtinFactory1`, `__immutableFactory1` and `__builtinFactory2`.
- The subscripts `a[:, j]` and `a[i, :]`.

Operators built with `fill` or `tabulate` need no cast, because `Vector` and `Matrix` redeclare those at their own type (F-158). With the casts, the compiled checker accepts all these bodies. Under walk every cast succeeds at all eight number types. A `Vector` or `Matrix` whose `replica` gives an array that is not a `Vector` or `Matrix` makes the nine operators raise `CastError`. Adding the casts changed no result of the tree's tests and demos under walk, including microGPT's quick pair.

**Conditions:** It holds in the interpreter's library. The run-time results are under walk, at the eight number types as element types. The checker result is from the distance stage. The `CastError` case arises only through a `replica` that answers the wrong kind of array, and the entry ties it only to the nine operators.

**Consequence:** A worker who adds or changes a `Vector` or `Matrix` type must make its `replica` give a `Vector` or `Matrix`, or the nine operators fail with `CastError`. A worker adding a new `Vector` or `Matrix` operator should build it with `fill` or `tabulate`, which need no cast. If they build it with `map` or `ivmap`, they must cast the result in the same way. The worker must not remove these casts: the checker needs them to accept the bodies.

**Evidence:** `tests/VectorMatrixCastsWalk.fss` under walk. "The distance stage" for the checker. Walk runs of the tree's tests and demos, and microGPT's quick pair. The detail is in `compile-ladder/rung-array-sites/REPORT.md` sections 1 and 5, and `compile-ladder/rung-array-sites/SKEPTIC.md` section 3, finding 3. F-158.

**Could not resolve:**
- "the distance stage": not defined in the skill (only the count stage is). This is a term I lack and could not find.
- "the base-0 arms": "arm" and "base 0" are not in the skill. I read it as the branch of each factory that handles an array whose index starts at 0, but it could mean a base case. This is a library concept I lack.
- The declared type that the factory arms and the two subscripts are cast to is not named. The operators clearly cast to `Vector` or `Matrix`. The subscripts' type (`Vector`? `Array1`?) is not stated. This is unclear wording.
- `ivmap` and `pmul` are not explained (I guess an index-and-value `map` and a pointwise multiply). They are minor library names I lack, and the entry does not depend on what they mean.

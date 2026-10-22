# Cold read 2 of `facts/f0/clean.txt`

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and from its `references/`: `library.md`, `compiler.md`, `gate.md`, `interpreter.md` (the model program), `tests-writing.md` (`XXX`), `records.md` (entries, the ledger). Nothing else.

## F-151 "In the interpreter's library, `Vector`, `Matrix` and their factories and operators bound their element type ..."

**Established:** In walk's library, `Vector`, `Matrix`, the factories that make them and their operators all require the element type `T` to satisfy `T extends { Number, MultiplicativeRing[\T\] }`. Each half of the bound does a job:
- `MultiplicativeRing[\T\]` supplies the arithmetic. `Number` declares none, so without the ring the compiled checker would refuse the arithmetic in the bodies.
- `Number` supplies two things the ring does not. First, its `comprises` clause names every type under it, so any `T` under `Number` provably excludes `String`. That exclusion is what lets the four scalar juxtapositions (vector-scalar, scalar-vector, matrix-scalar, scalar-matrix) sit beside the library's juxtapositions with a `String` as a valid overload set. Second, it declares `asFloat`, which the vector norm calls.

The eight number types meet the bound. `Number` and `IntLiteral` do not, since neither is a multiplicative ring over itself. So `Vector[\Number,n\]` is ill-formed, and `array1`/`array2` called at `Number` hand back a plain array, not a `Vector`/`Matrix` (F-229). The checker accepts a call like the norm's `squaredNorm(me)`, whose argument type is built from the caller's own type parameter under the same bound (F-227). The scalar extension (eight array-scalar operators) has separate bounds that also include `Number` (F-119).

**Conditions:** The interpreter's library (the one that walk runs and the count stage checks). The bound is provisional. It is a reviewer's recommended default, landed on the curator's instruction to land it. The curator has not yet ruled on the bound itself. That question waits until after the switch-over, and the alternative under consideration is a separate bound for each operation.

**Consequence:** Instantiate `Vector`/`Matrix` only at one of the eight number types, never at `Number` or `IntLiteral`. Do not expect `array1`/`array2` at `Number` to give a vector or a matrix. A new `Vector`/`Matrix` operation should carry the same bound. Do not drop either half of the bound, or switch to per-operation bounds, while the curator's answer is pending. The scalar extension's bounds are a separate matter (F-119).

**Evidence:** `tests/ArrayElementAlgebra.fss` gates it under walk. The rationale and measurements are in `reviews/array-fork2-judgement.md`, sections 2.5, 2.9 way 3 (the ring alone, measured) and 4. Pending items: PLAN item 13 (fork 2) and review-queue item 31. Related: F-229, F-227, F-119.

**Could not resolve:**
- "bound their element type": "bound" can be read as the past tense of "bind", which suggests a former state. The rest of the entry is present tense, so I took it as the present-tense verb "to bound". Unclear wording.
- "the numeral type `IntLiteral`": this concept is not in the skill. Only F-263 in the same file explains it (the type the compiled checker gives an integer numeral). Read alone, F-151 does not explain it. Language concept I lack.
- "`array1` and `array2` have no branch for `Number`": the entry never says what these functions return at the eight number types. It implies a `Vector`/`Matrix` but does not state it, and "branch" (a branch on the element type?) is not explained. Unclear wording.
- "the norm's `squaredNorm(me)`": `me` is not explained. I guessed it is the norm's own parameter. I also could not tell why this fact belongs here: is it a limit that was worked around, or just a confirmation? Unclear wording.
- "The scalar extension, the eight operators between an array and a scalar": the eight are not listed. I could not tell whether they overlap the four juxtapositions above, or whether they apply to plain arrays rather than to `Vector`/`Matrix`. "has bounds of its own, also with `Number`" can be read as "its bounds also contain `Number`" or "also bounds with `Number`, like these". Unclear wording.
- "PLAN item 13" and "review-queue item 31": the skill names neither file (records.md lists POSITIONS, FACTS, INDEX and the ledger only), so a worker cannot find them. Unclear wording, missing pointer.
- "sections 2.5 (...), 2.9, way 3 (...) and 4 (...)": the list can be read as three items (2.5; 2.9 way 3; 4) or four (2.5; 2.9; way 3; 4). Unclear wording.

## F-263 "In the interpreter's library each integer power is declared to answer its base's own type; under walk, at a negative exponent ..."

**Established:** In the interpreter's library, each integer power `^` is declared to return the base's type. Under walk, with a negative exponent:
- bases 1 and -1 give their exact power;
- base 0 raises `DivisionByZero`;
- any other base raises `IntegerOverflow`.

This holds for bases `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`, with an exponent of any integer type, including a `ZZ` exponent wider than 64 bits. Under walk a numeral is `ZZ32` (F-74), so `2^(-1)` raises `IntegerOverflow`. For a fractional result, use a float or rational base: `2.0^(-1)` = 0.5, `(2/3)^(-1)` = 3/2. `QQ`'s power accepts an exponent of any integer type.

`IntLiteral`, the compiled checker's type for an integer numeral (F-262), also denotes a zero value under walk. Its power follows the same rules but returns a `ZZ32`, not its declared `IntLiteral`. This is a walk gap (row 578). The compiled checker accepts the library's own calls of these powers. microGPT's only integer power is in `strToInt`, always with a nonnegative exponent.

The compiled path's own library differs. Its `ZZ32` power at a negative exponent gives 0 for every base except 0, 1 and -1, and throws a raw Java `RuntimeException` at base 0 (row 441). Its overflow either throws a raw Java exception that Fortress `catch` cannot see, or saturates silently (row 523). P-153 lists the compiled path's conformance as still to build.

**Conditions:** The rules hold under walk and the interpreter's library only. They do not hold on the compiled path until P-153's remaining work is built. `IntLiteral`'s result type is wrong under walk (row 578). The rules cover the five integer base types; `QQ` is covered only as to the exponent's type.

**Consequence:** Never expect a fraction from an integer base with a negative exponent: write a float or `QQ` base. Under walk, code can catch `IntegerOverflow`/`DivisionByZero` from `^`. On the compiled path, do not rely on the power's behaviour at a negative exponent or on overflow. The expected-failure test records the gap. This entry implements P-153, so read P-153 for the decision itself. microGPT is unaffected.

**Evidence:** `tests/IntegerPowerContractWalk.fss` and `tests/QQPowerExponent.fss` (walk). `compiler_tests/XXXIntegerPowerContractCompiled.test` (compiled path, expected failure). The "distance stage" (the checker's acceptance). Ledger rows 578, 441 and 523. `compile-ladder/rung-integer-power/REPORT.md` sections 1, 2 and 4. `perf-probes/integer-power/REPORT.md` section 1.6.

**Could not resolve:**
- "the distance stage": the skill defines only the "count stage" (`compiler.md`). I could not tell whether these are the same thing. Term not found in the skill.
- "including a `ZZ` exponent too large for 64 bits, such as 2^70": 2^70 is positive, but the stated rules are for negative exponents. Either the example means -(2^70), or "these rules" also cover positive exponents. The latter would mean overflow at large positive exponents, which is not stated. Unclear wording.
- "the name `IntLiteral` also denotes a value, a zero that no numeral reaches": I could not tell how a type name denotes a value, or how a program reaches that zero (by writing `IntLiteral` as an expression?). Language concept I lack, not in the skill.
- "answers a `ZZ32` ... against its declared `IntLiteral`": I read "against" as "contrary to its declared return type". It could also be read as "compared against". Unclear wording, minor.
- "`QQ`'s power takes an exponent of any integer type": I could not tell whether `QQ` at base 0 with a negative exponent follows the same `DivisionByZero` rule. The entry does not say. Unclear wording, minor.
- "throws a raw Java exception that no Fortress `catch` sees, or saturates quietly": the entry does not say when it throws and when it saturates (which inputs, or which operation). Unclear wording.

## F-264 "In the interpreter's library, nine `Vector` and `Matrix` operators and three branches of the array factories get their declared type through the function `cast` ..."

**Established:** Several bodies in the interpreter's library reach their declared result type through `cast[\T\](x)`. `cast` returns `x` if it has type `T`, else raises `CastError`. The bodies are:
- **Nine operators.** `Vector`'s `+`, binary `-`, unary `-`, `scale` and `pmul`, and `Matrix`'s `+`, binary `-`, unary `-` and `scale`. Each builds its result with the inherited `map`/`ivmap`, which are typed `Array1`/`Array2` and go through `replica`. The cast narrows the result to `Vector`/`Matrix`.
- **Three factory branches.** The zero-based branches of `__builtinFactory1`, `__immutableFactory1` and `__builtinFactory2`, each cast to its factory's declared result type.
- **Two subscripts.** `Array2`'s `a[:, j]` and `a[i, :]`. Each builds its sub-array with a range subscript, which yields an unsized `Array`. The cast turns it into the sized `Array2` that the field of `Col`/`Row` requires.

Five other bodies need no cast, because `Vector` and `Matrix` redeclare `fill` and `tabulate` at their own types (F-158): `vector(v)`, `tabulatedVector`, `matrix(v)`, and `Matrix`'s `rmul` and `lmul`. With these casts, the compiled checker accepts all these bodies. Under walk every cast succeeds at the eight number types. A `Vector` or `Matrix` whose `replica` returns something else raises `CastError` in the nine operators. When the casts landed, nothing changed under walk:
- no value moved in the 42 array-family test files (compared value by value) or in four array demos;
- the whole interpreter suite passed;
- microGPT's quick pair passed.

**Conditions:** The interpreter's library. The casts succeed at the eight number types. They fail with `CastError` if a subtype's `replica` does not preserve the `Vector`/`Matrix` type. The factory casts apply only to the zero-based branch.

**Consequence:** A worker may rely on these operators, factories and subscripts returning their declared types under walk, and on the checker accepting them. Any `Vector`/`Matrix` subtype that overrides `replica` must return a `Vector`/`Matrix`, or the nine operators fail. A new `Vector`/`Matrix` body built through `map`/`ivmap` or a range subscript needs the same cast. One built with `fill`/`tabulate` does not.

**Evidence:** `Library/FortressLibrary.fss:33-37` (`cast`). `tests/VectorMatrixCastsWalk.fss` (walk, eight number types). The "distance stage" (the checker's acceptance). The landing comparison: 42 test files, 4 demos, the suite, the microGPT quick pair. `compile-ladder/rung-array-sites/REPORT.md` sections 1 and 5. `compile-ladder/rung-array-sites/SKEPTIC.md` sections 2 and 3, finding 3.

**Could not resolve:**
- "`Col` and `Row`" and "the field of `Col` or `Row`": not in the skill. A column or row is one-dimensional, yet the field takes a sized `Array2`. I could not tell whether `Col`/`Row` hold an n-by-1 (or 1-by-m) `Array2`, or something else. Library concept I lack, and unclear wording.
- "the sized `Array2`" vs "an unsized `Array`": "sized" (static size parameters?) is not defined in the skill. Probably it means `Array2` with its sizes as static arguments, but not certain. Language concept I lack.
- "`map` or `ivmap`": `ivmap` is not in the skill. Its role (another mapping method) is inferable and does not block. Library concept I lack, minor.
- "the distance stage": as in F-263, not defined in the skill, which defines only the "count stage". Term not found in the skill.
- "for an array whose lowest indices are 0": I read this as zero-based arrays. I could not tell whether the other branches need no cast or are simply not checked. Unclear wording, minor.

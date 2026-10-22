# Cold read 2 of `facts/f11/clean.txt`

Context read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, and in its `references/`: `build-and-caches.md`, `interpreter.md`, `library.md`, `compiler.md` (first 60 lines), `tests-writing.md` (first 45 lines), `tests-running.md` (harness-one section), `records.md` (grep for the ledger's terms). Nothing else.

All twelve entries are facts. Cross-references to other entries (F-57, F-62, F-126, F-132, F-135, F-146, F-155, F-251, P-41, P-44, P-59, P-69, P-73, P-151) and ledger rows cannot be followed under this brief. I list them only where the entry depends on them to be understood.

---

## F-118: compiled numerals keep their values; unsigned printing and comparison beyond `ZZ64` are open

**Established:** The code generator stores an integer numeral in the narrowest of three forms that holds it: a Java `int`, a `long`, or its decimal text. So on the compiled path a large numeral such as 2^32 - 1 or 2^64 - 1 keeps its exact value. Two defects remain on the compiled path. First, an `NN32` or `NN64` value above the signed maximum of its width (2^31 - 1 or 2^63 - 1) prints as a negative number (row 326). Second, comparing two numerals converts both to `ZZ64`, so a numeral too large for `ZZ64` cannot be compared: `a = 18446744073709551615` followed by `a < 5` fails with `Not in range for ZZ64` (row 328). Arithmetic between numerals whose result needs 64 bits or more also keeps its value on the compiled path. Walk instead raises `IntegerOverflow` at `x + x` in the probe program, because walk's addition is fixed-width.

**Conditions:** Compiled path only, except for the comparison with walk. Walk keeps the values at `ZZ` and `ZZ64`, and does not let a numeral bind to `NN32` or `NN64` at all (F-57; the skill's `tests-writing.md` says the same). Neither defect row has a test. The arithmetic claim is measured only by a probe, with no gated test.

**Consequence:** A worker can rely on a numeral's value reaching compiled code unchanged at `ZZ`, `ZZ64`, `NN32` and `NN64`, since a test gates this. A worker must not rely on compiled printing of large unsigned values, or on comparing two numerals when one exceeds the `ZZ64` range. A worker who fixes rows 326 or 328 has no existing test to start from and must write one. A worker who depends on numeral arithmetic of 64 bits or more being exact on the compiled path has no gate protecting it.

**Evidence:** `compiler_tests/IntLiteralWrapRepairR2` gates the numeral values at `ZZ`, `ZZ64`, `NN32` and `NN64`. Gap-ledger rows 326 and 328 hold the two defects, and neither has a test. The arithmetic result was observed in the report's probe only. Detail is in `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

**Could not resolve:**
- "as walk does at `ZZ` and `ZZ64`": `18446744073709551615` is 2^64 - 1, outside `ZZ64`'s range. So walk cannot keep it at `ZZ64`. I read the phrase as "each value at whichever of the two types can hold it", but the sentence pairs two values with two types. *Unclear wording.*
- "by its exact bit length": signed or unsigned bit length? 4294967295 fits 32 unsigned bits but not a signed `int`. So I cannot tell which form it takes. *Unclear wording* (minor).
- "Walk stops the same program at `x + x`": no program has been shown, so "the same program" has nothing to refer to. Nor can I tell how `x` is bound or at what width walk adds it. *Unclear wording.*
- `IntLiteral`: I take it to be the static type of an integer numeral before it is given a number type. The skill says only that `fortress compile` "folds integer literals". *Language concept I lack* (inferable).
- "compiled world" in the headline: read as "compiled path". *Unclear wording* (minor).

---

## F-119: the library's scalar extension

**Established:** The library declares eight generic operators that combine an `Array[\T,I\]` with a single value of its element type `T`. They are `+`, `-`, `MIN` and `MAX`, each declared with the array first and with the scalar first. `T` must be a `Number` and also an `AdditiveGroup[\T\]` for `+` and `-`, a `StandardMin[\T\]` for `MIN`, and a `StandardMax[\T\]` for `MAX`. A second test checks that a program's own overloads coexist with these. That test imports the fixture `test_library/ArrayOperatorVocabulary`, which declares two overloads each of `MINMAX`, `+` and juxtaposition over the library's arrays. Walk checks such overloads against the library's only on a cold cache (F-?2). So that test proves coexistence only on a run that started from an empty cache.

**Conditions:** These are the library's declarations, so the facts apply to walk's library. The coexistence test is meaningful only from an empty cache.

**Consequence:** A worker can use array-with-scalar `+`, `-`, `MIN` and `MAX` for number element types that meet the bounds. A worker who relies on `tests/ArrayOperatorsBesideLibrary.fss` passing as proof of coexistence must run it from an empty cache, for example with `harness-one.sh` and `COLD_CACHE=1`.

**Evidence:** `tests/ArrayScalarExtension.fss` and `tests/ArrayOperatorsBesideLibrary.fss` gate it. Detail is in `reviews/library-scalar-extension-review.md`, change 1.

**Could not resolve:**
- What each operator computes, and its result type. I assume an elementwise result of type `Array[\T,I\]`, but the entry does not say. *Unclear wording* (an omission, minor).
- `I` in `Array[\T,I\]`: assumed to be the index type. *Language concept I lack* (minor).
- `MINMAX`: I do not know this operator. *Language concept I lack* (minor; it does not block the point).
- Whether declarations in an imported helper component count as "a program's declarations" for F-?2's rule. The entry implies that they do. *Unclear wording* (minor).

---

## F-?2: walk checks a program's overloads of a library operator only for two or more declarations, and only on a cold cache

**Established:** When a program declares an operator name that the library also declares, walk's check at load compares the program's declarations with the library's only if the program declares that name at least twice. A single declaration is never checked. When the check runs, it can refuse the program's declarations next to the library's generic ones, even when the program's are more specific. Two examples: it refused C4's earlier pair of `MAX` between an `RR64` and an `Array[\RR64,I\]`, in both orders (row 341), which C4 dropped when F-119's scalar extension replaced it; and it refuses the `Matrix`-specialised elementwise `×` in `apl/mg/elemwise_nat_probe.fss` (F-155). The check also runs only on a cold cache. Walk writes a component to its cache before running the check, and skips the check for a component that it loads from the cache. So the refusal appears on the first, cold run and not on later warm runs (row 342). Deleting the program's own cache entries does not bring the check back; it runs only when walk analyses the library again (row 342).

**Conditions:** This holds under walk only, for program declarations of a name that the library declares. Both a count of two or more and a cold library cache are needed.

**Consequence:** A test that depends on this refusal, or on its absence, must run from an empty cache. Otherwise a warm run passes whatever the declarations are. A worker who sees a program with one declaration of a library operator load cleanly has learned nothing about overload validity. A worker who sees a refusal on one run and none on the next should suspect the cache, not a fix.

**Evidence:** Gap-ledger rows 341 and 342 record it. `compile-ladder/rung-library-comments/REPORT.md` section 4 describes a gated run that met a warm cache.

**Could not resolve:**
- "Walk writes a component to its cache before it runs this check, and skips the check on a component that it reads back": which component? If it is the program's component, deleting the program's own entries would bring the check back, which the next sentence denies. If it is the library's component, the sentence and the conclusion agree, but then the check belongs to analysing the library, not to loading the program. I cannot tell how a check of the program's declarations depends on the library's cache entry. *Unclear wording* (it blocks my understanding of the mechanism, though not of the practical rule "start from an empty cache").
- "never again": read as "never on a warm cache", since the entry then says a test must run from an empty cache, which implies the refusal returns on a cold start. *Unclear wording* (minor).
- Whether the refusal is correct (the specification's overloading rules) or a defect of walk. The text says "even where they are more specific than the library's", which hints at a defect, but it never says so. Row 341 is cited without its status. So a worker cannot tell whether to fix walk or to avoid such pairs. *Unclear wording.*
- `Matrix`-specialised elementwise `×`: I do not know the library's `Matrix` type. *Language concept I lack* (minor).

---

## F-121: the team's `comprises ... where` spelling for `AnyIntegral` stays a comment, its validity undecided

**Established:** The team wrote `AnyIntegral`'s `comprises` clause as `comprises Integral[\I\] where [\I\]`, which means every `AnyIntegral` value is an `Integral[\I\]` for some `I`. That spelling remains a comment in the source. The live clause lists `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64` explicitly. It stands by decision P-44, and the compiled checker accepts it (F-62). The specification allows a type in a `comprises` list to mention a `where`-clause variable, meaning the type at every value of that variable. The compiled checker now handles such variables of kind `nat`, `int` or type (F-146, F-251). Nobody has measured whether the checker accepts the team's spelling on `AnyIntegral`. Of the team's commented-out `comprises ... where` clauses, only `AnyList`'s was made live, by P-151. P-44 kept `AnyIntegral`'s comment beside the live clause because the `where` form was not built then. Whether to make it live now is an open question in PLAN ("Climb batch 17, listed for his review", item A.skeptic.1). The default answer recorded there is to leave it as a comment.

**Conditions:** `AnyIntegral` only. No decision says whether the team's clause is valid.

**Consequence:** A worker must keep the live, explicit list and leave the team's spelling as a comment until the curator answers A.skeptic.1. A worker must not assume that the checker accepts the `where` form on `AnyIntegral`, since that is unmeasured. A worker must not make the clause live as a side effect of other work.

**Evidence:** P-44, F-62, F-146, F-251 and P-151 as cited, and PLAN's item. Detail is in `coordinator/process-engineering/facts-slice-2.md`, "Points for the checker", point 1.

**Could not resolve:**
- "the compiled checker opens such variables": "opens" is not defined. I read it as "the checker expands or instantiates the `where`-clause variable, treating the listed type as covering every value of it", but it could also mean "accepts them as open, unbound". *Unclear wording.*
- "no decision says whether it is a valid clause" next to "The comment stays by P-44": P-44 decided to keep the comment but not whether the clause is valid. I reconciled the two, but the reader has to work for it. *Unclear wording* (minor).
- `comprises ... where [\I\]` as a construct: the skill explains `comprises` but not a `where` clause on it. The entry's own gloss ("a listed type hold a `where`-clause variable, at every value of it") was enough. *Language concept I lack* (resolved by the entry).

---

## F-122: `round` on `RR64` and `RR32`

**Established:** On both paths, `round` on a binary floating value sends an exact .5 to the nearest even integer: 2.5 → 2, 3.5 → 4. NaN rounds to 0. A value outside the `ZZ64` range gives the `ZZ64` minimum or maximum. On both paths there is one defect against the specification (row 360). A numeral that lies within half an ulp of a tie is first converted to its nearest double and then rounded, instead of being rounded as the exact rational number that it writes. So a numeral slightly above 2.5 that converts to the double 2.5 rounds to 2, not to 3.

**Conditions:** `RR64` and `RR32`, on both paths. The gating differs by path and case:
- Ties under walk are gated.
- Ties on the compiled path are gated for `RR64` only. The compiled `RR32` ties were only observed in a probe.
- NaN and saturation are gated on neither path.

**Consequence:** A worker can rely on round-half-to-even ties where gated. A worker who depends on the NaN or saturation results, or on compiled `RR32` ties, has no gate and should add one. A worker must not rely on `round` of a numeral near a tie matching the specification.

**Evidence:**
- Gates: `tests/RoundHalfEvenRungR.fss` (walk ties) and `library_tests/RR64FunctionsRungF.fss` (compiled `RR64` ties).
- Observed only: compiled `RR32` ties in a probe; NaN and saturation in the report's walk probe and its compiled differential.
- Code: `(long) Math.rint` in `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:132-134`.
- Defect: row 360.
- Detail: `compile-ladder/rung-round-half-even/REPORT.md`, "What landed" and "Differentials".

**Could not resolve:**
- The result type of `round`: the saturation to `ZZ64` bounds implies `ZZ64`, but the entry never states it. *Unclear wording* (minor).
- Whether row 360's defect has an `XXX` test: not stated. *Unclear wording* (minor).
- Otherwise clear.

---

## F-123: default printing of compiled objects

**Established:** On the compiled path, printing an object that has no `asString` of its own prints its type's name, as walk does. A value whose Java run-time class has its own `toString` prints with that `toString`. The compiled `RR32` is an example. Three things remain open on the compiled path:
1. Printing an object that declares or inherits a zero-argument Fortress member named `toString` causes a stack overflow (row 321).
2. `asDebugString` and `asExprString` print differently from walk's (row 363). The specification says nothing about their output, so neither is wrong against it.
3. In the type name's static argument, walk is the wrong one. For `Cell("s")`, walk takes the argument from the string's run-time class and prints `Cell[\FlatString\]`. The compiled path prints `Cell[\String\]`, which is the specification's answer (row 364).

For a numeral argument, neither path prints the static argument that the specification gives.

**Conditions:** Objects with no `asString` of their own. The `toString` overflow, the debug and expression strings, and the numeral case are open.

**Consequence:** A worker must not give a Fortress object a member named `toString` on the compiled path. A worker must not compare `asDebugString` or `asExprString` output across the two paths. A worker fixing static-argument printing should fix walk for strings, and both paths for numerals.

**Evidence:** `compiler_tests/DefaultRenderRungS` gates it. Rows 321, 363 and 364 hold the open defects. Detail is in `compile-ladder/rung-default-rendering/REPORT.md`, "Defects and their homes".

**Could not resolve:**
- "its bare type name": the `Cell` example shows static arguments printed (`Cell[\String\]`). So "bare" seems to mean "without fields or values", not "without static arguments". *Unclear wording.*
- "no `asString` of its own": does an `asString` inherited from a trait count as its own? *Unclear wording* (minor).
- "For a numeral argument neither path gives the specification's type": the entry gives neither the specification's type nor what each path prints. So a worker cannot act on it without the report. *Unclear wording.*
- "A value whose run-time Java class declares its own `toString` ... prints by it": is this intended behaviour or a defect? Is it compiled only? *Unclear wording* (minor).

---

## F-124: compiled integer shifts, narrowing and overflow

**Established:** On the compiled path, for `ZZ32` and `ZZ64`, a shift count at or beyond the type's bit width gives these results:
- `LSHIFT` gives 0.
- `RSHIFT` gives the sign: 0 for a nonnegative value, -1 for a negative one.
- A negative count turns `LSHIFT` into a right shift and `RSHIFT` into a left shift.
- `narrow` to 32 bits, from `ZZ64` or `NN64`, keeps the low 32 bits.
- `<<`, `>>` and `<<<` follow their own, different rules.
- `asZZ32` throws on an out-of-range value instead of truncating.

Overflow is detected exactly:
- Negation, absolute value and division can overflow only at the type's minimum value: `-MIN`, `|MIN|` and `MIN DIV -1`. They raise `IntegerOverflow` there. `|0|`, `-0` and `0 DIV -1` give 0.
- Addition and subtraction detect overflow from the sign bits. Multiplication computes the exact product: `Math.multiplyExact` on `ZZ64`, and a 64-bit product checked against the range on `ZZ32`. All three raise `IntegerOverflow` on every overflow, and a product with a zero factor is 0.

`ZZ`'s `<<<` raises a catchable `IntegerOverflow` on a shift whose result it cannot represent (row 386).

**Conditions:** Compiled path; `ZZ32` and `ZZ64`, plus `NN64` for `narrow`.

**Consequence:** A worker can rely on these semantics on the compiled path and can catch `IntegerOverflow` on overflow. A worker must not expect `asZZ32` to wrap. A worker who needs wrapping arithmetic must use the wrapping operators (F-130).

**Evidence:** `compiler_tests/IntSemanticsRungB.fss` gates it. For addition and subtraction, the team's `library_tests/Integer3.fss` also gates it. Detail is in `compile-ladder/rung-int-semantics-compiled/REPORT.md` section 1.

**Could not resolve:**
- "`<<`, `>>` and `<<<` keep their own rules": the rules are not given, and I cannot tell how these differ from `LSHIFT` and `RSHIFT`. *Language concept I lack* and *unclear wording*: the skill does not define these operators.
- The headline names only `ZZ32` and `ZZ64` for the shifts, while the body brings in `NN64` for `narrow`, and F-125 covers `NN32` and `NN64` shifts for walk. Are `NN32` and `NN64` shifts on the compiled path the same, different or absent? *Unclear wording* (limit not stated).
- Row 386: does it record a fixed defect or an open one? Is the `ZZ` `<<<` overflow the specified behaviour? *Unclear wording* (minor).
- "`0 DIV -1` answer 0": trivially true. I read it as "dividing 0 by -1 does not falsely raise". *Unclear wording* (minor).

---

## F-125: walk integer shifts and `ZZ`'s `shift`

**Established:** Under walk, for `ZZ32`, `ZZ64`, `NN32` and `NN64`, a shift count at or beyond the type's bit width makes `LSHIFT` give 0 and `RSHIFT` give the sign: 0 for nonnegative, -1 for negative. A negative count reverses the direction of either. For `ZZ`, `shift(x, k)` computes ⌊x·2^k⌋. So a negative `k` is a floor division by 2^-k. It raises a catchable `IntegerOverflow` when `k` is a positive count above 2^31 - 1, or when the result exceeds what Java's `BigInteger` can hold. This builds decision P-69. The compiled path has no `shift` (F-126).

**Conditions:** Walk only. `shift` is `ZZ` only.

**Consequence:** A worker can rely on these results under walk. A worker must not use `shift` in a compiled program. A worker must not name a variable `shift`, since it is a library functional method (`tests-writing.md`).

**Evidence:** `tests/IntSemanticsRungI.fss` gates it. Detail is in `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4.3 and 4.4.

**Could not resolve:** None.

---

## F-?1: walk's `GCD`, `LCM` and `CHOOSE`

**Established:** Under walk, `GCD` and `LCM` never return a negative result. `0 LCM 0` is 0. `n CHOOSE k` is 0 when `k < 0` or `k > n`. The `GCD` and `LCM` rules hold on `ZZ32`, `ZZ64`, `NN32`, `NN64` and `ZZ`. When the true result does not fit the type, these operations raise `IntegerOverflow`. An example is the GCD of a fixed-width type's minimum value with 0, which is |minimum|. Because `LCM` is always nonnegative, code that needs a signed LCM, for example to choose a direction, must compute the sign itself. The team's `tests/RangePrototype.fss` does so with `(a DIV (a GCD b)) DOT b`, where `DOT` is multiplication. The library's ranges do not depend on that sign.

**Conditions:** Walk only. `GCD` and `LCM` on the four fixed widths and `ZZ`. The types for `CHOOSE` are not stated.

**Consequence:** A worker can rely on nonnegative `GCD` and `LCM` and on the `CHOOSE` edge cases under walk. A worker who needs a signed least common multiple must write it as the team's test does. A worker should expect `IntegerOverflow` at the minimum value.

**Evidence:** `tests/IntSemanticsRungI.fss` gates `GCD` and `LCM` (rows 334 and 385, fixed). `tests/PowChooseLcmRungE.fss` gates `CHOOSE` (row 337, fixed). Detail is in `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4.2 and 7.

**Could not resolve:**
- "`MIN GCD 0`": in code format `MIN` reads as the `MIN` operator (which F-119 uses), but here it must mean the type's minimum value. *Unclear wording* (minor; resolved from context).
- "code that takes a direction from it": what direction? The example suggests the sign of a combined step, but the entry does not say. *Unclear wording* (minor).
- Whether the compiled path behaves the same: not stated. Read as a walk-only fact. *Unclear wording* (minor).

---

## F-128: where walk applies coercion

**Established:** Walk converts a value by coercion at three kinds of place:
- binding an argument to a parameter, varargs parameters included;
- an overloaded call that no declaration fits without coercion, after which walk dispatches again on the converted values;
- a binding or assignment with a declared type.

Walk picks the coercion from the value's run-time type (P-59). Measured as not converted:
- a value returned from a function with a declared return type (row 387);
- a coercion that has its own static parameter (row 513);
- a tuple parameter of an overloaded function, and a field of tuple type (row 395).

Read in the code but not measured, also not converted: the specification's tuple coercion where an element is varargs or keyword, and the specification's coercion of arrow (function) types.

**Conditions:** Walk only. The compiled path chooses coercions statically (`interpreter.md`).

**Consequence:** A worker can rely on coercion at parameters, overloaded calls and typed bindings under walk. A worker must convert explicitly at the listed places: returns, generic coercions, tuple parameters of overloaded functions, tuple fields, and the unmeasured tuple and arrow cases.

**Evidence:** `tests/Coercion*RungC.fss` gate it. Rows 387, 513 and 395 hold the measured gaps. Detail is in `compile-ladder/rung-interp-coercion/REPORT.md` sections 1, 5 and 9.

**Could not resolve:**
- The first two kinds overlap. Is "a parameter" a parameter of a non-overloaded function only, with overloaded calls as the second kind? Or does every call coerce per parameter, with the second kind as an extra retry? *Unclear wording.*
- "a varargs or keyword element of the specification's tuple coercion, and its arrow coercion": I do not know the specification's tuple coercion or arrow coercion, and the phrase "varargs or keyword element of ... tuple coercion" parses badly. Does it mean "a tuple coercion's varargs or keyword element"? *Language concept I lack* (tuple and arrow coercion are not in the skill) and *unclear wording*.
- "a coercion with its own static parameter": read as a generic `coerce` declaration. *Language concept I lack* (minor).

---

## F-129: sizes at run time on the compiled path

**Established:** On the compiled path, a size static argument, such as the 3 in `Vec[\3\]`, is carried at run time as a descriptor from `RTTIsize.of`, one descriptor per size value. In a run-time subtype test, a size is a supertype only of an equal size. When code reads a size as a value, the class loader puts the numeral in as a constant. Closures and tasks capture a size as a free static parameter (F-135). So a program whose sizes are all known at compile time loads, dispatches and runs compiled. This builds P-41. Open cases on the compiled path:
1. A size computed from a run-time number does not run: `tests/NatReflectTest.fss` stops at load (row 307).
2. A `ZZ32Vector` passed to a generic constructor fails at load (row 408).
3. Every static parameter without an `extends` clause, sizes included, gets the bound `Object` instead of the specification's `Any` (row 412).
4. An overload arm, chosen by dispatch, whose static parameter has a concrete generic bound stops the compile in the "sized form" and fails at load in the "type form" (row 413).
5. An object that extends two instantiations of one trait, one of them at a static parameter, passes the checker and fails at load (row 414).

Under walk, there is one defect (row 416). Walk refuses at load `g(b: Tg[\3\])` beside `g(b: Tg[\4\])`, because its overloading check does not know that different instantiations exclude each other. The compiled path dispatches these correctly.

**Conditions:** The positive claim holds for sizes known at compile time on the compiled path, minus the five open cases. Row 416 is walk's.

**Consequence:** A worker can use compile-time sizes in compiled programs. A worker must avoid sizes computed at run time, `ZZ32Vector` into generic constructors, and the other open patterns. A worker must not rely on an unbounded static parameter accepting tuples, functions or `()` on the compiled path. Overloads on different size instantiations work compiled but not under walk.

**Evidence:** `compiler_tests/NatRt*` gate it. Rows 307, 408 and 412-416 hold the open cases. Detail is in `compile-ladder/rung-size-runtime/REPORT.md` sections 1 and 9.

**Could not resolve:**
- "a dispatched overload arm whose static parameter has a concrete generic bound stops the compile in its sized form and dies at load in its type form": I cannot tell what "concrete generic bound" means (a bound like `List[\ZZ32\]`, a generic type at fixed arguments?). Nor can I tell what the "sized form" and "type form" are: the static parameter as a `nat` versus as a type? *Unclear wording.*
- "one at a static parameter": read as "one of the two instantiations has a static parameter as its argument", for example `T[\ZZ32\]` and `T[\S\]`. The skill says no type may extend two instantiations of one generic trait, so passing the checker is a checker defect. The entry does not say so. *Unclear wording* (minor).
- "A size read as a value is a constant that the class loader replaces by the numeral": clear enough.

---

## F-130: the wrapping operators

**Established:** The specification's wrapping operators ∔ (`DOTPLUS`), ∸ (`DOTMINUS`) and ⨰ (`DOTTIMES`) are declared in the interpreter's library. The library code and team tests that intend wrap-around arithmetic use them. This builds decision P-73. The compiler's prelude differs: its ∔ and ∸ saturate instead of wrapping, and it has no ⨰ (row 348). By reading the code, without a run, one library body was found that uses the wrapping operators where wrapping gives the wrong answer (row 700). That body is `Random`'s `LinearCongruential`, which computes `(mult DOTTIMES widen(state)) DOTPLUS add` and only then reduces `MOD modulus`. So it matches the mathematically exact state only where no step overflows, or where the modulus divides 2^width of its integer type `N`. The library instantiates it only with modulus 2^48, where it is correct.

**Conditions:** The declarations are walk's library's. The compiler prelude's ∔ and ∸ saturate until the switch-over. The `LinearCongruential` defect is latent: it is wrong only for other moduli.

**Consequence:** A worker who needs wrapping arithmetic under walk uses ∔, ∸ and ⨰, fully parenthesised (`library.md`). On the compiled path a worker must not expect ∔ and ∸ to wrap, and cannot use ⨰. A worker who instantiates `LinearCongruential` with a modulus other than 2^48 (or another divisor of 2^width) gets wrong states.

**Evidence:** `tests/WrapOperatorsRungD.fss` gates it. Rows 348 and 700 hold the defects. Detail is in `compile-ladder/rung-wrap-operators/REPORT.md` section 2; the operators' users are in `reviews/wrap-dependent-code.md`.

**Could not resolve:**
- "One library body uses the operators where wrapping is wrong" and the following `LinearCongruential` sentences: I read them as the same body, but the entry does not say "that body is". *Unclear wording* (minor).
- "where the modulus divides 2^width of its type `N`": read as 2^(bit width of `N`). *Unclear wording* (minor).

# Cold read of f11/clean.txt

Read with `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md` and the allowed `references/` files only. The file holds twelve FACTS entries. Two have placeholder numbers, F-?1 and F-?2, and F-119 cites F-?2 by that placeholder. Several entries cite entries outside this file (P-41, P-44, P-59, P-69, P-73, P-151, F-62, F-126, F-132, F-135, F-146, F-155, F-251), which I could not read. Below I note only those whose content the entry itself needs.

---

## F-118, "A numeral's value reaches the compiled world intact ..."

**Established:** On the compiled path, an integer numeral keeps its exact value, also above 32 and 64 bits, because the code generator picks how to hold a numeral by how many bits it needs. Walk keeps the value too. Two defects remain on the compiled path. First, an `NN32` or `NN64` value above 2^31-1 or 2^63-1 prints as a negative number (row 326). Second, a comparison between two operands of the numeral type `IntLiteral` is done at `ZZ64`, so a numeral beyond `ZZ64`'s range cannot be compared: `a = 18446744073709551615; a < 5` fails with `Not in range for ZZ64` (row 328). Also, arithmetic on `IntLiteral`s whose result needs 64 bits or more keeps its value compiled, while walk refuses that program with a type error.

**Conditions:** Compiled path. The test covers only numerals given the types `ZZ`, `ZZ64`, `NN32` and `NN64`. The printing defect applies to any `NN32`/`NN64` value above the signed half. The comparison defect needs both operands to be `IntLiteral`s. The arithmetic result was seen in one probe only, and no test covers it.

**Consequence:** A worker can rely on a large numeral keeping its value compiled at those four types. They must not rely on how a large unsigned value prints, on comparing two numerals beyond `ZZ64`, or on the arithmetic result (no test). Two programs that use such arithmetic act differently on the two paths.

**Evidence:** `compiler_tests/IntLiteralWrapRepairR2` covers the values. Rows 326 and 328 hold the defects. The probe is in `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

**Could not resolve:**
- `IntLiteral`: a concept I lack, not in the skill. The skill says only that the compiled path "folds integer literals". I read it as the static type a numeral has before it gets a number type.
- "the compiled world": unclear wording. I read it as the compiled path (bytecode and run time), but it could also mean the compiled checker.
- "chooses a numeral's representation by its exact bit length": unclear wording. It does not say which representations exist (32-bit, 64-bit, big integer?) or which type the numeral takes.
- The title says "compare two numerals", but the example compares a variable `a` with `5`. Does the defect need two literal numerals, or any two operands of type `IntLiteral`? I read the second. Unclear wording.
- "walk refuses the same program with a type error": the probe is not shown. Walk has no static types, so is this a failed dispatch at run time or a refusal at load? Unclear wording.
- Rows 326 and 328 have no test named, so I cannot tell whether an `XXX` test records them. Missing.

## F-119, "The library's scalar extension is eight generic declarations ..."

**Established:** The library lets an array and a scalar be combined by `+`, `-`, `MIN` and `MAX`, with the array on either side. That makes eight generic declarations over `Array[\T,I\]` and `T`, where `T` is a `Number` that also has the right algebra trait (`AdditiveGroup[\T\]`, `StandardMin[\T\]` or `StandardMax[\T\]`). Two walk tests exercise it. In one of them, a helper in `test_library/` declares a program's own overloads of library operator names next to the extension. Walk checks such overloads against the library's only on a cold cache (F-?2), so these tests prove that the overloads pass that check only on a run from an empty cache.

**Conditions:** Under walk, in the interpreter's library. The cache limit holds for `ArrayOperatorsBesideLibrary.fss` and its helper.

**Consequence:** A passing warm-cache run of `ArrayOperatorsBesideLibrary.fss` does not show that the helper's overloads coexist with the extension. To show it, run the test cold (for example `harness-one.sh` with `COLD_CACHE=1`, `tests-running.md`).

**Evidence:** `tests/ArrayScalarExtension.fss`, `ArrayOperatorsBesideLibrary.fss`, the helper `test_library/ArrayOperatorVocabulary`, and F-?2. The detail is in `reviews/library-scalar-extension-review.md`, change 1.

**Could not resolve:**
- "bounded by `Number` with `AdditiveGroup[\T\]`, `StandardMin[\T\]` or `StandardMax[\T\]`": unclear wording. It does not say which operator takes which bound. I infer `+` and `-` take `AdditiveGroup`, `MIN` takes `StandardMin` and `MAX` takes `StandardMax`. `StandardMin`/`StandardMax` are not in the skill.
- `ArrayOperatorsBesideLibrary.fss`: its folder is not given. I assume `tests/`.
- "pairs of library operator names": unclear wording. Read literally, these are pairs of names. From F-?2, I take it to mean two or more declarations of one library operator name.
- "So the tests show that the pairs pass that check only when they run from an empty cache": this can be read two ways. (a) The tests are evidence of passing only when they run cold. (b) The pairs pass only when cold, and so fail warm. Reading (b) contradicts F-?2, where a warm cache skips the check. I take (a). The entry also does not say whether the gate runs these tests cold, that is, whether the gate's green means anything here.
- "F-?2": a placeholder number. It resolves inside this file, but not in FACTS.

## F-?2, "Under walk, a program's declarations of a library operator name are checked ..."

**Established:** Walk's load check of a program's own declarations of a library operator name, against the library's declarations, runs only if the program declares that name at least twice, and only when the component is not already cached. A single such declaration is never checked. Two or more are checked together with the library's, and the check can refuse them next to the library's generic declarations, even when the program's declaration is more specific. Two examples: C4's `opr MAX[\I\](s: RR64, a: Array[\RR64,I\])` (row 341), and the rank-specialised `×` of F-155. Walk writes the component to its cache before it runs this check, and skips the check for a component it loads from the cache. So such a refusal shows on the first, cold run only, and later runs load the program (row 342).

**Conditions:** Under walk. The program must declare two or more of the name, and the cache must be cold for that component. I assume "never again" lasts until the entry goes stale (an edit of a source, or a build that empties the caches).

**Consequence:** A test whose result depends on this check must run from an empty cache. A warm run that passes proves nothing about it. A worker who adds a second overload of a library operator name in a program should expect a possible refusal on the first cold run.

**Evidence:** Rows 341 and 342. `compile-ladder/rung-library-comments/REPORT.md` section 4 records a gated run that hit a warm cache.

**Could not resolve:**
- "checked against the library's": the entry does not say what the check tests. I take it to be walk's load-time overload check (`interpreter.md`, "What walk checks": the No Duplicates, Meet and return-type rules). Unclear wording, but resolvable.
- "even a more specific one": this can be read two ways. Either the check refuses a program declaration that is more specific than the library's generic one (my reading), or the library's generic declarations include a more specific one.
- "C4's pair `opr MAX[\I\](s: RR64, a: Array[\RR64,I\])`": unclear wording. It names a pair but shows one signature. Is the pair two MAX declarations of C4's, with the second not shown (perhaps the other argument order), or this one with the library's? The two-or-more rule suggests the first.
- "the rank-specialised `×` of F-155": F-155 is not in this file. I cannot tell what is specialised by rank. Missing context.
- "a program" and "a component": does the two-or-more count run over the whole program, or within one component? The cache sentence speaks of a component. Unclear wording.
- "a gated run that met a warm cache": a run of one gated test, or of the gate? Minor.

## F-121, "The team's spelling of the tower closure ... stays a comment ..."

**Established:** The team wrote a `comprises` clause for `AnyIntegral` as `comprises Integral[\I\] where [\I\]`. It is still commented out, and the curator has not decided whether it is a valid clause. A different, live form of the closure exists. It stands (P-44) and passes the checker (F-62). The specification allows a type in a `comprises` list to contain a `where`-clause variable, meaning every value of that variable, and the compiled checker handles such variables of kind `nat`, `int` or type (F-146, F-251). No one has measured whether the checker accepts the team's form on `AnyIntegral`. Of the team's commented-out `where` clauses, only `AnyList`'s has been made live (P-151). Whether the others, `AnyIntegral`'s included, should become live is an open question (PLAN, "Climb batch 17, listed for his review", A.skeptic.1). The clause stays commented only by that item's default, which is not a curator decision.

**Conditions:** The interpreter's library, `AnyIntegral`, until the curator rules on A.skeptic.1.

**Consequence:** A worker must not treat the comment as either decided or forbidden. They should not uncomment it as settled work. If their work needs it, it is a decision not taken for the curator, and measuring the checker on that form is still owed.

**Evidence:** P-44, F-62, F-146, F-251, P-151 and the PLAN item. The detail is in `coordinator/process-engineering/facts-slice-2.md`, "Points for the checker", point 1.

**Could not resolve:**
- "tower closure": a record term I lack, and the skill says the numbers are "not a tower". I read it as the `comprises` clause that closes the set of integral types under `AnyIntegral`.
- "The closure as written stands (P-44)": unclear wording. "As written" seems to mean the live clause in the tree, not the team's form, but the entry gives neither its text nor how it differs. Without P-44 and F-62, I cannot say what stands.
- `comprises Integral[\I\] where [\I\]`: the syntax of a `where [\I\]` that introduces a variable inside a `comprises` list is not in the skill. I read it as every instantiation of `Integral`. A concept I lack.
- "the compiled checker opens such variables": unclear wording. "Opens" could mean binds as universally quantified, or instantiates, or accepts.
- `AnyIntegral`, `AnyList`: library traits not in the skill. Inferred.

## F-122, "`round` on a float sends an exact half to the even integer on both paths."

**Established:** `round` rounds a floating value that lies exactly halfway to the even integer, on walk and on the compiled path. NaN gives 0, and a value outside the 64-bit range gives the nearest end of that range. One departure from the specification: a numeral close to a tie (within half an ulp) is first converted to the nearest double and then rounded, so it can round the wrong way compared with the exact rational it denotes (row 360).

**Conditions:** Floats (which widths is not said). Ties are tested on both paths. The compiled NaN and saturation behaviour was observed and read in the code, but no compiled test covers it.

**Consequence:** A worker can rely on round-half-even ties on both paths. They should not rely on the compiled NaN or saturation results as protected by a test, and must not expect a numeral near a tie to round by its exact value.

**Evidence:** `tests/RoundHalfEvenRungR.fss` (walk) and `library_tests/RR64FunctionsRungF.fss` (compiled) for ties. `Math.rint` in `nativeHelpers/simpleDoubleArith.java` and the report's differential for the compiled NaN and saturation. Row 360. The detail is in `compile-ladder/rung-round-half-even/REPORT.md`, "What landed" and "Differentials".

**Could not resolve:**
- "on a float": unclear wording. `RR64` only, or `RR32` too?
- "saturates": the result type of `round` is not given, so "the 64-bit range" (of `ZZ64`?) is inferred. Unclear wording.
- Whether walk's NaN and saturation are covered by `RoundHalfEvenRungR.fss`, or are untested on walk too, is not said. Unclear scope.
- Row 360: which path or paths show it is not said. Unclear scope.

## F-123, "A compiled object with no `asString` of its own prints its bare type name ..."

**Established:** On the compiled path, printing an object that defines no `asString` gives just its type name, as walk does. A Java class that has its own `toString` still uses it. Open defects on the compiled path:
- an object that declares or inherits a Fortress method `toString()` with no arguments overflows the stack when printed (row 321);
- `asDebugString` and `asExprString` give different text from walk (row 363).

A generic object's static arguments also print differently, but there walk is the wrong one. It takes the argument from the run-time class, so `Cell("s")` prints `Cell[\FlatString\]` under walk and `Cell[\String\]` compiled, and the specification gives `Cell[\String\]` (row 364).

**Conditions:** Default printing of objects without `asString`. The `toString` defect applies to a zero-argument Fortress member of that name.

**Consequence:** Do not name a zero-argument Fortress method `toString` in compiled code. Do not compare `asDebugString`/`asExprString` text across the paths. For generic objects, the compiled text is the reference, and a walk difference is walk's defect.

**Evidence:** `compiler_tests/DefaultRenderRungS` and rows 321, 363 and 364. The detail is in `compile-ladder/rung-default-rendering/REPORT.md`, "Defects and their homes".

**Could not resolve:**
- "A Java class with a `toString` of its own": unclear wording. Which Java classes: the run time's value classes (such as `FRR64`), classes bound by `import java`, or the class compiled from a Fortress object?
- "bare type name": this can be read two ways. Without fields and identity, or also without static arguments? The sentence on generic objects shows static arguments printed, so I read the first.
- "print differently from walk's" (row 363): the entry does not say how, or which side is right. "Open on the compiled path" suggests the compiled side is wrong. Unclear wording.

## F-124, "The compiled path's `LSHIFT` and `RSHIFT` on `ZZ32` and `ZZ64` ..."

**Established:** On the compiled path, for `ZZ32` and `ZZ64`:
- `LSHIFT` and `RSHIFT` by a count equal to or larger than the width give 0 or the sign (0 if the value is nonnegative, -1 if negative). A negative count shifts the other way.
- `narrow` keeps the low 32 bits.
- `<<`, `>>` and `<<<` behave as before.
- `asZZ32` throws on a value out of range.
- Negation, absolute value and division check exactly for the minimum value, so `|0|` and `-0` give 0.
- Addition and subtraction detect overflow from the sign bits, and multiplication uses `Math.multiplyExact`, so all three raise on every overflow, and a product with a zero factor gives 0.

Also, `ZZ`'s `<<<` raises a catchable `IntegerOverflow` when the shift cannot be represented (row 386).

**Conditions:** Compiled path, `ZZ32` and `ZZ64` (and `ZZ` for `<<<`). `NN32`/`NN64` are not covered.

**Consequence:** A worker can use `LSHIFT`/`RSHIFT` with any count on the compiled path, and can expect overflow to raise, not wrap, for `+`, `-` and `*`.

**Evidence:** `compiler_tests/IntSemanticsRungB.fss` and row 386. The detail is in `compile-ladder/rung-int-semantics-compiled/REPORT.md` section 1.

**Could not resolve:**
- "give 0 or the sign at or beyond the width": this can be read two ways. Which operator gives which? I read `LSHIFT` gives 0 and `RSHIFT` gives the sign. The sentence allows either operator to give either result.
- `LSHIFT`/`RSHIFT` against `<<`, `>>` and `<<<`: a concept I lack. The skill does not say how they differ. "Unchanged" is a history word: unchanged from what, and what do those three operators do?
- `narrow`: a library function not in the skill. I read it as `ZZ64` to `ZZ32` truncation. A concept I lack.
- "`asZZ32` throws out of range": unclear wording. It does not say what is thrown (a catchable `IntegerOverflow`, or a Java exception?) or from which type.
- "Negation, absolute value and division test for the minimum value, so `|0|` and `-0` answer 0": the "so" does not follow on a plain reading. I read it as meaning the overflow test is exact for the minimum value, so 0 is no longer taken for an overflow. What happens at the minimum (does it raise?) is implied, not stated. Unclear wording.
- "these raise on every overflow": raise what? `Math.multiplyExact` throws a Java `ArithmeticException`. Is it turned into a catchable `IntegerOverflow`? Unclear wording.
- "a zero factor answers 0": why this needs saying is not explained. Minor.
- "a shift that it cannot represent" (`ZZ`'s `<<<`): a count too large, or a result too large? Unclear wording.

## F-125, "Under `walk`, `LSHIFT` and `RSHIFT` on the four fixed widths ..."

**Established:** Under walk, for `ZZ32`, `ZZ64`, `NN32` and `NN64`, `LSHIFT` and `RSHIFT` by a count equal to or larger than the width give 0 or the sign (0 if the value is nonnegative, -1 if negative). A negative count shifts the other way. `ZZ`'s `shift(x, k)` is exactly ⌊x·2^k⌋ for every count, negative counts included. This builds P-69. The compiled path has no `shift` (F-126).

**Conditions:** Under walk. Fixed widths for `LSHIFT`/`RSHIFT`, `ZZ` for `shift`.

**Consequence:** Walk code can shift by any count. Code that uses `shift` will not compile until the compiled path declares it.

**Evidence:** `tests/IntSemanticsRungI.fss`. The detail is in `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4.3 and 4.4.

**Could not resolve:**
- "give 0 or the sign": the same two readings as in F-124 (which operator gives which).
- "the four fixed widths": not named in the entry. I take them from the skill's list (`ZZ32`, `ZZ64`, `NN32`, `NN64`). Resolvable.

## F-?1, "Under walk, `GCD` and `LCM` are nonnegative, `0 LCM 0` is 0, and `CHOOSE` answers 0 ..."

**Established:** Under walk:
- `GCD` and `LCM` always return a nonnegative result, on all four fixed widths and on `ZZ`, and `0 LCM 0` is 0;
- `CHOOSE` gives 0 when `k` is negative or larger than `n`;
- a result that does not fit its type raises `IntegerOverflow` (F-132).

Because `LCM` no longer carries a sign, code that used its sign for a direction must work out the sign itself. The team's `tests/RangePrototype.fss` computes its signed stride as `(a DIV (a GCD b)) DOT b`. The library's ranges did not use that sign.

**Conditions:** Under walk. Fixed widths and `ZZ` for `GCD`/`LCM`. The `CHOOSE` types are not stated.

**Consequence:** Do not take a sign from `LCM`. Compute a signed product from `GCD` as the test does.

**Evidence:** `tests/IntSemanticsRungI.fss` (`GCD`, `LCM`, rows 334 and 385 fixed) and `tests/PowChooseLcmRungE.fss` (`CHOOSE`, row 337 fixed). The detail is in `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4.2 and 7.

**Could not resolve:**
- "A result that its type cannot hold raises `IntegerOverflow`": unclear scope. `GCD` and `LCM` only, or `CHOOSE` too? Which results (for example, `GCD` involving the minimum value)? F-132 is not in this file.
- "the old `LCM`", "now computes": history words. The old behaviour (presumably a signed `LCM`) is not described. Unclear wording.
- `DOT`: an operator not in the skill. I read it as multiplication (`·`). A concept I lack.
- `CHOOSE`: its operand order (`n CHOOSE k`?) and types are not given. Minor.
- "F-?1": a placeholder number.

## F-128, "Under `walk`, the interpreter converts by coercion at its three kinds of type check."

**Established:** Walk applies a coercion at three kinds of run-time type check:
- binding an argument to a parameter, varargs included;
- an overloaded call that fits no declaration without coercion, after which walk dispatches again;
- a typed binding or assignment.

It picks the coercion from the run-time value (P-59). Measured as not converted: a declared return type (row 387), a `coerce` that has its own static parameter (row 513), and an overloaded function's tuple parameter or a field of tuple type (row 395). The specification's tuple and arrow coercion to varargs, keyword and arrow targets is neither built nor measured.

**Conditions:** Under walk only.

**Consequence:** A worker can rely on coercion at those three places under walk. They must not expect it at a return, through a generic `coerce`, or into tuple parameters or fields. The specification's tuple and arrow coercions are owed.

**Evidence:** `tests/Coercion*RungC.fss` and rows 387, 513 and 395. The detail is in `compile-ladder/rung-interp-coercion/REPORT.md` sections 1, 5 and 9.

**Could not resolve:**
- "the specification's varargs, keyword and arrow targets of tuple and arrow coercion": the specification's tuple and arrow coercion is a concept I lack, and the phrase groups two ways. Either all three kinds of target belong to both coercions, or varargs and keyword targets belong to tuple coercion and arrow targets to arrow coercion.
- "Not built and not measured": unclear wording. If nothing was measured, the entry does not say how "not built" is known (read in the code?).
- "a parameter" against "an overloaded call": does the first kind cover only calls of a single declaration? Minor.

## F-129, "A size is carried at run time as a descriptor from `RTTIsize.of` ..."

**Established:** On the compiled path, each size value (such as the 3 in `Vec[\3\]`) is a single run-time descriptor from `RTTIsize.of`. In a run-time subtype test, a size descriptor is a supertype only of an equal size. A size used as a value becomes a constant that the class loader replaces with the numeral. Closures and tasks capture a size as a free static parameter (F-135). So a program whose sizes are all known at compile time loads, dispatches and runs compiled (this builds P-41). A size computed from a run-time number does not work: `tests/NatReflectTest.fss` stops at load (row 307). Other open compiled defects:
- a `ZZ32Vector` passed to a generic constructor fails at load (row 408);
- a size with no `extends` gets bound `Object`, not `Any` (row 412);
- an overload arm whose static parameter has a concrete generic bound fails (row 413);
- an object extending two instantiations of one trait, one of them at a static parameter, passes the checker and dies at load (row 414).

Row 416 is walk's defect: walk's overloading check does not use the exclusion of instantiations, and the compiled run gives the right answer.

**Conditions:** Compiled path, sizes known at compile time.

**Consequence:** Compiled programs can use compile-time sizes, but not sizes from run-time numbers or the listed patterns. On row 416, the compiled behaviour is the reference.

**Evidence:** `compiler_tests/NatRt*` and rows 307, 408, 412, 413, 414 and 416. The detail is in `compile-ladder/rung-size-runtime/REPORT.md` sections 1 and 9.

**Could not resolve:**
- "a size with no `extends` clause gets the bound `Object`": this can be read two ways. A size parameter (`nat`/`int`) has no `extends` clause in the skill. `compiler.md` gives row 412 as an unbounded type parameter bounded by `Object`. Does this mean a size parameter or a type parameter?
- "a dispatched overload arm whose static parameter has a concrete generic bound fails": unclear wording. "Concrete generic bound" (such as `T extends List[\ZZ32\]`?) is not defined, and "fails" does not say at compile, load or run.
- Row 416: the entry does not say what program or answer is meant, or whether walk refuses at load or dispatches wrongly. Unclear wording.

## F-130, "The specification's wrapping operators ∔, ∸ and ⨰ are declared in the interpreter's library ..."

**Established:** The interpreter's library declares the wrapping operators ∔, ∸ and ⨰ (this builds P-73), and the library code and team tests that meant to wrap use them. In the compiler's prelude, ∔ and ∸ saturate instead of wrapping (row 348). One library use is wrong: `Random`'s `LinearCongruential` computes `(mult DOTTIMES widen(state)) DOTPLUS add` and only then takes `MOD modulus`. So it first wraps at the width of its type `N`, which is right only if the modulus divides 2^width. A modulus that is not a power of two gives wrong numbers (row 700). Today the library uses it only with modulus 2^48, so today's output is right.

**Conditions:** Interpreter's library. The prelude's saturation lasts until the switch-over. The `LinearCongruential` defect is latent unless another modulus is used.

**Consequence:** Use ∔, ∸ and ⨰ for wrapping. Do not expect them to wrap on the compiled path yet. Do not build `LinearCongruential` with a modulus that is not a power of two (or does not divide 2^width).

**Evidence:** `tests/WrapOperatorsRungD.fss` and rows 348 and 700. The detail is in `compile-ladder/rung-wrap-operators/REPORT.md` section 2, and the operators' users are in `reviews/wrap-dependent-code.md`.

**Could not resolve:**
- "The compiler prelude spells ∔ and ∸ as saturating": unclear wording. "Spells" seems to mean defines. It does not say what the prelude does with ⨰ (absent, or wrapping?).
- `widen`: a library function not in the skill. I read it as conversion to a wider type. Minor.
- "a modulus that is not a power of two": a power of two above 2^width would also be wrong, by the rule just given. Minor.

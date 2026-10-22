<!-- The FACTS clarity pass, chunk f11, 2026-10-22, second round: F-118, F-119, F-121 to F-125 and F-128 to F-130 rewritten from the chunk's assessment, the cold read and the check, with two new entries split out of F-119 and F-125, each with its changes of meaning, the source of each sentence, and the points for the coordinator. -->

# FACTS chunk f11: the rewrite

The base is `main` at `4caa90c81`, as in `assessment.md`. The assessment keeps F-120 and F-126, so this file holds the other ten: eight "reword" and two "reorganize" (F-119, F-125). The two reorganizations add two entries, written `F-?1` and `F-?2` as `record.py apply` expects. The second round follows `check.md` and `cold-read.md`: each point of fidelity is fixed from the source that `check.md` names, and each ambiguous reading is reworded. Concepts that the entries use and that every worker needs are in `concepts.md`.

## Points for the coordinator

- **New entries.** `F-?1` (walk's `GCD`, `LCM` and `CHOOSE`, out of F-125) goes under "Landed semantics", after F-125. `F-?2` (walk's check of a program's declarations of a library operator name, rows 341 and 342, out of F-119) goes under "Execution model", beside F-29, walk's other check at load. Its alternative home is F-155, which holds another case of the same check; I did not edit F-155, which is outside this chunk.
- **The assessment's proposed sentence for F-119 is wrong in one point.** It proposed "a program's own pair of these operators next to the block is refused on a cold cache and passes on a warm one". `rung-library-comments/REPORT.md` section 4 and commit `02d09a39f` say that the fixture's overloads pass cold with the extension. So F-119 says that a pass shows they coexist only if the run was cold.
- **F-118's walk clause was stale in the first round.** The check measured the report's probe again on 2026-10-22: walk now stops at `x + x` with `IntegerOverflow` (since `917bb7b32`, F-132), not with the type error that the report captured on 2026-09-19.
- **F-20 repeats F-129's old claim.** F-20 says "a sized program loads and runs compiled (F-129)". F-129 now limits that to sizes known at compile time (row 307), apart from the open cases. F-20 should follow.
- **P-44 says "whose `where` form is not built".** F-251 says the opening of a type `where`-clause variable is built. This is for the POSITIONS pass, as the assessment says.
- **Titles quoted by live files.** `coordinator/CLIMB-BATCH-N.md` quotes "A numeral's value reaches the compiled world intact" (lines 1214 and 1478), and older briefs quote "A size is carried at run time as a descriptor" and "Under walk, the interpreter converts by coercion". These openings are kept. The titles of F-124 and F-125 changed from "give 0 or the sign" to name the operator of each answer.

## F-118

> - F-118 **A numeral's value reaches the compiled world intact, but the compiled path still prints a large unsigned value wrongly and cannot compare a numeral beyond `ZZ64` with another numeral.** The code generator carries a numeral as an `int`, a `long` or its decimal string, by its exact bit length. So on the compiled path `4294967295` and `18446744073709551615` keep their values, as walk does at `ZZ` and `ZZ64` (walk refuses a numeral bound to `NN32` or `NN64`, F-57). The compiled path prints an `NN32` or `NN64` value above its type's signed half as negative (gap-ledger row 326). It compares two `IntLiteral`s at `ZZ64`, so `a = 18446744073709551615` then `a < 5` fails with `Not in range for ZZ64` (row 328). Neither row has a test. An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it. Walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132). Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

Meaning: one correction of scope, from the assessment. Row 328's comparison is a second limit beside row 326's printing; the title now names both. The title says one numeral beyond `ZZ64` is enough, since the comparisons convert both sides. The arithmetic sentence is said as a probe's observation that no test gates. Walk's answer to that probe is today's, from the check's run, not the report's capture of 2026-09-19. "As walk does" is limited to `ZZ` and `ZZ64`.

Sources: `CodeGen.java:3889-3917`; `IntLiteralWrapRepairR2.fss:28-59`; rows 326 and 328 (reproducer `none`); `LibraryBuiltin/CompilerBuiltin.fss:912-917` (`asZZ64` in the six comparisons); the report's section and probe `probes/skeptic/s3`; `check.md`, F-118, the run `s3now.out` (`IntegerOverflow`); F-57; F-132.

## F-119

> - F-119 **The library's scalar extension is eight generic declarations: `+`, `-`, `MIN` and `MAX` between an `Array[\T,I\]` and a scalar `T`, in both orders.** `T` is bounded by `Number` and `AdditiveGroup[\T\]` for `+` and `-`, by `Number` and `StandardMin[\T\]` for `MIN`, and by `Number` and `StandardMax[\T\]` for `MAX`. Gated by `tests/ArrayScalarExtension.fss` and `tests/ArrayOperatorsBesideLibrary.fss`. The second imports the fixture `test_library/ArrayOperatorVocabulary`, which declares two overloads each of `MINMAX`, `+` and juxtaposition over the library's arrays. Walk checks such overloads against the library's only on a cold cache (F-?2). So a pass of that test shows that they coexist with the library only if the run started from an empty cache. Detail: `reviews/library-scalar-extension-review.md`, change 1.

Meaning: unchanged. Reorganized: walk's rule for rows 341 and 342 moved to F-?2, which owns it. "Gated from an empty cache" is said as a condition on the run, not a property of the suite: `rung-library-comments/REPORT.md` section 4 records a gated run that met a warm cache.

Sources: `Library/FortressLibrary.fss:4906-4915`, `.fsi:2702-2711`; the two tests and the fixture (`test_library/ArrayOperatorVocabulary.fsi:3-10`); the report's section 4; commit `02d09a39f`.

## F-?2 (new, from F-119)

> - F-?2 **Under walk, a program's declarations of a library operator name are checked against the library's only when the program declares two or more of that name, and only on a cold cache.** One such declaration is not checked. Two or more are checked with the library's declarations, and the check can refuse them beside the library's generic declarations, even where they are more specific than the library's. It refused C4's former pair of `MAX` between an `RR64` and an `Array[\RR64,I\]`, in both orders, which C4 dropped when F-119's scalar extension took its place (gap-ledger row 341). It refuses the `Matrix`-specialised elementwise `×` of `apl/mg/elemwise_nat_probe.fss` (F-155). Walk writes a component to its cache before it runs this check, and skips the check on a component that it reads back. So a refusal appears once, on a cold cache, and never again (row 342). The check runs only when walk analyses the library itself again: deleting the program's own cache entries does not bring it back (row 342). So a test that depends on this check must run from an empty cache. Detail: rows 341 and 342; `compile-ladder/rung-library-comments/REPORT.md` section 4, a gated run that met a warm cache.

Meaning: no new claim. The first two sentences are F-119's two sentences on walk. C4's pair is said as former, as row 341's notes say. The condition on the library's cache entry is row 342's notes, which the first round dropped.

Sources: F-119's old text; row 341 and its history text (the two orders); row 342 and its notes ("The suppressor is the library's `interpreter_parsed_cache/FortressLibrary*` entry"); `run-c4/cold-cache/CAPTURES.md`, ablations A to C; F-155; the report's section 4.

The first round's question for the curator, whether the conditions "behind an api" and "in a component that only exports it" should come back, is withdrawn. `run-c4/cold-cache/CAPTURES.md` measured one declaration and two declarations, both in the program's own component and behind an api. Those are the two places where a program can declare an operator, so the wider wording holds.

## F-121

> - F-121 **The team's spelling of `AnyIntegral`'s `comprises` clause, `comprises Integral[\I\] where [\I\]`, stays a comment, and no decision says whether it is a valid clause.** The live clause, which lists `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64`, stands (P-44), and the compiled checker accepts it (F-62). The specification lets a listed type hold a `where`-clause variable, at every value of it, and the compiled checker opens such variables, of a `nat`, an `int` or a type (F-146, F-251). Whether the checker accepts the team's spelling on `AnyIntegral` is not measured. Of the team's commented `comprises ... where` clauses, P-151 builds only `AnyList`'s. The comment stays by P-44, which kept it beside the live clause when its `where` form was not built. Whether it becomes live now that the checker opens such variables is an open question in PLAN, "Climb batch 17, listed for his review", item A.skeptic.1, whose default leaves it. Detail: `coordinator/process-engineering/facts-slice-2.md`, "Points for the checker", point 1.

Meaning: unchanged. The first round said that the comment stays by a PLAN default, which is not a ruling. That was wrong: P-44, the curator's decision of 2026-09-21, keeps the comment. The PLAN item asks a later question. "Tower closure", a record handle, is replaced by the clause it names. P-151's scope is limited to `comprises ... where` clauses.

Sources: P-44 and the curator's message of 2026-09-21 (quoted in `check.md`); F-62; `Library/FortressLibrary.fss:677`, `:683`; `Specification/basic/traits.tex:236-246`; F-146, F-251; `facts-slice-2.md` point 1; P-151; `PLAN.md:457`.

## F-122

> - F-122 **`round` on an `RR64` or an `RR32` sends an exact half to the even integer on both paths.** NaN gives 0, and a value beyond the `ZZ64` range saturates to the `ZZ64` bounds. On both paths, a numeral within half an ulp of a tie is rounded as its nearest double, not as the rational that it denotes, against the specification (gap-ledger row 360). The ties are gated under walk by `tests/RoundHalfEvenRungR.fss`, and on the compiled path, for `RR64`, by `library_tests/RR64FunctionsRungF.fss`; the compiled `RR32` ties were observed in a probe of the report. NaN and saturation are gated on neither path: they were observed in the report's walk probe and compiled differential, and read in the code (`(long) Math.rint` in `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:132-134`). Detail: `compile-ladder/rung-round-half-even/REPORT.md`, "What landed" and "Differentials".

Meaning: unchanged. The first round implied that walk's NaN and saturation are gated; no test of either path asserts them. The compiled gate covers `RR64` only.

Sources: `RoundHalfEvenRungR.fss` (ties of `RR64` and `RR32`, no NaN); `RR64FunctionsRungF.fss:84-92`; the report's "The recorded failure and the recorded pass", "What landed", and "Differentials", item 2 (`SkRoundComp.txt:15-17`); `interpreter/glue/prim/Float.java:384`, `RR32.java:326`; `nativeHelpers/simpleDoubleArith.java:132-134`; row 360.

## F-123

> - F-123 **A compiled object with no `asString` of its own prints its bare type name, as walk does.** A value whose run-time Java class declares its own `toString`, such as the compiled `RR32`'s, prints by it. Open on the compiled path: an object that declares or inherits a zero-argument Fortress member named `toString` overflows the stack when it is printed (gap-ledger row 321), and `asDebugString` and `asExprString` print differently from walk's, where the specification is silent (row 363). For a string static argument walk is the one that is wrong: it takes the argument from the run-time class, so `Cell("s")` prints `Cell[\FlatString\]`, where the compiled `Cell[\String\]` is the specification's answer (row 364). For a numeral argument neither path gives the specification's type. Gated by `compiler_tests/DefaultRenderRungS`. Detail: `compile-ladder/rung-default-rendering/REPORT.md`, "Defects and their homes".

Meaning: unchanged. The first round generalised row 364 from the string case to every static argument; the row asserts only the string case, and the report's item 7 says that neither path gives a numeral's type.

Sources: rows 321, 363 and 364; the report's "Defects and their homes" (items 4 and 7) and "The repair round"; `stringOps.java:75-86`; P-91.

## F-124

> - F-124 **On the compiled path, at or beyond the width of `ZZ32` or `ZZ64`, `LSHIFT` gives 0 and `RSHIFT` the sign; both reverse on a negative count, and `narrow` keeps the low 32 bits.** "The sign" is 0 for a nonnegative value and -1 for a negative one. `ZZ64`'s and `NN64`'s `narrow` to 32 bits keeps the low 32 bits. `<<`, `>>` and `<<<` keep their own rules, and `asZZ32` throws out of range. Negation, absolute value and division overflow only at the minimum value and test exactly for it, so the minimum raises `IntegerOverflow`, and `|0|`, `-0` and `0 DIV -1` answer 0. Addition and subtraction test the sign bits, and multiplication computes the exact product (`Math.multiplyExact` on `ZZ64`, a range-checked 64-bit product on `ZZ32`). So these raise `IntegerOverflow` on every overflow, and a zero factor answers 0. `ZZ`'s `<<<` raises a catchable `IntegerOverflow` on a shift that it cannot represent (row 386). Gated by `compiler_tests/IntSemanticsRungB.fss`, and for addition and subtraction by the team's `library_tests/Integer3.fss`. Detail: `compile-ladder/rung-int-semantics-compiled/REPORT.md` section 1.

Meaning: one correction of scope, from the assessment. "The overflow checks fire only at the minimum" held for three checks only; addition, subtraction and multiplication catch every overflow. The second round corrects multiplication on `ZZ32`, which does not use `Math.multiplyExact`, and names the test that gates addition and subtraction.

Sources: `nativeHelpers/simpleLongArith.java:58-92`; `simpleIntArith.java:62-97`; the report's section 1, items (a), (c) and (d); P-69 for "the sign"; `IntSemanticsRungB.fss:45-120`, `:147-148`; `library_tests/Integer3.fss:97-104`; row 386.

## F-125

> - F-125 **Under `walk`, at or beyond the width of `ZZ32`, `ZZ64`, `NN32` or `NN64`, `LSHIFT` gives 0 and `RSHIFT` the sign; both reverse on a negative count, and `ZZ`'s `shift` computes ⌊x·2^k⌋.** It builds P-69. "The sign" is 0 for a nonnegative value and -1 for a negative one. `ZZ`'s `shift(x, k)` is ⌊x·2^k⌋. It raises a catchable `IntegerOverflow` on a positive count beyond 2^31 - 1, or on a result that the JVM's `BigInteger` cannot hold. The compiled path declares no `shift` (F-126). Gated by `tests/IntSemanticsRungI.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4.3 and 4.4.

Meaning: unchanged. Reorganized: the signs of `GCD` and `LCM` and the `CHOOSE` answer moved to F-?1. "Overflow raises (F-132)" left: it is F-132's subject, and it is not about shifts. "The compiler prelude has no `shift` (row 383)" became a pointer to F-126, which owns it. The first round's "at any count" was P-69's design, stronger than what is built; the raise is now said.

Sources: P-69; the report's sections 4.3 and 4.4 (`BigNum.java:246-247`); `IntSemanticsRungI.fss:97-99`; F-126.

## F-?1 (new, from F-125)

> - F-?1 **Under walk, `GCD` and `LCM` are nonnegative, `0 LCM 0` is 0, and `n CHOOSE k` answers 0 for `k < 0` or `k > n`.** `GCD` and `LCM` hold this on the four fixed widths and on `ZZ`. A `GCD`, `LCM` or `CHOOSE` result that its type cannot hold, such as a fixed width's `MIN GCD 0`, raises `IntegerOverflow` (F-132). `LCM` carries no sign, so code that takes a direction from it must compute the sign itself. The team's `tests/RangePrototype.fss` does so with `(a DIV (a GCD b)) DOT b`, `DOT` being multiplication. The library's ranges do not depend on that sign. Gated by `tests/IntSemanticsRungI.fss` for `GCD` and `LCM` (rows 334 and 385, fixed), and by `tests/PowChooseLcmRungE.fss` for `CHOOSE` (row 337, fixed). Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4.2 and 7.

Meaning: no new claim, and one correction of evidence, from the assessment: `CHOOSE` is gated by `PowChooseLcmRungE.fss:70-72`, not by `IntSemanticsRungI.fss`, and is not in the cited sections. The history words "the old `LCM`" and "now computes" moved to the note line.

Sources: F-125's old text; the report's section 4.2 (the fixed widths, and `BigNum$Lcm` for `ZZ`) and section 7 ("The library does not depend on the sign"); `IntSemanticsRungI.fss:112-159` (`:123`, `MIN GCD 0`); `PowChooseLcmRungE.fss:66-72`; rows 334, 385 and 337; F-132.

## F-128

> - F-128 **Under `walk`, the interpreter converts by coercion at its three kinds of type check.** They are a parameter, a varargs parameter included; an overloaded call that no declaration fits without coercion, which walk then dispatches again; and a typed binding or assignment. Walk chooses the coercion by the run-time value (P-59). Not converted, as measured: a declared return (gap-ledger row 387), a coercion with its own static parameter (row 513), and an overloaded function's tuple parameter or a tuple-typed field (row 395). Not converted, by the code, and not measured: a varargs or keyword element of the specification's tuple coercion, and its arrow coercion. Gated by `tests/Coercion*RungC.fss`. Detail: `compile-ladder/rung-interp-coercion/REPORT.md` sections 1, 5 and 9.

Meaning: one correction of scope, from the assessment. Walk converts a varargs parameter (`CoercionCallRungC.fss:39-41`). The three limits are grouped as the specification groups them: varargs and keyword elements are conditions of tuple coercion, and arrow coercion is a rule of its own. "By the code" says how the report knows them.

Sources: the report's section 1 (the list of parameters; "a varargs element ... stays the loud error it was"), section 5 ("Tuple-typed targets"), section 11; `Specification/basic/conversions-coercions.tex`, "Coercions for Tuple and Arrow Types"; rows 387, 513 and 395; P-59.

## F-129

> - F-129 **A size is carried at run time as a descriptor from `RTTIsize.of`, and a program whose sizes are known at compile time loads, dispatches and runs compiled, apart from the open cases below.** It builds P-41. Each size value, such as the 3 of `Vec[\3\]`, has one descriptor; in a run-time subtype test, it is a supertype only of an equal size. A size read as a value is a constant that the class loader replaces by the numeral. Closures and tasks capture a size as a free static parameter (F-135). A size made from a number known only at run time does not run compiled: `tests/NatReflectTest.fss` stops at load (gap-ledger row 307). Gated by `compiler_tests/NatRt*`. Also open on the compiled path: a `ZZ32Vector` passed to a generic constructor fails at load (row 408); the compiled path gives every static parameter with no `extends` clause, a size among them, the bound `Object`, not the specification's `Any` (row 412); a dispatched overload arm whose static parameter has a concrete generic bound stops the compile in its sized form and dies at load in its type form (row 413); an object that extends two instantiations of one trait, one at a static parameter, passes the checker and dies at load (row 414). Row 416 is walk's defect: walk refuses at load `g(b: Tg[\3\])` beside `g(b: Tg[\4\])`, which the compiled run dispatches, since walk's overloading check applies no exclusion of instantiations. Detail: `compile-ladder/rung-size-runtime/REPORT.md` sections 1 and 9.

Meaning: one correction of scope, from the assessment: the claim is limited to sizes known at compile time, with row 307, as F-36 and F-146 say. The title now says the open cases limit it too. Row 412 covers every static parameter, sizes among them.

Sources: P-41 ("Each size value ... has one descriptor"); the report's sections 1 and 9; rows 307, 408, 412, 413, 414 and 416; F-36, F-146, F-135.

## F-130

> - F-130 **The specification's wrapping operators ∔, ∸ and ⨰ are declared in the interpreter's library, and the library bodies and team tests that meant to wrap use them.** It builds P-73. The compiler prelude's ∔ and ∸ saturate, and it declares no ⨰ (gap-ledger row 348). One library body uses the operators where wrapping is wrong, by reading, not run (row 700). `Random`'s `LinearCongruential` computes `(mult DOTTIMES widen(state)) DOTPLUS add` and only then takes `MOD modulus`. So it agrees with the true state only where no step overflows or where the modulus divides 2^width of its type `N`. The library builds it only with the modulus 2^48, where it is right. Gated by `tests/WrapOperatorsRungD.fss`. Detail: `compile-ladder/rung-wrap-operators/REPORT.md` section 2; their users, `reviews/wrap-dependent-code.md`.

Meaning: unchanged. Row 700's two conditions and its kind of evidence are said, as the row's notes give them. The first round dropped the condition "no step overflows" and widened "divides 2^width" to "a power of two".

Sources: `Library/Random.fss:235`, `:241`; row 700 and its notes; row 348; `LibraryBuiltin/CompilerBuiltin.fss:599`, `:684`.

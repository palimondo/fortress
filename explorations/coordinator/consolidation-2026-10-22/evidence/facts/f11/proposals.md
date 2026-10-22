<!-- The FACTS clarity pass, chunk f11, 2026-10-22: F-118, F-119, F-121 to F-125 and F-128 to F-130 rewritten from the chunk's assessment, with two new entries split out of F-119 and F-125, each with its changes of meaning, the source of each sentence, and the points for the coordinator. -->

# FACTS chunk f11: the rewrite

The base is `main` at `4caa90c81`, as in `assessment.md`. The assessment keeps F-120 and F-126, so this file holds the other ten: eight "reword" and two "reorganize" (F-119, F-125). The two reorganizations add two entries, written `F-?1` and `F-?2` as `record.py apply` expects. I read each corrected claim again in the code, the ledger, the tests or the cited report. Concepts that the entries use and that every worker needs are in `concepts.md`.

## Points for the coordinator

- **New entries.** `F-?1` (walk's `GCD`, `LCM` and `CHOOSE`, out of F-125) goes under "Landed semantics", after F-125. `F-?2` (walk's check of a program's declarations of a library operator name, rows 341 and 342, out of F-119) goes under "Execution model", beside F-29, walk's other check at load. Its alternative home is F-155, which holds another case of the same check; I did not edit F-155, which is outside this chunk.
- **The assessment's proposed sentence for F-119 is wrong in one point.** It proposed "a program's own pair of these operators next to the block is refused on a cold cache and passes on a warm one". The test `ArrayOperatorsBesideLibrary.fss` passes, cold, with its fixture's pairs beside the extension; the history's text of 2026-10-13 18:55Z says the fixture's two declarations are there to exercise the check. So the pairs pass the check, they are not refused. The new F-119 says that the tests exercise the check only from an empty cache.
- **F-20 repeats F-129's old claim.** F-20 says "a sized program loads and runs compiled (F-129)". F-129 now limits that to sizes known at compile time (row 307). F-20 should follow.
- **P-44 says "whose `where` form is not built".** F-251 says the opening of a type `where`-clause variable is built. This is for the POSITIONS pass, as the assessment says.
- **Titles quoted by live files.** `coordinator/CLIMB-BATCH-N.md` quotes "A numeral's value reaches the compiled world intact" (lines 1214 and 1478), and older briefs quote "A size is carried at run time as a descriptor" and "Under walk, the interpreter converts by coercion". These openings are kept.

## F-118

> - F-118 **A numeral's value reaches the compiled world intact, but the compiled path still prints a large unsigned value wrongly and cannot compare two numerals beyond `ZZ64`.** The code generator chooses a numeral's representation by its exact bit length, so `4294967295` and `18446744073709551615` keep their values, as under walk. The compiled path prints an `NN32` or `NN64` above its type's signed half as negative (gap-ledger row 326). It compares two `IntLiteral`s at `ZZ64`, so `a = 18446744073709551615` then `a < 5` fails with `Not in range for ZZ64` (row 328). An `IntLiteral` arithmetic result of 64 bits or more also keeps its value compiled: observed in the report's probe, and no test gates it; walk refuses the same program with a type error. Gated, for the numerals at `ZZ`, `ZZ64`, `NN32` and `NN64`, by `compiler_tests/IntLiteralWrapRepairR2`. Detail: `compile-ladder/repair-r2-literal-wrap/REPORT.md`, "The failure-mode question".

Meaning: one correction of scope, from the assessment. Row 328's comparison is a second limit beside row 326's printing; the title now names both. The arithmetic sentence is now said as a probe's observation that no test gates, and "as under walk" no longer reaches it.

Sources: `CodeGen.java:3892-3894`; `IntLiteralWrapRepairR2.fss:28-59`; rows 326 and 328; `LibraryBuiltin/CompilerBuiltin.fss:912-917` (`asZZ64` in the six comparisons); the report's section, probe `probes/skeptic/s3`, and walk's "RHS expression type Long is not assignable to LHS type NN64"; `nativeHelpers/simpleIntLiteralArith.java:19-22`.

## F-119

> - F-119 **The library's scalar extension is eight generic declarations: `+`, `-`, `MIN` and `MAX` between an `Array[\T,I\]` and a scalar `T`, in both orders.** `T` is bounded by `Number` with `AdditiveGroup[\T\]`, `StandardMin[\T\]` or `StandardMax[\T\]`. Its tests are `tests/ArrayScalarExtension.fss` and `ArrayOperatorsBesideLibrary.fss`, whose fixture `test_library/ArrayOperatorVocabulary` declares pairs of library operator names beside the extension. Walk checks such pairs against the library's declarations only on a cold cache (F-?2). So the tests show that the pairs pass that check only when they run from an empty cache. Detail: `reviews/library-scalar-extension-review.md`, change 1.

Meaning: unchanged. Reorganized: walk's rule for rows 341 and 342 moved to F-?2, which owns it. "Gated from an empty cache" is now said as a condition on the run, not a property of the suite: `rung-library-comments/REPORT.md` section 4 records a gated run that met a warm cache and "said nothing about the clause".

Sources: `Library/FortressLibrary.fss:4906-4915`, `.fsi:2702-2711`; the two tests and the fixture (`ArrayOperatorsBesideLibrary.fss` uses `MINMAX` and `+` between a matrix and an `Array3`, both orders); the history's text of 2026-10-13 18:55Z.

## F-?2 (new, from F-119)

> - F-?2 **Under walk, a program's declarations of a library operator name are checked against the library's only when the program declares two or more of that name, and only on a cold cache.** One such declaration is not checked. Two or more are checked with the library's declarations, and the check can refuse them beside the library's generic declarations, even a more specific one: C4's pair `opr MAX[\I\](s: RR64, a: Array[\RR64,I\])` (gap-ledger row 341), and the rank-specialised `×` of F-155. Walk writes a component to its cache before it runs this check, and skips the check on a component that it reads back, so a refusal appears once, on a cold cache, and never again (row 342). So a test that depends on this check must run from an empty cache. Detail: rows 341 and 342; `compile-ladder/rung-library-comments/REPORT.md` section 4, a gated run that met a warm cache.

Meaning: no new claim. The first two sentences are F-119's two sentences on walk, with the noun put back ("two or more declarations of that name") and row 341's effect named. The cache mechanism is row 342's text. The last sentence draws the consequence that F-119's "gated from an empty cache" stated.

Sources: F-119's old text; rows 341 and 342; F-155 ("The rank-specialised `×` ... is refused beside the library's `MultiplicativeRing.×` (row 341)"); the report's section 4.

Question for the curator: the old F-119 text of 2026-10-13 18:55Z limited the unchecked single declaration to one "behind an api" or "in a component that only exports it". The consolidation cut those two conditions. I kept the current, wider wording, as the brief asks where the sources leave the meaning open. Should the narrower conditions come back?

## F-121

> - F-121 **The team's spelling of the tower closure, `comprises Integral[\I\] where [\I\]`, stays a comment, and no decision says whether it is a valid clause.** The closure as written stands (P-44) and checks (F-62). The specification lets a listed type hold a `where`-clause variable, at every value of it, and the compiled checker opens such variables, of a `nat`, an `int` or a type (F-146, F-251). Whether the checker accepts this spelling on `AnyIntegral` is not measured. P-151 builds, of the team's commented `where` clauses, only `AnyList`'s. Whether the others become live, `AnyIntegral`'s among them, is an open question in PLAN, "Climb batch 17, listed for his review", item A.skeptic.1; the comment stays by that item's default, which is not a ruling. Detail: `coordinator/process-engineering/facts-slice-2.md`, "Points for the checker", point 1.

Meaning: unchanged; two facts from the sources added that keep the reader from a wrong conclusion. "Not measured" is the cited source's own words. The PLAN item and its default ("none touched, P-151 naming `AnyList`'s comment only") say why the comment stays. The pointer to `rung-library-comments/REPORT.md` section 4 moved to the note line: its reading, "the grammar has no way to say so", is older than the specification's revision.

Sources: P-44, F-62; `Specification/basic/traits.tex:236-246`; F-146, F-251; `facts-slice-2.md` point 1; P-151; `PLAN.md:457`.

## F-122

> - F-122 **`round` on a float sends an exact half to the even integer on both paths.** NaN gives 0, and a value beyond the 64-bit range saturates. A numeral within half an ulp of a tie is rounded as its nearest double, not as the rational that it denotes, against the specification (gap-ledger row 360). The ties are gated under walk by `tests/RoundHalfEvenRungR.fss`, and on the compiled path by `library_tests/RR64FunctionsRungF.fss`. The compiled NaN and saturation are observed in the report's differential and read in the code (`Math.rint` in `nativeHelpers/simpleDoubleArith.java`); no compiled test gates them. Detail: `compile-ladder/rung-round-half-even/REPORT.md`, "What landed" and "Differentials".

Meaning: unchanged. The gate of each path is named, and the kind of evidence for the compiled edge values. Row 360 is said as a departure from the specification, as the row's class ("library gap vs spec") says.

Sources: `RR64FunctionsRungF.fss:87-90`; `simpleDoubleArith.java:132-134` (`(long) Math.rint(a)`); `interpreter/glue/prim/Float.java:384`, `RR32.java:326`; the report's "Differentials", item 2 (`probes/RoundHalfEvenCompiledProbe.txt`); row 360.

## F-123

> - F-123 **A compiled object with no `asString` of its own prints its bare type name, as walk does.** A Java class with a `toString` of its own keeps it. Open on the compiled path: an object that declares or inherits a zero-argument Fortress member named `toString` overflows the stack when it is printed (gap-ledger row 321), and `asDebugString` and `asExprString` print differently from walk's (row 363). A generic object's static arguments also print differently, but there walk is wrong: it takes the argument from the run-time class, so `Cell("s")` prints `Cell[\FlatString\]`, where the compiled `Cell[\String\]` is the specification's answer (row 364). Gated by `compiler_tests/DefaultRenderRungS`. Detail: `compile-ladder/rung-default-rendering/REPORT.md`, "Defects and their homes".

Meaning: unchanged; two scopes restored from the rows. Row 321 covers an inherited member too, the case that P-91 needs after the switch-over. Row 364 is classed "implementation gap (walk)".

Sources: rows 321, 363 and 364; the report's "Defects and their homes" (item 7); P-91.

## F-124

> - F-124 **The compiled path's `LSHIFT` and `RSHIFT` on `ZZ32` and `ZZ64` give 0 or the sign at or beyond the width and reverse on a negative count, and `narrow` keeps the low 32 bits.** "The sign" is 0 for a nonnegative value and -1 for a negative one. `<<`, `>>` and `<<<` are unchanged, and `asZZ32` throws out of range. Negation, absolute value and division test for the minimum value, so `|0|` and `-0` answer 0. Addition and subtraction test the sign bits, and multiplication uses `Math.multiplyExact`, so these raise on every overflow, and a zero factor answers 0. `ZZ`'s `<<<` raises a catchable `IntegerOverflow` on a shift that it cannot represent (row 386). Gated by `compiler_tests/IntSemanticsRungB.fss`. Detail: `compile-ladder/rung-int-semantics-compiled/REPORT.md` section 1.

Meaning: one correction of scope, from the assessment. "The overflow checks fire only at the minimum" held for three checks only; addition, subtraction and multiplication catch every overflow. The pointer "where walk differs, section 9" is dropped: walk's shifts, `narrow` and overflow were brought to the compiled answers since (F-125, F-132).

Sources: `nativeHelpers/simpleLongArith.java:58-92` (and `simpleIntArith.java`, the same shapes); the report's section 1, item (c); P-69 for "the sign"; `IntSemanticsRungB.fss:45-84`, `:147-148`; row 386.

## F-125

> - F-125 **Under `walk`, `LSHIFT` and `RSHIFT` on the four fixed widths give 0 or the sign at or beyond the width and reverse on a negative count, and `ZZ`'s `shift` is exact.** It builds P-69. "The sign" is 0 for a nonnegative value and -1 for a negative one. `ZZ`'s `shift(x, k)` is ⌊x·2^k⌋ at any count. The compiled path declares no `shift` (F-126). Gated by `tests/IntSemanticsRungI.fss`. Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4.3 and 4.4.

Meaning: unchanged. Reorganized: the signs of `GCD` and `LCM` and the `CHOOSE` answer moved to F-?1. "Overflow raises (F-132)" left: it is F-132's subject, and it is not about shifts. "The compiler prelude has no `shift` (row 383)" became a pointer to F-126, which owns it. The meaning of `shift` is P-69's words.

Sources: P-69; the report's sections 4.3 and 4.4; F-126.

## F-?1 (new, from F-125)

> - F-?1 **Under walk, `GCD` and `LCM` are nonnegative, `0 LCM 0` is 0, and `CHOOSE` answers 0 for `k < 0` or `k > n`.** `GCD` and `LCM` hold this on the four fixed widths and on `ZZ`. A result that its type cannot hold raises `IntegerOverflow` (F-132). Code that took a direction from the sign of the old `LCM` must compute the sign itself: the team's test `tests/RangePrototype.fss` now computes its signed stride as `(a DIV (a GCD b)) DOT b`. The library's ranges did not depend on that sign. Gated by `tests/IntSemanticsRungI.fss` for `GCD` and `LCM` (rows 334 and 385, fixed), and by `tests/PowChooseLcmRungE.fss` for `CHOOSE` (row 337, fixed). Detail: `compile-ladder/rung-int-semantics-walk/REPORT.md` sections 4.2 and 7.

Meaning: no new claim, and one correction of evidence, from the assessment: `CHOOSE` is gated by `PowChooseLcmRungE.fss:70-72`, not by `IntSemanticsRungI.fss`, and is not in the cited sections. The `RangePrototype` sentence is now said as its consequence, from section 7. "The library's ranges did not depend on that sign" is section 7's ("The library does not depend on the sign").

Sources: F-125's old text; the report's section 4.2 (the fixed widths, and `BigNum$Lcm` for `ZZ`) and section 7; rows 334, 385 and 337; F-132 ("`^`, `CHOOSE` and `LCM` included").

## F-128

> - F-128 **Under `walk`, the interpreter converts by coercion at its three kinds of type check.** They are a parameter, a varargs parameter included; an overloaded call that no declaration fits without coercion, which walk then dispatches again; and a typed binding or assignment. Walk chooses the coercion by the run-time value (P-59). Not converted, as measured: a declared return (gap-ledger row 387), a coercion with its own static parameter (row 513), and an overloaded function's tuple parameter or a tuple-typed field (row 395). Not built and not measured: the specification's varargs, keyword and arrow targets of tuple and arrow coercion. Gated by `tests/Coercion*RungC.fss`. Detail: `compile-ladder/rung-interp-coercion/REPORT.md` sections 1, 5 and 9.

Meaning: one correction of scope, from the assessment. Walk converts a varargs parameter (`CoercionCallRungC.fss:38-40`); the three limits are the specification's varargs, keyword and arrow targets within tuple and arrow coercion, which the report calls "not converted and not measured".

Sources: the report's section 1 (the list of parameters), section 4 (`conversions-coercions.tex:718-726`, `:730` onward), section 5 ("Tuple-typed targets"), section 11; rows 387, 513 and 395; P-59.

## F-129

> - F-129 **A size is carried at run time as a descriptor from `RTTIsize.of`, and a program whose sizes are known at compile time loads, dispatches and runs compiled.** It builds P-41. Each size value, such as the 3 of `Vec[\3\]`, has one descriptor; in a run-time subtype test, it is a supertype only of an equal size. A size read as a value is a constant that the class loader replaces by the numeral. Closures and tasks capture a size as a free static parameter (F-135). A size made from a number known only at run time does not run compiled: `tests/NatReflectTest.fss` stops at load (gap-ledger row 307). Gated by `compiler_tests/NatRt*`. Also open on the compiled path: a `ZZ32Vector` passed to a generic constructor fails at load (row 408); a size with no `extends` clause gets the bound `Object`, not the specification's `Any` (row 412); a dispatched overload arm whose static parameter has a concrete generic bound fails (row 413); an object that extends two instantiations of one trait, one at a static parameter, passes the checker and dies at load (row 414). Row 416 is walk's defect: its overloading check applies no exclusion of instantiations, where the compiled run answers right. Detail: `compile-ladder/rung-size-runtime/REPORT.md` sections 1 and 9.

Meaning: one correction of scope, from the assessment: the claim is limited to sizes known at compile time, with row 307, as F-36 and F-146 say and as the entry's text before 2026-10-13 did. Each open row has a few words. Row 416 is said as walk's defect.

Sources: P-41 ("Each size value ... has one descriptor"); the report's sections 1 and 9; rows 307, 408, 412, 413, 414 and 416; F-135.

## F-130

> - F-130 **The specification's wrapping operators ∔, ∸ and ⨰ are declared in the interpreter's library, and the library bodies and team tests that meant to wrap use them.** It builds P-73. The compiler prelude spells ∔ and ∸ as saturating (gap-ledger row 348). One library body uses the operators where wrapping is wrong: `Random`'s `LinearCongruential` computes `(mult DOTTIMES widen(state)) DOTPLUS add` and only then takes `MOD modulus`, so it wraps at the width of its type `N` first. That is right only where the modulus divides 2^width, so a modulus that is not a power of two gives wrong numbers (row 700). The library builds it only with the modulus 2^48. Gated by `tests/WrapOperatorsRungD.fss`. Detail: `compile-ladder/rung-wrap-operators/REPORT.md` section 2; their users, `reviews/wrap-dependent-code.md`.

Meaning: unchanged. The mechanism of row 700 is said, from the row and the code, so that the reader sees it as a misuse of the operators, not a defect of them.

Sources: `Library/Random.fss:235`, `:241`; row 700; row 348.

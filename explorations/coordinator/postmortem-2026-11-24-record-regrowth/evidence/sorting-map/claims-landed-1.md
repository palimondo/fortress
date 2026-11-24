<!-- The claims of each FACTS entry of the chunk `landed-1` ("Landed semantics", F-117 to F-148, 31 entries), each with its subject, its kind, the other entries that say the same, and what today's checks say of it, as the first step of the sorting map for the batch mode of the record's consolidation; written 2026-11-24 under `brief-claims.md`, judging nothing new. -->

# Claims of the chunk `landed-1`

Conventions. Each claim is `cN · kind · subject · sentence`. "Overlap" lists, for each claim of the kinds property, defect and choice, the other FACTS entries that say the same or overlap, found by grepping the whole of `FACTS.md` (as of 2026-11-24) for the quoted words. "Checks" copies the finding of `evidence/consolidation/scout-landed-1.md` (abbreviated "scout") and of `evidence/stale-claims.md` ("stale"). Stale-claims says that this chunk had no writer: the scout checked only that the tests, files, rows and headings exist, and "a scout's 'found' is not a check that the entry is true". So "no finding" below means that only existence was checked. Rows are rows of the gap ledger.

## F-117, "A compiled mutable variable's cell holds the language's top type"

- Claims:
  - c1 · property · the compiled runtime: mutable variable cells · A compiled mutable variable's cell holds `fortress.AnyType.Any`, not `FValue`.
  - c2 · property · the compiled runtime: mutable variable cells · So a mutable variable of arrow type compiles and runs, since a compiled closure is not an `FValue`.
  - c3 · tests · the compiled runtime: mutable variable cells · The cell's gated tests are `AtomicTopLevel*Var` and `MutableTopLevelVarInLoop`, and none of them runs a variable of arrow type.
  - c4 · pointer · · Detail is in `repair-r1-atomic-static/REPORT.md` sections 1 and 4.
- Overlap:
  - c1: none found (searched `AnyType.Any`, `MutableFValue`, `mutable variable`); F-353 and F-374 name `MutableFValue` for other subjects (F-374: an object's `var` field cell).
  - c2: none found (searched `arrow type`); F-365, F-367, F-382 use "arrow type" for other subjects.
- Checks: no finding. Scout: tests found; `MutableFValue.java:18` is `volatile fortress.AnyType.Any value;`. c2 has no gated test (the entry says so; c3).
- Shape: one subject. Title: the cell holds the top type, so an arrow-typed variable runs; the body serves it, but its claim c2 rests on no test.

## F-118, "A numeral's value reaches the compiled code intact"

- Claims:
  - c1 · property · the checker: numeral defaults · A numeral that no place types becomes its default through that type's own coercion, which the checker inserts (`defaultNumeral`).
  - c2 · property · the code generator: numeral constants · Only a numeral left without a coercion reaches the code generator's fallback, a `ZZ32`, `ZZ64` or `ZZ` by bit length (`forIntLiteralExpr`).
  - c3 · defect · the code generator: numeral constants · Which numerals reach that fallback is not measured (no row).
  - c4 · pointer · · A folded constant at a library type is that type's constant (F-340), and a numeral as written is its coercion folded (F-347).
  - c5 · property · the code generator: numeral constants · On the compiled path `4294967295` and `18446744073709551615` keep their values, as under walk.
  - c6 · pointer · · Under walk they are a `ZZ64` and a `ZZ` (F-74, F-341), and an untyped binding of the second is a `ZZ` (F-342).
  - c7 · property · the compiled runtime: printing of values · The compiled path prints an `NN32` or `NN64` value above its signed half unsigned.
  - c8 · tests · the code generator: numeral constants · `IntLiteralWrapRepairR2` gates the numerals at `ZZ`, `ZZ64`, `NN32`, `NN64`; `UnsignedPrintingCompiled` the printing.
  - c9 · pointer · · Detail in `repair-r2-literal-wrap/REPORT.md` and `rung-static-numerals/REPORT.md`.
- Overlap:
  - c1: F-342 ("converts a numeral where nothing fixes a type into its default"); F-74 (walk's default by value). Searched `defaultNumeral` (F-118 only), `default`.
  - c2: F-340 (`forIntLiteralExpr`, the constant at a typed place). Searched `forIntLiteralExpr`.
  - c3: none found (searched `not measured`, `fallback`).
  - c5: F-342 (a `ZZ64` or `ZZ` by its value), F-74, F-341 (walk). Searched `4294967295`: F-140, F-146, F-261 use it for sizes and `unsigned`.
  - c7: F-313 ("The compiled path prints an `NN32` or `NN64` unsigned", `UnsignedPrintingCompiled`). Searched `UnsignedPrinting`, `unsigned`.
- Checks: no finding. Scout: tests and `defaultNumeral`, `forIntLiteralExpr` found; the `rung-static-numerals` heading was not re-checked.
- Shape: several subjects (the checker: numeral defaults; the code generator: numeral constants; the compiled runtime: printing of values). Title: numerals reach compiled code intact, and large `NN` values print unsigned; the title joins two claims, and the second (c7) is F-313's.

## F-119, "The library's scalar extension is eight generic declarations"

- Claims:
  - c1 · property · the library: scalar extension of arrays · The scalar extension is eight generic declarations: `+`, `-`, `MIN`, `MAX` between an `Array[\T,I\]` and a scalar `T`, in both orders.
  - c2 · property · the library: scalar extension of arrays · `T` is bounded by `Number` with `AdditiveGroup[\T\]`, `StandardMin[\T\]` or `StandardMax[\T\]` by operator.
  - c3 · tests · the library: scalar extension of arrays · Gated by `ArrayScalarExtension.fss` and `ArrayOperatorsBesideLibrary.fss`, the second importing the fixture `ArrayOperatorVocabulary`.
  - c4 · property · walk: library operator overload check · Walk checks a program's overloads against the library's only on a cold cache (F-269).
  - c5 · property · the harness and the gate: cold-cache tests · So `ArrayOperatorsBesideLibrary` shows coexistence with the library only from an empty cache.
  - c6 · pointer · · Detail in `reviews/library-scalar-extension-review.md`, change 1.
- Overlap:
  - c1: F-151 ("The scalar extension, the eight operators between an array and a scalar ... (F-119)"); F-269 (C4's `MAX` pair dropped when the scalar extension took its place); F-318 (walk loads `ArrayScalarExtension`). Searched `scalar extension`, `ArrayScalarExtension`.
  - c2: F-151 ("has bounds of its own, also with `Number`"). Searched `StandardMin`, `AdditiveGroup`.
  - c4: F-269 (whole entry: "only on a cold cache"). Searched `cold cache`.
  - c5: F-269 ("a refusal appears once, on a cold cache"). Searched `cold cache`.
- Checks: no finding. Scout: tests and fixture found; the review file found, "change 1" not checked as a heading.
- Shape: several subjects (the library: scalar extension; walk: library operator overload check). Title: the extension's eight declarations; c4 and c5 serve the test's reading, not the title, and are F-269's.

## F-120, "A top-level variable imported through an api can be read, assigned"

- Claims:
  - c1 · property · the code generator: imported top-level variables · On the compiled path, a top-level variable imported through an api can be read, assigned and read back.
  - c2 · property · the checker: imported top-level variables · The checker asks the declaring api whether the name is mutable, and the code generator binds a mutable one to its cell.
  - c3 · tests · the code generator: imported top-level variables · Gated by `ExportVarRungX.test`, and the refusal to assign an immutable one by `XXXExportVarRungXFrozen.test`.
  - c4 · pointer · · Detail in `rung-export-var/REPORT.md`.
- Overlap:
  - c1: F-22 (a component named apart from its api is not found; `XXXExportVarRungXLinked`, row 320) is the neighbour, not the same claim. Searched `ExportVar`, `imported through an api`; F-282, F-288 name `ExportVar` tests in lists.
  - c2: none found (searched `mutable`, `declaring api`).
- Checks: no finding. Scout: both tests found.
- Shape: one subject. Title: an imported variable reads, assigns, reads back; the body serves it.

## F-121, "The team's spelling of `AnyIntegral`'s `comprises` clause stays a comment"

- Claims:
  - c1 · property · the library: AnyIntegral comprises clause · The team's `comprises Integral[\I\] where [\I\]` stays a comment, and the live clause lists the five integer types (P-44).
  - c2 · pointer · · The compiled checker accepts the live clause (F-62).
  - c3 · property · the checker: comprises where-clause opening · The compiled checker opens a listed type's `where`-clause variables of `nat`, `int` or a type (F-146, F-251).
  - c4 · defect · the checker: comprises where-clause opening · As the team wrote it, the clause is ill-formed: the checker reports that `I` does not satisfy `Integral[\I\]`'s bound (no row; row 831 is the front end's refusal on a trait with a coercion).
  - c5 · defect · the checker: memory on FortressLibrary · With the bound written in, the apis check clean, but `FortressLibrary`'s overloading checks run out of memory at 4 GB (`TypeAnalyzer.ancestors`) and finish at 11 GB.
  - c6 · history · the library: AnyIntegral comprises clause · Neither variant is reachable on `main`; the probe's fix and clause are at the end of its report.
  - c7 · plan · the library: AnyIntegral comprises clause · Whether the clause becomes live is an open question whose default leaves it a comment; of the commented clauses P-151 builds only `AnyList`'s.
  - c8 · pointer · · Detail in `facts-slice-2.md` and `perf-probes/anyintegral-comprises-where/REPORT.md`.
- Overlap:
  - c1: F-62 (the tower closure checks as written, P-44); F-171 ("Whether the team's commented `comprises Integral[\I\] where [\I\]` is valid is open (F-121)"). Searched `comprises Integral`, `AnyIntegral`.
  - c3: F-146 (sizes), F-251 (type variables), F-270 (sizes, the same opening). Searched `opens`, `fresh`.
  - c4: none found (searched `does not satisfy`, `Ill-formed`).
  - c5: F-255 names `TypeAnalyzer.ancestors` for another subject (conditional parents). Searched `TypeAnalyzer.ancestors`, `11 GB`, `out of memory`: no other entry.
- Checks: no finding. Scout: row 831 NEGATIVE-VERIFIED agrees; `TypeAnalyzer.scala:1032` found inside `ancestors`.
- Shape: mostly history or plan, with two defects (c4, c5) that have no row. Title: the clause stays a comment and no decision says if it is valid; the body serves it, but c5 (the checker's memory) is a separate subject.

## F-122, "`round` on an `RR64` or an `RR32` sends an exact half to the even integer"

- Claims:
  - c1 · property · the library: rounding of floats · On both paths `round` sends an exact half of an `RR64` or `RR32` to the even integer.
  - c2 · property · the library: rounding of floats · NaN rounds to 0, and a value beyond the `ZZ64` range saturates to its bounds.
  - c3 · property · walk: numerals near a tie · A numeral within half an ulp of a tie rounds as its nearest double, by P-173's tie reading (P-172).
  - c4 · tests · the library: rounding of floats · Ties are gated by `RoundHalfEvenRungR.fss` (walk) and `RR64FunctionsRungF.fss` (compiled `RR64`); the guard `RoundNearTieNumeral.fss`.
  - c5 · detail · the library: rounding of floats · Compiled `RR32` ties, NaN and saturation were observed in a probe and read at `RR32.java:326` and `simpleDoubleArith.java:148-150`, and are not gated.
  - c6 · pointer · · Detail in `rung-round-half-even/REPORT.md`.
- Overlap:
  - c1: none found (searched `RoundHalfEven`, `half to the even`, `Math.rint`).
  - c2: none found (searched `saturat`, `NaN`).
  - c3: none found beyond P-172/P-173 (searched `half an ulp`, `tie`).
- Checks: no finding. Scout: tests and the two code lines found.
- Shape: one subject. Title: half to even on both paths; the body serves it, with its ungated parts named.

## F-123, "A compiled object with no `asString` of its own prints its bare type name"

- Claims:
  - c1 · property · the compiled runtime: printing of values · A compiled object with no `asString` of its own prints its bare type name, as walk does.
  - c2 · property · the compiled runtime: printing of values · A value whose Java class declares its own `toString`, such as the compiled `RR32`, prints by it.
  - c3 · defect · the compiled runtime: printing of values · Through the prelude's `Object`, an object with a zero-argument member `toString` overflows the stack when printed (row 321), not through the one library's.
  - c4 · defect · the compiled runtime: printing of values · `asDebugString` and `asExprString` print differently from walk's, where the specification is silent (row 363).
  - c5 · property · walk: instantiation at a string argument · For a string static argument both paths give `Cell[\String\]` (F-344).
  - c6 · property · the checker: numeral defaults · For a numeral argument both paths give its default: `Cell(3)` is a `Cell[\ZZ32\]` (F-341, F-342).
  - c7 · tests · the compiled runtime: printing of values · Gated by `DefaultRenderRungS`; c6 by `LanguageTypeInstancesWalk` and `LiteralDefaultCompiled`.
  - c8 · pointer · · Detail in `rung-default-rendering/REPORT.md`.
- Overlap:
  - c1: none found (searched `bare type name`, `ilkName`); F-328 binds `Object.ilkName`.
  - c3: none found (searched `row 321`).
  - c4: none found (searched `row 363`, `asDebugString`: F-286 lists members only).
  - c5: F-344 ("`Cell("s")` is ..."; walk reads a string object at `String`). Searched `Cell(`.
  - c6: F-74 ("`Box(3)` is a `Box[\ZZ32\]`"), F-342, F-341. Searched `Cell(3)`, `Box(3)`.
- Checks: no finding. Scout: tests found; rows 321 and 363 NEGATIVE-VERIFIED agree.
- Shape: several subjects (the compiled runtime: printing of values; walk: instantiation at a string argument; the checker: numeral defaults). Title: bare type name; c5 and c6 do not serve it and belong to F-344 and F-74/F-342.

## F-124, "On the compiled path, at or beyond the width of `ZZ32` or `ZZ64`, `LSHIFT` gives 0"

- Claims:
  - c1 · property · the compiled runtime: integer shifts · At or beyond the width, `LSHIFT` gives 0 and `RSHIFT` the sign, both reversing on a negative count.
  - c2 · property · the compiled runtime: integer conversions · `ZZ64`'s and `NN64`'s `narrow` keeps the low 32 bits.
  - c3 · property · the compiled runtime: integer shifts · `<<`, `>>` and `<<<` keep their own rules, and `asZZ32` throws out of range.
  - c4 · property · the compiled runtime: integer overflow · Negation, absolute value and division overflow only at the minimum value, so `|0|`, `-0` and `0 DIV -1` answer 0.
  - c5 · property · the compiled runtime: integer overflow · Addition, subtraction and multiplication raise `IntegerOverflow` on every overflow, by sign tests and exact products.
  - c6 · detail · the compiled runtime: integer overflow · Multiplication uses `Math.multiplyExact` on `ZZ64` and a range-checked product on `ZZ32`.
  - c7 · property · the compiled runtime: integer shifts · `ZZ`'s `<<<` raises a catchable `IntegerOverflow` on a shift it cannot represent (row 386).
  - c8 · tests · the compiled runtime: integer overflow · Gated by `IntSemanticsRungB.fss` and, for addition and subtraction, the team's `Integer3.fss`.
  - c9 · pointer · · Detail in `rung-int-semantics-compiled/REPORT.md` section 1.
- Overlap:
  - c1: F-125 (walk's twin, same words), F-132 (shifts lose bits), F-172 (the specification's shift rule), F-327 (shifts as Fortress around bare bindings). Searched `LSHIFT`, `RSHIFT`.
  - c2: F-172 ("`narrow` converts a `ZZ64` to `ZZ32` ... keeping the low 32 bits"), F-331 (low-bits names keep the bits), F-132. Searched `narrow`, `low 32 bits`.
  - c3: F-331 and F-172 (`asZZ32` raises). Searched `asZZ32`.
  - c4: F-132 (walk: negation and absolute value raise). Searched `IntegerOverflow`, `DIV -1`.
  - c5: F-132 (walk), F-24 (a native raises a catchable exception). Searched `IntegerOverflow`, `multiplyExact` (F-124 only).
  - c7: none found (searched `row 386`, `<<<`).
- Checks: no finding. Scout: tests found; row 386 FIXED, the entry states the repaired behaviour, agrees.
- Shape: several subjects (the compiled runtime: integer shifts; integer conversions; integer overflow). Title: shifts and `narrow`; the body's overflow claims (c4, c5) go past the title.

## F-125, "Under `walk`, at or beyond the width ... `LSHIFT` gives 0"

- Claims:
  - c1 · property · walk: integer shifts · Under walk, at or beyond the width of the four fixed widths, `LSHIFT` gives 0 and `RSHIFT` the sign, reversing on a negative count.
  - c2 · pointer · · It builds P-69.
  - c3 · property · walk: integer shifts · `ZZ`'s `shift(x, k)` is ⌊x·2^k⌋.
  - c4 · property · walk: integer shifts · A nonzero `ZZ` shifted by more than 2^31 - 1, or past what `BigInteger` holds, raises a catchable `IntegerOverflow`; zero stays zero.
  - c5 · property · the compiled runtime: integer shifts · The compiled path declares no `shift` (F-126).
  - c6 · tests · walk: integer shifts · Gated by `IntSemanticsRungI.fss`.
  - c7 · pointer · · Detail in `rung-int-semantics-walk/REPORT.md` sections 4.3 and 4.4.
- Overlap:
  - c1: F-124 (compiled twin), F-132 ("the shifts `LSHIFT` and `RSHIFT`, which lose the bits shifted out (F-125)"), F-172, F-327. Searched `LSHIFT`.
  - c3: F-172 ("On `ZZ` they are `shift`, which is exact at any count"), F-327. Searched `` `shift` ``.
  - c4: F-24 (catchable native exception). Searched `BigInteger`, `2^31`.
  - c5: F-126 (whole claim). Searched `` `shift` ``.
- Checks: no finding. Scout: the test found.
- Shape: one subject (walk: integer shifts), with c5 borrowed from F-126. Title: walk's shift rules; the body serves it.

## F-126, "`ZZ`'s functional method `shift` reserves the name `shift`"

- Claims:
  - c1 · property · the library: the name `shift` · `ZZ`'s functional method `shift` reserves the name `shift` in every program under walk.
  - c2 · property · the compiled runtime: integer shifts · The compiled path's prelude declares no `shift`, so the name is free there.
  - c3 · pointer · · The `fortress-repo` skill gives the general rule (`references/library.md`).
  - c4 · history · the library: the name `shift` · So the library's parameters that `shift` would shadow are named `amount`.
  - c5 · pointer · · Detail in `rung-int-semantics-walk/JUDGE.md` section 3 and `REPORT.md` section 5.
- Overlap:
  - c1: the skill (SKILL.md: "A functional method's name is reserved in every program that imports it"; library.md:35), per the scout. Searched `reserve`, `` `shift` ``: F-327, F-172 name `shift` but not the reservation.
  - c2: F-125 c5. Searched `declares no`.
- Checks: no finding. Scout: sources found; the rule is in the skill (SKILL.md:131, library.md:35).
- Shape: one subject; the general rule is the skill's. Title: `shift` reserved under walk and not compiled; the body serves it.

## F-128, "Under `walk`, the interpreter converts by coercion at its three kinds of type check"

- Claims:
  - c1 · property · walk: coercion at type checks · Walk converts by coercion at a parameter (varargs included), at an overloaded call that no declaration fits without coercion (dispatched again), and at a typed binding or assignment.
  - c2 · property · walk: coercion at type checks · Walk chooses the coercion by the run-time value (P-59).
  - c3 · defect · walk: coercion at type checks · A value other than a numeral is not converted at a declared return (row 387); a numeral is (F-341).
  - c4 · defect · walk: coercion at type checks · A coercion with its own static parameter, other than a numeral coercion, is not converted (row 513).
  - c5 · defect · walk: coercion at type checks · An overloaded function's tuple parameter and a tuple-typed field are not converted (row 395).
  - c6 · defect · walk: arrow coercion · A function argument is not converted by the arrow coercion, and the call fails with 'Unification error' (row 1083).
  - c7 · defect · the code generator: arrow coercion · The compiled path converts it, but not to a function type of no parameters (row 1084).
  - c8 · defect · walk: coercion at type checks · A varargs or keyword element of the tuple coercion is not converted, by the code, not measured.
  - c9 · tests · walk: coercion at type checks · Gated by `tests/Coercion*RungC.fss`.
  - c10 · pointer · · Detail in `rung-interp-coercion/REPORT.md` and `rung-closure-name-once/SKEPTIC.md`.
- Overlap:
  - c1: the skill (revival-changes.md:103 "Walk converts a value other than a numeral at a call, a typed binding and an assignment"); F-26 (walk converts and dispatches again, at a generic's instance). Searched `Coercion`, `dispatches again`.
  - c2: none found in FACTS (searched `P-59`, `run-time value`).
  - c3: F-139 (a declared return does not convert an `RR32`, row 387); the skill's interpreter.md:30. Searched `row 387`.
  - c4, c5, c8: none found (searched `row 513`, `row 395`, `keyword`).
  - c6, c7: F-389 names the arrow coercion's wrapper for another subject. Searched `arrow coercion`, `row 1083`, `row 1084`.
- Checks: no finding. Scout: tests found; rows 387, 395, 513, 1083, 1084 NEGATIVE-VERIFIED agree; the SKEPTIC "## 3" heading not checked.
- Shape: mostly a defect (six defect claims, one row each), around one subject (walk: coercion at type checks). Title: walk converts at three kinds of check; the body's list of what is not converted serves it as its limits.

## F-129, "A size is carried at run time as a descriptor from `RTTIsize.of`"

- Claims:
  - c1 · property · the compiled runtime: sizes at run time · A size is carried at run time as one descriptor per size value from `RTTIsize.of`, a supertype only of an equal size.
  - c2 · property · the compiled runtime: sizes at run time · A program whose sizes are known at compile time loads, dispatches and runs compiled.
  - c3 · pointer · · It builds P-41.
  - c4 · property · the compiled runtime: sizes at run time · A size read as a value is a `ZZ32` that the class loader writes in with `FZZ32.make`.
  - c5 · defect · the compiled runtime: sizes at run time · Beyond 31 bits it is `FZZ32.makeSize`, a `java.lang.Error` that no `catch` sees (row 962; `MethodInstantiater.java:225-237`, by reading).
  - c6 · property · the code generator: generic tasks · Closures and tasks capture a size as a free static parameter (F-135).
  - c7 · defect · the compiled runtime: sizes at run time · A size made from a run-time number does not run compiled: `NatReflectTest.fss` stops at load (row 307).
  - c8 · tests · the compiled runtime: sizes at run time · Gated by `compiler_tests/NatRt*`.
  - c9 · defect · the compiled runtime: generic constructors · A `ZZ32Vector` passed to a generic constructor fails at load (row 408).
  - c10 · defect · the code generator: dispatch with static bounds · A dispatched arm whose static parameter has a concrete generic bound stops the compile (sized) or dies at load (type) (row 413).
  - c11 · defect · the checker: two instantiations of one trait · An object extending two instantiations of one trait, one at a static parameter, passes the checker and dies at load (row 414).
  - c12 · defect · walk: exclusion of instantiations · Walk refuses `g(b: Tg[\3\])` beside `g(b: Tg[\4\])` at load, which the compiled run dispatches (row 416).
  - c13 · pointer · · Detail in `rung-size-runtime/REPORT.md` sections 1 and 9.
- Overlap:
  - c1: F-36 ("the class loader, which takes its descriptor from `RTTIsize.of` (F-129)"), F-18 (`RTTIsize.of("<n>")` inside the class), F-40 (the built design, one descriptor per size), the skill (SKILL.md "a size as a descriptor from `RTTIsize.of`"). Searched `RTTIsize`.
  - c4, c5: F-140 (row 962, contested: a `java.lang.Error` no `catch` sees), F-74 (a size used as a value, row 962), F-342 ("A `nat` or `int` parameter read as a value is a `ZZ32`"). Searched `row 962`, `makeSize`.
  - c6: F-135 (whole entry). Searched `free static parameter`.
  - c7: F-270, F-181, F-377 (row 307, for the opening of a `where`-clause size). Searched `row 307`, `NatReflect`.
  - c9, c10: none found (searched `row 408`, `row 413`).
  - c11: F-48 (row 414, `XXXNatExtendsTwice`), F-167 (row 414). Searched `row 414`.
  - c12: F-44, F-91, F-155, F-252 (row 416). Searched `row 416`.
- Checks: stale: "cites row 962 without saying it is CONTESTED (F-140 says contested). Kind: a ledger row's status disagrees. Source: scout-landed-1.md, F-129, Exists." Scout: tests and `MethodInstantiater.java:225-237` found; rows 307, 408, 413, 414 agree; row 416 not looked up.
- Shape: several subjects (the compiled runtime: sizes at run time; the code generator: generic tasks; the compiled runtime: generic constructors; the code generator: dispatch with static bounds; the checker: two instantiations of one trait; walk: exclusion of instantiations). Title: sizes as descriptors, and sized programs run; c9 to c12 are defects of other subjects that the rung measured.

## F-130, "The specification's wrapping operators ∔, ∸ and ⨰ are declared in the interpreter's library"

- Claims:
  - c1 · property · the library: wrapping operators · The interpreter's library declares ∔, ∸ and ⨰, and the bodies and team tests that meant to wrap use them.
  - c2 · pointer · · It builds P-73.
  - c3 · defect · the compiled runtime: wrapping operators · The compiler prelude's ∔ and ∸ saturate, and it declares no ⨰ (row 348).
  - c4 · defect · the library: wrapping operators · One library body uses the operators where wrapping is wrong, by reading, not run (row 700).
  - c5 · property · the library: Random's generator · `LinearCongruential` wraps before it takes `MOD modulus`, so it is right only where no step overflows or the modulus divides 2^width.
  - c6 · property · the library: Random's generator · The library builds it only with the modulus 2^48, where it is right.
  - c7 · tests · the library: wrapping operators · Gated by `WrapOperatorsRungD.fss`.
  - c8 · pointer · · Detail in `rung-wrap-operators/REPORT.md` and `reviews/wrap-dependent-code.md`.
- Overlap:
  - c1: F-132 ("the wrapping operators (F-130)"); the skill (library.md:24). Searched `DOTPLUS`, `∔`, `wrapping operator`.
  - c3: F-32 ("the 12 wrapping operators (row 348)"), F-306 (`ZZ64`'s wrapping bindings, row 348). Searched `row 348`.
  - c4: none found (searched `row 700`).
  - c5, c6: none found (searched `LinearCongruential`, `2^48`).
- Checks: no finding. Scout: the test found; rows 348 and 700 agree.
- Shape: several subjects (the library: wrapping operators; the compiled runtime: wrapping operators; the library: Random's generator). Title: the operators are declared and used; c5 and c6 explain row 700's one body, a separate subject.

## F-131, "The one library's number tower is flat"

- Claims:
  - c1 · property · the library: flat number tower · The eight number types and `Numeral` are siblings under `Number`, with the numeral types below `Numeral`.
  - c2 · pointer · · It builds P-43; each of the eight converts from the numeral types (F-79).
  - c3 · property · the checker: numeral defaults · The compiled checker gives a numeral its numeral type and converts it where it stands (F-342).
  - c4 · property · walk: numerals at places · Walk gives a numeral its default and converts it where its place fixes a type (F-341).
  - c5 · property · the library: coercions between number types · Each wider integer type converts from each narrower one, `RR64` from a `ZZ32`, and a `ZZ64` into `RR64` only when written out (P-74).
  - c6 · property · the library: coercions between number types · `QQ` converts from the five integer types, and `RR64` from `RR32` (F-139).
  - c7 · plan · the library: coercions between number types · `NN32` does not yet convert into `RR64`, and P-75 decides that it will.
  - c8 · pointer · · `Number` declares no `=`, each type declares its own (F-324).
  - c9 · property · walk: reduction instantiation · Under walk `SUM <|1, 2, 3|>` is 6, its list read at `ZZ32` (F-344).
  - c10 · defect · walk: reduction instantiation · An empty `SUM` over an additive group that is not a number dies (row 436).
  - c11 · tests · the library: flat number tower · Gated by `FlatTowerRungF.fss` but for `RR32` (F-139) and the numeral types (F-79).
  - c12 · pointer · · Detail in `rung-flat-tower/REPORT.md` sections 5 and 17.
- Overlap:
  - c1: F-168 ("The eight number types are siblings under `Number` (F-131)"), F-79 (`Numeral` a sibling of the number types), F-139 (`RR32` a sibling), the skill (SKILL.md "Numbers are siblings, not a tower"). Searched `siblings`, `flat`.
  - c3: F-342 (whole). Searched `numeral type`.
  - c4: F-341, F-74. Searched `default`.
  - c5: F-55, F-73, F-137 (P-74 promotion), F-168 ("They convert by the library's coercions (P-74)"). Searched `P-74`.
  - c6: F-139 (whole), F-79. Searched `RR32`.
  - c9: F-344 (list read at `ZZ32`). Searched `SUM <|`.
  - c10: F-243 (row 436, a cast at the identities' fallbacks). Searched `row 436`.
- Checks: no finding. Scout: the test found; row 436 agrees; history line 4075 (older text) said how to build `NN32` into `RR64` waits for the curator.
- Shape: several subjects (the library: flat number tower; coercions between number types; the checker and walk on numerals; walk: reduction instantiation). Title: the tower is flat; c3, c4, c9 and c10 are other entries' claims repeated.

## F-132, "Under `walk`, fixed-width integer arithmetic raises `IntegerOverflow`"

- Claims:
  - c1 · property · walk: fixed-width overflow · Under walk every fixed-width operation whose result can leave its type raises a catchable `IntegerOverflow`, `^`, `CHOOSE` and `LCM` included.
  - c2 · pointer · · It builds P-73.
  - c3 · property · walk: fixed-width overflow · The wrapping operators (F-130), the low-bits conversions (P-72, P-161; F-331) and the shifts (F-125) raise nothing.
  - c4 · tests · walk: fixed-width overflow · Gated by `FixedWidthOverflowRungB.fss` (`+`, `-`, `DOT`, `DIV`, negation, absolute value) and `PowChooseLcmRungE.fss`.
  - c5 · defect · the compiled runtime: integer overflow · The compiler prelude's ranges raise `IntegerOverflow` where their bounds sum beyond `ZZ32` (row 453).
  - c6 · defect · the compiled runtime: integer power · The compiled `^` saturates, throws an uncatchable Java exception or adds (rows 523 to 525).
  - c7 · pointer · · The compiled `CHOOSE` raises as walk's does (F-305).
  - c8 · pointer · · Detail in `rung-overflow-natives/REPORT.md` and `rung-size-range/REPORT.md`.
- Overlap:
  - c1: F-24 ("`ZZ32.overflow()` does for `IntegerOverflow` (F-132)"), F-316 (a `GCD`, `LCM` or `CHOOSE` result that does not fit raises), F-172 (the specification's rules), F-124 (compiled twin). Searched `IntegerOverflow`, `FixedWidthOverflowRungB`.
  - c3: F-331, F-172 (low-bits names keep the bits), F-130, F-125. Searched `narrow`, `keep the bits`.
  - c5: none found (searched `row 453`).
  - c6: F-263 (row 523: the compiled power's overflow). Searched `row 523`.
- Checks: no finding. Scout: tests found; rows 453, 523, 524, 525 agree.
- Shape: several subjects (walk: fixed-width overflow; the compiled runtime: integer overflow and power). Title: walk raises on overflow; c5 and c6 list the compiled path's gaps, outside the title by its own words.

## F-133, "The one library's scalar ranges are over `ZZ32` alone"

- Claims:
  - c1 · property · the library: scalar ranges · The one library's scalar ranges are over `ZZ32` alone.
  - c2 · pointer · · It builds P-77.
  - c3 · property · the library: scalar ranges · A range that reaches `ZZ32`'s minimum or maximum has the right size and elements, unless strided with a bound difference outside `ZZ32`.
  - c4 · defect · the compiled runtime: compiler library ranges · The compiler library has no strided range (row 514), and its range `IN` and `=` are always `false` (rows 479, 481).
  - c5 · defect · the checker: case without operator · Reading the one library, the checker compares a `case` with no operator by `=` where the guard's type is bounded by a `Contains` type or a union of them, so the clause never matches (row 480).
  - c6 · property · the checker: case without operator · Over the compiler library the checker picks ∈.
  - c7 · tests · the library: scalar ranges · Gated by `RangeZZ32RungJ`, `RangeBoundsRungO`, `SeqRangeTopRungO`, `RangeEmptyHashRungO`.
  - c8 · defect · walk: strided ranges · Under walk a strided range whose bound difference leaves `ZZ32` raises `IntegerOverflow` at construction (row 522).
  - c9 · pointer · · Detail in `rung-ranges-zz32/REPORT.md`.
- Overlap:
  - c1: the skill (library.md:22 "Scalar ranges are over `ZZ32` only"); F-90 (a strided range is declared `Range[\ZZ32\]`). Searched `Range[\ZZ32`, `ZZ32 alone`.
  - c3: none found (searched `minimum or maximum`).
  - c4: none found (searched `row 514`, `row 479`, `row 481`).
  - c5: none found (searched `row 480`, `Contains`: F-83, F-286, F-297 name `Contains` for other subjects).
  - c8: none found (searched `row 522`).
- Checks: no finding. Scout: tests found; rows 479, 480, 481, 514, 522 agree.
- Shape: several subjects (the library: scalar ranges; the compiled runtime: compiler library ranges; the checker: case without operator; walk: strided ranges). Title: ranges over `ZZ32`; c5 and c6 (the checker's `case`) do not serve it.

## F-134, "A typecase or catch clause's bound name is a local on the compiled path"

- Claims:
  - c1 · property · the code generator: clause-bound names · A `typecase` or `catch` clause's bound name is a local on the compiled path.
  - c2 · property · the code generator: clause-bound names · So the compiled `cast[\T\]` matches a value of type `T`, and `cast[\ZZ32\](0)` still throws, a numeral not being a `ZZ32`.
  - c3 · defect · the code generator: clause-bound names · A name bound inside a clause's pattern is open (rows 340, 498).
  - c4 · property · the code generator: task arms · In a `do … also` arm after the first, a local and a `try` with a named `catch` compile.
  - c5 · defect · the code generator: task arms · A named `typecase` clause in such an arm has no gated test.
  - c6 · tests · the code generator: clause-bound names · Gated by `TypecaseBindRungG`, `CastBindRungG`, `ClauseBindingRungB`; c4 by `TaskArmLocalSlot`, `TryInArmRungG`.
  - c7 · pointer · · Detail in `rung-generic-runtime/REPORT.md` sections 1 and 10.
- Overlap:
  - c1: F-71 ("the clause-binding form ... runs on both paths ... (F-134)"). Searched `typecase`, `clause-binding`.
  - c2: none found (searched `cast[\ZZ32`).
  - c3: F-37 and F-373 cite row 340 for other forms (a `case` body with coercions, a label block). Searched `row 340`, `row 498`.
  - c4: none found (searched `TaskArmLocalSlot`, `also`).
- Checks: no finding. Scout: tests found; rows 340 and 498 agree.
- Shape: one subject, with a side claim on task arms (c4, c5). Title: clause-bound names are locals; the body serves it.

## F-135, "On the compiled path, a parallel task in a generic declaration is generic"

- Claims:
  - c1 · property · the code generator: generic tasks · A parallel task in a generic declaration is generic over the enclosing static parameters that it uses.
  - c2 · property · the code generator: generic tasks · The task class is a template that the class loader instantiates at the enclosing call's static arguments.
  - c3 · property · the code generator: generic tasks · So the operands of a parallel operator such as `||` in a generic method run in such task classes.
  - c4 · property · walk: tasks · Walk makes no task classes.
  - c5 · tests · the code generator: generic tasks · Gated by `NatRtTask` and `NatRtMethBoth`.
  - c6 · pointer · · Detail in `rung-generic-runtime/REPORT.md` section 1.
- Overlap:
  - c1, c2: F-129 ("Closures and tasks capture a size as a free static parameter (F-135)"); the skill (SKILL.md, the template class). Searched `free static parameter`, `task class`.
  - c3, c4: none found (searched `task class`, `NatRtTask`).
- Checks: no finding. Scout: tests found.
- Shape: one subject. Title: generic tasks; the body serves it.

## F-136, "On the compiled path, a generic top-level function, as an arm of a template dispatcher"

- Claims:
  - c1 · property · the code generator: template dispatchers · A generic top-level arm of a template dispatcher is called at the dispatcher's static parameters by position, where the counts match and each is a type.
  - c2 · property · the code generator: template dispatchers · Otherwise, by reading of `OverloadSet`, the dispatcher reads the arm's static arguments from the argument's run-time value.
  - c3 · defect · the code generator: template dispatchers · Not measured for a count that differs or a dispatcher with a `nat`, `int`, `bool` or `opr` parameter (F-45).
  - c4 · defect · the code generator: template dispatchers · The arm's kinds are not checked, so a `nat` arm at a type parameter is not guarded out (by reading).
  - c5 · defect · the code generator: template dispatchers · Where one arm is more specific but does not line up, the less specific arm can run, and the checker accepts such arms (row 499).
  - c6 · defect · the code generator: generic dotted methods · Generic dotted methods die with `ClassCastException` (row 495).
  - c7 · defect · the code generator: generic beside plain · A generic beside a plain declaration reached through `Any` dies the same (row 496), but runs where the argument is a `ZZ32` (F-388).
  - c8 · history · the code generator: template dispatchers · For template dispatchers both forms are fixed (rows 493, 494).
  - c9 · tests · the code generator: template dispatchers · Gated by `Dispatch*ArmRungG`; c7's `ZZ32` case by `GenericBesidePlainZZ32.test`.
  - c10 · pointer · · Detail in `rung-generic-runtime/REPORT.md` sections 7 and 9.
- Overlap:
  - c1: F-45 ("The call at the dispatcher's static arguments is built for template dispatchers (F-136)"). Searched `template dispatcher`, `OverloadSet` (F-38, F-40, F-41 and others name it for other subjects).
  - c3, c4: F-45 ("by reading, not for one with an `opr` or `nat` static parameter"). Searched `opr`, `nat` static parameter.
  - c5: none found (searched `row 499`).
  - c6: none found (searched `row 495`).
  - c7: F-273 (row 496, the specification's second example). Searched `row 496`.
- Checks: no finding. Scout: tests found; rows 493, 494 FIXED agree; 495, 496, 499 agree.
- Shape: mostly a defect, around one subject (the code generator: template dispatchers). Title: an arm is called at the dispatcher's parameters; the body's remainder serves it as limits.

## F-137, "Under `walk`, a generic call's static arguments are inferred with coercion"

- Claims:
  - c1 · property · walk: static argument inference · Under walk a generic call's static arguments are inferred with coercion by P-74's promotion, also for the declaration an overloaded call chooses (P-46).
  - c2 · property · walk: static argument inference · A lone type parameter takes the narrowest of its arguments' run-time types, their coercion targets and its bounds that admits every argument.
  - c3 · detail · walk: static argument inference · So `ZZ32` with `ZZ64` gives `ZZ64`, and `ZZ64` with `RR64` gives the declared bound.
  - c4 · property · walk: static argument inference · With no narrowest candidate it takes its bound where every argument is below it (F-141), else the join.
  - c5 · defect · walk: static argument inference · Since walk promotes from run-time types, the two paths instantiate differently where a static type is wider than its value (row 509).
  - c6 · defect · walk: static argument inference · The rule misses a static argument that only the result mentions, at a typed binding (row 510), and a varargs or tuple parameter over mixed widths (row 511).
  - c7 · defect · walk: static argument inference · By inference, not measured, it misses a `ZZ32`-fitting numeral for a parameter whose bound a `ZZ32` neither extends nor coerces into (P-76).
  - c8 · tests · walk: static argument inference · Gated by `InferCoercionRungK.fss`.
  - c9 · pointer · · Detail in `rung-inference-walk/REPORT.md`.
- Overlap:
  - c1: F-55 ("Static arguments are inferred with coercion on both paths ... F-137 walk's"), F-73 (the checker's rule), F-173 (the specification's rule). Searched `InferCoercionRungK`, `P-74`, `narrowest`.
  - c2: F-141 (the lone type parameter's definition), F-73, F-173 (the same rule for the checker and the specification). Searched `lone type parameter`, `narrowest`.
  - c4: F-141 (whole claim). Searched `its bound`.
  - c5: none found (searched `row 509`).
  - c6: F-55 (row 510's program), F-92 (row 511). Searched `row 510`, `row 511`.
  - c7: none found (searched `P-76`).
- Checks: no finding. Scout: the test found; rows 509, 510, 511 agree. History (scout's Words): applied at the curator's word "apply all the improvements drafted", 2026-10-22, without review of each change.
- Shape: one subject. Title: walk infers with coercion; the body serves it.

## F-138, "Each integer type declares its own `MIN`, `MAX` and `MINMAX`"

- Claims:
  - c1 · property · the library: integer MIN and MAX · Each integer type declares its own `MIN`, `MAX`, `MINMAX`, `MAXNUM` and `MINNUM`.
  - c2 · property · walk: integer MIN and MAX · So under walk the family answers at the type its arguments promote to.
  - c3 · pointer · · It builds P-47.
  - c4 · property · walk: numerals with NN32 · Under walk an `NN32` operator with a numeral answers an `NN32`, the numeral converting into `NN32`.
  - c5 · defect · the compiled runtime: integer MIN and MAX · Compiled, `NN32` with `ZZ32` or `ZZ64` answers `ZZ` (row 442).
  - c6 · tests · the library: integer MIN and MAX · Gated by `IntegerMinMaxRungM.fss` and `IntegerMaxNumMinNum.fss`; c4 by `NumeralWithNN32.fss`.
  - c7 · pointer · · Detail in `rung-integer-minmax/REPORT.md`.
- Overlap:
  - c1, c2: none found (searched `MAXNUM`, `IntegerMinMaxRungM`, `MINMAX`).
  - c4: F-341 (a numeral converts where its place fixes a type). Searched `NN32`, `NumeralWithNN32`.
  - c5: F-173 (row 442: a `ZZ32` and an `NN32` instantiate at `ZZ`, `XXXInferPromoteNN32`). Searched `row 442`.
- Checks: stale: "row 442's text (read to 330 characters) names `^` on `ZZ64`, shifts, `GCD` and `LCM` on `NN32`/`NN64`, not MIN or MAX or 'NN32 with ZZ32 answers ZZ'. Kind: a ledger row's status disagrees. Source: scout-landed-1.md, F-138, Exists."
- Shape: one subject (integer MIN and MAX), with a side claim c4. Title: each type declares its own, so walk answers at the promoted type; the body serves it.

## F-139, "`RR32` is a sibling of `RR64` under `Number`"

- Claims:
  - c1 · property · the library: RR32's place · `RR32` is a sibling of `RR64` under `Number`, `RR64` converts from it, and nothing converts into it.
  - c2 · property · walk: RR32 arithmetic · Under walk two `RR32`s answer an `RR32`, and an `RR32` with an `RR64`, a float numeral or a `ZZ32` answers an `RR64`.
  - c3 · defect · walk: coercion at type checks · A typed binding converts an `RR32`, but a declared return does not (row 387).
  - c4 · defect · the compiled runtime: RR32 in the prelude · Compiled, `=` at the prelude's `RR32` overflows the stack, save `c = 0`, refused statically (row 528).
  - c5 · defect · the compiled runtime: RR32 in the prelude · Compiled, two `RR32`s answer an `RR64` (row 529).
  - c6 · tests · the library: RR32's place · Gated by `RR32SiblingRungV.fss`.
  - c7 · pointer · · Detail in `rung-rr32-sibling/REPORT.md`.
- Overlap:
  - c1: F-131 ("`RR64` converts from `RR32` too (F-139)"), F-79 (`RR32` from the numeral types), F-168, the skill (SKILL.md lists `RR32` among the siblings). Searched `RR32`, `siblings`.
  - c3: F-128 (row 387). Searched `row 387`.
  - c4: F-366 (`u = 0` at `RR32` refused, an ambiguous coercion, row 528). Searched `row 528`.
  - c5: none found (searched `row 529`).
- Checks: no finding. Scout: the test found; rows 387, 528, 529 agree.
- Shape: one subject (RR32), across paths. Title: `RR32` a sibling; the body serves it.

## F-140, "A size beyond `NN32` or `ZZ32` is refused by the compiled checker when it is a literal"

- Claims:
  - c1 · property · the checker: size range · The checker refuses a literal or folded size outside its kind: 0 to 4294967295 for `nat`, `ZZ32`'s range for `int`.
  - c2 · pointer · · It builds P-40.
  - c3 · property · walk: size range · Walk refuses such a size at run time, where it binds it to a static parameter.
  - c4 · property · walk: size arithmetic · Walk reads and computes a size exactly: as a value, a `ZZ32` up to 2^31-1 and a `ZZ64` above.
  - c5 · property · the checker: size range · The checker types such a value `ZZ32` (P-173, F-342).
  - c6 · defect · the compiled runtime: class loader size checks · The class loader checks no size it computes: `next[\nat k\]()` answers 4294967296 at `k = 4294967295` (row 675; F-222).
  - c7 · tests · the checker: size range · Walk's reading by `NatBigSizeWalk`; the refusals by `XXXNatRangeChecker`, `XXXNatArithRangeChecker`, `NatRtBigSize` and five `XXX...Walk` tests, each passing because its program is refused.
  - c8 · defect · walk: size range · An array of a static size from 2^31 to 2^32-1 stops at its store's factory where no catch sees it (row 527).
  - c9 · defect · the compiled runtime: sizes at run time · A size of 2^31 or more read as a value raises an uncatchable `java.lang.Error` compiled, and is a `ZZ64` under walk, where P-173 makes it a `ZZ32` (row 962, contested).
  - c10 · plan · the specification: size range · No decision says where such a size is refused.
  - c11 · defect · walk: size range · Under walk a `ZZ32`-declared return passes such a size on as a `ZZ64`.
  - c12 · pointer · · Detail in `rung-size-range/REPORT.md`.
- Overlap:
  - c1: none found for the checker's range (searched `4294967295`, `XXXNatRangeChecker`).
  - c4: F-74 ("A size used as a value is a `ZZ32` up to 2^31-1 and a `ZZ64` above ... (F-140; row 962)"). Searched `row 962`.
  - c5: F-342 ("A `nat` or `int` parameter read as a value is a `ZZ32`"). Searched `read as a value`.
  - c6: F-146 ("The compiled class loader can make a size outside its kind's range ... (row 675)"), F-222 ("The compiled class loader checks no size it computes against its kind ... (row 675)"). Searched `row 675`.
  - c8: none found (searched `row 527`, `makeJavaArrayStore`).
  - c9: F-129 (row 962, the same error), F-74. Searched `row 962`.
- Checks: no finding. Scout: all tests found; rows 527, 675 agree, 962 CONTESTED and the entry says so.
- Shape: several subjects (the checker: size range; walk: size range and size arithmetic; the compiled runtime: class loader size checks). Title: the checker and walk refuse out-of-range sizes, walk reads sizes exactly; the body serves it, but c6 and c9 belong to F-146/F-222 and F-129.

## F-141, "Under `walk`, a type parameter that nothing at a call fixes takes its declared bound"

- Claims:
  - c1 · property · walk: static argument inference · Under walk a type parameter that nothing at a call fixes takes its declared bound.
  - c2 · pointer · · It builds P-48.
  - c3 · property · walk: static argument inference · A lone one with no narrowest candidate takes its bound where every argument is below it, else the join (F-137).
  - c4 · property · walk: static argument inference · A parameter seen only in function domains an odd number of arrows deep is bounded from above and takes the meet of its bound and the arguments' bounds.
  - c5 · pointer · · An F-bounded parameter stays open (F-143).
  - c6 · property · walk: reduction instantiation · A reduction or comprehension with no static argument is fixed by its value's declared type, else its elements' join (F-228).
  - c7 · choice · walk: reduction instantiation · That rule is the coordinator's call.
  - c8 · choice · walk: static argument inference · By default D3, a parameter that only another fixed parameter's bound mentions takes that parameter's instance (row 592).
  - c9 · choice · walk: static argument inference · By default D5, a lone one whose bound mentions a static parameter takes the arguments' narrowest common supertype, never its bound.
  - c10 · defect · walk: static argument inference · Two bounds walk cannot meet (row 591), and two upper bounds from two function arguments (row 616), fail.
  - c11 · defect · walk: static argument inference · A bound only from above that mentions another static parameter keeps `Bottom` (row 612).
  - c12 · defect · walk: static argument inference · A parameter that only an untyped function expression's result fixes takes `Bottom` (row 587).
  - c13 · defect · walk: static argument inference · A generic is passed over at dispatch when its arguments have several minimal common supertypes (row 589).
  - c14 · plan · walk: static argument inference · Row 589's repair changes which declaration runs, and is the curator's to decide.
  - c15 · tests · walk: static argument inference · Gated by `tests/Infer*Walk.fss`.
  - c16 · pointer · · Detail in `rung-walk-instance`, `rung-walk-elements`, `rung-walk-meet` reports.
- Overlap:
  - c1: the skill (revival-changes.md:68, P-48); F-78 (the checker's rule: the intersection of upper bounds); F-55 ("a parameter that nothing fixes takes `Any`"); F-173. Searched `its bound`, `declared bound`.
  - c3: F-137 (whole), F-173 ("at its bound where no argument type is narrowest, on both paths"). Searched `lone type parameter`, `narrowest`.
  - c4: none found (searched `arrows deep`, `meet of its declared bound`).
  - c6: F-228 (whole), F-143. Searched `reduction or comprehension`.
  - c7: F-228 ("decision 6"); none other found (searched `coordinator's call`: F-239 uses it for another subject).
  - c8, c9: none found (searched `D3`, `D5`, `row 592`).
  - c10, c11: none found (searched `row 591`, `row 612`, `row 616`).
  - c12: F-173 ("the return type `BottomType` that walk gives a function expression that declares none (row 587)"). Searched `row 587`, `BottomType`.
  - c13: none found (searched `row 589`).
- Checks: no finding. Scout: tests found; rows 587, 589, 591, 592, 612, 616 agree.
- Shape: several subjects (walk: static argument inference; walk: reduction instantiation), with choices and a decision to take. Title: an unfixed parameter takes its bound; the body serves it but carries F-137's and F-228's rules and five defects.

## F-142, "Walk checks at load the Meet Rule for Functional Methods per providing type"

- Claims:
  - c1 · property · walk: Meet Rule for functional methods · Walk checks at load the Meet Rule for Functional Methods per providing type, over every trait, object and object expression.
  - c2 · property · walk: Meet Rule for functional methods · A type provides what it declares and inherits, not what its `override` declarations override.
  - c3 · property · walk: Meet Rule for functional methods · A generic type is checked through one type that stands for all its instances (F-145), skipping pairs whose parameter types mention a static parameter.
  - c4 · defect · walk: Meet Rule for functional methods · Symbolic operators are skipped, though the compiled checker checks them (F-281; row 611).
  - c5 · detail · walk: Meet Rule for functional methods · Checked, they would refuse only `EmptyString`'s `||`, which one declaration clears (F-245, measured at `d212b2c1f`).
  - c6 · pointer · · Walk's other refusals at load are in the skill's `references/interpreter.md`.
  - c7 · tests · walk: Meet Rule for functional methods · Gated by `tests/FunctionalMethodMeet*`.
  - c8 · pointer · · Detail in `rung-walk-meet/REPORT.md`.
- Overlap:
  - c1: F-7 ("F-142 (the Meet Rule for Functional Methods)"), F-80 (the checker's twin: the Meet Rule per providing type). Searched `Meet Rule for Functional Methods`, `FunctionalMethodMeet`.
  - c2: F-88 (the checker: what a type provides). Searched `provides`.
  - c3: F-145 (the same one-type reading of a generic type). Searched `stands for all`.
  - c4: F-245 ("Walk's meet check skips symbolic operators (row 611)"), F-276 (a program's own `||` meeting `String`, row 342). Searched `row 611`, `symbolic operator`.
- Checks: no finding. Scout: tests found; row 611 agrees; `d212b2c1f` not checked.
- Shape: one subject. Title: walk checks the Meet Rule per providing type; the body serves it.

## F-143, "Under walk, a type parameter whose bound mentions itself ... is left open"

- Claims:
  - c1 · property · walk: open F-bounded parameter · Under walk an F-bounded type parameter that nothing at a call fixes is left open, printed `OPEN`, below every type.
  - c2 · property · walk: reduction instantiation · A reduction or comprehension is first instantiated by its declared type or its elements' join (F-228), so the open parameter reaches only the cases neither fixes.
  - c3 · defect · walk: reduction instantiation · An empty `SUM` or `PROD` that no declared type directs takes `ZZ32`'s identity whatever its body's type (row 716).
  - c4 · defect · walk: open F-bounded parameter · Among overloads, a tuple, arrow or generic type holding the open type admits no more than at `BottomType`, so `pick(x: (T,T))` does not take `(1, 2)` beside `pick(x: Any)` (row 663, contested).
  - c5 · detail · walk: open F-bounded parameter · In a skeptic's probe, a method over an open `T` was the most specific and chosen for every argument; no gated test holds it.
  - c6 · defect · walk: open F-bounded parameter · A list comprehension at such an open parameter, and `List`'s strided range subscript on such a list, end in `CastError` at `List.fss:179` (row 825, contested).
  - c7 · tests · walk: open F-bounded parameter · Gated by `InferUnfixedFBoundedWalk`, `OpenTupleDispatchWalk`, `OpenParameterListComprehensionWalk`.
  - c8 · pointer · · Detail in `rung-walk-open-param` and `rung-body-arguments` reports.
- Overlap:
  - c1: the skill (revival-changes.md:68, SKILL.md "Under walk, one whose bound names the parameter itself stays open"); F-141 c5, F-228 ("an F-bounded parameter stays open"); F-114 (examples pass by the open parameter). Searched `F-bound`, `OPEN`, `stays open`.
  - c2: F-228 (whole), F-141 c6. Searched `elements' join`.
  - c3: F-228 (row 716). Searched `row 716`.
  - c4: none found (searched `row 663`).
  - c6: none found (searched `row 825`, `List.fss:179`).
- Checks: no finding. Scout: tests found; `List.fss:179` is the cast line; rows 663, 825 CONTESTED and 716 NEGATIVE-VERIFIED agree, contested stated. Stale lists for F-114 that its examples may now pass by F-228's join, unsettled.
- Shape: one subject, with F-228's rule repeated (c2, c3). Title: an F-bounded parameter is left open; the body serves it.

## F-144, "The identity-less reductions are typed at their element type"

- Claims:
  - c1 · property · the library: identity-less reductions · `AssociativeReduction[\R\]` lifts to `Maybe[\R\]`, and its `simpleJoin` and every `lift` take `R`.
  - c2 · property · walk: identity-less reductions · Walk refuses at load a reduction extending `AssociativeReduction` whose `simpleJoin` is at `Any`.
  - c3 · defect · walk: identity-less reductions · One with static parameters escapes that check and stops at its first join (row 665).
  - c4 · property · the library: identity-less reductions · A static argument that names the lifted type is `Maybe[\R\]`; with `AnyMaybe` the program stops under walk.
  - c5 · property · walk: identity-less reductions · With the element type unwritten, `BIG MINMAX` and the four tuple forms run under walk.
  - c6 · pointer · · A plain-bounded monoid operator with no static argument is instantiated as F-228 says, so `List`'s `BIG CONCAT` runs.
  - c7 · detail · walk: identity-less reductions · `BIG SQCUP` and `BIG SQCAP` ran in one measurement each with no test; `PrefixSet`'s `BIG UNION` and `PureList`'s `BIG CONCAT` were not measured.
  - c8 · tests · walk: identity-less reductions · Gated by `UnwrittenBigMinMaxWalk`, `UnwrittenTupleMinMaxWalk`, `UnwrittenBigOperatorsWalk`, `UnwrittenComprehensionElementsWalk`, `ReductionSimpleJoinAtAnyWalk`.
  - c9 · pointer · · Detail in `rung-reduction-types` and `rung-walk-elements` reports.
- Overlap:
  - c1: F-85 ("how the reductions without an identity are typed at their element type (row 628)"); the skill (revival-changes.md:130). Searched `AssociativeReduction`, `simpleJoin`, `identity`.
  - c2: none found (searched `simpleJoin`, `ReductionSimpleJoinAtAny`).
  - c3: F-145 (row 665: generic objects skip the cover check). Searched `row 665`.
  - c4: none found (searched `AnyMaybe`: F-44 names it for another subject).
  - c5: none found (searched `BIG MINMAX`, `MIN_MAX`).
- Checks: stale: "row 665's text is about the load check of an inherited abstract method that 'skips generic objects'; the entry cites it for a reduction with static parameters that 'stops at its first join'. Kind: a ledger row's status disagrees. Source: scout-landed-1.md, F-144, Exists."
- Shape: several subjects (the library: identity-less reductions; walk: identity-less reductions). Title: the reductions are typed at the element type; the body serves it.

## F-145, "Walk refuses at load an object that leaves an inherited abstract method uncovered"

- Claims:
  - c1 · property · walk: abstract method coverage · Walk refuses at load an object that leaves an inherited abstract method uncovered.
  - c2 · property · walk: abstract method coverage · Narrower bodies cover an abstract method only where they cover its parameter types with `comprises` clauses read, each combination inside one body (P-147).
  - c3 · property · walk: abstract method coverage · A search that does not settle refuses the object: a cycle, a symbolic or unreadable type, 10,000 steps or 4,096 combinations.
  - c4 · defect · walk: abstract method coverage · A generic object is not checked (row 665).
  - c5 · defect · walk: abstract method coverage · An object whose one covering definition has a static parameter of its own is refused though valid (row 728); the compiled path runs it.
  - c6 · property · the checker: abstract method coverage · The compiled checker covers the same way within the same bounds.
  - c7 · defect · the checker: abstract method coverage · Where the abstract method or a body has static parameters of its own, the checker does not split, and refuses an object whose cover needs a split (row 725).
  - c8 · pointer · · Walk's `override` check is F-147's and its Meet Rule check F-142's.
  - c9 · tests · walk: abstract method coverage · Gated by `tests/AbstractMethod*Walk` and `compiler_tests/AbstractMethodCoveredPairs`.
  - c10 · pointer · · Detail in `rung-walk-coverage` and `rung-duplicates-coverage` reports.
- Overlap:
  - c1: F-7 ("F-145 (uncovered abstract methods and `override`)"), F-88 ("an object below a trait that redeclares an inherited method abstract must define it", the checker); the skill (revival-changes.md:34). Searched `uncovered`, `abstract method`.
  - c2, c3: F-27 (the same cut of the overlap by `comprises` clauses and a search that does not settle, for overload covers). Searched `combination`, `does not settle`.
  - c4: F-144 (row 665, cited for another claim); the skill (revival-changes.md:34). Searched `row 665`.
  - c5, c7: none found (searched `row 728`, `row 725`).
  - c6: F-88. Searched `AbstractMethodCovered`.
- Checks: no finding. Scout: tests found; rows 665, 725, 728 agree.
- Shape: several subjects (walk: abstract method coverage; the checker: abstract method coverage). Title: walk refuses uncovered objects; the body serves it.

## F-146, "The compiled checker accepts arithmetic in a size"

- Claims:
  - c1 · property · the checker: size arithmetic · The compiled checker accepts arithmetic in a size.
  - c2 · pointer · · It builds P-55, the curator's decision on arithmetic in a size.
  - c3 · property · the checker: size arithmetic · Two sizes are the same where their written forms match once each operation on numerals is computed.
  - c4 · property · the checker: size arithmetic · They differ only as two different numerals or two different size parameters; any other pair is not known to differ.
  - c5 · defect · the checker: size arithmetic · So the checker calls a `typecase` clause unreachable that walk reaches at equal arguments (row 683, contested).
  - c6 · defect · walk: size arithmetic · Neither path infers a static parameter that a parameter type writes inside an operation (row 767).
  - c7 · defect · the compiled runtime: class loader size checks · The class loader can make a size outside its kind's range, where walk refuses it (row 675).
  - c8 · tests · the checker: size arithmetic · Gated by `compiler_tests/NatArith*`.
  - c9 · pointer · · Detail in `rung-size-expressions/REPORT.md` section 1 and 12.
- Overlap:
  - c1, c3, c4: F-176 ("two size arguments are identical when they are written alike once each operation ... Two sizes are known to differ when they are two different numerals"), the skill (revival-changes.md:83). Searched `P-55`, `written form`, `known to differ`.
  - c5: none found (searched `row 683`).
  - c6: F-176 (row 767, `IntNat.unifyStaticArg`). Searched `row 767`.
  - c7: F-140, F-222 (row 675). Searched `row 675`.
- Checks: no finding. Scout: tests found; rows 675, 767 agree, 683 CONTESTED agrees; "Item 15, 15a with its part (b)" is bold text at line 16 inside section 1, not a heading.
- Shape: one subject (the checker: size arithmetic), with c6 and c7 from other subjects. Title: the checker accepts size arithmetic and compares by written form; the body serves it.

## F-147, "Walk refuses an `override` that overrides nothing"

- Claims:
  - c1 · property · walk: override check · Walk refuses an `override` that overrides nothing.
  - c2 · property · walk: override check · An inherited declaration is overridden where each non-self parameter type is a subtype of the `override`'s and not all are equal (`traits.tex:585-589`).
  - c3 · property · walk: override check · At an instance of a generic trait that a non-generic object extends, equal parameter types still count as overridden.
  - c4 · property · walk: override check · Walk checks a generic type's `override` once, at its declaration.
  - c5 · property · walk: override check · An object below an abstract `override` with no body is refused at load (rows 614, 649).
  - c6 · defect · walk: override check · Walk does not read all static parameter bounds in an object expression or under a `where` clause, so it accepts some invalid `override`s (row 693).
  - c7 · pointer · · The skill gives the rule's cases (`references/interpreter.md`).
  - c8 · tests · walk: override check · Gated by `tests/Override*Walk.fss` and `AbstractOverrideUndefinedWalk`.
  - c9 · pointer · · Detail in `rung-walk-override/REPORT.md`.
- Overlap:
  - c1: F-400 ("the checker refuses an `override` that overrides nothing ... as the traits chapter and walk do"); the skill (interpreter.md:89, revival-changes.md:32). Searched `override`, `overrides nothing`.
  - c2: the skill (revival-changes.md:32 "strictly narrower"); F-400 ("equal parameter types included"). Searched `strict subtype`.
  - c5: F-88 (the checker: an object below a redeclared abstract method must define it), F-145. Searched `row 614`, `row 649` (no other entry).
  - c6: F-400 (rows 1107, 1108: the checker's own `where`-clause and object-expression gaps). Searched `row 693`.
- Checks: no finding. Scout: tests found; rows 614, 649 FIXED, cited as evidence, agree; row 693 agrees; `traits.tex:585-589` found.
- Shape: one subject. Title: walk refuses empty overrides and states the overriding rule; the body serves it.

## F-148, "Under walk, a `where` clause's bound on a static parameter bounds that parameter alone"

- Claims:
  - c1 · property · walk: where-clause bounds · Under walk a `where` clause's bound on a static parameter bounds that parameter alone.
  - c2 · detail · walk: where-clause bounds · The bound goes into the parameter's own extends list, since every unbounded parameter of a load shares the top type's one list.
  - c3 · tests · walk: where-clause bounds · Gated by `WhereBoundOverloadWalk.fss` and `OverrideAfterWhereBoundWalk.fss`.
  - c4 · pointer · · Detail in `rung-walk-override/SKEPTIC.md` section 3.
- Overlap:
  - c1: none found (searched `extends list`, `WhereBound`, `where` clause); F-250, F-256, F-181 hold the checker's and code generator's `WhereBound*` tests, a different rule.
- Checks: no finding. Scout: both tests found.
- Shape: one subject. Title: a `where` bound bounds its parameter alone; the body serves it.

## Subject labels used

- the checker: abstract method coverage: F-145
- the checker: case without operator: F-133
- the checker: comprises where-clause opening: F-121
- the checker: imported top-level variables: F-120
- the checker: memory on FortressLibrary: F-121
- the checker: numeral defaults: F-118, F-123, F-131
- the checker: size arithmetic: F-146
- the checker: size range: F-140
- the checker: two instantiations of one trait: F-129
- the code generator: arrow coercion: F-128
- the code generator: clause-bound names: F-134
- the code generator: dispatch with static bounds: F-129
- the code generator: generic beside plain: F-136
- the code generator: generic dotted methods: F-136
- the code generator: generic tasks: F-129, F-135
- the code generator: imported top-level variables: F-120
- the code generator: numeral constants: F-118
- the code generator: task arms: F-134
- the code generator: template dispatchers: F-136
- the compiled runtime: class loader size checks: F-140, F-146
- the compiled runtime: compiler library ranges: F-133
- the compiled runtime: generic constructors: F-129
- the compiled runtime: integer conversions: F-124
- the compiled runtime: integer MIN and MAX: F-138
- the compiled runtime: integer overflow: F-124, F-132
- the compiled runtime: integer power: F-132
- the compiled runtime: integer shifts: F-124, F-125, F-126
- the compiled runtime: mutable variable cells: F-117
- the compiled runtime: printing of values: F-118, F-123
- the compiled runtime: RR32 in the prelude: F-139
- the compiled runtime: sizes at run time: F-129, F-140
- the compiled runtime: wrapping operators: F-130
- the harness and the gate: cold-cache tests: F-119
- the library: AnyIntegral comprises clause: F-121
- the library: coercions between number types: F-131
- the library: flat number tower: F-131
- the library: identity-less reductions: F-144
- the library: integer MIN and MAX: F-138
- the library: Random's generator: F-130
- the library: rounding of floats: F-122
- the library: RR32's place: F-139
- the library: scalar extension of arrays: F-119
- the library: scalar ranges: F-133
- the library: the name `shift`: F-126
- the library: wrapping operators: F-130
- the specification: size range: F-140
- walk: abstract method coverage: F-145
- walk: arrow coercion: F-128
- walk: coercion at type checks: F-128, F-139
- walk: exclusion of instantiations: F-129
- walk: fixed-width overflow: F-132
- walk: identity-less reductions: F-144
- walk: instantiation at a string argument: F-123
- walk: integer MIN and MAX: F-138
- walk: integer shifts: F-125
- walk: library operator overload check: F-119
- walk: Meet Rule for functional methods: F-142
- walk: numerals at places: F-131
- walk: numerals near a tie: F-122
- walk: numerals with NN32: F-138
- walk: open F-bounded parameter: F-143
- walk: override check: F-147
- walk: reduction instantiation: F-131, F-141, F-143
- walk: RR32 arithmetic: F-139
- walk: size arithmetic: F-140, F-146
- walk: size range: F-140
- walk: static argument inference: F-137, F-141
- walk: strided ranges: F-133
- walk: tasks: F-135
- walk: where-clause bounds: F-148

## Entries that overlap

- Integer shifts and conversions: F-124 (compiled), F-125 (walk), F-126 (`shift` name), F-132 (shifts raise nothing), F-172 (the specification's integer rules), F-327 (shifts over `AnyIntegral`), F-331 (conversions).
- Overflow of fixed widths: F-124 (compiled), F-132 (walk), F-24 (a native raises catchably), F-316 (`GCD`, `LCM`, `CHOOSE` results), F-172.
- Numerals' defaults and constants: F-118, F-131 c3-c4, F-123 c6 with F-74, F-79, F-341, F-342, F-340, F-347.
- Unsigned printing: F-118 c7 and F-313.
- Sizes as values and out of range: F-129 c4-c5, F-140 c4-c9, F-74, F-342, F-146 c7, F-222 (rows 962, 675).
- Size arithmetic and comparison: F-146 and F-176 (rows 767; P-55).
- Static argument inference under walk: F-137, F-141, with F-55, F-73, F-173 (the checker and the specification) and F-78.
- Reduction instantiation and open parameters: F-141 c6, F-143 c2-c3, F-144 c6, F-131 c9, with F-228 (owner) and F-344.
- Flat tower and `RR32`: F-131, F-139, F-168, F-79, and F-366 (row 528).
- Scalar extension and the cold-cache check: F-119, F-151, F-269, F-318.
- Opening of `where`-clause variables: F-121 c3 with F-146, F-251, F-270.
- `AnyIntegral`'s clause: F-121, F-62, F-171.
- Template dispatchers: F-136 and F-45 (and F-273 for row 496).
- Clause-bound names: F-134 and F-71.
- Generic tasks and sizes: F-135 and F-129 c6.
- Meet Rule and coverage at load: F-142, F-145, F-80, F-88, F-7, F-245, F-27 (the same cover search).
- Overrides: F-147, F-400, F-88.
- Two instantiations of one trait: F-129 c11-c12 with F-48, F-167 (row 414) and F-44, F-91, F-155, F-252 (row 416).
- Wrapping operators in the prelude: F-130 c3, F-32, F-306 (row 348).

## Not settled by the search

- F-117 c2 (an arrow-typed mutable variable runs): no test and no other entry; the entry says its tests run none.
- F-118 c3: which numerals reach the code generator's fallback is not measured, and no row holds it.
- F-121 c4 and c5: two defects with no row (the ill-formed clause; the 4 GB memory limit); no other entry names them.
- F-129 c5 against F-140 c9: one row 962, cited as plain fact in F-129 and as contested in F-140 (stale-claims).
- F-138 c5: row 442's text, as the scout read it, does not hold the claim (stale-claims); F-173 cites the same row for `ZZ32` with `NN32` at inference.
- F-144 c3: row 665 holds another claim (stale-claims); I found no other row cited for a reduction that stops at its first join.
- F-148: the search found no other entry on walk's extends-list rule, so it cannot say whether the checker reads the same.

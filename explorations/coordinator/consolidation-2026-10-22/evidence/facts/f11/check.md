<!-- The clarity workflow's check of FACTS chunk f11: each rewritten entry of proposals.md against the record, its cited sources and the code, and the cold reader's answers against the source meaning, with each failure classed. -->

# FACTS chunk f11: the check

Read on `main` at `34fbf49d4`; FACTS's text of these entries is the text the assessment read at `4caa90c81`. For each entry I read `facts-extract.sh 'F-N'` and, where a claim moved, `'history:F-N'`, the gap-ledger rows it names, the report section it cites, and the code and test lines behind each changed sentence. One measurement, to settle a present-tense claim of F-118: the skeptic's probe `s3` (`git show ab067d9b6^:explorations/compile-ladder/repair-r2-literal-wrap/probes/skeptic/s3.fss`), its two binding lines, run under today's walk with private caches and temporary folder in my scratchpad (`/tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/f11probe/s3now.fss`, output `s3now.out` beside it). Nothing in the tree changed.

## F-118

**Fidelity.**

1. "walk refuses the same program with a type error." This is stale. The source is the R2 report, "The failure-mode question": walk "refuses the coercion outright (`probes/skeptic/s3.walk`, 'RHS expression type Long is not assignable to LHS type NN64')". That capture is of 2026-09-19 (R2, `6a63980bb`). Since `917bb7b32` (2026-09-27), walk's `Long` addition raises `IntegerOverflow` (F-132). Today `x = 9223372036854775807` then `n: NN64 = x + x + 1` stops at `x + x` with `IntegerOverflow`, rc 1 (`s3now.out`: `s3now.fss:5:19-15: IntegerOverflow`). The assessment, not the old entry, supplied the walk clause. The cold reader asked whether this was a refusal at load or at run time; the question goes away with the fix.
2. "keep their values, as under walk". Under walk a numeral keeps its value at `ZZ` and `ZZ64`, but walk refuses a numeral bound to `NN32` or `NN64` (F-57; the R2 report's divergence table, row `r2b`, "walk refuses the coercion"). The next sentence names the gate at `ZZ`, `ZZ64`, `NN32` and `NN64`. So the cold reader took "as under walk" to cover all four ("Walk keeps the value too").
3. The title says "cannot compare two numerals beyond `ZZ64`". The six comparisons convert both sides with `asZZ64` (`LibraryBuiltin/CompilerBuiltin.fss:912-917`), so one operand beyond `ZZ64` is enough. Row 328 says "comparing a numeral outside `ZZ64` throws". The title reads as if both operands must be beyond it.

The rest passes. The bit-length split is at `CodeGen.java:3892-3916`. The test asserts the numerals at the four types and no `IntLiteral` arithmetic (`IntLiteralWrapRepairR2.fss:28-59`; its `NN64` sum at `:59` is `NN64` arithmetic). The probe's `n = m` is `true` (`s3.compiled`), so "keeps its value compiled: observed" holds.

**Comprehension.** The cold reader lacked `IntLiteral`. "Representation by its exact bit length" and "compiled world" were unclear to it. It also could not tell whether rows 326 and 328 have tests. Both rows' reproducer is `none`.

**Class.**
- Wording, for point 1, settled by the run: "walk stops the same program at `x + x` with `IntegerOverflow`, since its fixed-width addition raises (F-132)." Or drop the walk clause.
- Wording, for point 2: "as walk does at `ZZ` and `ZZ64` (walk refuses a numeral bound to `NN32` or `NN64`, F-57)".
- Wording, for point 3, in the title: "cannot compare a numeral beyond `ZZ64` with another numeral".
- Wording: "the code generator carries a numeral as an `int`, a `long` or its decimal string, by its exact bit length". Keep the title's "compiled world", since live files quote it, but write "compiled path" in the body. Optional: "neither row has a test".
- Concept: `IntLiteral`, as `concepts.md` has it (the core, numbers).

## F-119

**Fidelity: pass.** The writer's correction of the assessment is right. `compile-ladder/rung-library-comments/REPORT.md` section 4 says the fixture's `+` pair is refused on a cold cache without the `Array3` exclusion, a warm cache passes it, and the cold run on the branch loads it. Commit `02d09a39f` says both tests were "each run from an empty FORTRESS_CACHES, red on the tree before this edit and green after". So the pairs pass the check. The bounds are at `Library/FortressLibrary.fss:4906-4915`. One small loss: "Its tests are" drops the word "gated", although both tests are in `tests/` and are gated.

**Comprehension.**
- "declares pairs of library operator names" was read literally. The fixture declares two overloads each of three library operator names, `MINMAX`, `+` and juxtaposition (`test_library/ArrayOperatorVocabulary.fsi:3-10`).
- "So the tests show that the pairs pass that check only when they run from an empty cache" has two readings (cold reader, (a) and (b)).
- Which bound goes with which operator is left to inference.
- The folder of `ArrayOperatorsBesideLibrary.fss` is not given. It is `tests/`.

**Class.**
- Wording: "Gated by `tests/ArrayScalarExtension.fss` and `tests/ArrayOperatorsBesideLibrary.fss`. The second imports the fixture `test_library/ArrayOperatorVocabulary`, which declares two overloads each of `MINMAX`, `+` and juxtaposition over the library's arrays. Walk checks such overloads against the library's only on a cold cache (F-?2). So a pass of that test shows that they coexist with the library only if the run started from an empty cache."
- Wording: "`T` is bounded by `Number` and `AdditiveGroup[\T\]` for `+` and `-`, by `Number` and `StandardMin[\T\]` for `MIN`, and by `Number` and `StandardMax[\T\]` for `MAX`."
- Concept: cold cache, as `concepts.md` has it (`references/tests-running.md`).

## F-?2 (new, from F-119)

**Fidelity.**

1. "Walk writes a component to its cache before it runs this check, and skips the check on a component that it reads back". This is row 342's claim. The row's notes narrow the cause: "The suppressor is the library's `interpreter_parsed_cache/FortressLibrary*` entry: a user declaration is checked against a library functional method only when the library is re-analyzed." The ablations show it. With the program's own entries deleted from either cache, the run is green, so no check runs (`run-c4/cold-cache/CAPTURES.md`, ablations A and B). With the library's entries deleted, the refusal returns (C). The entry drops this condition. The cold reader concluded that "never again" lasts until "an edit of a source", which is wrong for an edit of the program.
2. "the check can refuse them ... C4's pair `opr MAX[\I\](s: RR64, a: Array[\RR64,I\])` (gap-ledger row 341)". C4 no longer has this pair. Row 341's notes say "Fixed: C4's own failure, its declarations dropped once `02d09a39f` generalised the library's scalar extension", which is F-119's block (`run-c4/cold-cache/ROWS.md`). The present tense reads as a live case. "Pair" also stands beside one signature, as the cold reader noted. The pair was the `(s,a)` and `(a,s)` orders (row 341's history text).
3. The writer's question for the curator, whether the conditions "behind an api" and "in a component that only exports it" should come back. The sources settle it. The minimisation in `run-c4/cold-cache/CAPTURES.md` measured one declaration in one component (`mini`, `p1`) and one behind an api with an importer (`p2`, `p5`): both green cold. Two declarations behind an api (`p4`, `p3`) fail cold. Two in the program's own component are refused too: F-155's `apl/mg/elemwise_nat_probe.fss`, one component, is refused beside `MultiplicativeRing.×`. So the old conditions named the measured layouts, and those layouts are the two places where a program can declare an operator. The wider wording follows row 341 and the measurements, for generic declarations of `MAX`. No curator question is needed.

**Comprehension.**
- "Even a more specific one" has two readings. Row 341's examples, a sized `+` over `Vector`, mean a program's declaration that is more specific than the library's.
- "The rank-specialised `×` of F-155" names nothing that the reader can see.
- The reader could not tell whether the count of declarations runs over the program or over one component.

**Class.**
- Wording, for point 1, after the cache sentence: "The check runs only when walk analyses the library itself again: removing or editing the program's own cache entries does not bring it back (row 342's notes)."
- Wording, for point 2: "as it refused C4's former pair of `MAX` between an `RR64` and an `Array[\RR64,I\]`, in both orders, which C4 dropped when F-119's scalar extension took its place (row 341)".
- Wording: "even one more specific than the library's", and "the `Matrix`-specialised elementwise `×` of `apl/mg/elemwise_nat_probe.fss` (F-155)".
- Uncertain fidelity, settled: point 3. Keep the wider wording, and drop the question.
- Concept: cold cache. The definition `concepts.md` proposes for `references/tests-running.md` should also say that, for this check, the entry that matters is the library's parsed-cache entry (row 342).

## F-121

**Fidelity.**

1. "the comment stays by that item's default, which is not a ruling." This contradicts P-44, which is the curator's decision: "Beside the clause stays a comment in the team's `NOT YET` form ... here `comprises Integral[\I\] where [\I\]`, whose `where` form is not built." His word of 2026-09-21 answered the question "Keep the closure, with a NOT YET comment ... Recommendation: keep" (`positions-audit/full/evidence/judgement-c3.md`, P-44; quote below). The source that F-121 cites says the same: "the closure stays as landed with its `NOT YET` comment" (`process-engineering/facts-slice-2.md`, point 1). PLAN's A.skeptic.1 asks a later question: now that the checker opens such variables, does the comment become live? Its default leaves the comment. The rewrite turns a ruling into a default. The cold reader drew the wrong conclusion from it: "The clause stays commented only by that item's default, which is not a curator decision."
2. "P-151 builds, of the team's commented `where` clauses, only `AnyList`'s." The PLAN item asks only about clauses "of the same form", `comprises ... where`. P-151 also built other forms that the team wrote down (conditional extension, a method's condition, the commented-out generic `distribute`). The sentence is true only of `comprises` clauses.

The rest passes. "Not measured" quotes `facts-slice-2.md`. F-146 opens `nat` and `int` variables, and F-251 a type variable. `PLAN.md:457` holds the item and its default. The title's "no decision says whether it is a valid clause" holds: P-44 keeps the comment and does not rule on validity.

**Comprehension.** "Tower closure" is a record handle, F-62's title, and is in no skill. "The closure as written stands" does not say which clause stands.

**Class.**
- Wording, for point 1: "The comment stays by P-44, which kept it beside the live clause when its `where` form was not built. Whether it becomes live now that the checker opens such variables is an open question in PLAN, 'Climb batch 17, listed for his review', item A.skeptic.1, whose default leaves it."
- Wording, for point 2: "of the team's commented `comprises ... where` clauses".
- Wording, in the title and the body: "`AnyIntegral`'s `comprises` clause" for "the tower closure"; "The live clause, which lists `ZZ32`, `ZZ64`, `ZZ`, `NN32` and `NN64`, stands (P-44), and the compiled checker accepts it (F-62)."
- Concept: a `where` clause in a `comprises` list, and opening its variable, as chunks f9 and f10 list them.

## F-122

**Fidelity.**

1. "The compiled NaN and saturation are observed in the report's differential and read in the code ...; no compiled test gates them." This implies that walk's are gated. They are not. `tests/RoundHalfEvenRungR.fss` has 21 assertions of ties and non-ties on `RR64` and `RR32`, and no NaN or infinity (the file; the report, "The test, first"). Walk's NaN and saturation were observed in the rung's walk probe ("The recorded failure and the recorded pass": "NaN, which gives 0; ±∞ and ±`exp(100)`, which saturate") and read in the code (`Float.java:384`, `RR32.java:326`). No test of either path asserts `round` of NaN or of an infinity (a grep of `tests/`, `library_tests/` and `compiler_tests/`).
2. "on the compiled path by `library_tests/RR64FunctionsRungF.fss`". That test covers `RR64` only (`:87-92`). The compiled `RR32` ties were observed in the first skeptic's probe (report, "Differentials", item 2, `SkRoundComp.txt:15-17`).

**Comprehension.** The cold reader could not tell which floats are meant, `RR64` and `RR32`. It could not tell what saturation reaches: the `ZZ64` bounds, since `round` lands in `ZZ64` ("What landed"; `RR64FunctionsRungF.fss:84-85`). It could not tell which paths row 360 holds on: both, by the row's claim.

**Class.**
- Wording, for point 1: "NaN and saturation are gated on neither path: they were observed in the report's walk probe and compiled differential, and read in the code (`(long) Math.rint` in `Float.java:384`, `RR32.java:326` and `simpleDoubleArith.java:132-134`)."
- Wording, for point 2: "on the compiled path, for `RR64`, by ...".
- Wording: "`round` on an `RR64` or an `RR32`"; "saturates to the `ZZ64` bounds"; "on both paths (row 360)".

## F-123

**Fidelity.** "A generic object's static arguments also print differently, but there walk is wrong: ... where the compiled `Cell[\String\]` is the specification's answer (row 364)." This generalises from the string case. Row 364 says "Only the string case is asserted: a numeral's type is `NaturalNumeral[\n,10,v\]`, which neither path implements". The report, "Defects and their homes", item 7: `Cell(3)` gives walk `Cell[\Int\]` and compiled `Cell[\IntLiteral\]`, and neither is the specification's. The cold reader concluded "For generic objects, the compiled text is the reference". Rows 321 ("declaring or inheriting") and 363 pass.

**Comprehension.** "A Java class with a `toString` of its own" was unclear to the cold reader. The source is `stringOps.java:75-86`: a value whose run-time Java class declares its own Java `toString`, such as `FRR32`, prints by it (report, "The repair round"). For row 363 the reader could not tell which side is right. The specification is silent there (report item 4), and the row is classed against the prelude.

**Class.**
- Wording: "For a string argument walk is the one that is wrong: it takes the argument from the run-time class, so `Cell("s")` prints `Cell[\FlatString\]`, where the compiled `Cell[\String\]` is the specification's answer (row 364). For a numeral argument neither path gives the specification's type."
- Wording: "A value whose run-time Java class declares its own `toString`, such as the compiled `RR32`'s, prints by it." Optional, for row 363: "the specification is silent".

## F-124

**Fidelity.**

1. "multiplication uses `Math.multiplyExact`". This holds on `ZZ64` only (`simpleLongArith.java:70-76`). On `ZZ32`, `intOverflowingMul` takes the 64-bit product and checks its range (`simpleIntArith.java:74-75`, `longOverflowingToInt` `:94-97`). The conclusion, a raise on every overflow, holds on both widths. The writer's note "(and `simpleIntArith.java`, the same shapes)" is wrong for multiplication.
2. The gate names one test, `IntSemanticsRungB.fss`. That test asserts the minimum checks (`:94-99`), the zeros (`:88-93`, `:109-115`) and the `ZZ64` multiplication overflow (`:117-120`), but no overflow of an addition or a subtraction. Those are asserted by the team's compiled `library_tests/Integer3.fss:97-104`, through `Integer.test`. So the claim is gated, but by a test that the entry does not name.

**Comprehension.**
- "Give 0 or the sign" leaves open which operator gives which. The report, section 1(a), says that a left shift gives 0 and a right shift the sign.
- "`<<`, `>>` and `<<<` are unchanged" uses a history word, and the reader lacks the difference between the two families of shift.
- `narrow` is not explained: `ZZ64.narrow` and `NN64.narrow`, report section 1(d).
- "Raise" names no exception. It is `IntegerOverflow`.
- "So `|0|` and `-0` answer 0" does not follow on a plain reading. The old guards, `x == -x`, also fired at 0 (report section 1(c)).

**Class.**
- Wording, for point 1: "multiplication computes the exact product (`Math.multiplyExact` on `ZZ64`, a range-checked 64-bit product on `ZZ32`)".
- Wording, for point 2: "Gated by `compiler_tests/IntSemanticsRungB.fss`, and for addition and subtraction by the team's `library_tests/Integer3.fss`."
- Wording: "`LSHIFT` gives 0 and `RSHIFT` the sign"; "`ZZ64`'s and `NN64`'s `narrow` to 32 bits keeps the low 32 bits"; "raise `IntegerOverflow`"; "Negation, absolute value and division overflow only at the minimum value and test exactly for it, so the minimum raises and `|0|`, `-0` and `0 DIV -1` answer 0"; "`<<`, `>>` and `<<<` keep their own rules".
- Concept: the two families of shift, `LSHIFT` and `RSHIFT` beside `<<`, `>>` and `<<<`, and the conversions `narrow` and `widen`. They are used by F-124, F-125, F-130 and P-69, and belong in `references/library.md`, numbers.

## F-125

**Fidelity.** "`ZZ`'s `shift(x, k)` is ⌊x·2^k⌋ at any count." The sentence is P-69's design, stated as what walk does. Walk raises a catchable `IntegerOverflow` on a positive count beyond `Integer.MAX_VALUE`, and on a result that a JVM `BigInteger` cannot hold (report section 4.4, `BigNum.java:246-247`). The gate that this entry names asserts it: `tests/IntSemanticsRungI.fss:97-99`, `3 LSHIFT 4294967296` and `3 RSHIFT` the `ZZ64` minimum overflow. So "at any count" is stronger than what is built. The rest passes: P-69, sections 4.3 and 4.4, and F-126 for the prelude.

**Comprehension.** "Give 0 or the sign" has the same two readings as in F-124. "The four fixed widths" are not named, though the reader resolved them.

**Class.**
- Wording: "`ZZ`'s `shift(x, k)` is ⌊x·2^k⌋, and raises a catchable `IntegerOverflow` where the result is too large for the JVM's `BigInteger` (report section 4.4)."
- Wording: "On `ZZ32`, `ZZ64`, `NN32` and `NN64`, a count at or beyond the width gives 0, or -1 for `RSHIFT` of a negative value" (P-69's words).

## F-?1 (new, from F-125)

**Fidelity: pass.** `IntSemanticsRungI.fss:112-155` asserts `GCD` and `LCM` on `ZZ32`, `ZZ64` and `ZZ`. Row 385 (fixed) is `NN32`'s and `NN64`'s `0 LCM 0`, asserted at `:158-159`. `CHOOSE` is at `PowChooseLcmRungE.fss:70-72`. Section 7 says "The library does not depend on the sign".

**Comprehension.**
- "A result that its type cannot hold raises" has an unclear scope. The test asserts `MIN GCD 0` (`:123`) and `MAX CHOOSE 2` (`PowChooseLcmRungE.fss:66`).
- "The old `LCM`" and "now computes" are history words.
- `DOT` and `CHOOSE`'s operand order are not given.

**Class.**
- Wording: "A `GCD`, `LCM` or `CHOOSE` result that its type cannot hold, such as `MIN GCD 0`, raises `IntegerOverflow` (F-132)."
- Wording: "`LCM` carries no sign, so code that takes a direction from it must compute the sign itself, as the team's `tests/RangePrototype.fss` does with `(a DIV (a GCD b)) DOT b`, `DOT` being multiplication." Move "the old `LCM`" to the note line.
- Wording: "`n CHOOSE k`".

## F-128

**Fidelity: pass.** A varargs parameter converts (`CoercionCallRungC.fss:39-41`). The three limits are the report's: section 5, "Tuple-typed targets", "Stated limits: varargs, keyword and arrow targets are not converted and not measured", and section 11. "Not built" stands for the report's "not converted", a limit read in the code (section 1: "a varargs element ... stays the loud error it was"). Rows 387, 513 and 395 say what the entry says.

**Comprehension.** The cold reader did not know which kinds of target belong to which coercion. The specification settles it (`Specification/basic/conversions-coercions.tex`, "Coercions for Tuple and Arrow Types"). Varargs types and keyword-type pairs are conditions of tuple coercion, and arrow coercion is a rule of its own. The reader also asked how "not built" is known without a measurement.

**Class.** Wording: "Not converted, by the code, and not measured: a varargs or keyword element of the specification's tuple coercion, and its arrow coercion."

## F-129

**Fidelity.** It mostly passes: P-41, sections 1 and 9, and rows 307, 408, 412, 413, 414 and 416. Two points:

1. The title, "a program whose sizes are known at compile time loads, dispatches and runs compiled", is broader than the body. Row 413's sized form "stops the compile", and row 414's `object O[\nat n\] extends { Vec[\n\], Vec[\3\] }` "die[s] at load".
2. "a size with no `extends` clause gets the bound `Object`". Row 412 gives every static parameter with an empty `extends` clause the bound `Object`, "sizes included". The entry's narrower form confused the cold reader, since a size has no `extends` clause in the skill.

A note on the writer's "Meaning" line, which does not touch the entry. The text before 2026-10-13 cited row 307 only as provenance ("rows 307, 402", `FACTS-history.md:1243`), not as a limit. The limit rests on row 307, F-36 and F-146, which say it.

**Comprehension.** The reader could not place row 413's "concrete generic bound" or tell when its arm "fails". It could not tell which program or answer row 416 means.

**Class.**
- Wording, for point 1: "..., apart from the open cases below".
- Wording, for point 2: "the compiled path gives every static parameter with no `extends` clause, a size among them, the bound `Object`, not the specification's `Any` (row 412)".
- Wording: "a dispatched overload arm whose static parameter has a concrete generic bound stops the compile in its sized form and dies at load in its type form (row 413)"; "walk refuses at load `g(b: Tg[\3\])` beside `g(b: Tg[\4\])`, which the compiled run dispatches (row 416)".
- Concept: the run-time descriptor, as `concepts.md` has it.

## F-130

**Fidelity.** "That is right only where the modulus divides 2^width, so a modulus that is not a power of two gives wrong numbers (row 700)." Row 700's notes keep a second condition: "the state agrees with the true one modulo `modulus` only where no step overflows or where `modulus` divides 2^w". The notes also give the evidence: "By reading, not run". The entry drops the first condition and does not say how the defect is known. "Not a power of two" is also wider than "divides 2^width": the cold reader noted that a power of two above 2^width fails too.

**Comprehension.** The reader could not tell what the prelude does with ⨰. It declares no `DOTTIMES` at all, and its `DOTCROSS` saturates (row 348; `CompilerBuiltin.fss:599`, `:684`; a grep of the prelude finds no `DOTTIMES`). `widen` is not explained.

**Class.**
- Wording: "By reading, not run (row 700): `Random`'s `LinearCongruential` computes `(mult DOTTIMES widen(state)) DOTPLUS add` and only then takes `MOD modulus`. So it agrees with the true state only where no step overflows or where the modulus divides 2^width of its type `N`. The library builds it only with the modulus 2^48, where it is right."
- Wording: "The compiler prelude's ∔ and ∸ saturate, and it declares no ⨰ (row 348)."
- Concept: `widen`, with `narrow`, in `references/library.md` (see F-124).

## His quotes

HIS 2026-09-21T17:08:18.165Z | Okay. One of us has amnesia or deja vu because I am pretty sure I've already approved this. We are writing not yet and the checker's recommendation. Uh, not checkers. There, there was a tracer and whatever it recommends, let's do that.

<!-- Chunk f0 of the FACTS clarity assessment: F-151, F-261, F-262, F-263 and F-264, each marked on the six criteria of `explorations/reviews/revival-record-synthesis.md`, "Per-entry assessment rubric", with a disposition, before any rewrite. Read on `main` at `df0728b81`. -->

# FACTS chunk f0: assessment

The base is `main` at `df0728b81`. I read each entry with `facts-extract.sh 'F-N+'` and `'history:F-N'`. Then I followed its cited evidence in bounded sections: the reports, the tests, the library and the code. I ran no experiment and searched no transcript.

| Entry | Scope | Present meaning | Evidence | Comprehension | Ownership | Consistency | Disposition |
|---|---|---|---|---|---|---|---|
| F-151 | pass | pass | **fail** | **fail** | pass | pass | **reword** |
| F-261 | pass | pass | pass | pass | pass | pass | keep |
| F-262 | pass | pass | pass | pass | pass | pass | keep |
| F-263 | **fail** | **fail** | pass | **fail** | **fail** | **fail** | **reorganize** |
| F-264 | pass | **fail** | pass | **fail** | **fail** | pass | **reorganize** |

Counts: keep 2, reword 1, reorganize 2, investigate 0. Every fail below has a known resolution, so none needs a question settled first.

## F-151, the bound of `Vector` and `Matrix`

- **Scope: pass.** The title and the body name the same declarations. The library has the bound on 32 api lines and 29 component lines (`grep -c` on `Library/FortressLibrary.fsi` and `.fss`; `.fsi:1616`, `:1736`). The entry says that the walk test gates it under walk, and claims no more.
- **Present meaning: pass.** It states the current bound and why each of its two traits is there.
- **Evidence: fail.** The pointer for the pending answer is stale. Quoted: "The bound is array fork 2's default, the curator's answer pending (PLAN item 52, P-85)." PLAN has no item 52 now. Item 52 is in PLAN-history (`PLAN-history.md:284`), and it records how fork 2's held half landed as climb batch 13b, not the bound. The answer that is still pending is at PLAN item 13, fork 2 (`PLAN.md:164`), and at review-queue item 31 (`review-queue.md:268-274`). Both say that the bound waits for his review. So the claim is supported, but by sources other than the one it names. The rest of the entry is supported: `Number` declares only `asFloat` and `=` (`FortressLibrary.fsi:286-294`; its parents `AnyAdditiveGroup` and `AnyMultiplicativeRing` are empty, `:261`, `:273`). The point about the closure is `reviews/array-fork2-judgement.md` section 2.5, "`Number`'s closure is doing work". `tests/ArrayElementAlgebra.fss` exists.
- **Comprehension: fail.** Two passages need context from the history:
  - "The first factories build their vectors and matrices per number type (F-229), and the norm's call checks (F-227)." The phrase "first factories" (`array1` and `array2`, by F-229 and row 685) is not defined. The entry does not say that these two sentences tell where the bound's former costs, rows 685 and 686, were fixed. "Checks" can mean "is checked" or "passes the check".
  - "overload validly only through its closure". "Closure" is not a word that the language uses. The judgement's sense is that `Number`'s `comprises` clause is closed, so an element type excludes the arrays and `String`. The reader must know this to see why the mirror pairs are valid.
- **Ownership: pass.** It has one subject, the family's bound. The sentences about other entries are pointers.
- **Consistency: pass.** F-119, F-227 and F-229 agree with the entry. Note: P-85 begins "The array design's three questions are open, with no default". Fork 2 is not one of those three, and it has a default, so the reference to P-85 can mislead. The fix is the pointer (see Evidence). The entries do not conflict.
- **Disposition: reword.** Point the pending answer at PLAN item 13 (fork 2) and review-queue item 31, in place of PLAN item 52. Say what the closure gives. Change the "first factories" sentence so that it tells which factories it means and how they relate to the bound, or drop it and keep only the pointers.

## F-261, `unsigned` and an unsigned power under walk

- **Scope: pass.** "Under walk" is the condition. The measurement was under walk, with a `ZZ32` base and the `ZZ32`-to-`NN32` `unsigned`.
- **Present meaning: pass.** It states what `unsigned` does now and the result of the power.
- **Evidence: pass.** `reviews/integer-power-fable-judgement.md` section 8 measured it once, at `3f463d3b5`. That was before rung I changed walk's power natives. By reading, the result still holds:
  - `ZZ32.java` (the `unsigned` native, `:54-60`, `:213-216`) has no commit since `3f463d3b5`.
  - `FNN32.getLong` gives the unsigned value (`FNN32.java:31-33`).
  - `Int.powCount` passes it through as a positive count (`Int.java:270-282`).
  - Rung I's test asserts that a `ZZ32` 2 raised to an exponent beyond 64 bits raises `IntegerOverflow` (`tests/IntegerPowerContractWalk.fss:121`).

  The entry says that no test checks this case, which is true.
- **Comprehension: pass.** "Not a sign error" is clear from the sentence: the error does not say that the exponent was negative.
- **Ownership: pass.** It has one subject.
- **Consistency: pass.** It agrees with F-263: every integer exponent type is accepted, and a large positive power of 2 overflows. No other FACTS entry speaks of `unsigned`.
- **Disposition: keep.**

## F-262, a numeral's sign and its type

- **Scope: pass.** "On either path" is shown for each path: walk's `Int` (F-74), and the compiled path's literal folding before the checker.
- **Present meaning: pass.**
- **Evidence: pass.** The entry says "By reading", and each citation holds:
  - `Misc.scala:468-469` types every `IntLiteralExpr` as `INT_LITERAL`.
  - `IntegerLiteralFoldingVisitor.java:152-153` folds `prefix -` into a new literal, and the file folds no `^`.
  - `lexical-structure.tex:1053-1080` defines a numeral with no sign.
- **Comprehension: pass.** "A numeral of that type" refers to `IntLiteral` in the clause before it. The reader can restate the consequence: `10^16` and `10^(-16)` reach the power with exponents of the same type.
- **Ownership: pass.**
- **Consistency: pass.** It agrees with F-74 and with P-153's reason ("no type tells a negative exponent from a non-negative one"). The entry does not name P-153, which uses it. This is not a fail.
- **Disposition: keep.**

## F-263, the integer power by contract E

- **Scope: fail.** Two passages:
  - The title: "Every integer power answers its base's own type; at a negative exponent the bases 1 and -1 give their exact power, 0 raises `DivisionByZero`, and any other base `IntegerOverflow` (contract E)." The body limits this to the interpreter's library under walk ("The compiled path's own library still answers 0 at a negative exponent"). It also has an exception for the numeral type ("answers a `ZZ32` value under walk"). The title says neither.
  - "Walk's values moved only at a negative exponent, in the team tests `realArith`, `compoundArray` and `simpleExp` and the demos `BiCGSTAB`, `BiCGSTAB2` and `npbft`". The consolidation (`bd33a2f8b`) wrote this when it merged in F-247. F-247 limited the claim to the team tests and demos. Rung I's own report lists walk values that moved at a nonnegative exponent: `(1/2)^(big(3))` (walk stopped before), an `NN64` exponent of 2^63 or more (`0^(2^63)` was `1.0`), and a `ZZ` or numeral base beyond the int's range (`3^(2^32)` was `1`) (`compile-ladder/rung-integer-power/REPORT.md` section 9, point 3). The text before the consolidation said "one beyond 64 bits included; `(1/2)^(big(3))` is `1/8`" (history, the 12:51Z block). The merge dropped this.
- **Present meaning: fail.** Quoted: "So the distance's six power sites are gone, `strToInt`'s by `fail[\ZZ32\]` (row 747), and the second export error loses `MultiplicativeRing`'s entry, 44 entries to 43." Also: "..., which now write a float base". The reader must reconstruct rung I's before and after to read these sentences.
- **Evidence: pass.** Each retained claim is found where the entry cites it:
  - rung I's report, section 1 (the natives and the edited tests and demos) and section 4 (the six sites; "The second goes from 44 entries to 43");
  - `perf-probes/integer-power/REPORT.md` sections 1.3, 1.6 and 3, and section 7 for microGPT's one integer power;
  - the three tests, which exist.

  The one claim that is broader than its support is counted under Scope.
- **Comprehension: fail.** Two passages:
  - "(contract E)" is the probe's letter for the contract. P-153 does not use it, and a new reader cannot resolve it.
  - "the numeral type follows the same rules, though its power, like all its arithmetic, answers a `ZZ32` value under walk (row 578)". Under walk a numeral is an `Int` (F-74). Row 578 is about the `IntLiteral` object reached by name. So the reader cannot say what the sentence means for a program.
- **Ownership: fail.** The entry mixes several subjects:
  - the contract (current behaviour);
  - its repair (the sites gone, the export error's entries, the team tests and demos rewritten);
  - counts that F-53 owns;
  - the compiled path's gap, which P-153's "Still to build" and rows 441 and 523 own.

  Quoted: "So the distance's six power sites are gone, ... 44 entries to 43."
- **Consistency: fail.** F-264, from the same batch, says "the second export error's entries did not move". F-263 says "44 entries to 43", and names no tree. Climb batch 20's RECORD (line 118) says that each count is of its own rung's tree, but neither entry says so. Smaller points:
  - F-263 cites "(rows 441 and 523)" for the compiled path's negative exponent. Row 441 holds that behaviour. Row 523 is the compiled overflow, as P-153 assigns it.
  - Outside FACTS, row 441 still says that walk's `2^(-1)` is `0.5`. F-263 makes that false. The ledger row should be fixed in the pass.

  F-84 and P-153 agree with the contract.
- **Disposition: reorganize.**
  - Keep the contract, scoped in the title to the interpreter's library under walk. Keep its exponent types, `QQ`'s exponent, the numeral exception (said so that a reader can use it), the compiled path's gap as a pointer to P-153 and rows 441 and 523, and the tests.
  - Move to the history and rung I's report: the six sites, the export error's 44 to 43, and the list of rewritten team tests and demos.
  - Keep, if a sentence earns it, "microGPT's only integer power, `strToInt`'s, has a nonnegative exponent".
  - Scope "values moved" to the tree's tests and demos, or drop it.
  - The incoming pointers must still hold: F-84 (the powers' type and `QQ`'s exponent), F-245 (a family moved), and P-153 ("F-263 states it as built").

## F-264, the array sites and the first export error

- **Scope: pass.** The counts are limited to "on the rung's tree". The walk claim is limited to "the tree's tests and demos", and it names the case that moves (`CastError` from a `replica` that does not conform).
- **Present meaning: fail.** The entry describes a repair, not a property. Quoted: "The array code's 19 typecheck sites and the api's first export error are gone, by the library's own devices and decision E's diff." Also: "The distance went 31 to 11 and the count 28 to 9 on the rung's tree, nothing come, as the probe measured on the same text; the second export error's entries did not move." The current properties are in the entry, but as a diff:
  - `Vector` and `Matrix` declare `fill` and `tabulate` at their own type (`FortressLibrary.fsi:1625-1626`).
  - Their arithmetic bodies are typed through `cast` (`.fss:2536-2542`, `:2857-2861`).
  - The api declares what the component has.
  - A `replica` that does not conform raises `CastError`.
- **Evidence: pass.** The support is found and holds:
  - rung A's report: section 1 (the five devices, 1a to E3); section 4 (31 to 11; kind typecheck 29 to 10; the first export error's 17 entries gone; "landed 44 entries, now 44"); and section 5 (`ant testSystem` 666 of 666, the microGPT quick pair passes);
  - `SKEPTIC.md` section 3, finding 3 (`CastError`);
  - the probe's matching numbers, and `e3-rebased.patch`, which changes 17 operator lines;
  - `tests/VectorMatrixCastsWalk.fss`, which exists.
- **Comprehension: fail.** Several phrases need the batch's context:
  - "decision E's diff" is shorthand; P-40 names the patch.
  - "nothing come" is not clear English: it means that no new error came.
  - "the rung's tree" names no rung.
  - "an array that is not one": "one" is a `Vector` or a `Matrix`.
- **Ownership: fail.** It holds subjects that change apart:
  - the leaf `fill` and `tabulate`, whose subject F-158 owns and which F-158 points to F-264 for;
  - the casts and the `CastError` they now raise;
  - the api's dead sizes, which P-40 and F-35 own;
  - `immutableArray`'s ranks 2 and 3 and `array3(v)` in the api;
  - the distance and count figures, which F-53 owns.

  Quoted: "`Vector` and `Matrix` redeclare `fill` and `tabulate` at their own type; the library's `cast` types their parent-typed bodies, the size-tested factory arms and `Col`'s and `Row`'s subscript value; the api drops its 17 operators' unused sizes (P-40), puts `immutableArray`'s ranks 2 and 3 in a comment, as the component has them, and declares `array3(v)`."
- **Consistency: pass.** F-35, F-158 and P-40 agree with the entry: 17 operators by the same patch, and `fill` and `tabulate` redeclared with the meet's bodies. The count of the second export error differs from F-263's. This entry limits its counts to its rung's tree only through the clause before them. The fix belongs to F-263 (see there).
- **Disposition: reorganize.**
  - Keep as the entry's subject the current state: the family's arithmetic bodies and factory arms are typed through the library's `cast`. State the walk consequence: `CastError` from a `replica` that does not conform, at `+`, binary and unary `-`, `scale`, and `pmul` (`pmul` for `Vector` only). Say that the casts hold at the eight number types, with the test.
  - Move the `fill` and `tabulate` redeclaration into F-158, or leave it as a pointer there.
  - Leave the dead sizes to P-40 and F-35, with a pointer.
  - Move the distance and count figures and the export error's entries to the history and the report.
  - After the move, repoint F-35's and F-158's references to F-264.

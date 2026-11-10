<!-- Orientation admission, update mode, for climb batch 29b's landing: which of the landing's FACTS and POSITIONS entries change `.claude/skills/fortress-repo/references/revival-changes.md`. Standard: `explorations/reviews/revival-record-synthesis.md`, "A small change to the existing process" and "Recovered admission rule, workflow runs and transcript search pointers". Read against the orientation as `a41378d7a2` (2026-11-09 12:34) last changed it, on `main` at `5f35b1d058`. Each entry compared with its text at the batch's base (`git diff b5b0f82c13 HEAD --word-diff=plain -- explorations/coordinator/FACTS.md explorations/coordinator/POSITIONS.md`, read entry by entry); P-37, P-40, P-165, P-173, P-174 and P-176 also against `cac54a1bf1` and `51b048ea1c`, which changed them after the orientation's last change and before the base. -->

# Climb batch 29b: orientation admission

Nine entries are admitted. They make three edits, all in "Numbers":

1. **A program's own number type takes a numeral through a coercion generic over the numeral's numbers, and no numeral value exists when a program runs (P-174, F-79, F-342, P-173, P-40, P-37, F-341).** This rewrites the rule "A numeral converts where it stands (P-173)" (`:89`) and its second paragraph (`:91`).
2. **No `=` ties a numeral type to a number type, and the numeral types declare no `asFloat` (P-165, F-346, F-341).** This corrects "`Number` declares nothing (P-165)" (`:99`) and deletes the example `(h = 0.5)` at `:89`.
3. **A folded expression reaches a program's own type only through its coercion from the folded value's type (P-174).** This qualifies "An expression of numerals alone folds exactly" (`:93`).

The landing is climb batch 29b, the static numerals. It replaces the field numerals that climb batch 29 built and that the orientation now describes. The orientation was last changed at climb batch 29's landing, before the curator rewrote P-174, split out P-176 and added P-37's exception (`cac54a1bf1`), and before he scoped P-40's bound to sizes (`51b048ea1c`). So most sentences of `:89`, `:91` and `:99` that speak of the numeral's type are now false. RECORD.md, "Left for the coordinator and the skill writer", names `:89` with its `(h = 0.5)`. Rung A's REPORT.md, section 6, names `:91` and `:99`. The post-batch review, Part 3, items 2 to 4, names all three. Each was checked here against the tree, by reading and by four walk probes at `5f35b1d058`, run from a scratch folder with private caches and not kept. Their outputs are quoted in the rows.

The defaults that these edits correct come from three sources:

- **The orientation's own text.** It says that a numeral holds its exact value, that a program's coercion reads the getters `digits`, `fractionDigits`, `radix` and `digitValue`, that a compiled program writes `coerce(x: IntLiteral)`, that the numeral types declare `asFloat`, and that `(h = 0.5)` is `true`.
- **The pretraining quiz.** It says that "`IntLiteral` is the type of integer literals", and that a literal type "coerces to the context's type. This allows `x: RR64 = 3`" (`reviews/fortress-pretraining-quiz.md:156`, `:162`).
- **The core.** "A `nat` or `int` parameter used as a value is a `ZZ32`" (`SKILL.md:133`).

The mistakes are on record. The batch rewrote eight of its own tests that were written to the old forms. Every one of the orientation's old coercion forms now stops under walk. Regression cases 16 and 26 now have wrong keys, and `interpreter.md:23` gives a workaround that answers wrongly.

Every other entry falls in one of these groups:

- It changed only its line citations: 30 FACTS entries, and P-163, P-166, P-171 and P-175. P-165 did too, but it is admitted for its change at `cac54a1bf1`. P-76 changed one word.
- It is a measure.
- It is compiled-path or walk detail that an area part owns. Per the curator's comment of 2026-11-08 (`6ec749a8eb`), path behaviours go to `interpreter.md` and `compiler.md` as defects with their rows.
- The orientation already states it.

Several area parts and the core now hold false sentences. They are listed under "Elsewhere".

**Inputs.**

- The landing: base `b5b0f82c13`; rung A `a26e74f5c8` and rung T `fcfd0aeb31`; `c6ef2f0b80` (rows closed), `17e93a7da8` (the gather record), `eb8a592455` (the review's corrections), `a2be3e9e1d` (the gate's tables); the record landing, `36e60805e6` and `5f35b1d058`. Also read:
  - `compile-ladder/climb-batch-29b/RECORD.md`, all of it from "Rows opened";
  - `record-landing/diff.md` and `owed.md`, "For the coordinator";
  - `reviews/batch-29b-review.md`, Part 3;
  - `compile-ladder/rung-static-numerals/REPORT.md`, sections 1, 5, 6 and 11;
  - ledger rows 442, 957, 966, 971, 973 and 974;
  - review-queue items 487 to 489.
- The orientation, 28,031 bytes (`wc -c`), read whole. Also read: `SKILL.md`, the prior orientation admission (`climb-batch-29/orientation/admission.md`), `interpreter.md:15-26` and `compiler.md:34`, `:65`, `:103-111`.
- The evidence searched:
  - `tools/orientation/regression/key.md`, cases 5, 16, 26 and 31;
  - `reviews/fortress-pretraining-quiz.md:156`, `:162`, `:253`;
  - `git diff b5b0f82c13 HEAD` over `ProjectFortress/tests`, `compiler_tests` and `library_tests`, for test lines in the old numeral forms;
  - the prelude, `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:90-450`, and the library's numeral types, `Library/FortressLibrary.fsi:455-470`.
- The probes, under walk at `5f35b1d058`:
  - `n: NN32 = 3`, `u: NN32 = 0`, `q: QQ = 1/2` and `r: RR64 = 3` compared with numerals: `n = 3 ... false`, `u = 0 ... false`, `NOT (u = 0): true`, `u = z, z: NN32 = 0: true`, `q = 0.5 ... false`, `r = 3 ... true`;
  - a coercion `coerce(x: NaturalNumeral) = D(x.digitValue)`: 'Type requires static arguments: FortressLibrary.NaturalNumeral';
  - the generic form, `= D(x.digitValue)`: 'Non-object receiver (): () trying to invoke method digitValue';
  - the generic form, `= E(v)` for `value object E(k: ZZ32)`: 'Unification error: Closure/Constructor for E param 1 ($k:ZZ32) got arg 7:ZZ of type ZZ';
  - `t: Tally = 2 + 3`, for a `Tally` that has only its numeral coercion: 'RHS expression type ZZ32 is not assignable to LHS type Tally', where `a: Tally = 5` gave 5.

**The test.** An entry is admitted only if a worker would act differently without it, and the mistake that it prevents has evidence: a failure on record, the regression quiz, or the pretraining quiz. It is also admitted where it makes an orientation sentence false (climb batch 26's F-318, climb batch 29's edit 4). An entry is not admitted if the orientation already states it, if an area part owns it, or if it changes no action. Its row then says where it belongs.

## The entries

| Entry | Admitted | Reason | Section it changes, or where it belongs |
|---|---|---|---|
| P-174 | **yes** (edits 1 and 3) | **Default assumption.** Three defaults:<br>- The orientation's `:89`: the numeral types "hold the numeral's exact value". Its `:91`: "A program's own number type receives a numeral through its own `coerce(x: NaturalNumeral)` or `coerce(x: RadixPointNumeral)`. Its body reads the numeral's getters `digits`, `fractionDigits`, `radix` and `digitValue`." This is climb batch 29's field design.<br>- Pretraining: a numeral is a value of a literal type that the conversion receives at run time (`fortress-pretraining-quiz.md:156`, `:162`), as Haskell's `fromInteger` receives an `Integer`.<br>- The orientation's `:93`: a folded expression "is one numeral, which converts as above". So `t: Tally = 2 + 3` would reach `Tally`'s numeral coercion.<br>**Correction.** A numeral's type exists only at compile time. It is `NaturalNumeral[\n, r, v\]`, or `RadixPointNumeral[\n, m, r, v\]` with a radix point. Its static arguments are the numeral's numbers: the digit count, the digits after the point, the radix, and the digits read as one integer in that radix. So `3.125` is a `RadixPointNumeral[\4, 3, 10, 3125\]`. No numeral value exists when a program runs, so a numeral type has no getters, no `asFloat`, no `asString` and no `=` with a number type. A type takes a numeral through a coercion generic over those numbers, as `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = Byte(v.asZZ32)`, whose body reads them as `ZZ` values. Any other expression of numerals alone folds first. It reaches a program's own type only through that type's coercion from the folded value's type, as `coerce(q: QQ)` for `10/20`, since coercions do not chain.<br>**Mistake prevented.** Under walk, each of the orientation's forms stops, and no message names the fix:<br>- `coerce(x: NaturalNumeral)` stops at load: 'Type requires static arguments: FortressLibrary.NaturalNumeral'.<br>- The generic form that reads `x.digitValue` stops when the place runs: 'Non-object receiver (): () trying to invoke method digitValue'. Walk binds `x` to `()`.<br>- `t: Tally = 2 + 3` is refused: 'RHS expression type ZZ32 is not assignable to LHS type Tally'.<br>All three are this admission's probes.<br>**Evidence.**<br>- The batch's own tests were written to the old forms (`coerce(x: NaturalNumeral)`, `x.digitValue`, `x.fractionDigits`, `asFloat(x)`, `x.asString`, `coerce(x: IntLiteral)`, `coerce(x: FloatLiteral)`), and rung A rewrote them (`git diff b5b0f82c13 HEAD`). There are eight: `tests/NumeralOwnTypeWalk.fss` (nine such lines), `NumeralAtReturnWalk.fss` and `NumeralGenericOwnTypeWalk.fss`, and `compiler_tests/LiteralTypeUnwritable.fss`, `NumeralCoercionOnceCompiled.fss`, `NumeralCoercionRaisesCompiled.fss`, `XXXFloatLiteralValuePrint.fss` and `XXXNumeralCoercionGenericTypeCompiled.fss`.<br>- Row 960's reproducer still reads the deleted getters (`record-landing/diff.md`, C65).<br>- Rung A's REPORT.md, section 6, names `:91`'s sentences false.<br>- Pretraining quiz `:156`, `:162`. | "Numbers": rewrite `:89`'s sentences on the numeral's type and `:91`'s coercion sentences (edit 1). Qualify `:93` (edit 3). |
| F-79 | **yes** (edit 1, with P-174) | The landed form in the one library:<br>- the numeral types are traits whose static parameters are the numbers;<br>- none declares a method;<br>- no value of them exists when a program runs;<br>- no `=` pair ties them to a number type;<br>- each number type converts by a coercion generic over the numbers;<br>- the checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under both libraries, and the prelude declares them too (`compiler/Types.java:85-95`; `CompilerBuiltin.fsi:394-398`).<br>It is the ground for edit 1's "no `IntLiteral` or `FloatLiteral` on either path". Default, mistake and evidence are P-174's and P-37's. Leave out its helper names (`numeralToDouble`, `numeralToFloat`) and `RR64 comprises Float`: they are natives detail. | as P-174 |
| P-37 | **yes** (edit 1, the prelude clause) | **Default assumption.** The orientation's `:89`: "Until the switch-over, the compiler's prelude names them `IntLiteral` and `FloatLiteral`". Its `:91`: "Until the switch-over, a compiled program writes `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)`". Pretraining: "`IntLiteral` is the type of integer literals" (`:156`), and "This allows `x: RR64 = 3`" (`:162`).<br>**Correction.** P-37's exception, added at `cac54a1bf1`: until the switch-over, the prelude carries P-174's and P-176's design. So a compiled program writes the same numeral types and the same generic coercion, and no `IntLiteral` or `FloatLiteral` exists on either path. One gap remains. The prelude's `RR64` and `RR32` declare a coercion from `RadixPointNumeral` only (`CompilerBuiltin.fsi:400-402`, `:443-444`), so a compiled `x: RR64 = 3` is refused: write `3.0` (row 442). Item 489 asks whether P-37's exception adds that coercion. Its default is "left to the switch-over, as landed".<br>**Mistake prevented.** Two mistakes:<br>- A compiled program or test that writes `coerce(x: IntLiteral)` stops: 'IntLiteral is undefined.' (RECORD.md, "Rows closed", row 328).<br>- A compiled `x: RR64 = 3` is refused: 'Right-hand side has type NaturalNumeral[\1,10,3\], but declared type is RR64.' (review-queue item 489; rung A's REPORT.md, section 5).<br>**Evidence.**<br>- The five compiled tests that rung A rewrote from `coerce(x: IntLiteral)` or `FloatLiteral` (P-174's row).<br>- Pretraining quiz `:156` and `:162`.<br>- Item 489: `x: RR64 = 3` "is the most common numeral line of a float program".<br>- `library_tests/NumeralFoldFloats.fss:11` writes `16777217.0` to get past the gap (row 442's notes).<br>**Routing.** The review's Part 3, item 8, puts row 442's half in `compiler.md`. Here it stays in the orientation's own "Until the switch-over" sentence. That sentence must be rewritten anyway, and the part keeps the compiler library's limits in such sentences (`:7`). `compiler.md` may point to it. | "Numbers", `:89` and `:91`: replace the two prelude sentences with one (edit 1). The rest of P-37 (no other declaration added to the prelude) is `compiler.md:34`'s. That line needs the numerals exception beside it ("Elsewhere"). |
| P-173 | **yes** (edit 1, two clauses) | **Default assumption.** Two defaults:<br>- The orientation's `:89`: "A place fixes a type when its declared type is a numeral type, or has a coercion from the numeral type". The landing cut "or is a numeral type" from P-173 (C51), since a numeral type is written only as a parameter's type.<br>- The orientation's `:89`, "A `nat` or `int` parameter used as a value is a `ZZ32`", and the core's `SKILL.md:133`, which says the same with no exception.<br>**Correction.** A place fixes a type only by a coercion from the numeral type. A `nat` parameter used as a value is a `ZZ32` where it is a size (P-40). It is a `ZZ` where it is one of a numeral type's numbers in a coercion's body (P-173, as changed at `51b048ea1c`; P-174).<br>**Mistake prevented.** Two mistakes:<br>- A coercion body that passes `v` where a `ZZ32` is declared stops under walk: 'Unification error: Closure/Constructor for E param 1 ($k:ZZ32) got arg 7:ZZ of type ZZ' (probe). The checker refuses it too, since no coercion carries a `ZZ` into a `ZZ32`.<br>- A body that reads `v` at a fixed width overflows on a long numeral.<br>**Evidence.**<br>- Rung A's REPORT.md, section 11, defect 2: the patch's own `NN64` coercion read `v` through `jBigToZZ64`. It raised `IntegerOverflow` for `v` of 2^63 or more and stopped a program's load. It was repaired in `9f33376ad4`.<br>- The batch's tests write `v.asZZ32`, `r.asZZ32` and `m.asZZ32` (`tests/NumeralOwnTypeWalk.fss`, `NumeralStaticDesignWalk.fss`).<br>- `compiler_tests/NumeralStaticDesignCompiled` has a `v` beyond `ZZ64` (F-342). | "Numbers", `:89` (edit 1) |
| P-40 | **yes**, folded with P-173 (edit 1) | Its clause from `51b048ea1c`: the `NN32` bound is this implementation's, for sizes; a numeral type's four static parameters have none, and read as values they are `ZZ`. The orientation cites P-40 at the `:89` sentence that edit 1 changes. Default, mistake and evidence are P-173's. The rest of P-40 is unchanged by this landing and belongs to `compiler.md`: sizes checked, dead sizes, and the JVM length check. | as P-173 |
| P-165 | **yes** (edit 2) | **Default assumption.** The orientation's `:99`: "Each of the eight number types, and the two numeral types, declares its own `asFloat` into `RR64`". Regression key `:77` repeats it (case 5, "Partial").<br>**Correction.** The numeral types declare none, "since no numeral value exists when a program runs" (P-165, as changed at `cac54a1bf1`; P-174). Only the eight number types declare one.<br>**Mistake prevented.** A numeral coercion's body that calls `asFloat(x)` on its numeral parameter. Under walk `x` is `()` there (the getter probe).<br>**Evidence.** `tests/NumeralOwnTypeWalk.fss`'s `CC64` did exactly this before `a26e74f5c8`: `coerce(x: NaturalNumeral) = CC64(asFloat(x), 0.0)`. Rung A's REPORT.md, section 6, names the sentence false. | "Numbers", `:99` (edit 2) |
| F-341 | **yes** (edits 1 and 2) | Walk's landed form: a coercion from a numeral runs with the numbers bound as values of type `ZZ`, one result per place and type. And "`h = 0.5` is `false` for `h: QQ = 1/2`" (row 973). That makes the orientation's `:89` example "`(h = 0.5)` is `true` for `h: QQ = 1/2`" false. The probe agrees: `q = 0.5 ... false`. For the default, correction, mistake and evidence, see F-346. Its other clauses are walk mechanics, for `interpreter.md`: the refusal outside a coercion's `where` clause, and a folded constant at a library type converting outside the coercion. | "Numbers", `:89` and `:99` (edits 1 and 2) |
| F-346 | **yes** (edit 2) | **Default assumption.** At `=`, the other operand's type fixes the numeral's type (P-173's "a place fixes a type when its declared type has a coercion from the numeral type", read at `NN32`'s `=`). So `u = 0` is `true` for a zero `u: NN32`. Four sources say so: the orientation's `(h = 0.5)`; F-346 itself before this landing ("`u = 0` and `q = 0.5` are `true` through those pairs"); the design that `tests/XXXNumeralEqualsNumberWalk.fss` asserts; and regression keys 16 and 26.<br>**Correction.** No `=` ties a numeral type to a number type (P-174). Under walk, the numeral at `=` takes its default, which the library's `=` over `Any` fits as it is. So the existing rule, "two numbers of different types compare by `=` only where a coercion carries one into the other", applies to the numeral's default. `u = 0`, `0 = u` and `h = 0.5` are `false`, and `u =/= 0` is `true`, for `NN32`, `NN64` and `RR32` against an integer numeral and `QQ` against a radix-point one. `r = 3` stays `true` for `r: RR64`. Whether the numeral should convert there instead is open: row 973 is CONTESTED, and item 487's default is "as landed". The compiled prelude answers `true`. Write the comparison so that it does not depend on the answer: `z: NN32 = 0`, then `u = z`.<br>**Mistake prevented.** A test assertion, or a condition, that compares a typed value with a numeral answers `false` with no error. `if count = 0` for `count: NN32` takes the wrong arm.<br>**Evidence.**<br>- The probe at `5f35b1d058`: `n = 3` gave `false` for `n: NN32 = 3`, `u = 0` `false`, `NOT (u = 0)` `true`, `u = z` `true`, `q = 0.5` `false`.<br>- Regression key case 16's Scope recommends `assert(n = 3, msg)`, and its Evidence records `n = 3` printing `true` at `5febd82a78`. Both are wrong now.<br>- Key case 26 says "`q = 0.5` is `true` too".<br>- `interpreter.md:23` tells a worker to write `NOT (u = 0)`, which is `true` for a zero.<br>**Routing.** By `6ec749a8eb`, walk's mechanism, the `=` over `Any` fitting the default, goes in `interpreter.md`'s bullet. The orientation states the language: P-174's missing pairs, the open question, and the binding form. | "Numbers", `:99` (edit 2); `:89`, delete `(h = 0.5)` |
| F-342 | **yes** (edit 1, with P-173) | The checker's landed form. A `nat` or `int` parameter read as a value is a `ZZ32`, "but a `ZZ` where it is one of a numeral coercion's four numbers" (`scala_src/typechecker/staticenv/KindEnv.scala`, `getType`). `NaturalNumeral` and `RadixPointNumeral` are written only as a parameter's type, never as a type that an object or a trait extends. Default, mistake and evidence are P-173's. The orientation's "Write a numeral type only as the parameter type of a coercion or an operator" already covers the second point: do not add the extends case. Walk's laxity there is row 974, for `interpreter.md`. Its other clauses are checker detail: the join's result positions and the `typecase` selector (row 963). | as P-173 |
| F-57 | no, folded into edit 1 | Its change: the checker types a numeral by its own numeral type, `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]`, under the prelude and the one library alike, not `IntLiteral`. And the refused coercion is one "into the type parameter `T` itself". The first is edit 1's "no `IntLiteral`". The generic-code point is unchanged by this landing: `x + 1` over `T extends Integral[\T\]` fails the checker, and only `x.zero`, `x.one` and the witness `typecase` give a `T`. | the edit; `library.md` for generic numeric code |
| F-131 | no, folded into edits 1 and 2 | Below `Numeral` lie the two numeral types, which have no `comprises`, and each number type declares `=` at each *number* type it coerces from or into. The flat tower is already in the orientation (P-43), and the missing `=` pairs with numeral types are edit 2's. | the edits |
| F-324 | no, folded into edit 2 | One word: "an `=` at each number type". This is the source of edit 2's "no `=` with a numeral type". | the edit |
| P-172 | no, folded into edit 1 | It drops "which holds the numeral's exact value", and the prelude now declares `RadixPointNumeral` itself (`CompilerBuiltin.fss:890`). This is `:89`'s "and hold the numeral's exact value", which edit 1 rewrites. The rest is unchanged and in the orientation: exact into `QQ`, one rounding into `RR64` and `RR32`, the `RR64` default. | the edit |
| P-176 | no | One value per place, made once, the same on both paths. The orientation's `:91` already says "The coercion gives one value for each place where the numeral is written, and each run of that place reuses it". Cite P-176 there. Its change names rows 957 and 971, compiled departures, for `compiler.md` ("Elsewhere"). | cite at `:91`; `compiler.md:65`, `:108`, "Traps" |
| F-347 | no | New. On the compiled path every numeral's place is one value made before the program runs: a JVM constant, or a static final filled by the coercion's method of the four numbers. This is the code generator's mechanism for P-176, which the orientation states. Rows 957 (a place whose type names a type parameter) and 971 (a coercion with two calls of the program's functions in one operator fails the class's load; bind the operands to locals first) are compiled traps. | `compiler.md:65` ("What the code generator does"), `:108`, and "Traps of the compiled path" for row 971 |
| F-340 | no | The compiled fold: a folded constant at a typed place is its type's constant, rounded once from its exact value. A numeral as written is its type's coercion folded. The orientation states the one rounding and the one value per place. The rest is mechanics. | `compiler.md:65` |
| F-118 | no | The compiled path's numerals keep their values, through each type's coercion, and the `IntLiteral` comparisons (row 328) are gone. This matches every worker's default. | `compiler.md` if anywhere |
| F-262 | no | A negated numeral at a program's type is the type's own `-` on the coercion's result for the numeral, now on both paths (rows 961 and 968 closed). The orientation's `:91` already states it. `interpreter.md:25` and `compiler.md:109` still state the closed departures ("Elsewhere"). The exponent-overload point (`x^16` against `x^(-16)`) is library design and unchanged. | `interpreter.md:25`, `compiler.md:109`; `library.md` |
| F-128 | no | Walk does not convert by a coercion with its own static parameter "unless it is a numeral coercion" (row 513). A walk departure for coercions that are not numeral coercions. | `interpreter.md`, the coercion paragraph (`:15`) |
| F-129 | no | Walk's class loader writes a size read as a value as a `ZZ32`; beyond 31 bits it raises a `java.lang.Error` that no `catch` sees (row 962). The orientation's `:89` sentence on row 962 stays true. | `compiler.md` |
| F-112 | no | No test cites a `.tex` line, since `IntLiteralArithRung7.fss` is deleted. | `tests-writing.md`, "Names, comments, citations" (already) |
| F-169 | no | The specification's numeral types now have the four numbers as static arguments. A citation of the specification on numeral types cites the revival, not the team. | `specification.md`; `sources.md` for edit 1 |
| F-345 | no | The specification states the static numerals in the revision form. This is the text's side of edits 1 to 3. | `specification.md`; `sources.md` for edits 1 to 3 |
| F-180 | no | `CompilerBuiltin$IntLiteral` dropped from the `import java` gaps. Natives detail. | `interpreter.md`, "Natives" |
| F-53 | no | A gate measure: distance 0 and count 0 at climb batch 29b's gate. | `coordinator` skill, `references/batch.md`; `gate.md` |
| F-240 | no | The stages' times at this gate. | `gate.md`; `coordinator` skill |
| F-35 | no | Line citation only (`FortressLibrary.fsi:1364`). Api dead sizes. | `library.md` if anywhere |
| F-44 | no | Line citations only. The orientation states the exclusion rule (P-43, P-97). | none |
| F-58 | no | Line citation only. A measure of C4 under the checker. | none |
| F-63 | no | Line citations only. Api repairs. | none |
| F-74 | no | Line citations only. The orientation states the default by value. | none |
| F-78 | no | Line citation only. The orientation states P-48 and P-51. | none |
| F-85 | no | Line citation only. The library's cast device. | `library.md` if anywhere |
| F-168 | no | Line citation only. | none |
| F-173 | no | Line citation only. | none |
| F-175 | no | Line citations only. The orientation states P-60. | none |
| F-268 | no | Line citation only. `compiler.md` states row 889. | none |
| F-272 | no | Line citations only. | none |
| F-276 | no | Line citation only. | none |
| F-279 | no | Line citations only. A library slicing gap (row 808). | `library.md` if anywhere |
| F-285 | no | Line citations only. The orientation states row 731's written static argument. | none |
| F-286 | no | Line citations only. | none |
| F-301 | no | Line citation only. A performance measure. | coordinator record (perf) |
| F-302 | no | Line citations only. A performance measure. | coordinator record (perf) |
| F-303 | no | Line citation only. | none |
| F-305 | no | Line citations only. | none |
| F-306 | no | Line citations only. | none |
| F-307 | no | Line citations only. | none |
| F-311 | no | Line citation only. | none |
| F-312 | no | Line citations only. | none |
| F-315 | no | Line citation only. | none |
| F-321 | no | Line citation only. | none |
| F-327 | no | Line citations only. | none |
| F-330 | no | Line citations only. | none |
| F-332 | no | Line citation only. | none |
| F-334 | no | Line citations only. | none |
| P-76 | no | One word ("give" to "gave"). The orientation cites it for the exact conversion, which is unchanged. | none |
| P-163 | no | Line citation only. No worker calls a `Char`'s `asExprString`. | none |
| P-166 | no | Line citations only. The orientation's `SEQV` rule covers value objects. | none |
| P-171 | no | Line citation only. The orientation states it (`:62`, `:93`). | none |
| P-175 | no | Line citation only. Compiled argument parallelism: no worker writes differently. | `compiler.md`; PLAN |

## For the writer

**Budget.** The part is 28,031 bytes (`wc -c`), more than twice the 8K to 12K budget. `:89` is 1,755 bytes, `:91` 1,019, `:93` 1,100 and `:99` 828. Make the three edits add nothing net: the deletions below free about 500 characters.

Leave these out of the rule:

- the history of the field numerals and of `IntLiteral`;
- the helpers' names;
- the static final and the JVM constant;
- rows 957, 971 and 974;
- the `where` clause over the four numbers (`tests/NumeralWhereRefusedWalk.fss`), unless a sentence is free;
- the probes' messages.

They go to `sources.md` or to the area parts.

**Edit 1.** Keep the head, **A numeral converts where it stands (P-173).** Change these sentences of `:89` and `:91`:

- "Both lie below `Numeral` ... and hold the numeral's exact value." State instead:
  - The numeral's numbers are the type's static arguments, as `3.125` is a `RadixPointNumeral[\4, 3, 10, 3125\]`: the digit count, the digits after the point, the radix, and the digits as one integer (P-174).
  - The type exists only at compile time. No numeral value exists when a program runs, so a numeral type has no getters, no `asFloat`, no `asString`, and no `=` with a number type.
- "Until the switch-over, the compiler's prelude names them `IntLiteral` and `FloatLiteral`." Delete it, and delete `:91`'s "Until the switch-over, a compiled program writes `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)`." In their place, one sentence: "Until the switch-over, the compiler's prelude declares the same types and coercions (P-37), but its `RR64` and `RR32` take only a radix-point numeral, so a compiled program writes `3.0` there (row 442)." Do not claim that the prelude matches in full.
- "A place fixes a type when its declared type is a numeral type, or has a coercion from the numeral type": drop "is a numeral type, or" (P-173).
- "So `u: NN32 = 5` binds, `q: QQ = 0.1` is `1/10`, and `(h = 0.5)` is `true` for `h: QQ = 1/2`." Keep the first two examples. Delete the third (edit 2).
- "A `nat` or `int` parameter used as a value is a `ZZ32`, so `u: NN32 = n` is refused (P-173, P-40)." Add that this holds where the parameter is a size. A numeral coercion's numbers, read in its body, are `ZZ` values of any size (P-173, P-40, P-174). Keep the row 962 sentence after it.
- "A program's own number type receives a numeral through its own `coerce(x: NaturalNumeral)` or `coerce(x: RadixPointNumeral)`. Its body reads the numeral's getters ...". Write the generic form instead: `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])`, or `coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\])` with a radix point. Its body reads the numbers as `ZZ` values, so a `ZZ32` field takes `v.asZZ32`. One example: `value object Byte(b: ZZ32)` with `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = Byte(v.asZZ32)`.
- Cite P-176 at "The coercion gives one value for each place ...".

Keep the rest of `:89` and `:91`:

- the default and its places;
- the out-of-range refusal, with row 967;
- the narrowest default for a type parameter;
- "Write a numeral type only as the parameter type of a coercion or an operator";
- the minus on the coercion's result;
- "Without such a coercion, the type refuses a numeral";
- the `array1` and `array2` sentence.

**Edit 2.** At `:99`:

- In "Each of the eight number types, and the two numeral types, declares its own `asFloat` into `RR64`", delete "and the two numeral types" (P-165).
- After "Otherwise `=` is `SEQV` ... as for a `ZZ64` against an equal `RR64`", add the numeral case in about 300 characters. No `=` ties a numeral type to a number type (P-174). Whether `u = 0` for `u: NN32`, or `h = 0.5` for `h: QQ`, converts the numeral at the other operand's type is open (row 973). Under walk the numeral takes its default there, so this rule answers `false`. Bind the numeral at the type first, as `z: NN32 = 0`, then `u = z`. Do not explain walk's dispatch here: that is `interpreter.md`'s bullet.

**Edit 3.** At `:93`, "Any other result is one numeral, which converts as above or takes its default". Qualify it in about 200 characters:

- At a library number type, a folded constant converts from its exact value, as a numeral does.
- A program's own type takes it only through its coercion from the constant's default type, since coercions do not chain (P-174). So `h: Half = 10/20` needs `coerce(q: QQ)`, and `t: Tally = 2 + 3` is refused where `Tally` has only its numeral coercion.

**`sources.md`.** Map each edit to its sources:

- **Edit 1.** P-174, P-173, P-40, P-37, P-176, P-172; F-79, F-341, F-342; `Library/FortressLibrary.fsi:455-470`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:394-402`, `:443-444`; `Specification/basic/expressions/literals.tex:98-285`; rung A's REPORT.md, sections 1, 6 and 11 (defect 2, the `NN64` coercion's `jBigToZZ64`); row 442; review-queue item 489. The tests: `tests/NumeralOwnTypeWalk.fss`, `NumeralStaticDesignWalk.fss`, `NumeralTypeNoValueWalk.fss` and `compiler_tests/NumeralStaticDesignCompiled.fss`. Put the history in `sources.md`, not in the rule: the eight tests rewritten from the old forms, and this admission's probes.
- **Edit 2.** P-165, P-174; F-341, F-346, F-324; rows 973 and 966; review-queue item 487; `tests/XXXNumeralEqualsNumberWalk.fss`, `XXXNotEqualNumeral.fss`; this admission's equality probe at `5f35b1d058`.
- **Edit 3.** P-174, F-341, F-340, F-345; `tests/NumeralStaticDesignWalk.fss` (`h: Half = 10/20`); this admission's `Tally` probe.

## Elsewhere: sentences this landing made false (not the orientation's)

- **`SKILL.md:133`.** "a `nat` or `int` parameter used as a value is a `ZZ32`". Add that inside a numeral coercion its numbers are `ZZ` values (P-174, P-40; the review's Part 3, item 1). Optional, at `:71`: the fold gives "one exact value: a numeral, a quotient of two numerals or a boolean". At a program's own type that value is a constant of its default type, not a numeral (edit 3).
- **`interpreter.md`, walk's departures from "Numbers" (`:20-26`).**
  - `:21`: "its `digits` getter gives 2 for `00.5`". No getter exists. Write instead: the digit count `n` that its coercion sees is 2, not 3 (row 960). The row's reproducer reads the deleted getters, and the ledger owes a new one (C65).
  - `:23`: "`u =/= 0` is `true` ... Write `NOT (u = 0)`." Now `u = 0` is `false` too (row 973), so `NOT (u = 0)` answers `true` for a zero (the probe). State both: `u = 0` and `0 = u` are `false`, `u =/= 0` is `true`, and so are the `QQ` cases with `0.5`. Give the mechanism: the library's `=` over `Any` fits the numeral at its default, and walk keeps a declaration that fits as it is. Give the workaround from row 973: `z: NN32 = 0`, then `u = z`.
  - `:25`: row 968 is closed. Delete the bullet.
  - Add row 974: walk loads and runs a numeral type written as a static argument or as a type that an object or a trait extends. A test of it is an `XXX` test (`tests/XXXNumeralTypeWrittenWalk.fss`).
- **`compiler.md`.**
  - `:34`, "Do not add a declaration to the three prelude files": add P-37's exception. Until the switch-over the prelude carries the numerals' design (P-174, P-176). Item 489 is open on the `RR64` and `RR32` coercions from `NaturalNumeral`. This resolves the cold reader's conflict in `record-landing/cold-read.md:176`.
  - `:65`: "a program's own `coerce` from a numeral once for each place ..., except at a generic type". Now every numeral's place, at the library's types too, is one value: a JVM constant or a static final filled by the coercion's method (F-347). It runs at each evaluation only where the place's type names a type parameter (row 957).
  - `:108`: row 957 is now only a place whose type names a type parameter of its generic declaration.
  - `:109`: row 961 is closed. Delete the bullet.
  - `:111`: "a numeral keeps the type `IntLiteral`". Now its own numeral type, `NaturalNumeral[\1,10,7\]` (row 963).
  - "Traps of the compiled path", a new line for row 971. A numeral coercion whose body puts two calls of the program's own functions in one operator or one argument list fails its class's load. Bind the operands to locals first (the review's Part 3, item 7).
  - Row 442's half is in edit 1's prelude sentence. A pointer here is enough.
- **`library.md:23`.** "`ZZ32` and numerals convert into `RR64` implicitly". This is true of the one library. Until the switch-over, an integer numeral does not convert on the compiled path (row 442, edit 1).

## For the quiz author

- **Case 16 (`key.md:190-199`).** The expected answer stands: `n: NN32 = 3` binds on both paths. Three parts of the key are wrong now:
  - Its Scope says that "the checker types the numeral as `IntLiteral`". It is `NaturalNumeral[\1, 10, 3\]` now (F-79, F-57).
  - Its Scope recommends that a test write `assert(n = 3, msg)`. That fails under walk now: the probe printed `n = 3 ... false` at `5f35b1d058` (row 973). Recommend `assert(n, unsigned(3), msg)`, as `tests/NumeralTypesWalk.fss` does, or a typed `three: NN32 = 3` and `assert(n = three, msg)`.
  - Its Evidence records "`n = 3` printed `true`" at `5febd82a78`. Record the new run.
- **Case 26 (`key.md:318`, `:325-326`).** (a) says "`q = 0.5` is `true` too, since the float numeral converts into `QQ` at `QQ`'s `=` (F-341)". Under walk it is `false` now (the probe; F-341, F-346; row 973), and the answer is open (item 487). Change the key: `q = 0.5` is not a safe comparison, and `q = 1/2` compares two `QQ` values. Count a reader who says `q = 0.5` is `true` as partial while row 973 is CONTESTED.
- **Case 5 (`key.md:77`).** "each of the eight number types and the two numeral types declares its own". Delete "and the two numeral types" (P-165).
- **A new case: a program's own number type that takes a numeral.** Use `value object Byte(b: ZZ32)` that must take `255` and refuse `300`.
  - **Expected:** `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = Byte(v.asZZ32)`. Optionally add `where { v < 256 }`: walk refuses `300` when the place runs, and the compiled checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`).
  - **Wrong:**
    - `coerce(x: NaturalNumeral)`: 'Type requires static arguments';
    - any getter, as `x.digitValue`: 'Non-object receiver (): () ...';
    - `asFloat(x)`;
    - `Byte(v)` without `.asZZ32`: 'Unification error ... got arg 7:ZZ of type ZZ';
    - `coerce(x: IntLiteral)` in a compiled test: 'IntLiteral is undefined.'
  - **Second part:** `b: Byte = 2 + 3` is refused, since the folded `5` is a `ZZ32` and coercions do not chain.
  - **Evidence:** this admission's probes; rung A's eight rewritten tests; rung A's REPORT.md, section 11, defect 2.

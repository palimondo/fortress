<!-- Review for the curator of whether his intentions and decisions on numerals of 2026-11-08 (IntLiteral and FloatLiteral retired for the Working Draft's NaturalNumeral and RadixPointNumeral, machine defaults, one rounding, a program's type coercing from the numeral type) were carried faithfully through the record's wording, climb batch 29's briefs and defaults, the landed code on walk and on the compiled path, and the record-landing's changes to the record and the fortress-repo skill; by a Fable worker on 2026-11-09, read-only, from his words in the transcript, the record, the batch's texts and small probe runs on main's build. -->

# Numeral fidelity review, 2026-11-09

## 1. For the curator

**Verdict.** Your decisions were carried out faithfully in their substance. The machine defaults, the Working Draft's two type names with the four numbers as fields, the exact conversion into `QQ`, the one rounding into a float, the fold of numeral expressions, and the coercion of a program's own type called once per place are all built on walk, and on the compiled path as far as its own small library allows before the switch-over. My probe programs on today's `main` answer as you decided. Four points depart from your words or run ahead of them. The sentence that triggered your inquiry, "`RadixPointNumeral` declares `asFloat`, with one rounding", is the first.

**Terms used below.**
- A *numeral* is a number written in a program, `3` or `0.5`. Its *numeral type* is `NaturalNumeral` or `RadixPointNumeral`; the *four numbers* are its digit count, its digits after the point, its radix and its digits read as one integer.
- A *coercion* is the conversion a type declares from another type; a *pair* is the `=` declared between a number type and a numeral type.
- *Walk* is the interpreter. The *compiled path* checks types and makes bytecode; until the *switch-over* it uses its own small library, the *prelude*, whose numeral types are still named `IntLiteral` and `FloatLiteral`.
- A *ledger row* records a known defect. A *queue item* is a question waiting for your word.

**Finding 1, needs your word: `asFloat` and the other methods on the numeral types.** You said the numeral types are compile-time things: "You will never get radix point numeral or natural numeral at runtime" (20:29 UTC), and "there is no runtime type that you are calling methods on" (21:55). You then accepted that the four numbers travel to a program's coercion as one value with four fields (22:21, "That's what I had in my head"). Your words never mention `asFloat`. The landed numeral types carry more than the four getters: `asFloat` (a conversion to `RR64` with one rounding), `asString` (the numeral printed as written), and eleven `=` methods each way (the pairs). Under walk a numeral object is built at run time for each pair call, as `5 = n` for `n: NN32`, and for each coercion. So the two types are fuller run-time types than you pictured. The pairs were a default you accepted at 23:23 ("Yeah. Option one."). `asFloat` was not: the batch record named it a point with no default on record, and the Fable review wrote "your word to confirm". The record-landing then added `RadixPointNumeral` to P-165's list as if settled, quoting your word of 09:27 as "P-165 included", the coordinator's paraphrase; your words were "Let it land as the batch wrote it. use that as final inputs for the favor review as well." Queue item 478 still waits for you.
- Option A, keep `asFloat` as landed. It costs nothing now; a coercion body may write `asFloat(x)`.
- Option B, drop `asFloat` from both numeral types, and perhaps `asString` too, leaving the four getters and the pairs. A body gets the same double by `d: RR64 = x` (my probe shows the two bit-equal). Cost: a small library rung, P-165's list, one specification sentence and one skill sentence reverted. It brings the types nearer to your picture, but the run-time objects stay, since the pairs and the coercions need them under walk.

**Finding 2, needs your word: a negative constant at a program's own type (queue item 448).** You took repair 3 at 23:23: a program's coercion sees the four numbers of a numeral as written, so `-3` reaches a program's type as the type's `-` applied to the coercion of `3`. You also asked at 23:10 whether a natural numeral has no sign. The landed tree, on both paths, hands the coercion a signed value: under walk `t: Tally = -3` passes `NaturalNumeral(1, 10, -3)`, whose `digitValue` is -3, whose `digits` is 1, and whose `asString` prints `7` (my probe, lines I and J); a type without `-` takes it. This is a departure from a repair you took, on both paths (rows 961, 968). It is the post-batch review's finding 1.
- Option A, restore: walk applies the type's `-` to the coercion of `3` and refuses the numeral at a type without `-` (fork C6's rule), with an expected-failure test; the compiled half comes with the names batch, since the fold makes `-3` one node before the checker. Cost: a small walk rung.
- Option B, accept: amend repair 3 so a negative constant reaches the coercion signed. Then `NaturalNumeral`'s value can be negative, against its name and the Draft's `nat v`, and P-174, the specification (`literals.tex:215-218`) and the skill change.

**Finding 3, needs your word: "both implementations do the same thing, even before the switch-over" (15:17) is met only in part.** The defaults, the fold, the one rounding, the range refusal and the once-per-place call agree on both paths today, each tested. But on the compiled path a program must still write `coerce(x: IntLiteral)` or `coerce(x: FloatLiteral)`, and receives the prelude's value without the four numbers (forks N2, F5 to F7), because P-37 forbids editing the prelude. Nine further differences stand, each with a row (queue item 449). The Fable review judged the deferrals "not consequential" since the prelude is deleted at the switch-over; your words asked for sameness before it.
- Option A, accept the deferrals, and take the review's small batch for the testable differences first.
- Option B, restore now: an exception to P-37 that renames the prelude's two traits and gives them the four getters. Cost: a prelude rung thrown away at the switch-over.

**Finding 4, needs your word: where a numeral type may be written (queue items 443, 463).** You said a numeral type "can only live on the right side of an assignment or declaration, and the left side must be a different type" (20:29). P-174 says a numeral type is written only as a coercion's or an operator's parameter type. The checker as landed allows it as any function's parameter type, allows `t = x` inside a coercion body, and allows an inferred return type, so `keep(x: NaturalNumeral) = x` lets `u = keep(7)` hold a numeral object. Walk checks nothing: `t: NaturalNumeral = 3` binds (my probe W2). The Fable review marked the inferred return "for your sight".
- Option A, keep as landed and widen P-174's words to "a parameter type".
- Option B, narrow the checker to coercions and operators and refuse the inferred cases. Cost: checker code and its timing check, two library tests respelled; walk follows only when it runs the checker (P-12).

**Smaller points for your word.** P-168's exception was built across both numeral types, so inside a body `2 SEQV 2.0` is true (item 458); your words do not settle it. A numeral too large for `RR32` or `RR64` is a static error compiled and `Infinity` under walk (row 967, item 459); your "maximum precision" of 12:36 does not say which.

**Record wording to fix, built thing right.** P-174 says the Draft's `Literal[\v\]` folds into the radix field; the specification says into the digit count, which is right, since `Literal` marks a numeral without leading zeros (item 473). P-165's history should quote your words of 09:27, not the boot note's paraphrase.

**Gaps that your decisions ask for, each held by a row.** The compiled coercion at a program's generic type runs at each evaluation (row 957, item 450). The compiled `typecase` selector keeps the numeral type (row 963). The library's `=/=` over `Any` answers `true` where `=` is (row 966). Walk keeps one leading zero (row 960). None has a batch yet beyond item 449's question.

**Confirmations, one line each.**
- Machine defaults where no type is declared: `x = 3` is a `ZZ32` and `x SEQV z` is true, `bigN = 3000000000` a `ZZ64`, `y = 0.1` an `RR64`, on both paths (probes).
- Your weighing of `ZZ` and `QQ` as defaults, declined at 22:40, is recorded in P-173 and Appendix I with its reason.
- `QQ` loses nothing: `q: QQ = 0.1` is `1/10`; `h: QQ = 1/2` gives `h = 0.5` true (probe).
- A float of fixed size rounds once: `r: RR64 = 0.1` is `SEQV` a computed `0.1`; compiled `0.9999999999999999` prints itself (row 862 fixed).
- The Draft's names in the one library, the four numbers as fields, `IntLiteral` and `FloatLiteral` gone with their 24 glue bindings.
- Your reason, "finishing the specification by removing temporary hacks", was conditional on the team's comments; the scout found none calling the names temporary or final, and P-173, P-174 and Appendix I own the bend of P-26 as yours.
- Your reading B over B′ (19:38 to 19:47): `y = 0.1` then `q: QQ = y` is refused, as you were told (probe W3).
- `0.1_2 SEQV 0.5` true and `0.1 = 0.1_16` false, your catch of 21:16, are asserted and hold (probe).
- The coercion of a program's type runs once per place, in the component class's initializer, so one place gives one object, as you pictured at 22:02 within what the JVM allows.
- The skill's "Numbers" states the rules as decided and lists each path's departures with its row.

## 2. The trace, decision by decision

Each decision is given in his words with its UTC time, then traced through (a) the record's wording, (b) the batch's briefs and the defaults that landed, (c) the landed code on walk and on the compiled path, (d) the record-landing's changes to the record and the skill.

### D1. Machine defaults where no type is declared

His words: "We'll go with machine defaults. When the type is not declared." (22:40); earlier "So then I see no practical issue from user's POV to just go with B." (19:47); he weighed `QQ` and `NN` (22:31) and declined.

- (a) P-173 (`POSITIONS.md:104`): "where nothing fixes one, into the machine default, a `ZZ32`, or a `ZZ64` or `ZZ` when its value does not fit, and with a radix point an `RR64`"; the places that fix a type and the places that take the default are listed; the declined exact defaults with his reason (microGPT's hyperparameters, `asZZ32` on every index). Faithful. The repair of "fixes a type" (the judgement, section 1, line 9) is the coordinator's default he took at 23:23.
- (b) `CLIMB-BATCH-29.md`, rung C's section and forks C1 to C8; rung N's fork N7 for walk. The Fable review changed fork C4 to P-173's reading of `gg(5, w)` (`climb-batch-29-review.md:38`). Faithful.
- (c) Compiled: `CoercionOracle.scala`, `NumeralConversion.defaultName` and `isDefault`; `Functionals.scala`, `preDefault`, `defaultAtUnfixedEach`; `LiteralDefaultCompiled.test`. Walk: `Numerals.java:160-179`, `integer()`, the default as an `FInt`, `FLong` or `FBigNum` subclass carrying the site. Probe W1 lines A, B, K; probe C1 lines A, K, B. Faithful.
- (d) F-74 rewritten to P-173's rule; P-76's walk gaps cut (rows 443, 454 fixed); the skill's "Numbers": "Elsewhere the numeral takes its default". Faithful.

### D2. The Working Draft's names, the four numbers as fields

His words: "These two names, int literal and float literal, are from compiled library and from the glue classes in the walk interpreter. None of these were mentioned in the original specification, which defined the type for the natural numeral, radix numeral. We are going with those." (22:33); "I am finishing the specification by removing temporary hacks" (22:34); earlier he asked for the Draft's static-parameter form ("Why can't we build it the specifications way? Just finish the original design.", 21:55) and accepted the four numbers as fields of one value after the cost was put to him (22:21, "That's what I had in my head").

- (a) P-174 (`POSITIONS.md:105`): the two names below `Numeral`, the four numbers "fields of the value, not static parameters of the type"; his words "Coerce is just invocation of the numeric type constructor that gets the constants from the parser" quoted. The Why says no team word calls the names temporary or final, and "P-173 weighs the bend of P-26"; his "temporary hack" words are in P-173's history (`POSITIONS-history.md:3798`), not in the entry. His claim was conditional on the scout (22:34, "You can find their comments, whether they have considered it as a final design"); the scout found none either way (`numeral-names/evidence.md`, section 10). Faithful. Where his words were silent, the record chose: `Numeral extends Number` (fork N3), the getters' names `digits`, `fractionDigits`, `radix`, `digitValue` (fork N3), value objects with Fortress fields rather than traits over Java values (fork N1); each fits his "fields of the value".
- (b) Rung N; forks N1, N3; the Fable review recommended N1's default (`climb-batch-29-review.md:22`). Faithful.
- (c) `Library/FortressLibrary.fsi:454-492`: `trait Numeral extends Number comprises { NaturalNumeral, RadixPointNumeral }` with the four abstract getters; `value object NaturalNumeral(digits: ZZ32, radix: ZZ32, digitValue: ZZ)`; `value object RadixPointNumeral(digits: ZZ32, fractionDigits: ZZ32, radix: ZZ32, digitValue: ZZ)`. `IntLiteral` and `FloatLiteral` removed from `FortressBuiltin.fsi` and `.fss` with 24 glue bindings. On the compiled path the names are switched by library (`Types.java:78-96`): the prelude keeps `IntLiteral` and `FloatLiteral` until the switch-over (P-37; fork N2). Faithful in the one library; partial on the compiled path (finding 3).
- (d) F-79 rewritten; Appendix I `revival-numerals` (`changes.tex:4995-5383`) names the contradiction and the bend of P-26 as the revival's "own finishing of the text"; the skill's "Numbers" names the two types and "Until the switch-over, the compiler's prelude names them `IntLiteral` and `FloatLiteral`". Faithful.

### D3. A program's own type receives a numeral through its coercion, once per place

His words: "Coerce is just invocation of the numeric type constructor that gets the constants from the parser." (22:19); "you put them into the object's during compile time to compute its fields, so that you can stamp that object as a compile time constant" (22:02); the coordinator's answer that the JVM holds no object constants, so the nearest is a call once at class load into a `static final` field (22:03, 22:15); his "That's what I had in my head" (22:21).

- (a) P-174: "which the compiler calls once per class, when the class loads"; "a numeral at a program's type denotes one object per site, as a string literal does (P-171)". Faithful to his accepted picture.
- (b) Fork F5 (the component's class; a raising coercion fails the load); fork N7 for walk (one result per site and type). Faithful.
- (c) Compiled: `CodeGen.java:7189-7234`, `numeralCoercionSiteDesc` and `emitNumeralCoercionSites`, a `static final` field `numeral$coercion$N` set in the component class's static initializer; `NumeralCoercionOnceCompiled`. A site at a program's generic type is not hoisted (row 957). Walk: `Numerals.converted` (`Numerals.java:327-337`), one value per site and type; `NumeralOwnTypeWalk.fss` asserts `made() SEQV made()`. Faithful, with row 957 as the gap (item 450).
- (d) `compiler.md`, "What the code generator does": "once for each place ... in the component class's static initializer, except at a generic type"; row 957 listed under its traps. Faithful.

### D4. Exact into `QQ`, one rounding into a float

His words: "whatever ends up in QQ doesn't lose this precision. Whenever we know that we are saving the literal into float with fixed size, we should do the relevant conversion with maximum precision." (12:36); "I think we are aligned on 1A." (12:48).

- (a) P-172 (`POSITIONS.md:103`) and P-76 (`:91`): exact into the five integer types and `QQ`, one rounding into `RR64` and `RR32`, on both paths. Faithful.
- (b) Rung N's coercions and the helper pair (fork N5); rung F's typed-place constants (fork F8); row 862 closed.
- (c) `FortressLibrary.fss:565-569` (`QQ` from `RadixPointNumeral` as `digitValue / radix^fractionDigits`), `:669-670` and `simpleDoubleArith.numeralToDouble` (one rounding), `FortressBuiltin.fss:214-215` (`RR32`); compiled `CodeGen.roundToDouble`, `roundToFloat` (`CodeGen.java:4234-4327`), the skeptic's fix for subnormals. Probe W1 lines C, D, F, H; probe C1 line R. Faithful. A numeral too large for the float is `Infinity` under walk and a static error compiled (row 967): neither his words nor P-173 settle it (item 459).
- (d) P-172's "(row 862 ...)" clause cut; F-122 and F-128 rewritten; the skill's "Numbers" states the one rounding and row 967. Faithful.

### D5. The fold of numeral expressions on both paths

His words: on strings, "I also want the constant folding" (12:19); on numerals, the fold entered as a default he took at 23:23 (the judgement's sub-choice list, section 4) and as the Draft's exact static expressions he read at 12:36.

- (a) P-173: "An expression of numerals alone folds exactly before the checker into a signed constant ... so `x = 7/2` is a `QQ`, `1/2 = 0.5` is `true`". Faithful; the signed constant and `x = 7/2` a `QQ` are repair 3 and a default he took.
- (b) Rung F, forks F1 to F4; the Fable review's wording of F1 by the operands (`climb-batch-29-review.md:41`).
- (c) `PhaseOrder.java:130` (the fold in walk's order); `IntegerLiteralFoldingVisitor.java`, rewritten; `NumeralFoldWalk.fss`, `LiteralFoldCompiled.test`, `NumeralFoldJUTest`. Probe W1 line F (`h = 0.5`) and N. Faithful. The fold of a comparison of radix-point numerals (`0.1 = 0.1000000000000000000001` false) is a consequence his words did not foresee (item 451).
- (d) `SKILL.md`, phase 4 of the phases; F-339 added; the skill's "Numbers" paragraph on the fold. Faithful.

### D6. The `=` pairs over the numeral types

His words: none of his own; the coordinator's default "the `=` pairs over the numeral types stay and fold" (HELD.md:23), taken with "Yeah. Option one." (23:23).

- (a) P-173: "The library's `=` pairs over the numeral types stay, their conversion of a numeral folded"; P-172: "`QQ`, `RR64` and `RR32` each declare the pair of `=` that goes with each coercion (P-165)".
- (b) Fork N8: every coercion from a numeral type has its pair both ways, 11 at the number types and 11 reversed on the numeral types; the compiled fold of the pairs waits for the switch-over (fork F6).
- (c) `FortressLibrary.fsi:473-480`, `:490-492` (the reversed pairs on the numeral types); `.fss:419-420`, `:588-589`; `FortressBuiltin.fss:258-259`. Under walk the pair's body runs with the numeral object built by `Numerals.object` (`Numerals.java:292-307`) through `Coercions.withNumeralObjects`: probe W1 line E (`5 = n` true). Within the default he took; the reversed pairs make the numeral types run-time types with methods, which bears on finding 1.
- (d) Faithful; F-341 states it.

### D7. The numeral types written only as a coercion's parameter type

His words: "It can only live on the right side of an assignment or declaration, and the left side must be a different type. You will never get radix point numeral or natural numeral at runtime." (20:29); he asked what the "finer point" of "only in a coercion's parameter" was (22:45) and did not object after the answer (23:0x, the coordinator's point 4).

- (a) P-174: "A numeral type is written only as a parameter type, of a coercion or an operator, never as a variable's, field's or return type". Faithful to his words, narrower than the code.
- (b) Fork C2: the rule reads written types; `t = x` inside a body binds the numeral type (point 1, item 443, the Fable review's recommendation, `climb-batch-29-review.md:25`, which also named the inferred-return escape "for your sight").
- (c) `TypeWellFormedChecker.scala:48-73`, `:293`: refused except as any function's parameter's whole type (C.skeptic.5; item 463); inferred bindings and returns pass. Walk has no rule: probe W2 binds `t: NaturalNumeral = 3` and `u = keep(7)`. Departs from his words in reach (finding 4).
- (d) The skill's "Numbers": "Write a numeral type only as the parameter type of a coercion or an operator. The checker refuses it as the type of a variable, a field or a return (P-174)." States his rule; the checker's wider acceptance is in no row. Queue items 443 and 463 hold the question.

### D8. `asFloat` on the numeral types (the trigger)

His words: none. The judgement never mentions `asFloat`; P-165 was "unchanged (a name only)" there (`literal-design-judgement-2026-11-08.md:22`).

- (a) P-165 at the landing (`git show 7daf51fe8a:explorations/coordinator/POSITIONS.md`): the list names `NaturalNumeral` and not `RadixPointNumeral`, by the record writer's rename of `IntLiteral` at 23:47Z. 
- (b) `CLIMB-BATCH-29.md`, "The three points with no default on record", point 3: "does `RadixPointNumeral` declare `asFloat`? ... Default: yes, with one rounding ... Consequential, since it reads P-165's list anew ... The record writer would add `RadixPointNumeral` to P-165's list." Fork N4. The Fable review: "this review recommends yes ... your word to confirm" (`climb-batch-29-review.md:23`).
- (c) `FortressLibrary.fsi:472`, `:489` (`asFloat(self): RR64` on both types); `.fss:699`, `:716` through `numeralRR64`. `NumeralOwnTypeWalk.fss` calls `asFloat(x)` in `CC64`'s coercions; `RR64`'s own coercions are `asFloat(x)` (`.fss:389-390`). Probe W1 line H: `asFloat(x)` and `d: RR64 = x` give the same bits, so a body does not need the method.
- (d) The record-landing changed P-165 (commit `2db5619187`; `POSITIONS-history.md:3830`): "brought in line with the tree by the curator's rule of 2026-10-31 ... the boot note records his word of 09:3x on 2026-11-09 for the record-landing 'with every edit the batch asks (P-165 included)'". His words at 09:27 were "No, don't hold the record update. Let it land as the batch wrote it. use that as final inputs for the favor review as well." The phrase "P-165 included" is `BOOT.md:10`'s. `diff.md`, "For the curator", lists "P-165's list (C72, 478)" as still needing his word; item 478's default is "kept, as landed". The specification states it without a dated decision (`numbers.tex`, "`RadixPointNumeral` declares `asFloat` as the number types and the other numeral type do"; rung T's decision 9). The skill's "Numbers": "Each of the eight number types, and the two numeral types, declares its own `asFloat`". So a choice made where his words were silent, flagged for his word, then written into a decision's text and the skill as settled while the queue still holds it (finding 1).

### D9. A negative constant at a program's own type

His words: the six repairs taken at 23:23, repair 3 among them: "a program's coercion sees the four numbers of a written numeral only" (`literal-design-judgement-2026-11-08.md:11`); his question "Doesn't the natural numeral imply there is no sign" (23:10).

- (a) P-174 does not carry repair 3's clause (the post-batch review's process finding 1); the specification does (`literals.tex:215-218`: a negative constant reaches the coercion as the prefix `-` applied to the coercion's result for the natural numeral).
- (b) Fork C6 states it as rung C's default.
- (c) Not built on either path: the fold makes `-3` one node before the checker (`IntegerLiteralFoldingVisitor.java:373-377` at `7daf51fe8a`), so compiled `coerce(x: IntLiteral)` receives -3 (row 961; probe C1 line I), and walk's `Numerals.integer` keeps the negative value as `digitValue` with the digits of the unsigned text (row 968; probe W1 lines I, J: `-3 1 '7'`). Departure (finding 2).
- (d) The skill's "Numbers" states the rule; `interpreter.md` and `compiler.md` list rows 968 and 961 as departures; PLAN item 75 and queue item 448 hold the question. Faithful as record; the code departs.

### D10. Both paths the same, before the switch-over

His words: "We must fix it once and for all, even before switchover, and bring the two implementations to do the same thing." (15:17).

- (a) The record has no entry for this aim; HELD.md:23 and the batch record quote it (`CLIMB-BATCH-29.md`, fork C4's reason).
- (b) Forks N2 (the prelude keeps its names, P-37), F5 to F7 (the four numbers, the pairs' fold and `QQ` on the compiled path wait for the names batch); the Fable review: "served where both paths can show it" (`climb-batch-29-review.md:24`).
- (c) The post-batch review's section 7 (`batch-29-review.md:198-228`): the agreements, four planned deferrals, and nine unplanned differences with rows 957, 958, 961, 968, 962, 963, 966, 967, 362, 446. Probe C1 shows the compiled path still writing `coerce(x: IntLiteral)`.
- (d) PLAN lines 72 to 75 for F5 to F7 and N11; PLAN item 76 and queue item 449 for the nine. Faithful as record; the aim is met in part (finding 3).

### Other choices made where his words were silent

- P-168's exception across both numeral types (fork N9; `FOrdinaryObject.java:48-49`; item 458).
- `asString` on the numeral types printing the numeral as written (fork N10; `FortressLibrary.fss:698`, `:711-715`). His idea at 23:02 was a program type's own method for the round trip; the landed test's `Written` copies the numeral's `asString` (probe W1 line O).
- Walk converts into the eight number types through the library's coercion, not walk's Java (N.worker.2, item 456): the same value by construction.
- A numeral at `Index` takes the default (item 471): fits repair 1, which he took.
- The library's `=/=` over `Any` (row 966): the specification settles it and the judge named it a departure; it fits his aim of coherence.
- `10^k` tie and `strToFloat`'s typed base (item 455); the `typecase` selector (row 963); the generic own type (row 957).

### Record wording

- P-174's "`Literal[\v\]` fold into the radix field" against the specification's "into the digit count" (`literals.tex:147-150`; item 473): the specification's reading fits the Draft (`Literal[\v\]` marks a numeral without leading zeros, `Specification-1.0-frozen/basic/expressions/literals.tex:85-86`). An Opus writer should change P-174's clause.
- P-165's history block of 11:00Z quotes "P-165 included" as his word; his words of 09:27 should be quoted instead.
- P-174 lacks repair 3's clause, which he took; the specification carries it. The writer should add it, as the post-batch review asked.

## 3. Sources and commands

**Sources read.** His words: `scratchpad/numeral-fidelity/words-1.md`, `words-2.md`; his messages of 2026-11-09 from the transcript by a filter script (`his-words-1109.py`, user text lines 02:00 to 23:59 UTC); `literals-recovery/evidence.md` (his page comments), `numeral-names/evidence.md`, `frozen-spec/evidence.md`. The design's ground: `explorations/reviews/literals-one-picture-2026-11-08.md`, `literal-fork-2026-11-08.md`, `literal-design-judgement-2026-11-08.md`, `explorations/compile-ladder/plan-29/probes/literal-default.md` (by sections), `Specification-1.0-frozen/basic/expressions/literals.tex:75-230`. The record: P-76, P-165, P-168, P-169, P-171 to P-175 now and at `7daf51fe8a`, their histories, F-74, F-79, F-169, F-339, F-341, F-342, F-345, F-346; rows 360, 362, 446, 946, 957, 958, 961 to 963, 966 to 968; `HELD.md`, `BOOT.md`, `PLAN.md:60-80`, `:136-142`, `:711-760`, `review-queue.md` items 438 to 486. The batch: `scratchpad/numeral-fidelity/batch29.md` by section, `CLIMB-BATCH-29.md` sections 2 to 4, `climb-batch-29-review.md` whole, `climb-batch-29/RECORD.md`, the rung reports of N, C, F and T with their skeptics and judges, `reviews/batch-29-review.md` section 7 and Part 1. The record-landing: `record-landing/diff.md`; commits `2db5619187`, `5febd82a78`, `523a69054b`, `dfcb7eb18f`, `a41378d7a2`. The tree: `Specification/basic/expressions/literals.tex:75-260`, `basic-lib/numbers.tex:36-75`, `appendices/changes.tex:4995-5383`; the landed code as `batch29.md` section 3 quotes it; `ProjectFortress/tests/NumeralOwnTypeWalk.fss`, `NumeralFoldWalk.fss`, `compiler_tests/LiteralDefaultCompiled.fss`, `NumeralCoercionOnceCompiled.fss`.

**Commands run.** Each probe ran on `main`'s build with private caches under the scratchpad, by `explorations/coordinator/tools/old-fortress.sh /home/user/fortress <caches> <program>`, with the environment of `build-and-caches.md` and `TMPDIR` in the scratchpad.

Walk, `probes/NumFidW1.fss` (typed places, defaults, pairs, a program's type, a negative constant):

    A x SEQV z: true            B bigN is ZZ64: true         C q: QQ = 0.1 gives 1/10
    E n: 5; n = 5: true; 5 = n: true; n =/= 0: true          F h = 0.5: true; 0.5 = h: true
    H asFloat SEQV r: true; coercion SEQV r: true            I t: Tally = -3 gives -3 1 '7'
    L 0.1_2 SEQV 0.5: true; 0.1 = 0.1_16: false              O C.8_16 written back: C.8_16

A first run of W1 stopped at my own error, `x.asFloat` for the functional method `asFloat(x)`: "Cannot find definition for method asFloat given receiver RadixPointNumeral"; corrected, not a defect.

Walk, `probes/NumFidW2.fss` (a numeral type as a variable's type, and an inferred return):

    W2 t: NaturalNumeral = 3 binds: 1 10 3 prints 3
    W2 u = keep(7) binds 7 digits 1

Walk, `probes/NumFidW3.fss` (`y = 0.1` then `q: QQ = y`):

    RHS expression type RR64 is not assignable to LHS type QQ

Compiled, `probes/NumFidC1.fss`, `compile` then `run` against the prelude:

    A x SEQV z: true            I t: Tally = -3 gives n = -3
    R r: RR64 = 0.9999999999999999 prints 0.9999999999999999
    K y = 0.5 has type RR64     B bigN has type ZZ64

Record queries: `facts-extract.sh` for each entry, `history:P-165`, `history:P-172`, `ledger:ROW` for the rows above, `ledger-find:asFloat numeral` (no row), `ledger-find:negative numeral` (rows 961, 968 among 27), `ledger-find:numeral type written` (row 968 only). Nothing in the tree was edited or committed; the probe programs and caches are under the scratchpad.

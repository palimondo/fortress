<!-- The record-landing workflow's evidence of PLAN.md at fa630b65f: its headings, the lines that the batch added (b430f9f42..7daf51fe8) or that came after the landing, the other lines that name a changed entry or row, and the lines that look stale, written by evidence.py. -->

# PLAN.md

Print a section with `facts-extract.sh 'doc:explorations/coordinator/PLAN.md#HEADING'`, from the worktree.

## Its headings, with their lines

- 7: Where we stand (7 lines)
- 14: The principle for the batches (6 lines)
- 20: The phases (2 lines)
  - 22: Phase 1. Batch 5: what is decided and shares nothing (4 lines)
  - 26: Phase 2. Batch 6: the tower flips, the specification with it (4 lines)
  - 30: Phase 2b. The repair batch from the conformance reviews (4 lines)
  - 34: Phase 3. The checker at a true zero (6 lines)
  - 40: Phase 4. The switch-over (55 lines)
  - 95: Phase 5. microGPT compiles (19 lines)
  - 114: Phase 6. microGPT fast (10 lines)
- 124: Pavol's answers, in the order they are needed (59 lines)
- 183: Work that can start now, with no decision (23 lines)
- 206: Off the path, parked (39 lines)
  - 245: Phase 3's candidates at its end (23 lines)
  - 268: Climb batch N's first run, listed for his review (9 lines)
  - 277: Climb batch 6.5b, listed for his review (10 lines)
  - 287: Climb batch 7b, listed for his review (23 lines)
  - 310: Climb batch 8, listed for his review (18 lines)
  - 328: Climb batch 9, listed for his review (27 lines)
  - 355: Climb batch 10, listed for his review (16 lines)
  - 371: Climb batch 11, listed for his review (13 lines)
  - 384: Climb batch 12, listed for his review (15 lines)
  - 399: Climb batch 13, listed for his review (21 lines)
  - 420: Climb batch 14, listed for his review (17 lines)
  - 437: Climb batch 15, listed for his review (20 lines)
  - 457: Climb batch 15b, listed for his review (4 lines)
  - 461: Climb batch 16, listed for his review (10 lines)
  - 471: Climb batch 17, listed for his review (14 lines)
  - 485: Climb batch 18, listed for his review (15 lines)
  - 500: Climb batch 19, listed for his review (20 lines)
  - 520: Climb batch 20, listed for his review (16 lines)
  - 536: Climb batch 21, listed for his review (18 lines)
  - 554: Climb batch 21b, listed for his review (12 lines)
  - 566: Climb batch 22, listed for his review (14 lines)
  - 580: Climb batch 22c, listed for his review (22 lines)
  - 602: Climb batch 23, listed for his review (12 lines)
  - 614: Climb batch 24, listed for his review (16 lines)
  - 630: Climb batch 25, listed for his review (16 lines)
  - 646: Climb batch 26, listed for his review (17 lines)
  - 663: Climb batch 27, listed for his review (22 lines)
  - 685: Climb batch 28, listed for his review (26 lines)
  - 711: Climb batch 29, listed for his review (48 lines)
  - 759: Not classified, to check (13 lines)
- 772: The rule for every edit under the sealed tree (kept from 2026-09-17) (17 lines)
- 789: Testing techniques written 2026-09-17 (never put to Pavol for a yes, `postmortem-2026-09-29/archaeology.md` § 6; his position is P-103, "The suite's verdict is the check.") (12 lines)
- 801: Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word; kept) (6 lines)

## The lines that the batch added, b430f9f42..7daf51fe8

- PLAN.md:138, under "Pavol's answers, in the order they are needed":

Before the switch-over, raised by climb batch 29's rung C (`compile-ladder/climb-batch-29/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"):

- PLAN.md:140, under "Pavol's answers, in the order they are needed":

75. C.skeptic.3 of climb batch 29's rung C (row 961), with review.1 of its merged-diff review (row 968): fork C6's default, a negative numeral at a program's own number type as prefix minus on its coercion of the natural numeral (`coordinator/CLIMB-BATCH-29.md:369`), is not built, since the numeral fold makes `-3` one negative node and keeps no reference to the prefix operator; on the compiled path the prelude's `IntLiteral` carries the sign until the switch-over, so the difference shows there only once a coercion reads a numeral's four numbers, but under walk, which runs the fold since rung F and whose coercion reads the four numbers since rung N, it shows on the merged tree: `t: Tally = -3` passes `NaturalNumeral(1, 10, -3)`, whose `asString` is '7', and a type without `-` takes it (row 968). Ways: the fold keeps the operator's reference for a numeral at a program's type; the checker, and walk, build one; or rows 961 and 968 stand until the switch-over. No default on record beyond the fork's, which the landed tree departs from. Evidence: `compile-ladder/rung-numeral-checker/REPORT.md:135` (decision 8); `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java`, the fold of prefix minus; `ProjectFortress/compiler_tests/XXXNegativeNumeralOwnType.test`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:160-179`; row 968's notes.

- PLAN.md:726, under "Off the path, parked > Climb batch 29, listed for his review":

The items for him that climb batch 29's rungs left (`compile-ladder/climb-batch-29/RECORD.md`, "Items for the curator, and where each is in `PLAN.md`"); one line for each point, opening with the ids it holds: what is asked or told, its default, and where its evidence is. The ones that wait on him before the switch-over are under "Pavol's answers" above.

- PLAN.md:728, under "Off the path, parked > Climb batch 29, listed for his review":

- F.worker.1 and F.skeptic.1 of climb batch 29's rung F (row 957): P-174's "once per class, when the class loads" is read as the component's class, whose static initializer sets every numeral site's field, whatever class holds the site; for a site at a program's own generic type, is it one object per site, or one per instantiation held by the instantiated class? Default: the component's class, as landed; a generic type's site not hoisted (row 957). Evidence: `compile-ladder/rung-literal-fold/REPORT.md:265` (decision 7); `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:7189` (`numeralCoercionSiteDesc`); `ProjectFortress/compiler_tests/XXXNumeralCoercionGenericTypeCompiled.fss:11`.

- PLAN.md:729, under "Off the path, parked > Climb batch 29, listed for his review":

- F.worker.2 and F.skeptic.3 of climb batch 29's rung F: a comparison of radix-point numerals folds exactly, so `0.1 = 0.1000000000000000000001` is `false`, where the two numerals' `RR64` defaults are one double and the base answered `true`; P-173 folds numerals alone exactly and does not single out comparisons. Default: exact, as landed. Evidence: `compile-ladder/rung-literal-fold/REPORT.md:260` (decision 2); `ProjectFortress/src/com/sun/fortress/compiler/desugarer/IntegerLiteralFoldingVisitor.java:304-310`.

- PLAN.md:730, under "Off the path, parked > Climb batch 29, listed for his review":

- F.worker.3 of climb batch 29's rung F (row 956): the fold reuses an operator reference written in the component, so it leaves an expression whose result needs a prefix minus or a `/` that the component writes nowhere; should a later rung give the fold phase the disambiguating environment to close it? No default on record; as landed, the expression is left as written. Evidence: `compile-ladder/rung-literal-fold/REPORT.md:261` (decision 3); `ProjectFortress/tests/XXXNumeralFoldNoPrefixMinusWalk.fss`.

- PLAN.md:731, under "Off the path, parked > Climb batch 29, listed for his review":

- F.worker.4 of climb batch 29's rung F, told, not asked: the compiled harness's new key `run_exits_nonzero` (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:595-606`) is test machinery that `fortress-repo`'s `tests-writing.md` does not yet name; the skill writer's, from the batch's record. Default: as landed.

- PLAN.md:732, under "Off the path, parked > Climb batch 29, listed for his review":

- F.skeptic.2 of climb batch 29's rung F (row 387), told, not asked: the fold made `ZZ`'s `zero` and `one` getters (`Library/FortressLibrary.fss:1093-1095` at the base) a `ZZ32` under walk on rung F's tree; rung N's upheld fix `953d050966`, a numeral converted at a declared return type, repairs it on the merged tree, and the gather promoted `ProjectFortress/tests/XXXZZOneGetterWalk.fss` to `ZZOneGetterWalk.fss` in rung N's commit. Default: as landed.

- PLAN.md:733, under "Off the path, parked > Climb batch 29, listed for his review":

- N.worker.1 of climb batch 29's rung N: once `RR32` converts from `NaturalNumeral` (P-76), a numeral base beside a non-numeral exponent, `10^k` for `k: ZZ32`, ties in the checker among `RR32`'s, `NN32`'s and `ZZ32`'s `^`, and the numeral tie rule does not apply since the exponent's declared types differ; should the tie rule cover it, or is rung C's narrow step 5 (fork C4) the settlement? Default: the library's one such site, `strToFloat`, given a `ZZ32` base, as landed. Evidence: `compile-ladder/rung-numeral-types/REPORT.md:175`; `Library/FortressLibrary.fss:4839-4840`.

- PLAN.md:734, under "Off the path, parked > Climb batch 29, listed for his review":

- N.worker.2 of climb batch 29's rung N, a deviation from fork N7's default: walk converts a numeral into the eight number types by calling the library's own coercion from the numeral type with the numeral object, once per site and type, not by a conversion in walk's Java; the value is the same by construction. Default: as landed. Evidence: `compile-ladder/rung-numeral-types/REPORT.md:176`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Coercions.java:96-118` (`numeralCoercionFor`).

- PLAN.md:735, under "Off the path, parked > Climb batch 29, listed for his review":

- N.worker.3 of climb batch 29's rung N, told: with `RR32` converting from both numeral types, `a + 2.5`, `a + 2` and `a MAX 2.5` for an `RR32` `a` run `RR32`'s operator, where the revival's test asserted `RR64`'s, read as P-76's and P-172's consequence; a float numeral to the left runs `RR64`'s under walk (row 958), and Appendix I's `revival-rr32` Effect now says so. Default: as landed. Evidence: `compile-ladder/rung-numeral-types/REPORT.md:177`; `ProjectFortress/tests/RR32SiblingRungV.fss:50`, `:52`, `:55`.

- PLAN.md:736, under "Off the path, parked > Climb batch 29, listed for his review":

- N.skeptic.1 of climb batch 29's rung N: P-168's one exception, "two values of a numeral type inside a coercion's body are strictly equivalent when their reduced values are equal", is built across both numeral types, so `2` and `2.0` inside a body are `SEQV`, where P-168's first rule keeps values of different types apart; within one numeral type, or across both? Default: across both, as landed (the worker's decision 10). Evidence: `compile-ladder/rung-numeral-types/SKEPTIC.md:70`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FOrdinaryObject.java:48-49`; `explorations/coordinator/POSITIONS.md:101`.

- PLAN.md:737, under "Off the path, parked > Climb batch 29, listed for his review":

- N.skeptic.2 of climb batch 29's rung N and gather.2 of its gather (row 967): under walk a numeral that rounds to an infinity of `RR32` or `RR64` converts at a typed place to `Infinity` with no error ('Big1 RR32 above max Infinity'; on the merged tree `wide: RR32 = 340282356779733661637539395458142568448` prints `Infinity`), where rung T's text makes it a static error (`Specification/basic/expressions/literals.tex:189-190`) and rung C's checker refuses it; is such a numeral "outside the type's range" under P-173, or is `Infinity` its one rounding? No decision on record settles it, so the text stands as rung T wrote it, and walk's departure has row 967, the expected failure `ProjectFortress/tests/XXXNumeralRoundsToInfinityWalk.fss`, and its place in `revival-numerals`' Effect, all in rung T's commit. No default on record. Evidence: `compile-ladder/rung-numeral-types/SKEPTIC.md:71`; `ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java:268-290`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/CoercionOracle.scala:476-483`.

- PLAN.md:738, under "Off the path, parked > Climb batch 29, listed for his review":

- C.worker.1 and C.skeptic.1 of climb batch 29's rung C (row 446; item 17 above holds the row): where P-40's unfixed size meets fork C4, `ee(5)` for `ee[\nat n\](x: ZZ32)` beside `ee(x: Any)` is checked as built at way (a), the sized declaration without the default, so the static choice is `ee(x: Any)` and the compiled dispatch runs the sized arm, which dies where its body reads `n` ('NumberFormatException: For input string: "n"'; walk 'undefined variable [n]'), row 446's defect; ways (b) refuse `ee(5)` as P-40 refuses `ez(z)`, against fork C8's "ee(5) gives 1", and (c) an unused size not counted as unfixed. Default: (a), as landed. Evidence: `compile-ladder/rung-numeral-checker/REPORT.md:165`; `compile-ladder/rung-numeral-checker/SKEPTIC.md:36`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:288-292`; `ProjectFortress/compiler_tests/LiteralDefaultCompiled.fss:78`.

- PLAN.md:739, under "Off the path, parked > Climb batch 29, listed for his review":

- C.worker.2 and C.skeptic.2 of climb batch 29's rung C, with review.2 of its merged-diff review (row 962): a `nat` or `int` size of 2^31 or more read as a value raises `java.lang.Error` 'Not in range for ZZ32' on the compiled path, which no `catch` sees, and is a `ZZ64` under walk (F-140; on the merged tree `sizeValue[\3000000000\]()` typed `ZZ64`), which Appendix I's `revival-numerals` Effect and the box of `Specification/basic/expressions/ranges.tex:55-58` do not name; ways: a refusal when the class loads, `IntegerOverflow`, or a `ZZ64` where the value does not fit, which P-173's "a `nat` parameter used as a value is a `ZZ32`" declines. No default on record; the row is CONTESTED. Evidence: `compile-ladder/rung-numeral-checker/REPORT.md:166`; `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:6482`; `ProjectFortress/src/com/sun/fortress/compiler/runtimeValues/FIntLiteral.java:63-71`.

- PLAN.md:740, under "Off the path, parked > Climb batch 29, listed for his review":

- C.skeptic.4 of climb batch 29's rung C (row 963): a numeral as a `typecase`'s selector keeps `IntLiteral`, where P-173 gives it its default; the default there moves `compiler_tests/XXX5r.test`'s pinned span and makes `XXXPatternMatchingc.test`'s `typecase (3, 4) of (x, y: ZZ32)` reachable, which then stops the code generator (row 964). Ways: build the default with the two team tests respelled and the pattern wall's test kept, or leave it as recorded. Default: left, as landed. Evidence: `compile-ladder/rung-numeral-checker/SKEPTIC.md:79`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:660`; `ProjectFortress/compiler_tests/XXXNumeralTypecaseSelector.test`.

- PLAN.md:741, under "Off the path, parked > Climb batch 29, listed for his review":

- C.skeptic.5 of climb batch 29's rung C: the written-only rule allows `IntLiteral` and `FloatLiteral` as any parameter's whole type, broader than P-174's "written only as a parameter type, of a coercion or an operator" read narrowly and the batch's test rule "only as a coercion's parameter type"; the two library tests' `choose(b: Boolean, lo: IntLiteral, hi: IntLiteral)` rely on it. Ways: keep it, or narrow it to coercions and operators, after which those tests have no way to hold two `IntLiteral` values. Default: as landed. Evidence: `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:48-73`; `ProjectFortress/library_tests/IntLiteralArithRung7.fss:36`, `IntLiteralRung6.fss:42`; `explorations/coordinator/POSITIONS.md:105`.

- PLAN.md:742, under "Off the path, parked > Climb batch 29, listed for his review":

- S.worker.1 and S.skeptic.1 of climb batch 29's rung S: does `Specification/basic/expressions/constant.tex`'s "One may concatenate mixed string and character literals, producing a string literal" include two character literals, `'a' || 'b'`? Neither library declares `||` on two characters, walk refuses it on old and new code ('Failed to find any matching overload, args = ('a','b')') and the compiled path refuses it statically, so the fold leaves it; folding it needs a declaration, or the specification's word that the result is a string. Default: left, as landed. Evidence: `compile-ladder/rung-string-literals/REPORT.md:229`; `ProjectFortress/src/com/sun/fortress/compiler/desugarer/PreTypeCheckDesugaringVisitor.java:229`.

- PLAN.md:743, under "Off the path, parked > Climb batch 29, listed for his review":

- G.worker.1 and G.skeptic.1 of climb batch 29's rung G: fork G3's "A type a program names, as a `typecase` arm `Int` or `BigNum`, keeps its name" is read as name and identity, not text: a type's text is made once per type object, which a written `Int` shares with the class of `3`, so a message about a written `Int` now prints `ZZ32`, as 'Closure/Constructor for takeZ param 1 (c:Cell[\ZZ32\]) got arg Cell[\ZZ32\] of type Cell[\ZZ32\]' for `Cell[\Int\](3)` at `takeZ(c: Cell[\ZZ32\])`. Is that the reading wanted? Default: as landed. Evidence: `compile-ladder/rung-walk-language-types/REPORT.md:154` (decision 9); `compile-ladder/rung-walk-language-types/SKEPTIC.md:51`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/FTraitOrObject.java:189-192`.

- PLAN.md:744, under "Off the path, parked > Climb batch 29, listed for his review":

- G.worker.2 and G.skeptic.4 of climb batch 29's rung G: the ilk of a string object keeps its own name, `FlatString` (team test `tests/StringTests.fss:82`), while walk's type text and `Reflect` print `String`; P-167 says walk's native objects stop being types a program sees or prints; should the ilk of the four string objects follow, at the cost of the team line? Default: the ilk kept, as landed. Evidence: `compile-ladder/rung-walk-language-types/REPORT.md:151` (decision 6); `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/ObjectPrims.java:54-66`.

- PLAN.md:745, under "Off the path, parked > Climb batch 29, listed for his review":

- G.worker.3, G.worker.4 and G.skeptic.4 of climb batch 29's rung G, told: `LanguageTypeInstancesWalk` asserts `Cell(3)`, `Just(3)`, `SUM <|1, 2, 3|>` and `typeOf(3)` against the batch's first rule for tests, as the rung's own test list asks, relying on rung N's default; and rows 432 and 721 close only if N makes a float numeral an `RR64` before inference. On the merged tree both hold: the test passes in the gather's run, and a probe printed `SUM <|1.5, 2.5|>` as '4.0' and `<|1.0, 1.0|>` bound to `List[\RR64\]`, so rows 432, 721 and 20 close. Default: as landed. Evidence: `ProjectFortress/tests/LanguageTypeInstancesWalk.fss:22-37`; `compile-ladder/climb-batch-29/RECORD.md`, "Rows closed".

- PLAN.md:746, under "Off the path, parked > Climb batch 29, listed for his review":

- G.skeptic.2 of climb batch 29's rung G: against P-167, `typeOf(z) = theType[\ZZ32\]()` is `false` while `typeOf(Cell(z)) = theType[\Cell[\ZZ32\]\]()` is `true` under walk, since `Reflect`'s `TypeOf` answers the value's own type; should `typeOf` answer the trait for the nine? No default on record; as landed, the value's own type. Evidence: `compile-ladder/rung-walk-language-types/SKEPTIC.md:52`; `ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/Reflect.java:210-213`.

- PLAN.md:747, under "Off the path, parked > Climb batch 29, listed for his review":

- G.skeptic.3 of climb batch 29's rung G: `QQ`'s value object `Ratio` (`Library/FortressLibrary.fss:655`), which no program can name, prints as `Ratio` under walk, and `Cell(q)` is a `Cell[\Ratio\]`; it has the nine's shape, one library object standing for a number type: should `LanguageTypes`' table read it at `QQ`? No default on record; as landed, not mapped. Evidence: `compile-ladder/rung-walk-language-types/SKEPTIC.md:53`; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/types/LanguageTypes.java:30-41`.

- PLAN.md:748, under "Off the path, parked > Climb batch 29, listed for his review":

- T.worker.1, T.skeptic.1 and T.judge.2 of climb batch 29's rung T (row 966): the library's `=/=` over `Any` answers `true` for `u =/= 0` with a zero `u` of `NN32`, `NN64` or `RR32`, and for `q =/= 0.5` with `q: QQ = 1/2`, while `u = 0` and `q = 0.5` are `true` through the `=` pairs; the judge upheld that this departs from `e =/= e'` being `NOT (e = e')`, so the open part is the library's repair, a later library rung's: a numeral-type operand beside each `=` pair, or a change to the declaration over `Any`, since `=/=` on each number type as `NOT (self = other)` is not chosen for a numeral operand while the one over `Any` stands. Default: the departure named, with its expected failure, as landed. Evidence: `compile-ladder/rung-literals-spec/REPORT.md:155`; `compile-ladder/rung-literals-spec/JUDGE.md:56`; `Library/FortressLibrary.fss:98`; `ProjectFortress/tests/XXXNotEqualNumeral.fss`.

- PLAN.md:749, under "Off the path, parked > Climb batch 29, listed for his review":

- T.worker.2 and T.skeptic.2 of climb batch 29's rung T: a numeral at a library type that P-173's lists do not name, as `Index` or a bounded type parameter that a numeral alone does not fix: the default wherever the default is a subtype of the declared type (way a), or refused as a program's type is (way b)? The text states way (a) and rung C built it (`defaultFits`); the gather revised `revival-index`'s sentence to it. Default: (a), as landed. Evidence: `compile-ladder/rung-literals-spec/REPORT.md:156`; `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:1101-1106`; `Specification/appendices/changes.tex:4442-4446`.

- PLAN.md:750, under "Off the path, parked > Climb batch 29, listed for his review":

- T.judge.1 and T.judge.3 of climb batch 29's rung T, told, not asked: the gather filed row 966 and put its number into Appendix I (`Specification/appendices/changes.tex:5163`); the skeptic's fix added `ProjectFortress/tests/XXXNotEqualNumeral.fss`, a file outside the section's "Specification/ only", a home-2 expected failure. Default: as landed.

- PLAN.md:751, under "Off the path, parked > Climb batch 29, listed for his review":

- gather.1 of climb batch 29's gather, told, not asked: the rungs were applied in the order F, N, C, S, G, T, by the batch's order rule (C after N and T last by `landsOnlyWith`; F before N by `sequivTest.fss` and `StrictEquivalenceRuleWalk.fss`; N before G by `EvaluatorBase.java`; S before G by `NativeGlueNonFlatStringWalk.fss`; N before S by the manifest where `Evaluator.java` and `StrictEquivalenceRuleWalk.fss` order the pair both ways). Default: as landed. Evidence: `compile-ladder/climb-batch-29/RECORD.md`, "The rungs applied, in order".

- PLAN.md:752, under "Off the path, parked > Climb batch 29, listed for his review":

- gather.3 of climb batch 29's gather, told, not asked: row 338 (`d: ZZ32 = -2147483648` refused by walk) is closed by rung F's fold, which makes `-2147483648` one `ZZ32` numeral, though F's rows closed did not name it; the merged tree's walk prints '338 -2147483648', and `ProjectFortress/tests/NumeralFoldWalk.fss:24-25` asserts the folded numeral a `ZZ32`. Default: closed, as landed. Evidence: `compile-ladder/climb-batch-29/RECORD.md`, "Rows closed".

- PLAN.md:753, under "Off the path, parked > Climb batch 29, listed for his review":

- gather.4 of climb batch 29's gather, told, not asked: row 20 (a list display of float numerals refused at `List[\RR64\]` under walk), as rung G narrowed it, holds no more on the merged tree, where `l: List[\RR64\] = <|1.0, 1.0|>` binds; it is closed with no test, since the batch's first rule for tests forbids asserting a static argument of a generic built from a numeral under walk. Default: closed with the probe in its note, as landed. Evidence: `compile-ladder/climb-batch-29/RECORD.md`, "Rows closed".

- PLAN.md:754, under "Off the path, parked > Climb batch 29, listed for his review":

- gather.5 of climb batch 29's gather: rung T's text folds the Working Draft's `Literal[\v\]` into the digit count, which tells whether a numeral has leading zeros (`Specification/basic/expressions/literals.tex:149` and the Change of `revival-numerals`), where P-174 says the explicit-radix variants and `Literal[\v\]` fold into the radix field (`explorations/coordinator/POSITIONS.md:105`); which wording is meant? Default: T's text, as landed; walk keeps one of a radix-point numeral's leading zeros only (row 960).

- PLAN.md:755, under "Off the path, parked > Climb batch 29, listed for his review":

- gather.6 of climb batch 29's gather, told, not asked: rung G's skeptic rewrote row 591's line for a line its change moved, but the row's citations are pinned "at d4d454f9d", so the gather kept the row as it stood; rows 156, 371, 372 and 471 were rewritten, their `EvaluatorBase.java` lines moved one further by rung N's hunk above them. Default: as landed. Evidence: `explorations/fortress-gap-ledger.md`, row 591.

- PLAN.md:756, under "Off the path, parked > Climb batch 29, listed for his review":

- review-routed.1 of climb batch 29's merged-diff review, for the next batch that edits walk's numerals or the numeral fold: row 968 (under walk a negative constant at a program's own number type reaches its `coerce(x: NaturalNumeral)` as `NaturalNumeral(1, 10, -3)`, where `Specification/basic/expressions/literals.tex`, "Literals", makes it prefix `-` on the coercion's result for the natural numeral and refuses it at a type without `-`) owes its gated expected failure, `ProjectFortress/tests/XXXNegativeNumeralOwnTypeWalk.fss`, asserting the text's answer, which then becomes the row's reproducer (home 2). Default: written by that batch. Evidence: row 968's notes; `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Numerals.java:160-179`.

- PLAN.md:757, under "Off the path, parked > Climb batch 29, listed for his review":

- review-routed.2 of climb batch 29's merged-diff review, for the next batch that edits walk's numerals or the numeral fold: `ProjectFortress/tests/NumeralTypesWalk.fss:41-42`, `assert(1/2 = 0.5, "1/2 = 0.5 through QQ's = with the float numeral")` and its reverse, are folded into `true` before walk runs since rung F folds a comparison of numerals alone (F-339), so on the merged tree they no longer reach the `=` pairs between `QQ` and `RadixPointNumeral` that they name, as rung S's skeptic found for three string tests (`91762b1a68`); respell them with a `QQ` variable, as `half: QQ = 1/2` then `half = 0.5` and `0.5 = half`, keeping the values checked. On the merged tree such a program printed 'half = 0.5: true' and '0.5 = half: true'. Default: respelled by that batch.


## The lines added after the landing, 7daf51fe8..fa630b65f

None.

## The other lines that name a changed entry or row

- PLAN.md:10, under "Where we stand", 2048 characters, names F-32, F-53, F-285, F-299: At the last landed gate, climb batch 28's (`f56d6516c`), the distance is 0 and the checker count 0 over the fourteen components, with no crash row: the checker again checks `value object Char` to its end (F-53, F-54, F-334; | 372 of the library's 424 live bindings name helpers of `nativeHelpers/` and 52 still name glue classes: `IntLiteral`'s 21 and `FloatLiteral`'s 3, which leave the library with climb batch 29's rename of the numeral types (P-169, P-174), and `Reflect`'s 28 (F-299, F-32). | row 731's checker gap stays for user programs and the team demos (F-285).
- PLAN.md:12, under "Where we stand", 1271 characters, names row 364: - **Next.** Climb batch 29, phase 4's line "Climb batch 29, the literals": the numeral design (P-173, P-174), walk's numerals place by place, walk's generics at language types (row 364's way A) and the strings (P-171), on both paths, test first.
- PLAN.md:36, under "The phases > Phase 3. The checker at a true zero", 1024 characters, names F-53: F-53, F-288, F-289), and the count from 62 to 0;
- PLAN.md:48, under "The phases > Phase 4. The switch-over", 1057 characters, names F-32, F-299: Every native binding becomes a `builtinPrimitive` call naming a static helper of `nativeHelpers/`, which both paths run (P-58), since the compiled path cannot reuse walk's glue classes (F-32). | D2, 42 with no compiled analogue (F-32; | Since climb batch 28, 372 of the 424 live bindings name helpers and 52 still name glue classes (F-299, F-32).
- PLAN.md:49, under "The phases > Phase 4. The switch-over", 314 characters, names F-32, F-299: - N1 and N2, A's 154 and B's 59: those moved are in F-299, F-303 and F-305 to F-307, the string family's 18 with climb batch 26's rung T (F-299), and `FlatString`'s `=` and `flatConcat` at a `Char` with climb batch 27's rung F (F-323); | B's 23 with a name the prelude gives another helper are in row 348 and F-32.
- PLAN.md:50, under "The phases > Phase 4. The switch-over", 375 characters, names F-326: - The curator's first stress test, `value object CC64(re: RR64, im: RR64)`, compares field by field under walk since climb batch 27's rung E (F-326);
- PLAN.md:53, under "The phases > Phase 4. The switch-over", 725 characters, names F-331: its other 8, conversions and comparisons, moved in climb batch 28's rung V (F-331).
- PLAN.md:54, under "The phases > Phase 4. The switch-over", 376 characters, names F-32: - N4's two rungs (P-164) are built: the writer rung in climb batch 27 (F-330), and the reader rung, with `FileWriteStream`, in climb batch 28 (F-332), so the 36 are gone (F-32).
- PLAN.md:55, under "The phases > Phase 4. The switch-over", 1239 characters, names row 578: row 578).
- PLAN.md:56, under "The phases > Phase 4. The switch-over", 592 characters, names F-32: - D2's 42, the bindings with no compiled analogue (F-32): by P-169, climb batch 28 moved `NativeArray`'s 7 onto a compiled store of shape (ii) (F-333) and `Thread`'s 5 and `printTaskTrace` onto helpers over the compiled runtime (F-335), and deleted `getProgramArgsPrim` (P-170; | `Reflect`'s 28 stay on glue, off microGPT's path (F-32).
- PLAN.md:64, under "The phases > Phase 4. The switch-over", 798 characters, names F-328: F-328).
- PLAN.md:69, under "The phases > Phase 4. The switch-over", 1417 characters, names rows 79, 325, 454, 486, 578, 944, 946: the checker's default at each place that fixes no type, a tied float numeral read as `RR64`, a type parameter that several numerals fix at the narrowest default, a numeral type written only as a parameter type, a numeral outside its type's range refused statically (row 325), and a program's type with no coercion from the numeral type refusing a numeral (P-173, P-174); | `IntLiteral`'s 21 and `FloatLiteral`'s 3 glue bindings leave with the two types (P-169), and so do row 578 and its test `tests/IntLiteralValue.fss`. | Rows 946 and 454's compiled half close by it, row 944 by it with walk's rung, and rows 79 and 486 meet it: a numeral where nothing fixes a type, and a `nat` parameter used as a value, an `IntLiteral` today where P-173 makes each a `ZZ32`.
- PLAN.md:70, under "The phases > Phase 4. The switch-over", 370 characters, names row 862: - The fold, in a phase before the checker: an expression of numerals alone folded exactly into a signed constant, a numeral's conversion at a typed place made a constant rounded once (row 862, `compiler_tests/XXXFloatNumeralOneRounding`), and a program's coercion from the numeral type called once per class, at load, with the four numbers as constants (P-173, P-174).
- PLAN.md:71, under "The phases > Phase 4. The switch-over", 544 characters, names rows 443, 454, 943: Rows 943, 443 and 454's walk half close by it;
- PLAN.md:72, under "The phases > Phase 4. The switch-over", 211 characters, names row 364: - Walk's generics and messages at language types, row 364's way A (`reviews/row-364-walk-generics-2026-11-08.md`): under walk `Cell(3)` is a `Cell[\ZZ32\]` and `Cell("s")` a `Cell[\String\]`; | rows 364 and 432.
- PLAN.md:73, under "The phases > Phase 4. The switch-over", 996 characters, names row 945: Row 945 closes;
- PLAN.md:86, under "The phases > Phase 4. The switch-over", 1679 characters, names rows 387, 443, 486: Its numeral half is gone: walk's numeral is never a value of a numeral type, and before walk runs the checker it converts a numeral from its exact value place by place (P-76, P-173), in climb batch 29's walk rung (the line "Climb batch 29, the literals" above), which takes row 443 from this line; | What it holds: Q1's default in rung K's `narrowest` and `bestMatchWithCoercion`, row 387's return conversion, the four natives reading `getInt()`, the fit rule for a numeral too large for `ZZ32`, the coercion pass's symbolic-type bug, row 486's size value, which P-173 makes a `ZZ32`; | his answers it needs are review-queue items 34, 80, 81, 91 (closed at the cleanup of 2026-11-05: settled, this line holds row 387's return conversion), 232 and 252 (closed at the cleanup of 2026-11-05: coordinator, a FACTS wording, its decision item 34);
- PLAN.md:87, under "The phases > Phase 4. The switch-over", 495 characters, names row 578: - Row 578 (`reviews/batch-8-review.md`, Part 3): under walk the object `IntLiteral`'s own arithmetic answers a `ZZ32` where its api declares `IntLiteral` (`x + x` prints `0 ZZ32`), since its natives return `FIntLiteral.make`, which normalises to an `Int`;
- PLAN.md:101, under "The phases > Phase 5. microGPT compiles", 450 characters, names F-285: - Row 731's checker gap, a generic big operator's static parameter in an unwritten clause form fixed by its bound: the library and both model programs write the argument (F-285;
- PLAN.md:106, under "The phases > Phase 5. microGPT compiles", 1221 characters, names F-151, F-229 and row 721: F-151, the element bound), and a factory that reads the element bound in place of its fixed list of the eight number types, since today `array1` and `array2` give a plain array at any other element type (F-229; | rows 721 and 729).
- PLAN.md:152, under "Pavol's answers, in the order they are needed", 234 characters, names row 446: Row 446: a call whose argument's static type lies above a sized declaration's domain is not refused, and the compiled run dies where the declaration reads its size;
- PLAN.md:173, under "Pavol's answers, in the order they are needed", 225 characters, names F-151: The bound of `Vector` and `Matrix`: built at the judgement's default, `T extends { Number, MultiplicativeRing[\T\] }`, landed as climb batch 13b (F-151);
- PLAN.md:214, under "Off the path, parked", 205 characters, names row 360: - Row 360, a numeral within half an ulp of a tie, which rounds as its nearest double on both paths;
- PLAN.md:240, under "Off the path, parked", 253 characters, names row 325: - Row 325's faces: a numeral converts only into a type that holds its value (`XXXNumeralBeyondWidthMax`), and a numeral beyond `ZZ32` as a range component is pinned;
- PLAN.md:243, under "Off the path, parked", 475 characters, names row 506: - Climb batch N's gated inference gaps, off the path until the distance stage or microGPT meets one, each gated by an expected failure: rows 506 (the coercion attempt's 64-combination cap), 507 (an untyped function argument in the coercion attempt, the first of them to measure in phase 5), 511 (walk's mixed widths through varargs or a tuple) and 513 (a generic trait's own coercion parameter under walk).
- PLAN.md:250, under "Off the path, parked > Phase 3's candidates at its end", 347 characters, names rows 364, 774: - Walk's half of conditional extension (row 774; | P-154): it waits until walk runs the checker (P-12) or row 364 is fixed;
- PLAN.md:251, under "Off the path, parked > Phase 3's candidates at its end", 222 characters, names row 774: a walk rung of P-151's forms, beside row 774's walk rung above.
- PLAN.md:258, under "Off the path, parked > Phase 3's candidates at its end", 288 characters, names rows 364, 717, 721, 722: - The other candidates of item 18, each with what it waits on, are in `coordinator/CLIMB-BATCH-20.md`, section 4: open among them, rows 364, 444, 665, 691, 695, 697, 700, 714, 716, 717, 719, 721 to 723, 725, 728, 731, 746, 755 to 758, 760 to 764, 768, 770, 776 to 781, 785 and 787 to 790.
- PLAN.md:264, under "Off the path, parked > Phase 3's candidates at its end", 454 characters, names row 774: rows 774, 777, 470, 868 to 870, 812 and 701;
- PLAN.md:270, under "Off the path, parked > Climb batch N's first run, listed for his review", 618 characters, names row 443: The defaults already filed are the judgement's (the line above on the conversion judgement's defaults), Q1's as built (the line on rung I's numeral reading), the implicit bound (phase 3, batch 7b's line), item 20's (item 20) and the numeral's rounding into `RR64` (row 443, the line on batch 6's rung T).
- PLAN.md:273, under "Off the path, parked > Climb batch N's first run, listed for his review", 245 characters, names row 387: - Q-walk makes walk convert a body to its declared return type (row 387), so that `getter zero(): ZZ32 = 0` returns no `IntLiteral`;
- PLAN.md:283, under "Off the path, parked > Climb batch 6.5b, listed for his review", 247 characters, names row 527: - Under walk an array of a static size from 2^31 to 2^32−1 stops at its store's factory with walk's own error, which no `catch` sees (row 527);
- PLAN.md:410, under "Off the path, parked > Climb batch 13, listed for his review", 224 characters, names row 675: - Row 675: the compiled class loader computes a size without checking it against its parameter's kind;
- PLAN.md:426, under "Off the path, parked > Climb batch 14, listed for his review", 282 characters, names row 705: Row 705.
- PLAN.md:433, under "Off the path, parked > Climb batch 14, listed for his review", 1521 characters, names row 705: walk still runs the binary one (row 705).
- PLAN.md:444, under "Off the path, parked > Climb batch 15, listed for his review", 946 characters, names F-151, F-229: F-151), and since rung L walk gives a plain array there, as at `AnyIntegral` and at walk's inferred `Int` (`ProjectFortress/tests/ArrayFactoryAbstractNumber.fss:6`; | F-229).
- PLAN.md:445, under "Off the path, parked > Climb batch 15, listed for his review", 974 characters, names row 721: so an array built at a `T` walk infers from a `ZZ32`, `ZZ64` or `RR64` value, or at a user type below `Number`, is plain where it was a vector and loses the `+` and unary `-` the base ran (row 721), and making an `RR64` array under walk is 20 to 40 % slower with the eight arms (the skeptic's measure).
- PLAN.md:450, under "Off the path, parked > Climb batch 15, listed for his review", 304 characters, names row 510: - Call 2, rung B: way 7 reaches a declared variable or return type at an unwritten clause form, not an argument's expected type, which is row 510's general repair;
- PLAN.md:547, under "Off the path, parked > Climb batch 21, listed for his review", 561 characters, names rows 364, 774: row 774 out, and `List extends Equality[\List[\E\]\]` and the `=/=` row in (6, rung N; | walk's half waits until walk runs the checker, P-12, or row 364 is fixed).
- PLAN.md:548, under "Off the path, parked > Climb batch 21, listed for his review", 1270 characters, names row 774: every list keeps its order under walk (row 774).
- PLAN.md:574, under "Off the path, parked > Climb batch 22, listed for his review", 271 characters, names row 824: Row 824.
- PLAN.md:578, under "Off the path, parked > Climb batch 22, listed for his review", 1526 characters, names row 824: under walk the four `String` calls run (T), `List`'s strided subscript answers its own type (row 824) and a subscript of a list on an open element type ends in `CastError` (row 825) (R);
- PLAN.md:611, under "Off the path, parked > Climb batch 23, listed for his review", 436 characters, names row 846: `compile-ladder/climb-batch-23/RECORD.md`, "Points to report"), with walk's `ZZ32` `DIV` by zero raising `DivisionByZero` and the two quiet values that a program's own helper binding can now give (rows 846 and 847).
- PLAN.md:676, under "Off the path, parked > Climb batch 27, listed for his review", 197 characters, names row 923: - Fork E7 of climb batch 27's rung E (row 923): a tuple of four or more compares by `SEQV`, so two such tuples of equal strings built apart are not equal.
- PLAN.md:715, under "Off the path, parked > Climb batch 29, listed for his review", 184 characters, names row 325: - A numeral outside its type's range at a typed place: refused statically, or at run time as the compiled path does today (row 325).

## The lines that look stale at fa630b65f

From `plan-moves.py --stale-at fa630b65f`. Each line: its place, why it looks stale, and its first words. "settled": its own review-queue item is in (a). "list": a list of items that names a settled one, or that differs from the queue's list that it names. "finding": a commit that changes the tree names the review finding that the line holds, so a half of it may be built. Each is a change for `owed.md`: stale, built or answered, or weight none with the reason that it stays.

LOOK PLAN.md:86, under "Phase 4. The switch-over": list: it names items in (a) among open ones: 91. The line: - Q-walk, walk's work in the batch whose step gives walk the checker's static types, after the switch-over (P-12: walk runs the checker and uses the static coer
LOOK PLAN.md:110, under "Phase 5. microGPT compiles": list: it names items in (a) among open ones: 245. The line: - His answers needed before microGPT compiles: review-queue items 3, 6, 31, 37, 58, 60, 223, 245, 248, 284, 320, 323 and 325 (the queue's "Before microGPT compi
LOOK PLAN.md:204, under "Work that can start now, with no decision": finding: a commit names this finding: 40302280cd "Batch script and manual: the commit stage folds F-240's seconds by record.py set; a resume". The line: - Climb batch 23's review, finding 2, the review's proposal: the gather's resume on a dirty tree, against `delegating.md:61`'s stash rule, waits for his yes on

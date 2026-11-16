# Climb batch 32: what changed in the orientation, and its sources

The orientation is `.claude/skills/fortress-repo/references/revival-changes.md` as it stands on `main` at `35b4c2a027`, 29,382 bytes. The new text is `orientation.md` in this folder, 30,376 bytes. The headings are unchanged. Each line number below is the old file's. The admission is `admission.md` in this folder, 2026-11-16.

## "Numbers", `:101`: "Arguments convert by declared coercions, and a generic call promotes" (its last sentence)

- Replaces "Where the tied declarations differ only at the positions of the call's numerals, both paths read the numeral as its default."
- New: "If one of them takes the call's numerals at their default, it runs instead: `1.0 s` for `s: ZZ32` is `RR64`'s product, not `QQ`'s." The tie now also goes to that declaration where the tied declarations differ at another argument.
- Sources: F-366; F-58 for `1.0 s` between `RR64`'s and `QQ`'s product.
- Code: `numeralTie` in `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Functionals.scala:980-1021`; `bestMatchForNumerals` in `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/OverloadedFunction.java:2325-2428`.
- Tests: `compiler_tests/NumeralTieDefaultCompiled`; `tests/NumeralMostSpecificWalk` (`mul(1.0, f)`).

## "Numbers", after `:101`: "Only a numeral's own coercion changes which declaration runs" (a new rule in the same section)

- New. The old file held the subject only as the tie sentence above and as the sentences at `:105`.
- The bold sentence cites P-46, which decides the exception. The sentence on the order cites no decision: P-46 does not word the order, and subtyping on the declared parameter types is the rule as built (F-366).
- Sources: F-366; P-46.
- Ledger: rows 973 and 966, `FIXED` at `b190b8eb25` (rung N of climb batch 32); rows 1016 and 1017, the two departures.
- Code: `numeralAttempt` in `Functionals.scala:980-1021`, `:1066`, `:1117`; `belowByNumerals` in `OverloadedFunction.java:2325-2428`.
- Tests: `tests/NumeralMostSpecificWalk` (`k(5)`, `width(1.5)`); `compiler_tests/NumeralMostSpecificCompiled`; `tests/XXXNumeralBesideAnyWalk` (row 1016); `tests/XXXNumeralBesideTypeParameterWalk` (row 1017).
- Report: `explorations/compile-ladder/climb-batch-32/RECORD.md`, "Rows opened", rows 1016 and 1017, and "Revival changes, for the skill writer".

## "Numbers", `:105`: "`Number` declares nothing" (two sentences)

- Replaces "No `=` ties a numeral type to a number type (P-174): the other operand fixes the numeral's type, so `u = 0` is `true` for a zero `u: NN32`. Under walk it is `false` (row 973): bind the numeral at the value's type first, as `z: NN32 = 0`, then write `u = z`."
- New: "A numeral reaches a number type's own `=` by its coercion (the rule above). So on both paths `u = 0` and `0 = u` are `true` and `u =/= 0` is `false` for a zero `u: NN32`."
- Cut as a repeat: that a numeral type has no `=` with a number type. "A numeral converts where it stands" (`:91`) states it.
- Sources: F-366; F-280 for `Equality`'s own `=/=` (`Library/FortressLibrary.fss:102`).
- Tests: `tests/NumeralEqualsNumberWalk`; `tests/NotEqualNumeral`.
- History, for `sources.md` only: from climb batch 31 to `b190b8eb25`, walk answered `false` for `u = 0` (rows 973 and 966).

## "Reductions and comprehensions", `:115`: the rule on the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`

- Replaces the bold rule "Only walk infers the static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN`." and its next two sentences: "The checker does not, because their bound names the parameter (row 731). Write it in every clause form of these four, as `SUM[\ZZ32\][j <- 0#n] f(j)`."
- New bold rule: "The two paths fix an unwritten static argument of `SUM`, `PROD`, `BIG MAX` and `BIG MIN` from different places." Then the checker's order (the expected type, else the body's type) and one example.
- New paragraph after walk's half: where the checker reads a declared type that does not direct walk, the paths sum in different types (row 1008), with the instruction to write the argument there; and `BIG MIN_MAX` (row 1007).
- Unchanged: walk's half of the paragraph and its three departures.
- Sources: F-364; F-59; P-51 for a reduction written as a call's argument.
- Ledger: row 731, `FIXED` at `d159b71975` (rung C of climb batch 32); rows 1007 and 1008.
- Code: `reductionApplication` in `Functionals.scala`; `Library/FortressLibrary.fsi:2189-2191` for `BIG MIN_MAX`'s two static parameters.
- Tests: `compiler_tests/InferBigOperatorSelfBound`, `InferBigOperatorExpectedType`, `InferBigOperatorUnwritten`; `tests/XXXReductionDeclaredTypeMethodWalk` (row 1008).
- History, for `sources.md` only: until `d159b71975` the checker refused an unwritten clause form of these four reductions (row 731), and the part told the reader to write the argument in every one.

## Fix round, 2026-11-16

`orientation.md` is now 30,647 bytes. The headings are unchanged. Each line gives the place, the change and its source.

- "Reductions and comprehensions", the bold rule: it now names the class, a reduction whose bound names its parameter, with the four as its examples; "Other reductions" is now "A reduction with a plain bound". Source: `preserve.md`, failure 2; F-59; `compiler_tests/InferBigOperatorSelfBound`.
- The same rule, the paragraph on row 1008: it names the four places where the paths differ, without a parameter, and says that a reduction as a call's argument sums in its body's type on both paths. Source: `preserve.md`, failure 1; `cold-read.md`, part 1, "Reductions"; ledger row 1008 ("A call's argument is summed in the body's type on both"); F-364 with P-51.
- "Numbers", "`Number` declares nothing": "(the rule above)" is now "(P-46)", and `h = 0.5` is `true` for `h: QQ = 1/2`. Source: `preserve.md`, failures 3 and 4; `cold-read.md`, 2.15; `tests/NumeralEqualsNumberWalk.fss:15-16`.
- "Static parameters", "Three `where` forms are built": walk and the compiled runtime apply a conditional extension "without its condition". Source: `cold-read.md`, 2.1; ledger row 774.
- "Static parameters", the `OPEN` example: the object whose `T` stayed open, the call `pick((1, 2))`, and row 663. Source: `cold-read.md`, 2.2; F-143; ledger row 663.

## Not placed

- The size. The new text is 1,265 bytes longer than the old. A cut that pays for it is in another rule, and loses a fact there.
- `cold-read.md`, part 2, items 3 and 5 to 20 except 15, and part 3: each is in text that this landing does not change. Item 3 has no ledger row to cite (F-318 names none). Item 4 is the core's sentence.
- A type error in the body of an unwritten reduction is reported as the big operator's refusal (row 1015). It belongs in `compiler.md`, "The checker's gaps".
- The other cases of F-366: `NN64`, `RR32` and `QQ` at `=`, a `case` clause `0`, and a program's own number type with a numeral coercion. The rule covers them; no example names them.
- The library and the model keep their written arguments (F-285, F-59). `library.md:25` owns the sentence, and the landing makes its reason false.

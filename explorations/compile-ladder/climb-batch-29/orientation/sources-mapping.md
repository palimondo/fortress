# Climb batch 29: what changed in the orientation, and its sources

The orientation is `.claude/skills/fortress-repo/references/revival-changes.md` as `6d7a9b1ad6` left it, 25,345 bytes. The new text is `orientation.md` in this folder, 26,991 bytes. Line numbers below are the old file's.

## "Numbers", `:89`: "A numeral has a type of its own" becomes "A numeral converts where it stands" (edit 1)

- Replaces the old rule under the heading "A numeral has a type of its own, which holds its exact value (P-76, P-172)", and its departures list (rows 364, 721, 943, 944).
- Sources: P-173, P-174, P-76, P-172, P-40; F-79, F-341, F-342; folded in: F-57, F-73, F-74, F-128, F-131, F-140, F-229.
- Specification: `Specification/basic/expressions/literals.tex:173-214` (the place that fixes a type, and the default). It replaces the old citation `literals.tex:159-165`.
- Reports: `compile-ladder/rung-numeral-types/REPORT.md` and `compile-ladder/rung-numeral-checker/REPORT.md`, "What changed and why".
- Tests: `tests/NumeralTypesWalk.fss`, `tests/NumeralOwnTypeWalk.fss`, `tests/NatValueZZ32Walk.fss`, `compiler_tests/LiteralDefaultCompiled`, `XXXLiteralTypeUnwritable.test`, `XXXNumeralBeyondZZ32Range.test`, `XXXNatValueNN32Refused.test`.
- History, for `sources.md` only: the team's tests wrote `IntLiteral` as a variable's type and a return type (`Compiled5.ah.fss:17`, `Compiled9.g.fss:18` at `b430f9f42`); the team's `tests/NumberPrintTest.fss:16` asserted that a float numeral prints as written; on the base, walk refused `q: QQ = 0.5`, `s: RR64 = 3000000000`, `u: NN32 = 5` and `r: RR32 = 0.1`.
- The sentence on `array1` and `array2` is kept unchanged.

## "Numbers": "An expression of numerals alone folds exactly before the checker, on both paths" (edit 2, new)

- New bold rule after edit 1. No old entry; it corrects the core's "Before the checker, it folds integer literals" (`SKILL.md:77`) only for the orientation's reader.
- Sources: P-173, P-171; F-339, F-343; F-262 for the negative exponent left unfolded.
- Specification: `Specification/basic/expressions/constant.tex:81-135`.
- Reports: `compile-ladder/rung-literal-fold/REPORT.md`, "The whole suites" (the seven respelled tests); `compile-ladder/rung-string-literals/SKEPTIC.md`, section 1 (the three false greens, `91762b1a68`).
- Tests: `tests/NumeralFoldWalk.fss`, `compiler_tests/LiteralFoldCompiled.test`, `tests/StringLiteralIdentityWalk.fss`.

## "Traits and objects", `:48`: a numeral at `Index` (edit 3)

- Replaces "To the checker a numeral is an `IntLiteral` ... `a[3]` stays valid, because an array indexed by `ZZ32` takes a `ZZ32`." with "A numeral there takes its default, a `ZZ32`, so `f(3)` is valid for `f(x: Index)`."
- Sources: F-278, F-342, F-344 (row 364 closed by `12292add28`); `Specification/appendices/changes.tex:4442-4446`. No P-entry is cited.

## "Traits and objects", `:62`: `SEQV` (edit 4)

- Deletes "Walk departs from both answers (rows 943, 945), and the compiled path from the string answer (row 945); `interpreter.md` and `compiler.md` give the departures." Rows 943 and 945 were closed by `3de571bac7` and `e53480fc6e`.
- Replaces the example `x: RR64 = 0.25 + 0.25`, which now folds into a numeral, with `p + p` for `p: RR64 = 0.25`.
- The `||` sentence now points to "Numbers" for the fold. Its old citation, the Working Draft's `constant.tex:75-79`, moves here.
- Sources: F-326, F-343, F-344; P-171, P-172.

## "Numbers", `:95`: `Number` declares nothing

- "and `IntLiteral`" becomes "and the two numeral types". Source: P-165, F-79.

## "Reductions and comprehensions", `:108`

- "(rows 20, 717)" becomes "(row 717)". Row 20 was closed by `12292add2`. Source: F-228.

## Fix round (from `preserve.md`, `cold-read.md` and `quiz-grade-1.md`)

The new text is 27,702 bytes after this round.

- "A numeral converts where it stands": a place also fixes a type when its declared type is a numeral type (P-173; preserve 4). `Object` is added to the places that take the default (P-173, F-342; preserve 4). The `=` comparison is written `(h = 0.5)` (cold read 2.6).
- Same rule: a numeral that rounds to an infinity is refused, and walk gives `Infinity` (F-342; row 967; preserve 1).
- Same rule: the `nat` sentence cites P-173 beside P-40 (preserve 8). A new sentence gives row 962, a size of 2^31 or more used as a value (F-74, F-140; preserve 1).
- Second paragraph: a compiled program writes `coerce(x: IntLiteral)` until the switch-over (F-79; `compiler_tests/NumeralCoercionOnceCompiled.fss:6`; preserve 3). "One result for each place" is reworded (cold read 2.15; F-341, F-340). The departures pointer names the open rows (`climb-batch-29/RECORD.md`, "Rows opened"; preserve 1).
- "An expression of numerals alone folds": `-0.0` is added to what the fold leaves (F-339; preserve 7). A comparison folds into a boolean, and a quotient of integer numerals defaults to a `QQ` (P-173, F-339; preserve 2, cold read 2.7). The `7/2` example is replaced by `lr = 1/1000` under walk (preserve 6). The `||` sentence keeps P-171 for strings, and states F-343's condition for characters (preserve 5).
- "Arguments convert by declared coercions": walk converts other values at a call, a binding and an assignment, not at a declared return (row 387; F-128; preserve 9, cold read 2.21). A tie at a numeral's position is read at the default on both paths (F-341; cold read 2.4).
- `SEQV` paragraph: the example is shortened to "a computed `RR64` 0.5" (cold read 3.4).
- `/` rule: the reason that a `ZZ64` operand needs `asFloat` (P-74; cold read 2.20).

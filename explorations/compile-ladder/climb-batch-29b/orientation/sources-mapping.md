<!-- Sources of the orientation's changes for climb batch 29b's landing (update mode), copied from the skill's part at a41378d7a2. All changes are in "Numbers". -->

# Sources mapping: climb batch 29b

## Edit 1: "A numeral converts where it stands (P-173)", both paragraphs

Changed sentences:

- The numeral's type, now `NaturalNumeral[\n, r, v\]` or `RadixPointNumeral[\n, m, r, v\]`, with its four numbers and the example `3.125`. Replaces "hold the numeral's exact value".
- "No numeral value exists when a program runs, so a numeral type has no getters, no `asFloat`, no `asString` and no `=` with a number type."
- The prelude sentence, with the `RR64` and `RR32` gap. Replaces both `IntLiteral` and `FloatLiteral` sentences.
- "A place fixes a type when its declared type has a coercion": "is a numeral type, or" dropped.
- The example `(h = 0.5)` deleted.
- "A `nat` or `int` parameter that is a size": the size scope added.
- The generic coercion with the `Byte` example, and its body's `ZZ` numbers. Replaces the non-generic coercion and its getters.
- P-176 cited at "The coercion gives one value for each place".

Sources: P-174, P-173, P-40, P-37, P-176, P-172; F-79, F-341, F-342; `Library/FortressLibrary.fsi:455-470`; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:394-402`, `:440-445`; `Specification/basic/expressions/literals.tex:98-285`; rung A's REPORT.md, sections 1, 6 and 11 (defect 2); row 442; review-queue item 489; `tests/NumeralOwnTypeWalk.fss`, `NumeralStaticDesignWalk.fss`, `NumeralTypeNoValueWalk.fss`, `compiler_tests/NumeralStaticDesignCompiled.fss`. History for `sources.md`: the eight tests that rung A rewrote from the old forms; the admission's probes at `5f35b1d058`.

## Edit 2: "`Number` declares nothing (P-165)"

Changed sentences:

- "Each of the eight number types declares its own `asFloat`": "and the two numeral types" dropped.
- New, after the `SEQV` sentence: no `=` ties a numeral type to a number type; `u = 0` is `false` under walk and `true` on the compiled path (row 973); bind the numeral at the type first.

Sources: P-165, P-174; F-341, F-346, F-324; rows 973 and 966; review-queue item 487; `tests/XXXNumeralEqualsNumberWalk.fss`, `XXXNotEqualNumeral.fss`; the admission's equality probe at `5f35b1d058`.

## Edit 3: "An expression of numerals alone folds exactly"

Changed sentences:

- "Any other result is one exact constant, which converts as a numeral does at a library number type, or takes its default." Replaces "one numeral, which converts as above".
- New, after the examples: a program's own type takes the constant only through a coercion from its default type; `h: Half = 10/20` needs `coerce(q: QQ)`.

Sources: P-174, F-341, F-340, F-345; `tests/NumeralStaticDesignWalk.fss:33-34`, `:66`; the admission's `Tally` probe.

## Fix round

- Edit 1, "in that radix" restored to the fourth number. Source: P-174; `Library/FortressLibrary.fsi:453`. Found by `preserve.md`, failure 4.
- Edit 1, the prelude sentence: "follows the same design", with "it has no `QQ`". Source: P-37; `CompilerBuiltin.fsi` (no `QQ`). Found by `preserve.md`, failure 5.
- Edit 1, the coercion's `ZZ` numbers contrasted with a size's `ZZ32`. Source: P-173, P-40, F-342. Found by `cold-read.md`, section 2, item 4.
- Edit 1, the `where { v < 256 }` clause in the `Byte` example, with its static refusal, the checker's gap and walk's refusal at the binding. Source: `compiler_tests/NumeralWhereRefusedCompiled.fss`, `XXXNumeralWhereRefusedCompiled.test`; `tests/NumeralWhereRefusedWalk.fss`, `.test`. Found by `quiz-grade-1.md`, case 32.
- Edit 2, rewritten: the binding first, as the instruction; walk's default at `=`, with `u = 0`, `h = 0.5` and `r = 3`, cited to row 973 as walk's departure; the compiled `true` scoped "until the switch-over". Source: row 973; F-341, F-346; the admission's equality probe. Found by `preserve.md`, failures 1 to 3; `cold-read.md`, section 2, item 3.
- "The number types are flat siblings": the route C sentence cut. Found by `cold-read.md`, section 3, item 1.
- "A size known only at run time": the narration of why `reflect` fails compiled shortened. Found by `cold-read.md`, section 3, item 3.

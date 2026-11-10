I fixed 15 of the cold read's 19 flags in one commit, `a887954997`, and left 4. Lint is clean on every changed file, and nothing is pushed.

## What a worker would have done wrong, and what the text says now
- **Numeral numbers versus sizes.** "A parameter that is a size" named no case, because every `nat` or `int` parameter is a size. A worker could type a coercion's `v` as a `ZZ32`.
  - `SKILL.md` now says that a `nat` or `int` parameter used as a value is a `ZZ32`, "but a `ZZ` where it is one of a numeral type's numbers".
  - `revival-changes.md` says the same, and says that the coercion's body reads `n`, `r` and `v` as `ZZ` values without a bound.
- **The prelude's exception for numerals.** "The prelude carries their design" did not say what a worker may change. `compiler.md` now says: the prelude's numeral types and its coercions from them follow "Numbers" until the switch-over.
- **Row 442 in one place.** The limit was stated three times, in three forms, and one of them sat in a list of the curator's library decisions. It is now stated once, in `compiler.md`'s traps. Until the switch-over, `RR64` converts only an `RR32` and a numeral with a radix point. So write `3.0`, and `i.asRR64` for a `ZZ32` value `i`. I checked the getter at `CompilerBuiltin.fsi:268`. The copies in `revival-changes.md` and `library.md` are gone, so `library.md` is back to its text before this landing.
- **The rule's answer for `u = 0`.** The text gave walk's answer and the compiled answer, but not the rule's. A worker writing a test could not tell what to assert.
  - "Numbers" now says that the other operand fixes the numeral's type, so `u = 0` is `true`. The gated test `XXXNumeralEqualsNumberWalk.fss` asserts this, and row 973 states it.
  - Walk's answers now sit in `interpreter.md`, beside row 966: `u = 0` is `false`, and `u =/= 0` is `true`. The one workaround is to bind the numeral at the type first.
- **Row 971's workaround.** "Bind to locals" let a worker bind both calls in one tuple, and a tuple's elements run at once. It now says to bind each call in a statement of its own, then write `a - b`.
- **Row 957's workaround.** It used "instance type", which no part defines. It now says: if the body needs the value at one instance only, bind it at a top-level variable whose type names no type parameter.
- **Row 974.** The item gave no answer for a test to assert. It now says that the rules refuse both forms, with the compiled checker's message.
- **Smaller fixes:**
  - "The count of digits after the point", not "the digits".
  - Row 960 now gives the count as the coercion's `n`, not as something it "reads".
  - The `Byte` coercion is now declared in the type's body, as the test file declares it.
  - "One of the eight number types", not "a library number type".

## Flags left
- **The "route C" sentence that the orientation cut** (low): P-95 defines the term where the record uses it, and the judge accepted the cut.
- **A numeral type as an operator's parameter** (low): no source says what such an operator does. Dropping "or an operator" would change the rule's meaning. The alternatives are to keep the text, or to ask what the tree allows.
- **Walk's message for a broken `where` clause** (low): walk gives one message at a top-level binding and another inside a function, so the judge left it out on purpose.
- **`r = 3` with no value given** (low): the sentence moved out of "Numbers", and the `interpreter.md` item does not use the example, so the flag no longer applies.

## Decision not taken
- I stated the rule's answer for `u = 0` as `true`, from the gated test and row 973's text. If the curator answers `false` to his open question on row 973, that sentence changes. The rows for `=` and `=/=` then stop being departures. The other way was to leave the rule's answer unstated, as the orientation judge did.

## For the coordinator
- Row 960 is listed under walk's departures, but the row says that both paths count 2 digits for `00.5`. `compiler.md` has no item for it.
- `compiler.md` is now 32,034 bytes, further over its 30,000-character mark.
- No cold read or quiz has yet read these fixes, or the judge's two corrections.
---
session 4102ea12-db27-4f70-8b6f-9219b0164904 turns 28 cache writes 36484 reads 1987812 output 14837 labels {'ephemeral_1h_input_tokens': 36456, 'ephemeral_5m_input_tokens': 0}

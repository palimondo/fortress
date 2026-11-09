I fixed 26 of the cold read's 30 flags and left 4. Everything is in one commit, `a41378d7a2`, not pushed. Lint is clean on every changed file.

One fix rests only on reading a declaration: the form `("" || c) || s` for compiled code. I did not compile or run it.

## What a worker would have done wrong, and what the text now says

**`SKILL.md`**
- **The phase list.** It said the fold gives "one exact numeral", so a worker would expect a comparison to reach the checker unfolded. It now says the fold gives a numeral, a quotient of two numerals or a boolean. I checked this against the class comment of `IntegerLiteralFoldingVisitor`.
- **"Static parameters".** The sentence on a size used as a value had no pointer to its limits. It now points to "Numbers".

**`compiler.md`**
- **The once-per-place coercion.**
  - The old text said "once per site" with no exception, and "site" was not defined. It now says "once for each place where the numeral is written, except at a generic type".
  - It now also says that a test of such a stop sets `run_exits_nonzero=true`.
- **A character before a string.** The text said what is refused but not what to write. It now gives `("" || c) || s`, from the prelude's `||(self, b:Object)`.
- **The departures list.**
  - The lead named only "a numeral", so "it" in the `typecase` bullet could be read as the size parameter. The lead now says "Numerals and sizes", and that bullet says "a numeral".
  - "Signed" could be read as a Java signed type. The text now says "with its sign, as -3, not as `-` on the coercion of 3".
  - "Which answer is right is open" gave a question's status. It now says "Assert no value for it in a test".
  - I cut "Read the size by dispatch on `Box[\n\]`". A worker could not act on it, and the row does not explain it.
  - The `typecase` workaround is now concrete: bind `x = 7`, then write `typecase x of ...`.

**`interpreter.md`**
- **The lead and row 962.** The lead told the worker to write an `XXX` test for every case, but the row 962 bullet said to assert nothing. The lead now adds "unless the case says otherwise", and the bullet says "Assert no value for it in a test".
- **Row 958.** It now gives the form to write: `c: RR32 = 2.5`, then `c + a`.
- **Row 960.** "Counts 2" could mean digits or zeros. It now says "its `digits` getter gives 2 for `00.5`, not 3".
- **Row 968.** "Integer constant" was not defined. It now says "A negative constant, as `-3` or `5 - 8`", which reaches the coercion "with its sign, as a natural numeral of value -3".
- **"Natives".** "Flat literal" was not defined, and "a `||` of literals" was wider than the rule. It now says "A `||` of string literals folds into one literal, a `FlatString`".

**`library.md`**
- The text said "`Reflect`'s bindings" but did not say where they are. It now names `Library/Reflect.fss`.

**`revival-changes.md`**
- **The `Index` rule.** "There" had no clear referent. It now says "A numeral at a parameter of type `Index`".
- **Walk's refusal of an out-of-range numeral.** A worker could not choose the test's key. The text now says walk refuses it when the binding runs, "with 'Type mismatch binding' and the numeral". This is the message in `NumeralOutOfRangeWalk.test`.
- **Row 962.** "Raises compiled" was clipped, and "a size" was a second word for the parameter. It now says "Such a parameter of 2^31 or more ... raises an error on the compiled path".
- **A program's own number type.**
  - The text did not say how a coercion's body reads the numeral. It now names the getters `digits`, `fractionDigits`, `radix` and `digitValue` (`FortressLibrary.fsi:454-462`).
  - No rule said what a negative numeral does at such a type. It now says: "A negative constant, as `-3`, reaches it as the type's prefix `-` on the coercion's result for `3`, so a type without `-` refuses it". The ground is `Specification/basic/expressions/literals.tex:215-218`.
- **The list of open row numbers.** I cut it. A worker could not act on it, and the orientation judge proposed the same cut. The pointer to `interpreter.md` and `compiler.md` stays.
- **The fold.**
  - "Such as `DIV`, `REM` and `CHOOSE`" left the list open. It now lists all seven from F-339.
  - The type of a quotient that is not whole was not given. It now says that such a quotient "stays `n / d` in lowest terms and defaults to a `QQ`". I checked this in the folding code.
  - The rule for character literals in a `||` chain is now one plain sentence.
  - "Typed operand" could mean declared with a type or not a literal. It now says "variable operand".
- **Row 387.** The sentence that cites row 387 could make a worker treat the whole sentence as a departure. The rule is now one sentence, and walk's departure at a declared return type is a second.

**`tests-writing.md`**
- "Typed operand" is now "a variable operand, not a literal".
- **`run_exits_nonzero`.** "Instead" was unclear. The text now says that the `run_*` checks, and the default `PASS` check where no `run_out` check is given, still apply. I checked this in `FileTests.java:276-282`.

## Flags I left, with the reason
- **`SKILL.md`, the phase list, the `||` fold.** I did not add string literals to step 4. That fold runs in the pre-typecheck desugaring, which the list does not name. Step 4 is the numeral fold only.
- **`revival-changes.md`, "numeral type" (low).** The record does not settle whether `Numeral` itself counts as a numeral type. P-173 and line 99 read two ways. Defining it would be a decision. The two ways are:
  - the two concrete types, `NaturalNumeral` and `RadixPointNumeral`;
  - those two and `Numeral`.
- **`revival-changes.md`, "saturating operators" (low).** No library declaration and no record entry names them. Only the folding code's comment uses the word.
- **`library.md`, the type that no Java type carries (low).** I named the file but not the type, because no entry states it.
- **`tests-writing.md`, `run_exits_nonzero` in an `XXX` file.** The harness code does not settle how the key combines with the `XXX` prefix, so I added nothing.

## Decisions not taken
None beyond the "numeral type" definition above.

## Points for the coordinator
- **`compiler.md` size.** It is now 31,219 characters, over the 30,000 that earlier writers kept it under. A consolidation pass, a new budget, or moving the numeral departures into their own part would settle it.
- **`revival-changes.md` size.** It is now 28,031 characters, +339 from the fixes. Cutting the row list saved some of that.
- **Edit outside the install.** I edited the installed orientation text, which the second task allowed. The orientation workflow's next update should take this text as its base, not `orientation.md`.
---
session 2283395a-ba7c-432c-8c0b-0f0db1404cf3 turns 42 cache writes 37418 reads 4089086 output 17417 labels {'ephemeral_1h_input_tokens': 37370, 'ephemeral_5m_input_tokens': 0}

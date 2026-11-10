<!-- The orientation workflow's preservation check, update mode, for climb batch 29b's landing: each admitted finding of admission.md against the new orientation.md, and each sentence the update removed from the skill's part (at a41378d7a2) against its destination. -->

# Climb batch 29b: preservation check

The old text is the skill's part, `.claude/skills/fortress-repo/references/revival-changes.md` at `a41378d7a2`. The new text is `orientation.md` in this folder. `diff` shows four changed paragraphs, all in "Numbers": `:89`, `:91`, `:93` and `:99`. Nothing else changed. The sources are `admission.md` in this folder; POSITIONS P-37, P-40, P-165, P-173, P-174 and P-176; FACTS F-79, F-341, F-342 and F-346; ledger rows 442, 966 and 973; `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:394-444`; `Library/FortressLibrary.fsi:455-470`; and `ProjectFortress/tests/NumeralStaticDesignWalk.fss`.

## Failures

### 1. Edit 2 leaves out the condition that decides walk's answer, and the `QQ` case with it (F-346, row 973)

**Old, and the admission.** The old `:89` had "`(h = 0.5)` is `true` for `h: QQ = 1/2`". The admission deletes this example and sends its subject to edit 2. The admission's edit 2 then says (`admission.md:160`): "Whether `u = 0` for `u: NN32`, or `h = 0.5` for `h: QQ`, converts the numeral at the other operand's type is open (row 973). Under walk the numeral takes its default there, so this rule answers `false`." Its F-346 row (`admission.md:65`) gives the reach of the rule: "the existing rule, 'two numbers of different types compare by `=` only where a coercion carries one into the other', applies to the numeral's default. `u = 0`, `0 = u` and `h = 0.5` are `false` ... `r = 3` stays `true` for `r: RR64`." Row 973: "`u = 0` meets the library's `=` over `Any`, which the numeral's default `ZZ32` fits as it is".

**New (`:99`).** "No `=` ties a numeral type to a number type (P-174). So for a zero `u: NN32`, `u = 0` is `false` under walk and `true` on the compiled path (row 973). Bind the numeral at the type first: `z: NN32 = 0`, then `u = z`." The text never says that under walk the numeral at `=` takes its default. The `QQ` case is absent. The writer's log says it dropped the `QQ` case because its compiled answer was not checked. Its walk answer is on record, in F-341 and in the admission's probe (`q = 0.5 ... false`).

**Consequence for a worker.** The worker cannot predict a comparison other than the `NN32` example. "No `=` ties a numeral type to a number type" suggests that every typed value compared with a numeral answers `false` under walk. But `r = 3` for `r: RR64` answers `true`, because the default `ZZ32` coerces into `RR64` (the admission's probe). And a worker who holds the deleted `(h = 0.5)` reading, or regression key 26's "`q = 0.5` is `true` too", gets no correction at `QQ`. That worker writes `if q = 0.5` and takes the wrong arm, with no error. The workaround protects only a worker who applies it to every type.

### 2. Edit 2's "So" says more than row 973: it presents both paths' answers as following from the design

**Source.** Row 973 is "implementation gap (walk)", CONTESTED. It reads "under walk a number and a numeral of one value are not `=` ... where the design fixes the numeral at the other's type". It names walk's answer as the mechanism of walk's dispatch ("walk keeps a declaration that fits as it is"). It also gives the curator's open question, "(a) conversion first where more specific, (b) `false`, (c) the pairs kept". The admission's edit 2 says the question "is open (row 973)".

**New (`:99`).** "No `=` ties a numeral type to a number type (P-174). So for a zero `u: NN32`, `u = 0` is `false` under walk and `true` on the compiled path (row 973)."

**Consequence for a worker.** The "So" derives walk's `false` from P-174 alone, as the language's answer. The row counts that same answer as walk's gap. The sentence also derives the compiled `true` from the same premise, which cannot give it: the compiled answer comes from the prelude, which has no `=` over `Any`. A worker who must fix one path, or must judge which path's test is the expected failure, cannot tell from the text which path departs. They may take walk's `false` as settled and "fix" the compiled path, or assert `NOT (u = 0)` in a walk test. Line 7's convention softens this: a sentence that cites a row is not to be asserted. The writer may keep the question's status out, as its log says, but the "So" should not claim a derivation that the row does not make.

### 3. Edit 2's compiled clause has lost its scope "until the switch-over" (row 973)

**Source.** Row 973: "Compiled: `true`, the prelude has no `=` over `Any`." F-346: "The compiled path until the switch-over answers `false` for `u =/= 0` through the prelude's `=/=` on each integer type." The part's own convention (`:7`): "A sentence that opens 'Until the switch-over' states a limit of the compiler's library."

**New (`:99`).** "... `u = 0` is `false` under walk and `true` on the compiled path (row 973)." Nothing marks the compiled answer as the prelude's.

**Consequence for a worker.** A worker takes the compiled `true` as the compiled path's lasting behaviour. They may write a compiled test or code that relies on it. But at the switch-over the compiled path takes the one library's `=` over `Any`, which is the declaration that gives walk its `false`.

### 4. (minor) The fourth number has lost "in that radix" (P-174)

**Source.** P-174: "the digits read as one integer in that radix `v`". `FortressLibrary.fsi:453` says the same.

**New (`:89`).** "the digits read as one integer, so `3.125` is a `RadixPointNumeral[\4, 3, 10, 3125\]`". The admission's own instruction (`admission.md:138`) had already dropped the qualifier. Its correction (`:58`) keeps it.

**Consequence for a worker.** The example is decimal, so it cannot show the difference. A worker who writes a radix-point coercion may read `v` of `0.11_2` as 11, the digit string read in decimal, when it is 3. They then compute the value with `10^m` in place of `r^m`. `NumeralStaticDesignWalk.fss` asserts `0.1_2 SEQV 0.5`, so programs do write such numerals.

### 5. (minor) "the same types and coercions" says more than the prelude holds (P-37)

**Source.** P-37: "until the switch-over the prelude carries the design of P-174 and P-176". `CompilerBuiltin.fsi` declares no `QQ`, so it has no `QQ` coercion from either numeral type. The admission (`:140`): "Do not claim that the prelude matches in full."

**New (`:89`).** "Until the switch-over, the compiler's prelude declares the same types and coercions (P-37), but its `RR64` and `RR32` take only a radix-point numeral". The only exception it names is `RR64` and `RR32`.

**Consequence for a worker.** The risk is low, because `:103` already says that the compiler's library has no `QQ` until the switch-over. A worker who reads only this sentence may still expect a compiled `q: QQ = 0.1` to bind. Writing "the same design" (P-37's word) would claim no more than the source.

## Rows checked

I checked 23 rows. They all hold except as listed above.

- **The nine admitted entries:** P-174, F-79, P-37, P-173, P-40, P-165, F-341, F-346 and F-342. Failures 1 to 3 are F-346's, failure 4 is P-174's, and failure 5 is P-37's.
- **The five entries the admission folds into the edits:** F-57, F-131, F-324, P-172, and P-176's citation at `:91`. All are kept.
- **The nine old passages that the update removed or replaced.** Each has its destination in the new text:
  - `:89` "and hold the numeral's exact value";
  - `:89` the prelude's `IntLiteral` and `FloatLiteral`;
  - `:89` "is a numeral type, or";
  - `:89` `(h = 0.5)`, which goes to edit 2 and is only partly kept there (failure 1);
  - `:89` the `nat` or `int` parameter, now scoped to a size, with the `ZZ` reading moved to `:91`;
  - `:91` `coerce(x: NaturalNumeral)` and its getters;
  - `:91` the compiled `coerce(x: IntLiteral)`;
  - `:93` "one numeral, which converts as above";
  - `:99` "and the two numeral types".

Two cuts are kept in substance:
- Edit 3 left out the admission's `t: Tally = 2 + 3` example. Its rule stays in "a numeral coercion is not enough".
- The prelude sentence's "write `3.0`, not `3`" keeps its scope through the sentence's opening, "Until the switch-over".

Outside this check: the file is 28,887 bytes. That is 856 more than the old part, where the admission asked the edits to add nothing net.

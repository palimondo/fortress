<!-- Preservation check, update mode, climb batch 29: the new `orientation.md` in this folder against the skill's current part (`.claude/skills/fortress-repo/references/revival-changes.md` at `6d7a9b1ad6`), `admission.md`, and the FACTS and POSITIONS entries it admits. Read-only: nothing else was changed. -->

# Climb batch 29: preservation check of the orientation

The diff against the current part touches five places: `:48`, `:62`, `:89` (now `:89`, `:91` and `:93`), `:95` (now `:99`) and `:108` (now `:112`). All four edits are made where the admission says. No closed row (20, 364, 721, 943, 944, 945) and no `IntLiteral` outside the prelude sentence is left in the new text. Below are the failures, the most serious first. Line numbers are `orientation.md`'s unless another file is named.

## Failures

### 1. The departures pointer leads to parts that do not hold the departures, and that contradict edit 1

**Source.** The admission sends each path departure of edits 1 and 2 to the area parts. F-74's row says "row 962 to `interpreter.md`'s departures", and F-140's row says "the departures to `interpreter.md` and `compiler.md`". Its "Elsewhere" list gives the open walk rows "958, 960, 962, 966, 967, 968" and the compiled rows "957, 961, 962 (contested), 963, 964 and 965". F-342 says "a numeral outside a bounded number type's range, or rounding to an infinity, is a static error", and row 967 (NEGATIVE-VERIFIED) says "under walk a numeral that rounds to an infinity at a typed place of `RR32` or `RR64` converts to `Infinity` with no error".

**New text.** `:91`: "`interpreter.md` and `compiler.md` give each path's departures from these rules, with their rows." `:89`: "A numeral outside the type's range is refused: by the checker statically, by walk when it runs." Also `:89`: "A `nat` or `int` parameter used as a value is a `ZZ32`". This is stated for both paths, and row 962 is the exception under walk.

**The destination.** `interpreter.md` and `compiler.md` cite none of the rows 387, 506, 527, 957, 958, 960, 961, 962, 963, 964, 965, 966, 967 or 968 (grep of both files). `interpreter.md:18-25`, the place the pointer reaches, still lists only closed rows. For example, `:21` reads "Walk refuses `q: QQ = 0.5`, and answers `false` to `1/2 = 0.5` (ledger row 944)". `:25` reads "walk computes arithmetic on numerals, as `3 + 4`, at `ZZ32`, where the checker types it `IntLiteral`". `compiler.md:106` still reads "Each evaluation of a string literal makes a new string object, so `"ab" SEQV "ab"` is `false` (ledger row 945). A test of it asserts `true`, as an `XXX` test."

**Consequence.** Edit 1 tells a walk worker that an out-of-range numeral is refused. That worker meets `wide: RR32 = 340282356779733661637539395458142568448` printing `Infinity` (row 967), a `nat` size of 2^31 read as a `ZZ64` (row 962), or `u =/= 0` answering `true` for a zero `NN32` (row 966). The pointer then leads to bullets that state the opposite of edit 1, and that ask for `XXX` tests of behaviour that is fixed. The worker either writes expected-failure tests for closed rows or records the open rows a second time. The orientation is correct only once `interpreter.md:18-25` and `compiler.md:106` are rewritten as the admission's "Elsewhere" asks. Install them in the same change, or keep the old pointer's form until then.

### 2. The fold's result loses the quotient default, and a comparison's result is not a numeral

**Source.** P-173: "An expression of numerals alone folds exactly before the checker into a signed constant, which defaults as an integer numeral, as a `QQ` for a quotient, or as an `RR64` with a radix point: so `x = 7/2` is a `QQ`". F-339: "A result is an integer numeral, a decimal or prefix minus on one, `n / d`, `p.0 / d` or a boolean".

**New text.** `:93`: "Its result is one numeral, which converts or takes its default as above." The default "above", at `:89`, is "`ZZ32`, or `ZZ64` or `ZZ` where its value does not fit, and `RR64` with a radix point". `QQ` is not in it. The same paragraph then says "`7/2` is a `QQ`", so the rule and its example disagree. A folded comparison, `0.1 + 0.2 = 0.3`, is a boolean, not a numeral.

**Consequence.** A worker who applies the rule, not the example, takes an untyped `lr = 1/1000` as a `ZZ32`, an `RR64` or an error. It is a `QQ`, and an `RR64` place then refuses it, as `:89` says of `x = 0.1`. MicroGPT-style untyped hyperparameters are exactly this case (P-173's "Why"). Suggested wording: "Its result is one numeral, or a boolean for a comparison. It converts as above, or takes its default: a quotient of integers is a `QQ`."

### 3. A program's own coercion is named only by the one library's names, but the compiled path still needs `IntLiteral`

**Source.** F-79: "The compiled checker's `Types.INT_LITERAL` and `FLOAT_LITERAL` name these two types under the one library and the prelude's `IntLiteral` and `FloatLiteral` under the compiler's". The compiled tests of this batch write `coerce(x: IntLiteral) = do` (`ProjectFortress/compiler_tests/NumeralCoercionOnceCompiled.fss:6`, `NumeralCoercionRaisesCompiled.fss:6`). `NaturalNumeral` is declared only in the interpreter's library (`LibraryBuiltin/FortressBuiltin.fss:214`).

**New text.** `:91`: "A program's own number type receives a numeral through its own `coerce(x: NaturalNumeral)` or `coerce(x: RadixPointNumeral)`". It has no path qualifier. The difference can be inferred only from `:89`: "Until the switch-over, the compiler's prelude names them `IntLiteral` and `FloatLiteral`."

**Consequence.** A worker who writes a compiled program's own number type copies `coerce(x: NaturalNumeral)`. The program does not compile, because the prelude has no such type. Add "(until the switch-over, compiled: `IntLiteral`, `FloatLiteral`)" to the sentence.

### 4. The definition of a place that fixes a type drops "or is a numeral type", and the default places drop `Object`

**Source.** P-173: "A place fixes a type when its declared type has a coercion from the numeral type, as the eight number types have and a program's own type may (P-174), or is a numeral type; `Any`, `Object`, `Number`, an unbounded type parameter and no declared type take the default." F-342 says the same: "has a coercion from the numeral's type or is a numeral type (an untyped binding, `Any`, `Object`, `Number`, ...)". The admission's own point for edit 1 lists "`Any`, `Object`, `Number`, `Index`".

**New text.** `:89`: "A place fixes a type when its declared type has a coercion from the numeral type, as each of the eight number types has." It has no numeral-type clause. Also `:89`: "Elsewhere includes an untyped binding, `Any`, `Number`, `Index` and an unbounded type parameter." It has no `Object`.

**Consequence.** By the new definition, an operator's parameter `x: NaturalNumeral` fixes no type, so a numeral there would take its default, a `ZZ32`, and miss the operator. That contradicts `:91`'s "Write a numeral type only as the parameter type of a coercion or an operator", which only makes sense if the numeral arrives there unconverted. A worker who designs a number type's operators on a numeral cannot tell which reading holds. The missing `Object` matters less, since "includes" leaves the list open.

### 5. The `||` fold cites P-171 for character literals, and loses F-343's condition

**Source.** P-171: "a concatenation of two string literals is folded into one literal". It says nothing of characters. F-343: the desugaring "folds infix `||` of string literals, or of string and character literals with a string among the first two".

**New text.** `:93`: "The fold also joins string and character literals under `||` into one literal (P-171)."

**Consequence.** By `:5`, a sentence that names a P-entry states a decision. Here the character half is a fact (F-343), not a decision, and the condition "with a string among the first two" is lost, so a reader takes `'a' || 'b' || "c"` as folded. The risk is small: a test that leans on the fold of two characters asserts one object where the tree builds a new string. Cite F-343's condition, or drop "and character".

### 6. "On both paths" carries an example that only walk can show today

**Source.** Only walk tests the `QQ` example: `rung-literal-fold/REPORT.md:74`, "`tests/NumeralFoldWalk.fss`: under walk, ... `7/2` a `QQ`". `compiler_tests/LiteralFoldCompiled.fss` has no quotient. The orientation's own `:103` reads: "Until the switch-over, the compiler's library has no `QQ` ... so a compiled `7 / 2` is a static error."

**New text.** The head of `:93` reads "**An expression of numerals alone folds exactly before the checker, on both paths (P-173).**" Under it: "`0.1 + 0.2 = 0.3` is `true`, and `7/2` is a `QQ`."

**Consequence.** This is a small tension between `:93` and `:103`. A compiled worker may take `x = 7/2` as a `QQ` binding until they read `:103`. Qualify the example: "(under walk until the switch-over)".

### 7. The fold's exception for a possible `-0.0` is dropped

**Source.** F-339: "it leaves the wrapping, saturating and bitwise operators, the shifts, a division by zero and a possible `-0.0`". The admission's list also leaves out `-0.0`.

**New text.** `:93`: "The fold leaves alone the wrapping, saturating and bitwise operators, the shifts, a division by zero, and an integer base at a negative exponent." It does not mention `-0.0`.

**Consequence.** This is minor. A worker who reads the list as complete takes `0.0 (-1.0)` as an exact folded zero. It is a run-time `-0.0`, and `SEQV` (by bits, `:58`) tells it from `0.0`.

### 8. The `nat` sentence cites only P-40, whose text says the opposite

**Source.** P-173: "a `nat` parameter used as a value is a `ZZ32` (P-40)". P-40 itself says: "A size used as a number, as in the range `0#n`, converts to `ZZ32` where one is needed, as a numeral does." The admission asked for "(P-173, P-40)".

**New text.** `:89`: "A `nat` or `int` parameter used as a value is a `ZZ32`, so `u: NN32 = n` is refused (P-40)."

**Consequence.** The rule is correct (`compiler_tests/XXXNatValueNN32Refused.test`, `tests/NatValueZZ32Walk.fss`). But a worker who checks the citation reads "as a numeral does", and a numeral converts into `NN32`. Cite P-173 beside P-40.

### 9. Two folded rows name destinations that do not hold them

**Source.** F-128's row: "row 387 stays in `interpreter.md`". F-128: "Not converted, as measured: a value other than a numeral at a declared return (row 387; a numeral converts there, F-341)". F-73's row: "`compiler.md` for row 506".

**New text and destination.** `:89` lists "a declared return type" among the places where a numeral converts. `:95` is unchanged: "Walk converts at a call, a typed binding and an assignment". Neither `interpreter.md` nor `compiler.md` cites row 387 or row 506 (grep), and the old part did not either.

**Consequence.** A walk worker can generalize edit 1's "declared return type" to other values, and expect `f(): ZZ64 = z32` to convert under walk. Row 387 says it does not. This is a small risk, but the place the table names for the caveat is empty.

## Not failures

These were checked and found kept:

- Edit 3, at `:48`, matches F-278 ("a numeral at `Index` takes its default, a `ZZ32`, on both paths"), with no P-entry, as the admission asks.
- Edit 4 deletes the row 943 and 945 sentence. Its example `p + p` from `p: RR64 = 0.25` agrees with F-326 and with `tests/StrictEquivalenceRuleWalk.fss:26-32`.
- The `IntLiteral` rename at `:99` matches P-165.
- Row 20 is dropped at `:112`, as F-228 asks.
- These parts of P-173, F-341, F-342 and F-79 are kept:
  - the numeral types and their place under `Number`;
  - the prelude's names;
  - the places that fix a type;
  - exact conversion, or one rounding (P-76, P-172);
  - static refusal against refusal at run time;
  - the default by value;
  - "the default stays the value's type";
  - the narrowest default for a type parameter;
  - the written-only rule;
  - one result per site;
  - refusal without a coercion;
  - the `array1` and `array2` sentence.
- The fold's coverage, the exponent limit, the negative exponent (F-262), the three examples and the typed-operand rule for tests match F-339 and F-343.
- No sentence states item 448's negative numeral, item 450's "once per class", or a rejected design.

## Outside this part (the admission's "Elsewhere"), confirmed still false

These parts contradict the new text, and a worker reads them beside it:

- `SKILL.md:77`: "Before the checker, it folds integer literals". This is the compiled path only, against `:93`'s "on both paths".
- `SKILL.md:132`: "`nat` is an `NN32` value".
- `tests-writing.md:34`: "Write `a: NN32 = unsigned(5)`, not `a: NN32 = 5`", against `:89`'s "`u: NN32 = 5` binds".
- `compiler.md:106`.
- `interpreter.md:18-25` (failure 1).
- `library.md:56`: "as for `IntLiteral`'s bindings".

Install the orientation together with their corrections.

## Count

20 rows were checked:

- the 8 admitted entries: P-173, F-341, F-342, F-79, F-339, F-343, F-278 and F-344;
- the 11 rows folded into the edits: F-57, F-74, F-131, F-140, F-73, F-229, F-326, F-128, P-76, P-172 and P-165;
- F-228's citation-only edit.

Four rows that were not admitted were read only as far as the new pointer at `:91` relies on them: F-340, F-346, F-262, and row 962 by way of F-74 and F-140. There are 9 failures. Failure 1 blocks installing the part alone. Failures 2 to 4 change what a worker does. Failures 5 to 9 are minor.

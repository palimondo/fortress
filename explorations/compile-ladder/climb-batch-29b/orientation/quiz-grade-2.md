# Quiz grading, round 2 (cases 5, 16, 26, 31, 32)

Answers: `quiz-answers-2.md` in this folder. Key: `explorations/coordinator/tools/orientation/regression/key.md`, as in the working tree on `main` at `5f35b1d058` (2026-11-10, with climb batch 29b's update to cases 5, 16, 26 and 31 and the new case 32). Orientation under test: `orientation.md` in this folder, as revised after round 1. Graded by decision and scope, as the key's "How to use it" says.

## Counts

- Right: 4 (cases 5, 16, 26, 31)
- Right without its path or scope qualification: 1 (case 32)
- Wrong: 0
- Against the orientation: case 32's partial grade. A passage misled the reader: line 91's sentence "The checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`)". The key says this sentence misreads the `XXX` prefix (case 32, "Since earlier keys"). Round 1's missing rule, the coercion's `where` clause, is now in the orientation, and this reader used it.

## Case by case

### Case 5: right

- Decision: `seconds: RR64 = asFloat(elapsed) / 1000000000.0`. This is the key's line.
- The reader avoids each of the key's Wrong forms:
  - It says `elapsed / 1000000000` is a `QQ`, not a float.
  - It does not use `(1.0 elapsed)` for the `ZZ64`.
  - It claims no implicit conversion for a `ZZ64`. It says nothing about what the unconverted `elapsed / 1000000000.0` gives, and the key accepts that.
- The `ZZ32` question is answered. A `ZZ32` converts into `RR64` implicitly, so `elapsed / 1000000000.0` gives a float, and keeping `asFloat` is fine. This matches the key's `ZZ32` sentence and its Partial.
- The reader does not write `asFloat` of a numeral.
- The reader writes the divisor out in full and would check the exponent form in the lexical chapter before using it. The key also accepts `1.0E9`, so this caution costs nothing.
- Scope (not required): the reader says the rule holds under walk and for the one library after the switch-over. It says that before the switch-over the prelude has no `QQ` and declares `/` only at `RR64`. Both points match the key's Scope.

### Case 16: right

- Decision: `n: NN32 = 3` binds on both paths, written as it is. This is the orientation's rule "A numeral converts where it stands (P-173)" and its example `u: NN32 = 5`.
- Compiled path: the prelude follows the same numeral design (P-37). Its exceptions (no `QQ`, and radix-point numerals only at `RR64` and `RR32`) do not touch `NN32`. This matches the key.
- The reader names the assertion trap, which the key counts as right:
  - Under walk, `n = 3` is `false` (row 973).
  - `assert(n, 3, msg)` fails.
  - `n =/= 3` is `true` (row 966).
  - Before the switch-over, the compiled `u = 0` is `true`.
- The reader's check is `three: NN32 = 3` and `assert(n = three, msg)`. That is one of the key's two forms (row 973's workaround).
- The getter it gives for a computed value is `x.asNN32` on a variable, not `3.asNN32` on a numeral, so the parse trap does not arise.
- The stale `tests-writing.md:34` and `interpreter.md:23` did not mislead the reader.

### Case 26: right

- (a) Decision: `asFloat(count) = limit`. The reader says `count = limit` gives `false` with no error for 3 and 3.0: no coercion joins `ZZ64` and `RR64`, so `=` falls to `SEQV`. This is the key's answer.
- (a) `ZZ32`: `count = limit` is `true`, because a coercion carries `ZZ32` into `RR64` and the library declares `=` for that pair. The reader keeps the `asFloat` line, which the key also accepts.
- (a) `QQ`: the reader says `count = limit` is `SEQV` and `false`, and writes `asFloat(count) = limit`. This matches the key. It would confirm the plain form's value before asserting it in a test. It says where it would look (`RR64`'s coercions in `Library/FortressLibrary.fsi`, or a one-line probe under walk), and its chosen line is right whatever the result. That meets the key's test for "look it up first".
- (a) The reader does not call `q = 0.5` `true`, so the key's Partial for that does not apply.
- (a) Scope: the rule is walk's now and both paths' after the switch-over, and the compiler's library has no `=` over `Any` until then (orientation, line 62). The key's own Scope point, that the prelude has no `asFloat`, is not needed for a right answer.
- (b) Decision: `near` declared at each of the eight number types, with matching headers in the api and the component. The seven non-`RR64` bodies call `near(asFloat(a), b)`, which reaches the `RR64` overload. The key accepts this form ("declare it at each number type, each body by that type's own `asFloat`"). Routing through the `RR64` overload is a detail.
- (b) The reader says why the generic one fails: `Number` declares nothing, so the checker refuses `asFloat` on a `T extends Number` in the count stage. It proposes no new trait and puts nothing back on `Number`, so neither of the key's Wrong forms for (b) applies.
- (b) Its steps fit the area parts:
  - it looks up the record and existing names first;
  - it writes a failing walk test first;
  - it uses `COLD_CACHE=1` for a new overload (row 342);
  - it runs the count stage and checks the `#total 0` table;
  - it runs the demo driver once, since this is a library edit.
- (b) The reader hedges on how absolute value is spelled, and gives a fallback. That is not graded.

### Case 31: right

- (a) Decision: the binding does not run. `nSamples` takes its default, `ZZ64`, and the default stays the value's type. No coercion carries a `ZZ64` into `RR64`, so walk stops when the binding runs, and the checker refuses it statically. This is the key's answer.
- (a) The repair is `scale: RR64 = asFloat(nSamples)`, one of the key's two repairs. The reader says why the binding fails, so the Partial for one repair does not apply.
- (a) Its side note about loops matches `library.md:22`: scalar ranges are over `ZZ32` only.
- (b) Decision: `m: ZZ32 = 2147483647`, then `m + 1` in a `try` whose `catch` takes `IntegerOverflow`. A `var raised` flag is set in the `catch`, and `assert(raised, msg)` checks it. The reader says why `2147483647 + 1` would not work: it folds exactly into the `ZZ64` 2147483648. This matches the key.
- (c) Decision: `a`, `b`, `c` and `d` all typed `RR64`. It asserts `NOT (a + b = c)` and `a + b = d` (the double nearest 0.30000000000000004). It says why `0.1 + 0.2 = 0.3` would not work: the expression folds into `true`. This matches the key.
- Compiled path:
  - The reader says the fold runs before the checker on both paths, so both tests need their variable operands compiled too. This is the key's answer, and it is not one of the Wrong forms: the reader does not say the compiled path computes numerals at their types, or that it folds only integers.
  - It says (c) tests the same thing compiled.
  - For (b), it carries the lines over. It would claim the same property only after the compiled test passes through `junit.sh`, and it would record a defect if the test fails. The record says the compiled `ZZ32` `+` raises `IntegerOverflow` (P-73, F-132), so the plan ends at the key's answer.
  - It gives the place to check and what it does with each result, as the key requires of "look it up first".
- Cause of the (b) hedge, not graded: no passage in the reader's sources says the compiled `ZZ32` `+` raises an `IntegerOverflow` that a `catch` sees. The core's "Overflow raises `IntegerOverflow`" (`SKILL.md:134`) names no path. The reader set it against the orientation's rows 441 and 523, where a compiled power at base 0 throws a Java exception that no `catch` sees.

### Case 32: right without its path qualification

- The declaration is the key's, verbatim: `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v.asZZ32)`, with `v` read as a `ZZ` of any size. The reader avoids every Wrong form of the key:
  - no plain `NaturalNumeral`;
  - no getter or `asFloat` on `x`;
  - no `Byte(v)` without a conversion;
  - no `IntLiteral`;
  - no numeral type as a field's, a variable's or a return's type.
- `x: Byte = 255` binds `Byte(255)`, one value for the place (P-176). `-3` is refused because `Byte` declares no prefix `-`. Both match the key.
- `300` by the rule, statically, and under walk when the binding runs: right. This round the reader refuses `300` by the `where` clause, not by a raising body.
- `300` on the compiled path: wrong.
  - The reader says that "today it is not refused at all": the checker does not refuse it yet, the code generator emits no code for the clause, and the coercion runs in the static initializer. Its scope line reads "Compiled, today: binds 255, does not refuse 300".
  - The key: the compiled checker refuses `300` statically, 'The numeral 300 does not meet the where clause of the coercion to Byte.' `compiler_tests/XXXNumeralWhereRefusedCompiled.test` is a refusal test: it has `compile` and `compile_err_contains=` that message, and is green when the compile fails (`tests-writing.md`, "Writing an `XXX` test").
  - This is the key's Partial, "`300` said to be refused only under walk".
- `z: Byte = 2 + 3`: right.
  - The reader says it does not bind: `2 + 3` folds into the `ZZ32` 5, and coercions do not chain, so the numeral coercion is not enough.
  - Its chosen fix is `z: Byte = 5`.
  - Its alternative is a `coerce(x: ZZ32)` with its own range check. It names the cost: every `ZZ32` then converts implicitly, and the check moves to run time. This meets the key's condition, "right only if the reader bounds it and says so".
- Under walk, for `2 + 3`, the reader hedges. Stale area parts say a folded negative constant reaches the numeral coercion with its sign: `interpreter.md:25` (row 968) and `compiler.md:109` (row 961), both closed. So the reader expects walk might bind the line, and would probe before asserting. It still states the rule's answer, and the probe would find walk's refusal. This does not change the grade.
- Scope (not required): before the switch-over, `v.asZZ32` may not compile on a `ZZ`, since the prelude has `asZZ32` only on `ZZ32` and `ZZ64` (row 349). This is the key's point, though without its helper `small(v)`.
- **Cause: a passage of the orientation misled the reader.** Line 91 says: "The rule refuses statically a numeral that breaks it, as `300` here. The checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`), and walk refuses it when the binding runs". The reader quotes this and follows it. The key's "Since earlier keys" for case 32 names the error: the sentence reads the `XXX` prefix as an expected failure, but in a compiled folder it marks a refusal test, and climb batch 29b's `RECORD.md:143` lists the test as showing that the tree refuses the numeral statically. The reader's other claim, that the code generator emits no code for a declaration's own clause, matches line 79 and the key's case 24. It is true, but it does not apply here: the checker refuses `300` before code generation.

## Notes for the fix round

- Orientation, line 91: replace "The checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`)" with a sentence that the compiled checker refuses the numeral statically, 'The numeral 300 does not meet the where clause of the coercion to Byte.' (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`, a refusal test). This is the only cause of a non-right grade this round.
- `interpreter.md:25` (row 968, closed) and `compiler.md:109` (row 961, closed) still say a negative constant reaches the coercion with its sign. This is the second round in which they produced a hedge in case 32. The key's Skill line for case 32 lists `interpreter.md:25` but still not `compiler.md:109`.
- Case 31 (b): no passage says the compiled `ZZ32` `+` raises `IntegerOverflow` into a `catch` (P-73, F-132). The reader hedged, but the grade did not change.

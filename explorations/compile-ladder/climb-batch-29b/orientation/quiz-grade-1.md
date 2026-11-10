# Quiz grading, round 1 (cases 5, 16, 26, 31, 32)

Answers: `quiz-answers-1.md` in this folder. Key: `explorations/coordinator/tools/orientation/regression/key.md`, as in the working tree on `main` at `5f35b1d058` (2026-11-10, with climb batch 29b's update to cases 5, 16, 26, 31 and the new case 32). Orientation under test: `orientation.md` in this folder. Graded by decision and scope, as the key's "How to use it" says.

## Counts

- Right: 4 (cases 5, 16, 26, 31)
- Right without its path or scope qualification: 1 (case 32)
- Wrong: 0
- Against the orientation: case 32's partial grade. The orientation does not state the rule the key needs there, a coercion's `where` clause over the numeral's numbers. The key itself says to name this rule as missing.

## Case by case

### Case 5: right

- Decision: `seconds: RR64 = asFloat(elapsed) / 1000000000.0`. This is the key's line.
- The reader avoids each of the key's Wrong forms:
  - `elapsed / 1000000000` is a `QQ`, the reader says, not a float.
  - The reader does not use `(1.0 elapsed)` for the `ZZ64`. It says that form "does not work for a `ZZ64`".
  - It claims no implicit conversion. It says nothing about what the unconverted `elapsed / 1000000000.0` gives. The key accepts that.
- The `ZZ32` question is answered. A `ZZ32` converts into `RR64` implicitly, so `(1.0 elapsed) / 1000000000.0` would also work, and keeping `asFloat` is fine. This matches the key's `ZZ32` sentence and its Partial.
- The reader writes the numeral out in full. It would probe `1e9` with `bin/fortress parse` before using it. The key also accepts `1.0E9`, so this caution costs nothing.
- Scope (not required): the reader names the compiled prelude's limits, `/` only at `RR64` and a radix-point numeral (row 442). It says "the line meets both limits". It then hedges that it has not checked whether the prelude declares `asFloat` on `ZZ64`. It does not: the prelude declares no `asFloat` (`CompilerBuiltin.fsi:96`) and its `ZZ64` no conversion into `RR64` (the key, case 5 and case 26 Scope). The key's scope point is not needed for a right answer, and the reader's hedge stops this from being a wrong claim.

### Case 16: right

- Decision: `n: NN32 = 3` binds on both paths, written as it is. This is the orientation's rule "A numeral converts where it stands (P-173)" and its example `u: NN32 = 5`.
- The reader names the assertion trap, which the key counts as right:
  - Under walk, `n = 3` compares an `NN32` with a `ZZ32` default, and can be `false` (row 973).
  - `n =/= 3` is wrong too (row 966).
  - The reader's check is `three: NN32 = 3` and `assert(n = three, msg)`. That is one of the key's two forms (row 973's workaround).
- The reader avoids the three-argument `assert(n, 3, msg)`. Its reason (row 807) is weaker than the key's (`assert`'s parameter of type `Any` gives the numeral its default `ZZ32`), but the reason is not graded.
- Scope: both paths, through the prelude's same numeral types and coercions (P-37). This matches the key. The reader adds that a size parameter used as a value is a `ZZ32`, so `u: NN32 = n` is refused, and it uses a getter for a computed value. Both are sound.
- The stale `tests-writing.md:34` did not mislead the reader this round.

### Case 26: right

- (a) Decision: `asFloat(count) = limit`. `count = limit` gives `false` with no error for 3 and 3.0: no coercion joins `ZZ64` and `RR64`, so `=` falls to `SEQV`. This is the key's answer.
- (a) `ZZ32`: `count = limit` is `true`, since a coercion carries `ZZ32` into `RR64` and the library declares `=` for that pair. The reader keeps `asFloat`, which the key also accepts.
- (a) `QQ`: the reader says its passages do not settle whether `RR64` coerces from `QQ`. It meets the key's test for "look it up first" answers:
  - Where: `RR64`'s `coerce` declarations and cross-type `=` in `Library/FortressLibrary.fsi`.
  - What it does with each result: with no coercion, `count = limit` is `SEQV` and `false`, and `asFloat(count) = limit` is right either way. It writes the `asFloat` line for the `QQ`.
  - There is no such coercion, so the plan ends at the key's answer.
- (a) The reader does not call `q = 0.5` `true`. That would have been the key's partial grade.
- (a) The orientation's sentence "No `=` ties a numeral type to a number type" gives an example only at `NN32`. That gap did not affect this answer.
- (b) Decision: one `near` at each of the eight number types, each body using that type's own `asFloat`, with the same headers in the api. The key lists this as one of its two right forms.
- (b) The reader says why the generic one fails: `Number` declares nothing, so the checker refuses `asFloat` on a `T extends Number`. It proposes no new trait and puts nothing back on `Number`.
- (b) Its steps fit the area parts: `COLD_CACHE=1` for a new overload (row 342), the count stage with `#total 0` and its export check, and a demo run for a library edit.
- Scope: (a) is the interpreter's library's rule. (b) applies to walk and the count stage. Before the switch-over, no compiled program links this library. This matches the key.

### Case 31: right

- (a) Decision: the binding does not run. `nSamples` takes its default, `ZZ64`, and "the default stays the value's type". No coercion carries a `ZZ64` into `RR64`, so walk fails when the binding runs and the checker refuses it statically.
- (a) The repair is `scale: RR64 = asFloat(nSamples)`. That is one of the key's two repairs. The reader also says why the binding fails, so this is not the partial grade.
- (b) Decision: a typed `m: ZZ32 = 2147483647`, with `m + 1` in a `try` whose `catch` takes `IntegerOverflow`, and an assertion that the `catch` was reached. The reader also says why `2147483647 + 1` would not work: it folds into the `ZZ64` 2147483648. This matches the key.
- (c) Decision: typed `a`, `b` and `c` at `RR64`, and `assert(NOT (a + b = c), msg)`. The reader also says why `0.1 + 0.2 = 0.3` would not work: it folds into `true`. This matches the key.
- Compiled path: the reader says the fold runs before the checker on both paths, so the variable operands are needed on both. The compiled `RR64` `+` is IEEE. The property tested is the same. This is the key's answer. The reader also notes:
  - a compiled test is a separate `compiler_tests/` file with a `.test` file;
  - the compiler's library has the two-value `assert` only at `ZZ32`, `String` and `Character`, which the key's Scope gives too;
  - the compiled `try` traps (rows 888 to 891).
- Compiled `IntegerOverflow`: the reader would first check, in the ledger (`ledger-find:IntegerOverflow`) and in the compiler's prelude, that a compiled `ZZ32` `+` raises `IntegerOverflow` (it does: P-73, F-132). It says where it would look, and that the property is the same if the check passes. That is not one of the key's Wrong forms: the reader neither says the compiled path computes numerals at their types nor that it folds only integers.

### Case 32: right without its scope qualification

- The coercion's shape is right: `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\])`, with `Byte(v.asZZ32)` and `v` read as a `ZZ` of any size. The reader avoids every Wrong form of the key:
  - no plain `NaturalNumeral`;
  - no getter or `asFloat` on `x`;
  - no `Byte(v)` without a conversion;
  - no `IntLiteral`;
  - no numeral type as a field's, a variable's or a return's type.
- The refusal of `300` falls short of the key. The key refuses `300` with the coercion's `where { v < 256 }`: the compiled checker refuses it statically, and walk refuses it when the binding runs. The reader instead gives the coercion a body that calls `fail[\Byte\]` outside 0 to 255, and says "`y: Byte = 300` is not refused statically". The key's **Skill** grades that design as partial and names the cause: "The orientation does not state the coercion's `where` clause ... a reader who refuses `300` by a raising body is partial, and the grading says the rule is missing".
- The reader avoids the worse half of the key's Partial. It does not say the raising body raises "when the place runs on both paths". It states the compiled timing correctly: the coercion runs in the static initializer, so the program stops before `run()` whether or not the line would run, and a test sets `run_exits_nonzero=true` (`compiler.md`, "What the code generator does"). Under walk it says the coercion fails when it first runs for the place, and it plans a `REACHED` probe to confirm. Even so, the static refusal that the question asks for ("where and when `300` is refused") is missing on the compiled path.
- `z: Byte = 2 + 3`: right. The reader says it does not bind: `2 + 3` folds into the `ZZ32` 5, and coercions do not chain. It gives two remedies:
  - `z: Byte = 5`;
  - a `coerce(x: ZZ32)` that checks the range and raises outside it. The reader says this coercion converts every `ZZ32` implicitly, and prefers `z: Byte = 5`.

  The second meets the key's condition, "right only if the reader bounds it and says so". The key's other remedy, `Byte(2 + 3)`, is not required.
- Scope (not required): before the switch-over, the reader would check by compiling whether `v.asZZ32` resolves, noting that the prelude has `asZZ32` only on `ZZ32` and `ZZ64`. That is the key's point (row 349: the prelude's `ZZ` has no `asZZ32`), though without the key's helper `small(v)`.
- **Cause: a rule missing from the orientation.** The orientation's paragraph on a program's own number type (line 91) gives the generic coercion with no `where` clause, and nothing tells the reader that a numeral outside a coercion's `where` clause is refused, statically on the compiled path. Its general `where` rule (line 74, "a condition of a function or method on its own static parameters ... checked at a call") does not say that it applies to a coercion's numeral numbers. No passage misled the reader. The rule the key needs is not there.
- Side point, not graded: the reader says that "today" both paths still pass `-3` to the coercion with its sign (walk row 968, compiled row 961), and keeps a `0 <= v` guard for it. Both rows are `FIXED` (`a26e74f5c`). The orientation's line 91 states the current rule, and the reader quotes it, but follows the stale area parts. The key lists `interpreter.md:25` as stale. **`compiler.md:109` (row 961) is stale too, and the key's Skill line does not name it.** The guard does no harm, since `v` is a `nat`.

## Notes for the fix round

- Orientation, line 91: add the coercion's `where` clause, for example `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v.asZZ32)`. Add one sentence saying that the checker refuses statically a numeral that breaks the clause, and walk refuses it when the binding runs. Without the clause, a raising body stops a compiled program before `run()`. This is the only cause of a non-right grade this round.
- `compiler.md:109` (row 961, closed) and `interpreter.md:25` (row 968, closed) still describe a negative constant reaching the coercion with its sign. They produced a false side claim in case 32. Only `interpreter.md:25` is in the key's list of stale passages for case 32.
- The orientation's "No `=` ties a numeral type to a number type" still has its example only at `NN32` (the key, case 26, Skill). It did not cost this reader anything.

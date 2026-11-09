# Quiz grading, round 2 (cases 5, 16, 22, 26, 28, 29, 31)

Answers: `quiz-answers-2.md` in this folder. Key: `explorations/coordinator/tools/orientation/regression/key.md`, read on `main` at `5febd82a78` (2026-11-09). Orientation under test: `orientation.md` in this folder. Graded by decision and scope, as the key's "How to use it" says.

## Counts

- Right: 6 (cases 5, 16, 22, 26, 28, 31)
- Right without its path or scope qualification: 0
- Wrong: 1 (case 29)
- Against the orientation: 0. Case 29's failure counts against `references/interpreter.md:23`, by the key's own rule for this case.

## Case by case

### Case 5: right

- Decision: `seconds: RR64 = asFloat(elapsed) / 1000000000.0`, the key's line.
- The reader says that `elapsed / 1000000000.0` without `asFloat` "finds no `/`". Walk now gives an exact `QQ` there. The key's **Skill** says a reader who writes `asFloat` and expects the unconverted line to stop is right on the case. The reader does not expect it to give a float.
- The reader avoids the key's Wrong forms. It says `elapsed / 1000000000` answers a `QQ`. It does not use `(1.0 elapsed)` for the `ZZ64`.
- The `ZZ32` question is answered: a `ZZ32` converts into `RR64` implicitly, so `elapsed / 1000000000.0` gives the float. Keeping `asFloat` for both is also valid, by the key's Partial.
- Scope: walk on the interpreter's library, and the compiler's prelude before the switch-over (`/` only at `RR64`). The reader would check the prelude for `asFloat` on `ZZ64`; it has none (key, case 26's Scope). This matches the key. The key does not require it.

### Case 16: right

- Decision: `n: NN32 = 3` binds on both paths, written as it is. This is the orientation's rule "A numeral converts where it stands (P-173)", with its example `u: NN32 = 5`.
- The reader sees that `tests-writing.md:34` contradicts the orientation. It reads the line as older than P-173, which is what the key says (row 454 closed).
- Its plan to look things up meets the key's test for such answers:
  - Where: `facts-extract.sh 'ledger:454'` and the departure rows.
  - What it does with each result. If row 454 is closed, it keeps `n: NN32 = 3` and reports the stale line. If the row is open, it uses `unsigned(3)` under walk.
  - The row is closed, so the plan ends at the key's answer.
- Scope: the checker refuses a numeral out of range statically, and before the switch-over the numeral is an `IntLiteral` on the compiled path. Both match the key.
- The reader does not name the three-argument `assert` trap. The key does not require it.
- Not against the orientation: the stale `tests-writing.md:34` caused a hedge, not a wrong answer.

### Case 22: right

- (a) The reader copies `exp`'s header, changes its name, and adds `I extends Index` to the index parameter. Its line shows the result as `Array[\T, I\]`, where the file's `exp` gives `Array[\RR64,I\]`. The reader says that it could not open the file, that the line shows only the shape, and that it takes the result's element type "exactly as the headers of `exp` and `log` give them". Its stated procedure yields the key's header, and the key's grade turns on the bound, so the slip does not change the grade.
- (a) It says walk runs the unbounded form, so `MicroGptAplQuick.fss` passing proves nothing. Today the compiled path stops at name resolution before it checks the line: the reader names the prelude's missing `Index`, and the key names its missing arrays. The checker first checks the declaration after the switch-over, and then requires the bound. The scope agrees with the key.
- (a) It bounds only the new declaration and does not rewrite `exp` and `log`, which is right under the key's **Open**. Its extra point is that a body over `T extends Number` can call no `asFloat` on a `T` (P-165). That point is sound and not graded.
- (a) Its account of the gate's ladder regression (eighteen components compiled, phase compared with `microgpt-phase.md`) agrees with `gate.md:66-69`. The key does not require it.
- (b) The pair is not valid. A type that extends both `Cell` and `Index` makes a pair that lies in both domains, and the Meet Rule refuses the pair. Walk loads it (row 806). The checker refuses it, and before the switch-over the compiled path stops earlier (no `Index`). The fix is `trait Cell excludes { Index } end`. Every point matches the key.

### Case 26: right

- (a) `asFloat(count) = limit`.
  - `count = limit` gives `false` with no error: there is no coercion between `ZZ64` and `RR64`, so `=` falls back to `SEQV`, and values of different types are never equivalent.
  - For `ZZ32`, bare `=` is `true`.
  - For `QQ`, the reader expects bare `=` to give `false` and keeps `asFloat`, which is the key's answer.
  - This covers the `ZZ32` and `QQ` cases that the key's Partial asks for.
- (b) One declaration of `near` for each of the eight number types, each through that type's own `asFloat`. The headers go in the api, and the bodies in the component. The generic form fails because `Number` declares nothing: the count stage refuses it, and walk would run it. This is one of the key's two right answers, with the reason the generic one fails.
- Scope: the reader says that before the switch-over the compiler's library has no `=` over `Any`, and it would check the prelude for `asFloat`. Both agree with the key, which does not require them.

### Case 28: right

- `Point` passes, by `SEQV` field by field.
- `Run` fails, and that is the rule, not a defect. `s` is built at run time from the typed `t`, so it is not `SEQV` the literal. The reader keeps two remedies. One compares the parts, with `r.name = "abc"` and `assert(r.steps, 3, ...)`. The other gives `Run` its own `=` and makes it extend `Equality[\Run\]`.
- The 4-tuple fails because `=` is declared on pairs and triples only, so it falls back to `SEQV`. The reader calls this the rules' answer (row 923), files no defect, and keeps a check of the string alone. It drops the three numerals because they are equal literals. As in round 1, this is an equally sound remedy to the key's triple.
- Side point, not graded: the reader adds that "each evaluation of a string literal also makes a new object (row 945)", so `Run("abc", 3)` against `Run("abc", 3)` would fail. That is false: row 945 is closed, and the orientation says that `V("ab") = V("ab")` is `true` ("Traits and objects", the `SEQV` paragraph). The reader quotes that paragraph but took the claim from the stale `interpreter.md:22`, which it cites. The claim does not change any verdict or any remedy.

### Case 29: wrong

- The key's answer:
  - Row 364 is `FIXED` (`12292add2`, F-344).
  - `Cell(z)` is a `Cell[\ZZ32\]` today.
  - The assertion passes on today's tree, so walk needs no change. The reader should report that the brief's premise is already met.
- The reader's answer:
  - It plans a lookup (`ledger-find:Cell Int`, `ledger:364`), but decides the outcome in advance. It says walk makes `Cell[\Int\]` today and that `asString` hides it.
  - It says "the assertion fails on today's tree", then plans to "make the fix" and "close row 364 by the fix's commit".
- That hits three of the key's Wrong forms: row 364 treated as open, an assertion expected to fail today, and a change to walk's inference.
- It also misses the key's condition on "look it up first" answers. The plan covers an `XXX` reproducer (promote it), but not the result that the key names, a closed row.
- The reader's check by dispatch, rather than by printing, is right. That earns no partial credit, because the key's Partial needs either the instance right or the row found closed.
- **Cause: `references/interpreter.md:23`, an area part, not the orientation.** The reader quotes that bullet word for word ("a generic built from a number value instantiates at that class. So `Cell(3)` is a `Cell[\Int\]` ... (ledger row 364)"). The key names that bullet as stale, and says that a reader misled there "fails the case against that area part, not against the orientation".
- No passage of the orientation misled the reader: for this case it cites only `interpreter.md`, `tests-writing.md` and `SKILL.md`. The rule that the case needs is in the core ("Rules for every task": look for the ledger rows before you investigate) and in `records.md`. The same failure, with the same cause, happened in round 1.

### Case 31: right

- (a) The binding does not run. `nSamples` takes its default, `ZZ64`, and a `ZZ64` goes into `RR64` only through `asFloat`. The reader writes `scale: RR64 = asFloat(nSamples)`. That is one of the key's two repairs, given with the reason the binding fails, so it is not the partial answer.
- (b) A typed `m: ZZ32 = 2147483647`, with `m + 1` inside a `try` whose `catch` takes `IntegerOverflow`, and the reached `catch` asserted. The reader also says why `2147483647 + 1` would not work: it folds into the `ZZ64` 2147483648.
- (c) Typed `x` and `y`, with `NOT (x + y = 0.3)` asserted. The reader also says why `0.1 + 0.2 = 0.3` would not work: it folds into `true`.
- Compiled path: both folds run on both paths, and the typed operands put the arithmetic at run time on both. So (b) and (c) test the same thing there. The reader notes that a compiled test uses `compiler_tests/` with a `.test` file and the Boolean `assert`. This matches the key.
- Side point, not graded: the reader prefers the Boolean `assert` partly because "an `RR64` variable bound to a numeral stays a `FloatLiteral` ... (row 943)". That is false. Row 943 is closed, and the orientation says that `y: RR64 = 0.5` is `SEQV` a computed `RR64` 0.5. The claim comes from the stale `interpreter.md:20`, which the reader cites. Its choice of the Boolean form is right anyway.

## Notes for the fix round (not causes of any failure in the orientation)

- `interpreter.md:18-25`, walk's list of departures on literals, is stale: rows 943, 945 and 364 are closed. It caused this round's one failure (case 29, from `:23`) and two false side claims (case 28 from `:22`, case 31 from `:20`). In both side claims the reader followed the area part over the orientation's opposite sentence. Climb batch 29's `admission.md`, "Elsewhere", lists this already. Round 1 found the same thing.
- `tests-writing.md:34` (row 454, closed) again caused a hedge in case 16, not a failure.
- As in round 1, the orientation has no sentence that states F-344: walk reads a number or string value at its trait where it infers a static argument. So nothing in the orientation opposes `interpreter.md:23`. The key does not count this against the orientation, and both rounds failed case 29 the same way. If the writer has room, one clause beside `Cell(0.5)` in "A numeral converts where it stands" would do it, for example "and `Cell(z)` for `z: ZZ32` is a `Cell[\ZZ32\]`".

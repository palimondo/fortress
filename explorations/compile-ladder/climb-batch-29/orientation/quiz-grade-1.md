# Quiz grading, round 1 (cases 5, 16, 22, 26, 28, 29, 31)

Answers: `quiz-answers-1.md` in this folder. Key: `explorations/coordinator/tools/orientation/regression/key.md` (read again for these cases on `main` at `5febd82a78`, 2026-11-09). Orientation under test: `orientation.md` in this folder. Graded by decision and scope, as the key's "How to use it" says.

## Counts

- Right: 6 (cases 5, 16, 22, 26, 28, 31)
- Right without its path or scope qualification: 0
- Wrong: 1 (case 29)
- Against the orientation: 0. Case 29's failure counts against `references/interpreter.md`, by the key's own rule for this case.

## Case by case

### Case 5: right

- Decision: `seconds: RR64 = asFloat(elapsed) / 1000000000.0`, the key's line. The `ZZ32` question is answered: `elapsed / 1000000000.0` would do there, and keeping `asFloat` is also valid (the key's Partial says keeping it is not wrong).
- The reader says that without `asFloat`, `elapsed / 1000000000.0` "finds no `/` that fits". That was the key's answer until climb batch 29. Walk now gives an exact `QQ`. The key's **Skill** says that no passage of the skill states that rational, and that a reader who writes `asFloat` and expects the unconverted line to stop is right. The reader did not use any of the key's Wrong forms (`1e9`, `(1.0 elapsed) / ...`, an integer divisor).
- Scope: walk, plus the compiler's prelude before the switch-over (`/` only at `RR64`, no `QQ`). This matches the key. The key does not require it.

### Case 16: right

- Decision: `n: NN32 = 3` binds on both paths (orientation, "A numeral converts where it stands (P-173)", its `u: NN32 = 5`). The reader writes it as it is.
- The reader saw that `tests-writing.md:34` contradicts the orientation. The key names that line as stale (row 454 closed). The reader's plan to look it up says where to look (`facts-extract.sh 'ledger:454'`, then `harness-one.sh`) and what it does with each result. If the row is closed, it keeps the line and reports the stale text. If walk still refuses, it falls back to `unsigned(3)`. That meets the key's test for a "look it up first" answer.
- Scope: the compiled path converts statically and refuses a numeral out of range. Before the switch-over the prelude's name for the numeral type is `IntLiteral`. Both match the key. The reader did not mention the three-argument `assert` trap (`assert(n, 3, msg)` fails under walk). The key does not require it.
- Not against the orientation: the stale `tests-writing.md:34` caused a hesitation but not a wrong answer.

### Case 22: right

- (a) The reader adds `I extends Index` to the new `tanh` only, copying the rest of `exp`'s header. It says walk runs the unbounded form, so the quick check proves nothing. It says the compiled path does not check the line until the switch-over, and checks it against the one library after. The reader says the compile stops at the missing `Index` in the prelude; the key says the prelude lacks arrays and the compile stops at name resolution. Both are stops at name resolution before the switch-over, so the scope agrees. The reader bounds only the new declaration and does not rewrite `exp` and `log`. Under the key's **Open**, rewriting them all would be the partial answer.
- (b) Not valid: `(G, G)` for a `G` that extends both `Cell` and `Index` lies in both domains, and the Meet Rule refuses the pair. Walk loads it (row 806). The checker refuses it, and before the switch-over the compiled path stops earlier (no `Index`). The fix is `trait Cell excludes { Index } end`. Every point matches the key.

### Case 26: right

- (a) `asFloat(count) = limit`. `count = limit` is `false` with no error, because no coercion joins `ZZ64` and `RR64`, so `=` falls back to `SEQV`. For `ZZ32`, plain `=` is `true`. For `QQ` the reader keeps `asFloat`. That covers the `ZZ32` and `QQ` cases the key's Partial asks for, and avoids its Wrong forms.
- (b) The generic `near[\T extends Number\]` is refused by the checker because `Number` declares nothing (walk would run it). The reader declares `near` once for each of the eight number types, each through that type's own `asFloat`, with headers in the api. The key lists this as one of its two right answers and gives the reason the generic form fails.
- Side point, not graded: the reader says a float numeral bound to `limit` "stays a `FloatLiteral` under walk (row 943)". Row 943 is closed. The reader took this from `interpreter.md:18-19`, which is stale (see "Notes for the fix round"). It does not affect the decision.

### Case 28: right

- `Point` passes, by `SEQV` field by field.
- `Run` fails, and that is the rule, not a defect: a string built at run time from `t || "c"` is not `SEQV` the literal. The reader keeps a check of the parts with `=`, or gives `Run` its own `=` and makes it extend `Equality[\Run\]`.
- The 4-tuple fails because `=` is declared on pairs and triples only, so it falls back to `SEQV`. The reader treats this as row 923's design limit, files no defect, and keeps a check of the string alone. It drops the three integer elements because they are equal literals. The key's form keeps them as a triple; dropping literal-equal parts is an equally sound remedy.
- The reader did not take `s` as folded, and was not misled by any area part. `tests-writing.md:32` now says `SEQV`.

### Case 29: wrong

- The key's answer:
  - Row 364 is `FIXED` (`12292add2`, F-344).
  - `Cell(z)` is a `Cell[\ZZ32\]` today.
  - The assertion passes on today's tree, so there is nothing to change in walk. The reader should write no `XXX` test and report that the brief's premise is already met.
- The reader's answer:
  - It plans a lookup (`ledger:364`) but decides its outcome in advance.
  - It says walk makes `Cell[\Int\]` "(row 364)" and that "row 364 is open".
  - It writes a test that "fails on today's tree", then changes walk.
- That hits three of the key's Wrong forms: row 364 called open, an assertion expected to fail today, and a change to walk's inference. It also misses the key's condition on "look it up first" answers. The reader handles the case where an `XXX` test exists (promote it), but not the case the key names, where the row is closed.
- The reader's check by dispatch, rather than by printing, is right, as is its point that `asString` hides the class. That earns no partial credit, because both halves of the key's Partial need the instance right or the row found closed.
- **Cause: `references/interpreter.md:23`, an area part, not the orientation.** The reader quotes that bullet word for word ("So `Cell(3)` is a `Cell[\Int\]`, not a `Cell[\ZZ32\]` ... (ledger row 364)"). The key names it as stale and says that a reader misled there "fails the case against that area part, not against the orientation". No passage of the orientation misled the reader: it cites only `interpreter.md`, `tests-writing.md` and `SKILL.md` for this case. The rule the case needs is present in the core ("Rules for every task": look in the ledger before you investigate a defect or edit, and reproduce before you explain) and in `records.md`.

### Case 31: right

- (a) The binding does not run: `nSamples` takes its default, `ZZ64`, and a `ZZ64` goes into `RR64` only by `asFloat`. The reader writes `scale: RR64 = asFloat(nSamples)`. It gives one of the key's two repairs, with the reason the binding fails, so it is not the partial answer.
- (b) A typed `m: ZZ32 = 2147483647`, with `m + 1` inside a `try` whose `catch` takes `IntegerOverflow`, and a flag asserted. The reader also says why `2147483647 + 1` would not work: it folds into the `ZZ64` 2147483648.
- (c) Typed `p` and `q`. It asserts that `p + q = 0.3` is false, and that `p + q` equals `0.30000000000000004`. It also says why `0.1 + 0.2 = 0.3` would not work: it folds into `true`.
- Compiled path: the fold runs on both paths, typed operands are needed there too, and (c) tests the same rounding. On (b) the reader hedges ("whether the compiler's prelude's `ZZ32` `+` raises on overflow is not stated in the skill") and lets the compiled test settle it. The key says a typed `ZZ32` `+` raises compiled too (P-73, F-132). The core states "Overflow raises `IntegerOverflow`" (`SKILL.md:133`) without any path restriction. This is a hedge, not a wrong claim, and the reader does not say the compiled path computes numerals alone at their own types. So it is right.
- Side point, not graded: the reader's note that `p` and `q` "are kept as `FloatLiteral` values (row 943)" again comes from the stale `interpreter.md:18-19`.

## Notes for the fix round (not causes of any failure)

- `interpreter.md:18-25`, the list of walk's departures on literals, is stale: rows 943, 944, 945 and 364 are closed. It is the only source of the reader's one failure (case 29), and of side remarks in cases 26 and 31. Climb batch 29's `admission.md`, "Elsewhere", already lists it. Fixing it is the area part's job, not the orientation's.
- The orientation has no sentence that states F-344: walk reads a number or string value at its trait where it infers a static argument. Edit 4 of the admission removed the old clauses about row 364 and added nothing in their place, so `interpreter.md:23` was left unopposed. The key does not count this against the orientation. If the budget allows, one clause next to `Cell(0.5)` in "A numeral converts where it stands" (for example, "and `Cell(z)` for `z: ZZ32` is a `Cell[\ZZ32\]` (F-344)") would have overridden the stale bullet. That is the writer's choice. The key does not require it.
- Case 5: no passage states that a float numeral beside a `ZZ64` gives an exact `QQ`, not a stop. The key accepts either expectation. The point is noted only in case the writer wants to state it.

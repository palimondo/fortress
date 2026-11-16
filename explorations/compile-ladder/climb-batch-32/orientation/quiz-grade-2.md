<!-- The grading of quiz reader 2's answers (quiz-answers-2.md: questions 9, 16, 26, 34) against the regression key, for climb batch 32's orientation. -->

# Quiz grade 2 (cases 9, 16, 26, 34)

Compared `quiz-answers-2.md` with `explorations/coordinator/tools/orientation/regression/key.md`, read on 2026-11-16.

Counts: 4 right, 0 wrong, 0 right without its path or scope qualification. Nothing counts against the orientation.

| case | grade | against the orientation |
|---|---|---|
| 9 | right | no |
| 16 | right | no |
| 26 | right | no |
| 34 | right | no |

## Case 9: right

- (a) `total(n: ZZ32): RR64 = SUM[\RR64\][j <- 0#n] g(j)`, `total(0)` is `0.0`: the key's expected form. The reader does not give the checker's refusal as the reason (the key's Partial): the answer says that the checker takes the expected type `RR64` and that walk reads the top-level function's return type, and writes the argument as the library's practice.
- (b) `weight(): RR64 = SUM[\RR64\][j <- 0#n] count(j)`, the argument required, with the right path named: walk sums at `ZZ32` and raises `IntegerOverflow`, the checker sums in `RR64` (row 1008).
- The reader noticed that `library.md` ("The checker refuses a call without it (ledger row 731)") disagrees with the orientation, and did not settle it. The key's note for the grader names that sentence as stale; it is the area part's fault, and it did not change the decision.
- Outside the key, not graded: the reader adds that before the switch-over the method does not compile under the compiler's prelude (its reductions give a `ZZ32` or a `String`; row 442), from `compiler.md`. The key's compiled half is by the record (F-364's tests) and says nothing on this point.

## Case 16: right

- The binding `n: NN32 = 3` is said to work as written on both paths, before and after the switch-over, with the prelude's numerals named (P-37).
- The check `three: NN32 = 3`, `assert(n = three, "n is 3")` passes; the key counts any passing check as right. `assert(n, 3, "n")` is correctly said to fail, for the key's reason (the numeral's default `ZZ32` at a parameter of type `Any`, then `SEQV`).
- Not the key's Partial: the reader does not say that `n = 3` is `false` under walk. The answer quotes the orientation's sentence that `u = 0` is `true` on both paths, sets `interpreter.md`'s row 973 sentence against it, and keeps the bound form as right under either. The expected check `assert(n = 3, msg)` was therefore passed over because of the stale area part (`interpreter.md`, "Bind the numeral at the type first", false since F-366), not because of a passage of the orientation.

## Case 26: right

- (a) `asFloat(count) = limit`; `count = limit` is `false` without an error for the `ZZ64`; `true` for a `ZZ32`; `false` for a `QQ`, with `asFloat` written. All as the key expects.
- (a), `ratio: QQ` against 0.5: the reader writes `half: QQ = 0.5`, `ratio = half`, a condition that works, and quotes the orientation's `h = 0.5` is `true` for `h: QQ = 1/2` on both paths. The reader does not claim `ratio = 0.5` is `false`; the bound form is again a hedge against `interpreter.md`'s row 973 sentence. The key's Partial (a form given as needed because the comparison is `false` under walk) does not apply. The orientation now gives the `QQ` example that the key's Skill line says its first round lacked.
- (b) No generic `near`, with the reason (`Number` declares nothing, the checker refuses it, walk would run it); one declaration at each of the eight number types, each by its own `asFloat`: one of the key's two right forms. The scope (the interpreter's library, the compiled path after the switch-over) is given.

## Case 34: right

- All five answers as the key's: `k(5)` "nn32" on both paths; `width(1.5)` "rr64" on both; `same(u, 0)` "nn32" on both; `g(5)` "generic" on both; `same(a, 0)` "nn32" under walk and "any" compiled.
- Both departures are named as departures (rows 1017 and 1016), and a way to avoid each is given: `five: NN32 = 5`, `g(five)`; `z: NN32 = 0`, `same(a, z)`, or `d: ZZ32 = 0`, `same(a, d)` for the rule's "any". The reader also treats both as unsettled (no plain test asserts them), which the key's Open asks for.

## Stale area parts that the reader met

None failed a case, but each cost a hedge:

- `library.md`, "The curator's decisions on the library": "The checker refuses a call without it (ledger row 731)" (false since F-364). Case 9.
- `interpreter.md`, "How walk evaluates a program", row 973's sentence: a numeral at `=` takes its default, "Bind the numeral at the type first" (false since F-366). Cases 16 and 26: the reader wrote the bound form in place of `n = 3` and `ratio = 0.5`.

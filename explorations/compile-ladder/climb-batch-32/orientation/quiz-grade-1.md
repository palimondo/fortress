# Quiz grading, reader 1 (cases 9, 16, 26, 34)

Graded against `explorations/coordinator/tools/orientation/regression/key.md`, the answers in `quiz-answers-1.md`. Nothing was run; the passages the reader cites were read in the orientation (`orientation.md:116-126`) and in the area parts.

## Counts

- Right: 4 (cases 9, 16, 26, 34)
- Right without its path or scope qualification: 0
- Wrong: 0
- Failures against the orientation: 0

## Case 9: right

- (a) `total(n: ZZ32): RR64 = SUM[\RR64\][j <- 0#n] g(j)`, `total(0)` is `0.0`: the key's expected form and value. The reader does not give the key's partial reason (that the checker refuses the unwritten call). They say that walk sums at `RR64` without the argument, that the orientation says the checker takes the expected type, and that `library.md` says the checker refuses the call (row 731); they write the argument because it is right under both and leave the conflict unsettled. The key's note for the grader covers this: the written argument is the right decision whatever its reason.
- (b) `weight(): RR64 = SUM[\RR64\][j <- 0#n] count(j)`, with walk named as the path that differs (the elements' join `ZZ32`, `IntegerOverflow`, row 1008) and the checker summing in `RR64`: the key's expected answer with its path.
- Beyond the key: the reader adds that before the switch-over the method does not compile with `SUM` at all, the prelude's reductions giving only a `ZZ32` or a `String` (`compiler.md:58`, row 442). The key is silent on it; it does not change the grade.
- Outside the orientation: `library.md:25` still says "The checker refuses a call without it (ledger row 731)", false since F-364. It did not mislead the reader into a wrong decision, but it made them hedge in (a). The reader saw that the two texts differ.

## Case 16: right

- The binding `n: NN32 = 3` kept as written, on both paths, with the prelude's same design (P-37): the key's expected answer and scope.
- The check `assert(n = 3, "n is 3")`, `true` on both paths, and `assert(n, 3, ...)` rejected for the key's reason (the numeral takes its default `ZZ32` at `Any`): the key's expected check.
- The reader does not claim that `n = 3` is `false` under walk, so the key's partial does not apply. They report that `interpreter.md` still lists it as a walk departure (rows 973, 966), against the orientation's "on both paths", say where they would look (the gap ledger's rows 973 and 966) and what they do with each result (`three: NN32 = 3`, `assert(n = three, ...)` if the rows are open, a check that passes either way). By the key's rule on "look it up first" that is right.
- Outside the orientation: `interpreter.md:22` is stale (false since F-366; rows 973 and 966 are FIXED). It caused the hedge, not an error.

## Case 26: right

- (a) `asFloat(count) = limit`; `count = limit` gives `false` without an error for the `ZZ64`, for the key's reason (no coercion, so `SEQV`); `true` for a `ZZ32`; `asFloat` kept for the `QQ`, no coercion joining `QQ` and `RR64`; `ratio = 0.5` for the `QQ` against the numeral, the numeral reaching `QQ`'s own `=`. All as the key expects. The reader does not say in words that `count = limit` is `false` for the `QQ`, only that no coercion is stated and `asFloat` is kept; the decision is the key's.
- The same hedge as in case 16 on `ratio = 0.5` (`interpreter.md`, row 973), with the lookup named and a passing form for the other result (`half: QQ = 0.5`, `ratio = half`). The reader does not call `ratio = 0.5` `false`, so the key's partial does not apply. The orientation states the rule at `NN32` only, with no `QQ` example; the reader carried it to `QQ` correctly.
- (b) Not the generic over `T extends Number`, with the reason (`Number` declares nothing, the checker refuses, walk would run it); one declaration at each of the eight number types, each by its own `asFloat`: one of the key's two right forms, with the reason.
- Scope given: walk, and no `QQ` in the prelude before the switch-over.

## Case 34: right

- `k(5)` "nn32" on both paths; `width(1.5)` "rr64" on both, the two types siblings; `g(5)` "generic" on both, named a departure (row 1017); `same(u, 0)` "nn32" on both; `same(a, 0)` "nn32" under walk and "any" compiled, the rule's answer "any", named walk's departure (row 1016). The five answers are the key's.
- Both departures named, and a way to avoid each: `five: NN32 = 5`, `g(five)`; `zi: ZZ32 = 0`, `same(a, zi)` for "any" on both paths (the key's `z = 0` with the type written), and `z: NN32 = 0`, `same(a, z)` for "nn32". The reader says they assert neither departure in a plain test.

## Failed cases

None.

## Notes for the writer, none against the orientation

- `library.md:25` (row 731, the checker said to refuse an unwritten reduction) and `interpreter.md:22` (rows 973 and 966, a numeral at `=` said to take its default under walk) are stale, as the key's cases 9, 16, 26 and 34 already record. In three of the four cases the reader found the orientation in conflict with one of them and hedged with a lookup. Each hedge cost a paragraph and no decision.

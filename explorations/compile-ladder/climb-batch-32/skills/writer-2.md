# Report: the cold read of climb batch 32's skill changes

The cold read's flags are fixed in one commit, `f01e683970`, and nothing is pushed. Of the 23 flags, 22 are fixed and one is left. The lint is clean on all eight changed files. `revival-changes.md` grew from 30,647 to 31,068 bytes.

## Each fix and its reason

**`SKILL.md`, the numbers.** A worker could read "Only a numeral's conversion changes which declaration runs" as "a numeral always changes the declaration". The text now says: "A conversion does not change which declaration runs when one already fits. A numeral is the one exception: it can run a more specific declaration that its coercion reaches."

**`compiler.md`, "Traps of the compiled path".**
- The block that ends in a numeral: a worker could not tell whether "after a local declaration" held for the tuple case, or what to bind. The text now names two cases of a function's body block, and says to bind each such numeral to a typed variable and write the variable in its place (rows 1014, 1030).
- The generic function as a value: the example changed from `useOne` to `p` with no declarations. It now uses one example, `p(count)` for `p(x: Any)`, with `count`'s declaration. A new sentence says that a name with several declarations, one of them generic, is refused, and gives the row's workaround (row 1009).
- The top-level initialiser: a worker could not tell which variable "that variable" was. The text now says: "Where the initialiser of a top-level variable `b` assigns to a top-level `var a`, a compiled read of `a` before the first read of `b` gives the old value (ledger row 1011). Read `b` before you read `a`." It states only what the row's runs show, because the row did not read the code for when the initialiser runs.

**`gate.md`, step 4.** A worker who saw the race's failure did not know whether the gate was red. The text now says: "The gate is then red, as for any failure. Cite the row in your report." This applies the step's existing rule of zero failures and adds no new one.

**`interpreter.md`, a generic function as a value.**
- "where the rules give a static error" read two ways, and no part states those rules. It now says that the checker refuses such a program, so do not rely on it in a program for both paths (row 1021).
- "Departures:" is now "Walk departs from this in three cases:".
- The immutable top-level variable gave no consequence. It now gives the row's example: `g(w)` runs for a `w` of another size (row 1019).
- `appT` now has its declaration, and the bullet says that `v` fixes `T` by its run-time type (row 1018).
- The local generic function now reads "stops at its declaration, whether it is passed or not" (row 1020).

**`interpreter.md`, the numeral beside `Any`.** Walk has no static types, so "static type" is now "a variable declared `Any`". The bullet now gives the rules' answer, `false`, so that a worker can write the test's assertion (row 1016).

**`interpreter.md`, the dispatch cache.** The two sentences stood between a premise and its "So", and gave no action. They are now a paragraph of their own, after the "So" sentence, with the action: check the cache's key when you change how a numeral chooses a declaration. The sentence on what the key tells apart is cut.

**`library.md`, `SUM` and `PROD`.** A worker who edits the library could not tell whether a new `SUM` there must carry the element type. The text now says: "The element type is written before the generators, as in `SUM[\ZZ32\][j <- 0#n] f(j)`. In the library, write it, as its own sites do."

**`revival-changes.md`.**
- The `pick` example now says that `pick(x: Any)` and `pick(x: (T,T))` are methods of the generic object. I checked this in `tests/OpenTupleDispatchWalk.fss`. The flag's proposed name, `BoxU`, was wrong, so I used none.
- The rule on a numeral's declaration could be stated only from its examples, and was the one lint hit. It now reads: "**A numeral can run a more specific declaration than the one that fits its default type (P-46).** On both paths, a call with a numeral runs the declaration that fits the numeral's default type, unless the numeral's coercion reaches another declaration whose declared parameter types are strict subtypes of the first one's. Then the other runs."
- The departure under walk now says "a variable declared `Any`", with the example `a = 0` (row 1016).
- The departure on both paths now gives the rule's answer, `g(x: NN32)` (row 1017).
- "only where no expected type serves" is now "only where there is no expected type or it does not fit the reduction's bound" (F-364).
- "a plain bound" is now "whose bound does not name its parameter".
- A worker would expect a parameter's type to direct a compiled `SUM` in a call's argument. A new sentence says: "A call's argument has no expected type where the call is accepted without one." (F-364)
- `BIG MIN_MAX` now has its written form, `BIG MIN_MAX[\ZZ32, ZZ32\][j <- 0#3] pr(j)`, and says that its arguments are the element types of its pairs. I checked this in `Library/FortressLibrary.fsi`.

**`tests-writing.md`.** The bullet now says what a superscript is, and how `x[5]^2` fails: it stops the compile, and under walk it fails or gives the wrong element (rows 1005 and 1).

## Left as it was

- **`revival-changes.md`, "If one of them takes the call's numerals at their default, it runs instead".** The flag asks for "exactly one". Neither the record nor the rows say what happens where two tied declarations both take the numerals at their default. I did not trace the code that far, so I changed nothing.

## Decisions not taken

1. **Row 1004 in the gate.** I wrote that the gate is red, which is the step's existing rule. The alternative is a new rule: run the test again alone, and count the gate green if it then fails as expected. The record gives no such rule.
2. **Row 1019, a way round.** The row gives none, so the bullet has only the consequence. The alternative is the flag's suggestion, `g: ... = half[\3\]`, which no test shows.
3. **The duty in `library.md`.** I took the flag's fix, which restores for library code the instruction that the first task dropped. The alternative is the fact alone, with no instruction.

## For the coordinator

- The points of the first report still stand: the prelude's "one exception" in `compiler.md` against P-37's two, the uncommitted regression key and questions, and review-queue item 526.
- The cold read's proposed sentence for row 1011 stated when a compiled initialiser runs. The row says that this was not read in the code. A worker who reads the code generator could settle it.
---
session 58bd5ee7-17e5-4617-85f5-fc1048a55eab turns 26 cache writes 27579 reads 1461265 output 13640 labels {'ephemeral_1h_input_tokens': 27561, 'ephemeral_5m_input_tokens': 0}

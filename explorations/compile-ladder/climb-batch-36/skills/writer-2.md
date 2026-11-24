I've fixed four of the cold reader's six flags, all in commit `1959157fb4` (not pushed). The other two flags asked me to keep two deletions if checks passed; I checked, and both stay deleted. The linter found nothing in any changed file.

**What each fix changes for a worker**
- **`compiler.md`, the `=` trap at `RR32`.**
  - **Wrong before:** a worker could not tell what "two values" meant. The text used the name `c` one sentence before it explained it. It gave no error message, so a worker who met the refusal could not match it to this trap.
  - **Now:** "For an `RR32` value `c`, the checker refuses `c = 0`: 'Ambiguous coercion in call to operator ='. `c = d` for two `RR32` values compiles, and overflows the stack when it runs (ledger row 528). Bind `c` at `RR64` first, as `r: RR64 = c`, and compare `r`."
  - **Ground:** row 528. It records a limit of the compiler's prelude, which the one library's `RR32` repairs at the switch-over. So the bullet's opening words, "Until the switch-over", already cover it.
- **`interpreter.md`, walk's departures on numbers.**
  - **Wrong before:** "in other places" listed nothing. A worker could not tell whether walk now refuses a numeral type as a variable's or a field's type, so it could write the wrong kind of test.
  - **Now:** "Walk refuses it at load as a return type, a variable's, a field's or an object's value parameter's type, in an `extends` or `comprises` clause, and as a static argument."
  - **Ground:** `checkNumeralTypesWritten` in `BuildEnvironments.java`.
- **`interpreter.md`, "What walk checks", the generic trait case (row 780).**
  - **Wrong before:** "first makes an instance" could mean making an object at run time or filling in its static arguments. So a worker could not tell whether a test should expect a failure at load or during the run.
  - **Now:** "So where the two declared domains lie one inside the other, a valid pair stops the run when the program first makes the extending object at its static arguments, as `H[\ZZ32\]()` for `object H[\S\]() extends Holds[\S\]`: 'at least one pair of parameters must have excluding types' (ledger row 780)."
  - **Ground:**
    - row 780;
    - the test `XXXGenericTraitFunctionalMethodsNestedWalk.fss`, which builds `H[\ZZ32\]()` inside `run()`;
    - `GenericConstructor.make` and `Constructor.java:385-387`, where the overload check runs when the object at those static arguments is made.
- **`revival-changes.md`, "Numbers".**
  - **Wrong before:** "the place" could mean the place inside the coercion's body or the place where the program writes the numeral.
  - **Now:** "by walk when the place where the program writes the numeral runs."
  - **Ground:** F-407, and `NumeralCoercionNumberRangeWalk.test`. There, a top-level `tooWide: Wide = 3000000000` stops at load.

**Flags left as they were**
- **`compiler.md`, the deleted tie bullet.** It stays deleted. The checker now keeps the first tied candidate by its place in the file, so the result no longer depends on what the JVM compiled before (rows 1046 and 1047 fixed, row 1136). I give no new first place to look, because the rule for ties by place is still open for the curator.
- **`revival-changes.md`, the deleted `Byte(v.asZZ32)` sentence.** It stays deleted. The library's numeral coercions now write `= v` (`Library/FortressLibrary.fss:847` and its neighbours), so no worker copies `asZZ32` from them.

`sources.md` has one new dated line for each fix and each kept deletion.

**Decisions not taken:** none. No fix changes what a rule means.

**For the coordinator**
- The cold read names `24872f5a93` as the head it read, but my first-task commits are `e6931853db` and `dc31ee524b`. The cold read's line numbers match my text, so I worked from the current tree. Confirm that the read covered these commits.
- The row 780 bullet keeps "It compares them at each call", as the orientation's judgement asked, beside the new sentence about the stop when the object is made. The two may read as being in tension. Rewriting the kept sentence would change what the rule means (P-45, F-26), so that is left to you.
---
session c1e1ea53-a5d7-4966-80c0-e84b6a51c1cf turns 19 cache writes 16643 reads 1371713 output 7364 labels {'ephemeral_1h_input_tokens': 16615, 'ephemeral_5m_input_tokens': 0}

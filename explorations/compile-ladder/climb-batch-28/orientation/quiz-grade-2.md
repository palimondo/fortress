<!-- Grading of quiz-answers-2.md (cases 6, 16, 17, 30) against explorations/coordinator/tools/orientation/regression/key.md, read on main at f5aa647de, 2026-11-08. -->

# Quiz grading 2

Cases graded: 4 (6, 16, 17, 30). Right: 4. Right without its path or scope qualification: 0. Wrong: 0.

No case counts against the orientation. The fix round's new sentence in the P-161 rule worked. Round 1's case 6 partial came from that sentence being missing. Reader 2 quotes the new sentence, "Of the low-bits functions it has only those that change the type, as `narrow` of a `ZZ64` (row 349)", and from it writes the `narrow` spelling for the compiled path. In cases 17 and 30 the reader quotes "`ZZ64`'s `asZZ32` among them", so the lookups that reader 1 left open in those cases are settled. Three points below are not counted, because no case turns on them. They are for the writer.

## Case 6: arithmetic that must wrap

**Grade: right.**

- Walk spelling: `h := (31 DOTTIMES h) DOTPLUS c`, with the inner product in parentheses. This is the key's spelling. The key's outer pair adds nothing, because the expression is the whole right-hand side of `:=`.
- The plain `31 h + c` raises `IntegerOverflow` under walk, and the reader says so.
- Compiled path, before the switch-over: the reader writes the low-bits form, `w: ZZ64 = h; h := narrow(31 w + c)`, and says it runs under walk too. This is the key's second spelling. The key writes `widen(h)` and `widen(c)`. The reader instead uses the declared coercion from `ZZ32` into `ZZ64`, at the binding and at `+`. That is P-74's rule for mixed widths ("Mixed integer widths convert by declared coercions"). The prelude declares that coercion (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:149`), so the spelling holds on both paths. The reader states why the step is exact in `ZZ64`, and that `narrow` keeps the low 32 bits as Java's `(int)` does.
- So the answer gives "the `narrow` spelling for both", which the key's **Scope** accepts as a full answer. After the switch-over the operators' line holds on both paths, and the reader says so.
- The loop is made sequential with `seq(...)`, for the right reason. The key does not ask for this.
- None of the key's Wrong answers appears: no plain form expected to wrap, no `MOD 2^32`, and no `.asZZ32` on the `ZZ64` step.

Not counted: the reader's lookup for `DOTPLUS` and `DOTTIMES` in the prelude says "If the prelude has the operators, the same line works there". The prelude declares a `DOTPLUS` that saturates, and its `BOXPLUS` wraps (row 348). It declares no `DOTTIMES`. So the lookup still lands on the reader's "does not" branch and the `narrow` form. The answer stands. But a port of a sum alone would find `DOTPLUS` and take it for wrapping. Row 348 is still in no part. Round 1 made the same point, and this case does not need it.

## Case 16: a numeral at an `NN32` binding

**Grade: right.**

- Walk: the binding is refused, because walk's numeral is an `Int` (row 454). The reader writes `n: NN32 = unsigned(3)`, the form `tests-writing.md` gives. It names `asNN32` as the checked form for a computed value, and does not write the malformed `3.asNN32`.
- Compiled: the reader says `n: NN32 = 3` is accepted, since the checker types the numeral `IntLiteral` (P-76). It plans to confirm this with a `fortress compile`. That is the key's answer.
- The reader names `unsigned(3)` as the spelling for both paths, and plans to grep the prelude for it. The prelude declares it on `ZZ32` (`CompilerBuiltin.fsi:270`), and the key measures that it compiles and gives 3.
- Neither of the key's Wrong answers appears.
- An extra, not in the key, holds up by the orientation's P-165 rule and case 26's key: under walk, `assert(n, 3, "n")` compares an `NN32` with a `ZZ32`, and no coercion joins those two types. Walk's two-value `assert` compares by `=/=` (`Library/FortressLibrary.fss:307-308`). So `=` falls to `SEQV` and the assert fails. The reader instead writes `assert(n = unsigned(3), "n")`. This was not measured.

## Case 17: a loop over `ZZ64` bounds whose steps depend on each other

**Grade: right.**

- The loop is over a `ZZ32` range, `seq(lo32 # (hi32 - lo32))`. The reason is the key's: a range over `ZZ64` is a static error, and walk stops when it builds one.
- The bounds are converted with the checked getter `asZZ32`, so the key's trap, `narrow` taken as the exact conversion, does not reach the reader. The count `hi32 - lo32` is a plain `ZZ32` subtraction. Where it leaves `ZZ32`, it raises `IntegerOverflow` (P-73). It does not silently run no step, so it meets the key's concern as `(hi - lo).asZZ32` does.
- Each element is widened, `i.asZZ64`. The reader notes that the declared coercion would also do it, which is the key's own example.
- The loop is sequential, for the key's reason: each step needs the total before it, and `total :=` in a parallel `for` is a race.
- The reader looks up what `#` does with a count at or below 0, with a guard as fallback. This is not needed, since such a range runs no step (the key's measured `3 # 0` and `3 # (-1)`). It is harmless.
- Compiled path, which the key does not require: the reader checks the prelude for `seq` and for `ZZ32`'s `asZZ64`, and says what it does if either is missing. `seq` is declared (`Library/CompilerLibrary.fsi:113`). `ZZ32`'s `asZZ64` is not (`CompilerBuiltin.fsi:210-213`). The reader's fallback for that result, passing `i` and letting the coercion widen it, is right.

## Case 30: an exact integer conversion, and one that keeps the low bits

**Grade: right.**

- (a) `n.asZZ32` on a `ZZ64`. At 2^31 it raises `IntegerOverflow`, in the role of Java's `ArithmeticException`. The reader rules out `narrow` because it wraps silently.
- (b) `n.asZZ32` on a `ZZ`. At 2^31 it raises. The reader rules out `narrow(n)` because `ZZ` has only `big`.
- (c) `narrow(h)` on a `ZZ64`. It gives 7 at 2^32 + 7 and never raises.
- None of the key's Wrong answers appears.
- The inputs are bound from numerals at the wide types, not written `2^31` (P-153).
- Compiled path today: (a) and (c) compile, and (b) is a static error until the switch-over, because the prelude has no getter on `ZZ`. That is the key's **Scope**. After the switch-over all three compile. The reader also plans to confirm in a compiled test that the prelude's `asZZ32` raises at 2^31. The key measured that it does.
- The reader names (b) `toIntBig` and does not overload `toInt`. The key overloads it. This does not change the conversions, so it is not graded.

Not counted: the reason that the reader gives for the rename is doubtful. It says that a `ZZ32` or numeral argument would fit `toInt(ZZ64)` and `toInt(ZZ)` "only by coercion, with neither more specific", so the call would be "Ambiguous coercion" on both paths. It also says that it does not know whether `ZZ64` and `ZZ` exclude each other.

- They do: `Library/FortressLibrary.fsi:635`.
- The specification's Coercion Resolution makes `ZZ64` more specific than `ZZ`: `ZZ64` excludes `ZZ`, coerces to it, and rejects it, because every type that coerces into `ZZ64` excludes `ZZ` (`Specification/basic/conversions-coercions.tex:502-540`). The chapter's printed example has this same shape, `f(ZZ64)` beside `f(ZZ128)` on a `ZZ32` argument (`:579-620`).
- So the pair is a valid overloading, and the call is not a tie. This was not measured on either path.

The reader took "siblings" to mean "neither more specific". The orientation's sentence "Where several declarations apply only by coercion and none is more specific" does not say that a coercion between excluding siblings can make one of them more specific. No case of the quiz turns on this yet.

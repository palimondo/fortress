<!-- Grading of quiz-answers-1.md (cases 6, 16, 17, 30) against explorations/coordinator/tools/orientation/regression/key.md, read on main at f5aa647de, 2026-11-08. -->

# Quiz grading 1

Cases graded: 4 (6, 16, 17, 30). Right: 3 (16, 17, 30). Right without its path or scope qualification: 1 (case 6). Wrong: 0.

The case 6 partial counts against the orientation. No passage misled the reader. A rule that the key needs for the compiled half is missing from the core, the area parts and the orientation: that the compiler's prelude declares `narrow` on `ZZ64` and `widen` on `ZZ32`, and that its `narrow` keeps the low bits (row 346). The fix is one clause in the orientation's P-161 rule, given under case 6. The same clause would also settle the lookups that the reader left open in cases 17 and 30.

## Case 6: arithmetic that must wrap

**Grade: right without its scope qualification (the compiled half).**

What matches the key:

- The walk spelling is the key's: `h := (31 DOTTIMES h) DOTPLUS c`, with the inner product parenthesised. The key's outer pair adds nothing: the expression is the whole right-hand side of `:=`.
- The plain port `31 h + c` raises `IntegerOverflow` under walk, and the reader says so.
- The reader also gives the second spelling right, `h := narrow(31 widen(h) + widen(c))`. It says the `ZZ64` step cannot overflow, and that `narrow` keeps the low 32 bits without raising.
- After the switch-over, the compiled path takes the interpreter's library, which declares the operators.
- The loop over the characters is made sequential with `seq(...)`. The key does not ask for this, but it is right (core, "Parallelism and mutable state").
- None of the key's Wrong answers appears: no plain `31 h + c` expected to wrap, no `MOD 2^32`, and no `.asZZ32` on the `ZZ64` step.

What is missing:

- On the compiled path before the switch-over, the reader gives no wrapping spelling. It says the passages are silent, and plans to grep the three prelude files and `ledger-find:` for `DOTPLUS` and `DOTTIMES`.
- Its plan handles only "the prelude declares neither operator": the line is a static error, and a compiled test of it is an `XXX` test.
- It says nothing about the result that the key names: the prelude declares `DOTPLUS` but saturates with it, and its `BOXPLUS` wraps (row 348). The prelude has no `DOTTIMES`.
- It does not carry its own `narrow` spelling over to the compiled path. The key accepts that spelling on both paths, before and after the switch-over (row 346; `CompilerBuiltin.fsi:206`, `:269`).

The key's **Partial** covers this: "a reader who says that no product wraps compiled until the switch-over has missed the `narrow` spelling". The reader does not say that no spelling wraps, but its compiled answer gets no further than its chosen line being refused.

**Cause: a rule that the key needs is missing.**

- The orientation's P-161 rule, which the reader quotes, ends: "Until the switch-over, the compiler's prelude has 8 of the 25 getters, none on `ZZ`, and no `big` (row 349)."
- That sentence says nothing of the prelude's `narrow` and `widen`. The reader read it as silent on them, and said so in case 30.
- The prelude's reversed `DOTPLUS` and `BOXPLUS` (row 348) are in no part either. `library.md`'s wrapping bullet gives the interpreter library's spelling only.

Fix in the orientation, P-161's last sentence, about this length:

"Until the switch-over, the compiler's prelude has 8 of the 25 getters, `ZZ64`'s `asZZ32` among them, none on `ZZ`, and no `big` (row 349). Its `narrow` of a `ZZ64` and `widen` of a `ZZ32` keep the low bits, as here (row 346)."

With that, a reader writes the `narrow` spelling for both paths, which the key accepts as a full answer. Row 348 could go in `library.md`'s wrapping bullet as well, but the case does not need it.

## Case 16: a numeral at an `NN32` binding

**Grade: right.**

- Under walk the binding is refused, because walk's numeral is an `Int` (a `ZZ32`) (row 454). The reader writes `n: NN32 = unsigned(3)`, the form in `tests-writing.md`.
- On the compiled path `n: NN32 = 3` works: the checker types the numeral `IntLiteral`, which converts to the integer types (P-76).
- Both paths are answered, and neither of the key's Wrong answers appears. The getter `(3).asNN32` is not used, so the malformed `3.asNN32` cannot come up.
- The extras are sound:
  - walk's refusal is a departure, not to be asserted as correct;
  - before using `unsigned` in a compiled test, the reader greps the prelude for it and reads row 349. The prelude declares it on `ZZ32` (`CompilerBuiltin.fsi:270`), and the key measures that `unsigned(3)` compiles and gives 3.

## Case 17: a loop over `ZZ64` bounds whose steps depend on each other

**Grade: right.**

- The loop is over a `ZZ32` range, `seq(lo32 # count)`. The reason is the key's: a range over `ZZ64` is a static error, and walk stops when it builds one (`library.md`, the ranges bullet).
- The bounds are converted with the checked getter, `lo.asZZ32` and `(hi - lo).asZZ32`, which raises `IntegerOverflow` where a value does not fit. So the key's trap, `narrow` taken as the exact conversion, does not reach the reader. Because the count is converted by the getter, an out-of-range `hi - lo` raises rather than silently running no step.
- Each element is widened, `j.asZZ64`. The reader notes that the declared coercion would also convert `j`. The key's own example uses that coercion.
- The loop is sequential, for the key's reason: each step needs the total before it, and `total :=` in a parallel `for` is a race. The reader also notes that `atomic` would not fix the order.
- The `if lo < hi` guard is unneeded, since `lo.asZZ32 # n` with `n` at or below 0 runs no step (the key's measured `3 # 0` and `3 # (-1)`). It is harmless. The reader says the parts do not state what such a range does, and that is so.
- Compiled path, which the key says is not needed for a right answer: the reader names its lookups (row 349 for the 8 getters, a grep of the prelude for `seq`) and what it does with each result. The plan holds up. The prelude's `ZZ32` has no `asZZ64` (`CompilerBuiltin.fsi:212-213`), and the reader's fallback, drop it and let the coercion convert `j`, is the right one. `ZZ64`'s `asZZ32` (`:150`) and `seq` (`CompilerLibrary.fsi:113`) are declared.

## Case 30: an exact integer conversion, and one that keeps the low bits

**Grade: right.**

- (a) `toInt(n: ZZ64): ZZ32 = n.asZZ32`. At 2^31 it raises `IntegerOverflow`, which a `catch` sees, as Java's `toIntExact` throws.
- (b) `toInt(n: ZZ): ZZ32 = n.asZZ32`. At 2^31 it raises `IntegerOverflow`. The reader rules out `narrow` on the `ZZ`, for the key's reason: under walk it finds no declaration, and `ZZ`'s only low-bits function is `big`.
- (c) `fold(h: ZZ64): ZZ32 = narrow(h)`. It keeps the low 32 bits and never raises: 7 at 2^32 + 7, as Java's `(int)` gives.
- None of the key's Wrong answers appears: no `narrow` in (a) or (b), no `narrow(n.asZZ64)`, no `h.asZZ32` or mask in (c).
- The extras are right:
  - the inputs are built from numerals, not as `2^31`, which raises because the base is a `ZZ32` (P-153, P-73);
  - the two `toInt` overloads are declared one per sibling type.
- Compiled path today:
  - (b) does not compile, because the prelude has no getter on `ZZ`. This is the key's answer (row 349).
  - (a) and (c) are left to a lookup that names its sources: row 349 and a grep of `CompilerBuiltin.fsi` and `CompilerLibrary.fsi` for `asZZ32` and `narrow`. It also says what follows when one is missing (no compile until the switch-over, nothing added to the prelude, an `XXX` compile test). Both are declared (`CompilerBuiltin.fsi:150`, `:206`), so the lookup reaches the key's answer: (a) and (c) compile.
  - The question asks only whether they compile, so the key's point that they also give the same values is not required.
  - After the switch-over all three compile (P-37).
- The lookup was needed only because the orientation's prelude sentence does not name `ZZ64`'s `asZZ32` among the 8 or mention the prelude's `narrow`. The fix proposed under case 6 settles this too.

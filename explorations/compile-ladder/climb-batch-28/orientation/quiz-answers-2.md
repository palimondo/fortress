# Quiz answers, reader 2 (cases 6, 16, 17, 30)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its area parts under `references/` (not `revival-changes.md`, not `sources.md`), and `explorations/compile-ladder/climb-batch-28/orientation/orientation.md` (cited below as "orientation"). Nothing else was opened.

## 6. A Java string hash, `h = 31 * h + c`, that relies on wraparound

**Decision.** Write the update with the wrapping operators, fully parenthesised:

    h := (31 DOTTIMES h) DOTPLUS c          (* or (31 ⨰ h) ∔ c *)

with `var h: ZZ32 = 0` declared before the loop, and the loop over the characters made sequential, `for k <- seq(0#n) do ... end`, because each step needs the `h` of the step before. A plain `for` would run the steps in parallel: a race on `h`, and the wrong order besides. `atomic` would not fix the order, so `seq` is what is needed.

I would not write `h := 31 h + c`. Fixed-width arithmetic does not wrap here: the first overflow raises `IntegerOverflow`. For a typical string that happens after about seven characters.

**Path and scope.**
- Walk, with the one library: `DOTTIMES` and `DOTPLUS` wrap as Java's `int` arithmetic does, so the hash matches Java's bit for bit. The plain form raises `IntegerOverflow`.
- Compiled path, before the switch-over: nothing I read says whether the compiler's prelude declares `DOTPLUS` and `DOTTIMES` at `ZZ32`. I would look it up before I write a compiled program. First, grep `DOTPLUS\|DOTTIMES\|∔\|⨰` in `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`, `Library/CompilerLibrary.fsi` and `Library/CompilerAlgebra.fsi`. Second, run `facts-extract.sh 'ledger-find:DOTPLUS'` and `'ledger-find:wrapping'`. If the prelude has the operators, the same line works there. If it does not, the line is a static error on the compiled path until the switch-over. I would not add the operators to the prelude. For a compiled program until then, I would write the low-bits form, which the orientation says the prelude supports (`narrow` of a `ZZ64`):

      w: ZZ64 = h                  (* ZZ64's declared coercion widens h *)
      h := narrow(31 w + c)        (* exact in ZZ64; narrow keeps the low 32 bits, as Java's (int) does *)

  This form also runs under walk. I would not rely on how the compiled prelude's plain `ZZ32` `*` treats overflow, because nothing I read states it.
- After the switch-over, the wrapping-operator line holds on both paths.

**Passages.**
- `references/library.md`, "The curator's decisions on the library": "For arithmetic that wraps on overflow, use the wrapping operators ∔ `DOTPLUS`, ∸ `DOTMINUS` and ⨰ `DOTTIMES`. Parenthesise every such expression fully".
- `SKILL.md`, "Fortress as a language", "Numbers are siblings": "Overflow raises `IntegerOverflow`."
- Orientation, opening section: "fixed-width arithmetic does not wrap". Orientation, "Numbers", P-161: `narrow` "keep[s] the low bits and never raise[s], as Java's `(int)` does", and "Of the low-bits functions [the prelude] has only those that change the type, as `narrow` of a `ZZ64` (row 349)".
- `SKILL.md`, "Parallelism and mutable state": a loop is sequential only if every generator is `seq(...)`, and an unguarded `acc := ...` in a parallel `for` is a race.
- `references/compiler.md`, "The compiler's prelude, until the switch-over": do not add a declaration to the three prelude files. Orientation, opening section: do not fix an "Until the switch-over" limit in the compiler's prelude.

## 16. `n: NN32 = 3` in a test

**Decision.** Under walk the binding does not work, so I write:

    n: NN32 = unsigned(3)

`unsigned` keeps the low bits, so this gives the `NN32` value 3. For a computed `ZZ32` value that could be negative, I would write the checked getter `z.asNN32`, which raises `IntegerOverflow` where `unsigned` would wrap.

I would also not assert the value against a bare numeral. Under walk `3` is an `Int`, that is, a `ZZ32`. No coercion carries a `ZZ32` into an `NN32` or the other way, so `=` across the two types falls back to `SEQV`, which is `false`. `assert(n, 3, "n")` would therefore fail. I write the check with values of one type, in the one-flag form that both libraries take:

    assert(n = unsigned(3), "n")

**Path and scope.**
- Walk: `n: NN32 = 3` fails, because a numeral does not bind to `NN32` (ledger row 454). `unsigned(3)` works: walk gives the numeral the class `Int`, so `ZZ32`'s `unsigned` runs.
- Compiled path: the checker types `3` as an `IntLiteral`, which converts to the integer types (P-76). So by the checker's rules the binding as written is accepted. Before the switch-over, the coercion comes from the compiler's prelude. I would confirm it with a `fortress compile` of the test, or by reading how an existing compiled test binds its `NN32` values, such as `compiler_tests/NativeHelperFamilyNN32Compiled.fss`. `unsigned(3)` also type-checks: where tied declarations differ only at the numeral, the checker reads the numeral as `ZZ32`. The orientation says the prelude has the low-bits functions that change the type, so I expect it to have `unsigned` of a `ZZ32`; I would grep the prelude's `.fsi` files for `unsigned` to make sure. The compiler's library has the two-value `assert` only for `ZZ32`, `String` and `Character`, which is another reason to use `assert(n = unsigned(3), "n")`.
- So `unsigned(3)` is the one spelling that I expect to work on both paths, before and after the switch-over.

**Passages.**
- `references/tests-writing.md`, "A test program": "Under walk, a numeral does not bind to `NN32` or `NN64` … (ledger row 454). Write `a: NN32 = unsigned(5)`, not `a: NN32 = 5`." The same section says the compiler's library has the two-value `assert` only for `ZZ32`, `String` and `Character`, and that its `assert(flag, msg)` takes any `Boolean`.
- Orientation, "Numbers", "Under walk a numeral has a run-time class": the checker's `IntLiteral` "converts to the integer types, `QQ` and `RR64` (P-76)", and walk gives a numeral the class `Int`, `Long` or `BigNum`. The same section, "Arguments convert…": the tie at numerals is read as `ZZ32`. "An integer converts…" (P-161): `unsigned` keeps the low bits, and `asNN32` is checked. "`Number` declares nothing" (P-165): `=` across number types holds only where a coercion carries one type into the other; otherwise it is `SEQV`, which answers `false`.

## 17. Porting `for (long i = lo; i < hi; i++) { total = step(total, i); }`

**Decision.** I use a `ZZ32` range that is sequential, and widen the index at the call:

    lo32: ZZ32 = lo.asZZ32                 (* checked: raises IntegerOverflow if lo does not fit *)
    hi32: ZZ32 = hi.asZZ32
    var total: RR64 = total0               (* or the existing mutable total *)
    for i <- seq(lo32 # (hi32 - lo32)) do
        total := step(total, i.asZZ64)
    end

- `lo32 # (hi32 - lo32)` runs over `lo32` up to `hi32 - 1`, as Java's `i < hi` does.
- `seq(...)` is required. Each step reads the total from the step before, so the iterations cannot run in parallel, and a parallel `for` with `total := …` would be a race. `atomic` would not fix the order.
- I do not write `lo # (hi - lo)` on the `ZZ64` values: a range over `ZZ64` is a static error, and walk stops when it builds one.
- `step(total, i)` would also work, because `ZZ64`'s declared coercion widens the `ZZ32` argument at the call. I write `i.asZZ64` to make the widening visible.
- If `hi < lo` can occur, Java runs the loop zero times. I would check what `#` does with a negative count, in `Library/RangeInternals.fss`, before I relied on it. Otherwise I would guard the loop with `if lo32 < hi32 then … end`.

**Path and scope.**
- Walk, with the one library: the loop runs as written.
- Compiled path, before the switch-over: the prelude's `for` loops work over `ZZ32` ranges, and `ZZ64`'s `asZZ32` is among its 8 getters. I would check two things in `CompilerLibrary.fsi` and `CompilerBuiltin.fsi`: whether the prelude has `seq`, and whether `ZZ32`'s `asZZ64` is among its getters. If the getter is missing, I pass `i` and let the coercion widen it. If `seq` is missing, the sequential loop cannot be written on that path until the switch-over. I would not add either to the prelude.
- After the switch-over, the code holds on both paths.

**Passages.**
- `references/library.md`, "The curator's decisions on the library": "Scalar ranges are over `ZZ32` only. A range over another integer type is a static error, and walk stops when it builds one. Write a wider counter as a `ZZ32` loop that widens its index."
- `SKILL.md`, "Parallelism and mutable state": "A loop is sequential only if every generator is `seq(...)`", and the `acc := acc + x` race. The same section: `var x: T = e` declares a mutable variable.
- Orientation, "Numbers", P-161: the getters `asZZ32` and `asZZ64` keep the value or raise `IntegerOverflow`, and the prelude has 8 of the 25 getters, `ZZ64`'s `asZZ32` among them (row 349). "Arguments convert by declared coercions" (P-59): conversion at a call.
- `references/compiler.md`, "What the compiled path cannot compile yet": the prelude's `for` loops work over `ZZ32` ranges only.

## 30. Three Java conversion helpers

**Decision.**

    toInt(n: ZZ64): ZZ32 = n.asZZ32         (* (a) like Math.toIntExact *)
    toIntBig(n: ZZ): ZZ32 = n.asZZ32        (* (b) like BigInteger.intValueExact *)
    fold(h: ZZ64): ZZ32 = narrow(h)         (* (c) like Java's (int) h *)

What each gives:
- (a) at 2^31 raises `IntegerOverflow`, which plays the role of Java's `ArithmeticException`. I do not use `narrow` there, because it would wrap silently to -2^31.
- (b) at 2^31 raises `IntegerOverflow` too. On `ZZ`, `narrow(n)` finds no declaration: `ZZ` has only `big` of the five low-bits functions.
- (c) at 2^32 + 7 gives 7: `narrow` keeps the low 32 bits and never raises.

Why (b) has its own name: I do not overload `toInt` on `ZZ64` and `ZZ`. A call with a `ZZ32` value or a numeral would fit both declarations only by coercion, with neither more specific: "Ambiguous coercion" on both paths. Nothing I read says whether `ZZ64` and `ZZ` exclude each other, which the overload pair would need. Before I name a top-level function `fold`, I would grep `Library/FortressLibrary.fsi` for a functional method `fold`, because a top-level function overloads with a functional method of its name.

In the test I would write the inputs as numerals bound at the wide type: `n: ZZ64 = 2147483648`, `z: ZZ = 2147483648` and `h: ZZ64 = 4294967303`. I would not write `2^31`: an integer power answers its base's type, so `2^31` on the `ZZ32` base 2 itself raises `IntegerOverflow`.

**Path and scope.**
- Walk, with the one library: all three run as described. Each fixed-width type has all five low-bits functions and the checked getters, and `ZZ` has its getters.
- Compiled path, today, before the switch-over:
  - (a) compiles: `ZZ64`'s `asZZ32` is among the prelude's 8 getters.
  - (b) does not compile: the prelude has no getter on `ZZ` (and no `big`). It stays a static error until the switch-over. I would not add the getter to the prelude, and I would test (b) under walk.
  - (c) compiles: `narrow` of a `ZZ64` is among the prelude's low-bits functions.
  - I would confirm in a compiled test that the prelude's `asZZ32` raises at 2^31, rather than assume it. `assert(fold(h), 7, "fold")` is fine there, because the compiled two-value `assert` takes `ZZ32`.
- After the switch-over, all three compile.

**Passages.**
- Orientation, "Numbers", "An integer converts to another integer type by a checked getter or by a low-bits function (P-161)": the getters keep the value or raise `IntegerOverflow`, and `narrow` keeps the low bits "as Java's `(int)` does". It also says: "Of the five, `ZZ` has only `big`, so `narrow(z)` finds no declaration: write `z.asZZ32`", and "Until the switch-over, the compiler's prelude has 8 of the 25 getters, `ZZ64`'s `asZZ32` among them, none on `ZZ`, and no `big`. Of the low-bits functions it has only those that change the type, as `narrow` of a `ZZ64` (row 349)."
- Orientation, "Numbers", "An integer power answers its base's type (P-153)": the reason not to write `2^31`.
- Orientation, "Numbers", "Arguments convert…": "Ambiguous coercion". `SKILL.md`, "Fortress as a language": a functional method overloads with top-level functions.
- Orientation, opening section: do not fix an "Until the switch-over" limit in the compiler's prelude. `references/tests-writing.md`, "A test program": the compiled two-value `assert` covers `ZZ32`.

# Quiz answers, reader 1 (cases 6, 16, 17, 30)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, the area parts under `.claude/skills/fortress-repo/references/` except `revival-changes.md` and `sources.md`, and `explorations/compile-ladder/climb-batch-28/orientation/orientation.md` (cited below as "orientation").

## 6. Java's wrapping string hash, `h = 31 * h + c`

**Decision.** Write the update with the wrapping operators, fully parenthesised:

    h := (31 DOTTIMES h) DOTPLUS c

`h` is mutable (`var h: ZZ32 = 0`). The plain port, `h := 31 h + c`, is wrong: it does not wrap, so it raises `IntegerOverflow` once the hash passes 2^31 - 1, and a hash goes past that within a few characters. Each update needs the `h` before it, so the loop over the characters must be sequential: write its generator as `seq(...)`. A plain `for` runs its iterations in parallel, and `h := ...` in it would be a race.

A second form keeps the low bits after a 64-bit step: `h := narrow(31 widen(h) + widen(c))`. `31 widen(h) + widen(c)` cannot overflow 64 bits for 32-bit `h` and `c`, and `narrow` keeps the low 32 bits without raising, as Java's `int` arithmetic does. I keep the first form, because the curator's decision names the wrapping operators for arithmetic that wraps.

**Path and scope.**
- Walk: `DOTTIMES` and `DOTPLUS` wrap at 32 bits, so the result equals Java's for every input. Plain `*` and `+` raise `IntegerOverflow`.
- Compiled path, before the switch-over: the passages I read do not say whether the compiler's prelude declares `DOTPLUS` and `DOTTIMES`. Before I act, I would grep `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`, `Library/CompilerLibrary.fsi` and `Library/CompilerAlgebra.fsi` for `DOTPLUS` and `DOTTIMES`, and run `facts-extract.sh 'ledger-find:DOTPLUS'` and `'ledger-find:wrapping'`. Then I would compile a probe that uses the line. If the prelude declares neither operator, the line is a static error on the compiled path until the switch-over. I would add nothing to the prelude, and a compiled test of the line would be an `XXX` test that names the missing operator. After the switch-over the compiled path uses the interpreter's library, which declares them.

**Passages.**
- `references/library.md`, "The curator's decisions on the library": "For arithmetic that wraps on overflow, use the wrapping operators ∔ `DOTPLUS`, ∸ `DOTMINUS` and ⨰ `DOTTIMES`. Parenthesise every such expression fully, because their precedence is stated only among themselves."
- `SKILL.md`, "Fortress as a language", "Numbers are siblings": "Overflow raises `IntegerOverflow`." Orientation, opening section: "fixed-width arithmetic does not wrap".
- `SKILL.md`, "Parallelism and mutable state": "A loop is sequential only if every generator is `seq(...)`" and "`acc := acc + x` inside a parallel `for`, with no `atomic`, is a race."
- Orientation, "Numbers", P-161: `narrow`, `widen` and the rest "keep the low bits and never raise, as Java's `(int)` does."
- `references/compiler.md`, "The compiler's prelude, until the switch-over": "Do not add a declaration to the three prelude files", and "What the compiled path cannot compile yet": "a compiled test uses none of these. If a test needs one, write it as an `XXX` test".

## 16. `n: NN32 = 3`

**Decision.** Under walk the binding fails: a numeral does not bind to `NN32`. Write

    n: NN32 = unsigned(3)

The numeral is an `Int` (a `ZZ32`) under walk, and `unsigned` takes its low bits into `NN32` without raising. 3 is the same value at either sign. This is the form that the skill gives. I would see the plain binding fail before I relied on this ("Reproduce a behaviour before you explain it"). The failure is a departure of walk (ledger row 454), not the rule. So no test of mine asserts it as correct, and I write no test that fails if it is fixed.

**Path and scope.**
- Walk: `n: NN32 = 3` fails (row 454). `n: NN32 = unsigned(3)` works.
- Compiled path: the checker types the numeral as `IntLiteral`, which converts to every integer type, so `n: NN32 = 3` is well typed. In a compiled test (`compiler_tests/`), I would keep `n: NN32 = 3`. Before the switch-over I would not assume that `unsigned` exists in the compiler's prelude. P-161 says only that the prelude has 8 of the 25 getters, none on `ZZ`, and no `big` (row 349), so I would read `facts-extract.sh 'ledger:349'` and grep the prelude's `.fsi` files for `unsigned` before I used it in a compiled test. A compiled test's own run through `junit.sh` settles whether the binding compiles, and the test runs through the harness anyway.

**Passages.**
- `references/tests-writing.md`, "A test program": "Under walk, a numeral does not bind to `NN32` or `NN64` ... (ledger row 454). Write `a: NN32 = unsigned(5)`, not `a: NN32 = 5`."
- Orientation, "Numbers", "Under walk a numeral has a run-time class": "The checker types an integer numeral as `IntLiteral`, a sibling under `Number` that converts to the integer types, `QQ` and `RR64` (P-76). Walk gives a numeral the class `Int`, `Long` or `BigNum` by its value."
- Orientation, "Numbers", P-161: the getters and low-bits functions; "Until the switch-over, the compiler's prelude has 8 of the 25 getters, none on `ZZ`, and no `big` (row 349)."
- Orientation, opening section: "A sentence that cites a ledger row states a known departure ... so do not assert it as correct in a test."

## 17. Java's `for (long i = lo; i < hi; i++) { total = step(total, i); }`

**Decision.** Write a sequential `ZZ32` loop that widens its index:

    if lo < hi then
        lo32: ZZ32 = lo.asZZ32
        count: ZZ32 = (hi - lo).asZZ32
        for j <- seq(lo32 # count) do
            total := step(total, j.asZZ64)
        end
    end

`total` is mutable (`var total: RR64 = ...`). Three choices in it:
- A range over `ZZ64` is a static error, and walk stops when it builds one. So the counter is `ZZ32`, and `asZZ32` converts the bounds, raising `IntegerOverflow` if one does not fit. The brief says they fit, so the getter only checks that.
- `seq(...)` makes the loop sequential. Each step needs the total before it, and a plain `for` runs its iterations in parallel. In a plain `for`, `total := ...` is a race. `atomic` would remove the race but not fix the order, and the order changes the result.
- `j.asZZ64` widens the index to `step`'s parameter type. The declared coercion from `ZZ32` to `ZZ64` would also convert `j` at the call. The getter makes the conversion visible. `lo32 # count` is the range of `count` integers from `lo32`, the `0#n` form that the library part uses. The `if` keeps Java's zero iterations when `hi <= lo`, so the loop never builds a range of size 0 or less. The parts I read do not say what such a range does.

**Path and scope.**
- Walk: as above.
- Compiled path, before the switch-over: its `for` loops work over `ZZ32` ranges only, which this loop meets. The prelude has only 8 of the 25 getters (row 349), and the parts I read do not say that it declares `seq`. Before I compiled this, I would read `facts-extract.sh 'ledger:349'` for the 8 getters and grep the prelude's `.fsi` files for `seq`. Where `asZZ64` is missing, I would drop it and let the declared coercion convert `j`. Where `asZZ32` on `ZZ64` or `seq` is missing, the port does not compile until the switch-over, and I would add nothing to the prelude.

**Passages.**
- `references/library.md`, "The curator's decisions on the library": "Scalar ranges are over `ZZ32` only. A range over another integer type is a static error, and walk stops when it builds one. Write a wider counter as a `ZZ32` loop that widens its index."
- `SKILL.md`, "Parallelism and mutable state": "The iterations of a `for` loop ... can run at once. A loop is sequential only if every generator is `seq(...)`", and the race of `acc := acc + x` in a parallel `for`. Also, "A passing run does not prove that there is none."
- Orientation, "Numbers", P-161: "To convert a value, write a getter: `asZZ32`, `asZZ64` ... It keeps the value or raises `IntegerOverflow`." Also: "Until the switch-over, the compiler's prelude has 8 of the 25 getters" (row 349).
- `SKILL.md`, "Numbers are siblings": "A wider type declares a `coerce` from each narrower one." Orientation, "Arguments convert by declared coercions": "Walk converts at a call".
- `references/compiler.md`, "What the compiled path cannot compile yet": "Its `for` loops, comprehensions and reductions work over `ZZ32` ranges only."

## 30. Three Java conversion helpers

**Decision.**

    toInt(n: ZZ64): ZZ32 = n.asZZ32       (* (a) Math.toIntExact *)
    toInt(n: ZZ): ZZ32 = n.asZZ32         (* (b) BigInteger.intValueExact *)
    fold(h: ZZ64): ZZ32 = narrow(h)       (* (c) (int) h *)

- (a) At 2^31, `asZZ32` raises `IntegerOverflow`, because 2^31 is above 2^31 - 1. That matches Java, which throws `ArithmeticException` there. A `catch` sees the Fortress exception.
- (b) At 2^31, `asZZ32` raises `IntegerOverflow` in the same way. `narrow` is not an option for `ZZ`: under walk, `narrow(z)` finds no declaration. `ZZ`'s only low-bits function is `big`.
- (c) `narrow` keeps the low 32 bits and never raises. At 2^32 + 7 it gives 7, as Java's `(int)` does.
- The two `toInt` overloads take sibling number types, one declaration per type, as the library itself declares such functions.
- In a walk test I would build the inputs from numerals, as `x: ZZ64 = 2147483648` and `z: ZZ = 2147483648`. I would not write `2^31`: the base 2 is a `ZZ32`, an integer power answers its base's type, so `2^31` raises `IntegerOverflow` itself.

**Path and scope.**
- Walk: all three behave as above.
- Compiled path, today (before the switch-over):
  - (b) does not compile: the compiler's prelude has no getter on `ZZ`.
  - For (a) and (c), the passages say only that the prelude has 8 of the 25 getters, none on `ZZ`, and no `big` (row 349). They do not say whether `ZZ64`'s `asZZ32` is among the 8, or whether the prelude has `narrow`. I would read `facts-extract.sh 'ledger:349'` and grep `CompilerBuiltin.fsi` and `CompilerLibrary.fsi` for `asZZ32` and `narrow`. Where one is missing, that function does not compile until the switch-over. I would add nothing to the prelude, and a compiled test of it would be an `XXX` compile test naming the missing declaration.
  - After the switch-over, all three compile, against the interpreter's library, which declares every getter and low-bits function where it applies.

**Passages.**
- Orientation, "Numbers", "An integer converts to another integer type by a checked getter or by a low-bits function (P-161)": "It keeps the value or raises `IntegerOverflow`. The functions `narrow`, `widen`, `signed`, `unsigned` and `big` keep the low bits and never raise, as Java's `(int)` does. So `narrow` of a `ZZ64` above 2^31-1 wraps silently. ... `ZZ` has only `big`: write `z.asZZ32`, because under walk `narrow(z)` finds no declaration. ... Until the switch-over, the compiler's prelude has 8 of the 25 getters, none on `ZZ`, and no `big` (row 349)."
- Orientation, "An integer power answers its base's type (P-153)", and "Under walk a numeral has a run-time class" (`Int`, `Long` or `BigNum` by value).
- Orientation, "`Number` declares nothing (P-165)": "declare your function once for each number type instead."
- `references/compiler.md`, "The compiler's prelude, until the switch-over": "Do not add a declaration to the three prelude files". `references/tests-writing.md`, "Writing an `XXX` test": "For a refusal at compile time, write one `XXX` compile test".

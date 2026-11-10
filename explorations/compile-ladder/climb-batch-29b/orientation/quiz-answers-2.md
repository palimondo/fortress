# Quiz answers, reader 2 (cases 5, 16, 26, 31, 32)

Sources read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; the area parts under its `references/`, without `revival-changes.md` and `sources.md`; and the orientation, `explorations/compile-ladder/climb-batch-29b/orientation/orientation.md` (cited below as "orientation"). I opened nothing else.

## 5. `double seconds = elapsed / 1e9;` with `elapsed: ZZ64`, under walk

**Decision.**

    seconds: RR64 = asFloat(elapsed) / 1000000000.0

- `asFloat(elapsed)` is required. No coercion carries a `ZZ64` into `RR64`, so a `ZZ64` operand has to be converted explicitly. Each number type declares its own `asFloat` into `RR64`.
- The constant is written with a radix point, so it is an `RR64`: a radix-point numeral converts at `RR64` with one rounding (exact here), or defaults to `RR64`.
- `elapsed / 1000000000` would be a mistake: `/` on two integers answers a `QQ`, not a float.
- I write `1e9` as a plain radix-point numeral. Before I used an exponent form such as `1.0E9`, I would check in the specification's lexical chapter (numerals) that the lexer accepts it. None of my sources shows that form.

**If `elapsed` were a `ZZ32`:** the same line works, because `ZZ32` also declares `asFloat`, and I would keep it. The `asFloat` is not required there, though. A `ZZ32` converts into `RR64` implicitly, so `seconds: RR64 = elapsed / 1000000000.0` also gives a float. This is the same pattern as the orientation's `(1.0 s) / n` for `ZZ32` values. Only the `ZZ64` case needs the explicit conversion.

**Path and scope.** This holds under walk (the question's path), and for the one library after the switch-over, where the checker picks the coercion statically (P-59). Until the switch-over, the compiler's library has no `QQ` and declares `/` only at `RR64`, so a compiled integer `/` would be a static error. I did not check the compiled path further, because the program runs under walk.

**Passages.**
- Orientation, "Numbers": the bold rule "`/` on two integers answers a `QQ`" ("No coercion carries a `ZZ64` into `RR64`, so convert each `ZZ64` operand with `asFloat`, as `asFloat(s) / asFloat(n)`"), and "`Number` declares nothing (P-165)" ("Each of the eight number types declares its own `asFloat` into `RR64`").
- `references/library.md`, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`."
- Orientation, "A numeral converts where it stands (P-173)": a radix-point numeral defaults to `RR64`.

## 16. `n: NN32 = 3`

**Decision.** The binding works on both paths, so I keep it.

- **Under walk:** a typed binding is a place that fixes a type, and `NN32` has a coercion from the numeral type. The numeral converts exactly from its value, so `n` is the `NN32` 3. The orientation's own example is `u: NN32 = 5`.
- **On the compiled path, before the switch-over:** the compiler's prelude follows the same numeral design (P-37). Its only exceptions are that it has no `QQ`, and that its `RR64` and `RR32` take only radix-point numerals (row 442). `NN32` is not among them, so `n: NN32 = 3` binds there too.

**The trap is comparing `n` with a numeral, not the binding itself.**
- **Under walk:** a numeral at `=` takes its default, `ZZ32`. No coercion carries `ZZ32` into `NN32` or `NN32` into `ZZ32`, so `n = 3` falls back to `SEQV` and gives `false` (row 973).
  - For the same reason `assert(n, 3, "...")` fails.
  - `n =/= 3` also misbehaves for `NN32` (row 966): it is `true` for a zero `u: NN32` against `0`.
- **On the compiled path:** until the switch-over, the compiled `u = 0` is `true`, so the two paths disagree.

So I bind the expected value at the same type and compare two `NN32` values:

    n: NN32 = 3
    three: NN32 = 3
    assert(n = three, "n is the NN32 3")

The Boolean form `assert(flag, msg)` exists in both libraries, while the compiler's two-value `assert` is only for `ZZ32`, `String` and `Character`. So this line also suits a compiled test. Where a value is computed rather than written, I convert it with the checked getter `x.asNN32`.

**Passages.**
- Orientation, "Numbers", "A numeral converts where it stands (P-173)": "A place fixes a type when its declared type has a coercion from the numeral type … So `u: NN32 = 5` binds", and "Until the switch-over, the compiler's prelude follows the same design (P-37), but it has no `QQ` …".
- Orientation, "`Number` declares nothing (P-165)": "To compare a typed value with a numeral, bind the numeral at the value's type first, as `z: NN32 = 0`, then `u = z` … So `u = 0` is `false` for a zero `u: NN32` … (row 973). Until the switch-over, the compiled `u = 0` is `true`."
- `references/interpreter.md`, the departures list (row 966).
- `references/tests-writing.md`, "A test program": the forms of `assert`.

## 26. Comparisons across number types

### (a) `if (count == limit)` with `count: ZZ64`, `limit: RR64`, under walk

**Decision.**

    if asFloat(count) = limit then ... end

`count = limit` gives `false` for a `count` of 3 and a `limit` of 3.0, with no error. No coercion carries a `ZZ64` into an `RR64`, or the reverse. So the library declares no `=` for the pair, and `=` falls back to strict equivalence, `SEQV`, under which values of different types are never equivalent. `asFloat(count)` makes the comparison Java's: Java also widens the `long` to `double` before `==`.

**The same condition for other types of `count`:**
- **`count: ZZ32`:** a coercion carries `ZZ32` into `RR64`, so the library declares `=` for that pair, and plain `count = limit` would be `true` at 3 and 3.0. My condition `asFloat(count) = limit` is also correct for `ZZ32`, and I keep the same line.
- **`count: QQ`:** the library's decision names only `ZZ32` and numerals as converting implicitly into `RR64`. So I expect `count = limit` to be `SEQV` again, and `false`.
  - `asFloat(count) = limit` works anyway, because `QQ` declares its own `asFloat`. I write that line.
  - Before I stated in a test what plain `count = limit` gives for a `QQ`, I would look in `Library/FortressLibrary.fsi` for a `coerce` from `QQ` in `RR64`, or run a one-line probe under walk.

**Path and scope.** This holds under walk. After the switch-over, the one library's `=` over `Any` answers `SEQV`, so the plain cross-type `=` is `false` on both paths. Until the switch-over, the compiler's library has no `=` over `Any` (orientation, "Where a type declares no `=` …").

**Passages.**
- Orientation, "`Number` declares nothing (P-165)": "Two numbers of different types compare by `=` only where a coercion carries one into the other … Otherwise `=` is `SEQV` …, and answers `false` without an error, as for a `ZZ64` against an equal `RR64` … To compare values across types at known types, write `asFloat(x) = y`."
- Orientation, "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)": "values of different types are never equivalent".
- `references/library.md`, "The curator's decisions on the library" (`ZZ32` and numerals into `RR64` implicitly; `ZZ64` only by `asFloat`).

### (b) `near[\T extends Number\](a: T, b: RR64): Boolean` in the interpreter's library

**Decision.** I do not write the generic. `Number` declares nothing (P-165), so the body cannot call `asFloat` on a `T extends Number`. The checker would refuse the generic in the count stage. The orientation says to declare the function once for each number type instead. So I write eight overloads, which share one body through the `RR64` overload. In `Library/FortressLibrary.fsi`:

    near(a: ZZ32, b: RR64): Boolean
    near(a: ZZ64, b: RR64): Boolean
    near(a: NN32, b: RR64): Boolean
    near(a: NN64, b: RR64): Boolean
    near(a: ZZ, b: RR64): Boolean
    near(a: QQ, b: RR64): Boolean
    near(a: RR32, b: RR64): Boolean
    near(a: RR64, b: RR64): Boolean

In `Library/FortressLibrary.fss`, with the same headers:

    near(a: RR64, b: RR64): Boolean = |a - b| <= 0.000000001
    near(a: ZZ32, b: RR64): Boolean = near(asFloat(a), b)
    near(a: ZZ64, b: RR64): Boolean = near(asFloat(a), b)
    near(a: NN32, b: RR64): Boolean = near(asFloat(a), b)
    near(a: NN64, b: RR64): Boolean = near(asFloat(a), b)
    near(a: ZZ, b: RR64): Boolean = near(asFloat(a), b)
    near(a: QQ, b: RR64): Boolean = near(asFloat(a), b)
    near(a: RR32, b: RR64): Boolean = near(asFloat(a), b)

**Notes on the declarations.**
- **The tolerance:** `0.000000001` is a radix-point numeral at an `RR64` operand, rounded once, which gives the same double as Java's `1e-9`.
- **Dispatch:** each argument type has an exact fit, so a conversion never changes which declaration runs. For a numeral argument, as `near(3, 3.0)`, the tied declarations differ only at the numeral's position, so both paths read it as its default (`ZZ32`, or `RR64` with a radix point).
- **The export check:** the api and the component give every declaration the same header, which the compiled export check needs for the `FortressLibrary` component.
- **Absolute value:** before I wrote `|a - b|`, I would confirm in `FortressLibrary.fsi` that `RR64` declares absolute value as `opr |self|`, and follow whatever spelling it uses. Otherwise I would write `d = a - b` and `NOT (d > tol) AND NOT (-tol > d)`.

**Steps.**
1. Look up the record first:
   - `$T 'P-165'`;
   - `python3 explorations/coordinator/tools/ledger.py find --cites Library/FortressLibrary.fss` and `--cites Library/FortressLibrary.fsi`;
   - grep the library, the tests and the two microGPT programs for an existing `near`, so that the new name collides with nothing.
2. See how the library already declares a function once per number type, and copy its form (`references/library.md`, "Designing a change").
3. Write the walk test first, `ProjectFortress/tests/NearNumberTypes.fss`. It asserts `near` at each of the eight types, binding each argument at its type (`z: ZZ64 = 3`, `q: QQ = 3`, …). See it fail through `harness-one.sh` on the base.
4. Edit the `.fsi` and the `.fss`, and see the test pass with `COLD_CACHE=1`. A new overload can make walk refuse every program at load, and walk checks the library's overloads only when it analyses the library afresh.
5. Run the count stage (`explorations/coordinator/tools/checker-count/run.sh`, in the background), and check that the `#total 0` / `#locations 0` table is unchanged.
6. Run the demo driver once, because the edit is to the interpreter's library (`references/tests-running.md`, "Outside the gate").

**Path and scope.** These declarations are in walk's library: compiled programs do not link it until the switch-over, and the count stage checks it now. No compiler-prelude edit.

**Passages.**
- Orientation, "`Number` declares nothing (P-165)": "So generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, `asFloat` among them … In generic code over `T extends Number`, declare your function once for each number type instead."
- Orientation, "Arguments convert by declared coercions …": "Where the tied declarations differ only at the positions of the call's numerals, both paths read the numeral as its default."
- `references/library.md`, "Designing a change": the api headers and the export check, and new overloads and walk's load check.
- `references/interpreter.md`, "What walk checks", on the check at load (row 342 for the cache).
- `references/compiler.md`, "The checker's time", on the count stage.

## 31. A walk test for a change to the number types

### (a) `nSamples = 3000000000` at the top level, then `scale: RR64 = nSamples`

**Decision.** The binding does not run.
- **Why:** the untyped numeral takes its default, and 3000000000 does not fit a `ZZ32`, so `nSamples` is a `ZZ64`. The default stays the value's type. No coercion carries a `ZZ64` into `RR64`, so the typed binding finds no conversion.
- **Where it stops:** walk stops when the binding runs, with a type mismatch at the binding. The checker would refuse it statically.

I write:

    nSamples: ZZ64 = 3000000000          (* same type as the default; written for the reader *)
    ...
    scale: RR64 = asFloat(nSamples)

If `nSamples` also bounds a loop, note that scalar ranges are over `ZZ32` only, so `0#nSamples` is a static error, and walk stops when it builds the range. Write the loop as a `ZZ32` loop that widens its index.

**Passages.**
- Orientation, "A numeral converts where it stands (P-173)": "Elsewhere the numeral takes its default: `ZZ32`, or `ZZ64` or `ZZ` where its value does not fit … So `n = 3000000000` is a `ZZ64` … The default stays the value's type: for `x = 0.1`, `q: QQ = x` is refused."
- Orientation, "`/` on two integers …": "No coercion carries a `ZZ64` into `RR64`".
- `references/library.md`, "The curator's decisions on the library": `ZZ64` into `RR64` only by `asFloat`, and the scalar ranges.

### (b) `ZZ32` addition raises `IntegerOverflow` at the maximum

**Decision.** A variable operand is required. `2147483647 + 1`, numerals alone, folds exactly before the run into the `ZZ64` 2147483648 and raises nothing. So I write:

    m: ZZ32 = 2147483647
    var raised: Boolean = false
    try
        r: ZZ32 = m + 1
        println(r)
    catch e
        IntegerOverflow => raised := true
    end
    assert(raised, "ZZ32 maximum plus one raises IntegerOverflow")

The `1` converts to `ZZ32` at `ZZ32`'s `+`, so `ZZ32`'s `+` runs and overflows. No printed text contains "fail", so the harness's check of the output does not trip on the passing run.

### (c) `RR64` addition rounds

**Decision.** Variable operands are required here too. `(0.1 + 0.2 = 0.3)` folds exactly to `true`. I write:

    a: RR64 = 0.1
    b: RR64 = 0.2
    c: RR64 = 0.3
    d: RR64 = 0.30000000000000004
    assert(NOT (a + b = c), "0.1 + 0.2 is not 0.3 in RR64")
    assert(a + b = d, "0.1 + 0.2 rounds to the double nearest 0.30000000000000004")

Each numeral converts at `RR64` with one rounding, so `c` is the double nearest 0.3, and `d` is the double that IEEE addition of `a` and `b` gives. I use `NOT (… = …)` rather than `=/=`, as `interpreter.md` advises.

### The same on the compiled path?

A file in `ProjectFortress/tests/` runs only under walk (`SystemJUTest`). A compiled check is a separate test in `compiler_tests/`, with a `.test` file (`link`, `run`) and `println("PASS")` last.

- **On both paths:** the folding happens before the checker, so the variable operands are needed in a compiled test too.
- **(c):** it tests the same thing on the compiled path. The compiler's `RR64` takes the radix-point numerals; the compiled `=` on `RR64` compares by `=`; and the compiled code boxes doubles (`FRR64`) without changing IEEE addition. The Boolean `assert(flag, msg)` exists there.
- **(b):** the lines carry over. The Boolean `assert` is used rather than a two-value `assert` on Booleans, which the compiler's library does not have, and `IntegerOverflow` is declared as an object in both libraries. But my sources do not say that the compiled `ZZ32` `+` raises an `IntegerOverflow` that a `catch` sees. Compiled `ZZ32` powers at a base of 0 throw a Java exception that no `catch` sees (rows 441, 523). So I would not claim (b) tests the same thing compiled until the compiled test passes through `junit.sh`. If it does not pass, I would record that as a defect (`tests-writing.md`, "How a defect is recorded").

**Passages.**
- Orientation, "An expression of numerals alone folds exactly before the checker, on both paths (P-173)": "So `2147483647 + 1` is the `ZZ64` 2147483648, not an `IntegerOverflow`, `(0.1 + 0.2 = 0.3)` is `true` … A test of run-time arithmetic or concatenation needs a variable operand: write `m: ZZ32 = 2147483647`, then `m + 1`."
- `references/tests-writing.md`, "A test program" (variable operands; the forms of `assert`) and "Where a test goes, and how it passes" (green: no `fail` in the output; compiled `.test` keys).
- `references/interpreter.md` (`NOT (u = 0)`), and "Natives" (`IntegerOverflow` declared in both libraries).
- Orientation, "An integer power answers its base's type (P-153)" (rows 441, 523).
- `SKILL.md`, "Numbers are siblings": "Overflow raises `IntegerOverflow`".

## 32. `value object Byte(b: ZZ32)` written as numerals

**Decision.**

    value object Byte(b: ZZ32)
        coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v.asZZ32)
    end

- **How the coercion works:** the coercion is generic over the numeral's numbers. `v` is its digits read in its radix, which is its value, and the body reads `v` as a `ZZ` of any size. The `where` clause bounds the numerals that `Byte` takes.
- **What binds:** `x: Byte = 255` binds `Byte(255)`. The coercion runs once for the place where `255` is written, and each run of that place reuses the value.
- **What is refused:** a numeral with a radix point, as no coercion takes it. A negative constant such as `-3`, because `Byte` declares no prefix `-`.
- **Equality:** `Byte` has no `=` of its own, so it compares by `SEQV`, field by field, as a value object.

**Where and when `300` is refused.**
- **The rule:** statically, since `300` breaks the coercion's `where` clause.
- **Under walk:** when the binding `y: Byte = 300` runs, with 'Type mismatch binding' and the numeral.
- **On the compiled path:** today it is not refused at all. The checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test` records this). The code generator emits no code for a declaration's own `where` clause, so the runtime does not check it either, and the coercion runs in the component's static initializer.
  - A test of the refusal on the compiled path stays the existing `XXX` test.
  - Before the switch-over, I would first read that test's program. Its body is the form that the compiled path takes. The compiler's prelude has `asZZ32` only on `ZZ32` and `ZZ64` (row 349), so `v.asZZ32` on a `ZZ` may not compile there.

**`z: Byte = 2 + 3`: no, by the rule.** `2 + 3` folds to one exact constant, 5, whose default type is `ZZ32`. A program's own type takes such a constant only through a coercion from its default type, and coercions do not chain, so the numeral coercion is not enough. The orientation's own example is `h: Half = 10/20`, which needs `coerce(q: QQ)`. I write one of these:
- **`z: Byte = 5`:** the numeral itself. This keeps the static range check, and it is what I choose.
- **A `ZZ32` coercion:** if the program must accept constant expressions at `Byte`, add `coerce(x: ZZ32)` to `Byte`, with its own range check, which raises at run time. The cost: every `ZZ32` value then converts implicitly to `Byte`, and the range check is no longer static.

Walk's departures here:
- `interpreter.md` (row 968) shows walk handing the folded `5 - 8` to the numeral coercion with its sign. So walk may also pass a folded `2 + 3` to the numeral coercion and bind it.
- On the compiled path, a negative constant at a program's own number type also reaches the coercion with its sign (row 961).

So I would check walk's answer with a probe before I asserted it in a test. If walk binds it, the test asserts the rule's answer as an `XXX` test.

**Path and scope.**
- **Walk:** binds 255, refuses 300 at run time.
- **Compiled, today:** binds 255, does not refuse 300 (the `XXX` test above).
- **Both paths:** `2 + 3` does not bind by the rule without a `ZZ32` coercion, subject to walk's departure above.

**Passages.**
- Orientation, "Numbers", the paragraph after "A numeral converts where it stands": the `Byte` coercion verbatim, and "The rule refuses statically a numeral that breaks it, as `300` here. The checker does not refuse it yet (`compiler_tests/XXXNumeralWhereRefusedCompiled.test`), and walk refuses it when the binding runs, with 'Type mismatch binding'", plus the sentences on negative constants and on P-176.
- Orientation, "An expression of numerals alone folds exactly …": "A program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174). So `h: Half = 10/20` needs `coerce(q: QQ)`; a numeral coercion is not enough."
- Orientation, "Three `where` forms are built (P-151)": the code generator emits no code for a declaration's own clause.
- `references/compiler.md`, "What the code generator does" (the coercion in the static initializer) and "Traps of the compiled path" (row 961).
- `references/interpreter.md`, the departures list (row 968).
- Orientation, "An integer converts …" (row 349).

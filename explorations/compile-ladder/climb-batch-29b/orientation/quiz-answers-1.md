# Quiz answers, reader 1 (cases 5, 16, 26, 31, 32)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its parts under `references/` except `revival-changes.md` and `sources.md`, and `explorations/compile-ladder/climb-batch-29b/orientation/orientation.md`. "Orientation" below means that file.

## 5. `double seconds = elapsed / 1e9;`

**Decision.** With `elapsed: ZZ64`:

    seconds: RR64 = asFloat(elapsed) / 1000000000.0

- A `ZZ64` does not convert into `RR64` by itself. No coercion carries it there, so it must go through `asFloat`.
- The divisor is a numeral with a radix point. It converts at `RR64`'s `/`, and its default is `RR64` anyway.
- I write the numeral out in full. I have not seen an exponent form (`1e9`, `1.0E9`) in what I read. Before I used one, I would check that it parses (`bin/fortress parse` on a one-line probe).
- Never `elapsed / 1000000000`: `/` on two integers gives a `QQ`, not a float.

If `elapsed` were a `ZZ32`, the same line works, because each of the eight number types declares its own `asFloat` into `RR64`. I would keep it. A `ZZ32` also converts into `RR64` implicitly, so the orientation's form for `ZZ32`, `(1.0 elapsed) / 1000000000.0`, would work as well. That form does not work for a `ZZ64`. The `ZZ32` case is the only one where the explicit `asFloat` can be left out.

**Path and scope.** Walk, as asked. On the compiled path before the switch-over, the compiler's library has `/` only at `RR64`, and its `RR64` takes only a radix-point numeral (row 442). The line meets both limits. I have not checked that the compiler's prelude declares `asFloat` on `ZZ64`.

**Passages.** Orientation, "Numbers": "`/` on two integers answers a `QQ`… For a float, make one operand a float, as `(1.0 s) / n` for `ZZ32` values `s` and `n`. No coercion carries a `ZZ64` into `RR64`, so convert each `ZZ64` operand with `asFloat`, as `asFloat(s) / asFloat(n)`". Orientation, "`Number` declares nothing": "Each of the eight number types declares its own `asFloat` into `RR64`." `references/library.md`, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`."

## 16. `n: NN32 = 3`

**Decision.** Yes, the binding works as written, on both paths. A typed binding is a place that fixes the type. `NN32` has a coercion from the numeral type, and 3 is in `NN32`'s range, so the numeral converts exactly to the `NN32` 3. Nothing else is needed. The orientation gives this exact case: "`u: NN32 = 5` binds".

The trap is in the assertion, not the binding. No `=` ties a numeral type to a number type, so under walk, `n = 3` compares an `NN32` with a numeral's default `ZZ32` and can be `false` (row 973 gives `u = 0` as `false` under walk). `n =/= 3` is wrong under walk too (row 966). So I bind the expected value at `NN32` as well, and compare two `NN32` values:

    n: NN32 = 3
    three: NN32 = 3
    assert(n = three, "NN32 numeral binding")

I use `assert(flag, msg)` and not `assert(n, three, msg)`. Under walk, the three-argument form calls a type's own `=` only for types that extend a `FortressLibrary` trait that declares `=` (row 807). The compiler's library has the three-argument `assert` only for `ZZ32`, `String` and `Character`.

**Path and scope.** Both paths. Before the switch-over, the compiler's prelude declares the same numeral types and coercions (P-37); only its `RR64` and `RR32` need a radix point. A different case is refused: a `nat` or `int` size parameter used as a value is a `ZZ32`, so `u: NN32 = n` fails. For a computed value I would write a getter, as `k.asNN32`.

**Passages.** Orientation, "Numbers", "A numeral converts where it stands (P-173)": "A place fixes a type when its declared type has a coercion from the numeral type, as each of the eight number types has. Such places are a typed binding, … So `u: NN32 = 5` binds". Same section: "Until the switch-over, the compiler's prelude declares the same types and coercions (P-37), but its `RR64` and `RR32` take only a radix-point numeral". Orientation, "`Number` declares nothing": "No `=` ties a numeral type to a number type (P-174). So for a zero `u: NN32`, `u = 0` is `false` under walk and `true` on the compiled path (row 973). Bind the numeral at the type first". `references/interpreter.md`, departures list (row 966). `references/tests-writing.md`, "A test program" (`assert` and row 807; the compiler's two-value `assert`).

## 26. Comparisons across number types

### (a) `if (count == limit)`, `count: ZZ64`, `limit: RR64`

**Decision.**

    if asFloat(count) = limit then ... end

`count = limit` with a `count` of 3 and a `limit` of 3.0 gives `false`, with no error. No coercion carries a `ZZ64` into `RR64` or the reverse, so the library declares no `=` for this pair. `=` then falls back to `SEQV`, and values of different types are never equivalent. The bug is silent.

- `count: ZZ32`: a coercion carries `ZZ32` into `RR64`, and the library declares `=` for each such pair. So `count = limit` would give `true` for 3 and 3.0. I would still write `asFloat(count) = limit`, which is the same line and is right for every number type.
- `count: QQ`: the passages I read do not say whether `RR64` declares a coercion from `QQ`. I would look in `Library/FortressLibrary.fsi` for `RR64`'s `coerce` declarations and its cross-type `=`. If there is none, `count = limit` is `SEQV` and `false`. `asFloat(count) = limit` works either way, since `QQ` declares its own `asFloat`. It compares the rounded float of the rational.

**Path and scope.** Walk, as asked; it uses the interpreter's library. On the compiled path before the switch-over, the compiler's library declares no `=` over `Any`. Its `===` compares only strings and four number types, by `=` (row 908). So I would not assume the same fallback there.

**Passages.** Orientation, "`Number` declares nothing (P-165)": "Two numbers of different types compare by `=` only where a coercion carries one into the other: the library declares `=` for each such pair… Otherwise `=` is `SEQV` …, and answers `false` without an error, as for a `ZZ64` against an equal `RR64`… To compare values across types at known types, write `asFloat(x) = y`." Orientation, "Traits and objects" (`SEQV`): "values of different types are never equivalent". `references/library.md`: "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly".

### (b) `near` in the interpreter's library

**Decision.** I would not declare a generic `near[\T extends Number\]`. `Number` declares nothing, so a body over `T extends Number` cannot call `asFloat` (or `-`) on a `T`. The checker in the count stage would refuse it. Instead I declare one overload for each of the eight number types of the library, and put the same headers in the api.

`Library/FortressLibrary.fsi`:

    near(a: ZZ32, b: RR64): Boolean
    near(a: ZZ64, b: RR64): Boolean
    near(a: NN32, b: RR64): Boolean
    near(a: NN64, b: RR64): Boolean
    near(a: ZZ,   b: RR64): Boolean
    near(a: QQ,   b: RR64): Boolean
    near(a: RR32, b: RR64): Boolean
    near(a: RR64, b: RR64): Boolean

`Library/FortressLibrary.fss` uses the same headers, each with a body of this form:

    near(a: ZZ32, b: RR64): Boolean = do
        d: RR64 = asFloat(a) - b
        (d <= 0.000000001) AND (-d <= 0.000000001)
    end

The other seven overloads differ only in `a`'s type. I would write the tolerance out, or as the library writes such a constant; I would not use an exponent form I have not seen parse. If the library has an absolute-value operator on `RR64`, I would use it in the body.

Steps:

1. Before the edit, look for ledger rows that cite `Library/FortressLibrary.fss`.
2. See how the library already declares a function once for each number type, as its per-type `asFloat` and cross-type `=`, and follow that way. This matters most for how the eight types exclude one another, so that the overloads pass both the checker's rules and walk's load check.
3. Write a walk test first, `ProjectFortress/tests/<Topic>.fss`, that asserts `near` at each of the eight types. See it fail through `harness-one.sh` before the edit.
4. Make the edit, then run the test with `COLD_CACHE=1`. A new overload can make walk refuse every program at load, and walk checks against the library only when it analyses the library (row 342).
5. Run the count stage, `explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`, in the background. It must print `#total 0` and `#locations 0`; that stage also runs the export check, so the api and component headers must match.
6. Run the demo driver once, because this is an edit of the interpreter's library.

**Path and scope.** The interpreter's library: walk, and the checker as the count stage runs it against that library. Compiled programs do not link this library before the switch-over, so no compiled test can reach `near` yet. A program's own number type below `Number` (P-160) is not covered; the question asks only for the library's types.

**Passages.** Orientation, "`Number` declares nothing (P-165)": "generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, `asFloat` among them… In generic code over `T extends Number`, declare your function once for each number type instead." `SKILL.md`, "Fortress as a language" (siblings under `Number`; the overloading rules). `references/library.md`, "Designing a change" (api headers equal to the component's; a new overload can stop walk; follow the library's way). `references/interpreter.md`, "What walk checks" (row 342, `COLD_CACHE=1`). `references/compiler.md`, "The checker's time" (count stage, `#total 0`). `references/tests-running.md`, "Outside the gate" (demos).

## 31. A walk test for the number types

### (a) `nSamples = 3000000000`, then `scale: RR64 = nSamples`

**Decision.** The first binding runs. An untyped binding gives the numeral its default, and 3000000000 does not fit `ZZ32`, so `nSamples` is a `ZZ64`. The default stays the value's type. The second binding does not run: no coercion carries a `ZZ64` into `RR64`. Walk fails when that binding runs, as a type mismatch at the binding, and the checker would refuse it statically. I write:

    nSamples: ZZ64 = 3000000000            (* or leave it untyped: it is a ZZ64 either way *)
    ...
    scale: RR64 = asFloat(nSamples)

If the value were a `nat` size parameter instead of a top-level variable, a size of 2^31 or more used as a value is a `ZZ64` under walk and raises a `java.lang.Error` on the compiled path (row 962). I would assert no value for it.

### (b) `ZZ32` addition raises `IntegerOverflow` at the maximum

**Decision.** A variable operand, because `2147483647 + 1` written with numerals alone folds to the `ZZ64` 2147483648 and raises nothing:

    m: ZZ32 = 2147483647
    var raised: Boolean = false
    try
        r = m + 1
    catch e
        IntegerOverflow => raised := true
    end
    assert(raised, true, "ZZ32 + overflows at its maximum")

### (c) `RR64` addition rounds: 0.1 plus 0.2 is not 0.3

**Decision.** Variable operands again, because `(0.1 + 0.2 = 0.3)` folds exactly to `true`. I also bind the expected 0.3 at `RR64`, so that `=` compares two `RR64` values and not a number with a numeral:

    a: RR64 = 0.1
    b: RR64 = 0.2
    c: RR64 = 0.3
    assert(NOT (a + b = c), "RR64 addition rounds: 0.1 + 0.2 is not 0.3")

I write `NOT (… = …)` and not `=/=`, after row 966.

No message or output line holds the word "fail", because the harness counts it as a failure.

### Would (b) and (c) test the same thing on the compiled path?

- **The same:** the fold runs before the checker on both paths, so a test of either path needs the variable operands. The compiled `RR64` is a boxed Java `double`, so `a + b` gives the same IEEE result. `IntegerOverflow` is an object in both libraries, so a compiled `catch` can see it.
- **Not as written:** the lines are a walk test in `ProjectFortress/tests/`, which only walk runs. A compiled version is a separate `compiler_tests/<Name>.fss` with a `.test` file (`link`, `run`) and ends `run()` with `println("PASS")`. Before the switch-over it runs against the compiler's library, so:
  - (b) needs `assert(raised, "…")`, since the three-argument `assert` exists there only for `ZZ32`, `String` and `Character`;
  - I would check, in the ledger (`ledger-find:IntegerOverflow`) and the compiler's prelude, that its `ZZ32` `+` raises `IntegerOverflow` and does not throw a Java exception that no `catch` sees, as its `ZZ32` power does at a base of 0 (rows 441, 523);
  - the try/catch must avoid the compiled `try` traps: no `finally` after an escaping exception, and no nesting (rows 888 to 891).
- So the property tested is the same, but the test is not the same file, its assertions use other forms, and (b) waits on that lookup.

**Path and scope.** (a) to (c) as written: walk, with the interpreter's library. For the compiled side, see the list above (before the switch-over).

**Passages.** Orientation, "Numbers", "A numeral converts where it stands": "Elsewhere the numeral takes its default: `ZZ32`, or `ZZ64` or `ZZ` where its value does not fit… So `n = 3000000000` is a `ZZ64`… The default stays the value's type". Orientation, "Numbers": "No coercion carries a `ZZ64` into `RR64`, so convert each `ZZ64` operand with `asFloat`". Orientation, "An expression of numerals alone folds exactly before the checker, on both paths (P-173)": "So `2147483647 + 1` is the `ZZ64` 2147483648, not an `IntegerOverflow`, `(0.1 + 0.2 = 0.3)` is `true`… A test of run-time arithmetic or concatenation needs a variable operand: write `m: ZZ32 = 2147483647`, then `m + 1`". Orientation, "`Number` declares nothing" (row 973: bind the numeral at the type first). `references/tests-writing.md`, "A test program" and "Where a test goes, and how it passes" (`fail` in output; compiled `.test` keys; the compiler's two-value `assert`). `references/compiler.md`, "Traps of the compiled path" (try/finally rows; row 962). `references/interpreter.md`, "Natives" (`IntegerOverflow` declared as an object in both libraries) and its departures list (rows 962, 966).

## 32. `value object Byte(b: ZZ32)` from numerals

**Decision.** I give `Byte` a coercion from the natural numeral type, generic over the numeral's numbers. It checks the range and raises outside it:

    value object Byte(b: ZZ32)
        coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) =
            if 0 <= v AND v <= 255 then Byte(v.asZZ32)
            else fail[\Byte\]("Byte numeral out of range") end
    end

- Inside the coercion, `v` is the numeral's value, read as a `ZZ` of any size, so the comparisons are exact even for a huge numeral. `v.asZZ32` runs only after the range check.
- `fail` needs `[\Byte\]` so that both branches have type `Byte`.
- The `0 <= v` test is redundant under the rules: a negative constant such as `-3` should reach `Byte` as prefix `-` on the coercion of 3, and `Byte` has no `-`, so it would be refused. Today, though, both paths pass `-3` to the coercion with its sign, as a natural numeral of value -3 (walk row 968, compiled row 961). The guard keeps `Byte(-3)` out.

`x: Byte = 255` binds the byte 255. `y: Byte = 300` is not refused statically: the checker sees only a valid coercion call. The refusal is the coercion raising `FailCalled` at run time. The coercion runs once for each place where the numeral is written, and that place reuses the value (P-176):

- **Compiled path:** the code generator runs the coercion in the component class's static initializer, so the program stops before `run()`, whether or not the line would run. A test of it sets `run_exits_nonzero=true`.
- **Walk:** the refusal comes when the coercion first runs for that place. I read this as when the binding runs. A top-level `y` fails while the top-level variables are initialised, which the harness counts as a refusal at load (`load_exception_contains`). I have not seen walk's moment stated for a program's own type. I would confirm it with a probe that prints `REACHED` before `y: Byte = 300` in `run()`.

`z: Byte = 2 + 3` does not bind with only this coercion. `2 + 3` is numerals alone, so it folds to one constant, 5, which takes its default type `ZZ32`. A program's own type takes such a constant only through a coercion from that default type, because coercions do not chain; the numeral coercion is not enough. The checker refuses it, and walk fails at the binding. Either write the folded value as a numeral, `z: Byte = 5`, or add a coercion from `ZZ32` with the same check:

        coerce(x: ZZ32) =
            if 0 <= x AND x <= 255 then Byte(x)
            else fail[\Byte\]("Byte value out of range") end

This second coercion also lets any `ZZ32` value convert into `Byte` at a typed binding, a call or an assignment. I would add it only if the program needs constant expressions at `Byte`. Otherwise `z: Byte = 5` is the smaller change.

**Path and scope.** Both paths. Before the switch-over, the compiler's prelude declares the same numeral types and coercions (P-37). The compiled departures that touch this are rows 961 and 957 (957 applies only at a generic type, which `Byte` is not). Before the switch-over I would check by compiling that `v.asZZ32` resolves there: the compiler's prelude has `asZZ32` only on `ZZ32` and `ZZ64`, and the passages do not say how the compiled path carries `v`. For the walk side, see the probe above.

**Passages.** Orientation, "Numbers", the paragraph after "A numeral converts where it stands": "A program's own number type takes a numeral through a coercion generic over its numbers, as `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) = Byte(v.asZZ32)` for `value object Byte(b: ZZ32)`… The body reads the numbers as `ZZ` values of any size (P-173, P-40). A negative constant, as `-3`, reaches it as the type's prefix `-` on the coercion's result for `3`… The coercion gives one value for each place where the numeral is written, and each run of that place reuses it (P-176)." Orientation, "An expression of numerals alone folds exactly": "A program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174). So `h: Half = 10/20` needs `coerce(q: QQ)`; a numeral coercion is not enough." `references/compiler.md`, "What the code generator does": "It runs a program's own `coerce` from a numeral once for each place where the numeral is written, in the component class's static initializer… So a coercion that raises stops the program before `run()`. A test of it sets `run_exits_nonzero=true`." `references/compiler.md`, "Traps of the compiled path" (rows 957, 961). `references/interpreter.md`, departures list (row 968). `references/library.md`, "Designing a change" (`fail[\T\]`). `references/tests-writing.md`, "Where a test goes" (a failure while the top-level variables are initialised counts as a refusal).

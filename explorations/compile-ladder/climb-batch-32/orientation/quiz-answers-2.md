<!-- Quiz reader 2's answers to regression questions 9, 16, 26 and 34, from CLAUDE.md, the fortress-repo skill's core and area parts, and the batch-32 orientation only. -->

# Quiz answers 2 (questions 9, 16, 26, 34)

"Orientation" below is `explorations/compile-ladder/climb-batch-32/orientation/orientation.md`.

## 9. Two sums written with generators

### (a) Library function `total`

Decision:

    total(n: ZZ32): RR64 = SUM[\RR64\][j <- 0#n] g(j)

and the same header in the api (`library.md`, "Designing a change": declare each top-level function in the api at the component's header). `total(0)` gives the `RR64` zero, `0.0`.

Path and scope: both. Under walk, a top-level function's return type directs the reduction, so even without the argument it would sum in `RR64`; the checker (count stage, against the interpreter's library) takes the expected type `RR64`. I still write `[\RR64\]`: it costs nothing, it is the library part's stated practice, and it makes the empty sum's type explicit. Row 716 (empty `SUM` gives the integer 0) applies only "with no declared type", and row 436 (`CastError`) only to a written argument that is not a number type, so neither applies here.

Passages:
- Orientation, "Reductions and comprehensions": "Walk instantiates a reduction at its value's declared type: a local variable's, or a top-level or local function's return type"; "Without it, the checker takes the reduction's expected type"; "with no declared type, an empty `SUM` gives the integer 0 (row 716)".
- `library.md`, "The curator's decisions on the library": "Write the element type wherever generators stand in brackets ... `SUM[\ZZ32\][j <- 0#n] f(j)`. The checker refuses a call without it (ledger row 731)."

Disagreement that I noticed: `library.md` says the checker refuses a `SUM` without the static argument (row 731); the orientation says the checker infers it from the expected type. Writing the argument is right under either, so I do not need to settle it. Before landing I would run the count stage (`compiler.md`, "The checker's time") and a cold-cache walk test asserting `total(0) = 0.0` and a non-empty value, since a new library function can stop every program at load.

### (b) Method `weight` of `object Tally(n: ZZ32)`

Decision:

    weight(): RR64 = SUM[\RR64\][j <- 0#n] count(j)

The static argument is required here, not optional.

Path and scope: a method's return type does not direct walk, so without the argument walk sums at the join of the elements' run-time types, `ZZ32`, and values near 2^30 raise `IntegerOverflow`; the checker reads the declared `RR64`, so the compiled path sums in `RR64` (row 1008). With `[\RR64\]` written, both sum in `RR64`; each `ZZ32` element converts to `RR64` (a `ZZ32` converts into `RR64` implicitly).

Limit before the switch-over: the compiler's prelude's reductions give only a `ZZ32` or a `String`, and it refuses a `ZZ32` value where an `RR64` is expected (row 442). So this method compiles only after the switch-over (or when checked against the interpreter's library). I would confirm by `fortress compile`; if the brief needs a compiled run today, the test is an `XXX` test naming the wall (`compiler.md`, "What the compiled path cannot compile yet"), not a workaround in the prelude.

Passages:
- Orientation, "Reductions and comprehensions": "A method's return type, a field, a top-level variable, a parameter and an assignment do not direct it. Else walk takes the join of the elements' run-time types"; "`meth(): RR64 = SUM[j <- 0#4] huge(j)` raises `IntegerOverflow` under walk only. Write the argument there in a program for both paths."
- `compiler.md`, "What the compiled path cannot compile yet": "Its reductions give a `ZZ32` or a `String`"; "Traps of the compiled path", row 442.

## 16. An `NN32` value 3 and its check

Decision: `n: NN32 = 3` works as written, on both paths. The check:

    three: NN32 = 3
    assert(n = three, "n is 3")

Path and scope: both paths, before and after the switch-over. A typed binding fixes the numeral's type; `NN32` has a coercion from the numeral type, and 3 is in range, so it binds exactly (the orientation's own example is `u: NN32 = 5`). Until the switch-over, the compiler's prelude's numerals follow the same design (P-37).

Why the check is written so:
- `assert(n, 3, "n")` is not safe. The two-value `assert`'s parameters fix no number type, so `3` takes its default, `ZZ32`; no coercion carries one of `NN32` and `ZZ32` into the other, so `=` falls to `SEQV`, and values of different types are never equivalent: the assertion fails although `n` is 3. On the compiled path the two-value `assert` exists only for `ZZ32`, `String` and `Character`.
- `assert(n = 3, "n is 3")`: the orientation says that on both paths `u = 0` is `true` for a zero `u: NN32`, because a numeral reaches a number type's own `=` by its coercion (P-46). But `interpreter.md` says that under walk a numeral at `=` takes its default, so `u = 0` is `false` for an `NN32` (row 973), and tells me to "bind the numeral at the type first". The two files disagree; the orientation is the newer text, but the bound form is right under either, and `assert(flag, msg)` takes any `Boolean` on the compiled path. So I keep the bound form.
- I do not convert with `n.asZZ32`: until the switch-over the prelude has `asZZ32` only on `ZZ32` and `ZZ64`.

Passages:
- Orientation, "Numbers": "So `u: NN32 = 5` binds"; "Elsewhere the numeral takes its default: `ZZ32` ... Elsewhere includes ... `Any`"; "`Number` declares nothing": "Two numbers of different types compare by `=` only where a coercion carries one into the other ... Otherwise `=` is `SEQV`"; "So on both paths `u = 0` and `0 = u` are `true` ... for a zero `u: NN32`"; integer getters until the switch-over.
- `interpreter.md`, "How walk evaluates a program", row 973: "Bind the numeral at the type first, as `z: NN32 = 0`, then write `u = z`".
- `tests-writing.md`, "A test program": the compiler's library's two-value `assert` is only for `ZZ32`, `String` and `Character`; `assert(flag, msg)` takes any `Boolean`.

## 26. Two comparisons across number types

### (a) The port

Decision, for `count: ZZ64`, `limit: RR64`:

    if asFloat(count) = limit then ... end

`count = limit` for 3 and 3.0 gives `false`, with no error: no coercion carries a `ZZ64` into `RR64`, so `=` is `SEQV`, and values of different types are never equivalent.

- `count: ZZ32`: a `ZZ32` converts into `RR64` implicitly, so the library declares `=` for that pair and `count = limit` is `true` at 3 and 3.0. The plain `count = limit` is enough; `asFloat(count) = limit` also works, so the same line may stay.
- `count: QQ`: no passage I have gives a coercion from `QQ` into `RR64`, so I take `count = limit` as `SEQV`, `false`, and write `asFloat(count) = limit`, as for `ZZ64`. I would confirm by grepping `Library/FortressLibrary.fsi` for the `coerce` declarations of `RR64` (ledger and FACTS first, `records.md`) and by running the line under walk.
- `ratio: QQ` against 0.5:

      half: QQ = 0.5
      if ratio = half then ... end

  A numeral with a radix point converts exactly into `QQ` at a typed binding (`q: QQ = 0.1` is `1/10`). The orientation says `h = 0.5` is itself `true` for `h: QQ = 1/2` on both paths; `interpreter.md` (row 973) says that under walk `q = 0.5` is `false` and tells me to bind the numeral at the type first. The bound form is right under either reading, so I write it.

Path and scope: walk, as the question asks. On the compiled path before the switch-over the compiler's library has no `QQ`, so the `QQ` lines do not compile there.

Passages:
- Orientation, "Numbers", "`Number` declares nothing (P-165)": "Otherwise `=` is `SEQV` ... and answers `false` without an error, as for a `ZZ64` against an equal `RR64`"; "To compare values across types at known types, write `asFloat(x) = y`"; "`h = 0.5` is `true` for `h: QQ = 1/2`"; "A numeral converts where it stands": "`q: QQ = 0.1` is `1/10`"; "`/` on two integers": "No coercion carries a `ZZ64` into `RR64`".
- `library.md`, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`."
- `interpreter.md`, "How walk evaluates a program", row 973.

### (b) `near` in the interpreter's library

Decision: no generic `near[\T extends Number\]`. `Number` declares nothing, so a body over `T extends Number` can call neither `asFloat` nor any operator on `a`; the checker refuses it at the count stage, though walk would run it. Declare the function once for each of the eight number types, in `Library/FortressLibrary.fss` and at the same headers in `FortressLibrary.fsi`:

    near(a: ZZ32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: ZZ64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: NN32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: NN64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: ZZ,   b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: QQ,   b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: RR32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: RR64, b: RR64): Boolean = |a - b| <= 1.0E-9

Path and scope: the interpreter's library, so walk and the count stage; the compiled path reaches it after the switch-over. The number types are flat siblings, so the eight are overloads that the rules must order by exclusion. Before landing: study how the library writes such a family and follow it (`library.md`, "Designing a change"); write the walk test first (`tests/`, values each side of the tolerance, each type, with variable operands so nothing folds); run it with a cold cache (`COLD_CACHE=1` with `harness-one.sh`), because a new overload can make walk refuse every program at load; run the count stage in the background and check that the total stays 0. A numeral argument, as `near(3, x)`, fits the `ZZ32` declaration at its default.

Passages:
- Orientation, "Numbers": "`Number` declares nothing (P-165). Each of the eight number types declares its own functional method `asFloat(self): RR64`. So generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, `asFloat` among them"; "In generic code over `T extends Number`, declare your function once for each number type instead."
- `library.md`, "Designing a change" (api headers; a new overload can stop every program at load); `interpreter.md`, "What walk checks" (cold cache, row 342); `compiler.md`, "The checker's time".

## 34. Four pairs of overloads and numerals

Answers:

| call | walk | compiled path | by the rule |
|---|---|---|---|
| `k(5)` | "nn32" | "nn32" | "nn32" |
| `width(1.5)` | "rr64" | "rr64" | "rr64" |
| `g(5)` | "generic" | "generic" | "nn32" (departure, row 1017, both paths) |
| `same(u, 0)` | "nn32" | "nn32" | "nn32" |
| `same(a, 0)` | "nn32" | "any" | "any" (walk departs, row 1016) |

Reasons:
- `k(5)`: the numeral fits `k(x: Any)` at its default, and leaves it only for a declaration that its coercion reaches and whose parameter types are strict subtypes: `NN32` is strictly below `Any`. The orientation's own example.
- `width(1.5)`: the default with a radix point is `RR64`, which fits `width(x: RR64)`. `RR32` is a sibling, not a strict subtype, so the numeral does not leave. The orientation's own example with `f`.
- `g(5)`: the rule would send it to `g(x: NN32)`, as in `k`, but on both paths it runs the generic one: a known departure, row 1017.
- `same(u, 0)`: `u` is an `NN32`; the numeral leaves `same(Any, Any)` for `same(NN32, NN32)`, whose parameter types are strict subtypes and which its coercion reaches.
- `same(a, 0)`: `a` is typed `Any`. By the rule the checker chooses the numeral's coercion statically; with `a: Any`, `same(NN32, NN32)` does not apply statically, so the numeral stays at its default, a `ZZ32`, and at run time (`NN32`, `ZZ32`) fits only `same(Any, Any)`: "any" on the compiled path. Under walk, a numeral beside a value typed `Any` converts by the value's run-time type, `NN32`, so it runs "nn32": a known departure, row 1016.

Scope: the compiled column assumes the program compiles before the switch-over (the prelude's numerals follow the same design, P-37); I would confirm each value by a run on both paths before I assert any, since reproducing comes before explaining.

So that the program does not depend on the departures: bind each numeral at its type, and pass the variable.

    five: NN32 = 5
    g(five)            (* "nn32" on both paths: an NN32 value, the more specific declaration *)
    z: NN32 = 0
    same(a, z)         (* "nn32" on both paths: dispatch on the run-time types *)

or, if the "any" answer is wanted, `d: ZZ32 = 0` and `same(a, d)`. In a test, I assert `g(5)` and `same(a, 0)` in no plain test: a sentence that cites a ledger row states a behaviour that is not settled. The rule's answer goes in an `XXX` test if the brief wants the departure recorded (`tests-writing.md`, "How a defect is recorded").

Passages:
- Orientation, "Numbers": "**Only a numeral's own coercion changes which declaration runs (P-46).** ... So `k(5)` runs `k(x: NN32)` beside `k(x: Any)`, but `f(1.5)` runs `f(x: RR64)` beside `f(x: RR32)`. Two departures: under walk, a numeral beside a value typed `Any` converts by the value's run-time type, not to its default (row 1016); on both paths, `g(5)` runs `g[\T\](x: T)` beside `g(x: NN32)` (row 1017)."
- Orientation, preamble: "A sentence that cites a ledger row states a behaviour that is not settled ... do not assert it as correct in a plain test".
- `SKILL.md`, "Fortress as a language": dispatch is on every argument at run time; "A conversion never changes which declaration runs when one already fits."

# Quiz answers, reader 1 (cases 9, 16, 26, 34)

Files read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its parts `library.md`, `tests-writing.md`, `compiler.md`, `interpreter.md`, the orientation, `questions.md`. Nothing was run.

## 9. Two sums written with generators

### (a) `total` in the interpreter's library

Decision:

    total(n: ZZ32): RR64 = SUM[\RR64\][j <- 0#n] g(j)

with the same header declared in `Library/FortressLibrary.fsi`. I write the static argument although the function's declared return type would direct both paths without it. `total(0)` gives the `RR64` zero, `0.0`: the reduction is instantiated at `RR64` (a number type), so the empty sum is not the integer 0 of row 716 and not the `CastError` of row 436.

Path and scope: both; under walk and in the count stage (the checker against the interpreter's library). Without the argument, walk would still sum at `RR64` here, because a top-level function's return type directs it, and the orientation says the checker takes the expected type; but `library.md` says the checker refuses a clause-form call without the argument (row 731). The two texts differ on the checker; writing the argument is right under both, so I do not need to settle it. If it mattered I would print row 731 with the record's queries (`records.md`) to see whether it is still open.

Passages: orientation, "Reductions and comprehensions", first rule ("Walk instantiates a reduction at its value's declared type: a local variable's, or a top-level or local function's return type"; "with no declared type, an empty `SUM` gives the integer 0 (row 716)"); `library.md`, "The curator's decisions on the library" ("Write the element type wherever generators stand in brackets, also where the generators, the body or a declared type fix it").

### (b) `weight()` in `object Tally(n: ZZ32)`

Decision:

    weight(): RR64 = SUM[\RR64\][j <- 0#n] count(j)

A method's return type does not direct walk, so without the argument walk sums at the join of the elements' run-time types, `ZZ32`, and values up to 2^30 raise `IntegerOverflow` under walk only, while the checker sums in `RR64` (row 1008). The written argument makes both paths sum in `RR64`; each `ZZ32` element converts to the instance (`ZZ32` converts into `RR64` implicitly).

Path and scope: walk today, and the compiled path from the switch-over. Before the switch-over the compiler's prelude's reductions give only a `ZZ32` or a `String`, and it refuses a `ZZ32` value where an `RR64` is expected (row 442, write `i.asRR64`), so this method does not compile today whatever I write with `SUM`; a compiled test of it today would be an `XXX` test naming that limit, and I would not add anything to the prelude. Because row 1008 is an unsettled departure, I assert neither path's unwritten-argument answer in a plain test.

Passages: orientation, "Reductions and comprehensions" ("A method's return type, a field, a top-level variable, a parameter and an assignment do not direct it"; "`meth(): RR64 = SUM[j <- 0#4] huge(j)` raises `IntegerOverflow` under walk only. Write the argument there in a program for both paths"); `compiler.md`, "What the compiled path cannot compile yet" (prelude reductions) and "Traps of the compiled path" (row 442); `library.md`, decisions (`ZZ32` converts into `RR64` implicitly).

## 16. `n: NN32 = 3`

Decision: keep `n: NN32 = 3`. It binds on both paths: a typed binding fixes the type, `NN32` has a coercion from the numeral type, and 3 converts exactly; the compiler's prelude follows the same numeral design until the switch-over (P-37).

The check:

    assert(n = 3, "n is 3")

The numeral reaches `NN32`'s own `=` by its coercion, so `n = 3` is `true` on both paths. I do not write `assert(n, 3, "n")`: there the 3 stands at a place that fixes no type and takes its default, `ZZ32`; under walk the two-value `assert` compares an `NN32` with a `ZZ32` (by `SEQV` unless the type extends an `=`-declaring trait, and values of different types are never equivalent), and the compiler's library declares the two-value `assert` only for `ZZ32`, `String` and `Character`.

One thing I would look up first: `interpreter.md`, "How walk evaluates a program", still lists as a walk departure that a numeral at `=` takes its default, so `u = 0` is `false` for an `NN32` (rows 973, 966), which contradicts the orientation's "on both paths". I would print rows 973 and 966 from the gap ledger (`records.md` queries). If they are still open, I write the form that is right under either reading:

    three: NN32 = 3
    assert(n = three, "n is 3")

Path and scope: both paths, before and after the switch-over.

Passages: orientation, "Numbers", "A numeral converts where it stands (P-173)" ("So `u: NN32 = 5` binds"; "Until the switch-over, the compiler's prelude follows the same design (P-37)") and "`Number` declares nothing (P-165)" ("on both paths `u = 0` and `0 = u` are `true` ... for a zero `u: NN32`"); `tests-writing.md`, "A test program" (the two-value `assert`); `interpreter.md` (row 973, "Bind the numeral at the type first").

## 26. Comparisons across number types

### (a) The port

Decision:

    if asFloat(count) = limit then ... end

`count = limit` for a `ZZ64` 3 and an `RR64` 3.0 gives `false`, without an error: no coercion carries a `ZZ64` into `RR64`, so the library declares no `=` for the pair and `=` falls back to `SEQV`, under which values of different types are never equivalent.

- `count: ZZ32`: a coercion carries `ZZ32` into `RR64`, so the library declares `=` for that pair and `count = limit` itself is `true` at 3 and 3.0. `asFloat(count) = limit` also holds, so the same line can stay, but it is not needed.
- `count: QQ`: the texts I read state no coercion from `QQ` into `RR64`, so I keep `asFloat(count) = limit` (each of the eight number types declares `asFloat(self): RR64`). So the one condition `asFloat(count) = limit` serves all three types.
- `ratio == 0.5`, `ratio: QQ`: `if ratio = 0.5 then`. The numeral reaches `QQ`'s own `=` by its coercion and converts exactly to `1/2`. Same caveat as in 16: `interpreter.md` lists `q = 0.5` as `false` under walk for `q: QQ = 1/2` (row 973). I would print that row; if still open I write `half: QQ = 0.5` and then `ratio = half`.

Path and scope: walk (the program's path). On the compiled path before the switch-over the prelude has no `QQ`, so the `QQ` lines do not compile there.

Passages: orientation, "`Number` declares nothing (P-165)" ("Two numbers of different types compare by `=` only where a coercion carries one into the other ... Otherwise `=` is `SEQV` ... and answers `false` without an error, as for a `ZZ64` against an equal `RR64`"; "To compare values across types at known types, write `asFloat(x) = y`"; "A numeral reaches a number type's own `=` by its coercion"); "`/` on two integers" ("No coercion carries a `ZZ64` into `RR64`"; no `QQ` in the compiler's library); `library.md`, decisions.

### (b) `near` in the interpreter's library

Decision: not the generic. `Number` declares nothing, so on a `T extends Number` the body can call no `asFloat` and no operator; the checker (count stage) would refuse it, though walk would run it. Declare the function once for each of the eight number types, in `FortressLibrary.fss`, with the same eight headers in `FortressLibrary.fsi`:

    near(a: ZZ32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: ZZ64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: NN32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: NN64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: ZZ,   b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: QQ,   b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: RR32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: RR64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9

Steps: first study how the library writes such a family and its absolute value (`library.md`, "Designing a change"); write the walk test in `ProjectFortress/tests/` first and see it fail; then the edit; run the test with `COLD_CACHE=1` through `harness-one.sh`, because a new overload can make walk refuse every program at load; run the count stage and see the total stay 0.

Path and scope: both readings of the interpreter's library, walk and the checker's count stage.

Passages: orientation, "`Number` declares nothing (P-165)" ("generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, `asFloat` among them"; "In generic code over `T extends Number`, declare your function once for each number type instead"); `library.md`, "Designing a change" (api headers, new overloads); `interpreter.md`, "What walk checks" (cold cache, row 342).

## 34. Four pairs of overloads

| call | walk | compiled path | by the rule |
|---|---|---|---|
| `k(5)` | `"nn32"` | `"nn32"` | `"nn32"` |
| `width(1.5)` | `"rr64"` | `"rr64"` | `"rr64"` |
| `g(5)` | `"generic"` | `"generic"` | `"nn32"`: departure, row 1017, both paths |
| `same(u, 0)` | `"nn32"` | `"nn32"` | `"nn32"` |
| `same(a, 0)` | `"nn32"` | `"any"` | `"any"`: walk departs, row 1016 |

Reasons:

- `k(5)`: the numeral fits `k(x: Any)` at its default; its coercion reaches `k(x: NN32)`, whose parameter type is a strict subtype of `Any`, so it leaves for it.
- `width(1.5)`: the default `RR64` fits `width(x: RR64)`; `RR32` is a sibling, not a strict subtype, so the numeral stays.
- `g(5)`: by the rule the numeral would leave `g[\T\](x: T)` for `g(x: NN32)`, as in `k`; on both paths it runs the generic (row 1017).
- `same(u, 0)`: `u` is an `NN32`; the numeral fits `same(Any, Any)` at its default, and its coercion reaches `same(NN32, NN32)`, whose parameter types are strict subtypes.
- `same(a, 0)`: `a` is typed `Any`; by the rule the numeral converts to its default, `ZZ32`, and only `same(Any, Any)` fits. Under walk the numeral converts by `a`'s run-time type, `NN32`, so `same(NN32, NN32)` runs (row 1016).

So `g(5)` and walk's `same(a, 0)` are known departures; both cite ledger rows, so I assert neither in a plain test. To not depend on them, give the numeral its type in a binding, so that no numeral's coercion chooses the declaration and ordinary run-time dispatch does:

    five: NN32 = 5
    g(five)            (* "nn32" on both paths *)
    z: NN32 = 0
    same(a, z)         (* "nn32" on both paths: dispatch on the run-time types *)
    zi: ZZ32 = 0
    same(a, zi)        (* "any" on both paths *)

Path and scope: both paths, before and after the switch-over, as the table shows (the prelude follows the same numeral design, P-37).

Passages: orientation, "Numbers", "Only a numeral's own coercion changes which declaration runs (P-46)" with its two departures (rows 1016, 1017); "A numeral converts where it stands (P-173)" (defaults at `Any` and an unbounded type parameter); the orientation's opening ("A sentence that cites a ledger row states a behaviour that is not settled ... do not assert it as correct in a plain test"); `SKILL.md`, "Fortress as a language" ("Dispatch is on every argument, at run time").

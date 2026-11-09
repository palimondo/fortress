<!-- Quiz reader's answers to cases 5, 16, 22, 26, 28, 29 and 31 of the regression quiz, from CLAUDE.md, the fortress-repo skill's core and area parts, and climb-batch-29's orientation. -->

# Quiz answers, reader 2

Sources read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, the area parts under `references/` (all but `revival-changes.md` and `sources.md`), and `explorations/compile-ladder/climb-batch-29/orientation/orientation.md` (below, "orientation"). Line numbers are those of the files as I read them. I ran no command and opened no other file, so where an answer depends on a fact that I could not read, I say what I would look up.

## 5

**Decision.**

    seconds: RR64 = asFloat(elapsed) / 1000000000.0

`1000000000.0` is Java's `1e9` written out, because I do not rely on an exponent spelling of numerals. Two other ways to write it are wrong:

- `elapsed / 1000000000` uses `/` on two integers, which answers a `QQ`, not a float.
- `elapsed / 1000000000.0` without `asFloat` finds no `/`, because no coercion carries a `ZZ64` into `RR64`.

If `elapsed` were a `ZZ32`, the same line would still work, because every number type declares its own `asFloat`. There the `asFloat` is not needed: a `ZZ32` converts into `RR64` implicitly, so `seconds: RR64 = elapsed / 1000000000.0` gives the same float, following the orientation's `(1.0 s) / n` pattern for `ZZ32` operands. I would keep the `asFloat` form for both types, so that the line does not change if the counter's type does.

**Path and scope.** This holds under walk on the interpreter's library, as the question asks, and on both paths after the switch-over. Before the switch-over, the compiler's library declares `/` only at `RR64`. I did not read whether its prelude has `asFloat` on `ZZ64`, so I would check that before using the line in a compiled test.

**Passages.**

- Orientation, "Numbers", line 103: "`/` on two integers answers a `QQ`", "For a float, make one operand a float, as `(1.0 s) / n` for `ZZ32` values", and "No coercion carries a `ZZ64` into `RR64`, so convert each `ZZ64` operand with `asFloat`".
- Orientation, line 99: "Each of the eight number types ... declares its own `asFloat` into `RR64`."
- `references/library.md`, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`."

## 16

**Decision.** By the rule, `n: NN32 = 3` binds on both paths, so I write `n: NN32 = 3`. A numeral converts where it stands, and a typed binding is such a place for every number type. The numeral converts exactly into the integer types.

The skill's area part says the opposite for walk. `references/tests-writing.md`, "A test program", line 34, reads: "Under walk, a numeral does not bind to `NN32` or `NN64` ... (ledger row 454). Write `a: NN32 = unsigned(5)`". The orientation lists walk's departures from this rule as rows 958, 960, 966, 967 and 968. Row 454 is not among them, and the orientation gives `u: NN32 = 5 binds` as its own example. So I read the line in `tests-writing.md` as older than P-173.

Before I write the test, I would print the row with `explorations/coordinator/tools/facts-extract.sh 'ledger:454'`. I would also print rows 958, 960, 966 and 968 (walk) and 957, 961, 963, 964 and 965 (compiled), to see whether any of them concerns a numeral at `NN32`.

- **If row 454 is closed:** I write `n: NN32 = 3` on both paths. I report `tests-writing.md:34` as stale, for the skill's upkeep.
- **If row 454 is still open:** under walk, I write `n: NN32 = unsigned(3)`. `unsigned` of the `ZZ32` default gives the `NN32` of the same width. My test only needs the value. The binding's own failure would be a departure, asserted only in an `XXX` test.

**Path and scope.** P-173 states the rule for both paths. Compiled, before the switch-over, the numeral is an `IntLiteral`, and the checker refuses a numeral outside the type's range statically. After the switch-over, both paths use one library.

**Passages.**

- Orientation, "Numbers", line 89: "A place fixes a type when its declared type ... has a coercion from the numeral type, as each of the eight number types has. Such places are a typed binding ... exactly into the five integer types ... So `u: NN32 = 5` binds".
- Orientation, line 91, for the departure rows.
- Orientation, line 97, for `unsigned`.
- Orientation, line 7: a sentence that cites a ledger row states a departure.
- `references/tests-writing.md`, line 34, the conflicting line.

## 22

### (a)

**Decision.** I copy the header of `exp` in `FlatArrays2.fsi`, change only its name, and bound the index parameter by `Index`:

    tanh[\T extends Number, I extends Index\](a: Array[\T, I\]): Array[\T, I\]

I take the element-type parameter and the result's element type exactly as the headers of `exp` and `log` give them. I could not open the file, so the line above shows the shape. The part that the rules fix is `I extends Index`. It covers every rank, because a tuple whose elements are all `Index` types is an `Index`. I give `FlatArrays2.fss` the same header.

Walk runs the code without the bound too, so `MicroGptAplQuick.fss` passing under walk says nothing about the bound.

`FlatArrays2` belongs to the APL model program, so I put the added lines in my report as a diff.

There is one more risk. If the body over `T extends Number` calls `asFloat`, or any arithmetic, on a `T`, the checker will refuse it once it reads the file. `Number` declares nothing (P-165). Walk runs such a body, because it dispatches at run time. If `exp` and `log` are written that way, I report it rather than change them.

**Does the compiled path accept it, and when does it first read it?** Today it does not accept it. Until the switch-over, the compiler's prelude declares no `Index`, so a component that names it does not compile.

Today the compiled path reads the file only in the gate's ladder regression. That step compiles the eighteen components of the two microGPT programs, never runs them, and compares the phase that each reaches with `baseline-2026-09-19/microgpt-phase.md`. If `exp` and `log` already name `Index`, `FlatArrays2` already stops at that phase, and `tanh` does not move it. A DOWN mark would make the gate red. I would read `FlatArrays2`'s phase in that baseline file to confirm.

The checker first checks the declaration against the interpreter's library after the switch-over. From then on the bound is required: without it, the checker refuses the declaration (P-156).

### (b)

**Decision.** The pair is not a valid overloading.

1. `Cell` neither lies below `Index` nor excludes it, so a type can extend both.
2. A pair of values of such a type is both a `(Cell, Cell)` and, as a tuple of `Index` types, an `Index`.
3. So the two domains overlap, neither lies inside the other, and no declaration covers their meet. The Meet Rule refuses the pair.

- **Walk:** it loads the pair. This is a known departure (row 806).
- **Checker:** it refuses the pair by the Meet Rule once it checks against the interpreter's library. Before the switch-over, the compiled path does not compile the program at all, because its prelude has no `Index`.

**The change.** I declare `trait Cell excludes { Index } end`. Then no element of a `(Cell, Cell)` is an `Index`, so no such pair is an `Index`, and the two domains exclude each other. The other fix is to give the pair function another name. I would not assert walk's acceptance of the pair as correct in a test.

**Passages.**

- Orientation, "Traits and objects", the P-156 paragraph at line 48: "A function over `Index` and one over a tuple of `Index` types do not exclude each other", "a tuple whose element types are all `Index` types is an `Index`", and "Until the switch-over, the compiler's prelude declares no `Index`, so a program that names it does not compile".
- Orientation, line 51: "walk loads a function over `Index` beside one over a pair whose element types neither lie below `Index` nor exclude it (row 806)".
- `references/interpreter.md`, "What walk checks", line 64: "... which the Meet Rule refuses (ledger row 806)".
- `references/gate.md`, "The ladder regression", line 70.
- Orientation, line 99 (P-165).
- `references/interpreter.md`, "The model program": "If you change a line of the model, put the change in your report as a diff."

## 26

### (a)

**Decision.**

    if asFloat(count) = limit then ... end

For a `count` of 3 and a `limit` of 3.0, `count = limit` gives `false`, with no error:

1. No coercion carries a `ZZ64` into `RR64`, so the library declares no `=` for that pair.
2. `=` therefore falls back to `SEQV`.
3. Values of different types are never equivalent.

`asFloat` does what Java's `==` does here: it widens the `long` to a `double` before comparing.

- **`count: ZZ32`:** the same condition works. Bare `count = limit` would also give `true` here, because a `ZZ32` converts into `RR64` and the library declares `=` for each such pair.
- **`count: QQ`:** the same condition works, because `QQ` declares its own `asFloat`, with one rounding. The orientation names no coercion between `QQ` and `RR64`, so I expect bare `=` to fall back to `SEQV` and give `false`. I keep the `asFloat`. If I wanted the bare `=`, I would first look in `Library/FortressLibrary.fsi` for a coercion from `QQ` in `RR64`.

**Path and scope.** This is walk. The rule (P-165, P-168) is the same on both paths. Before the switch-over, the compiler's library declares no `=` over `Any`, so a compiled bare `count = limit` would be a static error rather than `false`. The `asFloat` form then needs that prelude's `asFloat` on `ZZ64`, which I would check.

### (b)

**Decision.** I write one declaration for each of the eight number types, not the generic. The headers go in `Library/FortressLibrary.fsi`, and the same headers, with these bodies, in `Library/FortressLibrary.fss`:

    near(a: ZZ32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: ZZ64, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: NN32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: NN64, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: ZZ,   b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: QQ,   b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: RR32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: RR64, b: RR64): Boolean = |a - b| <= 0.000000001

`0.000000001` is the question's `1.0E-9`.

- **Why not the generic:** a `near[\T extends Number\]` body can call no `asFloat` on a `T`. Walk would run it, because it dispatches at run time, but the count stage would refuse it.
- **No numeral types:** I declare nothing at `NaturalNumeral` or `RadixPointNumeral`, which may stand only as the parameter type of a coercion or an operator.
- **A numeral argument:** for a call such as `near(3, 3.0)`, the tied declarations differ only at the numeral's position, so the numeral takes its default, `ZZ32`.

**Steps.**

1. Write a walk test first, in `ProjectFortress/tests/`, that calls `near` at each of the eight types. See it fail through `harness-one.sh`, because `near` is not yet declared.
2. Add the declarations and see the test pass. Run with `COLD_CACHE=1`, because walk checks a new overload of the library only when it analyses the library (row 342). An overload that walk refuses would stop every program.
3. Run the count stage in the background, and compare its table with the base's.

**Passages.**

- Orientation, "Numbers", line 99: "`Number` declares nothing (P-165) ... generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, `asFloat` among them. Two numbers of different types compare by `=` only where a coercion carries one into the other ... Otherwise `=` is `SEQV` ... and answers `false` without an error, as for a `ZZ64` against an equal `RR64`. To compare values across types at known types, write `asFloat(x) = y`. In generic code over `T extends Number`, declare your function once for each number type instead."
- Orientation, line 62: "Until the switch-over, the compiler's library declares no `=` over `Any`".
- Orientation, line 91: a numeral type only as the parameter type of a coercion or an operator.
- Orientation, line 95: ties at the numerals' positions.
- `references/library.md`, "Designing a change": the api's header equals the component's.
- `references/interpreter.md`, "What walk checks": a library edit that adds an overload can stop every program; row 342.

## 28

**Decision.** The first assertion passes under walk, and the other two fail.

**`"point"` passes.** `Point` has no `=` of its own, so `assert` compares by `SEQV`. `SEQV` compares a value object field by field, and integers by value.

**`"run"` fails, and it shows no defect.** `s` is computed at run time: `t` is typed, so `t || "c"` does not fold. `s` is therefore a different string object from the literal `"abc"`. A string is a reference object, which is `SEQV` only to itself. So `Run(s, 3)` is not `SEQV` `Run("abc", 3)`, which is the rule (P-168). The check I would keep:

    r = Run(s, 3)
    assert(r.name = "abc", "run name")
    assert(r.steps, 3, "run steps")

A string's `=` compares text. The other way is to give `Run` its own `=` and make it extend `Equality[\Run\]`.

**`"four"` fails, and it shows no new defect.** The interpreter's library declares `=` on pairs and triples only. A four-tuple falls back to `SEQV`, element by element, and `s` against `"abc"` is `false`. That is the rules' answer today. Row 923 holds the open question of longer tuples, so I would not assert either answer for a four-tuple's `=` in a test. I would print row 923 to read its status. The check I would keep compares the parts:

    assert(s = "abc", "four: s")

The three numerals equal themselves, so they need no check.

Under walk, each evaluation of a string literal also makes a new object (row 945). So even `Run("abc", 3)` against `Run("abc", 3)` would fail under walk today. No check should rest on the identity of literals.

**Path and scope.** This is walk with the interpreter's library. The `SEQV` rules are the same on both paths.

**Passages.**

- Orientation, "Traits and objects", lines 55–62: "a reference object, a string among them, is equivalent only to itself", "for a value object `V` without its own `=`, `V(s) = V(t)` is `false` where `s` and `t` are equal strings made by two computations", "The interpreter's library declares `=` on pairs and triples only, so `(s, 1, 2, 3) = (t, 1, 2, 3)` falls back to `SEQV` and is `false`; row 923 holds the question of longer tuples. To compare by content, give the value object an `=`, or compare the parts."
- Orientation, line 93: a typed operand avoids the fold.
- `references/tests-writing.md`, "A test program", line 32: `assert` calls a type's own `=` only through a library trait such as `Equality`, and otherwise compares by `SEQV`.
- `references/interpreter.md`, line 22 (row 945).

## 29

**Before I change walk.** I search the record with `$T 'ledger-find:Cell Int'` and print row 364 with `$T 'ledger:364'`. I list the `XXX` tests with `git ls-files 'ProjectFortress/*XXX*'`. If the row's reproducer names an `XXX` test, I promote it, renaming it without the prefix (`tests-writing.md`, "Promoting an `XXX` test"), instead of writing a new test.

**How I check the instance today.** Printing does not show it, so I check by dispatch.

- Walk instantiates a generic built from a number value at the value's run-time class. For a `ZZ32` value, that is `Int`, the library's object that extends `ZZ32`. So `Cell(z)` is a `Cell[\Int\]`.
- Walk prints that class as `ZZ32`, also in a static argument. So `Cell(z).asString` reads as a `Cell[\ZZ32\]` today and hides the defect. I would see its exact text with a direct run, `bin/fortress` on a probe outside the tree's tests.
- An overload declared on `Cell[\ZZ32\]` does not take the value. With only that overload declared, walk's dispatch error names the instance with `Int`.

The test, `ProjectFortress/tests/CellInstanceZZ32.fss`, has a plain name:

    component CellInstanceZZ32
    export Executable

    (* Cell(z) for z: ZZ32 instantiates Cell[\ZZ32\]. *)
    object Cell[\T extends Any\](v: T) end

    which(c: Cell[\ZZ32\]): String = "ZZ32"
    which(c: Any): String = "other"

    run(): () = do
        z: ZZ32 = 3
        assert(which(Cell(z)), "ZZ32", "Cell(z) instance")
    end

    end

The assertion fails on today's tree: `which(Cell(z))` gives `"other"`. I see it fail through `harness-one.sh` on the base, make the fix, and see it pass. Then I close row 364 by the fix's commit.

**Path and scope.** This is walk only. Walk infers static arguments from run-time types, while the checker infers them statically.

**Passages.**

- `references/interpreter.md`, "How walk evaluates a program", line 23: "a generic built from a number value instantiates at that class. So `Cell(3)` is a `Cell[\Int\]`, not a `Cell[\ZZ32\]`, and an overload declared on `Cell[\ZZ32\]` does not take it. Walk prints the class as `ZZ32`, `ZZ64` or `ZZ`, also in a static argument, but its error messages say `Int` (ledger row 364)."
- `references/interpreter.md`, line 14 (inference) and line 110 (`Int` is the library's object that extends `ZZ32`).
- `references/tests-writing.md`, "The order" and "Promoting an `XXX` test".
- `SKILL.md`, "Rules for every task": look for the ledger rows before investigating.

## 31

### (a)

**Decision.** The binding does not run. `nSamples = 3000000000` is an untyped binding, so the numeral takes its default: `ZZ64`, because the value does not fit a `ZZ32`. The default stays the value's type. `scale: RR64 = nSamples` would need a coercion from `ZZ64` into `RR64`, and there is none. Walk stops at the binding at run time, and the checker would refuse it statically. I write:

    nSamples: ZZ64 = 3000000000        (* or untyped, as before: it is a ZZ64 either way *)
    ...
    scale: RR64 = asFloat(nSamples)

### (b)

**Decision.**

    overflowsAtMax(): Boolean = do
        m: ZZ32 = 2147483647
        try
            r: ZZ32 = m + 1
            false
        catch e
            IntegerOverflow => true
        end
    end

    (* in run(): *)
    assert(overflowsAtMax(), "ZZ32 + raises IntegerOverflow at the maximum")

I do not write `2147483647 + 1`. It folds exactly before the checker into the `ZZ64` 2147483648, so nothing overflows.

### (c)

**Decision.**

    x: RR64 = 0.1
    y: RR64 = 0.2
    assert(NOT (x + y = 0.3), "RR64 + rounds: 0.1 + 0.2 is not 0.3")

I do not write `0.1 + 0.2 = 0.3`. It folds exactly and is `true`.

- I use the Boolean form `assert(flag, msg)`, with `RR64`'s own `=`, rather than the two-value `assert`. Under walk, an `RR64` variable bound to a numeral stays a `FloatLiteral`, which `SEQV` finds unequal to a computed `RR64` of the same bits (row 943). A comparison by `SEQV` could then report "unequal" for the wrong reason.
- To show the rounded value itself, I could add `assert(x + y = 0.30000000000000004, "sum rounds to the nearest double")`. That is the rules' answer. If walk gives anything else, the difference is a departure for an `XXX` test.

### Do (b) and (c) test the same thing on the compiled path?

Yes. Both folds happen on both paths (P-173), and the typed operands move the arithmetic to run time on both, so each test exercises run-time `ZZ32` `+` and `RR64` `+`.

On the compiled path, before the switch-over, the form differs:

- The test goes in `compiler_tests/`, with a `.test` file that has `link` and `run`, and `run()` ends with `println("PASS")`.
- The compiler's library has the two-value `assert` only at `ZZ32`, `String` and `Character`, so the Boolean form above is the one to use there too.
- Row 943 is walk's, so it does not apply compiled.
- `IntegerOverflow` is declared by both libraries.

I would check the compiled departure rows 957, 961, 963, 964 and 965, and `ledger-find:IntegerOverflow`, before I rely on the compiled run.

For (a), the checker refuses `scale: RR64 = nSamples` statically, and the `asFloat` fix needs the compiler's prelude to have `asFloat` on `ZZ64`.

**Passages.**

- Orientation, "Numbers", line 89: "Elsewhere the numeral takes its default: `ZZ32`, or `ZZ64` or `ZZ` where its value does not fit ... Elsewhere includes an untyped binding ... So `n = 3000000000` is a `ZZ64` ... The default stays the value's type".
- Orientation, line 93: "An expression of numerals alone folds exactly before the checker, on both paths (P-173) ... So `2147483647 + 1` is the `ZZ64` 2147483648, not an `IntegerOverflow`, `(0.1 + 0.2 = 0.3)` is `true` ... A test of run-time arithmetic or concatenation needs a typed operand: write `m: ZZ32 = 2147483647`, then `m + 1`".
- Orientation, line 103: "No coercion carries a `ZZ64` into `RR64`".
- `references/library.md`, "The curator's decisions on the library" (`ZZ64` into `RR64` only by `asFloat`).
- `references/interpreter.md`, line 20 (row 943).
- `references/tests-writing.md`, "A test program", line 32 (the compiler's two-value `assert`) and "Where a test goes, and how it passes".
- `SKILL.md`, "Fortress as a language": "Overflow raises `IntegerOverflow`".

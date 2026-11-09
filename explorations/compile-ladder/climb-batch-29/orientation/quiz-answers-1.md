# Quiz answers, reader 1 (cases 5, 16, 22, 26, 28, 29, 31)

Sources read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; its area parts under `references/` (all but `revival-changes.md` and `sources.md`); the orientation `explorations/compile-ladder/climb-batch-29/orientation/orientation.md` (cited below as "orientation", by section). No other file was opened and nothing was run.

## 5. Porting `double seconds = elapsed / 1e9;`

**Decision.** With `elapsed: ZZ64`:

    seconds: RR64 = asFloat(elapsed) / 1000000000.0

- `asFloat` is needed: a `ZZ64` goes into `RR64` only explicitly, by `asFloat`. Without it, `elapsed / 1000000000.0` finds no `/` that fits, and `elapsed / 1000000000` (two integers) gives a `QQ`, not a float.
- I write the divisor as the radix-point numeral `1000000000.0`. A numeral with a radix point defaults to `RR64`, or converts with one rounding where `RR64` is declared. I do not know from the skill whether the parser takes an exponent form like `1e9`, so I avoid it. `10.0^9` would also work: an expression of numerals alone folds exactly into one numeral.

If `elapsed` were a `ZZ32`, the line need not be the same. A `ZZ32` converts into `RR64` implicitly, so `seconds: RR64 = elapsed / 1000000000.0` works, as in the orientation's `(1.0 s) / n`. The `asFloat` line still works for a `ZZ32`, because every number type declares its own `asFloat`. So keeping `asFloat` gives one line for both types. Only `ZZ64` needs it.

**Path and scope.** Walk. Until the switch-over, the compiler's library declares `/` only at `RR64` and has no `QQ`, so on the compiled path an integer `/` is a static error, not a `QQ`.

**Passages.** Orientation, "Numbers": "`/` on two integers answers a `QQ`" ("For a float, make one operand a float, as `(1.0 s) / n` ... Convert each `ZZ64` operand with `asFloat`"), and "`Number` declares nothing (P-165)" (each number type declares its own `asFloat`). `references/library.md`, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`." Orientation, "A numeral converts where it stands (P-173)", and the fold rule (P-173).

## 16. `n: NN32 = 3`

**Decision.** By the rule, the binding works on both paths: a typed binding is a place that fixes a type, `NN32` has a coercion from the numeral type, and 3 converts exactly. The orientation gives this very example: "So `u: NN32 = 5` binds". `interpreter.md`'s list of walk's departures from the literal rules (rows 943, 944, 945, 364) does not name it. So I write `n: NN32 = 3`.

The skill disagrees with itself here. `references/tests-writing.md`, "A test program", still says: "Under walk, a numeral does not bind to `NN32` or `NN64` ... (ledger row 454). Write `a: NN32 = unsigned(5)`". Before I rely on either text:

1. `explorations/coordinator/tools/facts-extract.sh 'ledger:454'`, to see whether row 454 is closed.
2. Run my test through `harness-one.sh` (reproduce before explaining).

If row 454 is closed and the harness passes, I keep `n: NN32 = 3` and report the stale line in `tests-writing.md`. If walk still refuses the binding, my test does not depend on the binding, so I write `n: NN32 = unsigned(3)`, as `tests-writing.md` gives. (The numeral 3 is a `ZZ32` under walk, and `unsigned` of a `ZZ32` gives the `NN32` with the same bits.) A checked alternative is a typed `ZZ32` and `.asNN32`. I also report the conflict between the two texts. A test that asserts the rule's answer for the binding itself would be an `XXX` test.

**Path and scope.** The compiled path converts the numeral statically, and refuses a numeral outside the type's range statically. Until the switch-over, the compiler's prelude calls the numeral type `IntLiteral`. For a compiled test, remember that the compiler's library has the two-value `assert` only for `ZZ32`, `String` and `Character`, so an `NN32` check there is `assert(n = ..., msg)`.

**Passages.** Orientation, "Numbers", "A numeral converts where it stands (P-173)". `references/interpreter.md`, "How walk evaluates a program" (walk's literal departures). `references/tests-writing.md`, "A test program" (row 454, `unsigned(5)`). Orientation, "Numbers", P-161 (getters and low-bits functions).

## 22. Two declarations over indices

### (a) `tanh` in `explorations/apl/mg/FlatArrays2.fsi`

**Decision.** First I read the `exp` and `log` declarations in `FlatArrays2.fsi` (and their bodies in the `.fss`), and copy their header exactly, renamed to `tanh`. Where the header is generic over the array's index, the index parameter carries the bound `I extends Index` (P-156). A tuple of `Index` types is itself an `Index`, so one parameter covers every rank. In the expected shape:

    tanh[\T extends Number, I extends Index\](a: Array[\T, I\]): Array[\T, I\]

(with the array type, result type and element-type bound exactly as `exp` has them).

- If `exp` and `log` are declared once per number type, rather than generic over `T extends Number`, I do the same. Code generic over `T extends Number` can call no method of `T`, `asFloat` included (P-165).
- `MicroGptAplQuick.fss` passing under walk proves nothing about the bound: walk runs the code without it.

The compiled path does not accept it before the switch-over:

- Until the switch-over, the compiler's prelude declares no `Index`. So a component that names it does not compile.
- `FlatArrays2` is model-program code, not the library. Neither the count stage (`FortressLibrary` and its apis) nor the distance stage (fourteen library components) checks it against the interpreter's library.

The compiled path first reads the declaration in the gate's ladder regression (step 7). There `microgpt-phase.sh` compiles the eighteen components of the two microGPT programs, never runs them, and compares each one's phase with the baseline's `microgpt-phase.md`.

- If `exp` and `log` already name `Index`, the component already stops at that point, and `tanh` leaves its phase unchanged.
- If adding the bound lowers the phase, that is a DOWN, which is red unless the brief declared the move before the gate. I would report it as such.

After the switch-over, the compiled path compiles the component against the one library, which declares `Index`, and the checker reads the bound.

**Path and scope.** Walk: runs, with or without the bound. Compiled path: refused until the switch-over (no `Index` in the prelude), read only by the gate's microGPT phase compile; checked for real after the switch-over. The model program runs only under walk.

**Passages.** Orientation, "Traits and objects", "An indexed type's index parameter is bounded by `Index` (P-156)" ("Walk runs the code without the bound ... Until the switch-over, the compiler's prelude declares no `Index`, so a program that names it does not compile"). Orientation, "Numbers", P-165. `references/gate.md`, "The ladder regression". `references/compiler.md`, the definitions of the count and distance stages. `references/interpreter.md`, "The model program". `SKILL.md`, "model program".

### (b) `place(x: Index)` beside `place(x: (Cell, Cell))`

**Decision.** The pair is not a valid overloading.

- `trait Cell end` neither lies below `Index` nor excludes it, so a type can extend both `Cell` and `Index`. A pair of such values is a `(Cell, Cell)`, and also an `Index`, since a tuple whose element types are all `Index` types is an `Index`.
- So the domains overlap, neither lies inside the other, and nothing covers their meet. The Meet Rule refuses it.

The two paths:

- **Walk** loads the pair anyway, a known departure (row 806). It refuses nothing at load.
- **The checker** refuses it by the Meet Rule wherever it checks against the interpreter's library. In a compiled program before the switch-over, the compile stops earlier, because the compiler's prelude declares no `Index`.

The change: declare `trait Cell excludes { Index } end`. Then no `(Cell, Cell)` value is an `Index`, and the two domains exclude each other. (Making the cell an object would also make it exclude `Index`, but the cell is a trait here.) I would not assert walk's load as proof in a test, since row 806 is a departure.

**Path and scope.** Both paths, as above. Compiled programs that name `Index` are possible only after the switch-over.

**Passages.** Orientation, "Traits and objects", P-156: "a tuple whose element types are all `Index` types is an `Index` ... A function over `Index` and one over a tuple of `Index` types do not exclude each other ... walk loads a function over `Index` beside one over a pair whose element types neither lie below `Index` nor exclude it (row 806)". `references/interpreter.md`, "What walk checks" (row 806 bullet). Orientation, "Dispatch and overloading": the Meet Rule, and the `excludes { Number }` fix of P-160, the same kind of fix.

## 26. Comparisons across number types

### (a) `if (count == limit)` with `count: ZZ64`, `limit: RR64`

**Decision.**

    if asFloat(count) = limit then ... end

`count = limit` with 3 and 3.0 gives `false`, without an error. No coercion carries a `ZZ64` into an `RR64`, so no `=` is declared for the pair, and `=` falls back to `SEQV`. Values of different types are never `SEQV`.

The same condition works for `count: ZZ32` and for `count: QQ`, because each of the eight number types declares its own `asFloat` into `RR64`. So I keep it for all three.

- For `ZZ32`, plain `count = limit` would also be `true`: `ZZ32` converts into `RR64` implicitly, and the library declares `=` for such a pair.
- For `QQ`, `asFloat` rounds the rational to the nearest double. It is exact for 3.
- A float numeral bound to `limit` stays a `FloatLiteral` under walk (row 943). That affects `SEQV`, not this `=`, which coerces the argument. I would still run the case through the harness.

**Path and scope.** Walk. On the compiled path before the switch-over, the compiler's library has no `=` over `Any`, so a mixed `=` is not `SEQV` there.

**Passages.** Orientation, "Numbers", "`Number` declares nothing (P-165)": "Two numbers of different types compare by `=` only where a coercion carries one into the other ... Otherwise `=` is `SEQV`, and answers `false` without an error, as for a `ZZ64` against an equal `RR64`. ... write `asFloat(x) = y`." `references/library.md` (implicit conversion of `ZZ32` only). Orientation, "Traits and objects", P-168. `references/interpreter.md` (row 943).

### (b) `near` in the interpreter's library

**Decision.** I would not write the generic `near[\T extends Number\]`. Its body would have to call `asFloat` on a `T`, and `Number` declares nothing. The count stage's checker refuses that, though walk would run it. Instead I declare `near` once for each number type, in `Library/FortressLibrary.fss`, with the same headers in `Library/FortressLibrary.fsi` (the export check):

    near(a: ZZ32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: ZZ64, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: NN32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: NN64, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: ZZ,   b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: QQ,   b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: RR32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: RR64, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001

(`0.000000001` is the tolerance 1.0E-9 as a radix-point numeral, which converts into `RR64` with one rounding. `10.0^(-9)` would also do, not `10^(-9)`.)

Before writing them, I would study how the library declares other per-type families, such as `asFloat` and the low-bits functions, and copy its form. In particular I would check that the eight number types exclude each other, so that eight plain overloads pass both walk's load check and the checker. A new overload can make walk refuse every program at load.

Then the order of work:

1. Write a walk test of `near` for each type and see it fail through `harness-one.sh`.
2. Add the declarations and see the test pass.
3. Run the count stage and confirm a total of 0.
4. Run the demo driver once, because the change edits the interpreter's library.

**Path and scope.** The interpreter's library: walk now, and the compiled path after the switch-over. The count stage checks it now against the one library. Nothing goes into the compiler's prelude.

**Passages.** Orientation, "Numbers", P-165 ("generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, `asFloat` among them ... In generic code over `T extends Number`, declare your function once for each number type instead"), and P-153 (write `2.0^(-1)`, not `10^(-k)`). `references/library.md`, "Designing a change" (api headers, the export check, new overloads and walk's load check). `references/interpreter.md`, "What walk checks". `references/tests-running.md`, "Outside the gate" (demos). `references/compiler.md` (count stage).

## 28. Value objects, strings and a 4-tuple under `assert`

**Decision.** Under walk, `assert(x, y, msg)` on a type without a library `=` compares by `SEQV`. Each assertion:

**`assert(Point(1, 2), Point(1, 2), "point")` passes.** `Point` is a value object, so `SEQV` compares it field by field, and integers by value.

**`assert(Run(s, 3), Run("abc", 3), "run")` fails.** This is not a defect.

- `s` is computed at run time by `t || "c"`. `t` is typed, so there is no fold.
- `"abc"` is a literal. A string is a reference object, `SEQV` only to itself, so the `name` fields are not equivalent.
- This is P-168 as stated: "`V(s) = V(t)` is `false` where `s` and `t` are equal strings made by two computations".

The check I keep compares the parts, since a string's `=` compares text:

    r = Run(s, 3)
    assert(r.name = "abc", "run name")
    assert(r.steps, 3, "run steps")

Or I give `Run` its own `=` and make it extend `Equality[\Run\]`, so that `assert` calls it.

**`assert((1, 2, 3, s), (1, 2, 3, "abc"), "four")` fails.**

- The interpreter's library declares `=` on pairs and triples only. A 4-tuple falls back to `SEQV`, element by element, and `s` is not `SEQV` `"abc"`.
- This is today's rule, not a defect. Whether longer tuples should compare by `=` element by element is the open question of row 923, so I assert neither answer for the tuple.

The check I keep compares the parts:

    assert(s = "abc", "four: s")

with the three integer elements dropped, since they are literal and equal.

**Path and scope.** Walk. `SEQV` follows the specification on both paths. Until the switch-over, the compiler's library has no `=` over `Any` or on tuples, and its `===` compares strings by `=` (row 908).

**Passages.** Orientation, "Traits and objects", "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)", including the pairs-and-triples sentence and row 923. `references/tests-writing.md`, "A test program" (`assert` calls a type's own `=` only through a library trait such as `Equality`, row 807; else `SEQV`; use `assert(x = y, msg)`).

## 29. Which instance does `Cell(z)` make under walk today?

**Decision.**

**Look up first.** `facts-extract.sh 'ledger-find:Cell Int'` or `'ledger:364'`. Then `git ls-files 'ProjectFortress/*XXX*'` and the row's reproducer cell, to find any `XXX` test of row 364. If one exists, I promote it (rename it without `XXX`, see it fail on the base, then fix) instead of writing a new one.

**Check it today.**

- Walk makes `Cell[\Int\]`, the instance at the run-time Java class of the value, not `Cell[\ZZ32\]` (row 364). `z: ZZ32 = 3` holds a value of class `Int`, and "a generic built from a number value instantiates at that class".
- `asString` cannot show this. Walk prints the class as `ZZ32`, also in a static argument, so `Cell(z).asString` shows `ZZ32` in the static argument, exactly as a real `Cell[\ZZ32\]` would. Only walk's error messages say `Int`.
- So I check by dispatch, in a probe program under `tmp/` run directly with `bin/fortress`. I give two overloads, `kind(c: Cell[\ZZ32\]): String = "ZZ32"` and `kind(c: Any): String = "other"`, print `kind(Cell(z))`, and expect `other` today. As a control, `kind(Cell[\ZZ32\](z))` gives `ZZ32`.
- I would also print `Cell(z).asString` to quote its exact text in the report, as the evidence that the printed form hides the class.

**The test**, a plain-named walk test in `ProjectFortress/tests/`, since the fix repairs the defect (way 1 of "How a defect is recorded"):

    object Cell[\T extends Any\](v: T) end
    isZZ32Cell(c: Cell[\ZZ32\]): Boolean = true
    isZZ32Cell(c: Any): Boolean = false

    run(): () = do
        z: ZZ32 = 3
        assert(isZZ32Cell(Cell(z)), "Cell(z) instantiates Cell[\ZZ32\]")
    end

It fails on today's tree, because row 364 is open and walk dispatches `Cell[\Int\]` to the `Any` overload. I see it fail through `harness-one.sh` before I change walk, then pass after the fix. The two overloads nest (`Cell[\ZZ32\]` lies below `Any`), so walk's load check accepts them.

**Path and scope.** Walk only. The compiled path instantiates generics statically, and the checker types `Cell(z)` as `Cell[\ZZ32\]`.

**Passages.** `references/interpreter.md`, "How walk evaluates a program", the row 364 bullet ("So `Cell(3)` is a `Cell[\Int\]`, not a `Cell[\ZZ32\]`, and an overload declared on `Cell[\ZZ32\]` does not take it. Walk prints the class as `ZZ32`, `ZZ64` or `ZZ`, also in a static argument, but its error messages say `Int`"). `references/tests-writing.md`, "How a defect is recorded", "The order", "Promoting an `XXX` test". `SKILL.md`, "Rules for every task" (reproduce before explaining).

## 31. A walk test for a change to the number types

### (a) `nSamples = 3000000000`, then `scale: RR64 = nSamples`

**Decision.** The binding does not run.

- The untyped binding gives the numeral its default. 3000000000 does not fit a `ZZ32`, so `nSamples` is a `ZZ64`, and the default stays the value's type. Walk agrees: it gives the value the class `Long`.
- A `ZZ64` converts into `RR64` only explicitly, so walk stops at the typed binding, and the checker would refuse it statically.

I write:

    scale: RR64 = asFloat(nSamples)

I keep the hyperparameter as the integer it is. Writing `nSamples: ZZ64 = 3000000000` makes its type visible.

### (b) `ZZ32` addition raises `IntegerOverflow` at the maximum

**Decision.** Numerals alone fold exactly before the checker on both paths, so `2147483647 + 1` would be the `ZZ64` 2147483648, with no overflow. The test needs a typed operand:

    m: ZZ32 = 2147483647
    r: ZZ32 := 0
    overflowed: Boolean := false
    try
        r := m + 1
    catch e
        IntegerOverflow => overflowed := true
    end
    assert(overflowed, "ZZ32 addition at the maximum raises IntegerOverflow")

### (c) `RR64` addition rounds

**Decision.** Again typed operands are needed, because `0.1 + 0.2 = 0.3` folds exactly and is `true`:

    p: RR64 = 0.1
    q: RR64 = 0.2
    assert(NOT (p + q = 0.3), "RR64 0.1 + 0.2 is not 0.3")
    assert(p + q = 0.30000000000000004, "RR64 0.1 + 0.2 rounds to the double above 0.3")

The second assertion pins the double result, not merely "different". Under walk, `p` and `q` are kept as `FloatLiteral` values (row 943). I would run the test through `harness-one.sh` first. If walk's arithmetic on them did not round, the second assertion shows it.

**Compiled path.** The lines would test the same thing in intent, but the walk test in `ProjectFortress/tests/` never runs there.

- The fold applies on both paths, so the typed operands are needed there too. The test would be a compiled copy: `compiler_tests/Name.fss` with a `.test` file (`link`, `run`) and `println("PASS")` at the end.
- (c): the checker converts the numerals at the typed bindings with one rounding, and `+` is double arithmetic on `FRR64`, so it tests the same rounding. Row 943 does not apply there.
- (b): both libraries declare `IntegerOverflow`, and a compiled `catch` takes it (only `finally` has known faults, row 890). Whether the compiler's prelude's `ZZ32` `+` raises on overflow is not stated in the skill. The compiled test itself is the check: it is green only if it raises.
- Until the switch-over, the compiler's library has the two-value `assert` only for `ZZ32`, `String` and `Character`. So the flag form `assert(flag, msg)` is the one to use there, as above.

**Path and scope.** (a) to (c) as written are walk tests. The compiled path needs its own compiled test until the switch-over.

**Passages.** Orientation, "Numbers":

- "A numeral converts where it stands (P-173)": "So `n = 3000000000` is a `ZZ64` ... The default stays the value's type".
- "An expression of numerals alone folds exactly before the checker, on both paths (P-173)": "So `2147483647 + 1` is the `ZZ64` 2147483648, not an `IntegerOverflow`. `0.1 + 0.2 = 0.3` is `true` ... A test of run-time arithmetic or concatenation needs a typed operand".

Elsewhere in the skill:

- `references/library.md`, "The curator's decisions on the library" (`ZZ64` into `RR64` only by `asFloat`).
- `references/interpreter.md`: rows 364 and 943, and "Natives" (`IntegerOverflow` declared by both libraries).
- `references/compiler.md`, "Traps of the compiled path" (row 890).
- `references/tests-writing.md`: "A test program" (compiled `assert`) and "Where a test goes, and how it passes".

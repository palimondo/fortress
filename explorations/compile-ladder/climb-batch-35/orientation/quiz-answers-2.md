# Quiz answers, reader 2 (cases 5, 13, 26, 32)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, every part under `references/` except `revival-changes.md` and `sources.md`, and the orientation `explorations/compile-ladder/climb-batch-35/orientation/orientation.md` (cited below as "orientation"). No other file was opened.

---

## 5. `double seconds = elapsed / 1e9;` with `elapsed: ZZ64`, under walk

**Decision.**

    seconds: RR64 = asFloat(elapsed) / 1000000000.0

- `asFloat(elapsed)` converts explicitly. No coercion carries a `ZZ64` into `RR64`. Without the call, `elapsed` stays an integer, and `/` on two integers answers a `QQ`: `elapsed / 1000000000` would be the exact rational `elapsed/10^9`, not a float. It is a functional method, so I write `asFloat(elapsed)`, not `elapsed.asFloat()`. I do not write `elapsed.asRR64`: the one library declares `asFloat` in its place (F-324).
- For the divisor I write the radix-point numeral `1000000000.0`. Nothing I read gives Fortress an `e` exponent in numerals, so I do not write `1e9`. Before I relied on one, I would look up the numeral syntax in the specification's lexical chapter. The numeral takes its default, `RR64`, with one rounding, which gives exactly Java's `1e9`. `10.0^9` would also do: an expression of numerals alone folds exactly before the run.
- The result is an `RR64`, and `RR64`'s `/` runs. As in Java, the conversion of `elapsed` rounds for values above 2^53.

**If `elapsed` were a `ZZ32`:** the same line works unchanged, because every number type of the interpreter's library declares `asFloat(self): RR64`. I would keep it. For `ZZ32` alone you don't need the call, because `ZZ32` converts into `RR64` implicitly. So `(1.0 elapsed) / 1000000000.0` also gives the `RR64` quotient: juxtaposing `1.0` with a `ZZ32` runs `RR64`'s product, not `QQ`'s. That implicit form is wrong for `ZZ64`.

**Path and scope.** Walk, with the interpreter's (one) library. After the switch-over the compiled path uses the same library, so the line holds there too.

Before the switch-over the compiled path differs. The compiler's prelude has no `asFloat`. Its `RR64` converts only an `RR32` and a numeral (ledger row 442), so a `ZZ32` needs `elapsed.asRR64`. Its `/` is declared only at `RR64`. The materials give no prelude conversion of a `ZZ64` into `RR64`. Before I wrote a compiled form, I would read rows 442 and 349 (`facts-extract.sh 'ledger:442'`, `'ledger:349'`).

**Passages.**
- Orientation, "Numbers": "`/` on two integers answers a `QQ`. ... For a float, make one operand a float, as `(1.0 s) / n` for `ZZ32` values ... No coercion carries a `ZZ64` into `RR64`, so convert each `ZZ64` operand with the one library's `asFloat`".
- Orientation, "Numbers": "`Number` declares nothing (P-165). ... The one library departs: each declares `asFloat(self): RR64` instead, so write `asFloat(x)` (F-324)".
- Orientation, "Numbers": "A numeral converts where it stands (P-173)", on the default `RR64` with a radix point and one rounding.
- Orientation, "Numbers": "An expression of numerals alone folds exactly".
- Orientation, "Arguments convert by declared coercions": "`1.0 s` for `s: ZZ32` is `RR64`'s product, not `QQ`'s".
- `library.md`, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`."
- `compiler.md`, "Traps of the compiled path", numerals bullet: row 442 and "The prelude has no `asFloat`".
- Orientation, "`/` on two integers": "the compiler's prelude declares `/` only at `RR64`".

---

## 13. `override area(): RR64 = s s` in a library object whose trait declares `area(): RR64` abstract

**What happens.**
- **Walk** refuses the declaration at load. An `override` overrides only where the inherited parameter types are strictly narrower than its own. `area()` repeats the inherited parameter list (empty), so its `override` overrides nothing. The declaration is in the library, which every program loads, so every program stops at load.
- **The compiled checker** refuses the same `override` statically. The count stage (for `FortressLibrary`) or the distance stage (for the other thirteen components) reports an error, and so does a compile with `FORTRESS_LIBRARY=one`.
- **The code generator** refuses any function or method with the modifier `override` (ledger row 650). It is a code-generator wall, reached only if the checker let the declaration through.

**What I keep.** The same method without `override`. A body at the inherited declaration's own parameter types defines the abstract method (P-147):

    trait Shape
        area(): RR64
    end

    object Square(s: RR64) extends Shape
        area(): RR64 = s s
    end

If the component exports these through an api, the api declares each member at the component's header. It writes `abstract area(): RR64` in `trait Shape`, since the component leaves that member without a body, and `area(): RR64` in `object Square(s: RR64) extends Shape`, with the value parameter named `s` as in the component.

**Steps.**
1. Run `python3 explorations/coordinator/tools/ledger.py find --cites Library/<Component>.fss`, then `facts-extract.sh 'ledger:650'`.
2. Write a walk test first, `ProjectFortress/tests/<Topic>.fss`, that asserts `Square(3.0).area()` is `9.0`. See it fail through `harness-one.sh`, with an `Expected failure:` line echoed in the same call.
3. Add the declarations and see the test pass.
4. Run the count stage, or the distance stage if the brief gives it, and expect no new error. Run `ant testOneLibrary` if the component is one of the fourteen. Run the demos driver once, because the change edits the interpreter's library.

**Path and scope.**
- Walk, with the interpreter's library.
- The compiled checker wherever it checks that library: the count stage, the distance stage and one-library compiles, and after the switch-over every compiled program.
- The code generator on one-library compiles (`OneLibraryComponents.test`).
- The compiler's prelude is not touched. I add no declaration to it.

**Passages.**
- Orientation, "Traits and objects", "**`override` widens.**": "An `override` overrides an inherited declaration only where the inherited parameter types are strictly narrower than its own. To replace an inherited declaration at its own parameter types, declare it again without `override`. ... Walk refuses at load, and the checker refuses statically, an `override` that, by this rule, overrides nothing. So under walk a Java-style `override` in the library stops every program."
- Orientation, "Traits and objects", "**An object defines an inherited abstract method by bodies that together cover its parameter types (P-147).**"
- `interpreter.md`, "What walk checks": it refuses "a declaration with the modifier `override` ... that overrides no declaration that its type's immediate supertraits provide. An `override` at an inherited declaration's own parameter types overrides nothing." It also says "So a library edit can stop every program at load, if it ... adds an `override` that overrides nothing".
- `compiler.md`, "What the compiled path cannot compile yet": "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, such as `override` (ledger row 650)."
- `library.md`, "Designing a change": the api headers, "write `abstract` on each member that the component leaves without a body", and the steps that run the export check.
- `tests-writing.md`, "The order".
- `tests-running.md`, "Outside the gate", on the demos.

---

## 26. Comparisons across number types

### (a) `count == limit` and `ratio == 0.5`, under walk

**Decision.**

    if asFloat(count) = limit then ... end        (* count: ZZ64, limit: RR64 *)

- **`count = limit` at 3 and 3.0 gives `false`, with no error.** No coercion carries a `ZZ64` into an `RR64`, so the library declares no `=` for the pair. `=` falls back to `SEQV`, and values of different types are never equivalent. Java's `==` promotes the `long` and answers `true`. `asFloat(count) = limit` does what Java does and answers `true`.
- **`count: ZZ32`:** my line is the same and works, because `ZZ32` declares `asFloat`. Here the plain `count = limit` would also answer `true` at 3 and 3.0. A coercion carries `ZZ32` into `RR64`, and the library declares `=` for each such pair. I keep the `asFloat` form for both.
- **`count: QQ`:** my line is the same and works, because `QQ` is one of the eight types that declare `asFloat`. At 3 (that is, 3/1) and 3.0 it answers `true`. The plain `count = limit` falls back to `SEQV` and answers `false`. The implicit sources of `RR64` are only `ZZ32` and numerals, and I know of no coercion from `RR64` into `QQ`. I would confirm that with a walk run before I stated it in a report. My line does not depend on it.
- **`ratio == 0.5`, `ratio: QQ`:**

      if ratio = 0.5 then ... end

  The numeral converts exactly into `QQ` as 1/2 and reaches `QQ`'s own `=` (P-46). Under walk, `h = 0.5` is `true` for `h: QQ = 1/2`. The comparison is exact, unlike Java's comparison of doubles.
  - Do not bind the numeral to an untyped name first, as `half = 0.5` and then `ratio = half`. `half` keeps its default type, `RR64`, so the comparison is `SEQV` and answers `false`.
  - The walk departure of row 1016 (a numeral beside a variable declared `Any`) does not apply, because `ratio` is declared `QQ`.

**Path and scope.** Walk, with the interpreter's library, and the compiled path after the switch-over, where the checker picks the `=` statically.

Before the switch-over, these lines are not for a compiled program. The prelude has no `QQ` and no `asFloat`, and it declares no `=` over `Any`.

**Passages.**
- Orientation, "Numbers", "**`Number` declares nothing (P-165).**": "Two numbers of different types compare by `=` only where a coercion carries one into the other: the library declares `=` for each such pair, so a `ZZ32` and a `ZZ64` of equal value are `=`. Otherwise `=` is `SEQV` ..., and answers `false` without an error, as for a `ZZ64` against an equal `RR64`. A numeral reaches a number type's own `=` by its coercion (P-46). ... Under walk, `h = 0.5` is `true` for `h: QQ = 1/2`. To compare values across types at known types, write `asFloat(x) = y` for an `RR64` `y`."
- Orientation, "Traits and objects", "**Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168).**": "values of different types are never equivalent".
- Orientation, "Numbers", "A numeral converts where it stands": `q: QQ = 0.1` is `1/10`, and "The default stays the value's type".
- `library.md`, "The curator's decisions on the library": the implicit conversions into `RR64`.
- Orientation, "**A numeral can run a more specific declaration ...**": row 1016.

### (b) `near` in the interpreter's library: count stage and walk

**Decision.** I would not write the generic version. On `a: T` with `T extends Number`, the checker allows no method that the number types declare, and `asFloat` is one of them. So the count stage would refuse `asFloat(a)`, though walk, which has no static types, would run it. I declare the function once for each of the eight number types instead.

In `Library/FortressLibrary.fss`, with the same eight headers in `Library/FortressLibrary.fsi`:

    near(a: RR64, b: RR64): Boolean = |a - b| <= 0.000000001
    near(a: RR32, b: RR64): Boolean = near(asFloat(a), b)
    near(a: ZZ32, b: RR64): Boolean = near(asFloat(a), b)
    near(a: ZZ64, b: RR64): Boolean = near(asFloat(a), b)
    near(a: NN32, b: RR64): Boolean = near(asFloat(a), b)
    near(a: NN64, b: RR64): Boolean = near(asFloat(a), b)
    near(a: ZZ,   b: RR64): Boolean = near(asFloat(a), b)
    near(a: QQ,   b: RR64): Boolean = near(asFloat(a), b)

- **The overloads are valid.** At the first parameter the eight types exclude each other pairwise. Seven are objects, and an object excludes every trait that it does not extend. `QQ` is a trait that none of them extends. Every declaration writes its return type. A numeral argument, as `near(3, 3.0)`, runs the declaration at its default type, `ZZ32`.
- **The tolerance.** It is the radix-point numeral `0.000000001`. It stands at `RR64`'s `<=`, where its default is `RR64`, and one rounding gives exactly Java's `1.0E-9`.
  - I avoid `10^(-9)`: an integer power at a negative exponent raises `IntegerOverflow`.
  - I also avoid `10.0^(-9)` at an operator: it folds into the exact quotient 1/10^9, whose default is `QQ`. It would convert at a typed binding, `tol: RR64 = 10.0^(-9)`.
- **Absolute value.** `|x|` is the bracket form. The library writes `RR64`'s floor and ceiling as `opr |\self/|` and `opr |/self\|`. I would check that `RR64` declares `opr |self|` in `FortressLibrary.fsi`. If it does not, I would write `d <= 0.000000001 AND -d <= 0.000000001` with `d: RR64 = a - b`.

**Steps.**
1. Run `ledger.py find --cites Library/FortressLibrary.fss`.
2. Write a walk test first, `ProjectFortress/tests/NearAcrossNumberTypes.fss`. Each assertion binds a variable of one of the eight types, so that a typed value, not a numeral, reaches `near`. For example, `n: ZZ64 = 3`, then `assert(near(n, 3.0), true, "ZZ64 near")`, and a far case that answers `false`. See the test fail through `harness-one.sh`: `near` is undefined.
3. Add the declarations. A new overload can stop every program at load, so the test also guards the library. See the test pass.
4. Run the count stage in the background. Its table must still read `#total 0`.
5. Run `ant testOneLibrary`, because `FortressLibrary` is one of the fourteen components.
6. Run the demos driver once.

**Path and scope.** Walk, and the compiled checker over the interpreter's library: the count stage now, every compiled program after the switch-over. Until then, compiled programs do not link this library.

**Passages.**
- Orientation, "Numbers", "**`Number` declares nothing (P-165).**": "Generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, this conversion among them. ... In generic code over `T extends Number`, declare your function once for each number type instead." It also says "each declares `asFloat(self): RR64`".
- Orientation, "**The number types are flat siblings (P-43).**": seven value objects, and `QQ` a trait.
- Orientation, "Dispatch and overloading": "an object excludes every trait that it does not extend". `SKILL.md`, "Fortress as a language": the overloading rules.
- Orientation, "**An integer power answers its base's type (P-153).**": "write `2.0^(-1)` ... not `10^(-k)`".
- Orientation, "An expression of numerals alone folds exactly": "A quotient that is not whole stays `n / d` ... and defaults to a `QQ`".
- `library.md`, "Designing a change": api headers, "A new overload can make walk refuse every program at load", and the count stage for `FortressLibrary`.
- `compiler.md`, "The checker's time": the count stage, `#total 0`.
- `tests-running.md`, "When to run a whole suite" (`ant testOneLibrary`) and "Outside the gate" (the demos).

---

## 32. A program's own `Byte` that takes numerals

**Decision.**

    value object Byte(b: ZZ32) extends Number
        coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v.asZZ32)
    end

- **The coercion.** It is generic over the numeral's numbers. `v` is the numeral's value, and the `where` clause bounds the numerals that `Byte` takes. A program's own number type is declared below `Number` (P-160). `Number` declares nothing, so `extends Number` costs nothing. The coercion would work without it.
- **The body.** The rule's body is `Byte(v)`, but the tree departs: walk, the checker and the code generator read `v` as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347). Under walk I write `Byte(v.asZZ32)` today, as the one library does.
- **`x: Byte = 255`** binds `Byte(255)`. The numeral is a `NaturalNumeral[\3, 10, 255\]`, and 255 < 256. The coercion's value is computed once for that place and reused on each later run of the place (P-176).
- **`y: Byte = 300`** is refused.
  - **Compiled checker:** statically, at compile time, with 'The numeral 300 does not meet the where clause of the coercion to Byte.'
  - **Walk:** when the binding runs. At the top level that is while the top-level variables are initialised, which the harness counts as a refusal at load (`load_exception_contains`). Inside `run()`, it is when that line executes. I would read walk's message from a run before I pinned it in a `.test` key. The rules give 'Type mismatch binding' only for number types.
  - **Code generator:** it would run the coercion in the component class's static initializer, before `run()`. The checker refuses `300` before the code generator sees it.
- **`z: Byte = 2 + 3` does not bind.** `2 + 3` folds before the checker into the constant 5, whose default is `ZZ32`. A program's own type takes a folded constant only through a coercion from its default type, and coercions do not chain (P-174). `Byte` has only a numeral coercion. The checker refuses the binding statically, and walk refuses it when the binding runs. I write the numeral itself:

      z: Byte = 5

  I would not add `coerce(i: ZZ32)` to make `2 + 3` bind. It would take every `ZZ32` value implicitly, and the bound would then be checked only at run time, if at all.

**Path and scope.** Walk today, with the `v.asZZ32` body.

On the compiled path the checker also reads `v` as a `ZZ`. Until the switch-over, the prelude has `asZZ32` only on `ZZ32` and `ZZ64`, not on `ZZ` (row 349), so the walk body may not compile there. Before I wrote a compiled test, I would print the three facts (`facts-extract.sh 'F-341+' 'F-342' 'F-347'`) for the form that compiles. The `300` refusal is static on the compiled path and at run time under walk, before and after the switch-over.

**Passages.**
- Orientation, "Numbers", "**A numeral converts where it stands (P-173).**", third paragraph: "A program's own number type takes a numeral through a coercion generic over its numbers, which its body declares, as `value object Byte(b: ZZ32)` declares `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 }`. ... So `Byte`'s body is `Byte(v)`. The tree departs: walk, the checker and the code generator read each as a `ZZ`, so walk refuses `Byte(v)` (F-341, F-342, F-347). Under walk, write `Byte(v.asZZ32)` today, as the one library does. The `where` clause bounds the numerals that the type takes. The checker refuses statically a numeral that breaks it, as `300` here: 'The numeral 300 does not meet the where clause of the coercion to Byte.' Walk refuses it when the binding runs. ... walk computes it at the place's first run, the compiled path at compile time or when the class loads. Each run of that place reuses it (P-176)."
- Orientation, "**An expression of numerals alone folds exactly before the checker, on both paths (P-173).**": "Except for a negated numeral ..., a program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174). So `h: Half = 10/20` needs `coerce(q: QQ)`; a numeral coercion is not enough."
- Orientation, "**The number types are flat siblings (P-43).**": "Declare a program's own number type below `Number` (P-160)."
- Orientation, "An integer converts to another integer type ... (P-161)": the prelude's getters (row 349).
- `compiler.md`, "What the code generator does": the coercion runs "in the component class's static initializer".
- `tests-writing.md`, "Where a test goes, and how it passes": a failure while the top-level variables are initialised counts as a refusal at load.

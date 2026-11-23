# Quiz answers, reader 1 (cases 5, 13, 26, 32)

Sources read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its area parts under `references/` (not `revival-changes.md`, not `sources.md`), and the orientation `explorations/compile-ladder/climb-batch-35/orientation/orientation.md` (cited below as "orientation"). I ran nothing and opened no other file.

## 5. Porting `double seconds = elapsed / 1e9;` with `elapsed: ZZ64`

**Decision.**

    seconds: RR64 = asFloat(elapsed) / 1000000000.0

- Convert the `ZZ64` explicitly with `asFloat(elapsed)`. No coercion carries a `ZZ64` into `RR64`, so neither of these gives Java's double:
  - `elapsed / 1000000000` is `/` on two integers, so it answers an exact `QQ`.
  - The `ZZ32` idiom `(1.0 elapsed) / ...` relies on `ZZ32`'s implicit conversion into `RR64`. A `ZZ64` has no such conversion, so it does not reach `RR64`'s product.
- Write the conversion as the functional `asFloat(x)`, not as the rule's getter `x.asRR64`, because the tree departs here (F-324).
- Write the divisor as a numeral with a radix point. At `RR64`'s `/` it converts into `RR64` with one rounding. I do not rely on a `1e9` exponent spelling, because none of my sources shows one. `10.0^9` would also work, since an expression of numerals alone folds exactly before the checker.

**With `elapsed: ZZ32`.** The same line works unchanged, because `ZZ32` declares `asFloat` too, and I would keep it. For a `ZZ32`, the orientation's idiom `(1.0 elapsed) / 1000000000.0` would also give an `RR64`, because `ZZ32` and numerals convert into `RR64` implicitly. That idiom does not carry over to `ZZ64`, so the uniform `asFloat` form is the one I write.

**Path and scope.** Walk, as asked. On the compiled path before the switch-over, the prelude has no `asFloat`, declares `/` only at `RR64`, and converts into `RR64` only from `RR32` and numerals. There a `ZZ32` needs `i.asRR64` (compiler.md, "Traps of the compiled path"). From the switch-over, the compiled path uses the interpreter's library, so the walk line applies there too.

**Passages.**
- orientation, "Numbers", the rule "`/` on two integers answers a `QQ`": "For a float, make one operand a float, as `(1.0 s) / n` for `ZZ32` values ... No coercion carries a `ZZ64` into `RR64`, so convert each `ZZ64` operand into `RR64`, as `asFloat(s) / asFloat(n)`."
- orientation, "Numbers", "`Number` declares nothing (P-165)": "each declares `asFloat(self): RR64` instead, so write `asFloat(x)` (F-324)."
- orientation, "Numbers", "An expression of numerals alone folds exactly ...".
- library.md, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`."
- compiler.md, "Traps of the compiled path", the numerals bullet (ledger row 442).

## 13. `override area(): RR64 = s s` in `object Square(s: RR64) extends Shape`

**What happens.**
- **Rule.** `override` widens: it overrides an inherited declaration only where the inherited parameter types are strictly narrower than its own. `area()` here has the same parameter types (none) as `Shape`'s abstract `area()`. So by the rule the `override` overrides nothing.
- **Walk.** Walk refuses at load an `override` that overrides no declaration of the type's immediate supertraits. The declaration is in the library, which every program loads, so every program stops at load. This is the case "adds an `override` that overrides nothing" in the list of library edits that stop every program.
- **Compiled checker.** It refuses the `override` statically. The count stage, or the distance stage for another of the fourteen components, would show a new error, so the count is no longer 0.
- **Code generator.** If the checker let it through, the code generator would still refuse it: it refuses any method modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, `override` among them (ledger row 650). For the fourteen components that `OneLibraryComponents.test` compiles, that is the `ant testOneLibrary` compile. For every component, it is the case after the switch-over.

**What I keep.** The plain redeclaration, without `override`:

    object Square(s: RR64) extends Shape
        area(): RR64 = s s
    end

This replaces the inherited abstract declaration at its own parameter types. Per P-147, one body at the abstract's parameter types defines it.

- In the api, declare `Square`'s `area` at the same header, also without `override`.
- In the api, write `Shape`'s bodiless `area` as `abstract area(): RR64`.
- Give `Square`'s value parameter the api's name.

`Shape` is not self-typed, so the checker's departure for a narrower return type in a self-typed trait (row 1094) does not arise.

**Process.** This is a library edit, so I write the walk test first in `ProjectFortress/tests/`, for example asserting `Square(2.0).area()` against `4.0` through a variable, and see it fail through `harness-one.sh`. Then I make the edit and see the test pass. I run the count stage to confirm that the checker's total stays 0.

**Path and scope.**
- Walk: refusal at load, today.
- Compiled checker: refusal against the interpreter's library, today, through the count and distance stages.
- Code generator: refusal of the modifier (row 650) wherever it compiles the library: one-library compiles now, and everything after the switch-over.
- The plain redeclaration is right on both paths.

**Passages.**
- orientation, "Traits and objects", "**`override` widens.**": "To replace an inherited declaration at its own parameter types, declare it again without `override` ... Walk refuses at load, and the checker refuses statically, an `override` that, by this rule, overrides nothing. So a Java-style `override` in the library stops every program."
- orientation, "Traits and objects", "An object defines an inherited abstract method by bodies that together cover its parameter types (P-147)".
- interpreter.md, "What walk checks": "a declaration with the modifier `override` ... that overrides no declaration that its type's immediate supertraits provide. An `override` at an inherited declaration's own parameter types overrides nothing", and "So a library edit can stop every program at load, if it ... adds an `override` that overrides nothing".
- compiler.md, "What the compiled path cannot compile yet": "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, such as `override` (ledger row 650)."
- library.md, "Designing a change" (api headers, `abstract` in the api, the count stage).
- tests-writing.md, "The order".

## 26. Comparisons across number types

### (a) `if (count == limit)` with `count: ZZ64`, `limit: RR64`, under walk

**Decision.**

    if asFloat(count) = limit then ... end

- `count = limit` with `count` 3 and `limit` 3.0 gives `false`, silently, with no error. No coercion carries a `ZZ64` into `RR64`, so the library declares no `=` for that pair. `=` falls back to `SEQV`, and values of different types are never strictly equivalent.
- `count: ZZ32`:
  - My condition stays the same: `ZZ32` declares `asFloat`.
  - A plain `count = limit` would also be `true` at 3 and 3.0, because a coercion carries `ZZ32` into `RR64`. Where such a coercion exists, the library declares `=` for the pair.
  - I would still write the `asFloat` form, so the condition does not change with `count`'s type.
- `count: QQ`:
  - My condition stays the same: `asFloat(count) = limit`. Each number type declares `asFloat` (F-324). Before relying on that for `QQ`, I would confirm in `Library/FortressLibrary.fsi` that `QQ` declares `asFloat`.
  - None of my sources says that a coercion carries `QQ` into `RR64`. If none does, a plain `count = limit` would silently be `SEQV`-false. The `asFloat` form does not depend on it.
- `if (ratio == 0.5)` with `ratio: QQ`:

      if ratio = 0.5 then ... end

  The numeral reaches `QQ`'s own `=` through its coercion (P-46) and converts exactly, to 1/2. So the comparison is exact and is `true` for `ratio` = 1/2. Row 1016, a numeral beside a variable declared `Any`, does not apply, because `ratio` is declared `QQ`.

**Path and scope.** Walk, as asked. Until the switch-over, the compiler's prelude declares no `QQ`, no `asFloat` and no `=` over `Any`, so this port is a walk program. After the switch-over, the same rules hold on the compiled path.

**Passages.**
- orientation, "Numbers", "`Number` declares nothing (P-165)": "Two numbers of different types compare by `=` only where a coercion carries one into the other ... Otherwise `=` is `SEQV` ..., and answers `false` without an error, as for a `ZZ64` against an equal `RR64`. A numeral reaches a number type's own `=` by its coercion (P-46) ... Under walk, `h = 0.5` is `true` for `h: QQ = 1/2`. To compare values across types at known types, write `asFloat(x) = y`."
- orientation, "Traits and objects", "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)": "values of different types are never equivalent".
- orientation, "Numbers", "A numeral converts where it stands (P-173)" (`q: QQ = 0.1` is `1/10`).
- library.md, "The curator's decisions on the library" (`ZZ32` converts into `RR64` implicitly, `ZZ64` only by `asFloat`).

### (b) `near` in the interpreter's library

**Decision.** Do not write the generic `near[\T extends Number\]`. Generic code over `T extends Number` can call on a `T` no method that the number types declare, `asFloat` included, so its body cannot convert `a`. Declare `near` once for each of the eight number types. The parameter types are sibling value objects plus the trait `QQ`, which no object here extends, so each pair excludes and the overload set is valid on both paths.

In `Library/FortressLibrary.fss`, with the same headers in `FortressLibrary.fsi`:

    near(a: ZZ32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: ZZ64, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: ZZ,   b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: NN32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: NN64, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: QQ,   b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: RR32, b: RR64): Boolean = |asFloat(a) - b| <= 0.000000001
    near(a: RR64, b: RR64): Boolean = |a - b| <= 0.000000001

- The tolerance numeral sits at `RR64`'s `<=` parameter, so it converts into `RR64` with one rounding. `10.0^(-9)` would fold to the same constant.
- Before writing the bodies, I would check how the library spells absolute value at `RR64` and follow it, since the library's way comes first. The fallback is `(asFloat(a) - b <= tol) AND (b - asFloat(a) <= tol)`, fully parenthesised.
- I would not rely on one `near(a: RR64, b: RR64)` plus walk's argument conversion: `ZZ64`, among others, has no coercion into `RR64`.
- A numeral argument, as `near(3, 3.0)`, takes its default `ZZ32` and runs the `ZZ32` declaration. The siblings are not strict subtypes of one another, so P-46 picks nothing else.

**Process.**
1. Write a walk test first, `ProjectFortress/tests/<Topic>.fss`, with a variable of each type, as `z: ZZ64 = 3` then `assert(near(z, 3.0), "ZZ64 near")`, plus a far case. See it fail through `harness-one.sh` because `near` is undefined.
2. Add the declarations and see the test pass.
3. Run the count stage. It also runs the export check on `FortressLibrary`, and its total must stay 0.

**Path and scope.** Walk and the compiled checker's count stage today. The compiled path uses it after the switch-over. Before the switch-over, a compiled program does not see the interpreter's library, and the prelude has no `asFloat` and no `QQ`.

**Passages.**
- orientation, "Numbers", "`Number` declares nothing (P-165)": "Generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, this conversion among them ... In generic code over `T extends Number`, declare your function once for each number type instead." Also "The tree departs: each declares `asFloat(self): RR64` instead, so write `asFloat(x)` (F-324)."
- orientation, "Numbers", "The number types are flat siblings (P-43)" (the eight types; `QQ` a trait).
- orientation, "Dispatch and overloading" and "Traits and objects": an object excludes every trait that it does not extend.
- orientation, "Numbers", "A numeral can run a more specific declaration ... (P-46)".
- library.md, "Designing a change" (api headers; "For the one library's `FortressLibrary` component: the count stage"; study the library's own way first).
- compiler.md, "count stage".

## 32. `value object Byte(b: ZZ32)` taking numerals

**Decision.**

    value object Byte(b: ZZ32) extends Number
        coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v.asZZ32)
    end

- `Byte` goes below `Number`, because a program's own number type is declared there (P-160). `Number` declares nothing (P-165), so this costs nothing. `Byte` is an object, so it raises no Meet Rule problem with the library's array-and-number `+`.
- The coercion is generic over the numeral's numbers, and its `where` clause bounds the numerals that `Byte` takes.
- The rule's body is `Byte(v)`. The tree departs: walk and the checker read `v` as a `ZZ` and refuse `Byte(v)`. So write `Byte(v.asZZ32)`, as the library's own coercions do (F-342).

**Results.**
- `x: Byte = 255` binds `Byte(255)`, since `v` = 255 < 256. A walk test asserts `x.b` against 255.
- `y: Byte = 300` is refused:
  - **Compiled path.** The checker refuses it statically at `fortress compile`: 'The numeral 300 does not meet the where clause of the coercion to Byte.' A compiled test of the refusal is a `compile` test with `compile_err_contains=does not meet the where clause of the coercion to Byte`.
  - **Walk.** Walk refuses it when the binding runs. At the top level, that is while the top-level variables are initialised, which a walk `.test` counts as a refusal at load (`load_exception_contains`). Inside `run()`, it is when that line runs. My sources do not give walk's exact message for an own type's `where` clause, so I would run the program once to read it before pinning it in a `.test` key.
- The coercion runs once per place where a numeral is written, and each run of that place reuses the value (P-176). Compiled, it runs in the component class's static initializer, before `run()`.

**`z: Byte = 2 + 3`.** It does not bind.
- `2 + 3` is an expression of numerals alone, so it folds exactly, before the checker, to the constant 5. That constant's default type is `ZZ32`.
- A program's own type takes a folded constant only through a coercion from that default type, because coercions do not chain. `Byte` has only the numeral coercion, so the binding is refused: statically by the checker, and by walk when the binding runs.
- Declaring `opr +` on `Byte` would not help, because the fold happens first.
- Write `z: Byte = 5`. Add a `coerce(x: ZZ32)` only if the program truly needs computed constants. It would take any `ZZ32` at run time, with no static range check.

**Path and scope.**
- Walk and the compiled path both, today. The compiler's prelude follows the same numeral design (P-37).
- The checker refuses statically, and walk refuses when the binding runs.
- One point I would check before relying on the compiled path: the prelude's getters on `ZZ` are not listed in compiler.md. I would confirm that `v.asZZ32` checks there by grepping the prelude's own numeral coercions (`coerce[\nat` in `Library/CompilerLibrary.fss` and `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss`) and copying their spelling.

**Passages.**
- orientation, "Numbers", "A numeral converts where it stands (P-173)", paragraph "Write a numeral type only as the parameter type ...": "A program's own number type takes a numeral through a coercion generic over its numbers, which its body declares, as `value object Byte(b: ZZ32)` declares `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)` ... The tree departs: walk and the checker read each number as a `ZZ`, so they refuse `Byte(v)`, and the library's coercions write `v.asZZ32` (F-342). ... The checker refuses statically a numeral that breaks it, as `300` here: 'The numeral 300 does not meet the where clause of the coercion to Byte.' Walk refuses it when the binding runs. ... The coercion gives one value for each place where the numeral is written, and each run of that place reuses it (P-176)."
- orientation, "Numbers", "The number types are flat siblings (P-43)": "Declare a program's own number type below `Number` (P-160)."
- orientation, "Numbers", "An expression of numerals alone folds exactly before the checker ...": "a program's own type takes the constant only through a coercion from its default type, since coercions do not chain (P-174). So `h: Half = 10/20` needs `coerce(q: QQ)`; a numeral coercion is not enough."
- compiler.md, "What the code generator does" (a coercion from a numeral runs in the static initializer; a coercion that raises stops the program before `run()`).
- interpreter.md, "Where a fix of walk belongs" (walk's dispatch cache skips own-type numeral coercions).
- tests-writing.md, "Where a test goes, and how it passes" (`load_exception_contains`; a failure while top-level variables are initialised counts as a refusal at load).

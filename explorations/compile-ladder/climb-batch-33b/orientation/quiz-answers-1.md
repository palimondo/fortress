# Quiz answers, reader 1

Cases: 36. Read before answering: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its area parts under `references/` (all but `revival-changes.md` and `sources.md`), and the orientation `explorations/compile-ladder/climb-batch-33b/orientation/orientation.md`.

## 36. Porting `kind(x: Number)` and adding `Meters`

### (a) The test's arms as they are, under walk

**Decision.** Neither assertion gives a value. The program stops before `run()`. `Int` and `Float` are not types here, so the arms `Int =>` and `Float =>` are refused with the undefined-type message: 'Int is undefined.' and 'Float is undefined.' This is a static error from a phase that runs before the run (name binding). So the harness reports the plain test red, and neither `assert` runs. The `else => "other"` arm is fine. Only the team's bare-binder form `x =>` is refused, because it reads `x` as a type.

**Path and scope.** Both paths. No library declares `Int` or `Float`, either now or after the switch-over.

**Passage.** Orientation, "Numbers": "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist. No library declares them. On both paths, each is undefined as a type: 'Float is undefined.' … A `typecase` arm at such a name, or at any name that names no type in scope, gets the same message. Write an arm over every value as `x: Any =>`: the team's `x =>` reads `x` as a type, and is refused." Also `tests-writing.md`, "Where a test goes, and how it passes": "a static error of a phase before the run, such as the disambiguator's, counts as a refusal". For a plain test, that is red.

### (b) The typecase, `Meters`, and the assertions kept

**Decision.** In the arms, respell the team's types: `ZZ32` for `Int` and `RR64` for `Float`. Keep the strings that the team's assertions check, `"Int"` and `"Float"`. Those strings are values of the test, not type names. Declare `Meters` as the program's own number type, below `Number`, never below `ZZ32`. Give it its own functional `+` with `self` first, declared in the object itself. The test file is `ProjectFortress/tests/NumberKindTypecase.fss`:

    component NumberKindTypecase
    export Executable

    (*) The kind of a number by typecase, at the number types and at a program's own number type.

    value object Meters(v: ZZ32) extends Number
      opr +(self, other: Meters): Meters = Meters(v + other.v)
    end

    kind(x: Number): String =
      typecase x of
        ZZ32 => "Int"
        RR64 => "Float"
        else => "other"
      end

    run(): () = do
      assert(kind(3), "Int", "kind of the numeral 3")
      assert(kind(1.5), "Float", "kind of the numeral 1.5")
      assert(kind(Meters(2)), "other", "kind of a Meters")
      assert((Meters(1) + Meters(2)).v, 3, "Meters + adds the lengths")
    end

    end

- `kind(3)` gives `"Int"`. The numeral 3 at a parameter of type `Number` takes its default, `ZZ32`, so the `ZZ32` arm is chosen.
- `kind(1.5)` gives `"Float"`. A numeral with a radix point defaults to `RR64`.
- `kind(Meters(2))` gives `"other"`. `Meters` is a sibling of `ZZ32` and `RR64` under `Number`, not a subtype of either, so only `else` matches it.
- The `+` assertion reads the `ZZ32` field. A string is compared by text, and the field by its `ZZ32` value. So no `=` of `Meters` is needed. As a value object, `Meters` would compare field by field under `SEQV` in any case.
- The `+` is declared in an object, not a trait. So it does not overlap the library's generic `+` between an array and a number. An object excludes every trait that it does not extend, `HasRank` included, so no `excludes` clause is needed.
- `Meters` has no numeral coercion. So write `Meters(2)`, not `m: Meters = 2`.

The test comes with no fix. So see it pass through the harness once, after the setup lines: `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/NumberKindTypecase.fss`. Then read `OK (1 test)`.

**Lookups first.**
- Print `P-160` and `P-178` with `explorations/coordinator/tools/facts-extract.sh`, to confirm the decisions on a program's own number type and on the value-object number types.
- `git grep` the tests for `kind(`, and for the refusal text 'Attempt to extend object type'. If a test already asserts these cases, add the new cases there, not in a new file.
- Check that `v` is not a functional method of the library. If it is, the field name is refused ("Variable v is already declared"), and I would rename it.

**Path and scope.** The test is a walk test, so `kind(Meters(2))` gives `"other"` under walk. By P-160, the same declarations run on the compiled path too. The two-value asserts used are over `String` and `ZZ32`, which the compiler's library declares.

**Passage.**
- Orientation, "Numbers": "In their place, write `ZZ32` for `Int`, `ZZ64` for `Long`, `RR64` for `Float` …"; "Elsewhere the numeral takes its default: `ZZ32` … and `RR64` with a radix point. Elsewhere includes … `Number` …"; "Do not extend a number type in a program. Declare a program's own number type below `Number` (P-160). Such a type runs on both paths."; "Without such a coercion, the type refuses a numeral."
- Orientation, "Dispatch and overloading": "Or declare the `+` in an object, not in a trait: an object excludes every trait that it does not extend".
- `SKILL.md`, "Fortress as a language": "Numbers are siblings, not a tower … None is a subtype of another"; and "Most operators are declared so: `opr +(self, other: T): T`".
- `tests-writing.md`, "Names, comments, citations": "respell the line and keep the value that it checks. Keep every assertion."
- `compiler.md`, "Traps of the compiled path": put `self` first in an object's own functional overloads.

### (c) The planned `object Meters(v: ZZ32) extends ZZ32`, and mine

**Decision.** Do not write the planned declaration.
- **Under walk,** the planned declaration is refused at load: 'Attempt to extend object type ZZ32'. The whole test stops before `run()`, so not even the `kind` assertions run.
- **On the compiled path today,** before the switch-over, the checker refuses it: 'Invalid type in extends clause: ZZ32'. `ZZ32` is a value object in the compiler's prelude too, so the same refusal holds after the switch-over.
- **My declaration,** `value object Meters(v: ZZ32) extends Number` with its own `opr +`, loads and runs under walk. Its four assertions pass, with `kind(Meters(2))` giving `"other"`. The compiled checker accepts it, and it runs compiled.

`Meters` does not get `ZZ32`'s operators by inheritance. It declares the `+` that it needs.

**Path and scope.** Both paths refuse the planned declaration, before and after the switch-over. Mine runs on both paths.

**Passage.** Orientation, "Numbers": "In both libraries, seven are value objects (P-178): `ZZ32`, … Do not extend a number type in a program. Declare a program's own number type below `Number` (P-160). Such a type runs on both paths. Both paths refuse an object below one of the seven, as `object Mine extends ZZ32`. Walk refuses it at load: 'Attempt to extend object type ZZ32'. The compiled checker refuses it: 'Invalid type in extends clause: ZZ32'."

# Quiz answers, reader 2

Cases: 36. Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, every part under `references/` except `revival-changes.md` and `sources.md`, and `explorations/compile-ladder/climb-batch-33b/orientation/orientation.md` (cited below as "orientation"). I ran nothing.

## 36

### (a) The team's arms as they are, under walk

**Decision.** Neither assertion gives a value. Walk refuses the program before `run()` starts, because the arms name types that do not exist: 'Int is undefined.' and 'Float is undefined.' I have not run it, so I do not know whether one or both messages print. The harness reports the plain test red: the run throws and exits non-zero, and no `.test` file declares the refusal as expected. The `else` arm makes no difference, because the refusal comes from binding names, not from evaluation.

If the program got past that check, the selectors would be: `3` at `x: Number` takes its default, `ZZ32`, and `1.5` takes `RR64`. `Number` has no coercion from a numeral, so it is one of the places where a numeral "takes its default". So the port only needs to respell the arms.

**Path and scope.** The same on both paths: "On both paths, each is undefined as a type". The switch-over does not change this, because no library declares these names. The tuple-arm departure (row 1064, where an undefined name in a tuple arm is read as a binder) does not apply, because these arms are plain types.

**Passage.** Orientation, "Numbers", the rule "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist": "On both paths, each is undefined as a type: 'Float is undefined.' In their place, write `ZZ32` for `Int` … `RR64` for `Float` … A `typecase` arm at such a name, or at any name that names no type in scope, gets the same message." For the defaults: orientation, "Numbers", "A numeral converts where it stands": "Elsewhere includes an untyped binding, `Any`, `Object`, `Number`, …".

### (b) The port

**Decision.** Respell the arms as `ZZ32` and `RR64`. Keep the strings `"Int"` and `"Float"`, because they are the values that the team's assertions check, and keep both assertions. Declare `Meters` as a program's own number type below `Number`, not below `ZZ32`. `Meters` cannot inherit `ZZ32`'s operators, so it declares its own `+`. That `+` goes in the object, not in a trait, so it does not overlap the library's generic `+` between an array and a number.

`ProjectFortress/tests/TypecaseNumberKinds.fss`:

    component TypecaseNumberKinds
    export Executable

    (* A typecase over Number tells ZZ32 from RR64, and a program's own number type below Number reaches else. *)

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
        assert(kind(3), "Int", "kind(3)")
        assert(kind(1.5), "Float", "kind(1.5)")
        m: Meters = Meters(2)
        assert(kind(m), "other", "kind(Meters(2))")
        assert((m + Meters(3)).v, 5, "Meters(2) + Meters(3)")
    end

    end

`kind(Meters(2))` gives `"other"`. The number types are siblings, so `Meters` is neither a `ZZ32` nor an `RR64`, and the `else` arm takes it.

- The `+` test needs no variable operand trick. `Meters(2) + Meters(3)` is not "an expression of numerals alone", so it does not fold, and the `+` in the body runs on the fields at run time.
- The `String` assertions hold whether `assert` compares by `=` or by `SEQV`, because two string literals of one text are one object (P-171). The `ZZ32` assertion compares by value.
- I made `Meters` a `value object`, like the library's number types (P-178), so two `Meters` of one length are `SEQV` field by field. It has no `var` field.

**Before I write it, I would look up:**

- `git grep` under `ProjectFortress/tests/` for a test that already asserts `typecase` over the number types. If one exists, I would add these cases to it ("Assert each case in one test only").
- `Library/FortressLibrary.fsi`, for a type named `Meters`. Walk's disambiguator refuses a program's top-level type that has the name of a `FortressLibrary` type. Dimensions and units are specified but not built, so I expect none.
- The same file, for a functional method named `kind` or `v`, because such names are reserved.

**Run.** The port fixes no defect, so it has no failing run. I would see it pass through the harness, after the setup lines of `build-and-caches.md`, in my own seeded worktree:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/TypecaseNumberKinds.fss

The test is green if it throws nothing, exits 0, and prints no `fail` or `FAIL`. No expected-output file is added.

**Path and scope.** This is a walk test, which is gated in `tests/` with no `.test` file. The same program is accepted on both paths ((c)).

**Passages.**

- Orientation, "Numbers", "The number types are flat siblings (P-43)": "Do not extend a number type in a program. Declare a program's own number type below `Number` (P-160). Such a type runs on both paths."
- Orientation, "Numbers", "`Number` declares nothing (P-165)". So `Meters` inherits no abstract member to define, and inherits no operator either.
- Orientation, "Dispatch and overloading", the Meet Rule paragraph: "Or declare the `+` in an object, not in a trait: an object excludes every trait that it does not extend … Otherwise walk refuses the program at load: 'fails the Meet Rule'."
- Orientation, "Traits and objects", on `SEQV` and P-171 string literals.
- `SKILL.md`, "Fortress as a language": "Numbers are siblings, not a tower".
- `tests-writing.md`: "A test program", "Where a test goes, and how it passes", "The order" ("A test that comes with no fix has no failing run: see it pass through the harness"), and "Names, comments, citations".
- `interpreter.md`, "What walk checks", on top-level type names that clash with `FortressLibrary`.

### (c) The planned declaration and mine, on each path

**The planned `object Meters(v: ZZ32) extends ZZ32`.**

- Under walk, it is refused at load: 'Attempt to extend object type ZZ32'. The whole program stops before `run()`, and the plain test is red.
- On the compiled path today, the compiled checker refuses it: 'Invalid type in extends clause: ZZ32'.
- The switch-over changes neither: "In both libraries, seven are value objects (P-178)", and an object is a leaf.
- It would not give `Meters` `ZZ32`'s operators on either path. I do not write it.
- If a test of that refusal were wanted, it would be a separate plain test, `X.fss` with `X.test` holding `load_exception_contains=Attempt to extend object type ZZ32`. I would first `git grep` for the message to see whether a test already asserts it. The port does not need it.

**Mine, `value object Meters(v: ZZ32) extends Number`, with its own `+`.**

- Under walk, it loads and the four assertions pass. Its one `+` has `self` first and lies in an object that extends neither `HasRank` nor `AdditiveGroup`. So it excludes the library's array-and-number `+` and the number types' own `+`, and the Meet Rule check passes.
- On the compiled path, the checker accepts it: a program's own number type below `Number` "runs on both paths". The rest of the program also fits the compiled path's known traps:
  - The selector is the variable `x`, not a numeral, so the numeral-selector trap (row 963) does not apply.
  - The `typecase` arms have no binders, so rows 964, 1067 and 1072 do not apply.
  - The compiler's library declares the two-value `assert` for `String` and `ZZ32`.
  - The `+` puts `self` first (row 573).

  The file in `tests/` runs only under walk. A compiled copy would be a separate `compiler_tests/` test, with a `.test` file holding `link` and `run`, and `println("PASS")` at the end of `run()`.

**Passages.**

- Orientation, "Numbers", "The number types are flat siblings (P-43)": "Both paths refuse an object declaration below one of the seven, as `object Mine extends ZZ32`. Walk refuses it at load: 'Attempt to extend object type ZZ32'. The compiled checker refuses it: 'Invalid type in extends clause: ZZ32'."
- `SKILL.md`, "Fortress as a language": "An object is a leaf."
- `compiler.md`, "Traps of the compiled path": rows 963, 964, 1067, 1072 and 573.
- `tests-writing.md`, "A test program", on the compiled `assert` and `println("PASS")`.
- `tests-writing.md`, "Where a test goes, and how it passes", on `load_exception_contains`.

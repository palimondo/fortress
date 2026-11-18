# Quiz answers, reader 1 (cases 35, 36, 37)

Sources read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, every part under `references/` except `revival-changes.md` and `sources.md`, and the orientation file `explorations/compile-ladder/climb-batch-33/orientation/orientation.md` (cited below as "orientation"). I ran nothing and opened no other file. I name each claim that I would check by a run or a ledger read before acting.

Setup for every command below: the setup lines of `build-and-caches.md`, "Setting up each call". The compiled tests need the five library jars in the tree's `default_repository/caches/bytecode_cache/`; if they are missing, run the library order first (`build-and-caches.md`, "The library order").

---

## 35. Compiled tests of a self-typed `Ord`

### What I look up first

- `T=explorations/coordinator/tools/facts-extract.sh`; `$T 'ledger:1070'` (the `typecase` shape that fails verification) and `$T 'ledger:1052'` (a generic object that lists the self-typed trait first). From 1070 I need its reproducer, and whether that test covers `self` returned at `X` of a self-typed trait, or only `self` at a type that a `comprises` clause lists. The orientation says its test is the second kind.
- `$T 'ledger-find:self typecase'` and `$T 'ledger-find:self-typed'`, for any other row on these shapes (`records.md`, "Reading the record").
- `git grep -l 'extends Ord\[' ProjectFortress/compiler_tests` and a grep for self-typed default bodies, so I do not assert the same case twice (`tests-writing.md`, "Names, comments, citations"). The brief asks for one program for each part, so I still write four programs. I would name any existing duplicate in my report.

### Why the four parts get these answers

- **Self-typed.** `Ord[\T extends Ord[\T\]\]` is self-typed: it has no `comprises` clause, and its parameter is bounded by the trait itself. In its bodies, `self` has the type `Ord[\T\]` ∩ `T`. `Late extends Ord[\Late\]` is a `Late`, so the checker accepts it.
- **Runs compiled.** "A compiled body of `T` that returns `self` at `X` runs, also from an arm of a conditional ...". "A compiled body that `T` gives one of its methods can call a method on a value of type `X`." Row 1052 limits this only for a generic object that lists `T` first in its `extends` clause. `Late` is not generic.
- **The one failing shape.** "One shape fails the JVM's verification when its class loads: a `typecase` with `self` in one arm and another value in the other ... (row 1070). In that arm, bind `self` at the returned type, as `do r: R = self; r end`." Source: orientation, "Traits and objects", the self-typed paragraph.
- **Traps that do not apply.**
  - Row 815 (`NoSuchMethodError`) needs an object that a `comprises` clause lists. `Ord` has no `comprises` clause.
  - Row 573/1038 needs an overload with `self` not first. `Late`'s `lt` has `self` first, and it implements the abstract `lt` rather than overloading it.
  - Source: `compiler.md`, "Traps of the compiled path".
- **Asserts.** The compiler's library has a two-value `assert` at `ZZ32`, so each part asserts the `ZZ32` field `x` (or a `ZZ32` result). Each program ends `run()` with `println("PASS")` (`tests-writing.md`, "A test program").
- **Switch-over.** No part depends on a limit of the compiler's prelude: `assert` at `ZZ32`, `println` of a `String` and `<` on `ZZ32` exist in both libraries. So the switch-over changes nothing in (a) to (c). Row 1070 is a defect of the code generator (bad bytecode), not a prelude limit, so the switch-over does not fix (d) either.

### (a) `same(self): T = self`

`self` is returned at `X`, the plainest form. It runs today, before the switch-over. It is a plain gated test, and the switch-over does not change it.

`ProjectFortress/compiler_tests/SelfTypedSameCompiled.fss`:

    component SelfTypedSameCompiled
    export Executable

    (* A self-typed trait's default body that returns self runs compiled. *)
    trait Ord[\T extends Ord[\T\]\]
        lt(self, other: T): Boolean
        same(self): T = self
    end

    object Late(x: ZZ32) extends Ord[\Late\]
        lt(self, other: Late): Boolean = x < other.x
    end

    run(): () = do
        assert(same(Late(1)).x, 1, "same returns self")
        println("PASS")
    end

    end

`ProjectFortress/compiler_tests/SelfTypedSameCompiled.test`:

    tests=SelfTypedSameCompiled
    link
    run
    run_out_WIcontains=PASS

Expected result through the harness: link green, run green (PASS printed).

### (b) `larger(self, other: T): T = if lt(other, self) then self else other end`

`self` is returned at `X` from an arm of a conditional. The body calls `lt` with `other`, a value of type `T`, as its `self`. Both forms run (passage above). `lt(Late(2), Late(1))` is `2 < 1`, which is false, so the result is `other`, `Late(2)`. It is a plain gated test, and the switch-over does not change it.

`SelfTypedLargerCompiled.fss`: the same program as (a), except:
- the trait's second member is `larger(self, other: T): T = if lt(other, self) then self else other end`;
- the assertion is `assert(larger(Late(1), Late(2)).x, 2, "larger picks the larger")`.

`SelfTypedLargerCompiled.test`: `tests=SelfTypedLargerCompiled`, `link`, `run`, `run_out_WIcontains=PASS`.

Expected result: green.

### (c) `getter key(): ZZ32` abstract, `keyOf(other: T): ZZ32 = other.key`

A dotted default body calls a getter on a value of type `X`, and the object is not generic. So it runs (orientation: "can call a method on a value of type `X`"; row 1052 covers only a generic object). It is a plain gated test, and the switch-over does not change it.

`SelfTypedKeyOfCompiled.fss` differs from (a) in three places:
- In the trait: `lt(self, other: T): Boolean`, `getter key(): ZZ32` and `keyOf(other: T): ZZ32 = other.key`.
- In `Late`: its `lt` as before, and `getter key(): ZZ32 = x`.
- The assertion: `assert(Late(1).keyOf(Late(2)), 2, "keyOf reads the other's key")`.

`SelfTypedKeyOfCompiled.test`: `tests=SelfTypedKeyOfCompiled`, `link`, `run`, `run_out_WIcontains=PASS`.

Expected result: green.

### (d) `chosen(other: T, y: Any): T = typecase y of s: String => self else => other end`

**Today, before the switch-over.** This is the one shape that fails: a `typecase` with `self` in one arm and another value in the other. The checker accepts it, the link passes, and the run dies with a `VerifyError` when the class that holds the body loads (row 1070). The switch-over does not change this, because it is a code-generator defect.

**The value can still be given compiled.** Change the program as the orientation says: bind `self` at the returned type in that arm. Here the returned type is `T`:

    chosen(other: T, y: Any): T =
        typecase y of
            s: String => do r: T = self; r end
            else => other
        end

The assertion is `assert(Late(1).chosen(Late(2), "s").x, 1, "chosen keeps self for a string")`. The selector `y` is a variable, so row 963 (a numeral as the selector) does not apply. The binder `s` has a type, so row 964 (an untyped tuple binder) does not apply.

**The gated test that checks the value.** `SelfTypedChosenCompiled.fss`, with the workaround above, and `SelfTypedChosenCompiled.test`: `tests=SelfTypedChosenCompiled`, `link`, `run`, `run_out_WIcontains=PASS`. Expected result: green.

**The defect, as written.** The checker accepts the program and the JVM's verification then fails, so the defect is deferred under item 2 of `tests-writing.md`, "How a defect is recorded": a gated `XXX` test that asserts the specification's answer, 1. The run-time pair (`tests-writing.md`, "Writing an `XXX` test"):

- `XXXSelfTypedChosenCompiled.fss`, `component XXXSelfTypedChosenCompiled`: the program with the shape as written. Its `run()` prints `REACHED` first, then asserts as above, then prints `PASS`.
- `SelfTypedChosenCompiledLink.test`: `tests=XXXSelfTypedChosenCompiled` and `link`. It is a plain name, and green because the link passes.
- `XXXSelfTypedChosenCompiled.test`: `tests=XXXSelfTypedChosenCompiled`, `run` (no `link`) and `run_out_contains=REACHED`. It is green ("Saw expected failure") while the run dies.

Two things I settle before I keep the pair:

- **Which `REACHED` key.** I use `run_out_contains=REACHED` if one run shows `REACHED` printed before the `VerifyError`. That is what I expect, since the failing class should load at the first call of `chosen`. If the error comes before `run()` prints, I switch to `run_out_does_not_contain=REACHED`. I settle it by that one run, not by guessing.
- **Whether row 1070's test already covers this form.** If its reproducer is only the `comprises` form, as the orientation says, I keep the pair and add a note to row 1070 that names it (`ledger.py note 1070 ...`). If the reproducer is already this self-typed form, I drop my pair (one test per case) and keep only the plain workaround test.

**Showing the `XXX` pair through the harness.** It is the change's first `XXX` test, so I run it twice (`tests-writing.md`, "Writing an `XXX` test"):
1. As it is: the harness must report an expected failure.
2. With the arm changed for one run to the workaround: the harness must report it red. Then I restore the arm.

### Running them

All in one JVM, the link before the `XXX` run (`tests-running.md`, "Compiled tests"), with my tree's own `climb-batch-N` copy of `junit.sh`:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh selftyped \
        ProjectFortress/compiler_tests SelfTypedSameCompiled.test SelfTypedLargerCompiled.test \
        SelfTypedKeyOfCompiled.test SelfTypedChosenCompiled.test \
        SelfTypedChosenCompiledLink.test XXXSelfTypedChosenCompiled.test > tmp/junit-selftyped.txt 2>&1

Expected: the verdict line `OK (...)`, with the `XXX` run printing `Saw expected failure`. These tests come with no fix, so there is no failing run to show; each is seen to pass through the harness (`tests-writing.md`, "The order").

**Scope:** the compiled path only. Each holds today, and at and after the switch-over, except that (d) as written stays failing until row 1070 is fixed. At that fix, the `XXX` pair is promoted (`tests-writing.md`, "Promoting an `XXX` test").

---

## 36. Porting `kind(x: Number)` with `Int` and `Float` arms, and adding `Meters`

### (a) The test's arms as they are, under walk

Neither assertion gives a value. `Int` and `Float` exist in no library, and a `typecase` arm at a name that names no type gets the undefined message. So walk refuses the program before `run()`: 'Int is undefined.' (and 'Float is undefined.'). The test is red.

The tuple-arm exception of row 1064 does not apply, because these arms are not tuples.

- Passage: orientation, "Numbers", "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist ... A `typecase` arm at such a name ... gets the same message."
- Scope: both paths, before and after the switch-over.

### (b) What I keep

`ProjectFortress/tests/TypecaseNumberKind.fss`, a walk test, gated with no `.test` file:

    component TypecaseNumberKind
    export Executable

    (* typecase over the number types, and a program's own number type below Number. *)
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
        assert(kind(3), "Int", "a numeral at Number is a ZZ32")
        assert(kind(1.5), "Float", "a radix-point numeral at Number is an RR64")
        assert(kind(Meters(2)), "other", "a length is another number")
        assert((Meters(2) + Meters(3)).v, 5, "lengths add")
    end

    end

- **The arms.** I respell `Int` as `ZZ32` and `Float` as `RR64`, and keep the values that the team's lines checked ("Int", "Float"), following `tests-writing.md`: "respell the line and keep the value that it checks".
- **The numerals.** A numeral at `Number` takes its default, so `3` is a `ZZ32` and `1.5` an `RR64` (orientation, "Numbers", "Elsewhere includes ... `Number`").
- **`Meters`.** It extends `Number` and declares its own `+`, so `kind(Meters(2))` gives `"other"`. It is no `ZZ32` and no `RR64`, and the number types are flat siblings (orientation, "Numbers", P-43, P-160).
- **The `+`.** It is declared in the object, not in a trait. So it does not overlap the library's `+` between an array and a number: an object excludes every trait that it does not extend (orientation, "Dispatch and overloading", P-160).
- **No abstract method to cover.** `Number` declares nothing (P-165).
- **The harness.** It decides by no exception, exit 0, and no `fail` in the output. My messages hold no `fail`. I add no expected-output file.

### (c) The planned declaration and mine

- **`object Meters(v: ZZ32) extends ZZ32` under walk:** refused at load, 'Attempt to extend object type ZZ32'. In the interpreter's library, `ZZ32` is a value object (P-178).
- **The planned declaration on the compiled path today, before the switch-over:** the compiler's prelude still declares the seven number types as traits that a type can extend (row 1003). So the checker accepts the object, and the object dies when its class loads (row 866). This is a limit of the prelude, which the switch-over removes. I would not assert either behaviour.
- **Mine, `value object Meters(v: ZZ32) extends Number` with its own `+`:** it loads and runs under walk. "Such a type runs on both paths" (P-160), so it compiles and runs on the compiled path too.
- **Passage:** orientation, "Numbers", "The number types are flat siblings (P-43) ... Do not extend a number type in a program. Declare a program's own number type below `Number` (P-160) ...".

**Lookups:** `$T 'ledger:866'` and `$T 'ledger:1003'`, only if I needed the compiled behaviour of the planned form. I do not use that form.

---

## 37. Porting `shape(v: Any)` with `(Int, String) =>` and `x =>`

### (a) The test as written

**Under walk:** refused before `run()`, with 'x is undefined.'. The team's every-value arm `x =>` reads `x` as a type name, and no type of that name is in scope. Neither assertion runs, and the test is red. The tuple arm `(Int, String)` alone would not stop walk: in a tuple arm, a name that names no type still binds, as a binder that matches any value (row 1064).

**On the compiled path:** the program does not compile. It is refused statically for `x` ('x is undefined.'), and by the rule also for `Int` in the tuple arm: the binding in a tuple arm is stated as walk's departure only.

- Before I relied on the compiled message for `Int`, I would print `$T 'ledger:1064'`. If that row shows that the compiled path binds the name too, the tuple arm would be an untyped binder, which stops the code generator with 'typcase match failure!' (row 964). Either way, nothing compiles or runs.
- Passage: orientation, "Numbers", "A `typecase` arm at such a name, or at any name that names no type in scope, gets the same message. Write an arm over every value as `x: Any =>` ... A name in a tuple arm still binds, so under walk ... (row 1064)."

### (b) What I keep

`ProjectFortress/tests/TypecasePairShape.fss`, a walk test, gated:

    component TypecasePairShape
    export Executable

    (* typecase over a pair's element types, and an arm over every value. *)
    shape(v: Any): String =
        typecase v of
            (ZZ32, String) => "number and text"
            x: Any => "other"
        end

    run(): () = do
        assert(shape((3, "a")), "number and text", "a ZZ32 and a String")
        assert(shape(2.5), "other", "a float is other")
        assert(shape(("b", "a")), "other", "two strings are other")
    end

    end

- **Values.** `3` in the tuple at `Any` takes its default, `ZZ32`, so the pair matches `(ZZ32, String)`. `2.5` is an `RR64`, not a pair, so it gives "other".
- **`shape(("b", "a"))` gives `"other"` under walk.** `ZZ32` names a type, so it is a type test, and `"b"` is not a `ZZ32`. I keep that third assertion because it guards against the tuple-arm binding of row 1064.
- **A form for both paths.** If the helper must also compile, I would write typed binders, as `(n: ZZ32, t: String) =>`: the code generator refuses an untyped tuple binder (row 964, `compiler.md`, "Traps of the compiled path").

### (c) Only the last arm changed (to `x: Any =>`), `(Int, String)` kept

**Under walk:** the program loads, because `Int` in the tuple arm binds as a name (row 1064). Both of the team's assertions pass: `(3, "a")` matches the tuple arm, and `2.5` falls to `x: Any`. So the test is green while it tests nothing about the first element's type. `shape(("b", "a"))` gives `"number and text"`, not `"other"`: `Int` binds `"b"`. This is the departure that row 1064 records, so a plain test must not assert it as correct (orientation, opening of the file).

**On the compiled path:** the program does not compile. 'Int is undefined.' by the rule, which binds names in tuple arms only under walk. Or, if row 1064 shows that the compiled path binds there too, the untyped binder stops the code generator, 'typcase match failure!' (row 964). I would read row 1064 to say which.

**Scope:** walk for the test. The compiled statements hold before the switch-over. These refusals come from the name binding and the code generator, not from the prelude, so I expect no change at the switch-over.

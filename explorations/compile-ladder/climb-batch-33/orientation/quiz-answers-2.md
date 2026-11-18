# Quiz answers: cases 35, 36, 37

Sources read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its parts under `references/` other than `revival-changes.md` and `sources.md`, and the orientation `explorations/compile-ladder/climb-batch-33/orientation/orientation.md` (cited below as "orientation").

## 35. Compiled tests of a program's own ordered type

**Decision.**

Before writing, I would look up these, and act on what they say:
- `explorations/coordinator/tools/facts-extract.sh 'ledger:1070'` and `'ledger:1052'`. These are the two rows that the orientation cites for compiled bodies of a self-typed trait. From 1070 I want its reproducer, to see whether it already holds the self-at-`T` shape of (d) or only the self-at-`R` shape that the orientation describes.
- `git grep -l 'extends Ord\[' ProjectFortress/compiler_tests`, to find a test that already asserts these cases. The brief gives each part a program of its own, so I would still write four programs.

`Ord` is self-typed: it has no `comprises` clause, and its parameter `T` is bounded by `Ord[\T\]` itself (P-146). So in `Ord`'s bodies `self` has the type `Ord[\T\]` ∩ `T`, and returning `self` at `T` is valid without a cast. `Late` extends `Ord[\Late\]` and is a `Late`, so the checker accepts it. `Late` is not generic, so row 1052 (a generic object that lists `T` first) does not apply. `Late`'s `lt` puts `self` first, so rows 573 and 1038 do not apply. `getter` and `abstract` are modifiers that the code generator accepts.

Each part has its own `compiler_tests/<Name>.fss` and `compiler_tests/<Name>.test`. Each `.test` file has the form below, with `<Name>` as each part names it:

    tests=<Name>
    link
    run
    run_out_WIcontains=PASS

- (a) `compiler_tests/SelfTypedSameCompiled.fss`. Today it compiles, links and runs, and `same(Late(1)).x` is 1, because a compiled body of `T` that returns `self` at `X` runs. Expected result: green.

      component SelfTypedSameCompiled
      export Executable

      (* A self-typed trait's default body returns self at its type parameter *)
      trait Ord[\T extends Ord[\T\]\]
          abstract lt(self, other: T): Boolean
          same(self): T = self
      end

      object Late(x: ZZ32) extends Ord[\Late\]
          lt(self, other: Late): Boolean = x < other.x
      end

      run(): () = do
          assert(same(Late(1)).x, 1, "same gives self")
          println("PASS")
      end

      end

- (b) `compiler_tests/SelfTypedLargerCompiled.fss`. It is the same program, with `same` replaced by `larger(self, other: T): T = if lt(other, self) then self else other end` and the assertion `assert(larger(Late(1), Late(2)).x, 2, "larger gives the larger")`. Two passages make it run. A compiled body returns `self` at `X` "also from an arm of a conditional". It can also "call a method on a value of type `X`", which here is `lt(other, ...)` with `other: T`. Today `lt(Late(2), Late(1))` is `false`, so the body answers `other`, and `.x` is 2. Expected result: green.

- (c) `compiler_tests/SelfTypedKeyOfCompiled.fss`. The trait adds `abstract getter key(): ZZ32` and `keyOf(other: T): ZZ32 = other.key`. `Late` adds `getter key(): ZZ32 = x`. The assertion is `assert(Late(1).keyOf(Late(2)), 2, "keyOf reads the other's key")`. Calling a getter on `other: T` is calling a method on a value of type `X`, which the orientation says runs. Expected result: green.

- (d) `compiler_tests/SelfTypedTypecaseSelfCompiled.fss`. As written, the body `chosen(other: T, y: Any): T` is a `typecase` with `self` in one arm and another value in the other. That is the one shape whose compiled body fails the JVM's verification when its class loads (row 1070). The checker accepts the program, and the run dies with a `VerifyError`, so the test as written cannot give the value compiled. The change to the program binds `self` at the returned type in that arm, as the orientation says:

      chosen(other: T, y: Any): T =
          typecase y of
              s: String => do
                  r: T = self
                  r
              end
              else => other
          end

  With the change, `Late(1).chosen(Late(2), "s").x` is 1, asserted as `assert(Late(1).chosen(Late(2), "s").x, 1, "chosen gives self for a string")`. Expected result: green, with the `.test` form above. I would first run the body as written once, to reproduce the `VerifyError`. Then I would record the defect according to row 1070's reproducer:
  - If the reproducer already holds a self-at-`T` case, nothing more is needed. Row 1070 records the defect.
  - If it holds only the self-at-`R` case, I would add the self-at-`T` shape as a gated `XXX` run-time pair. The checker accepts that program and the JVM then fails to verify it, so it is item 2 of "How a defect is recorded". The pair has three files:
    - `compiler_tests/XXXSelfTypedTypecaseSelfAtTCompiled.fss` holds the body as written. It prints `REACHED` before the call.
    - `SelfTypedTypecaseSelfAtTCompiledLink.test` holds `tests=XXXSelfTypedTypecaseSelfAtTCompiled` and `link`, and is green.
    - `XXXSelfTypedTypecaseSelfAtTCompiled.test` holds `tests=XXX...`, `run` and `run_out_contains=REACHED`. It reports `OK Saw expected exception`. If the run dies before `run()` prints, the key is `run_out_does_not_contain=REACHED`.

    I would show this first `XXX` test through the harness twice, as it is (expected failure) and with the failing part removed (red), then restore it.

How I run them: all the new files of the folder go in one JVM, after checking that the five library jars are in `default_repository/caches/bytecode_cache/`:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh ord ProjectFortress/compiler_tests \
        SelfTypedSameCompiled.test SelfTypedLargerCompiled.test SelfTypedKeyOfCompiled.test \
        SelfTypedTypecaseSelfCompiled.test > <tree>/tmp/junit-ord.txt 2>&1

In the command, `N` stands for my tree's real batch folder. Expected verdict: `OK (n tests)`. None of these tests comes with a fix, so each one only needs to be seen passing.

**Path and scope.** These are compiled-path behaviours, today, before the switch-over. The switch-over changes none of them:
- (a) to (c) use only `<` on `ZZ32`, `println` and the `ZZ32` two-value `assert`, which both libraries have. Their behaviour comes from the checker and the code generator, not from the compiler's prelude.
- Row 1070 in (d) is a code-generator or verification defect, not a prelude limit stated "Until the switch-over". It stays until a fix lands. The kept test with the workaround stays green, and an `XXX` pair, if added, goes red only when that fix lands.

**Passages relied on.**
- Orientation, "Traits and objects", paragraph "In a self-typed trait the checker types `self` as the trait met with the implementing type". It gives the definition of self-typed (P-146), the type of `self`, the bodies that return `self` at `X` and run "also from an arm of a conditional", the method call on a value of type `X`, the `typecase` shape of row 1070 with its fix "bind `self` at the returned type, as `do r: R = self; r end`", and row 1052.
- `references/compiler.md`, "What the compiled path cannot compile yet", for the modifiers it accepts. `references/compiler.md`, "Traps of the compiled path", for `self` first (rows 573 and 1038).
- `references/tests-writing.md`, "Where a test goes, and how it passes" (the `.test` keys and `PASS`), "How a defect is recorded" (item 2: a `VerifyError` after the checker accepts the program) and "Writing an `XXX` test" (the run-time pair, `REACHED`, the two runs).
- `references/tests-running.md`, "Compiled tests".
- `references/records.md`, "Reading the record".
- `SKILL.md`, "Rules for every task" (reproduce before you explain, look up ledger rows first).

## 36. Porting `kind` and adding `Meters`

**(a) Decision.** Neither assertion gives a value. The team's `Int` and `Float` do not exist, and a `typecase` arm at a name that names no type gets the message 'Int is undefined.' (and 'Float is undefined.'). So walk refuses the program before `run()` starts, and the plain test is red.

**(b) Decision.** In `ProjectFortress/tests/NumberKindTypecase.fss`, I write `ZZ32` for `Int` and `RR64` for `Float`. I keep the team's result strings, so the values that the port checks stay the same. This is my decision; the other choice is to relabel the strings `"ZZ32"` and `"RR64"`. `Meters` is a program's own number type below `Number`, and its `+` is declared in the object, not in a trait, so it does not overlap the library's `+` between an array and a number.

    component NumberKindTypecase
    export Executable

    (* typecase over Number tells ZZ32 and RR64 apart, and a program's own number type is neither *)
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
        assert(kind(3), "Int", "kind of a ZZ32 numeral")
        assert(kind(1.5), "Float", "kind of an RR64 numeral")
        assert(kind(Meters(2)), "other", "a length is no ZZ32")
        assert((Meters(2) + Meters(3)).v, 5, "lengths add")
    end

    end

At `x: Number`, `3` takes its default `ZZ32` and `1.5` its default `RR64`. `kind(Meters(2))` gives `"other"`: `Meters` is a sibling of `ZZ32` under `Number`, not a `ZZ32`, and a `typecase` does not convert. I run the test with `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/NumberKindTypecase.fss` and expect `OK (1 test)`. I add no expected-output file.

**(c) Decision.**
- **The planned `object Meters(v: ZZ32) extends ZZ32`:**
  - Under walk, it is refused at load: 'Attempt to extend object type ZZ32'. So no assertion runs.
  - On the compiled path today, the compiler's prelude still declares `ZZ32` as a trait that a type can extend (row 1003). So the checker accepts the object, and the object dies when its class loads (row 866).
  - I keep neither form. Before relying on them, I would read rows 866 and 1003 with `facts-extract.sh 'ledger:866'`.
- **My `value object Meters(v: ZZ32) extends Number`:** it loads and runs under walk, where all four assertions pass. It also runs on the compiled path (P-160: "Such a type runs on both paths").

**Path and scope.** (a) and (b) are walk, which is the test's path. In (c), the planned declaration fails on both paths, at load under walk and at class load compiled, today and until rows 1003 and 866 close. Mine runs on both.

**Passages relied on.**
- Orientation, "Numbers":
  - "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist … A `typecase` arm at such a name … gets the same message … write `ZZ32` for `Int` … `RR64` for `Float`".
  - "The number types are flat siblings (P-43) … Do not extend a number type in a program. Declare a program's own number type below `Number` (P-160) … Walk refuses … 'Attempt to extend object type ZZ32' … the checker accepts such an object, and the object dies when its class loads (row 866)".
  - "Elsewhere the numeral takes its default … Elsewhere includes … `Number`".
- Orientation, "Dispatch and overloading", on a program's own `+` (P-160): "Or declare the `+` in an object, not in a trait".
- `SKILL.md`, "Numbers are siblings, not a tower" and "Parallelism and mutable state" (a value object).
- `references/tests-writing.md`, "A test program" and "Where a test goes, and how it passes".

## 37. Porting `shape`

**(a) Decision.** As written, the program does not load under walk. The last arm `x =>` reads `x` as a type name that names no type in scope, so walk stops with 'x is undefined.' and neither assertion runs: the test is red. The tuple arm `(Int, String)` gives no message, because an undefined name in a tuple arm still binds (row 1064). The compiled path stops on the same 'x is undefined.', since the message holds on both paths.

**(b) Decision.** I keep this helper, with every arm over a defined type and the catch-all written `x: Any =>`:

    shape(v: Any): String =
        typecase v of
            (ZZ32, String) => "number and text"
            x: Any => "other"
        end

with these assertions in `run()`:

    assert(shape((3, "a")), "number and text", "a ZZ32 and a string")
    assert(shape(2.5), "other", "an RR64")
    assert(shape(("b", "a")), "other", "two strings")

`3` inside the tuple takes its default `ZZ32`. `shape(("b", "a"))` gives `"other"` under walk, because `"b"` is no `ZZ32`. The file is `ProjectFortress/tests/TypecaseTupleArm.fss`, run with `harness-one.sh`. I expect it green, and add no expected-output file.

**(c) Decision.** If I had changed only the last arm, `(Int, String)` would remain.
- **Under walk:** `Int` binds as a name with no message (row 1064), as `(NoSuchType, ZZ32) =>` takes `("s", 3)`. So the program loads and both assertions pass: the test is green. But the arm takes every pair whose second element is a string, so `shape(("b", "a"))` gives `"number and text"`.
- **On the compiled path:** with an `Any` selector, the checker refuses that arm: 'The typecase clause, Pattern at ..., is unreachable.'

A green walk test here would hide a row 1064 departure, so I do not keep that version. Before citing the row, I would read it with `facts-extract.sh 'ledger:1064'`.

**Path and scope.** These are walk tests. The compiled answers apply today. Row 1064 is a departure on both paths, open until it closes.

**Passages relied on.**
- Orientation, "Numbers", paragraph "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist": "A `typecase` arm at such a name, or at any name that names no type in scope, gets the same message. Write an arm over every value as `x: Any =>`, not as the team's `x =>`. An undefined name in a tuple arm still binds on both paths, with no message (row 1064). So under walk `(NoSuchType, ZZ32) =>` takes `("s", 3)`. Compiled, with an `Any` selector, the checker refuses that arm".
- Orientation, opening section: a sentence that cites a ledger row is not settled, so do not assert it as correct in a plain test.
- Orientation, "Numbers", paragraph "Elsewhere the numeral takes its default", for `3` at `Any`.
- `references/tests-writing.md`, "Where a test goes, and how it passes".

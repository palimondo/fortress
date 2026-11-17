# Quiz answers, reader 2 (cases 29 and 36)

Read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; its parts `build-and-caches.md`, `committing.md`, `compiler.md`, `exploring.md`, `gate.md`, `interpreter.md`, `library.md`, `records.md`, `session.md`, `specification.md`, `tests-running.md`, `tests-writing.md`, `toolchain.md`, `worktrees.md`; and the orientation `explorations/compile-ladder/climb-batch-31b/orientation/orientation.md`. Nothing was run: each answer says what I would run and what I expect it to show.

## 29. Walk's instance for `Cell(z)`

### Decision

1. **Search the record before touching walk** (SKILL.md, "Rules for every task": look for the ledger rows before you investigate a defect or edit the original tree):

       T=explorations/coordinator/tools/facts-extract.sh
       $T 'P-48'                       # a type parameter that a call does not fix takes its bound
       $T 'ledger-find:infer*'         # walk's inference rows (591, 612, 587, 663, 705 ...)
       $T 'ledger-find:instance asString'
       git grep -n 'Cell' ProjectFortress/tests | grep -i asString   # is the case already asserted?

   If a test already asserts the case, I would add nothing to it ("Assert each case in one test only").

2. **Reproduce in a worktree of my own, not in the main tree.** Running code writes into the tree's caches, so I would seed a worktree (`worktrees.md`, "Seeding a worktree") and set up each call as `build-and-caches.md` says. Then I would run a one-off probe under walk that prints the instance, from `tmp/` (it is not a test):

       component CellProbe
       export Executable
       object Cell[\T extends Any\](v: T) end
       run(): () = do
           z: ZZ32 = 3
           println(Cell(z).asString)
       end
       end

       cd ProjectFortress && ../bin/fortress ../tmp/probe/CellProbe.fss

3. **What I expect today: `Cell[\ZZ32\]`.** Walk already infers a generic's static arguments from the arguments' run-time types (`interpreter.md`, "How walk evaluates a program", `inferAndInstantiateGenericFunction`). `z: ZZ32 = 3` binds a `ZZ32`, because a typed binding converts the numeral (orientation, "Numbers", P-173). The orientation gives the same case at another type: "`Cell(0.5)` is a `Cell[\RR64\]`". None of walk's exceptions applies:
   - the bound `Any` does not name `T`, so `T` is not left `OPEN`;
   - `T` has one bound, so row 591 does not apply;
   - `T` is bounded from below by the argument, not only from above, so row 612 does not apply;
   - no function expression fixes `T`, so row 587 does not apply.

   Walk's load refusal of `f[\T extends Any\](x: T)` (`interpreter.md`, "What walk checks") covers an *overloaded* function only. `Cell` has one declaration, so the program loads. The printed form `Name[\Arg\]` is the one that the orientation shows for `BoxU[\OPEN\]`. I would confirm the exact text, for example whether the field is printed too, from the probe's output before I pin it.

4. **The test**, `ProjectFortress/tests/CellInstanceFromArgumentWalk.fss`, gated with no `.test` file:

       component CellInstanceFromArgumentWalk
       export Executable

       (* a constructor call fixes a static parameter from its argument's type *)
       object Cell[\T extends Any\](v: T) end

       run(): () = do
           z: ZZ32 = 3
           assert(Cell(z).asString, "Cell[\\ZZ32\\]", "Cell(z) is a Cell of ZZ32")
       end

       end

   The backslashes are doubled because `\` starts an escape in a string literal. If the probe shows that the escape or the printed form differs, I would use the printed text. Another way to assert the instance, with no string, is a `typecase Cell(z) of Cell[\ZZ32\] => true; else => false end` checked with `assert(..., true, ...)`. Generics are invariant, so only the `ZZ32` instance matches that arm.

5. **I expect the assertion to pass on today's tree, so it is not a failing test.** I would run it through the harness to confirm:

       explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/CellInstanceFromArgumentWalk.fss

   If it is green, the brief's premise does not reproduce. There is no defect to fix, so I would not change walk. "A test that comes with no fix has no failing run: see it pass through the harness." I would keep the test as a plain gated test, unless step 1 found one that already asserts the case. My report would state the result, quoting the harness line. It would also put a decision not taken to the curator: did the brief mean one of the cases where walk really departs? Those are a bound that names `T` (`OPEN`, row 663), or the `Bottom` cases (rows 591, 612, 587, 705). Only if the probe printed something other than `Cell[\ZZ32\]` would the test be the failing test before a fix in `interpreter/evaluator/EvaluatorBase.java`.

### Path and scope

This is walk only, today. The brief is about walk's inference, and the test lives in `ProjectFortress/tests/`. The checker would also fix `T` from the argument statically, but nothing here asks for a compiled test.

### Passages relied on

- `orientation.md`, "Static parameters, `where` clauses and sizes", first rule (P-48): `OPEN` and the three `Bottom` rows.
- `orientation.md`, "Numbers": "`Cell(0.5)` is a `Cell[\RR64\]`", and a typed binding converting a numeral.
- `SKILL.md`, "Fortress as a language", the static parameters bullet.
- `SKILL.md`, "Rules for every task": reproduce before explaining, test before the fix, search the ledger first.
- `interpreter.md`, "How walk evaluates a program": inference from run-time types. Also "What walk checks": the `T extends Any` refusal, for overloaded functions only.
- `tests-writing.md`, "The order" (no fix means no failing run) and "Names, comments, citations" (one case, one test).
- `tests-running.md`, "Interpreter tests".
- `worktrees.md`, "Seeding a worktree".
- `records.md`, "Reading the record".

## 36. Porting `kind` and adding `Meters`

### (a) The team's arms as they are, under walk

- **`kind(3)` gives `"Int"`, so the first assertion passes, but only by accident.** The numeral 3 at a parameter of type `Number` takes its default, `ZZ32` (orientation, "Numbers": "Elsewhere includes … `Number`"). No library declares `Int`, and as a `typecase` arm an undefined team type "takes every value, without a message" (row 959). The `Int` arm matches because it matches everything, not because 3 is an integer.
- **`kind(1.5)` also gives `"Int"`, so the second assertion fails** and the test is red. 1.5 is an `RR64` (default with a radix point), and the first arm, `Int`, takes it before the `Float` arm is reached.

Row 959 is a ledger row, so the behaviour is not settled. I would assert neither of these values in a plain test (orientation, opening: "do not assert it in a plain test").

### (b) What I write

The team's types are replaced by the revived ones: `Int` by `ZZ32` and `Float` by `RR64`. The orientation gives the order: "`ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`". `Meters` is a program's own number type below `Number`, not below `ZZ32`. It declares its own `+` in the object, with `self` first.

`ProjectFortress/tests/KindNumberTypesWalk.fss`, gated with no `.test` file:

    component KindNumberTypesWalk
    export Executable

    (* typecase over the number types, and a program's own number type below Number *)
    value object Meters(v: ZZ32) extends Number
        opr +(self, other: Meters): Meters = Meters(v + other.v)
    end

    kind(x: Number): String =
        typecase x of
            ZZ32 => "ZZ32"
            RR64 => "RR64"
            else => "other"
        end

    run(): () = do
        assert(kind(3), "ZZ32", "kind of an integer numeral")
        assert(kind(1.5), "RR64", "kind of a float numeral")
        assert(kind(Meters(2)), "other", "kind of Meters")
        assert((Meters(1) + Meters(2)).v, 3, "Meters plus Meters")
    end

    end

Choices in this test:

- **The arm strings are now `"ZZ32"` and `"RR64"`.** I renamed the strings with the arms. Keeping `"Int"` and `"Float"` as labels would also work, but would point the reader back to types that do not exist. Each original assertion is kept, with the value that it meant to check: an integer numeral reaches the integer arm, and a float numeral reaches the float arm.
- **`kind(Meters(2))` gives `"other"`.** The number types are siblings, so `Meters` is not a `ZZ32` and reaches the `else` arm (SKILL.md, "Numbers are siblings, not a tower"). If the port wants a length to report itself, add an arm `Meters => "Meters"` before `else`.
- **`Meters` is a `value object`.** `assert` then compares `Meters` values by `SEQV`, field by field (tests-writing.md, "A test program"; orientation, "Traits and objects", `SEQV`).
- **The `+` is declared in the object, not in a trait.** "An object excludes every trait that it does not extend". So this `+` does not overlap the library's `+` between an array and a number, which the Meet Rule would otherwise refuse (orientation, "Dispatch and overloading", last paragraph, P-160). `Number` declares nothing (P-165), so `Meters` has no abstract method to define. `Number` has no `comprises` clause, so walk's comprises check allows the extension.

### (c) The planned declaration and mine, on each path

**Planned: `object Meters(v: ZZ32) extends ZZ32`.**

- **Under walk** it is refused at load, "Attempt to extend object type ZZ32". The number types are value objects (P-43, P-178), and no type of a program extends one. The whole test stops at load and is red.
- **On the compiled path today**, before the switch-over, the compiler's prelude still declares the seven number types as traits that a type can extend (row 1003). So the checker accepts the object, which then dies when its class loads (row 866).
- **After the switch-over**, the compiled path uses the one library, where `ZZ32` is a value object. By my reading the checker would then refuse the declaration statically, but the orientation does not state this outright.

The two documents disagree here, and I would reproduce under walk before relying on either. `interpreter.md`, "Natives", says a program's object that extends `ZZ32` loads, and that a call of a `ZZ32` method bound to a helper then stops with 'getInt not implemented for FOrdinaryObject' (row 551). That passage, and its mentions of the objects `Int`, `Long` and `Float`, predate P-178. The orientation contradicts them: walk refuses at load, and the team's `Int` and `Float` do not exist. I act on the orientation. I would report the `interpreter.md` sentence as stale, for whoever maintains the skill. Either way the declaration is not kept.

**Mine: `value object Meters(v: ZZ32) extends Number`.**

- **Under walk** it loads and runs: the four assertions above pass, and `kind(Meters(2))` gives `"other"`.
- **On the compiled path** "Such a type runs on both paths" (P-160). The test is a walk test, so I would write no compiled test for it.

### Passages relied on

- `orientation.md`, "Numbers":
  - first rule (P-43, P-178, P-160; rows 1003, 866; 'Attempt to extend object type ZZ32');
  - "The team's `Int`, `Long`, `Float` … do not exist" (row 959, and the order of the replacements);
  - the numeral default at `Number`;
  - "`Number` declares nothing" (P-165).
- `orientation.md`, "Dispatch and overloading", the Meet Rule paragraph (P-160: declare the `+` in an object).
- `orientation.md`, opening paragraph: a sentence that cites a ledger row is not asserted in a plain test.
- `SKILL.md`, "Fortress as a language": numbers are siblings.
- `interpreter.md`, "Natives", second gap (row 551). This is the conflicting statement noted in (c).
- `tests-writing.md`, "A test program" (`assert` by `SEQV`) and "Where a test goes, and how it passes" (walk tests in `ProjectFortress/tests/`, no `.test` file, green criteria).

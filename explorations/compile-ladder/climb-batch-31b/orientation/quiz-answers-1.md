# Quiz answers, reader 1 (cases 29 and 36)

What I read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, the area parts under `references/` (build-and-caches, committing, compiler, exploring, gate, interpreter, library, records, session, specification, tests-running, tests-writing, toolchain, worktrees), and the orientation `explorations/compile-ladder/climb-batch-31b/orientation/orientation.md`. I did not open `revival-changes.md`, `sources.md` or `key.md`. In the answers below, "orientation" means that file.

---

## 29. Walk's instance for `Cell(z)`

### Decision

1. **Search the record before I investigate.** From the tree's root, after the setup lines:
   - `T=explorations/coordinator/tools/facts-extract.sh`
   - `$T --check 'ledger-find:infer* instance'`, then `$T 'ledger-find:infer* instance'` and `$T 'ledger-find:infer* constructor'`, and `$T 'ledger:N'` for each row that the finds list.
   - `$T 'infer*'` for FACTS titles, and `$T 'P-48'` for the decision on parameters that a call does not fix.

   If a row already records the defect, its reproducer names the test that I promote or extend, so I do not write a second one.

2. **Reproduce the behaviour before I explain it or change walk.** I write a scratch probe, `tmp/probe/CellInstanceProbe.fss`, with the component named after the file:

       component CellInstanceProbe
       export Executable
       object Cell[\T extends Any\](v: T) end
       which(c: Cell[\ZZ32\]): String = "ZZ32"
       which(c: Any): String = "other"
       run(): () = do
           z: ZZ32 = 3
           println(Cell(z).asString)
           println(which(Cell(z)))
       end
       end

   Then I run it directly under walk: `bin/fortress tmp/probe/CellInstanceProbe.fss`. If it stops, I run it again with `-debug stacktrace`. I use `z: ZZ32 = 3`, a variable, as the brief writes it. The probe reports the instance in two ways:
   - The `asString` line shows how walk prints the instance.
   - The `which` line does not depend on that format. Generics are invariant, so `which(Cell(z))` answers `"ZZ32"` only if the instance is exactly `Cell[\ZZ32\]`. A `Cell[\Any\]`, `Cell[\Bottom\]` or `Cell[\OPEN\]` answers `"other"`.

   The two `which` overloads nest strictly (`Cell[\ZZ32\]` lies inside `Any`), and neither is generic, so walk's load check orders them.

3. **What `Cell(z).asString` gives today: my prediction, which the run settles.**
   - Walk infers a generic call's static arguments from the run-time types of the arguments (`EvaluatorBase.inferAndInstantiateGenericFunction`). Here `z` puts the lower bound `ZZ32` on `T`, and the written bound `Any` is the upper bound.
   - The bound `Any` does not name `T`, so `T` does not stay `OPEN`.
   - The case matches none of the orientation's cases in which walk gives `Bottom` (rows 591, 612, 587): one bound, set from below by an argument, with no function expression.
   - Under route A, a `ZZ32` value's run-time type is `ZZ32` itself (a value object, P-178), not a library object below it.

   So I expect walk to make `Cell[\ZZ32\]` today. `asString` should print a string that names that instance, in the form in which the orientation shows walk printing `BoxU[\OPEN\]`, so something like `Cell[\ZZ32\]`. The skill does not give `asString`'s exact text for a generic object, so I would quote the probe's output, not this prediction.

   One passage of my sources disagrees. `interpreter.md`, "Natives", still names `Int` as "the library's object" that extends `ZZ32`. If that were true, `z`'s run-time type could be `Int`, and the instance `Cell[\Int\]`. The orientation says that `Int` does not exist. This disagreement is one more reason to measure before I predict.

4. **The test's assertion.** The test is `ProjectFortress/tests/GenericObjectArgumentInstance.fss`, a plain name by its topic. It holds the declarations of the probe without the `println`s, and this `run()`:

       run(): () = do
           (* a generic object's constructor takes its instance from its argument's run-time type *)
           z: ZZ32 = 3
           assert(which(Cell(z)), "ZZ32", "Cell(z) is a Cell[\ZZ32\]")
       end

   I assert by dispatch, not by `asString`'s text, because the skill does not fix that text. If the probe shows that `asString` names the instance and the brief wants the text, I would add `assert(Cell(z).asString, "<the text the probe printed for the right instance>", "Cell(z) prints its instance")`. If the disambiguator refuses the name `Cell` as a `FortressLibrary` type ("Type name may refer to"), I rename the object.

5. **Does it fail on today's tree?** By my prediction, no: walk already makes `Cell[\ZZ32\]`, so the assertion passes. Then:
   - The brief's premise does not hold, and there is nothing in walk to fix.
   - I would run the test through `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/GenericObjectArgumentInstance.fss` and see it pass. A test that comes with no fix has no failing run.
   - I would report the premise as a finding, with the probe's command and output, and change no code in walk.

   If the probe shows another instance, the defect is real:
   - I see the plain test fail through `harness-one.sh` on the base's code, before any edit.
   - I fix walk's inference in `interpreter/evaluator/EvaluatorBase.java`.
   - I see the test pass, then run `ant testSystem` once after my last code edit, because this is an edit of walk's Java. Because this edits walk, I also run the demo driver once.

### Path and scope

- This is walk only. The brief and the test are about walk's run-time inference, and the test goes in `ProjectFortress/tests/`, which only walk runs.
- The compiled checker infers statically (P-48, P-51). It is not in question here.
- The switch-over does not change this case.

### Passages relied on

- `SKILL.md`, "Rules for every task":
  - "Reproduce a behaviour before you explain it."
  - "Before you investigate a defect ... look for its rows in the gap ledger."
  - "Write the test before the fix ... see it fail through the harness."
- `SKILL.md`, "Fortress as a language", the static-parameters bullet: "A type parameter that a call does not fix takes its bound. Under walk, one whose bound names the parameter itself stays open."
- `interpreter.md`, "How walk evaluates a program": walk infers the static arguments from the run-time types of the arguments, in `inferAndInstantiateGenericFunction`, with a `LatticeIntervalMap`.
- Orientation, "Static parameters, `where` clauses and sizes", first rule (P-48): the `OPEN` printing as `BoxU[\OPEN\]`, and the three `Bottom` cases (rows 591, 612, 587).
- Orientation, "Numbers", "The number types are flat siblings (P-43)": the seven value objects (P-178).
- Orientation, "The team's `Int`, ... do not exist."
- `interpreter.md`, "Natives": the `Int` (`ZZ32`) passage that conflicts with the two orientation rules above.
- `interpreter.md`, "What walk checks": the refusal of `f[\T extends Any\](x: T)` applies only to an overloaded function, so not to `Cell`'s single constructor. Also the disambiguator's refusal of a program type named after a `FortressLibrary` type.
- `interpreter.md`, "Running a program": `bin/fortress P.fss` and `-debug stacktrace`.
- `tests-writing.md`, "The order: the test, its failure, the fix, the pass": "A test that comes with no fix has no failing run: see it pass through the harness."
- `tests-writing.md`, "A test program": `assert` and its comparison.
- `tests-running.md`, "Interpreter tests" (`harness-one.sh`), and "When to run a whole suite" (walk: `ant testSystem`).
- `tests-running.md`, "Outside the gate": the demo driver after an edit of walk.
- `records.md`, "Reading the record": the queries.

---

## 36. Porting the team's `kind` test, and `Meters`

### (a) The test's arms as they are, before `Meters`

- `kind(3)`:
  - The numeral at a parameter of type `Number` takes its default, `ZZ32`.
  - The first arm, `Int`, takes every value without a message, because `Int` is declared by no library (row 959).
  - So the call gives `"Int"`, and the first assertion passes, but only because the `Int` arm takes everything.
- `kind(1.5)`:
  - The numeral is an `RR64`.
  - The `Int` arm comes first, and it takes every value too.
  - So the call gives `"Int"`, not `"Float"`. The second assertion fails, and the test is red under walk.
- Row 959 is a ledger row, a behaviour that is not settled. So no assertion that I keep may rely on it: by the rules, `Int` and `Float` are undefined types, and as a type each gives 'Float is undefined.'

### (b) What I write and keep

I respell the arms with the revival's names: `Int` becomes `ZZ32`, and `Float` becomes `RR64`. I keep the team's result strings, so every assertion keeps the value that it checks.

I declare `Meters` below `Number`, as a value object of its own. I declare its `+` in the object, not in a trait. Being an object, it excludes every trait that it does not extend, arrays among them, so its `+` does not break the Meet Rule against the library's generic `+` between an array and a number.

The file is `ProjectFortress/tests/NumberKindTypecase.fss`:

    component NumberKindTypecase
    export Executable

    (* typecase over the flat number types; a program's own length type is a Number, not a ZZ32 *)

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
        assert(kind(Meters(2)), "other", "kind of a Meters")
        assert((Meters(1) + Meters(2)).v, 3, "Meters addition")
    end

    end

The values:
- `kind(3)` gives `"Int"` (the `ZZ32` arm).
- `kind(1.5)` gives `"Float"` (the `RR64` arm).
- **`kind(Meters(2))` gives `"other"`.** The number types are siblings, and `Meters` extends `Number` only, not `ZZ32`, so neither number arm takes it.
- `Meters(1) + Meters(2)` adds by `ZZ32`'s `+`, which raises `IntegerOverflow` on overflow, as `ZZ32` does. I assert the field, `.v`, which is 3.

How the harness reads it:
- The test goes in `ProjectFortress/tests/`, so it is gated with no `.test` file.
- It is green if it throws nothing, exits 0, and prints no `fail` or `FAIL`.
- I add no expected-output file.
- I run it with `harness-one.sh` and see it pass. I see it fail first only if it goes with a fix.
- Before I add it, I `git grep` for an existing test of the same cases, and I check whether row 959 already has a reproducer (`$T 'ledger:959'`). I would not assert row 959's behaviour in this plain test.

### (c) The planned `object Meters(v: ZZ32) extends ZZ32`, and mine

- **Planned declaration, under walk:** walk refuses it at load: 'Attempt to extend object type ZZ32'. `ZZ32` is a value object (P-178), and no type of a program extends a number type (P-43). The whole test is refused, so it is red, and none of its assertions runs.

  `interpreter.md`, "Natives", still describes the older behaviour: such an object loads, and the first helper call stops with 'getInt not implemented for FOrdinaryObject' (row 551). I rely on the orientation, which names the decision and the message. If the point mattered to my task, I would confirm it with one direct run and report the stale passage.
- **Planned declaration, on the compiled path today, before the switch-over:** the compiler's prelude still declares the number types as traits (row 1003). So the checker accepts the object, and the object dies when its class loads (row 866). The plan fails on both paths.
- **Mine, under walk:** it loads and runs. `Meters` extends only `Number` (P-160), and its object-level `+` meets the Meet Rule by exclusion. I expect the four assertions to pass. I would confirm this through `harness-one.sh`.
- **Mine, on the compiled path:** the test is a walk test, so no compiled suite runs it.
  - `Meters` extends no number type, so rows 1003 and 866 do not apply.
  - The selector of the `typecase` is a parameter, not a numeral, so row 963 does not apply either.
  - The skill gives no case for a program's own object below `Number` compiled against the prelude. If the brief needed a compiled answer, I would compile the program with `bin/fortress compile` and report what it does, not assert it here.

### Path and scope

- (a) and (b) are about walk, for a walk test in `ProjectFortress/tests/`.
- (c) covers walk, and the compiled path today, before the switch-over, where rows 1003 and 866 belong to the compiler's prelude. After the switch-over, the one library declares the number types as value objects, so the checker should refuse an object below `ZZ32` there too. I state that only as what the rule implies.

### Passages relied on

- Orientation, "Numbers", "The team's `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` do not exist":
  - As a type, each is undefined.
  - As a `typecase` arm, each takes every value without a message (row 959).
  - "write `ZZ32`, `ZZ64`, `RR64`, `ZZ` and `NN64`, in that order."
- Orientation, "Numbers", "The number types are flat siblings (P-43)":
  - P-178, the value objects.
  - "No type of a program extends a number type. Declare a program's own number type below `Number` (P-160)."
  - Walk's refusal 'Attempt to extend object type ZZ32'.
  - The prelude's traits (row 1003), and the death at class load (row 866).
- Orientation, "Numbers", the default rule ("Elsewhere includes ... `Number`"): `3` is a `ZZ32`, and `1.5` an `RR64`.
- Orientation, "Dispatch and overloading", the Meet Rule paragraph (P-160): "declare the `+` in an object, not in a trait: an object excludes every trait that it does not extend."
- Orientation, "Traits and objects", strict equivalence (P-168): a value object without `=` compares field by field, and so does `assert`.
- `SKILL.md`, "Fortress as a language": numbers are siblings, not a tower.
- `SKILL.md`, the description of `ProjectFortress/tests/` and of the original tree.
- `tests-writing.md`:
  - "A test program": `assert` under walk compares by `SEQV` without an `=`, and a parameter must not take the name of a library functional method.
  - "Where a test goes, and how it passes": the walk folder, no `.test` file, the green rule.
  - "Names, comments, citations": name a test by its topic; one comment line; assert each case in one test only; keep every assertion and the value that it checks.
  - "How a defect is recorded".
- `interpreter.md`, "Natives", the second gap (row 551), which conflicts with the orientation, as noted.
- `compiler.md`, "Traps of the compiled path", the numeral `typecase` selector (row 963).
- `tests-running.md`, "Interpreter tests": `harness-one.sh`.
- Orientation, opening paragraph: a sentence that cites a ledger row is not settled, so a plain test does not assert it as correct.

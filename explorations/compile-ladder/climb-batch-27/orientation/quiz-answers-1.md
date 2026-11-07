# Quiz answers, reader 1

Cases: 5, 12, 16, 21, 26, 27, 28, 29. Sources read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, the area parts under `references/` (not `revival-changes.md`, not `sources.md`), and `explorations/compile-ladder/climb-batch-27/orientation/orientation.md` (below, "the orientation"). I ran nothing, so each claim below rests on the passage cited. Where a claim needs a run, I name the run.

## 5. `double seconds = elapsed / 1e9;`

**Decision.** With `elapsed: ZZ64`:

    seconds: RR64 = asFloat(elapsed) / 1.0E9

(`1000000000.0` works as well as `1.0E9`.) Do not write `elapsed / 1000000000`: `/` on two integers answers a `QQ`. Do not write `elapsed / 1.0E9` either: a `ZZ64` does not convert into `RR64` implicitly.

If `elapsed` were a `ZZ32`, the same line still works, because every number type declares its own `asFloat` (P-165). There the `asFloat` is optional: a `ZZ32` converts into `RR64` implicitly, so `elapsed / 1.0E9` gives the same `RR64`. Only for `ZZ64` is `asFloat` required.

**Path and scope.** Walk. On the compiled path before the switch-over, the compiler's library has no `QQ` and declares `/` only at `RR64`. Before I claimed the line compiles, I would check that the compiler's prelude declares `asFloat` for `ZZ64` (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi`).

**Passages.** Orientation, "Numbers": "`/` on two integers answers a `QQ` ... For a float, make one operand a float ... Convert each `ZZ64` operand with `asFloat`, as `asFloat(s) / asFloat(n)`. Until the switch-over, the compiler's library has no `QQ` and declares `/` only at `RR64`". Orientation, "`Number` declares nothing (P-165)": "Each of the eight number types ... declares its own `asFloat` into `RR64`". `library.md`, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`."

## 12. `SUM` over `Money`

**Decision.**
- `Money` extends `AdditiveGroup[\Money\]`. `SUM` is generic over `AdditiveGroup`, and the algebra is self-typed, so a type that extends `AdditiveGroup[\A\]` must itself be an `A`. `Money` extends it at `Money`.
- It must define `opr +(self, other: Money): Money = Money(self.cents + other.cents)`. It must also define every other abstract member that `AdditiveGroup` and its supertraits declare. I would look these up in `Library/FortressLibrary.fsi` before writing; I expect the identity `zero` and the two `-` operators. Bodies must cover each inherited abstract member at its parameter types. Otherwise walk refuses the object at load (P-147).
- I would make it a `value object Money(cents: ZZ64)`, or give it its own `=` and make it extend `Equality[\Money\]`. A plain `object` is a reference object, so under `SEQV` it equals only itself. Two equal sums would then compare `false`, and `assert` would not reach an `=` of its own.
- The sum. Always write the static argument, and give the value a declared type:

      total: Money = SUM[\Money\][j <- 0#n] fee(j)
      total2: Money = SUM[\Money\][m <- g] m        (* g: a generator of Money values *)

- An empty range. The specification's answer is the group's identity, `Money`'s zero. Under walk today, a `SUM` with a written static argument that is not a number type ends in `CastError` (row 436). If I left the static argument out and gave no declared type, it would give the integer 0 (row 716). Neither is correct. Do not assert today's result as correct in a test. First read row 436 (`explorations/coordinator/tools/facts-extract.sh 'ledger:436'`). If its reproducer is already an `XXX` test, add nothing. If not, write an `XXX` test that asserts the specification's zero (`tests-writing.md`, "How a defect is recorded", item 2).

**Path and scope.** Walk, with the departures above. On the compiled path before the switch-over, this cannot compile: the compiler's prelude runs reductions over `ZZ32` ranges only, and they give a `ZZ32` or a `String`. After the switch-over, the checker refuses a `SUM` without `[\Money\]` (row 731). `Money` is an object, so it excludes the library's arrays and `Number`, and its `+` does not meet the library's `+` between an array and a number (P-160 concerns an open trait).

**Passages.** `library.md`, "The curator's decisions on the library": "`SUM` and `PROD` are generic over `AdditiveGroup` and `MultiplicativeRing`. Write the element type wherever generators stand in brackets ... The checker refuses a call without it (ledger row 731) ... An empty `SUM` with no static argument written and no declared type gives the integer 0 ... (ledger row 716). With a static argument written that is not a number type, such as a user group, an empty or filtered `SUM` ends in `CastError` (ledger row 436)." Orientation, "Reductions and comprehensions" (the same three departures), "Traits and objects" (P-147; self-typed traits: "The checker refuses a type that extends `T[\A\]` and is not an `A`"), and "Where a type declares no `=`" (P-168). `SKILL.md`, "Fortress as a language": "The algebra is self-typed traits, such as `AdditiveGroup[\T\]` with `+`". `compiler.md`, "What the compiled path cannot compile yet": "Its reductions give a `ZZ32` or a `String`." `tests-writing.md`, "A test program", on `assert` and `Equality`.

## 16. `n: NN32 = 3`

**Decision.** Under walk, the binding does not work. A numeral does not bind to `NN32` (row 454). Write:

    n: NN32 = unsigned(3)

On the compiled path, the checker types `3` as `IntLiteral`, which converts to the integer types (P-76). So `n: NN32 = 3` should compile there. A compile today checks against the compiler's prelude, not the interpreter's library. So I would compile the compiled test once to confirm before relying on it. I would also check that the prelude declares `unsigned` (`grep -n unsigned ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi Library/CompilerLibrary.fsi`) before writing `unsigned(3)` in a compiled test. In a walk test, use `unsigned(3)`.

**Path and scope.** The refusal is a known departure of walk (row 454), on walk only. The compiled path follows P-76.

**Passages.** `tests-writing.md`, "A test program": "Under walk, a numeral does not bind to `NN32` or `NN64` ... (ledger row 454). Write `a: NN32 = unsigned(5)`, not `a: NN32 = 5`." Orientation, "Under walk a numeral has a run-time class": "The checker types an integer numeral as `IntLiteral`, a sibling under `Number` that converts to the integer types, `QQ` and `RR64` (P-76)."

## 21. The library's generic `+` and `-` between an array and a number, beside `AdditiveGroup`'s

**Decision, the library.** The pairs are a valid overloading, so the library needs no change. In a self-typed trait, the checker's test of whether two domains exclude each other gives `self` the intersection type of `AdditiveGroup[\X\]` and `X` (P-157). It also puts the meet of a static parameter's bounds in the parameter's place (P-157). With both readings, the generic operators' domains exclude `AdditiveGroup`'s own. Walk reads `self` the same way and loads the library's pair. To confirm, the count stage on the library should keep `#total 0` (`explorations/coordinator/tools/checker-count/run.sh`, in the background).

**Decision, my own test program.**
- Under walk, it loads if two conditions hold:
  - my trait is self-typed directly, as `trait G[\X extends G[\X\]\]`, not only through another self-typed trait that it extends;
  - the trait's `+` and `-` have no static parameters of their own.

  In either of those two cases, walk's load check refuses the pair. That refusal is not the verdict of the rules. I would also make my traits exclude the library's `Number`, or arrays: a program's trait that declares a functional `+` meets the library's array-and-number `+`. Otherwise walk refuses the program at load: "fails the Meet Rule" (P-160). My own generic operators would meet the library's in the same way unless my number trait excludes `Number`. Each type that extends `G[\A\]` must be an `A` (row 893). Walk checks a program against the library only when it analyses the library (row 342). So I would run the test through `harness-one.sh` with `COLD_CACHE=1`.
- Does it compile? The checker accepts it, by P-157. Nothing in it is a code-generator wall. A body in `G` that returns `self` would compile, but the class would fail the JVM's verification at load (row 695), so `G` should have no such body. I would confirm by running `fortress compile` on it before claiming it.

**Path and scope.** The verdict (valid) is the checker's under P-157, and walk agrees for the library's pair. Walk's refusal in the two cases above is a departure of walk only.

**Passages.** Orientation, "Traits and objects", the paragraph after the definition of a self-typed trait: "There `self` has the intersection type of `T[\X\]` and `X` (P-157). With this reading and the bounds that the test reads ("Dispatch and overloading"), the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way ... Walk's load check, which is not the verdict ..., still refuses the pair in two cases". Orientation, "Dispatch and overloading" (P-157 bounds; P-160 on `excludes { Number }`). `interpreter.md`, "What walk checks" (rows 893, 342).

## 26. Comparisons across number types

**(a) Decision.**

    if asFloat(count) = limit then ... end

`count = limit` with `count = 3` (a `ZZ64`) and `limit = 3.0` gives `false`, with no error. No coercion carries a `ZZ64` into an `RR64`, so `=` is `SEQV`, and values of different types are never equivalent. `asFloat(count) = limit` matches Java, which also converts the `long` to `double` for `==`.

The condition stays the same for `count: ZZ32` and for `count: QQ`, because each number type declares its own `asFloat`. For `ZZ32`, plain `count = limit` would also work, because `ZZ32` converts into `RR64` implicitly. For `QQ` it would not: `1/2 = 0.5` is `false`.

**(b) Decision.** The generic declaration as asked cannot work. `Number` declares nothing, so a body over `T extends Number` cannot call `asFloat(a)`. Walk would run it, but the count stage would report an error. So write one overload for each of the eight number types, with each header in the api and each body in the component (the export check matches headers):

    near(a: ZZ32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: ZZ64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: NN32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: NN64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: ZZ,   b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: QQ,   b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: RR32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: RR64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9

A numeral argument needs no ninth overload. Under walk, a numeral is an `Int` and takes the `ZZ32` overload. The checker reads a numeral that ties overloads only at its own position as `ZZ32`.

Checks:
- Before the edit, write a walk test of the eight types and see it fail through `harness-one.sh`.
- After the edit:
  - run the test with `COLD_CACHE=1`, because a new overload set can make walk refuse every program at load;
  - run the count stage, expecting `#total 0`;
  - run the demo driver once, because this is a library edit.

**Path and scope.** (a) is for walk. The checker chooses the coercion statically (P-59), with the same results. (b) must hold on both: walk, and the checker's count stage against the interpreter's library.

**Passages.** Orientation, "`Number` declares nothing (P-165)": "generic code over `T extends Number` can call nothing on a `T`, not even `asFloat`. Two numbers of different types compare by `=` only where a coercion carries one into the other. Otherwise `=` is `SEQV` ... and answers `false` without an error: `1/2 = 0.5` is `false`, as is a `ZZ64` against an equal `RR64`. To compare values across types, write `asFloat(x) = y`." Orientation, "Arguments convert by declared coercions" (the numeral tie rule). `library.md`, "The curator's decisions" (`ZZ32` implicit into `RR64`) and "Designing a change" (api headers, export check, new overloads). `interpreter.md`, "What walk checks" (row 342, cold cache). `tests-running.md`, "Outside the gate" (demos).

## 27. `trait Wide excludes { String }` with its own `+`

**Decision.**
- Under walk: no. Started from an empty cache, as in the suites, walk refuses the program at load with "fails the Meet Rule". `Wide` declares a functional `+`. Because `Number` is open, that `+` meets the library's `+` between an array and a number, and `excludes { String }` does not prevent it (P-160).
- The cache matters. A direct run on a filled cache can load and pass, because walk checks against the library only when it analyses the library (row 342). So run it through `harness-one.sh` with `COLD_CACHE=1`.
- The compiled checker, checking against the interpreter's library, would accept the program as written. That is a known departure: it refuses such a pair inside one component, but not against the library's `+` (row 918). Do not take its acceptance as proof.
- The change: `trait Wide excludes { String, Number }`. Making `Wide` exclude arrays would also do. Then both paths accept it, and the assertion `(WideOf(1) + WideOf(2)).big = 3` passes under walk.
- A second point: `big` is one of the library's functional-method names. The rule says that the disambiguator refuses a variable or a parameter of that name. A getter is neither, so I do not expect a refusal. If the cold run prints "Variable big is already declared", rename the getter, for example to `width`.

**Path and scope.** Walk refuses, and that refusal is correct under P-160. The checker's acceptance is the departure of row 918.

**Passages.** Orientation, "Dispatch and overloading", last paragraph: "a program's trait that declares its own functional `+` overlaps the library's `+` between an array and a number, because `Number` is open (P-160). Declare the trait `excludes { Number }`, or make it exclude arrays. Otherwise walk refuses the program at load: 'fails the Meet Rule'. The checker refuses such a pair in one component, but accepts it against the library's `+` (row 918)." `interpreter.md`, "What walk checks" (row 342). `tests-writing.md`, "A test program" (`big` as a reserved functional-method name).

## 28. Value objects, a string, and a four-element tuple, under `assert`

**Decision.**
- `assert(Point(1, 2), Point(1, 2), "point")` passes. `Point` declares no `=`, so `assert` compares by strict equivalence (`SEQV`), and a value object is equivalent field by field. Its fields are equal `ZZ32` values.
- `assert(Run(s, 3), Run("abc", 3), "run")` fails. This is not a defect: it is the rule (P-168). Under `SEQV`, a string is a reference object, equivalent only to itself. `s` is built at run time by `||`, so it is not the literal's object. Keep a check that compares the parts:

      r = Run(s, 3)
      assert(r.name = "abc" AND r.steps = 3, "run")

  Alternatively, give `Run` an `=` that compares `name` by the string's `=`, and make `Run` extend `Equality[\Run\]` so that `assert` reaches it.
- `assert((1, 2, 3, s), (1, 2, 3, "abc"), "four")` fails. This is a known defect: the library declares `=` on pairs and triples only (row 923). So a four-element tuple falls back to `SEQV`, and the string built apart is not equivalent. Do not assert today's `false` as correct. Read row 923 (`facts-extract.sh 'ledger:923'`) for its reproducer, and add an `XXX` test only if the row has none and the specification settles the answer. The check I keep:

      (a, b, c, d) = (1, 2, 3, s)
      assert((a, b, c) = (1, 2, 3) AND d = "abc", "four")

**Path and scope.** Walk. The orientation says that `SEQV` follows the specification on both paths.

**Passages.** Orientation, "Traits and objects", "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)": "a value object is equivalent field by field, a tuple element by element ... a reference object, a string among them, is equivalent only to itself. So a value object without its own `=` that holds a string is not `=` to an equal one built apart. Nor is a tuple of four or more elements, because the library declares `=` on pairs and triples only (row 923)." Orientation, introduction: "A sentence that cites a ledger row states a known departure ... do not assert it as correct in a test." `tests-writing.md`, "A test program": `assert` reaches a type's own `=` only through a `FortressLibrary` trait such as `Equality`, otherwise `assert(x = y, msg)`. `interpreter.md`, "Natives": `||` builds a `CatString` only past 32 characters, so `s` is a separately built flat string.

## 29. Which instance `Cell(z)` makes under walk

**Decision.** Printing cannot show the instance. `Cell(z).asString` gives `Cell[\ZZ32\]` today, although the value is a `Cell[\Int\]`: walk instantiates the generic at the numeral's run-time class `Int`, and prints `Int` by the trait's name (row 364).

Before changing walk:
- Read row 364 (`facts-extract.sh 'ledger:364'`) and list the `XXX` files (`git ls-files 'ProjectFortress/*XXX*'`). If a test already reproduces this, promote it instead of adding one.
- Check the instance with a type test, not a print. Run a probe directly from `ProjectFortress/`:

      isZZ32Cell(c: Any): Boolean =
        typecase c of
          Cell[\ZZ32\] => true
          else => false
        end

  Expect `false` today, because generics are invariant and the instance is `Cell[\Int\]`. Walk's own error messages also still say `Int`, so an error on the value, seen with `-debug stacktrace`, would show the class too. If the probe printed `true`, the premise would not hold, and I would report that instead of changing walk.

The test is `ProjectFortress/tests/CellInstanceZZ32.fss` (a plain name), with this assertion:

    z: ZZ32 = 3
    assert(isZZ32Cell(Cell(z)), "Cell(z) instance")

Run it through `harness-one.sh` on the base's code and see it fail. Then make the fix and see it pass.

**Path and scope.** Walk only. The checker infers `T` statically as `ZZ32`.

**Passages.** Orientation, "Under walk a numeral has a run-time class": "Walk gives a numeral the class `Int`, `Long` or `BigNum` by its value. These classes stand for `ZZ32`, `ZZ64` and `ZZ`, but a generic instantiates at the class. Walk prints these classes by the traits' names, also inside static arguments, so a printed type does not show the instance: `Cell(3)` prints `Cell[\ZZ32\]` but is a `Cell[\Int\]` (row 364). Walk's own error messages still say `Int`." `SKILL.md`, "Fortress as a language" ("Generics are invariant") and "Rules for every task" (reproduce before explaining). `tests-writing.md`, "The order" and "Promoting an `XXX` test". `interpreter.md`, "Where a fix of walk belongs" (walk evaluates `typecase` itself).

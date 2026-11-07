# Quiz answers, reader 2 (cases 5, 12, 16, 21, 26, 27, 28, 29)

Sources read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; its parts under `references/` except `revival-changes.md` and `sources.md`; the orientation `explorations/compile-ladder/climb-batch-27/orientation/orientation.md` (cited below as "orientation"). `$T` is `explorations/coordinator/tools/facts-extract.sh`.

---

## 5. Porting `double seconds = elapsed / 1e9;`

**Decision.** With `elapsed: ZZ64`:

    seconds: RR64 = asFloat(elapsed) / 1.0E9

(`1000000000.0` instead of `1.0E9` if the lexer does not take the exponent form; the point is a float divisor.) Not `elapsed / 1000000000`: `/` on two integers answers a `QQ`, so that gives a rational, not a float. Not `elapsed / 1.0E9` either: a `ZZ64` does not convert into `RR64` implicitly, so no `/` fits the pair under walk.

With `elapsed: ZZ32`, the same line works and I would keep it. Every number type declares its own `asFloat` into `RR64`. Here `asFloat` is optional: `elapsed / 1.0E9` also works, because a `ZZ32` converts into `RR64` implicitly and walk applies that coercion at the call. Use `var seconds: RR64 = ...` only if the Java code assigns to `seconds` again.

**Path and scope.** This is for walk, as asked. The same line is what the checker takes after the switch-over (`asFloat` is explicit). Before the switch-over, the compiled path's library has no `QQ` and declares `/` only at `RR64`. Before I put the line into a compiled test, I would grep `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` and `Library/CompilerLibrary.fsi` for an `asFloat` on `ZZ64`. If there is none, the line does not compile before the switch-over. That is a limit of the compiler's prelude, and I would not fix it there (compiler.md, "The compiler's prelude, until the switch-over").

**Passages.** Orientation, "Numbers": "`/` on two integers answers a `QQ` ... For a float, make one operand a float, as `(1.0 s) / n` for `ZZ32` values ... Convert each `ZZ64` operand with `asFloat`, as `asFloat(s) / asFloat(n)`. Until the switch-over, the compiler's library has no `QQ` and declares `/` only at `RR64`." Orientation, "`Number` declares nothing (P-165)": "Each of the eight number types ... declares its own `asFloat` into `RR64`." library.md, "The curator's decisions on the library": "`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`." Orientation, "Arguments convert by declared coercions": walk converts at a call by the run-time value.

---

## 12. `SUM` over `Money`

**What I look up first.** I would read `trait AdditiveGroup` in `Library/FortressLibrary.fsi` to get the abstract members and their exact headers, and the declaration of `SUM` to get its bound. I would also print ledger rows 731, 716 and 436 with `$T 'ledger:731'` and the same for the other two. If row 436's reproducer names an `XXX` test, I would read it too.

**Which trait, and what it declares.** `SUM` is generic over `AdditiveGroup`, a self-typed trait. So `Money` extends `AdditiveGroup[\Money\]`. A type that extends `T[\A\]` must be an `A`, and `Money` is a `Money`. `Money` must give a body for every member that `AdditiveGroup` leaves abstract, at the `.fsi`'s headers: at least `+`, and whatever identity (zero) and negation or subtraction the trait declares. Walk refuses at load an object without static parameters that leaves an inherited abstract method uncovered. I would make it a `value object`, so that `=` (`SEQV`) compares it field by field and `assert(total, Money(6), "...")` works. A plain object is equivalent only to itself.

    value object Money(cents: ZZ64) extends AdditiveGroup[\Money\]
        opr +(self, other: Money): Money = Money(cents + other.cents)
        (* plus each other abstract member of AdditiveGroup, at the .fsi's header,
           e.g. its zero as Money(0) and its negation/subtraction *)
    end

I would write no `override` on these members. An `override` at the inherited declaration's own types overrides nothing, so walk refuses it at load, and the code generator refuses every `override`.

**How to write the sum.** Write the static argument in the clause form, and bind the result to a declared type:

    total: Money = SUM[\Money\][m <- ms] m          (* or SUM[\Money\][i <- 0#n] Money(c[i]) *)

The checker does not infer the static argument of `SUM` (row 731). Walk would also take it from the declared type of `total`.

**Empty range.** The specification's answer is the group's identity, `Money`'s zero (`Money(0)`). Walk does not give it today:
- with `SUM[\Money\]` written, which is not a number type, an empty or filtered `SUM` ends in `CastError` (row 436);
- with no static argument and no declared type, an empty `SUM` gives the integer 0, whatever the body's type (row 716).

So code that must work today guards the empty case. A test of the empty sum asserts `Money(0)`, and is an `XXX` test, because the specification settles the answer. If row 436 already names such a test, I would not add a second one. I would never assert `CastError` or `0`.

**Path and scope.** The non-empty sum runs under walk. Before the switch-over, the compiled path cannot do it: the compiler's prelude runs reductions only over `ZZ32` ranges, and they give only a `ZZ32` or a `String`. A compiled test would be an `XXX` test that names that limit. After the switch-over, the checker requires `SUM[\Money\]`.

**Passages.** library.md, "The curator's decisions on the library", the `SUM` bullet: generic over `AdditiveGroup`; write the element type; rows 731, 716 and 436. Orientation, "Reductions and comprehensions": "Walk instantiates a reduction at its value's declared type ... a written static argument that is not a number type ends an empty `SUM` in `CastError` (row 436)". SKILL.md, "Fortress as a language": "The algebra is self-typed traits, such as `AdditiveGroup[\T\]` with `+`". interpreter.md, "What walk checks", gives the inherited-abstract refusal and row 893 ("Make each type that extends `T[\A\]` an `A`"). Orientation, "Traits and objects": "`override` widens"; `SEQV` (P-168). compiler.md, "What the compiled path cannot compile yet": the prelude's reductions.

---

## 16. `n: NN32 = 3`

**Decision.** Under walk the binding fails: a numeral does not bind to `NN32` (row 454). In a walk test I write:

    n: NN32 = unsigned(3)

The failure is a known departure (row 454), not the language's rule. The checker types the numeral as `IntLiteral`, which converts to every integer type (P-76). So `n: NN32 = 3` is the correct form, and I would not assert walk's failure as correct. If my test were about this binding, it would be an `XXX` test that asserts the specification's answer. First I would check row 454's reproducer for an existing one (`$T 'ledger:454'`).

**Path and scope.** On the compiled path, I expect `n: NN32 = 3` to compile: the integer literal is folded, typed `IntLiteral` and converted to `NN32`. I would confirm it with one `fortress compile`. Before the switch-over, I would grep the compiler's prelude (`CompilerBuiltin.fsi`, `CompilerLibrary.fsi`) for `unsigned`. If it is not declared there, a test for both paths needs its own text on each path: `unsigned(3)` under walk, `3` compiled. After the switch-over, the one library has `unsigned`, so `unsigned(3)` works on both paths. Walk's refusal of the plain numeral lasts until row 454 is fixed.

**Passages.** tests-writing.md, "A test program": "Under walk, a numeral does not bind to `NN32` or `NN64` ... (ledger row 454). Write `a: NN32 = unsigned(5)`, not `a: NN32 = 5`." Orientation, "Under walk a numeral has a run-time class": "The checker types an integer numeral as `IntLiteral`, a sibling under `Number` that converts to the integer types, `QQ` and `RR64` (P-76)." SKILL.md, "The phases": the compiled path folds integer literals before the checker. Orientation preamble: a sentence that cites a ledger row is a departure, "so do not assert it as correct in a test".

---

## 21. Generic array-number `+`/`-` beside `AdditiveGroup`'s

**The library's pairs: valid, and nothing in the library changes.** In the checker's test of whether two domains exclude each other, `self` in a method of a self-typed trait such as `AdditiveGroup[\X\]` has the type `AdditiveGroup[\X\]` met with `X` (P-157). Exclusion is read over the whole tuple of parameter types (P-152), with the meet of declared bounds in place of a static parameter that stands as a whole parameter type (P-157). Read so, the library's generic `+` and `-` between an array and a number, with the number on either side, are valid beside the `+` and `-` that `Vector` and `Matrix` inherit from `AdditiveGroup`. Walk already reads `self` the same way and loads the library's pair. I would answer the brief so, with the citations, and leave the library unchanged. If I had to prove it on the checker, I would run the count stage in the background (`explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`, about 150 s) and read the table: no error at these operators, and `#total 0`.

**My own test program, of the same shape.** A sketch:

    trait Grp[\X extends Grp[\X\]\] excludes { Number }       (* self-typed directly *)
        opr +(self, other: X): X                              (* no static parameters of its own *)
    end
    trait Num excludes { Number }  getter v(): ZZ32  end
    object N(v: ZZ32) extends Num end
    trait Arr[\E extends Num\] excludes { Num }  getter first(): E  end
    object Vec[\E extends Num\](first: E) extends { Arr[\E\], Grp[\Vec[\E\]\] }
        opr +(self, other: Vec[\E\]): Vec[\E\] = Vec[\E\](first)
    end
    opr +[\E extends Num\](a: Arr[\E\], n: E): Arr[\E\] = a
    opr +[\E extends Num\](n: E, a: Arr[\E\]): Arr[\E\] = a

- **Walk: it loads.** Walk reads `self` as the checker does, and loads such a pair in a program's own component too. It loads it only if both of these hold, and I build the program so that they do:
  - `Grp` is self-typed directly, with `X` bounded by `Grp[\X\]` itself, and not only through another self-typed trait that it extends;
  - `Grp`'s operator has no static parameters of its own.

  In either of those two cases, walk's load check refuses the pair even though it is valid; that check is not the verdict. My trait that declares its own functional `+` must also exclude `Number`, or arrays. Otherwise walk refuses the program at load against the library's own array-number `+` ("fails the Meet Rule", P-160). By the same reading, my number trait excludes `Number`, so that my generic `+` does not overlap the library's either. I would show the load through `harness-one.sh` with `COLD_CACHE=1`, because walk checks a program against the library only when it analyses the library (row 342).
- **Compiled: it compiles; the checker accepts the pair (P-157).** Against the interpreter's library, the checker would not object to the `+` either way (row 918). Before the switch-over, a compile checks against the compiler's prelude. So I would:
  - grep the prelude for `trait Number`, and drop the `excludes { Number }` clauses from the compiled copy if the prelude lacks it (the prelude has no array types, so the clause is not needed there);
  - avoid a `Grp` body that returns `self` (row 695: `VerifyError` at class load), `override` (row 650) and array literals.

  I would confirm with `fortress compile`. If the checker refused the pair, that is a departure from P-157. I would record it as an `XXX` compile test with `compile_err_contains`, and a ledger row.

**Passages.** Orientation, "Traits and objects", the paragraph after "In a self-typed trait": "When the checker applies the overloading rules ... There `self` has the intersection type of `T[\X\]` and `X` (P-157). With this reading ..., the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component. Walk's load check ... still refuses the pair in two cases". Orientation, "Dispatch and overloading": P-152, P-157, and "a program's trait that declares its own functional `+` overlaps the library's `+` between an array and a number, because `Number` is open (P-160) ... (row 918)". interpreter.md, "What walk checks": row 342 and `COLD_CACHE=1`. compiler.md, "What the compiled path cannot compile yet" and "Traps of the compiled path"; orientation row 695.

---

## 26. Comparisons across number types

**(a) `count == limit`.** Write:

    if asFloat(count) = limit then ... end

- `count = limit` for `count = 3` (a `ZZ64`) and `limit = 3.0` gives `false`, without an error. No coercion carries a `ZZ64` into an `RR64`, so `=` is `SEQV`, and values of different types are never equivalent.
- With `asFloat`, it gives `true`. It is also exactly Java's semantics: Java converts the `long` to `double` before `==`.
- `count: ZZ32`: the same line works and I keep it. Here a bare `count = limit` would also give `true`, because `ZZ32` converts into `RR64` implicitly.
- `count: QQ`: the same line works, since `QQ` declares its own `asFloat`. A bare `count = limit` gives `false`, as `1/2 = 0.5` does.

**Path and scope.** This is for walk, and for the one library after the switch-over. Before the switch-over, the compiler's library declares no `=` over `Any` and has no `QQ`. There, a bare cross-type `=` is not `false` but has no declaration. I would check the prelude for `asFloat` on `ZZ64` before using the line in a compiled test.

**(b) `near` for any number type.** A generic `near[\T extends Number\]` cannot call `asFloat(a)`. `Number` declares nothing (P-165), so the checker, and with it the count stage, refuses the call on a `T`. Walk would run it only because it has no static types. So I declare one overload at each of the eight number types, in `Library/FortressLibrary.fsi`, with the same headers and bodies in `Library/FortressLibrary.fss`:

    near(a: ZZ32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: ZZ64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: NN32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: NN64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: ZZ,   b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: QQ,   b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: RR32, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9
    near(a: RR64, b: RR64): Boolean = |asFloat(a) - b| <= 1.0E-9

No overload at `IntLiteral` is needed. A numeral under walk is an `Int`, `Long` or `BigNum`, which stand for `ZZ32`, `ZZ64` and `ZZ`. On the checker, the overloads tied by coercion differ only at the numeral's position, so the checker reads the numeral as `ZZ32`.

Before writing the overloads I would check, in `FortressLibrary.fsi`:
- that the eight number types exclude each other, so that the overloads are valid, and how the library already declares a top-level function at each number type, to follow that form;
- the absolute-value operator on `RR64` (`|x|`), or else use a chained comparison;
- that no `near` already exists.

**Steps.**
1. Write a walk test first, `ProjectFortress/tests/NearAcrossNumberTypes.fss`, and see it fail through `harness-one.sh`.
2. Add the declarations.
3. Run the test with `COLD_CACHE=1`, because a new overload can make walk refuse every program at load.
4. Run the count stage in the background and expect `#total 0`.
5. Run the demo driver once, because the interpreter's library changed.

**Passages.** Orientation, "`Number` declares nothing (P-165)": "generic code over `T extends Number` can call on a `T` no method or operator that the number types declare, `asFloat` among them. Two numbers of different types compare by `=` only where a coercion carries one into the other. Otherwise `=` is `SEQV` ..., and answers `false` without an error: `1/2 = 0.5` is `false`, as is a `ZZ64` against an equal `RR64`. To compare values across types at known types, write `asFloat(x) = y`. In generic code, declare the function at each number type instead." Orientation, "Where a type declares no `=`" (P-168), and its "Until the switch-over, the compiler's library declares no `=` over `Any`". library.md, "The curator's decisions on the library" (`ZZ32` converts implicitly, `ZZ64` only by `asFloat`) and "Designing a change" (api and component headers; a new overload and walk's load). Orientation, "Arguments convert ...": the numeral tie rule. compiler.md, "The checker's time": the count stage. tests-running.md, "Outside the gate": the demos.

---

## 27. `trait Wide excludes { String }` with its own `+`

**Under walk: no, it does not pass in the suites.** `Wide` declares its own functional `+` and excludes neither `Number` nor arrays. `Number` is open, so `Wide`'s `+` overlaps the library's generic `+` between an array and a number, and no declaration covers the meet. Walk refuses the program at load: "fails the Meet Rule" (P-160). The suites start from empty caches, so the test is red there. A direct run, or `harness-one.sh` on a filled cache, can load it and pass, because walk checks a program against the library only when it analyses the library (row 342). Such a pass proves nothing. I would show the refusal with `COLD_CACHE=1`.

**The checker: yes.** Checking against the interpreter's library, the compiled checker accepts the original program. It refuses such a pair inside one component, but accepts it against the library's `+`. That is a departure (row 918), not a verdict.

**The change.** Make the trait exclude `Number` (or arrays), keeping `String`:

    trait Wide excludes { String, Number }

Both paths then accept the program, and the assertion `(WideOf(1) + WideOf(2)).big` = 3 passes. A `-`, `MIN` or `MAX` of the trait would need the same exclusion.

A secondary check: `big` is named as a functional method of the library, and the rule forbids that name for a variable or a parameter. Here it is a getter, which the rule does not name. I would watch the cold harness run for "already declared" or a clash between a dotted and a functional method, and rename the getter if one appears.

**Passages.** Orientation, "Dispatch and overloading": "a program's trait that declares its own functional `+` overlaps the library's `+` between an array and a number, because `Number` is open (P-160). Declare the trait `excludes { Number }`, or make it exclude arrays. Otherwise walk refuses the program at load: 'fails the Meet Rule'. The checker refuses such a pair in one component, but accepts it against the library's `+` (row 918). Give a trait with its own functional `-`, `MIN` or `MAX` the same exclusion." interpreter.md, "What walk checks": row 342, `COLD_CACHE=1`. tests-running.md: the suites delete `test-caches` when they start. tests-writing.md, "A test program": `big` as a library functional method name.

---

## 28. Value objects, strings and tuples under `assert`

**Which pass.** None of the types declares its own `=`, so `assert` compares by the library's `=` over `Any`, which is `SEQV`.

- `assert(Point(1, 2), Point(1, 2), "point")`: **passes.** A value object is equivalent field by field, and the fields are equal `ZZ32` values.
- `assert(Run(s, 3), Run("abc", 3), "run")`: **fails.** A string is a reference object, equivalent only to itself. `s = "ab" || "c"` is built apart from the literal `"abc"`, so the `name` fields are not equivalent, and the value objects are not either.
- `assert((1, 2, 3, s), (1, 2, 3, "abc"), "four")`: **fails.** The library declares `=` only on pairs and triples. A four-element tuple falls back to `SEQV` element by element, and `s` is not `SEQV` to `"abc"`.

**Defect? No, for both failures.** These `false` answers are P-168's rule, so they are correct. I would assert them as correct, not record them as a defect.

**The checks I would keep.** To check content, compare the parts, using `String`'s `=`, which compares text:

    r = Run(s, 3)
    assert(r.name = "abc", "run name")
    assert(r.steps, 3, "run steps")
    assert(s = "abc", "four: string element")    (* the numeric elements are literals; a triple of them can be asserted with =, which the library declares on triples *)

The other way is to give `Run` its own `=` that compares `name` by `=` and `steps`. Then make `Run` extend `Equality[\Run\]`, because under walk `assert(x, y, msg)` reaches a type's own `=` only through such a library trait (row 807). Otherwise write `assert(x = y, msg)`. If the test's purpose is the equality rule itself, keep the strict answers:

    assert((Run(s, 3) = Run("abc", 3)) = false, "SEQV on a value object holding a string built apart")
    assert(((1, 2, 3, s) = (1, 2, 3, "abc")) = false, "SEQV on a four-tuple")

The point assertion stays as written.

**Path and scope.** This holds under walk, and `SEQV` follows the specification on both paths. Before the switch-over, the compiled library has no `=` over `Any` and none on tuples, so these assertions do not carry over to a compiled test as written.

**Passages.** Orientation, "Where a type declares no `=`, `=` is strict equivalence, `SEQV` (P-168)": "a value object is equivalent field by field, a tuple element by element ...; a reference object, a string among them, is equivalent only to itself. So a value object without its own `=` that holds a string is not `=` to an equal one built apart. The library declares `=` on pairs and triples only, so a tuple of four or more elements that holds such a string is not `=` either. Both `false` answers are the rule's: assert them as correct. To compare by content, give the value object an `=`, or compare the parts. A string's `=` compares text. Under walk, `=/=` and `assert(x, y, msg)` reach a type's own `=` only if the type extends a library trait that declares `=`, such as `Equality` (row 807). Otherwise write `assert(x = y, msg)`." tests-writing.md, "A test program", the `assert` bullet.

---

## 29. Which instance does `Cell(z)` make under walk today?

**Before anything.** I would read row 364 (`$T 'ledger:364'`) and search the ledger (`$T 'ledger-find:instance class Int'`) for rows about walk instantiating at the numeral's class.

**How I check today's instance.** Not by printing. Walk instantiates a generic at the value's run-time class, `Int` for a `ZZ32` value. It prints that class by the trait's name, also inside static arguments. So `Cell(z).asString` gives `Cell[\ZZ32\]` today, although the value is a `Cell[\Int\]`, and no `Cell[\ZZ32\]`. A printed type does not show the instance.

I check by a type test that tells `Cell[\ZZ32\]` from `Cell[\Int\]`, which is possible because generics are invariant. I would use dispatch on two nested overloads (or a `typecase` with a `Cell[\ZZ32\]` arm and an `else` arm). I would run it directly (`cd ProjectFortress && ../bin/fortress tests/X.fss`) and through `harness-one.sh`, to reproduce today's answer, `false`, before I explain or change anything.

**The test** (plain name, in `ProjectFortress/tests/`). It fails through the harness on the base's code, before I edit walk, and passes after the fix:

    component CellInstanceAtDeclaredType
    export Executable

    (* Cell(z) for z: ZZ32 makes the instance Cell[\ZZ32\] *)
    object Cell[\T extends Any\](v: T) end

    isCellZZ32(c: Cell[\ZZ32\]): Boolean = true
    isCellZZ32(c: Any): Boolean = false

    run(): () = do
        z: ZZ32 = 3
        assert(isCellZZ32(Cell(z)), true, "Cell(z) is an instance at ZZ32")
    end

    end

The assertion `assert(isCellZZ32(Cell(z)), true, ...)` fails today: `Cell[\Int\]` is no `Cell[\ZZ32\]`, so the `Any` overload answers `false`. It passes once walk makes `Cell[\ZZ32\]`. I would not assert on `asString`, which prints `Cell[\ZZ32\]` both before and after the fix.

**Path and scope.** This is walk only. The checker types `z` statically as `ZZ32`, and a compiled call instantiates at the static type. The fix is in walk's inference, `interpreter/evaluator/EvaluatorBase.java`, `inferAndInstantiateGenericFunction`. After the fix, I would run `ant testSystem` once, because the edit changes walk's Java.

**Passages.** Orientation, "Under walk a numeral has a run-time class": "Walk gives a numeral the class `Int`, `Long` or `BigNum` by its value. These classes stand for `ZZ32`, `ZZ64` and `ZZ`, but a generic instantiates at the class. Walk prints these classes by the traits' names, also inside static arguments, so a printed type does not show the instance: `Cell(3)` prints `Cell[\ZZ32\]` but is a `Cell[\Int\]`, and no `Cell[\ZZ32\]` (row 364)." SKILL.md, "Fortress as a language": "Generics are invariant"; "Rules for every task": reproduce before you explain, and check the ledger before you investigate. tests-writing.md, "The order": the test, its failure, the fix, the pass. interpreter.md, "How walk evaluates a program": `inferAndInstantiateGenericFunction`. tests-running.md, "When to run a whole suite": `ant testSystem` for an edit of walk.

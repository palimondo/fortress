# Quiz answers, reader 1

Sources read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; its parts `build-and-caches.md`, `session.md`, `worktrees.md`, `toolchain.md`, `interpreter.md`, `compiler.md`, `library.md`, `specification.md`, `exploring.md`, `tests-writing.md`, `tests-running.md`, `gate.md`, `committing.md`, `records.md`; and the orientation `explorations/coordinator/consolidation-2026-10-22/evidence/orientation/orientation.md` (cited below as "orientation"). Cases: questions 1 to 20. "Setup lines" means the four lines of `build-and-caches.md`, "Setting up each call". `$T` is `explorations/coordinator/tools/facts-extract.sh`.

## 1. Running `explorations/probes/Probe.fss` on both paths, and whether it is well typed

**Decision.**

1. Work in a tree whose caches no other agent uses: if the brief names none, seed one (`explorations/coordinator/tools/seed-worktree.sh <base-build> <new-worktree> <branch>`).
2. Walk, in a call that starts with the setup lines: `bin/fortress explorations/probes/Probe.fss` (the same as `bin/fortress walk ...`). If it stops, run it again with `bin/fortress -debug stacktrace explorations/probes/Probe.fss` to see the Java stack.
3. Compiled path: check that `default_repository/caches/bytecode_cache/` holds the five library jars (`fortress.AnyType.jar`, `fortress.CompilerBuiltin.jar`, `fortress.CompilerLibrary.jar`, `fortress.CompilerAlgebra.jar`, `CompilerSystem.jar`), and run the library order if any is missing. Then:

       cd ProjectFortress
       ../bin/fortress compile ../explorations/probes/Probe.fss
       ../bin/fortress run Probe

   If the compile fails, read its error. Do not read the run's "Could not load Probe / Resource not found", which only follows from the 0-byte jar.
4. Well typed: a walk run settles nothing, because walk does not check types. I settle it with the compiled checker: `../bin/fortress typecheck ../explorations/probes/Probe.fss` (or the compile). `typecheck` stops after the checker, so it tells a type error apart from a code-generator wall (`sayWhat` or another `CompilerError`), which is not a type error. If the checker refuses, I sort the error into one of four kinds: a real type error in the program; a declaration that the compiler's prelude lacks (array types, ranges that are not `ZZ32`, the two-value `assert` at types other than `ZZ32`, `String` and `Character`); a known departure of the checker (`$T 'ledger-find:<words of the error>'`, and the orientation's rules); or a gap that the record does not hold yet, which I record. My report says that the verdict holds against the compiler's prelude, the library that the checker uses for programs until the switch-over.
5. Report each path's output, two to five lines with the command. If the two paths differ, I treat that as a defect: search the ledger, and record it as `tests-writing.md`, "How a defect is recorded", says.

**Path and scope.** Both paths. The typing verdict is the compiled checker's, against the compiler's prelude until the switch-over. Walk gains static types only when it runs the checker, after the switch-over (P-12).

**Passages.** `SKILL.md`, "The phases" ("A program that runs under walk can be ill-typed"; "A type error stops the compile"); orientation, "Implementation limits" ("A walk run does not prove a program well typed"); `interpreter.md`, "What walk checks" (`typecheck` uses the compiler's prelude); `compiler.md`, "The `fortress` commands", "Running", "What the compiled path cannot compile yet"; `build-and-caches.md`, "The library order"; `worktrees.md`, "Seeding a worktree"; `tests-writing.md`, "A test program" (the compiler's `assert`).

## 2. The specification and walk disagree on an empty argument, and a team test asserts walk's value

**Decision.**

1. Check what the specification's passage is. Is it the team's prose, or an api listing generated from the `.fsi` (which shows the library itself and cannot justify a change)? Grep its chapter's `\note{}` boxes. Look for an Appendix I entry or a `\revision` callout on it.
2. Search the record before I call it a conflict: `$T 'ledger-find:<function> empty'`, `$T 'positions:<words>'`, `$T '<words>'`, and a grep of FACTS and POSITIONS. Also read the orientation's rules.
3. If a decision of the curator says which side is correct, the other side is wrong:
   - If the specification is correct and my change repairs the library: write a plain test that asserts the specification's value, and see it fail through the harness on the base. Then fix the library and see the test pass. The team's test then breaks. Keep every assertion, respell its line only as far as the decision allows, and report that line's before and after as a changed line of a team test.
   - If the specification is correct and the fix is deferred: write a gated `XXX` test (`tests/XXXName.fss`) that asserts the specification's value.
   - If the library is correct: my test asserts walk's value, and I record the specification's departure (Appendix I entry's effect, ledger row).
4. If no decision settles it, it is a conflict: two of the team's sources disagree (the specification against the library and its implementation; the team's test only shows what the implementation meant). Then I switch to exploring. The curator settles conflicts. So:
   - my test asserts today's behaviour, walk's value;
   - I write a ledger row for the open question with `ledger.py add` (or put it in my report if I may not edit the ledger);
   - I leave the team's test unchanged;
   - I report a decision not taken: the question; each source with its date; the solutions and what each changes; and that asserting walk's value keeps the current behaviour.

**Path and scope.** Walk and the interpreter's library. The compiled path does not link this library before the switch-over.

**Passages.** `SKILL.md`, "When to explore" (conflict; the team's sources); `specification.md`, "When the text and an implementation disagree", and its paragraph on generated api listings and `\note{}` boxes; `tests-writing.md`, "How a defect is recorded" (items 1 to 3), "Names, comments, citations" (team test lines); `exploring.md`, "The procedure" (steps 1, 2, 11); `records.md`, "Reading the record".

## 3. `describe[\T extends Shape\](b: Box[\T\])` beside `describe(b: Box[\Circle\])`

**Decision.** Keep the pair. The Working Draft's ban on overloads that differ in their static parameters is gone (P-45). The generic's declared domain is `Box[\T\]` for every `T extends Shape`, which includes `Box[\Circle\]`. So the non-generic declaration is strictly more specific, and both return `String`, which fits at every instance. The pair is valid.

For an argument of type `Box[\Circle\]`, `describe(b: Box[\Circle\])` runs on both paths. The order in which the two are written does not matter: walk chooses by declared parameter types, never by order, and the compiled dispatch method tests from the most specific declaration to the least.

Before I land it, I write a walk test in `ProjectFortress/tests/` that calls both, and see it fail on the base. Since a new overload in the library can stop every program at load, I also run that test after the edit. I run the count stage too, to see no new checker error. If walk refuses the pair at load, I look up the row in the orientation's list (rows 539, 416, 786, 412, 759, 779, 780, 788, 787) and in `interpreter.md`, "What walk checks", rather than reorder or reshape the declarations.

**Path and scope.**
- Walk: loads it. For a pair of which at least one is generic, walk checks the No Duplicates, Meet and return-type rules on declared domains, except in the listed cases.
- Checker: accepts it (both paths apply the rules to declared domains). Compiled programs reach `Library/` only after the switch-over.

**Passages.** Orientation, "Dispatch and overloading" ("Overloads may differ in their static parameters (P-45)"; "Walk chooses by declared parameter types, never by the order of the declarations"; "Walk's load check is not the specification's verdict"); `SKILL.md`, "Fortress as a language" (dispatch) and "The compiled run time" (dispatch method order); `interpreter.md`, "What walk checks"; `library.md`, "Designing a change" (a new overload can stop every program).

## 4. `f(ZZ64)` beside `f(Number)` on a `ZZ32`; `pick[\T extends Number\]` on a `ZZ32` and a `ZZ64`

**Decision.** `f(n)` gives `"number"`. `f(x: Number)` applies to the `ZZ32` with no conversion, and a conversion never changes which declaration runs when one already fits. So the coercion into `ZZ64` is not used.

`pick(n, m)`, with a `ZZ32` and a `ZZ64`, runs at `T = ZZ64`: promotion instantiates a generic at the narrowest type into which all its arguments coerce. The `ZZ32` argument is converted to `ZZ64`, and the result is a `ZZ64`. It is not `T = Number`, and it is not "Ambiguous coercion".

I would confirm both on each path with a probe, since the compiled path checks against the compiler's prelude until the switch-over.

**Path and scope.** Both paths (P-59, P-74). Walk converts at the call by the run-time value. The checker chooses the coercion statically.

**Passages.** `SKILL.md`, "Fortress as a language" ("Numbers are siblings ... A conversion never changes which declaration runs when one already fits"); orientation, "Numbers" ("Arguments convert by declared coercions, and a generic call promotes (P-59, P-74)", with the example `f[\T\](a: T, b: T)` on a `ZZ32` and a `ZZ64` running at `ZZ64`).

## 5. Porting `double seconds = elapsed / 1e9;`

**Decision.** With `elapsed: ZZ64`, convert explicitly:

    seconds: RR64 = asFloat(elapsed) / 1000000000.0

Before writing it, I would grep `Library/FortressLibrary.fsi` for `asFloat` to see whether it is functional, `asFloat(elapsed)`, or dotted, `elapsed.asFloat()`, and write that form. I write the constant with a radix point so that it is an `RR64`.

With `elapsed: ZZ32` the line need not be the same. `ZZ32` converts into `RR64` implicitly, so `seconds: RR64 = elapsed / 1000000000.0` works: walk converts the `ZZ32` operand at the call. Keep the radix point. Without it, the division is between integers.

**Path and scope.** Walk, as asked. It is the curator's decision on the library, so it holds on the compiled path after the switch-over.

**Passages.** `library.md`, "The curator's decisions on the library" ("`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`"); orientation, "Numbers" (walk converts at a call by the run-time value).

## 6. A Java string hash, `h = 31 * h + c`, that relies on wraparound

**Decision.** Use the wrapping operators, fully parenthesised:

    h := ((31 DOTTIMES h) DOTPLUS c)        (* ⨰ and ∔ *)

with `var h: ZZ32 = 0` declared before the loop. If the loop runs over characters, make its generator `seq(...)`, because each step reads the `h` of the step before.

- Under walk, `∔` and `⨰` wrap on overflow as Java's `int` does. Plain `31 h + c` would raise `IntegerOverflow` instead.
- On the compiled path before the switch-over, the program is checked and linked against the compiler's prelude, not the interpreter's library where the curator's wrapping operators are. I would grep `LibraryBuiltin/CompilerBuiltin.fss`, `Library/CompilerLibrary.fss` and `Library/CompilerAlgebra.fss` for `DOTPLUS`/`DOTTIMES`/`∔`/`⨰`.
  - If they are absent, the compile is refused. I do not add them to the prelude, which is deleted at the switch-over. A compiled test of this would be an `XXX` compile test with `compile_err_contains` naming the refusal.
  - If they are present, I check the wrap with a compiled run on an overflowing input.
- After the switch-over, the compiled path uses the interpreter's library and wraps.

**Path and scope.** Walk: wraps. Compiled before the switch-over: depends on the compiler's prelude, which I would look up as above. After the switch-over: wraps on both.

**Passages.** `library.md`, "The curator's decisions on the library" (wrapping operators; full parentheses); `SKILL.md`, "Numbers are siblings" ("Overflow raises `IntegerOverflow`"), "Parallelism and mutable state" (`seq`); `compiler.md`, "The compiler's prelude, until the switch-over"; `tests-writing.md`, "Writing an `XXX` test".

## 7. The tolerance 10 to the power `-k`

**Decision.** Write an `RR64` base:

    tol: RR64 = 10.0^(-k)

An integer power answers its base's type.

- Under walk (the interpreter's library), `10^(-k)` with `k > 0` raises `IntegerOverflow`, because only the bases 1 and -1 have a negative power, and 0 raises `DivisionByZero`. With `k = 0` it gives 1. With `k < 0` it is an ordinary positive `ZZ32` power.
- On the compiled path before the switch-over, the compiler's `ZZ32` power gives 0 at a negative exponent, silently (rows 441, 523).
- After the switch-over, the compiled path behaves as walk does.

**Path and scope.** As above, by path and by switch-over (P-153).

**Passages.** Orientation, "Numbers" ("An integer power answers its base's type (P-153) ... For a fraction, write `2.0^(-1)` or `(2/3)^(-1)`, not `10^(-k)`. Until the switch-over, the compiler's `ZZ32` power gives 0 at a negative exponent (rows 441, 523)").

## 8. Summing an `RR64` array with a `for` loop and `var acc`

**Decision.** The loop as described is a race:

    var acc: RR64 = 0.0
    for i <- a.indices() do acc += a[i] end      (* wrong: parallel iterations write acc *)

A `for` loop is parallel unless every generator is `seq(...)`, and `acc := acc + x` without `atomic` loses updates. The direct run printed the right sum only because the setup lines set `FORTRESS_THREADS=1`. The suites run at four threads, once each, so the test may pass or fail from run to run, and a pass proves nothing.

I write it as a reduction, the library's way:

    sumAll(a: Array[\RR64, ZZ32\]): RR64 = SUM[\RR64\][i <- a.indices()] a[i]

I would first look up in `Library/FortressLibrary.fsi` the array's type and how it names its index generator, and follow it. If the brief insists on the loop, I make the generator sequential, `for i <- seq(a.indices()) do acc += a[i] end`, or put the update in `atomic do acc += a[i] end`.

Two more points:
- A parallel `SUM` can add in another order than a sequential loop. So the test uses values whose sums are exact (small integers or halves as `RR64`), so that the assertion does not depend on the order.
- I run the test at one thread directly (`FORTRESS_THREADS=1 bin/fortress ...`) and at four through `harness-one.sh`.

**Path and scope.** Walk. On the compiled path before the switch-over this does not compile: the compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`, and its reductions give only `ZZ32` or `String`.

**Passages.** `SKILL.md`, "Parallelism and mutable state" (the race; four threads; "A passing run does not prove that there is none"); `interpreter.md`, "Running a program" (`FORTRESS_THREADS` is 1 in the setup); `library.md`, "The curator's decisions on the library" (`SUM`, its static argument); `tests-writing.md`, "Names, comments, citations" (one thread and four); `compiler.md`, "What the compiled path cannot compile yet".

## 9. `total(n: ZZ32): RR64` as a sum of `g(j)`, passing the count stage and walk

**Decision.** In a component of the interpreter's library, outside the compiler's files, declare `total(n: ZZ32): RR64` in its `.fsi`, and in its `.fss` write:

    total(n: ZZ32): RR64 = SUM[\RR64\][j <- 0#n] g(j)

The static argument must be written: the checker does not infer it for `SUM` and refuses the call without it (row 731).

`total(0)` gives the `RR64` zero, `0.0`. The written argument is a number type, so the empty sum is neither the integer 0 of row 716, which needs no argument and no declared type, nor the `CastError` of row 436, which needs an argument that is not a number type.

Test first: a walk test in `ProjectFortress/tests/` that asserts `total(0)` is `0.0` and a non-empty case, seen to fail on the base and to pass after the edit. Then I run the count stage (`explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`) and compare its table with the base's, to show no new error.

**Path and scope.** Walk and the checker's count stage over the interpreter's library. Compiled programs link it only after the switch-over.

**Passages.** Orientation, "Reductions and comprehensions" ("Write it in every clause form, as `SUM[\ZZ32\][j <- 0#n] f(j)` (row 731)"; empty `SUM`, rows 716 and 436); `library.md`, "The curator's decisions on the library" (`SUM` paragraph) and "Designing a change"; `compiler.md`, "count stage"; `tests-writing.md`, "The order".

## 10. `object Tag[\T\]() end` and `mk[\T\](): Tag[\T\]`, with no bounds written

**(a)** `Tag[\(ZZ32, ZZ32)\]()` runs under walk: an unbounded parameter is bounded by `Any`, which holds tuples. It does not compile before the switch-over: the compiled path bounds an unbounded type parameter by `Object`, so it rejects every generic instantiated at a tuple type (row 412).

**(b)** In `t = mk()`, the call does not fix `T`, so `T` takes its bound (P-48), not `Bottom` and not Scala's `Nothing`. Under walk, `T` is `Any`, so `t` is a `Tag[\Any\]`. In the checker, `T` is the intersection of its upper bounds, narrowed by the expected type, and `t` has none. So it is `Any` by P-48, but on the compiled path before the switch-over the bound is `Object` (row 412), so I would expect `Object` there and confirm it with a compile.

**(c)** `u: Tag[\ZZ32\] = mk()` compiles: the checker narrows `T` by the expected type, so `T = ZZ32`. Under walk there is no expected type: `mk()` has no arguments to infer from, so `T` takes its bound and the call yields a `Tag[\Any\]`. Generics are invariant, so I expect the typed binding to fail at run time. I would run it to confirm, and search the ledger (`$T 'ledger-find:expected type bound'`, row 705 and its neighbours) for the row that holds it, or record one.

**Path and scope.** As given per part.

**Passages.** `SKILL.md`, "Fortress as a language" (static parameters: bound `Any`, which holds tuples; a parameter that a call does not fix takes its bound; invariance); orientation, "Static parameters, `where` clauses and sizes" (P-48; P-51 and row 705); `compiler.md`, "Traps of the compiled path" (row 412).

## 11. `Temp extends { Comparable[\Temp\], Comparable[\RR64\] }`

**Decision.** Do not keep it. No type may extend two instantiations of one generic trait (the exclusion rule, P-43, P-97). Walk runs it (row 416), but the compiled checker refuses it, and without the rule such programs die with `IncompatibleClassChangeError`. A walk run is no evidence that it is valid.

Write one instantiation, and declare the comparison with `RR64` as an ordinary overload on `Temp`:

    object Temp(k: RR64) extends Comparable[\Temp\]
        lessThan(other: Temp): Boolean = k < other.k
        lessThan(other: RR64): Boolean = k < other
    end

The two parameter types exclude each other: `Temp` is an object, a leaf, that does not extend `RR64`. Before settling, I would look at how the library orders mixed operands. A wider type declares a `coerce` from each narrower one, so a `coerce` from `RR64` into `Temp` with a single `lessThan(other: Temp)` is the alternative. I would follow whichever the library practises (`library.md`, "Designing a change").

**Path and scope.** The rule holds on both paths by the curator's decision. Only the checker enforces it today.

**Passages.** `SKILL.md`, "Traits and objects, no classes" ("No type may extend two instantiations of one generic trait"); orientation, "Traits and objects" ("The compiled checker applies the exclusion rule, and walk does not (P-43, P-97)"); `library.md`, "Designing a change"; `SKILL.md`, "Numbers are siblings" (`coerce`).

## 12. `SUM` over `Money` values

**Decision.** `SUM` is generic over `AdditiveGroup`. So:

    object Money(cents: ZZ64) extends AdditiveGroup[\Money\]
        opr +(self, other: Money): Money = Money(cents + other.cents)
        (* and every other abstract member of AdditiveGroup *)
    end

`Money` extends `AdditiveGroup[\Money\]`, a self-typed trait, and declares `opr +` and every other abstract member of that trait. I would print `AdditiveGroup` in `Library/FortressLibrary.fsi` and define each of its abstract members, its zero and negation for example: walk refuses at load an object that leaves an inherited abstract method uncovered, and P-147 requires bodies that cover the parameter types.

Write the sum with its static argument: `SUM[\Money\][m <- ms] m`.

A sum over an empty range does not give a `Money` zero today. With a written argument that is not a number type, an empty or filtered `SUM` ends in `CastError` (row 436). I would guard the empty case in code that meets it. A test that asserts the specification's answer, the identity, would be an `XXX` test, unless row 436 already names one.

**Path and scope.** Walk. On the compiled path before the switch-over, the compiler's reductions give only `ZZ32` or `String`, so no `Money` sum compiles.

**Passages.** `library.md`, "The curator's decisions on the library" (`SUM` generic over `AdditiveGroup`; row 436); `SKILL.md`, "Numbers are siblings" (self-typed traits, `AdditiveGroup[\T\]` with `+`); orientation, "Reductions and comprehensions" and "Traits and objects" (P-147); `compiler.md`, "What the compiled path cannot compile yet".

## 13. `override area(): RR64 = s s` for an abstract `area()` of `Shape`

**Decision.** In the library, keep `area(): RR64 = s s`, without `override`.

An `override` overrides only where the inherited parameter types are strictly narrower. At the inherited declaration's own parameter types it overrides nothing. To define an inherited declaration at its own parameter types, declare it again without the modifier.

- Under walk, the `override` that overrides nothing is refused at load. Because it is in the library, that stops every program.
- The checker accepts it, a departure (row 653).
- The code generator refuses the modifier (row 650): it allows only `getter`, `setter`, `io`, `private` and `abstract`.

**Path and scope.** Walk refuses; the checker accepts; the code generator refuses. The fix holds on both paths.

**Passages.** Orientation, "Traits and objects" ("`override` widens ... Walk refuses at load an `override` that overrides nothing, so a Java-style `override` in the library stops every program. Exceptions: the checker accepts it (row 653), and the code generator refuses the modifier (row 650)"); `interpreter.md`, "What walk checks" (`override` item); `compiler.md`, "What the compiled path cannot compile yet".

## 14. `object O extends { A, B }`, where `A`'s `pick(self)` is abstract and `B`'s has a body

**Decision.** `O` is not valid. An object that inherits an abstract functional method from one trait and its body from another must declare the method itself (P-149), unlike in Scala. I write:

    object O extends { A, B }
        pick(self): ZZ32 = 1
    end

Then `pick(O)` gives 1.

As written, I expect a refusal: by the checker, and at load under walk, either as an uncovered abstract method or as a break of the Meet Rule for Functional Methods between `A`'s and `B`'s `pick`. I would confirm on each path with a probe. If a path accepts the program as written, `pick(O)` would most likely give 1 there (`B`'s body), but that path departs from P-149. I would search the ledger (`$T 'ledger-find:abstract functional method'`) and record a departure that it does not hold.

**Path and scope.** The rule holds on both paths (P-149). Which path enforces it today I would confirm by running.

**Passages.** Orientation, "Dispatch and overloading" ("An object that inherits an abstract functional method from one trait and its body from another must declare the method itself (P-149)"); `interpreter.md`, "What walk checks" (inherited abstract methods; the Meet Rule for Functional Methods).

## 15. A walk test of `even` and `odd` on 0 to 9

**Decision.** File `ProjectFortress/tests/EvenOddDigits.fss`:

    component EvenOddDigits
    export Executable

    (* The library's even and odd on the integers 0 to 9. *)

    run(): () = do
        assert(even(0), true, "even(0)")
        assert(even(1), false, "even(1)")
        assert(even(2), true, "even(2)")
        assert(even(3), false, "even(3)")
        assert(even(4), true, "even(4)")
        assert(even(5), false, "even(5)")
        assert(even(6), true, "even(6)")
        assert(even(7), false, "even(7)")
        assert(even(8), true, "even(8)")
        assert(even(9), false, "even(9)")
        assert(odd(0), false, "odd(0)")
        assert(odd(1), true, "odd(1)")
        assert(odd(2), false, "odd(2)")
        assert(odd(3), true, "odd(3)")
        assert(odd(4), false, "odd(4)")
        assert(odd(5), true, "odd(5)")
        assert(odd(6), false, "odd(6)")
        assert(odd(7), true, "odd(7)")
        assert(odd(8), false, "odd(8)")
        assert(odd(9), true, "odd(9)")
    end

    end

- `even` and `odd` are functional methods, so they are called `even(i)`, and no variable or parameter is named after them.
- The messages hold no `fail`.
- The file needs no `.test` file: every `.fss` in `tests/` is gated.
- The harness counts it green if it throws no exception, exits 0, and neither its standard output nor its standard error contains `fail` or `FAIL`, longer words such as `failure` included.
- I add no expected-output file. Every value is asserted inside the test, and the suite's verdict is the result.
- It guards working behaviour and comes with no fix, so it has no failing run. I see it pass: `explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/EvenOddDigits.fss`, and read `OK (1 tests)`.

**Path and scope.** Walk, the interpreter's library.

**Passages.** `tests-writing.md`, "A test program", "Where a test goes, and how it passes", "The order" (a test with no fix: see it pass), "Names, comments, citations"; `SKILL.md`, "Rules for every task" (no expected-output files); `library.md`, "Designing a change" (a functional method's name is reserved); `tests-running.md`, "Interpreter tests".

## 16. `n: NN32 = 3`

**Decision.** Under walk the binding fails: a numeral does not bind to `NN32` or `NN64` (row 454). Write `n: NN32 = unsigned(3)`.

On the compiled path the checker types the numeral as `IntLiteral`, which converts to each number type, so `n: NN32 = 3` is accepted there. Before the switch-over, that is against the compiler's prelude. If the test must run on both paths, I would grep the compiler's prelude for `NN32` and `unsigned` before using `unsigned(3)` there.

**Path and scope.** Walk: needs `unsigned(3)`. Compiled: the numeral converts.

**Passages.** `tests-writing.md`, "A test program" ("Under walk, a numeral does not bind to `NN32` or `NN64` ... (ledger row 454). Write `a: NN32 = unsigned(5)`"); orientation, "Numbers" (`IntLiteral` converts to each number type).

## 17. Porting `for (long i = lo; i < hi; i++) { total = step(total, i); }`

**Decision.** Scalar ranges are over `ZZ32` only, and walk stops when it builds a range over `ZZ64`. So I write a `ZZ32` loop that widens its index. The loop must be sequential, because each step reads the total before it:

    if lo < hi then
        count: ZZ32 = narrow(hi - lo)     (* the library's ZZ64-to-ZZ32 conversion *)
        for j <- seq(0#count) do
            total := step(total, lo + j)  (* j widens to ZZ64 *)
        end
    end

Here `total` is declared `var total: RR64`. Before writing it, I would grep `Library/FortressLibrary.fsi` for the library's `ZZ64`-to-`ZZ32` conversion and use its real name and form. `lo + j` widens `j` by the declared coercion from `ZZ32` into `ZZ64`. Without `seq`, the iterations run in parallel and race on `total`.

**Path and scope.** Walk, the interpreter's library. On the compiled path before the switch-over, loops work over `ZZ32` ranges too.

**Passages.** `library.md`, "The curator's decisions on the library" ("Scalar ranges are over `ZZ32` only ... Write a wider counter as a `ZZ32` loop that widens its index"); `SKILL.md`, "Parallelism and mutable state" ("A loop is sequential only if every generator is `seq(...)`"), "Numbers are siblings" (`coerce` from each narrower type).

## 18. A new `checkFits(r: Range[\ZZ32\], n: ZZ32)` beside the tuple overload makes walk refuse every program

**Decision.**

1. Do not land the edit as it is.
2. Do not take walk's refusal as the specification's verdict. The pair is valid: its parameter tuples exclude each other. `ZZ32` against a tuple at the second position excludes, and `Range[\ZZ32\]` against `Range[\(ZZ32,ZZ32)\]` excludes under the exclusion rule. Exclusion is read over the whole tuple (P-152). The checker agrees: the count stage shows no new error.
3. Reproduce the refusal with a minimal program of my own that declares the same pair, to see whether it is walk's load check in general.
4. Find the departure in the record: the orientation's list of walk's load-check rows (539, 416, 786, 412, 759, 779, 780, 788, 787), `interpreter.md`, "What walk checks", `$T 'ledger-find:overload walk load'` and `$T 'ledger-find:checkFits'`.
5. Choose within my area, the library, so that no program stops. Fixing walk's load check is an edit of a second area, the interpreter, so that choice is not mine unless the brief covers it. I would look at how the library already writes such a pair and do the same, or give the new function a name of its own. That change is in one area and can be undone, so it is my choice; I report it as a decision, with the alternatives.
6. Record walk's defect. If a row already holds it, cite the row and its test. If not, the specification settles it, so I add a gated `XXX` walk test (`tests/XXXName.fss`) that declares the pair and asserts what each call answers. It fails at load today, so the harness reports it green. I add a ledger row with `ledger.py`, or put the row in my report if I may not edit the ledger.
7. Report the fix of walk's check as a decision not taken if the brief does not give me the interpreter.

**Path and scope.** Walk only: the checker accepts the pair. Compiled programs link `Library/` only after the switch-over.

**Passages.** Orientation, "Dispatch and overloading" (P-152; "Walk's load check is not the specification's verdict ... find the row in `interpreter.md`, 'What walk checks'"); `interpreter.md`, "What walk checks" (parameter-by-parameter check; a library edit that adds an overload can stop every program); `exploring.md`, "The choices that are yours"; `library.md`, "Designing a change"; `tests-writing.md`, "How a defect is recorded" (item 2).

## 19. A new walk test stops inside a library function that my change did not touch, with an unknown message

**Decision.**
1. Reproduce it and see the whole diagnostic. Run the program directly from `ProjectFortress/`, as the harness does: `cd ProjectFortress && ../bin/fortress -debug stacktrace tests/X.fss`. The direct run is at one thread with a 4 GB heap, and the harness at four threads with 768 MB, so compare the two before naming a cause (a race or a memory limit can show in only one).
2. Search the record before investigating: `$T 'ledger-find:<words of the message>'`, then `$T 'ledger:ROW'` for each hit; `$T '<words>'` in FACTS and `$T 'positions:<words>'`, with a grep of both; and the orientation's rules. Many messages there are known departures, not new defects: "Cannot unify", "Ambiguous coercion", `CastError` in an empty `SUM`, `Bottom` or `OPEN` static arguments, `Box[\Int\]` against `Box[\ZZ32\]`, `NN32` numerals, tuple order.
3. Check my own test first against the skill's corrections of other languages: names of functional methods, numeral run-time classes, coercion, parallel `for` with shared state.
4. If my tree holds other edits, run the test on the old code (`explorations/coordinator/tools/old-fortress.sh <base-build> <tree>/tmp/old-caches tests/X.fss`) to see whether the base shows the failure too.
5. If the record does not hold it, it is a gap: switch to exploring (`exploring.md`, "The procedure"). A failure inside a loop or a reduction is most often in the library's code. Change one thing at a time.
6. Record it as `tests-writing.md`, "How a defect is recorded", says: repaired by my change (plain test); deferred with the specification's answer (`XXX` test); or open (a test of today's behaviour plus a ledger row). Report it among the defects.
7. Delete no caches unless I have found a stale-cache cause.

**Path and scope.** Walk. If the program can run compiled, I run it there too and say in the row which paths show it.

**Passages.** `SKILL.md`, "Rules for every task" (reproduce first; one change at a time; search the ledger first), "When to explore", "How a program runs" (run on the other path); `records.md`, "Reading the record"; `tests-running.md`, "Interpreter tests" (direct run, `-debug stacktrace`); `interpreter.md`, "Running a program" (heaps, threads); `worktrees.md`, "Running the old code"; `library.md`, "How loops and reductions call the library"; `build-and-caches.md`, "Symptoms of a skipped step".

## 20. A compiled test in `compiler_tests/` with the literal `[1.0 2.0 3.0]`

**Decision.** Today it cannot be a passing compiled test. The code generator has no case for an array literal, and the compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`. Until the switch-over, a compiled test uses none of these, and a test that needs one is an `XXX` test that names the wall:

- `ProjectFortress/compiler_tests/XXXArrayLiteralRR64.fss`, with `component XXXArrayLiteralRR64`. It is written as the specification says: the function over the three `RR64` values, its result asserted, then `println("PASS")`.
- `ProjectFortress/compiler_tests/XXXArrayLiteralRR64.test`, with `tests=XXXArrayLiteralRR64` and `compile`.
  - If the compile stops in the code generator (`sayWhat` or another `CompilerError`): `compile_exception_contains=<text of the exception>`.
  - If the checker refuses first, because the prelude has no array type: `compile_err_contains=<the refusal's message>`.

I run the compile once to see which it is, and take the exact text from it.

I show this first `XXX` test through the harness twice:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh xarr ProjectFortress/compiler_tests XXXArrayLiteralRR64.test > <tree>/tmp/junit-xarr.txt 2>&1

- As it is, it must report `Saw expected failure` or `OK Saw expected exception`.
- Changed for one run so that the wall does not show (for example, the literal and the array taken out), then restored, it must report red.

In my report I say that the brief's test cannot pass compiled until the switch-over.

**Path and scope.** The compiled path before the switch-over. After it, the prelude is gone, but the code-generator wall stays until the code generator gains the case. The test then turns red and is promoted.

**Passages.** `compiler.md`, "What the compiled path cannot compile yet" (array literal; no array types; "write it as an `XXX` test that names the wall"); `tests-writing.md`, "Writing an `XXX` test", "How `XXX` works", "Promoting an `XXX` test"; `tests-running.md`, "Compiled tests".

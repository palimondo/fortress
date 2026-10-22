# Regression quiz: answers, reader 2

Read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; its parts `build-and-caches.md`, `session.md`, `worktrees.md`, `toolchain.md`, `interpreter.md`, `compiler.md`, `library.md`, `tests-writing.md`, `tests-running.md`, `gate.md`, `records.md`, `exploring.md`, `committing.md`, `specification.md` (all under `.claude/skills/fortress-repo/references/`); and the orientation `explorations/coordinator/consolidation-2026-10-22/evidence/orientation/orientation.md` (cited below as "orientation"). Cases: 1 to 20.

Every Bash call below starts with the setup lines of `build-and-caches.md`, "Setting up each call" (`cd <tree> && mkdir -p tmp`, JDK 25, `FORTRESS_HOME=$PWD`, `FORTRESS_THREADS=1`, `TMPDIR`/`JAVA_FLAGS` under `tmp/`, `unset JAVA_TOOL_OPTIONS`). `$T` is `explorations/coordinator/tools/facts-extract.sh` (`records.md`, "Reading the record").

---

## 1. Running `explorations/probes/Probe.fss` on both paths, and whether it is well typed

**Decision.**

1. Work in a tree whose caches no other agent uses; if the brief gives none, seed one (`worktrees.md`, "Seeding a worktree"). Set up the call.
2. Walk (the default command):

       bin/fortress explorations/probes/Probe.fss > tmp/probe-walk.txt 2>&1; echo rc=$?

   It runs at `FORTRESS_THREADS=1` from the setup. If the probe has parallel parts and mutable state, run it again at four threads (`FORTRESS_THREADS=4`), since a race shows only above one thread.
3. Compiled path: first check that `default_repository/caches/bytecode_cache/` holds the five library jars; if not (empty caches or a build that printed "started again, empty"), run the library order. Then:

       cd ProjectFortress
       ../bin/fortress compile ../explorations/probes/Probe.fss > ../tmp/probe-compile.txt 2>&1; echo rc=$?
       ../bin/fortress run Probe > ../tmp/probe-run.txt 2>&1; echo rc=$?

   The file's name must be the component's name (`Probe`). If the compile fails, do not read the run's "Could not load Probe / Resource not found": the failed compile left a 0-byte jar; quote the compile's error. For a checker crash, rerun with `compile -debug stacktrace`.
4. Report each path's output and exit code, with its command.
5. Well-typedness: walk's success settles nothing. Walk switches off the type-checking phase, so a program that runs under walk can be ill-typed, and walk's load check is not the verdict of the type rules. The verdict is the static checker's, which runs only in `fortress compile` (or `fortress typecheck`, which stops after that phase). Read the compile's outcome so:
   - no static error, and the compile reaches code generation: well typed, against the compiler's prelude;
   - a code-generator wall (`sayWhat` or another `CompilerError`): that is not a type error; to separate the two, run `../bin/fortress typecheck ../explorations/probes/Probe.fss`;
   - a static error: ill typed, unless the error only says that the compiler's prelude lacks something the interpreter's library has (a type, an operator, an array). Before the switch-over the checker checks a program only against the compiler's prelude; no command checks a program against the interpreter's library (the count stage checks only the library itself). In that case say in the report that the question cannot be settled today, and what is missing.
6. If the two paths disagree, or one fails, search the ledger before explaining it (`$T 'ledger-find:WORDS'`), and run the program on the other path too, naming in a ledger row which paths show a new defect.

**Path and scope.** Walk: runs, never type-checks. Compiled path: checks types against the compiler's prelude until the switch-over; after it, against the one library.

**Passages.** `SKILL.md`, "The phases" (walk switches the type-checking phase off; "A program that runs under walk can be ill-typed"; "A type error stops the compile"; each path has its own library until the switch-over) and "How a program runs" (run a defect on the other path too). Orientation, "Implementation limits" ("Walk has no static types until it runs the checker after the switch-over (P-12). So walk runs programs that the checker refuses") and "Dispatch and overloading" ("Walk's load check is not the verdict of these rules"). `interpreter.md`, "What walk checks" (commands that stop after a phase use the compiler's prelude). `compiler.md`, "Running", "The `fortress` commands", "What the compiled path cannot compile yet". `library.md`, "Designing a change" ("`fortress typecheck` checks against the compiler's prelude"). `build-and-caches.md`, "The library order". `worktrees.md`, "Seeding a worktree".

---

## 2. The specification's empty-argument value against walk's value and a team test

**Decision.** This is a disagreement between the specification and an implementation, and a team test sides with the implementation. I do not pick a side myself.

1. Look up first:
   - POSITIONS and FACTS: `$T 'positions:WORDS'` and `$T 'WORDS'` with the function's name, and a grep of `FACTS.md` and `POSITIONS.md` for it;
   - the ledger: `$T 'ledger-find:<function> empty'`, then `$T 'ledger:N'` for each hit;
   - `revival-changes.md`, since two of the team's sources disagree (exploring, step 1);
   - the passage itself: its Appendix I entry and any `\revision` or `\note{}` box beside it, and whether the revival changed it (compare `Specification/` with `Specification-1.0-frozen/`, or `git diff a874948ac -- <file>.tex`). If the "library chapter" text is a generated api listing, it only shows the library and settles nothing.
2. If a decision settles which side is correct, the other side is wrong:
   - Specification correct, and the brief has me repair the library: my plain walk test in `ProjectFortress/tests/` asserts the specification's value; I see it fail through `harness-one.sh`, then fix the library function. The team's test then breaks: I change its expected value only as the decision requires, keep every other assertion, and list the line before and after in the report as a point to report.
   - Specification correct, repair deferred: a gated `XXX` walk test that asserts the specification's value (way 2 of "How a defect is recorded").
   - Walk correct: my test asserts walk's value. The specification text is the wrong side: an edit of it needs the revision form; otherwise record the departure.
3. If nothing settles it, it is a conflict. Switch to exploring: settling a conflict is always the curator's choice. My test asserts today's behaviour, walk's value, which the team's test also asserts; I add a ledger row for the open question (way 3); the team's test stays as it is. In the report, put a decision not taken: the question, each source with its date (the specification's library chapter, the interpreter's library, the team's test), each possible solution and what it changes, and which keeps current behaviour (walk's value).

**Path and scope.** Walk and the interpreter's library: a test of the interpreter's library is an interpreter test. The compiled path uses the compiler's prelude until the switch-over; after it, the same value holds on both paths.

**Passages.** `specification.md`, "When the text and an implementation disagree" and the opening ("`Specification/` ... says what the language means, except where a decision of the curator says otherwise"; api listings "cannot justify a change of the library"). `SKILL.md`, "When to explore" (a conflict between the team's sources, the implementations among them) and "Rules for every task". `exploring.md`, "The choices that are yours" ("The curator settles every conflict") and "The procedure", steps 1 to 3 and 11. `tests-writing.md`, "How a defect is recorded", "Where a test goes, and how it passes" and "Names, comments, citations" (a team test line: keep the value, report before and after). `records.md`, "What every report holds". Orientation, intro ("An old note, a team test and your training can be right about the team's walk and wrong here"; "search FACTS and POSITIONS before you call a disagreement a conflict").

---

## 3. `describe[\T extends Shape\](b: Box[\T\])` beside `describe(b: Box[\Circle\])`

**Decision.** Keep the pair. My memory is the Working Draft's rule, which the revival dropped: overloads may differ in their static parameters (P-45). Check the pair on declared domains:

- the generic declaration's declared domain is `{ Box[\T\] : T extends Shape }`, which holds `Box[\Circle\]` (generics are invariant, so it is the set of those instances);
- the plain declaration's domain, `Box[\Circle\]`, lies strictly inside it, so the plain declaration is strictly more specific;
- return-type rule: `String` is a subtype of `String` at every instance.

So the pair is valid.

For an argument of type `Box[\Circle\]`, `describe(b: Box[\Circle\])` runs. The order in which the two are written does not matter on either path. Walk chooses by declared parameter types, never by the order of the declarations, comparing declared domains where one lies strictly inside the other. The compiled dispatch method tests the declarations from the most specific to the least specific.

- Look up `$T 'P-45'` before relying on it.
- Write a walk test in `ProjectFortress/tests/` that calls `describe` on a `Box[\Circle\]` and on a box of another `Shape`, and asserts which body ran. A new library overload can make walk refuse every program at load, so run it through `harness-one.sh`.
- Run the count stage on the base and on my tree to show no new checker error.
- If walk does refuse the pair, find the case and its row in `interpreter.md`, "What walk checks", and in `revival-changes.md`, "Walk's check of two generic declarations", before changing anything.

**Path and scope.**
- Walk: loads the pair (it checks a pair with a generic member on declared domains) and runs the `Circle` body.
- Checker: accepts it, on the interpreter's library through the count stage.
- Compiled programs do not link the interpreter's library until the switch-over. After it, the compiled dispatch runs the `Circle` body too.
- Do not put the declarations in the compiler's prelude.

**Passages.** Orientation, "Dispatch and overloading": "Overloads may differ in their static parameters (P-45) ... The Working Draft forbids such pairs ... The checker applies the overloading rules of `SKILL.md` to declared domains"; "Walk chooses by declared parameter types, never by the order of the declarations"; "Walk's load check is not the verdict of these rules". `SKILL.md`, "Fortress as a language" (overloading rules; generics invariant) and "The compiled run time" (dispatch method, most specific first). `interpreter.md`, "What walk checks" (pairs with a generic member checked on declared domains; a library overload can stop every program). `library.md`, "Designing a change". `compiler.md`, "The compiler's prelude, until the switch-over" and the count stage's definition.

---

## 4. `f(ZZ64)` / `f(Number)` on a `ZZ32`; `pick[\T extends Number\]` on `ZZ32` and `ZZ64`

**Decision.**
- `f(n)` gives `"number"` on both paths. The number types are siblings, so a `ZZ32` is not a `ZZ64`, and `f(x: Number)` fits without conversion. "A conversion never changes which declaration runs when one already fits", so the coercion from `ZZ32` to `ZZ64` is never used to reach `f(x: ZZ64)`. The compiled dispatch tests `ZZ64` first, fails, then matches `Number`, which agrees.
- `pick(a32, b64)` runs, with `T = ZZ64`. Promotion instantiates a generic declaration at the narrowest type into which all its arguments coerce (P-74): the `ZZ32` argument converts to `ZZ64`, and the result is the first argument as a `ZZ64`. The answer is not the join, `Number`. Walk promotes separate arguments; it takes the join only for the elements of a tuple or varargs (rows 395, 511), which is not this case.
- I would confirm both on both paths with a small program (a walk run and a compile and run), and look up P-74 (`$T 'P-74'`).

**Path and scope.** Both paths, by the rules. The compiled path runs the program against the compiler's prelude until the switch-over, so confirm it there by a run.

**Passages.** `SKILL.md`, "Fortress as a language", "Numbers are siblings, not a tower" ("None is a subtype of another ... A conversion never changes which declaration runs when one already fits") and "Dispatch is on every argument, at run time". Orientation, "Numbers", "Arguments convert by declared coercions, and a generic call promotes" ("Promotion instantiates a generic declaration at the narrowest type into which all its arguments coerce (P-74). So `f[\T\](a: T, b: T)` on a `ZZ32` and a `ZZ64` runs at `ZZ64`. Walk does not promote the elements of a tuple or varargs").

---

## 5. Porting `double seconds = elapsed / 1e9;`

**Decision.** With `elapsed: ZZ64`:

    seconds: RR64 = asFloat(elapsed) / 1000000000.0

`ZZ64` converts into `RR64` only explicitly, by `asFloat`. Without it, `ZZ64 / RR64` has no declaration and no implicit coercion, and fails dispatch under walk. I would check how the library declares `asFloat`, functional `asFloat(x)` or dotted `x.asFloat()`, by grepping `Library/FortressLibrary.fsi`, and write that form. The divisor is a numeral with a radix point, so it is an `RR64`.

The line would not be the same for `elapsed: ZZ32`. `ZZ32` and numerals convert into `RR64` implicitly, so `seconds: RR64 = elapsed / 1000000000.0` is enough; walk converts the `ZZ32` at the call of `/`.

**Path and scope.** Walk, with the interpreter's library; after the switch-over, both paths. The curator's decision is on the interpreter's library; the compiler's prelude may lack `asFloat` before the switch-over, but the port is for walk.

**Passages.** `library.md`, "The curator's decisions on the library" ("`ZZ32` and numerals convert into `RR64` implicitly. `ZZ64` converts into `RR64` only explicitly, by `asFloat`"). Orientation, "Numbers", "Arguments convert by declared coercions" (walk converts at a call, a typed binding and an assignment).

---

## 6. Porting a Java string hash that relies on `int` wraparound

**Decision.** With `var h: ZZ32 = 0` declared earlier:

    h := ((31 DOTTIMES h) DOTPLUS c)

or with the symbols, `h := ((31 ⨰ h) ∔ c)`. It is fully parenthesised, because the wrapping operators' precedence is stated only among themselves. A plain `h := 31 h + c` does not wrap: fixed-width arithmetic raises `IntegerOverflow` on overflow.

- Under walk: wraps exactly as Java's `int` does.
- Compiled path, before the switch-over: compiled programs link the compiler's prelude, not the interpreter's library, and my sources do not say whether the prelude declares `DOTPLUS`/`DOTTIMES` at `ZZ32`, nor what its plain `+`/`*` do on overflow. Before claiming either, I would grep `ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss` and `Library/CompilerLibrary.fss` for the operators, and `nativeHelpers/simpleIntArith.java` for plain arithmetic. If the wrapping operators are absent, the compile stops with a static error. I would not add them to the prelude, which is deleted at the switch-over; a compiled test of it would be an `XXX` compile test.
- After the switch-over, both paths take the interpreter's library's wrapping operators.

**Path and scope.** Walk: wraps. Compiled before the switch-over: as the prelude declares (look-up above). After the switch-over: wraps on both.

**Passages.** `library.md`, "The curator's decisions on the library" ("For arithmetic that wraps on overflow, use the wrapping operators ∔ `DOTPLUS`, ∸ `DOTMINUS` and ⨰ `DOTTIMES`. Parenthesise every such expression fully"). `SKILL.md`, "Fortress as a language" ("Overflow raises `IntegerOverflow`") and "Parallelism and mutable state" (`var` declarations). Orientation, intro ("fixed-width arithmetic does not wrap"). `compiler.md`, "The compiler's prelude, until the switch-over".

---

## 7. The tolerance 10 to the power `-k`

**Decision.**

    tol: RR64 = 10.0^(-k)

An `RR64` base, with the exponent parenthesised. An integer power answers its base's type, so `10^(-k)` is an integer power:

- Under walk, with the interpreter's library: at a negative exponent only the bases 1 and -1 give their power, and 0 raises `DivisionByZero`. So `10^(-k)` raises `IntegerOverflow` for `k >= 1`, gives `1` for `k = 0`, and is an integer power (which overflows past `ZZ32`) for negative `k`. Walk answers the numeral's arithmetic as `ZZ32` (row 578).
- Compiled path, before the switch-over: the compiler's library has powers only at `ZZ32`, `NN32` and `NN64`, with an exponent of the same type. Its `ZZ32` power gives `0` at a negative exponent for other bases, silently, so `10^(-k)` is `0` for `k >= 1` (rows 441, 523). The same absence of an `RR64` power means `10.0^(-k)` does not compile there before the switch-over.
- After the switch-over, both paths behave as walk does.

**Path and scope.** As above: walk raises `IntegerOverflow`; compiled before the switch-over gives 0; after the switch-over both raise, and `10.0^(-k)` works on both.

**Passages.** Orientation, "Numbers", "An integer power answers its base's type (P-153)" ("For a fraction, write `2.0^(-1)` ... not `10^(-k)`. Until the switch-over, the compiler's library has powers only at `ZZ32`, `NN32` and `NN64` ... Its `ZZ32` power gives 0 at a negative exponent for other bases") and "Under walk a numeral has a run-time class" (row 578).

---

## 8. Summing an `RR64` array with a `for` loop and `var acc`

**Decision.** The loop as described is a race, and so not correct:

    sumOf(a: Array[\RR64, ZZ32\]): RR64 = do
        var acc: RR64 = 0.0
        for i <- a.indices() do
            acc := acc + a[i]        (* race: iterations run in parallel *)
        end
        acc
    end

A `for` loop is parallel unless every generator is `seq(...)`, so `acc := acc + a[i]` with no `atomic` loses updates. The direct run printed the right sum because the setup runs at `FORTRESS_THREADS=1`. The suites run at four threads, once each, so the test can fail there, or pass by luck. A passing run proves nothing.

What I write instead is a reduction, which combines its tasks' results and writes no shared accumulator. The static argument is written, because the checker refuses `SUM` without it (row 731):

    sumOf(a: Array[\RR64, ZZ32\]): RR64 = SUM[\RR64\][i <- a.indices()] a[i]

If the loop must stay, make it sequential, `for i <- seq(a.indices()) do acc := acc + a[i] end`; an `atomic` around the update is also correct, but it serialises the loop. I would confirm the array type's spelling and its index generator (`indices`) in `Library/FortressLibrary.fsi` first.

Test: a walk test in `ProjectFortress/tests/` that asserts the sum. It touches mutable state, so run it at one thread directly (`FORTRESS_THREADS=1 bin/fortress ...`) and at four through `harness-one.sh`.

**Path and scope.** Parallel loops on both paths (tasks built separately for each). The compiler's prelude has no array types, so this does not compile before the switch-over; it is a walk function today.

**Passages.** `SKILL.md`, "Parallelism and mutable state" ("A loop is sequential only if every generator is `seq(...)`"; a big operator "combines the results of its tasks ... No task writes a shared accumulator"; "So `acc := acc + x` inside a parallel `for`, with no `atomic`, is a race. The suites run at four threads ... A passing run does not prove that there is none"). `build-and-caches.md`, "Setting up each call" (`FORTRESS_THREADS=1`). `tests-writing.md`, "Names, comments, citations" (one thread and four). `library.md`, "The curator's decisions on the library" (`SUM` static argument, row 731). `compiler.md`, "What the compiled path cannot compile yet" (no array types in the prelude).

---

## 9. `total(n: ZZ32): RR64` in the interpreter's library

**Decision.**

    total(n: ZZ32): RR64 = SUM[\RR64\][j <- 0#n] g(j)

- `0#n` is the `ZZ32` range of `n` elements from 0, that is 0 to `n - 1`. Scalar ranges are over `ZZ32` only.
- The static argument `[\RR64\]` is written because the checker refuses `SUM` without it (row 731), even where a declared type receives the value. Walk would instantiate at the function's declared return type anyway.
- If the component's api exports it, declare it in the `.fsi` too.
- Run the count stage on the base and on my tree and diff the tables (`explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`) to show no new checker error.
- Test it under walk in `ProjectFortress/tests/`.

`total(0)` gives `0.0`, the `RR64` zero: the reduction's identity over an empty range. It is not the row-716 case (no static argument and no declared type, which gives the integer 0), nor the row-436 case (a written static argument that is not a number type, which gives `CastError`).

**Path and scope.** Walk runs it, and the checker accepts it through the count stage. Compiled programs reach it after the switch-over. The compiler's prelude reduces only over `ZZ32` ranges to `ZZ32` or `String`, and nothing may be added there.

**Passages.** `library.md`, "The curator's decisions on the library" ("Scalar ranges are over `ZZ32` only"; "write it, also where a declared type receives the value: `SUM[\ZZ32\][j <- 0#n] f(j)`. The checker refuses a call without it (ledger row 731) ... An empty `SUM` with no static argument written and no declared type gives the integer 0 ... (ledger row 716) ... not a number type ... `CastError` (ledger row 436)"). Orientation, "Reductions and comprehensions" ("Walk instantiates a reduction at its value's declared type: ... a top-level or local function's return type"). `compiler.md`, the count stage, "The checker's time" (its command) and "What the compiled path cannot compile yet".

---

## 10. `object Tag[\T\]()` and `mk[\T\](): Tag[\T\]`, unbounded

**Decision.**

(a) `Tag[\(ZZ32, ZZ32)\]()`:
- Walk runs it: an unbounded type parameter is bounded by `Any`, which holds tuples.
- It does not compile today: before disambiguation the compiled path bounds an unbounded type parameter by `Object`, so it rejects every generic instantiated at a tuple type until the switch-over (row 412).

(b) In `t = mk()`, nothing fixes `T`, so it takes its bound, not Scala's `Nothing` (P-48); the bound is `Any`, so `t` is a `Tag[\Any\]`. None of walk's `Bottom` cases applies: there is one bound, no argument, and no function expression. On the compiled path today the implicit bound is `Object` (row 412), so the checker would take `Object` there until the switch-over. That is my inference from row 412, and I would confirm it with `fortress typecheck`.

(c) `u: Tag[\ZZ32\] = mk()`:
- It compiles: the checker narrows the bound by the expected type, so `T = ZZ32`.
- Under walk it does not run as intended. Walk gives no expected type, so `mk()` makes a `Tag[\Any\]`, and generics are invariant, so a `Tag[\Any\]` is not a `Tag[\ZZ32\]`. I expect the typed binding to fail at run time, and would run it to see the message.
- Write `u: Tag[\ZZ32\] = mk[\ZZ32\]()`, which holds on both paths.

**Path and scope.** (a) walk yes; compiled no until the switch-over (row 412). (b) `Any` by P-48 (walk, and the checker after the switch-over); `Object` on today's compiled path. (c) Compiled yes; walk no unless the static argument is written.

**Passages.** `SKILL.md`, "Fortress as a language", "Static parameters" ("An unbounded type parameter is bounded by `Any`, which holds tuples ... A type parameter that a call does not fix takes its bound"; "Generics are invariant"). Orientation, "Static parameters, `where` clauses and sizes" ("takes its bound, not Scala's `Nothing` (P-48). The checker takes the intersection of its upper bounds, narrowed by the expected type"; the three `Bottom` cases; "Walk gives an argument no expected type ... Under walk, write `mk[\ZZ64\]()`"). `compiler.md`, "Traps of the compiled path" (row 412).

---

## 11. `Temp extends { Comparable[\Temp\], Comparable[\RR64\] }`

**Decision.** Do not keep it. No type may extend two instantiations of one generic trait (the exclusion rule, P-43, P-97). The compiled checker refuses it, and without the rule such programs die with `IncompatibleClassChangeError`. Walk runs it only because walk applies no instantiation exclusion (row 416), a known departure, not a verdict. The specification marks such examples "Not allowed".

Write one instantiation, and overload the method on the second parameter type, whose types exclude each other (an object `Temp` and `RR64`):

    trait Comparable[\T\] lessThan(other: T): Boolean end

    object Temp(k: RR64) extends Comparable[\Temp\]
        lessThan(other: Temp): Boolean = k < other.k
        lessThan(other: RR64): Boolean = k < other
    end

Both methods are dotted, so the type has no dotted and functional pair of one name. Alternatively, drop the generic trait and declare the two `lessThan` methods, or two top-level functions, directly.

**Path and scope.** Both paths: the checker refuses the original now; walk accepts it only through row 416. The rewrite is valid on both.

**Passages.** `SKILL.md`, "Fortress as a language", "Traits and objects, no classes" ("No type may extend two instantiations of one generic trait"; one type must not have a dotted and a functional method of the same name) and "Dispatch is on every argument" (overloads valid when parameter types exclude). Orientation, "Traits and objects" ("The compiled checker applies the exclusion rule (P-43, P-97) ... `IncompatibleClassChangeError`. Walk applies no instantiation exclusion (row 416) ... The specification marks the Working Draft's examples that break the rule 'Not allowed': do not copy them").

---

## 12. `SUM` over `Money(cents: ZZ64)`

**Decision.** `SUM` is generic over `AdditiveGroup`, a self-typed trait, so `Money` extends `AdditiveGroup[\Money\]`. A type that extends `T[\A\]` and is not an `A` is refused, so the argument is `Money` itself. It must declare a body for each abstract member that `AdditiveGroup` leaves, at their parameter types. I would print `trait AdditiveGroup` and its supertraits from `Library/FortressLibrary.fsi` to list them, and copy how a library number type implements them. At least it needs `opr +(self, other: Money): Money` and the identity, zero, and likely negation and subtraction. Walk refuses at load an object without static parameters that leaves an inherited abstract method uncovered. A sketch, to be adjusted to the `.fsi`:

    object Money(cents: ZZ64) extends AdditiveGroup[\Money\]
        opr +(self, other: Money): Money = Money(cents + other.cents)
        opr -(self): Money = Money(-cents)
        opr -(self, other: Money): Money = Money(cents - other.cents)
        (* the identity, as AdditiveGroup declares it: Money(0) *)
    end

The sum, with the static argument written in the clause form (the checker refuses it without):

    total = SUM[\Money\][m <- payments] m

An empty range should give `Money`'s zero, the reduction's identity, by the specification. Under walk today, a `SUM` with a written static argument that is not a number type ends in `CastError` when the range is empty or filtered (row 436). Without a static argument and without a declared type, an empty `SUM` gives the integer 0 (row 716). A test asserts the non-empty sum. For the empty case, it either names row 436's existing reproducer, or adds a gated `XXX` test that asserts `Money`'s zero; it does not assert `CastError` as correct.

**Path and scope.** Walk, with the interpreter's library, with the row-436 departure on empty and filtered ranges. Compiled: the compiler's prelude reduces only `ZZ32` ranges to `ZZ32` or `String`, so this compiles only after the switch-over.

**Passages.** `library.md`, "The curator's decisions on the library" ("`SUM` and `PROD` are generic over `AdditiveGroup` ... write it ... (ledger row 731) ... An empty `SUM` with no static argument written and no declared type gives the integer 0 ... (ledger row 716). With a static argument written that is not a number type, such as a user group, an empty or filtered `SUM` ends in `CastError` (ledger row 436)") and "Designing a change". `SKILL.md`, "Numbers are siblings" ("The algebra is self-typed traits, such as `AdditiveGroup[\T\]` with `+`"). Orientation, "Traits and objects" (self-typed traits; P-147 cover) and intro ("A sentence that cites a ledger row ... do not assert it as correct in a test"). `compiler.md`, "What the compiled path cannot compile yet".

---

## 13. `override area(): RR64 = s s` in `Square extends Shape`

**Decision.** Remove `override`, and keep `area(): RR64 = s s` in `Square`. An `override` overrides only where the inherited parameter types are strictly narrower than its own; at the inherited declaration's own parameter types, here `()`, it overrides nothing. To define or replace an inherited declaration at its own parameter types, declare it without `override`.

- Walk refuses at load an `override` that overrides nothing. In a library component that stops every program.
- The compiled checker accepts it (row 653), a departure.
- The code generator refuses every `override` modifier (row 650).

**Path and scope.** Walk: refused at load. Checker: accepted (row 653). Code generator: refused (row 650). Without the modifier, all three accept.

**Passages.** Orientation, "Traits and objects", "`override` widens" ("Walk refuses at load an `override` that overrides nothing, so a Java-style `override` in the library stops every program. Two departures: the checker accepts such an `override` (row 653), and the code generator refuses every `override` modifier (row 650)"). `interpreter.md`, "What walk checks" (an `override` at the inherited declaration's own parameter types overrides nothing; a library edit can stop every program). `compiler.md`, "What the compiled path cannot compile yet" (modifiers; row 650).

---

## 14. `O extends { A, B }`: abstract `pick(self)` in `A`, body in `B`, none in `O`

**Decision.** `O` is invalid on both paths: walk refuses it at load, and the checker refuses it. Both paths refuse an object that inherits an abstract functional method from one trait and its body from another, unless the object declares the method itself (P-149); Scala accepts it. So `pick(O)` gives nothing, because the program does not load or compile. Fix:

    object O extends { A, B }
        pick(self): ZZ32 = 1
    end

Then `pick(O)` gives `1`.

**Path and scope.** Both paths refuse the original; the fixed form runs on both. The compiled run needs the prelude's `ZZ32` before the switch-over, which it has.

**Passages.** Orientation, "Dispatch and overloading", "Two functional methods with equivalent parameter types are duplicates, wherever `self` stands" ("both paths refuse an object that inherits an abstract functional method from one trait and its body from another, unless the object declares the method itself (P-149). Scala accepts it").

---

## 15. A walk test of `even` and `odd` on 0 to 9

**Decision.** The file `ProjectFortress/tests/EvenOddSmallIntegers.fss`:

    component EvenOddSmallIntegers
    export Executable

    (* even and odd on the integers 0 to 9 *)

    run(): () = do
        for k <- 0#5 do
            assert(even(2 k), true, "even of 2k")
            assert(odd(2 k), false, "odd of 2k")
            assert(even(2 k + 1), false, "even of 2k+1")
            assert(odd(2 k + 1), true, "odd of 2k+1")
        end
    end

    end

- The loop variable is `k`, never `even` or `odd`, which are functional methods of the library and reserved.
- The messages contain no `fail`.
- If I cite the specification in the comment, it is by file and section, found by grepping `Specification/library` for `even`.

How it passes:
- Every `.fss` in `ProjectFortress/tests/` is gated; no `.test` file is needed.
- The harness counts it green if it throws no exception, exits 0, and neither its standard output nor its standard error contains `fail` or `FAIL` (a longer word such as `failure` counts).
- Walk's `assert(x, y, msg)` compares any two values.

No expected-output file is added: values are asserted inside the test, and the suite's pass or fail is the result. This test guards behaviour that works today, so it has no failing run. I see it pass through the harness and quote the verdict:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/EvenOddSmallIntegers.fss

and read `OK (1 tests)`.

**Path and scope.** Walk only (an interpreter test of the interpreter's library).

**Passages.** `tests-writing.md`, "A test program" (form; `assert` under walk; do not name a variable after `even`), "Where a test goes, and how it passes" (gated `.fss`; green rule) and "The order" ("A test that comes with no fix ... see it pass through the harness"). `SKILL.md`, "Rules for every task" ("Do not compare the output of a whole run of tests with a saved copy, and do not add expected-output files"). `tests-running.md`, "Interpreter tests". `library.md`, "Designing a change" (functional method names reserved).

---

## 16. `n: NN32 = 3`

**Decision.**
- Under walk the binding fails: a numeral does not bind to `NN32` or `NN64` (row 454). Write `n: NN32 = unsigned(3)`.
- On the compiled path the checker types the numeral as `IntLiteral`, which converts to the integer types (P-76), so `n: NN32 = 3` compiles.
- For a test that must run under walk, or on both paths, write `unsigned(3)`. I would confirm by a compile that the compiler's prelude declares `unsigned` before using it in a compiled test.

**Path and scope.** Walk: needs `unsigned(3)` until row 454 is fixed. Compiled: the numeral binds.

**Passages.** `tests-writing.md`, "A test program" ("Under walk, a numeral does not bind to `NN32` or `NN64` ... (ledger row 454). Write `a: NN32 = unsigned(5)`, not `a: NN32 = 5`"). Orientation, "Numbers", "Under walk a numeral has a run-time class" ("The checker types an integer numeral as `IntLiteral`, a sibling under `Number` that converts to the integer types, `QQ` and `RR64` (P-76)").

---

## 17. Porting `for (long i = lo; i < hi; i++) { total = step(total, i); }`

**Decision.** Two rules decide the port:
- Scalar ranges are over `ZZ32` only; a `ZZ64` range is a static error and stops walk. Write the counter as a `ZZ32` loop that widens its index.
- Each step depends on the one before, and a `for` loop is parallel unless its generator is `seq(...)`, so the loop must be sequential.

With `var total: RR64 = ...` declared earlier:

    lo32: ZZ32 = narrow(lo)
    hi32: ZZ32 = narrow(hi)
    for i <- seq(lo32 # (hi32 - lo32)) do
        total := step(total, i)      (* i: ZZ32 widens to ZZ64 at the call *)
    end

- Widening: `ZZ64` declares a `coerce` from `ZZ32`, and `step` has only a `ZZ64` declaration, so the call converts `i`.
- Narrowing: I would look up the library's `ZZ64`-to-`ZZ32` conversion (I expect `narrow`) in `Library/FortressLibrary.fsi`, and use its exact spelling.
- If `hi < lo` is possible, as Java allows (zero iterations), I would guard the loop with `if hi > lo then ... end`, or check what `#` does with a negative count in `RangeInternals.fss`.

**Path and scope.** Walk, with the interpreter's library; both paths after the switch-over. Before it, the compiler's prelude loops over `ZZ32` ranges only. Whether it has `seq`, `RR64` and the narrowing function there I would check before compiling.

**Passages.** `library.md`, "The curator's decisions on the library" ("Scalar ranges are over `ZZ32` only. A range over another integer type is a static error, and walk stops when it builds one. Write a wider counter as a `ZZ32` loop that widens its index"). `SKILL.md`, "Parallelism and mutable state" ("A loop is sequential only if every generator is `seq(...)`"; `var` and `:=`) and "Numbers are siblings" ("A wider type declares a `coerce` from each narrower one"). Orientation, "Numbers" (walk converts at a call).

---

## 18. A new `checkFits` overload in `RangeInternals.fss` makes walk refuse every program

**Decision.**

1. Do not land the edit as it is: a library edit that stops every program at load makes every walk test red.
2. Do not take walk's refusal as the verdict. The pair is valid by the rules:
   - `Range[\ZZ32\]` and `Range[\(ZZ32,ZZ32)\]` are two instantiations of one generic trait, so they exclude each other by the exclusion rule (P-43, P-97); so do `ZZ32` and a tuple;
   - the count stage's silence confirms that the checker accepts the pair.
   Walk applies no instantiation exclusion, so it refuses overloads on two instantiations (row 416, as at `Tg[\3\]` and `Tg[\4\]`).
3. Before changing code to pass walk's check:
   - find the case in `interpreter.md`, "What walk checks";
   - read row 416 (`$T 'ledger:416'`), and search the ledger for walk's message (`$T 'ledger-find:WORDS'`);
   - reproduce the refusal with a minimal program that declares the pair in its main component.
4. Then choose by the brief:
   - **Brief limited to the library.** Give the new function a name of its own (no overload). That choice is mine: it stays in one area, touches no model line and no decision, and can be undone. Record walk's departure under row 416: a note if this case adds to it, and the `XXX` test that the row names as its reproducer if it has none (deferred, settled by the exclusion rule).
   - **Brief covers walk.** Fix walk's overload check under row 416: write the walk test of the pair first, see it fail through `harness-one.sh` on the base's code, then fix `interpreter/`, then run `ant testSystem`, since the edit is to walk's Java.
   A change across both areas, or one that touches a decision, goes to the curator as a decision not taken.
5. Do not pin or compare the order in which walk's message names the two declarations; it varies from run to run.

**Path and scope.** Walk refuses at load (row 416). The checker accepts the pair. The compiled path links the interpreter's library only after the switch-over.

**Passages.** Orientation, "Traits and objects" ("Walk applies no instantiation exclusion (row 416). So it runs such a type, and it refuses overloads on two instantiations, as at `Tg[\3\]` and `Tg[\4\]`") and "Dispatch and overloading" ("Walk's load check is not the verdict of these rules ... Before you change code to pass walk's check ... find the case and its row in `interpreter.md`"). `interpreter.md`, "What walk checks" (refuses two declarations its parameter-by-parameter check cannot order; "a library edit can stop every program at load, if it ... adds an overload"; message order varies). `SKILL.md`, "Fortress as a language" (exclusion rule). `exploring.md`, "The choices that are yours". `tests-writing.md`, "How a defect is recorded". `tests-running.md`, "When to run a whole suite".

---

## 19. An unrecognised error inside an untouched library function

**Decision.**

1. Reproduce it and read it whole, with the Java stack, from `ProjectFortress/` as the harness does: `cd ProjectFortress && ../bin/fortress -debug stacktrace tests/X.fss`. If it shows only in the harness, which runs at four threads with 768 MB, try the direct run at four threads, and at 256 MB before claiming a memory limit.
2. Search the record before investigating:
   - `$T 'ledger-find:<words of the message>'`, then `$T 'ledger:N'`;
   - FACTS titles (`$T 'WORDS'`) and a grep of `FACTS.md` and `POSITIONS.md`;
   - `$T 'index:WORDS'`;
   - `revival-changes.md` for the documented departures. Known messages include "Cannot unify", "Ambiguous coercion", "body param 1" in `__bigOperator`, `CastError` on an empty `SUM`, and "Variable X is already declared".
   A failure inside a loop or a reduction is most often in the library's code.
3. Check my own test against the rules first: a numeral bound to `NN32`, a missing static argument on `SUM`, an element that does not convert to a reduction's instance, a name of a functional method, a `Maybe` as a condition.
4. Run the test on the old code (the base build through its `harness-one.sh` with `FORTRESS_HOME=<base-build>`, `worktrees.md`, "Running the old code"). Then I know whether my change provoked the error or it was there before. If the program can run compiled, run it there too.
5. If the record does not know it, it is a gap: switch to exploring.
   - Repairing the untouched function is mine only within "The choices that are yours" and my brief, test first.
   - Otherwise it is deferred: a gated `XXX` test if the specification settles it, or a test of today's behaviour and a ledger row if not, or a row with reproducer `none` if no gated test can pass while it shows.
   - Report it under **Defects**, with the way it is recorded.
6. Do not delete caches to make it go away, and change one thing at a time.

**Path and scope.** Walk (the test's path); also the compiled path if the program can run there.

**Passages.** `SKILL.md`, "Rules for every task" ("Reproduce a behaviour before you explain it"; "Before you investigate a defect ... look for its rows in the gap ledger"; "change one thing at a time"), "When to explore" and "How a program runs" (run it on the other path). `tests-running.md`, "Interpreter tests" (direct run with `-debug stacktrace` from `ProjectFortress/`). `interpreter.md`, "Running a program" (heaps, threads). `records.md`, "Reading the record". `library.md`, "How loops and reductions call the library". `worktrees.md`, "Running the old code". `exploring.md`, "The procedure". `tests-writing.md`, "How a defect is recorded". `build-and-caches.md`, "Symptoms of a skipped step" (do not delete caches).

---

## 20. A compiled test of a function on `[1.0 2.0 3.0]`

**Decision.** Today the test cannot pass, so it is an `XXX` test that names the wall:
- the code generator has no case for an array literal;
- the compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`;
- until the switch-over, a compiled test uses none of these.

Steps:
1. Write `ProjectFortress/compiler_tests/XXXArrayLiteralRR64.fss` (`component XXXArrayLiteralRR64`). It declares the function on the array and calls it on `[1.0 2.0 3.0]`, asserting the result with `assert(flag, msg)` (the prelude's two-value `assert` covers only `ZZ32`, `String` and `Character`), and ends `run()` with `println("PASS")`, ready for promotion.
2. Compile it once to see which refusal comes first. The parameter's array type may be refused by the checker before the code generator ever sees the literal.
3. Write `XXXArrayLiteralRR64.test`:

       tests=XXXArrayLiteralRR64
       compile
       compile_exception_contains=<text of the code generator's exception>

   For a code-generator wall, that is the key. If the checker refuses first, the key is `compile_err_contains=<the refusal's message>` instead.
4. Look up the wall's ledger row (`$T 'ledger-find:array literal'`) and name the test as its reproducer; if there is no row, write one.
5. Show the test working through the harness, twice. With the library jars in place:

       ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh arrlit ProjectFortress/compiler_tests XXXArrayLiteralRR64.test > tmp/junit-arrlit.txt 2>&1

   - As it is: "Saw expected failure".
   - Changed for one run so that the defect does not show, then restored: red.
6. If the brief allows, assert the function's value meanwhile in a walk test in `ProjectFortress/tests/`.

**Path and scope.** Compiled path. Before the switch-over, the prelude lacks array types and the code generator lacks array literals. After it, the array types come from the one library, but the literal stays a wall until the code generator gets a case. The `XXX` test turns red then and is promoted.

**Passages.** `compiler.md`, "What the compiled path cannot compile yet" ("an array literal, such as `[1 2 3]`"; "The compiler's prelude has no array types, only `ZZ32Vector` and `StringVector` ... Until the switch-over, a compiled test uses none of these. If a test needs one, write it as an `XXX` test that names the wall"). `tests-writing.md`, "Writing an `XXX` test" ("For a code-generator wall ... `compile_exception_contains`"; "For a refusal at compile time ... `compile_err_contains`"; run it twice), "Where a test goes, and how it passes" (`compiler_tests/`; `println("PASS")`), "A test program" (prelude `assert`) and "How a defect is recorded". `tests-running.md`, "Compiled tests". `build-and-caches.md`, "The library order".

# Quiz answers, reader 1 (cases 8 and 35)

## 8. Summing an `RR64` array with a `for` loop and a mutable accumulator

### Decision

The function as the question shapes it:

    arraySum(a: Array[\RR64,ZZ32\]): RR64 = do
        var acc: RR64 = 0.0
        for i <- a.indices() do
            acc := acc + a[i]
        end
        acc
    end

**It is not correct.** A `for` loop is parallel by default: its iterations can run as tasks at once on the fork/join pool. `acc := acc + a[i]` is a read, then a write, of shared mutable state with no `atomic`. Two tasks can read the same `acc`, and one update is lost. The skill names this exact shape as a race.

**Why the direct run printed the right sum.** The setup lines export `FORTRESS_THREADS=1`, so the direct run's pool had one thread and ran the bodies one at a time. That run shows nothing about the race.

**Will its test pass in the suites?** Not reliably, and a pass would prove nothing:
- The suites, `harness-one.sh` and `junit.sh` force `FORTRESS_THREADS=4` and run each test once.
- If the test array has 16 elements or fewer, walk runs the bodies of the parallel range in index order. Then the test passes even at four threads and hides the race.
- With a longer array, the test can lose an update and go red, or pass by luck. "A passing run does not prove that there is none."

**What I keep instead.** Pick one of these:
1. The library's way, which I prefer. A big operator combines its tasks' results itself, so no task writes a shared accumulator:

       arraySum(a: Array[\RR64,ZZ32\]): RR64 = SUM[\RR64\][i <- a.indices()] a[i]

   I write the static argument `[\RR64\]`. The library writes it at its own sites. It also stops the two paths from summing at different types where the expected type comes from a method, a field or an assignment (row 1008).
2. If the brief requires the loop and the accumulator: make the loop sequential, `for i <- seq(a.indices()) do acc := acc + a[i] end`. A loop is sequential only if every generator is `seq(...)`.
3. Not chosen: `atomic do acc := acc + a[i] end` inside the parallel loop. It removes the race, but it serialises the bodies. The order of the float additions also changes from run to run, so for values whose sum is not exact the last bits can differ between runs. That last point is general IEEE-754 knowledge, not a passage of the skill.

**Before writing.** I would check the spelling of the array's index generator, `indices()`, in `Library/FortressLibrary.fsi` (the `Indexed` and `Array` declarations). The skill does not give it. If it is spelled differently, I use the library's spelling.

**The test.** I would add it as `ProjectFortress/tests/ArraySumRR64.fss`:

    component ArraySumRR64
    export Executable

    (* An RR64 array summed by SUM and by a sequential loop, over more than sixteen elements *)
    arraySum(a: Array[\RR64,ZZ32\]): RR64 = SUM[\RR64\][i <- a.indices()] a[i]

    arraySumSeq(a: Array[\RR64,ZZ32\]): RR64 = do
        var acc: RR64 = 0.0
        for i <- seq(a.indices()) do
            acc := acc + a[i]
        end
        acc
    end

    run(): () = do
        a = array[\RR64\](64).tabulate(fn (i: ZZ32): RR64 => asFloat(i))
        assert(arraySum(a) = 2016.0, "SUM over 0 to 63")
        assert(arraySumSeq(a) = 2016.0, "seq loop over 0 to 63")
    end

    end

Notes on the test:
- It has 64 elements, so the parallel parts really run in parallel at four threads.
- The values are whole numbers, so every order of addition gives exactly 2016.0.
- I wrote `asFloat(i)` because walk does not convert a lambda's body to its declared return type, except a numeral (row 387).
- The function names are not library functional methods.

**Runs.** The function uses a `var`, so I check it at one thread and at four:

    explorations/compile-ladder/rung-inference-walk/harness-one.sh <tree>/tmp/h1 ProjectFortress/tests/ArraySumRR64.fss   # four threads; read OK (1 test)
    cd ProjectFortress && FORTRESS_THREADS=1 ../bin/fortress tests/ArraySumRR64.fss                                       # one thread; exit code 0, no "fail"

There is no fix, so there is no failing run: the test only has to pass through the harness. No expected-output file.

### Path and scope

- The race holds on both paths. Walk runs parallel `for` bodies as tasks. "A compiled parallel `for` runs its bodies at once."
- Before the switch-over the function can run only under walk. The compiler's prelude has no array types, only `ZZ32Vector` and `StringVector`. Its `for` loops and reductions work over `ZZ32` ranges only, and its reductions give a `ZZ32` or a `String`. So the test is a walk test in `ProjectFortress/tests/`.
- After the switch-over, the same code and the same race reach the compiled path. The compiled code tracks a mutable variable through a transaction only inside an `atomic` block, so the race is not hidden there either.

### Passages relied on

- `SKILL.md`, "Parallelism and mutable state": "The iterations of a `for` loop ... can run at once. A loop is sequential only if every generator is `seq(...)`"; "A big operator, such as `SUM` ... combines the results of its tasks ... No task writes a shared accumulator"; "So `acc := acc + x` inside a parallel `for`, with no `atomic`, is a race. The suites run at four threads, once each, so a race can show in them. A passing run does not prove that there is none."
- `references/build-and-caches.md`, "Setting up each call": the setup lines export `FORTRESS_THREADS=1`. Also `references/interpreter.md`, "Running a program": "Your setup sets `FORTRESS_THREADS` ... to 1."
- `references/tests-writing.md`, "Names, comments, citations": "Under walk, a parallel range of sixteen elements or fewer, as `0#16`, runs its bodies in index order, so a test of parallelism there needs a longer range." Also: "If your change touches mutable state ... run its checks at one thread and at four. `harness-one.sh`, `junit.sh` and the suites force four threads."
- `references/tests-running.md`, "The two suites": "Each JVM gets ... `FORTRESS_THREADS=4`."
- `references/library.md`, "The curator's decisions on the library": `SUM` is generic over `AdditiveGroup`; "In the library, write it [the element type]"; `tabulate` takes a function of the index. Also `references/revival-changes.md`, "Reductions and comprehensions" (row 1008).
- `references/compiler.md`, "What the compiled path cannot compile yet": the prelude has no array types, `for` and reductions only over `ZZ32` ranges. Also "Traps of the compiled path": "A compiled parallel `for` runs its bodies at once." Also "The runtime": a mutable variable's cell goes through the transaction inside an `atomic` block.
- `references/interpreter.md`, "How walk evaluates a program": a body with a declared return type is not converted by coercion, except a numeral (row 387). Also `references/revival-changes.md`, "Numbers": `asFloat(self): RR64` on each number type.
- `references/tests-writing.md`, "Where a test goes, and how it passes", and "The order": a test with no fix only has to pass through the harness.

## 35. Compiled tests of a program's own self-typed ordered type

### Decision

**First, look things up:**
1. Print ledger rows 1050, 1051 and 1052 (`$T 'ledger:1051'`, `$T 'ledger:1052'`, with `T=explorations/coordinator/tools/facts-extract.sh`), and run `$T 'ledger-find:ClassCircularityError'`. This shows each row's reproducer and current text.
2. If a gated test already asserts one of these exact cases, I would add my case beside it rather than repeat it ("Assert each case in one test only"). I would say so in the report.
3. With `git grep` in `ProjectFortress/compiler_tests/`, check that no plain test already holds case (a).
4. Grep `Library/FortressLibrary.fsi` for a type named `Ord`, and for top-level or functional `lt`, `same`, `larger` or `keyOf`. After the switch-over these programs link against that library. A clashing type name, or an overload that breaks the Meet Rule beside the library's, would break them then. If one clashes, I rename it now, for example to `MyOrd`.

`Ord` is self-typed: it has no `comprises` clause, and its parameter `T` is bounded by `Ord[\T\]` itself (P-146). So in its bodies `self` has the type `Ord[\T\]` ∩ `T`. Here `X` is `T`, at the object type `Late`.

Every program below follows the compiled-test form:
- its `run()` ends with `println("PASS")`;
- it uses the prelude's two-value `assert`, which is declared for `ZZ32`;
- it writes no `override`;
- `Ord` lists no `comprises`, so the `NoSuchMethodError` trap of row 815 does not apply.

#### (a) `same(self): T = self`

- **Today:** it compiles, links and runs. A compiled body of a self-typed trait that returns `self` at `X` runs, also where `X` is an object type.
- **Switch-over:** no change. The program uses only its own trait, `println`, `ZZ32`'s `<` and `assert`, which the one library also has.
- **Test:** one plain test, with no change to the program.

`compiler_tests/OrdSameSelfCompiled.fss`:

    component OrdSameSelfCompiled
    export Executable

    (* A self-typed trait's default body that returns self at T *)
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

`compiler_tests/OrdSameSelfCompiled.test`:

    tests=OrdSameSelfCompiled
    link
    run
    run_out_contains=PASS

- **Expected through the harness:** green (link passes, run prints PASS).

#### (b) `larger(self, other: T): T = if lt(other, self) then self else other end`

- **Today:** the checker accepts it and it links. The run fails the JVM's verification (`VerifyError`) when the class with this body loads: a conditional with `self` in one arm and another value in the other (row 1051).
- **Switch-over:** no change. This is a defect of the code generator. It is not a prelude limit stated "Until the switch-over", so the `XXX` test stays until row 1051 is fixed.
- **How the defect is recorded:** the specification settles the answer (2), so it is item 2 of "How a defect is recorded": a gated `XXX` run-time pair. For the value itself, I add a plain test of the documented workaround.

The `XXX` program as written, `compiler_tests/XXXOrdLargerSelfArmCompiled.fss`:

    component XXXOrdLargerSelfArmCompiled
    export Executable

    (* A self-typed trait's default body with self in one arm of a conditional *)
    trait Ord[\T extends Ord[\T\]\]
        lt(self, other: T): Boolean
        larger(self, other: T): T = if lt(other, self) then self else other end
    end

    object Late(x: ZZ32) extends Ord[\Late\]
        lt(self, other: Late): Boolean = x < other.x
    end

    run(): () = do
        println("REACHED")
        assert(larger(Late(1), Late(2)).x, 2, "larger of 1 and 2")
        println("PASS")
    end

    end

`compiler_tests/OrdLargerSelfArmCompiledLink.test`:

    tests=XXXOrdLargerSelfArmCompiled
    link

`compiler_tests/XXXOrdLargerSelfArmCompiled.test`:

    tests=XXXOrdLargerSelfArmCompiled
    run
    run_out_contains=REACHED

- **Choosing the `REACHED` key:** before fixing the key, I reproduce the failure once by hand: `cd ProjectFortress && ../bin/fortress compile compiler_tests/XXXOrdLargerSelfArmCompiled.fss && ../bin/fortress run XXXOrdLargerSelfArmCompiled`. I expect `REACHED`, then the `VerifyError` when the body's class first loads at the call. If the run dies before `run()` prints, I write `run_out_does_not_contain=REACHED` instead.
- **Expected through the harness:** the Link test is green (the link succeeds). The `XXX` run test is green as an expected failure ("Saw expected failure" or "OK Saw expected exception").

The workaround, so that the value is checked where the program can give it. Bind `self` at the type first, then use the binding. `compiler_tests/OrdLargerBoundSelfCompiled.fss` is the same program under its own component name, with this body:

    larger(self, other: T): T = do
        r: T = self
        if lt(other, self) then r else other end
    end

`compiler_tests/OrdLargerBoundSelfCompiled.test`:

    tests=OrdLargerBoundSelfCompiled
    link
    run
    run_out_contains=PASS

- **Expected through the harness:** green, I expect. But the skill says this workaround "has been tested only at a type that a `comprises` clause lists, not at `X`", and here it is at `X`. So I run it before I keep it.
- **If it fails** (a `VerifyError` again): the program cannot give the value compiled today. Then the `XXX` pair is the value's only gated test. I drop the plain file, and record the finding as a note on row 1051 (`ledger.py note 1051 ... --check` first), or in the report if the brief does not let me write the ledger.

#### (c) abstract `getter key(): ZZ32`, `Late`'s `getter key(): ZZ32 = x`, default `keyOf(other: T): ZZ32 = other.key`

- **Today:** it links. The run fails with `ClassCircularityError` when the class loads. A default body calls a method on another argument of type `X`, and `Late` lists `Ord` first in its `extends` clause (it is the only entry) (row 1052).
- **Switch-over:** no change, for the same reason as (b). It is a class-loading defect, not a prelude limit.
- **Test:** a gated `XXX` run-time pair, and a plain test of the changed program.

`compiler_tests/XXXOrdKeyOfOtherCompiled.fss`:

    component XXXOrdKeyOfOtherCompiled
    export Executable

    (* A self-typed trait's default body that calls a getter on another argument of type T *)
    trait Ord[\T extends Ord[\T\]\]
        lt(self, other: T): Boolean
        getter key(): ZZ32
        keyOf(other: T): ZZ32 = other.key
    end

    object Late(x: ZZ32) extends Ord[\Late\]
        lt(self, other: Late): Boolean = x < other.x
        getter key(): ZZ32 = x
    end

    run(): () = do
        println("REACHED")
        assert(Late(1).keyOf(Late(2)), 2, "keyOf reads the other key")
        println("PASS")
    end

    end

`compiler_tests/OrdKeyOfOtherCompiledLink.test`:

    tests=XXXOrdKeyOfOtherCompiled
    link

`compiler_tests/XXXOrdKeyOfOtherCompiled.test`:

    tests=XXXOrdKeyOfOtherCompiled
    run
    run_out_contains=REACHED

- **Choosing the `REACHED` key:** as in (b), one hand run settles it. If `Late`'s class loads before `run()` prints, the key becomes `run_out_does_not_contain=REACHED`.
- **Expected through the harness:** Link green; `XXX` run green as an expected failure.

The changed program, for the value. The row ties the failure to `Ord` standing first in the `extends` clause. So `compiler_tests/OrdKeyOfSecondCompiled.fss` is the same program under its own name, with a program-local empty trait listed first:

    trait First end
    object Late(x: ZZ32) extends { First, Ord[\Late\] }
        lt(self, other: Late): Boolean = x < other.x
        getter key(): ZZ32 = x
    end

`compiler_tests/OrdKeyOfSecondCompiled.test`:

    tests=OrdKeyOfSecondCompiled
    link
    run
    run_out_contains=PASS

- **Expected through the harness:** green. The skill states the condition but no tested workaround, so I keep this file only if it passes. If it fails, the `XXX` pair alone checks the value, and I put the finding in a note on row 1052 or in the report.

#### Running them

The setup lines, then a check that `default_repository/caches/bytecode_cache/` holds the five library jars. Then all the new files of the folder in one JVM, each plain Link file before its `XXX` run file. I use the real `climb-batch-N` folder that holds `merged-tests/junit.sh`.

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh ord ProjectFortress/compiler_tests \
        OrdSameSelfCompiled.test \
        OrdLargerSelfArmCompiledLink.test XXXOrdLargerSelfArmCompiled.test OrdLargerBoundSelfCompiled.test \
        OrdKeyOfOtherCompiledLink.test XXXOrdKeyOfOtherCompiled.test OrdKeyOfSecondCompiled.test \
        > <tree>/tmp/junit-ord.txt 2>&1

- I read the verdict from `OK (n tests)` or `FAILURES!!!`, not from the exit code.
- I show the first `XXX` test, (b)'s, working twice. First as it is: an expected failure. Then for one run with the `larger` assertion line removed: it must go red, "missing expected failure". Then I restore it.
- In the report: rows 1051 and 1052 are recorded by the new `XXX` pairs (item 2), and the outcome of each workaround test.

### Path and scope

- All three are compiled tests, about the compiled path today, before the switch-over.
- (a) runs today. (b) and (c) fail when a class loads.
- The switch-over changes none of the three. The defects are in the code generator and the class loader (rows 1051, 1052), not limits of the compiler's prelude. The programs use only operations the one library also provides. The one check is the name clash with the interpreter's library, done before writing.

### Passages relied on

- Orientation (`climb-batch-31/orientation/orientation.md`), "Traits and objects", the paragraph "In a self-typed trait the checker types `self` as the trait met with the implementing type":
  - the two conditions for a self-typed trait (P-146);
  - "A compiled body of `T` that returns `self` at `X` runs, also where `X` is an object type. Three shapes still fail when the class loads";
  - the second shape: a conditional with `self` in one arm fails the JVM's verification (row 1051);
  - the third shape: a default body that calls a method on another argument of type `X` gives a `ClassCircularityError` where the object lists `T` first (row 1052);
  - "For the first two shapes, bind `self` at the type first, as `r: R = self`, and use `r`. This workaround has been tested only at a type that a `comprises` clause lists, not at `X`."
- Orientation, opening paragraphs: only a sentence that opens "Until the switch-over" states a limit that the switch-over ends. Also "`override` widens": the code generator refuses every `override` (row 650).
- `references/tests-writing.md`:
  - "A test program": a compiled run test ends with `println("PASS")`; the prelude's two-value `assert` is declared for `ZZ32`;
  - "How a defect is recorded", item 2: a deferred defect that fails the JVM's verification or linkage at run time takes a gated `XXX` test;
  - "Writing an `XXX` test": the two `.test` files, `REACHED`, never `run_out_contains=PASS`, and the run twice;
  - "How `XXX` works";
  - "Names, comments, citations": assert each case in one test only.
- `references/compiler.md`:
  - "Traps of the compiled path": row 815 applies only through a `comprises` clause;
  - "The runtime": the class loader and its rows;
  - "What the compiled path cannot compile yet": the allowed modifiers.
- `references/tests-running.md`, "Compiled tests": `junit.sh`, `ONE_JVM=1`, run the new files together, read the JUnit verdict. Also `references/build-and-caches.md`, "The library order": the five jars.
- `references/records.md`, "Reading the record" and "Writing to the record": the `ledger:`, `ledger-find:` and `ledger.py note` queries. Also `SKILL.md`, "Rules for every task": reproduce before explaining, and look up the ledger rows first.
- `SKILL.md`, "Fortress as a language": a functional method's name is reserved and overloads with top-level functions. Also `references/interpreter.md`, "What walk checks": the clash of a program's type name with a `FortressLibrary` type. These are the basis of the name check before the switch-over.

# Quiz answers, reader 2 (cases 8 and 35)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its area parts under `references/` (not `revival-changes.md`, not `sources.md`), and `explorations/compile-ladder/climb-batch-31/orientation/orientation.md`.

## 8. Summing an `RR64` array with a `for` loop and `var acc`

**Decision.** The function as asked:

    sumOf(a: Array[\RR64, ZZ32\]): RR64 = do
      var acc: RR64 = 0.0
      for i <- a.indices() do
        acc := acc + a[i]
      end
      acc
    end

The function is wrong. A `for` loop is parallel by default, so its iterations can run at once. Then `acc := acc + a[i]` with no `atomic` is a race: two iterations read the same `acc`, and one of the updates is lost. The direct run tells us nothing. The setup lines export `FORTRESS_THREADS=1`, so the direct run had one thread and the race could not show.

Will the test pass in the suites? The answer depends on the run, and a pass proves nothing:
- The suites and `harness-one.sh` force `FORTRESS_THREADS=4`, and they run each test once.
- Under walk, a parallel range of sixteen elements or fewer runs its bodies in index order. So with a short test array, the test passes in the suites even though the function is wrong.
- With a longer array, the race can show. The test is then flaky: it can pass in one run and fail in the next.

What I would write instead. I use a reduction, which combines the results of its tasks, so no task writes a shared accumulator. I write the static argument, so both paths sum in `RR64`:

    sumOf(a: Array[\RR64, ZZ32\]): RR64 = SUM[\RR64\][i <- a.indices()] a[i]

Two other ways also avoid the race:
- A sequential loop, `for i <- seq(a.indices()) do acc := acc + a[i] end`, keeps the order of Java's left-to-right additions.
- `atomic do acc := acc + a[i] end` removes the race. But it puts the updates in one line, and the floating-point additions happen in an order that changes from run to run. So I would not use it.

Before writing the code, I would check two names in `Library/FortressLibrary.fsi`: the array's index generator (`indices`) and the type that `array[\RR64\](n)` returns.

The test, `ProjectFortress/tests/ArraySumReduction.fss` (component `ArraySumReduction`):
- It uses more than sixteen elements, so that a race could show.
- Its values sum exactly in any order, so the assertion does not depend on the order of the additions:

      a = array[\RR64\](40).tabulate(fn (i: ZZ32): RR64 => asFloat(i))
      assert(sumOf(a) = 780.0, "sum of 0 to 39")

  `asFloat(i)` is there because walk does not convert a body at its declared return type (row 387).
- I run it through `harness-one.sh` (four threads), and also directly with `FORTRESS_THREADS=1`. I check the exit code and the output of both runs.

**Path and scope.**
- Walk: the case above. The race exists on both paths. On the compiled path, a parallel `for` runs its bodies at once.
- Compiled path, before the switch-over: the function cannot be compiled at all. The compiler's prelude has no array types, and its reductions give only a `ZZ32` or a `String`. So for now it is a walk test.

**Passages.**
- `SKILL.md`, "Parallelism and mutable state": "The iterations of a `for` loop ... can run at once. A loop is sequential only if every generator is `seq(...)`"; "A big operator ... combines the results of its tasks ... No task writes a shared accumulator"; "So `acc := acc + x` inside a parallel `for`, with no `atomic`, is a race. The suites run at four threads, once each, so a race can show in them. A passing run does not prove that there is none."
- `references/build-and-caches.md`, "Setting up each call": `FORTRESS_THREADS=1`. `references/interpreter.md`, "Running a program": the setup sets the pool to 1.
- `references/tests-writing.md`, "Names, comments, citations":
  - "Under walk, a parallel range of sixteen elements or fewer ... runs its bodies in index order";
  - "run its checks at one thread and at four. `harness-one.sh`, `junit.sh` and the suites force four threads."
- `references/compiler.md`:
  - "What the compiled path cannot compile yet": the prelude has no array types, and its reductions give a `ZZ32` or a `String`;
  - "Traps of the compiled path": a compiled parallel `for` runs its bodies at once.
- Orientation, "Reductions and comprehensions": the two paths fix an unwritten `SUM` argument differently, so I write it. Orientation, "Arguments convert ...": walk does not convert at a declared return type (row 387).

## 35. Compiled tests of a self-typed `Ord`'s three default bodies

`Ord` has no `comprises` clause, and its parameter is bounded by `Ord` itself. So it is self-typed. In its bodies, `self` has the type `Ord[\T\]` met with `T`. `Late extends Ord[\Late\]` is a `Late`, so the checker accepts the program.

Common form of all three tests:
- Each test goes in `ProjectFortress/compiler_tests/`.
- Each asserts with the prelude's two-value `assert` for `ZZ32`, then prints `PASS`.
- `Late` writes no `override`: the code generator refuses that modifier (row 650).

How I run them, in one JVM, with the plain Link file before its `XXX` file. First I find the real `climb-batch-N` folder of my tree's `junit.sh`:

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh ord \
        ProjectFortress/compiler_tests SelfTypedSameCompiled.test \
        SelfTypedLargerCompiledLink.test XXXSelfTypedLargerCompiled.test \
        SelfTypedKeyOfCompiledLink.test XXXSelfTypedKeyOfCompiled.test > tmp/junit-ord.txt 2>&1

Before writing, I would read the rows with `facts-extract.sh 'ledger:1051'` and `'ledger:1052'`. They give each row's reproducer, and say whether a gated `XXX` test already holds the shape. If one does, I would add my case to that test, since each case is asserted in one test only.

### (a) `same(self): T = self`

**What the compiled path does today.** It compiles, links and runs, and it prints `PASS`. A compiled body of a self-typed trait that returns `self` at `T` runs, also where `T` is an object type.

**The test.** A plain test, with no change to the program:
- `SelfTypedSameCompiled.fss`, component `SelfTypedSameCompiled`. Its `run()` does `assert(same(Late(1)).x, 1, "same returns self")`, then `println("PASS")`.
- `SelfTypedSameCompiled.test`:

      tests=SelfTypedSameCompiled
      link
      run
      run_out_WIcontains=PASS

**Expected result through the harness.** Green on the link and on the run.

**Switch-over.** No change. This rule is not an "Until the switch-over" limit of the prelude.

### (b) `larger(self, other: T): T = if lt(other, self) then self else other end`

**What the compiled path does today.** The checker accepts the program and the link succeeds. The run fails when the trait's class loads: a conditional with `self` in one arm and another value in the other fails the JVM's verification (`VerifyError`, row 1051).

The body also calls `lt` on `other`, a value of type `T`, and `Late` lists `Ord` first. So the third shape (`ClassCircularityError`, row 1052) may apply as well. Row 1052 settles whether a functional-method call counts.

**The test.** This is a deferred defect that the specification settles: the answer is 2. So it is a gated `XXX` run-time pair over component `XXXSelfTypedLargerCompiled`:
- `XXXSelfTypedLargerCompiled.fss`: `run()` prints `REACHED`, then does `assert(larger(Late(1), Late(2)).x, 2, "larger picks the larger")`, then `println("PASS")`.
- `SelfTypedLargerCompiledLink.test`:

      tests=XXXSelfTypedLargerCompiled
      link

- `XXXSelfTypedLargerCompiled.test`:

      tests=XXXSelfTypedLargerCompiled
      run
      run_out_contains=REACHED

  If the class fails before `run()` prints, the key is `run_out_does_not_contain=REACHED` instead. I settle which by compiling and running the program once and reading its output.

**Expected result through the harness.**
- The Link file is green.
- The `XXX` file is green: it prints `Saw expected failure` or `OK Saw expected exception`. It turns red when row 1051 is fixed, and is then promoted.
- This is the first `XXX` test of my change, so I run it twice. First as it is, which gives the expected failure. Then once with the failing part removed, as `larger` replaced by a body without the conditional, which must give red. Then I restore it.

**Change to the program.** The workaround for this shape binds `self` first: `s: T = self`, then `if lt(other, s) then s else other end`. The workaround has run only in a trait with a `comprises` clause, and `Ord` has none. So I compile and run it before keeping it.
- If it gives 2: I keep it as a plain test, `SelfTypedLargerBoundCompiled` (its `.test` file is like (a)'s), beside the `XXX` pair.
- If it fails with a `VerifyError`: the workaround does not hold without `comprises`. That is a finding, to go into a note on row 1051.
- If it fails with a `ClassCircularityError`: the call of `lt` on `other` is the third shape (row 1052).

**Switch-over.** No change expected. These are failures of the generated classes, not "Until the switch-over" limits.

### (c) abstract `getter key(): ZZ32`, `Late` gives `getter key(): ZZ32 = x`, default `keyOf(other: T): ZZ32 = other.key`

**What the compiled path does today.** The program checks and links. The run fails with a `ClassCircularityError` when the class loads: a default body calls a method (`key`) on a value of type `T`, and `Late` lists `Ord` first in its `extends` clause (row 1052).

**The test.** The same `XXX` run-time pair form as (b), over `XXXSelfTypedKeyOfCompiled`:
- `run()` prints `REACHED`, then does `assert(Late(1).keyOf(Late(2)), 2, "keyOf reads the other key")`, then `println("PASS")`.
- `SelfTypedKeyOfCompiledLink.test`: `tests=XXXSelfTypedKeyOfCompiled` and `link`.
- `XXXSelfTypedKeyOfCompiled.test`: `tests=XXXSelfTypedKeyOfCompiled`, `run`, and `run_out_contains=REACHED`. If the class fails before `run()` prints, the key is `run_out_does_not_contain=REACHED`; one run settles which.

**Expected result through the harness.** The Link file is green. The `XXX` file is green, as an expected failure, until row 1052 is fixed.

**Change to the program.** The record's fix for this shape is to declare the method in the object, as `keyOf(other: Late): ZZ32 = other.key` in `Late`. That gives 2, but it no longer tests the trait's default body. So it is no plain test of this case.

The condition "where the object lists `T` first" suggests a second way: list another trait before `Ord[\Late\]`. That way is not in the record. I would try it once, and keep it as a plain test only if it gives 2. If it does, I would report it as a finding on row 1052.

**Switch-over.** No change expected.

**Path and scope (all of 35).** The compiled path, before the switch-over and after it. None of the three shapes is stated as a limit of the compiler's prelude.

**Passages.**
- Orientation, "Traits and objects":
  - "In a self-typed trait the checker types `self` as the trait met with the implementing type"; the two conditions; "The checker refuses a type that extends `T[\A\]` and is not an `A`."
  - "A compiled body of `T` that returns `self` at `X` runs, also where `X` is an object type. Three shapes still fail when the class loads" (rows 1050, 1051, 1052).
  - "For the first two shapes, bind `self` to a variable of type `X` first ... This workaround has run only in a trait with a `comprises` clause ... so run it before you keep it. For the third shape, declare the method in the object."
- Orientation, opening section: "A sentence that opens 'Until the switch-over' states a limit of the compiler's library." None of these sentences opens so.
- `references/tests-writing.md`:
  - "How a defect is recorded", item 2: a program that the checker accepts and that then fails the JVM's verification at run time gets a gated `XXX` test.
  - "Writing an `XXX` test": the two `.test` files, `REACHED`, never `run_out_contains=PASS`, and the run-twice check.
  - "How `XXX` works": the Link file is green on an exception, an unmet `run_*` check is red, and a green `XXX` test prints `Saw expected failure`.
  - "A test program": the prelude's two-value `assert` for `ZZ32`.
  - "Promoting an `XXX` test".
- `references/compiler.md`, "What the compiled path cannot compile yet": `override` is refused (row 650).
- `references/tests-running.md`, "Compiled tests": `junit.sh` with `ONE_JVM=1`, and its real folder name.
- `references/records.md`, "Reading the record": `ledger:ROW`.

<!-- Quiz reader 1's answers to the regression questions of cases file quiz-cases.txt (21, 38), from CLAUDE.md, the fortress-repo skill's core and area parts, and this batch's orientation only. -->

# Quiz answers, reader 1

Sources read: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; every part under `references/` except `revival-changes.md` and `sources.md`; `explorations/compile-ladder/climb-batch-34/orientation/orientation.md` (called "the orientation" below). Cases: 21 and 38.

## 21. The generic array/number `+` and `-` beside `AdditiveGroup`'s own

### Decision

**The library pairs.** They are a valid overloading. The library needs no change: no new `excludes` clause, no rename, no extra declaration that covers a meet. I answer the brief from the record and do not switch to exploring, because the orientation decides the case (`exploring.md`, "The procedure", step 2).

The reasoning, from the orientation:

- `AdditiveGroup` is a self-typed trait: it has no `comprises` clause, and its parameter is bounded by the trait itself (P-146).
- When the checker tests whether two domains exclude each other, `self` in a method of such a trait has the type `AdditiveGroup[\T\]` met with `T` (P-157).
- In that same test, the checker puts the meet of a static parameter's bounds in the parameter's place where the parameter is a whole parameter type (P-157). It reads exclusion over the whole tuple of parameter types (P-152).
- With these readings, the generic array/number operators and `AdditiveGroup`'s `+` and `-` exclude each other. The orientation says exactly this: "the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own."

Before I write the answer, I would print the entries that it rests on, so that I can cite them exactly: `T=explorations/coordinator/tools/facts-extract.sh`, then `$T 'P-157'`, `$T 'P-152'`, `$T 'P-146'` and `$T 'ledger:999'` (`records.md`, "Reading the record"). I would rerun nothing. The orientation states the verdict, and SKILL.md records that the checker already finds no error in the interpreter's library (a count-stage total of 0).

**My own test program with the same shape.** It loads under walk and it compiles, as long as I keep it out of row 999's two cases. I would write it like this:

```
trait MyGroup[\X extends MyGroup[\X\]\] excludes { Number }   (* self-typed directly *)
    opr +(self, other: X): X                                  (* no static parameters of its own *)
end
trait MyNum extends MyGroup[\MyNum\] end
trait MyArr extends MyGroup[\MyArr\] excludes { MyNum } end
object Num(k: ZZ32) extends MyNum   opr +(self, other: MyNum): MyNum = ... end
object Vec(v: ZZ32) extends MyArr   opr +(self, other: MyArr): MyArr = ... end
opr +[\N extends MyNum\](a: MyArr, n: N): MyArr = ...
opr +[\N extends MyNum\](n: N, a: MyArr): MyArr = ...
```

For the two generic operators, I would copy the library's own headers from `Library/FortressLibrary.fsi`, with my traits in place of the library's array and number types, so that the test has the library's real shape.

The design rests on these points:

- **Self-typed directly.** `MyGroup` must be self-typed through its own parameter, and its `+` must have no static parameters of its own. In either of the other cases, walk's load check refuses the valid pair (row 999): when the trait is self-typed only through another self-typed trait that it extends, or when its method has its own static parameters. If my test needs one of those forms, the rules still say the pair is valid. So I would record walk's refusal as an `XXX` walk test, `ProjectFortress/tests/XXXName.fss` with no `.test` file. It is green while walk refuses at load, and red once walk loads the program.
- **Each extender is its own instance.** Every type that extends `MyGroup[\A\]` is an `A`. Walk does not refuse a type that breaks this, and a call can then silently run the wrong declaration (row 893).
- **Bodies in the objects.** I put the `+` bodies in the objects, without `override`:
  - The code generator refuses every `override` modifier (row 650).
  - A trait in between that declares the method again at the same parameter types risks row 1037.
  - `self` stays first. Otherwise the compiled dispatch tests the wrong argument (row 573).
- **`excludes { Number }`.** This is a precaution against the library's own generic `+` between an array and a number. A program's trait that declares its own functional `+` overlaps that operator unless the trait excludes `Number`. Without the clause, walk can refuse the program at load with "fails the Meet Rule" (P-160). The checker accepts such a pair against the library's `+` (row 918). I write `excludes { Number }` rather than `excludes { HasRank }`, for two reasons:
  - my number trait is not below `Number`;
  - the compiler's prelude declares no array types, so `HasRank` would not compile before the switch-over.

### Path and scope

- **The library pairs.** Walk loads them today. The orientation says walk reads `self` in the same way. On the compiled path, the checker meets them only where it reads the interpreter's library: the count stage and the distance stage today, and every compile after the switch-over. The verdict, valid, holds there. Before the switch-over the pairs do not exist on the compiled path, because the compiler's prelude has no array types (`compiler.md`, "What the compiled path cannot compile yet").
- **My test.** Walk loads and runs it today. On the compiled path, the checker accepts it (P-157 applies to a program's own component), and it compiles and runs today, before the switch-over, because it uses only its own traits. After the switch-over the library's array/number `+` enters the compiled path too. The `excludes { Number }` clause keeps the program valid there.
- **Tests.** I would put one test on each path: `ProjectFortress/tests/Name.fss`, and `compiler_tests/Name.fss` with a `.test` that has `link`, `run` and `run_out_WIcontains=PASS`. On the compiled path, I would assert with the two-value `assert` at `ZZ32` only, because the compiler's library declares it only for `ZZ32`, `String` and `Character`. For example, I would assert a `ZZ32` field of each result.

### Passages relied on

- Orientation, "Traits and objects", the paragraph on self-typed traits that starts "When the checker applies the overloading rules to a method of `T`", with its two bullets (row 999).
- The paragraph before it ("In a self-typed trait the checker types `self` …", P-146).
- Orientation, "Dispatch and overloading": P-152, the exclusion test's reading of bounds (P-157), and the Meet Rule paragraph (P-160, row 918).
- Orientation, "Traits and objects", "`override` widens" (rows 650, 1037).
- `interpreter.md`, "What walk checks" (row 893).
- `compiler.md`, "Traps of the compiled path" (row 573) and "What the compiled path cannot compile yet".
- `tests-writing.md`, "A test program" (`assert` at `ZZ32`, `String` and `Character`) and "How `XXX` works".
- SKILL.md, "How a program runs" (count-stage total 0).

## 38. `Measured` and `Box`: a narrower return type in a self-typed trait

### Look-ups first

- **Row 1094.** I would print it: `explorations/coordinator/tools/facts-extract.sh 'ledger:1094'`. If its reproducer cell already names a gated `XXX` test of this exact form, I would cite that test and not add a second one ("Assert each case in one test only"). I would report that as a decision.
- **`git grep`.** I would also `git grep` `compiler_tests/` for `Measured` and for a narrow return type in a self-typed trait.
- **`python3 explorations/coordinator/tools/ledger.py find --cites`.** I would not need it, since I edit no file of the original tree outside the new tests.

### (a) The declarations as written

**What happens today.**

- **Walk.** Walk runs the program and prints `PASS`. It checks no static types. Box's `size()` covers the inherited abstract `size()` at the same parameter types. There is no `override` for its load check to refuse.
- **Compiled path.** The checker refuses the program. `Measured` is self-typed: it has no `comprises` clause, and `M` is bounded by `Measured[\M\]`. Where an object redeclares a dotted method of a self-typed trait at the same parameter types, the checker reads `self` as the trait met with the implementing type. So it refuses the narrower return type `ZZ32` against `Number`. This is a departure, row 1094.
- **Verdict.** The rules accept the program: an overriding return type need only be a subtype. Because the rules decide the case, the test asserts their answer as an `XXX` test (orientation, the opening paragraph on sentences that cite a ledger row).

**The program.** I make no change, except that the component takes the `XXX` name.

`ProjectFortress/compiler_tests/XXXSelfTypedNarrowReturnCompiled.fss`:

```
component XXXSelfTypedNarrowReturnCompiled
export Executable

(* An object redeclares a self-typed trait's dotted method at a narrower return type. *)
trait Measured[\M extends Measured[\M\]\]
    size(): Number
end

object Box(n: ZZ32) extends Measured[\Box\]
    size(): ZZ32 = n
end

run(): () = do
    println("PASS")
end

end
```

`ProjectFortress/compiler_tests/XXXSelfTypedNarrowReturnCompiled.test`:

```
tests=XXXSelfTypedNarrowReturnCompiled
compile
compile_err_contains=<the checker's refusal, copied from the reproducing compile>
```

**Getting the message.** No passage that I read gives the refusal's text. So I would first reproduce it and copy the words from the compile's output, after the setup lines: `cd ProjectFortress && ../bin/fortress compile compiler_tests/XXXSelfTypedNarrowReturnCompiled.fss`. I would also run the walk check: `cd ProjectFortress && ../bin/fortress compiler_tests/XXXSelfTypedNarrowReturnCompiled.fss`, which prints `PASS`.

**The result through the harness.** Before the run, I state: "Expected failure: the compile of XXXSelfTypedNarrowReturnCompiled stops on the checker's refusal of Box's `size(): ZZ32`, and the harness reports Saw expected failure." The command uses my tree's copy of `junit.sh`, under the real `climb-batch-N` folder that holds `merged-tests/`: `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh q38 ProjectFortress/compiler_tests XXXSelfTypedNarrowReturnCompiled.test SelfTypedNarrowGetterCompiled.test > tmp/junit-q38.txt 2>&1`.

- **As written.** The `XXX` case is green and prints `Saw expected failure`.
- **Check run.** Since this is the first `XXX` test of the change, I run it a second time with Box's `size()` changed to `: Number` for that run only. The program then compiles, and the harness reports "Saw wrong failure", which is red. Then I restore the line.
- **Verdict.** Together with (b), the verdict is `OK (3 tests)`: one compile case and two cases (link, run) for (b).

**At the switch-over.** Nothing changes. Row 1094 is a departure of the checker, not a limit of the compiler's prelude. The test turns red only when the checker is fixed. Then I promote it: rename it without `XXX`, and give it `link`, `run` and `run_out_WIcontains=PASS`.

### (b) The size of `Box(4)`, asserted compiled

**The declarations.** I declare `size` as a getter, which compiles with the narrower type (orientation). I keep these lines.

`ProjectFortress/compiler_tests/SelfTypedNarrowGetterCompiled.fss`:

```
component SelfTypedNarrowGetterCompiled
export Executable

(* A self-typed trait's getter, redeclared at a narrower type, reads at that type. *)
trait Measured[\M extends Measured[\M\]\]
    getter size(): Number
end

object Box(n: ZZ32) extends Measured[\Box\]
    getter size(): ZZ32 = n
end

run(): () = do
    assert(Box(4).size, 4, "size of Box(4)")
    println("PASS")
end

end
```

`ProjectFortress/compiler_tests/SelfTypedNarrowGetterCompiled.test`:

```
tests=SelfTypedNarrowGetterCompiled
link
run
run_out_WIcontains=PASS
```

**Why a getter.** The alternative is to declare Box's `size()` at the trait's return type, `Number`. That compiles, but `Box(4).size()` then has the static type `Number`. Until the switch-over, the compiled path has no `assert` or `=` at `Number`: its two-value `assert` takes only `ZZ32`, `String` and `Character`, and it has no `=` over `Any`. The check would then need a `typecase` back to `ZZ32`. The getter keeps the static type `ZZ32`, so a plain `assert` works on both paths.

**What happens today.**

- **Walk.** It runs the program and prints `PASS`.
- **Compiled path.** It compiles, links and runs it, before the switch-over, and the run prints `PASS`.
- **Through the harness.** Both cases are green, in the `junit.sh` call above. This test comes with no fix, so it has no failing run.
- **At the switch-over.** It stays green.

### Passages relied on

- Orientation, "Traits and objects": the self-typed paragraph, its sentence "The checker also reads that type, a departure, where an object redeclares a dotted method of `T` at the same parameter types (row 1094). So it refuses a narrower return type there, which walk runs. Declare the method at `T`'s return type, or as a getter, which compiles with the narrower type."
- The paragraph before it, on what makes a trait self-typed.
- Orientation, "`override` widens": no `override`, which the code generator would refuse (row 650); the checker checks that an overriding return type is a subtype.
- Orientation, opening paragraph: a case that the rules decide gets an `XXX` test that asserts their answer; "Until the switch-over" marks only the prelude's limits.
- `tests-writing.md`:
  - "Writing an `XXX` test": a refusal at compile time gets one `XXX` compile test with `compile_err_contains`; the check run that turns the test red.
  - "How `XXX` works": "Saw wrong failure", "Saw expected failure".
  - "How a defect is recorded", item 2.
  - "The order": the `Expected failure:` line; a test with no fix needs no failing run.
  - "Promoting an `XXX` test".
  - "Names, comments, citations": assert each case once; one comment line.
  - "A test program": `println("PASS")`; the compiler's library has `assert` at `ZZ32`, `String` and `Character` only.
- `compiler.md`, "What the compiled path cannot compile yet" (no `override`).
- `tests-running.md`, "Compiled tests" (`junit.sh` with `ONE_JVM=1`).
- `records.md`, "Reading the record" (`ledger:1094`).
- The orientation's "Where a type declares no `=` …": the compiler's library has no `=` over `Any` until the switch-over.

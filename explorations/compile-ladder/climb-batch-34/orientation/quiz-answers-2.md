# Quiz answers, cases 21 and 38

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its parts under `references/` except `revival-changes.md` and `sources.md`, and the orientation `explorations/compile-ladder/climb-batch-34/orientation/orientation.md`. "Orientation" below means that file.

## 21. The library's generic `+` and `-` between an array and a number, beside `AdditiveGroup`'s own

**Decision: the library.** The pairs are a valid overloading. The library changes nothing: keep the generic `+` and `-` (number on either side) beside the `+` and `-` that `Vector` and `Matrix` inherit from `AdditiveGroup`, and add no `excludes` or cover for them. Why they are valid: `AdditiveGroup` is self-typed. In the checker's test of whether two domains exclude each other, `self` has the intersection type of `AdditiveGroup[\X\]` and `X` (P-157). Exclusion is read over the whole tuple of parameter types (P-152). A static parameter that is a whole parameter type is read at the meet of its bounds (P-157). So a value in both domains forces `X` to be the array's instance, and then the other position excludes, because an array is not a number. In the brief's answer I cite P-157 and P-152. Before I write it, I print them (`explorations/coordinator/tools/facts-extract.sh 'P-157'`, `'P-152'`) to quote their text, and row 999 (`'ledger:999'`) for walk's two exceptions below. Nothing in the record makes this a conflict, so I do not switch to exploring. If the brief wants evidence from the checker, I run the count stage (`explorations/coordinator/tools/checker-count/run.sh <out> <scratch>`, in the background) and check that no error names these operators.

**Decision: my own test program.** It loads under walk, and it compiles. Walk reads `self` the same way as the checker, so it loads such a pair in a program's own component as well as in the library. The checker accepts the pair, also for the generic operators in the same component as the trait. Under walk this holds only if I write the trait in the shape that walk reads. Two shapes make walk's load check refuse the valid pair (row 999):
- the trait is self-typed only through another self-typed trait that it extends. So I write the bound on the trait itself: `trait Grp[\X extends Grp[\X\]\]`;
- the trait's operator has static parameters of its own. So I give `opr +(self, other: X): X` none.

If the brief needs one of those two shapes, the test of it is an `XXX` walk test that asserts the run. The rules decide the case (the pair is valid), so it is green while walk refuses at load.

The program's own functional `+` (and `-`) also meets the interpreter's library's generic `+` between an array and a number. A type can extend both the program's trait and `Number`, so the two overlap, and walk refuses at load with "fails the Meet Rule" (P-160). I therefore declare the group trait `excludes { Number }`, and the number trait too, so that the program's generic operators exclude the library's generic operators. The program's numbers are then not below `Number`. If they had to be, I would follow the orientation's other fix (`excludes { HasRank }` on a trait that extends `Number`, or the `+` in an object). The checker accepts this overlap against the library's `+` (row 918). Before the switch-over, the compiled path's prelude has no array types anyway. The shape:

    trait Grp[\X extends Grp[\X\]\] excludes { Number }
        opr +(self, other: X): X
    end
    trait Num excludes { Number }
        getter v(): ZZ32
    end
    object Cnt(c: ZZ32) extends Num
        getter v(): ZZ32 = c
    end
    trait Arr[\E extends Num\] extends Grp[\Arr[\E\]\] excludes { Num }
        getter k(): ZZ32
    end
    object Vec(n: ZZ32) extends Arr[\Cnt\]
        getter k(): ZZ32 = n
        opr +(self, other: Arr[\Cnt\]): Arr[\Cnt\] = Vec(n + other.k)
    end
    opr +[\E extends Num\](a: Arr[\E\], x: E): ZZ32 = a.k + x.v
    opr +[\E extends Num\](x: E, a: Arr[\E\]): ZZ32 = x.v + a.k

    run(): () = do
        a: Arr[\Cnt\] = Vec(2)
        assert((a + Vec(3)).k, 5, "group +")
        assert(a + Cnt(4), 6, "array + number")
        assert(Cnt(4) + a, 6, "number + array")
        println("PASS")
    end

I run it before I claim either answer: `bin/fortress P.fss` for walk, and from `ProjectFortress/` `../bin/fortress compile <path>/P.fss` then `../bin/fortress run P` for the compiled path. As gated tests, these are a walk test `ProjectFortress/tests/<Name>.fss` (green if it loads, exits 0 and prints no "fail"), and a compiled copy `compiler_tests/<Name>Compiled.fss` with a `.test` file holding `tests=`, `link` and `run`. The compiled asserts use `ZZ32` values only, since the compiler's two-value `assert` is declared only for `ZZ32`, `String` and `Character`.

**Path and scope.**
- The library's pairs: valid for the checker, which reads the interpreter's library in the count stage today and on the compiled path after the switch-over. Walk loads them today.
- The program: loads under walk today in the self-typed-by-its-own-bound shape, and is refused at load in the two row-999 shapes. It compiles today against the compiler's prelude, and the switch-over does not change that.

**Passages.**
- Orientation, "Traits and objects", second paragraph on self-typed traits: "In its test of whether two domains exclude each other, `self` has the intersection type of `T[\X\]` and `X` (P-157). … With the reading of the exclusion test and the bounds that the test reads ("Dispatch and overloading"), the library's generic `+` and `-` between an array and a number are valid beside `AdditiveGroup`'s own. Walk reads `self` in the same way, so it loads such a pair in the library and in a program's own component. In two cases walk does not read `self` so, and its load check refuses the valid pair (row 999)", with its two bullets.
- Orientation, "Dispatch and overloading", P-152 and P-157 (exclusion over the whole tuple; the meet of the bounds at a whole parameter type).
- Orientation, "Dispatch and overloading", Meet Rule paragraph: "a program's trait that declares its own functional `+` overlaps the library's `+` between an array and a number … (P-160). Declare the trait `excludes { Number }` … Otherwise walk refuses the program at load: "fails the Meet Rule". The checker … accepts it against the library's `+` (row 918). Give a trait with its own functional `-` … the same fix."
- Orientation, opening: a sentence that cites a ledger row is a departure; where the rules decide, the test is an `XXX` test.
- `references/interpreter.md`, "What walk checks": walk checks a generic function beside a generic trait's functional method that has no static parameters of its own on declared domains, and uses the team's check otherwise.
- `references/tests-writing.md`, "A test program": the compiler's two-value `assert`.
- `references/compiler.md`, "What the compiled path cannot compile yet": the prelude has no array types.

## 38. A program's own measured type, `Measured[\M extends Measured[\M\]\]` with `size(): Number`

Before I write either test, I print row 1094 (`explorations/coordinator/tools/facts-extract.sh 'ledger:1094'`) and run `git grep -l 'Measured' ProjectFortress/compiler_tests`. Together they show whether a gated test of this case exists, and what the refusal's message is.

### (a) The declarations compile and run

**Today, as written.**
- Walk: loads and runs the program, and prints `PASS`. Walk runs the object's narrower return type. `Box` defines the inherited abstract `size()` at its own parameter types, without `override`, so walk's load checks pass.
- Compiled path: the checker refuses `Box`'s `size(): ZZ32`. `Measured` is self-typed (no `comprises`, `M` bounded by `Measured[\M\]`). Where an object redeclares an abstract dotted method of such a trait at the same parameter types, the checker reads `self` as the intersection type, which is `Box`'s own type. So it asks each return type to be a subtype of the other, and `Number` is not a subtype of `ZZ32` (row 1094). The compile stops, and no link or run follows. This is a departure of the checker, not a limit of the prelude, so the switch-over does not end it.

**Change to the program.** I declare both methods as getters. That keeps a box's size a `ZZ32`, and the orientation says the pair then compiles with the narrower type:

    trait Measured[\M extends Measured[\M\]\]
        getter size(): Number
    end
    object Box(n: ZZ32) extends Measured[\Box\]
        getter size(): ZZ32 = n
    end

`run()` then holds only `println("PASS")`.
- Decision: getters. The alternative is `size(): Number = n` in `Box`, the trait's return type. It also compiles, but the box's size is then a `Number`, which gives (b) nothing to assert.

**Test files.**
- `compiler_tests/MeasuredGetterCompiled.fss`, with `component MeasuredGetterCompiled`, the declarations above and that `run()`.
- `compiler_tests/MeasuredGetterCompiled.test`:

      tests=MeasuredGetterCompiled
      link
      run
      run_out_WIcontains=PASS

**Expected result.** Through `ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh <label> ProjectFortress/compiler_tests MeasuredGetterCompiled.test`, both cases are green and the verdict is `OK`.

**The departure as written.** Row 1094 records it. If the row's reproducer names no gated test, I add one, because the rules decide the case: the narrower return type is valid. It is an `XXX` compile test:
- `compiler_tests/XXXMeasuredNarrowReturn.fss`, the program as the brief wrote it, with `run()` printing `PASS`;
- `XXXMeasuredNarrowReturn.test`, holding `tests=XXXMeasuredNarrowReturn`, `compile` and `compile_err_contains=<the refusal's text>`. I copy that text from a direct `cd ProjectFortress && ../bin/fortress compile compiler_tests/XXXMeasuredNarrowReturn.fss`.

Expected: green, "Saw expected failure". As the first `XXX` test of the change, I run it twice: once as it is (expected failure), and once with `Box`'s method changed to `size(): Number = n` for that run, which compiles and so must report "Saw wrong failure" (red). Then I restore it. If the row already names a test, I add none ("Assert each case in one test only").

### (b) The size of `Box(4)` is 4, compiled

Declarations and `run()` that I keep, in `compiler_tests/MeasuredSizeCompiled.fss`:

    component MeasuredSizeCompiled
    export Executable

    (* A box's size, a ZZ32 getter below a self-typed trait's Number getter *)

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

`MeasuredSizeCompiled.test`:

    tests=MeasuredSizeCompiled
    link
    run
    run_out_WIcontains=PASS

**What each path does today.**
- Walk: runs it, the assertion holds, and it prints `PASS`.
- Compiled path: compiles, because the getter pair compiles with the narrower type. `Box(4).size` has the static type `ZZ32`, so the compiler's two-value `assert`, declared only for `ZZ32`, `String` and `Character`, applies. It links, runs and prints `PASS`. Through `junit.sh`: green, `OK`.

**Why not the dotted form.**
- With the brief's dotted `size(): ZZ32` the program does not compile (row 1094).
- With `size(): Number` in `Box`, nothing compiled can compare the size with 4. `Number` declares nothing (P-165), and until the switch-over the compiler's library has no `=` over `Any` and no two-value `assert` at `Number`.

**Path and scope.** (a) and (b): walk runs both forms today. The compiled path refuses the dotted pair with a narrower return type, today and after the switch-over, since row 1094 is a checker departure. The getter pair compiles and runs today, before the switch-over, against the compiler's prelude.

**Passages.**
- Orientation, "Traits and objects", the self-typed paragraphs: "In a departure, the checker also reads that type where an object redeclares an abstract dotted method of `T` at the same parameter types (row 1094). That type is the object's own, so each return type must be a subtype of the other. The checker thus refuses a narrower return type in the object, which walk runs. Declare the object's method at `T`'s return type. For a method without parameters, you can declare both methods as getters instead: the pair then compiles with the narrower type." Also the definition of a self-typed trait just above it.
- Orientation, "Traits and objects", `override` paragraph: to replace an inherited declaration at its own parameter types, declare it again without `override`. The code generator refuses every `override` (row 650).
- Orientation, "Numbers", "`Number` declares nothing (P-165)".
- Orientation, opening: a ledger row cited as a departure, where the rules decide, gets an `XXX` test.
- `references/tests-writing.md`, "A test program" (a compiled `run()` ends with `println("PASS")`; the compiler's two-value `assert`), "Where a test goes" (`.test` keys), "Writing an `XXX` test" (compile refusal: `compile` and `compile_err_contains`; run it twice), "Names, comments, citations" (one test per case).
- `references/tests-running.md`, "Compiled tests" (`junit.sh`).
- `SKILL.md`, "Rules for every task": look up the ledger rows before investigating.

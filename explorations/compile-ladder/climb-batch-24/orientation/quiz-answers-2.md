# Quiz answers: cases 24 and 25

Read for these answers: `CLAUDE.md`; `.claude/skills/fortress-repo/SKILL.md`; the area parts under `references/` other than `revival-changes.md` and `sources.md`; and the orientation, `explorations/compile-ladder/climb-batch-24/orientation/orientation.md`, cited below as "orientation" (it is titled "What the revival changed in the team's Fortress"). Each command below starts with the setup lines of `build-and-caches.md`, "Setting up each call", and runs from the tree's root unless it says `cd ProjectFortress`.

## 24. Two compiled tests with `where` clauses

### (a) `label[\U\](u: U): String where { U extends Named }`, called as `label(Cat)`

**What the compiled path does today, before the switch-over.** It compiles, links and runs the program, and the run prints PASS. The `where` clause binds no variable. It states one constraint on the function's own static parameter `U`, which is one of the three built forms. The checker infers `U = Cat` at the call, and checks `Cat extends Named` there, where it holds. The code generator compiles the declaration and emits nothing for the clause: only the checker checks it. Row 867 does not apply, because the clause introduces no `where`-clause variable. The program uses only `String`, the two-value `assert` at `String`, and `println` of a `String`, all of which the compiler's library has. So nothing here waits on the switch-over. The test needs no `XXX`.

**One check before I write it.** `label` is the keyword of the `label`/`exit` construct, which the code generator does not compile (compiler.md, "What the compiled path cannot compile yet"). So I expect the parser to read `label[\U\](...)` and `label(Cat)` as that construct, not as a function. I would settle this with `cd ProjectFortress && ../bin/fortress parse compiler_tests/WhereConstraintCall.fss`. If the parse refuses the name, I call the function `nameOf`, which changes nothing that the test checks. The file below already uses `nameOf`. If `label` parses, the function can keep the question's name.

**Path and scope.** The compiled path only (the test goes in `compiler_tests/`), today and after the switch-over.

`ProjectFortress/compiler_tests/WhereConstraintCall.fss`:

    component WhereConstraintCall
    export Executable

    (*) A generic function's where-clause constraint on its own static parameter, met at the call.

    trait Named name(): String end

    object Cat extends Named
        name(): String = "Cat"
    end

    nameOf[\U\](u: U): String where { U extends Named } = u.name()

    run(): () = do
        assert(nameOf(Cat), "Cat", "nameOf(Cat)")
        println("PASS")
    end

    end

`ProjectFortress/compiler_tests/WhereConstraintCall.test`:

    tests=WhereConstraintCall
    link
    run
    run_out_WIcontains=PASS

**Expected result through the harness.** Both cases are green. The test comes with no fix, so it has no failing run: I see it pass through the harness (tests-writing.md, "The order").

### (b) `both[\U, V\](u: U, v: V): String where [\nat n\]{U extends {X[\n\]}, V extends {Y[\n\]}}`, called as `both(A, B)`

**What the compiled path does today, before the switch-over.** The checker accepts the program, the link succeeds, and the run dies at the call with `NoClassDefFoundError` (ledger row 867). Here the clause introduces a `where`-clause variable, `nat n`. The checker takes that variable as a static parameter of the function's arrow type, and infers it at the call: `n = 1`, from `A extends X[\1\]` and `B extends Y[\1\]`. It then checks the constraints on `U` and `V` at the call. The call is a top-level call, not a dotted one, so it is not one of the checker's listed gaps. The code generator compiles the declaration and emits nothing for the clause. Row 867 is a defect of the code generator or the run time. No orientation sentence opens "Until the switch-over" about it, so the switch-over does not end it.

**What I look up first.** `explorations/coordinator/tools/facts-extract.sh 'ledger:867'`, for the row's status and its reproducer:
- If the row is closed (`FIXED`), the program should pass. I would then write (b) as a plain test, like (a).
- If the row is open and its reproducer is already a gated `XXX` pair of this shape, I still write the test that my brief asks for. I name the existing pair in my report.

`git ls-files 'ProjectFortress/*XXX*'` checks that my names are free.

**How the defect is recorded.** This is item 2 of tests-writing.md, "How a defect is recorded". The defect is deferred, and the record settles the answer: the form is built (P-151), so the program must print `AB`. The checker accepts the program, which then fails linkage at run time, the case that item 2 names. So the record is a gated `XXX` run-time pair: three files.

`ProjectFortress/compiler_tests/XXXWhereNatVariableCall.fss`:

    component XXXWhereNatVariableCall
    export Executable

    (*) A call of a generic function whose where clause introduces a size variable.

    trait Named name(): String end
    trait X[\nat n\] extends Named end
    trait Y[\nat m\] extends Named end

    object A extends X[\1\]
        name(): String = "A"
    end

    object B extends Y[\1\]
        name(): String = "B"
    end

    both[\U, V\](u: U, v: V): String where [\nat n\]{U extends {X[\n\]}, V extends {Y[\n\]}} =
        u.name() || v.name()

    run(): () = do
        println("REACHED")
        assert(both(A, B), "AB", "both(A, B)")
        println("PASS")
    end

    end

`ProjectFortress/compiler_tests/WhereNatVariableCallLink.test` (a plain name; it is red if the link reports static errors):

    tests=XXXWhereNatVariableCall
    link

`ProjectFortress/compiler_tests/XXXWhereNatVariableCall.test` (no `link`; it uses the plain file's link):

    tests=XXXWhereNatVariableCall
    run
    run_out_contains=REACHED

**Steps.**
1. Reproduce the failure with a direct compile and run: `cd ProjectFortress && ../bin/fortress compile compiler_tests/XXXWhereNatVariableCall.fss && ../bin/fortress run XXXWhereNatVariableCall`. I expect `REACHED`, then `NoClassDefFoundError` at the call: a JVM resolves a class at the first instruction that uses it, so the failure comes after `run()` prints. If `REACHED` does not print, the `XXX` file takes `run_out_does_not_contain=REACHED` instead. It never takes `run_out_contains=PASS`.
2. Run the two tests' files together, in one JVM, with the tree's own copy of the script. Its `climb-batch-N` folder is found with `ls explorations/compile-ladder/climb-batch-*/merged-tests/junit.sh`. List the plain link file before the `XXX` run file:

       ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh where24 \
           ProjectFortress/compiler_tests WhereConstraintCall.test WhereNatVariableCallLink.test \
           XXXWhereNatVariableCall.test > tmp/junit-where24.txt 2>&1

3. This is the first `XXX` test of the change, so I run it a second time, changed: I remove the line `assert(both(A, B), ...)`, the part that fails. The harness must then report the `XXX` run red. Then I restore the line (tests-writing.md, "Writing an `XXX` test").

**Expected result through the harness.**
- `WhereConstraintCall`: link and run green.
- `WhereNatVariableCallLink`: green. The link succeeds.
- `XXXWhereNatVariableCall`: the run exits non-zero after printing `REACHED`. The harness reports an expected failure (`Saw expected failure` or `OK Saw expected exception`), which is green.
- Verdict line: `OK (n tests)`, with one case for each command.

The `XXX` run turns red when row 867 is fixed. The test is then promoted: the three files lose the prefix, and `WhereNatVariableCall.test` gets `link`, `run` and `run_out_contains=PASS` (tests-writing.md, "Promoting an `XXX` test").

**Passages relied on.**
- Orientation, "Static parameters, `where` clauses and sizes": "**Three `where` forms are built (P-151).**" Also, in the same paragraph: "The code generator compiles a declaration's own `where` clause and emits nothing for it: only the checker checks it. A compiled call of a function or method whose own clause introduces a `where`-clause variable, as `where [\nat n\]` does, dies at run time (row 867)."
- compiler.md, "What the compiled path cannot compile yet": the call "links, but dies at run time with `NoClassDefFoundError` (ledger row 867)". The same section lists `label` and `exit`.
- compiler.md, "The checker's gaps", the item on a `where` clause's constraint: the checker checks a function's constraint on its own static parameters at the call, and a `where`-clause variable "is a static parameter of the function's arrow type, inferred at the call". The unchecked cases are dotted calls, a type's use, and a written static argument.
- tests-writing.md: "A test program" (compiled `assert` only at `ZZ32`, `String` and `Character`; `println("PASS")`), "Where a test goes, and how it passes", "How a defect is recorded" item 2, "Writing an `XXX` test", and "Promoting an `XXX` test".
- tests-running.md, "Compiled tests": `junit.sh`, `ONE_JVM=1`, and running all the new files of one test folder together.
- SKILL.md, "Rules for every task": reproduce before explaining, and read the ledger rows before investigating.

## 25. A size known only at run time

### (a) `trait Len comprises { L[\n\] } where [\nat n\] end`, with `size(mk())` asserted to be 3

**What the compiled path does today.** The checker accepts the program, the link succeeds, and the run fails the JVM's verification with a `VerifyError` (ledger row 307). The static type of `mk()` is `Len`, whose `comprises` clause lists `L[\n\]` at a `where`-clause size. At the call `size(mk())`, the checker gives that variable a fresh size, equal only to itself. It reads the argument as an `L` at that size, and binds `size`'s `n` to it. The code generator then emits a call that passes a value of the trait `Len` where the listed type `L[\n\]` is expected. The JVM's verifier refuses that bytecode. The orientation says that this holds for a program's own trait too, so it is not about `NatParam` alone.

**How the defect is recorded.** This is item 2 of tests-writing.md, "How a defect is recorded". That item names a deferred defect of a program that the checker accepts and that then fails the JVM's verification. The record is a gated `XXX` run-time pair.

**What I look up first.** I read `facts-extract.sh 'ledger:307'`, for the row's status and its reproducer. If the row is closed, the test is a plain one, and I promote rather than add. I also run `git ls-files 'ProjectFortress/*XXX*'`.

The direct run of step 1 below also settles two smaller points:
- The SKILL says that a `nat` is an `NN32` value. The run shows whether the checker accepts `= n` at the return type `ZZ32`. If it does not, that refusal is a separate finding, and I record it as one.
- The run shows whether `REACHED` prints before the failure.

`ProjectFortress/compiler_tests/XXXLenRuntimeSize.fss`:

    component XXXLenRuntimeSize
    export Executable

    (*) A value of a trait whose comprises clause lists L at a where-clause size, passed where L is expected.

    trait Len comprises { L[\n\] } where [\nat n\] end
    value object L[\nat n\] extends Len end

    mk(): Len = L[\3\]
    size[\nat n\](x: L[\n\]): ZZ32 = n

    run(): () = do
        println("REACHED")
        assert(size(mk()), 3, "size(mk())")
        println("PASS")
    end

    end

`ProjectFortress/compiler_tests/LenRuntimeSizeLink.test`:

    tests=XXXLenRuntimeSize
    link

`ProjectFortress/compiler_tests/XXXLenRuntimeSize.test`:

    tests=XXXLenRuntimeSize
    run
    run_out_does_not_contain=REACHED

**Which `REACHED` key.** The JVM verifies a whole class when it loads it. The bad call sits in `run()`, in the component's own class, so I expect the run to die before `run()` prints. That gives `run_out_does_not_contain=REACHED`. If the direct run of step 1 prints `REACHED` (the failing class loads only at the call), the key is `run_out_contains=REACHED`. Never `run_out_contains=PASS`.

**Steps.**
1. Reproduce the failure: `cd ProjectFortress && ../bin/fortress compile compiler_tests/XXXLenRuntimeSize.fss && ../bin/fortress run XXXLenRuntimeSize`. I expect a clean compile, then a `VerifyError`. I would quote two to five of its lines in my report.
2. Run both files through the harness, plain file first:

       ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh len25 \
           ProjectFortress/compiler_tests LenRuntimeSizeLink.test XXXLenRuntimeSize.test \
           > tmp/junit-len25.txt 2>&1

3. If this is the first `XXX` test of the change, run it a second time, changed: I replace `size(mk())` with `size(L[\3\])`, which passes the listed type itself. The harness must then report it red. Then I restore the line.

**Expected result through the harness.**
- `LenRuntimeSizeLink`: green. The link reports no static errors.
- `XXXLenRuntimeSize`: the run exits non-zero with the `VerifyError`, and the `REACHED` key is met. The harness reports an expected failure, which is green.
- Verdict line: `OK (2 tests)`.

**Does the test change at the switch-over?** No. The trait is the program's own, and the program uses nothing from the library beyond the `ZZ32` `assert` and `println`. Row 307 is a defect of the code generated for the call, not a limit of the compiler's library. No "Until the switch-over" sentence covers it. So the files stay as they are, and the test stays `XXX` until row 307 is fixed. It is then promoted: `LenRuntimeSize.fss`, `LenRuntimeSizeLink.test`, and `LenRuntimeSize.test` with `link`, `run` and `run_out_contains=PASS`.

**Path and scope.** The compiled path, before and after the switch-over alike.

### (b) What stands between microGPT's `view` and a compiled run

What I list, in the order that a compiled run meets them:

1. **The switch-over itself.** Until the switch-over, compiled programs do not link `NatReflect`, which is part of walk's library. So `reflect`, `NatParam` and `N[\n\]` do not exist on the compiled path. The compiler's prelude also has no array types, only `ZZ32Vector` and `StringVector`, so `viewN`'s `base: Array[\RR64,ZZ32\]` names a type that the compiler's prelude lacks. It also declares no `Index`, so a program that names `Index` does not compile. The switch-over waits for walk's natives: each function that the interpreter's library binds with `builtinPrimitive` must first have a binding that the compiled path runs. Those natives are what stands before item 1. I would also check whether `NatReflect` binds natives of its own: `grep -n builtinPrimitive Library/NatReflect.fs*`.
2. **Ledger row 307, which stays after the switch-over.** `reflect(nr)` and `reflect(nc)` give `NatParam` values, and `NatParam` is declared `comprises { N[\n\] } where [\nat n\]`. `view` passes them where `N[\r\]` and `N[\c\]` are expected. The checker accepts this: at the call it gives each of the two values its own fresh size, so `r` and `c` bind to two sizes, as `view` needs. The compiled call then fails the JVM's verification, as in (a). This is the "second wall" of the orientation.
3. **Whatever else `FlatArrays2` and the APL program hit today.** I would list only what I find, each item with its evidence:
   - The newest landed ladder phase of these components. `git log -1 --name-only --format= -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt'` finds the newest gate. Its `ladder/microgpt-phase.md` gives the phase and first error of each of the eighteen microGPT components, `FlatArrays2` and the components that the APL program imports among them.
   - A grep of `explorations/apl/mg/FlatArrays2.fss` for the code-generator walls (compiler.md, "What the compiled path cannot compile yet"):
     - array literals, local functions, object expressions;
     - `label`, `exit`, `spawn`, and `atomic` used as an expression;
     - contracts, and `override`;
     - a function's own `where`-clause variable (row 867);
     - a `comprises`-clause generic that gives a member's body (row 812).
   - The record on the topic: `facts-extract.sh 'ledger-find:NatParam'`, `'ledger-find:reflect'`, `'ledger:307'`, and the FACTS titles with `'NatReflect'`.

   Each such wall goes into the report with its ledger row. A wall that the ledger does not hold gets a new row, as `records.md` and `exploring.md` say.

Not a wall, but worth a line in the report: an `RR64` array is still to be stored as an unboxed `double[]`, which the code generator does not build yet. This bears on speed, not on whether the run happens.

**Path and scope.** The compiled path. Item 1 ends at the switch-over, and item 2 remains after it. Under walk, `MicroGptAplQuick.fss` passes today.

**Passages relied on.**
- Orientation, "Static parameters, `where` clauses and sizes", the paragraph "**A size known only at run time comes from `reflect` in `NatReflect.fsi`.**". It says: "Such a call does not run compiled yet. Until the switch-over, compiled programs do not link `NatReflect`, which is part of walk's library. A second wall stays after it. ... A compiled call fails the JVM's verification if it passes a value of such a trait where a listed type is expected (row 307). This holds for a program's own trait too."
- Orientation, opening section: a sentence that opens "Until the switch-over" states a limit of the compiler's library, which ends at the switch-over.
- compiler.md, "The checker's gaps", the item on a `comprises` clause that lists a type at a `where`-clause variable: "at a call, the checker gives the variable a fresh size or type, equal only to itself. Two values passed in one call get two."
- compiler.md, "What the compiled path cannot compile yet": no array types in the prelude, and the code-generator walls. compiler.md, "What the code generator does": the unboxed `double[]` is not built yet.
- Orientation, "Traits and objects": "Until the switch-over, the compiler's prelude declares no `Index`".
- SKILL.md, "The phases": "The switch-over waits for walk's natives".
- tests-writing.md, "How a defect is recorded" item 2, "Writing an `XXX` test" and "Promoting an `XXX` test". gate.md, "The ladder regression", for the eighteen microGPT components and `microgpt-phase.md`.

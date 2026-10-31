# Quiz answers, reader 1 (cases 24, 25)

Read: `CLAUDE.md`, `.claude/skills/fortress-repo/SKILL.md`, its area parts under `references/` (all but `revival-changes.md` and `sources.md`), and the orientation `explorations/compile-ladder/climb-batch-24/orientation/orientation.md` (cited below as "orientation"). Nothing else was opened; nothing was run.

## 24. Two compiled tests over `where` clauses

### Before writing

- Look up the known rows first (SKILL.md, "Rules for every task": look for a defect's rows before you investigate it): `explorations/coordinator/tools/facts-extract.sh 'ledger:867'`, and `git ls-files 'ProjectFortress/*XXX*' | grep -i where` to see whether a gated `XXX` test of (b)'s shape already exists. If row 867's reproducer already names such a test, cite it; if its reproducer is `none`, the new `XXX` test becomes its reproducer (`ledger.py rewrite`, if my brief lets me edit the ledger; otherwise report it).
- Check that `default_repository/caches/bytecode_cache/` holds the five library jars; if not, run the library order (`build-and-caches.md`, "The library order").
- Name: `label` is the reserved word of the `label ... exit` construct (`compiler.md`, "What the compiled path cannot compile yet", lists `label` and `exit` as a construct). I would not name a function after it: my test calls the function `nameOf`. If the brief insists on `label`, I would first run `bin/fortress parse` on the file and expect a parse refusal unrelated to the `where` clause.

### (a) `where { U extends Named }`: a constraint on the function's own static parameter, no variable

Decision: today, before the switch-over, the compiled path compiles, links and runs it, and the call answers `"Cat"`. The checker checks `U extends Named` at the call (`Cat` extends `Named`, so it holds); the code generator compiles the declaration and emits nothing for the clause; the clause introduces no variable, so row 867 does not apply. A plain test that guards a behaviour that works today: no failing run, see it pass through the harness.

`ProjectFortress/compiler_tests/WhereOwnParamCall.fss`:

    component WhereOwnParamCall
    export Executable

    (* A function whose where clause constrains its own static parameter runs compiled at a call that meets it. *)

    trait Named
        name(): String
    end

    object Cat extends Named
        name(): String = "Cat"
    end

    nameOf[\U\](u: U): String where { U extends Named } = u.name()

    run(): () = do
        assert(nameOf(Cat), "Cat", "nameOf(Cat)")
        println("PASS")
    end

    end

`ProjectFortress/compiler_tests/WhereOwnParamCall.test`:

    tests=WhereOwnParamCall
    link
    run
    run_out_WIcontains=PASS

Expected through the harness: both cases green (link, run).

### (b) `where [\nat n\]{ ... }`: the clause introduces a `where`-clause variable

Decision: today the checker accepts the program (a top-level call; the `where`-clause variable `n` is a static parameter of the arrow type, inferred at the call as 1, and the constraints hold for `A` and `B`), the code generator compiles it and emits nothing for the clause, the link is clean, and the run dies at the call with `NoClassDefFoundError` (ledger row 867). The specification settles the answer (`"AB"`), and the defect is a linkage failure at run time of a program that the checker accepts, so it is recorded by item 2 of "How a defect is recorded": a gated `XXX` test asserting the specification's answer, written as a run-time pair (compile succeeds, run fails), never `run_out_contains=PASS` in the `XXX` file.

`ProjectFortress/compiler_tests/XXXWhereVarCall.fss`:

    component XXXWhereVarCall
    export Executable

    (* A call of a function whose where clause introduces a size variable answers the joined names. *)

    trait Named
        name(): String
    end
    trait X[\nat n\] extends Named end
    trait Y[\nat m\] extends Named end

    object A extends X[\1\]
        name(): String = "A"
    end
    object B extends Y[\1\]
        name(): String = "B"
    end

    both[\U, V\](u: U, v: V): String where [\nat n\]{ U extends { X[\n\] }, V extends { Y[\n\] } } =
        u.name() || v.name()

    run(): () = do
        println("REACHED")
        assert(both(A, B), "AB", "both(A, B)")
        println("PASS")
    end

    end

`ProjectFortress/compiler_tests/WhereVarCallLink.test` (plain name: green on a clean link, red only on static errors):

    tests=XXXWhereVarCall
    link

`ProjectFortress/compiler_tests/XXXWhereVarCall.test` (no `link`: its run uses the plain file's link):

    tests=XXXWhereVarCall
    run
    run_out_contains=REACHED

`NoClassDefFoundError` comes at the call, after `run()` prints `REACHED` (compiler.md: the call "links, but dies at run time"). If the first harness run shows the run died before `REACHED` printed, the key becomes `run_out_does_not_contain=REACHED` (tests-writing.md, "Writing an `XXX` test"), because an unmet `run_*` check is red whatever the prefix.

### Running both, and the expected result

All new files of the folder in one JVM, the plain link file before the `XXX` run file, from the tree's root after the setup lines (`junit.sh` in the tree's own `climb-batch-N/merged-tests/`):

    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh where \
        ProjectFortress/compiler_tests WhereOwnParamCall.test WhereVarCallLink.test XXXWhereVarCall.test \
        > tmp/junit-where.txt 2>&1

Expected verdict: `OK (4 tests)`: `WhereOwnParamCall` link and run green; `WhereVarCallLink` green; `XXXWhereVarCall` green as an expected failure (`Saw expected failure` or `OK Saw expected exception`). The exit code is 0 whatever the verdict: read the verdict line.

Since `XXXWhereVarCall` is the first `XXX` test of the change, run it a second time changed so that the defect does not show (replace `both(A, B)` by `"AB"`, removing the part that fails): the harness must report it red. Then restore it. Quote two to five lines of each run in the report.

Path and scope: compiled path only, before the switch-over (the tests stay after it: `compiler.md`, "The compiler's prelude"). Walk is not involved. When row 867 is fixed, `XXXWhereVarCall` turns red and is promoted: renamed to `WhereVarCall`, with `WhereVarCallLink.test` (`tests=WhereVarCall`, `link`) and `WhereVarCall.test` (`tests=WhereVarCall`, `link`, `run`, `run_out_contains=PASS`).

Passages: orientation, "Static parameters, `where` clauses and sizes", the P-151 paragraph ("Three `where` forms are built"; "The code generator compiles a declaration's own `where` clause and emits nothing for it. A compiled call whose own clause introduces a variable dies at run time (row 867)"); `compiler.md`, "What the compiled path cannot compile yet" (the `where`-clause sentences and row 867) and "The checker's gaps" (a `where`-clause variable is a static parameter of the arrow type, inferred at the call; the function's constraint is checked at the call); `compiler.md`, "Traps of the compiled path" (`String`'s `||` at `Object`: both operands here are `String`, so it holds); `tests-writing.md`, "How a defect is recorded" (item 2, linkage at run time), "Writing an `XXX` test", "How `XXX` works", "Promoting an `XXX` test", "The order"; `tests-running.md`, "Compiled tests".

## 25. A size known only at run time

### (a) `trait Len comprises { L[\n\] } where [\nat n\]`, `size(mk())`

Decision: today the checker accepts the program: at the call `size(mk())` it gives the `comprises` clause's `where`-clause variable a fresh size, equal only to itself, and binds `size`'s `n` to it. The code generator compiles it (`Len` has no member, so neither the crash of row 812 nor that of row 756 is reached), and the link is clean. The run fails the JVM's verification: the compiled call opens a value of a trait of this shape, a program's own included (ledger row 307). The specification's answer is 3; the defect is a `VerifyError` of a program that the checker accepts, so it is item 2 of "How a defect is recorded": a gated `XXX` run-time pair.

Before writing, read `facts-extract.sh 'ledger:307'` (and its reproducer: if a gated `XXX` test of this shape exists, cite it instead of adding a duplicate). One check on the program as given: SKILL.md says a `nat` is an `NN32` value and the number types are siblings, so if the compile refuses `= n` at `ZZ32`, that is a type error before row 307 and not the defect; I would read the compile's error before writing the keys.

`ProjectFortress/compiler_tests/XXXLenSizeOpen.fss`:

    component XXXLenSizeOpen
    export Executable

    (* A size opened at a call from a value of a trait that comprises L[\n\] where [\nat n\] binds n. *)

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

`ProjectFortress/compiler_tests/LenSizeOpenLink.test`:

    tests=XXXLenSizeOpen
    link

`ProjectFortress/compiler_tests/XXXLenSizeOpen.test`:

    tests=XXXLenSizeOpen
    run
    run_out_does_not_contain=REACHED

The key: the JVM verifies a class when it loads (orientation, row 695: "fails the JVM's verification when its class loads"), and the opening call sits in `run()`, in the component's own class, so the run dies before `run()` prints `REACHED`. The first harness run shows what was printed; if `REACHED` did print, the key is `run_out_contains=REACHED` instead.

Run: `ONE_JVM=1 .../junit.sh len ProjectFortress/compiler_tests LenSizeOpenLink.test XXXLenSizeOpen.test > tmp/junit-len.txt 2>&1`. Expected: `OK (2 tests)`, the link green and `XXXLenSizeOpen` an expected failure. If it is the change's first `XXX` test, run it once more with the defect removed (`size(L[\3\])` in place of `size(mk())`, which opens nothing): red; then restore.

Does it change at the switch-over? No. The program uses only its own trait and object, not `NatReflect`, and only `assert` at `ZZ32` and `println`, which both libraries declare. Row 307 holds after the switch-over too, so the pair stays an expected failure; it changes only when row 307 is fixed, by promotion (`LenSizeOpen.fss`, `LenSizeOpenLink.test`, `LenSizeOpen.test` with `link`, `run`, `run_out_contains=PASS`).

Path and scope: compiled path, before and after the switch-over. (Under walk the same program runs: `reflect`'s pattern binds `n` at the call; not asked.)

Passages: orientation, "Static parameters, `where` clauses and sizes", the paragraph "A size known only at run time comes from `reflect` in `NatReflect.fsi`" ("After it too, a compiled call that opens a value of a trait of this shape, a program's own included, fails the JVM's verification (row 307)"); `compiler.md`, "The checker's gaps", the item on a `comprises` clause that lists a type at a `where`-clause variable (fresh size at a call; rows 812, 756, 751, 752); `tests-writing.md`, "How a defect is recorded" (item 2 names `VerifyError`), "Writing an `XXX` test", "Promoting an `XXX` test".

### (b) What stands between `view` in `explorations/apl/mg/FlatArrays2.fss` and a compiled run

1. The switch-over. Until it, the compiled path uses the compiler's prelude, which has no `NatReflect` (so no `reflect`, `NatParam` or `N`) and no array types (only `ZZ32Vector` and `StringVector`), so `Array[\RR64,ZZ32\]` and `reflect(nr)` do not compile. Do not add them to the prelude: its three files are deleted at the switch-over. The switch-over itself waits for walk's natives: each `builtinPrimitive` binding of the interpreter's library needs a binding that the compiled path runs (a glue class does not). Today microGPT runs only under walk.
2. Row 307, after the switch-over too: `viewN(base, off, reflect(nr), reflect(nc))` passes `NatParam` values where `N[\r\]` and `N[\c\]` are expected, which opens a value of a trait of the shape `NatParam comprises { N[\n\] } where [\nat n\]`; the compiled call fails the JVM's verification. The orientation states it flatly: "Such a call does not run compiled." The checker itself accepts the call (two values passed in one call get two fresh sizes, so `r` and `c` bind separately).
3. Possible further walls, to be checked rather than assumed: the code-generator crash of row 812 if `N[\n\]` gives the body of a member of `NatParam`, row 756 if `view` calls from outside the trait a member whose type names `n`, row 751 if a fresh size reaches a function type's result; and, in the rest of `FlatArrays2.fss` and its imports, any code-generator wall (`compiler.md`, "What the compiled path cannot compile yet": local functions, object expressions, array literals, `label`/`exit`, `spawn`, `atomic` as an expression, contracts, `override`) and any call of a function whose own `where` clause introduces a variable (row 867).
4. Not a block to a run, but on the way to running fast: an `RR64` array is to be stored as an unboxed `double[]`, which the code generator does not build yet.

What I would look up, and where: `facts-extract.sh 'ledger:307'` and `'ledger-find:NatReflect'` / `'ledger-find:reflect'` for the rows' current text and reproducers; the newest landed `explorations/compile-ladder/climb-batch-*/gate/ladder/microgpt-phase.md` (and the baseline's `explorations/compile-ladder/baseline-2026-09-19/microgpt-phase.md`), where the gate's ladder records the phase that `FlatArrays2` and the other microGPT components reach and their first error, to confirm items 1 and 3; `facts-extract.sh 'positions:array is stored as' 'positions:array design'` for item 4. I would list each item with its ledger row, and record any wall found that has no row as a defect (a ledger row, since a probe that only reports does not edit the tree).

Path and scope: compiled path; item 1 before the switch-over, items 2 and 3 after it as well. Under walk `view` runs today.

Passages: orientation, "Static parameters, `where` clauses and sizes" ("A size known only at run time ..." paragraph); SKILL.md, "How a program runs" (the switch-over waits for walk's natives) and "The model program"; `compiler.md`, "The compiler's prelude, until the switch-over", "What the compiled path cannot compile yet" (no array types; the walls), "What the code generator does" (unboxed `double[]` not built), "The checker's gaps" (the `comprises`/`where` item and rows 751, 756, 812); `interpreter.md`, "The model program" (microGPT runs only under walk); `gate.md`, "The ladder regression" (the eighteen microGPT components and `microgpt-phase.md`).

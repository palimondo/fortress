# Writing a test

A test is gated if the gate's suites run it. An `XXX` test is a gated expected failure: it asserts the answer that the specification gives, and fails today. If it starts to pass, the suite goes red. A code-generator wall is a `sayWhat` call or another thrown `CompilerError` for a construct that the code generator does not compile yet.

## A test program

A test program has this form:

    component Name
    export Executable

    (* declarations *)

    run(): () = do
        assert(f(2), 4, "f(2)")
    end

    end

- `(*)` starts a comment to the end of the line. It cannot hold `*)`: the parser ends the comment there and refuses the program. `(* ... *)` comments nest.
- Under walk, `assert(x, y, msg)` checks that `x` equals `y`, for values of any type. The compiler's prelude declares the two-value `assert` only for `ZZ32`, `String` and `Character`.
- Do not name a variable or a parameter after a functional method of the library, such as `even`, `numerator` or `shift`. The disambiguator refuses it: "Variable even is already declared."
- Under walk, a numeral does not bind to `NN32` or `NN64`, and a numeral with a radix point does not bind to `RR32` (ledger row 454). Write `a: NN32 = unsigned(5)`, not `a: NN32 = 5`.

## Where a test goes, and how it passes

Interpreter (walk): write `ProjectFortress/tests/Name.fss`, whose component is `Name`.

- Every `.fss` file there is gated, with no `.test` file needed.
- It passes if it throws no exception, exits 0, and prints neither `fail` nor `FAIL`. So a passing test must not print those words.
- An api that it imports can be in `ProjectFortress/test_library/`.
- The harness skips files whose names end in `Syntax.fss`, `DynamicSemantics.fss` or `Satisfiability.fss`, or contain `GenomeUtil`.
- For a refusal at load, put `Name.test` beside `tests/Name.fss`, with `load_exception_contains=<message>`. A plain test passes if walk refuses the program at load as named. A failure while the top-level variables are initialised counts as a refusal. An `XXX` test passes if the program loads and runs clean.

Compiled: write `Name.fss` and `Name.test` in `compiler_tests/` (or `parser_tests/`), `library_tests/` or `other_compiler_tests/`. The `.test` files are the whole list of tests: a `.fss` that no `.test` file names never runs. A `.test` file is a Java property file. It names the commands to run and the checks on their output, as lit's RUN and CHECK lines do:

    tests=Name                 the component(s) it drives; without it, the .test file's own name
    compile | link | typecheck each present command is one JUnit case
    run                        run the linked program in a subprocess (bin/fortress run)
    <stage>_<stream>_<check>=text
                               stage: compile, link or run; stream: out, err or exception;
                               check: contains, does_not_contain, equals, matches,
                               WIcontains (containment with runs of whitespace collapsed)

A `run` with no `run_out` check passes if its output contains `pass` or `PASS`. For example:

    tests=EqualityRung1
    link
    run
    run_out_WIcontains=PASS

## How `XXX` works

- Under walk, an `XXX` test is `tests/XXXName.fss`.
- In the compiled test folders, the `XXX` prefix of a `.test` file applies to every stage that the file drives. An `XXX` file with `compile` or `link` demands that the compile fail.
- An unmet `run_out_*` check fails a run test, whatever the prefix.
- The harness reports any link or compile exception of a component whose name contains `XXX` as expected, whatever the `.test` file's name.
- An `XXX` compile test that is pinned by `compile_err_contains`, and whose program compiles, reports "Saw wrong failure". This is red either way.

## How a defect is recorded

Record every defect that you measure in one of three ways, and say in your report which:

1. Your change repairs it: an assertion in your gated test.
2. It is deferred, and the specification settles it: a gated `XXX` test that asserts the specification's answer. Write it in the change that measured the defect, even if a later change will repair it. A program that the checker accepts and that then fails verification, linkage or a range check at run time belongs here.
3. It is deferred, and the specification is silent or a conflict leaves it open (`exploring.md`): a test that pins today's behaviour, and a row in the gap ledger (`records.md`). If no program can observe the defect, write the ledger row only, and quote the output in it.

If your brief does not let you edit the original tree, say in your report which of the three the defect needs, and write the ledger row. A probe that only measures and reports is an example. The change that next works there writes the test.

## The order: the test, its failure, the fix, the pass

1. Write the test. Write the essence of the defect as a clean, minimal program, not the shape in which a probe met it.
2. See the test fail through the harness (`harness-one.sh` or `junit.sh`, `tests-running.md`) on the base's code. Do this in a run that ends before you first build your edit. Under walk, do it before you edit a library source that the test reads. If your tree already holds the fix, run the base's code through `old-fortress.sh` (`worktrees.md`).
3. Make the fix. See the test pass in your last run after your last change of code.

The test needs no commit of its own.

In your report, quote two to five lines of the failing run and the passing line, each with its command. Put every check into a test, never into a one-off script. Assert a value with `assert` in an interpreter test, and with a `run_out_equals` key in a compiled test.

Check an edit of prose in `Specification/` or `Documentation/` against the tree and the curator's decisions.

## Writing an `XXX` test

- For a refusal at compile time, write one `XXX` compile test.
- For a program that compiles and fails at run time, write two `.test` files over one component. One has a plain name and drives `link`. The other has an `XXX` name and drives `run`, with a key on output that the failing run prints before it dies (`run_out_contains=REACHED`). If the run dies before any output, use `run_out_does_not_contain=REACHED`. Never use `run_out_contains=PASS`.
- For a code-generator wall, put the `XXX` on the component name in `tests=`, with `compile_exception_contains=<text of the exception>`.
- To guard a regression that shows as diagnostics, add a plain `<Name>Link.test`.

Show the first `XXX` test that your change adds working through the harness itself, placed where the gate reads it. A direct compile and run does not show this. Run it twice through the harness:

1. As it is: the harness must report an expected failure.
2. Changed for one run so that it passes, then restored: the harness must report it red. For example, add the missing declaration to the test program, or set the expected string to what the run prints.

## Promoting an `XXX` test

If you fix a defect that has a gated `XXX` test, that test starts to pass and turns the suite red. So:

1. Before you edit the code, rename the test without the prefix (`git mv`), to a plain name by its topic. For a compiled test, rename the `.test` file and the `XXX` in its `tests=` line or keys as needed.
2. See the plain-named test fail through the harness on the base's code.
3. Make the fix and see the test pass.

## Names, comments, citations

- Name a test by its topic. Give it one comment line that says what it checks, with no pointer to a record.
- Cite the specification by file and section or entry, never by line: `opr-overview.tex, subsection "GCD, LCM, and CHOOSE Operators"`. In the library chapters, name the entry too: `basic-integers.tex, section "Integers", opr CHOOSE`.
- If your change breaks a line of a test that the team wrote, respell the line and keep the value that it checks. Keep every assertion. List each line's before and after in your report.
- If your change touches mutable state, a field, an `atomic` block or a library write, run its checks at `FORTRESS_THREADS=1` and at `4`.

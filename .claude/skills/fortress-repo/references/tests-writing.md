# Writing a test

## The order: the test, its failure, the fix, the pass

Start every edit of source code in the original tree from a failing test that you add to the test suite:

1. Write the test. Write the essence of the defect as a clean, minimal program, not the shape in which a probe met it.
2. See the test fail through the harness (`harness-one.sh` or `junit.sh`, `tests-running.md`) on the base's code. Do this in a run that ends before you first build your edit. Under walk, do it before you edit a library source that the test reads. If your tree already holds the fix, run the base's code through `old-fortress.sh` (`worktrees.md`).
3. Make the fix. See the test pass in your last run after your last change of code.

The test and the fix can be in one commit. The test needs no commit of its own.

In your report, quote two to five lines of the failing run and the passing line, each with its command. Do not commit a capture of either run. Do not prove a result with a one-off script: put the check into a test. Assert each value that matters inside the test: an `assert` in an interpreter test, `run_out_equals` in a compiled test. What a test prints beyond its checks does not matter. Do not add an expected-output file to the interpreter suite.

An edit of prose that no test can observe, in `Specification/` or `Documentation/`, has no test and no failure to see. Check its text against the tree and the decisions on record instead.

## Where a test goes, and how it passes

Interpreter (walk): write `ProjectFortress/tests/Name.fss`, whose component is `Name`.

- Every `.fss` file there is gated, with no `.test` file needed.
- It passes if it throws no exception, exits 0, and prints neither `fail` nor `FAIL`. So a passing test must not print those words.
- An api that it imports can be in `ProjectFortress/test_library/`.
- The harness skips files whose names end in `Syntax.fss`, `DynamicSemantics.fss` or `Satisfiability.fss`, or contain `GenomeUtil`.

Compiled: write `Name.fss` and `Name.test` in `compiler_tests/` (or `parser_tests/`), `library_tests/` or `other_compiler_tests/`. The `.test` files are the whole list of tests: a `.fss` that no `.test` file names never runs. A `.test` file is a Java property file that names the commands to run and the checks on their output, as lit's RUN and CHECK lines do:

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

## Expected failures (XXX)

An `XXX` test asserts the answer that the specification gives, and fails today. If it starts to pass, the suite goes red.

- `tests/XXXName.fss` is a gated expected failure.
- A refusal at load under walk: put `Name.test` beside `tests/Name.fss`, with `load_exception_contains=<message>`. A plain test passes if walk refuses the program at load as named. A failure while the top-level variables are initialised counts as a refusal. An `XXX` test passes if the program loads and runs clean.
- In the compiled test folders, the `XXX` prefix of a `.test` file applies to every stage that the file drives. An `XXX` file with `compile` or `link` demands that the compile fail. An unmet `run_out_*` check fails a run test, whatever the prefix. So:
  - For a refusal at compile time, write one `XXX` compile test.
  - For a program that compiles and fails at run time, write two `.test` files over one component. One has a plain name and drives `link`. The other has an `XXX` name and drives `run`, with a key on output that the failing run prints before it dies (`run_out_contains=REACHED`). If the run dies before any output, use `run_out_does_not_contain=REACHED`. Never use `run_out_contains=PASS`.
  - For a code-generator wall, put the `XXX` on the component name in `tests=`, with `compile_exception_contains=<text of the exception>`. A code-generator wall is a `sayWhat` call or another thrown `CompilerError` for a construct that the code generator does not compile yet.
  - The harness reports any link or compile exception of a component whose name contains `XXX` as expected, whatever the `.test` file's name. To guard a regression that shows as diagnostics, add a plain `<Name>Link.test`.
  - An `XXX` compile test that is pinned by `compile_err_contains`, and whose program compiles, reports "Saw wrong failure". This is red either way.

Show the first `XXX` test that your change adds working through the harness itself, placed where the gate reads it. A direct compile and run does not show this. Run it twice through the harness:

1. As it is: the harness must report an expected failure.
2. Changed for one run so that it passes, then restored: the harness must report it red. For example, add the missing declaration to the test program, or set the expected string to what the run prints.

### Promoting an XXX test

If a defect has a gated `XXX` test and you fix the defect, the `XXX` test starts to pass and turns the suite red. So:

1. Before you edit the code, rename the test without the prefix (`git mv`), to a plain name by its topic. For a compiled test, rename the `.test` file and the `XXX` in its `tests=` line or keys as needed.
2. See the plain-named test fail through the harness on the base's code.
3. Make the fix and see the test pass.

## Where a measured defect goes

Give every defect that you measure one of three homes, and name the home in your report. The rest of what a report holds is in `area-records.md`, "What every report holds".

1. Your change repairs it: an assertion in your gated test.
2. It is deferred, and the specification settles it: a gated `XXX` test that asserts the specification's answer. Write it in the change that measured the defect, even if a later change will repair it. A program that the checker accepts and that then fails verification, linkage or a range check at run time belongs here.
3. It is deferred, and the specification is silent: a test that pins today's behaviour, and a row in the gap ledger, `explorations/fortress-gap-ledger.md` (`area-records.md`). If no program can observe the defect, write the ledger row only, and quote the output in it.

If your brief does not let you edit the original tree (for example, a probe that only measures and reports), name the home in your report and write the ledger row. The change that next works there writes the test.

## Names, comments, citations

- Name a test by its topic. Give it one comment line that says what it checks, with no pointer to a record.
- Cite the specification by file and section or entry, never by line: `opr-overview.tex, subsection "GCD, LCM, and CHOOSE Operators"`. In the library chapters, name the entry too: `basic-integers.tex, section "Integers", opr CHOOSE`.
- If your change renames or removes a section that a test names, update that citation in the same commit.
- If your change breaks a line of a team test, respell the line and keep the value that it checks. Do not delete an assertion. List each line's before and after in your report.
- If your change touches mutable state, a field, an `atomic` block or a library write, run its checks at `FORTRESS_THREADS=1` and at `4`.
- Do not pin the order in which walk's overload-ambiguity message names its two declarations: the order varies from run to run.

# Writing a test

## Test first, and the test stays

Every edit under the original tree (everything outside `explorations/`, `research/`, `CLAUDE.md` and `.claude/`) starts from a failing test added to the corpus:

1. Write the test: the essence of the defect as a clean minimal program, not the shape a probe happened to meet it in.
2. See it fail through the harness (`harness-one.sh` or `junit.sh`, `tests-running.md`) on the base's code, in a run that ends before your edit is first built; under walk, before you edit a library source the test reads. Once your tree holds the fix, the base's code runs through `old-fortress.sh` (`worktrees.md`).
3. Make the fix and see the test pass in your last run after your last change of code.

Quote the failing run's two to five lines and the passing line, each with its command, in your report. Commit no capture of either run. A one-off script that proves something once is not a check. A value that matters is asserted inside the test (an `assert` in an interpreter test, `run_out_equals` in a compiled one); what a test prints beyond its checks does not matter, and no expected-output file is added to the interpreter suite.

## Where it goes, and how it passes

Interpreter (walk): `ProjectFortress/tests/Name.fss`, whose component is `Name`. Every `.fss` there is gated, with no `.test` file needed. It passes on no exception, exit code 0, and neither `fail` nor `FAIL` anywhere in its output, so a passing test must not print those words. An api it imports can live in `ProjectFortress/test_library/`. Files ending in `Syntax.fss`, `DynamicSemantics.fss` or `Satisfiability.fss`, or containing `GenomeUtil`, are skipped.

Compiled: `Name.fss` and `Name.test` in `compiler_tests/` (or `parser_tests/`), `library_tests/` or `other_compiler_tests/`. The `.test` file is the whole enumeration: a `.fss` that no `.test` names never runs. A `.test` file is a Java property file:

    tests=Name                 the component(s) it drives; without it, the .test file's own name
    compile | link | typecheck each present command is one JUnit case
    run                        run the linked program in a subprocess (bin/fortress run)
    <stage>_<stream>_<check>=text
                               stage: compile, link or run; stream: out, err or exception;
                               check: contains, does_not_contain, equals, matches,
                               WIcontains (containment with runs of whitespace collapsed)

A `run` with no `run_out` check passes when its output contains `pass` or `PASS`. For example:

    tests=EqualityRung1
    link
    run
    run_out_WIcontains=PASS

## Expected failures (XXX)

An `XXX` test asserts the answer the specification gives and fails today. The suite goes red the day it starts passing, and it is then renamed without the prefix.

- `tests/XXXName.fss` is a gated expected failure.
- A refusal at load under walk: `Name.test` beside `tests/Name.fss`, holding `load_exception_contains=<message>`. A plain test passes when walk refuses the program at load as named (a failure while the top-level variables are initialised counts as one). An `XXX` test passes when the program loads and runs clean.
- In the compiled corpora the `XXX` prefix of a `.test` file applies to every stage the file drives, and an `XXX` file carrying `compile` or `link` demands that the compile fail. An unmet `run_out_*` check fails a run test whatever the prefix. So:
  - a refusal at compile time is one `XXX` compile test;
  - a program that compiles and fails at run time is two `.test` files over one component: a plain-named one driving `link`, and an `XXX`-named one driving `run` whose key names output the failing run does print before it dies (`run_out_contains=REACHED`), or `run_out_does_not_contain=REACHED` when it dies before any output; never `run_out_contains=PASS`;
  - a code-generator wall (`sayWhat`, a thrown `CompilerError`) puts the `XXX` on the component name in `tests=`, with `compile_exception_contains=<text of the exception>`;
  - any link or compile exception of a component whose name contains `XXX` is reported as expected, whatever the `.test` file is called; guard a regression that shows as diagnostics with a plain `<Name>Link.test`;
  - an `XXX` compile test pinned by `compile_err_contains` whose program compiles reports "Saw wrong failure": red either way.
- Show the first `XXX` file of a kind going red on a deliberate local fix, through the harness itself, placed where the gate reads it; a direct compile and run does not show it.

## Where a measured defect goes

Every defect anyone measures gets one of three homes, and the report says which (the rest of what a report holds: `area-records.md`, "What every report holds"):

1. Repaired by your change: an assertion in your gated test.
2. Deferred, and the specification settles it: a gated `XXX` test asserting the specification's answer, written in the change that measured the defect, even when a later change is planned to repair it. A program the checker accepts that then fails verification, linkage or a range check at run time belongs here.
3. Deferred, and the specification is silent: a test pinning today's behaviour, and a ledger row; where no program can observe it, the ledger row alone, quoting the output.

## Names, comments, citations

- Name a test by its topic. Give it one comment line saying what it checks, with no pointer to a record.
- Cite the specification by file and section or entry, never by line: `opr-overview.tex, subsection "GCD, LCM, and CHOOSE Operators"`; in the library chapters the entry too: `basic-integers.tex, section "Integers", opr CHOOSE`. A change that renames or removes a section a test names updates that citation in the same commit.
- A team test line that a change breaks is respelled keeping the value it checks; no assertion is deleted, and each before and after is listed in your report.
- A change touching mutable state, a field, an `atomic` block or a library write: run its checks at `FORTRESS_THREADS=1` and at `4`.
- Do not pin the order in which walk's overload-ambiguity message names its two declarations: it varies from run to run.

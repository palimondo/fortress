# The gate

The gate takes about 25 minutes. Your brief says whether you run it.

Run the gate once for each tree. Run it again on a tree only if the tree changed under `ProjectFortress/` (test files excepted), under `Library/`, or in `build.xml`. The commit that landed the newest gate summary has the gated tree's code: that commit adds only records and the specification's PDF. So this test tells you whether to run the gate again:

    G=$(git log -1 --format=%H -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt')
    git diff --quiet $G HEAD -- ProjectFortress Library build.xml || echo "changed: run the gate again, unless only test files changed"

A test file is a `.fss`, `.fsi` or `.test` file directly in `ProjectFortress/tests/` or in a `ProjectFortress/*_tests/` directory. If only test files changed, do not run the gate. Run the changed files through `harness-one.sh` and `junit.sh` (`tests-running.md`). The gate's tables then stay valid.

## What it runs

Run these steps in this order, on a clean build of the tree:

1. Check `df -h /`. Warning: deleting `/tmp/fortress*rats` can break other live runs (`build-and-caches.md`). If less than 1 GB is free, delete `/tmp/fortress*rats`, `ProjectFortress/test-tmp` and `ProjectFortress/test-caches`, and check again. If less than 500 MB is still free, stop and report.
2. Run `rm -rf ProjectFortress/TEST-RESULTS`, then `ant compileAll`.
3. Run the library order (`build-and-caches.md`). At once, before anything else compiles into the caches, make two copies of `default_repository/caches` for the ladder regression (step 7).
4. Run `ant testFast` (9 to 11 min), then `ant testSystem` (3 to 4 min). Both must have zero failures.
5. Write the summary. Compare each suite's count with the last landed summary. If a count fell or a suite is gone, the gate is red.
6. Do the four-thread atomic runs (about 1 min, below).
7. Do the ladder regression (about 4 min, below).

## What it writes

- The landed gates' tables are in `explorations/compile-ladder/climb-batch-<N>/gate/`: `summary.txt` and the ladder's tables.
- The next gate compares with the newest `summary.txt` in `climb-batch-*/gate/` or `gate-baseline/`. It does not find a summary in another place or in another form. So if your brief asks you to land a gate's tables, put them there, in the same form.
- `summary.txt` is tab-separated. It has one row for each suite: `track/suite`, tests, failures, errors, skipped, read from `ProjectFortress/TEST-RESULTS/`. Lines that start with `#` follow: each build's `BUILD` and `Total time` lines and the atomic runs.
- The shell functions `gate_summary`, `gate_compare` and `last_landed_summary` in `explorations/coordinator/climb-batch-workflow.js` write and compare the summary.

## The atomic runs

The suites run at one thread, so they cannot see a lost update or a race in the class loader's first load. These runs compile fourteen programs and run each one three times at four threads, 42 lines. Run them from `ProjectFortress/`, after the library order:

    for p in AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG \
             atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 \
             nestedTransactions0 nestedTransactions1 nestedTransactions2 ; do
      d=other_compiler_tests ; [ -f compiler_tests/$p.fss ] && d=compiler_tests
      timeout -k 5 300 ../bin/fortress compile $d/$p.fss >/dev/null 2>&1 || { echo "$p COMPILE-FAILED" ; continue ; }
      for i in 1 2 3 ; do
        out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run $p 2>&1) ; rc=$?
        [ $rc -eq 124 ] && { out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run $p 2>&1) ; rc=$? ; }
        case "$out" in *FAIL*) r=FAIL ;; *PASS*) r=PASS ;; *) r="NO-PASS rc=$rc" ;; esac
        [ $rc -eq 124 ] && r=TIMEOUT-TWICE
        echo "$p run$i threads=4 $r"
      done
    done

The gate is red on any FAIL, NO-PASS, COMPILE-FAILED or TIMEOUT-TWICE. A single timeout whose re-run passes is not red.

## The ladder regression

The compile ladder records how far each test program gets through the compiler's phases (`explorations/compile-ladder/`). The ladder regression runs part of it again and compares the result with a recorded baseline:

- It compiles and runs the 85 programs listed in `explorations/compile-ladder/baseline-2026-09-19/pass-list.txt`. It compares each program's phase and output with the baseline's record (`raw/`).
- It compiles the eighteen components of the two microGPT programs, and never runs them. It compares each component's phase with the record in `baseline-2026-09-19/microgpt-phase.md`.

To run it:

1. Copy the subset driver `explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh`, and the baseline's `classify.py`, `report.py`, `microgpt-phase.sh` and `microgpt-phase.py`, into a directory under your `tmp/`.
2. In the two shell drivers, point `OUT` and `LADDER_ROOT` at that directory. By default, `OUT` is a tracked folder.
3. Put the two copies from step 3 of the gate at `$LADDER_ROOT/ladder-caches` and `$LADDER_ROOT/pristine`. With them, the driver does not build the library again (about 145 s).
4. Write the list of files:

       tail -n +2 explorations/compile-ladder/baseline-2026-09-19/pass-list.txt | cut -f1 | sed 's|/|\t|' > <dir>/subset.txt

5. Run `run-subset.sh`, then `classify.py` in that directory, which writes `ladder.tsv`. Then run `microgpt-phase.sh` and `microgpt-phase.py` for the eighteen. This takes about 200 s for the files and 35 s for the eighteen.

Compare the result with the baseline, file by file. The phases, from the lowest, are parse, disambiguate, typecheck, codegen, link, run and pass.

- DOWN: a phase lower than the record.
- MISSING: a file with no output.
- STDOUT: output that differs from the record after the `Operation took <n>ms` line is masked.
- UP: a phase higher than the record. This is progress, not red.

DOWN, MISSING and STDOUT are red, unless your brief declared that move as expected before the gate ran.

Warning: do not run `run-ladder.sh`, the driver over every test program (at the top of `explorations/compile-ladder/` and in `baseline-2026-09-19/`), with its default settings. Its default root is shared, its cache pruning corrupts a parallel run, and its default `OUT` is a tracked folder.

A change's own ladder subset is the files whose recorded first error in `baseline-2026-09-19/raw/` names something that the change touched. Their before is the last landed ladder table, or the baseline's output.

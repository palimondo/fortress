# The gate

The gate decides whether a tree lands on `main`. It runs once, on a clean build of that tree. A tree already gated is gated again only when it changed under `ProjectFortress/` (other than test files), `Library/` or `build.xml`:

    git diff --quiet <gated-commit> HEAD -- ProjectFortress Library build.xml || echo "changed: gate again unless only test files moved"

A test file is a `.fss`, `.fsi` or `.test` directly in `ProjectFortress/tests/` or a `ProjectFortress/*_tests/` directory. Changed test files alone are run through `harness-one.sh` and `junit.sh` instead (`tests-running.md`), the files of one corpus together in one JVM, and the gate's tables stand.

## What it runs

On a clean build, in order: `df -h /` (under 1 GB free, sweep `/tmp/fortress*rats`, `ProjectFortress/test-tmp` and `ProjectFortress/test-caches`); `rm -rf ProjectFortress/TEST-RESULTS`; `ant compileAll`; the distance stage started in the background; the library order; `ant testFast`, then `ant testSystem`, with zero failures; each suite's count compared with the newest landed summary (`tests-running.md`), red when one fell or a suite is gone; the four-thread atomic runs; the ladder regression; the checker count. The checker count is red only on a new crash line, a stale shadow or a missing total; the distance is reported and never red (`checker-measurements.md`).

It takes about 25 minutes: `ant compileAll` 25 to 60 s, the library order about 110 s, testFast 9 to 11 min, testSystem 3 to 4 min, the atomic runs about 1 min, the ladder about 4 min, the checker count 20 s to 2.5 min. The distance stage (13 to 24 min on one core) runs beside the rest from just after `ant compileAll`.

The atomic runs. The suites run at one thread and cannot see a lost update or a race in the class loader's first load, so fourteen compiled programs run three times each at four threads, 42 lines, from `ProjectFortress/` after the library order:

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

Red: any FAIL, NO-PASS, COMPILE-FAILED or TIMEOUT-TWICE. A single timeout that passes on its re-run is not red.

The ladder regression compiles and runs the files listed in `explorations/compile-ladder/baseline-2026-09-19/pass-list.txt`, compared with the baseline's recorded phase and output (`raw/`), and compiles only (never runs) the eighteen microGPT components, held at their recorded phase (`microgpt-phase.md`). Copy the subset driver `explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh` and the baseline's `classify.py`, `report.py`, `microgpt-phase.sh` and `microgpt-phase.py` into a directory under your `tmp/`, and point `OUT` and `LADDER_ROOT` in the two shell drivers there. Put copies of `default_repository/caches`, taken right after the library order, at `$LADDER_ROOT/ladder-caches` and `$LADDER_ROOT/pristine`, or the driver rebuilds the library (about 145 s). The file list:

    tail -n +2 explorations/compile-ladder/baseline-2026-09-19/pass-list.txt | cut -f1 | sed 's|/|\t|' > <dir>/subset.txt

Run `run-subset.sh`, then `classify.py` in that directory for `ladder.tsv`, then `microgpt-phase.sh` and `microgpt-phase.py` for the eighteen: about 200 s for the files and 35 s for the eighteen. Compare with the baseline file by file: a phase lower than recorded (in the order parse, disambiguate, typecheck, codegen, link, run, pass) is DOWN, a file with no output is MISSING, and output that differs once `Operation took <n>ms` is masked is STDOUT; each is red unless the change named it in advance as expected. A higher phase is UP, which is progress. Never run the whole-corpus driver with its default root: that root is shared, and its cache pruning corrupts a parallel run. A change's own ladder subset is the files whose recorded first error in `baseline-2026-09-19/raw/` names something it touched; their before is the last landed ladder table, or the baseline's output.

The microGPT programs themselves never run in the gate.

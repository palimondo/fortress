# The gate

The gate runs the seven steps below on one tree, in about 30 minutes. It is green if every step passes, and red if one fails. If a step fails, run the rest, so that the summary holds every step's result.

## What it writes

The summary, `summary.txt`, has one tab-separated row for each suite: `track/suite`, tests, failures, errors, skipped. Below the rows, lines that start with `#` give each log's `BUILD` and `Total time:` lines, the machine that ran the gate (`# machine`), the atomic runs and step 7's lines. A landed summary can also end with `# microgpt-walk` lines: the `VERDICT:` and `rc=` lines of the microGPT walk check (`interpreter.md`, "The model program"), run on the landed tree. Add them only if your brief asks for the microGPT walk check on the landed tree.

If your brief asks you to land a gate's results, make the folder `explorations/compile-ladder/<name>/gate/`, where `<name>` is the `climb-batch-` name that your brief gives. Copy into it `summary.txt`, and `tmp/gate/suite-out/` as `suite-compiled/`. Copy `tmp/gate/suite-out/list.tsv` over step 7's list, `explorations/compile-ladder/gate/suite-compiled.tsv`. The next gate compares with the newest summary there or in `explorations/compile-ladder/gate-baseline/`, and finds no other. Land them and the list in a commit that changes nothing else that the gate reads.

Step 5 uses shell functions that `explorations/coordinator/tools/gate-functions.sh` defines. The file runs nothing. In each Bash call of step 5, set up the call as `build-and-caches.md` says, which sets `FORTRESS_HOME` to the tree's root. Then source the file, from the root:

    source explorations/coordinator/tools/gate-functions.sh

## When to run it

Your brief says whether you run the gate. If it does not ask, run only your own tests (`tests-running.md`).

If it asks, first check whether the newest gate still holds for your tree. A gate's tables stay valid until the tree changes under `ProjectFortress/` or `Library/`, or in `build.xml`, outside the test files. A test file is a `.fss`, `.fsi` or `.test` file directly in `ProjectFortress/tests/` or a `ProjectFortress/*_tests/` directory. The commit that landed the newest summary changed nothing that the gate reads. Commit your tree, then run this command. It prints each path, test files excepted, changed since that commit:

    G=$(git log -1 --format=%H -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt')
    git diff --name-only $G HEAD -- ProjectFortress Library build.xml \
        | grep -v -E '^ProjectFortress/([^/]*_)?tests/[^/]*\.(fss|fsi|test)$'

- If it prints a path, run the gate.
- If not, the newest gate holds. Run only the changed test files, through `harness-one.sh` and `junit.sh` (`tests-running.md`). If one of them is in `ProjectFortress/tests/`, also run step 7 alone, with that commit as its base, and report its lines.

## The steps

Run these steps from the tree's root. Keep the logs of steps 2 and 4 in `tmp/gate/`, as `compileAll.txt`, `testFast.txt`, `testSystem.txt` and `testSpecData.txt`.

1. Read the Avail column of `df -h /`. Warning: deleting `/tmp/fortress*rats` can break other live runs. If the column shows less than 1 GB, delete `/tmp/fortress*rats`, `ProjectFortress/test-tmp` and `ProjectFortress/test-caches`, and read it again. If it still shows less than 500 MB, stop and report.
2. Run `rm -rf ProjectFortress/TEST-RESULTS tmp/gate && mkdir -p tmp/gate`, then `ant compileAll`.
3. If the build printed `Caches <tree>/default_repository/caches started again, empty`, run the library order (`build-and-caches.md`). If not, and a source of the compiler's library changed since the caches were filled, take its step in `build-and-caches.md`, "After an edit of the library". Then copy the caches twice for step 7, before anything else compiles into them. The copies save step 7 about 145 s of compiling the prelude:

       D=$PWD/tmp/gate/suite-compiled/prelude/root ; mkdir -p $D
       cp -a default_repository/caches $D/ladder-caches
       cp -a default_repository/caches $D/pristine

4. Run `ant testFast`, then `ant testSystem`, then `ant testSpecData`. All three must have zero failures. In `ant testSystem`, `tests/XXXAtomicNestedReadsKeptWalk` can print `PASS` and fail with 'Missing expected failure': its expected failure depends on a race (ledger row 1004). The gate is then red, as for any failure. Cite the row in your report.
5. Write the summary: `gate_summary tmp/gate tmp/gate/summary.txt`. Compare it: `gate_compare "$(last_landed_summary)" tmp/gate/summary.txt`. It prints a line for a suite with failures or errors, a suite with no tests, a suite whose count of tests fell, and a suite that is gone. Each such line makes the gate red. A count that rose prints nothing.
6. Do the atomic runs, and append their lines to the summary.
7. Run the interpreter's suite on the compiled path (below).

## The atomic runs

The atomic runs compile the programs below, and run each one three times at four threads. They need the library's jars in the tree's caches (`build-and-caches.md`). Run them from `ProjectFortress/`:

    for p in AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG \
             AlsoArmThrowsJoinsCompiled CallArgumentsForkCompiled AtomicOwnWriteNestedCompiled \
             AtomicNestedSameBodyCompiled NestedAtomicAbortCompiled AtomicNestedViewCompiled \
             AtomicSharedReadsCompiled AtomicThrowRevertsCompiled AtomicExprCompiled AtomicFieldCompiled \
             atomic0 atomic1 atomic2 atomic3 atomic4 atomic5 atomic6 \
             nestedTransactions0 nestedTransactions1 nestedTransactions2 ; do
      d=other_compiler_tests ; [ -f compiler_tests/$p.fss ] && d=compiler_tests
      timeout -k 5 300 ../bin/fortress compile $d/$p.fss >/dev/null 2>&1 || { echo "# atomic $p COMPILE-FAILED" ; continue ; }
      for i in 1 2 3 ; do
        out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run $p 2>&1) ; rc=$?
        [ $rc -eq 124 ] && { out=$(FORTRESS_THREADS=4 timeout -k 5 120 ../bin/fortress run $p 2>&1) ; rc=$? ; }
        case "$out" in *FAIL*) r=FAIL ;; *PASS*) r=PASS ;; *) r="NO-PASS rc=$rc" ;; esac
        [ $rc -eq 124 ] && r=TIMEOUT-TWICE
        echo "# atomic $p run$i threads=4 $r"
      done
    done

The gate is red on any FAIL, NO-PASS, COMPILE-FAILED or TIMEOUT-TWICE.

## The suite on the compiled path

Step 7 runs, on the compiled path, the programs of the interpreter's suite (`ProjectFortress/tests/`) that pass there. Its list, `explorations/compile-ladder/gate/suite-compiled.tsv`, names them; `explorations/coordinator/tools/suite-compiled/README.md` gives its form. A program passes by its own checks, as the harness judges a test without the `XXX` prefix (`tests-writing.md`, "Where a test goes, and how it passes").

The step also tries, under both libraries, each program of `ProjectFortress/tests/` that changed since the base and that the list does not hold. A tried program that passes joins the list; one that fails is only counted. A listed program leaves the list if its file is gone, or if it fails and your brief declares that it leaves.

Run it from the tree's root, in the background, with its log in `tmp/gate/suite-compiled.txt` (`session.md`, "Long commands"). It takes about 8 minutes. `<base>` is your base. After the four arguments, name each program that your brief declares leaving the list:

    explorations/coordinator/tools/suite-compiled/run.sh explorations/compile-ladder/gate/suite-compiled.tsv \
        <base> tmp/gate/suite-compiled tmp/gate/suite-out [tests/X.fss ...]

Append each line of the log, except `EXIT=`, to the summary, with `# suite-compiled ` before it. A FAIL line, a listed program that failed, or a MISSING line, a listed program with no verdict, is red. So is an `EXIT=` other than 0. The list after the run is `tmp/gate/suite-out/list.tsv`.

If your brief asks you to add to the list the programs that your change makes pass, run the script after your edit on a list of your own, with `-` as its base and with folders of your own. In your commit, add to the list each program that `verdicts.tsv`, in your output folder, shows passing.

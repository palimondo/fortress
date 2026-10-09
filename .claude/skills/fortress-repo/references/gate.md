# The gate

The gate runs the seven steps below on one tree, in about 25 minutes. It is green if every step passes, and red if one fails. If a step fails, run the rest, so that the summary holds every step's result.

## What it writes

The summary, `summary.txt`, has one tab-separated row for each suite: `track/suite`, tests, failures, errors, skipped. Below the rows, lines that start with `#` give each log's `BUILD` and `Total time:` lines, the machine that ran the gate (`# machine`), the atomic runs and the ladder's comparison. When the results land, the microGPT walk check of the landed tree adds its `VERDICT:` and `rc=` lines, as `# microgpt-walk` lines.

If your brief asks you to land a gate's results, put them in a new `gate/` folder in `explorations/compile-ladder/`, under the `climb-batch-` name that your brief gives, in the form of the newest one: `summary.txt`, and in `ladder/` the files `ladder.tsv`, `microgpt-phase.md`, `comparison.txt` and `microgpt-comparison.txt`. The next gate compares with the newest summary there or in `explorations/compile-ladder/gate-baseline/`, and finds no other. Land them in a commit that changes nothing else that the gate reads.

Steps 5 and 7 use shell functions from `explorations/coordinator/climb-batch-workflow.js`, where each of their lines is a JavaScript string. This command writes them, as bash, to a file that each call of steps 5 and 7 sources with `source tmp/gate-functions.sh`:

    node -e 'for (const l of require("fs").readFileSync(process.argv[1], "utf8").split("\n")) {
      const t = l.trim().replace(/,$/, ""); if (/^\x27.*\x27$/.test(t)) try { console.log(eval(t)) } catch (e) {} }' \
      explorations/coordinator/climb-batch-workflow.js |
    awk '/^ *(gate_summary|gate_compare|last_landed_summary|ladder_filter|ladder_compare|mg_phases) \(\) \{/ { p = 1; i = match($0, /[^ ]/) }
         p { print } p && (/; }$/ || (/^ *}$/ && match($0, /[^ ]/) == i)) { p = 0 }' > tmp/gate-functions.sh

## When to run it

Your brief says whether you run the gate. If it does not ask, run only your own tests (`tests-running.md`).

If it asks, first check whether the newest gate still holds for your tree. A gate's tables stay valid until the tree changes under `ProjectFortress/` or `Library/`, or in `build.xml`, outside the test files. A test file is a `.fss`, `.fsi` or `.test` file directly in `ProjectFortress/tests/` or a `ProjectFortress/*_tests/` directory. The commit that landed the newest summary changed nothing that the gate reads. Commit your tree, then run this command. It prints each path, test files excepted, changed since that commit:

    G=$(git log -1 --format=%H -- 'explorations/compile-ladder/climb-batch-*/gate/summary.txt')
    git diff --name-only $G HEAD -- ProjectFortress Library build.xml \
        | grep -v -E '^ProjectFortress/([^/]*_)?tests/[^/]*\.(fss|fsi|test)$'

- If it prints a path, run the gate.
- If not, the newest gate holds. Run only the changed test files, through `harness-one.sh` and `junit.sh` (`tests-running.md`).

## The steps

Run these steps from the tree's root. Keep the logs of steps 2 and 4 in `tmp/gate/`, as `compileAll.txt`, `testFast.txt`, `testSystem.txt` and `testSpecData.txt`.

1. Read the Avail column of `df -h /`. Warning: deleting `/tmp/fortress*rats` can break other live runs. If the column shows less than 1 GB, delete `/tmp/fortress*rats`, `ProjectFortress/test-tmp` and `ProjectFortress/test-caches`, and read it again. If it still shows less than 500 MB, stop and report.
2. Run `rm -rf ProjectFortress/TEST-RESULTS tmp/gate && mkdir -p tmp/gate`, then `ant compileAll`.
3. If the build printed `Caches <tree>/default_repository/caches started again, empty`, run the library order (`build-and-caches.md`). If not, and a source of the compiler's library changed since the caches were filled, take its step in `build-and-caches.md`, "After an edit of the library". Then copy the caches twice for the ladder regression, before anything else compiles into them:

       D=$PWD/tmp/gate/ladder ; mkdir -p $D/root
       cp -a default_repository/caches $D/root/ladder-caches
       cp -a default_repository/caches $D/root/pristine

4. Run `ant testFast`, then `ant testSystem`, then `ant testSpecData`. All three must have zero failures.
5. Write the summary: `gate_summary tmp/gate tmp/gate/summary.txt`. Compare it: `gate_compare "$(last_landed_summary)" tmp/gate/summary.txt`. It prints a line for a suite with failures or errors, a suite with no tests, a suite whose count of tests fell, and a suite that is gone. Each such line makes the gate red. A count that rose prints nothing.
6. Do the atomic runs, and append their lines to the summary.
7. Do the ladder regression.

## The atomic runs

The atomic runs compile fourteen programs, and run each one three times at four threads, in about a minute. They need the library's jars in the tree's caches (`build-and-caches.md`). Run them from `ProjectFortress/`:

    for p in AtomicTopLevelObjectVar AtomicTopLevelVar MutableTopLevelVarInLoop FirstLoadThreadsRungG \
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

## The ladder regression

The compile ladder records how far each test program gets through the compiler's phases, in order: parse, disambiguate, typecheck, codegen, link, run and pass. The ladder regression runs part of it again, and compares the result with the baseline, `explorations/compile-ladder/baseline-2026-09-19/`:

- It compiles and runs the 85 programs of the baseline's `pass-list.txt`. It compares each one's phase and output with the baseline's `raw/`.
- It compiles the eighteen components of the two microGPT programs, and never runs them. It compares each one's phase with the baseline's `microgpt-phase.md`.

A file that moved gets a mark:

- DOWN: a phase lower than the record.
- MISSING: a file with no output.
- STDOUT: output that differs from the record after the `Operation took <n>ms` line is masked.
- UP: a phase higher than the record. This is progress, not red.

DOWN, MISSING and STDOUT are red, unless your brief declared that move as expected before the gate ran.

Warning: do not run `run-ladder.sh`, the driver over every test program, with its defaults. Its default root is shared, its cache pruning corrupts a parallel run, and its default `OUT` is a tracked folder.

To run it, as step 7, with step 3's copies of the caches:

1. Copy the drivers into `tmp/gate/ladder/`, and point their outputs and caches there:

       D=$PWD/tmp/gate/ladder ; B=explorations/compile-ladder/baseline-2026-09-19
       cp explorations/compile-ladder/repair-r1-atomic-static/run-subset.sh \
          $B/classify.py $B/microgpt-phase.sh $B/microgpt-phase.py $D/
       sed -i -e "s|^OUT=.*|OUT=$D|" -e "s|^LADDER_ROOT=.*|LADDER_ROOT=$D/root|" $D/run-subset.sh
       sed -i -e "s|/home/user/fortress|$PWD|g" \
           -e "s|^export LADDER_CACHES=.*|export LADDER_CACHES=$D/root/ladder-caches|" \
           -e "s|^export LADDER_TMP=.*|export LADDER_TMP=$D/root/ladder-tmp|" \
           -e "s|^RAW=.*|RAW=$D/raw/microgpt|" -e "s|^TSV=.*|TSV=$D/microgpt-results.tsv|" $D/microgpt-phase.sh
       tail -n +2 $B/pass-list.txt | cut -f1 | sed 's|/|\t|' > $D/subset.txt

2. Run the four scripts, with no arguments, in this order: `bash $D/run-subset.sh`, `python3 $D/classify.py`, `bash $D/microgpt-phase.sh` and `python3 $D/microgpt-phase.py`. Each reads and writes in `$D`. This takes about 200 s for the 85 and 35 s for the eighteen, so run them in the background (`session.md`, "Long commands"). With step 3's copies, the driver skips the library's build (about 145 s).
3. Compare: `ladder_compare $B $D`, then `diff <(mg_phases $B/microgpt-phase.md) <(mg_phases $D/microgpt-phase.md)`. Append each line that they print to the summary, with `# ladder ` before it.

If your brief asks for your change's own ladder subset, write your own `subset.txt`. Put in it each file whose recorded first error in the baseline's `raw/` names something that your change touched. Run them after your edit only. Compare them with the newest landed `ladder.tsv`, or with the baseline's `raw/` for a file that the gate does not run.

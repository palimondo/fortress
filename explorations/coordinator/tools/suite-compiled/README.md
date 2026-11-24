# suite-compiled: the interpreter's suite on the compiled path

The gate's step 7, by the curator's decision P-103, "The suite's verdict is the check.": the gate runs the interpreter's suite on the compiled path, each program that compiles there runs, and its own asserts give the verdict; the list grows as more programs compile, and at the switch-over every program of the suite runs on both paths, except those that need walk's reflection. Nothing compares what a test prints with an earlier run.

- `run.sh` runs the step; its header gives its usage and what it needs. `gateRole` and `gateSuitesRole` in `../../climb-batch-workflow.js` call it, and a rung on the compiled path runs it for its step 10.
- `judge.py` judges each program; its header gives the rules, read from the walk harness (`ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java`, `SourceFileTest.testFile` and `refusalVerdict`).
- `test_judge.py` checks the judge on made-up results and runs no Fortress: `python3 -B explorations/coordinator/tools/suite-compiled/test_judge.py` prints one line a check and "0 problem(s)".
- The list is `explorations/compile-ladder/gate/suite-compiled.tsv`. Its header says where its first form came from.

## The step

Each program of the list is compiled and run under its library: the one library (`FORTRESS_LIBRARY=one`) where it passes there, else the compiler's prelude. Each program of `ProjectFortress/tests/` that the batch added or changed, and that the list does not hold, is tried under both. A program passes as the harness judges it under walk: the compile and the run exit 0 and neither prints `fail` or `FAIL`, unless its name holds `QuickCheckTest`; a program whose `.test` names a refusal at load passes when the compile refuses it as the keys name. The `XXX` prefix is not turned round: it marks walk's expected failure, and the list holds the programs whose own asserts pass compiled.

A listed program that fails turns the gate red, unless a rung's manifest entry declares it leaving the list (`expectedMoves`, "path (library): reason"). A listed program whose file is gone leaves the list: a promotion renames a file, and the new name is then a tried program. A tried program that passes joins the list; the gate writes the new list into its outputs, and the commit stage lands it in the list's place.

The list grows in two ways. The gate tries the batch's new and changed programs of `tests/`, so a new test that passes compiled joins at its landing. A rung whose change is on the compiled path runs, after its edit, the programs that its change can make pass, and adds to the list those that pass (its step 10); this is the way an old program joins when a fix of the compiled path reaches it.

## The microGPT compile

The ladder regression also compiled the eighteen components of microGPT's two programs, never linked or run, and compared each one's phase with its baseline. The step drops it. They are no program of the suite, they give no verdict of their own when only compiled, and the comparison with a baseline is the kind P-103 rules out. The measure could not move before the switch-over either: it compiled against the prelude, which lacks the names that microGPT uses, and all 18 stopped at disambiguate from 2026-09-19 to climb batch 35b's gate (`compile-ladder/climb-batch-35b/gate/ladder/microgpt-phase.md`; `process-engineering/output-comparisons-2026-11-23.md`, section 3.1). The model program keeps its check under walk at the commit stage (`../mg-run.sh`), whose verdict comes from the asserts inside its two quick programs.

## The gate's minutes

The ladder regression took about 235 s: 200 s for its 85 programs and 35 s for microGPT's eighteen components (the `fortress-repo` skill's `gate.md`, "The ladder regression"). This step took 8 min 19 s in its first whole run below, the two libraries side by side: the prelude's 136 programs in 6 min 28 s, about 2.9 s each; the one library's fourteen components in 167 s, then its 91 programs in 5 min 32 s, about 3.6 s each. So it adds about 4 minutes to the gate. The ways weighed, each against the gate's minutes:

- Each program under both libraries where it passes under both: 63 more runs on the prelude's side, about 3 minutes, and that side becomes the longer: about 1 minute more than this way.
- The two libraries one after the other: about 15 minutes, 11 more than the ladder.
- Every program of the suite tried at every gate, so that the list grows by itself: the count of 2026-11-24 took 31 and 21 minutes for its two libraries (`compile-ladder/suite-compiled-2026-11-24/REPORT.md`), about 45 minutes more.
- The one library's jars copied from `testFast`'s onelibrary track before `testSystem` deletes them, which saves the 167 s: the copy must come between the two suites, and that folder also holds the track's own programs. Not taken.
- No tried programs, the list grown by rungs alone: about 1 minute less, at batch 35b's size of 15 tried programs, and a new test that passes would wait for a rung to add it.

Each program is compiled from the pristine caches, the driver's prune run after every file, not every tenth: it costs a `find` over the caches folder a file, and no second at the gate's scale.

## The first run

On a scratch worktree seeded from `/home/user/fortress-wsuite` at `4b0e3abd6a` (the base of the count), after `ant compileAll`, the library order, and the gate's step 3 copies of the caches; 4 CPUs, Intel Xeon at 2.30 GHz, the load 0.5 at the start, OpenJDK 25.0.4.1, nothing else running. The base `295c215c2c`, climb batch 34b's landing, makes the 19 programs of `tests/` that batches 35 and 35b added or changed the tried set: 4 are listed, 15 tried.

    explorations/coordinator/tools/suite-compiled/run.sh explorations/compile-ladder/gate/suite-compiled.tsv 295c215c2c tmp/gate-p103/suite-compiled tmp/gate-p103/out/suite-compiled

Expected, stated before the run: every listed program passes, since the count found each passing on the same code; of the 15 tried, the count found none passing, but three carry a `.test` whose key names a refusal at load, and the count's compile output of each holds that message, so they join under the one library.

The first run, on the list of 198 that the count gave, printed one failure, the machine's restart having cut an earlier start:

    LISTED	198	PASS 197	FAIL 1	LEAVES 0	GONE 0
    CANDIDATES	15	JOINS 3
    FAIL	prelude	tests/OverloadSingleParamUnbounded.fss	run exit 1: FAIL:  1 =/= 2; f(a, b) on two ZZ32 values runs the declaration of two parameters, ...
    JOINS	one	tests/NotEquivShorthandWalk.fss
    JOINS	one	tests/XXXNumeralTypeReturnTypeWalk.fss
    JOINS	one	tests/XXXUndeclaredChainOperatorWalk.fss

The program fails in 8 of 8 compiles from the caches that the library order leaves, and passes once any other program's compile has written the api `Executable`'s analyzed entry there; the count had compiled it after `tests/OverloadConstructor1.fss`, the driver pruning only every tenth file (ledger row 1130). So the step now prunes after every file, and the list leaves the program out. The second run, on the list of 197, printed what was expected, with `EXIT=0`, in 8 min 19 s:

    LISTED	197	PASS 197	FAIL 0	LEAVES 0	GONE 0
    CANDIDATES	15	JOINS 3
    JOINS	one	tests/NotEquivShorthandWalk.fss
    JOINS	one	tests/XXXNumeralTypeReturnTypeWalk.fss
    JOINS	one	tests/XXXUndeclaredChainOperatorWalk.fss

The three that join are refused at compile with the message their `.test` names, as walk refuses them at load: `Operator NOTEQUIV is not defined.`, `NaturalNumeral cannot be written in a program except as a parameter's type.` and `Operator APPROX is not defined.` The count did not judge the 119 programs of `tests/` that carry such a key by it, so others of them may pass compiled by their own verdict; they join as the batches change them, or as a rung adds them.

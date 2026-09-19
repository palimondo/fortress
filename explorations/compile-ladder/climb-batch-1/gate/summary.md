# Climb batch 1 — the gate

Run on the merged main tree, `3d2d3c968` ("Fold the review's corrections"),
batch base `cb242a2d8`. No source was changed by this run. JDK 25
(`openjdk 25.0.4`), `FORTRESS_HOME=/home/user/fortress`, environment from
`experiment/env.sh` only.

## Verdict

**Green.** Zero failures and zero errors in every suite of `testFast`;
0 fail / 0 skip in `testSystem`; `BUILD SUCCESSFUL` on both and on
`compileAll`.

## Steps and wall time

| Step | Wall time | Result |
| --- | --- | --- |
| 1. `df -h /` | — | 25 G free, no sweep needed |
| 2. `ant compileAll` | 31 s | `BUILD SUCCESSFUL` (ant: 30 s) |
| 3. library-order cache rebuild (5 compiles) | 183 s | all `rc=0` |
| 4a. `ant testFast` | 462 s | `BUILD SUCCESSFUL` (ant: 7 min 41 s) |
| 4b. `ant testSystem` | 154 s | `BUILD SUCCESSFUL` (ant: 2 min 33 s) |
| total | 830 s | |

Logs: `compileAll.out`, `library.out`, `testFast.out`, `testSystem.out`
in this directory. They are on disk only — `.gitignore:46` ignores `*.out`,
so this summary is the committed record of the run.

## Step 1 — disk

`/dev/vda 252G used 13G avail 25G (34%)` before the run, 25 G after. Above
the 1 GB threshold, so no sweep of `/tmp/fortress*rats`,
`ProjectFortress/test-tmp` or `ProjectFortress/test-caches` was performed.
`ProjectFortress/TEST-RESULTS` was removed before step 2 and is 488 K after.

## Step 2 — `ant compileAll`

`BUILD SUCCESSFUL` on the last-but-one line, `Total time: 30 seconds`, no
`error:` and no `BUILD FAILED` anywhere in the log. Targets executed: `init`,
`cleanCache`, `compileCommon`, `checkAstgen`, `astGenerators`,
`checkNodesUptodate`, `makeAST`, `checkParserUptodate`,
`checkOperatorsUptodate`, `operatorsGen`, `parser`, `compileAll`. scalac ran
in full (159 deprecation warnings, no errors); javac compiled one source
file, `ProjectFortress` having been left warm — that file is rung F's
`nativeHelpers/simpleDoubleArith.java`, the batch's only `.java` change.

## Step 3 — library-order bytecode cache rebuild

`cleanCache` (build.xml:356-360) runs inside `compileAll` and empties
`default_repository/caches`, so this was a genuine cold rebuild and neither
of the two operational traps of the shared prefix could apply: no compile
could no-op on unchanged source, and `nativewrapper_cache` was empty rather
than stale. Rung F's helper change is eleven added methods with no change to
any existing signature (`git diff cb242a2d8..HEAD --
ProjectFortress/src/com/sun/fortress/nativeHelpers/simpleDoubleArith.java`),
so the stale-signature trap had nothing to bite on either way.

| Compile | Elapsed | rc | Baseline |
| --- | --- | --- | --- |
| `LibraryBuiltin/AnyType.fss` | 27 s | 0 | 21 s |
| `LibraryBuiltin/CompilerBuiltin.fss` | 120 s | 0 | 104 s |
| `../Library/CompilerLibrary.fss` | 32 s | 0 | 17 s |
| `../Library/CompilerAlgebra.fss` | 2 s | 0 | 2 s |
| `../Library/CompilerSystem.fss` | 2 s | 0 | 1 s |
| total | 183 s | | 145 s |

The 38 s growth over the shared prefix's cold baseline sits where the batch
added declarations: `CompilerBuiltin` (rungs F, N and M) and
`CompilerLibrary` (rung T).

## Step 4a — `ant testFast`

47 suites, **1409 tests, 0 failures, 0 errors, 0 skipped**. No
`Tests expected to pass are failing` line anywhere in the log.
`BUILD SUCCESSFUL`.

Every `Tests run:` line reads `Failures: 0, Errors: 0, Skipped: 0`. The three
suites that dominate the wall clock:

| Suite | Tests | Time |
| --- | --- | --- |
| `OtherCompilerJUTest` | 263 | 460.3 s |
| `CompilerJUTest` | 652 | 436.3 s |
| `LibraryJUTest` | 77 | 405.7 s |
| 44 further unit suites | 417 | under 26 s each |

The four rung tests the batch added are in `LibraryJUTest` and all four
linked and ran:

    link library_tests/TimingRungT          OK (1485ms)   run ... (992ms) Passed
    link library_tests/IntegralOpsRungN     OK (7209ms)   run ... (913ms) Passed
    link library_tests/MaybeRungM           OK (1650ms)   run ... (1620ms) Passed
    link library_tests/RR64FunctionsRungF   OK (4359ms)   run ... (1129ms) Passed

The `Saw expected failure` lines in the log (compiler_tests `Compiled*`,
parser_tests `XXXPreparser.*`) are the negative tests reporting the failure
they are written to require; they are not gate failures.

## Step 4b — `ant testSystem`

4 shards, **382 tests, 0 failures, 0 errors, 0 skipped**. `BUILD SUCCESSFUL`.

| Shard | Tests | Failures | Errors | Skipped | Time |
| --- | --- | --- | --- | --- | --- |
| 0 | 97 | 0 | 0 | 0 | 100.2 s |
| 1 | 95 | 0 | 0 | 0 | 103.5 s |
| 2 | 95 | 0 | 0 | 0 | 140.2 s |
| 3 | 95 | 0 | 0 | 0 | 152.4 s |

382 is the interpreter count of record. `SkipListTest` is a test name, not a
skip; the `XXX*` entries are expected-failure and expected-exception tests
reporting `OK`.

## Failing tests

None, in either target.

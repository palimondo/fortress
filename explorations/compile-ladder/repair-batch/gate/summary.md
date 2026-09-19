# Repair batch: the gate

Run on `main` at `5a54bc67` — the merge of R1 (`repair-r1-atomic-static`) and R2
(`repair-r2-literal-wrap`) off the batch base `49ee5e91`, plus the review's
corrections (`ef1fa364`) and the ladder-criterion wording (`5a54bc67`). No source
was changed by this run; the working tree was clean at the start
(`git status --short` empty).

**Result: green.** `ant compileAll`, `ant testFast` and `ant testSystem` all end
`BUILD SUCCESSFUL` with exit 0. Across the 47 suites of `testFast`: 1401 tests,
0 failures, 0 errors, 0 skipped. Across the 4 tracks of `testSystem`: 382 tests,
0 failures, 0 errors, 0 skipped. No failing tests to name.

Environment: JDK 25 (`openjdk 25.0.4 2026-07-21`), `FORTRESS_HOME=/home/user/fortress`,
`FORTRESS_THREADS=1`, `JAVA_FLAGS=-Xmx4g -Xss64m` — all from `experiment/env.sh`,
nothing exported beyond it.

## Steps and wall times

| # | Step | Start (UTC) | End (UTC) | Wall | ant's own total | Log |
|---|------|-------------|-----------|------|-----------------|-----|
| 1 | `df -h /` | 03:01:4x | — | — | — | inline below |
| 2 | `ant compileAll` | 03:01:48 | 03:02:33 | 45 s | 44 s | `compileAll.out` |
| 3 | library-order cache rebuild (5 × `fortress compile`) | 03:02:47 | 03:05:11 | 144 s | — | `library.out` |
| 4 | `ant testFast` | 03:05:19 | 03:11:36 | 377 s | 6 min 16 s | `testFast.out` |
| 5 | `ant testSystem` | 03:12:00 | 03:14:07 | 127 s | 2 min 6 s | `testSystem.out` |

Gate end to end: 03:01:48 → 03:14:07, 739 s (12 min 19 s). Each long step ran in
the background with all output to its file and was polled; neither ant run was
piped through `tail`, and `testFast` and `testSystem` never overlapped.

### 1. Disk

`/dev/vda 252G used 11G avail 27G 29%` before the run, 30% after. Far above the
1 GB threshold, so no sweep of `/tmp/fortress*rats`, `ProjectFortress/test-tmp`
or `ProjectFortress/test-caches` was needed — and in fact none existed:
`/tmp/fortress*rats` was empty (`env.sh` removes it on every source) and the two
`ProjectFortress` directories were absent, both being created and deleted by the
test targets themselves (`build.xml:960,992` and `1201,1208`).

### 2. `ant compileAll`

`ProjectFortress/TEST-RESULTS` was removed first. Both compile steps really ran —
scalac to 159 warnings, then `[javac] Compiling 1610 source files` — so this was
the full rebuild the unguarded scalac step (`build.xml:547-568`) always is, not a
no-op. `BUILD SUCCESSFUL` is the last line of `compileAll.out` before the
recorded `EXIT=0` (line 879 of 881).

### 3. Library-order bytecode cache

`default_repository/caches/` held only `global.map` at the start, so all five
compiles did real work; the times confirm it against the shared prefix's cold
figures (21 / 104 / 17 / 2 / 1 s), which rules out the "source unchanged, writes
nothing, exits 0" trap:

| Component | `real` | Exit |
|---|---|---|
| `LibraryBuiltin/AnyType.fss` | 20.1 s | 0 |
| `LibraryBuiltin/CompilerBuiltin.fss` | 104.1 s | 0 |
| `../Library/CompilerLibrary.fss` | 17.0 s | 0 |
| `../Library/CompilerAlgebra.fss` | 1.5 s | 0 |
| `../Library/CompilerSystem.fss` | 1.5 s | 0 |

Afterwards `analyzed_cache` is 11 MB, `bytecode_cache` 392 KB and
`nativewrapper_cache` 128 KB. The stale-nativewrapper trap cannot apply here: the
cache directory was empty before the rebuild, so nothing old could be linked
against.

### 4. `ant testFast` — 47 suites, 1401 tests, 0 failures, 0 errors, 0 skipped

Counts taken from the per-suite reports under `ProjectFortress/TEST-RESULTS/`,
which name the suite each summary belongs to; the `[junit] Tests run:` lines in
`testFast.out` agree but are interleaved across the four parallel tracks
(`build.xml:963-988`), so the reports are the reliable mapping.

| Track | Suite | Tests | Fail | Err | Skip | Time |
|---|---|---|---|---|---|---|
| fast-compiler | `CompilerJUTest` | 652 | 0 | 0 | 0 | 357.1 s |
| fast-othercompiler | `OtherCompilerJUTest` | 263 | 0 | 0 | 0 | 375.2 s |
| fast-library | `LibraryJUTest` | 69 | 0 | 0 | 0 | 322.8 s |
| fast-misc | 44 suites (`ParserJUTest` 188, `PrecedenceMapJUTest` 14, `UsefulJUTest` 15, `ASTJUTest` 13, `GHashMapJUTest` 13, `BASetJUTest` 12, `IdentifierUtilJUTest` 11, `FortressTypeToJavaTypeJUTest` 11, and 36 smaller) | 417 | 0 | 0 | 0 | 23.8 s max |

The four tests the two repairs added all ran and passed, which is what makes this
gate a gate on the repairs and not only on the tree:

- `compiler_tests/AtomicTopLevelVar` — link OK 1050 ms, run 1077 ms, Passed
- `compiler_tests/AtomicTopLevelObjectVar` — link OK 1007 ms, run 550 ms, Passed
- `compiler_tests/MutableTopLevelVarInLoop` — link OK 1230 ms, run 680 ms, Passed
- `compiler_tests/IntLiteralWrapRepairR2` — link OK 1405 ms, run 680 ms, Passed

`library_tests/Integer1`…`Integer4`, which R2's report says its repair turned red
and then repaired, are all OK in `LibraryJUTest`.

### 5. `ant testSystem` — 4 tracks, 382 tests, 0 failures, 0 errors, 0 skipped

| Track | Tests | Fail | Err | Skip | Time |
|---|---|---|---|---|---|
| system-0 | 95 | 0 | 0 | 0 | 85.0 s |
| system-1 | 95 | 0 | 0 | 0 | 117.7 s |
| system-2 | 97 | 0 | 0 | 0 | 83.4 s |
| system-3 | 95 | 0 | 0 | 0 | 125.7 s |

Every `[junit] interpret …` line reads `OK`, `Saw expected failure` or
`OK Saw expected exception`; not one line lacks one of those. The three
expected-failure tests that report as such are `XXXtypeParamShadowing`,
`XXXsubtypeRuleResultFail` and `XXXfailTestFn`, and the harness counts them as
passes, as it always has.

## One correction to the gate recipe

The brief asks for `"Tests expected to pass are failing"` in the logs "if
present". It is absent from both, and that absence is informative, but not for
the reason the phrasing suggests: the string is not something a suite prints. It
is ant's own `<fail message="Tests expected to pass are failing!"
if="tests.failed"/>` — `build.xml:993` for `testFast`, `build.xml:1209` for
`testSystem` — raised only when the `tests.failed` property has been set by a
`junit` task. So its absence is exactly equivalent to the `BUILD SUCCESSFUL` on
each run and carries no information the per-suite counts do not. The counts are
the load-bearing evidence; grepping for the phrase is a second reading of the
same dial.

## The logs are on disk but not in git

`compileAll.out`, `library.out`, `testFast.out` and `testSystem.out` sit in this
directory — 176 KB, 529 B, 125 KB and 40 KB — but `.gitignore:46` is `*.out`, one
of the LaTeX rules, so git will never carry them and this summary is the only
committed evidence of the run. If the record wants the raw gate output kept, the
files need another extension or `.gitignore` needs a negation for this directory;
that is the coordinator's call, not the gate's, so nothing was renamed. The
timing marker files the run used to bracket each step were removed once their
values were written into the table above, leaving the tree clean.

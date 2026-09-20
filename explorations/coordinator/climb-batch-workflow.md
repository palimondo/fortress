<!-- What `coordinator/climb-batch-workflow.js` does stage by stage after the 2026-09-19 generalisation, and
     which review item each change answers. The decisions are `coordinator/process-decisions-review-1.md`
     as amended and `POSITIONS.md`, 2026-09-19 ("after climb batch 1 landed"); the eight free changes are
     `repair-batch-review.md` section 10. Item numbers below are those two lists. -->

# The batch workflow script, stage by stage

The script runs *a* batch, not batch 1. Everything a batch changes lies between the `MANIFEST` and `END MANIFEST` markers: the batch number, its decision record, its intro and overlap sentences, the first free ledger row, and one entry per rung — `id`, `slug`, `path`, `branch`, `tail`, `blurb`, `expectedMinutes`, `writesState`, `expectedMoves`. Batch 1's manifest is left in place as the example.

## Manifest and scatter (item 8)

`expectedMinutes` sorts the scatter, longest-expected worker first: 0–12 minutes when the guess is right, free when it is not. k stays 4. The two-agent cap and the FIFO handing of a freed slot to the next queued agent are a comment on the manifest block with their `FACTS.md` sources; rung chains (decision 2(a)) are not implemented and the comment says why — replayed on batch 1's walls they save 0.3 minutes. Ledger numbering follows manifest order, not scatter order, and the script maps the results back.

## Shared prefix

New: a `run_bg`/`wait_for` pair at five-second granularity (item 7); a committed capture is `.txt`, never `.out` or `.log` (`.gitignore:42,46`, item h); `ant` is never piped through `tail` (item i). Rule 2 asks for the site count when a precedent repaired a defect (item 6); rule 3 asks for the passage rather than the grep hit, ten lines either side (item 2). The register paragraph limits a test file to one comment line pointing at its `REPORT.md` (item e, `protocol.md` section 2).

"What a measured defect is worth" is the rule that closes the 22-and-2 gap. Every defect anyone measures has one of three homes and the record says which:

1. **repaired in the rung**, whoever measured it → an assertion in the rung's own gated test, passing before the second skeptic runs (item a);
2. **deferred, specification settles it** → a gated expected-failure test named `XXX…` asserting the specification's answer. The mechanism is cited so it can be checked: `FileTests.java:922` sets `shouldFail` from the name and `:577`/`:644` make `shouldFail != failed` the failure condition, so the suite goes red the day the test starts passing; `:841` names the case and the author's warning at `:843` is why a rung's first `XXX` file is shown to go red on a deliberate local fix (item b);
3. **deferred, specification silent** → a probe with a committed `.txt` capture and a ledger row, the record saying the silence is the reason (item c).

The tracked-path check is here too: every `explorations/` path a record cites is `git ls-files --error-unmatch`'d before the rung reports (item g, gap 4).

## Rung worker

Step 1 fixes the check line at `run_out_contains=PASS` and notes that `run_out_WIcontains` is now implemented rather than silently inert (item d). Step 8 is the three-homes obligation. The provenance block gains a fifth line, `historical:`, naming every 2012-tree file the rung edits (item 8, `protocol.md:97`). Step 11 is the tracked-path check. `RUNG_SCHEMA` gains `historicalFiles`, `defectHomes`, `trackedPaths`.

## Skeptic

Check 7 is the three homes — the skeptic runs the test itself to see a home-1 assertion pass. Check 0 covers the fifth provenance line. A rung whose manifest entry sets `writesState` has every differential run at `FORTRESS_THREADS=1` **and** `=4`, both columns reported (item f, gap 2); a rung without it is told to do the same if its reading of the diff finds a mutable variable, a field, an `atomic` block or a write into `CompilerLibrary`'s state. `SKEPTIC_SCHEMA` gains `recommendedRows` (item 1), `threadCounts`, `defectHomes`.

## Gather

Rungs are applied in ascending order of lowest edited line in the shared files, and a cited `file:line` that an earlier applied rung shifted is re-anchored by symbol (item 5). Each `recommendedRows` entry is opened or refused in one sentence (item 1). Files are staged by an explicit list and `git diff --cached --stat` is read before the commit, never `git add` of a directory (`protocol.md` section 4, 2026-09-19). A commit touching any path outside `explorations/` carries a `historical:` line (item 8, 7c). A rung that stopped or was dropped has its `SKEPTIC.md` findings, its recommended rows and the probes those findings cite — taken out of its branch path by path — folded under a "Not landed" heading with no source applied (7a, gap 3). After the last commit the tracked-path check runs over every landed record (7b).

## Review beside the gate

Both run in one `parallel()` — the substitute the review recommended for the rejected rung chains, 14.7 minutes per batch off the serial tail. The risk of two agents committing at once is closed by the gate committing nothing; the commit stage adds its summary. The review records the head before and after its corrections commit, runs `git diff --name-only` between them, and returns every path outside `explorations/`; a non-empty list re-runs the gate, and so does a blocking finding that goes to the judge.

## Gate

Disk, `compileAll`, the library rebuild **plus a copy of the fresh library cache** for the ladder stage, `testFast`, `testSystem`, the summary and its comparison, the four-thread `atomic` runs, the ladder regression. Logs go to `tmp/gate-batch-<N>/`, which `.gitignore:65` now ignores (appended at the end of the file so that no existing `.gitignore` citation moves), never committed. The `"Tests expected to pass are failing"` grep is gone (item 4): it is ant's own `<fail message=…>` and reads the same dial as `BUILD SUCCESSFUL`.

`summary.txt` comes from a fixed shell snippet in the script, not agent prose (item 3): one row per suite — `track/suite`, tests, failures, errors, skipped — read from the plain-formatter files under `ProjectFortress/TEST-RESULTS/fast-*/` and `system-*/`, because the four parallel `testFast` tracks interleave their `Running` and `Tests run:` lines in the ant log and cannot be paired there; the `BUILD SUCCESSFUL` and `Total time` lines come from the logs. `gate_compare` diffs it against the newest landed summary, found with `git log --name-only`; a suite whose count fell, or that is gone, is red and named (gap 1). The `system-<i>` rows are compared by their sum, not one by one: `testSystem` is one suite sharded by sorted index (`FileTests.java:790-806`), so a file added to `ProjectFortress/tests/` moves every later file along the shards; climb batch 2's gate went red on exactly this after `02d09a39f` added two interpreter tests between the baseline and the batch base (`compile-ladder/climb-batch-2/JUDGE-gate.md`). `run_bg` runs its command string in a subshell so a `cd` inside it cannot escape the log, and `atomic_runs` resolves its out-file before its own `cd` (both measured by that batch's gate stage). The first landed summary is `explorations/compile-ladder/gate-baseline/summary.txt`.

The four-thread stage runs the thirteen `atomic` programs the repair batch measured — the ten of `other_compiler_tests/atomicTest.test` plus `AtomicTopLevelObjectVar`, `AtomicTopLevelVar` and `MutableTopLevelVarInLoop` — three times each at `FORTRESS_THREADS=4`. Any `FAIL`, `NO-PASS` or compile failure is red; a timeout is re-run once and then red. The 39 lines go into the summary.

The ladder stage re-runs the 85 files of `baseline-2026-09-19/pass-list.txt` and the eighteen microGPT components of `microgpt-phase.md` with the baseline's own drivers, copying the gate's fresh library cache instead of rebuilding one. The 85 are compared on phase **and** stdout, with a filter masking the `Operation took …ms` line: those three `nestedTransactions` captures are the only ones of the 85 whose output varies, and masking the line rather than exempting the file keeps the rest of their output checked. The eighteen are **compiled only** — `fortress compile`, the phase reached — never linked and never run in this stage (Pavol, 2026-09-19); when they one day compile, running them is a separate non-gating stage, not the gate. A `DOWN`, `STDOUT` or `MISSING` line is red unless `expectedMoves` declared it; a move up is the batch's result and is reported. The judge's `gate` question now names the four ways the gate can be red and where each one's evidence is.

## Measured, and not

Measured: the snippets parse and were dry-run on a five-file subset (zero moves), a timing-only difference (masked), an altered capture (one `STDOUT`) and a lowered phase (one `DOWN`); `gate_summary` and `gate_compare` over this change's own gate, which is `explorations/compile-ladder/gate-baseline/summary.txt` and reports a suite that lost a test and a suite that went missing; `compileAll` 57 s, `testFast` 47 suites / 1,409 tests / 0 failures / 0 errors, `testSystem` 4 shards / 382 tests / 0 / 0. Not measured: the gate-beside-review saving and the longest-first scatter order, which stay arithmetic over batch 1's walls until a batch runs under them.

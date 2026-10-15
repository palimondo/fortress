# Climb batch 15b: the walker split and row 680's line, landed outside a batch

Landed on `main` on 2026-10-14 and 15, outside a batch, at the curator's word, from the main tree with no batch running, in the form of climb batch 13b (`explorations/compile-ladder/climb-batch-13b/RECORD.md`). The split is the checker-speed probe's patch (`explorations/perf-probes/checker-speed-2/`), which its skeptic approved with no fixes (`SKEPTIC.md`, "Approved. No fixes"); row 680's line is the one climb batch 15's rung C wrote and held (`e75bb538b`). Nothing is pushed.

## What landed

| commit | what | from |
|---|---|---|
| `a0205c127` | The walker split: `ScalaAstGenerator.java` emits `Walker.walk`'s 213 class cases in their old order, 30 to a method (`walkCases0` to `walkCases7`), each method handing an unmatched value to the next and the last keeping the List, Option and default cases; `FortressAst.scala` its output; `WalkerJUTest` (4 tests, misc track) | `explorations/perf-probes/checker-speed-2/fix.patch` (`0b308d585`), applied with `git apply`, on `bc65431d5`; `ant compileAll` regenerated `FortressAst.scala` byte for byte (`cmp` against the patched file printed nothing), and the tree's diff equals the patch but for its `index` lines |
| `c23b49a18` | Row 730, the interpreted walker, added closed by `a0205c127` | the probe's `REPORT.md` section 11, "Defects" |
| `e4dabaa0c` | Row 680's line: `STypeCheckerFactory.makeTryChecker(this)` becomes `makeTryChecker(newChecker)` in the `SLetFn` case, `ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:414`; `XXXLocalFunctionSiblingInLoop` and `XXXLocalFunctionSiblingCall` promoted to `LocalFunctionSiblingInLoop` and `LocalFunctionSiblingCall` (`git mv`, `component` and `tests=` lines, the `typecheck_err_contains` key dropped: each file now equals its text at `e75bb538b^`); `XXXLocalFunctionRecursiveUntypedReturn.test` re-keyed to `reference cycle`, and its comment line rewritten to say so | rung C's line (`3216343f6`), held by `e75bb538b`, whose message gives the tests' changes |
| `7377247d2` | Row 680 closed by `e4dabaa0c`, with the corrected claim of `explorations/compile-ladder/climb-batch-15/RECORD.md:155`; reproducer `LocalFunctionSiblingInLoop.test` | `ledger.py close --claim` |
| `3cf18a2b3` | The gate's tables, `gate/summary.txt`, `checker-count.txt`, `distance.txt` and `ladder/` | the gate below |

The per-site list `explorations/compile-ladder/gate/distance-sites.tsv` was overwritten with the gate's `errors.tsv` and is unchanged: the two files are byte-identical (`diff` printed nothing), so no commit carries it.

## Test first, by pointer

- **The split's test.** Failing on the base: `WalkerJUTest` against the base build's classes, "Walker.walk is 31704 bytes of bytecode, more than 8000", "Tests run: 4, Failures: 1, Errors: 0" (`perf-probes/checker-speed-2/REPORT.md` section 8, 2026-10-14 22:15 UTC; again on `558ae0a10` by the skeptic, `SKEPTIC.md` section 3). Passing with the fix: "Tests run: 4, Failures: 0, Errors: 0" (the same two sections).
- **The split's speed and answers.** The count stage with row 680's line, idle: 911 s before and 352 s after on the fix's build (F0, F1), the table and the checker's whole output equal; the distance stage 2,375 s and 931 s, `errors.tsv` identical; 279,692,861 walker branches audited against the single match's, 0 mismatches (`REPORT.md` sections 6 and 7). The skeptic's idle run with both: 333 s, the whole output equal to the run without the fix (`SKEPTIC.md` section 4).
- **Row 680's tests.** Rung C's failing and passing runs, and the recursive case shown red when keyed `reference cycle` with the return type written for one run ('Did not satisfy compile_err_contains; expected reference cycle', `junit.sh xxxred`, 11:05:44Z): `compile-ladder/rung-checker-bounds/REPORT.md` section 2.
- **Here, once, on the built tree.** After `git apply`, `ant compileAll` ("Processing /home/user/fortress/ProjectFortress/astgen/Fortress.ast", "Caches /home/user/fortress/default_repository/caches started again, empty", "BUILD SUCCESSFUL", "Total time: 42 seconds"):

      ant testOnly -DtestPattern=WalkerJUTest
          [junit] Testsuite: com.sun.fortress.scala_src.nodes.WalkerJUTest
          [junit] Tests run: 4, Failures: 0, Errors: 0, Skipped: 0, Time elapsed: 0.326 sec
      BUILD SUCCESSFUL

  Then the library order (five compiles, each `rc=0`, five jars), the three tests renamed and re-keyed, and their run on `a0205c127`'s code, before row 680's line:

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh fail15b ProjectFortress/compiler_tests LocalFunctionSiblingInLoop.test LocalFunctionSiblingCall.test XXXLocalFunctionRecursiveUntypedReturn.test
      . typecheck ProjectFortress/compiler_tests/LocalFunctionSiblingInLoop ** bug! TryChecker returned an untyped expr: FnExpr at ProjectFortress/compiler_tests/LocalFunctionSiblingInLoop.fss:8.9
      F. typecheck ProjectFortress/compiler_tests/LocalFunctionSiblingCall ** bug! Result of typechecking still contains intermediate nodes.
      3) ProjectFortress/compiler_tests/XXXLocalFunctionRecursiveUntypedReturn(...) Saw wrong failure. compile
      Tests run: 3,  Failures: 3,  Errors: 0

  With the line, `ant compileAll` ("started again, empty", "BUILD SUCCESSFUL", "Total time: 25 seconds") and the library order again (five `rc=0`, five jars); the last run, after the last change (the recursive test's comment):

      ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh pass15b2 ProjectFortress/compiler_tests LocalFunctionSiblingInLoop.test LocalFunctionSiblingCall.test XXXLocalFunctionRecursiveUntypedReturn.test
      . typecheck ProjectFortress/compiler_tests/LocalFunctionSiblingInLoop  OK (time = 1440ms)
      . typecheck ProjectFortress/compiler_tests/LocalFunctionSiblingCall  OK (time = 128ms)
          Cannot infer type for function fact(n:ZZ32) because it has reference cycle: fact(n:ZZ32), fact(n:ZZ32)
       Saw expected failure
      OK (3 tests)

## The gate, against batch 15's

The full gate ran once, on the tree of `7377247d2` (both changes and their rows), as one background script from 2026-10-14 23:50:15 to 2026-10-15 00:09:43 UTC: the skill's `gate.md`, with the batch workflow's gate role for the atomic runs and the count and distance stages, the distance stage started after the build and run beside the suites. Machine: nproc 4, Intel Xeon @ 2.10 GHz, 2100.000 MHz, OpenJDK 25.0.4.1, `FORTRESS_THREADS=1`; load 0.48 at the start, no other java process; the summary's machine line, written after the suites, reads load 6.80.

| | batch 15 (`climb-batch-15/gate/`) | 15b (`climb-batch-15b/gate/`) |
|---|---|---|
| build | BUILD SUCCESSFUL, 49 s | BUILD SUCCESSFUL, 5 s ("caches kept": the tree was built and the library compiled before the gate) |
| `testFast`: compiler, library, othercompiler | 1,212, 86, 263, no failure | 1,212, 86, 263, no failure (`LocalFunctionSiblingInLoop` and `LocalFunctionSiblingCall` "OK", `XXXLocalFunctionRecursiveUntypedReturn` "Saw expected failure"; one case each, as before) |
| `testFast`: misc | 45 classes, 423 tests, no failure | 46 classes, 427 tests: the same 45 rows and `WalkerJUTest` 4, no failure |
| `testFast`'s time | 11 min 43 s | 5 min 41 s |
| `testSystem` | 621 (149, 161, 150, 161), no failure; 3 min 53 s | 621 (149, 161, 150, 161), no failure; 2 min 42 s |
| `testSpecData` | 130, no failure; 57 s | 130, no failure; 43 s |
| `gate_compare` | | no line |
| atomic runs, four threads | 42 PASS | 42 PASS, the same lines |
| ladder regression | no line | no line; `ladder.tsv` and `microgpt-phase.md` differ from batch 15's only in their seconds columns |
| checker count | 1, `#locations 0`, `#crash none`: Array3's crash | 39, `#locations 38`, `#crash none`, every api 0: the component's own errors, the rise from 1 that this landing declares (`checker_compare`: "COUNT UP 1 -> 39, declared 15b: 39") |
| the count stage's time | about 569 s to the crash (`explorations/reviews/batch-15-review.md:30`) | 325 s, the whole `run.sh` with its javac, 00:04:17 to 00:09:42, started at load 4.76 with the distance stage's last 243 s beside it |
| distance | 49, Array3's crash row (`FortressLibrary.fss:3023:1-3136:2`) | 49: "DISTANCE SAME 49", "crash gone" for Array3's row, "crash new none"; every kind, class and unit row equal |
| the distance stage's time | 2,087 s, `FortressLibrary` 1,168 s | 1,075 s, `FortressLibrary` 628 s, beside the suites, the atomic runs, the ladder and the count's start |

By site: the stage's `errors.tsv` equals the landed `explorations/compile-ladder/gate/distance-sites.tsv` byte for byte, 49 sites: none gone and none come. The count's table equals the skeptic's idle run with both changes (`SKEPTIC.md` section 4) byte for byte, and its whole checker output, 178 lines, equals that run's once the tree's path is masked.

Against the probe's expectations:
- The count: the table as expected (`#total 39`, `#locations 38`, `#crash none`, every api 0); its time 325 s against about 352 s (F1, idle), lower, with the distance stage beside it for its first 243 s.
- The distance: 49 errors and the crash row gone with no site come, as expected; its time 1,075 s against about 931 s (D2, idle), and `FortressLibrary` 628 s against 462 s. This gate's run is not idle: it ran beside the suites, from load 0.68 at its start (the table's `#machine` row) to 6.80 after them. The two times are not a pair.
- The suites: every count as batch 15's gate, plus `WalkerJUTest`'s 4 in the misc track; the three tests changed verdict as named above and kept their count.

## Ledger rows written

- **Row 730** (new, section 15, "Performance and program shape"): `FIXED`, `implementation gap (checker)`, spec `silent`, reproducer `ProjectFortress/src/com/sun/fortress/scala_src/nodes/WalkerJUTest.java`, found by `checker speed probe 2`, notes `fixed a0205c127`, the test and its failing line, the stages' idle times, the audit and the methods still over the limit.
- **Row 680**: closed by `e4dabaa0c`, its claim the corrected one of `climb-batch-15/RECORD.md:155`, reproducer `ProjectFortress/compiler_tests/LocalFunctionSiblingInLoop.test`; its earlier line in `explorations/fortress-gap-ledger-history.md`.
- **Row 488**: the note was refused. `ledger.py note` gave "notes-length: 1323 characters; at most 700" and "row-length: 1713 characters; at most 1200": the row's notes already hold 686 of their 700 characters, so no pointer fits. The note, for whoever rewrites the row: "checker speed probe 2: the output depends on the JVM's identity-hash sequence, since every AST node's hash starts from its class's identity hash (`ProjectFortress/src/com/sun/fortress/nodes/TraitType.java:104`, 936 node classes), so the order of every HashMap and HashSet of nodes moves, the apis `StaticChecker.checkApis` iterates (`StaticChecker.java:125`) among them; with one identity hash asked first (H1) the api order changed wholly and three messages printed a union's members the other way (`:1463`, `:3367`, `:3384`), with 1000 (H2) one, the table 39 / 38 in each (`explorations/perf-probes/checker-speed-2/REPORT.md` section 9)".

`python3 explorations/coordinator/tools/ledger.py check --base HEAD --summary` after row 680's close: "729 rows, 10 fail the template; rows (or places) failing each rule: spec-path 8, reproducer-path 2, spec-section 1", the ten of the base.

## Decisions taken here

- **Row 680's line alone.** The edit is the one line the brief and the probe give, with the comment above it, "Prime functionals to infer return types.", left as it stands. Not taken: the reverse of `e75bb538b`'s hunk, which would also bring back rung C's two-line comment ("each body read with the group in scope: the functions of one block are mutually recursive"); the probe and the skeptic measured the one line, and the reason is in the commit message.
- **The recursive test's comment.** Re-keyed to `reference cycle`, the test's comment line ("stops the compiled checker, where a top-level function in a reference cycle gets the checker's refusal", the skeptic's `30af07104`) would have named the crash the key no longer pins. It now reads "A recursive local function that leaves its return type out gets the compiled checker's reference-cycle refusal, as a top-level function in a reference cycle does.", with no citation, as the skeptic left it. Not taken: the comment as it was.
- **Row 730 added closed.** `ledger.py close` takes only a test under the test folders, and the row's test is a JUnit class under `ProjectFortress/src/`. So the row went in by one `ledger.py add` as `FIXED`, its notes beginning `fixed a0205c127`, in the form of row 409, whose reproducer is `RTTIsizeJUTest.java`. Its full text is the row; it has no history entry. Not taken: an open row with no close.
- **Row 730's class and section.** The template's areas name no generator. The walker is generated code that the phases of both paths run, and the time the probe measured is the checker's (its section 2), so the class is `implementation gap (checker)`, in section 15 beside row 370, the checker's earlier speed row.
- **The rows beside their commits.** Each change's ledger commit follows its code commit, before the gate, since `close` needs the fix in `HEAD` and the brief orders each change with its rows.
- **The declared count** passed to `checker_compare` is "15b: 39", the brief's expected rise; there is no crash line to declare.
- **No microGPT walk check.** The skill's `gate.md` adds `# microgpt-walk` lines only when the brief asks, and this brief names none. Not taken: 13b's two quick walk runs, which its commit stage ran.

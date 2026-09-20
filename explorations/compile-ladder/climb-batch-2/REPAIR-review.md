# Repair after the merged-diff review's judge, climb batch 2

Tree: `/home/user/fortress` on `main`, at the judge's commit `fd6ad55c6`. The ruling is
`explorations/compile-ladder/climb-batch-2/JUDGE-review.md`; its four items are executed
here in its order. No `.java` and no `.scala` changed, so no `ant compileAll`; the bytecode
cache was warm from the gate (`default_repository/caches/bytecode_cache/CompilerSystem.jar`
present, 20 jars in that directory), so the five-command library rebuild was not needed and was not run. The
gate was not run: the workflow re-runs it after this stage
(`explorations/coordinator/climb-batch-workflow.js:1138-1142`). Nothing was pushed. The
`wip/` worktrees were neither read nor written.

Every capture is under `explorations/compile-ladder/climb-batch-2/repair/` and named `.txt`.

## 1. The stale citation (judge step 1)

`ProjectFortress/library_tests/TryAtomicRungB.fss:55` cited
`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:745` for
`excludes UncheckedException`. Confirmed before editing:
`sed -n '753p' ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` prints
`trait CheckedException extends Exception excludes UncheckedException`, `:745` prints
`object NegativeLength extends UncheckedException end`, and
`git show 8590d7a9e:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi | sed -n '745p'`
prints the `CheckedException` line — so the citation was exact in rung B's worktree and is
off by the eight lines rung W's four `.fsi` hunks (`d98024425`) added above it. One token:
`745` → `753`.

Recorded pass: `repair/junit-tryatomic-rungb.txt` —
`. link library_tests/TryAtomicRungB  OK`, `. run library_tests/TryAtomicRungB (286ms) PASS`,
`Passed`, `OK (2 tests)`, which is the state `rung-tryatomic/raw/junit-after.txt` records on
the same name.

## 2. Row 353's gated home: the two new files (judge steps 2-3)

`ProjectFortress/compiler_tests/XXXTryAtomicCodegenRungB.fss` and
`XXXTryAtomicCodegenRungB.test`. The `.fss` asserts what the specification says, so that on
the day `forTryAtomicExpr` exists and the prefix comes off it is a passing test:
`x: ZZ32 = tryatomic do 1 + 1 end` then
`assert(x, 2, "a tryatomic expression yields the value of its body, ledger row 353, Specification/basic/expressions/atomic.tex:45-48")`.
The three-argument `assert(x: ZZ32, y: ZZ32, failMsg: String): ()` is
`Library/CompilerLibrary.fsi:46`. One comment line, pointing at
`explorations/compile-ladder/rung-tryatomic/REPORT.md`, and no other.

The specification, read either side of each cited line:
`Specification/basic/expressions/atomic.tex:45-48` — "A `tryatomic` expression consists of
`tryatomic` followed by an expression. It acts exactly like `atomic` except that in certain
circumstances (see `transactions`) it throws `TryAtomicFailure` and discards the effects of
its body" — with `:42-43` giving the value and type of an `atomic` expression as the value
and type of its body, and
`Specification/advanced/parallelism-locality/transactions.tex:34-38` — "attempts to run its
body expression atomically. If it succeeds, the result is returned". So `2`.

The `.test` drives `compile` with `tests=XXXTryAtomicCodegenRungB` and
`compile_exception_contains=Can't compile TryAtomicExpr`. The harness path was verified in
the source before the file was written, not inferred from the ruling:

- `sayWhat` returns a `CompilerError` (`CodeGen.java:1551-1553`), which extends
  `RuntimeException` (`ProjectFortress/src/com/sun/fortress/exceptions/CompilerError.java:16`).
- `Shell.compileWithErrorHandling` catches `StaticError` (`Shell.java:904`) and `ProgramError`
  (`:906`) and nothing else (`:892-917` read whole), and `Shell.subMain` declares
  `throws Throwable` (`Shell.java:395-396`), so the exception propagates.
- In the harness it propagates out of `CommandTest.justTheTest`, which is
  `Shell.subMain(new String[]{command, …})` (`FileTests.java:689-692`), to the
  `catch (Throwable ex)` at `FileTests.java:341`.
- That branch keys on `f.contains("XXX")` (`:346`), where `f = join(_dir, _name)` (`:82`) and
  `_name` is the `.test` file's `tests=` token (`:1052-1059`, reached from `:957-974`) — not
  the `.test` file name of `:932`. Hence the `XXX` prefix on the component name. Here it is
  on both names, so the file is also an ordinary expected-failure test to `:932`.
- The check stream on that path is the harness's third one, `"exception"` (`:136`), contents
  `ex.toString()` (`:344-345`), and `CommandTest.testFailed` prefixes the key with the
  command (`:702-704`), so `compile_exception_contains` is the right key. `grep -l 'exception_'`
  over `ProjectFortress/compiler_tests/*.test` and `ProjectFortress/library_tests/*.test`
  matches this file and no other: the first use of the stream in either corpus.
- The pin matches because `CompilerError(HasAt loc, String message)` puts the message after
  the location (`CompilerError.java:37-40`), so `ex.toString()` contains
  `Can't compile TryAtomicExpr`.

`CompilerJUTest.java:36` scans the whole `compiler_tests` directory, so the gate picks the
new `.test` up without a manifest entry.

### The three runs

- `repair/junit-xxx-tryatomic-expected.txt`: the pinned run.
  `. compile compiler_tests/XXXTryAtomicCodegenRungB com.sun.fortress.exceptions.CompilerError:`
  then ` OK Saw expected exception` (`FileTests.java:360`) and `OK (1 test)`. The pin was
  satisfied on the first run, so the fallback of judge step 4 — drop the pin, capture to
  `-unpinned`, record what `ex.toString()` held — did not apply and no such capture exists.
- `repair/junit-xxx-tryatomic-goes-red.txt`: `atomic` substituted for `tryatomic` on line 18,
  which compiles clean, so there is no exception, the pin is run against `""` (`:382`) and the
  file fails at `:396-398`: ` Saw failure, but did not satisfy compile_exception_contains; expected`
  / `Can't compile TryAtomicExpr`, `AssertionFailedError: Saw wrong failure. compile` raised at
  `FileTests.java:398`, `FAILURES!!!` and `Tests run: 1,  Failures: 1,  Errors: 0`. This is the
  pinned branch, which goes red both when the wall falls and when it moves; the unpinned form
  would have reached only `:400-402`. Note for later readers: the capture's trailing `EXIT=0`
  is `fortress junit`'s own exit code, which `Shell.junit` (`Shell.java:1086`) leaves at 0
  whatever the suite says; the verdict is the `FAILURES!!!` line, not the exit code.
- `repair/junit-xxx-tryatomic-green-again.txt`: line 18 reverted to `tryatomic`, the same
  command, ` OK Saw expected exception` and `OK (1 test)`. The committed file reads
  `x: ZZ32 = tryatomic do 1 + 1 end`.

## 3. `abortTest`'s phase (judge steps 6-7)

Re-measured here: `repair/abortTest-compile.txt` is
`../bin/fortress compile tests/abortTest.fss` from `ProjectFortress/`, giving
`Variable abort is not defined.` at `tests/abortTest.fss:23:17-20`,
`Variable printThreadInfo is not defined.` at `:26:33-46`, `File abortTest.fss has 2 errors.`
and `EXIT=255` — the same two lines and the same refusal as
`rung-tryatomic/raw/tests/abortTest.fss.compile` in rung B's worktree.

That message is `error("Variable " + name + " is not defined.", name)` at
`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:450`
(read `:438-455`: the `(0,0,0)` branch, guarded by `fields.isEmpty` and the two top-level
tables), which `ProjectFortress/src/com/sun/fortress/compiler/Disambiguator.java:362`
constructs and runs — "Finally, disambiguate the expressions" at `:361`. The ladder's own
classifier agrees: `explorations/compile-ladder/classify.py:82-86` returns `disambiguate` for
`^(Variable|Function|Operator|Type|Label|Field|Method) .+ is not defined\.$`, and the
`typecheck` branch below it (`:87-95`) matches none of these two lines. Before the rung the
same file was at disambiguate on the *type* disambiguator's refusal of the name
`TryAtomicFailure` (`explorations/compile-ladder/baseline-2026-09-19/ladder.tsv:193`:
`tests  abortTest.fss   disambiguate  2  TryAtomicFailure … TryAtomicFailure is undefined.`).
So the file moved from one disambiguator's refusal to the other's inside one phase; the
manifest's declared "typecheck or better" (`explorations/coordinator/CLIMB-BATCH-2.md:71`;
`climb-batch-workflow.js:147`) was not met, and the gate is right to be green because a
declared file is reported, not red.

Corrected in the six places the judge named, and nowhere else:
`explorations/compile-ladder/rung-tryatomic/REPORT.md:29-42` (the paragraph, which now also
says the floor was met for the two codegen files and not for this one) and the table row now
at `:194`; `explorations/compile-ladder/rung-tryatomic/record.md:28-37` and the handover
state line now at `:115-121`; `explorations/coordinator/FACTS.md:131`;
`explorations/microgpt-run-c-handover.md:70`, which now reads "two ladder files are off
disambiguate". `CLIMB-BATCH-2.md` and the workflow manifest were not edited, as instructed;
the commit message of `4ed46558d` is history and was not rewritten.

## 4. The ledger and the records (judge steps 8-11)

- Ledger row 353 (`explorations/fortress-gap-ledger.md:364`): the judge's sentences appended
  inside the last column, naming the two new files, the pin, the red capture and the harness
  path. Row 352 (`:363`): the judge's sentence on why home 3 is right for a missing static
  error, citing `FileTests.java:384` and `:1029` ("Test passes, if and only if it fails") and
  the author's first kind at `:855`. Both rows were appended to; no row was renumbered or
  moved. `compiler_tests/XXX0a.test` and the 222 files carrying `compile_err_equals` were
  both checked before the row cited them.
- `rung-tryatomic/REPORT.md`: a new "Home 2, the `tryatomic` codegen wall (row 353), added by
  the repair of 2026-09-20" paragraph after the "Home 3, the typecase site" paragraph,
  carrying the harness path, the pin and its stream, the three captures by path, and that
  this is the first use of `compile_exception_contains` in either corpus.
- `rung-tryatomic/record.md`, under "Gap ledger": one sentence that 353 is gated as above and
  that 352 keeps home 3.
- `explorations/coordinator/FACTS.md`: a new bullet at `:133`, after the bullet on what the
  `XXX` mechanism can express, recording the third harness path; and the sentence appended to
  `:131` that row 353 is now gated.

## Deviations from the judge's numbered steps, and what forced each

1. **The copyright header of the two new files.** Judge step 2 says the ten-line header
   copied from `library_tests/TryAtomicRungB.fss:1-10`, which reads
   `Copyright 2011, Oracle and/or its affiliates.`, and step 3 the nine lines of
   `TryAtomicRungB.test:1-9`, likewise. The files carry
   `Copyright 2026, the Fortress revival.` instead, in the `.fss` and in the `.test`. The two
   headers differ in exactly one line each (`diff` of the two ranges). What forced it: the
   directory the judge chose has one convention and it is the other one. Of the files this
   batch added under `git diff --name-only 8590d7a9e..HEAD`, all eight `.fss` and `.fsi`
   files in `compiler_tests/` carry the revival line — `compiler_tests/XXXBoxDotSpellingsRungW.fss:2`,
   `ExportVarRungX.fss:2`, `ExportVarRungXApi.fsi:2`, `ExportVarRungXApi.fss:2`,
   `ExportVarRungXLib.fss:2`, `ExportVarRungXLibApi.fsi:2`,
   `XXXExportVarRungXFrozen.fss:2`, `XXXExportVarRungXLinked.fss:2` — and all three in
   `library_tests/` carry the Oracle line. A copyright notice is a claim about who wrote a
   file and when; this file was written in 2026 by the revival and no line of it comes from
   Oracle's tree, so the Oracle notice would be false where the revival notice is true, and
   the directory's own practice is already the true one.
2. **`TMPDIR` and `JAVA_FLAGS`.** The judge's setup line says to set them as the shared
   prefix says. The role paragraph of this task says instead to source `experiment/env.sh`
   and not to export `TMPDIR` or `JAVA_FLAGS` beyond what it sets, the prefix's values having
   been written for the rung worktrees; that is the narrower and later instruction and it was
   followed. `env.sh` sets `JAVA_FLAGS=-Xmx4g -Xss64m` and leaves `TMPDIR` unset, and
   `echo $FORTRESS_HOME` prints `/home/user/fortress`. No run needed more.
3. **`run():()` rather than `run(): ()`** in the new `.fss`, matching
   `library_tests/TryAtomicRungB.fss:47` and the rest of both corpora. Cosmetic; noted so the
   difference from the ruling's text is not read as an accident.

Nothing else in the twelve steps was departed from, and no step was skipped.

## The tracked-path check

The prefix's loop over `REPAIR-review.md`, `rung-tryatomic/REPORT.md` and
`rung-tryatomic/record.md` prints nothing: every `explorations/compile-ladder/…` path they
cite exists and is staged, the five `repair/*.txt` captures among them. Run over the three
other records this repair edited as well, the loop prints two `MISSING` lines, both
pre-existing and neither introduced here:
`explorations/compile-ladder/rung-maybe/probes/typecase-body/` and
`rung-maybe/probes/void-static-arg/`, cited by two rows of the gap ledger that say in the
same cell "(to be committed from this probe's scratch)". They are present in the judge's own
tree (`fd6ad55c6:explorations/fortress-gap-ledger.md`), are an acknowledged debt of the
`rung-maybe` campaign, and are out of this repair's scope.

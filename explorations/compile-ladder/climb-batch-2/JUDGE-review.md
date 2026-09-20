# Judge, climb batch 2: the merged-diff review's two blocking items

Tree ruled on: `main` at `162beaecc` (the review's fold), whose source hunks are those of
`4ed46558d` (rung B), `d98024425` (rung W) and `4e4b80253` (rung X), all off `8590d7a9e`.
The gate that ran beside the review is green on that source (`gate/summary.txt`: `testFast`
and `testSystem` both `BUILD SUCCESSFUL`, every atomic run `PASS`, `gate/ladder/comparison.txt`
empty). Nothing here is a build or a test run: I read, I ruled, and the numbered steps at the
end are what the repair worker executes.

**Decision: repair.** Four items. Two are the review's blocking items, both upheld; one is
the neighbouring case the review asked to be ruled on; one is a false claim in the landed
record that the review accepted and that the gate's own ladder table contradicts.

## 1. The stale citation in a landed source file (blocking item 1) — upheld, repair now

**Facts.** `ProjectFortress/library_tests/TryAtomicRungB.fss:55` reads
`"excludes UncheckedException, ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:745"`. In
the landed tree `CompilerBuiltin.fsi:745` is `object NegativeLength extends UncheckedException end`
and `:753` is `trait CheckedException extends Exception excludes UncheckedException`. At the
base, `8590d7a9e:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:745` is that
`CheckedException` line. Rung W's four hunks in that file (`d98024425`, `@@ -203,6 +203,8`,
`-264 +266`, `-321 +325`, `-377 +383`) add eight lines above it. So the citation was exact in
rung B's worktree and is off by eight in the tree that landed. The review's diagnosis is
right in every particular.

**Site count (rule 2).** The batch's nine test files carry fourteen `file:line` citations
(`grep -o` over the `.fss` files `git diff --name-only 8590d7a9e...HEAD` lists under
`compiler_tests/` and `library_tests/`). Thirteen are into `Specification/*.tex` or
`Library/FortressLibrary.fss:1570`, files no rung of this batch touched, and each reads what
its assert says (`atomic.tex:45-48`, `transactions.tex:38`, `try.tex:56-60`,
`FortressLibrary.fss:1570` opened). Exactly one is into a file another rung edited: this one.
There is no second instance.

**Ruling.** Repair now, not "with the next source-touching change". The batch's home-1 rule
makes the assert message the one carrier of a gated test's citation ("the assert message
string carries the citation … and nothing else does"); a wrong number in the one place the
rule made load-bearing is a defect in that place, and an annotation in
`rung-tryatomic/REPORT.md:9-18` cures it only for a reader who opens the report, which the
batch's own prefix says readers of the last climb did not do. The cost the review weighed —
a re-run of the gate — is paid regardless, because item 2 adds a source file; and the
workflow re-runs the gate after any repair in any case
(`explorations/coordinator/climb-batch-workflow.js:1138-1142`, `gateIsStale = true` after
`repair:review`). One token: `745` → `753`.

## 2. Ledger row 353 takes home 3 where home 2 is owed (blocking item 2) — upheld

**What the row says and what settles it.** Row 353 (`explorations/fortress-gap-ledger.md:364`):
the compiled path cannot compile a `tryatomic` expression; `CodeGen.java` has no
`forTryAtomicExpr` (grep of the landed file: zero hits for `TryAtomic`), so the node falls to
`CodeGen.defaultCase` (`CodeGen.java:1669-1670`, `throw sayWhat(x)`). The specification is
not silent: `Specification/basic/expressions/atomic.tex:45-48` — "A `tryatomic` expression
consists of `tryatomic` followed by an expression. It acts exactly like `atomic` except that
in certain circumstances (see `transactions`) it throws `TryAtomicFailure` and discards the
effects of its body" — with `:42-43` giving the value and type as those of the body; and
`advanced/parallelism-locality/transactions.tex:34-38` names the checked exception and the
conditions. The skeptic's two probes measure it both ways
(`rung-tryatomic/probes/skeptic/skeptryatomicval.txt`: compile exit 1 with
`Can't compile TryAtomicExpr`, walk prints `tryatomic value: 2` at one and four threads). So
this is rule 4's first outcome, settled against the compiled run, and the repair is out of
scope — `CLIMB-BATCH-2.md:71` and `:85` scope `tryatomic` codegen out of the batch, and
`CodeGen.java` was rung X's file (`:77`). That is the fourth legitimate case, and the row is
right to exist.

**Why home 2 is owed.** The three-homes rule of the prefix: a deferred defect the
specification settles "gets a gated EXPECTED-FAILURE test". It is expressible here, and the
batch's own record says so in other words: rung B's FACTS line (`FACTS.md`, "The `XXX`
expected-failure mechanism … can express a compile-stage failure only") — this failure is a
compile-stage failure. Of the 224 pre-batch `XXX*.test` in `compiler_tests/`, 223 drive
`compile` (rung B's count, `record.md:36-38`, which the review re-counted). Nothing in the
batch records a reason for home 3: the skeptic's three-homes section (`SKEPTIC.md:183-211`)
places only the two clause-binding sites; its treatment of the wall (`:289-293`) is a
failure-mode observation, not a placement; the gather folded the row without one. Rows 343
and 347 are the contrast — spec-settled, deferred, home 3, and each says why in its own
notes (the ban on `ant testSystem`, `ledger.md:354`, `:358`). Row 353 has no such sentence
and can have the test instead.

**The point the repair must get right, which no file in the tree exercises.** Every one of
the batch's XXX files and all 224 pre-batch ones reach the harness's expected-failure logic
through a *printed* failure with a non-zero exit — `Shell.compileWithErrorHandling` catches
`StaticError` and `ProgramError` (`ProjectFortress/src/com/sun/fortress/Shell.java:904-915`)
and reports them — so they take `FileTests.java:384-404`, where `shouldFail` comes from the
`.test` file name (`:932`). A `CompilerError` from `sayWhat` is caught by neither clause: the
captures show it uncaught out of `Shell.main`
(`skeptryatomicval.txt`, `raw/tests/tryatomicTest.fss.compile`). In the harness, which runs
the same `Shell.subMain` in-process (`FileTests.java:690-691`), that is the
`catch (Throwable ex)` at `:341`, whose branch keys on **`f.contains("XXX")`** (`:346`), and
`f = join(_dir, _name)` (`:82`) where `_name` is the `.test` file's `tests=` value
(`:1052-1059`). So for this file the `tests=` name, hence the `.fss` file name, must carry the
`XXX` prefix, not only the `.test` name — `XXX0a.test` with `tests=Compiled0.a` shows the two
can differ, and there they do not need to agree because the failure is printed. On that path
the check kinds read the exception's `toString()` (`:344-345`, `exFirstLine`) through the
harness's third stream, `"exception"` (`:136`, `generalTestFailed(pfx, props, "exception", exc)`),
so the pin is `compile_exception_contains=Can't compile TryAtomicExpr`, a key no `.test` file
in either corpus uses today (grep for `exception_` over `compiler_tests/*.test` and
`library_tests/*.test`: nothing). With the pin the file is green today (`:347-361`,
"OK Saw expected exception"), red the day the compile succeeds (`:382` runs the check against
`""`, so `:395-398`, "Saw wrong failure"), and red the day the wall moves to a different
exception (`:347-348`, "Did not satisfy"). Without the pin it is red only on a clean compile
(`:400-402`). The pin is the sharper gate and it is what the corpus does everywhere else
(`compile_err_equals` in 222 files, `link_err_contains` in rung X's
`XXXExportVarRungXLinked.test`, `run_out_contains` in rung W's and rung B's). Because this
path (`:341-362`) has never been exercised by an XXX file in this tree and the harness's
author warns that `expect_failure` "is not treated consistently" (`:853`), the demonstration
of red on a deliberate local fix is not optional here; the cheap fix is `atomic` for
`tryatomic`, which the seven `atomic*` files of the gate compile clean.

**Shape.** One `XXX` file driving `compile`, the corpus's commonest shape — not rung B's
two-file shape, which is for a program that compiles and crashes (`record.md:38-42`). It
asserts what the specification says (`x = 2`), so that on the day the prefix is removed and
`compile` becomes `link` + `run` it is a passing test. Location `compiler_tests/`, where the
224 live and where the `CompilerJUTest` suite of `testFast` picks it up (the gate's
`gather-assembled-gate.txt` ran rung W's `XXXBoxDotSpellingsRungW.test` there, 1
expected-failure, `OK`).

## 3. Row 352, the throws-clause static check — home 3 is right, and the row must say why

The review asked for a ruling. Row 352 (`ledger.md:363`) is spec-settled
(`Specification/basic/exceptions.tex:84-87`: "The body of a functional is statically checked
to ensure that no checked exceptions are thrown by any subexpression of the functional body
other than those listed in the `throws` clause"), deferred, and the defect is a *missing*
static error: the conforming outcome is a rejected program. The harness has one flag,
`shouldFail`, meaning the command must fail (`FileTests.java:384`, `:1029` "Test passes, if
and only if it fails"). A test asserting the specification — compile must fail — is red today
because the compile succeeds (`SkepThrowsClause`, `skepthrowsclause.txt`, rc=0); the only test
green today, a plain-named `compile`, asserts the defect. The corpus's own static-error tests
(`XXX0a.test` and the 222 with `compile_err_equals`) are the harness author's first kind at
`:855`, "the test fails, and that is a good thing", not known-failing tests; there is no
double-inversion flag. Home 2 is structurally inexpressible for a missing static error, home
3 is right, and the reason goes into the row's notes in one sentence, as rows 343 and 347 do.

## 4. `abortTest` did not reach typecheck — a false record claim the review accepted

**Facts.** The landed record says `tests/abortTest.fss` "reaches typecheck and stops on
`abort` and `printThreadInfo`" — `rung-tryatomic/REPORT.md:30` and `:184`, `record.md:28`
and `:101`, `FACTS.md:131`, `explorations/microgpt-run-c-handover.md:70` ("three ladder files
are off disambiguate … `abortTest` at typecheck"), and the commit message of `4ed46558d`. The
compile output (`rung-tryatomic/raw/tests/abortTest.fss.compile`) is
`Variable abort is not defined.` and `Variable printThreadInfo is not defined.`, exit 255.
That message is produced by
`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:450`,
which `compiler/Disambiguator.java:362` runs — the **disambiguate** phase. The ladder's own
classifier says the same: `explorations/compile-ladder/classify.py:82-86` classes
`^(Variable|Function|…) .+ is not defined\.$` as `disambiguate`, and the gate's table has the
row `tests abortTest.fss disambiguate 1 abort … Variable abort is not defined.`
(`gate/ladder/declared-moves.tsv`, the gate's untracked-until-commit output). Before the
rung the same file was at disambiguate on the *type* disambiguator's refusal of the name
`TryAtomicFailure` (`baseline-2026-09-19/ladder.tsv:193`, "TryAtomicFailure is undefined.").
So the file moved from one disambiguator's refusal to the other's, inside one phase. It did
not move up.

**Consequences.** The manifest declared `tests/abortTest.fss: typecheck or better`
(`climb-batch-workflow.js:147`; `CLIMB-BATCH-2.md:71`, "so typecheck") and that move did not
happen; the prediction took an undefined function name for a typecheck refusal. The gate is
right to be green — a declared file is "reported, not red" (`gateRole`, workflow `:903`) and
`abortTest` moved neither down nor up — and its table is right. The record is wrong in six
places, the skeptic checked "the three ladder files' new stopping phases" for two of the
three (`SKEPTIC.md:163-165`, differentials 6 and 7 are `tryatomicTest`'s and
`nestedTransactions3`'s wall), and the review's "every one of the eleven FACTS bullets is true
as written" is false for this clause of `FACTS.md:131`. None of this changes the batch's
verdict — the edit is right, the two codegen moves are real — but a FACTS line is a FACTS
line, and the correction is a record edit the repair makes alongside the rest, with a fresh
compile of the file in the main tree as its primary source.

## Who was right and who was wrong, by citation

- **Rung B's worker.** Right: the edit (`CompilerLibrary.fsi:105`, `.fss:253-255`), the
  mechanism of the two-file XXX shape (`record.md:31-42`, every `FileTests.java` number
  opened), the two codegen moves (`REPORT.md:182-183`). Right in its own tree on
  `TryAtomicRungB.fss:55`. Wrong on `abortTest`'s phase (`REPORT.md:30`, `:184`, "typecheck";
  the classifier it could have run says disambiguate) and on "That is the floor the batch
  record set" (`:31-32`) — the floor was not met for that file.
- **Rung B's skeptic.** Right: the wall (`SkepTryAtomicVal`, `SkepTryAtomicState`, at both
  thread counts), the shadowing cost (correction 5), the throws-clause gap (`SkepThrowsClause`),
  the mechanism check of home 2 (`XXXSkepMechCheck`). Incomplete: the three-homes section
  (`SKEPTIC.md:183-211`) placed the two sites the worker found and did not place the defect
  the skeptic itself found; `:163-165` claims all three phases were reproduced and two were.
- **The gather.** Right to open rows 352 and 353 from the skeptic's probes; folded 353 with
  no home and no reason, and re-anchored rung B's citations for rung X's `CodeGen.java`
  shift but not for rung W's `CompilerBuiltin.fsi` shift.
- **The review.** Right on both blocking items and on the structural point about row 352;
  right that the fix for item 1 is one token. Wrong that the eleven FACTS bullets are all
  true as written (`:131`, the `abortTest` clause).
- **The batch record** (`CLIMB-BATCH-2.md:71`). Right that `CodeGen.java` has no visitor for
  `TryAtomicExpr` (a grep of 2026-09-19 that the skeptic's probes confirm). Wrong that
  `abortTest` would reach typecheck.

## Decisions taken here, and the alternatives

None of these is under a silent specification; rows 352 and 353 are both settled by the
prose chapters cited above.

1. **Fold the one-token source fix now** rather than accept the batch and fold it later
   (the review's offered alternative). Cost: none beyond a gate re-run that item 2 forces
   anyway. The alternative leaves a known-wrong number in the one place the batch's own rule
   made load-bearing.
2. **Pin the exception message** (`compile_exception_contains`) rather than an unpinned
   `XXX` + `compile`. The unpinned form is precedented by rung W's and rung B's `link` files
   and simpler; the pinned form is what the corpus does in 222 files for printed errors, goes
   red when the wall moves and not only when it falls, and uses a stream the harness has
   always had (`FileTests.java:136`) and nobody has used. If the pin is not satisfied on the
   first run, the worker drops it and records the deviation; the gate then rests on
   `:400-402` alone, which is still a real check.
3. **`compiler_tests/`** rather than `library_tests/` for the new file, with the 224 and with
   rung W's; rung B's other files stay where they are.
4. **Correct the `abortTest` claim in the record rather than leave it for the next batch**,
   because a FACTS line and a handover line are what the next coordinator boots from.

## For Pavol

- Two specification-settled defects land unrepaired as ledger rows, the fourth case of rule
  4: row 353 (`tryatomic` has no codegen; now gated as an expected failure) and row 352 (the
  `throws`-clause check is performed on neither path; no gated home can express a missing
  static error, and the row now says so).
- One declared ladder move did not happen: `tests/abortTest.fss` was declared "typecheck or
  better" and stayed at disambiguate (from the type disambiguator's refusal to the expression
  disambiguator's). The rung's report, its skeptic, the gather and the review all recorded it
  as typecheck; the gate's own table has it right. The record is corrected in this repair.
- The harness fact worth knowing for every later rung that gates a `sayWhat` wall: a thrown
  `CompilerError` takes a third path through `FileTests.java` (`:341-362`) keyed on the
  `tests=` name, not the `.test` name, and its check stream is `compile_exception_*`.

## Instructions for the repair worker

Work in `/home/user/fortress` on `main`. `source experiment/env.sh` once per shell and check
`echo $FORTRESS_HOME` prints `/home/user/fortress`; set `TMPDIR` and `JAVA_FLAGS` as the
prefix says. No `.java` or `.scala` changes, so no `ant compileAll`; the bytecode cache is
warm from the gate (`default_repository/caches/bytecode_cache/CompilerSystem.jar` is present)
— if `ls default_repository/caches/bytecode_cache/*.jar` is empty, rebuild it in library
order with the five `fortress compile` commands of the prefix, nothing else. Every capture
goes under `explorations/compile-ladder/climb-batch-2/repair/` and is named `.txt`. Do not
run `ant testFast` or `ant testSystem`: the workflow re-runs the gate after the second
review. Do not touch the `wip/` worktrees. Do not push.

1. `ProjectFortress/library_tests/TryAtomicRungB.fss:55`: change
   `CompilerBuiltin.fsi:745` to `CompilerBuiltin.fsi:753`. First confirm
   `sed -n '753p' ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi` prints
   `trait CheckedException extends Exception excludes UncheckedException`. Then, from
   `ProjectFortress/`, `../bin/fortress junit library_tests/TryAtomicRungB.test` captured to
   `repair/junit-tryatomic-rungb.txt`; it must end `OK (2 tests)` with `PASS` in the run
   output, as `rung-tryatomic/raw/junit-after.txt` does.
2. Write `ProjectFortress/compiler_tests/XXXTryAtomicCodegenRungB.fss`: the ten-line Oracle
   header copied from `library_tests/TryAtomicRungB.fss:1-10`; then
   `component XXXTryAtomicCodegenRungB`, `export Executable`, the single comment line
   `(*) See explorations/compile-ladder/rung-tryatomic/REPORT.md`, and
   `run(): () = do` / `x: ZZ32 = tryatomic do 1 + 1 end` /
   `assert(x, 2, "a tryatomic expression yields the value of its body, ledger row 353, Specification/basic/expressions/atomic.tex:45-48")`
   / `println("PASS")` / `end` / `end`. The three-argument `assert(x: ZZ32, y: ZZ32, failMsg: String)`
   is `Library/CompilerLibrary.fsi:46`. No other comment.
3. Write `ProjectFortress/compiler_tests/XXXTryAtomicCodegenRungB.test`: the nine header
   lines copied from `library_tests/TryAtomicRungB.test:1-9`, then exactly
   `tests=XXXTryAtomicCodegenRungB`, `compile`,
   `compile_exception_contains=Can't compile TryAtomicExpr`. The `tests=` value must start
   with `XXX`: `FileTests.java:346` keys the thrown-exception path on `f.contains("XXX")`
   with `f = join(_dir, _name)` at `:82`.
4. From `ProjectFortress/`, `../bin/fortress junit compiler_tests/XXXTryAtomicCodegenRungB.test`
   captured to `repair/junit-xxx-tryatomic-expected.txt`. Expected: ` OK Saw expected exception`
   (`FileTests.java:360`) and `OK (1 test)`. If instead it prints
   ` Did not satisfy compile_exception_contains…` (`:348`), keep that capture, remove the
   `compile_exception_contains` line from the `.test`, re-run to the same file name with
   `-unpinned` appended, and record in `REPAIR-review.md` what `ex.toString()` contained and
   why the pin did not match, citing `:344-345`.
5. Show it red. Replace `tryatomic do 1 + 1 end` with `atomic do 1 + 1 end` in the `.fss`,
   re-run the same command captured to `repair/junit-xxx-tryatomic-goes-red.txt`; expected
   `FAILURES!!!  Tests run: 1,  Failures: 1` with ` Saw failure, but did not satisfy
   compile_exception_contains…` (`:396-398`, pinned) or ` Missing expected failure `
   (`:400-402`, unpinned). If `atomic` itself fails to compile there, use `x: ZZ32 = 1 + 1`
   instead and say so. Revert the `.fss` to `tryatomic` and re-run once more, captured to
   `repair/junit-xxx-tryatomic-green-again.txt`, to show the committed file is green.
6. Measure `abortTest` in this tree: from `ProjectFortress/`,
   `../bin/fortress compile tests/abortTest.fss` captured to `repair/abortTest-compile.txt`
   with its exit code appended as `EXIT=<n>`. Expected: the two `is not defined.` lines and a
   non-zero exit, as in `rung-tryatomic/raw/tests/abortTest.fss.compile`.
7. Correct the `abortTest` phase in six places, replacing the clause "reaches typecheck and
   stops on `abort` and `printThreadInfo`" (and the handover's "three ladder files are off
   disambiguate … `abortTest` at typecheck") with: stays at disambiguate, its refusal now
   `Variable abort is not defined.` and `Variable printThreadInfo is not defined.` from the
   expression disambiguator (`ProjectFortress/src/com/sun/fortress/scala_src/disambiguator/ExprDisambiguator.scala:450`,
   run by `compiler/Disambiguator.java:362`; classed disambiguate by
   `explorations/compile-ladder/classify.py:82-86`), where before the rung the type
   disambiguator refused the name `TryAtomicFailure` (`baseline-2026-09-19/ladder.tsv:193`);
   the declared move "typecheck or better" (`CLIMB-BATCH-2.md:71`) was not met and the file
   did not change phase. The six: `explorations/compile-ladder/rung-tryatomic/REPORT.md:30-32`
   (also drop "That is the floor the batch record set" or say the floor was not met for
   this file) and the table row at `:184`; `rung-tryatomic/record.md:28` and `:101`;
   `explorations/coordinator/FACTS.md:131`; `explorations/microgpt-run-c-handover.md:70`
   (which becomes "two ladder files are off disambiguate"). Cite
   `repair/abortTest-compile.txt` in `REPORT.md`. Do not edit `CLIMB-BATCH-2.md` or the
   workflow manifest.
8. Ledger row 353 (`explorations/fortress-gap-ledger.md:364`, one table line; append inside
   the last column, before the closing ` |`): "Gated as an expected failure by
   `ProjectFortress/compiler_tests/XXXTryAtomicCodegenRungB.fss` with
   `XXXTryAtomicCodegenRungB.test` (`compile`, `compile_exception_contains=Can't compile TryAtomicExpr`),
   shown to go red on a deliberate local fix
   (`explorations/compile-ladder/climb-batch-2/repair/junit-xxx-tryatomic-goes-red.txt`); a
   thrown `CompilerError` takes `FileTests.java:341-362`, keyed on the `tests=` name at
   `:346`, not the `:384-404` path of the printed errors. Home 2, ordered by the judge of
   2026-09-20 (`explorations/compile-ladder/climb-batch-2/JUDGE-review.md`)." Adjust the
   pin clause if step 4 dropped it.
9. Ledger row 352 (`:363`, same way): "No gated expected-failure home can express this row:
   the defect is a missing static error, the harness's one flag means the command must fail
   (`FileTests.java:384`, `:1029`), so a test asserting the specification is red today and a
   test green today asserts the defect; the corpus's static-error tests (`compiler_tests/XXX0a.test`,
   `compile_err_equals`) are the author's first kind at `:855`, "the test fails, and that is
   a good thing". Home 3 for that reason, not for ease (judge of 2026-09-20)."
10. `rung-tryatomic/REPORT.md`, after the "Home 3, the typecase site" paragraph (`:341-346`):
    a paragraph "Home 2, the `tryatomic` codegen wall (row 353), added by the repair of
    2026-09-20" — the file, the harness path (`FileTests.java:341-362`, `:346`, `:82`,
    `:1052-1059`), the pin and its stream (`:136`, `:344-345`), the three captures of steps
    4-5 by path, and that this was the first use of `compile_exception_contains` in either
    corpus. `rung-tryatomic/record.md`, under "Gap ledger": one sentence that 353 is gated
    as above. `explorations/coordinator/FACTS.md`: one new bullet after the bullet that
    begins "**The `XXX` expected-failure mechanism in `compiler_tests/` and `library_tests/`
    can express a compile-stage failure only**": a thrown `CompilerError` (a `sayWhat` wall,
    uncaught by `Shell.compileWithErrorHandling`, `Shell.java:904-915`) reaches
    `FileTests.java:341-362`, where the expected-failure branch keys on the `tests=` name
    (`:346`, `:82`) and the check stream is `compile_exception_*` (`:136`, `:344-345`); first
    used by `compiler_tests/XXXTryAtomicCodegenRungB.test`, 2026-09-20, with the two
    captures. Also append to `FACTS.md:131`, at its end: "Ledger row 353 is gated as an
    expected failure by `compiler_tests/XXXTryAtomicCodegenRungB` (repair of 2026-09-20)."
11. Write `explorations/compile-ladder/climb-batch-2/REPAIR-review.md`: what changed and
    why, in this order, every citation `file:line`, the captures by path, every deviation
    from these steps with the primary source that forced it. Then run the prefix's
    tracked-path loop over `REPAIR-review.md`, `rung-tryatomic/REPORT.md` and `record.md`
    (substitute the paths) after staging, and fix every `MISSING`/`UNTRACKED` line.
12. One commit on `main`, locally, not pushed: the two test files, the one-token edit, the
    six record files and `REPAIR-review.md`, with `repair/` captures. Title: "Repair after
    the review's judge: one citation, row 353's gated home, abortTest's phase". No
    `historical:` line — no file of the 2012 tree is touched (both `TryAtomicRungB.fss` and
    the new pair were added by this batch). No model identifier. End with exactly the two
    footer lines of the prefix. Retry once after a few seconds on an `index.lock` error.

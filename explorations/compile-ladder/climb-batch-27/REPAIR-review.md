# Climb batch 27: the repair after the merged-diff review

Written 2026-11-07 on `main` above `bd7efb95b`, after the judge's ruling (`explorations/compile-ladder/climb-batch-27/JUDGE-review.md`, `b9635f0a7`), which chose the review's way (b): fix row 921 in walk, so that the team demo `turnersParaffins0` reaches its end as the team wrote it. The repair carries out the ruling's six steps in order, in `/home/user/fortress`, each call set up as `.claude/skills/fortress-repo/references/build-and-caches.md` says. Machine: nproc 4, openjdk 25.0.4.1; nothing was timed.

## 1. The test and the fix

**The test.** `git mv ProjectFortress/tests/XXXAsIfOverloadedMethodWalk.fss ProjectFortress/tests/AsIfOverloadedMethodWalk.fss`, its component renamed; no `.test` file, as the old test had none. It keeps the `pick` assertion ('Named picks Named') and adds the demo's two cases, `(0 asif ZZ32) = (0 asif ZZ32)` is `true` and `(0 asif ZZ32) = (1 asif ZZ32)` is `false`, and the demo's form: pairs `(3 asif ZZ32, 1)` passed through a varargs parameter of tuples, `firstKeysEqual(xs: (ZZ32, ZZ32)...)`, whose keys the callee takes apart and compares with `=`, as `Library/Map.fss:157-165` does after `Library/Map.fsi:100` (`ProjectFortress/tests/AsIfOverloadedMethodWalk.fss:15-27`).

On the merged tree before the fix, `explorations/compile-ladder/rung-inference-walk/harness-one.sh /home/user/fortress/tmp/repair-review/h1 ProjectFortress/tests/AsIfOverloadedMethodWalk.fss`, at 2026-11-07T10:40:42Z, tree `bd7efb95b`:

    . interpret tmp/repair-review/h1/tests/AsIfOverloadedMethodWalk
    Unexpected method value {
    	pick(x:Named):FortressLibrary.Stringtmp/repair-review/h1/tests/AsIfOverloadedMethodWalk.fss:7:5-48
    	pick(x:Leaf):FortressLibrary.Stringtmp/repair-review/h1/tests/AsIfOverloadedMethodWalk.fss:8:5-46}:OverloadedFunction when invoking method pick given receiver (Leaf asif Named)
    Tests run: 1,  Failures: 1,  Errors: 0

**The fix.** `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/DottedMethodApplication.java:96-97` and `:119-138`. In the `FAsIf` branch, when the name found in the assumed trait's members (or a trait it extends) is an `OverloadedFunction` that is not a `Method`, `asMethodOverloads` gathers its overloads into an `OverloadedMethod` (`OverloadedMethod.java:37`) in the environment `selfEnv` where they were found, blessed, so that the check at `:105-114` passes and `:116` builds the application. `OverloadedMethod.applyMethod` (`OverloadedMethod.java:54-65`) then chooses among that trait's overloads by the arguments, an assumed argument at its assumed type. If an overload is not a `MethodClosure` (a generic method), the `OverloadedFunction` is returned as it was and the old message stands. The `FObject` branch and the not-found error are unchanged, and no wrapper is stripped anywhere (row 919 stays open).

**The build.** `ant compileAll`: 'Caches /home/user/fortress/default_repository/caches started again, empty', 'BUILD SUCCESSFUL', 'Total time: 32 seconds'.

**The tests after.** `harness-one.sh /home/user/fortress/tmp/repair-review/h1` on `AsIfOverloadedMethodWalk.fss`, `AsIfCallsWalk.fss`, `XXXAsIfBoundWalk.fss`, `XXXAsIfTupleWalk.fss` and `XXXAsIfGenericMethodWalk.fss` in one JVM, at 2026-11-07T10:42:33Z:

    . interpret tmp/repair-review/h1/tests/AsIfCallsWalk
     OK (time = 7500ms)
    FAIL: J5/0:Named =/= J4/0:Leaf; a bound assumption is the value, whose getter dispatches
     OK Saw expected exception
    . interpret tmp/repair-review/h1/tests/AsIfOverloadedMethodWalk
     OK (time = 348ms)
    OK (5 tests)

The three `XXX` files fail with their own messages, run directly from `ProjectFortress/` (`../bin/fortress tests/X.fss`): `XXXAsIfBoundWalk` the line above (row 919); `XXXAsIfTupleWalk` 'RHS does not yield a tuple' at `:14:5-41` (row 920); `XXXAsIfGenericMethodWalk` 'Unexpected Selection result in Juxt of FnRef of Selection, gm[\X extends FortressBuiltin.Object\](x:X)...' at `:14:17-43` (row 922).

## 2. The demos

`turnersParaffins0`, from `ProjectFortress/demos`, `../../bin/fortress turnersParaffins0.fss`: exit 0, `grep -ci fail` 0, its last line '===== Enumeration and counting paraffins & radicals completed. ====='.

The demo driver of `compile-ladder/rung-team-demos/REPORT.md`, section 13, saved as `tmp/run-demos.sh`, `FORTRESS_THREADS=1`:

- First run, 10:44Z to 11:02Z: 'demos: 52 run, 51 reached their end'. The one that stopped is `Generator2Demo`, 'Generator2Demo	STOP	rc=1	fail-in-output', with `IntegerOverflow` at `Library/FortressLibrary.fss:3566:27-29`, the join `a b` of `ProdReduction`, under the demo's `PROD[\F\]` at `ProjectFortress/demos/Generator2Demo.fss:121`. The demo's arrays are drawn by `random` (`Generator2Demo.fss:62-64`), so its products differ from run to run; the gather's run on the merged tree had it reach its end ('Generator2Demo	END	rc=0	clean'). No asif and no overloaded method on an assumed receiver is on its path.
- `Generator2Demo` alone, three times on the same tree: 'run 1 rc=0 fail=0 279s', 'run 2 rc=0 fail=0 269s', 'run 3 rc=0 fail=0 282s'.
- Second run of the driver, 11:11Z to 11:33Z: 'demos: 52 run, 52 reached their end', with 'turnersParaffins0	END	rc=0	clean	===== Enumeration and counting paraffins & radicals completed. =====' and 'Generator2Demo	END	rc=0	clean'.

`tennisRanking` writes its output file, `ProjectFortress/demos/tennis051707`, which the driver names; the file was removed after the run.

## 3. The record

- Row 921 closed: `ledger.py close 921 --commit 4445d848b --test AsIfOverloadedMethodWalk`, its note citing the fix's lines.
- Row 919 noted, open: the demo's keys reach `Library/Map.fss:165` wrapped, through the varargs tuples of `Map.fsi:100`, since `NonPrimitive.java:117-126` strips only top-level arguments.
- F-283 set back to all 52 reaching their end, with the second driver run's line and `Generator2Demo`'s random stop.
- `PLAN.md`: "Where we stand" on the demos; item 73 answered by the ruling; judge.1 under "Climb batch 27, listed for his review"; judge.2 is already that section's entry on the relayed user request.
- `RECORD.md`: "The tests on the merged tree" and the items for the curator, with a paragraph on the repair.

## 4. Deviations

1. **Row 919's note held no claim that the demo stops.** Step 5 asks to drop it from `explorations/fortress-gap-ledger.md:425`; that line, row 919, says nothing of the demo (the claim was in row 921's note, `:427`, which the close replaces). So nothing was dropped, and the demo's path was added as a note instead.
2. **Two commits, not one.** `ledger.py close` refuses a commit that is not in `HEAD`'s history (`explorations/coordinator/tools/ledger.py:928-933`, 'close a row after its fix has landed'). So the fix and its test are one commit, `4445d848b`, and the close with the other records a second.
3. **The demo driver ran twice.** Its first run stopped at `Generator2Demo` on a random draw (section 2), which is not this repair's path; the second run gives the line that step 4 asks for. `ant testSystem`, which the skill asks for after an edit of walk (`references/tests-running.md`, "When to run a whole suite"), was not run: the brief says not to run the gate, and a changed path under `ProjectFortress/src/` reruns it after this repair.

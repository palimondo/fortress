<!-- Climb batch 16, rung K's judge: the ruling on the skeptic's contested fix 491a5631a (each call whose static argument breaks the callee's bound is reported at its own place), upheld; the rung stands. -->

# Rung K (`rung-checker-abstract-callsite`): the judge's ruling on its contested fix

Written 2026-10-16 by the batch's judge (Opus), on `wip/rung-checker-abstract-callsite` at `587097d58`. Nothing was built or run for it. Every point is a reading of the tree at that commit, of the worker's last code commit `a79a51661`, or of a result that the worker's `REPORT.md` or the skeptic's `SKEPTIC.md` quotes with its command.

## 1. Ruling

**`491a5631a` is upheld, and nothing is reverted. Decision: stands.** The rung lands as the branch holds it.

The skeptic contested one fix. The finding is right, and so is its way. The worker's key dropped the error of a call whose static argument breaks the bound whenever another call of the same callee, in any declaration, printed the same message. The coordinator's call 4 asks for every such call to be reported at the call. The fix reports each one, and keeps the guards that the worker built against extra errors.

## 2. What the fix changes

At `a79a51661`, a moved error was keyed on its message and on the place of the node, `n.at` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/TypeWellFormedChecker.scala:48` at `a79a51661`). Only one error was kept per key (`:55-59` there). A second place that did not lie inside the first fell to `case _ =>` at `:59`, and was not reported.

A call's type keeps the spans of the callee's declared type (ledger row 720). So for two calls of one callee whose static arguments print alike, `n.at` is the same: the callee's result type. The two calls therefore had one key and one error.

At `491a5631a`, a moved error is kept for each type node met, at the innermost expression that the walk met that node in (`TypeWellFormedChecker.scala:75-85`). The errors are made at the end of `check` (`:41-58`):
- If one place of a key lies strictly inside another place of the same key, the outer place gives no error (`:50-56`).
- A key that the walk also met where its node is written gives no moved error at all (`:44`, `:72-74`).

## 3. Why it is upheld

1. **Call 4 settles the place, and it settles it for each call.** Call 4 says "a static argument that breaks the callee's bound is reported at the call" (`explorations/coordinator/CLIMB-BATCH-16.md:84`), and the rung's section repeats it as "an error is reported at the call whose static argument breaks the bound" (`:176`).
   - The second call in `SkTwoCalls` is such a call. So is `again`'s call in the worker's own `XXXStaticArgBoundAtCallOnce` (`ProjectFortress/compiler_tests/XXXStaticArgBoundAtCallOnce.fss:14`).
   - At `a79a51661` neither got any error. The skeptic's run (`SKEPTIC.md` section 5.2):

         tmp/.../skeptic/bin/diffrun.sh SkTwoCalls SkTwoCallsU
         SkTwoCalls.fss:9:21-29:           ... File SkTwoCalls.fss has 1 error.
         SkTwoCallsU.fss:9:21-29:  SkTwoCallsU.fss:10:22-30:  ... File SkTwoCallsU.fss has 2 errors.

   - The worker's test asserted the drop. At `a79a51661`, `XXXStaticArgBoundAtCallOnce.test` held `compile_err_WIcontains=File XXXStaticArgBoundAtCallOnce.fss has 1 error.` (the minus line of `git show 491a5631a`).
   - Call 4's precedent is javac and scalac, which report a bound violation at each use of the type argument (`CLIMB-BATCH-16.md:84`). That is one error for each call, not one for each declaration.
   - The specification says nothing about where an error is reported (`REPORT.md`, its grep under the provenance lines). So nothing outweighs call 4 here.

2. **The worker's precedent, read exactly, gives the skeptic's answer.** The worker took its key from the driver's de-duplication (`REPORT.md` section 8, decision 5; section 3, "Precedent for row 720").
   - The driver drops an error whose `toString()` it has already seen (`ProjectFortress/src/com/sun/fortress/exceptions/MultipleStaticError.java:31-39`).
   - That string is the place where the error is reported, followed by its description (`ProjectFortress/src/com/sun/fortress/exceptions/StaticError.java:70-73`).
   - Once an error moves to its call, the reported place is the call's. Two calls then give two strings, and the driver keeps both.
   - The worker's key used `n.at`, the place before the move (`:48` at `a79a51661`). That is the callee's declaration, the wrong place that row 720 repairs. So the worker's key was not the driver's key. It carried the base's wrong place into the de-duplication.

3. **A printed name does not identify a type variable across declarations.**
   - With the worker's key, whether `second`'s call is reported depends on whether `second` calls its parameter `T` or `U` (`SkTwoCalls` against `SkTwoCallsU`, above).
   - The tree's own test of the same principle, for bound checks, is `ProjectFortress/compiler_tests/BoundCheckSameNameTwoScopes.fss:1` and `:11-12`: "the same question about T has two answers". That test is the revival's (`3c67d5204`), not the team's.

4. **The fix meets each of the worker's concerns.**
   - *A call inside a tuple was counted twice in the first version* (`REPORT.md` section 1, "The first (96c441771)"). The call's place lies inside the tuple's, so only the call's place is kept (`:50-56`). `XXXStaticArgBoundAtCallOnce` now asserts two errors: one at the call in the tuple, at `:13:21-`, and `again`'s own. It does not assert three.
   - *A type that is ill-formed where it is written was counted twice in the second version.* `written` suppresses every moved place of that key (`:44`, `:72-74`). `XXXIllFormedTypeAtDeclarationOnce.test` still asserts 'has 1 error'.
   - *A type built twice from one declaration* (decision 5's way not taken). One call's own expressions nest or coincide. Nested places keep the inner one. Coinciding places print the same string, which the driver drops (`MultipleStaticError.java:34-37`).
   - *A call's value that flows to a later use.* The use shares the call's node, so it adds no place (`:79-85`). Fix 5.1 makes the walk meet the call first (`:286-287`, upheld as settled in `SKEPTIC.md` 5.1).
   - The skeptic's runs on `491a5631a`: the rung's 35 test files, 'OK (47 tests)'; `ant testQuick`, 'Tests run: 1222, Failures: 0, Errors: 0', 'BUILD SUCCESSFUL' (`SKEPTIC.md` sections 5.2 and 11).

5. **The library's sites hold by reading.**
   - The rung's section says that row 720's repair "moves two sites without adding one" (`CLIMB-BATCH-16.md`, rung K, "Distance sites").
   - `MaxSumReductionPair` and `MinSumReductionPair` appear in `Library/` only at their declarations (`Library/FortressLibrary.fss:3405`, `:3411`) and at one call each (`:3422`, `:3424`). So each moved key has one place, and the fix gives one error for each, as the worker's code did.
   - The skeptic's instrumented runs agree on the tables' api rows and on the two moved sites (`SKEPTIC.md` 5.2, "Row 488").

## 4. Each side's claims

**The worker was right that:**
- the first version multiplied errors (`REPORT.md` section 1);
- the driver de-duplicates on text and place (`MultipleStaticError.java:31-39`);
- a key on node identity alone would double one call's type wherever it is built twice. The skeptic agrees, and that is why the nesting rule exists (`SKEPTIC.md` 5.2, "Mine").

**The worker was wrong that** "each of the base's distinct errors stays one error" is a requirement. No decision on record asks for the base's count of errors outside the library.
- The base's single error for two calls came from its wrong place (point 2 above).
- `GenTest5` rises from 32 to 36 errors, at three of the four `cross` calls (`:646` to `:648`; the first, at `:645`, was reported already) and at a second reference at `:384`, with its first error unchanged (`SKEPTIC.md` 5.2, "Its cost"). Each new error is a call that call 4 asks to be reported. `GenTest5` is outside the suites (`ProjectFortress/not_working_library_tests/`).

**The skeptic was right** about the defect, its dependence on another declaration's parameter name, and call 4's reading (points 1 to 3 above).

**The skeptic measured less than it implied.** Three things in section 5 below are not measured on the committed fix. None changes the ruling.

## 5. What lands unmeasured or unrepaired: for the gather and the curator

1. **No count stage or distance stage ran on `491a5631a`** (`SKEPTIC.md` 5.2 and 11).
   - The skeptic's instrumented count run with this code lost row 488's site at `FortressLibrary.fss:130` ('#total 38', '#locations 37'). The worker's file, compiled the same way, did not.
   - The mechanism was not found. The symptom is the one F-232 records: two instrumented runs that shifted the JVM's identity-hash sequence lost `:130` (`explorations/perf-probes/checker-speed-2/REPORT.md:282-283`, `:350`).
   - Rung H makes the checker's output the same under any identity-hash sequence. Call 3 names `:130` going or staying as H's own cost (`CLIMB-BATCH-16.md`, call 3).
   - So the gate on the merged tree is the first measure of this fix. If the gate's count or distance moves at any site other than `:130` and the two moved sites `:3422` and `:3424`, the gather looks at `491a5631a` first.
   - `record.md:22` ("In the library no error is added or dropped: the count stays 39 and the distance 49") holds for this fix by reading only (point 5 above). The gather takes the numbers from the gate.
2. **P-148's time for this fix is not measured.**
   - The walk is 0.7 % of the count stage's samples (`REPORT.md:148-149`).
   - The fix adds a linear scan for each moved error (`:80`), and a scan over each key's places at the end (`:45-56`). In the library each key has one place (point 5 above).
   - The gate's count stage times the merged tree.
3. **A line of `record.md` is stale.** The handover line "A call's ill-formed type is reported at the call, once." (`record.md:53`) should read "once for each call", as `record.md:19` and `:32` already do. This is the gather's correction.
4. **A residual case, found by reading and not reproduced.**
   - Take two calls of one callee whose static arguments print alike, where one call is an argument of the other, such as `next[\T\](next[\T\](x))` with a bounded `next`. Both calls' types have one key. The inner call's place lies inside the outer's, so the outer call gives no error (`TypeWellFormedChecker.scala:50-56`).
   - This case is narrower than the defect fixed, and it does not depend on any other declaration. The program is still refused, at the inner call.
   - The worker's way (e) closes it in general: a call's type takes the call's spans (`REPORT.md` section 8, decision 3). It changes the spans that every message prints, so it is not this batch's.
   - If a later rung reproduces the case, it gets a ledger row.

## 6. If call 4 is reversed

Call 4 is the coordinator's, listed for the curator's review and reversible (`CLIMB-BATCH-16.md`, "The coordinator's calls this batch builds"). If the curator reads "at the call" as "once per callee", `git revert 491a5631a` removes the fix together with its test, the rekey and its lines of `record.md`. The dropped call then needs a ledger row at home 3, with `XXXStaticArgBoundAtCallOnce.test` as its reproducer (`SKEPTIC.md` 5.2, last paragraph).

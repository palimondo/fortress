<!-- The working plan from the sealed-tree tag onward, written 2026-09-17 by the coordinating session on Pavol's request for a plan that can be followed. It is the actionable form of map/README.md §5; it changes as rungs land. One line per paragraph; every step names its test, its edit, its check and its commit. -->

# Plan: microGPT compiled on the JVM

## The rule for every edit under the sealed tree

Test first: a program that fails today is added to the compiler's own corpus (`ProjectFortress/library_tests/` for library rungs, `ProjectFortress/compiler_tests/` for checker and codegen rungs; a `.fss` that prints `PASS` plus a `.test` file naming `link`, `run`, `run_out_contains=PASS`, the format of `library_tests/Boolean.test` except for its check line: `run_out_WIcontains`, which that file writes, is not implemented by the harness and silently falls back to the default check (FACTS, R1 of the repair batch, `FileTests.java:147`; corrected 2026-09-19).

Then the edit, as small as the test needs.

Then the check: the new test passes; `ant compileAll` (only when Java or Scala changed), `ant testFast`, `ant testSystem` stay green; the ladder subset that stopped on this rung's name is re-run and moves up with nothing moving down.

Then one commit: the edit, the test, the FACTS line, the handover state line, and a note on the ledger row it closes (rows are never renumbered; a closed row gets "fixed <commit>" appended to its notes). Footer as in `protocol.md`. Push the branch and fast-forward main.

Shadow first when the edit is in Java or Scala and the outcome is uncertain (`perf-probes/template-check/run-all.sh` is the recipe); library edits need no shadow, `fortress compile` reads the `.fss` directly.

## Testing techniques adopted, decided 2026-09-17

One corpus, both backends: the interpreter tests (`ProjectFortress/tests/`, 381 programs, one `assert` per operator where it matters) are the ladder for the compiler path; the ladder driver in `explorations/compile-ladder/` runs them unchanged through `fortress compile` and `run` and records the phase each reaches. Progress is the count that passes. Kotlin's box tests are the model.

Golden output where a value matters: a run test may carry a `run_out_equals` expectation (the harness already supports it, `FileTests.java:140-271`) instead of only "contains PASS". Scala's `.check` files are the model. Applied per test, not retrofitted.

Tiers named: positive (compiles and runs), negative (`XXX` prefix, `compile_err_equals`), conformance (`SpecData/examples/`, 133 spec programs, today outside the gate). `ant testSpecData` joins the gate when its red count is known.

Not adopted: rewriting the harness on lit and FileCheck, inline diagnostic annotations. Cost without gain on the path.

## The steps

Step 0, done: tag `sealed-tree` at `75cca6683`.

Step 1, running: the ladder baseline, `explorations/compile-ladder/REPORT.md` (every interpreter test and the 29 `not_working_library_tests` through the compiler path; missing names ranked by files blocked).

Step 2: the two one-line runtime defects. `runtimeSystem/BaseTask.java:246-249`, `inATransaction()` builds its debug string before reading the flag (ledger 302, 88.9% of samples in the compiled loop); the float-literal `String` round trip per iteration (ledger 303). Test: the compiled scalar loop of `perf-probes/boxing/` timed before and after; correctness by the full suite. First commits under the sealed tree.

Step 3: climb the ladder, library rungs only. Each rung: the top missing name from the ladder, its failing test, its declaration in `Library/CompilerLibrary.fss` or `LibraryBuiltin/CompilerBuiltin.fss` in the spec's spelling and from the team's drafts where they exist (`CompilerAlgebra` one uncommented line at `WellKnownNames.java:124`, `GeneratorLibrary.fss`, the `Maybe` blocks, `Library/incomplete/`), the check, the commit. The rung stops and reports when the next name needs the checker or the code generator. Automated by `coordinator/ladder-workflow.js`.

Step 3, batch 1, launched 2026-09-19 (`coordinator/CLIMB-BATCH-1.md`, run by `coordinator/climb-batch-workflow.js`): four fork-free rungs ranked by what the target program names rather than by ladder file counts — the `RR64` functions (the one `.java` rung), `Maybe`/`Just`/`Nothing`, the named integral operators, `recordTime`/`printTime`. Rows 319-328 stay in the ledger: none is on the path; row 320 is the next batch's `.java` candidate.

Step 4: `nat` static parameters in the checker (`reviews/nat-checking-plan.md`), shadow first; test: a `nat`-parameterised program compiled and run, plus the plan's five compiler tests.

Step 5: the array types and the algebra above `Number`, with the representation decided once (`double[]` and `int[]` backings; the probe on generic instantiation in the class loader comes first).

Step 6: the codegen holes the program hits (local functions first, ledger 304); the construct inventory of C4 and the focused base against `CodeGen`'s visitors decides the list.

Step 7: the three kernels and C4 compile and run; the differential check against the interpreter passes; then the timing against the Java baseline (written any time, in parallel).

## Stop conditions for autonomous work (widened 2026-09-17 on Pavol's word)

Any source in the tree may be edited under the rule above; which file it is in is not a decision. What stops the climb: a design fork (the array representation, boxed against `double[]`/`int[]`; the library route, the interpreter's library as prelude against growing the compiler library beyond what one rung needs; any change of semantics against the spec; deleting a test to get green); a rung's gate red twice after one repair (revert, record, continue with the next name); disk under 500 MB after sweeping `/tmp/fortress*rats`, `ProjectFortress/test-tmp` and `ProjectFortress/test-caches`; a permission denied.

Steps 3 and 4 are therefore one climb: a rung takes whatever the blocking name needs, library, checker or codegen. Rung 1 is the `Equality` knot: the duplicated prelude list (`WellKnownNames.java:124`, `TopLevelEnv.java:967-976`), the checker's `comprises T` kind-environment defect (`TypeAnalyzer.scala:764-766`), the private `Equality` in `library_tests/MaybeTest9.fss`.

## Refused rungs

Rung 1, `Equality`, 2026-09-17, under the old boundary: recorded in `compile-ladder/rung1/REPORT.md`; re-opened under the widened rule.

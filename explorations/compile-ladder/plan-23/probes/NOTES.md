<!-- The probes of climb batch 23's planner (CLIMB-BATCH-23.md, section 4, "The planner's probes", holds their results): what each file here is, the tree it was measured on, and how to run it again. Written 2026-10-24 by an Opus planning worker against main at e0ec620a9, whose code is 2bff2fe23's, climb batch 22's landing; re-checked 2026-10-30 against the new base, a1f8c4b8b, whose code is that of main after climb batch 22c's landing (b81d86b75). -->

# Climb batch 23's probes

All runs were in three worktrees seeded from the base build `/home/user/fortress-base23` (`e0ec620a9`), detached and removed after: `fortress-p23w`, `fortress-p23c` and `fortress-p23b`. The base build ran only `count.sh` (javap on its build, which writes nothing there), `git apply --check` of the two patches, and `run-four.sh` with its scratch folder outside it; `git status --porcelain` there printed nothing after each. Machine: nproc 4, Intel Xeon Processor @ 2.10 GHz, openjdk 25.0.4.1, `FORTRESS_THREADS=1` for the stages; another probe worker shared the machine, so no time here is one to compare, and walk was not timed.

The re-check of 2026-10-30, on the new base `a1f8c4b8b`: two worktrees seeded detached from the base build, now at that commit, and removed after: `fortress-p23f`, the base, for `count.sh`, `run-four.sh` and the old code, and `fortress-p23r`, the two patches applied. Nothing was built or run in the base build. The record's section 4, "The planner's probes", "On the new base", holds its results.

## The files

- `rung-C.patch`: rung C's text as the planner measured it. `compiler/BuiltinPrimitiveRewriter.java` (new, 134 lines, item 35's probe class re-based with three changes: its switch, the refusal of a helper string that names no static method, and `namesHelpers`), two hooks in `compiler/Parser.java` (+5 −2), the switch in `Shell.specificRepository` (+2), a reading of the foreign Java types as the one library's in walk's world in `compiler/NamingCzar.java` (+45), beside the prelude's table, and three compiled tests in `ProjectFortress/compiler_tests/`. Applies to the base alone, at `e0ec620a9` and at `a1f8c4b8b`. Natives-shape's gap 1 patch from `4a46fb83a`, which the planner first applied in its place (+14 −11), rewrote the table every reading shares and failed `NamingCzarJUTest.testForeign` in the compiled tracks; the record's section 4 gives both runs.
- `rung-W.patch`: rung W's text as the planner measured it. `interpreter/glue/StaticNativeApp.java` (new, 208 lines), its hook in `interpreter/glue/NativeApp.java` (+8), the first family's 21 strings (19 of `ZZ32`'s in `Library/FortressLibrary.fss`, 2 of `Int`'s in `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss`), and five walk tests in `ProjectFortress/tests/`. Applies to the base alone, at `e0ec620a9` and at `a1f8c4b8b`. The two together are the batch's text.
- `count.sh`: F-32's classes counted again on a built tree, with the natives probe's own scripts read from `4a46fb83a`; writes `classified.tsv` and `movable.tsv`. `classified-base.tsv` and `movable-base.tsv` are its output on the base, `a1f8c4b8b`, since the re-check; the planner's, on `e0ec620a9`, are those of `a6b6e9d06`, and differ from them in 11 line numbers only.
- `movable.py`: which bindings of classes A and B can name their helper as a bare string today, by the helper's Java signature read through the foreign-type table of walk's world; `count.sh` runs it.
- `family-edits.py`: moves a family of `movable.tsv` onto its helpers by exact text (`family-edits.py <tree> movable-base.tsv ZZ32,Int` wrote 23 strings; the batch's text then put `CHOOSE`'s and `Int`'s `asFloat`'s back, by hand, for the reasons in the record's section 4).
- `run-four.sh` and `four-imports-base.tsv`: the report-only check of the library components microGPT imports outside the distance: a copy of the distance stage whose component list is the one file `FOUR_TARGET` names, run once per target, and the errors it printed. Both are the re-check's: the copy is of the stage as climb batch 22c left it, setting `compile` and the fourteen, and the table its run on `a1f8c4b8b`, row for row the planner's run on `e0ec620a9` with the old stage (`a6b6e9d06`).

## How to run them again

From a worktree seeded from a base build at the batch's base (`a1f8c4b8b` since the re-check), set up as the `fortress-repo` skill's `build-and-caches.md` says:

    git apply explorations/compile-ladder/plan-23/probes/rung-C.patch explorations/compile-ladder/plan-23/probes/rung-W.patch
    ant compileAll        # then the library order, before the compiled tests
    explorations/compile-ladder/rung-inference-walk/harness-one.sh $PWD/tmp/h ProjectFortress/tests/NativeHelper*Walk.* ProjectFortress/tests/ZZ32DivisionByZeroWalk.fss
    ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh c23 ProjectFortress/compiler_tests NativeHelperBindingCompiled.test XXXNativeHelperMisfitCompiled.test XXXNativeHelperMisspeltCompiled.test
    explorations/coordinator/tools/distance/run.sh tmp/distance.txt tmp/distance        # in the background
    explorations/coordinator/tools/checker-count/run.sh tmp/count.txt tmp/count         # in the background

and for the count, from any built tree: `explorations/compile-ladder/plan-23/probes/count.sh <tree> <out-dir>`.

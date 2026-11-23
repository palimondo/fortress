# Climb batch 35: the repair after the merged-diff review

Written on `main` above `f9b407369c`, the judge's ruling (`explorations/compile-ladder/climb-batch-35/JUDGE-review.md`). One launch of the repair worked this stage: no earlier `REPAIR-review.md` was in the batch folder, and `git status --porcelain` of the main tree printed nothing at the start. The repair carries out the ruling's seven steps in order, in `/home/user/fortress`, each call set up as `.claude/skills/fortress-repo/references/build-and-caches.md` says. Only `Specification/appendices/changes.tex`, F-400, row 1107, this folder's `RECORD.md` and this file are edited, with the two history files that `record.py` and `ledger.py` write. Nothing was built but the specification, and no test was added or run: an edit of the specification has no test (`SKILL.md`, "Rules for every task"). The gate's red lines, the nine `one_library_tests` runs that stop on a `VerifyError` in `QQ$DefaultTraitMethods.isFinite`, are outside the ruling and are left to the gate's own stages.

## What was done, by the ruling's steps

| step | done |
|---|---|
| 1 | The ruling's program `OverrideAboveBoundProbe`, its text word for word, kept in the tree's `tmp/`, type checked on the merged tree's build (its `implementation.stamp` equal to the caches', no path under `ProjectFortress/`, `Library/` or `build.xml` changed after `e8b20935d5`), with a private caches folder copied from `default_repository/caches`: `FORTRESS_CACHES=<private folder> bin/fortress typecheck OverrideAboveBoundProbe.fss`, at 13:15:01Z, printed no line and exited 0 ('rc=0'); its analysis went to the private folder only (`analyzed_cache/OverrideAboveBoundProbe-46624673.tfs` there, none in `default_repository/caches`). Outcome (a): `override f(x: Any)` over `A`'s `f(x: T)`, inherited under `where { T extends ZZ32 }`, is paired as an override, by `ProjectFortress/src/com/sun/fortress/scala_src/useful/STypesUtil.scala:1716` with `T` at its declared bound `Any` (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/OverloadingChecker.scala:384-385`). |
| 2 | `Specification/appendices/changes.tex`, the Effect of `revival-supported` (`\seclabel` at `:6367`): the ruling's outcome-(a) five lines replace the three at `:6423-6425` (`:6423-6427` now). Nothing else of the entry, and not `Specification/fortress/preamble.tex:87-88`, changed. |
| 3 | F-400 rewritten with `record.py set`, only its row-1107 clause replaced by the ruling's outcome-(a) words: "the checker refuses an override that overrides a declaration inherited under a conditional extension only by the clause's bound, which walk runs (row 1107)". |
| 4 | Row 1107 (`explorations/fortress-gap-ledger.md:572`) rewritten with `ledger.py rewrite 1107`: in its claim "over the inherited declaration whose parameter type is the clause's static parameter" became "over an inherited declaration that it overrides only by the clause's bound"; the example and every other cell kept, no note added; the tool printed 'row 1107: rewritten (1016 characters)'. |
| 5 | `RECORD.md:131`: one sentence after "Each states what the code does, so neither is a text mismatch.", citing the ruling and this repair's commit. `explorations/coordinator/PLAN.md:939` left. |
| 6 | Built once, on the text after step 2, after the gate in this tree had ended (each of its logs with its `EXIT=` line, its summary written, no JVM running under the tree): `( cd Specification/fortress && ./ant genSource && ./ant tex )`, detached under `nice -n 19`: '211:BUILD SUCCESSFUL', '212:Total time: 34 seconds', '21502:BUILD SUCCESSFUL', '21503:Total time: 42 seconds', '21504:EXIT=0'; the warnings `grep -c` of `specification.md`, "Building it", over `fortress.log` printed 0; 'Output written on fortress.pdf (727 pages, 2534547 bytes)'. The PDF was copied where the repair stage's brief says, for the commit stage, then `git clean -fXq -- Specification`; `Specification/fortress.pdf` not updated. |
| 7 | No gate, suite or stage run. One commit on `main`, the paths named, not pushed. |

The built PDF, `pdftotext -layout Specification/fortress/fortress.pdf -`:

    whose parameter types or the overridden declaration's name a static parameter (row 1106); the compiled type
    checker reads a declaration that a generic trait inherits under a where clause without that clause's bound, so
    it refuses an override that overrides the declaration only by that bound, as one whose parameter type is the
    bound over one whose parameter type is the clause's static parameter (row 1107). Nothing checks io , and

The three forms on the merged code now on record: `override f(x: ZZ32)` over `f(x: T)` refused, and `override g(x: Number)` over `g(x: ZZ32)` accepted, compiled and run, both by the reviewer's probe that the ruling quotes ("The finding, upheld"); `override f(x: Any)` over `f(x: T)` accepted, by step 1. The new clause, F-400 and row 1107 name only the first.

## Deviations from the ruling

- Step 5 asks the sentence to cite "the repair's commit". A commit cannot hold its own hash, so the sentence names the commit by its subject line and points to this file; the hash is in the repair's result.
- Step 5's sentence also says that the entry's lines after `:6425` moved two lines on, since `RECORD.md:33` ("at `:6426` now", the line "Nothing checks \KWD{io} ...", now `:6428`) and `RECORD.md:202` (`changes.tex:6420-6425`, now `:6420-6427`) cite them. Their text is not changed. `PLAN.md:939` cites the same `:6420-6425` and is left, as the ruling says.
- Step 7 commits the paths of steps 2 to 5. Two history files are written by the tools that steps 3 and 4 name, `explorations/coordinator/FACTS-history.md` (step 3 names it) and `explorations/fortress-gap-ledger-history.md`, and this file, which the repair stage's brief asks for, is one more path in the same commit.

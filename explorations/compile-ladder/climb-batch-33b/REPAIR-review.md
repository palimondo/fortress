# Climb batch 33b: the repair after the merged-diff review

Written on `main` above `b3bfdf2526`, the judge's ruling (`explorations/compile-ladder/climb-batch-33b/JUDGE-review.md`). One launch of the repair worked this stage: no earlier `REPAIR-review.md` was in the batch folder, and `git status` of the main tree was clean at the start. The repair carries out the ruling's seven steps in order, in `/home/user/fortress`, each call set up as `.claude/skills/fortress-repo/references/build-and-caches.md` says. Only `Specification/`, rung G's `REPORT.md`, this folder's `RECORD.md` and this file are edited. Nothing was built but the specification, and no test was added or run: an edit of the specification has no test (`SKILL.md`, "Rules for every task").

## What was done, by the ruling's steps

| step | done |
|---|---|
| 1 | `Specification/appendices/changes.tex`, the Effect of `revival-supported` (`\seclabel` at `:6362`): the ruling's six lines replace the three at `:6407-6409` (`:6407-6412` now). The Rationale's count (`:6385-6386`) and `Specification/fortress/preamble.tex:84-85` are unchanged. |
| 2 | `Specification/preliminaries/intro/nutshell.tex:110-111`: the callout's second sentence reads "Keyword parameters are not built, and no program with a variable size argument list runs on the compiled path yet."; `:108-109` are unchanged. |
| 3 | `grep -rn '~624' Specification --include=*.tex` after the edits printed nothing (exit 1). |
| 4 | Built once, `( cd Specification/fortress && ./ant genSource && ./ant tex )`, detached under `nice -n 19`: '211:BUILD SUCCESSFUL', 'Total time: 29 seconds', '21498:BUILD SUCCESSFUL', '21499:Total time: 36 seconds', '21500:EXIT=0'; the warning `grep -c` of `specification.md`, "Building it", over `fortress.log` printed 0; 'Output written on fortress.pdf (727 pages, 2533850 bytes).' `pdftotext -layout` quotes below. Then `git clean -fXq -- Specification`; `Specification/fortress.pdf` not updated. |
| 5 | `explorations/compile-ladder/rung-varargs/REPORT.md`, "Sentences of the specification made false": two items after the `preamble.tex:84` item, each with its text at `c799851472`, marked as found by the merged-diff review and changed by this repair, with its new text. |
| 6 | `explorations/compile-ladder/climb-batch-33b/RECORD.md`, rung G's section: one line after the gather's notes, with the finding, the judge's addition, the two passages and the build's lines. |
| 7 | One commit on `main`, the paths named, not pushed (the repair stage's brief: "Do not run the full gate and do not push"). |

The built PDF, `pdftotext -layout Specification/fortress/fortress.pdf -`:

    (row 652). The code generator refuses a varargs parameter under the compiled path's own library, which de-
    clares no ImmutableArray; against the Fortress standard libraries it compiles one, but a program compiled
    against the Fortress standard libraries does not run yet (row 1062), and Section I.1.38 names the forms that it
    does not yet compile. An object takes no varargs parameter (row 11). The code generator refuses the modifier

    The Working Draft said that keyword parameters and variable size argument lists are supported. Keyword parameters are not
    built, and no program with a variable size argument list runs on the compiled path yet.

Section I.1.38 of the same PDF is "The type of a varargs parameter", the entry `revival-varargs` (`changes.tex:3995-3996`).

## Deviations from the ruling

- Step 5 asks for the Effect's sentence "quoted at `c799851472` with file and line" as `changes.tex:6407-6409`. Those are its lines on the merged tree; at `c799851472` the sentence is at `:6393-6395` (`git show c799851472:Specification/appendices/changes.tex | sed -n '6393,6395p'` prints "Keyword parameters are built in neither implementation (row~652); the code / generator refuses a varargs parameter (row~624), and an object takes none / (row~11)."), since G's commit added 14 lines to the `revival-varargs` entry above it (`git diff --stat c799851472 b3bfdf2526 -- Specification`: `changes.tex | 18 ++++++++++++++++--`). The item gives `:6393-6395` at `c799851472` and names `:6407-6409` as the merged tree's lines. `nutshell.tex:110-111` is the same at both.
- Step 7 commits four paths; this file, which the repair stage's brief asks for when a step deviates, is a fifth in the same commit.

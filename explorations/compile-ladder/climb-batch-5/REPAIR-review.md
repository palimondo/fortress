# Climb batch 5: deviations from the judge's ruling on the review

Written 2026-09-26 on `main` at `fe002948e`, by the repair round that executes `explorations/compile-ladder/climb-batch-5/JUDGE-review.md`. The round followed the ruling's fourteen steps in order; what it did is in `explorations/compile-ladder/climb-batch-5/RECORD.md`, section "The judge's ruling on the review, and its repair". This file lists the three places where an instruction did not match a primary source or another instruction, and what was done instead. None of them changes what the round edits or tests.

## 1. Step 5: the tex log's reference warnings

**The instruction.** The tex log must have no line matching `Reference .* undefined` or `There were undefined references`.

**The source.** Every build of this specification runs pdfTeX four times, with BibTeX after the first (`review-tex.txt:10`, `:6906`, `:9894`, `:12731`). The first two passes always have unresolved references, because a pass can resolve a reference only from the `.aux` file an earlier pass wrote. In this round's log, the first pass ends with `There were undefined references` at `explorations/compile-ladder/climb-batch-5/review-repair/review-tex.txt:6841`, and the last `Reference .* undefined` line is at `:6834`. The second pass has the same line at `:9836`. The gather's build shows the same at `explorations/compile-ladder/rung-spec-route-a/probes/build/gather-tex.txt:6829` and `:9829`, so the gather's "no reference warning" (`RECORD.md:62`) can only have meant the final passes.

**What was done.** The check was applied to the last two passes, `review-tex.txt:9894-15566`. They contain no line with `undefined`. The 34 warnings they do contain are of four kinds: 14 floats too large for the page, 12 hyperref tokens not allowed in a PDF string, 6 moved margin notes, and 2 of amsmath's `\over`.

## 2. Steps 8 and 9: two line numbers in `FileTests.java`

**The instruction.** It cites "Saw expected failure (Exit code != 0)" at `FileTests.java:590` and "Did not see expected failure" at `:587`.

**The source.** Both strings come from one pair of ternaries, printed at `ProjectFortress/src/com/sun/fortress/tests/unit_tests/FileTests.java:591` and `:588`.

**What was done.** The round cites `:588` and `:591`. The captures show exactly the strings the ruling names.

## 3. Step 1: the shell set-up

**The two instructions.** The role text of this stage says to source `explorations/experiment/env.sh` and not to export `TMPDIR` or `JAVA_FLAGS` beyond what it sets. The ruling's step 1 says to export `TMPDIR=/home/user/fortress/tmp` and `JAVA_FLAGS="-Xmx4g -Xss64m -Djava.io.tmpdir=/home/user/fortress/tmp"`.

**The decision.** This was a decision. The round followed the ruling's step 1, because it is the more specific of the two and the ruling is what this round executes.

**The effect.** The only difference is where the JVM's temporary directories go. No Rats! temporary directory was left under `tmp/` or `/tmp` after the runs.

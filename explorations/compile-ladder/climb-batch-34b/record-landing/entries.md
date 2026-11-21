<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that a1c244be3..00bde0ee4 added, changed or removed (the batch 34b, landed at 295c215c2, and the landing's own steps to 00bde0ee4), written by evidence.py. -->

# The entries that the range changed

- The batch, a1c244be3..295c215c2: 10 entries: F-34, F-53, F-240, F-336, F-352, F-353, F-381, F-388, F-390, F-396
- After the landing, 295c215c2..00bde0ee4: 0 entries
- Now over 600 characters: 10 of 10: F-34, F-53, F-240, F-336, F-352, F-353, F-381, F-388, F-390, F-396

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-34, changed

- Size: at the base 2469 characters; at the landing 2693 characters; now 2693 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-34 **Against the interpreter's library, on the code of `285efad802`, the code generator refuses none of the declarations of the fourteen components that the distance stage checks; the measure's script can take the count only on a patched tree.** The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. Without the patch, the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes (row 874), so the measure's script first patches a scratch worktree (`compile-ladder/plan-31/PROBES.md` gives the patch). The patch is needed while the code generator's table of the classes that carry built-in types has no rows for the one library's seven number types (`payloadObjects`, `NamingCzar.java:606-614`). The script also edits `NN32`'s two getters, which changes nothing now, since the library declares them so (F-394). Then: 0 refused, 754 emitted, no component failure. The script skips the dispatch methods, so it does not reach `String`'s two calls with a type assumption at one argument (`Library/String.fss:67`, `:69`). `String`'s real compile with `FORTRESS_LIBRARY=one`, on the same tree without the patch, ends clean, and both calls call the body of the `(String, String)` declaration (F-325). On the code of `ba3c7c876d` the script counted 1 refused, with 753 emitted: `__bigOperator2`, a generic method called on a receiver typed by a type variable (row 1076, fixed since, F-392). The real compile refused 2 declarations: that one, and `String`'s `concatAndBalanceIfNecessary`, which holds the two calls (row 818). A declaration counts at its first wall, and some hold a second. The measure cannot see a class that is emitted and fails when it loads. No emitted class of the measure is run, and no test checks the count, since the gate's distance stage runs no code generation. So after the switch-over the code generator still stands between the library and bytecode. Measured once on each code. Command: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Detail: `compile-ladder/plan-34/probes/measure-285efad802.txt`; `compile-ladder/plan-33/probes/measure-ba3c7c876d.txt`; `compile-ladder/plan-34/probes/rehearsal.md`, "3. The walls, in the order met", 1; `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

Now:

- F-34 **Against the interpreter's library, on the code of `285efad802` and of climb batch 34b's rung C, the code generator refuses none of the declarations of the fourteen components that the distance stage checks; since rung C the count needs no patch, and the components compile to jars (F-396).** The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. On `285efad802` the code generator stopped `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes without the measure's patch (row 874); on rung C's code (`f3439cf7ce`), whose tables carry the one library's types under the selection (`NamingCzar.java:612-675`), the measure without the patch, under `FORTRESS_LIBRARY=one`, and with the patch's one hunk that still applies, the trait table's search, gives the same: 0 refused, 754 emitted, no component failure. The script's patch no longer applies whole, and the script then goes on without it; its edit of `NN32`'s two getters changes nothing, since the library declares them so (F-394). The script skips the dispatch methods, so it does not reach `String`'s two calls with a type assumption at one argument (`Library/String.fss:67`, `:69`). `String`'s real compile with `FORTRESS_LIBRARY=one`, on the same tree without the patch, ends clean, and both calls call the body of the `(String, String)` declaration (F-325). On the code of `ba3c7c876d` the script counted 1 refused, with 753 emitted: `__bigOperator2`, a generic method called on a receiver typed by a type variable (row 1076, fixed since, F-392). The real compile refused 2 declarations: that one, and `String`'s `concatAndBalanceIfNecessary`, which holds the two calls (row 818). A declaration counts at its first wall, and some hold a second. The measure cannot see a class that is emitted and fails when it loads. No emitted class of the measure is run, and no test checks the count, since the gate's distance stage runs no code generation; classes that do not load or verify stand between the library's jars and a run (rows 1091, 1099). Measured once on each code. Command: `FORTRESS_LIBRARY=one explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The stages (a point to report)"; `compile-ladder/plan-34/probes/measure-285efad802.txt`; `compile-ladder/plan-33/probes/measure-ba3c7c876d.txt`; `compile-ladder/plan-34/probes/rehearsal.md`, "3. The walls, in the order met", 1; `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

History blocks of the range:

- Written by the gather: 2026-11-21 00:08Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The stages (a point to report)" · by climb batch 34b gather: the measure on rung C code without the patch (cites [S1])

Report sections that the entry cites: [S1] `compile-ladder/rung-first-run-one-library/REPORT.md`, "The stages (a point to report)"; [S2] `compile-ladder/plan-34/probes/rehearsal.md`, "3. The walls, in the order met"; [S3] `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

## F-53, changed

- Size: at the base 1376 characters; at the landing 1377 characters; now 1377 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 34's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 34b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-21 01:11Z · rewritten · by climb batch 34b commit stage: the landed figures of climb batch 34b gate, read from explorations/compile-ladder/climb-batch-34b/gate/distance.txt (#total 0, #crash none, first line 14 components) and checker-count.txt (#total 0, #crash none): the distance 0 to 0, the count 0 to 0; the batch in the title 34 to 34b; numbers only

Report sections that the entry cites: [S4] `references/batch.md`, "The checker count and the distance".

## F-240, changed

- Size: at the base 2203 characters; at the landing 2205 characters; now 2205 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 105 s and its distance stage 200 s at the last landed gate, climb batch 34's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 127 s), over fourteen components, ran at a start load of 0.28, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 117 s (75 s) at 0.08 at climb batch 33b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-34/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 105 s and its distance stage 176 s at the last landed gate, climb batch 34b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 108 s), over fourteen components, ran at a start load of 0.22, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 200 s (127 s) at 0.28 at climb batch 34's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-34b/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-21 01:11Z · rewritten · by climb batch 34b commit stage: count stage about 105 s from the file times of the gate's log (checker-count/javac.txt to run.txt, 107 s); distance stage from compile-ladder/climb-batch-34b/gate/distance.txt #seconds 176 (FortressLibrary 108) and #machine load at start 0.22, over the 14 components of its first line; compared against climb batch 34's 200 s (127 s) at 0.28; numbers only

## F-336, changed

- Size: at the base 665 characters; at the landing 1358 characters; now 1358 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-336 **A compiled helper's raise with a message builds the prelude's exception over its `String`.** `Utility.makeFortressException(name, msg)`, and `(name, e)` through it, finds the exception's constructor over `fortress.CompilerBuiltin.String` and passes an `FJavaString` (`compiler/runtimeValues/Utility.java:28-31`), so `FailCalled`, `FileNotFoundException` and `IOFailure` raised by a helper reach a `catch` on the compiled path; under walk a helper's raise still becomes the library's object of the same name, without the message (F-299). Test: `compiler_tests/HelperRaiseMessageCompiled`. Detail: `compile-ladder/rung-runtime-threads/REPORT.md`, section 1.

Now:

- F-336 **A compiled helper's raise with a message builds its library's exception over that library's `String`.** `Utility.makeFortressException(name, msg)`, and `(name, e)` through it, finds the exception's class by the name that the class path's set of `LibraryNames` gives a simple name, and its constructor over that set's library `String`, the prelude's `fortress.CompilerBuiltin.String` or under the selection the one library's `fortress.FortressLibrary.String` (F-396), and passes an `FJavaString` (`compiler/runtimeValues/Utility.java:34-52`). An exception without such a constructor, as the one library's `IOFailure` and `FileNotFoundException`, is made by its constructor without parameters and without the message (`:49-51`), a second instance of the object (row 1103). So `FailCalled`, `FileNotFoundException` and `IOFailure` raised by a helper reach a `catch` on the compiled path, against the one library `IntegerOverflow` and `FileNotFoundException` among them; under walk a helper's raise still becomes the library's object of the same name, without the message (F-299). Tests: `compiler_tests/HelperRaiseMessageCompiled`, `one_library_tests/OneLibraryCatchHelperRaises.test`. Detail: `compile-ladder/rung-runtime-threads/REPORT.md`, section 1; `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".

History blocks of the range:

- Written by the merged-diff review: 2026-11-21 00:49Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)" · by climb batch 34b merged-diff review: rung C maps a helper's simple name through LibraryNames and looks up the constructor over the selected library's String, with a fallback without parameters; Utility.java:28-31 had moved (cites [S5])

Report sections that the entry cites: [S5] `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".

## F-352, changed

- Size: at the base 2326 characters; at the landing 2442 characters; now 2442 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-352 **A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks; on `main` the compile command reads the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381).** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 315, 990, 991, 732 and 992 are fixed since, and row 624 under the selection of the one library (F-390). Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874 and 995, row 995 now for the carried types other than the seven number types; row 866 is fixed; the one library's seven are not yet compiled over the payload classes, F-388); the trait table's search by the prelude's api names (row 942, fixed since; the search stays, and no compiled test reaches it, F-391); the dispatch method's package (row 994); `NN32`'s two getters (row 993, fixed since). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. Measured once; nothing of the scratch tree landed, and no test holds its runs. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

Now:

- F-352 **A scratch tree with twelve marked hacks ran compiled programs against the interpreter's library and met sixteen walls; on `main` the compile command reads the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381), and a program compiled so can run (F-396).** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 315, 990, 991, 732 and 992 are fixed since, and row 624 under the selection of the one library (F-390). Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874 and 995: row 874 fixed since, and row 995 now for the carried types other than those over payload classes; row 866 is fixed; the one library's seven, `Boolean`, `Char` and `FlatString` are compiled over payload classes, F-396); the trait table's search by the prelude's api names (row 942, fixed since; the search stays, and no compiled test reaches it, F-391); the dispatch method's package (row 994); `NN32`'s two getters (row 993, fixed since). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. Measured once; the scratch tree's hacks did not land as such, and no test holds its runs. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

History blocks of the range:

- Written by the gather: 2026-11-21 00:08Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)" · by climb batch 34b gather: main runs a program compiled against the one library (cites [S5])

Report sections that the entry cites: [S6] `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met"; [S7] `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

## F-353, changed

- Size: at the base 1758 characters; at the landing 1852 characters; now 1852 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-353 **One build can serve the compiled path with either library, shown in a scratch tree: the prelude's thirteen run-time value classes stay, and a second set under the same names, in a second class folder that the class path puts first, serves the one library.** The scratch tree is that of F-352 with its hacks, nine of them behind a selector that one environment variable sets at the compile and at the run. One JVM serves one library. There the one-line program runs against both libraries, and the `Array1` program and the dot loop against the one library, by hand and through `fortress junit`. A sample of 137 of the 876 files of `compiler_tests` shows no test that the second set disturbed; the whole compiled tracks and walk were not run. There the second set's sources equal the first's under a map of eight names, since the classes then differed only in the generated classes that they extend. The classes of the build that link against a prelude class by name are the thirteen, `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector` and `FStringVector`; every other mention of the prelude in the run time and the helpers is a string, 105 raise strings among them (read in the constant pools of `ProjectFortress/build`). `main` has its own selector (F-381) and one set of run-time classes; its seven number types need no second set, since their run-time classes are payload classes over `FValue`, under the object classes that the code generator writes for the prelude; the one library's seven are not yet compiled over them (F-388). Nothing of the scratch tree landed, and no test holds its runs. Detail: `compile-ladder/plan-31/probes/probe-y.md`, "1. What ran", "2. How the library is selected" and "5. What the second set costs".

Now:

- F-353 **One build can serve the compiled path with either library, shown in a scratch tree: the prelude's thirteen run-time value classes stay, and a second set under the same names, in a second class folder that the class path puts first, serves the one library.** The scratch tree is that of F-352 with its hacks, nine of them behind a selector that one environment variable sets at the compile and at the run. One JVM serves one library. There the one-line program runs against both libraries, and the `Array1` program and the dot loop against the one library, by hand and through `fortress junit`. A sample of 137 of the 876 files of `compiler_tests` shows no test that the second set disturbed; the whole compiled tracks and walk were not run. There the second set's sources equal the first's under a map of eight names, since the classes then differed only in the generated classes that they extend. The classes of the build that link against a prelude class by name are the thirteen, `FValue`, `MutableFValue`, `Utility`, `FException`, `FZZ32Vector` and `FStringVector`; every other mention of the prelude in the run time and the helpers is a string, 105 raise strings among them (read in the constant pools of `ProjectFortress/build`). `main` has its own selector (F-381) and builds such a second set, by the same mechanism with files of its own (F-396); its seven number types need no second set, since their payload classes over `FValue` serve the object classes that the code generator writes for either library (F-388), but for the `asString` bridge that compiled generic code calls, typed at the prelude's `String` (row 1101). The scratch tree's hacks did not land as such, and no test holds its runs. Detail: `compile-ladder/plan-31/probes/probe-y.md`, "1. What ran", "2. How the library is selected" and "5. What the second set costs".

History blocks of the range:

- Written by the gather: 2026-11-21 00:08Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)" · by climb batch 34b gather: main builds a second set (cites [S5])
- Written by the merged-diff review: 2026-11-21 00:49Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/SKEPTIC.md`, "What I tried and left: fork C3 in the second set" · by climb batch 34b merged-diff review: the payload classes' asString bridge serves the prelude only (row 1101) (cites [S8])

Report sections that the entry cites: [S9] `compile-ladder/plan-31/probes/probe-y.md`, "1. What ran".

## F-381, changed

- Size: at the base 942 characters; at the landing 1031 characters; now 1031 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-381 **The compile command reads the one library where `FORTRESS_LIBRARY=one` (or `-Dfortress.library=one`) selects it, keeps its caches in `default_repository/caches-one`, and its tests run in `testFast`'s onelibrary track.** The selection is read once per JVM (`ProjectProperties.compiledPathUsesOneLibrary`); `Shell.useCompilerLibraries()` follows it, and the two class path scripts follow the variable only. Unset, every command reads the prelude as before. A program compiled under the selection does not run yet, since the one library has no jars (F-34; row 1062). Tests: `ProjectFortress/one_library_tests/OneLibraryHalf.test`, `OneLibraryPrintBig.test` and `XXXOneLibraryRunHalf.test`, run by `ant testOneLibrary` and by `ant testFast`. Detail: `compile-ladder/rung-library-selector/REPORT.md`, "What changed and why", "The tests: the failing run on the base, the passing run" and "Wrong pairings, and the run under the selection".

Now:

- F-381 **The compile command reads the one library where `FORTRESS_LIBRARY=one` (or `-Dfortress.library=one`) selects it, keeps its caches in `default_repository/caches-one`, and its tests run in `testFast`'s onelibrary track.** The selection is read once per JVM (`ProjectProperties.compiledPathUsesOneLibrary`); `Shell.useCompilerLibraries()` follows it, and the two class path scripts follow the variable only. Unset, every command reads the prelude as before. A program compiled under the selection can run, as one that prints a line of text does, against the one library's jars, which the onelibrary track compiles first (F-396). Tests: `ProjectFortress/one_library_tests/OneLibraryHalf.test`, `OneLibraryPrintBig.test`, `OneLibraryRunHello.test` and `XXXOneLibraryRunHalf.test`, run by `ant testOneLibrary` and by `ant testFast`. Detail: `compile-ladder/rung-library-selector/REPORT.md`, "What changed and why", "The tests: the failing run on the base, the passing run" and "Wrong pairings, and the run under the selection".

History blocks of the range:

- Written by the gather: 2026-11-21 00:08Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The tests: the failing runs on the base, the passing run" · by climb batch 34b gather: a program compiled under the selection runs (cites [S10])

Report sections that the entry cites: [S11] `compile-ladder/rung-library-selector/REPORT.md`, "What changed and why".

## F-388, changed

- Size: at the base 1334 characters; at the landing 1467 characters; now 1467 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-388 **The compiler's prelude declares its seven number types as value objects, whose classes the code generator writes over the run time's payload classes.** `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64` are `value object`s in `CompilerBuiltin`; each object's class extends the abstract payload class `compiler/runtimeValues/F<T>`, which holds the JVM value. Descriptors, stamped instances and the RTTI's `className()` name the type by the payload class, while the RTTI's class stays the object's, so that the type lies below its traits at run time; a dotted call casts its receiver to the object's class; `F<T>.make` reaches the object's class's `make` by the name that `LibraryNames` gives, for the prelude only (the one library's seven have no rows yet, fork N4). So a program's object below a number type is refused at the compile, an overloading at `ZZ32` beside one at a program's trait is valid, a `typecase` clause at such a trait over a number is refused as unreachable (row 1081), and a number type named as a value does not compile (row 1082). Tests: `compiler_tests/NumberObjectsCompiled.test`, `compiler_tests/XXXNumberTypeExtendRefusedCompiled.test`, `compiler_tests/ComprisesMeetGenericTrait.test`. Detail: `compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)".

Now:

- F-388 **The compiler's prelude declares its seven number types as value objects, whose classes the code generator writes over the run time's payload classes.** `ZZ32`, `ZZ64`, `ZZ`, `NN32`, `NN64`, `RR32` and `RR64` are `value object`s in `CompilerBuiltin`; each object's class extends the abstract payload class `compiler/runtimeValues/F<T>`, which holds the JVM value. Descriptors, stamped instances and the RTTI's `className()` name the type by the payload class, while the RTTI's class stays the object's, so that the type lies below its traits at run time; a dotted call casts its receiver to the object's class; `F<T>.make` reaches the object's class's `make` by the name that `LibraryNames` gives: the first set's names the prelude's seven, and under the selection the code generator writes the one library's seven over the same payload classes, whose names the second set's `LibraryNames` gives (F-396). So a program's object below a number type is refused at the compile, an overloading at `ZZ32` beside one at a program's trait is valid, a `typecase` clause at such a trait over a number is refused as unreachable (row 1081), and a number type named as a value does not compile (row 1082). Tests: `compiler_tests/NumberObjectsCompiled.test`, `compiler_tests/XXXNumberTypeExtendRefusedCompiled.test`, `compiler_tests/ComprisesMeetGenericTrait.test`. Detail: `compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)".

History blocks of the range:

- Written by the gather: 2026-11-21 00:08Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)" · by climb batch 34b gather: the one library seven have rows (cites [S5])

Report sections that the entry cites: [S12] `compile-ladder/rung-number-payload-objects/REPORT.md`, "The design as built (a point to report)".

## F-390, changed

- Size: at the base 1678 characters; at the landing 1965 characters; now 1965 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-390 **The code generator passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]` of the library in use; against the compiler's prelude, which declares no such type, it refuses the declaration.** The varargs part of a domain is one JVM parameter after the plain ones (`NamingCzar.varargsParamType`). The array is made at the call, or in a dispatch method's branch where another declaration of the name takes as many arguments, and is filled in order with `init`, as walk makes it (`CodeGen.evalVarargsArgs`, `emitVarargsArray`); a single argument of tuple type passes its elements. A call reaches the declaration by the specification's expansion rule (`OverloadSet.VarargsExpansion`). Under the selection of the one library (F-381) the code generator still stops on a varargs method, or a varargs function with static parameters, beside another declaration of its name with as many parameters (row 1086); a spread argument, `f(1, ys...)`, is dropped without a message on both paths (row 1085). So under the selection the library's varargs declarations that a program reaches, such as `println` and `assert`, compile. By reading, a run there would fail at the array, since the index of each element is made by `FZZ32.make`, which raises `LibraryNames`' `Error` under the selection (F-388); no run shows it, since no program runs on the one library yet (row 1062). Tests: the five `one_library_tests/OneLibraryVarargs*.test`; the prelude's `compiler_tests/XXXVarargsCodeGeneration.test` and `XXXVarargsMethodCodeGeneration.test`. Detail: `compile-ladder/rung-varargs/REPORT.md`, "The convention as built"; `reviews/batch-33b-review.md`, section 2, G.worker.1.

Now:

- F-390 **The code generator passes a varargs parameter's arguments as one `ImmutableArray[\T, ZZ32\]` of the library in use; against the compiler's prelude, which declares no such type, it refuses the declaration.** The varargs part of a domain is one JVM parameter after the plain ones (`NamingCzar.varargsParamType`). The array is made at the call, or in a dispatch method's branch where another declaration of the name takes as many arguments, and is filled in order with `init`, as walk makes it (`CodeGen.evalVarargsArgs`, `emitVarargsArray`); a single argument of tuple type passes its elements. A call reaches the declaration by the specification's expansion rule (`OverloadSet.VarargsExpansion`). Under the selection of the one library (F-381) the code generator still stops on a varargs method, or a varargs function with static parameters, beside another declaration of its name with as many parameters (row 1086); a spread argument, `f(1, ys...)`, is dropped without a message on both paths (row 1085). So under the selection the library's varargs declarations that a program reaches, such as `println` and `assert`, compile. There the index of each element, made by `FZZ32.make`, agrees with the array's `init`, since the one library's `ZZ32` is `FZZ32` in every descriptor (F-388, F-396): with the JVM's verifier off a varargs call's array reads back its elements, and with it on the array's class does not load, since it holds `ImmutableArray1`'s `copy` twice (row 1091), so no program that calls a varargs declaration runs yet. Tests: the five `one_library_tests/OneLibraryVarargs*.test` and `XXXOneLibraryRunVarargs.test`; the prelude's `compiler_tests/XXXVarargsCodeGeneration.test` and `XXXVarargsMethodCodeGeneration.test`. Detail: `compile-ladder/rung-varargs/REPORT.md`, "The convention as built"; `compile-ladder/rung-first-run-one-library/REPORT.md`, "The run tests (a point to report)"; `reviews/batch-33b-review.md`, section 2, G.worker.1.

History blocks of the range:

- Written by the gather: 2026-11-21 00:08Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The run tests (a point to report)" · by climb batch 34b gather: the run of a varargs call measured (cites [S13])

Report sections that the entry cites: [S14] `compile-ladder/rung-varargs/REPORT.md`, "The convention as built"; [S13] `compile-ladder/rung-first-run-one-library/REPORT.md`, "The run tests (a point to report)".

## F-396, added

- Size: at the base none; at the landing 1639 characters; now 1639 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-396 **The one library compiles to jars and runs on the compiled path, over a second set of run-time classes.** Under `FORTRESS_LIBRARY=one` the onelibrary track compiles the one library's fourteen components first, in one `.test` (`OneLibraryJUTest.java:44`), and a program compiled against them runs with the JVM's verifier on, as `Hello` does. The run time's classes that name a library's types come in two sets under one set of names: `ProjectFortress/build` for the prelude, and `ProjectFortress/build-one`, built from `ProjectFortress/src-one` by the same `ant compileAll` and covered by its stamp, for the one library, which `bin/fortress_classpath` and the track put first under the selection. The one library's seven number types, `Boolean`, `Char` and `FlatString` are objects whose classes the code generator writes over payload classes (`NamingCzar.java:637-655`), all value objects but `FlatString`, a reference object (`Library/FlatString.fss:32`), and a helper's raise names its exception by its simple name, which each set's `LibraryNames` maps to its library's class. So a program against the one library meets the code generator's own walls: a varargs call (row 1091), a reduction over a range (row 1099), `println` of a number (row 1098), `=` of two strings or two booleans (row 994); and the library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first. Tests: `one_library_tests/OneLibraryComponents.test`, `OneLibraryRunHello.test`, `OneLibraryCatchHelperRaises.test`. Detail: `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".

History blocks of the range:

- Written by the gather: 2026-11-21 00:07Z · added · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)" · by climb batch 34b gather (cites [S5])
- Written by the merged-diff review: 2026-11-21 00:49Z · rewritten · from `explorations/compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)" · by climb batch 34b merged-diff review: FlatString is a reference object over its payload class, not a value object (Library/FlatString.fss:32) (cites [S5])

Report sections that the entry cites: [S5] `compile-ladder/rung-first-run-one-library/REPORT.md`, "The design as built (a point to report)".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/compile-ladder/rung-first-run-one-library/REPORT.md, "The stages (a point to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-first-run-one-library/REPORT.md#The stages (a point to report)'`

explorations/compile-ladder/rung-first-run-one-library/REPORT.md:99-108, 2374 bytes.

~~~~
## The stages (a point to report)

Both ran once on f3439cf7ce, after its build; no code changed after.

- The count, `explorations/coordinator/tools/checker-count/run.sh tmp/.../checker-count-postedit.txt tmp/.../cc-post`: `diff` against `explorations/compile-ladder/climb-batch-34/gate/checker-count.txt` prints nothing; '#crash none'.
- The distance, `explorations/coordinator/tools/distance/run.sh ...`: `compare.sh` against `explorations/compile-ladder/climb-batch-34/gate/distance.txt` prints 'DISTANCE SAME   0'; the tables differ only in their `#seconds` (206 against 200) and `#machine` lines; `dist-post/errors.tsv` holds no site, as `explorations/compile-ladder/gate/distance-sites.tsv` holds none: no site moved. The stage checks, and the edit's tables enter the compile's descriptors only under the selection, which the stage does not set.

The planner's measure (`plan-25/probes/codegen.sh`, as `plan-31/probes/planner/codegen-measure.sh` runs it) on a scratch worktree seeded at f3439cf7ce and built, with `FORTRESS_LIBRARY=one` exported, since the edit's rows stand only under the selection: without the planner's patch, 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', 'rc=0 seconds=218'. With it: `git apply --check measure-hacks.patch` fails on `NamingCzar.java`, `FortressMethodAdapter.java` and `Naming.java`, whose hunks are this rung's pieces; with its one hunk that applies, the trait table's search (`TraitTable.scala`), the same, 0 refused, 754 emitted, 'rc=0 seconds=217'. The planner's before, with the patch on 285efad802: 0 and 754 (`plan-34/probes/measure-285efad802.txt`).

The ladder subset: the two files whose baseline first error names what the change touches, the rendering of an uncaught exception by `FException` and `FValue.asString`: `tests/XXXcaseTest.fss` and `tests/XXXtypecaseTest.fss` (`baseline-2026-09-19/ladder.tsv:158`, `:190`), neither in the gate's 85. After the edit, `XXXcaseTest` reaches the run with the baseline's first error, 'FortressException: class fortress.CompilerLibrary$MatchFailure with string Match failure'; `XXXtypecaseTest` stops at the type check, 'The typecase clause, String, is unreachable.', where the baseline ran it; the base's code refuses it alike (`old-fortress.sh ... compile XXXtypecaseTest.fss`), so the move is not this change's (row 1081's refusal, landed before).
~~~~

## [S2] explorations/compile-ladder/plan-34/probes/rehearsal.md, "3. The walls, in the order met"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-34/probes/rehearsal.md#3. The walls, in the order met'`

explorations/compile-ladder/plan-34/probes/rehearsal.md:35-43, 3782 bytes, cut at 2500.

~~~~
## 3. The walls, in the order met

1. **Row 818, at the library's compile.** `String` stops: 'Can't compile a dispatched call whose arguments are not all type assumptions node = concatAndBalanceIfNecessary' (`Library/String.fss:67:41-66`). The whole component writes no usable jar. F-34's measure counts `String` as 0 refused: the measure's driver does not reach this form, so the measure's 1 is not the real compile's count, which is 2 (rows 1076 and 818). Row 818's test `XXXAsIfPartialCallCompiled` holds the form against the prelude. **Belongs in the batch:** it stands between the fourteen jars and `Hello`.
2. **Row 1078, at `Hello`'s run with the verifier on.** 'VerifyError: Bad local variable type ... fortress/FortressLibrary.simplestRationalBetween(...) @1297: aload ... Type top (current frame, locals[8]) is not assignable to reference type', as `FortressLibrary`'s class loads, so every program dies. ASM's verifier finds the same method, a local unset on one path (instruction 778). Two copies of the function's shape against the prelude, with `ZZ32` for `QQ` (`programs/LabelLocals3.fss`, `LabelLocals4.fss`), compile, verify and run; so its test needs the one library. **Belongs in the batch:** the gate's runs have the verifier on.
3. **Fork N4, at `Hello`'s run with the verifier off.** 'java.lang.Error: The number type ZZ of the library that the compiled path reads is not compiled over com.sun.fortress.compiler.runtimeValues.FZZ' (`LibraryNames.java:39`, from a numeral's initialiser, `FortressLibrary.fss:722`), as F-388 and rung N's report say. **The carriers' rung.**
4. **A new row, at `FlatString`'s compile once `FlatString` is a payload object.** 'Can't compile the number type FlatString as a value yet node = FlatString.FlatString' (`Library/FlatString.fss:29:12-20`, `ignore(FlatString)`; row 1082's message). The line is walk's: without it, walk's `Hello` dies, 'NullPointerException: ... the return value of "...FNativeObject.getConstructor()" is null', since walk's native `FlatString` sets the strings' constructor only when the object's name is evaluated (`interpreter/glue/prim/FlatString.java:32-35`). The team wrote it as `FlatString;` (Chase, `5a68404fdf`, 2012); the revival respelled it `ignore(FlatString)` (`1e176516cf`). **The carriers' rung**, which must free walk of the line or compile the name: section 3 of the record's fork C4.
5. Past these, **`Hello` runs**, with the verifier off, then, past row 1078's stand-in, with it on: `Hello, one library
~~~~

## [S3] explorations/compile-ladder/plan-31/PROBES.md, "3. The measure: the declarations of the fourteen components that the code generator refuses"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/PROBES.md#3. The measure: the declarations of the fourteen components that the code generator refuses'`

explorations/compile-ladder/plan-31/PROBES.md:38-63, 1949 bytes.

~~~~
## 3. The measure: the declarations of the fourteen components that the code generator refuses

Two runs of F-34's probe, `compile-ladder/plan-25/probes/codegen.sh`, in the planner's worktree.

On the tree unchanged, 133 s:

    refused declarations 11 | emitted (OK lines) 185 | component failures 0     kinds 6
    FortressLibrary, FortressBuiltin and FlatString are refused whole at row 874 and are not in the table

The rehearsal's way, by `probes/planner/codegen-measure.sh`, which applies `measure-hacks.patch` (the rehearsal's naming tables and converters, its trait-table search) and sets `NN32`'s two getters, builds, and runs the same probe, 159 s:

    refused declarations 24 | emitted (OK lines) 745 | component failures 0
      FortressLibrary 12, List 4, String 4, CovariantCollection 1, OneShotFlag 1, FlatString 1, Stream 1
    kinds 8
      7  Can't compile VarArgs yet  [String 3, FortressLibrary 2, List 1, FlatString 1]
      4  Can't compile Label  [FortressLibrary 3, String 1]
      4  <X> is not in the kind env  [List 2, FortressLibrary 1, CovariantCollection 1]
      4  Error trying to close method scope  [FortressLibrary 4]
      2  java.util.zip.ZipException: duplicate entry: <closure class>  [FortressLibrary 1, List 1]
      1  ClassCastException: IntersectionType to NamedType  [FortressLibrary 1]
      1  OptionUnwrapException at edu.rice.cs.plt.tuple.Null.unwrap:58  [Stream 1]
      1  Can't compile AtomicExpr  [OneShotFlag 1]

It is the rehearsal's 24 in 8 kinds. The rehearsal emitted 749: its scratch library held six more declarations, the carrier objects of its hack 4, which this measure does not apply. The script edits and builds the worktree that it is given, so it takes a scratch worktree.

The count sees a declaration at its first wall. It does not see row 990's methods (244 in 27 classes by the rehearsal), row 991's casts or rows 992 and 732: those classes are emitted and fail when they load.
~~~~

## [S4] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

`facts-extract.sh 'doc:.claude/skills/coordinator/references/batch.md#The checker count and the distance'`

.claude/skills/coordinator/references/batch.md:58-65, 844 bytes.

~~~~
## The checker count and the distance

Until the switch-over lands, the gate of every batch reports the checker count and the distance. Neither turns the gate red.

- If a rung's test is the checker count or the distance, it takes the last landed gate's tables as its starting values.
- If every file that a rung changes lies outside what the two measures read, the rung runs neither and lists those files (`STAGE_BLIND`). Its skeptic checks the list against the branch's diff.
- The review after the batch ties every new or risen row of the count's table to a named rung edit.
- The gate's comparisons hide Java line numbers, identity hashes and moved library positions. Put every difference that they hid on the review list. Put there too each line of the team's tests that a rung rewrote to keep its checked value, with its before and after.
~~~~

## [S5] explorations/compile-ladder/rung-first-run-one-library/REPORT.md, "The design as built (a point to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-first-run-one-library/REPORT.md#The design as built (a point to report)'`

explorations/compile-ladder/rung-first-run-one-library/REPORT.md:17-25, 4795 bytes, cut at 2500.

~~~~
## The design as built (a point to report)

- **The second set and how the class path chooses it.** `ProjectFortress/src-one` holds `FBoolean`, `FCharacter`, `FJavaString` (payload classes over `boolean`, `int`, `String`), `FJavaBufferedReader`, `FJavaBufferedWriter`, `FJavaArrayStore`, `FJavaRR64ArrayStore` (each over the one library's trait, its Java value in a field), `FValue`, `MutableFValue` and `FException` (the first set's, `asString` typed at `FValue`), `LibraryNames`, and `fortress/FortressLibrary.java`, a stub of the four traits that those classes extend. `ant compileAll` compiles it into `ProjectFortress/build-one` after the first set, and whole again when the first set changed (`build.xml:853-872`); the stamp of the implementation and the sources' fingerprint cover both folders (`build.xml:402`, the two macros), and `ant clean` deletes it. `bin/fortress_classpath:27-39` puts `build-one` before `build` where `FORTRESS_LIBRARY=one`, so the compile, the run (`bin/run_classpath` builds on it) and `junit.sh` pick it; the onelibrary track's JVM takes it by `fastTrack`'s new attribute `classesFirst` (`build.xml:1236-1251`, `:1180`, `:1310`). At a run the jars come first (`bin/run_classpath`), so the stub's classes give way to `FortressLibrary`'s.
- **The payload table's rows** (`NamingCzar.java:637-655`): the prelude's seven as before, and `FortressLibrary`'s `ZZ32`, `ZZ64`, `ZZ`, `NN64`, `RR64`, `FortressBuiltin`'s `NN32`, `RR32`, `Boolean` (payload `Z`), `Char` (`I`), and `FlatString`'s `FlatString` (`Ljava/lang/String;`). A lookup answers only a row of the library that the compile reads, FlatString counted as one of the one library's apis under the selection (`:661-675`).
- **The carried types' rows** (`NamingCzar.java:612-624`): under the selection only, since each row also enters the bare name: `FortressLibrary`'s five numbers, `JavaBufferedReader`, `JavaBufferedWriter`, `JavaArrayStore`, `JavaRR64ArrayStore`, `FortressBuiltin`'s `Char` and `FlatString`'s `FlatString` (`Boolean`, `NN32`, `RR32` are `fortLib`'s rows there). The run's copy is `runtimeSystem/Naming.java:307-322`, keyed by library. A carried parent of an `extends` clause is named by its interface (`NamingCzar.java:911`), for `FortressBuiltin`'s private objects below `JavaArrayStore` and `JavaBufferedReader`.
- **The names that the second set's LibraryNames gives** (`ProjectFortress/src-one/com/sun/fortress/compiler/runtimeValues/LibraryNames.java`): `fortress.FortressBuiltin$NN32`, `
~~~~

## [S6] explorations/compile-ladder/plan-31/probes/switch-rehearsal.md, "2. The walls, in the order met"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/switch-rehearsal.md#2. The walls, in the order met'`

explorations/compile-ladder/plan-31/probes/switch-rehearsal.md:22-161, 20760 bytes, cut at 2500.

~~~~
## 2. The walls, in the order met

Each wall has: what fails, its kind and count, the ledger row that holds it or "no row", the hack, and what a real repair needs.

### W1. No jar of the library exists (the run)

`fortress run Hello`:

    Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
    Caused by: java.io.IOException: Resource not found : fortress/FortressLibrary$String.class

Nothing compiles the library's components for a program: each must be compiled by name, as the library order does for the prelude today. Not a defect; the switch-over's library order is fourteen compiles (section 4) in place of five. No row; the plan's names line does not state the new library order.

### W2. The wrappers of the helper classes (row 874)

`fortress compile LibraryBuiltin/FortressBuiltin.fss`:

    java.lang.RuntimeException: Can't generate header for method floatToString with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String

Row 874 holds it, as PLAN's N5 says. It is not one table but the question of which run-time class carries each of the one library's built-in types on the compiled path. The record does not hold that design; PLAN names only `FlatString`'s carrier as unmeasured. What the hack had to decide (all of it `SWITCH HACK`):

- `NamingCzar`'s table of types that a hand-written class carries, and `Naming`'s copy of it for the run: `FortressLibrary`'s `ZZ32`, `ZZ64`, `RR64`, `NN64`, `ZZ`, `JavaBufferedReader`, `JavaBufferedWriter` to `FZZ32`, `FZZ64`, `FRR64`, `FNN64`, `FZZ`, `FJavaBufferedReader`, `FJavaBufferedWriter`; `FortressBuiltin`'s `Boolean`, `RR32`, `NN32`, `Char` to `FBoolean`, `FRR32`, `FNN32`, `FCharacter`; `FlatString`'s `FlatString` to `FJavaString`.
- The wrapper generator's converters (`FortressMethodAdapter`): a helper's Java `String` is read as the trait `String`, which no class carries (a `CatString` is a `String` too), so the wrapper takes the trait's interface and casts to `FJavaString`; a new converter. A helper's Java `Object` at `Any` had no converter either ('stripped = AnyType$Any', met at `arrayOps.get`); a second new converter.
- The array stores (met as its own failure, 'Can't generate header for method make with jvm desc =Lcom/sun/fortress/compiler/runtimeValues/FortressArrayStore; stripped = FortressLibrary$JavaArrayStore'): `FortressArrayStore` and `FortressRR64ArrayStore` are plain Java classes outside the Fortress hierarchy, so `JavaArrayStore` and `JavaRR64ArraySto
~~~~

## [S7] explorations/compile-ladder/plan-31/probes/model-closure-check.md, "4. The checker's time for one program"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/model-closure-check.md#4. The checker's time for one program'`

explorations/compile-ladder/plan-31/probes/model-closure-check.md:60-68, 565 bytes.

~~~~
## 4. The checker's time for one program

In a fresh JVM, the checker through the type check, on a one-line program (`run(): () = println "hello"`):

- against the one library, cold caches: 17 s;
- against the one library, a new program on warm caches: 1.1 s;
- against the prelude, `fortress typecheck`, warm caches: 1.3 s.

One run each, at loads of 1.7 to 2.4. So once the library's apis are in the caches, a program's check costs the same under either library. Code generation, the link and the run were not timed: the one library does not emit yet (section 5).
~~~~

## [S8] explorations/compile-ladder/rung-first-run-one-library/SKEPTIC.md, "What I tried and left: fork C3 in the second set"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-first-run-one-library/SKEPTIC.md#What I tried and left: fork C3 in the second set'`

explorations/compile-ladder/rung-first-run-one-library/SKEPTIC.md:42-46, 1683 bytes.

~~~~
## What I tried and left: fork C3 in the second set

The worker typed the second set's `FValue.asString` and `MutableFValue.asString` at `FValue`, fork C3's text, and kept the first set's at the prelude's `String`, because typing it at `FValue` there made `compiler_tests/Compiled17a` die: generic code calls a number's getter on the payload class, and `FZZ32.asString`'s bridge answers the first set's type. The same holds in the second set: there is no `FZZ32.asString()` at `fortress.FortressLibrary$String` (1101), and the generated getter `asString` of a one-library object, at the library's `String`, overrides nothing in the second set's `FValue`, so `FException` and every `toString` read the placeholder (1102).

In scratch (`javac` of the second set's `FValue`, `MutableFValue` and `FException` with `asString` typed at `fortress.FortressLibrary.String`, put before `build-one` on a hand-made run class path), `OneGenericAsString` printed '<5>' and `OneUncaught` 'with string Integer Overflow'; but a program that catches `fail` of a 481-character string then died, 'java.lang.StackOverflowError', where the head prints 'caught FailCalled 487': a `CatString`'s `asString` is itself (`Library/FortressLibrary.fss:4599`), so `FValue.toString`, `this.asString().toString()`, recurses, as row 321 recurses in the prelude. So the second set under the first set's map of names is not enough; a repair chooses among ways (a `toString` that reads a non-flat string, or the code generator calling a number's getter through the object's class, the worker's second question). Nothing on record settles it, so I made no fix: the defects have homes, and the question is for the curator.
~~~~

## [S9] explorations/compile-ladder/plan-31/probes/probe-y.md, "1. What ran"

`facts-extract.sh 'doc:explorations/compile-ladder/plan-31/probes/probe-y.md#1. What ran'`

explorations/compile-ladder/plan-31/probes/probe-y.md:11-48, 3353 bytes, cut at 2500.

~~~~
## 1. What ran

All in `/home/user/fortress-probe-y`, after one `ant compileAll` (43 s, `BUILD SUCCESSFUL`) and the two library orders (section 5).

The three programs are the rehearsal's by its description (its section 4); its files were not kept, so they were written again. `Hello` is `run(): () = println("Hello, one library")`.

**The prelude** (no variable set, the tree's own `default_repository/caches`):

    $ ../../bin/fortress compile Hello.fss ; ../../bin/fortress run Hello
    Hello, one library                         (both exit 0)
    $ ../../bin/fortress compile Arr.fss
    Arr.fss:5:6-10: Array1 is undefined.       (exit 255; Dot.fss alike, 2 errors)

`Arr` and `Dot` cannot compile against the prelude in any build: it has no array type (row 305).

**The one library** (`FORTRESS_LIBRARY=one`, `FORTRESS_CACHES=<tree>/default_repository/caches-one`, and for each run the rehearsal's flags that switch the verifier off, its W7):

    $ ../../bin/fortress compile Hello.fss ; ../../bin/fortress run Hello
    Hello, one library
    $ ../../bin/fortress compile Arr.fss ; ../../bin/fortress run Arr
    a[5] = 25
    $ ../../bin/fortress compile Dot.fss ; ../../bin/fortress run Dot
    dot = 499500.0                             (every command exit 0)

With `-verbose:class`, the prelude's run of `Hello` loads no class whose name holds `FortressLibrary`, `FortressBuiltin` or `FlatStringC`, and the one library's run loads none whose name holds `CompilerBuiltin` or `CompilerLibrary` (each count 0).

**Through the harness, against the one library.** Three `.test` files (`link`, `run`, `run_out_contains=` the line above) for the three programs, in one `fortress junit` run with the same three settings:

    . run .../ArrOne (1375ms) a[5] = 25
    . run .../DotOne (1826ms) dot = 499500.0
    OK (6 tests)                               (16 s)

**Through the harness, against the prelude, in the same build** (`ONE_JVM=1 explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh`, on `ProjectFortress/compiler_tests`):

- Twelve files chosen for what the second set touches (helpers that raise, the `NN32`, integer, `Char` and `asFloat` helper families, a caught `FileNotFoundException`, two `atomic` tests, one refusal of the code generator): `OK (22 tests)`.
- Every seventh file of the folder's sorted list, 125 files: `Tests run: 205, Failures: 4`. The four are `XXXFortToStringRungS`, `XXXGenericFunctionalMethodSelfSecond`, `XXXGenericTraitGenericFunctionalMethod` 
~~~~

## [S10] explorations/compile-ladder/rung-first-run-one-library/REPORT.md, "The tests: the failing runs on the base, the passing run"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-first-run-one-library/REPORT.md#The tests: the failing runs on the base, the passing run'`

explorations/compile-ladder/rung-first-run-one-library/REPORT.md:27-73, 4636 bytes, cut at 2500.

~~~~
## The tests: the failing runs on the base, the passing run

The base's code is a1c244be36 (285efad802's code). Each call set up as `build-and-caches.md` says, with `FORTRESS_LIBRARY=one ONE_JVM=1` exported.

Call 1, `explorations/compile-ladder/climb-batch-N/merged-tests/junit.sh base14 ProjectFortress/one_library_tests OneLibraryComponents.test`:

    Expected failure: the compiles of FortressBuiltin, FlatString and FortressLibrary red, each with 'java.lang.RuntimeException: Can't generate header for method <m> with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String' (floatToString for FortressBuiltin) and 'File <C>.fss has 1 error.', reported as 'Must satisfy FAIL or fail should not appear in output compile' (row 874); the other eleven compiles OK

    . compile ProjectFortress/one_library_tests/../LibraryBuiltin/FortressBuiltin java.lang.RuntimeException: Can't generate header for method floatToString with jvm desc =Ljava/lang/String; stripped = FortressLibrary$String
    File FortressBuiltin.fss has 1 error.
    1) ProjectFortress/one_library_tests/../LibraryBuiltin/FortressBuiltin(com.sun.fortress.tests.unit_tests.FileTests$CommandTest)junit.framework.AssertionFailedError: Must satisfy FAIL or fail should not appear in output compile
    Tests run: 14,  Failures: 3,  Errors: 0

FortressLibrary and FlatString failed alike, each naming `floatToString`.

Call 2, `junit.sh basehello ProjectFortress/one_library_tests OneLibraryRunHello.test`:

    Expected failure: OneLibraryRunHello's compile OK, its run red: 'Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String' and 'Failed to satisfy run_out_contains; expected Hello, one library' (row 1062)

    . compile ProjectFortress/one_library_tests/OneLibraryRunHello  OK (time = 1420ms)
    . run ProjectFortress/one_library_tests/OneLibraryRunHello (215ms) Exception in thread "main" java.lang.NoClassDefFoundError: fortress/FortressLibrary$String
    Failed to satisfy run_out_contains; expected
    Hello, one library

Call 3, the three run tests promoted for the run (renamed without `XXX`, checks the walk's output) and the catch test, `junit.sh baseruns ... OneLibraryHalf.test OneLibraryRunHalf.test OneLibraryVarargsCount.test OneLibraryRunVarargs.test OneLibraryConditionalReduction.test OneLibraryRunConditionalReduction.test OneLibraryCatchOverflow.test`:

    Expected failure: the four compiles OK; the four runs (OneLibraryRunHalf, OneLibraryRunVarargs, OneLibra
~~~~

## [S11] explorations/compile-ladder/rung-library-selector/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-library-selector/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-library-selector/REPORT.md:15-57, 6225 bytes, cut at 2500.

~~~~
## What changed and why

**The selector** (fork S1). `ProjectProperties.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/repository/ProjectProperties.java:283-291`) is true where the property `fortress.library`, or else the environment variable `FORTRESS_LIBRARY`, is `one`, read once when the class loads, as probe Y read it (`probe-y.patch:683-684`). Any other value, or none, is the prelude. `WellKnownNames.compiledPathUsesOneLibrary` (`ProjectFortress/src/com/sun/fortress/compiler/WellKnownNames.java:143-150`) gives it to the compiler. `Shell.useCompilerLibraries()` (`ProjectFortress/src/com/sun/fortress/Shell.java:373-388`) points `WellKnownNames` and `Types` at `FortressLibrary`, `FortressBuiltin` and `AnyType` where it is set, and at the prelude's names where not; the desugaring switches stay the compile command's. Nothing of the code generator follows it (`NamingCzar`, `CodeGen`, `runtimeValues/` unchanged).

The commands that follow it are those that call `useCompilerLibraries()` (`Shell.java:414-502`): `compile`, `link`, `build`, `api`, `compare`, `parse`, `unparse`, `disambiguate`, `desugar`, `grammar`, `typecheck`, `test-coercion`, `help` and the usage message, and `junit`, whose compiles and links go through `subMain`. `fortress run` follows it through the class path script's caches folder only (below). Walk, `test` and `typecheck-old` keep reading the interpreter's library; under the selection they keep their caches in the selection's folder too, since `ProjectProperties.CACHES` is one value for the JVM:

    FORTRESS_LIBRARY=one bin/fortress tests/BooleanOps.fss          (from ProjectFortress/)
    rc=0
    ls ../default_repository/caches-one/interpreter_cache | grep -c BooleanOps
    1

**The caches folder** (fork S2). `ProjectProperties.CACHES` (`ProjectProperties.java:293-302`) is the folder that the property `fortress.caches` or `FORTRESS_CACHES` names; else, under the selection, `${REPOSITORY}/caches-one`; else, as before, the configuration's `${FORTRESS_REPOSITORY}/caches`. `bin/fortress_classpath:25-31` and `bin/run_classpath:25-31` take the same default from `FORTRESS_LIBRARY`. `build.xml` gives the folder the stamp of `cache0` and `cache1`: the property `cacheOne` (`build.xml:44-47`), `cleanCache` (`:367`, `:376`), `checkCaches` (`:531-534`, `:553-558`, `:565`) and the end of `compileAll` (`:863`). `.gitignore:28-29` ignores the folder; without it every build would leave an untracked folder, and a base build whose `gi
~~~~

## [S12] explorations/compile-ladder/rung-number-payload-objects/REPORT.md, "The design as built (a point to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-number-payload-objects/REPORT.md#The design as built (a point to report)'`

explorations/compile-ladder/rung-number-payload-objects/REPORT.md:40-46, 1684 bytes.

~~~~
## The design as built (a point to report)

- **The payload classes:** `FZZ32`, `FZZ64`, `FZZ`, `FNN32`, `FNN64`, `FRR32`, `FRR64` in `compiler/runtimeValues/`, each `abstract` over `FValue`, holding `int`, `long`, `BigInteger` (made from its digits), `int`, `long`, `float`, `double`.
- **The table of payload objects:** `NamingCzar.payloadObjects` (`NamingCzar.java:615-623`), seven rows of the prelude's api `CompilerBuiltin`.
- **What the code generator writes for such an object:** a final class `fortress/CompilerBuiltin$T` extending the payload class and implementing the traits of its `extends` clause and `ValueObjectMark`; a constructor `(payload)V`; `static make(payload)` answering the payload class's type; forwarders for every trait's bodies; its own methods as instance methods; `getRTTI()` and the static `RTTI` field; an RTTI class whose `javaRep` is the object's class and whose `className()` names the payload class.
- **How Java code makes a value:** `FZZ32.make(int)` (and its siblings), which the wrapper generator (`compiler/nativeInterface/FortressMethodAdapter.java:139-155`), the helpers and the class loader's sizes (`FZZ32.makeSize`) call, reaches `fortress.CompilerBuiltin$ZZ32.make` through the method handle that `LibraryNames.factory` finds, by name, with the payload class's loader, without initialising the class.
- **The one name of a payload object's type:** the payload class, `com/sun/fortress/compiler/runtimeValues/FZZ32`, in every descriptor, in every stamped instance (`Box⟦com|sun|fortress|compiler|runtimeValues|FZZ32⟧`) and in the RTTI's `className()`. Only the class that holds the methods and the static `RTTI` field is the object's.
~~~~

## [S13] explorations/compile-ladder/rung-first-run-one-library/REPORT.md, "The run tests (a point to report)"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-first-run-one-library/REPORT.md#The run tests (a point to report)'`

explorations/compile-ladder/rung-first-run-one-library/REPORT.md:81-91, 2002 bytes.

~~~~
## The run tests (a point to report)

- **Hello**, `OneLibraryRunHello.test`: new, failing on the base and passing after, with the verifier on: 'Hello, one library'.
- **The helpers' raises**, `OneLibraryCatchHelperRaises.test`: new; passes: `IntegerOverflow` from `ZZ32`'s `+` and `FileNotFoundException` from `makeJavaBufferedReader` are caught.
- **Varargs**, `XXXOneLibraryRunVarargs.test`: still an expected failure, its check now `run_out_contains=REACHED`: the class of the arguments' array does not load, 'ClassFormatError: Duplicate method name "copy" ... in class file fortress/FortressLibrary$\=ImmutableArray1?...FZZ32,0,1?$DefaultTraitMethods' (row 1091, rewritten to hold `ImmutableArray1`'s `copy`); with the verifier off it dies at row 994, `|xs|`.
- **The conditional reduction**, `XXXOneLibraryRunConditionalReduction.test`: still an expected failure after REACHED: 'ClassFormatError: Duplicate method name "narrowToRange"' in `RangeInternals$FullScalarRange$DefaultTraitMethods` (1099); with the verifier off, row 994.
- **The half**, `XXXOneLibraryRunHalf.test`: still an expected failure after REACHED: `println(q)` at a `QQ` names `FortressLibrary.println(fortress.FortressLibrary$Number)`, which the component lacks, 'NoSuchMethodError' (1098).

Each of the three was renamed without `XXX` before the edit and seen failing on the base (call 3), then, failing at these walls after the edit, given back its name (fork C6). Their programs did not change.

The varargs indices and the numerals (item 601): with the carried rows, the one library's `ZZ32` is `FZZ32` in every descriptor, so `FZZ32.make` at `CodeGen.java:8014-8015`, `:4676-4677` and `:4717-4718` agrees with the array's `init`; with the verifier off, a scratch program `first(xs: ZZ32...) = xs[0]`, `third(...) = xs[2]` printed 7 and 9 for `(7, 8, 9)` (`bin/fortress run VarargsFirst`, `FORTRESS_LIBRARY=one`, `-XX:-BytecodeVerificationRemote`); with it on, row 1091. No edit of `CodeGen.java`, so no shadow patch run.
~~~~

## [S14] explorations/compile-ladder/rung-varargs/REPORT.md, "The convention as built"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-varargs/REPORT.md#The convention as built'`

explorations/compile-ladder/rung-varargs/REPORT.md:22-57, 4462 bytes, cut at 2500.

~~~~
## The convention as built

- **The JVM parameters of a varargs declaration**: its plain parameters, then one parameter of the descriptor of `ImmutableArray[\T, ZZ32\]` of the library in use. From `javap -c -p` on `one_library_tests/OneLibraryVarargsCount`'s jar:

      public static fortress.FortressLibrary$ZZ32 count(fortress.FortressLibrary$\=ImmutableArray?fortress\|FortressLibrary\%ZZ32,fortress\|FortressLibrary\%ZZ32?);

  A trait's method has the same parameter in its interface, its default body and its forwarders (`OneLibraryVarargsMethod$Tagger`, `$Tagger$DefaultTraitMethods`):

      public abstract fortress.FortressLibrary$ZZ32 tag(fortress.FortressLibrary$String, fortress.FortressLibrary$\=ImmutableArray?fortress\|FortressLibrary\%ZZ32,fortress\|FortressLibrary\%ZZ32?);
      public static fortress.FortressLibrary$ZZ32 tag(OneLibraryVarargsMethod$Tagger, fortress.FortressLibrary$String, fortress.FortressLibrary$\=ImmutableArray?...);

- **Where the array is made**: at the call, where the name has no other declaration of the call's number of arguments; in the dispatch method's branch for the varargs declaration, where it has one.
- **How a call of each arity reaches the varargs declaration** (`one_library_tests/OneLibraryVarargsOverloaded`, `check(Boolean)`, `check(Boolean, String)`, `check(Any, Any, Any...)`, and the library's `assert` of the same three shapes): `check(z, z)` calls the dispatch method `check(Any;Any)`, which tests `FBoolean` and `String` and otherwise makes an empty array and calls `check(Any;Any;ImmutableArray)`; `check(z, z, "a")` and `check(z, z, "a", z)` make arrays of one and two and call `check(Any;Any;ImmutableArray)`; `check(b, "m")` calls `check(FBoolean;String)`. The library's `assert(z, z)` calls `FortressLibrary.assert(Any;Any)`, the dispatch method that `FortressLibrary` writes at two arguments; `assert(z, z, "a")` makes its array at the call. From the same `javap`:

      static check(fortress.AnyType$Any, fortress.AnyType$Any): instanceof FBoolean ... invokestatic check:(LFBoolean;Lfortress/FortressLibrary$String;) ... invokeinterface "\=Arrow??,...ImmutableArray1?fortress\|AnyType\%Any,0,0??".apply ... invokestatic check:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;Lfortress/FortressLibrary$\=ImmutableArray?...;)
      251: invokestatic  #201  // Method fortress/FortressLibrary.assert:(Lfortress/AnyType$Any;Lfortress/AnyType$Any;)Lcom/sun/fortress/compiler/runtimeValues/FVoid;
      296: invokestatic  #229  // M
~~~~

<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 639eef180..f7c6c2cae added, changed or removed (the batch 34, landed at 285efad80, and the landing's own steps to f7c6c2cae), written by evidence.py. -->

# The entries that the range changed

- The batch, 639eef180..285efad80: 13 entries: F-34, F-53, F-240, F-268, F-302, F-315, F-325, F-352, F-369, F-392, F-393, F-394, F-395
- After the landing, 285efad80..f7c6c2cae: 0 entries
- Now over 600 characters: 12 of 13: F-34, F-53, F-240, F-302, F-315, F-325, F-352, F-369, F-392, F-393, F-394, F-395

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-34, changed

- Size: at the base 2525 characters; at the landing 3015 characters; now 3015 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-34 **Against the interpreter's library, on the code of `ba3c7c876d`, the code generator refuses 2 declarations of the fourteen components that the distance stage checks, both of which the checker passes; the measure's script counts 1 of them, and the count can be taken only on a patched tree.** The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. Without the patch, the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes (row 874), so the measure's script first patches a scratch worktree (`compile-ladder/plan-31/PROBES.md` gives the patch). Then: 1 refused, 753 emitted, no component failure: `FortressLibrary`'s `__bigOperator2`, a generic method called on a receiver typed by a type variable (row 1076). The measure's driver does not reach a second: compiled whole under the selector, `String` stops at `concatAndBalanceIfNecessary`'s call with a type assumption at one of its two arguments (`Library/String.fss:67`, `:69`), 'Can't compile a dispatched call whose arguments are not all type assumptions' (row 818), so the real compile refuses 2. On the code of `d3747846c1` the count was 13 in 4 kinds, with 745 emitted; the other 12 stopped at varargs, in two kinds (row 624), or at a closure class written twice (row 315), and both rows are fixed since (F-390, F-389). On the code of `c3b16ef2d1` the count was 17 in 5 kinds, with 742 emitted. The sums differ from code to code, since the earlier files also counted as emitted an object that its pre-pass refused. A declaration counts at its first wall, and some hold a second. The measure skips the dispatch methods, and it sees no class that is emitted and fails when it loads. No emitted class of the measure is run, and no test checks the count, since the gate's distance stage runs no code generation. So after the switch-over the code generator still stands between the library and bytecode. Measured once on each code. Command: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Detail: `compile-ladder/plan-33/probes/measure-ba3c7c876d.txt`; `compile-ladder/plan-34/probes/rehearsal.md`, "3. The walls, in the order met", 1; `compile-ladder/plan-33/probes/measure-d3747846c1.txt`; `compile-ladder/plan-31/probes/planner/measure-c3b16ef2d1.txt`; `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

Now:

- F-34 **Against the interpreter's library, the code generator refuses none of the declarations of the fourteen components that the distance stage checks, by the measure's script on the code of climb batch 34's rung T (`38d8a44e56`) and by `String`'s compile under the selector on that of its rung P (`a95eb01926`); the count can be taken only on a patched tree.** The setting is the distance stage's (F-53): the checker's failures caught per declaration, and the bound `Any`. Without the patch, the code generator stops `FortressLibrary`, `FortressBuiltin` and `FlatString` whole at the wrappers of their helper classes (row 874), so the measure's script first patches a scratch worktree (`compile-ladder/plan-31/PROBES.md` gives the patch). Then, on that code: 0 refused, 754 emitted, no component failure, and `FortressLibrary`'s `__bigOperator2` is emitted (F-392). The measure's driver does not reach `String`, which compiles whole under the selector on rung P's code, its two calls `concatAndBalanceIfNecessary(s1 asif String, s2)` (`Library/String.fss:67`, `:69`) calling the body of `concatAndBalanceIfNecessary(s1: String, s2: String)` directly (F-325). On the code of `ba3c7c876d` the count was 1, with 753 emitted: `__bigOperator2`, a generic method called on a receiver typed by a type variable (row 1076); and the real compile refused 2, since `String` stopped at those two calls, 'Can't compile a dispatched call whose arguments are not all type assumptions' (row 818). On the code of `d3747846c1` the count was 13 in 4 kinds, with 745 emitted; the other 12 stopped at varargs, in two kinds (row 624), or at a closure class written twice (row 315), and both rows are fixed since (F-390, F-389). On the code of `c3b16ef2d1` the count was 17 in 5 kinds, with 742 emitted. The sums differ from code to code, since the earlier files also counted as emitted an object that its pre-pass refused. A declaration counts at its first wall, and some hold a second. The measure skips the dispatch methods, and it sees no class that is emitted and fails when it loads. No emitted class of the measure is run, and no test checks the count, since the gate's distance stage runs no code generation. So after the switch-over the code generator still stands between the library and bytecode. Measured once on each code. Command: `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`. Detail: `compile-ladder/rung-type-variable-receiver/REPORT.md`, "The measure, on a scratch copy of the final tree"; `compile-ladder/rung-partial-assumption/REPORT.md`, "`String` under the selector"; `compile-ladder/plan-33/probes/measure-ba3c7c876d.txt`; `compile-ladder/plan-34/probes/rehearsal.md`, "3. The walls, in the order met", 1; `compile-ladder/plan-33/probes/measure-d3747846c1.txt`; `compile-ladder/plan-31/probes/planner/measure-c3b16ef2d1.txt`; `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

History blocks of the range:

- Written by the gather: 2026-11-20 17:52Z · rewritten · from `explorations/compile-ladder/rung-type-variable-receiver/REPORT.md`, "The measure, on a scratch copy of the final tree" · by climb batch 34 gather: the count on rung T code: 0 refused, 754 emitted (cites [S1])
- Written by the gather: 2026-11-20 17:55Z · rewritten · from `explorations/compile-ladder/rung-partial-assumption/REPORT.md`, "`String` under the selector" · by climb batch 34 gather: String compiles whole under the selector on rung P code (cites [S2])

Report sections that the entry cites: [S1] `compile-ladder/rung-type-variable-receiver/REPORT.md`, "The measure, on a scratch copy of the final tree"; [S2] `compile-ladder/rung-partial-assumption/REPORT.md`, "`String` under the selector"; [S3] `compile-ladder/plan-34/probes/rehearsal.md`, "3. The walls, in the order met"; [S4] `compile-ladder/plan-31/PROBES.md`, "3. The measure: the declarations of the fourteen components that the code generator refuses".

## F-53, changed

- Size: at the base 1377 characters; at the landing 1376 characters; now 1376 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 33b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 34's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-20 19:12Z · rewritten · by climb batch 34 commit stage: climb batch 34's gate: explorations/compile-ladder/climb-batch-34/gate/distance.txt lines #total 0 and #crash none and its first line's 14 components, and checker-count.txt lines #total 0 and #crash none; the title's batch 33b to 34

Report sections that the entry cites: [S5] `references/batch.md`, "The checker count and the distance".

## F-240, changed

- Size: at the base 2202 characters; at the landing 2203 characters; now 2203 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 65 s and its distance stage 117 s at the last landed gate, climb batch 33b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 75 s), over fourteen components, ran at a start load of 0.08, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 137 s (87 s) at 0.50 at climb batch 33's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-33b/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 105 s and its distance stage 200 s at the last landed gate, climb batch 34's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 127 s), over fourteen components, ran at a start load of 0.28, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 117 s (75 s) at 0.08 at climb batch 33b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-34/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-20 19:12Z · rewritten · by climb batch 34 commit stage: count stage about 105 s, from the file times of the gate's log (the count stage's run.txt at 19:10:00 minus its javac.txt at 19:08:15, 105 s); distance stage from compile-ladder/climb-batch-34/gate/distance.txt lines #seconds 200 FortressLibrary 127, #machine load at start 0.28 and its first line's 14 components; by the file times of the gate's log the stage ran 18:43:02 to 18:46:23, beside testFast's first minutes (testFast ended 18:55:00 after 11 min 45 s); compared against climb batch 33b's 117 s (75 s) at 0.08

## F-268, changed

- Size: at the base 598 characters; at the landing 598 characters; now 598 characters.
- Section now: "The checker and the one library".

At the base:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6690-6694`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

Now:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6699-6703`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

History blocks of the range:

- Written by the merged-diff review: 2026-11-20 18:59Z · rewritten · by the merged-diff review of climb batch 34: climb batch 34's merged-diff review: a line citation of CodeGen.java that the batch's hunks (rungs T and P) moved, re-anchored by content to main, from its lines at ba3c7c876d

Report sections that the entry cites: [S6] `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why".

## F-302, changed

- Size: at the base 1278 characters; at the landing 1278 characters; now 1278 characters, over 600.
- Section now: "Execution model".

At the base:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. When the prelude declared its number types as traits, their `+` reached `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. The chains measured are of that form, where the box extended its trait's springboard, and a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5956-5963`). The prelude's box is now the class of its value object, over the payload class `FZZ32`, which extends `FValue` and no springboard (`compiler/runtimeValues/FZZ32.java:22`; F-388), so its constructor chain no longer follows the type's `extends` entries. The depth of the value-object form is not measured. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

Now:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. When the prelude declared its number types as traits, their `+` reached `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. The chains measured are of that form, where the box extended its trait's springboard, and a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5965-5972`). The prelude's box is now the class of its value object, over the payload class `FZZ32`, which extends `FValue` and no springboard (`compiler/runtimeValues/FZZ32.java:22`; F-388), so its constructor chain no longer follows the type's `extends` entries. The depth of the value-object form is not measured. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-20 18:59Z · rewritten · by the merged-diff review of climb batch 34: climb batch 34's merged-diff review: a line citation of CodeGen.java that the batch's hunks (rungs T and P) moved, re-anchored by content to main, from its lines at ba3c7c876d

## F-315, changed

- Size: at the base 1321 characters; at the landing 1321 characters; now 1321 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3373-3375`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars`, which a varargs call stopped, is emitted in F-34's measure, since the code generator compiles varargs under the selection of the one library (F-390). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

Now:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3381-3383`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars`, which a varargs call stopped, is emitted in F-34's measure, since the code generator compiles varargs under the selection of the one library (F-390). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-20 18:59Z · rewritten · by the merged-diff review of climb batch 34: climb batch 34's merged-diff review: a line citation of CodeGen.java that the batch's hunks (rungs T and P) moved, re-anchored by content to main, from its lines at ba3c7c876d

Report sections that the entry cites: [S7] `reviews/batch-25-review.md`, "Where the text, the brief or the principles split".

## F-325, changed

- Size: at the base 1397 characters; at the landing 2580 characters; now 2580 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-325 **The code generator compiles a type assumption at a method call, at a call whose every dispatched argument is an assumption, and as a value; a partial one stays refused.** At a receiver, `(e asif T).m(args)` calls the body that `T` gives `m` as a static method of its trait's `DefaultTraitMethods` class, `self` first; where every dispatched argument of a call is an assumption, the call runs the declaration that the checker resolves, without dispatch; elsewhere the assumption is the value at `T`. A dispatched call with an assumption beside an argument that is not one is refused: 'Can't compile a dispatched call whose arguments are not all type assumptions'; so are a generic method on an assumed receiver and an overloaded generic function under an assumption, each with its own message. Under walk the assumption stays on a bound value (row 919), a tuple under one cannot be taken apart (row 920), and a generic method on an assumed receiver stops (row 922); an overloaded one runs (`tests/AsIfOverloadedMethodWalk`). Source: `compiler/codegen/CodeGen.java`, `forAsIfExpr`, `assumedReceiverCall`, `assumedArgumentsCall`. Tests: `compiler_tests/AsIfCallsCompiled`, `compiler_tests/XXXAsIfPartialCallCompiled`, `compiler_tests/XXXAsIfGenericMethodCompiled`, `compiler_tests/XXXAsIfGenericFunctionCompiled`, `tests/AsIfCallsWalk`. Detail: `compile-ladder/rung-codegen-asif/REPORT.md`.

Now:

- F-325 **The code generator compiles a type assumption at a method call, at a call of an overloaded function of its component, whether at every dispatched argument or some, and as a value; a partial one at a functional method or a dotted call stays refused.** At a receiver, `(e asif T).m(args)` calls the body that `T` gives `m` as a static method of its trait's `DefaultTraitMethods` class, `self` first; where every dispatched argument of a call is an assumption, the call runs the declaration that the checker resolves, without dispatch; where some are, the call of an overloaded function or operator of the component reaches the declarations at or below the resolved one that take each assumed argument at its assumed type and that the other arguments' static types do not exclude, and dispatches among them on the others' run-time types, as walk does: one left, a direct call; else the resolved declaration's dispatch method where it holds the same declarations, or a dispatch method of their own, in a class `<component>$asif@<span>`; elsewhere the assumption is the value at `T`. Refused with 'Can't compile a dispatched call whose arguments are not all type assumptions': a partial call of a functional method, at an assumed receiver of an overloaded method, or at a dotted call's argument, and a partial call whose dispatch of its own would hold a functional method; with messages of their own: a generic declaration at or below the resolved one, a generic method on an assumed receiver, an overloaded generic function. Under walk the assumption stays on a bound value (row 919), a tuple under one cannot be taken apart (row 920), and a generic method on an assumed receiver stops (row 922); an overloaded one runs (`tests/AsIfOverloadedMethodWalk`). Source: `compiler/codegen/CodeGen.java`, `forAsIfExpr`, `assumedReceiverCall`, `assumedArgumentsCall`, `partiallyAssumedCall`; `compiler/OverloadSet.java`, `membersUnderAssumptions`, `generateDispatchAmong`. Tests: `compiler_tests/AsIfCallsCompiled`, `compiler_tests/AsIfPartialCallCompiled`, `compiler_tests/AsIfPartialDispatchCompiled`, `compiler_tests/XXXAsIfPartialMethodCompiled`, `compiler_tests/XXXAsIfPartialReceiverCompiled`, `compiler_tests/XXXAsIfPartialDottedArgCompiled`, `compiler_tests/XXXAsIfPartialGenericCompiled`, `compiler_tests/XXXAsIfPartialWithFunctionalMethodCompiled`, `compiler_tests/XXXAsIfGenericMethodCompiled`, `compiler_tests/XXXAsIfGenericFunctionCompiled`, `tests/AsIfCallsWalk`. Detail: `compile-ladder/rung-partial-assumption/REPORT.md`; `compile-ladder/rung-codegen-asif/REPORT.md`.

History blocks of the range:

- Written by the gather: 2026-11-20 17:55Z · rewritten · from `explorations/compile-ladder/rung-partial-assumption/REPORT.md`, "What changed and why" · by climb batch 34 gather (cites [S8])

## F-352, changed

- Size: at the base 2313 characters; at the landing 2326 characters; now 2326 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-352 **A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks; on `main` the compile command reads the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381).** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 315, 990, 991, 732 and 992 are fixed since, and row 624 under the selection of the one library (F-390). Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874 and 995, row 995 now for the carried types other than the seven number types; row 866 is fixed; the one library's seven are not yet compiled over the payload classes, F-388); the trait table's search by the prelude's api names (row 942, fixed since; the search stays, and no compiled test reaches it, F-391); the dispatch method's package (row 994); `NN32`'s two getters (row 993). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. Measured once; nothing of the scratch tree landed, and no test holds its runs. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

Now:

- F-352 **A compiled program has run against the interpreter's library only in a scratch tree with twelve marked hacks; on `main` the compile command reads the compiler's prelude unless `FORTRESS_LIBRARY=one` selects the one library (F-381).** In that tree, on `832f7d0d91`'s code, two lines of `Shell.useCompilerLibraries()` point the compiled path at the one library, and a one-line program then passes the checker and the code generator. Its run needs the library's fourteen components as bytecode, compiled by name in about 200 s. Three programs ran and printed walk's output: one that prints a line, one that builds and reads an `Array1`, and a dot product in the program's own loop over two `Array1`. Not run: an array of rank 2 or 3 (row 992, fixed since), the library's `DOT` and `SUM` (row 732, fixed since), and microGPT, which the checker stops (F-58). The runs met sixteen walls of two kinds. A test compiled against the prelude can show the first kind: the refusal of varargs (row 624), `label` (row 81), a closure class written twice (row 315), a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732; rows 81, 315, 990, 991, 732 and 992 are fixed since, and row 624 under the selection of the one library (F-390). Only a tree switched onto the one library shows the second kind: which run-time class carries each built-in type, a choice that reaches the code generator's naming (rows 874 and 995, row 995 now for the carried types other than the seven number types; row 866 is fixed; the one library's seven are not yet compiled over the payload classes, F-388); the trait table's search by the prelude's api names (row 942, fixed since; the search stays, and no compiled test reaches it, F-391); the dispatch method's package (row 994); `NN32`'s two getters (row 993, fixed since). Every run had the JVM's verifier off, so the number of emitted methods that the verifier refuses is not known. Measured once; nothing of the scratch tree landed, and no test holds its runs. Detail: `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met", "4. How far each program got" and "6. The walls grouped, against PLAN's phase 4 and phase 5 lines"; `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

History blocks of the range:

- Written by the gather: 2026-11-20 18:04Z · rewritten · commit `51d6c49eb` · by climb batch 34 gather: row 993 closed by climb batch 34 rung G

Report sections that the entry cites: [S9] `compile-ladder/plan-31/probes/switch-rehearsal.md`, "2. The walls, in the order met"; [S10] `compile-ladder/plan-31/probes/model-closure-check.md`, "4. The checker's time for one program".

## F-369, changed

- Size: at the base 1875 characters; at the landing 1875 characters; now 1875 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6899`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). The checker checks a local tuple binding's declared names beside untyped names in the same way (row 1029, fixed; `compiler_tests/LocalTupleBindingMixedTypes`, `XXXLocalTupleBindingMixedRefused`), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

Now:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6908`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). The checker checks a local tuple binding's declared names beside untyped names in the same way (row 1029, fixed; `compiler_tests/LocalTupleBindingMixedTypes`, `XXXLocalTupleBindingMixedRefused`), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

History blocks of the range:

- Written by the merged-diff review: 2026-11-20 18:59Z · rewritten · by the merged-diff review of climb batch 34: climb batch 34's merged-diff review: a line citation of CodeGen.java that the batch's hunks (rungs T and P) moved, re-anchored by content to main, from its lines at ba3c7c876d

Report sections that the entry cites: [S11] `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why".

## F-392, added

- Size: at the base none; at the landing 675 characters; now 675 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-392 **A generic method called on a receiver typed by a type variable compiles.** The code generator reads such a receiver at the variable's bound that declares or inherits the method, the most specific where several do, a `where` clause's bound among them, a method's clause on its trait's or object's static parameter too, and casts it there; the receiver object's own method runs. A bound that is another type variable is not read, since the checker refuses the call first (row 1093). Test: `compiler_tests/TypeVariableReceiverGenericMethod`. Detail: `compile-ladder/rung-type-variable-receiver/REPORT.md`, "What changed and why" and "The owner as found, and the cast".

History blocks of the range:

- Written by the gather: 2026-11-20 17:52Z · added · from `explorations/compile-ladder/rung-type-variable-receiver/REPORT.md`, "What changed and why" · by climb batch 34 gather (cites [S12])

Report sections that the entry cites: [S12] `compile-ladder/rung-type-variable-receiver/REPORT.md`, "What changed and why".

## F-393, added

- Size: at the base none; at the landing 1135 characters; now 1135 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-393 **The code generator keeps a local variable in its environment for the rest of its block only, so a closure or task after an `if` arm or another nested block reads no slot of the block's bindings.** `CodeGen.forLocalVarDecl` adds a declaration's bindings to the environment of its body, after the initializer (`compiler/codegen/CodeGen.java:4822-4828`); before, a binding first in an arm stayed in the enclosing block's environment, and a later local function, function expression or forked call whose body named a variable of that name, its own binding or a numeral's coercion parameter `r` (row 983), captured the arm's slot, unset on the path that skipped the arm: 'VerifyError: Bad local variable type' as the class loaded (row 1078, the one library's `simplestRationalBetween`). With it, the planner's rehearsal tree runs `Hello` against the one library with the verifier on, and ASM's verifier refuses none of `FortressLibrary`'s 4,694 methods. Test: `compiler_tests/BlockBindingScopeCompiled`. Detail: `compile-ladder/rung-label-local-verify/REPORT.md`, "The cause, by the bytecode" and "The repair in the scratch copy".

History blocks of the range:

- Written by the gather: 2026-11-20 17:56Z · added · from `explorations/compile-ladder/rung-label-local-verify/REPORT.md`, "The cause, by the bytecode" · by climb batch 34 gather (cites [S13])

Report sections that the entry cites: [S13] `compile-ladder/rung-label-local-verify/REPORT.md`, "The cause, by the bytecode".

## F-394, added

- Size: at the base none; at the landing 1376 characters; now 1376 characters, over 600.
- Section now: "The checker and the one library".

Now:

- F-394 **The compiled checker checks a getter's return type against the getter that it keeps from being inherited.** At the same parameter types, a pair of getters is checked by the Return Type Rule as a pair of methods is (`returnTypeCheck`'s message, 'should be a subtype of the'), each getter's receiver read as the plain type that declares it (P-146, P-157), so a narrowing getter below a self-typed trait compiles and a widening one is refused; before, getters reached no such check: a widening one below a self-typed trait stopped the code generator ('malformed overload set not rejected'), one whose return type is inferred compiled to a class that fails the JVM's verification ('VerifyError: Bad return type'), and the others compiled. A dotted method so redeclared below a self-typed trait still reads the trait's receiver as the intersection and is refused where it narrows (row 1094). The one library's fourteen components declare no widening getter, and the count and the distance stay 0; its other components still hold some (row 1095). Test: `compiler_tests/XXXGetterReturnTypeNotSubtype`; `compiler_tests/XXXInferredGetterReturnTypeNotSubtype`; `compiler_tests/SelfTypedGetterNarrowedReturn`. Detail: `compile-ladder/rung-widening-getter/REPORT.md`, "What changed and why"; `compile-ladder/rung-widening-getter/SKEPTIC.md`, "My programs, old code against new".

History blocks of the range:

- Written by the gather: 2026-11-20 17:58Z · added · from `explorations/compile-ladder/rung-widening-getter/REPORT.md`, "What changed and why" · by climb batch 34 gather (cites [S14])
- Written by the merged-diff review: 2026-11-20 18:59Z · rewritten · from `explorations/compile-ladder/rung-widening-getter/SKEPTIC.md`, "My programs, old code against new" · by the merged-diff review of climb batch 34: climb batch 34's merged-diff review: what a widening getter did before the change, by the skeptic's programs: only below a self-typed trait did it stop the code generator; one with an inferred return type failed the JVM's verification, the others compiled (cites [S15])

Report sections that the entry cites: [S14] `compile-ladder/rung-widening-getter/REPORT.md`, "What changed and why"; [S15] `compile-ladder/rung-widening-getter/SKEPTIC.md`, "My programs, old code against new".

## F-395, added

- Size: at the base none; at the landing 1249 characters; now 1249 characters, over 600.
- Section now: "Execution model".

Now:

- F-395 **Walk registers a native singleton's constructor with its values' class as it binds the singleton, so no line of a library names a native object as a value for walk.** In the first pass over a component, `BuildNativeEnvironment.forObjectDecl1` applies the constructor of each singleton of a native component, `FlatString`, `Boolean`, `Char`, `NN32` and `RR32` (`BuildNativeEnvironment.java:161-163`), and `BuildEnvironments.forObjectDecl1` that of each native number object of `FortressLibrary`, `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` (`BuildEnvironments.java:531-533`): after the run's reset of the native constructors and before any top-level variable is initialised, so a value made before the object's name is read, as a string that a native function answers, has its type. `Library/FlatString.fss` holds no `ignore(FlatString)`, so the compiled path's refusal of a number type named as a value (row 1082) has no site there. The constructor objects `ReflectCollection()` and `ReflectMethod()` still register theirs only when called, which `Library/Reflect.fss:365-367` does. Test: `ProjectFortress/tests/NativeStringsReadyAtLoadWalk.fss`. Detail: `explorations/compile-ladder/rung-flatstring-name/REPORT.md`, "1. What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-20 18:00Z · added · from `explorations/compile-ladder/rung-flatstring-name/REPORT.md`, "1. What changed and why" · by climb batch 34 gather (cites [S16])

Report sections that the entry cites: [S16] `explorations/compile-ladder/rung-flatstring-name/REPORT.md`, "1. What changed and why".

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] explorations/compile-ladder/rung-type-variable-receiver/REPORT.md, "The measure, on a scratch copy of the final tree"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-type-variable-receiver/REPORT.md#The measure, on a scratch copy of the final tree'`

explorations/compile-ladder/rung-type-variable-receiver/REPORT.md:72-81, 1026 bytes.

~~~~
## The measure, on a scratch copy of the final tree

`explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch> <out>` on a worktree seeded at `38d8a44e56` under `tmp/` (the script applies its `measure-hacks.patch` and builds it), 160 s:

    refused declarations 0 | emitted (OK lines) 754 | component failures 0
      FortressLibrary      refused   0  emitted 537
    kinds 0
    @@CG OK	FnDecl __bigOperator2	…/Library/FortressLibrary.fss:1656:1-1677:4

The skeptic's run of the same command on a scratch copy of the head `1683793cf8`, with its fix, 229 s: 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', 'kinds 0', `__bigOperator2` emitted. The before is F-34's, on the code of `ba3c7c876d`: 1 refused (`__bigOperator2`), 753 emitted, no component failure. Nothing stands behind the wall: the declaration is emitted. The measure's driver still does not compile `String` whole under the selector, so row 818's stop in `String` (rung P's) is not in this count, as F-34 says.
~~~~

## [S2] explorations/compile-ladder/rung-partial-assumption/REPORT.md, "`String` under the selector"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-partial-assumption/REPORT.md#`String` under the selector'`

explorations/compile-ladder/rung-partial-assumption/REPORT.md:84-95, 1050 bytes.

~~~~
## `String` under the selector

`cd ProjectFortress && FORTRESS_LIBRARY=one ../bin/fortress compile ../Library/String.fss`. Before, on the base's code (15:00:34Z):

```
Exception in thread "main" com.sun.fortress.exceptions.CompilerError: 
/home/user/fortress-partial-assumption/Library/String.fss:67:41-66:
    Can't compile a dispatched call whose arguments are not all type assumptions node = concatAndBalanceIfNecessary
compile exit=1
```

After, on the code of `a95eb01926` (15:23:22Z): 'compile exit=0', and `default_repository/caches-one/bytecode_cache/String.jar`, 84,833 bytes. In it (`javap -c -cp String.jar String`), the body of `concatAndBalanceIfNecessary(String$CatString, FlatString$FlatString)` calls at both lines 'invokestatic ... Method "concatAndBalanceIfNecessary?":(Lfortress/FortressLibrary$String;Lfortress/FortressLibrary$String;)...': the body of the `(String, String)` declaration, the one declaration that takes `String` at the assumed first argument, as under walk. The jar is not run: no carrier serves it before run 2.
~~~~

## [S3] explorations/compile-ladder/plan-34/probes/rehearsal.md, "3. The walls, in the order met"

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

## [S4] explorations/compile-ladder/plan-31/PROBES.md, "3. The measure: the declarations of the fourteen components that the code generator refuses"

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

## [S5] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

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

## [S6] explorations/compile-ladder/rung-codegen-walls/REPORT.md, "1. What changed, and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-walls/REPORT.md#1. What changed, and why'`

explorations/compile-ladder/rung-codegen-walls/REPORT.md:9-18, 3508 bytes, cut at 2500.

~~~~
## 1. What changed, and why

Three changes in `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and one helper that the second needs, nothing else of the original tree:

- `generateTypeReference`, its `AnyType` branch (base `:5795-5796`, now `:5845-5851`): it was empty and fell through to the throw 'Only handling some static args of generic types in extends clause' (base `:5802`). It now calls `generateTypeReference` with Any's own name, `NodeFactory.makeId(span, WellKnownNames.anyTypeLibrary(), WellKnownNames.anyTypeName)`, and no static arguments, and continues, as the `TraitType` branch does for a trait (`:5835-5837`). For a name without static arguments the method emits `GETSTATIC <its RTTI class>.ONLY` (`:5759-5767`), here `fortress/AnyType$Any$RTTIc.ONLY`, the field that the bootstrap class declares (`ProjectFortress/src/fortress/AnyType.java`, `RTTIc.ONLY`). The `BottomType`, `SelfType` and `AbbreviatedType` branches stay empty, each still ending in the throw (`:5833-5834`, `:5843-5844`, `:5852-5853`, throw `:5857`).
- `forTry` (base `:2019-2073`, now `:2019-2087`): the throw 'NYI: Forbid clauses are not yet implemented' (base `:2029-2030`) is gone. After the catch clauses, which are unchanged, each type of the forbid clause is tested in turn, as a catch clause tests its type (`DUP`, `FException.getValue`, `InstantiatingClassloader.generalizedInstanceOf`, `IFEQ`); on a match the exception's value is passed to `throwForbiddenException`. The rethrow (`ATHROW`) and the label `done` move out of the `if (catchClauses.isSome())` block (`:2041`, `:2078-2081`) and are emitted when the try has a catch clause or a forbid clause, so a try with neither emits what it emitted before.
- `throwForbiddenException` (new, `:2089-2122`): with the exception's value on the stack, it finds `ForbiddenException`'s constructor in the api index of `WellKnownNames.fortressLibrary()` (the component's own index when it is that library), takes its parameter type and its result, casts the value to the parameter's class, calls the constructor's static method through `idToPackageClassAndName` and `NamingCzar.jvmMethodDesc`, as a source call of `ForbiddenException(e)` is emitted, wraps the result in an `FException` as `forThrow` does (`NEW`, `DUP_X1`, `SWAP`, `INVOKESPECIAL`) and throws it. The api's own types are named unqualified in its index, so the descriptor is made with the library's api as the default: with the program's api the first run asked for `ForbidC
~~~~

## [S7] explorations/reviews/batch-25-review.md, "Where the text, the brief or the principles split"

`facts-extract.sh 'doc:explorations/reviews/batch-25-review.md#Where the text, the brief or the principles split'`

explorations/reviews/batch-25-review.md:173-187, 5369 bytes, cut at 2500.

~~~~
### Where the text, the brief or the principles split

**1. Shared helpers repaired the prelude's values, where P-38's title says its defects are not repaired (rung U; fork 5).** P-38: "The compiler prelude's defects are not repaired: they go with it at the switch-over." (`POSITIONS.md:35`). Rung U fixed `simpleUnsignedLongArith.unsignedLongToString` and `unsignedLongWrappingNeg`, which the one library's bindings now name and the prelude binds too, so the prelude's `NN64` printing and its prefix `BOXMINUS` changed with them: 'BOXMINUS 1: 1' became 'BOXMINUS 1: 18446744073709551615' (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:825`, `:832`; `RECORD.md`, "Points to report", U; F-313). Fork 5 names the change (`CLIMB-BATCH-25.md:84`), and the record's "No question for the curator" says no fork bends a decision of his (`:72-74`); neither it nor the Fable review weighs P-38. The decision's body names the prelude's own text, its `Maybe` block, its `REM` guard and its reversed spellings, which stand; the helpers and the run-time classes `FNN32` and `FNN64` outlive the prelude, and the one library needs them right (P-58; P-37, "settles which files survive, not the designs inside them"). Climb batch 24's rung K did the same for the prelude's compiled `CHOOSE` (rows 521 and 855), read under P-37 (`reviews/batch-24-review.md`, rung K, standard 3). Default: as landed. So P-38's title is false in effect for rows 326's and 860's prelude halves, and for 521 and 855 before them; the decision stands for the prelude's text (finding 4).

**2. `nextUp` and `nextDown` at a signed zero (rungs D and P; row 880).** IEEE 754-2008's nextUp of `-0.0` is the smallest positive subnormal, as Java's `Math.nextUp` gives; the team's `DirectedRounding.nextUp`, which both glue classes and both rungs' helpers call, gives the successor in IEEE's totalOrder, `0.0` (`ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127`, its `float` twin `:25-41`). The specification names no `nextUp`; its one word on the signed zeros, "-0 is considered to be smaller than +0", is said of `MIN` and `MAX` (`Specification/basic/operators/opr-overview.tex:252`; skeptic D, "Homes"). Row 880 is `CONTESTED`, and `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` pins today's values. D.worker.1 with P.worker.2 (`PLAN.md:669`). Default: today's values.

**3. The `test` modifier on a method (rung C; its D6).** The specification's note gives `test` to a top-level function of type `() -> ()
~~~~

## [S8] explorations/compile-ladder/rung-partial-assumption/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-partial-assumption/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-partial-assumption/REPORT.md:11-32, 4220 bytes, cut at 2500.

~~~~
## What changed and why

A type assumption `e asif T` gives the call around it the static and the dynamic type `T` at `e` (`type-annotation.tex:45-48`). Walk does so by wrapping only the assumed value (`Evaluator.java:109-116`), so the other arguments dispatch on their own run-time types. The code generator compiled an assumption at a receiver and at a call whose every dispatched argument is one; at some arguments and not all it threw `ASSUMPTION_PARTIAL_CALL` (base `CodeGen.java:7290`), and the one library's `String` has that form twice (`Library/String.fss:67`, `:69`).

Now, for a call of an overloaded function or operator of the component whose resolved declaration has a dispatch method (`CodeGen.java:7300-7303`, in `assumedArgumentsCall`), `partiallyAssumedCall` (`CodeGen.java:7313-7366`) does fork P1:

1. It rebuilds the component's overload set of the name at the call's number of arguments and splits it as the component's start does (`topLevelOverloadSet`, `CodeGen.java:7368-7379`), and finds the member whose JVM signature is the resolved one's (`OverloadSet.memberWithSignature`, `OverloadSet.java:2284-2289`).
2. The declarations the call can reach (`OverloadSet.membersUnderAssumptions`, `OverloadSet.java:2300-2333`): the members at or below the resolved declaration (`membersAtOrBelow`, `:2291-2298`) whose parameter at each assumed position takes the assumed type (`TypeAnalyzer.lteq`), and whose parameter at each other position the argument's static type does not exclude (`TypeAnalyzer.definitelyExcludes`), the resolved one always among them. The resolved declaration is applicable at every run of the call, so the most specific applicable declaration of a run is at or below it (`overloading.tex:309-311`, with the overloading rules' guarantee of a most specific one): no member outside this part can be chosen.
3. What is emitted (`CodeGen.java:7345-7365`): one reached, the static call of its body, `NamingCzar.mangleAwayFromOverload(name)` at the resolved signature, as the call whose every argument is an assumption does; every member of the resolved declaration's dispatch method reached, a call of that dispatch method; else a dispatch method among the reached members alone, which `OverloadSet.generateDispatchAmong` (`OverloadSet.java:2333-2351`) writes with the set's own machinery (`makeSubset`, `splitInternal`, `generateAnOverloadDefinitionInner`), into a class of its own named `<component>$asif@<span>` with an ordinal on a repeat, as a function express
~~~~

## [S9] explorations/compile-ladder/plan-31/probes/switch-rehearsal.md, "2. The walls, in the order met"

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

## [S10] explorations/compile-ladder/plan-31/probes/model-closure-check.md, "4. The checker's time for one program"

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

## [S11] explorations/compile-ladder/rung-tuple-binding/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-tuple-binding/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-tuple-binding/REPORT.md:13-24, 2543 bytes, cut at 2500.

~~~~
## What changed and why

**The checker** (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Decls.scala:272-277`). A top-level variable's type is read lazily: `Thunker.primeVariables` gives each name of a declaration a thunk that checks the whole declaration once and takes the name's element out of the right side's type (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/Thunker.scala:198-205`). The checker has a case of its own for a binding of several names to a tuple expression of as many elements (`Decls.scala:250`). It checks each element against its name, then builds a new tuple from the checked elements with `ExprFactory.makeTupleExpr`, which gives the tuple no type. So the thunk read no type, for every name. That is where the names' types were lost. A reference to a name without a type returns its expression unchecked and reports nothing (`ProjectFortress/src/com/sun/fortress/scala_src/typechecker/impls/Misc.scala:634`): this is row 474's "accepted anywhere" and its block that ends without an error, and the unchecked expression is the intermediate node of row 988's stop. The repair gives the rebuilt tuple the tuple type of its checked elements. The case for any other right side, a call or a variable, already typed its names; it is not changed, and neither is a single binding or a local tuple binding.

**The code generator** (`CodeGen.java:6481-6570`). `forVarDeclPrePass` threw for a left side of more than one name. It now hands such a declaration to `forTupleVarDeclPrePass`:

- the right side becomes the value of one hidden top-level variable of the right side's tuple type, a class `<Component>$tuple$<first name>` made by the same `generateVarDeclInnerClass` that makes every top-level variable's class;
- each name gets its own class, as a top-level variable has, whose initializer reads the hidden variable's field and calls the tuple's typed getter for its element; a mutable name's field holds a `MutableFValue` cell, as a single mutable variable's does;
- `addTopLevelVarBinding` registers each name's binding before any code is generated, as it does for a single variable, so a name is visible to initializers above it and to importing components under the usual class name;
- a wildcard `_` binds nothing and gets no class; the hidden class is named after the first name that is no wildcard, and a binding of wildcards only emits nothing.

`generateVarDeclInnerClass` gained an overload that takes the code that pushes the value; th
~~~~

## [S12] explorations/compile-ladder/rung-type-variable-receiver/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-type-variable-receiver/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-type-variable-receiver/REPORT.md:12-20, 2642 bytes, cut at 2500.

~~~~
## What changed and why

The code generator's branch of `forMethodInvocation` for a dotted call with static arguments cast the receiver's static type to `TraitType` (`CodeGen.java:7404` on the base, and again in `emitFindGenericMethodClosure`, `:7714` on the base). Where the receiver's static type is a type variable, as `x.m[\ZZ32\](3)` with `x: F` and `F extends Gen`, the type is a `VarType` and the compile dies: 'java.lang.ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType'. Every such call died there on the base: the cast precedes any emission in that branch (`:7387-7404` on the base).

The change (`CodeGen.java:7433-7438`, `:7723-7742`), as fork T1 says: where the receiver's type is a type variable and the call has static arguments, `forMethodInvocation` asks the new member `typeVariableMethodOwner` for the variable's bound that declares or inherits the method, the most specific where several do, and from there the call is compiled as for a receiver of that bound's type: the receiver is cast to it (`castReceiver`), the closure is looked up through it, and the receiver's static argument of the generic method closure is that bound. `typeVariableMethodOwner` reads the variable's bounds from the code generator's kind environment (`typeAnalyzer.env().staticParam`), which holds a parameter's `extends` clause and the bounds a `where` clause adds (`KindEnv.constraintBounds`, `scala_src/typechecker/staticenv/KindEnv.scala:147-162`), keeps those that are trait types, and lets `intersectionMethodOwner` choose among them as among an intersection's conjuncts: the bounds that have the checker's chosen declaration, the one that lies below every other, else the first.

The object's own method still runs: the call is an interface call of the closure finder on the bound's interface, which the object's class implements. In the test, `S` redeclares `m`, and `inherited[\S\](S)` and `bothBounds[\S\](S)` answer 8, `S`'s own body, as walk does.

The skeptic's fix (`54c56dc6e9`) puts a method's own `where` clause into the kind environment of its body where the method has no static parameters of its own (`whereClauseBodyCodeGen`, `CodeGen.java:3238-3245`, called by `generateTraitDefaultMethod` and `generateFunctionalBody` at `:3128` and `:3207`), as `generateGenericMethodBody` does for a generic body (`:2774`). Without it, `held(): ZZ32 where { F extends Gen } = x.m[\ZZ32\](3)` in `object WhereHolder[\F\](x: F)`, an
~~~~

## [S13] explorations/compile-ladder/rung-label-local-verify/REPORT.md, "The cause, by the bytecode"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-label-local-verify/REPORT.md#The cause, by the bytecode'`

explorations/compile-ladder/rung-label-local-verify/REPORT.md:21-55, 3516 bytes, cut at 2500.

~~~~
## The cause, by the bytecode

In the scratch copy (below), `javap -c -p fortress/FortressLibrary.class`, from the copy's `caches-one/bytecode_cache/fortress.FortressLibrary.jar` on the base's code, shows the refused instruction and the local:

```
      1225: invokestatic  #1442               // Method ceiling:(Lfortress/FortressLibrary$QQ;)Lcom/sun/fortress/compiler/runtimeValues/FZZ;
      1228: astore        8
      ...
      1293: new           #1451               // class "FortressLibrary$\\=fn@607\\!5-620\\!8"
      1296: dup
      1297: aload         8
      1299: checkcast     #176                // class com/sun/fortress/compiler/runtimeValues/FZZ
      1302: invokespecial #1454               // Method "FortressLibrary$\\=fn@607\\!5-620\\!8"."<init>":(Lcom/sun/fortress/compiler/runtimeValues/FZZ;)V
      1305: astore        8
```

- The local: slot 8 at 1228 is `r = ceiling(n0/d0)`, the first binding of the arm `if d1 = 0 then ... exit done with q end` (`Library/FortressLibrary.fss:601-606`). The arm ends in its exit (`athrow` at 1285).
- The path: the one that skips the arm, `d1 =/= 0`, the only one that reaches 1293. Slot 8 there holds a value only where an earlier arm's tuple assignment used it as a temporary (`astore 8` at 290 and 718, the `GreaterThan` arm and the `if n1 < 0` arm); on the path through neither it is unset, so the frame's merge is `top`.
- The construct: the local function `simplest` (`Library/FortressLibrary.fss:607-620`), whose closure class `\=fn@607!5-620!8` takes one `FZZ` in its constructor: the stale `r`. Its body names `r` twice over: its own binding `r = nl MOD dl` (`:609`) and the numerals `1` of `(q,1)` and `(q+1,1)`, whose coercion's static parameters are `n`, `r` and `v` (row 983). Slot 8 at 1305 is then the closure itself, which took the slot that `r` gave back.

Two controls in the copy, each `FortressLibrary` compiled again alone (`FORTRESS_LIBRARY=one ../bin/fortress compile ../Library/FortressLibrary.fss`) and `runprog.sh <copy> Hello`:

- `simplest`'s own `r` renamed `rm`: the same refusal at `@1297`, the closure still `<init>(FZZ)`, since its numerals still name `r`.
- the arm's `r` renamed `rc` (`:603-604`): `simplestRationalBetween` passes the verifier; the load stops at another class (row 815's kind, below).

The label block and the exit are not part of the cause: the label only makes the arm's exit leave the function. The two prelude copies of the shape (`plan-34/probes/programs/LabelLocals3.fss`, `Labe
~~~~

## [S14] explorations/compile-ladder/rung-widening-getter/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-widening-getter/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-widening-getter/REPORT.md:11-24, 3141 bytes, cut at 2500.

~~~~
## What changed and why

A getter is a `FieldGetterMethod` in the checker's index, and `toMethodArrows` keeps only a `DeclaredMethod` (`OverloadingChecker.scala:208-210`). So `checkOverridingReturnType`, which compares a declaration with the one it keeps its type from inheriting (`STypesUtil.providedAndOverridden`, which does gather getters), got no arrow for a getter and checked nothing (`case _ =>`). The checker passed `getter zero(): Number` in an object below `trait Tz[\I extends Tz[\I\]\]` with `getter zero(): I`, and the code generator, which builds one overload set of the two, stopped: 'Likely bug in static analysis, apparently malformed overload set not rejected'.

The edit (`0579b62a7f`): where both declarations of such a pair are getters (`:725`), each gets an arrow from `getterArrow` (`:220-234`), its receiver the one parameter, and the pair is checked as a pair of methods at the same parameter types is, by `returnTypeCheck` both ways (`:731-734`), whose message is 'For zero,\nthe return type of Oz->Number @ ... should be a subtype of the\n    return type of Tz[\Oz\]->Oz @ ...'. `isGetter` (`:800-803`) names a getter. The receiver is the plain declaring type at the instance (the third element of each gathered declaration), because P-146 and P-157 have the Return Type Rule read a self-typed trait's plain signature: the index's self type, `Tz[\Oz\] & {Oz}`, is equivalent to `Oz`, so a narrowing getter would have failed the second direction (below, "Decisions", D2).

The library (`9580dd7bbb`, `721bd2b25b`): every getter of the fourteen components that the new check refuses answers the inherited type now:

- `ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265`: `NN32`'s `zero` and `one` at `NN32`, keeping `unsigned(0)` and `unsigned(1)`.
- `Library/FortressLibrary.fss:4031`: `SimpleMappedIndexed`'s `bounds` at `CompactFullRange[\I\]` (was `Range[\I\]`; its body `self.g.bounds` already answered it).
- `Library/FortressLibrary.fss:3638`: `VoidReduction`'s `reverse` at `CommutativeMonoidReduction[\()\]` (was `Reduction[\()\]`; its body is `VoidReduction`).
- `Library/List.fss:264-275`: `ArrayList`'s `extractLeft` and `extractRight` at `Maybe[\(E,List[\E\])\]` and `Maybe[\(List[\E\],E)\]`, their `Nothing` and `Just` at the same arguments (they named `ArrayList[\E\]`, and generics are invariant, so `Maybe[\(E,ArrayList[\E\])\]` is no subtype of `Maybe[\(E,List[\E\])\]`).
- `Library/List.fss:278`: `ArrayList`'s `indexValuePairs` at `Indexed[\(ZZ3
~~~~

## [S15] explorations/compile-ladder/rung-widening-getter/SKEPTIC.md, "My programs, old code against new"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-widening-getter/SKEPTIC.md#My programs, old code against new'`

explorations/compile-ladder/rung-widening-getter/SKEPTIC.md:36-59, 3419 bytes, cut at 2500.

~~~~
## My programs, old code against new

Commands, from `tmp/rung-widening-getter/skeptic/progs/`: the old code by `/home/user/fortress-base40/explorations/coordinator/tools/old-fortress.sh /home/user/fortress-base40 /home/user/fortress-widening-getter/tmp/old-caches compile P.fss`, `... run P` and `... P.fss`; the new by the rung's `bin/fortress` with `FORTRESS_HOME` the rung's tree and `FORTRESS_CACHES` a private copy of its caches; `fortress typecheck` likewise.

| program | old: compile, run | new: compile, run | walk, old and new |
|---|---|---|---|
| `SkInferredWiden` (`getter g() = "s"` below `getter g(): ZZ32`) | rc 0; run 'VerifyError: Bad return type' | refused, 'the return type of O->String ... should be a subtype of the ... T->ZZ32' | 's', 's' |
| `SkGenericWiden` (`G[\ZZ32\]`'s `g(): X`, `g(): Number`) | rc 0, 'compiled' | refused, '... O->Number ... G[\ZZ32\]->ZZ32' | 'compiled' both |
| `SkGenericObjWiden` (`Ob[\Y\]`'s `g(): Any` below `G[\Y\]`) | rc 0 | refused, '... Ob[\Y\]->Any ... G[\Y\]->Y' | 'compiled' both |
| `SkGenericObjNarrow` (`g(): Y` below `G[\Y\]`) | 'narrow  5' | 'narrow  5' | 'narrow 5' both |
| `SkDiamondNarrow` (`g(): ZZ32` below `A`'s `Number` and `B`'s `ZZ32`) | 'a  7  b  7' | 'a  7  b  7' | 'a 7 b 7' both |
| `SkDiamondWiden` (`g(): Number` there) | rc 0 | refused, '... O->Number ... B->ZZ32' | 'compiled' both |
| `SkComprisesNarrow` (`trait T comprises { O }`, narrowing) | 't  3' | 't  3' | 't 3' both |
| `SkSelfTypedFieldWiden` (`object Oz(zero: Number) extends Tz[\Oz\]`) | 'malformed overload set not rejected' | refused, '... Oz->Number ... Tz[\Oz\]->Oz' | 'compiled' both |
| `SkNarrowViaTrait` (a trait's and a field's narrowing getter) | 't  4  s  9' | 't  4  s  9' | 't 4 s 9' both |
| `SkGetterBesideMethod` (getter beside a dotted `g(): ZZ32`, D1) | rc 0, 'compiled' | rc 0, 'compiled' | 'compiled' both |
| `SkObjExprWiden`, `SkObjExprMethodWiden` (object expressions) | typecheck rc 0; compile 'Can't compile ObjectExpr' | the same | 't 3' both |
| `SkObjExprNarrow` | typecheck rc 0; 'Can't compile ObjectExpr' | the same | 't 3' both |
| `SkObjMethodWiden` (an object's dotted `g(): Number`) | refused, '... O->Number ... T->ZZ32' | the same | — |
| `SkRangePairsWalk` (walk; the four ranges' pairs: size, a weighted `SUM`, the `seq` order; `(1:3).indexValuePairs.bounds`; `VoidReduction.reverse`) | — | — | equal on both codes, at `FORTRESS_THREADS=1` and 4: 'compact2 size 6', 'compact2 sum 3702', 'strided2 sum 10098',
~~~~

## [S16] explorations/compile-ladder/rung-flatstring-name/REPORT.md, "1. What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-flatstring-name/REPORT.md#1. What changed and why'`

explorations/compile-ladder/rung-flatstring-name/REPORT.md:11-22, 3020 bytes, cut at 2500.

~~~~
## 1. What changed and why

Walk's native objects keep their constructor in a static field of their values' Java class, which `makeNativeObject` sets (`ProjectFortress/src/com/sun/fortress/interpreter/glue/prim/FlatString.java:32-35`), and a value's type is read through it (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/FNativeObject.java:38-40`). A native singleton's `makeNativeObject` ran only when its lazily evaluated cell was first read: when walk's fourth pass forced it (`BuildEnvironments.java:650`), or earlier by a read of its name. A string that a native function answers exists before that: the component's own top-level variable `lineSeparator: String = LineSeparator()` (`Library/FlatString.fss:23`) is a native string, and its typed cell checks its type. So the team's library named the object first: `FlatString;`, respelled by the revival `ignore(FlatString);` (`Library/FlatString.fss:29-30` at 639eef1806, under the comment "This initializes the constructor for FlatString before its type is used (in the next line)"; the team's spelling at a874948ac, the same line).

The change, in two files:

- `ProjectFortress/src/com/sun/fortress/interpreter/evaluator/BuildNativeEnvironment.java:161-163` (`forObjectDecl1`, the branch of a singleton without static parameters): the native constructor is applied as soon as it is bound, `if (cl instanceof NativeConstructor) cl.applyConstructor(Collections.<FValue>emptyList());`, as `BuildEnvironments.forObjectDecl1` does for the native number objects (`BuildEnvironments.java:531-533`). Two imports (`:26`, `:33`).
- `Library/FlatString.fss`: the two lines taken out, the call and the end of its comment; `LineSeparator()` keeps its `do` block (`Library/FlatString.fss:28-30`).

Why it is ready there: `Driver.evalComponent` resets every native constructor first (`ProjectFortress/src/com/sun/fortress/interpreter/Driver.java:81`, `Init.java:44`, `NativeApp.java:273-276`), then makes the first pass over every component (`Driver.java:218-222`), and only then the passes that build types, functions and the top-level variables (`Driver.java:224-249`). `FNativeObject.type()` reads only the constructor's `selfType`, which the constructor holds from its making (`ProjectFortress/src/com/sun/fortress/interpreter/evaluator/values/Constructor.java:144`). Each native singleton's `makeNativeObject` only registers the constructor and answers a static value (`FlatString.java:32-35`, `Boolean.java:30-33`, `Char.java:33-3
~~~~

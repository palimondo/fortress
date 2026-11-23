<!-- The record-landing workflow's evidence of the entries: each FACTS and POSITIONS entry that 13f4fdea7..efb603dce added, changed or removed (the batch 35, landed at 0a83a7049, and the landing's own steps to efb603dce), written by evidence.py. -->

# The entries that the range changed

- The batch, 13f4fdea7..0a83a7049: 20 entries: F-53, F-88, F-240, F-268, F-292, F-302, F-315, F-351, F-363, F-369, F-372, F-373, F-387, F-393, F-397, F-398, F-399, F-400, F-401, P-174
- After the landing, 0a83a7049..efb603dce: 2 entries: P-165, P-174
- Now over 600 characters: 20 of 21: F-53, F-88, F-240, F-292, F-302, F-315, F-351, F-363, F-369, F-372, F-373, F-387, F-393, F-397, F-398, F-399, F-400, F-401, P-165, P-174

Each entry below: its size at the base, at the landing and now, its section now, its line at the base and now, the history blocks of the range (oldest first, each with who wrote it and its note), and the report sections that it or a block cites, as numbers [S1], [S2] ... into the last part, "The cited sections". Print an entry's whole history with `facts-extract.sh 'history:F-N'`.

## F-53, changed

- Size: at the base 1377 characters; at the landing 1376 characters; now 1376 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-53 **At the last landed gate, climb batch 34b's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

Now:

- F-53 **At the last landed gate, climb batch 35's, the distance to the switch-over is 0 errors and the checker count is 0.** The distance counts the compiled checker's distinct errors over fourteen components of the interpreter's library and their apis: twelve, and `List`'s two imports, `CovariantCollection` and `OneShotFlag` (F-288). It runs every checker stage of each component whatever the earlier stages reported, and classes the errors by root cause (F-54). At that gate it checks `value object Char` to its end, with no crash (F-334). The checker count checks only the `FortressLibrary` component, with the apis it imports, and each unit stops at its first failing checker stage; the component's run ends clean, which the count stage reads as 0 (`tools/checker-count/run.sh`), and nothing crashes (F-233). A rise in either is reported and turns no gate red on its own; the count stage can still turn the gate red on the faults that F-66 names, such as a crash that no rung listed (P-39). A rung measured by either takes the last landed gate's tables as its starting values: that batch's `compile-ladder/climb-batch-<N>/gate/distance.txt` and `checker-count.txt`, and the per-site list `compile-ladder/gate/distance-sites.tsv`, which holds the last landed gate's sites, none now (the `coordinator` skill's `references/batch.md`, "The checker count and the distance").

History blocks of the range:

- Written by the commit stage: 2026-11-23 14:31Z · rewritten · by climb batch 35 commit stage: the landed figures of climb batch 35's gate, read from explorations/compile-ladder/climb-batch-35/gate/distance.txt (#total 0, #crash none, first line's 14 components) and checker-count.txt (#total 0, #crash none), and explorations/compile-ladder/gate/distance-sites.tsv (header only, no site); the batch number in the title; numbers only

Report sections that the entry cites: [S1] `references/batch.md`, "The checker count and the distance".

## F-88, changed

- Size: at the base 575 characters; at the landing 646 characters; now 646 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-88 **The compiled checker reads what a trait or object provides by the traits chapter's inheritance, and checks an overriding declaration's return type against the one it overrides.** A type provides its own methods and its immediate supertypes', less those that an own declaration overrides or repeats in its parameter types. So an object below a trait that redeclares an inherited method abstract must define it. The code generator refuses `override` (row 650). Gated by `compiler_tests/Override*`. Detail: `compile-ladder/rung-checker-overloading/REPORT.md` section 1.

Now:

- F-88 **The compiled checker reads what a trait or object provides by the traits chapter's inheritance, and checks an overriding declaration's return type against the one it overrides.** A type provides its own methods and its immediate supertypes', less those that an own declaration overrides or repeats in its parameter types. So an object below a trait that redeclares an inherited method abstract must define it. The code generator compiles `override` by the same reading, and the checker refuses one that overrides nothing (F-400). Gated by `compiler_tests/Override*`. Detail: `compile-ladder/rung-checker-overloading/REPORT.md` section 1.

History blocks of the range:

- Written by the gather: 2026-11-23 12:20Z · rewritten · from `explorations/compile-ladder/rung-override-compiled/REPORT.md`, "What changed and why" · by climb batch 35 gather: row 650 closes with rung O: the code generator compiles override (cites [S2])

## F-240, changed

- Size: at the base 2205 characters; at the landing 2202 characters; now 2202 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-240 **The checker's count stage takes about 105 s and its distance stage 176 s at the last landed gate, climb batch 34b's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 108 s), over fourteen components, ran at a start load of 0.22, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 200 s (127 s) at 0.28 at climb batch 34's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-34b/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

Now:

- F-240 **The checker's count stage takes about 75 s and its distance stage 127 s at the last landed gate, climb batch 35's.** At climb batch 15b's gate they took 325 s and 1,075 s; the solver's memos (F-235) make most of the difference, not load. Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end, past its cleared type errors into the export check, not load: rung runs that stopped at those errors took 91 s and 99 s, runs past them 149 s and 151 s, one run each. Since climb batch 21b the checker checks every symbolic operator (F-281), which costs the count stage about 15 to 25 % by its rung's timings of its base and its head in one session. From climb batch 22's gate to climb batch 26's it stayed between about 150 s and 180 s. The count table records no seconds, so its time is the file times of the gate's log; the distance stage (`FortressLibrary` 81 s), over fourteen components, ran at a start load of 0.19, then beside the first minutes of `testFast`, so its time is one under that suite's load, against 176 s (108 s) at 0.22 at climb batch 34b's. Both stages about halved at climb batch 27's gate, and no run measured why: each gate ran each stage once, and neither the emptied `Number` (F-324) nor the distance's check stopped at `Char` (F-54) is shown to be the cause. Load can lengthen a stage more than twofold: climb batch 16's merged code took 217 s for the distance stage at its gate, at a load average of 3.3, and nearly the same code took 574 s at 4.6 to 5.3. So a time compares only with one taken under a like load. Source: the file times of the gate's log and `compile-ladder/climb-batch-35/gate/distance.txt`. Detail: `reviews/batch-31-review.md`, section 4; `reviews/batch-32-review.md`, section 4; `reviews/batch-27-review.md`, section 2; `reviews/batch-26-review.md`, section 2; `reviews/batch-25-review.md`, section 2; `reviews/batch-24-review.md`, section 2; `reviews/batch-23-review.md`, section 2; `reviews/batch-22c-review.md`, section 2; `reviews/batch-22-review.md`, section 2; `reviews/batch-21b-review.md`, section 2; `reviews/batch-17-review.md`, section 1; `reviews/batch-16-review.md`, section 2.

History blocks of the range:

- Written by the commit stage: 2026-11-23 14:31Z · rewritten · by climb batch 35 commit stage: count stage about 75 s from the file times of the gate's log (tmp/gate-batch-35/checker-count/javac.txt at 14:27:45 to run.txt at 14:28:58, 73 s); distance stage from compile-ladder/climb-batch-35/gate/distance.txt lines #seconds 127 FortressLibrary 81, #machine load at start 0.19 and its first line's 14 components; by the file times of the gate's log the stage ran about 14:06:01 to 14:08:08, right after compileAll (14:05:51), with no library order, beside testFast's first minutes (testFast ended 14:15:40 after 9 min 30 s); compared against climb batch 34b's 176 s (108 s) at 0.22; numbers only

## F-268, changed

- Size: at the base 598 characters; at the landing 598 characters; now 598 characters.
- Section now: "The checker and the one library".

At the base:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6699-6703`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

Now:

- F-268 **The code generator emits `Any` as a static argument in an `extends` clause, but crashes on a tuple static argument that holds `Any`.** It emits `GETSTATIC fortress/AnyType$Any$RTTIc.ONLY` (`CodeGen.java:6781-6785`). For `Holder[\(Any, ZZ32)\]` it stops with 'Cannot invoke "com.sun.fortress.nodes.IdOrOp.getApiName()" because "id_or_op" is null' (row 889). Test: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `XXXExtendsGenericAtTupleOfAny.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why" and "5. Programs run old against new, and the probes".

History blocks of the range:

- Written by the merged-diff review: 2026-11-23 12:59Z · rewritten · by climb batch 35's merged-diff review: CodeGen.java line citation re-anchored past rung O's insertion of 82 lines (the code cited is unchanged)

Report sections that the entry cites: [S3] `compile-ladder/rung-codegen-walls/REPORT.md`, "1. What changed, and why".

## F-292, changed

- Size: at the base 892 characters; at the landing 917 characters; now 917 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-292 **Under the compile command's bound `Any`, the compiled test tracks pass; the ten tests that pinned the bound `Object` keep their values respelled, and the 23 `.test` files that import `CompilerSystem` pass.** `ant testQuick` on rung B's tree, without the batch's other rungs' tests: library 86, othercompiler 263, compiler 1318, no failure. The ten: `XXXImplicitBoundAny` promoted to `ImplicitBoundAny`; `XXX6bu`, `XXX6bv` and `XXXInferCallArgumentControls` pin the new text; four `comprises` tests write `where [\E\]`, as the library's `AnyList` does; `XXXOverrideGenericReturnTypeNotSubtype` and `CoercionGenericFnCompiledRungC` write `T extends Object`, the first since under `Any` its override overrides nothing (row 653), the second for the prelude's `||` at `Object` until the switch-over. Test: those tests. Detail: `compile-ladder/rung-bound-any/REPORT.md`, sections 2 and 9.

Now:

- F-292 **Under the compile command's bound `Any`, the compiled test tracks pass; the ten tests that pinned the bound `Object` keep their values respelled, and the 23 `.test` files that import `CompilerSystem` pass.** `ant testQuick` on rung B's tree, without the batch's other rungs' tests: library 86, othercompiler 263, compiler 1318, no failure. The ten: `XXXImplicitBoundAny` promoted to `ImplicitBoundAny`; `XXX6bu`, `XXX6bv` and `XXXInferCallArgumentControls` pin the new text; four `comprises` tests write `where [\E\]`, as the library's `AnyList` does; `XXXOverrideGenericReturnTypeNotSubtype` and `CoercionGenericFnCompiledRungC` write `T extends Object`, the first since under `Any` its override overrides nothing, which the checker refuses (F-400), the second for the prelude's `||` at `Object` until the switch-over. Test: those tests. Detail: `compile-ladder/rung-bound-any/REPORT.md`, sections 2 and 9.

History blocks of the range:

- Written by the gather: 2026-11-23 12:20Z · rewritten · from `explorations/compile-ladder/rung-override-compiled/REPORT.md`, "Points to report" · by climb batch 35 gather: row 653 closes with rung O: the checker refuses an override that overrides nothing (cites [S4])

## F-302, changed

- Size: at the base 1278 characters; at the landing 1278 characters; now 1278 characters, over 600.
- Section now: "Execution model".

At the base:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. When the prelude declared its number types as traits, their `+` reached `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. The chains measured are of that form, where the box extended its trait's springboard, and a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:5965-5972`). The prelude's box is now the class of its value object, over the payload class `FZZ32`, which extends `FValue` and no springboard (`compiler/runtimeValues/FZZ32.java:22`; F-388), so its constructor chain no longer follows the type's `extends` entries. The depth of the value-object form is not measured. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

Now:

- F-302 **In those loops C2 inlines down to depth 12 from the loop, against the 16 at which it stops by default, and a temporary box whose constructor chain passes the limit is no longer removed.** At JDK 25's default `MaxInlineLevel=15` a frame at depth d inlines when d is at most 16. When the prelude declared its number types as traits, their `+` reached `Object.<init>` under its result's box at depth 12, a top-level binding at 10. With the limit lowered to 8, a loop of two nested helper calls rose from 33 to 96 bytes per iteration, since its temporaries' chains no longer inlined. So an operator called from more than 4 further inlined frames keeps its temporary boxes. The chains measured are of that form, where the box extended its trait's springboard, and a springboard extends the springboard of its trait's first `extends` entry (`compiler/codegen/CodeGen.java:6047-6054`). The prelude's box is now the class of its value object, over the payload class `FZZ32`, which extends `FValue` and no springboard (`compiler/runtimeValues/FZZ32.java:22`; F-388), so its constructor chain no longer follows the type's `extends` entries. The depth of the value-object form is not measured. Observed once (F-301). Detail: `perf-probes/helper-calls/REPORT.md` sections 3 and 4.

History blocks of the range:

- Written by the merged-diff review: 2026-11-23 12:59Z · rewritten · by climb batch 35's merged-diff review: CodeGen.java line citation re-anchored past rung O's insertion of 82 lines (the code cited is unchanged)

## F-315, changed

- Size: at the base 1321 characters; at the landing 1373 characters; now 1373 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` (`CodeGen.java:3381-3383`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, a tuple that holds `Any` (row 889), and the `override` modifier (row 650) are still refused. The library's `test stringifyChars`, which a varargs call stopped, is emitted in F-34's measure, since the code generator compiles varargs under the selection of the one library (F-390). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

Now:

- F-315 **The code generator compiles a trait or object that extends a generic trait at `Any`, a `try` with a `forbid` clause, and a function or a method declared `test`.** An exception of a listed type that no catch clause took is thrown again as a `ForbiddenException` chained to it, made by the library's own constructor, and the `finally` clause does not run (row 890). The code generator's guard of modifiers, which functions and methods share, admits `test` and `override` (`CodeGen.java:3462-3465`, `fnDeclCompilableModifiers`, read in the code); a method declared `test` compiled and ran in one probe, and no test gates it. `Bottom`, `Self` or an abbreviated type as that static argument, and a tuple that holds `Any` (row 889), are still refused; the `override` modifier compiles (F-400). The library's `test stringifyChars`, which a varargs call stopped, is emitted in F-34's measure, since the code generator compiles varargs under the selection of the one library (F-390). F-34 gives what the code generator still refuses in the library. Tests: `compiler_tests/ExtendsGenericAtAnyCompiled.test`, `ForbidClauseCompiled.test`, `TestModifierCompiled.test`; for row 890, `XXXFinallyOnEscape.test`. Detail: `compile-ladder/rung-codegen-walls/REPORT.md`, sections 1, 2 and 5; `reviews/batch-25-review.md`, "Where the text, the brief or the principles split", 3 and 4.

History blocks of the range:

- Written by the gather: 2026-11-23 12:20Z · rewritten · from `explorations/compile-ladder/rung-override-compiled/REPORT.md`, "What changed and why" · by climb batch 35 gather: row 650 closes with rung O: the code generator compiles override (cites [S2])

Report sections that the entry cites: [S5] `reviews/batch-25-review.md`, "Where the text, the brief or the principles split".

## F-351, changed

- Size: at the base 1768 characters; at the landing 1894 characters; now 1894 characters, over 600.
- Section now: "Execution model".

At the base:

- F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:293-314`,`compiler/codegen/CodeGen.java:2067-2099` (`forAtomicBlock`), `:2409-2413` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

Now:

- F-351 **A compiled transaction validates itself and every ancestor, and an abort restarts the block whose transaction it names.** A compiled `atomic` block's transaction records no read of its own write; it records a read of an ancestor's write with that write, a read of the committed value with that value, and a read of an empty array element with a mark. Validation, at a read once the global lock has moved and at a commit that did not get the lock at its snapshot, covers the transaction and every ancestor. An abort names the transaction whose read failed; `abort()` names none. The block's handler takes every exception (`BaseTask.leaveTransaction`): it ends the block's transaction, starts the block again for an abort that names that transaction or names none (or any abort at the outermost block), commits the transaction on an exit, a `LabelExit`, and throws the exit on (F-401), a commit that fails taking the abort path, and throws everything else on, after a nested transaction has handed its reads to its parent. A nested commit hands its parent its reads and its writes, also where it wrote nothing. The exception-table entry of a block or a `try` follows its body's code, so a nested one is taken first. Open: a nested block sees a plain write by another thread that runs its outer block (row 984). Source: `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:228-367`, `runtimeSystem/BaseTask.java:295-322`,`compiler/codegen/CodeGen.java:2148-2180` (`forAtomicBlock`), `:2490-2494` (`forTry`). Tests: `compiler_tests/AtomicOwnWriteNestedCompiled`, `AtomicNestedSameBodyCompiled`, `NestedAtomicAbortCompiled`, `AtomicNestedViewCompiled`, `AtomicSharedReadsCompiled`, `AtomicThrowRevertsCompiled`, `AtomicNestedReadsKeptCompiled`, `NestedTryInnerCatch`; `ArrayStoreJUTest`. Detail: `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the merged-diff review: 2026-11-23 12:59Z · rewritten · by climb batch 35's merged-diff review: rung A's exit commit (F-401) added to the handler's cases, which the batch left unsaid; BaseTask.java and CodeGen.java lines re-anchored past rungs A's and O's insertions

Report sections that the entry cites: [S6] `compile-ladder/rung-compiled-transaction/REPORT.md`, "What changed and why".

## F-363, changed

- Size: at the base 1881 characters; at the landing 1880 characters; now 1880 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-363 **A superscript follows a dotted access and a parenthesised call on both paths.** `p.wq^T`, `B.n^2`, `B.f()^T` and `B.data[5]^2` parse as the operator applied to the whole dotted primary to its left, and `(f(x))^T`, `(f(x))!` and `(a^b)!` run under walk as they do compiled; `f(x)^T` and `f(x)^2` stay a static error on both paths (walk: "the argument should not be immediately followed by a non-expression element"; the checker: "Item at this location must be an expression, not an operator."). The parser reads a primary with a dot as the front of the math items that follow it (`parser/Expression.rats:386-400`), so a subscript, a parenthesised item or a tight identifier after a dotted method call parses too; of these, one test compiles a subscript, `Maker.f()[5]^2` (`compiler_tests/SubscriptThenSuperscriptCompiled`). The one node kind that the parser builds for a single item is the one the parenthesised spelling built, so neither the checker nor the code generator changed. Walk's postfix branch evaluates an operand in parentheses as one expression (`interpreter/evaluator/Evaluator.java:965-970`). So a model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx`; a selector after a superscript, `B.data^T.v`, is still a syntax error, and a superscript after a subscript that is a math item of its own, `x[5]^2` or `B.f()[5]^2`, compiles (F-387) and fails under walk (row 1); in `B.data[5]^2` the subscript is part of the dotted primary. Tests: `tests/SuperscriptAfterDottedAccess.fss`, `tests/SuperscriptAfterParenthesisedCall.fss`, `tests/SuperscriptAfterCallRefused.fss` with its `.test`, and `compiler_tests/SuperscriptAfterDottedAccessCompiled.test`, `SuperscriptAfterParenthesisedCallCompiled.test`, `XXXSuperscriptAfterCallRefusedCompiled.test`. Detail: `compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after" and "The trees".

Now:

- F-363 **A superscript follows a dotted access and a parenthesised call on both paths.** `p.wq^T`, `B.n^2`, `B.f()^T` and `B.data[5]^2` parse as the operator applied to the whole dotted primary to its left, and `(f(x))^T`, `(f(x))!` and `(a^b)!` run under walk as they do compiled; `f(x)^T` and `f(x)^2` stay a static error on both paths (walk: "the argument should not be immediately followed by a non-expression element"; the checker: "Item at this location must be an expression, not an operator."). The parser reads a primary with a dot as the front of the math items that follow it (`parser/Expression.rats:386-400`), so a subscript, a parenthesised item or a tight identifier after a dotted method call parses too; of these, one test compiles a subscript, `Maker.f()[5]^2` (`compiler_tests/SubscriptThenSuperscriptCompiled`). The one node kind that the parser builds for a single item is the one the parenthesised spelling built, so neither the checker nor the code generator changed. Walk's postfix branch evaluates an operand in parentheses as one expression (`interpreter/evaluator/Evaluator.java:965-970`). So a model line may write `p.wq^T x` and `(onehot(ks, 5))^T dx`; a selector after a superscript, `B.data^T.v`, is still a syntax error, and a superscript after a subscript that is a math item of its own, `x[5]^2` or `B.f()[5]^2`, compiles (F-387) and runs under walk (F-398); in `B.data[5]^2` the subscript is part of the dotted primary. Tests: `tests/SuperscriptAfterDottedAccess.fss`, `tests/SuperscriptAfterParenthesisedCall.fss`, `tests/SuperscriptAfterCallRefused.fss` with its `.test`, and `compiler_tests/SuperscriptAfterDottedAccessCompiled.test`, `SuperscriptAfterParenthesisedCallCompiled.test`, `XXXSuperscriptAfterCallRefusedCompiled.test`. Detail: `compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after" and "The trees".

History blocks of the range:

- Written by the gather: 2026-11-23 12:17Z · rewritten · from `explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md`, "Sentences made false" · by climb batch 35 gather: rows 1 and 1026 close with rung W (cites [S7])

Report sections that the entry cites: [S8] `compile-ladder/rung-superscript-after/REPORT.md`, "Each form on the base and after".

## F-369, changed

- Size: at the base 1875 characters; at the landing 1967 characters; now 1967 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6908`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once for each name and once more (row 1026). The checker checks a local tuple binding's declared names beside untyped names in the same way (row 1029, fixed; `compiler_tests/LocalTupleBindingMixedTypes`, `XXXLocalTupleBindingMixedRefused`), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

Now:

- F-369 **A top-level tuple binding compiles: each name is a top-level variable of its element's type, and the right side is evaluated once, at the first read of any name.** The checker gives the tuple that it rebuilds from the checked elements their tuple type, from which each name's thunk reads its own (`scala_src/typechecker/impls/Decls.scala:272-277`); where only some names declare a type and the right side is no tuple expression of as many elements, it checks the right side again against each name's type (`Decls.scala:324-336`). The code generator keeps the right side's value in a hidden class `<Component>$tuple$<first name>` and gives each name its own class, whose initializer takes its element out by the tuple's typed getter (`compiler/codegen/CodeGen.java:6990`); a wildcard binds nothing. Every compiled top-level variable is initialized at its first read, not at load as under walk, so a binding of wildcards alone never evaluates its right side (row 1011). So a model line of this form compiles as written, the model's lines 17 to 19 among them, and a name bound so is typed as a single binding's is: `explorations/run-c4/src/MicroGptFlat.fss:72`, `beta1 m`, is a new checker site against the one library (F-58). Under walk the same right side runs once too: a tuple expression binds each name to its own element, and any other right side binds a temporary at the names' types (F-398). The checker checks a local tuple binding's declared names beside untyped names in the same way (row 1029, fixed; `compiler_tests/LocalTupleBindingMixedTypes`, `XXXLocalTupleBindingMixedRefused`), and a typed tuple binding over an `if` with tuple branches compiles (row 1031, fixed). Tests: `compiler_tests/TopLevelTupleBindingCompiled.test`, `TopLevelTupleBindingImport.test`, `TopLevelTupleBindingMixedTypes.test`, `XXXTopLevelTupleBindingType.test`. Detail: `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why" and "The binding as compiled".

History blocks of the range:

- Written by the gather: 2026-11-23 12:17Z · rewritten · from `explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md`, "Sentences made false" · by climb batch 35 gather: rows 1 and 1026 close with rung W (cites [S7])
- Written by the merged-diff review: 2026-11-23 12:59Z · rewritten · by climb batch 35's merged-diff review: CodeGen.java line citation re-anchored past rung O's insertion of 82 lines (the code cited is unchanged)

Report sections that the entry cites: [S9] `compile-ladder/rung-tuple-binding/REPORT.md`, "What changed and why".

## F-372, changed

- Size: at the base 2110 characters; at the landing 1827 characters; now 1827 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator leaves out each declaration whose method a type strictly below the declaring type declares again at the same parameter types, self apart. A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance. So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, does not stop a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). The batch's planner chose both readings as defaults, and the curator has not decided them; by the traits chapter's text, an object that reaches one method along two paths, one through a trait that declares it again, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037). A functional method with self not first is written once, not again beside the dispatch method of the same name (row 571, fixed), so such a class loads; but an object's dispatch method still tests the receiver in place of the argument, and where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error: with `object Pq extends { K, P }` declaring `mark(x: K, self)` beside `P`'s `mark(x: Any, self)`, `mark(1, Pq)` gives 3 where walk gives 1 (rows 1038 and 573). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

Now:

- F-372 **The code generator writes each inherited method once into a trait's or an object's class, runs the declaration of the lowest type that declares it, and forwards to a body that an imported api's trait holds.** For the class of a trait or an object the code generator leaves out each declaration whose method a type strictly below the declaring type declares again at the same parameter types, self apart. A dispatch method's gathering still compares declarations as schemas over each trait's own bounds, not at the instance. So the choice is a relation between two declarations, not the order of the gathered methods, and the library's shape of P-47, `MAX` in `StandardMinMax`, `StandardTotalOrder` and a type below, does not stop a class at load (row 990, fixed). A method that an imported api's trait declares without `abstract` counts as a body in that trait's class, so a trait that is not first in an extends clause gives its body, plain, generic and functional methods alike (row 732, fixed). The batch's planner chose both readings as defaults, and the curator has not decided them; by the traits chapter's text, an object that reaches one method along two paths, one through a trait that declares it again, inherits both declarations, and the checker refuses that form where the traits are self-typed and generic (row 1037). A functional method with self not first is written once, not again beside the dispatch method of the same name (row 571, fixed), so such a class loads, and its dispatch method reads each argument at its own local (F-399). Tests: `compiler_tests/TraitOwnMethodBesideInheritedCompiled`, `ApiTraitMethodNotFirstCompiled`, `TraitMethodDiamondRedeclaredCompiled`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-23 12:18Z · rewritten · from `explorations/compile-ladder/rung-self-not-first-dispatch/REPORT.md`, "The sentences that the change makes false" · by climb batch 35 gather: rows 573 and 1038 close with rung S (cites [S10])

Report sections that the entry cites: [S11] `compile-ladder/rung-method-forwarders/REPORT.md`, "What changed and why".

## F-373, changed

- Size: at the base 2104 characters; at the landing 2109 characters; now 2109 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-373 **The compiled path runs `label` and `exit`: an exit is a thrown `LabelExit` that names one evaluation of its label block, and reaches it from a loop's body and from another task.** `CodeGen.forLabel` makes a new target for each evaluation of the block and takes, in a handler, the exits that name it; `CodeGen.forExit` throws `LabelExit.of(value, target)` (`runtimeSystem/LabelExit.java`). A function expression or a task whose body exits captures the target as it captures any immutable variable. A group of forked arms joins the arms that it forked before the exit passes it: at four threads every forked iteration of a parallel `for` runs to its end or to its own exit, and the label's value is the exit of the first arm in the arms' order; at one thread the iterations after the exit do not run. No `catch` clause takes an exit. So the one library's `Indexed.indexOf` compiles in its own form (the test's `Holder.indexOf`), and row 81 is fixed. Three of the compiled answers were chosen as the path was built, and the curator has not decided them; walk answers each otherwise: which evaluation an exit leaves where the block is evaluated again inside itself, compiled the one in which the exit's function was made (row 1042); whether a `catch` of `Exception` takes an exit, compiled no (row 1040); and what an exit is after its label block has completed, compiled an uncaught `LabelExit` that ends the program (row 1041). Four limits stand, each with its test: an exit out of an `atomic` block loses the block's writes (row 1039); a `finally` clause on the exit's way does not run (row 890); a label block as a call's later argument fails verification (row 322); a label block whose value joins a numeral with a number stops the code generator (row 340), though by P-50 the numeral takes the label's expected type; a program binds the numeral to a typed variable first. Test: `compiler_tests/LabelExitCompiled`, which fails with 'Can't compile Label' without `forLabel` and `forExit`. Detail: `compile-ladder/rung-label-exit/REPORT.md`, "What changed and why" and "Points to report reached".

Now:

- F-373 **The compiled path runs `label` and `exit`: an exit is a thrown `LabelExit` that names one evaluation of its label block, and reaches it from a loop's body and from another task.** `CodeGen.forLabel` makes a new target for each evaluation of the block and takes, in a handler, the exits that name it; `CodeGen.forExit` throws `LabelExit.of(value, target)` (`runtimeSystem/LabelExit.java`). A function expression or a task whose body exits captures the target as it captures any immutable variable. A group of forked arms joins the arms that it forked before the exit passes it: at four threads every forked iteration of a parallel `for` runs to its end or to its own exit, and the label's value is the exit of the first arm in the arms' order; at one thread the iterations after the exit do not run. No `catch` clause takes an exit. An exit out of an `atomic` block commits the block's transaction (F-401). So the one library's `Indexed.indexOf` compiles in its own form (the test's `Holder.indexOf`), and row 81 is fixed. Three of the compiled answers were chosen as the path was built, and the curator has not decided them; walk answers each otherwise: which evaluation an exit leaves where the block is evaluated again inside itself, compiled the one in which the exit's function was made (row 1042); whether a `catch` of `Exception` takes an exit, compiled no (row 1040); and what an exit is after its label block has completed, compiled an uncaught `LabelExit` that ends the program (row 1041). Three limits stand, each with its test: a `finally` clause on the exit's way does not run (row 890); a label block as a call's later argument fails verification (row 322); a label block whose value joins a numeral with a number stops the code generator (row 340), though by P-50 the numeral takes the label's expected type; a program binds the numeral to a typed variable first. Test: `compiler_tests/LabelExitCompiled`, which fails with 'Can't compile Label' without `forLabel` and `forExit`. Detail: `compile-ladder/rung-label-exit/REPORT.md`, "What changed and why" and "Points to report reached".

History blocks of the range:

- Written by the gather: 2026-11-23 12:21Z · rewritten · from `explorations/compile-ladder/rung-exit-out-of-atomic/REPORT.md`, "Sentences made false" · by climb batch 35 gather: row 1039 closes with rung A (cites [S12])

Report sections that the entry cites: [S13] `compile-ladder/rung-label-exit/REPORT.md`, "What changed and why".

## F-387, changed

- Size: at the base 750 characters; at the landing 757 characters; now 757 characters, over 600.
- Section now: "Landed semantics".

At the base:

- F-387 **The compiled path compiles a primary whose math items all apply in turn to its front: `x[5]^2` is `(x[5])^2` and `g[1][2]` is `(g[1])[2]`; and a subscript as a math item before a tightly juxtaposed item: `x[5]k` is `(x[5]) k`.** The checker checks the one application that the reassociation leaves, at the expected type, and writes each subscript as a call of the subscript operator's method, as the desugaring before it writes every other subscript (`scala_src/typechecker/impls/Operators.scala`). Walk still fails on these forms (row 1), so a program for both paths writes `(x[5])^2`. Test: `compiler_tests/SubscriptThenSuperscriptCompiled.test`. Detail: `compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why", item 2.

Now:

- F-387 **The compiled path compiles a primary whose math items all apply in turn to its front: `x[5]^2` is `(x[5])^2` and `g[1][2]` is `(g[1])[2]`; and a subscript as a math item before a tightly juxtaposed item: `x[5]k` is `(x[5]) k`.** The checker checks the one application that the reassociation leaves, at the expected type, and writes each subscript as a call of the subscript operator's method, as the desugaring before it writes every other subscript (`scala_src/typechecker/impls/Operators.scala`). Walk runs these forms too (F-398), so a program for both paths may write them unparenthesised. Test: `compiler_tests/SubscriptThenSuperscriptCompiled.test`. Detail: `compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why", item 2.

History blocks of the range:

- Written by the gather: 2026-11-23 12:17Z · rewritten · from `explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md`, "Sentences made false" · by climb batch 35 gather: rows 1 and 1026 close with rung W (cites [S7])

Report sections that the entry cites: [S14] `compile-ladder/rung-checker-small-gaps/REPORT.md`, "What changed and why".

## F-393, changed

- Size: at the base 1252 characters; at the landing 1252 characters; now 1252 characters, over 600.
- Section now: "The checker and the one library".

At the base:

- F-393 **The code generator keeps a local variable in its environment for the rest of its block only, so a closure or task after an `if` arm or another nested block reads no slot of the block's bindings.** `CodeGen.forLocalVarDecl` adds a declaration's bindings to the environment of its body, after the initializer (`compiler/codegen/CodeGen.java:4822-4828`). Before, a later closure or task whose body used the name of a binding first in an arm, even as its own binding or as a numeral's coercion parameter `r` (row 983), captured the arm's slot, unset on the path that skipped the arm: 'VerifyError: Bad local variable type' (row 1078). With the repair, in one run on a scratch copy with the switch-over rehearsal's patch (`compile-ladder/plan-34/probes/rehearsal-34.patch`) less its stand-in for row 1078, `Hello` runs against the one library with the JVM's verifier on. Over that copy's compiled components, ASM's verifier refuses none of `FortressLibrary`'s 4,694 methods, and 2 methods in all, both in `RangeInternals` (row 1054), with 1,092 template classes skipped. Test: `compiler_tests/BlockBindingScopeCompiled`. Detail: `compile-ladder/rung-label-local-verify/REPORT.md`, "The cause, by the bytecode" and "The repair in the scratch copy".

Now:

- F-393 **The code generator keeps a local variable in its environment for the rest of its block only, so a closure or task after an `if` arm or another nested block reads no slot of the block's bindings.** `CodeGen.forLocalVarDecl` adds a declaration's bindings to the environment of its body, after the initializer (`compiler/codegen/CodeGen.java:4904-4910`). Before, a later closure or task whose body used the name of a binding first in an arm, even as its own binding or as a numeral's coercion parameter `r` (row 983), captured the arm's slot, unset on the path that skipped the arm: 'VerifyError: Bad local variable type' (row 1078). With the repair, in one run on a scratch copy with the switch-over rehearsal's patch (`compile-ladder/plan-34/probes/rehearsal-34.patch`) less its stand-in for row 1078, `Hello` runs against the one library with the JVM's verifier on. Over that copy's compiled components, ASM's verifier refuses none of `FortressLibrary`'s 4,694 methods, and 2 methods in all, both in `RangeInternals` (row 1054), with 1,092 template classes skipped. Test: `compiler_tests/BlockBindingScopeCompiled`. Detail: `compile-ladder/rung-label-local-verify/REPORT.md`, "The cause, by the bytecode" and "The repair in the scratch copy".

History blocks of the range:

- Written by the merged-diff review: 2026-11-23 12:59Z · rewritten · by climb batch 35's merged-diff review: CodeGen.java line citation re-anchored past rung O's insertion of 82 lines (the code cited is unchanged)

Report sections that the entry cites: [S15] `compile-ladder/rung-label-local-verify/REPORT.md`, "The cause, by the bytecode".

## F-397, added

- Size: at the base none; at the landing 1045 characters; now 1045 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-397 **A numeral with a radix point keeps its digits as written in the node that both paths read, so its digit count `n` counts its leading zeros: `00.5` is `RadixPointNumeral[\3, 1, 10, 5\]`.** `ExprFactory.makeFloatLiteralExpr` removes only apostrophes and U+202F from the numeral's text (`nodes_util/ExprFactory.java:1637-1638`), as `makeIntLiteralExpr` does, and `NumeralNumbers.of` counts `n` from that text for the checker and for walk (`nodes_util/NumeralNumbers.java:71-100`); the value, `m` and `v` are read as before. A message that quotes the numeral shows it as written, and a folded `MIN`, `MAX` or `|x|` that answers a written radix-point operand keeps its text, so its numeral type in a checker message counts the operand's zeros. Tests: `ProjectFortress/tests/RadixPointLeadingZerosWalk.fss`, `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.test`. Detail: `explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md`, "What changed and why" and "Every reader of the node's text, and what it now sees".

History blocks of the range:

- Written by the gather: 2026-11-23 12:12Z · added · from `explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md`, "What changed and why" · by climb batch 35 gather (cites [S16])

Report sections that the entry cites: [S16] `explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md`, "What changed and why".

## F-398, added

- Size: at the base none; at the landing 1522 characters; now 1522 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-398 **Walk applies a subscript that is a math item with all its indices, and binds a tuple binding's names from one run of its right side.** `x[5]^2` is `(x[5])^2`, `m[3,7]^2` is `(m[3,7])^2`, `g[3][7]` is `(g[3])[7]` and `x[5]k` is `(x[5]) k` under walk as on the compiled path (F-387): `evalAndInvokeMethod`, the one helper of `mathItemApplication`, evaluates every index as `forSubscriptExpr` does (`interpreter/evaluator/Evaluator.java:1069-1071`). A tuple binding at the top level or as a field of an object or object expression runs its right side once: a tuple expression of as many elements as names binds each name to its own element, and any other right side binds a temporary declared at the names' types, which each name reads through the desugarer's own `Local` or `Member` reference (`interpreter/rewrite/DesugarerVisitor.java:854`, `:868-877`, `:878-893`, `:897`), as the compiled path does (F-369); a numeral converts to its name's declared type, as at a single binding. An array literal inside a right side that is not a tuple expression, bound at an array type, is not built and stops at load (row 1105). So a program for both paths writes these forms unparenthesised, and binds a call's tuple to names directly. Tests: `tests/SubscriptThenSuperscriptWalk.fss`, `tests/TopLevelTupleBindingOnceWalk.fss`, `tests/FieldTupleBindingOnceWalk.fss`, `tests/TupleBindingNumeralTypesWalk.fss`. Detail: `compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md`, "What changed and why" and "Old against new".

History blocks of the range:

- Written by the gather: 2026-11-23 12:17Z · added · from `explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md`, "What changed and why" · by climb batch 35 gather (cites [S17])

Report sections that the entry cites: [S17] `compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md`, "What changed and why".

## F-399, added

- Size: at the base none; at the landing 1327 characters; now 1327 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-399 **The dispatch method of a trait's or an object's functional method reads each argument at its own local, wherever self stands.** The method is an instance method of the receiver's class, self in local 0 and the other arguments after it in their order; `OverloadSet.argumentLocal`, overridden in `ForTraitOrObject`, gives an argument before self's place the local after its place, for the type tests and the casts alike (`compiler/OverloadSet.java:2357-2363`, `:2495-2508`, `:1538`, `:1876`). A call reaches the method where the declaration that the top-level dispatch of the name chooses has a more specific one below it in the type, as an inherited one does; a declaration of the type with none below it is called at its exact signature, its body. Not reached: a generic functional method overloaded beside a plain one, on which the code generator stops first (row 724), and a generic functional method with self not first, which dies at another site (row 594). So an object or trait may overload an inherited functional method with self anywhere. Tests: `compiler_tests/FunctionalMethodOverloadSelfLast`, `FunctionalMethodCoverSelfSecond`, `FunctionalMethodSelfSecondReceiverTested`, `FunctionalMethodMeetNarrowedSelfNotFirst`. Detail: `compile-ladder/rung-self-not-first-dispatch/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-23 12:17Z · added · from `explorations/compile-ladder/rung-self-not-first-dispatch/REPORT.md`, "What changed and why" · by climb batch 35 gather (cites [S18])

Report sections that the entry cites: [S18] `compile-ladder/rung-self-not-first-dispatch/REPORT.md`, "What changed and why".

## F-400, added

- Size: at the base none; at the landing 1773 characters; now 1773 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-400 **The code generator compiles the modifier `override` by the checker's table of what an override keeps from being inherited, and the checker refuses an `override` that overrides nothing.** A trait's or an object's class holds the override and, at each hidden declaration's JVM signature, a bridge that runs it; no method runs the hidden declaration, and a dispatch over the override and the declarations of its name that it does not override is still written (`scala_src/useful/STypesUtil.scala:1798-1812`, `overriddenNotProvided`; `compiler/codegen/CodeGen.java:1224-1237`, `overrideBridges`; `:1476-1484`, `dumpOverloadedMethodChaining`). The checker refuses an `override` that appears in no overriding pair of `providedAndOverridden`, equal parameter types included, as the traits chapter and walk do: 'Invalid override of f in object B: ... has the modifier override and does not override any inherited declaration.' (`scala_src/typechecker/OverloadingChecker.scala:424`, `:763-789`). Two forms stay code-generator walls, an override of or by a method with static parameters of its own, and one in a generic type whose parameter types name a static parameter (row 1106); the checker refuses an override that overrides a declaration inherited under a conditional extension only by the clause's bound, which walk runs (row 1107) and checks none in an object expression (row 1108); under walk an object's override hides every inherited declaration of its name (row 1109). So a program may write `override` on the compiled path wherever no static parameter is involved. Tests: `compiler_tests/OverrideModifierCodeGeneration`, `OverrideBridgesCompiled`, `XXXOverrideNothingCompiled`. Detail: `compile-ladder/rung-override-compiled/REPORT.md`, "What changed and why".

History blocks of the range:

- Written by the gather: 2026-11-23 12:20Z · added · from `explorations/compile-ladder/rung-override-compiled/REPORT.md`, "What changed and why" · by climb batch 35 gather (cites [S2])
- Written by climb batch 35 repair on the merged tree: 2026-11-23 13:15Z · rewritten · from `explorations/compile-ladder/climb-batch-35/JUDGE-review.md`, "The repair" · by climb batch 35 repair on the merged tree: the row-1107 clause narrowed to what the checker refuses: OverrideAboveBoundProbe, an override f(x: Any) over f(x: T) inherited under where { T extends ZZ32 }, type checks with exit 0 on the merged tree (outcome (a) of the ruling's step 1) (cites [S19])

Report sections that the entry cites: [S2] `compile-ladder/rung-override-compiled/REPORT.md`, "What changed and why".

## F-401, added

- Size: at the base none; at the landing 1313 characters; now 1313 characters, over 600.
- Section now: "Landed semantics".

Now:

- F-401 **An exit out of an `atomic` block commits the block's transaction and keeps its writes, on both paths.** Compiled, the block's handler `BaseTask.leaveTransaction` commits on a `LabelExit` as `endTransaction` does at a normal end (`runtimeSystem/BaseTask.java:303-309`); walk's `FortressTaskRunner.doItOnce` commits on a `LabelException` as at a normal end (`interpreter/evaluator/tasks/FortressTaskRunner.java:133-141`). A commit that fails runs the block again, as at a normal end, and an exception other than an exit still discards the writes. A nested block's commit hands its writes to the outer one, whose commit on the same exit stores them. Neither path tells an exit to an enclosing label from one to a completed label block, so the latter commits the blocks it passes too (row 1041). Under walk an exit or an exception out of a `tryatomic` block that no `atomic` block encloses is wrapped in a `RuntimeException` and reaches neither its label nor a `catch` (rows 1110 and 1111). So a program may exit out of an atomic block (`Specification/basic/expressions/atomic.tex:59-63`). Tests: `tests/ExitOutOfAtomicWalk.fss`, `compiler_tests/ExitOutOfAtomicCompiled`. Detail: `compile-ladder/rung-exit-out-of-atomic/REPORT.md`, "What changed and why" and "The tests: failing on the base, passing after".

History blocks of the range:

- Written by the gather: 2026-11-23 12:21Z · added · from `explorations/compile-ladder/rung-exit-out-of-atomic/REPORT.md`, "What changed and why" · by climb batch 35 gather (cites [S20])

Report sections that the entry cites: [S20] `compile-ladder/rung-exit-out-of-atomic/REPORT.md`, "What changed and why".

## P-165, changed

- Size: at the base 1648 characters; at the landing 1648 characters; now 2258 characters, over 600.
- Section now: "Numbers".

At the base:

- P-165 **`asFloat` and the `=` built on it leave `trait Number`; each built-in number type keeps its own `asFloat`.** `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64` each declare `asFloat`, so the written conversion `asFloat(x)` into `RR64` is unchanged at every concrete type; the numeral types declare none, since no numeral value exists when a program runs (P-174). Two numbers of different types compare by `=` only where a coercion carries one into the other (P-74); otherwise the program writes the conversion, `asFloat(x) = y`. The vector norm takes a bound that promises a float; its form is the default of a fork on his review list: the norm at each of the eight number types, each by its own `asFloat` (F-324). `RR64`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` are declared at `RR64`, and coercion carries `ZZ32`, `RR32` and numerals to them. The specification's sentence follows (`Specification/basic-lib/numbers.tex:58-75`). P-74's rule, an exact conversion implicit and a lossy one written, stands. Why: the team's compiler prelude declares `Number` with nothing in it (`LibraryBuiltin/CompilerBuiltin.fss:509`), and the specification does not ground the method: its sentence that names it on `Number` is the revival's revision. The curator's rule for such a case: an early idea of the interpreter's library goes where the specification does not ground it and the later prelude eliminated it. With `Number` open (P-160), an abstract `asFloat` would force a program's own number, such as a complex number, to invent a float, and `Number`'s `=` would compare two different complex numbers by it.

Now:

- P-165 **`asFloat` and the `=` built on it leave `trait Number`; each built-in number type declares its own conversion into `RR64`, the getter `asRR64`.** `ZZ32`, `ZZ64`, `NN32`, `NN64`, `ZZ`, `QQ`, `RR32` and `RR64` each declare the getter `asRR64`, so the written conversion into `RR64` is `x.asRR64` at every concrete type, as the integer conversions are getters named for their target, `x.asZZ32` (P-161); the numeral types declare none, since no numeral value exists when a program runs (P-174). Two numbers of different types compare by `=` only where a coercion carries one into the other (P-74); otherwise the program writes the conversion, `x.asRR64 = y`. The vector norm takes a bound that promises a float; its form is the default of a fork on his review list: the norm at each of the eight number types, each by its own `asRR64` (F-324). `RR64`'s `^` at a `Number` exponent, `random`, `atan2` and `printThreadInfo` are declared at `RR64`, and coercion carries `ZZ32`, `RR32` and numerals to them. The specification's sentence follows (`Specification/basic-lib/numbers.tex:58-75`). P-74's rule, an exact conversion implicit and a lossy one written, stands. Why: the team's compiler prelude declares `Number` with nothing in it (`LibraryBuiltin/CompilerBuiltin.fss:509`), and the specification does not ground the method: its sentence that names it on `Number` is the revival's revision. The name and its form are the team's later word: its compiler prelude gives `ZZ32` the method `asRR64` (`a874948ac:ProjectFortress/LibraryBuiltin/CompilerBuiltin.fsi:253`), where `asFloat` is the interpreter library's earlier idea, and the Working Draft names neither; a getter, by the library's pattern, since the prelude's other conversions named for their target are getters (`asZZ32`, `asZZ`), and a getter may raise an unchecked exception (`Specification-1.0-frozen/basic/traits.tex:430`). The curator's rule for such a case: an early idea of the interpreter's library goes where the specification does not ground it and the later prelude eliminated it. With `Number` open (P-160), an abstract `asFloat` would force a program's own number, such as a complex number, to invent a float, and `Number`'s `=` would compare two different complex numbers by it.

History blocks of the range:

- Written by coordinator (after the landing): 2026-11-23 14:33Z · rewritten · by coordinator: His words, 2026-11-23: "Yes" (13:0x UTC) to the ask "Should the conversion into RR64 be x.asRR64, as the team's compiler prelude names it, instead of asFloat(x)?", after his page comments of 07:30 and 08:13 UTC on 11-22 asking why the conversion is a free-standing call and not a method of the number type; then "Agreed. 1" (13:2x) to the getter x.asRR64 over the prelude's literal method x.asRR64(), by the library's pattern (the team's getters asZZ32 and asZZ, Maessen, 2009-09-22; his asRR64() on ZZ32, 2009-11-17). The text was shown to him at 13:1x.

## P-174, changed

- Size: at the base 2243 characters; at the landing 2204 characters; now 2571 characters, over 600.
- Section now: "Numbers".

At the base:

- P-174 **A numeral's type exists only at compile time: the Working Draft's `NaturalNumeral` or, with a radix point, `RadixPointNumeral`, below `Numeral`, with its four numbers as static parameters; every number type, the library's too, takes a numeral through a coercion generic over the four numbers.** The four numbers are the digit count `n`, the digits after the radix point `m`, the radix `r` and the digits read as one integer in that radix `v` (`Specification-1.0-frozen/basic/expressions/literals.tex:83-129`), so `3.125` is a `RadixPointNumeral[\4, 3, 10, 3125\]`; the four are naturals of any size, and read as values in a coercion's body they are exact integers, `ZZ`; this implementation's `NN32` bound (P-40) is for sizes. The coercion's body calls the type's constructor on values computed from the four numbers, as in `coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\]) = Interval(roundDown(v, r, m), roundUp(v, r, m))`, and the compiler instantiates it for the numeral and folds it (P-176). No numeral value exists when a program runs: a numeral type has no getters, no `asFloat`, no `asString` and no `=` with a number type, and is written only as a coercion's or an operator's parameter type. A numeral has no sign: at a program's type `-3` is the type's own prefix `-` applied to the coercion's result for `3`, and a type without `-` refuses it; any other expression of numerals alone folds first (P-173) and reaches such a type only through its coercion from the folded value's type, such as `QQ` for `1/2`, since coercions do not chain. The design leaves out the binary chapter's numeral coercion and `opr ||` (`Specification-1.0-frozen/advanced-lib/binary.tex:1620-1662`). Why: the Draft gives numerals types of their own so that "library designers [can] decide how numerals should interact with other types of objects by defining coercion operations", and has libraries define the coercions into integers and rationals (`literals.tex:132-148`); the curator finishes that design, in place of the implementations' `IntLiteral` (P-76) and `FloatLiteral` (P-172). Rows 960 and 981 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written in a `comprises` clause.

Now:

- P-174 **A numeral's type exists only at compile time: the Working Draft's `NaturalNumeral` or, with a radix point, `RadixPointNumeral`, below `Numeral`, with its four numbers as static parameters; every number type, the library's too, takes a numeral through a coercion generic over the four numbers.** The four numbers are the digit count `n`, the digits after the radix point `m`, the radix `r` and the digits read as one integer in that radix `v` (`Specification-1.0-frozen/basic/expressions/literals.tex:83-129`), so `3.125` is a `RadixPointNumeral[\4, 3, 10, 3125\]`; the four are naturals of any size; this implementation's `NN32` bound (P-40) is for sizes. A coercion's body is a computation at compile time, with no method invocation: a number used as a value there converts where it stands, as a numeral does (P-173), into the type that its place fixes, and is refused statically where it does not fit, so `value object Byte(b: ZZ32)` declares `coerce[\nat n, nat r, nat v\](x: NaturalNumeral[\n, r, v\]) where { v < 256 } = Byte(v)`; where nothing fixes a type, it is an exact integer, `ZZ`. The coercion's body calls the type's constructor on values computed from the four numbers, as in `coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\]) = Interval(roundDown(v, r, m), roundUp(v, r, m))`, and the compiler instantiates it for the numeral and folds it (P-176). No numeral value exists when a program runs: a numeral type has no getters, no `asFloat`, no `asString` and no `=` with a number type, and is written only as a coercion's or an operator's parameter type. A numeral has no sign: at a program's type `-3` is the type's own prefix `-` applied to the coercion's result for `3`, and a type without `-` refuses it; any other expression of numerals alone folds first (P-173) and reaches such a type only through its coercion from the folded value's type, such as `QQ` for `1/2`, since coercions do not chain. The design leaves out the binary chapter's numeral coercion and `opr ||` (`Specification-1.0-frozen/advanced-lib/binary.tex:1620-1662`). Why: the Draft gives numerals types of their own so that "library designers [can] decide how numerals should interact with other types of objects by defining coercion operations", and has libraries define the coercions into integers and rationals (`literals.tex:132-148`); the curator finishes that design, in place of the implementations' `IntLiteral` (P-76) and `FloatLiteral` (P-172). Row 981 holds where the tree departs: walk running a numeral type written in a `comprises` clause.

History blocks of the range:

- Written by the gather: 2026-11-23 12:12Z · rewritten · from `explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md`, "Sentences of the specification made false" · by climb batch 35 gather: row 960 closes with rung R: the last sentence names row 981 only (cites [S21])
- Written by coordinator (after the landing): 2026-11-23 14:33Z · rewritten · by coordinator: His words, 2026-11-23, on the skill's example `Byte(v.asZZ32)` and his page comment of 06:49 UTC on 11-22 ("v.asZZ32 seems very wrong here. I recall nat has no methods."): at 12:5x UTC, "NO. You're gaslighting me. This is all compile time computation. No method invocations. WTF?!?"; then "YES!!" (13:0x) to the coordinator's reading: a static number in the coercion's body converts where it stands, the way a numeral does, so the example becomes Byte(v), and the checker refuses it if v can't fit. The text written was shown to him at 13:0x ("Show me now what you write"). The coordinator's earlier defence of the record's 'read as ZZ values' wording, which lost his point of 13:22 UTC on 11-09 ("No fucking getters ... I was talking about constant folding"), is corrected by this.

# The cited sections

Each cut at 2500 bytes. Print one whole with the query under its heading, from the worktree.

## [S1] .claude/skills/coordinator/references/batch.md, "The checker count and the distance"

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

## [S2] explorations/compile-ladder/rung-override-compiled/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-override-compiled/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-override-compiled/REPORT.md:15-41, 5389 bytes, cut at 2500.

~~~~
## What changed and why

**The code generator (fork O1).** `fnDeclCompilableModifiers` holds `Modifiers.Override` (`CodeGen.java:3462-3465`), so `forFnDecl` no longer refuses the modifier. With that alone the object's class held the override and a second method of its JVM name for the pair with the hidden declaration, and failed to load (PRB section 3). The code generator now reads what an override keeps from being inherited from the checker's own table: `STypesUtil.overriddenNotProvided` (`STypesUtil.scala:1787-1812`) calls `providedAndOverridden` (`:1698`) over `allMethods`, with `paramsWithoutSelfApart` as the reading of parameter types, the reading that `allMethodsNotReplaced` already uses, and gives each declaration p that an override o keeps a type of the walk from inheriting and that the type does not provide, with o. Where no gathered declaration has the modifier it returns at once, so a type without an override (every type of both libraries) costs one pass over its gathered declarations.

- `dumpOverloadedMethodChaining` (`CodeGen.java:1353-1354`, `:1476-1484`): a hidden p is no overload of its name. Where o is the type's own, p is treated as a narrowing to o: a method at p's signature forwards to o (the precedent's `generateForwardingFor(..., true)`), and p joins no dispatch method of the name (a dispatch method over the override and the declarations of the name that it does not override is written as before). Where o is a supertrait's, p is skipped.
- `dumpMethodChaining` (`CodeGen.java:1097-1099`, `:1115`, `:1165`): a hidden p gets no forwarder to its trait's body; `overrideBridges` (`:1224-1237`) writes the bridge from p's signature to o where o is a supertrait's that the class does not reach through its first supertrait (an object `extends { X, W }` with `W`'s override), once for each p.
- `checkOverrideCompilable` (`:1204-1213`) stops two forms that the bridge cannot serve yet (row 1106): a generic method compiles to a closure finder, which a bridge does not reach; and at an instance of a generic trait or object that makes p's and o's parameter types equal, as `G[\Any\]` for `override f(x: Any)` over `A[\T\]`'s `f(x: T)`, the instance class held both under one signature, 'ClassFormatError: Duplicate method name "f" with signature "(Lfortress.AnyType$Any;)..."' (a probe before the wall).

The methods of the promoted test's object class, on the final code (`javap -p -c 'OverrideModifierCodeGeneration$B.class'` after `bin/fortress compile compi
~~~~

## [S3] explorations/compile-ladder/rung-codegen-walls/REPORT.md, "1. What changed, and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-codegen-walls/REPORT.md#1. What changed, and why'`

explorations/compile-ladder/rung-codegen-walls/REPORT.md:9-18, 3508 bytes, cut at 2500.

~~~~
## 1. What changed, and why

Three changes in `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java`, and one helper that the second needs, nothing else of the original tree:

- `generateTypeReference`, its `AnyType` branch (base `:5795-5796`, now `:5845-5851`): it was empty and fell through to the throw 'Only handling some static args of generic types in extends clause' (base `:5802`). It now calls `generateTypeReference` with Any's own name, `NodeFactory.makeId(span, WellKnownNames.anyTypeLibrary(), WellKnownNames.anyTypeName)`, and no static arguments, and continues, as the `TraitType` branch does for a trait (`:5835-5837`). For a name without static arguments the method emits `GETSTATIC <its RTTI class>.ONLY` (`:5759-5767`), here `fortress/AnyType$Any$RTTIc.ONLY`, the field that the bootstrap class declares (`ProjectFortress/src/fortress/AnyType.java`, `RTTIc.ONLY`). The `BottomType`, `SelfType` and `AbbreviatedType` branches stay empty, each still ending in the throw (`:5833-5834`, `:5843-5844`, `:5852-5853`, throw `:5857`).
- `forTry` (base `:2019-2073`, now `:2019-2087`): the throw 'NYI: Forbid clauses are not yet implemented' (base `:2029-2030`) is gone. After the catch clauses, which are unchanged, each type of the forbid clause is tested in turn, as a catch clause tests its type (`DUP`, `FException.getValue`, `InstantiatingClassloader.generalizedInstanceOf`, `IFEQ`); on a match the exception's value is passed to `throwForbiddenException`. The rethrow (`ATHROW`) and the label `done` move out of the `if (catchClauses.isSome())` block (`:2041`, `:2078-2081`) and are emitted when the try has a catch clause or a forbid clause, so a try with neither emits what it emitted before.
- `throwForbiddenException` (new, `:2089-2122`): with the exception's value on the stack, it finds `ForbiddenException`'s constructor in the api index of `WellKnownNames.fortressLibrary()` (the component's own index when it is that library), takes its parameter type and its result, casts the value to the parameter's class, calls the constructor's static method through `idToPackageClassAndName` and `NamingCzar.jvmMethodDesc`, as a source call of `ForbiddenException(e)` is emitted, wraps the result in an `FException` as `forThrow` does (`NEW`, `DUP_X1`, `SWAP`, `INVOKESPECIAL`) and throws it. The api's own types are named unqualified in its index, so the descriptor is made with the library's api as the default: with the program's api the first run asked for `ForbidC
~~~~

## [S4] explorations/compile-ladder/rung-override-compiled/REPORT.md, "Points to report"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-override-compiled/REPORT.md#Points to report'`

explorations/compile-ladder/rung-override-compiled/REPORT.md:108-116, 1870 bytes.

~~~~
## Points to report

- Where the code generator now reads the override's hiding: `CodeGen.java:1097-1099`, `:1115`, `:1165` (`dumpMethodChaining`), `:1353-1354`, `:1476-1484` (`dumpOverloadedMethodChaining`), `:1224-1237` (`overrideBridges`), from `STypesUtil.scala:1798-1812`; the class of the promoted test's object, above.
- Where the checker now refuses an override that overrides nothing: `OverloadingChecker.scala:424`, `:763-789`, its message above, and walk's cases above ("Old against new").
- The tests, each failing on the base and passing after (above); row 694's form after the fix, unchanged (above).
- Lines of the libraries or the tests that the checker now refuses: none in either library (the count stage's table equal, `#total 0`; `grep -n '^\s*override ' Library/*.fss ProjectFortress/LibraryBuiltin/*.fss` prints nothing); no test (`ant testQuick` 0 failures). One test comment became false and was respelled: `ProjectFortress/compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.fss:6`, before "...under the implicit bound Any the two domains are equal, B's f overrides nothing, and the checker does not refuse that (row 653 of the gap ledger).", after "...under the implicit bound Any the two domains are equal, and B's f overrides nothing, which the checker refuses in place of its return type." Its checked value, two errors, is unchanged; a revival test, not the team's.
- The two stages' tables against the comparand, and the checker's timing before and after: above.
- Each sentence of the specification made false: above.
- Files edited beyond those named: `ProjectFortress/compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.fss:6` (a comment line). In `CodeGen.java`, three members beside the named ones: `overriddenNotProvided` (`:1188`), `checkOverrideCompilable` (`:1204`), `overrideBridges` (`:1224`); `forAtomicBlock` is untouched.
~~~~

## [S5] explorations/reviews/batch-25-review.md, "Where the text, the brief or the principles split"

`facts-extract.sh 'doc:explorations/reviews/batch-25-review.md#Where the text, the brief or the principles split'`

explorations/reviews/batch-25-review.md:173-187, 5369 bytes, cut at 2500.

~~~~
### Where the text, the brief or the principles split

**1. Shared helpers repaired the prelude's values, where P-38's title says its defects are not repaired (rung U; fork 5).** P-38: "The compiler prelude's defects are not repaired: they go with it at the switch-over." (`POSITIONS.md:35`). Rung U fixed `simpleUnsignedLongArith.unsignedLongToString` and `unsignedLongWrappingNeg`, which the one library's bindings now name and the prelude binds too, so the prelude's `NN64` printing and its prefix `BOXMINUS` changed with them: 'BOXMINUS 1: 1' became 'BOXMINUS 1: 18446744073709551615' (`ProjectFortress/LibraryBuiltin/CompilerBuiltin.fss:825`, `:832`; `RECORD.md`, "Points to report", U; F-313). Fork 5 names the change (`CLIMB-BATCH-25.md:84`), and the record's "No question for the curator" says no fork bends a decision of his (`:72-74`); neither it nor the Fable review weighs P-38. The decision's body names the prelude's own text, its `Maybe` block, its `REM` guard and its reversed spellings, which stand; the helpers and the run-time classes `FNN32` and `FNN64` outlive the prelude, and the one library needs them right (P-58; P-37, "settles which files survive, not the designs inside them"). Climb batch 24's rung K did the same for the prelude's compiled `CHOOSE` (rows 521 and 855), read under P-37 (`reviews/batch-24-review.md`, rung K, standard 3). Default: as landed. So P-38's title is false in effect for rows 326's and 860's prelude halves, and for 521 and 855 before them; the decision stands for the prelude's text (finding 4).

**2. `nextUp` and `nextDown` at a signed zero (rungs D and P; row 880).** IEEE 754-2008's nextUp of `-0.0` is the smallest positive subnormal, as Java's `Math.nextUp` gives; the team's `DirectedRounding.nextUp`, which both glue classes and both rungs' helpers call, gives the successor in IEEE's totalOrder, `0.0` (`ProjectFortress/src/com/sun/fortress/numerics/DirectedRounding.java:111-127`, its `float` twin `:25-41`). The specification names no `nextUp`; its one word on the signed zeros, "-0 is considered to be smaller than +0", is said of `MIN` and `MAX` (`Specification/basic/operators/opr-overview.tex:252`; skeptic D, "Homes"). Row 880 is `CONTESTED`, and `ProjectFortress/tests/FloatNextUpSignedZeroWalk.fss` pins today's values. D.worker.1 with P.worker.2 (`PLAN.md:669`). Default: today's values.

**3. The `test` modifier on a method (rung C; its D6).** The specification's note gives `test` to a top-level function of type `() -> ()
~~~~

## [S6] explorations/compile-ladder/rung-compiled-transaction/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-compiled-transaction/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-compiled-transaction/REPORT.md:11-45, 6801 bytes, cut at 2500.

~~~~
## What changed and why

The compiled path runs an `atomic` block as a transaction of one global sequence lock, buffered writes and validation by value (`runtimeSystem/Transaction.java`), inside a handler that `CodeGen.forAtomicBlock` writes. Six repairs, by declaration:

1. **The handlers of nested blocks and of nested try** (rows 934, 937, 888). `CodeGen.forAtomicBlock` (`CodeGen.java:1782-1814`) and `CodeGen.forTry` (`:2104-2120`) now call `visitTryCatchBlock` after the body's code. The JVM takes the first entry of the exception table that covers a throw, so the entry of a block or a try nested in the body, written when the body is visited, now comes first. `startTransaction` is emitted by `forAtomicBlock` itself, before the range, so the handler runs only when the block's transaction is the task's current one; `forAtomicBlockHelper` (`:1769-1773`) emits the body and `endTransaction`.
2. **A block's own writes** (row 933, fork X1). `Transaction.TXReadLocation` (`Transaction.java:228-248`) returns the transaction's own write before anything else and records nothing for it. A read of an ancestor's write is recorded with that write, and `validateReads` (`:255-268`) compares it with the nearest ancestor's write now, else with the committed value.
3. **A nested block's view** (row 950, fork X3). `Transaction.TXValidate` (`:275-284`) validates the transaction and then each ancestor, at one time of the global lock. `TXAbort` (`:186-189`) throws `TransactionAbortException(this)`, so the abort names the transaction whose read failed, which can be an ancestor of the one that found it. `BaseTask.leaveTransaction` (`BaseTask.java:273-294`) ends the block's own transaction and returns, so that the block starts again, only for an abort of that transaction; an abort that names an ancestor is thrown on.
4. **The shared sets** (row 949, fork X2). Every iteration of a read set or a write set is inside `synchronized` on that set: validation (`Transaction.java:256`), the write-back of a top-level commit (`:332`), the merge of reads (`:341`) and of writes (`:357`) into a parent. `Hashtable`'s own methods take the same monitor, so a put by another thread of the block waits for the iteration. A read and its record are one step under the read set's lock (`:237-246`).
5. **Two initializations of one element** (row 466's note, fork X5). The read of an element that holds nothing is recorded as `EMPTY` (`Transaction.java:77-80`, `:244`), a mark that validation reads as null (`:264
~~~~

## [S7] explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md, "Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md#Sentences made false'`

explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md:148-159, 1343 bytes.

~~~~
## Sentences made false

Of the specification: none. `grep -rn 'row~1[^0-9]' Specification --include=*.tex` and `grep -rn '~1026' Specification --include=*.tex` print nothing, and no sentence of `juxtameaning.tex`, `variables.tex`, `objects.tex` or `appendices/changes.tex` says what walk does with these forms.

Of the record and the skill (for the gather and the skill writer; this rung edits neither):

- F-363 (FACTS.md:275): "a superscript after a subscript that is a math item of its own, `x[5]^2` or `B.f()[5]^2`, compiles (F-387) and fails under walk (row 1)". Walk now runs both.
- F-387 (FACTS.md:290): "Walk still fails on these forms (row 1), so a program for both paths writes `(x[5])^2`." Walk now runs them.
- F-369 (FACTS.md:278): "Under walk the same right side runs once for each name and once more (row 1026)." It now runs once.
- `.claude/skills/fortress-repo/references/tests-writing.md:34`: "`x[5]^2` compiles, but under walk fails or gives the wrong element (ledger row 1)".
- `.claude/skills/fortress-repo/references/interpreter.md:35`: "The right side of a top-level tuple binding runs once for each name and once more ... (ledger row 1026). Bind the call to one name ...".
- Row 152's notes, "under walk the right side of such a binding runs once for each name and once more (row 1026)": record.md gives its new line.
~~~~

## [S8] explorations/compile-ladder/rung-superscript-after/REPORT.md, "Each form on the base and after"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-superscript-after/REPORT.md#Each form on the base and after'`

explorations/compile-ladder/rung-superscript-after/REPORT.md:68-91, 1857 bytes.

~~~~
## Each form on the base and after (points to report)

One program for each form, run under walk and compiled, on the old code (`tmp/…/probes/run.sh old`, through `old-fortress.sh /home/user/fortress-base33`) and on the edit (`run.sh new`). "SE" is the bare `Syntax Error` at the `^`.

| form | base, walk | base, compiled | after, walk | after, compiled |
|---|---|---|---|---|
| `x.v^T` | SE | SE | 107 | 107 |
| `(B.data^T).v` | SE | SE | 101 | 101 |
| `B.n^2` | SE | SE | 9 | 9 |
| `(B.data^*).v` | SE | SE | 201 | 201 |
| `(B.twin^T).v`, a getter | SE | SE | 102 | 102 |
| `(B.f()^T).v`, a method call | SE | SE | 101 | 101 |
| `B.n^T d` | SE | SE | 206 | 206 |
| `B.data[5]`, guard | 6 | 6 | 6 | 6 |
| `(B.data!).v`, guard | 301 | 301 | 301 | 301 |
| `(f(3))^T` | refused, "a function argument should not be immediately followed by a non-expression element" | 104 | 104 | 104 |
| `(f(3))^T d` | refused, the same | 208 | 208 | 208 |
| `((f(3))^T) d` | refused, the same | 208 | 208 | 208 |
| `(f(3))^2` | 16 | 16 | 16 | 16 |
| `f(3)^T` | refused, "Syntax Error: the argument should not be immediately followed by a non-expression element." | refused, "Item at this location must be an expression, not an operator." | the same refusal | the same refusal |
| `f(3)^2` | refused, as `f(3)^T` | refused, as `f(3)^T` | the same | the same |
| `twice(B.n)^2` | refused, as `f(3)^T` | refused, as `f(3)^T` | the same | the same |

`(f(3))^2` ran under walk on the base: the infix `^` never entered the postfix branch. `(f(3))!` and `(d^3)!` are in the test and not in this table: the probe programs of the two declared `!` on another type; on the base walk refused both ("a function argument…", "an exponentiation should not be immediately followed by a non-expression element"), which the walk test's failing run does not reach past its first assertion.
~~~~

## [S9] explorations/compile-ladder/rung-tuple-binding/REPORT.md, "What changed and why"

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

## [S10] explorations/compile-ladder/rung-self-not-first-dispatch/REPORT.md, "The sentences that the change makes false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-self-not-first-dispatch/REPORT.md#The sentences that the change makes false'`

explorations/compile-ladder/rung-self-not-first-dispatch/REPORT.md:125-129, 1193 bytes.

~~~~
## The sentences that the change makes false

- Specification: none. `grep -rn '~573\|~1038' Specification --include=*.tex` prints nothing, on the base and after; no `\revision`, `\note` or Appendix I effect speaks of the compiled dispatch of a functional method whose self is not first (`grep -rn -i "compiled path\|code generator" Specification --include=*.tex` with self, functional method or dispatch: one line, Specification/appendices/changes.tex:4461, on `self` returned at the instance's type, which the change leaves true).
- The skill, for the gather: `.claude/skills/fortress-repo/references/compiler.md:157`, "Traps of the compiled path", "Where an object overloads an inherited functional method by declarations of its own, and `self` is not the first parameter, the compiled dispatch method tests the receiver's type ... (ledger row 573) ... (ledger row 1038). Put `self` first in such overloads." is false now.
- FACTS: F-372's clause "but an object's dispatch method still tests the receiver in place of the argument, and where the receiver itself has the own declaration's parameter type, a call answers wrongly with no error ... (rows 1038 and 573)" is false now (record.md).
~~~~

## [S11] explorations/compile-ladder/rung-method-forwarders/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-method-forwarders/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-method-forwarders/REPORT.md:11-17, 2515 bytes, cut at 2500.

~~~~
## What changed and why

Three edits of the code generator, in the members that the rung's section names.

1. **One method once (row 990; fork M1).** `CodeGen.dumpMethodChaining` gathered its candidates with `STypesUtil.allMethodsNotIdenticallyCovered`, which drops a declaration that a declaration of a strict subtype covers with an equivalent domain. It compared the two domains as schemas over each declaring trait's own static parameters, bounds included (`fullyReplacedMethodDomain`, STypesUtil.scala:1599). For `mx(self, other: T): T` in `Mmx[\T extends Mmx[\T\]\]` and in `Tord[\T extends Tord[\T\]\]` the two schemas differ in the bound, so neither covered the other, both stayed, and each got a forwarder under one name and descriptor. The gathering now calls the new `STypesUtil.allMethodsNotReplaced` (STypesUtil.scala:1748; CodeGen.java:980): a declaration is left out when another of the same name and kind, with self at the same position, is declared by a type strictly below its own and has the same parameter types without self, compared at the instance that the extends clauses give (`paramsWithoutSelfApart`, STypesUtil.scala:1780, the comparison of `providedAndOverridden`). The rule is a property of pairs of declarations, so the result does not depend on the order in which the methods are gathered.
2. **A body in an api's trait (row 732; fork M2).** The loop skipped every declaration without a body. A declaration read from an imported api never has one. `hasBodyInItsTrait` (CodeGen.java:1051) now keeps a body-less declaration whose declaring trait is named with an api and which has no `abstract` modifier, the reading of the checker's `isAbstractFnDecl`; a field's getter or setter stays skipped. The forwarder that `generateForwardingFor` then writes calls the static body, or for a generic method the closure finder, in the api trait's class of default methods, which the exporting component's jar holds.
3. **Self not first (row 571).** `generateForwardingFor` looks a forwarder up among the names and signatures of the object's dispatch methods, so as not to write it beside one. It built the signature to look up by removing parameter `selfIndex` from the static body's signature, whose self is always first; with self second it removed the first argument instead and found nothing, and the forwarder was written beside the dispatch method of the same name and descriptor. Where it is not narrowing it now removes parameter 0 (CodeGen.java:870-873). The narrowing cal
~~~~

## [S12] explorations/compile-ladder/rung-exit-out-of-atomic/REPORT.md, "Sentences made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-exit-out-of-atomic/REPORT.md#Sentences made false'`

explorations/compile-ladder/rung-exit-out-of-atomic/REPORT.md:190-193, 1088 bytes.

~~~~
## Sentences made false

- The specification: none. `grep -rn '~1039' Specification --include=*.tex` prints nothing; `grep -rn '1039\|1041' Specification --include=*.tex` prints nothing; no Appendix I effect, `\revision` or `\note{}` of `atomic.tex`, `label.tex` or `transactions.tex` says what either path does with an exit out of an atomic block (`grep -n 'revision\|note{' Specification/basic/expressions/atomic.tex Specification/basic/expressions/label.tex` prints only `atomic.tex:15`, on modifiers).
- Outside the specification, for the gather: F-373's "Four limits stand, each with its test: an exit out of an `atomic` block loses the block's writes (row 1039); ..." (`explorations/coordinator/FACTS.md:280`); the skill's "An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block." (`.claude/skills/fortress-repo/SKILL.md:126`); review-queue item 561, "Who builds the exit out of an `atomic` block (row 1039)?", whose other way this rung takes (`explorations/coordinator/review-queue.md:1737`).
~~~~

## [S13] explorations/compile-ladder/rung-label-exit/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-label-exit/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-label-exit/REPORT.md:12-20, 2029 bytes.

~~~~
## What changed and why

`CodeGen.java` gets two members directly above `defaultCase` (`compiler/codegen/CodeGen.java:1800-1881`), and the runtime one class, `runtimeSystem/LabelExit.java`.

- `forLabel` (`CodeGen.java:1817`) makes a new `LabelExit.Target` for each evaluation of the block and keeps it in an immutable local under the label's name. The body is compiled in a nested scope that holds that local. An exception-table entry for `LabelExit`, written after the body's code so that the entries of a label, a `try` or an `atomic` block nested in the body come first, leads to a handler that calls `LabelExit.valueAt(target)`: it answers the exit's value where the exit names this evaluation and throws every other exit on. The value is cast to the label's type.
- `forExit` (`CodeGen.java:1862`) evaluates the `with` value, or pushes `()`, loads the target's local, and throws `LabelExit.of(value, target)`.
- `LabelExit` (`runtimeSystem/LabelExit.java:14`) is a Java `Error` that is no `FException`, without a stack trace. `LabelExit.Target` (`:19`) is an `FValue`, so that a closure holds it as it holds any immutable variable.

How an exit reaches its label from a loop's body. The body of a `for` is a function expression, and an arm of a parallel group a task; each takes the variables of the enclosing block that its body names from `FreeVariables`, in which every identifier counts (`compiler/codegen/FreeVariables.java:98`), the target of an exit among them. So the closure's class gets a field for the label's local with no change to `forFnExpr`, `delegate` or `forLetFn`. The checker lets no variable in scope share a label's name ('Cannot use an existing identifier … for a 'label' expression', `scala_src/typechecker/impls/Misc.scala:704`), so the name is free in the code generator's environment of locals. The exit thrown in the closure passes the library's code, and a group of forked arms joins the arms that it forked before it throws the exit on (`CodeGen.joinForkedArms`, `CodeGen.java:1681`; P-175).
~~~~

## [S14] explorations/compile-ladder/rung-checker-small-gaps/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-checker-small-gaps/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-checker-small-gaps/REPORT.md:11-20, 4087 bytes, cut at 2500.

~~~~
## What changed and why

Four gaps of the compiled checker, repaired in the order the brief gives, each test first.

1. **Row 1060, a block's numeral at an untyped binding** (commit 9df73b2d1b). The checker's default for a numeral at a place that fixes no type (`defaultNumeral`, `Functionals.scala:1259`) finds the numerals in a join's result positions through `joinNumerals`, and a tuple of them through `tupleJoin`. Neither had a case for a local declaration or a local function, whose body holds the rest of the block, so `x = do k: ZZ32 = 3; 4 end` left `x` a `NaturalNumeral[\1,10,4\]`, and `y: ZZ32 = x` died at run time. `joinNumerals` now reads a `LetExpr`'s body (`Functionals.scala:1332-1333`), and `tupleJoin` a `LocalVarDecl`'s and a `LetFn`'s (`:1290-1294`), as `numeralResult` (`:1317`) and `joinInto` (`:1373-1376`) do since row 1014's repair. The precedent's file has four members that walk a join's result positions; it repaired two, and this rung the other two.
2. **Row 1005, a subscript followed by a superscript** (commit d7ec58bdf3). The parser builds a `MathPrimary` of two or more math items for `x[5]^2`, and the checker reassociates it (`Operators.scala`, `checkExprOperators`, case `SMathPrimary`). Where every item applied in turn to the front, the reassociation left one application and no element after it; the checker then tried a juxtaposition of that one element, which no declaration takes, and returned the application unchecked, so the compile stopped: 'Result of typechecking still contains intermediate nodes.' The checker now checks that one application at the expected type (`Operators.scala:360-362`). With that, the code generator stopped on the subscript: 'Should not be a subscriptExpr here in codegen!' (`compiler/codegen/CodeGen.java:5729`), because the desugaring before the checker writes every subscript expression as a call of the subscript operator's method (`AssignmentAndSubscriptDesugarer.scala:75-80`) and the reassociation wrote a subscript expression. The reassociation now writes the call as the desugarer does (`Operators.scala:313-321`). The same repair compiles a subscript after a subscript, `g[1][2]`, which stopped the compile with the same message on the base (probe below), and `Maker.f()[5]^2`.
3. **Row 1029, a local tuple binding's declared name** (commit 102b1cd1fc). Where only some names of a local tuple binding declare a type and the right side is no tuple expression of as many elements, the checker typed the other names fr
~~~~

## [S15] explorations/compile-ladder/rung-label-local-verify/REPORT.md, "The cause, by the bytecode"

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

## [S16] explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md:11-22, 1943 bytes.

~~~~
## What changed and why

`ExprFactory.makeFloatLiteralExpr(Span, String)` deleted every leading zero but one from the text that it keeps in the `FloatLiteralExpr` node (base `ExprFactory.java:1640-1643`), and `NumeralNumbers.of(FloatLiteralExpr)` counts the digit count `n` from that text on both paths (`nodes_util/NumeralNumbers.java:71-100`): the checker types the node from it (`scala_src/typechecker/impls/Misc.scala:474-477`; `CoercionOracle.scala:531-533` for a negated one), and walk binds a coercion's `n` from it (`interpreter/evaluator/values/Numerals.java:208-231`). So `00.5` was `RadixPointNumeral[\2, 1, 10, 5\]`, where P-174 and `literals.tex:101` make `n` 3. The edit deletes the four lines of the trim (fork R1): the node keeps the digits as written, apostrophes and narrow no-break spaces removed, its leading zeros among them, as an integer numeral's node already does. The values are unchanged: `intPart` is read by `new BigInteger(digits, base)`, which takes leading zeros, and `m` and `v` come from the digits after the point. Now at `ExprFactory.java:1637-1640`:

```java
        // Delete every apostrophe and U+202F NARROW NO-BREAK SPACE
        s = s.replace("'", "").replace("\u202F", "");

        int dotLoc = s.indexOf('.');
```

Tests: `ProjectFortress/tests/XXXRadixPointLeadingZerosWalk.fss` promoted by `git mv` to `RadixPointLeadingZerosWalk.fss` (component renamed), and its compiled twin `ProjectFortress/compiler_tests/RadixPointLeadingZerosCompiled.fss` with `RadixPointLeadingZerosCompiledLink.test` (`link`) and `RadixPointLeadingZerosCompiled.test` (`link`, `run`, `run_out_contains=PASS`), from `explorations/compile-ladder/plan-35/probes/programs/compiler_tests/P35RadixPointLeadingZerosCompiled.fss` with its prefix dropped: a `value object Digits` whose coercion answers `bigToZZ64(n).asZZ32`, the helper bound as `FloatLiteralValuePrint.fss:17` binds it. It asserts 3 for `00.5` and 2 for `0.5`.
~~~~

## [S17] explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-walk-subscript-tuple-binding/REPORT.md:17-22, 2447 bytes.

~~~~
## What changed and why

1. **The subscript (row 1, fork W1).** A primary whose math items are a subscript and then a superscript, another subscript or an expression, as `m[3,7]^2`, `g[3][7]` or `x[5]k`, applies each item in turn to the element before it (`Evaluator.java:1191-1222`, `stepThree`). For a subscript, `mathItemApplication` calls `evalAndInvokeMethod(front, opString, sub.getExprs(), loc)` (`Evaluator.java:1187`). That helper evaluated its list by `evalInvocationArgs`, which evaluates "the tail of the list, EXCLUDING THE FIRST ELEMENT" (`Evaluator.java:1380-1397`): right for a juxtaposition's list, whose first element is the function, wrong for a subscript's indices. `evalAndInvokeMethod` now evaluates every index with `evalExprListParallel`, as `forSubscriptExpr` does (`Evaluator.java:1037`). Its one caller is `mathItemApplication`: `grep -rn "evalAndInvokeMethod" ProjectFortress/src` prints only `Evaluator.java:1069`, `:1070` and `:1187`. `evalInvocationArgs` is unchanged for its three other callers (`Evaluator.java:1312`, `:1356`, `:1377`), whose lists begin with the function.
2. **The tuple binding (row 1026, fork W2).** Walk's own rewrite, `DesugarerVisitor.forVarDecl`, turns `(first, second) = e` into a temporary `*tuple_<span> = e` and one declaration per name. Each name's initializer was a field reference on `e` itself, so `e` ran once for each name and once more (the temporary). Each name now reads its element from the temporary: `Expr tempRef = (isMember ? new Member() : new Local()).replacement(ExprFactory.makeVarRef(at, temp))` (`DesugarerVisitor.java:872`), where `isMember` is the flag `atTopLevelInsideTraitOrObject` read on entry (`:854`), before the method clears it. At the top level the reference is a variable at the top level's depth, as every top-level name's reference is; inside an object or an object expression it is `$self.*tuple_<span>`, as a reference to a sibling field is. The same member serves a field declared in tuple notation, which ran its right side three times on the base too (below); the objects chapter gives such a field the meaning of a top-level declaration (`objects.tex:295-297`).

Walk's desugarer is walk's alone: its only constructions are `interpreter/env/CUWrapper.java:215` and `:217`, and `explorations/coordinator/map/modules-and-phases.md:349` places it after the shared phase chain, with no counterpart in the compiler. So the compiled path is unchanged.
~~~~

## [S18] explorations/compile-ladder/rung-self-not-first-dispatch/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-self-not-first-dispatch/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-self-not-first-dispatch/REPORT.md:11-21, 2649 bytes, cut at 2500.

~~~~
## What changed and why

The dispatch method of a functional method, in a trait's or an object's class, is an instance method of the receiver's class: self is the receiver, in local 0, and the other arguments follow in their order without self (its descriptor skips self, OverloadSet.java:2565; the forwarding wrapper pushes self as the receiver and then the others, CodeGen.java:3818-3862). `OverloadSet.generateCall` loaded the argument at place `j` of a member's parameters from local `j + offset` for its type test (OverloadSet.java:1538 on the base) and from local `j + firstArgIndex` for the arm's call (OverloadSet.java:1876 on the base), with `firstArg()` 0 for a functional method (OverloadSet.java:2491-2493). That is right only where self is first. With self second or last, the argument before self was read from the local before its own: the first argument from local 0, the receiver. So the type test tested the receiver, and the last arm, which has no test, cast the receiver to the argument's type: a `ClassCastException` where the receiver is not of that type (row 573), and the object's own declaration for every argument where it is (row 1038).

The edit adds `argumentLocal(j, first)`, the local of the argument at place `j`, `j + first` in `OverloadSet` (OverloadSet.java:2357-2363), overridden in `ForTraitOrObject` (OverloadSet.java:2495-2508): for a functional method, an argument before self's place is in the local after its place, `j + 1`, and one after self's place in the local at its place, `j + first` with `first` 0. The type test and the arm's call read it (OverloadSet.java:1538, :1876). For a dotted method (`selfIndex` is `NO_SELF`) and a top-level function the method gives what the two sites gave before. This is fork S1 of the batch (explorations/coordinator/CLIMB-BATCH-35.md:449).

The three other sites of the file that read an argument's local are unchanged, each for its reason:

- the inference branch, `ALOAD j` (OverloadSet.java:1846), loads the parameters of a generic arm that `getFunctionToCall` converted to a function with self first, so its locals are at their places; for a functional method no program reaches it, since an object's generic functional method beside a plain one stops the code generator in `getFunctionToCall` (OverloadSet.java:2782, row 724);
- the varargs arm's array, `firstArgIndex + p + j` (OverloadSet.java:2031), takes the arguments after the `p` plain ones, self among them, so it is right wherever self stands among the p
~~~~

## [S19] explorations/compile-ladder/climb-batch-35/JUDGE-review.md, "The repair"

`facts-extract.sh 'doc:explorations/compile-ladder/climb-batch-35/JUDGE-review.md#The repair'`

explorations/compile-ladder/climb-batch-35/JUDGE-review.md:28-76, 3946 bytes, cut at 2500.

~~~~
## The repair

1. On the merged tree, with a private caches folder as the reviewer used, write and type check this program (`bin/fortress typecheck`, not `compile`: the code generator refuses an override over a declaration that names a static parameter, row 1106):

       component OverrideAboveBoundProbe
       export Executable
       trait A[\T\]
         f(x: T): String = "A"
       end
       trait G[\T\] extends A[\T\] where { T extends ZZ32 }
         override f(x: Any): String = "G"
       end
       object O extends G[\ZZ32\] end
       run(): () = println(O.f(3))
       end

   Keep it under your tree's `tmp/`. Quote its exit status and its first lines in your record. Exit 0 is outcome (a); 'Invalid override of f in trait G' is outcome (b).

2. `Specification/appendices/changes.tex:6423-6425`: replace the three lines

       the compiled type checker refuses an \KWD{override} in a generic trait over
       a declaration that the trait inherits under a \KWD{where} clause
       (row~1107).

   On outcome (a), with:

       the compiled type checker reads a declaration that a generic trait inherits
       under a \KWD{where} clause without that clause's bound, so it refuses an
       \KWD{override} that overrides the declaration only by that bound, as one
       whose parameter type is the bound over one whose parameter type is the
       clause's static parameter (row~1107).

   On outcome (b), with the reviewer's wording:

       the compiled type checker refuses an \KWD{override} in a generic trait over
       a declaration that the trait inherits under a \KWD{where} clause and whose
       parameter type is that clause's static parameter (row~1107).

   Change nothing else of the entry. The preface's item (`Specification/fortress/preamble.tex:87-88`, "\KWD{override} in compiled code where a static parameter is involved") holds and stays.

3. F-400 (`explorations/coordinator/FACTS.md:296`): with `explorations/coordinator/tools/record.py set`, replace only the clause "the checker refuses an override under a conditional extension that walk runs (row 1107)" with, on outcome (a), "the checker refuses an override that overrides a declaration inherited under a conditional extension only by the clause's bound, which walk runs (row 1107)", or on outcome (b), "the checker refuses an override over a declaration inherited under a conditional extension whose parameter type is the clause's static parameter, which walk runs (row 1107)". Commit `FACTS.md` and 
~~~~

## [S20] explorations/compile-ladder/rung-exit-out-of-atomic/REPORT.md, "What changed and why"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-exit-out-of-atomic/REPORT.md#What changed and why'`

explorations/compile-ladder/rung-exit-out-of-atomic/REPORT.md:11-18, 2508 bytes, cut at 2500.

~~~~
## What changed and why

Commits on `wip/rung-exit-out-of-atomic`: `eb2f652487` (the tests and the fix), `8bd7cfcf0a` (the expected failure of a sibling defect, row 1110), and the commit that adds this report and `record.md`.

- Compiled (`BaseTask.leaveTransaction`, `BaseTask.java:284-323`). Every compiled `atomic` block's handler takes every throwable of its body or its commit and calls `leaveTransaction` (`CodeGen.forAtomicBlock`, `ProjectFortress/src/com/sun/fortress/compiler/codegen/CodeGen.java:2148-2181`, unchanged). An exit is a thrown `LabelExit` (F-373). `leaveTransaction` now commits the block's transaction when what leaves is a `LabelExit` (`BaseTask.java:303-309`): `transaction.TXCommit()` and `ftr.recordEndTransaction()`, the two calls of `endTransaction`. A commit that fails throws `TransactionAbortException`, which the branch takes as `t`, and the existing abort code then runs the block again where the abort names this transaction, or throws it on to the block of the ancestor that it names (`BaseTask.java:317-322`), as at a normal end, where the commit's abort reaches the same handler. Any other exception still goes through `TXLeave` and discards the writes (`:310-316`). The exit is thrown on after a commit that succeeds, so the label's handler takes it as before. A nested block's commit hands its reads and writes to its parent (`Transaction.TXCommit`, `ProjectFortress/src/com/sun/fortress/runtimeSystem/Transaction.java:302-307`), so an exit that leaves a nested block and its outer one commits the inner into the outer, then the outer.
- Walk (`FortressTaskRunner.doItOnce`, `FortressTaskRunner.java:122-148`). Walk runs an atomic block in `doItOnce`, which committed only after a normal end and gave the transaction up uncommitted in its `finally`, so the cells kept the block's writes under a transaction that stayed active and was then aborted by the next reader (`interpreter/env/ReferenceCell.java`, `getValue`). A `catch (LabelException exit)` now commits as the normal end does and throws the exit on (`:133-141`); a commit that fails aborts the transaction and throws `AbortedException`, so that `doIt` runs the block again, as at a normal end. `NamedLabelException`, walk's exit with a target, extends `LabelException`. `forAtomicExpr` and `forTryAtomicExpr` both run `doItOnce` (`interpreter/evaluator/Evaluator.java:189`, `:216`).

The code generator is unchanged, so no compiled jar changes; the edit is in the runtime, which every compiled progra
~~~~

## [S21] explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md, "Sentences of the specification made false"

`facts-extract.sh 'doc:explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md#Sentences of the specification made false'`

explorations/compile-ladder/rung-radix-point-leading-zeros/REPORT.md:108-113, 2130 bytes.

~~~~
## Sentences of the specification made false

- `Specification/appendices/changes.tex:5486-5488`, in the effect of Appendix I's entry "The numeral types, their conversion and their default" (`\subsection` at `:5161`, `\item[Effect]` at `:5374`). Before: "The implementations depart from the text in these further ways, each with its row of the revival's gap ledger: a numeral with a radix point keeps only one of its leading zeros in its digit count, as the parser gives the numeral to both implementations (row~960); the interpreter loads and runs a program that writes a numeral type in a \KWD{comprises} clause (row~981); ...". After (`:5485-5487`): "The implementations depart from the text in these further ways, each with its row of the revival's gap ledger: the interpreter loads and runs a program that writes a numeral type in a \KWD{comprises} clause (row~981); ...", the sentence's other clauses whole. Edited in `535ad0a5c7`.
- `grep -rn '~960' Specification --include=*.tex` on the base printed one line, `Specification/appendices/changes.tex:5488`, the clause above, which the change made false and which is removed; on the final tree it prints nothing.
- `grep -rn -i 'leading zero' Specification --include=*.tex` prints four other lines, each true now: `basic/expressions/literals.tex:101` (the rule), `:151` (the Working Draft's `Literal`, in a `\revision`), `basic/expressions/constant.tex:147` (a concatenation of natural numerals counts its leading zeros), and `appendices/changes.tex:5510` (original text quoted). No `\note` or `\revision` box names the parser's trim.
- Outside the specification, for the gather: the skill's `.claude/skills/fortress-repo/references/interpreter.md:26`, "A numeral with a radix point keeps only one of its leading zeros, so a coercion over `RadixPointNumeral[\n, m, r, v\]` gets `n` = 2 for `00.5`, not 3 (ledger row 960).", is false now; and P-174's last sentence, "Rows 960 and 981 hold where the tree departs: the digit count of `00.5`, and walk running a numeral type written in a `comprises` clause." (`explorations/coordinator/POSITIONS.md:106`), holds for row 981 only.
~~~~

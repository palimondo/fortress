<!-- The combined post-batch review of climb batch 35, run 1 of `coordinator/CLIMB-BATCH-35.md`, the housekeeping batch of P-180: a numeral with a radix point that keeps its leading zeros in its digit count, walk's subscript before a superscript and its tuple binding run once, the compiled dispatch method of a functional method whose self is not first, the modifier `override` compiled and checked, and an exit out of an atomic block that keeps the block's writes (five rungs, R, W, S, O and A, landed at `0a83a70498` on 2026-11-23 on the curator's go of 08:4x UTC, every fork at the planner's default; run `wf_363d0bfa-6d7`, one ruling on rung W's contested fix, a merged-diff review that blocked on an Appendix I clause and its repair, a red first gate from row 1100's tie in the identity-hash order, its ruling on Fable, its repair in the checker and a green second gate), by a review worker reading only: the landed changes against P-180, P-174, P-173, P-151 and item 73's default, what the two paths still do differently, the forks and the run's items for the curator, rung W's ruling, the red gate and row 996's kind of defect, the expected-failure rule rung by rung, P-180's balance of passages and rows, the cost in three spans and by role against the estimate, re-measuring, three events, the practice's measures, the misses, the skill writer's list, the record's sentences made false, the routing, run 2's sections read against the landed tree, and a section for the curator that shows each rung on a small program. -->
<!-- Base `13f4fdea7557b867c808d0c32af5dd2a03901f4b`, base build `/home/user/fortress-base42` at `295c215c2c`; launched 09:59:31 UTC (the coordinator's Workflow call); landed on `main` as R `6f0e48f187`, W `f8b05668eb`, S `1db0e878c8`, O `d56eb8a882`, A `e8b20935d5`, the closes `8dc97a08df`, the gather's record `e922c2ea1a`, the review's corrections `b0a5943e76`, the review's ruling `f9b407369c` and repair `693fa9ec8e`, the gate's ruling `d5a419b1b7` and `023297005a`, the gate's repair `b7b5b0c02b` and the gate's tables `0a83a70498` (14:31:42), pushed by the commit stage in one atomic push at 14:31:58 with no hold; 21 agent transcripts, 21 starts and 21 results in the journal. Read against `main` at `2c8b0f234b`, whose commits after `0a83a70498` are the coordinator's POSITIONS commit `be43ddc647` (P-174 and P-165, his words of 12:5x to 13:2x UTC) and a boot note. Sources for the decisions: P-180 with its history, P-174 with its history of today, P-173 as rung W's judge cites it, P-151 with its first two blocks, P-148, P-37, F-88, F-147, F-225, F-232, F-354, F-377, F-396; review-queue items 73, 540, 558, 561, 562, 574 and 608. The gates' results are cited as their agents returned them and were not run again. The measures are `batch-measures.py`'s on the run's directory, `spend.py` over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch35/rev35/ (tx.py, brief2.py, calls_mod.py, firstmsg.py, skill.py, attach.py, usertext.py, taskrem.py, runs3.py, mainw.py and expfail.py, copied from the review of climb batch 34b; ef35.py, before35.py and parts35.py, new). Tokens are writes only (input plus cache creation, one count per message id). Besides reading, this review ran only those scripts, facts-extract.sh, `ledger.py landing-check`, `df`, grep, sed, git and the journal reads, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 35, run 1: five of five rungs, eight rows closed and eight opened; a red first gate from row 1100's tie in the overloadings' identity-hash order, repaired in the checker; the count and the distance still 0 at a green second gate; a run of 5.69M, 7 % over its estimate with the reserve, the red gate's 0.79M the whole overrun; every worker stated its expected failure in the call that first ran its test

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

Lines are `main`'s at `0a83a70498`. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. The gather applied the rungs in the manifest's order, R, W, S, O, A; one file is shared, `Specification/appendices/changes.tex`, by R (`:5486`) and O (`:6422`), two entries apart. Every hunk applied cleanly (`compile-ladder/climb-batch-35/RECORD.md`, "Conflicts"). O's 83 lines in `CodeGen.java` moved every later line by 82; the merged-diff review re-anchored the citations that the gather missed, in the rungs' files, row 1104 and F-302, F-268, F-393, F-369 and F-351 (`b0a5943e76`).

**R, a numeral with a radix point keeps its leading zeros in its digit count (row 960 closed; P-174's last sentence rewritten by the gather). `ExprFactory.java` and one clause of Appendix I; fork R1 as the plan says.**
- The fix: `makeFloatLiteralExpr` no longer trims leading zeros; it still deletes apostrophes and U+202F (`nodes_util/ExprFactory.java:1637-1638`). `NumeralNumbers.of` counts the digits as written, so `00.5` has 3 on both paths, as `007` already had (`makeIntLiteralExpr`, `:612`).
- Decisions: P-174, "the digit count `n`"; `Specification/basic/expressions/literals.tex:101`, "the number $n$ of its digits, leading zeros among them". Held.
- The readers of the node's text (`CoercionOracle.scala:223`, `:229`, `:621`; `IntegerLiteralFoldingVisitor.java:257`, `:403`; `FortressAstToConcrete.java:1650`) now see the zeros; the one visible change is a checker message that quotes the numeral, and a folded `MIN`, `MAX` or `|x|` whose numeral type counts the written operand's zeros (R.worker.1, section 2).
- Appendix I's clause on row 960 is gone (`changes.tex:5485-5487`; `grep -rn '~960' Specification` prints nothing on `main`).
- The stages on R's code: count `#total 0`, distance 'DISTANCE SAME   0' (`RECORD.md`, "Rung R").

**W, walk's subscript before a superscript, and its tuple binding run once (rows 1 and 1026 closed; row 152 rewritten; rows 1104 and 1105 opened). `Evaluator.java` and `DesugarerVisitor.java`; fork W1 as the plan says, fork W2 in two forms, one of them upheld by a judge.**
- W1: `evalAndInvokeMethod`, the helper that `mathItemApplication` calls for a subscript that is a math item, evaluates every index by `evalExprListParallel` (`interpreter/evaluator/Evaluator.java:1069-1071`), as `forSubscriptExpr` does (`:1037`). Its only caller is `:1187`. So `m[3,7]^2` is `(m[3,7])^2`, and `x[5]^2`, `B.f()[5]^2`, `g[3][7]` and `x[5]k` run. The compiled path already gave these (F-387).
- W2, as landed: a right side that is a tuple expression of as many elements as names binds each name to its own element, with no temporary (`interpreter/rewrite/DesugarerVisitor.java:868-877`); any other right side is bound once to a temporary declared at the names' types, `Any` for an untyped name, and each name reads its element from it (`:878-903`), through a member reference for a field and a local one at the top level (`:854`, `:897`). The second form is W2's words; the first departs from them, the skeptic's fix `675932404d`, contested and upheld (section 2). Both keep W2's purpose: the right side runs once.
- Beyond the fork: a field's tuple binding in an object, a generic object or an object expression runs once too (`Specification/basic/objects.tex:295-297`; `tests/FieldTupleBindingOnceWalk.fss`). The compiled path does not run that field form: it fails verification when the class loads (row 1104, older than the batch, found by W's skeptic).
- The residue: `(arr, n): (ZZ32[2], ZZ32) = if flag then ([4 5], 6) else ([7 8], 9) end` stops at load, where the base ran it (row 1105, a regression of this batch in that form; its variable form is older).
- Decisions: none names the mechanism. The judge's ground is P-173 and `literals.tex:199-208` (a numeral converts at a variable's declared type), and the checker's own two cases (`scala_src/typechecker/impls/Decls.scala:250-277`, `:280-300`).

**S, the dispatch method of a functional method whose self is not first (rows 573 and 1038 closed; F-399). `OverloadSet.java` only; fork S1 as the plan says.**
- `argumentLocal` gives the local of the argument at each place (`compiler/OverloadSet.java:2357-2363`); `ForTraitOrObject` overrides it so that an argument before self's place is read at the local after its place (`:2495-2508`). The type tests (`:1538`) and the casts (`:1876`) call it. The receiver, local 0, is read only as the call's target. Self first: the bytecode is identical old and new (`RECORD.md`, "Rung S").
- Decisions: none names the mechanism; the specification's resolution (`Specification/basic/overloading.tex:177-180`, `:298-311`), which walk already followed. Held.
- Row 594, a generic functional method with self not first, still dies at its own site, `NoSuchMethodError` (F-399). The merged-diff review compiled S and O together in one class and found them right; no gated test covers it (review-routed.1).

**O, the modifier `override` compiled, and the checker's refusal of one that overrides nothing (rows 650 and 653 closed; rows 1106 to 1109 opened; F-88, F-292 and F-315 rewritten, F-400). `CodeGen.java`, `STypesUtil.scala`, `OverloadingChecker.scala`, the preface and one Appendix I effect; forks O1 and O2 as the plan says, with one skeptic's case and one trim.**
- The code generator admits the modifier (`compiler/codegen/CodeGen.java:3462-3465`). `STypesUtil.overriddenNotProvided` lists each declaration that an override keeps a type from inheriting, from the checker's own table, `providedAndOverridden` (`scala_src/useful/STypesUtil.scala:1798-1811`), as O1 asks. Its parameter types are compared by the code generator's reading at the instance, `paramsWithoutSelfApart`, where the checker passes its own `paramsWithoutSelf`; by reading, the two can differ only where a static parameter is involved, and `checkOverrideCompilable` refuses those forms (`CodeGen.java:1204-1213`; row 1106).
- The class skips each hidden declaration (`:1115`) and holds, at its signature, a bridge that runs the override (`:1476-1484` for the type's own override; `overrideBridges`, `:1224-1237`, for one above). O1's words, "none for the declarations that it overrides", did not foresee the bridge; its behaviour is O1's, `f(B, 17)` runs `B`'s `f`, and the planner's probe had found the duplicate method that the bridge replaces (`CLIMB-BATCH-35.md`, section 2, "What the probes found").
- The skeptic's case `424b7dc1d5`: an override keeps the other declarations of its name, compiled; walk hides them all (row 1109, older). The trim `07354496e5` (section 4).
- O2: `checkOverridesSomething` refuses an `override` in no pair of the table, with walk's words, 'has the modifier override and does not override any inherited declaration' (`scala_src/typechecker/OverloadingChecker.scala:763-789`, called at `:424`). It follows the chapter's rule, not walk's gap: it refuses `XXXOverrideNothingConditionalExtensionWalk`, which walk loads (row 693), as the coordinator's rewording of O2 asks (`38131c1671`). Item 73's default, "strict", holds: equal parameter types are refused, and at a generic instance accepted, as walk does (F-147).
- Two departures from the rule's reach: the checker refuses a valid `override` under a conditional extension (row 1107; the base refused the program already) and checks none in an object expression (row 1108).
- P-148: the worker's pair, 1m26.4s on the base and 1m13.6s on the change; the skeptic's, 1m13.0s and 1m21.7s; the tables equal. No slowdown of several times.
- The specification: the preface's item now names only the part still refused (`Specification/fortress/preamble.tex:87-88`); the effect of `\seclabel{revival-supported}` names rows 1106 and 1107 (`changes.tex:6420-6428`), the row-1107 clause narrowed by the review's repair (`693fa9ec8e`). The team's note `Specification/basic/traits.tex:15-16`, "the \KWD{override} modifier ... not yet supported", is false on both paths and stays, as the section asks.

**A, an exit out of an atomic block keeps the block's writes (row 1039 closed; rows 1110 and 1111 opened; row 1041 rewritten; F-401, F-373 and F-351 rewritten). `BaseTask.java` and `FortressTaskRunner.java`; fork A1 as the plan says, with one consequence beyond the section.**
- Walk: `doItOnce` catches the `LabelException`, commits, and throws it on; a failed commit aborts and the block runs again (`interpreter/evaluator/tasks/FortressTaskRunner.java:133-141`). Compiled: `leaveTransaction` commits on a `LabelExit`, and a stale commit takes the abort path (`runtimeSystem/BaseTask.java:303-309`). Any other exception discards the writes, as before. That is A1 word for word, and `Specification/basic/expressions/atomic.tex:59-63`.
- Beyond the section: an exit that runs after its label block has completed now commits the atomic blocks it passes, on both paths, since neither path tells it from an exit to an enclosing label. Under walk, with a `catch e LabelException` outside, `w := 5` is kept, 'w = 5', where the base printed 'w = 0' (`compile-ladder/rung-exit-out-of-atomic/REPORT.md`, "Row 1041, run once after the fix"). The section asked to "leave its behaviour as it is on both paths" (`CLIMB-BATCH-35.md`, section A, "Rows"). Section 2 has it.
- One thread and four: each test failed on the base and passed after at both; the four-thread atomic runs, 72 of 72 'PASS' on A's code and at the gate.

**The gate's repair, the checker's tie at `self` in a trait that comprises an object (row 1100 rewritten, not closed; row 996 noted). `Functionals.scala` only.** Section 3.

**What the two paths still do differently after this run.** Each is a row or a fact; climb batch 34b's differences stand as its review gives them.
- An `override` of or by a method with static parameters of its own, or in a generic trait whose parameter types name a static parameter: compiled, refused, 'Can't compile an override ...'; walk runs it (row 1106).
- An `override` under a conditional extension, as `override f(x: ZZ32)` over `A`'s `f(x: T)` in `trait G[\T\] extends A[\T\] where { T extends ZZ32 }`: the checker refuses it; walk prints `G` (row 1107).
- An `override` that overrides nothing in an object expression: walk refuses it; the checker accepts it (row 1108).
- An override beside another declaration of its name, as `B`'s `override f(self, other: Number)` beside `A`'s `f(self, other: String)`: compiled, `f(B, "s")` runs `A`'s; walk stops, 'Unification error' (row 1109).
- A field's tuple binding over a call: walk runs the call once; compiled, the class fails verification (row 1104).
- An exit or a throw out of a `tryatomic` block that no `atomic` block encloses: walk dies before the label or the `catch` (rows 1110, 1111); the compiled path cannot compile `tryatomic` (row 353).
- An exit after its label block has completed: compiled, the program ends with `LabelExit`; under walk a `catch` of `LabelException` takes it (row 1041). Both now keep the writes of the atomic blocks it passes.
- A generic functional method with self not first: compiled, `NoSuchMethodError`; walk runs it (row 594).
- Now the same, where the base differed: the digit count of `00.5`; `m[3,7]^2`, `x[5]^2` and `g[3][7]`; a top-level tuple binding run once; a functional method with self second or last; the modifier `override` in its plain form, and the refusal of one that overrides nothing; an exit out of an atomic block.

### 2. The decisions that landed at a default

The record's section 3 gives run 1's forks B1, B2, R1, W1, W2, S1, O1, O2 and A1, none consequential by the planner's reading and by the check before the launch (`coordinator/climb-batch-35-review.md`, check 5). The run's result holds seventeen items for the curator in eleven entries of `PLAN.md:936-946`, "Climb batch 35, listed for his review". "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions"). B1 and B2 order the work and change no program. Those that change what a program does or accepts follow, each with a one-line route: a question that waits for him, or a default that only informs him.

**Forks R1, W1, S1 and O1: as the plan says, not consequential.** Each builds the specification's answer that walk or the compiled path already gave, changes no decision, and can be undone; O1 with the bridge that section 1 names. Each informs him.

**Fork W2, and rung W's ruling.**
- Landed: section 1, W. The worker built W2's words for every right side; its untyped temporary made a numeral take its default, so `(u: NN32, r: RR32) = (5, 0.5)` stopped at load, 'Type mismatch binding 5: ZZ32 (type ZZ32) to un (type NN32)', where the base bound it. The skeptic's fix `675932404d` binds a tuple expression element by element and types the temporary otherwise.
- **The judge ruled "Stands": the fix is upheld and nothing is reverted** (`compile-ladder/rung-walk-subscript-tuple-binding/JUDGE.md`). Why: the worker's form broke P-173 and `literals.tex:199-208`, under which a numeral converts at a name's declared type; the checker splits the same two cases (`Decls.scala:250-277`, `:280-300`); W2's purpose, one run of the right side, still holds; and a revert would refuse every typed tuple binding of a numeral at a non-default type, a form that programs meet more often than the residue. The residue, row 1105's `if` form, lands unrepaired: both ways that remove it, `Coercions.coerceTuple` building an array literal, or a raw temporary, edit files outside the rung's section and change how every walk binding converts.
- Against the plan: W2's purpose as planned; its words for the tuple expression not. Not consequential: P-173 is upheld, not bent; microGPT's six tuple bindings of literal tuples change no line and bind the same values, at load as before (W.reserved.2's entry). It can be undone.
- W.judge.1 and W.reserved.3, the regression: a default that only informs him. P-180 already says what follows: "A ledger row records a defect until its fix lands; it is no place to leave one." So row 1105 goes into the next housekeeping batch's list first (Part 5), with no question to him.
- W.judge.2 and W.reserved.4, the message that names the temporary; W.reserved.1 and W.reserved.2, the outputs that changed as the specification says: defaults that inform him.

**Fork O2: as the plan says, as reworded; not consequential.** The compiled checker now refuses programs that it accepted: an `override` that overrides nothing, also at equal parameter types (item 73's default, "strict"). The chapter's rule makes each a static error (`Specification/basic/traits.tex:680-683`), and walk refused them already. It informs him.
- O.worker.1, the preface and the effect: done by the gather; informs.
- **O.worker.2 asks him what P-151 already settles.** It asks whether the checker's refusal of row 1107's program is a departure to repair, or whether "strict" at `T extends ZZ32` makes the override override nothing (`PLAN.md:940`). P-151: "A trait or object that extends a type under a `where` condition is that type only where the condition holds, and its members are checked with the condition holding (conditional extension)"; its first block records his acceptance of that rule at 12:35 and 16:42 UTC on 2026-10-16. The checker reads `A`'s `f` with the condition not held (`OverloadingChecker.scala:384-385`, row 1107's own note), against P-151. And at an instance where the parameter types become equal, the tree counts the override as overriding (F-147, `OverrideGenericInstanceEqualTypesWalk`, which O's checker accepts). The row already files it as an implementation gap of the checker. So it is a default that informs him, and row 1107 is a repair under P-180, not his question.

**Fork A1: as the plan says for an exit to an enclosing label; its reach into row 1041 is consequential, and it is on his list in the right way.**
- Landed: section 1, A. The commit on an exit is A1's; the specification's sentence decides it.
- The reach: an exit after its label block has completed now commits the atomic blocks it passes, and walk prints 'w = 5' where it printed 'w = 0'. Row 1041's question, item 100 of `PLAN.md` and review-queue item 562, is his and open; the specification is silent on such an exit (the row's notes). So this choice is among ways that the record does not settle, which makes it consequential by the rule. It can be undone: discarding the writes needs each path to track which label evaluations are live (`BaseTask.java:303`; `FortressTaskRunner.java:133`).
- It landed and went on his list as A.worker.1 and A.skeptic.1 (`PLAN.md:941`), the skill's way 2, "Landed, then reviewed". The plan's "leave its behaviour as it is" was not met, and could not be by A1's mechanism; the worker and the skeptic said so.
- A question that waits for him, as part of item 562: keep the commit, or discard the writes of such an exit.

**R.worker.1 and R.skeptic.1: a default that informs him.** A folded `MIN`, `MAX` or `|x|` of a written radix-point operand keeps that operand's text, so a checker message shows `RadixPointNumeral[\3,1,10,5\]` for `00.5 MAX 0.1`, was `[\2,1,10,5\]`. No coercion reads a folded constant's numbers (P-174). Not consequential.

**gather.1 and review-routed.1: defaults that inform him.** Four PLAN entries ask for work that the landing did (Part 4); a test owed where S and O meet.

**The gate judge's three items.**
- judge-gate.1, the ruling's diagnosis by run in place of a bisect or dropping rung O: informs him. It follows `references/batch.md`, "Reserved points and repairs": "do not bisect. Find the cause as a whole".
- **judge-gate.2 is the coordinator's, not his.** It asks whether a rung that changes the checker or the code generator should run `ant testOneLibrary`, "a change to the briefs, his to decide" (`PLAN.md:945`). The briefs and the script are the coordinator's to change between batches (the `coordinator` skill, `references/batch.md`, "The workflow": "Between batches, improve the script and the manual where a batch showed a problem"). It is process finding 2 here, and it leaves his list.
- **judge-gate.3's default contradicts the record.** It keeps "no rung planned" for the checker's other hash-ordered ties, citing item 574 (`PLAN.md:946`). The queue's triage of the same morning reads item 574 as settled by P-180: "the tie is repaired ... not left with no rung" (`review-queue.md:941`). So its default becomes a rung, by P-180; it informs him.

**A decision with no item: the gate repair's choice at a tie that `self`'s type makes.** The repair keeps the trait's own declaration, so `denominator(self)` in `QQ` compiles at `QQ`'s arrow. Its report says that the specification's static choice is the listed type's declaration, `Ratio`'s, the more specific at `self`'s type (`Specification/basic/expressions/var-ref.tex:63-69`; `overloading.tex:355-358`), and that where a listed type's declaration returns a strictly narrower type, the specification gives the narrower static type (`climb-batch-35/REPAIR-gate.md`, "Deviations from the ruling", 3). The two ways differ only there, and no such pair is in either library. It landed with no ledger row and no item. Not consequential: the specification settles the answer, the repair departs from it for the code generator's want of a cast (F-377) and of the overload method (row 815), and it can be undone. Owed: a row, and a default that informs him (Part 4).

### 3. The red gate

**What went red.** The first gate, on `e922c2ea1a`'s code (12:48 to 13:13 UTC): `fast-onelibrary/OneLibraryJUTest`, 40 tests, 9 failures, every run test of the track, each at the one library's class load: 'java.lang.VerifyError: Bad type on operand stack ... `fortress/FortressLibrary$QQ$DefaultTraitMethods.isFinite` ... @1: invokestatic ... Type 'fortress/FortressLibrary$QQ' (current frame, stack[0]) is not assignable to 'fortress/FortressLibrary$Ratio''. Every other step was clean, and the fourteen components compiled. The last landed gate had 40 and 0, and no test or library file of the track changed in the batch (`climb-batch-35/JUDGE-gate.md`, "What is red").

**The cause, as the judge and the repair found it.**
- The judge read both rungs that touch the compiled path, S and O, as inert at this call site: no declaration of the one library has the modifier, so O's lists are empty, and S's `argumentLocal` acts only in a dispatch method. It put forward one hypothesis, unmeasured: F-354's and row 996's kind, an order that follows the JVM's identity hashes, moved by O's new code, which hashes on every trait and object before it returns empty (`JUDGE-gate.md`, "The likely cause").
- The repair confirmed it by run, with one correction. The one merged build compiled `isFinite`'s call at `(Ratio)` in ant's onelibrary JVM and at `(QQ)` in every one-JVM `fortress junit` run, default and `-XX:hashCode=0`; the base made `(QQ)` in each. So the choice followed the JVM's history, and no rung's logic was the cause.
- The site is the checker's, not the code generator's. In a trait whose `comprises` clause lists types, the checker types `self` as the trait met with them, and reads `QQ`'s own `self` parameter the same way (`scala_src/types/TypeAnalyzer.scala:185`, `:579-586`; `CoercionOracle.scala:77-78`). So `QQ`'s `denominator(self)` and `Ratio`'s have equivalent domains, and neither is more specific. The tie kept the head of a sort that keeps its input order (`PartialOrder.scala:53`), and the input was the overloadings in the identity-hash order of the index's `Function`s (`ExprDisambiguator.scala:431`, `:482`; `TopLevelEnv.java:465-466`; F-232). The call's descriptor followed the head's arrow, with no cast (`CodeGen.java:1783`). Row 935 records that order; row 1100 records this tie's failure (`REPAIR-gate.md`, "The site").
- The judge's step 4 premise, that `Ratio`'s declaration is not applicable at the argument's static type, was wrong against the specification; the repair said so (its "Deviations", 3).

**Does the repair fix the cause or hide it?** It fixes the order dependence of this kind of tie, and does not hide it. The judge forbade moving the hashes back by reshaping O or S (step 4), and the repair did not. The tie now keeps the candidates that take each argument with `self` read as its trait alone, where some but not all do (`scala_src/typechecker/impls/Functionals.scala:1103-1134`). A copy that reversed `denominator`'s overloadings reproduced the failure in a one-JVM run, and the same copy with the fix compiled its 14 calls at `QQ`; after the fix, all 28 calls of `numerator` and `denominator` in `QQ`'s default methods are at `QQ` in both hash modes. `ant testOneLibrary`: 'Tests run: 40, Failures: 0'. Three limits stay:
- It fixes one kind of tie. Every other tie among the most specific candidates still keeps the first in the hash order (row 935), and the code generator's method and test orders still follow the hashes (row 996).
- Its choice is the trait's declaration, not the specification's (section 2, the decision with no item). The tie itself comes from reading `QQ`'s own `self` parameter as the meet; F-225 has the exclusion test read a `comprises` trait's signatures plain. By reading, not run.
- Its gated test, `compiler_tests/ComprisesSelfAbstractFunctionalMethodCall`, passed on the unfixed merged code in the default hash mode, 'OK (3 tests)', and failed only under `-XX:hashCode=0` (`REPAIR-gate.md`, "Tests"). So in the gate it guards the fix only when the JVM's order happens to put the object's declaration first; the nine run tests of the track depend on the order the same way. The test asserts that the trait's default methods load, not the getter's value, which waits for row 815 (its "Deviations", 4).

**Could a rung or a stage have caught it before the gate?**
- No rung ran the onelibrary track, and none was asked to. Section O asked for `ant testQuick` and the two stages; `library.md` asks for `ant testOneLibrary` only after an edit of one of the fourteen components, and `tests-running.md` leaves the whole tracks to the gate after an edit of the code generator. The gather's merged-tree tests named the batch's own compiled tests, 70 `.test` files (`RECORD.md`, "The tests on the merged tree").
- Whether O's own `ant testOneLibrary` would have failed is unmeasured. The repair showed the failure in ant's JVM and not in a one-JVM run of the same build, so such a run is a net with holes.
- The record could have. Row 1100, opened by climb batch 34b's rung C, already said "`Ratio` when `FortressLibrary` compiles after other programs in one JVM"; F-396 says "The library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first"; and the skill teaches the same workaround (`references/compiler.md:58`). The inventory filed that passage in group (c), road work, the batch after's item 5 (`compile-ladder/plan-35/probes/skill-workarounds.md`, c9). So a known defect, left with a workaround of order, met a change of the compiler that moved the hashes, and the workaround stopped working. That is P-180's own case: it cost 0.79M and 71 minutes (section 7).

**What it says about row 996's kind of defect.** A compiled output that follows the JVM's identity hashes has now turned a gate red once, as F-354 foresaw: "a result that depends on the order can come and go between builds". The output was a call's descriptor, the site the checker's candidate order (row 935), not row 996's code generator order, as row 996's new note says. Any later change of the compiler, run 2's rung M in the code generator or rung E's edit of the one library among them, can move the hashes again and bring another order-dependent tie to the gate. The cure is the order itself: the repair's way not taken, `TopLevelEnv.unambiguousFunctionNames` sorted by the declarations' spans, changes the head of every tie, the generic ties of rows 499, 1046 and 1047 among them, whose tests were written against today's heads. That is a rung under P-180, with item 574 as the triage reads it (Part 5).

### 4. The expected-failure rule, rung by rung

The form: `tests-writing.md`, "The order", step 2: the call that first runs a test echoes a line that starts `Expected failure:` before the harness command, and the run fails that way. Review-queue item 608 holds the form, way 3, open for his review as landed. Read by call from the transcripts (`ef35.py`, `before35.py`).

**Every worker echoed its line in the call that first ran its test, before any edit of code, and every first run failed as stated, except one case that the worker corrected before its fix.**
- R: call `MwHN6h` (10:57:15), the walk test: 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section "Literals": 00.5 has three digits', 'Tests run: 1,  Failures: 1'; call `WnhYVi` (10:57:34), the compiled pair: the link 'OK', the run 'FAIL:  2 =/= 3; ...'. First edit 10:58:18.
- W: call `6i7PPx` (10:32:04), both lines, then both tests: 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once', 'FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript', 'Tests run: 2,  Failures: 2'. Its third test, the field form, beyond the section, also echoed its line, and failed on the old code as stated.
- S: call `SyheQ6` (10:53:07), four lines: three runs failed as stated ('...$C cannot be cast to class ...$N1', '...$Pq cannot be cast to class ...$Ka', 'FAIL:  3 =/= 1; mark(1, Pq): ...'); the fourth, a case the worker had added to row 571's plain test, passed. The worker found why, rewrote the case, echoed a new line (10:53:50, 'ClassCastException: class ...$C cannot be cast to class ...$N0'), and saw it fail so; a trait case the same way (10:55:38). First edit of `OverloadSet.java` after those. Before its first harness run the worker ran the existing plain test's program once by `old-fortress.sh`, to read its dispatch bytecode; no new test's program ran any other way first.
- O: call `La3vmv` (10:02:51): 'Don't know how to compile this kind of FnDecl. node = f(self:B,other:Number):String' at the link, 'Must satisfy typecheck_err_contains' for the refusal test, 'Tests run: 4,  Failures: 4'. First edit 10:06:21.
- A: call `LDihaA` (10:03:30) and `cHZ3Eb` (10:03:50): 'FAIL: a ZZ32: 0 =/= a ZZ32: 7; writes within a block that an exit leaves are retained' and 'FAIL:  0 =/= 7; ...'. The nested cases each with its own line, one assertion removed for each run: '0 =/= 1', '0 =/= 2'.

**The skeptics.** Each `SKEPTIC.md` check 2 names the worker's call and time, and each matches the transcript (R `:24`, `:30`; W `:12`; S `:8`; O `:11`; A `:10`). Three skeptics wrote tests of their own, and each echoed its line before the test's first run: W's (11:38:25, on the worker's head; its run on the base failed another way, 'FAIL: a NN32: 68 =/= a ZZ32: 68', a `SEQV` comparison of row 807, which it rewrote before going on); O's (the kept-overload case, on the base through `old-fortress.sh`, 'Tests run: 3,  Failures: 3'); A's (its `XXX` test, as is and changed for one run: 'OK Saw expected exception', then ' Missing expected failure '). R's and S's skeptics wrote no test. No report claims a statement that its transcript does not hold.

**The gate's repair** echoed its line before its test's first runs; in the default hash mode the test failed another way, then passed, and only under `-XX:hashCode=0` did it fail as stated. The repair found why and wrote it (section 3).

**Each "Skeptic's trim:" commit.** One, O's `07354496e5`: the bridge from a declaration that the type's own override hides is written where the override is read, in place of entering the narrowing branch with an empty loop; the team's `narrowed`, `narrowed_func` and loop lines keep their text (`CodeGen.java:1476-1490`). Behaviour kept: the classes of `OverrideModifierCodeGeneration` byte for byte the worker's, 'OK (26 tests)', and the merged-diff review read it so (its `fixesChecked`).

**Against climb batch 34's run 1,** where no worker and no skeptic wrote the line: the form of way 3 works in its second batch. Every first failure matched, or its cause was found before the fix.

### 5. P-180 in this batch

**The passages made needless or false.** The record's list for the skill writer names seven of run 1 (`CLIMB-BATCH-35.md`, "For the skill writer"); each holds on `main` as quoted:
- `references/interpreter.md:26`, the leading zeros (row 960, R): goes.
- `references/tests-writing.md:34`, "and `(x[5])^2`" and "and `x[5]^2` compiles, but under walk fails or gives the wrong element (ledger row 1)" (W): goes; `f(x)^T`'s refusal stays.
- `references/interpreter.md:35`, the tuple binding run once for each name and once more (row 1026, W): goes; the lead-in at `:33` stays for rows 1024 and 1025.
- `references/compiler.md:157`, "Put `self` first in such overloads" (rows 573, 1038, S): goes.
- `references/revival-changes.md:32`, "Two departures: the checker accepts such an `override` (row 653), and the code generator refuses every `override` modifier ... (row 650)" (O): goes.
- `references/compiler.md:89`, "such as `override` (ledger row 650)" (O): rewritten.
- `SKILL.md:126`, "An `exit` out of an `atomic` block loses the block's writes ... Set a flag in the block, and exit after the block." (row 1039, A): goes, or becomes the rule that an exit keeps the writes.
- One more, made false by the gate's repair: `references/compiler.md:58`, "compile the `FortressLibrary` component first. Compiled after other components, its `QQ`'s default methods fail verification ... (ledger row 1100)". The inventory's c9.

**Each closed row, path by path.**
- 960: closed on both paths, by the node that both read.
- 1: walk now as the compiled path; both agree.
- 1026: both agree at the top level. A field's tuple binding over a call now runs once under walk and fails verification compiled (row 1104), so at that form the paths still differ, the other way round.
- 573 and 1038: the compiled path now as walk; row 594's generic form still differs.
- 650: the plain `override` compiles; the forms of row 1106 stay refused where walk runs them; walk departs at row 1109 where the compiled path is right.
- 653: the checker now refuses as walk does, but for row 1107 (refuses a valid program) and row 1108 (no check in an object expression).
- 1039: both paths keep the writes; `tryatomic` departs under walk (rows 1110, 1111) and does not compile (row 353).
- 1100, fixed by the gate's repair, is not closed yet (Part 4).

**The rows opened against the rows closed.** Eight closed, 960, 1, 1026, 573, 1038, 650, 653 and 1039, and a ninth fixed, 1100. Eight opened, 1104 to 1111:
- one regression that this batch made, row 1105's `if` form (its variable form is older);
- two residues of the closed rows' new features, 1106 (of 650) and 1108 (of 653);
- five older defects that the batch's probes found: 1104, 1107, 1109, 1110 and 1111.
- Five of the eight carry a workaround in their notes (1104, 1105, 1109, 1110, 1111). None reached the skill: since `403a0e60cb` the record-landing's skill task names a new trap for the coordinator and adds no sentence.
- Two are a line each by reading: rows 1110 and 1111 share one rethrow in `Evaluator.forTryAtomicExpr` (`Evaluator.java:229-231`; row 1110's notes, "by reading the fix is that rethrow alone").

So the balance is even, 8 against 8, 9 against 8 with row 1100. The process review's ask on P-180's scope (`reviews/process-dead-ends-2026-11-23.md`, A1) recommends reporting this balance at each landing and gating nothing on it; this is its first figure.

### 6. The gate, the count, the distance and microGPT

**The first gate, red,** on `e922c2ea1a`'s code: section 3. Its `testSystem` 886 and `testSpecData` 130 clean, 72 of 72 atomic runs, no ladder move, the count 'COUNT SAME   0', the distance 'DISTANCE SAME   0' (133 s, `FortressLibrary` 88 s).

**The second gate, green,** on `b7b5b0c02b`'s code (14:05 to 14:29): 0 failures in 3,682 tests in 64 suites (climb batch 34b's 3,654). `CompilerJUTest` 1,785 to 1,806 (the batch's compiled tests and the repair's), the system shards 879 to 886, `OneLibraryJUTest` 40, `SpecDataJUTest` 130. 24 atomic programs, 72 of 72 `PASS`. The ladder with no move, the 18 microGPT components at `disambiguate`. The checker count 0 over 14 apis, `#crash none`, the shadow matching; the distance 0, every kind 0. No row of the count's table is new or risen, so no rung edit is tied to one. `gate_compare` printed nothing. microGPT's walk check at the commit stage: 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' for both programs (43 s and 35 s). F-34's count of refused declarations stays 0 by the gate's `OneLibraryComponents.test`, which compiled the fourteen in both gates (climb batch 34b's process finding 4 makes that test the measure).

**The comparisons.** Nothing hidden goes to the list. No line of the team's tests was rewritten; one revival test's comment changed, its checked value kept (`compiler_tests/XXXOverrideGenericReturnTypeNotSubtype.fss:6`).

**The stages' seconds, and the machine.** The count stage about 73 s by the log's file times, the distance stage 127 s (`FortressLibrary` 81 s) at a start load of 0.19 beside `testFast`. The VM restart of 08:32 UTC gave a 2.30 GHz Xeon; climb batches 34 and 34b ran on 2.10 GHz (the gates' `# machine` lines). So the figures do not compare with 34b's 105 s and 176 s. F-240 now sets 127 s "against 176 s (108 s) at 0.22 at climb batch 34b's" without the CPU (Part 1).

**After the review's repair.** `693fa9ec8e` changed only `Specification/` and `explorations/`, which no gate step reads; the gate did not run again for it. The commit stage copied the repair's PDF, built on the same text, and built nothing.

### 7. The cost, by role, against the record, and in three spans

**The run wrote 5.69M over 21 transcripts, in 4 h 33 min** (09:59:31 to 14:32:43 UTC; `batch-measures.py` gives the same 5.69M). Span 3 counts it without the commit agent, whose transcript changed after the span: 5.55M. One agent ran on Fable, the gate's judge, as the second ruling on the merged tree (`judgeTier`, `climb-batch-workflow.js:55`).

By role (writes, then share):
- Rung workers (5): 1.72M, 30.3 %. O 513K, S 320K, A 316K, W 289K, R 285K.
- Skeptics (5): 1.47M, 25.9 %. O 340K, W 338K, A 327K, S 248K, R 221K.
- The judge on W's contested fix: 175K, 3.1 %.
- Gather 446K, 7.8 %. Merged-diff review 367K, 6.5 %. First gate 171K, 3.0 %. Commit 139K, 2.4 %. Disk 64K, 1.1 %.
- On the merged tree: the review's ruling 163K and repair 177K; the gate's ruling 165K (Fable), repair 489K and second gate 136K: 1.13M, 19.9 %.

**Against the record:** "Run 1: about 4.5 million tokens written, 5.3 million with the reserve. The range is 3.9 to 6.2 million. About 4 hours, 4 hours and 45 minutes with the reserve." (`CLIMB-BATCH-35.md`, section 2, "Cost and time"). **5.69M: 26 % over the estimate without the reserve, 7 % over it with the reserve, inside the range; 4 h 32 min to the commit stage's last commit, against about 4 h and 4 h 45.** By role:
- **R: 0.51M against 0.5 (+1 %).**
- **W: 0.63M against 0.55 (+14 %),** 0.80M with its judge, which the reserve held.
- **S: 0.57M against 0.6 (−5 %).**
- **O: 0.85M against 0.85 (0 %).** The check before the launch named it the likeliest to run over; it did not.
- **A: 0.64M against 0.8 (−20 %).**
- **The five rungs: 3.20M against 3.3 (−3 %).**
- **The fixed roles: 1.19M against 1.2 (−1 %).**
- **The reserve: 1.31M against 0.8 (+63 %):** W's ruling 175K; the review's ruling and repair 340K; the red gate's ruling, repair and second gate 790K.
- **The minutes.** The rung stage 2 h 11 (09:59 to 12:10), two agents at a time, the workers in the order O, A, W, S, R; the gather 38 minutes; the review 15 beside the gate's 25; the review's ruling and repair 10, the repair waiting for the gate to end; the red gate's ruling, repair and second gate 71 (13:19 to 14:30); the commit stage 3.

**What the red gate cost: 0.79M and 71 minutes,** the whole of the run's overrun on the estimate with its reserve (5.69M − 5.3M = 0.39M), and the reserve's priced second gate among it. The planner priced the reserve as "one ruling on a rung with its repair, one on the review with its repair, and a second gate", 0.8M in all; the gate's repair alone wrote 489K.

**The cost in three spans, each on its own folders,** as `spend.py` from a span's start less `spend.py` from its end. A transcript counts in the span where it last changed. The folders: the session's Agent-tool workers, the workflows' folders but this run's, the project's folder of headless runs, `-home-user-fortress-landing-34b`, and the scratchpad folders of headless runs.
- **Span 1, climb batch 34b's landing work,** from its commit stage's last commit `295c215c2c` (01:11:55 on 11-21) to the coordinator's revival-page step after the record-landing workflow `wf_a4427a24-bae` (journal last written 03:10:19): its commit `1327606f0d` at 03:11:09 and the boot note at 03:11:53; the boundary is 03:11:54. `spend.py` printed 8.32M from 1795223516 and 4.59M from 1795230714: **3.73M over 20 transcripts, and the coordinating session's own 50K over 30 messages.**
  - The record-landing workflow, 14 agents (six on Sonnet), with its three headless writers: 2.96M (01:40 to 03:10). By part: the record 1.75M (sort, write, the two headless record writers, check, cold read, fix, judge, land; 01:40 to 02:38); the orientation update's admission 0.20M (02:38 to 02:43); the skill step 0.38M (02:43 to 02:56); the page of `fortress-repo` changes 0.49M (02:56 to 03:09); the push and the revival page 0.13M.
  - In the span and its folders, outside the workflow: climb batch 34b's post-batch review 595K (01:14 to 01:40); the base build 42, 51K; 34b's commit agent 126K, whose transcript last changed at 01:12:54.
  - Against the batch before: run 1 of 34's record-landing wrote 4.05M over 30 transcripts (`reviews/batch-34b-review.md`, section 6); 34b's, 2.96M over 17.
- **Span 2, the preparation,** from 03:11:54 on 11-21 to the launch, 09:59:31 on 11-23. `spend.py` printed 4.59M from 1795230714 and 2.04M from 1795427972: **2.55M over 8 transcripts, and the coordinating session's own 650K over 138 messages: 3.20M.** Nothing ran between 07:57 on 11-21 and 08:32 on 11-23.
  - **The batch's preparation, 1.81M:** the inventory of the skill's workaround passages 393K (08:44 to 09:04); the planner with its probes 901K (09:06 to 09:37); the Fable review of the record, which ran run 1's reproducers, 241K on Fable (09:38 to 09:48); the manifest worker 275K (09:49 to 09:59). Against climb batch 34's 1.28M.
  - **The rest of the day's work in the span, 0.74M:** the fact check of his page notes 396K and its scout on Sonnet 156K (08:38 to 08:59); the skill fixes, one headless writer session, 97K (09:05 to 09:43), and their cold read 92K.
  - **The coordinator's own turns, 650K:** 231K on 11-21 (03:12 to 07:57), the boot after the VM restart of 07:49 among them; 295K on 11-23 from 08:34 to 08:45, of which one turn wrote 228K after the VM restart of 08:32; 124K from 08:45 to the launch, over 75 messages.
  - **Beside the run, apart from it:** the rest of the day's work whose transcripts last changed after the launch, outside the run's folder, 1.72M over 6 (`spend.py` 2.04M less 0.32M, the 0.32M this review's own transcript): the page update of `fortress-repo` changes 462K (09:50 to 10:02); the Fable review of the process 212K on Fable (11:29 to 11:35); the queue's triage 496K (11:29 to 11:51); the drafts, one headless writer session, 143K (11:52 to 12:28), and their cold read 174K; the drafts' page 229K (13:46 to 13:55). The coordinating session wrote 117K during the run, over 92 messages. So the rest of the day's work came to 2.46M in all, 0.74M before the launch.
- **Span 3, the run,** 09:59:32 to 14:31:43, over the run's folder: `spend.py` printed 5.69M from 1795427972 and 0.14M from 1795444303. **5.55M over 20 transcripts.** The commit agent, 139K, last changed at 14:32:43 and counts after the span.

So climb batch 34b's landing work cost 3.73M in its span, its workflow 2.96M; this batch's preparation 1.81M of the span's 3.20M; and the run 5.55M. The rest of the day's work, 2.46M, is larger than the batch's preparation.

**The briefing's use.**
- **13 of 13 briefed launches read their briefing, 100 %, and each read every part. None read it in its first turn.** The briefed launches are the five workers, the five skeptics, W's judge, and the two repairs on the merged tree. The disk check, the gather, the review, the gates, the merged tree's judges and the commit stage have none by design.
- When, by call and seconds after the start: W's judge at call 6, 13 s; skeptic S at call 10, 19 s; skeptic O at 8, 23 s; skeptic W at 12, 27 s; rung W at 16, 29 s; repair:review at 13, 31 s; repair:gate at 15, 31 s; skeptic R at 16, 32 s; skeptic A at 11, 35 s; rung R at 19, 43 s; rung A at 18, 46 s; rung S at 21, 46 s; rung O at 21, 54 s.
- Its results came to about 0.17M tokens, 2.9 % of writes (`brief2.py`).

**Other measures** (`batch-measures.py`).
- First calls: 1.18M (20.8 %), 13 cold, the merged tree's four extra agents among them. Cache refills: 0. Refusal cycles: 1 rung, W's judge, 175K. Rulings and repairs on the merged tree: 2 and 2, 0.99M, and a second gate of 136K.
- Builds per worker: R 1, O 2, A 1, S 2 with two library orders, W 2; W's skeptic 2, the gather 1, the gate's repair 1 with one library order, each gate 1.
- The skill's load, by a rough count: about 1.09M, 19 %. `revival-changes.md` was read by 18 of the 21 launches, all but the disk check, the second gate and the commit stage.
- Error results: 32.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `aece3f46`, 64K, 0.1 min; rung O `a2206827`, 513K, 48.5; rung A `a73c470e`, 316K, 29.2; rung W `ac3e3a0d`, 289K, 25.9; rung S `abc57ecb`, 320K, 24.4; rung R `a12045c1`, 285K, 31.5; skeptic A `a1e2c9a0`, 327K, 13.6; skeptic O `a6eb3dea`, 340K, 22.0; skeptic W `a0f7430f`, 338K, 34.8; skeptic S `ac22283c`, 248K, 11.1; skeptic R `a0616765`, 221K, 10.9; judge W `aaaf38d4`, 175K, 5.7; gather `a161f397`, 446K, 38.3; gate `afef3951`, 171K, 24.9; review `aec96a33`, 367K, 14.8; judge:review `a6dbdab4`, 163K, 4.3; repair:review `a0749b84`, 177K, 5.6; judge:gate `acfe6fd9`, 165K, 6.7; repair:gate `a1721711`, 489K, 39.3; gate2 `aefbc61a`, 136K, 24.7; commit `ad235c59`, 139K, 2.9.

### 8. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`):
- **No agent ran a whole suite twice on one code state, with one cause-given exception.** R ran `testSystem` and `testQuick`, W and A `testSystem`, O `testQuick`, each once on its final code; W's skeptic ran `testSystem` once on its fix's code. The gate's repair ran `ant testOneLibrary` on the merged code that the first gate had run: the ruling's one-JVM reproduction did not fail, and the gate's private caches had been deleted, so the run was the only way to the failing bytes. The second gate ran every step again, as the repair changed `Functionals.scala`, a path the gate reads.
- **The count and the distance stages:** R and O once each on their final code; O also on the base for P-148's pair and once profiled, as `compiler.md`, "The checker's time", gives; O's skeptic the count on the base build and on the worker's head, the planned exception. Each gate once.
- **The specification was built twice, on two texts:** by the gather on O's text, and by the review's repair on its own. The commit stage copied the second.
- **The batch's own tests ran at the gather** in one JVM ('OK (96 tests)') with the ten walk tests ('OK (10 tests)') and the 52 demos, then in the gate's tracks on the same code: the manual's check before the gate. **The microGPT quick pair ran once,** at the commit stage.

### 9. Three events

**No agent ran twice.** The journal holds one `launched` line, 21 `started` lines and 21 `result` lines, each label once. The two gate launches are the first gate and the second gate, which the script starts after a repair that changes a path the gate reads; the second said so and moved the first's logs aside (`gate2`'s summary). No process stop, VM restart or usage limit fell in the run: the machine's last start is 08:32:22 UTC (`uptime -s`).

**No commit other than the batch's fell between the gather's start and the batch's push.**
- The gather's first record is at 12:10:22 and its first commit, R's `6f0e48f187`, at 12:13:41; its preconditions held, `git status --porcelain` empty and the base an ancestor of `HEAD`, then `bbb4b54030`, the coordinator's boot note of 11:53:02 (`RECORD.md:7`). `main`'s reflog from then to the push holds only the batch's commits: the five rungs, the closes, the gather's record amended once before any push (`e35c0849e6` to `e922c2ea1a`), the review's corrections, its ruling and its repair, the gate's ruling in two commits, its repair, and the commit stage's tables. `origin/main` moved from `bbb4b54030` to `0a83a70498` by the commit stage's one atomic push at 14:31:58; the coordinator's next commit is `be43ddc647` at 14:33:50.
- So the rule of `references/batch.md`, "While it runs", held, though the coordinator worked through the run: the process review, the queue's triage and the record-landing's skill-task change were committed before 11:53; the drafts of B1 to B4 and their page made no commit on `main`; and his decisions of 12:5x to 13:2x UTC waited for the push.

**No agent received text from outside its brief.**
- The curator sent the coordinating session twelve messages during the run, from 11:19 to 13:17 UTC: on the review queue's size, the Fable review of the process, P-174's coercion body and P-165's `asRR64`. No phrase of them stands in any of the run's 21 transcripts, nor the markers '<agent-message', 'Another Claude session' or 'sent a message while you were working'.
- The first record of each transcript is the harness's '[Workflow harness — computed task]' message, the brief. Each agent but the disk check received one more text message as the user: the skill's text after its own load of the skill (`usertext.py`).
- Beside them the harness attached its standing material, the shared task list and notices that a file the agent wrote had changed on disk (rungs O, A and S, the gather). The task list carried the gather's to-dos, tasks 69 to 75, all completed, to the agents after it (`taskrem.py`). The curator's name stands in eleven transcripts only where a file of the record names him, as "Pavol's answers" in `PLAN.md`.

## Part 1. Conformance

No departure from a decision of the curator's landed. **No finding of this review would change a decision of his.** The near ones, and why each is not one:
- A.worker.1 is a consequential default that landed and went on his list as a question, as the rule asks (section 2); it is part of item 562, which waits for him.
- W.judge.1's regression and the eight rows opened are what P-180 already decides: fix them. They need a place in the next list, not his answer.
- O.worker.2 and judge-gate.2 were put to him, but P-151 settles the first and the coordinator owns the second (section 2).
- The gate's repair departs from the specification's static choice at a tie in a `comprises` trait; the specification settles that case, and no decision of his is under it.
- His open ask on P-180's scope (the process review's A1) gets this batch's balance as evidence: 8 opened, 8 closed, 9 fixed.

### Findings for the record, with no decision of his changed

1. **Row 1100 is fixed and not closed.** The repair's commit says "Row 1100 rewritten as traced, to close after this commit" (`b7b5b0c02b`), and no stage took the close: the commit stage ran `record.py check` only, and `ledger.py landing-check 13f4fdea75` prints 'no finding' on `main` today (run by this review; it reads only). Owed: `ledger.py close 1100 --commit b7b5b0c02b --test ProjectFortress/compiler_tests/ComprisesSelfAbstractFunctionalMethodCall.test`.
2. **The gate's repair landed a departure from the specification with no row** (section 2): at a tie that `self`'s type makes in a trait that comprises a type, the call takes the trait's declaration and its return type, where the specification takes the listed type's, the narrower where it is narrower. Owed: a ledger row, class implementation gap (checker), with the repair's report as its source; its fix waits for row 815, run 2's rung M (Part 5).
3. **The repair's gated test does not fail on the unfixed code in the gate's default hash mode** (section 3). Owed: a test that fixes the order, as a scratch copy that reverses the overloadings did; or the row's note that the test guards the fix only under `-XX:hashCode=0`.
4. **O.worker.2 is answered by P-151, and judge-gate.2 is the coordinator's** (section 2). Owed: O.worker.2's entry rewritten as a default that informs him, row 1107 a gap; judge-gate.2 taken off his list, with the coordinator's choice (process finding 2).
5. **judge-gate.3's default, "no rung planned", contradicts item 574 as the triage reads it** (section 2). Owed: its default as a rung under P-180.
6. **The plan's "The batch edits no FACTS or POSITIONS entry" and "P-174, P-37 and P-180 stay true" were wrong for run 1** (`CLIMB-BATCH-35.md`, "For the record-landing workflow"). R made P-174's last sentence false, as its skeptic found, and the gather rewrote it with `record.py set`, cutting row 960 (`POSITIONS-history.md:4238`). That is a change to POSITIONS that the coordinator names to him. The same is due after run 2: rung L closes row 981, the sentence's last row.
7. **The plan's words were wider or narrower than what landed in four places:**
   - fork W2's "reads its element from the temporary", for a tuple expression;
   - fork O1's "none for the declarations that it overrides", where a bridge at their signature runs the override;
   - section A's "leave its behaviour as it is on both paths" for row 1041;
   - section W's Files, where the skeptic added three compiled test files of row 1104 in a folder that the list lacks.
8. **The skeptics' fixes were right:** one defect of a change (W's untyped temporary), two cases added (O's kept overload, W's typed numerals), two older defects given rows and tests (rows 1109 and 1111), and five records corrected; one fix contested and upheld; one trim, its behaviour kept.

### Corrections owed in the record

- **POSITIONS:** none made false by the landing beyond P-174's sentence, which the gather rewrote (finding 6). `be43ddc647`, after the landing, rewrote P-174 again (a coercion's body is a computation at compile time, with no method invocation, `Byte(v)`) and P-165 (`asRR64`). By it, R's two tests, which write `n.asZZ32` and `bigToZZ64(n).asZZ32` in a coercion's body (`tests/RadixPointLeadingZerosWalk.fss:6`, `compiler_tests/RadixPointLeadingZerosCompiled.fss:6`), and the skill's `revival-changes.md:99`, "So `v.asZZ32` is `ZZ`'s getter", now depart from his decision. That is not the batch's; it is work for the next routing.
- **FACTS, false or short, and not reworded by the gather, the review or the repairs:**
  - F-396, its last sentence (`FACTS.md:183`): "The library's compile depends on what its JVM compiled before (row 1100), so the track compiles it first." Since `b7b5b0c02b` the `QQ` tie no longer depends on the order, and compiling it first did not protect this gate.
  - F-240 (`FACTS.md:111`): "Its rise from about 90 s at climb batch 21b's gate is the `FortressLibrary` component's check now run to its end ..."; the count stage now takes about 73 s, below that 90 s, as the commit stage flagged. And its comparison "against 176 s (108 s) at 0.22 at climb batch 34b's" sets a 2.30 GHz figure against a 2.10 GHz one (section 6).
  - F-354 holds; it was "Measured once", and the red gate is its second instance, for its history.
- **The ledger:** rows 1104 to 1111 filed, 152, 1041, 1107, 1100 and 1111 rewritten, a note on 996; owed, row 1100's close and the row of finding 2.

## Part 2. Did the practice hold

### The practice's measures, the last five runs

(B33 run 1; B33 run 2; B34 run 1; B34 run 2; B35 run 1.) The figures before B35 are `reviews/batch-34b-review.md`'s, Part 2, which points to the older ones.
- Written: 5.57M; 5.74M; 5.12M; 2.10M; 5.69M.
- The tier: Opus each; B35's second judge on the merged tree on Fable, 165K.
- Launches lost to restarts or the disk: 0; 2, 0.52M; 2, 0.44M; 0; 0.
- Per landed rung: 0.93M; 1.43M; 1.02M; 2.10M; 1.14M.
- First calls: 0.80M, 7 cold; 0.995M, 11 cold; 0.86M, 8 cold; 0.52M, 7 cold; 1.18M, 13 cold.
- Cache refills: 0 each.
- Refusal cycles: 0; 1 rung, 214K; 1 rung, 156K; 0; 1 rung, 175K.
- Rulings and repairs on the merged tree: 0; 317K; 0; 0; 0.99M, and a second gate of 136K.
- Skeptic fix commits (defects of the change): 20 (1); 12 (2); 13 (2), one a trim; 3 (0); 8 (1), one a trim.
- Distance: 0 each time.
- Count stage at the gate: 78 s; about 65 s; about 105 s; about 105 s; about 73 s, the last on a 2.30 GHz machine and the two before on 2.10 GHz.
- Distance stage at the gate: 137 s; 117 s; 200 s; 176 s; 127 s, each beside `testFast` or the library order.
- Skill's load: about 18 %; about 17 %; about 20 %; about 16 %; about 19 %.
- Briefing, estimated: 2.6 %; 3.6 %; 2.6 %; 2.3 %; 2.9 %.
- The statement of the expected failure in the call that first runs a test: not yet the rule; not yet; 0 of 5 workers; 1 of 1; 5 of 5.
- microGPT quick pair: 7 of 7 both, each time.
- Rows closed against rows opened: this run 8 (9 fixed) against 8.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The statement rule's form holds** (section 4): every worker and every skeptic with a test of its own echoed the line in the call that first ran it, and every mismatch had its cause found before the fix. Review-queue item 608's default, way 3, did its work in its second batch. Proposed (mine): keep it; nothing to change.
2. **No stage runs the onelibrary track before the gate** (section 3; judge-gate.2). A run in the rung is a net with holes, since an order-dependent failure shows only when the JVM's order meets it. Proposed (mine): the rungs of run 2 that change the code generator or the one library, M and E, run `ant testOneLibrary` at their end (E's section already asks it, M's does not); and the cure is the order itself, a rung for row 935 by the declarations' spans under P-180 (Part 5).
3. **A defect left with a workaround of order turned the gate red** (section 3). Row 1100 had a row, a FACTS sentence and a skill passage that taught the order, and the inventory filed it as road work. Proposed (mine): the planner of a housekeeping batch reads the inventory's group (c) for workarounds that a change of the compiler can break, and takes those first.
4. **The reserve was priced at 0.8M for a ruling and a repair on a rung, one on the review and a second gate; the run spent 1.31M,** the gate's repair alone 489K (section 7). Proposed (mine): price a red gate at about 0.8M, its ruling, its repair and the second gate, inside a reserve of about 1.3M for a five-rung run that changes the compiled path; or keep 0.8M and say that a red gate overruns it.
5. **A repair's row close falls between stages.** The gate's repair left row 1100's close "a step after the commit", and neither the commit stage nor `ledger.py landing-check` takes it (Part 1, finding 1). Proposed (mine): the commit stage closes each row that a repair's commit message names as "to close", or the repair's brief allows the close in a second commit.
6. **Items for him that the record or the coordinator settle still reach his list:** O.worker.2 (P-151), judge-gate.2 (the coordinator's briefs) and judge-gate.3 (item 574 as triaged). This is dead end 1 of the process review. Proposed (mine): the gather's check of each item against POSITIONS and the queue, before it files it as a question, names the entry that settles it, as the routing step 2 of the manual already asks of the coordinator.
7. **A regression of the batch's own landed as a row with a workaround** (W.judge.1). P-180: a ledger row "is no place to leave one". The judge's reason, files outside the rung's section, is the batch's rule, not P-180's. Proposed (mine): under P-180, a judge sends a repair round for a regression that the batch itself made, also outside the rung's files, unless it cannot be undone or needs his decision; and the next batch's list takes row 1105 first.
8. **F-240's figure was compared across two CPUs** (section 6). Climb batch 34's process finding 5 asked that stage seconds compare only on one CPU line. Proposed (mine): the commit stage's brief writes F-240's comparison only against a gate of the same `# machine model name`, or names both CPUs.
9. **The rest of the day's work, 2.46M, was larger than the batch's preparation, 1.81M,** and the coordinator's own preparation turns wrote 650K, 228K of it in one turn after the VM restart of 08:32. No change proposed: the curator ordered the process review and the triage that day.
10. **Of climb batch 34b's process findings:** the statement rule's form held (finding 1 here); the measure's owner holds through the gate's `OneLibraryComponents.test` (section 6).

### Misses, by kind

Numbered on from `batch-34b-review.md`'s 1394.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before the launch:** 1395, the check before the launch's changes A1 to A6 (row 1's second half in rung W's test, three definitions, rung S's program whole, rung O's message and fork O1's other way, fork A1's line, run 2's sum) and its point B1, fork O2's reach, applied in `5952f89e28` and `38131c1671`.
- **The planner's text wrong, caught before landing:**
  - 1396, fork W2's words for a tuple expression (W's skeptic, `675932404d`; upheld);
  - 1397, section A's "leave its behaviour as it is" for row 1041 (A's worker, A.worker.1);
  - 1398, fork O1's "none for the declarations that it overrides" (O's worker; the planner's probe had seen the duplicate);
  - 1399, "The batch edits no FACTS or POSITIONS entry" and "P-174 ... stay true" (R's skeptic; the gather).
- **A defect of a change, caught before landing:** 1400, W's untyped temporary, 'Type mismatch binding 5: ZZ32 (type ZZ32) to un (type NN32)' (W's skeptic, `675932404d`); 1401, the gather's Appendix I clause on row 1107, broader than the code (the review; `693fa9ec8e`).
- **A defect of the merged tree, caught at the gate:** 1402, the onelibrary track's nine `VerifyError`s, row 1100's tie in the identity-hash order (the first gate; `b7b5b0c02b`).
- **A case of a change with no test, caught:** 1403, an override beside a declaration of its name that it does not override (O's skeptic, `424b7dc1d5`); 1404, typed numerals in a tuple binding (W's skeptic, `TupleBindingNumeralTypesWalk`); 1405, S and O in one class (the review, by a probe; a test owed, review-routed.1).
- **A defect of the tree found and filed, not the batch's:** 1406 to 1410, rows 1104 (W's skeptic), 1107 (O), 1109 (O's skeptic), 1110 (A) and 1111 (A's skeptic).
- **A remaining form of a closed row, filed:** 1411, rows 1106 and 1108 (O).
- **A regression of the batch, filed and landed:** 1412, row 1105's `if` form (W's skeptic; W.judge.1).
- **A report that said what was not so:** 1413, S's citations of `overloading.tex` (`8440280801`); O's citations after the trim, and "no dispatch method of the name" (`c2fc6ed42f`); row 1110's "any `tryatomic` block" and row 1041's dropped sentence (`715e097bb4`); the gather's "no other rung's hunk moved a cited line" and row 1111's finder (the review, `b0a5943e76`); the gather's "Each states what the code does" (the review's judge).
- **Sentences made wrong, caught:** 1414, F-302, F-268, F-393, F-369 and F-351 (the review, `b0a5943e76`); F-400's row-1107 clause (the review's repair).
- **Process:** 1415, no rung or stage ran the onelibrary track before the gate (the gate's judge, judge-gate.2).

Found by this review:
- 1416, row 1100 fixed and not closed, and the landing check blind to it (Part 1, finding 1);
- 1417, the repair's departure from the specification's static choice, with no row and no item (finding 2);
- 1418, the repair's gated test green on the unfixed code in the default hash mode (finding 3);
- 1419, O.worker.2 and judge-gate.2 put to him, and judge-gate.3's default against item 574 (findings 4 and 5);
- 1420, F-396 and F-240 false and not reworded (Part 1, corrections);
- 1421, rows 1104, 1108, 1109, 1110 and 1111, and run 1's forks, without a home (Part 4);
- 1422, run 2's sections stale at four points (Part 5);
- 1423, sentences of the skill beyond the record's list (Part 3);
- 1424, the reserve's price (process finding 4).

**Against the earlier notes.** 21 misses were found before the launch or inside the batch (1395 to 1415), 7 of them defects of the tree that the batch did not make and one a regression that it made, for five rungs, against climb batch 34's 26 for five. No departure from a decision of his landed, and no finding goes to him as an ask.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false or needless, read on `main` at `2c8b0f234b`; the batch changed no file under `.claude/` (the commit stage's `git diff --name-only bbb4b54030 HEAD -- .claude/`). The proposed wording is mine; the writer keeps the skill's form. The revival changes are in `compile-ladder/climb-batch-35/RECORD.md`, "Revival changes, for the skill writer": R's, W's, O's and A's; S's is "none". Since `403a0e60cb` the writer adds no sentence for a new trap: the new rows below go to the coordinator, not into the skill.

**False or needless, on the record's list, checked at their lines:**
1. `references/interpreter.md:26`: "A numeral with a radix point keeps only one of its leading zeros ... (ledger row 960)." Goes.
2. `references/tests-writing.md:34`: "and `(x[5])^2`" and "and `x[5]^2` compiles, but under walk fails or gives the wrong element (ledger row 1)". Goes; "`f(x)^T` is a static error" stays.
3. `references/interpreter.md:35`: "The right side of a top-level tuple binding runs once for each name and once more ... (ledger row 1026). Bind the call to one name ...". Goes; `:33`'s lead-in stays for rows 1024 and 1025.
4. `references/compiler.md:157`: "Where an object overloads an inherited functional method ... (ledger row 573) ... (ledger row 1038). Put `self` first in such overloads." Goes.
5. `references/revival-changes.md:32`: "Two departures: the checker accepts such an `override` (row 653), and the code generator refuses every `override` modifier, so a program that writes one does not compile (row 650)." Goes.
6. `references/compiler.md:89`: "It refuses a function or method with a modifier other than `getter`, `setter`, `io`, `private`, `abstract` and `test`, such as `override` (ledger row 650)." Rewritten: it compiles `override` too.
7. `SKILL.md:126`: "An `exit` out of an `atomic` block loses the block's writes, on both paths (ledger row 1039). Set a flag in the block, and exit after the block." Goes, or becomes: an exit out of an `atomic` block keeps the block's writes, on both paths.

**False, on no list:**
- `references/compiler.md:58`: "Where several compiles share one JVM ... compile the `FortressLibrary` component first. Compiled after other components, its `QQ`'s default methods fail verification: 'VerifyError: Bad type on operand stack' (ledger row 1100)." False since `b7b5b0c02b`: the tie keeps `QQ`'s declaration in every order. Goes. `references/tests-running.md:117-118`, "compiles the fourteen first" and "name `OneLibraryComponents.test` first", stay: the components must compile before the programs that use them.

**Short, on no list** (each a row since this run; the writer judges whether a line is needed, since P-180 and `403a0e60cb` weigh against new trap sentences):
- `references/compiler.md:156`, row 1041: since rung A, such an exit commits the atomic blocks it passes, on both paths, and under walk `w := 5` inside is kept.
- `references/revival-changes.md:32`, after its departures go: the departures that stand are rows 1106 (two forms that the code generator refuses), 1107 (the checker under a conditional extension), 1108 (no check in an object expression) and 1109 (walk's override hides every declaration of its name).
- `references/interpreter.md:93-103`, "What walk checks": walk's `override` hides every inherited declaration of its name (row 1109).
- `references/revival-changes.md:99`: "So `v.asZZ32` is `ZZ`'s getter" is false by P-174 as `be43ddc647` rewrote it; that is the coordinator's commit after the landing, for the record-landing's orientation, not this batch's.

**Sentences that hold, met by the batch:** `references/interpreter.md:33`, the lead-in; `references/tests-running.md:14`, "about 11 minutes" for `testFast` (9 min 30 s at this gate); `references/library.md:54`, `ant testOneLibrary` after an edit of one of the fourteen.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home. Each item that I route carries its kind in one line: a question that waits for him, or a default that only informs him.

**Items for him: each has a home in `PLAN.md:936-946`, none yet in the review queue.** The gather filed thirteen ids in seven entries (`:936-942`); the merged-diff review confirmed them (its `curatorItems`) and added review-routed.1 (`:943`); the gate's repair added judge-gate.1 to judge-gate.3 (`:944-946`).
- R.worker.1 and R.skeptic.1 (`:936`): a default that informs him.
- W.judge.1 and W.reserved.3 (`:937`, `:938`): a default that informs him; row 1105 to the next batch by P-180.
- W.judge.2, W.reserved.1, W.reserved.2, W.reserved.4 (`:938`): defaults that inform him.
- O.worker.1 (`:939`): a default that informs him.
- O.worker.2 (`:940`): a default that informs him, P-151 settling it; owed, its text rewritten so (Part 1, finding 4).
- A.worker.1 and A.skeptic.1 (`:941`): a question that waits for him, with item 100 and review-queue item 562; owed, item 562 gains it.
- gather.1 (`:942`): a default that informs him; the four PLAN lines move out (below).
- review-routed.1 (`:943`): a default that informs him; the test to the next batch.
- judge-gate.1 (`:944`): a default that informs him.
- judge-gate.2 (`:945`): the coordinator's; owed, off his list (process finding 2).
- judge-gate.3 (`:946`): a default that informs him, with its default as a rung under P-180 (Part 1, finding 5).

**Open rows.**
- With a home: 1105 (`:937`), 1106 (`:939`), 1107 (`:939`, `:940`), 1041 (`:941`; item 562), 594 (phase 5, `:118`), 935 and 996 (`:946`).
- **Five have no line of their own in `PLAN.md` or `review-queue.md`:** 1104, 1108, 1109, 1110 and 1111. Owed (the homes are mine): each in the next housekeeping batch's list, 1110 and 1111 together as one rethrow.
- **Row 1100** is fixed and owed its close (Part 1, finding 1); the batch after's list loses it.
- **The departure of the gate's repair** has no row (Part 1, finding 2). Owed: a row, homed with rung M of run 2.

**Record defaults.** The record gives its forks to the queue as new items after the landing (`CLIMB-BATCH-35.md`, "After the landing"). **Run 1's forks, B1, B2, R1, W1, W2, S1, O1, O2 and A1, have no item.** Owed: one item, each default as landed with its line of section 2 here; W2 with W.judge.1, A1 with A.worker.1. Each is a default that informs him, but A1's reach into row 1041, a question with item 562. Until his yes to the process review's B1, the record's routing stands as written; if B1 lands, these defaults close at the landing and reach him as the landing report's lines.

**Queue items that the landing built or made stale:** 558 (S), 561 (A), 540's point 1 (W), already read as settled by the triage (`review-queue.md:917`, `:928`, `:930`); 562, which gains A.worker.1; 574, which judge-gate.3 cites against its triage (`:941`); 608, whose way 3 held (section 4).

**PLAN lines that the batch built or made stale.** The record lists item 96 (`PLAN.md:149`), the batch 31 lists' lines on rows 1039 (`:844`) and 1053 (`:865`), batch 31b's on rows 1057 and 1058 (`:878`), batch 32's on row 1026 (`:828`), batch 30's on row 981 (`:808`), the question on `override` (`:428`), and phase 5's line on rows 573 and 815 (`:118`). Of these, run 1 makes stale `:149`, `:844`, `:828`, `:428` and `:118` for row 573; `:865`, `:878`, `:808` and `:118` for row 815 wait for run 2. Also stale: `:445`, item 73's "the checker does not (row 653)"; "Next" (`:13`), which names climb batch 34b as the last landing; and `:73`, which names row 1100 among the onelibrary track's first refusals.

**The manual and the script:** process findings 2, 4, 5, 6, 7 and 8. **The skill:** Part 3. **FACTS and POSITIONS:** Part 1, "Corrections owed in the record".

## Part 5. Run 2, climb batch 35b

**Sections E, L and M of `CLIMB-BATCH-35.md`, read against the landed tree.** Run 1 changed none of run 2's files: `git diff --stat 13f4fdea75 HEAD` prints nothing for `Library/`, `DottedMethodApplication.java`, `OverloadedFunction.java` and `BuildEnvironments.java`. What the landing makes stale:
- **Rung L's Appendix I citation.** "`Specification/appendices/changes.tex:5488-5489`" is now `:5486-5487`: R's clause before it went. The clause on row 981 now opens the sentence's list, "the interpreter loads and runs a program that writes a numeral type in a \KWD{comprises} clause (row~981); the compiled path keeps ...", so L's cut leaves the list to start at "the compiled path".
- **Rung L and P-174.** Closing row 981 makes P-174's last sentence, "Row 981 holds where the tree departs", false again; the plan's "P-174 ... stay true" repeats run 1's slip (Part 1, finding 6). The gather of run 2 rewrites it, and the coordinator names the change to him.
- **Rung M's citation.** "`CodeGen.castToTypeBelow` (`compiler/codegen/CodeGen.java:8117`)" is now `:8199`: O's 83 lines moved it.
- **Rung M and the gate's repair.** Row 815 now meets a second form: since `b7b5b0c02b`, a call on `self` inside a trait that comprises an object takes the trait's arrow and names the pair's overload method, `\=f{...}`, which the component's class does not hold. The repair's probe died so: "java.lang.NoSuchMethodError: ... `SelfGetterValueProbe.\=width{...}(SelfGetterValueProbe$Solid)`" (`REPAIR-gate.md`, "Deviations", 4). So M's fix M2 should cover that call, and `ComprisesSelfAbstractFunctionalMethodCall` can then assert the getter's value that it now leaves out. Once M2 writes the overload method, the specification's static choice at that tie becomes compilable with F-377's cast; whether M takes it back from the repair's choice is a fork for M's section (default: leave the repair's choice; the row of Part 1, finding 2).
- **Rung M and the onelibrary track.** M changes the code generator, and the one library's `QQ` and `Ratio` are row 815's library instance; its section leaves the whole tracks to the gate. Run `ant testOneLibrary` at its end (process finding 2).
- **Rung E and `AplCore`.** The check before the launch asked that rung E run one APL program that imports `AplCore`, whose `AplCore.fss:226` declares a prefix `opr ≢(x: RR64)` (`climb-batch-35-review.md`, section B, "Run 2, rung E"); E's section does not yet ask it. The boot note plans it for the re-read. E's own citations hold: `Library/FortressLibrary.fsi:2792`, `.fss:4922`, `Evaluator.java:896` inside `:893-909`, `CompilerBuiltin.fsi:465-466`, `AplCore.fss:207-224`.
- **Rung E and the hash order.** E edits `FortressLibrary`, so the identity-hash order of that component's compile changes; its section's `ant testOneLibrary` is the run that would meet another hash-ordered tie (row 935). It stays as written.
- **The gate's comparands** for run 2 are run 1's landed gate: 3,682 tests in 64 suites, `CompilerJUTest` 1,806, `OtherCompilerJUTest` 263, `LibraryJUTest` 86, `OneLibraryJUTest` 40, the system shards 886, `SpecDataJUTest` 130, 72 atomic runs, the count 0 and the distance 0 with `#crash none`, microGPT 7 of 7 each.
- **The base build:** `/home/user/fortress-base43` at `0a83a70498` does not exist yet. **The disk:** 13.9M blocks of 1,024 bytes available now (`df -P /home/user`, about 13.3 GiB) against run 2's 8.5 GiB.
- **The estimate.** Run 2's reserve is 0.6M; run 1's red gate alone wrote 0.79M. E and M are the rungs most likely to move the hashes.

**Does run 2 still hold as planned?** Yes. No rung of run 2 needs a decision of his, none of its files changed, and its forks E1, L1 to L3, M1 and M2 stand. It needs the four stale points above put into its sections (L's line, M's line, M's second form of row 815 with its onelibrary run, E's `AplCore` program), P-174's sentence in its record-landing list, and its base build.

**The list for the batch after.** Climb batch 34b's list stands, as the record carries it ("What the batch leaves out"): rows 994 and 1091, then `Arr` and `Dot` as run tests, then rows 1098 to 1103, without row 1100, now fixed. This landing adds, by P-180 and in this order: row 1105, the regression that this batch made, with row 1104; rows 1110 and 1111, one rethrow; row 935's order by the declarations' spans, with rows 499, 1046 and 1047's tests, and row 996's order beside it; rows 1106 to 1109, the remaining forms of `override`; review-routed.1's test; row 594.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I ran `ledger.py landing-check` once, which reads only, to see whether it flags row 1100's owed close; it printed 'no finding'.
- I read the run's transcripts through scripts and the journal's results. For the record-landing of climb batch 34b and the preparation, I read only the transcripts' labels, times, models, first messages and writes. I read the coordinating session's transcript for its own writes by time, for the launch's Workflow call, and for the curator's messages during the run.
- A workflow's journal holds no times. The run's times are the agents' first and last records, the commits' times and the reflogs.
- These are by reading, not run:
  - that the code generator's parameter reading and the checker's can differ only where `checkOverrideCompilable` refuses;
  - that the tie at `QQ` comes from reading `QQ`'s own `self` parameter as the meet, and that the repair's choice differs from the specification's only where a listed type's declaration returns a narrower type;
  - that O.worker.2's program is valid by P-151 and F-147;
  - that rows 1110 and 1111 share one rethrow.
- I did not check each rung's reported runs against its logs; the skeptics and the merged-diff review did, and I cite them. I read the source diffs of the five rungs and the repair whole, and of the tests only the programs that the decisions name.
- The skill's load is a rough count, not `skill-load.py`'s. The split of span 2 by purpose is by each transcript's first message and label.

## The steps due before run 2

1. **The landing's own steps** (`references/batch.md`, "The landing"): the batch's to-dos swept from the shared task list (tasks 69 to 75, all completed); each decision named in one line.
2. **The record's corrections** (Part 1): row 1100 closed by `b7b5b0c02b` with its test; a row for the repair's departure; F-396's last sentence and F-240's two sentences; the gather's change of P-174 named to him.
3. **The routing that no list holds yet** (Part 4): homes for rows 1104, 1108, 1109, 1110 and 1111; one queue item for run 1's forks; the eleven entries of `PLAN.md:936-946` as queue items, O.worker.2 rewritten, judge-gate.2 off his list, judge-gate.3's default as a rung; item 562 with A.worker.1; PLAN's stale lines.
4. **The record-landing workflow for run 1** (`tools/record-landing/README.md`, with `batch: '35'`, `base: '13f4fdea7557b867c808d0c32af5dd2a03901f4b'`, `landing: '0a83a70498'`), with Part 3's list for the skill writer, `compiler.md:58` among it.
5. **The base build of the landed tree,** `/home/user/fortress-base43` at `0a83a70498`; F-34's count stands by the gate's `OneLibraryComponents.test`.
6. **Run 2's sections read again** (Part 5): L's `changes.tex:5486-5487`; M's `CodeGen.java:8199`, its second form of row 815 and its `ant testOneLibrary`; E's `AplCore` program; P-174's sentence in "For the record-landing workflow"; the gate's comparands. Then the generator's block for `--run 2`, checked and spliced.
7. **The script and the manual** (process findings 2, 4, 5, 6, 7 and 8), before run 2's launch where they touch its briefs: M's onelibrary run, the reserve's price, the close of a repaired row.

## For the curator

Run 1 of climb batch 35 ran from 09:59 UTC to 14:31 UTC on 23 November. In your time that is 10:59 to 15:31. It is pushed. All five tasks landed. No line of the model program changed. You gave the go at 08:4x UTC: "Clean up row and workarounds the skill teaches. Fix low hanging fruit!" Every decision took the planner's default, and this section is your review of them.

The words that this section uses:
- **Walk** is the interpreter. The **compiled path** checks a program with the **checker** and then writes JVM bytecode with the **code generator**.
- The **one library** is the library of the interpreter. The **onelibrary track** is the part of the test suite that compiles the one library and runs programs against it.
- A **task** is one change of the run. The record names it a rung. A **worker** is an agent that does one task. A **skeptic** is a second agent that examines the worker's change and fixes what it finds. A **judge** is an agent that rules where an agent contests a fix or where the full check fails.
- A **fork** is a design question with more than one way. A **default** is the way that the record chose before the run.
- A **row** is one known defect in the ledger. A **workaround** is advice in the skill on how to live with a defect.
- The **gate** is the full check before a run lands.
- A **tie** is a call where two declarations fit equally well and neither is more specific. The checker must then choose one.
- An **identity hash** is a number that the JVM gives an object as it runs. It differs from run to run when the program before it differs.

**What each task changed.** Each program is shortened from the tests that landed.

- **R. The digits of a numeral with a radix point.** The parser changed, which both paths read.

      object Digits(count: ZZ32)
        coerce[\nat n, nat m, nat r, nat v\](x: RadixPointNumeral[\n, m, r, v\]) = Digits(n.asZZ32)
      end
      d: Digits = 00.5

  - Before: `d.count` was 2 on both paths. The parser dropped all leading zeros but one.
  - Now: 3 on both paths, the digits as written.
  - The test writes `n.asZZ32` in the coercion's body. Your decision of today on P-174 says that a coercion's body calls no method: its example is `Byte(v)`, not `Byte(v.asZZ32)`. The tree does not follow that yet. That is new work, not this run's.

- **W. Two walk errors that the compiled path did not have.** Walk changed.

      x: ZZ32[7] = [1 2 3 4 5 6 7]
      println(x[5]^2)
      (first, second) = pairOnce()

  - Before: walk stopped on `x[5]^2`: 'Failed to find any matching overload'. `m[3,7]^2` silently squared `m[7]`. And walk ran `pairOnce` three times.
  - Now: walk prints 36, as the compiled path does, and runs `pairOnce` once.
  - Also now: a tuple binding of numerals converts each numeral to its name's type: `(u: NN32, r: RR32) = (5, 0.5)` binds. The worker's first version broke this, and the skeptic fixed it.
  - One step back: walk now refuses this, which it ran before:

        (arr, n): (ZZ32[2], ZZ32) = if flag then ([4 5], 6) else ([7 8], 9) end

    It is a new row. Your rule P-180 says that it gets fixed, so it goes first into the next list.

- **S. A method called like a function, with `self` not first.** The code generator changed.

      trait K end
      trait P  mark(x: Any, self): ZZ32 = 1  end
      object Pq extends { K, P }  mark(x: K, self): ZZ32 = 3  end
      mark(1, Pq)

  - Before: compiled, this gave 3, silently wrong. The code tested the object `Pq` where it should test the argument `1`.
  - Now: 1 on both paths.

- **O. The word `override`.** The code generator and the checker changed.

      trait A  f(self, other: ZZ32): String = "A"  end
      object B extends A  override f(self, other: Number): String = "B"  end
      f(B, 17)

  - Before: the compiled path refused every method marked `override`.
  - Now: it prints `B`, as walk does.
  - Also now: the checker refuses an `override` that overrides nothing, as walk does and as the specification says. So `override f(self, other: String)` in `B` is refused.
  - Still refused, each a new row: an `override` that involves a type parameter; one under a `where` clause; and the checker still does not check one inside an object expression.

- **A. Leaving an atomic block with `exit`.** Walk's transactions and the compiled run time changed.

      var g: ZZ32 = 0
      label done
        atomic do  g := 7; exit done  end
      end done
      println(g)

  - Before: 0 on both paths.
  - Now: 7 on both paths, as the specification says. An exception still throws the writes away.
  - Also now: an exit that runs after its label block has ended also keeps the writes of the atomic blocks it leaves. This touches your open question 100 on such exits. Under walk a program now prints `w = 5` where it printed `w = 0`.

**The red gate.** The first full check failed: 9 tests of the onelibrary track. The one library's `QQ` and `Ratio` both declare `denominator`. Inside `QQ`, the call `denominator(self)` was a tie. The checker broke the tie by the identity hashes. Rung O's new code changed those hashes, so the checker chose `Ratio`'s declaration, and the JVM refused the class. No task's logic was wrong. The defect was known since the batch before, with a workaround: compile the library first. A judge ruled a repair. The repair makes the checker choose `QQ`'s own declaration whatever the order. The second full check passed: 3,682 tests, no failure. The two measures of the checker on the one library stay at 0. The quick microGPT check passed 7 of 7 for both programs. Other ties still follow the hashes, so the next list holds a task to remove that order.

**The decisions that took the planner's default.** Each one can be undone.

- **R1. The parser keeps a numeral's digits as written.** The other way: keep a separate digit count beside the trimmed text.
- **W1. Walk evaluates all the indices of a subscript before a power,** as its plain subscript does. No other way was proposed.
- **W2. A tuple binding runs its right side once.** The planner said: through one temporary for every right side. What landed: a written tuple binds each name to its own element, and only another right side uses the temporary. A judge kept this form, because the planner's form refused typed numerals, which your decision on numerals requires.
- **S1. The compiled choice tests each argument at its own place.** No other way was proposed.
- **O1. The compiled object runs the override, as walk does.** The other way: keep the hidden method too. Then `f(B, 17)` would print `A` compiled and `B` under walk.
- **O2. The checker refuses an `override` that overrides nothing, by the specification's rule.** The other way: copy walk's gaps.
- **A1. An exit commits the block's writes first. If the commit fails, the block runs again.** The plan names no other way; a way that drops the writes breaks the specification's sentence. Its reach into exits after their label has ended is on your list as a question.
- **B1 and B2. Two runs, and what the batch takes.** These order the work. The other way for B1: one run of eight tasks, which needs 16 GiB of disk.

**The items on your list.** One is a question for you. The rest only tell you what landed.
- The question: an exit after its label block has ended now keeps the writes of the atomic blocks it leaves. Keep that as part of your answer to question 100, or have such an exit throw the writes away.
- Two items should leave your list. One asks how `override` works under a `where` clause; your decision P-151 already answers it, so it needs a task. The other asks whether a task should run the onelibrary track; that is how the coordinator runs the batch, not your decision.
- The rest: a checker message that shows a numeral's zeros; walk's new step back above, with its message; the preface sentence on `override` corrected; four plan entries that this run finished; a test owed where tasks S and O meet; and the judge's diagnosis of the red gate.

**Your rule P-180 in this run.** Eight workaround passages of the skill are now false or needless: seven that the record listed, and one that the red gate's repair removed. Eight rows closed, and a ninth was fixed. Eight new rows opened: one is the step back above, two are the remaining forms of `override`, and five are older defects that the tasks found.

**Three events.**
- **No agent ran twice.** No restart fell in the run.
- **Nothing else was committed while the run merged its tasks.** Your decisions of 12:5x to 13:2x UTC (13:5x to 14:2x in your time) on P-174 and P-165 were committed after the push.
- **No message of yours reached an agent.**

**The cost.** The run wrote 5.69M tokens. The estimate was 4.5M, and 5.3M with its reserve. The red gate cost 0.79M and about 70 minutes. That is the whole overrun.

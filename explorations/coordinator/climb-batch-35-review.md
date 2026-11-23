<!-- The check of climb batch 35's record, `CLIMB-BATCH-35.md`, with its probe notes `compile-ladder/plan-35/probes/fixes-35.md`, before the launch and after the curator's go, by a fresh reader on Fable on 2026-11-23: run 1's citations at their sources on `main`'s code (`295c215c2c`), run 1's reproducers run again on a worktree seeded from the base build, each repair against the team's sources, each rung against the decisions on record, the forks, the merge, the measures and the estimate, and the section for the curator; no fork is consequential, every reproducer of run 1 fails as the record says, one gap in rung W's test is closed in place (row 1's second half, a subscript after a subscript), and two points go to the coordinator. -->
<!-- Sources: the reviewer's brief (`<scratchpad>/batch35/check-35-brief.md`); `coordinator/CLIMB-BATCH-35.md` as of `2fcf2a0acb`; `compile-ladder/plan-35/probes/fixes-35.md`, its programs and the inventory `skill-workarounds.md`; POSITIONS P-180 with its history, P-174, P-37, P-148, P-12, P-87, P-9; FACTS F-53, F-88, F-292, F-363, F-369, F-372, F-373, F-387; review-queue items 503, 540, 558, 561, 562, 576, 585, and 44 and 73 through `PLAN.md:428` and `:445`; ledger rows 1, 152, 573, 594, 650, 653, 693, 694, 960, 1026, 1038, 1039, 1041; `reviews/batch-34-review.md` and `batch-34b-review.md`, section 6; the `coordinator` skill's `SKILL.md`, "The curator's role and decisions"; the code and the specification at the lines that the record cites. -->
<!-- The runs: a worktree of the reviewer's own, `/home/user/fortress-c35`, seeded from `/home/user/fortress-base42` and removed after; `harness-one.sh` on four walk programs and one new one, `junit.sh` with `ONE_JVM=1` on seven compiled programs, each once; one marked hack, `Modifiers.Override` added to `CodeGen.fnDeclCompilableModifiers`, built with `ant compileAll` and the library order, to see rung O's second wall. No suite, no gate stage, no timing. -->

# The check of climb batch 35's record before its launch

## For the curator

**What I checked.** I read the batch's record as a fresh reader. For the five fixes of the first run, I opened every file and line that the record cites, and I ran each failing program again on today's code. For all eight fixes, I read the rule in the specification that asks for the fix, and each decision of yours that the record names. I checked the choices that the batch makes, how the five fixes merge, the cost, and the section written for you.

**What I found.**

- **No choice of the batch needs your answer first.** Each fix follows a sentence of the specification or a decision of yours. None changes a line of microGPT. P-180 and your go cover the six questions of the review list that the batch builds.
- **Every failing program of the first run fails as the record says,** with the same message, under walk and compiled.
- **The `override` fix is the largest, as the record says.** I let the code generator accept the word `override`, as the planner did. The compiled class then does not load: 'Duplicate method name "f?0"'. So the fix needs a second change, and its size holds.
- **One fix had a gap in its test.** The row on subscripts (row 1) has two halves: `x[5]^2` and `m[3][7]`. The record tested only the first. I ran the second: walk stops on it today, with the same error. The same repair mends both. I added the second half to the fix's test.
- **Two points for the coordinator,** none for you: how far the checker's new refusal of `override` goes, and the thin margin of the disk.

**What I changed in the record.** The test of the subscript fix now covers two subscripts in a row. In your section: three words defined where they are used (node, checker count and distance, fixed roles); the program of fix S made whole, with the line that says why 1 is the right answer; the compiler's message for `override`; the choice of fix O and of fix A, each with its other way; and one sum in the cost of the second run, 1.05 to 1.1 million.

## A. Changes of the record that I made

Each is in `CLIMB-BATCH-35.md`, with one reason.

1. **Rung W, section 4, the mission and step 1; section 1, W's points to report; section 2, rung W.** Added the second half of row 1: a subscript after a subscript, `m[3][7]` and `m[3,7][2]`. Reason: row 1's claim is "a subscript followed by a subscript or a superscript", and the rung closes the row, but its test asserted the superscript only. Evidence: on the base, under walk through `harness-one.sh`, a program with `opr [i: ZZ32]: Row` in `object M` and `opr [j: ZZ32]: ZZ32` in `object Row(k: ZZ32)` stops at `m[3][7]`: 'Failed to find any matching overload, args = (), overload = { _[_](i:ZZ32,j:ZZ32):Row ..., _[_](i:ZZ32):Row ...}'. Both forms pass through the `SubscriptingMI` branch of `mathItemApplication` (`interpreter/evaluator/Evaluator.java:1185-1189`), so fork W1 mends both; F-387 gives the compiled answer, `g[1][2]` is `(g[1])[2]`. The manifest needs the same change, and has it: W's points to report. The slug, the title and the section heading are unchanged, so no key moves.
2. **Section 2, "The words this record uses".** Added "node", "the checker count and the distance" and "the fixed roles". Reason: the section uses each ("the parser's node", "The checker count and the distance stay 0 and 0", "the fixed roles about 1.2 million") and defined none.
3. **Section 2, rung S.** Added `trait K end` to the program, the sentence that `1` is not a `K`, and the name of the crash. Reason: without `K`'s declaration and that sentence, a reader cannot tell why 1 is right and 3 wrong (the test's own words: "only the inherited declaration applies, though the receiver is a K").
4. **Section 2, rung O.** Added the compiler's message, and fork O1 with its other way. Reason: the brief of this check asks for the message of each failing program and for each fork with its default and its other way; O1's other way was only in section 3.
5. **Section 2, rung A.** Added fork A1 in one line: the exit commits, and a failed commit runs the block again. Reason: as 4.
6. **Section 2, "Cost and time", run 2.** "the fixed roles about 1.05 million" is now "about 1.1 million". Reason: the record's own parts, 0.4, 0.35, 0.15, 0.13 and 0.065 million, sum to 1.095. The run's total, about 3.0 million, stands (1.95 + 1.1 = 3.05).

No design changed. The manifest's generator does not exist yet (section 6, "The generator"), so nothing of it was touched.

## B. Points for the coordinator before the launch

1. **Fork O2's reach.** O2 has the checker refuse an `override` that overrides nothing "in the cases where walk refuses it at load". Walk departs from the chapter's rule in row 693: it does not refuse one in an object expression with static parameters, or below a type extended under a `where` clause (`tests/XXXOverrideObjectExpressionOverParamWalk.fss`, `XXXOverrideNothingConditionalExtensionWalk.fss`). The rule itself has no such exception (`Specification/basic/traits.tex:680-683`). The record's words can be read as "the checker copies walk's gap". Say in the rung's section, or in what every agent reads first, that the checker follows the chapter's rule, that walk's tests give the cases, and that the worker reports each form that the checker refuses and walk loads. It changes no design; it is not edited here, since it is a fork's default.
2. **The disk margin is thin.** `df -P /home/user` at 09:50 UTC, after this check's worktree was removed: 12,522,424 blocks of 1,024 bytes available, 11.94 GiB. Run 1 needs 11.5 GiB, so the margin is 0.44 GiB, and it shrank by about 50 MB in 45 minutes (the record's figure at 09:03 UTC was 12,573,244). The record's fallback stands: free disk by the `cloud-container` skill, or move rung A to run 2.
Three notes that need no action before run 1:

- **The skill's lines.** The skill writer's cold-read fixes landed during this check (`91dde58f83`). They move no line that section 6's list for the skill writer cites: each of the 13 passages reads at its line as the record quotes it.
- **Rung O's promoted test on the base.** `XXXOverrideModifierCodeGeneration.test` is today a `compile` test that pins the refusal (`compile_exception_contains=Don't know how to compile this kind of FnDecl`). As the run test that the record asks for, its link step fails with the `CompilerError` that the record quotes, and its run step then prints 'Could not load P35OverrideModifierCodeGeneration'. The first is the gap's failure; the worker states that one.
- **Run 2, rung E.** The planner's trial declared `≡` only. The rung also declares `≢`, and `explorations/apl/base/AplCore.fss:226` declares a prefix `opr ≢(x: RR64)`. The model imports no `AplCore` (`MicroGptApl.fss:15-19`, `MicroGptFlat.fss:12-14`), so the quick checks do not meet it; 57 files of the APL experiments import it, none gated. When run 2's sections are read again, have rung E run one APL program that imports `AplCore`.

## C. Points that would change a decision of the curator's

None.

## D. The eight checks, with their evidence

### 1. Citations, run 1

Every cited line reads as the record says on `main` (code as `295c215c2c`):

- R: `nodes_util/ExprFactory.java:1640-1643`, the loop "Trim leading zeroes"; `NumeralNumbers.java:71-100`, `of(FloatLiteralExpr)`, which counts `digitPart(t0)` and the digits as written; `Specification/appendices/changes.tex:5485-5488`, the clause with row~960; `Specification/basic/expressions/literals.tex:101`, "the number $n$ of its digits, leading zeros among them".
- W: `Evaluator.java:1167-1189` (`mathItemApplication`), `:1386-1397` (`evalInvocationArgs`, `exprs.subList(1, ...)`), `:1034-1045` (`forSubscriptExpr`); `DesugarerVisitor.java:865-875`, the field reference on `init`, not on the temporary; `MicroGptFlat.fss:17-19` and `MicroGptApl.fss:26-28`, three tuple bindings of literals each.
- S: `compiler/OverloadSet.java:2420` (`ForTraitOrObject`), `:1489` (`if (j != selfIndex())`); rows 573 and 1038; F-372.
- O: `CodeGen.java:3381-3383`, `:3455-3459`, `:1096`, `:1287`; `STypesUtil.scala:1698`; `Constructor.java:699`; `traits.tex:673-683` and `:15-16`; `changes.tex:6422-6423`; rows 650, 653, 694; F-88; `PLAN.md:428` and `:445` for items 44 and 73.
- A: `atomic.tex:59-63`; `BaseTask.java:293-314`; `FortressTaskRunner.java:121-138`; `Evaluator.java:184-203`; `CodeGen.java:2067`; row 1039; F-373.
- The skill's headings that the sections name exist ("Promoting an `XXX` test", "Names, comments, citations", "When to run a whole suite", "The atomic runs", "Testing an edit here", "Designing a change", "What walk checks"), and the 13 passages of section 6 stand at their lines.
- The inventory's counts hold: (a) 98, (b) 23, (c) 50. The rows closed, 8 and 6, and the 13 passages count as the record says.

No citation was wrong.

### 2. Reproducers, run 1

On `/home/user/fortress-c35`, seeded from the base build, `FORTRESS_THREADS=4` in the harness. Walk: `harness-one.sh`, `Tests run: 4, Failures: 4`. Compiled: `junit.sh` with `ONE_JVM=1`, `Tests run: 13, Failures: 8`, the five passes the link steps.

- **R.** Walk: 'FAIL: a ZZ32: 2 =/= a ZZ32: 3; literals.tex, section "Literals": 00.5 has three digits'. Compiled: the link 'OK', the run 'FAIL:  2 =/= 3; literals.tex, section "Literals": 00.5 has three digits'. As the record says.
- **W.** 'FAIL: a ZZ32: 11449 =/= a ZZ32: 1075369; two indices, then a superscript', and 'FAIL: a ZZ32: 3 =/= a ZZ32: 1; the right side ran once'. As the record says. The second half of row 1: finding A1.
- **S.** '...$C cannot be cast to class ...$N1'; '...$Pq cannot be cast to class ...$Ka'; 'FAIL:  3 =/= 1; mark(1, Pq): only the inherited declaration applies, though the receiver is a K'. As the record says.
- **O.** 'CompilerError: ... Don't know how to compile this kind of FnDecl. node = f(self:B,other:Number):String'; the `typecheck` test, 'Must satisfy typecheck_err_contains'. As the record says. With the modifier let through and the library compiled again, the link is 'OK' and the run dies: 'java.lang.ClassFormatError: Duplicate method name "f?0" with signature "(Lfortress.CompilerBuiltin$Number;)Lfortress.CompilerBuiltin$String;" in class file P35OverrideModifierCodeGeneration$B'. So the second wall holds, and the rung's size, the largest of the run, holds. The duplicate has the override's own signature: it is the dispatch method of the pair, which goes when the gathering at `CodeGen.java:1096-1158` leaves out the overridden declaration, inside the members that the rung names.
- **A.** Walk: 'FAIL: a ZZ32: 0 =/= a ZZ32: 7; writes within a block that an exit leaves are retained'. Compiled: 'FAIL:  0 =/= 7; atomic.tex, section "Atomic Expressions": writes within a block that an exit leaves are retained'. As the record says.

Each test fails first, and for its own gap.

### 3. Repairs against the team's sources

- **R:** `literals.tex:101` counts leading zeros; P-174 makes `n` the digit count. Asked for.
- **W:** F-387 and `compiler_tests/SubscriptThenSuperscriptCompiled` give the reading of the primary that the compiled path has; a binding's right side is one expression, evaluated once (F-369 for the compiled path). Asked for.
- **S:** `basic/overloading.tex`, "Overloading Resolution": the call runs the declaration that fits the arguments. Asked for.
- **O:** `traits.tex:673-683`. The checker's new refusal is a change of behaviour: a program that type checks today is refused. The rule that refuses it is on the page: "It is a static error if a declaration with the modifier override does not override any inherited declaration." No gated compiled test writes such an `override`: the tests with the modifier widen (`OverrideFunctionalMethodWiden`, `OverrideAbstractMethodWiden`, the `XXXOverride*` tests), and neither library writes the modifier.
- **A:** `atomic.tex:59-63`, word for word.
- **E:** `basic-lib/booleans.tex:252-263` declares `opr ≡` on `Boolean`, and the prelude declares `EQV` and `NEQV` (`CompilerBuiltin.fsi:465-466`). Asked for.
- **L:** row 981's refusal is a change of behaviour under walk; P-174 ("written only as a coercion's or an operator's parameter type") and the checker's refusal show the rule. Rows 1057 and 1058 are programs that the rules accept and the compiled path runs.
- **M:** the checker accepts both programs and walk runs them. Asked for.

### 4. Decisions on record

- **P-180 and its history** carry the batch: "a defect is fixed, not only recorded in the gap ledger or taught in a skill as a workaround", and the history names row 960. The go is in the brief of this check, word for word.
- **The six items that the batch builds:** 558 ("Should the repair ... come before the switch-over"), 561 ("Who builds the exit out of an atomic block"), 540 point 1 ("repaired in a rung of walk, or left until walk is retired?"), 576 and 585 ("told"), 503 for its `comprises` clause. Each asks whether or when a known defect is fixed, and P-180 answers that. Item 562 (row 1041) stays open, and rung A leaves it.
- **Items 44 and 73** are closed as learning (`PLAN.md:428`, `:445`): 73 at its default, "strict"; 44 with no default. Rung O answers 44 by the chapter's rule and walk's behaviour, which agree.
- **P-87 and P-9:** no rung edits a model line. Fork W2 does not change when the model's constants run under walk: at load, before and after. It changes how often: once, where each right side ran once for each name and once more. The six right sides are tuples of literals, so the values are the same.
- **P-37:** rung E adds to the one library only. **P-148:** rung O times the checker.
- No premise that the record states as the curator's is missing from an entry or its history.

### 5. The forks

None is consequential by the rule.

- B1, two runs: the disk; undone by a later run. Not consequential.
- B2, what the batch takes: within P-180 and the go. Not consequential.
- R1: builds P-174 and `literals.tex:101`. Not consequential.
- W1: the compiled path's reading (F-387). Not consequential.
- W2: no model line; same values; see check 4. Not consequential.
- S1: the specification's resolution; walk agrees. Not consequential.
- O1: the specification and walk agree; the way not taken leaves the two paths apart. Not consequential.
- O2: the chapter's rule; point B1 on its words. Not consequential.
- A1: the specification's sentence; the retry is what a failed commit does at a normal end. Not consequential.
- E1: the one library's own form for boolean operators; P-37 untouched; can be undone. Not consequential.
- L1, L2, L3: the rules' answers, which the compiled path gives. Not consequential.
- M1, M2: mechanisms of the code generator. Not consequential.

The record's list of what it settles holds, entry by entry.

### 6. The merge

**Run 1 merges clean, with no `landsOnlyWith`.** By the files and members that the sections name:

- `Evaluator.java`: W at `:1167-1189` and `:1386-1397`, A at `:184-203`. Far apart.
- `CodeGen.java`: O at `:1096-1158`, `:1287` and `:3381-3521`, A at `:2067` only if it edits `forAtomicBlock`. Far apart.
- `changes.tex`: R at `:5485-5488`, O at `:6422-6423`.
- `OverloadSet.java`: S alone. `ExprFactory.java`: R alone. `DesugarerVisitor.java`: W alone. `BaseTask.java`, `FortressTaskRunner.java`: A alone. `STypesUtil.scala` or `OverloadingChecker.scala`: O alone.

No pair changes one behaviour two ways. S and O both bear on an object's functional methods, in two parts: O decides which declarations the class holds, S which local each type test reads. O's test has `self` first, and S's three write no `override`, so neither needs the other's result. The probe of check 2 shows that O's second wall is the gathering in `CodeGen.java`, not `OverloadSet.java`.

**Fork B1's reason holds.** Eight rungs need 16 GiB and five need 11.5; 11.94 GiB is free.

### 7. The measures and the estimate

- **The checker count and the distance** stay 0 and 0 (F-53). R, O and E run the two stages; no rung declares a move.
- **microGPT's quick checks** stay 7 of 7: no model line changes; W2 as in check 4; E's trial ran them, 7 of 7 twice (PRB section 4).
- **Run 1, about 4.5 million (5.3 with the reserve), fits.** Climb batch 34's run 1 wrote 5.12 million for five rungs, a restart of 0.43 million among it: its five rungs with their skeptics 3.33 million, its fixed roles 1.19 million (`reviews/batch-34-review.md`, section 6). The record prices 3.3 and 1.2. The figures that it quotes from that review are right: F 0.49, T 0.64, L 0.66, P 0.76, G 0.77. Rung O, at 0.85 million, is the one most likely to run over: two changes of the code generator and one of the checker, with the stages and the timing; G with its killed skeptic wrote 0.98. The range, 3.9 to 6.2, holds it.
- **Run 2, about 3.0 million (3.6), fits:** three rungs at run 1's price for a rung, and fixed roles as climb batch 34b's 1.02 million (`reviews/batch-34b-review.md`, section 6). Finding A6 corrects one sum.
- **The disk:** 11.94 GiB free against 11.5 (point B2).

### 8. The section for the curator

It lets him judge each rung: each has what changes, a short program, today's answer or message, and the answer after. It gives the two runs and why, what the batch leaves out and why, and the forks that wait for him, in order, each with its row and its item. It has lists and no tables, and short sentences. What was missing is in findings A2 to A5: three terms used and not defined, a program that named a trait that it did not declare, a message, and two forks' other ways.

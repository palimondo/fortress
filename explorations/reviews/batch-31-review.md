<!-- The combined post-batch review of climb batch 31, run 1 of coordinator/CLIMB-BATCH-31.md, four walls of the compiled path and the two repairs before the merge of the number types: six rungs planned and landed, M, K, L, A, V and X (run wf_dbc6b8c2-529, base c1ce2a35e1f1efabb59e0aaed9375994381512b3; launched at 00:05:07 UTC on 2026-11-17 on the curator's go of 23:04 UTC on 2026-11-16, given as he went to sleep, with no question put to him; its commit stage's last commit 7858d0e97b at 04:26:55; 24 agent transcripts for 22 results, since the machine restarted at 02:21 and the run was resumed at 02:22; every agent on Fable at medium effort; two judges and two repairs on the merged tree, and a second gate; landed on main as M 74f53ec886, L 3f7fd72814, A 5a076e9bc1, V b6fb208e23, X 1ce04203c5, K 6df780a7d0, the closes c37f4e7ef3, the gather's record 2c891b65b0, the review's corrections 2587659380, the two rulings 20a4518ff0 and f87a870f15, the two repairs 280835f438 and 995993ceab, and the gate's tables 7858d0e97b; pushed, with no hold), owed at the landing by the coordinator skill's references/batch.md, "The landing", step 3, in the form of reviews/batch-32-review.md, by a review worker on Fable reading only, against main at 7858d0e97b (the tree at 4e0a37dbf8, whose one commit after it is the coordinator's boot note). Its sources for the decisions are P-178 with its history's five blocks, P-37, P-160, P-164, P-167, P-17, P-47, P-149, P-60, P-146, P-175, P-169, P-45, P-12, P-148, P-68 and P-50. The gate's result is cited as its agents returned it and was not run again. The measures are batch-measures.py's on this run, spend.py's method over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch31/rev31/ (res.py, firstmsg.py, usertext.py, attach.py, skill.py, mainfind.py and spans31.py written new; brief.py, calls_mod.py, parts.py, runs3.py, tx.py and mainw.py copied from rev32). Tokens are writes only (input plus cache creation, one count per message id). The microGPT walk check is reported by its verdict only. Besides reading, this review ran only those scripts, facts-extract.sh, grep, sed, git and one `git apply --check`, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 31, run 1: six of six rungs, four walls of the compiled path repaired and walk and the checker made ready for the merge of the number types, the count and the distance still 0 after one gated test was withdrawn at a red gate; a run of 5.08M, 18 % over its estimate, through one restart of the machine, after a preparation span of 4.24M and a landing of climb batch 32 of 4.68M

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

Lines are `main`'s at `7858d0e97b`. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. The gather applied the rungs in the order M, L, A, V, X, K.

**M, the methods that a class inherits (rows 990, 732 and 571). The code generator only; P-47's library shape repaired, P-149 and P-147 kept.**
- One method once: `scala_src/useful/STypesUtil.scala:1748-1770`, `allMethodsNotReplaced`, called at `compiler/codegen/CodeGen.java:980`. A declaration is left out where a type strictly below its own declares the same name, kind and position of `self` at the same parameter types, compared at the instance that the `extends` clauses give (`paramsWithoutSelfApart`, `STypesUtil.scala:1780-1809`). The rule is a relation between two declarations, so the order in which the methods are gathered no longer decides (fork M1).
- A body in an imported api's trait: `CodeGen.java:1051-1056`, `hasBodyInItsTrait`, read at `:990`. A method that an api declares without `abstract` counts as a body in the trait's class (fork M2), which is the checker's reading (`scala_src/typechecker/AbstractMethodChecker.scala:274`).
- Row 571: `CodeGen.java:873`. A functional method with `self` not first is no longer written beside its dispatch method.
- P-47 is the decision that this rung serves: each integer type declares its own `MIN`, `MAX` and `MINMAX` beside the inherited ones, and that shape no longer stops a class at load (F-372). P-149 is untouched: the abstract-against-body case is the checker's and no line of the checker changed for M.
- No dispatch method's code changed (`compiler/OverloadSet.java` has no hunk of M's). One consequence did land: a class that did not load on the base now loads and its dispatch method tests the receiver in place of the argument (row 1038; section 2).

**K, the cast at a type below `self`'s trait (rows 991 and 695). The code generator only; P-60 and P-146 built on the compiled path.**
- `CodeGen.java:7436-7459`, `castToTypeBelow`: a value that has `self`'s type is cast where the declared type is a strict subtype of its trait. It is called at a single argument (`:7417`), at a typed binding and an assignment (`:5525`) and at a method's returned value (`:3126`, through the field `declaredResult`, `:7424`, set at `:2611`, `:2979` and `:3066`).
- P-60 says that a `comprises` clause speaks of values, and P-146 that `self` in a self-typed trait is also the implementing type. The checker already read both; the compiled code now agrees at four kinds of place. It does not agree at three: a closure's returned `self` (row 1050), a conditional with `self` in one arm (row 1051) and a dotted call on a value of the self parameter (row 1052).
- A trait that lists a type at a `where`-clause variable gets no cast (`:7455`, `typeAnalyzer.opensSizes`), so row 307 stands as it was.

**L, `label` and `exit` compiled (row 81). The code generator and one run-time class; P-175 kept for the join; P-50 met and not named.**
- `CodeGen.java:1817-1860`, `forLabel`, and `:1862-1881`, `forExit`; `runtimeSystem/LabelExit.java:14-46`. An exit throws a `LabelExit` that names one evaluation of its label block; the block's handler takes the exits that name its own evaluation (`LabelExit.valueAt`, `LabelExit.java:41-44`).
- P-175: a group of forked arms joins its arms before the exit passes it (`CodeGen.java:1797`, `joinForkedArms`, `:1681`). The skeptic's program at four threads printed 'par left count ok', its check that 501 to 1000 bodies ran (`compile-ladder/climb-batch-31/RECORD.md:278`).
- P-50 gives the body of a `label` and each `exit` value the expected type of the whole `label`. The rung's briefing did not hold P-50. The rung met its case: `find(n: ZZ32): ZZ32 = label found ... exit found with i ... -1 end found` does not compile, because the numeral that ends the block keeps its numeral type and the label's union type is then coerced as a whole (`ProjectFortress/compiler_tests/XXXLabelNumeralValueCompiled.fss`; row 340's notes). Section 2 and Part 5 take it up.
- Not built, each with its expected failure: an exit out of an `atomic` block (row 1039), a `finally` clause on an exit's way (row 890), a label block as a call's later argument (row 322).

**A, `atomic` as an expression and a `var` field in a transaction (rows 875 and 319). The code generator only; P-169's store and slots untouched.**
- `CodeGen.java:1979-1983`, `forAtomicExpr`: the atomic expression is the atomic block that holds its body, so the transaction's start, commit, handler and retry are `forAtomicBlock`'s (`:1942`).
- `CodeGen.java:4938-4961` (a `var` value parameter) and `:4976-5014` (a `var` field of the body); `compiler/codegen/VarCodeGen.java:207-238`, `MutableFieldVar`, now a `MutableStaticBinding` whose cell is reached through the object. The object's field holds a `MutableFValue` cell, written once by the constructor (`firstWrite`, `VarCodeGen.java:223`).
- P-169 keys an array's elements by array and index (`TXReadSlot`, `TXWriteSlot`) so that an array keeps one box an element. Fork A1 takes the other device for a field, the code's own for a top-level `var`. No line of `runtimeSystem/Transaction.java` changed.
- Beyond the plan, and a repair: a loop body or a function expression inside an object's method now works on the object's `var` field, where the base gave it a copy (`compiler_tests/VarFieldCapturedCompiled`).

**V, walk before the merge (rows 997 and 998). Walk only; P-178 served, P-45 built for one kind of pair, P-12 kept.**
- `interpreter/evaluator/types/FTraitOrObject.java:102-103`: the check of value types passes the symbolic type of a type parameter (fork V1).
- `interpreter/evaluator/values/OverloadedFunction.java:513-527`: where two parameter lists differ only at object types, a generic declaration beside a plain one whose domain lies inside the generic's (`plainInsideGeneric`, `:837-859`) is read on its declared domains, and a named rule refuses the pair. The reading is `returnRuleAtObjectArguments` (`:882-904`, used at `:814-820`).
- P-45: "It checks the Return Type Rule over every instance of a generic declaration that the argument types allow". Walk now does so where the plain declaration's parameter type is an object type. It reads no `comprises` clause (fork V4), so row 550's pair at `ZZ64` stays refused until rung O.
- P-12: walk has no static types. A more specific declaration that writes no return type is therefore not judged at an object type (`writesReturnType`, `:862`; row 1044).

**X, the checker's Return Type Rule at an object type (row 542). The checker and one line of the code generator's dispatcher; P-45 kept, P-148 kept, P-178 served.**
- `scala_src/overloading/OverloadingOracle.scala:114-122` and `:140-167`, `meetingInstances`: a kept type parameter that is a whole parameter type, where the more specific declaration has an object type `C` at that position, is read as its union with `C`. Only the instances whose domain meets the object are then compared.
- `compiler/OverloadSet.java:1958-1971`, with `:1800`, `:1830` and `:1947`: the dispatcher casts an arm's result to its range where that range is a static parameter. Without it the accepted pair failed verification. The file is outside the rung's named ones (section 2).
- P-148: the count stage took 93.6 s on the base and 93.2 s on the change for the worker, 92.8 s and 88.5 s for the skeptic; the tables are equal to climb batch 32's.
- P-45's positional rule stands: row 542's second pair as the row wrote it, `f[\T\](x: T): T` beside `f[\U\](x: Box[\U\]): Box[\U\]`, stays refused, now by position (`compiler_tests/XXXOverloadGenericObjectDomainByPosition`).

**P-178 and its history.** The entry asks that both paths take the form of one `value object` for each built-in number type before the switch-over, "the one library by the merge, and the compiler's prelude by an exception to P-37". Its history's last block (2026-11-16 01:57Z) records that this is his position by his own words of 2026-11-08 and 2026-11-09, and not the coordinator's application. Run 1 builds nothing of the merge. It builds the two repairs that the merge needs first in walk (V) and the one that it needs in the checker (X). The one library's half is rung O of run 2. The prelude's half is in no run (fork H2), so after both runs the decision is carried out on one path only.

**What the two paths still do differently after this run.** Each is a row. The first three are new differences that this run made, since the compiled path had no `label` before.
- Which evaluation of a `label` block an exit leaves where the block is evaluated again inside itself: compiled, the evaluation in which the exit's function was made; walk, the innermost one of that name (row 1042, contested; `compiler_tests/LabelEvaluationIdentityCompiled` gives 102, walk 104).
- An exit that passes a `try`: under walk a `catch` clause of `Exception` takes it (row 1040) and a `finally` clause runs; compiled, no `catch` clause takes it and the `finally` clause does not run (row 890).
- An exit that runs after its label block has completed: compiled, an uncaught `LabelExit` ends the program; under walk a `try` can catch it as `LabelException` (row 1041, contested).
- An exit out of an `atomic` block: both paths discard the block's writes, where the specification retains them (row 1039).
- A numeral as the value of an atomic expression, or at the end of a label block, at a declared type: walk runs it; the checker refuses the first or the class fails verification (row 1043), and the code generator stops on the second (row 340).
- A generic declaration beside a plain one: both paths now refuse the invalid pair at an object type and accept the valid one. Walk still loads an invalid pair whose plain declaration writes no return type (row 1044) and one over an arrow type (row 1049); the checker still refuses a valid pair over a tuple of object types (row 1048); walk refuses the valid pair at a trait that comprises one object (row 550).
- An object that reaches a method along two paths, one through a trait that declares it again: the checker refuses the self-typed generic form, walk runs the lower declaration (row 1037).
- Compiled only: the wrong answer of a functional method with `self` second (rows 1038 and 573); an assignment from outside to a `var` field of a value of a strict subtype (row 1053); the checker's tie among generic candidates (rows 1046 and 1047). Under walk only: row 1045, the team's test that is green for another reason.

### 2. The decisions that landed at a default

The record's section 3 holds 27 forks. Seventeen are run 1's (B1, B2, B3, H1, H2, S, M1, M2, K1, L1, L2, A1, V1, V2, V3, V4, X1), and run 1 also carried out O2 and O5. The run's result holds 36 items for the curator. Those that change what a program does or accepts follow. "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions").

**M1, the lower type's declaration replaces.**
- Landed: `STypesUtil.scala:1748-1770`. It is what the plan says, in the team's own wider form: a declaration of any type strictly below replaces, not only the trait's own. The worker first built the path-by-path reading of the specification, which wrote `m` twice into the plain diamond `object O extends { X, A, B }`, a program that prints the lower declaration on the base and under walk.
- No program that ran changes its answer. The plain diamond gives the lower declaration on the base and after (`compiler_tests/TraitMethodDiamondRedeclaredCompiled`, a plain test of today's answer with row 1037, the third way of `tests-writing.md`).
- Not consequential. What is open is a question that the batch did not decide: by the text of `Specification/basic/traits.tex:584-590` such an object inherits both declarations, and the checker refuses the self-typed generic form (row 1037; M.worker.1).

**M's consequence, row 1038: an error became a wrong answer.**
- Landed: since `CodeGen.java:873`, `object Pq extends { K, P }` with `mark(x: K, self)` beside `P`'s `mark(x: Any, self)` loads. `mark(1, Pq)` answers 3; walk answers 1. On the base the class did not load, 'Duplicate method name "mark?1"'. The site is row 573's, the dispatch method's test of the receiver, in `OverloadSet.java`.
- Not in the plan. The skeptic found it and gave it its expected failure (`compiler_tests/XXXFunctionalMethodSelfSecondReceiverTested`) and its place among his answers (`PLAN.md:143`, item 96).
- Not consequential by the rule: it bends no decision and can be undone. It is the one landed change that replaces a refusal by a silent wrong answer, so it is named in "For the curator".

**K1, and the cast at a declared trait type strictly below `self`'s trait.**
- Landed narrower than the fork's words: only a value that has `self`'s type is cast (`CodeGen.java:7451`), not every value whose static type is not a subtype by the `extends` clauses. The wider form stopped a link that passes today.
- Landed against the fork's stated consequence at one place: for `trait Q comprises { M }`, `trait M extends Q comprises { R1, R2 }` and `mid(m: M)`, the base emits no cast and the program runs, since the verifier does not check an interface type; the rung emits `checkcast M` at the argument, the returned value and the binding. The output is the same (`compiler_tests/SelfTypeReturnSelfAtTraitRun`). The plan said "so a call that verifies today keeps its bytecode" (`CLIMB-BATCH-31.md:581`).
- Not consequential: the cast succeeds wherever the checker's reading is right, no program's answer changes, and it can be narrowed to object types in one line. K.skeptic.1 holds the question.

**L1, each evaluation of a label block has its own identity.**
- Landed as the fork's words say: `CodeGen.java:1821-1827`, a new `LabelExit.Target` for each evaluation, held as an immutable local under the label's name.
- The fork gave as its reason "walk's `forLabel` and `forExit`; P-175". Walk does not do this: it matches an exit to the innermost running evaluation of that name (`interpreter/evaluator/Evaluator.java:628-645`). So the default made a new difference between the paths (row 1042). The curator's section of the plan described L1 as the join of a parallel loop's tasks alone, and the check before the launch judged that part.
- Consequential by the rule's third clause: the record does not settle it and the team's sources split. The specification scopes an exit's target statically (`Specification/basic/expressions/label.tex:39-46`), which is the compiled answer; one sentence of it (`label.tex:61-66`) also fits walk's; walk is the team's code. It can be undone. Finding 2.

**An exit that passes a `try`, and an exit after its label block (rows 1040, 890 and 1041).**
- Landed: a compiled exit is a `LabelExit`, a Java `Error` that is no `FException`, so no `catch` clause takes it (`LabelExit.java:14`; `CodeGen.forTry` catches `FException` only). The specification names no exception for an exit and says that only `finally` clauses run on its way (`label.tex:72-78`). So the compiled path follows the text at `catch` and departs from it at `finally` (row 890, an older row of the compiled `try`); walk does the reverse (row 1040).
- The plan asked for "an `exit` inside a `try` with a `catch` of every exception, which does not catch it" (`CLIMB-BATCH-31.md:666`), and that is what landed. It did not foresee that walk catches it.
- Both libraries declare `object LabelException extends UncheckedException` with the text "Exiting without an enclosing label block" (`Library/FortressLibrary.fss:1914-1916`; `Library/CompilerLibrary.fss:191-193`). That text names the case of row 1041, an exit with no label block left to take it, and not an exit on its way to its label. It is evidence for his answer to L.worker.2, and no review before this one cites it.
- Consequential in the same way as L1, and joined to it in finding 2.

**An exit out of an `atomic` block (fork L2's second part; row 1039).**
- Landed as the plan says: not built, with `compiler_tests/XXXExitOutOfAtomicCompiled` and `tests/XXXExitOutOfAtomicWalk.fss`. Both paths discard the block's writes: compiled, the block's handler ends the transaction without a commit for every abrupt completion (`runtimeSystem/BaseTask.java:285-314`).
- The specification is plain: "If it completes abruptly by exiting to an enclosing `label` expression, writes within the block are retained and become visible to other threads" (`Specification/basic/expressions/atomic.tex:60-63`).
- Not consequential: the text settles it, the tests assert the text's answer, and nothing was chosen. Before this run the compiled program was refused; now it compiles and loses the writes with no message, as walk does. No rung is planned for it.

**A1, one more object for each `var` field.**
- Landed as the plan says: `CodeGen.java:4938-4961`, `:4976-5014`; `VarCodeGen.java:207-238`. Every read and write of a `var` field, outside `atomic` too, first asks whether a transaction runs and then goes through the cell (row 641). The cost is not timed.
- Not consequential. No line of the model's two programs or of their helper files declares a `var` field (grep over `explorations/run-c4/src` and `explorations/apl/mg`). In the one library a `var` field stands in `String.fss` (12), `OneShot`, `Box` (`Library/FortressLibrary.fss:4962`, which nothing else of that file names) and `Lazy`.
- One side effect: a `value` object with a `var` field, which the specification forbids and nothing refuses (row 112), changes its strict equivalence: `V(1) === V(1)` was `true` and is `false`. The one library holds such a declaration, `value object Lazy[\T\](var s : State[\T\])` (`Library/Lazy.fss:18`); row 112 does not name it.

**V2, a pair that loaded before is refused at load.**
- Landed as the plan says: `pickFirst[\T extends Number\](a: T, b: T): T` beside `pickFirst(a: NN32, b: NN32): String` is refused, 'fails the Return Type Rule' (`tests/GenericBesidePlainObjectReturnRuleWalk.fss`).
- The plan called this "the one change of run 1 that stops a program that runs today" (`CLIMB-BATCH-31.md:404`). The rung's and the skeptic's runs give more: a functional method `same(self): String` of an object beside a top-level `same[\T\](a: T): T`, and `wrap(a: NN32): Box[\NN32\]` beside `wrap[\T extends Number\](a: T): Box[\T\]`, loaded on the base and are refused now. Each refusal is the specification's rule (`Specification/advanced/overloading.tex:555-559`): the instance at `Number` applies to an `NN32` and returns a `Box[\Number\]`. The compiled checker refuses the same pairs. Two kinds of pair that were refused now load.
- No pair of the one library and no existing test changed its verdict (walk's suite, 861 tests; the skeptic's scan of 50 apis).
- Not consequential: it builds P-45, and it brings walk to the checker's answer.

**V4, the valid pair at `ZZ64` stays an expected failure until rung O.**
- Landed as the coordinator decided it after the check of the record: `OverloadedFunction.java:882-904` reads no `comprises` clause, and `tests/XXXGenericBesidePlainReturnParam.fss` is unchanged.
- Not consequential in itself, and it reads P-60 narrowly for one night: by P-60 every `ZZ64` value is a `Long`, so the pair is valid today. The merge ends the case for the five number types. It stays for a program's own trait that comprises one object, on both paths (X.skeptic.2).

**X1, the rule as built, and the cast in `compiler/OverloadSet.java`.**
- Landed narrower than the fork's words: only an object type at a whole parameter position is read. A tuple of object types is still compared, and that valid pair is refused (row 1048, `compiler_tests/XXXOverloadReturnTupleDomain`).
- The cast, `OverloadSet.java:1958-1971`, is outside the rung's named files. By `references/batch.md`, "The roles", such a file does not make a settled fix contested: it lands and goes on the review list, where it is (X.worker.3). It adds one `checkcast` to a dispatcher whose range is a static parameter, at an arm that declares another return type. It makes one more pair run that the base accepted and could not load.
- Not consequential: both follow the paper's rule that P-45 names, and each can be undone.

**The gate judge's withdrawal of row 1046's test.**
- What landed: `995993ceab` moved `XXXOverloadGenericObjectTwoParams.fss` out of `ProjectFortress/compiler_tests/` to `explorations/compile-ladder/rung-return-rule-object/probes/`, removed its `.test`, and rewrote row 1046 with the probe as its reproducer. The defect has no gated test.
- Against the rule (`.claude/skills/fortress-repo/references/tests-writing.md:82-88`, "How a defect is recorded"): the specification settles the defect, so the second way applies, "a gated `XXX` test that asserts the specification's answer". The second way has no exit. The exit that the ruling took is the third way's, "If ... no gated test can pass while it shows ... write the ledger row only. Its reproducer ... is `none`, and its notes give the command and its output", which the rule gives only where the specification is silent or a conflict leaves the question open. So the ruling does not keep the rule's letter in two points: it uses the third way's exit for a defect of the second way, and the row's reproducer cell names a file under `explorations/`, where the rule gives a gated test or `none`.
- It keeps the rule's purpose. A gated test must be green or red by the code, and this one was green in three JVMs and red in the fourth by the order in which the suite compiled its files. The judge said so and put the decision to the curator (judge-gate.1).
- What gated form the defect can have:
  - **After the tie is decided.** The checker resolves a call tied among generic candidates by the order of the overloadings (`scala_src/typechecker/impls/Functionals.scala:1104-1108`), which varies with what the JVM compiled before (rows 499, 1047 and 1046). Once the tie is decided on declared domains, the pair is a plain test that compiles and runs. This is the only form inside the suite.
  - **Outside the suite's shared JVM.** The probe compiled alone gave the crash seven times of seven at the gate and once more at the repair. A list of the gate, as the atomic runs are a list, could compile such a program alone and check its message. It needs a new list in the gate's script and in `gate.md`.
  - **No other form.** An `XXX` compile test is red when the compile passes; a plain link test is red when the checker reports the crash.
- Not consequential by the rule's clauses: it reverses no decision of his and can be undone by one `git mv`. It does set a precedent in how a defect is recorded, which is a rule of the skill; the coordinator judges whether the skill takes it (Part 3).
- The same tie can turn another gated test red. The judge names one that it did not trace: `compiler_tests/OverloadReturnObjectDomain.fss:26` (judge-gate.3). Run 2's gate reads that test.

### 3. The measure: the declarations of the one library that the code generator refuses

The plan's measure is the number of declarations of the one library's fourteen components that the code generator refuses: 24 in 8 kinds before, 19 to 21 expected after run 1 (`CLIMB-BATCH-31.md:511-521`; the kinds, `compile-ladder/plan-31/PROBES.md:98-113`). L was to take off the 4 of `label` and A the 1 of the atomic expression; two of the four `label` declarations have a second wall behind the first.

**No stage of the run measured it on the merged tree.** The plan gives the measure to "the coordinator or the post-batch reviewer in a scratch worktree" after each run's landing (`CLIMB-BATCH-31.md:941`). No agent of the run ran `compile-ladder/plan-31/probes/planner/codegen-measure.sh`: its name stands in three transcripts, each time in a listing of the folder. The coordinating session did not run it after the launch. This review reads only. So the figure after run 1 is not known, and it is a step due before run 2.

**What the rungs' own runs show.** Each is a test against the compiler's prelude; no rung compiled a declaration of the one library.
- The four of `label`: `compiler_tests/LabelExitCompiled` compiles and runs the library's two forms, an `exit` out of a `for` in a method of a generic trait (`Holder.indexOf`, the form of `Library/FortressLibrary.fss:2189-2195`) and a label as a function's whole body with several exits (the form of `Library/String.fss:148-158`).
- The one of the atomic expression: `compiler_tests/AtomicExprCompiled` compiles and runs `OneShot`'s line (`Library/OneShotFlag.fss:18`).
- So by the tests the five first walls are gone, and 19 is within reach. Whether each of the five declarations then compiles is not shown. Two things can keep one refused: the second wall that the plan names (row 818 behind `SubString`'s `label`), and the limits that rung L itself left, of which one is near a library site: `simplestRationalBetween(a:QQ, b:QQ): QQ = label done` exits with numbers at a declared number type (`Library/FortressLibrary.fss:508-516`), the neighbourhood of row 340's label case.
- The measure's patch still applies to the landed tree: `git apply --check explorations/compile-ladder/plan-31/probes/planner/measure-hacks.patch` prints nothing on `main`, and `NN32`'s two getters stand as the script expects them (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:429-430`).

M, K, V and X do not move this number, as the plan says. Their walls are of the kind that the count does not see: a class that is emitted and fails when it loads.

### 4. The gate, the count and the distance

**The first gate was red on one test.** On `main` at `2c891b65b0`: `compiler_tests/XXXOverloadGenericObjectTwoParams`, an expected failure of rung X, reported 'Saw wrong failure' inside the suite's shared JVM; seven lone compiles gave the expected message. Everything else was green. The gate judge ruled a repair (`compile-ladder/climb-batch-31/JUDGE-gate.md`), the repair withdrew the test (`995993ceab`; section 2), and the whole gate ran again.

**The second gate is green,** as its agent returned it, on `main` at `995993ceab`: 63 suites, 3,484 tests, 0 failures (climb batch 32's 3,422): `CompilerJUTest` 1,616 to 1,667, the four system shards 856 to 867, all other suites unchanged; 24 atomic programs, 72 of 72 `PASS`, rung A's two among them; the ladder with no move; the checker count 0 over the same apis with no crash row, and the distance 0, both as at climb batch 32's gate. No row of the count's table is new or risen, so no rung edit is tied to one. microGPT's walk check gave 7 of 7 for both programs at the commit stage.

**The stages' seconds.** The distance stage took 136 s at the first gate and 143 s at the second (`FortressLibrary` 86 s), each beside the first minutes of `testFast`; F-240 says so. F-240 now gives the count stage as "about 75 s", from the times of two files of the gate's log, against climb batch 32's about 95 s, and the commit stage noted that the fall "stands in the entry without an explanation". Rung X and its skeptic timed the whole stage four times that night, on the base and on the change: 93.6 s, 93.2 s, 92.8 s and 88.5 s. So a fall of the stage is not shown; the two figures are not of the same span (Part 1, corrections).

**After the skeptics' fixes.** One skeptic fix changed code, K's (`f9bc4f2546`, the union case of `castToTypeBelow`); it ran its tests and no suite. X's skeptic's fix changed no code. The gate's suites and tables on the merged tree are their check.

### 5. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 5.08M over 24 transcripts, in 4 h 23 min** (00:05:07 to 04:28:17 UTC; `batch-measures.py` gives the same 5.08M). Two of the 24 are the skeptics that the restart killed (0.24M); the 22 agents that returned a result wrote 4.83M.

By role (writes, then share):
- Rung workers (6): 1.75M, 34.5 %. M 368K, L 329K, X 277K, A 275K, K 274K, V 231K.
- Skeptics, 8 launches for 6 rungs: 1.65M, 32.5 %. L 337K, V 270K, X 126K and 206K, K 118K and 198K, A 198K, M 197K.
- On the merged tree: the two judges 328K (the review's 125K, the gate's 204K), the two repairs 332K (160K and 172K), 13.0 % together.
- Gather 349K, 6.9 %. Merged-diff review 236K, 4.6 %. The two gates 239K (125K and 114K). Commit 125K. The disk check 66K.
- Per landed rung, all roles: 0.85M.

**Against the record:** "about 4.3 million tokens written, between 3.6 and 5.4 million. About 5 hours and a half" (`CLIMB-BATCH-31.md:549`). **5.08M, 18 % over the estimate and inside its range, in 4 h 23 against 5 h 30.** By role:
- **The workers wrote 1.75M against 2.0M.** Each took 22 to 43 minutes.
- **The skeptics wrote 1.65M against 1.3M.** The restart's two killed launches are 0.24M of the difference; without them the six skeptics wrote 1.41M. L's skeptic refilled its cache once (159K).
- **The fixed roles wrote 0.90M against 1.0M** (the disk check, the gather, the review, the first gate and the commit stage).
- **The estimate reserved nothing for a ruling or a repair.** The two judges, the two repairs and the second gate wrote 0.77M. That is the whole excess: without them the run is 4.30M.
- **The minutes** (the plan's figure in brackets, which orders the scatter only): M 35 (220), L 38 (180), X 36 (160), A 31 (170), K 43 (150), V 22 (200). The skeptics took 12 to 21 minutes each.

**The cost in three spans, each on its own.** Each span is `spend.py` from its start less `spend.py` from its end, over the same folders: the session's `subagents/` folder, its workflow folders `wf_16f35394-635` (climb batch 32's run), `wf_f25357fb-f86` (its record-landing) and `wf_dbc6b8c2-529` (this run), the project folder of headless sessions and the `landing-32` folder. `find` shows no other folder with a transcript changed since the first boundary. `spend.py` printed 14.36M from 1794807301 (2026-11-16T05:35:01Z), 9.68M from 1794814266 (07:31:06Z), 5.43M from 1794873907 (2026-11-17T00:05:07Z) and 0.48M from 1794889615 (04:26:55Z). The record-landing's journal was last written at 07:31:05.004 and its last agent's transcript at 07:31:05.019, so the boundary is the next whole second; a workflow's journal holds no times, and the times are those of the files and of the agents' records.
- **Span 1, the landing work of climb batch 32**, 1 h 56 min: **4.68M over 35 transcripts.**
  - The record-landing run, 26 agents, 2.59M. The largest: page 372K, sort 295K, check 226K, admission 193K, judge 162K, skill cold read 130K.
  - Its four headless skill-writer sessions, 0.94M.
  - So the record-landing with its writers wrote 3.53M, against climb batch 30's 3.48M. With climb batch 32's post-batch review, 462K, the landing work is 3.99M.
  - Climb batch 32's commit agent, 120K, which last changed at 05:36:22.
  - Beside the landing, 0.57M over 3 transcripts: the probe of the model's diffs 237K, the audit of climb batch 32's tests 231K, the removal of false notices from tests 105K.
- **Span 2, the preparation**, 07:31:06 on 11-16 to 00:05:07 on 11-17, 16 h 34 min: **4.24M over 22 transcripts.**
  - **This batch's own preparation, 0.79M:** its planner, 422K, from 23:07:50 to 23:39:47; the check of its record, 324K, from 23:41:20 to 00:04:40; its base build, 47K, from 23:41:20 to 23:43:55. The generator's block was spliced by the checker.
  - The record also rests on work of earlier spans, counted in climb batch 32's review: its first planner and check of 2026-11-13 (836K and 394K) and the probe of the merge (255K).
  - Other work, 3.45M over 19 transcripts: the post-mortem's analysis 445K; the update of the page of `fortress-repo` changes 285K; the specification brought in line with the tree 279K; the specification's chapter 2, two workers, 256K and 133K; the intent behind omitted types 231K; the sort of the held list 231K; a headless skill writer 224K; the model's four diffs applied 179K; two record writers 167K and 159K; the intent behind fortresses 158K; the revival page's sentence 132K; the scout of the preface's items 125K; the update of the page of skill drafts 109K; a note's row and facts 103K; two cold reads of skills 96K and 59K; the scout of fast dispatch 77K.
- **Span 3, the run**, 00:05:07 to 04:26:55, 4 h 22 min: **4.95M over 23 transcripts**, all of them the run's. Its commit agent last changed at 04:28:17 and counts after the span. No agent of the coordinator's ran beside the run.
- After the run's end, 0.48M at the time of the count: the commit agent 125K and this review.
- **The coordinating session's own writes**, which `spend.py` leaves out (`mainw.py`, all on Fable): span 1, 0.39M; span 2, 2.47M, of which 0.64M is one write of its whole context at 11:14 on 11-16, 0.20M one at 15:31 and 0.13M one at 22:48; span 3, 0.02M over 20 messages.

So the run is the whole of its own span, and the batch's own preparation is under a fifth of the preparation span.

**The briefing's use.**
- **16 of 16 briefed launches read their briefing, 100 %, and each read every part. None read it in its first turn.** The briefed launches are the six workers, the eight skeptic launches and the two repairs. The two skeptics that the restart killed had read theirs. The disk check, the gather, the review, the two judges, the two gates and the commit stage have none by design.
- When: the review's repair at call 5, 18 s after its start; skeptic V at call 5, 20 s; skeptic L at call 6, 22 s; skeptic M at call 6, 23 s; the gate's repair at call 8, 23 s; skeptic X's first launch at call 6, 25 s; skeptic K's first launch at call 6, 26 s; skeptic A at call 7, 27 s; rung X at call 6, 30 s; rung M at call 9, 34 s; skeptic K's second launch at call 6, 39 s; rung L at call 10, 40 s; rung V at call 16, 57 s; rung A at call 15, 60 s; rung K at call 14, 60 s; skeptic X's second launch at call 14, 73 s.
- Its results came to about 253K tokens, 5.0 % of writes, at 0.40 tokens a character plus 110 a call.
- Against the batches before (briefed, read, at calls, seconds, share): B26 8, 8, 5 to 13, 21 to 89, 5.2 %; B27 15 of 19, 15, 4 to 16, 16 to 78, 6.2 %; B28 15, 15, 3 to 21, 14 to 95, 3.1 %; B29 15, 15, 4 to 20, 15 to 105, about 3.6 %; B29b 4, 4, 12 to 21, 41 to 97, 2.7 %; B30 6, 6, 5 to 14, 23 to 53, 4.9 %; B32 16, 15, 4 to 17, 19 to 78, 5.0 %; B31 run 1 16, 16, 5 to 16, 18 to 73, 5.0 %.

**Other measures.**
- First calls: 1.22M (24.0 %), 12 cold. Cache refills: 1, 159K (L's skeptic). Refusal cycles: 0. Rulings and repairs on the merged tree: 660K, with the second gate 774K.
- The skill's load, by a rough count (the load text and every call whose command names the skill's folder): about 1.0M, 20 %. `revival-changes.md` was read whole by 20 of the 24 launches: all but the disk check, the two gates and the commit stage. `sources.md` was not read.
- An attachment that no brief asks for: the harness attached `Library/FlatString.fss` whole, 159 lines, to each of the 23 launches that loaded the skill. The skill's `SKILL.md` quotes a cache entry's first line, which holds `@"/home/user/fortress/Library/FlatString.fss"`, and the harness reads that as a file to attach. About 2.7K tokens a launch, 60K in the run (process finding 6).
- Error results: 17.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `af7449c8`, 66K, 0.1 min; rung M `ac2a9f12`, 368K, 35.1; rung V `a9134c1c`, 231K, 22.5; rung L `a8e609d5`, 329K, 37.7; rung A `a875742e`, 275K, 30.6; rung X `aa0721d0`, 277K, 35.9; rung K `a4138987`, 274K, 43.0; skeptic V `ae44de8f`, 270K, 17.8; skeptic M `a488976f`, 197K, 11.7; skeptic L `a3f47849`, 337K, 19.6; skeptic A `a51e2262`, 198K, 12.7; skeptic X `a050f804`, 126K, 2.0, killed; skeptic K `a2cf799a`, 118K, 2.1, killed; skeptic X `a8b27e28`, 206K, 15.5; skeptic K `a80d5096`, 198K, 20.5; gather `a019febf`, 349K, 43.6; gate `a6b4e731`, 125K, 21.1; review `af7f8a63`, 236K, 5.7; judge of the review `ad7cd914`, 125K, 1.7; repair of the review `a957af68`, 160K, 3.1; judge of the gate `a6c961c4`, 204K, 9.3; repair of the gate `aac1344b`, 172K, 3.4; second gate `acdaae2c`, 114K, 20.4; commit `a155b397`, 125K, 4.0.

### 6. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`):
- **No worker and no skeptic ran a whole suite twice on one code state.** M, L and X each ran `ant testFast` once on their final code; V ran `ant testSystem` once; A ran `ant testQuick` once, its reading of "the whole compiled suite"; K ran `ant testFast` on its first form of the cast, which failed two tests, and once more on its final code. No skeptic ran a suite.
- **The count and the distance stages:** X ran the count stage on the base and on its change and the distance stage once, as planned. X's skeptic ran the count stage on the base build and on the head, the one planned exception. No other rung ran either, as planned.
- **The second gate ran every stage again, where one suite read the withdrawn test.** The gate's repair changed two files of `ProjectFortress/compiler_tests/` and no code. The second gate ran `testFast`, `testSystem`, `testSpecData`, the 72 atomic runs, the ladder, the count and the distance again, 20 minutes and 114K. Of these only the compiler track of `testFast` reads the folder that changed. The script launches the whole gate for any path that a passing run of the repair does not answer (process finding 2).
- **The specification was built three times, twice on one text.** The gather built it once. The review's repair built it at 03:49 to check its one clause, and its judge told it not to keep the PDF; the commit stage built it again at 04:25 on the same text, for the PDF.
- **The restart made one repeat:** X's first skeptic had started the count stage on the base build at 02:20:26; its successor started it again at 02:25:14.
- **The 52 demos ran once,** at the gather. **The microGPT quick pair ran once,** at the commit stage. No rung ran either. The sentence that the plan put into every agent's first reading ended climb batch 32's process finding 5.
- **Builds** (`ant compileAll` or `clean`, then the library order): K 4 and 4, L 2 and 2, M 2 and 0, V 2 and 0, A 1 and 1, X 1 and 1; K's skeptic 1 and 1; the gather 2 and 1; each gate 1 and 0.

### 7. Three events

**The restart of 02:21.**
- What happened: the session's manager logged 'Received signal, shutting down gracefully' at 02:21:06; the machine's `uptime -s` gave 02:21:16; the disk was not rolled back. The coordinating session received the restart's notice at 02:21:43 and resumed the run at 02:22:22 with the same ID and arguments (`base` `c1ce2a35e1…`, `baseBuild` `/home/user/fortress-base35`). The journal holds a second `started` line for the keys of skeptic X and skeptic K, and their new agents' first records are at 02:22:38 and 02:22:42.
- Whom it killed: the skeptic of rung X (`a050f804f6967e6f3`, 2.0 minutes, 126K, last record 02:20:34) and the skeptic of rung K (`a2cf799af02a90a61`, 2.1 minutes, 118K, last record 02:21:04). The six workers and the skeptics of V, M, L and A had ended.
  - X's skeptic had read the skill, its briefing, the report, the diff and the worker's transcript, and had started the count stage on the base build 8 seconds before its last record. It left an empty log and a half-made scratch folder under the worktree's `tmp/`. It wrote no file of the tree and made no commit.
  - K's skeptic had made 15 calls, each a read. It left nothing.
- Whether the successors went on correctly: yes, both.
  - X's (`a8b27e28581be30ca`) listed the leftovers, found the first launch's transcript and read its calls, saw that no process of it ran, removed the half-made folder, and started every run again. Its `SKEPTIC.md` says: "Two launches of this role worked the rung: the first stopped with the machine about two minutes in, having read the report and started one count run, which it left without output; this one started every run again."
  - K's (`a80d509668dc17bca`) compared the two transcripts' sizes and times, found no file and no commit of the first, and started from the worker's head. Its `SKEPTIC.md` says: "Two launches of the skeptic worked the rung. The first ran for two minutes and left no commit and no file".
  - The sentence that the plan gave every agent for this case ("If your worktree and your branch exist when you start, an earlier launch worked this rung") is written for a worker. Both skeptics applied it to their own role.
- The cost: the 244K that the two killed launches wrote, 4.8 % of the run, all of it reading that their successors did again; 94 seconds without a running agent (02:21:04 to 02:22:38); about four minutes on the clock. No commit was lost and none was redone.

**No chat message of the curator's reached an agent.**
- The run was launched at 00:05:06 from a turn that the hand-back of the record's checker started at 00:04:40, and resumed at 02:22:22 from a turn that the restart's notice started. Neither turn was started by a message of the curator's. His last messages before the launch were the go at 23:04:54, a paste of the usage panel at 23:08:42 and the question "Batch 31?" at 23:11:17, each answered in its own turn.
- The first record of each of the 24 transcripts is the harness's '[Workflow harness — computed task]' message, the brief. No transcript holds the words 'user request]' or 'relays, verbatim', which marked the relayed message in climb batch 32.
- Each agent received two text messages as the user: its brief, and the skill's text after its own load of the skill. Beside them the harness attached its standing material (the environment, the project's instructions, the list of skills, the date, the attribution reminder, the connectors' instructions, empty task reminders), the file `Library/FlatString.fss` named above, and to two skeptics the notice that a background command of their own had ended. The shared task list was empty for every agent.
- So process finding 1 of climb batch 32's review held: the launch from a turn that no message of his started kept every brief clean.

**The coordinating session's commits during the run.**
- It committed twice in the main tree between the launch and the gather: the boot note at 00:05:31 (`0f3b702fb5`) and the boot note at 02:23:15 (`56155df35f`), each pushed.
- The gather's first record is at 02:43:15, and its first commit, M's, at 02:48:40. From `56155df35f` to the commit stage's `7858d0e97b` (04:26:55) `main` holds only the batch's fourteen commits. The commit stage pushed the three refs before its last record at 04:28:17. The coordinating session's next commit is `4e0a37dbf8` at 04:30:42, after the push.
- So no commit of the coordinating session fell between the gather's start and the batch's push, and the rule of `references/batch.md`, "While it runs", held.

## Part 1. Conformance

No departure from a decision of the curator's landed. Four findings need his word. Findings 3 and 4 are the two forks of rung O that had no default on record before the night of the go; they go to him before run 2.

### Findings that would change a decision of the curator's

**Finding 1. After the merge of P-178, every built-in integer type has the shape that still fails verification on the compiled path, and no rung is placed for it.**
- What is so:
  - Measured by the gather on the merged tree: a self-typed trait's default body `mx(self, other: T): T = if lt(other, self) then self else other end`, with an object that extends the trait directly, compiles and dies when it runs, 'VerifyError: Bad return type' (row 1051; `compile-ladder/climb-batch-31/RECORD.md:53`). Rung K casts a returned `self`, and no arm of a conditional.
  - By reading, not by a run: the one library's `StandardTotalOrder` writes `MIN` and `MAX` in that shape (`Library/FortressLibrary.fss:291-292`). Today `ZZ32`, `ZZ64`, `ZZ` and `NN64` are traits with one object below each, so the trait's instance stands at a trait type, which the verifier does not check. `NN32` is an object already (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:427`). After rung O each of the four is a `value object` that extends `Integral[\T\]`, and so `StandardTotalOrder[\T\]`, directly (`FortressLibrary.fss:776`, `:878`, `:987`, `:1089`, `:682`). So the shape that one integer type has today, all five have after the merge. Each integer type declares its own `MIN` and `MAX` (P-47), so no call reaches the trait's two bodies; the class that holds them is still loaded for the trait's other bodies, and the JVM verifies a class whole. Whether that class fails for a number type is not measured: it shows only when a program compiles against the one library. `RR64` and `RR32` extend `StandardMinMax`, whose bodies have no such arm (`FortressLibrary.fss:271-273`).
  - Two kin stand beside it: a closure that returns `self` so (row 1050), and a default body that calls a method on a value of the self parameter, which dies with `ClassCircularityError` where the object lists the trait first (row 1052).
- What it changes: the order of the work before the switch-over. The merged-diff review and its judge ask for the rung before the switch-over, and the judge wrote "Nothing on record places that rung; the placing is his" (judge-review.1). The record's list for the batch after (`CLIMB-BATCH-31.md:534-543`) does not hold it. P-178 itself stands.
- Options:
  - **1a. First in the batch after, as one rung.** The casts of a self-typed trait at an object instance: rows 1051, 1050 and 1052, with the test that review-routed.1 owes. It stands beside the probe of the prelude's half of the merge, which is first in that list today. Nothing changes in run 2.
  - **1b. A fourth rung of run 2.** It edits `CodeGen.forIf` (`:4380`), `forFnExpr` and `forLetFn`, and `runtimeSystem/MethodInstantiater.java`. Rung T edits `CodeGen.java` in run 2, and rung E may. About 0.85M more by this run's figure for a rung, and one more rung in a shared file.
  - **1c. Parked, as today.** The wall is met again when a program first compiles against the one library.
- How they weigh: 1a costs nothing now and puts a wall that the merge widens to the five integer types where the merge's other half is planned. 1b closes it one run earlier at the price of the merge's risk in run 2. 1c leaves a known wall to be found again by a rehearsal.
- Recommended: 1a.

**Finding 2. On `label` and `exit` the compiled path now answers three questions that the record does not settle, and walk answers each differently.**
- What landed: section 2, L1 and the exit that passes a `try`. Fork L1 was put to him as the join of a parallel loop's tasks. Its second half, that each evaluation of a label block has its own identity, landed with it, on a reason that names walk, which does otherwise.
- What it changes: no entry of POSITIONS speaks of `exit`. The three answers are his: which evaluation an exit leaves (row 1042), whether a `catch` clause takes an exit (rows 1040 and 890), and what an exit is after its label block has completed (row 1041).
- Options:
  - **2a. The specification's reading on all three, and walk is the path to repair.** An exit leaves the evaluation in whose scope it is written, as landed (`label.tex:39-49`); row 1042 becomes walk's gap. An exit is no exception: no `catch` clause takes it, as landed, and `finally` clauses run on its way (`label.tex:72-78`); rows 1040 and 890 stay as one gap of each path. An exit that runs after its block has completed raises the library's `LabelException`, whose text names that case; walk does so already, and the compiled path throws it in place of ending the program. Touches no landed line but that one throw; three repairs are owed, two in walk and one in the compiled `try`.
  - **2b. Walk's reading on the first two.** An exit leaves the innermost running evaluation of its label's name, and a `catch` clause of `Exception` takes a passing exit. One rung in `CodeGen.forLabel` and `LabelExit.java`; the tests `LabelEvaluationIdentityCompiled` and `LabelExitCompiled`'s `throughTry` change their asserted values.
- How they weigh: 2a follows the text's static scope and keeps what landed. 2b follows the team's interpreter and gives up the scope that the text states; under it a function that holds an exit can leave a block other than the one that it was written in.
- Recommended: 2a.

**Finding 3. Fork O3 of run 2: what `round` of an `RR64` answers after the merge (review-queue item 518).**
- What is so: the one library declares `round` twice for an `RR64` value. `trait RR64` declares `round(self): ZZ` (`Library/FortressLibrary.fss:480`), which never runs. Its object `Float` declares `round(self): ZZ64`, which runs. The merge makes the two one declaration. P-68 gives `round`, `truncate` and the brackets the type `ZZ`, in one library rung after the switch-over, which first counts the tests whose output changes.
- Options:
  - **3a. `ZZ64`, the body that runs today.** Nothing that a program sees changes. The declaration that has P-68's type, and never ran, goes. P-68's clause on the two declarations is reworded: one declaration, `ZZ64`. P-68's rung after the switch-over still makes it `ZZ`, with `truncate` and the brackets.
  - **3b. `ZZ`, as the trait declares and as P-68 gives.** `round` changes its type under walk now, before `truncate` and the brackets, and without the count of tests that P-68 asks for first. It needs a helper that answers a big integer.
- How they weigh: 3a keeps P-68's one rung whole and changes no answer. 3b does a third of that rung early and leaves `round` and `truncate` at different types until the rest follows.
- Recommended: 3a, the record's default.

**Finding 4. Fork O4 of run 2: a `typecase` arm at a removed name (review-queue item 519).**
- What is so: after the merge `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` name no declared type. On both paths an arm at a name that no declaration defines takes every value, with no message (row 959). So `typecase x of Int => ...`, which takes the arm for a `ZZ32` today, takes it for every value after the merge. No file of the model or of its helpers names one of the five. One test of the tree does, `ProjectFortress/tests/NumberPrintTest.fss:31` and `:35`, and rung O changes it.
- Options:
  - **4a. The merge does not wait for row 959.** Rung O lands as planned. Row 959's repair, by which such an arm is refused, stays second in the list for the batch after. Until then a program that still writes one of the five names in an arm gets a wrong answer with no message.
  - **4b. Row 959 first.** One more rung, in the parser's and the checker's files and in walk, before rung O or beside it in run 2. Then a removed name in an arm is a static error from the day of the merge.
- How they weigh: 4a adds five names to a defect that every undefined name has today, for the time of one batch. 4b closes that window and makes run 2 four rungs, one of them in the checker's files beside rung E.
- Recommended: 4a, the record's default, with row 959's rung kept in the batch after.

### Findings for the record, with no decision of his changed

- **Five sentences of the plan are not what landed.**
  - Rung L's example for him, "After: it compiles, and `find(3)` is 3" (`CLIMB-BATCH-31.md:371`): the program as printed, with `-1` as the block's last expression, does not compile after the rung (`compiler_tests/XXXLabelNumeralValueCompiled`; L.worker.3). With `none: ZZ32 = -1` bound first it compiles and runs.
  - "This refusal is the one change of run 1 that stops a program that runs today" (`:404`): two more kinds of pair are refused by rung V, each by the rule, and rung M turned one load failure into a wrong answer (row 1038).
  - Fork K1's consequence, fork X1's width and fork L1's reason (section 2).
- **P-50 covers the spelling that rung L left unbuilt, and the rung's briefing did not hold it.** By P-50 and P-173 the numeral that ends a label block at a declared number type takes that type in place. The row files the case under the code generator's crash (row 340's notes). The same family has three more members: a numeral at the end of a block (rows 1014 and 1030, rung E of run 2) and as the value of an atomic expression (row 1043). Part 5 gives them to rung E as kin.
- **A reserved point was reported as not reached when it was** (rung K: a cast at a place that verifies today). The skeptic's one program for each reserved point, which this batch's first reading asked for, found it.
- **Two cases landed inside expected-failure programs that stop before they reach them:** the `finally` clause on an exit's way (`compiler_tests/XXXFinallyOnEscape.fss:29`) and a label block as a call's later argument (`compiler_tests/XXXAtomicBlockLaterArgument.fss:20`). Each shows only when the program's earlier defect is repaired.
- **Three combinations of two rungs have no test,** by the merged-diff review's reading (review.2): an exit whose value is `self` at a listed type, `atomic self` returned at a listed type, and rung X's cast in the dispatch method of a generic trait.
- **Row 542 is closed while its second pair as written stays refused,** by P-45's positional rule (X.worker.1 holds the question).
- **The one library declares a `value` object with a `var` value parameter,** `Lazy` (`Library/Lazy.fss:18`), the form that rung A's cell changes (row 112).
- **Rung A ran `ant testQuick` where its section says "the whole compiled suite";** it gave its reason, and the gate ran `testFast`.
- **The repair's commit `995993ceab` touches the test folder of the original tree and carries no `historical:` line;** the commit stage said so and did not rewrite another agent's commit.

### Corrections owed in the record

- **FACTS, false and not reworded by the gather:**
  - F-34 (`FACTS.md:38`): "refuses 24 declarations ... `label` 4 (row 81) ... `atomic` as an expression 1 (row 875)". Both rows are closed, and the figure is not measured again (section 3). Its sentence on the classes that fail when they load names rows 990, 991 and 732, which are closed.
  - F-352 (`FACTS.md:170`): "Not run: ... the library's `DOT` and `SUM` (row 732)" and "A test compiled against the prelude can show the first kind: ... `label` (row 81) ... a method written twice (row 990), a missing cast at a `comprises` type (row 991), and rows 992 and 732". Four of the rows are closed.
  - F-354 (`FACTS.md:199`): "a result that depends on the order can come and go between builds, as the choice between two copies of one method does (row 990)". The choice is made by a rule now (F-372).
  - F-361 (`FACTS.md:291`): its three gaps, rows 998, 997 and 542, are closed.
  - F-174 (`FACTS.md:306`): "In row 542, the checker refuses a generic declaration beside a plain one over an object type". It accepts the pair.
  - F-87 (`FACTS.md:91`): "`InferResultOnlyLabelBody`, a type-check test, since the code generator has no `label`". It has one.
  - F-240: "about 75 s" for the count stage against about 95 s, with no word that the rung's four whole-stage timings of that night were 88.5 s to 93.6 s. Its detail list has no review of this batch.
  - 15 line citations in 11 other entries moved (`moved31.py`): `CodeGen.java` in F-302, F-351, F-268, F-315 and F-369 by 107 to 133; `OverloadedFunction.java` in F-258, F-349, F-366 and F-367 by 97; `OverloadingOracle.scala` in F-258 by 40; `inference.tex` in F-173 by 1; `changes.tex` in F-175 by 10.
- **POSITIONS:** no sentence is made false by run 1, and no citation moved. P-68's clause on the two declarations of `round` becomes false with rung O, at finding 3's answer.
- **PLAN:**
  - "Where we stand", "Next" (`PLAN.md:13`): climb batch 31 "keeps five rungs" and "is planned with no go", and the merge is one "which no batch holds yet".
  - Phase 4's line of the batch (`PLAN.md:53`): "planned in two runs with no go"; rung L with "a name of its own for each closure class (rows 81, 315)"; no word of V, X, O and E.
  - F-34's line (`PLAN.md:66`): 24 declarations with rows 81 and 875 open, and "rungs L and A take off 7".
  - The rehearsal's line (`PLAN.md:68`): rows 990 and 991 among the walls "which climb batch 31 takes".
- **The review queue:** items 517 and 520 say "Landed: Nothing; rows 997 and 998 are open" and "Nothing; row 542 is open" (`review-queue.md:995-996`, `:974-975`). Rungs V and X landed them at the defaults of forks O2 and O5.
- **The ledger:** row 112 can name `Lazy`. Row 340's label case can name P-50 and its kin (rows 1014, 1030 and 1043).

## Part 2. Did the practice hold

### The practice's measures, batches 26 to 31

(B26; B27; B28; B29; B29b; B30; B32; B31 run 1.)
- Written: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M; 2.92M; 5.00M; 5.08M.
- Launches lost to restarts or the disk: 0; 8 and a gate, 0.42M; 0; 0; 0; 0; 2, 0.59M written by them; 2, 0.24M written by them.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M; 0.97M; 0.71M; 0.85M.
- First calls: 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold; 1.12M, 10 cold; 0.63M, 8 cold; 0.65M, 7 cold; 0.93M, 7 cold; 1.22M, 12 cold.
- Cache refills: 1, 94K; 0; 1, 204K; 0; 0; 0; 0; 1, 159K.
- Refusal cycles: 0; 3 rungs, 231K; 1 rung, 164K; 2 rungs, 314K; 0; 0; 0; 0.
- Rulings and repairs on the merged tree: 0; 368K; 0; 415K; 0; 0; 0; 660K, and a second gate of 114K.
- Skeptic fix commits (defects): 2 (0); 9 (1); 16 (1); 25 (10); 7 (2); 8 (2); 18 (5); 10 (1, K's cast at a `typecase`).
- Distance: 0 every time.
- Count stage at the gate: 180 s; 80 s; 99 s; 125 s; 104 s; about 70 s; about 95 s; about 75 s by the log's file times, 88 s to 94 s by the rung's timings of the whole stage.
- Distance stage at the gate: 246 s; 144 s; 205 s; 224 s; 190 s; 128 s; 165 s; 136 s and 143 s, each beside `testFast`.
- Skill's load: 13.9 %; 16.0 %; 16.5 %; 12.9 %; 10.6 %; 16.0 %; about 18 %; about 20 %, the last two by a rougher count.
- Briefing, estimated: 5.2 %; 6.2 %; 3.1 %; about 3.6 %; 2.7 %; 4.9 %; 5.0 %; 5.0 %.
- microGPT quick pair: 7 of 7 both, each time.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The estimate reserved nothing for a ruling, a repair or a second gate,** and they were the whole excess, 0.77M (section 5). Proposed (mine): the estimate of a run names a reserve of one review ruling with its repair and one gate ruling with its repair and a second gate, about 0.8M, apart from the roles that always run.
2. **The second gate ran every stage again for two files of one test folder** (section 6). Proposed (mine): after a repair that changes only tests, the script runs again the suites that read the changed folders, and takes the first gate's other stages as they stand, as `references/batch.md`, "Reserved points and repairs", gives the rule.
3. **A gated test whose verdict hangs on the checker's tie among generic candidates can turn red by the order in which the suite compiles its files** (rows 499, 1047 and 1046). Rung X found the dependence and still gated a test on it. Proposed (mine): the brief of a rung that edits `scala_src/overloading/` or the call's candidate ranking says that a test of a call which two generic declarations fit at one parameter type asserts only what holds for either choice; and `OverloadReturnObjectDomain.fss:26` is traced before run 2 (judge-gate.3).
4. **The batch's measure had no owner that ran.** The plan gave it to "the coordinator or the post-batch reviewer", and the reviewer reads only. Proposed (mine): the record names one owner and one time, as a step of the commit stage in a scratch worktree, or as the coordinator's first step after the landing, written in the boot note.
5. **A fork's reason named walk's code, and walk does otherwise** (L1). Proposed (mine): where a fork gives a path's behaviour as its reason, the planner names the program that shows it, and the record's checker runs it.
6. **The skill's text makes the harness attach `Library/FlatString.fss` to every agent that loads it** (section 5), through the quoted first line of a cache entry at `.claude/skills/fortress-repo/SKILL.md:101`. Proposed (mine): the skill writer spells the example without the at sign before the quoted path, or without the path.
7. **The manifest's order was again not the shared file's.** The plan expected M, K, L, A; the lowest edited lines gave M, L, A, K, because K's first edit is one line in a member outside its section's three (`CodeGen.java:2611`). And the rule of the lowest line did not hold the landed lines still: four of K's hunks stand above A's later ones, so the gather re-anchored A's and M's citations twice. Proposed (mine): the planner's check of each shared file gives the order by every member that a rung may edit, and the gather re-anchors once, after the last rung.
8. **The sentence for a second launch names a worker.** Both skeptics applied it to their own role, and both successors said in their reports that two launches worked the rung. Proposed (mine): the sentence names every role.
9. **The specification was built twice on one text,** because the judge told the repair not to keep the PDF. Proposed (mine): the repair's build of a text that no later commit changes is the commit stage's.
10. **Two tool faults that the gate judge names** (judge-gate.4): the gate brief's `atomic_runs` returns 1 whenever the summary holds 'BUILD FAILED'; the harness prints 'Saw failure' where the command did not fail, and no exit code.
11. **Of climb batch 32's findings:** 1 (the launch's turn) and 5 (the demos and the quick pair) held; 2 (a second launch told what it is) worked through the new sentence; 3 (one comment line) fell from six rungs to one; 4 (a program for each reserved point) found K's; 6 (the distance stage beside `testFast`) stands, by the coordinator's choice of its second way; 8 (the estimate) is finding 1 here.

### Misses, by kind

Numbered on from `batch-32-review.md`'s 1159.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before landing:**
  - 1160, rung L's example program, which does not compile in its printed form (rung L);
  - 1161, fork L1's reason, walk's `forLabel` and `forExit` (rung L);
  - 1162, fork K1's consequence at a declared trait type (K's skeptic);
  - 1163, fork X1's words at a tuple of object types, and row 542's second pair (rung X and its skeptic);
  - 1164, `XXXNonValueOfValue` named as the test of the value check (rung V);
  - 1165, the returned value's cast placed in `generateFunctionalBody`, which a trait's default body does not pass (rung K);
  - 1166, the manifest's order of K (the gather);
  - 1167, "the one change of run 1 that stops a program that runs today" (rung V, its skeptic, M's skeptic).
- **A defect of a change, caught before landing:**
  - 1168, the cast missed a `typecase` whose arms are each `self` (K's skeptic);
  - 1169, the wrong answer that rung M's repair of row 571 uncovered, with no home (M's skeptic).
- **A defect of the tree found and filed, not the batch's:** 1170 to 1185, rows 1037 and 1039 to 1053: eleven by the workers, five by the skeptics.
- **A report that said what was not so:**
  - 1186, "Holds for every body the checker accepts" (rung A);
  - 1187, no cast at a place that verifies today (rung K);
  - 1188, three kinds of changed pair where there are four, and the value check's reach (rung V);
  - 1189, the Effect's sentence that the rule counts only the meeting instances at every parameter type (rung X);
  - 1190, the self-return at an object type said to wait for rung K, which does not reach a conditional arm (rung M; the gather);
  - 1191, four wrong citations (the skeptics of L, V, X and K).
- **Sentences made wrong, caught:**
  - 1192, the Effect of `revival-expected-contexts`, which named row 1019 alone (V's skeptic);
  - 1193, rung K's Effect, which named row 1050 and not row 1051 (the review, its judge and its repair).
- **A test that could not hold:** 1194, `XXXOverloadGenericObjectTwoParams` (the gate and its judge).
- **A row with no gated test:** 1195 and 1196, review-routed.1 and .2 (the review).
- **Process:**
  - 1197, a test with five comment lines (M's skeptic);
  - 1198, no suite after K's skeptic's fix of code (the gate covered it);
  - 1199, the two tool faults of process finding 10 (the gate and its judge);
  - 1200, the repair's commit without its `historical:` line (the commit stage).

Found by this review:
- 1201, the measure that no stage took (section 3);
- 1202, the second gate's repeats, and the specification built twice on one text (section 6);
- 1203, the merge brings row 1051's shape to every integer type, and no list says so (finding 1);
- 1204, fork L1's second half put to nobody before the launch (finding 2);
- 1205, the library's `LabelException` and its text, which no review cites for rows 1040 and 1041 (section 2);
- 1206, P-50 not in rung L's briefing, and the label case filed without it (Part 1);
- 1207, rung V's reading first meets pairs over the five number types in rung O, which the merge's probe ran without (Part 5);
- 1208, rows 1043, 1050, 1052 and 1053 with no line of their own in PLAN or the review queue; the run's seventeen forks and fork H2 in no review-queue entry; items 517 and 520 still open there (Part 4);
- 1209, F-34, F-352, F-354, F-361, F-174 and F-87, and four lines of PLAN (Part 1);
- 1210, F-240's fall of the count stage against the rung's timings (section 4);
- 1211, the file that the skill's text attaches to every agent (section 5);
- 1212, `Lazy`, a `value` object with a `var` value parameter in the one library (section 2).

**Against the earlier notes.** 41 misses were found before the launch or inside the batch (1160 to 1200), 16 of them defects of the tree that the batch did not make, against climb batch 32's 27 for seven rungs. No departure from a decision of his landed. One consequential default landed that was put to nobody before the launch, fork L1's second half; it is on his list as L.worker.4 and is finding 2 here.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false, read on `main` at `4e0a37dbf8`; the batch changed no file under `.claude/`. The proposed wording is mine; the writer keeps the skill's form. The six revival changes are in `compile-ladder/climb-batch-31/RECORD.md`, "Revival changes, for the skill writer".

**False:**
1. `references/compiler.md:40`: "`label` and `exit`, `spawn`, and `atomic` used as an expression;". The code generator compiles `label`, `exit` and `atomic e`. `spawn` alone stays in the line.
2. `references/revival-changes.md:41`: "A compiled body of `T` that returns `self` fails the JVM's verification when its class loads (row 695)." It runs. What still fails: a function expression or a local function that returns `self` so (row 1050), a conditional with `self` in one arm (row 1051), and a default body that calls a method on a value of the self parameter where the object lists the trait first (row 1052). The same sentence is the one that judge-review.2 names.
3. `references/gate.md:47`: "The atomic runs compile twenty-two programs", with the list at `:49-54`. The gate's list holds twenty-four since the base, with `AtomicExprCompiled` and `AtomicFieldCompiled`.

**A change of a rule's meaning, for the coordinator to judge before the writer takes it:**
- `references/tests-writing.md:85`, the second way of "How a defect is recorded". The gate judge kept a defect that the specification settles as a ledger row and a probe, with no gated test, because the checker's answer varies with what the JVM compiled before (section 2). The rule has no words for that case. If the coordinator takes it, the second way gains one sentence: where no gated test gives one verdict in every order of the suite, the row names a program under the rung's `probes/` folder, and its notes give the lone command and its output.

**Incomplete, on no list:**
- `references/compiler.md:75` and `SKILL.md:124`: a `var` field of an object, a `var` value parameter among them, is now such a variable, in a cell that the object holds; every access of one first asks `inATransaction` (row 641); a loop body or a function expression in the object's method works on the field, not on a copy.
- `references/compiler.md:106`: a `finally` clause does not run when an `exit` leaves the `try` (row 890).
- `references/compiler.md:108`: a `label` block and an atomic expression fail in the same way as a call's later argument (row 322).
- `references/compiler.md`, the traps of the compiled path:
  - bind a number that a label block yields beside an exit's value to a typed variable first (row 340);
  - an exit out of an `atomic` block loses the block's writes on both paths (row 1039);
  - an exit that runs after its label block has completed ends a compiled program (row 1041);
  - write `atomic do ... end` where the body's value is a numeral at a declared type (row 1043);
  - an assignment from outside an object to its `var` field, of a value of a strict subtype, dies at run time (row 1053);
  - an object's own functional method with `self` not first beside an inherited one answers wrongly with no error (rows 1038 and 573);
  - a `value` object with a `var` field is not strictly equivalent to its like (row 112);
  - the checker's choice among generic declarations that fit a call at one parameter type varies with what the JVM compiled before, so no test hangs on it (rows 499, 1046 and 1047).
- `references/interpreter.md:18`: row 1019's sentence gains the declared return type and the field of an object (row 1036).
- `references/interpreter.md:63-77`, "What walk checks": a generic declaration beside a plain one over an object type is read by the Return Type Rule on the declared domains; the pair is not judged where the plain declaration writes no return type (row 1044); the valid pair at a trait that comprises one object is refused (row 550); an invalid pair over an arrow type loads (row 1049); the check of value types passes a type parameter.
- `references/revival-changes.md`, "Dispatch and overloading": on the compiled path the Return Type Rule sets aside the instances that cannot meet an object type, and still compares them at a tuple of object types (F-75; row 1048).
- `references/revival-changes.md`, "Traits and objects": a compiled trait may declare again a method that it inherits through a trait that is not its first, and an api's trait need not be first in an `extends` clause (F-372); the diamond through a redeclaring trait is not settled (row 1037).
- `SKILL.md:101`: the quoted first line of a cache entry (process finding 6).

**Sentences that hold, met by the batch:** `references/tests-writing.md:77`, "An `XXX` compile test with a `compile_err_contains` key, whose program compiles, reports 'Saw wrong failure', which is red", which is what the first gate showed; `references/revival-changes.md:17`, "Walk's load check is not the verdict of these rules"; `references/revival-changes.md:85`, the sentence of row 307, which rung K left as it is.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home.

**Items for him: each has a home.** The 36 entries of the rungs, the gather, the review, the two judges and the two routed steps are 22 lines of `PLAN.md:826-847`, "Climb batch 31, listed for his review", and one item under his answers, M.skeptic.1 (`PLAN.md:143`, item 96). A worker's and its skeptic's entry on one question share a line.

**Open rows.**
- With a line of that group or of item 96: 1037, 1038, 1039, 1040, 1041, 1042, 1044, 1045, 1046, 1047, 1048, 1049 and 1051, and the rewritten rows 573, 340, 550 and 1036 by their items.
- **Four have no line of their own in `PLAN.md` or `review-queue.md`:** 1043, 1050, 1052 and 1053. Owed, as parked lines or with a batch (the homes are mine):
  - row 1043, a numeral as the value of an atomic expression: rung E of run 2, as kin by a run (Part 5);
  - rows 1050 and 1052, the closure and the call on a value of the self parameter: finding 1's rung, with row 1051;
  - row 1053, an assignment from outside to a `var` field of a value of a strict subtype: the code generator's next rung on a field, in the batch after.
- Rows 322, 890, 641, 112 and 115, rewritten or noted: each keeps its earlier lines, and needs none beyond its row.

**Record defaults: none of this run's forks is in the review queue.** The plan gives the 27 forks to the queue as new items after the landing (`CLIMB-BATCH-31.md:953`). Owed for run 1, each as an entry with its default as landed: B1, B2, B3, H1, S (with item 522), M1 (with M.worker.1), M2, K1 (with K.skeptic.1), L1 (with L.worker.4 and finding 2), L2 (with L.worker.1), A1, V1, V2, V3 (with V.worker.3), V4 (with X.skeptic.2) and X1 (with X.worker.2); O2 and O5 as the answers of items 517 and 520, which still read "Landed: Nothing"; and **a new item for fork H2,** the one consequential fork of the record, which no item holds yet.

**The coordinator's decisions between the go and the launch.** For each: whether a list holds it, and what landed.
1. **Fork V4, the second way of the check's point B1.** No line of the group names V4. Landed: kept. `OverloadedFunction.java:882-904` reads no `comprises` clause, and `tests/XXXGenericBesidePlainReturnParam.fss` is unchanged.
2. **The guard of the check's point B2,** a plain declaration with no written return type beside a generic one. The group holds its consequence, V.worker.1 (row 1044), and not the decision. Landed: `tests/GenericBesidePlainObjectNoReturnTypeWalk.fss` passes, and the invalid form of such a pair loads.
3. **The check's point B3,** forks O3 and O4 put to him before run 2 if he is back. Findings 3 and 4.
4. **One run on the night, not two.** At 23:09 UTC the coordinator wrote to him that it would keep the night under about 7M for the weekly limit and launch one run. The record says "Run 2 starts when run 1 has landed". No list holds the change; the boot note holds the state.

**The lines that the lists lack, for a record writer to file:**
- "Fork V4 of climb batch 31's record, the coordinator's decision after the check of the record, told: walk's load check reads no `comprises` clause, so the valid pair at `ZZ64` (row 550) stayed an expected failure in run 1; rung O of run 2 makes `ZZ64` an object and promotes the test. The other way read a `comprises` clause that lists one object as that object (P-60). As landed: kept. Evidence: `reviews/batch-31-review.md`, Part 4; `coordinator/climb-batch-31-review.md`, B1."
- "Row 1043 of climb batch 31's rung A, told: the checker carries no declared type into the body of an atomic expression, so a numeral there is refused or fails verification; `atomic do ... end` runs. Default: tried by rung E of run 2 as kin, by a run. Evidence: `compiler_tests/XXXAtomicExprNumeralArms.test`, `XXXAtomicExprNumeralBody.test`."
- "Rows 1050 and 1052 of climb batch 31's rung K, told: a closure that returns `self` at a listed type or as the self parameter fails verification, and a default body that calls a method on a value of the self parameter dies with `ClassCircularityError` where the object lists the trait first. Default: one rung with row 1051, first in the batch after (`reviews/batch-31-review.md`, finding 1)."
- "Row 1053 of climb batch 31's rung K, told: an assignment from outside an object to its `var` field, of a value of a strict subtype, dies with `NoSuchMethodError`; the checker accepts it and walk runs it. Default: no rung planned; a program binds the value at the field's type first."
- "Fork H2 of climb batch 31's record, consequential, a decision not taken: in which way the compiler's prelude takes the form of P-178. Way (a): the code generator writes for the number objects the classes that it writes for a trait today; small, and it goes with the prelude. Way (b): a value object holds a JVM `int`, `long` or `double`; the switch-over needs it in any case; about three rungs. Default: a probe of way (a), then one rung, with the prelude's `NN32` and `RR32`. Evidence: `coordinator/CLIMB-BATCH-31.md`, section 2, 'The merge'; `compile-ladder/plan-31/PROBES.md`, section 8."

**The steps that the merged-diff review routed.** review-routed.1, the test of row 1051 at a self-type parameter, for "the next rung that touches `CodeGen.forIf` or `castToTypeBelow`": no rung of run 2 is given either member, so its home is finding 1's rung. review-routed.2, the walk test of row 1049, for "the next rung that touches walk's load check": rung O's section puts that check on its "Not" list, so its home is the batch after, or run 2's gather as one expected-failure walk test with no code.

**PLAN lines that the batch built or made stale, FACTS and the review queue:** Part 1, "Corrections owed in the record". **The skill:** Part 3. **The manual and the script:** process findings 1 to 10.

## Part 5. What changes run 2's sections

Run 2 holds T, O and E, and launches on this landed tree. The record says that its sections are read again first (`CLIMB-BATCH-31.md:925`). For its planner:

**Line numbers that moved** (the record's lines are of `c0c35b4f9e`, whose code is the base's).
- **T.** `Specification/appendices/changes.tex:3323`, which names row 832, is `:3333`. `forVarDeclPrePass`, on its "Not" list at `:6481`, is `CodeGen.java:6614`. Its members by name: `generateForwardingFor` `:793`, `forMethodInvocation` `:7071`, `receiverPrependedDomainType` `:7211`. `compiler/NamingCzar.java` is unchanged.
- **O.** `changes.tex:4812-4815` is `:4826-4829`, and `:4847` is `:4861`. Every other file that its section names is unchanged by run 1: `LanguageTypes.java`, `interpreter/glue/`, `BuildEnvironments.java`, `BuildNativeEnvironment.java`, `BuiltinPrimitiveRewriter.java`, `Library/`, `ProjectFortress/LibraryBuiltin/` and its three named tests.
- **E.** `changes.tex:5421-5427` is `:5435-5441`. `scala_src/typechecker/` is unchanged. The members of `CodeGen.java` that write a reference to a function as a value are `forFnRef` `:4101` and `forFunctionalRef` `:4182`.
- The briefing keys cite code by member; each is checked again with `facts-extract.sh --check`.

**Files that its rungs share with what landed.**
- **`compiler/codegen/CodeGen.java`: T edits it, E may, and M, L, A and K landed there.**
  - T builds on rung M's forwarders, as planned. Two members are new to its section: `STypesUtil.allMethodsNotReplaced` now decides which declarations get a forwarder (`CodeGen.java:980`), and `hasBodyInItsTrait` (`:1051`) which of them count as bodies. M's one line inside `generateForwardingFor` is `:873`.
  - K's `castToTypeBelow` (`:7436-7459`) acts at a single argument (`:7417`). T's bridge method joins a tuple's elements to one value; whether a `self` among them needs K's cast is T's to try.
  - K's cast at a returned value (`:3126`, through `declaredResult`, `:7424`) is the code that the record expected E to meet. E's repair keeps it.
- **`Specification/appendices/changes.tex`:** T, O and E each edit it; V, X and K landed there.
- **`interpreter/evaluator/values/OverloadedFunction.java` and `types/FTraitOrObject.java`:** on O's "Not" list. The landed check is `OverloadedFunction.java:513-527` and `:792-904`; the value check is `FTraitOrObject.java:102-103`.
- **`scala_src/useful/STypesUtil.scala`:** rung M added 76 lines; no rung of run 2 is given the file.

**Whether rung O still finds what it needs from V and X: yes, with two points to add to its section.**
- From V: the check of value types passes a type parameter (row 997, the probe's obstacle 5), and the load check refuses the invalid generic-beside-plain pair at an object type (row 998, obstacle 6). The valid pair is taken where the plain result is the object type at a parameter of the returned type parameter (`OverloadedFunction.java:895-901`), which is what `tests/XXXGenericBesidePlainReturnParam.fss` needs once `ZZ64` is an object. O promotes that test, as its step 5 says.
- From X: the checker accepts such a pair over an object type (F-75), so the count and the distance stages of O's step 7 should bring no refusal to pairs over the five types.
- **To add, 1.** V's reading acts only where a parameter type is an object type. The merge makes five more types objects, so each generic-beside-plain pair over them, in the one library and in the tests, is read on its declared domains for the first time in rung O. The probe of the merge ran without this reading (F-361). O's `ant testSystem` is the first run of the two together. Its points to report should name each pair that walk refuses at load after the merge and loaded before, with the rule that refuses it; a pair of the library among them is a reserved point.
- **To add, 2.** A plain declaration that writes no return type: over a trait type walk refuses such a pair (row 785), over an object type it loads it unjudged (row 1044). After the merge, pairs over the five move from the first to the second. `pick[\T extends Number\](a: T): ZZ32 = 1` beside `pick(a: ZZ64) = 2` is refused today and loads after. It belongs in O's point "What a program sees differently".

**New rows and routed steps that belong in it** (the judgement is mine; the planner weighs each).
- **Rung E, three kin by a run each:** `compiler_tests/XXXAtomicExprNumeralArms` and `XXXAtomicExprNumeralBody` (row 1043), and `XXXLabelNumeralValueCompiled` (row 340's label case). They are of E's family, a numeral at the end of a body at a declared type, and row 1043's cause is in E's files: the checker's join of numerals has no case for an atomic expression (`scala_src/typechecker/impls/Functionals.scala:1304-1356`). P-50 is the decision for the label's case; E's briefing can hold it. E promotes what passes and builds nothing more for them, as for row 1031.
- **Not run 2's:** rows 1038 and 573 (item 96), 1037, 1048, 1053, and the checker's tie (rows 499, 1046 and 1047). Rows 1039 to 1042 wait for finding 2. Rows 1050 to 1052 are finding 1's.
- **review-routed.2:** Part 4.

**The run's frame.**
- The gate's comparands are run 1's, in `compile-ladder/climb-batch-31/gate/`: 63 suites, 3,484 tests, `CompilerJUTest` 1,667, the system shards 867, 24 atomic programs in 72 runs, the count 0 and the distance 0 with `#crash none`.
- The atomic list: rung A's handover offers a third program, `VarFieldCapturedCompiled`.
- The base build: `/home/user/fortress-base35` holds the base's code. Run 2's is made new at the landed head.
- The estimate: the record has 3.0M for run 2, between 2.4M and 3.8M. By this run a rung with its skeptic wrote 0.53M and the fixed roles 0.90M, so three rungs give about 2.5M, and about 3.3M with one ruling, its repair and a second gate. Rung O is planned as the largest of the nine.
- The first reading of every agent: process findings 3 and 8.
- The launch: from a turn that no message of his started, as for run 1.

### The steps due before run 2

1. **His word on findings 3 and 4,** the forks O3 and O4. Each default stands in the record and bends no decision; the check before the launch asked that both go to him if he is back before run 2.
2. **The measure on the landed tree:** `explorations/compile-ladder/plan-31/probes/planner/codegen-measure.sh <scratch-worktree> <out-dir>`, once, in a scratch worktree seeded from a build of the landed head. The record expects 19 to 21. F-34 and `PLAN.md:66` take the figure.
3. **The record-landing workflow for run 1** (`tools/record-landing/README.md`; `args: { batch: '31', base: 'c1ce2a35e1', landing: '7858d0e97b' }`), which the boot note holds for his word. It routes Part 4, corrects F-34, F-352, F-354, F-361, F-174, F-87 and F-240, moves the 15 citations, and runs the orientation and the skill updates with Part 3's list. The record asks that run 2's workers read the updated skill.
4. **The routing that no list holds yet** (Part 4): the lines for rows 1043, 1050, 1052 and 1053, for fork V4 and for fork H2; the review-queue entries of the run's forks; items 517 and 520 answered; PLAN's four lines.
5. **`compiler_tests/OverloadReturnObjectDomain.fss:26` traced** (judge-gate.3): whether the call that two declarations fit at `Box[\Square\]` can change its answer with the suite's order. If it can, its assertion is changed before run 2's gate reads it.
6. **Run 2's sections read again on the landed tree** (Part 5): T's, O's and E's lines; O's two added points; E's three kin and P-50; the comparands; the atomic list; the estimate with its reserve; then the generator's block for `--run 2`, its check by a fresh reader, and a new base build.
7. **The script, between the runs:** process finding 2, the second gate's reach; finding 10, the two tool faults; finding 8, the sentence for a second launch.
8. **His word on findings 1 and 2,** which hold nothing: each landed at its default or changes nothing in the tree. Finding 1 decides what the batch after holds first; finding 2 decides which path is repaired for an `exit`.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I did not take the batch's measure. The plan gives it to the post-batch reviewer as one way; this review reads only.
- I read the run's transcripts through scripts and the journal's results. For the two spans before the run I read only the transcripts' labels, times, models and writes. I read the coordinating session's transcript for its own writes by time, and for the turns of the go, the launch and the resume.
- A workflow's journal holds no times. The run's times are the agents' first and last records and the files' times.
- These are by reading, not run:
  - that the class of `StandardTotalOrder`'s default bodies at a number type fails verification after the merge (finding 1): the gather's measured program has the shape, and the library's lines have it;
  - that rung X's rule brings no refusal to the one library after the merge, and that rung V's reading refuses no pair of it (Part 5);
  - which of the library's `label` declarations would still be refused (section 3);
  - which rows fit run 2 (Part 5).
- I did not check each of the rungs' reported runs against their logs; the skeptics and the merged-diff review did, and I cite them. I read the six diffs of the source whole, and of the tests only the programs that the decisions name.
- I did not run `record.py check` or `ledger.py landing-check` again; the gather's, the review's and the commit stage's runs are cited.
- The skill's load is a rough count, not `skill-load.py`'s.

## For the curator

Run 1 of climb batch 31 ran from 00:05 UTC to 04:27 UTC on 17 November. In your time that is 01:05 to 05:27. It is pushed. All six tasks landed. No line of the model program changed. Run 2 is not launched.

The words that this section uses:
- **Walk** is the interpreter. The **compiled path** checks a program with the **checker** and then writes JVM bytecode with the **code generator**.
- The **prelude** is the small library that the compiled path uses today. The **one library** is the library of the interpreter.
- A **row** is one known defect in the ledger. An **expected-failure test** is a test that is known to fail and is marked so.
- The **gate** is the full check before a run lands.
- A **generic** declaration has a type parameter. A **plain** declaration has none.
- A **task** is one change of the batch. The record names it a rung. A **worker** is an agent that does one task. A **skeptic** is a second agent that examines the work of the worker. A **judge** is an agent that rules when a check fails.
- A **briefing** is the list of decisions, rows and code that an agent reads before its work.
- A **fork** is a design question with more than one way.
- A **cast** tells the JVM the more exact type of a value.
- The **merge** is your decision P-178. Each of the five number types `ZZ32`, `ZZ64`, `ZZ`, `NN64` and `RR64` becomes one value object. The **switch-over** is the move of the compiled path onto the one library.

**What each task changed.** Each program is shortened from the test that landed.

- **M. A class takes each method one time.** The code generator changed.

      trait Mmx[\T extends Mmx[\T\]\]
          mx(self, other: T): T = do (a, r) = mnmx(self, other); r end
      end
      trait Tord[\T extends Tord[\T\]\] extends { Pord[\T\], Mmx[\T\] }
          mx(self, other: T): T = if lt(other, self) then self else other end
      end

  - Before: the program compiled, and the JVM refused the class of `Tord`: 'Duplicate method name'. The one library has this form in 27 classes.
  - Now: the program runs. A call of `mx` runs the body that `Tord` declares.
  - Also now: an object can take a method body from a trait of an imported interface file when that trait is not the first in its `extends` list.

        object Rng extends { Other, Ix[\ZZ32\], Tagged }
            one(): ZZ32 = 7
        end

    `Rng.twice()` ended with 'AbstractMethodError' before. It gives 7 now.

- **K. A value of a trait can stand for the one type that the trait lists.** The code generator changed.

      trait Q comprises { R }
          getter fin(): Boolean = (den(self) > 0)
          listed(): R = self
      end
      value object R(n: ZZ32, d: ZZ32) extends Q end
      den(r: R): ZZ32 = r.d

  - Before: the program compiled, and the JVM refused the class when the program ran: 'VerifyError'.
  - Now: the program runs. The rational numbers of the one library have this form on 23 lines.

- **L. `label` and `exit` compile.** The code generator changed.

      outOfFor(n: ZZ32, r: ZZ32): ZZ32 = label found
          none: ZZ32 = -1
          for i <- 0#n do
            if i MOD 7 = r then exit found with i end
          end
          none
        end found

  - Before: the compile stopped: 'Can't compile Label'.
  - Now: the program compiles and runs, at one thread and at four threads. An `exit` out of a parallel loop first waits for the tasks that the loop started.
  - One form does not compile yet. The plan showed you a program that ends the block with `-1`. That program still stops the compiler. Bind the number to a typed variable first, as `none` above.

- **A. `atomic` before an expression compiles, and a transaction sees a `var` field.** The code generator changed.

      object OneShot(var canTryIt: Boolean)
          tryOnce(): Boolean =
              atomic if canTryIt then canTryIt := false; true else false end
      end
      object Ctr(var n: ZZ32)
          getter count(): ZZ32 = n
          bump(): () = atomic do n := n + 1 end
      end

  - Before: the compile of `OneShot` stopped: 'Can't compile AtomicExpr'. And 40,000 calls of `bump` at four threads gave 34,631 in one run.
  - Now: `OneShot` compiles, and one caller wins. The count of `Ctr` is 40,000.

- **V. Walk refuses one kind of pair that is not valid, and runs one generic method that it stopped.** The interpreter changed.

      pickFirst[\T extends Number\](a: T, b: T): T = a
      pickFirst(a: NN32, b: NN32): String = "plain"

  - Before: walk loaded this pair and printed `plain`.
  - Now: walk refuses the pair when the program loads: 'fails the Return Type Rule'. The second declaration is more specific, and its result is not an `NN32`. With the result `NN32`, the pair loads.

        trait Holds[\S extends Number\]
            held[\T extends S\](): Empty[\T\] = Empty[\T\]()
        end
        object Holder[\S extends Number\]() extends Holds[\S\] end

  - Before: `Holder[\RR32\]().held()` stopped walk: 'non-value subtype of value type RR32'. Now it runs.

- **X. The checker accepts a generic declaration and a plain declaration over an object.** The checker changed.

      object Circle extends Shape end
      ident[\T\](x: T): T = do println("ident generic"); x end
      ident(x: Circle): Circle = do println("ident Circle"); x end

  - Before: the compile stopped: 'the return type of Circle->Circle ...'.
  - Now: the program compiles. `ident(Circle)` runs the second declaration. `ident(Square)` runs the first declaration.

All tests passed at the second gate: 3,484 tests, and no failure. The two measures of the checker on the one library stay at 0. The quick microGPT check passed 7 of 7 for both programs.

**The decisions that the night took in your place.** Each one can be undone.

- **A lower type's method replaces the method that it inherits (fork M1).** The other way kept the first body that the compiler found. That way fails today. No program that ran before changes its answer.
- **A method that an interface file declares without `abstract` has a body (fork M2).** The other way gave it no body, and the call failed as before.
- **The cast is written only for `self` (fork K1).** The other way wrote a cast at each call. One cast is new at a place that ran before. The answer of that program does not change.
- **Each run of a label block has its own identity, and an `exit` leaves the run of the block in which it was written (fork L1).** The plan told you of this fork only that a parallel loop waits for the tasks that it started. The second part was not put to you. Walk does a different thing: an `exit` leaves the innermost block of that name that is in progress. So one program gives 102 compiled and 104 under walk. This is finding 2.
- **A `catch` clause does not take an `exit` in compiled code.** The specification says that an `exit` is not an exception. Walk lets a `catch` of `Exception` take it. This is in finding 2 also.
- **An `exit` out of an `atomic` block was not built (fork L2).** The specification keeps the writes of the block. The interpreter and the compiled code lose them, with no message. Two expected-failure tests record this.
- **A `var` field is kept in a cell (fork A1).** A cell is a small object that holds one value that can change. Each `var` field costs one more object, and one more check at each read and each write. The other way kept the value in the object. The model program has no `var` field.
- **Walk refuses more pairs than the plan told you (fork V2).** The plan named one pair. Two more kinds of pair loaded before and are refused now. The rule of the specification refuses each of them, and the checker refuses them also.
- **The valid pair at `ZZ64` stays refused until run 2 (fork V4).** The coordinator decided this after the check of the plan. Run 2 makes `ZZ64` an object, and then the pair loads.
- **The checker's rule was built for an object only (fork X1).** A pair over a tuple of objects is valid and is still refused. It is row 1048.
- **Rung X added one cast in a file that the plan did not give it.** The pair could not run without it.
- **The gate was red on one test, and a judge took the test out.** The test asserts a crash of the checker. The crash shows or does not show by the order in which the test suite compiles its files. No form of test is stable for it today. The defect stays as a row with its program. The other ways were to repair the cause in the same night, or to give each test its own JVM.
- **The prelude's half of your decision P-178 is in no run (fork H2).** It is not designed. The record recommends a probe of about one hour first.
- **The coordinator launched one run that night, not two,** to stay inside the weekly limit.

One change replaces an error with a wrong answer. An object that declares its own method with `self` in the second place, beside an inherited method, did not load before task M. Now it loads, and one call gives 3 where walk gives 1. It is row 1038, and item 96 of your answers asks if its repair comes before the switch-over.

**What waits for your word before run 2.** Two questions. Each has a default that I recommend.

- **`round` of an `RR64` after the merge.** The one library declares `round` two times. The declaration that runs gives a `ZZ64`. The declaration that never runs gives a `ZZ`, which is the type of your decision P-68. The merge keeps one.
  - Option a: `ZZ64`. Nothing changes for a program. The later task of P-68 changes `round`, `truncate` and the brackets together.
  - Option b: `ZZ` now. `round` changes its type before `truncate` and the brackets change.
  - I recommend option a.
- **A `typecase` arm at a name that the merge removes.** After the merge, `Int`, `Long`, `Float`, `BigNum` and `UnsignedLong` are not types. An arm at a name that is not a type takes each value, with no message. This is an old defect, row 959.
  - Option a: the merge does not wait. The repair of row 959 stays in the batch after.
  - Option b: row 959 is repaired first. Run 2 becomes four tasks.
  - I recommend option a. No file of the model program names one of the five.

**Two more findings need your word. They do not hold run 2.**

- **Finding 1.** After the merge, each integer type is an object that extends the order traits of the library directly. The order traits are the traits that give `<`, `MIN` and `MAX`. A default method of those traits has a form that the compiled code cannot run yet: `if other < self then other else self end` with the type of `self` as the result. No task is planned for it. I recommend that it is the first task of the batch after.
- **Finding 2.** For `exit`, the compiled code and walk give different answers in three cases. I recommend the reading of the specification in the three cases. Then walk is the path to repair in two cases, and the compiled `try` in one case.

**The measure.** The plan counts the declarations of the one library that the code generator refuses. Before: 24. Expected after run 1: 19 to 21. No agent measured it after the landing. It is a step before run 2.

**Three events.**
- **The machine restarted at 02:21 UTC** (03:21 in your time). Two skeptics were lost after two minutes of work. The coordinator resumed the run one minute later. Two new skeptics did the work again. No work was lost. The cost was 0.24 million tokens and about four minutes.
- **No chat message of yours reached an agent.** The coordinator launched the run from a turn that the report of an agent started. In batch 32 a message of yours reached five agents. That did not occur again.
- **The coordinator did not commit while the batch merged its tasks.**

**The cost, in tokens written.**
- The landing work of batch 32: 4.68 million in its span. The landing itself was 3.99 million of that.
- The preparation: 4.24 million in its span. The plan of this batch, its check and its base build were 0.79 million of that.
- The run: 4.95 million in its span, and 5.08 million by its own agents. The plan estimated 4.3 million. Two rulings of judges, two repairs and a second gate wrote 0.77 million, and the estimate had no reserve for them. The run took 4 hours and 23 minutes. The plan estimated 5 hours and a half.

Each of the 16 agents that got a briefing read all of it. Each started to read it in its first 73 seconds.

**For run 2.** Its three tasks stand as planned. Some line numbers moved. Task O gets two more points to report. Task E gets three more tests to try. Its base build must be made new.

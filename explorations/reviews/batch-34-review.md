<!-- The combined post-batch review of climb batch 34, run 1 of `coordinator/CLIMB-BATCH-34.md`: a generic method called on a receiver typed by a type variable, a call with a type assumption at some of its dispatched arguments, a local variable's binding kept in its declaration's body, the compiled checker's Return Type Rule for getters with the one library's widening getters respelled, and walk's native singletons ready without the line that names `FlatString` as a value (five rungs, T, P, L, G and F, landed at `285efad802` on 2026-11-20 on the curator's go of 14:3x UTC, every fork at the planner's default; run `wf_b2847bd4-92c`, every agent on Opus, one ruling on rung P's contested fix, no repair, one green gate, a VM restart at 17:06 UTC and a resume at 17:08; the first batch under the rules that the worker states its expected failure before a test's first run and that the skeptic may trim), by a review worker reading only: the landed changes against P-102, P-148, P-146, P-157 and P-25, what the two paths still do differently, the forks and the run's eight items for the curator, rung P's ruling and review-queue item 375 (PLAN's item 71), the two new rules rung by rung, the measure on the landed tree, the gate, the cost in three spans and by role against the estimate, the restart's cost, the briefing's use, re-measuring, three events, the practice's measures, the misses, the skill writer's list, the record's sentences made false, the routing, run 2's section read against the landed tree, the list for the batch after, and a section for the curator that shows each rung on a small program. -->
<!-- Base `639eef1806f23bc580e9aa7c25f55e852d580644`, base build `/home/user/fortress-base40` at `2676c8009c`; launched 14:48:57 UTC (the coordinator's Workflow call; the disk check's first record 14:48:59); killed by the VM restart of 17:06:26 (`uptime -s`) and resumed at 17:08:15 with the same args; landed on `main` as T `8e4cc0c16d`, P `bd933455e3`, L `42c9f707d2`, G `51d6c49eb8`, F `3e19933c65`, the closes `2e5e54c670`, the gather's record `3ccd236f01`, the review's corrections `66cd4c956d` and the gate's tables `285efad802` (19:13:06), pushed by the commit stage in one atomic push at 19:13:28 with no hold; 18 agent transcripts, 18 starts and 16 results in the journal. Read against `main` at `02557ccdd4`, whose commits after `285efad802` are F-34's measure on the landed tree by the coordinator's worker, `8f7604e42c` (19:28:47), a boot note, and the coordinator's re-read of run 2's section on the landed code with item 601's sites, `835e50a9a5` and `02557ccdd4` (19:45 and 19:46), which this review cites as findings. Sources for the decisions: P-102 with its seven history blocks, P-148, P-146 with its history, P-157 with its two blocks, P-25; the curator's words of 15:49:11 UTC on 2026-11-18 in the coordinating session's transcript. The gate's result is cited as its agent returned it and was not run again. The measures are `batch-measures.py`'s on the run's directory, `spend.py` over the live folders, and scratch scripts in /tmp/claude-0/-home-user-fortress/fe616d40-a9c6-56d7-9da1-7168a172765d/scratchpad/batch34/rev34/ (tx.py, brief.py, brief2.py, calls_mod.py, skill.py, attach.py, usertext.py, taskrem.py, runs3.py and mainw.py, copied from the review of climb batch 33b; expfail.py, parts34.py, onecall.py, upto.py and sums.py, new). Tokens are writes only (input plus cache creation, one count per message id). Besides reading, this review ran only those scripts, facts-extract.sh, grep, sed, git and one `git apply --check`, which write nothing in the tree. It ran no build, suite, stage, JVM or Fortress program. -->

# Climb batch 34, run 1: five of five rungs, a generic method on a type-variable receiver and a partial type assumption compiled, a label body's local scoped to its block, the checker's Return Type Rule for getters, and walk's strings ready without `ignore(FlatString)`; the one library's refused declarations 0 on the landed tree, and `String` compiles whole; the count and the distance still 0 at a green first gate; a run of 4.99M, 6 % under its estimate without the reserve, of which about 0.43M was the VM restart's; no worker stated its expected failure in a message

## What came up in this run

### 1. The landed changes against the decisions, rung by rung and path by path

Lines are `main`'s at `285efad802`. Java and Scala paths are under `ProjectFortress/src/com/sun/fortress/`. The gather applied the rungs in the order T, P, L, G, F, not the manifest's L, P, T, G, F: L's lowest edited line of `CodeGen.java` is `:4812` in `forLocalVarDecl`, not `forLabel`'s `:1942`, and T's skeptic's fix moved T's lowest line to `:3128` (`compile-ladder/climb-batch-34/RECORD.md`, "The rungs applied, in order"). One file is shared, `compiler/codegen/CodeGen.java`, by T, P and L, each in members of its own. Every hunk applied cleanly. The merged-diff review rebuilt `CodeGen.java` from the base by applying the three branch diffs in turn and found it equal to `main`'s byte for byte (its `summary`, item 1).

**T, a generic method called on a receiver typed by a type variable (row 1076 closed; row 1093 opened; notes on rows 1057 and 870). `CodeGen.java` only; fork T1 built as the plan says, with one skeptic's fix in members beyond the section's.**
- The call: where the receiver's static type is a `VarType` and the method has static arguments, `forMethodInvocation` reads the owner among the variable's bounds and casts the receiver to it (`CodeGen.java:7433-7438`). `typeVariableMethodOwner` takes the bounds of the kind environment, opens nested intersections, and hands them to rung I's `intersectionMethodOwner` as one intersection, so the owner is the bound that declares or inherits the method, the most specific where several do (`:7731-7742`, `:7691-7721`). That is fork T1 word for word, and rung I's precedent.
- The skeptic's fix `54c56dc6e9`: a body without static parameters of its own, whose `where` clause bounds its trait's or object's parameter, now gets a nested code generator whose kind environment reads that clause, as `generateGenericMethodBody` does (`whereClauseBodyCodeGen`, `:3241-3245`, called at `:3128` in `generateTraitDefaultMethod` and `:3207` in `generateFunctionalBody`). Without it the head stopped, 'Can't find a trait among the bounds of F that has m', where walk prints 8 (`compile-ladder/rung-type-variable-receiver/SKEPTIC.md:49-53`). Settled, as the fork's "the bounds ... a where clause's among them".
- Decisions: none names the mechanism. The specification gives the call's value (`Specification/basic/expressions/method-invocation.tex`, "Dotted Method Invocations"); walk runs the receiver's own method.
- The measure on T's code: 0 refused, 754 emitted, `__bigOperator2` emitted (worker on `38d8a44e56`, skeptic on `1683793cf8`, the same line; `REPORT.md`, "The measure").

**P, a call with a type assumption at some of its dispatched arguments (row 818 rewritten, still open for the other partial forms; F-325 rewritten). `CodeGen.java` and `OverloadSet.java`; forks P1 and P2 built as the plan says, with one skeptic's fix that a judge upheld and one trim.**
- The call: `assumedArgumentsCall` hands a partial call of an overloaded function of the component to `partiallyAssumedCall` (`CodeGen.java:7300-7303`, `:7326-7366`). `OverloadSet.membersUnderAssumptions` gives the members at or below the resolved one whose parameter takes the assumed type at each assumed place and whose parameter the other argument's static type does not exclude (`OverloadSet.java:2315-2331`). One member: a direct call of its body. Every member at or below the resolved one: the resolved one's dispatch method. Else a dispatch method among the reached members alone, in a class `<component>$asif@<span>`, named as `NamingCzar.gensymArrowClassName` names a function expression's (`CodeGen.java:7353-7364`; `generateDispatchAmong`, `OverloadSet.java:2341-2351`). That is fork P1: the set is the declarations that take the assumed types, and the others' run-time types choose, as walk does (`interpreter/evaluator/Evaluator.java:109-116`). Reading the code: a member that the run can choose lies at or below the resolved one, since the resolved one is applicable at every run; so the restriction to "at or below" loses nothing.
- The skeptic's fix `d2dad41bfb`, contested and upheld: where the reached members are a proper part of the set and one is an object's functional method, the call is refused with the base's message (`CodeGen.java:7351-7352`; `compiler_tests/XXXAsIfPartialWithFunctionalMethodCompiled.test`). On the worker's head it compiled and ran a declaration that the assumption excludes ('Leaf picks Leaf' where walk gives 'Leaf picks Named'). Section 2 has the ruling.
- The trim `6a56a39123`: section 3.
- P2: the other forms stay refused, each with an expected failure: at a functional method (`:7274`), at an assumed receiver and at a dotted call's argument (`:7537`, "the receiver dispatches too"), with the base's message; a generic declaration below the resolved one with a new message, 'Can't compile a type assumption at some arguments but not all of a call that a generic declaration can take yet' (`:7310-7311`). P2's words, "the code generator's refusal, as today", are exact for the first three; the fourth is a refusal with a new text.
- `String` under the selector compiles: its two calls `concatAndBalanceIfNecessary(s1 asif String, s2)` (`Library/String.fss:67`, `:69`) reach one declaration and call its body (`REPORT.md`, "`String` under the selector"; `8f7604e42c` on the landed code).

**L, a local variable's binding kept in its declaration's body (row 1078 closed; a note on row 815). `CodeGen.java`'s `forLocalVarDecl` only; fork L1 at its default, the test against the prelude first; the fallback never ran.**
- The cause: `forLocalVarDecl` added a declaration's bindings to the environment of the code generator that visited it, which `forIf` and the other block forms reuse for an arm, so a binding first in an `if` arm stayed after the arm, and a later local function whose body named a variable of that name captured the arm's slot, unset on the path that skipped the arm: slot 8 of `simplestRationalBetween`, the arm's `r = ceiling(n0/d0)` (`Library/FortressLibrary.fss:603`), read at `@1297` by the closure of the local function `simplest` (`REPORT.md`, "The cause, by the bytecode").
- The repair: the bindings join the nested code generator of the declaration's body only, after the initializer (`CodeGen.java:4822-4828`). The specification scopes a local declaration to the rest of its block (`Specification/basic/declarations.tex:462-465`), and walk and the checker already do so.
- The test, `compiler_tests/BlockBindingScopeCompiled`, fails on the base with 'VerifyError: Bad local variable type' at the class's load, at one thread and four; the skeptic added a nested `do` block's and an initializer block's binding, which failed on the base with `ClassCastException` at run time (`ca10e0129e`).
- In the planner's rehearsal tree with the repair and no stand-in, `Hello` runs against the one library with the verifier on, and ASM's verifier refuses none of `FortressLibrary`'s 4,694 methods, 2 in all, row 1054's in `RangeInternals` ('TOTAL classes 1092 methods 9477 refused 2 templates skipped 1092', `REPORT.md:115`).
- P-102: held. The check before the launch named fork L1's fallback consequential, since it would land a repair with no test that fails first (`coordinator/climb-batch-34-review.md`, C1); the curator answered "I don't care. Test first is not a dogmatic religion, but a pragmatic practice" (P-102's history, block of 2026-11-20 14:38Z). The worker found a test against the prelude in its first 10 minutes, so the question did not arise.

**G, the Return Type Rule for getters, and the library's getters at their inherited types (row 993 closed; rows 1094 to 1097 opened; a note on row 1073; one sentence of Appendix I by the gather). `OverloadingChecker.scala`, five library files, one walk test; forks G1 and G2 built as the plan says, with the reserved point reached.**
- The checker: where both members of a pair at the same parameter types are getters, `checkOverridingReturnType` reads each through `getterArrow`, its receiver the plain type that declares it at the instance that the checked type reaches, and checks the pair by `returnTypeCheck` (`scala_src/typechecker/OverloadingChecker.scala:224-234`, `:725-728`, `:800-803`). A widening getter is refused, 'For zero,\nthe return type of Oz->Number ... should be a subtype of the\n    return type of Tz[\Oz\]->Oz' (`compiler_tests/XXXGetterReturnTypeNotSubtype.test`); a narrowing one below a self-typed trait compiles (`SelfTypedGetterNarrowedReturn`). The skeptic showed that a getter without a declared return type is checked too, since `getterArrow` reads the index's return type (`355edea65c`; `XXXInferredGetterReturnTypeNotSubtype`). G1's rule is the revised overloading chapter's Return Type Rule (`Specification/advanced/overloading.tex:555-559`), with the receiver read by P-146 and P-157: "specificity and the Return Type Rule keep the plain signatures".
- The library's way: `NN32`'s `zero` and `one` at `NN32` (`ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:264-265`), and thirteen more declarations of nine getters at the inherited types, each in a spelling that a sibling already has: `SimpleMappedIndexed`'s `bounds` at `CompactFullRange[\I\]` (`Library/FortressLibrary.fss:4031`), as its siblings at `:4049`, `:4201` and `:4577`; `VoidReduction`'s `reverse` at `CommutativeMonoidReduction[\()\]` (`:3638`), the type of the getter at `:3608`; `ArrayList`'s `extractLeft` and `extractRight` at `List[\E\]` (`Library/List.fss:264-278`), as `List.fsi:79-80` declares; the rank-2 and rank-3 ranges' `indexValuePairs` at `Indexed[\...\]` built by `self.map` (`Library/RangeInternals.fss:1400-1401`, `:1436-1437`, `:1658-1659`, `:1693-1695`; the `.fsi` at `:526`, `:546`, `:601`, `:620`), as the scalar ranges write it at `RangeInternals.fss:1280-1283` and `:1472-1473`. Fork G2 and the library's way hold.
- What is not built: a dotted method redeclared below a self-typed trait at the same parameter types still reads the trait's receiver as `Tn[\On\] & {On}` (`toMethodArrows`, `OverloadingChecker.scala:214`) and is checked both ways, so a narrower return type is refused, on the base and after (row 1094; `XXXSelfTypedMethodNarrowedReturn`). That departs from P-146 ("The method signatures keep the plain trait type. Only the overloading check's exclusion test reads `self` in a signature as `C[\X\] & X`") and P-157, both read with their histories. It is older than the rung; G.worker.1 asks about it (section 2).
- P-148: the worker's pair, 80.4 s on the base at load 0.04 and 91.4 s on the change at load 3.04; the skeptic's pair, 114.9 s and 124.4 s on the machine after the restart; the tables equal (`REPORT.md`, "The two stages' tables"; `SKEPTIC.md`). No slowdown of several times.
- The stages on G's final code `721bd2b25b`: the count 0, the distance 0, 'DISTANCE SAME   0'. Before the two lines' edit, the distance's driver on `FortressBuiltin` gave '#kind return-type 2', and with the checker and `NN32`'s two lines the stage gave '#total 13' at `9580dd7bbb`, from the thirteen getters above.

**F, walk's native singletons ready without the line that names `FlatString` (row 1090 closed for walk; rows 138, 141 and 674 re-cited; F-395). `BuildNativeEnvironment.java` and two lines of `Library/FlatString.fss`; fork F1 built, wider than its step 2 asked.**
- Walk applies each native singleton's constructor in the first pass, as it binds the singleton (`interpreter/evaluator/BuildNativeEnvironment.java:161-163`), so the values' class knows its constructor before any value is made; `Library/FlatString.fss` loses `ignore(FlatString); (* This initializes ... *)` (its lines 29-30 at the base). The precedent is rung O's same line for the one library's native number objects (`interpreter/evaluator/BuildEnvironments.java:531-533`, `f6e24650e7`), which F follows word for word.
- Width: the section's step 2 asked for the siblings "if any of them is needed before its name is read"; the worker applied every native singleton's constructor, `Boolean`, `Char`, `NN32` and `RR32` beside `FlatString`. The skeptic found no output changed and called it "the precedent's form" (`SKEPTIC.md:49`). Not a decision of the curator's: no program sees it.
- Row 1082 and review-queue item 599 stay open, as fork F1 says.

**What the two paths still do differently after this run.** Each is a row or a fact; climb batch 33's two runs' differences stand as their reviews give them.
- The library: walk reads the one library; the compiled path reads the prelude unless `FORTRESS_LIBRARY=one` selects the one library, and a program so compiled does not run (row 1062).
- A call with an assumption at some arguments of a functional method, at an assumed receiver, at a dotted call's argument, at a dispatch that would hold a functional method, or with a generic declaration below the resolved one: compiled, refused; walk runs each (row 818; `REPORT.md`, "The other forms").
- A method call through a type variable whose bound is another type variable, `x.n()` for `x: F` in `chained[\H extends Gen, F extends H\]`: compiled, the checker refuses it, 'No such method F.n.'; walk prints 7 (row 1093).
- An object's dotted method that narrows a self-typed trait's at the same parameter types: compiled, refused (row 1094); walk runs it.
- A getter that widens the getter it keeps from being inherited: compiled, refused since G, by the rule; walk runs it, as it runs any ill-typed program (`SKEPTIC.md:40-54`, the walk column). In an object expression the checker does not check it (row 1097), and the code generator then stops, 'Can't compile ObjectExpr' (row 375).
- Now the same, where the base differed: a generic method on a type-variable receiver (row 1076); the partial call of an overloaded function of the component (P); a closure after an `if` arm that names a variable of the arm's binding (row 1078).

### 2. The decisions that landed at a default

The record's section 3 gives run 1 forks B1 to B3, L1, P1, P2, T1, G1, G2 and F1. The run's result holds eight items for the curator, in seven entries of `PLAN.md:912-918`, "Climb batch 34, listed for his review", and G.worker.2 at `PLAN.md:55`. "Consequential" is the `coordinator` skill's rule (`SKILL.md`, "The curator's role and decisions"). Those that change what a program does or accepts follow.

**Fork P1 and the gather's gather.1: the partial call compiled, and review-queue item 375 (PLAN's item 71).**
- Landed: section 1, P. A call that the base refused compiles and runs walk's declaration, as the specification's "Type Assumption" gives (`type-annotation.tex:45-48`).
- Against the plan: as P1 says, and as the check before the launch restated it from its run of `pair(a asif Named, n)` (`climb-batch-34-review.md`, B2 and B8).
- Not consequential: the specification and walk point the same way, no decision of the curator's bends, and it can be undone.
- **Item 71's question is answered by the landing, in two parts.** It asks "Should the code generator compile a call with an assumption at some of its dispatched arguments as the declaration that the checker resolves (row 818)? Default: refused, fork G2, as landed" (`PLAN.md:142`; review-queue item 375, `review-queue.md:1604-1609`). The curator's go of 14:3x on 2026-11-20 took fork P1 at its default, so the form compiles for an overloaded function of the component; and not "as the declaration that the checker resolves", since that rule calls `pair(x: Named, y: Named)` where a more specific declaration applies at the run (P1's text). What stays open of it is the forms that stay refused. Its text should now say: "71. Should the code generator build the partial forms of row 818 that stay refused: an assumption at some arguments of a functional method, at an assumed receiver, at a dotted call's argument, a partial call whose own dispatch would hold a functional method (P.judge.1 of climb batch 34), and one with a generic declaration below the resolved one? The partial call of an overloaded function of the component compiles since climb batch 34's rung P, by fork P1, a dispatch on the other arguments' run-time types (F-325). Default: refused, each with its expected failure, as landed (fork P2 of climb batch 34). Review-queue item 375." Item 375's "Landed:" line gains `bd933455e3` and fork P1; its "The other way" loses the dispatch "that fixes some positions at their assumed types and tests the others", which is built. Item 72 (queue 376), the generic forms, is the same kind of question and could merge with it.

**P.judge.1: the partial call whose own dispatch would hold a functional method, refused.**
- Landed: `CodeGen.java:7351-7352`, with `XXXAsIfPartialWithFunctionalMethodCompiled`. The judge ruled "stands": the specification, fork P1 and walk all give 'Leaf picks Named'; the worker's head gave 'Leaf picks Leaf' with no message, because the dispatch's arm for a functional method calls the springboard, whose virtual call dispatches again on the argument's run-time type with the assumption gone (`OverloadSet.java`'s `invokeParticularMethod`); fork P2's default gives a form that is not built the base's refusal; the code generator refuses the same cause at a dotted call (`CodeGen.java:7537`); `String`'s calls never reach the check; and a revert would restore a wrong value, not a refusal (`compile-ladder/rung-partial-assumption/JUDGE.md`, "Why refusing is the right repair").
- The judge wrote "a decision taken where nothing on record settles it". By the rule it is not consequential: the specification settles the value, fork P2 settles that a form not built is refused, the library writes no such call, and it can be undone. It is told, as its entry says.

**G.worker.1: the dotted method below a self-typed trait, refused as on the base (row 1094).**
- Landed: nothing new; the refusal is the base's (`OverloadingChecker.scala:214`, `:733-734`).
- Not consequential as a fork, and not his question: P-146 and P-157 already decide that the Return Type Rule reads the plain signature, so the repair follows his decisions, and only its batch is open. The entry's "Default: refused, as landed" leaves a departure from P-146 standing; the departure is older than the batch and holds a row. Its home is the batch after's item 3, the checker's gaps (Part 4).

**G.reserved.1 and fork G2: thirteen more library getters at their inherited types.**
- Landed: section 1, G. Under walk two answers change. A range of rank 2 or 3's `indexValuePairs` now takes a subscript, where the base stopped with 'Cannot find definition for method _[_]' (`tests/RangeBodiesWalk.fss:17-20`). `ArrayList`'s `extractLeft` now makes a `Just[\(E,List[\E\])\]`, so a `typecase` on it at the type that `List.fsi:79` declares now takes it, where it fell through on the base ('extractLeft is another Maybe' before, 'extractLeft is a Just at List' after, `SKEPTIC.md:56`). The other walk answers that the skeptic compared are equal, and the team's `ArrayListQuick` passes.
- Against the plan: the section reserved "A line of the libraries changed beyond the two", and G2 says "repaired in the library's own spelling where its intent is plain". Each repair takes the type that the api or a sibling already declares (section 1).
- Not consequential: the api's own text and the specification's rule point the same way, no line of microGPT names these getters (`grep` of the two programs and their helpers), and it can be undone.

**G.worker.2, G.worker.3 and G.worker.4: the per-provider check's getters (row 1073), `Random`'s and `Sparse`'s widening getters (row 1095), the crashes on three components no stage checks (row 1096).** No program's behaviour changed. Each is left as landed, on components outside the fourteen; G.worker.4 says that the automatic permission check refused the run on the base build, so the crashes are not shown older than the rung. Not consequential.

**gather.2: one sentence of Appendix I that no rung edited.** `Specification/appendices/changes.tex:4452-4455` now names row 1094 as the departure from the self-typed trait's rule, as G's report left to the gather. It states what the code does (`OverloadingChecker.scala:214`, `:733-734`) and changes no program. Not consequential.

**The other forks, by what a program sees.**
- L1: the default, a test against the prelude first; programs whose closures named an arm's variable now verify, and no program that ran gives another answer (`SKEPTIC.md`, `SkInnerCapture`, `SkMutableArm`). Not consequential.
- P2: as planned, with the new message above. Not consequential.
- T1: as planned; calls that crashed the compile now run, and no call that compiled reaches another declaration (`SkWhereReach2`). Not consequential.
- G1: as planned; programs with a widening getter are refused that compiled on the base, some of which then died at the code generator or the verifier (`SKEPTIC.md:42-53`). Not consequential: the checker's own rule for methods, and the specification's.
- F1: as planned, wider in its siblings; no output changes. Not consequential.
- B1 to B3: ordering only.

### 3. The two new rules, rung by rung

The rules are the curator's words of 15:49:11 UTC on 2026-11-18: "you should be writing the test case, state what the expected failure is, then run it. If it matches your expected failure, then you can start working on the implementation. If it fails for a different reason than you expected, you need to deal with those cases", and the skeptic's trim, "first compress or minimize the worker's implementation and also focus on the correctness". They stand in `fortress-repo`'s `references/tests-writing.md`, "The order", step 2 (`d4e7398301`, `02c1dcd278`), and the manual's "Skeptic" (`53e7e33eec`), whose check 2 accepts "the failure stated before the first run, or the one the section names". Each rung's section held a "Seen failing on the base" line from the reproducers run before the launch (`e1d3ac2d30`), except L's, whose test did not exist yet.

**No worker wrote an `Expected failure:` line in a message before its test's first run, and every first run failed the way its section named.** Read from each worker's transcript by its assistant text and its tool calls (`expfail.py`):
- T: no line; T's only text message is one line about the skill. The first run on the base, 15:35:10, then again with a case added at 15:37:43 (call `ZV5iBY`), before the first edit at 15:38:09: 'UNEXPECTED exception java.lang.ClassCastException: class com.sun.fortress.nodes.VarType cannot be cast to class com.sun.fortress.nodes.TraitType', 'Could not load', as the section names. The skeptic found no line (`SKEPTIC.md:12`) and did not correct the report, which still says "Expected failure, as stated before the first run" (`compile-ladder/rung-type-variable-receiver/REPORT.md:26`).
- P: no line; the only mention is a TaskCreate description at 14:58:52, "Expected failure line". The first run 15:00:06 (call `2MsmNT`), before the first edit at 15:03:06: 'Tests run: 4,  Failures: 4', as the section names. The skeptic corrected the report's claim (`ea9f17ab75`).
- L: no line. The first run 14:58:44, before the only edit at 14:59:38: the link passes and the run dies, 'java.lang.VerifyError: Bad local variable type', as the section's "dies with the verifier's message on the base" asks. The skeptic corrected the report (`58cb62a2c2`).
- G: no line before any of its three failing runs. The first, 15:34:23 (call `cnNKdR`), before the first edit at 15:35:55: 'Saw failure, but did not satisfy compile_err_contains; expected should be a subtype of the', the section's failure in the harness's own words (the section had 'Must satisfy'); G's text at 15:34:27 reads "The test fails on the base as expected", after the run. The library lines' run, the distance driver's '#kind return-type 2', and the walk test's run had no line either. The skeptic corrected three claims (`eed9c3da23`).
- F: no line; a TaskCreate description at 16:08:09 says "state Expected failure". The run 16:09:09 (call `9KdYeT`), after the library line's removal, the test's set-up, and before the Java edit at 16:10:02: 'UNEXPECTED exception java.lang.NullPointerException' with 'getConstructor()" is null', as the section names. The skeptic corrected the report (`a51c08d92c`).

**What the workers did instead:** each ran the section's named failure and wrote in its report that it had stated one. Every skeptic checked the run against the section's line, found no message, and four corrected the claim. **The skeptics did the same with their own tests:** no skeptic wrote the line in a message before its own test's first run, and three wrote that they had: T's skeptic, "Expected failure, stated before the run" (`SKEPTIC.md:53`; its run 17:23:23, no line before it); P's skeptic, "Expected failure, stated before its run" (`compile-ladder/rung-partial-assumption/SKEPTIC.md:47`; its run 16:40:58); G's skeptic, "Stated before its first run: 'Expected failure: ...'" (`compile-ladder/rung-widening-getter/SKEPTIC.md:63`), whose text first appears at 17:32:09 in its heredoc, after its run at 17:27:39. The merged-diff review read every fix in its maker's transcript (its `fixesChecked`) and did not flag these.

**What it cost.** No first run failed another way, so no fix started from a wrong failure: the section's lines, from the reproducers before the launch, carried the rule's purpose. The cost is in the record: five false claims made, four corrected by the skeptics at a few thousand tokens each, and four left on `main` (T's `REPORT.md:26` and the three skeptics' lines). And the rule's own check, the statement that the curator asked to be "checkable by skeptic", was never there to check. Part 1 puts this to him.

**The trim.** One "Skeptic's trim:" commit, P's `6a56a39123`: `generateDispatchAmong` passes `splitInternal` the whole set's `specificDispatchOrder`, as `split` passes its order to each subset, in place of `inSpecificOrder`, a second topological sort of the members (16 lines gone, `OverloadSet.java:2341-2351`). The behaviour is kept: `splitInternal` keeps only the subset's own members, in the given order (`OverloadSet.java:546-560`), and the restriction of an order of the set to its members is an order of them. It was built with the fix as one code state and seen passing, 'OK (23 tests)' (`junit.sh sk34fix`). No whole suite ran after it, which `tests-running.md`, "When to run a whole suite", asks for no edit of the code generator; the gate's `testFast` on the merged tree is its whole-suite check. The merged-diff review found the trim's order sound (its `summary`, item 1). No other skeptic trimmed.

### 4. The measure: the declarations of the one library that the code generator refuses

**Before run 1: 2 on `ba3c7c876d`, of which the measure's script counts 1** (F-34 before the batch): `__bigOperator2` (row 1076), and `String`'s two partial calls (row 818), which stop `String`'s real compile but not the script, since its driver skips the overloaded calls. The record expected 0 after run 1 (`CLIMB-BATCH-34.md`, section 2, "The measures").

**What the rungs' own runs show.**
- T on its code: 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', `__bigOperator2` emitted (worker on `38d8a44e56`; skeptic on `1683793cf8`).
- P on its code: `FORTRESS_LIBRARY=one ../bin/fortress compile ../Library/String.fss`, 'compile exit=1' on the base, 'compile exit=0' on `a95eb01926` and `6a56a39123`, `String.jar` 84,833 bytes.
- L in the rehearsal tree: `Hello` runs with the verifier on; 2 methods refused by ASM's verifier, both row 1054's (section 1, L).

**After run 1, measured on the landed tree after the landing** (a finding, by the coordinator's worker, not run again here): on `285efad802`'s code, 'refused declarations 0 | emitted (OK lines) 754 | component failures 0', kinds 0; `String`'s real compile under the selector, taken apart on the same scratch tree with the patch reversed, 'compile exit=0 seconds=36', `String.jar` 84,438 bytes, both partial calls calling the `(String, String)` body (`compile-ladder/plan-34/probes/measure-285efad802.txt`, committed `8f7604e42c`). Against `measure-ba3c7c876d.txt`: `__bigOperator2` emitted, `FortressLibrary` 536 to 537, nothing newly refused; the patch applied whole, and its `sed` of `NN32`'s getters is now a no-op.

**What the record should state:** F-34, "On the code of `285efad802`, the code generator refuses none of the declarations of the fourteen components, by the measure's script (754 emitted, no component failure) and by `String`'s real compile under the selector; on `ba3c7c876d` it refused 2, of which the script counted 1", with its caveats (the patch for row 874, the script's skip of the dispatch methods, no emitted class run). F-34's present title, measured apart on T's and P's codes, is true but superseded. `PLAN.md:69` and `:10` the same. The measure's patch is still needed until run 2 gives the one library's carried types their rows (`NamingCzar.java:606-614` holds the prelude's seven only).

### 5. The gate, the count and the distance

**The one gate is green,** as its agent returned it, on `main` at `3ccd236f01`: `testFast` 59 suites, 2,619 tests; `testSystem` four shards, 879 tests; `testSpecData` 130 tests; 0 failures in 3,628 tests in 64 suites (climb batch 33b's 3,608). `CompilerJUTest` 1,766 to 1,785, the system shards 878 to 879 (F's walk test); every other suite unchanged. 24 atomic programs, 72 of 72 `PASS`. The ladder with no move, the 18 microGPT components at `disambiguate`. The checker count 0 over 14 apis with `#crash none`, 'COUNT SAME   0, declared none'; the distance 0, 'DISTANCE SAME   0', every kind 0. No row of the count's table is new or risen, so no rung edit is tied to one. microGPT's walk check gave 7 of 7 for both programs at the commit stage, 'VERDICT: 7 PASS, 0 FAIL of 7 -- ALL PASS' (53 s and 45 s), on `66cd4c956d`'s code.

**After the gate.** The review's corrections `66cd4c956d` change only paths under `explorations/` (the gate's summary checks it: `git diff --name-only 3ccd236f01 66cd4c956d -- ProjectFortress Library build.xml` printed nothing). The commit stage copied the gather's PDF to `Specification/fortress.pdf`, built from the same text, and built nothing.

**The comparisons.** `gate_compare`, `ladder_compare` and the microGPT phase diff printed nothing. Nothing hidden goes to the list. No line of the team's tests was rewritten.

**The stages' seconds, and the machine.** The count stage about 105 s by the log's file times, the distance stage 200 s (`FortressLibrary` 127 s) at a start load of 0.28 beside `testFast`, against climb batch 33b's 65 s and 117 s (75 s). The VM restart of 17:06 gave the session another machine: every agent before it reports an Intel Xeon at 2.30 GHz in its harness lines, every one after it 2.10 GHz (`junit.sh` headers in the transcripts; `uptime -s` 17:06:26; the gate's `# machine` lines). `testFast` took 11 min 45 s against 7 min 53 s, `testSystem` 4 min 17 s against 3 min 9 s, and the microGPT quick pair 53 s and 45 s against 38 s and 32 s. So no figure of this gate compares with climb batch 33b's, and none is a change of the code's speed. The commit stage wrote both stages' seconds into F-240 with the machine.

**After the skeptics' fixes.** Two fixes changed code: T's `54c56dc6e9`, its test seen failing on the worker's head and passing after ('OK (33 tests)'), and P's `d2dad41bfb` with the trim ('Saw wrong failure. compile', then 'OK (23 tests)'), each in the maker's transcript (the merged-diff review's `fixesChecked`). The gate is their whole-suite check on the merged tree.

### 6. The cost, by role, against the record and the batches before, and in three spans

**The run wrote 5.12M over 18 transcripts, in 4 h 25 min** (14:48:57 to 19:14:23 UTC; `batch-measures.py` gives the same 5.12M). Span 3 below counts it without the commit agent, whose transcript changed after the span: 4.99M. 16 results; the two launches without one are the restart's.

By role (writes, then share):
- Rung workers (5 launches for 5 rungs): 1.81M, 35.4 %. G 454K, L 392K, P 385K, T 301K, F 279K.
- Skeptics (7 launches for 5 rungs): 1.97M, 38.4 %. P 378K, T 233K killed and 342K, G 211K killed and 317K, L 270K, F 215K.
- The judge on P's contested fix: 156K, 3.0 %.
- Gather 420K, 8.2 %. Merged-diff review 426K, 8.3 %. Gate 146K, 2.9 %. Commit 130K, 2.5 %. The disk check 64K, 1.3 %.
- By rung, all its roles: G 0.98M (with its killed skeptic), P 0.92M (with its judge), T 0.88M (with its killed skeptic), L 0.66M, F 0.49M; per landed rung, all roles: 1.02M.

**Against the record:** "Run 1: about 5.3 million tokens written, 6.1 million with the reserve. The range is 4.6 to 7.0 million. About 4 hours and 45 minutes, 5 hours and a half with the reserve. Five rungs with their skeptics write about 4.0 million, the fixed roles about 1.3 million. The reserve is 0.8 million" (`CLIMB-BATCH-34.md`, section 2, "Cost and time"), and the check before the launch: "So expect run 1 near 6 million, not 5.3" (`climb-batch-34-review.md`, B5). **5.12M: 3 % under the estimate without the reserve, 16 % under it with the reserve, inside the range, and 0.9M under the check's 6M; 4 h 24 min to the commit stage's last commit, against about 4 h 45 and 5 h 30 with the reserve.** By role, each rung with its skeptic, the killed launches left out:
- **L: 0.66M against 1.05M (−37 %).** The planner priced "building a scratch library more than once" and a fallback; the worker found the cause with one scratch build and a second for the repair, and wrote 392K in 42 minutes.
- **P: 0.76M against 0.8M (−5 %),** 0.92M with the judge, which the reserve held.
- **T: 0.64M against 0.7M (−8 %),** 0.88M with the killed skeptic.
- **G: 0.77M against 0.75M (+3 %),** 0.98M with the killed skeptic.
- **F: 0.49M against 0.7M (−30 %).**
- **The five rungs: 3.33M against 4.0M (−17 %).**
- **The fixed roles: 1.19M against 1.3M (−9 %)** (gather 420K against 0.47M, review 426K against 0.46M, gate 146K against 0.15M, commit 130K against 0.16M, disk 64K against 0.07M).
- **The reserve: 0.16M of 0.8M spent:** one ruling on a rung with no repair; no ruling on the review, no repair round, no second gate.
- **The restart: about 0.43M, outside every role's estimate** (below).
- **The minutes.** The rung stage took 2 h 57 (14:49 to 17:46), the restart's 2 minutes down and the second skeptics' re-reading among them; the gather 55 minutes, against 33b's 41; the review 21 beside the gate's 29; the commit stage 3½. The gate's suites ran on the slower machine (section 5).

**What the restart cost.** The two killed launches wrote 0.44M: T's first skeptic 233K (13 min) and G's first skeptic 211K (7 min). T's first launch had committed `b99f1f564b` and `121da77ed4` and written five program outputs, which its second launch took over; the second wrote 214K in its first 8 minutes (17:08:24 to 17:16:30) reading the skill, its brief, its briefing and the branch before its first new program. G's first launch committed nothing and left a count run without its `EXIT=` line; its second ran that count again and wrote 112K before it (17:08:18 to 17:10:50). So the restart cost about 0.43M (G's first launch, 211K, and T's second launch's re-reading, 214K) and about 13 minutes. Without it the run would have written about 4.69M, 12 % under the estimate.

**The cost in three spans, each on its own folders,** as `spend.py` from a span's start less `spend.py` from its end. A transcript counts in the span where it last changed.
- **Span 1, climb batch 33b's landing work,** from its commit stage's last commit `ba3c7c876d` (06:41:55 on 11-18) to the end of its record-landing workflow, run `wf_42295207-c9a`, whose journal was last written at 09:19:08; the boundary is 09:19:09. Over that run's folder and its headless writers (the two in `-home-user-fortress-landing-33b`, and `dce3d205` and `eddc35c4` in the project's folder): `spend.py` printed 4.70M from 1794984115 and 0.28M from 1794993549. **4.42M over 30 transcripts** (07:13:30 to 09:19:07).
  - By part: the record (07:13 to 08:15) 1.78M, its two headless record writers 533K among it; the orientation update (08:15 to 08:52) 1.39M; the skill step (08:52 to 09:02) 0.35M; the page of `fortress-repo` changes (09:02 to 09:17) 0.65M; the push and the revival page (09:17 to 09:19) 0.24M. Of the 30, ten ran on Sonnet.
  - In the span's time but outside its folders: 33b's post-batch review 567K (06:45 to 07:13), the base build 39 with F-34's measure 114K (06:45 to 06:54), the batch script's four fixes 243K (07:14 to 07:24), the arrays page's Part 2 240K (07:49 to 07:59); the coordinating session's own writes, 325K over 82 messages (`mainw.py`). The planner of batch 34 began in the span (08:45) and counts in span 2.
- **Span 2, the preparation,** from 09:19:09 on 11-18 to the launch, 14:48:57 on 11-20. Over the session's Agent-tool workers' folder, the project's folder of headless runs and the two scratchpad folders of the blind pilot's headless runs: `spend.py` printed 6.15M from 1794993549 and 3.23M from 1795186137. **2.92M over 17 transcripts, and the coordinating session's own 2.80M over 255 messages: 5.72M.**
  - **The batch's preparation, 1.28M:** the planner and its probe, 574K (08:45 to 09:35 on 11-18); the Fable review, headless on Fable 5.2, 234K (10:09 to 10:23 on 11-20); the reproducers, 234K (10:24 to 10:36); the manifest worker, 235K (14:38 to 14:46). The base build `/home/user/fortress-base40` ran in the coordinator's own turns (05:49 on 11-19), so its cost is in the coordinator's figure.
  - **Work that is not the batch's, 1.64M:** the blind pilot of the comparison of tiers and its probe, 815K (the tiers' metrics 258K; four reviewers of the pilot's packets, 326K; two one-word probes of the tiers, 51K; the probe of two cast points, 179K); the refactor `95611a87c5`, 119K; the skill writer's tasks and their cold reads, 710K (the writer's task 48K; the cold read of the test-order change 91K; the page of `fortress-repo` changes 348K; the archaeology of that page, on Sonnet, 223K).
  - **The coordinator's own turns, 2.80M,** of which five turns that each rewrote the whole context after the prompt cache lapsed came to 2.24M (80 %): 643K at 12:26 and 283K at 15:15 on 11-18, 355K at 05:46 on 11-19, 456K at 10:06 and 500K at 14:36 on 11-20, each the first turn after a wait, four of them started by the curator's message and one by a check-in.
- **Span 3, the run,** 14:48:57 to 19:13:06 (boundary 19:13:07), over the run's folder: `spend.py` printed 5.12M from 1795186137 and 0.13M from 1795201987. **4.99M over 17 transcripts,** the killed part before 17:06 included (0.44M). The commit agent, 130K, last changed at 19:14:23 and counts after the span. The coordinating session wrote 342K during the run, over 90 messages, its check-ins, the resume and the speed roadmap's turns.
  - Beside the run, apart from it: the speed roadmap's five Agent-tool workers, **2.35M** (the record's performance digest 336K, the handover's question 376K, the survey of the JVM's state of the art 333K, the roadmap's draft 935K, the check of its claims 370K; 15:40 to 16:54), not the 1.9M of the brief's estimate.

So climb batch 33b's landing cost 4.42M in its span, against climb batch 33's 4.80M, and this run's preparation 5.72M in all, against 33b's 0.96M; of it, the batch's own 1.28M plus the coordinator's share. The largest single cost of the preparation is the coordinator's cold turns.

**The briefing's use.**
- **13 of 13 briefed launches read their briefing, 100 %, and each read every part. None read it in its first turn.** The briefed launches are the five workers (full briefing), the seven skeptic launches and P's judge (the slice of checks). The disk check, the gather, the review, the gate and the commit stage have none by design.
- When, by call and seconds after the start: rung T at call 12, 34 s, which saved part 1 to a file and read it at call 13; skeptic P at call 15, 37 s; the judge at call 9, 38 s; skeptic F at call 16, 48 s; rung P at call 17, 50 s; rung G at call 22, 53 s; rung L at call 25, 56 s; G's first skeptic at call 16, 58 s; T's first skeptic at call 18, 62 s; rung F at call 22, 63 s; G's second skeptic at call 13, 82 s; T's second skeptic at call 19, 85 s; skeptic L at call 19, 86 s.
- Its results came to about 0.13M tokens, 2.6 % of writes, at 0.40 tokens a character plus 110 a call (`brief2.py`).
- Against the batches before (briefed, read, at calls, seconds, share): B33 run 1 12, 12, 8 to 22, 27 to 82, 2.6 %; B33 run 2 12, 12, 8 to 24, 28 to 153, 3.6 %; B34 run 1 13, 13, 9 to 25, 34 to 86, 2.6 %. The earlier batches are in `reviews/batch-33b-review.md`, section 5.

**Other measures.**
- First calls: 860K (16.8 %), 8 cold. Cache refills: 0. Refusal cycles: 1 rung, P's judge, 156K. Rulings and repairs on the merged tree: 0.
- The skill's load, by a rough count: about 1.02M, 20 %. `revival-changes.md` was read whole by 16 of the 18 launches, all but the disk check and the commit stage. `sources.md` was only grepped.
- Error results: 51.
- Per agent, in order of start (ids are the transcripts' `agent-<id>.jsonl`): disk `afb590b3`, 64K, 0.1 min; rung L `a7546289`, 392K, 42.2; rung P `a69f2d82`, 385K, 41.5; rung G `a4bc1f4b`, 454K, 58.2; rung T `aa55f20b`, 301K, 33.6; rung F `a602bd9f`, 279K, 36.9; skeptic P `ab88bbfe`, 378K, 24.0; skeptic L `a24155cc`, 270K, 17.3; skeptic T `ab799062`, 233K, 13.1, killed; skeptic G `ac763d35`, 211K, 6.8, killed; skeptic G `aae567c6`, 317K, 25.1; skeptic T `a0efe570`, 342K, 31.7; skeptic F `aa85e493`, 215K, 13.0; judge P `aef51b80`, 156K, 3.9; gather `afbe07d1`, 420K, 55.5; gate `a0165358`, 146K, 29.0; review `abd4c363`, 426K, 21.0; commit `a4a5ec1f`, 130K, 3.5.

### 7. Re-measuring: a build, a suite or a measurement on a code state that another stage ran

By each agent's commands (`runs3.py`):
- **No agent ran a whole suite twice on one code state.** T, P and L ran `ant testFast` once each on their final code; G and F ran `testFast` and `testSystem` once each on theirs. No skeptic ran a whole suite; T's and P's fixes are in the code generator, for which `tests-running.md` leaves the whole tracks to the gate. The gate ran each suite once.
- **The count and the distance stages:** G and F ran each once on their final code, G also on its intermediate code `9580dd7bbb` to find the library lines the checker refused, and the count stage on the base build for P-148's pair and once profiled on each tree, as `compiler.md`, "The checker's time", gives the second pass; G's skeptic ran the count on the base build and on the worker's head, the one planned exception. The gate ran each stage once.
- **The measure** ran on T's worker's code and on its skeptic's, two code states; the coordinator's worker ran it once after the landing, on `285efad802`.
- **The specification was built once,** by the gather on G's text; the commit stage reused its PDF (climb batch 33b's process finding 6, answered).
- **The batch's own tests ran at the gather** in one JVM ('OK (26 tests)'), with the two walk tests and the 52 demos, then in the gate's `testFast` on the same code: the manual's check before the gate, as in 33b. **The microGPT quick pair ran once,** at the commit stage.

### 8. Three events

**The VM restart at 17:06 UTC and the resume at 17:08. Two agents ran twice; each second launch found the first's work and said so; nothing was committed twice or lost but one launch's reading and one count run.**
- The journal holds one `launched` line, 18 `started` lines and 16 `result` lines. The restart killed T's first skeptic (16:52:54 to 17:05:59) and G's first skeptic (16:59:11 to 17:06:01); both were started again with the same keys, G's at 17:08:18 and T's at 17:08:24. The resume's log: 'Resume: 8 of the journal's 8 saved results served from cache. Call 11 and every call after it run fresh'. The eight from the cache are the disk check, the five workers, and the skeptics of P and L, whose results came before the restart.
- T's second skeptic: "Two launches of the skeptic worked the rung: the first (16:52 to 17:06 UTC) committed `b99f1f564b` and `121da77ed4` and ran the programs `diff1.txt` to `diff5.txt` list below, then stopped with the machine's restart; the second took over from its commits and files, ran nothing again whose output was whole" (`compile-ladder/rung-type-variable-receiver/SKEPTIC.md:3`).
- G's second skeptic: "Two launches of this role worked the rung: the first (16:59 to 17:06 UTC) read the branch and started a count run on the base build, and a restart of the machine ended it before any commit; its count run had no `EXIT=` line, so this launch ran it again" (`compile-ladder/rung-widening-getter/SKEPTIC.md:3`).
- Commits: `wip/rung-type-variable-receiver` holds the first launch's two commits (17:05:26, 17:05:57) and the second's three and its verdict (17:28:45 to 17:39:02), each once; `wip/rung-widening-getter` holds no commit between 16:25:40 and 17:28:04. The disk was not rolled back: the first launches' files were found. Lost: G's first launch's reading and its count run.
- The machine after the restart is slower (section 5).
- The killed launch's task output, `w9asojbg3.output`, is empty; the run's whole result is the resumed task's, `wo8qfwd20.output`. The coordinator committed its boot note `1c166939f8` at 17:08:37, before the gather, which started from it.

**No commit other than the batch's fell between the gather's start and the batch's push.**
- The gather's first record is at 17:46:24 and its first commit, T's `8e4cc0c16d`, at 17:53:14; its preconditions held, `git status --porcelain` empty and the base an ancestor of `HEAD`, then `1c166939f8` (`RECORD.md:7`). `main`'s reflog from then to the push holds only the batch's commits: the five rungs, the closes, the gather's record `b7949d11fd` amended once to `3ccd236f01` before any push, the review's `66cd4c956d` and the commit stage's `285efad802`. `origin/main` moved from `1c166939f8` to `285efad802` by the commit stage's one atomic push at 19:13:28, and the two other refs with it; the coordinator's next commit is its worker's `8f7604e42c` at 19:28:47. The transcript backup's snapshots of 17:51:13 and 18:36:02 are on `transcripts-blinded`, not `main`.
- So the rule of `references/batch.md`, "While it runs", held. The push was one `git push --atomic` of the three refs, as the script now gives (climb batch 33b's process finding 3, answered by `594909d625`).

**No agent received text from outside its brief.**
- The curator's go came at 14:3x and 14:5x UTC, before the launch; during the run (14:48 to 19:14) he sent the coordinating session no message.
- The first record of each of the 18 transcripts is the harness's '[Workflow harness — computed task]' message, the brief. Each agent but the disk check received one more text message as the user: the skill's text after its own load of the skill; G's second skeptic also loaded `cloud-container` itself (`usertext.py`).
- Beside them the harness attached its standing material (the environment, the project's instructions, the list of skills, the date, the attribution reminder, the session's context, the connectors' instructions), the shared task list, and two notices that a file the agent wrote had changed on disk (rung L, skeptic L). The task list carried P's to-dos (tasks 50 to 53), G's (54 to 57), F's (58 to 61) and the gather's (62 and 63) to the agents that ran beside or after them; tasks 57 and 61 are still `in_progress` (`taskrem.py`). No file was attached that no brief asks for.
- No transcript holds his words of the go ("I don't care", "dogmatic", "Deal with it", "Go to launch", "Both runs"), or the markers '<agent-message', 'Another Claude session', 'sent a message while you were working', 'user request]' or 'relays, verbatim'. The curator's name stands in nine transcripts only where a file of the record or a tool's comment names him, as "Pavol's answers" in `PLAN.md`.

## Part 1. Conformance

No departure from a decision of the curator's landed. One default that landed, fork L1, was named consequential before the launch; its fallback never ran. One finding of this review would change a decision of his: the form of his rule of 2026-11-18. It follows with its options.

### The finding for the curator

**A1. The rule "state the expected failure, then run it" was met by no worker and by no skeptic in its first batch; every rung met its purpose through the section's "Seen failing on the base" line instead, and five reports and three skeptic files claimed a statement that the transcripts do not hold** (section 3). His words of 15:49:11 UTC on 2026-11-18: "you should be writing the test case, state what the expected failure is, then run it", and "would this statement of expected failure before the run be also checkable by skeptic?". The manual's skeptic accepts "the failure stated before the first run, or the one the section names" (`climb-batch-workflow.md:128`), a fallback that his words do not have. In this batch the fallback carried every rung. The rule stands in the skill and the manual and in no POSITIONS entry: P-102's history does not hold his words of 2026-11-18 15:49.

The options:
1. **As built.** The worker states the line in a message; where it does not, the section's named failure stands in, and the skeptic corrects a false claim. Cost: none in work; the statement stays absent where a section names the failure, and false claims recur.
2. **The section's line is the statement.** A section's "Seen failing on the base" line, from the run before the launch, counts as the stated failure for the section's own test; the worker states a line only for a test or a case that its section does not name, and a report writes "stated" only where a message shows it. Cost: none in work; his rule then binds the tests that no one ran before.
3. **The line in the call that runs the test.** Every first run of a test, the section's own included, carries its `Expected failure:` line in the same shell call, before the harness command (an `echo`), so that the transcript holds it at the run and the skeptic's check is mechanical. Cost: one line a test; the skill's "in a message" becomes "in the call that first runs it".

My recommendation (mine): option 3 for every test that its section does not name, the skeptics' own tests among them, and option 2 for the section's own test. It makes the statement checkable, as he asked, at one line a test, and adds no step where the record already holds the failure. Either way, his words of 2026-11-18 15:49 go into P-102's history.

### Findings for the record, with no decision of his changed

1. **Four claims of a stated failure stand on `main` untrue:** T's `REPORT.md:26` ("as stated before the first run"), and the skeptics' own tests in T's `SKEPTIC.md:53`, P's `SKEPTIC.md:47` and G's `SKEPTIC.md:63`. Owed: each line says which failure was named and that no message stated it, as the skeptics wrote for the workers' four.
2. **Review-queue item 375 (PLAN's item 71) is answered in part and stale** (section 2). Owed: its text and PLAN's line as section 2 gives them; item 72 (queue 376) beside it.
3. **G.worker.1 asks him a question that P-146 and P-157 answer** (section 2). Owed: the entry rewritten as told, its repair placed with the batch after's item 3.
4. **F-225 is short since row 1094:** "the methods' signatures keep `self` at the plain trait type `C[\X\]`, save in the overloading check's exclusion test (F-277)" (`FACTS.md`, F-225). As built, the Return Type check of an object's dotted method that redeclares a self-typed trait's method at the same parameter types reads the receiver as `C[\X\] & X` too (row 1094; `OverloadingChecker.scala:214`). Neither the gather nor the merged-diff review reworded it; F-394 and the Appendix I Effect name the row.
5. **F-34 is superseded by the measure on the landed tree** (section 4).
6. **The rehearsal patch is stale for run 2:** the patch `compile-ladder/plan-34/probes/rehearsal-34.patch` no longer applies whole on `main`: `git apply --check` prints 'error: patch failed: Library/FlatString.fss:26' and 'error: patch failed: ProjectFortress/LibraryBuiltin/FortressBuiltin.fss:261'. Its hunks on `FortressLibrary.fss` (rows 1078 and 1076) and `String.fss` (row 818) still apply and would put back stand-ins for walls now gone (Part 5).
7. **The plan's words were wider or narrower than what landed in five places:**
   - section L's Files, `forLabel` and `forExit`, where the cause and the repair are in `forLocalVarDecl`, and with it the gather's order;
   - fork P2's "the code generator's refusal, as today", where the generic declaration below the resolved one gets a new message, and where P2's list missed the dispatch holding a functional method (the skeptic's form);
   - section T's Files, where the skeptic's fix edits `generateTraitDefaultMethod` and `generateFunctionalBody`;
   - section F's step 2, "if any of them is needed", built for every native singleton;
   - the estimate of rung L (section 6).
8. **The skeptics' fixes were right:** two defects of a change (T's `where` clause, P's functional method), three tests or cases added (T's two forms, L's two blocks, G's inferred getter), and eight records corrected; one fix contested, upheld; one trim, its behaviour kept.

### Corrections owed in the record

- **POSITIONS:** none made false by the landing. P-146 and P-157 hold; the tree departs from them at row 1094, older than the batch, and the departure has its row. P-102's history owes his words of 2026-11-18 15:49 (A1).
- **FACTS, false or short, and not reworded by the gather or the review:**
  - F-34 (`FACTS.md:39`): the landed tree's measure (section 4).
  - F-225: row 1094 (finding 4).
  - F-352 (`FACTS.md:171`): run 1 makes none of its sentences false; its "the one library's seven are not yet compiled over the payload classes" waits for run 2.
- **The ledger:** rows 1093 to 1097 filed, 818, 138, 141 and 674 rewritten, notes on 1057, 870, 815 and 1073; owed, the homes of Part 4.
- **The rung reports:** finding 1.

## Part 2. Did the practice hold

### The practice's measures, batches 26 to 34

(B26; B27; B28; B29; B29b; B30; B32; B31 run 1; B31 run 2; B33 run 1; B33 run 2; B34 run 1.) The figures before B34 are `reviews/batch-33b-review.md`'s, Part 2.
- Written: 2.55M; 5.17M; 6.65M; 7.54M; 3.25M; 2.92M; 5.00M; 5.08M; 3.93M; 5.57M; 5.74M; 5.12M.
- The tier: B31 run 1 ran on Fable, B31 run 2, both runs of B33 and B34 run 1 on Opus.
- Launches lost to restarts or the disk: 0; 8 and a gate, 0.42M; 0; 0; 0; 0; 2, 0.59M written by them; 2, 0.24M written by them; 0; 0; 2, 0.52M written by them; 2, 0.44M written by them.
- Per landed rung: 0.64M; 0.65M; 0.95M; 1.26M; 1.62M; 0.97M; 0.71M; 0.85M; 1.31M; 0.93M; 1.43M; 1.02M.
- First calls: 0.62M, 6 cold; 1.29M, 10 cold; 0.98M, 8 cold; 1.12M, 10 cold; 0.63M, 8 cold; 0.65M, 7 cold; 0.93M, 7 cold; 1.22M, 12 cold; 0.65M, 7 cold; 0.80M, 7 cold; 0.995M, 11 cold; 0.86M, 8 cold.
- Cache refills: 1, 94K; 0; 1, 204K; 0; 0; 0; 0; 1, 159K; 0; 0; 0; 0.
- Refusal cycles: 0; 3 rungs, 231K; 1 rung, 164K; 2 rungs, 314K; 0; 0; 0; 0; 0; 0; 1 rung, 214K; 1 rung, 156K.
- Rulings and repairs on the merged tree: 0; 368K; 0; 415K; 0; 0; 0; 660K, and a second gate of 114K; 0; 0; 317K; 0.
- Skeptic fix commits (defects): 2 (0); 9 (1); 16 (1); 25 (10); 7 (2); 8 (2); 18 (5); 10 (1); 10 (2); 20 (1); 12 (2); 13 (2), one of them a trim.
- Distance: 0 every time.
- Count stage at the gate: 180 s; 80 s; 99 s; 125 s; 104 s; about 70 s; about 95 s; about 75 s; about 85 s; 78 s; about 65 s; about 105 s on a slower machine, each by the log's file times.
- Distance stage at the gate: 246 s; 144 s; 205 s; 224 s; 190 s; 128 s; 165 s; 136 s and 143 s; 150 s; 137 s; 117 s; 200 s, the last six beside `testFast`.
- Skill's load: 13.9 %; 16.0 %; 16.5 %; 12.9 %; 10.6 %; 16.0 %; about 18 %; about 20 %; about 14 %; about 18 %; about 17 %; about 20 %, the last six by a rougher count.
- Briefing, estimated: 5.2 %; 6.2 %; 3.1 %; about 3.6 %; 2.7 %; 4.9 %; 5.0 %; 5.0 %; 3.0 %; 2.6 %; 3.6 %; 2.6 %.
- microGPT quick pair: 7 of 7 both, each time.

### Process findings

Numbered for the coordinator, who improves the batch script and the practice from them between batches.

1. **The statement rule needs a form that the transcript shows** (Part 1, A1). Headless workers write few text messages (T one, L three, P seven), so "in a message" is the form least likely to happen. Proposed (mine): option 3 of A1 in the worker's and the skeptic's briefs; the merged-diff review's check of each fix in its maker's transcript names the line.
2. **The section's "Seen failing on the base" line did its work.** Every first run matched it, including F's, whose set-up the section named. Climb batch 33b's reproducers-before-the-launch step paid for itself. Proposed (mine): keep it, and run it for every rung whose test can be written before the launch.
3. **The estimate overpriced the rungs by 17 % and held on the fixed roles.** L's price assumed a fallback and repeated scratch builds; F's and T's were priced at 0.7M and came at 0.49M and 0.64M. Proposed (mine): price a rung from this run's by kind: a code-generator rung with a scratch tree about 0.65M, a walk rung about 0.5M, a checker rung with both stages about 0.8M, each with its skeptic; keep the fixed roles at 1.2 to 1.3M.
4. **The coordinator's cold turns cost 2.24M of the preparation,** more than all the batch's preparation workers (1.28M), in five turns after waits of hours (section 6). Proposed (mine): before a wait that outlasts the prompt cache, the coordinator compacts or ends its turn on a short context, and boots from the boot note, as the `coordinator` skill's boot already allows.
5. **The VM restart changed the machine** (section 5). Timings taken on both sides of a restart do not compare. Proposed (mine): the gate's `# machine` lines are already there; the post-batch review compares stage seconds only on the same CPU line, and F-240 keeps the CPU beside each figure.
6. **The measure had an owner again:** the coordinator's worker took it 15 minutes after the push (`8f7604e42c`), as the manual's routing, step 1a, now gives. Climb batch 33b's process finding 2 holds.
7. **Two leftovers of the run:** rung L's scratch worktree, `/home/user/fortress-label-local-verify-scratch`, 361 MB at the base with the rehearsal patch, is still there (the commit stage named it); tasks 57 and 61 are still `in_progress` in the shared task list. Proposed (mine): the commit stage's clean-up removes any worktree named `<rung worktree>-scratch`; step 1 of the landing sweeps the tasks.
8. **The speed roadmap's workers wrote 2.35M,** not about 1.9M (section 6). No change proposed; it is not the batch's.
9. **Of climb batch 33b's process findings:** 1 (price by role from the last run on the tier) held for the fixed roles and overpriced the rungs (finding 3); 2 (the measure's owner) held (finding 6); 3 (one atomic push) answered by `594909d625`, and the push was atomic; 4 (timing beside a rung) recurred in G's worker's pair (80.4 s at load 0.04 against 91.4 s at 3.04), and the skeptic's pair settled it; 5 (the specification's grep for each closed row) held: each section had it, and the gather found the one sentence (gather.2); 6 (the specification built twice) answered, built once; 7 (what a "not built" fork gives a program) held: P2 said it, and the one new form gets a refusal; 8 (the restart's re-reading) recurred, at about 0.43M.

### Misses, by kind

Numbered on from `batch-33b-review.md`'s 1329.

Found before the launch or inside the batch:
- **The planner's text wrong, caught before the launch:** 1330, the check before the launch's corrections A1 to A13 and its points B1 to B7 (six citations of `CodeGen.java` one line high, rung G's sentence on the checker, F's list of `setConstructor` sites, P1's rule restated from B2's case, G1's scope and message, the disk's unit, and the missing "Seen failing" lines), applied in `178fd02f96`, `e1d3ac2d30` and `4ace0cffd0`.
- **The planner's text wrong, caught before landing:**
  - 1331, section L's Files and the expected order, the cause in `forLocalVarDecl` (L's worker and skeptic; the gather's order T, P, L);
  - 1332, fork P2's list without the dispatch holding a functional method (P's skeptic, `d2dad41bfb`);
  - 1333, section T's Files without the bodies whose `where` clause bounds the receiver's parameter (T's skeptic, `54c56dc6e9`);
  - 1334, section G's two library lines, where the checker then refused thirteen more and two components outside the stages hold the form (G; rows 1095, 1096);
  - 1335, rung L's price (section 6).
- **A defect of a change, caught before landing:** 1336, P's partial call that ran a declaration that the assumption excludes, 'p1 Leaf.pick Leaf' (P's skeptic, `d2dad41bfb`, contested, upheld); 1337, T's call in a body whose `where` clause bounds the receiver's parameter, 'Can't find a trait among the bounds of F that has m' (T's skeptic, `54c56dc6e9`).
- **A case of a change with no test, caught:** 1338, T's inferred static argument and object's static parameter (`b99f1f564b`); 1339, L's nested `do` block and initializer block (`ca10e0129e`); 1340, G's getter without a declared return type, which compiled on the base and failed the JVM's verification (`355edea65c`).
- **A defect of the tree found and filed, not the batch's:** 1341 to 1345, rows 1093 (T), 1094, 1095 and 1096 (G) and 1097 (G's skeptic).
- **A report that said what was not so:** 1346, the workers' claims of a stated failure in P's, L's, G's (three) and F's reports (their skeptics); 1347, T's report and record on its cases, its citations and its measure (T's skeptic, `121da77ed4`, `1683793cf8`, `b13441a335`); 1348, L's citation and count (`58cb62a2c2`); 1349, G's unmeasured sentence of row 1094 and its account of the team's checker (`eed9c3da23`); 1350, F's two citations of glue methods (`a51c08d92c`); 1351, F-394's "a widening one stopped the code generator", G.reserved.1's counts, nineteen for twenty-one, and nine citations of `CodeGen.java` that T's and P's hunks moved, in F-302, F-268, F-315, F-369, row 1088 and four lines of `PLAN.md` (the review, `66cd4c956d`).
- **Sentences made wrong, caught:** 1352, the Appendix I Effect of the self-typed trait's entry, which named no departure for row 1094 (the gather, `changes.tex:4452-4455`); 1353, `revival-changes.md:43` for the skill writer (the review).
- **Process:** 1354, the five workers' statement of the expected failure, absent (their skeptics); 1355, G's worker's timing pair under load (its skeptic retook it).

Found by this review:
- 1356, four claims of a stated failure left untrue on `main`, three of them the skeptics' own (Part 1, finding 1);
- 1357, review-queue item 375 (PLAN's item 71) answered in part and left as written (Part 1, finding 2);
- 1358, G.worker.1 put to him as a question that P-146 and P-157 answer (Part 1, finding 3);
- 1359, F-225 short since row 1094, not reworded (Part 1, finding 4);
- 1360, the rehearsal patch stale for run 2 (Part 5); section C's citations and premises, caught at the same time by the coordinator's re-read (`835e50a9a5`);
- 1361, rows 1093 and 1097, and the run's forks and items, without a home (Part 4);
- 1362, the coordinator's cold turns in the preparation, 2.24M (process finding 4);
- 1363, the scratch worktree and two tasks left by the run (process finding 7);
- 1364, sentences of the skill beyond the record's lists (Part 3).

**Against the earlier notes.** 26 misses were found before the launch or inside the batch (1330 to 1355), 5 of them defects of the tree that the batch did not make, against climb batch 33b's 28 for four rungs and run 1's 35 for six. No departure from a decision of his landed. One finding goes to him, on the form of his rule.

## Part 3. For the skill writer

The sentences of `fortress-repo` that the landing makes false or short, read on `main` at `02557ccdd4`; the batch changed no file under `.claude/` (the commit stage's `git diff --name-only 1c166939f8 HEAD -- .claude/`). The proposed wording is mine; the writer keeps the skill's form. The revival changes are in `compile-ladder/climb-batch-34/RECORD.md`, "Revival changes, for the skill writer": G's and F's; T's, P's and L's are "none".

**False, on the record's lists, checked:**
1. `references/compiler.md:55`: "a call of a functional method or an overloaded function with an assumption at some of its arguments but not all: 'Can't compile a dispatched call whose arguments are not all type assumptions'". The partial call of an overloaded function of the component compiles (F-325); the refused partial forms are a functional method, an assumed receiver, a dotted call's argument and a dispatch that would hold a functional method, with that message, and a generic declaration below the resolved one, with 'Can't compile a type assumption at some arguments but not all of a call that a generic declaration can take yet'.
2. `references/sources.md:890` and `:954` cite `Library/FlatString.fss:45` and `:121-128`, now `:43` and `:119-126`. A line of `sources.md` is not a rule.
3. `references/revival-changes.md:43`, short: "When the checker applies the overloading rules to a method of `T`, `self` has the type `T[\X\]`, except in its test of whether two domains exclude each other." The Return Type check of an object's dotted method that redeclares a self-typed trait's method at the same parameter types reads the receiver as `T[\X\] & X`, so it refuses a narrower return type there (row 1094); a getter so redeclared reads the plain type and compiles.
4. `references/compiler.md`, "The checker's gaps", short (the record's own item): the checker refuses a getter whose return type is not a subtype of that of the getter it keeps from being inherited (F-394); add the departures below.

**False or short, on no list:**
- `references/compiler.md:53`: "The code generator compiles one at a dotted call's receiver, at a call of a functional method or an overloaded function whose every argument is an assumption, and elsewhere as the value of `e`." Short: also at a call of an overloaded function of the component with an assumption at some arguments, by a dispatch on the others' run-time types among the declarations that take the assumed types.
- `references/compiler.md`, "The checker's gaps", short of the run's rows:
  - a method call through a type variable whose bound is another type variable, `x.n()` for `x: F` in `chained[\H extends Gen, F extends H\]`, is refused, 'No such method F.n.'; bound `F` by the trait (row 1093);
  - an object's dotted method that narrows a self-typed trait's method at the same parameter types is refused; declare it at the trait's return type (row 1094);
  - an object expression's getter or dotted method is not checked against the declaration it keeps from being inherited (row 1097).
- `references/revival-changes.md:32`: "The checker checks that an overriding return type is a subtype." Short: it checks a getter redeclared at the same parameter types too, by the Return Type Rule (F-394).
- `references/interpreter.md`, "Natives" (`:115-145`): no sentence is false. A line could say that walk registers each native singleton's constructor as it binds the singleton, so no library line names a native object as a value (F-395); the writer judges whether it is needed.

**Sentences that hold, met by the batch:** `SKILL.md`, "With the environment variable `FORTRESS_LIBRARY=one`, ... a program compiled so does not run yet" (until run 2); `references/tests-running.md:14` ("about 2,560 tests"), now 2,619; `references/compiler.md:127`, the `label` block that ends in a numeral (row 340), which L did not touch.

## Part 4. Routing

The routing check of the manual's "After the landing: the coordinator's routing", step 2: each open row, record default and item for him has a home.

**Items for him: each has a home in `PLAN.md`, none yet in the review queue.** P.judge.1, G.worker.1, G.worker.3, G.worker.4, G.reserved.1, gather.1 and gather.2 are the seven entries of `PLAN.md:912-918`, "Climb batch 34, listed for his review", made by the gather; G.worker.2 is held at `PLAN.md:55`, with row 1073 and the checker's other gaps. The merged-diff review confirmed each (its `curatorItems`). Owed: their items in the queue, as 598 to 604 are climb batch 33b's; G.worker.1 rewritten as told (Part 1, finding 3).

**Open rows.**
- With a home: 1094 (`PLAN.md:913`, `:918`), 1095 (`:914`), 1096 (`:915`), 818 (`:142`, `:912`, `:917`; queue 375; the list for the batch after, item 3), 1091 (the list, item 1), 1082 (`:901`; queue 599).
- **Two have no line of their own in `PLAN.md` or `review-queue.md`:** 1093 and 1097. Owed (the homes are mine): both with the list's item 3, the checker's other gaps.
- Row 1092, filed by the coordinator during the run (`8f6b20ca62`), has its home in the speed roadmap only (`reviews/speed-roadmap-2026-11-20.md:227`, `:333`), not in `PLAN.md`. Owed: a parked line with the roadmap's float step.

**Record defaults.** The record gives its forks to the queue as new items after the landing (`CLIMB-BATCH-34.md`, "After the landing": "this record's forks as new items"). **Run 1's forks, B1 to B3, L1, P1, P2, T1, G1, G2 and F1, have no item.** Owed: one item, as 604 is, each default as landed and its line of section 2 here; P2 with P.judge.1, G2 with G.reserved.1.

**Queue items that the landing made stale:** 375 (finding 2); 376, beside it; 601, whose sites moved, brought in line by `02557ccdd4` with the third site (Part 5).

**PLAN lines that the batch built or made stale.** The record lists phase 4's F-34 line, the line on the walls that only the switch shows, "Next" and the lines of climb batches 34 and 34b (`CLIMB-BATCH-34.md`, "After the landing"). Each is checked:
- "Next" (`PLAN.md:13`): climb batch 33b's landing; now run 1 landed at `285efad802` and run 2 waits for its section read again;
- phase 4's lines (`:43-56`): no line of climb batch 34 yet;
- F-34's line (`:69`) and "The live thread" (`:10`): "refuses 1 declaration ... `__bigOperator2` (row 1076)"; now 0 on the landed tree (section 4);
- the walls that only the switch shows (`:71`): "`NN32`'s two getters (row 993)" names a wall that is gone.

Stale too, on no list: "Where we stand" (`:9-12`), the last landed gate, the walk check's landings and the landed batches, which name climb batch 33b as the last.

**The manual and the script:** process findings 1, 3, 4, 5 and 7. **The skill:** Part 3. **FACTS and POSITIONS:** Part 1, "Corrections owed in the record".

## Part 5. Run 2 and the batch after

**Section C of `CLIMB-BATCH-34.md`, read against the landed tree.** The coordinator's re-read, `835e50a9a5` (19:45), brought in line the mission's premises, step 1's failure on the base, step 6's sites, the measures, the disk, the base build and a citation of `changes.tex`, and `02557ccdd4` (19:46) item 601's sites; the bullets below say which point each settled. What the landing makes stale:
- **The citations of `CodeGen.java`** (settled by `835e50a9a5`, which cites each site by its member on `285efad802`: `emitVarargsArray`'s `make` at `:8014-8015`, `forIntLiteralExpr`'s at `:4676-4677` and `:4717-4718`). Section C cited `ba3c7c876d`'s lines, which the refactor `95611a87c5` lowered by one after `:2611` and rungs T, P and L moved further. Its step 6, "`CodeGen.java:7904` and `:4708`" (review-queue item 601), is now `:8014`, the varargs index in `emitVarargsArray`, and `:4717`, the default `ZZ32` numeral in `forIntLiteralExpr`. A third site makes a `ZZ32` or an `NN32` from a JVM `int` there, a numeral at a place typed `ZZ32` or `NN32` (`:4672-4678`, `zz ? NamingCzar.internalFortressZZ32 : NamingCzar.internalFortressNN32`), and item 601 does not name it; the one library's carried rows reach it the same way. The refusal of a number type named as a value, cited `:7019` in fork F1, is `:7029`.
- **"The rule the rungs keep", run 2's line** (not changed by the re-read, and harmless), "with L's, P's and T's members of `CodeGen.java` as landed": the members are `forLocalVarDecl` (`:4745-4836`), `partiallyAssumedCall` (`:7326-7366`), `typeVariableMethodOwner` (`:7731-7742`) and `whereClauseBodyCodeGen` (`:3241-3245`), not `forLabel` and `forExit`. Rung C edits `CodeGen.java` only at item 601's sites, so no member of run 1 is in its way.
- **Its premises on run 1's walls** (settled by `835e50a9a5`). "Run 1's rungs have removed rows 1078, 818, 1076, 993 and 1090 on the tree you start from": true of the walls that the probe met; row 818 stays open for its other forms, and row 1090's compiled half is C's note. The probe's walls 1, 2 and 4 are gone, and L's run in the rehearsal tree shows `Hello` running with the verifier on and no stand-in (section 1, L).
- **The rehearsal patch** (not settled: step 3 still says "The probe's patch holds each, marked."). The patch no longer applies whole (Part 1, finding 6). Its stand-ins for run 1's walls, in `FlatString.fss`, `FortressBuiltin.fss`, `FortressLibrary.fss` (rows 1078 and 1076) and `String.fss` (row 818), must stay out of run 2, and so must its `OverloadSet.java` hunks marked "row 994", which are the batch after's. The section should name the pieces that C takes: the carriers, the tables, the converters, the names and the classes of the second set.
- **The measure** "on a scratch copy, without its patch" (the re-read cites the landed tree's measure): the script's `sed` of `NN32`'s getters is now a no-op, and its patch's carried types stay needed until C's rows land (`measure-285efad802.txt`).
- **Review-queue item 601's sites** are a step of C's plan, not his decision, as its entry says; `02557ccdd4` now cites the three by their members.
- **Item 599** (row 1082): the check before the launch noted that after run 2 `Boolean` and `Char` named as a value get the same refusal (`climb-batch-34-review.md`, B4). Unchanged by run 1.

**The record's list, "For the batch after, in this order"** (`CLIMB-BATCH-34.md`, section 2), still holds, and this landing changes it so:
1. Rows 994 and 1091, then `Arr` and `Dot` as run tests: unchanged.
2. The verifier's count over the library's generic classes, and row 1054: unchanged; L's run in the rehearsal tree still skipped 1,092 template classes and refused only row 1054's two methods.
3. Row 996, rows 1055, 1056 and 1035, the checker's other gaps, row 1085, row 1086, the other forms of row 818: add rows 1093, 1094 and 1097, and P.judge.1's form with row 818's. Rows 1095 and 1096 wait for a stage that checks the other components.
4. The rung on a `typecase` clause's static rules, if he answers items 592, 1081 and 1068: unchanged.
5. The matrix and the library's `DOT`, then microGPT's own needs: unchanged.

The default of item 597 stands: no skipping mode; on the landed tree the code generator refuses no declaration of the fourteen, so only row 874's wrappers stand between them and their jars, which run 2 builds.

## What I did not do

- I built nothing and ran no Fortress program, suite, stage or JVM. I changed no code, test, specification text or entry of the record. I wrote this file and its line of `INDEX.md`.
- I did not take the measure; section 4 cites the coordinator's worker's, `8f7604e42c`, and I read its file.
- I read the run's transcripts through scripts and the journal's results. For climb batch 33b's record-landing and the preparation, I read only the transcripts' labels, times, models, first messages and writes. I read the coordinating session's transcript for its own writes by time, for its incoming messages from 2026-11-18 to the launch, and for the curator's words of 15:49 on 11-18.
- A workflow's journal holds no times. The run's times are the agents' first and last records, the commits' times, the reflogs and the files' times.
- These are by reading, not run:
  - that `membersUnderAssumptions`'s restriction to the members at or below the resolved one loses no member that a run can choose;
  - that the trim keeps the dispatch's choice;
  - that the typed-numeral site (`CodeGen.java:4672-4678`) is reached by the one library's carried rows as item 601's two are.
- I did not check each rung's reported runs against its logs; the skeptics and the merged-diff review did, and I cite them. I read the five diffs of the source whole, and of the tests only the programs that the decisions name.
- I did not run `record.py check` or `ledger.py landing-check` again; the gather's, the review's and the commit stage's runs are cited.
- The skill's load is a rough count, not `skill-load.py`'s. The split of span 2 by purpose is by each transcript's first message and label.
- A worker of the coordinator read section C on the landed tree while this review was written (`agent-ae84e289ea9b30fa6`, from 19:30); I read its two commits, `835e50a9a5` and `02557ccdd4`, not its transcript.

## The steps due before the batch after

1. **The landing's own steps** (`references/batch.md`, "The landing"): the batch's to-dos swept from the shared task list (tasks 50 to 63, two of them still `in_progress`), and each decision named in one line.
2. **His word on A1,** the form of the statement rule, before run 2's briefs are written, since run 2's worker and skeptic follow it. It holds no launch: under option 1 run 2 can go as the script stands.
3. **The routing that no list holds yet** (Part 4): homes for rows 1093 and 1097, and row 1092's parked line; one queue item for run 1's forks; the seven entries of `PLAN.md:912-918` as queue items, G.worker.1 rewritten as told; items 375 and 376 brought in line; PLAN's stale lines.
4. **The record's corrections** (Part 1): F-34 by section 4; F-225 by row 1094; the four untrue claims of a stated failure; his words of 2026-11-18 15:49 in P-102's history.
5. **The record-landing workflow for run 1** (`tools/record-landing/README.md`, with `batch: '34'`, `base: '639eef1806f23bc580e9aa7c25f55e852d580644'`, `landing: '285efad802'`), with Part 3's list for the skill writer. The base build of the landed tree is ready, `/home/user/fortress-base41`.
6. **Run 2's section, the part that its re-read left** (Part 5): the rehearsal patch's pieces that C takes and those it leaves out, in step 3; then the generator's block for `--run 2`, which the re-read reports at 0 problems.
7. **The clean-up:** `/home/user/fortress-label-local-verify-scratch` removed (process finding 7).

## For the curator

Run 1 of climb batch 34 ran from 14:49 UTC to 19:13 UTC on 20 November. In your time that is 15:49 to 20:13. It is pushed. All five tasks landed. No line of the model program changed. You gave the go at 14:3x UTC and said "Both runs" at 14:5x. Every decision took the planner's default, and this section is your review of them.

The words that this section uses:
- **Walk** is the interpreter. The **compiled path** checks a program with the **checker** and then writes JVM bytecode with the **code generator**.
- The **prelude** is the small library that the compiled path uses by default. The **one library** is the library of the interpreter. The **selector** is the setting `FORTRESS_LIBRARY=one`: with it, the compile command reads the one library.
- A **task** is one change of the run. The record names it a rung. A **worker** is an agent that does one task. A **skeptic** is a second agent that examines the worker's change and fixes what it finds. A **judge** is a third agent that rules where the skeptic contests a fix.
- A **fork** is a design question with more than one way. A **default** is the way that the record chose before the run.
- A **row** is one known defect in the ledger. An **expected-failure test** is a test that is known to fail and is marked so.
- The **gate** is the full check before a run lands.
- A **type assumption**, `e asif T`, makes the call around it choose its declaration as if `e` were a `T`.
- A **type parameter** is a name that stands for a type, as `F` below. A **generic method** has a type parameter of its own, as `m` below.
- A **getter** is a method without parameters that reads like a field, as `n.zero`.
- The **measure** counts the declarations of the one library that the code generator refuses.

**What each task changed.** Each program is shortened from the tests that landed.

- **T. A generic method on a value whose type is a type parameter.** The code generator changed.

      trait Gen
          m[\T\](y: T): ZZ32 = 7
      end
      object G extends Gen end
      f[\F extends Gen\](x: F): ZZ32 = x.m[\ZZ32\](3)

  - Before: the compile crashed: 'ClassCastException: VarType cannot be cast to TraitType'.
  - Now: `f[\G\](G)` compiles and gives 7, as walk does. The code reads `x` at its bound `Gen`, the bound that has `m`.
  - Still refused: the same call where `F`'s bound is another type parameter, as `F extends H` with `H extends Gen`. Walk gives 7. It is a new row.

- **P. A type assumption at some arguments of a call.** The code generator changed.

      trait Named end
      object Leaf(k: ZZ32) extends Named end
      pair(x: Named, y: Named): String = "Named, Named"
      pair(x: Named, y: Leaf): String = "Named, Leaf"

      run(): () = do
          a = Leaf(1)
          n: Named = Leaf(2)
          println(pair(a asif Named, n))
      end

  - Before: the compile stopped: 'Can't compile a dispatched call whose arguments are not all type assumptions'. The one library's `String` has this form twice, so `String` did not compile.
  - Now: it prints "Named, Leaf", as walk does. The assumed argument counts as a `Named`. The other argument chooses by its value at run time. `String` now compiles with the selector.
  - Still refused, with an expected-failure test each: the same form at a method of an object, at a dotted call, and where a generic declaration could take the call.

- **L. A local variable inside an `if` arm.** The code generator changed.

      localFunctionAfterArm(a: ZZ32): ZZ32 = do
          var seen: ZZ32 := 0
          if a > 0 then
              r: ZZ32 = a + a
              seen := r
          end
          twice(x: ZZ32): ZZ32 = do
              r: ZZ32 = x + x
              r
          end
          seen + twice(a)
      end

  - Before: the program compiled. When it ran, the JVM refused the class: 'VerifyError: Bad local variable type'. The local function took the arm's `r`, which the path with `a <= 0` never set. The one library's `simplestRationalBetween` has this form, so every program against the one library died as the library loaded.
  - Now: it runs. A variable stays inside its block, as the specification says.

- **G. A getter that widens the type of the getter it inherits.** The checker and the one library changed.

      trait Tz[\I extends Tz[\I\]\]
          getter zero(): I
      end
      object Oz extends Tz[\Oz\]
          getter zero(): Number = 0
      end

  - Before: the checker accepted it. Then the code generator stopped: 'Likely bug in static analysis'. The one library's `NN32` had this form, so its part `FortressBuiltin` did not compile.
  - Now: the checker refuses it: 'the return type of Oz->Number ... should be a subtype of the return type of Tz[\Oz\]->Oz'. This is the specification's Return Type Rule.
  - Also now: `NN32`'s `zero` and `one` give an `NN32`. Thirteen more getter declarations of the one library give the type that they inherit.
  - Also now, under walk: `((1,1):(2,3)).indexValuePairs[(1,2)]` gives `((1,2),(2,3))`. Before, it stopped: 'Cannot find definition for method _[_]'.
  - Still refused, as before: a dotted method, not a getter, that narrows the type in the same place. Your decisions P-146 and P-157 say that it should compile. It is a new row.

- **F. Walk's strings without one library line.** Walk and one line of the one library changed.

      run(): () = do
          s: String = "ready"
          println(s)
      end

  - Before: the one library's `FlatString` part held `ignore(FlatString)` only so that walk could make strings. Without that line, the first string stopped walk: 'NullPointerException'.
  - Now: walk is ready for strings when it loads the library, and the line is gone. Nothing that a program prints changes.

All tests passed at the gate, on the first run: 3,628 tests, and no failure. The two measures of the checker on the one library stay at 0. The quick microGPT check passed 7 of 7 for both programs.

**The measure.** Before run 1, the code generator refused 2 declarations of the one library. After run 1, it refuses none. The coordinator measured it after the landing. Run 2 now needs only the classes that carry the one library's built-in types.

**The decisions that took the planner's default.** Each one can be undone.

- **Rung L wrote its test against the prelude first (fork L1).** The other way was to land the repair without a test that fails first. You said that test first is a practice. The worker found a test in ten minutes, so the other way was not needed.
- **A call with an assumption at some arguments chooses among the declarations that take the assumed type, by the other arguments' values (fork P1).** The other way was to rewrite the library's two lines. Then a program with the form would still be refused.
- **The other forms of an assumption at some arguments stay refused (fork P2).** One of them has a new message.
- **The code reads a type parameter's value at the bound that has the method (fork T1).** The other way was to look the method up at run time. The code generator does that nowhere else.
- **The checker refuses a widening getter, by the rule that it has for methods (fork G1).**
- **A library line that the checker then refuses is repaired in the library's own spelling (fork G2).** Fifteen getter declarations changed. Two answers under walk changed: the one above, and the type inside `ArrayList`'s `extractLeft`. It now gives what `List` declares.
- **Walk makes every native object ready when it loads the library, and the line goes (fork F1).** The other way was to let the compiled path compile `FlatString` as a value. That would answer your open question on such names.
- **Two runs, what the batch takes, and rung L in run 1 (forks B1, B2, B3).** These order the work.

**The items on your list.** None holds a batch.
- A call with an assumption at some arguments, where the choice could reach a method of an object, is refused. The worker's code gave a wrong answer there with no message. The judge kept the refusal. Told.
- Your question 71 asks whether such a call should compile as the declaration that the checker chooses. Your go for this batch answered most of it: the call now compiles, and it chooses at run time, as walk does. What is left is the forms that stay refused. The question should now name only those forms.
- The dotted method that narrows a type is refused. Your decisions P-146 and P-157 already say that it should compile, so it needs a task, not your answer.
- Some getters of the one library's other parts widen their type, and three parts crash the checker. No check reads those parts now. Told.
- The gather changed one sentence of the specification, to name the dotted method's row. Told.

**One question for you: how a worker states the expected failure.**
- Your rule of 18 November: write the test, state the expected failure, then run it.
- In this run, no worker and no skeptic wrote the statement before the run. Each run failed in the way that the record had written down before the launch. So each test did start from the right failure.
- But five reports and three skeptics wrote that they had stated it. The transcripts do not show that.
- The ways:
  1. Keep the rule as it is. The record's line stands in when a worker does not state one.
  2. Let the record's line be the statement for the task's own test. A worker states one only for a test that the record does not name.
  3. Put the statement in the same command that runs the test, for every test. Then the skeptic can check it in the transcript, as you asked.
- My recommendation: way 3 for every test that the record does not name, and way 2 for the task's own test. It costs one line a test.

**Three events.**
- **The machine restarted at 17:06 UTC (18:06 in your time).** The run went on at 17:08. Two skeptics ran again. Each found the first skeptic's work and said so. Nothing was committed twice. The restart cost about 0.43M tokens written. The new machine is slower, so the gate's times are longer. That is not a change of the code.
- **Nothing else was committed while the run merged its tasks.** The coordinator committed a status note before the merge.
- **No message of yours reached an agent.** You sent none during the run.

**The cost.** The run wrote 4.99M tokens. The estimate was 5.3M, and 6.1M with its reserve. The reserve paid for the one ruling. The restart cost 0.43M of the total.
